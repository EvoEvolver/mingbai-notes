// 第 5 章交互图（全部在浏览器内真算）：
//  1. StereoLab   —— S² 的两张球极投影卡：拖动投影点，核对 (5.3)(5.4) 与习题 5.1 的转移函数、Jacobi 行列式的符号
//  2. BracketLab  —— 两个向量场的流：沿 X 走 ε、沿 Y 走 δ 与反过来走的缺口 ≈ εδ[X,Y]（图 5.13），RK4 数值积分 + 收敛表
//  3. FormsLab    —— 多项式系数的 r 形式（R³）：外微分 d、d²=0 的逐项相消、(5.70)(5.71) 的精确多项式核对、Stokes 定理的数值验证
import { useMemo, useRef, useState } from "react";
import { TxI, M, RunCard, Check, Slider, Seg } from "@kit";

const R = String.raw;
const INK = "#1f1b16", BLUE = "#2c4a6e", RED = "#9b2c1f", GOLD = "#b8862b", GREEN = "#2c6e49", GRAY = "#9a9083";
const Row = ({ children, gap = 16 }) => <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>{children}</div>;
const f4 = v => (Math.abs(v) < 5e-13 ? "0" : Math.abs(v) >= 1e4 || Math.abs(v) < 1e-3 ? v.toExponential(2) : v.toFixed(4));
const svgStyle = { maxWidth: "100%", background: "#fffdf8", border: "1px solid #e8e0d0", borderRadius: 6, touchAction: "none" };
function svgPoint(svg, e) { const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); }
function Arrow({ x1, y1, x2, y2, color, w = 2, dash, head = 7 }) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  if (L < 1e-6) return null;
  const ux = dx / L, uy = dy / L, s = Math.min(head, L * 0.6);
  return <g>
    <line x1={x1} y1={y1} x2={x2 - ux * s * 0.6} y2={y2 - uy * s * 0.6} stroke={color} strokeWidth={w} strokeDasharray={dash} />
    <path d={`M${x2},${y2} L${x2 - ux * s - uy * s * 0.5},${y2 - uy * s + ux * s * 0.5} L${x2 - ux * s + uy * s * 0.5},${y2 - uy * s - ux * s * 0.5} Z`} fill={color} />
  </g>;
}
const Lab = ({ x, y, children, color = INK, size = 13, anchor = "middle" }) => <text x={x} y={y} fontSize={size} fill={color} textAnchor={anchor} fontStyle="italic">{children}</text>;

// ============================================================
// 1. S² 的两张球极投影卡
// ============================================================
export function StereoLab() {
  const [th, setTh] = useState(1.15);
  const [ph, setPh] = useState(0.65);
  const [flip, setFlip] = useState(true);       // true：按图 5.5，V 轴与 Y 轴反向
  const sV = flip ? -1 : 1;
  const top = useRef(null);
  const d = useMemo(() => {
    const x = Math.sin(th) * Math.cos(ph), y = Math.sin(th) * Math.sin(ph), z = Math.cos(th);
    const X = x / (1 - z), Y = y / (1 - z);                       // (5.3)
    const X4 = Math.cos(ph) / Math.tan(th / 2), Y4 = Math.sin(ph) / Math.tan(th / 2);   // (5.4)
    const U = x / (1 + z), V = sV * y / (1 + z);                   // 南极投影（定义）
    const r2 = X * X + Y * Y, Up = X / r2, Vp = sV * Y / r2;        // 习题 5.1 的转移函数
    // 数值 Jacobi：(X,Y) → 球面 → (U,V)，不经过转移公式
    const G = (a, b) => { const q = a * a + b * b, xx = 2 * a / (1 + q), yy = 2 * b / (1 + q), zz = (q - 1) / (q + 1); return [xx / (1 + zz), sV * yy / (1 + zz)]; };
    const h = 1e-6, gx1 = G(X + h, Y), gx0 = G(X - h, Y), gy1 = G(X, Y + h), gy0 = G(X, Y - h);
    const J = [[(gx1[0] - gx0[0]) / (2 * h), (gy1[0] - gy0[0]) / (2 * h)], [(gx1[1] - gx0[1]) / (2 * h), (gy1[1] - gy0[1]) / (2 * h)]];
    const detJ = J[0][0] * J[1][1] - J[0][1] * J[1][0], detPred = -sV / (r2 * r2);
    return { x, y, z, X, Y, X4, Y4, U, V, Up, Vp, r2, detJ, detPred, e4: Math.hypot(X - X4, Y - Y4), eT: Math.hypot(U - Up, V - Vp) };
  }, [th, ph, sV]);
  // 俯视图（赤道面）：坐标范围 ±2.6
  const S = 300, Rng = 2.6, toS = (a, b) => [S / 2 + a / Rng * (S / 2 - 12), S / 2 - b / Rng * (S / 2 - 12)];
  const drag = e => {
    if (e.buttons !== 1 && e.type !== "pointerdown") return;
    const p = svgPoint(top.current, e), a = (p.x - S / 2) / (S / 2 - 12) * Rng, b = -(p.y - S / 2) / (S / 2 - 12) * Rng;
    const r = Math.min(30, Math.max(0.035, Math.hypot(a, b)));
    setTh(2 * Math.atan(1 / r)); setPh(Math.atan2(b, a));
  };
  const [qx, qy] = toS(d.X, d.Y), [sx, sy] = toS(d.U, sV * d.V), [o0, o1] = toS(0, 0);
  // 侧视截面：过 z 轴与 P 的平面，横轴 ρ（沿经度方向），纵轴 z
  const W2 = 320, H2 = 300, sc = 62, cx = 105, cz = 150, side = (rho, z) => [cx + rho * sc, cz - z * sc];
  const rho = Math.sin(th), zP = Math.cos(th), rN = rho / (1 - zP), rS = rho / (1 + zP);
  const clampR = r => Math.min(r, (W2 - cx - 8) / sc);
  const [Px, Pz] = side(rho, zP), [Nx, Nz] = side(0, 1), [Sx, Sz] = side(0, -1), [QNx, QNz] = side(clampR(rN), 0), [QSx, QSz] = side(rS, 0);
  const lineToQN = rN <= (W2 - cx - 8) / sc ? [QNx, QNz] : (() => { const t = (W2 - 8 - Nx) / (Px - Nx); return [W2 - 8, Nz + t * (Pz - Nz)]; })();
  return (
    <RunCard title={R`交互图 1：$S^2$ 的两张球极投影卡与转移函数`}
      lead={R`在右边的赤道面上**拖动蓝点** $(X,Y)$（北极投影），或用滑块改 $(\theta,\phi)$。左图是过 $z$ 轴与 $P$ 的截面：从北极 N 与南极 S 各引一条直线穿过 $P$，交赤道面得两个投影点。下表逐项核对 \eqref{5.3}、\eqref{5.4} 与习题 5.1 的转移函数 $U=X/(X^2+Y^2)$、$V=-Y/(X^2+Y^2)$；Jacobi 行列式用"$(X,Y)\to$ 球面 $\to(U,V)$"数值差分独立计算。`}>
      <Row>
        <svg viewBox={`0 0 ${W2} ${H2}`} width={W2} height={H2} style={svgStyle}>
          <line x1={8} y1={cz} x2={W2 - 8} y2={cz} stroke={GRAY} strokeDasharray="4 4" />
          <text x={W2 - 10} y={cz - 6} fontSize="11" fill={GRAY} textAnchor="end">赤道面</text>
          <line x1={cx} y1={12} x2={cx} y2={H2 - 12} stroke={GRAY} />
          <circle cx={cx} cy={cz} r={sc} fill="rgba(184,134,43,0.06)" stroke={INK} />
          <line x1={Nx} y1={Nz} x2={lineToQN[0]} y2={lineToQN[1]} stroke={BLUE} strokeWidth="1.6" />
          <line x1={Sx} y1={Sz} x2={QSx + (QSx - Sx) * 0} y2={QSz} stroke={RED} strokeWidth="1.6" />
          <line x1={QSx} y1={QSz} x2={Px} y2={Pz} stroke={RED} strokeWidth="1.6" strokeDasharray="3 3" />
          <circle cx={Nx} cy={Nz} r="4" fill={INK} /><Lab x={Nx - 12} y={Nz - 6}>N</Lab>
          <circle cx={Sx} cy={Sz} r="4" fill={INK} /><Lab x={Sx - 12} y={Sz + 14}>S</Lab>
          <circle cx={Px} cy={Pz} r="5" fill={GOLD} /><Lab x={Px + 10} y={Pz - 8}>P</Lab>
          {rN <= (W2 - cx - 8) / sc && <><circle cx={QNx} cy={QNz} r="5" fill={BLUE} /><Lab x={QNx} y={QNz + 18} color={BLUE}>北极投影</Lab></>}
          {rN > (W2 - cx - 8) / sc && <text x={W2 - 12} y={cz + 18} fontSize="11" fill={BLUE} textAnchor="end">北极投影点在图外</text>}
          <circle cx={QSx} cy={QSz} r="5" fill={RED} /><Lab x={QSx} y={QSz - 10} color={RED}>南极投影</Lab>
        </svg>
        <svg ref={top} viewBox={`0 0 ${S} ${S}`} width={S} height={S} style={{ ...svgStyle, cursor: "crosshair" }}
          onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); drag(e); }} onPointerMove={drag}>
          <line x1={6} y1={o1} x2={S - 6} y2={o1} stroke={GRAY} /><line x1={o0} y1={6} x2={o0} y2={S - 6} stroke={GRAY} />
          <circle cx={o0} cy={o1} r={(S / 2 - 12) / Rng} fill="none" stroke={INK} strokeDasharray="3 3" />
          <text x={S - 8} y={o1 - 6} fontSize="12" textAnchor="end" fill={BLUE} fontStyle="italic">X = U</text>
          <text x={o0 + 6} y={14} fontSize="12" fill={BLUE} fontStyle="italic">Y</text>
          <text x={o0 + 6} y={flip ? S - 8 : 28} fontSize="12" fill={RED} fontStyle="italic">V</text>
          <line x1={o0} y1={o1} x2={qx} y2={qy} stroke={BLUE} strokeOpacity="0.35" />
          <circle cx={sx} cy={sy} r="5" fill={RED} />
          <circle cx={qx} cy={qy} r="7" fill={BLUE} stroke="#fff" strokeWidth="2" />
          <text x={8} y={S - 8} fontSize="11" fill={GRAY}>虚线圆 = 赤道（单位圆）</text>
        </svg>
      </Row>
      <Row gap={24}>
        <Slider label={R`极角 $\theta$`} value={+th.toFixed(3)} min={0.06} max={3.08} step={0.01} onChange={setTh} fmt={v => v.toFixed(2)} />
        <Slider label={R`经度 $\phi$`} value={+ph.toFixed(3)} min={-3.14} max={3.14} step={0.01} onChange={setPh} fmt={v => v.toFixed(2)} />
        <div><TxI>{R`$(U,V)$ 的 $V$ 轴：`}</TxI><Seg options={[[true, "按图 5.5（与 $Y$ 反向）"], [false, "与 $Y$ 同向"]]} value={flip} onChange={setFlip} /></div>
      </Row>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th>量</th><th>数值</th><th>来源</th></tr></thead>
        <tbody>
          <tr><td><TxI>{R`$(x,y,z)$`}</TxI></td><td>({f4(d.x)}, {f4(d.y)}, {f4(d.z)})</td><td><TxI>{R`\eqref{5.1}`}</TxI></td></tr>
          <tr><td><TxI>{R`$(X,Y)=\left(\frac{x}{1-z},\frac{y}{1-z}\right)$`}</TxI></td><td>({f4(d.X)}, {f4(d.Y)})</td><td><TxI>{R`\eqref{5.3}`}</TxI></td></tr>
          <tr><td><TxI>{R`$(\cot\frac\theta2\cos\phi,\ \cot\frac\theta2\sin\phi)$`}</TxI></td><td>({f4(d.X4)}, {f4(d.Y4)})</td><td><TxI>{R`\eqref{5.4}`}</TxI></td></tr>
          <tr><td><TxI>{flip ? R`$(U,V)=\left(\frac{x}{1+z},-\frac{y}{1+z}\right)$` : R`$(U,V)=\left(\frac{x}{1+z},\frac{y}{1+z}\right)$`}</TxI></td><td>({f4(d.U)}, {f4(d.V)})</td><td>南极投影的定义</td></tr>
          <tr><td><TxI>{flip ? R`$\left(\frac{X}{X^2+Y^2},-\frac{Y}{X^2+Y^2}\right)$` : R`$\left(\frac{X}{X^2+Y^2},\frac{Y}{X^2+Y^2}\right)$`}</TxI></td><td>({f4(d.Up)}, {f4(d.Vp)})</td><td>转移函数（习题 5.1）</td></tr>
          <tr><td><TxI>{R`$|Q_N|\cdot|Q_S|=\sqrt{X^2+Y^2}\sqrt{U^2+V^2}$`}</TxI></td><td>{f4(Math.sqrt(d.r2) * Math.hypot(d.U, d.V))}</td><td>反演：两投影点互为单位圆的反演点</td></tr>
          <tr><td><TxI>{R`$\det\dfrac{\partial(U,V)}{\partial(X,Y)}$（数值差分）`}</TxI></td><td>{f4(d.detJ)}</td><td><TxI>{flip ? R`预期 $+1/(X^2+Y^2)^2=$ ` : R`预期 $-1/(X^2+Y^2)^2=$ `}</TxI>{f4(d.detPred)}</td></tr>
        </tbody>
      </table></div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={d.e4 < 1e-9 * Math.max(1, d.r2)} label={R`\eqref{5.3} 与 \eqref{5.4} 一致`} />
        <Check ok={d.eT < 1e-9 * Math.max(1, d.r2)} label={R`转移函数公式成立`} />
        <Check ok={Math.abs(d.detJ - d.detPred) < 1e-4 * Math.abs(d.detPred) + 1e-9} label={R`Jacobi 行列式 $=${flip ? "+" : "-"}1/(X^2+Y^2)^2$`} />
        <Check ok={flip ? d.detJ > 0 : d.detJ < 0} label={flip ? R`两卡定向一致（$J>0$）` : R`两卡定向相反（$J<0$）`} />
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`试一试：把蓝点拖向远处（$P\to$ 北极），$(X,Y)$ 发散而 $(U,V)\to0$——北极卡在北极失效，南极卡接手。切换 $V$ 轴方向：转移函数仍然 $C^\infty$（仍是微分结构），但 Jacobi 行列式变号，两张卡的定向相反（\secref{5.5.1}）。按图 5.5 的约定，$U+\mathrm{i}V=1/(X+\mathrm{i}Y)$ 是全纯函数（第 8 章例 8.1）。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 2. 李括号 = 平行四边形的缺口
// ============================================================
const PRESETS = [
  { id: "a", tx: R`$X=\partial_x,\ Y=x\,\partial_y$`, X: (x, y) => [1, 0], Y: (x, y) => [0, x], B: (x, y) => [0, 1], tb: R`[X,Y]=\partial_y` },
  { id: "b", tx: R`$X=-y\partial_x+x\partial_y,\ Y=\partial_x$`, X: (x, y) => [-y, x], Y: (x, y) => [1, 0], B: (x, y) => [0, -1], tb: R`[X,Y]=-\partial_y` },
  { id: "c", tx: R`$X=y\,\partial_x,\ Y=x\,\partial_y$`, X: (x, y) => [y, 0], Y: (x, y) => [0, x], B: (x, y) => [-x, y], tb: R`[X,Y]=-x\partial_x+y\partial_y` },
  { id: "d", tx: R`$X=y\partial_x+x\partial_y,\ Y=-y\partial_x+x\partial_y$`, X: (x, y) => [y, x], Y: (x, y) => [-y, x], B: (x, y) => [-2 * x, 2 * y], tb: R`[X,Y]=-2x\partial_x+2y\partial_y` },
  { id: "e", tx: R`$X=\partial_x,\ Y=\sin x\,\partial_y$`, X: (x, y) => [1, 0], Y: (x, y) => [0, Math.sin(x)], B: (x, y) => [0, Math.cos(x)], tb: R`[X,Y]=\cos x\,\partial_y` },
  { id: "f", tx: R`$X=x\partial_x+y\partial_y,\ Y=-y\partial_x+x\partial_y$`, X: (x, y) => [x, y], Y: (x, y) => [-y, x], B: (x, y) => [0, 0], tb: R`[X,Y]=0` },
  { id: "g", tx: R`$X=\partial_x,\ Y=\partial_y$`, X: (x, y) => [1, 0], Y: (x, y) => [0, 1], B: (x, y) => [0, 0], tb: R`[X,Y]=0` },
];
// RK4 积分 dx/dt = F(x)，返回路径（含端点）
function flowPath(F, p, t, perUnit = 400) {
  const n = Math.max(8, Math.ceil(Math.abs(t) * perUnit)), h = t / n, out = [p];
  let [x, y] = p;
  for (let i = 0; i < n; i++) {
    const k1 = F(x, y), k2 = F(x + h / 2 * k1[0], y + h / 2 * k1[1]), k3 = F(x + h / 2 * k2[0], y + h / 2 * k2[1]), k4 = F(x + h * k3[0], y + h * k3[1]);
    x += h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]); y += h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
    out.push([x, y]);
  }
  return out;
}
const endOf = path => path[path.length - 1];
function gapAt(P, x0, eps, del) {
  const A1 = endOf(flowPath(P.X, x0, eps)), A2 = endOf(flowPath(P.Y, A1, del));   // τ(δ, σ(ε, x))
  const B1 = endOf(flowPath(P.Y, x0, del)), B2 = endOf(flowPath(P.X, B1, eps));   // σ(ε, τ(δ, x))
  return { A1, A2, B1, B2, g: [A2[0] - B2[0], A2[1] - B2[1]] };
}
export function BracketLab() {
  const [pid, setPid] = useState("e");
  const [eps, setEps] = useState(0.7);
  const [del, setDel] = useState(0.7);
  const [x0, setX0] = useState([-0.4, -0.3]);
  const svg = useRef(null);
  const P = PRESETS.find(p => p.id === pid);
  const Sz = 380, Rg = 1.8, toS = (a, b) => [Sz / 2 + a / Rg * (Sz / 2 - 10), Sz / 2 - b / Rg * (Sz / 2 - 10)], k = (Sz / 2 - 10) / Rg;
  const res = useMemo(() => {
    const A = flowPath(P.X, x0, eps), A2 = flowPath(P.Y, endOf(A), del);
    const B = flowPath(P.Y, x0, del), B2 = flowPath(P.X, endOf(B), eps);
    const pa = endOf(A2), pb = endOf(B2), gap = [pa[0] - pb[0], pa[1] - pb[1]], br = P.B(...x0);
    const table = [0.4, 0.2, 0.1, 0.05, 0.025].map(e => { const r = gapAt(P, x0, e, e); const q = [r.g[0] / (e * e), r.g[1] / (e * e)]; return { e, q, err: Math.hypot(q[0] - br[0], q[1] - br[1]) }; });
    return { A, A2, B, B2, pa, pb, gap, br, table };
  }, [pid, eps, del, x0[0], x0[1]]);
  const brN = Math.hypot(...res.br), last = res.table[res.table.length - 1];
  const tol = 0.05 * Math.max(1, brN);
  const drag = e => {
    if (e.buttons !== 1 && e.type !== "pointerdown") return;
    const p = svgPoint(svg.current, e); setX0([Math.max(-1.7, Math.min(1.7, (p.x - Sz / 2) / k)), Math.max(-1.7, Math.min(1.7, -(p.y - Sz / 2) / k))]);
  };
  const grid = []; for (let i = -4; i <= 4; i++) for (let j = -4; j <= 4; j++) grid.push([i * 0.4, j * 0.4]);
  const pathD = pts => pts.map((p, i) => { const [a, b] = toS(...p); return `${i ? "L" : "M"}${a.toFixed(1)},${b.toFixed(1)}`; }).join("");
  const [ax, ay] = toS(...res.pa), [bx, by] = toS(...res.pb), [ox, oy] = toS(...x0);
  const pred = [res.pb[0] + eps * del * res.br[0], res.pb[1] + eps * del * res.br[1]], [px, py] = toS(...pred);
  return (
    <RunCard title={R`交互图 2：李括号是流的平行四边形的缺口（图 5.13）`}
      lead={R`选一对向量场，**拖动黑点**改变起点 $x$。实线：先沿 $X$ 的流走 $\varepsilon$（蓝）再沿 $Y$ 的流走 $\delta$（红），到达 $\tau(\delta,\sigma(\varepsilon,x))$；虚线：先 $Y$ 后 $X$，到达 $\sigma(\varepsilon,\tau(\delta,x))$。绿色箭头是两个终点之差（缺口），金色虚线箭头是预测 $\varepsilon\delta[X,Y]$。流用 RK4 数值积分，$[X,Y]$ 用 \eqref{5.49a} 解析算出。`}>
      <Seg options={PRESETS.map(p => [p.id, p.tx])} value={pid} onChange={setPid} />
      <Row>
        <svg ref={svg} viewBox={`0 0 ${Sz} ${Sz}`} width={Sz} height={Sz} style={{ ...svgStyle, cursor: "move" }}
          onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); drag(e); }} onPointerMove={drag}>
          <line x1={0} y1={Sz / 2} x2={Sz} y2={Sz / 2} stroke="#eee5d4" /><line x1={Sz / 2} y1={0} x2={Sz / 2} y2={Sz} stroke="#eee5d4" />
          {grid.map(([a, b], i) => { const vx = P.X(a, b), vy = P.Y(a, b), [sx, sy] = toS(a, b), nx = Math.hypot(...vx) || 1, ny = Math.hypot(...vy) || 1;
            return <g key={i} opacity="0.35">
              {Math.hypot(...vx) > 1e-9 && <Arrow x1={sx} y1={sy} x2={sx + vx[0] / nx * 13} y2={sy - vx[1] / nx * 13} color={BLUE} w={1} head={4} />}
              {Math.hypot(...vy) > 1e-9 && <Arrow x1={sx} y1={sy} x2={sx + vy[0] / ny * 13} y2={sy - vy[1] / ny * 13} color={RED} w={1} head={4} />}
            </g>; })}
          <path d={pathD(res.A)} fill="none" stroke={BLUE} strokeWidth="2.5" />
          <path d={pathD(res.A2)} fill="none" stroke={RED} strokeWidth="2.5" />
          <path d={pathD(res.B)} fill="none" stroke={RED} strokeWidth="2" strokeDasharray="6 4" />
          <path d={pathD(res.B2)} fill="none" stroke={BLUE} strokeWidth="2" strokeDasharray="6 4" />
          <Arrow x1={bx} y1={by} x2={px} y2={py} color={GOLD} w={2} dash="4 3" />
          <Arrow x1={bx} y1={by} x2={ax} y2={ay} color={GREEN} w={2.5} />
          <circle cx={ox} cy={oy} r="6" fill={INK} stroke="#fff" strokeWidth="2" />
          <circle cx={ax} cy={ay} r="4" fill={GREEN} /><circle cx={bx} cy={by} r="4" fill={INK} />
          <text x={8} y={Sz - 8} fontSize="11" fill={GRAY}>淡色箭头：X（蓝）、Y（红）的方向场</text>
        </svg>
        <div style={{ minWidth: 260, flex: 1, textAlign: "left" }}>
          <Slider label={R`$\varepsilon$（沿 $X$）`} value={eps} min={-1} max={1} step={0.01} onChange={setEps} fmt={v => v.toFixed(2)} />
          <Slider label={R`$\delta$（沿 $Y$）`} value={del} min={-1} max={1} step={0.01} onChange={setDel} fmt={v => v.toFixed(2)} />
          <p style={{ textAlign: "left" }}><TxI>{R`起点 $x=(${x0[0].toFixed(2)},\,${x0[1].toFixed(2)})$；解析结果 $${P.tb}$，在 $x$ 处 $[X,Y]=(${f4(res.br[0])},\,${f4(res.br[1])})$。`}</TxI></p>
          <p style={{ textAlign: "left" }}><TxI>{R`缺口 $\tau(\delta,\sigma(\varepsilon,x))-\sigma(\varepsilon,\tau(\delta,x))=(${f4(res.gap[0])},\,${f4(res.gap[1])})$；`}</TxI><br />
            <TxI>{R`预测 $\varepsilon\delta[X,Y]=(${f4(eps * del * res.br[0])},\,${f4(eps * del * res.br[1])})$。`}</TxI></p>
          <p className="muted" style={{ fontSize: 13 }}><TxI>{R`$\varepsilon,\delta$ 较大时二者有 $O(\varepsilon^2\delta,\varepsilon\delta^2)$ 的偏差；下表令 $\varepsilon=\delta\to0$，比值 缺口$/(\varepsilon\delta)$ 收敛到 $[X,Y](x)$，误差约按 $\varepsilon$ 线性减小。`}</TxI></p>
        </div>
      </Row>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th><TxI>{R`$\varepsilon=\delta$`}</TxI></th><th><TxI>{R`缺口$/(\varepsilon\delta)$`}</TxI></th><th><TxI>{R`与 $[X,Y](x)$ 之差`}</TxI></th></tr></thead>
        <tbody>{res.table.map(r => <tr key={r.e}><td>{r.e}</td><td>({f4(r.q[0])}, {f4(r.q[1])})</td><td>{f4(r.err)}</td></tr>)}</tbody>
      </table></div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={last.err < tol} label={R`$\varepsilon=\delta=0.025$ 时 缺口$/(\varepsilon\delta)$ 与 $[X,Y]$ 相差 $<${(tol).toFixed(3)}$`} />
        <Check ok={res.table[4].err <= res.table[0].err + 1e-9} label="误差随步长减小" />
        {brN < 1e-12 && <Check ok={Math.hypot(...res.gap) < 1e-6} label={R`$[X,Y]=0$：任意 $\varepsilon,\delta$ 下四边形都闭合（\eqref{5.53}）`} />}
      </div>
    </RunCard>);
}

// ============================================================
// 3. 外微分、d²=0、(5.70)(5.71) 与 Stokes 定理
// ============================================================
// 多项式：Map "a,b,c" → 系数（整数），变量 x,y,z
const VARS = ["x", "y", "z"];
const P = {
  key: e => e.join(","), exps: k => k.split(",").map(Number),
  clean(m) { for (const [k, v] of [...m]) if (v === 0) m.delete(k); return m; },
  add(a, b, s = 1) { const m = new Map(a); for (const [k, v] of b) m.set(k, (m.get(k) || 0) + s * v); return P.clean(m); },
  scale(a, s) { return P.clean(new Map([...a].map(([k, v]) => [k, v * s]))); },
  mul(a, b) { const m = new Map(); for (const [k1, v1] of a) for (const [k2, v2] of b) { const e1 = P.exps(k1), e2 = P.exps(k2), k = P.key(e1.map((x, i) => x + e2[i])); m.set(k, (m.get(k) || 0) + v1 * v2); } return P.clean(m); },
  d(a, i) { const m = new Map(); for (const [k, v] of a) { const e = P.exps(k); if (!e[i]) continue; const c = v * e[i]; e[i]--; const kk = P.key(e); m.set(kk, (m.get(kk) || 0) + c); } return P.clean(m); },
  ev(a, p) { let s = 0; for (const [k, v] of a) { const e = P.exps(k); s += v * p[0] ** e[0] * p[1] ** e[1] * p[2] ** e[2]; } return s; },
  eq(a, b) { return P.add(a, b, -1).size === 0; },
  tex(a) {
    if (!a.size) return "0";
    const terms = [...a].sort((u, w) => { const eu = P.exps(u[0]), ew = P.exps(w[0]), du = eu[0] + eu[1] + eu[2], dw = ew[0] + ew[1] + ew[2]; return dw - du || (u[0] < w[0] ? 1 : -1); });
    return terms.map(([k, v], i) => {
      const e = P.exps(k), mono = e.map((n, j) => (n ? VARS[j] + (n > 1 ? `^{${n}}` : "") : "")).join("");
      const av = Math.abs(v), co = mono && av === 1 ? "" : String(av);
      return (v < 0 ? "-" : i ? "+" : "") + co + mono;
    }).join("");
  },
  const: c => P.clean(new Map([["0,0,0", c]])),
};
// 置换符号：把 arr 排序所需对换次数的奇偶
function sortSign(arr) { const a = [...arr]; let s = 1; for (let i = 0; i < a.length; i++) for (let j = 0; j < a.length - 1 - i; j++) if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; s = -s; } return [a, s]; }
const hasDup = a => new Set(a).size !== a.length;
// 形式：Map "i,j" (升序指标) → 多项式
const BASIS = { 0: [[]], 1: [[0], [1], [2]], 2: [[1, 2], [0, 2], [0, 1]], 3: [[0, 1, 2]] };
function dForm(w) {
  const out = new Map();
  for (const [kI, p] of w) {
    const I = kI === "" ? [] : kI.split(",").map(Number);
    for (let v = 0; v < 3; v++) {
      if (I.includes(v)) continue;
      const dp = P.d(p, v); if (!dp.size) continue;
      const [srt, s] = sortSign([v, ...I]), k = srt.join(",");
      out.set(k, P.add(out.get(k) || new Map(), dp, s));
    }
  }
  for (const [k, p] of [...out]) if (!p.size) out.delete(k);
  return out;
}
const dxTex = I => I.map(i => `\\dd ${VARS[i]}`).join("\\wedge ");
function formTex(w, r) {
  if (r === 0) return P.tex(w.get("") || new Map());
  // 二形式按原书例 5.10 的基 dy∧dz, dz∧dx, dx∧dy 显示
  const shown = r === 2 ? [[[1, 2], 1, "\\dd y\\wedge\\dd z"], [[0, 2], -1, "\\dd z\\wedge\\dd x"], [[0, 1], 1, "\\dd x\\wedge\\dd y"]] : BASIS[r].map(I => [I, 1, dxTex(I)]);
  const parts = shown.map(([I, s, b]) => { const p = w.get(I.join(",")); if (!p || !p.size) return null; return `(${P.tex(P.scale(p, s))})\\,${b}`; }).filter(Boolean);
  return parts.length ? parts.join("+") : "0";
}
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function randPoly(R0, maxDeg = 3, nTerms = 3) {
  const m = new Map();
  for (let t = 0; t < nTerms; t++) {
    const e = [0, 0, 0]; const deg = Math.floor(R0() * (maxDeg + 1));
    for (let j = 0; j < deg; j++) e[Math.floor(R0() * 3)]++;
    let c = Math.floor(R0() * 7) - 3; if (!c) c = 1;
    const k = P.key(e); m.set(k, (m.get(k) || 0) + c);
  }
  return P.clean(m);
}
function randForm(R0, r) { const w = new Map(); for (const I of BASIS[r]) { const p = randPoly(R0); if (p.size) w.set(I.join(","), p); } return w; }
// 向量场：长度 3 的多项式数组；X[f]、李括号、形式在向量上的值（得到多项式）
const vfApply = (X, f) => X.reduce((s, Xi, i) => P.add(s, P.mul(Xi, P.d(f, i))), new Map());
const vfBracket = (X, Y) => [0, 1, 2].map(k => P.add(vfApply(X, Y[k]), vfApply(Y, X[k]), -1));
function formOn(w, r, vs) {
  // ω(V_1,…,V_r) = Σ_I ω_I · det[V_a^{I_b}]（升序基 dx^{I_1}∧…，约定 (5.62)）
  let s = new Map();
  for (const [kI, p] of w) {
    const I = kI === "" ? [] : kI.split(",").map(Number);
    let det = r === 0 ? P.const(1) : new Map();
    if (r === 1) det = vs[0][I[0]];
    if (r === 2) det = P.add(P.mul(vs[0][I[0]], vs[1][I[1]]), P.mul(vs[0][I[1]], vs[1][I[0]]), -1);
    if (r === 3) { const [a, b, c] = I, D = (u, v, w2) => P.mul(P.mul(vs[0][u], vs[1][v]), vs[2][w2]);
      det = [[a, b, c, 1], [b, c, a, 1], [c, a, b, 1], [a, c, b, -1], [c, b, a, -1], [b, a, c, -1]].reduce((acc, [u, v, w2, sg]) => P.add(acc, D(u, v, w2), sg), new Map()); }
    s = P.add(s, P.mul(p, det));
  }
  return s;
}
// (5.71) 右边
function dFormula(w, r, Xs) {
  let s = new Map();
  for (let i = 0; i <= r; i++) { const rest = Xs.filter((_, j) => j !== i); s = P.add(s, vfApply(Xs[i], formOn(w, r, rest)), i % 2 ? -1 : 1); }
  for (let i = 0; i <= r; i++) for (let j = i + 1; j <= r; j++) {
    const rest = Xs.filter((_, l) => l !== i && l !== j); const sg = (i + j) % 2 ? -1 : 1;   // (−1)^{i+j}，此处 i,j 从 0 起，奇偶与从 1 起相同
    s = P.add(s, formOn(w, r, [vfBracket(Xs[i], Xs[j]), ...rest]), sg);
  }
  return s;
}
const simpson = (f, a, b, n = 40) => { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; };
const simpson2 = (f, n = 24) => simpson(u => simpson(v => f(u, v), 0, 1, n), 0, 1, n);
const simpson3 = (f, n = 12) => simpson(u => simpson(v => simpson(w2 => f(u, v, w2), 0, 1, n), 0, 1, n), 0, 1, n);

export function FormsLab() {
  const [r, setR] = useState(1);
  const [seed, setSeed] = useState(7);
  const [z0, setZ0] = useState(0.3);
  const data = useMemo(() => {
    const R0 = rng(seed * 97 + r * 13 + 1);
    const w = randForm(R0, r), dw = dForm(w), ddw = dForm(dw);
    // d²ω 的逐项相消：对每个分量 ω_I、每对 (v1,v2)
    const pairs = [];
    for (const [kI, p] of w) {
      const I = kI === "" ? [] : kI.split(",").map(Number);
      for (let a = 0; a < 3; a++) for (let b = a + 1; b < 3; b++) {
        if (I.includes(a) || I.includes(b)) continue;
        const [srt, s1] = sortSign([b, a, ...I]), [, s2] = sortSign([a, b, ...I]);   // 先 ∂_a 后 ∂_b：dx^b∧dx^a∧…；反之 dx^a∧dx^b∧…
        const q = P.d(P.d(p, a), b);
        pairs.push({ I, a, b, target: srt, t1: s1, t2: s2, q, sum: P.add(P.scale(q, s1), P.scale(q, s2)) });
      }
    }
    // (5.70)/(5.71)：随机线性向量场，r+1 个
    let formula = null;
    if (r <= 2) {
      const Xs = [...Array(r + 1)].map(() => [0, 1, 2].map(() => randPoly(R0, 1, 2)));
      const lhs = formOn(dw, r + 1, Xs), rhs = dFormula(w, r, Xs);
      formula = { Xs, lhs, rhs, ok: P.eq(lhs, rhs) };
    }
    return { w, dw, ddw, pairs, formula };
  }, [r, seed]);
  // Stokes 数值验证
  const stokes = useMemo(() => {
    const { w, dw } = data, get = (m, k) => m.get(k) || new Map();
    if (r === 0) {   // ∫_γ df = f(γ(1)) − f(γ(0))，γ(t) = (cos πt, sin πt, t)
      const f = get(w, ""), g = t => [Math.cos(Math.PI * t), Math.sin(Math.PI * t), t], gp = t => [-Math.PI * Math.sin(Math.PI * t), Math.PI * Math.cos(Math.PI * t), 1];
      const lhs = simpson(t => { const p = g(t), v = gp(t); return [0, 1, 2].reduce((s, i) => s + P.ev(get(dw, String(i)), p) * v[i], 0); }, 0, 1, 400);
      const rhs = P.ev(f, g(1)) - P.ev(f, g(0));
      return { lhs, rhs, lt: R`\int_\gamma\dd f`, rt: R`f(\gamma(1))-f(\gamma(0))`, where: R`$\gamma(t)=(\cos\pi t,\sin\pi t,t)$，$0\le t\le1$（半圈螺旋线）` };
    }
    if (r === 1) {   // 单位正方形 [0,1]² × {z0}：∬ (dω)_{xy} = ∮ ω
      const c = get(dw, "0,1"), wx = get(w, "0"), wy = get(w, "1");
      const lhs = simpson2((u, v) => P.ev(c, [u, v, z0]));
      const rhs = simpson(t => P.ev(wx, [t, 0, z0]), 0, 1) + simpson(t => P.ev(wy, [1, t, z0]), 0, 1) - simpson(t => P.ev(wx, [t, 1, z0]), 0, 1) - simpson(t => P.ev(wy, [0, t, z0]), 0, 1);
      return { lhs, rhs, lt: R`\iint_D\dd\omega`, rt: R`\oint_{\partial D}\omega`, where: R`$D=[0,1]^2\times\{z=${z0.toFixed(2)}\}$，按 $\dd x\wedge\dd y$ 定向，边界逆时针` };
    }
    if (r === 2) {   // 单位立方体：∭ dω = 六个面上的通量
      const c = get(dw, "0,1,2"), Fx = get(w, "1,2"), Fy = P.scale(get(w, "0,2"), -1), Fz = get(w, "0,1");
      const lhs = simpson3((a, b, cc) => P.ev(c, [a, b, cc]));
      const rhs = simpson2((u, v) => P.ev(Fx, [1, u, v]) - P.ev(Fx, [0, u, v])) + simpson2((u, v) => P.ev(Fy, [u, 1, v]) - P.ev(Fy, [u, 0, v])) + simpson2((u, v) => P.ev(Fz, [u, v, 1]) - P.ev(Fz, [u, v, 0]));
      return { lhs, rhs, lt: R`\iiint_C\dd\omega`, rt: R`\iint_{\partial C}\omega`, where: R`$C=[0,1]^3$，边界取外法向（Gauss 定理）` };
    }
    return null;
  }, [data, r, z0]);
  const name = ["梯度 grad", "旋度 rot", "散度 div"][r];
  const ddZero = data.ddw.size === 0 && data.pairs.every(p => p.sum.size === 0);
  const tgtTex = t => dxTex(t);
  return (
    <RunCard title={R`交互图 3：外微分、$\dd^2=0$ 与 Stokes 定理`}
      lead={R`在 $\R^3$ 上随机生成系数为整数多项式的 $r$ 形式 $\omega$，按 \eqref{5.68} 精确地（符号运算）算出 $\dd\omega$ 与 $\dd(\dd\omega)$。中间的表把 $\dd^2\omega$ 拆成"先 $\partial_a$ 后 $\partial_b$"与"先 $\partial_b$ 后 $\partial_a$"两项，展示它们逐对相消；接着用随机向量场把无坐标公式 \eqref{5.70}/\eqref{5.71} 作为多项式恒等式核对；最后用数值积分验证 Stokes 定理的特例。`}>
      <Row gap={12}>
        <Seg options={[[0, "$r=0$（函数）"], [1, "$r=1$"], [2, "$r=2$"]]} value={r} onChange={setR} />
        <button style={{ cursor: "pointer" }} onClick={() => setSeed(s => s + 1)}>🎲 换一个 ω</button>
        <span className="muted" style={{ fontSize: 13 }}>种子 {seed}</span>
      </Row>
      <div style={{ margin: "8px 0", lineHeight: 2 }}>
        <div><TxI>{R`$\omega=${formTex(data.w, r)}$`}</TxI></div>
        <div><TxI>{R`$\dd\omega=${formTex(data.dw, r + 1)}$`}</TxI> <span className="muted">（对应{name}，例 5.10）</span></div>
        <div><TxI>{R`$\dd(\dd\omega)=${data.ddw.size ? formTex(data.ddw, r + 2) : "0"}$`}</TxI></div>
      </div>
      {data.pairs.length > 0 && <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th><TxI>{R`$\dd^2\omega$ 中的基`}</TxI></th><th>来自分量</th><th><TxI>{R`先 $\partial_a$ 后 $\partial_b$`}</TxI></th><th><TxI>{R`先 $\partial_b$ 后 $\partial_a$`}</TxI></th><th>和</th></tr></thead>
        <tbody>{data.pairs.map((p, i) => <tr key={i}>
          <td><M>{tgtTex(p.target)}</M></td>
          <td><M>{p.I.length ? `\\omega_{${p.I.map(j => VARS[j]).join("")}}` : "f"}</M></td>
          <td><M>{`${p.t1 > 0 ? "+" : "-"}\\partial_${VARS[p.b]}\\partial_${VARS[p.a]}(\\cdot)=${p.t1 > 0 ? "" : "-"}(${P.tex(p.q)})`}</M></td>
          <td><M>{`${p.t2 > 0 ? "+" : "-"}\\partial_${VARS[p.a]}\\partial_${VARS[p.b]}(\\cdot)=${p.t2 > 0 ? "" : "-"}(${P.tex(p.q)})`}</M></td>
          <td>{p.sum.size === 0 ? "0 ✔" : "不为 0 ✘"}</td>
        </tr>)}</tbody>
      </table></div>}
      {data.formula && <div style={{ margin: "8px 0" }}>
        <p><b>无坐标公式核对</b> <TxI>{r === 0 ? R`（$r=0$：$\dd f(X)=X[f]$）` : r === 1 ? R`（\eqref{5.70}）` : R`（\eqref{5.71}，$r=2$）`}</TxI>：随机线性向量场</p>
        {data.formula.Xs.map((X, i) => <div key={i}><TxI>{R`$X_{${i + 1}}=(${X.map(P.tex).join(",\\ ")})$`}</TxI></div>)}
        <div style={{ overflowX: "auto" }}><TxI>{R`$\dd\omega(X_1,\ldots)=${P.tex(data.formula.lhs)}$`}</TxI></div>
      </div>}
      {stokes && <div style={{ margin: "8px 0" }}>
        <p><b>Stokes 定理</b>：<TxI>{stokes.where}</TxI></p>
        {r === 1 && <Slider label={R`正方形所在高度 $z$`} value={z0} min={-1} max={1} step={0.05} onChange={setZ0} fmt={v => v.toFixed(2)} />}
        <p><TxI>{R`$${stokes.lt}=${stokes.lhs.toFixed(10)}$，$${stokes.rt}=${stokes.rhs.toFixed(10)}$`}</TxI></p>
      </div>}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={ddZero} label={data.pairs.length ? R`$\dd^2\omega=0$（所有 ${data.pairs.length} 对逐项相消）` : R`$\dd^2\omega=0$（$\R^3$ 中没有 4 形式）`} />
        {data.formula && <Check ok={data.formula.ok} label={R`无坐标公式两边作为多项式完全相同`} />}
        {stokes && <Check ok={Math.abs(stokes.lhs - stokes.rhs) < 1e-8 * Math.max(1, Math.abs(stokes.rhs))} label={R`Stokes：两边相差 ${Math.abs(stokes.lhs - stokes.rhs).toExponential(1)}`} />}
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`说明：多项式次数不超过 3，Simpson 法对三次多项式精确，所以 Stokes 两边应在舍入误差内相等。二形式按例 5.10 的基 $\dd y\wedge\dd z,\ \dd z\wedge\dd x,\ \dd x\wedge\dd y$ 显示，内部用升序基计算（$\dd z\wedge\dd x=-\dd x\wedge\dd z$）。`}</TxI></p>
    </RunCard>);
}
