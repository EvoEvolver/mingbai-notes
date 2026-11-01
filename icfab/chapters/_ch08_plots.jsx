// 第 8 章（上）交互图：注入分布计算器、扩散展宽、掩蔽层、横向分布、阻止本领。数值函数见 _ch08_phys.jsx。
import { useMemo, useState } from "react";
import { Plot, TxI } from "@kit";
import * as P from "./_ch08_phys.jsx";

const R = String.raw;
export const ION_COLOR = { B: "#2c5f8a", BF2: "#16808a", P: "#b03a2e", As: "#2c6e49", Sb: "#7d3c98" };
const ION_LIST = ["B", "BF2", "P", "As", "Sb"];
const ionTex = k => P.IONS[k].tex;
export const sci = (v, d = 2) => {
  if (!Number.isFinite(v)) return "—";
  if (v === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(v))), m = v / 10 ** e;
  return `${m.toFixed(d - 1)}\\times10^{${e}}`;
};
const f1 = v => (Number.isFinite(v) ? v.toFixed(1) : "—");

// ---------- 小部件 ----------
export function Seg({ options, value, onChange, tex = true }) {
  return <div className="seg">{options.map(o => {
    const [k, lab] = Array.isArray(o) ? o : [o, o];
    return <button key={k} className={value === k ? "on" : ""} onClick={() => onChange(k)}>{tex ? <TxI>{`$${lab}$`}</TxI> : lab}</button>;
  })}</div>;
}
export function Slider({ label, value, set, min, max, step, log = false, fmt }) {
  const toS = v => (log ? Math.log10(v) : v), fromS = s => (log ? 10 ** s : s);
  return <label className="plot-param" style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0" }}>
    <span style={{ minWidth: 190 }}><TxI>{`$${label}=${fmt ? fmt(value) : +(+value).toPrecision(3)}$`}</TxI></span>
    <input type="range" style={{ flex: 1 }} min={toS(min)} max={toS(max)} step={log ? 0.01 : step} value={toS(value)} onChange={e => set(fromS(+e.target.value))} />
  </label>;
}
const Panel = ({ children }) => <div className="card" style={{ padding: "12px 14px", margin: "10px 0" }}>{children}</div>;
const Read = ({ children }) => <div style={{ fontSize: 14, lineHeight: 1.7, margin: "6px 0 2px" }}><TxI>{children}</TxI></div>;

// 各离子 Pearson IV 的示意默认值（原书未给出 γ、β 的数值表；取典型量级，仅用于演示形状）
export const PEARSON_DEFAULT = { B: [-0.7, 4.3], BF2: [-0.4, 3.6], P: [-0.15, 3.3], As: [0.15, 3.3], Sb: [0.3, 3.5] };

// ---------- 1. 注入分布计算器（核心）----------
export function ProfileCalc() {
  const [ion, setIon] = useState("B");
  const [model, setModel] = useState("g");
  const [E, setE] = useState(100), [Q, setQ] = useState(1e15), [CB, setCB] = useState(1e16);
  const [g, setG] = useState(PEARSON_DEFAULT.B[0]), [b, setB] = useState(PEARSON_DEFAULT.B[1]);
  const pickIon = k => { setIon(k); setG(PEARSON_DEFAULT[k][0]); setB(PEARSON_DEFAULT[k][1]); };
  const m = P.moments(ion, E), Cp = Q / (Math.sqrt(2 * Math.PI) * m.dRp * 1e-7);
  const bmin = P.betaMin(g), bUse = Math.max(b, bmin + 0.02);
  const pf = useMemo(() => (model === "p" ? P.pearson4(m.Rp, m.dRp, g, bUse) : null), [model, m.Rp, m.dRp, g, bUse]);
  const C = model === "p" && pf ? x => Q * 1e7 * pf(x) : x => P.gauss(x, Q, m.Rp, m.dRp);
  const xmax = Math.max(60, Math.ceil((m.Rp + 6.5 * m.dRp) / 50) * 50);
  const xj = P.junctionDepth(C, CB, m.Rp, xmax * 3);
  const cpeak = model === "p" && pf ? Q * 1e7 * pf(m.Rp + (-g * m.dRp * (bUse + 3) / (10 * bUse - 12 * g * g - 18))) : Cp;
  const series = () => {
    const s = [{ label: R`\text{高斯 (8.4)}`, f: x => P.gauss(x, Q, m.Rp, m.dRp), color: ION_COLOR[ion], dash: model === "p" ? "dash" : undefined, width: model === "p" ? 1.5 : 2.5 }];
    if (model === "p" && pf) s.push({ label: R`\text{Pearson IV}\ (\gamma=${g.toFixed(2)},\ \beta=${bUse.toFixed(2)})`, f: x => Q * 1e7 * pf(x), color: ION_COLOR[ion], width: 2.5 });
    s.push({ label: R`C_B`, f: () => CB, color: "#999", dash: "dot", width: 1.5 });
    return s;
  };
  return <Panel>
    <Seg options={ION_LIST.map(k => [k, ionTex(k)])} value={ion} onChange={pickIon} />
    <Seg options={[["g", R`\text{高斯}`], ["p", R`\text{Pearson IV}`]]} value={model} onChange={setModel} />
    <Slider label={R`E\ [\mathrm{keV}]`} value={E} set={setE} min={5} max={ion === "BF2" ? 400 : 200} step={1} fmt={v => v.toFixed(0)} />
    <Slider label={R`Q\ [\mathrm{cm^{-2}}]`} value={Q} set={setQ} min={1e11} max={1e16} log fmt={v => sci(v)} />
    <Slider label={R`C_B\ [\mathrm{cm^{-3}}]`} value={CB} set={setCB} min={1e14} max={1e19} log fmt={v => sci(v)} />
    {model === "p" && <>
      <Slider label={R`\gamma`} value={g} set={setG} min={-1.5} max={1.5} step={0.05} fmt={v => v.toFixed(2)} />
      <Slider label={R`\beta`} value={b} set={setB} min={2.8} max={8} step={0.05} fmt={v => v.toFixed(2)} />
    </>}
    <Plot key={ion + model} x={{ label: R`\text{深度}\ x\ [\mathrm{nm}]`, domain: [0, xmax] }} y={{ label: R`C(x)\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e14, 1e22] }}
      series={series} vlines={() => [{ x: m.Rp, label: R`R_P` }, ...(xj ? [{ x: xj, label: R`x_j=${f1(xj)}` }] : [])]} samples={400} height={360} />
    <Read>{`$R_P=${f1(m.Rp)}\\,\\mathrm{nm}$，$\\Delta R_P=${f1(m.dRp)}\\,\\mathrm{nm}$${ion === "BF2" ? `（按 B 分得的能量 $${m.Eeff.toFixed(1)}\\,\\mathrm{keV}$ 查表 8.1）` : ""}；高斯峰值 $C_P=Q/(\\sqrt{2\\pi}\\Delta R_P)=${sci(Cp, 3)}\\,\\mathrm{cm^{-3}}$${model === "p" ? `，Pearson 峰值 $\\approx${sci(cpeak, 3)}$` : ""}；与背景 $C_B$ 的结深 $x_j=${xj ? f1(xj) + "\\,\\mathrm{nm}" : "\\text{（峰值低于背景，无结）}"}$。${m.extrap ? "**注意：能量超出表 8.1 范围，为幂律外推。**" : ""}${model === "p" && b < bmin + 0.02 ? ` **$\\beta$ 已自动抬到 IV 型下界 $${bmin.toFixed(2)}$ 以上。**` : ""}`}</Read>
  </Panel>;
}

// ---------- 2. 扩散展宽：式 (8.8) 与 (8.9) ----------
export function DiffusionPlot() {
  const [E, setE] = useState(300), [Dt, setDt] = useState(0.02);   // Dt 以 µm² 计
  const Q = 1e14, m = P.moments("B", E), s0 = m.dRp * 1e-3;            // µm
  const xmax = Math.max(1.2, (m.Rp * 1e-3 + 5 * Math.sqrt(s0 * s0 + 2 * Dt)));
  const two = x => Q / Math.sqrt(2 * Math.PI * (s0 * s0 + 2 * Dt) * 1e-8) * Math.exp(-((x - m.Rp * 1e-3) ** 2) / (2 * (s0 * s0 + 2 * Dt)));
  const one = x => Q / Math.sqrt(Math.PI * Dt * 1e-8) * Math.exp(-x * x / (4 * Dt));
  return <Panel>
    <Slider label={R`E_{\rm B}\ [\mathrm{keV}]`} value={E} set={setE} min={10} max={400} step={5} fmt={v => v.toFixed(0)} />
    <Slider label={R`Dt\ [\mathrm{\mu m}^2]`} value={Dt} set={setDt} min={1e-4} max={0.3} log fmt={v => sci(v)} />
    <Plot key="dif" x={{ label: R`\text{深度}\ x\ [\mathrm{\mu m}]`, domain: [0, Math.ceil(xmax * 5) / 5] }} y={{ label: R`C\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e14, 1e20] }}
      series={() => [
        { label: R`\text{注入后（高斯 (8.4)）}`, f: x => P.gauss(x * 1e3, Q, m.Rp, m.dRp), color: "#999", dash: "dash" },
        { label: R`\text{两侧高斯 (8.9)}`, f: two, color: ION_COLOR.B, width: 2.5 },
        { label: R`\text{表面}\ \delta\ \text{源一侧高斯 (8.8)}`, f: one, color: "#b8862b", dash: "dashdot" },
      ]} samples={300} height={340} />
    <Read>{`$Q=10^{14}\\,\\mathrm{cm^{-2}}$ 的 B 注入。$R_P=${(m.Rp * 1e-3).toFixed(3)}\\,\\mathrm{\\mu m}$，$\\sqrt{Dt}=${Math.sqrt(Dt).toFixed(3)}\\,\\mathrm{\\mu m}$。当 $\\sqrt{Dt}\\gg R_P,\\Delta R_P$（浅注入、长扩散）时两种近似趋于一致，用 (8.8)；当 $R_P$ 远大于扩散长度（深注入）时 (8.9) 才对——(8.8) 把剂量错放在表面。展宽后峰值按 $\\Delta R_P/\\sqrt{\\Delta R_P^2+2Dt}=${(s0 / Math.sqrt(s0 * s0 + 2 * Dt)).toFixed(3)}$ 的比例下降。`}</Read>
  </Panel>;
}

// ---------- 3. 掩蔽层厚度与穿透剂量：式 (8.15)–(8.19) 与例题 ----------
export function MaskCalc() {
  const [ion, setIon] = useState("As");
  const [E, setE] = useState(50), [Q, setQ] = useState(2e15), [CB, setCB] = useState(1e16), [xm, setXm] = useState(107.1), [sc, setSc] = useState(1);
  const m0 = P.moments(ion, E), Rp = m0.Rp * sc, dRp = m0.dRp * sc;
  const Cp = Q / (Math.sqrt(2 * Math.PI) * dRp * 1e-7), xreq = P.maskThickness(Q, Rp, dRp, CB), mm = (xreq - Rp) / dRp;
  const Cx = P.gauss(xm, Q, Rp, dRp), Qp = P.penetratedDose(Q, Rp, dRp, xm);
  const xmax = Math.max(xm * 1.35, Rp + 7 * dRp);
  return <Panel>
    <Seg options={ION_LIST.map(k => [k, ionTex(k)])} value={ion} onChange={setIon} />
    <Slider label={R`E\ [\mathrm{keV}]`} value={E} set={setE} min={10} max={ion === "BF2" ? 400 : 200} step={1} fmt={v => v.toFixed(0)} />
    <Slider label={R`Q\ [\mathrm{cm^{-2}}]`} value={Q} set={setQ} min={1e11} max={1e16} log fmt={v => sci(v)} />
    <Slider label={R`C_B\ [\mathrm{cm^{-3}}]`} value={CB} set={setCB} min={1e14} max={1e18} log fmt={v => sci(v)} />
    <Slider label={R`x_{\rm m}\ [\mathrm{nm}]`} value={xm} set={setXm} min={5} max={1500} log fmt={v => v.toFixed(0)} />
    <Slider label={R`\text{掩模材料射程系数}\ s`} value={sc} set={setSc} min={0.5} max={2.5} step={0.05} fmt={v => v.toFixed(2)} />
    <Plot key="mask" x={{ label: R`\text{自掩模表面起的深度}\ [\mathrm{nm}]`, domain: [0, xmax] }} y={{ label: R`C\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e13, 1e22] }}
      series={() => [
        { label: R`\text{掩模中的高斯分布}`, f: x => (x <= xm ? P.gauss(x, Q, Rp, dRp) : NaN), color: ION_COLOR[ion], width: 2.5 },
        { label: R`\text{穿入衬底的尾部}`, f: x => (x >= xm ? P.gauss(x, Q, Rp, dRp) : NaN), color: "#c0392b", width: 2.5 },
        { label: R`C_B`, f: () => CB, color: "#999", dash: "dot", width: 1.5 },
      ]}
      vlines={() => [{ x: xm, label: R`x_{\rm m}` }, { x: xreq, label: Math.abs(xreq - xm) > 0.08 * xmax ? R`x_{\rm m}^{\rm req}` : "" }]} samples={400} height={340} />
    <Read>{`掩模内 $R_P=${f1(Rp)}\\,\\mathrm{nm}$，$\\Delta R_P=${f1(dRp)}\\,\\mathrm{nm}$，$C_P=${sci(Cp, 3)}\\,\\mathrm{cm^{-3}}$。按浓度判据 (8.16)：所需厚度 $x_{\\rm m}^{\\rm req}=R_P+${mm.toFixed(2)}\\,\\Delta R_P=${f1(xreq)}\\,\\mathrm{nm}$。当前 $x_{\\rm m}$ 下界面浓度 $C(x_{\\rm m})=${sci(Cx, 3)}\\,\\mathrm{cm^{-3}}$ ${Cx <= CB ? "$\\le C_B$（满足）" : "$>C_B$（**不满足**）"}；按剂量判据 (8.19)：穿透剂量 $Q_P=${sci(Qp, 3)}\\,\\mathrm{cm^{-2}}$（占 $${sci(Qp / Q, 2)}$）。`}</Read>
  </Panel>;
}

// ---------- 4. 横向分布：式 (8.20)–(8.21)（改正后）----------
export function LateralPlot() {
  const [a, setA] = useState(150), [sl, setSl] = useState(25);
  const lat = y => 0.5 * (P.erfc((y - a) / (Math.SQRT2 * sl)) - P.erfc((y + a) / (Math.SQRT2 * sl)));
  return <Panel>
    <Slider label={R`a\ [\mathrm{nm}]\ (\text{开口半宽})`} value={a} set={setA} min={5} max={300} step={1} fmt={v => v.toFixed(0)} />
    <Slider label={R`\Delta R_{\rm lat}\ [\mathrm{nm}]`} value={sl} set={setSl} min={2} max={120} step={1} fmt={v => v.toFixed(0)} />
    <Plot key="lat" x={{ label: R`\text{横向位置}\ y\ [\mathrm{nm}]`, domain: [-400, 400] }} y={{ label: R`C(x,y)/C_{\rm ver}(x)`, log: true, domain: [1e-5, 2] }}
      series={() => [
        { label: R`\text{(8.21) 改正式}`, f: lat, color: ION_COLOR.As, width: 2.5 },
        { label: R`\text{单束点扩展函数 (8.20)}\times\sqrt{2\pi}\Delta R_{\rm lat}`, f: y => Math.exp(-y * y / (2 * sl * sl)), color: "#999", dash: "dash" },
      ]} vlines={() => [{ x: -a, label: R`-a` }, { x: a, label: R`+a` }]} samples={400} height={320} />
    <Read>{`掩模边缘 $y=\\pm a$ 处浓度恰为开口中心的 $${(lat(a) / lat(0)).toFixed(3)}$ 倍（宽开口时趋于 $1/2$）；在边缘外 $2\\Delta R_{\\rm lat}$ 处降到 $${sci(lat(a + 2 * sl) / lat(0), 2)}$。开口宽度 $2a$ 小到与 $\\Delta R_{\\rm lat}$ 可比时，中心浓度本身也会下降：$C(x,0)/C_{\\rm ver}=${lat(0).toFixed(3)}$。`}</Read>
  </Panel>;
}

// ---------- 5. 阻止本领（图 8.19 交互版）与射程估计 ----------
const STOP_IONS = ["B", "P", "As", "Sb"];
export function StoppingPlot() {
  const [ion, setIon] = useState("P"), [E0, setE0] = useState(100);
  const { Z, m } = P.IONS[ion], N = P.SI.N, toKeVum = S => S * N * 1e-7;   // eV cm² → keV/µm：N S [eV/cm] × 1e-4 cm/µm ÷ 1e3 eV/keV
  const Sn0 = P.SnConst(Z, m), Ecross = (Sn0 / P.K_SE) ** 2 / 1e3;
  let Ezbl = null; { let lo = 0.1, hi = 1e5; const d = E => P.SnZBL(E, Z, m) - P.Se(E * 1e3); if (d(lo) > 0 && d(hi) < 0) { for (let i = 0; i < 80; i++) { const c = Math.sqrt(lo * hi); if (d(c) > 0) lo = c; else hi = c; } Ezbl = lo; } }
  const RL = P.rpFromR(P.rangeLSS(E0, Z, m), m), RZ = P.rpFromR(P.rangeZBL(E0, Z, m), m), Rt = P.moments(ion, E0).Rp;
  return <Panel>
    <Seg options={STOP_IONS.map(k => [k, ionTex(k)])} value={ion} onChange={setIon} />
    <Slider label={R`E_0\ [\mathrm{keV}]`} value={E0} set={setE0} min={10} max={200} step={1} fmt={v => v.toFixed(0)} />
    <Plot key={"st" + ion} x={{ label: R`E\ [\mathrm{keV}]`, log: true, domain: [1, 1000] }} y={{ label: R`NS(E)\ [\mathrm{keV}/\mathrm{\mu m}]`, log: true, domain: [5, 5000] }}
      series={() => [
        { label: R`NS_n\ \text{(ZBL 普适势)}`, f: E => toKeVum(P.SnZBL(E, Z, m)), color: ION_COLOR[ion], width: 2.5 },
        { label: R`NS_n\ \text{常数近似 (8.28)}`, f: () => toKeVum(Sn0), color: ION_COLOR[ion], dash: "dash" },
        { label: R`NS_e=Nk\sqrt E\ \text{(8.30)(8.31)}`, f: E => toKeVum(P.Se(E * 1e3)), color: "#1f1b16" },
      ]}
      vlines={() => [...(Ezbl && Ezbl < 1000 ? [{ x: Ezbl, label: R`S_n=S_e` }] : []), { x: E0, label: Ezbl && Math.abs(Math.log(E0 / Ezbl)) < 0.25 ? "" : R`E_0` }]} samples={240} height={340} />
    <Read>{`常数核阻止 (8.28)：$NS_n=${toKeVum(Sn0).toFixed(0)}\\,\\mathrm{keV}/\\mathrm{\\mu m}$，与 $k\\sqrt E$ 相交于 $E=(S_n/k)^2\\approx${Ecross < 1e4 ? Ecross.toFixed(0) : sci(Ecross)}\\,\\mathrm{keV}$${Ezbl ? `；用能量相关的 ZBL 核阻止，交叉点 $\\approx${Ezbl.toFixed(0)}\\,\\mathrm{keV}$` : ""}。$E_0=${E0}\\,\\mathrm{keV}$ 的投影射程估计：(8.23)+(8.24) 常数 $S_n$ 得 $R_P\\approx${f1(RL)}\\,\\mathrm{nm}$；换用 ZBL $S_n$ 得 $${f1(RZ)}\\,\\mathrm{nm}$；表 8.1 为 $${f1(Rt)}\\,\\mathrm{nm}$。`}</Read>
  </Panel>;
}

// ---------- 6. 图 8.8 交互版：B 与 Sb（100 keV、1e15）的高斯 vs Pearson IV ----------
export function PearsonFig88() {
  const Q = 1e15, mB = P.moments("B", 100), mS = P.moments("Sb", 100);
  return <Plot key="p88" x={{ label: R`\text{深度}\ x\ [\mathrm{nm}]`, domain: [0, 1000] }} y={{ label: R`C\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e14, 1e21] }}
    params={[
      { id: "gB", label: R`\gamma_{\rm B}`, min: -1.5, max: 0.5, step: 0.05, value: PEARSON_DEFAULT.B[0] },
      { id: "bB", label: R`\beta_{\rm B}`, min: 3, max: 8, step: 0.05, value: PEARSON_DEFAULT.B[1] },
      { id: "gS", label: R`\gamma_{\rm Sb}`, min: -0.5, max: 1.5, step: 0.05, value: PEARSON_DEFAULT.Sb[0] },
      { id: "bS", label: R`\beta_{\rm Sb}`, min: 3, max: 8, step: 0.05, value: PEARSON_DEFAULT.Sb[1] },
    ]}
    series={p => {
      const fB = P.pearson4(mB.Rp, mB.dRp, p.gB, Math.max(p.bB, P.betaMin(p.gB) + 0.02)), fS = P.pearson4(mS.Rp, mS.dRp, p.gS, Math.max(p.bS, P.betaMin(p.gS) + 0.02));
      return [
        { label: R`\text{B 高斯}`, f: x => P.gauss(x, Q, mB.Rp, mB.dRp), color: ION_COLOR.B, dash: "dash", width: 1.5 },
        { label: R`\text{B Pearson IV}`, f: x => (fB ? Q * 1e7 * fB(x) : NaN), color: ION_COLOR.B, width: 2.5 },
        { label: R`\text{Sb 高斯}`, f: x => P.gauss(x, Q, mS.Rp, mS.dRp), color: ION_COLOR.Sb, dash: "dash", width: 1.5 },
        { label: R`\text{Sb Pearson IV}`, f: x => (fS ? Q * 1e7 * fS(x) : NaN), color: ION_COLOR.Sb, width: 2.5 },
      ];
    }}
    vlines={() => [{ x: mB.Rp, label: R`R_P(\mathrm B)` }]} samples={500} height={340}
    caption={R`$R_P$、$\Delta R_P$ 取表 8.1；$\gamma$、$\beta$ 为可调的示意值（原书未列出）。$\beta$ 低于 IV 型下界时自动抬高。注意 $\gamma<0$ 时峰向深处移、浅侧抬高；$\gamma>0$ 相反。`} />;
}

// ---------- 7. 剂量匹配法（式 8.14）示意：P 注入穿过覆盖层进入 Si ----------
// 覆盖层的矩取 Si 矩乘以系数 s1（原书未给出 Si3N4 的矩表；s1 < 1 表示该材料阻止能力更强）
export function DoseMatchPlot() {
  const Q = 1e14, m = P.moments("P", 100);
  const cum = (Rp, s, x) => 0.5 * (P.erfc((0 - Rp) / (Math.SQRT2 * s)) - P.erfc((x - Rp) / (Math.SQRT2 * s)));   // ∫_0^x 归一化高斯
  return <Plot key="dm" x={{ label: R`\text{深度（自覆盖层表面起）}\ [\mathrm{nm}]`, domain: [0, 450] }} y={{ label: R`C\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e14, 1e20] }}
    params={[
      { id: "t1", label: R`t_1\ [\mathrm{nm}]`, min: 0, max: 250, step: 1, value: 80 },
      { id: "s1", label: R`s_1\ (\text{覆盖层射程系数})`, min: 0.5, max: 1.5, step: 0.01, value: 0.75 },
    ]}
    series={p => {
      const R1 = m.Rp * p.s1, S1 = m.dRp * p.s1, Q1 = Q * cum(R1, S1, p.t1);
      // 求 x'：∫_0^{x'} C2 = Q1（材料 2 为 Si）
      let lo = 0, hi = 5000; for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (Q * cum(m.Rp, m.dRp, mid) < Q1) lo = mid; else hi = mid; }
      const xp = lo;
      return [
        { label: R`\text{覆盖层中}\ C_1\ (Q_1/Q=${(Q1 / Q).toFixed(3)})`, f: x => (x <= p.t1 ? P.gauss(x, Q, R1, S1) : NaN), color: "#2c6e49", width: 2.5 },
        { label: R`\text{Si 中（剂量匹配，}x'=${xp.toFixed(0)}\,\mathrm{nm})`, f: x => (x >= p.t1 ? P.gauss(x - p.t1 + xp, Q, m.Rp, m.dRp) : NaN), color: ION_COLOR.P, width: 2.5 },
        { label: R`\text{全为 Si 时的分布（参考）}`, f: x => P.gauss(x, Q, m.Rp, m.dRp), color: "#999", dash: "dot", width: 1.5 },
      ];
    }}
    vlines={p => [{ x: p.t1, label: R`t_1` }]} samples={450} height={330}
    caption={R`$10^{14}\,\mathrm{cm^{-2}}$、100 keV 的 P（参照图 8.13 的条件）。覆盖层的 $R_P$、$\Delta R_P$ 取 Si 值乘以 $s_1$（示意，原书未给出氮化硅的矩表）。界面处的浓度跳变是剂量匹配法本身的特征。`} />;
}

// ---------- 8. 二维分布与倾斜注入（图 8.16 / 8.17 的解析版）----------
// 对每个入射束元做点扩展函数（纵向高斯 × 横向高斯，沿束方向旋转），对未被栅遮挡的入射点积分。
export function TiltMap2D() {
  const [tilt, setTilt] = useState(0), [E, setE] = useState(100), [lr, setLr] = useState(0.8);
  const Q = 5e15, Lg = 300, Hg = 250, m = P.moments("As", E), sl = m.dRp * lr;
  const W = 680, H = 300, y0 = -500, y1 = 500, x1 = 300, nx = 100, nz = 40, dy = (y1 - y0) / nx, dz = x1 / nz;
  const map = useMemo(() => {
    const th = tilt * Math.PI / 180, c = Math.cos(th), s = Math.sin(th), sh = Hg * Math.tan(th);
    // 入射点：栅外的表面，扣除栅的阴影（束从左上方来时阴影在栅右侧）
    const open = yy => !(yy > -Lg / 2 && yy < Lg / 2) && !(yy >= Lg / 2 && yy < Lg / 2 + sh);
    const ys = []; for (let yy = y0 - 400; yy <= y1 + 400; yy += 2) if (open(yy)) ys.push(yy);
    const k = Q * 2e-7 / (2 * Math.PI * m.dRp * sl * 1e-14);   // 每个入射点的权重（dy0 = 2 nm；Q 按晶圆面积计）→ cm^-3
    const out = [];
    for (let j = 0; j < nz; j++) { const x = (j + 0.5) * dz; const row = [];
      for (let i = 0; i < nx; i++) { const y = y0 + (i + 0.5) * dy; let v = 0;
        for (const yy of ys) { const ry = y - yy, a = x * c + ry * s - m.Rp, b = ry * c - x * s; if (Math.abs(b) > 5 * sl || Math.abs(a) > 6 * m.dRp) continue; v += Math.exp(-a * a / (2 * m.dRp * m.dRp) - b * b / (2 * sl * sl)); }
        row.push(v * k); }
      out.push(row); }
    return out;
  }, [tilt, E, lr]);
  const X = y => (y - y0) / (y1 - y0) * W, Z = x => 70 + x / x1 * (H - 90);
  const col = v => { if (!(v > 1e16)) return "#e6e6e6"; const t = Math.min(1, (Math.log10(v) - 16) / 5); return `hsl(${10 + 40 * (1 - t)}, ${55 + 30 * t}%, ${88 - 50 * t}%)`; };
  const cut = map[Math.min(nz - 1, Math.round(m.Rp / dz))];
  const th = tilt * Math.PI / 180;
  return <Panel>
    <Slider label={R`\text{倾角}\ \theta`} value={tilt} set={setTilt} min={0} max={45} step={1} fmt={v => v.toFixed(0) + "^\\circ"} />
    <Slider label={R`E_{\rm As}\ [\mathrm{keV}]`} value={E} set={setE} min={20} max={200} step={5} fmt={v => v.toFixed(0)} />
    <Slider label={R`\Delta R_{\rm lat}/\Delta R_P`} value={lr} set={setLr} min={0.4} max={1.2} step={0.05} fmt={v => v.toFixed(2)} />
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }} role="img" aria-label="栅边缘下方的二维 As 分布">
      {map.map((row, j) => row.map((v, i) => <rect key={j + "-" + i} x={X(y0 + i * dy)} y={Z(j * dz)} width={W / nx + 0.5} height={(H - 90) / nz + 0.5} fill={col(v)} />))}
      <rect x={X(-Lg / 2)} y={Z(0) - 55} width={X(Lg / 2) - X(-Lg / 2)} height={55} fill="#a0522d" opacity=".85" />
      <text x={X(0)} y={Z(0) - 24} textAnchor="middle" fill="#fff" fontSize="13">多晶硅栅</text>
      {[-420, -300, -200, 200, 300, 420].map(y => <line key={y} x1={X(y) - 45 * Math.sin(th)} y1={6} x2={X(y)} y2={6 + 45 * Math.cos(th)} stroke="#c0392b" strokeWidth="2" markerEnd="url(#ar8b)" />)}
      <defs><marker id="ar8b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#c0392b" /></marker></defs>
      <line x1="0" x2={W} y1={Z(m.Rp)} y2={Z(m.Rp)} stroke="#1f1b16" strokeDasharray="6 4" />
      <text x="6" y={Z(m.Rp) - 4} fontSize="11">x = Rp 截线</text>
      <text x="6" y={H - 4} fontSize="11" fill="#555">横向 −500 … +500 nm；深度 0 … 300 nm（颜色：对数浓度 10¹⁶ 灰 → 10²¹ 深红）</text>
    </svg>
    <Plot key={"cut" + tilt + E + lr} x={{ label: R`y\ [\mathrm{nm}]`, domain: [y0, y1] }} y={{ label: R`C(R_P,y)\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e16, 1e21] }}
      series={() => [{ label: R`\text{沿}\ x=R_P\ \text{的横向截线}`, f: y => { const i = Math.floor((y - y0) / dy); return cut[Math.max(0, Math.min(nx - 1, i))]; }, color: ION_COLOR.As, width: 2.5 }]}
      vlines={() => [{ x: -Lg / 2, label: R`\text{栅左缘}` }, { x: Lg / 2, label: R`\text{栅右缘}` }]} samples={300} height={260} />
    <Read>{`$5\\times10^{15}\\,\\mathrm{cm^{-2}}$ As，$R_P=${f1(m.Rp)}$、$\\Delta R_P=${f1(m.dRp)}$、$\\Delta R_{\\rm lat}=${f1(sl)}\\,\\mathrm{nm}$；栅长 300 nm、栅高 250 nm。倾角 $\\theta$ 时栅在右侧投下宽 $250\\tan\\theta=${(250 * Math.tan(th)).toFixed(0)}\\,\\mathrm{nm}$ 的阴影，右侧 $\\mathrm n^+$ 区与栅分离（对照图 8.17）。这是非晶衬底的高斯模型，不含图 8.16/8.17 中 Athena 计入的沟道效应，所以结深较浅。`}</Read>
  </Panel>;
}
