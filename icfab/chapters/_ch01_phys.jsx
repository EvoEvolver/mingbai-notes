// 第 1 章数据与数值模型（交互图共用）。
// 节点数据：由原书图 1.17 / 1.21 的数据点位置读出（年份精度约 ±0.3 年）；表 1.1 取自原书。
// 处理器晶体管数：原书文字给出的数值 + 公开的 Rupp 微处理器数据集中的代表性芯片（原书图 1.19 的数据来源）。

// 图 1.17（1975–2002，"理想缩放"时期）
export const NODES_117 = [
  [1974.5, 3000], [1977.6, 2000], [1980.4, 1500], [1983.5, 1000], [1986.4, 800], [1989.4, 500],
  [1992.4, 350], [1995.1, 250], [1997.7, 180], [2000.0, 130], [2002.2, 90],
];
// 图 1.21（1990–2021 已量产；之后为预期）
export const NODES_121 = [
  [1990.0, 500], [1992.9, 350], [1996.2, 250], [1998.2, 180], [2000.5, 130], [2002.6, 90], [2004.7, 65],
  [2006.9, 45], [2009.0, 32], [2011.3, 22], [2014.1, 14], [2016.5, 10], [2018.8, 7], [2020.9, 5],
];
export const NODES_121_FUTURE = [[2023.9, 3], [2027.3, 2], [2030.8, 1.4]];

// 图 1.21 中"实际印刷的最小特征尺寸"带（nm）。2004 年以前与节点名大致重合；之后按图上带的上下沿对数线性插值。
export function featureBand(t) {
  if (t < 2004) return null;
  const lerp = (a, b, ta, tb) => Math.exp(Math.log(a) + (Math.log(b) - Math.log(a)) * (t - ta) / (tb - ta));
  return { hi: lerp(80, 22, 2007, 2038), lo: lerp(44, 5.7, 2007, 2036) };
}

// 表 1.1（2003 版 ITRS）
export const ITRS = {
  year: [2000, 2002, 2004, 2007, 2010, 2013, 2016, 2018],
  node: [180, 130, 90, 65, 45, 32, 22, 14],
  gate: [100, 70, 53, 35, 25, 18, 13, 10],
  dram: [0.512, 1, 4, 16, 32, 64, 128, 256],
  mpu: [null, null, 550, 1100, 2200, 4400, 8800, 14000],   // 单位 10^6
  vdd: [[1.5, 1.8], [1.2, 1.5], [0.9, 1.2], [0.8, 1.1], [0.7, 1.0], [0.6, 0.9], [0.5, 0.8], [0.5, 0.7]],
};

// 代表性微处理器 / SoC 的晶体管数（公开数据）
export const CHIPS = [
  [1971, 2300, "4004"], [1974, 4500, "8080"], [1978, 29000, "8086"], [1982, 134000, "80286"], [1985, 275000, "80386"],
  [1989, 1.18e6, "80486"], [1993, 3.1e6, "Pentium"], [1997, 7.5e6, "Pentium II"], [2000, 4.2e7, "Pentium 4"],
  [2006, 2.91e8, "Core 2 Duo"], [2010, 1.17e9, "Core i7 (Westmere-EP)"], [2014, 2.6e9, "Xeon Haswell-EP"],
  [2020, 1.6e10, "Apple M1"], [2021, 5.7e10, "Apple M1 Max"], [2022, 2.0e10, "Apple M2"], [2023, 6.7e10, "Apple M2 Max"],
];

// ---------------- MOSFET 的 I–V（图 1.18 的交互模型） ----------------
export const K_B = 8.617e-5;          // eV/K
export const thermalV = T => K_B * T; // kT/q，单位 V
// 平滑插值模型：亚阈区 I = I_s e^{(V−V_TH)/(nφ_t)}；阈上过渡为 ∝ (V−V_TH)（短沟道）并含迁移率退化/串联电阻因子 θ。
//   I(V) = I_s · u / (1 + θ u)，u = ln(1 + e^{(V−V_TH)/(nφ_t)})
// 默认参数取自原书图 1.18：I_OFF = 3.5×10⁻¹⁰ A（V_G = 0），V_TH ≈ 0.45 V 处 I ≈ 10⁻⁴ A，V_DD = 1 V 处 I_ON ≈ 1.2×10⁻³ A。
export const THETA = 0.062;
export function idsModel(V, { n, Vth, T, Is }) {
  const x = (V - Vth) / (n * thermalV(T));
  const u = x > 40 ? x : Math.log1p(Math.exp(x));
  return Is * u / (1 + THETA * u);
}
// 由"V_TH 处电流 = I_th"反求 I_s
export const IsFromIth = Ith => Ith * (1 + THETA * Math.LN2) / Math.LN2;
export const swing = (n, T) => n * thermalV(T) * Math.LN10;          // V/decade，式 (1.1)

// ---------------- 恒定电场（Dennard）与广义缩放 ----------------
// 尺寸缩小 κ 倍，电压缩小 α 倍。model："long"（长沟道，I ∝ (W/L)C_ox V²）或 "vsat"（速度饱和，I ∝ W C_ox v_sat V）。
// 返回各量相对原值的倍数。
export function scaling(k, a, model = "long") {
  const dim = 1 / k, V = 1 / a, Cox = k, E = k / a;
  const I = model === "long" ? (1 * Cox * V * V) : (dim * Cox * V);   // W/L 不变 ；W·C_ox·v_sat·V
  const C = Cox * dim * dim;             // ε A / t_ox
  const tau = C * V / I, P = V * I, Pd = P / (dim * dim);
  return { dim, V, NA: k * k / a, E, I, C, tau, P, Pd, density: k * k };
}

// ---------------- MOS 电容的静电（图 1.12 交互） ----------------
export const EPS0 = 8.854e-14, Q = 1.602e-19, NI = 1.0e10, EPS_SI = 11.7 * EPS0, EPS_OX = 3.9 * EPS0;
// 平带电压按 N⁺ 多晶硅栅、无氧化层电荷估算：V_FB = φ_ms = −(E_g/2q + φ_F)，E_g/2q ≈ 0.56 V。
export function mosState({ VG, NA, tox_nm, T = 300 }) {
  const phit = thermalV(T), phiF = phit * Math.log(NA / NI), Cox = EPS_OX / (tox_nm * 1e-7), VFB = -(0.56 + phiF);
  const gamma = Math.sqrt(2 * Q * EPS_SI * NA) / Cox;
  const Vth = VFB + 2 * phiF + gamma * Math.sqrt(2 * phiF);
  const Vx = VG - VFB;
  let psi, regime;
  if (Vx <= 0) { psi = 0; regime = "acc"; }
  else {
    const r = (-gamma + Math.sqrt(gamma * gamma + 4 * Vx)) / 2; psi = Math.min(r * r, 2 * phiF);
    regime = VG >= Vth ? "inv" : "dep";
  }
  const Wdep = Math.sqrt(2 * EPS_SI * psi / (Q * NA));           // cm
  const Qinv = VG > Vth ? Cox * (VG - Vth) : 0;                    // C/cm²
  const Qacc = Vx < 0 ? Cox * (-Vx) : 0;
  return { VFB, phiF, Cox, gamma, Vth, psi, regime, Wdep_nm: Wdep * 1e7, ninv: Qinv / Q, pacc: Qacc / Q };
}
