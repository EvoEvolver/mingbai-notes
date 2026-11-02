// paper 页的图：全部按原文报告的数值重画（表 I、§V 的 d=25 数据、N(d) 公式），外加一张自绘的电路分层示意。
import { Plot, TxI } from "@kit";
import { TABLE1, surf, D25 } from "./_method_aces.js";
import { COL, TexAt } from "./_method_plots.jsx";

const R = String.raw;

// 表 I：d=25、对数正态噪声，四类门的 TVD 中位数随测量预算 S 的变化
export function TableIPlot() {
  const S = TABLE1.S, pts = k => S.map((s, i) => [s, 10 ** -TABLE1[k][i]]);
  return <Plot
    x={{ label: R`\text{测量预算}\ S`, log: true, domain: [5e5, 2e9] }}
    y={{ label: R`\text{门估计误差 TVD 的中位数}`, log: true, domain: [3e-6, 3e-3] }}
    series={[
      { label: R`\text{Pauli 门}\ (X, I)`, data: pts("Pauli"), color: COL.blue },
      { label: R`\text{Hadamard}`, data: pts("Hadamard"), color: COL.green },
      { label: R`\text{测量}`, data: pts("Measurement"), color: COL.gold },
      { label: R`\text{CZ}`, data: pts("CZ"), color: COL.red },
      { label: R`\propto S^{-1/2}`, f: s => 10 ** -3.680 * Math.sqrt(1e8 / s), dash: "dot", color: COL.grey },
    ]}
    caption={R`数据：原文表 I（$d=25$ 旋转表面码、对数正态 Pauli 噪声的一个固定实例、优化设计）。纵轴是每类门的 TVD 中位数（原文给的是 $-\log_{10}$ 值，这里换回原值）。预算每乘 10，误差约除以 $\sqrt{10}$（对数坐标下相邻点相差约 0.5 个数量级），即 $1/\sqrt S$ 的标准统计标度；灰点线是过 CZ 在 $S=10^8$ 处数据点的 $S^{-1/2}$ 参考线。CZ 有 16 个错误概率，最难估；Pauli 门最容易。`} />;
}

// §V：d=25 的归一化 RMS 误差 vs 预测
export function D25Plot() {
  return <Plot
    x={{ label: R`\text{测量预算}\ S`, log: true, domain: [5e5, 2e9] }}
    y={{ label: R`\text{归一化 RMS 误差}`, domain: [1.25, 1.5] }}
    series={[
      { label: R`\text{一次模拟（固定噪声实例）}`, data: D25.S.map((s, i) => [s, D25.rms[i]]), points: true, color: COL.blue },
      { label: R`\text{预测}\ \mathcal F=1.3245`, f: () => D25.F, color: COL.red },
      { label: R`\mathcal F\pm2\sqrt{\mathcal V}`, f: () => D25.F + 2 * D25.sd, dash: "dash", color: COL.red },
      { label: "", f: () => D25.F - 2 * D25.sd, dash: "dash", color: COL.red },
    ]}
    caption={R`数据：原文 §V。$d=25$（1249 个比特）时，由 $d\le 11$ 的拟合外推出的预测是 $\mathcal F=1.3245$、标准差 $0.0091$（对数正态噪声实例的平均）；一次完整模拟在 $S=10^6,10^7,10^8,10^9$ 下的归一化 RMS 误差为 $1.4480,1.3243,1.3303,1.3245$。除最小预算外都落在 $\pm2\sigma$ 带内。$S=10^6$ 的偏离来自测量误差估计在小样本下的表现，原文明确说预测只在大样本极限下成立。`} />;
}

// 资源随码距：n(d)、N(d) 二次增长，实验数恒为 261
export function ScalingPlot() {
  return <Plot
    x={{ label: R`\text{码距}\ d`, domain: [3, 26] }}
    y={{ label: R`\text{个数}`, log: true, domain: [10, 1e6] }}
    samples={24}
    series={[
      { label: R`\text{比特数}\ n=2d^2-1`, f: d => surf.n(d), color: COL.blue },
      { label: R`\text{门本征值数}\ N(d)=84d^2-36d-24`, f: d => surf.N(d), color: COL.red },
      { label: R`\text{实验数}\ 261\ \text{（与}\ d\ \text{无关）}`, f: () => surf.experiments, color: COL.green },
      { label: R`d=25\ \text{的电路本征值数}\ 267{,}357`, data: [[25, 267357]], points: true, color: COL.violet },
    ]}
    caption={R`数据：原文 §V。要估计的参数随比特数线性增长（$d=25$ 时 $N\approx41n$），但优化设计在 $d=3$ 到 $d=25$ 都只需要 261 个实验（Pauli 帧随机化之前）——因为同一个实验里不同位置的比特可以同时制备、同时测量，实验个数只由电路的局部结构决定。$d=25$：$n=1249$，$N=51{,}576$，用 31 个 tuple 估计 267,357 个电路本征值。`} />;
}

// 自绘：图 1 电路的 9 层与 tuple 记号（按原文图 1 的文字描述）
const LAY = [
  { i: 1, t: "H + X", k: "1q" }, { i: 2, t: "CZ", k: "2q" }, { i: 3, t: "H + X", k: "1q" }, { i: 4, t: "CZ", k: "2q" }, { i: 5, t: "X (DD)", k: "dd" },
  { i: 6, t: "CZ", k: "2q" }, { i: 3, t: "H + X", k: "1q", same: 7 }, { i: 8, t: "CZ", k: "2q" }, { i: 1, t: "H + X", k: "1q", same: 9 },
];
export function ScheduleFig() {
  const W = 680, H = 170, w = 64, gap = 9, x0 = 30;
  const fill = { "1q": "#f6d5d5", "2q": "#d9d9f6", dd: "#e8e4dc" };
  return <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W }}>
    <text x={x0} y={16} fontSize="12" fill="#555">时间 →</text>
    {LAY.map((l, u) => { const x = x0 + u * (w + gap); return <g key={u}>
      <text x={x + w / 2} y={36} textAnchor="middle" fontSize="12" fill="#777">第 {u + 1} 层</text>
      <rect x={x} y={44} width={w} height={60} rx="8" fill={fill[l.k]} stroke={l.same ? COL.red : "#aaa"} strokeDasharray={l.same ? "4 3" : ""} />
      <text x={x + w / 2} y={72} textAnchor="middle" fontSize="13" fontWeight="bold">{l.t}</text>
      <text x={x + w / 2} y={92} textAnchor="middle" fontSize="12" fill={COL.blue}>编号 {l.i}</text>
    </g>; })}
    <TexAt x={x0} y={132} w={W - 40} size={13} tex={R`\mathcal I=\{1,2,3,4,5,6,8\}\quad\text{原电路的 tuple}\ T=(1,2,3,4,5,6,3,8,1)`} />
    <TexAt x={x0} y={158} w={W - 40} size={12} color="#555" tex={R`\text{红框：与前面某层完全相同（第 7 层}=\text{第 3 层，第 9 层}=\text{第 1 层），共用同一组门本征值}`} />
  </svg>;
}
