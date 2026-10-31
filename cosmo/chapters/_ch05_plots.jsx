// 第 5 章交互图。数值函数见 _ch05_phys.jsx（已用 node 核对：P_l 零点数 = l；按 (5.66) 数值积分 e^{-ixμ} 的多极矩 = j_l(x)；
// 声学振荡 RK4 与解析解最大偏差 ~1e-11）。
import { useMemo, useState } from "react";
import { Plot, M, EqChip, TxI } from "@kit";
import * as C from "./_ch05_phys.jsx";

const R = String.raw;
const f3 = v => (+v).toFixed(3);

// ---------- 1. 图 5.3 交互版：Legendre 多项式 ----------
export function LegendrePlot() {
  return <Plot
    x={{ label: R`\mu`, domain: [-1.05, 1.05] }}
    y={{ label: R`\mathcal P_l(\mu)`, domain: [-1.05, 1.05] }}
    params={[{ id: "l", label: R`l`, min: 0, max: 60, step: 1, value: 40 }]}
    series={p => {
      const l = Math.round(p.l), In = g => mu => (Math.abs(mu) <= 1 ? g(mu) : NaN);
      return [
        { label: R`l=0`, f: In(() => 1), dash: "dot", color: "#1f1b16" },
        { label: R`l=1`, f: In(mu => mu), color: "#c0392b" },
        { label: R`l=3`, f: In(mu => C.legendre(3, mu)), dash: "dash", color: "#2c6e49" },
        { label: R`l=${l}\ \ (\text{零点数}\ ${C.countZeros(l)})`, f: In(mu => C.legendre(l, mu)), color: "#2c4a6e", width: 1.6 },
      ];
    }}
    samples={900} height={340} />;
}

// ---------- 2. 多极展开：自由流平面波 Θ(μ)=e^{−ikμ(η−η*)} ----------
// 由 (5.66) 数值积分得到 Θ_l，再用 Θ(μ)=Σ(−i)^l(2l+1)Θ_l P_l(μ) 截断重建；理论上 Θ_l = j_l(x)。
function useMultipoles(x, L) {
  return useMemo(() => [...Array(L + 1)].map((_, l) => C.multipole(l, mu => [Math.cos(x * mu), -Math.sin(x * mu)], 800)), [x, L]);
}
export function MultipolePlot() {
  return <Plot
    x={{ label: R`\mu`, domain: [-1.05, 1.05] }}
    y={{ label: R`\mathrm{Re}\,\Theta(\mu)=\cos(x\mu)`, domain: [-1.6, 1.6] }}
    params={[
      { id: "x", label: R`x\equiv k(\eta-\eta_*)`, min: 0, max: 30, step: 0.1, value: 8 },
      { id: "L", label: R`l_{\max}`, min: 0, max: 40, step: 1, value: 6 },
    ]}
    series={p => {
      const L = Math.round(p.L), thl = [...Array(L + 1)].map((_, l) => C.multipole(l, mu => [Math.cos(p.x * mu), -Math.sin(p.x * mu)], 800));
      return [
        { label: R`\text{精确}\ \cos(x\mu)`, f: mu => (Math.abs(mu) <= 1 ? Math.cos(p.x * mu) : NaN), color: "#1f1b16" },
        { label: R`\text{截断到}\ l\le${L}`, f: mu => (Math.abs(mu) <= 1 ? C.rebuild(mu, thl)[0] : NaN), color: "#c0392b", dash: "dash" },
      ];
    }}
    samples={400} height={320} />;
}
export function MultipoleBars() {
  const [x, setX] = useState(8);
  const thl = useMultipoles(x, 40);
  const W = 680, H = 230, m = { l: 56, r: 14, t: 14, b: 40 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  const sx = l => m.l + (l + 0.5) / 41 * iw, sy = v => m.t + ih / 2 - v / 0.65 * (ih / 2);
  const lpeak = thl.reduce((b, t, l) => (Math.abs(t[0]) > Math.abs(thl[b][0]) ? l : b), 0);
  return (
    <div className="plot card">
      <div className="plot-params">
        <label className="plot-param"><span className="plot-plabel"><M>{R`x=k(\eta-\eta_*)=${x.toFixed(1)}`}</M></span>
          <input type="range" min={0} max={30} step={0.1} value={x} onChange={e => setX(+e.target.value)} /></label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <rect x={m.l} y={m.t} width={iw} height={ih} className="plot-frame" />
        <line x1={m.l} x2={m.l + iw} y1={sy(0)} y2={sy(0)} stroke="#999" />
        {[-0.5, 0.5].map(v => <g key={v}><line x1={m.l} x2={m.l + iw} y1={sy(v)} y2={sy(v)} className="plot-grid" /><text x={m.l - 8} y={sy(v) + 4} fontSize="12" textAnchor="end">{v}</text></g>)}
        <text x={m.l - 8} y={sy(0) + 4} fontSize="12" textAnchor="end">0</text>
        {thl.map((t, l) => <g key={l}>
          <rect x={sx(l) - 5} width={10} y={Math.min(sy(0), sy(t[0]))} height={Math.abs(sy(t[0]) - sy(0))} fill={l === lpeak ? "#c0392b" : "#2c4a6e"} opacity={0.85} />
          <circle cx={sx(l)} cy={sy(C.sphj(l, x))} r={2.2} fill="#b8862b" />
          {l % 5 === 0 && <text x={sx(l)} y={H - 22} fontSize="12" textAnchor="middle">{l}</text>}
        </g>)}
        <line x1={sx(x) } x2={sx(x)} y1={m.t} y2={m.t + ih} stroke="#2c6e49" strokeDasharray="4 4" opacity={x <= 40 ? 1 : 0} />
        <text x={m.l + iw / 2} y={H - 4} fontSize="13" textAnchor="middle">多极阶数 l（绿色虚线：l = x）</text>
      </svg>
      <div className="plot-legend" style={{ display: "block" }}><p style={{ margin: "0.3em 0" }}><TxI>{R`柱：按 \eqref{5.66} 数值积分得到的 $\Theta_l$（虚部 $<10^{-15}$）；金点：球 Bessel 函数 $j_l(x)$。最大的多极矩在 $l=${lpeak}$，其值 $\Theta_{${lpeak}}=${f3(thl[lpeak][0])}$，$j_{${lpeak}}(x)=${f3(C.sphj(lpeak, x))}$。`}</TxI></p></div>
    </div>);
}

// ---------- 3. 图 5.2 交互版：平面波温度扰动与"最后散射圆" ----------
const lerp = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
function heat(v) {          // v ∈ [−1,1]：−1 白（冷）→ 0 橙 → +1 深褐（热）
  const c0 = [255, 246, 236], c1 = [235, 120, 40], c2 = [110, 35, 8];
  const t = (v + 1) / 2, c = t < 0.5 ? lerp(c0, c1, t / 0.5) : lerp(c1, c2, (t - 0.5) / 0.5);
  return `rgb(${c.join(",")})`;
}
export function PlaneWaveSky() {
  const [th, setTh] = useState(50);       // 光子传播方向与 k 的夹角（度）
  const [s, setS] = useState(0.4);        // kλ：平均自由程 × k
  const [ph, setPh] = useState(2.2);      // kx_obs：观测点相位
  const W = 680, H = 280, span = 4 * Math.PI, px = W / span;   // 横向显示两个波长
  const ox = ph * px, oy = H / 2, r = s * px, rad = th * Math.PI / 180, mu = Math.cos(rad);
  const ang = d => [Math.cos(d), -Math.sin(d)];
  const [ux, uy] = ang(rad);
  const src = [ox - r * ux, oy - r * uy];                       // 光子来自 x_obs − λ p̂
  const theta = m_ => [Math.cos(ph - s * m_), 0];               // 看到的 Θ(μ) = Θ0(x_obs − λμ)
  const thl = useMemo(() => [0, 1, 2, 3, 4].map(l => C.multipole(l, theta, 600)), [s, ph]);
  const amp = t => Math.hypot(t[0], t[1]);
  const cols = 170;
  // 右侧小图：Θ(μ) 随 μ
  const PW = 680, PH = 150, pl = 56, pr = 14, pt = 10, pb = 30, piw = PW - pl - pr, pih = PH - pt - pb;
  const psx = v => pl + (v + 1) / 2 * piw, psy = v => pt + pih / 2 - v * pih / 2.3;
  const path = [...Array(121)].map((_, i) => { const m_ = -1 + i / 60; return `${i ? "L" : "M"}${psx(m_).toFixed(1)},${psy(theta(m_)[0]).toFixed(1)}`; }).join("");
  return (
    <div className="plot card">
      <div className="plot-params">
        <label className="plot-param"><span className="plot-plabel"><M>{R`\text{光子方向与}\ \boldsymbol k\ \text{夹角}=${th}^\circ\ (\mu=${f3(mu)})`}</M></span>
          <input type="range" min={0} max={180} step={1} value={th} onChange={e => setTh(+e.target.value)} /></label>
        <label className="plot-param"><span className="plot-plabel"><M>{R`k\lambda_{\rm mfp}=${s.toFixed(2)}`}</M></span>
          <input type="range" min={0.02} max={3} step={0.01} value={s} onChange={e => setS(+e.target.value)} /></label>
        <label className="plot-param"><span className="plot-plabel"><M>{R`kx_{\rm obs}=${ph.toFixed(2)}`}</M></span>
          <input type="range" min={0.5} max={span - 0.5} step={0.01} value={ph} onChange={e => setPh(+e.target.value)} /></label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        {[...Array(cols)].map((_, i) => <rect key={i} x={i * W / cols} y={0} width={W / cols + 0.6} height={H} fill={heat(Math.cos((i + 0.5) / cols * span))} />)}
        <circle cx={ox} cy={oy} r={Math.max(r, 1)} fill="none" stroke="#111" strokeWidth={1.6} />
        <circle cx={ox} cy={oy} r={4} fill="#111" />
        <line x1={src[0]} y1={src[1]} x2={ox - 6 * ux} y2={oy - 6 * uy} stroke="#1f4fbf" strokeWidth={2} markerEnd="url(#ch05arr)" />
        <circle cx={src[0]} cy={src[1]} r={4} fill="#1f4fbf" stroke="#fff" />
        <defs><marker id="ch05arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1f4fbf" /></marker></defs>
        <line x1={30} y1={H - 24} x2={110} y2={H - 24} stroke="#111" strokeWidth={2} markerEnd="url(#ch05arrk)" />
        <defs><marker id="ch05arrk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#111" /></marker></defs>
        <text x={116} y={H - 19} fontSize="15" fontStyle="italic" fontWeight="bold">k</text>
      </svg>
      <svg viewBox={`0 0 ${PW} ${PH}`} className="plot-svg">
        <rect x={pl} y={pt} width={piw} height={pih} className="plot-frame" />
        <line x1={pl} x2={pl + piw} y1={psy(0)} y2={psy(0)} className="plot-grid" />
        <line x1={pl} x2={pl + piw} y1={psy(Math.cos(ph))} y2={psy(Math.cos(ph))} stroke="#2c6e49" strokeDasharray="5 4" />
        <path d={path} fill="none" stroke="#1f1b16" strokeWidth={2} />
        <circle cx={psx(mu)} cy={psy(theta(mu)[0])} r={5} fill="#1f4fbf" />
        {[-1, -0.5, 0, 0.5, 1].map(v => <text key={v} x={psx(v)} y={PH - 12} fontSize="12" textAnchor="middle">{v}</text>)}
        {[-1, 0, 1].map(v => <text key={v} x={pl - 8} y={psy(v) + 4} fontSize="12" textAnchor="end">{v}</text>)}
        <text x={pl + piw - 4} y={PH - 12} fontSize="13" textAnchor="end">μ</text>
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <p style={{ margin: "0.3em 0" }}><TxI>{R`上图：条纹为电子温度 $\Theta_0(x)=\cos kx$（深＝热、白＝冷），黑圈是观测点的"最后散射面"（半径＝平均自由程），蓝箭头是一束沿 $\hat{\boldsymbol p}$ 到达的光子，它在蓝点处最后一次被散射。下图：该点看到的 $\Theta(\mu)=\cos(kx_{\rm obs}-k\lambda\mu)$，蓝点为当前方向，绿虚线为局域值 $\cos kx_{\rm obs}=${f3(Math.cos(ph))}$。`}</TxI></p>
        <p style={{ margin: "0.3em 0" }}><TxI>{R`多极矩 $|\Theta_l|$（按 \eqref{5.66} 数值积分）：$|\Theta_0|=${f3(amp(thl[0]))}$，$|\Theta_1|=${f3(amp(thl[1]))}$，$|\Theta_2|=${f3(amp(thl[2]))}$，$|\Theta_3|=${f3(amp(thl[3]))}$，$|\Theta_4|=${f3(amp(thl[4]))}$。`}</TxI></p>
        <p style={{ margin: "0.3em 0" }}><TxI>{R`解析值：$|\Theta_0|=|\cos kx_{\rm obs}|\,j_0(k\lambda)=${f3(Math.abs(Math.cos(ph)) * C.sphj(0, s))}$，$|\Theta_1|=|\sin kx_{\rm obs}|\,j_1(k\lambda)=${f3(Math.abs(Math.sin(ph)) * C.sphj(1, s))}$，$|\Theta_2|=|\cos kx_{\rm obs}|\,j_2(k\lambda)=${f3(Math.abs(Math.cos(ph)) * C.sphj(2, s))}$。`}</TxI></p>
      </div>
    </div>);
}

// ---------- 4. 图 5.1 交互版：各成分之间的耦合 ----------
const NODES = {
  nu: { x: 230, y: 60, label: "中微子", en: "Neutrinos" },
  de: { x: 450, y: 60, label: "暗能量", en: "Dark energy" },
  ph: { x: 110, y: 170, label: "光子", en: "Photons" },
  gr: { x: 340, y: 170, label: "引力（度规）", en: "Gravity", box: true },
  dm: { x: 570, y: 170, label: "暗物质", en: "Dark matter" },
  el: { x: 230, y: 290, label: "电子", en: "Electrons" },
  nc: { x: 450, y: 290, label: "原子核", en: "Nuclei" },
};
const LINKS = [
  { a: "nu", b: "gr", id: "g-nu" }, { a: "de", b: "gr", id: "g-de", dash: true, text: "无扰动" }, { a: "ph", b: "gr", id: "g-ph" },
  { a: "dm", b: "gr", id: "g-dm" }, { a: "el", b: "gr", id: "g-b" }, { a: "nc", b: "gr", id: "g-b" },
  { a: "ph", b: "el", id: "compton", text: "Compton 散射", strong: true }, { a: "el", b: "nc", id: "coulomb", text: "库仑散射", strong: true },
];
const INFO = {
  ph: { eqs: ["5.35", "5.67", "5.68", "5.66"], text: R`光子受引力（$\Phi'$、$ik\mu\Psi$）与 Compton 散射（$\tau'$ 项）两种作用。分布既依赖位置也依赖方向，所以要用 $\Theta(k,\mu,\eta)$ 或无穷多个多极矩 $\Theta_l$ 来描述。` },
  dm: { eqs: ["5.69", "5.70"], text: R`冷暗物质只感受引力，无碰撞且非相对论：取 Boltzmann 方程的前两个矩就得到封闭的连续性方程与 Euler 方程。` },
  el: { eqs: ["5.71", "5.72", "5.74"], text: R`电子与原子核由库仑散射紧锁为一体，统称"重子"。数守恒给出连续性方程；动量方程中多出 Compton 拖曳项 $\tau'(u_{\rm b}+3i\Theta_1)/R$。` },
  nc: { eqs: ["5.53", "5.54", "5.71", "5.72"], text: R`原子核（质子、氦核）提供重子流体几乎全部的惯性 $\rho_{\rm b}=m_p\bar n_{\rm b}$；这正是 Compton 拖曳项被 $\rho_{\rm b}$ 除的原因。` },
  nu: { eqs: ["5.65", "5.73"], text: R`中微子在核合成之后只感受引力，满足无碰撞 Boltzmann 方程；有质量时扰动 $\mathcal N$ 还依赖动量大小 $p$。` },
  de: { eqs: [], text: R`暗能量若是宇宙学常数则没有扰动；本书忽略其扰动，它只通过背景膨胀 $a(\eta)$ 进入方程。` },
  gr: { eqs: ["5.1", "5.36"], text: R`度规扰动 $\Phi$、$\Psi$ 出现在每一个 Boltzmann 方程里（引力是唯一的"公共语言"）；反过来，它们又由所有成分的扰动通过 Einstein 方程决定——那是第 6 章的任务。` },
  compton: { eqs: ["5.22", "5.60", "5.61"], text: R`Compton 散射把光子推向局域各向同性（只剩单极与偶极），并在光子与电子间交换动量（Compton 拖曳）。` },
  coulomb: { eqs: ["5.53", "5.54"], text: R`库仑散射率远大于膨胀率，把电子与原子核的过密度和速度锁成同一个值 $\delta_{\rm b}$、$u_{\rm b}$。` },
  "g-nu": { eqs: ["5.73"], text: R`中微子方程右边的 $-\Phi'-ik\mu\frac{E_\nu}{p}\Psi$ 就是引力源项。` },
  "g-ph": { eqs: ["5.35"], text: R`$\Phi'$：局域膨胀率扰动造成的红移；$ik\mu\Psi$：爬出（或落入）势阱造成的引力红移（蓝移）。` },
  "g-dm": { eqs: ["5.69", "5.70"], text: R`$-3\Phi'$：局域空间体积变化导致的稀释；$-ik\Psi$：势梯度（牛顿引力）。` },
  "g-b": { eqs: ["5.71", "5.72"], text: R`重子感受与暗物质相同的引力项。` },
  "g-de": { eqs: [], text: R`暗能量只影响背景膨胀。` },
};
export function CouplingDiagram() {
  const [sel, setSel] = useState("ph");
  const info = INFO[sel];
  const title = NODES[sel] ? `${NODES[sel].label}（${NODES[sel].en}）` : { compton: "光子 ↔ 电子：Compton 散射", coulomb: "电子 ↔ 原子核：库仑散射" }[sel] || "引力耦合";
  const isSel = l => sel === l.id || sel === l.a || sel === l.b || (sel === "gr" && l.b === "gr");
  return (
    <div className="plot card">
      <svg viewBox="0 0 680 350" className="plot-svg" style={{ cursor: "pointer" }}>
        <rect x={150} y={240} width={380} height={100} rx={18} fill="#fffbe6" stroke="#e8dfa8" />
        <text x={340} y={334} fontSize="13" textAnchor="middle" fill="#7a6a20">重子 = 电子 + 原子核</text>
        {LINKS.map((l, i) => {
          const A = NODES[l.a], B = NODES[l.b], mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
          return <g key={i} onClick={() => setSel(l.id)}>
            <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={isSel(l) ? "#c0392b" : "#888"} strokeWidth={l.strong ? 3 : isSel(l) ? 2.5 : 1.5} strokeDasharray={l.dash ? "6 5" : ""} />
            <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="transparent" strokeWidth={14} />
            {l.text && <text x={mx + (l.id === "compton" ? -62 : 0)} y={my + (l.id === "coulomb" ? -10 : 0)} fontSize="13" fontStyle="italic" textAnchor="middle" fill="#333">{l.text}</text>}
          </g>;
        })}
        {Object.entries(NODES).map(([id, n]) => <g key={id} onClick={() => setSel(id)}>
          {n.box ? <rect x={n.x - 62} y={n.y - 30} width={124} height={60} rx={8} fill={sel === id ? "#5d9be0" : "#9cc7f5"} stroke="#2c4a6e" />
            : <circle cx={n.x} cy={n.y} r={44} fill={sel === id ? "#f2b25c" : "#fcd59b"} stroke={sel === id ? "#a0521b" : "#c98a3a"} strokeWidth={sel === id ? 3 : 1.5} />}
          <text x={n.x} y={n.y - 2} fontSize="14" textAnchor="middle" fontWeight="600">{n.label}</text>
          <text x={n.x} y={n.y + 15} fontSize="11" textAnchor="middle" fill="#555">{n.en}</text>
        </g>)}
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
        <div><TxI>{info.text}</TxI></div>
        {info.eqs.length > 0 && <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 6 }}>{info.eqs.map(n => <EqChip key={n} n={n} />)}</div>}
        <div className="muted" style={{ marginTop: 6, fontSize: "0.9em" }}>点击圆圈或连线查看对应方程；点击方程可放大并逐符号解读。</div>
      </div>
    </div>);
}

// ---------- 5. 预告：紧耦合下的声学振荡（玩具模型） ----------
export function AcousticPlot() {
  return <Plot
    x={{ label: R`k\eta`, domain: [0, 30] }}
    y={{ label: R`\text{温度扰动}` }}
    params={[
      { id: "R", label: R`R`, min: 0, max: 2, step: 0.01, value: 0.6 },
      { id: "Psi", label: R`\Psi`, min: -0.3, max: 0.3, step: 0.01, value: -0.1 },
      { id: "th0", label: R`\Theta_0(0)`, min: -0.3, max: 0.3, step: 0.01, value: 0.05 },
    ]}
    series={p => {
      const rk = C.acousticRK4(30, p.R, p.Psi, p.th0, 1500).filter((_, i) => i % 50 === 0);
      return [
        { label: R`\Theta_0\ \text{解析}`, f: x => C.acousticExact(x, p.R, p.Psi, p.th0), color: "#2c4a6e" },
        { label: R`\Theta_0\ \text{RK4 数值}`, data: rk, points: true, color: "#c0392b" },
        { label: R`\Theta_0+\Psi\ \text{（观测到的有效温度）}`, f: x => C.acousticExact(x, p.R, p.Psi, p.th0) + p.Psi, color: "#2c6e49", dash: "dash" },
        { label: R`\text{平衡点}\ -(1+R)\Psi=${f3(-(1 + p.R) * p.Psi)}`, f: () => -(1 + p.R) * p.Psi, color: "#999", dash: "dot" },
        { label: R`c_s=${f3(C.cs(p.R))}`, f: () => NaN },
      ];
    }}
    vlines={p => [{ x: Math.PI / C.cs(p.R), label: R`kr_s=\pi` }, { x: 2 * Math.PI / C.cs(p.R), label: R`kr_s=2\pi` }]}
    samples={400} height={340} />;
}
