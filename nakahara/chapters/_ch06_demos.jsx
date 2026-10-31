// 第 6 章交互图（数值核心在 _ch06_num.js，已在 node 中逐项核对）：
//  1. StokesLab   —— 平面区域（圆盘 / 椭圆 / 圆环 / 正方形）上 ∮_∂D ω 与 ∫∫_D dω 的对照（式 6.8）；含 dθ 的奇点情形
//  2. WindingLab  —— 拖动闭曲线：∮ dθ / 2π 与卷绕数（独立的射线穿越算法）对照；同调类相同的形式周期相同；非闭形式依赖形状（式 6.17、6.21）
//  3. PoincareLab —— 同伦算子 φ = −P F^*ω（沿径向线段的线积分）在星形区域上构造原函数，并验证 dφ = ω、同伦公式 (6.31)
//  4. KunnethLab  —— 两个因子的 Betti 数卷积（式 6.45）、Poincaré 对偶与 χ 乘法；乘积的阶梯三角剖分交给第 3 章的整数同调算法独立核对
import { useMemo, useRef, useState } from "react";
import { TxI, RunCard, Check, Slider, Seg } from "@kit";
import * as N from "./_ch06_num.js";

const R = String.raw;
const INK = "#1f1b16", BLUE = "#2c4a6e", RED = "#9b2c1f", GOLD = "#b8862b", GREEN = "#2c6e49", MUTED = "#8a8070";
const Row = ({ children, gap = 16 }) => <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>{children}</div>;
const fmt = (v, d = 6) => (Math.abs(v) < 1e-12 ? "0" : (+v.toFixed(d)).toString());
const sci = v => (Math.abs(v) < 1e-300 ? "0" : v.toExponential(1).replace(/e([+-])(\d+)/, (_, s, e) => R`\times10^{${s === "-" ? "-" : ""}${e}}`));
const r2 = (x, y) => x * x + y * y;

// 世界坐标 ↔ SVG 坐标（正方形视窗 [-L,L]²）
function useView(L, W) {
  const s = W / (2 * L);
  return { s, X: x => W / 2 + x * s, Y: y => W / 2 - y * s, inv: (px, py) => [(px - W / 2) / s, (W / 2 - py) / s] };
}
function svgPoint(svg, e) {
  const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
  const q = pt.matrixTransform(svg.getScreenCTM().inverse()); return [q.x, q.y];
}
function Axes({ v, L, W }) {
  return <g stroke="#e4ddcc" strokeWidth="1">
    {[-2, -1, 1, 2].filter(k => Math.abs(k) < L).map(k => <g key={k}><line x1={v.X(k)} y1={0} x2={v.X(k)} y2={W} /><line x1={0} y1={v.Y(k)} x2={W} y2={v.Y(k)} /></g>)}
    <line x1={0} y1={v.Y(0)} x2={W} y2={v.Y(0)} stroke="#c9bfa8" /><line x1={v.X(0)} y1={0} x2={v.X(0)} y2={W} stroke="#c9bfa8" />
  </g>;
}
function ArrowHead({ x, y, dx, dy, color, s = 7 }) {
  const L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
  return <path d={`M${x + ux * s},${y + uy * s} L${x - ux * s - uy * s * 0.6},${y - uy * s + ux * s * 0.6} L${x - ux * s + uy * s * 0.6},${y - uy * s - ux * s * 0.6} Z`} fill={color} />;
}

// ============================================================
// 1. Stokes 定理实验室
// ============================================================
const FORMS_S = {
  rot: { tex: R`\omega=-y\,\dd x+x\,\dd y`, dtex: R`\dd\omega=2\,\dd x\wedge\dd y`, P: (x, y) => -y, Q: x => x, h: () => 2 },
  poly: { tex: R`\omega=xy^2\,\dd x+x^3\,\dd y`, dtex: R`\dd\omega=(3x^2-2xy)\,\dd x\wedge\dd y`, P: (x, y) => x * y * y, Q: x => x ** 3, h: (x, y) => 3 * x * x - 2 * x * y },
  exp: { tex: R`\omega=e^x\sin y\,\dd x+x^2\cos y\,\dd y`, dtex: R`\dd\omega=(2x-e^x)\cos y\,\dd x\wedge\dd y`, P: (x, y) => Math.exp(x) * Math.sin(y), Q: (x, y) => x * x * Math.cos(y), h: (x, y) => (2 * x - Math.exp(x)) * Math.cos(y) },
  dth: { tex: R`\omega=\dfrac{-y\,\dd x+x\,\dd y}{x^2+y^2}`, dtex: R`\dd\omega=0\ \ (\text{原点之外})`, P: (x, y) => -y / r2(x, y), Q: (x, y) => x / r2(x, y), h: () => 0, sing: true },
};
export function StokesLab() {
  const [form, setForm] = useState("poly"), [kind, setKind] = useState("disk");
  const [cx, setCx] = useState(0.4), [cy, setCy] = useState(-0.3), [Rr, setR] = useState(1.3);
  const F = FORMS_S[form], D = { kind, cx, cy, R: Rr };
  const res = useMemo(() => {
    const line = N.boundaryIntegral(D, F.P, F.Q), area = N.areaIntegral(D, F.h);
    const hit = F.sing && N.inside(D, 0, 0);
    const holeHas = F.sing && kind === "annulus" && Math.hypot(cx, cy) < 0.45 * Rr;
    return { line, area, hit, holeHas };
  }, [form, kind, cx, cy, Rr]);
  const L = 3, W = 340, v = useView(L, W);
  const curves = N.boundaryCurves(D);
  const arrows = [];
  for (let i = -5; i <= 5; i++) for (let j = -5; j <= 5; j++) {
    const x = i * 0.55, y = j * 0.55; if (F.sing && r2(x, y) < 0.09) continue;
    const p = F.P(x, y), q = F.Q(x, y), m = Math.hypot(p, q); if (!Number.isFinite(m) || m < 1e-9) continue;
    const len = 9 * Math.min(1, Math.sqrt(m) / 1.5) + 3;
    arrows.push({ x: v.X(x), y: v.Y(y), dx: p / m * len, dy: -q / m * len });
  }
  const ok = Math.abs(res.line - res.area) < 1e-8 * Math.max(1, Math.abs(res.line));
  return (
    <RunCard title={R`交互图 1：Stokes 定理 $\int_D\dd\omega=\oint_{\partial D}\omega$ 的数值验证`}
      lead={R`选一个一形式 $\omega=P\,\dd x+Q\,\dd y$ 与一块区域 $D$，拖动滑块移动、缩放区域。左边的线积分沿 $\partial D$（外边界逆时针、圆环的内边界顺时针——这就是第 3 章的"诱导定向"）用分段 Gauss–Legendre 求积；右边的面积分 $\int_D(\partial_xQ-\partial_yP)\,\dd x\,\dd y$ 用极坐标/张量积求积，两者完全独立地计算。最后一个选项是习题 6.3 的 $\dd\theta$：当原点落入 $D$ 时，$\omega$ 在 $D$ 内不光滑，Stokes 定理不再适用。`}>
      <Row>
        <svg viewBox={`0 0 ${W} ${W}`} style={{ width: 340, maxWidth: "100%", background: "#fffdf8", border: "1px solid #e4ddcc", borderRadius: 6 }}>
          <Axes v={v} L={L} W={W} />
          {kind === "annulus"
            ? <path fillRule="evenodd" fill="rgba(44,74,110,0.13)" d={curves.map(c => Array.from({ length: 121 }, (_, k) => { const [x, y] = c.g(k / 120); return `${k ? "L" : "M"}${v.X(x)},${v.Y(y)}`; }).join("") + "Z").join("")} />
            : <path fill="rgba(44,74,110,0.13)" d={curves.map((c, ci) => Array.from({ length: 41 }, (_, k) => { const [x, y] = c.g(k / 40); return `${k || ci ? "L" : "M"}${v.X(x)},${v.Y(y)}`; }).join("")).join("") + "Z"} />}
          {arrows.map((a, i) => <g key={i} opacity="0.55"><line x1={a.x - a.dx / 2} y1={a.y - a.dy / 2} x2={a.x + a.dx / 2} y2={a.y + a.dy / 2} stroke={MUTED} strokeWidth="1.2" /><ArrowHead x={a.x + a.dx / 2} y={a.y + a.dy / 2} dx={a.dx} dy={a.dy} color={MUTED} s={3} /></g>)}
          {curves.map((c, ci) => <g key={ci}>
            <path fill="none" stroke={BLUE} strokeWidth="2.2" d={Array.from({ length: 121 }, (_, k) => { const [x, y] = c.g(k / 120); return `${k ? "L" : "M"}${v.X(x)},${v.Y(y)}`; }).join("")} />
            {[0.13, 0.63].map(t => { const [x, y] = c.g(t), [u, w] = c.dg(t); return <ArrowHead key={t} x={v.X(x)} y={v.Y(y)} dx={u} dy={-w} color={BLUE} s={7} />; })}
          </g>)}
          {F.sing && <circle cx={v.X(0)} cy={v.Y(0)} r="4" fill={RED} />}
        </svg>
        <div style={{ flex: "1 1 300px", minWidth: 280 }}>
          <Seg options={Object.entries(FORMS_S).map(([k, f]) => [k, `$\\nosym{${f.tex}}$`])} value={form} onChange={setForm} />
          <p style={{ margin: "6px 0" }}><TxI>{R`$${F.dtex}$`}</TxI></p>
          <Seg options={[["disk", "圆盘"], ["ellipse", "椭圆"], ["annulus", "圆环"], ["square", "正方形"]]} value={kind} onChange={setKind} />
          <Slider label="中心 $x$" value={cx} min={-1.5} max={1.5} step={0.05} onChange={setCx} fmt={x => x.toFixed(2)} />
          <Slider label="中心 $y$" value={cy} min={-1.5} max={1.5} step={0.05} onChange={setCy} fmt={x => x.toFixed(2)} />
          <Slider label="尺度 $R$" value={Rr} min={0.4} max={1.5} step={0.05} onChange={setR} fmt={x => x.toFixed(2)} />
          <table className="tb-table" style={{ marginTop: 8 }}><tbody>
            <tr><td><TxI>{R`$\oint_{\partial D}\omega$`}</TxI></td><td><b>{fmt(res.line, 10)}</b></td></tr>
            <tr><td><TxI>{R`$\int_D\dd\omega$`}</TxI></td><td><b>{fmt(res.area, 10)}</b></td></tr>
            {!res.hit && <tr><td>差</td><td><TxI>{`$${sci(Math.abs(res.line - res.area))}$`}</TxI></td></tr>}
          </tbody></table>
          {!res.hit && <Check ok={ok} label={R`Stokes 定理：两边相等（相对误差 $<10^{-8}$）`} />}
          {res.hit && <p style={{ color: RED }}><TxI>{R`原点（红点）在 $D$ 内：$\oint_{\partial D}\omega=${fmt(res.line, 6)}\approx2\pi\times${Math.round(res.line / (2 * Math.PI))}$，而 $\dd\omega$ 在原点之外处处为 $0$。矛盾吗？不——$\omega$ 在原点没有定义，$D$ 不是 $\omega$ 的定义域 $\mathbb{R}^2-\{0\}$ 中的链，Stokes 定理的前提不成立。正是这个"$2\pi$"说明 $\omega$ 不是恰当形式（习题 6.3）。`}</TxI></p>}
          {F.sing && kind === "annulus" && !res.hit && <p className="muted"><TxI>{res.holeHas ? R`原点在圆环的洞里：外圈贡献 $+2\pi$，内圈（顺时针）贡献 $-2\pi$，合计 $0=\int_D\dd\omega$。两条圆周是**同调**的闭链（差一个边缘 $\partial D$），所以闭形式在它们上的周期相同——这正是 \eqref{6.21} 良定义的原因。` : R`原点不在区域内：$\omega$ 在 $D$ 附近光滑，两边都是 $0$。`}</TxI></p>}
        </div>
      </Row>
    </RunCard>);
}

// ============================================================
// 2. 卷绕数实验室：∮ dθ = 2π × 卷绕数
// ============================================================
const circPts = (cx, cy, r, n = 6, dir = 1, ph = 0.3) => Array.from({ length: n }, (_, k) => [cx + r * Math.cos(ph + dir * 2 * Math.PI * k / n), cy + r * Math.sin(ph + dir * 2 * Math.PI * k / n)]);
const PRESETS = {
  one: { label: "绕一圈", pts: circPts(0, 0, 1.6) },
  none: { label: "不绕原点", pts: circPts(1.5, 1.1, 0.9) },
  rev: { label: "顺时针", pts: circPts(0, 0, 1.6, 6, -1) },
  two: { label: "绕两圈", pts: Array.from({ length: 12 }, (_, k) => { const a = 4 * Math.PI * k / 12 + 0.2, r = 1.0 + 1.3 * k / 12; return [r * Math.cos(a), r * Math.sin(a)]; }) },
  eight: { label: "8 字形", pts: [[1.2, 0], [0.4, 1.0], [-0.6, 0.6], [-0.9, 0], [-1.6, -0.9], [-2.4, 0], [-1.6, 0.9], [-0.9, 0], [-0.6, -0.6], [0.4, -1.0]] },
};
const FORMS_W = {
  dth: { tex: R`\dd\theta=\dfrac{-y\,\dd x+x\,\dd y}{x^2+y^2}` },
  coh: { tex: R`\dd\theta+\dd(x^2y-0.3y^3)` },
  xdy: { tex: R`x\,\dd y\ \ (\text{不闭})` },
};
export function WindingLab() {
  const [P, setP] = useState(PRESETS.one.pts), [form, setForm] = useState("dth"), [drag, setDrag] = useState(-1);
  const svg = useRef(null);
  const L = 3, W = 360, v = useView(L, W);
  const res = useMemo(() => {
    const pts = N.closedSpline(P, 40);
    const ang = N.angleIntegral(pts), w = N.windingNumber(pts);
    const exactPart = N.lineIntegral(pts, (x, y) => 2 * x * y, (x, y) => x * x - 0.9 * y * y);
    const xdy = N.lineIntegral(pts, () => 0, x => x);
    // 卷绕数加权面积 ∫∫ w(x,y) dx dy（网格计数；与 ∮ x dy 独立）——同时用于着色
    const G = 60, hcell = 2 * L / G, cells = [];
    let wa = 0;
    for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) {
      const x = -L + (i + 0.5) * hcell, y = -L + (j + 0.5) * hcell, k = N.windingNumber(pts, [x, y]);
      if (k) { cells.push([i, j, k]); wa += k * hcell * hcell; }
    }
    const val = form === "dth" ? ang : form === "coh" ? ang + exactPart : xdy;
    return { pts, ang, w, exactPart, xdy, wa, cells, hcell, val };
  }, [P, form]);
  const onMove = e => { if (drag < 0) return; const [px, py] = svgPoint(svg.current, e), [x, y] = v.inv(px, py); const Q = P.slice(); Q[drag] = [Math.max(-L + 0.1, Math.min(L - 0.1, x)), Math.max(-L + 0.1, Math.min(L - 0.1, y))]; setP(Q); };
  const d = res.pts.map((p, i) => `${i ? "L" : "M"}${v.X(p[0]).toFixed(1)},${v.Y(p[1]).toFixed(1)}`).join("") + "Z";
  const colorOf = k => (k > 0 ? `rgba(44,110,73,${Math.min(0.45, 0.16 * k)})` : `rgba(155,44,31,${Math.min(0.45, -0.16 * k)})`);
  const per = res.val / (2 * Math.PI);
  return (
    <RunCard title={R`交互图 2：$\oint\dd\theta=2\pi\times$卷绕数——$H^1(\mathbb{R}^2-\{0\})\cong\mathbb{R}$`}
      lead={R`拖动金色圆点改变闭曲线（闭合 Catmull–Rom 样条，相邻控制点之间取 40 段折线）。$\oint\dd\theta$ 按"每段直线对原点张开的有向角"逐段精确求和；卷绕数用**独立**的射线穿越计数算出；着色表示每个区域被曲线绕的圈数（绿正红负）。换成上同调类相同的 $\dd\theta+\dd F$，周期一点不变；换成不闭的 $x\,\dd y$，积分随形状连续变化（等于卷绕数加权的面积）。`}>
      <Row>
        <svg ref={svg} viewBox={`0 0 ${W} ${W}`} style={{ width: 360, maxWidth: "100%", background: "#fffdf8", border: "1px solid #e4ddcc", borderRadius: 6, touchAction: "none", cursor: drag >= 0 ? "grabbing" : "default" }}
          onPointerMove={onMove} onPointerUp={() => setDrag(-1)} onPointerLeave={() => setDrag(-1)}>
          <Axes v={v} L={L} W={W} />
          {res.cells.map(([i, j, k]) => <rect key={i * 100 + j} x={v.X(-L + i * res.hcell)} y={v.Y(-L + (j + 1) * res.hcell)} width={res.hcell * v.s + 0.5} height={res.hcell * v.s + 0.5} fill={colorOf(k)} />)}
          <path d={d} fill="none" stroke={BLUE} strokeWidth="2.2" />
          {[0.1, 0.35, 0.6, 0.85].map(f => { const i = Math.floor(f * res.pts.length), a = res.pts[i], b = res.pts[(i + 1) % res.pts.length]; return <ArrowHead key={f} x={v.X(a[0])} y={v.Y(a[1])} dx={b[0] - a[0]} dy={-(b[1] - a[1])} color={BLUE} />; })}
          <circle cx={v.X(0)} cy={v.Y(0)} r="5" fill="#fff" stroke={RED} strokeWidth="2.5" />
          <text x={v.X(0) + 8} y={v.Y(0) - 8} fontSize="12" fill={RED}>0（挖去）</text>
          {P.map((p, i) => <circle key={i} cx={v.X(p[0])} cy={v.Y(p[1])} r="7" fill={GOLD} stroke="#fff" strokeWidth="1.5" style={{ cursor: "grab" }}
            onPointerDown={e => { e.currentTarget.ownerSVGElement.setPointerCapture?.(e.pointerId); setDrag(i); }} />)}
        </svg>
        <div style={{ flex: "1 1 280px", minWidth: 260 }}>
          <div style={{ marginBottom: 6 }}>{Object.entries(PRESETS).map(([k, p]) => <button key={k} style={{ marginRight: 6, marginBottom: 4, cursor: "pointer" }} onClick={() => setP(p.pts)}>{p.label}</button>)}</div>
          <Seg options={Object.entries(FORMS_W).map(([k, f]) => [k, `$\\nosym{${f.tex}}$`])} value={form} onChange={setForm} />
          <table className="tb-table" style={{ marginTop: 8 }}><tbody>
            <tr><td><TxI>{R`$\oint_C\omega$`}</TxI></td><td><b>{fmt(res.val, 8)}</b></td></tr>
            <tr><td><TxI>{R`$\oint_C\omega/2\pi$`}</TxI></td><td><b>{fmt(per, 8)}</b></td></tr>
            <tr><td>卷绕数 <TxI>{R`$w$`}</TxI>（射线穿越）</td><td><b>{res.w}</b></td></tr>
            {form === "coh" && <tr><td><TxI>{R`其中 $\oint\dd F$`}</TxI></td><td><TxI>{`$${sci(Math.abs(res.exactPart))}$`}</TxI></td></tr>}
            {form === "xdy" && <tr><td><TxI>{R`$\int\!\!\int w\,\dd x\,\dd y$（网格）`}</TxI></td><td>{fmt(res.wa, 4)}</td></tr>}
          </tbody></table>
          {form !== "xdy"
            ? <Check ok={Math.abs(per - res.w) < 1e-9} label={R`$\oint\omega=2\pi w$（误差 $<10^{-9}$）`} />
            : <Check ok={Math.abs(res.xdy - res.wa) < 0.03 * Math.max(1, Math.abs(res.xdy)) + 0.08} label={R`$\oint x\,\dd y=\int\!\!\int w\,\dd x\,\dd y$（Stokes，网格精度约 1%）`} />}
          <p className="muted" style={{ marginTop: 8 }}><TxI>{form === "xdy"
            ? R`$\dd(x\,\dd y)=\dd x\wedge\dd y\neq0$：$x\,\dd y$ 不是闭形式，它的"周期"随曲线形状连续变化，不是拓扑量，不定义上同调类。`
            : R`无论怎样拖动（只要不越过原点），读数都锁定在整数上：$\oint\omega$ 只依赖闭链的**同调类** $[C]=w[S^1]\in H_1$ 与形式的**上同调类** $[\omega]$。$\Lambda([C],[\dd\theta])=2\pi w$——de Rham 配对 \eqref{6.21} 的一个具体实例。`}</TxI></p>
        </div>
      </Row>
    </RunCard>);
}

// ============================================================
// 3. Poincaré 引理：同伦算子构造原函数
// ============================================================
const FORMS_P = {
  A: { tex: R`\omega=2xy\,\dd x+(x^2+\cos y)\,\dd y`, P: (x, y) => 2 * x * y, Q: (x, y) => x * x + Math.cos(y), h: () => 0, Phi: (x, y) => x * x * y + Math.sin(y), Phitex: R`x^2y+\sin y` },
  B: { tex: R`\omega=e^x\cos y\,\dd x-e^x\sin y\,\dd y`, P: (x, y) => Math.exp(x) * Math.cos(y), Q: (x, y) => -Math.exp(x) * Math.sin(y), h: () => 0, Phi: (x, y) => Math.exp(x) * Math.cos(y), Phitex: R`e^x\cos y` },
  C: { tex: R`\omega=-y\,\dd x+x\,\dd y\ \ (\text{不闭})`, P: (x, y) => -y, Q: x => x, h: () => 2 },
  D: { tex: R`\omega=\dd\theta\ \ (\text{去掉一条射线})`, P: (x, y) => -y / r2(x, y), Q: (x, y) => x / r2(x, y), h: () => 0, sing: true },
};
export function PoincareLab() {
  const [form, setForm] = useState("A"), [px, setPx] = useState(0.6), [py, setPy] = useState(-0.4), [hover, setHover] = useState(null);
  const svg = useRef(null);
  const F = FORMS_P[form], p0 = [px, py];
  const L = 2.5, W = 360, v = useView(L, W), G = 48, hc = 2 * L / G;
  const res = useMemo(() => {
    const m = F.sing ? 64 : 4;
    const phi = (x, y) => N.homotopyPotential(F.P, F.Q, p0, x, y, m);
    // 割线：从原点出发、背离 p0 的射线（D 在它之外是关于 p0 的星形区域）
    const nearCut = (x, y) => { if (!F.sing) return false; const a = Math.atan2(y, x) - Math.atan2(-py, -px); const da = Math.abs(Math.atan2(Math.sin(a), Math.cos(a))); return da < 0.06 || r2(x, y) < 0.02; };
    const grid = []; let lo = Infinity, hi = -Infinity;
    for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) {
      const x = -L + (i + 0.5) * hc, y = -L + (j + 0.5) * hc;
      const f = nearCut(x, y) ? NaN : phi(x, y); grid.push(f);
      if (Number.isFinite(f)) { lo = Math.min(lo, f); hi = Math.max(hi, f); }
    }
    // 检查 1：dφ 与 ω（中心差分），在 9×9 个样点上；对不闭的形式还核对 ω − dφ = −P F^*(dω)
    let errD = 0, errH = 0, errRes = 0, maxRes = 0; const eps = 1e-4;
    for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) {
      const x = -2 + i * 0.5 + 0.13, y = -2 + j * 0.5 + 0.07; if (nearCut(x, y) || (F.sing && r2(x, y) < 0.1)) continue;
      const gx = (phi(x + eps, y) - phi(x - eps, y)) / (2 * eps), gy = (phi(x, y + eps) - phi(x, y - eps)) / (2 * eps);
      const rx = F.P(x, y) - gx, ry = F.Q(x, y) - gy;
      if (form === "C") { const [kx, ky] = N.homotopyOfTwoForm(F.h, p0, x, y); errRes = Math.max(errRes, Math.abs(rx - kx), Math.abs(ry - ky)); maxRes = Math.max(maxRes, Math.hypot(rx, ry)); }
      else errD = Math.max(errD, Math.abs(rx), Math.abs(ry));
      if (F.Phi) errH = Math.max(errH, Math.abs(phi(x, y) - (F.Phi(x, y) - F.Phi(px, py))));
    }
    // 检查 2（dθ）：割线两侧的跳跃
    let jump = null;
    if (F.sing) {
      const a = Math.atan2(-py, -px), r = 1.5, da = 0.02;
      jump = phi(r * Math.cos(a - da), r * Math.sin(a - da)) - phi(r * Math.cos(a + da), r * Math.sin(a + da));
    }
    return { grid, lo, hi, errD, errH, errRes, maxRes, jump, phi };
  }, [form, px, py]);
  const col = f => {
    if (!Number.isFinite(f)) return "#ffffff";
    const t = (f - res.lo) / (res.hi - res.lo || 1);
    const a = [44, 74, 110], b = [250, 247, 240], c = [184, 134, 43];
    const mix = (u, w, s) => u.map((q, k) => Math.round(q + (w[k] - q) * s));
    const rgb = t < 0.5 ? mix(a, b, t * 2) : mix(b, c, (t - 0.5) * 2);
    return `rgb(${rgb.join(",")})`;
  };
  const onMove = e => { const [sx, sy] = svgPoint(svg.current, e); setHover(v.inv(sx, sy)); };
  const hv = hover && res.phi(hover[0], hover[1]);
  const okSing = res.jump != null && Math.abs(Math.abs(res.jump) - (2 * Math.PI - 0.04)) < 1e-4;
  const a0 = Math.atan2(-py, -px);
  return (
    <RunCard title={R`交互图 3：Poincaré 引理——同伦算子 $\varphi=-PF^*\omega$ 构造原函数`}
      lead={R`收缩取 $F(x,t)=p_0+(1-t)(x-p_0)$。代入 \eqref{6.29}，$\varphi(x)=-PF^*\omega=\int_0^1\omega_i(p_0+uX)\,X^i\,\dd u$（$X=x-p_0$），即**沿从 $p_0$ 到 $x$ 的直线段的线积分**（悬停可看到这条线段）。热图是 $\varphi$；拖动滑块移动收缩中心 $p_0$（金点）。程序在 81 个样点上用中心差分核对 $\dd\varphi=\omega$；对不闭的形式则核对同伦公式 \eqref{6.31} 的完整形式 $\omega-\dd\varphi=-PF^*(\dd\omega)$。`}>
      <Row>
        <svg ref={svg} viewBox={`0 0 ${W} ${W}`} style={{ width: 360, maxWidth: "100%", border: "1px solid #e4ddcc", borderRadius: 6 }} onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
          {res.grid.map((f, k) => { const i = Math.floor(k / G), j = k % G; return <rect key={k} x={v.X(-L + i * hc)} y={v.Y(-L + (j + 1) * hc)} width={hc * v.s + 0.6} height={hc * v.s + 0.6} fill={col(f)} />; })}
          <Axes v={v} L={L} W={W} />
          {F.sing && <line x1={v.X(0)} y1={v.Y(0)} x2={v.X(4 * Math.cos(a0))} y2={v.Y(4 * Math.sin(a0))} stroke={RED} strokeWidth="3" strokeDasharray="6 4" />}
          {F.sing && <circle cx={v.X(0)} cy={v.Y(0)} r="5" fill="#fff" stroke={RED} strokeWidth="2.5" />}
          {hover && <g><line x1={v.X(px)} y1={v.Y(py)} x2={v.X(hover[0])} y2={v.Y(hover[1])} stroke={INK} strokeWidth="1.8" /><circle cx={v.X(hover[0])} cy={v.Y(hover[1])} r="3.5" fill={INK} /></g>}
          <circle cx={v.X(px)} cy={v.Y(py)} r="7" fill={GOLD} stroke="#fff" strokeWidth="2" />
          <text x={v.X(px) + 9} y={v.Y(py) + 4} fontSize="13" fontStyle="italic" fill={INK}>p₀</text>
        </svg>
        <div style={{ flex: "1 1 280px", minWidth: 260 }}>
          <Seg options={Object.entries(FORMS_P).map(([k, f]) => [k, `$\\nosym{${f.tex}}$`])} value={form} onChange={setForm} />
          <Slider label="$p_0$ 的 $x$" value={px} min={-1.5} max={1.5} step={0.05} onChange={setPx} fmt={x => x.toFixed(2)} />
          <Slider label="$p_0$ 的 $y$" value={py} min={-1.5} max={1.5} step={0.05} onChange={setPy} fmt={x => x.toFixed(2)} />
          {hover && <p><TxI>{R`悬停点 $x=(${hover[0].toFixed(2)},${hover[1].toFixed(2)})$：$\varphi(x)=${Number.isFinite(hv) ? hv.toFixed(5) : "—"}$`}</TxI></p>}
          {(form === "A" || form === "B") && <>
            <Check ok={res.errH < 1e-9} label={R`$\varphi=\Phi-\Phi(p_0)$，$\Phi=${F.Phitex}$（最大误差 $${sci(res.errH)}$）`} />
            <Check ok={res.errD < 1e-6} label={R`$\dd\varphi=\omega$（中心差分，最大偏差 $${sci(res.errD)}$）`} />
          </>}
          {form === "C" && <>
            <Check ok={res.maxRes > 0.1} label={R`$\dd\varphi\neq\omega$（$|\omega-\dd\varphi|$ 最大 $${res.maxRes.toFixed(3)}$）`} />
            <Check ok={res.errRes < 1e-6} label={R`同伦公式：$\omega-\dd\varphi=-PF^*(\dd\omega)$（偏差 $${sci(res.errRes)}$）`} />
            <p className="muted"><TxI>{R`$\dd\omega=2\,\dd x\wedge\dd y\neq0$，于是 \eqref{6.31} 中的 $P\,\dd\eta$ 项不再消失：$\omega=\dd\varphi+k\,(X^1\dd y-X^2\dd x)$，$k=\int_0^1u\,h(p_0+uX)\,\dd u=1$。闭性正是 Poincaré 引理不可缺少的前提。`}</TxI></p>
          </>}
          {form === "D" && r2(px, py) < 0.04 && <p style={{ color: RED }}><TxI>{R`$p_0$ 太靠近被挖去的原点：从 $p_0$ 出发的线段会穿过奇点，区域不再关于 $p_0$ 星形。请把 $p_0$ 移开。`}</TxI></p>}
          {form === "D" && r2(px, py) >= 0.04 && <>
            <Check ok={res.errD < 1e-5} label={R`割线之外 $\dd\varphi=\omega$（最大偏差 $${sci(res.errD)}$）`} />
            <Check ok={okSing} label={R`割线两侧（相隔 $2\delta=0.04$ rad）的 $\varphi$ 相差 $${res.jump != null ? Math.abs(res.jump).toFixed(5) : ""}=2\pi-2\delta$：跳变 $2\pi$`} />
            <p className="muted"><TxI>{R`去掉从原点出发、背离 $p_0$ 的射线（红虚线）后，区域关于 $p_0$ 是**星形**的，Poincaré 引理给出原函数 $\varphi=\theta-\theta(p_0)$。但 $\varphi$ 无法连续地延拓到整个 $\mathbb{R}^2-\{0\}$：跨过割线差 $2\pi$。这就是"局部恰当、整体不恰当"，$[\dd\theta]\neq0\in H^1(\mathbb{R}^2-\{0\})$。`}</TxI></p>
          </>}
        </div>
      </Row>
    </RunCard>);
}

// ============================================================
// 4. Künneth 公式实验室
// ============================================================
const fmtB = b => b.join(",\\ ");
export function KunnethLab() {
  const [a, setA] = useState("S2"), [b, setB] = useState("S1"), [tri, setTri] = useState(null);
  const A = N.FACTORS.find(f => f.id === a), B = N.FACTORS.find(f => f.id === b);
  const hA = useMemo(() => N.homologyOf(A.facets), [a]), hB = useMemo(() => N.homologyOf(B.facets), [b]);
  const bM = N.convolve(hA.betti, hB.betti), m = bM.length - 1;
  const dual = bM.every((x, r) => x === bM[m - r]);
  const chi = N.eulerChar(bM), size = N.productSize(A.facets, B.facets), can = size <= 200;
  const key = a + "|" + b;
  const run = () => {
    const n2 = Math.max(...B.facets.flat()) + 1, t = performance.now();
    const h = N.homologyOf(N.productFacets(A.facets, B.facets, n2));
    setTri({ key, ...h, ms: Math.round(performance.now() - t) });
  };
  const T = tri && tri.key === key ? tri : null;
  const tors = T ? T.torsion.map((t, r) => t.length ? R`H_{${r}}\supset${t.map(k => R`\mathbb{Z}_{${k}}`).join(R`\oplus`)}` : null).filter(Boolean) : [];
  const opts = N.FACTORS.map(f => [f.id, `$\\nosym{${f.tex}}$`]);
  return (
    <RunCard title={R`交互图 4：Künneth 公式 $b^r(M_1\times M_2)=\sum_{p+q=r}b^p(M_1)b^q(M_2)$`}
      lead={R`选两个因子。它们的 Betti 数由第 3 章的整数同调算法（Smith 标准形）从三角剖分算出；乘积的 Betti 数按 \eqref{6.45} 做"卷积"。然后程序检查 Poincaré 对偶 $b_r=b_{m-r}$ \eqref{6.37} 与 $\chi(M_1\times M_2)=\chi(M_1)\chi(M_2)$ \eqref{6.47}。点"三角剖分验证"会把乘积 $|K_1|\times|K_2|$ 用阶梯剖分真正三角化，再独立地算一遍同调——包括 de Rham 看不见的挠。`}>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 12px", alignItems: "center" }}>
        <TxI>{R`$M_1=$`}</TxI><Seg options={opts} value={a} onChange={setA} />
        <TxI>{R`$M_2=$`}</TxI><Seg options={opts} value={b} onChange={setB} />
      </div>
      <table className="tb-table" style={{ marginTop: 10 }}><tbody>
        <tr><td><TxI>{R`$b^r(M_1)$`}</TxI></td><td><TxI>{`$(${fmtB(hA.betti)})$，$\\chi=${hA.chi}$`}</TxI></td></tr>
        <tr><td><TxI>{R`$b^r(M_2)$`}</TxI></td><td><TxI>{`$(${fmtB(hB.betti)})$，$\\chi=${hB.chi}$`}</TxI></td></tr>
        <tr><td><TxI>{R`$b^r(M_1\times M_2)$（Künneth）`}</TxI></td><td><b><TxI>{`$(${fmtB(bM)})$，$\\chi=${chi}$`}</TxI></b></td></tr>
      </tbody></table>
      <Row gap={10}>
        <Check ok={chi === hA.chi * hB.chi} label={R`$\chi(M)=\chi(M_1)\chi(M_2)=${hA.chi}\times${hB.chi}$`} />
        <Check ok={dual} label={dual ? R`Poincaré 对偶 $b_r=b_{${m}-r}$ 成立` : R`$b_r\neq b_{${m}-r}$：Poincaré 对偶失效`} />
      </Row>
      {!dual && <p className="muted"><TxI>{R`失效是因为 ${A.orient ? "" : `$${A.tex}$ `}${B.orient ? "" : `$${B.tex}$ `}不可定向：\eqref{6.35} 的 $\int_M\omega\wedge\eta$ 需要 $M$ 可定向（见 \secref{6.4.1} 的提醒框）。`}</TxI></p>}
      <div style={{ marginTop: 8 }}>
        {can ? <button style={{ cursor: "pointer" }} onClick={run}>三角剖分验证（{size} 个 {m} 维单形）</button>
          : <span className="muted">乘积的阶梯剖分有 {size} 个顶维单形，超出浏览器内整数消元的合理规模，仅给出 Künneth 结果。</span>}
        {T && <div style={{ marginTop: 6 }}>
          <TxI>{`$K_1\\times K_2$：${T.nv} 个顶点，单形数 $(${T.counts.join(",")})$；整数同调给出 Betti 数 $(${fmtB(T.betti)})$${tors.length ? `，另有挠 $${tors.join(",\\ ")}$` : ""}（${T.ms} ms）`}</TxI>
          <div><Check ok={T.betti.join() === bM.join()} label="三角剖分的 Betti 数 = Künneth 结果" /> <Check ok={T.chi === chi} label={R`$\sum(-1)^rI_r=\chi$`} /></div>
          {tors.length > 0 && <p className="muted"><TxI>{R`挠部分只出现在整数同调里；实系数的 de Rham 上同调对它是盲的——这就是 \eqref{6.44} 能写成简单张量积的原因（整数系数的 Künneth 公式还需额外的 $\mathrm{Tor}$ 项）。`}</TxI></p>}
        </div>}
      </div>
    </RunCard>);
}
