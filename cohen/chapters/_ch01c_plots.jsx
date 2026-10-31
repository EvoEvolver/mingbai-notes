// 第 I 章补充材料的交互图。数值核心在 _ch01c_phys.js（已用 node 与原书数值、解析式逐一核对）。
import { useEffect, useMemo, useRef, useState } from "react";
import { Plot, renderTex, TxI, num } from "@kit";
import * as P from "./_ch01c_phys.js";

const R = String.raw;
const f3 = (v, d = 3) => (Number.isFinite(v) ? (+v).toPrecision(d) : "—");
const sci = (v, d = 2) => { if (!Number.isFinite(v)) return "—"; const e = Math.floor(Math.log10(Math.abs(v))); return Math.abs(e) <= 2 ? (+v).toPrecision(d + 1) : `${(v / 10 ** e).toFixed(d)}\\times10^{${e}}`; };

// ---------- 小控件 ----------
function Slider({ label, value, min, max, step, log, onChange, fmt }) {
  const toS = v => (log ? Math.log10(v) : v), fromS = s => (log ? 10 ** s : s);
  return (
    <label className="plot-param">
      <span className="plot-plabel" dangerouslySetInnerHTML={{ __html: renderTex(`${label}=${fmt ? fmt(value) : +(+value).toPrecision(3)}`) }} />
      <input type="range" min={toS(min)} max={toS(max)} step={log ? 0.01 : step} value={toS(value)} onChange={e => onChange(fromS(+e.target.value))} />
    </label>);
}
function Seg({ options, value, onChange }) {
  return <div className="seg" style={{ marginBottom: 6 }}>{options.map(([v, lab]) => <button key={v} className={value === v ? "on" : ""} onClick={() => onChange(v)}><TxI>{lab}</TxI></button>)}</div>;
}
const Box = ({ children }) => <div className="card" style={{ padding: "12px 14px", margin: "1em 0" }}>{children}</div>;
const Cap = ({ children }) => <div className="plot-cap" style={{ marginTop: 6 }}><TxI>{children}</TxI></div>;
function usePlay(setT, lo, hi, speed) {
  const [on, setOn] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (!on) return;
    let last = performance.now();
    const step = now => {
      const dt = (now - last) / 1000; last = now;
      setT(t => { const n = t + speed * dt; if (n >= hi) { setOn(false); return hi; } return n; });
      ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [on, hi, speed]);   // eslint-disable-line
  return [on, () => { setT(t => (t >= hi - 1e-9 ? lo : t)); setOn(!on); }];
}

// =====================================================================
// A_I：de Broglie 波长计算器
// =====================================================================
const PARTICLES = { e: { m: P.ME, lab: "电子" }, n: { m: P.MN, lab: "中子" }, p: { m: P.MP, lab: "质子" } };
const lenFmt = L => (L >= 1e-11 ? `${f3(L * 1e10)}\\ \\mathrm{\\mathring A}` : L >= 1e-14 ? `${f3(L * 1e12)}\\ \\mathrm{pm}` : `${f3(L * 1e15)}\\ \\text{fermi}`);
export function DeBroglieCalc() {
  const [E, setE] = useState(100), [pt, setPt] = useState("e");
  const m = PARTICLES[pt].m, Ek = E * P.EV;
  const lr = P.lambdaRel(Ek, m), ln = P.lambdaNR(Ek, m), lw = P.lambdaWrong(Ek, m), beta = P.pRel(Ek, m) * P.C / (Ek + m * P.C * P.C);
  const series = () => [
    { label: R`\text{电子（相对论）}`, f: x => P.lambdaRel(x * P.EV, P.ME), color: "#2c4a6e" },
    { label: R`\text{电子（非相对论，式 AI-7）}`, f: x => P.lambdaNR(x * P.EV, P.ME), color: "#2c4a6e", dash: "dash" },
    { label: R`\text{中子}`, f: x => P.lambdaRel(x * P.EV, P.MN), color: "#c0392b" },
    { label: R`\text{中子（非相对论）}`, f: x => P.lambdaNR(x * P.EV, P.MN), color: "#c0392b", dash: "dash" },
  ];
  return (
    <Box>
      <b>交互：de Broglie 波长计算器</b>
      <div className="plot-params" style={{ marginTop: 8 }}>
        <Seg options={[["e", "电子"], ["n", "中子"], ["p", "质子"]]} value={pt} onChange={setPt} />
        <Slider label={R`E_k\ [\mathrm{eV}]`} value={E} min={1e-3} max={1e10} log onChange={setE} fmt={v => sci(v, 2)} />
        <button className="plot-reset" onClick={() => setE(0.0388)}>热中子 300 K</button>
        <button className="plot-reset" onClick={() => setE(100)}>100 eV</button>
        <button className="plot-reset" onClick={() => setE(1e9)}>1 GeV</button>
      </div>
      <table className="tb-table" style={{ margin: "6px 0" }}><tbody>
        <tr><td>{PARTICLES[pt].lab}，动能 <TxI>{`$E_k=${sci(E, 2)}\\ \\mathrm{eV}$`}</TxI></td><td><TxI>{`速度 $v/c=${f3(beta, 4)}$`}</TxI></td></tr>
        <tr><td><b>相对论正确值</b> <TxI>{`$\\lambda=h/p$，$p$ 由 \\eqref{AI-10}：$\\lambda=${lenFmt(lr)}$`}</TxI></td>
          <td><TxI>{`非相对论 \\eqref{AI-7}：$${lenFmt(ln)}$（误差 ${f3((ln / lr - 1) * 100, 2)}\\%）`}</TxI></td></tr>
        <tr><td colSpan={2} className="muted"><TxI>{`常见错误 $\\lambda=c/\\nu$（$\\nu=E/h$，$E$ 含静能）：$${lenFmt(lw)}$——与正确值差 ${sci(lr / lw, 1)} 倍。`}</TxI></td></tr>
      </tbody></table>
      <Plot x={{ label: R`\text{动能}\ E_k\ [\mathrm{eV}]`, log: true, domain: [1e-3, 1e10] }} y={{ label: R`\lambda\ [\mathrm m]`, log: true, domain: [1e-17, 1e-8] }}
        series={series} samples={160} height={340}
        vlines={[{ x: E, label: R`E_k` }]} />
      <Cap>{R`$\lambda\sim1\,\mathrm{\mathring A}=10^{-10}\,\mathrm m$ 是晶体衍射的工作区。电子与中子的曲线都在动能接近静能（电子 $0.5\,\mathrm{MeV}$、中子 $940\,\mathrm{MeV}$）处与非相对论虚线分道扬镳，高能端 $\lambda\to hc/E$。核对：室温热中子 $1.45\,\mathrm{\mathring A}$（式 AI-5），100 V 电子 $1.23\,\mathrm{\mathring A}$（式 AI-8），1 GeV 电子 $1.24$ fermi（式 AI-11）。`}</Cap>
    </Box>);
}

// =====================================================================
// C_I：动能与势能的折中
// =====================================================================
export function AtomEnergyPlot() {
  const [Z, setZ] = useState(1), [mu, setMu] = useState(1);
  const a0 = P.a0Of(mu, Z), E0 = P.E0Of(mu, Z);
  const series = () => [
    { label: R`\overline T_{min}=\hbar^2/2mr_0^2`, f: r => P.Tmin(r, mu), color: "#2c6e49", dash: "dash" },
    { label: R`\overline V=-Ze^2/r_0`, f: r => P.Vbar(r, Z), color: "#2c4a6e", dash: "dash" },
    { label: R`E_{min}=\overline T_{min}+\overline V`, f: r => P.Tmin(r, mu) + P.Vbar(r, Z), color: "#1f1b16", width: 2.6 },
    { label: R`E_{cl}=-Ze^2/2r_0\ \text{（经典）}`, f: r => P.Vbar(r, Z) / 2, color: "#c0392b", dash: "dot" },
  ];
  return (
    <Box>
      <b>交互：为什么原子不会坍缩</b>
      <div className="plot-params" style={{ marginTop: 8 }}>
        <Slider label={R`Z`} value={Z} min={1} max={4} step={1} onChange={setZ} />
        <Slider label={R`m/m_e`} value={mu} min={1} max={300} log onChange={setMu} />
        <button className="plot-reset" onClick={() => { setZ(1); setMu(1); }}>氢原子</button>
        <button className="plot-reset" onClick={() => { setZ(1); setMu(185.8); }}>缪子氢（约化质量）</button>
      </div>
      <Plot x={{ label: R`r_0\ [\mathrm{\mathring A}]`, log: true, domain: [a0 / 20, a0 * 12] }} y={{ label: R`\text{能量}\ [\mathrm{eV}]`, domain: [3 * E0, -2.5 * E0] }}
        series={series} samples={220} height={340}
        vlines={[{ x: a0, label: R`a_0=${f3(a0)}\,\mathrm{\mathring A}` }]} />
      <Cap>{R`当前参数：$a_0=\hbar^2/(Zme^2)=${f3(a0)}\,\mathrm{\mathring A}$，$E_0=-Z^2me^4/2\hbar^2=${f3(E0, 4)}\,\mathrm{eV}$（数值求 $E_{min}$ 的极小得到相同结果）。黑色实线在 $a_0$ 处有极小；红色点线是经典圆轨道能量 \eqref{CI-11}，随 $r_0\to0$ 一路下降，没有底。质量增大 $\mu$ 倍，原子缩小 $\mu$ 倍、结合能增大 $\mu$ 倍（缪子氢）。`}</Cap>
    </Box>);
}

// =====================================================================
// D_I：板位置的不确定度抹平条纹
// =====================================================================
export function FringePlot() {
  return <Plot
    x={{ label: R`\text{屏上位置}\ x\ /\ (\lambda d/a)`, domain: [-2.5, 2.5] }}
    y={{ label: R`\text{强度（归一）}`, domain: [0, 2.1] }}
    params={[{ id: "s", label: R`\Delta x_{\mathscr P}/(\lambda d/a)`, min: 0, max: 0.8, step: 0.01, value: 0.1 }]}
    series={p => {
      const V = P.fringeVis(p.s), ratio = p.s > 0 ? P.dpOverSplit(p.s) : Infinity;
      return [
        { label: R`\text{缝板位置弥散}\ ${f3(p.s, 2)}\ \text{时：可见度}\ \mathcal V=${f3(V, 3)}`, f: x => 1 + V * Math.cos(2 * Math.PI * x), width: 2.6 },
        { label: R`\text{板固定（不测路径）}`, f: x => 1 + Math.cos(2 * Math.PI * x), dash: "dot", color: "#999" },
        { label: R`\Delta p_{\min}/|p_2-p_1|=${Number.isFinite(ratio) ? f3(ratio, 3) : "\\infty"}\ (\ll1\ \text{才能分辨路径})`, f: () => NaN, color: "#c0392b" },
      ];
    }}
    samples={300} height={300}
    caption={R`把板的竖直位置当作宽为 $\Delta x_{\mathscr P}$ 的高斯分布：每个光子的条纹图样随之平移，叠加后 $I\propto1+\mathcal V\cos(2\pi xa/\lambda d)$，$\mathcal V=\exp[-2\pi^2(\Delta x_{\mathscr P}a/\lambda d)^2]$。同时板动量至少弥散 $\hbar/2\Delta x_{\mathscr P}$，与 $|p_2-p_1|=ha/\lambda d$ 之比为 $\lambda d/(4\pi a\,\Delta x_{\mathscr P})$。拖动滑块：要让这个比值 $\ll1$（能分辨路径），$\Delta x_{\mathscr P}$ 必须 $\gtrsim\lambda d/a$，而此时 $\mathcal V\lesssim10^{-8}$——两者不可兼得，这就是 \eqref{DI-7}。`} />;
}

// =====================================================================
// E_I：三列（或连续多列）平面波叠加成的二维波包
// =====================================================================
export function ThreeWavePacket() {
  const [dth, setDth] = useState(0.1), [mode, setMode] = useState("three");
  const cv = useRef(null);
  const NX = 300, NY = 150, XL = 8, YL = 12;   // x ∈ [0, 8λ]，y ∈ [−12λ, 12λ]
  useEffect(() => {
    const c = cv.current; if (!c) return;
    const ctx = c.getContext("2d"), img = ctx.createImageData(NX, NY), k = 2 * Math.PI;
    // 连续分布：41 列波，k_y 高斯权重（使 ±kΔθ 处为半高，与原书图 2 相同），k_x = √(k²−k_y²)
    const waves = mode === "three" ? [[0, 1], [k * dth, 0.5], [-k * dth, 0.5]]
      : Array.from({ length: 41 }, (_, i) => { const ky = (i - 20) / 20 * 2.5 * k * dth; return [ky, Math.exp(-Math.LN2 * (ky / (k * dth)) ** 2) * (2.5 / 20) * 1.064]; });
    const norm = waves.reduce((s, w) => s + w[1], 0);
    for (let j = 0; j < NY; j++) {
      const y = YL - (j + 0.5) / NY * 2 * YL;
      for (let i = 0; i < NX; i++) {
        const x = (i + 0.5) / NX * XL; let re = 0;
        for (const [ky, g] of waves) { const kx = Math.sqrt(Math.max(0, k * k - ky * ky)); re += g * Math.cos(kx * x + ky * y); }
        const v = re / norm, o = 4 * (j * NX + i);
        img.data[o] = v > 0 ? 255 : 255 + v * 210; img.data[o + 1] = 255 - Math.abs(v) * 190; img.data[o + 2] = v < 0 ? 255 : 255 - v * 210; img.data[o + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    const dy = 1 / (2 * dth);   // Δy/2 = π/(kΔθ)，以 λ 为单位
    ctx.strokeStyle = "#1f1b16"; ctx.setLineDash([4, 3]);
    for (const s of [1, -1]) { const py = (YL - s * dy) / (2 * YL) * NY; if (py > 0 && py < NY) { ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(NX, py); ctx.stroke(); } }
  }, [dth, mode]);
  const Dy = 1 / dth;   // Δy = 2π/(kΔθ) = λ/Δθ
  return (
    <Box>
      <b>交互：角弥散 ↔ 横向宽度</b>
      <div className="plot-params" style={{ marginTop: 8 }}>
        <Seg options={[["three", "三列波（原书模型）"], ["cont", "连续分布（41 列，高斯权重）"]]} value={mode} onChange={setMode} />
        <Slider label={R`\Delta\theta\ [\mathrm{rad}]`} value={dth} min={0.04} max={0.3} step={0.005} onChange={setDth} />
      </div>
      <canvas ref={cv} width={NX} height={NY} style={{ width: "100%", imageRendering: "auto", border: "1px solid var(--line)", borderRadius: 6 }} />
      <Cap>{R`颜色为 $\mathrm{Re}\,\psi(x,y)$（红正蓝负），横轴 $0\le x\le8\lambda$，纵轴 $-12\lambda\le y\le12\lambda$。虚线标出 $y=\pm\Delta y/2$，$\Delta y=2\pi/(k\Delta\theta)=\lambda/\Delta\theta=${f3(Dy)}\,\lambda$，$\Delta y\cdot\Delta k_y=4\pi$（式 EI-7、EI-8）。三列波时图样沿 $y$ 周期重复（在 $y=\pm\Delta y$ 处重新同相）；换成连续分布，就只剩中央一束，横向宽度仍与 $1/\Delta\theta$ 成正比——这就是一束有限宽度的波。`}</Cap>
    </Box>);
}

// =====================================================================
// G_I：高斯波包的演化与扩散（ħ = m = 1）
// =====================================================================
export function GaussSpreadPlot() {
  const [a, setA] = useState(1), [k0, setK0] = useState(2), [t, setT] = useState(-3);
  const [on, toggle] = usePlay(setT, -3, 8, 2.2);
  const num = useMemo(() => {
    const xs = [], ys = [];
    for (let x = -14; x <= 30; x += 0.05) { xs.push(x); ys.push(P.cabs2(P.gaussPsiNum(x, t, a, k0))); }
    const pts = []; for (let i = 0; i < xs.length; i += 18) pts.push([xs[i], ys[i]]);
    return { pts, mom: P.moments(xs, ys) };
  }, [a, k0, t]);
  const series = () => [
    { label: R`|\psi(x,t)|^2\ \text{解析式 (GI-17)}`, f: x => P.gaussDensity(x, t, a, k0), width: 2.4 },
    { label: R`\text{数值积分 (GI-15)}`, data: num.pts, points: true, color: "#c0392b" },
    { label: R`t=0\ \text{的波包}`, f: x => P.gaussDensity(x, 0, a, k0), dash: "dot", color: "#999" },
  ];
  return (
    <Box>
      <b>交互：高斯波包的运动与扩散</b><TxI>{R`（单位 $\hbar=m=1$）`}</TxI>
      <div className="plot-params" style={{ marginTop: 8 }}>
        <Slider label={R`t`} value={t} min={-3} max={8} step={0.02} onChange={setT} />
        <Slider label={R`a`} value={a} min={0.5} max={2.5} step={0.01} onChange={setA} />
        <Slider label={R`k_0`} value={k0} min={0} max={3} step={0.05} onChange={setK0} />
        <button className="plot-reset" onClick={toggle}>{on ? "⏸ 暂停" : "▶ 播放"}</button>
      </div>
      <Plot x={{ label: R`x`, domain: [-14, 30] }} y={{ label: R`|\psi(x,t)|^2`, domain: [0, 0.85 / a] }}
        series={series} samples={360} height={320}
        vlines={[{ x: k0 * t, label: R`x=\sym{V0G}{V_0}t` }]} />
      <Cap>{R`数值积分得到的 $\int|\psi|^2\mathrm dx=${f3(num.mom.norm, 5)}$（范数守恒），中心 $\langle x\rangle=${f3(num.mom.mean, 4)}$（应为 $\hbar k_0t/m=${f3(k0 * t, 4)}$），宽度 $${f3(num.mom.sd, 4)}$（式 GI-20 给出 $${f3(P.gaussWidth(t, a), 4)}$）。$t<0$ 时波包边走边收缩，$t=0$ 最窄，之后扩散；峰高与宽度反向变化。窄的波包（小 $a$）扩散得更快。`}</Cap>
    </Box>);
}
export function GaussWidthPlot() {
  return <Plot
    x={{ label: R`t\ \ (\hbar=m=1)`, domain: [-6, 6] }}
    y={{ label: R`\text{宽度}`, domain: [0, 6] }}
    params={[{ id: "a", label: R`a`, min: 0.5, max: 3, step: 0.01, value: 1 }]}
    series={p => {
      const pts = [];
      for (let t = -6; t <= 6.001; t += 1) {
        const xs = [], ys = []; const L = 8 * P.gaussWidth(t, p.a);
        for (let x = -L; x <= L; x += L / 400) { xs.push(x); ys.push(P.cabs2(P.gaussPsiNum(x, t, p.a, 0))); }
        pts.push([t, P.moments(xs, ys).sd]);
      }
      return [
        { label: R`\Delta x(t)\ \text{式 (GI-20)}`, f: t => P.gaussWidth(t, p.a), width: 2.6 },
        { label: R`\delta x_{cl}=\hbar|t|/ma`, f: t => Math.abs(t) / p.a, dash: "dash", color: "#c0392b" },
        { label: R`\text{由数值波函数算出的方均根宽度}`, data: pts, points: true, color: "#2c4a6e" },
        { label: R`\text{下限}\ a/2`, f: () => p.a / 2, dash: "dot", color: "#999" },
      ];
    }}
    samples={200} height={300}
    caption={R`实线是 $\Delta x(t)$ 的双曲线 \eqref{GI-20}，蓝点是对数值波函数直接求方均根宽度的结果，二者重合；红虚线是初速弥散 $\Delta p/m$ 的经典粒子群的位置弥散，是双曲线的渐近线。$t\to0$ 时量子宽度停在 $a/2$（Heisenberg 下限），经典粒子群却可以挤成一点。增大 $a$：初始更宽，但扩散更慢（$\delta x_{cl}\propto1/a$）。`} />;
}

// =====================================================================
// H_I：势阶的 R、T
// =====================================================================
export function StepRTPlot() {
  return <Plot
    x={{ label: R`E/V_0`, domain: [0, 5] }}
    y={{ label: R`\text{概率}`, domain: [0, 1.05] }}
    series={() => [
      { label: R`T\ \text{(HI-18)}`, f: e => (e <= 1 ? 0 : P.stepT(Math.sqrt(e), Math.sqrt(e - 1))), width: 2.4 },
      { label: R`R\ \text{(HI-17, HI-24)}`, f: e => (e <= 1 ? 1 : P.stepR(Math.sqrt(e), Math.sqrt(e - 1))), color: "#c0392b", width: 2.4 },
      { label: R`\text{经典}\ T`, f: e => (e < 1 ? 0 : 1), dash: "dot", color: "#999" },
    ]}
    samples={400} height={260}
    caption={R`势阶的反射与透射系数。$E<V_0$ 全反射；刚越过台阶时 $T$ 从 0 以 $\sqrt{E-V_0}$ 的方式陡升；$E=2V_0$ 时 $R\simeq0.03$，$E\gg V_0$ 时 $T\to1$。经典粒子则是"非 0 即 1"。`} />;
}

// =====================================================================
// H_I：方势垒的透射系数——随能量与随宽度
// =====================================================================
export function BarrierPlot() {
  const [mode, setMode] = useState("E");
  return (
    <Box>
      <b>交互：方势垒的透射系数</b>
      <div style={{ marginTop: 8 }}><Seg options={[["E", "随能量 $E/V_0$ 变化"], ["l", "随宽度 $l$ 变化（原书图 3）"]]} value={mode} onChange={setMode} /></div>
      {mode === "E" ? <Plot
        x={{ label: R`E/V_0`, domain: [0.001, 4] }}
        y={{ label: R`T`, domain: [0, 1.05] }}
        params={[{ id: "g", label: R`g_b=\sqrt{2mV_0}\,l/\hbar`, min: 0.3, max: 40, log: true, value: 0.7245 }]}
        series={p => [
          { label: R`T\ \text{(HI-29 / HI-30)}`, f: e => P.barrierT(e, p.g), width: 2.4 },
          { label: R`\text{厚势垒近似 (HI-31)}`, f: e => { const v = e < 1 ? 16 * e * (1 - e) * Math.exp(-2 * p.g * Math.sqrt(1 - e)) : NaN; return v <= 1.05 ? v : NaN; }, dash: "dash", color: "#c0392b" },
          { label: R`\text{经典}`, f: e => (e < 1 ? 0 : 1), dash: "dot", color: "#999" },
        ]}
        vlines={p => { const out = []; for (let n = 1; n < 6; n++) { const e = 1 + (n * Math.PI / p.g) ** 2; if (e < 4) out.push({ x: e, label: n === 1 ? R`k_2l=\pi` : "" }); } return [{ x: 0.5, label: R`E=V_0/2` }, ...out]; }}
        samples={500} height={300}
        caption={R`默认 $g_b=0.7245$ 对应原书的电子例子（$V_0=2\,\mathrm{eV}$、$l=1\,\mathrm{\mathring A}$，$g_b=\sqrt{2m_ec^2V_0}\,l/\hbar c$）：在 $E/V_0=0.5$（$E=1\,\mathrm{eV}$）处读出 $T=${f3(P.barrierT(0.5, 0.7245), 3)}$，即 \eqref{HI-33}。换成质子，$g_b$ 乘 $\sqrt{1840}$ 变为约 31（拖到右端附近）：$E<V_0$ 区间的 $T$ 塌缩到 $10^{-19}$ 量级，图上与零无法区分（\eqref{HI-35}）。$E>V_0$ 一侧，竖线标出共振 $k_2l=n\pi$，在那里 $T=1$。`} />
        : <Plot
          x={{ label: R`l\ \ /\ (\pi/k_2)`, domain: [0, 3.5] }}
          y={{ label: R`T`, domain: [0, 1.05] }}
          params={[{ id: "e", label: R`E/V_0`, min: 1.02, max: 4, step: 0.01, value: 1.2 }]}
          series={p => { const q = 4 * p.e * (p.e - 1); return [
            { label: R`T(l)\ \text{(HI-29)}`, f: x => q / (q + Math.sin(Math.PI * x) ** 2), width: 2.4 },
            { label: R`T_{\min}=[1+V_0^2/4E(E-V_0)]^{-1}=${f3(q / (q + 1))}`, f: () => q / (q + 1), dash: "dash", color: "#c0392b" },
          ]; }}
          vlines={[{ x: 1, label: R`\pi/k_2` }, { x: 2, label: R`2\pi/k_2` }, { x: 3, label: R`3\pi/k_2` }]}
          samples={400} height={300}
          caption={R`固定 $E$ 与 $V_0$，$T$ 随势垒宽度 $l$ 以周期 $\pi/k_2$（区域 II 中的半波长）振荡，在 $T_{\min}$ 与 1 之间往返——Fabry–Perot 式的共振。$E$ 越接近 $V_0$，$T_{\min}$ 越小、共振峰越尖。`} />}
    </Box>);
}

// =====================================================================
// H_I：方势阱能级的图解与束缚态波函数
// =====================================================================
export function WellGraphic() {
  const [u0, setU0] = useState(15.5);
  const lev = useMemo(() => P.wellLevels(u0), [u0]);
  const X = 17;
  const arcs = [];
  for (let j = 0; j * Math.PI < X; j++) {
    const lo = j * Math.PI, hi = (j + 1) * Math.PI, even = j % 2 === 0;
    arcs.push({ label: j < 2 ? (even ? R`|\cos(ka/2)|,\ \tan>0\ \text{（偶）}` : R`|\sin(ka/2)|,\ \tan<0\ \text{（奇）}`) : undefined,
      f: x => (x >= lo && x <= hi ? (even ? Math.abs(Math.cos(x / 2)) : Math.abs(Math.sin(x / 2))) : NaN), color: even ? "#2c4a6e" : "#c0392b", dash: "dash" });
  }
  const series1 = () => [
    { label: R`\text{直线}\ k/k_0=ka/u_0`, f: x => (x <= u0 ? x / u0 : NaN), width: 2.4 },
    ...arcs,
    { label: R`\text{能级（交点）}`, data: lev.map(l => [l.ka, l.ka / u0]), points: true, color: "#2c6e49" },
  ];
  const series2 = () => [
    { label: R`V(x)/V_0`, f: x => (Math.abs(x) < 0.5 ? -1 : 0), color: "#999", width: 2 },
    ...lev.map((l, i) => {
      let mx = 0; for (let x = -0.5; x <= 0.5; x += 0.01) mx = Math.max(mx, Math.abs(P.wellPsi(x, l, u0)));
      const s = 0.85 / Math.max(lev.length, 2) / mx;
      return { label: i === 0 ? R`E_n/V_0+\varphi_n(x)\ \text{（偶蓝奇红）}` : undefined, f: x => l.eps + s * P.wellPsi(x, l, u0), color: l.parity === "even" ? "#2c4a6e" : "#c0392b", width: 1.8 };
    }),
    ...lev.map((l, i) => ({ label: i === 0 ? R`\text{无限深阱}\ -1+(n\pi/u_0)^2` : undefined, f: x => (Math.abs(x) < 0.5 ? -1 + ((i + 1) * Math.PI / u0) ** 2 : NaN), dash: "dot", color: "#2c6e49" })),
  ];
  return (
    <Box>
      <b>交互：方势阱能级的图解（原书图 5）与束缚态</b>
      <div className="plot-params" style={{ marginTop: 8 }}>
        <Slider label={R`u_0=k_0a=\sqrt{2mV_0}\,a/\hbar`} value={u0} min={0.5} max={16.5} step={0.05} onChange={setU0} />
        <button className="plot-reset" onClick={() => setU0(15.5)}>原书图 5（5 个能级）</button>
        <button className="plot-reset" onClick={() => setU0(Math.PI)}><TxI>{R`$V_0=V_1$`}</TxI></button>
      </div>
      <Plot x={{ label: R`ka`, domain: [0, X] }} y={{ label: R`y`, domain: [0, 1.08] }} series={series1} samples={700} height={280}
        vlines={[{ x: u0, label: R`k=k_0` }]} />
      <div className="muted" style={{ fontSize: 14, margin: "4px 0 8px" }}><TxI>{`共 $${lev.length}$ 个束缚态：` + lev.map(l => `$${l.parity === "even" ? "\\text{偶}" : "\\text{奇}"}\\ E/V_0=${f3(l.eps, 4)}$`).join("，")}</TxI></div>
      <Plot x={{ label: R`x/a`, domain: [-1.4, 1.4] }} y={{ label: R`E/V_0`, domain: [-1.08, 0.25] }} series={series2} samples={500} height={320} />
      <Cap>{R`上图：直线 $k/k_0$ 与蓝色弧（偶态条件 \eqref{HI-47a}–\eqref{HI-47b}）、红色弧（奇态条件 \eqref{HI-49a}–\eqref{HI-49b}）的交点即能级，偶奇交替。$u_0\le\pi$（$V_0\le V_1$）时只剩一个偶态，但永远至少有一个。下图：各束缚态波函数（画在各自能级的高度上），在阱外按 $\mathrm e^{-\rho|x|}$ 渗入禁区；绿点线是同宽无限深阱的能级 \eqref{HI-52}——有限阱的能级总比它低，因为波函数"漏"出了阱壁。`}</Cap>
    </Box>);
}

// =====================================================================
// J_I：势阶上的波包（ħ = m = 1，K0 = 1）
// =====================================================================
export function StepPacketPlot() {
  const K0 = 1;
  const [k0, setK0] = useState(0.8), [dk, setDk] = useState(0.06), [s, setS] = useState(-1);
  const [on, toggle] = usePlay(setS, -1, 1, 0.22);
  const ks = useMemo(() => P.stepPrep(k0, dk, K0), [k0, dk]);
  const T = 100 / k0, t = s * T;
  const dens = useMemo(() => {
    const xs = [], ys = [];
    for (let x = -140; x <= 140; x += 0.5) { xs.push(x); ys.push(P.stepPsi2(x, t, ks)); }
    let L = 0, Rr = 0; for (let i = 1; i < xs.length; i++) { const y = (ys[i] + ys[i - 1]) / 2 * 0.5; if (xs[i] <= 0) L += y; else Rr += y; }
    return { xs, ys, L, Rr };
  }, [ks, t]);
  const peak = 2 * dk / Math.sqrt(2 * Math.PI), ymax = 3.6 * peak;
  const tot = k0 < K0;
  const q0 = tot ? 0 : Math.sqrt(k0 * k0 - K0 * K0), tau = tot ? P.stepDelay(k0, K0) : 0;
  const series = () => [
    { label: R`|\psi(x,t)|^2\ \text{（定态叠加，数值精确）}`, f: x => num.interp(dens.xs, dens.ys, x), width: 2.2 },
    { label: R`V(x)\ \text{（示意）}`, f: x => (x < 0 ? 0 : 0.92 * ymax), color: "#999", dash: "dot" },
  ];
  const vl = [];
  if (t < 0) vl.push({ x: k0 * t, label: R`x_i` });
  else if (tot) { vl.push({ x: -k0 * (t - tau), label: R`x_r` }, { x: -k0 * t, label: "" }); }
  else { vl.push({ x: -k0 * t, label: R`x_r` }, { x: q0 * t, label: R`x_t` }); }
  return (
    <Box>
      <b>交互：波包撞上势阶</b><TxI>{R`（单位 $\hbar=m=1$，$K_0=1$；虚线：预言的中心，无标注的是经典反射位置）`}</TxI>
      <div className="plot-params" style={{ marginTop: 8 }}>
        <Slider label={R`t/(100m/\hbar k_0)`} value={s} min={-1} max={1} step={0.005} onChange={setS} />
        <Slider label={R`k_0/K_0`} value={k0} min={0.5} max={1.6} step={0.01} onChange={setK0} />
        <Slider label={R`\Delta k/K_0`} value={dk} min={0.03} max={0.12} step={0.005} onChange={setDk} />
        <button className="plot-reset" onClick={toggle}>{on ? "⏸ 暂停" : "▶ 播放"}</button>
        <button className="plot-reset" onClick={() => { setK0(0.8); setS(-1); }}>全反射 <TxI>{R`$E<V_0$`}</TxI></button>
        <button className="plot-reset" onClick={() => { setK0(1.4); setS(-1); }}>部分反射 <TxI>{R`$E>V_0$`}</TxI></button>
      </div>
      <Plot x={{ label: R`x\ \ (1/K_0)`, domain: [-140, 140] }} y={{ label: R`|\psi|^2`, domain: [0, ymax] }} series={series} samples={560} height={320} vlines={vl} />
      <Cap>{`当前 $t=${f3(t, 3)}$。$P(x<0)=${f3(dens.L, 4)}$，$P(x>0)=${f3(dens.Rr, 4)}$。` + (tot
        ? `全反射：延迟 $\\tau=2m/\\hbar k_0\\sqrt{K_0^2-k_0^2}=${f3(tau, 3)}$ \\eqref{JI-10}，反射波包中心落后经典位置 $\\hbar k_0\\tau/m=${f3(k0 * tau, 3)}$，而波包宽度 $\\sim1/\\Delta k=${f3(1 / dk, 3)}$ \\eqref{JI-16}。$t\\approx0$ 时禁区 $x>0$ 中有短暂的概率（倏逝波）。`
        : `部分反射：$R=${f3(P.stepR(k0, q0), 3)}$、$T=${f3(P.stepT(k0, q0), 3)}$（\\eqref{HI-17}–\\eqref{HI-18}；$t$ 较大时与上面的 $P$ 比较），透射波包速度 $q_0=${f3(q0, 3)}$ \\eqref{JI-27}、宽度压缩为 $q_0/k_0=${f3(q0 / k0, 3)}$ 倍 \\eqref{JI-25}，振幅放大 $A_2=${f3(2 * k0 / (k0 + q0), 3)}$。无延迟。`)}</Cap>
    </Box>);
}

// =====================================================================
// K_I 习题 5：双 $\delta$ 势的两个能级随间距的变化
// =====================================================================
function bisect(f, a, b) { let fa = f(a); for (let i = 0; i < 80; i++) { const m = (a + b) / 2, fm = f(m); if ((fm < 0) === (fa < 0)) { a = m; fa = fm; } else b = m; } return (a + b) / 2; }
export const ddEven = lam => bisect(x => 2 * x - 1 - Math.exp(-lam * x), 0.5, 1);
export const ddOdd = lam => (lam <= 2 ? NaN : bisect(x => 1 - 2 * x - Math.exp(-lam * x), 1e-9, 0.5));
export function DoubleDeltaPlot() {
  return <Plot
    x={{ label: R`\mu l`, domain: [0.02, 8] }}
    y={{ label: R`E/E_L`, domain: [-4.2, 0.1] }}
    series={() => [
      { label: R`E_S\ \text{（偶，成键）}`, f: L => -((2 * ddEven(L)) ** 2), width: 2.4, color: "#2c4a6e" },
      { label: R`E_A\ \text{（奇，反键）}`, f: L => -((2 * ddOdd(L)) ** 2), width: 2.4, color: "#c0392b" },
      { label: R`-E_L\ \text{（单个}\ \delta\text{）}`, f: () => -1, dash: "dot", color: "#999" },
      { label: R`-4E_L\ (l\to0)`, f: () => -4, dash: "dot", color: "#2c6e49" },
    ]}
    vlines={[{ x: 2, label: R`\mu l=2` }]}
    samples={300} height={280}
    caption={R`由 $\mathrm e^{-\rho l}=\pm(1-2\rho/\mu)$ 数值求根，$E/E_L=-(2\rho/\mu)^2$。成键态始终低于 $-E_L$，$l\to0$ 时趋于 $-4E_L$；反键态只在 $\mu l>2$ 时存在且高于 $-E_L$；$l\to\infty$ 时两者都趋于 $-E_L$。`} />;
}
