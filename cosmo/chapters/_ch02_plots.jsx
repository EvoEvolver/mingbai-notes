// 第 2 章交互图。所有数值函数见 _ch02_phys.jsx（已用 node 与原书图 2.3 / 2.5 / 2.8 及文中数值核对）。
import { Plot } from "@kit";
import * as C from "./_ch02_phys.jsx";

const R = String.raw;
const f2 = (v, d = 2) => (+v).toFixed(d);

// 在一次 series 计算内缓存 χ(z)，三条距离曲线共用
function chiCache(p) {
  const m = new Map();
  return z => { let v = m.get(z); if (v === undefined) { v = C.chi(z, p, 160); m.set(z, v); } return v; };
}

// ---------- 1. 图 2.3 交互版：χ、d_A、d_L ----------
export function DistancePlot() {
  return <Plot
    x={{ label: R`z`, log: true, domain: [0.04, 10] }}
    y={{ label: R`\text{距离}\ [h^{-1}\,\mathrm{Mpc}]`, log: true, domain: [50, 1.2e5] }}
    params={[
      { id: "Om", label: R`\Omega_{\rm m}`, min: 0.05, max: 1, step: 0.01, value: 0.3 },
      { id: "OL", label: R`\Omega_{\rm DE}`, min: 0, max: 1.2, step: 0.01, value: 0.7 },
      { id: "w", label: R`w`, min: -1.5, max: -0.3, step: 0.01, value: -1 },
    ]}
    series={p => {
      const q = { Om: p.Om, OL: p.OL, w: p.w }, OK = 1 - p.Om - p.OL, ch = chiCache(q);
      const S = z => C.transverse(ch(z), q);
      const eds = z => 2 * C.HUBBLE_DIST * (1 - 1 / Math.sqrt(1 + z));
      return [
        { label: R`\chi`, f: z => ch(z) },
        { label: R`d_A`, f: z => S(z) / (1 + z), dash: "dash" },
        { label: R`d_L`, f: z => S(z) * (1 + z), dash: "dashdot", color: "#2c6e49" },
        { label: R`\chi\ (\Omega_{\rm m}=1)`, f: eds, dash: "dot", color: "#999", width: 1.5 },
        { label: R`\Omega_{\rm K}=${f2(OK)}`, f: () => NaN },
      ];
    }}
    vlines={p => {
      const q = { Om: p.Om, OL: p.OL, w: p.w };
      let best = 0, zb = 0;
      for (let z = 0.2; z < 10; z *= 1.03) { const v = C.dA(z, q); if (v > best) { best = v; zb = z; } }
      return zb < 9.5 ? [{ x: zb, label: R`d_A^{\max}\approx${Math.round(best)}` }] : [];
    }}
    samples={160} />;
}

// ---------- 2. 各成分能量密度随 a 的演化 ----------
export function DensityPlot() {
  return <Plot
    x={{ label: R`\text{标度因子}\ a`, log: true, domain: [1e-7, 10] }}
    y={{ label: R`\rho_s(a)/\rho_{\rm cr}`, log: true, domain: [1e-6, 1e24] }}
    params={[
      { id: "Om", label: R`\Omega_{\rm m}`, min: 0.1, max: 0.6, step: 0.005, value: 0.31 },
      { id: "h", label: R`h`, min: 0.5, max: 0.9, step: 0.01, value: 0.68 },
      { id: "mnu", label: R`m_{\nu_3}\,[\mathrm{eV}]`, min: 0.001, max: 1, log: true, value: 0.06 },
      { id: "w", label: R`w_{\rm DE}`, min: -1.5, max: -0.5, step: 0.01, value: -1 },
    ]}
    series={p => {
      const h2 = p.h * p.h, Og = C.OMG_H2 / h2, Ob = 0.0224 / h2;
      const nu1 = a => Og / a ** 4 * C.nuRatio(p.mnu * a / C.TNU0_EV);      // 有质量的一代
      const nu0 = a => 2 * C.NU_PLATEAU * Og / a ** 4;                       // 两代无质量
      const Onu = nu1(1) + nu0(1), ODE = 1 - p.Om - Og - Onu;
      return [
        { label: R`\gamma`, f: a => Og / a ** 4, color: "#c0392b", dash: "dash" },
        { label: R`\nu\ (3\ \text{代})`, f: a => nu1(a) + nu0(a), color: "#b8862b", dash: "dash" },
        { label: R`\text{重子 b}`, f: a => Ob / a ** 3, color: "#2c4a6e", dash: "dot" },
        { label: R`\text{暗物质 c}`, f: a => (p.Om - Ob) / a ** 3, color: "#1f1b16" },
        { label: R`\text{暗能量}\ (\Omega_{\rm DE}=${f2(ODE, 3)})`, f: a => ODE * Math.pow(a, -3 * (1 + p.w)), color: "#2c6e49", dash: "dashdot" },
      ];
    }}
    vlines={p => {
      const h2 = p.h * p.h, Or = C.OMR_H2 / h2, Og = C.OMG_H2 / h2;
      const Onu = Og / 1 * C.nuRatio(p.mnu / C.TNU0_EV) + 2 * C.NU_PLATEAU * Og, ODE = 1 - p.Om - Og - Onu;
      const aeq = Or / p.Om, aL = Math.pow(p.Om / ODE, -1 / (3 * p.w));
      return [{ x: aeq, label: R`a_{\rm eq}=${(aeq * 1e4).toFixed(2)}\times10^{-4}` }, { x: aL, label: R`a_{{\rm m}\Lambda}=${f2(aL)}` }];
    }}
    samples={220} />;
}

// ---------- 3. 图 2.8 交互版：ȧ = H(z)/(1+z) ----------
// 数据点：Riess et al. (2019) H0 = 74.03 ± 1.42；BOSS DR12 共识值（Alam et al. 2017）H(z)·(r_d/r_d^fid)，r_d^fid = 147.78 Mpc
const BOSS = [[0.38, 81.5, 1.9], [0.51, 90.4, 1.9], [0.61, 97.3, 2.1]].map(([z, H, e]) => [z, H / (1 + z), e / (1 + z)]);
export function AdotPlot() {
  return <Plot
    x={{ label: R`z`, domain: [0, 2.5] }}
    y={{ label: R`H(z)/(1+z)\ [\mathrm{km\,s^{-1}\,Mpc^{-1}}]`, domain: [50, 95] }}
    params={[
      { id: "H0", label: R`H_0`, min: 60, max: 80, step: 0.1, value: 67.7 },
      { id: "Om", label: R`\Omega_{\rm m}`, min: 0.05, max: 1, step: 0.01, value: 0.31 },
      { id: "w", label: R`w`, min: -1.5, max: -0.33, step: 0.01, value: -1 },
    ]}
    series={p => {
      const q = { Om: p.Om, OL: 1 - p.Om, w: p.w };
      const t0 = C.age(1, q, p.H0), q0 = p.Om / 2 + (1 + 3 * p.w) / 2 * (1 - p.Om);
      return [
        { label: R`\dot a\ \ (t_0=${f2(t0)}\,\mathrm{Gyr},\ q_0=${f2(q0)})`, f: z => p.H0 * C.Ez(z, q) / (1 + z) },
        { label: R`\Omega_{\rm m}=1`, f: z => p.H0 * Math.sqrt(1 + z), dash: "dot", color: "#999" },
        { label: R`\text{BOSS DR12}`, data: BOSS.map(([z, v]) => [z, v]), err: BOSS, points: true, color: "#c0392b" },
        { label: R`\text{Riess+2019}`, data: [[0.01, 74.03]], err: [[0.01, 74.03, 1.42]], points: true, color: "#2c4a6e" },
      ];
    }}
    vlines={p => {
      const q = { Om: p.Om, OL: 1 - p.Om, w: p.w }, zm = C.golden(z => C.Ez(z, q) / (1 + z), 0, 5);
      return zm > 1e-3 && zm < 2.5 ? [{ x: zm, label: R`z_{\rm acc}=${f2(zm)}` }] : [];
    }}
    samples={200} />;
}

// ---------- 4. 图 2.5 交互版：ρ_νi/ρ_γ ----------
export function NeutrinoPlot() {
  return <Plot
    x={{ label: R`m_{\nu_i}/T_\nu`, log: true, domain: [0.03, 1e4] }}
    y={{ label: R`\rho_{\nu_i}/\rho_\gamma`, log: true, domain: [0.1, 1e3] }}
    params={[{ id: "m", label: R`m_{\nu_i}\,[\mathrm{eV}]`, min: 0.001, max: 2, log: true, value: 0.1 }]}
    series={() => [
      { label: R`\text{数值积分（式 2.83/2.75）}`, f: x => C.nuRatio(x) },
      { label: R`\tfrac78\left(\tfrac4{11}\right)^{4/3}=0.227`, f: () => C.NU_PLATEAU, dash: "dot", color: "#999" },
      { label: R`m_{\nu_i} n_{\nu_i}/\rho_\gamma\approx 0.0721\,\sym{ch02-xint}{x}`, f: x => C.NU_NR_SLOPE * x, dash: "dash", color: "#c0392b" },
    ]}
    vlines={p => [
      { x: p.m / C.TNU0_EV, label: R`\text{今天}` },
      { x: p.m / (C.TNU0_EV * 1101), label: R`z=1100` },
    ]}
    samples={200} />;
}

// ---------- 5. 习题 2.10：距离模数 ----------
const mu = dl => 5 * Math.log10(dl) + 25;   // d_L 以 Mpc 计
export function ModulusPlot() {
  return <Plot
    x={{ label: R`z`, log: true, domain: [0.01, 2.3] }}
    y={{ label: R`\Delta(\sym{ch02-appmag}{m}-M)\ \text{相对}\ \Omega_{\rm m}=1\ [\mathrm{mag}]` }}
    params={[
      { id: "Om", label: R`\Omega_{\rm m}`, min: 0.05, max: 1, step: 0.01, value: 0.3 },
      { id: "OL", label: R`\Omega_\Lambda`, min: 0, max: 1.2, step: 0.01, value: 0.7 },
    ]}
    series={p => {
      const eds = z => 2 * C.HUBBLE_DIST * (1 + z) * (1 - 1 / Math.sqrt(1 + z));
      const q = { Om: p.Om, OL: p.OL };
      return [
        { label: R`\Omega_{\rm m}=${f2(p.Om)},\ \Omega_\Lambda=${f2(p.OL)}`, f: z => mu(C.dL(z, q)) - mu(eds(z)) },
        { label: R`\text{空宇宙}\ \Omega=0`, f: z => mu(C.HUBBLE_DIST * z * (1 + z / 2)) - mu(eds(z)), dash: "dash", color: "#999" },
        { label: R`\Omega_{\rm m}=1`, f: () => 0, dash: "dot", color: "#1f1b16" },
      ];
    }}
    samples={160} />;
}
export function ModulusAbsPlot() {
  return <Plot
    x={{ label: R`z`, log: true, domain: [0.01, 2.3] }}
    y={{ label: R`\sym{ch02-appmag}{m}-M\ [\mathrm{mag}]` }}
    params={[{ id: "h", label: R`h`, min: 0.6, max: 0.8, step: 0.01, value: 0.7 }]}
    series={p => [
      { label: R`\Lambda\text{CDM}\ (0.3,0.7)`, f: z => mu(C.dL(z, { Om: 0.3, OL: 0.7 }) / p.h) },
      { label: R`\Omega_{\rm m}=1`, f: z => mu(2 * C.HUBBLE_DIST * (1 + z) * (1 - 1 / Math.sqrt(1 + z)) / p.h), dash: "dash" },
    ]}
    samples={120} />;
}

// ---------- 6. 习题 2.6：共形时间 η(a) ----------
export function EtaPlot() {
  return <Plot
    x={{ label: R`a`, log: true, domain: [1e-6, 1] }}
    y={{ label: R`\eta\ [\mathrm{Mpc}]`, log: true, domain: [1e-2, 3e4] }}
    params={[
      { id: "Om", label: R`\Omega_{\rm m}`, min: 0.1, max: 1, step: 0.01, value: 0.3 },
      { id: "h", label: R`h`, min: 0.5, max: 0.9, step: 0.01, value: 0.7 },
    ]}
    series={p => {
      const Or = C.OMR_H2 / (p.h * p.h), q = { Om: p.Om, OL: 1 - p.Om - Or, Or }, aeq = Or / p.Om, D = C.HUBBLE_DIST / p.h;
      return [
        { label: R`\text{数值积分（含}\ \Lambda\text{）}`, f: a => C.eta(a, q, 300) / p.h },
        { label: R`\text{式 (2.95)}`, f: a => 2 / Math.sqrt(p.Om) * (Math.sqrt(a + aeq) - Math.sqrt(aeq)) * D, dash: "dash", color: "#c0392b" },
        { label: R`\eta\propto a\ \text{(RD)}`, f: a => a / Math.sqrt(Or) * D, dash: "dot", color: "#999" },
        { label: R`\eta\propto a^{1/2}\ \text{(MD)}`, f: a => 2 * Math.sqrt(a / p.Om) * D, dash: "dot", color: "#2c6e49" },
      ];
    }}
    vlines={p => [{ x: C.OMR_H2 / (p.h * p.h) / p.Om, label: R`a_{\rm eq}` }, { x: 1 / 1101, label: R`z=1100` }]}
    samples={160} />;
}

// ---------- 7. 习题 2.13：冷暗物质 + 一代中微子（无质量 vs 0.06 eV） ----------
export function Ex213Plot() {
  return <Plot
    x={{ label: R`a`, log: true, domain: [1e-8, 10] }}
    y={{ label: R`\rho_{\rm B}(a)/\rho_{\rm A}(a)` }}
    params={[
      { id: "m", label: R`m_\nu\,[\mathrm{eV}]`, min: 0.01, max: 1, log: true, value: 0.06 },
      { id: "h", label: R`h`, min: 0.5, max: 0.9, step: 0.01, value: 0.7 },
    ]}
    series={p => {
      const Og = C.OMG_H2 / (p.h * p.h);
      const OnuA = C.NU_PLATEAU * Og, OnuB = Og * C.nuRatio(p.m / C.TNU0_EV);
      const rA = a => (1 - OnuA) / a ** 3 + OnuA / a ** 4;
      const rB = a => (1 - OnuB) / a ** 3 + Og / a ** 4 * C.nuRatio(p.m * a / C.TNU0_EV);
      return [{ label: R`\rho_{\rm B}/\rho_{\rm A}\ \ (\Omega_\nu^{\rm B}h^2=${(OnuB * p.h * p.h * 1e4).toFixed(2)}\times10^{-4})`, f: a => rB(a) / rA(a) }];
    }}
    samples={220} />;
}
