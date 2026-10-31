// 第 13 章数值工具（纯 JS，无 JSX）：平直 ΛCDM 背景、χ(z)、增长因子、EH98 无摆动转移函数、
// Takahashi et al. (2012) Halofit 非线性功率谱、透镜核 g_L(χ) (13.49)、Limber 积分 C_κκ(l) (13.51)、
// 剪切相关函数 ξ± (13.58) 与点质量透镜。单位：长度 Mpc，波数 Mpc^-1，H0 以 Mpc^-1 计（c=1）。

export const FID = { h: 0.677, Om: 0.3106, Obh2: 0.022447, ns: 0.9682, s8: 0.810, Tcmb: 2.7255 };
export const C_KMS = 299792.458;
export const ORH2 = 4.15e-5;                          // Ω_r h²（光子 + 无质量中微子），(2.85)

// ---------- 背景 ----------
export function background({ h = FID.h, Om = FID.Om } = {}) {
  const H0 = h * 100 / C_KMS, Or = ORH2 / (h * h), OL = 1 - Om - Or;
  const E = z => Math.sqrt(Om * (1 + z) ** 3 + Or * (1 + z) ** 4 + OL);
  // χ(z) 表：x = ln(1+z) 网格上的梯形累积（dχ = (1+z) dx / H）
  const N = 4000, xmax = Math.log(1 + 1200), dx = xmax / N;
  const xs = new Float64Array(N + 1), chis = new Float64Array(N + 1);
  let prev = 1 / (H0 * E(0)), acc = 0;
  for (let i = 0; i <= N; i++) {
    const x = i * dx, z = Math.expm1(x), f = (1 + z) / (H0 * E(z));
    if (i > 0) acc += 0.5 * (f + prev) * dx;
    xs[i] = x; chis[i] = acc; prev = f;
  }
  const chiOf = z => { const x = Math.log1p(Math.max(0, z)); const t = x / dx; const i = Math.min(N - 1, Math.floor(t)); const u = t - i; return chis[i] * (1 - u) + chis[i + 1] * u; };
  const zOf = chi => {                                 // 反函数（单调，二分）
    if (chi <= 0) return 0;
    let lo = 0, hi = N; if (chi >= chis[N]) return Math.expm1(xs[N]);
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (chis[m] < chi) lo = m; else hi = m; }
    const u = (chi - chis[lo]) / (chis[hi] - chis[lo]); return Math.expm1(xs[lo] + u * dx);
  };
  // 增长因子（忽略辐射；(8.77)）：D(a) ∝ H(a) ∫ da / (aH)^3，归一化 D(z=0)=1
  const Em = a => Math.sqrt(Om / a ** 3 + (1 - Om) );
  const Dun = a => { const n = 400; let s = 0; const lo = 1e-6, L0 = Math.log(lo), L1 = Math.log(a); const hh = (L1 - L0) / n;
    for (let i = 0; i <= n; i++) { const aa = Math.exp(L0 + i * hh), f = aa / (aa * Em(aa)) ** 3; s += f * (i === 0 || i === n ? 1 : i % 2 ? 4 : 2); }
    return 2.5 * Om * Em(a) * s * hh / 3; };
  const D1 = Dun(1);
  const Dcache = new Map();
  const growth = z => { const key = Math.round(Math.log1p(z) * 2000); if (!Dcache.has(key)) Dcache.set(key, Dun(1 / Math.exp(key / 2000)) / D1); return Dcache.get(key); };
  const OmZ = z => Om * (1 + z) ** 3 / (Om * (1 + z) ** 3 + (1 - Om));
  return { h, H0, Om, Or, OL, E, chiOf, zOf, growth, OmZ, chiMax: chis[N] };
}

// ---------- 线性功率谱：EH98 无摆动转移函数，σ8 归一化 ----------
export function linearPk({ h = FID.h, Om = FID.Om, Obh2 = FID.Obh2, ns = FID.ns, s8 = FID.s8, Tcmb = FID.Tcmb } = {}) {
  const wm = Om * h * h, fb = Obh2 / wm, th = Tcmb / 2.7;
  const s = 44.5 * Math.log(9.83 / wm) / Math.sqrt(1 + 10 * Obh2 ** 0.75);
  const aG = 1 - 0.328 * Math.log(431 * wm) * fb + 0.38 * Math.log(22.3 * wm) * fb * fb;
  const T = k => { // k [Mpc^-1]
    const G = Om * h * (aG + (1 - aG) / (1 + (0.43 * k * s) ** 4));
    const q = k * th * th / (G * h);
    const L = Math.log(2 * Math.E + 1.8 * q), C = 14.2 + 731 / (1 + 62.5 * q);
    return L / (L + C * q * q);
  };
  const P0 = k => k ** ns * T(k) ** 2;
  // σ8 归一化：R = 8 h^-1 Mpc 的球形 top-hat
  const R8 = 8 / h; let sig = 0; const n = 3000, L0 = Math.log(1e-5), L1 = Math.log(50), dl = (L1 - L0) / n;
  for (let i = 0; i <= n; i++) { const k = Math.exp(L0 + i * dl), x = k * R8; const W = x < 1e-3 ? 1 - x * x / 10 : 3 * (Math.sin(x) - x * Math.cos(x)) / x ** 3;
    sig += (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * k ** 3 * P0(k) * W * W / (2 * Math.PI ** 2); }
  sig *= dl / 3;
  const A = s8 * s8 / sig;
  return { P: k => A * P0(k), T, A, s, h, Om, ns, s8 };
}

// ---------- Halofit（Takahashi et al. 2012） ----------
export function halofit(bg, lin) {
  // z=0 的 Δ²_L 表（对数 k 网格）用于求 σ_G(R)
  const NK = 1400, L0 = Math.log(1e-5), L1 = Math.log(3e4), dl = (L1 - L0) / NK;
  const lk = new Float64Array(NK + 1), D2 = new Float64Array(NK + 1);
  for (let i = 0; i <= NK; i++) { const k = Math.exp(L0 + i * dl); lk[i] = k; D2[i] = k ** 3 * lin.P(k) / (2 * Math.PI ** 2); }
  const sig2 = (R, m = 0) => { // m=0: σ²；m=1: Σ Δ² e^{-y²} y²；m=2: Σ Δ² e^{-y²} y⁴
    let s = 0; for (let i = 0; i <= NK; i++) { const y2 = (lk[i] * R) ** 2; if (y2 > 60) break; const w = i === 0 ? 0.5 : 1; s += w * D2[i] * Math.exp(-y2) * (m === 0 ? 1 : m === 1 ? y2 : y2 * y2); }
    return s * dl;
  };
  const cache = new Map();
  const params = z => {
    const key = Math.round(z * 1000); if (cache.has(key)) return cache.get(key);
    const g2 = bg.growth(z) ** 2;
    let lo = Math.log(1e-4), hi = Math.log(40), res = null;
    if (g2 * sig2(Math.exp(lo)) < 1) res = { linear: true };
    else {
      for (let it = 0; it < 60; it++) { const m = (lo + hi) / 2; if (g2 * sig2(Math.exp(m)) > 1) lo = m; else hi = m; }
      const R = Math.exp((lo + hi) / 2), s0 = sig2(R), s1 = sig2(R, 1), s2 = sig2(R, 2);
      // dlnσ²/dlnR = -2 s1/s0；d²lnσ²/dlnR² = (-4 s1 + 4 s2)/s0 - (2 s1/s0)²
      const d1 = -2 * s1 / s0, d2 = (-4 * s1 + 4 * s2) / s0 - d1 * d1;
      const n = -3 - d1, C = -d2, Om = bg.OmZ(z);
      res = {
        linear: false, ks: 1 / R, n, C,
        an: 10 ** (1.5222 + 2.8553 * n + 2.3706 * n * n + 0.9903 * n ** 3 + 0.2250 * n ** 4 - 0.6038 * C),
        bn: 10 ** (-0.5642 + 0.5864 * n + 0.5716 * n * n - 1.5474 * C),
        cn: 10 ** (0.3698 + 2.0404 * n + 0.8161 * n * n + 0.5869 * C),
        gn: 0.1971 - 0.0843 * n + 0.8460 * C,
        al: Math.abs(6.0835 + 1.3373 * n - 0.1959 * n * n - 5.5274 * C),
        be: 2.0379 - 0.7354 * n + 0.3157 * n * n + 1.2490 * n ** 3 + 0.3980 * n ** 4 - 0.1682 * C,
        nu: 10 ** (5.2105 + 3.6902 * n),
        f1: Om ** -0.0307, f2: Om ** -0.0585, f3: Om ** 0.0743,
      };
    }
    cache.set(key, res); return res;
  };
  const Plin = (k, z) => lin.P(k) * bg.growth(z) ** 2;
  const Pnl = (k, z) => {
    const PL = Plin(k, z), p = params(z); if (p.linear) return PL;
    const DL = k ** 3 * PL / (2 * Math.PI ** 2), y = k / p.ks, fy = y / 4 + y * y / 8;
    const DQ = DL * ((1 + DL) ** p.be / (1 + p.al * DL)) * Math.exp(-fy);
    const DHp = p.an * y ** (3 * p.f1) / (1 + p.bn * y ** p.f2 + (p.cn * p.f3 * y) ** (3 - p.gn));
    const DH = DHp / (1 + p.nu / (y * y));
    return (DQ + DH) * 2 * Math.PI ** 2 / k ** 3;
  };
  return { Plin, Pnl, params };
}

// ---------- 透镜核 (13.49) ----------
// 源分布：zs、sz（sz=0 → 单一红移面，W = δ(χ-χs)）。返回 χ 网格上的 g_L、W_κ = (3/2)Ω_m H0² χ g_L / a，以及 W(χ)。
export function lensKernel(bg, { zs, sz = 0, N = 240 }) {
  const chiS = bg.chiOf(zs);
  if (!(sz > 0)) {
    const chiMax = chiS, chi = [], g = [], Wk = [], z = [], nW = [];
    for (let i = 0; i <= N; i++) { const c = chiMax * i / N, zz = bg.zOf(c); chi.push(c); z.push(zz); const gl = 1 - c / chiS; g.push(gl); Wk.push(1.5 * bg.Om * bg.H0 ** 2 * c * gl * (1 + zz)); nW.push(0); }
    return { chi, z, g, Wk, W: nW, chiS, chiMax };
  }
  // 高斯 n(z)（截断于 z>0，并归一化）
  const zmax = zs + 5 * sz, chiMax = bg.chiOf(zmax);
  const chi = [], z = [], W = [];
  for (let i = 0; i <= N; i++) { const c = chiMax * i / N, zz = bg.zOf(c); chi.push(c); z.push(zz); W.push(Math.exp(-0.5 * ((zz - zs) / sz) ** 2) * bg.H0 * bg.E(zz)); } // n(z) dz/dχ
  const dc = chiMax / N; let norm = 0; for (let i = 0; i <= N; i++) norm += W[i] * (i === 0 || i === N ? 0.5 : 1) * dc;
  for (let i = 0; i <= N; i++) W[i] /= norm;
  const g = [], Wk = [];
  for (let i = 0; i <= N; i++) {
    let s = 0; for (let j = i; j <= N; j++) { if (chi[j] <= 0) continue; const w = (j === i || j === N ? 0.5 : 1) * dc; s += w * (1 - chi[i] / chi[j]) * W[j]; }
    g.push(s); Wk.push(1.5 * bg.Om * bg.H0 ** 2 * chi[i] * s * (1 + z[i]));
  }
  return { chi, z, g, Wk, W, chiS, chiMax };
}

// ---------- C_κκ(l) (13.51)：Limber 积分 ----------
export function Ckk(bg, hf, K, l, { nonlinear = true } = {}) {
  const pref = (1.5 * bg.Om * bg.H0 ** 2) ** 2, N = K.chi.length - 1;
  let s = 0;
  for (let i = 1; i <= N; i++) {
    const c = K.chi[i], z = K.z[i], g = K.g[i]; if (g <= 0) continue;
    const k = l / c, P = nonlinear ? hf.Pnl(k, z) : hf.Plin(k, z);
    s += (i === N ? 0.5 : 1) * (1 + z) ** 2 * g * g * P;
  }
  return pref * s * (K.chi[1] - K.chi[0]);
}

// C_κκ 表（对数 l 网格）与插值
export function CkkTable(bg, hf, K, { lmin = 1, lmax = 2e5, n = 70, nonlinear = true } = {}) {
  const ls = [], cs = [];
  for (let i = 0; i < n; i++) { const l = lmin * (lmax / lmin) ** (i / (n - 1)); ls.push(l); cs.push(Ckk(bg, hf, K, l, { nonlinear })); }
  const L = ls.map(Math.log), Cl = cs.map(v => Math.log(Math.max(v, 1e-300)));
  const at = l => { const x = Math.log(l); if (x <= L[0]) return Math.exp(Cl[0]); if (x >= L[n - 1]) return Math.exp(Cl[n - 1] + (Cl[n - 1] - Cl[n - 2]) / (L[n - 1] - L[n - 2]) * (x - L[n - 1]));
    let i = Math.floor((x - L[0]) / (L[n - 1] - L[0]) * (n - 1)); i = Math.max(0, Math.min(n - 2, i)); const u = (x - L[i]) / (L[i + 1] - L[i]); return Math.exp(Cl[i] * (1 - u) + Cl[i + 1] * u); };
  return { ls, cs, at };
}

// ---------- Bessel J0、J1（Numerical Recipes 有理逼近）与 J_n ----------
export function J0(x) {
  const ax = Math.abs(x);
  if (ax < 8) { const y = x * x;
    return (57568490574.0 + y * (-13362590354.0 + y * (651619640.7 + y * (-11214424.18 + y * (77392.33017 + y * (-184.9052456)))))) /
      (57568490411.0 + y * (1029532985.0 + y * (9494680.718 + y * (59272.64853 + y * (267.8532712 + y * 1.0))))); }
  const z = 8 / ax, y = z * z, xx = ax - 0.785398164;
  const a1 = 1 + y * (-0.1098628627e-2 + y * (0.2734510407e-4 + y * (-0.2073370639e-5 + y * 0.2093887211e-6)));
  const a2 = -0.1562499995e-1 + y * (0.1430488765e-3 + y * (-0.6911147651e-5 + y * (0.7621095161e-6 - y * 0.934935152e-7)));
  return Math.sqrt(0.636619772 / ax) * (Math.cos(xx) * a1 - z * Math.sin(xx) * a2);
}
export function J1(x) {
  const ax = Math.abs(x);
  if (ax < 8) { const y = x * x;
    return x * (72362614232.0 + y * (-7895059235.0 + y * (242396853.1 + y * (-2972611.439 + y * (15704.48260 + y * (-30.16036606)))))) /
      (144725228442.0 + y * (2300535178.0 + y * (18583304.74 + y * (99447.43394 + y * (376.9991397 + y * 1.0))))); }
  const z = 8 / ax, y = z * z, xx = ax - 2.356194491;
  const a1 = 1 + y * (0.183105e-2 + y * (-0.3516396496e-4 + y * (0.2457520174e-5 + y * (-0.240337019e-6))));
  const a2 = 0.04687499995 + y * (-0.2002690873e-3 + y * (0.8449199096e-5 + y * (-0.88228987e-6 + y * 0.105787412e-6)));
  const ans = Math.sqrt(0.636619772 / ax) * (Math.cos(xx) * a1 - z * Math.sin(xx) * a2);
  return x < 0 ? -ans : ans;
}
export function Jn(n, x) {
  if (n === 0) return J0(x);
  if (n === 1) return J1(x);
  if (Math.abs(x) < 10) { // 级数
    let s = 0, term = (x / 2) ** n; for (let k = 1; k <= n; k++) term /= k;
    for (let m = 0; m < 60; m++) { s += term; term *= -(x * x / 4) / ((m + 1) * (m + 1 + n)); if (Math.abs(term) < 1e-17 * Math.abs(s) && m > 3) break; }
    return s;
  }
  let jm = J0(x), j = J1(x);                          // 向上递推（x > n 时稳定）
  for (let k = 1; k < n; k++) { const jp = 2 * k / x * j - jm; jm = j; j = jp; }
  return j;
}

// ---------- ξ±(θ) (13.58) 与 ξ_g,t ----------
// θ 以弧度计；C 为 l → C(l) 的函数
export function xiPM(C, theta, n, { lmin = 1, lmax = 3e5, N = 6000 } = {}) {
  const L0 = Math.log(lmin), L1 = Math.log(lmax), dl = (L1 - L0) / N; let s = 0;
  for (let i = 0; i <= N; i++) { const l = Math.exp(L0 + i * dl); s += (i === 0 || i === N ? 1 : i % 2 ? 4 : 2) * l * l * Jn(n, l * theta) * C(l); }
  return s * dl / 3 / (2 * Math.PI);
}

// ---------- 点质量透镜 ----------
// 4GM_sun/c² 以 Mpc 计
export const FOURG_MSUN_MPC = 4 * 6.6743e-11 * 1.98847e30 / (299792458 ** 2) / 3.0857e22;
export function einsteinRadius(bg, M, zl, zs) {     // 返回 θ_E [rad]，(13.67) 的点质量情形
  const cl = bg.chiOf(zl), cs = bg.chiOf(zs); if (cs <= cl) return 0;
  return Math.sqrt(FOURG_MSUN_MPC * M * (cs - cl) * (1 + zl) / (cs * cl));
}
export const ARCSEC = Math.PI / 180 / 3600, ARCMIN = Math.PI / 180 / 60;

// ---------- 星系–剪切交叉谱 C_gE (13.61)，P_gm = b1 P_NL ----------
// 透镜星系：高斯 n(z)（中心 zl、宽 szl）；源：lensKernel 结果 Ks（g_L 在其 χ 网格上，线性插值）
export function lensSample(bg, { zl, szl = 0.05, N = 120 }) {
  const z0 = Math.max(0.005, zl - 5 * szl), z1 = zl + 5 * szl, c0 = bg.chiOf(z0), c1 = bg.chiOf(z1);
  const chi = [], z = [], W = [];
  for (let i = 0; i <= N; i++) { const c = c0 + (c1 - c0) * i / N, zz = bg.zOf(c); chi.push(c); z.push(zz); W.push(Math.exp(-0.5 * ((zz - zl) / szl) ** 2) * bg.H0 * bg.E(zz)); }
  const dc = (c1 - c0) / N; let s = 0; W.forEach((w, i) => { s += w * (i === 0 || i === N ? 0.5 : 1) * dc; }); for (let i = 0; i <= N; i++) W[i] /= s;
  return { chi, z, W, dc };
}
const interp = (xs, ys, x) => { const n = xs.length; if (x <= xs[0]) return ys[0]; if (x >= xs[n - 1]) return ys[n - 1]; let lo = 0, hi = n - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (xs[m] < x) lo = m; else hi = m; } const u = (x - xs[lo]) / (xs[hi] - xs[lo]); return ys[lo] * (1 - u) + ys[hi] * u; };
export function CgE(bg, hf, Lg, Ks, l, b1 = 1) {
  let s = 0; const N = Lg.chi.length - 1;
  for (let i = 0; i <= N; i++) { const c = Lg.chi[i], z = Lg.z[i], g = interp(Ks.chi, Ks.g, c); if (g <= 0 || c <= 0) continue;
    s += (i === 0 || i === N ? 0.5 : 1) * Lg.W[i] * (1 + z) * g * b1 * hf.Pnl(l / c, z) / c; }
  return 1.5 * bg.Om * bg.H0 ** 2 * s * Lg.dc;
}
