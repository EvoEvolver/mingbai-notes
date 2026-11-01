// 第 3 章数值模型（纯函数，供交互图使用；已用 node 与原书图 3.9/3.10/3.22/3.24/3.25 及正文数值核对）。
export const kB = 8.617e-5;                 // eV/K
export const NSI = 5e22;                    // Si 原子密度 cm^-3
export const C2K = c => c + 273.15;
export const kT = TK => kB * TK;

// ---- 本征载流子浓度（附录 A 式 A1.12：n_i^2 ≈ 1.52e33 T^3 exp(-1.21 eV/kT)）----
export const ni = TK => Math.sqrt(1.52e33 * TK ** 3 * Math.exp(-1.21 / kT(TK)));

// ---- 中性点缺陷平衡浓度与扩散率（式 3.4–3.7）----
export const CI0 = TK => 5e22 * Math.exp(-2.36 / kT(TK));
export const CV0 = TK => 2.31e21 * Math.exp(-1.08 / kT(TK));
export const DI = TK => 600 * Math.exp(-2.44 / kT(TK));
export const DV = TK => 13 * Math.exp(-2.92 / kT(TK));

// ---- 带电空位（式 3.11–3.13）；能级相对 E_i（eV），默认值按图 3.11 的示意位置估读 ----
export const VLEV = { m: 0.19, mm: 0.42, p: 0.29 };   // E_{V-}-E_i, E_{V=}-E_i, E_i-E_{V+}
// 净掺杂 N（>0 为 N 型，<0 为 P 型）时的 n、p（完全电离、电中性）
export function carriers(N, TK) {
  const n_i = ni(TK), h = Math.abs(N) / 2, maj = h + Math.sqrt(h * h + n_i * n_i), min = n_i * n_i / maj;
  return N >= 0 ? { n: maj, p: min, ni: n_i } : { n: min, p: maj, ni: n_i };
}
export function vacancies(N, TK, lev = VLEV) {
  const { n, p, ni: n_i } = carriers(N, TK), t = kT(TK), c0 = CV0(TK);
  const r = n / n_i, s = p / n_i;
  const m = r * c0 * Math.exp(-lev.m / t);                                    // (3.11)
  const pl = s * c0 * Math.exp(-lev.p / t);                                   // (3.12)
  const mm = r * r * c0 * Math.exp(-lev.m / t) * Math.exp(-lev.mm / t);       // (3.13)
  return { V0: c0, Vp: pl, Vm: m, Vmm: mm, tot: c0 + pl + m + mm, n, p, ni: n_i, EF: t * Math.log(r) };
}

// ---- 热应力（式 3.2）σ = α Y ΔT ----
export const SI_ALPHA = 2.6e-6, SI_Y = 1.6e12;  // 1/K；dyn/cm^2（≈160 GPa）

// ---- CZ 最大拉速（式 3.14），cgs 单位换算到 cm/h ----
// L 潜热 J/g，N 密度 g/cm^3，σ W cm^-2 K^-4，ε 发射率，kM W/(cm K)，TM K，r cm
export function vPmax({ L = 1787, N = 2.33, eps = 0.55, kM = 0.22, TM = 1690, r }) {
  const sigma = 5.67e-12;
  return Math.sqrt(2 * sigma * eps * kM * TM ** 5 / (3 * r)) / (L * N) * 3600;   // cm/h
}

// ---- CZ 分凝（式 3.22）----
export const czCs = (k, f) => k * Math.pow(1 - f, k - 1);
export const SEG = [   // 表 3.1
  ["As", 0.3], ["Bi", 7e-4], ["C", 0.07], ["Li", 1e-2], ["O", 0.5], ["P", 0.35], ["Sb", 0.023], ["Al", 2.8e-3], ["Ga", 8e-3], ["B", 0.8], ["Au", 2.5e-5],
];

// ---- 区熔单次通过（式 3.25）----
export const fz1 = (k, xL) => 1 - (1 - k) * Math.exp(-k * xL);

// ---- 区熔多次通过：棒长 R 个熔区长度，每个熔区长度分 M 格；末端最后一个熔区按正常凝固（式 3.22 的形式）凝固 ----
export function fzMulti(k, passes, R = 30, M = 40) {
  const n = Math.round(R * M), dx = 1 / M;          // 长度以 L 为单位
  let c = new Float64Array(n).fill(1);
  const out = [];
  for (let p = 0; p < passes; p++) {
    const s = new Float64Array(n);
    let I = 0; for (let j = 0; j < M; j++) I += c[j] * dx;   // 熔区内杂质量（单位 C_O·L）
    const a = Math.exp(-k * dx);
    for (let j = 0; j + M < n; j++) {
      const cin = c[j + M], Iinf = cin / k;                    // 边走边熔入右侧 c[j+M]
      const I2 = Iinf + (I - Iinf) * a;                        // dI/dx = cin − k I（L=1）的精确解
      s[j] = (I - I2 + cin * dx) / dx;                         // 这一格冻结进固体的杂质量 / dx
      I = I2;
    }
    // 最后一个熔区：正常凝固，C_S = k C_L0 (1-g)^(k-1)，按格平均
    const CL0 = I;                                            // 熔区长 1，故 C_L0 = I
    for (let j = n - M; j < n; j++) {
      const g0 = (j - (n - M)) / M, g1 = g0 + dx;
      s[j] = CL0 * ((1 - g0) ** k - Math.max(1 - g1, 0) ** k) / dx;   // ∫ k C_L0 (1-g)^(k-1) dg / dx
    }
    out.push(s); c = s;
  }
  return { profiles: out, dx, n };
}
// 线性插值读取剖面
export const sample = (arr, dx, x) => { const u = x / dx - 0.5, i = Math.max(0, Math.min(arr.length - 2, Math.floor(u))), t = Math.min(1, Math.max(0, u - i)); return arr[i] * (1 - t) + arr[i + 1] * t; };

// ---- 光子波长（式 3.1）λ[nm] = 1239.84 / E_G[eV] ----
export const lambdaNm = Eg => 1239.84 / Eg;

// ---- 晶格常数（Å）与面密度 ----
export const LATT = { Si: 5.431, GaAs: 5.653, Ge: 5.658 };
// 金刚石结构单个原子面上的面密度（cm^-2）
export function planeDensity(a_ang) {
  const a = a_ang * 1e-8, a2 = a * a;
  return { "100": 2 / a2, "110": 4 / (Math.SQRT2 * a2), "111": 4 / (Math.sqrt(3) * a2) };
}
