// 第 3 章交互图（浏览器内真算）。数值函数见 _ch03_phys.jsx。
import { Plot } from "@kit";
import * as P from "./_ch03_phys.jsx";

const R = String.raw;
const e2 = v => { if (!(v > 0)) return "0"; const ex = Math.floor(Math.log10(v)), m = v / 10 ** ex; return `${m.toFixed(1)}\\times10^{${ex}}`; };
const invT = x => 1000 / x;      // 1000/T → T(K)

// ---------- 式 (3.2)：热应力与屈服 ----------
export function ThermalStressPlot() {
  return <Plot
    x={{ label: R`\Delta T\ [\mathrm{K}]`, domain: [0, 300] }}
    y={{ label: R`\sigma\ [10^{9}\,\mathrm{dyn\,cm^{-2}}]`, domain: [0, 1.4] }}
    params={[
      { id: "a", label: R`\alpha\ [10^{-6}\,\mathrm{K^{-1}}]`, min: 2, max: 4.5, step: 0.05, value: 2.6 },
      { id: "Y", label: R`Y\ [10^{12}\,\mathrm{dyn\,cm^{-2}}]`, min: 1.3, max: 1.9, step: 0.01, value: 1.6 },
      { id: "ys", label: R`\text{屈服强度}\ [10^{9}]`, min: 0.2, max: 1.2, step: 0.05, value: 0.5 },
    ]}
    series={p => [
      { label: R`\sigma=\alpha Y\Delta T`, f: d => p.a * 1e-6 * p.Y * 1e12 * d / 1e9 },
      { label: R`\text{屈服强度}`, f: () => p.ys, dash: "dash", color: "#c0392b" },
    ]}
    vlines={p => { const d = p.ys * 1e9 / (p.a * 1e-6 * p.Y * 1e12); return d < 300 ? [{ x: d, label: R`\Delta T_{\rm crit}\approx${d.toFixed(0)}\,\mathrm{K}` }] : []; }}
    samples={60} height={320} caption={R`式 (3.2) 的数值计算：热应力随温差线性增长，与屈服强度的交点给出临界温差 $\Delta T_{\rm crit}$。硅在高温下屈服强度显著降低，高温段的临界温差因而更小。`} />;
}

// ---------- 图 3.9 交互版：C*_I0、C*_V0、n_i 随 1000/T ----------
export function DefectConcPlot() {
  return <Plot
    x={{ label: R`1000/T\ [\mathrm{K^{-1}}]`, domain: [0.65, 3.45] }}
    y={{ label: R`\text{浓度}\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e7, 1e20] }}
    params={[{ id: "T", label: R`T\ [^\circ\mathrm{C}]`, min: 300, max: 1400, step: 5, value: 1000 }]}
    series={p => {
      const T = P.C2K(p.T);
      return [
        { label: R`n_i=${e2(P.ni(T))}`, f: x => P.ni(invT(x)), color: "#1f1b16" },
        { label: R`C_{V^0}^*=${e2(P.CV0(T))}`, f: x => P.CV0(invT(x)), color: "#3f78b5" },
        { label: R`C_{I^0}^*=${e2(P.CI0(T))}`, f: x => P.CI0(invT(x)), color: "#c0392b" },
        { label: R`C_{V^0}^*/N_S\approx1/${e2(P.NSI / P.CV0(T))},\ C_{I^0}^*/N_S\approx1/${e2(P.NSI / P.CI0(T))}`, f: () => NaN, color: "#999" },
      ];
    }}
    vlines={p => [{ x: 1000 / P.C2K(p.T), label: R`${p.T}\,^\circ\mathrm{C}` }]}
    samples={200} />;
}

// ---------- 图 3.10 交互版：D_I、D_V 及扩散长度 ----------
export function DiffusivityPlot() {
  return <Plot
    x={{ label: R`1000/T\ [\mathrm{K^{-1}}]`, domain: [0.65, 3.45] }}
    y={{ label: R`D\ [\mathrm{cm^2\,s^{-1}}]`, log: true, domain: [1e-40, 1e-4] }}
    params={[
      { id: "T", label: R`T\ [^\circ\mathrm{C}]`, min: 300, max: 1400, step: 5, value: 1000 },
      { id: "t", label: R`t\ [\mathrm{s}]`, min: 1, max: 36000, log: true, value: 60 },
    ]}
    series={p => {
      const T = P.C2K(p.T), Li = Math.sqrt(P.DI(T) * p.t) * 1e4, Lv = Math.sqrt(P.DV(T) * p.t) * 1e4;
      return [
        { label: R`D_I=${e2(P.DI(T))},\ \sqrt{D_It}=${Li < 1e4 ? Li.toPrecision(2) : e2(Li)}\,\mathrm{\mu m}`, f: x => P.DI(invT(x)), color: "#c0392b" },
        { label: R`D_V=${e2(P.DV(T))},\ \sqrt{D_Vt}=${Lv.toPrecision(2)}\,\mathrm{\mu m}`, f: x => P.DV(invT(x)), color: "#3f78b5" },
      ];
    }}
    vlines={p => [{ x: 1000 / P.C2K(p.T), label: R`${p.T}\,^\circ\mathrm{C}` }]}
    samples={200} />;
}

// ---------- 式 (3.11)–(3.13)：带电空位浓度随掺杂 ----------
export function ChargedVacancyPlot() {
  return <Plot
    x={{ label: R`\text{净掺杂}\ |N_D-N_A|\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e15, 1e21] }}
    y={{ label: R`C^*\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e10, 1e19] }}
    params={[
      { id: "T", label: R`T\ [^\circ\mathrm{C}]`, min: 700, max: 1200, step: 5, value: 1000 },
      { id: "type", label: R`\text{类型：}+1\ \text{N 型},\ -1\ \text{P 型}`, min: -1, max: 1, step: 2, value: 1 },
      { id: "m", label: R`E_{V^-}-E_i\ [\mathrm{eV}]`, min: 0.05, max: 0.45, step: 0.01, value: P.VLEV.m },
      { id: "mm", label: R`E_{V^=}-E_i\ [\mathrm{eV}]`, min: 0.2, max: 0.55, step: 0.01, value: P.VLEV.mm },
      { id: "pp", label: R`E_i-E_{V^+}\ [\mathrm{eV}]`, min: 0.05, max: 0.5, step: 0.01, value: P.VLEV.p },
    ]}
    series={p => {
      const T = P.C2K(p.T), lev = { m: p.m, mm: p.mm, p: p.pp }, s = p.type >= 0 ? 1 : -1, V = N => P.vacancies(s * N, T, lev);
      return [
        { label: R`C_{V^0}^*`, f: N => V(N).V0, color: "#1f1b16" },
        { label: R`C_{V^+}^*`, f: N => V(N).Vp, color: "#c0392b", dash: "dash" },
        { label: R`C_{V^-}^*`, f: N => V(N).Vm, color: "#3f78b5" },
        { label: R`C_{V^=}^*`, f: N => V(N).Vmm, color: "#2f8f5b", dash: "dashdot" },
        { label: R`\text{总计}`, f: N => V(N).tot, color: "#b07cc6", width: 1.5, dash: "dot" },
      ];
    }}
    vlines={p => [{ x: P.ni(P.C2K(p.T)), label: R`n_i(T)` }]}
    samples={160} />;
}

// ---------- 式 (3.14)：最大拉速随晶锭直径 ----------
export function PullRatePlot() {
  return <Plot
    x={{ label: R`\text{晶锭直径}\ 2r\ [\mathrm{mm}]`, domain: [25, 450] }}
    y={{ label: R`v_{\rm PMAX}\ [\mathrm{cm\,h^{-1}}]`, domain: [0, 60] }}
    params={[
      { id: "eps", label: R`\varepsilon`, min: 0.3, max: 0.9, step: 0.01, value: 0.55 },
      { id: "kM", label: R`k_M\ [\mathrm{W\,cm^{-1}K^{-1}}]`, min: 0.15, max: 0.35, step: 0.005, value: 0.22 },
      { id: "TM", label: R`T_M\ [\mathrm{K}]`, min: 1650, max: 1700, step: 1, value: 1690 },
    ]}
    series={p => {
      const q = { eps: p.eps, kM: p.kM, TM: p.TM };
      return [
        { label: R`\text{式 (3.14)}`, f: D => P.vPmax({ ...q, r: D / 20 }) },
        { label: R`\propto r^{-1/2}\ \text{参考：}150\,\mathrm{mm}\to ${P.vPmax({ ...q, r: 7.5 }).toFixed(1)},\ 300\,\mathrm{mm}\to ${P.vPmax({ ...q, r: 15 }).toFixed(1)}\ \mathrm{cm/h}`, f: () => NaN, color: "#999" },
      ];
    }}
    vlines={() => [{ x: 150, label: R`150\,\mathrm{mm}` }, { x: 300, label: R`300\,\mathrm{mm}` }]}
    samples={120} height={340} />;
}

// ---------- 图 3.22 交互版：CZ 晶锭轴向掺杂分布 ----------
export function CZSegregationPlot() {
  return <Plot
    x={{ label: R`\text{凝固分数}\ f`, domain: [0, 0.99] }}
    y={{ label: R`C_S/C_O`, log: true, domain: [0.01, 10] }}
    params={[{ id: "k", label: R`\text{自选}\ k_O`, min: 1e-3, max: 1, log: true, value: 0.1 }, { id: "tol", label: R`\text{允许偏差}\ C_S/C_S(0)\le`, min: 1.1, max: 5, step: 0.1, value: 2 }]}
    series={p => [
      { label: R`\mathrm{B}\ (k_O=0.8)`, f: f => P.czCs(0.8, f), color: "#c0392b" },
      { label: R`\mathrm{P}\ (0.35)`, f: f => P.czCs(0.35, f), color: "#3f78b5" },
      { label: R`\mathrm{As}\ (0.3)`, f: f => P.czCs(0.3, f), color: "#3f78b5", dash: "dash" },
      { label: R`\mathrm{Sb}\ (0.023)`, f: f => P.czCs(0.023, f), color: "#2f8f5b" },
      { label: R`k_O=${(+p.k).toPrecision(2)}`, f: f => P.czCs(p.k, f), color: "#b07cc6", dash: "dashdot" },
    ]}
    vlines={p => { const f = 1 - Math.pow(p.tol, 1 / (p.k - 1)); return f > 0 && f < 0.99 ? [{ x: f, label: R`f=${f.toFixed(2)}` }] : []; }}
    samples={200} />;
}

// ---------- 图 3.24 交互版：区熔单次通过 ----------
export function FZSinglePassPlot() {
  return <Plot
    x={{ label: R`\text{已凝固熔区数}\ x/L`, domain: [0, 25] }}
    y={{ label: R`C_S/C_O`, log: true, domain: [1e-3, 1.2] }}
    params={[{ id: "k", label: R`\text{自选}\ k_O`, min: 1e-3, max: 1, log: true, value: 0.03 }]}
    series={p => [
      ...[0.8, 0.1, 0.05, 0.01, 0.001].map((k, i) => ({ label: R`k_O=${k}`, f: x => P.fz1(k, x), color: ["#1f1b16", "#3f78b5", "#2f8f5b", "#c0392b", "#d9a21b"][i] })),
      { label: R`k_O=${(+p.k).toPrecision(2)}`, f: x => P.fz1(p.k, x), color: "#b07cc6", dash: "dashdot" },
    ]}
    samples={200} />;
}

// ---------- 图 3.25 交互版：区熔多次通过（数值计算，杂质守恒）----------
const fzCache = new Map();
function fzm(k, n) { const key = k.toFixed(4) + "/" + n; if (!fzCache.has(key)) { if (fzCache.size > 40) fzCache.clear(); fzCache.set(key, P.fzMulti(k, n, 30, 40)); } return fzCache.get(key); }
export function FZMultiPassPlot() {
  return <Plot
    x={{ label: R`x/L\ \ (\text{棒长}\ 30L)`, domain: [0, 30] }}
    y={{ label: R`C_S/C_O`, log: true, domain: [1e-6, 10] }}
    params={[{ id: "k", label: R`k_O`, min: 0.01, max: 0.9, log: true, value: 0.1 }, { id: "n", label: R`\text{通过次数}`, min: 1, max: 8, step: 1, value: 5 }]}
    series={p => {
      const m = fzm(p.k, Math.round(p.n)), cols = ["#1f1b16", "#3f78b5", "#2f8f5b", "#c0392b", "#b07cc6", "#d9a21b", "#7a5c3e", "#555"];
      return m.profiles.map((arr, i) => ({ label: R`\text{第 ${i + 1} 次}`, f: x => P.sample(arr, m.dx, x), color: cols[i % 8] }))
        .concat([{ label: R`\text{单次解析式 (3.25)}`, f: x => (x <= 29 ? P.fz1(p.k, x) : NaN), color: "#999", dash: "dot" }]);
    }}
    samples={300} />;
}
