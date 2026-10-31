// 第 III 章补充材料（上）的交互图。数值核心在 _ch03c_phys.js（已用 node 逐一核对：归一化、解析式、复现、流守恒、两种绘景）。
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Plot, TxI, Slider, Seg, renderTex } from "@kit";
import * as P from "./_ch03c_phys.js";

const R = String.raw;
const f3 = (v, d = 3) => (Number.isFinite(v) ? (+v).toPrecision(d) : "—");
const fx = (v, d = 3) => (Number.isFinite(v) ? (Math.abs(v) < 5e-13 ? "0" : (+v).toFixed(d)) : "—");
const sci = v => { if (!Number.isFinite(v)) return "—"; if (v === 0) return "0"; const e = Math.floor(Math.log10(Math.abs(v))); return Math.abs(e) <= 2 ? (+v).toPrecision(3) : `${(v / 10 ** e).toFixed(1)}\\times10^{${e}}`; };
const BLUE = "#2c4a6e", RED = "#c0392b", GREEN = "#2c6e49", INK = "#1f1b16", GOLD = "#b8862b", MUTED = "#999";
const Card = ({ title, children }) => <div className="card" style={{ padding: "12px 14px", margin: "1.2em 0" }}><b>{title}</b><div style={{ marginTop: 8 }}>{children}</div></div>;
const Cap = ({ children }) => <div className="plot-cap" style={{ marginTop: 6 }}><TxI>{children}</TxI></div>;
const Row = ({ children }) => <div className="plot-params" style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", alignItems: "center", marginBottom: 6 }}>{children}</div>;
const SL = ({ x, y, tex, size = 13, color = "#444", w = 160 }) => <foreignObject x={x - w / 2} y={y - size * 1.3} width={w} height={size * 2}><div style={{ textAlign: "center", fontSize: size, color, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} /></foreignObject>;
// 按钮里的公式不做符号标注（否则点到符号会弹出符号卡而不是按下按钮）
const plainMath = t => String(t).replace(/\$([^$]+)\$/g, (_, m) => "$\\nosym{" + m + "}$");
const Btn = ({ onClick, children }) => <button className="plot-reset" onClick={onClick}><TxI>{plainMath(children)}</TxI></button>;

function usePlay(setT, hi, speed) {
  const [on, setOn] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (!on) return;
    let last = performance.now();
    const step = now => {
      const dt = (now - last) / 1000; last = now;
      setT(t => { const n = t + speed * dt; return n >= hi ? n - hi : n; });
      ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [on, hi, speed]);   // eslint-disable-line
  return [on, () => setOn(!on)];
}

// =====================================================================
// A_III-1：定态的动量分布 P̄_n(p)
// =====================================================================
export function MomentumDistPlot() {
  const [n, setN] = useState(1);
  const L = n + 5;
  // 以 u = pa/(πħ) 为横轴（a = ħ = 1 时 p = πu），密度换算为 du 上的密度
  const chk = useMemo(() => {
    let s = 0, s2 = 0; const h = 0.002, U = 600;
    for (let u = -U; u <= U; u += h) { const v = Math.PI * P.Pbar(n, Math.PI * u); s += v * h; s2 += v * (Math.PI * u) ** 2 * h; }
    return { norm: s, dP: Math.sqrt(s2) };
  }, [n]);
  const series = useCallback(() => [
    { label: R`\overline{\mathcal P}_n(p)\ \text{（精确，式 AIII-11 第一行）}`, f: u => Math.PI * P.Pbar(n, Math.PI * u), color: BLUE, width: 2.4 },
    { label: R`\text{略去干涉项（式 AIII-11 第二行）}`, f: u => Math.PI * P.PbarApprox(n, Math.PI * u), color: RED, dash: "dash" },
  ], [n]);
  return (
    <Card title="交互：定态的动量分布">
      <Row><Slider label="$n$" value={n} min={1} max={20} step={1} onChange={setN} /></Row>
      <Plot x={{ label: R`p\ /\ (\pi\hbar/a)`, domain: [-L, L] }} y={{ label: R`\text{概率密度（以}\ \pi\hbar/a\ \text{为单位）}` }}
        series={series} samples={700} height={300}
        vlines={[{ x: -n, label: R`-p_{cl}` }, { x: n, label: R`+p_{cl}` }]} />
      <Cap>{R`数值核对（$n=${n}$）：$\int\overline{\mathcal P}_n\,\mathrm dp=${f3(chk.norm, 5)}$；由分布直接积分得 $\sqrt{\langle P^2\rangle}=${f3(chk.dP, 4)}\,\hbar/a$，式 \eqref{AIII-10} 给 $n\pi\hbar/a=${f3(n * Math.PI, 4)}\,\hbar/a$（差别来自数值积分截断：尾部按 $1/p^2$ 衰减，收敛很慢——这正是脚注里说"直接在动量空间算不如在位置空间算"的原因）。$n=1$ 时两条衍射曲线中心相距半个宽度，叠成 $p=0$ 处的单峰；$n\ge5$ 后精确曲线与红色虚线几乎重合，两峰位于经典值 $\pm p_{cl}=\pm n\pi\hbar/a$，峰宽始终是 $4\pi\hbar/a$。`}</Cap>
    </Card>);
}

// =====================================================================
// A_III-2：阱中的波包——两态叠加与高斯波包的复现
// =====================================================================
const NX = 240;
const XS = Array.from({ length: NX + 1 }, (_, i) => i / NX);
const tri = u => { const f = ((u % 2) + 2) % 2; return f <= 1 ? f : 2 - f; };   // 0→1→0 的三角波，周期 2
export function WellPacketLab() {
  const [mode, setMode] = useState("two");
  const [x0, setX0] = useState(0.3), [s, setS] = useState(0.05), [k0, setK0] = useState(40);
  const [tf, setTf] = useState(0);                 // t / T_rev
  const [on, toggle] = usePlay(setTf, 1, mode === "two" ? 0.08 : 0.025);
  const c = useMemo(() => (mode === "two" ? P.twoState() : P.wellCoeffs(P.gaussPsi0(x0, s, k0), 90)), [mode, x0, s, k0]);
  const t = tf * P.TREV;
  const dens = XS.map(x => P.cabs2(P.wellPsi(c, x, t)));
  const ymax = useMemo(() => Math.max(2.2, ...XS.map(x => P.cabs2(P.wellPsi(c, x, 0)))) * 1.08, [c]);
  const xm = P.xmean(c, t), ac = P.autocorr(c, t), Em = P.meanE(c);
  const W = 640, H = 200, ml = 36, mr = 14, mt = 10, mb = 26, iw = W - ml - mr, ih = H - mt - mb;
  const sx = x => ml + x * iw, sy = y => mt + ih - (y / ymax) * ih;
  const path = "M" + XS.map((x, i) => `${sx(x).toFixed(1)},${sy(dens[i]).toFixed(1)}`).join("L");
  // 经典粒子：两态模式取同周期 2π/ω21 的往返（t=0 在左壁）；高斯模式取速度 k0 从 x0 出发
  const vcl = mode === "two" ? 2 * P.W21 / (2 * Math.PI) : k0;
  const xcl = tt => (mode === "two" ? tri(vcl * tt) : tri(x0 + vcl * tt));
  const series = useCallback(() => [
    { label: R`\langle X\rangle(t)/a`, f: u => P.xmean(c, u * P.TREV), color: BLUE, width: 2.2 },
    { label: R`|\langle\psi(0)|\psi(t)\rangle|^2`, f: u => P.autocorr(c, u * P.TREV), color: GOLD },
    ...(mode === "two" ? [{ label: R`\text{同周期经典粒子}`, f: u => xcl(u * P.TREV), color: MUTED, dash: "dash" }] : []),
  ], [c, mode]);   // eslint-disable-line
  return (
    <Card title="交互：无限深阱中的波包（演化、折返与复现）">
      <Row>
        <Seg options={[["two", "两态叠加 (AIII-14)"], ["gauss", "高斯波包"]]} value={mode} onChange={m => { setMode(m); setTf(0); }} />
        <Btn onClick={toggle}>{on ? "暂停" : "播放"}</Btn>
        <Btn onClick={() => setTf(0)}>{R`$t=0$`}</Btn>
        <Btn onClick={() => setTf(0.5)}>{R`$t=T_{\rm rev}/2$`}</Btn>
        <Btn onClick={() => setTf(1 / 3)}>{R`$t=T_{\rm rev}/3$`}</Btn>
        <Btn onClick={() => setTf(1)}>{R`跳到 $T_{\rm rev}$`}</Btn>
      </Row>
      <Row>
        <Slider label="$t/T_{\rm rev}$" value={+tf.toFixed(4)} min={0} max={1} step={0.0005} onChange={setTf} fmt={v => v.toFixed(4)} />
        {mode === "gauss" && <>
          <Slider label="$x_0/a$" value={x0} min={0.15} max={0.85} step={0.01} onChange={setX0} />
          <Slider label="$\sym{sgLab}{\sigma}/a$" value={s} min={0.03} max={0.12} step={0.005} onChange={setS} />
          <Slider label="$k_0a$" value={k0} min={0} max={80} step={1} onChange={setK0} />
        </>}
      </Row>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W, display: "block" }}>
        <rect x={sx(0) - 8} y={mt} width={8} height={ih} fill="#ccc" /><rect x={sx(1)} y={mt} width={8} height={ih} fill="#ccc" />
        <line x1={sx(0)} y1={sy(0)} x2={sx(1)} y2={sy(0)} stroke={INK} />
        <path d={path + `L${sx(1)},${sy(0)}L${sx(0)},${sy(0)}Z`} fill={BLUE} fillOpacity={0.18} stroke={BLUE} strokeWidth={2} />
        <line x1={sx(xm)} y1={mt} x2={sx(xm)} y2={sy(0)} stroke={RED} strokeWidth={2} strokeDasharray="5 4" />
        <circle cx={sx(xcl(t))} cy={sy(0) - 6} r={5} fill={MUTED} />
        <SL x={sx(xm) + 24} y={mt + 14} tex={R`\langle X\rangle`} color={RED} w={50} />
        <SL x={sx(0)} y={H - 4} tex="0" w={30} /><SL x={sx(1)} y={H - 4} tex="a" w={30} />
        <SL x={sx(0.5)} y={H - 4} tex={R`|\psi(x,t)|^2\ \text{（灰点：经典粒子）}`} color="#666" w={300} />
      </svg>
      <Plot x={{ label: R`t\ /\ T_{\rm rev}`, domain: [0, 1] }} y={{ label: R`\text{无量纲}`, domain: [0, 1.05] }} series={series} samples={mode === "two" ? 400 : 600} height={240}
        vlines={[{ x: tf, label: "t" }]} />
      <Cap>{R`当前 $t=${f3(tf, 4)}\,T_{\rm rev}$（$T_{\rm rev}=4ma^2/\pi\hbar$）：$\langle X\rangle=${fx(xm, 4)}\,a$，自相关 $|\langle\psi(0)|\psi(t)\rangle|^2=${fx(ac, 6)}$，$\langle H\rangle=${f3(Em / P.E1, 4)}\,E_1$（不随时间变化）。${mode === "two" ? R`两态模式下 $\langle X\rangle$ 与式 \eqref{AIII-23} 逐点一致（$t=0$ 时 $a/2-16a/9\pi^2=${fx(P.xmean2(0), 4)}\,a$），周期 $2\pi/\omega_{21}=T_{\rm rev}/3$；灰色虚线是同周期的经典往返，振幅 $a$ 远大于量子的 $0.18\,a$。` : R`高斯模式下初态按前 90 个本征态展开。几次碰壁后波包散开、$\langle X\rangle$ 趋于平缓；在 $T_{\rm rev}/2$ 波包变成初态关于中点的镜像（自相关为 0、$\langle X\rangle=a-x_0$），在 $T_{\rm rev}$ 自相关精确回到 1。试试 $T_{\rm rev}/3$、$T_{\rm rev}/4$：波包分裂成几个小份（"分数复现"）。`}`}</Cap>
    </Card>);
}

// =====================================================================
// A_III-3：位置测量后的能量分布 P(E_n)
// =====================================================================
export function PositionKickPlot() {
  const [eps, setEps] = useState(0.1);
  const N = Math.max(41, Math.ceil(6 / eps) | 1);
  const stats = useMemo(() => {
    let s = 0, n90 = null;
    for (let n = 1; n <= 200000; n += 2) { s += P.PEn(n, eps); if (n90 === null && s >= 0.9) n90 = n; }
    let sN = 0; for (let n = 1; n <= N; n++) sN += P.PEn(n, eps);
    return { s, n90, sN };
  }, [eps, N]);
  const series = useCallback(() => [
    { label: R`\mathcal P(E_n)\ \text{（奇数}\ n\text{）}`, data: Array.from({ length: (N + 1) / 2 }, (_, k) => [2 * k + 1, P.PEn(2 * k + 1, eps)]), points: true, color: BLUE },
    { label: R`\text{包络}\ \frac{8a}{\varepsilon}\frac{\sin^2(n\pi\varepsilon/2a)}{n^2\pi^2}`, f: n => 8 / eps / (n * Math.PI) ** 2 * Math.sin(n * Math.PI * eps / 2) ** 2, color: MUTED, dash: "dash" },
    { label: R`\text{错误推理的平坦值}\ 2\varepsilon/a`, f: () => 2 * eps, color: RED, dash: "dot" },
  ], [eps, N]);
  return (
    <Card title="交互：测完位置再测能量">
      <Row><Slider label="$\varepsilon/a$" value={eps} min={0.02} max={0.5} step={0.01} onChange={setEps} /></Row>
      <Plot x={{ label: R`n`, domain: [0.5, N + 0.5] }} y={{ label: R`\mathcal P(E_n)`, domain: [0, 2.15 * eps] }} series={series} samples={600} height={290}
        vlines={[{ x: 1 / eps, label: R`a/\varepsilon` }, { x: 2 / eps, label: R`2a/\varepsilon` }]} />
      <Cap>{R`核对：$\sum_{n\ \text{odd}}\mathcal P(E_n)=${f3(stats.s, 6)}$（求和到 $n=2\times10^5$）；图中所示 $n\le${N}$ 部分之和 $${f3(stats.sN, 4)}$。累积概率在 $n\approx${stats.n90}$ 处达到 $90\%$——与 $a/\varepsilon=${f3(1 / eps, 3)}$ 同量级。$\varepsilon$ 越小，分布伸向越高的能级：位置定得越准，测量注入的动能越多。`}</Cap>
    </Card>);
}

// =====================================================================
// B_III：一维势阶上的密度与流
// =====================================================================
export function StepCurrentPlot() {
  const [e, setE] = useState(1.6);   // E/V0，V0 = 1（ħ = m = 1）
  const d = useMemo(() => {
    const k1 = Math.sqrt(2 * e);
    if (e > 1) {
      const st = P.step1D(e, 1);
      const psi = x => (x < 0 ? P.cadd(P.cexpi(st.k1 * x), P.cscale(P.cexpi(-st.k1 * x), st.Ar)) : P.cscale(P.cexpi(st.k2 * x), st.At));
      return { k1, psi, R: st.R, T: st.T, above: true };
    }
    const rho = Math.sqrt(2 * (1 - e)), den = k1 * k1 + rho * rho;
    const Ar = P.cx((k1 * k1 - rho * rho) / den, -2 * k1 * rho / den), B = P.cx(2 * k1 * k1 / den, -2 * k1 * rho / den);
    const psi = x => (x < 0 ? P.cadd(P.cexpi(k1 * x), P.cmul(Ar, P.cexpi(-k1 * x))) : P.cscale(B, Math.exp(-rho * x)));
    return { k1, psi, R: P.cabs2(Ar), T: 0, above: false };
  }, [e]);
  const JI = P.currentNum(d.psi, -2.3) / d.k1, JII = P.currentNum(d.psi, 1.7) / d.k1;
  const series = useCallback(() => [
    { label: R`|\psi(x)|^2\ \ (|A_1|=1)`, f: x => P.cabs2(d.psi(x)), color: BLUE, width: 2.2 },
    { label: R`J_x\ /\ (\hbar k_1/m)`, f: x => P.currentNum(d.psi, x) / d.k1, color: RED, width: 2.4 },
  ], [d]);
  return (
    <Card title="交互：势阶上的概率密度与概率流">
      <Row><Slider label="$E/V_0$" value={e} min={0.2} max={4} step={0.02} onChange={setE} /></Row>
      <Plot x={{ label: R`x\ \ (\hbar/\sqrt{mV_0}\ \text{为单位})`, domain: [-8, 4] }} y={{ label: R`\text{密度 / 流}`, domain: [-0.1, 4.2] }} series={series} samples={600} height={290}
        vlines={[{ x: 0, label: R`x=0` }]} />
      <Cap>{d.above
        ? R`$E>V_0$：$R=${f3(d.R, 4)}$，$T=\frac{k_2}{k_1}|A_2|^2=${f3(d.T, 4)}$，$R+T=${f3(d.R + d.T, 6)}$。由波函数数值求导得到的流：$J_{\rm I}(x=-2.3)=${f3(JI, 6)}$、$J_{\rm II}(x=1.7)=${f3(JII, 6)}$（单位 $\hbar k_1/m$），与 \eqref{BIII-9}–\eqref{BIII-10} 的 $1-R=${f3(1 - d.R, 6)}$ 一致。密度在区域 I 有驻波条纹，流却是一条平线：反向行波之间没有"流的交叉项"。`
        : R`$E<V_0$：$R=${f3(d.R, 6)}$。区域 II 的密度按 $\mathrm e^{-2\rho_2x}$ 衰减但不为零；数值流 $J_{\rm I}=${fx(JI, 6)}$、$J_{\rm II}=${fx(JII, 6)}$——处处为零，与 \eqref{BIII-14} 一致。区域 I 是纯驻波（入射与反射等强），所以那里的流也为零。`}</Cap>
    </Card>);
}

// =====================================================================
// B_III：二维斜入射全反射中的 J_y(x)
// =====================================================================
export function ObliqueCurrentPlot() {
  const [e, setE] = useState(0.4);   // E1 / V0
  const o = useMemo(() => P.oblique(e), [e]);
  const series = useCallback(() => [
    { label: R`J_y\ /\ (\hbar k_y|A|^2/m)`, f: X => (X < 0 ? o.JyI(X) : o.JyII(X)), color: RED, width: 2.4 },
    { label: R`J_x`, f: () => 0, color: BLUE, dash: "dash" },
  ], [o]);
  const th = o.theta, tg = Math.tan(th);
  return (
    <Card title="交互：斜入射全反射——平行于界面的流">
      <Row><Slider label="$E_1/V_0$" value={e} min={0.02} max={0.98} step={0.01} onChange={setE} /></Row>
      <Plot x={{ label: R`k_x\,x`, domain: [-10, 4] }} y={{ label: R`\text{流}`, domain: [-0.2, 4.2] }} series={series} samples={700} height={280}
        vlines={[{ x: 0, label: R`x=0` }]} />
      <Cap>{R`$\theta=${f3(th * 180 / Math.PI, 4)}^\circ$（\eqref{BIII-22}）。区域 I：$J_y=2+2\cos(2k_xx+2\theta)$ 在 0 与 4 之间振荡（入射与反射的干涉）；区域 II：$J_y=4\cos^2\theta\,\mathrm e^{-2\rho_xx}$。界面两侧 $J_y(0^-)=2+2\cos2\theta=${f3(o.JyI(0), 5)}$，$J_y(0^+)=4\cos^2\theta=${f3(o.JyII(0), 5)}$，连续。倏逝流的穿透深度 $1/2\rho_x=${f3(1 / (2 * tg), 3)}/k_x$：$E_1\to V_0$ 时 $\theta\to0$，钻得越深，沿界面"走"得越远。全程 $J_x\equiv0$。`}</Cap>
    </Card>);
}

// =====================================================================
// E_III：密度矩阵实验室（统计混合 / 部分迹）
// =====================================================================
const cfmt = z => { const re = Math.abs(z.re) < 5e-4 ? 0 : z.re, im = Math.abs(z.im) < 5e-4 ? 0 : z.im; if (!im) return re.toFixed(3); if (!re) return `${im.toFixed(3)}i`; return `${re.toFixed(3)}${im < 0 ? "-" : "+"}${Math.abs(im).toFixed(3)}i`; };
const mtex = M => R`\begin{pmatrix}` + M.map(r => r.map(cfmt).join("&")).join(R`\\`) + R`\end{pmatrix}`;
function Bloch({ vecs }) {
  // 斜投影：x 轴指向左下，y 轴向右，z 轴向上
  const S = 95, cxp = 120, cyp = 115, proj = ([x, y, z]) => [cxp + S * (y - 0.45 * x), cyp - S * (z - 0.3 * x)];
  const eq = Array.from({ length: 73 }, (_, i) => { const a = i * 2 * Math.PI / 72; return proj([Math.cos(a), Math.sin(a), 0]); });
  return (
    <svg viewBox="0 0 240 230" style={{ width: 240, maxWidth: "100%" }}>
      <circle cx={cxp} cy={cyp} r={S} fill="none" stroke="#bbb" />
      <path d={"M" + eq.map(p => p.map(v => v.toFixed(1)).join(",")).join("L")} fill="none" stroke="#ccc" strokeDasharray="3 3" />
      {[[[1, 0, 0], "x"], [[0, 1, 0], "y"], [[0, 0, 1], "z"]].map(([v, l]) => { const [a, b] = proj(v); return <g key={l}><line x1={cxp} y1={cyp} x2={a} y2={b} stroke="#aaa" /><text x={a + 3} y={b - 3} fontSize={11} fill="#888">{l}</text></g>; })}
      {vecs.map(({ v, color, w }, i) => { const [a, b] = proj(v); return <g key={i}><line x1={cxp} y1={cyp} x2={a} y2={b} stroke={color} strokeWidth={w} /><circle cx={a} cy={b} r={w + 1.5} fill={color} /></g>; })}
    </svg>);
}
export function DensityLab() {
  const [tab, setTab] = useState("mix");
  const [p, setP] = useState(0.5), [t1, setT1] = useState(0), [f1, setF1] = useState(0), [t2, setT2] = useState(180), [f2, setF2] = useState(0);
  const [al, setAl] = useState(45), [ga, setGa] = useState(90);
  const D = Math.PI / 180;
  const preset = (pp, a, b, c, d) => { setP(pp); setT1(a); setF1(b); setT2(c); setF2(d); };
  let body;
  if (tab === "mix") {
    const rho = P.mixture(p, t1 * D, f1 * D, t2 * D, f2 * D), r = P.blochVec(rho), rl = Math.hypot(...r), pur = P.purity(rho);
    const r1 = P.blochVec(P.proj(P.blochKet(t1 * D, f1 * D))), r2 = P.blochVec(P.proj(P.blochKet(t2 * D, f2 * D)));
    body = <>
      <Row>
        <Btn onClick={() => preset(0.5, 0, 0, 180, 0)}>{R`等权混合 $\ket0,\ket1$`}</Btn>
        <Btn onClick={() => preset(0.5, 90, 0, 90, 180)}>{R`等权混合 $\ket{\pm x}$`}</Btn>
        <Btn onClick={() => preset(1, 90, 0, 90, 180)}>{R`纯态叠加 $\frac{\ket0+\ket1}{\sqrt2}$`}</Btn>
        <Btn onClick={() => preset(0.8, 30, 0, 120, 90)}>一般混合</Btn>
      </Row>
      <Row>
        <Slider label="$p_1$" value={p} min={0} max={1} step={0.01} onChange={setP} />
        <Slider label="$\sym{thLab}{\theta}_1\,[^\circ]$" value={t1} min={0} max={180} step={1} onChange={setT1} />
        <Slider label="$\sym{phLab}{\varphi}_1\,[^\circ]$" value={f1} min={0} max={360} step={1} onChange={setF1} />
        <Slider label="$\sym{thLab}{\theta}_2\,[^\circ]$" value={t2} min={0} max={180} step={1} onChange={setT2} />
        <Slider label="$\sym{phLab}{\varphi}_2\,[^\circ]$" value={f2} min={0} max={360} step={1} onChange={setF2} />
      </Row>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
        <Bloch vecs={[{ v: r1, color: BLUE, w: 1.2 }, { v: r2, color: GREEN, w: 1.2 }, { v: r, color: RED, w: 2.6 }]} />
        <div style={{ flex: 1, minWidth: 260 }}>
          <TxI>{R`$\ket{\psi_k}=\cos\frac{\sym{thLab}{\theta}_k}2\ket0+\mathrm e^{i\sym{phLab}{\varphi}_k}\sin\frac{\sym{thLab}{\theta}_k}2\ket1$，以概率 $p_1$、$p_2=1-p_1$ 混合（式 \eqref{EIII-28}）：`}</TxI>
          <div style={{ margin: "6px 0" }}><TxI>{`$$\\rho=${mtex(rho)}$$`}</TxI></div>
          <TxI>{R`$\Tr\rho=${fx(P.trace(rho).re, 4)}$；纯度 $\Tr\rho^2=${fx(pur, 4)}$（$=\frac12(1+|\mathbf r|^2)$，$|\mathbf r|=${fx(rl, 4)}$）；本征值 $\pi_\pm=${fx((1 + rl) / 2, 4)},\ ${fx((1 - rl) / 2, 4)}$。布居 $\rho_{00}=${fx(rho[0][0].re, 3)}$、$\rho_{11}=${fx(rho[1][1].re, 3)}$，相干 $|\rho_{01}|=${fx(Math.sqrt(P.cabs2(rho[0][1])), 3)}\le\sqrt{\rho_{00}\rho_{11}}=${fx(Math.sqrt(rho[0][0].re * rho[1][1].re), 3)}$（\eqref{EIII-50}）。测 $\sigma_x$ 得 $+1$ 的概率 $\Tr\{\rho P_{+x}\}=${fx((1 + r[0]) / 2, 3)}$。`}</TxI>
        </div>
      </div>
      <Cap>{R`红色是混合的 Bloch 矢量 $\mathbf r=p_1\mathbf r_1+p_2\mathbf r_2$（蓝、绿为两个纯态，在球面上）。纯态在球面上（$\Tr\rho^2=1$），混合在球内（$\Tr\rho^2<1$），球心是完全混合 $\mathbb 1/2$。前两个按钮给出**同一个** $\rho=\mathbb 1/2$——"多重制备"无法用任何测量区分；第三个按钮的纯态叠加与它们布居相同，却有相干 $\rho_{01}=1/2$，测 $\sigma_x$ 必得 $+1$。`}</Cap>
    </>;
  } else {
    const psi = P.twoBodyPsi(al * D, ga * D), rho = P.proj(psi), r1 = P.ptrace2(rho), r2 = P.ptrace1(rho);
    const dist = P.mdist(rho, P.kron(r1, r2)), b1 = P.blochVec(r1);
    body = <>
      <Row>
        <Slider label="$\sym{alLab}{\alpha}\,[^\circ]$" value={al} min={0} max={90} step={1} onChange={setAl} />
        <Slider label="$\sym{gaLab}{\gamma}\,[^\circ]$" value={ga} min={0} max={90} step={1} onChange={setGa} />
        <Btn onClick={() => { setAl(45); setGa(0); }}>{R`积态 $\sym{gaLab}{\gamma}=0$`}</Btn>
        <Btn onClick={() => { setAl(45); setGa(90); }}>{R`最大关联 $\sym{gaLab}{\gamma}=90^\circ$`}</Btn>
      </Row>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
        <Bloch vecs={[{ v: b1, color: RED, w: 2.6 }]} />
        <div style={{ flex: 1, minWidth: 260 }}>
          <TxI>{R`整体纯态 $\ket\Psi=\cos\sym{alLab}{\alpha}\ket0\ket{\sym{chiLab}{\chi}_a}+\sin\sym{alLab}{\alpha}\ket1\ket{\sym{chiLab}{\chi}_b}$，$\ket{\sym{chiLab}{\chi}_a}=\ket0$，$\ket{\sym{chiLab}{\chi}_b}=\cos\sym{gaLab}{\gamma}\ket0+\sin\sym{gaLab}{\gamma}\ket1$（$\braket{\sym{chiLab}{\chi}_a|\sym{chiLab}{\chi}_b}=\cos\sym{gaLab}{\gamma}$）。$\Tr\rho^2=${fx(P.purity(rho), 4)}$。对 (2) 取部分迹（式 \eqref{EIII-56}）：`}</TxI>
          <div style={{ margin: "6px 0" }}><TxI>{`$$\\rho(1)=\\Tr_2\\rho=${mtex(r1)},\\qquad\\rho(2)=\\Tr_1\\rho=${mtex(r2)}$$`}</TxI></div>
          <TxI>{R`$\Tr\rho(1)^2=${fx(P.purity(r1), 4)}$，$\Tr\rho(2)^2=${fx(P.purity(r2), 4)}$（两者总相等）；$\|\rho-\rho(1)\otimes\rho(2)\|=${fx(dist, 4)}$（式 \eqref{EIII-70}）。`}</TxI>
        </div>
      </div>
      <Cap>{R`相干 $\rho(1)_{01}=\cos\sym{alLab}{\alpha}\sin\sym{alLab}{\alpha}\cos\sym{gaLab}{\gamma}$ 正比于 (2) 的两个"记录态"的重叠 $\braket{\sym{chiLab}{\chi}_a|\sym{chiLab}{\chi}_b}$：(2) 记下的关于 (1) 的信息越多（$\sym{gaLab}{\gamma}\to90^\circ$），(1) 自己的相干就越少，$\rho(1)$ 的 Bloch 矢量缩向 $z$ 轴、纯度降到 $\cos^4\sym{alLab}{\alpha}+\sin^4\sym{alLab}{\alpha}$。整体始终是纯态——子体系的"混合"完全来自与另一部分的关联（$\mathrm D_{\rm III}$ §3、$\mathrm E_{\rm III}$ 说明 (ii)、(iv)）。$\sym{gaLab}{\gamma}=0$ 时为积态，$\rho=\rho(1)\otimes\rho(2)$。`}</Cap>
    </>;
  }
  return (
    <Card title="交互：密度矩阵实验室（两能级体系）">
      <Row><Seg options={[["mix", "统计混合与纯度"], ["pt", "部分迹与关联"]]} value={tab} onChange={setTab} /></Row>
      {body}
    </Card>);
}

// =====================================================================
// F_III：时序乘积 vs. "直接积分"的错误演化算符
// =====================================================================
const TMAX = 20, NT = 800;
function evolveSeries(w0, w1, w, A, psi0) {
  const dt = TMAX / NT; let U = [[P.cx(1), P.cx(0)], [P.cx(0), P.cx(1)]];
  const prod = [[0, P.meanS(U, A, psi0)]], naive = [[0, P.meanS(U, A, psi0)]], exact = [[0, P.meanS(U, A, psi0)]];
  let maxErr = 0;
  for (let k = 1; k <= NT; k++) {
    const [a, b, c] = P.field(w0, w1, w, (k - 0.5) * dt);
    U = P.mmul(P.expSigma(a * dt / 2, b * dt / 2, c * dt / 2), U);
    const t = k * dt, Ue = P.Uexact(w0, w1, w, t);
    prod.push([t, P.meanS(U, A, psi0)]); exact.push([t, P.meanS(Ue, A, psi0)]); naive.push([t, P.meanS(P.Unaive(w0, w1, w, t), A, psi0)]);
    maxErr = Math.max(maxErr, P.mdist(U, Ue));
  }
  return { prod, naive, exact, maxErr, unit: P.unitarityErr(U) };
}
export function NaiveEvolutionPlot() {
  const [w, setW] = useState(1), [w1, setW1] = useState(0.4);
  const d = useMemo(() => evolveSeries(1, w1, w, P.SZ, [P.cx(1), P.cx(0)]), [w, w1]);
  const series = useCallback(() => [
    { label: R`\text{时序乘积}\ \prod U(t+\mathrm dt,t)`, data: d.prod, color: BLUE, width: 2.6 },
    { label: R`\text{解析解（旋转参考系）}`, data: d.exact, color: GOLD, dash: "dash" },
    { label: R`\sym{Vop}{V}(t,0)=\mathrm e^{-\frac i\hbar\int_0^tH\mathrm dt'}\ \text{（错误）}`, data: d.naive, color: RED, dash: "dot" },
  ], [d]);
  return (
    <Card title="交互：含时 Hamilton 算符——为什么不能把积分放进指数">
      <Row>
        <Slider label="$\omega/\omega_0$" value={w} min={0} max={2} step={0.02} onChange={setW} />
        <Slider label="$\omega_1/\omega_0$" value={w1} min={0.05} max={1} step={0.01} onChange={setW1} />
        <Btn onClick={() => setW(1)}>共振 $\omega=\omega_0$</Btn>
        <Btn onClick={() => setW(0)}>{R`$H$ 不含时 $\omega=0$`}</Btn>
      </Row>
      <Plot x={{ label: R`\omega_0t`, domain: [0, TMAX] }} y={{ label: R`\langle\sigma_z\rangle(t)`, domain: [-1.05, 1.05] }} series={series} samples={2} height={290} />
      <Cap>{R`自旋 1/2 在旋转磁场中：$H(t)=\frac\hbar2[\omega_0\sigma_z+\omega_1(\cos\omega t\,\sigma_x+\sin\omega t\,\sigma_y)]$，初态 $\ket0$（取 $\omega_0=1$）。蓝线把 $[0,t]$ 切成 ${NT} 段、按 \eqref{FIII-10} 依次相乘；它与解析解的最大偏差 $\|U-U_{\rm exact}\|=${sci(d.maxErr)}$，幺正性误差 $\|U^\dagger U-\mathbb 1\|=${sci(d.unit)}$。红色点线是 \eqref{FIII-20} 的 $V$：共振时它几乎看不到 Rabi 翻转，完全错了。按"$H$ 不含时"：$\omega=0$ 时各时刻的 $H$ 相同、彼此对易，三条曲线重合。`}</Cap>
    </Card>);
}

// =====================================================================
// G_III：两种绘景与平均值运动方程的数值核验
// =====================================================================
const OBS = { x: P.SX, y: P.SY, z: P.SZ };
export function PicturesLab() {
  const [w, setW] = useState(0.8), [w1, setW1] = useState(0.6), [th0, setTh0] = useState(30), [ob, setOb] = useState("x"), [ts, setTs] = useState(7);
  const A = OBS[ob], psi0 = useMemo(() => P.blochKet(th0 * Math.PI / 180, 0), [th0]);
  const d = useMemo(() => {
    const NS = 600, dt = TMAX / NS; let U = [[P.cx(1), P.cx(0)], [P.cx(0), P.cx(1)]];
    const S = [[0, P.meanS(U, A, psi0)]], Hp = [], B = [];
    let maxSH = 0, maxSB = 0;
    const idx = { x: 0, y: 1, z: 2 }[ob];
    for (let k = 1; k <= NS; k++) {
      const [a, b, c] = P.field(1, w1, w, (k - 0.5) * dt);
      U = P.mmul(P.expSigma(a * dt / 2, b * dt / 2, c * dt / 2), U);
      const t = k * dt;
      S.push([t, P.meanS(U, A, psi0)]);
      if (k % 15 === 0) Hp.push([t, P.meanH(U, A, psi0)]);
    }
    // 平均值方程（G_III 式 8 取平均）：独立的 RK4 积分，带正确的时间起点
    const f = (tt, v) => { const [a, b, c] = P.field(1, w1, w, tt); return [b * v[2] - c * v[1], c * v[0] - a * v[2], a * v[1] - b * v[0]]; };
    let v = P.blochVec(P.proj(psi0)); const h = TMAX / 3000; B.push([0, v[idx]]);
    for (let k = 0; k < 3000; k++) {
      const tt = k * h, k1 = f(tt, v), k2 = f(tt + h / 2, v.map((x, i) => x + h / 2 * k1[i])), k3 = f(tt + h / 2, v.map((x, i) => x + h / 2 * k2[i])), k4 = f(tt + h, v.map((x, i) => x + h * k3[i]));
      v = v.map((x, i) => x + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
      if ((k + 1) % 5 === 0) B.push([(k + 1) * h, v[idx]]);
    }
    Hp.forEach(([t, y]) => { const sv = S[Math.round(t / dt)][1]; maxSH = Math.max(maxSH, Math.abs(sv - y)); });
    B.forEach(([t, y]) => { const sv = S[Math.round(t / dt)]; if (sv && Math.abs(sv[0] - t) < 1e-9) maxSB = Math.max(maxSB, Math.abs(sv[1] - y)); });
    return { S, Hp, B, maxSH, maxSB };
  }, [w, w1, th0, ob]);   // eslint-disable-line
  const Ut = P.Uprod(1, w1, w, ts, 600), AH = P.mmul(P.mdag(Ut), P.mmul(A, Ut));
  const series = useCallback(() => [
    { label: R`\text{Schrödinger：}\braket{\psi_S(t)|A_S|\psi_S(t)}`, data: d.S, color: BLUE, width: 2.4 },
    { label: R`\text{Heisenberg：}\braket{\psi_H|A_H(t)|\psi_H}`, data: d.Hp, points: true, color: RED },
    { label: R`\text{平均值方程}\ \mathrm d\langle\boldsymbol\sigma\rangle/\mathrm dt=\boldsymbol\Omega\times\langle\boldsymbol\sigma\rangle`, data: d.B, color: GOLD, dash: "dash" },
  ], [d]);
  return (
    <Card title="交互：两种绘景给出同一个平均值">
      <Row>
        <Seg options={[["x", "$\\nosym{A=\\sigma_x}$"], ["y", "$\\nosym{A=\\sigma_y}$"], ["z", "$\\nosym{A=\\sigma_z}$"]]} value={ob} onChange={setOb} />
        <Slider label="$\omega/\omega_0$" value={w} min={0} max={2} step={0.02} onChange={setW} />
        <Slider label="$\omega_1/\omega_0$" value={w1} min={0.05} max={1} step={0.01} onChange={setW1} />
        <Slider label="$\sym{thLab}{\theta}_0\,[^\circ]$" value={th0} min={0} max={180} step={1} onChange={setTh0} />
      </Row>
      <Plot x={{ label: R`\omega_0t`, domain: [0, TMAX] }} y={{ label: R`\langle A\rangle(t)`, domain: [-1.05, 1.05] }} series={series} samples={2} height={290} vlines={[{ x: ts, label: R`t_*` }]} />
      <Row><Slider label="$\omega_0t_*$" value={ts} min={0} max={TMAX} step={0.1} onChange={setTs} /></Row>
      <Cap>{R`同一个含时体系（$H$ 同上图，初态 $\cos\frac{\sym{thLab}{\theta}_0}2\ket0+\sin\frac{\sym{thLab}{\theta}_0}2\ket1$），三条独立的计算路线：蓝线先演化态矢再取平均；红点先演化算符 $A_H=U^\dagger AU$（\eqref{GIII-3}）再在固定的 $\ket{\psi_H}$ 中取平均；金色虚线完全不用 $U$，而是对 \eqref{GIII-8} 取平均得到的 $\mathrm d\langle\boldsymbol\sigma\rangle/\mathrm dt=\boldsymbol\Omega(t)\times\langle\boldsymbol\sigma\rangle$ 直接做 RK4 积分。最大偏差：$|\text{S}-\text{H}|=${sci(d.maxSH)}$（只差舍入误差），$|\text{S}-\text{方程}|=${sci(d.maxSB)}$（离散化误差）。在 $t_*$ 时刻 Heisenberg 算符本身是 $A_H(t_*)=${mtex(AH)}$——它在变，态矢不变。`}</Cap>
    </Card>);
}

// =====================================================================
// H_III：规范变换前后的波函数、密度与流
// =====================================================================
export function GaugeLab() {
  const [g, setG] = useState(1.5), [kap, setKap] = useState(1.7), [k0, setK0] = useState(2), [sg, setSg] = useState(0.8);
  const d = useMemo(() => {
    const psi = P.packet(0, sg, k0), chi = P.gaugeChi(g, kap), Ap = P.gaugeA(g, kap), psi2 = P.gaugeTransform(psi, chi), A0 = () => 0;
    const m0 = P.gaugeMoments(psi, A0, 12, 12000), m1 = P.gaugeMoments(psi2, Ap, 12, 12000);
    let dJ = 0; for (let x = -4; x <= 4; x += 0.05) dJ = Math.max(dJ, Math.abs(P.gaugeCurrent(psi, A0, x) - P.gaugeCurrent(psi2, Ap, x)));
    return { psi, psi2, Ap, A0, m0, m1, dJ };
  }, [g, kap, k0, sg]);
  const series = useCallback(() => [
    { label: R`\mathrm{Re}\,\psi\ \ (\text{规范}\ \mathcal J:\ \mathbf A=0)`, f: x => d.psi(x).re, color: BLUE, width: 1.6 },
    { label: R`\mathrm{Re}\,\psi'\ \ (\text{规范}\ \mathcal J')`, f: x => d.psi2(x).re, color: GREEN, width: 1.6 },
    { label: R`|\psi|^2=|\psi'|^2`, f: x => P.cabs2(d.psi(x)), color: INK, width: 2.6 },
    { label: R`J\ \text{（规范}\ \mathcal J\text{）}`, f: x => P.gaugeCurrent(d.psi, d.A0, x), color: RED, width: 3 },
    { label: R`J'\ \text{（规范}\ \mathcal J'\text{，用}\ \mathbf A'\text{）}`, f: x => P.gaugeCurrent(d.psi2, d.Ap, x), color: GOLD, dash: "dash", width: 2 },
  ], [d]);
  return (
    <Card title="交互：规范变换改变相位，不改变物理">
      <Row>
        <Slider label="$\sym{gLab}{g}$" value={g} min={0} max={3} step={0.05} onChange={setG} />
        <Slider label="$\kappa$" value={kap} min={0.2} max={4} step={0.05} onChange={setKap} />
        <Slider label="$k_0$" value={k0} min={0} max={4} step={0.05} onChange={setK0} />
        <Slider label="$\sym{sgLab}{\sigma}$" value={sg} min={0.4} max={1.5} step={0.05} onChange={setSg} />
      </Row>
      <Plot x={{ label: R`x`, domain: [-4, 4] }} y={{ label: R`\text{波函数 / 密度 / 流}`, domain: [-0.75, 1.1] }} series={series} samples={500} height={310} />
      <Cap>{R`一维高斯波包（$\hbar=m=q=1$），原规范 $\mathbf A=0$、$\sym{Upot}{U}=0$；规范函数 $\chi(x)=\sym{gLab}{g}\sin\kappa x$ 给出 $A'=\partial_x\chi=\sym{gLab}{g}\kappa\cos\kappa x$，$\sym{Upot}{U}'=\sym{Upot}{U}$。$\psi'=\mathrm e^{iq\chi/\hbar}\psi$（\eqref{HIII-44}）的实部与 $\psi$ 明显不同，密度却完全重合（\eqref{HIII-73}），两种规范各自按 \eqref{HIII-72} 算出的流也重合：$\max|J-J'|=${sci(d.dJ)}$（数值求导误差）。平均值：正则动量 $\langle P\rangle=${fx(d.m0.P, 4)}$ → $\langle P\rangle'=${fx(d.m1.P, 4)}$（变了，非物理量）；机械动量 $\langle\boldsymbol\Pi\rangle=${fx(d.m0.Pi, 4)}$ → $\langle\boldsymbol\Pi\rangle'=\langle P-qA'\rangle'=${fx(d.m1.Pi, 4)}$（不变，真物理量）；归一化 $${fx(d.m1.norm, 6)}$。`}</Cap>
    </Card>);
}
