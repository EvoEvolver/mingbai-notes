// 第 9 章交互图（全部在浏览器内真算）：
//  1. MobiusLab   —— 例 9.1：S¹ 上两张卡 U₁=(0,2π)、U₂=(−π,π)，在 B=(π,2π) 上 t₁₂=±1；沿底圆走一圈，看纤维坐标是否翻转
//  2. HopfLab     —— 例 9.9：Hopf 映射 S³→S²；在 S² 上选点，立体投影显示其纤维圆；数值核对 (9.53)、t_NS=e^{iφ}、卷绕数与 Gauss 环绕数
//  3. CocycleLab  —— 例 9.3：TS² 的三张球极卡（北、南、东），数值 Jacobi 矩阵作转移函数；核对 (9.23)、(9.6a–c)、(9.9)
import { useMemo, useRef, useState } from "react";
import { TxI, M, RunCard, Check, Slider, Seg } from "@kit";

const R = String.raw;
const INK = "#1f1b16", BLUE = "#2c4a6e", RED = "#9b2c1f", GOLD = "#b8862b", GREEN = "#2c6e49", GRAY = "#9a9083";
const TAU = 2 * Math.PI;
const Row = ({ children, gap = 16 }) => <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>{children}</div>;
const f4 = v => (Math.abs(v) < 5e-13 ? "0" : Math.abs(v) >= 1e4 || Math.abs(v) < 1e-3 ? v.toExponential(2) : v.toFixed(4));
const svgStyle = { maxWidth: "100%", background: "#fffdf8", border: "1px solid #e8e0d0", borderRadius: 6, touchAction: "none" };
function svgPoint(svg, e) { const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); }
const Lab = ({ x, y, children, color = INK, size = 13, anchor = "middle", italic = true }) => <text x={x} y={y} fontSize={size} fill={color} textAnchor={anchor} fontStyle={italic ? "italic" : "normal"}>{children}</text>;
const mod = (a, n) => ((a % n) + n) % n;
// 3D → 屏幕：绕 z 轴转 az，再俯视 el；返回 [sx, sy, 远近]
const view = (az, el, cx, cy, sc) => ([x, y, z]) => {
  const xr = x * Math.cos(az) - y * Math.sin(az), yr = x * Math.sin(az) + y * Math.cos(az);
  return [cx + sc * xr, cy - sc * (z * Math.cos(el) + yr * Math.sin(el)), yr * Math.cos(el) - z * Math.sin(el)];
};
const fmtC = (re, im) => `${f4(re)} ${im < 0 ? "−" : "+"} ${f4(Math.abs(im))}i`;

// ============================================================
// 1. 圆柱 vs Möbius 带（例 9.1）
// ============================================================
export function MobiusLab() {
  const [tw, setTw] = useState(-1);        // B 上的转移函数 t12 = tw（+1 圆柱，−1 Möbius 带）
  const [s, setS] = useState(0);           // 已走过的角度 0…2π
  const [t0, setT0] = useState(0.6);       // 起点（θ=π/2）的纤维坐标
  const [az, setAz] = useState(0.6);
  const Rr = 1.55, Wd = 0.5, el = 0.5;
  // 卡 1 的坐标 (θ∈[0,2π], t1) → R³
  const emb = (th, t1) => tw < 0
    ? [(Rr + Wd * t1 * Math.cos(th / 2)) * Math.cos(th), (Rr + Wd * t1 * Math.cos(th / 2)) * Math.sin(th), Wd * t1 * Math.sin(th / 2)]
    : [Rr * Math.cos(th), Rr * Math.sin(th), Wd * t1];
  const inA = th => th > 1e-9 && th < Math.PI - 1e-9, inB = th => th > Math.PI + 1e-9 && th < TAU - 1e-9;
  // 行者：θ = π/2 + s。s ≤ π 时用卡 1（t1 = t0 不变）；s > π 时已在 θ=3π/2∈B 处换到卡 2（t2 = t21·t1 = tw·t0 不变）
  const walker = ss => {
    const thU = Math.PI / 2 + ss, th = mod(thU, TAU), phase = ss <= Math.PI ? 1 : 2;
    let t1 = null, t2 = null;
    if (phase === 1) { t1 = t0; if (inA(th)) t2 = t1; else if (inB(th)) t2 = tw * t1; }
    else { t2 = tw * t0; if (inA(th)) t1 = t2; else if (inB(th)) t1 = tw * t2; }
    const pos = t1 !== null ? emb(th, t1) : emb(0, t2);       // θ=0 只在 U2 中（U2 里 θ'∈[0,π) 处 t1 = t2 的嵌入）
    return { th, phase, t1, t2, pos };
  };
  const w = walker(s);
  const P = view(az, el, 190, 150, 72);
  const quads = useMemo(() => {
    const out = [], nTh = 72, nT = 2;
    for (let i = 0; i < nTh; i++) for (let k = 0; k < nT; k++) {
      const a = TAU * i / nTh, b = TAU * (i + 1) / nTh, u = -1 + 2 * k / nT, v = -1 + 2 * (k + 1) / nT;
      const pts = [emb(a, u), emb(b, u), emb(b, v), emb(a, v)].map(P);
      const depth = pts.reduce((acc, p) => acc + p[2], 0) / 4;
      out.push({ pts, depth, region: (a + b) / 2 < Math.PI ? "A" : "B" });
    }
    return out.sort((p, q) => q.depth - p.depth);
  }, [tw, az]);   // eslint-disable-line
  const trail = useMemo(() => { const pts = []; for (let k = 0; k <= 160; k++) { const ss = s * k / 160; pts.push(P(walker(ss).pos)); } return pts; }, [s, t0, tw, az]);   // eslint-disable-line
  const fib = (th, tt = 1) => [P(emb(th, -tt)), P(emb(th, tt))];
  const wp = P(w.pos), [fa, fb] = fib(w.th);
  const t12 = inA(w.th) ? 1 : inB(w.th) ? tw : null;
  const ovOK = t12 === null || Math.abs(w.t1 - t12 * w.t2) < 1e-12;
  const done = s >= TAU - 1e-12, final = walker(TAU).t1;
  // 两张卡的坐标图
  const CW = 250, CH = 110, pad = 18;
  const chartPt = (lo, hi, th, t) => [pad + (th - lo) / (hi - lo) * (CW - 2 * pad), CH / 2 - t * (CH / 2 - 14)];
  const trail1 = [], trail2 = [];
  for (let k = 0; k <= 160; k++) {
    const q = walker(s * k / 160);
    trail1.push(q.t1 !== null ? chartPt(0, TAU, q.th, q.t1) : null);
    const th2 = q.th > Math.PI ? q.th - TAU : q.th;
    trail2.push(q.t2 !== null ? chartPt(-Math.PI, Math.PI, th2, q.t2) : null);
  }
  const poly = (arr, jump = 1e9) => { let d = "", pen = false, prev = null; for (const p of arr) { if (!p) { pen = false; continue; } if (prev && Math.abs(p[0] - prev[0]) > jump) pen = false; d += (pen ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1); pen = true; prev = p; } return d; };
  const ChartBox = ({ lo, hi, t, tr, other }) => {
    const reg = lo === 0 ? [[0, Math.PI, "A"], [Math.PI, TAU, "B"]] : [[-Math.PI, 0, "B"], [0, Math.PI, "A"]];
    const th = lo === 0 ? w.th : (w.th > Math.PI ? w.th - TAU : w.th);
    return <svg viewBox={`0 0 ${CW} ${CH + 26}`} width={CW} height={CH + 26} style={svgStyle}>
      {reg.map(([a, b, nm]) => { const x0 = chartPt(lo, hi, a, 0)[0], x1 = chartPt(lo, hi, b, 0)[0]; return <g key={nm}>
        <rect x={x0} y={14} width={x1 - x0} height={CH - 28} fill={nm === "A" ? "#dbe7f3" : tw < 0 ? "#f6dcc4" : "#e7efd9"} />
        <text x={(x0 + x1) / 2} y={CH - 2} fontSize="11" fill={GRAY} textAnchor="middle">{nm === "A" ? "A" : "B"}</text></g>; })}
      <line x1={pad} y1={CH / 2} x2={CW - pad} y2={CH / 2} stroke={GRAY} strokeDasharray="3 3" />
      <rect x={pad} y={14} width={CW - 2 * pad} height={CH - 28} fill="none" stroke={INK} />
      <path d={poly(tr, CW / 2)} fill="none" stroke={GOLD} strokeWidth="2" />
      {t !== null && <circle cx={chartPt(lo, hi, th, t)[0]} cy={chartPt(lo, hi, th, t)[1]} r="5" fill={RED} stroke="#fff" strokeWidth="1.5" />}
      <text x={pad} y={CH + 20} fontSize="11" fill={GRAY}>{lo === 0 ? "0" : "-pi"}</text>
      <text x={CW - pad} y={CH + 20} fontSize="11" fill={GRAY} textAnchor="end">{lo === 0 ? "2pi" : "pi"}</text>
      {t === null && <text x={CW / 2} y={CH / 2 - 4} fontSize="12" fill={RED} textAnchor="middle">{other}</text>}
    </svg>;
  };
  return (
    <RunCard title={R`交互图 1：圆柱与 Möbius 带——两张卡、一个转移函数`}
      lead={R`底圆 $S^1$ 用 $U_1=(0,2\pi)$、$U_2=(-\pi,\pi)$ 覆盖，交集为 $A=(0,\pi)$ 与 $B=(\pi,2\pi)$。$A$ 上 $t_{12}=+1$，$B$ 上 $t_{12}=\pm1$ 由你选择。从 $\theta=\pi/2$、纤维坐标 $t_0$ 出发，在每张卡里保持纤维坐标不变地前进：先用卡 1，到 $\theta=3\pi/2\in B$ 时按 $f_2=t_{21}f_1$ 换到卡 2，绕回 $A$ 后再读卡 1 的坐标。拖动"已走角度"看金色轨迹。`}>
      <Row>
        <div><TxI>{R`$B$ 上的转移函数：`}</TxI><Seg options={[[1, R`$t_{12}=+1$（圆柱）`], [-1, R`$t_{12}=-1$（Möbius 带）`]]} value={tw} onChange={setTw} /></div>
      </Row>
      <Row>
        <svg viewBox="0 0 380 300" width={380} height={300} style={svgStyle}>
          {quads.map((q, i) => <path key={i} d={"M" + q.pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join("L") + "Z"}
            fill={q.region === "A" ? "#dbe7f3" : tw < 0 ? "#f6dcc4" : "#e7efd9"} stroke="#b9ae9c" strokeWidth="0.4" fillOpacity="0.92" />)}
          {[0, Math.PI].map(th => { const [a, b] = fib(th); return <line key={th} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={th === 0 ? BLUE : GREEN} strokeWidth="2.2" strokeDasharray="5 3" />; })}
          {(() => { const a = P(emb(0, 1.25)), b = P(emb(Math.PI, 1.25)); return <><Lab x={a[0]} y={a[1] - 4} color={BLUE} size={11} italic={false}>θ=0：仅在 U2</Lab><Lab x={b[0]} y={b[1] - 4} color={GREEN} size={11} italic={false}>θ=π：仅在 U1</Lab></>; })()}
          <line x1={fa[0]} y1={fa[1]} x2={fb[0]} y2={fb[1]} stroke={INK} strokeWidth="2.5" />
          <path d={poly(trail)} fill="none" stroke={GOLD} strokeWidth="3" />
          <circle cx={wp[0]} cy={wp[1]} r="6" fill={RED} stroke="#fff" strokeWidth="2" />
          <text x={8} y={292} fontSize="11" fill={GRAY}>蓝底 = A 段；{tw < 0 ? "橙底" : "绿底"} = B 段；黑线 = 当前纤维</text>
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 14 }}><TxI>{R`卡 1：$(\theta,t_1)$，$\theta\in(0,2\pi)$`}</TxI></div>
          <ChartBox lo={0} hi={TAU} t={w.t1} tr={trail1} other={<>此点不在 U1 中</>} />
          <div style={{ fontSize: 14 }}><TxI>{R`卡 2：$(\theta',t_2)$，$\theta'\in(-\pi,\pi)$`}</TxI></div>
          <ChartBox lo={-Math.PI} hi={Math.PI} t={w.t2} tr={trail2} other={<>此点不在 U2 中</>} />
        </div>
      </Row>
      <Row gap={24}>
        <Slider label={R`已走角度 $s$（$\theta=\pi/2+s$）`} value={s} min={0} max={6.29} step={0.01} onChange={v => setS(v >= TAU - 0.006 ? TAU : v)} fmt={v => <M>{`${(v / Math.PI).toFixed(2)}\\pi`}</M>} />
        <Slider label={R`起点纤维坐标 $t_0$`} value={t0} min={-0.9} max={0.9} step={0.05} onChange={setT0} fmt={v => v.toFixed(2)} />
        <Slider label="视角" value={az} min={-3.1} max={3.1} step={0.02} onChange={setAz} fmt={v => v.toFixed(2)} />
      </Row>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th>量</th><th>数值</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td><TxI>{R`底空间的点 $\theta$`}</TxI></td><td><M>{`${(w.th / Math.PI).toFixed(3)}\\pi`}</M></td><td>{inA(w.th) ? "在交集 A 中（两张卡都可用）" : inB(w.th) ? "在交集 B 中（两张卡都可用）" : w.t1 === null ? "只在 U2 中" : "只在 U1 中"}</td></tr>
          <tr><td>当前使用的卡</td><td>{w.phase === 1 ? "卡 1" : "卡 2"}</td><td><TxI>{w.phase === 1 ? R`保持 $t_1=t_0$` : R`保持 $t_2=t_{21}t_0$`}</TxI></td></tr>
          <tr><td><TxI>{R`卡 1 坐标 $t_1$`}</TxI></td><td>{w.t1 === null ? "—" : f4(w.t1)}</td><td></td></tr>
          <tr><td><TxI>{R`卡 2 坐标 $t_2$`}</TxI></td><td>{w.t2 === null ? "—" : f4(w.t2)}</td><td></td></tr>
          <tr><td><TxI>{R`$t_{12}(\theta)$`}</TxI></td><td>{t12 === null ? "—（不在交集）" : t12 > 0 ? "+1" : "−1"}</td><td><TxI>{R`$f_1=t_{12}f_2$，\eqref{9.4}`}</TxI></td></tr>
          <tr><td><TxI>{R`走完一圈后的 $t_1$`}</TxI></td><td>{f4(final)}</td><td><TxI>{tw < 0 ? R`$=-t_0$：纤维翻转` : R`$=t_0$：回到原处`}</TxI></td></tr>
        </tbody>
      </table></div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={ovOK} label={R`交集上 $t_1=t_{12}\,t_2$`} />
        <Check ok={Math.abs(final - tw * t0) < 1e-12} label={R`绕一圈：$t_0\mapsto t_{12}(B)\,t_{12}(A)\,t_0=${tw < 0 ? "-" : "+"}t_0$`} />
        {done && <Check ok={true} label={tw < 0 ? "已走完一圈：Möbius 带上纤维翻转" : "已走完一圈：圆柱上纤维不翻转"} />}
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`试一试：在 Möbius 带上取 $t_0\neq0$，走完一圈得 $-t_0$。这说明"在每张卡里保持坐标不变"拼不成整体截面——任何连续截面 $s$ 在卡 1 里写成 $t_1(\theta)$，都满足 $t_1(2\pi^-)=-t_1(0^+)$，由介值定理必有零点。所以 Möbius 带没有处处非零的截面，从而不平凡（对照\sref{C9.2}，$k=1$ 时整体标架就是处处非零的截面）。圆柱上则 $t_1\equiv t_0$ 就是整体截面。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 2. Hopf 纤维化（例 9.9）
// ============================================================
// 纤维：z0 = cos(θ/2) e^{i(φ+λ)}，z1 = sin(θ/2) e^{iλ}，λ∈[0,2π)；满足 π(z0,z1) = ξ(θ,φ)
const lift = (th, ph, lam) => [Math.cos(th / 2) * Math.cos(ph + lam), Math.cos(th / 2) * Math.sin(ph + lam), Math.sin(th / 2) * Math.cos(lam), Math.sin(th / 2) * Math.sin(lam)];
const hopf = ([x1, x2, x3, x4]) => [2 * (x1 * x3 + x2 * x4), 2 * (x2 * x3 - x1 * x4), x1 * x1 + x2 * x2 - x3 * x3 - x4 * x4];   // (9.53a–c)
const stereo = ([x1, x2, x3, x4]) => [x1 / (1 - x4), x2 / (1 - x4), x3 / (1 - x4)];
const fibre = (th, ph, n = 240) => Array.from({ length: n + 1 }, (_, k) => stereo(lift(th, ph, TAU * k / n)));
function gaussLink(A, B) {
  let s = 0;
  for (let i = 0; i < A.length - 1; i++) {
    const a = A[i], a2 = A[i + 1], da = [a2[0] - a[0], a2[1] - a[1], a2[2] - a[2]], am = [(a[0] + a2[0]) / 2, (a[1] + a2[1]) / 2, (a[2] + a2[2]) / 2];
    for (let j = 0; j < B.length - 1; j++) {
      const b = B[j], b2 = B[j + 1], db = [b2[0] - b[0], b2[1] - b[1], b2[2] - b[2]];
      const r = [am[0] - (b[0] + b2[0]) / 2, am[1] - (b[1] + b2[1]) / 2, am[2] - (b[2] + b2[2]) / 2];
      const c = [da[1] * db[2] - da[2] * db[1], da[2] * db[0] - da[0] * db[2], da[0] * db[1] - da[1] * db[0]];
      const L = Math.hypot(r[0], r[1], r[2]);
      s += (r[0] * c[0] + r[1] * c[1] + r[2] * c[2]) / (L * L * L);
    }
  }
  return s / (4 * Math.PI);
}
const hue = ph => `hsl(${Math.round(mod(ph, TAU) / TAU * 360)},62%,45%)`;

export function HopfLab() {
  const [th, setTh] = useState(1.2);
  const [ph, setPh] = useState(0.8);
  const [lam, setLam] = useState(0.0);
  const [az, setAz] = useState(0.5);
  const [el, setEl] = useState(0.45);
  const [fam, setFam] = useState("lat");
  const [n, setN] = useState(2);
  const mapRef = useRef(null), viewRef = useRef(null), dragRef = useRef(null);
  const P = view(az, el, 200, 165, 62);
  const sel = useMemo(() => fibre(th, ph), [th, ph]);
  const others = useMemo(() => {
    if (fam === "lat") return Array.from({ length: 10 }, (_, k) => ({ ph: ph + TAU * (k + 1) / 11, th, f: fibre(th, ph + TAU * (k + 1) / 11, 160) }));
    if (fam === "mer") return [0.35, 0.7, 1.05, 1.4, 1.75, 2.1, 2.45].filter(t => Math.abs(t - th) > 0.12).map(t => ({ ph, th: t, f: fibre(t, ph, 160) }));
    return [];
  }, [th, ph, fam]);
  const north = useMemo(() => fibre(0, 0, 160), []);
  const ref = th < 0.08 ? { f: fibre(Math.PI / 2, 0, 240), name: R`赤道上 $\phi=0$ 的纤维` } : { f: fibre(0, 0, 240), name: R`北极的纤维（单位圆）` };
  const lk = useMemo(() => gaussLink(sel, ref.f), [sel, th]);   // eslint-disable-line
  // 纤维上的点 u（参数 λ）及其在两张平凡化中的坐标 (9.55)
  const u = lift(th, ph, lam), z0 = [u[0], u[1]], z1 = [u[2], u[3]];
  const xi = hopf(u), xiTrue = [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
  const errXi = Math.max(...sel.map((_, k) => { const q = hopf(lift(th, ph, TAU * k / 240)); return Math.hypot(q[0] - xiTrue[0], q[1] - xiTrue[1], q[2] - xiTrue[2]); }));
  const a0 = Math.hypot(...z0), a1 = Math.hypot(...z1);
  const gN = a0 > 1e-9 ? [z0[0] / a0, z0[1] / a0] : null, gS = a1 > 1e-9 ? [z1[0] / a1, z1[1] / a1] : null;
  const tNS = gN && gS ? [gN[0] * gS[0] + gN[1] * gS[1], gN[1] * gS[0] - gN[0] * gS[1]] : null;     // gN / gS
  const tErr = tNS ? Math.hypot(tNS[0] - Math.cos(ph), tNS[1] - Math.sin(ph)) : 0;
  // 沿赤道一周：每个样本点在纤维上随机取一点，计算 t_NS 并累计辐角
  const wind = useMemo(() => {
    let acc = 0, prev = null, maxErr = 0;
    for (let k = 0; k <= 400; k++) {
      const p = TAU * k / 400, q = lift(Math.PI / 2, p, Math.sin(37 * k) * 3), w0 = Math.hypot(q[0], q[1]), w1 = Math.hypot(q[2], q[3]);
      const g0 = [q[0] / w0, q[1] / w0], g1 = [q[2] / w1, q[3] / w1], t = [g0[0] * g1[0] + g0[1] * g1[1], g0[1] * g1[0] - g0[0] * g1[1]];
      const x = hopf(q); maxErr = Math.max(maxErr, Math.hypot(t[0] - x[0], t[1] - x[1]));        // (9.57)：赤道上 t_NS = ξ1 + iξ2
      const a = Math.atan2(t[1], t[0]); if (prev !== null) { let d = a - prev; d -= TAU * Math.round(d / TAU); acc += d; } prev = a;
    }
    return { w: acc / TAU, maxErr };
  }, []);
  const windN = useMemo(() => { let acc = 0, prev = null; for (let k = 0; k <= 400; k++) { const a = Math.atan2(Math.sin(n * TAU * k / 400), Math.cos(n * TAU * k / 400)); if (prev !== null) { let d = a - prev; d -= TAU * Math.round(d / TAU); acc += d; } prev = a; } return acc / TAU; }, [n]);
  const path3 = (pts, clip = 7) => { let d = "", pen = false; for (const q of pts) { if (Math.hypot(...q) > clip) { pen = false; continue; } const p = P(q); d += (pen ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1); pen = true; } return d; };
  const south = [[0, 0, -7], [0, 0, 7]].map(P);
  const up = stereo(u), upS = P(up);
  // 经纬图（φ 横、θ 纵）
  const MW = 300, MH = 150, toMap = (t, p) => [mod(p, TAU) / TAU * MW, t / Math.PI * MH];
  const pick = e => {
    if (e.buttons !== 1 && e.type !== "pointerdown") return;
    const q = svgPoint(mapRef.current, e); setPh(Math.min(TAU - 0.001, Math.max(0, q.x / MW * TAU))); setTh(Math.min(Math.PI - 0.06, Math.max(0, q.y / MH * Math.PI)));
  };
  const rot = e => {
    if (e.type === "pointerdown") { dragRef.current = [e.clientX, e.clientY, az, el]; return; }
    if (e.buttons !== 1 || !dragRef.current) return;
    const [x0, y0, a0_, e0] = dragRef.current; setAz(a0_ + (e.clientX - x0) * 0.01); setEl(Math.max(-1.4, Math.min(1.4, e0 + (e.clientY - y0) * 0.01)));
  };
  const [mx, my] = toMap(th, ph);
  const farWarn = th > 0.88 * Math.PI;
  const wc = 70, wr = 50;
  return (
    <RunCard title={R`交互图 2：Hopf 纤维化 $S^3\to S^2$ 与单极子荷`}
      lead={R`左：$S^2$ 的经纬图（横轴 $\phi$，纵轴 $\theta$，中间虚线为赤道 $U_{\rm N}\cap U_{\rm S}$）——**点击或拖动**选一点 $\xi$。右：它的纤维 $\{(\lambda z^0,\lambda z^1)\}\subset S^3$ 经立体投影 $(x^1,x^2,x^3)/(1-x^4)$ 画到 $\R^3$ 中（金色粗线），**拖动右图可旋转**。北极的纤维是水平单位圆，南极的纤维是竖直轴（经过无穷远点）。同纬度的纤维铺成一个环面，彼此都是两两相扣的 Villarceau 圆。`}>
      <Row>
        <div>
          <svg ref={mapRef} viewBox={`0 0 ${MW} ${MH}`} width={MW} height={MH} style={{ ...svgStyle, cursor: "crosshair" }}
            onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); pick(e); }} onPointerMove={pick}>
            {[1, 2, 3, 4, 5].map(k => <line key={"v" + k} x1={MW * k / 6} y1={0} x2={MW * k / 6} y2={MH} stroke="#eee6d6" />)}
            {[1, 2, 3].map(k => <line key={"h" + k} x1={0} y1={MH * k / 4} x2={MW} y2={MH * k / 4} stroke="#eee6d6" />)}
            <rect x={0} y={MH / 2 - 8} width={MW} height={16} fill="rgba(44,74,110,0.08)" />
            <line x1={0} y1={MH / 2} x2={MW} y2={MH / 2} stroke={BLUE} strokeDasharray="4 3" />
            {others.map((o, i) => { const [x, y] = toMap(o.th, o.ph); return <circle key={i} cx={x} cy={y} r="3.5" fill={hue(o.ph)} />; })}
            <circle cx={mx} cy={my} r="7" fill={GOLD} stroke="#fff" strokeWidth="2" />
            <text x={4} y={11} fontSize="10" fill={GRAY}>北极 θ=0</text><text x={4} y={MH - 4} fontSize="10" fill={GRAY}>南极 θ=π</text>
            <text x={MW - 4} y={MH / 2 - 11} fontSize="10" fill={BLUE} textAnchor="end">赤道</text>
          </svg>
          <div style={{ marginTop: 6 }}><TxI>{R`显示其他纤维：`}</TxI><Seg options={[["lat", "同纬度（环面）"], ["mer", "同经度"], ["none", "不显示"]]} value={fam} onChange={setFam} /></div>
          <svg viewBox={`0 0 ${2 * wc + 150} ${2 * wc}`} width={2 * wc + 150} height={2 * wc} style={svgStyle}>
            <circle cx={wc} cy={wc} r={wr} fill="none" stroke={GRAY} />
            {(() => { let d = ""; for (let k = 0; k <= 200; k++) { const p = TAU * k / 200, r = wr - 14 + 12 * k / 200; d += (k ? "L" : "M") + (wc + r * Math.cos(n * p)).toFixed(1) + "," + (wc - r * Math.sin(n * p)).toFixed(1); } return <path d={d} fill="none" stroke={RED} strokeWidth="1.8" />; })()}
            <circle cx={wc + wr} cy={wc} r="3.5" fill={INK} />
            <text x={2 * wc + 6} y={40} fontSize="12" fill={RED}>{"卷绕数 = " + windN.toFixed(3)}</text>
            <text x={2 * wc + 6} y={62} fontSize="11" fill={GRAY}>{n === 0 ? "平凡丛 P0" : n === 1 ? "即 Hopf 丛" : "单极子丛 P" + n}</text>
          </svg>
          <div style={{ fontSize: 13 }}><TxI>{R`红线：$\phi:0\to2\pi$ 时 $t_{\rm NS}(\phi)=\mathrm{e}^{\mathrm{i}n\phi}$ 在单位圆上的像（半径逐渐增大以便看清圈数）。`}</TxI></div>
          <Slider label={R`单极子荷 $n$（$t_{\rm NS}=\mathrm{e}^{\mathrm{i}n\phi}$）`} value={n} min={-3} max={3} step={1} onChange={setN} />
        </div>
        <svg ref={viewRef} viewBox="0 0 400 330" width={400} height={330} style={{ ...svgStyle, cursor: "grab" }}
          onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); rot(e); }} onPointerMove={rot} onPointerUp={() => { dragRef.current = null; }}>
          <line x1={south[0][0]} y1={south[0][1]} x2={south[1][0]} y2={south[1][1]} stroke={GRAY} strokeWidth="1.5" />
          <path d={path3(north)} fill="none" stroke={GRAY} strokeWidth="1.5" />
          {others.map((o, i) => <path key={i} d={path3(o.f)} fill="none" stroke={hue(o.ph)} strokeWidth="1.3" strokeOpacity="0.8" />)}
          <path d={path3(sel)} fill="none" stroke={GOLD} strokeWidth="3.2" />
          {Math.hypot(...up) < 7 && <circle cx={upS[0]} cy={upS[1]} r="5.5" fill={RED} stroke="#fff" strokeWidth="1.5" />}
          <text x={8} y={322} fontSize="11" fill={GRAY}>灰：北极纤维（单位圆）与南极纤维（竖轴）；红点：纤维上的点 u（相位 γ）</text>
        </svg>
      </Row>
      <Row gap={24}>
        <Slider label={R`$\theta$`} value={+th.toFixed(3)} min={0} max={3.08} step={0.01} onChange={setTh} fmt={v => v.toFixed(2)} />
        <Slider label={R`$\phi$`} value={+ph.toFixed(3)} min={0} max={6.28} step={0.01} onChange={setPh} fmt={v => v.toFixed(2)} />
        <Slider label={R`纤维上的相位 $\gamma$（$\lambda=\mathrm{e}^{\mathrm{i}\gamma}$）`} value={lam} min={0} max={6.28} step={0.01} onChange={setLam} fmt={v => v.toFixed(2)} />
      </Row>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th>量</th><th>数值</th><th>来源</th></tr></thead>
        <tbody>
          <tr><td><TxI>{R`$u=(z^0,z^1)$`}</TxI></td><td>({fmtC(...z0)}, {fmtC(...z1)})</td><td><TxI>{R`$z^0=\cos\frac\theta2\,\mathrm{e}^{\mathrm{i}(\phi+\gamma)}$，$z^1=\sin\frac\theta2\,\mathrm{e}^{\mathrm{i}\gamma}$`}</TxI></td></tr>
          <tr><td><TxI>{R`$\pi(u)=(\xi^1,\xi^2,\xi^3)$`}</TxI></td><td>({f4(xi[0])}, {f4(xi[1])}, {f4(xi[2])})</td><td><TxI>{R`\eqref{9.53a}–\eqref{9.53c}；应为 $(\sin\theta\cos\phi,\sin\theta\sin\phi,\cos\theta)$`}</TxI></td></tr>
          <tr><td><TxI>{R`$\phi_{\rm N}^{-1}(u)$ 的纤维坐标 $z^0/|z^0|$`}</TxI></td><td>{gN ? fmtC(...gN) : "—（z0 = 0，南极不在 U_N）"}</td><td><TxI>{R`\eqref{9.55b}`}</TxI></td></tr>
          <tr><td><TxI>{R`$\phi_{\rm S}^{-1}(u)$ 的纤维坐标 $z^1/|z^1|$`}</TxI></td><td>{gS ? fmtC(...gS) : "—（z1 = 0，北极不在 U_S）"}</td><td><TxI>{R`\eqref{9.55a}`}</TxI></td></tr>
          <tr><td><TxI>{R`$t_{\rm NS}=\dfrac{z^0/|z^0|}{z^1/|z^1|}$`}</TxI></td><td>{tNS ? fmtC(...tNS) : "—"}</td><td><TxI>{R`应为 $\mathrm{e}^{\mathrm{i}\phi}$，与 $\gamma$ 无关`}</TxI></td></tr>
          <tr><td><TxI>{R`沿赤道 $t_{\rm NS}$ 的卷绕数`}</TxI></td><td>{wind.w.toFixed(4)}</td><td><TxI>{R`每个样本在纤维上随机取点；$\max|t_{\rm NS}-(\xi^1+\mathrm{i}\xi^2)|=$ `}</TxI>{f4(wind.maxErr)}</td></tr>
          <tr><td><TxI>{R`Gauss 环绕数 $\mathrm{Lk}$，与`}</TxI><TxI>{ref.name}</TxI></td><td>{lk.toFixed(4)}</td><td><TxI>{R`$\frac1{4\pi}\oint\oint\frac{(\boldsymbol r_1-\boldsymbol r_2)\cdot(\dd\boldsymbol r_1\times\dd\boldsymbol r_2)}{|\boldsymbol r_1-\boldsymbol r_2|^3}$，$240\times240$ 个点`}</TxI></td></tr>
        </tbody>
      </table></div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={errXi < 1e-12} label={R`整根纤维都映到同一点 $\xi$`} detail={"max error " + errXi.toExponential(2)} />
        <Check ok={!tNS || tErr < 1e-12} label={R`$t_{\rm NS}=\mathrm{e}^{\mathrm{i}\phi}$（与纤维上的点无关）`} />
        <Check ok={Math.abs(wind.w - 1) < 1e-9 && wind.maxErr < 1e-12} label={R`赤道上 $t_{\rm NS}=\xi^1+\mathrm{i}\xi^2$，卷绕数 $=1$`} />
        <Check ok={Math.abs(Math.abs(lk) - 1) < 0.02 && !farWarn} label={R`两根纤维相扣：$|\mathrm{Lk}|=1$`} detail={farWarn ? "纤维太靠近投影极点，数值积分不可靠" : ""} />
      </div>
      {farWarn && <p className="muted" style={{ fontSize: 13, color: RED }}><TxI>{R`所选点很靠近南极：纤维几乎经过投影极点 $x^4=1$，在 $\R^3$ 中巨大，Gauss 积分的离散误差变大。`}</TxI></p>}
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`读法：纤维上不同的点 $u$（改变 $\gamma$）两种纤维坐标都变，但比值 $t_{\rm NS}$ 不变——转移函数只依赖底空间的点。沿赤道 $\phi:0\to2\pi$，$t_{\rm NS}=\mathrm{e}^{\mathrm{i}\phi}$ 在 $\mathrm{U}(1)$ 中绕一圈：Hopf 丛就是例 9.7 中 $n=1$ 的单极子丛。左下小图对一般的 $n$ 画出 $t_{\rm NS}(\phi)$ 的像，卷绕数 $n$ 就是 $\pi_1(\mathrm{U}(1))=\Z$ 中的类。两根纤维的环绕数 $\pm1$（符号取决于定向约定）正是习题 P9.2(e) 中 Hopf 不变量 $H(\pi)=1$ 的几何含义。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 3. TS² 的三张卡与余循环条件（例 9.3）
// ============================================================
// 三张球极卡：N（北极投影 (X,Y)）、S（南极投影 (U,V)，按图 9.9 V 轴反向）、E（从 (1,0,0) 投影 (P,Q)）
const CH = {
  N: { to: ([x, y, z]) => [x / (1 - z), y / (1 - z)], from: ([a, b]) => { const q = a * a + b * b; return [2 * a / (1 + q), 2 * b / (1 + q), (q - 1) / (q + 1)]; } },
  S: { to: ([x, y, z]) => [x / (1 + z), -y / (1 + z)], from: ([a, b]) => { const q = a * a + b * b; return [2 * a / (1 + q), -2 * b / (1 + q), (1 - q) / (1 + q)]; } },
  E: { to: ([x, y, z]) => [y / (1 - x), z / (1 - x)], from: ([a, b]) => { const q = a * a + b * b; return [(q - 1) / (q + 1), 2 * a / (1 + q), 2 * b / (1 + q)]; } },
};
// t_ij = ∂(x_i)/∂(x_j)：j 卡的切向量分量 → i 卡的分量（f_i = t_ij f_j）
function tJac(i, j, p) {
  const c = CH[j].to(p), h = 1e-6, F = v => CH[i].to(CH[j].from(v));
  const a1 = F([c[0] + h, c[1]]), a0 = F([c[0] - h, c[1]]), b1 = F([c[0], c[1] + h]), b0 = F([c[0], c[1] - h]);
  return [[(a1[0] - a0[0]) / (2 * h), (b1[0] - b0[0]) / (2 * h)], [(a1[1] - a0[1]) / (2 * h), (b1[1] - b0[1]) / (2 * h)]];
}
const mm = (A, B) => [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]], [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
const mv = (A, v) => [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
const inv = A => { const d = A[0][0] * A[1][1] - A[0][1] * A[1][0]; return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]]; };
const dI = A => Math.hypot(A[0][0] - 1, A[0][1], A[1][0], A[1][1] - 1);
const dM = (A, B) => Math.hypot(A[0][0] - B[0][0], A[0][1] - B[0][1], A[1][0] - B[1][0], A[1][1] - B[1][1]);
const rotM = e => [[Math.cos(e), -Math.sin(e)], [Math.sin(e), Math.cos(e)]];
const tex2 = A => R`\begin{pmatrix}${f4(A[0][0])}&${f4(A[0][1])}\\ ${f4(A[1][0])}&${f4(A[1][1])}\end{pmatrix}`;
function rnd(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

export function CocycleLab() {
  const [th, setTh] = useState(1.0);
  const [ph, setPh] = useState(2.2);
  const [ang, setAng] = useState(0.5);
  const [eps, setEps] = useState(0);
  const [seed, setSeed] = useState(7);
  const p = [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
  const nearE = Math.hypot(p[0] - 1, p[1], p[2]) < 0.25;
  const d = useMemo(() => {
    const T = {}; for (const i of "NSE") for (const j of "NSE") T[i + j] = tJac(i, j, p);
    const [X, Y] = CH.N.to(p), r2 = X * X + Y * Y, a = Math.atan2(Y, X);
    const book = [[-Math.cos(2 * a) / r2, -Math.sin(2 * a) / r2], [Math.sin(2 * a) / r2, -Math.cos(2 * a) / r2]];   // (9.23)
    const tES = mm(rotM(eps), T.ES);                                       // 可被"篡改"的 t_ES
    const loop = mm(mm(T.NE, tES), T.SN);                                  // N → S → E → N
    const R3 = rnd(seed), G = {}; for (const i of "NSE") G[i] = [[1 + R3() - 0.5, R3() - 0.5], [R3() - 0.5, 1 + R3() - 0.5]];
    const Tt = (i, j) => mm(mm(inv(G[i]), T[i + j]), G[j]);              // (9.9)
    const gl = mm(mm(Tt("N", "S"), Tt("S", "E")), Tt("E", "N"));
    const triv = (i, j) => mm(mm(inv(T[i + "N"]), T[i + j]), T[j + "N"]);  // g_i = t_iN 时 t̃_ij = t_Ni t_ij t_jN
    return { T, X, Y, book, loop, tES, gl, errBook: dM(T.SN, book), e6a: Math.max(dI(T.NN), dI(T.SS), dI(T.EE)),
      e6b: Math.max(dI(mm(T.NS, T.SN)), dI(mm(T.SE, T.ES)), dI(mm(T.EN, T.NE))), e6c: dI(mm(mm(T.NS, T.SE), T.EN)),
      eLoop: dI(loop), eGauge: dI(gl), eTriv: Math.max(dI(triv("S", "E")), dI(triv("N", "S")), dI(triv("E", "N"))), detSN: T.SN[0][0] * T.SN[1][1] - T.SN[0][1] * T.SN[1][0], r2 };
  }, [th, ph, eps, seed]);   // eslint-disable-line
  const vN = [Math.cos(ang), Math.sin(ang)], vS = mv(d.T.SN, vN), vE = mv(d.tES, vS), vN2 = mv(d.T.NE, vE);
  const Panel = ({ title, v, color, ghost }) => {
    const S = 120, c = S / 2, L = Math.max(1e-9, Math.hypot(...v)), sc = 40 / Math.max(L, ghost ? Math.hypot(...ghost) : 0, 1e-9);
    return <svg viewBox={`0 0 ${S} ${S + 18}`} width={S} height={S + 18} style={svgStyle}>
      <line x1={8} y1={c} x2={S - 8} y2={c} stroke="#e4dccb" /><line x1={c} y1={8} x2={c} y2={S - 8} stroke="#e4dccb" />
      {ghost && <line x1={c} y1={c} x2={c + ghost[0] * sc} y2={c - ghost[1] * sc} stroke={GRAY} strokeWidth="3" strokeDasharray="4 3" />}
      <line x1={c} y1={c} x2={c + v[0] * sc} y2={c - v[1] * sc} stroke={color} strokeWidth="2.5" />
      <circle cx={c + v[0] * sc} cy={c - v[1] * sc} r="3.5" fill={color} />
      <text x={c} y={S + 13} fontSize="11.5" fill={INK} textAnchor="middle">{title}</text>
    </svg>;
  };
  return (
    <RunCard title={R`交互图 3：$TS^2$ 的转移函数与余循环条件`}
      lead={R`用三张卡覆盖 $S^2$：北极投影 $(X,Y)$、南极投影 $(U,V)$（\eqref{9.22}）、以及从 $(1,0,0)$ 出发的投影 $(P,Q)=(y,z)/(1-x)$。在三卡共同的点 $p$ 上，用数值差分求坐标变换的 Jacobi 矩阵 $t_{ij}=\partial x_{(i)}/\partial x_{(j)}$，逐项核对 \eqref{9.23}、\eqref{9.6a}–\eqref{9.6c} 与规范变换 \eqref{9.9}。下排把一个切向量的北卡分量依次换到南卡、东卡、再回北卡。`}>
      <Row gap={24}>
        <Slider label={R`$p$ 的极角 $\theta$`} value={th} min={0.25} max={2.9} step={0.01} onChange={setTh} fmt={v => v.toFixed(2)} />
        <Slider label={R`$p$ 的经度 $\phi$`} value={ph} min={-3.14} max={3.14} step={0.01} onChange={setPh} fmt={v => v.toFixed(2)} />
        <Slider label={R`北卡中切向量的方向`} value={ang} min={0} max={6.28} step={0.01} onChange={setAng} fmt={v => v.toFixed(2)} />
        <Slider label={R`篡改：$t_{\rm ES}\to R(\varepsilon)\,t_{\rm ES}$，$\varepsilon$`} value={eps} min={0} max={0.6} step={0.01} onChange={setEps} fmt={v => v.toFixed(2)} />
      </Row>
      {nearE && <p className="muted" style={{ color: RED, fontSize: 13 }}>所选点太靠近东卡的投影极点 (1,0,0)，请移开一些。</p>}
      <Row gap={10}>
        <Panel title="北卡分量" v={vN} color={BLUE} />
        <Panel title="→ 南卡" v={vS} color={RED} />
        <Panel title="→ 东卡" v={vE} color={GREEN} />
        <Panel title="→ 回到北卡" v={vN2} color={GOLD} ghost={vN} />
      </Row>
      <div className="tb-table-wrap"><table className="tb-table">
        <thead><tr><th>量</th><th>数值</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td><TxI>{R`$t_{\rm SN}=\partial(U,V)/\partial(X,Y)$（数值）`}</TxI></td><td><M>{tex2(d.T.SN)}</M></td><td><TxI>{R`$(X,Y)=$ `}</TxI>({f4(d.X)}, {f4(d.Y)})</td></tr>
          <tr><td><TxI>{R`\eqref{9.23}：$\frac1{r^2}\begin{pmatrix}-\cos2\theta&-\sin2\theta\\ \sin2\theta&-\cos2\theta\end{pmatrix}$`}</TxI></td><td><M>{tex2(d.book)}</M></td><td>差 {f4(d.errBook)}；<TxI>{R`$\det t_{\rm SN}=1/r^4=$ `}</TxI>{f4(d.detSN)}</td></tr>
          <tr><td><TxI>{R`$t_{\rm NE}\,t_{\rm ES}\,t_{\rm SN}$（绕一圈）`}</TxI></td><td><M>{tex2(d.loop)}</M></td><td><TxI>{eps > 0 ? R`篡改后不再是单位阵：粘不起来` : R`应为单位阵`}</TxI></td></tr>
          <tr><td><TxI>{R`换平凡化后 $\tilde t_{\rm NS}\tilde t_{\rm SE}\tilde t_{\rm EN}$`}</TxI></td><td><M>{tex2(d.gl)}</M></td><td><TxI>{R`随机 $g_i\in\mathrm{GL}(2,\R)$，$\tilde t_{ij}=g_i^{-1}t_{ij}g_j$`}</TxI></td></tr>
        </tbody>
      </table></div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <Check ok={d.errBook < 1e-6} label={R`数值 $t_{\rm SN}$ 与 \eqref{9.23} 一致`} detail={"差 " + d.errBook.toExponential(2)} />
        <Check ok={d.e6a < 1e-6} label={R`\eqref{9.6a}：$t_{ii}=I$`} />
        <Check ok={d.e6b < 1e-6} label={R`\eqref{9.6b}：$t_{ij}t_{ji}=I$`} detail={"最大偏差 " + d.e6b.toExponential(2)} />
        <Check ok={d.e6c < 1e-6} label={R`\eqref{9.6c}：$t_{\rm NS}t_{\rm SE}t_{\rm EN}=I$`} detail={"偏差 " + d.e6c.toExponential(2)} />
        <Check ok={d.eGauge < 1e-6} label={R`规范变换后余循环条件仍成立`} />
        <Check ok={d.eTriv < 1e-6} label={R`取 $g_i=t_{i\rm N}(p)$ 可把这一点上的 $\tilde t_{ij}$ 全变成 $I$`} />
        <Check ok={d.eLoop < 1e-6} label={R`绕一圈回到原向量`} detail={"偏差 " + d.eLoop.toExponential(2)} />
        <button className="seg" style={{ border: "1px solid #ccc", borderRadius: 99, padding: "2px 12px", background: "#fff", cursor: "pointer" }} onClick={() => setSeed(s => s + 1)}>换一组随机 g_i</button>
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`读法：(1) \eqref{9.23} 的矩阵是"转动 + 缩放"：$\det t_{\rm SN}=1/r^4>0$。(2) 余循环条件不是额外假设——由坐标变换的链式法则自动成立；把 $t_{\rm ES}$ 乘上一个小转动（$\varepsilon>0$），向量绕一圈就回不到自己，局部片无法一致地粘合。(3) 在**一个点**上，总能用 $g_i=t_{i\rm N}(p)$ 把所有转移函数规范成单位阵（最后一个徽章）；$TS^2$ 的非平凡性在于这样的 $g_i(p)$ 不能在整个 $U_i$ 上**光滑地**选取——这是整体性质，单点检验看不出来。`}</TxI></p>
    </RunCard>);
}
