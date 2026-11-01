// 第 3 章自绘插图（SVG）。配色：Si 灰、SiO₂ 浅蓝、熔融硅橙、石墨深灰、石英坩埚浅青、晶面紫、晶向红。
import { useState } from "react";
import { M } from "@kit";
import { fz1, lambdaNm } from "./_ch03_phys.jsx";

const R = String.raw;
export const C = { si: "#8b9099", siL: "#c9ccd2", ox: "#bcdcf2", melt: "#f0a65a", graphite: "#4a4d52", quartz: "#d8eef0", plane: "#b07cc6", dir: "#c0392b", ink: "#2a2d33", muted: "#6b6f76", red: "#c0392b", blue: "#3f78b5", orange: "#c2603a", green: "#2f8f5b", gold: "#d9a21b", hl: "#f2b134" };
const panel = { background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 12, padding: 12, color: C.ink };
const btn = on => ({ padding: "5px 10px", borderRadius: 7, border: `1px solid ${on ? C.blue : "#bcb6a9"}`, background: on ? "#e2eef7" : "#fffdf8", cursor: "pointer", fontSize: 14 });
function Svg({ w = 680, h = 300, title, children, max = 680 }) {
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} style={{ width: "100%", maxWidth: max, display: "block", margin: "0 auto", fontFamily: "system-ui, sans-serif", fontSize: 14 }}><title>{title}</title>
    <defs><marker id="c3arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="context-stroke" /></marker></defs>{children}</svg>;
}
const Arrow = ({ x1, y1, x2, y2, color = C.ink, w = 2, dash }) => <line {...{ x1, y1, x2, y2 }} stroke={color} strokeWidth={w} strokeDasharray={dash} markerEnd="url(#c3arr)" />;
// 斜二测投影
const cab = (ox, oy, s) => ([x, y, z]) => [ox + s * (x + 0.42 * y), oy - s * (z + 0.3 * y)];
function Cube({ P, n = 1, color = "#9a948a" }) {
  const E = [[0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1], [1, 0, 0, 1, 1, 0], [1, 0, 0, 1, 0, 1], [0, 1, 0, 1, 1, 0], [0, 1, 0, 0, 1, 1], [0, 0, 1, 1, 0, 1], [0, 0, 1, 0, 1, 1], [1, 1, 0, 1, 1, 1], [1, 0, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1]];
  return <g>{E.map((e, i) => { const a = P(e.slice(0, 3).map(v => v * n)), b = P(e.slice(3).map(v => v * n)); const hidden = e[1] === 1 && e[4] === 1 && (e[0] === 0 && e[3] === 0 || e[2] === 0 && e[5] === 0); return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} strokeWidth="1.5" strokeDasharray={hidden ? "4 3" : undefined} />; })}</g>;
}

// ---------- 图 3.1 简单立方、体心立方、面心立方 ----------
export function UnitCellsFig() {
  const corners = []; for (let i = 0; i < 8; i++) corners.push([i & 1, (i >> 1) & 1, (i >> 2) & 1]);
  const faces = [[.5, .5, 0], [.5, .5, 1], [.5, 0, .5], [.5, 1, .5], [0, .5, .5], [1, .5, .5]];
  const cells = [["简单立方", [], 40], ["BCC 体心立方", [[.5, .5, .5]], 265], ["FCC 面心立方", faces, 490]];
  return <Svg h={250} title="三种简单立方晶胞">
    {cells.map(([t, extra, ox], ci) => { const P = cab(ox, 200, 120); return <g key={t}>
      <Cube P={P} />
      {[...corners.map(p => [p, false]), ...extra.map(p => [p, true])].sort((a, b) => b[0][1] - a[0][1]).map(([p, ex], i) => { const q = P(p); return <circle key={i} cx={q[0]} cy={q[1]} r="9" fill={ex ? C.red : C.si} stroke="#fff" />; })}
      <text x={ox + 80} y={238} textAnchor="middle" fontSize="15">{t}</text>
      {ci === 0 && <g>{(() => { const A = P([0, 0, 0]), B = P([1, 1, 1]), Cc = P([0, 1, 0]); return <>
        <Arrow x1={A[0]} y1={A[1]} x2={B[0] - 6} y2={B[1] + 6} color={C.dir} w={2.5} /><Arrow x1={A[0]} y1={A[1]} x2={Cc[0] - 7} y2={Cc[1] + 4} color={C.blue} w={2.5} />
        <text x={A[0] - 16} y={A[1] + 16}>A</text><text x={B[0] + 8} y={B[1] - 6}>B</text><text x={Cc[0] - 20} y={Cc[1] - 4}>C</text>
        <text x={A[0] + 60} y={A[1] - 92} fill={C.dir} fontSize="13">[111]</text><text x={Cc[0] - 6} y={Cc[1] + 24} fill={C.blue} fontSize="13">[010]</text>
        <text x={P([.5, 0, 0])[0]} y={A[1] + 18} fontSize="13">a</text></>; })()}</g>}
    </g>; })}
    {(() => { const P = cab(40, 200, 120), o = P([0, 0, 0]); return <g fontSize="12" fill={C.muted}><text x={o[0] + 130} y={o[1] + 4}>x</text><text x={o[0] + 60} y={o[1] - 42}>y</text><text x={o[0] - 12} y={o[1] - 128}>z</text></g>; })()}
  </Svg>;
}

// ---------- 图 3.2 交互版：Miller 指数练习 ----------
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const OPTS = [["1", 1], ["2", 2], ["3", 3], ["4", 4], ["1/2", .5], ["−1", -1], ["−2", -2], ["无穷大", Infinity]];
export function millerFromIntercepts(xs) {
  // 倒数 → 乘以最小公倍数化为互质整数
  const rec = xs.map(v => (v === Infinity ? 0 : 1 / v));
  let best = null;
  for (let m = 1; m <= 60 && !best; m++) { const t = rec.map(r => r * m); if (t.every(v => Math.abs(v - Math.round(v)) < 1e-9)) best = t.map(Math.round); }
  if (!best) return null;
  const g = best.reduce((a, b) => gcd(a, b), 0) || 1; return best.map(v => v / g);
}
const fmtIdx = h => h.map(v => (v < 0 ? `\\bar{${-v}}` : `${v}`)).join("");
export function MillerTrainer() {
  const [ix, setIx] = useState([0, 0, 7]);   // 1,1,∞ → (110)
  const xs = ix.map(i => OPTS[i][1]), hkl = millerFromIntercepts(xs);
  const allInf = xs.every(v => v === Infinity);
  const P = cab(150, 245, 46);
  // 画平面：取三根轴上的截点（∞ 的轴方向平行延伸），在 [-2.5,4.5] 盒子内截出多边形
  const poly = (() => {
    if (!hkl || allInf) return [];
    const h = hkl, j = xs.findIndex(v => v !== Infinity), d = h[j] * xs[j];   // h·x = d，由任一有限截距给出
    const lim = [-2.4, 4.4], pts = [];
    const corners = []; for (let i = 0; i < 8; i++) corners.push([i & 1 ? lim[1] : lim[0], i & 2 ? lim[1] : lim[0], i & 4 ? lim[1] : lim[0]]);
    const f = p => h[0] * p[0] + h[1] * p[1] + h[2] * p[2] - d;
    for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const diff = [0, 1, 2].filter(k => corners[i][k] !== corners[j][k]).length; if (diff !== 1) continue; const fa = f(corners[i]), fb = f(corners[j]); if (fa * fb < 0) { const t = fa / (fa - fb); pts.push(corners[i].map((v, k) => v + t * (corners[j][k] - v))); } }
    if (pts.length < 3) return [];
    const c = [0, 1, 2].map(k => pts.reduce((s, p) => s + p[k], 0) / pts.length), q = pts.map(p => P(p)), cq = P(c);
    return q.map((p, i) => [p, Math.atan2(p[1] - cq[1], p[0] - cq[0])]).sort((a, b) => a[1] - b[1]).map(a => a[0]);
  })();
  const o = P([0, 0, 0]);
  const steps = hkl ? R`\text{截距 } (${xs.map(v => v === Infinity ? "\\infty" : v === .5 ? "\\tfrac12" : v).join(",\\ ")})\ \to\ \text{倒数 } (${xs.map(v => v === Infinity ? "0" : v === .5 ? "2" : Number.isInteger(1 / v) ? 1 / v : `\\tfrac{1}{${v}}`).join(",\\ ")})\ \to\ (\mathrm{${fmtIdx(hkl)}})` : "";
  return <div style={panel}>
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 14, alignItems: "center" }}>
      {["x", "y", "z"].map((a, k) => <label key={a}>{a} 轴截距 <select value={ix[k]} onChange={e => setIx(s => s.map((v, j) => (j === k ? +e.target.value : v)))}>{OPTS.map(([t], i) => <option key={i} value={i}>{t}</option>)}</select></label>)}
      <span>示例：{[[[0, 0, 7], "(110)"], [[0, 7, 7], "(100)"], [[0, 0, 0], "(111)"], [[2, 3, 1], "(436)"], [[0, 5, 1], "(2 2̄ 1)"]].map(([v, t]) => <button key={t} style={{ ...btn(false), marginLeft: 4 }} onClick={() => setIx(v)}>{t}</button>)}</span>
    </div>
    <Svg h={330} title="由截距求 Miller 指数">
      {[[[4.4, 0, 0], "x"], [[0, 4.4, 0], "y"], [[0, 0, 4.4], "z"]].map(([p, t]) => { const q = P(p), m = P(p.map(v => -v * 0.5)); return <g key={t}><line x1={m[0]} y1={m[1]} x2={q[0]} y2={q[1]} stroke="#8a857c" strokeWidth="1.3" markerEnd="url(#c3arr)" /><text x={q[0] + 6} y={q[1]} fill={C.muted}>{t}</text>{[1, 2, 3, 4].map(k => { const r = P(p.map(v => v / 4.4 * k)); return <circle key={k} cx={r[0]} cy={r[1]} r="2.5" fill="#8a857c" />; })}</g>; })}
      {poly.length > 2 && <polygon points={poly.map(p => p.join(",")).join(" ")} fill={C.plane} fillOpacity=".3" stroke={C.plane} strokeWidth="2" />}
      {xs.map((v, k) => v === Infinity ? null : (() => { const p = [0, 0, 0]; p[k] = v; const q = P(p); return <circle key={k} cx={q[0]} cy={q[1]} r="6" fill={C.plane} stroke="#fff" />; })())}
      {hkl && !allInf && (() => { const L = Math.hypot(...hkl), t = P(hkl.map(v => 1.6 * v / L)); return <g><Arrow x1={o[0]} y1={o[1]} x2={t[0]} y2={t[1]} color={C.dir} w={3} /><text x={t[0] + 6} y={t[1] - 6} fill={C.dir}>[{hkl.map(v => v < 0 ? `−${-v}` : v).join("")}]</text></g>; })()}
      <g transform="translate(420,40)" fontSize="15">
        <text>Miller 指数</text>
        <text y="40" fontSize="30" fill={C.plane}>{hkl && !allInf ? `(${hkl.map(v => v < 0 ? `−${-v}` : v).join(" ")})` : "—"}</text>
        <text y="80" fill={C.muted} fontSize="13">红箭头：同指数晶向 [hkl]，</text>
        <text y="98" fill={C.muted} fontSize="13">在立方晶系中垂直于 (hkl) 面</text>
      </g>
    </Svg>
    {hkl && !allInf ? <p style={{ textAlign: "center", margin: 4 }}><M>{steps}</M></p> : <p style={{ textAlign: "center" }}>三个截距都为 ∞ 时不构成平面。</p>}
  </div>;
}

// 静态版图 3.2：三种常见晶面与晶向
export function PlanesFig() {
  const items = [["(100)", [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]], [1, 0, 0], "[100]"], ["(110)", [[1, 0, 0], [0, 1, 0], [0, 1, 1], [1, 0, 1]], [1, 1, 0], "[110]"], ["(111)", [[1, 0, 0], [0, 1, 0], [0, 0, 1]], [1, 1, 1], "[111]"]];
  return <Svg h={230} title="立方晶格的三种主要晶面与晶向">{items.map(([t, poly, d, dl], i) => {
    const P = cab(50 + i * 220, 190, 120), o = P([0, 0, 0]), e = P(d.map(v => v * (i === 0 ? 1.3 : 1)));
    return <g key={t}><Cube P={P} /><polygon points={poly.map(p => P(p).join(",")).join(" ")} fill={C.plane} fillOpacity=".35" stroke={C.plane} strokeWidth="2" />
      <Arrow x1={o[0]} y1={o[1]} x2={e[0]} y2={e[1]} color={C.dir} w={3} /><text x={e[0] + 4} y={e[1] - 6} fill={C.dir} fontSize="13">{dl}</text>
      <text x={o[0] + 70} y={222} textAnchor="middle" fill={C.plane} fontSize="15">{t} 面</text></g>;
  })}</Svg>;
}

// ---------- 图 3.4 交互版：禁带宽度 vs 晶格常数，配合式 (3.1) ----------
// 数据为常用文献值（室温），六方材料的"晶格常数"取 a 轴，与原书图一致
const MATS = [["Si", 5.431, 1.12, 0], ["Ge", 5.658, 0.66, 0], ["GaAs", 5.653, 1.42, 1], ["InP", 5.869, 1.34, 1], ["GaP", 5.451, 2.26, 0], ["AlAs", 5.661, 2.16, 0], ["AlP", 5.463, 2.45, 0], ["InAs", 6.058, 0.35, 1], ["GaSb", 6.096, 0.73, 1], ["InSb", 6.479, 0.17, 1], ["AlSb", 6.136, 1.62, 0],
  ["ZnS", 5.41, 3.6, 1], ["ZnSe", 5.668, 2.7, 1], ["ZnTe", 6.10, 2.26, 1], ["CdS", 5.83, 2.42, 1], ["CdSe", 6.05, 1.74, 1], ["CdTe", 6.48, 1.5, 1], ["MgSe", 5.89, 4.0, 1], ["MgTe", 6.42, 3.5, 1],
  ["3C-SiC", 4.36, 2.36, 0], ["4H-SiC", 3.07, 3.26, 0], ["hex-GaN", 3.19, 3.42, 1], ["cubic-GaN", 4.50, 3.2, 1], ["hex-AlN", 3.11, 6.1, 1], ["cubic-AlN", 4.38, 5.1, 0], ["hex-InN", 3.54, 0.7, 1], ["cubic-InN", 4.98, 0.6, 1]];
function wl2rgb(nm) {
  let r = 0, g = 0, b = 0;
  if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; } else if (nm < 490) { g = (nm - 440) / 50; b = 1; } else if (nm < 510) { g = 1; b = -(nm - 510) / 20; } else if (nm < 580) { r = (nm - 510) / 70; g = 1; } else if (nm < 645) { r = 1; g = -(nm - 645) / 65; } else if (nm <= 750) r = 1;
  const f = nm < 380 || nm > 750 ? 0 : nm < 420 ? .3 + .7 * (nm - 380) / 40 : nm > 700 ? .3 + .7 * (750 - nm) / 50 : 1;
  return nm < 380 || nm > 750 ? null : `rgb(${Math.round(255 * r * f)},${Math.round(255 * g * f)},${Math.round(255 * b * f)})`;
}
export function BandgapChart() {
  const [sel, setSel] = useState("GaAs");
  const W = 680, H = 400, m = { l: 60, r: 20, t: 18, b: 46 }, x = a => m.l + (a - 3) / 4 * (W - m.l - m.r), y = e => m.t + (6.5 - e) / 6.5 * (H - m.t - m.b);
  const cur = MATS.find(r => r[0] === sel), lam = lambdaNm(cur[2]), col = wl2rgb(lam);
  return <div style={panel}>
    <Svg w={W} h={H} title="禁带宽度与晶格常数">
      {/* 可见光带：1.65–3.26 eV */}
      {Array.from({ length: 60 }, (_, i) => { const e0 = 1.65 + i * (3.26 - 1.65) / 60, e1 = e0 + (3.26 - 1.65) / 60; return <rect key={i} x={m.l} y={y(e1)} width={W - m.l - m.r} height={y(e0) - y(e1) + .5} fill={wl2rgb(lambdaNm((e0 + e1) / 2))} opacity=".22" />; })}
      {[0, 1, 2, 3, 4, 5, 6].map(e => <g key={e}><line x1={m.l} x2={W - m.r} y1={y(e)} y2={y(e)} stroke="#e4dfd5" /><text x={m.l - 8} y={y(e) + 5} textAnchor="end">{e}</text></g>)}
      {[3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7].map(a => <g key={a}><line y1={m.t} y2={H - m.b} x1={x(a)} x2={x(a)} stroke="#eee9df" /><text x={x(a)} y={H - m.b + 18} textAnchor="middle">{a.toFixed(1)}</text></g>)}
      <text x={(W + m.l) / 2} y={H - 8} textAnchor="middle">晶格常数（Å；六方材料取 a 轴）</text>
      <text transform={`translate(16,${(H - m.b + m.t) / 2}) rotate(-90)`} textAnchor="middle">禁带宽度 E<tspan dy="4" fontSize="10">G</tspan><tspan dy="-4">（eV）</tspan></text>
      <path d={`M${x(3.11)},${y(6.1)} Q${x(3.2)},${y(3.5)} ${x(3.19)},${y(3.42)} Q${x(3.35)},${y(2.0)} ${x(3.54)},${y(0.7)}`} fill="none" stroke="#999" strokeDasharray="3 3" />
      {MATS.map(([n, a, e, direct]) => <g key={n} style={{ cursor: "pointer" }} onClick={() => setSel(n)}>
        <circle cx={x(a)} cy={y(e)} r={n === sel ? 8 : 5.5} fill={direct ? C.ink : "#fff"} stroke={n === sel ? C.red : C.ink} strokeWidth={n === sel ? 3 : 1.5} />
        <text x={x(a) + 8} y={y(e) - 6} fontSize="12" fill={n === sel ? C.red : C.muted}>{n}</text></g>)}
      <g transform={`translate(${W - 210},30)`} fontSize="13"><circle r="5" fill={C.ink} /><text x="10" y="4">直接带隙</text><circle cy="20" r="5" fill="#fff" stroke={C.ink} /><text x="10" y="24">间接带隙</text></g>
    </Svg>
    <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", justifyContent: "center", fontSize: 14 }}>
      <span>点击材料：<b>{sel}</b></span>
      <M>{R`\lambda=\frac{hc}{E_G}=\frac{1239.8\ \mathrm{eV\,nm}}{${cur[2]}\ \mathrm{eV}}=${lam.toFixed(0)}\ \mathrm{nm}`}</M>
      <span style={{ display: "inline-block", width: 46, height: 20, borderRadius: 4, border: "1px solid #999", background: col || "repeating-linear-gradient(45deg,#ddd,#ddd 4px,#fff 4px,#fff 8px)" }} />
      <span style={{ color: C.muted }}>{col ? "可见光" : lam > 750 ? "红外（不可见）" : "紫外（不可见）"}{cur[3] ? "" : "；间接带隙材料发光效率低"}</span>
    </div>
  </div>;
}

// ---------- 图 3.5 六方 GaN 与 Miller–Bravais 轴 ----------
export function HexGaNFig() {
  const hx = (cx, cy, r, sy = .35) => Array.from({ length: 6 }, (_, i) => [cx + r * Math.cos(i * Math.PI / 3), cy + r * sy * Math.sin(i * Math.PI / 3)]);
  const top = hx(130, 70, 95), mid = hx(130, 150, 95), bot = hx(130, 230, 95);
  const atoms = (pts, cy, col, rr) => [...pts, [130, cy]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={rr} fill={col} stroke="#fff" />);
  const O = [530, 150], s = 90;
  const dirA = { a1: [0.5, 0.866], a2: [0.5, -0.866], a3: [-1, 0] };          // SVG 坐标（y 向下）
  const P = v => [O[0] + s * v[0], O[1] + s * v[1]];
  const half1 = P(dirA.a1.map(v => v / 2)), half2 = P(dirA.a2.map(v => v / 2)), tip = P([1, 0]);
  return <Svg h={300} title="六方 GaN 晶胞与 Miller–Bravais 坐标">
    {[top, mid, bot].map((p, i) => <polygon key={i} points={p.map(q => q.join(",")).join(" ")} fill="none" stroke="#aaa" strokeDasharray={i === 1 ? "" : "4 3"} />)}
    {top.map((p, i) => <line key={i} x1={p[0]} y1={p[1]} x2={bot[i][0]} y2={bot[i][1]} stroke="#bbb" strokeDasharray="4 3" />)}
    {atoms(bot, 230, C.blue, 11)}{atoms(hx(130, 192, 95).map(([x, y]) => [x, y]), 192, C.red, 7)}{atoms(mid, 150, C.blue, 11)}{atoms(hx(130, 112, 95), 112, C.red, 7)}{atoms(top, 70, C.blue, 11)}
    <text x="240" y="75" fill={C.blue}>Ga</text><text x="240" y="118" fill={C.red}>N</text>
    <text x="130" y="285" textAnchor="middle" fontSize="13">Ga、N 原子层交替堆叠（示意）</text>
    {/* 俯视 Miller–Bravais 轴 */}
    <polygon points={Array.from({ length: 6 }, (_, i) => P([Math.cos(i * Math.PI / 3), Math.sin(i * Math.PI / 3)]).join(",")).join(" ")} fill="#f2efe8" stroke="#888" />
    {Object.entries(dirA).map(([k, v]) => { const e = P(v.map(t => 1.35 * t)); return <g key={k}><line x1={O[0]} y1={O[1]} x2={e[0]} y2={e[1]} stroke="#555" strokeDasharray="5 4" markerEnd="url(#c3arr)" /><text x={e[0] + (k === "a3" ? -24 : 6)} y={e[1] + (k === "a1" ? 14 : -4)}>{{ a1: "a₁", a2: "a₂", a3: "a₃" }[k]}</text></g>; })}
    <Arrow x1={O[0]} y1={O[1]} x2={tip[0] + 30} y2={tip[1]} color={C.dir} w={3} />
    <line x1={half1[0]} y1={half1[1]} x2={tip[0]} y2={tip[1]} stroke={C.dir} strokeDasharray="3 3" /><line x1={half2[0]} y1={half2[1]} x2={tip[0]} y2={tip[1]} stroke={C.dir} strokeDasharray="3 3" />
    <circle cx={half1[0]} cy={half1[1]} r="4" fill={C.dir} /><circle cx={half2[0]} cy={half2[1]} r="4" fill={C.dir} /><circle cx={tip[0]} cy={tip[1]} r="4.5" fill={C.ink} />
    <text x={half1[0] - 44} y={half1[1] + 4} fontSize="13">a₁/2</text><text x={half2[0] - 44} y={half2[1] + 2} fontSize="13">a₂/2</text><text x={tip[0] + 6} y={tip[1] - 10} fontSize="13">−a₃</text>
    <text x={tip[0] + 2} y={tip[1] + 26} fill={C.dir} fontSize="14">[11<tspan textDecoration="overline">2</tspan>0]</text>
    <text x="530" y="285" textAnchor="middle" fontSize="13">俯视：投影 (½, ½, −1, 0) → [11<tspan textDecoration="overline">2</tspan>0]</text>
  </Svg>;
}

// ---------- 图 3.6 Miller–Bravais 体系中的晶面与晶向 ----------
export function MillerBravaisFig() {
  const panelHex = (ox, kind) => {
    const O = [ox, 140], s = 80, P = v => [O[0] + s * v[0], O[1] + s * v[1]];
    const dirA = { a1: [0.5, 0.866], a2: [0.5, -0.866], a3: [-1, 0] };
    const hex = Array.from({ length: 6 }, (_, i) => P([Math.cos(i * Math.PI / 3), Math.sin(i * Math.PI / 3)]));
    // (11-20)：截距 a1=1, a2=1, a3=−1/2 → 垂直于 −a3 的直线 x = 1（经过 a1、a2 端点）
    // (01-10)：截距 a1=∞, a2=−1, a3=1 → 平行于 a1 的直线，经过 −a2 与 a3 端点
    const line = kind === 0 ? [P([1, -1.25]), P([1, 1.25])] : (() => { const A = P([-0.5, 0.866]), B = P([-1, 0]); const dx = B[0] - A[0], dy = B[1] - A[1]; return [[A[0] - 0.9 * dx, A[1] - 0.9 * dy], [B[0] + 0.9 * dx, B[1] + 0.9 * dy]]; })();
    const dir = kind === 0 ? [1, 0] : [-0.75, 0.433];   // [01-10]：投影 (0,−1,1,0) → −a2 + a3
    const dn = Math.hypot(...dir), e = P(dir.map(v => 1.25 * v / dn));
    return <g key={kind}>
      <polygon points={hex.map(p => p.join(",")).join(" ")} fill="#f2efe8" stroke="#888" />
      {Object.entries(dirA).map(([k, v]) => { const t = P(v.map(q => 1.4 * q)); return <g key={k}><line x1={O[0]} y1={O[1]} x2={t[0]} y2={t[1]} stroke="#666" strokeDasharray="5 4" markerEnd="url(#c3arr)" /><text x={t[0] + (k === "a3" ? -20 : 4)} y={t[1] + (k === "a1" ? 14 : -4)} fontSize="13">{{ a1: "a₁", a2: "a₂", a3: "a₃" }[k]}</text></g>; })}
      <line x1={line[0][0]} y1={line[0][1]} x2={line[1][0]} y2={line[1][1]} stroke={C.plane} strokeWidth="5" opacity=".75" />
      <Arrow x1={O[0]} y1={O[1]} x2={e[0]} y2={e[1]} color={C.dir} w={3} />
      <text x={ox} y="270" textAnchor="middle" fontSize="14"><tspan fill={C.plane}>{kind === 0 ? "(11" : "(0"}<tspan textDecoration="overline">{kind === 0 ? "2" : "1"}</tspan>{kind === 0 ? "0)" : "10)"} 面</tspan>　<tspan fill={C.dir}>{kind === 0 ? "[11" : "[0"}<tspan textDecoration="overline">{kind === 0 ? "2" : "1"}</tspan>{kind === 0 ? "0]" : "10]"} 方向</tspan></text>
    </g>;
  };
  return <Svg h={290} title="Miller–Bravais 体系中的晶面与晶向（俯视，晶面以紫色线表示其与底面的交线）">{panelHex(170, 0)}{panelHex(510, 1)}</Svg>;
}

// ---------- 图 3.7 二维缺陷示意（可逐项高亮）----------
const DEF = {
  V: ["空位 V", "格点上缺了一个原子（零维）"],
  I: ["间隙原子 / 间隙对 I", "多出的硅原子：纯间隙（坐在格点之间）或两个原子共享一个格点（interstitialcy）"],
  D: ["刃位错", "右侧多插入半个原子面，终止处形成一条垂直纸面的线缺陷（一维）"],
  SF: ["层错", "原子面的堆垛次序出错（沿 {111} 面多插或少一层），是二维面缺陷"],
  P: ["析出物", "杂质原子聚集成团（三维体缺陷）；此处画成占据格点的晶态析出"],
};
export function Defects2D() {
  const [on, setOn] = useState("D");
  const cols = 14, rows = 9, dx = 42, dy = 34, x0 = 40, y0 = 30;
  const atoms = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    let x = x0 + c * dx, y = y0 + r * dy, kind = "si";
    if (r === 2 && c === 3) continue;                                              // 空位
    if (r <= 3 && c >= 8) continue;                                                  // 位错上方区域另行排布
    if (r >= 6 && c >= 8 && c <= 10) kind = "p";                                       // 析出物
    if (r === 5 && c >= 1 && c <= 6) x += dx / 2;                                    // 层错：一排原子错位半个间距
    atoms.push({ x, y, kind, tag: kind === "p" ? "P" : r === 5 && c >= 1 && c <= 6 ? "SF" : "" });
  }
  // 刃位错：滑移面上方（第 0–3 行）在第 8–13 列的宽度里挤进 7 列原子，多出的半原子面（蓝）终止于第 3 行与第 4 行之间
  for (let r = 0; r <= 3; r++) for (let k = 0; k <= 6; k++) {
    const xx = x0 + 8 * dx + k * dx * (5 / 6) * (1 + (r / 3) * 0.08) ;
    atoms.push({ x: Math.min(xx, x0 + 13 * dx), y: y0 + r * dy, kind: k === 3 ? "extra" : "si", tag: "D" });
  }
  const iPure = { x: x0 + 1.5 * dx, y: y0 + 0.5 * dy }, iPair = [{ x: x0 + 5 * dx - 9, y: y0 + 7 * dy }, { x: x0 + 5 * dx + 9, y: y0 + 7 * dy }];
  const col = a => a.kind === "p" ? C.orange : a.kind === "extra" ? C.blue : C.si;
  const hl = t => on === t;
  return <div style={panel}>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>{Object.entries(DEF).map(([k, [t]]) => <button key={k} style={btn(on === k)} onClick={() => setOn(k)}>{t}</button>)}</div>
    <Svg h={330} title="晶体中常见缺陷的二维示意">
      {atoms.filter(a => !(a.x === x0 + 5 * dx && a.y === y0 + 7 * dy)).map((a, i) => <circle key={i} cx={a.x} cy={a.y} r={a.kind === "p" ? 12 : 11} fill={col(a)} opacity={on && a.tag !== on && !(on === "V" || on === "I") ? .45 : 1} stroke={hl(a.tag) ? C.hl : "#fff"} strokeWidth={hl(a.tag) ? 3 : 1} />)}
      <rect x={x0 + 3 * dx - 13} y={y0 + 2 * dy - 13} width="26" height="26" fill="none" stroke={hl("V") ? C.hl : "#999"} strokeWidth={hl("V") ? 3 : 1} strokeDasharray="3 2" />
      <text x={x0 + 3 * dx} y={y0 + 2 * dy + 5} textAnchor="middle" fontWeight="bold">V</text>
      <circle cx={iPure.x} cy={iPure.y} r="10" fill={C.red} stroke={hl("I") ? C.hl : "#fff"} strokeWidth={hl("I") ? 3 : 1} />
      {iPair.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="10" fill={C.red} stroke={hl("I") ? C.hl : "#fff"} strokeWidth={hl("I") ? 3 : 1} />)}
      <text x={iPure.x + 14} y={iPure.y - 8} fill={C.red} fontWeight="bold">I</text><text x={iPair[1].x + 14} y={iPair[1].y - 12} fill={C.red} fontWeight="bold">I</text>
      <text x={x0 + 10.5 * dx} y={y0 + 3.5 * dy + 8} textAnchor="middle" fontSize="22" fill={hl("D") ? C.hl : C.blue}>⊥</text>
      <rect x={x0 + 0.5 * dx} y={y0 + 5 * dy - 15} width={6.5 * dx} height="30" fill="none" stroke={hl("SF") ? C.hl : "transparent"} strokeWidth="2" rx="8" />
      <rect x={x0 + 7.5 * dx} y={y0 + 6 * dy - 16} width={3 * dx} height={2 * dy + 32} fill="none" stroke={hl("P") ? C.hl : "transparent"} strokeWidth="2" rx="8" />
    </Svg>
    <p style={{ textAlign: "center", margin: 4, fontSize: 14 }}><b>{DEF[on][0]}</b>：{DEF[on][1]}</p>
  </div>;
}

// ---------- 图 3.11 交互版：空位能级与费米能级 ----------
export function VacancyLevels({ lev = { m: 0.19, mm: 0.42, p: 0.29 } }) {
  const [ef, setEf] = useState(0.25);   // E_F - E_i（eV）
  const Eg = 1.12, W = 520, H = 260, y = e => 130 - e / (Eg / 2) * 105;        // e 以 E_i 为零点
  const levels = [["=", lev.mm, "受主"], ["-", lev.m, "受主"], ["+", -lev.p, "施主"]];
  const Vl = t => <>V<tspan dy="-7" fontSize="11">{t === "-" ? "\u2212" : t}</tspan></>;
  const state = ef > lev.mm ? "=" : ef > lev.m ? "-" : ef < -lev.p ? "+" : "0";
  return <div style={panel}>
    <Svg w={W} h={H} title="空位能级与费米能级" max={560}>
      <rect x="80" y={y(Eg / 2)} width="300" height={y(-Eg / 2) - y(Eg / 2)} fill="#f6f3ec" />
      <line x1="80" x2="380" y1={y(Eg / 2)} y2={y(Eg / 2)} stroke={C.ink} strokeWidth="3" /><text x="70" y={y(Eg / 2) + 5} textAnchor="end">E<tspan dy="4" fontSize="10">C</tspan></text>
      <line x1="80" x2="380" y1={y(-Eg / 2)} y2={y(-Eg / 2)} stroke={C.ink} strokeWidth="3" /><text x="70" y={y(-Eg / 2) + 5} textAnchor="end">E<tspan dy="4" fontSize="10">V</tspan></text>
      <line x1="80" x2="380" y1={y(0)} y2={y(0)} stroke="#888" strokeDasharray="6 5" /><text x="70" y={y(0) + 5} textAnchor="end">E<tspan dy="4" fontSize="10">i</tspan></text>
      {levels.map(([t, e, k]) => <g key={t}><line x1="80" x2="380" y1={y(e)} y2={y(e)} stroke={state === t ? C.red : "#555"} strokeWidth={state === t ? 3 : 1.8} /><text x="390" y={y(e) + 5} fill={state === t ? C.red : C.ink}>{Vl(t)}<tspan dy="7">（{k}）</tspan></text></g>)}
      <line x1="80" x2="380" y1={y(ef)} y2={y(ef)} stroke={C.blue} strokeWidth="2.5" strokeDasharray="10 5" /><text x="70" y={y(ef) + 5} textAnchor="end" fill={C.blue}>E<tspan dy="4" fontSize="10">F</tspan></text>
    </Svg>
    <label style={{ display: "block", fontSize: 14, maxWidth: 460, margin: "0 auto" }}>拖动费米能级 <M>{R`E_F-E_i=${ef.toFixed(2)}\ \mathrm{eV}`}</M>（负：P 型；正：N 型）<input type="range" min={-0.5} max={0.5} step={0.01} value={ef} onChange={e => setEf(+e.target.value)} style={{ width: "100%" }} /></label>
    <p style={{ textAlign: "center", margin: 4 }}>主导的带电空位：<M>{`\\mathrm{V}^{${state}}`}</M>　{state === "0" ? <>（<M>{R`E_F`}</M> 位于 <M>{R`\mathrm{V}^+`}</M> 之上、<M>{R`\mathrm{V}^-`}</M> 之下：各能级都不电离）</> : state === "+" ? <>（<M>{R`E_F`}</M> 低于施主能级：空位放出电子带正电）</> : <>（<M>{R`E_F`}</M> 高于受主能级：空位俘获电子带负电）</>}</p>
    <p style={{ fontSize: 12, color: C.muted, textAlign: "center", margin: 0 }}>能级位置按图 3.11 的示意比例估读（相对 <M>{R`E_i`}</M>：<M>{R`\mathrm{V}^-\ {+0.19},\ \mathrm{V}^=\ {+0.42},\ \mathrm{V}^+\ {-0.29}\ \mathrm{eV}`}</M>），仅作定性说明。</p>
  </div>;
}

// ---------- 图 3.12 化合物半导体中的点缺陷 ----------
export function CompoundDefectsFig() {
  const cols = 9, rows = 6, d = 46, x0 = 120, y0 = 32, out = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const isA = (r + c) % 2 === 0; let k = isA ? "A" : "B";
    if (r === 1 && c === 2) k = "vA"; if (r === 3 && c === 6) k = "vB"; if (r === 4 && c === 2) k = "anti"; if (r === 1 && c === 7) k = "antiB";
    out.push({ x: x0 + c * d, y: y0 + r * d, k, isA });
  }
  const A = C.blue, B = C.orange;
  return <Svg h={300} title="化合物半导体 AB 中的点缺陷（二维示意）">
    {out.map((a, i) => a.k === "vA" || a.k === "vB" ? <rect key={i} x={a.x - 13} y={a.y - 13} width="26" height="26" fill="none" stroke="#888" strokeDasharray="3 2" /> :
      <circle key={i} cx={a.x} cy={a.y} r="13" fill={a.k === "A" || a.k === "antiB" ? A : B} stroke={a.k.startsWith("anti") ? C.gold : "#fff"} strokeWidth={a.k.startsWith("anti") ? 4 : 1} />)}
    <circle cx={x0 + 4.5 * d} cy={y0 + 1.5 * d} r="10" fill={A} stroke={C.hl} strokeWidth="3" />
    <circle cx={x0 + 5.5 * d} cy={y0 + 4.5 * d} r="10" fill={B} stroke={C.hl} strokeWidth="3" />
    <g fontSize="13">
      <text x={x0 + 2 * d} y={y0 + 1 * d + 30} textAnchor="middle">A 空位</text>
      <text x={x0 + 6 * d} y={y0 + 3 * d + 30} textAnchor="middle">B 空位</text>
      <text x={x0 + 4.5 * d} y={y0 + 1.5 * d - 15} textAnchor="middle">A 间隙</text>
      <text x={x0 + 5.5 * d} y={y0 + 4.5 * d + 26} textAnchor="middle">B 间隙</text>
      <text x={x0 + 2 * d} y={y0 + 4 * d + 30} textAnchor="middle">反位缺陷（B 占 A 位）</text>
      <text x={x0 + 7 * d} y={y0 + 1 * d - 18} textAnchor="middle">反位（A 占 B 位）</text>
    </g>
    <g transform="translate(20,40)" fontSize="13"><circle r="9" fill={A} /><text x="14" y="5">A（如 Ga）</text><circle cy="28" r="9" fill={B} /><text x="14" y="33">B（如 As）</text></g>
  </Svg>;
}

// ---------- CZ 炉体示意（图 3.14 与 3.21 共用）----------
function CZBody({ ox = 0, children, interface: concave = true }) {
  return <g transform={`translate(${ox},0)`}>
    {Array.from({ length: 14 }, (_, i) => <g key={i}><circle cx="20" cy={95 + i * 13} r="4" fill={C.ink} /><circle cx="300" cy={95 + i * 13} r="4" fill={C.ink} /></g>)}
    <path d="M40,90 V285 H280 V90 H262 V268 H58 V90 Z" fill="#9aa0a6" stroke="#666" />
    <path d="M58,90 V268 H262 V90 H252 V258 H68 V90 Z" fill={C.quartz} stroke="#7aa" />
    <rect x="68" y="150" width="184" height="108" fill={C.melt} />
    <rect x="135" y="285" width="50" height="40" fill={C.graphite} />
    <path d={`M100,${concave ? 152 : 150} Q160,${concave ? 178 : 150} 220,152 V70 Q220,48 195,46 Q170,44 170,30 V0 H150 V30 Q150,44 125,46 Q100,48 100,70 Z`} fill={C.siL} stroke="#666" />
    {children}
  </g>;
}
export function CZHeatFig() {
  return <Svg h={340} title="CZ 生长中的三种热流过程" max={520} w={420}>
    <CZBody ox={50}>
      <Arrow x1={160} y1={170} x2={160} y2={135} color={C.red} w={3} /><circle cx="180" cy="150" r="11" fill="#fff" stroke={C.red} /><text x="180" y="155" textAnchor="middle" fill={C.red}>A</text>
      <Arrow x1={160} y1={120} x2={160} y2={70} color={C.red} w={3} /><circle cx="180" cy="92" r="11" fill="#fff" stroke={C.red} /><text x="180" y="97" textAnchor="middle" fill={C.red}>B</text>
      <Arrow x1={100} y1={85} x2={60} y2={85} color={C.red} w={3} /><circle cx="45" cy="70" r="11" fill="#fff" stroke={C.red} /><text x="45" y="75" textAnchor="middle" fill={C.red}>C</text>
      <text x="160" y="215" textAnchor="middle">熔融硅</text><text x="160" y="110" textAnchor="middle" fontSize="12">单晶硅</text>
      <text x="160" y="278" textAnchor="middle" fontSize="12">石英坩埚 / 石墨托</text><text x="310" y="300" fontSize="12">RF 线圈</text>
    </CZBody>
    <text x="210" y="335" textAnchor="middle" fontSize="12">A 潜热释放　B 晶体内向上传导　C 晶体表面辐射</text>
  </Svg>;
}
export function CZModelFig() {
  return <Svg h={340} title="CZ 生长的分凝模型" max={520} w={420}>
    <CZBody ox={50}>
      <text x="160" y="95" textAnchor="middle" fontSize="13">固相（随 t 变化）</text><text x="160" y="118" textAnchor="middle">V<tspan dy="4" fontSize="10">S</tspan><tspan dy="-4"> </tspan>　C<tspan dy="4" fontSize="10">S</tspan><tspan dy="-4"> </tspan></text>
      <text x="105" y="195" textAnchor="middle" fontSize="13">初值</text><text x="105" y="215" textAnchor="middle">V<tspan dy="4" fontSize="10">O</tspan><tspan dy="-4"> </tspan>　I<tspan dy="4" fontSize="10">O</tspan><tspan dy="-4"> </tspan>　C<tspan dy="4" fontSize="10">O</tspan><tspan dy="-4"> </tspan></text>
      <text x="215" y="195" textAnchor="middle" fontSize="13">液相（随 t 变化）</text><text x="215" y="215" textAnchor="middle">I<tspan dy="4" fontSize="10">L</tspan><tspan dy="-4"> </tspan>　C<tspan dy="4" fontSize="10">L</tspan><tspan dy="-4"> </tspan></text>
    </CZBody>
  </Svg>;
}

// ---------- 图 3.18 LEC 与水平 Bridgman ----------
export function LECBridgmanFig() {
  return <Svg h={300} title="液封直拉法（LEC）与两温区水平 Bridgman 法">
    <g transform="translate(20,0)">
      <path d="M40,90 V270 H260 V90 H245 V255 H55 V90 Z" fill="#9aa0a6" /><path d="M55,90 V255 H245 V90 H236 V246 H64 V90 Z" fill={C.quartz} />
      <rect x="64" y="170" width="172" height="76" fill={C.melt} /><rect x="64" y="148" width="172" height="22" fill="#e9f0c9" stroke="#a9b56b" />
      <path d="M105,172 Q150,186 195,172 V95 Q195,72 165,70 V20 H135 V70 Q105,72 105,95 Z" fill={C.siL} stroke="#666" />
      <text x="150" y="130" textAnchor="middle" fontSize="12">GaAs 单晶</text><text x="250" y="160" fontSize="12">B₂O₃ 液封</text><text x="150" y="215" textAnchor="middle">GaAs 熔体</text>
      <text x="150" y="292" textAnchor="middle">LEC：炉内 P &gt; 1 atm</text>
    </g>
    <g transform="translate(360,40)">
      <rect x="0" y="40" width="300" height="70" rx="35" fill="none" stroke="#666" strokeWidth="2" />
      <ellipse cx="40" cy="75" rx="18" ry="12" fill="#7a8a55" /><text x="40" y="128" textAnchor="middle" fontSize="12">As</text>
      <path d="M110,95 H290 V65 Q200,52 110,70 Z" fill={C.siL} /><rect x="110" y="70" width="40" height="25" fill="#9aa0a6" /><rect x="190" y="65" width="100" height="30" fill={C.melt} opacity=".85" />
      <text x="130" y="128" textAnchor="middle" fontSize="12">籽晶</text><text x="170" y="128" textAnchor="middle" fontSize="12">晶体</text><text x="240" y="128" textAnchor="middle" fontSize="12">GaAs 料</text>
      <path d="M0,230 H120 L170,170 H300" fill="none" stroke={C.red} strokeWidth="3" /><text x="60" y="222" textAnchor="middle" fill={C.red} fontSize="12">≈ 620 ℃</text><text x="240" y="162" textAnchor="middle" fill={C.red} fontSize="12">&gt; 1240 ℃</text>
      <text x="60" y="250" textAnchor="middle" fontSize="12">炉区 1</text><text x="240" y="250" textAnchor="middle" fontSize="12">炉区 2</text>
      <Arrow x1={160} y1={20} x2={250} y2={20} /><text x="205" y="12" textAnchor="middle" fontSize="12">炉体移动方向</text>
    </g>
  </Svg>;
}

// ---------- 图 3.19 SiC 升华生长 ----------
export function SiCSublimationFig() {
  return <Svg h={300} title="SiC 升华法（Lely 法）单晶生长" max={600} w={560}>
    <rect x="120" y="30" width="200" height="250" fill="none" stroke="#999" strokeWidth="2" rx="6" />
    <rect x="140" y="50" width="160" height="210" fill="#e8e6e1" stroke={C.graphite} strokeWidth="6" />
    <rect x="160" y="62" width="120" height="16" fill={C.graphite} /><path d="M175,78 H265 L255,110 H185 Z" fill="#5f7d5f" />
    <rect x="150" y="200" width="140" height="55" fill="#b9a77d" />
    {Array.from({ length: 6 }, (_, i) => <Arrow key={i} x1={170 + i * 20} y1={195} x2={185 + i * 12} y2={120} color="#8a7a50" w={1.2} />)}
    {Array.from({ length: 10 }, (_, i) => <g key={i}><circle cx="105" cy={45 + i * 24} r="5" fill={C.ink} /><circle cx="335" cy={45 + i * 24} r="5" fill={C.ink} /></g>)}
    <g fontSize="13"><text x="20" y="60">RF 加热</text><text x="350" y="72">籽晶</text><text x="350" y="100">SiC 单晶</text><text x="350" y="230">SiC 粉源（2300–2400 ℃）</text><text x="350" y="160">石墨坩埚 / 保温层</text></g>
    <path d="M470,270 V40" stroke="#666" markerEnd="url(#c3arr)" /><path d="M470,240 Q500,170 520,60" fill="none" stroke={C.red} strokeWidth="2.5" /><text x="480" y="285" fontSize="12">温度 →（源热、籽晶冷）</text>
  </Svg>;
}

// ---------- 图 3.23 交互版：区熔示意 + 当前剖面 ----------
export function FZZoneFig() {
  const [x, setX] = useState(6), [k, setK] = useState(0.1);
  const W = 640, H = 260, X0 = 40, len = 25, s = (W - 80) / len, zx = X0 + x * s;
  const pts = []; for (let t = 0; t <= x; t += 0.1) pts.push([X0 + t * s, fz1(k, t)]);
  const yv = v => 220 - (Math.log10(v) + 3) / 3 * 100;
  return <div style={panel}>
    <Svg w={W} h={H} title="区熔：熔区从左向右移动">
      <rect x={X0} y="30" width={x * s} height="60" fill={C.siL} stroke="#777" /><rect x={zx} y="30" width={s} height="60" fill={C.melt} /><rect x={zx + s} y="30" width={(len - x - 1) * s} height="60" fill="#d6d2c9" stroke="#777" />
      <text x={X0 + 6} y="22" fontSize="13">单晶：C<tspan dy="4" fontSize="10">S</tspan><tspan dy="-4"> </tspan>(x)</text><text x={W - 40} y="22" textAnchor="end" fontSize="13">原料棒：C<tspan dy="4" fontSize="10">O</tspan><tspan dy="-4"> </tspan></text>
      <text x={zx + s / 2} y="66" textAnchor="middle" fontSize="12">L</text><Arrow x1={zx + s + 4} y1={105} x2={zx + s + 34} y2={105} color={C.red} />
      <line x1={X0} x2={W - 40} y1={yv(1)} y2={yv(1)} stroke="#ccc" /><line x1={X0} x2={W - 40} y1={yv(0.1)} y2={yv(0.1)} stroke="#eee" /><line x1={X0} x2={W - 40} y1={yv(0.01)} y2={yv(0.01)} stroke="#eee" />
      <text x={X0 - 4} y={yv(1) + 4} textAnchor="end" fontSize="11">1</text><text x={X0 - 4} y={yv(0.1) + 4} textAnchor="end" fontSize="11">0.1</text><text x={X0 - 4} y={yv(0.01) + 4} textAnchor="end" fontSize="11">0.01</text>
      <polyline points={pts.map(([a, v]) => `${a},${yv(v)}`).join(" ")} fill="none" stroke={C.blue} strokeWidth="2.5" />
      <line x1={zx + s} x2={W - 40} y1={yv(1)} y2={yv(1)} stroke="#777" strokeWidth="2.5" />
      <text x={X0 + 4} y="248" fontSize="12">C/C<tspan dy="4" fontSize="10">O</tspan><tspan dy="-4"> </tspan>（对数）；蓝：已凝固单晶，灰：尚未熔化的原料</text>
    </Svg>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 14 }}>
      <label style={{ flex: 1 }}>熔区位置 <M>{R`x/L=${x.toFixed(1)}`}</M><input type="range" min={0} max={24} step={0.1} value={x} onChange={e => setX(+e.target.value)} style={{ width: "100%" }} /></label>
      <label style={{ flex: 1 }}><M>{R`k_O=${k}`}</M><input type="range" min={0} max={5} step={1} value={[0.001, 0.01, 0.05, 0.1, 0.35, 0.8].indexOf(k)} onChange={e => setK([0.001, 0.01, 0.05, 0.1, 0.35, 0.8][+e.target.value])} style={{ width: "100%" }} /></label>
    </div>
    <p style={{ textAlign: "center", margin: 4 }}><M>{R`C_L=\frac{C_S}{k_O}=${(fz1(k, x) / k).toFixed(2)}\,C_O,\qquad C_S(x)=${fz1(k, x).toFixed(3)}\,C_O`}</M></p>
  </div>;
}

// ---------- 图 3.26 SOI 晶圆与三种制备路线 ----------
const ROUTES = {
  SIMOX: ["SIMOX（注氧隔离）", ["普通 CZ/FZ 晶圆", "高剂量注入氧离子", "高温退火，形成埋氧层", "SOI 晶圆"]],
  BESOI: ["BESOI（键合–减薄）", ["两片氧化过的 CZ 晶圆", "面对面贴合", "高温退火：键合强度接近体硅", "把一片磨/刻到只剩薄硅层"]],
  SMART: ["Smart-Cut（智能剥离）", ["氧化晶圆 A 注氢（峰值略深于目标硅厚）", "与晶圆 B 键合", "400–600 ℃：沿注氢层劈开", "> 1000 ℃ 加固键合 + 抛光；A 可重复使用"]],
};
export function SOIFig() {
  const [r, setR] = useState("SMART"), [st, setSt] = useState(3);
  const [title, steps] = ROUTES[r];
  const layer = (y, h, fill, label, x = 160, w = 360) => <g><rect x={x} y={y} width={w} height={h} fill={fill} stroke="#777" /><text x={x + w + 10} y={y + h / 2 + 5} fontSize="12">{label}</text></g>;
  const draw = () => {
    if (st === 3 || (r === "SIMOX" && st === 2)) return <g>{layer(60, 26, C.siL, "顶层硅 0.1–1.0 µm")}{layer(86, 22, C.ox, "埋氧层 BOX（数百 nm）")}{layer(108, 110, C.si, "硅衬底")}</g>;
    if (r === "SIMOX") return <g>{layer(60, 158, C.si, "硅晶圆")}{st >= 1 && <><rect x="160" y="88" width="360" height="18" fill={C.ox} opacity=".55" />{Array.from({ length: 10 }, (_, i) => <Arrow key={i} x1={180 + i * 36} y1={20} x2={180 + i * 36} y2={55} color={C.red} w={1.5} />)}<text x="340" y="15" textAnchor="middle" fontSize="12" fill={C.red}>O⁺</text></>}</g>;
    if (r === "BESOI") return <g>{layer(30, 70, C.si, "晶圆 1")}{layer(100, 12, C.ox, "SiO₂")}{st >= 1 && <>{layer(116, 12, C.ox, "SiO₂", 160)}{layer(128, 80, C.si, "晶圆 2")}</>}{st === 2 && <text x="340" y="20" textAnchor="middle" fontSize="12">高温退火</text>}</g>;
    return <g>{layer(30, 70, C.si, "晶圆 A")}<line x1="160" x2="520" y1="62" y2="62" stroke={C.red} strokeDasharray="5 3" strokeWidth="2" /><text x="150" y="66" textAnchor="end" fontSize="12" fill={C.red}>H 峰</text>{layer(100, 12, C.ox, "SiO₂")}
      {st >= 1 && layer(116, 92, C.si, "晶圆 B")}{st >= 2 && <path d="M160,62 l20,-4 l20,5 l20,-4 l20,4 l20,-5 l20,4 l20,-4 l20,5 l20,-4 l20,4 l20,-5 l20,4 l20,-4 l20,5 l20,-4 l20,4 l20,-4" fill="none" stroke={C.ink} />}</g>;
  };
  return <div style={panel}>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>{Object.entries(ROUTES).map(([k, [t]]) => <button key={k} style={btn(r === k)} onClick={() => { setR(k); setSt(0); }}>{t}</button>)}</div>
    <Svg h={230} title={title}>{draw()}</Svg>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", fontSize: 13 }}>{steps.map((s, i) => <button key={i} style={btn(st === i)} onClick={() => setSt(i)}>{i + 1}. {s}</button>)}</div>
  </div>;
}
