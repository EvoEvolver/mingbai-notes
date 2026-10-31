// 第 12 章数值工具（纯函数，无 React）。单位：k [h Mpc^-1]，R [h^-1 Mpc]，M [h^-1 M_sun]，P [(h^-1 Mpc)^3]。
// 线性功率谱与增长因子沿用第 8 章的实现（_ch08_phys.jsx：EH98 转移函数、(8.8) 归一化、(8.75) 增长方程）。
import * as P8 from "./_ch08_phys.jsx";

export const FID = P8.FID;
export const RHO_CR = 2.775e11;                     // ρ_cr / h^2 [M_sun Mpc^-3] = [h^-1 M_sun / (h^-1 Mpc)^3]
export const DCR = 1.686;                            // (12.69)
export const C_H0 = 2997.92458;                      // c/H0 [h^-1 Mpc]

// ---------- 线性功率谱表（每个 Ω_m 计算一次）----------
const NK = 900, LK0 = Math.log(1e-5), LK1 = Math.log(2e2);
const cache = new Map();
export function model(Om = FID.Om) {
  const key = (+Om).toFixed(4);
  if (cache.has(key)) return cache.get(key);
  const h = FID.h, fb = FID.Obh2 / (Om * h * h);
  const g = P8.growth({ Om, OL: 1 - Om });
  const D0 = g.D[g.D.length - 1];
  const lk = Array.from({ length: NK }, (_, i) => LK0 + (LK1 - LK0) * i / (NK - 1));
  // Δ²(k, z=0)，k 以 h/Mpc
  const D2 = lk.map(l => { const kh = Math.exp(l), kM = kh * h; const Pm = P8.PL(kM, { Om, h, D: D0, Tfun: k => P8.ehTransfer(k, { h, Om, fb }) }); return P8.Delta2(kM, Pm); });
  const lnA = g.a.map(Math.log);
  const Dz = z => { const a = 1 / (1 + z); return a < g.a[0] ? a / g.a[0] * g.D[0] / D0 : interp(lnA, g.D, Math.log(a)) / D0; };   // D+(z)/D+(0)
  const m = { Om, lk, D2, Dz, rhom: Om * RHO_CR };
  // σ_TH(R, z=0) 表
  m.lR = Array.from({ length: 220 }, (_, i) => Math.log(0.01) + (Math.log(500) - Math.log(0.01)) * i / 219);
  m.sTH = m.lR.map(l => Math.sqrt(sigma2(m, Math.exp(l), "th")));
  cache.set(key, m);
  return m;
}
function interp(xs, ys, x) { let lo = 0, hi = xs.length - 1; if (x <= xs[0]) return ys[0]; if (x >= xs[hi]) return ys[hi]; while (hi - lo > 1) { const mm = (lo + hi) >> 1; if (xs[mm] > x) hi = mm; else lo = mm; } const t = (x - xs[lo]) / (xs[hi] - xs[lo]); return ys[lo] + t * (ys[hi] - ys[lo]); }
export const Wth = x => (x < 1e-3 ? 1 - x * x / 10 : 3 * (Math.sin(x) - x * Math.cos(x)) / x ** 3);
export const Delta2At = (m, kh) => interp(m.lk, m.D2, Math.log(kh));

// σ²_W(R) at z=0，(12.4)：kind = "th"（实空间 tophat）| "sk"（sharp-k，k_max=π/R）| "phi"（势，tophat，k_min=1e-4 h/Mpc）
export function sigma2(m, R, kind = "th") {
  let s = 0; const dl = m.lk[1] - m.lk[0];
  for (let i = 0; i < m.lk.length; i++) {
    const k = Math.exp(m.lk[i]); let w;
    if (kind === "sk") w = k <= Math.PI / R ? 1 : 0;
    else if (kind === "phi") { if (k < 1e-4) continue; const p = 1.5 * m.Om / (C_H0 * C_H0 * k * k); w = Wth(k * R) ** 2 * p * p; }
    else w = Wth(k * R) ** 2;
    s += m.D2[i] * w * (i === 0 || i === m.lk.length - 1 ? 0.5 : 1);
  }
  return s * dl;
}
export const sigmaTH = (m, R, z = 0) => interp(m.lR, m.sTH, Math.log(R)) * m.Dz(z);
export const RL = (m, M) => Math.cbrt(3 * M / (4 * Math.PI * m.rhom));            // (12.63)–(12.64)
export const sigmaM = (m, M, z = 0) => sigmaTH(m, RL(m, M), z);
export const dlnsdlnM = (m, M) => { const e = 0.02; return (Math.log(sigmaM(m, M * Math.exp(e))) - Math.log(sigmaM(m, M * Math.exp(-e)))) / (2 * e); };

// ---------- 质量函数的 f(ν)：dn/dlnM = (ρ_m/M) f |dlnσ/dlnM| ----------
export const fPS = nu => Math.sqrt(2 / Math.PI) * nu * Math.exp(-nu * nu / 2);                       // (12.73)
const STA = 0.3222, STa = 0.707, STp = 0.3;
export const fST = nu => STA * Math.sqrt(2 * STa / Math.PI) * (1 + (STa * nu * nu) ** -STp) * nu * Math.exp(-STa * nu * nu / 2);
// Tinker et al. (2008) Δ=200（相对平均密度），f 写成 σ 的函数
export function fTinker(sig, z, Delta = 200) {
  const al = 10 ** (-((0.75 / Math.log10(Delta / 75)) ** 1.2));
  const A = 0.186 * (1 + z) ** -0.14, a = 1.47 * (1 + z) ** -0.06, b = 2.57 * (1 + z) ** -al, c = 1.19;
  return A * ((sig / b) ** -a + 1) * Math.exp(-c / (sig * sig));
}
// 线性偏袒：PS 拉格朗日 (12.81)、PS 欧拉 1+b、ST 欧拉
export const b1PS = nu => (nu * nu - 1) / DCR;
export const b1ST = nu => 1 + (STa * nu * nu - 1) / DCR + 2 * STp / (DCR * (1 + (STa * nu * nu) ** STp));

// ---------- 球坍缩（无 Λ，物质主导）----------
export const cyc = th => ({ r: (1 - Math.cos(th)) / 2, t: (th - Math.sin(th)) / Math.PI });       // r/r_ta, t/t_ta (12.68)
export const deltaNL = th => 4.5 * (th - Math.sin(th)) ** 2 / (1 - Math.cos(th)) ** 3 - 1;
export const deltaLin = th => 0.6 * Math.cbrt(0.75 * 0.75) * Math.cbrt((th - Math.sin(th)) ** 2);

// ---------- NFW (12.62)；M [M_sun]，r [kpc]，Δ 相对平均物质密度 ----------
export function nfw(M, c, Delta = 200, h = FID.h, Om = FID.Om) {
  const rhom = Om * RHO_CR * h * h / 1e9;                   // M_sun kpc^-3
  const R = Math.cbrt(3 * M / (4 * Math.PI * Delta * rhom)), rs = R / c;
  const mc = Math.log(1 + c) - c / (1 + c), rhos = Delta * rhom * c ** 3 / (3 * mc);
  return { R, rs, rhos, rhom, rho: r => rhos / ((r / rs) * (1 + r / rs) ** 2) };
}

// ---------- 二阶核 (12.39)：μ = k̂1·k̂2，r = k2/k1 ----------
export const F2 = (mu, r) => 5 / 7 + 2 / 7 * mu * mu + 0.5 * mu * (r + 1 / r);
export const G2 = (mu, r) => 3 / 7 + 4 / 7 * mu * mu + 0.5 * mu * (r + 1 / r);
