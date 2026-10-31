// 第 13 章交互图。数值函数见 _ch13_phys.jsx。已用 node 核对（基准 h=0.677、Ω_m=0.3106、σ8=0.81、n_s=0.968，EH98 + Halofit/Takahashi 2012）：
//  · CMB 透镜势 [L(L+1)]²C_φφ/2π 在 L=40 处 1.39e-7（与 Planck 标准值一致）；方均根偏折 2.4′，l_lens≈2000；
//  · 星系 z_s=1.5：l(l+1)C_κκ/2π 在 l=100、1000 处 2.5e-5、1.2e-4；原书图 13.7 约为其 4 倍（见正文勘误说明）；
//  · 星系–星系透镜（z_l≈0.22，z_s≈1.1，b1=1.5）γ_t(10′)=1.0e-3、γ_t(100′)=1.6e-4，与图 13.9 左上图橙色点吻合。
import { useEffect, useMemo, useRef, useState } from "react";
import { Plot, M, TxI, renderTex } from "@kit";
import * as P from "./_ch13_phys.jsx";

const R = String.raw;
const f3 = v => (Number.isFinite(v) ? (+v).toFixed(3) : R`\text{—}`);
const f2 = v => (Number.isFinite(v) ? (+v).toFixed(2) : R`\text{—}`);
const sci = (v, d = 2) => { if (!Number.isFinite(v)) return R`\text{—}`; if (v === 0) return "0"; if (Math.abs(v) >= 0.01 && Math.abs(v) < 1e4) return (+v).toPrecision(d + 1); const e = Math.floor(Math.log10(Math.abs(v))); return R`${(v / 10 ** e).toFixed(d)}\times10^{${e}}`; };

// ---------- 共享的宇宙学对象（按 Ω_m、σ8 缓存） ----------
const BGC = new Map();
function cosmoOf(Om = P.FID.Om, s8 = P.FID.s8) {
  const key = `${(+Om).toFixed(3)}|${(+s8).toFixed(3)}`;
  if (!BGC.has(key)) { const bg = P.background({ Om }), lin = P.linearPk({ Om, s8 }), hf = P.halofit(bg, lin); BGC.set(key, { bg, lin, hf, tabs: new Map(), kern: new Map() }); }
  return BGC.get(key);
}
function kernelOf(C, zs, sz, N = 110) {
  const key = `${(+zs).toFixed(3)}|${(+sz).toFixed(3)}|${N}`;
  if (!C.kern.has(key)) C.kern.set(key, P.lensKernel(C.bg, { zs, sz, N }));
  return C.kern.get(key);
}
function ckkOf(C, zs, sz, nonlinear = true) {
  const key = `${(+zs).toFixed(3)}|${(+sz).toFixed(3)}|${nonlinear}`;
  if (!C.tabs.has(key)) C.tabs.set(key, P.CkkTable(C.bg, C.hf, kernelOf(C, zs, sz), { n: 40, lmin: 1, lmax: 2e5, nonlinear }));
  return C.tabs.get(key);
}
const ST = ({ x, y, w, tex, color, center, right, size = 13 }) => <foreignObject x={x} y={y} width={w} height={24}>
  <div style={{ fontSize: size, lineHeight: "22px", color: color || "var(--ink)", textAlign: center ? "center" : right ? "right" : "left", whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} /></foreignObject>;
function Slider({ label, min, max, step, value, onChange, fmt = v => (+v).toFixed(2) }) {
  return <label className="plot-param"><span className="plot-plabel"><M>{`${label}=${fmt(value)}`}</M></span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} /></label>;
}

// ---------- 1. 剪切与会聚对源形状的作用（§13.4） ----------
const mat = { inv: ([[a, b], [c, d]]) => { const D = a * d - b * c; return [[d / D, -b / D], [-c / D, a / D]]; },
  mul: (A, B) => [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]], [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]],
  app: (A, [x, y]) => [A[0][0] * x + A[0][1] * y, A[1][0] * x + A[1][1] * y] };
function sqrtSym([[a, b], [, d]]) { // 2×2 对称正定矩阵的平方根
  const s = Math.sqrt(a * d - b * b), t = Math.sqrt(a + d + 2 * s); return [[(a + s) / t, b / t], [b / t, (d + s) / t]];
}
export function ShearDistortion() {
  const [k, setK] = useState(0.1), [g1, setG1] = useState(0.15), [g2, setG2] = useState(0), [e1, setE1] = useState(0), [e2, setE2] = useState(0);
  const A = [[1 - k - g1, -g2], [-g2, 1 - k + g1]], detA = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  const Ai = mat.inv(A);
  const qt = [[0.5 * (1 + e1), 0.5 * e2], [0.5 * e2, 0.5 * (1 - e1)]];          // q_true/q（迹归一）
  const qi = mat.mul(mat.mul(Ai, qt), Ai), tr = qi[0][0] + qi[1][1];
  const ep = [(qi[0][0] - qi[1][1]) / tr, 2 * qi[0][1] / tr];                      // 精确椭率 (13.36)
  const dot = e1 * g1 + e2 * g2;
  const lin = [(1 - 2 * dot) * e1 + 2 * g1, (1 - 2 * dot) * e2 + 2 * g2];        // (13.39)
  const lin40 = [e1 + 2 * g1, e2 + 2 * g2];                                         // (13.40)
  const gg = Math.hypot(g1, g2), red = gg / (1 - k);
  const qRatio = tr / 1, qLin = 1 + 2 * k + 2 * dot;                                // (13.38)
  const mu = 1 / detA, muLin = 1 + 2 * k;
  const W = 640, H = 330, cx = 165, cy = 165, sc = 62;
  const Lt = sqrtSym([[2 * qt[0][0], 2 * qt[0][1]], [2 * qt[1][0], 2 * qt[1][1]]]);  // 源边界：Lt·(cosφ, sinφ)
  const ring = Array.from({ length: 121 }, (_, i) => { const ph = 2 * Math.PI * i / 120; return mat.app(Lt, [Math.cos(ph), Math.sin(ph)]); });
  const toPath = (pts, ox) => pts.map(([x, y], i) => `${i ? "L" : "M"}${(ox + sc * x).toFixed(1)},${(cy - sc * y).toFixed(1)}`).join("") + "Z";
  const img = ring.map(p => mat.app(Ai, p));
  const grid = []; for (let v = -2; v <= 2; v += 0.5) { grid.push([[-2, v], [2, v]]); grid.push([[v, -2], [v, 2]]); }
  const line = (a, b, ox, M) => { const pa = M ? mat.app(M, a) : a, pb = M ? mat.app(M, b) : b; return <line x1={ox + sc * pa[0]} y1={cy - sc * pa[1]} x2={ox + sc * pb[0]} y2={cy - sc * pb[1]} stroke="#e3d9c6" strokeWidth={1} />; };
  // 像的主轴
  const ev = (() => { const a = qi[0][0], b = qi[0][1], d = qi[1][1], m = (a + d) / 2, r = Math.hypot((a - d) / 2, b); const ang = 0.5 * Math.atan2(2 * b, a - d); return { l1: m + r, l2: m - r, ang }; })();
  const axisRatio = Math.sqrt(ev.l2 / ev.l1);
  const ox2 = 475;
  const flipped = detA <= 0;
  return (
    <div className="plot card">
      <div className="plot-params">
        <Slider label={R`\kappa`} min={-0.3} max={0.5} step={0.01} value={k} onChange={setK} />
        <Slider label={R`\gamma_1`} min={-0.4} max={0.4} step={0.01} value={g1} onChange={setG1} />
        <Slider label={R`\gamma_2`} min={-0.4} max={0.4} step={0.01} value={g2} onChange={setG2} />
        <Slider label={R`\epsilon_1^{\rm true}`} min={-0.6} max={0.6} step={0.01} value={e1} onChange={setE1} />
        <Slider label={R`\epsilon_2^{\rm true}`} min={-0.6} max={0.6} step={0.01} value={e2} onChange={setE2} />
        <button className="plot-reset" onClick={() => { setK(0.1); setG1(0.15); setG2(0); setE1(0); setE2(0); }}>重置</button>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <defs><clipPath id="ch13sd1"><rect x={cx - 150} y={10} width={300} height={310} /></clipPath><clipPath id="ch13sd2"><rect x={ox2 - 150} y={10} width={300} height={310} /></clipPath></defs>
        <g clipPath="url(#ch13sd1)">{grid.map(([a, b], i) => <g key={i}>{line(a, b, cx)}</g>)}
          <path d={toPath(ring, cx)} fill="#f0b27a" fillOpacity={0.55} stroke="#c0601a" strokeWidth={2} /></g>
        <g clipPath="url(#ch13sd2)">{grid.map(([a, b], i) => <g key={i}>{line(a, b, ox2, Ai)}</g>)}
          <path d={toPath(ring, ox2)} fill="none" stroke="#c0601a" strokeWidth={1.2} strokeDasharray="4 4" />
          {!flipped && <path d={toPath(img, ox2)} fill="#5d8fc9" fillOpacity={0.5} stroke="#2c4a6e" strokeWidth={2} />}
          {!flipped && <line x1={ox2 - sc * 2.2 * Math.cos(ev.ang)} y1={cy + sc * 2.2 * Math.sin(ev.ang)} x2={ox2 + sc * 2.2 * Math.cos(ev.ang)} y2={cy - sc * 2.2 * Math.sin(ev.ang)} stroke="#2c4a6e" strokeDasharray="2 3" />}
        </g>
        <rect x={cx - 150} y={10} width={300} height={310} className="plot-frame" />
        <rect x={ox2 - 150} y={10} width={300} height={310} className="plot-frame" />
        <ST x={cx - 145} y={12} w={290} tex={R`\text{源平面 }\boldsymbol\theta_S\text{（无透镜时的样子）}`} />
        <ST x={ox2 - 145} y={12} w={290} tex={R`\text{像平面 }\boldsymbol\theta=A^{-1}\boldsymbol\theta_S\text{（观测到的样子）}`} />
        <path d={`M${cx + 160},${cy} L${ox2 - 160},${cy}`} stroke="#888" strokeWidth={1.5} markerEnd="" />
        <ST x={cx + 152} y={cy - 26} w={6 + ox2 - cx - 304} tex={R`A^{-1}`} center />
        {flipped && <ST x={ox2 - 140} y={cy - 10} w={280} tex={R`|A|\le0\text{：已越过临界曲线（强透镜，像翻转）}`} color="#c0392b" />}
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <p style={{ margin: "0.2em 0" }}><TxI>{R`$A=\begin{pmatrix}${f3(A[0][0])}&${f3(A[0][1])}\\${f3(A[1][0])}&${f3(A[1][1])}\end{pmatrix}$，放大率 $\mu=|A|^{-1}=${f3(mu)}$（线性 $1+2\kappa=${f3(muLin)}$）；像的面积比 $q/q_{\rm true}=${f3(qRatio)}$（\eqref{13.38} 线性：${f3(qLin)}）。`}</TxI></p>
        <p style={{ margin: "0.2em 0" }}><TxI>{R`像的椭率（精确，由 \eqref{13.36}）：$(\epsilon_1,\epsilon_2)=(${f3(ep[0])},${f3(ep[1])})$；\eqref{13.39}：$(${f3(lin[0])},${f3(lin[1])})$；\eqref{13.40}：$(${f3(lin40[0])},${f3(lin40[1])})$。`}</TxI></p>
        <p style={{ margin: "0.2em 0" }}><TxI>{R`约化剪切 $|g|=|\gamma|/(1-\kappa)=${f3(red)}$；像的轴比 $b/a=${f3(axisRatio)}$${Math.abs(e1) + Math.abs(e2) < 1e-9 && !flipped ? R`（圆形源：$(1-|g|)/(1+|g|)=${f3((1 - red) / (1 + red))}$，$|\epsilon|=2|g|/(1+|g|^2)=${f3(2 * red / (1 + red * red))}$）` : ""}；长轴方位角 $${f2(ev.ang * 180 / Math.PI)}^\circ$（剪切方向角 $\frac12\arctan(\gamma_2/\gamma_1)=${f2(0.5 * Math.atan2(g2, g1) * 180 / Math.PI)}^\circ$）。`}</TxI></p>
      </div>
      <div className="plot-cap"><TxI>{R`左：源平面上的源（橙色，内禀椭率可调）与参考网格。右：同一网格与源经 $A^{-1}$ 映到像平面（蓝色为观测到的像，虚线为原形状）。会聚 $\kappa$ 只放大，剪切 $\gamma$ 拉伸成椭圆；改变 $\kappa$ 而保持约化剪切 $g$ 不变，椭率不变——这就是"质量片简并"（mass-sheet degeneracy）的由来。`}</TxI></div>
    </div>);
}

// ---------- 2. 透镜核 g_L(χ) 与透镜效率（§13.2、§13.5.1） ----------
export function KernelPlot() {
  return <Plot
    x={{ label: R`z\ \text{（透镜所在红移）}`, log: true, domain: [0.01, 1100] }}
    y={{ label: R`\text{核（归一化）}`, domain: [0, 1.08] }}
    params={[
      { id: "zs", label: R`z_S`, min: 0.2, max: 4, step: 0.05, value: 1 },
      { id: "sz", label: R`\sigma_z`, min: 0, max: 0.5, step: 0.01, value: 0 },
    ]}
    series={p => {
      const C = cosmoOf(), bg = C.bg;
      const K = kernelOf(C, p.zs, p.sz, 300), Kc = kernelOf(C, 1089, 0, 400);
      const eff = (KK) => KK.Wk.map((v, i) => v * bg.growth(KK.z[i]));
      const E = eff(K), Ec = eff(Kc), mE = Math.max(...E), mEc = Math.max(...Ec), mW = Math.max(...K.W) || 1;
      const ip = E.indexOf(mE), ipc = Ec.indexOf(mEc);
      const pts = (KK, arr, norm) => KK.z.map((z, i) => [z, arr[i] / norm]).filter(([z]) => z > 0.01);
      const out = [
        { label: R`g_{\rm L}\ \text{(13.49)}`, data: pts(K, K.g, 1), color: "#2c4a6e", width: 2.2 },
        { label: R`\text{有效权重 }\chi g_{\rm L}D_+/a\ \text{（归一化）}`, data: pts(K, E, mE), color: "#d35400", width: 3 },
        { label: R`\text{CMB（}z_S{=}1089\text{）有效权重}`, data: pts(Kc, Ec, mEc), color: "#c0392b", dash: "dot", width: 2 },
      ];
      if (p.sz > 0) out.push({ label: R`\text{源分布 }W(\chi)\ \text{（归一化）}`, data: pts(K, K.W, mW), color: "#2c6e49", dash: "dash", width: 1.6 });
      out.push({ label: R`\text{峰值：}z=${f2(K.z[ip])},\ \chi/\chi_S=${f3(K.chi[ip] / K.chiS)}\ (\chi_S=${Math.round(K.chiS)}\,\mathrm{Mpc});\ \text{CMB 峰 }z=${f2(Kc.z[ipc])}`, f: () => NaN });
      return out;
    }}
    vlines={p => [{ x: p.zs, label: R`z_S` }]}
    samples={10} height={380}
    caption={R`蓝线：透镜核 $g_{\rm L}$（\eqref{13.49}），单一源面时为 $1-\chi/\chi_S$。橙线：会聚的有效权重 $\frac32\Omega_{\rm m}H_0^2\,\chi g_{\rm L}(\chi)/a$ 再乘以增长因子 $D_+(z)$（以今天的 $\delta_{\rm m}$ 为准，每单位共动距离），归一化到峰值 1：它在源与观测者的"中点"附近最大。红色点线是 CMB 的同一权重，峰在 $z\sim2$–$5$。把 $\sigma_z$ 调大模拟光度红移的源分布，核变宽、峰略向低红移移动。`} />;
}

// ---------- 3. 点质量透镜：Einstein 环与几何（图 13.2 交互版） ----------
export function PointLens() {
  const [lM, setLM] = useState(12.5), [zl, setZl] = useState(0.5), [zs, setZs] = useState(2), [beta, setBeta] = useState(0.35), [rs, setRs] = useState(0.15);
  const cvs = useRef(null);
  const bg = cosmoOf().bg;
  const thE = P.einsteinRadius(bg, 10 ** lM, zl, zs);
  const ok = thE > 0;
  const tp = (beta + Math.sqrt(beta * beta + 4)) / 2, tm = (beta - Math.sqrt(beta * beta + 4)) / 2;   // 以 θ_E 为单位
  const mup = 1 / (1 - tp ** -4), mum = 1 / (1 - tm ** -4), mut = beta > 0 ? (beta * beta + 2) / (beta * Math.sqrt(beta * beta + 4)) : Infinity;
  const FOV = 2.4, NPX = 300;
  useEffect(() => {
    const c = cvs.current; if (!c) return; const ctx = c.getContext("2d"); const im = ctx.createImageData(NPX, NPX);
    for (let j = 0; j < NPX; j++) for (let i = 0; i < NPX; i++) {
      const x = (i + 0.5) / NPX * 2 * FOV - FOV, y = FOV - (j + 0.5) / NPX * 2 * FOV, r2 = x * x + y * y;
      let col = [250, 247, 240];
      if (ok) { const bx = x - x / r2, by = y - y / r2, d2 = (bx - beta) ** 2 + by * by;
        if (d2 < rs * rs) { const t = 1 - d2 / (rs * rs); col = [214 - 40 * t, 110 - 30 * t, 40]; } }
      const k = 4 * (j * NPX + i); im.data[k] = col[0]; im.data[k + 1] = col[1]; im.data[k + 2] = col[2]; im.data[k + 3] = 255;
    }
    ctx.putImageData(im, 0, 0);
    const s = NPX / (2 * FOV), o = NPX / 2;
    ctx.setLineDash([4, 4]); ctx.strokeStyle = "#2c4a6e"; ctx.beginPath(); ctx.arc(o, o, s, 0, 2 * Math.PI); ctx.stroke();
    ctx.strokeStyle = "#c0601a"; ctx.beginPath(); ctx.arc(o + beta * s, o, rs * s, 0, 2 * Math.PI); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "#5d8fc9"; ctx.beginPath(); ctx.arc(o, o, 5, 0, 2 * Math.PI); ctx.fill();
  }, [beta, rs, ok]);
  // 侧视几何（夸张角度）：观测者在下，透镜面高度 ∝ χ_L/χ_S
  const cl = bg.chiOf(zl), cs = bg.chiOf(zs), fr = ok ? cl / cs : 0.5;
  const GW = 260, GH = 300, ox = 130, oy = 285, top = 20, Hs = oy - top, xs = 28;          // xs：每 θ_E 的横向像素（在源平面）
  const yL = oy - fr * Hs, X = (ang, h) => ox + ang * xs * (h / Hs);                       // 视线角 ang（θ_E 单位）在高度 h 处的横坐标
  const ray = t => { const xl = X(t, oy - yL); return `M${ox},${oy} L${xl.toFixed(1)},${yL.toFixed(1)} L${(ox + beta * xs).toFixed(1)},${top}`; };
  return (
    <div className="plot card">
      <div className="plot-params">
        <Slider label={R`\log_{10}(M/M_\odot)`} min={9} max={15.5} step={0.05} value={lM} onChange={setLM} />
        <Slider label={R`z_L`} min={0.05} max={2} step={0.01} value={zl} onChange={setZl} />
        <Slider label={R`z_S`} min={0.1} max={4} step={0.01} value={zs} onChange={setZs} />
        <Slider label={R`\beta/\theta_E`} min={0} max={2} step={0.01} value={beta} onChange={setBeta} />
        <Slider label={R`r_{\rm src}/\theta_E`} min={0.03} max={0.6} step={0.01} value={rs} onChange={setRs} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
        <div><canvas ref={cvs} width={NPX} height={NPX} style={{ width: NPX, height: NPX, border: "1px solid var(--line)" }} />
          <div className="muted" style={{ fontSize: 13, width: NPX }}><TxI>{R`天空（像平面），视场 $\pm${FOV}\,\theta_E$。蓝虚线：Einstein 环；橙虚线：无透镜时源的位置；蓝点：透镜。`}</TxI></div></div>
        <svg viewBox={`0 0 ${GW} ${GH}`} style={{ width: GW, height: GH }}>
          <line x1={ox} y1={oy} x2={ox} y2={top} stroke="#999" strokeDasharray="2 3" />
          <line x1={20} x2={GW - 10} y1={yL} y2={yL} stroke="#bbb" />
          <line x1={20} x2={GW - 10} y1={top} y2={top} stroke="#bbb" />
          {ok && <><path d={ray(tp)} fill="none" stroke="#2c4a6e" strokeWidth={1.8} /><path d={ray(tm)} fill="none" stroke="#2c4a6e" strokeWidth={1.8} />
            <line x1={ox} y1={oy} x2={X(tp, Hs)} y2={top} stroke="#2c4a6e" strokeDasharray="3 3" /><line x1={ox} y1={oy} x2={X(tm, Hs)} y2={top} stroke="#2c4a6e" strokeDasharray="3 3" /></>}
          <ellipse cx={ox} cy={yL} rx={12} ry={5} fill="#9fc1e8" />
          <circle cx={ox + beta * xs} cy={top} r={5} fill="#d35400" />
          <circle cx={ox} cy={oy} r={4} fill="#5d8fc9" />
          <ST x={ox + 8} y={oy - 14} w={100} tex={R`\text{观测者}`} size={12} />
          <ST x={GW - 75} y={yL - 22} w={70} tex={R`\text{透镜面}`} size={12} />
          <ST x={GW - 75} y={top - 2} w={70} tex={R`\text{源平面}`} size={12} />
        </svg>
      </div>
      <div className="plot-legend" style={{ display: "block" }}>
        <p style={{ margin: "0.2em 0" }}><TxI>{ok ? R`$\theta_E=\sqrt{\dfrac{4GM}{c^2}\dfrac{D_{LS}}{D_LD_S}}=${f3(thE / P.ARCSEC)}''$（$\chi_L=${Math.round(cl)}$、$\chi_S=${Math.round(cs)}\,\mathrm{Mpc}$）。两个像：$\theta_\pm=${f3(tp)}\,\theta_E$ 与 $${f3(tm)}\,\theta_E$，即 $${f2(tp * thE / P.ARCSEC)}''$、$${f2(tm * thE / P.ARCSEC)}''$；放大率 $\mu_+=${f2(mup)}$、$\mu_-=${f2(mum)}$（负号＝像翻转），总放大 $${f2(mut)}$。` : R`源必须在透镜之后（$z_S>z_L$）才有透镜效应。`}</TxI></p>
        <p style={{ margin: "0.2em 0" }}><TxI>{R`$\beta\gg\theta_E$ 时进入弱透镜区：像只被轻微切向拉伸，$\gamma_t=\theta_E^2/(2\theta^2)$、$\kappa=0$（点质量外）——这正是 \figref{13.2} 右图的弧变成"微微拉长的椭圆"。`}</TxI></p>
      </div>
      <div className="plot-cap"><TxI>{R`点质量透镜方程 $\boldsymbol\theta_S=\boldsymbol\theta-\theta_E^2\boldsymbol\theta/|\boldsymbol\theta|^2$（由 \eqref{13.67} 取 $\Sigma\propto\delta_{\rm D}^{(2)}$，并按 $\phi_{\rm L}$ 的约定修正整体符号，见 \exref{13.4}）。左图对每个像素反向追踪光线：若落在源盘内就着色——源靠近透镜正后方时拉成两段切向弧，$\beta=0$ 时成为完整的 Einstein 环。右图是侧视示意（角度极度夸张，同 \figref{13.4}）：实线为真实光路，在透镜面折转；虚线是观测者"以为"的直线方向，指向比真实源更远离透镜的视位置。`}</TxI></div>
    </div>);
}

// ---------- 4. 图 13.7 交互版：C_EE(l) ----------
export function CkkPlot() {
  return <Plot
    x={{ label: R`l`, log: true, domain: [2, 5000] }}
    y={{ label: R`l(l+1)C_{EE}(l)/2\pi`, log: true, domain: [1e-8, 3e-2] }}
    params={[
      { id: "zs", label: R`z_S`, min: 0.3, max: 3, step: 0.05, value: 1.5 },
      { id: "sz", label: R`\sigma_z`, min: 0, max: 0.5, step: 0.05, value: 0.2 },
      { id: "Om", label: R`\Omega_{\rm m}`, min: 0.2, max: 0.45, step: 0.01, value: 0.31 },
      { id: "s8", label: R`\sigma_8`, min: 0.6, max: 1.0, step: 0.01, value: 0.81 },
      { id: "fac", label: R`\text{纵轴乘数（原书图疑为 4）}`, min: 1, max: 4, step: 3, value: 1 },
    ]}
    series={p => {
      const C = cosmoOf(p.Om, p.s8), g = ckkOf(C, p.zs, p.sz, true), gl = ckkOf(C, p.zs, p.sz, false), cm = ckkOf(C, 1089, 0, true), cml = ckkOf(C, 1089, 0, false);
      const D = (T, l) => p.fac * l * (l + 1) / (2 * Math.PI) * T.at(l);
      return [
        { label: R`\text{星系 }z_S=${f2(p.zs)}\text{（Halofit）}`, f: l => D(g, l), color: "#1f1b16", width: 2.4 },
        { label: R`\text{星系（线性 }P\text{）}`, f: l => D(gl, l), color: "#1f1b16", dash: "dash", width: 1.2 },
        { label: R`\text{CMB }z_S=1089\text{（Halofit）}`, f: l => D(cm, l), color: "#c0392b", dash: "dot", width: 2.4 },
        { label: R`\text{CMB（线性）}`, f: l => D(cml, l), color: "#c0392b", dash: "dash", width: 1.2 },
        { label: R`l=1000:\ \text{星系 }${sci(D(g, 1000))},\ \text{CMB }${sci(D(cm, 1000))};\ \text{非线性/线性}=${f2(g.at(1000) / gl.at(1000))}`, f: () => NaN },
      ];
    }}
    samples={70} height={400} />;
}

// ---------- 5. 图 13.8 交互版：ξ±(θ) ----------
export function XiPlot() {
  return <Plot
    x={{ label: R`\theta\ [\mathrm{arcmin}]`, log: true, domain: [2, 300] }}
    y={{ label: R`\xi_\pm(\theta)`, log: true, domain: [1e-8, 2e-4] }}
    params={[
      { id: "zs", label: R`z_S`, min: 0.3, max: 2, step: 0.05, value: 0.6 },
      { id: "sz", label: R`\sigma_z`, min: 0.05, max: 0.5, step: 0.05, value: 0.3 },
      { id: "s8", label: R`\sigma_8`, min: 0.6, max: 1.0, step: 0.01, value: 0.81 },
    ]}
    series={p => {
      const C = cosmoOf(P.FID.Om, p.s8), T = ckkOf(C, p.zs, p.sz, true);
      const xp = am => P.xiPM(T.at, am * P.ARCMIN, 0, { N: 3000 }), xm = am => P.xiPM(T.at, am * P.ARCMIN, 4, { N: 3000 });
      return [
        { label: R`\xi_+=\int\frac{l\,dl}{2\pi}J_0(l\theta)C_{EE}`, f: xp, color: "#2c4a6e", width: 2.4 },
        { label: R`\xi_-=\int\frac{l\,dl}{2\pi}J_4(l\theta)C_{EE}`, f: xm, color: "#d35400", width: 2.4, dash: "dash" },
        { label: R`\xi_+(10')=${sci(xp(10))},\ \xi_-(10')=${sci(xm(10))}`, f: () => NaN },
      ];
    }}
    samples={36} height={380} />;
}

// ---------- 6. 图 13.9 交互版：星系–星系透镜 γ_t(θ) ----------
const GGL = new Map();
export function GammaTPlot() {
  return <Plot
    x={{ label: R`\theta\ [\mathrm{arcmin}]`, log: true, domain: [2.5, 250] }}
    y={{ label: R`\gamma_t(\theta)`, log: true, domain: [1e-6, 1e-2] }}
    params={[
      { id: "zl", label: R`z_L`, min: 0.1, max: 0.9, step: 0.025, value: 0.225 },
      { id: "b1", label: R`b_1`, min: 0.8, max: 2.5, step: 0.05, value: 1.5 },
    ]}
    series={p => {
      const C = cosmoOf(), SRC = [[0.315, 0.06, "#3b3b98"], [0.53, 0.05, "#7d3c98"], [0.765, 0.07, "#b03a6b"], [1.1, 0.1, "#e08a3c"]];
      const Lg = P.lensSample(C.bg, { zl: p.zl, szl: 0.04 });
      const lgrid = Array.from({ length: 36 }, (_, i) => 10 ** (0 + 5.2 * i / 35)), LL = lgrid.map(Math.log);
      return SRC.map(([zs, sz, col]) => {
        const key = `${(+p.zl).toFixed(3)}|${zs}`;
        if (!GGL.has(key)) GGL.set(key, lgrid.map(l => P.CgE(C.bg, C.hf, Lg, kernelOf(C, zs, sz, 120), l, 1)));
        const cs = GGL.get(key), lc = cs.map(v => Math.log(Math.max(v, 1e-300)));
        const at = l => { const x = Math.log(l); let i = Math.max(0, Math.min(34, Math.floor((x - LL[0]) / (LL[35] - LL[0]) * 35))); const u = (x - LL[i]) / (LL[i + 1] - LL[i]); return Math.exp(lc[i] * (1 - u) + lc[i + 1] * u); };
        return { label: R`z_S\approx${zs}`, f: am => p.b1 * P.xiPM(at, am * P.ARCMIN, 2, { N: 2500 }), color: col, width: 2.2 };
      });
    }}
    samples={30} height={380} />;
}
