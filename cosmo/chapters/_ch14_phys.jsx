// 第 14 章数值工具（纯函数，交互图与 node 自检共用）。
// 随机数：mulberry32（可复现）；高斯：Box–Muller。

// ---------- 随机数 ----------
export function rng(seed = 1) {
  let a = seed >>> 0;
  const u = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  let spare = null;
  const g = () => { if (spare !== null) { const s = spare; spare = null; return s; } let x, y, r; do { x = 2 * u() - 1; y = 2 * u() - 1; r = x * x + y * y; } while (r >= 1 || r === 0); const f = Math.sqrt(-2 * Math.log(r) / r); spare = y * f; return x * f; };
  return { u, g };
}

// ---------- §14.1 称体重：数据与后验 ----------
export const W_TRUE = 70;
// m 个测量 d_i = w + 噪声（σ_w）。同一 seed 下前 m 个数据不随 m 改变（增大 m 只是"多称几次"）
export function weighData(m, sigma, seed = 1) { const r = rng(seed * 7919 + 13); const out = []; for (let i = 0; i < m; i++) out.push(W_TRUE + sigma * r.g()); return out; }
export const mean = xs => xs.reduce((s, x) => s + x, 0) / xs.length;
export const sampleVar = (xs, mu, ddof = 0) => xs.reduce((s, x) => s + (x - mu) ** 2, 0) / (xs.length - ddof);
// ln L(w)（σ_w 已知，(14.2)）——去掉与 w 无关的常数
export const lnLw = (w, d, sigma) => -d.reduce((s, x) => s + (x - w) ** 2, 0) / (2 * sigma * sigma);
// 数值求 ΔlnL = −1/2 的半宽（二分），用来与 σ_w/√m 对照
export function halfWidth(d, sigma) {
  const wh = mean(d), L0 = lnLw(wh, d, sigma), g = x => lnLw(wh + x, d, sigma) - L0 + 0.5;
  let lo = 0, hi = 10 * sigma; for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (g(mid) > 0) lo = mid; else hi = mid; } return (lo + hi) / 2;
}
// σ_w 未知、对 σ_w 取均匀先验并边缘化 (14.22)：P(w|d) $\propto$ ∫dσ σ^{-m} e^{-S/2σ²} $\propto$ S(w)^{-(m-1)/2}
export const lnMargW = (w, d) => -(d.length - 1) / 2 * Math.log(d.reduce((s, x) => s + (x - w) ** 2, 0));

// ---------- §14.4.1 宇宙方差与噪声 ----------
// 平滑的 CMB 温度谱示意模板 D_l = l(l+1)C_l/2π [μK²]（不含声学振荡；仅用于估计信噪比的量级）
export function DlTT(l) {
  if (l <= 220) return 1050 + 4650 * Math.exp(-((Math.log(l / 220)) ** 2) / (2 * 0.45 ** 2));
  return 5700 * Math.exp(-(((l - 220) / 600) ** 1.15));
}
export const ARCMIN = Math.PI / 180 / 60;
export const ClTT = l => 2 * Math.PI * DlTT(l) / (l * (l + 1));                 // μK²
export const beamB = (l, fwhmArcmin) => { const th = fwhmArcmin * ARCMIN / Math.sqrt(8 * Math.log(2)); return Math.exp(-l * l * th * th / 2); };   // B_l = exp(−l²θ²/2)
export const noiseN = dT => (dT * ARCMIN) ** 2;                                     // N(l) [μK² sr]，ΔT 以 μK·arcmin 计
export const cvFrac = (l, fsky = 1) => Math.sqrt(2 / ((2 * l + 1) * fsky));         // (14.47)/C，N = 0
export const totFrac = (l, fsky, dT, fwhm) => cvFrac(l, fsky) * (1 + noiseN(dT) / (beamB(l, fwhm) ** 2 * ClTT(l)));

// ---------- §14.4.2 星系功率谱误差 ----------
// 线性功率谱（h 单位）：BBKS 形状（Γ 含重子修正）$\times$ 增长因子，σ8 归一化
const OM = 0.31, OB = 0.049, HH = 0.677, NS = 0.965, S8 = 0.81;
const GAM = OM * HH * Math.exp(-OB - Math.sqrt(2 * HH) * OB / OM);
const Tbbks = k => { const q = k / GAM; return Math.log(1 + 2.34 * q) / (2.34 * q) * (1 + 3.89 * q + (16.1 * q) ** 2 + (5.46 * q) ** 3 + (6.71 * q) ** 4) ** -0.25; };
const P0raw = k => k ** NS * Tbbks(k) ** 2;
const Wth = x => (x < 1e-3 ? 1 - x * x / 10 : 3 * (Math.sin(x) - x * Math.cos(x)) / x ** 3);
const s8raw = (() => { const n = 3000, a = Math.log(1e-4), b = Math.log(50), h = (b - a) / n; let s = 0; for (let i = 0; i <= n; i++) { const k = Math.exp(a + i * h), g = k ** 3 * P0raw(k) / (2 * Math.PI ** 2) * Wth(8 * k) ** 2; s += g * (i === 0 || i === n ? 1 : i % 2 ? 4 : 2); } return Math.sqrt(s * h / 3); })();
const AMP = (S8 / s8raw) ** 2;
// ΛCDM 增长因子（(8.77) 积分解），归一化 D(z=0)=1
const Ez = a => Math.sqrt(OM / a ** 3 + 1 - OM);
const Dun = a => { const n = 400, U = Math.sqrt(a), h = U / n; let s = 0; for (let i = 1; i <= n; i++) { const u = i * h, x = u * u, g = 2 * u / (x * Ez(x)) ** 3; s += g * (i === n ? 1 : i % 2 ? 4 : 2); } return 2.5 * OM * Ez(a) * s * h / 3; };
const D0 = Dun(1);
export const growthD = z => Dun(1 / (1 + z)) / D0;
export const PLh = (k, z = 0) => AMP * P0raw(k) * growthD(z) ** 2;                 // [h^-3 Mpc^3]，k [h Mpc^-1]
export const fGrowth = z => { const a = 1 / (1 + z); return (OM / a ** 3 / Ez(a) ** 2) ** 0.55; };
export const modesBook = (k, dk, V) => V * k * k * dk / (2 * Math.PI ** 2);       // (14.53)，已按勘误去掉原书的 1/2（FKP 计数）
export const pkErrFrac = (k, dk, V, nbar, b, z) => { const P = b * b * PLh(k, z); return Math.sqrt(2 / modesBook(k, dk, V)) * (1 + 1 / (nbar * P)); };   // (14.60)/P

// ---------- §14.5 Fisher 矩阵（2$\times$2）----------
export function fisher2(F11, F22, rho) {               // rho = F12/√(F11F22)
  const F12 = rho * Math.sqrt(F11 * F22), det = F11 * F22 - F12 * F12;
  const C11 = F22 / det, C22 = F11 / det, C12 = -F12 / det;
  return { F12, det, C11, C22, C12, cond1: 1 / Math.sqrt(F11), marg1: Math.sqrt(C11), cond2: 1 / Math.sqrt(F22), marg2: Math.sqrt(C22), corr: C12 / Math.sqrt(C11 * C22) };
}

// ---------- §14.6 MCMC ----------
const lgamma = z => { const c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5]; let x = z, y = z, t = x + 5.5; t -= (x + 0.5) * Math.log(t); let s = 1.000000000190015; for (const ci of c) s += ci / ++y; return -t + Math.log(2.5066282746310005 * s / x); };
// 图 14.5 型后验：Gamma 分布，均值 0.5、标准差 0.22（与原书图注给出的真值一致）
export const GK = (0.5 / 0.22) ** 2, GTH = 0.22 ** 2 / 0.5;
const lnGammaNorm = -lgamma(GK) - GK * Math.log(GTH);
export const TARGETS = {
  skew: { label: "图 14.5 型（偏斜）", lnp: x => (x <= 0 ? -Infinity : lnGammaNorm + (GK - 1) * Math.log(x) - x / GTH), mean: 0.5, sd: 0.22, dom: [0, 2] },
  bimodal: { label: "双峰", lnp: x => Math.log(0.6 * Math.exp(-((x - 0.35) ** 2) / (2 * 0.08 ** 2)) / (0.08 * Math.sqrt(2 * Math.PI)) + 0.4 * Math.exp(-((x - 1.25) ** 2) / (2 * 0.1 ** 2)) / (0.1 * Math.sqrt(2 * Math.PI))), mean: 0.6 * 0.35 + 0.4 * 1.25, sd: Math.sqrt(0.6 * (0.08 ** 2 + 0.35 ** 2) + 0.4 * (0.1 ** 2 + 1.25 ** 2) - (0.6 * 0.35 + 0.4 * 1.25) ** 2), dom: [0, 2] },
};
// Metropolis–Hastings：高斯提议 g(λ',λ) $\propto$ exp[−(λ−λ')²/2σ²]，接受概率 (14.75)
export function metropolis(lnp, { sigma, n, x0, seed = 1 }) {
  const r = rng(seed * 104729 + 7); const chain = new Float64Array(n + 1); let x = x0, lp = lnp(x0), acc = 0;
  chain[0] = x;
  for (let i = 1; i <= n; i++) {
    const y = x + sigma * r.g(), ly = lnp(y);
    if (ly >= lp || r.u() < Math.exp(ly - lp)) { x = y; lp = ly; acc++; }
    chain[i] = x;
  }
  return { chain, acc: acc / n };
}
// 样本均值 (14.72)、样本方差 (14.73)、积分自相关时间（Sokal 自洽窗口）
export function chainStats(c, burn = 0) {
  const xs = Array.from(c.slice(Math.min(burn, c.length - 2)));
  const n = xs.length, mu = mean(xs), v = xs.reduce((s, x) => s + (x - mu) ** 2, 0) / (n - 1);
  let tau = 1;
  if (v > 0) { for (let t = 1; t < Math.min(n - 1, 5000); t++) { let s = 0; for (let i = 0; i + t < n; i++) s += (xs[i] - mu) * (xs[i + t] - mu); const rho = s / ((n - t) * v); tau += 2 * rho; if (t >= 5 * tau) break; } }
  tau = Math.max(1, tau);
  return { n, mean: mu, sd: Math.sqrt(v), tau, ess: n / tau };
}
