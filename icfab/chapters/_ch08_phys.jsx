// 第 8 章（上）数值模型：表 8.1 插值、高斯 / Pearson IV 分布、掩蔽层、阻止本领、简化 BCA Monte Carlo。
// 纯函数，无 React 依赖；已用 node 与表 8.1、例题与图 8.19 的读数核对（见交付报告）。

// ---------- 表 8.1：非晶 Si 中的 R_P、ΔR_P（nm）----------
export const T81_E = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200];
export const T81 = {
  P: { Rp: [19.9, 34.2, 47.3, 59.8, 71.7, 83.3, 94.7, 105, 116, 127, 148, 169, 189, 210, 229], dRp: [6.4, 12.5, 17.9, 22.9, 27.5, 31.7, 35.6, 39.3, 42.8, 46.1, 52.2, 57.9, 63.0, 67.8, 72.3] },
  As: { Rp: [8.4, 15.6, 22.6, 29.4, 36.2, 42.9, 49.5, 56.1, 62.6, 69.2, 82.1, 95.0, 107, 120, 133], dRp: [4.3, 7.5, 10.2, 12.8, 15.2, 17.6, 19.8, 22.0, 24.1, 26.1, 30.1, 33.9, 37.5, 41.1, 44.6] },
  Sb: { Rp: [12.1, 21.9, 30.6, 38.5, 45.9, 52.8, 59.4, 65.6, 71.6, 77.3, 88.3, 98.5, 108, 117, 126], dRp: [5.8, 10.0, 13.3, 16.2, 18.7, 20.9, 22.9, 24.8, 26.5, 28.0, 30.9, 33.4, 35.7, 37.8, 39.7] },
  B: { Rp: [47.3, 82.6, 114, 143, 171, 198, 223, 248, 272, 296, 341, 385, 428, 469, 509], dRp: [24.9, 38.4, 48.3, 56.2, 62.8, 68.5, 73.6, 78.0, 82.1, 85.7, 92.2, 97.8, 102, 107, 110] },
};

// 离子参数（Z、质量 amu）。BF2 按 "B 分得 11/49 的能量" 处理（分子离子在表面解离，各原子按质量分能量）
export const IONS = {
  B: { Z: 5, m: 11, tex: "\\mathrm{B}" },
  BF2: { Z: 5, m: 11, tex: "\\mathrm{BF_2}", frac: 11 / 49 },
  P: { Z: 15, m: 31, tex: "\\mathrm{P}" },
  As: { Z: 33, m: 75, tex: "\\mathrm{As}" },
  Sb: { Z: 51, m: 122, tex: "\\mathrm{Sb}" },
};
export const SI = { Z: 14, m: 28.09, N: 5e22 };

// 对数–对数插值；表外按端段幂律外推（返回 extrap 标记）
function loglog(xs, ys, x) {
  const n = xs.length; let i = 0;
  if (x <= xs[0]) i = 0; else if (x >= xs[n - 1]) i = n - 2; else while (xs[i + 1] < x) i++;
  const p = Math.log(ys[i + 1] / ys[i]) / Math.log(xs[i + 1] / xs[i]);
  return ys[i] * Math.pow(x / xs[i], p);
}
// 返回 {Rp, dRp, Eeff, extrap}；单位 nm
export function moments(ion, E) {
  const key = ion === "BF2" ? "B" : ion, Eeff = ion === "BF2" ? E * IONS.BF2.frac : E;
  const t = T81[key];
  return { Rp: loglog(T81_E, t.Rp, Eeff), dRp: loglog(T81_E, t.dRp, Eeff), Eeff, extrap: Eeff < 10 || Eeff > 200 };
}

// ---------- 误差函数（Numerical Recipes erfcc，相对误差 < 1.2e-7）----------
export function erfc(x) {
  const z = Math.abs(x), t = 1 / (1 + 0.5 * z);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r;
}
export const erf = x => 1 - erfc(x);

// ---------- 分布 ----------
const S2PI = Math.sqrt(2 * Math.PI);
// 高斯 (8.4)：Q [cm^-2]，x、Rp、dRp [nm] → C [cm^-3]
export const gauss = (x, Q, Rp, dRp) => Q / (S2PI * dRp * 1e-7) * Math.exp(-((x - Rp) ** 2) / (2 * dRp * dRp));
// Pearson IV 的 β 下界（γ 给定时，β 必须大于此值才属 IV 型）
export const betaMin = g => (48 + 39 * g * g + 6 * Math.pow(g * g + 4, 1.5)) / (32 - g * g);
// Pearson IV：返回归一化（∫f dx = 1，x 以 nm 计）的形状函数 f(x)
export function pearson4(Rp, dRp, g, b) {
  const A = 10 * b - 12 * g * g - 18;
  const a = -g * dRp * (b + 3) / A, b0 = -dRp * dRp * (4 * b - 3 * g * g) / A, b2 = -(2 * b - 3 * g * g - 6) / A;
  const D = 4 * b0 * b2 - a * a;
  if (!(D > 0) || !(A > 0)) return null;
  const sD = Math.sqrt(D);
  const lnf = s => Math.log(Math.abs(b0 + a * s + b2 * s * s)) / (2 * b2) - a * (1 + 2 * b2) / (b2 * sD) * Math.atan((2 * b2 * s + a) / sD);
  // 以峰值（s = a）处为参考，避免溢出；再数值归一化
  const ref = lnf(a), n = 4000, L = 14 * dRp, h = 2 * L / n;
  let sum = 0; for (let i = 0; i <= n; i++) { const s = -L + i * h, w = i === 0 || i === n ? 1 : i % 2 ? 4 : 2; sum += w * Math.exp(lnf(s) - ref); }
  const norm = sum * h / 3;
  return x => Math.exp(lnf(x - Rp) - ref) / norm;
}
// 数值矩（用于核对 Pearson 实现：应回到输入的 Rp, dRp, γ, β）
export function numMoments(f, lo, hi, n = 8000) {
  const h = (hi - lo) / n; let m0 = 0, m1 = 0;
  for (let i = 0; i <= n; i++) { const x = lo + i * h, w = (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * h / 3, v = f(x); m0 += w * v; m1 += w * v * x; }
  const mu = m1 / m0; let m2 = 0, m3 = 0, m4 = 0;
  for (let i = 0; i <= n; i++) { const x = lo + i * h, w = (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * h / 3, v = f(x), d = x - mu; m2 += w * v * d * d; m3 += w * v * d ** 3; m4 += w * v * d ** 4; }
  const sd = Math.sqrt(m2 / m0);
  return { m0, Rp: mu, dRp: sd, gamma: m3 / m0 / sd ** 3, beta: m4 / m0 / sd ** 4 };
}
// 结深：C(x) 降到背景 CB 的最深位置（x > Rp 一侧；二分）
export function junctionDepth(C, CB, Rp, xmax) {
  if (C(Rp) <= CB) return null;
  let lo = Rp, hi = xmax; if (C(hi) > CB) return null;
  for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (C(m) > CB) lo = m; else hi = m; }
  return (lo + hi) / 2;
}

// ---------- 掩蔽 (8.16)、(8.19) ----------
export const maskThickness = (Q, Rp, dRp, CB) => { const Cp = Q / (S2PI * dRp * 1e-7); return Cp > CB ? Rp + dRp * Math.sqrt(2 * Math.log(Cp / CB)) : Rp; };
export const penetratedDose = (Q, Rp, dRp, xm) => Q / 2 * erfc((xm - Rp) / (Math.SQRT2 * dRp));

// ---------- 阻止本领 ----------
export const K_SE = 0.2e-15;   // (8.31) eV^1/2 cm^2
// (8.28) 常数核阻止 [eV cm^2]
export const SnConst = (Z1, m1, Z2 = SI.Z, m2 = SI.m) => 2.8e-15 * Z1 * Z2 / Math.sqrt(Math.pow(Z1, 2 / 3) + Math.pow(Z2, 2 / 3)) * m1 / (m1 + m2);
// (8.30)(8.31) 电子阻止 [eV cm^2]，E 以 eV 计
export const Se = E => K_SE * Math.sqrt(E);
// ZBL 普适核阻止（Ziegler–Biersack–Littmark），E 以 keV 计 → eV cm^2；作为图 8.19 "能量相关核阻止" 的参照（原书未给公式）
export function SnZBL(E_keV, Z1, m1, Z2 = SI.Z, m2 = SI.m) {
  const zz = Math.pow(Z1, 0.23) + Math.pow(Z2, 0.23);
  const eps = 32.53 * m2 * E_keV / (Z1 * Z2 * (m1 + m2) * zz);
  const sn = eps <= 30 ? Math.log(1 + 1.1383 * eps) / (2 * (eps + 0.01321 * Math.pow(eps, 0.21226) + 0.19593 * Math.sqrt(eps))) : Math.log(eps) / (2 * eps);
  return 8.462e-15 * Z1 * Z2 * m1 * sn / ((m1 + m2) * zz);
}
// (8.23) 用常数 Sn 与 Se = k√E 的解析积分：R = (2/(N k))[u − (Sn/k) ln(1 + k u / Sn)]，u = √E0 → 返回 nm
export function rangeLSS(E0_keV, Z1, m1) {
  const Sn = SnConst(Z1, m1), u = Math.sqrt(E0_keV * 1e3), r = Sn / K_SE;
  return 2 / (SI.N * K_SE) * (u - r * Math.log(1 + u / r)) * 1e7;
}
// (8.23) 数值积分版本（核阻止取 ZBL）→ nm
export function rangeZBL(E0_keV, Z1, m1) {
  const n = 400, lo = Math.log(1e-3), hi = Math.log(E0_keV); let s = 0;   // 对 ln E 积分（keV）
  for (let i = 0; i <= n; i++) { const E = Math.exp(lo + (hi - lo) * i / n), w = i === 0 || i === n ? 1 : i % 2 ? 4 : 2; s += w * E * 1e3 / (SnZBL(E, Z1, m1) + Se(E * 1e3)); }
  return s * (hi - lo) / n / 3 / SI.N * 1e7;
}
export const rpFromR = (R, m1, m2 = SI.m) => R / (1 + m2 / (3 * m1));   // (8.24)

// ---------- 简化二体碰撞近似（BCA）Monte Carlo：非晶 Si ----------
// 自由程取原子间距 N^{-1/3}；每步随机碰撞参数，散射角用 ZBL 普适势 + TRIM "magic formula"；连续电子阻止 k√E。
const PHI = x => 0.1818 * Math.exp(-3.2 * x) + 0.5099 * Math.exp(-0.9423 * x) + 0.2802 * Math.exp(-0.4029 * x) + 0.02817 * Math.exp(-0.2016 * x);
const DPHI = x => -3.2 * 0.1818 * Math.exp(-3.2 * x) - 0.9423 * 0.5099 * Math.exp(-0.9423 * x) - 0.4029 * 0.2802 * Math.exp(-0.4029 * x) - 0.2016 * 0.02817 * Math.exp(-0.2016 * x);
// 约化质心能 ε、约化碰撞参数 B → 质心散射角 Θ
export function magicTheta(eps, B) {
  // 最近距离 R0：解 1 − φ(R)/(εR) − (B/R)^2 = 0（牛顿法）
  let R = Math.max(B, 1e-3) + 0.1;
  for (let k = 0; k < 60; k++) {
    const f = 1 - PHI(R) / (eps * R) - (B / R) ** 2;
    const df = -(DPHI(R) * R - PHI(R)) / (eps * R * R) + 2 * B * B / R ** 3;
    const dR = f / df; R -= dR; if (R <= 0) R = 1e-4; if (Math.abs(dR) < 1e-7 * R) break;
  }
  const C1 = 0.99229, C2 = 0.011615, C3 = 0.0071222, C4 = 9.3066, C5 = 14.813;
  const se = Math.sqrt(eps), al = 1 + C1 / se, be = (C2 + se) / (C3 + se), ga = (C4 + eps) / (C5 + eps);
  const A = 2 * al * eps * Math.pow(B, be), G = 1 / (ga * (Math.sqrt(1 + A * A) - A));
  const V = PHI(R) / R, dV = (DPHI(R) * R - PHI(R)) / (R * R);
  const rho = -2 * (eps - V) / dV, Dl = A * (R - B) / (1 + G);
  let c = (B + rho + Dl) / (R + rho); c = Math.max(-1, Math.min(1, c));
  return 2 * Math.acos(c);
}
// 一个可复现的随机数发生器
export function rng(seed = 1) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
// 模拟 nIons 个离子；返回 {stops:[[x,y,z]...], tracks:[[[x,y,z],...], ...]}（nm；z 为深度）
export function simulateBCA({ Z1, m1, E0_keV, nIons = 300, nTracks = 25, tiltDeg = 0, seed = 7, Z2 = SI.Z, m2 = SI.m, N = SI.N }) {
  const rand = rng(seed);
  const L = Math.pow(N, -1 / 3) * 1e7;                       // 自由程 nm（≈0.27 nm）
  const pmax = 1 / Math.sqrt(Math.PI * N * Math.pow(N, -1 / 3)) * 1e7;   // nm：保证每个自由程恰有一次碰撞
  const zz = Math.pow(Z1, 0.23) + Math.pow(Z2, 0.23), a = 0.8854 * 0.0529 / zz;   // 屏蔽长度 nm
  const epsF = 32.53 * m2 / (Z1 * Z2 * (m1 + m2) * zz);       // ε = epsF·E[keV]
  const gam = 4 * m1 * m2 / (m1 + m2) ** 2, Ecut = 0.02;      // 截止 20 eV
  const stops = [], tracks = [], t0 = tiltDeg * Math.PI / 180;
  for (let n = 0; n < nIons; n++) {
    let x = 0, y = 0, z = 0, ux = Math.sin(t0), uy = 0, uz = Math.cos(t0), E = E0_keV, back = false;
    const tr = n < nTracks ? [[0, 0, 0]] : null; let step = 0;
    while (E > Ecut) {
      // 电子阻止（连续）
      E -= N * Se(E * 1e3) * L * 1e-7 / 1e3; if (E <= Ecut) break;
      x += ux * L; y += uy * L; z += uz * L;
      if (z < 0) { back = true; break; }                       // 背散射出表面
      const p = pmax * Math.sqrt(rand()), th = magicTheta(epsF * E, p / a);
      const T = gam * E * Math.sin(th / 2) ** 2;
      const psi = Math.atan2(Math.sin(th), Math.cos(th) + m1 / m2);   // 实验室系偏转角
      E -= T;
      // 方向旋转 ψ，随机方位角
      const ph = 2 * Math.PI * rand(), cp = Math.cos(psi), sp = Math.sin(psi);
      let vx, vy, vz;
      if (Math.abs(uz) > 0.99999) { vx = sp * Math.cos(ph); vy = sp * Math.sin(ph); vz = cp * Math.sign(uz); }
      else {
        const s = Math.sqrt(1 - uz * uz);
        vx = ux * cp + sp * (ux * uz * Math.cos(ph) - uy * Math.sin(ph)) / s;
        vy = uy * cp + sp * (uy * uz * Math.cos(ph) + ux * Math.sin(ph)) / s;
        vz = uz * cp - sp * s * Math.cos(ph);
      }
      const nn = Math.hypot(vx, vy, vz); ux = vx / nn; uy = vy / nn; uz = vz / nn;
      if (tr && (++step % 4 === 0)) tr.push([x, y, z]);
    }
    if (tr) { tr.push([x, y, z]); tracks.push({ pts: tr, back }); }
    if (!back) stops.push([x, y, z]);
  }
  return { stops, tracks, nBack: nIons - stops.length };
}
export function statsZ(stops) {
  const n = stops.length; if (!n) return { Rp: 0, dRp: 0, gamma: 0 };
  const mu = stops.reduce((s, p) => s + p[2], 0) / n;
  const v = stops.reduce((s, p) => s + (p[2] - mu) ** 2, 0) / n, sd = Math.sqrt(v);
  const g = stops.reduce((s, p) => s + (p[2] - mu) ** 3, 0) / n / sd ** 3;
  const lat = Math.sqrt(stops.reduce((s, p) => s + p[0] ** 2, 0) / n);
  return { Rp: mu, dRp: sd, gamma: g, dRlat: lat };
}
