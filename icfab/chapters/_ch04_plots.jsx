// 第 4 章交互图。数值函数见 _ch04_phys.jsx（已用 node 与原书例题、表 4.2、图 4.23 核对）。
import { useMemo, useState } from "react";
import { Plot, M } from "@kit";
import * as P from "./_ch04_phys.jsx";

const R = String.raw;
const sci = (v, d = 2) => { if (!Number.isFinite(v)) return R`\infty`; if (v === 0) return "0"; const e = Math.floor(Math.log10(Math.abs(v))), m = v / 10 ** e; return Math.abs(e) <= 2 ? (+v.toPrecision(d + 1)).toString() : R`${m.toFixed(d)}\times10^{${e}}`; };
const f2 = (v, d = 2) => (+v).toFixed(d);

// ---------- 1. 式 (4.3) 与表 4.2：ISO 洁净度等级 ----------
export function IsoPlot() {
  return <Plot
    x={{ label: R`\text{颗粒直径}\ \sym{ch04-dsz}{D}\ [\mu\mathrm m]`, log: true, domain: [0.05, 10] }}
    y={{ label: R`\text{每}\ \mathrm{m^3}\ \text{中}\ \geq \sym{ch04-dsz}{D}\ \text{的颗粒数}`, log: true, domain: [0.1, 1e9] }}
    params={[{ id: "N", label: R`\text{ISO 等级}\ N`, min: 1, max: 9, step: 1, value: 5 }]}
    series={p => {
      const N = Math.round(p.N), row = P.ISO_TABLE[N] || [];
      return [
        { label: R`\text{式 (4.3)},\ N=${N}`, f: d => P.isoCount(N, d) },
        { label: R`\text{表 4.2 中 ISO ${N} 的数据}`, data: P.ISO_SIZES.map((d, i) => [d, row[i]]).filter(([, v]) => v), points: true, color: "#c0392b" },
        { label: R`\text{ISO 1（先进产线关键区）}`, f: d => P.isoCount(1, d), dash: "dot", color: "#2c6e49", width: 1.5 },
        { label: R`\text{ISO 8（普通办公室）}`, f: d => P.isoCount(8, d), dash: "dot", color: "#999", width: 1.5 },
      ];
    }}
    vlines={p => { const N = Math.round(p.N), ft3 = P.isoCount(N, 0.5) * 0.0283168;
      return [{ x: 0.5, label: R`\geq0.5\,\mu\mathrm m:\ ${sci(ft3, 1)}/\mathrm{ft^3}` }]; }}
    caption={R`拖动 $N$：直线的斜率恒为 $-2.08$（对数坐标），等级每升 1 级整条线上移 10 倍。红点是表 4.2 的原始数据（已改正 ISO 5 的印刷错误），与式 (4.3) 吻合到取整。竖线读出 $\geq0.5\,\mu$m 颗粒在每立方英尺中的个数——这正是旧标准 FS209 "Class X" 的定义：ISO 5 相当于 Class 100，ISO 6 相当于 Class 1000。`}
    samples={120} />;
}

// ---------- 2. 图 4.23 交互版：良率模型对比 ----------
export function YieldModelsPlot() {
  return <Plot
    x={{ label: R`\text{芯片（关键）面积}\ A_C\ [\mathrm{cm^2}]`, domain: [0, 10] }}
    y={{ label: R`\text{良率}\ Y`, log: true, domain: [0.01, 1] }}
    params={[
      { id: "D", label: R`D_{\rm O}\ [\mathrm{cm^{-2}}]`, min: 0.01, max: 2, log: true, value: 0.5 },
      { id: "C", label: R`C`, min: 0.3, max: 30, log: true, value: 2 },
    ]}
    series={p => [
      { label: R`\text{Poisson (4.20)}`, f: A => P.yPoisson(A, p.D), color: "#1f1b16" },
      { label: R`\text{负二项}\ C=${f2(p.C, 1)}\ \text{(4.22)}`, f: A => P.yNB(A, p.D, p.C), color: "#c0392b" },
      { label: R`\text{负二项}\ C=10`, f: A => P.yNB(A, p.D, 10), color: "#b8862b", dash: "dash", width: 1.5 },
      { label: R`\text{Seeds (4.23)}`, f: A => P.ySeeds(A, p.D), color: "#2c4a6e" },
      { label: R`\text{Murphy 三角分布（拓展）}`, f: A => P.yMurphy(A, p.D), color: "#2c6e49", dash: "dot" },
    ]}
    vlines={p => [{ x: 1 / p.D, label: R`A_CD_{\rm O}=1` }]}
    caption={R`默认 $D_{\rm O}=0.5\,\mathrm{cm^{-2}}$、$C=2$ 即原书图 4.23 上图：$A_C=10\,\mathrm{cm^2}$ 处 Poisson 0.0067、$C=10$ 为 0.017、$C=2$ 为 0.082、Seeds 0.167。把 $D_{\rm O}$ 调到 0.1 得到下图（Poisson 0.37、$C=2$ 为 0.44、Seeds 0.50）。竖线 $A_CD_{\rm O}=1$（每片芯片平均一个缺陷）之前各模型差别很小，之后迅速分开——**大芯片的良率由缺陷是否聚集决定**。把 $C$ 拉到 30 看它贴近 Poisson，拉到 1 看它与 Seeds 重合。`}
    samples={200} />;
}

// ---------- 3. 式 (4.26)：多道工序的累积良率 ----------
export function CumYieldPlot() {
  return <Plot
    x={{ label: R`\text{关键工序（层）数}\ n`, domain: [1, 200] }}
    y={{ label: R`\text{总良率}\ Y`, domain: [0, 1] }}
    params={[
      { id: "AD", label: R`\text{每道工序}\ A_{{\rm C}i}D_{{\rm O}i}`, min: 0.001, max: 0.1, log: true, value: 0.01 },
      { id: "C", label: R`C_i=C`, min: 0.5, max: 20, log: true, value: 2 },
    ]}
    series={p => [
      { label: R`\text{逐道连乘}\ \prod(1+A_{{\rm C}i}D_{{\rm O}i}/C)^{-C}`, f: n => Math.pow(1 + p.AD / p.C, -p.C * n), color: "#c0392b" },
      { label: R`\text{(4.26) 右端近似}`, f: n => Math.pow(1 + n * p.AD / p.C, -p.C), color: "#2c4a6e", dash: "dash" },
      { label: R`\text{Poisson}\ e^{-nA_CD_{\rm O}}`, f: n => Math.exp(-n * p.AD), color: "#1f1b16", dash: "dot" },
    ]}
    vlines={p => [{ x: 50, label: R`n=50:\ ${f2(100 * Math.pow(1 + p.AD / p.C, -p.C * 50), 0)}\%` }]}
    caption={R`默认每道工序 $A_CD_{\rm O}=0.01$（单步良率约 99%）：50 道之后只剩约 60%，正是原书 $(0.99)^{50}\approx60\%$ 的估算。把单步损失加到 0.05（单步 95%），50 道后只剩百分之几。蓝虚线是式 (4.26) 右端的"合并"近似，它与逐道连乘只在 $nA_CD_{\rm O}/C\ll1$ 时一致（见正文的讨论）。`}
    samples={200} />;
}

// ---------- 4. 晶圆上随机缺陷的 Monte Carlo ----------
export function WaferMC() {
  const [D0, setD0] = useState(0.3), [A, setA] = useState(1.5), [mode, setMode] = useState("poisson"), [C, setC] = useState(2), [seed, setSeed] = useState(1);
  const [acc, setAcc] = useState({ good: 0, total: 0, n: 0, key: "" });
  const Rw = 15, edge = 0.3, Reff = Rw - edge;
  const sim = useMemo(() => {
    const r = P.rng(seed * 7919 + 13), s = Math.sqrt(A), dies = [];
    const n = Math.ceil(Rw / s) + 1;
    for (let i = -n; i < n; i++) for (let j = -n; j < n; j++) {
      const x0 = i * s - s / 2 + (n % 2 ? 0 : 0), y0 = j * s;    // 网格原点在晶圆中心附近
      const cs = [[x0, y0], [x0 + s, y0], [x0, y0 + s], [x0 + s, y0 + s]];
      if (cs.every(([x, y]) => x * x + y * y <= Reff * Reff)) dies.push({ x0, y0, i, j, bad: false });
    }
    const defects = [];
    if (mode === "poisson") {
      const N = P.poissonS(D0 * Math.PI * Rw * Rw, r);
      for (let k = 0; k < N; k++) { let x, y; do { x = (2 * r() - 1) * Rw; y = (2 * r() - 1) * Rw; } while (x * x + y * y > Rw * Rw); defects.push([x, y]); }
    } else {      // 聚集：以 k×k 个芯片为一块，每块的缺陷密度服从均值 D0、形状 C 的 Gamma 分布
      const k = Math.max(1, Math.round(3 / s)), L = k * s, m = Math.ceil(Rw / L) + 1;
      for (let a = -m; a < m; a++) for (let b = -m; b < m; b++) {
        const dens = D0 * P.gammaS(C, r) / C, x0 = a * L - s / 2, y0 = b * L, N = P.poissonS(dens * L * L, r);
        for (let q = 0; q < N; q++) { const x = x0 + r() * L, y = y0 + r() * L; if (x * x + y * y <= Rw * Rw) defects.push([x, y]); }
      }
    }
    const key = (d) => `${Math.floor((d[0] + s / 2) / s)},${Math.floor(d[1] / s)}`;
    const map = new Map(dies.map(d => [`${d.i},${d.j}`, d]));
    for (const d of defects) { const die = map.get(key(d)); if (die) die.bad = true; }
    const good = dies.filter(d => !d.bad).length;
    return { dies, defects, good, total: dies.length, s };
  }, [D0, A, mode, C, seed]);
  const pkey = `${D0}|${A}|${mode}|${C}`;
  const cum = acc.key === pkey ? acc : { good: 0, total: 0, n: 0, key: pkey };
  const S = 400 / (2 * Rw), cx = 210, cy = 210, X = x => cx + x * S, Y = y => cy - y * S;
  const Ymc = sim.good / sim.total, Ycum = (cum.good + sim.good) / (cum.total + sim.total);
  const Ctxt = mode === "poisson" ? null : C;
  const slider = (lab, v, set, min, max, step, fmt) => <label className="plot-param"><span className="plot-plabel">{lab} = {fmt(v)}</span><input type="range" min={min} max={max} step={step} value={v} onChange={e => set(+e.target.value)} /></label>;
  return <div className="plot card wafer-mc">
    <div className="plot-params">
      {slider(<>缺陷密度 <M>{R`D_{\rm O}\,[\mathrm{cm^{-2}}]`}</M></>, D0, setD0, 0.02, 2, 0.01, v => v.toFixed(2))}
      {slider(<>芯片面积 <M>{R`A_C\,[\mathrm{cm^{2}}]`}</M></>, A, setA, 0.1, 8, 0.05, v => v.toFixed(2))}
      <div className="seg" style={{ display: "inline-flex", gap: 4 }}>
        <button className={mode === "poisson" ? "on" : ""} onClick={() => setMode("poisson")}>均匀随机（Poisson）</button>
        <button className={mode === "cluster" ? "on" : ""} onClick={() => setMode("cluster")}>成团分布（Gamma 混合）</button>
      </div>
      {mode === "cluster" && slider("聚集因子 C", C, setC, 0.5, 10, 0.1, v => v.toFixed(1))}
      <button className="plot-reset" onClick={() => { setAcc({ good: cum.good + sim.good, total: cum.total + sim.total, n: cum.n + 1, key: pkey }); setSeed(seed + 1); }}>再撒一片晶圆（累计）</button>
      <button className="plot-reset" onClick={() => { setAcc({ good: 0, total: 0, n: 0, key: pkey }); setSeed(seed + 1); }}>清零</button>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      <svg viewBox="0 0 420 420" style={{ width: "100%", maxWidth: 420 }} role="img" aria-label="300 mm 晶圆上的芯片网格与随机缺陷">
        <circle cx={cx} cy={cy} r={Rw * S} fill="#e9ecef" stroke="#555" />
        <path d={`M${cx - 1.2 * S},${cy + Rw * S - 1} a${1.2 * S},${1.2 * S} 0 0 1 ${2.4 * S},0`} fill="#fff" stroke="#555" />
        {sim.dies.map((d, i) => <rect key={i} x={X(d.x0)} y={Y(d.y0 + sim.s)} width={sim.s * S} height={sim.s * S} fill={d.bad ? "#f3b7b0" : "#a8d5b0"} stroke="#fff" strokeWidth={sim.s * S > 6 ? 0.8 : 0.3} />)}
        {sim.defects.map(([x, y], i) => <circle key={"d" + i} cx={X(x)} cy={Y(y)} r={1.4} fill="#1f1b16" />)}
      </svg>
      <div style={{ flex: "1 1 220px", fontSize: 14, lineHeight: 1.7 }}>
        <div>完整芯片数：<b>{sim.total}</b>　缺陷数：<b>{sim.defects.length}</b></div>
        <div>本片良率（Monte Carlo）：<b>{(100 * Ymc).toFixed(1)}%</b></div>
        <div>累计 {cum.n + 1} 片平均：<b>{(100 * Ycum).toFixed(1)}%</b></div>
        <hr />
        <div><M>{R`A_CD_{\rm O}=${(A * D0).toFixed(3)}`}</M></div>
        <div>Poisson <M>{R`e^{-A_CD_{\rm O}}`}</M>：<b>{(100 * P.yPoisson(A, D0)).toFixed(1)}%</b></div>
        {Ctxt && <div>负二项（<M>{R`C=${Ctxt.toFixed(1)}`}</M>）：<b>{(100 * P.yNB(A, D0, Ctxt)).toFixed(1)}%</b></div>}
        <div>Seeds：<b>{(100 * P.ySeeds(A, D0)).toFixed(1)}%</b></div>
        <p className="muted" style={{ fontSize: 12.5 }}>绿色＝无缺陷芯片，红色＝至少落入一个缺陷。晶圆直径 300 mm、边缘去除 3 mm；只统计完整落在可用区内的芯片。成团模式中把晶圆切成约 3 cm 见方的块，每块的局部缺陷密度从均值 <M>{R`D_{\rm O}`}</M>、形状参数 <M>{R`C`}</M> 的 Gamma 分布抽取——这正是负二项模型背后的假设。</p>
      </div>
    </div>
  </div>;
}

// ---------- 5. 图 4.16 交互版：Arrhenius 图 ----------
const ARR = ["Cu", "AuI", "Fe", "Cr", "AuS", "Ti", "BP", "As", "Si"];
export function ArrheniusPlot() {
  return <Plot
    x={{ label: R`1000/T\ [\mathrm K^{-1}]`, domain: [0.65, 1.0] }}
    y={{ label: R`D\ [\mathrm{cm^2/s}]`, log: true, domain: [1e-16, 1e-3] }}
    params={[{ id: "T", label: R`T\ [^\circ\mathrm C]`, min: 727, max: 1265, step: 1, value: 1000 }]}
    series={() => [
      ...ARR.map(s => ({ label: P.SPECIES[s].label, f: u => P.Dfig(s, 1000 / u), color: P.SPECIES[s].color, width: P.SPECIES[s].metal ? 2.4 : 1.8 })),
      { label: R`\mathrm I\ \text{(式 3.6)}`, f: u => P.DI(1000 / u), color: "#c0392b", dash: "dash" },
      { label: R`\mathrm{O_I}\ \text{(式 4.11)}`, f: u => P.DOi(1000 / u), color: "#16808a", dash: "dashdot" },
    ]}
    vlines={p => [{ x: 1000 / P.K(p.T), label: R`${p.T}^\circ\mathrm C` }]}
    caption={R`各线为对原书图 4.16 的读图拟合（每条线取两端读数，$\log_{10}D$ 对 $1000/T$ 线性），虚线为式 (3.6) 的自间隙原子 I、点划线为式 (4.11) 的间隙氧。由斜率反推的激活能：Cu 0.43 eV、Au$_\mathrm I$ 0.39 eV、Fe 0.69 eV、Ti 1.5 eV、B/P 3.5 eV、Si 自扩散 4.5 eV，与文献值一致。悬停读取任意温度下各物种的 $D$；竖线随滑块移动。`}
    samples={120} />;
}

// ---------- 6. 扩散长度：多快能走完一片晶圆 ----------
const DL = [["Cu", "Cu"], ["AuI", R`\mathrm{Au_I}`], ["Fe", "Fe"], ["Ti", "Ti"], ["AuS", R`\mathrm{Au_S}`], ["BP", "B,\\ P"]];
export function DiffLengthPlot() {
  return <Plot
    x={{ label: R`\text{时间}\ t\ [\mathrm s]`, log: true, domain: [1, 1e5] }}
    y={{ label: R`\text{扩散长度}\ 2\sqrt{Dt}\ [\mu\mathrm m]`, log: true, domain: [1e-3, 1e5] }}
    params={[{ id: "T", label: R`T\ [^\circ\mathrm C]`, min: 700, max: 1200, step: 5, value: 1000 }]}
    series={p => { const TK = P.K(p.T); return [
      ...DL.map(([s, lab]) => ({ label: R`\mathrm{${lab}}`, f: t => 2 * Math.sqrt(P.Dfig(s, TK) * t) * 1e4, color: P.SPECIES[s].color })),
      { label: R`\mathrm I`, f: t => 2 * Math.sqrt(P.DI(TK) * t) * 1e4, color: "#c0392b", dash: "dash" },
      { label: R`\text{晶圆厚度 775}\,\mu\mathrm m`, f: () => 775, color: "#999", dash: "dot", width: 1.5 },
      { label: R`\text{结深 1}\,\mu\mathrm m`, f: () => 1, color: "#bbb", dash: "dot", width: 1.5 },
    ]; }}
    vlines={[{ x: 3600, label: R`1\,\mathrm h` }]}
    caption={R`在同一次热处理中，掺杂原子（B、P）只走了不到 1 µm，Cu、Fe 与间隙态的 Au 却能在几秒到几分钟内穿透整片 775 µm 厚的 300 mm 晶圆——这就是"金属污染会传遍全片"和"吸杂可行"的同一枚硬币的两面。Ti 与替位态 Au 慢得多：它们难以被吸杂。`}
    samples={80} />;
}

// ---------- 7. 洁净区：间隙氧的外扩散 ----------
export function DenudedZonePlot() {
  return <Plot
    x={{ label: R`\text{距表面深度}\ x\ [\mu\mathrm m]`, domain: [0, 60] }}
    y={{ label: R`[\mathrm{O_I}]\ [10^{17}\,\mathrm{cm^{-3}}]`, domain: [0, 12] }}
    params={[
      { id: "T", label: R`T\ [^\circ\mathrm C]`, min: 1000, max: 1250, step: 5, value: 1150 },
      { id: "t", label: R`t\ [\mathrm h]`, min: 0.25, max: 16, log: true, value: 4 },
      { id: "C0", label: R`[\mathrm O]_0\ [\mathrm{ppma}]`, min: 10, max: 24, step: 0.5, value: 20 },
      { id: "th", label: R`\text{沉淀阈值}\ [\mathrm{ppma}]`, min: 6, max: 18, step: 0.5, value: 12 },
    ]}
    series={p => { const TK = P.K(p.T), D = P.DOi(TK), Cs = P.CsO(TK), C0 = p.C0 * P.PPMA, t = p.t * 3600; return [
      { label: R`[\mathrm{O_I}](x)`, f: x => P.outdiff(C0, Cs, D, t, x) / 1e17, color: "#16808a" },
      { label: R`\text{阈值}`, f: () => p.th * P.PPMA / 1e17, color: "#c0392b", dash: "dash", width: 1.5 },
      { label: R`C_{\rm O}^*(T)=${sci(Cs, 1)}`, f: () => Cs / 1e17, color: "#999", dash: "dot", width: 1.5 },
    ]; }}
    vlines={p => { const TK = P.K(p.T), d = P.dzDepth(p.C0 * P.PPMA, P.CsO(TK), P.DOi(TK), p.t * 3600, p.th * P.PPMA);
      return Number.isFinite(d) && d > 0 ? [{ x: Math.min(d, 59.5), label: R`\text{洁净区}\approx${f2(d, 1)}\,\mu\mathrm m` }] : []; }}
    caption={R`模型：表面的间隙氧浓度被拉到该温度的固溶度 $C_{\rm O}^*$（式 4.10），体内初值 $[\mathrm O]_0$，以式 (4.11) 的 $D_{{\rm O}_{\rm I}}$ 做余误差函数外扩散；浓度低于"沉淀阈值"的表层即洁净区。1150 ˚C、4 h 时 $2\sqrt{Dt}\approx29\,\mu$m。注意洁净区深度对阈值非常敏感（原书：约 10 ppm 以下不易沉淀；1 ppma $=5\times10^{16}\,\mathrm{cm^{-3}}$），这也是实际工艺要靠实验标定的原因。`}
    samples={160} />;
}

// ---------- 8. 图 4.20 交互版：背面理想陷阱的外扩散 ----------
export function SinkPlot() {
  return <Plot
    x={{ label: R`\text{距晶圆背面}\ x\ [\mu\mathrm m]`, domain: [0, 500] }}
    y={{ label: R`\text{可动金属浓度}\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e13, 1e16] }}
    params={[
      { id: "D", label: R`D\ [\mathrm{cm^2/s}]`, min: 1e-9, max: 1e-5, log: true, value: 1e-7 },
      { id: "t", label: R`t_1\ [\mathrm s]`, min: 1, max: 3000, log: true, value: 60 },
    ]}
    series={p => [1, 4, 16, 64].map((m, i) => ({ label: R`t_${i + 1}=${m}t_1\ (2\sqrt{Dt}=${f2(2e4 * Math.sqrt(p.D * p.t * m), 0)}\,\mu\mathrm m)`, f: x => Math.max(1e12, P.sinkProfile(1e15, p.D, p.t * m, 500, x)), color: ["#1f1b16", "#2c4a6e", "#b8862b", "#c0392b"][i] }))}
    caption={R`500 µm 厚的晶圆初始均匀含 $10^{15}\,\mathrm{cm^{-3}}$ 金属；背面 $x=0$ 为理想陷阱（浓度保持为零），正面 $x=500\,\mu$m 无流。用分离变量级数精确求解扩散方程（第 7 章会系统讲）。时间每取 4 倍，耗尽区向内推进约一倍（$\propto\sqrt t$）；当 $2\sqrt{Dt}$ 与片厚相当时，整片的浓度开始一起下降——与原书 Athena 模拟的图形相同。`}
    samples={160} />;
}

// ---------- 9. 图 4.21 的定性模型：自间隙注入限制的"陡峭前沿" ----------
export function FrontPlot() {
  return <Plot
    x={{ label: R`\text{距晶圆背面深度}\ [\mu\mathrm m]`, domain: [0, 150] }}
    y={{ label: R`[\mathrm{Au}]/[\mathrm{Au}]_0`, domain: [0, 1.1] }}
    params={[{ id: "DI", label: R`D_{\rm I}^{\rm eff}\ [\mathrm{cm^2/s}]`, min: 1e-10, max: 1e-7, log: true, value: 5e-9 }]}
    series={p => [5, 12, 20, 25, 30, 60].map((m, i) => ({ label: R`${m}\,\mathrm{min}`, f: x => Math.exp(-5 * P.erfc(x * 1e-4 / (2 * Math.sqrt(p.DI * m * 60)))), color: ["#1f1b16", "#2c4a6e", "#2c6e49", "#b8862b", "#d35400", "#c0392b"][i] }))}
    caption={R`**示意模型（非原书公式）**：背面注入的自间隙原子按 $\mathrm{erfc}[x/2\sqrt{D_{\rm I}t}]$ 向内扩散；它到达之处把 $\mathrm{Au_S}$ 踢成 $\mathrm{Au_I}$（式 4.7），后者极快地跑到背面被俘获，于是 $[\mathrm{Au}]\approx[\mathrm{Au}]_0\exp\{-K\,\mathrm{erfc}[x/2\sqrt{D_{\rm I}t}]\}$（取 $K=5$）。前沿深度 $\propto\sqrt t$，形状与原书图 4.21 右图的 1000 ˚C 实测剖面相似。默认的有效 $D_{\rm I}$ 是为贴合该数据选取的，比式 (3.6) 在 1000 ˚C 的 $1.3\times10^{-7}$ 小约 25 倍——正落在原书图 4.16 中 I 扩散系数的不确定带内。`}
    samples={160} />;
}

// ---------- 10. SRH：陷阱能级与寿命 ----------
export function SrhLevelPlot() {
  return <Plot
    x={{ label: R`E_T-E_i\ [\mathrm{eV}]`, domain: [-0.55, 0.55] }}
    y={{ label: R`\text{相对产生率}\ |U|/|U|_{E_T=E_i}`, log: true, domain: [1e-9, 1.5] }}
    params={[{ id: "T", label: R`T\ [\mathrm K]`, min: 250, max: 450, step: 1, value: 300 }]}
    series={p => [
      { label: R`1/\cosh[(E_T-E_i)/kT]`, f: e => 1 / Math.cosh(e / (P.kB * p.T)) },
    ]}
    vlines={[{ x: 0.01, label: R`\mathrm{Au}\ \text{受主}` }, { x: -0.18, label: R`\mathrm{Fe_i}\ \text{施主}` }]}
    caption={R`耗尽区中 $n,p\ll n_i$，式 (4.15) 化为 $U=-n_i/[2\tau\cosh((E_T-E_i)/kT)]$：陷阱离禁带中央每远 $kT\ln10\approx60\,$meV，产生率就降 10 倍。竖线标出两种典型金属能级的大致位置（Au 的受主能级约 $E_c-0.55\,$eV，几乎正在 $E_i$；间隙 Fe 的施主能级约 $E_v+0.38\,$eV，即 $E_i-0.18\,$eV）。正因为过渡金属的能级都"很深"，痕量金属就能主宰漏电与寿命。`}
    samples={200} />;
}
export function LifetimePlot() {
  return <Plot
    x={{ label: R`N_t\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e9, 1e16] }}
    y={{ label: R`\tau=1/(\sigma v_{\rm th}N_t)\ [\mathrm s]`, log: true, domain: [1e-10, 1e0] }}
    params={[
      { id: "s", label: R`\sigma\ [\mathrm{cm^2}]`, min: 1e-17, max: 1e-14, log: true, value: 1e-16 },
      { id: "v", label: R`v_{\rm th}\ [\mathrm{cm/s}]`, min: 3e6, max: 3e7, log: true, value: 1e7 },
    ]}
    series={p => [{ label: R`\tau(N_t)`, f: N => P.tauSRH(p.s, p.v, N) }, { label: R`1\,\mathrm{ms}\ \text{(DRAM 刷新要求)}`, f: () => 1e-3, color: "#c0392b", dash: "dash", width: 1.5 }]}
    vlines={p => [{ x: 1 / (p.s * p.v * 1e-3), label: R`N_t=${sci(1 / (p.s * p.v * 1e-3), 1)}` }]}
    caption={R`式 (4.2)/(4.16)。默认 $\sigma=10^{-16}\,\mathrm{cm^2}$、$v_{\rm th}=10^7\,\mathrm{cm/s}$ 时，要 $\tau\geq1\,$ms 需 $N_t\leq10^{12}\,\mathrm{cm^{-3}}$——仅为硅原子密度的 $2\times10^{-11}$，这就是原书据此论证表 4.1 金属规格的算术。`}
    samples={60} />;
}

// ---------- 11. 式 (4.27)：Cp 与 Cpk ----------
export function CpkPlot() {
  const LSL = 94, USL = 106;
  return <Plot
    x={{ label: R`\text{工艺参数}\ X`, domain: [88, 112] }}
    y={{ label: R`\text{概率密度}`, domain: [0, 0.45] }}
    params={[
      { id: "m", label: R`\bar X`, min: 92, max: 108, step: 0.1, value: 98.9 },
      { id: "s", label: R`\sym{ch04-sd}{\sigma}`, min: 0.4, max: 4, step: 0.01, value: 1.03 },
    ]}
    series={p => { const Cp = (USL - LSL) / (6 * p.s), Cpk = Math.min(USL - p.m, p.m - LSL) / (3 * p.s);
      const out = (P.Phi((LSL - p.m) / p.s) + 1 - P.Phi((USL - p.m) / p.s)) * 1e6;
      return [
        { label: R`C_p=${f2(Cp)},\ C_{pk}=${f2(Cpk)}`, f: x => Math.exp(-((x - p.m) ** 2) / (2 * p.s * p.s)) / (p.s * Math.sqrt(2 * Math.PI)), color: Cpk >= 1.33 ? "#2c6e49" : Cpk >= 1 ? "#b8862b" : "#c0392b" },
        { label: R`\text{超规格}\ ${out < 0.01 ? "<0.01" : sci(out, 2)}\ \mathrm{ppm}`, f: () => NaN },
      ]; }}
    vlines={p => [{ x: LSL, label: R`\mathrm{LSL}` }, { x: USL, label: R`\mathrm{USL}` }, { x: p.m, label: R`\bar X` }]}
    caption={R`默认值即原书图 4.26 的例子：目标 100、USL = 106、LSL = 94，实测 $\bar X=98.9$、$\sym{ch04-sd}{\sigma}=1.03$，得 $C_p=1.94$、$C_{pk}=1.59$（原书写 1.60）。把 $\bar X$ 拖回 100，$C_{pk}$ 升到 $C_p$；把 $\sym{ch04-sd}{\sigma}$ 加宽到 2，$C_p=1$，超规格比例升到约 2700 ppm（$\pm3\sym{ch04-sd}{\sigma}$ 之外的 0.27%）。曲线颜色：绿 $C_{pk}\geq1.33$（受控），橙 1–1.33，红 $<1$。`}
    samples={300} />;
}
