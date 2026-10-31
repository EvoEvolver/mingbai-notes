// 第 5 页的纯计算函数（无 JSX；可在 node 中单独测试）。
// 全部用 _rat.js 的 BigInt 有理数做精确运算：奇偶插值多项式 p、矩阵 X_j、J~(t)=p(Σ(1−t/j)X_j)、E、秩、Walsh 换基。
import * as Q from "./_rat.js";
const { q, Q0, Q1, qadd, qsub, qmul, qdiv, qzero, qeq, kron, eye, range } = Q;

// ---------- 插值窗口与奇偶多项式 ----------
// 以 ℓ/2 为中心的 d+1 个连续整数 k：k0 = ⌈(ℓ−d)/2⌉，…，k0+d
export const windowKs = (ell, d) => { const k0 = Math.ceil((ell - d) / 2); return range(d + 1).map(i => k0 + i); };
// p ∈ Q[z]，满足 p(ℓ−2k) = (−1)^k（k 取窗口内各值），次数 ≤ d。返回系数（低次在前）
export function parityPoly(ell, d) {
  const ks = windowKs(ell, d);
  return Q.lagrange(ks.map(k => q(ell - 2 * k)), ks.map(k => q(k % 2 ? -1 : 1)));
}
export const sgn = k => (k % 2 ? -1 : 1);

// ---------- 2×2 基本矩阵与张量积 ----------
export const X2 = [[Q0, Q1], [Q1, Q0]];
export const Z2 = [[Q1, Q0], [Q0, q(-1)]];
export const I2 = eye(2);
export const W2 = [[Q1, Q1], [Q1, q(-1)]];          // √2·H（Walsh），避免 √2
export const kronAll = mats => mats.reduce((A, B) => kron(A, B));
// X_j = I2^{⊗(j−1)} ⊗ X ⊗ I2^{⊗(ℓ−j)}（j 从 1 开始）；第 j 个张量因子 ↔ 行号二进制的第 j 位（最高位在前）
export const Xj = (ell, j) => kronAll(range(ell).map(k => (k === j - 1 ? X2 : I2)));
export const Zj = (ell, j) => kronAll(range(ell).map(k => (k === j - 1 ? Z2 : I2)));
export const Xell = ell => kronAll(range(ell).map(() => X2));
export const bitOf = (x, i, ell) => (x >> (ell - i)) & 1;          // x 的第 i 位（i 从 1 开始）
export const maskOf = (i, ell) => 1 << (ell - i);

// ---------- 矩阵多项式求值 ----------
// 稀疏化：每行的非零元 [列, 值]
const sparse = M => M.map(row => row.map((v, c) => [c, v]).filter(([, v]) => !qzero(v)));
// P·M（M 稀疏）
function mulSparse(P, Ms) {
  const n = P.length, out = P.map(() => Array(n).fill(Q0));
  for (let k = 0; k < n; k++) for (const [c, v] of Ms[k]) for (let r = 0; r < n; r++) {
    const a = P[r][k]; if (!qzero(a)) out[r][c] = qadd(out[r][c], qmul(a, v));
  }
  return out;
}
// p(M)，Horner：P ← P·M + a_k I
export function polyOfMatrix(coef, M) {
  const n = M.length, Ms = sparse(M);
  let P = Q.zeros(n);
  for (let k = coef.length - 1; k >= 0; k--) {
    P = k === coef.length - 1 ? P : mulSparse(P, Ms);
    if (!qzero(coef[k])) for (let i = 0; i < n; i++) P[i][i] = qadd(P[i][i], coef[k]);
  }
  return P;
}
// S(t) = Σ_j (1 − t/j) X_j
export function linComb(ell, t, Xs) {
  let S = Q.zeros(1 << ell);
  for (let j = 1; j <= ell; j++) { const c = qsub(Q1, qdiv(t, q(j))); if (!qzero(c)) S = Q.matadd(S, Q.matscale(c, Xs[j - 1])); }
  return S;
}

// ---------- 检验 ----------
// i-好：K[x,y] = 1{x_i=y_i} B[x_{−i}, y_{−i}]，即 (a) 第 i 位不同则为 0；(b) 把 x,y 的第 i 位同时翻转，元素不变
export function niceReport(K, i, ell) {
  const m = maskOf(i, ell), n = 1 << ell; let offZero = true, same = true;
  for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) {
    if ((x & m) !== (y & m)) { if (!qzero(K[x][y])) offZero = false; }
    else if (!qeq(K[x][y], K[x ^ m][y ^ m])) same = false;
  }
  return { offZero, same, ok: offZero && same };
}
// 快速 Walsh 变换（对矩阵的行和列各做一次）：返回 W E W，W = [[1,1],[1,−1]]^{⊗ℓ}
export function walshConj(E) {
  const n = E.length, A = E.map(r => r.slice());
  const fw = v => { for (let h = 1; h < n; h <<= 1) for (let i = 0; i < n; i += h << 1) for (let j = i; j < i + h; j++) { const a = v[j], b = v[j + h]; v[j] = qadd(a, b); v[j + h] = qsub(a, b); } };
  A.forEach(fw);
  for (let c = 0; c < n; c++) { const col = A.map(r => r[c]); fw(col); col.forEach((v, r) => (A[r][c] = v)); }
  return A;
}
// 把第 i 位移到最高位的行/列置换（展示 i-好矩阵的两块相同对角块）
export function moveBitFirst(i, ell) {
  const n = 1 << ell, perm = [];
  for (let y = 0; y < n; y++) {      // y 为新指标：最高位 = 原第 i 位，其余位按原顺序
    const top = y >> (ell - 1), rest = y & ((1 << (ell - 1)) - 1);
    const hi = rest >> (ell - i), lo = rest & ((1 << (ell - i)) - 1);   // 原第 1..i−1 位与第 i+1..ℓ 位
    perm.push((hi << (ell - i + 1)) | (top << (ell - i)) | lo);
  }
  return perm;
}

// ---------- 定理 5.1 的完整小规模验证 ----------
export function verifyT51(ell, d) {
  const n = 1 << ell, t0 = performance.now();
  const coef = parityPoly(ell, d), ks = windowKs(ell, d);
  const Xs = range(ell).map(j => Xj(ell, j + 1)), XL = Xell(ell);
  // X_j 两两交换；X^{⊗ℓ} = X_1⋯X_ℓ
  let commute = true;
  for (let a = 0; a < ell && commute; a++) for (let b = a + 1; b < ell; b++) {
    const AB = Q.matmul(Xs[a], Xs[b]), BA = Q.matmul(Xs[b], Xs[a]);
    if (!AB.every((r, i) => r.every((v, j) => qeq(v, BA[i][j])))) { commute = false; break; }
  }
  const prodX = Xs.reduce((A, B) => Q.matmul(A, B));
  const eqM = (A, B) => A.every((r, i) => r.every((v, j) => qeq(v, B[i][j])));
  const prodOk = eqM(prodX, XL);
  // J~(t) 在 t = 0, 1, …, ℓ
  const Jt = range(ell + 1).map(t => polyOfMatrix(coef, linComb(ell, q(t), Xs)));
  const E = Q.matsub(XL, Jt[0]);
  const J0 = Q.matadd(Jt[0], E);
  const J0ok = eqM(J0, XL);
  const nice = range(ell).map(i => niceReport(Jt[i + 1], i + 1, ell));
  const rk = Q.rank(E);
  // 不一致的输入：x ∈ {−1,1}^ℓ，x_j = (−1)^{b_j}，Σx = ℓ − 2k，χ(x) = (−1)^k
  const diagWant = range(n).map(b => { const k = popcount(b); return qsub(q(sgn(k)), Q.peval(coef, q(ell - 2 * k))); });
  const mism = diagWant.filter(v => !qzero(v)).length;
  const WEW = walshConj(E), HEH = WEW.map(r => r.map(v => qdiv(v, q(n))));
  let isDiag = true, diagMatch = true;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (r !== c && !qzero(HEH[r][c])) isDiag = false;
    if (r === c && !qeq(HEH[r][c], diagWant[r])) diagMatch = false;
  }
  const anti = range(n).every(x => qeq(E[x][x ^ (n - 1)], Q1));
  const binomMism = range(ell + 1).filter(k => !ks.includes(k)).reduce((s, k) => s + Number(Q.binom(ell, k)), 0);
  return { ell, d, n, coef, ks, Xs, XL, Jt, E, HEH, nice, rk, mism, binomMism, commute, prodOk, J0ok, isDiag, diagMatch, anti, diagWant, ms: performance.now() - t0 };
}
export const popcount = b => { let c = 0; while (b) { c += b & 1; b >>= 1; } return c; };

// ---------- §5.1 的精确构造：⊗_j ((1−t/j)X + (t/j)I₂) ----------
export function exactJ(ell, t) {
  return kronAll(range(ell).map(k => { const c = qdiv(t, q(k + 1)); return [[c, qsub(Q1, c)], [qsub(Q1, c), c]]; }));
}

// ---------- 二项分布：精确尾概率（BigInt）----------
export function binomRow(ell) {
  const row = [1n]; for (let k = 0; k < ell; k++) row.push(row[k] * BigInt(ell - k) / BigInt(k + 1)); return row;
}
export function log10Big(b) {
  if (b <= 0n) return -Infinity;
  const s = b.toString(); return s.length - 1 + Math.log10(parseFloat(s[0] + "." + s.slice(1, 16)));
}
// 浮点 lgamma（Lanczos），用于 ℓ 很大时的尾概率（对数空间求和）
const LG = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
export function lgamma(x) {
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1; let a = 0.99999999999980993; const t = x + 7.5;
  for (let i = 0; i < 8; i++) a += LG[i] / (x + i + 1);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
// log10 P[|k − ℓ/2| 落在窗口外]，窗口为 windowKs(ell,d)；ℓ ≤ 3000 用 BigInt 精确，否则对数空间求和
export function log10TailOutside(ell, d) {
  if (d >= ell) return -Infinity;
  const ks = windowKs(ell, d), lo = ks[0], hi = ks[ks.length - 1];
  if (ell <= 3000) {
    const row = binomRow(ell); let s = 0n;
    for (let k = 0; k <= ell; k++) if (k < lo || k > hi) s += row[k];
    return log10Big(s) - ell * Math.log10(2);
  }
  const lc = k => (lgamma(ell + 1) - lgamma(k + 1) - lgamma(ell - k + 1)) / Math.LN10 - ell * Math.log10(2);
  // 两侧对称（至多差一项），各自从窗口边缘向外求和，直到项可忽略
  const side = (start, step) => { let m = -Infinity, acc = 0; const terms = []; for (let k = start; k >= 0 && k <= ell; k += step) { const v = lc(k); terms.push(v); if (v < (terms[0] ?? v) - 30) break; } m = Math.max(...terms); acc = terms.reduce((s, v) => s + Math.pow(10, v - m), 0); return m + Math.log10(acc); };
  const a = side(lo - 1, -1), b = side(hi + 1, 1), m = Math.max(a, b);
  return m + Math.log10(Math.pow(10, a - m) + Math.pow(10, b - m));
}
export const log2 = Math.log2;
export const dOf = (c, ell) => Math.ceil(c * Math.sqrt(ell * Math.log2(ell)));
// Hoeffding 界的 log10：2 exp(−d²/8ℓ)
export const log10Hoeff = (ell, d) => Math.log10(2) - d * d / (8 * ell) / Math.LN10;
