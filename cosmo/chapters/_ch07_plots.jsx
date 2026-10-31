// 第 7 章交互图。数值函数见 _ch07_phys.jsx（纯 JS，已复制为 .mjs 用 node 核对，结果如下）：
// · 背景：h=0.68，Ω_m=0.31，T0=2.7255 K + 3 代无质量中微子 ⇒ Ω_r h²=4.158e-5，Ω_Λ=1−Ω_m−Ω_r，z*=1090。
//   η*（只含物质+辐射，从 t=0 积起）= 280.4 Mpc，η0 = 14112 Mpc，χ* = η0−η* = 13831 Mpc，η0/η* = 50.3，
//   η*/χ* = 0.0203 rad = 1.16°。原书 "η*≈281 h⁻¹Mpc、η0≈14200 h⁻¹Mpc、θ≈1.2°"：数值与我们以 Mpc 为单位的结果
//   吻合（0.1% 与 0.6%），以 h⁻¹Mpc 计则为 190.7 与 9596——原书的单位记号应为 Mpc。共同因果过去的临界角 2.32°。
// · 哈勃半径：瞬时再加热，(π²/30)g*T_e⁴ = V，g*=106.75；之后熵守恒 a ∝ g*s^{-1/3}/T（g*、g*s 用阶梯表），
//   H² = H0²(Ω_m a⁻³+Ω_Λ) + (8π/3m_Pl²)(π²/30)g*T⁴；检验 H(a_e) = H_inf（相对误差 2e-16），H(1)=H0。
//   T_e=10¹⁴ GeV：原书估计 ln(T_e/T0) = 61.3（原书 "10²⁷≃e⁶²"）；完整模型给出解决视界问题所需 N_min = 57.3，
//   k_p=0.05 Mpc⁻¹ 在暴胀结束前 N_* = 51.9 个 e 倍时出视界，a = 4.63e-5 时再进入。
//   V^{1/4}=1.6e16 GeV：T_e = 6.6e15 GeV，H_inf = 6.1e13 GeV，N_* = 56.1，N_min = 61.5。
// · 慢滚：m²φ²，N=60：φ = 3.103 m_Pl（解析 √(242)M），ε_sr = 1/121，δ_sr = 0，n_s = 0.9669，r = 0.132；
//   N=50：n_s = 0.9604，r = 0.158。Starobinsky，N=60：φ = 1.088 m_Pl，n_s = 0.9678，r = 0.0030
//   （数值 N 与解析 (3/4)(e^y−y)|_{y_e} 一致到 1e-10；粗略公式 1−2/N = 0.9667、12/N² = 0.0033）。
// · 模式函数 (7.40)：数值二阶差分验证 v''+(k²−2/η²)v = 0（残差 ~1e-8，受差分截断限制）；q/q_∞ = e^{−ix}(1+ix)，
//   x=−1e-4 时 = 1.000000005，|q/q_∞| = √(1+x²)。
// · 功率谱：A_s = H²/(π m_Pl² ε_sr) ⇒ V^{1/4} = [(3/8)A_s ε_sr]^{1/4} m_Pl；r=0.06 ⇒ V^{1/4} = 1.60e16 GeV，H = 6.07e13 GeV。
import { useMemo, useState } from "react";
import { Plot, M, TxI, renderTex } from "@kit";
import * as C from "./_ch07_phys.jsx";

const R = String.raw;
const INK = "#1f1b16", RED = "#c0392b", BLUE = "#2c4a6e", GREEN = "#2c6e49", GOLD = "#b8862b", VIOLET = "#7d3c98", TEAL = "#16808a";
const fx = (v, d = 2) => (+v).toFixed(d);
// 科学计数法 → TeX
const sci = (v, d = 2) => {
  if (!Number.isFinite(v)) return "\\text{—}";
  if (v === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(v))), mm = v / 10 ** e;
  if (Math.abs(e) <= 2) return String(+v.toPrecision(d + 1));
  return +mm.toFixed(d) === 10 ? "10^{" + (e + 1) + "}" : mm.toFixed(d) + "\\times10^{" + e + "}";
};

// ---------- 通用：SVG 中的 KaTeX 标签与坐标轴 ----------
function T({ tex, x, y, w = 160, h = 24, align = "left", color, size }) {
  const dx = align === "center" ? -w / 2 : align === "right" ? -w : 0;
  return <foreignObject x={x + dx} y={y - h / 2} width={w} height={h} style={{ overflow: "visible", pointerEvents: "none" }}>
    <div className="plot-tex" style={{ textAlign: align, color, fontSize: size, whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} /></foreignObject>;
}
function niceTicks(lo, hi, n = 6) {
  const span = hi - lo, step0 = Math.pow(10, Math.floor(Math.log10(span / n))), err = span / n / step0;
  const step = step0 * (err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1), out = [];
  for (let k = Math.ceil(lo / step - 1e-9); k * step <= hi + step * 1e-9; k++) out.push(+(k * step).toPrecision(12));
  return out;
}
function logTicks(lo, hi, maxN = 9) {
  const a = Math.ceil(Math.log10(lo) - 1e-9), b = Math.floor(Math.log10(hi) + 1e-9), stride = Math.max(1, Math.ceil((b - a) / maxN)), out = [];
  for (let e = Math.ceil(a / stride) * stride; e <= b; e += stride) out.push(e);
  return out;
}
// 返回 {sx, sy, frame}；frame 为坐标框、网格、刻度与轴标签
function useAxes({ W, H, m, x, y }) {
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const nx = v => (x.log ? Math.log(v / x.domain[0]) / Math.log(x.domain[1] / x.domain[0]) : (v - x.domain[0]) / (x.domain[1] - x.domain[0]));
  const ny = v => (y.log ? Math.log(v / y.domain[0]) / Math.log(y.domain[1] / y.domain[0]) : (v - y.domain[0]) / (y.domain[1] - y.domain[0]));
  const sx = v => m.l + nx(v) * iw, sy = v => m.t + ih - ny(v) * ih;
  const xt = x.log ? logTicks(...x.domain, x.maxTicks).map(e => [10 ** e, R`10^{${e}}`]) : (x.ticks || niceTicks(...x.domain)).map(v => [v, x.fmt ? x.fmt(v) : String(v)]);
  const yt = y.log ? logTicks(...y.domain, y.maxTicks).map(e => [10 ** e, e === 0 ? "1" : R`10^{${e}}`]) : (y.ticks || niceTicks(...y.domain)).map(v => [v, y.fmt ? y.fmt(v) : String(v)]);
  const frame = <g>
    {xt.map(([v, s]) => <g key={"x" + v}><line x1={sx(v)} x2={sx(v)} y1={m.t} y2={m.t + ih} className="plot-grid" /><T tex={s} x={sx(v)} y={m.t + ih + 14} w={60} align="center" /></g>)}
    {!y.noTicks && yt.map(([v, s]) => <g key={"y" + v}><line x1={m.l} x2={m.l + iw} y1={sy(v)} y2={sy(v)} className="plot-grid" /><T tex={s} x={m.l - 6} y={sy(v)} w={60} align="right" /></g>)}
    <rect x={m.l} y={m.t} width={iw} height={ih} className="plot-frame" />
    <T tex={x.label} x={m.l + iw / 2} y={H - 12} w={iw} align="center" size={15} />
    <g transform={`translate(${y.labelX ?? 14}, ${m.t + ih / 2}) rotate(-90)`}><T tex={y.label} x={0} y={0} w={ih} align="center" size={15} /></g>
  </g>;
  return { sx, sy, iw, ih, frame };
}
const pathOf = pts => pts.filter(p => Number.isFinite(p[0]) && Number.isFinite(p[1])).map(([a, b], i) => `${i ? "L" : "M"}${a.toFixed(1)},${b.toFixed(1)}`).join("");
const Slider = ({ tex, min, max, step, value, set }) => <label className="plot-param"><span className="plot-plabel"><M>{tex}</M></span>
  <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(+e.target.value)} /></label>;
const Btn = ({ on, children, onClick }) => <button className="plot-reset" style={on ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" } : null} onClick={onClick}>{children}</button>;
const Note = ({ children }) => <p style={{ margin: "0.3em 0" }}><TxI>{children}</TxI></p>;

// =====================================================================
// 1. 图 7.1 交互版：视界问题的 η–x 图
// =====================================================================
const HN = C.horizonNumbers();
export function HorizonLightcone() {
  const [dEta, setDEta] = useState(0);         // 暴胀额外贡献的共形时间 Δη，以 η* 为单位
  const [real, setReal] = useState(false);     // 真实比例 η0/η* ≈ 50 或示意比例 3
  const [th, setTh] = useState(2);             // 局部图中两点的张角（度）
  // ---- 全局图（两点在天空中正相对，θ = 180°） ----
  const e0 = real ? HN.ratio : 3, chi = e0 - 1, eff = 1 + dEta;           // 以 η* 为单位
  const W = 680, H = 340, m = { l: 20, r: 20, t: 30, b: 40 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  const xspan = 2 * (chi + eff), yspan = e0 + dEta, s = Math.min(iw / xspan, ih / yspan);
  const X = v => m.l + iw / 2 + v * s, Y = v => m.t + ih - (v + dEta) * s - (ih - yspan * s) / 2;
  const overlapG = eff > chi, directG = eff > 2 * chi;
  const cone = (xc, fill) => <polygon points={`${X(xc)},${Y(1)} ${X(xc - eff)},${Y(-dEta)} ${X(xc + eff)},${Y(-dEta)}`} fill={fill} fillOpacity={0.35} stroke="#777" strokeDasharray="4 3" />;
  // ---- 局部图（真实数值，任意张角）：两点连线所在的竖直平面 ----
  const eS = HN.etaS, chiS = HN.chiS, E = eS * eff, D = 2 * chiS * Math.sin(th * Math.PI / 360), dperp = chiS * Math.cos(th * Math.PI / 360);
  const W2 = 680, H2 = 250, m2 = { l: 20, r: 20, t: 30, b: 30 }, iw2 = W2 - m2.l - m2.r, ih2 = H2 - m2.t - m2.b;
  const xs2 = 2 * (D / 2 + E) * 1.04, ys2 = E + 0.12 * eS, s2 = Math.min(iw2 / xs2, ih2 / ys2);
  const X2 = v => m2.l + iw2 / 2 + v * s2, Y2 = v => m2.t + ih2 - (v + E - eS) * s2 - (ih2 - ys2 * s2) / 2;
  const hyper = useMemo(() => { const n = 200, L = (iw2 / 2) / s2; return [...Array(n + 1)].map((_, i) => { const xx = -L + 2 * L * i / n; return [X2(xx), Y2(HN.eta0 - Math.hypot(xx, dperp))]; }); }, [th, dEta]);
  const direct = D < E, common = D < 2 * E;
  const th1 = 2 * Math.asin(Math.min(1, E / (2 * chiS))) * 180 / Math.PI, th2 = 2 * Math.asin(Math.min(1, E / chiS)) * 180 / Math.PI;
  const cone2 = (xc, fill) => <polygon points={`${X2(xc)},${Y2(eS)} ${X2(xc - E)},${Y2(eS - E)} ${X2(xc + E)},${Y2(eS - E)}`} fill={fill} fillOpacity={0.35} stroke="#777" strokeDasharray="4 3" />;
  return (
    <div className="plot card">
      <div className="plot-params">
        <Slider tex={R`\Delta\eta/\eta_*=${fx(dEta, 1)}`} min={0} max={100} step={0.5} value={dEta} set={setDEta} />
        <Btn on={!real} onClick={() => setReal(false)}>示意比例（如原书）</Btn>
        <Btn on={real} onClick={() => setReal(true)}>真实比例</Btn>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        {dEta > 0 && <rect x={m.l} y={Y(0)} width={iw} height={Y(-dEta) - Y(0)} fill="#efe6d4" />}
        {dEta > 0 && <T tex={R`\text{暴胀}\ (\eta<0)`} x={m.l + 6} y={Y(-dEta / 2)} w={160} color="#6b6257" />}
        <line x1={m.l} x2={m.l + iw} y1={Y(e0)} y2={Y(e0)} stroke={INK} />
        <line x1={m.l} x2={m.l + iw} y1={Y(0)} y2={Y(0)} stroke={INK} />
        {dEta > 0 && <line x1={m.l} x2={m.l + iw} y1={Y(-dEta)} y2={Y(-dEta)} stroke={INK} strokeDasharray="2 3" />}
        {cone(-chi, "#e8a33d")}{cone(chi, "#5d8fc9")}
        <line x1={m.l} x2={m.l + iw} y1={Y(1)} y2={Y(1)} stroke="#e07b22" strokeWidth={2.5} strokeDasharray="2 2" />
        <polyline points={`${X(-chi)},${Y(1)} ${X(0)},${Y(e0)} ${X(chi)},${Y(1)}`} fill="none" stroke={INK} strokeWidth={1.6} />
        <circle cx={X(0)} cy={Y(e0)} r={5} fill="#6aaee8" stroke={INK} />
        <circle cx={X(-chi)} cy={Y(1)} r={3.5} fill={INK} /><circle cx={X(chi)} cy={Y(1)} r={3.5} fill={INK} />
        <T tex={R`\eta=\eta_0`} x={m.l + iw} y={Y(e0) - 11} w={90} align="right" />
        <T tex={R`\eta=\eta_*`} x={m.l + iw} y={Y(1) - 11} w={90} align="right" />
        {Y(0) - Y(1) > 24 && <T tex={R`\eta=0`} x={m.l + iw} y={Y(0) - 11} w={90} align="right" />}
        {dEta > 0 && <T tex={R`\eta=-\Delta\eta`} x={m.l + iw} y={Y(-dEta) - 11} w={120} align="right" />}
        <T tex={R`\boldsymbol x_{*,1}`} x={X(-chi)} y={Y(1) - 13} w={40} align="center" />
        <T tex={R`\boldsymbol x_{*,2}`} x={X(chi)} y={Y(1) - 13} w={40} align="center" />
        <text x={X(0)} y={Y(e0) - 10} fontSize="13" textAnchor="middle">我们</text>
        <T tex={R`\text{横轴：共动坐标}\ x\ \text{（两点在天空中正相对）；纵轴：共形时间}\ \eta\text{；光沿}\ 45^\circ\ \text{线传播}`} x={m.l + iw / 2} y={H - 12} w={iw} align="center" color="#6b6257" />
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <Note>{R`当前比例 $\eta_0/\eta_*=${fx(e0, 1)}$，最后散射面距离 $\chi_*=${fx(chi, 1)}\,\eta_*$。两点的过去光锥（阴影）${overlapG ? R`**已重叠**：它们有共同的因果过去` : R`**不重叠**：没有任何共同的因果过去`}${directG ? R`，而且彼此可以直接通信` : ""}。在此比例下需要 $\Delta\eta>\chi_*-\eta_*=${fx(chi - 1, 1)}\,\eta_*$ 才能重叠，即暴胀须提供与 $\eta_0$ 同量级的额外共形时间。`}</Note>
      </div>
      <div className="plot-params" style={{ marginTop: 10 }}>
        <Slider tex={R`\text{张角}\ \theta=${fx(th, 2)}^\circ`} min={0.2} max={8} step={0.02} value={th} set={setTh} />
      </div>
      <svg viewBox={`0 0 ${W2} ${H2}`} className="plot-svg">
        {dEta > 0 && <rect x={m2.l} y={Y2(0)} width={iw2} height={Math.max(0, Y2(eS - E) - Y2(0))} fill="#efe6d4" />}
        <line x1={m2.l} x2={m2.l + iw2} y1={Y2(0)} y2={Y2(0)} stroke={INK} />
        {cone2(-D / 2, "#e8a33d")}{cone2(D / 2, "#5d8fc9")}
        <line x1={m2.l} x2={m2.l + iw2} y1={Y2(eS)} y2={Y2(eS)} stroke="#e07b22" strokeWidth={2.5} strokeDasharray="2 2" />
        <path d={pathOf(hyper)} fill="none" stroke={INK} strokeWidth={1.4} />
        <circle cx={X2(-D / 2)} cy={Y2(eS)} r={3.5} fill={INK} /><circle cx={X2(D / 2)} cy={Y2(eS)} r={3.5} fill={INK} />
        <line x1={X2(-D / 2)} x2={X2(D / 2)} y1={m2.t - 12} y2={m2.t - 12} stroke={INK} />
        <T tex={R`\chi_*\theta\approx${fx(D, 0)}\ \mathrm{Mpc}`} x={X2(0)} y={m2.t - 22} w={200} align="center" />
        <line x1={X2(D / 2 + E) - E * s2} x2={X2(D / 2 + E)} y1={Y2(eS - E) + 12} y2={Y2(eS - E) + 12} stroke={INK} />
        <T tex={R`\eta_*+\Delta\eta`} x={X2(D / 2 + E) - E * s2 / 2} y={Y2(eS - E) + 22} w={120} align="center" />
        <text x={m2.l + 4} y={Y2(eS) - 6} fontSize="12" fill="#a0521b">最后散射面</text>
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <Note>{R`局部放大（真实数值）：剖面取在两点连线所在的竖直平面上；黑色曲线是我们的过去光锥与该平面的交线（双曲线 $\eta=\eta_0-\sqrt{x^2+d^2}$，$\theta=180^\circ$ 时退化为上图的两条斜线）。`}</Note>
        <Note>{R`$\eta_*=${fx(eS, 1)}\ \mathrm{Mpc}$，$\eta_0=${fx(HN.eta0, 0)}\ \mathrm{Mpc}$，$\chi_*=${fx(chiS, 0)}\ \mathrm{Mpc}$（$h=0.68$，$\Omega_m=0.31$，$z_*=1090$）。两点间距 $${fx(D, 0)}\ \mathrm{Mpc}$，因果半径 $\eta_*+\Delta\eta=${fx(E, 0)}\ \mathrm{Mpc}$：${direct ? R`**可以直接通信**` : common ? R`不能直接通信，但**有共同的因果过去**` : R`**从未有过因果联系**`}。`}</Note>
        <Note>{R`临界角：直接通信 $\theta<${fx(th1, 2)}^\circ$，共同因果过去 $\theta<${fx(th2, 2)}^\circ$。$\Delta\eta=0$ 时前者即 \eqref{7.2} 的 $\eta_*/(\eta_0-\eta_*)=${fx(HN.thetaDeg, 2)}^\circ\approx1.2^\circ$。`}</Note>
      </div>
    </div>);
}

// =====================================================================
// 2. 图 7.2 交互版：共动哈勃半径
// =====================================================================
const P0 = HN.p, KMIN = P0.H0, KMAX = 1;     // 可观测尺度：k 从今天的 H0（c/H0 ≈ 4400 Mpc）到 1 Mpc^{-1}
export function HubbleRadiusPlot() {
  const LG_BOOK = Math.log10(Math.pow(Math.PI ** 2 / 30 * C.GSTAR_RH, 0.25) * 1e14);   // 使 T_e = 1e14 GeV
  const [lgV, setLgV] = useState(16);
  const [N, setN] = useState(65);
  const inf = useMemo(() => C.inflation(10 ** lgV, P0), [lgV]);
  const mc = useMemo(() => C.modeCrossing(C.KP, inf, P0), [inf]);
  const aIn1 = useMemo(() => C.modeCrossing(KMAX, inf, P0).aEnter, [inf]);
  const ai = inf.ae * Math.exp(-N), Nmin = C.NminHorizon(inf, P0), ok = N >= Nmin;
  const W = 680, H = 400, m = { l: 74, r: 16, t: 14, b: 50 };
  const { sx, sy, iw, ih, frame } = useAxes({ W, H, m, x: { domain: [1e-70, 10], log: true, label: R`a`, maxTicks: 7.1 }, y: { domain: [1e-26, 1e12], log: true, label: R`(aH)^{-1}\ [\mathrm{Mpc}]`, maxTicks: 10 } });
  const curve = useMemo(() => {
    const pts = [], u0 = Math.log(ai), u1 = Math.log(10), n = 500;
    for (let i = 0; i <= n; i++) { const a = Math.exp(u0 + (u1 - u0) * i / n); pts.push([sx(a), sy(C.hubbleRadius(a, inf, P0))]); }
    pts.splice(pts.findIndex(p => p[0] > sx(inf.ae)), 0, [sx(inf.ae), sy(1 / inf.aeHe)]);
    return pathOf(pts);
  }, [inf, ai]);
  const cid = "ch07hr";
  const yk = 1 / C.KP;
  return (
    <div className="plot card">
      <div className="plot-params">
        <Slider tex={R`V^{1/4}=${sci(10 ** lgV, 1)}\ \mathrm{GeV}`} min={10} max={16.5} step={0.01} value={lgV} set={setLgV} />
        <Slider tex={R`N_{\rm tot}=${fx(N, 0)}`} min={35} max={90} step={1} value={N} set={setN} />
        <Btn onClick={() => setLgV(LG_BOOK)}>原书估计 <M>{R`T_e=10^{14}\ \mathrm{GeV}`}</M></Btn>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <defs><clipPath id={cid}><rect x={m.l} y={m.t} width={iw} height={ih} /></clipPath></defs>
        {frame}
        <g clipPath={`url(#${cid})`}>
          <rect x={m.l} y={sy(1 / KMIN)} width={iw} height={sy(1 / KMAX) - sy(1 / KMIN)} fill="#c9c2b4" opacity={0.55} />
          <line x1={m.l} x2={m.l + iw} y1={sy(yk)} y2={sy(yk)} stroke={RED} strokeDasharray="6 4" />
          <line x1={sx(inf.ae)} x2={sx(inf.ae)} y1={m.t} y2={m.t + ih} stroke={INK} strokeDasharray="2 3" />
          <line x1={sx(ai)} x2={sx(ai)} y1={m.t} y2={m.t + ih} stroke={ok ? GREEN : RED} strokeDasharray="2 3" />
          <path d={curve} fill="none" stroke={BLUE} strokeWidth={2.4} />
          <circle cx={sx(mc.aExit)} cy={sy(yk)} r={5} fill={RED} stroke="#fff" />
          <circle cx={sx(mc.aEnter)} cy={sy(yk)} r={5} fill={RED} stroke="#fff" />
          <circle cx={sx(1)} cy={sy(1 / P0.H0)} r={4} fill={INK} />
        </g>
        <text x={sx(1e-30)} y={sy(Math.sqrt(1 / KMIN)) - 10} fontSize="12" textAnchor="middle">CMB 与大尺度结构的尺度</text>
        <T tex={R`k_p^{-1}`} x={sx(mc.aExit) + 8} y={sy(yk) - 12} w={50} color={RED} />
        <T tex={R`a_e`} x={sx(inf.ae) + 4} y={m.t + ih - 14} w={40} />
        <T tex={R`a_i`} x={sx(ai) + 4} y={m.t + 14} w={40} color={ok ? GREEN : RED} />
        <text x={(sx(ai) + sx(inf.ae)) / 2} y={sy(1e-14)} fontSize="13" textAnchor="middle" fill={BLUE}>暴胀</text>
        <text x={(sx(inf.ae) + sx(3e-5)) / 2 + 20} y={sy(1e-14)} fontSize="13" textAnchor="middle" fill={BLUE}>辐射主导</text>
        <text x={sx(1)} y={sy(1 / P0.H0) - 30} fontSize="12" textAnchor="end" fill="#6b6257">今天</text>
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <Note>{R`暴胀能标 $V^{1/4}=${sci(10 ** lgV)}\ \mathrm{GeV}$ ⇒ $H_{\rm inf}=\sqrt{8\pi V/3}/m_{\rm Pl}=${sci(inf.HinfGeV)}\ \mathrm{GeV}$；瞬时再加热温度 $T_e=${sci(inf.Te)}\ \mathrm{GeV}$，$a_e=${sci(inf.ae)}$，暴胀结束时的共动哈勃半径 $1/(a_eH_e)=${sci(1 / inf.aeHe)}\ \mathrm{Mpc}$。`}</Note>
        <Note>{R`主元尺度 $k_p=0.05\ \mathrm{Mpc^{-1}}$（红点）在暴胀结束前 $N_*=${fx(mc.Nstar, 1)}$ 个 e 倍时离开视界，在 $a=${sci(mc.aEnter)}$ 时重新进入${N < mc.Nstar ? R`（当前 $N_{\rm tot}<N_*$：这个尺度在暴胀开始时就已在视界外，从未被暴胀"拉出"视界）` : ""}；$k=1\ \mathrm{Mpc^{-1}}$ 在 $a=${sci(aIn1)}$ 时进入。`}</Note>
        <Note>{R`解决视界问题需要 $1/(a_iH_{\rm inf})>1/(a_0H_0)=${fx(1 / P0.H0, 0)}\ \mathrm{Mpc}$，即 $N_{\rm tot}>N_{\rm min}=\ln\frac{a_eH_{\rm inf}}{a_0H_0}=${fx(Nmin, 1)}$。当前 $N_{\rm tot}=${N}$：${ok ? R`**已解决**（暴胀开始时共动哈勃半径为 $${sci(Math.exp(N) / inf.aeHe)}\ \mathrm{Mpc}$）` : R`**未解决**——今天能看到的最大尺度在暴胀开始时就已在视界之外`}。原书的粗估（全程辐射主导、忽略 $g_*$）$N\simeq\ln(T_e/T_0)=${fx(C.NbookEstimate(inf.Te), 1)}$ 偏大约 4 个 e 倍，差别来自物质主导时期与 $g_*$（\exref{7.3}）。`}</Note>
        <Note>{R`假设：暴胀期间 $H=H_{\rm inf}$ 严格不变；瞬时再加热 $(\pi^2/30)g_*T_e^4=V$，$g_*=106.75$；此后熵守恒（$g_{*s}$ 由 106.75 降到今天的 3.91）；今天 $T_0=2.7255\ \mathrm K$，$h=0.68$，$\Omega_m=0.31$。阴影带：$1\ \mathrm{Mpc}<k^{-1}<c/H_0$。`}</Note>
      </div>
    </div>);
}

// =====================================================================
// 3. 图 7.5 交互版：慢滚势能、慢滚参数与 (n_s, r) 平面
// =====================================================================
const MODELS = {
  quad: { name: R`$V=\tfrac12m^2\phi^2$`, dom: [-1, 4], phi0: 3.1 },
  staro: { name: "Starobinsky 势", dom: [-0.12, 1.4], phi0: 1.09 },
};
export function SlowRollPlot() {
  const [model, setModel] = useState("quad");
  const [phi, setPhi] = useState(MODELS.quad.phi0);    // 以 m_Pl 为单位
  const Mo = MODELS[model], P = C.POTENTIALS[model];
  const pre = useMemo(() => {
    const xe = C.phiEnd(model), x50 = C.phiAtN(model, 50), x60 = C.phiAtN(model, 60);
    const track = (mod) => [...Array(41)].map((_, i) => { const n = 40 + i; const s = C.slowRoll(mod, C.phiAtN(mod, n)); return [s.ns, s.r, n]; });
    return { xe, x50, x60, tracks: { quad: track("quad"), staro: track("staro") } };
  }, [model]);
  const x = phi * C.SQRT8PI, sr = C.slowRoll(model, x), Nleft = C.efoldsLeft(model, x), inflating = sr.eps < 1;
  // V(φ) 图
  const W = 680, H = 280, m = { l: 40, r: 16, t: 12, b: 48 };
  const Vmax = Math.max(...[...Array(101)].map((_, i) => P.V((Mo.dom[0] + (Mo.dom[1] - Mo.dom[0]) * i / 100) * C.SQRT8PI)));
  const A = useAxes({ W, H, m, x: { domain: Mo.dom, label: R`\phi/m_{\rm Pl}` }, y: { domain: [0, 1.12], noTicks: true, label: R`V(\phi)\ \text{（任意单位）}`, labelX: 14 } });
  const vpath = pathOf([...Array(301)].map((_, i) => { const p = Mo.dom[0] + (Mo.dom[1] - Mo.dom[0]) * i / 300; return [A.sx(p), A.sy(P.V(p * C.SQRT8PI) / Vmax)]; }));
  const pe = pre.xe / C.SQRT8PI, ball = [A.sx(phi), A.sy(P.V(x) / Vmax)];
  const slope = P.dV(x);   // 只用其符号决定箭头（下坡）方向
  // (n_s, r) 平面
  const W2 = 680, H2 = 260, m2 = { l: 74, r: 16, t: 12, b: 48 };
  const B = useAxes({ W: W2, H: H2, m: m2, x: { domain: [0.94, 1.0], label: R`n_s`, ticks: [0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 1] }, y: { domain: [1e-3, 0.4], log: true, label: R`r` } });
  const cl = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  return (
    <div className="plot card">
      <div className="plot-params">
        <Btn on={model === "quad"} onClick={() => { setModel("quad"); setPhi(MODELS.quad.phi0); }}><M>{R`\tfrac12 m^2\phi^2`}</M></Btn>
        <Btn on={model === "staro"} onClick={() => { setModel("staro"); setPhi(MODELS.staro.phi0); }}>Starobinsky</Btn>
        <Slider tex={R`\phi/m_{\rm Pl}=${fx(phi, 3)}`} min={model === "quad" ? 0.05 : 0.02} max={Mo.dom[1]} step={0.001} value={phi} set={setPhi} />
        <Btn onClick={() => setPhi(pre.x50 / C.SQRT8PI)}><M>{R`N=50`}</M></Btn>
        <Btn onClick={() => setPhi(pre.x60 / C.SQRT8PI)}><M>{R`N=60`}</M></Btn>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <defs><clipPath id="ch07sr"><rect x={m.l} y={m.t} width={A.iw} height={A.ih} /></clipPath></defs>
        <rect x={A.sx(Math.max(Mo.dom[0], -pe))} y={m.t} width={A.sx(pe) - A.sx(Math.max(Mo.dom[0], -pe))} height={A.ih} fill="#f3d9d2" opacity={0.6} />
        {A.frame}
        <g clipPath="url(#ch07sr)">
          <path d={vpath} fill="none" stroke={INK} strokeWidth={2.2} />
          {[[pre.x60, "N=60"], [pre.x50, "N=50"]].map(([xx, l]) => <g key={l}><line x1={A.sx(xx / C.SQRT8PI)} x2={A.sx(xx / C.SQRT8PI)} y1={m.t} y2={m.t + A.ih} stroke={GREEN} strokeDasharray="3 4" /></g>)}
          <line x1={ball[0]} y1={ball[1] - 8} x2={ball[0] - Math.sign(slope) * 34} y2={ball[1] - 8} stroke="#888" strokeWidth={1.6} markerEnd="url(#ch07arr)" />
          <circle cx={ball[0]} cy={ball[1] - 8} r={7} fill="#2a7ab9" stroke="#fff" />
        </g>
        <defs><marker id="ch07arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#888" /></marker></defs>
        <T tex={R`N=60`} x={A.sx(pre.x60 / C.SQRT8PI) + 3} y={m.t + A.ih - 12} w={60} color={GREEN} />
        <T tex={R`N=50`} x={A.sx(pre.x50 / C.SQRT8PI) - 3} y={m.t + A.ih - 12} w={60} align="right" color={GREEN} />
        <text x={A.sx(pe) - 4} y={m.t + A.ih - 8} fontSize="12" textAnchor="end" fill="#a0521b">暴胀结束</text>
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <Note>{R`${model === "quad" ? R`$V=\tfrac12m^2\phi^2$` : R`Starobinsky 势 $V=V_0\big(1-e^{-\sqrt{2/3}\,\phi/M}\big)^2$，$M\equiv m_{\rm Pl}/\sqrt{8\pi}$ 为约化普朗克质量`}。慢滚近似（$3H\dot\phi\simeq-V_{,\phi}$，$H^2\simeq8\pi V/3m_{\rm Pl}^2$）下：$\epsilon_{\rm sr}=\frac{m_{\rm Pl}^2}{16\pi}\big(\frac{V_{,\phi}}{V}\big)^2=${sci(sr.eps, 3)}$，$\delta_{\rm sr}=\epsilon_{\rm sr}-\frac{m_{\rm Pl}^2}{8\pi}\frac{V_{,\phi\phi}}{V}=${sci(sr.delta, 3)}$。`}</Note>
        <Note>{inflating ? R`距暴胀结束（$\epsilon_{\rm sr}=1$，$\phi_e=${fx(pe, 3)}\,m_{\rm Pl}$）还剩 $N=\frac{8\pi}{m_{\rm Pl}^2}\int_{\phi_e}^{\phi}\frac{V}{V_{,\phi}}d\phi=${fx(Nleft, 1)}$ 个 e 倍。若主元尺度在此刻离开视界：$n_s=1-4\epsilon_{\rm sr}-2\delta_{\rm sr}=${fx(sr.ns, 4)}$，$r=16\epsilon_{\rm sr}=${sr.r < 0.01 ? fx(sr.r, 4) : fx(sr.r, 3)}$。` : R`$\epsilon_{\rm sr}=${fx(sr.eps, 2)}>1$：此处已不再暴胀（阴影区），场将滚到极小值附近振荡并再加热。`}</Note>
      </div>
      <svg viewBox={`0 0 ${W2} ${H2}`} className="plot-svg">
        <defs><clipPath id="ch07nsr"><rect x={m2.l} y={m2.t} width={B.iw} height={B.ih} /></clipPath></defs>
        <rect x={B.sx(0.9649 - 0.0042)} y={m2.t} width={B.sx(0.9649 + 0.0042) - B.sx(0.9649 - 0.0042)} height={B.sy(1e-3) - m2.t} fill="#cfe0ef" opacity={0.7} />
        {B.frame}
        <g clipPath="url(#ch07nsr)">
          <rect x={m2.l} y={m2.t} width={B.iw} height={B.sy(0.036) - m2.t} fill="#999" opacity={0.18} />
          <line x1={m2.l} x2={m2.l + B.iw} y1={B.sy(0.036)} y2={B.sy(0.036)} stroke="#777" strokeDasharray="5 4" />
          {["quad", "staro"].map(mod => <g key={mod}>
            <path d={pathOf(pre.tracks[mod].map(([a, b]) => [B.sx(a), B.sy(b)]))} fill="none" stroke={mod === "quad" ? RED : BLUE} strokeWidth={mod === model ? 3 : 1.5} opacity={mod === model ? 1 : 0.6} />
            {pre.tracks[mod].filter(t => t[2] === 50 || t[2] === 60).map(([a, b, n]) => <g key={n}><circle cx={B.sx(a)} cy={B.sy(b)} r={3.5} fill={mod === "quad" ? RED : BLUE} />
              <T tex={R`${n}`} x={B.sx(a) + 5} y={B.sy(b) + (mod === "quad" ? -10 : 10)} w={30} size={11} /></g>)}
          </g>)}
          {inflating && <circle cx={B.sx(cl(sr.ns, 0.9, 1.05))} cy={B.sy(cl(sr.r, 1e-4, 10))} r={6} fill="none" stroke={model === "quad" ? RED : BLUE} strokeWidth={2.2} />}
        </g>
        <T tex={R`\text{BICEP/Keck 2021：}r<0.036\ (95\%)`} x={m2.l + B.iw - 6} y={B.sy(0.036) - 12} w={300} align="right" color="#555" size={12} />
        <text x={B.sx(0.9649) + 0} y={m2.t + B.ih - 8} fontSize="12" textAnchor="middle" fill={BLUE}>Planck 2018（68%）</text>
      </svg>
      <div className="plot-legend">
        <span><svg width="28" height="10"><line x1="0" x2="28" y1="5" y2="5" stroke={RED} strokeWidth="2.5" /></svg><M>{R`\tfrac12m^2\phi^2`}</M></span>
        <span><svg width="28" height="10"><line x1="0" x2="28" y1="5" y2="5" stroke={BLUE} strokeWidth="2.5" /></svg>Starobinsky</span>
        <span style={{ color: "var(--muted)" }}><TxI>{R`曲线：$N=40$–$80$（点标出 $N=50,60$）；空心圈：滑块当前位置`}</TxI></span>
      </div>
    </div>);
}

// =====================================================================
// 4. §7.3：de Sitter 模式函数与张量振幅的冻结
// =====================================================================
// 横轴 N ≡ ln(a/a_k) = −ln(−kη)：模式离开视界（k|η|=1）后经过的 e 倍数（时间向右流逝）
const xOfN = N => -Math.exp(-N);
export function ModeFunctionPlot() {
  return <div>
    <Plot
      x={{ label: R`N\equiv\ln(a/a_k)=-\ln(-k\eta)\quad(\text{时间}\rightarrow)`, domain: [-3, 5] }}
      y={{ label: R`\text{模}`, log: true, domain: [4e-3, 300] }}
      series={() => [
        { label: R`|\sqrt{2k}\,v|\ \text{de Sitter}`, f: N => Math.hypot(...C.vdS(xOfN(N))), color: BLUE },
        { label: R`|h/h_\infty|\ \text{de Sitter}`, f: N => Math.hypot(...C.frozenRatio(xOfN(N))), color: RED },
        { label: R`|\sqrt{2k}\,v|\ \text{Minkowski}`, f: () => 1, color: BLUE, dash: "dash" },
        { label: R`|h/h_\infty|\ \text{Minkowski}`, f: N => Math.hypot(...C.minkRatio(xOfN(N))), color: RED, dash: "dash" },
      ]}
      vlines={[{ x: 0, label: R`k|\eta|=1` }]}
      samples={400} height={330}
      caption={R`实线：\eqref{7.40} 的 $v=\frac{e^{-ik\eta}}{\sqrt{2k}}\big(1-\frac{i}{k\eta}\big)$；虚线：Minkowski 解 $v=e^{-ik\eta}/\sqrt{2k}$（去掉 $-2/\eta^2$ 项）。$h\propto v/a\propto(-k\eta)\,v$，按冻结值 $h_\infty$ 归一。视界内两者一样：$|v|$ 不变、$|h|\propto1/a$ 衰减；穿出视界后 de Sitter 的 $|v|\propto a$ 增长，使 $h$ **冻结**，而 Minkowski 解的 $h$ 继续衰减到零。`} />
    <Plot
      x={{ label: R`N\equiv\ln(a/a_k)=-\ln(-k\eta)`, domain: [-1.85, 4] }}
      y={{ label: R`\mathrm{Re}\,(h/h_\infty)`, domain: [-6.8, 6.8] }}
      series={() => [
        { label: R`\text{de Sitter：}\cos k\eta+k\eta\sin k\eta`, f: N => C.frozenRatio(xOfN(N))[0], color: RED },
        { label: R`\pm|h/h_\infty|=\pm\sqrt{1+k^2\eta^2}`, f: N => Math.hypot(...C.frozenRatio(xOfN(N))), color: "#999", dash: "dot" },
        { label: "", f: N => -Math.hypot(...C.frozenRatio(xOfN(N))), color: "#999", dash: "dot" },
        { label: R`\text{Minkowski：}k\eta\sin k\eta`, f: N => C.minkRatio(xOfN(N))[0], color: RED, dash: "dash" },
      ]}
      vlines={[{ x: 0, label: R`k|\eta|=1` }]}
      samples={400} height={300}
      caption={R`同一模式的实部（相位取为冻结值为实数）：视界内振荡、振幅 $\propto1/a$；$k|\eta|\lesssim1$ 后停在 1。两条曲线恰好相差 $\cos k\eta$——正是这一项在视界外趋于常数。`} />
  </div>;
}

// =====================================================================
// 5. 图 7.6 交互版：ℛ 在暴胀中冻结，暴胀后保持不变
// =====================================================================
export function CurvatureFreezePlot() {
  return <div>
    <Plot
      x={{ label: R`\ln(a/a_{k_1})\quad(\text{时间}\rightarrow)`, domain: [-3.5, 7] }}
      y={{ label: R`|\mathcal R_k|/\mathcal R_\infty`, log: true, domain: [0.03, 60] }}
      params={[{ id: "s", label: R`k_2/k_1`, min: 1, max: 300, value: 30, log: true }]}
      series={p => [
        { label: R`|\mathrm{Re}\,\mathcal R_{k_1}|`, f: N => Math.abs(C.frozenRatio(xOfN(N))[0]), color: RED, width: 1.6 },
        { label: R`|\mathcal R_{k_1}|`, f: N => Math.hypot(...C.frozenRatio(xOfN(N))), color: RED, dash: "dash" },
        { label: R`|\mathrm{Re}\,\mathcal R_{k_2}|`, f: N => (p.s * Math.exp(-N) > 55 ? NaN : Math.abs(C.frozenRatio(p.s * xOfN(N))[0])), color: BLUE, width: 1.6 },
        { label: R`|\mathcal R_{k_2}|`, f: N => (p.s * Math.exp(-N) > 55 ? NaN : Math.hypot(...C.frozenRatio(p.s * xOfN(N)))), color: BLUE, dash: "dash" },
      ]}
      vlines={p => [{ x: 0, label: R`k_1|\eta|=1` }, { x: Math.log(p.s), label: R`k_2|\eta|=1` }]}
      samples={900} height={330}
      caption={R`暴胀期间（$H$ 近似不变）$\mathcal R\propto v/a$ 与张量模式满足同一方程，按冻结值归一后 $\mathcal R_k/\mathcal R_\infty=e^{-ik\eta}(1+ik\eta)$。对数纵轴上的尖谷是实部的零点：模式在视界内振荡、振幅 $\propto1/a$，在 $k\eta\simeq-1$ 冻结。较短波长 $k_2$ 晚 $\ln(k_2/k_1)$ 个 e 倍离开视界，冻结值与 $k_1$ 相同（$H$ 不变时近似尺度不变）。注意：原书图 7.6 左图是示意图，其振荡振幅随时间增大；按 Bunch–Davies 初态 \eqref{7.40}，振幅实际按 $1/a$ 减小。`} />
    <Plot
      x={{ label: R`H_{\rm inf}\,\eta\ \ (\text{示意})`, domain: [-500, 500] }}
      y={{ label: R`\text{扰动（以}\ \mathcal R\ \text{为单位）}`, domain: [-0.05, 1.25] }}
      series={() => {
        const s = e => 0.5 * (1 + Math.tanh(e / 70));
        return [
          { label: R`\mathcal R`, f: () => 1, color: INK },
          { label: R`\frac{ik_i\delta T^i{}_0a^2H}{k^2(\rho+P)}=\mathcal R+\Psi`, f: e => 1 - 2 / 3 * s(e), color: GREEN, dash: "dashdot" },
          { label: R`-\Psi=\Phi`, f: e => 2 / 3 * s(e), color: RED, dash: "dash" },
        ];
      }}
      vlines={[{ x: -200, label: R`\text{再加热开始}` }, { x: 200, label: R`\text{辐射主导}` }]}
      samples={300} height={280}
      caption={R`暴胀结束后（示意）：\eqref{7.57} 的两项在再加热期间（两条竖线之间）如何交换取决于微观模型，这里只用平滑台阶示意；但超视界的 $\mathcal R$ 始终不变，进入辐射主导后 $\mathcal R=-\tfrac32\Psi$，即 $\Phi=-\Psi=\tfrac23\mathcal R$，第一项降为 $\tfrac13\mathcal R$。`} />
  </div>;
}

// =====================================================================
// 6. §7.6：原初标量与张量功率谱
// =====================================================================
export function PrimordialSpectrumPlot() {
  return <Plot
    x={{ label: R`k\ [\mathrm{Mpc^{-1}}]`, log: true, domain: [1e-4, 10] }}
    y={{ label: R`\Delta^2(k)`, log: true, domain: [1e-12, 1e-8] }}
    params={[
      { id: "eps", label: R`\epsilon_{\rm sr}`, min: 1e-4, max: 0.06, value: 0.00375, log: true },
      { id: "del", label: R`\delta_{\rm sr}`, min: -0.03, max: 0.05, step: 0.0005, value: 0.0100 },
    ]}
    series={p => {
      const s = C.primordial(p.eps, p.del);
      return [
        { label: R`\Delta^2_{\mathcal R}=A_s(k/k_p)^{n_s-1}`, f: s.D2R, color: RED },
        { label: R`\Delta^2_T=rA_s(k/k_p)^{n_T}`, f: s.D2T, color: BLUE },
        { label: R`A_s=2.1\times10^{-9}\ (\text{无倾斜})`, f: () => C.AS, color: "#999", dash: "dot" },
        { label: R`n_s=${fx(s.ns, 4)},\ r=${s.r < 0.01 ? fx(s.r, 4) : fx(s.r, 3)},\ n_T=${fx(s.nT, 4)}`, f: () => NaN, color: "transparent" },
        { label: R`H_{\rm inf}=${sci(s.HGeV)}\ \mathrm{GeV},\ V^{1/4}=${sci(s.V14)}\ \mathrm{GeV}`, f: () => NaN, color: "transparent" },
      ];
    }}
    vlines={[{ x: C.KP, label: R`k_p` }]}
    samples={200} height={360}
    caption={R`无量纲功率谱 $\Delta^2(k)\equiv k^3P(k)/2\pi^2$。$n_s=1-4\epsilon_{\rm sr}-2\delta_{\rm sr}$ \eqref{7.110}，$r=16\epsilon_{\rm sr}$ \eqref{7.104}，$n_T=-2\epsilon_{\rm sr}$ \eqref{7.108}；$k_p=0.05\ \mathrm{Mpc^{-1}}$。由 \eqref{7.99} 在 $k_p$ 处 $A_s=H^2/(\pi m_{\rm Pl}^2\epsilon_{\rm sr})$ 反推 $H_{\rm inf}$，再由 $V\simeq3H^2m_{\rm Pl}^2/8\pi$ 得暴胀能标（例如 $r=0.06$ 对应 $V^{1/4}\approx1.6\times10^{16}\ \mathrm{GeV}$）。默认值 $n_s\approx0.965$。`} />;
}
