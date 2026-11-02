// method 页的交互图。数值核心在 _method_aces.js（已用 node 核对：
//  · WHT 往返误差 < 1e-15；两比特去极化 λ = 1 − (16/15) r；
//  · 图 2 的例子 T=(2,1,3,2)、ZXI → ZYZ，门本征值乘积与原文图注逐项一致；
//  · 性能指标的解析梯度与有限差分一致到 1e-4；
//  · 玩具电路上 150 次逐 shot 模拟的归一化 RMS 误差均值与 F 的预测相差 < 4%（四种设计）；
//  · 附录 C：τ=660/29、λ_m=0.96、1−λ=10⁻³ 时 φ_opt = 306，与原文附录 G 所引数值一致）。
import { useEffect, useMemo, useRef, useState } from "react";
import { Plot, TxI, Slider, Seg, renderTex } from "@kit";
import * as A from "./_method_aces.js";

const R = String.raw;
const f = (v, d = 3) => (+v).toFixed(d);
export const COL = { ink: "#1f1b16", red: "#c0392b", green: "#2c6e49", blue: "#2c4a6e", gold: "#b8862b", violet: "#7d3c98", teal: "#16808a", grey: "#8a8278" };
export const TexAt = ({ x, y, tex, w = 160, h = 24, anchor = "start", size = 13, color }) => {
  const dx = anchor === "middle" ? -w / 2 : anchor === "end" ? -w : 0;
  return <foreignObject x={x + dx} y={y - h + 6} width={w} height={h} style={{ overflow: "visible" }}>
    <div style={{ fontSize: size, color: color || COL.ink, textAlign: anchor === "middle" ? "center" : anchor === "end" ? "right" : "left", whiteSpace: "nowrap", lineHeight: 1 }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} />
  </foreignObject>;
};
const Note = ({ children }) => <div className="muted" style={{ fontSize: 13.5, margin: "6px 0" }}><TxI>{children}</TxI></div>;

// =====================================================================
// 1. Pauli 信道 ↔ Pauli 本征值（式 (7)(8)），以及单纯形投影
// =====================================================================
function Bars({ labels, vals, lo = 0, hi = 1, color, h = 150, tex = true, title, compare, minBw = 34 }) {
  const n = vals.length, W = Math.max(300, n * minBw + 50), bw = (W - 50) / n, sy = v => 30 + (h - 50) * (1 - (v - lo) / (hi - lo));
  return <svg viewBox={`0 0 ${W} ${h + 8}`} style={{ width: "100%", maxWidth: W }}>
    {title && <TexAt x={44} y={20} tex={title} size={12} w={W - 50} color="#555" />}
    <line x1={40} x2={W - 4} y1={sy(Math.max(lo, 0))} y2={sy(Math.max(lo, 0))} stroke="#999" />
    {[lo, hi].map(v => <text key={v} x={36} y={sy(v) + 4} fontSize="10" textAnchor="end" fill="#777">{+v.toPrecision(3)}</text>)}
    {vals.map((v, i) => {
      const x = 44 + i * bw, y0 = sy(Math.max(lo, 0)), y1 = sy(Math.min(Math.max(v, lo), hi));
      const neg = v < 0;
      return <g key={i}>
        <rect x={x + 2} y={Math.min(y0, y1)} width={bw - 4} height={Math.max(1, Math.abs(y1 - y0))} fill={neg ? COL.red : color} opacity={0.85} />
        {compare && <line x1={x + 1} x2={x + bw - 1} y1={sy(Math.min(Math.max(compare[i], lo), hi))} y2={sy(Math.min(Math.max(compare[i], lo), hi))} stroke={COL.ink} strokeWidth="2" strokeDasharray="3 2" />}
        {tex ? <TexAt x={x + bw / 2} y={h + 4} tex={labels[i]} anchor="middle" size={n > 8 && minBw < 50 ? 9.5 : 11} w={bw + 6} /> : <text x={x + bw / 2} y={h + 2} fontSize="10" textAnchor="middle">{labels[i]}</text>}
      </g>;
    })}
  </svg>;
}

export function PauliConverter() {
  const [mode, setMode] = useState("1q");
  const [dir, setDir] = useState("p2l");
  const [p1, setP1] = useState([0.02, 0.005, 0.03]);
  const [l1, setL1] = useState([0.93, 0.95, 0.9]);
  const [q2, setQ2] = useState({ dep: 0.02, zz: 0.01, xi: 0.0 });
  // 单比特
  let p, lam, labels, n, warn = null, proj = null;
  if (mode === "1q") {
    n = 1; labels = A.PL.map(x => R`\mathrm{${x}}`);
    if (dir === "p2l") { p = [1 - p1[0] - p1[1] - p1[2], ...p1]; lam = A.probsToEigs(p, 1); }
    else { lam = [1, ...l1]; p = A.eigsToProbs(lam, 1); if (p.some(v => v < -1e-12)) { warn = true; proj = A.simplexProject(p); } }
  } else {
    n = 2; labels = A.allPaulis(2).map(a => R`\mathrm{${A.pauliStr(a)}}`);
    p = Array(16).fill(q2.dep / 15); p[A.allPaulis(2).findIndex(a => a[0] === 3 && a[1] === 3)] += q2.zz; p[A.allPaulis(2).findIndex(a => a[0] === 1 && a[1] === 0)] += q2.xi;
    p[0] = 1 - q2.dep - q2.zz - q2.xi; lam = A.probsToEigs(p, 2);
  }
  const P = A.allPaulis(n);
  // 边缘化检验（附录 A）：第 1 个比特上的边缘分布与支撑在第 1 个比特上的本征值
  let marg = null;
  if (n === 2) {
    const pm = [0, 0, 0, 0]; P.forEach((a, i) => { pm[a[0]] += p[i]; });
    const lm = A.probsToEigs(pm, 1), lsub = [0, 1, 2, 3].map(c => lam[P.findIndex(a => a[0] === c && a[1] === 0)]);
    marg = { pm, lm, lsub };
  }
  return <div className="plot card">
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
      <Seg options={[["1q", "单比特信道"], ["2q", "两比特信道"]]} value={mode} onChange={setMode} />
      {mode === "1q" && <Seg options={[["p2l", R`由 $p$ 算 $\lambda$（式 (7)）`], ["l2p", R`由 $\lambda$ 反推 $p$（式 (8)）`]]} value={dir} onChange={setDir} />}
    </div>
    <div className="plot-params">
      {mode === "1q" && dir === "p2l" && ["X", "Y", "Z"].map((s, k) => <Slider key={s} label={R`$p_{${s}}$`} value={p1[k]} min={0} max={0.15} step={0.001} fmt={v => f(v, 3)} onChange={v => { const a = [...p1]; a[k] = v; setP1(a); }} />)}
      {mode === "1q" && dir === "l2p" && ["X", "Y", "Z"].map((s, k) => <Slider key={s} label={R`$\lambda_{${s}}$`} value={l1[k]} min={0.6} max={1} step={0.002} fmt={v => f(v, 3)} onChange={v => { const a = [...l1]; a[k] = v; setL1(a); }} />)}
      {mode === "2q" && <>
        <Slider label={R`去极化总概率 $r$`} value={q2.dep} min={0} max={0.1} step={0.001} fmt={v => f(v, 3)} onChange={v => setQ2({ ...q2, dep: v })} />
        <Slider label={R`额外关联错误 $p_{ZZ}$`} value={q2.zz} min={0} max={0.05} step={0.001} fmt={v => f(v, 3)} onChange={v => setQ2({ ...q2, zz: v })} />
        <Slider label={R`额外 $p_{XI}$`} value={q2.xi} min={0} max={0.05} step={0.001} fmt={v => f(v, 3)} onChange={v => setQ2({ ...q2, xi: v })} />
      </>}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: n === 2 ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: 10 }}>
      <div><Bars labels={labels} vals={p} lo={warn ? -0.05 : 0} hi={n === 1 ? 0.16 : 0.06} color={COL.blue} title={R`\text{Pauli 错误概率}\ p_{\boldsymbol a}\ (p_I\ \text{很大，柱子截断})`} compare={proj} /></div>
      <div><Bars labels={labels} vals={lam} lo={n === 1 ? 0.6 : 0.8} hi={1} color={COL.green} title={R`\text{Pauli 本征值}\ \lambda_{\boldsymbol a}`} /></div>
    </div>
    <div style={{ fontSize: 13.5, lineHeight: 1.8 }}>
      {n === 1 && <TxI>{R`$p_I=${f(p[0], 4)}$；$\lambda_X=p_I+p_X-p_Y-p_Z=${f(lam[1], 4)}$，$\lambda_Y=${f(lam[2], 4)}$，$\lambda_Z=${f(lam[3], 4)}$。不保真度 $1-p_I=${f(1 - p[0], 4)}$，等于 $\tfrac14(3-\lambda_X-\lambda_Y-\lambda_Z)=${f((3 - lam[1] - lam[2] - lam[3]) / 4, 4)}$。`}</TxI>}
      {warn && <div style={{ color: COL.red }}><TxI>{R`这组 $\lambda$ 反推出负的概率（红柱）——它不对应任何物理信道。真实数据里，统计噪声就会造成这种情况；原文的做法是把估计投影到概率单纯形上（虚线为欧氏投影的结果：$(${proj.map(v => f(v, 4)).join(R`,\,`)})$）。`}</TxI></div>}
      {marg && <TxI>{R`**附录 A 的边缘化**：第 1 个比特的边缘分布 $(p_I,p_X,p_Y,p_Z)=(${marg.pm.map(v => f(v, 4)).join(",")})$，它的 WHT 给出 $(${marg.lm.slice(1).map(v => f(v, 4)).join(",")})$，恰好等于两比特本征值 $\lambda_{XI},\lambda_{YI},\lambda_{ZI}=(${marg.lsub.slice(1).map(v => f(v, 4)).join(",")})$。只看一个门支撑上的本征值，学到的就是整层噪声在这个门上的边缘。`}</TxI>}
    </div>
    <Note>{R`符号规则：$\lambda_{\boldsymbol b}=\sum_{\boldsymbol a}(-1)^{\omega(\boldsymbol a,\boldsymbol b)}p_{\boldsymbol a}$——与 $P_{\boldsymbol b}$ 对易的错误贡献 $+p$，反对易的贡献 $-p$。拉 $p_{ZZ}$ 时，只有与 $ZZ$ 反对易的那 8 个本征值下降。`}</Note>
  </div>;
}

// =====================================================================
// 2. Pauli 沿电路传播（原文图 2 的三比特例子），电路本征值 = 门本征值之积（式 (15)）
// =====================================================================
const FIG2 = {
  1: [{ t: "I", q: [0] }, { t: "CZ", q: [1, 2] }],
  2: [{ t: "CZ", q: [0, 1] }, { t: "H", q: [2] }],
  3: [{ t: "H", q: [0] }, { t: "S", q: [1] }, { t: "H", q: [2] }],
};
const LAYCOL = { 1: "#f6d5d5", 2: "#d9d9f6", 3: "#d6efd6" };
export function PropagationStepper() {
  const [a0, setA0] = useState([3, 1, 0]);
  const [k, setK] = useState(4);
  const T = [2, 1, 3, 2];
  const { seq, out } = A.propagate(FIG2, T, a0);
  const pts = [...seq, out];
  const factors = [];
  seq.forEach((a, u) => FIG2[T[u]].forEach((g, j) => { const kk = A.localIdx(g, a); if (kk) factors.push({ u, tex: R`\lambda_{${T[u]}${j + 1},${A.pauliStr(A.pauliOf(kk, g.q.length))}}` }); }));
  const W = 640, H = 210, x0 = 70, dx = 135, yq = q => 50 + q * 55;
  const gateBox = (g, cx) => {
    if (g.t === "CZ") { const [i, j] = g.q; return <g key={g.t + i}><line x1={cx} x2={cx} y1={yq(i)} y2={yq(j)} stroke={COL.ink} strokeWidth="2" /><circle cx={cx} cy={yq(i)} r="5" /><circle cx={cx} cy={yq(j)} r="5" /></g>; }
    return <g key={g.t + g.q[0]}><rect x={cx - 13} y={yq(g.q[0]) - 13} width="26" height="26" fill="#fff" stroke={COL.ink} /><text x={cx} y={yq(g.q[0]) + 5} textAnchor="middle" fontSize="14">{g.t}</text></g>;
  };
  return <div className="plot card">
    <div className="plot-params">
      {[0, 1, 2].map(q => <div key={q} style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ fontSize: 13 }}>比特 {q + 1} 的输入 Pauli：</span>
        <Seg options={[[0, "I"], [1, "X"], [2, "Y"], [3, "Z"]]} value={a0[q]} onChange={v => { const a = [...a0]; a[q] = v; setA0(a); }} />
      </div>)}
      <Slider label="已经过的层数" value={k} min={0} max={4} step={1} onChange={setK} />
    </div>
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W }}>
      {[0, 1, 2].map(q => <line key={q} x1={20} x2={W - 20} y1={yq(q)} y2={yq(q)} stroke="#888" />)}
      {T.map((i, u) => { const cx = x0 + 60 + u * dx; return <g key={u} opacity={u < k ? 1 : 0.35}>
        <rect x={cx - 26} y={22} width="52" height="166" rx="8" fill={LAYCOL[i]} stroke={u === k - 1 ? COL.red : "#aaa"} strokeDasharray="4 3" />
        <text x={cx} y={16} textAnchor="middle" fontSize="13" fontWeight="bold">{i}</text>
        {FIG2[i].map(g => gateBox(g, cx))}
      </g>; })}
      {pts.map((a, u) => u <= k && <g key={"p" + u}>{a.map((c, q) => <text key={q} x={x0 + u * dx - (u === 4 ? -10 : 0)} y={yq(q) - 6} fontSize="14" fill={u === k ? COL.red : COL.blue} textAnchor="middle" fontWeight={u === k ? "bold" : "normal"}>{A.PL[c]}</text>)}</g>)}
    </svg>
    <div style={{ fontSize: 14, lineHeight: 1.9 }}>
      <TxI>{R`tuple $T=(2,1,3,2)$，输入 $P_{\boldsymbol a}=${A.pauliStr(a0)}$，${k < 4 ? R`经过前 ${k} 层后为 $${A.pauliStr(pts[k])}$` : R`输出 $P_{T(\boldsymbol a)}=${A.pauliStr(out)}$——最后按这个基测量`}。`}</TxI><br />
      <TxI>{R`电路本征值 $\Lambda_{T,${A.pauliStr(a0)}}=${factors.filter(x => x.u < k).map(x => x.tex).join(R`\,`) || "1"}${k === 4 ? R`\times(\text{测量本征值：${out.filter(c => c).length} 个})` : ""}$`}</TxI>
    </div>
    <Note>{R`每一层只「看见」Pauli 落在门支撑上的那一段：段为恒等就不贡献因子。默认输入 $ZXI$ 复现原文图 2 的图注：$\Lambda_{T,ZXI}=\lambda_{21,ZX}\lambda_{12,XI}\lambda_{32,X}\lambda_{33,Z}\lambda_{21,IY}\lambda_{22,X}$（不含 SPAM 因子）。注意层 2 出现两次，用的是**同一组**门本征值——这正是方程组能解的原因。`}</Note>
  </div>;
}

// =====================================================================
// 3. 迷你 ACES：一次完整的「模拟实验 → 估计」
// =====================================================================
const rep = (t, k) => Array.from({ length: k }, () => t).flat();
export const OPT_TUPLES = [[], [2], [4], rep([1], 95), rep([3], 71), rep([2, 3, 2, 3], 17), rep([4, 3, 4, 3], 17), [1, 2, 1], [1, 4, 1]];
export const OPT_LABEL = [R`()`, R`(2)`, R`(4)`, R`(1)^{\times95}`, R`(3)^{\times71}`, R`(2,3,2,3)^{\times17}`, R`(4,3,4,3)^{\times17}`, R`(1,2,1)`, R`(1,4,1)`];
// node 中按式 (30)(31) 对去极化噪声优化得到的 shot 权重（浏览器内可重算，见「实验设计实验室」）
export const OPT_GAMMA = [0.0460, 0.3564, 0.3564, 0.0035, 0.0119, 0.0269, 0.0269, 0.0860, 0.0860];
export const RATES = { r1: 0.002, r2: 0.01, rm: 0.02 };
const IX = A.buildIndex(A.TOY);
const kindCol = it => (it.kind === "meas" ? COL.gold : it.g.q.length === 2 ? COL.red : it.g.t === "H" ? COL.green : COL.blue);
function useToy(seed, depol = false) {
  return useMemo(() => A.lognormalNoise(A.TOY, IX, { ...RATES, seed, depol }), [seed, depol]);
}
function useDesign(tuples, lam) { return useMemo(() => A.prepareDesign(A.TOY, IX, tuples, lam), [tuples, lam]); }
const BASIC = A.basicTuples(A.TOY);

export function MiniACES() {
  const [seed, setSeed] = useState(0);
  const [des, setDes] = useState("opt");
  const [Sp, setSp] = useState(1e5);
  const [run, setRun] = useState(1);
  const [gsel, setGsel] = useState("2:0");
  const noise = useToy(seed);
  const D = useDesign(des === "opt" ? OPT_TUPLES : BASIC, noise.lam);
  const Gam = des === "opt" ? OPT_GAMMA : A.defaultWeights(D);
  const fom = useMemo(() => A.figureOfMerit(D, Gam), [D, des]);
  const res = useMemo(() => A.runACES(D, Gam, noise, Sp, A.mulberry32(run * 101 + seed)), [D, Sp, run, seed, des]);
  const N = IX.N, W = 660, H = 230, ml = 50, sx = i => ml + (i + 0.5) * (W - ml - 10) / N;
  const err = res.lamHat.map((v, i) => v - noise.lam[i]), sd = fom.Sig.map((r, i) => Math.sqrt(r[i] / Sp));
  const ymax = Math.max(...sd.map(s => 3 * s), ...err.map(Math.abs)) * 1.05, sy = v => 15 + (H - 45) * (1 - (v + ymax) / (2 * ymax));
  // 选中的门：真值与估计的 Pauli 错误概率
  const [li, gj] = gsel.split(":").map(Number), gate = A.TOY.layers[li][gj], b = gate.q.length;
  const idx = k => IX.key[`${li}:${gj}:${k}`];
  const lamT = [1, ...Array.from({ length: 4 ** b - 1 }, (_, k) => noise.lam[idx(k + 1)])], lamE = [1, ...Array.from({ length: 4 ** b - 1 }, (_, k) => res.lamHat[idx(k + 1)])];
  const pT = A.eigsToProbs(lamT, b), pE = A.simplexProject(A.eigsToProbs(lamE, b));
  const tvd = 0.5 * pT.reduce((s, v, i) => s + Math.abs(v - pE[i]), 0);
  const gopts = [["1:1", "层1 H(q2)"], ["2:0", "层2 CZ"], ["3:1", "层3 X(q2)"], ["4:1", "层4 CZ"]];
  return <div className="plot card">
    <div className="plot-params" style={{ gap: 10 }}>
      <div><span style={{ fontSize: 13 }}>实验设计 </span><Seg options={[["basic", "基本 tuple 集"], ["opt", "优化设计"]]} value={des} onChange={setDes} /></div>
      <div><span style={{ fontSize: 13 }}>预算 </span><Seg options={[[1e4, R`$S'=10^4$`], [1e5, R`$10^5$`], [1e6, R`$10^6$`]]} value={Sp} onChange={setSp} /></div>
      <div><span style={{ fontSize: 13 }}>噪声实例 </span><Seg options={[[0, "seed 0"], [1, "seed 1"], [2, "seed 2"]]} value={seed} onChange={setSeed} /></div>
      <button className="plot-reset" onClick={() => setRun(run + 1)}>再做一次实验</button>
    </div>
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W }}>
      <path d={sd.map((s, i) => `${i ? "L" : "M"}${sx(i)},${sy(2 * s)}`).join("") + sd.map((s, i) => `L${sx(N - 1 - i)},${sy(-2 * sd[N - 1 - i])}`).join("") + "Z"} fill="#2c4a6e" opacity="0.12" />
      <line x1={ml} x2={W - 10} y1={sy(0)} y2={sy(0)} stroke="#999" />
      {[-ymax, -ymax / 2, ymax / 2, ymax].map(v => <text key={v} x={ml - 4} y={sy(v) + 4} fontSize="10" textAnchor="end" fill="#777">{+v.toPrecision(2)}</text>)}
      {err.map((e, i) => <circle key={i} cx={sx(i)} cy={sy(e)} r="3.2" fill={kindCol(IX.items[i])} />)}
      <TexAt x={ml} y={H - 8} w={W - ml} size={12} color="#555" tex={R`\nu=1\ldots63\text{（蓝 }I/X\text{，绿 }H\text{，红 CZ，金 测量）；阴影 }\pm2\sqrt{\Sigma_{\nu\nu}/S'}`} />
      <TexAt x={ml + 4} y={14} w={300} size={12} color="#555" tex={R`\hat\lambda_\nu-\lambda_\nu`} />
    </svg>
    <div style={{ fontSize: 14, lineHeight: 1.8 }}>
      <TxI>{R`本次：归一化 RMS 误差 $\sqrt{S'/N}\,\|\hat{\boldsymbol\lambda}-\boldsymbol\lambda\|_2=${f(res.rms)}$；性能指标预测 $\mathcal F=${f(fom.F)}\pm${f(Math.sqrt(fom.V))}$。总 shot 数 $S=${Math.round(res.S).toLocaleString()}$（${des === "opt" ? "优化设计的电路更长，同样时间里采到的 shot 更少" : "基本设计"}），共 ${D.blocks.reduce((s, b) => s + b.m, 0)} 个电路本征值、${D.blocks.reduce((s, b) => s + b.nE, 0)} 个实验。`}</TxI>
    </div>
    <div style={{ borderTop: "1px solid var(--line)", marginTop: 8, paddingTop: 8 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}><span style={{ fontSize: 13 }}>看一个门的 Pauli 错误概率（WHT 反变换 + 单纯形投影）：</span><Seg options={gopts} value={gsel} onChange={setGsel} /></div>
      <Bars labels={A.allPaulis(b).map(a => R`\mathrm{${A.pauliStr(a)}}`).slice(1)} vals={pT.slice(1)} compare={pE.slice(1)} lo={0} hi={Math.max(...pT.slice(1), ...pE.slice(1)) * 1.15 || 0.01} color={COL.teal} title={R`\text{柱：真值；虚线：估计。总变差距离 TVD}=${tvd.toExponential(2)}`} />
    </div>
    <Note>{R`玩具电路：3 个比特（中间是测量比特），4 个不同的层——$H$ 层、两个 CZ 层、$X$ 动力学解耦层，空闲比特用恒等门填充；共 $N=63$ 个门本征值（含 9 个测量本征值）。噪声是对数正态 Pauli 噪声（附录 F 的构造），但平均错误率取 $r_1=0.2\%$、$r_2=1\%$、$r_m=2\%$，略大于原文，便于小预算下看清。每个 shot 都按 Pauli 帧逐门抽样错误——误差全部来自有限 shot。`}</Note>
  </div>;
}

// =====================================================================
// 4. 实验设计实验室：均匀 / 默认 / 优化 shot 分配 与 tuple 集的对比（缩小版的原文图 3）
// =====================================================================
function Hist({ groups, xDomain, W = 660, H = 240, bins = 40, xlabel }) {
  const [x0, x1] = xDomain, bw = (x1 - x0) / bins, ml = 40, sx = v => ml + (v - x0) / (x1 - x0) * (W - ml - 10);
  const hs = groups.map(g => {
    const c = new Array(bins).fill(0); g.vals.forEach(v => { const k = Math.floor((v - x0) / bw); if (k >= 0 && k < bins) c[k]++; });
    return c.map(x => x / (g.vals.length * bw || 1));
  });
  const ps = groups.map(g => { if (!g.pred) return null; const c = new Array(bins).fill(0); g.pred.forEach(v => { const k = Math.floor((v - x0) / bw); if (k >= 0 && k < bins) c[k]++; }); return c.map(x => x / (g.pred.length * bw)); });
  const ymax = Math.max(0.1, ...hs.flat(), ...ps.filter(Boolean).flat()) * 1.1, sy = v => 10 + (H - 50) * (1 - v / ymax);
  return <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W }}>
    <line x1={ml} x2={W - 10} y1={sy(0)} y2={sy(0)} stroke="#999" />
    {Array.from({ length: 9 }, (_, i) => x0 + (x1 - x0) * i / 8).map(v => <text key={v} x={sx(v)} y={H - 26} fontSize="10" textAnchor="middle" fill="#666">{f(v, 2)}</text>)}
    {groups.map((g, k) => hs[k].map((h, i) => h > 0 && <rect key={k + "-" + i} x={sx(x0 + i * bw) + 1} y={sy(h)} width={Math.max(1, sx(x0 + bw) - sx(x0) - 2)} height={sy(0) - sy(h)} fill={g.color} opacity="0.45" />))}
    {ps.map((c, k) => c && <path key={"p" + k} d={c.map((h, i) => `${i ? "L" : "M"}${sx(x0 + (i + 0.5) * bw)},${sy(h)}`).join("")} fill="none" stroke={groups[k].color} strokeWidth="2.2" />)}
    {groups.map((g, k) => g.F != null && <line key={"F" + k} x1={sx(g.F)} x2={sx(g.F)} y1={10} y2={sy(0)} stroke={g.color} strokeDasharray="4 3" />)}
    <TexAt x={ml} y={H - 1} w={W - ml} size={12} color="#555" tex={xlabel} />
  </svg>;
}

export function DesignLab() {
  const noise = useToy(0), dep = useToy(0, true);
  const Db = useDesign(BASIC, noise.lam), Do = useDesign(OPT_TUPLES, noise.lam), Ddep = useDesign(OPT_TUPLES, dep.lam);
  const [gam, setGam] = useState(OPT_GAMMA);
  const [hist, setHist] = useState(null);
  const [busy, setBusy] = useState(false);
  const designs = useMemo(() => [
    { id: "basic", name: "基本 tuple 集 · 默认权重", D: Db, G: A.defaultWeights(Db), color: COL.grey },
    { id: "uni", name: "优化 tuple 集 · 均匀权重", D: Do, G: OPT_TUPLES.map(() => 1 / OPT_TUPLES.length), color: COL.gold },
    { id: "def", name: R`优化 tuple 集 · 默认权重 $\Gamma_T\propto\tau_T^{-1}$`, D: Do, G: A.defaultWeights(Do), color: COL.violet },
    { id: "opt", name: "优化 tuple 集 · 按 F 优化的权重", D: Do, G: gam, color: COL.blue },
  ].map(d => ({ ...d, fom: A.figureOfMerit(d.D, d.G) })), [Db, Do, gam]);
  const Fbest = designs[3].fom.F;
  const [sel, setSel] = useState(["basic", "opt"]);
  const [Sp, setSp] = useState(1e6);
  const [sims, setSims] = useState({});
  const [prog, setProg] = useState(null);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const reopt = () => {
    setBusy(true);
    setTimeout(() => { const o = A.optimiseWeights(Ddep, A.defaultWeights(Ddep), { iters: 150 }); setGam(o.Gam); setHist(o.hist); setBusy(false); setSims({}); }, 30);
  };
  const simulate = () => {
    const K = 100, todo = designs.filter(d => sel.includes(d.id)), out = {}, rng = A.mulberry32(Sp + 17);
    todo.forEach(d => { out[d.id] = []; });
    let t = 0; clearTimeout(timer.current);
    const step = () => {
      for (let r = 0; r < 5 && t < K; r++, t++) todo.forEach(d => out[d.id].push(A.runACES(d.D, d.G, noise, Sp, rng).rms));
      setProg(t / K);
      if (t < K) timer.current = setTimeout(step, 0);
      else {
        todo.forEach(d => { const ev = A.jacobiEig(d.fom.Sig); out[d.id + ":pred"] = A.predictedSamples(ev, A.buildIndex(A.TOY).N, 20000, A.mulberry32(3)); });
        setSims({ ...out, Sp }); setProg(null);
      }
    };
    step();
  };
  const shown = designs.filter(d => sel.includes(d.id));
  const xmax = Math.max(...shown.map(d => d.fom.F + 4 * Math.sqrt(d.fom.V)));
  return <div className="plot card">
    <table className="tb-table" style={{ fontSize: 13.5 }}><thead><tr><th></th><th>实验设计</th><th><TxI>{R`$\mathcal F$`}</TxI></th><th><TxI>{R`$\sqrt{\mathcal V}$`}</TxI></th><th>同精度所需预算（相对最优）</th></tr></thead>
      <tbody>{designs.map(d => <tr key={d.id}>
        <td><input type="checkbox" checked={sel.includes(d.id)} onChange={e => { setSel(e.target.checked ? [...sel, d.id] : sel.filter(x => x !== d.id)); setSims({}); }} /></td>
        <td><span style={{ display: "inline-block", width: 10, height: 10, background: d.color, marginRight: 6 }} /><TxI>{d.name}</TxI></td>
        <td>{f(d.fom.F)}</td><td>{f(Math.sqrt(d.fom.V))}</td><td>{f(100 * (d.fom.F / Fbest) ** 2, 0)}%</td></tr>)}</tbody></table>
    <div className="plot-params" style={{ gap: 10 }}>
      <div><span style={{ fontSize: 13 }}>每次实验的预算 </span><Seg options={[[1e4, R`$S'=10^4$`], [1e5, R`$10^5$`], [1e6, R`$10^6$`]]} value={Sp} onChange={v => { setSp(v); setSims({}); }} /></div>
      <button className="plot-reset" disabled={prog != null} onClick={simulate}>{prog != null ? `模拟中… ${Math.round(prog * 100)}%` : "对勾选的设计各模拟 100 次"}</button>
      <button className="plot-reset" disabled={busy} onClick={reopt}>{busy ? "优化中…" : "在浏览器里重新优化 shot 权重"}</button>
    </div>
    {Object.keys(sims).length > 0 && <>
      <Hist xDomain={[0, xmax]} xlabel={R`\text{归一化 RMS 误差（柱：${100}\ 次模拟，}S'=${sims.Sp.toExponential(0).replace("e+", R`\times10^{`)}}\text{；曲线：式 (27) 的预测分布；虚线：}\mathcal F)`}
        groups={shown.filter(d => sims[d.id]).map(d => ({ vals: sims[d.id], pred: sims[d.id + ":pred"], color: d.color, F: d.fom.F }))} />
      <div style={{ fontSize: 13.5 }}>{shown.filter(d => sims[d.id]).map(d => { const v = sims[d.id], m = v.reduce((a, b) => a + b, 0) / v.length; return <div key={d.id}><TxI>{R`${d.name}：模拟均值 $${f(m)}$，预测 $\mathcal F=${f(d.fom.F)}$`}</TxI></div>; })}</div>
    </>}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(600px, 1fr))", gap: 10, marginTop: 6 }}>
      <Bars labels={OPT_LABEL} vals={gam} lo={0} hi={Math.max(...gam) * 1.15} color={COL.blue} title={R`\text{优化后的 shot 权重}\ \Gamma_T`} h={170} minBw={92} />
      {hist && <svg viewBox="0 0 320 170" style={{ width: "100%", maxWidth: 320 }}>
        <TexAt x={40} y={14} w={270} size={12} color="#555" tex={R`\text{Nesterov 迭代中的}\ \mathcal F\ \text{（去极化噪声）}`} />
        {(() => { const lo = Math.min(...hist), hi = Math.max(...hist), sx = i => 40 + i / (hist.length - 1) * 270, sy = v => 25 + 120 * (1 - (v - lo) / (hi - lo || 1)); return <>
          <path d={hist.map((v, i) => `${i ? "L" : "M"}${sx(i)},${sy(v)}`).join("")} fill="none" stroke={COL.blue} strokeWidth="2" />
          <text x={36} y={sy(hi) + 4} fontSize="10" textAnchor="end">{f(hi)}</text><text x={36} y={sy(lo) + 4} fontSize="10" textAnchor="end">{f(lo)}</text>
          <text x={310} y={162} fontSize="10" textAnchor="end">迭代步 {hist.length - 1}</text></>; })()}
      </svg>}
    </div>
    <Note>{R`「优化 tuple 集」是我们在 node 里对去极化噪声跑的小规模版本：基本集 $\to$ 加入 4 个重复 tuple 并用坐标下降调奇数重复次数 $\to$ 贪心加入浅 tuple、删去无用 tuple（算法 2 的精神）。shot 权重按式 (30)(31) 优化（同样针对去极化噪声），再拿去刻画对数正态噪声实例——与原文「为去极化优化、在对数正态上检验」的做法相同。与原文的差别：3 比特、63 个参数、9 个 tuple，而原文 $d=3$ 表面码有 17 比特、31 个 tuple。预算取 $S'=10^4$ 或 $10^5$ 时，模拟出的误差会系统地**小于**预测（基本设计尤其明显）：估计值被截断到 $\lambda\le1$ 这个合法区间，相当于加了先验信息——这正是原文图 13 在小预算下「预测偏悲观」的同一机制；$S'=10^6$ 时两者吻合。`}</Note>
  </div>;
}

// =====================================================================
// 5. 附录 C：相对精度、重复次数与计时
// =====================================================================
const TAU = 660 / 29, LM = 0.96;
export function ToyCPhiPlot() {
  return <Plot
    x={{ label: R`1-\lambda`, log: true, domain: [1e-6, 1e-2] }}
    y={{ label: R`\phi_{\rm opt}`, log: true, domain: [10, 2e6] }}
    samples={60}
    series={() => {
      const xs = A.toyC; const grid = Array.from({ length: 41 }, (_, i) => 10 ** (-6 + i * 0.1));
      return [
        { label: R`\text{计时（时间最优）}`, data: grid.map(e => [e, xs.phiOpt(p => xs.Ftime(TAU, 1 - e, LM, p))]), color: COL.red },
        { label: R`\text{不计时（样本最优）}`, data: grid.map(e => [e, xs.phiOpt(p => xs.Fsamp(1 - e, LM, p))]), color: COL.blue },
        { label: R`\propto 1/(1-\lambda)`, f: e => 0.3 / e, dash: "dot", color: COL.grey },
      ];
    }}
    vlines={[{ x: 1e-3, label: R`\phi_{\rm opt}=306` }]}
    caption={R`$\tau=660/29$，$\lambda_m=0.96$，按式 (C20)/(C21) 对 $\phi$ 连续优化后取上下整中较好者。两条曲线都随 $1/(1-\lambda)$ 增长；计时版本更短。$1-\lambda=10^{-3}$ 处时间最优的 $\phi_{\rm opt}=306$，与原文附录 G 所引数值一致。`} />;
}
export function ToyCFPlot() {
  return <Plot
    x={{ label: R`1-\lambda`, log: true, domain: [1e-6, 1e-2] }}
    y={{ label: R`\mathcal F`, log: true, domain: [1e-6, 2] }}
    params={[{ id: "lm", label: R`\lambda_m`, min: 0.8, max: 0.995, step: 0.005, value: 0.96 }]}
    samples={60}
    series={pv => {
      const xs = A.toyC, grid = Array.from({ length: 41 }, (_, i) => 10 ** (-6 + i * 0.1));
      return [
        { label: R`\text{基本设计}\ (\phi=1)`, data: grid.map(e => [e, xs.Ftime(TAU, 1 - e, pv.lm, 1)]), color: COL.grey },
        { label: R`\text{时间最优}\ \mathcal F`, data: grid.map(e => { const p = xs.phiOpt(q => xs.Ftime(TAU, 1 - e, pv.lm, q)); return [e, xs.Ftime(TAU, 1 - e, pv.lm, p)]; }), color: COL.red },
        { label: R`\text{样本最优}\ \mathcal F'`, data: grid.map(e => { const p = xs.phiOpt(q => xs.Fsamp(1 - e, pv.lm, q)); return [e, xs.Fsamp(1 - e, pv.lm, p)]; }), color: COL.blue },
        { label: R`\propto\sqrt{1-\lambda}`, f: e => 0.28 * Math.sqrt(e), dash: "dot", color: COL.red },
        { label: R`\propto 1-\lambda`, f: e => 2 * e, dash: "dot", color: COL.blue },
      ];
    }}
    caption={R`附录 C 的三种设计（式 (C20)(C21)，$\tau=660/29$）。不计时间时，深电路能把误差压到 $\propto(1-\lambda)$——相对精度；把电路时长算进去，深电路采样变慢，最优误差只能 $\propto\sqrt{1-\lambda}$；基本设计不放大噪声，误差几乎不随 $\lambda$ 变，只有加性精度。拖 $\lambda_m$ 看 SPAM 噪声的影响。`} />;
}
export function ToyCGammaPlot() {
  return <Plot
    x={{ label: R`\phi`, log: true, domain: [1, 1e4] }}
    y={{ label: R`\mathcal F`, log: true }}
    params={[{ id: "e", label: R`1-\lambda`, min: 1e-5, max: 1e-2, log: true, value: 1e-3 }, { id: "G", label: R`\Gamma`, min: 0.02, max: 0.98, step: 0.01, value: 0.15 }]}
    samples={120}
    series={pv => {
      const lam = 1 - pv.e, xs = A.toyC;
      return [
        { label: R`\Gamma\ \text{取最优 (C17)}`, f: p => xs.F(TAU, lam, LM, 0, p, xs.Gopt(TAU, lam, LM, 0, p)), color: COL.red },
        { label: R`\Gamma\ \text{固定为滑块值}`, f: p => xs.F(TAU, lam, LM, 0, p, pv.G), color: COL.gold, dash: "dash" },
      ];
    }}
    vlines={pv => [{ x: A.toyC.phiOpt(p => A.toyC.Ftime(TAU, 1 - pv.e, LM, p)), label: R`\phi_{\rm opt}` }]}
    caption={R`固定 $\phi_1=0$，看式 (C13) 的 $\mathcal F$ 如何随第二个 tuple 的重复次数 $\phi$ 变化：$\phi$ 太小，本征值几乎不衰减，学不到东西；$\phi$ 太大，电路本征值太小、且电路太费时。红线在每个 $\phi$ 处都用式 (C17) 的最优 $\Gamma$，它总在黄虚线之下——shot 分配本身就是一个可优化的设计变量。`} />;
}
