// 第 11 章交互图。数值函数见 _ch11_phys.jsx（已用 node 核对，见交付报告）：
//  σ8(EH98)=0.832；f(z=0.57)=0.780；CMASS 型 Kaiser 单极 P0(0.1 h/Mpc)≈1.7×10⁴ (h⁻¹Mpc)³（图 11.4 约 1.8×10⁴）；
//  P/P_nw 振荡：谷 0.05、0.11，峰 0.08、0.14 h/Mpc，幅度 ±5%（图 11.7）；ξ(r) 的 BAO 峰在 r≈101 h⁻¹Mpc；
//  SZ：y=0 峰值 1.421（x=2.82），y=0.02/0.05 峰值 1.354/1.271，零点 x=3.830 ↔ 217.5 GHz（图 11.11）；
//  Limber：C_l^Limber/C_l^exact = 0.58、0.83、0.95、0.998（l=2、5、10、30，习题 11.7b）。
import { useMemo, useState } from "react";
import { Plot, M, TxI, renderTex } from "@kit";
import * as P from "./_ch11_phys.jsx";

const R = String.raw;
const f3 = v => (Number.isFinite(v) ? (+v).toFixed(3) : R`\text{—}`);
const f2 = v => (Number.isFinite(v) ? (+v).toFixed(2) : R`\text{—}`);
const sci = (v, d = 2) => { if (!Number.isFinite(v)) return R`\text{—}`; if (Math.abs(v) >= 0.01 && Math.abs(v) < 1e4) return (+v).toPrecision(d + 1); const e = Math.floor(Math.log10(Math.abs(v))); return R`${(v / 10 ** e).toFixed(d)}\times10^{${e}}`; };
const ST = ({ x, y, w = 200, tex, color, center, right, size = 13 }) => <foreignObject x={x} y={y} width={w} height={26}>
  <div style={{ fontSize: size, lineHeight: "22px", color: color || "var(--ink)", textAlign: center ? "center" : right ? "right" : "left", whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} /></foreignObject>;
const Slider = ({ label, min, max, step, value, set }) => (
  <label className="plot-param"><span className="plot-plabel"><M>{label}</M></span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(+e.target.value)} /></label>);

// 功率谱缓存（按红移）
const PK = new Map();
const pk = (z, wiggle = true) => { const key = z.toFixed(3) + wiggle; if (!PK.has(key)) PK.set(key, P.makePk(z, { wiggle })); return PK.get(key); };
const Z_CMASS = 0.57;

// ---------- 1. 图 11.4 交互版：Kaiser 公式 (11.23) 与多极矩 ----------
export function KaiserPlot() {
  const Pz = pk(Z_CMASS);
  return <Plot
    x={{ label: R`k\ [h\,\mathrm{Mpc^{-1}}]`, log: true, domain: [0.01, 0.3] }}
    y={{ label: R`P\ [(h^{-1}\mathrm{Mpc})^3]`, log: true, domain: [300, 2e5] }}
    params={[
      { id: "b", label: R`b_1`, min: 0.5, max: 3, step: 0.01, value: 2.0 },
      { id: "f", label: R`f`, min: 0, max: 1.2, step: 0.01, value: 0.78 },
      { id: "mu", label: R`\mu_k`, min: 0, max: 1, step: 0.01, value: 1 },
    ]}
    series={p => {
      const beta = p.f / p.b;
      return [
        { label: R`\text{实空间 }b_1^2P_{\rm L}`, f: k => p.b * p.b * Pz(k), color: "#7f7f7f", dash: "dot", width: 1.6 },
        { label: R`P_{\rm g,RSD}(k,\mu_k{=}${f2(p.mu)})`, f: k => Pz(k) * P.kaiser(p.b, p.f, p.mu), color: "#b8862b", dash: "dash", width: 1.8 },
        { label: R`\text{单极 }P^{(0)}`, f: k => Pz(k) * P.mono(p.b, p.f), color: "#2c4a6e", width: 2.4 },
        { label: R`\text{四极 }P^{(2)}`, f: k => Pz(k) * P.quad(p.b, p.f), color: "#c0392b", width: 2.4 },
        { label: R`\text{十六极 }P^{(4)}`, f: k => Pz(k) * P.hexa(p.b, p.f), color: "#2c6e49", dash: "dashdot", width: 1.4 },
        { label: R`\beta=f/b_1=${f3(beta)}:\ P^{(0)}/b_1^2P_{\rm L}=${f3(1 + 2 * beta / 3 + beta * beta / 5)},\ P^{(2)}/P^{(0)}=${f3(P.quad(p.b, p.f) / P.mono(p.b, p.f))}`, f: () => NaN },
        { label: R`P^{(0)}(0.1\,h\,\mathrm{Mpc^{-1}})=${sci(Pz(0.1) * P.mono(p.b, p.f))}`, f: () => NaN },
      ];
    }}
    samples={160} height={400} />;
}

// ---------- 1b. (b+fμ²)² 与 Legendre 重建（习题 11.4） ----------
export function KaiserMuPlot() {
  return <Plot
    x={{ label: R`\mu_k`, domain: [0, 1] }}
    y={{ label: R`P_{\rm g,RSD}/(b_1^2P_{\rm L})`, domain: [0, 3.2] }}
    params={[
      { id: "b", label: R`b_1`, min: 0.5, max: 3, step: 0.01, value: 2.0 },
      { id: "f", label: R`f`, min: 0, max: 1.2, step: 0.01, value: 0.78 },
    ]}
    series={p => {
      const b2 = p.b * p.b, m0 = P.mono(p.b, p.f) / b2, m2 = P.quad(p.b, p.f) / b2, m4 = P.hexa(p.b, p.f) / b2;
      return [
        { label: R`(1+\beta\mu_k^2)^2`, f: m => P.kaiser(p.b, p.f, m) / b2, color: "#1f1b16", width: 3 },
        { label: R`P^{(0)}\ \text{项}`, f: () => m0, color: "#2c4a6e", dash: "dash" },
        { label: R`P^{(0)}+P^{(2)}\mathcal P_2`, f: m => m0 + m2 * P.legendreP(2, m), color: "#c0392b", dash: "dash" },
        { label: R`P^{(0)}+P^{(2)}\mathcal P_2+P^{(4)}\mathcal P_4\ (\text{精确})`, f: m => m0 + m2 * P.legendreP(2, m) + m4 * P.legendreP(4, m), color: "#e67e22", dash: "dot", width: 2.4 },
      ];
    }}
    samples={120} height={300} />;
}

// ---------- 2. 图 11.3 交互版：球对称过密区周围的红移空间畸变 ----------
// 线性理论：v_r = −(1/3) f aH Δ̄(r) r，红移空间视向坐标 s∥ = r∥ + u∥/aH = r∥(1 − ε)，ε ≡ fΔ̄/3。
// ε = 1：转向（turnaround）壳层被压成一条线；ε > 1：前后翻转（原书右图）。σ：随机速度弥散造成的位移（单位为壳半径）。
const RND = (() => { let s = 12345; const g = () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; return Array.from({ length: 400 }, () => { const u = g() || 1e-9, v = g(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }); })();
export function RSDSketch() {
  const [eps, setEps] = useState(0.3), [sig, setSig] = useState(0);
  const W = 680, H = 380, cx1 = 200, cx2 = 500, cy = 175, Rr = 105;
  const N = 48, pts = Array.from({ length: N }, (_, i) => { const t = 2 * Math.PI * i / N; return [Math.cos(t), Math.sin(t)]; });
  // 视线方向竖直（观测者在下方，y 轴向上为远离观测者）
  const sPts = pts.map(([x, y], i) => [x, y * (1 - eps) + sig * RND[i]]);
  const fill = pts.map(([x, y], i) => [x, y]);
  const toS = (cx, [x, y]) => [cx + Rr * x, cy - Rr * y];
  const ell = Math.abs(1 - eps);
  const regime = eps < 0.999 ? R`压扁：视向轴比 $|1-\varepsilon|=${f2(ell)}$（线性 Kaiser 区，原书左图）` : eps < 1.001 ? R`$\varepsilon=1$：转向壳层被压成一条线` : R`$\varepsilon>1$：前后翻转，视向轴比 $${f2(ell)}$——近侧与远侧星系互换位置（原书右图的情形）`;
  return (
    <div className="plot card">
      <div className="plot-params">
        <Slider label={R`\varepsilon\equiv f\bar\Delta/3=${f2(eps)}`} min={0} max={2.5} step={0.01} value={eps} set={setEps} />
        <Slider label={R`\sigma_v/(aHR)=${f2(sig)}`} min={0} max={0.8} step={0.01} value={sig} set={setSig} />
        <span className="seg">{[[0.3, "线性"], [1, "转向"], [1.8, "翻转"]].map(([v, l]) => <button key={l} className={Math.abs(eps - v) < 1e-3 ? "on" : ""} onClick={() => setEps(v)}>{l}</button>)}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <defs><marker id="ch11arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#6aa9e0" /></marker></defs>
        <ST x={cx1 - 100} y={8} w={200} center tex={R`\text{实空间（真实位置）}`} />
        <ST x={cx2 - 100} y={8} w={200} center tex={R`\text{红移空间（观测位置）}`} />
        {/* 实空间 */}
        <circle cx={cx1} cy={cy} r={Rr} fill="none" stroke="#888" strokeDasharray="5 4" />
        <circle cx={cx1} cy={cy} r={10} fill="#e8590c" />
        {fill.map((p, i) => { const [x, y] = toS(cx1, p); return <circle key={i} cx={x} cy={y} r={3.2} fill="#2c4a6e" />; })}
        {[[0, 1], [0, -1], [1, 0], [-1, 0]].map(([x, y], i) => { const [x0, y0] = toS(cx1, [x * 1.28, y * 1.28]), [x1, y1] = toS(cx1, [x * 1.05, y * 1.05]); return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} stroke="#6aa9e0" strokeWidth={4} markerEnd="url(#ch11arr)" />; })}
        {/* 红移空间 */}
        <circle cx={cx2} cy={cy} r={Rr} fill="none" stroke="#bbb" strokeDasharray="5 4" />
        <circle cx={cx2} cy={cy} r={10} fill="#e8590c" />
        {sig === 0 && <ellipse cx={cx2} cy={cy} rx={Rr} ry={Math.max(0.5, Rr * ell)} fill="none" stroke="#1f1b16" strokeWidth={1.5} />}
        {sPts.map((p, i) => { const [x, y] = toS(cx2, p); const [x0, y0] = toS(cx2, pts[i]); return <g key={i}>{(i % 6 === 0) && <line x1={x0} y1={y0} x2={x} y2={y} stroke="#999" strokeDasharray="2 3" />}<circle cx={x} cy={y} r={3.2} fill={pts[i][1] > 0 ? "#c0392b" : "#2c6e49"} /></g>; })}
        <line x1={W / 2} x2={W / 2} y1={H - 60} y2={H - 22} stroke="#6aa9e0" strokeWidth={6} markerEnd="url(#ch11arr)" />
        <ST x={W / 2 + 10} y={H - 54} w={160} tex={R`\text{视线方向，朝向观测者}`} />
      </svg>
      <div className="plot-cap"><TxI>{R`${regime}。红点：过密区远侧（背离观测者一侧）的示踪体，绿点：近侧。它们都向中心下落，于是远侧的被视为更近、近侧的被视为更远。`}</TxI></div>
    </div>);
}

// ---------- 3. 图 11.5 交互版：fσ8(z) ----------
export function FSigma8Plot() {
  return <Plot
    x={{ label: R`z`, domain: [0, 2] }}
    y={{ label: R`f\sigma_8(z)`, domain: [0.2, 0.7] }}
    params={[
      { id: "Om", label: R`\Omega_{\rm m}`, min: 0.15, max: 0.6, step: 0.005, value: 0.3106 },
      { id: "w", label: R`w`, min: -1.5, max: -0.5, step: 0.01, value: -1 },
      { id: "s8", label: R`\sigma_8(z{=}0)`, min: 0.6, max: 1.0, step: 0.005, value: 0.811 },
    ]}
    series={p => {
      const pp = { Om: p.Om, w: p.w };
      const zs = Array.from({ length: 41 }, (_, i) => i * 0.05);
      const exact = zs.map(z => [z, P.fGrowth(z, pp) * p.s8 * Dratio(z, pp)]);
      const approx = zs.map(z => [z, P.fApprox(z, pp) * p.s8 * Dratio(z, pp)]);
      const ref = zs.map(z => [z, P.fGrowth(z) * 0.811 * Dratio(z, {})]);
      const eds = zs.map(z => [z, p.s8 / (1 + z)]);
      return [
        { label: R`\Lambda\text{CDM 基准（}\Omega_{\rm m}=0.3106\text{）}`, data: ref, color: "#7f7f7f", dash: "dot", width: 1.4 },
        { label: R`\text{当前参数：解 (8.75)}`, data: exact, color: "#c0392b", width: 2.6 },
        { label: R`\text{近似 }f=\Omega_{\rm m}(z)^{0.55}`, data: approx, color: "#2c4a6e", dash: "dash", width: 1.6 },
        { label: R`\text{物质主导（}f=1,\ D\propto a\text{）}`, data: eds, color: "#2c6e49", dash: "dashdot", width: 1.2 },
        { label: R`f\sigma_8(0.57)=${f3(P.fGrowth(0.57, pp) * p.s8 * Dratio(0.57, pp))},\ f(0)=${f3(P.fGrowth(0, pp))}\ (\Omega_{\rm m}^{0.55}=${f3(P.fApprox(0, pp))})`, f: () => NaN },
      ];
    }}
    samples={60} height={360} />;
}
// D(z)/D(0)：w = −1 用积分解 (8.77)，否则数值解 (8.75)
const GCACHE = new Map();
function Dratio(z, pp) {
  const w = pp.w ?? -1, Om = pp.Om ?? P.FID.Om;
  if (w === -1) return P.Dplus(z, { Om }) / P.Dplus(0, { Om });
  const key = Om.toFixed(4) + "," + w.toFixed(3);
  if (!GCACHE.has(key)) GCACHE.set(key, P.growthW(Om, w));
  const g = GCACHE.get(key), a = 1 / (1 + z);
  let i = g.a.findIndex(x => x >= a); if (i < 1) i = g.a.length - 1;
  const t = (a - g.a[i - 1]) / (g.a[i] - g.a[i - 1]);
  return (g.D[i - 1] + t * (g.D[i] - g.D[i - 1])) / g.D[g.D.length - 1];
}

// ---------- 4. 图 11.6 / 11.7 交互版：Alcock–Paczyński 与 BAO ----------
const XI = new Map();
function xiTrue(sm) {                       // r²ξ 用的真实 ξ(r)，r = 20…200 h⁻¹Mpc
  const key = sm.toFixed(1);
  if (!XI.has(key)) { const rs = Array.from({ length: 181 }, (_, i) => 20 + i); XI.set(key, { rs, xi: P.xiOf(pk(0), rs, { smooth: sm }) }); }
  return XI.get(key);
}
const interpLin = (xs, ys, x) => { if (x <= xs[0]) return ys[0]; if (x >= xs[xs.length - 1]) return ys[ys.length - 1]; const i = Math.floor(x - xs[0]); const t = x - xs[i]; return ys[i] + t * (ys[i + 1] - ys[i]); };
export function BAOAP({ view = "both" }) {
  const [zb, setZb] = useState(0.57), [OmT, setOmT] = useState(0.3106), [wT, setWT] = useState(-1), [OmF, setOmF] = useState(0.25), [Sig, setSig] = useState(0);
  const al = useMemo(() => P.alphas(zb, { Om: OmT, w: wT }, { Om: OmF, w: -1 }), [zb, OmT, wT, OmF]);
  const { aperp, apar } = al, aiso = Math.cbrt((1 + aperp) ** 2 * (1 + apar)) - 1;
  const rsT = 101.5;                         // EH98 声视界 s = 150 Mpc ≈ 101.5 h⁻¹Mpc
  // 环：真实半径 r_s，观测（基准宇宙学）中横向 ×(1+α⊥)、视向 ×(1+α∥)
  const W = 680, H = 330, cx = 190, cy = 168, sc = 1.0;
  const amp = 4;                              // 形变放大倍数（仅示意）
  const clampR = v => Math.max(8, Math.min(cy - 10, v));
  const rx = clampR(rsT * sc * (1 + amp * aperp)), ry = clampR(rsT * sc * (1 + amp * apar));
  const ring = (
    <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
      <line x1={cx} x2={cx} y1={30} y2={H - 6} stroke="#ddd" />
      <line x1={cx - 160} x2={cx + 160} y1={cy} y2={cy} stroke="#ddd" />
      <circle cx={cx} cy={cy} r={rsT * sc} fill="none" stroke="#888" strokeDasharray="6 4" strokeWidth={1.5} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#c0392b" strokeWidth={2.4} />
      <ST x={cx + 6} y={6} w={120} tex={R`x^3\ (\text{视线})`} />
      <ST x={cx + 140} y={cy - 26} w={60} tex={R`x^{1,2}`} />
      <ST x={380} y={30} w={300} tex={R`\alpha_\perp=\sym{ch11-dchi}{\delta\chi}/\chi_{\rm fid}=${f3(aperp)}`} />
      <ST x={380} y={58} w={300} tex={R`\alpha_\parallel=\sym{ch11-dH}{\delta H}/H_{\rm fid}=${f3(apar)}`} />
      <ST x={380} y={86} w={300} tex={R`\chi(\bar z)=${f2(al.chiT)},\ \chi_{\rm fid}(\bar z)=${f2(al.chiF)}\,h^{-1}\mathrm{Mpc}`} />
      <ST x={380} y={114} w={300} tex={R`H/H_0=${f3(al.HT)},\ H_{\rm fid}/H_0=${f3(al.HF)}`} />
      <ST x={380} y={142} w={300} tex={R`\text{观测环：横向 }r_s(1+\alpha_\perp),\ \text{视向 }r_s(1+\alpha_\parallel)`} />
      <ST x={380} y={170} w={300} tex={R`\text{AP 比 }(1+\alpha_\parallel)/(1+\alpha_\perp)=${f3((1 + apar) / (1 + aperp))}`} />
      <ST x={380} y={198} w={300} tex={R`\alpha_{\rm iso}=[(1+\alpha_\perp)^2(1+\alpha_\parallel)]^{1/3}-1=${f3(aiso)}`} />
      <ST x={380} y={236} w={300} tex={R`\text{虚线：真实；红：观测（形变}\times${amp}\text{）}`} color="#666" />
    </svg>);
  const xiPlot = view !== "ring" && <Plot
    x={{ label: R`r_{\rm obs}\ [h^{-1}\mathrm{Mpc}]`, domain: [60, 150] }}
    y={{ label: R`r_{\rm obs}^2\,\xi_0(r_{\rm obs})\ [(h^{-1}\mathrm{Mpc})^2]` }}
    series={() => {
      const { rs, xi } = xiTrue(Math.max(Sig, 2));
      const xr = r => interpLin(rs, xi, r);
      // 观测单极：ξ_obs(r_obs, μ_obs) = ξ(|x(x_obs)|)，x = ((1−α⊥)x⊥, (1−α∥)x∥)，对 μ_obs 平均
      const mus = Array.from({ length: 24 }, (_, i) => (i + 0.5) / 24);
      const obs = r => mus.reduce((s, m) => s + xr(r * Math.hypot((1 - apar) * m, (1 - aperp) * Math.sqrt(1 - m * m))), 0) / mus.length;
      const rr = Array.from({ length: 181 }, (_, i) => 60 + i * 0.5);
      const pk1 = arr => { let b = -1e9, rb = 0; for (const [r, v] of arr) if (r > 85 && r < 125 && v > b) { b = v; rb = r; } return rb; };
      const dT = rr.map(r => [r, r * r * xr(r)]), dO = rr.map(r => [r, r * r * obs(r)]);
      return [
        { label: R`\text{真实宇宙学：峰 }r=${pk1(dT).toFixed(1)}`, data: dT, color: "#7f7f7f", dash: "dash", width: 1.8 },
        { label: R`\text{基准宇宙学中测得：峰 }r_{\rm obs}=${pk1(dO).toFixed(1)}\ (\text{预期 }\times${f3(1 + aiso)})`, data: dO, color: "#c0392b", width: 2.6 },
      ];
    }}
    samples={10} height={300} />;
  const pPlot = view !== "ring" && <Plot
    x={{ label: R`k_{\rm obs}\ [h\,\mathrm{Mpc^{-1}}]`, domain: [0.02, 0.3] }}
    y={{ label: R`P^{(0)}/P^{(0)}_{\rm nw}`, domain: [0.9, 1.1] }}
    series={() => {
      const Pw = pk(zb), Pn = pk(zb, false), damp = k => Math.exp(-0.5 * (k * Sig) ** 2);
      const Pd = k => Pn(k) + (Pw(k) - Pn(k)) * damp(k);
      const fz = P.fGrowth(zb), opt = { b: 2, f: fz, aperp, apar };
      const ks = Array.from({ length: 141 }, (_, i) => 0.02 + i * 0.002);
      const ratio = (o) => ks.map(k => [k, P.obsMultipole(0, k, Pd, o) / P.obsMultipole(0, k, Pn, o)]);
      return [
        { label: R`\alpha=0\ (\text{真实})`, data: ratio({ b: 2, f: fz }), color: "#7f7f7f", dash: "dash", width: 1.6 },
        { label: R`\text{观测：}\alpha_\perp=${f3(aperp)},\ \alpha_\parallel=${f3(apar)}`, data: ratio(opt), color: "#c0392b", width: 2.4 },
      ];
    }}
    samples={10} height={280} />;
  return (
    <div className="plot card">
      <div className="plot-params">
        <Slider label={R`\bar z=${f2(zb)}`} min={0.1} max={2} step={0.01} value={zb} set={setZb} />
        <Slider label={R`\Omega_{\rm m}^{\rm true}=${f3(OmT)}`} min={0.2} max={0.45} step={0.005} value={OmT} set={setOmT} />
        <Slider label={R`w^{\rm true}=${f2(wT)}`} min={-1.5} max={-0.5} step={0.01} value={wT} set={setWT} />
        <Slider label={R`\Omega_{\rm m}^{\rm fid}=${f3(OmF)}\ (w^{\rm fid}=-1)`} min={0.2} max={0.45} step={0.005} value={OmF} set={setOmF} />
        {view !== "ring" && <Slider label={R`\Sigma_{\rm nl}=${f2(Sig)}\,h^{-1}\mathrm{Mpc}`} min={0} max={12} step={0.5} value={Sig} set={setSig} />}
        <button className="plot-reset" onClick={() => { setZb(0.57); setOmT(0.3106); setWT(-1); setOmF(0.25); setSig(0); }}>重置</button>
      </div>
      {ring}
      {xiPlot}
      {pPlot}
    </div>);
}

// ---------- 5. 图 11.8 交互版：Limber 近似的核 k²j_l(kχ)j_l(kχ') ----------
export function LimberKernel() {
  return <Plot
    x={{ label: R`k\chi/(l+1/2)`, domain: [0.3, 2.5] }}
    y={{ label: R`(k\chi)^2 j_l(k\chi)\,j_l(k\chi')`, domain: [-0.7, 1.1] }}
    params={[
      { id: "l", label: R`l`, min: 2, max: 300, step: 1, value: 30 },
      { id: "r", label: R`\chi'/\chi`, min: 0.8, max: 1.2, step: 0.002, value: 1 },
    ]}
    series={p => {
      const l = Math.round(p.l), L = l + 0.5;
      const g = u => { const x = u * L; return x * x * P.sphj(l, x) * P.sphj(l, x * p.r); };
      let mx = 0, um = 0; for (let u = 0.3; u < 2.5; u += 0.002) { const v = (u * L) ** 2 * P.sphj(l, u * L) ** 2; if (v > mx) { mx = v; um = u; } }
      // 积分 ∫ x² j_l j_l' dx 的相对大小（χ'≠χ 时的相消）
      let I1 = 0, I0 = 0; const du = 0.001; for (let u = 0.3; u < 2.5; u += du) { I1 += g(u) * du; const x = u * L; I0 += x * x * P.sphj(l, x) ** 2 * du; }
      return [
        { label: R`\chi'=\chi`, f: u => (u * L) ** 2 * P.sphj(l, u * L) ** 2 / mx, color: "#7f7f7f", dash: "dash", width: 1.4 },
        { label: R`\chi'/\chi=${p.r.toFixed(3)}`, f: u => g(u) / mx, color: "#c0392b", width: 2.4 },
        { label: R`\text{峰位 }k\chi=${f2(um * L)}\ \ (l+\tfrac12=${f2(L)},\ \sqrt{l(l+1)}=${f2(Math.sqrt(l * (l + 1)))})`, f: () => NaN },
        { label: R`\textstyle\int(\cdots)\,d(k\chi)\ \text{与 }\chi'{=}\chi\text{ 之比：}${f3(I1 / I0)}`, f: () => NaN },
      ];
    }}
    samples={500} height={360} />;
}

// ---------- 6. 图 11.9 交互版：Limber C_g(l) → w_g(θ) ----------
const LG = Array.from({ length: 121 }, (_, i) => Math.exp(i * Math.log(1e5) / 120));
export function WthetaPlot() {
  return <Plot
    x={{ label: R`\theta\ [\mathrm{arcmin}]`, log: true, domain: [2.5, 250] }}
    y={{ label: R`\theta\,w_{\rm g}(\theta)\ [\mathrm{arcmin}]`, domain: [0, 1.5] }}
    params={[
      { id: "b", label: R`b_1`, min: 1, max: 2.5, step: 0.01, value: 1.65 },
      { id: "z", label: R`\bar z`, min: 0.2, max: 1.2, step: 0.01, value: 0.55 },
      { id: "dz", label: R`\sigma_z`, min: 0.02, max: 0.2, step: 0.005, value: 0.05 },
    ]}
    series={p => {
      const win = P.windowGauss(p.z, p.dz), Cl = P.limberCl(LG, win, { b: p.b, Pk0: pk(0) });
      const ths = Array.from({ length: 50 }, (_, i) => 2.5 * Math.pow(100, i / 49));
      const w = P.wTheta(ths.map(t => t / 60 * Math.PI / 180), LG, Cl);
      return [
        { label: R`\text{线性 Limber 预言（}W\text{ 为 Gaussian，中心 }\chi=${f2(win.c0)}\,h^{-1}\mathrm{Mpc}\text{）}`, data: ths.map((t, i) => [t, t * w[i]]), color: "#c0392b", width: 2.6 },
        { label: R`\text{峰值 }\theta w=${f3(Math.max(...ths.map((t, i) => t * w[i])))}`, f: () => NaN },
      ];
    }}
    vlines={p => { const c = P.chi(p.z); return [{ x: 8 / c * 180 / Math.PI * 60, label: R`8\,h^{-1}\mathrm{Mpc}` }]; }}
    samples={10} height={360} />;
}

// ---------- 7. 图 11.11 交互版：SZ 谱畸变 ----------
export function SZPlot() {
  const x0 = P.szNull(), T0 = 2.726, nuK = P.KT_OVER_H_GHZ_PER_K * T0;
  return <Plot
    x={{ label: R`x=p/k_{\rm B}T`, domain: [0.01, 10] }}
    y={{ label: R`I_\nu\propto x^3f\ \text{[a.u.]}`, domain: [-0.45, 1.6] }}
    params={[{ id: "y", label: R`y`, min: 0, max: 0.1, step: 0.001, value: 0.02 }]}
    series={p => {
      let mx = 0, xm = 0; for (let x = 0.5; x < 8; x += 0.002) { const v = P.IofX(x, p.y); if (v > mx) { mx = v; xm = x; } }
      return [
        { label: R`y=0`, f: x => P.IofX(x, 0), color: "#1f1b16", dash: "dot", width: 2 },
        { label: R`y=${p.y.toFixed(3)}\ (11.58)`, f: x => P.IofX(x, p.y), color: "#c0392b", width: 2.6 },
        { label: R`\Delta I=y\,x^3\frac{1}{x^2}\partial_x(x^4\partial_xf^{(0)})`, f: x => p.y * x ** 3 * P.gSZ(x), color: "#2c6e49", dash: "dash", width: 1.6 },
        { label: R`\text{峰：}x=${f2(xm)},\ I=${f3(mx)}\ (y{=}0:\ x=2.82,\ I=1.421)`, f: () => NaN },
        { label: R`\text{零点 }x_0=${f3(x0)}\Rightarrow\nu=x_0k_{\rm B}T_0/h=${(x0 * nuK).toFixed(1)}\,\mathrm{GHz}`, f: () => NaN },
      ];
    }}
    vlines={[{ x: x0, label: R`x_0=3.83` }]}
    samples={300} height={380} />;
}
