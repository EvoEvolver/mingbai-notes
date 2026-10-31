// 第 7 章交互图（全部在浏览器内真算；数值核心在 _ch07_num.js，可单独在 node 中测试）：
//  1. HolonomyLab   —— 球面上沿闭合回路平行移动：拖动测地多边形的顶点（或选纬圈），RK4 积分 (7.18b)，
//                      并用"切平面滚动"的外在法独立核对；转角 = 所围面积 × K（图 7.2、7.5，例 7.7）
//     HolonomyPlot  —— 纬圈平行移动一圈后的分量与 (7.95) 对照（Plot）
//  2. GeodesicLab   —— 球面与 Poincaré 上半平面的测地线：给定初速度积分 (7.19b)，显示 Christoffel 符号；
//                      可切换到原书 (7.68b) 的误印式作对比
//  3. CurvatureLab  —— 输入二维度规，按 (7.53)、(7.42) 数值计算 Γ、R^1_{212}、R_{1212}、\sym{Ric}{\mathit{Ric}}、𝓡 与 Gauss 曲率 K，Brioschi 公式独立核对
import { useMemo, useRef, useState } from "react";
import { TxI, RunCard, Check, Slider, Seg, Plot } from "@kit";
import { curvature2D, brioschiK, sphereGeodesic, halfPlaneGeodesic, sph, vec, polygonPath, latitudePath, transportCoord, transportExtrinsic, tpToVec, signedAngle, polygonArea, wrap } from "./_ch07_num.js";

const R = String.raw;
const INK = "#1f1b16", BLUE = "#2c4a6e", RED = "#9b2c1f", GOLD = "#b8862b", GREEN = "#2c6e49", GRAY = "#9a9083";
const Row = ({ children, gap = 16 }) => <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>{children}</div>;
const f4 = v => (!Number.isFinite(v) ? "—" : Math.abs(v) < 5e-13 ? "0" : Math.abs(v) >= 1e4 || Math.abs(v) < 1e-3 ? v.toExponential(2) : v.toFixed(4));
const f6 = v => (!Number.isFinite(v) ? "—" : Math.abs(v) < 5e-15 ? "0" : Math.abs(v) < 1e-4 ? v.toExponential(2) : v.toFixed(6));
const svgStyle = { maxWidth: "100%", background: "#fffdf8", border: "1px solid #e8e0d0", borderRadius: 6, touchAction: "none" };
function svgPoint(svg, e) { const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); }
function Arrow({ x1, y1, x2, y2, color, w = 2, head = 7 }) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  if (L < 1e-6) return null;
  const ux = dx / L, uy = dy / L, s = Math.min(head, L * 0.6);
  return <g>
    <line x1={x1} y1={y1} x2={x2 - ux * s * 0.6} y2={y2 - uy * s * 0.6} stroke={color} strokeWidth={w} />
    <path d={`M${x2},${y2} L${x2 - ux * s - uy * s * 0.5},${y2 - uy * s + ux * s * 0.5} L${x2 - ux * s + uy * s * 0.5},${y2 - uy * s - ux * s * 0.5} Z`} fill={color} />
  </g>;
}
const Tbl = ({ head, rows }) => (
  <div className="tb-table-wrap"><table className="tb-table">
    <thead><tr>{head.map((h, i) => <th key={i}><TxI>{h}</TxI></th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{typeof c === "string" ? <TxI>{c}</TxI> : c}</td>)}</tr>)}</tbody>
  </table></div>);

// ---------- 正交投影的球面视图 ----------
function camera(az, el) {
  const f = [Math.cos(el) * Math.cos(az), Math.cos(el) * Math.sin(az), Math.sin(el)];       // 指向观者
  const r = vec.scale(vec.cross([0, 0, 1], f), 1 / Math.hypot(...vec.cross([0, 0, 1], f)));
  const u = vec.cross(f, r);
  return { f, r, u };
}
function SphereView({ cam, size = 330, children, onDown, onMove, svgRef }) {
  const c = size / 2, Rs = size / 2 - 14;
  const P = p => [c + Rs * vec.dot(p, cam.r), c - Rs * vec.dot(p, cam.u)];
  const front = p => vec.dot(p, cam.f) >= 0;
  // 经纬网
  const grid = [];
  for (let k = 1; k < 6; k++) { const th = k * Math.PI / 6, pts = []; for (let j = 0; j <= 72; j++) pts.push(sph.toXYZ(th, j * Math.PI / 36)); grid.push(pts); }
  for (let k = 0; k < 12; k++) { const ph = k * Math.PI / 6, pts = []; for (let j = 0; j <= 36; j++) pts.push(sph.toXYZ(j * Math.PI / 36, ph)); grid.push(pts); }
  const poly = (pts, vis) => { let d = "", on = false; for (const p of pts) { const ok = front(p) === vis; const [x, y] = P(p); if (ok) { d += (on ? "L" : "M") + x.toFixed(1) + "," + y.toFixed(1); on = true; } else on = false; } return d; };
  return (
    <svg ref={svgRef} viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ ...svgStyle, cursor: onDown ? "crosshair" : "default" }}
      onPointerDown={onDown} onPointerMove={onMove}>
      <circle cx={c} cy={c} r={Rs} fill="rgba(44,74,110,0.05)" stroke={INK} />
      {grid.map((g, i) => <path key={i} d={poly(g, true)} fill="none" stroke={GRAY} strokeOpacity="0.35" strokeWidth="0.8" />)}
      {children({ P, front, poly, c, Rs })}
    </svg>);
}

// ============================================================
// 1. 球面上的和乐
// ============================================================
const DEF_TRI = [[1.0, -0.5], [1.25, 0.75], [0.45, 0.35]].map(([t, p]) => sph.toXYZ(t, p));
export function HolonomyLab() {
  const [mode, setMode] = useState("poly");
  const [V, setV] = useState(DEF_TRI);
  const [th0, setTh0] = useState(0.9);
  const [az, setAz] = useState(0.25);
  const [drag, setDrag] = useState(-1);
  const svgRef = useRef(null);
  const cam = useMemo(() => camera(az, 0.55), [az]);
  const d = useMemo(() => {
    const path = mode === "poly" ? polygonPath(V, 600) : latitudePath(th0, 3000);
    const p0 = path[0], [t0, ph0] = sph.toTP(p0);
    const X0 = [1, 0], V0 = tpToVec(t0, ph0, X0);                     // 起点取 e_θ
    const c = transportCoord(path, X0);                               // 坐标法：积分 (7.18b)
    const Vc = tpToVec(t0, ph0, c.X);
    const Ve = transportExtrinsic(path, V0);                          // 外在法
    const rotC = signedAngle(V0, Vc, p0), rotE = signedAngle(V0, Ve, p0);
    const area = mode === "poly" ? polygonArea(V) : 2 * Math.PI * (1 - Math.cos(th0));
    // 沿路径若干点的平行移动向量（外在法，用于作图）
    const marks = []; let Vm = V0.slice(); const step = Math.max(1, Math.floor(path.length / 24));
    for (let i = 1; i < path.length; i++) {
      const p = path[i - 1], q = path[i], k = vec.cross(p, q), s = Math.hypot(...k);
      if (s > 1e-15) { const u = vec.scale(k, 1 / s), co = vec.dot(p, q); Vm = vec.add(vec.add(vec.scale(Vm, co), vec.scale(vec.cross(u, Vm), s)), vec.scale(u, vec.dot(u, Vm) * (1 - co))); }
      if (i % step === 0) marks.push([q, Vm.slice()]);
    }
    return { path, p0, V0, Vc, Ve, rotC, rotE, area, okC: c.minSin > 0.02, X: c.X, marks, t0 };
  }, [mode, V, th0]);
  const pick = e => {
    const p = svgPoint(svgRef.current, e), size = 330, c = size / 2, Rs = size / 2 - 14;
    const x = (p.x - c) / Rs, y = -(p.y - c) / Rs, r2 = x * x + y * y;
    if (r2 >= 0.995) return null;
    return vec.add(vec.add(vec.scale(cam.r, x), vec.scale(cam.u, y)), vec.scale(cam.f, Math.sqrt(1 - r2)));
  };
  const onDown = e => {
    if (mode !== "poly") return;
    const q = pick(e); if (!q) return;
    let best = -1, bd = 0.08;
    V.forEach((v, i) => { const dd = Math.hypot(...vec.sub(v, q)); if (vec.dot(v, cam.f) > 0 && dd < bd) { bd = dd; best = i; } });
    if (best >= 0) { e.currentTarget.setPointerCapture(e.pointerId); setDrag(best); }
  };
  const onMove = e => {
    if (drag < 0 || e.buttons !== 1) { if (drag >= 0 && e.buttons !== 1) setDrag(-1); return; }
    const q = pick(e); if (!q) return;
    setV(V.map((v, i) => (i === drag ? q : v)));
  };
  const addVertex = () => { if (V.length >= 6) return; const a = V[V.length - 1], b = V[0], m = vec.add(a, b); setV([...V, vec.scale(m, 1 / Math.hypot(...m))]); };
  const diffA = wrap(d.rotE - d.area), diffC = wrap(d.rotC - d.area);
  const C0 = Math.cos(th0);
  return (
    <RunCard title={R`交互图 1：球面上的平行移动与和乐——转角 $=$ 面积 $\times K$`}
      lead={mode === "poly"
        ? R`**拖动蓝色顶点**（正面半球上）改变测地多边形（边是大圆弧）。在第一个顶点取 $e_\theta$，沿回路平行移动一圈。两种独立算法：**坐标法**在 $(\theta,\phi)$ 中用 RK4 积分 \eqref{7.18b}（$\Gamma$ 取 \eqref{7.57}）；**外在法**每走一小步把切向量"不打转地"转到新切平面（§7.4.2 的 Levi-Civita 平行性）。面积由 Girard 公式（内角和 $-(n-2)\pi$）独立算出。单位球面 $K=1$。`
        : R`沿纬圈 $\theta=\theta_0$（$\phi$ 从 $0$ 到 $2\pi$）平行移动 $e_\theta$，核对例 7.7 的 \eqref{7.95}：$X^\theta=\cos(2\pi\cos\theta_0)$，$X^\phi=-\sin(2\pi\cos\theta_0)/\sin\theta_0$；转角（模 $2\pi$）等于北极冠面积 $2\pi(1-\cos\theta_0)$。`}>
      <Row>
        <SphereView cam={cam} svgRef={svgRef} onDown={onDown} onMove={onMove}>{({ P, front, poly }) => <>
          <path d={poly(d.path, false)} fill="none" stroke={GOLD} strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.6" />
          <path d={poly(d.path, true)} fill="none" stroke={GOLD} strokeWidth="2.5" />
          {d.marks.map(([q, v], i) => front(q) && (() => { const [x1, y1] = P(q), [x2, y2] = P(vec.add(q, vec.scale(v, 0.22))); return <Arrow key={i} x1={x1} y1={y1} x2={x2} y2={y2} color={GREEN} w={1.4} head={5} />; })())}
          {front(d.p0) && (() => { const [x1, y1] = P(d.p0), a = P(vec.add(d.p0, vec.scale(d.V0, 0.35))), b = P(vec.add(d.p0, vec.scale(d.Ve, 0.35))); return <>
            <Arrow x1={x1} y1={y1} x2={a[0]} y2={a[1]} color={BLUE} w={2.5} />
            <Arrow x1={x1} y1={y1} x2={b[0]} y2={b[1]} color={RED} w={2.5} /></>; })()}
          {mode === "poly" && V.map((v, i) => { const [x, y] = P(v); return front(v) ? <circle key={i} cx={x} cy={y} r={i === 0 ? 7 : 6} fill={BLUE} stroke="#fff" strokeWidth="2" /> : <circle key={i} cx={x} cy={y} r={4} fill="none" stroke={BLUE} strokeDasharray="2 2" />; })}
        </>}</SphereView>
        <div style={{ minWidth: 280, flex: 1 }}>
          <div style={{ marginBottom: 8 }}><Seg options={[["poly", "测地多边形（拖动）"], ["lat", "纬圈（例 7.7）"]]} value={mode} onChange={setMode} /></div>
          {mode === "poly" && <div style={{ marginBottom: 8 }}>
            <button onClick={addVertex} disabled={V.length >= 6}>增加顶点</button>{" "}
            <button onClick={() => V.length > 3 && setV(V.slice(0, -1))} disabled={V.length <= 3}>减少顶点</button>{" "}
            <button onClick={() => setV(DEF_TRI)}>复位</button>{" "}
            <button onClick={() => setV([...V].reverse())}>反向绕行</button>
          </div>}
          {mode === "lat" && <Slider label={R`纬圈 $\theta_0$`} value={th0} min={0.1} max={3.0} step={0.01} onChange={setTh0} fmt={v => v.toFixed(2)} />}
          <Slider label="视角（绕 z 轴）" value={az} min={-3.14} max={3.14} step={0.01} onChange={setAz} fmt={v => v.toFixed(2)} />
          <p className="muted" style={{ fontSize: 13 }}><TxI>{R`蓝箭头：起始向量 $e_\theta$；绿箭头：沿途的平行移动；红箭头：走完一圈回来的向量。`}</TxI></p>
        </div>
      </Row>
      <Tbl head={["量", "数值", "说明"]} rows={[
        [R`所围面积 $A$（$K=1$）`, f6(d.area), mode === "poly" ? R`Girard：内角和 $-(n-2)\pi$（逆时针为正）` : R`$2\pi(1-\cos\theta_0)$`],
        [R`转角（外在法）`, f6(d.rotE), "切平面滚动，与坐标无关"],
        [R`转角（坐标法，积分 (7.18b)）`, d.okC ? f6(d.rotC) : "路径过于靠近极点", R`$(\theta,\phi)$ 坐标在极点奇异`],
        [R`转角 $-A$（模 $2\pi$）`, f6(diffA), "应为 0"],
        ...(mode === "lat" ? [
          [R`$X^\theta(2\pi)$：数值 / \eqref{7.95}`, `${f6(d.X[0])} / ${f6(Math.cos(2 * Math.PI * C0))}`, "坐标法 vs 解析"],
          [R`$X^\phi(2\pi)$：数值 / \eqref{7.95}`, `${f6(d.X[1])} / ${f6(-Math.sin(2 * Math.PI * C0) / Math.sin(th0))}`, R`原书误印 $\sin(2\pi C_0\phi)$`],
        ] : []),
      ]} />
      <Row gap={10}>
        <Check ok={Math.abs(diffA) < 1e-6} label={R`外在法：转角 $=$ 面积（模 $2\pi$）`} detail={`差 ${f6(diffA)}`} />
        {d.okC && <Check ok={Math.abs(diffC) < 1e-4} label="坐标法 (7.18b)：转角 = 面积" detail={`差 ${f6(diffC)}`} />}
        {mode === "lat" && <Check ok={Math.abs(d.X[0] - Math.cos(2 * Math.PI * C0)) < 1e-5 && Math.abs(d.X[1] + Math.sin(2 * Math.PI * C0) / Math.sin(th0)) < 1e-5} label="(7.95) 两个分量" />}
      </Row>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`试试：把三角形拉成"一个顶点在北极、两个在赤道、经度差 $90^\circ$"的八分之一球面，面积 $\pi/2$，向量回来时转了 $90^\circ$；拉大到接近半球，转角接近 $2\pi$（模 $2\pi$ 回到 0）。反向绕行时转角变号。`}</TxI></p>
    </RunCard>);
}

export function HolonomyPlot() {
  const series = useMemo(() => {
    const pts1 = [], pts2 = [];
    for (let k = 1; k <= 24; k++) {
      const th = 0.12 + (Math.PI - 0.24) * (k - 1) / 23;
      const c = transportCoord(latitudePath(th, 1500), [1, 0]);
      pts1.push([th, c.X[0]]); pts2.push([th, c.X[1] * Math.sin(th)]);
    }
    return [
      { label: R`\cos(2\pi\cos\theta_0)`, f: t => Math.cos(2 * Math.PI * Math.cos(t)) },
      { label: R`-\sin(2\pi\cos\theta_0)`, f: t => -Math.sin(2 * Math.PI * Math.cos(t)), color: RED },
      { label: R`X^\theta\ \text{数值}`, data: pts1, points: true, color: BLUE },
      { label: R`X^\phi\sin\theta_0\ \text{数值}`, data: pts2, points: true, color: GOLD },
    ];
  }, []);
  return (
    <Plot x={{ label: R`\theta_0`, domain: [0, Math.PI] }} y={{ label: R`\text{一圈后的分量}`, domain: [-1.1, 1.1] }} series={series} samples={300} height={300}
      caption={R`纬圈平行移动一圈后 $e_\theta$ 变成的向量：曲线是 \eqref{7.95}（$e_\phi$ 分量乘 $\sin\theta_0$ 化为单位向量的分量），点是 RK4 积分 \eqref{7.93a}–\eqref{7.93b} 的结果。赤道 $\theta_0=\pi/2$ 上向量不转（大圆是测地线）；$\theta_0\to0$ 时转 $2\pi$，等价于不转。`} />);
}

// ============================================================
// 2. 测地线：球面与 Poincaré 上半平面
// ============================================================
export function GeodesicLab() {
  const [surf, setSurf] = useState("hp");
  const [typo, setTypo] = useState(false);
  // 球面参数
  const [th0, setTh0] = useState(1.1), [ph0] = useState(0), [ang, setAng] = useState(0.9), [L, setL] = useState(5.0), [az, setAz] = useState(0.4);
  // 上半平面参数
  const [pt, setPt] = useState([-0.6, 1.0]), [hang, setHang] = useState(0.5);
  const hpRef = useRef(null);
  const cam = useMemo(() => camera(az, 0.45), [az]);
  const sd = useMemo(() => {
    if (surf !== "sphere") return null;
    const pts = sphereGeodesic(th0, ph0, ang, L, 1200);
    const xyz = pts.map(p => sph.toXYZ(p[0], p[1]));
    const n = vec.cross(xyz[0], [Math.cos(th0) * Math.cos(ang), 0, 0].map((_, i) => [Math.cos(th0) * Math.cos(ph0), Math.cos(th0) * Math.sin(ph0), -Math.sin(th0)][i] * Math.cos(ang) + [-Math.sin(ph0), Math.cos(ph0), 0][i] * Math.sin(ang)));
    const nn = vec.scale(n, 1 / Math.hypot(...n));
    let dev = 0, nd = 0, cl = 0; const J0 = Math.sin(th0) ** 2 * pts[0][3];
    for (const p of pts) { dev = Math.max(dev, Math.abs(vec.dot(sph.toXYZ(p[0], p[1]), nn))); nd = Math.max(nd, Math.abs(p[2] ** 2 + Math.sin(p[0]) ** 2 * p[3] ** 2 - 1)); cl = Math.max(cl, Math.abs(Math.sin(p[0]) ** 2 * p[3] - J0)); }
    return { xyz, dev, nd, cl, end: pts[pts.length - 1] };
  }, [surf, th0, ph0, ang, L]);
  const hd = useMemo(() => {
    if (surf !== "hp") return null;
    const [x0, y0] = pt;
    const fw = halfPlaneGeodesic(x0, y0, hang, 6, 1500, typo), bw = halfPlaneGeodesic(x0, y0, hang + Math.PI, 6, 1500, typo);
    const dx = Math.cos(hang), dy = Math.sin(hang);
    const vertical = Math.abs(dx) < 1e-9;
    const xc = vertical ? NaN : x0 + y0 * dy / dx, Rr = vertical ? Infinity : Math.hypot(x0 - xc, y0);   // (7.70) 的圆心与半径
    let dev = 0, nd = 0, cons = 0;
    for (const br of [fw, bw]) { const k0 = br[0][2] / br[0][1] ** 2; for (const p of br) if (Number.isFinite(p[2]) && Number.isFinite(p[1])) cons = Math.max(cons, Math.abs(p[2] / p[1] ** 2 - k0)); }
    for (const p of [...fw, ...bw]) {
      if (!Number.isFinite(p[0]) || !Number.isFinite(p[1])) continue;
      dev = Math.max(dev, vertical ? Math.abs(p[0] - x0) : Math.abs(Math.hypot(p[0] - xc, p[1]) - Rr));
      nd = Math.max(nd, Math.abs((p[2] ** 2 + p[3] ** 2) / p[1] ** 2 - 1));
    }
    return { fw, bw, xc, Rr, dev, nd, cons, vertical };
  }, [surf, pt, hang, typo]);
  // 上半平面画布：x∈[-3,3]，y∈[0,4]
  const W = 420, H = 300, X = x => 20 + (x + 3) / 6 * (W - 40), Y = y => H - 20 - y / 4 * (H - 40);
  const inv = (px, py) => [(px - 20) / (W - 40) * 6 - 3, (H - 20 - py) / (H - 40) * 4];
  const hpDrag = e => {
    if (e.buttons !== 1 && e.type !== "pointerdown") return;
    const p = svgPoint(hpRef.current, e), [x, y] = inv(p.x, p.y);
    setPt([Math.max(-2.8, Math.min(2.8, x)), Math.max(0.15, Math.min(3.8, y))]);
  };
  const pathHP = pts => pts.filter(p => Number.isFinite(p[0]) && Number.isFinite(p[1]) && p[1] < 50 && Math.abs(p[0]) < 50).map((p, i) => `${i ? "L" : "M"}${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join("");
  return (
    <RunCard title={R`交互图 2：测地线——数值积分测地线方程 \eqref{7.19b}`}
      lead={R`选曲面，设定起点与初速度方向（单位速度），用 RK4 积分 \eqref{7.19b}。球面上用 \eqref{7.62a}–\eqref{7.62b}，验证轨迹落在过球心的平面上（大圆，例 7.5）并检查 Clairaut 守恒量 $\sin^2\theta\,\phi'$；上半平面上用改正后的 \eqref{7.68a}–\eqref{7.68b}，验证轨迹是圆心在实轴上的半圆 \eqref{7.70}，并检查 $x'/y^2$（\eqref{7.69}）。**在左图拖动起点。**`}>
      <div style={{ marginBottom: 8 }}><Seg options={[["hp", "Poincaré 上半平面"], ["sphere", "单位球面"]]} value={surf} onChange={setSurf} />
        {surf === "hp" && <>{" "}<Seg options={[[false, "改正后的 (7.68b)"], [true, "原书印的 (7.68b)"]]} value={typo} onChange={setTypo} /></>}</div>
      {surf === "hp" && hd && <>
        <Row>
          <svg ref={hpRef} viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ ...svgStyle, cursor: "crosshair" }}
            onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); hpDrag(e); }} onPointerMove={hpDrag}>
            <line x1={10} y1={Y(0)} x2={W - 10} y2={Y(0)} stroke={INK} />
            <text x={W - 14} y={Y(0) - 6} fontSize="11" fill={GRAY} textAnchor="end">y = 0（无穷远）</text>
            {[-2, -1, 0, 1, 2].map(x => <g key={x}><line x1={X(x)} y1={Y(0)} x2={X(x)} y2={Y(0) + 4} stroke={INK} /><text x={X(x)} y={Y(0) + 15} fontSize="10" textAnchor="middle" fill={GRAY}>{x}</text></g>)}
            {[1, 2, 3].map(y => <g key={y}><line x1={X(-3)} y1={Y(y)} x2={X(3)} y2={Y(y)} stroke={GRAY} strokeOpacity="0.2" /><text x={X(-3) + 2} y={Y(y) - 2} fontSize="10" fill={GRAY}>y={y}</text></g>)}
            {!typo && !hd.vertical && <circle cx={X(hd.xc)} cy={Y(0)} r={hd.Rr / 6 * (W - 40)} fill="none" stroke={GOLD} strokeDasharray="5 4" strokeWidth="1.2" />}
            {!hd.vertical && Number.isFinite(hd.xc) && Math.abs(hd.xc) < 3 && <circle cx={X(hd.xc)} cy={Y(0)} r={3} fill={GOLD} />}
            <path d={pathHP(hd.fw)} fill="none" stroke={typo ? RED : BLUE} strokeWidth="2.4" />
            <path d={pathHP(hd.bw)} fill="none" stroke={typo ? RED : BLUE} strokeWidth="2.4" strokeOpacity="0.5" />
            <Arrow x1={X(pt[0])} y1={Y(pt[1])} x2={X(pt[0]) + 34 * Math.cos(hang)} y2={Y(pt[1]) - 34 * Math.sin(hang)} color={GREEN} w={2.4} />
            <circle cx={X(pt[0])} cy={Y(pt[1])} r={6} fill={GREEN} stroke="#fff" strokeWidth="2" />
          </svg>
          <div style={{ minWidth: 260, flex: 1 }}>
            <Slider label="初速度方向（与 x 轴夹角）" value={hang} min={-3.1} max={3.1} step={0.01} onChange={setHang} fmt={v => v.toFixed(2)} />
            <Tbl head={["Christoffel 符号（起点）", "数值"]} rows={[
              [R`$\Gamma^x{}_{xy}=\Gamma^x{}_{yx}=-1/y$`, f4(-1 / pt[1])],
              [R`$\Gamma^y{}_{xx}=1/y$`, f4(1 / pt[1])],
              [R`$\Gamma^y{}_{yy}=-1/y$`, f4(-1 / pt[1])],
              [R`其余（$\Gamma^x{}_{xx},\Gamma^x{}_{yy},\Gamma^y{}_{xy}$）`, "0"],
            ]} />
          </div>
        </Row>
        <Tbl head={["检验", "数值（沿整条曲线的最大偏差）", "预期"]} rows={[
          [hd.vertical ? R`偏离竖直线 $x=x_0$` : R`偏离半圆 $(x-x_0)^2+y^2=R^2$（\eqref{7.70}）`, f6(hd.dev), "0"],
          [R`单位速度 $(x'^2+y'^2)/y^2-1$`, f6(hd.nd), "0"],
          [R`守恒量 $x'/y^2$（\eqref{7.69}）的漂移`, f6(hd.cons), "0"],
          [R`半圆：圆心 $x_0$ / 半径 $R$`, hd.vertical ? R`竖直测地线（$R\to\infty$）` : `${f4(hd.xc)} / ${f4(hd.Rr)}`, R`由起点与方向算出`],
        ]} />
        <Row gap={10}>
          <Check ok={!typo && hd.dev < 1e-6} label={typo ? "原书 (7.68b)：轨迹不是半圆" : "测地线是圆心在实轴上的半圆"} detail={typo ? "改正后的方程才给出 (7.70)" : `最大偏差 ${f6(hd.dev)}`} />
          <Check ok={hd.nd < 1e-6} label="度规长度守恒（仿射参数）" detail={`最大偏差 ${f6(hd.nd)}`} />
        </Row>
      </>}
      {surf === "sphere" && sd && <>
        <Row>
          <SphereView cam={cam}>{({ P, front, poly }) => <>
            <path d={poly(sd.xyz, false)} fill="none" stroke={BLUE} strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.6" />
            <path d={poly(sd.xyz, true)} fill="none" stroke={BLUE} strokeWidth="2.5" />
            {front(sd.xyz[0]) && (() => { const [x, y] = P(sd.xyz[0]); return <circle cx={x} cy={y} r={6} fill={GREEN} stroke="#fff" strokeWidth="2" />; })()}
          </>}</SphereView>
          <div style={{ minWidth: 260, flex: 1 }}>
            <Slider label={R`起点 $\theta_0$`} value={th0} min={0.15} max={3.0} step={0.01} onChange={setTh0} fmt={v => v.toFixed(2)} />
            <Slider label={R`方向（与 $\hat e_\theta$ 的夹角）`} value={ang} min={-3.1} max={3.1} step={0.01} onChange={setAng} fmt={v => v.toFixed(2)} />
            <Slider label="弧长 L" value={L} min={0.5} max={6.28} step={0.01} onChange={setL} fmt={v => v.toFixed(2)} />
            <Slider label="视角" value={az} min={-3.14} max={3.14} step={0.01} onChange={setAz} fmt={v => v.toFixed(2)} />
            <Tbl head={["Christoffel 符号（起点）", "数值"]} rows={[
              [R`$\Gamma^\theta{}_{\phi\phi}=-\sin\theta\cos\theta$`, f4(-Math.sin(th0) * Math.cos(th0))],
              [R`$\Gamma^\phi{}_{\theta\phi}=\cot\theta$`, f4(Math.cos(th0) / Math.sin(th0))],
            ]} />
          </div>
        </Row>
        <Tbl head={["检验", "沿曲线的最大偏差", "预期"]} rows={[
          [R`到初始大圆平面的距离`, f6(sd.dev), "0（例 7.5：测地线是大圆）"],
          [R`$\theta'^2+\sin^2\theta\,\phi'^2-1$`, f6(sd.nd), "0"],
          [R`Clairaut 量 $\sin^2\theta\,\phi'$ 的漂移`, f6(sd.cl), R`0（\eqref{7.62b}）`],
        ]} />
        <Row gap={10}><Check ok={sd.dev < 1e-6} label="轨迹是大圆" detail={`偏差 ${f6(sd.dev)}`} /><Check ok={sd.cl < 1e-6} label="Clairaut 守恒" /></Row>
        <p className="muted" style={{ fontSize: 13 }}><TxI>{R`弧长 $L=2\pi$ 时测地线绕回起点：大圆的周长。`}</TxI></p>
      </>}
    </RunCard>);
}

// ============================================================
// 3. 二维度规的曲率计算器
// ============================================================
const PRESETS = {
  sphere: { name: "单位球面 (7.6)", g: ["1", "0", "sin(u)^2"], u: 1.0, v: 0.3, K: () => 1, uv: [R`\theta`, R`\phi`] },
  sphereA: { name: "半径 a=2 的球面", g: ["4", "0", "4*sin(u)^2"], u: 0.8, v: 0, K: () => 0.25, uv: [R`\theta`, R`\phi`] },
  poincare: { name: "Poincaré 上半平面 (7.67)", g: ["1/v^2", "0", "1/v^2"], u: 0.3, v: 1.5, K: () => -1, uv: ["x", "y"] },
  torus: { name: "环面 (7.7)，R=3，r=1", g: ["1", "0", "(3+cos(u))^2"], u: 0.6, v: 0, K: (u) => Math.cos(u) / (3 + Math.cos(u)), uv: [R`\theta`, R`\phi`] },
  polar: { name: "平面极坐标 (7.11)", g: ["1", "0", "u^2"], u: 1.3, v: 0, K: () => 0, uv: ["r", R`\phi`] },
  stereo: { name: "球极投影坐标中的单位球面", g: ["4/(1+u^2+v^2)^2", "0", "4/(1+u^2+v^2)^2"], u: 0.4, v: -0.7, K: () => 1, uv: ["u", "v"] },
  skew: { name: "非对角度规（自定义示例）", g: ["1+u^2", "u*v", "2+sin(v)"], u: 0.4, v: 0.6, K: null, uv: ["u", "v"] },
};
const FN = ["sin", "cos", "tan", "exp", "log", "sqrt", "sinh", "cosh", "tanh", "abs", "atan", "asin", "acos"];
function compile(src) {
  const s = src.replace(/\^/g, "**").replace(/\bpi\b/g, "PI");
  if (/[^0-9a-zA-Z_+\-*/(). ,]/.test(s)) throw new Error("非法字符");
  const ids = s.match(/[a-zA-Z_]+/g) || [];
  for (const id of ids) if (!["u", "v", "PI", ...FN].includes(id)) throw new Error(`未知名称 ${id}`);
  // eslint-disable-next-line no-new-func
  const f = new Function("u", "v", "PI", ...FN, `return (${s});`);
  return (u, v) => f(u, v, Math.PI, ...FN.map(n => Math[n]));
}
export function CurvatureLab() {
  const [key, setKey] = useState("sphere");
  const P0 = PRESETS[key];
  const [g, setG] = useState(P0.g), [u, setU] = useState(P0.u), [v, setV] = useState(P0.v);
  const choose = k => { setKey(k); setG(PRESETS[k].g); setU(PRESETS[k].u); setV(PRESETS[k].v); };
  const res = useMemo(() => {
    try {
      const fs = g.map(compile), G = (a, b) => fs.map(f => f(a, b));
      const g0 = G(u, v); if (g0.some(x => !Number.isFinite(x))) throw new Error("度规在此点无定义");
      if (g0[0] * g0[2] - g0[1] ** 2 <= 0) throw new Error("度规在此点不正定（行列式不为正）");
      const c = curvature2D(G, u, v), kb = brioschiK(G, u, v);
      return { ...c, kb };
    } catch (e) { return { err: e.message }; }
  }, [g, u, v]);
  const exact = P0.K && JSON.stringify(g) === JSON.stringify(P0.g) ? P0.K(u, v) : null;
  const [a, b] = P0.uv && JSON.stringify(g) === JSON.stringify(P0.g) ? P0.uv : ["u", "v"];
  const idx = ["1", "2"];
  return (
    <RunCard title={R`交互图 3：二维度规的 Christoffel 符号、Riemann 张量与 Gauss 曲率`}
      lead={R`选一个预设或直接改写度规分量（$u,v$ 的表达式，可用 sin cos exp log sqrt sinh cosh 与 ^），选定点 $(u,v)$。程序按 \eqref{7.53} 用中心差分算 $\Gamma^k{}_{ij}$，再按 \eqref{7.42} 算 $R^1{}_{212}$，由 \eqref{7.89} 得 $K=R_{1212}/\det g$，并缩并出 $\sym{Ric}{\mathit{Ric}}_{\mu\nu}$（\eqref{7.50b}）与 $\mathcal R$（\eqref{7.51}）。**独立核对**：Brioschi 公式只用 $g$ 的一、二阶导数，与 \eqref{7.42} 的路线完全无关。`}>
      <div style={{ marginBottom: 8 }}><select value={key} onChange={e => choose(e.target.value)}>
        {Object.entries(PRESETS).map(([k, p]) => <option key={k} value={k}>{p.name}</option>)}</select></div>
      <Row gap={10}>
        {["g_{11}", "g_{12}", "g_{22}"].map((l, i) => <label key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}><TxI>{`$${l}=$`}</TxI>
          <input value={g[i]} onChange={e => setG(g.map((x, j) => (j === i ? e.target.value : x)))} style={{ width: 150, fontFamily: "monospace" }} /></label>)}
      </Row>
      <Row gap={24}>
        <Slider label={`点 $u$（$${a}$）`} value={u} min={-3} max={3} step={0.01} onChange={setU} fmt={x => x.toFixed(2)} />
        <Slider label={`点 $v$（$${b}$）`} value={v} min={-3} max={3} step={0.01} onChange={setV} fmt={x => x.toFixed(2)} />
      </Row>
      {res.err ? <p style={{ color: RED }}>无法计算：{res.err}</p> : <>
        <Row gap={20}>
          <Tbl head={["Christoffel 符号", "数值"]} rows={[0, 1].flatMap(k => [[0, 0], [0, 1], [1, 1]].map(([i, j]) => [R`$\Gamma^${idx[k]}{}_{${idx[i]}${idx[j]}}$`, f6(res.Gamma[k][i][j])]))} />
          <Tbl head={["曲率", "数值"]} rows={[
            [R`$R^1{}_{212}$`, f6(res.R1212up)],
            [R`$R_{1212}=g_{1\kappa}R^\kappa{}_{212}$`, f6(res.R1212)],
            [R`$\det g$`, f6(res.det)],
            [R`$K=R_{1212}/\det g$`, <b>{f6(res.K)}</b>],
            [R`$K$（Brioschi 公式）`, f6(res.kb)],
            [R`$\mathcal R/2$`, f6(res.scalar / 2)],
            [R`$\sym{Ric}{\mathit{Ric}}_{11},\ \sym{Ric}{\mathit{Ric}}_{12},\ \sym{Ric}{\mathit{Ric}}_{22}$`, `${f4(res.Ric[0][0])}, ${f4(res.Ric[0][1])}, ${f4(res.Ric[1][1])}`],
            [R`$K\,g_{11},\ K\,g_{12},\ K\,g_{22}$`, `${f4(res.K * res.g[0][0])}, ${f4(res.K * res.g[0][1])}, ${f4(res.K * res.g[1][1])}`],
            ...(exact != null ? [[R`精确值 $K$`, f6(exact)]] : []),
          ]} />
        </Row>
        <Row gap={10}>
          <Check ok={Math.abs(res.K - res.kb) < 1e-4 * Math.max(1, Math.abs(res.K))} label="(7.42) 路线 = Brioschi 公式" detail={`差 ${f6(res.K - res.kb)}`} />
          <Check ok={Math.abs(res.scalar / 2 - res.K) < 1e-4 * Math.max(1, Math.abs(res.K))} label={R`$K=\mathcal R/2$（习题 7.13）`} />
          <Check ok={Math.abs(res.Ric[0][1] - res.K * res.g[0][1]) + Math.abs(res.Ric[0][0] - res.K * res.g[0][0]) < 1e-3 * Math.max(1, Math.abs(res.K * res.g[0][0]))} label={R`$\sym{Ric}{\mathit{Ric}}_{\mu\nu}=Kg_{\mu\nu}$`} />
          {exact != null && <Check ok={Math.abs(res.K - exact) < 1e-4 * Math.max(1, Math.abs(exact))} label="与精确值一致" detail={`精确 ${f6(exact)}`} />}
        </Row>
      </>}
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`观察：环面在外侧（$\theta=0$）$K>0$、内侧（$\theta=\pi$）$K<0$；极坐标平面 $\Gamma\neq0$ 而 $K=0$——$\Gamma$ 不是张量，曲率才是；球极投影坐标与 $(\theta,\phi)$ 坐标给出同一个 $K=1$。`}</TxI></p>
    </RunCard>);
}
