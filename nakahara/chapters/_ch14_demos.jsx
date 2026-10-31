// 第 14 章交互图（数值核心在 _ch14_num.js，已在 node 中逐项核对）：
//  1. ModularInvLab  —— 单圈被积函数 f(τ)=τ₂^{-12}|η|^{-48} 的热图；拖动 τ，数值核对 τ→τ+1、τ→−1/τ、约化到基本区域后 f 不变；
//                       η 的变换律 (14.147)、测度 d²τ/τ₂² 的 Jacobi 因子、det′Δ/τ₂ 与环面谱 $\times$ 面积的不变性
//  2. RRLab          —— Riemann–Roch 计数：选亏格 g 与螺旋度 n，列出 dim ker ∇_z^{(n)}、dim ker ∇^z_{(n−1)} 与指标 (2n−1)(g−1)；CKV、二次微分、6g−6
//  3. KroneckerLab   —— Eisenstein 级数 E(τ,s)：直接格点求和 / Chowla–Selberg 展开 / Kronecker 第一极限公式 (14.136)
//  4. LevelMatchLab  —— ∫dτ₁ |η|^{-48} = Σ d_N² e^{-4πτ₂(N−1)}：能级匹配与闭弦质量谱（迅子、无质量态）
import { useMemo, useRef, useState } from "react";
import { TxI, RunCard, Check, Slider, Seg, Plot } from "@kit";
import * as N from "./_ch14_num.js";

const R = String.raw;
const INK = "#1f1b16", BLUE = "#2c4a6e", RED = "#9b2c1f", GOLD = "#b8862b", GREEN = "#2c6e49", GRAY = "#9a9083";
const Row = ({ children, gap = 16 }) => <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>{children}</div>;
const svgStyle = { maxWidth: "100%", background: "#fffdf8", border: "1px solid #e8e0d0", borderRadius: 6, touchAction: "none" };
function svgPoint(svg, e) { const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); }
const f6 = v => (!isFinite(v) ? "—" : Math.abs(v) < 5e-14 ? "0" : Math.abs(v) >= 1e6 || Math.abs(v) < 1e-3 ? v.toExponential(4) : (+v.toFixed(6)).toString());
const fc = c => (!c || !isFinite(c[0]) || !isFinite(c[1]) ? "—" : `${f6(c[0])} ${c[1] < 0 ? "−" : "+"} ${f6(Math.abs(c[1]))}i`);
const e1 = v => v.toExponential(1);
const Tbl = ({ rows, head = ["量", "数值", "说明"] }) => (
  <div className="tb-table-wrap"><table className="tb-table">
    <thead><tr>{head.map((h, i) => <th key={i}><TxI>{h}</TxI></th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{typeof c === "string" ? <TxI>{c}</TxI> : c}</td>)}</tr>)}</tbody>
  </table></div>);

// ============================================================
// 1. 单圈被积函数的模不变性
// ============================================================
const X0 = -1.5, X1 = 1.5, Y0 = 0.12, Y1 = 2.1, HW = 420, HH = 300;
const NX = 84, NY = 56;
const VMIN = 12.3, VMAX = 26;
function heatColor(v) {     // ln f：低值（基本区域内部）浅金，高值（尖点方向）深蓝
  const t = Math.max(0, Math.min(1, (v - VMIN) / (VMAX - VMIN))), s = Math.pow(t, 0.6);
  const c0 = [251, 244, 222], c1 = [214, 180, 110], c2 = [44, 74, 110];
  const [a, b, u] = s < 0.5 ? [c0, c1, s / 0.5] : [c1, c2, (s - 0.5) / 0.5];
  return `rgb(${a.map((x, i) => Math.round(x + (b[i] - x) * u)).join(",")})`;
}
export function ModularInvLab() {
  const [tau, setTau] = useState([0.31, 0.62]);
  const svg = useRef(null);
  const sx = HW / (X1 - X0), sy = HH / (Y1 - Y0);
  const P = (x, y) => [(x - X0) * sx, HH - (y - Y0) * sy];
  const grid = useMemo(() => {
    const cells = [], dx = (X1 - X0) / NX, dy = (Y1 - Y0) / NY;
    for (let i = 0; i < NX; i++) for (let j = 0; j < NY; j++) {
      const x = X0 + (i + 0.5) * dx, y = Y0 + (j + 0.5) * dy;
      cells.push({ i, j, c: heatColor(N.lnF1([x, y])) });
    }
    return { cells, dx, dy };
  }, []);
  const drag = e => {
    if (e.buttons !== 1 && e.type !== "pointerdown") return;
    const p = svgPoint(svg.current, e), x = p.x / sx + X0, y = (HH - p.y) / sy + Y0;
    setTau([Math.max(-1.45, Math.min(1.45, x)), Math.max(0.15, Math.min(2.05, y))]);
  };
  const res = useMemo(() => {
    const t = tau, tT = [t[0] + 1, t[1]], tS = N.cdiv([-1, 0], t), red = N.reduce(t);
    const lf = N.lnF1(t), lfT = N.lnF1(tT), lfS = N.lnF1(tS), lfR = N.lnF1(red.t);
    const et = N.eta(t), rT = N.cdiv(N.eta(tT), et), rS = N.cdiv(N.eta(tS), et);
    const exT = N.cexp([0, Math.PI / 12]), exS = N.csqrt(N.cmul([0, -1], t));
    const errT = N.cabs(N.csub(rT, exT)), errS = N.cabs(N.csub(rS, exS)) / N.cabs(exS);
    // 测度 d²τ/τ₂² 的 Jacobi 因子：|dτ′/dτ|²·τ₂²/τ₂′²（数值差分）
    const h = 1e-6, M = red.M, tp = N.mob(M, t), tph = N.mob(M, [t[0] + h, t[1]]);
    const dd = N.cabs(N.csub(tph, tp)) / h, jac = dd * dd * t[1] * t[1] / (tp[1] * tp[1]);
    const sp = N.torusSpectrum(t, 6).map(v => v * t[1]), spR = N.torusSpectrum(red.t, 6).map(v => v * red.t[1]);
    const spErr = Math.max(...sp.map((v, k) => Math.abs(v - spR[k]) / v));
    return { tT, tS, red, lf, lfT, lfS, lfR, rT, rS, exT, exS, errT, errS, jac, sp, spR, spErr, dA: N.lnDetOverArea(t), dR: N.lnDetOverArea(red.t) };
  }, [tau[0], tau[1]]);
  const fd = (() => { const q = []; for (let k = 0; k <= 30; k++) { const th = Math.PI / 3 + k / 30 * Math.PI / 3; q.push(P(Math.cos(th), Math.sin(th)).join(",")); } return `M${P(0.5, Y1)} L${q.join(" L")} L${P(-0.5, Y1)} Z`; })();
  const arcs = [-1, 0, 1].map(k => { const q = []; for (let s = 0; s <= 60; s++) { const th = s / 60 * Math.PI; q.push(P(k + Math.cos(th), Math.sin(th)).join(",")); } return "M" + q.join(" L"); });
  const dot = (t, col, lab, r = 6) => { if (t[1] < Y0 || t[1] > Y1 || t[0] < X0 || t[0] > X1) return null; const [u, v] = P(...t); return <g><circle cx={u} cy={v} r={r} fill={col} stroke="#fff" strokeWidth="1.5" /><text x={u + 9} y={v - 7} fontSize="12" fill={col} fontStyle="italic">{lab}</text></g>; };
  const okF = Math.abs(res.lf - res.lfT) < 1e-8 && Math.abs(res.lf - res.lfS) < 1e-8 && Math.abs(res.lf - res.lfR) < 1e-8;
  return (
    <RunCard title={R`交互图 1：单圈被积函数的模不变性`}
      lead={R`热图的颜色是 $\ln f(\tau)$，$f(\tau)=\tau_2^{-12}|\eta(\tau)|^{-48}$（\eqref{14.142} 的被积函数，不含测度），$\eta$ 由乘积 \eqref{14.137}（$n\ge1$）直接算出。金色阴影是基本区域 $F=\{|\tau_1|\le\frac12,|\tau|\ge1\}$，细线是它在 $T$、$S$ 下的像的边界——颜色图案在每一块里重复，这就是模不变性。**拖动蓝点** $\tau$：下表在 $\tau$、$\tau+1$、$-1/\tau$ 与约化代表 $\tau'$（红点）处分别计算 $\ln f$，并核对 \eqref{14.147}、测度的 Jacobi 因子与 $\det'\Delta/\tau_2$（\eqref{14.141}）。颜色越深 $f$ 越大：向尖点 $\tau_2\to\infty$ 指数增长（迅子发散）。`}>
      <Row>
        <svg ref={svg} viewBox={`0 0 ${HW} ${HH}`} width={HW} height={HH} style={{ ...svgStyle, cursor: "crosshair" }}
          onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); drag(e); }} onPointerMove={drag}>
          {grid.cells.map((c, k) => <rect key={k} x={c.i * grid.dx * sx - 0.3} y={HH - (c.j + 1) * grid.dy * sy - 0.3} width={grid.dx * sx + 0.6} height={grid.dy * sy + 0.6} fill={c.c} />)}
          <path d={fd} fill={GOLD} fillOpacity="0.25" stroke={INK} strokeWidth="1.6" />
          {arcs.map((d, k) => <path key={k} d={d} fill="none" stroke={INK} strokeWidth="0.7" opacity="0.7" />)}
          {[-1.5, -0.5, 0.5, 1.5].map(k => <line key={k} x1={P(k, Y0)[0]} y1={HH} x2={P(k, Y1)[0]} y2={0} stroke={INK} strokeWidth="0.7" opacity="0.7" />)}
          {[-1, 0, 1].map(k => <text key={k} x={P(k, Y0)[0]} y={HH - 4} fontSize="11" textAnchor="middle" fill={INK}>{k}</text>)}
          {dot(res.tS, GREEN, <>−1/τ</>, 5)}
          {dot(res.tT, GOLD, <>τ+1</>, 5)}
          {dot(res.red.t, RED, <>τ′</>, 6)}
          {dot(tau, BLUE, "τ", 7)}
        </svg>
        <div style={{ flex: "1 1 250px", minWidth: 240 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
            <button onClick={() => setTau(t => { const r = [t[0] + 1, t[1]]; return [Math.max(-1.45, Math.min(1.45, r[0])), r[1]]; })}><TxI>{R`$\nosym{T:\tau\mapsto\tau+1}$`}</TxI></button>
            <button onClick={() => setTau(t => [Math.max(-1.45, Math.min(1.45, t[0] - 1)), t[1]])}><TxI>{R`$\nosym{T^{-1}}$`}</TxI></button>
            <button onClick={() => setTau(t => { const r = N.cdiv([-1, 0], t); return [Math.max(-1.45, Math.min(1.45, r[0])), Math.max(0.15, Math.min(2.05, r[1]))]; })}><TxI>{R`$\nosym{S:\tau\mapsto-1/\tau}$`}</TxI></button>
            <button onClick={() => setTau(res.red.t)}><TxI>{R`跳到 $\nosym{\tau'}$`}</TxI></button>
          </div>
          <Tbl head={["点", R`$\nosym{\tau}$`, R`$\nosym{\ln f}$`]} rows={[
            [R`$\nosym{\tau}$`, fc(tau), f6(res.lf)],
            [R`$\nosym{\tau+1}$`, fc(res.tT), f6(res.lfT)],
            [R`$\nosym{-1/\tau}$`, fc(res.tS), f6(res.lfS)],
            [R`$\nosym{\tau'}$（基本区域）`, fc(res.red.t), f6(res.lfR)],
          ]} />
          <svg width="220" height="26" style={{ display: "block", marginTop: 4 }}>
            {Array.from({ length: 40 }, (_, k) => <rect key={k} x={10 + k * 5} y={4} width={5.2} height={10} fill={heatColor(VMIN + (VMAX - VMIN) * k / 39)} />)}
            <text x={10} y={24} fontSize="10" fill={GRAY}>{VMIN}</text><text x={210} y={24} fontSize="10" fill={GRAY} textAnchor="end">{VMAX}（ln f）</text>
          </svg>
        </div>
      </Row>
      <Tbl rows={[
        [R`$\nosym{\eta(\tau+1)/\eta(\tau)}$`, fc(res.rT), R`应为 $\mathrm{e}^{\pi\mathrm{i}/12}$ = ` + fc(res.exT) + "，误差 " + e1(res.errT)],
        [R`$\nosym{\eta(-1/\tau)/\eta(\tau)}$`, fc(res.rS), R`应为 $(-\mathrm{i}\tau)^{1/2}$ = ` + fc(res.exS) + "，相对误差 " + e1(res.errS)],
        [R`测度因子 $\nosym{|\dd\tau'/\dd\tau|^2\,\tau_2^2/\tau_2'^2}$`, f6(res.jac), R`$\dd^2\tau/\tau_2^2$ 不变 ⇔ 等于 1（数值差分）`],
        [R`$\nosym{\ln(\det'\Delta/\tau_2)}$ 在 $\nosym{\tau}$ 与 $\nosym{\tau'}$`, `${f6(res.dA)} / ${f6(res.dR)}`, R`\eqref{14.141}：$(2\pi)^2\tau_2|\eta|^4$`],
        [R`最低 6 个本征值 $\times$ 面积（$\nosym{\tau}$）`, res.sp.map(v => v.toFixed(4)).join(", "), R`$\lambda_{m,n}\tau_2=\frac{2\pi^2}{\tau_2}|m+\tau n|^2$`],
        [R`同上（$\nosym{\tau'}$）`, res.spR.map(v => v.toFixed(4)).join(", "), R`相似的环面：谱 $\times$ 面积相同`],
      ]} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={okF} label={R`$\ln f$ 在 $T$、$S$ 与约化下不变（差 $<10^{-8}$）`} />
        <Check ok={res.errT < 1e-10 && res.errS < 1e-10} label={R`\eqref{14.147} 成立`} />
        <Check ok={Math.abs(res.jac - 1) < 1e-4} label={R`$\dd^2\tau/\tau_2^2$ 不变`} />
        <Check ok={Math.abs(res.dA - res.dR) < 1e-8 && res.spErr < 1e-9} label={R`$\det'\Delta/\tau_2$ 与谱$\times$面积不变`} />
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`试一试：把 $\tau$ 拖到实轴附近（$\tau_2$ 很小），$f$ 的值仍然有限且等于约化点 $\tau'$ 处的值——"很扁"的环面与某个"正常"的环面是同一个共形类。若误用 $n>1$ 的乘积（原书笔误），\eqref{14.147} 与 $f$ 的不变性都会失败。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 2. Riemann–Roch 计数
// ============================================================
export function RRLab() {
  const [g, setG] = useState(2), [n, setN] = useState(-1);
  const ns = [-3, -2, -1, 0, 1, 2, 3];
  const rows = ns.map(m => ({ m, a: N.h0K(g, m), b: N.h0K(g, 1 - m), idx: N.rrIndex(g, m), rr: (2 * m - 1) * (g - 1) }));
  const allOk = rows.every(r => r.idx === r.rr);
  const kR = 2 * N.h0K(g, -1), teich = 2 * N.h0K(g, 2);
  const W = 440, H = 200, bw = 18, base = 150, scale = Math.min(9, 120 / Math.max(1, ...rows.map(r => Math.max(r.a, r.b))));
  return (
    <RunCard title={R`交互图 2：Riemann–Roch 计数——共形 Killing 向量、二次微分与 $6g-6$`}
      lead={R`$\ker\nabla^z_{(m)}$ 是 $\mathcal{T}^m$ 的全纯截面，$\ker\nabla_z^{(m)}$ 由复共轭与度规同构于全纯 $m$ 次微分；记 $h^0(K^m)$ 为亏格 $g$ 的曲面上全纯 $m$ 次微分（典范丛 $K$ 的 $m$ 次幂的截面）的复维数，则 $\dim\ker\nabla_z^{(n)}=h^0(K^n)$、$\dim\ker\nabla^z_{(n-1)}=h^0(K^{1-n})$。$h^0$ 由**独立**的经典事实给出：$g=0$ 时 $K^m=\mathcal{O}(-2m)$，$h^0=\max(0,1-2m)$；$g=1$ 时 $K$ 平凡，$h^0=1$；$g\ge2$ 时 $m<0$ 无截面、$h^0(K^0)=1$、$h^0(K)=g$、$m\ge2$ 时 $(2m-1)(g-1)$。程序把两者相减，与 \eqref{14.27} 的 $(2n-1)(g-1)$ 比较。蓝柱：$\dim\ker\nabla_z^{(n)}$；红柱：$\dim\ker\nabla^z_{(n-1)}$。`}>
      <Row>
        <div style={{ flex: "1 1 240px" }}>
          <Slider label={R`亏格 $g$`} value={g} min={0} max={8} step={1} onChange={setG} fmt={x => x.toFixed(0)} />
          <Slider label={R`螺旋度 $n$`} value={n} min={-3} max={3} step={1} onChange={setN} fmt={x => x.toFixed(0)} />
          <Tbl head={["量", "值", "说明"]} rows={[
            [R`$\dim_{\C}\ker\nabla_z^{(n)}$`, String(N.h0K(g, n)), R`$h^0(K^{n})$`],
            [R`$\dim_{\C}\ker\nabla^z_{(n-1)}$`, String(N.h0K(g, 1 - n)), R`$h^0(K^{1-n})$`],
            [R`指标（差）`, String(N.rrIndex(g, n)), R`$(2n-1)(g-1)=$ ` + (2 * n - 1) * (g - 1)],
            [R`CKV 实维数 $k$`, String(kR), R`$2h^0(K^{-1})$，\eqref{14.58}`],
            [R`$\dim_{\R}\mathrm{Teich}$`, String(teich), R`$2h^0(K^2)$，\eqref{14.38}`],
            [R`$\dim_{\R}\mathrm{Teich}-k$`, String(teich - kR), R`$6g-6=$ ` + (6 * g - 6)],
          ]} />
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={svgStyle}>
          <line x1={20} y1={base} x2={W - 10} y2={base} stroke={INK} />
          {rows.map((r, k) => { const x = 40 + k * 56, sel = r.m === n; return <g key={k}>
            {sel && <rect x={x - 8} y={10} width={2 * bw + 16} height={base + 34} fill={GOLD} opacity="0.13" />}
            <rect x={x} y={base - r.a * scale} width={bw} height={r.a * scale} fill={BLUE} />
            <rect x={x + bw} y={base - r.b * scale} width={bw} height={r.b * scale} fill={RED} />
            <text x={x + bw / 2} y={base - r.a * scale - 3} fontSize="10" textAnchor="middle" fill={BLUE}>{r.a}</text>
            <text x={x + 1.5 * bw} y={base - r.b * scale - 3} fontSize="10" textAnchor="middle" fill={RED}>{r.b}</text>
            <text x={x + bw} y={base + 15} fontSize="11" textAnchor="middle" fill={INK}>n={r.m}</text>
            <text x={x + bw} y={base + 30} fontSize="10" textAnchor="middle" fill={r.idx === r.rr ? GREEN : RED}>{r.idx >= 0 ? "+" : ""}{r.idx}</text>
          </g>; })}
          <text x={24} y={H - 4} fontSize="10" fill={GRAY}>底行：指标；n=−1 是 CKV（蓝）与二次微分（红）</text>
        </svg>
      </Row>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={allOk} label={R`对 $n=-3,\ldots,3$ 都有 $h^0(K^n)-h^0(K^{1-n})=(2n-1)(g-1)$`} />
        <Check ok={teich - kR === 6 * g - 6} label={R`$\dim_{\R}\mathrm{Teich}-k=6g-6=-3\chi$`} />
        <Check ok={(g === 0 && kR === 6 && teich === 0) || (g === 1 && kR === 2 && teich === 2) || (g >= 2 && kR === 0 && teich === 6 * g - 6)} label={R`与 \eqref{14.38}、\eqref{14.58} 一致`} />
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`观察：指标只确定差；单独的维数要用"负次数线丛没有全纯截面"把两项分开——$g\ge2$ 时 $K^{-1}$ 次数为负，没有 CKV，所以 $\dim_{\C}\mathrm{Teich}=3g-3$；$g=0$ 时 $K^2$ 次数为负，没有模，CKV 有 3 个复维数（Möbius 变换）。$n=1$ 一列给出 $h^0(K)=g$：Abel 微分的个数。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 3. Kronecker 第一极限公式
// ============================================================
export function KroneckerLab() {
  const [t1, setT1] = useState(0.2), [t2, setT2] = useState(0.9);
  const tau = [t1, t2];
  const series = useMemo(() => p => {
    const t = [p.t1, p.t2], C = N.kroneckerConst(t);
    const pts = [1.3, 1.6, 2, 2.5, 3].map(s => [s, N.eisDirect(t, s, 40)]);
    return [
      { label: R`\text{Chowla–Selberg}`, f: s => N.eisFourier(t, s), color: BLUE },
      { label: R`\nosym{\pi/(s-1)+C_{\rm K}}`, f: s => Math.PI / (s - 1) + C, color: RED, dash: "dash" },
      { label: R`\text{格点直接求和}`, data: pts, points: true, color: GOLD },
    ];
  }, []);
  const res = useMemo(() => {
    const C = N.kroneckerConst(tau);
    const eps = [1e-2, 1e-3, 1e-4].map(e => ({ e, v: N.eisFourier(tau, 1 + e) - Math.PI / e }));
    const s2d = N.eisDirect(tau, 2, 60), s2f = N.eisFourier(tau, 2);
    const rate = Math.abs(eps[2].v - C) / Math.abs(eps[1].v - C);
    return { C, eps, s2d, s2f, rate };
  }, [t1, t2]);
  return (
    <RunCard title={R`交互图 3：Kronecker 第一极限公式（14.136）的数值检验`}
      lead={R`$E(\tau,s)=\sum'\tau_2^s/|m+\tau n|^{2s}$ 用三种方法独立计算：**(a)** 格点直接求和（$|m+\tau n|\le40$，外部用积分补尾；只在 $s$ 不太接近 1 时可靠，金点）；**(b)** Chowla–Selberg 展开——对 $m$ 作 Poisson 求和，$E=2\zeta(2s)\tau_2^s+2\sqrt\pi\frac{\Gamma(s-\frac12)}{\Gamma(s)}\zeta(2s-1)\tau_2^{1-s}+\frac{8\pi^s\sqrt{\tau_2}}{\Gamma(s)}\sum_{N\ge1}N^{s-\frac12}\nosym{\sigma_{1-2s}}(N)\cos(2\pi N\tau_1)\nosym{K_{s-\frac12}}(2\pi N\tau_2)$，对一切 $s>1$ 快速收敛（蓝线）；**(c)** 极限公式的 Laurent 近似 $\pi/(s-1)+C_{\rm K}$，$C_{\rm K}=2\pi[\gamma-\ln2-\ln(\sqrt{\tau_2}|\eta|^2)]$（红虚线）。(c) 只用 $\eta$ 函数，与 (a)(b) 毫无共同的计算步骤。`}>
      <Plot x={{ label: R`s`, domain: [1.05, 3] }} y={{ label: R`E(\tau,s)` }}
        params={[{ id: "t1", label: R`\tau_1`, min: -0.5, max: 0.5, step: 0.01, value: 0.2 }, { id: "t2", label: R`\tau_2`, min: 0.6, max: 2, step: 0.01, value: 0.9 }]}
        series={series} samples={160} height={330} />
      <p className="muted" style={{ fontSize: 13 }}>下表与上图的滑块独立：</p>
      <Row>
        <div style={{ flex: "1 1 220px" }}>
          <Slider label={R`$\tau_1$`} value={t1} min={-0.5} max={0.5} step={0.01} onChange={setT1} fmt={x => x.toFixed(2)} />
          <Slider label={R`$\tau_2$`} value={t2} min={0.6} max={2} step={0.01} onChange={setT2} fmt={x => x.toFixed(2)} />
        </div>
        <div style={{ flex: "2 1 360px" }}>
          <Tbl rows={[
            [R`$C_{\rm K}$（由 $\eta$）`, f6(res.C), R`\eqref{14.136} 的常数项`],
            ...res.eps.map(r => [R`$E(\tau,1+\varepsilon)-\pi/\varepsilon$，$\varepsilon=$ ` + r.e, f6(r.v), "Chowla–Selberg；差 " + e1(Math.abs(r.v - res.C))]),
            [R`$E(\tau,2)$：直接求和 / 展开`, `${f6(res.s2d)} / ${f6(res.s2f)}`, "相对差 " + e1(Math.abs(res.s2d - res.s2f) / res.s2f)],
          ]} />
        </div>
      </Row>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={Math.abs(res.s2d - res.s2f) / res.s2f < 1e-4} label={R`(a) 与 (b) 在 $s=2$ 一致`} />
        <Check ok={Math.abs(res.eps[2].v - res.C) < 2e-3 && res.rate < 0.2} label={R`$\varepsilon\to0$ 时 (b) $-\pi/\varepsilon\to C_{\rm K}$，误差 $\propto\varepsilon$`} />
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`差值随 $\varepsilon$ 线性减小，正是 \eqref{14.136} 中的 $\mathcal{O}(s-1)$ 项。由函数方程 \eqref{14.139}，同一个常数 $C_{\rm K}$ 决定 $E'(\tau,0)$（\eqref{14.140b}），从而决定 $\det'\Delta=$ 行列式 \eqref{14.141}。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 4. 能级匹配与质量谱
// ============================================================
export function LevelMatchLab() {
  const [y, setY] = useState(1.1);
  const res = useMemo(() => N.levelMatch(y), [y]);
  const d = useMemo(() => N.partitions24(8), []);
  const rel = Math.abs(res.I - res.S) / res.S;
  const names = ["迅子（tachyon）", "无质量：引力子 + B 场 + 伸缩子", "第一激发能级", "", "", "", "", "", ""];
  return (
    <RunCard title={R`交互图 4：$\int\dd\tau_1|\eta|^{-48}$ 与闭弦的质量谱`}
      lead={R`在 $\tau_2>1$ 的条带上对 $\tau_1\in[-\frac12,\frac12]$ 数值积分 $|\eta(\tau)|^{-48}$（400 点中点法，$\eta$ 用乘积），与 $q$ 展开的能级匹配和 $\sum_Nd_N^2\mathrm{e}^{-4\pi\tau_2(N-1)}$ 比较；$d_N$ 是 $\prod(1-q^n)^{-24}$ 的系数，由多项式乘法独立算出。`}>
      <Slider label={R`$\tau_2$`} value={y} min={0.8} max={3} step={0.01} onChange={setY} fmt={x => x.toFixed(2)} />
      <Tbl rows={[
        [R`$\int_{-1/2}^{1/2}\dd\tau_1\,|\eta|^{-48}$`, f6(res.I), "数值积分"],
        [R`$\sum_Nd_N^2\mathrm{e}^{-4\pi\tau_2(N-1)}$`, f6(res.S), R`只含 $N=\tilde N$ 的项（$N\le30$）`],
      ]} />
      <Tbl head={[R`$N=\tilde N$`, R`$d_N$`, R`态数 $d_N^2$`, R`$\nosym{\frac{\alpha'}{4}m^2}=N-1$`, R`在 $\tau_2$ 处的贡献`, "解读"]} rows={
        d.slice(0, 5).map((v, k) => [String(k), String(v), String(v * v), String(k - 1), f6(v * v * Math.exp(-4 * Math.PI * y * (k - 1))), names[k]])} />
      <Check ok={rel < 1e-9} label={R`数值积分 = 能级匹配和（相对差 ` + e1(rel) + "）"} />
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`$d_1=24$：一个横向振子激发（$24$ 个方向），左右各一个，$24^2=576=299+276+1$ 恰是 24 维横向空间中的对称无迹张量（引力子）、反对称张量（$B$ 场）与迹（伸缩子）。迅子一行的贡献 $\mathrm{e}^{4\pi\tau_2}$ 随 $\tau_2$ 指数增长，$\int^\infty\dd\tau_2\,\tau_2^{-14}\mathrm{e}^{4\pi\tau_2}$ 发散。`}</TxI></p>
    </RunCard>);
}
