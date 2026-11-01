// 第 5 章（上）交互图用到的光学与光刻胶数值函数（纯 JS，无 React 依赖，可用 node 单独测试）。
// 长度单位：除特别说明外，λ、W、g、x、p 统一用 µm；剂量用 mJ/cm²。

export const HC_EV_NM = 1239.84;                     // hc = 1239.84 eV·nm，式 (5.1) 的 1.2398 eV·µm
export const photonEnergy = lamNm => HC_EV_NM / lamNm;  // 光子能量 [eV]

// 光源预设：λ [nm]、可用 NA 范围、介质折射率 n（浸没式为水 1.44）
export const SOURCES = [
  { id: "g", name: "g 线（Hg 灯）", lam: 436, naMax: 0.6, n: 1, na: 0.35 },
  { id: "i", name: "i 线（Hg 灯）", lam: 365, naMax: 0.65, n: 1, na: 0.6 },
  { id: "krf", name: "KrF 准分子激光", lam: 248, naMax: 0.85, n: 1, na: 0.75 },
  { id: "arf", name: "ArF 准分子激光（干式）", lam: 193, naMax: 0.93, n: 1, na: 0.85 },
  { id: "arfi", name: "ArF 浸没式（水）", lam: 193, naMax: 1.35, n: 1.44, na: 1.35 },
  { id: "euv", name: "EUV（Sn 等离子体）", lam: 13.5, naMax: 0.55, n: 1, na: 0.33 },
];

// 历代代表性光刻机（典型值，用于在计算器中标点；k1 为该代量产时的大致水平）
export const GENERATIONS = [
  { year: 1985, src: "g", lam: 436, na: 0.35, k1: 0.8, node: "1 µm" },
  { year: 1991, src: "i", lam: 365, na: 0.45, k1: 0.65, node: "0.5 µm" },
  { year: 1995, src: "i", lam: 365, na: 0.6, k1: 0.6, node: "350 nm" },
  { year: 1997, src: "krf", lam: 248, na: 0.6, k1: 0.6, node: "250 nm" },
  { year: 1999, src: "krf", lam: 248, na: 0.7, k1: 0.5, node: "180 nm" },
  { year: 2001, src: "krf", lam: 248, na: 0.8, k1: 0.42, node: "130 nm" },
  { year: 2004, src: "arf", lam: 193, na: 0.85, k1: 0.4, node: "90 nm" },
  { year: 2007, src: "arfi", lam: 193, na: 1.2, k1: 0.35, node: "45 nm" },
  { year: 2010, src: "arfi", lam: 193, na: 1.35, k1: 0.28, node: "32/22 nm" },
  { year: 2019, src: "euv", lam: 13.5, na: 0.33, k1: 0.4, node: "7/5 nm" },
  { year: 2025, src: "euv", lam: 13.5, na: 0.55, k1: 0.4, node: "High-NA" },
];

// 式 (5.8)、(5.12)
export const resolution = (lam, NA, k1 = 0.61) => k1 * lam / NA;
export const dof = (lam, NA, k2 = 0.5) => k2 * lam / (NA * NA);

// Simpson 积分
export function simpson(f, a, b, n = 200) {
  if (n % 2) n++;
  const h = (b - a) / n; let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return s * h / 3;
}

// 一阶贝塞尔函数 J1(x) = (1/π)∫_0^π cos(τ − x sin τ) dτ（被积函数光滑周期，梯形/Simpson 指数收敛）
export function besselJ1(x) {
  const n = Math.max(48, 2 * Math.ceil(Math.abs(x)) + 32);
  return simpson(t => Math.cos(t - x * Math.sin(t)), 0, Math.PI, n) / Math.PI;
}
// Airy 强度 [2J1(v)/v]²，v = 2π·NA·r/λ；第一暗环 v = 3.8317（r = 0.61λ/NA）
export const airy = v => (Math.abs(v) < 1e-6 ? 1 : (2 * besselJ1(v) / v) ** 2);
export const AIRY_ZERO = 3.831706;

// Fresnel 积分 C(x)、S(x)（|x|≤3.5 用幂级数，其余用渐近展开；误差 < 1e-6）
export function fresnelCS(x) {
  const ax = Math.abs(x), sg = Math.sign(x) || 1;
  let C, S;
  if (ax <= 3.5) {
    const a = Math.PI / 2;
    C = 0; S = 0; let term = ax;          // term = (−1)^n (π/2)^{2n} x^{4n+1}/(2n)!
    let tC = ax, tS = a * ax ** 3;          // 两个级数各自的不含分母阶乘修正项
    // 直接累加：C = Σ (−1)^n (π/2)^{2n} x^{4n+1} / ((2n)!(4n+1))，S = Σ (−1)^n (π/2)^{2n+1} x^{4n+3} / ((2n+1)!(4n+3))
    let fC = 1, fS = 1;
    for (let n = 0; n < 60; n++) {
      if (n > 0) { tC *= -a * a * ax ** 4; fC *= (2 * n - 1) * (2 * n); tS *= -a * a * ax ** 4; fS *= (2 * n) * (2 * n + 1); }
      const dC = tC / (fC * (4 * n + 1)), dS = tS / (fS * (4 * n + 3));
      C += dC; S += dS;
      if (Math.abs(dC) < 1e-16 && Math.abs(dS) < 1e-16) break;
    }
    void term;
  } else {
    const z = Math.PI * ax * ax, u = 1 / (z * z);
    const f = (1 - 3 * u + 105 * u * u - 10395 * u * u * u) / (Math.PI * ax);
    const g = (1 - 15 * u + 945 * u * u - 135135 * u * u * u) / (Math.PI * Math.PI * ax ** 3);
    const s = Math.sin(z / 2), c = Math.cos(z / 2);
    C = 0.5 + f * s - g * c;
    S = 0.5 - f * c - g * s;
  }
  return [sg * C, sg * S];
}

// 近场（Fresnel）单缝衍射：宽 W 的缝，平面波照明，缝后距离 g 处的相对强度（无遮挡时 = 1）
export function fresnelSlit(x, W, g, lam) {
  const k = Math.sqrt(2 / (lam * g));
  const [c1, s1] = fresnelCS(k * (-W / 2 - x)), [c2, s2] = fresnelCS(k * (W / 2 - x));
  return 0.5 * ((c2 - c1) ** 2 + (s2 - s1) ** 2);
}

// 投影成像（相干、一维）：宽 W 的孤立透光缝经数值孔径 NA 的透镜成像（1:1 像方坐标）。
// 振幅 A(x) = ∫_{−fc}^{fc} W sinc(W f) e^{i2πfx} df，fc = NA/λ；强度归一到大面积透光 = 1。
export function coherentSlitImage(x, W, NA, lam) {
  const fc = NA / lam;
  const amp = simpson(f => {
    const s = Math.abs(f) < 1e-12 ? W : Math.sin(Math.PI * W * f) / (Math.PI * f);
    return s * Math.cos(2 * Math.PI * f * x);
  }, -fc, fc, 240);
  return amp * amp;
}

// 部分相干成像（Abbe 方法）：周期 p、占空比 duty 的一维线/空光栅，圆形光源 σ，离焦 z（µm，傍轴相位）。
// 返回 I(x) 的函数（一个周期内预先算好 nx 个点再插值）；强度以"大面积透光 = 1"归一。
export function gratingImage({ p, lam, NA, sigma = 0, z = 0, duty = 0.5, nx = 96, ns = 9 }) {
  const fc = NA / lam;
  const M = Math.ceil((2 * fc) * p) + 1;
  const orders = [];
  for (let m = -M; m <= M; m++) orders.push({ m, c: m === 0 ? duty : Math.sin(Math.PI * m * duty) / (Math.PI * m) });
  // 光源采样（单位圆内网格，σ = 0 时只取中心一点）
  const src = [];
  if (sigma <= 1e-6) src.push([0, 0]);
  else for (let i = -ns; i <= ns; i++) for (let j = -ns; j <= ns; j++) { const a = i / ns, b = j / ns; if (a * a + b * b <= 1) src.push([a * sigma * fc, b * sigma * fc]); }
  const xs = Array.from({ length: nx }, (_, i) => i * p / nx), I = new Float64Array(nx);
  for (const [sx, sy] of src) {
    const pass = orders.filter(o => (o.m / p + sx) ** 2 + sy ** 2 <= fc * fc + 1e-12);
    for (let i = 0; i < nx; i++) {
      let re = 0, im = 0;
      for (const o of pass) {
        const fx = o.m / p + sx, ph = 2 * Math.PI * (o.m / p) * xs[i] - Math.PI * lam * z * (fx * fx + sy * sy);
        re += o.c * Math.cos(ph); im += o.c * Math.sin(ph);
      }
      I[i] += re * re + im * im;
    }
  }
  for (let i = 0; i < nx; i++) I[i] /= src.length;
  const f = x => { const u = ((x % p) + p) % p / p * nx, i0 = Math.floor(u) % nx, t = u - Math.floor(u); return I[i0] * (1 - t) + I[(i0 + 1) % nx] * t; };
  let mx = -Infinity, mn = Infinity; for (const v of I) { mx = Math.max(mx, v); mn = Math.min(mn, v); }
  f.max = mx; f.min = mn; f.mtf = mx + mn > 0 ? (mx - mn) / (mx + mn) : 0;
  return f;
}
// 像的调制度（式 5.13）随周期变化
export const gratingMTF = (opts) => gratingImage({ ...opts, nx: 48, ns: opts.ns ?? 7 }).mtf;

// 光刻胶对比度曲线（式 5.15 的理想化折线）：正胶剩余厚度分数
export function remainingPositive(D, Q0, Qf) {
  if (D <= Q0) return 1; if (D >= Qf) return 0;
  return 1 - Math.log10(D / Q0) / Math.log10(Qf / Q0);
}
export const remainingNegative = (D, Q0, Qf) => 1 - remainingPositive(D, Q0, Qf);
export const gammaOf = (Q0, Qf) => 1 / Math.log10(Qf / Q0);
export const cmtf = gamma => { const r = Math.pow(10, 1 / gamma); return (r - 1) / (r + 1); };   // 式 (5.16)

// 化学放大示意模型（非原书模型，见正文说明）：
// DNQ：每个光子以量子效率 0.3 直接转化一个 PAC，转化分数 u = 1 − exp(−0.3 D/D1)
// CAR：光子以效率 η 产酸，酸浓度（相对保护基）a = η·ℓ·D/D1，扣除碱淬灭剂 q 后，每个酸在 PEB 中催化 N 次去保护：u = 1 − exp(−N·max(0, a − qℓ))
export const D1 = 15;    // mJ/cm²：每个 PAC/保护基平均吸收一个光子所需的剂量（示意标度）
export const dnqConv = D => 1 - Math.exp(-0.3 * D / D1);
export const carConv = (D, { N = 100, ell = 0.05, eta = 0.3, q = 0 } = {}) => 1 - Math.exp(-N * Math.max(0, eta * ell * D / D1 - q * ell));

// 电子束直写时间（式 5.2）：剂量 [µC/cm²]、面积 [cm²]、束流 [nA] → 秒
export const ebeamTime = (doseUC, areaCm2, currentNA) => doseUC * 1e-6 * areaCm2 / (currentNA * 1e-9);
