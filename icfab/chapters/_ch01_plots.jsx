// 第 1 章交互图（浏览器内实时计算）。数值函数与数据见 _ch01_phys.jsx。
// 已用 node 核对：I–V 模型在默认参数下给出 I(0)=3.5e-10 A、I(0.45 V)=1.0e-4 A、I(1 V)=1.2e-3 A（原书图 1.18 与正文数值）；
// 缩放函数在 α=κ 时逐项复现原书图 1.16 的缩放表。
import { useState } from "react";
import { Plot, M, Tx } from "@kit";
import * as P from "./_ch01_phys.jsx";

const R = String.raw;
const sci = (v, d = 1) => { if (!Number.isFinite(v) || v === 0) return "0"; const e = Math.floor(Math.log10(Math.abs(v))), m = v / 10 ** e; return Math.abs(e) <= 2 ? (+v.toPrecision(d + 1)).toString() : `${m.toFixed(d)}\\times10^{${e}}`; };

// ---------- 1. 图 1.17 / 1.21 交互版：技术节点与特征尺寸随年份 ----------
export function NodePlot({ era = "full" }) {
  const ideal = era === "ideal";
  return <Plot
    x={{ label: R`\text{年份}`, domain: ideal ? [1960, 2010] : [1970, 2042] }}
    y={{ label: R`\text{技术节点 / 特征尺寸}\ [\mathrm{nm}]`, log: true, domain: [0.1, 1e5] }}
    params={[
      { id: "Tg", label: R`T_{\rm g}\ [\text{年/代}]`, min: 1.5, max: 4, step: 0.05, value: ideal ? 3 : 2.4 },
      { id: "t1", label: R`t_{1\,\mu\mathrm{m}}\ [\text{年}]`, min: 1978, max: 1990, step: 0.1, value: ideal ? 1983.5 : 1985 },
    ]}
    series={p => {
      const trend = t => 1000 * Math.pow(0.7, (t - p.t1) / p.Tg);
      if (ideal) return [
        { label: R`\text{图 1.17 节点（理想缩放期）}`, data: P.NODES_117, points: true, color: "#c0392b" },
        { label: R`\lambda(t)=1\,\mu\mathrm{m}\times0.7^{(t-t_{1\mu m})/T_{\rm g}}`, f: trend, color: "#2c4a6e", dash: "dash" },
        { label: R`\text{原子尺度}\ \approx0.3\,\mathrm{nm}`, f: () => 0.3, color: "#7d3c98", dash: "dot" },
      ];
      return [
        { label: R`\text{图 1.17 节点（理想缩放期）}`, data: P.NODES_117, points: true, color: "#1f1b16" },
        { label: R`\text{图 1.21 节点}`, data: P.NODES_121, points: true, color: "#c0392b" },
        { label: R`\text{图 1.21 预期节点}`, data: P.NODES_121_FUTURE, points: true, color: "#999" },
        { label: R`\lambda(t)=1\,\mu\mathrm{m}\times0.7^{(t-t_{1\mu m})/T_{\rm g}}`, f: trend, color: "#2c4a6e", dash: "dash" },
        { label: R`\text{实际印刷最小特征尺寸（上沿）}`, f: t => P.featureBand(t)?.hi ?? NaN, color: "#b8862b", width: 2.5 },
        { label: R`\text{（下沿）}`, f: t => P.featureBand(t)?.lo ?? NaN, color: "#b8862b", width: 2.5, dash: "dot" },
        { label: R`\text{原子尺度}\ \approx0.3\,\mathrm{nm}`, f: () => 0.3, color: "#7d3c98", dash: "dot" },
      ];
    }}
    vlines={p => {
      const tAtom = p.t1 + p.Tg * Math.log(0.3 / 1000) / Math.log(0.7);
      if (ideal) return [{ x: 1995, label: R`T_{\rm g}:\ 3\to2\ \text{年}` }];
      return [{ x: tAtom, label: R`\text{趋势到 }0.3\,\mathrm{nm}:\ ${tAtom.toFixed(0)}` }, { x: 2004, label: R`\text{理想缩放结束}` }];
    }}
    samples={240} height={420} />;
}

// ---------- 2. 晶体管数随年份（摩尔定律） ----------
export function CountPlot() {
  return <Plot
    x={{ label: R`\text{年份}`, domain: [1958, 2030] }}
    y={{ label: R`\text{每芯片元件 / 晶体管数}\ N`, log: true, domain: [1, 1e12] }}
    params={[
      { id: "T2", label: R`T_2\ [\text{年}]`, min: 1, max: 3, step: 0.05, value: 2 },
      { id: "t0", label: R`t_0\ (N=2300)`, min: 1965, max: 1977, step: 0.1, value: 1971 },
    ]}
    series={p => [
      { label: R`\text{代表性处理器 / SoC}`, data: P.CHIPS.map(([t, n]) => [t, n]), points: true, color: "#1f1b16" },
      { label: R`\text{表 1.1 MPU（ITRS 2003 预测）}`, data: P.ITRS.year.map((t, i) => [t, P.ITRS.mpu[i] && P.ITRS.mpu[i] * 1e6]).filter(d => d[1]), points: true, color: "#c0392b" },
      { label: R`\text{Moore 1965：每年翻倍，1975 年 65000}`, f: t => (t <= 1976 ? 65000 * Math.pow(2, t - 1975) : NaN), color: "#2c6e49", dash: "dash" },
      { label: R`N(t)=2300\cdot2^{(t-t_0)/T_2}`, f: t => 2300 * Math.pow(2, (t - p.t0) / p.T2), color: "#2c4a6e" },
    ]}
    vlines={p => [{ x: 2022, label: R`N_{\rm fit}(2022)=${sci(2300 * Math.pow(2, (2022 - p.t0) / p.T2))}` }]}
    samples={200} />;
}

// ---------- 3. 图 1.18 交互版：I_DS–V_GS 半对数特性 ----------
export function IdVgPlot() {
  return <Plot
    x={{ label: R`V_{\rm GS}\ [\mathrm{V}]`, domain: [-0.1, 1.4] }}
    y={{ label: R`I_{\rm DS}\ [\mathrm{A}]`, log: true, domain: [1e-12, 1e-2] }}
    params={[
      { id: "n", label: R`n`, min: 1, max: 2, step: 0.001, value: 1.342 },
      { id: "Vth", label: R`V_{\rm TH}\ [\mathrm V]`, min: 0.15, max: 0.6, step: 0.01, value: 0.45 },
      { id: "Vdd", label: R`V_{\rm DD}\ [\mathrm V]`, min: 0.5, max: 1.4, step: 0.01, value: 1.0 },
      { id: "T", label: R`T\ [\mathrm K]`, min: 250, max: 400, step: 1, value: 300 },
    ]}
    series={p => {
      const Is = P.IsFromIth(1e-4), q = { n: p.n, Vth: p.Vth, T: p.T, Is };
      const Ioff = P.idsModel(0, q), Ion = P.idsModel(p.Vdd, q), S = P.swing(p.n, p.T) * 1000;
      const ideal = { n: 1, Vth: p.Vth, T: p.T, Is };
      return [
        { label: R`I_{\rm DS}\ (S=${S.toFixed(0)}\,\mathrm{mV/dec})`, f: v => P.idsModel(v, q), color: "#1f1b16" },
        { label: R`n=1\ \text{极限}\ (${(P.swing(1, p.T) * 1000).toFixed(0)}\,\mathrm{mV/dec})`, f: v => (v < p.Vth ? P.idsModel(v, ideal) : NaN), color: "#999", dash: "dash" },
        { label: R`I_{\rm OFF}=${sci(Ioff)}\,\mathrm A,\ I_{\rm ON}=${sci(Ion)}\,\mathrm A`, data: [[0, Ioff], [p.Vdd, Ion]], points: true, color: "#c0392b" },
        { label: R`I_{\rm ON}/I_{\rm OFF}=${sci(Ion / Ioff)};\ 10^{10}\ \text{管静态功耗}\ ${(1e10 * Ioff * p.Vdd).toPrecision(2)}\,\mathrm W`, f: () => NaN, color: "#2c6e49" },
      ];
    }}
    vlines={p => [{ x: p.Vth, label: R`V_{\rm TH}` }, { x: p.Vdd, label: R`V_{\rm DD}` }]}
    samples={300} height={420} />;
}

// ---------- 4. 广义缩放：电压跟不上尺寸时会怎样 ----------
export function ScalingPlot() {
  return <Plot
    x={{ label: R`\text{累计尺寸缩小倍数}\ \kappa`, log: true, domain: [1, 30] }}
    y={{ label: R`\text{相对原值的倍数}`, log: true, domain: [1e-3, 1e4] }}
    params={[
      { id: "b", label: R`\beta\ (\alpha=\kappa^{\beta})`, min: 0, max: 1, step: 0.01, value: 1 },
      { id: "m", label: R`\text{模型}\ m\ (1{:}\ \text{速度饱和},\ 2{:}\ \text{长沟道})`, min: 1, max: 2, step: 1, value: 2 },
    ]}
    series={p => {
      const mod = p.m >= 1.5 ? "long" : "vsat", s = k => P.scaling(k, Math.pow(k, p.b), mod);
      return [
        { label: R`\text{功率密度}\ P/(WL)`, f: k => s(k).Pd, color: "#c0392b", width: 2.5 },
        { label: R`\text{电场}\ \mathcal E`, f: k => s(k).E, color: "#b8862b" },
        { label: R`\text{单管功耗}\ P`, f: k => s(k).P, color: "#2c4a6e", dash: "dash" },
        { label: R`\text{门延迟}\ \tau`, f: k => s(k).tau, color: "#2c6e49", dash: "dashdot" },
        { label: R`\text{晶体管密度}\ \kappa^2`, f: k => k * k, color: "#999", dash: "dot" },
      ];
    }}
    vlines={() => [{ x: Math.SQRT2 ** 6, label: R`6\ \text{代}\ (\kappa=8)` }]}
    samples={120} />;
}

// ---------- 5. Dennard 缩放计算器（图 1.16 的表 + 任意 κ、α） ----------
const td = { padding: "4px 8px", borderBottom: "1px solid #e6dfd0", textAlign: "center" };
export function DennardCalc() {
  const [k, setK] = useState(2), [b, setB] = useState(1), [mod, setMod] = useState("long");
  const a = Math.pow(k, b), s = P.scaling(k, a, mod), d = P.scaling(k, k, "long");
  // 起点器件：大致取 1 μm 代（1980 年代后期）的典型参数
  const base = { L: 1000, tox: 25, V: 5, NA: 1e16 };
  const f = v => (v >= 100 ? v.toFixed(0) : v >= 10 ? v.toFixed(1) : v.toPrecision(3));
  const rows = [
    [R`\text{尺寸}\ L,\ W,\ t_{\rm ox}`, R`1/\kappa`, s.dim, d.dim, R`L=${f(base.L * s.dim)}\,\mathrm{nm},\ t_{\rm ox}=${f(base.tox * s.dim)}\,\mathrm{nm}`],
    [R`\text{掺杂}\ N_{\rm A}`, R`\kappa`, s.NA, d.NA, R`${sci(base.NA * s.NA)}\,\mathrm{cm^{-3}}`],
    [R`\text{电压}\ V`, R`1/\kappa`, s.V, d.V, R`${f(base.V * s.V)}\,\mathrm V`],
    [R`\text{电场}\ \mathcal E=V/L`, R`1`, s.E, d.E, ""],
    [R`\text{电流}\ I`, R`1/\kappa`, s.I, d.I, ""],
    [R`\text{电容}\ \varepsilon A/t_{\rm ox}`, R`1/\kappa`, s.C, d.C, ""],
    [R`\text{延迟}\ VC/I`, R`1/\kappa`, s.tau, d.tau, ""],
    [R`\text{功耗}\ VI`, R`1/\kappa^2`, s.P, d.P, ""],
    [R`\text{功率密度}\ VI/WL`, R`1`, s.Pd, d.Pd, ""],
    [R`\text{晶体管密度}`, R`\kappa^2`, s.density, d.density, ""],
  ];
  const btn = on => ({ padding: "4px 10px", borderRadius: 6, border: "1px solid " + (on ? "#2c4a6e" : "#c9c2b3"), background: on ? "#e3ecf5" : "#fffdf8", cursor: "pointer", marginRight: 6 });
  return <div className="card" style={{ padding: 14 }}>
    <DennardDevices k={k} />
    <label style={{ display: "block", margin: "8px 0" }}><M>{R`\kappa=${k.toFixed(2)}`}</M>（尺寸缩小倍数）
      <input type="range" min="1" max="10" step="0.01" value={k} onChange={e => setK(+e.target.value)} style={{ width: "100%" }} /></label>
    <label style={{ display: "block", margin: "8px 0" }}><M>{R`\alpha=\kappa^{${b.toFixed(2)}}=${a.toFixed(2)}`}</M>（电压缩小倍数；<M>{R`\beta=1`}</M> 为恒定电场，<M>{R`\beta=0`}</M> 为恒定电压）
      <input type="range" min="0" max="1" step="0.01" value={b} onChange={e => setB(+e.target.value)} style={{ width: "100%" }} /></label>
    <div style={{ margin: "6px 0 10px" }}>电流模型：
      <button style={btn(mod === "long")} onClick={() => setMod("long")}>长沟道 <M>{R`I\propto (W/L)C_{\rm ox}V^2`}</M></button>
      <button style={btn(mod === "vsat")} onClick={() => setMod("vsat")}>速度饱和 <M>{R`I\propto WC_{\rm ox}v_{\rm sat}V`}</M></button>
    </div>
    <div style={{ overflowX: "auto" }}><table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14 }}>
      <thead><tr>{["参数", "原书表（恒定电场）", "本设定的倍数", "恒定电场数值", "从 1 微米、5 V 器件出发"].map(h => <th key={h} style={{ ...td, background: "#f3efe6" }}>{h}</th>)}</tr></thead>
      <tbody>{rows.map(([name, book, v, dv, abs], i) => <tr key={i}>
        <td style={{ ...td, textAlign: "left" }}><M>{name}</M></td><td style={td}><M>{book}</M></td>
        <td style={{ ...td, fontWeight: 600, color: Math.abs(v - dv) / dv > 1e-6 ? "#c0392b" : "#1f1b16" }}><M>{sci(v, 2)}</M></td>
        <td style={td}><M>{sci(dv, 2)}</M></td><td style={td}>{abs && <M>{abs}</M>}</td></tr>)}</tbody>
    </table></div>
    <p style={{ fontSize: 13, color: "#6b6357", marginTop: 8 }}>红色数字表示与恒定电场缩放不同的项。起点器件的 <M>{R`L=1\,\mu\mathrm m`}</M>、<M>{R`t_{\rm ox}=25\,\mathrm{nm}`}</M>、<M>{R`V=5\,\mathrm V`}</M>、<M>{R`N_{\rm A}=10^{16}\,\mathrm{cm^{-3}}`}</M> 只是示意值。</p>
  </div>;
}

// 图 1.16 自绘：原器件与按 κ 缩小的器件（同一比例尺）
function DennardDevices({ k }) {
  const dev = (x0, s, label) => {
    const W = 300 * s, H = 150 * s, y0 = 40 + 150 - H; // 底部对齐
    const nW = 85 * s, ox = 8 * s, gx = x0 + W / 2 - 45 * s;
    return <g>
      <rect x={x0} y={y0 + 22 * s} width={W} height={H - 22 * s} fill="#d9dcdf" stroke="#555" />
      <path d={`M${x0 + 10 * s},${y0 + 22 * s} q0,${50 * s} ${nW / 2},${50 * s} q${nW / 2},0 ${nW / 2},-${50 * s}z`} fill="#8f9bb0" />
      <path d={`M${x0 + W - 10 * s - nW},${y0 + 22 * s} q0,${50 * s} ${nW / 2},${50 * s} q${nW / 2},0 ${nW / 2},-${50 * s}z`} fill="#8f9bb0" />
      <rect x={gx} y={y0 + 22 * s - ox} width={90 * s} height={ox} fill="#bfe0f5" stroke="#6a8ca3" strokeWidth="0.6" />
      <rect x={gx} y={y0 + 22 * s - ox - 14 * s} width={90 * s} height={14 * s} fill="#a0522d" />
      <text x={x0 + W / 2} y={y0 + H + 18} textAnchor="middle" fontSize="13">{label}</text>
    </g>;
  };
  return <svg viewBox="0 0 680 230" style={{ width: "100%", display: "block", fontFamily: "system-ui, sans-serif" }} role="img" aria-label="原器件与按比例缩小后的器件">
    {dev(20, 1, "原器件")}
    {dev(380, 1 / k, `缩小 ${k.toFixed(2)} 倍`)}
    <text x="20" y="22" fontSize="12" fill="#6b6357">灰：P 型 Si 衬底；蓝灰：N⁺ 源漏；浅蓝：栅氧；红棕：栅。所有尺寸（含栅氧厚度、结深）同比缩小。</text>
  </svg>;
}
