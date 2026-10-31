// 第 11 章数值工具（纯函数，无 React）。长度单位 h^-1 Mpc，波数 h Mpc^-1（除特别说明）。
// 线性功率谱沿用第 8 章：EH98 转移函数 + (8.8) 归一化 + 增长因子（D_+ = a 于物质期早期）。
import { FID, ehTransfer, PL as PLmpc, growthIntegral, growth, OmegaMa, sigmaR } from "./_ch08_phys.jsx";
export { FID };

export const C_KMS = 299792.458;
export const HUBBLE = C_KMS / 100;                       // c/H0 = 2997.92 h^-1 Mpc

// ---------- 背景：平直 wCDM（忽略辐射）----------
export const E = (z, { Om = FID.Om, w = -1 } = {}) => Math.sqrt(Om * (1 + z) ** 3 + (1 - Om) * (1 + z) ** (3 * (1 + w)));
// 共动距离 χ(z) [h^-1 Mpc]（Simpson）
export function chi(z, p = {}, n = 200) {
  if (z <= 0) return 0;
  const h = z / n; let s = 0;
  for (let i = 0; i <= n; i++) s += (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) / E(i * h, p);
  return HUBBLE * s * h / 3;
}
// z(χ)：二分
export function zOfChi(c, p = {}) { let lo = 0, hi = 20; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (chi(m, p, 120) < c) lo = m; else hi = m; } return (lo + hi) / 2; }

// ---------- 增长 ----------
// D_+(z)（归一化为物质期 D_+ = a），以及增长率 f = dlnD/dlna（数值微分 (8.77)）
export const Dplus = (z, p = {}) => growthIntegral(1 / (1 + z), { Om: p.Om ?? FID.Om, OL: 1 - (p.Om ?? FID.Om), w: p.w ?? -1 });
const GW = new Map();
export function growthW(Om, w) {                          // 平直 wCDM 的 (8.75) 数值解（缓存）
  const key = Om.toFixed(4) + "," + w.toFixed(3);
  if (!GW.has(key)) GW.set(key, growth({ Om, OL: 1 - Om, w, a0: 1e-3, n: 800 }));
  return GW.get(key);
}
export function fGrowth(z, p = {}) {
  if ((p.w ?? -1) !== -1) {                               // w ≠ −1：(8.77) 不成立，解 (8.75)
    const g = growthW(p.Om ?? FID.Om, p.w);
    const a = 1 / (1 + z); let i = g.a.findIndex(x => x >= a); if (i < 1) i = g.a.length - 1;
    const t = (a - g.a[i - 1]) / (g.a[i] - g.a[i - 1]); return g.f[i - 1] + t * (g.f[i] - g.f[i - 1]);
  }
  const a = 1 / (1 + z), e = 1e-4;
  return (Math.log(Dplus(1 / (a * (1 + e)) - 1, p)) - Math.log(Dplus(1 / (a * (1 - e)) - 1, p))) / (Math.log(1 + e) - Math.log(1 - e));
}
export const fApprox = (z, p = {}) => OmegaMa(1 / (1 + z), { Om: p.Om ?? FID.Om, OL: 1 - (p.Om ?? FID.Om), w: p.w ?? -1 }) ** 0.55;

// ---------- 线性功率谱 [h^-3 Mpc^3]，k [h Mpc^-1] ----------
const h0 = FID.h;
const D0 = Dplus(0);
export function makePk(z = 0, { wiggle = true } = {}) {
  const D = Dplus(z);
  const T = wiggle ? (k => ehTransfer(k)) : (k => ehNoWiggle(k));
  return kh => PLmpc(kh * h0, { D, Tfun: T }) * h0 ** 3;
}
export const sigma8 = (z = 0) => { const P = makePk(z); return sigmaR(8 / h0, k => P(k / h0) / h0 ** 3); };

// ---------- EH98 无振荡（no-wiggle）转移函数（式 26、28–31），k 以 Mpc^-1 ----------
export function ehNoWiggle(k, { h = FID.h, Om = FID.Om, fb = FID.Obh2 / (FID.Om * FID.h ** 2), Tcmb = 2.7255 } = {}) {
  const omh2 = Om * h * h, obh2 = fb * omh2, th = Tcmb / 2.7;
  const s = 44.5 * Math.log(9.83 / omh2) / Math.sqrt(1 + 10 * obh2 ** 0.75);
  const aG = 1 - 0.328 * Math.log(431 * omh2) * fb + 0.38 * Math.log(22.3 * omh2) * fb * fb;
  const G = Om * h * (aG + (1 - aG) / (1 + (0.43 * k * s) ** 4));
  const q = k * th * th / (G * h);
  const L = Math.log(2 * Math.E + 1.8 * q), C = 14.2 + 731 / (1 + 62.5 * q);
  return L / (L + C * q * q);
}
// EH98 近似声视界 s（式 26）[Mpc]
export const soundHorizonEH = ({ h = FID.h, Om = FID.Om, Obh2 = FID.Obh2 } = {}) => 44.5 * Math.log(9.83 / (Om * h * h)) / Math.sqrt(1 + 10 * Obh2 ** 0.75);

// ---------- Kaiser (11.23) 与多极矩（习题 11.4）----------
export const kaiser = (b, f, mu) => (b + f * mu * mu) ** 2;
export const mono = (b, f) => b * b + 2 / 3 * b * f + f * f / 5;      // P0 / P_L
export const quad = (b, f) => 4 / 3 * b * f + 4 / 7 * f * f;           // P2 / P_L
export const hexa = (b, f) => 8 / 35 * f * f;                           // P4 / P_L

// Gauss–Legendre 节点（[-1,1]，16 点）
const GL = (() => { const n = 16, x = [], w = []; for (let i = 1; i <= n; i++) { let z = Math.cos(Math.PI * (i - 0.25) / (n + 0.5)), pp; for (let it = 0; it < 100; it++) { let p1 = 1, p2 = 0; for (let j = 1; j <= n; j++) { const p3 = p2; p2 = p1; p1 = ((2 * j - 1) * z * p2 - (j - 1) * p3) / j; } pp = n * (z * p1 - p2) / (z * z - 1); const z1 = z; z = z1 - p1 / pp; if (Math.abs(z - z1) < 1e-14) break; } x.push(z); w.push(2 / ((1 - z * z) * pp * pp)); } return { x, w }; })();
export const legendreP = (l, m) => l === 0 ? 1 : l === 2 ? (3 * m * m - 1) / 2 : l === 4 ? (35 * m ** 4 - 30 * m * m + 3) / 8 : NaN;
// (11.37) 的多极矩：P^(l)_obs(k_obs) = (2l+1)/2 ∫dμ_obs P_l(μ_obs) P_L(k)(b+fμ²)²，k、μ 由 (11.35) 换算
export function obsMultipole(l, kobs, Pk, { b = 2, f = 0.78, aperp = 0, apar = 0, PN = 0 } = {}) {
  let s = 0;
  for (let i = 0; i < GL.x.length; i++) {
    const mo = GL.x[i], kpar = (1 + apar) * kobs * mo, kperp = (1 + aperp) * kobs * Math.sqrt(1 - mo * mo);
    const k = Math.hypot(kpar, kperp), mu = kpar / k;
    s += GL.w[i] * legendreP(l, mo) * (Pk(k) * kaiser(b, f, mu) + PN);
  }
  return (2 * l + 1) / 2 * s;
}
// 沿给定 μ_obs 的观测功率谱
export function obsP(kobs, mo, Pk, { b = 2, f = 0.78, aperp = 0, apar = 0, PN = 0 } = {}) {
  const kpar = (1 + apar) * kobs * mo, kperp = (1 + aperp) * kobs * Math.sqrt(1 - mo * mo), k = Math.hypot(kpar, kperp);
  return Pk(k) * kaiser(b, f, kpar / k) + PN;
}

// ---------- AP 参数 (11.31)：真宇宙学 vs 基准宇宙学 ----------
export function alphas(zb, tru, fid) {
  const cT = chi(zb, tru), cF = chi(zb, fid), HT = E(zb, tru), HF = E(zb, fid);
  return { aperp: (cF - cT) / cF, apar: (HT - HF) / HF, chiT: cT, chiF: cF, HT, HF };
}

// ---------- 关联函数 ξ(r) = (1/2π²)∫k²dk P(k) j0(kr) e^{-k²σ²}（式 A.139）----------
export function xiOf(Pk, rs, { kmax = 2, n = 4000, smooth = 1 } = {}) {
  const dk = kmax / n, ks = [], ws = [];
  for (let i = 1; i <= n; i++) { const k = i * dk; ks.push(k); ws.push(k * k * Pk(k) * Math.exp(-((k * smooth) ** 2)) * (i === n ? 0.5 : 1) * dk); }
  return rs.map(r => { let s = 0; for (let i = 0; i < n; i++) { const x = ks[i] * r; s += ws[i] * Math.sin(x) / x; } return s / (2 * Math.PI ** 2); });
}

// ---------- 球 Bessel j_l（Miller 下行递推 / 上行递推）----------
export function sphj(l, x) {
  if (x < 1e-10) return l === 0 ? 1 : 0;
  if (l === 0) return Math.sin(x) / x;
  if (x > l + 0.5) { let a = Math.sin(x) / x, b = Math.sin(x) / (x * x) - Math.cos(x) / x; for (let n = 1; n < l; n++) { const c = (2 * n + 1) / x * b - a; a = b; b = c; } return b; }
  // x 较小时：下行递推，用 j0 或 j1 中较大者归一化
  const N = l + Math.ceil(Math.sqrt(40 * (l + 10))) + 20; let jp = 0, j = 1e-30, out = 0, j1v = 0;
  for (let n = N; n > 0; n--) { const jm = (2 * n + 1) / x * j - jp; jp = j; j = jm; if (n - 1 === l) out = j; if (n - 1 === 1) j1v = j; if (Math.abs(j) > 1e200) { j *= 1e-200; jp *= 1e-200; out *= 1e-200; j1v *= 1e-200; } }
  const j0t = Math.sin(x) / x, j1t = Math.sin(x) / (x * x) - Math.cos(x) / x;
  return Math.abs(j0t) > Math.abs(j1t) ? out * j0t / j : out * j1t / j1v;
}
// 柱 Bessel J0（Numerical Recipes 有理逼近，相对误差 ~1e-8）
export function J0(x) {
  const ax = Math.abs(x);
  if (ax < 8) {
    const y = x * x;
    const a = 57568490574.0 + y * (-13362590354.0 + y * (651619640.7 + y * (-11214424.18 + y * (77392.33017 + y * -184.9052456))));
    const b = 57568490411.0 + y * (1029532985.0 + y * (9494680.718 + y * (59272.64853 + y * (267.8532712 + y))));
    return a / b;
  }
  const z = 8 / ax, y = z * z, xx = ax - 0.785398164;
  const a = 1 + y * (-0.1098628627e-2 + y * (0.2734510407e-4 + y * (-0.2073370639e-5 + y * 0.2093887211e-6)));
  const b = -0.1562499995e-1 + y * (0.1430488765e-3 + y * (-0.6911147651e-5 + y * (0.7621095161e-6 - y * 0.934935152e-7)));
  return Math.sqrt(0.636619772 / ax) * (Math.cos(xx) * a - z * Math.sin(xx) * b);
}

// ---------- Limber (11.47) 与 w(θ) (11.49) ----------
// 选择函数：以 z0 为中心、红移宽 dz 的 Gaussian，换成 χ 上归一化的 W(χ)
export function windowGauss(z0, dz, p = {}) {
  const c0 = chi(z0, p), sig = dz * HUBBLE / E(z0, p);
  const W = c => Math.exp(-0.5 * (((c - c0) / sig) ** 2)) / (Math.sqrt(2 * Math.PI) * sig);
  return { W, c0, sig, lo: Math.max(1, c0 - 5 * sig), hi: c0 + 5 * sig };
}
// C_g(l)（Limber），b 为线性偏袒；P(k, z) = P_L(k, 0) [D(z)/D(0)]²
export function limberCl(ls, win, { b = 1, Pk0 = makePk(0), p = {}, n = 80 } = {}) {
  const cs = [], ws = [], gs = [];
  const hh = (win.hi - win.lo) / n;
  for (let i = 0; i <= n; i++) { const c = win.lo + i * hh, z = zOfChi(c, p); cs.push(c); const g = Dplus(z, p) / D0; gs.push(g * g); ws.push((i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * hh / 3 * win.W(c) ** 2 / (c * c)); }
  return ls.map(l => { let s = 0; for (let i = 0; i <= n; i++) s += ws[i] * gs[i] * Pk0((l + 0.5) / cs[i]); return b * b * s; });
}
// w(θ) = ∫dl/(2π) l C(l) J0(lθ)（θ 以弧度）；C(l) 在对数网格上插值
export function wTheta(thetas, lgrid, Cl) {
  const L = lgrid.map(Math.log), n = 6000, l0 = Math.log(lgrid[0]), l1 = Math.log(lgrid[lgrid.length - 1]), hh = (l1 - l0) / n;
  const interp = x => { let i = 1; while (i < L.length - 1 && L[i] < x) i++; const t = (x - L[i - 1]) / (L[i] - L[i - 1]); return Math.exp(Math.log(Cl[i - 1]) + t * (Math.log(Cl[i]) - Math.log(Cl[i - 1]))); };
  const ll = [], cc = [];
  for (let i = 0; i <= n; i++) { const x = l0 + i * hh, l = Math.exp(x); ll.push(l); cc.push(l * l * interp(x) * (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * hh / 3 / (2 * Math.PI)); }
  return thetas.map(th => { let s = 0; for (let i = 0; i <= n; i++) s += cc[i] * J0(ll[i] * th); return s; });
}

// ---------- SZ (11.57)–(11.58)、(11.70) ----------
export const fPlanck = x => 1 / Math.expm1(x);
// y 型畸变的形状：(1/x²) ∂_x (x⁴ ∂_x f0) = x eˣ/(eˣ−1)² [x coth(x/2) − 4]
export const gSZ = x => { const em = Math.expm1(x); return x * Math.exp(x) / (em * em) * (x * (Math.exp(x) + 1) / em - 4); };
export const IofX = (x, y) => x ** 3 * (fPlanck(x) + y * gSZ(x));     // I_ν ∝ x³ f
export const szNull = () => { let lo = 3, hi = 4.5; const g = x => (4 - x) * Math.exp(x) - 4 - x; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (g(m) > 0) lo = m; else hi = m; } return (lo + hi) / 2; };
export const KT_OVER_H_GHZ_PER_K = 20.8366;                            // k_B/h [GHz/K]
