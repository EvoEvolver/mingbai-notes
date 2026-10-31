// 第 1 章交互图。数值函数见 _ch01_phys.jsx（已用 node 核对：基准宇宙学 t0 = 13.784 Gyr 与附录 B.3 一致；
// a_eq = 2.92e-4、z_eq = 3429、t_eq = 5.0e4 yr；a_Λ = 0.767；z = 1100 时 t = 3.67e5 yr、T = 3001 K；
// k_BT = 1 MeV 时 t = 0.75 s；黑体峰值 1/λ = 5.35 cm⁻¹、ν = 160.4 GHz、I = 385 MJy/sr（T = 2.728 K，与附录 A 一致）；
// 习题 1.2：H0 t0 = 0.964（Ω_Λ = 0.7）。
import { useMemo, useState } from "react";
import { Plot, M, TxI, renderTex, pageUrl, hasChapter } from "@kit";
import * as P from "./_ch01_phys.jsx";

const R = String.raw;
const f2 = (v, d = 2) => (+v).toFixed(d);
const sci = (v, d = 2) => {
  if (!Number.isFinite(v)) return R`\text{—}`;
  if (Math.abs(v) >= 0.01 && Math.abs(v) < 1e4) return String(+(+v).toPrecision(d + 1));
  const e = Math.floor(Math.log10(Math.abs(v))); let m = v / 10 ** e;
  if (+m.toFixed(d) >= 10) return R`${(m / 10).toFixed(d)}\times10^{${e + 1}}`;
  return R`${m.toFixed(d)}\times10^{${e}}`;
};
const ST = ({ x, y, w, tex, color, center, right, size = 12 }) => <foreignObject x={x} y={y} width={w} height={22} style={{ overflow: "visible" }}>
  <div style={{ fontSize: size, lineHeight: "20px", color: color || "var(--ink)", textAlign: center ? "center" : right ? "right" : "left", whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} /></foreignObject>;

// ---------- 1. 图 1.2 交互版：a(t) ----------
export function ScaleFactorPlot() {
  return <Plot
    x={{ label: R`t\ [\mathrm{yr}]`, log: true, domain: [1, 1e11] }}
    y={{ label: R`\text{标度因子}\ a`, log: true, domain: [1e-6, 10] }}
    params={[
      { id: "Om", label: R`\Omega_{\rm m}`, min: 0.1, max: 1, step: 0.005, value: 0.3106 },
      { id: "h", label: R`h`, min: 0.5, max: 0.9, step: 0.001, value: 0.677 },
    ]}
    series={p => {
      const q = { h: p.h, Om: p.Om }, tab = P.ageTable(q, { amin: 1e-8, amax: 10, n: 900, simple: true });
      const tOf = a => 10 ** P.interp(tab.la, tab.lt, Math.log10(a));
      const Or = P.OMR_H2 / (p.h * p.h), aeq = Or / p.Om, OL = 1 - p.Om - Or;
      const teq = tOf(aeq), t0 = tOf(1);
      const pts = tab.la.map((la, i) => [10 ** tab.lt[i], 10 ** la]);
      const out = [
        { label: R`a(t)\ \text{数值解}`, data: pts, color: "#1f1b16", width: 2.4 },
        { label: R`\propto t^{1/2}`, f: t => aeq * Math.sqrt(t / teq), dash: "dash", color: "#c0392b", width: 1.4 },
        { label: R`\propto t^{2/3}`, f: t => aeq * Math.pow(t / teq, 2 / 3), dash: "dashdot", color: "#2c4a6e", width: 1.4 },
      ];
      if (OL > 0.01) {
        const H0yr = 100 * p.h / P.HUBBLE_GYR / 1e9;
        out.push({ label: R`\propto e^{H_0\sqrt{\Omega_\Lambda}\,t}`, f: t => (t > 0.3 * t0 ? Math.exp(H0yr * Math.sqrt(OL) * (t - t0)) : NaN), dash: "dot", color: "#2c6e49", width: 1.6 });
      }
      out.push({ label: R`t_0=${f2(t0 / 1e9)}\,\mathrm{Gyr},\ a_{\rm eq}=${sci(aeq)},\ t_{\rm eq}=${sci(teq, 1)}\,\mathrm{yr},\ T_{\rm eq}=${Math.round(P.T0_K / aeq)}\,\mathrm K`, f: () => NaN });
      return out;
    }}
    vlines={p => {
      const q = { h: p.h, Om: p.Om }, tab = P.ageTable(q, { amin: 1e-8, amax: 10, n: 900, simple: true });
      const tOf = a => 10 ** P.interp(tab.la, tab.lt, Math.log10(a));
      const Or = P.OMR_H2 / (p.h * p.h), aeq = Or / p.Om, OL = 1 - p.Om - Or;
      const v = [{ x: tOf(aeq), label: R`\text{物质–辐射相等}` }];
      if (OL > 0.01) v.push({ x: tOf(Math.cbrt(p.Om / OL)), label: R`\Lambda\text{–物质相等}` });
      return v;
    }}
    samples={200} height={400} />;
}

// ---------- 2. 图 1.3 交互版：各成分 ρ_s(a)/ρ_cr ----------
export function DensityPlot() {
  return <Plot
    x={{ label: R`\text{标度因子}\ a`, log: true, domain: [1e-6, 10] }}
    y={{ label: R`\rho_s(a)/\rho_{\rm cr}`, log: true, domain: [1e-4, 1e16] }}
    params={[
      { id: "Om", label: R`\Omega_{\rm m}`, min: 0.05, max: 0.95, step: 0.005, value: 0.3106 },
      { id: "h", label: R`h`, min: 0.5, max: 0.9, step: 0.001, value: 0.677 },
      { id: "w", label: R`w_{\rm DE}`, min: -1.5, max: -0.4, step: 0.01, value: -1 },
    ]}
    series={p => {
      const Or = P.OMR_H2 / (p.h * p.h), ODE = 1 - p.Om - Or;
      return [
        { label: R`\text{物质}\ \propto a^{-3}`, f: a => p.Om / a ** 3, color: "#1f1b16" },
        { label: R`\text{辐射}\ \propto a^{-4}`, f: a => Or / a ** 4, color: "#c0392b", dash: "dash" },
        { label: R`\text{暗能量}\ \propto a^{-3(1+w)}\ (\Omega_{\rm DE}=${f2(ODE, 3)})`, f: a => ODE * Math.pow(a, -3 * (1 + p.w)), color: "#2c6e49", dash: "dashdot" },
        { label: R`\text{总和}`, f: a => p.Om / a ** 3 + Or / a ** 4 + ODE * Math.pow(a, -3 * (1 + p.w)), color: "#999", dash: "dot", width: 1.4 },
      ];
    }}
    vlines={p => {
      const Or = P.OMR_H2 / (p.h * p.h), ODE = 1 - p.Om - Or, aeq = Or / p.Om, aL = Math.pow(p.Om / ODE, -1 / (3 * p.w));
      return [{ x: aeq, label: R`a_{\rm eq}=${sci(aeq)}\ (z_{\rm eq}=${Math.round(1 / aeq - 1)})` }, { x: aL, label: R`a_\Lambda=${f2(aL, 3)}` }];
    }}
    samples={200} />;
}

// ---------- 3. 图 1.5 交互版：哈勃图 v = H0 d ----------
export function HubblePlot() {
  return <Plot
    x={{ label: R`\sym{ch01-dist}{d}\ [\mathrm{Mpc}]`, domain: [0, 30] }}
    y={{ label: R`v\ [\mathrm{km\,s^{-1}}]`, domain: [-500, 2000] }}
    params={[{ id: "H0", label: R`H_0\ [\mathrm{km\,s^{-1}\,Mpc^{-1}}]`, min: 40, max: 100, step: 0.5, value: 72 }]}
    series={p => [
      { label: R`v=H_0\sym{ch01-dist}{d}`, f: d => p.H0 * d, color: "#c0392b", width: 2.6 },
      { label: R`H_0=83`, f: d => 83 * d, dash: "dash", color: "#777", width: 1.2 },
      { label: R`75`, f: d => 75 * d, color: "#777", width: 1.2 },
      { label: R`67`, f: d => 67 * d, dash: "dash", color: "#777", width: 1.2 },
      { label: R`h=${f2(p.H0 / 100, 3)},\ H_0^{-1}=${f2(P.HUBBLE_GYR / p.H0, 2)}\,\mathrm{Gyr},\ \tfrac23H_0^{-1}=${f2(2 / 3 * P.HUBBLE_GYR / p.H0, 2)}\,\mathrm{Gyr},\ c/H_0=${Math.round(299792.458 / p.H0)}\,\mathrm{Mpc}`, f: () => NaN },
      { label: R`\text{30 Mpc 处 }v/c=${(p.H0 * 30 / 299792.458).toFixed(4)}`, f: () => NaN },
    ]}
    samples={60} height={360} />;
}

// ---------- 4. 图 1.7 交互版：黑体谱 ----------
export function BlackbodyPlot() {
  return <Plot
    x={{ label: R`1/\lambda\ [\mathrm{cm^{-1}}]`, domain: [0.3, 22] }}
    y={{ label: R`I_\nu\ [\mathrm{MJy\,sr^{-1}}]`, domain: [0, 450] }}
    params={[{ id: "T", label: R`T\ [\mathrm K]`, min: 2.0, max: 3.2, step: 0.001, value: 2.728 }]}
    series={p => {
      const sp = P.sigmaPeak(p.T), Ip = P.Inu(sp, p.T);
      const RJ = s => { const nu = s * 100 * 2.99792458e8; return 2 * nu * nu * 1.380649e-23 * p.T / (2.99792458e8) ** 2 * 1e20; };
      return [
        { label: R`\text{黑体（式 1.9）}\ T=${p.T.toFixed(3)}\,\mathrm K`, f: s => P.Inu(s, p.T), color: "#c0392b", width: 2.4 },
        { label: R`T_0=2.728\,\mathrm K\ \text{(FIRAS 拟合)}`, f: s => P.Inu(s, 2.728), color: "#999", dash: "dot", width: 1.4 },
        { label: R`\text{Rayleigh–Jeans}\ (2\pi\hbar\nu\ll k_{\rm B}T)`, f: RJ, color: "#2c4a6e", dash: "dash", width: 1.2 },
        { label: R`\text{峰值：}1/\lambda=${f2(sp)}\,\mathrm{cm^{-1}},\ \nu_{\max}=${f2(P.nuPeakGHz(p.T), 1)}\,\mathrm{GHz},\ I_\nu=${f2(Ip, 1)}\,\mathrm{MJy\,sr^{-1}}`, f: () => NaN },
      ];
    }}
    vlines={p => [{ x: P.sigmaPeak(p.T), label: R`\nu_{\max}` }]}
    samples={240} height={360} />;
}

// ---------- 5. 习题 1.2：宇宙年龄 H0 t0 与 Ω_Λ ----------
export function AgePlot() {
  return <Plot
    x={{ label: R`\Omega_\Lambda`, domain: [0, 0.95] }}
    y={{ label: R`H_0t_0`, domain: [0.6, 1.5] }}
    params={[
      { id: "OL", label: R`\Omega_\Lambda`, min: 0, max: 0.95, step: 0.005, value: 0.7 },
      { id: "h", label: R`h`, min: 0.5, max: 0.9, step: 0.001, value: 0.7 },
    ]}
    series={p => [
      { label: R`H_0t_0=\frac{2}{3\sqrt{\Omega_\Lambda}}\sinh^{-1}\!\sqrt{\Omega_\Lambda/(1-\Omega_\Lambda)}`, f: P.H0t0, color: "#1f1b16", width: 2.4 },
      { label: R`\Omega_\Lambda=0:\ 2/3`, f: () => 2 / 3, color: "#999", dash: "dot" },
      { label: R`\text{最老恒星}\ t>10\,\mathrm{Gyr}`, f: () => 10 * 100 * p.h / P.HUBBLE_GYR, color: "#c0392b", dash: "dash" },
      { label: R`t_0=${f2(P.H0t0(p.OL) * P.HUBBLE_GYR / (100 * p.h))}\,\mathrm{Gyr}\ \ (H_0t_0=${f2(P.H0t0(p.OL), 3)},\ \text{为纯物质的 }${f2(P.H0t0(p.OL) * 1.5, 3)}\text{ 倍})`, f: () => NaN },
    ]}
    vlines={p => [{ x: p.OL, label: R`\Omega_\Lambda=${f2(p.OL)}` }]}
    samples={160} height={340} />;
}

// ---------- 6. 图 1.11 交互版：宇宙时间线（t、a、z、T 互换）----------
const EVENTS = [
  { id: "dm", T: 1e11, name: R`暗物质丰度冻结（若为 WIMP）`, note: R`$k_{\rm B}T\sim100\,\mathrm{GeV}$ 或更高`, link: ["ch04", "sec-4.4", "§4.4"] },
  { id: "nu", T: 1e6, name: R`中微子脱耦`, note: R`$k_{\rm B}T\sim1\,\mathrm{MeV}$：弱散射率跌破 $H$（图 1.4）`, link: ["ch02", "sec-2.4.4", "§2.4.4"] },
  { id: "ee", T: 5.11e5, name: R`正负电子湮灭开始`, note: R`$k_{\rm B}T\lesssim m_ec^2$：熵转给光子，$T_\nu/T\to(4/11)^{1/3}$`, link: ["ch02", "sec-2.4.4", "§2.4.4"] },
  { id: "bbn", T: 7e4, name: R`大爆炸核合成`, note: R`$k_{\rm B}T\approx0.07\,\mathrm{MeV}$：氘不再被打碎，轻元素在“几分钟”内形成`, link: ["ch04", "sec-4.2", "§4.2"] },
  { id: "eq", a: "eq", name: R`物质–辐射相等`, note: R`$a_{\rm eq}=4.15\times10^{-5}/\Omega_{\rm m}h^2$；此后扰动开始显著增长`, link: ["ch02", "sec-2.4.5", "§2.4.5"] },
  { id: "rec", z: 1100, name: R`复合 / CMB 最后散射`, note: R`$z\simeq1100$，$k_{\rm B}T\sim1/4\,\mathrm{eV}$，约 38 万年`, link: ["ch04", "sec-4.3", "§4.3"] },
  { id: "lam", a: "lam", name: R`物质–$\Lambda$ 相等`, note: R`$a_\Lambda=(\Omega_{\rm m}/\Omega_\Lambda)^{1/3}$；之后加速膨胀`, link: ["ch02", "sec-2.4.6", "§2.4.6"] },
  { id: "now", a: 1, name: R`今天`, note: R`$t_0=13.78\,\mathrm{Gyr}$，$T_0=2.726\,\mathrm K$`, link: null },
];
const EVLAB = [R`\text{DM}`, R`\nu`, R`e^\pm`, R`\text{BBN}`, R`a_{\rm eq}`, R`\text{CMB}`, R`\Lambda`, R`\text{今天}`];
const DOMS = { rad: ["辐射主导", "#e9a3a0"], mat: ["物质主导", "#c0392b"], de: ["暗能量主导", "#2c6e49"] };
function fmtTime(ty) {           // ty: 年
  const s = ty * P.SEC_PER_YR;
  if (s < 60) return R`${sci(s)}\,\mathrm s`;
  if (s < 3600 * 48) return R`${sci(s)}\,\mathrm s\ (${f2(s / 60, 1)}\,\mathrm{min})`;
  if (ty < 1e3) return R`${sci(ty)}\,\mathrm{yr}`;
  if (ty < 1e6) return R`${f2(ty / 1e3, 1)}\,\mathrm{kyr}`;
  if (ty < 1e9) return R`${f2(ty / 1e6, 1)}\,\mathrm{Myr}`;
  return R`${f2(ty / 1e9, 2)}\,\mathrm{Gyr}`;
}
function fmtE(eV) {
  const u = [[1e12, "TeV"], [1e9, "GeV"], [1e6, "MeV"], [1e3, "keV"], [1, "eV"], [1e-3, "meV"]];
  for (const [v, n] of u) if (eV >= v) return R`${(eV / v).toPrecision(3)}\,\mathrm{${n}}`;
  return R`${sci(eV * 1e3)}\,\mathrm{meV}`;
}
let TAB = null;
const getTab = () => (TAB ||= P.ageTable(P.FID, { amin: 1e-17, n: 1600 }));

export function HistoryTimeline() {
  const tab = useMemo(getTab, []);
  const Or = P.OMR_H2 / P.FID.h ** 2, aeq = Or / P.FID.Om, aL = Math.cbrt(P.FID.Om / (1 - P.FID.Om - Or));
  const evLa = ev => ev.T ? P.laOfTemp(Math.log10(ev.T)) : ev.z ? -Math.log10(1 + ev.z) : ev.a === "eq" ? Math.log10(aeq) : ev.a === "lam" ? Math.log10(aL) : Math.log10(ev.a);
  const evs = useMemo(() => EVENTS.map(ev => { const la = evLa(ev); return { ...ev, la, lts: Math.log10(P.epoch(la, tab).t * P.SEC_PER_YR) }; }), [tab]);
  const [la, setLa] = useState(() => -Math.log10(1101));
  const [mode, setMode] = useState("t");
  const e = P.epoch(la, tab);
  const lts = Math.log10(e.t * P.SEC_PER_YR);
  const W = 760, H = 250, m = { l: 92, r: 16 }, X0 = -12, X1 = 17.8, iw = W - m.l - m.r;
  const sx = v => m.l + (v - X0) / (X1 - X0) * iw;
  const barY = 92, barH = 56;
  const ltOfLa = l => Math.log10(P.epoch(l, tab).t * P.SEC_PER_YR);
  const tEq = ltOfLa(Math.log10(aeq)), tL = ltOfLa(Math.log10(aL)), tNow = ltOfLa(0);
  const Tticks = [1e9, 1e6, 1e3, 1, 1e-3].map(T => ({ T, x: sx(ltOfLa(P.laOfTemp(Math.log10(T)))) }));
  const tlab = { 1e12: R`1\,\mathrm{TeV}`, 1e9: R`1\,\mathrm{GeV}`, 1e6: R`1\,\mathrm{MeV}`, 1e3: R`1\,\mathrm{keV}`, 1: R`1\,\mathrm{eV}`, 1e-3: R`1\,\mathrm{meV}` };
  // 滑块：随所选变量变化
  const slider = {
    t: { min: -12, max: Math.log10(4.36e17), val: lts, set: v => setLa(P.laOfT(v - Math.log10(P.SEC_PER_YR), tab)), lab: R`\log_{10}(t/\mathrm s)` },
    a: { min: -16.2, max: 0, val: la, set: v => setLa(v), lab: R`\log_{10}a` },
    z: { min: 0, max: 16.2, val: -la, set: v => setLa(-v), lab: R`\log_{10}(1+z)` },
    T: { min: Math.log10(P.T0_K), max: 15.4, val: Math.log10(e.TK), set: v => setLa(P.laOfTemp(v - Math.log10(P.K_PER_EV))), lab: R`\log_{10}(T/\mathrm K)` },
  }[mode];
  const near = evs.reduce((b, ev) => (Math.abs(ev.la - la) < Math.abs(b.la - la) ? ev : b), evs[0]);
  const lk = near.link && hasChapter(near.link[0]) ? <a href={pageUrl(near.link[0], near.link[1])}>{near.link[2]} →</a> : near.link ? <span className="muted">（{near.link[2]}）</span> : null;
  return (
    <div className="plot card">
      <div className="plot-params">
        <span className="seg" style={{ marginBottom: 0 }}>{[["t", "按时间 t"], ["a", "按标度因子 a"], ["z", "按红移 z"], ["T", "按温度 T"]].map(([k, l]) =>
          <button key={k} className={mode === k ? "on" : ""} onClick={() => setMode(k)}>{l}</button>)}</span>
        <label className="plot-param"><span className="plot-plabel"><M>{slider.lab}</M></span>
          <input type="range" min={slider.min} max={slider.max} step={0.01} value={Math.min(slider.max, Math.max(slider.min, slider.val))} onChange={e => slider.set(+e.target.value)} style={{ width: 260 }} /></label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <defs>
          <linearGradient id="ch01rad" x1="0" x2="1"><stop offset="0" stopColor="#fbeaea" /><stop offset="1" stopColor="#e9a3a0" /></linearGradient>
        </defs>
        {/* 暴胀与未知时期 */}
        <rect x={6} y={barY} width={10} height={barH} fill="#2c4a6e" />
        <ST x={0} y={barY - 26} w={80} tex={R`\text{暴胀}`} />
        <rect x={18} y={barY} width={sx(X0) - 18} height={barH} fill="#f7f1ea" />
        <ST x={22} y={barY + 17} w={70} tex={R`\text{?}`} size={16} center />
        <rect x={sx(X0)} y={barY} width={sx(tEq) - sx(X0)} height={barH} fill="url(#ch01rad)" />
        <rect x={sx(tEq)} y={barY} width={sx(tL) - sx(tEq)} height={barH} fill="#c0392b" opacity={0.85} />
        <rect x={sx(tL)} y={barY} width={sx(tNow) - sx(tL)} height={barH} fill="#2c6e49" opacity={0.85} />
        <ST x={sx(tEq) - 110} y={barY + 18} w={100} tex={R`\text{辐射}`} color="#7a1d1d" right />
        <ST x={sx(tEq) + 2} y={barY + 18} w={60} tex={R`\text{物质}`} color="#fff" />
        {/* 顶部温度轴 */}
        <ST x={sx(X0) - 86} y={10} w={80} tex={R`k_{\rm B}T`} right />
        {Tticks.map(({ T, x }) => <g key={T}><line x1={x} x2={x} y1={30} y2={barY} stroke="#bbb" strokeDasharray="2 3" /><ST x={x - 30} y={10} w={60} tex={tlab[T]} center /></g>)}
        {/* 底部时间轴 */}
        {[-9, -6, -3, 0, 3, 6, 9, 12, 15].map(v => <g key={v}><line x1={sx(v)} x2={sx(v)} y1={barY + barH} y2={barY + barH + 5} stroke="#555" /><ST x={sx(v) - 25} y={barY + barH + 6} w={50} tex={R`10^{${v}}`} center /></g>)}
        <ST x={sx(X0) - 86} y={barY + barH + 6} w={80} tex={R`t\ [\mathrm s]`} right />
        {[[Math.log10(60), "1\\,min"], [Math.log10(P.SEC_PER_YR), "1\\,yr"], [Math.log10(P.SEC_PER_YR * 1e6), "1\\,Myr"], [Math.log10(P.SEC_PER_YR * 1e9), "1\\,Gyr"]].map(([v, l]) =>
          <g key={l}><line x1={sx(v)} x2={sx(v)} y1={barY + barH + 26} y2={barY + barH + 32} stroke="#999" /><ST x={sx(v) - 25} y={barY + barH + 32} w={50} tex={R`\mathrm{${l}}`} color="#777" center /></g>)}
        {/* 事件 */}
        {evs.map((ev, i) => <g key={ev.id} style={{ cursor: "pointer" }} onClick={() => setLa(ev.la)}>
          <line x1={sx(ev.lts)} x2={sx(ev.lts)} y1={barY - 4} y2={barY + barH + 4} stroke={near.id === ev.id ? "#111" : "#fff"} strokeWidth={near.id === ev.id ? 2 : 1.2} />
          <circle cx={sx(ev.lts)} cy={barY - 6} r={5} fill={near.id === ev.id ? "#111" : "#fff"} stroke="#111" />
          <ST x={sx(ev.lts) - 40} y={i % 2 ? 50 : 34} w={80} tex={EVLAB[i]} size={11} center color="#333" />
        </g>)}
        {/* 当前位置 */}
        <line x1={sx(lts)} x2={sx(lts)} y1={barY - 10} y2={barY + barH + 10} stroke="#d35400" strokeWidth={3} />
        <path d={`M${sx(lts) - 7},${barY + barH + 18} L${sx(lts) + 7},${barY + barH + 18} L${sx(lts)},${barY + barH + 10} Z`} fill="#d35400" />
      </svg>
      <div className="plot-legend" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "4px 14px" }}>
        <span><M>{R`t=${fmtTime(e.t)}`}</M></span>
        <span><M>{R`a=${sci(e.a, 3)}`}</M></span>
        <span><M>{R`z=${sci(e.z, 3)}`}</M></span>
        <span><M>{R`T=${sci(e.TK, 3)}\,\mathrm K`}</M></span>
        <span><M>{R`k_{\rm B}T=${fmtE(e.kT)}`}</M></span>
        <span><M>{R`H=${sci(e.H, 2)}\,\mathrm{km\,s^{-1}\,Mpc^{-1}}`}</M></span>
        <span><M>{R`g_*=${f2(P.gStar(e.kT * 1e-9))}`}</M></span>
        <span style={{ color: DOMS[e.dom][1], fontWeight: 600, gridColumn: "1 / -1" }}>{DOMS[e.dom][0]}：<M>{R`\text{辐射 }${f2(100 * e.fr, 1)}\%,\ \text{物质 }${f2(100 * e.fm, 1)}\%,\ \Lambda\ ${f2(100 * e.fl, 1)}\%`}</M></span>
      </div>
      <p style={{ margin: "0.5em 0 0" }}><b>最近的里程碑：</b><TxI>{`${near.name}——${near.note}`}</TxI> {lk}</p>
    </div>);
}

// ---------- 7. 图 1.12 交互版：全书路线图 ----------
const CH = {
  ch02: "膨胀的宇宙", ch03: "宇宙学基本方程", ch04: "物种的起源", ch05: "非均匀宇宙：物质与辐射", ch06: "非均匀宇宙：引力", ch07: "初始条件",
  ch08: "结构增长：线性理论", ch09: "宇宙微波背景", ch10: "偏振的 CMB", ch11: "结构探针：示踪体", ch12: "结构增长：超越线性理论", ch13: "结构探针：引力透镜", ch14: "分析与推断",
};
const NODES = [
  { id: "today", x: 120, y: 58, zh: "今天的宇宙", en: "The Universe Today", chs: ["ch02"], txt: R`度规、红移与距离；能量随 $a$ 的演化；宇宙清点（光子、重子、暗物质、中微子、暗能量）与 $a_{\rm eq}$。本章 §1.1–1.2 的严格版。` },
  { id: "past", x: 440, y: 58, zh: "过去", en: "The Past", chs: ["ch04"], txt: R`平衡被打破的三个时刻：大爆炸核合成（§1.3）、复合（§1.4 的 CMB 起源）、暗物质的冻结（§1.6）。工具是第 3 章的 Boltzmann 方程。` },
  { id: "eqs", x: 330, y: 150, zh: "方程", en: "Equations", chs: ["ch03", "ch05", "ch06"], txt: R`Einstein 方程与 Boltzmann 方程：第 3 章用于均匀宇宙（推出 Friedmann 方程 \eqref{1.3}），第 5、6 章推广到一阶扰动——光子、重子、暗物质、中微子与度规扰动的耦合方程组。` },
  { id: "infl", x: 200, y: 150, zh: "暴胀", en: "Inflation", chs: ["ch07"], txt: R`从均匀宇宙的谜题（视界问题、平直性）出发引入暴胀，再计算它产生的原初扰动与引力波——扰动方程的初始条件。` },
  { id: "lin", x: 330, y: 245, zh: "线性解", en: "Linear Solutions", chs: ["ch08", "ch09"], txt: R`解扰动方程：物质的转移函数与增长因子（第 8 章，含 BAO 的来历）；光子的声学振荡与自由流（第 9 章）。` },
  { id: "nl", x: 150, y: 232, zh: "非线性解", en: "Nonlinear Solutions", chs: ["ch12"], txt: R`小尺度上 $\delta\gtrsim1$：微扰论的高阶修正、球坍缩、晕模型与 N 体模拟（图 1.9 理论曲线中的非线性修正）。` },
  { id: "lss", x: 70, y: 322, zh: "LSS 探针", en: "LSS Probes", chs: ["ch11", "ch13"], txt: R`星系成团、红移空间畸变、BAO（第 11 章）与引力透镜（第 13 章）：把理论的物质分布与巡天观测联系起来。` },
  { id: "cmb", x: 440, y: 322, zh: "CMB 探针", en: "CMB Probes", chs: ["ch09", "ch10"], txt: R`温度各向异性功率谱（图 1.10）及其对宇宙学参数的依赖；偏振与原初引力波的 B 模式。` },
  { id: "ana", x: 255, y: 360, zh: "数据分析", en: "Analysis", chs: ["ch14"], txt: R`从数据中提取宇宙学信息：似然、Fisher 矩阵、参数估计与 MCMC。` },
];
const EDGES = [["today", "eqs"], ["eqs", "past"], ["eqs", "lin"], ["infl", "lin"], ["lin", "nl"], ["nl", "lss"], ["lin", "lss"], ["lin", "cmb"], ["lss", "ana"], ["cmb", "ana"]];
export function BookMap() {
  const [sel, setSel] = useState("today");
  const by = Object.fromEntries(NODES.map(n => [n.id, n]));
  const rx = 52, ry = 30;
  const cut = (a, b) => { const dx = b.x - a.x, dy = b.y - a.y, t = 1 / Math.sqrt((dx / rx) ** 2 + (dy / ry) ** 2); return [a.x + dx * t, a.y + dy * t, b.x - dx * t, b.y - dy * t]; };
  const s = by[sel];
  const up = id => EDGES.filter(([, b]) => b === id).map(([a]) => by[a].zh), down = id => EDGES.filter(([a]) => a === id).map(([, b]) => by[b].zh);
  return (
    <div className="plot card">
      <svg viewBox="0 0 520 400" className="plot-svg" style={{ maxWidth: 620, margin: "0 auto" }}>
        <defs><marker id="ch01arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#333" /></marker></defs>
        <rect x={0} y={0} width={520} height={118} fill="#dcecf7" />
        <rect x={0} y={118} width={520} height={282} fill="#a9c8ea" opacity={0.7} />
        <ST x={330} y={92} w={180} tex={R`\text{均匀宇宙}`} right color="#2c4a6e" />
        <ST x={330} y={122} w={180} tex={R`\text{扰动}`} right color="#1d3557" />
        {EDGES.map(([a, b]) => { const [x1, y1, x2, y2] = cut(by[a], by[b]); const on = a === sel || b === sel; return <line key={a + b} x1={x1} y1={y1} x2={x2} y2={y2} stroke={on ? "#c0392b" : "#333"} strokeWidth={on ? 2.2 : 1.2} markerEnd="url(#ch01arr)" />; })}
        {NODES.map(n => <g key={n.id} onClick={() => setSel(n.id)} style={{ cursor: "pointer" }}>
          <ellipse cx={n.x} cy={n.y} rx={rx} ry={ry} fill={sel === n.id ? "#ffd23f" : "#f6c90e"} stroke={sel === n.id ? "#c0392b" : "#b38f00"} strokeWidth={sel === n.id ? 2.5 : 1} />
          <text x={n.x} y={n.y - 4} textAnchor="middle" fontSize="13" fill="#222" style={{ fontWeight: 600 }}>{n.zh}</text>
          <text x={n.x} y={n.y + 13} textAnchor="middle" fontSize="10" fill="#444">{"第 " + n.chs.map(c => +c.slice(2)).join("、") + " 章"}</text>
        </g>)}
      </svg>
      <div style={{ marginTop: 8 }}>
        <p style={{ margin: "0.2em 0" }}><b>{s.zh}</b>（{s.en}）：<TxI>{s.txt}</TxI></p>
        <p style={{ margin: "0.2em 0" }} className="muted">依赖：{up(sel).join("、") || "—"}；通向：{down(sel).join("、") || "—"}</p>
        <p style={{ margin: "0.2em 0" }}>{s.chs.map(c => <span key={c} style={{ marginRight: 14 }}>{hasChapter(c) ? <a href={pageUrl(c)}>第 {+c.slice(2)} 章 {CH[c]} →</a> : <span className="muted">第 {+c.slice(2)} 章 {CH[c]}</span>}</span>)}</p>
      </div>
    </div>);
}
