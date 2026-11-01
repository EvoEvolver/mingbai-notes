// 第 10 章自绘插图（二）：图 10.25–10.29、10.31–10.35、10.37、10.38。
import { useState } from "react";
import { M } from "@kit";
import { Svg, Ar, Path, T, Rect, Ball, Range, C, box, btn, rowS, chem } from "./_ch10_svg.jsx";

const R = String.raw;

// ---------- 图 10.25 ALD 的六个步骤 ----------
const Hh = (x, y) => <Ball x={x} y={y} r={3.6} f="#f2f2f2" s="#888" />;
const Ox = (x, y) => <Ball x={x} y={y} r={7.5} f="#d65a4a" s="#7a2e25" />;
const Al = (x, y) => <Ball x={x} y={y} r={10} f="#9aa3ad" s="#4d545c" />;
const Me = (x, y) => <g><Ball x={x} y={y} r={5.5} f="#40464d" s="#222" />{Hh(x - 5, y - 5)}{Hh(x + 5, y - 5)}</g>;
function Panel({ x, y, k, label, children }) {
  return <g><Rect x={x} y={y + 92} w={200} h={14} f={C.si} /><T x={x + 6} y={y + 104} a="start" s={11}>({k})</T>{children}<T x={x + 100} y={y + 124} s={12}>{label}</T></g>;
}
export function Fig1025() {
  const sites = [40, 100, 160];
  const OH = (x, y0) => sites.map(s => <g key={s}><line x1={x + s} y1={y0 + 92} x2={x + s} y2={y0 + 78} stroke="#555" strokeWidth={2} />{Ox(x + s, y0 + 72)}{Hh(x + s, y0 + 62)}</g>);
  const AlMe2 = (x, y0, n = 3) => sites.slice(0, n).map(s => <g key={s}><line x1={x + s} y1={y0 + 92} x2={x + s} y2={y0 + 78} stroke="#555" strokeWidth={2} />{Ox(x + s, y0 + 72)}{Al(x + s, y0 + 54)}{Me(x + s - 13, y0 + 44)}{Me(x + s + 13, y0 + 44)}</g>);
  return <Svg title="ALD 循环六步：羟基化表面、TMA 与羟基反应、第一层单分子层、H2O 脉冲、H2O 与甲基反应放出甲烷、新的羟基化表面" h={330}><g transform="translate(0,18)">
    <Panel x={10} y={0} k="a" label="羟基化的 Si 表面">{OH(10, 0)}<g>{Al(150, 18)}{Me(136, 10)}{Me(164, 10)}{Me(150, 34)}</g><T x={185} y={20} a="start" s={11}>TMA</T></Panel>
    <Panel x={240} y={0} k="b" label={<>TMA 与 –OH 反应，放出 CH₄</>}>{OH(240, 0).filter((_, i) => i !== 1)}{AlMe2(240, 0).filter((_, i) => i === 1)}<g>{Me(400, 14)}{Hh(410, 6)}</g><T x={420} y={30} a="start" s={11}>CH₄</T></Panel>
    <Panel x={470} y={0} k="c" label={<>第一层：表面被 –CH₃ 钝化</>}>{AlMe2(470, 0)}<g>{Al(640, 14)}{Me(626, 6)}{Me(654, 6)}</g><T x={640} y={40} s={10} c={C.mute}>多余 TMA 不再反应</T></Panel>
    <Panel x={10} y={150} k="d" label={<>吹扫后通入 H₂O</>}>{AlMe2(10, 150)}{[60, 150].map(x => <g key={x}>{Ox(x, 166)}{Hh(x - 7, 160)}{Hh(x + 7, 160)}</g>)}</Panel>
    <Panel x={240} y={150} k="e" label={<>H₂O 与甲基反应，放出 2CH₄</>}>{sites.map(s => <g key={s}><line x1={240 + s} y1={242} x2={240 + s} y2={228} stroke="#555" strokeWidth={2} />{Ox(240 + s, 222)}{Al(240 + s, 204)}{s === 100 ? <>{Ox(253 + s, 190)}{Hh(259 + s, 182)}{Ox(240 + s, 184)}{Hh(240 + s, 175)}</> : <>{Me(227 + s, 194)}{Me(253 + s, 194)}</>}</g>)}{Me(400, 162)}</Panel>
    <Panel x={470} y={150} k="f" label="新的羟基表面（Al–O–Al 桥）">{sites.map(s => <g key={s}><line x1={470 + s} y1={242} x2={470 + s} y2={228} stroke="#555" strokeWidth={2} />{Ox(470 + s, 222)}{Al(470 + s, 204)}{Ox(470 + s, 186)}{Hh(470 + s, 176)}</g>)}{[70, 130].map(s => <g key={s}>{Ox(470 + s, 200)}</g>)}</Panel>
    <g transform="translate(10,296)">{Al(8, 0)}<T x={22} y={5} a="start" s={11}>Al</T>{Ox(58, 0)}<T x={70} y={5} a="start" s={11}>O</T>{Hh(100, 0)}<T x={108} y={5} a="start" s={11}>H</T>{Me(140, 0)}<T x={152} y={5} a="start" s={11}>CH₃</T></g>
  </g></Svg>;
}

// ---------- 图 10.26 两个完整循环 ----------
export function Fig1026() {
  const row = (y, f, r, n = 9, dx = 0) => Array.from({ length: n }, (_, i) => <Ball key={i} x={130 + i * 46 + dx} y={y} r={r} f={f} s="#555" />);
  return <Svg title="两个完整 ALD 循环沉积两层，每循环约 1 埃" h={250}>
    <Rect x={100} y={180} w={440} h={50} f={C.si} /><T x={320} y={212}>衬底</T>
    {row(170, "#d65a4a", 8)}<T x={560} y={174} a="start" s={12}>羟基化层</T>
    {row(146, "#9aa3ad", 11)}{row(126, "#d65a4a", 8, 9, 23).slice(0, 8)}
    {row(104, "#9aa3ad", 11)}{row(84, "#d65a4a", 8, 9, 23).slice(0, 8)}
    {row(64, "#d65a4a", 8)}{Array.from({ length: 9 }, (_, i) => <Ball key={i} x={130 + i * 46} y={54} r={3.6} f="#f2f2f2" s="#888" />)}
    <Ar x1={590} y1={150} x2={590} y2={122} both c="g" w={1.2} /><T x={600} y={140} a="start" s={12} c={C.green}>第 1 周期 ≈ 1 Å</T>
    <Ar x1={590} y1={108} x2={590} y2={80} both c="g" w={1.2} /><T x={600} y={98} a="start" s={12} c={C.green}>第 2 周期</T>
    <T x={320} y={30} s={12} c={C.mute}>示意：真实 ALD Al₂O₃ 为非晶，图中画成规则排列只为数层</T>
  </Svg>;
}

// ---------- 图 10.27 直流辉光放电与电位分布 ----------
export function Fig1027() {
  return <Svg title="直流等离子体：阴极接负高压，阳极接地；右侧为电极间电位分布：阴极鞘层承受几乎全部电压，等离子体略高于地电位" h={280}>
    <circle cx={70} cy={140} r={24} fill="#fff" stroke="#555" /><Ar x1={70} y1={154} x2={70} y2={126} w={1.2} /><T x={40} y={144} a="end" it>V<tspan fontSize="10" dy="3">DC</tspan></T>
    <T x={88} y={110} s={16}>−</T><T x={88} y={182} s={16}>+</T>
    <path d="M 70 116 L 70 40 L 110 40 l 6 -8 l 8 16 l 8 -16 l 8 16 l 8 -16 l 6 8 L 230 40 L 230 70" fill="none" stroke="#555" strokeWidth={1.5} /><T x={140} y={62} s={12} it>R</T>
    <path d="M 70 164 L 70 250 M 55 250 L 85 250 M 60 256 L 80 256 M 66 262 L 74 262" stroke="#555" strokeWidth={1.5} />
    <Rect x={170} y={60} w={120} h={170} r={50} f="#fbfaf6" />
    <Rect x={180} y={84} w={100} h={10} f="#666" /><T x={230} y={78} s={12}>阴极</T>
    <Rect x={180} y={200} w={100} h={10} f="#666" /><T x={230} y={226} s={12}>阳极</T>
    <Rect x={186} y={110} w={88} h={78} f={C.plasma} r={8} /><T x={230} y={154} s={12}>Ar⁺ + e⁻</T>
    <path d="M 230 230 L 230 262 M 215 262 L 245 262" stroke="#555" strokeWidth={1.5} />
    {/* 电位分布 */}
    <line x1={420} y1={90} x2={620} y2={90} stroke="#333" strokeWidth={2} /><line x1={420} y1={205} x2={620} y2={205} stroke="#333" strokeWidth={2} />
    <line x1={500} y1={60} x2={500} y2={240} stroke="#999" strokeDasharray="3 3" />
    <path d="M 440 90 L 512 112 L 512 190 L 500 205" fill="none" stroke={C.red} strokeWidth={2.5} />
    <T x={440} y={80} it>−V<tspan fontSize="10" dy="3">D</tspan></T><T x={520} y={80} it>V<tspan fontSize="10" dy="3">P</tspan></T><T x={500} y={258}>0（电位）</T>
    <Rect x={530} y={110} w={80} h={80} f={C.plasma} r={8} /><T x={570} y={154} s={12}>Ar⁺ + e⁻</T>
    <T x={410} y={108} a="end" s={12}>阴极鞘层（暗区）</T><T x={410} y={150} a="end" s={12}>负辉光（等离子体）</T><T x={410} y={200} a="end" s={12}>阳极鞘层</T>
    <Ar x1={530} y1={120} x2={515} y2={98} c="r" w={1.2} /><T x={556} y={102} a="start" s={11} c={C.red}>Ar⁺ 被加速撞击阴极</T>
  </Svg>;
}

// ---------- 图 10.28 两种直流溅射布局 ----------
export function Fig1028() {
  return <Svg title="左：短间距直流溅射，靶为阴极、衬底放在接地阳极上；右：实用布局，用周边阳极承接直流电流" h={260}>
    <Rect x={50} y={40} w={240} h={190} f="#fbfaf6" r={8} />
    <Rect x={80} y={60} w={180} h={16} f={C.metal} /><T x={170} y={56} s={12}>阴极（靶）</T>
    <Rect x={80} y={90} w={180} h={80} f={C.plasma} r={6} /><T x={170} y={134} s={12}>辉光放电</T>
    <Rect x={110} y={176} w={120} h={8} f={C.si} /><Rect x={80} y={184} w={180} h={14} f="#666" /><T x={170} y={216} s={12}>阳极（接地）+ 衬底</T>
    <T x={170} y={250} s={12}>真空室，Ar 进气</T>
    <Rect x={380} y={40} w={260} h={190} f="#fbfaf6" r={8} />
    <Rect x={450} y={60} w={120} h={16} f={C.metal} /><T x={510} y={56} s={12}>靶（阴极，−）</T>
    {[[400, 60], [600, 60]].map(([x, y], i) => <Rect key={i} x={x} y={y} w={22} h={110} f="#888" />)}<T x={410} y={190} s={11}>周边阳极</T>
    <path d="M 456 80 L 420 170 L 600 170 L 564 80 Z" fill={C.plasma} opacity={0.7} />
    <Rect x={450} y={196} w={120} h={10} f={C.si} /><T x={510} y={222} s={12}>衬底（不必是阳极）</T>
    {[470, 510, 550].map(x => <Ar key={x} x1={x} y1={84} x2={x + (x - 510) * 0.4} y2={192} c="o" w={1.2} dash="4 3" />)}
  </Svg>;
}

// ---------- 图 10.29 平面磁控溅射靶 ----------
export function Fig1029() {
  return <Svg title="平面磁控靶：靶后永磁体产生平行于靶面的磁场，电子在正交电磁场中绕行，形成跑道形的高密度等离子体" h={250}>
    <Rect x={80} y={150} w={520} h={22} f={C.metal} /><T x={620} y={166} a="start" s={12}>靶</T>
    {[[110, "N", "S"], [320, "S", "N"], [530, "N", "S"]].map(([x, a, b], i) => <g key={i}><Rect x={x} y={176} w={40} h={26} f={a === "N" ? "#c0392b" : "#2c4a6e"} /><Rect x={x} y={202} w={40} h={26} f={b === "N" ? "#c0392b" : "#2c4a6e"} /><T x={x + 20} y={194} c="#fff" s={12}>{a}</T><T x={x + 20} y={220} c="#fff" s={12}>{b}</T></g>)}
    {[[150, 320], [360, 530]].map(([a, b], i) => <g key={i}><path d={`M ${a} 170 Q ${(a + b) / 2} 40 ${b} 170`} fill="none" stroke="#555" strokeDasharray="5 4" /><path d={`M ${a + 30} 170 Q ${(a + b) / 2} 90 ${b - 30} 170`} fill="none" stroke="#555" strokeDasharray="5 4" />
      <ellipse cx={(a + b) / 2} cy={128} rx={50} ry={14} fill={C.plasma} opacity={0.85} />
      <path d={`M ${(a + b) / 2 - 40} 132 q 10 -14 20 0 q 10 14 20 0 q 10 -14 20 0 q 10 14 20 0`} fill="none" stroke={C.red} strokeWidth={1.5} />
      <Rect x={(a + b) / 2 - 26} y={150} w={52} h={7} f="#fffdf8" s="none" /></g>)}
    <T x={235} y={60} s={12}>B</T><T x={445} y={60} s={12}>B</T>
    <Ar x1={235} y1={110} x2={235} y2={146} c="b" w={1.2} /><T x={248} y={104} a="start" s={11} c={C.blue}>ℰ</T>
    <T x={340} y={30} s={12} c={C.mute}>红色螺旋：被 ℰ × B 约束的二次电子；白色凹槽：跑道形刻蚀沟</T>
  </Svg>;
}

// ---------- 图 10.31 射频溅射 ----------
export function Fig1031() {
  return <Svg title="射频溅射：小电极为靶，经匹配网络与隔直电容接射频电源；晶圆放在大的接地电极上" h={270}>
    <Rect x={40} y={50} w={110} h={40} f="#fff" /><T x={95} y={75} s={12}>匹配网络</T>
    <Rect x={40} y={130} w={110} h={40} f="#fff" /><T x={95} y={155} s={12}>射频电源</T>
    <line x1={95} y1={90} x2={95} y2={130} stroke="#555" /><path d="M 95 170 L 95 200 M 80 200 L 110 200 M 85 206 L 105 206" stroke="#555" />
    <path d="M 150 70 L 240 70 M 240 58 L 240 82 M 250 58 L 250 82 M 250 70 L 330 70 L 330 98" stroke="#555" strokeWidth={1.5} fill="none" /><T x={245} y={48} s={12}>隔直电容</T>
    <Rect x={200} y={90} w={300} h={160} f="#fbfaf6" />
    <Rect x={280} y={98} w={100} h={14} f={C.metal} /><T x={460} y={110} a="start" s={12}>溅射靶（小电极）</T>
    <path d="M 284 116 L 230 172 L 430 172 L 376 116 Z" fill={C.plasma} opacity={0.7} />
    <Rect x={260} y={178} w={140} h={10} f={C.si} /><Rect x={220} y={188} w={220} h={14} f="#555" /><T x={460} y={186} a="start" s={12}>晶圆（大电极，接地）</T>
    <line x1={330} y1={202} x2={330} y2={250} stroke="#555" />
    <Ar x1={260} y1={268} x2={260} y2={250} c="m" /><T x={250} y={266} a="end" s={12}>Ar 进气</T>
    <Ar x1={420} y1={250} x2={420} y2={268} c="m" /><T x={430} y={266} a="start" s={12}>接泵</T>
  </Svg>;
}

// ---------- 图 10.32 交互：余弦（cosⁿθ）发射分布 ----------
export function Fig1032() {
  const [n, setN] = useState(1);
  const cx = 340, cy = 220, R0 = 150, pts = [];
  for (let a = -90; a <= 90; a += 1) { const t = a * Math.PI / 180, r = R0 * Math.pow(Math.cos(t), n); pts.push(`${cx + r * Math.sin(t)},${cy - r * Math.cos(t)}`); }
  const half = Math.acos(Math.pow(0.5, 1 / n)) * 180 / Math.PI;
  return <div style={box}>
    <Svg title="靶面原子按余弦的 n 次方分布射出：n=1 为理想余弦分布，n 越大越集中于法向" h={250}>
      <Rect x={150} y={cy} w={380} h={22} f={C.metal} /><T x={340} y={cy + 16} s={12}>靶 / 源表面</T>
      <polygon points={pts.join(" ")} fill="#f3e6c8" stroke={C.gold} strokeWidth={2} />
      {[-60, -30, 0, 30, 60].map(a => { const t = a * Math.PI / 180, r = R0 * Math.pow(Math.cos(t), n); return <Ar key={a} x1={cx} y1={cy} x2={cx + r * Math.sin(t)} y2={cy - r * Math.cos(t)} c="m" w={1.2} dash="5 3" />; })}
      <Ar x1={180} y1={40} x2={330} y2={214} w={2.2} /><circle cx={180} cy={40} r={8} fill="#ddd" stroke="#555" /><T x={180} y={44} s={11}>+</T><T x={196} y={36} a="start" s={12}>入射离子</T>
      <T x={560} y={80} a="start"><tspan fontStyle="italic">F</tspan> ∝ cos<tspan fontSize="10" dy="-6">{n.toFixed(1)}</tspan><tspan dy="6">θ</tspan></T>
      <T x={560} y={104} a="start" s={12} c={C.mute}>半强度半角 {half.toFixed(0)}°</T>
    </Svg>
    <Range label={<M>{R`\text{指数 }n\ \ (\cos^n\theta)`}</M>} value={n} set={setN} min={1} max={20} step={0.5} fmt={v => v.toFixed(1)} />
    <p style={{ fontSize: 14, margin: 0 }}>极坐标图中箭头长度正比于该方向每单位立体角射出的原子数。<M>{R`n=1`}</M>（理想余弦）对应高气压溅射；蒸发、低气压、离子辅助等过程更"定向"，等效 <M>{R`n`}</M> 更大——§10.3 用同一个 <M>{R`n`}</M> 描述到达晶圆的粒子。</p>
  </div>;
}

// ---------- 图 10.33 蒸发台与电子束蒸发源 ----------
export function Fig1033() {
  return <Svg title="左：蒸发台，约 1e-5 Torr，晶圆放在半球形行星架上；右：电子束蒸发源，磁场把电子束偏转 270 度打到坩埚中的蒸发料" h={290}>
    <path d="M 60 230 L 60 110 Q 60 30 170 30 Q 280 30 280 110 L 280 230 Z" fill="#fbfaf6" stroke="#555" strokeWidth={1.5} />
    <path d="M 100 92 Q 170 52 240 92" fill="none" stroke="#777" strokeWidth={8} />
    {[[112, 84], [146, 68], [194, 68], [228, 84]].map(([x, y], i) => <Rect key={i} x={x - 14} y={y - 4} w={28} h={7} f={C.si} s="#444" />)}
    {[[112, 92], [146, 76], [194, 76], [228, 92]].map(([x, y], i) => <Ar key={i} x1={170} y1={192} x2={x} y2={y} w={1.2} />)}
    <Rect x={150} y={192} w={40} h={14} f="#777" /><path d="M 152 214 q 5 8 10 0 q 5 8 10 0 q 5 8 10 0 q 5 8 10 0" stroke={C.red} fill="none" />
    <T x={70} y={140} a="start" s={12}>~10⁻⁵ Torr</T><T x={170} y={20}>晶圆架（行星盘）</T><T x={220} y={210} a="start" s={11}>加热：电子束或电阻</T>
    <path d="M 150 230 L 150 250 L 190 250 L 190 230" fill="none" stroke="#555" strokeWidth={3} />
    <Rect x={130} y={250} w={80} h={30} f="#c9c6c0" /><T x={170} y={270} s={11}>真空泵</T>
    {/* 电子束源 */}
    <path d="M 380 150 L 440 150 L 430 178 L 390 178 Z" fill="#777" /><ellipse cx={410} cy={152} rx={22} ry={5} fill={C.metal} />
    <T x={410} y={196} s={12}>坩埚 + 蒸发料</T>
    <path d="M 560 220 Q 640 120 560 70 Q 470 30 420 140" fill="none" stroke={C.blue} strokeWidth={2} /><Ar x1={425} y1={128} x2={418} y2={144} c="b" />
    <circle cx={520} cy={130} r={12} fill="#fff" stroke="#555" /><circle cx={520} cy={130} r={3} fill="#333" /><T x={520} y={110} s={12}>B（出纸面）</T>
    <path d="M 520 230 q 6 -6 12 0 q 6 6 12 0 q 6 -6 12 0" fill="none" stroke="#777" strokeWidth={2} /><T x={545} y={256} s={12}>灯丝</T>
    <Rect x={556} y={200} w={8} h={50} f="#bbb" s="none" /><T x={600} y={90} a="start" s={12}>电子束</T>
  </Svg>;
}

// ---------- 图 10.34 点源与小平面源 ----------
export function Fig1034() {
  const cos = (cx, cy, dir) => { const p = []; for (let a = -90; a <= 90; a += 2) { const t = a * Math.PI / 180, r = 100 * Math.cos(t); p.push(`${cx + r * Math.sin(t)},${cy - dir * r * Math.cos(t)}`); } return p.join(" "); };
  return <Svg title="左：点源各向同性蒸发，均匀覆盖整个球面；右：小平面源按余弦分布向上下两侧发射" h={260}>
    <circle cx={170} cy={130} r={110} fill="none" stroke="#333" strokeWidth={2} />
    {Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return <Ar key={i} x1={170} y1={130} x2={170 + 104 * Math.cos(a)} y2={130 + 104 * Math.sin(a)} c="m" />; })}
    <circle cx={170} cy={130} r={5} fill="#555" /><T x={170} y={256} s={12}>点源：各向同性</T>
    <circle cx={500} cy={130} r={110} fill="none" stroke="#333" strokeWidth={2} />
    <polygon points={cos(500, 126, 1)} fill="none" stroke={C.gold} /><polygon points={cos(500, 134, -1)} fill="none" stroke={C.gold} />
    {[-50, -25, 0, 25, 50].map(a => { const t = a * Math.PI / 180, r = 100 * Math.cos(t); return <g key={a}><Ar x1={500} y1={126} x2={500 + r * Math.sin(t)} y2={126 - r * Math.cos(t)} c="m" /><Ar x1={500} y1={134} x2={500 + r * Math.sin(t)} y2={134 + r * Math.cos(t)} c="m" /></g>; })}
    <Rect x={484} y={126} w={32} h={8} f="#666" /><T x={500} y={256} s={12}>小平面源：余弦分布</T>
  </Svg>;
}

// ---------- 图 10.35 球面上的等厚：几何 ----------
export function Fig1035() {
  const [th, setTh] = useState(40);
  const R0 = 110, cx = 300, cy = 140, sx = cx, sy = cy + R0, t = th * Math.PI / 180, L = 2 * R0 * Math.cos(t);
  const px = sx + L * Math.sin(t), py = sy - L * Math.cos(t);
  return <div style={box}>
    <Svg title="平面源位于球底：斜向发射通量按余弦减小，但到球面的距离也按余弦缩短、且入射倾角相同，三者相抵使球面各处厚度相同" h={270}>
      <circle cx={cx} cy={cy} r={R0} fill="none" stroke="#333" strokeWidth={2} />
      <Rect x={sx - 12} y={sy - 3} w={24} h={6} f="#666" />
      <Ar x1={sx} y1={sy} x2={sx} y2={sy - 2 * R0 + 4} c="k" /><T x={sx + 8} y={cy - 40} a="start" it>L<tspan fontSize="10" dy="3">0</tspan></T>
      <Ar x1={sx} y1={sy} x2={px} y2={py} c="r" w={2} />
      <line x1={cx} y1={cy} x2={px} y2={py} stroke="#999" strokeDasharray="4 3" />
      <path d={`M ${sx} ${sy - 40} A 40 40 0 0 1 ${sx + 40 * Math.sin(t)} ${sy - 40 * Math.cos(t)}`} fill="none" stroke="#555" /><T x={sx + 14} y={sy - 46} s={12} it>θ</T>
      <T x={px + 10} y={py} a="start" c={C.red} it>L = L<tspan fontSize="10" dy="3">0</tspan><tspan dy="-3"> cos θ</tspan></T>
      <T x={470} y={60} a="start" s={13}>发射：∝ cos θ</T>
      <T x={470} y={84} a="start" s={13}>距离平方：∝ 1/(L₀² cos² θ)</T>
      <T x={470} y={108} a="start" s={13}>入射倾角：∝ cos θ</T>
      <T x={470} y={136} a="start" s={13} b>乘积 = 常数</T>
      <T x={470} y={170} a="start" s={12} c={C.mute}>虚线：球心到落点的半径</T>
      <T x={470} y={188} a="start" s={12} c={C.mute}>（即落点处球面的法线）</T>
    </Svg>
    <Range label={<M>{R`\theta\ [^\circ]`}</M>} value={th} set={setTh} min={0} max={80} step={1} />
  </div>;
}

// ---------- 图 10.37 交互：侧壁/平面覆盖比模型 ----------
export function Fig1037() {
  const [r, setR] = useState(0.5), [t, setT] = useState(0.4);
  const one = (x0, ratio) => {
    const W = 80, D = 110, tf = 34 * t, ts = tf * ratio, tb = tf;          // 平面厚 tf，侧壁 ts，底部取平面值
    const sx = 0.6, inner = W - 2 * ts;
    const film = `M ${x0} 60 L ${x0 + 60} 60 L ${x0 + 60} ${60 + D} L ${x0 + 60 + W} ${60 + D} L ${x0 + 60 + W} 60 L ${x0 + 120 + W} 60 L ${x0 + 120 + W} ${60 - tf} L ${x0 + 60 + W - ts} ${60 - tf} L ${x0 + 60 + W - ts} ${60 + D - tb} L ${x0 + 60 + ts} ${60 + D - tb} L ${x0 + 60 + ts} ${60 - tf} L ${x0} ${60 - tf} Z`;
    const closed = inner <= 0 || D - tb <= 0;
    return <g key={x0}>
      <path d={`M ${x0} 60 L ${x0 + 60} 60 L ${x0 + 60} ${60 + D} L ${x0 + 60 + W} ${60 + D} L ${x0 + 60 + W} 60 L ${x0 + 120 + W} 60 L ${x0 + 120 + W} 220 L ${x0} 220 Z`} fill={C.si} stroke="#555" />
      <path d={film} fill={C.ox} stroke={C.oxD} opacity={closed ? 0.9 : 1} />
      <T x={x0 + 100} y={30} b>比值 = {ratio.toFixed(2)}</T>
      {closed && <T x={x0 + 100} y={245} s={12} c={C.red}>开口已合拢</T>}
    </g>;
    void sx;
  };
  return <div style={box}>
    <Svg title="几何沉积模型：侧壁厚度等于比值乘平面厚度；比值 0.1 近似蒸发，0.5 近似较高气压溅射，1 为理想共形 CVD" h={255}>
      {one(10, 0.1)}{one(240, r)}{one(470, 1)}
    </Svg>
    <Range label="中间结构的侧壁/平面覆盖比" value={r} set={setR} min={0} max={1} step={0.05} fmt={v => v.toFixed(2)} />
    <Range label="平面膜厚（相对沟槽宽度）" value={t} set={setT} min={0.1} max={1.3} step={0.05} fmt={v => (34 * v / 80).toFixed(2)} />
    <p style={{ fontSize: 14, margin: 0 }}>这个模型不含物理：只规定"侧壁长多厚"。它适合把近似的膜形状交给器件模拟（例如侧墙），但预测不了拐角鼓包、底部变薄或空洞——那需要下一节的到达角分布与粘附系数。</p>
  </div>;
}

// ---------- 图 10.38 悬挑测试结构 ----------
export function Fig1038() {
  return <Svg title="McVittie 悬挑测试结构：顶部悬挑层下有空腔，开口限定入射粒子的视角；未粘附的粒子以余弦分布再发射" h={270}>
    <Rect x={160} y={70} w={360} h={190} f={C.si} />
    <Rect x={230} y={92} w={220} h={70} f="#fff" s="#555" />
    <Rect x={150} y={70} w={165} h={22} f="#666" /><Rect x={365} y={70} w={165} h={22} f="#666" />
    <line x1={300} y1={20} x2={336} y2={156} stroke={C.mute} strokeDasharray="6 4" /><line x1={380} y1={20} x2={344} y2={156} stroke={C.mute} strokeDasharray="6 4" />
    <T x={340} y={110} s={12}>视角</T>
    {[280, 340, 400].map(x => <g key={x}>{[-25, -10, 0, 10, 25].map(a => <Ar key={a} x1={x} y1={52} x2={x + 26 * Math.sin(a * Math.PI / 180)} y2={52 - 26 * Math.cos(a * Math.PI / 180)} w={1.1} />)}<line x1={x} y1={52} x2={x} y2={28} stroke="#333" /></g>)}
    <T x={340} y={14} it>(cos θ)<tspan fontSize="10" dy="-6">n</tspan></T>
    <Path d="M 340 160 L 250 120 L 300 100 L 270 158" c="m" w={1.1} />
    <Path d="M 345 160 L 440 112" c="m" w={1.1} />
    <T x={430} y={140} s={13} it>S<tspan fontSize="10" dy="3">C</tspan></T>
    {[-50, -25, 0, 25, 50].map(a => <Ar key={a} x1={340} y1={162} x2={340 + 18 * Math.sin(a * Math.PI / 180)} y2={162 - 18 * Math.cos(a * Math.PI / 180)} w={1.1} />)}
    <T x={340} y={190} s={12}>余弦再发射</T>
  </Svg>;
}
