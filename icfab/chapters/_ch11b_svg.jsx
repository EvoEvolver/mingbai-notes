// 第 11 章（下）自绘插图（SVG）。材料配色全章统一：
// Si 灰、SiO₂ 浅蓝、Si₃N₄ 绿、多晶硅/栅 红棕、Cu 橙、W 金、TiN/TaN 阻挡层 蓝灰、硅化物 深紫灰、光刻胶 紫。
import { useState } from "react";
import { M } from "@kit";
import { depletionNm, rhoTunnel, rhoThermionic } from "./_ch11b_phys.jsx";

const R = String.raw;
export const MAT = {
  si: "#bdbdbd", sio2: "#cfe4f5", sin: "#9fd09f", poly: "#a0522d", cu: "#d9822b", cuSeed: "#f0b070", w: "#c9a227",
  tin: "#58708a", sil: "#5d5470", resist: "#9b7fd1", lowk: "#d7e9d0", ti: "#8d8d9e", air: "#ffffff", gaas: "#c6b48c",
  ink: "#26282c", red: "#c0392b", blue: "#2c4a6e", green: "#2c6e49",
};
const frame = { background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 10, padding: 12, width: "100%", boxSizing: "border-box" };
const btn = on => ({ padding: "5px 10px", margin: "2px", borderRadius: 6, border: `1px solid ${on ? MAT.blue : "#bcb6a9"}`, background: on ? "#e2eef7" : "#fffdf8", cursor: "pointer", fontSize: 14 });
export function Svg({ w = 680, h = 300, title, children }) {
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} style={{ width: "100%", display: "block", fontFamily: "system-ui, sans-serif", fontSize: 13 }}><title>{title}</title>
    <defs><marker id="arr11b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={MAT.ink} /></marker>
      <marker id="arr11br" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={MAT.red} /></marker></defs>
    {children}</svg>;
}
const Rc = ({ x, y, w, h, f, s = "#666", sw = 0.8, o }) => <rect x={x} y={y} width={w} height={h} fill={f} stroke={s} strokeWidth={sw} opacity={o} />;
const T = ({ x, y, c = MAT.ink, a = "middle", s = 13, children, b }) => <text x={x} y={y} fill={c} textAnchor={a} fontSize={s} fontWeight={b ? 600 : 400}>{children}</text>;
const Ar = ({ x1, y1, x2, y2, c = MAT.ink, red, dash }) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={red ? MAT.red : c} strokeWidth="1.6" strokeDasharray={dash} markerEnd={`url(#${red ? "arr11br" : "arr11b"})`} />;
function Legend({ items, x = 10, y = 14 }) {
  return <g>{items.map(([c, l], i) => <g key={l} transform={`translate(${x + i * 92},${y})`}><rect width="14" height="10" y="-9" fill={c} stroke="#777" strokeWidth=".6" /><text x="18" fontSize="11.5">{l}</text></g>)}</g>;
}
function Range({ label, value, set, min, max, step }) {
  return <label style={{ display: "block", fontSize: 14, margin: "6px 0" }}>{label}<input type="range" min={min} max={max} step={step} value={value} onChange={e => set(+e.target.value)} style={{ width: "100%" }} /></label>;
}

// ---------- 图 11.25 MOS 器件中的电阻分量 ----------
function Zig({ x, y1, y2 }) {
  const n = 6, d = (y2 - y1) / n; let p = `M${x},${y1}`;
  for (let i = 0; i < n; i++) p += ` L${x + (i % 2 ? -5 : 5)},${y1 + d * (i + .5)}`;
  return <path d={p + ` L${x},${y2}`} fill="none" stroke={MAT.ink} strokeWidth="1.3" />;
}
export function ResistanceFig() {
  return <div style={frame}><Svg h={300} title="MOS 晶体管中的电阻分量与接触电阻">
    <Rc x={20} y={200} w={640} h={90} f={MAT.si} />
    <path d="M60,200 L60,232 Q60,262 120,262 L230,262 L250,200 Z" fill="#a9a9a9" stroke="#666" />
    <path d="M620,200 L620,232 Q620,262 560,262 L450,262 L430,200 Z" fill="#a9a9a9" stroke="#666" />
    <T x={120} y={252} s={11}>源/漏（Ext）</T>
    {/* 外延抬升源漏 + 硅化物 */}
    <Rc x={60} y={176} w={190} h={24} f="#c9c9c9" /><T x={92} y={192} s={11}>Epi</T>
    <Rc x={60} y={164} w={190} h={12} f={MAT.sil} /><T x={200} y={174} s={10} c="#fff">硅化物</T>
    <Rc x={430} y={176} w={190} h={24} f="#c9c9c9" /><Rc x={430} y={164} w={190} h={12} f={MAT.sil} />
    {/* 栅 */}
    <path d="M262,200 L262,90 Q262,60 290,60 L390,60 Q418,60 418,90 L418,200 Z" fill={MAT.sin} stroke="#666" />
    <Rc x={290} y={70} w={100} h={130} f={MAT.poly} /><T x={340} y={140} c="#fff">栅</T>
    {/* M1 与接触 */}
    <Rc x={110} y={70} w={40} h={94} f={MAT.w} /><T x={130} y={64} s={11}>M1</T>
    <Rc x={520} y={70} w={40} h={94} f={MAT.w} />
    <ellipse cx={130} cy={168} rx={52} ry={18} fill="none" stroke={MAT.red} strokeWidth="2" />
    <T x={156} y={128} a="start" s={11} c={MAT.red}>R_C-Sil-M1</T><T x={186} y={156} a="start" s={11} c={MAT.red}>R_C-Epi-Sil</T>
    <Zig x={130} y1={20} y2={66} /><T x={150} y={40} a="start" s={11}>R_Wire</T>
    <Zig x={540} y1={20} y2={66} /><T x={560} y={40} a="start" s={11}>R_Wire</T>
    <Zig x={340} y1={10} y2={58} /><T x={360} y={30} a="start" s={11}>R_Wire</T>
    {/* 器件内电阻链 */}
    <path d="M130,182 L130,212 L180,232 L240,232 L262,214 L418,214" fill="none" stroke={MAT.ink} strokeWidth="1.3" strokeDasharray="4 3" />
    <T x={150} y={222} s={11}>R_Epi</T><T x={200} y={280} s={11}>R_SD</T><T x={250} y={248} s={11}>R_ext</T><T x={340} y={230} s={11}>R_chan</T>
  </Svg>
    <p style={{ fontSize: 13, margin: "4px 0 0" }}>红圈：前道晶体管与后道互连的交界——硅化物/硅接触 <M>{R`R_{\rm C\text{-}Epi\text{-}Sil}`}</M> 与硅化物/M1 接触 <M>{R`R_{\rm C\text{-}Sil\text{-}M1}`}</M>；前者通常占主导。</p></div>;
}

// ---------- 图 11.26 交互：能带图随掺杂变化 ----------
export function BandFig() {
  const [lg, setLg] = useState(19.7), [phi, setPhi] = useState(0.6);
  const N = Math.pow(10, lg), xd = depletionNm(phi, N);
  const X0 = 140, sc = 9, Ef = 200, top = Ef - phi * 160;                 // 30 nm 视窗，160 px/V
  const pts = []; for (let i = 0; i <= 120; i++) { const x = i / 120 * 55; const e = x < xd ? phi * (1 - x / xd) ** 2 : 0; pts.push(`${X0 + x * sc},${Ef - 10 - e * 160}`); }
  const thick = xd < 6, rT = rhoTunnel(phi, N), rTh = rhoThermionic(phi);
  return <div style={frame}>
    <Range label={<>半导体掺杂 <M>{R`N_D=`}</M> {N.toExponential(1)} cm⁻³</>} value={lg} set={setLg} min={16} max={20.7} step={0.05} />
    <Range label={<>势垒高度 <M>{R`\phi_B=`}</M> {phi.toFixed(2)} V</>} value={phi} set={setPhi} min={0.2} max={0.9} step={0.01} />
    <Svg h={250} title="金属–半导体接触的能带图">
      <Rc x={20} y={30} w={120} h={200} f="#e2d6a8" s="none" /><T x={80} y={50}>金属</T>
      <line x1={20} x2={140} y1={Ef} y2={Ef} stroke={MAT.ink} strokeWidth="2" />
      <line x1={140} x2={660} y1={Ef} y2={Ef} stroke={MAT.blue} strokeDasharray="5 4" /><T x={650} y={Ef - 6} c={MAT.blue}>E_F</T>
      <polyline points={pts.join(" ")} fill="none" stroke={MAT.ink} strokeWidth="2.2" /><T x={600} y={Ef - 16} s={12}>E_c</T>
      <line x1={140} y1={Ef} x2={140} y2={top - 10} stroke={MAT.ink} />
      <Ar x1={128} y1={Ef} x2={128} y2={top - 8} /><T x={112} y={(Ef + top) / 2} a="end">qφ_B</T>
      {Math.min(xd, 55) > 0 && <><line x1={X0} x2={X0 + Math.min(xd, 55) * sc} y1={232} y2={232} stroke={MAT.red} strokeWidth="2" />
        <T x={X0 + Math.min(xd, 55) * sc / 2} y={246} c={MAT.red}>耗尽区 x_D = {xd < 100 ? xd.toFixed(1) : ">55"} nm</T></>}
      {thick ? <Ar x1={X0 + xd * sc + 30} y1={Ef - 18} x2={X0 - 8} y2={Ef - 18} red /> :
        <path d={`M${X0 + 200},${Ef - 14} C${X0 + 120},${top - 70} ${X0 + 30},${top - 60} ${X0 - 6},${top - 30}`} fill="none" stroke={MAT.red} strokeWidth="1.8" markerEnd="url(#arr11br)" />}
      <T x={400} y={60} a="start" c={MAT.red}>{thick ? "隧穿：电子直接穿过薄势垒（欧姆）" : "热电子发射：高能电子翻越势垒（整流）"}</T>
      <T x={400} y={80} a="start" s={12}>{"0"}–55 nm 视窗；横轴按比例</T>
    </Svg>
    <p style={{ fontSize: 13, margin: 0 }}>按式 (11.12) 计算耗尽区宽度；
      <M>{R`\rho_c^{\rm tunnel}\approx`}</M> {rT > 1 ? "远大于 1" : rT.toExponential(1)} Ω cm²（式 11.15，<M>{R`m^*=0.26m_0`}</M>），热电子发射 <M>{R`\rho_c=kT/qJ_0\approx`}</M> {rTh.toExponential(1)} Ω cm²。<M>{R`N_D`}</M> 越过约 <M>{R`10^{19}\ \mathrm{cm^{-3}}`}</M> 后势垒薄到几 nm，隧穿接管导电。</p>
  </div>;
}

// ---------- 图 11.29 TiSi₂ 自对准硅化物工艺流程 ----------
function Nmos({ x, y, stage }) {
  // stage 0: 沉积 Ti；1: 退火后（TiSi₂ + TiN）；2: 选择性去除后
  const g = <g>
    <Rc x={x} y={y + 50} w={260} h={60} f={MAT.si} />
    <Rc x={x} y={y + 50} w={22} h={30} f={MAT.sio2} /><Rc x={x + 238} y={y + 50} w={22} h={30} f={MAT.sio2} />
    <Rc x={x + 22} y={y + 50} w={84} h={18} f="#aaa" s="none" /><Rc x={x + 154} y={y + 50} w={84} h={18} f="#aaa" s="none" />
    <path d={`M${x + 106},${y + 50} L${x + 106},${y + 24} Q${x + 106},${y + 14} ${x + 116},${y + 14} L${x + 144},${y + 14} Q${x + 154},${y + 14} ${x + 154},${y + 24} L${x + 154},${y + 50} Z`} fill={MAT.sio2} stroke="#666" />
    <Rc x={x + 114} y={y + 18} w={32} h={32} f={MAT.poly} />
    <T x={x + 60} y={y + 64} s={11}>N⁺</T><T x={x + 196} y={y + 64} s={11}>N⁺</T><T x={x + 130} y={y + 100} s={11}>Si 衬底</T></g>;
  const surf = `M${x},${y + 50} L${x + 106},${y + 50} L${x + 106},${y + 24} Q${x + 106},${y + 14} ${x + 116},${y + 14} L${x + 144},${y + 14} Q${x + 154},${y + 14} ${x + 154},${y + 24} L${x + 154},${y + 50} L${x + 260},${y + 50}`;
  return <g>{g}
    {stage === 0 && <path d={surf} transform="translate(0,-4)" fill="none" stroke={MAT.ti} strokeWidth="8" />}
    {stage === 1 && <><path d={surf} transform="translate(0,-6)" fill="none" stroke={MAT.tin} strokeWidth="5" />
      <Rc x={x + 22} y={y + 44} w={84} h={10} f={MAT.sil} s="none" /><Rc x={x + 154} y={y + 44} w={84} h={10} f={MAT.sil} s="none" /><Rc x={x + 114} y={y + 12} w={32} h={10} f={MAT.sil} s="none" /></>}
    {stage === 2 && <><Rc x={x + 22} y={y + 46} w={84} h={8} f={MAT.sil} s="none" /><Rc x={x + 154} y={y + 46} w={84} h={8} f={MAT.sil} s="none" /><Rc x={x + 114} y={y + 14} w={32} h={8} f={MAT.sil} s="none" /></>}
  </g>;
}
export function SalicideFlowFig() {
  return <div style={frame}><Svg h={330} title="TiSi₂ 自对准硅化物工艺流程">
    <Legend items={[[MAT.ti, "Ti"], [MAT.sil, "TiSi₂"], [MAT.tin, "TiN"], [MAT.sio2, "SiO₂"], [MAT.poly, "多晶硅"]]} />
    <T x={150} y={42} b>① 去除自然氧化层，溅射 Ti（50–100 nm）</T><Nmos x={20} y={44} stage={0} />
    <Ar x1={150} y1={162} x2={150} y2={190} />
    <T x={150} y={206} b>② N₂ 中约 600 °C 快速退火</T><Nmos x={20} y={208} stage={1} />
    <Ar x1={300} y1={270} x2={380} y2={220} />
    <T x={530} y={120} b>③ 选择性腐蚀去除 TiN 与未反应 Ti</T><T x={530} y={138} s={11}>NH₄OH:H₂O₂:H₂O (1:1:5)；再于 ~800 °C 退火 C49→C54</T><Nmos x={400} y={140} stage={2} />
    <T x={530} y={290} s={11.5}>硅化物只出现在有硅源的地方（源漏、栅顶）：</T><T x={530} y={306} s={11.5}>无需光刻即"自对准"</T>
  </Svg></div>;
}

// ---------- 图 11.30 金属扩散 vs 硅扩散 ----------
export function DiffuserFig() {
  const P = ({ x, si }) => <g>
    <Rc x={x} y={150} w={280} h={70} f={MAT.si} /><Rc x={x} y={150} w={24} h={36} f={MAT.sio2} />
    <path d={`M${x + 170},150 L${x + 170},90 Q${x + 170},76 ${x + 186},76 L${x + 280},76 L${x + 280},150 Z`} fill={MAT.sio2} stroke="#666" />
    <Rc x={x + 190} y={84} w={90} h={66} f={MAT.poly} /><T x={x + 235} y={120} c="#fff" s={11}>多晶硅</T>
    <path d={`M${x},144 L${x + 170},144 L${x + 170},${si ? 140 : 140}`} fill="none" />
    {/* 金属层 */}
    <path d={`M${x},132 L${x + 160},132 L${x + 160},84 Q${x + 160},66 ${x + 186},66 L${x + 280},66`} fill="none" stroke={MAT.ti} strokeWidth="10" />
    {/* 硅化物 */}
    {si ? <path d={`M${x + 24},150 L${x + 24},138 L${x + 150},138 Q${x + 165},138 ${x + 166},120 L${x + 168},100 L${x + 176},104 L${x + 176},150 Z`} fill={MAT.sil} />
      : <Rc x={x + 24} y={146} w={146} h={14} f={MAT.sil} s="none" />}
    <Rc x={x + 190} y={si ? 72 : 84} w={90} h={si ? 12 : 10} f={MAT.sil} s="none" />
    <T x={x + 60} y={200} s={11}>N⁺</T><T x={x + 30} y={176} s={11}>STI</T>
    <T x={x + 140} y={40} b>{si ? "硅为扩散者：硅化物长在上表面" : "金属为扩散者：硅化物长在下表面"}</T>
    {si && <><Ar x1={x + 120} y1={100} x2={x + 162} y2={112} red /><T x={x + 92} y={96} c={MAT.red} s={11}>沿侧墙爬升→短路风险</T></>}
  </g>;
  return <div style={frame}><Svg h={230} title="硅化物形成：金属扩散与硅扩散"><P x={20} si={false} /><P x={370} si /></Svg></div>;
}

// ---------- 图 11.31 一维反应示意 ----------
export function Reaction1DFig() {
  const C = ({ x, n }) => <g>
    <Rc x={x} y={170} w={260} h={60} f="#fff" /><T x={x + 130} y={210}>Si 衬底</T>
    <Rc x={x} y={128} w={260} h={42} f={MAT.sil} /><T x={x + 230} y={154} c="#fff">TiSi₂</T>
    <Rc x={x} y={96} w={260} h={32} f={MAT.ti} /><T x={x + 230} y={116} c="#fff">Ti</T>
    <T x={x + 70} y={116} c="#fff" s={12}>2Si + Ti → TiSi₂</T>
    <Ar x1={x + 50} y1={176} x2={x + 50} y2={112} red /><T x={x + 36} y={188} c={MAT.red}>Si</T>
    {n && <><Rc x={x} y={60} w={260} h={36} f={MAT.tin} /><T x={x + 230} y={82} c="#fff">TiN</T><T x={x + 120} y={106} c="#fff" s={12}>N + Ti → TiN</T>
      <Ar x1={x + 60} y1={40} x2={x + 60} y2={104} red /><T x={x + 46} y={36} c={MAT.red}>N</T></>}
    <T x={x + 130} y={252} b>{n ? <>N₂ 气氛：两个反应界面同时推进</> : <>Ar 气氛（自对准硅化物）</>}</T>
  </g>;
  return <div style={frame}><Svg h={262} title="TiSi₂ 形成的一维图像"><C x={30} /><C x={380} n /></Svg></div>;
}

// ---------- 图 11.35 交互：三种填充模式 ----------
const WT = 80, DT = 200;
function gapPoly(tSide, b) {
  // tSide(yFrac) 侧壁厚度，b 底部厚度；返回空隙多边形（坐标以沟槽顶部中点为原点）
  const L = [], Rr = [], n = 40, yb = DT - b;
  for (let i = 0; i <= n; i++) {
    const y = yb * i / n, half = WT / 2 - tSide(y / DT);
    if (half <= 0) return { open: false, pts: null, y };
    L.push([-half, y]); Rr.push([half, y]);
  }
  return { open: true, pts: [...L, ...Rr.reverse()] };
}
const MODES = {
  sub: { name: "亚共形（顶部快）", side: (u, f) => u * (1.5 - 1.1 * f), bot: u => 0.4 * u, field: u => 1.5 * u },
  con: { name: "共形（处处等速）", side: u => u, bot: u => u, field: u => u },
  sup: { name: "超共形 / 超填充（底部快）", side: u => 0.3 * u, bot: u => 3.6 * u, field: u => 0.3 * u },
};
export function FillFig() {
  const [s, setS] = useState(0.55), [mode, setMode] = useState("sup");
  const uMax = 62, u = uMax * s;
  const cx = (k) => 120 + k * 220, y0 = 70;
  const panel = (k, m, label) => {
    const md2 = MODES[m]; let up = null;
    for (let uu = 0; uu <= u + 1e-9; uu += 0.25) { const gg = gapPoly(f => md2.side(uu, f), Math.min(md2.bot(uu), DT)); if (!gg.open && md2.bot(uu) < DT) { up = uu; break; } }
    const bb = Math.min(md2.bot(u), DT), ff = Math.min(md2.field(u), 36);
    const gg = gapPoly(f => md2.side(u, f), bb);
    const isSeam = m === "con";
    const fz = up != null && !isSeam ? gapPoly(f => md2.side(up - 0.25, f), Math.min(md2.bot(up - 0.25), DT)) : null;
    const X = cx(k), on = m === mode;
    const tr = p => p.map(([a, c]) => `${X + a},${y0 + c}`).join(" ");
    const seam = isSeam && !gg.open && bb < DT;     // 共形：处处同时闭合 → 缝
    return <g key={m} opacity={on ? 1 : 0.55}>
      <Rc x={X - 100} y={y0} w={100 - WT / 2} h={DT + 30} f={MAT.lowk} /><Rc x={X + WT / 2} y={y0} w={100 - WT / 2} h={DT + 30} f={MAT.lowk} />
      <Rc x={X - WT / 2} y={y0 + DT} w={WT} h={30} f={MAT.lowk} />
      {/* Cu：整槽 + 场区上方，再挖去空隙 */}
      <path d={`M${X - 100},${y0 - ff} L${X + 100},${y0 - ff} L${X + 100},${y0} L${X + WT / 2},${y0} L${X + WT / 2},${y0 + DT} L${X - WT / 2},${y0 + DT} L${X - WT / 2},${y0} L${X - 100},${y0} Z`} fill={MAT.cu} />
      {gg.open && bb < DT && <polygon points={tr(gg.pts)} fill="#fff" />}
      {gg.open && bb < DT && <rect x={X - (WT / 2 - md2.side(u, 0))} y={y0 - ff} width={Math.max(0, 2 * (WT / 2 - md2.side(u, 0)))} height={ff} fill="#fff" />}
      {fz && fz.open && <polygon points={tr(fz.pts)} fill="#fff" stroke={MAT.red} strokeWidth="1.5" />}
      {seam && <line x1={X} x2={X} y1={y0 - ff} y2={y0 + DT - bb} stroke={MAT.red} strokeWidth="2" strokeDasharray="4 3" />}
      <rect x={X - 100} y={y0 - 40} width={200} height={DT + 70} fill="none" stroke={on ? MAT.blue : "#ccc"} strokeWidth={on ? 2 : 1} rx="4" />
      <T x={X} y={y0 + DT + 50} b={on}>{label}</T>
      <T x={X} y={y0 + DT + 68} c={MAT.red} s={12}>{fz ? "顶部先封口 → 空洞（void）" : seam ? "两侧同时相接 → 缝（seam）" : bb >= DT ? "自下而上填满，无缺陷" : gg.open ? "填充中…" : ""}</T>
    </g>;
  };
  return <div style={frame}>
    <div>{Object.entries(MODES).map(([k, v]) => <button key={k} style={btn(k === mode)} onClick={() => setMode(k)}>{v.name}</button>)}</div>
    <Range label={`电镀进度：${Math.round(s * 100)}%`} value={s} set={setS} min={0} max={1} step={0.01} />
    <Svg h={384} title="沟槽电镀的三种填充模式">{panel(0, "sub", "亚共形")}{panel(1, "con", "共形")}{panel(2, "sup", "超共形（超填充）")}
      <Legend x={250} y={378} items={[[MAT.cu, "电镀 Cu"], [MAT.lowk, "介质"]]} /></Svg>
    <p style={{ fontSize: 13, margin: 0 }}>示意模型：沟槽深宽比 2.5，三种模式只差在"侧壁 / 底部 / 场区"三处的局部沉积速率之比（亚共形 侧壁顶部 1.5：底部 0.4；共形 1：1；超共形 侧壁 0.3：底部 3.6）。拖动进度条可见：只要顶部比底部快，空洞就无可避免；即使处处等速，两侧壁也会在中线相遇留下一条缝。</p>
  </div>;
}

// ---------- 图 11.37 作用在晶格离子上的两种力 ----------
export function EMForceFig() {
  return <div style={frame}><Svg h={170} title="导线中晶格 Cu 离子受到的电场力与电子风力">
    <Rc x={150} y={30} w={380} h={110} f="#d9d9d9" s="#333" sw={1.5} />
    <T x={120} y={80} s={15}>阳极</T><T x={120} y={100} s={18}>+</T><T x={565} y={80} s={15}>阴极</T><T x={565} y={100} s={18}>−</T>
    <circle cx={330} cy={88} r={24} fill="#fff" stroke="#333" /><T x={330} y={93}>Cu⁺</T>
    {[[400, 100], [370, 124]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={11} fill="#fff" stroke="#333" /><T x={x} y={y + 4}>−</T><Ar x1={x - 13} y1={y - 3} x2={352} y2={y - 8 - i * 8} /></g>)}
    <line x1={260} x2={200} y1={50} y2={50} stroke="#888" strokeWidth="8" markerEnd="url(#arr11b)" /><T x={230} y={42}>F_wind（电子风）</T>
    <line x1={420} x2={470} y1={50} y2={50} stroke="#222" strokeWidth="5" markerEnd="url(#arr11b)" /><T x={450} y={42}>F_field</T>
    <Ar x1={440} y1={128} x2={500} y2={128} /><T x={470} y={122}>ℰ</T>
    <T x={340} y={162} s={12}>电子从阴极流向阳极，把动量交给离子，推动它向阳极漂移；直接电场力被电子屏蔽，可忽略。</T>
  </Svg></div>;
}

// ---------- 图 11.38 多晶金属薄膜中的三条扩散路径 ----------
export function PathsFig() {
  const grains = ["M20,60 L120,50 L140,110 L60,150 L20,140Z", "M120,50 L230,46 L240,100 L140,110Z", "M230,46 L330,52 L320,120 L240,100Z", "M60,150 L140,110 L240,100 L250,170 L80,180Z", "M240,100 L320,120 L330,175 L250,170Z"];
  return <div style={frame}><Svg h={210} title="多晶金属薄膜中的体扩散、晶界扩散与表面扩散，以及激活能表">
    <rect x={20} y={46} width={310} height={134} fill="#cfcfcf" stroke="#444" />
    {grains.map((d, i) => <path key={i} d={d} fill={["#c8c8c8", "#d4d4d4", "#c1c1c1", "#d0d0d0", "#c6c6c6"][i]} stroke="#555" strokeWidth="1.6" />)}
    <Ar x1={160} y1={26} x2={80} y2={26} red /><T x={200} y={30} c={MAT.red}>表面</T>
    <Ar x1={210} y1={140} x2={160} y2={140} /><T x={232} y={144}>体内</T>
    <Ar x1={128} y1={82} x2={94} y2={128} red /><T x={60} y={78} c={MAT.red}>晶界</T>
    <g transform="translate(370,40)">
      {[["扩散路径", "Al", "Cu"], ["体扩散", "1.2", "2.3"], ["晶界扩散", "0.7", "1.2"], ["表面扩散", "0.8", "0.8"]].map((r, i) =>
        <g key={i} transform={`translate(0,${i * 30})`}>{r.map((c, j) => <g key={j}><rect x={[0, 120, 200][j]} y={0} width={[120, 80, 80][j]} height={30} fill={i ? "#fff" : "#eee"} stroke="#999" /><T x={[60, 160, 240][j]} y={20} b={!i}>{c}</T></g>)}</g>)}
      <T x={140} y={140} s={12}>激活能 E_A (eV)，数据取自原书引文 [11.57]</T>
    </g>
  </Svg></div>;
}

// ---------- 图 11.41 交互：缩放时阻挡层不缩 ----------
export function ScalingFig() {
  const [w, setW] = useState(40), [tb, setTb] = useState(3);
  const S = 4, ar = 2, H = ar * w, x0 = 340 - w * S / 2, y0 = 30;
  const core = Math.max(0, (w - 2 * tb)) * Math.max(0, (H - tb)), frac = 1 - core / (w * H);
  return <div style={frame}>
    <Range label={`线宽 w = ${w} nm（高 = 2w）`} value={w} set={setW} min={8} max={60} step={1} />
    <Range label={`阻挡层 + 衬垫总厚 = ${tb} nm`} value={tb} set={setTb} min={0} max={5} step={0.5} />
    <Svg h={Math.max(120, H * S * 0.5 + 70)} title="Cu 互连缩放：阻挡层与衬垫厚度不随线宽缩小">
      <g transform="scale(1,0.5)">
        <rect x={40} y={y0 * 2} width={600} height={H * S + 20} fill={MAT.lowk} />
        <rect x={x0} y={y0 * 2} width={w * S} height={H * S} fill={MAT.tin} />
        <rect x={x0 + tb * S} y={y0 * 2} width={Math.max(0, (w - 2 * tb) * S)} height={Math.max(0, (H - tb) * S)} fill={MAT.cu} />
      </g>
      <T x={120} y={y0 + 16}>低 k 介质</T>
      <T x={340} y={y0 + H * S * 0.25 + 4} c="#fff" b>Cu</T>
      <T x={560} y={y0 + 16} c={MAT.tin} b>阻挡层占截面 {(frac * 100).toFixed(0)}%</T>
    </Svg>
    <p style={{ fontSize: 13, margin: 0 }}>截面按比例绘制（纵向压缩一半）。阻挡层（防 Cu 扩散进介质和硅）与衬垫（抑制表面扩散）合计 2–4 nm，不随线宽缩小；线宽降到 10–20 nm 时，它们吃掉的截面就不可忽视了——这正是 Ru、Co 等"无阻挡层金属"受青睐的原因。定量比较见下方的电阻率交互图。</p>
  </div>;
}

// ---------- 图 11.42 表面散射与晶界散射 ----------
export function ScatterFig() {
  return <div style={frame}><Svg h={210} title="细金属线中电子的表面散射（镜面 p=1 / 漫散 p=0）与晶界散射（透射 R=0 / 反射 R=1）">
    <T x={170} y={20} b>表面散射</T>
    <rect x={20} y={130} width={300} height={22} fill={MAT.tin} /><T x={170} y={146} c="#fff" s={11}>衬垫 / 介质</T>
    <Ar x1={50} y1={60} x2={95} y2={128} /><Ar x1={95} y1={128} x2={140} y2={60} /><T x={95} y={50}>镜面 (p = 1)</T>
    <Ar x1={190} y1={60} x2={235} y2={128} />{[[-40, -50], [-10, -60], [30, -45], [50, -20]].map(([dx, dy], i) => <Ar key={i} x1={235} y1={128} x2={235 + dx} y2={128 + dy} dash="3 2" />)}<T x={250} y={50}>漫散 (p = 0)</T>
    <T x={190} y={180} s={12}>镜面反射保留沿线方向的动量，不增加电阻</T>
    <T x={510} y={20} b>晶界散射</T>
    <line x1={510} x2={510} y1={40} y2={160} stroke="#555" strokeWidth="3" strokeDasharray="6 3" /><T x={510} y={176} s={12}>晶界</T>
    <Ar x1={400} y1={70} x2={500} y2={70} /><Ar x1={512} y1={70} x2={610} y2={70} /><T x={560} y={60}>透射 (R = 0)</T>
    <Ar x1={400} y1={130} x2={500} y2={130} /><Ar x1={500} y1={136} x2={410} y2={146} red /><T x={455} y={118}>反射 (R = 1)</T>
  </Svg></div>;
}

// ---------- 图 11.45 GaAs MESFET 与 pHEMT ----------
export function CompoundFig() {
  const Dev = ({ x, hemt }) => <g>
    <Rc x={x} y={150} w={290} h={50} f={MAT.gaas} /><T x={x + 145} y={182}>半绝缘 GaAs</T>
    {hemt ? <><Rc x={x} y={132} w={290} h={18} f="#d8c9a6" /><T x={x + 145} y={145} s={11}>GaAs 缓冲层（δ 掺杂）</T>
      <Rc x={x} y={114} w={290} h={18} f="#e8a37a" /><T x={x + 145} y={127} s={11}>InGaAs 沟道（2DEG）</T>
      <line x1={x} x2={x + 290} y1={115} y2={115} stroke={MAT.red} strokeWidth="2" strokeDasharray="5 3" />
      <Rc x={x} y={98} w={290} h={16} f="#f2deb0" /><T x={x + 145} y={110} s={11}>AlGaAs 隔离层</T>
      <Rc x={x} y={78} w={110} h={20} f="#b7a171" /><Rc x={x + 180} y={78} w={110} h={20} f="#b7a171" /><T x={x + 55} y={92} s={11}>N⁺ GaAs</T><T x={x + 235} y={92} s={11}>N⁺ GaAs</T></>
      : <><Rc x={x} y={128} w={290} h={22} f="#d8c9a6" /><T x={x + 145} y={143} s={11}>N 缓冲层</T>
        <Rc x={x} y={100} w={290} h={28} f="#e8c27a" /><T x={x + 145} y={120} s={11}>N 沟道</T>
        <path d={`M${x},100 L${x + 90},100 Q${x + 90},130 ${x + 60},130 L${x},130Z`} fill="#b7a171" /><path d={`M${x + 290},100 L${x + 200},100 Q${x + 200},130 ${x + 230},130 L${x + 290},130Z`} fill="#b7a171" />
        <T x={x + 30} y={120} s={11}>N⁺</T><T x={x + 260} y={120} s={11}>N⁺</T></>}
    <Rc x={x + 10} y={hemt ? 60 : 82} w={70} h={18} f={MAT.w} /><T x={x + 45} y={hemt ? 54 : 76} s={11}>源（欧姆）</T>
    <Rc x={x + 210} y={hemt ? 60 : 82} w={70} h={18} f={MAT.w} /><T x={x + 245} y={hemt ? 54 : 76} s={11}>漏（欧姆）</T>
    <Rc x={x + 128} y={hemt ? 80 : 86} w={34} h={hemt ? 18 : 14} f="#7a7a8c" /><T x={x + 145} y={hemt ? 74 : 80} s={11}>栅（肖特基）</T>
    <T x={x + 145} y={24} b>{hemt ? "GaAs pHEMT" : "GaAs MESFET"}</T>
  </g>;
  return <div style={frame}><Svg h={210} title="GaAs MESFET 与 pHEMT 器件结构"><Dev x={20} /><Dev x={370} hemt /></Svg></div>;
}

// ---------- 图 11.47 / 11.48 剥离工艺 ----------
function Resist({ x, y, kind }) {
  // kind: "vert" 垂直侧壁, "neg" 倒梯形（负胶）, "bi" 双层（下层钻蚀）
  const L = [], Rr = [];
  if (kind === "vert") { L.push(<rect key="l" x={x} y={y} width={90} height={50} fill={MAT.resist} />); Rr.push(<rect key="r" x={x + 150} y={y} width={90} height={50} fill={MAT.resist} />); }
  if (kind === "neg") { L.push(<path key="l" d={`M${x},${y + 50} L${x + 76},${y + 50} L${x + 92},${y} L${x},${y}Z`} fill={MAT.resist} />); Rr.push(<path key="r" d={`M${x + 240},${y + 50} L${x + 164},${y + 50} L${x + 148},${y} L${x + 240},${y}Z`} fill={MAT.resist} />); }
  if (kind === "bi") { L.push(<g key="l"><rect x={x} y={y + 22} width={74} height={28} fill="#c9b8ec" /><rect x={x} y={y} width={92} height={22} fill={MAT.resist} /></g>); Rr.push(<g key="r"><rect x={x + 166} y={y + 22} width={74} height={28} fill="#c9b8ec" /><rect x={x + 148} y={y} width={92} height={22} fill={MAT.resist} /></g>); }
  return <g>{L}{Rr}</g>;
}
export function LiftoffFig() {
  const x = 210, y = 80;
  return <div style={frame}><Svg h={200} title="剥离工艺：垂直侧壁时金属连成一片，无法干净剥离">
    <rect x={x - 20} y={y + 50} width={280} height={40} fill={MAT.gaas} />
    <Resist x={x} y={y} kind="vert" />
    <path d={`M${x},${y - 8} L${x + 90},${y - 8} L${x + 90},${y} L${x + 96},${y} L${x + 96},${y + 44} L${x + 144},${y + 44} L${x + 144},${y} L${x + 150},${y} L${x + 150},${y - 8} L${x + 240},${y - 8} L${x + 240},${y} L${x + 156},${y} L${x + 156},${y + 50} L${x + 84},${y + 50} L${x + 84},${y} L${x},${y}Z`} fill={MAT.w} />
    {[-30, -15, 0, 15, 30].map(a => <line key={a} x1={x + 120 + a * 2} y1={14} x2={x + 120 + a * 3.2} y2={y - 14} stroke="#999" strokeDasharray="3 3" markerEnd="url(#arr11b)" />)}
    <T x={x + 120} y={12}>(cos θ)ⁿ 角分布的金属原子流</T>
    <T x={x + 120} y={y + 112} s={12} c={MAT.red}>侧壁也镀上金属 → 胶上金属与槽内金属连成一体，溶胶后撕扯或残留</T>
  </Svg></div>;
}
export function LiftoffFixFig() {
  const P = ({ x, kind, title }) => {
    const y = 80, ov = kind === "neg" ? 16 : 18;
    return <g>
      <rect x={x - 10} y={y + 50} width={260} height={36} fill={MAT.gaas} />
      <Resist x={x} y={y} kind={kind} />
      <rect x={x} y={y - 8} width={92} height={8} fill={MAT.w} /><rect x={x + 148} y={y - 8} width={92} height={8} fill={MAT.w} />
      <rect x={x + 92 + ov - 16} y={y + 42} width={56 - 2 * (ov - 16)} height={8} fill={MAT.w} />
      <T x={x + 120} y={y - 30} b>{title}</T>
      <T x={x + 120} y={y + 104} s={12} c={MAT.green}>胶的上沿遮住侧壁 → 金属断开，溶胶后干净剥离</T>
    </g>;
  };
  return <div style={frame}><Svg h={200} title="两种可靠剥离方案"><P x={40} kind="neg" title="负胶：上部曝光多，显影成倒梯形" /><P x={390} kind="bi" title="双层胶：下层过显影形成钻蚀" /></Svg></div>;
}
