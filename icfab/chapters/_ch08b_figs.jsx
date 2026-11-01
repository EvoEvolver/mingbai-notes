// 第 8 章（下）自绘示意图（SVG）：图 8.24、8.31、8.34、8.36、8.39、8.47、8.48、8.49、8.50、8.51。
// 材料配色：Si 灰、SiO₂ 浅蓝、缺陷/间隙原子 红、注入杂质 紫褐、H 富集层 深色点线。
import { useId, useState } from "react";
import { M, TxI } from "@kit";
import * as P from "./_ch08b_phys.jsx";

const R = String.raw;
export const COL = { si: "#d5d7da", siD: "#9aa0a6", ox: "#bfe0f2", oxD: "#5a9bc4", def: "#c0392b", dop: "#7d3c98", ink: "#2b2b2b", mute: "#7a7a7a", gold: "#c99a2e", acc: "#2c6e49", amor: "#e9e2d0" };
const panel = { background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 10, padding: "12px 14px", width: "100%", boxSizing: "border-box" };
const btn = on => ({ padding: "5px 11px", margin: "2px 4px", borderRadius: 7, border: `1px solid ${on ? "#2c4a6e" : "#bcb6a9"}`, background: on ? "#e2eef7" : "#fffdf8", cursor: "pointer", fontSize: 14 });
export function Frame({ children }) { return <div style={panel}>{children}</div>; }
export function Svg({ title, w = 680, h = 300, children }) {
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} style={{ width: "100%", display: "block", fontFamily: "system-ui, sans-serif", fontSize: 14 }}><title>{title}</title>{children}</svg>;
}
export function Range({ label, value, set, min, max, step, log = false, fmt }) {
  const id = useId(), toS = v => (log ? Math.log10(v) : v), fromS = s => (log ? 10 ** s : s);
  return <label htmlFor={id} style={{ display: "block", margin: "6px 0", fontSize: 14 }}>
    <span><TxI>{label}</TxI>：<b><TxI>{String(fmt ? fmt(value) : value)}</TxI></b></span>
    <input id={id} type="range" min={toS(min)} max={toS(max)} step={log ? 0.01 : step} value={toS(value)} onChange={e => set(fromS(+e.target.value))} style={{ display: "block", width: "100%" }} />
  </label>;
}
export function Btns({ opts, value, set }) { return <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", margin: "4px 0" }}>{opts.map(([k, l]) => <button key={k} style={btn(value === k)} onClick={() => set(k)}>{l}</button>)}</div>; }
export function Arrow({ x1, y1, x2, y2, c = COL.ink, w = 2, dash, head = 8 }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p = `${x2},${y2} ${x2 - head * Math.cos(a - 0.4)},${y2 - head * Math.sin(a - 0.4)} ${x2 - head * Math.cos(a + 0.4)},${y2 - head * Math.sin(a + 0.4)}`;
  return <g><line x1={x1} y1={y1} x2={x2 - 0.7 * head * Math.cos(a)} y2={y2 - 0.7 * head * Math.sin(a)} stroke={c} strokeWidth={w} strokeDasharray={dash} /><polygon points={p} fill={c} /></g>;
}
const T = ({ x, y, c = COL.ink, a = "middle", s = 14, children, w }) => <text x={x} y={y} fill={c} textAnchor={a} fontSize={s} fontWeight={w}>{children}</text>;
// 含公式的标签：foreignObject + KaTeX（x,y 为基线附近的锚点；a=start/middle/end）
export const L = ({ x, y, w = 220, h = 26, a = "middle", s = 14, c = COL.ink, children }) => {
  const x0 = a === "middle" ? x - w / 2 : a === "end" ? x - w : x;
  return <foreignObject x={x0} y={y - h + 6} width={w} height={h}><div style={{ fontSize: s, color: c, textAlign: a === "middle" ? "center" : a === "end" ? "right" : "left", lineHeight: 1.25, whiteSpace: "nowrap" }}><TxI>{children}</TxI></div></foreignObject>;
};

// ---------- 图 8.24 损伤圆柱 ----------
export function DamageCylinder() {
  const kinks = [[210, 160], [262, 140], [318, 158], [372, 132], [430, 168], [486, 142], [540, 160]];
  return <Svg title="30 keV As 离子在 Si 中的损伤圆柱" h={250}>
    <line x1={150} y1={30} x2={150} y2={230} stroke={COL.ink} strokeWidth={2} />
    <T x={130} y={24} a="end" s={13} c={COL.mute}>表面</T>
    <ellipse cx={150} cy={150} rx={14} ry={62} fill="#eef0f2" stroke={COL.siD} strokeWidth={2} />
    <line x1={150} y1={88} x2={600} y2={88} stroke={COL.siD} strokeWidth={2} />
    <line x1={150} y1={212} x2={600} y2={212} stroke={COL.siD} strokeWidth={2} />
    <ellipse cx={600} cy={150} rx={14} ry={62} fill="none" stroke={COL.siD} strokeWidth={2} strokeDasharray="5 4" />
    <T x={375} y={70}>损伤圆柱（直径 ~ 几 nm）</T>
    <Arrow x1={40} y1={150} x2={165} y2={150} c={COL.dop} w={3} />
    <L x={70} y={140} c={COL.dop} w={130}>{R`30 keV $\mathrm{As^+}$`}</L>
    <polyline points={[[165, 150], ...kinks].map(p => p.join(",")).join(" ")} fill="none" stroke={COL.dop} strokeWidth={2.5} />
    <circle cx={540} cy={160} r={7} fill={COL.dop} />
    {kinks.slice(0, -1).map(([x, y], i) => <g key={i}>
      <Arrow x1={x} y1={y} x2={x + 22} y2={y + (i % 2 ? 34 : -36)} c={COL.def} w={2.2} head={7} />
      <Arrow x1={x + 22} y1={y + (i % 2 ? 34 : -36)} x2={x + 34} y2={y + (i % 2 ? 48 : -50)} c={COL.def} w={1.4} head={5} />
    </g>)}
    <T x={400} y={118} c={COL.def} s={13}>每次约 333 eV 的 Si 反冲原子</T>
    <Arrow x1={160} y1={230} x2={540} y2={230} c={COL.ink} w={1.5} /><Arrow x1={540} y1={230} x2={160} y2={230} c={COL.ink} w={1.5} />
    <L x={350} y={248} w={460} s={13}>{R`$R_{\rm P}\approx23$ nm $\approx90$ 个原子面（面间距 $\approx0.25$ nm）`}</L>
  </Svg>;
}

// 高斯注入分布的小工具（用于示意图）
const gpath = (x0, x1, y0, h, mu, sg, sx = 1) => {
  const pts = []; for (let i = 0; i <= 80; i++) { const x = x0 + (x1 - x0) * i / 80; const v = Math.exp(-((x - mu) ** 2) / (2 * sg * sg)); pts.push(`${x},${y0 - h * v}`); } return pts.join(" ");
};
function Axes({ x0, y0, w, h, xl = "深度", yl = "浓度" }) {
  return <g><Arrow x1={x0} y1={y0} x2={x0 + w} y2={y0} w={1.5} /><Arrow x1={x0} y1={y0} x2={x0} y2={y0 - h} w={1.5} />
    <T x={x0 + w - 10} y={y0 + 20} a="end" s={13}>{xl}</T>
    <text x={x0 - 12} y={y0 - h / 2} transform={`rotate(-90 ${x0 - 12} ${y0 - h / 2})`} textAnchor="middle" fontSize={13}>{yl}</text></g>;
}
function Loops({ x, y0, y1 }) { const out = []; for (let y = y0, i = 0; y < y1; y += 13, i++) out.push(<ellipse key={i} cx={x + (i % 2 ? 4 : -3)} cy={y} rx={4} ry={6} fill="none" stroke={COL.def} strokeWidth={1.6} />); return <g>{out}</g>; }

// ---------- 图 8.31 EOR 位错环 ----------
export function EORSchematic() {
  const x0 = 80, y0 = 250, xac = 300;
  return <Svg title="SPE 之后 a/c 界面处的 EOR 位错环" h={280}>
    <rect x={x0} y={40} width={xac - x0} height={y0 - 40} fill={COL.amor} />
    <rect x={xac} y={40} width={300} height={y0 - 40} fill="#eef0f2" />
    <Axes x0={x0} y0={y0} w={520} h={220} />
    <polyline points={gpath(x0, 520, y0, 180, 220, 95)} fill="none" stroke={COL.dop} strokeWidth={2.5} />
    <line x1={xac} y1={40} x2={xac} y2={y0} stroke={COL.ink} strokeDasharray="6 4" />
    <Loops x={xac + 10} y0={120} y1={y0 - 6} />
    <Arrow x1={x0 + 4} y1={56} x2={xac - 4} y2={56} w={1.5} /><Arrow x1={xac - 4} y1={56} x2={x0 + 4} y2={56} w={1.5} />
    <T x={(x0 + xac) / 2} y={50}>SPE 再生长区（原非晶层）</T>
    <T x={200} y={130} c={COL.dop}>注入分布</T>
    <T x={235} y={205} a="end">a/c 界面</T><Arrow x1={238} y1={200} x2={xac - 3} y2={200} w={1.4} />
    <T x={420} y={108} c={COL.def}>EOR 位错环</T><Arrow x1={400} y1={114} x2={318} y2={150} c={COL.def} w={1.4} />
    <T x={480} y={200}>残余损伤（+1 区）</T>
  </Svg>;
}

// ---------- 图 8.34 低于 / 高于非晶化阈值 ----------
export function DamageSummary() {
  const one = (ox, above) => {
    const y0 = 250, thr = above ? 120 : 110, mu = ox + 150, h = above ? 200 : 115, sg = 70;
    const xac = above ? mu + sg * Math.sqrt(2 * Math.log(h / (y0 - thr))) : null;
    return <g>
      {above && <rect x={ox} y={40} width={xac - ox} height={y0 - 40} fill={COL.amor} />}
      <Axes x0={ox} y0={y0} w={290} h={220} />
      <line x1={ox} y1={thr} x2={ox + 280} y2={thr} stroke={COL.ink} strokeDasharray="7 5" />
      <T x={ox + 280} y={thr - 6} a="end" s={12}>非晶化阈值</T>
      <polyline points={gpath(ox, ox + 285, y0, h, mu, sg)} fill="none" stroke={COL.dop} strokeWidth={2.5} />
      {above ? <>
        <line x1={xac} y1={40} x2={xac} y2={y0} stroke={COL.ink} strokeDasharray="4 3" />
        <Loops x={xac + 6} y0={thr + 15} y1={y0 - 4} />
        <T x={(ox + xac) / 2} y={58} s={13}>SPE 再生长</T>
        <T x={xac + 60} y={190} s={13}>+1 模型</T><T x={xac + 60} y={207} s={13}>适用（尾部）</T>
        <T x={xac - 8} y={235} a="end" s={12} c={COL.def}>EOR 环</T>
      </> : <><T x={mu} y={200} s={13}>+1 模型</T><T x={mu} y={218} s={13}>处处适用</T></>}
      <T x={ox + 145} y={280} s={14} w={600}>{above ? "高于阈值：表面非晶层" : "低于阈值：不非晶化"}</T>
    </g>;
  };
  return <Svg title="低于与高于非晶化阈值时的损伤模型" h={290}>{one(40, false)}{one(370, true)}</Svg>;
}

// ---------- 图 8.36 埋层标记实验 ----------
export function MarkerLayer() {
  const x0 = 70, y0 = 250, b0 = 400;
  const bInit = gpath(x0 + 200, x0 + 560, y0, 70, b0, 22), bFin = gpath(x0 + 200, x0 + 560, y0, 42, b0, 52);
  return <Svg title="埋层标记实验：表面 As 注入的 TED 使深处的 B 标记层展宽" h={280}>
    <Axes x0={x0} y0={y0} w={580} h={220} yl="掺杂浓度" />
    <polyline points={gpath(x0, x0 + 300, y0, 200, x0 + 60, 50)} fill="none" stroke={COL.dop} strokeWidth={2.5} />
    <T x={x0 + 70} y={40} c={COL.dop}>As 注入分布（表面非晶化）</T>
    <polyline points={bInit} fill="none" stroke="#2c4a6e" strokeWidth={2.2} />
    <polyline points={bFin} fill="none" stroke="#2c4a6e" strokeWidth={2.2} strokeDasharray="7 5" />
    <T x={b0 + 50} y={170} c="#2c4a6e">B 标记层：初始（实线）</T>
    <T x={b0 + 50} y={188} c="#2c4a6e">退火后（虚线，TED 展宽）</T>
    <Arrow x1={x0 + 170} y1={150} x2={b0 - 40} y2={150} c={COL.def} w={2} />
    <T x={x0 + 250} y={142} c={COL.def} s={13}>{"{311} 释放的间隙原子"}</T>
  </Svg>;
}

// ---------- 图 8.39 表面复合通量 ----------
export function SurfaceFlux() {
  const x0 = 110, y0 = 260, rp = 300, cm = 130;
  return <Svg title="+1 间隙原子向表面复合的通量" h={290}>
    <line x1={x0} y1={30} x2={x0} y2={y0 + 10} stroke={COL.ink} strokeWidth={3} />
    <T x={x0} y={22}>表面</T>
    <polyline points={gpath(x0 + 110, x0 + 330, y0, 150, rp, 45)} fill="none" stroke={COL.dop} strokeWidth={2} />
    <T x={rp + 95} y={92} c={COL.dop}>注入分布</T>
    <line x1={x0} y1={cm} x2={600} y2={cm} stroke={COL.mute} strokeDasharray="6 5" />
    <L x={x0 - 6} y={cm + 8} a="end" w={80}>{R`$C_{\rm I}^{\max}$`}</L>
    <polyline points={`${x0},${y0} ${rp},${cm} 600,${cm + 12}`} fill="none" stroke={COL.def} strokeWidth={2.6} />
    <Arrow x1={rp - 30} y1={cm + 25} x2={x0 + 15} y2={y0 - 15} c={COL.def} w={2} />
    <T x={x0 + 150} y={y0 - 24} c={COL.def} a="start" s={13}>表面复合通量</T>
    <L x={x0 + 150} y={y0 + 2} c={COL.def} a="start" s={13}>{R`$\approx d_{\rm I}C_{\rm I}^{\max}/R_{\rm P}$`}</L>
    <Arrow x1={rp + 40} y1={cm + 8} x2={600} y2={cm + 14} c={COL.def} w={1.6} />
    <T x={540} y={cm + 36} c={COL.def} s={13}>向体内扩散</T>
    <Arrow x1={x0} y1={50} x2={rp} y2={50} w={1.5} /><L x={(x0 + rp) / 2} y={46} w={60}>{R`$R_{\rm P}$`}</L>
    <line x1={rp} y1={46} x2={rp} y2={y0} stroke={COL.mute} strokeDasharray="2 4" />
  </Svg>;
}

// ---------- 图 8.47 TED 的幅度与持续时间（交互：温度） ----------
export function TEDSchematic() {
  const [Tc, setT] = useState(800);
  const S = P.supersat(Tc), tau = P.tauEnh(Tc, 127e-7, 5e13);
  const x0 = 90, y0 = 250, h = 200, w = 520, ly = v => y0 - h * Math.log10(v) / 5;   // 1..1e5
  const xt = x0 + 0.62 * w;   // τ 位置（时间轴以 τ 归一）
  return <Frame>
    <Range label="退火温度" value={Tc} set={setT} min={650} max={1250} step={5} fmt={v => `${v} °C`} />
    <Svg title="TED 的增强倍数与持续时间示意" h={290}>
      <rect x={x0} y={ly(S)} width={xt - x0} height={y0 - ly(S)} fill="#cfe3f3" />
      <Axes x0={x0} y0={y0} w={w + 20} h={h + 20} xl="时间" yl="" />
      <L x={x0 + 8} y={36} a="start" w={200} s={13}>{R`$C_{\rm I}^{\max}/C_{\rm I}^*$`}</L>
      {[1, 10, 100, 1000, 1e4, 1e5].map(v => <g key={v}><line x1={x0 - 5} x2={x0} y1={ly(v)} y2={ly(v)} stroke={COL.ink} /><L x={x0 - 8} y={ly(v) + 7} a="end" s={12} w={60}>{`$10^{${Math.log10(v)}}$`}</L></g>)}
      <polyline points={`${x0},${ly(S)} ${xt},${ly(S)} ${xt + 30},${ly(1)}`} fill="none" stroke={COL.def} strokeWidth={2.8} />
      <Arrow x1={x0} y1={ly(S) - 18} x2={xt} y2={ly(S) - 18} w={1.4} /><Arrow x1={xt} y1={ly(S) - 18} x2={x0} y2={ly(S) - 18} w={1.4} />
      <L x={(x0 + xt) / 2} y={ly(S) - 22} w={300}>{`$\\tau_{\\rm enh}\\approx ${P.fmtTime(tau)}$`}</L>
      <L x={(x0 + xt) / 2} y={Math.min(y0 - 22, ly(S) + 40)} w={340}>{`稳态：$C_{\\rm I}^{\\max}/C_{\\rm I}^*\\approx ${Math.round(S)}$`}</L>
      <L x={(x0 + xt) / 2} y={Math.min(y0 - 3, ly(S) + 62)} s={13} c={COL.mute} w={360}>{R`TED $\propto$（增强倍数）$\times\tau_{\rm enh}$，即蓝色面积`}</L>
      <T x={xt + 40} y={ly(Math.sqrt(S)) } a="start" s={13}>{"{311} 耗尽后迅速衰减"}</T>
    </Svg>
    <p style={{ fontSize: 13, margin: 0 }}><TxI>{R`例：100 keV、$5\times10^{13}\,\mathrm{cm^{-2}}$ 的 P 注入（原书例题参数）。降温时平台变高、变长——面积（即 TED 总量）随温度下降而增大。时间轴按 $\tau_{\rm enh}$ 归一（不同温度下 $\tau_{\rm enh}$ 相差几个数量级）。`}</TxI></p>
  </Frame>;
}

// ---------- 图 8.48 闪光退火系统 ----------
export function FlashSystem() {
  const lamps = (y, n, c) => Array.from({ length: n }, (_, i) => <ellipse key={i} cx={88 + i * 40} cy={y} rx={14} ry={9} fill={c} stroke="#8a6d1f" />);
  const tx = 580, ty = 230;
  const curve = []; for (let i = 0; i <= 120; i++) { const t = i / 120; const T0 = t < 0.45 ? 0.25 + 0.9 * t : 0.655; const fl = t > 0.62 && t < 0.8 ? 0.6 * Math.exp(-((t - 0.66) ** 2) / 0.0004) : 0; const cool = t > 0.8 ? -(t - 0.8) * 1.6 : 0; curve.push(`${tx + 180 * t},${ty - 150 * Math.max(0.2, T0 + fl + cool)}`); }
  return <Svg title="闪光退火系统与晶圆温度曲线" w={800} h={270}>
    <rect x={60} y={20} width={340} height={230} rx={8} fill="none" stroke={COL.ink} strokeWidth={2} />
    <T x={230} y={14} s={13}>腔体</T>
    <path d="M 70 32 Q 230 8 390 32" fill="none" stroke={COL.mute} strokeWidth={3} /><T x={380} y={48} a="end" s={12} c={COL.mute}>反射罩</T>
    {lamps(62, 8, "#f6d77b")}<T x={410} y={66} a="start" s={13}>闪光灯（Xe）</T>
    <rect x={70} y={86} width={320} height={8} fill={COL.ox} /><T x={410} y={94} a="start" s={12}>石英窗</T>
    <rect x={110} y={130} width={240} height={8} fill={COL.siD} /><T x={410} y={130} a="start" s={13}>晶圆</T><T x={410} y={147} a="start" s={12}>（几根细针支撑）</T>
    {[150, 230, 310].map(x => <line key={x} x1={x} y1={138} x2={x} y2={156} stroke={COL.ink} strokeWidth={2} />)}
    <rect x={70} y={172} width={320} height={8} fill={COL.ox} />
    {lamps(205, 8, "#f2b36b")}<T x={410} y={210} a="start" s={13}>卤素灯（预热）</T>
    <Arrow x1={tx} y1={ty} x2={tx + 195} y2={ty} w={1.4} /><Arrow x1={tx} y1={ty} x2={tx} y2={ty - 160} w={1.4} />
    <T x={tx - 8} y={ty - 150} a="end" s={13}>T</T><T x={tx + 190} y={ty + 18} a="end" s={13}>时间</T>
    <polyline points={curve.join(" ")} fill="none" stroke={COL.def} strokeWidth={2.4} />
    <T x={tx + 125} y={ty - 165} a="start" s={12} c={COL.def}>毫秒闪光</T>
    <T x={tx + 55} y={ty - 40} s={12}>卤素灯预热</T>
  </Svg>;
}

// ---------- 晶圆截面小块 ----------
function Wafer({ x, y, w = 240, h = 46, label, ox, oxT = 10, implant, implantY, rough, children }) {
  return <g>
    {ox === "top" && <rect x={x} y={y - oxT} width={w} height={oxT} fill={COL.ox} stroke={COL.oxD} strokeWidth={0.8} />}
    <rect x={x} y={y} width={w} height={h} fill={COL.si} stroke={COL.siD} />
    {implant && <rect x={x} y={y + implantY} width={w} height={6} fill="url(#dots)" />}
    {rough && <path d={`M ${x} ${y} ` + Array.from({ length: 24 }, (_, i) => `L ${x + (i + 0.5) * w / 24} ${y - 3 - (i * 7 % 5)} L ${x + (i + 1) * w / 24} ${y}`).join(" ")} fill={COL.si} stroke={COL.siD} />}
    {label && <T x={x + w / 2} y={y + h / 2 + 5} s={13}>{label}</T>}
    {children}
  </g>;
}
const Defs = () => <defs><pattern id="dots" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="#555" /><circle cx="2" cy="2" r="1" fill="#ddd" /></pattern></defs>;

// ---------- 图 8.49 SIMOX ----------
export function SimoxFlow() {
  return <Svg title="SIMOX 工艺流程" h={300}>
    <Defs />
    <Wafer x={60} y={40} label="Si 晶圆" />
    <T x={180} y={30} s={13}>(a)</T>
    {Array.from({ length: 7 }, (_, i) => <Arrow key={i} x1={370 + i * 30} y1={28} x2={370 + i * 30} y2={62} w={1.8} />)}
    <Wafer x={360} y={70} />
    <L x={480} y={142} s={13} w={320}>{R`(b) 200 keV、$10^{18}\,\mathrm{cm^{-2}}$ $\mathrm{O^+}$，约 600 °C 注入`}</L>
    <Wafer x={60} y={180}><rect x={60} y={196} width={240} height={10} fill="url(#dots)" /></Wafer>
    <T x={180} y={250} s={13}>(c) 富 O 埋层</T>
    <Wafer x={360} y={180}><rect x={360} y={196} width={240} height={12} fill={COL.ox} stroke={COL.oxD} /></Wafer>
    <T x={480} y={250} s={13}>(d) 1300 °C 数小时退火</T>
    <T x={620} y={192} a="start" s={12}>单晶器件层</T><T x={620} y={207} a="start" s={12} c={COL.oxD}>埋氧 BOX</T>
    <Arrow x1={300} y1={203} x2={350} y2={203} w={1.4} />
    <T x={340} y={290} s={12} c={COL.mute}>BOX 典型 0.1–0.5 µm，顶层 Si 厚度同量级</T>
  </Svg>;
}

// ---------- 图 8.50 Smart Cut（分步 + H 能量） ----------
const STEPS = [
  ["a", "热氧化晶圆 A"], ["b", R`$\mathrm{H^+}$ 注入（$10^{16}$–$10^{17}\,\mathrm{cm^{-2}}$）`], ["c", "RCA 清洗、翻转"], ["d", "室温键合（范德华力）"], ["e", R`约 500 °C：H 聚集成微腔，在 $R_{\rm P}$ 处劈裂`], ["f", "约 1100 °C 加固键合，再 CMP"],
];
export function SmartCut() {
  const [k, setK] = useState(0), [E, setE] = useState(60), [tox, setTox] = useState(150);
  const rp = P.hRange(E) * 1000, tsi = Math.max(rp - tox, 0);   // nm
  const sc = 80 / 1800, cut = Math.max(rp * sc, 4), oxh = Math.max(tox * sc, 3);
  const X = 200, W = 280, A_Y = 70;
  const step = STEPS[k][0];
  return <Frame>
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
      {STEPS.map(([s], i) => <button key={s} style={btn(i === k)} onClick={() => setK(i)}>{s})</button>)}<span style={{ fontSize: 13, marginLeft: 6 }}>← 逐步查看</span>
    </div>
    <Svg title={`Smart Cut 第 ${step} 步`} h={290}>
      <Defs />
      {/* 晶圆 A */}
      {(step === "a" || step === "b") && <g>
        <rect x={X} y={A_Y - oxh} width={W} height={oxh} fill={COL.ox} stroke={COL.oxD} />
        <rect x={X} y={A_Y} width={W} height={110} fill={COL.si} stroke={COL.siD} />
        {step === "b" && <>
          <rect x={X} y={A_Y - oxh + cut - 2} width={W} height={5} fill="url(#dots)" />
          {Array.from({ length: 8 }, (_, i) => <Arrow key={i} x1={X + 18 + i * 35} y1={10} x2={X + 18 + i * 35} y2={A_Y - oxh - 4} w={1.6} c={COL.def} />)}
          <L x={X + W + 10} y={A_Y - oxh + cut + 8} a="start" s={12} c={COL.def} w={190}>{`H 峰：$R_{\\rm P}\\approx ${(rp / 1000).toFixed(2)}\\,\\mathrm{\\mu m}$`}</L>
        </>}
        <T x={X + W / 2} y={A_Y + 70} s={13}>Si 晶圆 A</T>
        <T x={X + W + 10} y={A_Y - oxh / 2 + 4} a="start" s={12} c={COL.oxD}>SiO₂</T>
      </g>}
      {step === "c" && <g>
        <g transform={`rotate(-14 ${X + W / 2} 70)`}>
          <rect x={X} y={20} width={W} height={60} fill={COL.si} stroke={COL.siD} />
          <rect x={X} y={80 - cut + oxh - 2} width={W} height={5} fill="url(#dots)" />
          <rect x={X} y={80} width={W} height={oxh} fill={COL.ox} stroke={COL.oxD} />
          <T x={X + W / 2} y={50} s={13}>晶圆 A（翻转）</T>
        </g>
        <rect x={X} y={170} width={W} height={80} fill={COL.si} stroke={COL.siD} /><T x={X + W / 2} y={215} s={13}>Si 晶圆 B（未来衬底）</T>
      </g>}
      {(step === "d" || step === "e" || step === "f") && <g>
        {step === "d" && <g>
          <rect x={X} y={40} width={W} height={60} fill={COL.si} stroke={COL.siD} /><T x={X + W / 2} y={72} s={13}>晶圆 A</T>
          <rect x={X} y={100} width={W} height={5} fill="url(#dots)" />
        </g>}
        {step === "e" && <g>
          <rect x={X} y={20} width={W} height={60} fill={COL.si} stroke={COL.siD} /><T x={X + W / 2} y={52} s={13}>晶圆 A（可回收再用）</T>
          {Array.from({ length: 14 }, (_, i) => <ellipse key={i} cx={X + 12 + i * 20} cy={84} rx={6} ry={2.5} fill="#fff" stroke={COL.mute} />)}
        </g>}
        <rect x={X} y={105} width={W} height={Math.max(tsi * sc, 2)} fill={COL.si} stroke={COL.siD} />
        {step === "e" && <path d={`M ${X} 105 ` + Array.from({ length: 28 }, (_, i) => `L ${X + (i + 0.5) * W / 28} ${101 - (i * 5 % 4)} L ${X + (i + 1) * W / 28} 105`).join(" ")} fill={COL.si} stroke={COL.siD} />}
        <rect x={X} y={105 + tsi * sc} width={W} height={oxh} fill={COL.ox} stroke={COL.oxD} />
        <rect x={X} y={105 + tsi * sc + oxh} width={W} height={90} fill={COL.si} stroke={COL.siD} />
        <T x={X + W / 2} y={105 + tsi * sc + oxh + 50} s={13}>Si 晶圆 B</T>
        <T x={X + W + 10} y={108 + tsi * sc / 2} a="start" s={12}>{`顶层 Si 约 ${(tsi / 1000).toFixed(2)} µm`}</T>
        <T x={X + W + 10} y={110 + tsi * sc + oxh / 2} a="start" s={12} c={COL.oxD}>{`BOX ${tox} nm`}</T>
      </g>}
      <L x={340} y={282} s={14} w={520}>{`(${step}) ${STEPS[k][1]}`}</L>
    </Svg>
    <Range label="H 离子注入能量" value={E} set={setE} min={10} max={200} step={1} fmt={v => `${v} keV（Si 中投影射程约 ${P.hRange(v).toFixed(2)} µm）`} />
    <Range label="热氧化层（将成为 BOX）厚度" value={tox} set={setTox} min={20} max={400} step={5} fmt={v => `${v} nm`} />
    <p style={{ fontSize: 13, margin: "4px 0 0" }}>顶层 Si 厚度约等于 H 的投影射程减去氧化层厚度（把氧化层的阻止本领近似当作与 Si 相同；H 射程为 SRIM 量级的近似值，非原书数据）。原书要点：顶层 Si 厚度由 H 离子的注入能量决定。</p>
  </Frame>;
}

// ---------- 图 8.51 PIII ----------
export function PIIISystem() {
  const ions = [[180, 120], [240, 150], [300, 110], [360, 140], [420, 118], [480, 150], [270, 175], [390, 180]];
  return <Svg title="等离子体浸没注入系统" h={290}>
    <rect x={120} y={40} width={420} height={210} rx={10} fill="#f6f2fb" stroke={COL.ink} strokeWidth={2} />
    <T x={170} y={32} s={13}>真空腔</T>
    <rect x={250} y={8} width={160} height={22} fill="#fff" stroke={COL.ink} /><T x={330} y={24} s={12}>微波 / RF 功率源</T>
    <L x={330} y={72} s={13} c="#7d3c98" w={400}>{R`等离子体（$\mathrm{PH_3}$、$\mathrm{B_2H_6}$、$\mathrm{BF_3}$…）：化学由 RF 功率控制`}</L>
    {ions.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={8} fill="#e6d3f0" stroke="#7d3c98" /><T x={x} y={y + 5} s={13} c="#7d3c98">+</T><Arrow x1={x} y1={y + 12} x2={x} y2={202} c="#7d3c98" w={1.2} head={6} /></g>)}
    <rect x={170} y={205} width={320} height={10} fill={COL.siD} /><T x={340} y={234} a="start" s={13}>晶圆（负偏置）：离子能量由衬底电源控制</T>
    <line x1={330} y1={215} x2={330} y2={262} stroke={COL.ink} strokeWidth={2} />
    <rect x={290} y={262} width={80} height={22} fill="#fff" stroke={COL.ink} /><T x={330} y={278} s={12}>脉冲 / AC 偏压</T>
    <polyline points="560,250 575,250 575,230 590,230 590,250 605,250 605,230 620,230 620,250 640,250" fill="none" stroke={COL.def} strokeWidth={2} />
    <T x={600} y={222} s={11} c={COL.def}>负偏压脉冲</T>
  </Svg>;
}

// 小工具：公式在 JSX 中
export const EqI = ({ children }) => <M>{children}</M>;
