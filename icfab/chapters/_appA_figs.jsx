// 附录 A.1 的自绘示意图（SVG）：键模型、能带模型、态密度、载流子分布、例题解、SRH 复合。
// 配色（全页一致）：电子 蓝、空穴 红、硅原子 灰、施主 As 金、受主 B 绿、费米能级 紫色虚线。
import { M } from "@kit";

const R = String.raw;
export const COL = { e: "#2c4a6e", h: "#c0392b", si: "#8a8f96", as: "#b8862b", b: "#3c6b4a", ef: "#7d3c98", band: "#1f1b16", bond: "#dcdfe3", grid: "#ece8df" };
const font = { fontFamily: "system-ui, sans-serif", fontSize: 14 };

export function Svg({ w = 680, h = 300, title, children }) {
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} style={{ width: "100%", maxWidth: w, display: "block", margin: "0 auto", ...font }}><title>{title}</title>
    <defs>
      <marker id="appa-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#333" /></marker>
      <marker id="appa-arr-e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={COL.e} /></marker>
      <marker id="appa-arr-h" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={COL.h} /></marker>
    </defs>{children}</svg>;
}
export const Elec = ({ x, y, r = 5 }) => <g><circle cx={x} cy={y} r={r} fill="#e8eef6" stroke={COL.e} strokeWidth="1.3" /><line x1={x - r * 0.55} x2={x + r * 0.55} y1={y} y2={y} stroke={COL.e} strokeWidth="1.4" /></g>;
export const Hole = ({ x, y, r = 5 }) => <g><circle cx={x} cy={y} r={r} fill="#fbeceb" stroke={COL.h} strokeWidth="1.3" /><line x1={x - r * 0.55} x2={x + r * 0.55} y1={y} y2={y} stroke={COL.h} strokeWidth="1.4" /><line y1={y - r * 0.55} y2={y + r * 0.55} x1={x} x2={x} stroke={COL.h} strokeWidth="1.4" /></g>;
const Arrow = ({ x1, y1, x2, y2, c = "#333", m = "appa-arr", w = 1.6, dash }) => <line {...{ x1, y1, x2, y2 }} stroke={c} strokeWidth={w} strokeDasharray={dash} markerEnd={`url(#${m})`} />;

// ---------- 键模型（二维示意）----------
// special: { broken: [i, j] 打断 (i,j) 右侧的键；donor: [i, j]；acceptor: [i, j] }
export function BondLattice({ cols = 4, rows = 3, x0 = 60, y0 = 50, s = 86, broken, donor, acceptor, freeTo }) {
  const r = 26, items = [];
  const isAt = (p, i, j) => p && p[0] === i && p[1] === j;
  // 键：每对相邻原子之间一个椭圆 + 两个电子
  const bond = (cx, cy, horiz, key, missing = 0) => {
    items.push(<ellipse key={"b" + key} cx={cx} cy={cy} rx={horiz ? 15 : 9} ry={horiz ? 9 : 15} fill={COL.bond} />);
    const d = 5.5, pts = horiz ? [[cx - d, cy], [cx + d, cy]] : [[cx, cy - d], [cx, cy + d]];
    pts.forEach((p, k) => items.push(k < 2 - missing ? <Elec key={"e" + key + k} x={p[0]} y={p[1]} r={4.2} /> : <Hole key={"h" + key + k} x={p[0]} y={p[1]} r={4.2} />));
  };
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const cx = x0 + i * s, cy = y0 + j * s;
    const brokenHere = isAt(broken, i, j), accHere = isAt(acceptor, i, j);
    bond(cx + s / 2, cy, true, `h${i}${j}`, brokenHere || (accHere) ? 1 : 0);
    bond(cx, cy + s / 2, false, `v${i}${j}`);
    if (i === 0) bond(cx - s / 2, cy, true, `l${j}`);
    if (j === 0) bond(cx, cy - s / 2, false, `t${i}`);
  }
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const cx = x0 + i * s, cy = y0 + j * s;
    items.push(<circle key={"a" + i + j} cx={cx} cy={cy} r={r} fill="none" stroke="#444" strokeWidth="1.1" />);
    if (isAt(donor, i, j)) items.push(<g key={"d" + i + j}><circle cx={cx} cy={cy} r={14} fill={COL.as} /><text x={cx} y={cy + 5} textAnchor="middle" fill="#fff" fontSize="13">As<tspan dy="-6" fontSize="10">+</tspan></text></g>);
    else if (isAt(acceptor, i, j)) items.push(<g key={"c" + i + j}><circle cx={cx} cy={cy} r={14} fill={COL.b} /><text x={cx} y={cy + 5} textAnchor="middle" fill="#fff" fontSize="13">B<tspan dy="-6" fontSize="10">−</tspan></text></g>);
    else items.push(<circle key={"n" + i + j} cx={cx} cy={cy} r={8} fill={COL.si} />);
  }
  if (broken) {
    const cx = x0 + broken[0] * s + s / 2, cy = y0 + broken[1] * s, [tx, ty] = freeTo || [cx + 40, y0 - 40];
    items.push(<Arrow key="fa" x1={cx + 3} y1={cy - 6} x2={tx} y2={ty + 8} c={COL.e} m="appa-arr-e" />, <Elec key="fe" x={tx} y={ty} />);
    items.push(<text key="ft" x={tx + 10} y={ty + 4} fill={COL.e} fontSize="13">自由电子</text>, <text key="ht" x={cx + 10} y={cy + 24} fill={COL.h} fontSize="13">可动空穴</text>);
  }
  if (donor) {
    const cx = x0 + donor[0] * s, cy = y0 + donor[1] * s, [tx, ty] = freeTo || [cx + 40, y0 - 40];
    items.push(<Arrow key="da" x1={cx + 10} y1={cy - 10} x2={tx} y2={ty + 8} c={COL.e} m="appa-arr-e" />, <Elec key="de" x={tx} y={ty} />, <text key="dt" x={tx + 10} y={ty + 4} fill={COL.e} fontSize="13">第五个电子</text>);
  }
  if (acceptor) {
    const cx = x0 + acceptor[0] * s + s / 2, cy = y0 + acceptor[1] * s;
    items.push(<text key="at" x={cx - 18} y={cy - 16} fill={COL.h} fontSize="13">空穴</text>);
  }
  return <g>{items}</g>;
}

function SiAtom({ cx = 120, cy = 140 }) {
  const shells = [[28, 2], [52, 8], [76, 4]], out = [];
  shells.forEach(([r, n], k) => {
    out.push(<circle key={"s" + k} cx={cx} cy={cy} r={r} fill="none" stroke="#555" />);
    for (let i = 0; i < n; i++) { const a = 2 * Math.PI * i / n + (k === 2 ? Math.PI / 4 : 0); out.push(<Elec key={`e${k}${i}`} x={cx + r * Math.cos(a)} y={cy + r * Math.sin(a)} />); }
  });
  return <g>{out}<circle cx={cx} cy={cy} r={11} fill={COL.si} /><text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fill="#fff">+14</text></g>;
}

export function FigA1_1() {
  return <Svg w={680} h={300} title="硅原子与二维键模型">
    <SiAtom cx={120} cy={135} />
    <text x={120} y={240} textAnchor="middle">Si 原子：14 个电子（2 + 8 + 4）</text>
    <text x={120} y={262} textAnchor="middle" fill={COL.e}>最外层 4 个为价电子</text>
    <BondLattice cols={4} rows={3} x0={300} y0={55} s={95} />
    <text x={442} y={292} textAnchor="middle">晶体中：每个原子与 4 个近邻共享电子对（灰色椭圆为共价键）</text>
  </Svg>;
}
export function FigA1_3() {
  return <Svg w={680} h={260} title="热激发打断共价键，产生电子–空穴对">
    <BondLattice cols={4} rows={2} x0={150} y0={90} s={110} broken={[2, 0]} freeTo={[500, 22]} />
  </Svg>;
}
export function FigA1_5() {
  return <Svg w={680} h={330} title="As 与 B 掺杂的键模型">
    <BondLattice cols={3} rows={3} x0={60} y0={90} s={85} donor={[1, 1]} freeTo={[180, 22]} />
    <BondLattice cols={3} rows={3} x0={400} y0={90} s={85} acceptor={[1, 1]} />
    <text x={145} y={325} textAnchor="middle">N 型：As（V 族）多出一个价电子</text>
    <text x={485} y={325} textAnchor="middle">P 型：B（III 族）少一个价电子 → 空穴</text>
  </Svg>;
}

// ---------- 能带图 ----------
// levels: [{y, label, dash, color}]；electrons：导带上方的电子数；holes：价带下方的空穴数
function Band({ x, w, yC, yV, eN = 6, hN = 6, levels = [], gen = false, bound = true, label, seed = 1 }) {
  const out = []; let r = seed * 9301;
  const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
  out.push(<line key="c" x1={x} x2={x + w} y1={yC} y2={yC} stroke={COL.band} strokeWidth="2.4" />, <line key="v" x1={x} x2={x + w} y1={yV} y2={yV} stroke={COL.band} strokeWidth="2.4" />);
  out.push(<text key="ct" x={x + w + 6} y={yC + 5}>E<tspan dy="4" fontSize="10">C</tspan></text>, <text key="vt" x={x + w + 6} y={yV + 5}>E<tspan dy="4" fontSize="10">V</tspan></text>);
  for (let i = 0; i < eN; i++) out.push(<Elec key={"e" + i} x={x + 12 + rnd() * (w - 24)} y={yC - 10 - rnd() * Math.min(40, 6 + eN * 1.2)} />);
  for (let i = 0; i < hN; i++) out.push(<Hole key={"h" + i} x={x + 12 + rnd() * (w - 24)} y={yV + 10 + rnd() * Math.min(40, 6 + hN * 1.2)} />);
  if (bound) for (let i = 0; i < 18; i++) out.push(<Elec key={"b" + i} x={x + 10 + (i % 9) * (w - 20) / 8} y={yV + 52 + Math.floor(i / 9) * 13} r={4} />);
  levels.forEach((L, i) => {
    out.push(<line key={"l" + i} x1={x} x2={x + w} y1={L.y} y2={L.y} stroke={L.color || "#333"} strokeWidth="1.6" strokeDasharray={L.dash ? "8 6" : undefined} />);
    out.push(<text key={"lt" + i} x={L.left ? x - 6 : x + w + 6} y={L.y + 5 + (L.dy || 0)} textAnchor={L.left ? "end" : "start"} fill={L.color || "#333"}>{L.label}</text>);
  });
  if (gen) out.push(<Arrow key="g" x1={x + w * 0.75} y1={yV - 2} x2={x + w * 0.75} y2={yC - 10} />, <text key="gt" x={x + w * 0.78} y={(yC + yV) / 2} fontSize="13">本征激发</text>);
  if (label) out.push(<text key="lab" x={x + w / 2} y={yV + 92} textAnchor="middle">{label}</text>);
  return <g>{out}</g>;
}
const Sub = ({ b, s }) => <>{b}<tspan dy="4" fontSize="10">{s}</tspan></>;

export function FigA1_7() {
  return <Svg w={680} h={300} title="本征半导体的能带模型与键模型">
    <line x1={30} x2={30} y1={250} y2={40} stroke="#333" markerEnd="url(#appa-arr)" /><text x={36} y={42}>能量</text>
    <Band x={50} w={250} yC={80} yV={190} eN={5} hN={5} gen />
    <Arrow x1={90} y1={190} x2={90} y2={82} /><Arrow x1={90} y1={82} x2={90} y2={188} /><text x={96} y={140}><Sub b="E" s="G" /></text>
    <text x={175} y={35} textAnchor="middle" fill={COL.e}>自由电子（导带）</text><text x={175} y={290} textAnchor="middle">成键电子（价带以下）</text>
    <BondLattice cols={3} rows={2} x0={430} y0={110} s={88} broken={[1, 0]} freeTo={[560, 30]} />
  </Svg>;
}
export function FigA1_8() {
  return <Svg w={680} h={345} title="掺杂半导体的能带模型与键模型">
    <Band x={50} w={250} yC={80} yV={200} eN={5} hN={5} gen levels={[{ y: 92, label: <Sub b="E" s="D" />, dash: true, color: COL.as, left: true }, { y: 188, label: <Sub b="E" s="A" />, dash: true, color: COL.b, left: true }]} />
    <text x={175} y={35} textAnchor="middle" fill={COL.e}>自由电子</text>
    <BondLattice cols={3} rows={3} x0={420} y0={80} s={85} donor={[1, 0]} freeTo={[560, 22]} />
    <circle cx={505} cy={250} r={14} fill={COL.b} /><text x={505} y={255} textAnchor="middle" fill="#fff" fontSize="13">B<tspan dy="-6" fontSize="10">−</tspan></text>
    <Hole x={462} y={207} /><text x={380} y={338}>B 从近邻键"借"走电子，空穴随之游走</text>
  </Svg>;
}

export function FigA1_9() {
  const lines = []; for (let i = 0; i < 9; i++) { lines.push(<line key={"c" + i} x1={210} x2={290} y1={92 - i * i * 0.9} y2={92 - i * i * 0.9} stroke="#333" />); lines.push(<line key={"v" + i} x1={210} x2={290} y1={198 + i * i * 0.9} y2={198 + i * i * 0.9} stroke="#333" />); }
  const dc = [], dv = []; for (let i = 0; i <= 40; i++) { const t = i / 40; dc.push(`${430 + 120 * Math.sqrt(t)},${92 - 70 * t}`); dv.push(`${430 + 120 * Math.sqrt(t)},${198 + 70 * t}`); }
  return <Svg w={680} h={290} title="能带由大量分立能级组成；态密度随离开带边的距离增大">
    <line x1={60} x2={290} y1={92} y2={92} stroke={COL.band} strokeWidth="2" /><text x={40} y={97}><Sub b="E" s="C" /></text>
    <line x1={60} x2={290} y1={198} y2={198} stroke={COL.band} strokeWidth="2" /><text x={40} y={203}><Sub b="E" s="V" /></text>
    {lines}<text x={250} y={280} textAnchor="middle">能级越来越密</text>
    <line x1={430} x2={430} y1={275} y2={15} stroke="#333" markerEnd="url(#appa-arr)" /><text x={438} y={20}>E</text>
    <line x1={430} x2={620} y1={145} y2={145} stroke="#333" markerEnd="url(#appa-arr)" /><text x={626} y={150}>D(E)</text>
    <polyline points={dc.join(" ")} fill="none" stroke={COL.e} strokeWidth="2.2" /><polyline points={dv.join(" ")} fill="none" stroke={COL.h} strokeWidth="2.2" />
    <text x={556} y={30} fill={COL.e}><Sub b="D" s="C" /></text><text x={556} y={274} fill={COL.h}><Sub b="D" s="V" /></text>
    <text x={406} y={97}><Sub b="E" s="C" /></text><text x={406} y={203}><Sub b="E" s="V" /></text>
  </Svg>;
}

// 图 A1.11：按真实函数形状画（kT 放大以便看清）
export function FigA1_11() {
  const yC = 80, yV = 200, yF = 140, kT = 14, H = 270;
  const D = y => (y <= yC ? Math.sqrt((yC - y)) * 9 : y >= yV ? Math.sqrt((y - yV)) * 9 : 0);
  const f = y => 1 / (1 + Math.exp((yF - y) / kT));      // y 向下增大 = 能量降低
  const pts = (fn, x0, sc, a, b) => { const o = []; for (let y = a; y <= b; y += 1) o.push(`${x0 + sc * fn(y)},${y}`); return o.join(" "); };
  const nE = y => (y < yC ? D(y) * f(y) * 300 : 0), pH = y => (y > yV ? D(y) * (1 - f(y)) * 300 : 0);
  return <Svg w={680} h={H + 30} title="态密度、费米分布与电子、空穴分布">
    <Band x={30} w={150} yC={yC} yV={yV} eN={3} hN={3} bound={false} levels={[{ y: yF, label: <><Sub b="E" s="F" />{" = "}<Sub b="E" s="i" /></>, dash: true, color: COL.ef }]} />
    {[[230, "D(E)"], [400, "f(E)"], [560, "n, p"]].map(([x, t]) => <g key={t}><line x1={x} x2={x} y1={H} y2={20} stroke="#333" markerEnd="url(#appa-arr)" /><line x1={x} x2={x + 110} y1={H} y2={H} stroke="#333" /><text x={x + 55} y={H + 22} textAnchor="middle">{t}</text></g>)}
    <polyline points={pts(D, 230, 1, 22, yC)} fill="none" stroke={COL.e} strokeWidth="2" /><polyline points={pts(D, 230, 1, yV, H - 2)} fill="none" stroke={COL.h} strokeWidth="2" />
    <polyline points={pts(y => 1 - f(y), 400, 0, 20, 20)} fill="none" />
    <polyline points={pts(y => f(y), 400, 100, 22, H - 2)} fill="none" stroke={COL.ef} strokeWidth="2" />
    <text x={450} y={H - 6} fontSize="12">0.5</text><text x={498} y={H - 6} fontSize="12">1</text>
    <polygon points={`560,${yC} ${pts(nE, 560, 1, 22, yC)} 560,22`} fill={COL.e} opacity=".35" stroke={COL.e} />
    <polygon points={`560,${yV} ${pts(pH, 560, 1, yV, H - 2)} 560,${H - 2}`} fill={COL.h} opacity=".35" stroke={COL.h} />
    {[yC, yF, yV].map(y => <line key={y} x1={185} x2={680} y1={y} y2={y} stroke="#999" strokeDasharray="5 5" />)}
    <text x={620} y={60} fill={COL.e} fontSize="13">电子 n</text><text x={620} y={232} fill={COL.h} fontSize="13">空穴 p</text>
  </Svg>;
}

export function FigA1_12() {
  return <Svg w={680} h={260} title="本征、N 型、P 型材料中的费米能级位置">
    <Band x={30} w={170} yC={70} yV={170} eN={4} hN={4} bound={false} label="本征" seed={2} levels={[{ y: 120, label: <Sub b="E" s="F" />, dash: true, color: COL.ef }]} />
    <Band x={250} w={170} yC={70} yV={170} eN={18} hN={1} bound={false} label="N 型" seed={3} levels={[{ y: 88, label: <Sub b="E" s="D" />, dash: true, color: COL.as }, { y: 100, label: <Sub b="E" s="F" />, dash: true, color: COL.ef, left: true }]} />
    <Band x={470} w={170} yC={70} yV={170} eN={1} hN={18} bound={false} label="P 型" seed={4} levels={[{ y: 152, label: <Sub b="E" s="A" />, dash: true, color: COL.b }, { y: 140, label: <Sub b="E" s="F" />, dash: true, color: COL.ef, left: true }]} />
  </Svg>;
}

export function FigA1_15() {
  return <Svg w={680} h={220} title="同时含 As 与 B 的硅样品">
    <rect x={60} y={50} width={220} height={130} fill="#f4f4f6" stroke="#333" />
    <text x={170} y={90} textAnchor="middle">[As] = 1 × 10<tspan dy="-6" fontSize="10">16</tspan><tspan dy="6"> cm</tspan><tspan dy="-6" fontSize="10">−3</tspan></text>
    <text x={170} y={122} textAnchor="middle">[B] = 3 × 10<tspan dy="-6" fontSize="10">16</tspan><tspan dy="6"> cm</tspan><tspan dy="-6" fontSize="10">−3</tspan></text>
    <text x={170} y={158} textAnchor="middle">硅</text>
    <line x1={360} x2={600} y1={45} y2={45} stroke={COL.band} strokeWidth="2.4" /><text x={608} y={50}><Sub b="E" s="C" /></text>
    <line x1={360} x2={600} y1={70} y2={70} stroke={COL.as} strokeWidth="1.6" strokeDasharray="8 6" /><text x={340} y={75} textAnchor="end" fill={COL.as}><Sub b="E" s="D" /></text>
    <text x={470} y={62} fontSize="13">0.049 eV</text>
    <line x1={360} x2={600} y1={170} y2={170} stroke={COL.b} strokeWidth="1.6" strokeDasharray="8 6" /><text x={340} y={175} textAnchor="end" fill={COL.b}><Sub b="E" s="A" /></text>
    <line x1={360} x2={600} y1={195} y2={195} stroke={COL.band} strokeWidth="2.4" /><text x={608} y={200}><Sub b="E" s="V" /></text>
    <text x={470} y={187} fontSize="13">0.045 eV</text>
  </Svg>;
}

// 图 A1.16：三个温度下的解（50 K 采用自洽电中性结果，见勘误框）
export function FigA1_16({ s298, s1273, s50 }) {
  const panel = (x, s, title, eN, hN, txt) => {
    const yC = 70, yV = 190, y = E => yV - (E / s.Eg) * (yV - yC);
    // 示意：杂质能级画在离带边 10 px 处；E_F 按能量线性定位，但落在杂质能级附近时贴着它画
    const yD = yC + 10, yA = yV - 10;
    let yF = y(s.EF); if (s.EF < 0.1) yF = yA - 7 * Math.sign(s.EF - 0.045 || 1); if (s.Eg - s.EF < 0.1) yF = yD + 7;
    return <g>
      <Band x={x} w={170} yC={yC} yV={yV} eN={eN} hN={hN} bound={false} seed={x}
        levels={[{ y: yD, label: <Sub b="E" s="D" />, dash: true, color: COL.as, dy: 10 }, { y: yA, label: <Sub b="E" s="A" />, dash: true, color: COL.b, dy: -10 }, { y: yF, label: <Sub b="E" s="F" />, color: COL.ef, left: true }]} />
      <text x={x + 85} y={30} textAnchor="middle" fontSize="13" fill={COL.e}>{txt[0]}</text>
      <text x={x + 85} y={250} textAnchor="middle" fontSize="13" fill={COL.h}>{txt[1]}</text>
      <text x={x + 85} y={275} textAnchor="middle" fontWeight="600">{title}</text>
    </g>;
  };
  const f = v => v.toExponential(2).replace("e+", "e");
  return <Svg w={700} h={290} title="例题在三个温度下的解">
    {panel(30, s298, "室温 298 K", 1, 14, [`n = ${f(s298.n)}`, `p = ${f(s298.p)}`])}
    {panel(255, s1273, "1000 °C", 16, 16, [`n = ${f(s1273.n)}`, `p = ${f(s1273.p)}`])}
    {panel(480, s50, "50 K", 0, 3, ["n 约为 0", `p = ${f(s50.p)}`])}
  </Svg>;
}

export function FigA1_17() {
  return <Svg w={680} h={250} title="SRH 复合：陷阱能级先后俘获电子与空穴">
    <Band x={50} w={220} yC={70} yV={180} eN={5} hN={5} bound={false} levels={[{ y: 125, label: <Sub b="E" s="T" />, dash: true, color: "#555", left: true }]} label="本征材料" seed={5} />
    <Arrow x1={120} y1={74} x2={120} y2={121} c={COL.e} m="appa-arr-e" /><Arrow x1={190} y1={176} x2={190} y2={129} c={COL.h} m="appa-arr-h" />
    <Band x={380} w={220} yC={70} yV={180} eN={18} hN={2} bound={false} label="N 型材料" seed={6}
      levels={[{ y: 80, label: <Sub b="E" s="D" />, dash: true, color: COL.as, dy: 10 }, { y: 98, label: <Sub b="E" s="F" />, dash: true, color: COL.ef, left: true }, { y: 125, label: <Sub b="E" s="T" />, dash: true, color: "#555" }]} />
    <Arrow x1={450} y1={74} x2={450} y2={121} c={COL.e} m="appa-arr-e" w={4.5} /><Arrow x1={530} y1={176} x2={530} y2={129} c={COL.h} m="appa-arr-h" w={1.2} />
    <text x={612} y={150} fontSize="12" fill={COL.h}>少子俘获</text><text x={612} y={166} fontSize="12" fill={COL.h}>是瓶颈</text>
  </Svg>;
}

// 周期表片段（图 A1.2 右）
const PT = [
  [null, ["B", 5, "10.81"], ["C", 6, "12.01"], ["N", 7, "14.01"], ["O", 8, "16.00"]],
  [null, ["Al", 13, "26.98"], ["Si", 14, "28.09"], ["P", 15, "30.97"], ["S", 16, "32.06"]],
  [["Zn", 30, "65.39"], ["Ga", 31, "69.72"], ["Ge", 32, "72.59"], ["As", 33, "74.92"], ["Se", 34, "78.96"]],
  [["Cd", 48, "112.4"], ["In", 49, "114.8"], ["Sn", 50, "118.7"], ["Sb", 51, "121.8"], ["Te", 52, "127.6"]],
  [["Hg", 80, "200.6"], ["Tl", 81, "204.4"], ["Pb", 82, "207.2"], ["Bi", 83, "209.0"], ["Po", 84, "209"]],
];
export function PeriodicSlice() {
  const fill = c => (c === 2 ? "#cfd3d8" : c === 1 ? "#e3efe6" : c === 3 ? "#f4ead2" : "#fff");
  return <Svg w={360} h={330} title="与半导体及掺杂有关的周期表片段">
    {["II", "III", "IV", "V", "VI"].map((t, c) => <text key={t} x={30 + c * 64 + 30} y={22} textAnchor="middle" fontWeight="600">{t}</text>)}
    {PT.map((row, r) => row.map((e, c) => e && <g key={r + "-" + c}>
      <rect x={30 + c * 64} y={32 + r * 58} width={60} height={54} fill={fill(c)} stroke="#555" />
      <text x={34 + c * 64} y={46 + r * 58} fontSize="11">{e[1]}</text>
      <text x={60 + c * 64} y={66 + r * 58} textAnchor="middle" fontSize="18">{e[0]}</text>
      <text x={60 + c * 64} y={82 + r * 58} textAnchor="middle" fontSize="11">{e[2]}</text></g>))}
  </Svg>;
}

export const Legend = () => <p style={{ fontSize: 13, textAlign: "center", margin: "4px 0" }}>
  <span style={{ color: COL.e }}>● 电子</span>　<span style={{ color: COL.h }}>● 空穴</span>　<span style={{ color: COL.as }}>● As 施主</span>　<span style={{ color: COL.b }}>● B 受主</span>　<span style={{ color: COL.ef }}>– – 费米能级</span>　<M>{R`E_C,\ E_V`}</M> 为带边</p>;
