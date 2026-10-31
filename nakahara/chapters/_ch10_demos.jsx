// 第 10 章交互图（数值核心在 _ch10_num.js，已在 node 中逐项核对）：
//  1. SphereHolonomyLab —— S² 上平行移动一圈的转角：RK4 积分 / 局部联络 ∮(1−cosθ)dφ / 立体角（Gauss–Bonnet）三者对照
//  2. MonopoleLab       —— Dirac 单极子两块坐标卡上的 A_N、A_S，Wilson 圈相位，转移函数 e^{i2gφ} 的卷绕与量子化 2g∈Z
//  3. SU2CurvatureLab   —— F = dA + A∧A：矩阵公式 / 分量公式 / 小方圈和乐；规范协变 F→g⁻¹Fg；Bianchi 恒等式
//  4. InstantonLab      —— 映射度 n = (1/24π²)∫_{S³} tr(g⁻¹dg)³ 的数值积分（g1^n、两半球拼接、可缩扭曲）
//  5. BerryLab          —— 自旋 1/2 的 Berry 相位：离散重叠积（任意规范）/ 含时 Schrödinger 方程 / −Ω/2
import { useMemo, useState } from "react";
import { TxI, RunCard, Check, Slider, Seg } from "@kit";
import * as N from "./_ch10_num.js";

const R = String.raw;
const INK = "#1f1b16", BLUE = "#2c4a6e", RED = "#9b2c1f", GOLD = "#b8862b", GREEN = "#2c6e49", MUTED = "#8a8070", VIOLET = "#5b3f8c";
const TAU = 2 * Math.PI;
const Row = ({ children, gap = 16 }) => <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>{children}</div>;
const fmt = (v, d = 5) => (Math.abs(v) < 0.5 * 10 ** -d ? "0" : (+v.toFixed(d)).toString());
const sci = v => (Math.abs(v) < 1e-300 ? "0" : v.toExponential(1).replace(/e([+-])(\d+)/, (_, s, e) => R`\times10^{${s === "-" ? "-" : ""}${e}}`));
const Tex = ({ t }) => <TxI>{t}</TxI>;
const Panel = ({ children, min = 270 }) => <div style={{ flex: `1 1 ${min}px`, minWidth: min - 20 }}>{children}</div>;
const svgBox = { maxWidth: "100%", background: "#fffdf8", border: "1px solid #e4ddcc", borderRadius: 6 };

// ============================================================
// 正交投影的球面视图
// ============================================================
function proj(p, az, el) {
  const qx = Math.cos(az) * p[0] + Math.sin(az) * p[1], qy = -Math.sin(az) * p[0] + Math.cos(az) * p[1], qz = p[2];
  return { x: qx, y: Math.sin(el) * qy + Math.cos(el) * qz, z: -Math.cos(el) * qy + Math.sin(el) * qz };
}
function polyline(pts, az, el, S, cx, cy) {   // 按可见性切成前/后两组折线
  const front = [], back = []; let cur = null, curF = null;
  pts.forEach(p => {
    const q = proj(p, az, el), f = q.z >= 0, pt = `${(cx + S * q.x).toFixed(1)},${(cy - S * q.y).toFixed(1)}`;
    if (f !== curF) { cur = [pt]; (f ? front : back).push(cur); curF = f; } else cur.push(pt);
  });
  return { front, back };
}
function SphereView({ loops = [], arrows = [], marks = [], az, el, W = 340, bands }) {
  const S = W * 0.42, cx = W / 2, cy = W / 2;
  const grid = [];
  for (let k = 1; k < 6; k++) { const th = k * Math.PI / 6; grid.push(Array.from({ length: 73 }, (_, j) => N.sph(th, j * TAU / 72))); }
  for (let k = 0; k < 6; k++) { const ph = k * Math.PI / 6; grid.push(Array.from({ length: 73 }, (_, j) => N.sph(j * TAU / 72, ph))); }
  const P = p => { const q = proj(p, az, el); return [cx + S * q.x, cy - S * q.y, q.z]; };
  return (
    <svg viewBox={`0 0 ${W} ${W}`} style={{ width: W, ...svgBox }}>
      <circle cx={cx} cy={cy} r={S} fill="#f6f1e4" stroke="#c9bfa8" />
      {bands}
      {grid.map((g, i) => { const { front } = polyline(g, az, el, S, cx, cy); return front.map((f, j) => <polyline key={i + "-" + j} points={f.join(" ")} fill="none" stroke="#e0d6c0" strokeWidth="0.8" />); })}
      {loops.map((L, i) => { const { front, back } = polyline(L.pts, az, el, S, cx, cy); return <g key={i}>
        {back.map((b, j) => <polyline key={"b" + j} points={b.join(" ")} fill="none" stroke={L.color} strokeWidth="1.4" strokeDasharray="3 3" opacity="0.45" />)}
        {front.map((f, j) => <polyline key={"f" + j} points={f.join(" ")} fill="none" stroke={L.color} strokeWidth="2.4" />)}
      </g>; })}
      {arrows.map((a, i) => { const [x0, y0, z0] = P(a.x), [x1, y1] = P(a.x.map((c, k) => c + a.len * a.v[k])); if (z0 < -0.02) return null;
        const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, s = a.head ?? 5;
        return <g key={i} stroke={a.color} fill={a.color}><line x1={x0} y1={y0} x2={x1} y2={y1} strokeWidth={a.w ?? 1.6} />
          <path d={`M${x1 + ux * s},${y1 + uy * s} L${x1 - uy * s * 0.6},${y1 + ux * s * 0.6} L${x1 + uy * s * 0.6},${y1 - ux * s * 0.6} Z`} stroke="none" /></g>; })}
      {marks.map((m, i) => { const [x, y, z] = P(m.x); return z < -0.02 ? null : <g key={i}><circle cx={x} cy={y} r={m.r ?? 4} fill={m.color} stroke="#fff" strokeWidth="1.2" />{m.label && <text x={x + 7} y={y - 6} fontSize="12" fill={m.color}>{m.label}</text>}</g>; })}
    </svg>);
}
const LOOP_OPTS = [["lat", "纬圈"], ["tilt", "倾斜小圆"], ["tri", "测地三角形"]];

// ============================================================
// 1. 球面上的和乐
// ============================================================
export function SphereHolonomyLab() {
  const [kind, setKind] = useState("lat");
  const [th0, setTh0] = useState(1.0), [al, setAl] = useState(1.0), [rho, setRho] = useState(0.6), [dphi, setDphi] = useState(1.2);
  const [az, setAz] = useState(0.6), [el, setEl] = useState(0.45);
  const res = useMemo(() => {
    const loop = N.makeLoop(kind, { th0, al, rho, dphi }), pts = N.loopPoints(loop, 600);
    const x0 = loop.segs[0].x(0), v0 = N.tangentAt(x0), tr = N.transport(loop, v0, 600, 18);
    const rk = N.angleAbout(v0, tr.v, x0), line = N.lineIntegralNorth(pts), om = N.solidAngle(pts);
    return { pts, x0, v0, tr, rk, line, om, exact: loop.exact };
  }, [kind, th0, al, rho, dphi]);
  const ok = Math.abs(N.wrap(res.rk - res.om)) < 2e-3 && Math.abs(N.wrap(res.line - res.om)) < 2e-3;
  return (
    <RunCard title={R`交互图 1：球面上平行移动一圈——和乐 = 围住的立体角`}
      lead={R`$S^2$ 的切丛是标架丛 $\nosym{L}S^2$（结构群 $\mathrm{SO}(2)\cong\mathrm{U}(1)$）的相伴丛；Levi-Civita 联络就是这个主丛上的联络。沿闭路 $\gamma$ 把切向量平行移动一圈，回到起点时转过的角度就是和乐 $\tau_\gamma\in\mathrm{SO}(2)$。三列数字**独立**计算：① 直接对三维中的平行移动方程 $\dot{\boldsymbol v}=-(\boldsymbol v\cdot\dot{\boldsymbol x})\boldsymbol x$ 做 RK4 积分；② 在北极正则的标架下，局部联络形式给出转角 $\oint(1-\cos\theta)\,\dd\phi$（即 \eqref{10.26} 的阿贝尔情形）；③ 闭路围住的立体角（球面三角扇的精确面积公式）——Gauss 曲率 $K=1$，所以它就是 $\int K\,\dd A$。`}>
      <Row>
        <SphereView az={az} el={el}
          loops={[{ pts: res.pts, color: BLUE }]}
          arrows={[...res.tr.trail.map(t => ({ x: t.x, v: t.v, len: 0.2, color: MUTED, w: 1.2, head: 3.5 })),
            { x: res.x0, v: res.v0, len: 0.32, color: GOLD, w: 2.4 }, { x: res.x0, v: res.tr.v, len: 0.32, color: RED, w: 2.4 }]}
          marks={[{ x: [0, 0, 1], color: INK, r: 3, label: "N" }, { x: res.x0, color: GOLD, r: 4 }]} />
        <Panel>
          <Seg options={LOOP_OPTS} value={kind} onChange={setKind} />
          {kind === "lat" && <Slider label={R`纬圈的极角 $\nosym{\theta_0}$`} value={th0} min={0.1} max={3.0} step={0.01} onChange={setTh0} fmt={x => x.toFixed(2)} />}
          {kind === "tilt" && <><Slider label={R`圆心的极角 $\nosym{\alpha}$`} value={al} min={0} max={3.1} step={0.01} onChange={setAl} fmt={x => x.toFixed(2)} />
            <Slider label={R`角半径 $\nosym{\rho}$`} value={rho} min={0.05} max={1.5} step={0.01} onChange={setRho} fmt={x => x.toFixed(2)} /></>}
          {kind === "tri" && <Slider label={R`橘瓣张角 $\nosym{\Delta\phi}$`} value={dphi} min={0.05} max={3.1} step={0.01} onChange={setDphi} fmt={x => x.toFixed(2)} />}
          <Slider label="视角（方位）" value={az} min={-3.1} max={3.1} step={0.01} onChange={setAz} fmt={x => x.toFixed(2)} />
          <Slider label="视角（仰角）" value={el} min={-1.4} max={1.4} step={0.01} onChange={setEl} fmt={x => x.toFixed(2)} />
          <table className="tb-table" style={{ marginTop: 8 }}><tbody>
            <tr><td><Tex t={R`① RK4 转角（模 $2\pi$）`} /></td><td><b>{fmt(N.wrap(res.rk), 5)}</b></td></tr>
            <tr><td><Tex t={R`② $\nosym{\oint(1-\cos\theta)\,\dd\phi}$（模 $2\pi$）`} /></td><td><b>{fmt(N.wrap(res.line), 5)}</b></td></tr>
            <tr><td><Tex t={R`③ 立体角 $\nosym{\Omega}$（模 $2\pi$）`} /></td><td><b>{fmt(N.wrap(res.om), 5)}</b></td></tr>
            <tr><td>解析值</td><td>{kind === "tri" ? <Tex t={R`$\nosym{\Delta\phi}=${fmt(res.exact, 5)}$`} /> : kind === "lat" ? <Tex t={R`$2\pi(1-\cos\nosym{\theta_0})=${fmt(N.wrap(res.exact), 5)}$`} /> : <Tex t={R`$2\pi(1-\cos\nosym{\rho})=${fmt(N.wrap(res.exact), 5)}$`} />}</td></tr>
          </tbody></table>
          <Check ok={ok} label={R`三种算法一致（误差 $<2\times10^{-3}$，来自用折线逼近闭路）`} />
          <p className="muted" style={{ marginTop: 8 }}><TxI>{R`金色箭头：出发时的向量；红色：走一圈回来的向量；灰色：沿途的平行移动。纬圈越靠近赤道，转角越接近 $2\pi$（模 $2\pi$ 为 $0$）——赤道是测地线，沿测地线平行移动的切向量与切线夹角不变，但赤道围住半个球面，转角 $2\pi$。测地三角形的转角恰好等于内角和超出 $\pi$ 的部分（Gauss–Bonnet）。`}</TxI></p>
        </Panel>
      </Row>
    </RunCard>);
}

// ============================================================
// 2. Dirac 单极子
// ============================================================
export function MonopoleLab() {
  const [g, setG] = useState(0.5), [kind, setKind] = useState("lat");
  const [th0, setTh0] = useState(1.0), [al, setAl] = useState(0.6), [rho, setRho] = useState(0.5);
  const res = useMemo(() => {
    const loop = N.makeLoop(kind, { th0, al, rho }), pts = N.loopPoints(loop, 1200);
    const w = N.wilson(pts, g), om = N.solidAngle(pts);
    // 闭路绕 z 轴的圈数
    let wind = 0; for (let k = 0; k < pts.length; k++) { const a = pts[k], b = pts[(k + 1) % pts.length]; wind += N.wrap(Math.atan2(b[1], b[0]) - Math.atan2(a[1], a[0])); }
    return { pts, ...w, om, wind: Math.round(wind / TAU) };
  }, [g, kind, th0, al, rho]);
  const twoG = 2 * g, quant = Math.abs(twoG - Math.round(twoG)) < 1e-9;
  const dPhase = N.wrap(res.aN - res.aS);
  const agree = Math.abs(dPhase) < 1e-3;
  // 转移函数 t_NS(φ) = e^{i 2g φ} 在复平面单位圆上的像
  const Wc = 200, c0 = Wc / 2, rr = 70;
  const tpath = Array.from({ length: 241 }, (_, k) => { const ph = k * TAU / 240, a = twoG * ph; return [c0 + rr * (1 + 0.06 * ph) * Math.cos(a), c0 - rr * (1 + 0.06 * ph) * Math.sin(a)]; });
  const end0 = tpath[0], end1 = [c0 + rr * Math.cos(twoG * TAU), c0 - rr * Math.sin(twoG * TAU)];
  return (
    <RunCard title={R`交互图 2：Dirac 单极子——两块坐标卡、转移函数与 Wilson 圈`}
      lead={R`北、南两块坐标卡上取 Wu–Yang 势 \eqref{10.89}（这里写实势 $\nosym{A}_{\rm N}=g(1-\cos\theta)\dd\phi$、$\nosym{A}_{\rm S}=-g(1+\cos\theta)\dd\phi$，原书的 $\mathcal{A}=\mathrm{i}\nosym{A}$）。沿同一条闭路分别用两块卡上的势做线积分，得到 Wilson 圈相位 $e^{\mathrm{i}\oint \nosym{A}}$。两者之差 $\oint(\nosym{A}_{\rm N}-\nosym{A}_{\rm S})=2g\oint\dd\phi=4\pi g\times$（闭路绕 $z$ 轴的圈数）。只有当 $2g\in\mathbb{Z}$ 时两种算法给出同一个相位——这正是转移函数 $t_{\rm NS}=e^{\mathrm{i}2g\phi}$ 在赤道上单值的条件 \eqref{10.93}。`}>
      <Row>
        <SphereView az={0.5} el={0.35} loops={[{ pts: res.pts, color: BLUE }, { pts: Array.from({ length: 145 }, (_, k) => N.sph(Math.PI / 2, k * TAU / 144)), color: "#c9a96e" }]}
          marks={[{ x: [0, 0, 1], color: GREEN, r: 3, label: R`N` }, { x: [0, 0, -1], color: RED, r: 3, label: "S" }]} W={300} />
        <svg viewBox={`0 0 ${Wc} ${Wc}`} style={{ width: 200, ...svgBox }}>
          <circle cx={c0} cy={c0} r={rr} fill="none" stroke="#e0d6c0" />
          <line x1={c0 - rr - 15} y1={c0} x2={c0 + rr + 25} y2={c0} stroke="#e0d6c0" /><line x1={c0} y1={c0 - rr - 15} x2={c0} y2={c0 + rr + 15} stroke="#e0d6c0" />
          <polyline points={tpath.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ")} fill="none" stroke={quant ? GREEN : RED} strokeWidth="2" />
          <circle cx={end0[0]} cy={end0[1]} r="4" fill={GOLD} />
          <circle cx={end1[0]} cy={end1[1]} r="4" fill={quant ? GOLD : RED} />
          <text x={6} y={14} fontSize="11" fill={MUTED}>t_NS(φ) 在 U(1) 上的像</text>
          <text x={6} y={Wc - 8} fontSize="11" fill={quant ? GREEN : RED}>{quant ? `卷绕数 2g = ${Math.round(twoG)}` : "转一圈回不到起点：不单值"}</text>
        </svg>
        <Panel min={260}>
          <Slider label={R`单极强度 $\sym{gm}{g}$`} value={g} min={-2} max={2} step={0.05} onChange={setG} fmt={x => x.toFixed(2)} />
          <Seg options={LOOP_OPTS.slice(0, 2)} value={kind} onChange={setKind} />
          {kind === "lat" ? <Slider label={R`纬圈极角 $\nosym{\theta_0}$`} value={th0} min={0.05} max={3.09} step={0.01} onChange={setTh0} fmt={x => x.toFixed(2)} />
            : <><Slider label={R`圆心极角 $\nosym{\alpha}$`} value={al} min={0} max={3.1} step={0.01} onChange={setAl} fmt={x => x.toFixed(2)} />
              <Slider label={R`角半径 $\nosym{\rho}$`} value={rho} min={0.05} max={1.5} step={0.01} onChange={setRho} fmt={x => x.toFixed(2)} /></>}
          <table className="tb-table" style={{ marginTop: 8 }}><tbody>
            <tr><td><Tex t={R`$\oint \nosym{A}_{\rm N}$（数值线积分）`} /></td><td><b>{fmt(res.aN, 5)}</b>{res.nearS && <span style={{ color: RED }}><Tex t={R`（过南极，$\nosym{A}_{\rm N}$ 奇异）`} /></span>}</td></tr>
            <tr><td><Tex t={R`$\oint \nosym{A}_{\rm S}$（数值线积分）`} /></td><td><b>{fmt(res.aS, 5)}</b>{res.nearN && <span style={{ color: RED }}><Tex t={R`（过北极，$\nosym{A}_{\rm S}$ 奇异）`} /></span>}</td></tr>
            <tr><td><Tex t={R`通量 $g\nosym{\Omega}$（$\nosym{\Omega}$：闭路左侧的立体角）`} /></td><td>{fmt(g * res.om, 5)}</td></tr>
            <tr><td><Tex t={R`闭路绕 $z$ 轴的圈数`} /></td><td>{res.wind}</td></tr>
            <tr><td><Tex t={R`$\oint(\nosym{A}_{\rm N}-\nosym{A}_{\rm S})$ 与 $4\pi g\times$圈数`} /></td><td>{fmt(res.aN - res.aS, 5)} / {fmt(4 * Math.PI * g * res.wind, 5)}</td></tr>
            <tr><td><Tex t={R`两个 Wilson 相位之差（模 $2\pi$）`} /></td><td><b>{fmt(dPhase, 5)}</b></td></tr>
          </tbody></table>
          <Check ok={agree} label={agree ? R`$e^{\mathrm{i}\oint \nosym{A}_{\rm N}}=e^{\mathrm{i}\oint \nosym{A}_{\rm S}}$：Wilson 圈与坐标卡无关` : R`两块卡给出不同的相位：$2g\notin\mathbb{Z}$，这样的"丛"不存在`} />
          <p className="muted" style={{ marginTop: 8 }}><TxI>{R`把 $g$ 拖到半整数以外（如 $0.3$），转移函数的像在复平面上走不满整圈，赤道上 $\phi=0$ 与 $\phi=2\pi$ 给出不同的 $t_{\rm NS}$；同时两块卡上的 Wilson 相位不再一致——两件事是同一个障碍。不绕 $z$ 轴的小圆（倾斜小圆远离两极）则两相位总一致：它可以整个放进 $U_{\rm N}\cap U_{\rm S}$ 的同一侧去算。`}</TxI></p>
        </Panel>
      </Row>
    </RunCard>);
}

// ============================================================
// 3. SU(2) 规范场的曲率
// ============================================================
const CompRow = ({ label, v, hi }) => <tr><td><Tex t={label} /></td>{v.map((c, i) => <td key={i} style={{ fontFamily: "var(--mono, monospace)", color: hi ? BLUE : INK }}>{fmt(c, 5)}</td>)}</tr>;
export function SU2CurvatureLab() {
  const [lam, setLam] = useState(0.9), [px, setPx] = useState(0.3), [py, setPy] = useState(-0.4), [pz, setPz] = useState(0.5);
  const [le, setLe] = useState(-2), [beta, setBeta] = useState(0.8);
  const eps = 10 ** le, x = [px, py, pz];
  const r = useMemo(() => {
    const { M } = N;
    const F = N.Fmat(lam, x, 0, 1), fc = N.Fcomp(lam, x, 0, 1);
    const A1 = N.Amat(lam, x, 0), A2 = N.Amat(lam, x, 1), cm = M.comm(A1, A2);
    const U = N.plaquette(lam, x, 0, 1, eps, 80), est = M.scale(M.add(U, M.id(), -1), -1 / (eps * eps));
    const gf = N.gaugeFun(beta), gx = gf(x), Fp = N.Fmat(lam, x, 0, 1, gf), cov = M.mul(M.dag(gx), M.mul(F, gx));
    const b = N.bianchi(lam, x);
    return { F: N.toComp(F), fc, comm: N.toComp(cm), est: N.toComp(est), dPl: M.norm(M.add(est, F, -1)), Fp: N.toComp(Fp), cov: N.toComp(cov),
      dCov: M.norm(M.add(Fp, cov, -1)), dNaive: M.norm(M.add(Fp, F, -1)), dComp: M.norm(M.add(F, N.fromComp(fc), -1)), nF: M.norm(F), bia: b };
  }, [lam, px, py, pz, eps, beta]);
  return (
    <RunCard title={R`交互图 3：SU(2) 规范场的场强 $\mathcal{F}=\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}$`}
      lead={R`取 $\mathbb{R}^3$ 上一个具体的 $\sym{lie}{\mathfrak{su}}(2)$ 值规范势 $\mathcal{A}_\mu=\nosym{A}_\mu{}^\alpha T_\alpha$（$T_\alpha=\sigma_\alpha/2\mathrm{i}$，分量是 $x$ 的若干光滑函数，强度由 $\lambda$ 控制），在点 $x$ 处计算 $\mathcal{F}_{12}$ 的三个分量 $\nosym{F}_{12}{}^\alpha$：(a) 矩阵公式 \eqref{10.39}；(b) 只用结构常数的分量公式 \eqref{10.106c}；(c) 几何意义 \eqref{10.35}：沿边长 $\epsilon$ 的小方圈做路径排序的平行移动（解 \eqref{10.13b}），和乐 $\nosym{U}\approx1-\epsilon^2\mathcal{F}_{12}$。再做一个规范变换 $\mathcal{A}\to g^{-1}\mathcal{A}g+g^{-1}\dd g$，检验 $\mathcal{F}\to g^{-1}\mathcal{F}g$ \eqref{10.42}，并检验 Bianchi 恒等式 \eqref{10.46}。所有导数都用数值差分，不用手算。`}>
      <Row>
        <Panel min={250}>
          <Slider label={R`非阿贝尔强度 $\lambda$`} value={lam} min={0} max={1.6} step={0.01} onChange={setLam} fmt={v => v.toFixed(2)} />
          <Slider label={R`$x^1$`} value={px} min={-1} max={1} step={0.01} onChange={setPx} fmt={v => v.toFixed(2)} />
          <Slider label={R`$x^2$`} value={py} min={-1} max={1} step={0.01} onChange={setPy} fmt={v => v.toFixed(2)} />
          <Slider label={R`$x^3$`} value={pz} min={-1} max={1} step={0.01} onChange={setPz} fmt={v => v.toFixed(2)} />
          <Slider label={R`方圈边长 $\epsilon$（对数刻度）`} value={le} min={-3} max={-0.5} step={0.05} onChange={setLe} fmt={v => (10 ** v).toPrecision(2)} />
          <Slider label={R`规范变换强度 $\beta$`} value={beta} min={0} max={2} step={0.01} onChange={setBeta} fmt={v => v.toFixed(2)} />
        </Panel>
        <Panel min={330}>
          <table className="tb-table"><tbody>
            <tr><td></td><td><Tex t={R`$\alpha=1$`} /></td><td><Tex t={R`$\alpha=2$`} /></td><td><Tex t={R`$\alpha=3$`} /></td></tr>
            <CompRow label={R`(a) 矩阵公式 \eqref{10.39}`} v={r.F} hi />
            <CompRow label={R`(b) 分量公式 \eqref{10.106c}`} v={r.fc} />
            <CompRow label={R`(c) 方圈 $-(\nosym{U}-1)/\epsilon^2$`} v={r.est} />
            <CompRow label={R`其中 $[\mathcal{A}_1,\mathcal{A}_2]$ 的贡献`} v={r.comm} />
            <CompRow label={R`变换后 $\mathcal{F}'_{12}$`} v={r.Fp} />
            <CompRow label={R`$g^{-1}\mathcal{F}_{12}\,g$`} v={r.cov} />
          </tbody></table>
          <Check ok={r.dComp < 1e-9} label={R`(a) = (b)：$[T_\alpha,T_\beta]=\epsilon_{\alpha\beta\gamma}T_\gamma$ 使两种写法逐分量相同`} />
          <Check ok={r.dPl < 1.5 * eps * Math.max(1, r.nF) + 1e-6} label={`(c) → (a)：方圈和乐与 $\\mathcal{F}_{12}$ 之差 ${r.dPl.toExponential(2)}，随 $\\epsilon$ 线性趋于 0`} />
          <Check ok={r.dCov < 1e-6} label={`规范协变：$|\\mathcal{F}'-g^{-1}\\mathcal{F}g|$ = ${r.dCov.toExponential(1)}（而 $|\\mathcal{F}'-\\mathcal{F}|$ = ${r.dNaive.toFixed(3)}：场强本身不是规范不变的）`} />
          <Check ok={r.bia.res < 1e-4 * Math.max(1, r.bia.scale)} label={`Bianchi：$|\\mathcal{D}_1\\mathcal{F}_{23}+\\mathcal{D}_2\\mathcal{F}_{31}+\\mathcal{D}_3\\mathcal{F}_{12}|$ = ${r.bia.res.toExponential(1)}（各项量级约 ${r.bia.scale.toFixed(2)}）`} />
          <p className="muted" style={{ marginTop: 8 }}><TxI>{R`把 $\lambda$ 调小，$[\mathcal{A}_1,\mathcal{A}_2]$ 按 $\lambda^2$ 消失，场强退化为阿贝尔的 $\partial_1\mathcal{A}_2-\partial_2\mathcal{A}_1$；调大则交换子项与导数项同量级。方圈估计的误差约为 $\epsilon$ 乘以 $\mathcal{F}$ 的梯度——基点在方圈的一角而不在中心。`}</TxI></p>
        </Panel>
      </Row>
    </RunCard>);
}

// ============================================================
// 4. 瞬子：映射度
// ============================================================
export function InstantonLab() {
  const [kind, setKind] = useState("pow"), [n, setN] = useState(1), [lam, setLam] = useState(1.0), [Ng, setNg] = useState(24);
  const r = useMemo(() => N.degree(kind, n, lam, Ng), [kind, n, lam, Ng]);
  const want = kind === "split" ? 2 : n, ok = Math.abs(r.n - want) < 0.01;
  const W = 330, H = 150, pad = 26, mx = Math.max(1e-9, ...r.prof.map(Math.abs));
  const X = i => pad + (W - 2 * pad) * (i + 0.5) / r.prof.length, Y = v => H / 2 - (H / 2 - 14) * v / mx;
  return (
    <RunCard title={R`交互图 4：瞬子数 = 映射度 $n=\frac{1}{24\pi^2}\int_{S^3}\Tr(g^{-1}\dd g)^3$`}
      lead={R`在 $S^3$ 上用超球坐标 $x^4=\cos\chi$、$\boldsymbol x=\sin\chi(\sin\theta\cos\phi,\sin\theta\sin\phi,\cos\theta)$ 打网格，对 $(g^{-1}\dd g)^3=3\Tr\!\big(\mathcal{A}_\chi[\mathcal{A}_\theta,\mathcal{A}_\phi]\big)\dd\chi\wedge\dd\theta\wedge\dd\phi$ 做中点求积（导数用数值差分）。三类映射：$g_1^n$（\eqref{10.117c}，已按勘误改为 $x^4I_2+\mathrm{i}x^i\sigma_i$）；"两半球拼接" $g_{1\rm N}g_{1\rm S}$——两个各自只在一个半球上变化的 1 度映射之积，正是 \eqref{10.126} 的论证；以及 $g_1^n$ 乘上一个可以连续缩成恒等的"扭曲"。下方曲线是映射度沿 $\chi$ 的分布 $\dd n/\dd\chi$。`}>
      <Row>
        <Panel min={250}>
          <Seg options={[["pow", R`$g_1^n$`], ["split", R`$g_{1\rm N}\,g_{1\rm S}$`], ["twist", R`$g_1^n$ 乘扭曲`]]} value={kind} onChange={setKind} />
          {kind !== "split" && <Slider label={R`幂次 $n$`} value={n} min={-2} max={3} step={1} onChange={setN} fmt={v => String(v)} />}
          {kind === "twist" && <Slider label={R`扭曲强度 $\lambda$`} value={lam} min={0} max={3} step={0.05} onChange={setLam} fmt={v => v.toFixed(2)} />}
          <Seg options={[[16, "粗网格"], [24, "中网格"], [32, "细网格"]]} value={Ng} onChange={setNg} />
          <table className="tb-table" style={{ marginTop: 8 }}><tbody>
            <tr><td><Tex t={R`数值积分 $\frac{1}{24\pi^2}\int\Tr(g^{-1}\dd g)^3$`} /></td><td><b>{r.n.toFixed(5)}</b></td></tr>
            <tr><td>预期的映射度</td><td>{want}</td></tr>
            {kind === "pow" && n === 1 && <tr><td><Tex t={R`$g_1$ 的被积密度 $\Tr\mathcal{A}^3/\text{体元}$（最小 / 最大）`} /></td><td>{r.dmin.toFixed(6)} / {r.dmax.toFixed(6)}</td></tr>}
          </tbody></table>
          <Check ok={ok} label={R`积分值是整数（误差 $<0.01$，来自网格）`} />
          {kind === "pow" && n === 1 && <Check ok={Math.abs(r.dmin - 12) < 1e-4 && Math.abs(r.dmax - 12) < 1e-4} label={R`$g_1$ 的密度处处等于 $12$：与 \eqref{10.124} 在北极算出的值一致`} />}
        </Panel>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: W, ...svgBox }}>
          <line x1={pad} y1={H / 2} x2={W - pad} y2={H / 2} stroke="#c9bfa8" />
          <polyline points={r.prof.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(" ")} fill="none" stroke={VIOLET} strokeWidth="2" />
          <line x1={(pad + W - pad) / 2} y1={10} x2={(pad + W - pad) / 2} y2={H - 16} stroke="#e0d6c0" strokeDasharray="3 3" />
          <text x={pad} y={H - 4} fontSize="11" fill={MUTED}>χ = 0（北极）</text>
          <text x={W / 2 - 22} y={H - 4} fontSize="11" fill={MUTED}>赤道 χ=π/2</text>
          <text x={W - pad - 60} y={H - 4} fontSize="11" fill={MUTED}>χ = π（南极）</text>
          <text x={pad} y={12} fontSize="11" fill={VIOLET}>dn/dχ</text>
        </svg>
      </Row>
      <p className="muted" style={{ marginTop: 8 }}><TxI>{R`$g_1$ 的分布是 $\frac{2}{\pi}\sin^2\chi$（均匀覆盖 $S^3$）；拼接映射的分布分成南北两个峰，各自贡献 $1$；扭曲只改变分布的形状，不改变总面积。$g\to g^{-1}$ 时 $n\to-n$。由 \eqref{10.127}，这也就是对应规范场的 $-\frac{1}{8\pi^2}\int_{S^4}\Tr\mathcal{F}^2$。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 5. Berry 相位
// ============================================================
export function BerryLab() {
  const [kind, setKind] = useState("lat"), [th0, setTh0] = useState(1.0), [al, setAl] = useState(0.9), [rho, setRho] = useState(0.7);
  const [lT, setLT] = useState(2.3), [seed, setSeed] = useState(0);
  const T = 10 ** lT;
  const geo = useMemo(() => {
    const loop = N.makeLoop(kind, { th0, al, rho }), pts = N.loopPoints(loop, 800);
    return { loop, pts, om: N.solidAngle(pts), disc: N.berryDiscrete(pts, seed) };
  }, [kind, th0, al, rho, seed]);
  const dyn = useMemo(() => N.berryDynamic(geo.loop.segs[0].x, T, Math.min(0.02, T / 2000)), [geo, T]);
  const theory = N.wrap(-geo.om / 2);
  return (
    <RunCard title={R`交互图 5：自旋 1/2 的 Berry 相位 $\eta=-\frac12\Omega$`}
      lead={R`$H(\boldsymbol R)=\boldsymbol R\cdot\boldsymbol\sigma$，$|\boldsymbol R|=1$，取本征值 $+1$ 的本征态。让 $\boldsymbol R$ 沿球面上的闭路走一圈。三种算法：① **离散重叠积** $\eta=-\arg\prod_k\langle\boldsymbol R_k|\boldsymbol R_{k+1}\rangle$（本征矢由数值对角化得到，可以给每一点乘上随机相位——结果不变，这就是 Berry 相位的规范不变性）；② **含时 Schrödinger 方程** \eqref{10.129} 用 RK4 积分总时间 $T$，从 $\langle\psi(0)|\psi(T)\rangle$ 中扣除动力学相位 $e^{-\mathrm{i}T}$；③ 几何公式 \eqref{10.168}：$\eta=\mathrm{i}\int_S\mathcal{F}=-\frac12\Omega$。`}>
      <Row>
        <SphereView az={0.5} el={0.4} loops={[{ pts: geo.pts, color: VIOLET }]} marks={[{ x: geo.pts[0], color: GOLD, r: 4, label: R`R(0)` }]} W={280} />
        <Panel min={300}>
          <Seg options={LOOP_OPTS.slice(0, 2)} value={kind} onChange={setKind} />
          {kind === "lat" ? <Slider label={R`纬圈极角 $\nosym{\theta_0}$`} value={th0} min={0.05} max={3.09} step={0.01} onChange={setTh0} fmt={x => x.toFixed(2)} />
            : <><Slider label={R`圆心极角 $\nosym{\alpha}$`} value={al} min={0} max={3.1} step={0.01} onChange={setAl} fmt={x => x.toFixed(2)} />
              <Slider label={R`角半径 $\nosym{\rho}$`} value={rho} min={0.05} max={1.5} step={0.01} onChange={setRho} fmt={x => x.toFixed(2)} /></>}
          <Slider label={R`演化总时间 $\nosym{T}$（对数刻度）`} value={lT} min={0.5} max={3} step={0.05} onChange={setLT} fmt={v => (10 ** v).toFixed(0)} />
          <button style={{ cursor: "pointer", margin: "4px 0" }} onClick={() => setSeed(1 + Math.floor(Math.random() * 1e6))}>给本征矢换一个随机规范</button>
          <table className="tb-table" style={{ marginTop: 6 }}><tbody>
            <tr><td>① 离散重叠积{seed ? "（随机规范）" : ""}</td><td><b>{fmt(N.wrap(geo.disc), 5)}</b></td></tr>
            <tr><td><Tex t={`② 含时方程，$\\nosym{T}=${T.toFixed(0)}$`} /></td><td><b>{fmt(dyn.eta, 5)}</b>（保真度 {dyn.fid.toFixed(5)}）</td></tr>
            <tr><td><Tex t={R`③ $-\frac12\nosym{\Omega}$（模 $2\pi$）`} /></td><td><b>{fmt(theory, 5)}</b></td></tr>
          </tbody></table>
          <Check ok={Math.abs(N.wrap(geo.disc - theory)) < 1e-3} label={R`① = ③：Berry 相位是几何量，只依赖闭路围住的立体角`} />
          <Check ok={Math.abs(N.wrap(dyn.eta - theory)) < 0.05} label={R`② → ③：绝热极限下（$T$ 足够大）含时演化给出同一相位，偏差 $\propto1/T$`} />
          <p className="muted" style={{ marginTop: 8 }}><TxI>{R`$T$ 较小时演化不再绝热：保真度 $|\langle\psi(0)|\psi(T)\rangle|$ 小于 $1$，相位也偏离 $-\Omega/2$。闭路走到大圆（$\theta_0=\pi/2$）时 $\Omega=2\pi$，Berry 相位为 $-\pi$，即 $e^{\mathrm{i}\eta}=-1$——这就是自旋 1/2 转一圈变号的几何版本。`}</TxI></p>
        </Panel>
      </Row>
    </RunCard>);
}
