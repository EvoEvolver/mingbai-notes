// 附录 A.2–A.11 的交互工具：SiO2 颜色–厚度色卡、Irvin 曲线查询器、erf/erfc 计算器与表、可搜索的常数/性质/符号/缩写表。
import { useMemo, useState } from "react";
import { Plot, M, Table } from "@kit";
import { COLOR_CHART, filmColor, filmOrder, reflectance, nOx, irvinSigma, erf, erfc, erfcBook, sci } from "./_appA_phys.jsx";

const R = String.raw;
const box = { background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 10, padding: "12px 14px", margin: "10px 0" };
const btn = on => ({ padding: "4px 10px", margin: "2px 3px", borderRadius: 6, border: `1px solid ${on ? "#2c4a6e" : "#bbb"}`, background: on ? "#e2eef7" : "#fff", cursor: "pointer", fontSize: 13 });
const input = { padding: "5px 8px", border: "1px solid #ccc", borderRadius: 6, width: "100%", maxWidth: 360, boxSizing: "border-box", margin: "4px 0 8px" };

// ---------- 可搜索表格 ----------
export function SearchTable({ head, rows, caption, placeholder = "搜索…" }) {
  const [qv, setQ] = useState("");
  const list = qv ? rows.filter(r => r.join(" ").toLowerCase().includes(qv.toLowerCase())) : rows;
  return <div>
    <input style={input} placeholder={placeholder} value={qv} onChange={e => setQ(e.target.value)} />
    <Table head={head} rows={list.length ? list : [head.map((_, i) => (i ? "" : "（无匹配）"))]} caption={caption} />
  </div>;
}

// ---------- SiO2 色卡 ----------
export function OxideColorChart() {
  const [d, setD] = useState(310);
  const c = useMemo(() => filmColor(d), [d]);
  const strip = useMemo(() => Array.from({ length: 151 }, (_, i) => filmColor(i * 10).hex), []);
  const near = COLOR_CHART.reduce((a, b) => (Math.abs(b[0] - d) < Math.abs(a[0] - d) ? b : a));
  const lo = [...COLOR_CHART].reverse().find(r => r[0] <= d), hi = COLOR_CHART.find(r => r[0] >= d);
  return <div style={box}>
    <label style={{ fontSize: 13, display: "block" }}><M>{R`x_{ox} = ${d}\ \mathrm{nm}`}</M>
      <input type="range" min={0} max={1500} step={5} value={d} onChange={e => setD(+e.target.value)} style={{ width: "100%" }} /></label>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ width: 150, height: 110, borderRadius: 8, background: c.hex, border: "1px solid #aaa", boxShadow: "inset 0 0 12px rgba(0,0,0,.15)" }} title="按薄膜干涉公式计算的反射色" />
      <div style={{ fontSize: 14, lineHeight: 1.7 }}>
        <div>计算反射色：<code>{c.hex}</code>（视亮度 <M>{R`Y\approx${c.Y.toFixed(2)}`}</M>）</div>
        <div>干涉级次（计算定义）：第 <b>{filmOrder(d)}</b> 级</div>
        <div>原书最近条目：<b>{near[0]} nm</b> — {near[2]}（{near[1]}）</div>
        {lo && hi && lo !== hi && <div style={{ color: "#666" }}>落在 {lo[0]} nm「{lo[2]}」与 {hi[0]} nm「{hi[2]}」之间</div>}
      </div>
    </div>
    <svg viewBox="-10 -8 790 72" style={{ width: "100%", display: "block", marginTop: 10 }} role="img" aria-label="0 到 1500 nm 的计算色带与原书条目位置">
      {strip.map((h, i) => <rect key={i} x={5 + i * 5} y={4} width={5.2} height={30} fill={h} />)}
      {COLOR_CHART.map(r => <line key={r[0]} x1={5 + r[0] / 2} x2={5 + r[0] / 2} y1={34} y2={42} stroke="#333" />)}
      <polygon points={`${5 + d / 2},2 ${5 + d / 2 - 5},-6 ${5 + d / 2 + 5},-6`} fill="#000" />
      <line x1={5 + d / 2} x2={5 + d / 2} y1={2} y2={36} stroke="#000" strokeWidth="1.5" />
      {[0, 250, 500, 750, 1000, 1250, 1500].map(t => <text key={t} x={5 + t / 2} y={58} fontSize="11" textAnchor="middle">{t}</text>)}
    </svg>
    <p style={{ fontSize: 12, margin: "4px 0 0" }}>色带由下式计算（正入射，空气 / <M>{R`\mathrm{SiO_2}`}</M> / Si 三层膜，<M>{R`\mathrm{SiO_2}`}</M> 用 Malitson 色散式、Si 用室温 <M>{R`\tilde n=n-\mathrm{i}\,k`}</M> 的粗插值，光源取 6500 K 黑体近似日光、CIE 1931 色匹配函数的解析拟合），短竖线是原书色表条目的位置。屏幕显示经过亮度归一化，只是<b>近似</b>：真实观感还取决于光源（原书为日光型荧光灯）、观察角和显示器。</p>
  </div>;
}
export function OxideColorTable() {
  const [qv, setQ] = useState("");
  const rows = COLOR_CHART.filter(r => !qv || (r.join(" ")).toLowerCase().includes(qv.toLowerCase()));
  return <div>
    <input style={input} placeholder="按厚度或颜色搜索，如 blue、绿、500" value={qv} onChange={e => setQ(e.target.value)} />
    <div className="tb-table-wrap"><table className="tb-table" style={{ fontSize: 14 }}><thead><tr><th>厚度 (nm)</th><th>原书颜色</th><th>中文</th><th>计算色</th><th>级次</th></tr></thead>
      <tbody>{rows.map(r => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td><span style={{ display: "inline-block", width: 46, height: 18, background: filmColor(r[0]).hex, border: "1px solid #999", verticalAlign: "middle" }} /></td><td>{filmOrder(r[0])}</td></tr>)}</tbody></table></div>
  </div>;
}
export function OxideReflectancePlot() {
  return <Plot x={{ label: R`\lambda\ (\mathrm{nm})`, domain: [380, 780] }} y={{ label: R`R(\lambda)`, domain: [0, 0.6] }}
    params={[{ id: "d", label: R`x_{ox}\,(\mathrm{nm})`, min: 0, max: 1500, step: 5, value: 310 }]}
    series={p => [{ label: R`R(\lambda)`, f: l => reflectance(l, p.d), color: "#2c4a6e" }, { label: R`\text{裸硅}`, f: l => reflectance(l, 0), color: "#999", dash: "dash" }]}
    vlines={p => Array.from({ length: 12 }, (_, m) => 2 * nOx(550) * p.d / (m + 0.5)).filter(l => l > 380 && l < 780).map(l => ({ x: l, label: R`\text{极小}` }))}
    caption={R`氧化层厚度决定反射谱中"缺掉"哪些颜色：竖线标出由 $2n_{ox}x_{ox}=(m+\tfrac12)\lambda$ 估计的反射极小。厚度 310 nm 时极小落在约 600 nm（橙红），剩下的光偏蓝——原书色表正是"Blue"。膜越厚，可见区内的极小越多，颜色越淡、越难辨认，所以色表在 $1\,\mu\mathrm{m}$ 以上越来越不可靠。`} />;
}

// ---------- Irvin 曲线 ----------
export function IrvinTool() {
  const [type, setType] = useState("n"), [prof, setProf] = useState("erfc");
  const [Cs, setCs] = useState(1e20), [CB, setCB] = useState(1e16), [xj, setXj] = useState(1.0);
  const r = irvinSigma(Cs, CB, type, prof);
  const sig = r.sigma, rs = sig ? 1 / (sig * xj * 1e-4) : NaN;
  const curves = useMemo(() => [1e14, 1e16, 1e18].map(cb => {
    const ys = []; for (let e = Math.log10(cb) + 0.6; e <= 21.0001; e += 0.05) { const c = Math.pow(10, e), s = irvinSigma(c, cb, type, prof).sigma; ys.push([s, c]); }
    return ys;
  }), [type, prof]);
  const L = (lab, v, set, mn, mx) => <label style={{ display: "block", fontSize: 13, margin: "6px 0" }}><M>{`${lab} = ${sci(v)}\\ \\mathrm{cm^{-3}}`}</M>
    <input type="range" min={mn} max={mx} step={0.01} value={Math.log10(v)} onChange={e => set(Math.pow(10, +e.target.value))} style={{ width: "100%" }} /></label>;
  return <div style={box}>
    <div style={{ fontSize: 13 }}>扩散层类型：{[["n", "N 型（As）"], ["p", "P 型（B）"]].map(([k, l]) => <button key={k} style={btn(type === k)} onClick={() => setType(k)}>{l}</button>)}
      　分布：{[["erfc", "erfc（恒定表面源）"], ["gauss", "Gaussian（限定源）"]].map(([k, l]) => <button key={k} style={btn(prof === k)} onClick={() => setProf(k)}>{l}</button>)}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "0 18px" }}>
      <div>
        {L("C_S", Cs, setCs, 17, 21)}
        {L("C_B", CB, setCB, 14, 18)}
        <label style={{ display: "block", fontSize: 13, margin: "6px 0" }}><M>{R`x_j = ${xj.toFixed(2)}\ \mu\mathrm{m}`}</M>
          <input type="range" min={0.02} max={5} step={0.01} value={xj} onChange={e => setXj(+e.target.value)} style={{ width: "100%" }} /></label>
      </div>
      <table className="tb-table" style={{ fontSize: 14 }}><tbody>
        <tr><td><M>{R`\bar\sigma`}</M></td><td>{Number.isFinite(sig) ? <M>{R`${sig.toPrecision(3)}\ (\mathrm{\Omega}\,\mathrm{cm})^{-1}`}</M> : "需要 C_S > C_B"}</td></tr>
        <tr><td><M>{R`\rho_S x_j=1/\bar\sigma`}</M></td><td>{Number.isFinite(sig) && <M>{R`${(1e4 / sig).toPrecision(3)}\ \mathrm{\Omega}\cdot\mu\mathrm{m}`}</M>}</td></tr>
        <tr><td><M>{R`\rho_S`}</M></td><td>{Number.isFinite(rs) && <M>{R`${rs.toPrecision(3)}\ \mathrm{\Omega}/\square`}</M>}</td></tr>
        <tr><td><M>{R`x_j/2\sqrt{Dt}`}</M></td><td>{Number.isFinite(sig) && <M>{R`${r.uj.toFixed(3)}`}</M>}</td></tr>
      </tbody></table>
    </div>
    <Plot x={{ label: R`\bar\sigma\ (\mathrm{\Omega}\,\mathrm{cm})^{-1}`, log: true, domain: [1, 2000] }} y={{ label: R`C_S\ (\mathrm{cm^{-3}})`, log: true, domain: [1e17, 1e21] }}
      series={[
        { label: R`C_B=10^{14}`, data: curves[0], color: "#2c4a6e" }, { label: R`C_B=10^{16}`, data: curves[1], color: "#c0392b" }, { label: R`C_B=10^{18}`, data: curves[2], color: "#2c6e49" },
        ...(Number.isFinite(sig) ? [{ label: R`\text{当前}`, data: [[sig, Cs]], points: true, color: "#000" }] : []),
      ]}
      caption={R`按定义 $\bar\sigma=\dfrac{1}{x_j}\int_0^{x_j}q\,\mu\big(N(x)+C_B\big)\,\big[N(x)-C_B\big]\,dx$ 在浏览器中重新积分得到的 Irvin 曲线（300 K，Masetti 迁移率）。坐标轴与原书图 A8.1–A8.4 相同：纵轴表面浓度、横轴平均电导率。与原书曲线对照，量级与走势一致，个别点相差约 20–30%，来源是迁移率模型不同（Irvin 1962 用的是当时的实测迁移率）。实际工艺中应以四探针测得的 $\rho_S$ 为准。`} />
  </div>;
}

// ---------- erf / erfc ----------
export function ErfCalc() {
  const [x, setX] = useState(1.0);
  const e = erf(x), c = erfc(x), a = erfcBook(Math.abs(x)), ex = x >= 0 ? c : 2 - c;
  return <div style={box}>
    <label style={{ fontSize: 13, display: "block" }}><M>{R`x = ${x.toFixed(2)}`}</M>
      <input type="range" min={-3} max={5} step={0.01} value={x} onChange={ev => setX(+ev.target.value)} style={{ width: "100%" }} /></label>
    <table className="tb-table" style={{ fontSize: 14 }}><tbody>
      <tr><td><M>{R`\mathrm{erf}(x)`}</M></td><td><M>{e.toFixed(6)}</M></td></tr>
      <tr><td><M>{R`\mathrm{erfc}(x)=1-\mathrm{erf}(x)`}</M></td><td><M>{sci(ex, 6)}</M></td></tr>
      <tr><td>原书近似 <M>{R`1.1e^{-x^2}/(|x|+\sqrt{x^2+1.21})`}</M></td><td>{x >= 0 ? <M>{R`${sci(a, 4)}\quad(\text{误差 }${((a / c - 1) * 100).toFixed(2)}\%)`}</M> : <>仅适用于 <M>{R`x\ge0`}</M>（负 <M>{R`x`}</M> 用 <M>{R`\mathrm{erfc}(-x)=2-\mathrm{erfc}(x)`}</M>）</>}</td></tr>
      <tr><td>大 <M>{R`x`}</M> 渐近 <M>{R`e^{-x^2}/(x\sqrt\pi)`}</M></td><td>{x > 0 && <M>{R`${sci(Math.exp(-x * x) / (x * Math.sqrt(Math.PI)), 4)}\quad(\text{误差 }${((Math.exp(-x * x) / (x * Math.sqrt(Math.PI)) / c - 1) * 100).toFixed(1)}\%)`}</M>}</td></tr>
      <tr><td>小 <M>{R`x`}</M> 近似 <M>{R`2x/\sqrt\pi`}</M></td><td><M>{R`${(2 * x / Math.sqrt(Math.PI)).toFixed(6)}`}</M></td></tr>
    </tbody></table>
  </div>;
}
export function ErfPlot() {
  return <Plot x={{ label: R`x`, domain: [-3, 3] }} y={{ label: R`\text{函数值}`, domain: [-1.05, 2.05] }}
    series={() => [
      { label: R`\mathrm{erf}(x)`, f: erf, color: "#2c4a6e" },
      { label: R`\mathrm{erfc}(x)`, f: erfc, color: "#c0392b" },
      { label: R`\tfrac{2}{\sqrt\pi}e^{-x^2}`, f: v => 2 / Math.sqrt(Math.PI) * Math.exp(-v * v), color: "#2c6e49", dash: "dash" },
    ]}
    caption={R`$\mathrm{erf}$（原书图 A9.1）、$\mathrm{erfc}$ 与它们的导数 $\pm\tfrac{2}{\sqrt\pi}e^{-x^2}$。在扩散一章里，$C(x,t)=C_S\,\mathrm{erfc}\big(x/2\sqrt{Dt}\big)$ 就是红线的右半支。`} />;
}
export function ErfTable() {
  const [blk, setBlk] = useState(0);
  const start = blk * 100, rows = [];
  for (let i = 0; i < 34; i++) {
    const r = [];
    for (let c = 0; c < 3; c++) { const k = start + i + c * 34; if (k <= start + 99 || (blk === 2 && k === 300)) { const z = k / 100; r.push(z.toFixed(2), erf(z).toFixed(6)); } else r.push("", ""); }
    if (r.some(v => v)) rows.push(r);
  }
  return <div>
    <div style={{ fontSize: 13 }}>{["0.00–0.99", "1.00–1.99", "2.00–3.00"].map((t, i) => <button key={t} style={btn(blk === i)} onClick={() => setBlk(i)}>{t}</button>)}</div>
    <Table head={["$z$", "$\\mathrm{erf}(z)$", "$z$", "$\\mathrm{erf}(z)$", "$z$", "$\\mathrm{erf}(z)$"]} rows={rows}
      caption="按原书 A.9 表的格式（步长 0.01）在浏览器中计算。与原书 301 个表值逐项比对：全部一致，仅 5 处末位相差 1（四舍五入差异）。" />
  </div>;
}
