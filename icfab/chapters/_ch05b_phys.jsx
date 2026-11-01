// 第 5 章（下）数值引擎：空间像（Abbe 衍射级求和 / 二维 FFT）、Fresnel 近场、Dill 曝光与驻波、BARC 反射率、Mack 显影。
// 全部为纯函数，已用 node 与原书图 5.36–5.39、5.44、5.50、5.61、5.71–5.72 的定性/定量结论核对（见交付报告）。

// ---------------- 复数 ----------------
export const cx = (re, im = 0) => ({ re, im });
export const cadd = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
export const csub = (a, b) => ({ re: a.re - b.re, im: a.im - b.im });
export const cmul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
export const cdiv = (a, b) => { const d = b.re * b.re + b.im * b.im; return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d }; };
export const cexp = (a) => { const e = Math.exp(a.re); return { re: e * Math.cos(a.im), im: e * Math.sin(a.im) }; };
export const cabs2 = (a) => a.re * a.re + a.im * a.im;
export const cscale = (a, s) => ({ re: a.re * s, im: a.im * s });

// ---------------- 一维光栅掩模的傅里叶系数（式 5.21/5.23 的离散形式） ----------------
// type: "binary" 二元铬掩模（透光间隔宽 w，周期 p）；"alt" 交替移相（相邻间隔相位差 180°，真实周期 2p）；
//       "att" 衰减移相（铬换成透过率 Tatt、相位 180° 的材料）
export function gratingMask(type, p, w, Tatt = 0.06) {
  if (type === "alt") return { P: 2 * p, bg: cx(0), segs: [[-w / 2, w / 2, cx(1)], [p - w / 2, p + w / 2, cx(-1)]] };
  if (type === "att") return { P: p, bg: cx(-Math.sqrt(Tatt)), segs: [[-w / 2, w / 2, cx(1)]] };
  return { P: p, bg: cx(0), segs: [[-w / 2, w / 2, cx(1)]] };
}
export function fourierCoef(mask, n) {
  const { P, bg, segs } = mask;
  let c = n === 0 ? { ...bg } : cx(0);
  for (const [x0, x1, a] of segs) {
    const d = csub(a, bg);
    let I;
    if (n === 0) I = cx((x1 - x0) / P);
    else {   // (1/P)∫ e^{-2πi n x/P} dx
      const k = -2 * Math.PI * n / P;
      const e1 = cexp(cx(0, k * x1)), e0 = cexp(cx(0, k * x0));
      I = cmul(csub(e1, e0), cx(0, -1 / (k * P)));
    }
    c = cadd(c, cmul(d, I));
  }
  return c;
}

// ---------------- 照明光源离散化（一维投影，单位：σ = sinθ/NA） ----------------
// 圆盘光源投影到 x 方向的权重 ∝ 弦长 √(σ²−s²)
export function sourcePoints(shape, sigma, sigIn = 0.5, nPts = 31) {
  if (shape === "coh" || sigma < 1e-3) return [[0, 1]];
  const out = [];
  const chord = (r, s) => (Math.abs(s) < r ? Math.sqrt(r * r - s * s) : 0);
  if (shape === "dipole") {   // 两个半径 0.15 的极，中心在 ±σ
    const r = 0.15;
    for (let i = 0; i < nPts; i++) { const u = -r + 2 * r * (i + 0.5) / nPts, w = chord(r, u); out.push([sigma + u, w], [-sigma + u, w]); }
    return out;
  }
  for (let i = 0; i < nPts; i++) {
    const s = -sigma + 2 * sigma * (i + 0.5) / nPts;
    const w = shape === "annular" ? chord(sigma, s) - chord(sigma * sigIn, s) : chord(sigma, s);
    if (w > 0) out.push([s, w]);
  }
  return out;
}

// ---------------- Abbe 成像：对衍射级求和（式 5.27–5.31） ----------------
// 参数单位：nm。zf 离焦量；nm 为像方介质折射率（浸没时 1.44）。返回 {I(x), orders(每个光源点通过的级次数), P}
export function aerial1D({ type = "binary", p, w, lambda, NA, shape = "conv", sigma = 0.5, sigIn = 0.5, zf = 0, nMed = 1, Tatt = 0.06 }) {
  const mask = gratingMask(type, p, w, Tatt), P = mask.P;
  const src = sourcePoints(shape, sigma, sigIn);
  const fc = NA / lambda, Nmax = Math.ceil((fc * (1 + Math.max(sigma, 1))) * P) + 1;
  const coef = new Map();
  for (let n = -Nmax; n <= Nmax; n++) coef.set(n, fourierCoef(mask, n));
  const terms = [];   // 每个光源点：[权重, [[n, 复振幅（含离焦相位）]]]
  let wsum = 0, nOrdMin = 1e9, nOrdMax = 0;
  for (const [s, wt] of src) {
    const fs = s * fc, list = [];
    for (let n = -Nmax; n <= Nmax; n++) {
      const f = n / P + fs;
      if (Math.abs(f) <= fc + 1e-12) {
        const lf = lambda * f, ph = 2 * Math.PI * zf / lambda * (Math.sqrt(Math.max(0, nMed * nMed - lf * lf)) - nMed);
        list.push([n, cmul(coef.get(n), cexp(cx(0, ph)))]);
      }
    }
    nOrdMin = Math.min(nOrdMin, list.length); nOrdMax = Math.max(nOrdMax, list.length);
    terms.push([wt, list]); wsum += wt;
  }
  const I = x => {
    let s = 0;
    for (const [wt, list] of terms) {
      let re = 0, im = 0;
      for (const [n, c] of list) { const a = 2 * Math.PI * n * x / P, cs = Math.cos(a), sn = Math.sin(a); re += c.re * cs - c.im * sn; im += c.re * sn + c.im * cs; }
      s += wt * (re * re + im * im);
    }
    return s / wsum;
  };
  return { I, P, nOrdMin, nOrdMax };
}
// 一个周期内的对比度（MTF 的原书定义，式 5.13：(Imax−Imin)/(Imax+Imin)）
export function contrastOf(I, P, n = 240) {
  let lo = Infinity, hi = -Infinity;
  for (let i = 0; i < n; i++) { const v = I(-P / 2 + P * i / n); lo = Math.min(lo, v); hi = Math.max(hi, v); }
  return { lo, hi, c: hi + lo > 0 ? (hi - lo) / (hi + lo) : 0 };
}

// ---------------- 二维 FFT 空间像（Three.js 曲面用） ----------------
function fft1(re, im, inv) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) { let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit; if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; } }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (inv ? 2 : -2) * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0;
      for (let k = 0; k < len / 2; k++) {
        const a = i + k, b = a + len / 2, tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr;
        re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti;
        const nr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = nr;
      }
    }
  }
  if (inv) for (let i = 0; i < n; i++) { re[i] /= n; im[i] /= n; }
}
export function fft2(re, im, N, inv = false) {
  const r = new Float64Array(N), m = new Float64Array(N);
  for (let y = 0; y < N; y++) { for (let x = 0; x < N; x++) { r[x] = re[y * N + x]; m[x] = im[y * N + x]; } fft1(r, m, inv); for (let x = 0; x < N; x++) { re[y * N + x] = r[x]; im[y * N + x] = m[x]; } }
  for (let x = 0; x < N; x++) { for (let y = 0; y < N; y++) { r[y] = re[y * N + x]; m[y] = im[y * N + x]; } fft1(r, m, inv); for (let y = 0; y < N; y++) { re[y * N + x] = r[y]; im[y * N + x] = m[y]; } }
}

// 版图（单位 nm，原点在中心）：仿原书图 5.39/5.65 的两个肘形 + 一个接触孔，特征尺寸 100 nm
export const LAYOUT = [
  [-250, -250, -150, 250], [-150, 150, 250, 250],     // 大肘形：竖条 + 顶部横条
  [-50, -250, 50, 50], [50, -50, 250, 50],           // 小肘形
  [150, -250, 250, -150],                             // 接触孔
];
// OPC：外角加衬线（serif），内角挖缺口（notch），线端加"锤头"——与原书图 5.65 右图同一思路
const S = 40, Nt = 30;
export const OPC_ADD = [
  // 大肘形外角与线端
  [-250 - S / 2, 250 - S / 2, -250 + S / 2, 250 + S / 2], [250 - S / 2, 250 - S / 2, 250 + S / 2, 250 + S / 2], [250 - S / 2, 150 - S / 2, 250 + S / 2, 150 + S / 2],
  [-250 - S / 2, -250 - S / 2, -250 + S / 2, -250 + S / 2], [-150 - S / 2, -250 - S / 2, -150 + S / 2, -250 + S / 2],
  // 小肘形
  [-50 - S / 2, 50 - S / 2, -50 + S / 2, 50 + S / 2], [250 - S / 2, 50 - S / 2, 250 + S / 2, 50 + S / 2], [250 - S / 2, -50 - S / 2, 250 + S / 2, -50 + S / 2],
  [-50 - S / 2, -250 - S / 2, -50 + S / 2, -250 + S / 2], [50 - S / 2, -250 - S / 2, 50 + S / 2, -250 + S / 2],
  // 接触孔四角
  [150 - S / 2, -250 - S / 2, 150 + S / 2, -250 + S / 2], [250 - S / 2, -250 - S / 2, 250 + S / 2, -250 + S / 2], [150 - S / 2, -150 - S / 2, 150 + S / 2, -150 + S / 2], [250 - S / 2, -150 - S / 2, 250 + S / 2, -150 + S / 2],
];
export const OPC_CUT = [[-150, 150 - Nt, -150 + Nt, 150], [50, -50, 50 + Nt, -50 + Nt]];   // 内角缺口

export function rasterMask(N, L, opc) {
  const t = new Float64Array(N * N), dx = L / N;
  const fill = ([x0, y0, x1, y1], v) => {
    for (let j = 0; j < N; j++) { const y = -L / 2 + (j + 0.5) * dx; if (y < y0 || y > y1) continue; for (let i = 0; i < N; i++) { const x = -L / 2 + (i + 0.5) * dx; if (x >= x0 && x <= x1) t[j * N + i] = v; } }
  };
  LAYOUT.forEach(r => fill(r, 1));
  if (opc) { OPC_ADD.forEach(r => fill(r, 1)); OPC_CUT.forEach(r => fill(r, 0)); }
  return t;
}
// 部分相干（圆盘光源，式 5.31 的点源叠加）+ 离焦。返回 Float64Array 强度（N×N，行 = y）
export function aerial2D({ N = 128, L = 1280, lambda = 193, NA = 0.93, sigma = 0.5, zf = 0, opc = false }) {
  const t = rasterMask(N, L, opc);
  const Tr = Float64Array.from(t), Ti = new Float64Array(N * N);
  fft2(Tr, Ti, N);
  const fc = NA / lambda, df = 1 / L;
  const pts = [];
  if (sigma < 0.05) pts.push([0, 0]);
  else { const k = 3; for (let a = -k; a <= k; a++) for (let b = -k; b <= k; b++) { const sx = a / k * sigma, sy = b / k * sigma; if (sx * sx + sy * sy <= sigma * sigma + 1e-9) pts.push([sx, sy]); } }
  const I = new Float64Array(N * N), Er = new Float64Array(N * N), Ei = new Float64Array(N * N);
  const fidx = i => (i < N / 2 ? i : i - N) * df;
  for (const [sx, sy] of pts) {
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const fx = fidx(i) + sx * fc, fy = fidx(j) + sy * fc, f2 = fx * fx + fy * fy, k = j * N + i;
      if (f2 <= fc * fc) {
        const ph = 2 * Math.PI * zf / lambda * (Math.sqrt(Math.max(0, 1 - lambda * lambda * f2)) - 1), c = Math.cos(ph), s = Math.sin(ph);
        Er[k] = Tr[k] * c - Ti[k] * s; Ei[k] = Tr[k] * s + Ti[k] * c;
      } else { Er[k] = 0; Ei[k] = 0; }
    }
    fft2(Er, Ei, N, true);
    for (let k = 0; k < N * N; k++) I[k] += Er[k] * Er[k] + Ei[k] * Ei[k];
  }
  for (let k = 0; k < N * N; k++) I[k] /= pts.length;
  return { I, mask: t, nSrc: pts.length };
}

// ---------------- Fresnel 积分（查表）与近场狭缝像（式 5.32 的一维解） ----------------
let FT = null;
function fresnelTable() {
  if (FT) return FT;
  const h = 0.002, M = 25000, C = new Float64Array(M + 1), Sn = new Float64Array(M + 1);
  for (let i = 1; i <= M; i++) {
    const a = (i - 1) * h, b = i * h, m = (a + b) / 2;
    const f = u => Math.cos(Math.PI * u * u / 2), g = u => Math.sin(Math.PI * u * u / 2);
    C[i] = C[i - 1] + h / 6 * (f(a) + 4 * f(m) + f(b)); Sn[i] = Sn[i - 1] + h / 6 * (g(a) + 4 * g(m) + g(b));
  }
  FT = { h, M, C, Sn }; return FT;
}
export function fresnelCS(u) {
  const { h, M, C, Sn } = fresnelTable(), a = Math.abs(u), sg = Math.sign(u);
  if (a >= M * h) {   // 渐近式
    const t = Math.PI * a * a / 2;
    return [sg * (0.5 + Math.sin(t) / (Math.PI * a)), sg * (0.5 - Math.cos(t) / (Math.PI * a))];
  }
  const i = Math.floor(a / h), f = a / h - i;
  return [sg * (C[i] + f * (C[i + 1] - C[i])), sg * (Sn[i] + f * (Sn[i + 1] - Sn[i]))];
}
// 宽 W 的长狭缝、间隙 g、波长 λ（同一长度单位）：归一化强度（远离边缘的开阔区 = 1）
export function fresnelSlit(x, W, g, lambda) {
  const k = Math.sqrt(2 / (lambda * g)), [c1, s1] = fresnelCS(k * (-W / 2 - x)), [c2, s2] = fresnelCS(k * (W / 2 - x));
  return 0.5 * ((c2 - c1) ** 2 + (s2 - s1) ** 2);
}

// ---------------- Fraunhofer 图样（图 5.33） ----------------
export function besselJ1(x) {   // Numerical Recipes 多项式近似
  const ax = Math.abs(x);
  if (ax < 8) {
    const y = x * x;
    const a = x * (72362614232.0 + y * (-7895059235.0 + y * (242396853.1 + y * (-2972611.439 + y * (15704.48260 + y * (-30.16036606))))));
    const b = 144725228442.0 + y * (2300535178.0 + y * (18583304.74 + y * (99447.43394 + y * (376.9991397 + y))));
    return a / b;
  }
  const z = 8 / ax, y = z * z, xx = ax - 2.356194491;
  const a = 1 + y * (0.183105e-2 + y * (-0.3516396496e-4 + y * (0.2457520174e-5 + y * (-0.240337019e-6))));
  const b = 0.04687499995 + y * (-0.2002690873e-3 + y * (0.8449199096e-5 + y * (-0.88228987e-6 + y * 0.105787412e-6)));
  const ans = Math.sqrt(0.636619772 / ax) * (Math.cos(xx) * a - z * Math.sin(xx) * b);
  return x < 0 ? -ans : ans;
}
export const sinc = u => (Math.abs(u) < 1e-9 ? 1 : Math.sin(Math.PI * u) / (Math.PI * u));

// ---------------- 光刻胶：Dill 曝光 + 驻波（式 5.33–5.44 的一维、正入射版本） ----------------
// A,B [1/µm]，C [cm²/mJ]，D [µm]，lambda [nm]，nr 胶折射率（实部），ns 衬底复折射率，dose [mJ/cm²]
export function dillExpose({ A = 0.8, B = 0.05, C = 0.016, D = 0.5, lambda = 365, nr = 1.7, ns = cx(1.47), dose = 200, Nz = 240, Ne = 160, reflect = true }) {
  const z = Array.from({ length: Nz }, (_, i) => D * (i + 0.5) / Nz), dz = D / Nz;
  const m = new Float64Array(Nz).fill(1), I = new Float64Array(Nz);
  const n1 = nr, T12 = 1 - ((n1 - 1) / (n1 + 1)) ** 2;
  const rho = reflect ? cdiv(csub(cx(n1), ns), cadd(cx(n1), ns)) : cx(0);
  const k = 2 * Math.PI * n1 / (lambda / 1000);   // 1/µm
  const field = () => {
    const a = new Float64Array(Nz); let acc = 0;
    for (let i = 0; i < Nz; i++) { const al = A * m[i] + B; acc += al * dz / 2; a[i] = Math.exp(-acc / 2 * 1); acc += al * dz / 2; }
    // a[i] = exp(-½∫0^z α)（取中点）
    const aD = Math.exp(-0.5 * [...m].reduce((s, mi) => s + (A * mi + B) * dz, 0));
    for (let i = 0; i < Nz; i++) {
      const Ed = cscale(cexp(cx(0, -k * z[i])), a[i]);
      const Eu = cmul(rho, cscale(cexp(cx(0, -k * (2 * D - z[i]))), aD * aD / a[i]));
      I[i] = T12 * cabs2(cadd(Ed, Eu));
    }
  };
  const dE = dose / Ne;
  for (let s = 0; s < Ne; s++) { field(); for (let i = 0; i < Nz; i++) m[i] *= Math.exp(-C * I[i] * dE); }
  field();
  return { z, m: Array.from(m), I: Array.from(I), rho };
}
// PEB：高斯平滑（扩散长度 σ，式 5.53），两端反射边界
export function gaussSmooth(z, v, sig) {
  if (sig <= 1e-4) return v.slice();
  const n = v.length, dz = z[1] - z[0], out = new Array(n).fill(0), R = Math.ceil(4 * sig / dz);
  for (let i = 0; i < n; i++) {
    let s = 0, ws = 0;
    for (let d = -R; d <= R; d++) { let j = i + d; if (j < 0) j = -j - 1; if (j >= n) j = 2 * n - j - 1; if (j < 0 || j >= n) continue; const w = Math.exp(-0.5 * (d * dz / sig) ** 2); s += w * v[j]; ws += w; }
    out[i] = s / ws;
  }
  return out;
}
// Mack 显影模型（式 5.57），a 由阈值 m_th 定：a = (n+1)/(n−1)·(1−m_th)^n
export function mackRate(m, { Rmax = 100, Rmin = 0.1, n = 5, mth = 0.5 } = {}) {
  const a = (n + 1) / (n - 1) * Math.pow(1 - mth, n), q = Math.pow(1 - m, n);
  return Rmax * (a + 1) * q / (a + q) + Rmin;   // nm/s
}
// Dill 显影模型（式 5.56）
export function dillRate(m, E1, E2, E3) { return m > 0.4 ? Math.exp(E1 + E2 * m + E3 * m * m) : Math.exp(E1 + 0.4 * E2 + 0.16 * E3); }

// Dill 参数测量（图 5.49/5.50）：均匀照明、无反射，返回透过率 T(E)（以空气/胶界面透过率 T12 归一化后的"内透过率"）
export function dillTransmission({ A, B, C, D, nr = 1.68, Emax = 300, Ne = 300, Nz = 120 }) {
  const T12 = 1 - ((nr - 1) / (nr + 1)) ** 2, dz = D / Nz, m = new Float64Array(Nz).fill(1), dE = Emax / Ne;
  const Es = [0], Ts = [];
  const trans = () => { let acc = 0; for (let i = 0; i < Nz; i++) acc += (A * m[i] + B) * dz; return Math.exp(-acc); };
  Ts.push(trans());
  for (let s = 1; s <= Ne; s++) {
    // 每个子步：按当前吸收算 I(z)（入射进胶的光强为 T12），再更新 m
    let acc = 0;
    for (let i = 0; i < Nz; i++) { const al = A * m[i] + B; const Iz = T12 * Math.exp(-(acc + al * dz / 2)); acc += al * dz; m[i] *= Math.exp(-C * Iz * dE); }
    Es.push(s * dE); Ts.push(trans());
  }
  return { E: Es, T: Ts, T12 };
}

// ---------------- 多层膜反射（式 5.61–5.62，已勘误） ----------------
export function rho(ni, nj) { return cdiv(csub(ni, nj), cadd(ni, nj)); }
export function barcR({ n1, n2, n3, D, lambda }) {
  const r12 = rho(n1, n2), r23 = rho(n2, n3);
  const tau2 = cexp(cmul(cx(0, -4 * Math.PI * D / lambda), n2));   // τ_D² = exp(−j 4π n₂ D / λ)
  const num = cadd(r12, cmul(r23, tau2)), den = cadd(cx(1), cmul(cmul(r12, r23), tau2));
  return cabs2(cdiv(num, den));
}
