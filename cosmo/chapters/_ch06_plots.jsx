// 第 6 章交互图。数值函数见 _ch06_phys.jsx（已用 node 核对：纯辐射/纯物质宇宙中张量模数值解与 j0、3j1/x 的最大偏差 < 1e-5；
// 基准宇宙学 k/H0 = 1000 的模式在 H0η ≈ 0.0045 处取最小值 −0.21，k/H0 = 100 在 0.046 处取 −0.17，与原书图 6.2 一致）。
import { useEffect, useMemo, useRef, useState } from "react";
import { Plot, M, TxI, renderTex } from "@kit";
import * as P from "./_ch06_phys.jsx";

const R = String.raw;
const f3 = v => (+v).toFixed(3);
const f2 = v => (+v).toFixed(2);
// SVG 中的 KaTeX 标签
const T = ({ tex, x, y, w = 80, h = 24, align = "center", size }) => (
  <foreignObject x={x - (align === "center" ? w / 2 : align === "right" ? w : 0)} y={y - h / 2} width={w} height={h}>
    <div style={{ textAlign: align, fontSize: size || 14, lineHeight: `${h}px`, whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} />
  </foreignObject>);

// ---------- 1. 图 6.1 交互版：引力波对一圈测试粒子的形变 ----------
// 固有间距 ds² = a²(δ_ij + h_ij)dx^i dx^j ⇒ 位于共动坐标 x_j 的粒子到中心的固有位移为 x_i + ½ h_ij x_j（一阶）。
// 线偏振：h_+ = h cos2ψ，h_× = h sin2ψ，h = A sin(相位)。ψ = 0 为纯 +，ψ = 45° 为纯 ×。
function ringPts(hp, hx, N = 48) {
  return [...Array(N)].map((_, i) => { const t = 2 * Math.PI * i / N, x = Math.cos(t), y = Math.sin(t); return [x + 0.5 * (hp * x + hx * y), y + 0.5 * (hx * x - hp * y)]; });
}
function Ring({ cx, cy, r, hp, hx, dots = false, color = "#9b1c1c" }) {
  const pts = ringPts(hp, hx, dots ? 24 : 96);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${(cx + r * x).toFixed(1)},${(cy - r * y).toFixed(1)}`).join("") + "Z";
  return <g>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="#888" strokeDasharray="3 3" />
    {dots ? pts.map(([x, y], i) => <circle key={i} cx={cx + r * x} cy={cy - r * y} r={3.2} fill={color} />) : <path d={d} fill="none" stroke={color} strokeWidth={2} />}
  </g>;
}
export function GWRing() {
  const [ph, setPh] = useState(Math.PI / 2);   // 波的相位 kη（模 2π）
  const [psi, setPsi] = useState(0);           // 偏振角（度）
  const [A, setA] = useState(0.4);             // 振幅（为可见而夸大）
  const [play, setPlay] = useState(false);
  const raf = useRef(0);
  useEffect(() => {
    if (!play) return;
    let last = performance.now();
    const tick = t => { setPh(p => (p + (t - last) / 1000 * 1.6) % (2 * Math.PI)); last = t; raf.current = requestAnimationFrame(tick); };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [play]);
  const s = Math.sin(ph), rad = psi * Math.PI / 180;
  const hp = A * Math.cos(2 * rad) * s, hx = A * Math.sin(2 * rad) * s;
  const W = 680, H = 470;
  // 上方：一个周期的振幅曲线
  const wx0 = 60, ww = 560, wy = 70, wa = 40;
  const wave = [...Array(121)].map((_, i) => { const p = 2 * Math.PI * i / 120; return `${i ? "L" : "M"}${(wx0 + ww * i / 120).toFixed(1)},${(wy - wa * Math.sin(p)).toFixed(1)}`; }).join("");
  const snaps = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2];
  return (
    <div className="plot card">
      <div className="plot-params">
        <label className="plot-param"><span className="plot-plabel"><M>{R`\text{相位 }k\eta=${f2(ph)}`}</M></span>
          <input type="range" min={0} max={6.283} step={0.01} value={ph} onChange={e => { setPlay(false); setPh(+e.target.value); }} /></label>
        <label className="plot-param"><span className="plot-plabel"><M>{R`\text{偏振角 }\psi=${psi}^\circ`}</M></span>
          <input type="range" min={0} max={90} step={1} value={psi} onChange={e => setPsi(+e.target.value)} /></label>
        <label className="plot-param"><span className="plot-plabel"><M>{R`\text{振幅（夸大）}=${f2(A)}`}</M></span>
          <input type="range" min={0.05} max={0.6} step={0.01} value={A} onChange={e => setA(+e.target.value)} /></label>
        <button className="plot-reset" onClick={() => setPlay(!play)}>{play ? "暂停" : "播放"}</button>
        <button className="plot-reset" onClick={() => { setPsi(0); setPlay(false); }}>纯 <M>{R`+`}</M></button>
        <button className="plot-reset" onClick={() => { setPsi(45); setPlay(false); }}>纯 <M>{R`\times`}</M></button>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <text x={wx0} y={18} fontSize="13">引力波振幅（一个周期，忽略周期内的膨胀阻尼）</text>
        <line x1={wx0} x2={wx0 + ww} y1={wy} y2={wy} stroke="#999" strokeDasharray="2 3" />
        <path d={wave} fill="none" stroke="#9b1c1c" strokeWidth={2} />
        <circle cx={wx0 + ww * ph / (2 * Math.PI)} cy={wy - wa * s} r={6} fill="#2c4a6e" />
        {snaps.map((p, i) => <line key={i} x1={wx0 + ww * p / (2 * Math.PI)} x2={wx0 + ww * p / (2 * Math.PI)} y1={wy - 46} y2={wy + 46} stroke="#ccc" />)}
        <T tex={R`h(\eta)`} x={30} y={wy} w={50} />
        {/* 左：当前形变（粒子环） */}
        <text x={20} y={150} fontSize="13">当前形变（24 个测试粒子，虚线为未扰动的圆）</text>
        <Ring cx={150} cy={300} r={105} hp={hp} hx={hx} dots />
        <line x1={150} y1={300} x2={150 + 105 * (1 + hp / 2)} y2={300} stroke="#2c4a6e" strokeWidth={1.2} />
        <line x1={150} y1={300} x2={150} y2={300 - 105 * (1 - hp / 2)} stroke="#2c6e49" strokeWidth={1.2} />
        <T tex={R`x`} x={275} y={300} w={20} /><T tex={R`y`} x={150} y={180} w={20} />
        <circle cx={150} cy={300} r={3} fill="#111" />
        <T tex={R`\boldsymbol k\ \text{指出纸面}`} x={150} y={430} w={160} />
        {/* 右：原书图 6.1 的四个时刻 */}
        <text x={330} y={150} fontSize="13">原书图 6.1：一个周期内的四个时刻</text>
        <T tex={R`h_+`} x={330} y={190} w={30} /><T tex={R`h_\times`} x={330} y={330} w={30} />
        {snaps.map((p, i) => <g key={i}>
          <Ring cx={395 + i * 78} cy={225} r={30} hp={A * Math.sin(p)} hx={0} />
          <Ring cx={395 + i * 78} cy={365} r={30} hp={0} hx={A * Math.sin(p)} />
          <T tex={[R`k\eta=0`, R`\pi/2`, R`\pi`, R`3\pi/2`][i]} x={395 + i * 78} y={420} w={70} size={12} />
        </g>)}
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <p style={{ margin: "0.3em 0" }}><TxI>{R`当前 $h_+=${f3(hp)}$，$h_\times=${f3(hx)}$。按 $ds^2=a^2(\delta_{ij}+h_{ij})dx^idx^j$，共动坐标固定在 $(1,0)$ 的粒子离中心的固有距离为 $1+h_+/2=${f3(1 + hp / 2)}$（蓝线），在 $(0,1)$ 的为 $1-h_+/2=${f3(1 - hp / 2)}$（绿线）；沿对角线 $(1,1)/\sqrt2$ 为 $1+h_\times/2=${f3(1 + hx / 2)}$。面积一阶不变（$h^{\rm TT}_{ij}$ 无迹），沿 $\boldsymbol k$ 方向不形变（横向）。`}</TxI></p>
        <p style={{ margin: "0.3em 0" }}><TxI>{R`偏振角 $\psi$ 表示线偏振方向：$h_+=h\cos2\psi$、$h_\times=h\sin2\psi$；$\psi=45^\circ$ 时得到纯 $\times$ 图样——它正是 $+$ 图样绕 $\boldsymbol k$ 转 $45^\circ$。真实振幅极小：LIGO 测到的 $h\sim10^{-21}$，宇宙学引力波更小。`}</TxI></p>
      </div>
    </div>);
}

// 张量模缓存（同一宇宙学与 k 只算一次）
const CACHE = new Map();
function mode(k, c) {
  const key = k + "|" + c.Om;
  if (!CACHE.has(key)) { if (CACHE.size > 60) CACHE.clear(); const r = P.tensorMode(k, c, { aEnd: 50, etaEnd: 4 }); CACHE.set(key, x => P.interp(r.eta, r.h, x)); }
  return CACHE.get(key);
}

// ---------- 2. 图 6.2 交互版：张量模随共形时间的演化 ----------
// 数值解 (6.73)，平直 ΛCDM（h = 0.7，Ω_r h² = 4.15e-5）。原书图的横轴延伸到 H0η ≈ 4（今天 η0 ≈ 3.24/H0 之后）。
export function TensorModePlot() {
  return <Plot
    x={{ label: R`H_0\eta`, log: true, domain: [5e-5, 4] }}
    y={{ label: R`h_t(k,\eta)/h_t(k,0)`, domain: [-0.3, 1.1] }}
    params={[
      { id: "k", label: R`k/H_0`, min: 0.3, max: 3000, value: 30, log: true },
      { id: "Om", label: R`\Omega_{\rm m}`, min: 0.05, max: 1, step: 0.01, value: 0.3 },
      { id: "ref", label: R`\text{解析解对照（0 关 / 1 开）}`, min: 0, max: 1, step: 1, value: 1 },
    ]}
    series={p => {
      const c = P.cosmo(Math.min(p.Om, 0.9999));
      const book = [1, 10, 100, 1000].map(k => ({ k, f: mode(k, c) }));
      const fk = mode(p.k, c);
      const out = [
        { label: R`k/H_0=1`, f: book[0].f, color: "#1f4fbf", width: 1.4 },
        { label: R`10`, f: book[1].f, color: "#2c8a3c", dash: "dash", width: 1.4 },
        { label: R`100`, f: book[2].f, color: "#d02a1e", width: 1.4 },
        { label: R`1000`, f: book[3].f, color: "#1f1b16", dash: "dash", width: 1.4 },
        { label: R`k/H_0=${+p.k.toPrecision(3)}\ \text{（滑块）}`, f: fk, color: "#b8862b", width: 3 },
      ];
      if (p.ref > 0.5) out.push(
        { label: R`j_0(k\eta)\ \text{(RD)}`, f: x => P.hRD(p.k * x), color: "#7d3c98", dash: "dot", width: 1.6 },
        { label: R`3j_1(k\eta)/k\eta\ \text{(MD)}`, f: x => P.hMD(p.k * x), color: "#16808a", dash: "dashdot", width: 1.6 });
      return out;
    }}
    vlines={p => { const c = P.cosmo(Math.min(p.Om, 0.9999)); return [{ x: 1 / p.k, label: R`k\eta=1` }, { x: P.eta0(c), label: R`\eta_0` }]; }}
    samples={1400} height={400}
    caption={R`实线/虚线：原书四个模式 $k/H_0=1,10,100,1000$（同原书配色与线型）；粗金线：滑块选定的 $k$。紫色点线与青色点划线分别为纯辐射主导解 $j_0(k\eta)$ 与纯物质主导解 $3j_1(k\eta)/k\eta$（习题 6.12）：$k/H_0\gtrsim100$ 的模式在辐射时期进入视界，曲线贴着 $j_0$；$k/H_0\lesssim10$ 的模式在物质时期进入，形状接近 $3j_1/x$，但相位与振幅因 $\eta$ 的零点含辐射时期而略有偏移。悬停读数。`} />;
}

// ---------- 3. 规范变换：同一个物理模式在不同规范中的 A, B, D, E ----------
const GLIST = [["newton", "共形牛顿"], ["flat", "空间平坦"], ["sync", "同步"]];
export function GaugeBars() {
  const [z, setZ] = useState(0), [x, setX] = useState(0), [keta, setK] = useState(2);
  const g = P.gaugeMD(1, z, x, keta);
  const bars = [
    [R`\hat A`, g.A], [R`k\hat B`, g.kB], [R`\hat D`, g.D], [R`k^2\hat E`, g.k2E], [R`\Phi_A`, g.PhiA], [R`\Phi_H`, g.PhiH],
  ];
  const W = 680, H = 300, m = { l: 60, r: 20, t: 20, b: 50 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  const lim = Math.max(3, ...bars.map(b => Math.abs(b[1]))) * 1.05;
  const sy = v => m.t + ih / 2 - v / lim * ih / 2, bw = iw / bars.length;
  const active = GLIST.find(([id]) => Math.abs(P.GAUGES[id].z - z) < 1e-9 && Math.abs(P.GAUGES[id].x - x) < 1e-9)?.[1];
  return (
    <div className="plot card">
      <div className="plot-params">
        {GLIST.map(([id, name]) => <button key={id} className="plot-reset" style={active === name ? { fontWeight: 700, borderColor: "#9b2c1f" } : {}} onClick={() => { setZ(P.GAUGES[id].z); setX(P.GAUGES[id].x); }}>{name}规范</button>)}
        <label className="plot-param"><span className="plot-plabel"><M>{R`\zeta=z\,a\eta\Psi,\ z=${f3(z)}`}</M></span>
          <input type="range" min={-1} max={1} step={0.001} value={z} onChange={e => setZ(+e.target.value)} /></label>
        <label className="plot-param"><span className="plot-plabel"><M>{R`\xi=x\,\eta^2\Psi,\ x=${f3(x)}`}</M></span>
          <input type="range" min={-0.5} max={0.5} step={0.001} value={x} onChange={e => setX(+e.target.value)} /></label>
        <label className="plot-param"><span className="plot-plabel"><M>{R`k\eta=${f2(keta)}`}</M></span>
          <input type="range" min={0.1} max={4} step={0.01} value={keta} onChange={e => setK(+e.target.value)} /></label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <rect x={m.l} y={m.t} width={iw} height={ih} className="plot-frame" />
        <line x1={m.l} x2={m.l + iw} y1={sy(0)} y2={sy(0)} stroke="#555" />
        {[-2, -1, 1, 2].filter(v => Math.abs(v) < lim).map(v => <g key={v}><line x1={m.l} x2={m.l + iw} y1={sy(v)} y2={sy(v)} className="plot-grid" /><T tex={String(v)} x={m.l - 8} y={sy(v)} w={40} align="right" size={12} /></g>)}
        <T tex="0" x={m.l - 8} y={sy(0)} w={40} align="right" size={12} />
        <line x1={m.l + 4 * bw} x2={m.l + 4 * bw} y1={m.t} y2={m.t + ih} stroke="#bbb" strokeDasharray="4 3" />
        {bars.map(([lab, v], i) => <g key={i}>
          <rect x={m.l + i * bw + bw * 0.22} width={bw * 0.56} y={Math.min(sy(0), sy(v))} height={Math.max(1, Math.abs(sy(v) - sy(0)))} fill={i < 4 ? "#2c4a6e" : "#9b2c1f"} opacity={0.85} />
          <T tex={lab} x={m.l + (i + 0.5) * bw} y={H - 30} w={bw} />
          <T tex={f3(v)} x={m.l + (i + 0.5) * bw} y={v >= 0 ? sy(v) - 12 : sy(v) + 12} w={bw} size={12} />
        </g>)}
        <text x={m.l + 2 * bw} y={H - 6} fontSize="12" textAnchor="middle">度规扰动（随规范而变）</text>
        <text x={m.l + 5 * bw} y={H - 6} fontSize="12" textAnchor="middle">Bardeen 不变量</text>
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <p style={{ margin: "0.3em 0" }}><TxI>{R`物理状态固定：物质主导宇宙（$a\propto\eta^2$，$a'/a=2/\eta$）中的一个超视界标量模式，在共形牛顿规范中 $\Psi=1$、$\Phi=-1$、$B=E=0$（单位 $\Psi$）。滑块给出坐标变换 $\zeta=z\,a\eta$、$\xi=x\,\eta^2$，按 \eqref{6.17}–\eqref{6.18} 得 $\hat A=1-3z$、$k\hat B=k\eta(2x-z)$、$\hat D=-1-2z$、$k^2\hat E=(k\eta)^2x$。`}</TxI></p>
        <p style={{ margin: "0.3em 0" }}><TxI>{R`无论怎样拖动，按 \eqref{6.19} 算出的 $\Phi_A=${f3(g.PhiA)}$、$\Phi_H=${f3(g.PhiH)}$ 始终等于 $\Psi$ 与 $-\Phi$。三个按钮：**共形牛顿**（$B=E=0$）；**空间平坦**（$D=E=0$，需 $z=-\tfrac12$，此时 $\hat A=\tfrac52\Psi$）；**同步**（$A=B=0$，需 $z=\tfrac13$、$x=\tfrac16$，此时 $\hat D=-\tfrac53\Psi$，$k^2\hat E=(k\eta)^2\Psi/6$ 随时间增长）。`}</TxI></p>
      </div>
    </div>);
}

// ---------- 4. 自由度计数：h_{μν} 的 10 个分量（k 沿 z）----------
const CELLS = {      // [行, 列] -> [内容, 类型]
  "0,0": [R`-2A`, "S"], "0,1": [R`-B_x`, "V"], "0,2": [R`-B_y`, "V"], "0,3": [R`-ikB`, "S"],
  "1,1": [R`2D+h_+`, "ST"], "1,2": [R`h_\times`, "T"], "1,3": [R`ikV_x`, "V"],
  "2,2": [R`2D-h_+`, "ST"], "2,3": [R`ikV_y`, "V"],
  "3,3": [R`2D+2k^2E`, "S"],
};
const COL = { S: "#2c4a6e", V: "#2c6e49", T: "#9b2c1f" };
const STEPS = [
  { id: "all", label: R`全部 10 个`, show: { S: 1, V: 1, T: 1 } },
  { id: "S", label: R`标量 $A,B,D,E$`, show: { S: 1 } },
  { id: "V", label: R`矢量 $B_i,V_i$`, show: { V: 1 } },
  { id: "T", label: R`张量 $h_+,h_\times$`, show: { T: 1 } },
  { id: "gauge", label: R`共形牛顿规范后`, show: { S: 1, V: 1, T: 1 }, gauge: true },
];
export function DofMatrix() {
  const [st, setSt] = useState(0);
  const s = STEPS[st];
  const W = 680, H = 330, c0 = 70, r0 = 40, cw = 110, rh = 62;
  const lab = ["0", "x", "y", "z"];
  const hidden = (key, type) => s.gauge && ["0,3", "3,3", "1,3", "2,3"].includes(key);
  return (
    <div className="plot card">
      <div className="plot-params">
        {STEPS.map((x, i) => <button key={x.id} className="plot-reset" style={i === st ? { fontWeight: 700, borderColor: "#9b2c1f" } : {}} onClick={() => setSt(i)}><TxI>{x.label}</TxI></button>)}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        {lab.map((l, i) => <g key={i}><T tex={l} x={c0 + (i + 0.5) * cw} y={r0 - 16} w={40} /><T tex={l} x={c0 - 20} y={r0 + (i + 0.5) * rh} w={40} /></g>)}
        {[0, 1, 2, 3].map(i => [0, 1, 2, 3].map(j => {
          const key = i <= j ? `${i},${j}` : `${j},${i}`, [tex, type] = CELLS[key];
          const on = type.split("").some(t => s.show[t]) && !hidden(key, type), mirror = i > j;
          const col = type === "ST" ? (s.show.T && !s.show.S ? COL.T : COL.S) : COL[type];
          return <g key={`${i}${j}`}>
            <rect x={c0 + j * cw + 3} y={r0 + i * rh + 3} width={cw - 6} height={rh - 6} rx={6} fill={on ? col : "#eee"} opacity={on ? (mirror ? 0.35 : 0.85) : 1} />
            <foreignObject x={c0 + j * cw} y={r0 + i * rh + rh / 2 - 14} width={cw} height={28}>
              <div style={{ textAlign: "center", color: on ? "#fff" : "#aaa", fontSize: 15, lineHeight: "28px" }} dangerouslySetInnerHTML={{ __html: renderTex(hidden(key, type) ? (key === "3,3" ? R`2D` : "0") : (type === "ST" && s.show.T && !s.show.S ? tex.replace("2D", "") : type === "ST" && s.show.S && !s.show.T ? "2D" : tex)) }} />
            </foreignObject>
          </g>;
        }))}
        <T tex={R`h_{\mu\nu}\ (\boldsymbol k=k\hat{\boldsymbol e}_z)`} x={c0 + 2 * cw} y={H - 14} w={300} />
        {[["S", "标量 4"], ["V", "矢量 2+2"], ["T", "张量 2"]].map(([t, n], i) => <g key={t}><rect x={540} y={60 + i * 34} width={18} height={18} fill={COL[t]} /><text x={566} y={74 + i * 34} fontSize="13">{n}</text></g>)}
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <p style={{ margin: "0.3em 0" }}><TxI>{R`取 $\boldsymbol k$ 沿 $z$ 轴，\eqref{6.1}、\eqref{6.4}、\eqref{6.6} 给出 $h_{\mu\nu}$ 的 10 个独立分量（下三角为对称镜像）：标量 $A$、$B$、$D$、$E$ 占 4 个，横向矢量 $B_x,B_y$ 与 $V_x,V_y$ 占 4 个（$B_z=V_z=0$ 是横向条件），张量 $h_+$、$h_\times$ 占 2 个。对角线上三个分量由 $D$、$E$、$h_+$ 三个函数共同决定：$h_{xx}+h_{yy}$ 与 $h_{zz}$ 给出 $D$、$E$，$h_{xx}-h_{yy}$ 给出 $h_+$。`}</TxI></p>
        <p style={{ margin: "0.3em 0" }}><TxI>{R`**${s.gauge ? "规范固定" : "计数"}**：${s.gauge ? R`坐标变换的 4 个函数（$\zeta$、$\xi$、横向 $\xi^i$ 两个）可令 $B=E=0$、$V_i=0$（灰色）。剩下 $A=\Psi$、$D=\Phi$、$B_x$、$B_y$、$h_+$、$h_\times$：$10-4=6$，标量、矢量、张量各 2 个。` : R`$4+4+2=10$。`}`}</TxI></p>
      </div>
    </div>);
}

// ---------- 5. 习题 6.13：引力波转移函数（振幅之比） ----------
// T_env(k) = 数值解在 η0 处的振幅 √(h² + (h'/k)²) / 物质主导解的振幅；对照 Turner, White & Lidsey (1993) 的拟合
// T² ≈ 1 + 1.34 (k/k_eq) + 2.50 (k/k_eq)²（无 Λ），k_eq = 0.073 Ω_m h² Mpc⁻¹（此处以 H0 为单位）。
function tEnv(k, c) {
  const r = P.tensorMode(k, c), n = r.eta.length, e0 = r.eta0;
  const h = r.h[n - 1], hp = (r.h[n - 1] - r.h[n - 2]) / (r.eta[n - 1] - r.eta[n - 2]);
  const x = k * e0, dx = 1e-6, m = P.hMD(x), mp = (P.hMD(x + dx) - P.hMD(x - dx)) / (2 * dx) * k;
  return { env: Math.hypot(h, hp / k) / Math.hypot(m, mp / k), point: h / m };
}
export function TransferPlot() {
  return <Plot
    x={{ label: R`k/H_0`, log: true, domain: [0.1, 1000] }}
    y={{ label: R`T(k,\eta_0)`, log: true, domain: [0.5, 60] }}
    params={[{ id: "Om", label: R`\Omega_{\rm m}`, min: 0.1, max: 1, step: 0.01, value: 0.3 }]}
    series={p => {
      const c = P.cosmo(Math.min(p.Om, 0.9999)), keq = 0.073 * p.Om * 0.49 * 2997.9 / 0.7;
      const ks = [...Array(41)].map((_, i) => 0.1 * Math.pow(10, 4 * i / 40));
      const pts = ks.map(k => [k, tEnv(k, c).env]);
      return [
        { label: R`\text{数值解（振幅比）}`, data: pts, points: false, color: "#9b2c1f" },
        { label: R`\text{TWL 拟合（无}\ \Lambda)`, f: k => Math.sqrt(1 + 1.34 * k / keq + 2.5 * (k / keq) ** 2), color: "#2c4a6e", dash: "dash" },
      ];
    }}
    vlines={p => [{ x: 0.073 * p.Om * 0.49 * 2997.9 / 0.7, label: R`k_{\rm eq}` }]}
    samples={200} height={340} />;
}
