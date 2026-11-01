// 第 2 章自绘示意图：图 2.1（CMOS 反相器与与非门）、图 2.3（反相器版图俯视）、图 2.20（高 k 金属栅叠层细节）。
import { MAT } from "./_ch02_xsec.jsx";

const svgStyle = { width: "100%", display: "block", fontFamily: "system-ui,sans-serif", background: "#fff" };
const Sub = ({ b, s }) => <>{b}<tspan dy="4" fontSize="0.75em">{s}</tspan><tspan dy="-4"> </tspan></>;

// MOSFET 符号：(x,y) 为沟道线中点；返回端点坐标
function Tr({ x, y, p }) {
  return <g stroke="#222" strokeWidth="2" fill="none">
    <line x1={x} y1={y - 22} x2={x} y2={y + 22} strokeWidth="3" />
    <polyline points={`${x},${y - 16} ${x + 20},${y - 16} ${x + 20},${y - 30}`} />
    <polyline points={`${x},${y + 16} ${x + 20},${y + 16} ${x + 20},${y + 30}`} />
    <line x1={x - 8} y1={y - 18} x2={x - 8} y2={y + 18} />
    {p ? <><circle cx={x - 14} cy={y} r="5" fill="#fff" /><line x1={x - 19} y1={y} x2={x - 19} y2={y} /></> : null}
    {/* 源极箭头：NMOS 在下端向外，PMOS 在上端向内 */}
    {p ? <polygon points={`${x + 3},${y - 16} ${x + 11},${y - 20} ${x + 11},${y - 12}`} fill="#222" stroke="none" /> : <polygon points={`${x + 17},${y + 16} ${x + 9},${y + 12} ${x + 9},${y + 20}`} fill="#222" stroke="none" />}
  </g>;
}
const Dot = ({ x, y }) => <circle cx={x} cy={y} r="4.5" fill="#222" />;
const Pin = ({ x, y }) => <circle cx={x} cy={y} r="5" fill="#fff" stroke="#222" strokeWidth="2" />;
const W = ({ d }) => <polyline points={d} stroke="#222" strokeWidth="2" fill="none" />;
const Gnd = ({ x, y }) => <g stroke="#222" strokeWidth="2" fill="none"><line x1={x} y1={y} x2={x} y2={y + 10} /><polygon points={`${x - 10},${y + 10} ${x + 10},${y + 10} ${x},${y + 22}`} fill="#fff" /></g>;

export function Fig21() {
  return <svg viewBox="0 0 680 330" style={svgStyle} role="img" aria-label="CMOS 反相器与两输入与非门电路">
    <g fontSize="15" fill="#222">
      {/* 反相器 */}
      <Tr x={180} y={95} p /><Tr x={180} y={205} />
      <W d="200,65 200,45" /><line x1="178" y1="45" x2="222" y2="45" stroke="#222" strokeWidth="3" /><text x="200" y="32" textAnchor="middle"><Sub b="V" s="DD" /></text>
      <W d="200,125 200,175" /><W d="200,150 255,150" /><Dot x={200} y={150} /><Pin x={260} y={150} /><text x="272" y="155">Out</text>
      <W d="161,95 130,95 130,205 172,205" /><W d="75,150 130,150" /><Dot x={130} y={150} /><Pin x={70} y={150} /><text x="40" y="155">In</text>
      <W d="200,235 200,250" /><Gnd x={200} y={250} />
      <text x="228" y="100">PMOS</text><text x="228" y="210">NMOS</text>
      <text x="160" y="310" textAnchor="middle" fill="#555">(a) 反相器</text>
      {/* 与非门：两 PMOS 并联、两 NMOS 串联 */}
      <Tr x={430} y={95} p /><Tr x={540} y={95} p />
      <W d="450,65 450,45 560,45 560,65" /><line x1="483" y1="45" x2="527" y2="45" stroke="#222" strokeWidth="3" /><W d="505,45 505,35" /><text x="505" y="26" textAnchor="middle"><Sub b="V" s="DD" /></text>
      <W d="450,125 450,140 560,140 560,125" /><Dot x={560} y={140} /><W d="560,140 615,140" /><Pin x={620} y={140} /><text x="632" y="145">Out</text>
      <Tr x={540} y={190} /><Tr x={540} y={265} />
      <W d="560,140 560,160" /><W d="560,220 560,235" /><W d="560,295 560,300" /><Gnd x={560} y={300} />
      <W d="365,190 532,190" /><Dot x={500} y={190} /><W d="500,190 500,95 521,95" /><Pin x={360} y={190} /><text x="322" y="195"><Sub b="In" s="1" /></text>
      <W d="365,265 532,265" /><Dot x={395} y={265} /><W d="395,265 395,95 411,95" /><Pin x={360} y={265} /><text x="322" y="270"><Sub b="In" s="2" /></text>
      <text x="490" y="322" textAnchor="middle" fill="#555">(b) 两输入与非门</text>
    </g>
  </svg>;
}

// 反相器版图（俯视）。虚线为图 2.2 截面所取的切线。
export function Fig23() {
  const c = m => MAT[m].c;
  return <svg viewBox="0 0 680 330" style={svgStyle} role="img" aria-label="CMOS 反相器的版图俯视图">
    <rect x="30" y="70" width="620" height="190" fill={c("ox")} stroke="#555" />
    <rect x="50" y="100" width="250" height="130" fill={c("si")} stroke="#555" />
    <rect x="380" y="100" width="250" height="130" fill={c("si")} stroke="#555" />
    {/* 多晶硅栅（在有源区外相连，所以不出现在图 2.2 截面中） */}
    <path d="M160 245 V50 H508 V245 H486 V72 H182 V245 Z" fill={c("poly")} stroke="#333" />
    {/* 接触孔 */}
    {[[70, 140], [240, 140], [400, 140], [570, 140]].map(([x, y], i) => <rect key={i} x={x} y={y} width="30" height="50" fill="#111" />)}
    {/* 金属 */}
    <g fill="rgba(217,120,45,0.45)" stroke="#9c5418">
      <rect x="60" y="20" width="50" height="185" /><rect x="560" y="20" width="50" height="185" /><rect x="228" y="125" width="214" height="195" />
    </g>
    <line x1="10" y1="165" x2="670" y2="165" stroke="#222" strokeDasharray="8 6" strokeWidth="1.8" />
    <g fontSize="15" fill="#222">
      <text x="85" y="15" textAnchor="middle"><Sub b="V" s="DD" /></text><text x="585" y="15" textAnchor="middle">Gnd</text>
      <text x="335" y="40" textAnchor="middle">In（多晶硅/金属栅）</text><text x="335" y="315" textAnchor="middle">Out</text>
      <text x="175" y="252" textAnchor="middle">PMOS</text><text x="497" y="252" textAnchor="middle">NMOS</text>
      <text x="40" y="285">STI</text><line x1="62" y1="275" x2="85" y2="255" stroke="#222" />
      <text x="672" y="160" textAnchor="end" fontSize="12" fill="#555">图 2.2 切线</text>
    </g>
  </svg>;
}

// 高 k 金属栅叠层在 NMOS 栅边缘附近的细节（示意，厚度不按比例）
export function Fig220() {
  const c = m => MAT[m].c, xw = 360, yb = 200;
  const L = [["tox", 5, "界面氧化层", true], ["hfo", 9, "HfO2", false], ["tin", 7, "TiN", false], ["tan", 7, "TaN", false], ["tin", 9, "TiN", false]];
  let off = 0; const shapes = [], labs = [];
  L.forEach(([m, t, lab, flat], i) => {
    const o0 = off, o1 = off + t; off = o1;
    const d = flat ? `M150 ${yb - o0} H${xw} V${yb - o1} H150 Z` : `M150 ${yb - o0} H${xw - o0} V20 H${xw - o1} V${yb - o1} H150 Z`;
    shapes.push(<path key={i} d={d} fill={c(m)} stroke="#333" strokeWidth=".6" />);
    labs.push(<g key={i}><text x="14" y={70 + i * 24} fontSize="14">{lab === "HfO2" ? <Sub b="HfO" s="2" /> : lab}</text><line x1="118" y1={66 + i * 24} x2="168" y2={yb - (o0 + o1) / 2} stroke="#444" /></g>);
  });
  return <svg viewBox="0 0 640 260" style={svgStyle} role="img" aria-label="高 k 金属栅叠层在栅边缘附近的细节">
    <rect x="150" y={yb} width="480" height="60" fill={c("si")} />
    <path d={`M150 20 H${xw - off} V${yb - off} H150 Z`} fill={c("al")} stroke="#333" strokeWidth=".6" />
    {shapes}
    <path d={`M${xw} 20 V${yb} H460 V80 Q460 20 400 20 Z`} fill={c("nit")} stroke="#333" strokeWidth=".6" />
    <path d={`M400 20 H630 V${yb - 40} H520 V${yb} H460 V80 Q460 20 400 20 Z`} fill={c("ox")} stroke="#333" strokeWidth=".6" />
    <rect x="520" y={yb - 40} width="110" height="50" fill={c("tisi")} />
    <path d={`M470 ${yb} Q520 ${yb + 30} 630 ${yb + 25} V${yb} Z`} fill={MAT.np.c} />
    <g fontSize="14" fill="#222">
      <text x="14" y="46">铝 Al</text><line x1="62" y1="42" x2="190" y2="60" stroke="#444" />
      {labs}
      <text x="410" y="120" textAnchor="middle">氮化硅侧墙</text><text x="575" y="80" textAnchor="middle">氧化物填充</text>
      <text x="575" y={yb - 10} textAnchor="middle" fill="#fff"><Sub b="TiSi" s="2" /></text>
      <text x="200" y={yb + 40}>Si 沟道</text><text x="560" y={yb + 52} fill="#2a4f9e">N+ 源漏</text>
    </g>
  </svg>;
}
