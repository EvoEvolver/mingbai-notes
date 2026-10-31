// 第 II 章交互图的数值核心（纯 JS，无 React 依赖，可直接用 node 测试）。
// 复数用 [re, im] 表示；矩阵为复数的二维数组。

export const cx = (re, im = 0) => [re, im];
export const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const csub = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
export const cconj = a => [a[0], -a[1]];
export const cabs = a => Math.hypot(a[0], a[1]);
export const cscale = (a, s) => [a[0] * s, a[1] * s];

export const zeros = n => Array.from({ length: n }, () => Array.from({ length: n }, () => [0, 0]));
export const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => [i === j ? 1 : 0, 0]));
export const matmul = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((s, a, k) => cadd(s, cmul(a, B[k][j])), [0, 0])));
export const dagger = A => A[0].map((_, j) => A.map(row => cconj(row[j])));
export const madd = (A, B) => A.map((r, i) => r.map((a, j) => cadd(a, B[i][j])));
export const msub = (A, B) => A.map((r, i) => r.map((a, j) => csub(a, B[i][j])));
export const mscale = (A, s) => A.map(r => r.map(a => cscale(a, s)));
export const maxAbs = A => Math.max(...A.flat().map(cabs));
export const real = A => A.map(r => r.map(x => [x, 0]));
// 外积 |v><v|
export const outer = (u, v) => u.map(a => v.map(b => cmul(a, cconj(b))));
export const col = (V, j) => V.map(r => r[j]);
export const inner = (u, v) => u.reduce((s, a, i) => cadd(s, cmul(cconj(a), v[i])), [0, 0]);   // <u|v>

// 厄米矩阵的循环 Jacobi 对角化：返回 { vals（升序）, vecs（列为正交归一本征矢）}
export function eigh(A0, tol = 1e-13, maxSweep = 60) {
  const n = A0.length;
  let A = A0.map(r => r.map(x => [x[0], x[1]]));
  for (let i = 0; i < n; i++) A[i][i] = [A[i][i][0], 0];               // 对角元取实部（厄米）
  let V = eye(n);
  for (let sweep = 0; sweep < maxSweep; sweep++) {
    let off = 0;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += cabs(A[p][q]) ** 2;
    if (off < tol * tol) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      const r = cabs(A[p][q]); if (r < 1e-300) continue;
      const phi = Math.atan2(A[p][q][1], A[p][q][0]);
      const a = A[p][p][0], b = A[q][q][0];
      const th = 0.5 * Math.atan2(2 * r, a - b), c = Math.cos(th), s = Math.sin(th);
      const e = [Math.cos(-phi), Math.sin(-phi)];                       // e^{-iφ}
      const U = eye(n);
      U[p][p] = [c, 0]; U[q][p] = cscale(e, s); U[p][q] = [-s, 0]; U[q][q] = cscale(e, c);
      A = matmul(dagger(U), matmul(A, U));
      V = matmul(V, U);
    }
  }
  const vals = A.map((r, i) => r[i][0]);
  const idx = vals.map((v, i) => i).sort((i, j) => vals[i] - vals[j]);
  // 规范相位：每个本征矢的第一个非零分量取为正实数（便于阅读）
  const vecs = V.map(r => idx.map(j => r[j]));
  for (let j = 0; j < n; j++) {
    let k = 0; while (k < n && cabs(vecs[k][j]) < 1e-9) k++;
    if (k === n) continue;
    const z = vecs[k][j], ph = [z[0] / cabs(z), -z[1] / cabs(z)];
    for (let i = 0; i < n; i++) vecs[i][j] = cmul(vecs[i][j], ph);
  }
  return { vals: idx.map(i => vals[i]), vecs };
}

// 把本征值按简并分组（容差 tol），返回 [{ val, cols:[…] }]
export function groupEig({ vals }, tol = 1e-7) {
  const g = [];
  vals.forEach((v, j) => { const last = g[g.length - 1]; if (last && Math.abs(v - last.val) < tol) last.cols.push(j); else g.push({ val: v, cols: [j] }); });
  for (const x of g) x.val = x.cols.reduce((s, j) => s + vals[j], 0) / x.cols.length;
  return g;
}
// 每个本征子空间的投影算符 P = Σ |v><v|
export function projectors(E, tol) {
  const n = E.vecs.length;
  return groupEig(E, tol).map(gr => {
    let P = zeros(n);
    for (const j of gr.cols) { const v = col(E.vecs, j); P = madd(P, outer(v, v)); }
    return { val: gr.val, deg: gr.cols.length, P };
  });
}

// 单位矩阵 / 绕轴转动：用于构造对易的可观测量
export function rotation3(th, ph) {
  // 先绕 z 转 ph，再绕 x 转 th（实正交矩阵）
  const cz = Math.cos(ph), sz = Math.sin(ph), cxx = Math.cos(th), sx = Math.sin(th);
  const Rz = [[cz, -sz, 0], [sz, cz, 0], [0, 0, 1]], Rx = [[1, 0, 0], [0, cxx, -sx], [0, sx, cxx]];
  return matmul(real(Rx), real(Rz));
}
export const diag = d => d.map((x, i) => d.map((_, j) => [i === j ? x : 0, 0]));

// ---------- 盒中正弦基展开（A-2 节）----------
// u_n(x) = sqrt(2/L) sin(nπx/L)，0<x<L（取 L=1）
export const uBox = (n, x) => Math.SQRT2 * Math.sin(n * Math.PI * x);
export const BOX_FUNCS = {
  tri: { f: x => (x < 0.5 ? x : 1 - x) },                        // 三角形
  step: { f: x => (x > 0.25 && x < 0.6 ? 1 : 0) },               // 方台（有跳变）
  gauss: { f: x => Math.exp(-((x - 0.35) ** 2) / (2 * 0.06 ** 2)) },   // 高斯包
  flat: { f: () => 1 },                                          // 常数（在边界不为零）
};
export function simpson(f, a, b, n = 2000) {
  if (n % 2) n++;
  const h = (b - a) / n; let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return s * h / 3;
}
// 归一化后的函数、展开系数 c_n、范数
export function boxExpansion(key, N = 60) {
  const f0 = BOX_FUNCS[key].f;
  // 对含跳变的函数用足够细的网格；分段积分以提高精度
  const integ = g => simpson(g, 0, 1, 6000);
  const norm2 = integ(x => f0(x) ** 2), k = 1 / Math.sqrt(norm2);
  const f = x => k * f0(x);
  const c = Array.from({ length: N }, (_, i) => integ(x => uBox(i + 1, x) * f(x)));
  return { f, c };
}
export const partialSum = (c, M, x) => { let s = 0; for (let n = 1; n <= M; n++) s += c[n - 1] * uBox(n, x); return s; };

// ---------- 两比特态：Schmidt 分解（F 节）----------
// 态 |ψ> = Σ c_{ij} |i>|j>，C 为 2×2 系数矩阵。Schmidt 系数 = C 的奇异值 = sqrt(eig(C C†))
export function schmidt(C) {
  const n2 = C.flat().reduce((s, z) => s + cabs(z) ** 2, 0);
  const Cn = C.map(r => r.map(z => cscale(z, 1 / Math.sqrt(n2))));
  const rhoA = matmul(Cn, dagger(Cn));                 // 约化密度矩阵 ρ_1 = C C†
  const E = eigh(rhoA);
  const p = E.vals.map(v => Math.max(0, v)).reverse();  // 降序
  const s = p.map(Math.sqrt);
  const det = csub(cmul(Cn[0][0], Cn[1][1]), cmul(Cn[0][1], Cn[1][0]));
  const S = -p.reduce((acc, x) => acc + (x > 1e-15 ? x * Math.log2(x) : 0), 0);
  // 左 Schmidt 矢 |a_k> = ρ_1 的本征矢；右 Schmidt 矢 |b_k> = C^T conj(a_k) / s_k
  const a = [col(E.vecs, 1), col(E.vecs, 0)];
  const b = a.map((ak, k) => {
    if (s[k] < 1e-12) return null;
    // b_j = Σ_i conj(a_i) C_ij / s
    return [0, 1].map(j => cscale(cadd(cmul(cconj(ak[0]), Cn[0][j]), cmul(cconj(ak[1]), Cn[1][j])), 1 / s[k]));
  });
  return { Cn, s, det, conc: 2 * cabs(det), S, rhoA, a, b };
}
