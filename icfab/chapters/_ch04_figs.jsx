// 第 4 章自绘示意图（SVG）。材料配色与全书一致：Si 灰、SiO2 浅蓝、Si3N4 绿、多晶硅 红棕、金属 金/橙、光刻胶 紫。
import { assetUrl } from "@kit";

export const COL = { si: "#c9c9c9", siD: "#9a9a9a", ox: "#bfe0f2", nit: "#9fd3a8", poly: "#a0522d", metal: "#d4a017", resist: "#9b7fd1", red: "#c0392b", ink: "#1f1b16", blue: "#2c4a6e", green: "#2c6e49", muted: "#777" };
const box = { maxWidth: 680, width: "100%", height: "auto", display: "block", margin: "0 auto" };
const SIG = String.fromCharCode(963);
export const chem = t => typeof t !== "string" ? t : t.split(/_(\d)/).map((x, i) => i % 2 ? <tspan key={i} baselineShift="sub" fontSize="0.72em">{x}</tspan> : x);
const Sub = ({ children }) => <tspan baselineShift="sub" fontSize="0.72em">{children}</tspan>;
const Sup = ({ children }) => <tspan baselineShift="super" fontSize="0.72em">{children}</tspan>;
const Arrow = ({ id = "ar4", color = COL.ink }) => <defs><marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={color} /></marker></defs>;

// ---------- 图 4.1 技术开发流程 ----------
export function Fig41() {
  const st = [["基础研究", "Research", -10], ["路径探索", "Pathfinding", -6], ["技术定义", "Definition", -4], ["开发", "Development", -2], ["量产", "Manufacturing", 0]];
  return <svg viewBox="0 0 680 150" style={box} role="img" aria-label="技术开发五阶段流程">
    <Arrow id="a41" />
    <line x1="30" y1="120" x2="660" y2="120" stroke="#999" />
    {st.map(([zh, en, y], i) => { const x = 20 + i * 132; return <g key={i}>
      <rect x={x} y="22" width="112" height="62" rx="6" fill={i === 4 ? "#e8f1e8" : i === 3 ? "#fdf0e0" : "#eef0f4"} stroke={COL.ink} />
      <text x={x + 56} y="50" textAnchor="middle" fontSize="15" fontWeight="600">{zh}</text>
      <text x={x + 56} y="70" textAnchor="middle" fontSize="11" fill={COL.muted}>{en}</text>
      {i < 4 && <line x1={x + 113} y1="53" x2={x + 131} y2="53" stroke={COL.ink} strokeWidth="2" markerEnd="url(#a41)" />}
      <circle cx={x + 56} cy="120" r="4" fill={COL.ink} /><text x={x + 56} y="140" textAnchor="middle" fontSize="12">第 {y} 年</text></g>; })}
  </svg>;
}

// ---------- 图 4.2 学习曲线 ----------
export function Fig42() {
  const X = t => 70 + t * 560, Y = l => 200 - (l + 1) * 25.7;   // l = log10 D
  const pts = []; for (let t = 0; t <= 1.0001; t += 0.01) { const l = t < 0.55 ? 5.8 - 5.8 * t / 0.55 : -0.35 * (1 - Math.exp(-(t - 0.55) / 0.06)) - 0.18 * (t - 0.55); pts.push(`${X(t).toFixed(1)},${Y(l).toFixed(1)}`); }
  return <svg viewBox="0 0 680 240" style={box} role="img" aria-label="开发阶段缺陷密度随时间下降">
    <Arrow id="a42" />
    <line x1="70" y1="205" x2="650" y2="205" stroke={COL.ink} markerEnd="url(#a42)" /><line x1="70" y1="205" x2="70" y2="15" stroke={COL.ink} markerEnd="url(#a42)" />
    {[-1, 0, 1, 2, 3, 4, 5, 6].map(l => <g key={l}><line x1="64" x2="70" y1={Y(l)} y2={Y(l)} stroke={COL.ink} /><text x="58" y={Y(l) + 4} textAnchor="end" fontSize="11">10<Sup>{l}</Sup></text></g>)}
    <polyline points={pts.join(" ")} fill="none" stroke={COL.red} strokeWidth="2.5" />
    <line x1={X(0.55)} x2={X(0.55)} y1="20" y2="205" stroke="#aaa" strokeDasharray="4 4" />
    <text x={X(0.27)} y="190" textAnchor="middle" fontSize="13">开发阶段：系统性缺陷为主</text>
    <text x={X(0.78)} y="150" textAnchor="middle" fontSize="13">量产：随机缺陷为主</text>
    <text x={X(0.78)} y="168" textAnchor="middle" fontSize="11" fill={COL.muted}>远低于 1 cm⁻² 才有好良率</text>
    <text x="360" y="232" textAnchor="middle" fontSize="12">时间（约两年开发期）</text>
    <text x="16" y="110" fontSize="12" transform="rotate(-90 16 110)" textAnchor="middle">缺陷密度 (cm⁻²)</text>
  </svg>;
}

// 一个简化的 CMOS 剖面（图 4.3 / 4.15 共用）
function DeviceStrip({ x = 0, y = 0, w = 420 }) {
  const wells = [[0.03, 0.27], [0.36, 0.62], [0.73, 0.95]];
  return <g transform={`translate(${x},${y})`}>
    <rect x="0" y="18" width={w} height="60" fill={COL.si} />
    {wells.map(([a, b], i) => <path key={i} d={`M${a * w},18 v22 q0,14 14,14 h${(b - a) * w - 28} q14,0 14,-14 v-22 z`} fill={COL.siD} />)}
    {wells.map(([a, b], i) => <text key={"t" + i} x={(a + b) / 2 * w} y="48" textAnchor="middle" fontSize="11">P</text>)}
    {[0.17, 0.5].map((c, i) => <g key={"n" + i}><path d={`M${c * w - 12},18 a12,10 0 0 0 24,0 z`} fill="#e9e3d5" stroke="#666" strokeWidth=".6" /><text x={c * w} y="27" textAnchor="middle" fontSize="9">N</text></g>)}
    <rect x="0" y="12" width={w} height="6" fill={COL.ox} />
    {[0.02, 0.2, 0.42, 0.58, 0.9].map((c, i) => <rect key={"m" + i} x={c * w} y="2" width={i === 1 || i === 3 ? 70 : 26} height="10" fill={COL.metal} stroke="#8a6d0b" strokeWidth=".5" />)}
    <text x={w / 2} y="72" textAnchor="middle" fontSize="11">N 型衬底</text>
  </g>;
}

// ---------- 图 4.3 污染物示意 + 原书显微照片 ----------
export function Fig43() {
  return <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "center" }}>
    <svg viewBox="0 0 470 200" style={{ ...box, maxWidth: 470, margin: 0, flex: "1 1 320px" }} role="img" aria-label="晶圆上的颗粒、金属与碱金属离子污染">
      <Arrow id="a43" />
      <DeviceStrip x={20} y={100} w={430} />
      <rect x="230" y="40" width="200" height="62" fill={COL.resist} opacity=".85" /><text x="330" y="76" textAnchor="middle" fontSize="13" fill="#fff">光刻胶</text>
      <circle cx="120" cy="88" r="12" fill="#666" /><circle cx="245" cy="32" r="8" fill="#666" />
      <text x="90" y="30" fontSize="12">颗粒</text><line x1="110" y1="34" x2="118" y2="72" stroke={COL.ink} markerEnd="url(#a43)" /><line x1="125" y1="26" x2="234" y2="30" stroke={COL.ink} markerEnd="url(#a43)" />
      {[["Fe", 30, 92, COL.red], ["Na", 175, 92, "#7d3c98"], ["Au", 290, 34, COL.metal], ["Cu", 380, 34, "#b8562b"]].map(([s, x, y, c]) => <g key={s}><circle cx={x} cy={y} r="4" fill={c} /><text x={x + 7} y={y - 4} fontSize="12" fill={c} fontWeight="600">{s}</text></g>)}
    </svg>
    <figure style={{ margin: 0, flex: "0 1 220px", textAlign: "center" }}>
      <img src={assetUrl("figures/fig-4.3.png")} alt="存储芯片上的一根头发（原书照片）" style={{ width: "100%", maxWidth: 220 }} loading="lazy" />
      <div style={{ fontSize: 12, color: COL.muted }}>原书照片：存储芯片上一根约 50 µm 粗的头发</div>
    </figure>
  </div>;
}

// ---------- 图 4.4 DRAM 单元 ----------
export function Fig44() {
  return <svg viewBox="0 0 680 210" style={box} role="img" aria-label="DRAM 单元等效电路">
    <line x1="60" y1="40" x2="620" y2="40" stroke={COL.blue} strokeWidth="2.5" /><text x="630" y="44" fontSize="13" fill={COL.blue}>字线</text>
    <line x1="150" y1="20" x2="150" y2="200" stroke={COL.green} strokeWidth="2.5" /><text x="120" y="16" fontSize="13" fill={COL.green}>位线</text>
    <line x1="150" y1="110" x2="240" y2="110" stroke={COL.ink} strokeWidth="2" />
    <line x1="240" y1="95" x2="240" y2="125" stroke={COL.ink} strokeWidth="2" /><line x1="250" y1="90" x2="250" y2="130" stroke={COL.ink} strokeWidth="3" />
    <line x1="250" y1="40" x2="250" y2="90" stroke={COL.blue} strokeWidth="2" />
    <line x1="240" y1="95" x2="300" y2="95" stroke={COL.ink} /><line x1="240" y1="125" x2="300" y2="125" stroke={COL.ink} />
    <text x="262" y="150" fontSize="12">MOS 开关管</text>
    <line x1="300" y1="125" x2="380" y2="125" stroke={COL.ink} strokeWidth="2" />
    <line x1="380" y1="125" x2="380" y2="150" stroke={COL.ink} strokeWidth="2" /><line x1="360" y1="150" x2="400" y2="150" stroke={COL.ink} strokeWidth="3" /><line x1="360" y1="160" x2="400" y2="160" stroke={COL.ink} strokeWidth="3" /><line x1="380" y1="160" x2="380" y2="190" stroke={COL.ink} strokeWidth="2" />
    <text x="410" y="160" fontSize="12">存储电容（存 "1"/"0"）</text>
    <line x1="330" y1="125" x2="330" y2="150" stroke={COL.red} strokeWidth="1.5" /><path d="M320,150 h20 l-10,14 z" fill={COL.red} /><line x1="320" y1="164" x2="340" y2="164" stroke={COL.red} strokeWidth="2" /><line x1="330" y1="164" x2="330" y2="190" stroke={COL.red} strokeWidth="1.5" />
    <line x1="320" y1="190" x2="400" y2="190" stroke={COL.ink} strokeWidth="2" />
    <text x="218" y="182" fontSize="12" fill={COL.red}>漏–衬底 PN 结（漏电）</text>
  </svg>;
}

// ---------- 图 4.5 颗粒尺寸分布与致害概率（示意） ----------
export function Fig45() {
  const X = l => 60 + (l + 2) / 3.2 * 520, H = 190;   // l = log10(d/µm)，从 0.01 到 ~15 µm
  const dens = []; const prob = [];
  for (let l = -2; l <= 1.2; l += 0.02) {
    const d = Math.pow(10, l);
    const n = l < -0.85 ? Math.pow((l + 2) / 1.15, 1.6) : Math.pow(0.15 / d, 0.75) * 1.05;   // 小尺寸处凝并而下降，大尺寸按幂律
    dens.push(`${X(l).toFixed(1)},${(H - 150 * Math.min(1, n)).toFixed(1)}`);
    const p = Math.min(1, 0.04 + Math.max(0, (l + 2) / 1.5) ** 1.3);
    prob.push(`${X(l).toFixed(1)},${(H - 150 * p).toFixed(1)}`);
  }
  return <svg viewBox="0 0 680 235" style={box} role="img" aria-label="颗粒尺寸分布与致害概率">
    <rect x="60" y="40" width="520" height="150" fill="none" stroke={COL.ink} />
    <rect x={X(-2)} y={H - 20} width={X(-1.7) - X(-2)} height="20" fill="#ddd" />
    <polyline points={dens.join(" ")} fill="none" stroke={COL.ink} strokeWidth="2.5" />
    <polyline points={prob.join(" ")} fill="none" stroke={COL.red} strokeWidth="2.5" strokeDasharray="7 4" />
    {[-2, -1, 0, 1].map(l => <text key={l} x={X(l)} y="208" textAnchor="middle" fontSize="11">{["10 nm", "0.1 µm", "1 µm", "10 µm"][l + 2]}</text>)}
    {[0, 0.5, 1].map(v => <text key={v} x="588" y={H - 150 * v + 4} fontSize="11" fill={COL.red}>{v}</text>)}
    <text x="320" y="228" textAnchor="middle" fontSize="12">颗粒直径（对数）</text>
    <text x="22" y="118" fontSize="12" transform="rotate(-90 22 118)" textAnchor="middle">颗粒数密度</text>
    <text x="640" y="118" fontSize="12" fill={COL.red} transform="rotate(90 640 118)" textAnchor="middle">致害概率</text>
    <text x={X(-0.7)} y="58" fontSize="12">峰值约 0.1–0.3 µm</text>
    <text x={X(0.2)} y="85" fontSize="12" fill={COL.red}>大颗粒：必然致命</text>
    <text x={X(-1.95)} y={H - 26} fontSize="10" fill={COL.muted}>栅氧针孔等</text>
  </svg>;
}

// ---------- 图 4.6 洁净室剖面 ----------
export function Fig46() {
  const down = []; for (let x = 70; x < 600; x += 34) down.push(x);
  return <svg viewBox="0 0 680 330" style={box} role="img" aria-label="现代洁净室剖面：风机、HEPA、垂直层流、架空地板与回风">
    <Arrow id="a46" color={COL.red} />
    <rect x="50" y="40" width="560" height="270" fill="#fff" stroke={COL.ink} />
    <rect x="50" y="40" width="560" height="40" fill="#f2f2f2" stroke={COL.ink} />
    {[120, 280, 380, 540].map(x => <ellipse key={x} cx={x} cy="62" rx="34" ry="7" fill="none" stroke={COL.ink} />)}
    <rect x="50" y="80" width="560" height="9" fill="url(#hatch46)" stroke={COL.ink} />
    <defs><pattern id="hatch46" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0,0 l4,4" stroke="#666" strokeWidth=".8" /></pattern>
      <pattern id="grid46" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#ccc" /><circle cx="4" cy="4" r="2.2" fill="#fff" /></pattern></defs>
    <rect x="50" y="89" width="160" height="150" fill="#ececec" /><rect x="450" y="89" width="160" height="150" fill="#ececec" />
    <line x1="210" y1="40" x2="210" y2="239" stroke={COL.ink} /><line x1="450" y1="40" x2="450" y2="239" stroke={COL.ink} />
    <rect x="140" y="165" width="70" height="74" fill="#bdbdbd" stroke={COL.ink} /><rect x="450" y="165" width="70" height="74" fill="#bdbdbd" stroke={COL.ink} />
    <text x="175" y="200" textAnchor="middle" fontSize="12">工艺</text><text x="175" y="216" textAnchor="middle" fontSize="12">设备</text>
    <text x="485" y="200" textAnchor="middle" fontSize="12">工艺</text><text x="485" y="216" textAnchor="middle" fontSize="12">设备</text>
    <text x="100" y="130" textAnchor="middle" fontSize="12">设备区</text><text x="560" y="130" textAnchor="middle" fontSize="12">设备区</text>
    <text x="330" y="120" textAnchor="middle" fontSize="13" fontWeight="600">工艺区（垂直层流）</text>
    {[260, 400].map(x => <g key={x} fill="#dfe6ee" stroke="#567"><circle cx={x} cy="182" r="8" /><rect x={x - 9} y="191" width="18" height="34" rx="4" /><rect x={x - 8} y="225" width="7" height="14" /><rect x={x + 1} y="225" width="7" height="14" /></g>)}
    <rect x="50" y="239" width="560" height="10" fill="url(#grid46)" stroke={COL.ink} />
    {down.map(x => <line key={"d" + x} x1={x} y1="92" x2={x} y2={(x > 140 && x < 210) || (x > 450 && x < 520) ? 160 : 232} stroke={COL.red} strokeWidth="1.3" markerEnd="url(#a46)" opacity=".8" />)}
    {down.map(x => <line key={"e" + x} x1={x} y1="252" x2={x} y2="275" stroke={COL.red} strokeWidth="1.3" markerEnd="url(#a46)" opacity=".8" />)}
    {[110, 250, 390, 545].map(x => <rect key={x} x={x} y="249" width="14" height="61" fill="#777" />)}
    <rect x="475" y="270" width="60" height="38" fill="#d6d6d6" /><text x="505" y="293" textAnchor="middle" fontSize="11">泵、射频</text>
    <path d="M50,290 H24 V22 H330 V38" fill="none" stroke={COL.red} strokeWidth="1.6" markerEnd="url(#a46)" />
    <text x="30" y="305" fontSize="12">回风</text>
    <line x1="330" y1="4" x2="330" y2="20" stroke={COL.red} strokeWidth="1.6" markerEnd="url(#a46)" /><text x="340" y="14" fontSize="12">补充新风</text>
    <text x="615" y="66" fontSize="12">风机</text><text x="615" y="88" fontSize="12">HEPA</text><text x="615" y="247" fontSize="12">架空地板</text>
  </svg>;
}

// ---------- 图 4.9 / 4.10 / 4.11 清洗流程（逐级细化） ----------
export function CleanFlow({ stage = 1 }) {
  const B = ({ x, y, w = 170, h = 34, t, s, fill = "#f4f4f4" }) => <g><rect x={x} y={y} width={w} height={h} rx="5" fill={fill} stroke={COL.ink} /><text x={x + w / 2} y={y + (s ? 15 : 21)} textAnchor="middle" fontSize="12.5">{chem(t)}</text>{s && <text x={x + w / 2} y={y + 28} textAnchor="middle" fontSize="10.5" fill={COL.muted}>{chem(s)}</text>}</g>;
  const L = (y1, y2, x) => <line x1={x} y1={y1} x2={x} y2={y2} stroke={COL.ink} markerEnd="url(#a49)" />;
  const front = stage < 3 ? [["去胶（如需要）", stage >= 2 ? "H_2SO_4/H_2O_2  或  O_2 等离子体" : null, "#efe6fb"], ["RCA 清洗", null, "#e3f1fa"]]
    : [["去胶（如需要）", "H_2SO_4/H_2O_2  或  O_2 等离子体", "#efe6fb"], ["SC-1", "NH_4OH/H_2O_2/H_2O，70–80 ˚C", "#e3f1fa"], ["去离子水冲洗", null], ["（可选）50:1 H_2O:HF", "约 10 s，剥去化学氧化层"], ["SC-2", "HCl/H_2O_2/H_2O，70–80 ˚C", "#e3f1fa"], ["去离子水冲洗", null], ["（可选）50:1 H_2O:HF", "得到氢钝化表面"]];
  const back = [["去胶（如需要）", stage >= 2 ? "O_2 等离子体 / 有机剥离液" : null, "#efe6fb"], ["金属后清洗", "专用配方，无通用标准", "#fdf3df"]];
  const n = Math.max(front.length, back.length), H = 70 + (n + 1) * 48 + 30;
  return <svg viewBox={`0 0 680 ${H}`} style={box} role="img" aria-label="前道与后道清洗流程">
    <Arrow id="a49" />
    <B x={255} y={10} t="硅晶圆" fill="#e6e6e6" />
    <line x1="340" y1="44" x2="340" y2="56" stroke={COL.ink} /><line x1="135" y1="56" x2="545" y2="56" stroke={COL.ink} />
    {L(56, 68, 135)}{L(56, 68, 545)}
    <text x="135" y="64" textAnchor="end" fontSize="11" fill={COL.blue} dx="-6">前道（无金属）</text><text x="545" y="64" fontSize="11" fill="#9a5b00" dx="6">后道（有金属）</text>
    {front.map(([t, s, f], i) => <g key={"f" + i}><B x={50} y={70 + i * 48} t={t} s={s} fill={f} />{L(70 + i * 48 + 34, 70 + (i + 1) * 48, 135)}</g>)}
    {back.map(([t, s, f], i) => <g key={"b" + i}><B x={460} y={70 + i * 48} t={t} s={s} fill={f} />{L(70 + i * 48 + 34, 70 + (i + 1) * 48, 545)}</g>)}
    <B x={50} y={70 + front.length * 48} t="下一道工序" fill="#e8f1e8" />
    <B x={460} y={70 + back.length * 48} t="下一道工序" fill="#e8f1e8" />
    {stage >= 3 && <text x="250" y="150" fontSize="11.5" fill={COL.muted}><tspan x="250">SC-1：氧化+络合去有机物、</tspan><tspan x="250" dy="16">IB/IIB 族金属；刻蚀–再氧化</tspan><tspan x="250" dy="16">把颗粒"托"离表面</tspan><tspan x="250" dy="28">SC-2：去碱金属离子与</tspan><tspan x="250" dy="16">Al、Fe、Mg 等的氢氧化物</tspan></text>}
  </svg>;
}

// ---------- 图 4.13 浸在水中的硅片 ----------
export function Fig413() {
  return <svg viewBox="0 0 680 220" style={box} role="img" aria-label="烧杯中的硅片、水与金属离子">
    <path d="M240,40 v140 a100,22 0 0 0 200,0 v-140" fill="#eaf4fb" stroke={COL.ink} />
    <ellipse cx="340" cy="40" rx="100" ry="22" fill="#fff" stroke={COL.ink} /><ellipse cx="340" cy="80" rx="100" ry="22" fill="#d6eaf7" stroke="#6a9bbf" />
    <rect x="285" y="105" width="10" height="90" fill={COL.siD} stroke={COL.ink} transform="rotate(-8 290 150)" /><text x="268" y="210" fontSize="12">Si 片</text>
    {[[360, 120], [395, 150], [350, 175], [410, 115], [330, 140]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="6" fill="#f2c94c" stroke="#8a6d0b" /><text x={x} y={y + 3} textAnchor="middle" fontSize="8">M⁺</text></g>)}
    <text x="380" y="200" fontSize="12">H<Sub>2</Sub>O</text>
    <text x="470" y="100" fontSize="12.5"><tspan x="470">问题：金属 M 会镀到 Si 上，</tspan><tspan x="470" dy="18">还是 Si 把电子交出去？</tspan><tspan x="470" dy="18">——比较两者的氧化电位</tspan></text>
  </svg>;
}

// ---------- 图 4.14 周期表（标出吸杂关注的元素） ----------
const PT = [
  "H,,,,,,,,,,,,,,,,,He", "Li,Be,,,,,,,,,,,B,C,N,O,F,Ne", "Na,Mg,,,,,,,,,,,Al,Si,P,S,Cl,Ar",
  "K,Ca,Sc,Ti,V,Cr,Mn,Fe,Co,Ni,Cu,Zn,Ga,Ge,As,Se,Br,Kr", "Rb,Sr,Y,Zr,Nb,Mo,Tc,Ru,Rh,Pd,Ag,Cd,In,Sn,Sb,Te,I,Xe",
  "Cs,Ba,*,Hf,Ta,W,Re,Os,Ir,Pt,Au,Hg,Tl,Pb,Bi,Po,At,Rn", "Fr,Ra,*,Rf,Db,Sg,Bh,Hs,Mt,Ds,Rg,Cn,Nh,Fl,Mc,Lv,Ts,Og"].map(r => r.split(","));
export function Fig414() {
  const cat = (r, c, s) => {
    if (c === 0 && r >= 1) return "alk";
    if (r >= 3 && r <= 5 && c >= 3 && c <= 11) return "deep";
    if (r >= 1 && r <= 5 && c >= 12 && c <= 14) return "semi";
    if (s === "*") return "ln"; return "";
  };
  const F = { alk: "#f5c6c6", deep: "#f2d79a", semi: "#c9e3f5", ln: "#e2e2e2", "": "#fff" };
  return <svg viewBox="0 0 680 300" style={box} role="img" aria-label="周期表：碱金属、深能级杂质与半导体/掺杂元素">
    {PT.map((row, r) => row.map((s, c) => s && <g key={r + "-" + c}>
      <rect x={20 + c * 36} y={20 + r * 34} width="34" height="32" rx="3" fill={F[cat(r, c, s)]} stroke="#555" strokeWidth=".7" />
      <text x={37 + c * 36} y={41 + r * 34} textAnchor="middle" fontSize="12" fontWeight={cat(r, c, s) === "deep" || cat(r, c, s) === "alk" ? 700 : 400}>{s === "*" ? "" : s}</text></g>))}
    {[["alk", "碱金属离子：在 SiO_2 中可动，造成阈值漂移"], ["deep", "过渡金属：Si 禁带中的深能级 / SRH 中心"], ["semi", "半导体与掺杂元素"], ["ln", "镧系 / 锕系（略）"]].map(([k, t], i) =>
      <g key={k}><rect x={130 + (i % 2) * 270} y={262 + Math.floor(i / 2) * 20} width="14" height="12" fill={F[k]} stroke="#555" /><text x={150 + (i % 2) * 270} y={272 + Math.floor(i / 2) * 20} fontSize="11.5">{chem(t)}</text></g>)}
  </svg>;
}

// ---------- 图 4.15 吸杂策略剖面 ----------
export function Fig415() {
  const dots = []; let s = 7; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 70; i++) dots.push([150 + r() * 380, 150 + r() * 200]);
  return <svg viewBox="0 0 680 420" style={box} role="img" aria-label="吸杂策略：表面洁净区、体内（本征）吸杂区、背面（非本征）吸杂区">
    <Arrow id="a415" color={COL.red} />
    <rect x="140" y="20" width="400" height="40" fill={COL.nit} /><text x="340" y="45" textAnchor="middle" fontSize="12.5">PSG 或 Si<Sub>3</Sub>N<Sub>4</Sub> 顶层：俘获/阻挡碱金属离子</text>
    <DeviceStrip x={140} y={58} w={400} />
    <rect x="140" y="136" width="400" height="230" fill="#e4e4e4" />
    {dots.map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="4" ry="2.6" fill="#555" opacity=".75" />)}
    <rect x="140" y="366" width="400" height="22" fill="url(#bk415)" /><defs><pattern id="bk415" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#bdbdbd" /><path d="M0,6 L6,0" stroke="#666" /></pattern></defs>
    <rect x="140" y="20" width="400" height="368" fill="none" stroke={COL.ink} />
    <text x="295" y="128" fontSize="12" fill={COL.red}>Au<Sub>S</Sub> → Au<Sub>i</Sub></text>
    <line x1="370" y1="134" x2="370" y2="240" stroke={COL.red} strokeWidth="2" markerEnd="url(#a415)" />
    <line x1="420" y1="134" x2="420" y2="368" stroke={COL.red} strokeWidth="2" markerEnd="url(#a415)" />
    {[["1", 300, 150], ["2", 445, 210], ["3", 345, 250], ["3", 445, 350]].map(([n, x, y], i) => <g key={i}><circle cx={x} cy={y} r="11" fill="#999" /><text x={x} y={y + 4} textAnchor="middle" fontSize="12" fill="#fff">{n}</text></g>)}
    <text x="462" y="214" fontSize="12">扩散</text><text x="318" y="275" fontSize="12">俘获（体内）</text><text x="350" y="382" fontSize="12">俘获（背面）</text>
    <text x="130" y="105" textAnchor="end" fontSize="12"><tspan x="130">洁净区</tspan><tspan x="130" dy="15">或外延层</tspan></text>
    <text x="130" y="250" textAnchor="end" fontSize="12"><tspan x="130">本征（体内）</tspan><tspan x="130" dy="15">吸杂区</tspan><tspan x="130" dy="15" fill={COL.muted}>SiO<Sub>2</Sub> 沉淀</tspan></text>
    <text x="130" y="375" textAnchor="end" fontSize="12"><tspan x="130">非本征</tspan><tspan x="130" dy="15">（背面）吸杂区</tspan></text>
    <line x1="560" y1="62" x2="560" y2="134" stroke={COL.ink} /><text x="568" y="104" fontSize="11.5">数 µm</text>
    <line x1="560" y1="138" x2="560" y2="386" stroke={COL.ink} /><text x="568" y="266" fontSize="11.5">500+ µm</text>
    <text x="340" y="410" textAnchor="middle" fontSize="11.5" fill={COL.muted}>① 释放（变成快扩散的间隙态）② 扩散 ③ 在远离器件处被俘获</text>
  </svg>;
}

// ---------- 图 4.17 SiO2 沉淀的生长 ----------
export function Fig417() {
  return <svg viewBox="0 0 680 330" style={box} role="img" aria-label="SiO2 沉淀吸收间隙氧与空位、发射自间隙原子；下方为氧浓度剖面">
    <Arrow id="a417" />
    <rect x="40" y="10" width="600" height="190" fill="#ececec" rx="6" />
    <ellipse cx="340" cy="110" rx="60" ry="26" fill={COL.ox} stroke={COL.ink} strokeWidth="1.5" /><text x="340" y="115" textAnchor="middle" fontSize="14">SiO<Sub>2</Sub></text>
    <ellipse cx="225" cy="55" rx="55" ry="9" fill={COL.ink} transform="rotate(35 225 55)" /><text x="150" y="30" fontSize="12">层错</text>
    {[[250, 100], [430, 135], [120, 130], [520, 60], [560, 150], [300, 175]].map(([x, y], i) => <text key={i} x={x} y={y} fontSize="12" fill={COL.red}>O<Sub>I</Sub></text>)}
    <line x1="268" y1="98" x2="282" y2="104" stroke={COL.red} markerEnd="url(#a417)" /><line x1="428" y1="130" x2="402" y2="120" stroke={COL.red} markerEnd="url(#a417)" />
    <text x="360" y="40" fontSize="13" fill={COL.blue}>V</text><line x1="362" y1="45" x2="352" y2="82" stroke={COL.blue} markerEnd="url(#a417)" />
    <line x1="390" y1="90" x2="430" y2="50" stroke={COL.green} markerEnd="url(#a417)" /><text x="434" y="48" fontSize="13" fill={COL.green}>I</text>
    <text x="470" y="85" fontSize="11.5" fill={COL.muted}><tspan x="470">体积膨胀约 2 倍：</tspan><tspan x="470" dy="15">吸收空位 V 或</tspan><tspan x="470" dy="15">挤出自间隙 I</tspan></text>
    <line x1="90" y1="310" x2="610" y2="310" stroke={COL.ink} markerEnd="url(#a417)" /><line x1="90" y1="310" x2="90" y2="215" stroke={COL.ink} markerEnd="url(#a417)" />
    <text x="60" y="225" fontSize="12">[O<Sub>I</Sub>]</text>
    <path d="M100,260 H210 C250,260 270,272 285,305 L290,305 V230 H390 V305 L395,305 C410,272 430,260 470,260 H600" fill="none" stroke={COL.ink} strokeWidth="2" />
    <text x="340" y="252" textAnchor="middle" fontSize="12">SiO<Sub>2</Sub></text>
    <text x="490" y="250" fontSize="12">O<Sub>I</Sub> 向沉淀扩散</text><line x1="488" y1="246" x2="440" y2="246" stroke={COL.ink} markerEnd="url(#a417)" />
  </svg>;
}

// ---------- 图 4.18 本征吸杂热处理 ----------
export function Fig418() {
  const X = h => 70 + h * 18, Y = c => 210 - (c - 400) / 800 * 180;
  const path = [[0, 600], [1, 1150], [5, 1150], [6.5, 700], [14.5, 700], [17, 1000], [30, 1000], [31.5, 600]];
  return <svg viewBox="0 0 680 250" style={box} role="img" aria-label="本征吸杂的三段热处理：外扩散、成核、沉淀长大">
    <line x1="70" y1="210" x2="650" y2="210" stroke={COL.ink} /><line x1="70" y1="210" x2="70" y2="20" stroke={COL.ink} />
    {[500, 700, 900, 1100].map(c => <g key={c}><line x1="64" x2="650" y1={Y(c)} y2={Y(c)} stroke="#eee" /><text x="60" y={Y(c) + 4} textAnchor="end" fontSize="11">{c}</text></g>)}
    <rect x={X(1)} y="20" width={X(5) - X(1)} height="190" fill="#fde7e7" /><rect x={X(6.5)} y="20" width={X(14.5) - X(6.5)} height="190" fill="#e6f0fb" /><rect x={X(17)} y="20" width={X(30) - X(17)} height="190" fill="#e8f4ea" />
    <polyline points={path.map(([h, c]) => `${X(h)},${Y(c)}`).join(" ")} fill="none" stroke={COL.red} strokeWidth="3" />
    <text x={X(3)} y="40" textAnchor="middle" fontSize="12"><tspan x={X(3)}>外扩散</tspan><tspan x={X(3)} dy="14" fontSize="10.5" fill={COL.muted}>（无外延层时）</tspan><tspan x={X(3)} dy="14" fontSize="10.5" fill={COL.muted}>1100–1200 ˚C</tspan></text>
    <text x={X(10.5)} y="40" textAnchor="middle" fontSize="12"><tspan x={X(10.5)}>成核</tspan><tspan x={X(10.5)} dy="14" fontSize="10.5" fill={COL.muted}>约 700 ˚C，数小时</tspan></text>
    <text x={X(23.5)} y="40" textAnchor="middle" fontSize="12"><tspan x={X(23.5)}>沉淀长大</tspan><tspan x={X(23.5)} dy="14" fontSize="10.5" fill={COL.muted}>约 1000 ˚C，数小时；慢升温</tspan></text>
    <text x="360" y="235" textAnchor="middle" fontSize="12">时间（示意）</text><text x="18" y="115" fontSize="12" transform="rotate(-90 18 115)" textAnchor="middle">温度 (˚C)</text>
  </svg>;
}

// ---------- 图 4.24 直方图与正态分布 ----------
export function Fig424() {
  const g = x => Math.exp(-x * x / 2), X = s => 470 + s * 45, Y = v => 200 - v * 160;
  const pts = []; for (let s = -3.6; s <= 3.6; s += 0.05) pts.push(`${X(s).toFixed(1)},${Y(g(s)).toFixed(1)}`);
  const bars = [0.08, 0.3, 0.62, 0.86, 0.95, 0.72, 0.4, 0.14, 0.05];
  return <svg viewBox="0 0 680 240" style={box} role="img" aria-label="工艺参数直方图与正态分布的一、二、三倍标准差区间">
    <line x1="30" y1="200" x2="300" y2="200" stroke={COL.ink} /><line x1="30" y1="200" x2="30" y2="20" stroke={COL.ink} />
    {bars.map((h, i) => <rect key={i} x={45 + i * 27} y={Y(h)} width="26" height={h * 160} fill="#aaa" stroke="#888" />)}
    <text x="165" y="222" textAnchor="middle" fontSize="12">参数值</text><text x="20" y="110" fontSize="12" transform="rotate(-90 20 110)" textAnchor="middle">频数</text>
    <polyline points={pts.join(" ")} fill="none" stroke={COL.ink} strokeWidth="2.5" />
    {[[1, "68.3%", 150], [2, "95.4%", 110], [3, "99.7%", 70]].map(([k, t, y]) => <g key={k}><line x1={X(-k)} x2={X(k)} y1={y} y2={y} stroke={COL.red} strokeDasharray="4 3" /><line x1={X(-k)} x2={X(-k)} y1={y - 6} y2="200" stroke="#bbb" /><line x1={X(k)} x2={X(k)} y1={y - 6} y2="200" stroke="#bbb" /><text x={X(0)} y={y - 4} textAnchor="middle" fontSize="11" fill={COL.red}>{t}</text></g>)}
    {[-3, -2, -1, 0, 1, 2, 3].map(k => <text key={k} x={X(k)} y="218" textAnchor="middle" fontSize="11">{k === 0 ? "均值" : <>{k > 0 ? "+" : "−"}{Math.abs(k)}{SIG}</>}</text>)}
  </svg>;
}

// ---------- 图 4.25 三种情形 ----------
export function Fig425() {
  const cases = [[0, 1, "情形 1", "Cp = 1, Cpk = 1"], [0.5, 0.5, "情形 2", "Cp = 2, Cpk = 1"], [0, 0.5, "情形 3", "Cp = 2, Cpk = 2"]];
  const X = u => 340 + u * 180;   // 规格限在 ±1（以半宽归一）
  return <svg viewBox="0 0 680 330" style={box} role="img" aria-label="规格上下限与三种分布：宽而居中、窄而偏心、窄而居中">
    {cases.map(([mu, w, a, b], i) => { const y0 = 20 + i * 105, pts = [];
      for (let u = mu - w; u <= mu + w + 1e-9; u += w / 40) { const s = (u - mu) / (w / 3); pts.push(`${X(u).toFixed(1)},${(y0 + 85 - 75 * Math.exp(-s * s / 2)).toFixed(1)}`); }
      return <g key={i}>
        <line x1={X(-1)} x2={X(-1)} y1={y0} y2={y0 + 90} stroke={COL.ink} strokeWidth="2" /><line x1={X(1)} x2={X(1)} y1={y0} y2={y0 + 90} stroke={COL.ink} strokeWidth="2" />
        <polyline points={pts.join(" ")} fill="none" stroke={i === 2 ? COL.green : i === 1 ? COL.red : COL.blue} strokeWidth="2.5" />
        <text x="40" y={y0 + 40} fontSize="13" fontWeight="600">{a}</text><text x="40" y={y0 + 58} fontSize="12">{b}</text>
        <text x={X(mu - w)} y={y0 + 102} textAnchor="middle" fontSize="10.5">−3{SIG}</text><text x={X(mu + w)} y={y0 + 102} textAnchor="middle" fontSize="10.5">+3{SIG}</text></g>; })}
    <line x1={X(0)} x2={X(0)} y1="10" y2="320" stroke="#999" strokeDasharray="5 4" />
    <text x={X(-1)} y="14" textAnchor="middle" fontSize="12" fontWeight="600">LSL</text><text x={X(1)} y="14" textAnchor="middle" fontSize="12" fontWeight="600">USL</text>
  </svg>;
}
