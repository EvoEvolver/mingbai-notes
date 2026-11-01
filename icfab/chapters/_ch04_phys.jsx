// 第 4 章数值函数（纯 JS，无 React）。已用 node 与原书数值核对（见文件末尾注释）。
export const kB = 8.617e-5;                 // eV/K
export const K = c => c + 273.15;            // °C → K
export const ln10 = Math.LN10;

// ---------- 误差函数（Abramowitz–Stegun 7.1.26 的高精度版本：W. J. Cody 有理逼近的简化，|误差| < 1.2e-7） ----------
export function erfc(x) {
  const z = Math.abs(x), t = 1 / (1 + 0.5 * z);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
    t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r;
}
export const erf = x => 1 - erfc(x);
export const Phi = x => 0.5 * erfc(-x / Math.SQRT2);           // 标准正态累积分布

// ---------- 洁净室：式 (4.3) ----------
export const isoCount = (N, Dum) => Math.pow(10, N) * Math.pow(0.1 / Dum, 2.08);   // 每 m^3 中 ≥D 的颗粒数
// 表 4.2 原书数据（每 m^3），null 表示原书未给出；ISO 5 的 ≥0.2 µm 原书印作 23.7×10^4，此处已按式 (4.3) 改为 2.37×10^4
export const ISO_SIZES = [0.1, 0.2, 0.3, 0.5, 1, 5];
export const ISO_TABLE = {
  1: [10, 2, null, null, null, null],
  2: [100, 24, 10, 4, null, null],
  3: [1e3, 237, 102, 35, 8, null],
  4: [1e4, 2370, 1020, 352, 83, null],
  5: [1e5, 2.37e4, 1.02e4, 3520, 832, 29],
  6: [1e6, 2.37e5, 1.02e5, 3.52e4, 8320, 293],
  7: [null, null, null, 3.52e5, 8.32e4, 2930],
  8: [null, null, null, 3.52e6, 8.32e5, 2.93e4],
  9: [null, null, null, 3.52e7, 8.32e6, 2.93e5],
};

// ---------- 扩散系数 ----------
// 图 4.16 读图拟合：log10 D = a + b·(1000/T)，两端点取自原书图（0.65 与 1.0 或图框下沿处）
const fit = (u1, y1, u2, y2) => { const b = (y2 - y1) / (u2 - u1); return { a: y1 - b * u1, b }; };
export const SPECIES = {
  Cu: { ...fit(0.65, -3.75, 1.0, -4.50), label: R0`\mathrm{Cu}`, color: "#b8862b", metal: true },
  AuI: { ...fit(0.65, -4.91, 1.0, -5.60), label: R0`\mathrm{Au_I}`, color: "#c0392b", metal: true },
  Fe: { ...fit(0.65, -5.13, 1.0, -6.35), label: R0`\mathrm{Fe}`, color: "#d35400", metal: true },
  Cr: { ...fit(0.65, -5.35, 1.0, -7.07), label: R0`\mathrm{Cr}`, color: "#e67e22", metal: true },
  AuS: { ...fit(0.65, -9.28, 1.0, -12.96), label: R0`\mathrm{Au_S}`, color: "#7d3c98" },
  Ti: { ...fit(0.65, -9.67, 1.0, -12.35), label: R0`\mathrm{Ti}`, color: "#16808a" },
  BP: { ...fit(0.65, -11.52, 0.905, -16), label: R0`\mathrm{B,\ P}`, color: "#2c4a6e" },
  As: { ...fit(0.65, -12.27, 0.843, -16), label: R0`\mathrm{As}`, color: "#2c6e49" },
  Si: { ...fit(0.65, -12.96, 0.783, -16), label: R0`\mathrm{Si}`, color: "#1f1b16" },
};
function R0(s) { return String.raw(s); }
export const Dfig = (sp, TK) => { const s = SPECIES[sp]; return Math.pow(10, s.a + s.b * 1000 / TK); };
export const EAfig = sp => -SPECIES[sp].b * ln10 * kB * 1000;            // 拟合得到的激活能 (eV)
export const DI = TK => 600 * Math.exp(-2.44 / (kB * TK));               // 式 (3.6)，cm^2/s
export const DOi = TK => 0.13 * Math.exp(-2.53 / (kB * TK));             // 式 (4.11)
export const CsO = TK => 5.5e20 * Math.exp(-0.89 / (kB * TK));           // 式 (4.10)
export const PPMA = 5e22 / 1e6;                                          // 1 ppma 对应的体浓度（Si 原子密度 5×10^22 cm^-3）

// 洁净区：表面保持 C*，体内初值 C0 的余误差函数外扩散；返回 C(x)，x 单位 µm，t 单位 s
export const outdiff = (C0, Cs, D, t, xum) => Cs + (C0 - Cs) * erf(xum * 1e-4 / (2 * Math.sqrt(D * t)));
// 洁净区深度：C 降到阈值 Cth 的位置（µm）；若阈值低于 Cs 则整个区域都低于阈值以下 → 返回 Infinity；阈值高于 C0 → 0
export function dzDepth(C0, Cs, D, t, Cth) {
  if (Cth <= Cs) return Infinity; if (Cth >= C0) return 0;
  const target = (Cth - Cs) / (C0 - Cs);       // erf(z) = target
  let lo = 0, hi = 6; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (erf(m) < target) lo = m; else hi = m; }
  return (lo + hi) / 2 * 2 * Math.sqrt(D * t) * 1e4;
}

// 背面吸杂：x=0 处为理想陷阱（C=0），x=L 处（正面）无流，初值均匀 C0。分离变量的级数解
export function sinkProfile(C0, D, t, Lum, xum) {
  const L = Lum * 1e-4, x = xum * 1e-4; let s = 0;
  for (let n = 1; n < 400; n += 2) {
    const k = n * Math.PI / (2 * L), e = Math.exp(-k * k * D * t);
    if (e < 1e-12 && n > 3) break;
    s += 4 / (n * Math.PI) * Math.sin(k * x) * e;
  }
  return C0 * s;
}

// ---------- 良率模型 ----------
export const yPoisson = (A, D) => Math.exp(-A * D);                       // (4.20)
export const yNB = (A, D, C) => Math.pow(1 + A * D / C, -C);              // (4.22)
export const ySeeds = (A, D) => 1 / (1 + A * D);                          // (4.23)
export const yMurphy = (A, D) => { const x = A * D; return x < 1e-9 ? 1 : Math.pow((1 - Math.exp(-x)) / x, 2); };   // Murphy 三角分布（拓展，原书未列）

// ---------- 随机数（可复现） ----------
export function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
export function gauss(r) { let u = 0, v = 0; while (u === 0) u = r(); v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
export function gammaS(k, r) {          // Marsaglia–Tsang，形状 k、尺度 1
  if (k < 1) return gammaS(k + 1, r) * Math.pow(r(), 1 / k);
  const d = k - 1 / 3, c = 1 / Math.sqrt(9 * d);
  for (;;) { let x, v; do { x = gauss(r); v = 1 + c * x; } while (v <= 0); v = v * v * v; const u = r();
    if (u < 1 - 0.0331 * x ** 4 || Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v; }
}
export function poissonS(lam, r) {
  if (lam > 60) return Math.max(0, Math.round(lam + Math.sqrt(lam) * gauss(r)));
  const L = Math.exp(-lam); let k = 0, p = 1; do { k++; p *= r(); } while (p > L); return k - 1;
}

// ---------- SRH ----------
export const tauSRH = (sigma, vth, Nt) => 1 / (sigma * vth * Nt);         // (4.2)/(4.16)
export const niSi = TK => 5.29e19 * Math.pow(TK / 300, 2.54) * Math.exp(-6726 / TK);   // Misiakos–Tsamakis 拟合，300 K 时约 9.7x10^9 cm^-3

/* 核对（node）：
   isoCount(5,0.5)=3522 ~ 表中 3,520；isoCount(5,0.2)=2.37e4（原书印 23.7x10^4）；isoCount(1,0.2)=2.37 ~ 2
   CsO(1690 K)=1.22e18（原书 1.2x10^18）；CsO(1273 K)=1.65e17（原书"约 1x10^17"）
   yPoisson(10,0.5)=0.0067, yNB(10,0.5,2)=0.082, yNB(10,0.5,10)=0.017, ySeeds(10,0.5)=0.167 —— 与图 4.23 上图右端一致
   EAfig: Cu 0.42 eV, Fe 0.69 eV, B/P 3.5 eV, Si 4.5 eV —— 与文献值相符，说明读图拟合可靠 */
