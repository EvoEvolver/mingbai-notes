// ACES 导读的数值核心（纯 JS，无 React 依赖，可直接用 node 测试：node /tmp/acestest/test.mjs）。
// 记号与原文一致：Pauli 用每个比特的编码 0=I,1=X,2=Y,3=Z（等价于比特串 (x,z)：X=(1,0)、Y=(1,1)、Z=(0,1)）。
// 1. Pauli 信道 ↔ Pauli 本征值（Walsh–Hadamard 变换，式 (7)(8)），单纯形投影
// 2. Clifford 门在 Pauli 上的作用、Pauli 沿电路传播（式 (14)(15)，图 2 的例子）
// 3. 迷你 ACES：玩具电路 → 设计矩阵 A（式 (18)(19)）→ 实验打包（算法 1 的简化版）→ 协方差 Ω（式 (23)）
//    → WLS 估计（式 (25)）→ 性能指标 F、V（式 (26)(28)(29)）及其对 shot 权重的解析梯度 → Nesterov 优化（式 (30)(31)）
//    → 逐 shot 的 Pauli 帧蒙特卡洛模拟（有限 shot 统计噪声）
// 4. 附录 C 的玩具问题：式 (C13)–(C21)，最优重复次数 φ_opt

// ---------- 可复现随机数 ----------
export function mulberry32(seed) {
  return () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export function gauss(rng) { let u = 0; while (u === 0) u = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng()); }

// =====================================================================
// 1. Pauli 与 Walsh–Hadamard 变换
// =====================================================================
export const PL = ["I", "X", "Y", "Z"];
const XB = [0, 1, 1, 0], ZB = [0, 0, 1, 1];
const code = (x, z) => (x ? (z ? 2 : 1) : (z ? 3 : 0));
// 单比特辛内积：两个非恒等且不同的 Pauli 反对易
export const om1 = (a, b) => (a && b && a !== b ? 1 : 0);
// 多比特 Pauli（编码数组）的辛内积 ω(a,b) mod 2
export const omega = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s ^= om1(a[i], b[i]); return s; };
export const pauliStr = a => a.map(c => PL[c]).join("");
// 第 k 个 n 比特 Pauli（第 0 个比特为最高位）
export const pauliOf = (k, n) => { const a = []; for (let i = n - 1; i >= 0; i--) a[i] = (k >> (2 * (n - 1 - i))) & 3; return a; };
export const allPaulis = n => Array.from({ length: 4 ** n }, (_, k) => pauliOf(k, n));
// 式 (7)：λ_b = Σ_a (−1)^{ω(a,b)} p_a
export function probsToEigs(p, n) {
  const P = allPaulis(n);
  return P.map(b => P.reduce((s, a, i) => s + (omega(a, b) ? -1 : 1) * p[i], 0));
}
// 式 (8)：p_a = 4^{−n} Σ_b (−1)^{ω(a,b)} λ_b
export function eigsToProbs(l, n) {
  const P = allPaulis(n), f = 1 / 4 ** n;
  return P.map(a => f * P.reduce((s, b, j) => s + (omega(a, b) ? -1 : 1) * l[j], 0));
}
// 欧氏距离意义下投影到概率单纯形（原文 [70] 的简单算法）
export function simplexProject(v) {
  const u = [...v].sort((a, b) => b - a); let c = 0, th = 0;
  for (let i = 0; i < u.length; i++) { c += u[i]; const t = (c - 1) / (i + 1); if (u[i] - t > 0) th = t; }
  return v.map(x => Math.max(x - th, 0));
}

// =====================================================================
// 2. Clifford 门对 Pauli 的共轭作用（只跟踪 Pauli，不跟踪符号——符号在实验中被修正）
// =====================================================================
const mapH = c => code(ZB[c], XB[c]);                 // X↔Z，Y→Y
const mapS = c => code(XB[c], ZB[c] ^ XB[c]);         // X→Y，Y→X，Z→Z
const mapId = c => c;                                  // I、X、Y、Z 门：只改符号
export function applyGate(g, a) {                     // g = {t, q:[...]}；a 为 n 比特编码数组（原地修改）
  if (g.t === "H") a[g.q[0]] = mapH(a[g.q[0]]);
  else if (g.t === "S") a[g.q[0]] = mapS(a[g.q[0]]);
  else if (g.t === "CZ" || g.t === "CX") {
    const [i, j] = g.q; let xi = XB[a[i]], zi = ZB[a[i]], xj = XB[a[j]], zj = ZB[a[j]];
    if (g.t === "CZ") { zi ^= xj; zj ^= xi; } else { xj ^= xi; zi ^= zj; }
    a[i] = code(xi, zi); a[j] = code(xj, zj);
  } else a.forEach((c, k) => { if (g.q.includes(k)) a[k] = mapId(c); });
  return a;
}
// 门支撑上的局部 Pauli 编号（1..4^b−1），与 allPaulis(b) 的顺序一致
export const localIdx = (g, a) => g.q.reduce((k, q) => 4 * k + a[q], 0);

// 沿 tuple 传播一个 Pauli：返回每层之前的 Pauli（式 (15) 的 a^{(u)}）与最后的 Pauli
export function propagate(layers, T, a0) {
  const a = [...a0], seq = [];
  for (const i of T) { seq.push([...a]); for (const g of layers[i]) applyGate(g, a); }
  return { seq, out: a };
}

// =====================================================================
// 3. 迷你 ACES
// =====================================================================
// 玩具「综合征提取」电路：q1 为测量比特，q0、q2 为数据比特；4 个不同的层
//   层 1：H(q1)，空闲 q0、q2 以恒等门填充；层 2：CZ(q0,q1)，I(q2)；层 3：X 动力学解耦；层 4：CZ(q1,q2)，I(q0)
//   原电路 tuple = (1,2,3,4,1)，测量 q1 即得 Z0Z2 的奇偶。
export const TOY = {
  n: 3,
  layers: {
    1: [{ t: "I", q: [0] }, { t: "H", q: [1] }, { t: "I", q: [2] }],
    2: [{ t: "CZ", q: [0, 1] }, { t: "I", q: [2] }],
    3: [{ t: "X", q: [0] }, { t: "X", q: [1] }, { t: "X", q: [2] }],
    4: [{ t: "I", q: [0] }, { t: "CZ", q: [1, 2] }],
  },
  layerTime: { 1: 1, 2: 1, 3: 1, 4: 1 },   // 单位：一个门层的时间（原文 29 ns）
  tauMR: 660 / 29,                          // 测量+复位时间（原文附录 F：660 ns）
  circuit: [1, 2, 3, 4, 1],
};

// 门本征值的指标集 N（式 (11)）+ 3n 个 SPAM（测量）参数
export function buildIndex(C) {
  const items = [], key = {};
  for (const i of Object.keys(C.layers).map(Number)) C.layers[i].forEach((g, j) => {
    const b = g.q.length;
    for (let k = 1; k < 4 ** b; k++) { key[`${i}:${j}:${k}`] = items.length; items.push({ kind: "gate", layer: i, gate: j, g, k, label: `\\lambda_{${i}${j + 1},${pauliStr(pauliOf(k, b))}}` }); }
  });
  for (let q = 0; q < C.n; q++) for (let c = 1; c <= 3; c++) { key[`m:${q}:${c}`] = items.length; items.push({ kind: "meas", q, c, label: `\\lambda_{\\mathrm m${q},${PL[c]}}` }); }
  return { items, key, N: items.length };
}

// 一个 n 比特 Pauli 在 tuple T 下的电路本征值指数行 A_μ（式 (18)），稀疏 {idx: power}
export function rowOf(C, IX, T, a0) {
  const row = {}, a = [...a0];
  const add = k => { row[k] = (row[k] || 0) + 1; };
  for (const i of T) {
    C.layers[i].forEach((g, j) => { const k = localIdx(g, a); if (k) add(IX.key[`${i}:${j}:${k}`]); });
    for (const g of C.layers[i]) applyGate(g, a);
  }
  a.forEach((c, q) => { if (c) add(IX.key[`m:${q}:${c}`]); });
  return { row, out: a };
}
export const eigOfRow = (row, lam) => { let s = 1; for (const k in row) s *= lam[k] ** row[k]; return s; };

// Pauli 制备集 Q_T（式 (16)）；空 tuple 用每个比特上的单比特 X、Y、Z 测 SPAM
export function prepSet(C, T) {
  const n = C.n, seen = new Set(), out = [];
  const gates = T.length ? [...new Set(T)].flatMap(i => C.layers[i]) : Array.from({ length: n }, (_, q) => ({ q: [q] }));
  for (const g of gates) {
    const b = g.q.length;
    for (let k = 1; k < 4 ** b; k++) {
      const loc = pauliOf(k, b), a = Array(n).fill(0); g.q.forEach((q, r) => { a[q] = loc[r]; });
      const s = a.join(""); if (!seen.has(s)) { seen.add(s); out.push(a); }
    }
  }
  return out;
}
// T-相容：制备与测量的每个比特上，两者相同或至少一个是 I
const consistent = (u, v) => u.every((c, q) => !c || !v[q] || c === v[q]);
const supp = a => a.reduce((s, c, q) => (c ? [...s, q] : s), []);

// 算法 1（实验打包）的简化实现：先放还没进任何实验的 Pauli，再用其余相容 Pauli 填满
export function packExperiments(prep, out) {
  const M = prep.length, ord = [...Array(M).keys()].sort((x, y) => supp(out[y]).length - supp(out[x]).length);
  const ok = (x, y) => consistent(prep[x], prep[y]) && consistent(out[x], out[y]);
  let unadded = new Set(ord); const exps = [];
  while (unadded.size) {
    const E = [], mq = new Set();
    let U = ord.filter(x => unadded.has(x)), Q = [...ord];
    const pick = L => { let best = L[0], bo = -1; for (const x of L) { const o = supp(out[x]).filter(q => mq.has(q)).length; if (o > bo) { bo = o; best = x; } } return best; };
    const take = x => { E.push(x); supp(out[x]).forEach(q => mq.add(q)); unadded.delete(x); U = U.filter(y => y !== x && ok(x, y)); Q = Q.filter(y => y !== x && ok(x, y)); };
    while (U.length) take(pick(U));
    Q = Q.filter(y => !E.includes(y));
    while (Q.length) take(pick(Q));
    exps.push(E);
  }
  return exps;
}

// 为一个 tuple 预先算好：行、实验、电路时间
export function tupleData(C, IX, T) {
  const prep = prepSet(C, T), rows = prep.map(a => rowOf(C, IX, T, a));
  const out = rows.map(r => r.out), exps = packExperiments(prep, out);
  const tau = C.tauMR + T.reduce((s, i) => s + C.layerTime[i], 0);
  return { T, prep, rows: rows.map(r => r.row), out, exps, tau };
}

// ---------- 小型稠密线性代数 ----------
const zeros = (r, c) => Array.from({ length: r }, () => new Float64Array(c));
export function cholInv(Ain) {               // 对称正定矩阵求逆（Cholesky）
  const n = Ain.length, L = zeros(n, n);
  for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) {
    let s = Ain[i][j]; for (let k = 0; k < j; k++) s -= L[i][k] * L[j][k];
    if (i === j) { if (s <= 0) throw new Error("not PD"); L[i][i] = Math.sqrt(s); } else L[i][j] = s / L[j][j];
  }
  const Li = zeros(n, n);
  for (let i = 0; i < n; i++) { Li[i][i] = 1 / L[i][i]; for (let j = 0; j < i; j++) { let s = 0; for (let k = j; k < i; k++) s -= L[i][k] * Li[k][j]; Li[i][j] = s / L[i][i]; } }
  const R = zeros(n, n);
  for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) { let s = 0; for (let k = i; k < n; k++) s += Li[k][i] * Li[k][j]; R[i][j] = R[j][i] = s; }
  return R;
}
const mm = (A, B) => { const n = A.length, m = B[0].length, K = B.length, R = zeros(n, m); for (let i = 0; i < n; i++) { const Ai = A[i], Ri = R[i]; for (let k = 0; k < K; k++) { const a = Ai[k]; if (!a) continue; const Bk = B[k]; for (let j = 0; j < m; j++) Ri[j] += a * Bk[j]; } } return R; };
const trAB = (A, B) => { let s = 0; for (let i = 0; i < A.length; i++) for (let j = 0; j < A.length; j++) s += A[i][j] * B[j][i]; return s; };
export function jacobiEig(Ain) {              // 对称矩阵特征值（Jacobi 旋转）
  const n = Ain.length, A = Ain.map(r => Float64Array.from(r));
  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] ** 2;
    if (off < 1e-30) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(A[p][q]) < 1e-300) continue;
      const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq; }
      for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk; }
    }
  }
  return A.map((r, i) => r[i]);
}

// 每个 tuple 块的协方差结构。按式 (23)，取 S_T=1 的「单位」协方差 Ω*：
//   Ω*_{aa'} = E_{aa'}/(E_a E_{a'}) · (Λ_{a+a'} − Λ_a Λ_{a'})；对数域 Ω*'_{aa'} = Ω*_{aa'}/(Λ_a Λ_{a'})
// 实际协方差 Ω_U = c_U Ω*_U，其中 c_U = |E_U| τ_Γ /(S' τ_basic Γ_U)（由 S_T = SΓ_T/|E_T| 与式 (22) 得到）。
export function blockStats(C, IX, td, lam) {
  const m = td.rows.length, Lam = td.rows.map(r => eigOfRow(r, lam));
  const Ea = new Array(m).fill(0), Eaa = zeros(m, m);
  for (const E of td.exps) for (const x of E) { Ea[x]++; for (const y of E) Eaa[x][y]++; }
  const Om = zeros(m, m);
  for (let x = 0; x < m; x++) for (let y = 0; y < m; y++) {
    if (!Eaa[x][y]) continue;
    let Lxy;
    if (x === y) Lxy = 1;
    else { const s = td.prep[x].map((c, q) => c ^ td.prep[y][q]); Lxy = eigOfRow(rowOf(C, IX, td.T, s).row, lam); }   // a+a' 即比特串相加
    Om[x][y] = Eaa[x][y] / (Ea[x] * Ea[y]) * (Lxy - Lam[x] * Lam[y]) / (Lam[x] * Lam[y]);
  }
  return { Lam, Ea, Om };
}

// 预计算一个设计的所有 tuple 块：G_U = A_Uᵀ W*_U A_U，H_U = (W*_U A_U)ᵀ Ω*'_U (W*_U A_U)
export function prepareDesign(C, IX, tuples, lam) {
  const N = IX.N, basicTau = basicTimeFactor(C);
  const blocks = tuples.map(T => {
    const td = tupleData(C, IX, T), st = blockStats(C, IX, td, lam), m = td.rows.length;
    const A = td.rows.map(r => { const v = new Float64Array(N); for (const k in r) v[k] = r[k]; return v; });
    const w = st.Om.map((r, i) => 1 / r[i]);
    const G = zeros(N, N), WA = A.map((r, i) => r.map(v => v * w[i]));
    for (let i = 0; i < m; i++) { const r = A[i], wr = WA[i]; for (let a = 0; a < N; a++) { if (!wr[a]) continue; for (let b = 0; b < N; b++) if (r[b]) G[a][b] += wr[a] * r[b]; } }
    const H = zeros(N, N);
    for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) { const o = st.Om[i][j]; if (!o) continue; const ri = WA[i], rj = WA[j]; for (let a = 0; a < N; a++) { if (!ri[a]) continue; for (let b = 0; b < N; b++) if (rj[b]) H[a][b] += ri[a] * o * rj[b]; } }
    return { T, td, st, A, G, H, m, nE: td.exps.length, tau: td.tau };
  });
  return { C, IX, N, lam, blocks, basicTau };
}
export function basicTuples(C) { return [[], ...Object.keys(C.layers).map(i => [Number(i)])]; }
// 基本 tuple 集在默认权重 Γ_T ∝ 1/τ_T 下的时间因子 τ_{T_I}
export function basicTimeFactor(C) {
  const taus = basicTuples(C).map(T => C.tauMR + T.reduce((s, i) => s + C.layerTime[i], 0));
  return taus.length / taus.reduce((s, t) => s + 1 / t, 0);
}
export const defaultWeights = D => { const w = D.blocks.map(b => 1 / b.tau), s = w.reduce((a, b) => a + b, 0); return w.map(x => x / s); };

// 性能指标：Σ' = P⁻¹ Q P⁻¹（式 (26)，WLS），P = Σ_U G_U/c_U，Q = Σ_U H_U/c_U；Σ = diag(λ) Σ' diag(λ)
// 取 S' = 1：F = √(1/N)·√trΣ·(1 − trΣ²/(4 (trΣ)²))（式 (28)），V 按式 (29)。可选返回对 Γ 的解析梯度。
export function figureOfMerit(D, Gam, wantGrad = false) {
  const { N, blocks, lam, basicTau } = D;
  const tauG = blocks.reduce((s, b, u) => s + Gam[u] * b.tau, 0);
  const inv_c = blocks.map((b, u) => Gam[u] * basicTau / (b.nE * tauG));   // 1/c_U（S'=1）
  const P = zeros(N, N), Q = zeros(N, N);
  blocks.forEach((b, u) => { const f = inv_c[u]; for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { P[i][j] += f * b.G[i][j]; Q[i][j] += f * b.H[i][j]; } });
  const Pi = cholInv(P), Sp = mm(mm(Pi, Q), Pi);
  const D2 = lam.map(l => l * l);
  const Sig = Sp.map((r, i) => r.map((v, j) => v * lam[i] * lam[j]));
  let t1 = 0; for (let i = 0; i < N; i++) t1 += Sig[i][i];
  const t2 = trAB(Sig, Sig);
  const F = Math.sqrt(t1 / N) * (1 - t2 / (4 * t1 * t1));
  const V = t2 / (2 * N * t1) * (1 - t2 / (8 * t1 * t1));
  const res = { F, V, t1, t2, Sig, tauG };
  if (!wantGrad) return res;
  // d trΣ = −2 tr(Σ'D²P⁻¹ dP) + tr(P⁻¹D²P⁻¹ dQ)；d trΣ² = 2[−2 tr(Σ'E P⁻¹ dP) + tr(P⁻¹E P⁻¹ dQ)]，E = D²Σ'D²
  const scaleL = (M, v) => M.map((r, i) => r.map(x => x * v[i]));
  const scaleR = (M, v) => M.map(r => r.map((x, j) => x * v[j]));
  const R1 = mm(scaleR(Sp, D2), Pi), R2 = mm(scaleR(Pi, D2), Pi);
  const E = scaleR(scaleL(Sp, D2), D2);
  const R3 = mm(mm(Sp, E), Pi), R4 = mm(mm(Pi, E), Pi);
  // ∂(1/c_U)/∂Γ_T = basicTau/(nE_U) [δ_UT/τ_Γ − Γ_U τ_T/τ_Γ²]
  const gP = blocks.map(b => trAB(R1, b.G)), gQ = blocks.map(b => trAB(R2, b.H));
  const gP2 = blocks.map(b => trAB(R3, b.G)), gQ2 = blocks.map(b => trAB(R4, b.H));
  const sumP = blocks.reduce((s, b, u) => s + inv_c[u] * gP[u], 0), sumQ = blocks.reduce((s, b, u) => s + inv_c[u] * gQ[u], 0);
  const sumP2 = blocks.reduce((s, b, u) => s + inv_c[u] * gP2[u], 0), sumQ2 = blocks.reduce((s, b, u) => s + inv_c[u] * gQ2[u], 0);
  const dt1 = blocks.map((b, T) => { const d = basicTau / (b.nE * tauG); return -2 * d * gP[T] + d * gQ[T] - (b.tau / tauG) * (-2 * sumP + sumQ); });
  const dt2 = blocks.map((b, T) => { const d = basicTau / (b.nE * tauG); return 2 * (-2 * d * gP2[T] + d * gQ2[T] - (b.tau / tauG) * (-2 * sumP2 + sumQ2)); });
  // 式 (D2)（S'=1）
  const gF = dt1.map((d1, u) => Math.sqrt(1 / N) * (d1 * (t1 * t1 / 2 + 3 * t2 / 8) / t1 ** 2.5 - dt2[u] / (4 * t1 ** 1.5)));
  return { ...res, gF };
}

// 式 (30)(31)：对 shot 对数权重 γ（Γ_T = e^{−γ_T}/Σe^{−γ_U}）做 Nesterov 动量梯度下降；
// 变差的步回退并清零速度，连续回退时把学习率除以 η_r。参数取原文的 η=10^{3/4}, μ=0.99, η_r=10^{1/4}。
export function optimiseWeights(D, Gam0, { iters = 300, eta = 10 ** 0.75, mu = 0.99, etaR = 10 ** 0.25 } = {}) {
  const toG = g => { const e = g.map(x => Math.exp(-x)), s = e.reduce((a, b) => a + b, 0); return e.map(x => x / s); };
  let gam = Gam0.map(x => -Math.log(x)), v = gam.map(() => 0), best = figureOfMerit(D, Gam0).F, fails = 0;
  const hist = [best];
  for (let s = 0; s < iters; s++) {
    const look = gam.map((g, i) => g + mu * v[i]), G = toG(look), r = figureOfMerit(D, G, true);
    const dg = G.map((_, T) => G.reduce((acc, GU, U) => acc + r.gF[U] * (GU * G[T] - (U === T ? G[T] : 0)), 0));  // 式 (D1)
    const v2 = v.map((vi, i) => mu * vi - eta * dg[i]), g2 = gam.map((g, i) => g + v2[i]);
    const F2 = figureOfMerit(D, toG(g2)).F;
    if (F2 < best) { gam = g2; v = v2; best = F2; fails = Math.max(0, fails - 1); }
    else { v = v.map(() => 0); fails++; if (fails >= 2) { eta /= etaR; fails = 0; } }
    hist.push(best);
    if (eta < 1e-6) break;
  }
  return { Gam: toG(gam), F: best, hist };
}

// ---------- 噪声模型：对数正态 Pauli 噪声（附录 F 的构造，玩具用较大的错误率） ----------
// 每个 b 比特门：4^b−1 个非恒等 Pauli 错误概率各自独立对数正态；均值使门不保真度之和的期望为 r_b；测量：翻转概率均值 r_m
export function lognormalNoise(C, IX, { r1, r2, rm, s2tot = Math.log(10 / 9), seed = 0, depol = false }) {
  const rng = mulberry32(seed * 7919 + 13), probs = {}, lam = new Array(IX.N).fill(1);
  const draw = (mean, b) => {
    const bp = 4 ** b - 1;
    if (depol) return Array(bp).fill(mean / bp);
    const sZ2 = Math.log(1 + bp * (Math.exp(s2tot) - 1)), muZ = Math.log(mean / bp) - sZ2 / 2;      // 式 (F1)(F2)
    return Array.from({ length: bp }, () => Math.exp(muZ + Math.sqrt(sZ2) * gauss(rng)));
  };
  for (const i of Object.keys(C.layers).map(Number)) C.layers[i].forEach((g, j) => {
    const b = g.q.length, pe = draw(b === 1 ? r1 : r2, b), p = [1 - pe.reduce((a, c) => a + c, 0), ...pe];
    probs[`${i}:${j}`] = p;
    const l = probsToEigs(p, b);
    for (let k = 1; k < 4 ** b; k++) lam[IX.key[`${i}:${j}:${k}`]] = l[k];
  });
  for (let q = 0; q < C.n; q++) for (let c = 1; c <= 3; c++) {
    const pm = depol ? rm : Math.exp(Math.log(rm) - s2tot / 2 + Math.sqrt(s2tot) * gauss(rng));
    probs[`m:${q}:${c}`] = pm; lam[IX.key[`m:${q}:${c}`]] = 1 - 2 * pm;
  }
  return { probs, lam };
}

// ---------- 逐 shot 的蒙特卡洛（Pauli 帧）：有限 shot 统计噪声 ----------
// 对 tuple 的每个实验：每个 shot 在每层每个门之前按信道抽一个 Pauli 错误，若与 a^{(u)} 在门支撑上反对易就翻转 a 的读数；
// 测量比特按其基以概率 p_m 翻转。为了快，按几何分布跳到下一次出错的 shot。返回 Λ̂（及每个 Λ̂ 的 shot 数）。
function geomSkip(rng, q) { return q >= 1 ? 1 : 1 + Math.floor(Math.log(1 - rng()) / Math.log(1 - q)); }
export function simulateBlock(C, IX, b, noise, shotsPerExp, rng) {
  const td = b.td, m = td.rows.length, est = new Float64Array(m), nShots = new Float64Array(m);
  for (const E of td.exps) {
    const K = E.length, flips = new Int32Array(shotsPerExp);  // 第 r 位 = E[r] 的读数是否翻转（K ≤ 31）
    // 每个门位置 (u, gate) 对 E 中每个 a 的「反对易掩码」，按错误 Pauli 编号
    const seqs = E.map(x => propagate(C.layers, td.T, td.prep[x]).seq);
    td.T.forEach((i, u) => C.layers[i].forEach((g, j) => {
      const p = noise.probs[`${i}:${j}`], qerr = 1 - p[0], b2 = g.q.length;
      if (qerr <= 0) return;
      const cum = []; let s = 0; for (let k = 1; k < p.length; k++) { s += p[k] / qerr; cum.push(s); }
      const masks = []; for (let k = 1; k < 4 ** b2; k++) {
        const e = pauliOf(k, b2); let mk = 0;
        E.forEach((x, r) => { const a = seqs[r][u]; let o = 0; g.q.forEach((q, t) => { o ^= om1(e[t], a[q]); }); if (o) mk |= 1 << r; });
        masks.push(mk);
      }
      for (let sh = geomSkip(rng, qerr) - 1; sh < shotsPerExp; sh += geomSkip(rng, qerr)) {
        const u2 = rng(); let k = 0; while (k < cum.length - 1 && u2 > cum[k]) k++;
        flips[sh] ^= masks[k];
      }
    }));
    // 测量错误：每个测量比特 q 在其基 c 下翻转，影响所有 out 在 q 上非恒等的 a
    const mq = {}; E.forEach((x, r) => td.out[x].forEach((c, q) => { if (c) { mq[q] = mq[q] || { c, mask: 0 }; mq[q].mask |= 1 << r; } }));
    for (const q in mq) {
      const pm = noise.probs[`m:${q}:${mq[q].c}`];
      for (let sh = geomSkip(rng, pm) - 1; sh < shotsPerExp; sh += geomSkip(rng, pm)) flips[sh] ^= mq[q].mask;
    }
    const cnt = new Float64Array(K);
    for (let sh = 0; sh < shotsPerExp; sh++) { const f = flips[sh]; if (!f) continue; for (let r = 0; r < K; r++) if (f >> r & 1) cnt[r]++; }
    E.forEach((x, r) => { est[x] += shotsPerExp - 2 * cnt[r]; nShots[x] += shotsPerExp; });
  }
  return { Lhat: Array.from(est, (v, i) => v / nShots[i]), nShots: Array.from(nShots) };
}

// 一次完整的 ACES：给定测量预算 S'（基本设计在同样时间里能采的 shot 数），按 Γ 分配 → 模拟 → WLS 估计（式 (25)）
export function runACES(D, Gam, noise, Sprime, rng) {
  const { N, blocks, basicTau, C, IX } = D;
  const tauG = blocks.reduce((s, b, u) => s + Gam[u] * b.tau, 0), S = Sprime * basicTau / tauG;   // 式 (22)
  const ATA = zeros(N, N), ATb = new Float64Array(N);
  const circ = [];
  blocks.forEach((b, u) => {
    const sh = Math.max(1, Math.round(S * Gam[u] / b.nE));
    const { Lhat, nShots } = simulateBlock(C, IX, b, noise, sh, rng);
    b.A.forEach((row, i) => {
      const L = Math.min(Math.max(Lhat[i], 1e-3), 1 - 1e-9);
      const varLog = Math.max((1 - L * L) / nShots[i], 1 / nShots[i] ** 2) / (L * L);   // 估计的 Ω'_μμ
      const w = 1 / varLog, y = -Math.log(L);
      for (let a = 0; a < N; a++) { if (!row[a]) continue; ATb[a] += w * row[a] * y; for (let c = 0; c < N; c++) if (row[c]) ATA[a][c] += w * row[a] * row[c]; }
      circ.push({ u, i, est: Lhat[i], tru: b.st.Lam[i] });
    });
  });
  const Ai = cholInv(ATA), x = Ai.map(r => r.reduce((s, v, j) => s + v * ATb[j], 0));
  const lamHat = x.map(v => Math.exp(-Math.max(v, 0)));           // 负的对数本征值置 0：λ̂ ≤ 1
  const err = Math.sqrt(lamHat.reduce((s, v, i) => s + (v - D.lam[i]) ** 2, 0));
  return { lamHat, rms: Math.sqrt(Sprime / N) * err, circ, S };
}

// 预测分布：‖λ̂−λ‖² = Σ σ_ν y_ν（式 (27)），按 Σ 的特征值抽样，给出归一化 RMS 误差的样本
export function predictedSamples(sig, N, K, rng) {
  const out = [];
  for (let t = 0; t < K; t++) { let s = 0; for (const v of sig) { const z = gauss(rng); s += v * z * z; } out.push(Math.sqrt(s / N)); }
  return out;
}

// =====================================================================
// 4. 附录 C 的玩具问题（单层 n 个单比特 Pauli 门 + SPAM，两个 tuple 重复 φ1、φ2 次）
// =====================================================================
export const toyC = {
  K: tau => (2 * tau + 1) / (4 * tau * (tau + 1)),
  // 式 (C13)–(C15)
  F: (tau, lam, lm, phi1, phi, G) => {
    const f1 = lam ** 2 * (lam ** (-2 * phi1) - lm * lm) / phi ** 2, f2 = lam ** 2 * (lam ** (-2 * phi1) * lam ** (-2 * phi) - lm * lm) / phi ** 2;
    return Math.sqrt(toyC.K(tau) * (tau + phi1 + G * phi) * (f1 / (1 - G) + f2 / G));
  },
  // 式 (C17)：最优 Γ
  Gopt: (tau, lam, lm, phi1, phi) => {
    const f1 = lam ** 2 * (lam ** (-2 * phi1) - lm * lm) / phi ** 2, f2 = lam ** 2 * (lam ** (-2 * phi1) * lam ** (-2 * phi) - lm * lm) / phi ** 2;
    const a = Math.sqrt((tau + phi1 + phi) * f1), b = Math.sqrt((tau + phi1) * f2);
    return b / (a + b);
  },
  // 式 (C20)：φ1 = 0、Γ 取最优后的 F（计时）
  Ftime: (tau, lam, lm, phi) => Math.sqrt(toyC.K(tau)) * lam / phi * (Math.sqrt(tau * (1 - lm * lm)) + Math.sqrt((tau + phi) * (lam ** (-2 * phi) - lm * lm))),
  // 式 (C21)：不计时间的 F'
  Fsamp: (lam, lm, phi) => lam / (Math.SQRT2 * phi) * (Math.sqrt(1 - lm * lm) + Math.sqrt(lam ** (-2 * phi) - lm * lm)),
  // 连续优化 φ 后取上下整中较好者（原文附录 C 的做法）
  phiOpt(Ff) {
    let a = 0, b = Math.log(1e9);
    for (let i = 0; i < 200; i++) { const m1 = a + (b - a) * 0.382, m2 = a + (b - a) * 0.618; if (Ff(Math.exp(m1)) < Ff(Math.exp(m2))) b = m2; else a = m1; }
    const p = Math.exp((a + b) / 2), f = Math.max(1, Math.floor(p)), c = Math.ceil(p);
    return Ff(f) <= Ff(c) ? f : c;
  },
};

// =====================================================================
// 5. 原文报告的数据（用于重画结果图）
// =====================================================================
// 表 I：−log10(门估计误差 TVD 的中位数)，d=25，对数正态 Pauli 噪声
export const TABLE1 = {
  S: [1e6, 1e7, 1e8, 1e9],
  Pauli: [3.841, 4.353, 4.850, 5.348],
  Hadamard: [3.415, 3.829, 4.313, 4.805],
  Measurement: [3.437, 4.045, 4.548, 5.051],
  CZ: [2.761, 3.205, 3.680, 4.171],
};
// 资源随码距：旋转表面码 n = 2d²−1，N(d) = 84d²−36d−24（§V），实验数恒为 261（d=3…25）
export const surf = { n: d => 2 * d * d - 1, N: d => 84 * d * d - 36 * d - 24, experiments: 261 };
// d=25 的归一化 RMS 误差（§V）：S = 10^6…10^9；预测 F = 1.3245 ± 0.0091
export const D25 = { S: [1e6, 1e7, 1e8, 1e9], rms: [1.4480, 1.3243, 1.3303, 1.3245], F: 1.3245, sd: 0.0091 };
