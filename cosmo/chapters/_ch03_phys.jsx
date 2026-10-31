// 第 3 章交互图用到的数值函数（纯 JS，无 React 依赖，可单独用 node 测试）。
// 单位：时间以 1/H0 计，换算到 Gyr 用 977.792/(100h)；动量、温度、质量以 eV 计。

export const HUBBLE_GYR = 977.792;                 // 1/H0 = 977.792 / (H0 / km s^-1 Mpc^-1) Gyr
export const T0_EV = 2.726 / 11604.52;             // 今天的 CMB 温度 2.349e-4 eV
export const TNU0_EV = Math.cbrt(4 / 11) * T0_EV;  // 今天的中微子温度 1.676e-4 eV（式 2.81）

// ---------- 1. Friedmann 方程：a(t) ----------
// p = {Om, Or, OL}；ΩK = 1 − Ωm − Ωr − ΩΛ。
// 一阶方程 (3.14)：(ȧ/H0)² = Ωm/a + Ωr/a² + ΩΛ a² + ΩK
// 二阶方程 (3.90)：ä/H0² = −Ωm/(2a²) − Ωr/a³ + ΩΛ a   （由 ä/a = −(4πG/3)(ρ+3P) 得到）
export const adot2 = (a, p) => p.Om / a + p.Or / (a * a) + p.OL * a * a + (1 - p.Om - p.Or - p.OL);
export const addot = (a, p) => -p.Om / (2 * a * a) - p.Or / (a * a * a) + p.OL * a;

// 求 a(t)：直接对第一 Friedmann 方程 (3.14) 做积分 t(a) = ∫ da / ȧ(a)。
// （注意：若改用二阶方程 (3.90) 从极早期积分，任何微小数值误差都会表现为一个"曲率项"并随 a 增长——
//  这正是平直性问题的数值版本，所以这里不那样做。）
// 若 ȧ² 在某个 a_max 处降为 0，宇宙在 a_max 停止膨胀并回缩；回缩段与膨胀段关于 t_max 对称。
// 返回 {t:[…], a:[…], t0（a 首次达到 1 的时刻，单位 1/H0；若达不到则为 null）, amax, tmax, fate: "expand" | "crunch" | "bounce"}
export function solveA(p, tMax = 4, aTop = 30) {
  for (let a = 1e-5; a <= 1; a *= 1.02) if (adot2(a, p) < 0) return { t: [], a: [], t0: null, fate: "bounce" };
  // 寻找第一个 ȧ² = 0 的 a（> 1e-3）
  let amax = null;
  for (let a = 1e-3, prev = adot2(a, p); a < aTop; a *= 1.01) {
    const q = adot2(a * 1.01, p);
    if (q <= 0 && prev > 0) { let lo = a, hi = a * 1.01; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (adot2(m, p) > 0) lo = m; else hi = m; } amax = lo; break; }
    prev = q;
  }
  const top = amax ?? aTop, T = [], A = [];
  // 区域 1：a ∈ [1e-8, a_s]，对 ln a 积分（dt = a dlna / ȧ… 即 dt = dlna · a/√(ȧ²)）
  const as = amax ? 0.6 * amax : top, g1 = u => { const a = Math.exp(u); return a / Math.sqrt(adot2(a, p)); };
  const n1 = 1500, u0 = Math.log(1e-8), u1 = Math.log(as), du = (u1 - u0) / n1;
  let t = simpson(x => x / Math.sqrt(p.Or + p.Om * x + 1e-300), 0, 1e-8, 20);   // a < 1e-8：只含物质 + 辐射
  T.push(0, t); A.push(0, 1e-8);
  for (let i = 1; i <= n1; i++) { t += simpson(g1, u0 + (i - 1) * du, u0 + i * du, 4); T.push(t); A.push(Math.exp(u0 + i * du)); }
  // 区域 2（有转折时）：a = a_max(1 − v²)，v 从 √0.4 降到 0，被积函数 2 a_max v / √(ȧ²) 在 v→0 有限
  if (amax) {
    const g2 = v => { const a = amax * (1 - v * v); return 2 * amax * v / Math.sqrt(Math.max(adot2(a, p), 1e-300)); };
    const n2 = 400, v0 = Math.sqrt(0.4), dv = v0 / n2;
    for (let i = 1; i <= n2; i++) { const va = v0 - (i - 1) * dv, vb = v0 - i * dv; t += simpson(g2, vb, va, 4); T.push(t); A.push(amax * (1 - vb * vb)); }
    const tm = t, m = T.length;
    for (let i = m - 2; i >= 0; i--) { T.push(2 * tm - T[i]); A.push(A[i]); }
  }
  let t0 = null;
  for (let i = 1; i < A.length; i++) if (A[i - 1] < 1 && A[i] >= 1) { t0 = T[i - 1] + (T[i] - T[i - 1]) * (1 - A[i - 1]) / (A[i] - A[i - 1]); break; }
  return { t: T, a: A, t0, amax, tmax: amax ? T[(T.length - 1) / 2 | 0] : null, fate: amax ? "crunch" : "expand" };
}

// 宇宙年龄（a = 1 时），直接积分 t0 = ∫0^1 da / (a H)，用于核对 RK4 结果；单位 1/H0
export function age(p, a1 = 1) {
  return simpson(u => { const a = Math.exp(u), q = adot2(a, p); return q > 0 ? a / Math.sqrt(q) : NaN; }, Math.log(1e-8), Math.log(a1), 2000);
}

// 各成分在 H² 中所占份额 Ω_s(a) = Ω_s a^{-3(1+w_s)} / (H/H0)²（式 3.14 逐项）
export function fractions(a, p) {
  const E2 = adot2(a, p) / (a * a);   // (H/H0)²
  return { m: p.Om / a ** 3 / E2, r: p.Or / a ** 4 / E2, L: p.OL / E2, K: (1 - p.Om - p.Or - p.OL) / (a * a) / E2 };
}
// 减速 → 加速的转折点：ä = 0（式 3.90），在 [1e-3, 10] 上二分
export function aAcc(p) {
  let lo = 1e-3, hi = 10;
  if (addot(lo, p) * addot(hi, p) > 0) return NaN;
  for (let i = 0; i < 100; i++) { const m = Math.sqrt(lo * hi); if (addot(m, p) < 0) lo = m; else hi = m; }
  return Math.sqrt(lo * hi);
}

// ---------- 2. 谐振势中的相空间分布（图 3.2）----------
// m = k = 1（图 3.2 的单位），V(x) = x²/2 + λ x⁴/4。λ = 0 时解析解为相空间刚性转动。
export function mulberry32(seed) {
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
// 初始云团：中心 (x0, p0)，各向同性高斯，σ = s
export function blob(N, x0, p0, s, seed = 7) {
  const r = mulberry32(seed), out = [];
  for (let i = 0; i < N; i++) {
    const u = Math.max(r(), 1e-12), v = r(), R = Math.sqrt(-2 * Math.log(u));
    out.push([x0 + s * R * Math.cos(2 * Math.PI * v), p0 + s * R * Math.sin(2 * Math.PI * v)]);
  }
  return out;
}
// 推进单个粒子到时刻 t（ẋ = p，ṗ = −x − λx³）；λ = 0 用解析解
export function evolve([x, p], t, lam, dt = 0.01) {
  if (!lam) { const c = Math.cos(t), s = Math.sin(t); return [x * c + p * s, p * c - x * s]; }
  const n = Math.max(1, Math.ceil(t / dt)), h = t / n;
  const F = (x) => -x - lam * x * x * x;
  for (let i = 0; i < n; i++) {           // 辛积分（velocity Verlet），保相空间体积
    p += h / 2 * F(x); x += h * p; p += h / 2 * F(x);
  }
  return [x, p];
}
export const energy = ([x, p], lam) => p * p / 2 + x * x / 2 + lam * x ** 4 / 4;
// 点集凸包面积（单调链 + 鞋带公式），用来演示"相空间体积守恒"（λ=0 时严格守恒）
export function hullArea(pts) {
  const P = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], up = [];
  for (const q of P) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (const q of P.slice().reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
  const H = lo.slice(0, -1).concat(up.slice(0, -1));
  let s = 0; for (let i = 0; i < H.length; i++) { const a = H[i], b = H[(i + 1) % H.length]; s += a[0] * b[1] - a[1] * b[0]; }
  return Math.abs(s) / 2;
}

// ---------- 3. 扰动时空中光子能量的变化（式 3.71，m = 0）----------
// 玩具模型：局域取 a = 1（只看扰动项；膨胀项 −Hp 可用 ap 吸收），
// Ψ(x,t) = −Ψ0 · D(t) · exp(−x²/2σ²)，Φ = r·Ψ（广义相对论中常有 r = −1），
// D(t) = 1 − ε tanh((t − L)/τ)：光子过井心（t = L）时井深恰为 Ψ0；ε > 0 势井在变浅，ε < 0 在加深。
// 光子沿 x = t − L 运动（p̂ = +x，c = 1）。式 (3.71)：d ln p/dt = −Φ̇ − ∂Ψ/∂x。
// 返回各量均以 Ψ0 为单位（线性理论中 δ ln p ∝ Ψ0）。
export function photonTrack({ eps, tau, sig = 1, ratio = -1 }, L = 5, N = 1000) {
  const D = t => 1 - eps * Math.tanh((t - L) / tau);
  const Dd = t => -eps / (tau * Math.cosh((t - L) / tau) ** 2);
  const prof = x => Math.exp(-x * x / (2 * sig * sig));
  const ts = [], xs = [], lnp = [0], psi = [];
  for (let i = 0; i <= N; i++) { const t = 2 * L * i / N; ts.push(t); xs.push(t - L); psi.push(-D(t) * prof(t - L)); }
  const rate = i => {
    const x = xs[i], t = ts[i];
    const Psidot = -Dd(t) * prof(x), Psix = D(t) * prof(x) * x / (sig * sig);
    return -ratio * Psidot - Psix;
  };
  for (let i = 1; i <= N; i++) lnp.push(lnp[i - 1] + (rate(i) + rate(i - 1)) / 2 * (ts[i] - ts[i - 1]));
  return { xs, ts, lnp, psi };
}

// ---------- 4. 光线与慢速粒子的偏折（式 3.72，Φ = −Ψ）----------
// 偏折角 α(v) = (1 + 1/v²) · 2GM/(b c²)；牛顿力学只有 (1/v²) 一项。
// 太阳掠射：2GM☉/(R☉c²) = 4.244e-6 rad = 0.8754″
export const SUN_HALF = 2 * 1.32712440018e20 / (6.957e8 * 299792458 ** 2) * 206264.806;   // ″
export const deflGR = (v, b = 1) => (1 + 1 / (v * v)) * SUN_HALF / b;
export const deflNewton = (v, b = 1) => (1 / (v * v)) * SUN_HALF / b;

// ---------- 5. 有质量中微子的零阶分布函数（习题 3.9，式 3.95）----------
// f(p, a) = f_FD( E_ν(p a / a_dec) / T_dec )，T_dec = T_ν0 / a_dec
export function fnu(pEV, a, m, adec) {
  const Tdec = TNU0_EV / adec, q = pEV * a / adec;
  return 1 / (Math.exp(Math.sqrt(q * q + m * m) / Tdec) + 1);
}
// "错误"的平衡分布：把 E 而非 p 放进指数，1/(e^{E/T_ν}+1)，T_ν = T_ν0/a
export const fnuWrong = (pEV, a, m) => 1 / (Math.exp(Math.sqrt(pEV * pEV + m * m) / (TNU0_EV / a)) + 1);

// Simpson 积分
export function simpson(f, a, b, n = 200) {
  if (n % 2) n++;
  const h = (b - a) / n; let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return s * h / 3;
}
