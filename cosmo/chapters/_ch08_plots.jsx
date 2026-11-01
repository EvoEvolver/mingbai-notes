// 第 8 章交互图。数值函数见 _ch08_phys.jsx（已用 node 核对：A=6.00、B=0.622 由 (8.53)–(8.54) 数值积分复现；
// 五方程组数值解与 Meszaros 匹配解在 k=10 Mpc^-1 时相差 <2%；D+/a(1)=0.785（ΩΛ=0.69）；σ8(EH98)=0.83；k_NL(z=0)=0.24 h/Mpc）。
import { useEffect, useMemo, useState } from "react";
import { Plot, M, TxI, num, renderTex } from "@kit";
import * as P from "./_ch08_phys.jsx";

const R = String.raw;
const f3 = v => (Number.isFinite(v) ? (+v).toFixed(3) : R`\text{—}`);
const sci = (v, d = 2) => { if (!Number.isFinite(v)) return R`\text{—}`; if (Math.abs(v) >= 0.01 && Math.abs(v) < 1e4) return (+v).toPrecision(d + 1); const e = Math.floor(Math.log10(Math.abs(v))); return R`${(v / 10 ** e).toFixed(d)}\times10^{${e}}`; };
const C0 = P.cosmo();                       // 基准宇宙学（含 Λ 背景）
const cache = new Map();
const mode = k => { const key = (+k).toPrecision(4); if (!cache.has(key)) cache.set(key, P.solveMode(k, { c: C0, nOut: 320 })); return cache.get(key); };
const etaA = a => P.etaOf(C0, a);
// 由 kη = 1 求 a（二分）
const aCross = k => { let lo = Math.log(1e-10), hi = 0; if (etaA(1) < 1 / k) return NaN; for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; if (etaA(Math.exp(m)) < 1 / k) lo = m; else hi = m; } return Math.exp(hi); };
const interpA = (r, arr, a) => num.interp(r.a.map(Math.log), arr, Math.log(a));
// SVG 中的公式标签
const ST = ({ x, y, w, tex, color, center, right }) => <foreignObject x={x} y={y} width={w} height={24}>
  <div style={{ fontSize: 13, lineHeight: "22px", color: color || "var(--ink)", textAlign: center ? "center" : right ? "right" : "left", whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} /></foreignObject>;
const REFK = [[0.001, "#1f1b16", ""], [0.01, "#c0392b", "dash"], [0.1, "#2c6e49", "dashdot"], [2, "#2c4a6e", ""]];

// ---------- 1. 图 8.1 / 8.6 / 8.10 交互版：Φ(k,a) ----------
export function PhiPlot({ k0 = 0.03 }) {
  return <Plot
    x={{ label: R`a`, log: true, domain: [1e-7, 1] }}
    y={{ label: R`\Phi(k,a)/\Phi(k,0)`, domain: [-0.12, 1.06] }}
    params={[{ id: "k", label: R`k\ [\mathrm{Mpc^{-1}}]`, min: 1e-4, max: 20, log: true, value: k0 }]}
    series={p => {
      const r = mode(p.k), aH = P.yHof(p.k, C0.keq) * C0.aeq, ac = aCross(p.k);
      const phiLate = interpA(r, r.phi, 0.05), T = phiLate / P.phiSuper(0.05 / C0.aeq);
      const refs = REFK.map(([k, col, dash]) => { const q = mode(k); return { label: R`k=${k}`, data: q.a.map((a, i) => [a, q.phi[i]]), color: col, dash, width: 1 }; });
      return [
        ...refs,
        { label: R`\text{数值解：}k=${sci(p.k)}\ \mathrm{Mpc^{-1}}`, data: r.a.map((a, i) => [a, r.phi[i]]), color: "#d35400", width: 3 },
        { label: R`\text{视界外解析 (8.31)}`, f: a => P.phiSuper(a / C0.aeq), color: "#7d3c98", dash: "dot", width: 1.6 },
        { label: R`\text{辐射期解析 (8.46)}`, f: a => (a < 3 * C0.aeq ? P.phiRad(p.k * etaA(a)) : NaN), color: "#16808a", dash: "dash", width: 1.6 },
        { label: R`\Phi(a{=}0.05)/\Phi(0)=${f3(phiLate)},\ T(k)\approx${f3(T)}`, f: () => NaN },
        { label: R`a(k\eta{=}1)=${sci(ac)},\ a_H=${sci(aH)}`, f: () => NaN },
      ];
    }}
    vlines={p => [{ x: C0.aeq, label: R`a_{\rm eq}` }, { x: aCross(p.k), label: R`k\eta=1` }]}
    samples={260} height={400} />;
}

// ---------- 2. 图 8.2 / 8.11 / 8.13 交互版：δ_c(k,a) 与解析近似 ----------
export function DeltaPlot({ k0 = 1 }) {
  return <Plot
    x={{ label: R`a`, log: true, domain: [1e-7, 1] }}
    y={{ label: R`|\delta_{\rm c}(k,a)|/\Phi(k,0)`, log: true, domain: [0.7, 4e5] }}
    params={[
      { id: "k", label: R`k\ [\mathrm{Mpc^{-1}}]`, min: 1e-3, max: 20, log: true, value: k0 },
      { id: "A", label: R`A`, min: 5.5, max: 7, step: 0.1, value: 6.4 },
      { id: "B", label: R`B`, min: 0.3, max: 0.8, step: 0.01, value: 0.44 },
    ]}
    series={p => {
      const r = mode(p.k), yH = P.yHof(p.k, C0.keq), ym = 3 * yH, AR = 1.5 * p.A;    // R = 3Φ(0)/2
      const [C1, C2] = P.meszarosMatch(yH, ym, p.B);
      const big = p.k > 3 * C0.keq;
      const lateNum = r.delta[r.delta.length - 1], late868 = 1.5 * AR * Math.log(4 * p.B * Math.exp(-3) / yH);
      const refs = REFK.map(([k, col, dash]) => { const q = mode(k); return { label: R`k=${k}`, data: q.a.map((a, i) => [a, Math.abs(q.delta[i])]), color: col, dash, width: 1 }; });
      return [
        ...refs,
        { label: R`\text{数值解：}k=${sci(p.k)}\ \mathrm{Mpc^{-1}}`, data: r.a.map((a, i) => [a, Math.abs(r.delta[i])]), color: "#d35400", width: 3 },
        { label: R`\text{对数解 (8.52)}`, f: a => { const v = AR * Math.log(p.B * p.k * etaA(a)); return big && a > 0.5 * yH * C0.aeq && a < 3 * C0.aeq && v > 0 ? v : NaN; }, color: "#16808a", dash: "dash", width: 1.6 },
        { label: R`\text{Meszaros 匹配 (8.64)–(8.65)，}y_m=3y_H`, f: a => { const y = a / C0.aeq; return big && y > ym && a < 0.08 ? AR * (C1 * P.Dplus(y) + C2 * P.Dminus(y)) : NaN; }, color: "#7d3c98", dash: "dot", width: 2 },
        { label: R`y_H=${sci(yH)},\ C_1/A\mathcal R=${f3(C1)},\ C_2/A\mathcal R=${f3(C2)}`, f: () => NaN },
        { label: R`\delta_{\rm c}(a{=}1)/\Phi(0)=${sci(lateNum)}`, f: () => NaN },
      ];
    }}
    vlines={p => [{ x: C0.aeq, label: R`a_{\rm eq}` }, { x: P.yHof(p.k, C0.keq) * C0.aeq, label: R`a_H` }]}
    samples={260} height={420} />;
}

// ---------- 3. 图 8.4–8.8、8.12 交互版：各近似成立的区域 ----------
const REG = {
  all: { label: "全部区域（图 8.4）" },
  sh: { label: "8.2.1 视界外（图 8.5）" },
  cp: { label: "8.2.2 物质期穿越视界（图 8.7）" },
  nd: { label: "8.3.1 辐射期穿越视界（图 8.8）" },
  sub: { label: "8.3.2 视界内、忽略辐射扰动（图 8.12）" },
};
export function RegimeDiagram({ lk0 = -1.5, reg0 = "all" }) {
  const [lk, setLk] = useState(lk0);        // log10 k [h Mpc^-1]
  const [reg, setReg] = useState(reg0);
  const h = C0.h, kh = 10 ** lk, kM = kh * h;                    // k [Mpc^-1]
  const W = 680, H = 400, m = { l: 66, r: 70, t: 14, b: 46 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  const ax = [-6, -1.5], ay = [-0.3, 3.5];                       // log10 a；log10 η [h^-1 Mpc]
  const sx = la => m.l + (la - ax[0]) / (ax[1] - ax[0]) * iw, sy = le => m.t + ih - (le - ay[0]) / (ay[1] - ay[0]) * ih;
  const etaH = a => etaA(a) * h;                                  // h^-1 Mpc
  const curve = useMemo(() => Array.from({ length: 120 }, (_, i) => { const la = ax[0] + (ax[1] - ax[0]) * i / 119; return [la, Math.log10(etaH(10 ** la))]; }), []);
  const path = pts => pts.map(([a, b], i) => `${i ? "L" : "M"}${sx(a).toFixed(1)},${sy(b).toFixed(1)}`).join("");
  const leq = Math.log10(C0.aeq), lam = Math.log10(1e-3), lar = Math.log10(2e-5);
  // 区域多边形：以 η 曲线上下偏移构造（kη≪1：η 曲线上方 ×3；kη≫1：下方 ÷3）
  const up = curve.map(([a, b]) => [a, b + 0.5]), dn = curve.map(([a, b]) => [a, b - 0.5]);
  const polyAbove = (from, to) => { const pts = up.filter(([a]) => a >= from && a <= to); return `M${sx(from)},${sy(ay[1])}` + pts.map(([a, b]) => `L${sx(a)},${sy(Math.min(b, ay[1]))}`).join("") + `L${sx(to)},${sy(ay[1])}Z`; };
  const polyBelow = (from, to) => { const pts = dn.filter(([a]) => a >= from && a <= to); return `M${sx(from)},${sy(ay[0])}` + pts.map(([a, b]) => `L${sx(a)},${sy(Math.max(b, ay[0]))}`).join("") + `L${sx(to)},${sy(ay[0])}Z`; };
  const show = id => reg === "all" || reg === id;
  const lEtaK = Math.log10(1 / kh);                                // 1/k [h^-1 Mpc]
  const across = (() => { const ac = aCross(kM); return Number.isFinite(ac) ? Math.log10(ac) : NaN; })();
  const yH = P.yHof(kM, C0.keq);
  let verdict;
  if (!Number.isFinite(across) || across > Math.log10(10 * C0.aeq)) verdict = R`这个模式在**物质主导**之后才进入视界（$a_H/a_{\rm eq}=${sci(yH)}$）：\secref{8.2.1} 的视界外解带它穿过相等，\secref{8.2.2} 证明它进入视界时 $\Phi$ 保持不变——$T(k)\approx1$。`;
  else if (across < Math.log10(C0.aeq / 10)) verdict = R`这个模式在**辐射主导深处**进入视界（$a_H/a_{\rm eq}=${sci(yH)}$）：\secref{8.3.1} 给出势的衰减振荡与暗物质的对数增长，\secref{8.3.2} 的 Meszaros 方程带它穿过相等——$T(k)\simeq12(k_{\rm eq}/k)^2\ln(0.12k/k_{\rm eq})=${f3(P.Tsmall871(kM, C0.keq))}$。`;
  else verdict = R`这个模式在**相等附近**进入视界（$a_H/a_{\rm eq}=${sci(yH)}$）：落在图中央的空白处，没有简单的解析近似，只能数值求解（物理并无不同）。`;
  return (
    <div className="plot card">
      <div className="plot-params">
        <label className="plot-param"><span className="plot-plabel"><M>{R`k=${sci(kh)}\,h\,\mathrm{Mpc^{-1}}=${sci(kM)}\,\mathrm{Mpc^{-1}}`}</M></span>
          <input type="range" min={-3.3} max={0.3} step={0.01} value={lk} onChange={e => setLk(+e.target.value)} /></label>
        <span className="seg">{Object.entries(REG).map(([id, v]) => <button key={id} className={reg === id ? "on" : ""} onClick={() => setReg(id)}>{v.label}</button>)}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <defs><clipPath id="ch08reg"><rect x={m.l} y={m.t} width={iw} height={ih} /></clipPath></defs>
        <g clipPath="url(#ch08reg)">
          {show("sh") && <path d={polyAbove(ax[0], ax[1])} fill="#9b8fe0" opacity={0.35} />}
          {show("nd") && <path d={polyBelow(ax[0], lar) + ""} fill="#e8a0a8" opacity={0.45} />}
          {show("nd") && <rect x={sx(ax[0])} y={m.t} width={sx(lar) - sx(ax[0])} height={ih} fill="#e8a0a8" opacity={0.25} />}
          {show("sub") && <path d={polyBelow(lar, ax[1])} fill="#b5b5b5" opacity={0.45} />}
          {show("cp") && <rect x={sx(lam)} y={m.t} width={sx(ax[1]) - sx(lam)} height={ih} fill="#9fdc9f" opacity={0.45} />}
          <line x1={m.l} x2={m.l + iw} y1={sy(lEtaK)} y2={sy(lEtaK)} stroke="#d35400" strokeWidth={2} strokeDasharray="6 4" />
          <path d={path(curve)} fill="none" stroke="#111" strokeWidth={2.2} />
          {Number.isFinite(across) && across <= ax[1] && <circle cx={sx(across)} cy={sy(lEtaK)} r={6} fill="#d35400" stroke="#fff" strokeWidth={1.5} />}
        </g>
        <rect x={m.l} y={m.t} width={iw} height={ih} className="plot-frame" />
        <line x1={sx(leq)} x2={sx(leq)} y1={m.t} y2={m.t + ih} stroke="#555" strokeDasharray="2 3" />
        <ST x={sx(leq) + 2} y={m.t + 2} w={50} tex={R`a_{\rm eq}`} />
        {[-6, -5, -4, -3, -2].map(v => <ST key={v} x={sx(v) - 25} y={H - 40} w={50} tex={R`10^{${v}}`} center />)}
        <ST x={m.l + iw / 2 - 20} y={H - 22} w={40} tex={R`a`} center />
        {[0, 1, 2, 3].map(v => <g key={v}><ST x={m.l - 52} y={sy(v) - 11} w={48} tex={String(10 ** v)} right />
          <ST x={m.l + iw + 4} y={sy(v) - 11} w={50} tex={String(10 ** -v)} /></g>)}
        <g transform={`translate(4,${m.t + ih / 2 + 60}) rotate(-90)`}><ST x={0} y={0} w={120} tex={R`\eta\ [h^{-1}\mathrm{Mpc}]`} center /></g>
        <g transform={`translate(${W - 24},${m.t + ih / 2 + 60}) rotate(-90)`}><ST x={0} y={0} w={120} tex={R`1/\eta\ [h\,\mathrm{Mpc^{-1}}]`} center /></g>
        {show("sh") && <ST x={sx(-5.7)} y={sy(3.25)} w={160} tex={R`\text{视界外 }k\eta\ll1`} color="#4b3f9e" />}
        {show("cp") && <ST x={sx(-2.95)} y={sy(2.05)} w={110} tex={R`\Phi\ \text{恒定}`} color="#2d6a2d" />}
        {show("nd") && <ST x={sx(-5.97)} y={sy(0.05)} w={100} tex={R`\text{忽略 }\delta`} color="#9b3040" />}
        {show("sub") && <ST x={sx(-3.7)} y={sy(0.6)} w={190} tex={R`\text{视界内；忽略 }\Theta_{\rm r}`} color="#444" />}
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <p style={{ margin: "0.3em 0" }}><TxI>{R`黑线：共动视界 $\eta(a)$（左轴，$h^{-1}\mathrm{Mpc}$；右轴为对应的 $1/\eta$）。橙色虚线：所选模式的尺度 $1/k$；橙点：$k\eta=1$ 的时刻 $a=${Number.isFinite(across) ? sci(10 ** across) : R`>1`}$。$\eta(a_{\rm eq})=${f3(etaA(C0.aeq))}\,\mathrm{Mpc}=${f3(etaH(C0.aeq))}\,h^{-1}\mathrm{Mpc}$，$k_{\rm eq}=${f3(C0.keq)}\,\mathrm{Mpc^{-1}}$。`}</TxI></p>
        <p style={{ margin: "0.3em 0" }}><TxI>{verdict}</TxI></p>
      </div>
    </div>);
}

// ---------- 4. 转移函数：五方程组数值解（只依赖 k/k_eq）与解析近似 ----------
// 数值 T 以 q = k/k_eq 为自变量算一次（异步分批，避免卡住页面），之后改变 Ω_m h² 只需平移。
let TQ = null;
function useTq() {
  const [, setV] = useState(0);
  useEffect(() => {
    if (TQ && TQ.done) return;
    if (!TQ) TQ = { q: Array.from({ length: 34 }, (_, i) => 10 ** (-1.6 + i * 3.3 / 33)), T: [], done: false };
    let alive = true;
    const step = () => {
      if (!alive) return;
      const i = TQ.T.length; if (i >= TQ.q.length) { TQ.done = true; setV(v => v + 1); return; }
      const k = TQ.q[i] * C0.keq, r = P.solveMode(k, { c: C0, a1: 0.05, nOut: 20 });
      TQ.T.push(r.phi[r.phi.length - 1] / P.phiSuper(0.05 / C0.aeq));
      setV(v => v + 1); setTimeout(step, 0);
    };
    setTimeout(step, 30);
    return () => { alive = false; };
  }, []);
  return TQ;
}
export function TransferPlot() {
  const tq = useTq();
  return <Plot
    x={{ label: R`k\ [h\,\mathrm{Mpc^{-1}}]`, log: true, domain: [1e-3, 10] }}
    y={{ label: R`T(k)`, log: true, domain: [1e-4, 1.5] }}
    params={[{ id: "omh2", label: R`\Omega_{\rm m}h^2`, min: 0.05, max: 0.3, step: 0.001, value: 0.1424 }, { id: "fb", label: R`\Omega_{\rm b}/\Omega_{\rm m}`, min: 0, max: 0.4, step: 0.01, value: 0.16 }]}
    series={p => {
      const h = C0.h, Om = p.omh2 / (h * h), keq = 0.0732 * p.omh2;           // (8.39)
      const pts = tq ? tq.T.map((T, i) => [tq.q[i] * keq / h, T]) : [];
      return [
        { label: R`\text{五方程组数值解（CDM+辐射，}${pts.length}/34\text{）}`, data: pts, points: true, color: "#d35400" },
        { label: R`\text{EH98 无重子}`, f: kh => P.ehZeroBaryon(kh * h, { h, Om }), color: "#1f1b16" },
        { label: R`\text{EH98 含重子}`, f: kh => P.ehTransfer(kh * h, { h, Om, fb: Math.max(p.fb, 1e-7) }), color: "#2c4a6e", dash: "dash" },
        { label: R`(8.71)`, f: kh => { const k = kh * h; return k > 3 * keq ? P.Tsmall871(k, keq) : NaN; }, color: "#c0392b", dash: "dot", width: 2 },
        { label: R`(8.69),\ A{=}6.0,B{=}0.62`, f: kh => { const k = kh * h; return k > 3 * keq ? P.Tsmall(k, keq, 6.0, 0.62) : NaN; }, color: "#2c6e49", dash: "dashdot", width: 1.4 },
        { label: R`k_{\rm eq}=${f3(keq)}\,\mathrm{Mpc^{-1}}=${f3(keq / h)}\,h\,\mathrm{Mpc^{-1}}`, f: () => NaN },
      ];
    }}
    vlines={p => [{ x: 0.0732 * p.omh2 / C0.h, label: R`k_{\rm eq}` }]}
    samples={220} height={400} />;
}

// ---------- 5. 图 8.3 / 8.14 交互版：线性功率谱 ----------
export function PowerPlot() {
  return <Plot
    x={{ label: R`k\ [h\,\mathrm{Mpc^{-1}}]`, log: true, domain: [1e-4, 5] }}
    y={{ label: R`P_{\rm L}(k,z)\ [(h^{-1}\mathrm{Mpc})^3]`, log: true, domain: [10, 6e4] }}
    params={[
      { id: "Om", label: R`\Omega_{\rm m}`, min: 0.1, max: 0.6, step: 0.005, value: 0.3106 },
      { id: "fb", label: R`\Omega_{\rm b}/\Omega_{\rm m}`, min: 0, max: 0.3, step: 0.01, value: 0.16 },
      { id: "ns", label: R`n_s`, min: 0.9, max: 1.05, step: 0.001, value: 0.968 },
      { id: "z", label: R`z`, min: 0, max: 3, step: 0.1, value: 0 },
    ]}
    series={p => {
      const h = C0.h, Om = p.Om, OL = 1 - Om, g = P.growth({ Om, OL }), a = 1 / (1 + p.z);
      const D = num.interp(g.a.map(Math.log), g.D, Math.log(a)), D0 = g.D[g.D.length - 1];
      const Tb = k => P.ehTransfer(k, { h, Om, fb: Math.max(p.fb, 1e-7) }), T0 = k => P.ehZeroBaryon(k, { h, Om });
      const Pk = (T, DD) => k => P.PL(k, { Om, h, ns: p.ns, D: DD, Tfun: T });
      const Pz = Pk(Tb, D), P0 = Pk(Tb, D0);
      const s8 = P.sigmaR(8 / h, P0), knl = P.kNL(Pz) / h;
      const keq = 0.0732 * Om * h * h;
      return [
        { label: R`z=${p.z.toFixed(1)}\ \text{（EH98 含重子）}`, f: kh => Pz(kh * h) * h ** 3, color: "#1f3c88", width: 2.6 },
        { label: R`\text{无重子}`, f: kh => Pk(T0, D)(kh * h) * h ** 3, color: "#7f8c8d", dash: "dash", width: 1.4 },
        { label: R`\text{基准 }z=0`, f: kh => P.PL(kh * h, { D: 0.78526, Tfun: k => P.ehTransfer(k) }) * h ** 3, color: "#c0392b", dash: "dot", width: 1.2 },
        { label: R`\sigma_8(z{=}0)=${f3(s8)},\ k_{\rm NL}(z)=${f3(knl)}\,h\,\mathrm{Mpc^{-1}},\ D_+(z)=${f3(D)}`, f: () => NaN },
        { label: R`k_{\rm eq}=${f3(keq / h)}\,h\,\mathrm{Mpc^{-1}}`, f: () => NaN },
      ];
    }}
    vlines={p => { const h = C0.h; return [{ x: 0.0732 * p.Om * h, label: R`k_{\rm eq}` }]; }}
    samples={300} height={420} />;
}

// ---------- 6. 图 8.15 / A.1 交互版：增长因子 ----------
export function GrowthPlot() {
  return <Plot
    x={{ label: R`a`, log: true, domain: [0.01, 1] }}
    y={{ label: R`D_+(a)/a`, domain: [0.5, 1.03] }}
    params={[
      { id: "OL", label: R`\Omega_{\rm de}`, min: 0, max: 0.9, step: 0.01, value: 0.69 },
      { id: "w", label: R`w`, min: -1.5, max: -0.3, step: 0.01, value: -1 },
    ]}
    series={p => {
      const pr = { Om: 1 - p.OL, OL: p.OL, w: p.w }, g = P.growth(pr), lx = g.a.map(Math.log);
      const Da = a => num.interp(lx, g.D, Math.log(a)) / a;
      const fid = P.growth({ Om: 0.31, OL: 0.69, w: -1 }), fl = fid.a.map(Math.log);
      const D1 = g.D[g.D.length - 1], f1 = g.f[g.f.length - 1];
      return [
        { label: R`\Omega_{\rm de}=0\ (D_+=a)`, f: () => 1, color: "#999", dash: "dot", width: 1.2 },
        { label: R`\text{基准 }\Omega_\Lambda=0.69,\,w=-1`, f: a => num.interp(fl, fid.D, Math.log(a)) / a, color: "#1f1b16", width: 1.2 },
        { label: R`\text{数值解 (8.75)}`, f: Da, color: "#c0392b", width: 2.6 },
        { label: R`\text{积分式 (8.77)}`, f: a => P.growthIntegral(a, pr) / a, color: "#2c4a6e", dash: "dash", width: 1.6 },
        {label:R`D_+(1)=${f3(D1)}`,f:()=>NaN},
        {label:R`f(1)=${f3(f1)}`,f:()=>NaN},
        {label:R`\Omega_{\rm m}(1)^{0.55}=${f3(P.OmegaMa(1,pr)**0.55)}`,f:()=>NaN},
      ];
    }}
    samples={160} height={380} />;
}
export function GrowthRatePlot() {
  return <Plot
    x={{ label: R`a`, log: true, domain: [0.01, 1] }}
    y={{ label: R`f(a)=d\ln D_+/d\ln a`, domain: [0.4, 1.02] }}
    params={[
      { id: "OL", label: R`\Omega_{\rm de}`, min: 0, max: 0.9, step: 0.01, value: 0.69 },
      { id: "w", label: R`w`, min: -1.5, max: -0.3, step: 0.01, value: -1 },
    ]}
    series={p => {
      const pr = { Om: 1 - p.OL, OL: p.OL, w: p.w }, g = P.growth(pr), lx = g.a.map(Math.log);
      let worst = 0; for (let i = 0; i < g.a.length; i += 10) worst = Math.max(worst, Math.abs(P.OmegaMa(g.a[i], pr) ** 0.55 / g.f[i] - 1));
      return [
        { label: R`\text{数值 } f(a)`, f: a => num.interp(lx, g.f, Math.log(a)), color: "#c0392b", width: 2.6 },
        { label: R`[\Omega_{\rm m}(a)]^{0.55}\ \text{(8.78)}`, f: a => P.OmegaMa(a, pr) ** 0.55, color: "#2c4a6e", dash: "dash", width: 1.8 },
        { label: R`\text{最大相对偏差 }${(100 * worst).toFixed(2)}\%`, f: () => NaN },
      ];
    }}
    samples={160} height={320} />;
}

// ---------- 7. 图 8.16 交互版：重子对转移函数的影响（EH98）与中微子自由流尺度 ----------
export function BaryonPlot() {
  return <Plot
    x={{ label: R`k\ [h\,\mathrm{Mpc^{-1}}]`, log: true, domain: [1e-3, 1] }}
    y={{ label: R`T(k)/T_{\Omega_{\rm b}=0}(k)`, domain: [0.4, 1.12] }}
    params={[
      { id: "fb", label: R`\Omega_{\rm b}/\Omega_{\rm m}`, min: 0.01, max: 0.4, step: 0.01, value: 0.16 },
      { id: "mnu", label: R`m_\nu\ [\mathrm{eV}]`, min: 0.02, max: 1, step: 0.01, value: 0.06 },
    ]}
    series={p => {
      const h = C0.h, Om = C0.Om, r = kh => P.ehTransfer(kh * h, { h, Om, fb: p.fb }) / P.ehZeroBaryon(kh * h, { h, Om });
      return [
        { label: R`\text{EH98：含重子 / 无重子}`, f: r, color: "#1f1b16", width: 2.4 },
        { label: R`k_{\rm fs}(a{=}1)=${f3(P.kfs(1, p.mnu))}\,h\,\mathrm{Mpc^{-1}}\ \text{(8.83)}`, f: () => NaN },
      ];
    }}
    vlines={p => [{ x: P.kfs(1, p.mnu), label: R`k_{\rm fs}` }]}
    samples={400} height={340} />;
}
