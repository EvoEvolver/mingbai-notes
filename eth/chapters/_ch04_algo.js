// §4 的全部构造（精确有理数，_rat.js）：随机稀疏矩阵、引理 4.1 的贪心词标号、中间坐标 Ω ≅ C×{0,1}^ℓ、
// L / R / R' / 𝒥 = I_C ⊗ X^{⊗ℓ}、各种中间矩阵 K（I、X^{⊗ℓ}、i-好、只保持第 i 位、只翻第 j 位、随机、低秩误差）、
// 好性检查 (4.8) 与分块检查（引理 4.3）。ℓ = 1 即 §4.1 的"一种颜色"情形。
// 纯函数、无 React，可在 node 里单独测试。
import { q, Q0, Q1, qadd, qmul, qeq, qzero, rng, range, permDP, rank, eye, kron } from "./_rat.js";

// ---------- 输入：每行每列至多 Δ 个非零元的随机矩阵（Δ 个随机排列的并；元素为 1..maxVal）----------
export function randomSparse(n, Delta, seed, maxVal = 3) {
  const r = rng(seed * 7919 + n * 31 + Delta);
  const A = range(n).map(() => Array(n).fill(Q0));
  for (let k = 0; k < Delta; k++) {
    const p = range(n);
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
    for (let u = 0; u < n; u++) if (qzero(A[u][p[u]])) A[u][p[u]] = q(1 + Math.floor(r() * maxVal));
  }
  return A;
}
export const nonzeros = A => A.flatMap((row, u) => row.map((x, v) => [u, v, x]).filter(([, , x]) => !qzero(x)));

// ---------- 词 ----------
// 词 w ∈ [0, Q) 的第 i 个符号（i = 1..ℓ，位置 1 为最高位），符号取值 0..q-1（显示时 +1）
export const digit = (w, i, q_, ell) => Math.floor(w / q_ ** (ell - i)) % q_;
export const word = (w, q_, ell) => range(ell).map(k => digit(w, k + 1, q_, ell));
export const wordStr = (w, q_, ell) => word(w, q_, ell).map(s => s + 1).join("");

// ---------- 引理 4.1：平衡贪心标号 ----------
// 先标行：与共享非零列的较早行标号不同、且未满（用满 D 次）；再标列：未满、不与已用有序对重复、与每个相邻行标号逐坐标都不同。
// 都取"第一个可用的词"。返回标号与每一列被排除的词数（三类，分别计数）。
export function greedyLabel(A, q_, ell) {
  const n = A.length, Qw = q_ ** ell, D = Math.ceil(2 * n / Qw);
  const rowsOfCol = range(n).map(v => range(n).filter(u => !qzero(A[u][v])));
  const colsOfRow = range(n).map(u => range(n).filter(v => !qzero(A[u][v])));
  const alpha = Array(n).fill(-1), beta = Array(n).fill(-1);
  const rowUse = Array(Qw).fill(0), colUse = Array(Qw).fill(0);
  const rowStats = [], colStats = [];
  for (let u = 0; u < n; u++) {
    const forb = new Set();
    for (const v of colsOfRow[u]) for (const u2 of rowsOfCol[v]) if (u2 < u) forb.add(alpha[u2]);
    let full = 0; for (let w = 0; w < Qw; w++) if (rowUse[w] >= D) full++;
    rowStats.push({ full, conflict: forb.size });
    let pick = -1;
    for (let w = 0; w < Qw && pick < 0; w++) if (rowUse[w] < D && !forb.has(w)) pick = w;
    if (pick < 0) return { ok: false, fail: { side: "row", index: u }, alpha, beta, D, Q: Qw, rowStats, colStats };
    alpha[u] = pick; rowUse[pick]++;
  }
  const used = new Set();                      // 已用有序对 "α,β"
  for (let v = 0; v < n; v++) {
    const U = rowsOfCol[v];
    let full = 0, pair = 0, coord = 0, pick = -1;
    for (let w = 0; w < Qw; w++) {
      const isFull = colUse[w] >= D;
      const isPair = U.some(u => used.has(alpha[u] + "," + w));
      const isCoord = U.some(u => range(ell).some(k => digit(alpha[u], k + 1, q_, ell) === digit(w, k + 1, q_, ell)));
      full += isFull; pair += isPair; coord += isCoord;
      if (pick < 0 && !isFull && !isPair && !isCoord) pick = w;
    }
    colStats.push({ full, pair, coord, deg: U.length });
    if (pick < 0) return { ok: false, fail: { side: "col", index: v }, alpha, beta, D, Q: Qw, rowStats, colStats };
    beta[v] = pick; colUse[pick]++;
    for (const u of U) used.add(alpha[u] + "," + pick);
  }
  return { ok: true, alpha, beta, D, Q: Qw, rowStats, colStats };
}

// 验证 (i)(ii)(iii)
export function verifyLabels(A, lab, q_, ell) {
  const { alpha, beta, D, Q: Qw } = lab, nz = nonzeros(A);
  const cnt = (arr) => { const c = Array(Qw).fill(0); arr.forEach(w => c[w]++); return Math.max(...c); };
  const maxRow = cnt(alpha), maxCol = cnt(beta);
  const pairs = nz.map(([u, v]) => alpha[u] + "," + beta[v]);
  const distinct = new Set(pairs).size === pairs.length;
  const coordBad = nz.filter(([u, v]) => range(ell).some(k => digit(alpha[u], k + 1, q_, ell) === digit(beta[v], k + 1, q_, ell))).length;
  return { maxRow, maxCol, D, i: maxRow <= D && maxCol <= D, ii: distinct, iii: coordBad === 0, coordBad };
}

// ---------- 中间坐标 Ω ≅ C × {0,1}^ℓ ----------
// 无序对 {c<d} 按字典序编号；立方体编号 = 各位置无序对编号的 P 进制数（位置 1 为最高位）；
// 方向位 x_i = 0 表示 (a_i,b_i) = (c,d) 递增，1 表示反向。Ω 中坐标的线性编号 = cube·2^ℓ + x（x 的位置 1 为最高位）。
export function omegaSpace(q_, ell) {
  const pairs = []; const pidx = range(q_).map(() => Array(q_).fill(-1));
  for (let c = 0; c < q_; c++) for (let d = c + 1; d < q_; d++) { pidx[c][d] = pairs.length; pairs.push([c, d]); }
  const P = pairs.length, nCube = P ** ell, two = 2 ** ell, M = nCube * two;
  const index = (wa, wb) => {                   // 词对 → Ω 的线性编号（要求逐坐标不同）
    let cube = 0, x = 0;
    for (let i = 1; i <= ell; i++) {
      const a = digit(wa, i, q_, ell), b = digit(wb, i, q_, ell);
      if (a === b) return -1;
      cube = cube * P + pidx[Math.min(a, b)][Math.max(a, b)];
      x = x * 2 + (a < b ? 0 : 1);
    }
    return cube * two + x;
  };
  const label = idx => {                         // 线性编号 → 有序词对（符号 1..q 的字符串）
    let cube = Math.floor(idx / two), x = idx % two; const a = [], b = [];
    for (let i = ell; i >= 1; i--) {
      const [c, d] = pairs[cube % P]; cube = Math.floor(cube / P);
      const bit = x % 2; x = Math.floor(x / 2);
      a.unshift(bit ? d : c); b.unshift(bit ? c : d);
    }
    return { a: a.map(s => s + 1).join(""), b: b.map(s => s + 1).join("") };
  };
  return { P, nCube, two, M, index, label, pairs };
}

// ---------- 稀疏感知的精确矩阵乘法（结果与 _rat.matmul 相同，只是跳过零元）----------
export function spmul(A, B) {
  const m = B[0].length, nzB = B.map(row => { const l = []; row.forEach((y, j) => { if (!qzero(y)) l.push([j, y]); }); return l; });
  return A.map(row => { const out = Array(m).fill(Q0); row.forEach((x, k) => { if (!qzero(x)) for (const [j, y] of nzB[k]) out[j] = qadd(out[j], qmul(x, y)); }); return out; });
}
export const matEq = (A, B) => A.length === B.length && A.every((r, i) => r.every((x, j) => qeq(x, B[i][j])));
export const isZeroM = A => A.every(r => r.every(qzero));
export const permute = (A, rows, cols) => rows.map(r => cols.map(c => A[r][c]));

// ---------- 分解：L, R, 𝒥, R' ----------
const X2 = [[Q0, Q1], [Q1, Q0]];
export function kronPow(K, ell) { let out = [[Q1]]; for (let k = 0; k < ell; k++) out = kron(out, K); return out; }
export function factorization(A, lab, q_, ell) {
  const n = A.length, om = omegaSpace(q_, ell), { M } = om;
  const L = range(n).map(() => Array(M).fill(Q0)), Rm = range(M).map(() => Array(n).fill(Q0));
  for (const [u, v, x] of nonzeros(A)) {
    const w = om.index(lab.alpha[u], lab.beta[v]);
    L[u][w] = x; Rm[w][v] = Q1;
  }
  const Xl = kronPow(X2, ell);
  const J = kron(eye(om.nCube), Xl);
  const Rp = spmul(J, Rm);
  return { om, L, R: Rm, J, Rp, Xl };
}
// 外层矩阵 L (I_C ⊗ K) R'
export const middle = (om, K) => kron(eye(om.nCube), K);
export const outer = (F, K) => spmul(spmul(F.L, middle(F.om, K)), F.Rp);

// ---------- 布尔立方体上的矩阵 K（2^ℓ × 2^ℓ）----------
export const bit = (x, i, ell) => (x >> (ell - i)) & 1;                 // 位置 i（1..ℓ）的比特
export const dropBit = (x, i, ell) => { const hi = x >> (ell - i + 1), lo = x & ((1 << (ell - i)) - 1); return (hi << (ell - i)) | lo; };
const randInt = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
export function randomSmall(dim, seed, density = 0.7) {
  const r = rng(seed * 104729 + dim);
  return range(dim).map(() => range(dim).map(() => (r() < density ? q(randInt(r, -2, 3) || 1) : Q0)));
}
export const KI = ell => eye(2 ** ell);
export const KX = ell => kronPow(X2, ell);
// I₂ ⊗ B 放在第 i 个张量因子上：K[x,y] = 1{x_i=y_i} B[x_{-i}, y_{-i}]   —— (4.8)
export function Knice(ell, i, Bs) {
  const N = 2 ** ell;
  return range(N).map(x => range(N).map(y => (bit(x, i, ell) === bit(y, i, ell) ? Bs[dropBit(x, i, ell)][dropBit(y, i, ell)] : Q0)));
}
// 只保持第 i 位：两个对角块 B0（x_i=0）与 B1（x_i=1）可以不同
export function Kpreserve(ell, i, B0, B1) {
  const N = 2 ** ell;
  return range(N).map(x => range(N).map(y => (bit(x, i, ell) !== bit(y, i, ell) ? Q0 : (bit(x, i, ell) ? B1 : B0)[dropBit(x, i, ell)][dropBit(y, i, ell)])));
}
// 只翻转第 j 位：X_j
export function Kflip(ell, j) {
  const N = 2 ** ell, m = 1 << (ell - j);
  return range(N).map(x => range(N).map(y => (y === (x ^ m) ? Q1 : Q0)));
}
// 秩 1 矩阵 a b^T
export function rankOne(dim, seed) {
  const r = rng(seed * 15485863 + 7), a = range(dim).map(() => q(randInt(r, -2, 2))), b = range(dim).map(() => q(randInt(r, -2, 2)));
  if (a.every(qzero)) a[0] = Q1; if (b.every(qzero)) b[0] = Q1;
  return a.map(x => b.map(y => qmul(x, y)));
}
export const matAdd = (A, B) => A.map((r, i) => r.map((x, j) => qadd(x, B[i][j])));

// 好性检查：preserves = K 保持第 i 位（x_i≠y_i 处全为零）；nice = 另外两块相同（式 4.8）
export function niceness(K, ell, i) {
  const N = 2 ** ell, m = 1 << (ell - i);
  let preserves = true, same = true;
  for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) {
    if (bit(x, i, ell) !== bit(y, i, ell)) { if (!qzero(K[x][y])) preserves = false; }
    else if (!qeq(K[x][y], K[x ^ m][y ^ m])) same = false;
  }
  return { preserves, nice: preserves && same };
}
// 按第 i 位分组的顺序（先 x_i = 0，再 x_i = 1）
export const groupByBit = (ell, i) => { const N = 2 ** ell; const o = range(N).filter(x => !bit(x, i, ell)).concat(range(N).filter(x => bit(x, i, ell))); return o; };
export const bitStr = (x, ell) => range(ell).map(k => bit(x, k + 1, ell)).join("");

// ---------- 分块检查（引理 4.3）----------
// rowKey[u]、colKey[v]：行、列所属的组（第 i 个符号）。返回排序后的顺序、块外非零元个数、各块尺寸与积和式。
export function blockCheck(Bm, rowKey, colKey, keys, withPerm = true) {
  const n = Bm.length;
  const rows = range(n).slice().sort((a, b) => rowKey[a] - rowKey[b] || a - b);
  const cols = range(n).slice().sort((a, b) => colKey[a] - colKey[b] || a - b);
  let off = 0;
  for (let u = 0; u < n; u++) for (let v = 0; v < n; v++) if (rowKey[u] !== colKey[v] && !qzero(Bm[u][v])) off++;
  const blocks = keys.map(a => ({ a, rows: range(n).filter(u => rowKey[u] === a), cols: range(n).filter(v => colKey[v] === a) }));
  let prod = null, per = null;
  if (withPerm) {
    prod = Q1;
    for (const b of blocks) {
      const p = b.rows.length !== b.cols.length ? Q0 : permDP(permute(Bm, b.rows, b.cols));
      b.per = p; prod = qmul(prod, p);
    }
    per = permDP(permute(Bm, rows, cols));       // 按组排序后再做 DP：块对角时可达状态很少
  }
  return { rows, cols, off, blocks, prod, per, maxRows: Math.max(...blocks.map(b => b.rows.length)), maxCols: Math.max(...blocks.map(b => b.cols.length)) };
}
export { rank, permDP };

// 引理 2.1 实际用到的是"方子矩阵"的积和式：在每个块里取同样多的行与列（k_a = min(|I_a|,|J_a|) 个，随机挑选），
// 则 per(B[S,T]) = Π_a per(B_a[S_a,T_a])。返回 {S, T, per, prod}。
export function squareSub(Bm, bc, seed) {
  const r = rng(seed * 2654435761 + 11), pick = (arr, k) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, k).sort((x, y) => x - y); };
  const S = [], T = []; let prod = Q1;
  for (const b of bc.blocks) {
    const k = Math.min(b.rows.length, b.cols.length); if (!k) continue;
    const Sa = pick(b.rows, k), Ta = pick(b.cols, k);
    S.push(...Sa); T.push(...Ta); prod = qmul(prod, permDP(permute(Bm, Sa, Ta)));
  }
  return { S, T, per: permDP(permute(Bm, S, T)), prod };
}
