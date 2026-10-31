// 第 I 章交互图。数值函数见 _ch01_phys.js（纯 JS；已复制为 .mjs 用 node 核对）：
// · 方势散射：传递矩阵法得到的 T 与补充材料 H_I 的解析公式（势阶 4k₁k₂/(k₁+k₂)²；势垒 sin²/sinh² 公式；
//   势阱 sin² 公式）在 24 组 (形状, g, ε) 上一致到 1e-6，且 R+T = 1 到 1e-8；φ 在界面处连续。
// · 自由高斯波包：解析式与直接数值积分 (C-7) 在 5 个 (x,t) 点上一致到 1e-8；|ψ|² 的均方根宽度
//   = (a/2)√(1+4t²/a⁴)（t = 0, 2, 5 时 1.00000, 1.41421, 2.69258，a = 2），中心 = k₀t，归一化保持 1.00000。
// · 三波模型 (C-10)：Δk = 2 时 ψ(±π) = 0（即 ΔxΔk = 4π）；连续高斯 |g|：FWHM 之积 = 8 ln 2 = 5.545，与 Δk 无关。
// · 双缝：20000 个抽样光子的直方图与 4 sinc²cos² 一致；Malus：N = 10⁴、θ = 30° 时通过 7497 个（期望 7500）。
import { useMemo, useState } from "react";
import { Plot, M, TxI, renderTex } from "@kit";
import * as P from "./_ch01_phys.js";

const R = String.raw;
const INK = "#1f1b16", RED = "#c0392b", BLUE = "#2c4a6e", GREEN = "#2c6e49", GOLD = "#b8862b", VIOLET = "#7d3c98", GREY = "#9a948b";
const fx = (v, d = 2) => (Number.isFinite(+v) ? (+v).toFixed(d) : "—");

// ---------- 小工具 ----------
function T({ tex, x, y, w = 160, h = 24, align = "left", color, size }) {
  const dx = align === "center" ? -w / 2 : align === "right" ? -w : 0;
  return <foreignObject x={x + dx} y={y - h / 2} width={w} height={h} style={{ overflow: "visible", pointerEvents: "none" }}>
    <div className="plot-tex" style={{ textAlign: align, color, fontSize: size, whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} /></foreignObject>;
}
const Slider = ({ tex, min, max, step, value, set }) => <label className="plot-param"><span className="plot-plabel"><M>{tex}</M></span>
  <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(+e.target.value)} /></label>;
const Seg = ({ options, value, set }) => <div className="seg" style={{ marginBottom: 6 }}>{options.map(([v, l]) => <button key={v} className={v === value ? "on" : ""} onClick={() => set(v)}>{l}</button>)}</div>;
const Note = ({ children }) => <p style={{ margin: "0.35em 0", fontSize: 14.5 }}><TxI>{children}</TxI></p>;

// =====================================================================
// 1. 单光子逐个到达：双缝干涉图样的累积（§A-2）
// =====================================================================
const SL = { a: 0.3, d: 1.5, U: 4 };                    // 无量纲缝宽、缝距；屏上坐标 u ∈ [−U, U]
const NBIN = 80;
const POOL = {};                                         // 每种模式预先抽 20000 个光子（固定种子）
const pool = mode => (POOL[mode] ||= P.samplePhotons(20000, SL.a, SL.d, mode, SL.U, mode === "both" ? 7 : mode === "one" ? 11 : 13));
const NORM = {};
const normOf = mode => (NORM[mode] ||= (() => { let s = 0; const n = 4000, h = 2 * SL.U / n; for (let i = 0; i <= n; i++) s += (i === 0 || i === n ? 0.5 : 1) * h * P.slitIntensity(-SL.U + i * h, SL.a, SL.d, mode); return s; })());

export function DoubleSlitDemo() {
  const [lgN, setLgN] = useState(1.3);
  const [mode, setMode] = useState("both");
  const N = Math.round(10 ** lgN);
  const pts = pool(mode).slice(0, N);
  const hist = useMemo(() => { const h = new Array(NBIN).fill(0); for (const [u] of pts) h[Math.min(NBIN - 1, Math.floor((u + SL.U) / (2 * SL.U) * NBIN))]++; return h; }, [mode, N]);
  const W = 680, m = { l: 56, r: 16 }, iw = W - m.l - m.r;
  const sx = u => m.l + (u + SL.U) / (2 * SL.U) * iw;
  const H1 = 120, H2 = 200, top2 = H1 + 30, H = top2 + H2 + 40;
  const bw = 2 * SL.U / NBIN, expected = u => N * bw * P.slitIntensity(u, SL.a, SL.d, mode) / normOf(mode);
  const ymax = Math.max(4, ...hist, expected(0)) * 1.1, sy = v => top2 + H2 - v / ymax * H2;
  const curve = useMemo(() => { const out = []; for (let i = 0; i <= 400; i++) { const u = -SL.U + 2 * SL.U * i / 400; out.push(`${i ? "L" : "M"}${sx(u).toFixed(1)},${sy(expected(u)).toFixed(1)}`); } return out.join(""); }, [mode, N, ymax]);
  // 亮纹中心 u = 0 与第一暗纹 u = 1/(2d) 附近（各取 ±0.05 宽）的计数
  const cnt = (c, w) => pts.filter(([u]) => Math.abs(u - c) < w).length;
  const nBright = cnt(0, 0.05), nDark = cnt(1 / (2 * SL.d), 0.05);
  const eBright = N * P.slitIntensity(0, SL.a, SL.d, mode) * 0.1 / normOf(mode), eDark = N * P.slitIntensity(1 / (2 * SL.d), SL.a, SL.d, mode) * 0.1 / normOf(mode);
  return (
    <div className="plot card">
      <Seg value={mode} set={setMode} options={[["both", "两缝同开（不测路径）"], ["one", "只开缝 F₁"], ["which", "两缝同开，但在缝后测路径"]]} />
      <div className="plot-params">
        <Slider tex={R`\text{已到达的光子数}\ N=${N}`} min={0} max={4.301} step={0.01} value={lgN} set={setLgN} />
        <button className="plot-reset" onClick={() => setLgN(0)}>从 1 个光子开始</button>
        <button className="plot-reset" onClick={() => setLgN(Math.min(4.301, lgN + 0.3))}>×2</button>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <rect x={m.l} y={4} width={iw} height={H1} fill="#16130f" rx={4} />
        {pts.map(([u, y], i) => <circle key={i} cx={sx(u)} cy={8 + y * (H1 - 8)} r={N > 3000 ? 0.9 : N > 300 ? 1.4 : 2.4} fill="#f6e7b8" opacity={N > 3000 ? 0.7 : 0.95} />)}
        <T tex={R`\text{照相底片：每个光子留下一个点}`} x={m.l + 6} y={H1 + 16} w={300} color="#6b6257" />
        <rect x={m.l} y={top2} width={iw} height={H2} className="plot-frame" />
        {hist.map((c, i) => <rect key={i} x={sx(-SL.U + i * bw) + 0.5} y={sy(c)} width={iw / NBIN - 1} height={top2 + H2 - sy(c)} fill="#d9c7a3" />)}
        <path d={curve} fill="none" stroke={RED} strokeWidth={2} />
        {[-4, -2, 0, 2, 4].map(u => <T key={u} tex={String(u)} x={sx(u)} y={top2 + H2 + 12} w={30} align="center" />)}
        <T tex={R`\text{屏上位置}\ x\ (\text{任意单位})`} x={m.l + iw / 2} y={H - 10} w={300} align="center" />
        <T tex={R`\text{计数}`} x={m.l - 8} y={top2 + 10} w={50} align="right" />
      </svg>
      <div className="plot-legend">
        <span><svg width="28" height="10"><rect width="28" height="10" fill="#d9c7a3" /></svg>每个小区间的计数</span>
        <span><svg width="28" height="10"><line x1="0" x2="28" y1="5" y2="5" stroke={RED} strokeWidth="2.5" /></svg><M>{mode === "both" ? R`N\times P(x)\ \text{期望值},\ P\propto|E_1+E_2|^2` : mode === "one" ? R`N\times P(x),\ P\propto|E_1|^2` : R`N\times P(x),\ P\propto|E_1|^2+|E_2|^2`}</M></span>
      </div>
      <Note>{R`中央亮纹（$x=0$ 附近）计数 **${nBright}**（期望 ${fx(eBright, 1)}）；第一暗纹（$x=${fx(1 / (2 * SL.d), 3)}$ 附近，同宽）计数 **${nDark}**（期望 ${fx(eDark, 1)}）。${N < 30 ? "光子很少时，落点看上去完全随机。" : N < 1000 ? "条纹开始从随机点中浮现。" : "大量光子之后，点的密度就是波动理论算出的光强。"}${mode === "which" ? "测路径后，条纹消失：分布是两个单缝衍射图样之和。" : ""}`}</Note>
    </div>);
}

// =====================================================================
// 2. 单个光子与检偏器（§A-3，式 A-8、A-10）
// =====================================================================
export function MalusDemo() {
  const [deg, setDeg] = useState(30);
  const [lgN, setLgN] = useState(2);
  const N = Math.round(10 ** lgN), th = deg * Math.PI / 180;
  const run = useMemo(() => P.malusRun(N, th, 3 + deg), [N, deg]);
  const W = 680, H = 230, cx0 = 120, cy0 = 120, L = 90;
  const ex = [cx0, cy0 - L], ep = [cx0 - L * Math.sin(th), cy0 - L * Math.cos(th)];
  const shown = run.seq.slice(0, Math.min(N, 200));
  const sd = Math.sqrt(N * run.p * (1 - run.p));
  return (
    <div className="plot card">
      <div className="plot-params">
        <Slider tex={R`\theta=${deg}^\circ`} min={0} max={90} step={1} value={deg} set={setDeg} />
        <Slider tex={R`\text{光子数}\ N=${N}`} min={0} max={4} step={0.01} value={lgN} set={setLgN} />
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <defs><marker id="c01ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill={INK} /></marker></defs>
        <line x1={cx0} y1={cy0} x2={ex[0]} y2={ex[1] - 12} stroke={INK} markerEnd="url(#c01ar)" />
        <line x1={cx0} y1={cy0} x2={cx0 - L - 12} y2={cy0} stroke={INK} markerEnd="url(#c01ar)" />
        <line x1={cx0} y1={cy0} x2={ep[0]} y2={ep[1]} stroke={RED} strokeWidth={2.5} markerEnd="url(#c01ar)" />
        <line x1={ep[0]} y1={ep[1]} x2={cx0} y2={ep[1]} stroke={RED} strokeDasharray="3 3" />
        <line x1={ep[0]} y1={ep[1]} x2={ep[0]} y2={cy0} stroke={RED} strokeDasharray="3 3" />
        <T tex={R`\mathbf e_x\ (\text{透光轴})`} x={cx0 + 6} y={cy0 - L - 14} w={120} />
        <T tex={R`\mathbf e_y`} x={cx0 - L - 26} y={cy0 + 14} w={40} />
        <T tex={R`\mathbf e_p`} x={ep[0] - 8} y={ep[1] - 12} w={30} align="right" color={RED} />
        <T tex={R`\cos\theta=${fx(Math.cos(th), 3)}`} x={cx0 + 8} y={(ep[1] + cy0) / 2} w={130} color={RED} />
        <T tex={R`\sin\theta=${fx(Math.sin(th), 3)}`} x={(ep[0] + cx0) / 2} y={cy0 + 16} w={130} align="center" color={RED} />
        <text x={260} y={30} fontSize="13" fill="#6b6257">前 {shown.length} 个光子（实心 = 通过，空心 = 被吸收）</text>
        {shown.map((ok, i) => <circle key={i} cx={268 + (i % 25) * 16} cy={50 + Math.floor(i / 25) * 20} r={5.5} fill={ok ? GREEN : "none"} stroke={ok ? GREEN : GREY} strokeWidth={1.5} />)}
      </svg>
      <Note>{R`每个光子要么整个通过，要么整个被吸收（"本征结果"只有两个）。通过概率 $\cos^2\theta=${fx(run.p, 3)}$；${N} 个光子中通过 **${run.pass}** 个，期望 $N\cos^2\theta=${fx(N * run.p, 1)}$，统计涨落约 $\pm${fx(sd, 1)}$。$\theta=0^\circ$ 或 $90^\circ$ 时结果是确定的——光子处于检偏器的本征态。`}</Note>
    </div>);
}

// =====================================================================
// 3. 波包的构造：叠加平面波（§C-2，式 C-8、C-10、C-12–C-18）
// =====================================================================
const K0 = 8;
export function PacketBuilder() {
  const [mode, setMode] = useState("three");
  const [dk, setDk] = useState(2);
  const [Mw, setMw] = useState(7);
  const [x0, setX0] = useState(0);
  const [beta, setBeta] = useState(0);
  const comps = useMemo(() => P.packetComponents(mode, K0, dk, Mw), [mode, dk, Mw]);
  const psi = x => P.packetPsi(comps, x, K0, mode === "three" ? 0 : x0, mode === "three" ? 0 : beta);
  const sig = dk / (2 * Math.sqrt(2 * Math.LN2));
  const stats = useMemo(() => {
    if (mode !== "cont") return null;
    const xs = []; for (let i = 0; i <= 2400; i++) xs.push(-60 + 120 * i / 2400);
    return P.widths(xs, x => Math.sqrt(P.cabs2(psi(x))));
  }, [mode, dk, x0, beta, comps]);
  const xc = mode === "three" ? 0 : x0, amp0 = Math.sqrt(P.cabs2(P.packetPsi(comps, xc, K0, xc, 0)));     // 归一化：β = 0 时中心处 |ψ|
  return (
    <div className="plot card">
      <Seg value={mode} set={setMode} options={[["three", "三个平面波（式 C-10）"], ["M", "M 个等距平面波"], ["cont", "连续叠加（高斯 |g(k)|）"]]} />
      <div className="plot-params">
        <Slider tex={R`\Delta k=${fx(dk, 2)}\ \ (k_0=${K0})`} min={0.5} max={6} step={0.05} value={dk} set={setDk} />
        {mode === "M" && <Slider tex={R`\text{平面波个数}=${Mw}`} min={3} max={41} step={2} value={Mw} set={setMw} />}
        {mode !== "three" && <Slider tex={R`x_0=-[\mathrm d\alpha/\mathrm dk]_{k_0}=${fx(x0, 1)}`} min={-8} max={8} step={0.1} value={x0} set={setX0} />}
        {mode !== "three" && <Slider tex={R`\text{二次相位}\ \alpha\ni\beta(k-k_0)^2,\ \beta=${fx(beta, 1)}`} min={0} max={6} step={0.1} value={beta} set={setBeta} />}
      </div>
      <Plot
        x={{ label: R`k`, domain: [K0 - 6, K0 + 6] }}
        y={{ label: R`|g(k)|\ \text{(相对值)}`, domain: [0, 1.15] }}
        series={() => mode === "three"
          ? [{ label: R`\text{三个平面波的振幅}\ 1,\tfrac12,\tfrac12`, data: comps.map(c => [c.k, c.w]), points: true, color: RED }]
          : mode === "M"
            ? [{ label: R`|g(k_j)|`, data: comps.map(c => [c.k, Math.exp(-((c.k - K0) ** 2) / (2 * sig * sig))]), points: true, color: RED },
               { label: R`\text{包络（半高全宽}\ \Delta k)`, f: k => Math.exp(-((k - K0) ** 2) / (2 * sig * sig)), color: GREY, dash: "dash" }]
            : [{ label: R`|g(k)|\ \text{（半高全宽}\ \Delta k)`, f: k => Math.exp(-((k - K0) ** 2) / (2 * sig * sig)), color: RED }]}
        height={190} samples={300} />
      <Plot
        x={{ label: R`x`, domain: [-16, 16] }}
        y={{ label: R`\mathrm{Re}\,\psi(x,0),\ |\psi(x,0)|`, domain: mode === "three" ? [-1.15, 5.2] : [-1.15, 1.15] }}
        series={() => {
          const s = [
            { label: R`\mathrm{Re}\,\psi`, f: x => psi(x).re / amp0, color: BLUE, width: 1.4 },
            { label: R`|\psi|`, f: x => Math.sqrt(P.cabs2(psi(x))) / amp0, color: INK, width: 2.2 },
          ];
          if (mode === "three") {
            s.push({ label: R`\tfrac12[1+\cos(\tfrac{\Delta k}{2}x)]\ \text{(C-10)}`, f: x => 0.5 * (1 + Math.cos(dk * x / 2)), color: GOLD, dash: "dash" });
            comps.forEach((c, i) => s.push({ label: i === 0 ? R`\text{三个分量的实部（上移显示）}` : undefined, f: x => [3.6, 2.4, 4.8][i] + 0.5 * c.w * Math.cos(c.k * x), color: GREY, width: 1.1 }));
          }
          return s;
        }}
        vlines={() => mode === "three" ? [{ x: -2 * Math.PI / dk, label: R`-\Delta x/2` }, { x: 2 * Math.PI / dk, label: R`\Delta x/2` }]
          : mode === "M" ? [{ x: x0 + 2 * Math.PI / (comps[1].k - comps[0].k), label: R`\text{下一个重复峰}` }] : [{ x: x0, label: R`x_0` }]}
        height={mode === "three" ? 420 : 300} samples={900} />
      {mode === "three" && <Note>{R`零点在 $x=\pm2\pi/\Delta k=\pm${fx(2 * Math.PI / dk, 3)}$，两零点间距 $\Delta x=${fx(4 * Math.PI / dk, 3)}$，$\Delta x\,\Delta k=4\pi=${fx(4 * Math.PI, 3)}$ \eqref{C-11}。$x=0$ 处三个分量同相（相长），离开 $x=0$ 后逐渐失相。注意 $|\psi|$ 以 $4\pi/\Delta k$ 为周期重复——有限个平面波的叠加总是周期的。`}</Note>}
      {mode === "M" && <Note>{R`${Mw} 个等距平面波（相邻波数之差 $k_{j+1}-k_j=${fx(comps[1].k - comps[0].k, 3)}$）的叠加以 $2\pi/(k_{j+1}-k_j)=${fx(2 * Math.PI / (comps[1].k - comps[0].k), 2)}$ 为周期重复。波越多、间隔越密，重复峰就推得越远；连续叠加时只剩一个峰（原书对 (C-10) 的注释）。`}</Note>}
      {mode === "cont" && stats && <Note>{R`数值测得：$|\psi|$ 的半高全宽 $\Delta x=${fx(stats.fwhm, 3)}$，$\Delta x\,\Delta k=${fx(stats.fwhm * dk, 3)}$（$\beta=0$ 时恒为 $8\ln2=${fx(8 * Math.LN2, 3)}$，与 $\Delta k$ 无关）；用均方根宽度，$\Delta x_{\rm rms}\Delta k_{\rm rms}=${fx(stats.rms * sig / Math.SQRT2, 3)}$（下界 $1/2$）。峰位于 $x=${fx(stats.peak, 2)}$，与稳相条件给出的 $x_0=${fx(x0, 2)}$ 一致。加二次相位 $\beta$：$|g(k)|$ 不变，波包却变宽——乘积可以任意大于下界，但不能小于它 \eqref{C-18}。`}</Note>}
    </div>);
}

// =====================================================================
// 4. 图 5 交互版：被积函数随 k 的振荡（稳相论证，式 C-14–C-17）
// =====================================================================
export function IntegrandDemo() {
  const s = 1 / (2 * Math.sqrt(2 * Math.LN2));        // Δk = 1（半高全宽）
  return <Plot
    x={{ label: R`(k-k_0)/\Delta k`, domain: [-2.5, 2.5] }}
    y={{ label: R`\mathrm{Re}\{|g(k)|\,\mathrm e^{i(k-k_0)(x-x_0)}\}`, domain: [-1.1, 1.1] }}
    params={[{ id: "u", label: R`(x-x_0)\,\Delta k`, min: 0, max: 30, step: 0.1, value: 2 }]}
    series={p => [
      { label: R`\text{被积函数（实部）}`, f: q => Math.exp(-q * q / (2 * s * s)) * Math.cos(q * p.u), color: INK },
      { label: R`\pm|g(k)|`, f: q => Math.exp(-q * q / (2 * s * s)), color: GREY, dash: "dash" },
      { label: R`\text{积分值}/\text{最大值}=\mathrm e^{-\sigma^2(x-x_0)^2/2}=${fx(Math.exp(-((s * p.u) ** 2) / 2), 4)}`, f: q => -Math.exp(-q * q / (2 * s * s)), color: GREY, dash: "dash" },
    ]}
    samples={600} height={300}
    caption={R`取高斯 $|g(k)|$（半高全宽 $\Delta k$，$\sigma=\Delta k/2\sqrt{2\ln2}$）。$(x-x_0)\Delta k\lesssim1$ 时被积函数几乎不振荡，积分大；$(x-x_0)\Delta k\gg1$ 时正负相消，积分趋于零——这就是 $\Delta x\,\Delta k\gtrsim1$ 的来源。`} />;
}

// =====================================================================
// 5. 图 6 交互版：三个平面波的波峰与群速度（式 C-27、C-28）
// =====================================================================
export function CrestDemo() {
  const k0 = 4, dk = 1, w0 = k0 * k0 / 2, dw = k0 * dk;            // ħ = m = 1：Δω = V_G Δk，V_G = k₀ = 4
  const ks = [k0 - dk / 2, k0, k0 + dk / 2], ws = [w0 - dw / 2, w0, w0 + dw / 2], amp = [0.5, 1, 0.5];
  const offs = [2.2, 4.2, 6.2];
  return <Plot
    x={{ label: R`x`, domain: [-4, 30] }}
    y={{ label: R`\text{各分量（上）与}\ \mathrm{Re}\,\psi\ \text{（下）}`, domain: [-2.3, 8.2] }}
    params={[{ id: "t", label: R`t`, min: 0, max: 6, step: 0.02, value: 0 }]}
    series={p => {
      const out = ks.map((k, i) => ({ label: i === 1 ? R`\text{三个分量（下→上：}k_0-\tfrac{\Delta k}2,\ k_0,\ k_0+\tfrac{\Delta k}2)` : undefined, f: x => offs[i] + amp[i] * 0.9 * Math.cos(k * x - ws[i] * p.t), color: GREY, width: 1.2 }));
      // 每个分量中 t = 0 时位于 x = 0 的那个波峰，以各自的相速度 ω/k 前进
      out.push({ label: R`\text{各分量中原在}\ x=0\ \text{的波峰（相速度）}`, data: ks.map((k, i) => [ws[i] / k * p.t, offs[i] + amp[i] * 0.9]), points: true, color: GOLD });
      out.push({ label: R`\mathrm{Re}\,\psi(x,t)`, f: x => 0.5 * (Math.cos(k0 * x - w0 * p.t) * (1 + Math.cos(dk * x / 2 - dw * p.t / 2))), color: BLUE });
      out.push({ label: R`|\psi(x,t)|`, f: x => 0.5 * (1 + Math.cos(dk * x / 2 - dw * p.t / 2)), color: INK, width: 2 });
      return out;
    }}
    vlines={p => [{ x: (dw / dk) * p.t, label: R`x_M=\tfrac{\Delta\omega}{\Delta k}t` }, { x: (w0 / k0) * p.t, label: R`\tfrac{\omega_0}{k_0}t` }]}
    samples={700} height={400}
    caption={R`取 $\hbar=m=1$，$k_0=4$，$\Delta k=1$，三个角频率按原书取 $\omega_0$、$\omega_0\pm\Delta\omega/2$，$\Delta\omega=V_G\Delta k$。拖动 $t$：三个分量各自以相速度 $\omega/k$ 前进（$k$ 大的跑得快），原先在 $x=0$ 对齐的波峰 (2) 很快错开；相长干涉的位置（$|\psi|$ 的极大）以 $\Delta\omega/\Delta k=4$ 前进，是中心相速度 $\omega_0/k_0=2$ 的两倍——这正是 \eqref{C-32}。`} />;
}

// =====================================================================
// 6. 自由高斯波包的运动与扩散（§C-4，补充材料 G_I 的结果）
// =====================================================================
export function GaussPacketDemo() {
  return <Plot
    x={{ label: R`x`, domain: [-10, 40] }}
    y={{ label: R`|\psi|^2\ \text{与}\ \mathrm{Re}\,\psi`, domain: [-0.7, 0.75] }}
    params={[
      { id: "t", label: R`t`, min: 0, max: 8, step: 0.02, value: 2 },
      { id: "a", label: R`\text{初始宽度参数}\ \sym{aG}{a}`, min: 0.6, max: 4, step: 0.05, value: 2 },
      { id: "k0", label: R`k_0`, min: 0, max: 5, step: 0.05, value: 3 },
    ]}
    series={p => {
      const f = x => P.gaussPsi(x, p.t, p.a, p.k0), w = P.gaussWidth(p.t, p.a);
      return [
        { label: R`|\psi(x,0)|^2`, f: x => P.cabs2(P.gaussPsi(x, 0, p.a, p.k0)), color: GREY, dash: "dot", width: 1.4 },
        { label: R`\mathrm{Re}\,\psi(x,t)`, f: x => f(x).re * 0.75, color: BLUE, width: 1.1 },
        { label: R`|\psi(x,t)|^2:\ \Delta x(t)=${fx(w, 3)}\ (\Delta x(0)=${fx(p.a / 2, 3)})`, f: x => P.cabs2(f(x)), color: INK, width: 2.2 },
      ];
    }}
    vlines={p => [{ x: p.k0 * p.t, label: R`V_Gt` }, { x: p.k0 / 2 * p.t, label: R`V_\varphi t` }]}
    samples={900} height={360}
    caption={R`取 $\hbar=m=1$，初始 $|\psi|^2$ 为高斯、均方根宽度 $\sym{aG}{a}/2$。中心以群速度 $V_G=\hbar k_0/m$ 运动；载波的相位以 $V_\varphi=\hbar k_0/2m$ 前进（注意 $\mathrm{Re}\,\psi$ 的波峰从包络后部"穿"向前部）。宽度按 $\Delta x(t)=\frac{\sym{aG}{a}}2\sqrt{1+4\hbar^2t^2/m^2\sym{aG}{a}^4}$ 增长：初始越窄（$\Delta p$ 越大）扩散越快。图中 $\Delta x$ 由数值积分核对。`} />;
}

// =====================================================================
// 7. 方势阶 / 方势垒 / 方势阱：透射与反射（§D-2-c）
// =====================================================================
const KINDS = [["step", "势阶（图 8）"], ["barrier", "势垒（图 9）"], ["well", "势阱（图 10）"]];
const safeE = (E, reg) => (reg.some(r => Math.abs(E - r.V) < 1e-9) ? E + 1e-7 : E);
export function ScatterDemo() {
  const [kind, setKind] = useState("barrier");
  const [g, setG] = useState(4);
  const [eps, setEps] = useState(0.6);
  const reg = P.shape(kind, g), G2 = g * g;
  const res = P.scatter(reg, safeE(eps * G2, reg));
  const Tc = e => (kind === "well" ? 1 : e > 1 ? 1 : 0);
  const bound = kind === "well" ? P.wellBound(g) : [];
  const naive = kind === "well" ? P.naiveLevels(g) : [];
  const Vx = x => (kind === "step" ? (x >= 0 ? 1 : 0) : x >= 0 && x <= 1 ? (kind === "barrier" ? 1 : -1) : 0);
  return (
    <div className="plot card">
      <Seg value={kind} set={setKind} options={KINDS} />
      <div className="plot-params">
        <Slider tex={R`\sym{gL}{\gamma}=\sqrt{2mV_0}\,\sym{Lw}{L}/\hbar=${fx(g, 2)}`} min={1} max={12} step={0.05} value={g} set={setG} />
        <Slider tex={R`E/V_0=${fx(eps, 3)}`} min={0.01} max={4} step={0.005} value={eps} set={setEps} />
      </div>
      <Plot
        x={{ label: R`E/V_0`, domain: [0.01, 4] }}
        y={{ label: R`\text{透射率与反射率}`, domain: [-0.03, 1.05] }}
        series={() => [
          { label: R`\text{透射率}\ T`, f: e => P.scatter(reg, safeE(e * G2, reg)).T, color: BLUE, width: 2.2 },
          { label: R`\text{反射率}\ 1-T`, f: e => 1 - P.scatter(reg, safeE(e * G2, reg)).T, color: RED, width: 1.4 },
          { label: R`\text{经典粒子的透射率}`, f: Tc, color: GREY, dash: "dash", width: 1.4 },
        ]}
        vlines={() => [{ x: eps, label: R`T=${fx(res.T, 4)}` }]}
        height={260} samples={500} />
      <Plot
        x={{ label: R`x/\sym{Lw}{L}`, domain: [-3, 4] }}
        y={{ label: R`|\varphi(x)|^2\ \text{(入射振幅为 1)}`, domain: kind === "step" && eps < 1 ? [-0.3, 4.4] : [-0.3, 4.4] }}
        series={() => [
          { label: R`V(x)/V_0\ \text{(示意)}`, f: x => 1.6 + Vx(x) * 1.2, color: GOLD, width: 1.4 },
          { label: R`E/V_0\ \text{(同一比例)}`, f: () => 1.6 + eps * 1.2, color: GOLD, dash: "dot", width: 1.2 },
          { label: R`\mathrm{Re}\,\varphi`, f: x => P.scatterPhi(res, reg, x).re, color: GREY, width: 1.1 },
          { label: R`|\varphi|^2`, f: x => P.cabs2(P.scatterPhi(res, reg, x)), color: INK, width: 2.2 },
        ]}
        height={300} samples={900} />
      <Note>{R`当前 $E/V_0=${fx(eps, 3)}$：$T=${fx(res.T, 4)}$，$R=${fx(res.R, 4)}$，$R+T=${fx(res.R + res.T, 6)}$。${
        kind === "step" ? (eps < 1 ? "低于势阶：全反射，但 $x>0$ 处有指数衰减的倏逝波——粒子有非零概率出现在经典禁区。" : "高于势阶：经典粒子必定通过，量子粒子却有一定概率被反射；$E\\gg V_0$ 时 $T\\to1$。")
        : kind === "barrier" ? (eps < 1 ? R`低于势垒：经典粒子必定被弹回，量子粒子却以概率 $T$ 穿过——隧道效应。$\sym{gL}{\gamma}\sqrt{1-E/V_0}\gg1$ 时 $T\approx16\frac{E}{V_0}(1-\frac{E}{V_0})\mathrm e^{-2\sym{gL}{\gamma}\sqrt{1-E/V_0}}=${fx(16 * eps * (1 - eps) * Math.exp(-2 * g * Math.sqrt(1 - eps)), 4)}$。` : R`高于势垒：$T$ 振荡，在 $\sym{gL}{\gamma}\sqrt{E/V_0-1}$ 为 $\pi$ 的整数倍（垒内恰好容纳整数个半波长）时 $T=1$（共振）。`)
        : R`$E>0$ 时一般有反射；在 $\sym{gL}{\gamma}\sqrt{E/V_0+1}$ 为 $\pi$ 的整数倍处 $T=1$（共振能量，下一个在 $E/V_0=${fx(((Math.ceil(g * Math.sqrt(eps + 1) / Math.PI)) * Math.PI / g) ** 2 - 1, 3)}$）。阱内束缚态（$-V_0<E<0$）：$E/V_0=${bound.map(b => fx(b, 4)).join(",\\ ")}$；天真的驻波条件（阱宽为阱内半波长的整数倍）给出 ${naive.length ? R`$${naive.map(b => fx(b, 4)).join(",\\ ")}$` : "（无解）"}——两者不同，因为反射时倏逝波带来相移（原书脚注 8）。`}`}</Note>
    </div>);
}
