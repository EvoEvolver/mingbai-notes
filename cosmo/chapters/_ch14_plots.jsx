// 第 14 章交互图。数值函数见 _ch14_phys.jsx。已用 node 核对：
// 称体重：ΔlnL=−1/2 的数值半宽与 σ_w/√m 一致到 1e-4；4000 次重复实验 Var(σ̂²)=0.102（m=20，σ=1；理论 2/m=0.1）。
// Fisher：F11=4, F22=1, ρ=−0.8 → 1/√F11=0.500，√(F⁻¹)11=0.833=0.5/√(1−ρ²)。
// MCMC（图 14.5 型 Gamma 后验，真值 0.5 / 0.22）：σ=0.5 → 接受率 0.44、均值 0.501、标准差 0.221（20000 步）。
// 宇宙方差：l=10 → √(2/21)=0.309；l=1000 → 0.0316。
import { useEffect, useMemo, useRef, useState } from "react";
import { Plot, M, TxI, renderTex } from "@kit";
import * as P from "./_ch14_phys.jsx";

const R = String.raw;
const fx = (v, d = 3) => (Number.isFinite(v) ? (+v).toFixed(d) : R`\text{—}`);
const sci = (v, d = 2) => { if (!Number.isFinite(v)) return R`\text{—}`; if (v === 0) return "0"; if (Math.abs(v) >= 0.01 && Math.abs(v) < 1e4) return (+v).toPrecision(d + 1); const e = Math.floor(Math.log10(Math.abs(v))); return R`${(v / 10 ** e).toFixed(d)}\times10^{${e}}`; };
const ST = ({ x, y, w, tex, color, center, right, size = 13 }) => <foreignObject x={x} y={y} width={w} height={24}>
  <div style={{ fontSize: size, lineHeight: "22px", color: color || "var(--ink)", textAlign: center ? "center" : right ? "right" : "left", whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} /></foreignObject>;
const Slider = ({ label, value, min, max, step, log, onChange }) => {
  const toS = v => (log ? Math.log10(v) : v), fromS = s => (log ? 10 ** s : s);
  return <label className="plot-param"><span className="plot-plabel"><M>{label}</M></span>
    <input type="range" min={toS(min)} max={toS(max)} step={log ? 0.01 : step} value={toS(value)} onChange={e => onChange(fromS(+e.target.value))} /></label>;
};
const niceStep = span => { const s0 = 10 ** Math.floor(Math.log10(span / 5)), e = span / 5 / s0; return s0 * (e >= 5 ? 5 : e >= 2 ? 2 : 1); };

// ---------- 1. §14.1 高斯似然与后验：称体重 ----------
export function WeighPlot() {
  return <Plot
    x={{ label: R`w`, domain: [58, 82] }}
    y={{ label: R`P(w|\{d_i\})` }}
    params={[
      { id: "m", label: R`m`, min: 1, max: 1000, log: true, value: 10 },
      { id: "s", label: R`\sigma_w`, min: 0.5, max: 10, step: 0.1, value: 5 },
      { id: "seed", label: R`\text{种子}`, min: 1, max: 30, step: 1, value: 1 },
    ]}
    series={p => {
      const m = Math.max(1, Math.round(p.m)), s = p.s, d = P.weighData(m, s, Math.round(p.seed));
      const wh = P.mean(d), err = s / Math.sqrt(m), hw = P.halfWidth(d, s), s2 = P.sampleVar(d, P.W_TRUE);
      const gauss = (x, mu, sd) => Math.exp(-((x - mu) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI));
      // σ_w 未知时的边缘化后验 (14.22)：在网格上数值归一化
      let marg = null;
      if (m >= 3) {
        const xs = Array.from({ length: 600 }, (_, i) => 58 + 24 * i / 599), lp = xs.map(x => P.lnMargW(x, d)), mx = Math.max(...lp);
        const ys = lp.map(v => Math.exp(v - mx)); const Z = ys.reduce((a, b) => a + b, 0) * (24 / 599);
        marg = xs.map((x, i) => [x, ys[i] / Z]);
      }
      const yTop = gauss(wh, wh, err);
      return [
        { label: R`\text{后验（}\sigma_w\text{ 已知）：均值 }\hat w=${fx(wh, 2)},\ \text{宽 }\sigma_w/\sqrt m=${fx(err, 3)}`, f: x => gauss(x, wh, err), color: "#c0392b", width: 2.6 },
        ...(marg ? [{ label: R`\text{边缘化 }\sigma_w\text{ 后的后验 (14.22)}`, data: marg, color: "#2c4a6e", dash: "dash", width: 1.8 }] : []),
        { label: R`\text{单次测量的似然 (14.1)：宽 }\sigma_w`, f: x => gauss(x, d[0], s), color: "#888", dash: "dot", width: 1.4 },
        { label: R`\text{数据 }d_i\text{（前 60 个）}`, data: d.slice(0, 60).map(x => [x, 0.04 * yTop]), points: true, color: "#2c6e49" },
        { label: R`\Delta\ln\mathcal L=-\tfrac12\text{ 的数值半宽}=${fx(hw, 4)}\ \text{vs}\ \sigma_w/\sqrt m=${fx(err, 4)}`, f: () => NaN },
        { label: R`\widehat{\sigma_w^2}=${fx(s2, 2)}\ \pm\ \sqrt{2/m}\,\sigma_w^2=${fx(Math.sqrt(2 / m) * s * s, 2)}\ \ (\text{真值 }${fx(s * s, 2)})`, f: () => NaN },
      ];
    }}
    vlines={[{ x: P.W_TRUE, label: R`w_{\rm true}=70` }]}
    samples={500} height={380}
    caption={R`拖动 $m$：后验宽度按 $\sigma_w/\sqrt m$ 收窄（\eqref{14.13}）；数值求得的 $\Delta\ln\mathcal L=-1/2$ 半宽与之精确相等。蓝色虚线是 $\sigma_w$ 未知、取均匀先验并按 \eqref{14.22} 积掉后的后验：$m$ 小时尾巴明显更胖（Student-$t$ 型），$m$ 大时与已知 $\sigma_w$ 的情形重合。最后一行给出 \eqref{14.10} 的方差估计量及其误差 \eqref{14.21}。`} />;
}

// ---------- 2. §14.4.1 宇宙方差 + 噪声 ----------
export function CosmicVariancePlot() {
  return <Plot
    x={{ label: R`l`, log: true, domain: [2, 3000] }}
    y={{ label: R`\sqrt{\mathrm{Var}[\hat C(l)]}\,/\,C(l)`, log: true, domain: [1e-3, 10] }}
    params={[
      { id: "fsky", label: R`f_{\rm sky}`, min: 0.01, max: 1, log: true, value: 1 },
      { id: "dT", label: R`\Delta_T\ [\mu{\rm K\,arcmin}]`, min: 0.5, max: 200, log: true, value: 35 },
      { id: "fw", label: R`\theta_{\rm FWHM}\ [{\rm arcmin}]`, min: 1, max: 60, log: true, value: 7 },
    ]}
    series={p => {
      const lx = (() => { for (let l = 2; l <= 5000; l++) if (P.noiseN(p.dT) / (P.beamB(l, p.fw) ** 2 * P.ClTT(l)) > 1) return l; return NaN; })();
      return [
        { label: R`\text{宇宙方差 }\sqrt{2/[(2l+1)f_{\rm sky}]}`, f: l => P.cvFrac(l, p.fsky), color: "#2c4a6e", dash: "dash", width: 2 },
        { label: R`\text{噪声项 }\sqrt{2/[(2l+1)f_{\rm sky}]}\,N(l)B_l^{-2}/C(l)`, f: l => P.cvFrac(l, p.fsky) * P.noiseN(p.dT) / (P.beamB(l, p.fw) ** 2 * P.ClTT(l)), color: "#b8862b", dash: "dot", width: 2 },
        { label: R`\text{总误差 (14.47)}`, f: l => P.totFrac(l, p.fsky, p.dT, p.fw), color: "#c0392b", width: 2.6 },
        { label: R`l=10:\ ${fx(P.totFrac(10, p.fsky, p.dT, p.fw))},\ \ l=100:\ ${fx(P.totFrac(100, p.fsky, p.dT, p.fw), 4)},\ \ l=1000:\ ${fx(P.totFrac(1000, p.fsky, p.dT, p.fw), 4)}`, f: () => NaN },
        { label: R`\text{噪声开始超过信号：}N B_l^{-2}=C\ \text{于}\ l\approx${Number.isFinite(lx) ? lx : R`>5000`}`, f: () => NaN },
      ];
    }}
    vlines={p => { for (let l = 2; l <= 3000; l++) if (P.noiseN(p.dT) / (P.beamB(l, p.fw) ** 2 * P.ClTT(l)) > 1) return [{ x: l, label: R`N B_l^{-2}=C` }]; return []; }}
    samples={300} height={380}
    caption={R`$C(l)$ 用一条平滑的示意温度谱（只用来估计 $N/C$ 的量级，不含声学振荡）。噪声 $N(l)=(\Delta_T\cdot1')^2$ 为白噪声，波束为高斯型 $B_l=e^{-l^2\theta_{\rm beam}^2/2}$，$\theta_{\rm beam}=\theta_{\rm FWHM}/\sqrt{8\ln2}$。默认值约为 Planck 143 GHz：宇宙方差主导到 $l\sim10^3$，之后被放大的噪声 $NB_l^{-2}$ 指数上升。把 $f_{\rm sky}$ 调小，整条曲线按 $1/\sqrt{f_{\rm sky}}$ 上移。`} />;
}

// ---------- 3. §14.4.2 星系功率谱误差 ----------
export function GalaxyErrPlot() {
  return <Plot
    x={{ label: R`k\ [h\,{\rm Mpc}^{-1}]`, log: true, domain: [0.003, 0.5] }}
    y={{ label: R`\sqrt{\mathrm{Var}[\hat P_{\rm g}]}\,/\,P_{\rm g}`, log: true, domain: [1e-3, 3] }}
    params={[
      { id: "V", label: R`V\ [h^{-3}{\rm Gpc}^3]`, min: 0.1, max: 100, log: true, value: 63 },
      { id: "n", label: R`\bar n_{\rm g}\ [h^3{\rm Mpc}^{-3}]`, min: 1e-5, max: 1e-2, log: true, value: 5.2e-4 },
      { id: "b", label: R`b_1`, min: 0.8, max: 3, step: 0.05, value: 1.5 },
      { id: "z", label: R`z`, min: 0, max: 3, step: 0.05, value: 1.4 },
    ]}
    series={p => {
      const V = p.V * 1e9, dk = 0.005, kF = 2 * Math.PI / Math.cbrt(V);
      const nP = k => p.n * p.b * p.b * P.PLh(k, p.z);
      const err = k => (k < kF ? NaN : P.pkErrFrac(k, dk, V, p.n, p.b, p.z));
      return [
        { label: R`\text{样本方差 }\sqrt{2/m_{k,\alpha}}`, f: k => (k < kF ? NaN : Math.sqrt(2 / P.modesBook(k, dk, V))), color: "#2c4a6e", dash: "dash", width: 2 },
        { label: R`\text{总误差 (14.60)}`, f: err, color: "#c0392b", width: 2.6 },
        { label: R`\bar n_{\rm g}P_{\rm g}`, f: k => nP(k), color: "#2c6e49", dash: "dot", width: 1.6 },
        { label: R`k_F=${sci(kF)}\,h\,{\rm Mpc}^{-1},\ \ \Delta k=0.005;\ \ k=0.1:\ \text{误差 }${fx(err(0.1), 4)},\ \bar n_{\rm g}P_{\rm g}=${fx(nP(0.1), 2)}`, f: () => NaN },
      ];
    }}
    vlines={[{ x: 0.2, label: R`k_{\rm max}\sim0.2` }]}
    samples={300} height={380}
    caption={R`每个线性 $k$ 区间（宽 $\Delta k=0.005\,h\,{\rm Mpc}^{-1}$）的相对误差。模式数 \eqref{14.53} $\propto Vk_\alpha^2\Delta k$，所以样本方差项 $\propto1/(k_\alpha\sqrt V)$；当 $\bar n_{\rm g}P_{\rm g}\lesssim1$（绿色点线降到 1 以下）时散粒噪声开始主导。默认值是 \exref{14.11} 的 Euclid 近似参数（\eqref{14.83}）。线性功率谱用 BBKS 形状 + $\sigma_8=0.81$ 归一化。`} />;
}

// ---------- 4. 图 14.4 交互版：Fisher 误差椭圆 ----------
export function FisherEllipse() {
  const [F11, setF11] = useState(4), [F22, setF22] = useState(1), [rho, setRho] = useState(0.8);
  const r = P.fisher2(F11, F22, rho);
  const W = 680, H = 470, m = { l: 60, r: 20, t: 16, b: 40 }, ph = 300, gap = 22, iw = W - m.l - m.r;
  const ext = 1.35 * Math.max(r.marg1, r.marg2), step = niceStep(2 * ext);
  const sx = v => m.l + (v + ext) / (2 * ext) * iw, sy = v => m.t + ph / 2 - v / (2 * ext) * Math.min(ph, iw) * (ph / Math.min(ph, iw));
  const syP = v => m.t + ph - (v + ext) / (2 * ext) * ph;   // 纵轴单独缩放到面板高度
  // 椭圆 λᵀFλ = Δ$\chi^2$：λ = L·(cos t, sin t)·√Δ$\chi^2$，L 为协方差 F⁻¹ 的 Cholesky 因子
  const L11 = Math.sqrt(r.C11), L21 = r.C12 / L11, L22 = Math.sqrt(Math.max(r.C22 - L21 * L21, 0));
  const ell = k => Array.from({ length: 181 }, (_, i) => { const t = 2 * Math.PI * i / 180, c = Math.cos(t), s = Math.sin(t); return [Math.sqrt(k) * L11 * c, Math.sqrt(k) * (L21 * c + L22 * s)]; });
  const path = pts => pts.map(([a, b], i) => `${i ? "L" : "M"}${sx(a).toFixed(1)},${syP(b).toFixed(1)}`).join("") + "Z";
  // 下面板：条件分布（λ2 固定）与边缘分布的 1D 高斯
  const y0 = m.t + ph + gap, h1 = H - m.b - y0;
  const g = (x, sd) => Math.exp(-x * x / (2 * sd * sd));
  const curve = sd => Array.from({ length: 241 }, (_, i) => { const x = -ext + 2 * ext * i / 240; return `${i ? "L" : "M"}${sx(x).toFixed(1)},${(y0 + h1 - g(x, sd) * (h1 - 6)).toFixed(1)}`; }).join("");
  const ticks = []; for (let v = Math.ceil(-ext / step) * step; v <= ext + 1e-9; v += step) ticks.push(+v.toPrecision(6));
  return (
    <div className="plot card">
      <div className="plot-params">
        <Slider label={R`F_{11}=${fx(F11, 2)}`} value={F11} min={0.25} max={25} log onChange={setF11} />
        <Slider label={R`F_{22}=${fx(F22, 2)}`} value={F22} min={0.25} max={25} log onChange={setF22} />
        <Slider label={R`F_{12}/\sqrt{F_{11}F_{22}}=${fx(rho, 2)}`} value={rho} min={-0.98} max={0.98} step={0.01} onChange={setRho} />
        <button className="plot-reset" onClick={() => { setF11(4); setF22(1); setRho(0.8); }}>重置</button>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <defs><clipPath id="ch14ell"><rect x={m.l} y={m.t} width={iw} height={ph} /></clipPath></defs>
        {ticks.map(v => <g key={"t" + v}>
          <line x1={sx(v)} x2={sx(v)} y1={m.t} y2={m.t + ph} className="plot-grid" />
          <line x1={m.l} x2={m.l + iw} y1={syP(v)} y2={syP(v)} className="plot-grid" />
          <ST x={m.l - 52} y={syP(v) - 11} w={46} tex={String(v)} right />
          <ST x={sx(v) - 25} y={H - m.b + 2} w={50} tex={String(v)} center />
        </g>)}
        <rect x={m.l} y={m.t} width={iw} height={ph} className="plot-frame" />
        <g clipPath="url(#ch14ell)">
          <path d={path(ell(2.30))} fill="none" stroke="#2c4a6e" strokeWidth={1.3} strokeDasharray="6 4" />
          <path d={path(ell(1))} fill="#9cc8f5" fillOpacity={0.75} stroke="#1f1b16" strokeWidth={1.6} />
          <line x1={m.l} x2={m.l + iw} y1={syP(0)} y2={syP(0)} stroke="#555" strokeWidth={1} />
          <line x1={sx(0)} x2={sx(0)} y1={m.t} y2={m.t + ph} stroke="#555" strokeWidth={1} />
          {[-1, 1].map(sg => <line key={sg} x1={sx(sg * r.marg1)} x2={sx(sg * r.marg1)} y1={m.t} y2={y0 + h1} stroke="#c0392b" strokeDasharray="3 3" />)}
          {[-1, 1].map(sg => <line key={"c" + sg} x1={sx(sg * r.cond1)} x2={sx(sg * r.cond1)} y1={syP(0)} y2={y0 + h1} stroke="#2c6e49" strokeDasharray="2 3" />)}
          <circle cx={sx(0)} cy={syP(0)} r={4.5} fill="#1f1b16" />
          <line x1={sx(0)} x2={sx(r.cond1)} y1={syP(-0.82 * ext)} y2={syP(-0.82 * ext)} stroke="#2c6e49" strokeWidth={3} />
          <line x1={sx(0)} x2={sx(r.marg1)} y1={syP(-0.93 * ext)} y2={syP(-0.93 * ext)} stroke="#c0392b" strokeWidth={3} />
        </g>
        <ST x={sx(Math.min(r.cond1, 0.55 * ext)) + 6} y={syP(-0.82 * ext) - 12} w={230} tex={R`1/\sqrt{F_{11}}=${fx(r.cond1)}`} color="#2c6e49" />
        <ST x={sx(Math.min(r.marg1, 0.55 * ext)) + 6} y={syP(-0.93 * ext) - 12} w={230} tex={R`\sqrt{(F^{-1})_{11}}=${fx(r.marg1)}`} color="#c0392b" />
        <ST x={m.l + 6} y={m.t + 4} w={200} tex={R`\lambda_2-\bar\lambda_2`} />
        <ST x={m.l + iw - 120} y={y0 - 22} w={115} tex={R`\lambda_1-\bar\lambda_1`} right />
        {/* 下面板 */}
        <rect x={m.l} y={y0} width={iw} height={h1} className="plot-frame" />
        <path d={curve(r.cond1)} fill="none" stroke="#2c6e49" strokeWidth={2} strokeDasharray="6 4" />
        <path d={curve(r.marg1)} fill="none" stroke="#c0392b" strokeWidth={2.4} />
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <p style={{ margin: "0.3em 0" }}><TxI>{R`实线椭圆：$\lambda^\top F\lambda=1$（$\Delta\chi^2=1$），它在 $\lambda_1$ 轴上的**投影**半宽正是边缘化误差 $\sqrt{(F^{-1})_{11}}=${fx(r.marg1)}$（红）；它与 $\lambda_2=\bar\lambda_2$ 横线的**截距**是条件误差 $1/\sqrt{F_{11}}=${fx(r.cond1)}$（绿）。虚线椭圆 $\Delta\chi^2=2.30$ 包含二维联合分布的 68%。下面板：绿虚线为固定 $\lambda_2$ 的条件分布，红线为积掉 $\lambda_2$ 的边缘分布 \eqref{14.71}。`}</TxI></p>
        <p style={{ margin: "0.3em 0" }}><TxI>{R`$F_{12}=${fx(r.F12)}$，$\det F=${fx(r.det)}$；参数相关系数 $r_{12}=(F^{-1})_{12}/\sqrt{(F^{-1})_{11}(F^{-1})_{22}}=${fx(r.corr)}$。比值 $\sqrt{(F^{-1})_{11}}\big/(1/\sqrt{F_{11}})=${fx(r.marg1 / r.cond1)}=1/\sqrt{1-r_{12}^2}$：简并越强，"假装 $\lambda_2$ 已知"低估的误差越多。`}</TxI></p>
      </div>
    </div>);
}

// ---------- 5. 图 14.5 交互版：Metropolis–Hastings 在浏览器里真跑 ----------
export function MCMCDemo() {
  const [tg, setTg] = useState("skew");
  const [sigma, setSigma] = useState(0.5), [n, setN] = useState(5000), [x0, setX0] = useState(1.8), [burn, setBurn] = useState(200), [seed, setSeed] = useState(1);
  const [shown, setShown] = useState(null);     // 动画：当前显示到第几步（null = 全部）
  const T = P.TARGETS[tg];
  const run = useMemo(() => P.metropolis(T.lnp, { sigma, n: Math.round(n), x0, seed }), [tg, sigma, n, x0, seed]);
  const N = run.chain.length - 1, upto = shown == null ? N : Math.min(shown, N);
  useEffect(() => {
    if (shown == null) return;
    if (shown >= N) { setShown(null); return; }
    const id = setTimeout(() => setShown(s => (s == null ? null : s + Math.max(1, Math.round(N / 150)))), 30);
    return () => clearTimeout(id);
  }, [shown, N]);
  const sub = run.chain.subarray(0, upto + 1);
  const st = upto > burn + 2 ? P.chainStats(sub, burn) : null;
  // 接受率（到当前步）
  let acc = 0; for (let i = 1; i <= upto; i++) if (sub[i] !== sub[i - 1]) acc++; const accR = upto ? acc / upto : NaN;
  const W = 680, H = 520, m = { l: 56, r: 16, t: 12 }, iw = W - m.l - m.r, h1 = 200, gap = 44, h2 = H - m.t - h1 - gap - 40;
  const [a0, a1] = T.dom;
  // 上：轨迹
  const sxT = i => m.l + i / Math.max(N, 1) * iw, syT = v => m.t + h1 - (Math.min(Math.max(v, a0), a1) - a0) / (a1 - a0) * h1;
  const stride = Math.max(1, Math.floor(upto / 1500));
  let tr = ""; for (let i = 0; i <= upto; i += stride) tr += `${i ? "L" : "M"}${sxT(i).toFixed(1)},${syT(sub[i]).toFixed(1)}`;
  // 下：直方图 vs 真后验
  const y2 = m.t + h1 + gap, nb = 50, bw = (a1 - a0) / nb, hist = new Array(nb).fill(0); let cnt = 0;
  for (let i = burn + 1; i <= upto; i++) { const b = Math.floor((sub[i] - a0) / bw); if (b >= 0 && b < nb) { hist[b]++; cnt++; } }
  const dens = hist.map(c => (cnt ? c / (cnt * bw) : 0));
  const pdf = x => Math.exp(T.lnp(x));
  let pmax = 0; for (let i = 0; i <= 400; i++) pmax = Math.max(pmax, pdf(a0 + (a1 - a0) * i / 400));
  const ymax = 1.15 * Math.max(pmax, ...dens);
  const sxH = v => m.l + (v - a0) / (a1 - a0) * iw, syH = v => y2 + h2 - v / ymax * h2;
  let pc = ""; for (let i = 0; i <= 400; i++) { const x = a0 + (a1 - a0) * i / 400; pc += `${i ? "L" : "M"}${sxH(x).toFixed(1)},${syH(pdf(x)).toFixed(1)}`; }
  const xt = [0, 0.5, 1, 1.5, 2];
  return (
    <div className="plot card">
      <div className="plot-params">
        <span className="seg">{Object.entries(P.TARGETS).map(([id, v]) => <button key={id} className={tg === id ? "on" : ""} onClick={() => { setTg(id); setShown(null); }}>{v.label}</button>)}</span>
        <Slider label={R`\text{步长 }\sigma=${fx(sigma, 3)}`} value={sigma} min={0.005} max={5} log onChange={v => { setSigma(v); setShown(null); }} />
        <Slider label={R`\text{步数 }=${Math.round(n)}`} value={n} min={100} max={30000} log onChange={v => { setN(v); setShown(null); }} />
        <Slider label={R`\lambda_0=${fx(x0, 2)}`} value={x0} min={0.02} max={2} step={0.01} onChange={v => { setX0(v); setShown(null); }} />
        <Slider label={R`\text{burn-in}=${burn}`} value={burn} min={0} max={3000} step={10} onChange={v => setBurn(Math.round(v))} />
        <button className="plot-reset" onClick={() => { setSeed(s => s + 1); setShown(null); }}>🎲 重新掷骰子</button>
        <button className="plot-reset" onClick={() => setShown(0)}>▶ 逐步播放</button>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <rect x={m.l} y={m.t} width={iw} height={h1} className="plot-frame" />
        {xt.map(v => <g key={"a" + v}><line x1={m.l} x2={m.l + iw} y1={syT(v)} y2={syT(v)} className="plot-grid" /><ST x={m.l - 50} y={syT(v) - 11} w={44} tex={String(v)} right /></g>)}
        {burn > 0 && <rect x={m.l} y={m.t} width={Math.min(sxT(burn), m.l + iw) - m.l} height={h1} fill="#e8a0a8" opacity={0.25} />}
        <path d={tr} fill="none" stroke="#2c4a6e" strokeWidth={0.9} />
        <ST x={m.l + 4} y={m.t + 2} w={300} tex={R`\text{链的轨迹 }\lambda^i\text{（粉色：丢弃的 burn-in）}`} />
        <ST x={m.l + iw - 150} y={m.t + h1 + 2} w={150} tex={R`i=0\ldots${N}`} right />
        <rect x={m.l} y={y2} width={iw} height={h2} className="plot-frame" />
        {hist.map((c, i) => c > 0 && <rect key={i} x={sxH(a0 + i * bw) + 0.5} y={syH(dens[i])} width={iw / nb - 1} height={y2 + h2 - syH(dens[i])} fill="#9cc8f5" stroke="#5a8fc4" strokeWidth={0.5} />)}
        <path d={pc} fill="none" stroke="#c0392b" strokeWidth={2.2} />
        {xt.map(v => <ST key={"b" + v} x={sxH(v) - 20} y={y2 + h2 + 2} w={40} tex={String(v)} center />)}
        <ST x={m.l + iw / 2 - 20} y={y2 + h2 + 18} w={40} tex={R`\lambda`} center />
        <ST x={m.l + 4} y={y2 + 2} w={360} tex={R`\text{直方图（burn-in 之后）vs 真后验 }P(\lambda)`} />
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <p style={{ margin: "0.3em 0" }}><TxI>{R`已走 $${upto}$ 步，接受率 $${fx(accR, 3)}$。${st ? R`burn-in 之后 $m_{\rm sample}=${st.n}$：样本均值 \eqref{14.72} $\bar\lambda=${fx(st.mean)}$，样本标准差 \eqref{14.73} $${fx(st.sd)}$（真值 $${fx(T.mean)}$、$${fx(T.sd)}$）。积分自相关时间 $\tau\approx${fx(st.tau, 1)}$，有效独立样本数 $m_{\rm sample}/\tau\approx${Math.round(st.ess)}$。` : ""}`}</TxI></p>
        <p style={{ margin: "0.3em 0" }}><TxI>{R`试试：$\sigma=0.01$ 时几乎每步都被接受，但链像蜗牛一样爬，$\tau$ 上千、从 $\lambda_0=1.8$ 爬到峰值要很久（burn-in 很长）；$\sigma=3$ 时多数提议落到概率很低处被拒绝，链长时间原地不动。中间（$\sigma\sim0.5$，与后验宽度同量级）$\tau$ 最小。双峰目标下，小步长的链会被困在一个峰里——"只看接受率"会被骗。`}</TxI></p>
      </div>
    </div>);
}
