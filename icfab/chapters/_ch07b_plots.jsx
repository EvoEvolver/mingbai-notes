// 第 7 章（下）交互图。数值模型见 _ch07b_phys.jsx（已用 node 核对：图 7.30/7.35 的端点数值、复合动力学两个极限、
// 上坡扩散的稳态 C·S = 常数、多晶硅模型剂量守恒、Zn 平方律扩散的箱形前沿深度）。
import { Plot } from "@kit";
import * as P from "./_ch07b_phys.jsx";

const R = String.raw;
const f2 = (v, d = 2) => (+v).toFixed(d);
const sci = v => { const e = Math.floor(Math.log10(v)), m = v / 10 ** e; return `${m.toFixed(1)}\\times10^{${e}}`; };
const um = x => x * 1e4;

// ---------- 1. 式 (7.52) + 表 7.4：OED / ORD ----------
export function OEDPlot({ caption }) {
  return <Plot caption={caption}
    x={{ label: R`\text{间隙超饱和度}\ C_{\rm I}/C_{\rm I}^*`, log: true, domain: [0.01, 100] }}
    y={{ label: R`D_{\rm A}^{\rm eff}/D_{\rm A}^*`, log: true, domain: [0.01, 100] }}
    params={[
      { id: "rho", label: R`\rho\ (C_{\rm V}/C_{\rm V}^*=(C_{\rm I}/C_{\rm I}^*)^{-\rho})`, min: 0, max: 1, step: 0.01, value: 1 },
      { id: "s", label: R`\text{读数点}\ C_{\rm I}/C_{\rm I}^*`, min: 0.01, max: 100, log: true, value: 10 },
    ]}
    series={p => {
      const sv = s => Math.pow(s, -p.rho), L = (n, f) => R`\text{${n}}\ (f_{\rm I}=${f})\!:\ ${f2(P.dRatio(f, p.s, sv(p.s)))}`;
      return [
        { label: L("B, P", 1), f: s => P.dRatio(1, s, sv(s)), color: "#c0392b" },
        { label: L("As", 0.4), f: s => P.dRatio(0.4, s, sv(s)), color: "#2c6e49", dash: "dash" },
        { label: L("Sb", 0.02), f: s => P.dRatio(0.02, s, sv(s)), color: "#2c4a6e" },
        { label: L("Si 自扩散", 0.6), f: s => P.dRatio(0.6, s, sv(s)), color: "#999", dash: "dot" },
      ];
    }}
    vlines={p => [{ x: 1, label: R`\text{平衡}` }, { x: p.s, label: p.s > 1 ? R`\text{氧化：注入 I}` : R`\text{氮化：注入 V}` }]}
    samples={200} />;
}

// ---------- 2. 点缺陷复合动力学 ----------
export function RecombPlot({ caption }) {
  return <Plot caption={caption}
    x={{ label: R`t\ [\mathrm{s}]`, log: true, domain: [1e-3, 1e4] }}
    y={{ label: R`\text{相对平衡值}`, log: true, domain: [1e-3, 1e3] }}
    params={[
      { id: "g", label: R`g\ [C_{\rm I}^*/\mathrm{s}]`, min: 0.01, max: 100, log: true, value: 1 },
      { id: "r", label: R`r=k_{\rm R}C^*\ [\mathrm{s^{-1}}]`, min: 1e-5, max: 1e3, log: true, value: 10 },
      { id: "tau", label: R`\tau\ [\mathrm{s}]`, min: 1, max: 1000, log: true, value: 30 },
    ]}
    series={p => {
      const sol = P.recombine({ g: p.g, r: p.r, tau: p.tau }), end = sol[sol.length - 1];
      return [
        { label: R`C_{\rm I}/C_{\rm I}^*\ (\to ${f2(end[1])})`, data: sol.map(([t, i]) => [t, i]), color: "#c0392b" },
        { label: R`C_{\rm V}/C_{\rm V}^*\ (\to ${f2(end[2], 3)})`, data: sol.map(([t, , v]) => [t, v]), color: "#2c4a6e" },
        { label: R`C_{\rm I}C_{\rm V}/C_{\rm I}^*C_{\rm V}^*\ (\to ${f2(end[1] * end[2])})`, data: sol.map(([t, i, v]) => [t, i * v]), color: "#999", dash: "dot" },
        { label: R`D_{\rm B}^{\rm eff}/D_{\rm B}^*`, data: sol.map(([t, i, v]) => [t, P.dRatio(1, i, v)]), color: "#c0392b", dash: "dash", width: 1.4 },
        { label: R`D_{\rm Sb}^{\rm eff}/D_{\rm Sb}^*\ (\to ${f2(P.dRatio(0.02, end[1], end[2]), 3)})`, data: sol.map(([t, i, v]) => [t, P.dRatio(0.02, i, v)]), color: "#2c6e49", dash: "dashdot" },
      ];
    }}
    vlines={p => [{ x: 1 / (p.r * (1 + p.g * p.tau)), label: R`1/(r\,C_{\rm I}/C_{\rm I}^*)` }, { x: p.tau, label: R`\tau` }]}
    samples={10} height={400} />;
}

// ---------- 3. 由式 (7.59)：点缺陷梯度驱动的上坡扩散（RSCE 的机理） ----------
export function UphillPlot({ caption }) {
  return <Plot caption={caption}
    x={{ label: R`x\ [\mathrm{\mu m}]\ \ (\text{表面} \to \text{体内})`, domain: [0, 0.3] }}
    y={{ label: R`C_{\rm A}/C_{\rm A,0}\ \ \text{或}\ \ S/S_{\max}`, domain: [0, 4] }}
    params={[
      { id: "S", label: R`S_{\max}=\max C_{\rm I}/C_{\rm I}^*`, min: 1, max: 30, step: 0.5, value: 10 },
      { id: "lam", label: R`\lambda\ [\mathrm{nm}]`, min: 5, max: 150, step: 1, value: 40 },
      { id: "Dt", label: R`D_{\rm A}^*t\ [\mathrm{nm^2}]`, min: 1, max: 1e5, log: true, value: 100 },
    ]}
    series={p => {
      const u = P.uphill({ Smax: p.S, lam: p.lam * 1e-7, Dt: p.Dt * 1e-14 });
      const pts = arr => u.xs.map((x, i) => [um(x), arr[i]]);
      return [
        { label: R`C_{\rm A}(x,t)\ \ (\text{表面}\ ${f2(u.C[0])}C_{\rm A,0})`, data: pts(u.C), color: "#c0392b" },
        { label: R`\text{稳态}\ C_{\rm A}\propto 1/S`, data: pts(u.Cinf), color: "#c0392b", dash: "dot", width: 1.4 },
        { label: R`S(x)/S_{\max}`, data: pts(u.S.map(s => s / p.S)), color: "#2c4a6e", dash: "dash" },
        { label: R`\text{无缺陷梯度（只有第一项）}`, f: () => 1, color: "#999", dash: "dashdot", width: 1.4 },
      ];
    }}
    vlines={p => [{ x: Math.sqrt(p.Dt) * 1e-3, label: R`\sqrt{D_{\rm A}^*t}` }]}
    samples={2} />;
}

// ---------- 4. 式 (7.61)–(7.63)：多晶硅两股流模型 ----------
export function PolyPlot({ caption }) {
  return <Plot caption={caption}
    x={{ label: R`\text{多晶硅中的深度}\ x\ [\mathrm{\mu m}]`, domain: [0, 0.3] }}
    y={{ label: R`\text{As 浓度}\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e16, 1e21] }}
    params={[
      { id: "t", label: R`t\ [\mathrm{min}]`, min: 1, max: 120, step: 1, value: 30 },
      { id: "ratio", label: R`D_{\rm A}^{\rm gb}/D_{\rm A}^{\rm grain}`, min: 1e2, max: 1e6, log: true, value: 1e4 },
      { id: "Lg0", label: R`L_{\rm go}\ [\mathrm{nm}]`, min: 5, max: 100, step: 1, value: 20 },
      { id: "sig", label: R`\sigma\ [\mathrm{nm^2/s}]`, min: 0.001, max: 5, log: true, value: 0.1 },
      { id: "seg", label: R`s`, min: 1, max: 100, log: true, value: 10 },
    ]}
    series={p => {
      const r = P.poly({ tMin: p.t, ratio: p.ratio, Lg0nm: p.Lg0, sigma: p.sig, seg: p.seg });
      const pts = arr => r.xs.map((x, i) => [um(x), Math.max(arr[i], 1e10)]);
      return [
        { label: R`\text{多晶硅总浓度}\ (L_{\rm g}\to${f2(r.LgEnd * 1e7, 0)}\,\mathrm{nm})`, data: pts(r.Cg.map((c, i) => c + r.Cb[i])), color: "#8b3a1e", width: 2.6 },
        { label: R`C_{\rm A}^{\rm grain}`, data: pts(r.Cg), color: "#b8862b", dash: "dash", width: 1.5 },
        { label: R`C_{\rm A}^{\rm gb}`, data: pts(r.Cb), color: "#2c4a6e", dash: "dash", width: 1.5 },
        { label: R`\text{单晶硅（只有}\ D_{\rm A}^{\rm grain})`, data: pts(r.Cx), color: "#555", dash: "dot" },
        { label: R`\text{简化模型}\ 100\times D_{\rm A}^{\rm grain}`, data: pts(r.C100), color: "#2c6e49", dash: "dashdot", width: 1.5 },
      ];
    }}
    samples={2} height={400} />;
}

// ---------- 5. 式 (7.67)(7.68)：GaAs 中 Zn 的箱形分布 ----------
export function ZnPlot({ caption }) {
  return <Plot caption={caption}
    x={{ label: R`\text{深度}\ [\mathrm{\mu m}]`, domain: [0, 1.6] }}
    y={{ label: R`\text{Zn 浓度}\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e15, 1e20] }}
    params={[
      { id: "T", label: R`T\ [^\circ\mathrm C]`, min: 700, max: 900, step: 5, value: 850 },
      { id: "t", label: R`t\ [\mathrm{min}]`, min: 10, max: 300, step: 5, value: 120 },
      { id: "Q13", label: R`\text{剂量}\ [10^{13}\,\mathrm{cm^{-2}}]`, min: 1, max: 100, log: true, value: 10 },
    ]}
    series={p => {
      const Q = p.Q13 * 1e13, z = P.znBox({ TC: p.T, tMin: p.t, Q }), Rp = 0.05e-4, dR = 0.03e-4;
      const s2 = dR * dR + 2 * z.D0 * p.t * 60;
      const g = (x, s) => Q / Math.sqrt(2 * Math.PI * s) * (Math.exp(-((x - Rp) ** 2) / (2 * s)) + Math.exp(-((x + Rp) ** 2) / (2 * s)));
      let front = 0; z.xs.forEach((x, i) => { if (z.C[i] > 1e17) front = x; });
      return [
        { label: R`D=D_{\rm Zn}^{++}(p/n_i)^2\ (\text{前沿}\approx${f2(um(front))}\,\mathrm{\mu m})`, data: z.xs.map((x, i) => [um(x), z.C[i]]), color: "#c0392b", width: 2.6 },
        { label: R`\text{注入初始分布}`, f: x => g(x * 1e-4, dR * dR) + 1e16, color: "#555", dash: "dash", width: 1.4 },
        { label: R`\text{常数}\ D=D_{\rm Zn}^{++}=${sci(z.D0)}\,\mathrm{cm^2/s}`, f: x => g(x * 1e-4, s2) + 1e16, color: "#2c4a6e", dash: "dot" },
        { label: R`n_i=${sci(z.ni)}\,\mathrm{cm^{-3}}`, f: () => z.ni, color: "#999", dash: "dashdot", width: 1.2 },
      ];
    }}
    samples={300} />;
}

// ---------- 6. 图 7.30 与图 7.35：GaAs 中的 Arrhenius 图 ----------
const inv = x => 1000 / x, inRange = x => x >= 1000 / 1373.15 - 1e-9 && x <= 1000 / 1073.15 + 1e-9;
const tLines = [1100, 1000, 900, 800].map(c => ({ x: 1000 / P.C2K(c), label: R`${c}^\circ\mathrm C` }));
export function SelfDiffPlot({ caption }) {
  return <Plot caption={caption}
    x={{ label: R`1000/T\ [\mathrm{K^{-1}}]`, domain: [0.70, 0.95] }}
    y={{ label: R`\text{扩散率}\ [\mathrm{cm^2/s}]`, log: true, domain: [1e-27, 1e-12] }}
    series={[
      { label: R`D_{\rm Ga}=0.1\,e^{-3.2/kT}\ \text{(7.64)}`, f: x => inRange(x) ? P.GAAS_SELF.Ga_Ghandhi(inv(x)) : NaN, color: "#b8862b" },
      { label: R`D_{\rm Ga}=2.9\times10^{8}\,e^{-6.0/kT}\ \text{(7.65)}`, f: x => inRange(x) ? P.GAAS_SELF.Ga_Tan(inv(x)) : NaN, color: "#8b5a1e", dash: "dash" },
      { label: R`D_{\rm As}=0.7\,e^{-5.6/kT}\ \text{(7.64)}`, f: x => inRange(x) ? P.GAAS_SELF.As_Ghandhi(inv(x)) : NaN, color: "#2c4a6e" },
    ]}
    vlines={tLines} samples={200} />;
}
export function GaAsDopPlot({ caption }) {
  const L = [["Zn", "#c0392b", "solid"], ["Be", "#e07b39", "dash"], ["Sn", "#2c4a6e", "solid"], ["Ge", "#2c6e49", "dash"], ["Si", "#555", "dot"]];
  return <Plot caption={caption}
    x={{ label: R`1000/T\ [\mathrm{K^{-1}}]`, domain: [0.70, 0.95] }}
    y={{ label: R`D^{++}\ \text{或}\ D^{=}\ [\mathrm{cm^2/s}]`, log: true, domain: [1e-18, 1e-11] }}
    series={L.map(([k, c, d]) => ({ label: R`\text{${k}}${["Zn", "Be"].includes(k) ? R`\ (D^{++})` : R`\ (D^{=})`}`, f: x => inRange(x) ? P.GAAS_DOP[k](inv(x)) : NaN, color: c, dash: d }))}
    vlines={tLines} samples={200} />;
}
