// 第 11 章（下）交互图（浏览器内真算）。数值函数见 _ch11b_phys.jsx，已用 node 与原书数值核对。
import { Plot } from "@kit";
import * as P from "./_ch11b_phys.jsx";

const R = String.raw;
const GRAYS = ["#1f1b16", "#2c4a6e", "#2c6e49", "#c0392b"];
// 图 11.27 读数（约，按原书图像素估读），用于与式 (11.15) 对照
const FIG27 = {
  0.3: [[1, 2.3e-8], [1.5, 1.3e-8], [2, 8.8e-9], [2.5, 6.4e-9], [3.5, 4.3e-9], [4.5, 2.9e-9]],
  0.6: [[1, 9.2e-7], [1.5, 3.2e-7], [2, 1.37e-7], [2.5, 7.3e-8], [3.5, 3.4e-8], [4.5, 1.6e-8]],
};

// ---------- 1. 隧穿接触的比接触电阻（图 11.27 交互版）----------
export function ContactPlot() {
  return <Plot
    x={{ label: R`N_D\ [10^{20}\,\mathrm{cm^{-3}}]`, domain: [0.5, 5] }}
    y={{ label: R`\rho_c\ [\mathrm{\Omega\,cm^2}]`, log: true, domain: [1e-9, 1e-5] }}
    params={[
      { id: "m", label: R`m^*/m_0`, min: 0.1, max: 0.6, step: 0.01, value: 0.26 },
      { id: "v", label: R`v_{\rm th}\ [10^7\,\mathrm{cm/s}]`, min: 0.3, max: 3, step: 0.05, value: 1 },
      { id: "A", label: R`\text{接触边长}\ [\mathrm{nm}]`, min: 10, max: 100, step: 1, value: 25 },
    ]}
    series={p => [
      ...[0.3, 0.4, 0.5, 0.6].map((f, i) => ({ label: R`\phi_B=${f}\,\mathrm V`, f: n => P.rhoTunnel(f, n * 1e20, p.m, p.v * 1e7), color: GRAYS[i] })),
      { label: R`\text{图 11.27 读数}\ (\phi_B=0.3,\ 0.6)`, data: [...FIG27[0.3], ...FIG27[0.6]], points: true, color: "#b8862b" },
      { label: R`R_c=10^{-8}/A\ \text{的接触电阻}\ (A=${p.A}^2\,\mathrm{nm^2}):\ ${(1e-8 / (p.A * 1e-7) ** 2 / 1000).toFixed(2)}\,\mathrm{k\Omega}`, f: () => NaN },
    ]}
    samples={120} />;
}

// ---------- 2. TiSi₂ 的线性–抛物线生长（式 11.16，表 11.5）----------
export function SilicidePlot() {
  return <Plot
    x={{ label: R`t\ [\mathrm{s}]`, domain: [0, 120] }}
    y={{ label: R`x_s\ [\mathrm{nm}]`, domain: [0, 300] }}
    params={[
      { id: "T", label: R`T\ [^\circ\mathrm C]`, min: 550, max: 800, step: 5, value: 700 },
      { id: "ti", label: R`\text{Ti 厚度}\ [\mathrm{nm}]`, min: 20, max: 100, step: 1, value: 55 },
    ]}
    series={p => {
      const TK = p.T + 273.15, B = P.B100(TK), BA = P.BA111(TK), xmax = 2.51 * p.ti;
      const lim = x => Math.min(x, xmax);
      return [
        { label: R`(100)\ \text{Si：扩散限制}\ x_s=\sqrt{Bt}`, f: t => lim(1000 * P.dealGrove(t / 60, B, Infinity)) },
        { label: R`(111)\ \text{Si：反应限制}\ x_s=(B/A)t`, f: t => lim(1000 * P.dealGrove(t / 60, Infinity, BA)), color: "#c0392b", dash: "dash" },
        { label: R`\text{Ti 耗尽上限}\ 2.51\times${p.ti}=${xmax.toFixed(0)}\,\mathrm{nm}`, f: () => xmax, color: "#999", dash: "dot" },
        { label: R`B=${B.toFixed(4)}\,\mathrm{\mu m^2/min},\ B/A=${BA.toFixed(3)}\,\mathrm{\mu m/min}`, f: () => NaN },
      ];
    }}
    vlines={() => [{ x: 30, label: R`t=30\,\mathrm s` }]}
    samples={200} />;
}

// ---------- 3. Black 方程：加速寿命外推（式 11.30）----------
export function BlackPlot() {
  return <Plot
    x={{ label: R`\text{工作温度}\ T\ [^\circ\mathrm C]`, domain: [25, 300] }}
    y={{ label: R`\mathrm{MTTF}_{\rm use}/\mathrm{MTTF}_{\rm test}`, log: true, domain: [1, 1e9] }}
    params={[
      { id: "Tt", label: R`T_{\rm test}\ [^\circ\mathrm C]`, min: 200, max: 350, step: 5, value: 300 },
      { id: "Jr", label: R`J_{\rm test}/J_{\rm use}`, min: 1, max: 100, log: true, value: 10 },
      { id: "EA", label: R`E_A\ [\mathrm{eV}]\ (\text{Cu})`, min: 0.5, max: 1.5, step: 0.01, value: 0.9 },
      { id: "n", label: R`n\ (\text{Cu})`, min: 1, max: 2.5, step: 0.05, value: 1.2 },
    ]}
    series={p => {
      const Tt = p.Tt + 273.15;
      return [
        { label: R`\text{Cu}\ (E_A=${p.EA},\ n=${p.n})`, f: T => P.blackRatio(1, T + 273.15, p.Jr, Tt, p.n, p.EA), color: "#d9822b" },
        { label: R`\text{Al}\ (E_A=0.6,\ n=2)`, f: T => P.blackRatio(1, T + 273.15, p.Jr, Tt, 2, 0.6), color: "#2c4a6e", dash: "dash" },
        { label: R`\text{Cu 在 }105^\circ\mathrm C:\ \times${P.blackRatio(1, 378.15, p.Jr, Tt, p.n, p.EA).toExponential(1)}`, f: () => NaN },
      ];
    }}
    vlines={() => [{ x: 105, label: R`105^\circ\mathrm C` }]}
    samples={160} />;
}

// ---------- 4. 尺寸效应：有效电阻率随线宽（式 11.31 + 阻挡层）----------
export function SizeEffectPlot() {
  return <Plot
    x={{ label: R`\text{线宽}\ w\ [\mathrm{nm}]`, log: true, domain: [6, 100] }}
    y={{ label: R`\text{等效电阻率}\ [\mathrm{\mu\Omega\,cm}]`, log: true, domain: [1, 100] }}
    params={[
      { id: "tb", label: R`\text{Cu 阻挡层+衬垫}\ t_b\ [\mathrm{nm}]`, min: 0, max: 4, step: 0.25, value: 2 },
      { id: "p", label: R`p\ (\text{镜面率})`, min: 0, max: 0.9, step: 0.05, value: 0 },
      { id: "R", label: R`R\ (\text{晶界反射})`, min: 0.01, max: 0.7, step: 0.01, value: 0.4 },
      { id: "ar", label: R`\text{深宽比 } h/w`, min: 1, max: 3, step: 0.1, value: 2 },
    ]}
    series={p => [
      { label: R`\text{Cu}\ (t_b=${p.tb}\,\mathrm{nm})`, f: w => P.lineRho(P.METALS.Cu, w, p.ar, p.tb, p.p, p.R), color: "#d9822b" },
      { label: R`\text{Cu 无阻挡层（假想）}`, f: w => P.lineRho(P.METALS.Cu, w, p.ar, 0, p.p, p.R), color: "#d9822b", dash: "dot", width: 1.5 },
      { label: R`\text{Co（无阻挡层）}`, f: w => P.lineRho(P.METALS.Co, w, p.ar, 0, p.p, p.R), color: "#2c4a6e", dash: "dash" },
      { label: R`\text{Ru（无阻挡层）}`, f: w => P.lineRho(P.METALS.Ru, w, p.ar, 0, p.p, p.R), color: "#2c6e49", dash: "dashdot" },
    ]}
    vlines={p => {
      for (let w = 60; w > 6; w -= 0.25) if (P.lineRho(P.METALS.Cu, w, p.ar, p.tb, p.p, p.R) > P.lineRho(P.METALS.Ru, w, p.ar, 0, p.p, p.R)) return [{ x: w, label: R`\text{Ru 反超}\ w\approx${w.toFixed(1)}\,\mathrm{nm}` }];
      return [];
    }}
    samples={160} />;
}

// ---------- 5. 法拉第定律：电镀速率 ----------
export function PlatingPlot() {
  return <Plot
    x={{ label: R`J\ [\mathrm{mA/cm^2}]`, domain: [0, 30] }}
    y={{ label: R`\text{沉积速率}\ [\mathrm{\mu m/min}]`, domain: [0, 0.8] }}
    params={[{ id: "eff", label: R`\text{电流效率}`, min: 0.5, max: 1, step: 0.01, value: 1 }]}
    series={p => [
      { label: R`\text{Cu}\ (n=2,\ A_W=63.55)`, f: J => p.eff * P.plateRate(J), color: "#d9822b" },
      { label: R`\text{若为一价}\ \mathrm{Cu^+}\ (n=1)`, f: J => p.eff * P.plateRate(J, 63.55, 1), color: "#999", dash: "dash" },
    ]}
    vlines={() => [{ x: 3, label: "3" }, { x: 15, label: "15" }]}
    samples={60} />;
}
