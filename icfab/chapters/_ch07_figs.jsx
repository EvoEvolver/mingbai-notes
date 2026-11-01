// 第 7 章（上）自绘示意图（SVG）：图 7.1、7.2、7.3、7.5、7.6、7.7、7.8、7.10、7.11、7.16、7.17、7.22。
// 原书这些图都是示意图/结构图，按原图的内容重画，图号不变。
import { useState } from "react";
import { MAT } from "./_ch07_ui.jsx";
import { erfc } from "./_ch07_phys.jsx";

const svgStyle = { width: "100%", height: "auto", display: "block", maxWidth: 720, margin: "0 auto", fontFamily: "var(--sans)" };
const Arrow = ({ x1, y1, x2, y2, c = MAT.ink, w = 1.6 }) => {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 7;
  return <g stroke={c} fill={c} strokeWidth={w}><line x1={x1} y1={y1} x2={x2 - 0.8 * h * Math.cos(a)} y2={y2 - 0.8 * h * Math.sin(a)} />
    <path d={`M${x2},${y2} L${x2 - h * Math.cos(a - 0.4)},${y2 - h * Math.sin(a - 0.4)} L${x2 - h * Math.cos(a + 0.4)},${y2 - h * Math.sin(a + 0.4)} Z`} stroke="none" /></g>;
};
const Rs = ({ x, y, s }) => <text x={x} y={y} fontSize="13">R<tspan dy="4" fontSize="10">{s}</tspan></text>;
// 锯齿电阻符号
const Zig = ({ x1, y1, x2, y2, n = 6, amp = 5, c = MAT.ink }) => {
  const dx = (x2 - x1) / (2 * n), dy = (y2 - y1) / (2 * n), L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L;
  let d = `M${x1},${y1}`;
  for (let k = 1; k <= 2 * n; k++) { const s = k === 2 * n ? 0 : (k % 2 ? amp : -amp); d += ` L${x1 + dx * k + nx * s},${y1 + dy * k + ny * s}`; }
  return <path d={d} fill="none" stroke={c} strokeWidth={1.6} />;
};

// ---------- 图 7.1 MOS 管截面与寄生电阻 ----------
export function Fig71() {
  return (
    <svg viewBox="0 0 640 300" style={svgStyle} role="img" aria-label="MOS 晶体管截面：浅延伸区、深源漏区、硅化物与接触，以及串联寄生电阻">
      <rect x="40" y="150" width="560" height="140" fill={MAT.si} stroke="#888" />
      {/* 深源漏 */}
      <path d="M40,150 H230 Q230,205 195,205 H40 Z" fill={MAT.dopeDeep} opacity=".8" />
      <path d="M600,150 H410 Q410,205 445,205 H600 Z" fill={MAT.dopeDeep} opacity=".8" />
      {/* 浅延伸区 */}
      <path d="M220,150 H262 Q262,168 248,168 H220 Z" fill={MAT.dopeN} />
      <path d="M420,150 H378 Q378,168 392,168 H420 Z" fill={MAT.dopeN} />
      {/* 外延抬升层 + 硅化物 */}
      <rect x="40" y="128" width="190" height="22" fill="#bdbdbd" stroke="#888" /><rect x="410" y="128" width="190" height="22" fill="#bdbdbd" stroke="#888" />
      <rect x="40" y="110" width="190" height="18" fill={MAT.silicide} /><rect x="410" y="110" width="190" height="18" fill={MAT.silicide} />
      {/* 栅：栅氧、多晶、侧墙、硅化物帽 */}
      <rect x="262" y="146" width="116" height="4" fill={MAT.ox} stroke={MAT.oxEdge} strokeWidth=".8" />
      <path d="M262,146 C232,146 232,70 280,62 L280,146 Z" fill={MAT.nit} stroke="#5b8a64" /><path d="M378,146 C408,146 408,70 360,62 L360,146 Z" fill={MAT.nit} stroke="#5b8a64" />
      <rect x="280" y="62" width="80" height="84" fill={MAT.poly} /><rect x="280" y="44" width="80" height="18" fill={MAT.silicide} />
      {/* 接触柱 M1 */}
      <rect x="110" y="40" width="34" height="70" fill={MAT.metal} stroke="#a67f20" /><rect x="496" y="40" width="34" height="70" fill={MAT.metal} stroke="#a67f20" />
      {/* 寄生电阻链 */}
      <Zig x1={127} y1={50} x2={127} y2={110} n={4} /><Zig x1={127} y1={110} x2={127} y2={150} n={3} />
      <line x1="127" y1="150" x2="127" y2="172" stroke={MAT.ink} strokeWidth="1.6" />
      <Zig x1={127} y1={172} x2={225} y2={172} n={5} /><Zig x1={225} y1={172} x2={262} y2={160} n={3} /><Zig x1={262} y1={160} x2={320} y2={156} n={4} />
      <g fontSize="13" fill={MAT.ink}>
        <Rs x={150} y={70} s="C-Sil-M1" /><Rs x={150} y={138} s="C-Epi-Sil" /><text x="228" y="138">,</text><Rs x={236} y={138} s="Epi" />
        <Rs x={150} y={196} s="SD" /><Rs x={226} y={196} s="ext" /><Rs x={290} y={182} s="chan" />
        <text x="300" y="108" fill="#fff">Gate</text><text x="300" y="57" fill="#fff" fontSize="11">Silicide</text>
        <text x="512" y="35" textAnchor="middle">M1</text><text x="470" y="123" fill="#fff" fontSize="11">Silicide</text>
        <text x="480" y="143" fontSize="11">Epi</text><text x="470" y="185">Source/Drain</text><text x="384" y="178" fontSize="12">Ext</text>
        <text x="320" y="270" textAnchor="middle" fill="#555">p 型衬底（Si）</text>
      </g>
    </svg>);
}

// ---------- 图 7.2 电阻、电阻率与方块电阻 ----------
export function Fig72() {
  const box = (x, y, w, h, d, fill) => <g stroke="#666" strokeWidth="1">
    <path d={`M${x},${y} h${w} l${d},${-d * 0.6} h${-w} Z`} fill="#e9e9e9" />
    <path d={`M${x + w},${y} l${d},${-d * 0.6} v${h} l${-d},${d * 0.6} Z`} fill="#bdbdbd" />
    <rect x={x} y={y} width={w} height={h} fill={fill} /></g>;
  return (
    <svg viewBox="0 0 640 220" style={svgStyle} role="img" aria-label="左：一般形状导体的电阻；右：深度为结深的正方形薄层与方块电阻">
      {box(60, 80, 200, 90, 60, MAT.dopeP)}
      <text x="160" y="130" textAnchor="middle" fontSize="15">面积 A</text>
      <line x1="60" y1="190" x2="260" y2="190" stroke="#333" /><text x="160" y="208" textAnchor="middle" fontSize="14">L</text>
      <text x="160" y="40" textAnchor="middle" fontSize="16" fontStyle="italic">R = ρL / A</text>
      {box(380, 120, 160, 22, 90, MAT.dopeP)}
      <text x="460" y="40" textAnchor="middle" fontSize="16" fontStyle="italic">ρ<tspan dy="4" fontSize="11">S</tspan><tspan dy="-4"> = ρ / x</tspan><tspan dy="4" fontSize="11">j</tspan></text>
      <line x1="380" y1="162" x2="540" y2="162" stroke="#333" /><text x="460" y="182" textAnchor="middle" fontSize="14">L</text>
      <line x1="635" y1="66" x2="555" y2="114" stroke="#333" /><text x="606" y="80" fontSize="14">L</text>
      <line x1="372" y1="120" x2="372" y2="142" stroke="#333" /><text x="346" y="137" fontSize="14" fontStyle="italic">x<tspan dy="4" fontSize="10">j</tspan></text>
    </svg>);
}

// ---------- 图 7.3 两步法：注入/预淀积 + 推进 ----------
export function Fig73() {
  const xs = Array.from({ length: 60 }, (_, i) => i / 59);
  const path = f => xs.map((u, i) => `${i ? "L" : "M"}${410 + u * 200},${60 + (1 - f(u)) * 150}`).join("");
  return (
    <svg viewBox="0 0 640 230" style={svgStyle} role="img" aria-label="左：掩模窗口中先注入受控剂量，再推进扩散成深结；右：两种分布沿切线的浓度-深度示意">
      <rect x="20" y="70" width="330" height="150" fill={MAT.si} stroke="#888" />
      <rect x="20" y="58" width="110" height="12" fill={MAT.ox} stroke={MAT.oxEdge} /><rect x="240" y="58" width="110" height="12" fill={MAT.ox} stroke={MAT.oxEdge} />
      <path d="M95,70 H275 V110 Q275,180 210,180 H160 Q95,180 95,110 Z" fill={MAT.dopeP} opacity=".75" />
      <rect x="130" y="70" width="110" height="16" rx="6" fill="#4f7fb0" />
      {[50, 90, 150, 185, 220, 280, 320].map(x => <Arrow key={x} x1={x} y1={8} x2={x} y2={50} />)}
      <line x1="185" y1="70" x2="185" y2="220" stroke="#333" strokeDasharray="4 4" />
      <text x="40" y="205" fontSize="13">注入：剂量受控</text><text x="230" y="205" fontSize="13">推进：剂量恒定</text>
      <line x1="410" y1="210" x2="620" y2="210" stroke="#333" /><line x1="410" y1="210" x2="410" y2="50" stroke="#333" />
      <path d={path(u => (u < 0.3 ? 0.95 * Math.exp(-Math.pow(u / 0.18, 2)) : 0.95 * Math.exp(-Math.pow(u / 0.18, 2))))} fill="none" stroke="#4f7fb0" strokeWidth="2.2" />
      <path d={path(u => 0.55 * Math.exp(-Math.pow(u / 0.6, 2)))} fill="none" stroke={MAT.dopeDeep} strokeWidth="2.2" />
      <text x="470" y="80" fontSize="13" fill="#4f7fb0">注入后（浅、高）</text><text x="520" y="150" fontSize="13" fill={MAT.dopeDeep}>推进后（深、低）</text>
      <text x="515" y="226" fontSize="12" textAnchor="middle">深度</text><text x="396" y="130" fontSize="12" transform="rotate(-90 396 130)" textAnchor="middle">浓度</text>
    </svg>);
}

// ---------- 图 7.5 As 替位 vs As4V 失活团簇 ----------
export function Fig75() {
  const atom = (x, y, r, fill, label, tc = "#fff", sup) => <g><circle cx={x} cy={y} r={r} fill={fill} stroke="#555" /><text x={x} y={y + 5} textAnchor="middle" fontSize="13" fill={tc}>{label}{sup && <tspan dy="-6" fontSize="10">{sup}</tspan>}</text></g>;
  const As = "#6d4a8c", Si = "#bdbdbd";
  const L = [[160, 40], [90, 150], [235, 160], [160, 195]], R = [[480, 30], [410, 165], [570, 140], [495, 205]];
  return (
    <svg viewBox="0 0 640 240" style={svgStyle} role="img" aria-label="左：替位的电离砷与四个硅近邻；右：四个砷原子环绕一个空位，电中性失活">
      {L.map(([x, y], i) => <line key={i} x1={160} y1={115} x2={x} y2={y} stroke="#333" strokeWidth="4" />)}
      {L.map(([x, y], i) => atom(x, y, 20, Si, i === 0 ? "Si" : "", "#333"))}
      {atom(160, 115, 24, As, "As", "#fff", "+")}
      <circle cx="186" cy="96" r="3" fill="#333" />
      {R.map(([x, y], i) => <line key={i} x1={490} y1={110} x2={x} y2={y} stroke="#333" strokeWidth="4" />)}
      <text x="490" y="117" textAnchor="middle" fontSize="18">V</text>
      {R.map(([x, y], i) => <g key={i}>{atom(x, y, 22, As, "As")}<circle cx={x + (490 - x) * 0.32 - 4} cy={y + (110 - y) * 0.32} r="2.5" fill="#333" /><circle cx={x + (490 - x) * 0.32 + 4} cy={y + (110 - y) * 0.32} r="2.5" fill="#333" /></g>)}
      <text x="160" y="232" textAnchor="middle" fontSize="13">替位 As：电离，贡献 1 个电子</text>
      <text x="490" y="236" textAnchor="middle" fontSize="13">As₄V：每个 As 留一对孤对电子，电中性</text>
    </svg>);
}

// ---------- 图 7.6 Fick 第一定律（可拖动选点看通量）----------
export function Fig76() {
  const [u, setU] = useState(0.45);
  const W = 520, H = 230, x0 = 70, y0 = 200, sx = 380, sy = 160;
  const c1 = x => (x < 1 ? Math.log10(erfc(x / 0.5) + 1e-6) : -6), c2 = x => Math.log10(erfc(x / 0.75) + 1e-6);
  const P = (f, k) => Array.from({ length: 120 }, (_, i) => { const x = i / 119; return `${i ? "L" : "M"}${x0 + x * sx},${y0 - (f(x) + 4) / 4 * sy * 0.95}`; }).join("");
  const g = (c2(u + 0.01) - c2(u - 0.01)) / 0.02, yy = y0 - (c2(u) + 4) / 4 * sy * 0.95, len = Math.min(110, -g * 25);
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ ...svgStyle, maxWidth: 560 }} role="img" aria-label="对数坐标下两个时刻的扩散分布，通量正比于浓度梯度、沿梯度下降方向">
        <line x1={x0} y1={y0} x2={x0 + sx + 20} y2={y0} stroke="#333" strokeWidth="1.5" /><line x1={x0} y1={y0} x2={x0} y2={20} stroke="#333" strokeWidth="1.5" />
        <path d={P(c1)} fill="none" stroke="#888" strokeWidth="2" /><path d={P(c2)} fill="none" stroke="#c0392b" strokeWidth="2" />
        <text x={x0 + 0.42 * sx} y={y0 - 20} fontSize="13" fill="#666">t₁</text><text x={x0 + 0.66 * sx} y={y0 - 20} fontSize="13" fill="#c0392b">t₂</text>
        <circle cx={x0 + u * sx} cy={yy} r="5" fill="#c0392b" />
        <Arrow x1={x0 + u * sx} y1={yy - 18} x2={x0 + u * sx + len} y2={yy - 18} c="#1f1b16" w={3} />
        <text x={x0 + u * sx + 6} y={yy - 28} fontSize="13">F = −D ∂C/∂x</text>
        <text x={x0 + sx / 2} y={y0 + 22} fontSize="13" textAnchor="middle">深度 x</text>
        <text x={x0 - 14} y={110} fontSize="13" transform={`rotate(-90 ${x0 - 14} 110)`} textAnchor="middle">浓度（对数）</text>
      </svg>
      <label className="plot-param" style={{ justifyContent: "center" }}>拖动选点：
        <input type="range" min="0.05" max="0.95" step="0.01" value={u} onChange={e => setU(+e.target.value)} /></label>
    </div>);
}

// ---------- 图 7.7 体积元的进出通量 ----------
export function Fig77() {
  return (
    <svg viewBox="0 0 420 200" style={{ ...svgStyle, maxWidth: 440 }} role="img" aria-label="一个薄体积元：左侧流入通量，右侧流出通量，体积元内浓度随之变化">
      <path d="M170,60 l70,-40 h0 v110 l-70,40 Z" fill="#e7e7e7" stroke="#555" />
      <path d="M170,60 l70,-40 l-40,0 l-70,40 Z" fill="#9c9c9c" stroke="#555" transform="translate(40,0)" />
      <rect x="130" y="60" width="40" height="110" fill="#a8a8a8" stroke="#555" />
      <path d="M130,60 l40,0 l70,-40 l-40,0 Z" fill="#8a8a8a" stroke="#555" />
      <text x="150" y="122" textAnchor="middle" fontSize="15" fill="#fff">ΔC</text>
      <Arrow x1={40} y1={110} x2={126} y2={110} /><text x="60" y="98" fontSize="15">F<tspan dy="4" fontSize="11">in</tspan></text>
      <Arrow x1={250} y1={90} x2={340} y2={90} /><text x="300" y="78" fontSize="15">F<tspan dy="4" fontSize="11">out</tspan></text>
      <text x="150" y="192" textAnchor="middle" fontSize="15">Δx</text>
    </svg>);
}

// 归一化坐标下的小图框
function MiniAxes({ W, H, x0, y0, sx, sy, xt, yt, xl, children }) {
  return <svg viewBox={`0 0 ${W} ${H}`} style={{ ...svgStyle, maxWidth: 560 }}>
    <rect x={x0} y={y0 - sy} width={sx} height={sy} fill="none" stroke="#333" />
    {xt.map(([v, s]) => <g key={"x" + v}><line x1={x0 + v * sx} x2={x0 + v * sx} y1={y0} y2={y0 + 4} stroke="#333" /><text x={x0 + v * sx} y={y0 + 18} fontSize="12" textAnchor="middle">{s}</text></g>)}
    {yt.map(([v, s]) => <g key={"y" + v}><line x1={x0 - 4} x2={x0} y1={y0 - v * sy} y2={y0 - v * sy} stroke="#333" /><text x={x0 - 7} y={y0 - v * sy + 4} fontSize="12" textAnchor="end">{s}</text></g>)}
    <text x={x0 + sx / 2} y={y0 + 36} fontSize="13" textAnchor="middle">{xl}</text>
    {children}
  </svg>;
}

// ---------- 图 7.8 δ 函数（剂量 Q）在无限介质中扩散成高斯 ----------
export function Fig78() {
  const W = 520, H = 250, x0 = 60, y0 = 200, sx = 420, sy = 170, X = u => x0 + (u + 2) / 4 * sx, Y = v => y0 - v / 1.4 * sy;
  const g = Array.from({ length: 160 }, (_, i) => { const u = -2 + 4 * i / 159; return `${i ? "L" : "M"}${X(u)},${Y(Math.exp(-u * u))}`; }).join("");
  return (
    <MiniAxes W={W} H={H} x0={x0} y0={y0} sx={sx} sy={sy} xl={<>x，以 2√(Dt) 为单位</>}
      xt={[-2, -1, 0, 1, 2].map(v => [(v + 2) / 4, String(v)])} yt={[0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4].map(v => [v / 1.4, v.toFixed(1)])}>
      <rect x={X(0) - 4} y={Y(1.25)} width="8" height={Y(0) - Y(1.25)} fill="#9c9c9c" stroke="#333" />
      <path d={g} fill="none" stroke="#c0392b" strokeWidth="2.2" />
      <text x={X(-1.7)} y={Y(1.3)} fontSize="13">δ 函数：剂量 Q</text><Arrow x1={X(-0.7)} y1={Y(1.26)} x2={X(-0.05)} y2={Y(1.18)} />
      <text x={X(0.9)} y={Y(0.75)} fontSize="13" fill="#c0392b">高斯分布</text>
      <text x={x0 - 44} y={y0 - sy / 2} fontSize="12" transform={`rotate(-90 ${x0 - 44} ${y0 - sy / 2})`} textAnchor="middle">归一化浓度</text>
    </MiniAxes>);
}

// ---------- 图 7.10 表面高斯 = 剂量 2Q 的体内高斯（镜像）----------
export function Fig710() {
  const W = 520, H = 250, x0 = 60, y0 = 200, sx = 420, sy = 170, X = u => x0 + (u + 2) / 4 * sx, Y = v => y0 - v / 1.4 * sy;
  const g = (a, b) => Array.from({ length: 100 }, (_, i) => { const u = a + (b - a) * i / 99; return `${i ? "L" : "M"}${X(u)},${Y(Math.exp(-u * u))}`; }).join("");
  return (
    <MiniAxes W={W} H={H} x0={x0} y0={y0} sx={sx} sy={sy} xl={<>x，以 2√(Dt) 为单位（x &gt; 0 为硅）</>}
      xt={[-2, -1, 0, 1, 2].map(v => [(v + 2) / 4, String(v)])} yt={[0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4].map(v => [v / 1.4, v.toFixed(1)])}>
      <rect x={x0} y={y0 - sy} width={X(0) - x0} height={sy} fill="#eef3f7" />
      <rect x={X(0) - 8} y={Y(1.25)} width="8" height={Y(0) - Y(1.25)} fill="#bcbcbc" stroke="#333" />
      <rect x={X(0)} y={Y(1.25)} width="8" height={Y(0) - Y(1.25)} fill="#9c9c9c" stroke="#333" />
      <path d={g(-2, 0)} fill="none" stroke="#c0392b" strokeWidth="2" strokeDasharray="6 5" /><path d={g(0, 2)} fill="none" stroke="#c0392b" strokeWidth="2.4" />
      <text x={X(-1.9)} y={Y(1.3)} fontSize="12">镜像 δ：剂量 Q</text><text x={X(0.3)} y={Y(1.3)} fontSize="12">真实 δ：剂量 Q</text>
      <text x={X(0.9)} y={Y(0.75)} fontSize="13" fill="#c0392b">表面高斯</text><text x={X(-1.9)} y={Y(0.15)} fontSize="12" fill="#6f9fbd">虚拟介质</text>
    </MiniAxes>);
}

// ---------- 图 7.11 无限源 = 一排薄片的高斯叠加（erfc）----------
export function Fig711() {
  const [s, setS] = useState(0.5);    // 扩散程度 2√(Dt)（以图宽为尺度）
  const W = 520, H = 250, x0 = 60, y0 = 200, sx = 420, sy = 160, X = u => x0 + (u + 2) / 3 * sx, Y = v => y0 - v * sy;
  const d = Array.from({ length: 160 }, (_, i) => { const u = -2 + 3 * i / 159; return `${i ? "L" : "M"}${X(u)},${Y(0.5 * erfc(u / s))}`; }).join("");
  const slice = -1.1, w = 0.08, gs = Array.from({ length: 120 }, (_, i) => { const u = -2 + 3 * i / 119; return `${i ? "L" : "M"}${X(u)},${Y(w / (s * Math.sqrt(Math.PI)) * Math.exp(-Math.pow((u - slice) / s, 2)) * 2.2)}`; }).join("");
  return (
    <div>
      <MiniAxes W={W} H={H} x0={x0} y0={y0} sx={sx} sy={sy} xl="x（源区 x < 0）" xt={[[2 / 3, "0"], [(slice + 2) / 3, <>x<tspan dy="3" fontSize="9">i</tspan></>]]} yt={[[0, "0"], [1, "C"]]}>
        <path d={`M${X(-2)},${Y(1)} H${X(0)} V${Y(0)}`} fill="none" stroke="#333" strokeWidth="1.5" />
        <rect x={X(slice) - (X(w) - X(0)) / 2} y={Y(1)} width={X(w) - X(0)} height={sy} fill="url(#hatch711)" stroke="#555" />
        <defs><pattern id="hatch711" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke="#888" strokeWidth="2" /></pattern></defs>
        <path d={gs} fill="none" stroke="#2c4a6e" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d={d} fill="none" stroke="#c0392b" strokeWidth="2.4" />
        <text x={X(-1.6)} y={Y(1.08)} fontSize="13">剂量 CΔx 的薄片</text><text x={X(0.15)} y={Y(0.95)} fontSize="13">初始分布</text>
        <text x={X(0.35)} y={Y(0.3)} fontSize="13" fill="#c0392b">扩散后：C/2·erfc</text>
        <text x={X(-1.95)} y={Y(0.12)} fontSize="12" fill="#2c4a6e">单片扩散成的高斯（放大）</text>
      </MiniAxes>
      <label className="plot-param" style={{ justifyContent: "center" }}>扩散程度 2√(Dt)：
        <input type="range" min="0.05" max="1.2" step="0.01" value={s} onChange={e => setS(+e.target.value)} /></label>
    </div>);
}

// ---------- 图 7.16 原子平面间的跳跃 ----------
export function Fig716() {
  return (
    <svg viewBox="0 0 520 200" style={{ ...svgStyle, maxWidth: 540 }} role="img" aria-label="等间距的原子平面 0 到 4，每个平面上的原子以相同概率向左或向右跳">
      {[0, 1, 2, 3, 4].map(i => <g key={i}><line x1={70 + i * 95} y1={40} x2={70 + i * 95} y2={170} stroke="#777" strokeWidth="2" /><text x={70 + i * 95} y={190} textAnchor="middle" fontSize="14">{i}</text></g>)}
      {[1, 2, 3].map(i => <g key={i} fill="none" stroke="#777" strokeWidth="1.8"><path d={`M${70 + i * 95 - 35},${100} Q${70 + i * 95},${40} ${70 + i * 95 + 35},${100}`} />
        <path d={`M${70 + i * 95 + 35},${100} l-6,-10 M${70 + i * 95 + 35},${100} l6,-9`} /><path d={`M${70 + i * 95 - 35},${100} l-6,-9 M${70 + i * 95 - 35},${100} l6,-10`} /></g>)}
      {[0, 1, 2, 3].map(i => <text key={i} x={117 + i * 95} y={130} textAnchor="middle" fontSize="15">N<tspan dy="4" fontSize="11">{i}</tspan></text>)}
      <line x1="70" y1="25" x2="165" y2="25" stroke="#333" /><path d="M70,25 l8,-4 v8 Z M165,25 l-8,-4 v8 Z" fill="#333" /><text x="117" y="18" textAnchor="middle" fontSize="14">Δx</text>
    </svg>);
}

// ---------- 图 7.17 内建电场：电子跑在电离施主前面 ----------
export function Fig717() {
  const x0 = 70, y0 = 200, sx = 360, sy = 160;
  const As = Array.from({ length: 80 }, (_, i) => { const u = i / 79; const v = 1 - Math.pow(u / 0.62, 4); return `${i ? "L" : "M"}${x0 + u * 0.62 * sx},${y0 - Math.max(v, 0) * sy}`; }).join("");
  const el = Array.from({ length: 80 }, (_, i) => { const u = i / 79; const v = 0.78 - 0.78 * Math.pow(u, 3.2); return `${i ? "L" : "M"}${x0 + u * 0.8 * sx},${y0 - Math.max(v, 0) * sy}`; }).join("");
  return (
    <svg viewBox="0 0 520 240" style={{ ...svgStyle, maxWidth: 560 }} role="img" aria-label="对数浓度-深度图：As 分布陡、电子分布更靠前，二者分离产生指向体内的电场">
      <line x1={x0} y1={y0} x2={x0 + sx + 30} y2={y0} stroke="#333" strokeWidth="1.5" /><line x1={x0} y1={y0} x2={x0} y2={20} stroke="#333" strokeWidth="1.5" />
      <path d={As} fill="none" stroke="#1f1b16" strokeWidth="2.4" /><path d={el} fill="none" stroke="#7d7d7d" strokeWidth="2.4" />
      {[[0.06, 0.98], [0.14, 0.95], [0.22, 0.9]].map(([u, v], i) => <g key={i}><circle cx={x0 + u * sx} cy={y0 - v * sy + 12} r="7" fill="#fff" stroke="#333" /><text x={x0 + u * sx} y={y0 - v * sy + 16} fontSize="11" textAnchor="middle">+</text></g>)}
      {[0.6, 0.66, 0.71, 0.75].map((u, i) => <g key={i}><circle cx={x0 + u * sx + 6} cy={y0 - (0.78 - 0.78 * Math.pow(u / 0.8, 3.2)) * sy + 8} r="7" fill="#fff" stroke="#333" /><text x={x0 + u * sx + 6} y={y0 - (0.78 - 0.78 * Math.pow(u / 0.8, 3.2)) * sy + 12} fontSize="12" textAnchor="middle">−</text></g>)}
      <Arrow x1={x0 + 0.15 * sx} y1={y0 - 0.66 * sy} x2={x0 + 0.62 * sx} y2={y0 - 0.66 * sy} c="#7d7d7d" w={3.5} />
      <text x={x0 + 0.65 * sx} y={y0 - 0.64 * sy} fontSize="14">ℰ 场</text>
      <text x={x0 + 0.3 * sx} y={y0 - 1.03 * sy} fontSize="14">As⁺ 分布</text><text x={x0 + 0.72 * sx} y={y0 - 0.38 * sy} fontSize="14" fill="#666">电子分布</text>
      <text x={x0 + sx / 2} y={y0 + 22} fontSize="13" textAnchor="middle">深度</text>
      <text x={x0 - 14} y={110} fontSize="13" transform={`rotate(-90 ${x0 - 14} 110)`} textAnchor="middle">浓度（对数）</text>
    </svg>);
}

// ---------- 图 7.22 界面单层剂量损失 ----------
export function Fig722() {
  const p = Array.from({ length: 60 }, (_, i) => { const u = i / 59; return `${i ? "L" : "M"}${172 + 70 * Math.pow(u, 1.8)},${120 + u * 110}`; }).join("");
  return (
    <svg viewBox="0 0 520 250" style={{ ...svgStyle, maxWidth: 540 }} role="img" aria-label="氧化层与硅之间一个单层厚的界面层捕获砷，造成剂量损失">
      <rect x="110" y="20" width="60" height="215" fill={MAT.ox} stroke={MAT.oxEdge} />
      <rect x="170" y="20" width="300" height="215" fill="#e6e6e6" stroke="#888" />
      <rect x="168" y="20" width="6" height="100" fill="#5a3c78" />
      <path d={p} fill="none" stroke={MAT.dopeDeep} strokeWidth="2.6" />
      <text x="140" y="130" fontSize="14" textAnchor="middle" transform="rotate(-90 140 130)">氧化层</text>
      <text x="215" y="45" fontSize="14">单层剂量损失（失活、被捕获）</text><Arrow x1={210} y1={52} x2={178} y2={80} />
      <text x="255" y="160" fontSize="14" fill={MAT.dopeDeep}>As 分布</text>
      <text x="390" y="140" fontSize="14" textAnchor="middle">硅衬底</text>
    </svg>);
}
