// 第 III 章补充材料（下）的自绘示意图（SVG）。不裁剪原书插图：只按物理内容重新画出。
import { TxI, renderTex } from "@kit";

const R = String.raw;
const INK = "var(--ink, #1f1b16)", MUTED = "var(--muted, #777)", ACC = "#c0392b", BLUE = "#2c4a6e", GREEN = "#2c6e49";

function Fig({ caption, children, w = 620, h = 260 }) {
  return (
    <figure className="tb-fig" style={{ margin: "1.2em auto" }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", maxWidth: w, display: "block", margin: "0 auto" }} role="img">
        <defs>
          <marker id="c3d-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={INK} /></marker>
          <marker id="c3d-arr-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={BLUE} /></marker>
          <marker id="c3d-arr-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={ACC} /></marker>
        </defs>
        {children}
      </svg>
      {caption && <figcaption><TxI>{caption}</TxI></figcaption>}
    </figure>);
}
const L = ({ x, y, tex, size = 14, color = INK, w = 120 }) =>
  <foreignObject x={x - w / 2} y={y - size * 1.25} width={w} height={size * 2.2}>
    <div style={{ textAlign: "center", fontSize: size, color, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} />
  </foreignObject>;
const Tt = ({ x, y, children, size = 12, color = MUTED, anchor = "middle" }) => <text x={x} y={y} fontSize={size} fill={color} textAnchor={anchor} fontFamily="var(--sans, sans-serif)">{children}</text>;
const Axis = ({ x1, y1, x2, y2 }) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={1.2} markerEnd="url(#c3d-arr)" />;
const poly = (f, x0, x1, n, sx, sy) => Array.from({ length: n + 1 }, (_, i) => { const x = x0 + (x1 - x0) * i / n; return `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(f(x)).toFixed(1)}`; }).join("");

// ---------- J_III：Huygens 原理与传播子 ----------
export function HuygensFig() {
  const src = [[70, 60], [92, 115], [86, 175]];
  return (
    <Fig h={250} caption={R`自绘示意。左：Huygens 原理——曲面 $\Sigma$ 上的次级波源 $N_1,N_2,N_3,\dots$ 各自向观察点 $M$ 辐射，$M$ 点的场是它们的叠加。右：量子力学中的类比——$t_1$ 时刻每一点 $(\mathbf r_1,t_1)$ 都是"次级源"，强度正比于 $\psi(\mathbf r_1,t_1)$；每条箭头带一个传播子 $K(\mathbf r_2,t_2;\mathbf r_1,t_1)$，$\psi(\mathbf r_2,t_2)$ 是全部箭头的相干和 \eqref{JIII-1}。`}>
      <path d="M60,25 Q110,120 70,225" fill="none" stroke={INK} strokeWidth={1.6} />
      <L x={62} y={240} tex={R`\Sigma`} />
      {src.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={3.5} fill={INK} /><line x1={x} y1={y} x2={250} y2={70} stroke={BLUE} strokeWidth={1.2} markerEnd="url(#c3d-arr-b)" /><L x={x - 22} y={y + 4} tex={`N_${i + 1}`} size={13} w={40} /></g>)}
      <circle cx={252} cy={70} r={3.5} fill={ACC} /><L x={266} y={62} tex="M" w={30} />
      {/* 右图：两条时刻线 */}
      <line x1={360} y1={20} x2={360} y2={215} stroke={INK} strokeWidth={1.4} />
      <line x1={560} y1={20} x2={560} y2={215} stroke={INK} strokeWidth={1.4} />
      <L x={360} y={240} tex={R`t=t_1`} /><L x={560} y={240} tex={R`t=t_2`} />
      {[40, 80, 125, 170, 200].map((y, i) => <g key={i}><circle cx={360} cy={y} r={3} fill={INK} /><line x1={362} y1={y} x2={556} y2={110} stroke={i === 1 ? ACC : BLUE} strokeWidth={i === 1 ? 1.8 : 1} markerEnd={i === 1 ? "url(#c3d-arr-r)" : "url(#c3d-arr-b)"} opacity={i === 1 ? 1 : 0.7} /></g>)}
      <L x={335} y={84} tex={R`\mathbf r_1`} w={40} /><L x={335} y={174} tex={R`\mathbf r_1'`} w={40} />
      <circle cx={560} cy={110} r={3.5} fill={ACC} /><L x={590} y={114} tex={R`\mathbf r_2`} w={40} />
      <L x={470} y={66} tex={R`K(\mathbf r_2,t_2;\mathbf r_1,t_1)`} size={12} w={170} color={ACC} />
    </Fig>);
}

// ---------- J_III：时空路径 ----------
export function PathFig() {
  const ts = [70, 140, 210, 280, 350, 420, 490, 560], rs = [150, 90, 175, 60, 130, 110, 185, 120];
  const sx = x => x, sy = y => y;
  return (
    <Fig h={250} caption={R`自绘示意：在 $t_1$ 与 $t_2$ 之间等间隔取 $N$ 个中间时刻 $t_{\alpha_i}$，每个时刻任取一个位置 $\mathbf r_{\alpha_i}$（黑点）；把它们连起来就是一条时空路径（实折线）。$N\to\infty$ 时折线成为连续曲线 $\mathbf r(t)$。另一组选择给出另一条路径（虚线）；$K(2,1)$ 是对所有这样的路径的振幅之和。`}>
      <Axis x1={40} y1={215} x2={600} y2={215} /><Axis x1={40} y1={215} x2={40} y2={20} />
      <L x={608} y={232} tex="t" w={20} /><L x={30} y={22} tex={R`\mathbf r`} w={20} />
      {ts.map((t, i) => <line key={i} x1={t} y1={215} x2={t} y2={rs[i]} stroke={MUTED} strokeDasharray="3 3" />)}
      <path d={ts.map((t, i) => `${i ? "L" : "M"}${t},${rs[i]}`).join("")} fill="none" stroke={BLUE} strokeWidth={1.8} />
      <path d={ts.map((t, i) => `${i ? "L" : "M"}${t},${i === 0 ? rs[0] : i === ts.length - 1 ? rs[i] : [0, 160, 120, 150, 70, 60, 140, 0][i]}`).join("")} fill="none" stroke={ACC} strokeWidth={1.2} strokeDasharray="6 4" />
      {ts.map((t, i) => <circle key={i} cx={t} cy={rs[i]} r={3.5} fill={INK} />)}
      <L x={70} y={236} tex="t_1" w={30} /><L x={560} y={236} tex="t_2" w={30} />
      {[1, 2, 3].map(i => <L key={i} x={ts[i]} y={236} tex={`t_{\\alpha_{${i}}}`} w={40} size={12} />)}
      <L x={420} y={236} tex={R`t_{\alpha_{N-1}}`} w={60} size={12} /><L x={490} y={236} tex={R`t_{\alpha_N}`} w={40} size={12} />
      <L x={70} y={140} tex={R`\mathbf r_1`} w={30} /><L x={575} y={110} tex={R`\mathbf r_2`} w={30} />
      <L x={sx(140) + 20} y={sy(84)} tex={R`\mathbf r_{\alpha_1}`} w={40} size={12} />
    </Fig>);
}

// ---------- M_III：被势垒包围的阱 ----------
export function BarrierWellFig() {
  const sx = x => 60 + (x + 4) * 65, sy = v => 120 - v * 22;
  const V = x => 2.2 * Math.exp(-((x + 1.7) ** 2) * 3) + 1.4 * Math.exp(-((x - 1.9) ** 2) * 3) - 3.6 * Math.exp(-((x - 0.1) ** 2) * 1.6);
  return (
    <Fig h={230} caption={R`自绘示意：阱深 $V_0$ 的势阱两侧各有一个势垒（高 $V_1>V_2$）。经典粒子能量在 $0$ 与 $V_2$ 之间时也被关在两垒之间；量子粒子能量为正时总能隧穿出去，所以束缚态能量仍只在 $-V_0$ 与 $0$ 之间（阴影带）。`}>
      <Axis x1={40} y1={sy(0)} x2={600} y2={sy(0)} /><Axis x1={sx(0)} y1={215} x2={sx(0)} y2={15} />
      <rect x={sx(-1.0)} y={sy(0)} width={sx(1.2) - sx(-1.0)} height={sy(-3.55) - sy(0)} fill={GREEN} opacity={0.12} />
      <path d={poly(V, -4, 4.3, 300, sx, sy)} fill="none" stroke={INK} strokeWidth={2} />
      <line x1={sx(-4)} y1={sy(1.4)} x2={sx(4.3)} y2={sy(1.4)} stroke={MUTED} strokeDasharray="4 3" />
      <line x1={sx(-4)} y1={sy(2.2)} x2={sx(-1.7)} y2={sy(2.2)} stroke={MUTED} strokeDasharray="4 3" />
      <L x={50} y={sy(2.2) + 4} tex="V_1" w={30} /><L x={50} y={sy(1.4) + 4} tex="V_2" w={30} /><L x={sx(0) - 22} y={sy(-3.55) + 6} tex="-V_0" w={40} />
      <L x={608} y={sy(0) + 16} tex="x" w={20} /><L x={sx(0) + 22} y={22} tex="V(x)" w={50} />
      <Tt x={sx(2.9)} y={sy(0.7)}>经典上也可被困的正能量</Tt>
    </Fig>);
}

// ---------- N_III：任意形状的有限力程势 ----------
export function ScatterFig() {
  const sx = x => 310 + x * 110, sy = v => 120 - v * 40;
  const V = x => (Math.abs(x) >= 1 ? 0 : (1 - x * x) ** 2 * (1.6 * Math.exp(-((x + 0.35) ** 2) * 6) + 0.9 - 2.6 * Math.exp(-((x - 0.45) ** 2) * 10)));
  return (
    <Fig h={220} caption={R`自绘示意：势 $V(x)$ 只在 $-l/2\le x\le l/2$ 内任意变化（可以有凸起也有凹坑），区间外为零。左右两侧的解都是平面波：左边 $A\mathrm e^{ikx}+A'\mathrm e^{-ikx}$，右边 $\tilde A\mathrm e^{ikx}+\tilde A'\mathrm e^{-ikx}$；传递矩阵 $M(k)$ 由左边的系数给出右边的系数。`}>
      <Axis x1={40} y1={sy(0)} x2={600} y2={sy(0)} /><Axis x1={sx(0)} y1={205} x2={sx(0)} y2={15} />
      <path d={poly(V, -2.4, 2.4, 300, sx, sy)} fill="none" stroke={INK} strokeWidth={2} />
      <L x={sx(-1)} y={sy(0) + 26} tex={R`-\tfrac l2`} w={40} /><L x={sx(1)} y={sy(0) + 26} tex={R`+\tfrac l2`} w={40} />
      <line x1={sx(-1)} y1={sy(0) - 4} x2={sx(-1)} y2={sy(0) + 4} stroke={INK} /><line x1={sx(1)} y1={sy(0) - 4} x2={sx(1)} y2={sy(0) + 4} stroke={INK} />
      <line x1={70} y1={45} x2={150} y2={45} stroke={BLUE} strokeWidth={1.6} markerEnd="url(#c3d-arr-b)" /><L x={110} y={36} tex={R`A\,\mathrm e^{ikx}`} w={90} />
      <line x1={150} y1={75} x2={70} y2={75} stroke={ACC} strokeWidth={1.6} markerEnd="url(#c3d-arr-r)" /><L x={110} y={100} tex={R`A'\,\mathrm e^{-ikx}`} w={90} />
      <line x1={470} y1={45} x2={550} y2={45} stroke={BLUE} strokeWidth={1.6} markerEnd="url(#c3d-arr-b)" /><L x={510} y={36} tex={R`\tilde A\,\mathrm e^{ikx}`} w={90} />
      <line x1={550} y1={75} x2={470} y2={75} stroke={ACC} strokeWidth={1.6} markerEnd="url(#c3d-arr-r)" /><L x={510} y={100} tex={R`\tilde A'\,\mathrm e^{-ikx}`} w={90} />
      <L x={608} y={sy(0) + 16} tex="x" w={20} />
    </Fig>);
}

// ---------- O_III：重复 N 次的势垒 ----------
const motif = x => { const u = ((x + 0.5) % 1 + 1) % 1 - 0.5; return 1.6 * Math.exp(-((u + 0.08) ** 2) * 60) - 0.7 * Math.exp(-((u - 0.28) ** 2) * 80); };
export function PeriodicFig() {
  const N = 4, sx = x => 110 + x * 110, sy = v => 120 - v * 45;
  const V = x => (x < -0.5 || x > N - 0.5 ? 0 : motif(x));
  return (
    <Fig h={210} caption={R`自绘示意：同一个"势垒"图样（这里是一个凸起加一个小凹坑）以周期 $l$ 重复 $N=4$ 次，第 $n$ 个中心在 $x=(n-1)l$；两侧 $V=0$。`}>
      <Axis x1={30} y1={sy(0)} x2={600} y2={sy(0)} /><Axis x1={sx(0)} y1={195} x2={sx(0)} y2={15} />
      <path d={poly(V, -0.7, N - 0.3, 600, sx, sy)} fill="none" stroke={INK} strokeWidth={2} />
      {[-0.5, 0.5, 1.5, 2.5, 3.5].map((x, i) => <g key={i}><line x1={sx(x)} y1={sy(0) - 4} x2={sx(x)} y2={sy(0) + 4} stroke={INK} /><L x={sx(x)} y={sy(0) + 28} tex={["-\\tfrac l2", "\\tfrac l2", "\\tfrac{3l}2", "\\tfrac{5l}2", "\\tfrac{7l}2"][i]} w={40} size={13} /></g>)}
      <L x={608} y={sy(0) + 16} tex="x" w={20} /><L x={sx(0) + 24} y={22} tex="V(x)" w={50} />
    </Fig>);
}
export function CrystalFig() {
  const sx = x => 90 + x * 85, sy = v => 175 - v * 34;
  const Ve = 4;
  const Vl = x => (x >= -0.5 ? 3.2 * Math.cos(Math.PI * x) ** 2 : Ve * (1 - Math.exp(-((x + 0.5) ** 2) * 3)) - 1.0 * Math.exp(-((x + 1.6) ** 2) * 6));
  const V = x => (x <= 2.5 ? Vl(x) : Vl(5 - x));
  return (
    <Fig h={240} caption={R`自绘示意："一维晶体"中电子的势。内部周期性：$x=0,l,2l,\dots$ 处是离子之间的势垒（高 $V_0$），$x=l/2,3l/2,\dots$ 处是离子的吸引阱；在两端，势在与 $l$ 相当的距离上不规则变化，然后趋于常数 $V_e$。`}>
      <Axis x1={20} y1={sy(0)} x2={610} y2={sy(0)} /><Axis x1={sx(0)} y1={225} x2={sx(0)} y2={10} />
      <line x1={20} y1={sy(4)} x2={610} y2={sy(4)} stroke={MUTED} strokeDasharray="6 4" />
      <path d={poly(V, -3.0, 6.8, 800, sx, sy)} fill="none" stroke={INK} strokeWidth={2} />
      <L x={sx(0) - 18} y={sy(4) + 4} tex="V_e" w={30} /><L x={sx(0) - 18} y={sy(3.2) + 8} tex="V_0" w={30} />
      <L x={sx(0)} y={sy(0) + 22} tex="0" w={20} /><L x={sx(1)} y={sy(0) + 22} tex="l" w={20} /><L x={sx(5)} y={sy(0) + 22} tex="Nl" w={30} />
      <L x={616} y={sy(0) + 16} tex="x" w={20} />
    </Fig>);
}
