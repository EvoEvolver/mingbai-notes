// 第 III 章自绘示意图（SVG，按原书各图想表达的物理内容重新绘制）。
import { TexAt } from "./_ch03_kit.jsx";

const R = String.raw;
const INK = "#1f1b16", RED = "#c0392b", BLUE = "#2c4a6e", GREEN = "#2c6e49", GRAY = "#888";
const Defs = ({ id }) => <defs><marker id={id} markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="context-stroke" /></marker></defs>;
// 波浪箭头（表示 Schrödinger 方程支配的连续演化）
const wave = (x0, x1, y, amp = 5, k = 14) => { let d = `M${x0},${y}`; for (let x = x0; x <= x1; x += 2) d += `L${x},${(y + amp * Math.sin((x - x0) / k * Math.PI)).toFixed(1)}`; return d; };

// 图 1：测量前后的演化：连续演化 → 突变（投影）→ 连续演化
export function Fig1() {
  return <svg viewBox="0 0 640 200" style={{ width: "100%", maxWidth: 640 }}>
    <Defs id="f1" />
    <line x1="30" x2="610" y1="150" y2="150" stroke={INK} markerEnd="url(#f1)" />
    <TexAt x={615} y={156} tex="t" w={20} />
    {[[70, R`0`], [330, R`t_0`], [540, R`t_1`]].map(([x, l]) => <g key={x}><line x1={x} x2={x} y1="144" y2="156" stroke={INK} /><TexAt x={x} y={178} tex={l} anchor="middle" w={40} /></g>)}
    <path d={wave(120, 245, 118)} fill="none" stroke={BLUE} strokeWidth="1.8" markerEnd="url(#f1)" />
    <TexAt x={50} y={124} tex={R`\ket{\psi(0)}`} w={70} />
    <TexAt x={252} y={124} tex={R`\ket{\psi(t_0)}`} w={80} />
    <line x1="327" x2="327" y1="60" y2="150" stroke={RED} strokeWidth="2" /><line x1="333" x2="333" y1="60" y2="150" stroke={RED} strokeWidth="2" />
    <rect x="245" y="10" width="170" height="34" rx="6" fill="#fff" stroke={RED} />
    <TexAt x={330} y={34} tex={R`\text{测量 } A\text{，得到 } a_n`} anchor="middle" w={170} color={RED} />
    <line x1="330" x2="330" y1="44" y2="58" stroke={RED} markerEnd="url(#f1)" />
    <TexAt x={340} y={90} tex={R`\ket{u_n}`} w={50} color={RED} />
    <path d={wave(395, 500, 84)} fill="none" stroke={BLUE} strokeWidth="1.8" markerEnd="url(#f1)" />
    <TexAt x={506} y={90} tex={R`\ket{\psi'(t_1)}`} w={90} />
    <TexAt x={185} y={100} tex={R`\text{第六假设}`} anchor="middle" w={90} size={12} color={BLUE} />
    <TexAt x={447} y={66} tex={R`\text{第六假设}`} anchor="middle" w={90} size={12} color={BLUE} />
  </svg>;
}

// 图 4：|c(E)|² 的宽度 ΔE
export function Fig4() {
  const g = E => Math.exp(-((E - 300) ** 2) / (2 * 45 * 45));
  let d = ""; for (let x = 40; x <= 560; x += 3) d += `${x === 40 ? "M" : "L"}${x},${(170 - 120 * g(x)).toFixed(1)}`;
  const half = 45 * Math.sqrt(2 * Math.log(2));
  return <svg viewBox="0 0 600 210" style={{ width: "100%", maxWidth: 560 }}>
    <Defs id="f4" />
    <line x1="40" x2="580" y1="170" y2="170" stroke={INK} markerEnd="url(#f4)" /><line x1="40" x2="40" y1="180" y2="20" stroke={INK} markerEnd="url(#f4)" />
    <TexAt x={50} y={30} tex={R`|c(E)|^2`} w={80} /><TexAt x={585} y={176} tex="E" w={20} />
    <path d={d} fill="none" stroke={BLUE} strokeWidth="2.2" />
    <line x1="300" x2="300" y1="164" y2="176" stroke={INK} /><TexAt x={300} y={198} tex="E_0" anchor="middle" w={40} />
    <line x1={300 - half} x2={300 + half} y1="110" y2="110" stroke={RED} markerEnd="url(#f4)" markerStart="url(#f4)" />
    <TexAt x={300} y={104} tex={R`\Delta E`} anchor="middle" w={50} color={RED} />
  </svg>;
}

// 图 5：沿 Oz 传播的光子；e 与检偏器方向 e' 垂直
export function Fig5() {
  return <svg viewBox="0 0 560 260" style={{ width: "100%", maxWidth: 520 }}>
    <Defs id="f5" />
    <line x1="180" x2="520" y1="150" y2="150" stroke={INK} markerEnd="url(#f5)" /><TexAt x={525} y={156} tex="z" w={20} />
    <line x1="180" x2="180" y1="150" y2="40" stroke={INK} markerEnd="url(#f5)" /><TexAt x={186} y={44} tex={R`\mathbf e_x`} w={40} />
    <line x1="180" x2="110" y1="150" y2="240" stroke={INK} markerEnd="url(#f5)" /><TexAt x={84} y={246} tex={R`\mathbf e_y`} w={40} />
    <line x1="180" x2="120" y1="150" y2="100" stroke={RED} strokeWidth="2.5" markerEnd="url(#f5)" /><TexAt x={96} y={102} tex={R`\mathbf e`} w={30} color={RED} />
    <rect x="360" y="70" width="14" height="140" fill="#e8e1d4" stroke={GRAY} transform="skewY(-18) translate(0,118)" />
    <line x1="370" x2="410" y1="150" y2="55" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#f5)" /><TexAt x={414} y={60} tex={R`\mathbf e'\perp\mathbf e`} w={70} color={GREEN} />
    <TexAt x={330} y={238} tex={R`\text{检偏器}`} anchor="middle" w={80} size={12} color={GRAY} />
    <TexAt x={176} y={168} tex={R`\mathrm{O}`} anchor="end" w={20} />
  </svg>;
}

// 图 6：从 |u_a⟩ 到 |v_c⟩ 的几条“路径”（经过 B 的本征态 |w_b⟩）
export function Fig6() {
  const ys = [40, 120, 200];
  return <svg viewBox="0 0 620 240" style={{ width: "100%", maxWidth: 600 }}>
    <Defs id="f6" />
    <TexAt x={20} y={126} tex={R`\ket{u_a}`} w={50} />
    <TexAt x={560} y={126} tex={R`\ket{v_c}`} w={50} />
    {ys.map((y, i) => <g key={i}>
      <path d={`M75,120 C150,120 200,${y} 270,${y}`} fill="none" stroke={BLUE} strokeWidth="1.8" strokeDasharray={i === 1 ? "" : "6 3"} markerEnd="url(#f6)" />
      <TexAt x={280} y={y + 6} tex={R`\ket{w_{b_${i + 1}}}`} w={60} />
      <path d={`M345,${y} C420,${y} 470,120 550,120`} fill="none" stroke={BLUE} strokeWidth="1.8" strokeDasharray={i === 1 ? "" : "6 3"} markerEnd="url(#f6)" />
      <TexAt x={160} y={y < 120 ? y + 30 : y > 120 ? y - 14 : 112} tex={R`\braket{w_{b_${i + 1}}|u_a}`} w={90} size={12} color={GRAY} />
      <TexAt x={410} y={y < 120 ? y + 30 : y > 120 ? y - 14 : 112} tex={R`\braket{v_c|w_{b_${i + 1}}}`} w={90} size={12} color={GRAY} />
    </g>)}
  </svg>;
}

// 图 7：测量电子横坐标 x 的狭缝装置（总是“不够精细”的）
export function Fig7() {
  return <svg viewBox="0 0 420 220" style={{ width: "100%", maxWidth: 420 }}>
    <Defs id="f7" />
    <line x1="30" x2="400" y1="170" y2="170" stroke={INK} markerEnd="url(#f7)" /><TexAt x={404} y={176} tex="z" w={20} />
    <line x1="200" x2="200" y1="210" y2="20" stroke={GRAY} strokeDasharray="2 3" markerEnd="url(#f7)" /><TexAt x={206} y={26} tex="x" w={20} />
    <rect x="195" y="30" width="10" height="70" fill="#cfc6b6" /><rect x="195" y="130" width="10" height="80" fill="#cfc6b6" />
    <TexAt x={212} y={104} tex="x_2" w={30} /><TexAt x={212} y={136} tex="x_1" w={30} />
    <TexAt x={190} y={186} tex={R`\mathrm{O}`} anchor="end" w={20} />
    <path d={wave(50, 180, 118, 6, 10)} fill="none" stroke={BLUE} strokeWidth="1.8" markerEnd="url(#f7)" />
    <TexAt x={60} y={90} tex={R`\text{入射电子}`} w={90} size={12} color={BLUE} />
    <TexAt x={300} y={110} tex={R`\text{通过} \Rightarrow \text{“yes”}`} anchor="middle" w={140} size={12} color={GREEN} />
  </svg>;
}

// 图 8：杨氏双缝：振幅相加（同一点 M）、强度相加（M_1 到 M_2 之间的不同点）
export function Fig8() {
  const S = [40, 140], A = [200, 70], B = [200, 210], M = [380, 110];
  const seg = (p, q, c, k) => <line key={k} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={c} strokeWidth="1.8" markerEnd="url(#f8)" />;
  return <svg viewBox="0 0 470 260" style={{ width: "100%", maxWidth: 460 }}>
    <Defs id="f8" />
    <line x1="200" x2="200" y1="20" y2="62" stroke={INK} strokeWidth="3" /><line x1="200" x2="200" y1="78" y2="202" stroke={INK} strokeWidth="3" /><line x1="200" x2="200" y1="218" y2="250" stroke={INK} strokeWidth="3" />
    <line x1="380" x2="380" y1="240" y2="20" stroke={INK} markerEnd="url(#f8)" />
    <circle cx={S[0]} cy={S[1]} r="4" fill={INK} /><TexAt x={20} y={146} tex={R`\mathrm{S}`} w={20} />
    {seg(S, A, BLUE, 1)}{seg(S, B, RED, 2)}{seg(A, M, BLUE, 3)}{seg(B, M, RED, 4)}
    <TexAt x={180} y={70} tex={R`\mathrm{A}`} w={20} /><TexAt x={180} y={226} tex={R`\mathrm{B}`} w={20} />
    <circle cx="380" cy="110" r="4" fill={INK} /><TexAt x={360} y={106} tex={R`\mathrm{M}`} anchor="end" w={20} /><TexAt x={388} y={116} tex="x" w={20} />
    <circle cx="380" cy="60" r="4" fill={GREEN} /><TexAt x={360} y={64} tex={R`\mathrm{M}_2`} anchor="end" w={30} /><TexAt x={388} y={66} tex="x_2" w={30} />
    <circle cx="380" cy="150" r="4" fill={GREEN} /><TexAt x={360} y={156} tex={R`\mathrm{M}_1`} anchor="end" w={30} /><TexAt x={388} y={156} tex="x_1" w={30} />
    <TexAt x={388} y={204} tex="0" w={20} /><line x1="374" x2="386" y1="198" y2="198" stroke={INK} />
    <TexAt x={300} y={250} tex={R`I(x)\propto|\mathscr E_{\rm A}(x)+\mathscr E_{\rm B}(x)|^2`} anchor="middle" w={220} size={12} />
  </svg>;
}
