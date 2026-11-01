// 第 11 章（上）自绘示意图（SVG）。材料配色全章统一：Si 灰、SiO2 浅蓝、Si3N4 绿、多晶硅 红棕、
// 金属 Al 金 / Cu 橙 / W 古铜、TiN 与硅化物 褐紫、光刻胶 紫、SOG 米黄、低 K 青灰点纹。
import { useState } from "react";
import { assetUrl } from "@kit";

export const COL = {
  si: "#d3d3d3", ox: "#cfe4f4", oxDep: "#e2eff9", nit: "#9fd3a0", poly: "#a0522d", al: "#d9b13b", cu: "#d9823a", w: "#a8742a",
  tin: "#8a7350", tisi: "#7b5a8c", ti: "#6f6f78", nplus: "#a3a3a3", resist: "#bba6e0", sog: "#f2e3b3", lowk: "#bcdbe6", hm: "#7d8b99",
  ink: "#222", red: "#c0392b", air: "#ffffff", carbon: "#8f8f8f",
};

// ---------- 小工具 ----------
export function Svg({ w = 560, h = 260, title, children, max = 640 }) {
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} style={{ width: "100%", maxWidth: max, display: "block", margin: "0 auto", fontFamily: "inherit" }}>
    <title>{title}</title>{children}</svg>;
}
// 化学式：下划线后的数字/字母作下标，如 chem("SiO_2")、chem("TiSi_2")、chem("Si_3N_4")
export function chem(s) {
  const parts = String(s).split(/_(\{[^}]*\}|[0-9.]+|[a-z])/);
  return parts.map((p, i) => i % 2 ? <tspan key={i} baselineShift="sub" fontSize="0.72em">{p.replace(/[{}]/g, "")}</tspan> : p);
}
export const T = ({ x, y, a = "middle", s = 13, c = COL.ink, w = 400, children }) =>
  <text x={x} y={y} textAnchor={a} fontSize={s} fill={c} fontWeight={w}>{typeof children === "string" ? chem(children) : children}</text>;
const Arrow = ({ x1, y1, x2, y2, c = COL.ink, w = 1.4, head = 7 }) => {
  const a = Math.atan2(y2 - y1, x2 - x1), h1 = [x2 - head * Math.cos(a - 0.4), y2 - head * Math.sin(a - 0.4)], h2 = [x2 - head * Math.cos(a + 0.4), y2 - head * Math.sin(a + 0.4)];
  return <g stroke={c} strokeWidth={w} fill={c}><line x1={x1} y1={y1} x2={x2} y2={y2} /><polygon points={`${x2},${y2} ${h1} ${h2}`} /></g>;
};
const DArrow = ({ x1, y1, x2, y2, c = COL.ink }) => <g><Arrow x1={(x1 + x2) / 2} y1={(y1 + y2) / 2} x2={x1} y2={y1} c={c} w={1} head={6} /><Arrow x1={(x1 + x2) / 2} y1={(y1 + y2) / 2} x2={x2} y2={y2} c={c} w={1} head={6} /></g>;
const Defs = () => <defs>
  <pattern id="c11-por" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill={COL.lowk} /><circle cx="3" cy="3" r="1.8" fill="#fff" /><circle cx="8" cy="7.5" r="1.3" fill="#fff" /></pattern>
  <pattern id="c11-porfill" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill={COL.lowk} /><circle cx="3" cy="3" r="1.8" fill={COL.resist} /><circle cx="8" cy="7.5" r="1.3" fill={COL.resist} /></pattern>
  <pattern id="c11-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill={COL.oxDep} /><line x1="0" y1="0" x2="0" y2="6" stroke="#9fbfd8" strokeWidth="1" /></pattern>
</defs>;
const stroke = { stroke: "#555", strokeWidth: 0.8 };

// ================= 图 11.3：RC 分析用的简单互连结构 =================
// 斜二测投影：(x, y, z) → 屏幕；z 为沿导线长度方向（向纸内）
const P = (x, y, z) => [x + 0.55 * z, y - 0.32 * z];
const pts = a => a.map(p => P(...p).join(",")).join(" ");
function Block({ x0, x1, y0, y1, z0, z1, fill, dash, op = 1 }) {   // y 向下为正（屏幕坐标），y0 为顶面
  const s = { stroke: dash ? "#5b8db8" : "#333", strokeWidth: 1, strokeDasharray: dash ? "3 3" : "", fill: dash ? "none" : fill, opacity: op };
  return <g {...s}>
    <polygon points={pts([[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0]])} />
    <polygon points={pts([[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]])} />
    <polygon points={pts([[x1, y0, z0], [x1, y0, z1], [x1, y1, z1], [x1, y1, z0]])} />
  </g>;
}
export function Fig113() {
  const L = 300;
  const [a1, b1] = P(330, 182, 40), [a2, b2] = P(330, 182, 40 + 0.9 * L);
  return <Svg w={640} h={330} title="两条平行导线位于介质层上的简化互连结构">
    <Block x0={40} x1={420} y0={225} y1={300} z0={0} z1={L} fill={COL.si} />
    <Block x0={40} x1={420} y0={185} y1={225} z0={0} z1={L} fill={COL.ox} />
    <Block x0={120} x1={180} y0={130} y1={185} z0={40} z1={L - 20} fill={COL.cu} />
    <Block x0={270} x1={330} y0={130} y1={185} z0={40} z1={L - 20} fill={COL.cu} />
    <Block x0={40} x1={420} y0={70} y1={185} z0={0} z1={L} dash />
    <T x={140} y={285}>Silicon</T><T x={430} y={170} a="start" c="#3a6d96">Dielectric</T>
    {/* H、W、L_S、x_D 标注 */}
    <DArrow x1={262} y1={132} x2={262} y2={183} /><T x={250} y={163} a="end"><tspan fontStyle="italic">H</tspan></T>
    <DArrow x1={270} y1={196} x2={330} y2={196} /><T x={300} y={212}><tspan fontStyle="italic">W</tspan></T>
    <DArrow x1={180} y1={196} x2={270} y2={196} /><T x={225} y={212}><tspan fontStyle="italic">L</tspan><tspan baselineShift="sub" fontSize="9">S</tspan></T>
    <DArrow x1={30} y1={186} x2={30} y2={224} /><T x={24} y={210} a="end"><tspan fontStyle="italic">x</tspan><tspan baselineShift="sub" fontSize="9">D</tspan></T>
    <line x1={a1 + 6} y1={b1} x2={a2 + 6} y2={b2} stroke={COL.ink} /><Arrow x1={(a1 + a2) / 2 + 6} y1={(b1 + b2) / 2} x2={a2 + 6} y2={b2} w={1} /><Arrow x1={(a1 + a2) / 2 + 6} y1={(b1 + b2) / 2} x2={a1 + 6} y2={b1} w={1} />
    <T x={(a1 + a2) / 2 + 22} y={(b1 + b2) / 2 + 4} a="start"><tspan fontStyle="italic">L</tspan></T>
    {/* C_S：导线底—衬底；C_I：两线之间；R：沿导线 */}
    <g stroke={COL.red} strokeWidth={1.6} fill="none">
      <line x1={150} y1={190} x2={150} y2={200} /><line x1={140} y1={200} x2={160} y2={200} /><line x1={140} y1={206} x2={160} y2={206} /><line x1={150} y1={206} x2={150} y2={222} />
      <line x1={180} y1={112} x2={215} y2={112} /><line x1={215} y1={102} x2={215} y2={122} /><line x1={221} y1={102} x2={221} y2={122} /><line x1={221} y1={112} x2={270} y2={112} />
      <polyline points="150,128 162,96 168,108 174,84 180,98 186,74 192,86" />
    </g>
    <T x={120} y={208} c={COL.red}><tspan fontStyle="italic">C</tspan><tspan baselineShift="sub" fontSize="9">S</tspan></T>
    <T x={218} y={95} c={COL.red}><tspan fontStyle="italic">C</tspan><tspan baselineShift="sub" fontSize="9">I</tspan></T>
    <T x={200} y={72} c={COL.red}><tspan fontStyle="italic">R</tspan></T>
    <T x={520} y={250} s={12} c="#555">虚线框：导线四周</T><T x={520} y={266} s={12} c="#555">都被介质包围</T>
  </Svg>;
}

// ================= 电路符号 =================
const Inv = ({ x, y, s = 1 }) => <g fill="#fff" stroke={COL.ink} strokeWidth={1.5}><polygon points={`${x},${y - 16 * s} ${x},${y + 16 * s} ${x + 30 * s},${y}`} /><circle cx={x + 34 * s} cy={y} r={4 * s} /></g>;
const Res = ({ x, y, w = 60 }) => { const n = 6, d = w / (n + 1); let p = `${x},${y} ${x + d / 2},${y}`; for (let i = 0; i < n; i++) p += ` ${x + d / 2 + d * (i + 0.5)},${y + (i % 2 ? 7 : -7)}`; p += ` ${x + w - d / 2},${y} ${x + w},${y}`; return <polyline points={p} fill="none" stroke={COL.ink} strokeWidth={1.5} />; };
const Cap = ({ x, y, h = 40 }) => <g stroke={COL.ink} strokeWidth={1.5}><line x1={x} y1={y} x2={x} y2={y + h / 2 - 3} /><line x1={x - 13} y1={y + h / 2 - 3} x2={x + 13} y2={y + h / 2 - 3} /><line x1={x - 13} y1={y + h / 2 + 3} x2={x + 13} y2={y + h / 2 + 3} /><line x1={x} y1={y + h / 2 + 3} x2={x} y2={y + h} /><Gnd x={x} y={y + h} /></g>;
const Gnd = ({ x, y }) => <g stroke={COL.ink} strokeWidth={1.5}><line x1={x - 10} y1={y} x2={x + 10} y2={y} /><line x1={x - 6} y1={y + 4} x2={x + 6} y2={y + 4} /><line x1={x - 2} y1={y + 8} x2={x + 2} y2={y + 8} /></g>;
const Node = ({ x, y }) => <circle cx={x} cy={y} r={4} fill="#fff" stroke={COL.ink} strokeWidth={1.5} />;
const Sub = ({ b, s }) => <><tspan fontStyle="italic">{b}</tspan><tspan baselineShift="sub" fontSize="9">{s}</tspan></>;

// ================= 图 11.4：极短导线的等效电路 =================
export function Fig114() {
  return <Svg w={620} h={170} title="驱动器加导线电容，等效为驱动器电阻对导线电容充电的 RC 电路">
    <line x1={20} y1={60} x2={50} y2={60} stroke={COL.ink} strokeWidth={1.5} /><Inv x={50} y={60} />
    <line x1={88} y1={60} x2={190} y2={60} stroke={COL.ink} strokeWidth={1.5} /><Node x={194} y={60} /><Cap x={140} y={60} h={56} />
    <T x={70} y={112}>驱动器</T><T x={205} y={100} a="start">导线电容</T>
    <Arrow x1={270} y1={70} x2={315} y2={70} c="#888" w={3} head={10} />
    <circle cx={370} cy={95} r={20} fill="#fff" stroke={COL.ink} strokeWidth={1.5} /><polyline points="360,102 370,102 370,88 380,88" fill="none" stroke={COL.ink} strokeWidth={1.5} />
    <line x1={370} y1={75} x2={370} y2={50} stroke={COL.ink} strokeWidth={1.5} /><line x1={370} y1={115} x2={370} y2={130} stroke={COL.ink} strokeWidth={1.5} /><Gnd x={370} y={130} />
    <line x1={370} y1={50} x2={410} y2={50} stroke={COL.ink} strokeWidth={1.5} /><Res x={410} y={50} w={70} /><line x1={480} y1={50} x2={575} y2={50} stroke={COL.ink} strokeWidth={1.5} /><Node x={579} y={50} />
    <Cap x={530} y={50} h={70} />
    <T x={445} y={30}><Sub b="R" s="Driver" /></T><T x={398} y={100} a="start"><Sub b="V" s="in" /></T><T x={548} y={92} a="start"><Sub b="C" s="Wire" /></T><T x={585} y={34}><Sub b="V" s="out" /></T>
  </Svg>;
}

// ================= 图 11.6：长线分段并插入中继器 =================
export function Fig116() {
  const seg = i => { const x = 40 + i * 190; return <g key={i}>
    {i === 0 ? <><Node x={20} y={60} /><line x1={24} y1={60} x2={x} y2={60} stroke={COL.ink} strokeWidth={1.5} /></> : null}
    <Inv x={x} y={60} /><Res x={x + 38} y={60} w={70} /><line x1={x + 108} y1={60} x2={x + 190} y2={60} stroke={COL.ink} strokeWidth={1.5} />
    <circle cx={x + 120} cy={60} r={2.5} fill={COL.ink} /><Cap x={x + 120} y={60} h={50} />
    <T x={x + 73} y={38}><Sub b="R" s="Wire" /><tspan> /3</tspan></T><T x={x + 120} y={138}><Sub b="C" s="Wire" /><tspan> /3</tspan></T>
    <T x={x + 14} y={98} s={12}>{i === 0 ? "驱动器" : "中继器"}</T>
  </g>; };
  return <Svg w={640} h={150} title="长导线分成三段，段间插入中继器（放大器）">
    {[0, 1, 2].map(seg)}
    <circle cx={590} cy={60} r={2.5} fill={COL.ink} /><Cap x={590} y={60} h={50} /><Node x={622} y={60} />
    <T x={608} y={95} a="start"><Sub b="C" s="L" /></T><T x={622} y={40}><Sub b="V" s="out" /></T><T x={20} y={40}><Sub b="V" s="in" /></T>
  </Svg>;
}

// ================= 早期 Al 接触剖面（图 11.7–11.10）=================
// variant: "basic" | "spike" | "barrier" | "two"
export function ContactSection({ variant = "basic" }) {
  const two = variant === "two", barrier = variant === "barrier" || two, dy = two ? 70 : 0;
  const alBottom = barrier ? 130 : 140;
  return <Svg w={520} h={250 + dy} title="早期 Al 接触结构剖面">
    <Defs />
    <g transform={`translate(0, ${dy})`}>
      <rect x={20} y={140} width={480} height={100} fill={COL.si} {...stroke} />
      <path d="M150,140 L370,140 Q372,180 338,180 L182,180 Q148,180 150,140 Z" fill={COL.nplus} {...stroke} />
      <rect x={20} y={112} width={142} height={48} rx={22} fill={COL.ox} {...stroke} />
      <rect x={358} y={112} width={142} height={48} rx={22} fill={COL.ox} {...stroke} />
      <path d="M20,96 L188,96 Q205,96 205,112 L205,140 L156,140 L156,112 L20,112 Z" fill="url(#c11-hatch)" {...stroke} />
      <path d="M500,96 L332,96 Q315,96 315,112 L315,140 L364,140 L364,112 L500,112 Z" fill="url(#c11-hatch)" {...stroke} />
      {barrier && <><rect x={205} y={136} width={110} height={7} fill={COL.tisi} /><rect x={205} y={130} width={110} height={6} fill={COL.tin} /></>}
      <path d={`M178,96 L178,78 L224,78 L224,${alBottom - 18} L296,${alBottom - 18} L296,78 L500,78 L500,96 L315,96 L315,${alBottom} L205,${alBottom} L205,96 Z`} fill={COL.al} {...stroke} />
      {variant === "spike" && <g fill={COL.al} {...stroke}><polygon points="236,140 252,140 244,198" /><polygon points="280,140 292,140 287,168" /></g>}
      <T x={260} y={165}>N+</T><T x={260} y={225}>P</T>
      <T x={430} y={140} s={12}>热生长氧化层</T><T x={430} y={108} s={12}>淀积氧化层</T><T x={430} y={92} s={12} c="#5a4500">Al</T>
      {barrier && <><line x1={240} y1={147} x2={220} y2={205} stroke={COL.ink} /><T x={208} y={218} s={12}>TiSi_2</T><line x1={290} y1={133} x2={320} y2={205} stroke={COL.ink} /><T x={326} y={218} s={12}>TiN</T></>}
      {variant === "spike" && <><line x1={246} y1={192} x2={140} y2={215} stroke={COL.ink} /><T x={95} y={225} s={12}>Al 尖刺穿透结</T></>}
      {two && <>
        <path d={`M20,96 L20,70 L170,70 Q172,58 186,58 L232,58 Q238,58 238,72 L238,104 L282,104 L282,72 Q282,58 296,58 L316,58 Q320,40 336,40 L500,40 L500,78 L296,78 L296,${alBottom - 18} L224,${alBottom - 18} L224,78 L178,78 L178,96 Z`} fill="url(#c11-hatch)" {...stroke} />
        <path d="M330,40 L330,22 L500,22 L500,40 Z" fill={COL.al} {...stroke} />
        <rect x={430} y={40} width={34} height={38} fill={COL.al} {...stroke} />
        <T x={150} y={50} s={12}>金属间氧化层</T><T x={410} y={34} s={12} c="#5a4500">第二层 Al</T>
      </>}
    </g>
  </Svg>;
}

// 图 11.7：左为自绘剖面，右为 Fairchild 第一块平面 IC 的照片（原书图片）
export function Fig117() {
  return <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "center" }}>
    <div style={{ flex: "1 1 320px", maxWidth: 460 }}><ContactSection /></div>
    <img src={assetUrl("figures/fig-11.7.png")} alt="Fairchild 1959 年第一块集成电路照片" style={{ flex: "0 1 260px", maxWidth: 260 }} loading="lazy" />
  </div>;
}

// ================= 图 11.11：Al 直接填孔 vs. W 塞 + CMP =================
export function Fig1111() {
  const panel = (x, plug) => <g transform={`translate(${x},0)`}>
    <rect x={0} y={90} width={240} height={90} fill={COL.si} {...stroke} />
    <rect x={0} y={60} width={100} height={30} fill="url(#c11-hatch)" {...stroke} /><rect x={140} y={60} width={100} height={30} fill="url(#c11-hatch)" {...stroke} />
    {plug ? <><rect x={100} y={60} width={40} height={30} fill={COL.w} {...stroke} /><rect x={0} y={30} width={240} height={30} fill={COL.al} {...stroke} /></>
      : <path d="M0,60 L0,30 L92,30 Q104,30 106,44 L106,52 L134,52 L134,44 Q136,30 148,30 L240,30 L240,60 L140,60 L140,90 L100,90 L100,60 Z" fill={COL.al} {...stroke} />}
    <T x={40} y={80} s={12}>氧化层</T><T x={200} y={50} s={12} c="#5a4500">Al</T>
    {plug && <><line x1={128} y1={78} x2={170} y2={120} stroke={COL.ink} /><T x={190} y={134} s={12}>W 塞</T></>}
    <T x={120} y={202} s={12}>{plug ? "右：W 塞 + CMP，表面平坦" : "左：Al 兼作接触与上层导线，表面下凹"}</T>
  </g>;
  return <Svg w={560} h={215} title="Al 直接填孔与 W 塞两种接触的形貌对比"><Defs />{panel(10, false)}{panel(310, true)}</Svg>;
}

// ================= 图 11.12：光刻胶回刻平坦化 =================
export function Fig1112() {
  return <Svg w={460} h={230} title="光刻胶回刻平坦化示意"><Defs />
    <rect x={40} y={140} width={260} height={80} fill={COL.si} {...stroke} />
    <path d="M40,140 L40,96 L62,96 Q66,62 90,62 L148,62 Q160,62 160,84 L160,96 L172,96 L172,84 Q172,62 186,62 L250,62 Q272,62 276,96 L300,96 L300,140 Z" fill="url(#c11-hatch)" {...stroke} />
    <rect x={90} y={110} width={46} height={30} fill={COL.al} {...stroke} /><rect x={200} y={110} width={46} height={30} fill={COL.al} {...stroke} />
    <path d="M40,96 L62,96 Q66,62 90,62 L148,62 Q160,62 160,84 L160,96 L172,96 L172,84 Q172,62 186,62 L250,62 Q272,62 276,96 L300,96 L300,40 L40,40 Z" fill={COL.resist} opacity={0.8} {...stroke} />
    <line x1={34} y1={102} x2={306} y2={102} stroke={COL.red} strokeWidth={2} strokeDasharray="7 5" />
    <DArrow x1={318} y1={40} x2={318} y2={102} /><T x={328} y={68} a="start" s={12}>回刻到红线</T><T x={328} y={84} a="start" s={12}>（选择比 S = 1）</T>
    <T x={170} y={54} s={12}>光刻胶</T><T x={170} y={128} s={12}>氧化层</T>
  </Svg>;
}

// ================= 图 11.13：SOG 与"中毒通孔" =================
export function Fig1113() {
  const panel = (x, etch) => <g transform={`translate(${x},0)`}>
    <rect x={0} y={170} width={250} height={60} fill={COL.si} {...stroke} />
    <rect x={0} y={145} width={250} height={25} fill="url(#c11-hatch)" {...stroke} />
    <path d="M0,145 L0,120 L28,120 Q32,96 54,96 L100,96 Q116,96 118,120 L132,120 Q134,96 150,96 L230,96 L250,96 L250,145 Z" fill="url(#c11-hatch)" {...stroke} />
    <rect x={50} y={110} width={46} height={35} fill={COL.al} {...stroke} /><rect x={160} y={110} width={46} height={35} fill={COL.al} {...stroke} />
    {etch ? <path d="M0,120 L28,120 Q30,108 34,104 L0,104 Z M104,104 Q112,108 118,120 L132,120 Q136,108 144,104 Z M232,104 L250,104 L250,96 L240,96 Z" fill={COL.sog} {...stroke} />
      : <path d="M0,120 L28,120 Q32,96 54,96 L100,96 Q116,96 118,120 L132,120 Q134,96 150,96 L250,96 L250,80 L0,80 Z" fill={COL.sog} {...stroke} />}
    <rect x={0} y={etch ? 60 : 56} width={250} height={etch ? 44 : 24} fill="url(#c11-hatch)" {...stroke} />
    <rect x={172} y={etch ? 60 : 56} width={22} height={etch ? 50 : 54} fill={COL.al} {...stroke} />
    <rect x={130} y={etch ? 36 : 32} width={120} height={24} fill={COL.al} {...stroke} />
    {!etch && <><T x={166} y={92} c={COL.red} s={16} w={700}>*</T><T x={200} y={92} c={COL.red} s={16} w={700}>*</T></>}
    <T x={190} y={etch ? 52 : 48} s={11}>Al 第二层</T><T x={183} y={132} s={11}>Al</T><T x={125} y={205} s={12}>Si 衬底</T>
    <T x={125} y={250} s={12}>{etch ? "右：SOG 回刻后，通孔不触及 SOG" : "左：无回刻，通孔穿过 SOG（*中毒）"}</T>
  </g>;
  return <Svg w={600} h={262} title="旋涂玻璃 SOG 夹在两层淀积氧化层之间；无回刻时形成中毒通孔"><Defs />
    {panel(10, false)}{panel(330, true)}
    <rect x={268} y={100} width={14} height={10} fill={COL.sog} {...stroke} /><T x={290} y={109} a="start" s={11}>SOG</T>
    <rect x={268} y={118} width={14} height={10} fill="url(#c11-hatch)" {...stroke} /><T x={290} y={127} a="start" s={11}>淀积氧化层</T>
  </Svg>;
}

// ================= 图 11.15：压应力下 Al 小丘的形成 =================
export function Fig1115() {
  const gb = [70, 150, 300, 360];
  return <Svg w={560} h={250} title="压应力使 Al 原子沿晶界扩散并向上挤出形成小丘"><Defs />
    <rect x={80} y={130} width={400} height={110} fill={COL.si} {...stroke} />
    <rect x={80} y={105} width={400} height={25} fill="url(#c11-hatch)" {...stroke} />
    <path d="M80,105 L80,70 L190,70 Q192,30 222,26 L250,26 Q268,30 268,70 L480,70 L480,105 Z" fill={COL.al} {...stroke} />
    {gb.map(x => <path key={x} d={`M${80 + x},70 q-6,10 2,18 q6,8 -2,17`} fill="none" stroke="#5a4500" strokeWidth={1.4} />)}
    <path d="M190,105 q-6,-18 2,-35" fill="none" stroke="#5a4500" strokeWidth={1.4} /><path d="M268,105 q6,-18 0,-35" fill="none" stroke="#5a4500" strokeWidth={1.4} />
    <Arrow x1={186} y1={98} x2={190} y2={36} c={COL.red} w={1.6} /><Arrow x1={272} y1={98} x2={270} y2={36} c={COL.red} w={1.6} />
    <Arrow x1={20} y1={88} x2={74} y2={88} w={3} head={10} /><Arrow x1={540} y1={88} x2={486} y2={88} w={3} head={10} />
    <T x={229} y={18}>Al 小丘</T><T x={400} y={92} s={12}>Al 膜</T><T x={280} y={122} s={12}>SiO_2 膜</T><T x={280} y={195}>硅衬底</T>
    <T x={47} y={78} s={11}>压应力</T><T x={513} y={78} s={11}>压应力</T><T x={420} y={60} s={11} c="#5a4500">晶界</T>
  </Svg>;
}

// ================= 图 11.17：分流层 =================
export function Fig1117() {
  return <Svg w={560} h={200} title="Al 线上下的 Ti 分流层在 Al 出现空洞时承载电流"><Defs />
    <rect x={60} y={20} width={420} height={40} fill="url(#c11-hatch)" {...stroke} />
    <rect x={60} y={60} width={420} height={6} fill={COL.ti} />
    <rect x={60} y={66} width={420} height={56} fill={COL.al} {...stroke} />
    <rect x={60} y={122} width={420} height={6} fill={COL.ti} />
    <rect x={60} y={128} width={420} height={40} fill="url(#c11-hatch)" {...stroke} />
    <path d="M250,66 Q244,90 238,122 L292,122 Q282,96 282,66 Z" fill="#fff" stroke="#777" strokeDasharray="3 2" />
    <Arrow x1={80} y1={94} x2={140} y2={94} w={3} head={10} /><Arrow x1={160} y1={88} x2={232} y2={64} c={COL.red} /><Arrow x1={160} y1={100} x2={232} y2={125} c={COL.red} />
    <Arrow x1={232} y1={63} x2={300} y2={63} c={COL.red} /><Arrow x1={232} y1={125} x2={300} y2={125} c={COL.red} />
    <Arrow x1={300} y1={64} x2={360} y2={88} c={COL.red} /><Arrow x1={300} y1={125} x2={360} y2={100} c={COL.red} /><Arrow x1={380} y1={94} x2={450} y2={94} w={3} head={10} />
    <T x={110} y={84} s={12}>电流</T><T x={415} y={84} s={12}>电流</T><T x={265} y={14} s={12}>Al 线中的空洞</T>
    <T x={40} y={66} s={12} a="end">Ti</T><T x={40} y={130} s={12} a="end">Ti</T><T x={500} y={98} a="start" s={12}>Al 膜</T>
    <T x={440} y={44} s={12}>SiO_2</T><T x={440} y={154} s={12}>SiO_2</T>
  </Svg>;
}

// ================= 图 11.18：约 2000 年的 Al 互连金属化方案 =================
export function Fig1118() {
  return <Svg w={520} h={330} title="W 塞、TiSi2/TiN 接触与 Ti/TiN/Al(Cu)/TiN 叠层的 Al 互连结构"><Defs />
    <rect x={40} y={230} width={440} height={90} fill={COL.si} {...stroke} />
    <path d="M110,230 L290,230 Q292,262 262,262 L138,262 Q108,262 110,230 Z" fill={COL.nplus} {...stroke} />
    <rect x={40} y={196} width={440} height={34} fill="url(#c11-hatch)" {...stroke} />
    <rect x={180} y={196} width={40} height={34} fill={COL.tin} /><rect x={185} y={200} width={30} height={30} fill={COL.w} /><rect x={176} y={228} width={48} height={5} fill={COL.tisi} />
    <rect x={40} y={92} width={440} height={104} fill="url(#c11-hatch)" {...stroke} />
    <rect x={90} y={188} width={250} height={8} fill={COL.ti} /><rect x={90} y={184} width={250} height={4} fill={COL.tin} />
    <rect x={90} y={150} width={250} height={34} fill={COL.al} {...stroke} /><rect x={90} y={146} width={250} height={4} fill={COL.tin} />
    <rect x={280} y={106} width={40} height={40} fill={COL.tin} /><rect x={285} y={106} width={30} height={40} fill={COL.w} />
    <rect x={40} y={98} width={440} height={8} fill={COL.ti} /><rect x={40} y={94} width={440} height={4} fill={COL.tin} />
    <rect x={40} y={58} width={440} height={36} fill={COL.al} {...stroke} /><rect x={40} y={54} width={440} height={4} fill={COL.tin} />
    <rect x={40} y={20} width={440} height={34} fill="url(#c11-hatch)" {...stroke} />
    <T x={200} y={172} s={12}>Al(Cu) 第一层金属</T><T x={300} y={80} s={12}>Al(Cu) 第二层金属</T><T x={200} y={218} s={11} c="#fff">W</T><T x={300} y={132} s={11} c="#fff">W</T>
    <T x={410} y={150} s={12}>淀积氧化层</T><T x={410} y={218} s={12}>淀积氧化层</T><T x={260} y={40} s={12}>淀积氧化层</T>
    <T x={200} y={252}>N+</T><T x={260} y={300}>P 型硅衬底</T>
    <line x1={170} y1={226} x2={120} y2={286} stroke={COL.ink} /><T x={100} y={300} s={11}>TiN</T>
    <line x1={222} y1={232} x2={330} y2={286} stroke={COL.ink} /><T x={350} y={300} s={11}>TiSi_2</T>
    <line x1={95} y1={192} x2={60} y2={176} stroke={COL.ink} /><T x={52} y={172} s={11}>Ti</T>
  </Svg>;
}

// ================= 图 11.19：双大马士革工艺（分步） =================
const DD_STEPS = [
  { k: "A", t: "淀积叠层：Metal 1 上依次为刻蚀停止层、介质、刻蚀停止层、介质、刻蚀停止层、硬掩模" },
  { k: "B", t: "第一次光刻：定义 Metal 2 图形，并把它刻进硬掩模" },
  { k: "C", t: "第二次光刻：定义通孔图形，刻到中间的刻蚀停止层（两次光刻都在平坦表面上进行）" },
  { k: "D", t: "以硬掩模刻 Metal 2 槽、停在中间停止层；同时通孔穿透下层介质；最后去掉槽底与孔底的停止层" },
  { k: "E", t: "淀积阻挡/粘附层（如 TaN/Ta）与薄 Cu 籽晶层" },
  { k: "F", t: "电镀 Cu 填满槽与孔，再用 CMP 磨平，得到嵌入介质的 Metal 2 与通孔" },
];
function DDState({ s }) {
  // 坐标：Metal 1 顶 y=200；停止层 6 px；介质 40 px
  const X0 = 40, X1 = 400, tr = [150, 290], via = [195, 245];
  const es = (y, gaps) => { const segs = []; let x = X0; for (const [a, b] of gaps) { if (a > x) segs.push([x, a]); x = b; } if (x < X1) segs.push([x, X1]); return segs.map(([a, b], i) => <rect key={y + "-" + i} x={a} y={y} width={b - a} height={6} fill={COL.nit} {...stroke} />); };
  const diel = (y, gaps) => { const segs = []; let x = X0; for (const [a, b] of gaps) { if (a > x) segs.push([x, a]); x = b; } if (x < X1) segs.push([x, X1]); return segs.map(([a, b], i) => <rect key={y + "d" + i} x={a} y={y} width={b - a} height={40} fill="url(#c11-hatch)" {...stroke} />); };
  const topGap = s >= 3 ? [tr] : [], midGap = s >= 2 ? [via] : [], viaDiel = s >= 3 ? [via] : [], botGap = s >= 3 ? [via] : [];
  const hm = s === 0 ? [] : [tr];
  return <Svg w={475} h={250} title={"双大马士革步骤 " + DD_STEPS[s].k}><Defs />
    <rect x={X0} y={200} width={X1 - X0} height={34} fill={COL.cu} {...stroke} /><T x={90} y={222} s={12}>Metal 1 (Cu)</T>
    {es(194, botGap)}{diel(154, viaDiel)}{es(148, s >= 3 ? [tr] : midGap)}{diel(108, topGap)}{es(102, topGap)}
    {s < 3 && (hm.length ? [[X0, tr[0]], [tr[1], X1]] : [[X0, X1]]).map(([a, b], i) => <rect key={"hm" + i} x={a} y={92} width={b - a} height={10} fill={COL.hm} {...stroke} />)}
    {s === 3 && <><rect x={X0} y={92} width={tr[0] - X0} height={10} fill={COL.hm} {...stroke} /><rect x={tr[1]} y={92} width={X1 - tr[1]} height={10} fill={COL.hm} {...stroke} /></>}
    {s === 1 && <><rect x={X0} y={62} width={tr[0] - X0} height={30} fill={COL.resist} {...stroke} /><rect x={tr[1]} y={62} width={X1 - tr[1]} height={30} fill={COL.resist} {...stroke} /></>}
    {s === 2 && <><rect x={X0} y={62} width={via[0] - X0} height={40} fill={COL.resist} {...stroke} /><rect x={via[1]} y={62} width={X1 - via[1]} height={40} fill={COL.resist} {...stroke} />
      <rect x={via[0]} y={102} width={via[1] - via[0]} height={46} fill="#fff" stroke="none" /></>}
    {s === 4 && <path d={`M${X0},96 L${tr[0]},96 L${tr[0]},148 L${via[0]},148 L${via[0]},200 L${via[1]},200 L${via[1]},148 L${tr[1]},148 L${tr[1]},96 L${X1},96 L${X1},88 L${tr[1] - 8},88 L${tr[1] - 8},140 L${via[1] - 8},140 L${via[1] - 8},192 L${via[0] + 8},192 L${via[0] + 8},140 L${tr[0] + 8},140 L${tr[0] + 8},88 L${X0},88 Z`} fill={COL.tin} stroke="#333" strokeWidth={0.6} />}
    {s === 5 && <><path d={`M${tr[0]},102 L${tr[0]},148 L${via[0]},148 L${via[0]},200 L${via[1]},200 L${via[1]},148 L${tr[1]},148 L${tr[1]},102 Z`} fill={COL.tin} />
      <path d={`M${tr[0] + 5},102 L${tr[0] + 5},153 L${via[0] + 5},153 L${via[0] + 5},200 L${via[1] - 5},200 L${via[1] - 5},153 L${tr[1] - 5},153 L${tr[1] - 5},102 Z`} fill={COL.cu} {...stroke} /><T x={220} y={128} s={12}>Metal 2 (Cu)</T></>}
    {s === 0 && <><T x={410} y={100} a="start" s={11}>硬掩模</T><T x={410} y={130} a="start" s={11}>介质</T><T x={410} y={153} a="start" s={11}>停止层</T><T x={410} y={178} a="start" s={11}>介质</T><T x={410} y={199} a="start" s={11}>停止层</T></>}
    {(s === 1 || s === 2) && <T x={90} y={80} s={12}>光刻胶</T>}
    {s === 4 && <T x={340} y={82} s={11}>TaN/Ta + Cu 籽晶</T>}
    <T x={20} y={22} a="start" s={16} w={700}>{DD_STEPS[s].k}</T>
  </Svg>;
}
export function Fig1119() {
  const [s, setS] = useState(0);
  return <div className="card" style={{ padding: 12 }}>
    <div className="seg" style={{ marginBottom: 6 }}>{DD_STEPS.map((d, i) => <button key={i} className={i === s ? "on" : ""} onClick={() => setS(i)}>{d.k}</button>)}</div>
    <DDState s={s} />
    <p style={{ fontSize: 14, margin: "6px 0 0" }}><b>{DD_STEPS[s].k}.</b> {DD_STEPS[s].t}</p>
  </div>;
}

// ================= 图 11.21：降低 K 的两条途径 =================
export function Fig1121() {
  const box = (x, y, w, h, title, sub) => <g><rect x={x} y={y} width={w} height={h} fill="#f3f3f3" stroke="#333" strokeWidth={1.2} rx={4} />
    <T x={x + w / 2} y={y + 22} w={600}>{title}</T>{sub.map((s, i) => <T key={i} x={x + w / 2} y={y + 44 + i * 18} s={12} c="#666">{s}</T>)}</g>;
  return <Svg w={600} h={270} title="降低介电常数：降低极化率或降低密度">
    {box(230, 10, 140, 44, "降低 K", [])}
    <Arrow x1={270} y1={56} x2={110} y2={105} /><Arrow x1={330} y1={56} x2={420} y2={92} />
    <T x={110} y={122} s={13}>降低极化率 (α)</T><T x={420} y={108} s={13}>降低密度 (N)</T>
    <Arrow x1={400} y1={114} x2={330} y2={140} /><Arrow x1={440} y1={114} x2={500} y2={140} />
    {box(20, 135, 180, 120, "极性较弱的键", ["Si-F、Si-C", "C-C、C-H"])}
    {box(225, 145, 170, 110, "本征孔隙", ["自组织", "自由体积"])}
    {box(410, 145, 170, 110, "减法孔隙", ["选择性去除", "牺牲材料"])}
  </Svg>;
}

// ================= 图 11.22：用聚合物"填孔"临时增强多孔低 K =================
export function Fig1122() {
  const W = 84, Y = 60, H = 46;
  const panel = (i, kind) => { const x = 10 + i * 100; return <g key={i}>
    {kind === "trench" || kind === "final" ? [0, 1, 2].map(j => <rect key={j} x={x + j * 30} y={Y} width={18} height={H} fill={kind === "final" ? "url(#c11-por)" : "url(#c11-porfill)"} {...stroke} />).concat(<rect key="b" x={x} y={Y + H - 10} width={W} height={10} fill={kind === "final" ? "url(#c11-por)" : "url(#c11-porfill)"} {...stroke} />)
      : <rect x={x} y={Y} width={W} height={H} fill={kind === "por" || kind === "dep" ? "url(#c11-por)" : "url(#c11-porfill)"} {...stroke} />}
    {(kind === "dep" || kind === "ann") && <rect x={x} y={Y - 10} width={W} height={10} fill={COL.resist} {...stroke} />}
    {i < 5 && <Arrow x1={x + W + 2} y1={Y + H / 2} x2={x + 98} y2={Y + H / 2} />}
  </g>; };
  const lab = ["低 K 材料", "淀积聚合物", "退火（扩散入孔）", "去除多余聚合物", "光刻 + 刻蚀", "去除聚合物"];
  return <Svg w={610} h={150} title="多孔低 K 介质的孔隙用聚合物临时填充以承受加工，最后再去除"><Defs />
    {["por", "dep", "ann", "fill", "trench", "final"].map((k, i) => panel(i, k))}
    {lab.map((l, i) => <T key={i} x={52 + i * 100} y={i % 2 ? 40 : 130} s={11.5}>{l}</T>)}
  </Svg>;
}

// ================= 图 11.23：先用 a-C 牺牲介质、最后换成低 K =================
const RLK = ["a) 叠层", "b) 光刻并刻硬掩模", "c) 刻蚀 a-C", "d) Cu 金属化", "e) 金属 CMP", "f) 去除 a-C", "g) 淀积低 K", "h) 低 K CMP", "i) 钝化"];
function RLKState({ s }) {
  const lines = [[70, 100], [150, 180], [230, 260]], gaps = [[0, 70], [100, 150], [180, 230], [260, 330]];
  return <Svg w={360} h={200} title={"替代低 K 工艺 " + RLK[s]}><Defs />
    <rect x={10} y={150} width={330} height={40} fill={COL.si} {...stroke} /><rect x={10} y={130} width={330} height={20} fill="url(#c11-hatch)" {...stroke} />
    {s <= 4 && (s <= 1 ? <rect x={10} y={70} width={330} height={60} fill={COL.carbon} {...stroke} />
      : gaps.map(([a, b], i) => <rect key={i} x={10 + a} y={70} width={b - a} height={60} fill={COL.carbon} {...stroke} />))}
    {s <= 4 && (s === 0 ? <rect x={10} y={60} width={330} height={10} fill={COL.hm} {...stroke} /> : gaps.map(([a, b], i) => <rect key={"h" + i} x={10 + a} y={60} width={b - a} height={10} fill={COL.hm} {...stroke} />))}
    {s <= 1 && gaps.map(([a, b], i) => <rect key={"r" + i} x={10 + a} y={36} width={b - a} height={24} fill={COL.resist} {...stroke} />)}
    {s >= 3 && lines.map(([a, b], i) => <rect key={"c" + i} x={10 + a} y={s >= 5 ? 70 : 60} width={b - a} height={s >= 5 ? 60 : 70} fill={COL.cu} {...stroke} />)}
    {s === 3 && <rect x={10} y={44} width={330} height={16} fill={COL.cu} {...stroke} />}
    {s >= 6 && gaps.map(([a, b], i) => <rect key={"k" + i} x={10 + a} y={s === 6 ? 54 : 70} width={b - a} height={s === 6 ? 76 : 60} fill="url(#c11-por)" {...stroke} />)}
    {s === 6 && lines.map(([a, b], i) => <rect key={"kk" + i} x={10 + a} y={54} width={b - a} height={16} fill="url(#c11-por)" {...stroke} />)}
    {s === 8 && <rect x={10} y={56} width={330} height={14} fill={COL.nit} {...stroke} />}
    <T x={175} y={22} w={600}>{RLK[s]}</T>
    {s === 0 && <><T x={175} y={104} s={12} c="#fff">a-C（非晶碳）</T><T x={175} y={144} s={11}>SiO_2 / 硅衬底</T></>}
  </Svg>;
}
export function Fig1123() {
  const [s, setS] = useState(0);
  return <div className="card" style={{ padding: 12 }}>
    <div className="seg" style={{ marginBottom: 6, flexWrap: "wrap" }}>{RLK.map((d, i) => <button key={i} className={i === s ? "on" : ""} onClick={() => setS(i)}>{d.slice(0, 1)}</button>)}</div>
    <RLKState s={s} />
    <p style={{ fontSize: 13, margin: "4px 0 0", textAlign: "center" }}>灰：非晶碳 a-C（较硬的临时介质）；橙：Cu；青灰点纹：多孔低 K；绿：钝化层</p>
  </div>;
}
