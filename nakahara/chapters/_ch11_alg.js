// 第 11 章的计算核心（纯函数，无 React）：
//  1. 有理数（BigInt）与"加权多项式"代数：变量 v1..v5（陈类 c_j 或 Pontrjagin 类 p_j，权重 j），按权重截断
//  2. 分裂原理：乘性序列 ∏f(x_i) 与加性序列 Σ x_i^k/k! 用初等对称函数表达（Newton 恒等式 + log/exp）
//  3. 原书公式（11.51c、11.66–11.67、11.91–11.92、11.94–11.96）的编码，供逐项比对
//  4. 数值线性代数：行列式、Pfaffian、迹、反对称矩阵的构造
//  5. 单极子（例 11.2）与旋转曲面 Gauss–Bonnet（11.83）的数值积分

// ---------------- 有理数 ----------------
const babs = a => (a < 0n ? -a : a);
const gcd = (a, b) => { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; };
export const Q = (n, d = 1n) => {
  n = BigInt(n); d = BigInt(d);
  if (d < 0n) { n = -n; d = -d; }
  const g = gcd(n, d) || 1n;
  return { n: n / g, d: d / g };
};
export const qadd = (a, b) => Q(a.n * b.d + b.n * a.d, a.d * b.d);
export const qmul = (a, b) => Q(a.n * b.n, a.d * b.d);
export const qdiv = (a, b) => Q(a.n * b.d, a.d * b.n);
export const qneg = a => Q(-a.n, a.d);
export const qeq = (a, b) => a.n === b.n && a.d === b.d;
export const qnum = a => Number(a.n) / Number(a.d);
const qzero = a => a.n === 0n;
const lcm = (a, b) => (a / gcd(a, b)) * b;
const fact = n => { let r = 1n; for (let i = 2n; i <= BigInt(n); i++) r *= i; return r; };

// ---------------- 加权多项式 ----------------
// 多项式 = Map(key → Q)，key = 指数串 "e1,e2,e3,e4,e5"，变量 v_j 的权重为 j
export const NV = 5;
const keyOf = e => e.join(",");
const expOf = k => k.split(",").map(Number);
const weight = e => e.reduce((s, x, i) => s + x * (i + 1), 0);
export const pconst = q => new Map([[keyOf(Array(NV).fill(0)), q]]);
export const pvar = j => { const e = Array(NV).fill(0); e[j - 1] = 1; return new Map([[keyOf(e), Q(1)]]); };
export function padd(a, b) {
  const r = new Map(a);
  for (const [k, v] of b) { const s = r.has(k) ? qadd(r.get(k), v) : v; if (qzero(s)) r.delete(k); else r.set(k, s); }
  return r;
}
export const pscale = (a, q) => { const r = new Map(); if (qzero(q)) return r; for (const [k, v] of a) r.set(k, qmul(v, q)); return r; };
export function pmul(a, b, N = 99) {
  let r = new Map();
  for (const [ka, va] of a) for (const [kb, vb] of b) {
    const e = expOf(ka).map((x, i) => x + expOf(kb)[i]);
    if (weight(e) > N) continue;
    r = padd(r, new Map([[keyOf(e), qmul(va, vb)]]));
  }
  return r;
}
// 取出权重恰为 w 的部分
export const pdeg = (a, w) => { const r = new Map(); for (const [k, v] of a) if (weight(expOf(k)) === w) r.set(k, v); return r; };
export const peq = (a, b) => { const d = padd(a, pscale(b, Q(-1))); return d.size === 0; };
// 数值求值：vals[j-1] = v_j
export const peval = (a, vals) => { let s = 0; for (const [k, v] of a) { let t = qnum(v); expOf(k).forEach((x, i) => { if (x) t *= vals[i] ** x; }); s += t; } return s; };
// 由项表构造：terms = [[num, den, [e1..e5]], …]
export const pfrom = terms => terms.reduce((acc, [n, d, e]) => padd(acc, new Map([[keyOf([...e, 0, 0, 0, 0, 0].slice(0, NV)), Q(n, d)]])), new Map());

// LaTeX：齐次部分提出公分母，如 \frac{1}{720}\left(-c_1^{4}+4c_1^{2}c_2+\cdots\right)
export function ptex(a, sym = "c") {
  if (a.size === 0) return "0";
  const items = [...a].map(([k, v]) => ({ e: expOf(k), v })).sort((p, q) => {
    for (let i = 0; i < NV; i++) if (p.e[i] !== q.e[i]) return q.e[i] - p.e[i];
    return 0;
  });
  let L = 1n; for (const it of items) L = lcm(L, it.v.d);
  const mono = e => e.map((x, i) => (x === 0 ? "" : x === 1 ? `${sym}_${i + 1}` : `${sym}_${i + 1}^{${x}}`)).join("") || "1";
  let body = "";
  items.forEach((it, idx) => {
    const c = it.v.n * (L / it.v.d), m = mono(it.e);
    const s = c < 0n ? "-" : idx ? "+" : "";
    const ac = babs(c);
    body += s + (ac === 1n && m !== "1" ? "" : ac.toString()) + (m === "1" ? "" : m);
  });
  if (L === 1n) return body;
  if (items.length === 1) return body.startsWith("-") ? `-\\frac{1}{${L}}${body.slice(1)}` : `\\frac{1}{${L}}${body}`;
  return `\\frac{1}{${L}}\\left(${body}\\right)`;
}

// ---------------- 级数 ----------------
// 系数数组 [a0, a1, …]（Q），长度 N+1
export const sExp = N => Array.from({ length: N + 1 }, (_, n) => Q(1n, fact(n)));
export function sInv(a, N) {          // 1/a，a0 ≠ 0
  const b = [qdiv(Q(1), a[0])];
  for (let n = 1; n <= N; n++) { let s = Q(0); for (let k = 1; k <= n; k++) s = qadd(s, qmul(a[k] || Q(0), b[n - k])); b.push(qneg(qdiv(s, a[0]))); }
  return b;
}
export function sMul(a, b, N) { const r = []; for (let n = 0; n <= N; n++) { let s = Q(0); for (let k = 0; k <= n; k++) s = qadd(s, qmul(a[k] || Q(0), b[n - k] || Q(0))); r.push(s); } return r; }
export function sLog(a, N) {          // log a，a0 = 1；b_n = a_n − (1/n)Σ_{k<n} k b_k a_{n−k}
  const b = [Q(0)];
  for (let n = 1; n <= N; n++) { let s = Q(0); for (let k = 1; k < n; k++) s = qadd(s, qmul(Q(k), qmul(b[k], a[n - k] || Q(0)))); b.push(qadd(a[n] || Q(0), qneg(qdiv(s, Q(n))))); }
  return b;
}
// 四个生成函数（变量 x；偶函数的以 y = x² 为变量）
export function seriesTodd(N) {        // x/(1−e^{−x})；(1−e^{−x})/x = Σ (−1)^n x^n/(n+1)!
  const a = Array.from({ length: N + 1 }, (_, n) => Q(n % 2 ? -1n : 1n, fact(n + 1)));
  return sInv(a, N);
}
export function seriesL(N) {           // x/tanh x 作为 y = x² 的级数：cosh/(sinh x / x)
  const c = Array.from({ length: N + 1 }, (_, n) => Q(1n, fact(2 * n)));
  const s = Array.from({ length: N + 1 }, (_, n) => Q(1n, fact(2 * n + 1)));
  return sMul(c, sInv(s, N), N);
}
export function seriesAhat(N) {        // (x/2)/sinh(x/2) 作为 y = x² 的级数：1/Σ (y/4)^n/(2n+1)!
  const s = Array.from({ length: N + 1 }, (_, n) => Q(1n, fact(2 * n + 1) * 4n ** BigInt(n)));
  return sInv(s, N);
}
// 原书的 Bernoulli 数（旧约定）B1..B5 = 1/6, 1/30, 1/42, 1/30, 5/66
export const BERN = [null, Q(1, 6), Q(1, 30), Q(1, 42), Q(1, 30), Q(5, 66)];
// 原书 (11.66) 中 x^{2k} 的系数 (−1)^{k−1}B_k/(2k)!
export const bookToddCoef = k => qdiv(qmul(Q(k % 2 ? 1 : -1), BERN[k]), Q(fact(2 * k)));
// 原书 (11.91) 中 x^{2n} 的系数 (−1)^{n−1}2^{2n}B_n/(2n)!
export const bookLCoef = n => qdiv(qmul(Q(n % 2 ? 1n : -1n), qmul(Q(4n ** BigInt(n)), BERN[n])), Q(fact(2 * n)));
// 原书 (11.94) 中 x^{2n} 的系数 (−1)^n(2^{2n}−2)B_n/(2n)!（勘误：漏了 2^{−2n}）
export const bookAhatCoef = n => qdiv(qmul(Q(n % 2 ? -1n : 1n), qmul(Q(4n ** BigInt(n) - 2n), BERN[n])), Q(fact(2 * n)));
export const fixedAhatCoef = n => qdiv(bookAhatCoef(n), Q(4n ** BigInt(n)));

// ---------------- 分裂原理 ----------------
// 幂和 P_k = Σ x_i^k 用初等对称函数 e_j = v_j 表达（Newton 恒等式）
export function powerSums(N) {
  const P = [null];
  for (let k = 1; k <= N; k++) {
    let r = pscale(pvar(k), Q((k % 2 ? 1 : -1) * k));
    for (let i = 1; i < k; i++) r = padd(r, pscale(pmul(pvar(i), P[k - i], N), Q(i % 2 ? 1 : -1)));
    P.push(r);
  }
  return P;
}
// 乘性序列 ∏_i f(x_i)，f = 级数 a（a0 = 1）：log ∏ = Σ_k b_k P_k，再取 exp
export function multiplicative(a, N) {
  const b = sLog(a, N), P = powerSums(N);
  let S = new Map(); for (let k = 1; k <= N; k++) S = padd(S, pscale(P[k], b[k]));
  let out = pconst(Q(1)), term = pconst(Q(1));
  for (let n = 1; n <= N; n++) { term = pscale(pmul(term, S, N), Q(1, n)); out = padd(out, term); }
  return out;
}
// 陈特征 ch_j = P_j/j!
export const chernCharacter = N => { const P = powerSums(N); return [null, ...P.slice(1).map((p, i) => pscale(p, Q(1n, fact(i + 1))))]; };

// 原书公式
export const BOOK = {
  ch2: pfrom([[1, 2, [2]], [-1, 1, [0, 1]]]),                                          // (11.51c)
  Td: [null,
    pfrom([[1, 2, [1]]]),                                                               // (11.67b)
    pfrom([[1, 12, [2]], [1, 12, [0, 1]]]),                                             // (11.67c)
    pfrom([[1, 24, [1, 1]]]),                                                           // (11.67d)
    pfrom([[-1, 720, [4]], [4, 720, [2, 1]], [3, 720, [0, 2]], [1, 720, [1, 0, 1]], [-1, 720, [0, 0, 0, 1]]]),   // (11.67e)
    pfrom([[-1, 1440, [3, 1]], [3, 1440, [1, 2]], [1, 1440, [2, 0, 1]], [-1, 1440, [1, 0, 0, 1]]])],            // (11.67f)
  L: [null, pfrom([[1, 3, [1]]]), pfrom([[-1, 45, [2]], [7, 45, [0, 1]]]), pfrom([[2, 945, [3]], [-13, 945, [1, 1]], [62, 945, [0, 0, 1]]])],   // (11.92)
  Ahat: [null, pfrom([[-1, 24, [1]]]), pfrom([[7, 5760, [2]], [-4, 5760, [0, 1]]]), pfrom([[-31, 967680, [3]], [44, 967680, [1, 1]], [-16, 967680, [0, 0, 1]]])],   // (11.96)
};

// 初等对称函数（数值）e_0..e_n
export function elemSym(xs) { const e = [1]; for (const x of xs) { for (let j = e.length; j >= 1; j--) e[j] = (e[j] || 0) + e[j - 1] * x; } return e; }
// 数值地展开 ∏ f(t·x_i) 到 t^N：coef = f 的系数（数值），返回各阶系数
export function prodSeriesNum(coef, xs, N) {
  let r = [1, ...Array(N).fill(0)];
  for (const x of xs) {
    const f = coef.map((c, n) => c * x ** n);
    const s = Array(N + 1).fill(0);
    for (let i = 0; i <= N; i++) for (let j = 0; i + j <= N; j++) s[i + j] += r[i] * (f[j] || 0);
    r = s;
  }
  return r;
}

// ---------------- 数值线性代数 ----------------
export const matMul = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, a, k) => s + a * B[k][j], 0)));
export const trace = A => A.reduce((s, r, i) => s + r[i], 0);
export const transpose = A => A[0].map((_, j) => A.map(r => r[j]));
export const ident = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => +(i === j)));
export function det(A0) {
  const A = A0.map(r => r.slice()), n = A.length; let d = 1;
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    if (Math.abs(A[p][c]) < 1e-300) return 0;
    if (p !== c) { [A[p], A[c]] = [A[c], A[p]]; d = -d; }
    d *= A[c][c];
    for (let r = c + 1; r < n; r++) { const f = A[r][c] / A[c][c]; for (let k = c; k < n; k++) A[r][k] -= f * A[c][k]; }
  }
  return d;
}
// 标准 Pfaffian（第 1 章 (1.188) 的约定）：沿第一行展开 Pf(A) = Σ_j (−1)^{j} a_{0j} Pf(A 去掉 0, j)
export function pfaffian(A) {
  const n = A.length; if (n === 0) return 1; if (n % 2) return 0;
  let s = 0;
  for (let j = 1; j < n; j++) {
    if (A[0][j] === 0) continue;
    const keep = [...Array(n).keys()].filter(i => i !== 0 && i !== j);
    s += (j % 2 ? 1 : -1) * A[0][j] * pfaffian(keep.map(r => keep.map(c => A[r][c])));
  }
  return s;
}
// 固定的一组 Givens 转动之积 → SO(n) 中的"随机"矩阵（结果可复现）
export function rotation(n, seed = 1) {
  let S = ident(n), s = seed;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  for (let rep = 0; rep < 3; rep++) for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    const a = 2 * Math.PI * rnd(), c = Math.cos(a), si = Math.sin(a), G = ident(n);
    G[i][i] = c; G[j][j] = c; G[i][j] = -si; G[j][i] = si; S = matMul(S, G);
  }
  return S;
}
// 块对角标准形 Λ（块 [[0, a_i], [−a_i, 0]]），k 为奇数时末行末列为零，再转到一般位置 A = S Λ S^t
export function skewFromRoots(xs, k, seed = 7) {
  const L = Array.from({ length: k }, () => Array(k).fill(0));
  xs.forEach((a, i) => { L[2 * i][2 * i + 1] = a; L[2 * i + 1][2 * i] = -a; });
  const S = rotation(k, seed);
  return matMul(matMul(S, L), transpose(S));
}
export function matPow(A, p) { let R = ident(A.length); for (let i = 0; i < p; i++) R = matMul(R, A); return R; }
// 4×4 反对称矩阵的 ε^{ijkl}A_{ij}A_{kl}
export function epsAA(A) {
  const perm = [[0, 1, 2, 3]], out = [];
  const permute = (arr, l) => { if (l === arr.length) { out.push(arr.slice()); return; } for (let i = l; i < arr.length; i++) { [arr[l], arr[i]] = [arr[i], arr[l]]; permute(arr, l + 1); [arr[l], arr[i]] = [arr[i], arr[l]]; } };
  permute(perm[0], 0);
  const sgn = p => { let s = 1; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) if (p[i] > p[j]) s = -s; return s; };
  return out.reduce((s, p) => s + sgn(p) * A[p[0]][p[1]] * A[p[2]][p[3]], 0);
}

// ---------------- 单极子（例 11.2）----------------
// 实势：A_N = g(1−cosθ)dφ + α，A_S = −g(1+cosθ)dφ + α；北卡另加规范变换 dλ_N。α = a·dr，a 为 R³ 中的多项式向量场。
// 场强 F_{θφ} = ∂_θA_φ − ∂_φA_θ 用中心差分数值求出（不借助解析式），再在两张卡上分别积分。
export function monopoleFlux({ g2, eps, kappa, theta0, nth = 160, nph = 160 }) {
  const g = g2 / 2, h = 1e-5;
  const r = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
  const dr_th = (th, ph) => [Math.cos(th) * Math.cos(ph), Math.cos(th) * Math.sin(ph), -Math.sin(th)];
  const dr_ph = (th, ph) => [-Math.sin(th) * Math.sin(ph), Math.sin(th) * Math.cos(ph), 0];
  const avec = ([x, y, z]) => [eps * (z * z + 0.6 * y), eps * (x * z - 0.8 * x * x), eps * (1.3 * x * y + 0.5 * z)];
  const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  const lamN = (th, ph) => { const [x, y, z] = r(th, ph); return kappa * (x * x - y * y + 0.7 * x * z); };
  const comp = (patch, th, ph) => {
    const a = avec(r(th, ph));
    let Ath = dot(a, dr_th(th, ph)), Aph = dot(a, dr_ph(th, ph));
    if (patch === "N") {
      Aph += g * (1 - Math.cos(th));
      Ath += (lamN(th + h, ph) - lamN(th - h, ph)) / (2 * h);
      Aph += (lamN(th, ph + h) - lamN(th, ph - h)) / (2 * h);
    } else Aph += -g * (1 + Math.cos(th));
    return [Ath, Aph];
  };
  const Fthph = (patch, th, ph) =>
    (comp(patch, th + h, ph)[1] - comp(patch, th - h, ph)[1]) / (2 * h) - (comp(patch, th, ph + h)[0] - comp(patch, th, ph - h)[0]) / (2 * h);
  // 北卡 θ∈[0,θ0]，南卡 θ∈[θ0,π]，中点法则
  let fluxN = 0, fluxS = 0;
  const dph = 2 * Math.PI / nph;
  const nN = Math.max(8, Math.round(nth * theta0 / Math.PI)), nS = Math.max(8, nth - nN);
  for (let i = 0; i < nN; i++) { const th = (i + 0.5) * theta0 / nN; for (let j = 0; j < nph; j++) fluxN += Fthph("N", th, (j + 0.5) * dph) * (theta0 / nN) * dph; }
  for (let i = 0; i < nS; i++) { const th = theta0 + (i + 0.5) * (Math.PI - theta0) / nS; for (let j = 0; j < nph; j++) fluxS += Fthph("S", th, (j + 0.5) * dph) * ((Math.PI - theta0) / nS) * dph; }
  // 边界：∮_{θ0}(A_N − A_S)·dφ
  let bnd = 0; for (let j = 0; j < nph; j++) { const ph = (j + 0.5) * dph; bnd += (comp("N", theta0, ph)[1] - comp("S", theta0, ph)[1]) * dph; }
  // 径向场 B_r = F_{θφ}/sinθ 的样本（供着色）
  const field = (th, ph) => Fthph(th < theta0 ? "N" : "S", th, ph) / Math.max(Math.sin(th), 1e-6);
  return { fluxN, fluxS, flux: fluxN + fluxS, bnd, field };
}

// ---------------- 旋转曲面上的 Gauss–Bonnet（11.83）----------------
// 剖面 (ρ(u), z(u))，绕 z 轴旋转。K = z'(ρ'z''−ρ''z') / (ρ(ρ'²+z'²)²)，dA = ρ|γ'| du dφ
export function surfaceProfile(shape, a, b, k) {
  if (shape === "torus") {
    const c = 1.6, r0 = 0.6;
    const rr = u => r0 * (1 + a * Math.cos(k * u) + b * Math.sin(u));
    return { range: [0, 2 * Math.PI], f: u => [c + rr(u) * Math.cos(u), rr(u) * Math.sin(u)] };
  }
  if (shape === "ellipsoid") return { range: [0, Math.PI], f: u => [Math.sin(u) * (1 + a), Math.cos(u) * (1 - 0.6 * b)] };
  // 鼓包球面：R(u) = 1 + a cos(k u) + b cos u（在两极处光滑）
  const R = u => 1 + a * Math.cos(k * u) + b * Math.cos(u);
  return { range: [0, Math.PI], f: u => [R(u) * Math.sin(u), R(u) * Math.cos(u)] };
}
export function gaussBonnet(prof, n = 3000) {
  const [u0, u1] = prof.range, du = (u1 - u0) / n, h = 1e-4;
  const d1 = u => { const p = prof.f(u + h), m = prof.f(u - h); return [(p[0] - m[0]) / (2 * h), (p[1] - m[1]) / (2 * h)]; };
  const d2 = u => { const p = prof.f(u + h), c = prof.f(u), m = prof.f(u - h); return [(p[0] - 2 * c[0] + m[0]) / (h * h), (p[1] - 2 * c[1] + m[1]) / (h * h)]; };
  const samples = []; let total = 0;
  for (let i = 0; i < n; i++) {
    const u = u0 + (i + 0.5) * du, [rho] = prof.f(u), [r1, z1] = d1(u), [r2, z2] = d2(u);
    const sp2 = r1 * r1 + z1 * z1, K = (z1 * (r1 * z2 - r2 * z1)) / (rho * sp2 * sp2);
    const dens = K * rho * Math.sqrt(sp2);           // ∫ e = (1/2π)∫∫ K dA = ∫ K ρ|γ'| du
    total += dens * du;
    if (i % Math.round(n / 300) === 0) samples.push({ u, K, cum: total });
  }
  samples.push({ u: u1, K: samples[samples.length - 1].K, cum: total });
  return { total, samples };
}
