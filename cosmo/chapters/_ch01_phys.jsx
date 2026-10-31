// 第 1 章交互图用到的数值函数（纯 JS，无 React 依赖，可单独用 node 测试）。
// 基准宇宙学：附录 B.3（Planck 2018 平直 ΛCDM）：h = 0.677，Ω_m = 0.3106，Ω_Λ = 1 − Ω_m − Ω_r；
// 辐射（光子 + 3 代无质量中微子）Ω_r h² = 4.15×10⁻⁵（附录 B.2 / 式 2.85）；T0 = 2.726 K。

export const T0_K = 2.726;                    // CMB 温度 [K]
export const K_PER_EV = 11604.52;             // 1 eV / k_B = 11604.5 K
export const T0_EV = T0_K / K_PER_EV;         // 2.349e-4 eV
export const OMR_H2 = 4.15e-5;                // Ω_r h²（今天的辐射，含中微子）
export const HUBBLE_GYR = 977.792;            // 1/H0 = 977.792 / (H0 in km/s/Mpc) Gyr
export const SEC_PER_YR = 3.15576e7;
export const FID = { h: 0.677, Om: 0.3106 };

// ---------- 有效自由度 g*(T)、g*s(T)（标准模型，近似分段光滑；T 以 GeV 计）----------
// 数值取自标准教科书表（如 Kolb & Turner；Husdal 2016 的平滑版本），只用于时间线把 T 换成 t 时的修正。
const GTAB = [ // [log10 T/GeV, g*, g*s]
  [-6.0, 3.363, 3.909], [-4.3, 3.363, 3.909], [-4.0, 3.60, 4.10], [-3.7, 5.0, 5.4], [-3.4, 8.6, 8.8], [-3.2, 10.0, 10.1], [-2.9, 10.75, 10.75],
  [-1.8, 10.75, 10.75], [-1.3, 12.5, 12.5], [-1.0, 16.0, 16.0], [-0.85, 17.25, 17.25], [-0.75, 40, 40], [-0.6, 61.75, 61.75],
  [0.0, 72.25, 72.25], [0.5, 75.75, 75.75], [1.0, 86.25, 86.25], [1.7, 92.0, 92.0], [2.0, 96.25, 96.25], [2.4, 106.75, 106.75], [20, 106.75, 106.75],
];
function gtab(lT, col) {
  if (lT <= GTAB[0][0]) return GTAB[0][col];
  for (let i = 1; i < GTAB.length; i++) if (lT <= GTAB[i][0]) { const [x0, x1] = [GTAB[i - 1][0], GTAB[i][0]], u = (lT - x0) / (x1 - x0); return GTAB[i - 1][col] + u * (GTAB[i][col] - GTAB[i - 1][col]); }
  return GTAB[GTAB.length - 1][col];
}
export const gStar = TGeV => gtab(Math.log10(TGeV), 1);
export const gStarS = TGeV => gtab(Math.log10(TGeV), 2);
const GS0 = 3.909, G0 = 3.363;

// 由 a 求光子温度 T [eV]：熵守恒 g*s(T) T³ a³ = g*s0 T0³ （迭代；T ≲ 10 keV 时即 T = T0/a，式 1.5）
export function TofA(a) {
  let T = T0_EV / a;
  for (let i = 0; i < 30; i++) { const Tn = T0_EV / a * Math.cbrt(GS0 / gStarS(T * 1e-9)); if (Math.abs(Tn - T) < 1e-10 * T) return Tn; T = Tn; }
  return T;
}
// 辐射密度修正因子：ρ_r(a) / (Ω_r ρ_cr a⁻⁴) = (g*/g*0)(g*s0/g*s)^{4/3}
export const radBoost = a => { const T = TofA(a) * 1e-9; return gStar(T) / G0 * Math.pow(GS0 / gStarS(T), 4 / 3); };

// 无量纲 H(a)/H0；opt.simple = true 时不计 g* 修正（即第 1 章的简单模型 ρ_r ∝ a⁻⁴）
export function E(a, p = FID, simple = false) {
  const Or = OMR_H2 / (p.h * p.h), OL = p.OL ?? 1 - p.Om - Or;
  const rb = simple ? 1 : radBoost(a);
  return Math.sqrt(p.Om / (a * a * a) + Or * rb / (a * a * a * a) + OL + (1 - p.Om - Or - OL) / (a * a));
}

// t(a) 表：对 ln a 积分 dt = d ln a / H；起点 a_min 处用辐射主导解析值 t = 1/(2H)
// 返回 {la:[log10 a], lt:[log10 t/yr]}
export function ageTable(p = FID, { amin = 1e-17, amax = 1, n = 1400, simple = false } = {}) {
  const H0yr = 1 / (HUBBLE_GYR / (100 * p.h) * 1e9);        // H0 in 1/yr
  const l0 = Math.log(amin), l1 = Math.log(amax), du = (l1 - l0) / n;
  const f = u => 1 / (H0yr * E(Math.exp(u), p, simple));
  let t = 0.5 * f(l0);                                        // 辐射主导：t = 1/(2H)
  const la = [l0 / Math.LN10], lt = [Math.log10(t)];
  for (let i = 0; i < n; i++) {
    const u = l0 + i * du;
    t += du / 6 * (f(u) + 4 * f(u + du / 2) + f(u + du));
    la.push((u + du) / Math.LN10); lt.push(Math.log10(t));
  }
  return { la, lt };
}
export function interp(xs, ys, x) {
  let lo = 0, hi = xs.length - 1;
  if (x <= xs[0]) return ys[0] + (x - xs[0]) * (ys[1] - ys[0]) / (xs[1] - xs[0]);
  if (x >= xs[hi]) return ys[hi] + (x - xs[hi]) * (ys[hi] - ys[hi - 1]) / (xs[hi] - xs[hi - 1]);
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (xs[m] > x) hi = m; else lo = m; }
  const u = (x - xs[lo]) / (xs[hi] - xs[lo]); return ys[lo] + u * (ys[hi] - ys[lo]);
}

// 时间线需要的全部换算：给定 log10 a，返回 {a, z, t[yr], T[K], kT[eV], H[km/s/Mpc], dom}
export function epoch(la, tab, p = FID) {
  const a = 10 ** la, Or = OMR_H2 / (p.h * p.h), OL = 1 - p.Om - Or, rb = radBoost(a);
  const rr = Or * rb / a ** 4, rm = p.Om / a ** 3, rl = OL;
  const tot = rr + rm + rl;
  const dom = rr >= rm && rr >= rl ? "rad" : rm >= rl ? "mat" : "de";
  const TeV = TofA(a);
  return { a, z: 1 / a - 1, t: 10 ** interp(tab.la, tab.lt, la), TK: TeV * K_PER_EV, kT: TeV, H: 100 * p.h * Math.sqrt(tot), dom, fr: rr / tot, fm: rm / tot, fl: rl / tot };
}
// 反解：给定 log10 t[yr] 或 log10 T[eV]，求 log10 a
export const laOfT = (lt, tab) => interp(tab.lt, tab.la, lt);
export function laOfTemp(lTeV) {   // TofA 单调递减：二分
  let lo = -17, hi = 0.5;
  for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (Math.log10(TofA(10 ** m)) > lTeV) lo = m; else hi = m; }
  return (lo + hi) / 2;
}

// ---------- 黑体谱（式 1.9）----------
// 以波数 σ = 1/λ [cm⁻¹] 为横轴，返回 I_ν [MJy/sr]（习题 1.4：MJy/sr = 10²⁰ × SI）
const HPL = 6.62607015e-34, KB = 1.380649e-23, CL = 2.99792458e8;
export function Inu(sigma, T) {
  const nu = sigma * 100 * CL, x = HPL * nu / (KB * T);
  return 2 * HPL * nu ** 3 / CL ** 2 / Math.expm1(x) * 1e20;
}
export const X_PEAK = 2.821439372;            // x(3 − 3e^{-x}) 的根：I_ν 极大
export const sigmaPeak = T => X_PEAK * KB * T / (HPL * CL * 100);   // [cm⁻¹]
export const nuPeakGHz = T => X_PEAK * KB * T / HPL / 1e9;

// ---------- 习题 1.2：年龄 H0 t0（平直，物质 + Λ）----------
export function H0t0(OL) {
  if (OL < 1e-9) return 2 / 3;
  return 2 / (3 * Math.sqrt(OL)) * Math.asinh(Math.sqrt(OL / (1 - OL)));
}

// ---------- 习题 1.5：真空能积分 ∫ d³p/(2π)³ (ω/2)，自然单位，截断 p_max ----------
// ∫0^P p² √(p²+m²) dp = [P(2P²+m²)√(P²+m²) − m⁴ asinh(P/m)]/8
export function rhoVac(P, m) {
  const I = (P * (2 * P * P + m * m) * Math.sqrt(P * P + m * m) - m ** 4 * Math.asinh(P / m)) / 8;
  return I / (4 * Math.PI * Math.PI);
}
