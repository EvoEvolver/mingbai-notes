// 第 10 章交互图。数值函数见 _ch10_phys.jsx（已用 node 核对，见该文件头注释）。
import { useMemo, useState } from "react";
import { Plot, M, TxI, renderTex } from "@kit";
import * as P from "./_ch10_phys.jsx";

const R = String.raw;
const DEG = Math.PI / 180;
const f2 = v => (Math.abs(v) < 5e-4 ? "0.000" : (+v).toFixed(3));
const fd = v => (+v).toFixed(1);
const INK = "#1f1b16", HOT = "#c0392b", COLD = "#2c5d9e", MUTED = "#8a8073";
const ST = ({ x, y, w = 160, tex, color, align = "left", size = 13 }) => <foreignObject x={align === "center" ? x - w / 2 : align === "right" ? x - w : x} y={y - 12} width={w} height={26}>
  <div style={{ fontSize: size, lineHeight: "24px", color: color || "var(--ink)", textAlign: align, whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} /></foreignObject>;
const Slider = ({ tex, min, max, step, value, set }) => <label className="plot-param"><span className="plot-plabel"><M>{tex}</M></span>
  <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(+e.target.value)} /></label>;
const Btn = ({ on, children, onClick }) => <button className="plot-reset" style={on ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" } : null} onClick={onClick}>{children}</button>;
const Note = ({ children }) => <p style={{ margin: "0.3em 0" }}><TxI>{children}</TxI></p>;
// 发散色标：v ∈ [-1, 1] → 蓝–白–红
const div = v => { const t = Math.max(-1, Math.min(1, v)); const a = Math.abs(t); const [r, g, b] = t > 0 ? [192, 57, 43] : [44, 93, 158]; const m = c => Math.round(255 + (c - 255) * a); return `rgb(${m(r)},${m(g)},${m(b)})`; };
// 无头矢量（偏振棒）：中心 (cx, cy)，屏幕坐标 y 向下，所以角度取负
const Bar = ({ cx, cy, ang, len, color = INK, w = 2.4 }) => { const dx = Math.cos(ang) * len, dy = -Math.sin(ang) * len; return <line x1={cx - dx} y1={cy - dy} x2={cx + dx} y2={cy + dy} stroke={color} strokeWidth={w} strokeLinecap="round" />; };

// =====================================================================
// 1. 图 10.1 / 10.2 交互版：Stokes 参数、偏振片与坐标旋转
// =====================================================================
export function StokesWidget() {
  const [psi, setPsi] = useState(30), [p, setP] = useState(0.6), [al, setAl] = useState(0), [ph, setPh] = useState(0);
  const I = 1, Q = p * I * Math.cos(2 * psi * DEG), U = p * I * Math.sin(2 * psi * DEG);
  // 坐标轴绕视线转 α（被动转动）后的分量
  const c2 = Math.cos(2 * al * DEG), s2 = Math.sin(2 * al * DEG), Qp = Q * c2 + U * s2, Up = -Q * s2 + U * c2;
  const Idet = phi => I + Q * Math.cos(2 * phi) + U * Math.sin(2 * phi);           // 由 (10.1)、(10.2)，m̂ = (cosφ, sinφ)
  const IdetP = phi => I + Qp * Math.cos(2 * phi) + Up * Math.sin(2 * phi);        // 新坐标中 φ' = φ - α
  const W = 680, H = 345, cx = 160, cy = 150, Rr = 110;
  const a = Rr * Math.sqrt((1 + p) / 2), b = Rr * Math.sqrt((1 - p) / 2);          // 半轴 ∝ √I_max、√I_min
  const axis = (ang, lab, dash) => { const dx = Math.cos(ang) * 130, dy = -Math.sin(ang) * 130; return <g><line x1={cx - dx} y1={cy - dy} x2={cx + dx} y2={cy + dy} stroke={dash ? "#7d3c98" : MUTED} strokeDasharray={dash ? "5 4" : null} markerEnd="url(#ar10)" /><ST x={cx + dx * 1.04 + 4} y={cy + dy * 1.04} w={40} tex={lab} color={dash ? "#7d3c98" : MUTED} /></g>; };
  // 右侧小图：I_det(φ)
  const px0 = 360, pw = 300, py0 = 40, ph0 = 200, Y = v => py0 + ph0 - (v / 2) * ph0, X = phi => px0 + (phi / Math.PI) * pw;
  const curve = [...Array(121)].map((_, i) => { const t = Math.PI * i / 120; return `${i ? "L" : "M"}${X(t).toFixed(1)},${Y(Idet(t)).toFixed(1)}`; }).join("");
  return (
    <div className="plot card">
      <div className="plot-params">
        <Slider tex={R`\text{偏振方向}\ \psi=${fd(psi)}^\circ`} min={0} max={180} step={1} value={psi} set={setPsi} />
        <Slider tex={R`\text{偏振度}\ p=${(+p).toFixed(2)}`} min={0} max={1} step={0.01} value={p} set={setP} />
        <Slider tex={R`\text{偏振片}\ \phi=${fd(ph)}^\circ`} min={0} max={180} step={1} value={ph} set={setPh} />
        <Slider tex={R`\text{坐标转角}\ \alpha=${fd(al)}^\circ`} min={0} max={180} step={1} value={al} set={setAl} />
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <defs><marker id="ar10" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill={MUTED} /></marker></defs>
        {axis(0, R`x`)}{axis(Math.PI / 2, R`y`)}
        {al > 0 && al < 180 && <>{axis(al * DEG, R`x'`, true)}{axis((al + 90) * DEG, R`y'`, true)}</>}
        <ellipse cx={cx} cy={cy} rx={a} ry={Math.max(b, 0.8)} transform={`rotate(${-psi} ${cx} ${cy})`} fill="#9cc7f0" fillOpacity={0.6} stroke="#2c5d9e" />
        <Bar cx={cx} cy={cy} ang={ph * DEG} len={125} color="#d35400" w={2} />
        <ST x={cx} y={H - 36} w={300} align="center" tex={R`\text{橙线：偏振片方向}\ \hat{\boldsymbol m}`} color={MUTED} /><ST x={cx} y={H - 12} w={300} align="center" tex={R`\text{椭圆半轴}\propto\sqrt{I_{\max}},\ \sqrt{I_{\min}}`} color={MUTED} />
        {/* 右：I_det(φ) */}
        <rect x={px0} y={py0} width={pw} height={ph0} fill="none" stroke="#c9c0b2" />
        {[0, 0.5, 1, 1.5, 2].map(v => <g key={v}><line x1={px0} x2={px0 + pw} y1={Y(v)} y2={Y(v)} stroke="#eee6da" /><ST x={px0 - 6} y={Y(v)} w={40} align="right" tex={String(v)} size={11} /></g>)}
        {[0, 45, 90, 135, 180].map(v => <ST key={v} x={X(v * DEG)} y={py0 + ph0 + 14} w={40} align="center" tex={R`${v}^\circ`} size={11} />)}
        <path d={curve} fill="none" stroke="#2c5d9e" strokeWidth={2.2} />
        <line x1={X(ph * DEG)} x2={X(ph * DEG)} y1={py0} y2={py0 + ph0} stroke="#d35400" strokeDasharray="4 3" />
        <circle cx={X(ph * DEG)} cy={Y(Idet(ph * DEG))} r={4.5} fill="#d35400" />
        <ST x={px0 + pw / 2} y={py0 - 16} w={pw} align="center" tex={R`I_{\rm det}(\phi)=I+Q\cos2\phi+U\sin2\phi\quad(I=1)`} />
        <ST x={px0 + pw / 2} y={py0 + ph0 + 34} w={pw} align="center" tex={R`\text{偏振片方位角}\ \phi`} color={MUTED} />
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <Note>{R`原坐标 $(x,y)$：$Q=p\cos2\psi=${f2(Q)}$，$U=p\sin2\psi=${f2(U)}$，$\sqrt{Q^2+U^2}=${f2(Math.hypot(Q, U))}$。偏振片在 $\phi=${fd(ph)}^\circ$ 时 $I_{\rm det}=${f2(Idet(ph * DEG))}$（最大 $1+p$ 出现在 $\phi=\psi$，最小 $1-p$ 在 $\phi=\psi+90^\circ$）。`}</Note>
        <Note>{R`转动后的坐标 $(x',y')$（转角 $\alpha=${fd(al)}^\circ$）：$Q'=Q\cos2\alpha+U\sin2\alpha=${f2(Qp)}$，$U'=-Q\sin2\alpha+U\cos2\alpha=${f2(Up)}$。同一偏振片在新坐标中方位角为 $\phi-\alpha$，算得 $I_{\rm det}=${f2(IdetP((ph - al) * DEG))}$——**物理量不变，$Q$、$U$ 却变了**；$\sqrt{Q^2+U^2}$ 不变，$\alpha=45^\circ$ 时 $Q$ 与 $U$ 互换角色，$\alpha=180^\circ$ 时回到原值（自旋 2）。`}</Note>
      </div>
    </div>);
}

// =====================================================================
// 2. 图 10.5–10.8 交互版：Thomson 散射把入射四极变成出射偏振（真算立体角积分）
// =====================================================================
const MODES = [
  ["beam", "单向光束（图 10.5 左）"], ["iso", "各向同性（图 10.5 右）"], ["dip", "偶极（图 10.6 左）"],
  ["scal", "标量平面波四极（10.28）"], ["hx", R`张量 $h_\times$（10.50）`], ["hp", R`张量 $h_+$（习题 10.6）`],
];
export function ScatterWidget({ mode0 = "scal" }) {
  const [mode, setMode] = useState(mode0);
  const [beta, setBeta] = useState(0), [thk, setThk] = useState(90), [phk, setPhk] = useState(0), [alpha, setAlpha] = useState(0), [I0, setI0] = useState(1);
  const prm = { beta: beta * DEG, thk: thk * DEG, phk: phk * DEG, alpha: alpha * DEG };
  const fAniso = mode === "beam" ? null : P.FIELDS[mode](prm);
  // 总入射强度 = 单极 + 各向异性；单极取 I0 × max|各向异性|（I0 ≥ 1 保证 f ≥ 0），它不影响 Q、U，只影响偏振度
  const amax = mode === "scal" ? 5 : 1;
  const fTot = fAniso && (mode === "iso" ? () => 1 : (n, c, ph) => I0 * amax + fAniso(n, c, ph));
  const res = useMemo(() => (mode === "beam" ? P.beam(prm.beta) : P.scatter(fTot)), [mode, beta, thk, phk, alpha, I0]);
  const an = mode === "beam" ? { Q: -Math.cos(2 * prm.beta), U: -Math.sin(2 * prm.beta) } : P.ANALYTIC[mode](prm);
  const Pol = Math.hypot(res.Q, res.U), deg = res.I > 1e-9 ? Pol / res.I : NaN, psi = 0.5 * Math.atan2(res.U, res.Q);
  // 左：入射强度 f(θ', φ') 的等距圆柱投影
  const nT = 24, nP = 48, W = 680, H = 300, mx = 24, my = 40, cw = 5, chh = 8.4;
  const cells = useMemo(() => {
    if (mode === "beam") return [];
    const out = []; let mmax = 1e-9; const vals = [];
    for (let i = 0; i < nT; i++) for (let j = 0; j < nP; j++) {
      const th = Math.PI * (i + 0.5) / nT, ph = 2 * Math.PI * (j + 0.5) / nP, c = Math.cos(th), s = Math.sin(th);
      const v = mode === "iso" ? 0 : fAniso([s * Math.cos(ph), s * Math.sin(ph), c], c, ph); vals.push([i, j, v]); mmax = Math.max(mmax, Math.abs(v));
    }
    for (const [i, j, v] of vals) out.push(<rect key={i * nP + j} x={mx + j * cw} y={my + i * chh} width={cw + 0.3} height={chh + 0.3} fill={div(v / mmax)} />);
    return out;
  }, [mode, beta, thk, phk, alpha]);
  // 中：x–y 平面内的 8 条入射线（颜色 = 赤道面上 f 的值）
  const cx2 = 380, cy2 = 150, rr = 82;
  const rays = [...Array(8)].map((_, q) => {
    const ph = q * Math.PI / 4, n = [Math.cos(ph), Math.sin(ph), 0];
    let v = mode === "beam" ? (Math.abs(((ph - prm.beta) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI)) < 1e-6 ? 1 : NaN) : mode === "iso" ? 0 : fAniso(n, 0, ph);
    return { ph, v };
  });
  const vmax = Math.max(1e-9, ...rays.map(r => (Number.isFinite(r.v) ? Math.abs(r.v) : 0)));
  const sliders = {
    beam: [<Slider key="b" tex={R`\text{入射方向（赤道面内）}\ \beta=${fd(beta)}^\circ`} min={0} max={180} step={1} value={beta} set={setBeta} />],
    iso: [],
    dip: [<Slider key="b" tex={R`\text{偶极方向}\ \beta=${fd(beta)}^\circ`} min={0} max={180} step={1} value={beta} set={setBeta} />],
    scal: [<Slider key="t" tex={R`\theta_k=${fd(thk)}^\circ`} min={0} max={180} step={1} value={thk} set={setThk} />, <Slider key="p" tex={R`\phi_k=${fd(phk)}^\circ`} min={0} max={180} step={1} value={phk} set={setPhk} />],
    hx: [<Slider key="a" tex={R`\alpha=${fd(alpha)}^\circ`} min={0} max={180} step={1} value={alpha} set={setAlpha} />],
    hp: [<Slider key="a" tex={R`\alpha=${fd(alpha)}^\circ`} min={0} max={180} step={1} value={alpha} set={setAlpha} />],
  }[mode];
  const anTex = {
    beam: R`-\cos2\beta=${f2(an.Q)},\ -\sin2\beta=${f2(an.U)}`,
    iso: R`0,\ 0`, dip: R`0,\ 0`,
    scal: R`4\pi\sin^2\theta_k\cos2\phi_k=${f2(an.Q)},\ 4\pi\sin^2\theta_k\sin2\phi_k=${f2(an.U)}`,
    hx: R`0,\ -\tfrac{16\pi}{15}\cos\alpha=${f2(an.U)}`,
    hp: R`-\tfrac{8\pi}{15}(1+\cos^2\alpha)=${f2(an.Q)},\ 0`,
  }[mode];
  return (
    <div className="plot card">
      <div className="plot-params" style={{ flexWrap: "wrap" }}>
        {MODES.map(([k, l]) => <Btn key={k} on={mode === k} onClick={() => setMode(k)}><TxI>{l}</TxI></Btn>)}
      </div>
      <div className="plot-params">
        {sliders}
        {mode !== "beam" && mode !== "iso" && <Slider tex={R`\text{单极}\ I_0/\max|\Delta f|=${(+I0).toFixed(2)}`} min={1} max={5} step={0.05} value={I0} set={setI0} />}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        <defs><marker id="ar10b" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill={INK} /></marker></defs>
        {/* 左：全天入射强度图 */}
        <ST x={mx + nP * cw / 2} y={my - 22} w={250} align="center" tex={R`\text{入射强度的各向异性}\ f(\hat{\boldsymbol n}')`} />
        {mode === "beam" ? <><rect x={mx} y={my} width={nP * cw} height={nT * chh} fill="#f6f1e8" stroke="#c9c0b2" /><circle cx={mx + (((prm.beta) / (2 * Math.PI)) * nP) * cw} cy={my + nT * chh / 2} r={6} fill={HOT} /></> : cells}
        <rect x={mx} y={my} width={nP * cw} height={nT * chh} fill="none" stroke="#c9c0b2" />
        <ST x={mx} y={my + nT * chh + 14} w={40} tex={R`0`} size={11} /><ST x={mx + nP * cw} y={my + nT * chh + 14} w={40} align="right" tex={R`2\pi`} size={11} />
        <ST x={mx + nP * cw / 2} y={my + nT * chh + 14} w={60} align="center" tex={R`\phi'`} size={12} />
        <ST x={mx - 2} y={my + 6} w={30} align="right" tex={R`0`} size={11} /><ST x={mx - 2} y={my + nT * chh - 6} w={30} align="right" tex={R`\pi`} size={11} />
        <ST x={mx + nP * cw / 2} y={my + nT * chh + 34} w={260} align="center" tex={R`\text{纵轴}\ \theta'\text{（自}\ z\ \text{轴起）；红热蓝冷}`} color={MUTED} size={12} />
        {/* 中：赤道面入射线 */}
        <ST x={cx2} y={my - 22} w={200} align="center" tex={R`x\text{–}y\ \text{平面内的入射线}`} />
        {rays.map(({ ph, v }, q) => { if (mode === "beam" && !Number.isFinite(v)) return null; const x1 = cx2 + Math.cos(ph) * rr, y1 = cy2 - Math.sin(ph) * rr, x2 = cx2 + Math.cos(ph) * 22, y2 = cy2 - Math.sin(ph) * 22;
          const col = mode === "beam" ? HOT : mode === "iso" ? "#555" : div(v / vmax); return <line key={q} x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth={mode === "beam" ? 4 : 2 + 4 * (Number.isFinite(v) ? Math.max(0, v / vmax + 1) / 2 : 0.5)} markerEnd="url(#ar10b)" />; })}
        <circle cx={cx2} cy={cy2} r={6} fill={INK} />
        <ST x={cx2 + rr + 6} y={cy2} w={20} tex={R`x`} color={MUTED} /><ST x={cx2 - 4} y={cy2 - rr - 12} w={20} tex={R`y`} color={MUTED} />
        <ST x={cx2} y={cy2 + 22} w={80} align="center" tex={R`e^-`} size={12} />
        {/* 右：出射（沿 z，指向读者）偏振 */}
        <ST x={592} y={my - 22} w={150} align="center" tex={R`\text{出射偏振（沿}\ z\text{）}`} />
        <circle cx={592} cy={cy2} r={66} fill="#faf7f1" stroke="#c9c0b2" />
        <line x1={526} x2={658} y1={cy2} y2={cy2} stroke="#e6ddd0" /><line x1={592} x2={592} y1={cy2 - 66} y2={cy2 + 66} stroke="#e6ddd0" />
        {Number.isFinite(deg) && deg > 1e-4 ? <Bar cx={592} cy={cy2} ang={psi} len={8 + 54 * Math.min(1, deg)} color="#d35400" w={5} /> : <circle cx={592} cy={cy2} r={5} fill="#999" />}
        <ST x={592} y={cy2 + 88} w={160} align="center" tex={Number.isFinite(deg) ? R`p=${(100 * deg).toFixed(1)}\%,\ \psi=${fd(((psi / DEG) + 180) % 180)}^\circ` : R`\text{无辐射}`} size={12} />
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <Note>{R`**浏览器内数值积分**（$40\times72$ 点：Gauss–Legendre 节点乘均匀 $\phi'$ 网格，$A=1$）：$Q=-\int d\Omega' f\sin^2\theta'\cos2\phi'=${f2(res.Q)}$，$U=-\int d\Omega' f\sin^2\theta'\sin2\phi'=${f2(res.U)}$（\eqref{10.19}–\eqref{10.20}）；出射总强度 $\int d\Omega' f(1+\cos^2\theta')=${f2(res.I)}$。`}</Note>
        <Note>{R`**解析结果**（只来自各向异性部分，与单极 $I_0$ 无关）：$(Q,U)=(${anTex})$。`}</Note>
        <Note>{mode === "beam" ? R`来自 $x$ 轴的光束（$\beta=0$）给出 $Q=-1$：出射光完全沿 $y$ 偏振——沿出射方向 $z$ 的那一分量传不出去。`
          : mode === "iso" || mode === "dip" ? R`单极与偶极只含 $l=0,1$ 的球谐函数，与 $\sin^2\theta'\cos2\phi'$、$\sin^2\theta'\sin2\phi'$（$\propto Y_{2,\pm2}$）正交，所以无论怎样调，$Q=U=0$。`
          : mode === "scal" ? R`标量模：$\phi_k$ 只让偏振方向转 $\phi_k$（$Q,U$ 按 $2\phi_k$ 混合），偏振始终平行或垂直于 $\hat{\boldsymbol k}$ 在天空上的投影——**纯 E 模**。$\theta_k=0$（波矢沿视线）时偏振消失。`
          : mode === "hx" ? R`张量 $h_\times$，$\hat{\boldsymbol k}$ 的天空投影沿 $x$ 轴：只产生 $U$——由 \eqref{10.12}，这就是 **B 模**。$|U|=\frac{16\pi}{15}\cos\alpha=${f2(16 * Math.PI / 15 * Math.cos(prm.alpha))}$；原书 \eqref{10.50} 第二行写作 $\frac{16}{15}\cdot\frac\pi2$，$\phi'$ 积分 $\int_0^{2\pi}\sin^2 2\phi'\,d\phi'$ 实为 $\pi$（只影响比例常数）。$\alpha=90^\circ$（$\hat{\boldsymbol k}$ 躺在天空平面内）时 B 模消失。`
          : R`张量 $h_+$，同一配置：只产生 $Q$，$U\equiv0$——这一配置下 $h_+$ 只贡献 E 模（\exref{10.6}）。`}</Note>
      </div>
    </div>);
}

// =====================================================================
// 3. 图 10.3 / 10.4 交互版：E 模与 B 模的偏振棒图样
// =====================================================================
export function EBWidget() {
  const [geo, setGeo] = useState("plane"), [mix, setMix] = useState(0), [phl, setPhl] = useState(0), [chi, setChi] = useState(0);
  const Eamp = Math.cos(mix * DEG), Bamp = Math.sin(mix * DEG);
  const W = 680, H = 360, N = geo === "plane" ? 24 : 21, L = geo === "plane" ? 2 * Math.PI : 9, size = 330, ox = 175, oy = 15, cell = size / N;
  const pts = useMemo(() => {
    const out = []; let mmax = 1e-9;
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      const th = [-L + 2 * L * (j + 0.5) / N, L - 2 * L * (i + 0.5) / N];
      const [Q, U] = geo === "plane" ? P.planeQU(th, phl * DEG, Eamp, Bamp, 1, chi * DEG) : P.radialQU(th, Eamp, Bamp, 1);
      const amp = geo === "plane" ? Math.cos(Math.cos(phl * DEG) * th[0] + Math.sin(phl * DEG) * th[1] + chi * DEG) : P.radialAmp(th, 1);
      const Pp = Math.hypot(Q, U); mmax = Math.max(mmax, Pp); out.push({ i, j, Q, U, Pp, amp });
    }
    return { out, mmax };
  }, [geo, mix, phl, chi]);
  const ampMax = Math.max(1e-9, ...pts.out.map(p => Math.abs(p.amp)));
  return (
    <div className="plot card">
      <div className="plot-params">
        <Btn on={geo === "plane"} onClick={() => setGeo("plane")}>单个平面波（图 10.3）</Btn>
        <Btn on={geo === "radial"} onClick={() => setGeo("radial")}>径向波 = 各方向平面波叠加（图 10.4）</Btn>
        <Btn on={mix === 0} onClick={() => setMix(0)}>纯 E</Btn>
        <Btn on={mix === 90} onClick={() => setMix(90)}>纯 B</Btn>
      </div>
      <div className="plot-params">
        <Slider tex={R`E=\cos\chi_{EB},\ B=\sin\chi_{EB}:\ \chi_{EB}=${fd(mix)}^\circ`} min={0} max={180} step={1} value={mix} set={setMix} />
        {geo === "plane" && <Slider tex={R`\phi_l=${fd(phl)}^\circ`} min={0} max={180} step={1} value={phl} set={setPhl} />}
        {geo === "plane" && <Slider tex={R`\text{相位}=${fd(chi)}^\circ`} min={0} max={360} step={2} value={chi} set={setChi} />}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
        {pts.out.map(({ i, j, amp }) => <rect key={"b" + i + "_" + j} x={ox + j * cell} y={oy + i * cell} width={cell + 0.4} height={cell + 0.4} fill={div(0.45 * amp / ampMax)} />)}
        {pts.out.map(({ i, j, Q, U, Pp }) => Pp / pts.mmax > 0.03 && <Bar key={i + "_" + j} cx={ox + (j + 0.5) * cell} cy={oy + (i + 0.5) * cell} ang={0.5 * Math.atan2(U, Q)} len={0.46 * cell * Pp / pts.mmax} w={2.2} />)}
        <rect x={ox} y={oy} width={size} height={size} fill="none" stroke="#c9c0b2" />
        {geo === "plane" && (() => { const c = [ox + size / 2, oy + size / 2], d = [Math.cos(phl * DEG), -Math.sin(phl * DEG)]; return <g><line x1={c[0]} y1={c[1]} x2={c[0] + 60 * d[0]} y2={c[1] + 60 * d[1]} stroke="#d35400" strokeWidth={3} markerEnd="url(#ar10c)" /><ST x={c[0] + 70 * d[0]} y={c[1] + 70 * d[1]} w={30} tex={R`\boldsymbol l`} color="#d35400" /></g>; })()}
        <defs><marker id="ar10c" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#d35400" /></marker></defs>
        <ST x={20} y={40} w={150} tex={R`\text{底色：标量振幅}`} color={MUTED} size={12} />
        <ST x={20} y={62} w={150} tex={geo === "plane" ? R`\cos(\boldsymbol l\cdot\boldsymbol\theta+\text{相位})` : R`\textstyle\sum_{\phi_l}\cos(\boldsymbol l\cdot\boldsymbol\theta)`} color={MUTED} size={12} />
        <ST x={20} y={92} w={150} tex={R`\text{红正蓝负}`} color={MUTED} size={12} />
        <ST x={20} y={130} w={150} tex={R`\text{黑棒：偏振方向}`} color={MUTED} size={12} />
        <ST x={20} y={152} w={150} tex={R`\psi=\tfrac12\arctan(U/Q)`} color={MUTED} size={12} />
        <ST x={20} y={174} w={150} tex={R`\text{长度}\propto\sqrt{Q^2+U^2}`} color={MUTED} size={12} />
      </svg>
      <div className="plot-legend" style={{ display: "block" }}>
        <Note>{geo === "plane"
          ? R`由 \eqref{10.11}：$Q=(\cos2\phi_l E-\sin2\phi_l B)\cos(\boldsymbol l\cdot\boldsymbol\theta)$，$U=(\sin2\phi_l E+\cos2\phi_l B)\cos(\boldsymbol l\cdot\boldsymbol\theta)$。纯 E：偏振棒在波峰平行于 $\boldsymbol l$、在波谷垂直于 $\boldsymbol l$；纯 B：处处与 $\boldsymbol l$ 成 $\pm45^\circ$。转动 $\phi_l$，整个图样刚性地跟着转——E、B 的身份不变（它们是坐标无关的）。`
          : R`$48$ 个方向均匀分布、原点同相、等振幅的平面波之和。纯 E：偏振棒**径向或切向**（镜像对称）；纯 B：偏振棒与半径成 $45^\circ$，呈**旋涡**状，镜像后旋向反转——B 是宇称为奇的赝标量。解析上，E 的径向/切向交替由 $-J_2(l_0\theta)$ 的符号决定（$\int_0^{2\pi}\cos(x\cos u)\cos2u\,du=-2\pi J_2(x)$）。`}</Note>
        <Note>{R`把 $\chi_{EB}$ 拨到 $90^\circ$：每根棒原地转 $45^\circ$，E 图样就变成 B 图样——这正是原书所说"把 E 模的每个偏振方向转 $45^\circ$ 就得到 B 模"。`}</Note>
      </div>
    </div>);
}

// =====================================================================
// 4. (10.39)–(10.40) 的检验：投影核 (1+∂²) j_l 与小尺度近似 l²/x² j_l
// =====================================================================
export function KernelPlot({ l0 = 200 }) {
  return <Plot
    x={{ label: R`k\eta_0/l`, domain: [0.6, 3] }}
    y={{ label: R`\text{核}/\max|j_l+j_l''|`, domain: [-1.15, 1.15] }}
    params={[{ id: "l", label: R`l`, min: 10, max: 1500, log: true, value: l0 }]}
    series={p => {
      const l = Math.max(2, Math.round(p.l));
      let mx = 1e-300; for (let i = 0; i <= 200; i++) { const u = 0.6 + 2.4 * i / 200; mx = Math.max(mx, Math.abs(P.jPlusJpp(l, l * u))); }
      let num = 0, den = 0; for (let i = 0; i <= 200; i++) { const u = 0.95 + 2 * i / 200, x = l * u, e = P.jPlusJpp(l, x), a = P.kernelTerms(l, x).approx; num += (e - a) ** 2; den += e * e; }
      return [
        { label: R`(j_l+j_l'')(k\eta_0)\ \text{精确}`, f: u => P.jPlusJpp(l, l * u) / mx, color: "#1f1b16", width: 2.6 },
        { label: R`\frac{l^2}{(k\eta_0)^2}j_l\ \text{（近似 10.40）}`, f: u => P.kernelTerms(l, l * u).approx / mx, color: "#d35400", dash: "dash", width: 2 },
        { label: R`-\frac{2}{k\eta_0}j_{l-1}+\frac{2(l+1)}{(k\eta_0)^2}j_l\ \text{（前两项）}`, f: u => { const t = P.kernelTerms(l, l * u); return (t.t1 + t.t2) / mx; }, color: "#2c6e49", dash: "dot", width: 1.8 },
        { label: R`l=${l}:\ \text{近似的相对均方根误差}\ ${(100 * Math.sqrt(num / den)).toFixed(1)}\%\ (k\eta_0>0.95\,l)`, f: () => NaN },
      ];
    }}
    samples={360} height={360} />;
}
