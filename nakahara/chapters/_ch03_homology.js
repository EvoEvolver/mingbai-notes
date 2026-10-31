// 第 3 章的计算核心（纯函数，无 React）：单纯复形、边界矩阵、整数 Smith 标准形、同调群、Betti 数、链的同调类。
// 全部用 BigInt 精确计算；已在 node 中对原书例 3.6–3.13、习题 3.1–3.3、章末题 3.1–3.2 的结果逐一核对（式 (3.47) 与例 3.13 的 ∂(Σσ)=−2a 亦已核对）。

// ---------- 置换的符号 ----------
export function permSign(arr) {
  const a = [...arr]; let s = 1;
  for (let i = 0; i < a.length; i++) while (a[i] !== i) { const j = a[i];[a[i], a[j]] = [a[j], a[i]]; s = -s; }
  return s;
}
// 有序顶点列 seq 相对于其升序排列的符号（(3.14)：sgn P）
export function orderSign(seq) {
  const sorted = [...seq].sort((x, y) => x - y);
  return permSign(seq.map(v => sorted.indexOf(v)));
}
const key = s => [...s].sort((x, y) => x - y).join(",");

// ---------- 单纯复形 ----------
// facets：极大单形（顶点编号数组，给定的顺序即其定向）；names：顶点名（TeX，如 "p_0"）。
// 返回 { names, simp: [[0 维单形…], [1 维…], …], index: [Map(key → i)] }；
// 每个单形的定向：若它作为某个给定单形出现，用给定顺序；否则（面）用升序。
export function makeComplex(facets, names, extra = []) {
  const given = new Map();
  for (const f of [...facets, ...extra]) given.set(key(f), [...f]);
  const all = new Map();
  const addFaces = f => {
    const n = f.length;
    for (let mask = 1; mask < 1 << n; mask++) {
      const s = f.filter((_, i) => mask >> i & 1), k = key(s);
      if (!all.has(k)) all.set(k, given.get(k) || [...s].sort((x, y) => x - y));
    }
  };
  for (const f of [...facets, ...extra]) addFaces(f);
  const dim = Math.max(0, ...[...all.values()].map(s => s.length - 1));
  const simp = Array.from({ length: dim + 1 }, () => []);
  for (const s of all.values()) simp[s.length - 1].push(s);
  // 排序：按升序键的字典序（显示稳定），但保留各自的定向
  for (const L of simp) L.sort((a, b) => { const x = [...a].sort((p, q) => p - q), y = [...b].sort((p, q) => p - q); for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) return x[i] - y[i]; return 0; });
  const index = simp.map(L => new Map(L.map((s, i) => [key(s), i])));
  const nv = Math.max(...simp[0].map(s => s[0])) + 1;
  return { names: names || Array.from({ length: nv }, (_, i) => `p_{${i}}`), simp, index, dim };
}

// 有序单形 s 的边界：[{ i: 面在 C_{r-1} 中的序号, c: ±1 }]（式 (3.20)，再按 (3.14) 化为登记的定向）
export function boundaryOf(K, s) {
  const r = s.length - 1; if (r === 0) return [];
  const out = [];
  for (let i = 0; i <= r; i++) {
    const face = s.filter((_, j) => j !== i), k = key(face), idx = K.index[r - 1].get(k);
    const stored = K.simp[r - 1][idx];
    const sgn = (i % 2 ? -1 : 1) * relSign(face, stored);
    out.push({ i: idx, c: sgn });
  }
  return out;
}
// 同一顶点集合的两种排列 a、b：(a) = relSign · (b)
export function relSign(a, b) { return permSign(a.map(v => b.indexOf(v))); }

// ∂_r 的矩阵（行：(r-1)-单形，列：r-单形），元素为 BigInt
export function boundaryMatrix(K, r) {
  const rows = r - 1 >= 0 ? K.simp[r - 1]?.length ?? 0 : 0, cols = K.simp[r]?.length ?? 0;
  const A = Array.from({ length: rows }, () => Array(cols).fill(0n));
  if (r === 0 || !K.simp[r]) return A;
  K.simp[r].forEach((s, j) => boundaryOf(K, s).forEach(({ i, c }) => { A[i][j] += BigInt(c); }));
  return A;
}

// ---------- Smith 标准形 ----------
// 返回 { D: 对角元（非零不变因子，BigInt，且 d1 | d2 | …）, rank, U, V }，满足 U·A·V = diag(D)（U、V 为幺模矩阵）。
const abs = x => (x < 0n ? -x : x);
export function smith(A0, track = false) {
  const m = A0.length, n = m ? A0[0].length : 0;
  const A = A0.map(r => [...r]);
  const I = k => Array.from({ length: k }, (_, i) => Array.from({ length: k }, (_, j) => (i === j ? 1n : 0n)));
  const U = track ? I(m) : null, V = track ? I(n) : null;
  const swapR = (i, j) => { if (i === j) return;[A[i], A[j]] = [A[j], A[i]]; if (U)[U[i], U[j]] = [U[j], U[i]]; };
  const swapC = (i, j) => { if (i === j) return; for (const r of A)[r[i], r[j]] = [r[j], r[i]]; if (V) for (const r of V)[r[i], r[j]] = [r[j], r[i]]; };
  const addR = (dst, src, q) => { if (!q) return; for (let k = 0; k < n; k++) A[dst][k] -= q * A[src][k]; if (U) for (let k = 0; k < m; k++) U[dst][k] -= q * U[src][k]; };   // row_dst -= q·row_src
  const addC = (dst, src, q) => { if (!q) return; for (let k = 0; k < m; k++) A[k][dst] -= q * A[k][src]; if (V) for (let k = 0; k < n; k++) V[k][dst] -= q * V[k][src]; };
  const negR = i => { for (let k = 0; k < n; k++) A[i][k] = -A[i][k]; if (U) for (let k = 0; k < m; k++) U[i][k] = -U[i][k]; };
  const fdiv = (a, b) => { let q = a / b; if ((a % b !== 0n) && ((a < 0n) !== (b < 0n))) q -= 1n; return q; };   // 向下取整
  let t = 0;
  while (t < Math.min(m, n)) {
    // 选剩余子矩阵中绝对值最小的非零元为主元
    let best = null;
    for (let i = t; i < m; i++) for (let j = t; j < n; j++) if (A[i][j] !== 0n && (!best || abs(A[i][j]) < abs(A[best[0]][best[1]]))) best = [i, j];
    if (!best) break;
    swapR(t, best[0]); swapC(t, best[1]);
    for (;;) {
      let dirty = false;
      for (let i = t + 1; i < m; i++) if (A[i][t] !== 0n) { addR(i, t, fdiv(A[i][t], A[t][t])); if (A[i][t] !== 0n) { dirty = true; } }
      for (let j = t + 1; j < n; j++) if (A[t][j] !== 0n) { addC(j, t, fdiv(A[t][j], A[t][t])); if (A[t][j] !== 0n) { dirty = true; } }
      if (dirty) {   // 有余数：换更小的主元，继续
        let b = [t, t];
        for (let i = t; i < m; i++) if (A[i][t] !== 0n && abs(A[i][t]) < abs(A[b[0]][b[1]])) b = [i, t];
        for (let j = t; j < n; j++) if (A[t][j] !== 0n && abs(A[t][j]) < abs(A[b[0]][b[1]])) b = [t, j];
        swapR(t, b[0]); swapC(t, b[1]);
        continue;
      }
      // 行列已清空；检查整除性 d_t | 余下所有元素
      let bad = null;
      for (let i = t + 1; i < m && !bad; i++) for (let j = t + 1; j < n; j++) if (A[i][j] % A[t][t] !== 0n) { bad = i; break; }
      if (bad === null) break;
      addR(t, bad, -1n);   // row_t += row_bad，再次消元
    }
    if (A[t][t] < 0n) negR(t);
    t++;
  }
  const D = []; for (let i = 0; i < Math.min(m, n); i++) if (A[i][i] !== 0n) D.push(A[i][i]);
  return { D, rank: D.length, U, V };
}

// ---------- 同调群 ----------
// 返回每个 r 的 { I: r-单形数, rankD: rank ∂_r, Z: rank Z_r, B: rank B_r, free: b_r, torsion: [k_i>1] }，以及 χ
export function homology(K) {
  const n = K.dim, mats = [], snf = [];
  for (let r = 0; r <= n + 1; r++) { mats[r] = boundaryMatrix(K, r); snf[r] = r === 0 || r > n ? { D: [], rank: 0 } : smith(mats[r]); }
  const out = [];
  for (let r = 0; r <= n; r++) {
    const I = K.simp[r].length, rk = snf[r].rank, rk1 = snf[r + 1]?.rank ?? 0;
    out.push({ r, I, rankD: rk, Z: I - rk, B: rk1, free: I - rk - rk1, torsion: (snf[r + 1]?.D || []).filter(d => d > 1n).map(Number), diag: (snf[r + 1]?.D || []).map(Number) });
  }
  const chi = out.reduce((s, h) => s + (h.r % 2 ? -1 : 1) * h.I, 0);
  const chiB = out.reduce((s, h) => s + (h.r % 2 ? -1 : 1) * h.free, 0);
  return { H: out, chi, chiB, mats };
}
// TeX：H_r 的同构类型
export function groupTex(h) {
  const parts = [];
  if (h.free === 1) parts.push(R`\mathbb{Z}`);
  else if (h.free > 1) parts.push(h.free <= 3 ? Array(h.free).fill(R`\mathbb{Z}`).join(R`\oplus`) : R`\mathbb{Z}^{${h.free}}`);
  for (const k of h.torsion) parts.push(R`\mathbb{Z}_{${k}}`);
  return parts.length ? parts.join(R`\oplus`) : R`\{0\}`;
}
const R = String.raw;

// ---------- 链：边界、闭链、边缘、同调类的阶 ----------
// c：长度 I_r 的整数系数数组（Number）；返回 ∂_r c（长度 I_{r-1}）
export function applyBoundary(K, r, c) {
  const out = Array(K.simp[r - 1]?.length ?? 0).fill(0);
  K.simp[r].forEach((s, j) => { if (c[j]) boundaryOf(K, s).forEach(({ i, c: e }) => { out[i] += e * c[j]; }); });
  return out;
}
// 预计算 ∂_{r+1} 的 Smith 分解（带 U、V），用于判定 r-闭链是否为边缘
export function prepClass(K, r) {
  const A = boundaryMatrix(K, r + 1);
  return { A, ...smith(A, true), rows: A.length, cols: A[0]?.length ?? 0 };
}
const gcd = (a, b) => { a = abs(a); b = abs(b); while (b) [a, b] = [b, a % b]; return a; };
// z 是 r-闭链。返回 { order: 最小的 n≥1 使 n z ∈ B_r（Infinity 表示自由类，1 表示 z 本身是边缘），witness: n z = ∂ d 的 (r+1)-链 d（Number 数组） }
export function classOrder(P, z) {
  const zb = z.map(BigInt);
  const w = P.U ? P.U.map(row => row.reduce((s, u, k) => s + u * zb[k], 0n)) : zb;
  for (let i = P.rank; i < w.length; i++) if (w[i] !== 0n) return { order: Infinity };
  let n = 1n;
  for (let i = 0; i < P.rank; i++) { const d = P.D[i], g = gcd(d, w[i]); const need = d / (g || d); n = n / gcd(n, need) * need; }
  const y = Array(P.cols).fill(0n);
  for (let i = 0; i < P.rank; i++) y[i] = n * w[i] / P.D[i];
  const d = P.V.map(row => row.reduce((s, v, k) => s + v * y[k], 0n));
  return { order: Number(n), witness: d.map(Number) };
}

// ---------- 原书中的复形 ----------
const P = i => `p_{${i}}`;
const names = n => Array.from({ length: n }, (_, i) => P(i));
// 3×3 方格的曲面（环面 / Klein 瓶）：lab[y][x] 为格点 (x,y) 的顶点编号；每个小方格沿"左下—右上"对角线切成两个三角形，均按图中逆时针定向
function gridSurface(lab) {
  const F = [];
  for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) {
    const TL = lab[y][x], TR = lab[y][x + 1], BL = lab[y + 1][x], BR = lab[y + 1][x + 1];
    F.push([TL, BL, TR], [BL, BR, TR]);
  }
  return F;
}
export const KLEIN_LAB = [[0, 1, 2, 0], [4, 5, 6, 4], [3, 7, 8, 3], [0, 2, 1, 0]];
export const TORUS_LAB = [[0, 1, 2, 0], [4, 5, 6, 4], [3, 7, 8, 3], [0, 1, 2, 0]];
export const MOBIUS_F = [[0, 1, 2], [2, 1, 4], [2, 4, 3], [3, 4, 5], [3, 5, 1], [1, 5, 0]];
export const RP2_F = [[0, 1, 2], [0, 4, 1], [0, 5, 4], [0, 3, 5], [0, 2, 3], [2, 4, 3], [2, 5, 4], [2, 1, 5], [1, 3, 5], [1, 4, 3]];
export const CYL_F = [[0, 3, 1], [3, 4, 1], [1, 4, 2], [4, 5, 2], [2, 5, 0], [5, 3, 0]];

// 每个条目：label（按钮）、src（原书出处）、facets、names、expect（原书给出的结果，用于自检徽章）
export const BOOK = [
  { id: "pt", label: R`$\{p_0\}$`, src: "例 3.6", facets: [[0]], expect: [R`\mathbb{Z}`] },
  { id: "two", label: R`$\{p_0,p_1\}$`, src: "习题 3.1", facets: [[0], [1]], expect: [R`\mathbb{Z}\oplus\mathbb{Z}`] },
  { id: "seg", label: "线段", src: "例 3.7", facets: [[0, 1]], expect: [R`\mathbb{Z}`, R`\{0\}`] },
  { id: "circle", label: R`三角形的边（$S^1$）`, src: "例 3.8", facets: [[0, 1], [1, 2], [2, 0]], expect: [R`\mathbb{Z}`, R`\mathbb{Z}`] },
  { id: "square", label: "正方形的边", src: "习题 3.2", facets: [[0, 1], [1, 2], [2, 3], [3, 0]], expect: [R`\mathbb{Z}`, R`\mathbb{Z}`] },
  { id: "disk", label: "实心三角形", src: "例 3.9", facets: [[0, 1, 2]], expect: [R`\mathbb{Z}`, R`\{0\}`, R`\{0\}`] },
  { id: "S2", label: R`四面体表面（$S^2$）`, src: "习题 3.3", facets: [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]], expect: [R`\mathbb{Z}`, R`\{0\}`, R`\mathbb{Z}`] },
  { id: "D3", label: "实心四面体", src: R`例 3.4，式 (3.12)`, facets: [[0, 1, 2, 3]], expect: [R`\mathbb{Z}`, R`\{0\}`, R`\{0\}`, R`\{0\}`] },
  { id: "cyl", label: "圆柱面", src: R`例 3.5，图 3.5(a)`, facets: CYL_F, expect: [R`\mathbb{Z}`, R`\mathbb{Z}`, R`\{0\}`] },
  { id: "mobius", label: "Möbius 带", src: R`例 3.10，图 3.8`, facets: MOBIUS_F, expect: [R`\mathbb{Z}`, R`\mathbb{Z}`, R`\{0\}`] },
  { id: "rp2", label: R`射影平面 $\sym{RP}{\mathbb{R}P^2}$`, src: R`例 3.11，图 3.9`, facets: RP2_F, expect: [R`\mathbb{Z}`, R`\mathbb{Z}_{2}`, R`\{0\}`] },
  { id: "torus", label: R`环面 $T^2$`, src: R`例 3.12`, facets: gridSurface(TORUS_LAB), expect: [R`\mathbb{Z}`, R`\mathbb{Z}\oplus\mathbb{Z}`, R`\mathbb{Z}`] },
  { id: "klein", label: "Klein 瓶", src: R`例 3.13，图 3.12`, facets: gridSurface(KLEIN_LAB), expect: [R`\mathbb{Z}`, R`\mathbb{Z}\oplus\mathbb{Z}_{2}`, R`\{0\}`] },
];
export function bookComplex(id) {
  const b = BOOK.find(x => x.id === id);
  const nv = Math.max(...b.facets.flat()) + 1;
  return makeComplex(b.facets, names(nv));
}

// ---------- 曲面构造器：球面 + h 个环柄 + c 个交叉帽 + q 个洞 ----------
// 做法：从四面体表面（S²）出发。每一步先把某个三角形 (a,b,c) 换成"内三角形 (x,y,z) + 环带 6 个三角形"，
// 得到一个三个顶点全新的三角形 (x,y,z)；然后
//   · 洞：删去 (x,y,z)；
//   · 环柄：与 7 顶点环面（Möbius–Császár 三角剖分）做连通和——两边各删一个三角形，把边界三角形粘起来；
//   · 交叉帽：与 6 顶点射影平面（图 3.9）做连通和。
// 由于 (x,y,z) 只与 a,b,c 及彼此相邻，粘合不会产生重复的边或面，结果仍是单纯复形。
const TORUS7 = [[0, 1, 3], [1, 2, 4], [2, 3, 5], [3, 4, 6], [4, 5, 0], [5, 6, 1], [6, 0, 2], [0, 3, 2], [1, 4, 3], [2, 5, 4], [3, 6, 5], [4, 0, 6], [5, 1, 0], [6, 2, 1]];
export function surface(h, c, q) {
  let F = [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]], nv = 4, pick = 0;
  const fresh = () => {   // 返回一个三个顶点全新的三角形，并把它留在 F 中
    const T = F.splice(pick % F.length, 1)[0]; pick += 3;
    const [a, b, cc] = T, x = nv++, y = nv++, z = nv++;
    F.push([a, b, x], [b, y, x], [b, cc, y], [cc, z, y], [cc, a, z], [a, x, z], [x, y, z]);
    return [x, y, z];
  };
  const glue = (G, nG) => {
    const [x, y, z] = fresh();
    F = F.filter(t => key(t) !== key([x, y, z]));
    const [u, v, w] = G[0], map = new Map([[u, x], [v, y], [w, z]]);
    for (let i = 0; i < nG; i++) if (!map.has(i)) map.set(i, nv++);
    for (const t of G.slice(1)) F.push(t.map(i => map.get(i)));
  };
  for (let i = 0; i < h; i++) glue(TORUS7, 7);
  for (let i = 0; i < c; i++) glue(RP2_F, 6);
  for (let i = 0; i < q; i++) { const t = fresh(); F = F.filter(s => key(s) !== key(t)); }
  return makeComplex(F, names(nv));
}
// 检查：是否为合法的二维单纯复形（无重复面），以及每条边所在三角形数
export function edgeDegrees(K) {
  const deg = Array(K.simp[1].length).fill(0);
  K.simp[2]?.forEach(s => boundaryOf(K, s).forEach(({ i }) => deg[i]++));
  return deg;
}
