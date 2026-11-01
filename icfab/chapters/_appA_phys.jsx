// 附录 A 的数值工具（纯函数）：Table A1.1 材料参数、本征载流子浓度、电中性求解、迁移率、erf、Irvin 积分、SiO2 薄膜干涉色。
// 所有函数都在浏览器里实时计算；数值已在 /tmp 的 Python 脚本中与原书例题、表格逐项核对。

export const kB = 8.617e-5;          // eV/K（A.4）
export const q = 1.602e-19;          // C

// ---------- Table A1.1：EG(T) = a - b T^2/(T + c)，NC = nc T^1.5，NV = nv T^1.5 ----------
export const MATS = {
  Si: { a: 1.17, b: 4.73e-4, c: 636, nc: 6.2e15, nv: 3.5e15, niRT: 1.45e10, color: "#2c4a6e" },
  Ge: { a: 0.742, b: 4.8e-4, c: 235, nc: 1.98e15, nv: 9.6e14, niRT: 2.1e13, color: "#1f1b16" },
  GaAs: { a: 1.52, b: 5.41e-4, c: 204, nc: 8.63e13, nv: 1.83e15, niRT: 1.0e6, color: "#c0392b" },
  "4H-SiC": { a: 3.63, b: 6.5e-4, c: 1300, nc: 1.83e15, nv: 1.83e15, niRT: 1.6e-8, color: "#2c6e49" },
  GaN: { a: 3.47, b: 7.7e-4, c: 600, nc: 4.3e14, nv: 8.9e15, niRT: 3.3e-10, color: "#7d3c98" },
};
export const Eg = (m, T) => { const p = MATS[m]; return p.a - p.b * T * T / (T + p.c); };
export const NC = (m, T) => MATS[m].nc * Math.pow(T, 1.5);
export const NV = (m, T) => MATS[m].nv * Math.pow(T, 1.5);
export const ni = (m, T) => Math.sqrt(NC(m, T) * NV(m, T)) * Math.exp(-Eg(m, T) / (2 * kB * T));
// 式 (A1.12) 右端的硅近似式
export const niSi112 = T => Math.sqrt(1.52e33 * T * T * T * Math.exp(-1.21 / (kB * T)));

// ---------- 电中性求解（载流子用 Boltzmann，杂质电离用 (A1.15)）----------
// 未知量 E = EF - EV；方程 p + ND+ - n - NA- = 0 对 E 单调递减，二分求根。
// full=false 时假设杂质全部电离（ND+ = ND，NA- = NA）。
export function solveNeutral({ m = "Si", T, ND, NA, dED = 0.045, dEA = 0.045, gD = 2, gA = 4, full = true }) {
  const kT = kB * T, eg = Eg(m, T), nc = NC(m, T), nv = NV(m, T);
  const parts = E => {
    const n = nc * Math.exp(-(eg - E) / kT), p = nv * Math.exp(-E / kT);
    const NDp = full ? ND / (1 + gD * Math.exp((E - (eg - dED)) / kT)) : ND;
    const NAm = full ? NA / (1 + gA * Math.exp((dEA - E) / kT)) : NA;
    return { n, p, NDp, NAm };
  };
  const f = E => { const s = parts(E); return s.p + s.NDp - s.n - s.NAm; };
  let lo = -0.3, hi = eg + 0.3;
  for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (f(mid) > 0) lo = mid; else hi = mid; }
  const E = (lo + hi) / 2, s = parts(E);
  const Ei = eg / 2 + (kT / 2) * Math.log(nv / nc);      // 本征费米能级（相对 EV）
  return { ...s, EF: E, Eg: eg, Ei, kT, ni: ni(m, T), NC: nc, NV: nv };
}

// (A1.17)/(A1.18)：单一杂质的部分电离解析解
export const gammaN = (m, T, dED, gD = 2) => NC(m, T) / gD * Math.exp(-dED / (kB * T));
export const gammaP = (m, T, dEA, gA = 4) => NV(m, T) / gA * Math.exp(-dEA / (kB * T));
export const ionized = (N, g) => g / 2 * (Math.sqrt(1 + 4 * N / g) - 1);

// ---------- 迁移率（Masetti 1983 经验式，300 K）：用来画 A1.6 与 Irvin 曲线 ----------
export const muN = N => 52.2 + (1417 - 52.2) / (1 + Math.pow(N / 9.68e16, 0.68)) - 43.4 / (1 + Math.pow(3.43e20 / N, 2));   // As
export const muP = N => 44.9 * Math.exp(-9.23e16 / N) + 470.5 / (1 + Math.pow(N / 2.23e17, 0.719)) - 29.0 / (1 + Math.pow(6.1e20 / N, 2));   // B
export const rhoN = N => 1 / (q * N * muN(N));
export const rhoP = N => 1 / (q * N * muP(N));

// ---------- 误差函数（双精度级）----------
export function erf(x) {
  if (x < 0) return -erf(-x);
  if (x < 3) {               // Taylor 级数
    let s = 0, t = x, n = 0;
    while (Math.abs(t) > 1e-17 * Math.abs(s) || n < 3) { s += t / (2 * n + 1); n++; t *= -x * x / n; if (n > 200) break; }
    return 2 / Math.sqrt(Math.PI) * s;
  }
  return 1 - erfc(x);
}
export function erfc(x) {
  if (x < 3) return 1 - erf(x);
  // 连分式（Lentz）
  let f = x, C = x, D = 0;
  for (let i = 1; i < 200; i++) {
    const a = i / 2;
    D = x + a * D; D = 1 / D; C = x + a / C;
    const del = C * D; f *= del; if (Math.abs(del - 1) < 1e-16) break;
  }
  return Math.exp(-x * x) / (f * Math.sqrt(Math.PI));
}
export const erfcBook = x => 1.1 * Math.exp(-x * x) / (Math.abs(x) + Math.sqrt(x * x + 1.21));   // 原书 A.9 的近似（x >= 0）

// ---------- Irvin 曲线：平均电导率 sigma = (1/xj) * integral q mu(N+CB) (N-CB) dx ----------
// 以 u = x / (2 sqrt(Dt)) 为变量，结果与 Dt 无关。
export function irvinSigma(Cs, CB, type = "n", prof = "erfc", steps = 600) {
  if (Cs <= CB) return NaN;
  const mu = type === "n" ? muN : muP;
  const shape = prof === "erfc" ? erfc : (u => Math.exp(-u * u));
  let lo = 0, hi = 12;
  for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (Cs * shape(m) > CB) lo = m; else hi = m; }
  const uj = lo; let s = 0;
  for (let i = 0; i < steps; i++) { const u = (i + 0.5) / steps * uj, N = Cs * shape(u); s += q * mu(N + CB) * (N - CB); }
  return { sigma: s / steps, uj };
}

// ---------- SiO2 / Si 薄膜干涉色（正入射）----------
const g3 = (l, m, s1, s2) => { const s = l < m ? s1 : s2; return Math.exp(-0.5 * ((l - m) / s) ** 2); };
const cmf = l => [
  1.056 * g3(l, 599.8, 37.9, 31.0) + 0.362 * g3(l, 442.0, 16.0, 26.7) - 0.065 * g3(l, 501.1, 20.4, 26.2),
  0.821 * g3(l, 568.8, 46.9, 40.5) + 0.286 * g3(l, 530.9, 16.3, 31.1),
  1.217 * g3(l, 437.0, 11.8, 36.0) + 0.681 * g3(l, 459.0, 26.0, 13.8)];
const planck = (l, T = 6504) => { const x = l * 1e-9; return 1 / (x ** 5 * (Math.exp(1.4388e-2 / (x * T)) - 1)); };
// 硅的复折射率 n - ik（室温，近似取值，Green 2008 / Aspnes 数据的粗插值）
const SI_NK = [[380, 5.9, 0.6], [400, 5.57, 0.387], [420, 5.1, 0.22], [450, 4.67, 0.13], [500, 4.29, 0.07], [550, 4.08, 0.04], [600, 3.94, 0.02], [650, 3.85, 0.016], [700, 3.78, 0.01], [750, 3.73, 0.008], [780, 3.70, 0.006]];
const siNK = l => { for (let i = 0; i < SI_NK.length - 1; i++) { const a = SI_NK[i], b = SI_NK[i + 1]; if (l >= a[0] && l <= b[0]) { const t = (l - a[0]) / (b[0] - a[0]); return [a[1] + t * (b[1] - a[1]), a[2] + t * (b[2] - a[2])]; } } return SI_NK[SI_NK.length - 1].slice(1); };
export const nOx = l => { const u2 = (l / 1000) ** 2; return Math.sqrt(1 + 0.6961663 * u2 / (u2 - 0.0684043 ** 2) + 0.4079426 * u2 / (u2 - 0.1162414 ** 2) + 0.8974794 * u2 / (u2 - 9.896161 ** 2)); };
// 复数小工具
const cx = (re, im = 0) => ({ re, im });
const add = (a, b) => cx(a.re + b.re, a.im + b.im), sub = (a, b) => cx(a.re - b.re, a.im - b.im);
const mul = (a, b) => cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const div = (a, b) => { const d = b.re * b.re + b.im * b.im; return cx((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); };
export function reflectance(l, d) {
  const n1 = cx(nOx(l)), [ns, ks] = siNK(l), n2 = cx(ns, -ks), one = cx(1);
  const r01 = div(sub(one, n1), add(one, n1)), r12 = div(sub(n1, n2), add(n1, n2));
  const b = 4 * Math.PI * n1.re * d / l, ph = cx(Math.cos(b), -Math.sin(b));
  const r = div(add(r01, mul(r12, ph)), add(one, mul(mul(r01, r12), ph)));
  return r.re * r.re + r.im * r.im;
}
const gam = c => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
export function filmColor(d) {
  let X = 0, Y = 0, Z = 0, W = 0;
  for (let l = 380; l <= 780; l += 5) { const [x, y, z] = cmf(l), s = planck(l), r = reflectance(l, d); X += s * x * r; Y += s * y * r; Z += s * z * r; W += s * y; }
  X /= W; Y /= W; Z /= W;
  const rgb = [3.2406 * X - 1.5372 * Y - 0.4986 * Z, -0.9689 * X + 1.8758 * Y + 0.0415 * Z, 0.0557 * X - 0.2040 * Y + 1.0570 * Z].map(c => Math.max(0, c));
  const mx = Math.max(...rgb) || 1;
  const hex = "#" + rgb.map(c => Math.round(255 * Math.min(1, gam(c / mx * 0.9))).toString(16).padStart(2, "0")).join("");
  return { hex, Y };
}
// 干涉级次（计算定义）：每越过一次 550 nm 反射极小（2 n d = (m + 1/2) lambda）级次加 1
export const filmOrder = d => Math.max(1, Math.floor(2 * 1.46 * d / 550 + 0.5));

// 原书 A.7 色表（厚度 nm，英文色名，中文）
export const COLOR_CHART = [
  [50, "Tan", "棕褐"], [70, "Brown", "棕"], [100, "Dark violet to red-violet", "深紫至红紫"], [120, "Royal blue", "宝蓝"],
  [150, "Light blue to metallic blue", "浅蓝至金属蓝"], [170, "Metallic to light yellow-green", "金属色至浅黄绿"], [200, "Light gold or yellow", "浅金或黄"],
  [220, "Gold with slight yellow-orange", "金色略带黄橙"], [250, "Orange to mellon", "橙至瓜瓤色"], [270, "Red-violet", "红紫"], [300, "Blue to blue-violet", "蓝至蓝紫"],
  [310, "Blue", "蓝"], [320, "Blue to blue-green", "蓝至蓝绿"], [340, "Light green", "浅绿"], [350, "Green to yellow-green", "绿至黄绿"], [360, "Yellow-green", "黄绿"],
  [370, "Green-yellow", "绿黄"], [390, "Yellow", "黄"], [410, "Light orange", "浅橙"], [420, "Carnation pink", "康乃馨粉"], [440, "Violet-red", "紫红"],
  [460, "Red-violet", "红紫"], [470, "Violet", "紫"], [480, "Blue-violet", "蓝紫"], [490, "Blue", "蓝"], [500, "Blue-green", "蓝绿"], [520, "Green", "绿"],
  [540, "Yellow-green", "黄绿"], [560, "Green-yellow", "绿黄"], [570, "Yellow to \"yellowish\"", "黄至偏黄"], [580, "Light orange or yellow to pink", "浅橙或黄至粉"],
  [600, "Carnation pink", "康乃馨粉"], [630, "Violet-red", "紫红"], [680, "\"Bluish\"", "偏蓝"], [720, "Blue-green to green", "蓝绿至绿"], [770, "\"Yellowish\"", "偏黄"],
  [800, "Orange", "橙"], [820, "Salmon", "鲑肉色"], [850, "Light red-violet", "浅红紫"], [860, "Violet", "紫"], [890, "Blue", "蓝"], [920, "Blue-green", "蓝绿"],
  [950, "Dull yellow-green", "暗黄绿"], [970, "Yellow", "黄"], [990, "Orange", "橙"], [1000, "Carnation pink", "康乃馨粉"], [1020, "Violet-red", "紫红"],
  [1050, "Red-violet", "红紫"], [1060, "Violet", "紫"], [1070, "Blue-violet", "蓝紫"], [1100, "Green", "绿"], [1110, "Yellow-green", "黄绿"], [1120, "Green", "绿"],
  [1180, "Violet", "紫"], [1190, "Red-violet", "红紫"], [1210, "Violet-red", "紫红"], [1240, "Carnation pink to salmon", "康乃馨粉至鲑肉色"], [1250, "Orange", "橙"],
  [1280, "\"Yellowish\"", "偏黄"], [1320, "Sky blue to green-blue", "天蓝至绿蓝"], [1400, "Orange", "橙"], [1450, "Violet", "紫"], [1460, "Blue-violet", "蓝紫"], [1500, "Blue", "蓝"],
];

// 数字格式：科学计数 → TeX
export const sci = (v, d = 3) => {
  if (!Number.isFinite(v)) return "\\text{—}";
  if (v === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(v))), m = v / Math.pow(10, e);
  if (e >= -2 && e <= 3) return String(+v.toPrecision(d));
  return `${(+m.toPrecision(d)).toString()}\\times10^{${e}}`;
};
