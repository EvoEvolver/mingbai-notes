// 第 9 章自绘示意图（SVG）。材料配色全章统一：
// Si 灰、SiO2 浅蓝、Si3N4 绿、金属金色、光刻胶紫、碳氟聚合物（钝化层）青绿、等离子体淡粉紫。
const C = {
  si: "#bdbdbd", siDark: "#8c8c8c", ox: "#bfe0f5", oxEdge: "#5a9cc8", nit: "#9fd1a6", metal: "#e0b23a", resist: "#b9a2dc", resistEdge: "#7a5fb0",
  poly: "#2a9d8f", plasma: "#f6dcf1", plasmaEdge: "#c98bbd", ion: "#c0392b", neutral: "#2c6e9e", ink: "#26292e", muted: "#6b6f76", w: "#3b6fb6",
};
export const MAT = C;
const font = { fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif", fontSize: 13 };

export function Svg({ w = 680, h = 300, title, children }) {
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} style={{ width: "100%", maxWidth: w, display: "block", margin: "0 auto", ...font }}>
    <title>{title}</title>
    <defs>
      <pattern id="ch09-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="6" height="6" fill={C.resist} /><line x1="0" y1="0" x2="0" y2="6" stroke={C.resistEdge} strokeWidth="1.2" />
      </pattern>
      <marker id="ch09-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="context-stroke" /></marker>
      <marker id="ch09-arK" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={C.ink} /></marker>
      <marker id="ch09-arR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={C.ion} /></marker>
      <marker id="ch09-arB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={C.neutral} /></marker>
      <marker id="ch09-arG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#2c6e49" /></marker>
      <radialGradient id="ch09-glow"><stop offset="0" stopColor="#fbe9f8" /><stop offset="1" stopColor={C.plasma} /></radialGradient>
    </defs>
    {children}
  </svg>;
}
const Arrow = ({ x1, y1, x2, y2, c = "K", w = 2, dash }) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={{ K: C.ink, R: C.ion, B: C.neutral, G: "#2c6e49" }[c]} strokeWidth={w} strokeDasharray={dash} markerEnd={`url(#ch09-ar${c})`} />;
const T = ({ x, y, children, a = "middle", s = 13, c = C.ink, w }) => <text x={x} y={y} textAnchor={a} fontSize={s} fill={c} fontWeight={w}>{children}</text>;
const Ion = ({ x, y, r = 8 }) => <g><circle cx={x} cy={y} r={r} fill="#f3c6c0" stroke={C.ion} /><text x={x} y={y + 4} textAnchor="middle" fontSize="12" fill={C.ion} fontWeight="700">+</text></g>;
const Neu = ({ x, y, r = 7 }) => <circle cx={x} cy={y} r={r} fill="#cfe2f3" stroke={C.neutral} />;
const Elec = ({ x, y, r = 6 }) => <g><circle cx={x} cy={y} r={r} fill="#fff6c9" stroke="#b8862b" /><text x={x} y={y + 4} textAnchor="middle" fontSize="11" fill="#8a6100" fontWeight="700">−</text></g>;
const Mask = ({ x, y, w, h = 14 }) => <rect x={x} y={y} width={w} height={h} fill="url(#ch09-hatch)" stroke={C.resistEdge} />;

// 一个掩模下的沟槽：kind = iso | aniso | taper；返回剖面路径（在 [x,x+W] 的块中）
function Trench({ x, y, W = 200, H = 110, open = 70, depth = 50, kind = "aniso", mat = C.si, label }) {
  const cx = x + W / 2, a = open / 2;
  let d;
  if (kind === "iso") d = `M${x},${y} L${cx - a - depth},${y} A${depth},${depth} 0 0 0 ${cx - a},${y + depth} L${cx + a},${y + depth} A${depth},${depth} 0 0 0 ${cx + a + depth},${y} L${x + W},${y} L${x + W},${y + H} L${x},${y + H} Z`;
  else if (kind === "taper") d = `M${x},${y} L${cx - a - depth * 0.35},${y} L${cx - a + depth * 0.15},${y + depth} L${cx + a - depth * 0.15},${y + depth} L${cx + a + depth * 0.35},${y} L${x + W},${y} L${x + W},${y + H} L${x},${y + H} Z`;
  else d = `M${x},${y} L${cx - a},${y} L${cx - a},${y + depth} L${cx + a},${y + depth} L${cx + a},${y} L${x + W},${y} L${x + W},${y + H} L${x},${y + H} Z`;
  return <g><path d={d} fill={mat} stroke={C.siDark} />
    <Mask x={x} y={y - 14} w={W / 2 - a} /><Mask x={cx + a} y={y - 14} w={W / 2 - a} />
    {label && <T x={cx} y={y + H + 22}>{label}</T>}</g>;
}

// ---------- 图 9.1 ----------
export function Fig91() {
  return <Svg h={230} title="各向同性与定向刻蚀的剖面对比">
    <Arrow x1={170} y1={22} x2={510} y2={22} /><T x={340} y={15}>方向性增强</T>
    <Trench x={80} y={70} kind="iso" label="(a) 各向同性：横向 = 纵向，掩模下钻蚀" />
    <Trench x={400} y={70} kind="aniso" label="(b) 定向（各向异性）：只向下刻" />
  </Svg>;
}

// ---------- 图 9.2：各向同性剖面，刚刻穿与过刻 ----------
export function Fig92() {
  const x0 = 120, y0 = 70, H = 70, a = 90, cx = 340; // 膜厚 H、半开口 a（像素）
  const arc = t => { // 半径 t 的各向同性前沿在膜内的部分（右侧），t>=H 时与停止层相交
    const xb = Math.sqrt(Math.max(t * t - H * H, 0));
    return t <= H ? `M${cx + a + t},${y0} A${t},${t} 0 0 1 ${cx + a},${y0 + t}` : `M${cx + a + t},${y0} A${t},${t} 0 0 1 ${cx + a + xb},${y0 + H}`;
  };
  const t2 = 115, xb2 = Math.sqrt(t2 * t2 - H * H);
  return <Svg h={230} title="各向同性刻蚀在掩模边缘的半圆剖面，以及过刻后看似更陡的侧壁">
    <rect x={x0} y={y0} width={440} height={H} fill={C.ox} stroke={C.oxEdge} />
    <rect x={x0} y={y0 + H} width={440} height={60} fill={C.si} stroke={C.siDark} />
    <T x={340} y={y0 + H + 36}>不被刻蚀的下层材料（停止层）</T>
    {/* 刚刻穿：左右两个四分之一圆 */}
    <path d={`M${cx - a - H},${y0} A${H},${H} 0 0 0 ${cx - a},${y0 + H} L${cx + a},${y0 + H} A${H},${H} 0 0 0 ${cx + a + H},${y0}`} fill="#fff" stroke={C.ink} strokeWidth="2" />
    {/* 过刻：右侧（实线）与延伸到停止层中的虚线圆 */}
    <path d={arc(t2)} fill="none" stroke={C.ion} strokeWidth="2.2" />
    <path d={`M${cx + a + xb2},${y0 + H} A${t2},${t2} 0 0 1 ${cx + a},${y0 + t2}`} fill="none" stroke={C.ion} strokeDasharray="5 4" />
    <path d={`M${cx - a - t2},${y0} A${t2},${t2} 0 0 0 ${cx - a - xb2},${y0 + H}`} fill="none" stroke={C.ion} strokeWidth="2.2" />
    <Mask x={x0} y={y0 - 16} w={cx - a - x0} h={16} /><Mask x={cx + a} y={y0 - 16} w={x0 + 440 - cx - a} h={16} />
    <line x1={cx + a} y1={y0 - 30} x2={cx + a} y2={y0 + H} stroke={C.muted} strokeDasharray="3 3" />
    <T x={cx + a} y={y0 - 34} s={12} c={C.muted}>掩模边缘</T>
    <T x={cx - 60} y={y0 + 30} s={12}>刚刻穿：半径 = 膜厚</T>
    <T x={cx + a + 70} y={y0 - 26} s={12} c={C.ion} a="start">过刻后：弧半径变大，</T>
    <T x={cx + a + 70} y={y0 - 11} s={12} c={C.ion} a="start">侧壁"看起来"更陡</T>
    <T x={150} y={y0 - 24} s={12} a="start">掩模（光刻胶）</T>
    <T x={150} y={y0 + 45} s={12} a="start" c={C.oxEdge}>被刻薄膜</T>
  </Svg>;
}

// ---------- 图 9.4：等离子体定向刻蚀 ----------
export function Fig94() {
  return <Svg w={460} h={250} title="等离子体中中性粒子、离子与挥发性产物">
    <Trench x={80} y={130} W={300} H={100} open={110} depth={70} />
    <Neu x={170} y={60} /><T x={150} y={45}>中性粒子</T><Arrow x1={175} y1={70} x2={200} y2={185} c="B" />
    <Ion x={235} y={60} /><T x={240} y={45}>离子</T><Arrow x1={235} y1={70} x2={235} y2={192} c="R" />
    <Arrow x1={270} y1={195} x2={320} y2={40} c="G" /><T x={360} y={45}>挥发性产物</T>
  </Svg>;
}

// ---------- 图 9.5 ----------
function RfSource({ x, y, r = 20, label = "V_rf" }) {
  return <g><circle cx={x} cy={y} r={r} fill="#fff" stroke={C.ink} strokeWidth="1.5" />
    <path d={`M${x - 12},${y} q6,-12 12,0 t12,0`} fill="none" stroke={C.ink} strokeWidth="1.5" />
    <text x={x - r - 6} y={y + 4} textAnchor="end" fontSize="13">{label === "V_rf" ? <>V<tspan baselineShift="sub" fontSize="10">rf</tspan></> : label}</text></g>;
}
const Ground = ({ x, y }) => <g stroke={C.ink} strokeWidth="1.5"><line x1={x} y1={y} x2={x} y2={y + 8} /><line x1={x - 10} y1={y + 8} x2={x + 10} y2={y + 8} /><line x1={x - 6} y1={y + 12} x2={x + 6} y2={y + 12} /><line x1={x - 2} y1={y + 16} x2={x + 2} y2={y + 16} /></g>;
export function Fig95() {
  const pts = [];
  let s = 7; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 46; i++) { const a = rnd() * 2 * Math.PI, r = 75 * Math.sqrt(rnd()); pts.push([520 + r * Math.cos(a), 140 + r * Math.sin(a), rnd()]); }
  return <Svg h={260} title="平行板等离子体与等离子体中的各种粒子">
    <line x1={60} y1={140} x2={60} y2={50} stroke={C.ink} /><line x1={60} y1={50} x2={200} y2={50} stroke={C.ink} /><line x1={200} y1={50} x2={200} y2={95} stroke={C.ink} />
    <line x1={60} y1={140} x2={60} y2={225} stroke={C.ink} /><line x1={60} y1={225} x2={200} y2={225} stroke={C.ink} /><line x1={200} y1={225} x2={200} y2={180} stroke={C.ink} />
    <RfSource x={60} y={140} />
    <rect x={120} y={95} width={170} height={7} fill="#555" /><rect x={120} y={173} width={170} height={7} fill="#555" />
    <rect x={124} y={106} width={162} height={63} fill="url(#ch09-glow)" stroke={C.plasmaEdge} strokeDasharray="3 3" /><T x={205} y={142}>等离子体</T>
    <Ground x={200} y={225} /><T x={205} y={255}>(a)</T>
    {pts.map(([x, y, k], i) => k < 0.5 ? <Neu key={i} x={x} y={y} r={6} /> : k < 0.62 ? <Ion key={i} x={x} y={y} r={7} /> : k < 0.74 ? <Elec key={i} x={x} y={y} /> : k < 0.9 ? <circle key={i} cx={x} cy={y} r={6} fill="#9fd1a6" stroke="#2c6e49" /> : <circle key={i} cx={x} cy={y} r={4} fill="#e5e5e5" stroke="#777" />)}
    <g transform="translate(330,70)">
      <Neu x={0} y={0} r={6} /><T x={14} y={4} a="start">中性分子</T>
      <Ion x={0} y={26} r={7} /><T x={14} y={30} a="start">离子</T>
      <Elec x={0} y={52} /><T x={14} y={56} a="start">电子</T>
      <circle cx={0} cy={78} r={6} fill="#9fd1a6" stroke="#2c6e49" /><T x={14} y={82} a="start">自由基</T>
      <circle cx={0} cy={104} r={4} fill="#e5e5e5" stroke="#777" /><T x={14} y={108} a="start">抑制剂</T>
    </g>
    <T x={520} y={255}>(b)</T>
  </Svg>;
}

// ---------- 图 9.6：各成分的密度与能量（对数–对数方块图） ----------
export function Fig96() {
  const X = e => 110 + (Math.log10(e) + 2.5) * 95, Y = n => 250 - (Math.log10(n) - 8) * 32; // e: eV, n: cm^-3
  const box = (e0, e1, n0, n1, fill, label, label2) => <g><rect x={X(e0)} y={Y(n1)} width={X(e1) - X(e0)} height={Y(n0) - Y(n1)} fill={fill} stroke="#666" rx="3" />
    <T x={(X(e0) + X(e1)) / 2} y={(Y(n0) + Y(n1)) / 2 + (label2 ? -3 : 4)} s={12}>{label}</T>{label2 && <T x={(X(e0) + X(e1)) / 2} y={(Y(n0) + Y(n1)) / 2 + 12} s={12}>{label2}</T>}</g>;
  return <Svg w={640} h={290} title="电容耦合等离子体中各成分的密度与能量">
    <line x1={100} y1={258} x2={600} y2={258} stroke={C.ink} markerEnd="url(#ch09-arK)" /><line x1={100} y1={258} x2={100} y2={30} stroke={C.ink} markerEnd="url(#ch09-arK)" />
    {[-2, -1, 0, 1, 2, 3].map(k => <g key={k}><line x1={X(10 ** k)} y1={258} x2={X(10 ** k)} y2={264} stroke={C.ink} /><T x={X(10 ** k)} y={278} s={12}>{k === 0 ? "1" : k === 1 ? "10" : k === 2 ? "100" : k === 3 ? "1000" : `10^${k}`.replace("10^-2", "0.01").replace("10^-1", "0.1")}</T></g>)}
    {[8, 10, 12, 14].map(k => <g key={k}><line x1={94} y1={Y(10 ** k)} x2={100} y2={Y(10 ** k)} stroke={C.ink} /><T x={88} y={Y(10 ** k) + 4} a="end" s={12}>10<tspan baselineShift="super" fontSize="9">{k}</tspan></T></g>)}
    <T x={350} y={290} s={12}>能量 (eV)</T><text transform="translate(40,150) rotate(-90)" textAnchor="middle" fontSize="12">密度 (cm<tspan baselineShift="super" fontSize="9">−3</tspan>)</text>
    {box(0.02, 0.06, 5e13, 2e14, "#e3e3e3", "刻蚀气体")}
    {box(0.025, 0.09, 1.5e13, 4e13, "#ececec", "刻蚀产物")}
    {box(0.02, 0.05, 1e12, 5e12, "#cfe7d3", "自由基")}
    {box(0.02, 0.07, 8e9, 1e11, "#f3d0cb", "等离子体", "离子")}
    {box(1, 10, 8e9, 1e11, "#fff0b8", "等离子体", "电子")}
    {box(20, 500, 5e8, 6e9, "#e9b3ab", "轰击离子")}
  </Svg>;
}

// ---------- 图 9.7：鞘层与等效电路 ----------
export function Fig97() {
  return <Svg h={290} title="等离子体与鞘层中的电位分布和通量，以及射频等离子体的等效电路">
    <rect x={60} y={40} width={8} height={200} fill="#777" /><rect x={312} y={40} width={8} height={200} fill="#777" />
    <rect x={105} y={40} width={170} height={200} fill="url(#ch09-glow)" />
    <T x={190} y={60}>{"n"}<tspan baselineShift="sub" fontSize="10">i</tspan>{" = n"}<tspan baselineShift="sub" fontSize="10">e</tspan></T>
    <T x={86} y={32} s={12}>鞘层</T><T x={294} y={32} s={12}>鞘层</T>
    <Ion x={130} y={90} /><Ion x={250} y={90} /><Elec x={140} y={130} /><Elec x={240} y={130} />
    <Arrow x1={118} y1={90} x2={74} y2={90} c="R" /><Arrow x1={262} y1={90} x2={306} y2={90} c="R" /><T x={92} y={82} s={11} c={C.ion}>Γi</T><T x={288} y={82} s={11} c={C.ion}>Γi</T>
    <Arrow x1={128} y1={130} x2={74} y2={130} c="K" w={1} /><Arrow x1={252} y1={130} x2={306} y2={130} c="K" w={1} /><T x={92} y={148} s={11}>Γe</T><T x={288} y={148} s={11}>Γe</T>
    <path d="M68,230 C80,175 95,172 110,172 L270,172 C285,172 300,175 312,230" fill="none" stroke={C.ink} strokeWidth="2.2" />
    <T x={190} y={165} s={12}>+V<tspan baselineShift="sub" fontSize="9">P</tspan>（直流电位）</T><T x={190} y={225} s={12}>等离子体</T>
    <T x={190} y={270}>(a)</T>
    {/* (b) 等效电路 */}
    <g transform="translate(380,30)">
      <RfSource x={40} y={110} label="V_rf" />
      <line x1={40} y1={90} x2={40} y2={30} stroke={C.ink} /><line x1={40} y1={30} x2={200} y2={30} stroke={C.ink} />
      <line x1={40} y1={130} x2={40} y2={200} stroke={C.ink} /><line x1={40} y1={200} x2={200} y2={200} stroke={C.ink} />
      {[[30, 90], [130, 190]].map(([a, b], k) => <g key={k}>
        <line x1={150} y1={a} x2={150} y2={b} stroke={C.ink} /><line x1={250} y1={a} x2={250} y2={b} stroke={C.ink} />
        <polygon points={`142,${k ? 172 : 52} 158,${k ? 172 : 52} 150,${k ? 158 : 66}`} fill={C.ink} /><line x1={142} y1={k ? 157 : 67} x2={158} y2={k ? 157 : 67} stroke={C.ink} strokeWidth="2" />
        <line x1={238} y1={k ? 158 : 58} x2={262} y2={k ? 158 : 58} stroke={C.ink} strokeWidth="2.5" /><line x1={238} y1={k ? 166 : 66} x2={262} y2={k ? 166 : 66} stroke={C.ink} strokeWidth="2.5" />
      </g>)}
      <line x1={150} y1={30} x2={250} y2={30} stroke={C.ink} /><line x1={150} y1={200} x2={250} y2={200} stroke={C.ink} />
      <line x1={150} y1={110} x2={250} y2={110} stroke={C.ink} /><circle cx={250} cy={110} r={4} fill={C.ink} /><T x={262} y={114} a="start">+V<tspan baselineShift="sub" fontSize="9">P</tspan></T>
      <line x1={250} y1={58} x2={250} y2={90} stroke={C.ink} /><line x1={250} y1={130} x2={250} y2={158} stroke={C.ink} />
      <Ground x={200} y={200} />
      <T x={150} y={240}>(b) 鞘层 = 二极管 ∥ 电容</T>
    </g>
  </Svg>;
}

// ---------- 图 9.8 / 9.9：电极电压波形（对称 / 非对称） ----------
export function FigSheathWave({ asym = false }) {
  const x0 = 70, w = 520, y0 = 140, amp = 70, vdc = asym ? 52 : 0, vp = asym ? 22 : 74; // 像素
  const pts = []; for (let i = 0; i <= 300; i++) { const ph = i / 300 * 3.25 * 2 * Math.PI; pts.push([x0 + i / 300 * w, y0 + vdc - amp * Math.sin(ph)]); }
  const path = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const vpY = y0 - (asym ? vp : amp - 4);
  const flows = []; for (let k = 0; k < 4; k++) { const xc = x0 + (k + 0.25) / 3.25 * w; flows.push(xc); }
  return <Svg h={270} title={asym ? "小电极上的直流自偏压与电压波形" : "对称电极的电压波形与电子电流流动的时刻"}>
    <line x1={x0} y1={30} x2={x0} y2={250} stroke={C.ink} markerStart="url(#ch09-arK)" /><line x1={x0} y1={y0} x2={x0 + w + 20} y2={y0} stroke={C.ink} markerEnd="url(#ch09-arK)" />
    <T x={x0 - 8} y={y0 + 4} a="end">0</T><T x={x0 + w + 10} y={y0 + 20} s={12}>时间</T>
    <text transform={`translate(28,${y0}) rotate(-90)`} textAnchor="middle" fontSize="12">被驱动电极电压</text>
    {asym && <><line x1={x0} y1={y0 + vdc} x2={x0 + w} y2={y0 + vdc} stroke={C.w} strokeDasharray="6 4" /><T x={x0 - 8} y={y0 + vdc + 4} a="end" c={C.w}>−V<tspan baselineShift="sub" fontSize="9">DC</tspan></T></>}
    <line x1={x0} y1={vpY} x2={x0 + w} y2={vpY} stroke={C.ion} strokeDasharray="6 4" /><T x={x0 + w + 4} y={vpY + 4} a="start" c={C.ion}>V<tspan baselineShift="sub" fontSize="9">P</tspan></T>
    <path d={path} fill="none" stroke={C.ink} strokeWidth="2" />
    {flows.map((xc, i) => <rect key={i} x={xc - 9} y={y0 + vdc - amp - 2} width={18} height={Math.max(4, vpY - (y0 + vdc - amp) + 6)} fill="#3b6fb6" opacity="0.35" />)}
    <T x={flows[1] + 60} y={y0 + vdc - amp - 14} s={12} c={C.w}>只有这些短暂时刻电子流向电极</T>
    <T x={340} y={262} s={12} c={C.muted}>{asym ? "小电极：交流电压围绕负的直流自偏压对称摆动，晶圆侧鞘层的平均电压约为等离子体电位加自偏压" : "对称电极：平均电压为 0，交流电压在 0 上下对称摆动"}</T>
  </Svg>;
}

// ---------- 图 9.12：四种机制 ----------
export function Fig912() {
  const P = ({ x, y, k, title }) => {
    const W = 260, open = 80;
    return <g>
      <Trench x={x} y={y + 70} W={W} H={70} open={open} depth={42} kind={k === 0 ? "iso" : "aniso"} />
      {k === 3 && <><rect x={x + W / 2 - open / 2} y={y + 70} width={5} height={42} fill={C.poly} /><rect x={x + W / 2 + open / 2 - 5} y={y + 70} width={5} height={42} fill={C.poly} /></>}
      {k !== 1 && <><Neu x={x + 70} y={y + 22} /><Arrow x1={x + 78} y1={y + 30} x2={x + W / 2 - 20} y2={y + 105} c="B" /></>}
      {k >= 1 && <><Ion x={x + W / 2 + 4} y={y + 18} /><Arrow x1={x + W / 2 + 4} y1={y + 28} x2={x + W / 2 + 4} y2={y + 108} c="R" /></>}
      <Arrow x1={x + W / 2 + 18} y1={y + 108} x2={x + W / 2 + 70} y2={y + 20} c="G" />
      <T x={x + W / 2 + 92} y={y + 24} s={11} c="#2c6e49">{k === 1 ? "溅射产物" : "挥发性产物"}</T>
      {k === 3 && <T x={x + 26} y={y + 60} s={11} c={C.poly} a="start">抑制剂</T>}
      <T x={x + W / 2} y={y + 160} s={12}>{title}</T>
    </g>;
  };
  return <Svg h={360} title="四种等离子体刻蚀机制">
    <P x={40} y={0} k={0} title="(a) 纯化学：自由基各向同性刻蚀" />
    <P x={380} y={0} k={1} title="(b) 纯物理：离子溅射" />
    <P x={40} y={180} k={2} title="(c) 离子增强化学刻蚀" />
    <P x={380} y={180} k={3} title="(d) 离子增强抑制剂刻蚀" />
  </Svg>;
}

// ---------- 图 9.13 / 9.15 / 9.18 / 9.20 小图 ----------
export function MechMini({ kind }) {
  const W = 300, x = 60, y = 110, open = 90;
  return <Svg w={420} h={210} title="刻蚀机制示意">
    <Trench x={x} y={y} W={W} H={80} open={open} depth={50} kind={kind === "chem" ? "iso" : "aniso"} />
    {kind === "inhib" && <><rect x={x + W / 2 - open / 2} y={y} width={6} height={50} fill={C.poly} /><rect x={x + W / 2 + open / 2 - 6} y={y} width={6} height={50} fill={C.poly} /><T x={x + 8} y={y + 40} s={11} c={C.poly} a="start">侧壁抑制剂</T></>}
    {kind !== "phys" && <><circle cx={x + 70} cy={30} r={7} fill="#9fd1a6" stroke="#2c6e49" /><T x={x + 70} y={18} s={12}>自由基</T><Arrow x1={x + 76} y1={38} x2={x + W / 2 - 25} y2={y + 42} c="B" />
      {kind === "chem" && <><circle cx={x + 230} cy={40} r={7} fill="#9fd1a6" stroke="#2c6e49" /><Arrow x1={x + 226} y1={48} x2={x + W / 2 + 40} y2={y + 30} c="B" /></>}</>}
    {kind !== "chem" && <><Ion x={x + W / 2} y={28} /><T x={x + W / 2} y={14} s={12}>离子</T><Arrow x1={x + W / 2} y1={38} x2={x + W / 2} y2={y + 46} c="R" /></>}
    <Arrow x1={x + W / 2 + 14} y1={y + 46} x2={x + W / 2 + 80} y2={30} c="G" /><T x={x + W / 2 + 112} y={26} s={12} c="#2c6e49">{kind === "phys" ? "溅射产物" : "挥发性产物"}</T>
  </Svg>;
}

// ---------- 图 9.14：桶式去胶机 ----------
export function Fig914() {
  return <Svg h={260} title="桶式氧等离子体去胶机的端视图与侧视图">
    <g transform="translate(160,130)">
      <circle r={100} fill="none" stroke={C.ink} strokeWidth="1.5" /><circle r={88} fill="url(#ch09-glow)" stroke={C.plasmaEdge} />
      <circle r={52} fill="#fff" stroke={C.ink} strokeDasharray="5 4" /><circle r={30} fill="#888" /><T x={0} y={4} c="#fff" s={12}>晶圆</T>
      <path d="M-110,-40 A117,117 0 0 1 -40,-110" fill="none" stroke={C.metal} strokeWidth="5" /><path d="M110,40 A117,117 0 0 1 40,110" fill="none" stroke={C.metal} strokeWidth="5" />
      <T x={-70} y={-112} s={11}>电极</T><T x={0} y={-62} s={11}>多孔屏蔽网（接地）</T><T x={0} y={74} s={11}>等离子体（环形区）</T><T x={0} y={122} s={11}>石英管</T>
      <T x={0} y={-118} s={11} c={C.muted}>端视图</T>
    </g>
    <g transform="translate(330,40)">
      <rect x={0} y={20} width={300} height={170} rx={20} fill="none" stroke={C.ink} strokeWidth="1.5" />
      <rect x={6} y={26} width={288} height={36} fill="url(#ch09-glow)" /><rect x={6} y={148} width={288} height={36} fill="url(#ch09-glow)" />
      <T x={150} y={48} s={12}>等离子体</T><T x={150} y={170} s={12}>等离子体</T>
      <line x1={6} y1={66} x2={294} y2={66} stroke={C.ink} strokeDasharray="4 3" /><line x1={6} y1={144} x2={294} y2={144} stroke={C.ink} strokeDasharray="4 3" />
      {Array.from({ length: 12 }, (_, i) => <rect key={i} x={40 + i * 19} y={80} width={6} height={52} fill="#777" />)}
      <T x={150} y={210} s={12}>侧视图：晶圆立在屏蔽网内，只有 O 自由基能进入</T>
      <Arrow x1={30} y1={0} x2={30} y2={22} c="B" /><T x={36} y={10} a="start" s={11}>O₂ 进气</T>
    </g>
  </Svg>;
}

// ---------- 图 9.16：溅射产额随入射角（示意，配交互） ----------
export function Fig916Left() {
  return <Svg w={300} h={180} title="离子以不同角度入射到带形貌的表面">
    <rect x={20} y={110} width={260} height={50} fill={C.si} stroke={C.siDark} /><rect x={20} y={95} width={70} height={15} fill={C.si} stroke={C.siDark} /><rect x={200} y={95} width={80} height={15} fill={C.si} stroke={C.siDark} />
    <Ion x={60} y={25} /><Arrow x1={64} y1={34} x2={86} y2={92} c="R" /><line x1={86} y1={95} x2={86} y2={40} stroke={C.muted} strokeDasharray="3 3" /><T x={92} y={60} s={12} a="start">θ</T>
    <Ion x={160} y={25} /><Arrow x1={166} y1={34} x2={198} y2={96} c="R" />
    <T x={150} y={176} s={11} c={C.muted}>同一束离子在台阶侧面上的入射角不同</T>
  </Svg>;
}

// ---------- 图 9.24：ICP ----------
export function Fig924() {
  return <Svg h={300} title="感应耦合等离子体刻蚀机：源功率与衬底偏压分开">
    <rect x={150} y={30} width={380} height={230} fill="none" stroke={C.ink} strokeWidth="1.5" />
    <rect x={300} y={40} width={80} height={90} fill="url(#ch09-glow)" />
    {[55, 75, 95, 115].map(y => <ellipse key={y} cx={340} cy={y} rx={58} ry={8} fill="none" stroke={C.metal} strokeWidth="3" />)}
    <path d="M300,130 L220,160 L220,200 L460,200 L460,160 L380,130 Z" fill="url(#ch09-glow)" />
    <rect x={270} y={215} width={140} height={8} fill="#888" /><rect x={240} y={223} width={200} height={10} fill="#333" />
    <RfSource x={110} y={85} label="ICP 射频" /><line x1={130} y1={85} x2={282} y2={85} stroke={C.ink} />
    <RfSource x={340} y={285} label="" /><line x1={340} y1={233} x2={340} y2={265} stroke={C.ink} /><T x={370} y={290} a="start">衬底射频（偏压）</T>
    <T x={560} y={70} a="start" s={12}>源功率 →</T><T x={560} y={88} a="start" s={12}>自由基密度（化学）</T>
    <T x={560} y={220} a="start" s={12}>偏压功率 →</T><T x={560} y={238} a="start" s={12}>离子能量（方向）</T>
    <T x={340} y={190}>高密度等离子体</T><T x={340} y={212} s={11}>晶圆</T>
  </Svg>;
}

// ---------- 图 9.23：Bosch 工艺（静态） ----------
export function Fig923() {
  const x = 380, y = 60, w = 60, r = 16;
  let d = `M${x - w / 2},${y}`; for (let k = 0; k < 5; k++) d += ` A${r},${r} 0 0 0 ${x - w / 2},${y + (k + 1) * 2 * r}`;
  const yb = y + 10 * r;
  return <Svg h={280} title="Bosch 工艺的三步循环与扇贝形侧壁">
    <g transform="translate(20,40)">
      <T x={110} y={0} w={600}>循环步骤</T>
      <T x={110} y={36}>① 钝化：C₄F₈ → (CF₂)ₙ</T><Arrow x1={110} y1={46} x2={110} y2={72} />
      <T x={110} y={92}>② 离子定向清除底部钝化层</T><Arrow x1={110} y1={102} x2={110} y2={128} />
      <T x={110} y={148}>③ SF₆ 各向同性刻蚀 Si</T>
      <path d="M230,148 C270,148 270,30 230,30" fill="none" stroke={C.muted} markerEnd="url(#ch09-arK)" />
      <T x={110} y={190} s={12} c={C.muted}>每步数秒，循环数十到数百次</T>
    </g>
    <rect x={280} y={y} width={200} height={210} fill={C.si} stroke={C.siDark} />
    <path d={`M${x - w / 2},${y} ${d.slice(d.indexOf(" A"))} Q${x},${yb + 22} ${x + w / 2},${yb} ${(() => { let s = ""; for (let k = 4; k >= 0; k--) s += ` A${r},${r} 0 0 0 ${x + w / 2},${y + k * 2 * r}`; return s; })()} Z`} fill="#fff" stroke={C.poly} strokeWidth="3" />
    <Mask x={280} y={y - 14} w={100 - w / 2} /><Mask x={x + w / 2} y={y - 14} w={100 - w / 2} />
    <T x={540} y={110} a="start" s={12} c={C.poly}>钝化层 (CF₂)ₙ</T><line x1={536} y1={106} x2={x + w / 2 + 14} y2={y + 3 * r} stroke={C.poly} />
    <T x={540} y={170} a="start" s={12}>扇贝形侧壁：</T><T x={540} y={186} a="start" s={12}>每个弧 = 一次各向同性刻蚀</T>
    <T x={380} y={y + 200} s={12}>Si</T>
  </Svg>;
}

// ---------- 图 9.27：刻蚀异常 ----------
export function Fig927() {
  return <Svg h={220} title="刻蚀异常：弓形、微沟槽与深宽比相关刻蚀">
    <g><rect x={20} y={60} width={190} height={120} fill={C.si} stroke={C.siDark} />
      <path d="M85,60 C70,100 75,150 90,165 L140,165 C155,150 160,100 145,60 Z" fill="#fff" stroke={C.ink} />
      <Mask x={20} y={46} w={65} /><Mask x={145} y={46} w={65} /><T x={115} y={205}>(a) 弓形 bowing</T></g>
    <g><rect x={245} y={60} width={190} height={120} fill={C.si} stroke={C.siDark} />
      <path d="M310,60 L312,165 L320,150 L360,150 L368,165 L370,60 Z" fill="#fff" stroke={C.ink} />
      <Mask x={245} y={46} w={65} /><Mask x={370} y={46} w={65} /><T x={340} y={205}>(b) 微沟槽 microtrenching</T></g>
    <g><rect x={470} y={60} width={190} height={120} fill={C.si} stroke={C.siDark} />
      <path d="M485,60 L485,95 L497,95 L497,60 Z M520,60 L520,120 L545,120 L545,60 Z M575,60 L575,150 L640,150 L640,60 Z" fill="#fff" stroke={C.ink} />
      <Mask x={470} y={46} w={15} /><Mask x={497} y={46} w={23} /><Mask x={545} y={46} w={30} /><Mask x={640} y={46} w={20} /><T x={565} y={205}>(c) 深宽比相关刻蚀 ARDE</T></g>
  </Svg>;
}

// ---------- 图 9.28：显式弦 vs 水平集 ----------
export function Fig928() {
  const pts = []; for (let i = 0; i <= 14; i++) { const t = Math.PI * i / 14; pts.push([140 - 80 * Math.cos(t), 70 + 110 * Math.sin(t)]); }
  const N = 26, cells = [];
  const phi = (x, y) => { const dx = x - 470, dy = y - 70; const r = Math.hypot(dx / 1.0, dy * 0.75); return r - 85; };
  for (let i = 0; i < N; i++) for (let j = 0; j < 16; j++) { const x = 360 + i * 9, y = 40 + j * 11, v = phi(x, y); cells.push(<rect key={i + "-" + j} x={x} y={y} width={9} height={11} fill={v < 0 ? `rgba(59,111,182,${Math.min(0.55, -v / 120)})` : `rgba(160,160,160,${Math.min(0.55, v / 120)})`} />); }
  return <Svg h={250} title="移动边界的两种表示：显式点串与隐式水平集">
    <path d={"M" + pts.map(p => p.join(",")).join(" L")} fill="none" stroke={C.ink} strokeWidth="2" />
    {pts.map(([x, y], i) => { const t = Math.PI * i / 14, nx = -Math.cos(t), ny = Math.sin(t); return <g key={i}><circle cx={x} cy={y} r={4} fill={C.ink} /><Arrow x1={x} y1={y} x2={x + nx * 20} y2={y + ny * 20} c="R" w={1.4} /></g>; })}
    <path d={"M" + pts.map(([x, y], i) => { const t = Math.PI * i / 14; return [x - Math.cos(t) * 24, y + Math.sin(t) * 24].join(","); }).join(" L")} fill="none" stroke={C.ion} strokeDasharray="5 4" />
    <T x={140} y={235}>显式：点串沿法向推进后重新连接</T>
    {cells}
    <ellipse cx={470} cy={70} rx={85} ry={113} fill="none" stroke={C.ink} strokeWidth="2.5" />
    <T x={470} y={235}>隐式：网格上的 φ，界面 = 零等值线 φ = 0</T>
    <T x={470} y={120} s={12} c={C.w}>φ &lt; 0（已刻空）</T><T x={590} y={200} s={12} c="#666" a="end">φ &gt; 0（固体）</T>
  </Svg>;
}

// ---------- 图 9.29 / 9.32：到达角分布与视角 ----------
const Fan = ({ x, y, n = 5, spread = 40, len = 26, c = "K" }) => <g>{Array.from({ length: n }, (_, k) => { const a = (-spread + 2 * spread * k / (n - 1)) * Math.PI / 180; return <Arrow key={k} x1={x} y1={y} x2={x + len * Math.sin(a)} y2={y + len * Math.cos(a)} c={c} w={1.4} />; })}</g>;
export function Fig929() {
  return <Svg h={270} title="离子与中性粒子以一定角分布到达晶圆表面">
    <rect x={120} y={20} width={440} height={50} fill="url(#ch09-glow)" stroke={C.plasmaEdge} /><T x={340} y={50}>等离子体</T>
    {[190, 280, 370, 460].map(x => <Fan key={x} x={x} y={82} spread={45} />)}
    <T x={520} y={100} a="start" s={12}>晶圆表面正上方的</T><T x={520} y={116} a="start" s={12}>到达角分布</T>
    <rect x={120} y={180} width={440} height={80} fill={C.si} stroke={C.siDark} />
    {[[150, 205], [295, 350], [440, 495]].map(([a, b], k) => <g key={k}><rect x={a} y={180} width={b - a} height={30} fill="#fff" stroke={C.siDark} /></g>)}
    {[[120, 150], [205, 295], [350, 440], [495, 560]].map(([a, b], k) => <Mask key={k} x={a} y={166} w={b - a} />)}
    <circle cx={160} cy={135} r={6} fill="#9fd1a6" stroke="#2c6e49" /><Arrow x1={162} y1={142} x2={168} y2={205} c="B" w={1.5} /><Ion x={190} y={140} r={6} /><Arrow x1={190} y1={148} x2={190} y2={205} c="R" w={1.5} />
    <circle cx={300} cy={130} r={6} fill="#9fd1a6" stroke="#2c6e49" /><Arrow x1={302} y1={137} x2={318} y2={205} c="B" w={1.5} /><Ion x={345} y={140} r={6} /><Arrow x1={344} y1={148} x2={336} y2={205} c="R" w={1.5} />
    <circle cx={500} cy={130} r={6} fill="#9fd1a6" stroke="#2c6e49" /><Arrow x1={498} y1={137} x2={480} y2={205} c="B" w={1.5} /><Ion x={450} y={140} r={6} /><Arrow x1={451} y1={148} x2={458} y2={205} c="R" w={1.5} />
    <T x={70} y={140} s={12}>自由基</T><T x={70} y={156} s={12}>离子</T>
  </Svg>;
}
export function Fig932() {
  return <Svg h={240} title="视角：表面点 i 只能看见部分入射通量，并接收来自点 g 的再发射">
    {[140, 230, 320, 410].map(x => <Fan key={x} x={x} y={20} spread={45} />)}
    <T x={560} y={40} s={12}>晶圆上方的到达角分布</T>
    <rect x={60} y={110} width={520} height={120} fill={C.si} stroke={C.siDark} />
    <rect x={230} y={110} width={200} height={70} fill="#fff" stroke={C.siDark} />
    <Mask x={60} y={96} w={170} /><Mask x={430} y={96} w={150} />
    <circle cx={232} cy={168} r={5} fill={C.ink} /><T x={222} y={172} a="end">点 i</T>
    <line x1={232} y1={168} x2={232} y2={50} stroke={C.ink} strokeDasharray="4 3" /><line x1={232} y1={168} x2={560} y2={70} stroke={C.ink} strokeDasharray="4 3" />
    <path d="M232,120 A48,48 0 0 1 278,154" fill="none" stroke={C.ion} strokeWidth="2" /><T x={268} y={118} s={12} c={C.ion} a="start">视角</T>
    <circle cx={428} cy={150} r={5} fill={C.ink} /><T x={440} y={154} a="start">点 g</T>
    {[-60, -30, 0, 30, 60].map(a => { const t = (180 + a) * Math.PI / 180; return <Arrow key={a} x1={428} y1={150} x2={428 + 24 * Math.cos(t)} y2={150 + 24 * Math.sin(t)} c="B" w={1.3} />; })}
    <T x={330} y={220} s={12}>点 g 按余弦分布再发射的中性粒子也能到达点 i</T>
  </Svg>;
}

// ---------- 图 9.34：IECE 示意 ----------
export function Fig934() {
  return <Svg w={520} h={240} title="F 自由基吸附生成 SiFx，自然脱附与离子增强脱附">
    <rect x={40} y={190} width={440} height={40} fill={C.si} stroke={C.siDark} />
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={58 + i * 30} cy={182} r={8} fill={i % 3 ? "#9fd1a6" : "#f0f0f0"} stroke={i % 3 ? "#2c6e49" : "#999"} />)}
    <circle cx={80} cy={60} r={9} fill="#9fd1a6" stroke="#2c6e49" /><T x={80} y={40}>F* 自由基</T><Arrow x1={88} y1={70} x2={150} y2={170} c="B" />
    <Ion x={240} y={50} /><T x={240} y={30}>离子</T><Arrow x1={240} y1={62} x2={240} y2={170} c="R" />
    <Arrow x1={255} y1={170} x2={330} y2={50} c="G" w={2.5} /><T x={360} y={40} s={12} c="#2c6e49">SiFₓ 离子增强脱附（快）</T>
    <Arrow x1={330} y1={172} x2={420} y2={120} c="G" w={1.2} dash="4 3" /><T x={430} y={112} s={12} c="#2c6e49" a="start">自然脱附（慢）</T>
    <T x={260} y={222} s={12}>绿色：被 SiFₓ 覆盖的位点（占比 θ_SS）；白色：空位</T>
  </Svg>;
}

// ---------- 图 9.37：ALE 两步 ----------
const Lattice = ({ x, y, cols = 7, rows = 3, top = "none", missing = [] }) => <g>
  {Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => <circle key={r + "-" + c} cx={x + c * 16} cy={y + r * 15} r={7.5} fill="#9a9a9a" stroke="#666" />))}
  {top !== "none" && Array.from({ length: cols }, (_, c) => missing.includes(c) ? null : <circle key={"t" + c} cx={x + c * 16} cy={y - 15} r={7.5} fill={top === "cl" ? "#c7e9b4" : "#9a9a9a"} stroke={top === "cl" ? "#2c6e49" : "#666"} />)}
</g>;
export function Fig937() {
  return <Svg h={200} title="原子层刻蚀一个周期的两个半反应">
    <Lattice x={30} y={110} top="si" /><circle cx={60} cy={50} r={6} fill="#c7e9b4" stroke="#2c6e49" /><circle cx={71} cy={50} r={6} fill="#c7e9b4" stroke="#2c6e49" /><T x={95} y={40} s={12}>Cl₂</T>
    <T x={78} y={170} s={12}>洁净 Si 表面</T><Arrow x1={140} y1={110} x2={175} y2={110} />
    <Lattice x={190} y={110} top="cl" /><T x={238} y={170} s={12}>反应 A：氯化改性</T><T x={238} y={186} s={11} c={C.muted}>（自限制：一层即饱和）</T>
    <Arrow x1={300} y1={110} x2={335} y2={110} />
    <Lattice x={350} y={110} top="cl" missing={[1, 4]} /><Ion x={370} y={40} r={7} /><Arrow x1={370} y1={48} x2={370} y2={80} c="R" /><Ion x={420} y={40} r={7} /><Arrow x1={420} y1={48} x2={420} y2={80} c="R" />
    <circle cx={400} cy={62} r={7} fill="#c7e9b4" stroke="#2c6e49" /><T x={400} y={170} s={12}>反应 B：Ar⁺ 去除 SiClₓ</T>
    <Arrow x1={460} y1={110} x2={495} y2={110} />
    <Lattice x={510} y={125} rows={2} top="si" /><T x={558} y={170} s={12}>少了一层，回到洁净表面</T>
  </Svg>;
}

// ---------- 图 9.40：ALE 窗口 ----------
export function Fig940() {
  const X = e => 70 + e * 5.2, Y = v => 230 - v * 150;
  const epc = e => e < 20 ? 0 : e < 38 ? (e - 20) / 18 : e < 70 ? 1 : 1 + (e - 70) * 0.025;
  const d = Array.from({ length: 101 }, (_, i) => { const e = i; return `${i ? "L" : "M"}${X(e).toFixed(1)},${Y(epc(e)).toFixed(1)}`; }).join(" ");
  return <Svg h={270} title="每周期刻蚀量随离子能量的变化：ALE 窗口">
    <rect x={X(38)} y={30} width={X(70) - X(38)} height={200} fill="#e3f1e6" />
    <line x1={70} y1={230} x2={610} y2={230} stroke={C.ink} markerEnd="url(#ch09-arK)" /><line x1={70} y1={230} x2={70} y2={25} stroke={C.ink} markerEnd="url(#ch09-arK)" />
    <path d={d} fill="none" stroke={C.ink} strokeWidth="2.5" />
    <line x1={X(38)} y1={30} x2={X(38)} y2={230} stroke={C.muted} strokeDasharray="4 3" /><line x1={X(70)} y1={30} x2={X(70)} y2={230} stroke={C.muted} strokeDasharray="4 3" />
    <T x={X(18)} y={60}>去除不完全</T><T x={X(54)} y={60} c="#2c6e49" w={600}>ALE 窗口</T><T x={X(54)} y={78} s={12} c="#2c6e49">EPC ≈ 1 层，平台</T><T x={X(86)} y={60}>溅射</T>
    <T x={340} y={258}>离子能量 →</T><text transform="translate(40,130) rotate(-90)" textAnchor="middle" fontSize="12">每周期刻蚀量 EPC</text>
  </Svg>;
}

// ---------- 图 9.42：光刻胶回刻 ----------
export function Fig942() {
  return <Svg w={480} h={210} title="光刻胶回刻平坦化">
    <rect x={60} y={130} width={300} height={70} fill={C.si} stroke={C.siDark} />
    <path d="M60,130 L60,100 L100,100 Q110,70 140,70 L170,70 Q185,70 190,100 L205,100 Q210,70 240,70 L265,70 Q285,70 290,100 L360,100 L360,130 Z" fill={C.ox} stroke={C.oxEdge} />
    <rect x={110} y={95} width={40} height={35} fill={C.metal} stroke="#9a7a10" /><rect x={215} y={95} width={40} height={35} fill={C.metal} stroke="#9a7a10" />
    <path d="M60,100 L100,100 Q110,70 140,70 L170,70 Q185,70 190,100 L205,100 Q210,70 240,70 L265,70 Q285,70 290,100 L360,100 L360,50 L60,50 Z" fill={C.resist} opacity="0.75" stroke={C.resistEdge} />
    <line x1={60} y1={88} x2={360} y2={88} stroke={C.ion} strokeDasharray="6 4" strokeWidth="2" />
    <T x={210} y={42} s={12}>光刻胶（液态涂布，上表面平）</T><T x={300} y={124} s={12}>氧化物</T>
    <Arrow x1={385} y1={50} x2={385} y2={86} /><T x={395} y={64} a="start" s={12}>以 S = 1 回刻</T><T x={395} y={80} a="start" s={12} c={C.ion}>到虚线处</T>
  </Svg>;
}

// ---------- 图 9.43：DOP ----------
export function Fig943() {
  const Block = ({ x, top }) => <g>
    <rect x={x} y={130} width={250} height={60} fill={C.si} stroke={C.siDark} />
    {top === 0 ? <path d={`M${x},130 L${x},105 L${x + 30},105 Q${x + 35},78 ${x + 60},78 L${x + 90},78 Q${x + 110},78 ${x + 115},105 L${x + 135},105 Q${x + 140},78 ${x + 165},78 L${x + 195},78 Q${x + 215},78 ${x + 220},105 L${x + 250},105 L${x + 250},130 Z`} fill={C.ox} stroke={C.oxEdge} />
      : <rect x={x} y={92} width={250} height={38} fill={C.ox} stroke={C.oxEdge} />}
    <rect x={x + 45} y={105} width={45} height={25} fill={C.metal} /><rect x={x + 150} y={105} width={45} height={25} fill={C.metal} />
  </g>;
  return <Svg h={220} title="平坦化程度 DOP = 0 与 DOP = 1">
    <Block x={40} top={0} /><Block x={380} top={1} />
    <line x1={20} y1={78} x2={20} y2={105} stroke={C.ink} markerStart="url(#ch09-arK)" markerEnd="url(#ch09-arK)" /><T x={14} y={96} a="end" s={12}>x<tspan baselineShift="super" fontSize="9">f</tspan></T>
    <line x1={320} y1={105} x2={320} y2={130} stroke={C.ink} markerStart="url(#ch09-arK)" markerEnd="url(#ch09-arK)" /><T x={328} y={122} a="start" s={12}>x<tspan baselineShift="super" fontSize="9">i</tspan>（初始台阶）</T>
    <T x={165} y={212}>DOP = 0：台阶原样保留（x^f = x^i）</T><T x={505} y={212}>DOP = 1：完全平坦（x^f = 0）</T>
  </Svg>;
}

// ---------- 图 9.44：CMP 机台 ----------
export function Fig944() {
  return <Svg h={260} title="CMP 机台基本结构">
    <rect x={90} y={150} width={460} height={34} fill="#9a9a9a" stroke="#666" /><rect x={90} y={142} width={460} height={8} fill="#efe6c8" stroke="#a89a6a" />
    <T x={320} y={172} c="#fff">抛光台（platen），可加热/冷却</T><T x={560} y={150} a="start" s={12}>抛光垫</T>
    <rect x={295} y={184} width={50} height={50} fill="#777" /><path d="M285,215 A35,12 0 1 0 355,215" fill="none" stroke={C.ink} markerEnd="url(#ch09-arK)" />
    <rect x={140} y={112} width={120} height={22} fill="#bbb" stroke="#666" /><rect x={150} y={134} width={100} height={7} fill={C.ox} stroke={C.oxEdge} />
    <line x1={200} y1={112} x2={200} y2={50} stroke="#666" strokeWidth="8" /><Arrow x1={200} y1={20} x2={200} y2={48} /><T x={210} y={30} a="start" s={12}>背压 P</T>
    <path d="M170,72 A30,10 0 1 0 230,72" fill="none" stroke={C.ink} markerEnd="url(#ch09-arK)" />
    <T x={120} y={100} s={12} a="end">晶圆（正面朝下）</T>
    <line x1={330} y1={30} x2={330} y2={140} stroke={C.w} strokeDasharray="5 4" /><T x={338} y={40} a="start" s={12} c={C.w}>抛光液（磨粒 + 化学试剂）</T>
    <rect x={420} y={118} width={90} height={22} fill="#ccc" stroke="#666" /><line x1={465} y1={118} x2={465} y2={70} stroke="#666" strokeWidth="6" /><T x={465} y={62} s={12}>修整器</T>
  </Svg>;
}
