// 第 7 章（上）交互图：全部在浏览器内实时计算，数值函数见 _ch07_phys.jsx。
// 验证（node）：默认参数下 FickCalc 复现 §7.7 例题（B，1100˚C，6.8 h，Q=4.3e13 → C_S≈4.1e17、x_j≈2.9 µm）；
// ArrheniusPlot 复现表 7.2 / 图 7.14；ConcDepPlot 的表 7.3 全式在 1000˚C 给 As 的 D*=1.42e-15（例题 1.43e-15）。
import { useState, useMemo } from "react";
import { Plot, num } from "@kit";
import * as P from "./_ch07_phys.jsx";
import { Seg, Slider, Row, Readout, TeX, DOPC } from "./_ch07_ui.jsx";

const R = String.raw;
const UM = 1e4;   // cm → µm
const sci = P.sci;
const dopOpts = list => list.map(d => [d, d]);
const tFmt = s => P.fmtTime(s);
const box = { margin: "18px 0" };
const ctl = { borderLeft: "3px solid var(--line)", paddingLeft: 12, marginBottom: 6 };

// ===================== §7.1 均匀层的方块电阻 ρ_S 与结深 =====================
export function SheetPlot() {
  return <Plot
    x={{ label: R`\text{结深}\ x_j\ [\mathrm{nm}]`, log: true, domain: [5, 2000] }}
    y={{ label: R`\rho_S\ [\Omega/\square]`, log: true, domain: [1, 1e5] }}
    params={[{ id: "target", label: R`\rho_S\ \text{目标}`, min: 10, max: 3000, log: true, value: 200 }]}
    series={p => [1e18, 1e19, 1e20, 3e20].map((N, i) => ({
      label: R`N_D=${sci(N, 0)}\ \mathrm{cm^{-3}}`, f: x => 1 / (P.Q_E * N * P.muElec(N) * x * 1e-7), color: ["#888", "#2c4a6e", "#c0392b", "#7d3c98"][i],
    })).concat([{ label: R`\text{目标 } ${Math.round(p.target)}\ \Omega/\square`, f: () => p.target, dash: "dot", color: "#b8862b" }])}
    vlines={p => { const N = 1e20, xj = 1 / (P.Q_E * N * P.muElec(N) * p.target) * 1e7; return [{ x: xj, label: R`x_j\ge${xj.toFixed(0)}\,\mathrm{nm}` }]; }}
    samples={120} />;
}

// ===================== §7.4/7.5 Fick 扩散计算器（预淀积 erfc / 推进 高斯）=====================
export function FickCalc() {
  const [dop, setDop] = useState("B"), [mode, setMode] = useState("drive");
  const [Tc, setT] = useState(1100), [t, setTime] = useState(6.8 * 3600);
  const [Cs, setCs] = useState(2.5e20), [Q, setQ] = useState(4.3e13), [CB, setCB] = useState(1e15);
  const D = P.Dint(dop, Tc), Dt = D * t, L = 2 * Math.sqrt(Dt), n_i = P.ni(Tc);
  const Csurf = mode === "pre" ? Cs : Q / Math.sqrt(Math.PI * Dt);
  const xj = mode === "pre" ? P.xjErfc(Cs, CB, Dt) : P.xjGauss(Csurf, CB, Dt);
  const dose = mode === "pre" ? P.doseErfc(Cs, Dt) : Q;
  const xmax = Math.max(xj * 1.35, 3 * L) * UM;
  const prof = x => (mode === "pre" ? P.erfcSurf(x / UM, Cs, Dt) : P.gaussSurf(x / UM, Q, Dt));
  return (
    <div style={box}>
      <div style={ctl}>
        <Row><Seg options={[["pre", "预淀积：恒定表面浓度（erfc，式 7.26）"], ["drive", "推进：恒定剂量（高斯，式 7.15）"]]} value={mode} onChange={setMode} /></Row>
        <Row><span style={{ fontSize: 14 }}>杂质：</span><Seg options={dopOpts(["B", "P", "As", "Sb", "In"])} value={dop} onChange={setDop} /></Row>
        <Row>
          <Slider label={R`T`} value={Tc} set={setT} min={700} max={1250} step={5} fmt={v => R`${v.toFixed(0)}\,^\circ\mathrm C`} />
          <Slider label={R`t`} value={t} set={setTime} min={1} max={3.6e5} log fmt={tFmt} />
          {mode === "pre"
            ? <Slider label={R`C_S`} value={Cs} set={setCs} min={1e17} max={5e21} log fmt={v => sci(v, 1)} />
            : <Slider label={R`Q`} value={Q} set={setQ} min={1e11} max={1e16} log fmt={v => sci(v, 1)} />}
          <Slider label={R`C_B`} value={CB} set={setCB} min={1e14} max={1e18} log fmt={v => sci(v, 1)} />
        </Row>
        <Readout items={[
          [R`D`, R`${sci(D)}\ \mathrm{cm^2/s}`], [R`\sqrt{Dt}`, R`${(Math.sqrt(Dt) * UM).toPrecision(3)}\,\mu\mathrm m`],
          [R`x_j`, R`${(xj * UM).toPrecision(3)}\,\mu\mathrm m`],
          mode === "pre" ? [R`Q`, R`${sci(dose)}\ \mathrm{cm^{-2}}`] : [R`C(0,t)`, R`${sci(Csurf)}\ \mathrm{cm^{-3}}`],
          [R`n_i(T)`, R`${sci(n_i)}`],
        ]} note={Csurf > n_i ? "表面浓度已超过 n_i：实际扩散更快、分布更方（§7.9–7.10），这里的解析解只是下限。" : ""} />
      </div>
      <Plot
        x={{ label: R`\text{深度}\ x\ [\mu\mathrm m]`, domain: [0, xmax] }}
        y={{ label: R`C(x,t)\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e13, 1e22] }}
        series={() => [
          { label: mode === "pre" ? R`C_S\,\mathrm{erfc}\!\left(\frac{x}{2\sqrt{Dt}}\right)` : R`\frac{Q}{\sqrt{\pi Dt}}e^{-x^2/4Dt}`, f: prof, color: DOPC[dop], width: 2.6 },
          { label: R`C_B`, f: () => CB, dash: "dash", color: "#888" },
          { label: R`n_i(T)`, f: () => n_i, dash: "dot", color: "#b8862b" },
        ]}
        vlines={[{ x: xj * UM, label: R`x_j` }, { x: L * UM, label: R`2\sqrt{Dt}` }]}
        samples={240} />
    </div>);
}

// ===================== 图 7.9 / 7.12 / 7.13 交互版：归一化的时间演化 =====================
export function EvolutionPlot({ init = "g" }) {
  const [kind, setKind] = useState(init), [lg, setLg] = useState(false), [tau, setTau] = useState(2);
  const cfg = {
    g: { dom: [-5, 5], f: (u, s) => Math.exp(-u * u / s) / Math.sqrt(s), lab: R`C/C(0,t_0)\ \ \text{（式 7.14）}` },
    e: { dom: [-5, 5], f: (u, s) => 0.5 * P.erfc(u / Math.sqrt(s)), lab: R`C/C\ \ \text{（式 7.25）}` },
    es: { dom: [0, 5], f: (u, s) => P.erfc(u / Math.sqrt(s)), lab: R`C/C_S\ \ \text{（式 7.26）}` },
  }[kind === "cmp" ? "es" : kind];
  const series = () => kind === "cmp"
    ? [{ label: R`\text{高斯}\ e^{-u^2}`, f: u => Math.exp(-u * u), color: "#2c4a6e" }, { label: R`\mathrm{erfc}(u)`, f: u => P.erfc(u), color: "#c0392b" }]
    : [1, 4, 9].map((s, i) => ({ label: R`t=${s}t_0`, f: u => cfg.f(u, s), color: ["#1f1b16", "#777", "#bbb"][i] }))
      .concat([{ label: R`t=${tau.toFixed(1)}\,t_0`, f: u => cfg.f(u, tau), color: "#c0392b", width: 2.8, dash: "dash" }]);
  return (
    <div style={box}>
      <div style={ctl}>
        <Row><Seg options={[["g", "高斯（无限介质，图 7.9）"], ["e", "erfc（无限介质，图 7.12 左）"], ["es", "erfc（恒定表面浓度，图 7.12 右）"], ["cmp", "高斯 vs erfc（图 7.13）"]]} value={kind} onChange={setKind} /></Row>
        <Row><Seg options={[[false, "线性坐标"], [true, "对数坐标"]]} value={lg} onChange={setLg} />
          {kind !== "cmp" && <Slider label={R`t/t_0`} value={tau} set={setTau} min={1} max={16} step={0.1} />}</Row>
      </div>
      <Plot
        x={{ label: kind === "cmp" ? R`u = x/2\sqrt{Dt}` : R`x\ \text{（以 }2\sqrt{Dt_0}\text{ 为单位）}`, domain: kind === "cmp" ? [0, 3] : cfg.dom }}
        y={{ label: kind === "cmp" ? R`C/C_S` : cfg.lab, log: lg, domain: lg ? [1e-5, 1.5] : [0, 1.05] }}
        series={series} samples={260} />
    </div>);
}

// ===================== 图 7.14 交互版：本征扩散系数的 Arrhenius 图 =====================
export function ArrheniusPlot() {
  const list = ["Si", "B", "In", "P", "As", "Sb"];
  return <Plot
    x={{ label: R`1000/T\ [\mathrm K^{-1}]`, domain: [0.65, 0.95] }}
    y={{ label: R`D\ [\mathrm{cm^2\,s^{-1}}]`, log: true, domain: [1e-18, 1e-12] }}
    params={[{ id: "T", label: R`T\,[^\circ\mathrm C]`, min: 800, max: 1200, step: 5, value: 1000 }]}
    series={p => list.map(d => {
      const r = P.TABLE72[d];
      return { label: R`\mathrm{${d}}:\ ${sci(P.Dint(d, p.T))}`, f: x => r.D0 * Math.exp(-r.Ea * x / (1000 * P.KB)), color: DOPC[d], dash: d === "In" ? "dash" : d === "Si" ? "dot" : "solid" };
    })}
    vlines={p => [{ x: 1000 / P.TK(p.T), label: R`${p.T.toFixed(0)}\,^\circ\mathrm C` }]}
    samples={60} />;
}

// ===================== §7.6 多步热处理的 (Dt)_eff =====================
const STEP0 = [
  { name: "阱推进", T: 1100, t: 400 }, { name: "场氧化", T: 1000, t: 120 },
  { name: "栅氧化", T: 900, t: 30 }, { name: "源漏 RTA", T: 1050, t: 0.5 },
];
export function ThermalBudget() {
  const [steps, setSteps] = useState(STEP0), [dop, setDop] = useState("B"), [Tref, setTref] = useState(1100);
  const Q = 4.3e13, CB = 1e15;
  const rows = steps.map(s => { const D = P.Dint(dop, s.T); return { ...s, D, Dt: D * s.t * 60 }; });
  const tot = rows.reduce((a, r) => a + r.Dt, 0), teq = tot / P.Dint(dop, Tref);
  const cum = []; rows.reduce((a, r) => { cum.push(a + r.Dt); return a + r.Dt; }, 0);
  const upd = (i, k, v) => setSteps(ss => ss.map((s, j) => (j === i ? { ...s, [k]: v } : s)));
  const cols = ["#2c4a6e", "#2c6e49", "#b8862b", "#c0392b", "#7d3c98", "#16808a"];
  const xjEnd = P.xjGauss(Q / Math.sqrt(Math.PI * tot), CB, tot) * UM;
  return (
    <div style={box}>
      <div style={ctl}>
        <Row><span style={{ fontSize: 14 }}>杂质：</span><Seg options={dopOpts(["B", "P", "As", "Sb"])} value={dop} onChange={setDop} />
          <button className="plot-reset" onClick={() => steps.length < 6 && setSteps(ss => [...ss, { name: `步骤 ${ss.length + 1}`, T: 950, t: 30 }])}>＋ 加一步</button>
          <button className="plot-reset" onClick={() => steps.length > 1 && setSteps(ss => ss.slice(0, -1))}>－ 删最后一步</button>
          <button className="plot-reset" onClick={() => setSteps(STEP0)}>重置</button></Row>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 14px", fontSize: 14, margin: "4px 0" }}>
            <b style={{ minWidth: 72, color: cols[i] }}>{r.name}</b>
            <Slider label={R`T_{${i + 1}}`} value={r.T} set={v => upd(i, "T", v)} min={700} max={1200} step={5} fmt={v => R`${v.toFixed(0)}^\circ\mathrm C`} />
            <Slider label={R`t_{${i + 1}}`} value={r.t} set={v => upd(i, "t", v)} min={0.1} max={2000} log fmt={v => tFmt(v * 60)} />
            <span style={{ flex: "1 1 160px", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ display: "inline-block", height: 10, width: `${Math.max(1, 100 * r.Dt / tot)}%`, maxWidth: 150, background: cols[i], borderRadius: 3 }} />
              <TeX t={R`${(100 * r.Dt / tot).toFixed(r.Dt / tot < 0.01 ? 2 : 1)}\%`} /></span>
          </div>))}
        <Row><Slider label={R`T_{\rm ref}`} value={Tref} set={setTref} min={800} max={1200} step={5} fmt={v => R`${v.toFixed(0)}^\circ\mathrm C`} /></Row>
        <Readout items={[[R`(Dt)_{\rm eff}`, R`${sci(tot)}\ \mathrm{cm^2}`], [R`t^{\rm equiv}(T_{\rm ref})`, tFmt(teq)], [R`x_j\ (Q=4.3\times10^{13},\ C_B=10^{15})`, R`${xjEnd.toPrecision(3)}\,\mu\mathrm m`]]} />
      </div>
      <Plot
        x={{ label: R`\text{深度}\ x\ [\mu\mathrm m]`, domain: [0, Math.max(0.5, xjEnd * 1.4)] }}
        y={{ label: R`C\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e14, 1e20] }}
        series={() => cum.map((c, i) => ({ label: R`\text{第 ${i + 1} 步后}`, f: x => P.gaussSurf(x / UM, Q, c), color: cols[i], width: i === cum.length - 1 ? 2.8 : 1.6 }))
          .concat([{ label: R`C_B`, f: () => CB, dash: "dash", color: "#888" }])}
        samples={200} />
    </div>);
}

// ===================== 图 7.15 交互版 + §7.7 例题的设计流程 =====================
export function IrvinDesign() {
  const [rhoS, setRho] = useState(900), [xjU, setXj] = useState(3), [CB, setCB] = useState(1e15);
  const [shape, setShape] = useState("gauss"), [Td, setTd] = useState(1100), [Tp, setTp] = useState(950), [Csol, setCsol] = useState(2.5e20);
  const xj = xjU / UM, sig = 1 / (rhoS * xj);
  const Cs = useMemo(() => P.csFromSigma(sig, CB, shape, "p"), [sig, CB, shape]);
  const Dt = shape === "gauss" ? xj * xj / (4 * Math.log(Cs / CB)) : Math.pow(xj / (2 * P.erfcinv(CB / Cs)), 2);
  const Dd = P.Dint("B", Td), tDrive = Dt / Dd;
  const Q = shape === "gauss" ? Cs * Math.sqrt(Math.PI * Dt) : P.doseErfc(Cs, Dt);
  const Dp = P.Dint("B", Tp), tPre = Math.pow(Q / Csol, 2) * Math.PI / 4 / Dp;
  const step = (n, tex) => <li style={{ margin: "3px 0" }}><b>{n}</b> <TeX t={tex} /></li>;
  return (
    <div style={box}>
      <div style={ctl}>
        <Row>
          <Slider label={R`\rho_S`} value={rhoS} set={setRho} min={20} max={5000} log fmt={v => R`${v.toFixed(0)}\ \Omega/\square`} />
          <Slider label={R`x_j`} value={xjU} set={setXj} min={0.2} max={6} step={0.05} fmt={v => R`${v.toFixed(2)}\,\mu\mathrm m`} />
          <Slider label={R`C_B`} value={CB} set={setCB} min={1e14} max={1e18} log fmt={v => sci(v, 1)} />
        </Row>
        <Row><Seg options={[["gauss", "高斯分布（推进后）"], ["erfc", "erfc 分布（预淀积）"]]} value={shape} onChange={setShape} />
          <Slider label={R`T_{\rm drive}`} value={Td} set={setTd} min={900} max={1200} step={5} fmt={v => R`${v.toFixed(0)}^\circ\mathrm C`} />
          <Slider label={R`T_{\rm pre}`} value={Tp} set={setTp} min={850} max={1100} step={5} fmt={v => R`${v.toFixed(0)}^\circ\mathrm C`} />
          <Slider label={R`C_{\rm sol}`} value={Csol} set={setCsol} min={1e19} max={1e21} log fmt={v => sci(v, 1)} /></Row>
        <ol style={{ fontSize: 14, paddingLeft: 18, margin: "6px 0" }}>
          {step("①", R`\bar\sigma=\dfrac{1}{\rho_S x_j}=${sig.toPrecision(3)}\ (\Omega\,\mathrm{cm})^{-1}`)}
          {step("②", R`\text{Irvin 曲线（本页重新积分）}\Rightarrow C_S\approx${sci(Cs)}\ \mathrm{cm^{-3}}`)}
          {step("③", shape === "gauss" ? R`Dt=\dfrac{x_j^2}{4\ln(C_S/C_B)}=${sci(Dt)}\ \mathrm{cm^2}` : R`Dt=\left[\dfrac{x_j}{2\,\mathrm{erfc}^{-1}(C_B/C_S)}\right]^2=${sci(Dt)}\ \mathrm{cm^2}`)}
          {step("④", R`D_{\rm B}(T_{\rm drive})=${sci(Dd)}\Rightarrow t_{\rm drive}=${tFmt(tDrive)}`)}
          {step("⑤", shape === "gauss" ? R`Q=C_S\sqrt{\pi Dt}=${sci(Q)}\ \mathrm{cm^{-2}}` : R`Q=\tfrac{2}{\sqrt\pi}C_S\sqrt{Dt}=${sci(Q)}\ \mathrm{cm^{-2}}`)}
          {step("⑥", R`t_{\rm pre}=\left(\dfrac{Q}{C_{\rm sol}}\right)^2\dfrac{\pi}{4}\dfrac{1}{D_{\rm B}(T_{\rm pre})}=${tFmt(tPre)},\quad \dfrac{(Dt)_{\rm pre}}{(Dt)_{\rm drive}}=${sci(Dp * tPre / Dt)}`)}
        </ol>
      </div>
      <Plot
        x={{ label: R`\text{表面浓度}\ C_S\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e16, 1e21] }}
        y={{ label: R`\bar\sigma\ [(\Omega\,\mathrm{cm})^{-1}]`, log: true, domain: [0.1, 2000] }}
        series={() => [1e14, 1e15, 1e16, 1e17, 1e18].map((cb, i) => ({
          label: R`C_B=10^{${14 + i}}`, f: c => P.sigmaBar(c, cb, shape, "p", 120), color: ["#16808a", "#1f1b16", "#2c4a6e", "#2c6e49", "#b8862b"][i], width: Math.abs(cb / CB - 1) < 1e-6 ? 3 : 1.5,
        })).concat([{ label: R`\bar\sigma=${sig.toPrecision(3)}`, f: () => sig, dash: "dot", color: "#c0392b" }])}
        vlines={[{ x: Cs, label: R`C_S` }]}
        samples={90} />
    </div>);
}

// ===================== §7.8 有限差分：显式 / 隐式，与解析解对照 =====================
export function FDSolver() {
  const [method, setMethod] = useState("explicit"), [r, setR] = useState(0.4), [nst, setN] = useState(60), [init, setInit] = useState("box");
  const N = 121, xs = Array.from({ length: N }, (_, i) => i - 60), a = 10;
  const C0 = xs.map(x => (init === "box" ? (Math.abs(x) <= a ? 1 : 0) : x === 0 ? 1 : 0));
  const steps = Math.round(nst), tau = r * steps;
  const C = useMemo(() => P.fdRun(C0, r, steps, method, "reflect"), [r, steps, method, init]);
  const anal = x => (init === "box" ? 0.5 * (P.erf((x + a + 0.5) / (2 * Math.sqrt(tau))) - P.erf((x - a - 0.5) / (2 * Math.sqrt(tau))))
    : Math.exp(-x * x / (4 * tau)) / Math.sqrt(4 * Math.PI * tau));
  let err = 0; xs.forEach((x, i) => { err = Math.max(err, Math.abs(C[i] - anal(x))); });
  const peak = init === "box" ? 1 : Math.max(anal(0), 0.02);
  const stable = method === "implicit" || r <= 0.5;
  return (
    <div style={box}>
      <div style={ctl}>
        <Row><Seg options={[["explicit", "显式（式 7.37）"], ["implicit", "隐式（向后 Euler）"]]} value={method} onChange={setMethod} />
          <Seg options={[["box", "初始：方波（外延层）"], ["delta", "初始：单点尖峰"]]} value={init} onChange={setInit} /></Row>
        <Row><Slider label={R`r=\frac{D\Delta t}{\Delta x^2}`} value={r} set={setR} min={0.05} max={1.2} step={0.01} />
          <Slider label={R`\text{步数}`} value={nst} set={setN} min={1} max={300} step={1} fmt={v => String(Math.round(v))} /></Row>
        <Readout items={[[R`Dt`, R`${tau.toFixed(1)}\,\Delta x^2`], [R`\max|C_{\rm num}-C_{\rm exact}|`, sci(err)]]}
          note={stable ? (method === "explicit" && Math.abs(r - 0.5) < 0.005 ? "r = 1/2：式 7.39，新值是左右邻点的平均。" : "") : "r > 1/2：显式格式不稳定，锯齿状误差每步放大。"} />
      </div>
      <Plot
        x={{ label: R`x\ [\Delta x]`, domain: [-40, 40] }}
        y={{ label: R`C`, domain: init === "box" ? [-0.3, 1.3] : [-0.25 * peak, 1.3 * peak] }}
        series={() => [
          { label: R`\text{解析解}`, f: anal, color: "#1f1b16" },
          { label: method === "explicit" ? R`\text{显式数值解}` : R`\text{隐式数值解}`, data: xs.map((x, i) => [x, C[i]]).filter(([x]) => Math.abs(x) <= 40), points: true, color: stable ? "#2c6e49" : "#c0392b" },
          { label: R`\text{初始分布}`, f: x => (init === "box" ? (Math.abs(x) <= a + 0.5 ? 1 : 0) : NaN), dash: "dot", color: "#999", width: 1.2 },
        ]}
        samples={321} />
    </div>);
}

// ===================== §7.9 电场增强因子 h =====================
export function HFieldPlot() {
  return <Plot
    x={{ label: R`C/n_i`, log: true, domain: [0.01, 100] }}
    y={{ label: R`h`, domain: [0.95, 2.05] }}
    params={[{ id: "u", label: R`C/n_i`, min: 0.01, max: 100, log: true, value: 14 }]}
    series={() => [{ label: R`h=1+\frac{C}{\sqrt{C^2+4n_i^2}}`, f: u => 1 + u / Math.sqrt(u * u + 4), color: "#c0392b" }, { label: R`h=2`, f: () => 2, dash: "dot", color: "#999" }]}
    vlines={p => { const u = p.u; return [{ x: u, label: R`h=${(1 + u / Math.sqrt(u * u + 4)).toFixed(3)}` }]; }}
    samples={160} />;
}

// ===================== 图 7.19 交互版：浓度依赖扩散的"箱形"分布 =====================
function interpLog(x, xs, Cs) { return num.interp(xs, Cs, x); }
export function ConcDepPlot() {
  const [dop, setDop] = useState("As"), [Tc, setT] = useState(1000), [tm, setTm] = useState(60), [Cs, setCs] = useState(1e20), [field, setField] = useState(false);
  const t = tm * 60, n_i = P.ni(Tc), Dstar = P.Deff73(dop, Tc, 1);
  const models = [
    { key: "k0", lab: R`D=D^*\ (\text{erfc})`, D: () => Dstar, color: "#777" },
    { key: "k1", lab: R`D=D^*\,(n/n_i)`, D: c => Dstar * P.nFree(c, n_i) / n_i, color: "#2c4a6e" },
    { key: "k2", lab: R`D=D^*\,(n/n_i)^2`, D: c => Dstar * Math.pow(P.nFree(c, n_i) / n_i, 2), color: "#c0392b" },
    { key: "tab", lab: R`\text{表 7.3：}D^0+D^{\mp}(\tfrac{n}{n_i})${dop === "P" ? R`+D^{=}(\tfrac{n}{n_i})^2` : ""}`, D: c => P.Deff73(dop, Tc, P.nFree(c, n_i) / n_i), color: DOPC[dop], dash: "dash" },
  ];
  const runs = useMemo(() => models.map(m => {
    const Dmax = m.D(Cs) * (field ? 2 : 1), L = Math.max(10 * Math.sqrt(Dmax * t), 1e-6);
    return { ...m, ...P.concDepRun({ Cs, n_i, Dfun: m.D, field, t, L, N: 260, steps: 260 }) };
  }), [dop, Tc, tm, Cs, field]);
  const xmax = Math.max(...runs.map(r => { const i = r.C.findIndex(v => v < 1e16); return i > 0 ? r.x[i] : r.x[r.x.length - 1]; })) * UM * 1.15;
  const xjOf = r => { const i = r.C.findIndex(v => v < 1e17); return i > 0 ? (r.x[i] * UM).toPrecision(3) : "—"; };
  return (
    <div style={box}>
      <div style={ctl}>
        <Row><span style={{ fontSize: 14 }}>杂质：</span><Seg options={dopOpts(["As", "P", "B", "Sb"])} value={dop} onChange={setDop} />
          <Seg options={[[false, "不计电场"], [true, "计入电场 h（式 7.41）"]]} value={field} onChange={setField} /></Row>
        <Row><Slider label={R`T`} value={Tc} set={setT} min={850} max={1150} step={5} fmt={v => R`${v.toFixed(0)}^\circ\mathrm C`} />
          <Slider label={R`t`} value={tm} set={setTm} min={1} max={600} log fmt={v => tFmt(v * 60)} />
          <Slider label={R`C_S`} value={Cs} set={setCs} min={1e18} max={4e20} log fmt={v => sci(v, 1)} /></Row>
        <Readout items={[[R`n_i(T)`, sci(n_i)], [R`C_S/n_i`, (Cs / n_i).toPrecision(3)], [R`D^*`, R`${sci(Dstar)}\ \mathrm{cm^2/s}`],
          ...runs.map(r => [R`x(10^{17})\big|_{\rm ${r.key}}`, R`${xjOf(r)}\,\mu\mathrm m`])]} />
      </div>
      <Plot
        x={{ label: R`\text{深度}\ x\ [\mu\mathrm m]`, domain: [0, xmax] }}
        y={{ label: R`C\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e16, 3 * Cs] }}
        series={() => runs.map(r => ({ label: r.lab, f: x => interpLog(x / UM, r.x, r.C), color: r.color, dash: r.dash, width: r.key === "k2" ? 2.6 : 2 }))
          .concat([{ label: R`n_i`, f: () => n_i, dash: "dot", color: "#b8862b", width: 1.2 }])}
        samples={260} />
    </div>);
}

// ===================== §7.11 分凝系数 m 与移动界面：堆积 / 耗尽 =====================
const M_DEF = { B: 0.3, P: 10, As: 10, Sb: 10 };
export function SegregationSim() {
  const [dop, setDop] = useState("B"), [m, setM] = useState(0.3), [Tc, setT] = useState(1000), [tm, setTm] = useState(60), [Xn, setX] = useState(100);
  const C0 = 1e18, t = tm * 60, X = Xn * 1e-7, D = P.Dint(dop, Tc);
  const L = Math.max(0.6e-4, 10 * Math.sqrt(D * t));
  const res = useMemo(() => P.segregationRun({ C0, m, D, t, X, L, N: 260, steps: 800 }), [m, D, t, X, L]);
  const xs = res.y.map(y => y * UM), oxs = res.ox.map(([y, c]) => [y * UM, c]);
  const pick = d => { setDop(d); setM(M_DEF[d]); };
  return (
    <div style={box}>
      <div style={ctl}>
        <Row><span style={{ fontSize: 14 }}>杂质：</span><Seg options={dopOpts(["B", "P", "As"])} value={dop} onChange={pick} />
          <Slider label={R`m=C_{\rm Si}/C_{\rm SiO_2}`} value={m} set={setM} min={0.03} max={100} log fmt={v => v.toPrecision(2)} /></Row>
        <Row><Slider label={R`T`} value={Tc} set={setT} min={850} max={1150} step={5} fmt={v => R`${v.toFixed(0)}^\circ\mathrm C`} />
          <Slider label={R`t`} value={tm} set={setTm} min={1} max={600} log fmt={v => tFmt(v * 60)} />
          <Slider label={R`x_{\rm ox}`} value={Xn} set={setX} min={0} max={500} step={5} fmt={v => R`${v.toFixed(0)}\,\mathrm{nm}`} /></Row>
        <Readout items={[[R`D`, R`${sci(D)}\ \mathrm{cm^2/s}`], [R`C_{\rm Si}(0)/C_0`, (res.C[0] / C0).toPrecision(3)], [R`0.44\,m`, (0.44 * m).toPrecision(3)]]}
          note={Xn === 0 ? "无氧化层生长：界面不动，分布保持均匀。" : 0.44 * m > 1 ? "0.44 m > 1：氧化层吃进的杂质少于被消耗的硅里的杂质，多余的被'雪犁'推到硅一侧 → 堆积。" : "0.44 m < 1：氧化层要的杂质多于被消耗的硅能给的，从硅中吸走 → 耗尽。"} />
      </div>
      <Plot
        x={{ label: R`\text{离 Si/SiO}_2\text{ 界面的距离 [}\mu\mathrm m]\ \ (<0\text{ 为氧化层})`, domain: [-Math.max(X * UM, 0.02), Math.min(L * UM, 0.6)] }}
        y={{ label: R`C\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e16, 1e20] }}
        series={() => [
          { label: R`\text{硅中}`, data: xs.map((x, i) => [x, res.C[i]]), color: DOPC[dop], width: 2.6 },
          { label: R`\text{氧化层中（冻结）}`, data: oxs.length ? oxs : [[0, NaN]], color: "#6f9fbd", width: 2.2 },
          { label: R`C_0`, f: () => C0, dash: "dot", color: "#999" },
        ]}
        vlines={[{ x: 0, label: R`\text{界面}` }]} samples={100} />
    </div>);
}
