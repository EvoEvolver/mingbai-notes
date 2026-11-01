// 第 11 章（下）数值模型：纯函数，供交互图与自检使用（已用 node 与原书数值核对，见各函数注释）。
// 单位约定见各函数；SI 常数如下。
export const Q = 1.602e-19, KB = 8.617e-5, H = 6.626e-34, M0 = 9.109e-31, EPS0 = 8.854e-12, FARADAY = 96485;
export const EPS_SI = 11.7 * EPS0;

// ---------- §11.4.1 金属–半导体接触 ----------
// 热电子发射：ρc = kT/(q J0)，J0 = R T² exp(−qφB/kT)。R 用 A cm⁻² K⁻²，返回 Ω cm²。
export function rhoThermionic(phiB, T = 300, R = 120) {
  const J0 = R * T * T * Math.exp(-phiB / (KB * T));
  return KB * T / J0;
}
// 耗尽区宽度 (11.12)：N 用 cm⁻³，返回 nm
export function depletionNm(phiB, N) {
  return Math.sqrt(2 * EPS_SI * phiB / (Q * N * 1e6)) * 1e9;
}
// 隧穿接触 (11.15)：H = (4π/h)√(ε_s m*)（SI；φB 以伏特计）。N 用 cm⁻³，vth 用 cm/s，返回 Ω cm²。
// 核对：m*=0.26m0、vth=1e7 cm/s 时，N=1e20、φB=0.3 V 给出 2.2e-8 Ω cm²；N=4.5e20、φB=0.3 V 给出 2.4e-9（与图 11.27 相符）。
export function Hconst(mr) { return 4 * Math.PI / H * Math.sqrt(EPS_SI * mr * M0); }
export function rhoTunnel(phiB, N, mr = 0.26, vth = 1e7) {
  const Hc = Hconst(mr), sN = Math.sqrt(N * 1e6), v = vth * 1e-2;
  const rho0 = 2 / (Q * v * Hc * sN);                // Ω m²
  return rho0 * Math.exp(Hc * phiB / sN) * 1e4;       // → Ω cm²
}

// ---------- §11.4.2 硅化物线性–抛物线生长 (11.16) ----------
// TiSi₂（Cea，表 11.5）：(100) Si 的 B，(111) Si 的 B/A；单位 µm²/min 与 µm/min。
export const B100 = T => 1.85e11 * Math.exp(-2.5 / (KB * T));
export const BA111 = T => 8.9e11 * Math.exp(-2.5 / (KB * T));
// 通用解：x = (A/2)[√(1+(t+τ)/(A²/4B)) − 1]；B 或 B/A 取 Infinity 时自动退化为线性 / 抛物线极限
export function dealGrove(t, B, BA, tau = 0) {
  if (!Number.isFinite(BA)) return Math.sqrt(B * (t + tau));
  if (!Number.isFinite(B)) return BA * (t + tau);
  const A = B / BA;
  return A / 2 * (Math.sqrt(1 + (t + tau) / (A * A / (4 * B))) - 1);
}
// 例：700 °C、0.5 min、(100) Si → B = 0.0218 µm²/min，x = 0.104 µm（原书 105 nm）

// ---------- §11.4.3 电镀 ----------
// 法拉第定律 (11.22) 换算成沉积速率：J 用 mA/cm²，返回 µm/min（Cu：A_W = 63.55，n = 2，密度 8.96 g/cm³）
export function plateRate(JmA, Aw = 63.55, n = 2, dens = 8.96) {
  const cmPerS = JmA * 1e-3 * Aw / (n * FARADAY * dens);
  return cmPerS * 1e4 * 60;
}

// ---------- §11.4.4 电迁移：Black 方程 (11.30) ----------
// 返回寿命之比 MTTF(J,T)/MTTF(J0,T0)
export function blackRatio(J, T, J0, T0, n, EA) {
  return Math.pow(J / J0, -n) * Math.exp(EA / KB * (1 / T - 1 / T0));
}

// ---------- §11.5 尺寸效应 (11.31) ----------
// ρ_eff = ρ0 [1 + λ·3(1−p)/(4d) + λ·3R/(2D(1−R))]；λ、d、D 同单位
export function rhoEff(rho0, lam, d, D, p, R) {
  return rho0 * (1 + lam * 3 * (1 - p) / (4 * d) + lam * 3 * R / (2 * D * (1 - R)));
}
// 计入阻挡层/衬垫：截面 w×(ar·w)，阻挡层厚 tb 覆盖两侧与底部；导体芯宽 w−2tb、高 ar·w−tb。
// 返回"线电阻 × 截面积"意义下的等效电阻率（与无阻挡层导线直接可比），µΩ cm。晶粒尺寸取芯宽。
export function lineRho(m, w, ar, tb, p, R) {
  const wc = w - 2 * tb, hc = ar * w - tb;
  if (wc <= 0.3 || hc <= 0.3) return NaN;
  const d = Math.min(wc, hc);
  return rhoEff(m.rho0, m.lam, d, wc, p, R) * (w * ar * w) / (wc * hc);
}
export const METALS = {
  Cu: { rho0: 1.67, lam: 39.3 }, Co: { rho0: 6.25, lam: 11.8 }, Ru: { rho0: 7.59, lam: 10.2 },
  Al: { rho0: 2.73, lam: 14.9 }, W: { rho0: 5.49, lam: 14.2 },
};
