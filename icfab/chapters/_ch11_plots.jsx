// 第 11 章（上）交互图。数值函数在 _ch11_phys.jsx（node 核对：原书例题 2.2τ = 25.1 ns；图 11.5 斜率为 1、
// 材料间比值与电阻率之比相同；Clausius–Mossotti：SiCOH(K=2.8) 加 30% 孔隙 → K≈2.07，与正文"K 可低至 2"一致）。
import { useState } from "react";
import { Plot, M } from "@kit";
import * as P from "./_ch11_phys.jsx";

const R = String.raw;
const sci = (v, d = 2) => { if (!Number.isFinite(v)) return "—"; const e = Math.floor(Math.log10(Math.abs(v))); const m = v / 10 ** e; return Math.abs(e) <= 2 ? (+v.toPrecision(d + 1)).toString() : `${m.toFixed(d)}\\times10^{${e}}`; };
const eng = (v, unit) => { const a = Math.abs(v); const T = [[1e-15, "f"], [1e-12, "p"], [1e-9, "n"], [1e-6, "\\mu "], [1e-3, "m"], [1, ""], [1e3, "k"], [1e6, "M"]]; let s = T[0]; for (const t of T) if (a >= t[0]) s = t; return `${(v / s[0]).toPrecision(3)}\\,\\mathrm{${s[1]}${unit}}`.replace("\\mathrm{\\mu ", "\\mu\\mathrm{"); };

// ================= 1. RC 延迟计算器（式 11.1、11.2、11.5）=================
const MATS = [
  { id: "Al", label: "Al（3.0）", rho: 3.0 }, { id: "AlCu", label: "Al(Cu)（3.5）", rho: 3.5 },
  { id: "Cu", label: "Cu 体值（1.7）", rho: 1.7 }, { id: "CuS", label: "Cu + 尺寸效应 + 阻挡层", rho: 1.7, size: true },
  { id: "W", label: "W（10）", rho: 10 }, { id: "Poly", label: "重掺多晶硅（500）", rho: 500 },
];
const DIEL = [{ k: 3.9, l: R`\mathrm{SiO_2}\ 3.9` }, { k: 3.5, l: R`\mathrm{FSG}\ 3.5` }, { k: 2.8, l: R`\mathrm{SiCOH}\ 2.8` }, { k: 2.2, l: R`\text{多孔}\ 2.2` }, { k: 1.0, l: R`\text{空气}\ 1.0` }];
function Slide({ label, v, set, min, max, log, unit, digits = 3 }) {
  const toS = x => (log ? Math.log10(x) : x), fromS = s => (log ? 10 ** s : s);
  return <label style={{ display: "grid", gridTemplateColumns: "8.5em 1fr 6.5em", alignItems: "center", gap: 8, fontSize: 14 }}>
    <span><M>{label}</M></span>
    <input type="range" min={toS(min)} max={toS(max)} step={log ? 0.01 : (max - min) / 200} value={toS(v)} onChange={e => set(fromS(+e.target.value))} />
    <span style={{ fontVariantNumeric: "tabular-nums" }}>{(+v).toPrecision(digits)} {unit}</span>
  </label>;
}
export function RCCalculator() {
  const [W, setW] = useState(100), [S, setS] = useState(100), [H, setH] = useState(100), [xD, setXD] = useState(1000), [Lmm, setL] = useState(10);
  const [mat, setMat] = useState("Al"), [K, setK] = useState(3.9), [b, setB] = useState(2);
  const m = MATS.find(x => x.id === mat);
  let rho = m.rho, area = W * H;
  if (m.size) { rho = P.rhoSize(m.rho, Math.max(1, W - 2 * b), Math.max(1, H - b)); area = P.effArea(W, H, b); }
  const rhoEff = rho * (W * H) / Math.max(area, 1e-9);            // 折算到整个截面 W×H 的等效电阻率
  const cm = x => x * P.NM, L = Lmm * 0.1;
  const Rw = P.lineR(rhoEff * 1e-6, L, cm(W), cm(H)), { CS, CI } = P.lineC(K, L, cm(W), cm(H), cm(xD), cm(S));
  const tau = Rw * (CS + CI), tD = 2.2 * tau;
  const preset = () => { setW(100); setS(100); setH(100); setXD(1000); setL(10); setMat("Al"); setK(3.9); };
  const btn = on => ({ padding: "2px 8px", margin: 2, borderRadius: 6, border: "1px solid #bbb", background: on ? "#2c4a6e" : "#fff", color: on ? "#fff" : "#333", fontSize: 13, cursor: "pointer" });
  const fC = CI / (CS + CI);
  return <div className="card" style={{ padding: 14 }}>
    <div style={{ display: "grid", gap: 6 }}>
      <Slide label="W" v={W} set={setW} min={10} max={2000} log unit="nm" />
      <Slide label="H" v={H} set={setH} min={10} max={3000} log unit="nm" />
      <Slide label="L_{\rm S}" v={S} set={setS} min={10} max={2000} log unit="nm" />
      <Slide label="x_{\rm D}" v={xD} set={setXD} min={10} max={3000} log unit="nm" />
      <Slide label="L" v={Lmm} set={setL} min={0.001} max={20} log unit="mm" />
      {m.size && <Slide label={R`\text{阻挡层厚}`} v={b} set={setB} min={0} max={8} unit="nm" digits={2} />}
    </div>
    <div style={{ margin: "8px 0 2px", fontSize: 14 }}>导体（括号内为 µΩ·cm）：{MATS.map(x => <button key={x.id} style={btn(mat === x.id)} onClick={() => setMat(x.id)}>{x.label}</button>)}</div>
    <div style={{ margin: "2px 0 8px", fontSize: 14 }}>介质 <M>{R`K_{\rm D}`}</M>：{DIEL.map(d => <button key={d.k} style={btn(K === d.k)} onClick={() => setK(d.k)}><M>{d.l}</M></button>)}
      <button style={{ ...btn(false), marginLeft: 10 }} onClick={preset}>载入原书例题</button></div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 6, fontSize: 14 }}>
      <div><M>{R`\rho_{\rm eff}=${rhoEff.toPrecision(3)}\,\mu\Omega\cdot\mathrm{cm}`}</M></div>
      <div><M>{R`R=${eng(Rw, "\\Omega")}`}</M></div>
      <div><M>{R`C_{\rm S}=${eng(CS, "F")}`}</M></div>
      <div><M>{R`C_{\rm I}=${eng(CI, "F")}`}</M></div>
      <div><M>{R`\tau=RC=${eng(tau, "s")}`}</M></div>
      <div><b><M>{R`t_{\rm D}=2.2\tau=${eng(tD, "s")}`}</M></b></div>
    </div>
    <div style={{ marginTop: 8, height: 14, display: "flex", borderRadius: 4, overflow: "hidden", border: "1px solid #ccc" }} title="电容构成">
      <div style={{ width: `${(1 - fC) * 100}%`, background: "#9fbfd8" }} /><div style={{ width: `${fC * 100}%`, background: "#c0392b" }} />
    </div>
    <p style={{ fontSize: 13, margin: "4px 0 0", color: "#555" }}>蓝：对衬底电容 {((1 - fC) * 100).toFixed(0)}%；红：线间耦合电容 {(fC * 100).toFixed(0)}%。
      {m.size ? " 尺寸效应：表面散射 + 晶界散射使 Cu 电阻率上升，且阻挡层（电阻率高、按不导电处理）占去截面。" : ""}
      {" "}比较：1 GHz 时钟周期为 1 ns。</p>
  </div>;
}

// ================= 2. 图 11.5 交互版：全局连线延迟 vs 芯片面积 =================
const F115 = [["Poly", 500, "#7d3c98"], ["WSi_2", 30, "#2c4a6e"], ["W", 10, "#16808a"], ["Al", 3, "#1f1b16"], ["Cu", 1.7, "#d07a32"]];
export function Fig115Plot() {
  return <Plot
    x={{ label: R`\text{芯片面积 } A\ (\mathrm{mm^2})`, log: true, domain: [1, 100] }}
    y={{ label: R`\text{延迟时间 (s)}`, log: true, domain: [1e-12, 1e-8] }}
    params={[
      { id: "F", label: R`F_{\min}\ (\mu\mathrm m)`, min: 0.1, max: 1, log: true, value: 1 },
      { id: "K", label: R`K_{\rm D}`, min: 1, max: 4, step: 0.05, value: 3.9 },
    ]}
    series={p => [
      ...F115.map(([n, rho, c]) => ({ label: R`\mathrm{${n}}\ (${rho}\,\mu\Omega\,\mathrm{cm})`, f: A => P.tauGlobal(rho, p.F, A, p.K), color: c })),
      { label: R`\tau_{\rm g}\ \text{栅延迟}`, f: () => P.tauGate(p.F), dash: "dash", color: "#c0392b" },
    ]}
    vlines={p => { const tg = P.tauGate(p.F), out = []; for (const [n, rho] of [["Al", 3], ["Cu", 1.7]]) { const A = tg / P.tauGlobal(rho, p.F, 1, p.K); if (A > 1 && A < 100) out.push({ x: A, label: R`\mathrm{${n}}:\ ${A.toFixed(0)}\,\mathrm{mm^2}` }); } return out; }}
    samples={60} />;
}

// ================= 3. 随工艺节点：栅延迟 vs 连线延迟 =================
export function NodePlot() {
  return <Plot
    x={{ label: R`\text{特征尺寸 } F\ (\mu\mathrm m)`, log: true, domain: [0.01, 1] }}
    y={{ label: R`\text{延迟 (s)}`, log: true, domain: [1e-13, 1e-6] }}
    params={[
      { id: "Lmm", label: R`L_{\text{全局}}\ (\mathrm{mm})`, min: 1, max: 20, step: 0.5, value: 10 },
      { id: "K", label: R`K_{\rm D}`, min: 1.5, max: 3.9, step: 0.05, value: 3.9 },
    ]}
    series={p => {
      const A = p.Lmm * p.Lmm;          // tauGlobal 以 L=√A 计
      const cuS = F => P.rhoSize(1.7, Math.max(2, F * 1000 - 4), Math.max(2, F * 1000 - 2)) * (F * F * 1e6) / P.effArea(F * 1000, F * 1000, 2);
      return [
        { label: R`\tau_{\rm g}\ (\text{图 11.5 读数外推})`, f: F => P.tauGate(F), dash: "dash", color: "#c0392b" },
        { label: R`\text{全局 Al，尺寸随 }F\text{ 缩小}`, f: F => P.tauGlobal(3, F, A, p.K), color: "#1f1b16" },
        { label: R`\text{全局 Cu（体电阻率）}`, f: F => P.tauGlobal(1.7, F, A, p.K), color: "#d07a32" },
        { label: R`\text{全局 Cu（含尺寸效应与 2 nm 阻挡层）}`, f: F => P.tauGlobal(cuS(F), F, A, p.K), color: "#7d3c98", dash: "dot" },
        { label: R`\text{全局 Cu，粗线 }W=H=L_{\rm S}=1\,\mu\mathrm m\text{ 不缩小}`, f: () => P.tauGlobal(1.7, 1, A, p.K), color: "#2c6e49", dash: "dashdot" },
        { label: R`\text{局部 Cu，}L=100F`, f: F => P.tau(cuS(F) * 1e-6, p.K, 100 * F * P.UM, F * P.UM, F * P.UM, 1 * P.UM, F * P.UM), color: "#16808a" },
      ];
    }}
    samples={80} />;
}

// ================= 4. 式 (11.4) 的阶跃响应：为什么是 2.2τ =================
export function StepPlot() {
  return <Plot
    x={{ label: R`t/\tau`, domain: [0, 5] }}
    y={{ label: R`V_{\rm out}/V_{\rm in}`, domain: [0, 1.05] }}
    params={[{ id: "f", label: R`R_{\rm Driver}\text{ 或 }C_{\rm Wire}\text{ 的倍数}`, min: 0.5, max: 2, step: 0.05, value: 1 }]}
    series={p => [
      { label: R`\tau\ \text{为基准}`, f: x => 1 - Math.exp(-x), color: "#2c4a6e" },
      { label: R`\tau'=${p.f.toFixed(2)}\tau`, f: x => 1 - Math.exp(-x / p.f), color: "#d07a32", dash: "dash" },
      { label: R`10\%,\ 90\%`, f: x => (x < 2.5 ? 0.1 : 0.9), color: "#999", dash: "dot", width: 1 },
    ]}
    vlines={p => [{ x: Math.log(10 / 9) * p.f, label: R`${(Math.log(10 / 9) * p.f).toFixed(3)}\tau` }, { x: Math.log(10) * p.f, label: R`\Delta t=${(Math.log(9) * p.f).toFixed(3)}\tau` }]}
    samples={200} />;
}

// ================= 5. 中继器：把 L² 变成 L =================
export function RepeaterPlot() {
  // 导线：Cu，W=H=L_S=0.2 µm，x_D=0.5 µm，K=3.9；τ_rep 可调
  const tw = Lmm => 2.2 * P.tau(1.7e-6, 3.9, Lmm * 0.1, 0.2 * P.UM, 0.2 * P.UM, 0.5 * P.UM, 0.2 * P.UM);
  return <Plot
    x={{ label: R`L\ (\mathrm{mm})`, log: true, domain: [0.1, 20] }}
    y={{ label: R`\text{延迟 (ns)}`, log: true, domain: [1e-3, 100] }}
    params={[{ id: "tr", label: R`\tau_{\rm rep}\ (\mathrm{ps})`, min: 2, max: 100, log: true, value: 20 }]}
    series={p => {
      const tr = p.tr * 1e-12;
      return [
        { label: R`\text{不分段：}2.2\tau\propto L^2`, f: L => tw(L) * 1e9, color: "#1f1b16" },
        { label: R`\text{等分 3 段（图 11.6）}`, f: L => P.repeaterDelay(tw(L), 3, tr) * 1e9, color: "#2c4a6e", dash: "dash" },
        { label: R`\text{最优段数 } n^*=\sqrt{t_{\rm D}/\tau_{\rm rep}}`, f: L => { const n = Math.max(1, Math.round(P.nOpt(tw(L), tr))); return P.repeaterDelay(tw(L), n, tr) * 1e9; }, color: "#d07a32" },
        { label: R`2\sqrt{t_{\rm D}\tau_{\rm rep}}\propto L`, f: L => 2 * Math.sqrt(tw(L) * tr) * 1e9, color: "#999", dash: "dot", width: 1.5 },
      ];
    }}
    vlines={p => { const tr = p.tr * 1e-12; const L = Math.sqrt(tr / tw(1)); return L > 0.1 && L < 20 ? [{ x: L, label: R`t_{\rm D}=\tau_{\rm rep}` }] : []; }}
    samples={120} />;
}

// ================= 6. 比接触电阻率与掺杂、势垒高度 =================
export function ContactPlot() {
  return <Plot
    x={{ label: R`N_{\rm D}\ (\mathrm{cm^{-3}})`, log: true, domain: [1e17, 1e21] }}
    y={{ label: R`\rho_{\rm c}\ (\Omega\cdot\mathrm{cm^2})`, log: true, domain: [1e-9, 1e3] }}
    params={[
      { id: "phi", label: R`\phi_{\rm B}\ (\mathrm{eV})`, min: 0.2, max: 0.9, step: 0.01, value: 0.6 },
      { id: "a", label: R`\text{接触孔边长 (nm)}`, min: 10, max: 1000, log: true, value: 50 },
    ]}
    series={p => {
      const A = (p.a * P.NM) ** 2, Rc = P.rhoC(1e20, p.phi) / A;
      return [
        { label: R`\phi_{\rm B}=${p.phi.toFixed(2)}\,\mathrm{eV}`, f: N => P.rhoC(N, p.phi), color: "#c0392b", width: 2.5 },
        { label: R`0.4\,\mathrm{eV}`, f: N => P.rhoC(N, 0.4), color: "#999", dash: "dash", width: 1.2 },
        { label: R`0.8\,\mathrm{eV}`, f: N => P.rhoC(N, 0.8), color: "#555", dash: "dash", width: 1.2 },
        { label: R`N_{\rm D}=10^{20}\text{ 时 } R_{\rm c}=\rho_{\rm c}/A_{\rm c}=${eng(Rc, "\\Omega")}`, f: () => NaN, color: "#fff" },
      ];
    }}
    vlines={[{ x: 5.9e18, label: R`E_{00}=kT` }]}
    samples={120} />;
}

// ================= 7. 电迁移寿命：Black 方程 =================
export function BlackPlot() {
  const T0 = 105 + 273.15;
  return <Plot
    x={{ label: R`J\ (\mathrm{MA/cm^2})`, log: true, domain: [0.1, 10] }}
    y={{ label: R`\mathrm{MTTF}/\mathrm{MTTF}(1\,\mathrm{MA/cm^2},105^\circ\mathrm C)`, log: true, domain: [1e-6, 1e4] }}
    params={[
      { id: "T", label: R`T\ (^\circ\mathrm C)`, min: 25, max: 350, step: 1, value: 105 },
      { id: "n", label: R`n`, min: 1, max: 3, step: 0.1, value: 2 },
      { id: "Ea", label: R`E_{\rm a}\ (\mathrm{eV})`, min: 0.4, max: 1.2, step: 0.01, value: 0.6 },
    ]}
    series={p => {
      const TK = p.T + 273.15;
      return [
        { label: R`T=${p.T}^\circ\mathrm C,\ E_{\rm a}=${p.Ea}`, f: J => P.blackRatio(J, TK, p.n, p.Ea, 1, T0), color: "#c0392b", width: 2.5 },
        { label: R`105^\circ\mathrm C\ \text{参考}`, f: J => P.blackRatio(J, T0, p.n, p.Ea, 1, T0), color: "#555", dash: "dash" },
        { label: R`\text{加速因子 }(300^\circ\mathrm C,\,2.5\ \text{vs}\ 105^\circ\mathrm C,\,1):\ ${sci(1 / P.blackRatio(2.5, 573.15, p.n, p.Ea, 1, T0), 1)}`, f: () => NaN, color: "#fff" },
      ];
    }}
    samples={80} />;
}

// ================= 8. Clausius–Mossotti：孔隙率与吸水对 K 的影响 =================
export function LowKPlot() {
  const xw = P.cmX(80);
  const Kmix = (K0, Pp, fw) => P.cmK((1 - Pp) * P.cmX(K0) + Math.min(fw, Pp) * xw);
  return <Plot
    x={{ label: R`\text{孔隙率 } P`, domain: [0, 0.7] }}
    y={{ label: R`K`, domain: [1, 4.2] }}
    params={[{ id: "fw", label: R`\text{吸水体积分数}`, min: 0, max: 0.08, step: 0.002, value: 0 }]}
    series={p => [
      { label: R`\mathrm{SiO_2}\ (K_0=3.9)`, f: x => Kmix(3.9, x, p.fw), color: "#2c4a6e" },
      { label: R`\mathrm{SiCOH}\ (K_0=2.8)`, f: x => Kmix(2.8, x, p.fw), color: "#d07a32" },
      { label: R`\text{聚合物}\ (K_0=2.4)`, f: x => Kmix(2.4, x, p.fw), color: "#2c6e49" },
      { label: R`K=2`, f: () => 2, color: "#999", dash: "dot", width: 1 },
    ]}
    samples={140} />;
}
