// 第 4 章交互图用到的数值函数（纯 JS，无 React 依赖，可单独用 node 测试）。
// 单位：温度/质量以 MeV（BBN、WIMP 以 GeV）或 eV（复合）计；时间以 s 计；数密度以 cm^-3 计。

// ---------- 物理常数 ----------
export const HBAR_EV_S = 6.582119569e-16;     // ħ [eV s]
export const HBARC_EV_CM = 1.973269804e-5;    // ħc [eV cm]
export const C_CM_S = 2.99792458e10;          // c [cm/s]
export const M_PL_GEV = 1.220890e19;          // 普朗克质量 G^{-1/2} [GeV]
export const ZETA3 = 1.2020569031595942;
export const K_PER_EV = 11604.518;            // 1 eV = 11604.5 K
export const T0_K = 2.7255;                   // CMB 温度
export const T0_EV = T0_K / K_PER_EV;
export const RHOCR_H2_GEV_CM3 = 1.05368e-5;   // ρ_cr / h² [GeV cm^-3]
export const RHOCR_H2_G_CM3 = 1.87834e-29;    // ρ_cr / h² [g cm^-3]
export const M_P_G = 1.67262e-24;             // 质子质量 [g]

// ---------- §4.2 BBN ----------
export const Q_MEV = 1.293;                   // 𝒬 = m_n − m_p
export const TAU_N = 885.7;                   // 中子寿命 [s]
export const B_D = 2.224;                     // 氘结合能 [MeV]（原书 2.22）
export const M_P_MEV = 938.272;
// H(x=1) 按式 (4.61)：sqrt(4π³ G 𝒬⁴ g*/45)/ħ  [s^-1]
export function H1(gstar = 10.75) {
  const Hgev = Math.sqrt(4 * Math.PI ** 3 * gstar / 45) * (Q_MEV * 1e-3) ** 2 / M_PL_GEV;
  return Hgev * 1e9 / HBAR_EV_S;
}
// 式 (4.60)：λ_np = 255/(τ_n x⁵)(12 + 6x + x²)
export const lamNP = (x, tau = TAU_N) => 255 / (tau * x ** 5) * (12 + 6 * x + x * x);
// 式 (4.20) 与 (4.18)：X_n,EQ = 1/(1 + e^x)
export const XnEq = x => 1 / (1 + Math.exp(x));
// 式 (4.26) 的数值解：线性方程，用隐式（后向）Euler 在对数网格上积分（刚性无碍）。
// 返回 { xs, X } ；从 x0=0.02（平衡）积到 x1。
export function solveXn({ gstar = 10.75, tau = TAU_N, x0 = 0.02, x1 = 200, n = 6000 } = {}) {
  const h1 = H1(gstar), xs = [x0], X = [XnEq(x0)];
  const r = Math.pow(x1 / x0, 1 / n);
  let x = x0, y = X[0];
  for (let i = 0; i < n; i++) {
    const xn = x * r, dx = xn - x, A = xn * lamNP(xn, tau) / h1, e = Math.exp(-xn);
    y = (y + dx * A * e) / (1 + dx * A * (1 + e));
    x = xn; xs.push(x); X.push(y);
  }
  return { xs, X };
}
// 式 (4.27)：e± 湮灭后 t = 132 s (0.1 MeV / T)²（g* = 3.36）
export const tOfT = T => 132 * (0.1 / T) ** 2;
// 式 (4.29)：ln η_b + (3/2) ln(T/m_p) = −B_D/T 的解 T_nuc [MeV]
export function Tnuc(etab) {
  const f = T => Math.log(etab) + 1.5 * Math.log(T / M_P_MEV) + B_D / T;
  let lo = 0.005, hi = 2;                      // f(lo) > 0, f(hi) < 0
  for (let i = 0; i < 200; i++) { const m = Math.sqrt(lo * hi); if (f(m) > 0) lo = m; else hi = m; }
  return Math.sqrt(lo * hi);
}
// 式 (4.16)：n_D/n_b ~ η_b (T/m_p)^{3/2} e^{B_D/T}
export const nDoverNb = (T, etab) => etab * Math.pow(T / M_P_MEV, 1.5) * Math.exp(B_D / T);
// 式 (4.10)：η_b = 6.0×10^{-10} (Ω_b h²/0.022)，严格数值见习题 4.6
export const etaB = obh2 => 2.7377e-8 * obh2;

// ---------- §4.3 复合 ----------
export const EPS0 = 13.6057;                  // ε₀ [eV]
export const ME_EV = 0.51099895e6;            // m_e [eV]
export const ALPHA = 1 / 137.035999;
export const LAMBDA_2G = 8.227;               // Λ_{2γ} [s^-1]
const EV2_TO_CM3S = HBARC_EV_CM ** 2 * C_CM_S;   // 1 eV^-2 → cm³ s^-1（σv）
const EV3_TO_CM3 = 1 / HBARC_EV_CM ** 3;         // 1 eV³ → cm^-3
// 宇宙学背景：Ω_b h²、Ω_m h²、h；辐射 Ω_r h² = 4.15e-5（光子 + 3 代无质量中微子）
export function cosmoRec(p = {}) {
  const { obh2 = 0.022, omh2 = 0.14, h = 0.7 } = p, orh2 = 4.15e-5;
  const H0 = h * 100 / 3.0856776e19;          // s^-1
  const Om = omh2 / (h * h), Or = orh2 / (h * h), OL = 1 - Om - Or;
  const nb0 = obh2 * RHOCR_H2_G_CM3 / M_P_G;  // cm^-3（忽略氦：全部当作氢核）
  return {
    obh2, omh2, h, nb0,
    T: z => T0_EV * (1 + z),                   // eV
    H: z => H0 * Math.sqrt(Om * (1 + z) ** 3 + Or * (1 + z) ** 4 + OL),
    nb: z => nb0 * (1 + z) ** 3,
  };
}
// 式 (4.34)：Saha 解 X_e
export function XeSaha(z, c) {
  const T = c.T(z), nbev = c.nb(z) / EV3_TO_CM3;   // nb 换成 eV³
  const R = Math.pow(ME_EV * T / (2 * Math.PI), 1.5) * Math.exp(-EPS0 / T) / nbev;   // X²/(1−X) = R
  return R > 1e8 ? 1 : (-R + Math.sqrt(R * R + 4 * R)) / 2;
}
// 式 (4.39)：α^(2) [cm³/s]；式 (4.37)：β [s^-1]
export const alpha2 = T => 9.78 * ALPHA ** 2 / ME_EV ** 2 * Math.sqrt(EPS0 / T) * Math.log(EPS0 / T) * EV2_TO_CM3S;
export const betaIon = T => alpha2(T) * Math.pow(ME_EV * T / (2 * Math.PI), 1.5) * EV3_TO_CM3 * Math.exp(-EPS0 / T);
// 式 (4.36)（可选乘以 Peebles 因子 (4.62)–(4.63)）对 z 积分。
// dX/dz = −(dX/dt)/[(1+z) H]。半隐式：C 用上一步的值，二次方程隐式求 X_{n+1}。
export function solveXe(c, { peebles = true, z0 = 1800, z1 = 20, n = 4000 } = {}) {
  const zs = [], X = [];
  let z = z0, x = XeSaha(z0, c);
  zs.push(z); X.push(x);
  const dlna = Math.log((1 + z0) / (1 + z1)) / n;
  for (let i = 0; i < n; i++) {
    const zn = (1 + z) * Math.exp(-dlna) - 1, T = c.T(zn), nb = c.nb(zn), H = c.H(zn);
    const b = betaIon(T), al = alpha2(T);
    let C = 1;
    if (peebles) {
      const nH = nb * Math.max(1 - x, 1e-12);
      const La = H * Math.pow(3 * EPS0, 3) * EV3_TO_CM3 / (nH * 64 * Math.PI * Math.PI);
      const b2 = alpha2(T) * Math.pow(ME_EV * T / (2 * Math.PI), 1.5) * EV3_TO_CM3 * Math.exp(-EPS0 / (4 * T));   // β e^{3ε₀/4T}
      C = (La + LAMBDA_2G) / (La + LAMBDA_2G + b2);
    }
    // X_{n+1} − X_n = (dlna/H) C [(1−X)β − X² nb α]，隐式：k (nb α) X² + (1 + kβ) X − (X_n + kβ) = 0
    const k = dlna / H * C, A = k * nb * al, B = 1 + k * b, Cc = -(x + k * b);
    x = A > 0 ? (-B + Math.sqrt(B * B - 4 * A * Cc)) / (2 * A) : -Cc / B;
    z = zn; zs.push(z); X.push(x);
  }
  return { zs, X };
}
// 式 (4.43)：n_e σ_T / H
export const scatOverH = (z, Xe, obh2 = 0.022, omh2 = 0.14) =>
  129 * Xe * (obh2 / 0.022) * Math.sqrt(0.14 / omh2) * Math.pow((1 + z) / 1000, 1.5) / Math.sqrt(1 + (1 + z) / 3360 * 0.14 / omh2);
// 直接由定义 (4.40)–(4.42) 计算 n_e σ_T / H（σ_T = 0.6652e-24 cm²）
export function scatOverHexact(z, Xe, c) {
  return Xe * c.nb(z) * 0.6652e-24 * C_CM_S / c.H(z);
}

// ---------- §4.4 WIMP ----------
// 平衡丰度 Y_EQ = n^(0)/T³ = g (x/2π)^{3/2} e^{−x}（式 (4.5) 非相对论极限；g = 1 时与原书图 4.5 一致）
export const Yeq = (x, g = 1) => g * Math.pow(x / (2 * Math.PI), 1.5) * Math.exp(-x);
// 式 (4.49) 的数值解：后向 Euler（每步解二次方程，刚性无碍），x 从 1 积到 x1，对数网格
export function solveY(lam, { g = 1, x0 = 1, x1 = 1000, n = 6000 } = {}) {
  const xs = [x0], Y = [Yeq(x0, g)];
  const r = Math.pow(x1 / x0, 1 / n);
  let x = x0, y = Y[0];
  for (let i = 0; i < n; i++) {
    const xn = x * r, k = (xn - x) * lam / (xn * xn), ye = Yeq(xn, g);
    // y' + k (y'² − ye²) = y  ⇒  k y'² + y' − (y + k ye²) = 0
    y = (-1 + Math.sqrt(1 + 4 * k * (y + k * ye * ye))) / (2 * k);
    x = xn; xs.push(x); Y.push(y);
  }
  return { xs, Y };
}
// 冻结点 x_f：Y 偏离平衡 (Y − Y_EQ) = Y_EQ 处（即 Y = 2 Y_EQ）
export function xFreeze(sol, g = 1) {
  for (let i = 0; i < sol.xs.length; i++) if (sol.Y[i] > 2 * Yeq(sol.xs[i], g)) return sol.xs[i];
  return NaN;
}
// λ ↔ ⟨σv⟩：λ = m³⟨σv⟩/H(m)，H(m) = sqrt(4π³ g*/45) m²/m_Pl（式 (4.50)、(4.25)）
const GEV2_TO_CM3S = (HBARC_EV_CM * 1e-9) ** 2 * C_CM_S;   // 1 GeV^-2 → cm³/s
export const lamFromSigv = (sv, m, gstar = 100) => m * M_PL_GEV * (sv / GEV2_TO_CM3S) / Math.sqrt(4 * Math.PI ** 3 * gstar / 45);
export const sigvFromLam = (lam, m, gstar = 100) => lam * Math.sqrt(4 * Math.PI ** 3 * gstar / 45) / (m * M_PL_GEV) * GEV2_TO_CM3S;
// 式 (4.54)–(4.55)：Ω_X h² = m_X Y∞ T₀³ /(30 ρ_cr/h²)
const T0_CM3 = (T0_EV / HBARC_EV_CM) ** 3;  // T₀³ [cm^-3]
export const OmegaXh2 = (Yinf, m) => m * Yinf * T0_CM3 / (30 * RHOCR_H2_GEV_CM3);
// 式 (4.57) 的标度公式
export const OmegaXh2Book = (sv, xf = 20, gstar = 100) => 0.1 * (xf / 20) * Math.sqrt(gstar / 100) * 2e-26 / sv;
