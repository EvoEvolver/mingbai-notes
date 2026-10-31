// 第 I 章补充材料的自绘示意图（SVG）。不裁剪原书插图：只按物理内容重新画出。
import { TxI, renderTex } from "@kit";

const R = String.raw;
const INK = "var(--ink, #1f1b16)", MUTED = "var(--muted, #777)", ACC = "#c0392b", BLUE = "#2c4a6e", GREEN = "#2c6e49";

function Fig({ caption, children, w = 560, h = 260 }) {
  return (
    <figure className="tb-fig" style={{ margin: "1.2em auto" }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", maxWidth: w, display: "block", margin: "0 auto" }} role="img">
        <defs>
          <marker id="c1c-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={INK} /></marker>
          <marker id="c1c-arr-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={ACC} /></marker>
          <marker id="c1c-arr-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={BLUE} /></marker>
        </defs>
        {children}
      </svg>
      {caption && <figcaption><TxI>{caption}</TxI></figcaption>}
    </figure>);
}
const T = ({ x, y, children, size = 15, anchor = "middle", color = INK, it = true }) =>
  <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={color} fontStyle={it ? "italic" : "normal"} fontFamily="var(--serif, serif)">{children}</text>;
// 数学标签：KaTeX 渲染（foreignObject），(x, y) 为文字基线中点
const L = ({ x, y, tex, size = 15, color = INK, w = 110 }) =>
  <foreignObject x={x - w / 2} y={y - size * 1.25} width={w} height={size * 2}>
    <div style={{ textAlign: "center", fontSize: size, color, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} />
  </foreignObject>;

// ---------- D_I：可动缝板装置 ----------
export function DoubleSlitPlateFig() {
  const px = 170, sx = 470, y0 = 140, a = 70, F1 = y0 - a / 2, F2 = y0 + a / 2, My = 52;
  return (
    <Fig caption={R`自绘示意：可以竖直滑动的缝板 $\mathscr P$（两端接弹簧）。光子从左方垂直入射，经 $F_1$ 或 $F_2$ 到达屏上的点 $M$；两条路径的偏转角 $\theta_1\neq\theta_2$，因此传给板的竖直动量不同。`} h={290}>
      {/* 入射光 */}
      {[F1 - 40, F1, F2, F2 + 40].map((y, i) => <line key={i} x1={30} y1={y} x2={px - 6} y2={y} stroke={MUTED} strokeWidth={1.2} markerEnd="url(#c1c-arr)" />)}
      <T x={30} y={F1 - 62} size={13} it={false} color={MUTED} anchor="start">入射光（光源在无穷远）</T>
      {/* 板与弹簧 */}
      <line x1={px} y1={30} x2={px} y2={F1 - 6} stroke={INK} strokeWidth={4} />
      <line x1={px} y1={F1 + 6} x2={px} y2={F2 - 6} stroke={INK} strokeWidth={4} />
      <line x1={px} y1={F2 + 6} x2={px} y2={250} stroke={INK} strokeWidth={4} />
      <path d={`M${px},30 l-8,-4 l16,-4 l-16,-4 l8,-4`} fill="none" stroke={INK} />
      <path d={`M${px},250 l-8,4 l16,4 l-16,4 l8,4`} fill="none" stroke={INK} />
      <line x1={px - 18} y1={10} x2={px + 18} y2={10} stroke={INK} strokeWidth={2} /><line x1={px - 18} y1={272} x2={px + 18} y2={272} stroke={INK} strokeWidth={2} />
      <line x1={px + 30} y1={200} x2={px + 30} y2={170} stroke={GREEN} strokeWidth={2} markerEnd="url(#c1c-arr)" /><line x1={px + 30} y1={200} x2={px + 30} y2={230} stroke={GREEN} strokeWidth={2} markerEnd="url(#c1c-arr)" />
      <L x={px - 24} y={210} tex={R`\mathscr P`} />
      <L x={px - 30} y={F1 + 4} size={14} w={40} tex="F_1" /><L x={px - 30} y={F2 + 4} size={14} w={40} tex="F_2" />
      {/* 屏 */}
      <line x1={sx} y1={20} x2={sx} y2={260} stroke={INK} strokeWidth={2} />
      <L x={sx + 18} y={262} tex={R`\mathscr E`} />
      <line x1={sx} y1={y0} x2={sx - 6} y2={y0} stroke={INK} /><L x={sx + 14} y={y0 + 5} size={14} tex="O" />
      <circle cx={sx} cy={My} r={4} fill={ACC} /><L x={sx + 18} y={My + 5} tex="M" />
      <line x1={sx + 40} y1={y0} x2={sx + 40} y2={My} stroke={MUTED} markerEnd="url(#c1c-arr)" /><L x={sx + 52} y={(y0 + My) / 2} tex="x" />
      {/* 两条路径 */}
      <line x1={px} y1={F1} x2={sx} y2={My} stroke={BLUE} strokeWidth={1.8} />
      <line x1={px} y1={F2} x2={sx} y2={My} stroke={ACC} strokeWidth={1.8} />
      <line x1={px} y1={F1} x2={px + 110} y2={F1} stroke={BLUE} strokeDasharray="4 3" /><line x1={px} y1={F2} x2={px + 110} y2={F2} stroke={ACC} strokeDasharray="4 3" />
      <path d={`M${px + 80},${F1} A80,80 0 0,0 ${px + 79},${F1 - 7}`} fill="none" stroke={BLUE} /><L x={px + 98} y={F1 - 6} size={14} color={BLUE} tex={R`\theta_1`} />
      <path d={`M${px + 80},${F2} A80,80 0 0,0 ${px + 75},${F2 - 27}`} fill="none" stroke={ACC} /><L x={px + 100} y={F2 - 14} size={14} color={ACC} tex={R`\theta_2`} />
      {/* d */}
      <line x1={px + 4} y1={262} x2={sx - 4} y2={262} stroke={MUTED} strokeDasharray="5 4" markerStart="url(#c1c-arr)" markerEnd="url(#c1c-arr)" /><L x={(px + sx) / 2} y={280} tex="d" />
      <line x1={px - 40} y1={F1} x2={px - 40} y2={F2} stroke={MUTED} markerStart="url(#c1c-arr)" markerEnd="url(#c1c-arr)" /><L x={px - 54} y={y0 + 5} tex={R`\sym{aD}{a}`} />
    </Fig>);
}

// ---------- E_I：三个波矢与 g(k_y) 的采样 ----------
export function WaveVectorFig() {
  const ox = 70, oy = 120, LEN = 200, dth = 0.26;
  const k2 = [ox + LEN, oy - LEN * Math.tan(dth)], k3 = [ox + LEN, oy + LEN * Math.tan(dth)];
  const gx = 400, gy = 200, gw = 120, gh = 140;
  const gauss = u => Math.exp(-u * u / (2 * 0.36));
  return (
    <Fig caption={R`自绘示意。左：三个波矢 $\mathbf k_1,\mathbf k_2,\mathbf k_3$ 在 $Ox$ 上的投影相同，$\mathbf k_2,\mathbf k_3$ 与 $\mathbf k_1$ 夹角为 $\pm\Delta\theta$，$k_y$ 的跨度为 $\Delta k_y=2k\Delta\theta$。右：三个 $k_y$ 值（实线）是对一个有峰的连续分布 $|g(\mathbf k)|$（虚线）的粗略采样，振幅为 $1,\frac12,\frac12$。`} h={250}>
      <line x1={ox - 20} y1={oy} x2={ox + LEN + 50} y2={oy} stroke={MUTED} markerEnd="url(#c1c-arr)" /><L x={ox + LEN + 62} y={oy + 5} tex="k_x" />
      <line x1={ox} y1={oy + 90} x2={ox} y2={oy - 100} stroke={MUTED} markerEnd="url(#c1c-arr)" /><L x={ox + 18} y={oy - 96} tex="k_y" />
      <line x1={ox} y1={oy} x2={ox + LEN} y2={oy} stroke={INK} strokeWidth={2.4} markerEnd="url(#c1c-arr)" />
      <line x1={ox} y1={oy} x2={k2[0]} y2={k2[1]} stroke={BLUE} strokeWidth={2.4} markerEnd="url(#c1c-arr-b)" />
      <line x1={ox} y1={oy} x2={k3[0]} y2={k3[1]} stroke={ACC} strokeWidth={2.4} markerEnd="url(#c1c-arr-r)" />
      <L x={k2[0] + 18} y={k2[1] + 4} tex={R`\mathbf k_2`} /><L x={ox + LEN + 18} y={oy - 6} tex={R`\mathbf k_1`} /><L x={k3[0] + 18} y={k3[1] + 8} tex={R`\mathbf k_3`} />
      <line x1={ox + LEN} y1={k2[1]} x2={ox + LEN} y2={k3[1]} stroke={MUTED} strokeDasharray="3 3" />
      <path d={`M${ox + 70},${oy} A70,70 0 0,0 ${ox + 70 * Math.cos(dth)},${oy - 70 * Math.sin(dth)}`} fill="none" stroke={INK} /><L x={ox + 96} y={oy - 6} size={13} tex={R`\Delta\theta`} />
      <path d={`M${ox + 55},${oy} A55,55 0 0,1 ${ox + 55 * Math.cos(dth)},${oy + 55 * Math.sin(dth)}`} fill="none" stroke={INK} /><L x={ox + 82} y={oy + 24} size={13} tex={R`\Delta\theta`} />
      <line x1={ox - 34} y1={k2[1]} x2={ox - 34} y2={k3[1]} stroke={MUTED} markerStart="url(#c1c-arr)" markerEnd="url(#c1c-arr)" /><L x={ox - 58} y={oy + 5} size={13} w={60} tex={R`\Delta k_y`} />
      {/* 右图 */}
      <line x1={gx - gw} y1={gy} x2={gx + gw + 20} y2={gy} stroke={MUTED} markerEnd="url(#c1c-arr)" /><L x={gx + gw + 32} y={gy + 5} tex="k_y" />
      <line x1={gx} y1={gy + 10} x2={gx} y2={gy - gh - 20} stroke={MUTED} markerEnd="url(#c1c-arr)" /><L x={gx + 36} y={gy - gh - 14} size={14} tex={R`|g(\mathbf k)|`} />
      <path d={Array.from({ length: 81 }, (_, i) => { const u = -2 + i * 0.05; return `${i ? "L" : "M"}${gx + u * 60},${gy - gh * gauss(u)}`; }).join("")} fill="none" stroke={INK} strokeDasharray="5 4" />
      {[-1, 0, 1].map(u => <line key={u} x1={gx + u * 60} y1={gy} x2={gx + u * 60} y2={gy - gh * (u ? 0.5 : 1)} stroke={u ? (u > 0 ? BLUE : ACC) : INK} strokeWidth={2.4} />)}
      <L x={gx - 60} y={gy + 20} size={13} tex={R`-k\Delta\theta`} /><L x={gx + 60} y={gy + 20} size={13} tex={R`k\Delta\theta`} />
      <L x={gx - 14} y={gy - gh + 4} size={13} w={30} tex="1" /><L x={gx - 14} y={gy - gh / 2 + 4} size={13} w={30} tex={R`\tfrac12`} />
    </Fig>);
}

// ---------- E_I：狭缝衍射 ----------
export function SlitDiffractionFig() {
  return (
    <Fig caption={R`自绘示意：宽为 $\Delta y$ 的狭缝把平面波截成有限宽度，出射波的方向随之弥散，角宽度约 $2\lambda/\Delta y$。缝越窄，$\Delta k_y$ 越大。`} h={200} w={520}>
      {[60, 100, 140].map(y => <line key={y} x1={30} y1={y} x2={170} y2={y} stroke={INK} markerEnd="url(#c1c-arr)" />)}
      <line x1={220} y1={10} x2={220} y2={78} stroke={INK} strokeWidth={4} /><line x1={220} y1={122} x2={220} y2={190} stroke={INK} strokeWidth={4} />
      <line x1={205} y1={80} x2={205} y2={120} stroke={MUTED} strokeDasharray="3 3" markerStart="url(#c1c-arr)" markerEnd="url(#c1c-arr)" /><L x={184} y={105} size={14} w={50} tex={R`\Delta y`} />
      {[-0.3, -0.15, 0, 0.15, 0.3].map((th, i) => <line key={i} x1={240} y1={100} x2={240 + 200 * Math.cos(th)} y2={100 - 200 * Math.sin(th)} stroke={i === 2 ? INK : BLUE} strokeWidth={1.6} markerEnd="url(#c1c-arr)" />)}
      <path d={`M${240 + 150 * Math.cos(0.3)},${100 - 150 * Math.sin(0.3)} A150,150 0 0,1 ${240 + 150 * Math.cos(0.3)},${100 + 150 * Math.sin(0.3)}`} fill="none" stroke={ACC} strokeDasharray="4 3" />
      <L x={440} y={104} size={14} w={150} color={ACC} tex={R`2\Delta\theta\simeq2\lambda/\Delta y`} />
    </Fig>);
}

// ---------- H_I：势阶 / 势垒 / 势阱 ----------
export function PotentialSketch({ kind }) {
  const W = 520, H = 170, x0 = 230, yb = 120, yt = 50;
  const cap = { step: R`自绘：高为 $V_0$ 的势阶。区域 I（$x<0$）$V=0$，区域 II（$x>0$）$V=V_0$。`, barrier: R`自绘：宽 $l$、高 $V_0$ 的方势垒，三个区域 I、II、III。`, well: R`自绘：宽 $a$、深 $V_0$ 的对称方势阱，阱底为 $-V_0$，阱外 $V=0$。` }[kind];
  let path, labels;
  if (kind === "step") { path = `M40,${yb} L${x0},${yb} L${x0},${yt} L${W - 40},${yt}`; labels = [[130, 90, "I"], [380, 90, "II"]]; }
  else if (kind === "barrier") { path = `M40,${yb} L${x0},${yb} L${x0},${yt} L${x0 + 110},${yt} L${x0 + 110},${yb} L${W - 40},${yb}`; labels = [[130, 90, "I"], [x0 + 55, 90, "II"], [430, 90, "III"]]; }
  else { path = `M40,${yt + 10} L${x0 - 60},${yt + 10} L${x0 - 60},${yb + 30} L${x0 + 60},${yb + 30} L${x0 + 60},${yt + 10} L${W - 40},${yt + 10}`; labels = [[110, 110, "I"], [x0, 110, "II"], [400, 110, "III"]]; }
  const axisY = kind === "well" ? yt + 10 : yb;
  return (
    <Fig caption={cap} w={W} h={H + (kind === "well" ? 15 : 0)}>
      <line x1={30} y1={axisY} x2={W - 20} y2={axisY} stroke={MUTED} markerEnd="url(#c1c-arr)" /><L x={W - 10} y={axisY + 5} w={30} tex="x" />
      <line x1={x0} y1={H - 2} x2={x0} y2={14} stroke={MUTED} markerEnd="url(#c1c-arr)" /><L x={x0 + 30} y={24} w={60} tex="V(x)" />
      <path d={path} fill="none" stroke={ACC} strokeWidth={2.6} />
      {labels.map(([x, y, s]) => <g key={s}><circle cx={x} cy={y} r={13} fill="none" stroke={INK} /><T x={x} y={y + 5} size={13} it={false}>{s}</T></g>)}
      {kind === "step" && <><L x={x0 - 22} y={yt + 5} w={40} tex="V_0" /><T x={x0 - 8} y={yb + 18} it={false}>0</T></>}
      {kind === "barrier" && <><L x={x0 - 22} y={yt + 5} w={40} tex="V_0" /><T x={x0 - 8} y={yb + 18} it={false}>0</T><L x={x0 + 110} y={yb + 20} w={30} tex="l" /></>}
      {kind === "well" && <><L x={x0 - 60} y={yt} w={60} tex="-a/2" /><L x={x0 + 62} y={yt} w={60} tex="+a/2" /><L x={x0 + 34} y={yb + 50} w={50} tex="-V_0" /></>}
    </Fig>);
}

// ---------- K_I 习题 1：核链 ----------
export function ChainFig() {
  return (
    <Fig caption={R`自绘：中子束垂直射向间距为 $l$ 的一列原子核，探测器 $D$ 位于与入射方向成 $\theta$ 角处。相邻核在 $D$ 方向上散射波的程差为 $l\sin\theta$。`} h={170} w={520}>
      {[50, 80, 110].map(y => <line key={y} x1={30} y1={y} x2={110} y2={y} stroke={INK} markerEnd="url(#c1c-arr)" />)}
      {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={140} cy={35 + i * 15} r={5} fill="none" stroke={INK} />)}
      <line x1={152} y1={35} x2={152} y2={50} stroke={MUTED} /><L x={164} y={48} size={13} w={20} tex="l" />
      <line x1={140} y1={80} x2={480} y2={80} stroke={MUTED} />
      <line x1={140} y1={80} x2={440} y2={150} stroke={INK} />
      <rect x={430} y={140} width={34} height={14} fill="none" stroke={INK} transform="rotate(13 447 147)" /><L x={455} y={135} w={30} tex="D" />
      <path d="M250,80 A110,110 0 0,1 247,105" fill="none" stroke={INK} /><L x={268} y={100} size={14} w={30} tex={R`\theta`} />
    </Fig>);
}
