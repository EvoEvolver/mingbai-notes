// 第 8 章（下）数值模型：损伤与非晶化、SPE、{311} 溶解与 TED、退火热预算。
// 纯函数，无 JSX；参数全部来自原书（表 7.3、7.4、8.1，式 8.28/8.31/8.34/8.35/8.42–8.48 及例题），
// 例外处已注明（ZBL 普适核阻止、H 在 Si 中的射程、尖峰/闪光/激光的温度曲线形状）。
// 已用 node 与原书例题核对：Φ_c(As,100 keV)≈4.2e13、C_I^max/C_I^*=1.22e-2·exp(1.19/kT)、τ_enh(P,100 keV,5e13)=3.08e-15·exp(3.57/kT)。

export const KB = 8.617e-5;                 // eV/K
export const TK = c => c + 273.15;
export const N_SI = 5e22;                   // cm^-3
export const ED = 15;                       // 位移能 eV
export const E_CR = 5e23;                   // 非晶化临界能量密度 eV/cm^3（原书 [8.26]）

// ---------- 表 8.1：R_P、ΔR_P（nm），无定形 Si 衬底 ----------
const EN = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200];
const TAB = {
  P: { rp: [19.9, 34.2, 47.3, 59.8, 71.7, 83.3, 94.7, 105, 116, 127, 148, 169, 189, 210, 229], dr: [6.4, 12.5, 17.9, 22.9, 27.5, 31.7, 35.6, 39.3, 42.8, 46.1, 52.2, 57.9, 63.0, 67.8, 72.3] },
  As: { rp: [8.4, 15.6, 22.6, 29.4, 36.2, 42.9, 49.5, 56.1, 62.6, 69.2, 82.1, 95.0, 107, 120, 133], dr: [4.3, 7.5, 10.2, 12.8, 15.2, 17.6, 19.8, 22.0, 24.1, 26.1, 30.1, 33.9, 37.5, 41.1, 44.6] },
  Sb: { rp: [12.1, 21.9, 30.6, 38.5, 45.9, 52.8, 59.4, 65.6, 71.6, 77.3, 88.3, 98.5, 108, 117, 126], dr: [5.8, 10.0, 13.3, 16.2, 18.7, 20.9, 22.9, 24.8, 26.5, 28.0, 30.9, 33.4, 35.7, 37.8, 39.7] },
  B: { rp: [47.3, 82.6, 114, 143, 171, 198, 223, 248, 272, 296, 341, 385, 428, 469, 509], dr: [24.9, 38.4, 48.3, 56.2, 62.8, 68.5, 73.6, 78.0, 82.1, 85.7, 92.2, 97.8, 102, 107, 110] },
};
function lin(xs, ys, x) {
  if (x <= xs[0]) return ys[0] * x / xs[0];      // 10 keV 以下按比例外推
  for (let i = 1; i < xs.length; i++) if (x <= xs[i]) { const t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]); return ys[i - 1] + t * (ys[i] - ys[i - 1]); }
  return ys[ys.length - 1];
}
export const rangeNm = (ion, E) => ({ rp: lin(EN, TAB[ion].rp, E), dr: lin(EN, TAB[ion].dr, E) });

// ---------- 离子参数 ----------
export const IONS = {
  B: { Z: 5, m: 10.81, name: "B" }, P: { Z: 15, m: 30.97, name: "P" }, As: { Z: 33, m: 74.92, name: "As" }, Sb: { Z: 51, m: 121.76, name: "Sb" },
};
const Z2 = 14, M2 = 28.09;

// 核阻止：ZBL 普适势（原书式 8.28 为常数近似；这里用能量相关形式，以体现 B 的损伤集中在射程末端）
export function SnZBL(ion, EkeV) {
  const { Z, m } = IONS[ion], zz = Math.pow(Z, 0.23) + Math.pow(Z2, 0.23);
  const eps = 32.53 * M2 * EkeV / (Z * Z2 * (m + M2) * zz);
  const sn = eps <= 30 ? Math.log(1 + 1.1383 * eps) / (2 * (eps + 0.01321 * Math.pow(eps, 0.21226) + 0.19593 * Math.sqrt(eps))) : Math.log(eps) / (2 * eps);
  return 8.462e-15 * Z * Z2 * m * sn / ((m + M2) * zz);       // eV cm^2
}
// 原书式 8.28 的常数核阻止（eV cm^2）
export function SnConst(ion) {
  const { Z, m } = IONS[ion];
  return 2.8e-15 * Z * Z2 / Math.sqrt(Math.pow(Z, 2 / 3) + Math.pow(Z2, 2 / 3)) * m / (m + M2);
}
export const K_E = 0.2e-15;                                  // 式 8.31，eV^1/2 cm^2
export const SeLSS = EkeV => K_E * Math.sqrt(EkeV * 1e3);   // eV cm^2

// 连续慢化近似：返回沿路径的核能量沉积 [{s(cm), dEn(eV)}] 与总核能量损失
function slowDown(ion, E0) {
  const n = 400, out = []; let s = 0, En = 0;
  // 能量按对数步长从 E0 降到 0.01 keV
  const Emin = 0.01, r = Math.pow(Emin / E0, 1 / n);
  let E = E0;
  for (let i = 0; i < n; i++) {
    const E2 = E * r, Em = Math.sqrt(E * E2), dE = (E - E2) * 1e3;      // eV
    const sn = SnZBL(ion, Em), se = SeLSS(Em), ds = dE / (N_SI * (sn + se));
    s += ds; const den = dE * sn / (sn + se); En += den;
    out.push({ s: s - ds / 2, den }); E = E2;
  }
  // 余下 < 0.01 keV 全部计入核沉积
  En += Emin * 1e3; out.push({ s, den: Emin * 1e3 });
  return { pts: out, sEnd: s, En };
}

// 每个离子在深度 x(nm) 处沉积的核能量密度 ν(x)（eV/cm），x 网格 xs（nm）
export function damageProfile(ion, E0, xs) {
  const { rp, dr } = rangeNm(ion, E0), sd = slowDown(ion, E0);
  const nu = xs.map(() => 0);
  for (const { s, den } of sd.pts) {
    const f = s / sd.sEnd, mu = rp * f, sig = Math.max(dr * f, 1.0);
    const c = den / (Math.sqrt(2 * Math.PI) * sig * 1e-7);           // eV/cm
    for (let k = 0; k < xs.length; k++) {
      const x = xs[k];
      nu[k] += c * (Math.exp(-((x - mu) ** 2) / (2 * sig * sig)) + Math.exp(-((x + mu) ** 2) / (2 * sig * sig)));   // 表面反射
    }
  }
  return { nu, En: sd.En, rp, dr, nKP: sd.En / (2 * ED) };
}

// 非晶化：给定剂量 Φ，返回非晶区间（nm）与临界剂量
export function amorph(ion, E0, dose) {
  const { rp, dr } = rangeNm(ion, E0), xmax = rp + 5 * dr;
  const xs = Array.from({ length: 300 }, (_, i) => xmax * i / 299);
  const D = damageProfile(ion, E0, xs);
  const peak = Math.max(...D.nu), phiC = E_CR / peak;
  const segs = []; let a = null;
  xs.forEach((x, i) => {
    const am = dose * D.nu[i] >= E_CR;
    if (am && a === null) a = x;
    if ((!am || i === xs.length - 1) && a !== null) { segs.push([a, am ? x : xs[i - 1]]); a = null; }
  });
  return { xs, nu: D.nu, phiC, segs, En: D.En, nKP: D.nKP, rp, dr };
}

// ---------- 固相外延 (8.35) ----------
export const SPE_EA = 2.3;
export const SPE600 = { "100": 50, "110": 20, "111": 2 };        // nm/min @600 °C
export const speRate = (orient, Tc, boost = 1) => boost * SPE600[orient] * Math.exp(-SPE_EA / KB * (1 / TK(Tc) - 1 / TK(600)));
export const speA = orient => SPE600[orient] / Math.exp(-SPE_EA / (KB * TK(600)));   // 式 8.35 的 A（nm/min）

// ---------- 点缺陷与 TED（式 8.42–8.48 及例题参数） ----------
export const A_JUMP = 2.7e-8;          // cm
export const EB = 1.77, EM = 1.8, DI0 = 51, EF = 2.96, CI0 = 33e22;
export const D_SELF = T => 560 * Math.exp(-4.76 / (KB * TK(T)));
export const dI = T => DI0 * Math.exp(-EM / (KB * TK(T)));
export const CIstar = T => CI0 * Math.exp(-EF / (KB * TK(T)));
export const CImax = (T, Eb = EB) => Math.exp(-Eb / (KB * TK(T))) / (4 * Math.PI * A_JUMP ** 3);
export const supersat = (T, Eb = EB) => Math.exp((EF - Eb) / (KB * TK(T))) / (4 * Math.PI * A_JUMP ** 3 * CI0);
// τ_enh（s）：L 为扩散距离（cm），Q 为 +1 剂量（cm^-2）
export const tauEnh = (T, L, Q, Eb = EB) => 4 * Math.PI * A_JUMP ** 3 * L * Q / DI0 * Math.exp((Eb + EM) / (KB * TK(T)));
export const fluxI = (T, L, Eb = EB) => dI(T) * CImax(T, Eb) / L;      // cm^-2 s^-1

// 表 7.3（本征条件下各荷电态之和）与表 7.4
const DT = {
  B: [[0.05, 3.5], [0.95, 3.5]],
  P: [[3.85, 3.66], [4.44, 4.0], [44.2, 4.37]],
  As: [[0.011, 3.44], [31.0, 4.15]],
  Sb: [[0.214, 3.65], [15.0, 4.08]],
};
export const FI = { B: 1.0, P: 1.0, As: 0.4, Sb: 0.02 };
export const Dint = (ion, T) => DT[ion].reduce((s, [d0, ea]) => s + d0 * Math.exp(-ea / (KB * TK(T))), 0);
// TED 期间的有效扩散系数：间隙分量按 S 增强，空位分量按 1/S 抑制（I–V 局域平衡，见第 7 章）
export const Deff = (ion, T, S) => Dint(ion, T) * (FI[ion] * S + (1 - FI[ion]) / S);

export function erfc(x) {   // Numerical Recipes erfcc
  const z = Math.abs(x), t = 1 / (1 + 0.5 * z);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r;
}

// +1 源：低于阈值时 Q_eff = Q、L = R_P；非晶化时只计 a/c 界面以下的尾部，L 取 SPE 层深度
export function plusOne(ion, E, Q) {
  const am = amorph(ion, E, Q), { rp, dr } = am;
  if (!am.segs.length) return { Qeff: Q, L: rp * 1e-7, xac: null, rp, dr, phiC: am.phiC };
  const xac = am.segs[am.segs.length - 1][1];
  const frac = 0.5 * erfc((xac - rp) / (Math.SQRT2 * dr));
  return { Qeff: Q * frac, L: xac * 1e-7, xac, rp, dr, phiC: am.phiC };
}

// 退火后的分布：高斯 + 反射表面，σ^2 = ΔR_P^2 + 2Dt（x、σ 以 nm 计；返回 cm^-3）
export function gaussProfile(Q, rp, dr, Dt_cm2) {
  const s2 = dr * dr + 2 * Dt_cm2 * 1e14, s = Math.sqrt(s2);
  return x => Q / (Math.sqrt(2 * Math.PI) * s * 1e-7) * (Math.exp(-((x - rp) ** 2) / (2 * s2)) + Math.exp(-((x + rp) ** 2) / (2 * s2)));
}

// ---------- 退火热预算 ----------
// 每个方案返回时间网格 ts（s）与 T（°C）
function seg(arr, t0, t1, n, f) { for (let i = (arr.length ? 1 : 0); i <= n; i++) { const t = t0 + (t1 - t0) * i / n; arr.push([t, f(t)]); } return t1; }
export const RECIPES = {
  furnace: { name: "炉退火", Tp: 900, hold: 1800, holdLabel: "保温时间 (s)", holdRange: [60, 7200], TpRange: [700, 1100] },
  rta: { name: "RTA", Tp: 1000, hold: 10, holdLabel: "保温时间 (s)", holdRange: [0.5, 60], TpRange: [900, 1150] },
  spike: { name: "尖峰退火", Tp: 1050, hold: 250, holdLabel: "升温速率 (°C/s)", holdRange: [50, 400], TpRange: [950, 1150] },
  flash: { name: "闪光退火", Tp: 1300, hold: 1, holdLabel: "闪光脉宽 FWHM (ms)", holdRange: [0.3, 20], TpRange: [1100, 1400] },
  laser: { name: "激光退火（拓展）", Tp: 1350, hold: 0.4, holdLabel: "驻留时间 FWHM (ms)", holdRange: [0.1, 3], TpRange: [1100, 1400] },
};
export function recipeCurve(key, Tp, hold) {
  const P = [];
  if (key === "furnace") {
    const up = (Tp - 600) / (10 / 60), dn = (Tp - 600) / (5 / 60);
    let t = seg(P, 0, up, 200, t => 600 + 10 / 60 * t);
    t = seg(P, t, t + hold, 50, () => Tp);
    seg(P, t, t + dn, 200, s => Tp - 5 / 60 * (s - t));
  } else if (key === "rta") {
    const up = (Tp - 400) / 100, dn = (Tp - 400) / 50;
    let t = seg(P, 0, up, 300, t => 400 + 100 * t);
    t = seg(P, t, t + hold, 50, () => Tp);
    seg(P, t, t + dn, 300, s => Tp - 50 * (s - t));
  } else if (key === "spike") {
    const r = hold, up = (Tp - 600) / r, dn = (Tp - 600) / 120;
    let t = seg(P, 0, up, 400, t => 600 + r * t);
    seg(P, t, t + dn, 400, s => Tp - 120 * (s - t));
  } else if (key === "flash") {
    const Ti = 800, w = hold * 1e-3, up = (Ti - 400) / 150;
    let t = seg(P, 0, up, 200, t => 400 + 150 * t);
    t = seg(P, t, t + 1, 50, () => Ti);                       // 中间温度稳定 1 s
    const t0 = t, sh = s => { const u = (s - t0) / w; return u < 0 ? 0 : Math.pow(u / 0.6, 2) * Math.exp(2 * (1 - u / 0.6)); };   // 峰在 0.6w
    t = seg(P, t, t + 12 * w, 1200, s => Ti + (Tp - Ti) * sh(s));
    seg(P, t, t + (Ti - 400) / 100, 200, s => Ti - 100 * (s - t));
  } else if (key === "laser") {
    const w = hold * 1e-3, sg = w / 2.3548, tc = 6 * sg;
    seg(P, 0, 12 * sg, 1200, s => 400 + (Tp - 400) * Math.exp(-((s - tc) ** 2) / (2 * sg * sg)));
  }
  return P;
}
// 沿温度曲线积分：常规 Dt、含 TED 的 Dt、{311} 剩余比例、Arrhenius 等效时间
export function anneal(P, ion, L, Q) {
  let Dn = 0, Dted = 0, q = Q, teff = 0, Tp = -1e9;
  for (const [, T] of P) Tp = Math.max(Tp, T);
  const Ea = 3.5, kp = Math.exp(-Ea / (KB * TK(Tp)));
  for (let i = 1; i < P.length; i++) {
    const dt = P[i][0] - P[i - 1][0], T = (P[i][1] + P[i - 1][1]) / 2;
    if (dt <= 0) continue;
    const D = Dint(ion, T); Dn += D * dt; teff += Math.exp(-Ea / (KB * TK(T))) / kp * dt;
    if (q > 0 && T > 400) {
      const S = supersat(T), F = fluxI(T, L), tq = Math.min(dt, q / F);
      Dted += Deff(ion, T, S) * tq + D * (dt - tq); q -= F * tq;
    } else Dted += D * dt;
  }
  return { Dn, Dted, left: Math.max(q, 0) / Q, teff, Tp };
}

// ---------- Smart Cut：H⁺ 在 Si 中的投影射程（µm，SRIM 量级的近似值，非原书数据） ----------
const HE = [10, 20, 40, 60, 80, 100, 150, 200], HR = [0.13, 0.22, 0.40, 0.56, 0.72, 0.86, 1.25, 1.62];
export const hRange = E => lin(HE, HR, E);

// 格式化
export const sci = (v, d = 2) => { if (!Number.isFinite(v)) return "—"; if (v === 0) return "0"; const e = Math.floor(Math.log10(Math.abs(v))); const m = v / 10 ** e; return Math.abs(e) <= 2 ? (+v.toPrecision(d + 1)).toString() : `${m.toFixed(d)}\\times10^{${e}}`; };
export const fmtTime = s => s < 1e-3 ? `${(s * 1e6).toPrecision(3)}\\,\\mathrm{\\mu s}` : s < 1 ? `${(s * 1e3).toPrecision(3)}\\,\\mathrm{ms}` : s < 120 ? `${s.toPrecision(3)}\\,\\mathrm{s}` : s < 7200 ? `${(s / 60).toPrecision(3)}\\,\\mathrm{min}` : s < 86400 * 3 ? `${(s / 3600).toPrecision(3)}\\,\\mathrm{h}` : `${(s / 86400).toPrecision(3)}\\,\\text{天}`;
