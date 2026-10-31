// 第 2 章交互图用到的宇宙学数值函数（纯 JS，无 React 依赖，可单独用 node 测试）。
// 单位约定：距离以 h^{-1} Mpc 计时用 c/H0 = 2997.92458 h^{-1} Mpc；温度/质量以 eV 计。

export const C_KMS = 299792.458;              // 光速 [km/s]
export const HUBBLE_DIST = C_KMS / 100;       // c/H0 = 2997.92 h^{-1} Mpc
export const HUBBLE_GYR = 977.792;            // 1/H0 = 977.792/(H0 / km s^-1 Mpc^-1) Gyr
export const K_PER_EV = 11604.52;             // 1 eV = 11604.5 K（原书取 11605 K）
export const T0_K = 2.726;                    // CMB 温度 [K]（原书取值）
export const T0_EV = T0_K / K_PER_EV;         // 2.349e-4 eV
export const TNU0_EV = Math.cbrt(4 / 11) * T0_EV;   // 今天的中微子温度 1.676e-4 eV
export const OMG_H2 = 2.47e-5;                // Ω_γ h²，式 (2.76)
export const OMR_H2 = 4.15e-5;                // Ω_r h²（光子 + 3 代无质量中微子），式 (2.85)
export const NU_PLATEAU = 7 / 8 * Math.pow(4 / 11, 4 / 3);   // 每代无质量中微子 ρ_ν/ρ_γ = 0.2271

// Simpson 积分
export function simpson(f, a, b, n = 200) {
  if (n % 2) n++;
  const h = (b - a) / n; let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return s * h / 3;
}

// 无量纲膨胀率 E(z) = H(z)/H0；p = {Om, OL, Or, w}，曲率 Ω_K = 1 − Ω_m − Ω_Λ − Ω_r
export function Ez(z, p) {
  const { Om, OL, Or = 0, w = -1 } = p, x = 1 + z, OK = 1 - Om - OL - Or;
  return Math.sqrt(Om * x * x * x + Or * x * x * x * x + OK * x * x + OL * Math.pow(x, 3 * (1 + w)));
}
// 共动距离 χ(z) [h^{-1} Mpc]，式 (2.34)：对 u = ln(1+z) 积分，dz/E = (1+z) du / E
export function chi(z, p, n = 200) {
  if (z <= 0) return 0;
  return HUBBLE_DIST * simpson(u => Math.exp(u) / Ez(Math.expm1(u), p), 0, Math.log1p(z), n);
}
// 曲率修正后的横向共动距离 a·d_A^{-1}…：S_K(χ)，式 (2.39) 乘以 (1+z)
export function transverse(c, p) {
  const OK = 1 - p.Om - p.OL - (p.Or || 0);
  if (Math.abs(OK) < 1e-8) return c;
  const s = Math.sqrt(Math.abs(OK)) * c / HUBBLE_DIST;
  return OK > 0 ? HUBBLE_DIST * Math.sinh(s) / Math.sqrt(OK) : HUBBLE_DIST * Math.sin(s) / Math.sqrt(-OK);
}
export const dA = (z, p) => transverse(chi(z, p), p) / (1 + z);          // 式 (2.37)/(2.39)
export const dL = (z, p) => transverse(chi(z, p), p) * (1 + z);          // 式 (2.43)，d_L = d_A / a²

// 宇宙年龄 t(a) [Gyr]：t = ∫_0^a da'/(a' H)，对 ln a 积分
export function age(a, p, H0) {
  const f = u => { const x = Math.exp(u); return 1 / Ez(1 / x - 1, p); };
  return HUBBLE_GYR / H0 * simpson(f, Math.log(1e-10), Math.log(a), 600);
}
// 共形时间 η(a) [h^{-1} Mpc]：η = ∫_0^a da'/(a'^2 H)，对 ln a 积分
export function eta(a, p, n = 600) {
  const f = u => { const x = Math.exp(u); return 1 / (x * Ez(1 / x - 1, p)); };
  return HUBBLE_DIST * simpson(f, Math.log(1e-12), Math.log(a), n);
}

// 单代有质量中微子与光子的能量密度比 ρ_νi/ρ_γ，作为 x = m_ν/T_ν 的函数（式 (2.83) 除以 (2.75)）
// ρ_νi = (T_ν^4/π²) ∫ q² √(q²+x²)/(e^q+1) dq，ρ_γ = (π²/15) T^4，(T_ν/T)^4 = (4/11)^{4/3}
export function nuRatio(x) {
  const I = simpson(q => q * q * Math.sqrt(q * q + x * x) / (Math.exp(q) + 1), 0, 50, 400);
  return Math.pow(4 / 11, 4 / 3) * I / (Math.pow(Math.PI, 4) / 15);
}
// 非相对论极限 ρ_νi/ρ_γ → m n_νi/ρ_γ = x · (45 ζ(3) / 2π⁴)·(4/11)^{4/3}·… 见习题 2.12
export const ZETA3 = 1.2020569031595942;
export const NU_NR_SLOPE = 3 * ZETA3 / (2 * Math.PI * Math.PI) / (Math.PI * Math.PI / 15) * Math.pow(4 / 11, 4 / 3);  // ≈ 0.0721

// 极小值搜索（黄金分割）
export function golden(f, a, b, tol = 1e-6) {
  const g = (Math.sqrt(5) - 1) / 2; let c = b - g * (b - a), d = a + g * (b - a);
  while (Math.abs(b - a) > tol) { if (f(c) < f(d)) b = d; else a = c; c = b - g * (b - a); d = a + g * (b - a); }
  return (a + b) / 2;
}
export function bisect(f, a, b, it = 200) {
  let fa = f(a);
  for (let i = 0; i < it; i++) { const m = (a + b) / 2, fm = f(m); if ((fm < 0) === (fa < 0)) { a = m; fa = fm; } else b = m; }
  return (a + b) / 2;
}
