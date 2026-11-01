// 第 8 章（下）交互模型：全部在浏览器内实时计算（数值函数见 _ch08b_phys.jsx）。
import { useState } from "react";
import { Plot, Table, TxI, num } from "@kit";
import * as P from "./_ch08b_phys.jsx";
import { Range, Btns, Frame } from "./_ch08b_figs.jsx";

const R = String.raw;
const s = (v, d = 2) => P.sci(v, d);
const ION_OPTS = [["B", "B"], ["P", "P"], ["As", "As"], ["Sb", "Sb"]];
const fmtDose = v => { const e = Math.floor(Math.log10(v)); return `$${(v / 10 ** e).toFixed(1)}\\times10^{${e}}\\,\\mathrm{cm^{-2}}$`; };
const Out = ({ children }) => <div style={{ fontSize: 14.5, margin: "6px 2px", lineHeight: 1.7 }}><TxI>{children}</TxI></div>;
const gridP = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(520px, 1fr))", columnGap: 18 };
const grid2 = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", columnGap: 18 };

// ---------- 1. 损伤累积与非晶化阈值（式 8.32、8.34） ----------
export function DamagePlot() {
  const [ion, setIon] = useState("As"), [E, setE] = useState(100), [dose, setDose] = useState(5e13);
  const A = P.amorph(ion, E, dose), xmax = A.xs[A.xs.length - 1];
  const book = P.E_CR / (P.N_SI * P.SnZBL(ion, E));                 // 原书例题的做法：Φ = E_cr / N S_n(E)
  const segTxt = A.segs.length ? A.segs.map(([a, b]) => `${a.toFixed(0)}–${b.toFixed(0)} nm`).join("，") : "无";
  const vl = A.segs.flatMap(([a, b], i) => [{ x: a, label: i ? "" : R`\text{非晶}` }, { x: b, label: "" }]);
  return <Frame>
    <Btns opts={ION_OPTS} value={ion} set={setIon} />
    <div style={grid2}>
      <Range label="注入能量" value={E} set={setE} min={10} max={200} step={5} fmt={v => `${v} keV`} />
      <Range label={R`剂量 $\Phi$`} value={dose} set={setDose} min={1e12} max={3e16} log fmt={fmtDose} />
    </div>
    <Plot x={{ label: R`\text{深度}\ x\ [\mathrm{nm}]`, domain: [0, xmax] }} y={{ label: R`\Phi\,\nu(x)\ [\mathrm{eV\,cm^{-3}}]`, log: true, domain: [1e20, 1e26] }}
      series={() => [
        { label: R`\text{沉积的核碰撞能量密度}`, f: x => dose * num.interp(A.xs, A.nu, x), color: "#c0392b" },
        { label: R`E_{\rm cr}=5\times10^{23}\,\mathrm{eV/cm^3}`, f: () => P.E_CR, dash: "dash", color: "#555" },
        { label: R`\text{注入杂质分布（高斯，峰值归一到损伤峰）}`, f: x => dose * Math.max(...A.nu) * Math.exp(-((x - A.rp) ** 2) / (2 * A.dr ** 2)), dash: "dot", color: "#7d3c98" },
      ]}
      vlines={() => [{ x: A.rp, label: R`R_{\rm P}` }, ...vl]} samples={240} height={340} />
    <Out>{R`每个离子交给核碰撞的能量 $E_{\rm n}\approx${(A.En / 1e3).toFixed(1)}$ keV（占入射能量的 ${(100 * A.En / (E * 1e3)).toFixed(0)}%），Kinchin–Pease 位移数 $n=E_{\rm n}/2E_{\rm d}\approx${Math.round(A.nKP)}$。
非晶区间：**${segTxt}**。剖面模型的临界剂量 $\Phi_{\rm c}\approx${s(A.phiC)}\,\mathrm{cm^{-2}}$；按原书例题的写法 $\Phi=E_{\rm cr}/NS_{\rm n}(E)$（$NS_{\rm n}=${(P.N_SI * P.SnZBL(ion, E) / 1e7).toFixed(0)}\,\mathrm{keV/\mu m}$）得 $${s(book)}\,\mathrm{cm^{-2}}$。`}</Out>
  </Frame>;
}

// ---------- 2. SPE 再生长速率（式 8.35） ----------
export function SPEPlot() {
  const [T, setT] = useState(525), [th, setTh] = useState(100), [boost, setBoost] = useState("1");
  const b = +boost, O = [["100", "#1f1b16"], ["110", "#2c6e49"], ["111", "#c0392b"]];
  return <Frame>
    <div style={grid2}>
      <Range label="退火温度" value={T} set={setT} min={450} max={700} step={5} fmt={v => `${v} °C`} />
      <Range label="非晶层厚度" value={th} set={setTh} min={10} max={400} step={5} fmt={v => `${v} nm`} />
    </div>
    <Btns opts={[["1", "未掺杂"], ["10", "重掺杂（速率提高 10 倍）"]]} value={boost} set={setBoost} />
    <Plot x={{ label: R`T\ [^\circ\mathrm C]`, domain: [450, 700] }} y={{ label: R`v\ [\mathrm{nm/min}]`, log: true, domain: [1e-3, 2e3] }}
      series={() => O.map(([o, c]) => ({ label: R`\langle${o}\rangle`, f: x => P.speRate(o, x, b), color: c }))}
      vlines={() => [{ x: T, label: `${T}\\,^\\circ\\mathrm C` }]} samples={120} height={300} />
    <Table head={["晶向", R`$v$ (nm/min)`, `再生长 ${th} nm 所需时间`]} rows={O.map(([o]) => { const v = P.speRate(o, T, b); return [R`$\langle${o}\rangle$`, `$${s(v)}$`, `$${P.fmtTime(th / v * 60)}$`]; })} />
    <Out>{R`由 600 °C 的实测速率与激活能 2.3 eV 反推式 (8.35) 的指前因子：$\langle100\rangle$ 晶向 $A\approx${s(P.speA("100"))}\,\mathrm{nm/min}$。`}</Out>
  </Frame>;
}

// ---------- 3. 图 8.38 交互版：稳态过饱和度 ----------
export function SupersatPlot() {
  return <Plot x={{ label: R`T\ [^\circ\mathrm C]`, domain: [600, 1400] }} y={{ label: R`C_{\rm I}^{\max}/C_{\rm I}^*`, log: true, domain: [10, 1e6] }}
    params={[{ id: "Eb", label: R`E_{\rm b}\,[\mathrm{eV}]`, min: 1.4, max: 2.2, step: 0.01, value: 1.77 }]}
    series={p => [
      { label: R`\text{式 (8.43)}：${s(1 / (4 * Math.PI * P.A_JUMP ** 3 * P.CI0), 2)}\,e^{${(P.EF - p.Eb).toFixed(2)}\,\mathrm{eV}/kT}`, f: T => P.supersat(T, p.Eb) },
      { label: R`\text{实测（原书正文）}`, data: [[750, 1e4], [1000, 800]], points: true, color: "#c0392b" },
    ]}
    vlines={p => [{ x: 800, label: R`800^\circ\mathrm C:\ ${Math.round(P.supersat(800, p.Eb))}` }, { x: 1200, label: R`1200^\circ\mathrm C:\ ${Math.round(P.supersat(1200, p.Eb))}` }]}
    samples={160} height={330} />;
}

// ---------- 4. 图 8.37 交互版：{311} 中的间隙原子随时间溶解 ----------
export function ClusterPlot() {
  const Ts = [[670, "#1f1b16"], [705, "#2c4a6e"], [738, "#2c6e49"], [815, "#c0392b"]];
  return <Plot x={{ label: R`t\ [\mathrm s]`, log: true, domain: [1, 1e6] }} y={{ label: R`\{311\}\ \text{中的间隙原子}\ [\mathrm{cm^{-2}}]`, log: true, domain: [1e11, 3e14] }}
    params={[
      { id: "lq", label: R`\log_{10}(Q/\mathrm{cm^{-2}})`, min: 13, max: 14.3, step: 0.01, value: Math.log10(5e13) },
      { id: "L", label: R`L\,[\mathrm{nm}]`, min: 20, max: 300, step: 1, value: 60 },
      { id: "Eb", label: R`E_{\rm b}\,[\mathrm{eV}]`, min: 1.5, max: 2.1, step: 0.01, value: 1.77 },
    ]}
    series={q => Ts.map(([T, c]) => {
      const p = { ...q, Q: 10 ** q.lq }, F = P.fluxI(T, p.L * 1e-7, p.Eb), tau = p.Q / F;
      return { label: R`${T}^\circ\mathrm C:\ \tau_{\rm enh}=${P.fmtTime(tau)}`, f: t => p.Q - F * t, color: c };
    })}
    samples={300} height={330} />;
}

// ---------- 5. TED 计算器（式 8.43、8.47、8.48；图 8.40、8.41、8.43） ----------
export function TEDCalc() {
  const [ion, setIon] = useState("P"), [E, setE] = useState(100), [Q, setQ] = useState(5e13), [T, setT] = useState(800), [ta, setTa] = useState(3600);
  const src = P.plusOne(ion, E, Q), S = P.supersat(T), tau = P.tauEnh(T, src.L, src.Qeff);
  const D = P.Dint(ion, T), De = P.Deff(ion, T, S);
  const tTED = Math.min(ta, tau), DtTED = De * tTED + D * Math.max(0, ta - tau), Dt0 = D * ta;
  const prof0 = P.gaussProfile(Q, src.rp, src.dr, 0), prof1 = P.gaussProfile(Q, src.rp, src.dr, DtTED), prof2 = P.gaussProfile(Q, src.rp, src.dr, Dt0);
  const ref = Tc => P.tauEnh(Tc, 127e-7, 5e13);
  return <Frame>
    <Btns opts={ION_OPTS} value={ion} set={setIon} />
    <div style={grid2}>
      <Range label="注入能量" value={E} set={setE} min={10} max={200} step={5} fmt={v => `${v} keV`} />
      <Range label={R`剂量 $Q$`} value={Q} set={setQ} min={1e12} max={1e16} log fmt={fmtDose} />
      <Range label="退火温度" value={T} set={setT} min={600} max={1300} step={5} fmt={v => `${v} °C`} />
      <Range label="退火时间" value={ta} set={setTa} min={1e-3} max={1e5} log fmt={v => v < 1 ? `${(v * 1e3).toPrecision(3)} ms` : v < 120 ? `${v.toPrecision(3)} s` : `${(v / 60).toPrecision(3)} min`} />
    </div>
    <Out>{R`$R_{\rm P}=${src.rp.toFixed(1)}$ nm，$\Delta R_{\rm P}=${src.dr.toFixed(1)}$ nm（表 8.1）；非晶化临界剂量约 $${s(src.phiC)}\,\mathrm{cm^{-2}}$。` + (src.xac
      ? R` **已非晶化**：a/c 界面在 $x_{\rm ac}\approx${src.xac.toFixed(0)}$ nm，只有界面以下的尾部提供 +1 间隙原子，$Q_{\rm eff}\approx${s(src.Qeff)}\,\mathrm{cm^{-2}}$（占 ${(100 * src.Qeff / Q).toFixed(1)}%），扩散距离 $L=x_{\rm ac}$。`
      : R` 未非晶化：$Q_{\rm eff}=Q$，$L=R_{\rm P}$。`)}</Out>
    <Table head={["量", "数值", "来源"]} rows={[
      [R`过饱和度 $C_{\rm I}^{\max}/C_{\rm I}^*$`, `$${s(S)}$`, R`式 (8.43)`],
      [R`TED 持续时间 $\tau_{\rm enh}$`, `$${P.fmtTime(tau)}$`, R`式 (8.47)`],
      [R`正常扩散系数 $D_{\rm A}$`, R`$${s(D)}\,\mathrm{cm^2/s}$`, "表 7.3（本征）"],
      [R`TED 期间 $D_{\rm A}^{\rm eff}$（增强 $${s(De / D)}$ 倍）`, R`$${s(De)}\,\mathrm{cm^2/s}$`, R`$f_{\rm I}S+f_{\rm V}/S$，表 7.4`],
      [R`TED 的扩散长度 $\sqrt{D_{\rm A}^{\rm eff}\tau_{\rm enh}}$`, R`$${(Math.sqrt(De * tau) * 1e7).toFixed(1)}$ nm`, R`式 (8.48)`],
      [R`本次退火 $\sqrt{Dt}$：含 TED / 无 TED`, R`$${(Math.sqrt(DtTED) * 1e7).toFixed(1)}$ nm / $${(Math.sqrt(Dt0) * 1e7).toFixed(2)}$ nm`, ta < tau ? "退火结束时 {311} 尚未溶解完" : "{311} 已溶解完"],
    ]} />
    <div style={gridP}>
      <Plot x={{ label: R`T\ [^\circ\mathrm C]`, domain: [500, 1400] }} y={{ label: R`\tau_{\rm enh}\ [\mathrm s]`, log: true, domain: [1e-4, 1e8] }}
        series={() => [
          { label: R`\text{当前注入}`, f: Tc => P.tauEnh(Tc, src.L, src.Qeff), color: "#c0392b" },
          { label: R`\text{原书例题：P, 100 keV},\ 5\times10^{13}`, f: ref, dash: "dash", color: "#555" },
        ]} vlines={() => [{ x: T, label: R`${T}^\circ\mathrm C` }]} samples={150} height={300} />
      <Plot x={{ label: R`x\ [\mathrm{nm}]`, domain: [0, Math.max(150, src.rp + 6 * src.dr + 3 * Math.sqrt(DtTED) * 1e7)] }} y={{ label: R`C\ [\mathrm{cm^{-3}}]`, log: true, domain: [1e15, Math.max(1e18, 3 * prof0(src.rp))] }}
        series={() => [
          { label: R`\text{注入后}`, f: prof0, color: "#7d3c98", dash: "dot" },
          { label: R`\text{退火后（无 TED）}`, f: prof2, color: "#555", dash: "dash" },
          { label: R`\text{退火后（含 TED）}`, f: prof1, color: "#c0392b" },
        ]} vlines={() => src.xac ? [{ x: src.xac, label: R`x_{\rm ac}` }] : []} samples={200} height={300} />
    </div>
    <p style={{ fontSize: 13 }}><TxI>{R`分布按高斯近似，$\sigma^2=\Delta R_{\rm P}^2+2Dt$，表面按反射边界处理；TED 段用 $D_{\rm A}^{\rm eff}$、之后用 $D_{\rm A}$。原书图 8.41/8.43 是数值模拟（Pearson 分布、空间变化的 $C_{\rm I}$），这里只是解析估计，应对照量级与趋势。`}</TxI></p>
  </Frame>;
}

// ---------- 6. 退火热预算对比 ----------
const RK = Object.keys(P.RECIPES), RCOL = { furnace: "#1f1b16", rta: "#2c4a6e", spike: "#2c6e49", flash: "#c0392b", laser: "#b8862b" };
export function ThermalBudget() {
  const [sel, setSel] = useState("flash");
  const [pars, setPars] = useState(() => Object.fromEntries(RK.map(k => [k, { Tp: P.RECIPES[k].Tp, hold: P.RECIPES[k].hold }])));
  const [ion, setIon] = useState("P"), [Q, setQ] = useState(5e13), [E, setE] = useState(100);
  const src = P.plusOne(ion, E, Q);
  const res = Object.fromEntries(RK.map(k => { const c = P.recipeCurve(k, pars[k].Tp, pars[k].hold); return [k, { c, r: P.anneal(c, ion, src.L, src.Qeff) }]; }));
  const cur = res[sel], spec = P.RECIPES[sel], set = (f, v) => setPars(o => ({ ...o, [sel]: { ...o[sel], [f]: v } }));
  // 选中曲线的显示窗口：闪光/激光放大到脉冲附近
  let pts = cur.c, unit = 1, ul = "s";
  if (sel === "flash" || sel === "laser") { const ip = pts.reduce((b, p, i) => p[1] > pts[b][1] ? i : b, 0), tp = pts[ip][0], w = pars[sel].hold * 1e-3; pts = pts.filter(([t]) => t > tp - 4 * w && t < tp + 10 * w).map(([t, T]) => [t - tp, T]); unit = 1e3; ul = "ms"; }
  else if (sel === "furnace") { unit = 1 / 60; ul = "min"; }
  const data = pts.map(([t, T]) => [t * unit, T]), xd = [Math.min(...data.map(d => d[0])), Math.max(...data.map(d => d[0]))];
  const iso = nm => Tc => (nm * 1e-7) ** 2 / P.Dint(ion, Tc);
  return <Frame>
    <Btns opts={RK.map(k => [k, P.RECIPES[k].name])} value={sel} set={setSel} />
    <div style={grid2}>
      <Range label={`${spec.name}：峰值温度`} value={pars[sel].Tp} set={v => set("Tp", v)} min={spec.TpRange[0]} max={spec.TpRange[1]} step={5} fmt={v => `${v} °C`} />
      <Range label={`${spec.name}：${spec.holdLabel}`} value={pars[sel].hold} set={v => set("hold", v)} min={spec.holdRange[0]} max={spec.holdRange[1]} log fmt={v => v.toPrecision(3)} />
    </div>
    <Btns opts={[["B", "B"], ["P", "P"], ["As", "As"]]} value={ion} set={setIon} />
    <div style={grid2}>
      <Range label="注入能量" value={E} set={setE} min={5} max={200} step={5} fmt={v => `${v} keV`} />
      <Range label="剂量" value={Q} set={setQ} min={1e12} max={1e16} log fmt={fmtDose} />
    </div>
    <div style={gridP}>
      <Plot x={{ label: R`t\ [\mathrm{${ul}}]`, domain: xd }} y={{ label: R`T\ [^\circ\mathrm C]`, domain: [300, 1450] }}
        series={() => [{ label: R`\text{${spec.name}}`, data, color: RCOL[sel] }]} samples={10} height={290} />
      <Plot x={{ label: R`\text{峰值温度}\ T_{\rm p}\ [^\circ\mathrm C]`, domain: [700, 1420] }} y={{ label: R`\text{时间}\ [\mathrm s]`, log: true, domain: [1e-5, 1e6] }}
        series={() => [
          { label: R`\tau_{\rm enh}(T)`, f: Tc => P.tauEnh(Tc, src.L, src.Qeff), color: "#7d3c98" },
          { label: R`\sqrt{Dt}=5\,\mathrm{nm}`, f: iso(5), color: "#999", dash: "dot" },
          ...RK.map(k => ({ label: R`\text{${P.RECIPES[k].name}}`, data: [[res[k].r.Tp, res[k].r.teff]], points: true, color: RCOL[k] })),
        ]} samples={120} height={290} />
    </div>
    <Table head={["方案", R`$T_{\rm p}$`, R`等效时间 $t_{\rm eff}$`, R`$\sqrt{Dt}$ 无 TED`, R`$\sqrt{Dt}$ 含 TED`, "{311} 剩余"]}
      rows={RK.map(k => { const r = res[k].r; return [P.RECIPES[k].name, `${r.Tp.toFixed(0)} °C`, `$${P.fmtTime(r.teff)}$`, `${(Math.sqrt(r.Dn) * 1e7).toFixed(2)} nm`, `${(Math.sqrt(r.Dted) * 1e7).toFixed(1)} nm`, `${(100 * r.left).toFixed(0)}%`]; })} />
    <p style={{ fontSize: 13 }}><TxI>{R`右图：每种退火折算成"在峰值温度下保温 $t_{\rm eff}$"（激活能取 3.5 eV 的 Arrhenius 等效时间）。点落在紫线 $\tau_{\rm enh}(T)$ 下方，说明退火结束前 {311} 尚未溶解完（剩余的间隙原子会在后续热过程中继续造成 TED）。灰点线是正常扩散 $\sqrt{Dt}=5$ nm 的等值线。积分沿整条温度曲线进行：每一时刻按式 (8.43) 取过饱和度、按 $d_{\rm I}C_{\rm I}^{\max}/L$ 消耗 +1 剂量。温度曲线形状为示意（炉退火 10 °C/min 升温、RTA 100 °C/s、尖峰退火、闪光退火 800 °C 预热 + 毫秒脉冲；激光退火为原书未讨论的拓展）。`}</TxI></p>
  </Frame>;
}

// ---------- 7. 图 8.40 交互版：TED 持续时间随温度 ----------
export function TauPlot() {
  return <Plot x={{ label: R`T\ [^\circ\mathrm C]`, domain: [500, 1400] }} y={{ label: R`\tau_{\rm enh}\ [\mathrm s]`, log: true, domain: [1e-4, 1e8] }}
    params={[
      { id: "lq", label: R`\log_{10}(Q/\mathrm{cm^{-2}})`, min: 12, max: 15, step: 0.05, value: Math.log10(5e13) },
      { id: "L", label: R`R_{\rm P}\,[\mathrm{nm}]`, min: 10, max: 500, step: 1, value: 127 },
    ]}
    series={q => { const p = { ...q, Q: 10 ** q.lq }; return [
      { label: R`\tau_{\rm enh}=${s(4 * Math.PI * P.A_JUMP ** 3 * p.L * 1e-7 * p.Q / P.DI0)}\,e^{3.57\,\mathrm{eV}/kT}\ \mathrm s`, f: T => P.tauEnh(T, p.L * 1e-7, p.Q), color: "#c0392b" },
    ]; }}
    vlines={q => { const p = { ...q, Q: 10 ** q.lq }; return [{ x: 800, label: R`800^\circ\mathrm C:\ ${P.fmtTime(P.tauEnh(800, p.L * 1e-7, p.Q))}` }, { x: 1200, label: R`1200^\circ\mathrm C:\ ${P.fmtTime(P.tauEnh(1200, p.L * 1e-7, p.Q))}` }]; }}
    samples={160} height={330} />;
}
