// 第 III 章补充材料（下）的交互图。数值核心在 _ch03d_phys.js（已用 node 与解析解逐一核对）。
import { useMemo, useState } from "react";
import { Plot, renderTex, TxI } from "@kit";
import * as P from "./_ch03d_phys.js";

const R = String.raw;
const f3 = (v, d = 3) => (Number.isFinite(v) ? (+v).toPrecision(d) : "—");
const sci = (v, d = 2) => { if (!Number.isFinite(v)) return "—"; if (v === 0) return "0"; const e = Math.floor(Math.log10(Math.abs(v))); return Math.abs(e) <= 2 ? (+v).toPrecision(d + 1) : `${(v / 10 ** e).toFixed(d)}\\times10^{${e}}`; };

function Slider({ label, value, min, max, step, log, onChange, fmt }) {
  const toS = v => (log ? Math.log10(v) : v), fromS = s => (log ? 10 ** s : s);
  return (
    <label className="plot-param">
      <span className="plot-plabel" dangerouslySetInnerHTML={{ __html: renderTex(`${label}=${fmt ? fmt(value) : +(+value).toPrecision(3)}`) }} />
      <input type="range" min={toS(min)} max={toS(max)} step={log ? 0.01 : step} value={toS(value)} onChange={e => onChange(fromS(+e.target.value))} />
    </label>);
}
function Seg({ options, value, onChange }) {
  return <div className="seg" style={{ marginBottom: 6 }}>{options.map(([v, lab]) => <button key={v} className={value === v ? "on" : ""} onClick={() => onChange(v)}><TxI>{lab}</TxI></button>)}</div>;
}
const Card = ({ title, children }) => <div className="card" style={{ padding: "12px 14px", margin: "1em 0" }}><b>{title}</b>{children}</div>;
const Cap = ({ children }) => <div className="plot-cap" style={{ marginTop: 6 }}><TxI>{children}</TxI></div>;

// =====================================================================
// J_III：传播子作用于高斯波包（ħ = m = 1）
// =====================================================================
export function PropagatorPlot() {
  const [t, setT] = useState(1.5), [a, setA] = useState(1), [k0, setK0] = useState(2);
  const d = useMemo(() => {
    const w = P.widthExact(t, a), xc = k0 * t, lo = Math.min(-2.5 * a, xc - 5 * w), hi = Math.max(2.5 * a, xc + 5 * w), n = 181;
    const xs = Array.from({ length: n }, (_, i) => lo + (hi - lo) * i / (n - 1));
    const num = xs.map(x => P.psiConv(x, t, a, k0, 0)), ex = xs.map(x => P.psiExact(x, t, a, k0, 0));
    const rho = num.map(P.cabs2), m = P.moments(xs, rho);
    let err = 0, mx = 0; num.forEach((c, i) => { err = Math.max(err, Math.hypot(c.re - ex[i].re, c.im - ex[i].im)); mx = Math.max(mx, Math.hypot(ex[i].re, ex[i].im)); });
    return { xs, num, ex, rho, m, err, mx, lo, hi, w, xc };
  }, [t, a, k0]);
  const series = () => [
    { label: R`|\psi(x,t)|^2\ \text{（}K\ \text{数值卷积）}`, data: d.xs.map((x, i) => [x, d.rho[i]]), color: "#2c4a6e", width: 2.6 },
    { label: R`\text{解析解（}\mathrm G_{\rm I}\text{）}`, data: d.xs.filter((_, i) => i % 6 === 0).map((x, i) => [x, P.cabs2(d.ex[i * 6])]), points: true, color: "#c0392b" },
    { label: R`\operatorname{Re}\psi(x,t)\ \text{（数值）}`, data: d.xs.map((x, i) => [x, d.num[i].re]), color: "#2c6e49", dash: "dash", width: 1.4 },
    { label: R`|\psi(x,0)|^2`, data: d.xs.map(x => [x, P.cabs2(P.psi0(x, a, k0, 0))]), color: "#999", dash: "dot" },
  ];
  return (
    <Card title="交互：用传播子一步算出 t 时刻的波包">
      <div className="plot-params" style={{ marginTop: 8 }}>
        <Slider label={R`t`} value={t} min={0.05} max={6} step={0.05} onChange={setT} />
        <Slider label={R`a`} value={a} min={0.5} max={2} step={0.05} onChange={setA} />
        <Slider label={R`k_0`} value={k0} min={-3} max={3} step={0.1} onChange={setK0} />
      </div>
      <Plot x={{ label: R`x`, domain: [d.lo, d.hi] }} y={{ label: R`\text{振幅 / 概率密度}` }} series={series} height={330} vlines={[{ x: d.xc, label: R`k_0t` }]} />
      <table className="tb-table" style={{ margin: "6px 0" }}><tbody>
        <tr><td><TxI>{`数值：归一 $${f3(d.m.norm, 5)}$，$\\langle x\\rangle=${f3(d.m.mean, 4)}$，$\\Delta x=${f3(d.m.width, 4)}$`}</TxI></td>
          <td><TxI>{`解析：$k_0t=${f3(d.xc, 4)}$，$\\Delta x=\\frac a2\\sqrt{1+4t^2/a^4}=${f3(d.w, 4)}$`}</TxI></td></tr>
        <tr><td colSpan={2} className="muted"><TxI>{`逐点最大偏差 $|\\psi_{\\rm 卷积}-\\psi_{\\rm 解析}|=${sci(d.err, 1)}$（$|\\psi|$ 最大值 $${f3(d.mx, 3)}$）。`}</TxI></td></tr>
      </tbody></table>
      <Cap>{R`单位取 $\hbar=m=1$。初态 $\psi(x,0)=(2/\pi a^2)^{1/4}\mathrm e^{ik_0x}\mathrm e^{-x^2/a^2}$。蓝线是把自由粒子传播子 $K=(2\pi it)^{-1/2}\mathrm e^{i(x-x')^2/2t}$ 代入 \eqref{JIII-1}、对 $x'$ 逐点数值积分（Simpson）得到的结果；红点是 \Ic{GI} 的解析解（复宽度 $a^2\to a^2+2it$）。两者在机器精度内重合；中心以 $k_0$ 运动，宽度按双曲线扩散。绿色虚线 $\operatorname{Re}\psi$ 显示了扩散波包的"啁啾"：前沿波长短、后沿波长长——快的分量跑在前面。`}</Cap>
    </Card>);
}

// =====================================================================
// J_III：路径求和的 Cornu 螺线
// =====================================================================
export function CornuPlot() {
  const [hb, setHb] = useState(0.3);
  const d = useMemo(() => {
    const c = Math.PI * Math.PI / (4 * hb), Amax = 1, n = Math.min(Math.max(800, Math.ceil(2 * c * Amax * 2 * Amax / 0.15)), 8000);
    const pts = P.cornu(c, Amax, n), s = Math.sqrt(c / Math.PI);
    const A = j => -Amax + 2 * Amax * j / n, near = 0.2;
    const all = pts.map(([x, y]) => [x * s, y * s]);
    const mid = all.filter((_, j) => Math.abs(A(j)) <= near);
    const zN = [mid[mid.length - 1][0] - mid[0][0], mid[mid.length - 1][1] - mid[0][1]], zT = all[all.length - 1];
    return { all, mid, ratio: Math.hypot(...zN) / Math.hypot(...zT), zT, c };
  }, [hb]);
  const series = () => [
    { label: R`\text{部分和}\ \textstyle\int_{-1}^{A}\mathrm e^{iS(u)/\hbar}\mathrm du`, data: d.all, color: "#2c4a6e", width: 1.6 },
    { label: R`|A|\le0.2\ \text{的路径（贴近经典路径）}`, data: d.mid, color: "#c0392b", width: 3.2 },
    { label: R`\text{全部路径}\ (|A|\le1)\ \text{之和}`, data: [d.zT], points: true, color: "#1f1b16" },
  ];
  return (
    <Card title="交互：路径求和中，哪些路径真正有贡献？">
      <div className="plot-params" style={{ marginTop: 8 }}>
        <Slider label={R`\hbar\ \text{（相对于作用量尺度）}`} value={hb} min={0.01} max={3} log onChange={setHb} />
      </div>
      <Plot x={{ label: R`\operatorname{Re}\ \text{（以}\ \sqrt{\pi\hbar/c'}\ \text{为单位）}`, domain: [-0.2, 1.15] }} y={{ label: R`\operatorname{Im}`, domain: [-0.45, 0.9] }} series={series} height={380} />
      <Cap>{R`自由粒子从 $(x_1,0)$ 到 $(x_2,T)$，取一族路径 $x(t)=x_{cl}(t)+A\sin(\pi t/T)$。作用量 $S(A)=S_{cl}+\frac{m\pi^2}{4T}A^2$ 只在 $A=0$（经典路径）处稳定；这里取 $m=T=1$，$A$ 从 $-1$ 到 $1$。每条路径贡献 $\mathrm e^{iS/\hbar}$，蓝线是逐条累加的结果（复平面上的 Cornu 螺线；坐标以 $\sqrt{\pi/c'}$ 为单位，$c'=m\pi^2/4T\hbar$；黑点是 $|A|\le1$ 全部路径之和）。红色一段是 $|A|\le0.2$ 的路径。当前 $\hbar=${f3(hb, 2)}$：红段的合振幅占总振幅的 $${f3(100 * d.ratio, 3)}\%$。$\hbar$ 越小，远离经典路径的贡献越是卷成小螺旋相互抵消，红段越接近全部——经典极限；$\hbar$ 大时远处路径也举足轻重，"轨道"失去意义。`}</Cap>
    </Card>);
}

// =====================================================================
// K_III：指数衰减与 Lorentz 线形（ħ = 1）
// =====================================================================
export function DecayPlot() {
  const [tau, setTau] = useState(2);
  const E0 = 6, G = 1 / tau;
  const d = useMemo(() => {
    const spec = E => P.spectrumNum(E, E0, G);
    const lo = E0 - 8 * G, hi = E0 + 8 * G;
    return { fw: P.fwhm(spec, E0 - 20 * G, E0 + 20 * G, 3000), ml: P.meanLife(G), pts: Array.from({ length: 41 }, (_, i) => { const E = lo + (hi - lo) * i / 40; return [E, spec(E)]; }), lo, hi };
  }, [tau]);
  return (
    <Card title="交互：寿命与线宽">
      <div className="plot-params" style={{ marginTop: 8 }}>
        <Slider label={R`\tau`} value={tau} min={0.3} max={10} log onChange={setTau} />
      </div>
      <Plot x={{ label: R`t`, domain: [0, 5 * Math.max(tau, 1)] }} y={{ label: R`\text{概率 / 振幅}`, domain: [-1.05, 1.05] }} height={260}
        series={() => [
          { label: R`\mathcal P(t)=|c(t)|^2=\mathrm e^{-t/\tau}`, f: t => Math.exp(-t / tau), color: "#c0392b", width: 2.6 },
          { label: R`\operatorname{Re}c(t)=\mathrm e^{-t/2\tau}\cos E_nt`, f: t => Math.exp(-t / (2 * tau)) * Math.cos(E0 * t), color: "#2c4a6e", width: 1.2 },
          { label: R`\pm\mathrm e^{-t/2\tau}`, f: t => Math.exp(-t / (2 * tau)), color: "#999", dash: "dot" },
        ]} vlines={[{ x: tau, label: R`t=\tau` }]} />
      <Plot x={{ label: R`E`, domain: [d.lo, d.hi] }} y={{ label: R`w(E)` }} height={260}
        series={() => [
          { label: R`\text{Lorentz：}\ \frac{\hbar\gamma/2\pi}{(E-E_n)^2+(\hbar\gamma/2)^2}`, f: E => P.lorentz(E, E0, G), color: "#1f1b16", width: 2.4 },
          { label: R`\text{数值 Fourier 变换}\ |\textstyle\int_0^\infty c(t)\mathrm e^{iEt}\mathrm dt|^2\cdot\gamma/2\pi`, data: d.pts, points: true, color: "#c0392b" },
        ]} vlines={[{ x: E0 - G / 2, label: R`E_n-\hbar\gamma/2` }, { x: E0 + G / 2, label: R`E_n+\hbar\gamma/2` }]} />
      <table className="tb-table" style={{ margin: "6px 0" }}><tbody>
        <tr><td><TxI>{`数值半高全宽 $=${f3(d.fw, 5)}$`}</TxI></td><td><TxI>{`$\\hbar/\\tau=\\hbar\\gamma=${f3(1 / tau, 5)}$；乘积 $\\Gamma_{\\rm FWHM}\\cdot\\tau=${f3(d.fw * tau, 5)}\\,\\hbar$`}</TxI></td></tr>
        <tr><td colSpan={2}><TxI>{`数值平均寿命 $\\int_0^\\infty t\\,\\mathrm e^{-t/\\tau}\\mathrm dt/\\tau=${f3(d.ml, 5)}$（应为 $\\tau=${f3(tau, 5)}$，式 \\eqref{KIII-6}）`}</TxI></td></tr>
      </tbody></table>
      <Cap>{R`单位取 $\hbar=1$，能级 $E_n=6$。上图：振幅 $c(t)=\mathrm e^{-iE_n't}$ 的实部在包络 $\mathrm e^{-t/2\tau}$ 内振荡，概率按 $\mathrm e^{-t/\tau}$ 衰减。下图：对 $c(t)$ 直接做数值 Fourier 变换（红点）与 Lorentz 曲线（黑线）重合，半高全宽恰为 $\hbar/\tau$。拖动 $\tau$：寿命加倍，线宽减半。`}</Cap>
    </Card>);
}

// =====================================================================
// M_III：打靶法求任意势阱的束缚态（ħ²/2m = 1）
// =====================================================================
const COLS = ["#c0392b", "#2c4a6e", "#2c6e49", "#b8862b", "#7d3c98", "#16808a", "#1f1b16", "#d35400", "#5d6d7e"];
export function ShootingPlot() {
  const [shape, setShape] = useState("gauss"), [V0, setV0] = useState(20), [eRel, setERel] = useState(-0.5);
  const W = P.WELLS[shape];
  const lev = useMemo(() => P.boundLevels(W.V, V0, W.X, W.n), [shape, V0]);
  const states = useMemo(() => lev.map(E => P.boundState(W.V, V0, W.X, E, 2.5, W.n)), [lev]);
  const exact = shape === "square" ? P.squareWellExact(V0) : shape === "sech2" ? P.sech2Exact(V0) : null;
  const E = eRel * V0;
  const shot = useMemo(() => {
    const s = P.shoot(W.V, V0, W.X, E, W.n, true), rho = s.rho, tail = 2.5, out = [];
    for (let i = 0; i <= 60; i++) { const x = -W.X - tail + tail * i / 60; out.push([x, Math.exp(rho * (x + W.X))]); }
    s.xs.forEach((x, i) => out.push([x, s.ys[i]]));
    for (let i = 1; i <= 60; i++) { const u = tail * i / 60; out.push([W.X + u, s.B * Math.exp(rho * u) + s.Bp * Math.exp(-rho * u)]); }
    const allowed = out.filter(([x]) => x <= W.X && W.V(x, V0) < E);
    const mx = Math.max(...(allowed.length ? allowed : out.filter(([x]) => x <= W.X)).map(([, y]) => Math.abs(y)));
    return { pts: out.map(([x, y]) => [x, y / mx]), sign: Math.sign(s.B), B: Math.sign(s.B) * Math.log10(1 + Math.abs(s.B / s.Bp)) };
  }, [shape, V0, E]);
  const Bcurve = useMemo(() => Array.from({ length: 241 }, (_, i) => { const e = -V0 + V0 * (i + 0.5) / 241; const s = P.shoot(W.V, V0, W.X, e, W.n); return [e, Math.sign(s.B) * Math.log10(1 + Math.abs(s.B / s.Bp))]; }), [shape, V0]);
  const xr = W.X + 2.5;
  // 每个本征函数的振幅取相邻能级间距的 40%
  const amp = i => { const up = i + 1 < lev.length ? lev[i + 1] : 0, dn = i > 0 ? lev[i - 1] : -V0, gap = Math.max(Math.min(up - lev[i], lev[i] - dn), 0.02 * V0); return 0.4 * gap / Math.max(...states[i].ys.map(Math.abs)); };
  return (
    <Card title="交互：打靶法——只有分立的能量能让两端都收住">
      <div className="plot-params" style={{ marginTop: 8 }}>
        <Seg options={Object.entries(P.WELLS).map(([k, w]) => [k, w.lab])} value={shape} onChange={setShape} />
        <Slider label={R`V_0`} value={V0} min={1} max={80} step={0.5} onChange={setV0} />
        <Slider label={R`E/V_0`} value={eRel} min={-0.999} max={-0.0005} step={0.0005} onChange={setERel} fmt={v => (+v).toFixed(4)} />
      </div>
      <Plot x={{ label: R`x`, domain: [-xr, xr] }} y={{ label: R`\varphi_E(x)\ \text{（左端衰减解，归一到阱内最大值）}`, domain: [-2, 2] }} height={260}
        series={() => [
          { label: R`\text{从左边}\ \mathrm e^{\rho x}\ \text{出发积分，}E=${f3(E, 4)}`, data: shot.pts, color: shot.sign > 0 ? "#c0392b" : "#2c4a6e", width: 2.4 },
          { label: R`V(x)/V_0`, f: x => W.V(x, V0) / V0, color: "#999", dash: "dash" },
        ]} vlines={[{ x: -W.X, label: R`x_1` }, { x: W.X, label: R`x_2` }]} />
      <Plot x={{ label: R`E`, domain: [-V0, 0] }} y={{ label: R`\tilde B(E)\ \text{（压缩刻度）}` }} height={220}
        series={() => [{ label: R`\operatorname{sgn}\tilde B\cdot\log_{10}\!\big(1+|\tilde B\mathrm e^{\rho x_2}/\tilde B'\mathrm e^{-\rho x_2}|\big)`, data: Bcurve, color: "#1f1b16", width: 2 }, { label: R`\text{当前}\ E`, data: [[E, shot.B]], points: true, color: "#c0392b" }]}
        vlines={lev.map((e, i) => ({ x: e, label: `E_{${i + 1}}` }))} />
      <Plot x={{ label: R`x`, domain: [-xr, xr] }} y={{ label: R`\text{能量}`, domain: [-V0 * 1.08, V0 * 0.12] }} height={340}
        series={() => [
          { label: R`V(x)`, f: x => W.V(x, V0), color: "#1f1b16", width: 2.4 },
          ...states.flatMap((s, i) => {
            const e = lev[i], inside = s.xs.map((x, j) => [x, W.V(x, V0)]).filter(([, v]) => v <= e);
            const x1 = inside.length ? inside[0][0] : 0, x2 = inside.length ? inside[inside.length - 1][0] : 0;
            return [
              { label: i < 6 ? `E_{${i + 1}}=${f3(e, 4)}` : undefined, data: [[x1, e], [x2, e]], color: COLS[i % COLS.length], dash: "dot" },
              { data: s.xs.filter((_, j) => j % 3 === 0).map((x, j) => [x, e + amp(i) * s.ys[j * 3]]), color: COLS[i % COLS.length], width: 1.6 },
            ];
          }),
        ]} />
      <table className="tb-table" style={{ margin: "6px 0" }}><thead><tr><th>能级</th><th>打靶法 E</th><th>解析值</th><th>节点数</th><th><TxI>{`$\\langle T\\rangle$`}</TxI></th><th><TxI>{`$\\langle V\\rangle$`}</TxI></th></tr></thead>
        <tbody>{lev.slice(0, 8).map((e, i) => <tr key={i}><td><TxI>{`$E_{${i + 1}}$`}</TxI></td><td>{f3(e, 6)}</td><td>{exact ? f3(exact[i], 6) : "—"}</td><td>{states[i].nodes}</td><td>{f3(states[i].T, 4)}</td><td>{f3(states[i].V, 4)}</td></tr>)}</tbody></table>
      <Cap>{R`单位取 $\hbar^2/2m=1$（于是 $E=k^2$），阱宽量级为 1。上图：任取一个 $E$，从 $x_1$ 左侧的衰减尾巴 $\mathrm e^{\rho x}$ 出发积分；穿过阱后右边一般冒出增长项 $\tilde B\,\mathrm e^{\rho x}$，曲线向上（红）或向下（蓝）发散。把 $E$ 拖到某个 $E_n$ 附近，发散方向翻转——中图的 $\tilde B(E)$ 正好过零。下图是能级示意图：水平虚线画在经典允许区内，实线是相应的本征函数。表中可核对：(i) 方势阱与 Pöschl–Teller 阱 $-V_0/\cosh^2x$ 的解析能级；(ii) 第 $n$ 个能级恰有 $n-1$ 个节点；(iii) $\langle T\rangle+\langle V\rangle=E$、$\langle T\rangle>0$、$E_1>-V_0$（式 MIII-17）。增大 $V_0$，能级逐个从 $E=0$ 处"冒出来"；任何深度至少有一个束缚态。双阱中能级成对出现（隧穿分裂）。`}</Cap>
    </Card>);
}

// =====================================================================
// N_III：传递矩阵、透射与反射（ħ²/2m = 1）
// =====================================================================
export function TransferPlot() {
  const [shape, setShape] = useState("double"), [V0, setV0] = useState(8), [Ec, setEc] = useState(3);
  const B = P.BARRIERS[shape], Vf = x => B.V(x, V0), Emax = Math.max(3 * Math.abs(V0), 6);
  const curve = useMemo(() => {
    const out = [];
    for (let i = 1; i <= 260; i++) {
      const E = Emax * i / 260, k = Math.sqrt(E), M = P.Mnum(Vf, B.l, k, 260);
      out.push({ E, T1: 1 / P.cabs2(M[0][0]), T2: 1 / P.cabs2(M[1][1]), R1: P.cabs2(M[1][0]) / P.cabs2(M[0][0]) });
    }
    return out;
  }, [shape, V0]);
  const Euse = Math.min(Ec, Emax);
  const M = P.Mnum(Vf, B.l, Math.sqrt(Euse), 1200), det = P.mdet(M);
  const cs = c => `${f3(c.re, 4)}${c.im >= 0 ? "+" : "-"}${f3(Math.abs(c.im), 4)}i`;
  const analytic = shape === "square" || shape === "well";
  const Vsq = shape === "square" ? V0 : -V0;
  return (
    <Card title="交互：传递矩阵 M(k) 算出的透射与反射">
      <div className="plot-params" style={{ marginTop: 8 }}>
        <Seg options={Object.entries(P.BARRIERS).map(([k, b]) => [k, b.lab])} value={shape} onChange={setShape} />
        <Slider label={R`V_0`} value={V0} min={0.5} max={30} step={0.5} onChange={setV0} />
        <Slider label={R`E`} value={Euse} min={0.02} max={Emax} step={0.01} onChange={setEc} />
      </div>
      <Plot x={{ label: R`E\ \ (\hbar^2/2m=1)`, domain: [0, Emax] }} y={{ label: R`T,\ R`, domain: [-0.02, 1.05] }} height={300}
        series={() => [
          { label: R`T_1=1/|F|^2\ \text{（左入射，数值）}`, data: curve.map(c => [c.E, c.T1]), color: "#2c4a6e", width: 2.6 },
          { label: R`T_2=1/|G'|^2\ \text{（右入射，独立数值积分）}`, data: curve.map(c => [c.E, c.T2]), color: "#d35400", dash: "dash", width: 1.6 },
          { label: R`R_1=|G/F|^2`, data: curve.map(c => [c.E, c.R1]), color: "#c0392b", width: 1.6 },
          ...(analytic ? [{ label: R`T\ \text{解析（式 NIII-34/38）}`, data: curve.filter((_, i) => i % 8 === 4).map(c => [c.E, 1 / P.cabs2(P.Msquare(Vsq, B.l, Math.sqrt(c.E))[0][0])]), points: true, color: "#1f1b16" }] : []),
          { label: R`V(x)\ \text{的最大值}`, data: [[Math.max(0, ...Array.from({ length: 50 }, (_, i) => Vf(-B.l / 2 + B.l * i / 49))), 0]], points: true, color: "#999" },
        ]} vlines={[{ x: Euse, label: R`E` }]} />
      <Plot x={{ label: R`x`, domain: [-B.l / 2 - 1, B.l / 2 + 1] }} y={{ label: R`V(x)`, domain: [Math.min(0, shape === "well" ? -V0 : 0) - 0.3 * V0, Math.max(V0, Euse) * 1.3] }} height={200}
        series={() => [{ label: R`V(x)`, f: x => (Math.abs(x) <= B.l / 2 ? Vf(x) : 0), color: "#1f1b16", width: 2 }, { label: R`E`, f: () => Euse, color: "#2c4a6e", dash: "dash" }]} samples={400} />
      <table className="tb-table" style={{ margin: "6px 0" }}><tbody>
        <tr><td><TxI>{`$F=${cs(M[0][0])}$，$G=${cs(M[1][0])}$`}</TxI></td><td><TxI>{`$F'=${cs(M[0][1])}$，$G'=${cs(M[1][1])}$`}</TxI></td></tr>
        <tr><td><TxI>{`$\\det M=|F|^2-|G|^2=${cs(det)}$`}</TxI></td><td><TxI>{`$T_1=${f3(1 / P.cabs2(M[0][0]), 6)}$，$T_2=${f3(1 / P.cabs2(M[1][1]), 6)}$，$R_1+T_1=${f3((P.cabs2(M[1][0]) + 1) / P.cabs2(M[0][0]), 8)}$`}</TxI></td></tr>
        <tr><td colSpan={2} className="muted"><TxI>{`核对 \\eqref{NIII-16}–\\eqref{NIII-17}：$G'-F^*=${sci(Math.hypot(M[1][1].re - M[0][0].re, M[1][1].im + M[0][0].im), 1)}$，$F'-G^*=${sci(Math.hypot(M[0][1].re - M[1][0].re, M[0][1].im + M[1][0].im), 1)}$${shape === "square" || shape === "well" || shape === "double" || shape === "gauss" ? `；偶势：$\\operatorname{Re}G=${sci(M[1][0].re, 1)}$` : ""}。`}</TxI></td></tr>
      </tbody></table>
      <Cap>{R`单位取 $\hbar^2/2m=1$，$E=k^2$。对每个能量，从 $x=-l/2$ 处的 $\mathrm e^{ikx}$ 与 $\mathrm e^{-ikx}$ 出发分别数值积分 \eqref{NIII-1}，在 $x=+l/2$ 处分解出 $F,G$ 与 $F',G'$——**没有**用到 \eqref{NIII-16}–\eqref{NIII-17}，所以表中这两条关系与 $\det M=1$ 都是真正的检验。方势垒/方势阱的黑点是解析式 \eqref{NIII-34}、\eqref{NIII-38}（改正后）。双势垒：能量远低于势垒顶时出现一串尖锐的透射峰（共振隧穿）；斜坡势垒：形状左右不对称，$T_1$ 与 $T_2$ 却处处重合。`}</Cap>
    </Card>);
}

// =====================================================================
// O_III：N 个相同方势垒（周期 l = 1，宽 b，高 V0；ħ²/2m = 1）
// =====================================================================
export function BandPlot() {
  const [V0, setV0] = useState(60), [b, setB] = useState(0.3), [N, setN] = useState(8);
  const l = 1, Emax = 250;
  const d = useMemo(() => {
    const es = Array.from({ length: 700 }, (_, i) => Emax * (i + 0.5) / 700);
    const X = es.map(E => P.Xof(V0, b, l, Math.sqrt(E)));
    const bandsA = P.bandEdges(V0, b, l, Math.sqrt(Emax), 6000), bands = bandsA.map(([a1, a2]) => [a1 * a1, a2 * a2]);
    // 每个允许带内按 α 细分取样，得到色散曲线 E(k)
    const branches = bandsA.map(([a1, a2]) => Array.from({ length: 161 }, (_, j) => { const a = a1 + (a2 - a1) * j / 160, x = Math.max(-1, Math.min(1, P.Xof(V0, b, l, a))); return [Math.acos(x) / l, a * a]; }));
    const traj = Array.from({ length: 900 }, (_, i) => { const a = Math.sqrt(Emax) * (i + 0.5) / 900, F = P.cellM(V0, b, a)[0][0], z = P.cmul(P.cexpi(a * l), F); return [z.re, z.im]; });
    return { es, X, bands, branches, traj };
  }, [V0, b]);
  const TN = useMemo(() => d.es.map(E => [E, P.TN(V0, b, l, Math.sqrt(E), N)]).filter(([, t]) => t > 1e-12), [d, N]);
  const T1 = useMemo(() => d.es.map(E => [E, P.TN(V0, b, l, Math.sqrt(E), 1)]), [d]);
  const edges = d.bands.flatMap(([e1, e2]) => [{ x: e1 }, { x: e2 }]).filter(v => v.x < Emax * 0.999);
  // N 个势垒时的能级：每个带内 k = pπ/(Nl)，p = 0…N−1（大 N 近似 OIII-48）
  const levels = [];
  d.branches.forEach(br => { for (let q = 0; q < N; q++) { const kp = q * Math.PI / (N * l); for (let i = 1; i < br.length; i++) { const [k1, E1] = br[i - 1], [k2, E2] = br[i]; if ((k1 - kp) * (k2 - kp) <= 0 && k1 !== k2) { levels.push([kp, E1 + (E2 - E1) * (kp - k1) / (k2 - k1)]); break; } } } });
  return (
    <Card title="交互：从一个势垒到 N 个势垒——能带与 Bragg 反射">
      <div className="plot-params" style={{ marginTop: 8 }}>
        <Slider label={R`V_0`} value={V0} min={0} max={200} step={1} onChange={setV0} />
        <Slider label={R`b/l`} value={b} min={0.05} max={0.9} step={0.01} onChange={setB} />
        <Slider label={R`N`} value={N} min={1} max={40} step={1} onChange={v => setN(Math.round(v))} />
      </div>
      <Plot x={{ label: R`E\ \ (\hbar^2/2m=1,\ l=1)`, domain: [0, Emax] }} y={{ label: R`X(\alpha)`, domain: [-4, 4] }} height={240}
        series={() => [
          { label: R`X(\alpha)=\operatorname{Re}[\mathrm e^{i\alpha l}F(\alpha)]`, data: d.es.map((E, i) => [E, d.X[i]]), color: "#1f1b16", width: 2.2 },
          { label: R`X=\cos\alpha l\ \text{（自由粒子）}`, f: E => Math.cos(Math.sqrt(E) * l), color: "#999", dash: "dash" },
          { label: R`\pm1`, f: () => 1, color: "#c0392b", dash: "dot" }, { f: () => -1, color: "#c0392b", dash: "dot" },
        ]} vlines={edges} />
      <Plot x={{ label: R`E`, domain: [0, Emax] }} y={{ label: R`T_N(E)`, log: true, domain: [1e-10, 2] }} height={260}
        series={() => [
          { label: R`T_N\ \text{（}N=${N}\text{，式 OIII-15）}`, data: TN, color: "#2c4a6e", width: 1.8 },
          { label: R`\text{单个势垒}\ T_1`, data: T1, color: "#c0392b", dash: "dash" },
          { label: R`(T_1)^N\ \text{（“各自透射之积”，错误的估计）}`, data: T1.map(([E, t]) => [E, t ** N]).filter(([, t]) => t > 1e-12), color: "#999", dash: "dot" },
        ]} vlines={edges.map(v => ({ x: v.x }))} />
      <div>
        <div>
          <Plot x={{ label: R`k\ \ (0\le k\le\pi/l)`, domain: [0, Math.PI / l] }} y={{ label: R`E`, domain: [0, Emax] }} height={300}
            series={() => [
              ...d.branches.map((br, i) => ({ label: i === 0 ? R`E(k)\ \text{（允许带）}` : undefined, data: br, color: "#2c4a6e", width: 2.4 })),
              { label: R`\text{自由粒子}`, f: k => k * k, color: "#999", dash: "dash" },
              ...[k => (2 * Math.PI / l - k) ** 2, k => (2 * Math.PI / l + k) ** 2, k => (4 * Math.PI / l - k) ** 2, k => (4 * Math.PI / l + k) ** 2].map(f => ({ f, color: "#999", dash: "dash" })),
              { label: R`k=p\pi/Nl\ \text{的能级}`, data: levels, points: true, color: "#c0392b" },
            ]} />
        </div>
        <div>
          <Plot x={{ label: R`X=\operatorname{Re}[\mathrm e^{i\alpha l}F]`, domain: [-4, 4] }} y={{ label: R`Y=\operatorname{Im}[\mathrm e^{i\alpha l}F]`, domain: [-4, 4] }} height={300}
            series={() => [
              { label: R`\mathrm e^{i\alpha l}F(\alpha)\ \text{的轨迹}`, data: d.traj, color: "#1f1b16", width: 1.6 },
              { label: R`\text{单位圆}`, data: Array.from({ length: 121 }, (_, i) => [Math.cos(i * Math.PI / 60), Math.sin(i * Math.PI / 60)]), color: "#999", dash: "dash" },
              { label: R`X=\pm1`, data: [[1, -4], [1, 4]], color: "#c0392b", dash: "dot" }, { data: [[-1, -4], [-1, 4]], color: "#c0392b", dash: "dot" },
            ]} />
        </div>
      </div>
      <Cap>{R`单元：周期 $l=1$，中央是宽 $b$、高 $V_0$ 的方势垒（Kronig–Penney 型），$F(\alpha)$ 取自 \eqref{NIII-34}/\eqref{NIII-38}。竖线是 $|X|=1$ 的能量 $E(\alpha_0),E(\alpha_1),\dots$（允许带为 $\alpha_0\le\alpha\le\alpha_1$、$\alpha_2\le\alpha\le\alpha_3$……）。第二图：$T_N$ 由 $N$ 个传递矩阵与 $N-1$ 个 $D$ 矩阵相乘直接算出；在禁带中随 $N$ 指数下降（\eqref{OIII-34}），在允许带中不衰减、出现 $N-1$ 个透射峰，远大于错误的估计 $(T_1)^N$。第三图：色散关系 $E(k)$，带边切线水平；红点是 $N$ 个格点时 $k=p\pi/Nl$ 对应的能级（每个带 $N$ 个）。第四图：$\mathrm e^{i\alpha l}F$ 的轨迹始终在单位圆外，夹在两条红线之间的部分就是允许带。把 $V_0$ 调到 0，禁带消失；增大 $V_0$ 或 $b$（单个势垒更不透明），允许带变窄、趋于孤立阱的能级。`}</Cap>
    </Card>);
}
