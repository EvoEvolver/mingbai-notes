// 第 7 章交互图用到的数值函数（纯 JS，无 JSX/React 依赖，可复制为 .mjs 用 node 测试）。
// 单位：距离 Mpc（不是 h^{-1}Mpc），能量 GeV，波数与哈勃率 Mpc^{-1}；c = ħ = k_B = 1。
// 普朗克质量约定同原书：m_Pl = G^{-1/2} = 1.22089e19 GeV；约化普朗克质量 M = m_Pl/√(8π)。

export const H_FID = 0.68, OM_FID = 0.31, ZSTAR = 1090;
export const C_KMS = 299792.458;
export const HUBBLE_DIST_H = C_KMS / 100;              // c/H0 = 2997.92 h^{-1} Mpc
export const T0_K = 2.7255;
export const T0_GEV = T0_K * 8.617333e-14;             // 2.3487e-13 GeV
export const M_PL = 1.22089e19;                        // GeV
export const GEV_PER_INV_MPC = 1.97327e-16 / 3.08568e22;   // 1 Mpc^{-1} = 6.395e-39 GeV
export const INV_MPC_PER_GEV = 1 / GEV_PER_INV_MPC;        // 1 GeV = 1.5637e38 Mpc^{-1}
export const GSTAR0 = 2 + 7 / 8 * 6 * Math.pow(4 / 11, 4 / 3);   // 3.363（光子 + 3 代无质量中微子）
export const GSTARS0 = 2 + 7 / 8 * 6 * 4 / 11;                   // 3.909
export const GSTAR_RH = 106.75;                                   // 标准模型全部粒子
export const OMR_H2 = (Math.PI ** 2 / 30) * GSTAR0 * T0_GEV ** 4 / (3 * (100 / C_KMS * GEV_PER_INV_MPC) ** 2 * M_PL ** 2 / (8 * Math.PI));   // ≈ 4.15e-5

export function simpson(f, a, b, n = 400) {
  if (a === b) return 0; if (n % 2) n++;
  const h = (b - a) / n; let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return s * h / 3;
}
export function bisect(f, a, b, it = 200) {
  let fa = f(a);
  for (let i = 0; i < it; i++) { const m = (a + b) / 2, fm = f(m); if ((fm < 0) === (fa < 0)) { a = m; fa = fm; } else b = m; }
  return (a + b) / 2;
}

// ---------------- 背景宇宙学：共形时间（图 7.1） ----------------
export function cosmo(h = H_FID, Om = OM_FID) {
  const Or = OMR_H2 / (h * h), OL = 1 - Om - Or;
  return { h, Om, Or, OL, H0: h / HUBBLE_DIST_H * 1 };   // H0 [Mpc^{-1}]（c=1）：h/2997.92
}
// E(a) = H/H0；lam=false 时去掉 Λ（原书"只含物质和辐射"的假设，对 η* 影响 <1e-6）
export const Ea = (a, p, lam = true) => Math.sqrt(p.Or / a ** 4 + p.Om / a ** 3 + (lam ? p.OL : 0));
// η(a) [Mpc] = ∫_0^a d ln a' /(a'H)，式 (7.3)
export function etaOf(a, p, lam = true, n = 2000) {
  return HUBBLE_DIST_H / p.h * simpson(u => { const x = Math.exp(u); return 1 / (x * Ea(x, p, lam)); }, Math.log(1e-12), Math.log(a), n);
}
export function horizonNumbers(h = H_FID, Om = OM_FID, zs = ZSTAR) {
  const p = cosmo(h, Om), etaS = etaOf(1 / (1 + zs), p, false), eta0 = etaOf(1, p, true), chiS = eta0 - etaS;
  return { p, etaS, eta0, chiS, thetaDeg: etaS / chiS * 180 / Math.PI, ratio: eta0 / etaS };
}

// ---------------- 共动哈勃半径（图 7.2） ----------------
// 相对论自由度 g*(T)、g*s(T) 的简化阶梯表（在 log T 上线性插值）；只影响 a(T) 与 ρ_r(T) 的 O(1) 因子
const GT = [   // [T/GeV, g*, g*s]
  [1e-5, GSTAR0, GSTARS0], [5e-5, GSTAR0, GSTARS0], [1e-3, 10.75, 10.75], [0.08, 10.75, 10.75], [0.15, 17.25, 17.25],
  [0.3, 61.75, 61.75], [5, 75.75, 75.75], [200, GSTAR_RH, GSTAR_RH],
];
function gInterp(T, col) {
  if (T <= GT[0][0]) return GT[0][col];
  if (T >= GT[GT.length - 1][0]) return GT[GT.length - 1][col];
  let i = 0; while (GT[i + 1][0] < T) i++;
  const t = Math.log(T / GT[i][0]) / Math.log(GT[i + 1][0] / GT[i][0]);
  return GT[i][col] + t * (GT[i + 1][col] - GT[i][col]);
}
export const gstar = T => gInterp(T, 1), gstarS = T => gInterp(T, 2);
// 熵守恒：g*s T³ a³ = 常数 ⇒ a(T) = (T0/T)(g*s0/g*s(T))^{1/3}
export const aOfT = T => T0_GEV / T * Math.cbrt(GSTARS0 / gstarS(T));
export function TOfA(a) { let T = T0_GEV / a; for (let i = 0; i < 30; i++) T = T0_GEV / a * Math.cbrt(GSTARS0 / gstarS(T)); return T; }
// 暴胀结束后的 H(a) [Mpc^{-1}]：H² = H0²(Ω_m a^{-3} + Ω_Λ) + (8π/3m_Pl²) (π²/30) g*(T) T⁴
export function Hpost(a, p) {
  const T = TOfA(a), rhoR = Math.PI ** 2 / 30 * gstar(T) * T ** 4;              // GeV⁴
  const HrGeV2 = 8 * Math.PI / 3 * rhoR / M_PL ** 2;
  return Math.sqrt(p.H0 ** 2 * (p.Om / a ** 3 + p.OL) + HrGeV2 * INV_MPC_PER_GEV ** 2);
}
// 暴胀：能标 V^{1/4} [GeV] → H_inf；瞬时再加热 ⇒ (π²/30) g* T_e⁴ = V
export function inflation(V14, p) {
  const V = V14 ** 4, HinfGeV = Math.sqrt(8 * Math.PI * V / 3) / M_PL, Te = Math.pow(30 * V / (Math.PI ** 2 * GSTAR_RH), 0.25);
  const ae = aOfT(Te), Hinf = HinfGeV * INV_MPC_PER_GEV;
  return { V14, HinfGeV, Hinf, Te, ae, aeHe: ae * Hinf };
}
// 共动哈勃半径 (aH)^{-1} [Mpc]；a < a_i（暴胀开始前）返回 NaN
export function hubbleRadius(a, inf, p, ai = 0) {
  if (a < ai) return NaN;
  return a <= inf.ae ? 1 / (a * inf.Hinf) : 1 / (a * Hpost(a, p));
}
// 波数 k [Mpc^{-1}] 的模式：暴胀中穿出视界的 a_exit = k/H_inf，N_* = ln(a_e/a_exit)；之后再进入视界 k = aH
export function modeCrossing(k, inf, p) {
  const aExit = k / inf.Hinf, Nstar = Math.log(inf.ae / aExit);
  const g = u => { const a = Math.exp(u); return Math.log(a * Hpost(a, p) / k); };
  const aEnter = g(Math.log(10)) < 0 ? Math.exp(bisect(g, Math.log(inf.ae), Math.log(10), 200)) : NaN;   // 无根 ⇒ 至今（a≤10）未再进入
  return { aExit, Nstar, aEnter };
}
// 解决视界问题所需的最少 e 倍数：暴胀开始时 1/(a_i H_inf) ≥ 1/(a0 H0)
export const NminHorizon = (inf, p) => Math.log(inf.aeHe / p.H0);
// 原书的数量级估计（全程辐射主导、忽略 g*）：a_e/a0 ≃ T0/T_e，N ≃ ln(T_e/T0)
export const NbookEstimate = Te => Math.log(Te / T0_GEV);

// ---------------- 慢滚（图 7.5） ----------------
// 内部用约化普朗克质量 M = 1 的单位：ε_V = (M²/2)(V'/V)²，η_V = M² V''/V（与原书 m_Pl 形式等价：
// ε_sr = (m_Pl²/16π)(V'/V)²，η_V = (m_Pl²/8π)V''/V）。慢滚近似下 δ_sr = ε_sr − η_V。
const S23 = Math.sqrt(2 / 3);
export const SQRT8PI = Math.sqrt(8 * Math.PI);    // φ/m_Pl = (φ/M)/√(8π)
export const POTENTIALS = {
  quad: {   // V = m²φ²/2（以 m²M²/2 为单位：V = x²）
    V: x => x * x, dV: x => 2 * x, d2V: () => 2,
  },
  staro: {  // V = V0 (1 − e^{−√(2/3) φ/M})²（以 V0 为单位）
    V: x => (1 - Math.exp(-S23 * x)) ** 2,
    dV: x => 2 * (1 - Math.exp(-S23 * x)) * Math.exp(-S23 * x) * S23,
    d2V: x => 2 * (2 / 3) * Math.exp(-S23 * x) * (2 * Math.exp(-S23 * x) - 1),
  },
};
export function slowRoll(model, x) {   // x = φ/M
  const P = POTENTIALS[model], V = P.V(x), r1 = P.dV(x) / V, eps = 0.5 * r1 * r1, etaV = P.d2V(x) / V, delta = eps - etaV;
  return { eps, etaV, delta, ns: 1 - 4 * eps - 2 * delta, r: 16 * eps, nT: -2 * eps };
}
// 暴胀结束点：ε_sr = 1（在 φ>0 一侧）
export function phiEnd(model) { return bisect(x => slowRoll(model, x).eps - 1, 1e-3, 30); }
// 剩余 e 倍数 N(φ) = (1/M²) ∫_{φ_e}^{φ} V/V' dφ
export function efoldsLeft(model, x) {
  const P = POTENTIALS[model], xe = phiEnd(model);
  return x <= xe ? 0 : simpson(y => P.V(y) / P.dV(y), xe, x, 400);
}
export function phiAtN(model, N) { const xe = phiEnd(model); return bisect(x => efoldsLeft(model, x) - N, xe, 40, 80); }

// ---------------- 模式函数（§7.3、图 7.6） ----------------
// x = kη < 0。√(2k) v = e^{−ix}(1 − i/x)，式 (7.40)；返回 [Re, Im]
export function vdS(x) { const c = Math.cos(x), s = Math.sin(x); return [c - s / x, -s - c / x]; }
// 超视界后冻结的量 q ∝ v/a ∝ (−x)·v（h 或 ℛ），按冻结值归一：q/q_∞ = e^{−ix}(1 + ix)
export function frozenRatio(x) { const c = Math.cos(x), s = Math.sin(x); return [c + x * s, x * c - s]; }
// Minkowski 对照：v = e^{−ix}/√(2k)，同样除以 a 并用同一归一：−x e^{−ix}/i = i x e^{−ix}
export function minkRatio(x) { return [x * Math.sin(x), x * Math.cos(x)]; }

// ---------------- 原初功率谱（§7.6） ----------------
export const AS = 2.1e-9, KP = 0.05;
export function primordial(eps, delta) {
  const ns = 1 - 4 * eps - 2 * delta, r = 16 * eps, nT = -2 * eps;
  // A_s = H²/(π m_Pl² ε)  ⇒  H = m_Pl √(π A_s ε)；V = 3H²m_Pl²/(8π) = (3/8) A_s ε m_Pl⁴
  const HGeV = M_PL * Math.sqrt(Math.PI * AS * eps), V14 = Math.pow(3 / 8 * AS * eps, 0.25) * M_PL;
  return { ns, r, nT, HGeV, V14, D2R: k => AS * Math.pow(k / KP, ns - 1), D2T: k => r * AS * Math.pow(k / KP, nT) };
}
