// 第 8 章交互图（全部在浏览器内真算）：
//  1. ModularLab —— 复环面的模参数 τ：拖动 τ，用 T: τ→τ+1、S: τ→−1/τ 约化到基本区域；格 L(1,τ) 的两组基；Klein j 不变量 j(τ)=j(τ') 独立核对（图 8.1–8.4）
//  2. CP1Lab     —— CP¹ ≅ S² 的两张卡：北极/南极球极投影坐标 Z、W 与齐次坐标 [z⁰,z¹]；W=1/Z、∂W/∂Z̄=0（经球面数值差分）、Fubini–Study 度规的变换律与 (8.91)
//  3. CRLab      —— 输入函数 f(z, z̄)，数值计算 ∂f/∂z、∂f/∂z̄、Cauchy–Riemann 残差，|∂f/∂z̄| 热图，差商与方向无关性
//  4. HodgeLab   —— Hodge 菱形：CPᵐ、复环面、K3、五次 Calabi–Yau、CP¹×CP¹、Hopf 曲面；核对 (8.116)–(8.120) 与 Euler 数
import { useMemo, useRef, useState } from "react";
import { TxI, RunCard, Check, Slider, Seg } from "@kit";

const R = String.raw;
const INK = "#1f1b16", BLUE = "#2c4a6e", RED = "#9b2c1f", GOLD = "#b8862b", GREEN = "#2c6e49", GRAY = "#9a9083";
const Row = ({ children, gap = 16 }) => <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>{children}</div>;
const svgStyle = { maxWidth: "100%", background: "#fffdf8", border: "1px solid #e8e0d0", borderRadius: 6, touchAction: "none" };
function svgPoint(svg, e) { const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); }
const f4 = v => (!isFinite(v) ? "—" : Math.abs(v) < 5e-13 ? "0" : Math.abs(v) >= 1e5 || Math.abs(v) < 1e-3 ? v.toExponential(3) : v.toFixed(4));
const fc = c => (!c || !isFinite(c[0]) || !isFinite(c[1]) ? "—" : `${f4(c[0])} ${c[1] < 0 ? "−" : "+"} ${f4(Math.abs(c[1]))}i`);
const Lab = ({ x, y, children, color = INK, size = 12, anchor = "middle" }) => <text x={x} y={y} fontSize={size} fill={color} textAnchor={anchor} fontStyle="italic">{children}</text>;
const Tbl = ({ rows, head = ["量", "数值", "来源 / 预期"] }) => (
  <div className="tb-table-wrap"><table className="tb-table">
    <thead><tr>{head.map((h, i) => <th key={i}><TxI>{h}</TxI></th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{typeof c === "string" ? <TxI>{c}</TxI> : c}</td>)}</tr>)}</tbody>
  </table></div>);

// ---------- 复数运算 ----------
const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]], csub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cdiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
const cabs = a => Math.hypot(a[0], a[1]), cconj = a => [a[0], -a[1]], cscale = (a, s) => [a[0] * s, a[1] * s];
const cexp = a => { const r = Math.exp(a[0]); return [r * Math.cos(a[1]), r * Math.sin(a[1])]; };
const clog = a => [Math.log(cabs(a)), Math.atan2(a[1], a[0])];
const csin = a => [Math.sin(a[0]) * Math.cosh(a[1]), Math.cos(a[0]) * Math.sinh(a[1])];
const ccos = a => [Math.cos(a[0]) * Math.cosh(a[1]), -Math.sin(a[0]) * Math.sinh(a[1])];
const cpow = (a, b) => {
  if (b[1] === 0 && Number.isInteger(b[0]) && Math.abs(b[0]) <= 64) { let r = [1, 0]; for (let k = 0; k < Math.abs(b[0]); k++) r = cmul(r, a); return b[0] < 0 ? cdiv([1, 0], r) : r; }
  if (cabs(a) === 0) return [0, 0];
  return cexp(cmul(b, clog(a)));
};

// ============================================================
// 1. 模参数与 SL(2,Z)
// ============================================================
// τ' = (aτ+b)/(cτ+d)
const mob = (M, t) => cdiv(cadd(cscale(t, M[0][0]), [M[0][1], 0]), cadd(cscale(t, M[1][0]), [M[1][1], 0]));
const mm2 = (A, B) => [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]], [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
function reduce(t0) {
  let t = t0, M = [[1, 0], [0, 1]];
  const path = [t0], steps = [];
  for (let it = 0; it < 200; it++) {
    const n = -Math.round(t[0]);
    if (n !== 0) { t = [t[0] + n, t[1]]; M = mm2([[1, n], [0, 1]], M); path.push(t); steps.push(n > 0 ? `T^{${n}}` : `T^{${n}}`); }
    if (t[0] * t[0] + t[1] * t[1] < 1 - 1e-12) { t = cdiv([-1, 0], t); M = mm2([[0, -1], [1, 0]], M); path.push(t); steps.push("S"); }
    else break;
  }
  // 统一符号：PSL(2,Z) 中取 c>0 或 (c=0, d>0)
  if (M[1][0] < 0 || (M[1][0] === 0 && M[1][1] < 0)) M = M.map(r => r.map(v => -v));
  return { t, M, path, steps };
}
// Klein j 不变量：j = E4³/Δ，E4 = 1+240Σσ₃(n)qⁿ，Δ = q∏(1−qⁿ)²⁴（乘积形式无相消）
function jInv(t) {
  const q = cexp([-2 * Math.PI * t[1], 2 * Math.PI * t[0]]), aq = cabs(q);
  const N = Math.min(600, Math.ceil(40 / -Math.log(aq)) + 10);
  let E4 = [1, 0], qn = [1, 0], P = [1, 0];
  for (let n = 1; n <= N; n++) {
    qn = cmul(qn, q);
    let s3 = 0; for (let d = 1; d <= n; d++) if (n % d === 0) s3 += d * d * d;
    E4 = cadd(E4, cscale(qn, 240 * s3));
    P = cmul(P, csub([1, 0], qn));
  }
  let P24 = [1, 0]; for (let k = 0; k < 24; k++) P24 = cmul(P24, P);
  const Delta = cmul(q, P24);
  return cdiv(cmul(E4, cmul(E4, E4)), Delta);
}
export function ModularLab() {
  const [tau, setTau] = useState([0.62, 0.38]);
  const hp = useRef(null);
  const red = useMemo(() => reduce(tau), [tau[0], tau[1]]);
  const tp = red.t, M = red.M, [[a, b], [c, d]] = M;
  const tpM = mob(M, tau), j1 = useMemo(() => jInv(tau), [tau[0], tau[1]]), j2 = useMemo(() => jInv(tp), [tp[0], tp[1]]);
  const jErr = cabs(csub(j1, j2)) / Math.max(1, cabs(j2));
  const inF = Math.abs(tp[0]) <= 0.5 + 1e-9 && cabs(tp) >= 1 - 1e-9;
  const det = a * d - b * c;
  // 上半平面图
  const W = 360, H = 300, X0 = -2.2, X1 = 2.2, Y1 = 2.6, sx = W / (X1 - X0), sy = (H - 20) / Y1;
  const P = (x, y) => [(x - X0) * sx, H - 20 - y * sy];
  const drag = e => {
    if (e.buttons !== 1 && e.type !== "pointerdown") return;
    const p = svgPoint(hp.current, e), x = p.x / sx + X0, y = (H - 20 - p.y) / sy;
    setTau([Math.max(-2.1, Math.min(2.1, x)), Math.max(0.2, Math.min(2.5, y))]);
  };
  const fd = (() => { const pts = []; for (let k = 0; k <= 30; k++) { const th = Math.PI / 3 + k / 30 * Math.PI / 3; pts.push(P(Math.cos(th), Math.sin(th))); } return pts; })();
  const fdPath = `M${P(0.5, Y1)} L${fd.map(p => p.join(",")).join(" L")} L${P(-0.5, Y1)} Z`;
  const arc = (() => { const pts = []; for (let k = 0; k <= 60; k++) { const th = k / 60 * Math.PI; pts.push(P(Math.cos(th), Math.sin(th)).join(",")); } return "M" + pts.join(" L"); })();
  const [tx, ty] = P(...tau), [px, py] = P(...tp);
  // 格图：L(1,τ) 与约化基 (cτ+d, aτ+b)
  const w1 = [d + c * tau[0], c * tau[1]], w2 = [b + a * tau[0], a * tau[1]];
  const LW = 300, LS = 46, LC = [LW / 2, LW / 2], LP = (x, y) => [LC[0] + x * LS, LC[1] - y * LS];
  const pts = [];
  for (let m = -12; m <= 12; m++) for (let n = -12; n <= 12; n++) { const x = m + n * tau[0], y = n * tau[1]; if (Math.abs(x) < 3.3 && Math.abs(y) < 3.3) pts.push([x, y]); }
  const para = (u, v, col, dash) => { const q = [[0, 0], u, [u[0] + v[0], u[1] + v[1]], v].map(p => LP(...p).join(",")); return <path d={"M" + q.join(" L") + " Z"} fill={col} fillOpacity="0.12" stroke={col} strokeWidth="2" strokeDasharray={dash} />; };
  const apply = A => setTau(tt => { const r = mob(A, tt); return [Math.max(-2.1, Math.min(2.1, r[0])), Math.max(0.2, Math.min(2.5, r[1]))]; });
  return (
    <RunCard title={R`交互图 1：模参数 $\tau$ 与模群 $\mathrm{PSL}(2,\Z)$`}
      lead={R`在左图上半平面中**拖动蓝点** $\tau$（$\mathrm{Im}\,\tau\ge0.2$），或用按钮作用 $T:\tau\mapsto\tau+1$、$S:\tau\mapsto-1/\tau$。程序反复用 $T^n$ 把 $\mathrm{Re}\,\tau$ 移到 $[-\frac12,\frac12]$、用 $S$ 把单位圆内的点翻出去，得到基本区域（阴影，\figref{8.3}）中的代表 $\tau'$（红点，虚线是约化路径）。右图：格 $L(1,\tau)$ 的格点；蓝色平行四边形是基 $(1,\tau)$，红色是约化后的基 $(c\tau+d,\ a\tau+b)$——**同一个格**、不同的基，比值正是 $\tau'$。最后用 Klein 的 $j$ 不变量（$q$ 级数独立计算）核对 $j(\tau)=j(\tau')$：两者描述同一个复环面。`}>
      <Row>
        <svg ref={hp} viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ ...svgStyle, cursor: "crosshair" }}
          onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); drag(e); }} onPointerMove={drag}>
          <path d={fdPath} fill={GOLD} fillOpacity="0.18" stroke="none" />
          <line x1={0} y1={H - 20} x2={W} y2={H - 20} stroke={INK} />
          {[-2, -1, 0, 1, 2].map(k => <g key={k}><line x1={P(k, 0)[0]} y1={H - 20} x2={P(k, 0)[0]} y2={H - 15} stroke={INK} /><text x={P(k, 0)[0]} y={H - 4} fontSize="11" textAnchor="middle" fill={GRAY}>{k}</text></g>)}
          <path d={arc} fill="none" stroke={INK} strokeWidth="1.2" />
          {[-1.5, -0.5, 0.5, 1.5].map(k => <line key={k} x1={P(k, 0)[0]} y1={P(k, 0)[1]} x2={P(k, Y1)[0]} y2={0} stroke={GRAY} strokeDasharray="3 3" />)}
          {[-1, 1].map(k => <path key={k} d={(() => { const q = []; for (let s = 0; s <= 40; s++) { const th = s / 40 * Math.PI; q.push(P(k + Math.cos(th), Math.sin(th)).join(",")); } return "M" + q.join(" L"); })()} fill="none" stroke={GRAY} strokeDasharray="2 3" />)}
          <path d={"M" + red.path.map(p => P(Math.max(X0, Math.min(X1, p[0])), Math.min(Y1, p[1])).join(",")).join(" L")} fill="none" stroke={RED} strokeWidth="1.3" strokeDasharray="4 3" />
          {red.path.slice(1, -1).map((p, i) => { const [u, v] = P(Math.max(X0, Math.min(X1, p[0])), Math.min(Y1, p[1])); return <circle key={i} cx={u} cy={v} r="2.5" fill={RED} opacity="0.6" />; })}
          <circle cx={px} cy={py} r="6" fill={RED} /><Lab x={px + 12} y={py - 6} color={RED}>τ′</Lab>
          <circle cx={tx} cy={ty} r="7" fill={BLUE} stroke="#fff" strokeWidth="2" /><Lab x={tx + 12} y={ty + 14} color={BLUE}>τ</Lab>
          <text x={6} y={14} fontSize="11" fill={GRAY}>阴影 = 基本区域</text>
        </svg>
        <svg viewBox={`0 0 ${LW} ${LW}`} width={LW} height={LW} style={svgStyle}>
          <line x1={0} y1={LC[1]} x2={LW} y2={LC[1]} stroke="#eee5d4" /><line x1={LC[0]} y1={0} x2={LC[0]} y2={LW} stroke="#eee5d4" />
          {para([1, 0], tau, BLUE)}
          {para(w1, w2, RED, "5 3")}
          {pts.map(([x, y], i) => { const [u, v] = LP(x, y); return <circle key={i} cx={u} cy={v} r="2.6" fill={INK} />; })}
          <text x={6} y={LW - 8} fontSize="11" fill={GRAY}>蓝：原基　红虚：约化基</text>
        </svg>
      </Row>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "8px 0" }}>
        <button onClick={() => apply([[1, 1], [0, 1]])}><TxI>{R`$\nosym{T:\tau\mapsto\tau+1}$`}</TxI></button>
        <button onClick={() => apply([[1, -1], [0, 1]])}><TxI>{R`$\nosym{T^{-1}:\tau\mapsto\tau-1}$`}</TxI></button>
        <button onClick={() => apply([[0, -1], [1, 0]])}><TxI>{R`$\nosym{S:\tau\mapsto-1/\tau}$`}</TxI></button>
        <button onClick={() => setTau(red.t)}><TxI>{R`跳到 $\nosym{\tau'}$`}</TxI></button>
        <button onClick={() => setTau([0.62, 0.38])}>复位</button>
      </div>
      <Tbl rows={[
        [R`$\tau$`, fc(tau), "拖动 / 按钮"],
        [R`约化步骤（右边先作用）`, <TxI>{red.steps.length ? "$" + [...red.steps].reverse().join("\\,") + "$" : "（已在基本区域内）"}</TxI>, R`交替 $T^n$ 与 $S$`],
        [R`$M=\begin{pmatrix}a&b\\ c&d\end{pmatrix}$`, `(${a}, ${b}; ${c}, ${d})`, R`$\det M=ad-bc$ = ` + det],
        [R`$\tau'=(a\tau+b)/(c\tau+d)$`, fc(tpM), R`与迭代结果 ` + fc(tp) + " 比较"],
        [R`$\mathrm{Im}\,\tau'=\mathrm{Im}\,\tau/|c\tau+d|^2$`, f4(tau[1] / (cabs([c * tau[0] + d, c * tau[1]]) ** 2)), R`直接计算 $\mathrm{Im}\,\tau'$ = ` + f4(tp[1])],
        [R`$j(\tau)$`, fc(j1), R`$q$ 级数，$q=\mathrm{e}^{2\pi\mathrm{i}\tau}$`],
        [R`$j(\tau')$`, fc(j2), R`相对差 ` + jErr.toExponential(1)],
      ]} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={det === 1} label={R`$M\in\mathrm{SL}(2,\Z)$`} />
        <Check ok={cabs(csub(tpM, tp)) < 1e-9} label={R`$\tau'=M\cdot\tau$`} />
        <Check ok={inF} label={R`$\tau'$ 在基本区域内`} />
        <Check ok={Math.abs(tau[1] / (cabs([c * tau[0] + d, c * tau[1]]) ** 2) - tp[1]) < 1e-9} label={R`$\mathrm{Im}$ 变换律`} />
        <Check ok={jErr < 1e-7} label={R`$j(\tau)=j(\tau')$：同一个复环面`} />
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`试一试：把 $\tau$ 拖到实轴附近（$\mathrm{Im}\,\tau$ 很小），约化需要很多步，$\tau'$ 却总落在阴影区——"很扁的环面"与某个"不扁"的环面全纯等价。$\tau=\mathrm{i}$ 与 $\tau=\mathrm{e}^{\mathrm{i}\pi/3}$ 是基本区域中有额外对称性的点（分别被 $S$ 与 $ST$ 固定），$j=1728$ 与 $j=0$；后者正是 §8.8 中 $T^2/\Z_3$ 所用的环面。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 2. CP¹ 的两张卡
// ============================================================
const toSphere = Z => { const r2 = Z[0] * Z[0] + Z[1] * Z[1]; return [2 * Z[0] / (1 + r2), 2 * Z[1] / (1 + r2), (r2 - 1) / (r2 + 1)]; };
const southW = p => [p[0] / (1 + p[2]), -p[1] / (1 + p[2])];   // 例 8.1：(U,V)=(x/(1+z), −y/(1+z))
const WofZ = Z => southW(toSphere(Z));                          // 经过球面的转移映射（不用 1/Z 公式）
export function CP1Lab() {
  const [Z, setZ] = useState([0.8, 0.45]);
  const [lamA, setLamA] = useState(0.9), [lamR, setLamR] = useState(1.7);
  const pl = useRef(null);
  const d = useMemo(() => {
    const p = toSphere(Z), Wv = southW(p), inv = cdiv([1, 0], Z);
    const h = 1e-6, Wx = cscale(csub(WofZ([Z[0] + h, Z[1]]), WofZ([Z[0] - h, Z[1]])), 1 / (2 * h)), Wy = cscale(csub(WofZ([Z[0], Z[1] + h]), WofZ([Z[0], Z[1] - h])), 1 / (2 * h));
    const dWdZ = cscale(csub(Wx, cmul([0, 1], Wy)), 0.5), dWdZb = cscale(cadd(Wx, cmul([0, 1], Wy)), 0.5);
    const lam = [lamR * Math.cos(lamA), lamR * Math.sin(lamA)], z0 = lam, z1 = cmul(lam, Z);      // [z⁰, z¹] = λ[1, Z]
    const xi = cdiv(z1, z0), eta = cdiv(z0, z1);
    const r2 = Z[0] ** 2 + Z[1] ** 2, w2 = Wv[0] ** 2 + Wv[1] ** 2;
    const gZ = 1 / (1 + r2) ** 2, gW = 1 / (1 + w2) ** 2, J2 = cabs(dWdZ) ** 2;
    // 实切向量 δZ：球面上的弦长平方 vs 2 g_{ZZ̄}|δZ|²
    const e = 1e-5, dir = [Math.cos(0.7), Math.sin(0.7)], p2 = toSphere([Z[0] + e * dir[0], Z[1] + e * dir[1]]);
    const ds2sphere = ((p2[0] - p[0]) ** 2 + (p2[1] - p[1]) ** 2 + (p2[2] - p[2]) ** 2) / (e * e);
    const K0 = 1 + cabs(xi) ** 2, K1 = 1 + cabs(eta) ** 2;
    return { p, Wv, inv, dWdZ, dWdZb, xi, eta, z0, z1, gZ, gW, J2, ds2sphere, ds2FS: 2 * gZ, ds2pred: 4 * gZ, K0, K1, logdiff: Math.log(K0) - Math.log(K1), logxi2: Math.log(cabs(xi) ** 2) };
  }, [Z[0], Z[1], lamA, lamR]);
  const S = 300, Rg = 2.6, toS = (a, b) => [S / 2 + a / Rg * (S / 2 - 12), S / 2 - b / Rg * (S / 2 - 12)];
  const drag = e => {
    if (e.buttons !== 1 && e.type !== "pointerdown") return;
    const p = svgPoint(pl.current, e); let a = (p.x - S / 2) / (S / 2 - 12) * Rg, b = -(p.y - S / 2) / (S / 2 - 12) * Rg;
    if (Math.hypot(a, b) < 0.06) { a = 0.06; b = 0; }
    setZ([a, b]);
  };
  const [zx, zy] = toS(...Z), Wc = [Math.max(-Rg, Math.min(Rg, d.Wv[0])), Math.max(-Rg, Math.min(Rg, d.Wv[1]))], [wx, wy] = toS(...Wc), [ox, oy] = toS(0, 0);
  // 球面斜投影
  const S2 = 260, rr = 95, cx = S2 / 2, cy = S2 / 2 + 6, el = 0.35;
  const proj = q => [cx + rr * (q[0] * 0.94 - q[1] * 0.34), cy - rr * (q[2] * 0.94 + (q[0] * 0.2 + q[1] * 0.55) * el)];
  const circ = f => { const s = []; for (let k = 0; k <= 72; k++) s.push(proj(f(k / 72 * 2 * Math.PI)).join(",")); return "M" + s.join(" L"); };
  const [qx, qy] = proj(d.p), [nx, ny] = proj([0, 0, 1]), [sx, sy] = proj([0, 0, -1]);
  const eW = cabs(csub(d.Wv, d.inv)) / Math.max(1, cabs(d.inv));
  return (
    <RunCard title={R`交互图 2：$\CP^1\cong S^2$ 的两张卡与 Fubini–Study 度规`}
      lead={R`在左图中**拖动蓝点** $Z$（北极球极投影坐标，即卡 $U_0$ 的非齐次坐标 $\xi=z^1/z^0$）。右图是对应的球面点 $P$。红点是同一个 $P$ 的南极坐标 $W=U+\mathrm{i}V$，**由球面点按例 8.1 的定义直接算出**，不用 $1/Z$ 公式。滑块改变齐次坐标的整体因子 $\lambda$：$[z^0,z^1]=\lambda[1,Z]$，两张卡的非齐次坐标 $\xi=z^1/z^0$、$\eta=z^0/z^1$ 不随 $\lambda$ 改变。下表核对 $W=1/Z$、转移函数的全纯性、Fubini–Study 度规 \eqref{8.95} 的张量变换律、它与球面度规的关系，以及 Kähler 势的变换 \eqref{8.91}。`}>
      <Row>
        <svg ref={pl} viewBox={`0 0 ${S} ${S}`} width={S} height={S} style={{ ...svgStyle, cursor: "crosshair" }}
          onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); drag(e); }} onPointerMove={drag}>
          <line x1={6} y1={oy} x2={S - 6} y2={oy} stroke={GRAY} /><line x1={ox} y1={6} x2={ox} y2={S - 6} stroke={GRAY} />
          <circle cx={ox} cy={oy} r={(S / 2 - 12) / Rg} fill="none" stroke={INK} strokeDasharray="3 3" />
          <line x1={zx} y1={zy} x2={wx} y2={wy} stroke={GRAY} strokeOpacity="0.5" />
          <circle cx={wx} cy={wy} r="5" fill={RED} /><Lab x={wx + 10} y={wy + 14} color={RED}>W</Lab>
          <circle cx={zx} cy={zy} r="7" fill={BLUE} stroke="#fff" strokeWidth="2" /><Lab x={zx + 10} y={zy - 8} color={BLUE}>Z</Lab>
          <text x={8} y={S - 8} fontSize="11" fill={GRAY}>虚线圆 = 赤道；红点 W 与蓝点 Z 关于它互为反演（再取共轭）</text>
        </svg>
        <svg viewBox={`0 0 ${S2} ${S2}`} width={S2} height={S2} style={svgStyle}>
          <path d={circ(t => [Math.cos(t), Math.sin(t), 0])} fill="none" stroke={GRAY} />
          <path d={circ(t => [Math.cos(t), 0, Math.sin(t)])} fill="none" stroke={GRAY} strokeDasharray="2 3" />
          <path d={circ(t => [0, Math.cos(t), Math.sin(t)])} fill="none" stroke={GRAY} strokeDasharray="2 3" />
          <circle cx={nx} cy={ny} r="3.5" fill={INK} /><Lab x={nx + 10} y={ny - 4}>N</Lab>
          <circle cx={sx} cy={sy} r="3.5" fill={INK} /><Lab x={sx + 10} y={sy + 12}>S</Lab>
          <line x1={nx} y1={ny} x2={qx} y2={qy} stroke={BLUE} strokeWidth="1.2" />
          <line x1={sx} y1={sy} x2={qx} y2={qy} stroke={RED} strokeWidth="1.2" />
          <circle cx={qx} cy={qy} r="6" fill={GOLD} /><Lab x={qx + 10} y={qy - 6}>P</Lab>
        </svg>
      </Row>
      <Row gap={24}>
        <Slider label={R`$\arg\lambda$`} value={lamA} min={-3.1} max={3.1} step={0.01} onChange={setLamA} fmt={v => v.toFixed(2)} />
        <Slider label={R`$|\lambda|$`} value={lamR} min={0.2} max={3} step={0.01} onChange={setLamR} fmt={v => v.toFixed(2)} />
      </Row>
      <Tbl rows={[
        [R`$P=(x,y,z)\in S^2$`, `(${f4(d.p[0])}, ${f4(d.p[1])}, ${f4(d.p[2])})`, R`球极投影的逆`],
        [R`$[z^0,z^1]=\lambda[1,Z]$`, `[${fc(d.z0)}, ${fc(d.z1)}]`, R`齐次坐标（随 $\lambda$ 变）`],
        [R`$\xi=z^1/z^0$，$\eta=z^0/z^1$`, `${fc(d.xi)}；${fc(d.eta)}`, R`非齐次坐标（不随 $\lambda$ 变）`],
        [R`$W$（由 $P$ 按南极投影算出）`, fc(d.Wv), R`$1/Z$ = ` + fc(d.inv)],
        [R`$\partial W/\partial\bar Z$（数值差分）`, fc(d.dWdZb), R`全纯 $\Rightarrow0$`],
        [R`$\partial W/\partial Z$（数值差分）`, fc(d.dWdZ), R`$-1/Z^2$ = ` + fc(cdiv([-1, 0], cmul(Z, Z)))],
        [R`$g_{Z\bar Z}=(1+|Z|^2)^{-2}$`, f4(d.gZ), R`$|\partial W/\partial Z|^2g_{W\bar W}$ = ` + f4(d.J2 * d.gW)],
        [R`单位球面上的弦长$^2/|\delta Z|^2$`, f4(d.ds2sphere), R`$2\,\mathrm{d}s^2_{\rm FS}=2\cdot2g_{Z\bar Z}$ = ` + f4(d.ds2pred) + R`：Fubini–Study 度规 = 半径 $1/\sqrt2$ 的球面（面积 $2\pi=\int\Omega$）`],
        [R`$\log\mathcal{K}_0-\log\mathcal{K}_1$`, f4(d.logdiff), R`$\log|\xi|^2=\log\xi+\nosym{\overline{\log\xi}}$ = ` + f4(d.logxi2)],
      ]} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={cabs(csub(d.xi, Z)) < 1e-12 && cabs(csub(d.eta, d.Wv)) < 1e-9 * Math.max(1, cabs(d.Wv))} label={R`$\xi=Z$，$\eta=W$：$\CP^1$ 的卡 = 球极投影`} />
        <Check ok={eW < 1e-9} label={R`$W=1/Z$`} />
        <Check ok={cabs(d.dWdZb) < 1e-5 * Math.max(1, cabs(d.dWdZ))} label={R`$\partial W/\partial\bar Z=0$（全纯）`} />
        <Check ok={Math.abs(d.gZ - d.J2 * d.gW) < 1e-5 * d.gZ} label={R`$g_{Z\bar Z}=|W'|^2g_{W\bar W}$`} />
        <Check ok={Math.abs(d.ds2sphere - d.ds2pred) < 1e-4 * d.ds2pred} label={R`$\mathrm{d}s^2_{S^2}=2\,\mathrm{d}s^2_{\rm FS}$`} />
        <Check ok={Math.abs(d.logdiff - d.logxi2) < 1e-10} label={R`\eqref{8.91} 成立`} />
      </div>
    </RunCard>);
}

// ============================================================
// 3. Cauchy–Riemann：数值检验 ∂f/∂z̄ = 0
// ============================================================
// 迷你表达式解析器：变量 z、zb（= z̄）、x、y、i、e、pi；函数 exp log sin cos sinh cosh sqrt conj re im abs；运算 + − * / ^
function parseExpr(src) {
  const toks = []; const re = /\s*([0-9]*\.?[0-9]+(?:e[+-]?\d+)?|[A-Za-z_]+|\*\*|[-+*/^(),])/gy; let m, pos = 0;
  while (pos < src.length) { re.lastIndex = pos; m = re.exec(src); if (!m) { if (/^\s*$/.test(src.slice(pos))) break; throw new Error("无法识别：" + src.slice(pos, pos + 6)); } toks.push(m[1] === "**" ? "^" : m[1]); pos = re.lastIndex; }
  let k = 0; const peek = () => toks[k], eat = t => { if (toks[k] !== t) throw new Error("缺少 " + t); k++; };
  const FN = { exp: cexp, log: clog, sin: csin, cos: ccos, sinh: a => cscale(csub(cexp(a), cexp(cscale(a, -1))), 0.5), cosh: a => cscale(cadd(cexp(a), cexp(cscale(a, -1))), 0.5), sqrt: a => cpow(a, [0.5, 0]), conj: cconj, re: a => [a[0], 0], im: a => [a[1], 0], abs: a => [cabs(a), 0] };
  function prim() {
    const t = peek(); if (t === undefined) throw new Error("表达式不完整");
    if (t === "(") { k++; const v = add(); eat(")"); return v; }
    if (t === "-") { k++; const v = pow(); return z => cscale(v(z), -1); }
    if (t === "+") { k++; return pow(); }
    if (/^[0-9.]/.test(t)) { k++; const c = parseFloat(t); return () => [c, 0]; }
    if (/^[A-Za-z_]+$/.test(t)) {
      k++;
      if (FN[t]) { eat("("); const a = add(); eat(")"); const f = FN[t]; return z => f(a(z)); }
      if (t === "z") return z => z; if (t === "zb" || t === "zbar") return z => cconj(z);
      if (t === "x") return z => [z[0], 0]; if (t === "y") return z => [z[1], 0];
      if (t === "i") return () => [0, 1]; if (t === "e") return () => [Math.E, 0]; if (t === "pi") return () => [Math.PI, 0];
      throw new Error("未知名字：" + t);
    }
    throw new Error("意外的符号：" + t);
  }
  function pow() { const b = prim(); if (peek() === "^") { k++; const e = pow(); return z => cpow(b(z), e(z)); } return b; }
  function mul() { let v = pow(); for (;;) { const t = peek(); if (t === "*" || t === "/") { k++; const r = pow(), l = v; v = t === "*" ? z => cmul(l(z), r(z)) : z => cdiv(l(z), r(z)); } else if (t !== undefined && (t === "(" || /^[A-Za-z_0-9.]/.test(t))) { const r = pow(), l = v; v = z => cmul(l(z), r(z)); } else return v; } }
  function add() { let v = mul(); for (;;) { const t = peek(); if (t === "+" || t === "-") { k++; const r = mul(), l = v; v = t === "+" ? z => cadd(l(z), r(z)) : z => csub(l(z), r(z)); } else return v; } }
  const f = add(); if (k < toks.length) throw new Error("多余的符号：" + toks[k]); return f;
}
const PRE = [
  { e: "z^2", tex: R`$\nosym{z^2}$`, db: z => [0, 0] }, { e: "exp(z)", tex: R`$\nosym{\mathrm{e}^z}$`, db: z => [0, 0] }, { e: "1/z", tex: R`$\nosym{1/z}$`, db: z => [0, 0] },
  { e: "sin(z)", tex: R`$\nosym{\sin z}$`, db: z => [0, 0] }, { e: "log(z)", tex: R`$\nosym{\log z}$`, db: z => [0, 0] },
  { e: "zb", tex: R`$\nosym{\bar z}$`, db: z => [1, 0] }, { e: "z*zb", tex: R`$\nosym{z\bar z}$`, db: z => z }, { e: "x", tex: R`$\nosym{x=\mathrm{Re}\,z}$`, db: z => [0.5, 0] },
  { e: "z^2+zb", tex: R`$\nosym{z^2+\bar z}$`, db: z => [1, 0] }, { e: "x^2-y^2+2*i*x*y", tex: R`$\nosym{x^2-y^2+2\mathrm{i}xy}$`, db: z => [0, 0] },
];
export function CRLab() {
  const [src, setSrc] = useState("z^2+zb");
  const [z0, setZ0] = useState([0.7, 0.4]);
  const sv = useRef(null);
  const parsed = useMemo(() => { try { return { f: parseExpr(src) }; } catch (err) { return { err: err.message }; } }, [src]);
  const pre = PRE.find(p => p.e === src);
  const G = 44, Rg = 2, S = 320;
  const heat = useMemo(() => {
    if (!parsed.f) return null;
    const f = parsed.f, h = 1e-5, cells = [];
    for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) {
      const x = -Rg + (i + 0.5) / G * 2 * Rg, y = Rg - (j + 0.5) / G * 2 * Rg;
      const fx = cscale(csub(f([x + h, y]), f([x - h, y])), 1 / (2 * h)), fy = cscale(csub(f([x, y + h]), f([x, y - h])), 1 / (2 * h));
      const db = cabs(cscale(cadd(fx, cmul([0, 1], fy)), 0.5)), dz = cabs(cscale(csub(fx, cmul([0, 1], fy)), 0.5));
      cells.push({ i, j, v: isFinite(db) && isFinite(dz) ? Math.log10(db / Math.max(1e-300, Math.max(1, dz)) + 1e-14) : NaN });
    }
    return cells;
  }, [parsed.f]);
  const pt = useMemo(() => {
    if (!parsed.f) return null;
    const f = parsed.f, h = 1e-5, [x, y] = z0;
    const fv = f(z0), fx = cscale(csub(f([x + h, y]), f([x - h, y])), 1 / (2 * h)), fy = cscale(csub(f([x, y + h]), f([x, y - h])), 1 / (2 * h));
    const dz = cscale(csub(fx, cmul([0, 1], fy)), 0.5), dzb = cscale(cadd(fx, cmul([0, 1], fy)), 0.5);
    const r1 = fx[0] - fy[1], r2 = fx[1] + fy[0];                 // ∂f₁/∂x − ∂f₂/∂y，∂f₂/∂x + ∂f₁/∂y
    const q = th => { const hh = 1e-6, w = [hh * Math.cos(th), hh * Math.sin(th)]; return cdiv(csub(f(cadd(z0, w)), f(csub(z0, w))), cscale(w, 2)); };
    return { fv, dz, dzb, r1, r2, q0: q(0), q1: q(Math.PI / 2), q2: q(Math.PI / 4) };
  }, [parsed.f, z0[0], z0[1]]);
  const drag = e => {
    if (e.buttons !== 1 && e.type !== "pointerdown") return;
    const p = svgPoint(sv.current, e); setZ0([Math.max(-1.95, Math.min(1.95, (p.x / S) * 2 * Rg - Rg)), Math.max(-1.95, Math.min(1.95, Rg - (p.y / S) * 2 * Rg))]);
  };
  const col = v => { if (!isFinite(v)) return "#ddd"; const t = Math.max(0, Math.min(1, (v + 10) / 10)); return `hsl(${210 - 200 * t}, 55%, ${92 - 45 * t}%)`; };
  const cell = S / G, [px, py] = [(z0[0] + Rg) / (2 * Rg) * S, (Rg - z0[1]) / (2 * Rg) * S];
  const holo = pt && cabs(pt.dzb) < 1e-6 * Math.max(1, cabs(pt.dz));
  const spread = pt ? Math.max(cabs(csub(pt.q0, pt.q1)), cabs(csub(pt.q0, pt.q2))) : NaN;
  return (
    <RunCard title={R`交互图 3：Cauchy–Riemann 方程与 $\partial f/\partial\bar z$`}
      lead={R`输入一个 $z$ 的函数（变量写作 z、zb（即 $\bar z$）、x、y，常数 i、e、pi，函数 exp、log、sin、cos、sinh、cosh、sqrt、conj、re、im、abs，运算 + - * / ^），或点选预设。程序用中心差分数值计算 $\partial f/\partial x$、$\partial f/\partial y$，再按 \eqref{8.13a}、\eqref{8.13b} 组合出 $\partial f/\partial z$ 与 $\partial f/\partial\bar z$。热图显示 $\log_{10}|\partial f/\partial\bar z|$（相对量级）：深色为大，浅蓝为数值零。**拖动黑点**看单点的 Cauchy–Riemann 残差，以及沿三个方向的差商 $[f(z+w)-f(z-w)]/2w$——全纯函数的差商与方向无关。`}>
      <Seg options={PRE.map(p => [p.e, p.tex])} value={pre ? src : ""} onChange={setSrc} />
      <div style={{ margin: "8px 0" }}><label>f(z) = <input value={src} onChange={e => setSrc(e.target.value)} style={{ width: 260, fontFamily: "monospace" }} /></label>{parsed.err && <span style={{ color: RED, marginLeft: 8 }}>{parsed.err}</span>}</div>
      <Row>
        <svg ref={sv} viewBox={`0 0 ${S} ${S}`} width={S} height={S} style={{ ...svgStyle, cursor: "crosshair" }}
          onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); drag(e); }} onPointerMove={drag}>
          {heat && heat.map(c => <rect key={c.i * G + c.j} x={c.i * cell} y={c.j * cell} width={cell + 0.5} height={cell + 0.5} fill={col(c.v)} />)}
          <line x1={0} y1={S / 2} x2={S} y2={S / 2} stroke={GRAY} strokeOpacity="0.6" /><line x1={S / 2} y1={0} x2={S / 2} y2={S} stroke={GRAY} strokeOpacity="0.6" />
          <circle cx={px} cy={py} r="6" fill={INK} stroke="#fff" strokeWidth="2" />
          <text x={6} y={S - 6} fontSize="11" fill={INK}>范围 −2…2；浅蓝 = 数值零，深红 = 1 的量级</text>
        </svg>
        {pt && <div style={{ flex: 1, minWidth: 280 }}>
          <Tbl rows={[
            [R`$z$`, fc(z0), "拖动"],
            [R`$f(z)$`, fc(pt.fv), ""],
            [R`$\partial f/\partial z$`, fc(pt.dz), R`\eqref{8.13a}`],
            [R`$\partial f/\partial\bar z$`, fc(pt.dzb), pre ? R`解析值 ` + fc(pre.db(z0)) : R`\eqref{8.13b}`],
            [R`$\partial_xf_1-\partial_yf_2$`, f4(pt.r1), R`\eqref{8.1} 第一式残差`],
            [R`$\partial_xf_2+\partial_yf_1$`, f4(pt.r2), R`\eqref{8.1} 第二式残差`],
            [R`差商（$w$ 沿实轴）`, fc(pt.q0), ""],
            [R`差商（$w$ 沿虚轴）`, fc(pt.q1), ""],
            [R`差商（$w$ 沿 $45^\circ$）`, fc(pt.q2), R`三者之差 ` + f4(spread)],
          ]} />
        </div>}
      </Row>
      {pt && <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={Math.abs(cabs(pt.dzb) - 0.5 * Math.hypot(pt.r1, pt.r2)) < 1e-8 * Math.max(1, cabs(pt.dzb))} label={R`$|\partial f/\partial\bar z|=\frac12|$CR 残差$|$`} />
        {pre && <Check ok={cabs(csub(pt.dzb, pre.db(z0))) < 1e-6 * Math.max(1, cabs(pre.db(z0)))} label={R`数值 $\partial f/\partial\bar z$ = 解析值`} />}
        <Check ok={holo ? spread < 1e-5 * Math.max(1, cabs(pt.dz)) : spread > 1e-4} label={holo ? R`全纯：差商与方向无关，$=\partial f/\partial z$` : R`非全纯：差商依赖方向`} />
        <span className={"chk " + (holo ? "ok" : "bad")}>{holo ? "此点满足 Cauchy–Riemann 方程" : "此点不满足 Cauchy–Riemann 方程"}</span>
      </div>}
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`观察：$z\bar z=|z|^2$ 的 $\partial/\partial\bar z$ 等于 $z$——把 $z$、$\bar z$ 当作独立变量求偏导即可（§8.6 中 $\bar\partial(z\bar z)=z\,\dd\bar z$）。$x=\frac12(z+\bar z)$ 给出 $\frac12$。$\log z$ 在负实轴上的分支切割处差分失效，热图上会出现一条亮线——那不是不全纯，而是函数本身在那里不连续。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 4. Hodge 菱形
// ============================================================
const binom = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
const MANI = {
  cp: { label: R`$\nosym{\CP^m}$`, kahler: true, param: true, h: m => (r, s) => (r === s ? 1 : 0), chi: m => m + 1, betti: m => Array.from({ length: 2 * m + 1 }, (_, p) => (p % 2 === 0 ? 1 : 0)), note: R`Fubini–Study（例 8.8）。$\chi=m+1$：胞腔分解每个偶数维一个胞腔。` },
  torus: { label: R`复环面 $\nosym{\C^m/L}$`, kahler: true, param: true, h: m => (r, s) => binom(m, r) * binom(m, s), chi: m => 0, betti: m => Array.from({ length: 2 * m + 1 }, (_, p) => binom(2 * m, p)), note: R`平直度规，$c_1=0$。拓扑上 $T^{2m}$，$b^p=\binom{2m}p$，$\chi=0$。` },
  k3: { label: "K3 曲面", kahler: true, m: 2, h: () => (r, s) => ({ "0,0": 1, "2,2": 1, "2,0": 1, "0,2": 1, "1,1": 20 }[r + "," + s] || 0), chi: () => 24, betti: () => [1, 0, 22, 0, 1], note: R`Calabi–Yau 二维流形（例如 $\CP^3$ 中的四次曲面）。拓扑：$b^2=22$，$\chi=24$。` },
  quintic: { label: "五次 Calabi–Yau", kahler: true, m: 3, h: () => (r, s) => ({ "0,0": 1, "3,3": 1, "3,0": 1, "0,3": 1, "1,1": 1, "2,2": 1, "2,1": 101, "1,2": 101 }[r + "," + s] || 0), chi: () => -200, betti: () => [1, 0, 1, 204, 1, 0, 1], note: R`$\CP^4$ 中 $\sum(z^i)^5=0$。$\chi=-200$ 由陈类独立算出（$\int c_3$）；$b^3=204$。` },
  p1p1: { label: R`$\nosym{\CP^1\times\CP^1}$`, kahler: true, m: 2, h: () => (r, s) => ({ "0,0": 1, "2,2": 1, "1,1": 2 }[r + "," + s] || 0), chi: () => 4, betti: () => [1, 0, 2, 0, 1], note: R`拓扑上 $S^2\times S^2$，$\chi=2\cdot2=4$。` },
  hopf: { label: R`Hopf 曲面 $\nosym{S^1\times S^3}$`, kahler: false, m: 2, h: () => (r, s) => ({ "0,0": 1, "2,2": 1, "0,1": 1, "2,1": 1 }[r + "," + s] || 0), chi: () => 0, betti: () => [1, 1, 0, 1, 1], note: R`$(\C^2-\{0\})/(z\sim2z)$，复流形但**不是** Kähler：$b^1=1$ 是奇数，$b^2=0$。Hodge 数取自文献（Barth–Hulek–Peters–Van de Ven）。` },
};
export function HodgeLab() {
  const [key, setKey] = useState("quintic");
  const [mm, setMm] = useState(2);
  const X = MANI[key], m = X.param ? mm : X.m, h = X.h(m);
  const H = (r, s) => (r < 0 || s < 0 || r > m || s > m ? 0 : h(r, s));
  const bettiH = Array.from({ length: 2 * m + 1 }, (_, p) => { let t = 0; for (let r = 0; r <= p; r++) t += H(r, p - r); return t; });
  const bettiT = X.betti(m);
  const chiH = bettiH.reduce((a, b, p) => a + (p % 2 ? -b : b), 0);
  let sym1 = true, sym2 = true;
  for (let r = 0; r <= m; r++) for (let s = 0; s <= m; s++) { if (H(r, s) !== H(s, r)) sym1 = false; if (H(r, s) !== H(m - r, m - s)) sym2 = false; }
  const oddEven = bettiT.every((b, p) => p % 2 === 0 || b % 2 === 0);
  const evenPos = bettiT.every((b, p) => p % 2 === 1 || p === 0 || b >= 1);
  const sumOK = bettiH.every((b, p) => b === bettiT[p]);
  // 独立 Hodge 数：轨道计数 vs 公式
  const seen = new Set(); let orbits = 0;
  for (let r = 0; r <= m; r++) for (let s = 0; s <= m; s++) { const k = r + "," + s; if (seen.has(k)) continue; orbits++; [[r, s], [s, r], [m - r, m - s], [m - s, m - r]].forEach(([a, b]) => seen.add(a + "," + b)); }
  const orbF = m % 2 === 0 ? (m / 2 + 1) ** 2 : (m + 1) * (m + 3) / 4;
  const cell = 46, Wd = (2 * m + 1) * cell + 20, Hd = (2 * m + 1) * cell + 10;
  return (
    <RunCard title={R`交互图 4：Hodge 菱形 \eqref{8.115} 与 Kähler 流形的拓扑约束`}
      lead={R`选一个紧复流形。菱形中第 $p$ 横行（自下而上）是 $r+s=p$ 的 Hodge 数 $b^{r,s}$（左上方向 $r$ 增大，右上方向 $s$ 增大）。右表把每一横行求和，与**独立的拓扑数据**（Betti 数、Euler 数 $\chi$）比较，并逐条检验 \eqref{8.116}–\eqref{8.120}。Hopf 曲面是一个反例：它是复流形，但违反 Kähler 流形必须满足的条件。`}>
      <Seg options={Object.entries(MANI).map(([k, v]) => [k, v.label])} value={key} onChange={setKey} />
      {X.param && <Slider label={R`复维数 $m$`} value={mm} min={1} max={4} step={1} onChange={setMm} />}
      <Row>
        <svg viewBox={`0 0 ${Wd} ${Hd}`} width={Math.min(Wd, 420)} style={svgStyle}>
          {Array.from({ length: m + 1 }, (_, r) => Array.from({ length: m + 1 }, (_, s) => {
            const x = 10 + (m - r + s) * cell + cell / 2, y = Hd - 5 - (r + s) * cell - cell / 2, v = H(r, s);
            return <g key={r + "," + s}>
              <rect x={x - cell / 2 + 3} y={y - cell / 2 + 3} width={cell - 6} height={cell - 6} rx="6" fill={v ? (r === s ? "#efe3c8" : "#dfe8f1") : "#f6f2ea"} stroke="#e1d6c2" />
              <text x={x} y={y + 5} fontSize="15" textAnchor="middle" fill={v ? INK : GRAY} fontWeight={v ? 700 : 400}>{v}</text>
              <text x={x} y={y + 18} fontSize="8.5" textAnchor="middle" fill={GRAY}>{r},{s}</text>
            </g>; }))}
        </svg>
        <div style={{ flex: 1, minWidth: 260 }}>
          <Tbl head={[R`$p$`, R`$\sum_{r+s=p}b^{r,s}$`, R`Betti 数 $b^p$（拓扑）`]} rows={bettiH.map((b, p) => [String(p), String(b), <span style={{ color: b === bettiT[p] ? GREEN : RED }}>{bettiT[p]}</span>])} />
          <p style={{ fontSize: 14 }}><TxI>{R`由 Hodge 数算出的 $\chi=\sum(-1)^{r+s}b^{r,s}=$ `}</TxI><b>{chiH}</b><TxI>{R`；拓扑上的 $\chi=$ `}</TxI><b>{X.chi(m)}</b></p>
          <p className="muted" style={{ fontSize: 13 }}><TxI>{X.note}</TxI></p>
        </div>
      </Row>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={chiH === X.chi(m)} label={R`$\chi$ 一致（任何紧复流形都成立）`} />
        <Check ok={sym1} label={R`\eqref{8.116} $b^{r,s}=b^{s,r}$`} />
        <Check ok={sym2} label={R`\eqref{8.117} $b^{r,s}=b^{m-r,m-s}$`} />
        <Check ok={sumOK} label={R`\eqref{8.118} $b^p=\sum b^{r,s}$`} />
        <Check ok={oddEven} label={R`\eqref{8.119} 奇数 Betti 数为偶`} />
        <Check ok={evenPos} label={R`\eqref{8.120} $b^{2p}\ge1$`} />
        <Check ok={orbits === orbF} label={"独立 Hodge 数（轨道计数）" + orbits + " = 公式 " + orbF} />
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{X.kahler ? R`这是 Kähler 流形：所有 ✔ 都应成立。注意 Calabi–Yau 的菱形还满足 $b^{m,0}=1$、$b^{r,0}=0$（$0<r<m$）；五次超曲面的 $\chi=2(b^{1,1}-b^{2,1})=2(1-101)=-200$。` : R`Hopf 曲面不是 Kähler 流形：$b^{0,1}=1\neq b^{1,0}=0$ 违反 \eqref{8.116}，$b^1=1$ 违反 \eqref{8.119}，$b^2=0$ 违反 \eqref{8.120}。（其 Betti 数仍等于 Hodge 数之和——对复曲面这一点碰巧总成立，但对称性失效。）`}</TxI></p>
    </RunCard>);
}
