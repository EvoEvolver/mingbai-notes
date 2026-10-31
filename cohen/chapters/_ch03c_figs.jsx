// 第 III 章补充材料（上）的自绘示意图（SVG）。不裁剪原书插图：只按物理内容重新画出。
import { renderTex } from "@kit";
import { Fig } from "./_ch03c_kit.jsx";

const R = String.raw;
const INK = "var(--ink, #1f1b16)", MUTED = "var(--muted, #777)", RED = "#c0392b", BLUE = "#2c4a6e", GREEN = "#2c6e49";

function Svg({ w, h, children }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", maxWidth: w, display: "block", margin: "0 auto" }} role="img">
      <defs>
        <marker id="c3c-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={INK} /></marker>
        <marker id="c3c-arr-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={RED} /></marker>
        <marker id="c3c-arr-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={BLUE} /></marker>
      </defs>
      {children}
    </svg>);
}
// 数学标签（KaTeX，foreignObject），(x, y) 为基线中点
const L = ({ x, y, tex, size = 15, color = INK, w = 120 }) =>
  <foreignObject x={x - w / 2} y={y - size * 1.25} width={w} height={size * 2}>
    <div style={{ textAlign: "center", fontSize: size, color, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} />
  </foreignObject>;

// ---------- B_III 图 1：势阶 ----------
export function StepFig() {
  return (
    <Fig caption={R`自绘示意：高为 $V_0$ 的势阶。粒子从区域 I（$x<0$，$V=0$）射向区域 II（$x>0$，$V=V_0$）。虚线标出两种能量情形：$E>V_0$（部分反射）与 $E<V_0$（全反射）。`}>
      <Svg w={520} h={200}>
        <line x1={30} y1={160} x2={500} y2={160} stroke={INK} markerEnd="url(#c3c-arr)" />
        <line x1={260} y1={185} x2={260} y2={15} stroke={INK} markerEnd="url(#c3c-arr)" />
        <path d="M30,160 L260,160 L260,80 L490,80" fill="none" stroke={INK} strokeWidth={3} />
        <line x1={40} y1={50} x2={480} y2={50} stroke={BLUE} strokeDasharray="6 4" /><L x={455} y={45} tex={R`E>V_0`} color={BLUE} w={80} size={13} />
        <line x1={40} y1={110} x2={480} y2={110} stroke={RED} strokeDasharray="6 4" /><L x={455} y={128} tex={R`E<V_0`} color={RED} w={80} size={13} />
        <L x={245} y={86} tex="V_0" w={40} size={14} /><L x={255} y={182} tex="0" w={30} size={13} /><L x={492} y={182} tex="x" w={30} size={14} />
        <L x={285} y={22} tex="V(x)" w={60} size={14} />
        <text x={140} y={145} fontSize={16} textAnchor="middle" fill={INK}>I</text><text x={380} y={70} fontSize={16} textAnchor="middle" fill={INK}>II</text>
        <line x1={70} y1={35} x2={130} y2={35} stroke={GREEN} strokeWidth={2} markerEnd="url(#c3c-arr)" /><text x={100} y={28} fontSize={12} textAnchor="middle" fill={GREEN}>入射</text>
      </Svg>
    </Fig>);
}

// ---------- B_III 图 2：入射与反射的流相加 ----------
export function WaveVectorFig() {
  const ox = 200, oy = 190, kx = 110, ky = 78;
  return (
    <Fig caption={R`自绘示意：入射波矢 $\mathbf k_i=(k_x,k_y)$ 与反射波矢 $\mathbf k_r=(-k_x,k_y)$。两者的流按矢量相加，$x$ 分量抵消，剩下沿界面（$Oy$）的 $2k_y$：这就是 \eqref{BIII-25} 中常数项 $2|A|^2$ 的来源。`}>
      <Svg w={420} h={215}>
        <line x1={ox} y1={oy} x2={ox + kx} y2={oy - ky} stroke={BLUE} strokeWidth={2.4} markerEnd="url(#c3c-arr-b)" />
        <line x1={ox} y1={oy} x2={ox - kx} y2={oy - ky} stroke={RED} strokeWidth={2.4} markerEnd="url(#c3c-arr-r)" />
        <line x1={ox} y1={oy} x2={ox} y2={oy - 2 * ky} stroke={INK} strokeWidth={2.6} markerEnd="url(#c3c-arr)" />
        <line x1={ox + kx} y1={oy - ky} x2={ox} y2={oy - 2 * ky} stroke={MUTED} strokeDasharray="5 4" />
        <line x1={ox - kx} y1={oy - ky} x2={ox} y2={oy - 2 * ky} stroke={MUTED} strokeDasharray="5 4" />
        <L x={ox + kx + 22} y={oy - ky + 4} tex={R`\mathbf k_i`} color={BLUE} w={40} />
        <L x={ox - kx - 22} y={oy - ky + 4} tex={R`\mathbf k_r`} color={RED} w={40} />
        <L x={ox + 34} y={oy - 2 * ky + 22} tex={R`2k_y`} w={60} />
        <line x1={40} y1={oy + 10} x2={380} y2={oy + 10} stroke={MUTED} /><text x={385} y={oy + 14} fontSize={12} fill={MUTED}>x</text>
      </Svg>
    </Fig>);
}

// ---------- B_III 图 4：反射的侧向位移 ----------
export function LateralShiftFig() {
  const x0 = 300;   // 界面 x = 0
  return (
    <Fig caption={R`自绘示意：斜入射全反射时，波包有一部分钻入禁区（阴影，深度 $\sim1/2\rho_x$），在其中沿界面前进一段（约为 $\frac{\hbar k_y}m\,\sym{tauD}{\tau}$）后返回。反射波包（实线）相对几何反射（虚线）沿 $Oy$ 平移。`}>
      <Svg w={520} h={260}>
        <rect x={x0} y={10} width={200} height={240} fill="#eee" />
        <rect x={x0} y={10} width={26} height={240} fill="#d9e4ef" />
        <line x1={x0} y1={10} x2={x0} y2={250} stroke={INK} strokeWidth={2} />
        <text x={x0 + 70} y={30} fontSize={13} fill={MUTED} textAnchor="middle">禁区 II</text><L x={x0 + 140} y={34} tex={R`V_0>E_1`} color={MUTED} w={90} size={13} />
        <text x={x0 - 150} y={30} fontSize={13} fill={MUTED} textAnchor="middle">区域 I</text>
        {/* 入射 */}
        <line x1={60} y1={230} x2={x0} y2={140} stroke={BLUE} strokeWidth={2.4} markerEnd="url(#c3c-arr-b)" />
        {/* 几何反射 */}
        <line x1={x0} y1={140} x2={60} y2={50} stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 4" markerEnd="url(#c3c-arr)" />
        {/* 禁区中的路径与实际反射 */}
        <path d={`M${x0},140 L${x0 + 14},130 L${x0 + 14},112 L${x0},102`} fill="none" stroke={RED} strokeWidth={2} />
        <line x1={x0} y1={102} x2={60} y2={12} stroke={RED} strokeWidth={2.4} markerEnd="url(#c3c-arr-r)" />
        <line x1={x0 - 30} y1={140} x2={x0 - 30} y2={102} stroke={INK} markerStart="url(#c3c-arr)" markerEnd="url(#c3c-arr)" />
        <text x={x0 - 36} y={126} fontSize={12} textAnchor="end" fill={INK}>侧向位移</text>
        <line x1={x0 + 60} y1={230} x2={x0 + 60} y2={180} stroke={INK} markerEnd="url(#c3c-arr)" /><L x={x0 + 78} y={200} tex="y" w={30} size={14} />
      </Svg>
    </Fig>);
}
