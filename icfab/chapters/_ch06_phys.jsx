// 第 6 章数值模型（纯函数，无 React）。全部在浏览器里真算；数值已用 node 与原书图 6.10、6.11、6.36 及文中数值核对。
// 单位约定：厚度 µm，时间 min（SiC 部分为 h），温度 °C 输入、内部换成 K，能量 eV。

export const KB = 8.617e-5;                       // 玻尔兹曼常数 eV/K
export const TK = Tc => Tc + 273.15;

// ---------------- Deal–Grove：表 6-1（(111) 硅，1 atm，µm/min 与 µm²/min） ----------------
export const DG_TABLE = {
  dry: { C2: 1.04e5, E2: 2.0, C1: 12.87, E1: 1.23, Cstar: 5e16, N1: 2.2e22},
  wet: { C2: 2.95e6, E2: 2.05, C1: 7.0, E1: 0.78, Cstar: 3e19, N1: 4.4e22},
};
// 晶向因子：(B/A)_hkl = (B/A)_111 / ORI[hkl]。依 (B/A)_111 : (B/A)_110 : (B/A)_100 = 1.68 : 1.4 : 1（见式 6.20 勘误）
export const ORI = { "111": 1, "110": 1.68 / 1.4, "100": 1.68 };

// 掺杂增强：式 (6.21)。V*/V_i* 由第 3 章的荷电空位统计（式 3.11–3.13 的结构）计算；
// 能级位置取文献常用值（E_V+ = E_v+0.13，E_V− = E_c−0.44，E_V= = E_c−0.11 eV，按禁带宽度随温度等比缩放）——原书本章未给出，仅作演示。
export function egSi(T) { return 1.17 - 4.73e-4 * T * T / (T + 636); }          // Si 禁带 eV（Varshni）
export function niSi(T) { return 3.9e16 * Math.pow(T, 1.5) * Math.exp(-0.605 / (KB * T)); }   // 本征载流子浓度 cm^-3（常用经验式）
export function vacancyRatio(nOverNi, T) {
  const s = egSi(T) / 1.12, kT = KB * T;
  const Cp = Math.exp(-0.43 * s / kT);              // V⁺：E_V+ − E_i = −0.43 s
  const Cm = Math.exp(-0.12 * s / kT);              // V⁻：E_V− − E_i = +0.12 s
  const Cmm = Math.exp(-(0.12 + 0.45) * s / kT);    // V⁼：E_V− + E_V= − 2E_i
  const r = nOverNi;
  return (1 + Cp / r + Cm * r + Cmm * r * r) / (1 + Cp + Cm + Cmm);
}
export const dopingFactor = (vRatio, T) => 1 + 2.6e3 * Math.exp(-1.1 / (KB * T)) * (vRatio - 1);   // 式 (6.21) 的乘数
// 由施主浓度求 n/n_i（完全电离、电中性）
export function nOverNi(Nd, T) { const ni = niSi(T); const n = Nd / 2 + Math.sqrt(Nd * Nd / 4 + ni * ni); return n / ni; }

// 求 B、B/A（µm²/min，µm/min）
// opts: { amb:"dry"|"wet", Tc, ori:"100"|"110"|"111", P(atm)=1, n(干氧压强指数)=0.75, dopeV(=V*/V_i*)=1 }
export function dgParams({ amb = "dry", Tc = 1000, ori = "100", P = 1, n = 0.75, dopeV = 1 }) {
  const t = DG_TABLE[amb], T = TK(Tc), kT = KB * T;
  let B = t.C1 * Math.exp(-t.E1 / kT) * P;
  let BA = t.C2 * Math.exp(-t.E2 / kT) / ORI[ori] * (amb === "wet" ? P : Math.pow(P, n));
  BA *= dopingFactor(dopeV, T);
  return { B, BA, A: B / BA };
}
// 式 (6.10)、(6.11)
export const tauOf = (xi, { B, A }) => (xi * xi + A * xi) / B;
export const xDG = (t, { B, A }, tau = 0) => A / 2 * (Math.sqrt(1 + (t + tau) / (A * A / (4 * B))) - 1);
// 生长速率 (6.8)
export const rateDG = (x, { B, A }) => B / (2 * x + A);

// Massoud 薄氧化层修正：式 (6.15)–(6.16)，C° = 6.5e6 µm/min，E_A = 2.37 eV，L = 7 nm
export const MASSOUD = { C0: 6.5e6, EA: 2.37, L: 0.007 };
export const massoudC = Tc => MASSOUD.C0 * Math.exp(-MASSOUD.EA / (KB * TK(Tc)));
// 数值积分 dx/dt = B/(2x+A) + C exp(-x/L)，返回在 ts（升序，min）上的厚度（µm）
export function xMassoud(ts, p, Tc, x0 = 0) {
  const C = massoudC(Tc), f = x => p.B / (2 * x + p.A) + C * Math.exp(-x / MASSOUD.L);
  const out = []; let x = x0, t = 0;
  for (const tt of ts) {
    const nstep = Math.max(1, Math.ceil((tt - t) / Math.max(0.05, (tt - t) / 200)));
    const h = (tt - t) / nstep;
    for (let i = 0; i < nstep; i++) {
      const k1 = f(x), k2 = f(x + h * k1 / 2), k3 = f(x + h * k2 / 2), k4 = f(x + h * k3);
      x += h / 6 * (k1 + 2 * k2 + 2 * k3 + k4);
    }
    t = tt; out.push(x);
  }
  return out;
}

// 由 B、B/A 反推物理量：扩散系数 D（cm²/s）与界面反应速率常数 k_s（cm/s）
export function dgMicro(amb, p) {
  const t = DG_TABLE[amb];
  const D = p.B * 1e-8 / 60 * t.N1 / (2 * t.Cstar);      // B = 2DC*/N1
  const ks = p.BA * 1e-4 / 60 * t.N1 / t.Cstar;          // B/A = k_s C*/N1
  return { D, ks };
}

// 硅消耗比：x_Si/x_ox = N_SiO2/N_Si
export const N_SI = 5.0e22, N_SIO2 = 2.2e22, CONSUME = N_SIO2 / N_SI;   // 0.44

// ---------------- 碳化硅：表 6.3（单位应为 µm/h、µm²/h，见勘误） ----------------
export const SIC_TABLE = {
  C: { C2: 5.91e2, E2: 1.01, C1: 7.68e4, E1: 1.87, label: "C 面 (000-1)" },
  Si: { C2: 2.39e3, E2: 1.34, C1: 1.08e6, E1: 2.67, label: "Si 面 (0001)" },
};
export function sicParams(face, Tc) {
  const t = SIC_TABLE[face], kT = KB * TK(Tc);
  const BA = t.C2 * Math.exp(-t.E2 / kT), B = t.C1 * Math.exp(-t.E1 / kT);
  return { B, BA, A: B / BA };
}
// 图 6.36 中读出的实验点（t[h], x[µm]），仅作对照
export const SIC_DATA = {
  C: { 1150: [[0.25, 0.032], [0.5, 0.052], [1, 0.089], [2, 0.142], [4, 0.220], [6, 0.278]], 1100: [[0.25, 0.025], [0.5, 0.040], [1, 0.066], [2, 0.102], [4, 0.166], [6, 0.210]], 1050: [[0.25, 0.019], [0.5, 0.028], [1, 0.058], [2, 0.080], [4, 0.124], [6, 0.159]] },
  Si: { 1150: [[0.25, 0.0067], [0.5, 0.0093], [1, 0.016], [2, 0.021], [4, 0.0368], [6, 0.0437]], 1100: [[0.25, 0.0048], [0.5, 0.0065], [1, 0.016], [2, 0.017], [4, 0.0243], [6, 0.0268]], 1050: [[0.25, 0.0033], [0.5, 0.0040], [1, 0.0060], [2, 0.0085], [4, 0.014], [6, 0.0152]] },
};

// ---------------- MOS 电容 C–V（N 型衬底，300 K） ----------------
const Q = 1.602e-19, EPS0 = 8.854e-14, ES = 11.7 * EPS0, EOX = 3.9 * EPS0, VT = 0.02585, NI300 = 1.0e10;
export const MOS = { Q, EPS0, ES, EOX, VT, NI: NI300 };
// D_it 的 U 形能量分布（E 以禁带中央为零点，eV）：中央 Dmid，带边约 10 倍
const DW = 0.1, DEDGE = 0.5, DK = 9 / (Math.cosh(DEDGE / DW) - 1);
export const ditOf = (E, Dmid) => Dmid * (1 + DK * (Math.cosh(E / DW) - 1));
const ditInt = (s, Dmid) => Dmid * (s + DK * (DW * Math.sinh(s / DW) - s));   // ∫_0^s D_it dE（带符号）

// 参数：tox(nm) ND(cm⁻³) Qf(cm⁻²) phiMS(V) Dmid(cm⁻²eV⁻¹) Qm(cm⁻²) xm(可动电荷质心离栅的相对位置 0..1)
export function mosSetup({ tox = 50, ND = 1e16, Qf = 0, phiMS = 0, Dmid = 0, Qm = 0, xm = 1 }) {
  const Cox = EOX / (tox * 1e-7), LD = Math.sqrt(ES * VT / (Q * ND)), r = (NI300 / ND) ** 2;
  const phiF = VT * Math.log(ND / NI300);
  const VFB = phiMS - Q * Qf / Cox - Q * Qm * xm / Cox;
  const K = Math.SQRT2 * ES * VT / LD;
  const Fu = u => Math.sqrt(Math.max(0, Math.expm1(u) - u + r * (Math.expm1(-u) + u)));
  const Gu = u => Math.sqrt(Math.max(0, Math.expm1(u) - u));
  const Qs = u => -Math.sign(u) * K * Fu(u);                     // 半导体电荷 C/cm²（含少子）
  const Qmaj = u => -Math.sign(u) * K * Gu(u);                    // 只含多子与电离施主
  const Cs = u => Math.abs(u) < 1e-5 ? ES / LD : Math.SQRT2 * ES / LD * Math.abs(Math.expm1(u) - r * Math.expm1(-u)) / (2 * Fu(u));
  const Cmaj = u => Math.abs(u) < 1e-5 ? ES / LD : Math.SQRT2 * ES / LD * Math.abs(Math.expm1(u)) / (2 * Gu(u));
  const Qit = psi => -Q * ditInt(phiF + psi, Dmid);              // 界面陷阱电荷（中性能级在禁带中央）
  const Cit = psi => Q * ditOf(phiF + psi, Dmid);
  const ser = (a, b) => 1 / (1 / a + 1 / b);
  return { Cox, LD, phiF, VFB, Qs, Qmaj, Cs, Cmaj, Qit, Cit, ser, ND, tox };
}
// 返回 { hf:[[V,C/Cox]], lf, dd, VTH, Cmin, xdmax }
export function mosCV(par, { vmin = -6, vmax = 4 } = {}) {
  const m = mosSetup(par), hf = [], lf = [], dd = [];
  const uInv = -(2 * m.phiF / VT) - 10, uAcc = 14;
  for (let i = 0; i <= 500; i++) {
    const u = uAcc + (uInv - uAcc) * i / 500, psi = u * VT;
    const V = m.VFB + psi - (m.Qs(u) + m.Qit(psi)) / m.Cox;
    if (V < vmin - 1 || V > vmax + 1) continue;
    hf.push([V, m.ser(m.Cox, m.Cmaj(u)) / m.Cox]);
    lf.push([V, m.ser(m.Cox, m.Cs(u) + m.Cit(psi)) / m.Cox]);
  }
  // 深耗尽：少子来不及产生，只有耗尽电荷平衡栅电荷
  const u0 = -(2 * m.phiF / VT);
  for (let i = 0; i <= 300; i++) {
    const psi = u0 * VT - 40 * i / 300, u = psi / VT;
    const V = m.VFB + psi - (m.Qmaj(u) + m.Qit(Math.max(psi, -2 * m.phiF))) / m.Cox;
    if (V < vmin - 1) break;
    dd.push([V, m.ser(m.Cox, m.Cmaj(u)) / m.Cox]);
  }
  const xdmax = Math.sqrt(2 * ES * 2 * m.phiF / (Q * m.ND));
  const VTH = m.VFB - 2 * m.phiF - (m.Qs(u0) + m.Qit(-2 * m.phiF)) / m.Cox;
  const Cmin = m.ser(m.Cox, ES / xdmax) / m.Cox;
  return { hf: hf.sort((a, b) => a[0] - b[0]), lf: lf.sort((a, b) => a[0] - b[0]), dd, VTH, Cmin, xdmax, ...m };
}

// ---------------- 氧化层干涉色（正入射，空气/SiO$_2$/Si） ----------------
const SI_NK = [[380, 6.0, 0.9], [400, 5.57, 0.387], [450, 4.67, 0.14], [500, 4.30, 0.073], [550, 4.08, 0.04], [600, 3.94, 0.025], [650, 3.84, 0.016], [700, 3.78, 0.011], [750, 3.73, 0.008], [780, 3.71, 0.007]];
function siNK(l) {
  for (let i = 1; i < SI_NK.length; i++) if (l <= SI_NK[i][0]) { const [a, n0, k0] = SI_NK[i - 1], [b, n1, k1] = SI_NK[i], t = (l - a) / (b - a); return [n0 + t * (n1 - n0), k0 + t * (k1 - k0)]; }
  return SI_NK[SI_NK.length - 1].slice(1);
}
export const nOx = l => 1.4485 + 3.5e3 / (l * l);           // Cauchy 色散（l 以 nm 计）
// 反射率 R(λ, d)，d 以 nm 计
export function reflect(l, d) {
  const [n2, k2] = siNK(l), n1 = nOx(l);
  // 复数运算：用 [re, im]
  const c = (a, b) => [a, b], add = (x, y) => [x[0] + y[0], x[1] + y[1]], mul = (x, y) => [x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]];
  const div = (x, y) => { const d2 = y[0] * y[0] + y[1] * y[1]; return [(x[0] * y[0] + x[1] * y[1]) / d2, (x[1] * y[0] - x[0] * y[1]) / d2]; };
  const N2 = c(n2, -k2), N1 = c(n1, 0);
  const r01 = (1 - n1) / (1 + n1), r12 = div(add(N1, [-N2[0], -N2[1]]), add(N1, N2));
  const dl = 2 * Math.PI * n1 * d / l, ph = c(Math.cos(2 * dl), -Math.sin(2 * dl));
  const num = add(c(r01, 0), mul(r12, ph)), den = add(c(1, 0), mul(c(r01, 0), mul(r12, ph)));
  const r = div(num, den); return r[0] * r[0] + r[1] * r[1];
}
const g = (l, m, s1, s2) => { const t = (l - m) / (l < m ? s1 : s2); return Math.exp(-0.5 * t * t); };
const cmf = l => [1.056 * g(l, 599.8, 37.9, 31.0) + 0.362 * g(l, 442.0, 16.0, 26.7) - 0.065 * g(l, 501.1, 20.4, 26.2),
  0.821 * g(l, 568.8, 46.9, 40.5) + 0.286 * g(l, 530.9, 16.3, 31.1),
  1.217 * g(l, 437.0, 11.8, 36.0) + 0.681 * g(l, 459.0, 26.0, 13.8)];
const planck = (l, T = 6500) => { const x = l * 1e-9; return 1 / (x ** 5 * (Math.exp(1.4388e-2 / (x * T)) - 1)); };
const ILL = []; let ILLY = 0;
for (let l = 380; l <= 780; l += 5) { const s = planck(l), c = cmf(l); ILL.push([l, s, c]); ILLY += s * c[1]; }
const gam = v => { v = Math.max(0, Math.min(1, v)); return Math.round(255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055)); };
// 返回 sRGB 颜色字符串；gain 把裸硅（约 35% 反射）提亮到可辨认的亮度
export function oxideColor(d, gain = 1.9) {
  let X = 0, Y = 0, Z = 0;
  for (const [l, s, c] of ILL) { const R = reflect(l, d); X += R * s * c[0]; Y += R * s * c[1]; Z += R * s * c[2]; }
  X *= gain / ILLY; Y *= gain / ILLY; Z *= gain / ILLY;
  const r = 3.2406 * X - 1.5372 * Y - 0.4986 * Z, gg = -0.9689 * X + 1.8758 * Y + 0.0415 * Z, b = 0.0557 * X - 0.2040 * Y + 1.0570 * Z;
  return `rgb(${gam(r)},${gam(gg)},${gam(b)})`;
}
// 原书图 6.24（及附录 A7 开头）的颜色表：厚度 nm → 颜色描述
export const COLOR_TABLE = [
  [50, "棕褐（tan）"], [70, "棕色（brown）"], [100, "深紫到红紫（dark violet to red violet）"], [120, "宝蓝（royal blue）"],
  [150, "浅蓝到金属蓝（light blue to metallic blue）"], [170, "金属色到很浅的黄绿（metallic to very light yellow-green）"],
  [200, "浅金或黄，略带金属光泽（light gold or yellow）"], [220, "金色带黄橙（gold with slight yellow orange）"], [250, "橙到瓜瓤色（orange to melon）"],
];
