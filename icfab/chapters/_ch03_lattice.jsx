// 图 3.3 交互版：金刚石 / 闪锌矿晶格（Three.js，按需加载；无 WebGL 时显示同一几何的 SVG 投影）。
// 可切换 Si / GaAs、晶胞数 1 或 2、显示 (100)/(110)/(111) 晶面与 [100]/[110]/[111] 晶向、四面体键、两套 FCC 子晶格。
import { useEffect, useMemo, useRef, useState } from "react";
import { M } from "@kit";
import { LATT, planeDensity } from "./_ch03_phys.jsx";

const R = String.raw;
export const COL = { si: "#8b9099", ga: "#3f78b5", as: "#c2603a", plane: "#b07cc6", dir: "#c0392b", bond: "#9a9fa8", hl: "#f2b134" };
const panel = { background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 12, padding: 14, color: "#292b30" };
const btn = on => ({ padding: "5px 10px", borderRadius: 7, border: `1px solid ${on ? "#3f78b5" : "#bcb6a9"}`, background: on ? "#e2eef7" : "#fffdf8", cursor: "pointer", fontSize: 14 });

// ---------- 几何 ----------
const FCC = [[0, 0, 0], [0, .5, .5], [.5, 0, .5], [.5, .5, 0]];
export function diamond(n) {
  const atoms = [], eps = 1e-6, seen = new Set();
  for (let i = -1; i <= n; i++) for (let j = -1; j <= n; j++) for (let k = -1; k <= n; k++)
    for (const [s, off] of [[0, 0], [1, .25]]) for (const b of FCC) {
      const p = [i + b[0] + off, j + b[1] + off, k + b[2] + off];
      if (p.every(v => v > -eps && v < n + eps)) { const key = p.map(v => v.toFixed(3)).join(); if (!seen.has(key)) { seen.add(key); atoms.push({ p, s }); } }
    }
  const bonds = [], d2 = 3 / 16;
  for (let a = 0; a < atoms.length; a++) for (let b = a + 1; b < atoms.length; b++) {
    const [x, y, z] = atoms[a].p.map((v, i) => v - atoms[b].p[i]);
    if (Math.abs(x * x + y * y + z * z - d2) < 1e-4) bonds.push([a, b]);
  }
  return { atoms, bonds };
}
export const PLANES = {
  "100": { h: [1, 0, 0], d: n => Math.max(1, Math.floor(n / 2)), label: "(100)" },
  "110": { h: [1, 1, 0], d: n => n, label: "(110)" },
  "111": { h: [1, 1, 1], d: n => (n === 1 ? 1 : 3), label: "(111)" },
};
export const DIRS = { "100": [1, 0, 0], "110": [1, 1, 0], "111": [1, 1, 1] };
// 平面 h·x = d 与立方体 [0,n]^3 的交多边形
export function clipPlane(h, d, n) {
  const pts = [], C = [];
  for (let i = 0; i < 8; i++) C.push([(i & 1) * n, ((i >> 1) & 1) * n, ((i >> 2) & 1) * n]);
  const E = []; for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const diff = C[i].filter((v, k) => v !== C[j][k]).length; if (diff === 1) E.push([C[i], C[j]]); }
  const f = p => h[0] * p[0] + h[1] * p[1] + h[2] * p[2] - d;
  for (const [a, b] of E) {
    const fa = f(a), fb = f(b);
    if (Math.abs(fa) < 1e-9) pts.push(a); if (Math.abs(fb) < 1e-9) pts.push(b);
    if (fa * fb < 0) { const t = fa / (fa - fb); pts.push(a.map((v, k) => v + t * (b[k] - v))); }
  }
  const uniq = []; for (const p of pts) if (!uniq.some(q => q.every((v, k) => Math.abs(v - p[k]) < 1e-9))) uniq.push(p);
  if (uniq.length < 3) return [];
  const c = [0, 1, 2].map(k => uniq.reduce((s, p) => s + p[k], 0) / uniq.length);
  const hn = Math.hypot(...h), nrm = h.map(v => v / hn);
  let u = [nrm[1] - nrm[2], nrm[2] - nrm[0], nrm[0] - nrm[1]]; if (Math.hypot(...u) < 1e-6) u = [0, -nrm[2], nrm[1]];
  const un = Math.hypot(...u); u = u.map(v => v / un);
  const w = [nrm[1] * u[2] - nrm[2] * u[1], nrm[2] * u[0] - nrm[0] * u[2], nrm[0] * u[1] - nrm[1] * u[0]];
  const ang = p => { const q = p.map((v, k) => v - c[k]); return Math.atan2(q[0] * w[0] + q[1] * w[1] + q[2] * w[2], q[0] * u[0] + q[1] * u[1] + q[2] * u[2]); };
  return uniq.sort((p, q) => ang(p) - ang(q));
}
const onPlane = (p, h, d, tol = 1e-6) => Math.abs(h[0] * p[0] + h[1] * p[1] + h[2] * p[2] - d) < tol;

// ---------- SVG 替代（同一几何的投影，可用滑块转动）----------
function SvgLattice({ geo, n, mat, plane, dir, showBonds, az, setAz }) {
  const W = 520, H = 400, el = 0.42, s = 230 / n, cx = n / 2;
  const proj = p => {
    const x = p[0] - cx, y = p[1] - cx, z = p[2] - cx;
    const xr = x * Math.cos(az) - y * Math.sin(az), yr = x * Math.sin(az) + y * Math.cos(az);
    return [W / 2 + s * xr, H / 2 - s * (z * Math.cos(el) - yr * Math.sin(el)), yr * Math.cos(el) + z * Math.sin(el)];
  };
  const P = plane ? PLANES[plane] : null, pd = P ? P.d(n) : 0;
  const poly = P ? clipPlane(P.h, pd, n).map(proj) : [];
  const atoms = geo.atoms.map((a, i) => ({ ...a, i, q: proj(a.p) })).sort((a, b) => b.q[2] - a.q[2]);
  const color = a => mat === "GaAs" ? (a.s === 0 ? COL.ga : COL.as) : COL.si;
  const D = dir ? DIRS[dir] : null, dl = n;
  const o = proj([0, 0, 0]), tip = D ? proj(D.map(v => v * dl)) : null;
  return <div>
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: 560, display: "block", margin: "0 auto" }} role="img" aria-label="金刚石晶格的二维投影">
      {[[0, 0, 0, n, 0, 0], [0, 0, 0, 0, n, 0], [0, 0, 0, 0, 0, n], [n, 0, 0, n, n, 0], [n, 0, 0, n, 0, n], [0, n, 0, n, n, 0], [0, n, 0, 0, n, n], [0, 0, n, n, 0, n], [0, 0, n, 0, n, n], [n, n, 0, n, n, n], [n, 0, n, n, n, n], [0, n, n, n, n, n]].map((e, i) => {
        const a = proj(e.slice(0, 3)), b = proj(e.slice(3)); return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#b8b2a6" strokeDasharray="4 4" />;
      })}
      {poly.length > 2 && <polygon points={poly.map(p => p.slice(0, 2).join(",")).join(" ")} fill={COL.plane} fillOpacity=".28" stroke={COL.plane} strokeWidth="2" />}
      {showBonds && geo.bonds.map(([a, b], i) => { const p = proj(geo.atoms[a].p), q = proj(geo.atoms[b].p); return <line key={"b" + i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={COL.bond} strokeWidth="3" />; })}
      {atoms.map(a => { const hit = P && onPlane(a.p, P.h, pd); return <circle key={a.i} cx={a.q[0]} cy={a.q[1]} r={(hit ? 10 : 7.5) * (2 / (n + 1)) + 3} fill={color(a)} stroke={hit ? COL.hl : "#fff"} strokeWidth={hit ? 3 : 1} />; })}
      {D && <g><line x1={o[0]} y1={o[1]} x2={tip[0]} y2={tip[1]} stroke={COL.dir} strokeWidth="3.5" /><circle cx={tip[0]} cy={tip[1]} r="6" fill={COL.dir} /><text x={tip[0] + 8} y={tip[1] - 6} fill={COL.dir} fontSize="16">[{dir}]</text></g>}
      {[[[n * 1.12, 0, 0], "x"], [[0, n * 1.12, 0], "y"], [[0, 0, n * 1.12], "z"]].map(([p, t]) => { const q = proj(p); return <text key={t} x={q[0]} y={q[1]} fontSize="15" fill="#555">{t}</text>; })}
    </svg>
    <label style={{ display: "block", fontSize: 13, maxWidth: 420, margin: "0 auto" }}>转动视角（方位角）<input type="range" min={-3.14} max={3.14} step={0.01} value={az} onChange={e => setAz(+e.target.value)} style={{ width: "100%" }} /></label>
  </div>;
}

// ---------- Three.js 场景 ----------
function ThreeLattice({ geo, n, mat, plane, dir, showBonds, onFail, onReady }) {
  const host = useRef(null), api = useRef(null);
  const state = useRef({ geo, n, mat, plane, dir, showBonds }); state.current = { geo, n, mat, plane, dir, showBonds };
  useEffect(() => {
    let dead = false, cleanup = () => {};
    (async () => {
      let renderer, controls, observer; const disposables = [];
      const dispose = () => { observer?.disconnect(); controls?.dispose(); disposables.forEach(d => d.dispose()); api.current?.clear?.(); if (renderer) { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); } api.current = null; };
      cleanup = dispose;
      try {
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead || !host.current) return;
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("role", "img"); renderer.domElement.setAttribute("aria-label", "可旋转的金刚石晶格；拖动旋转，滚轮缩放");
        host.current.appendChild(renderer.domElement);
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#faf8f3");
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x5a5048, 2.2)); const L = new THREE.DirectionalLight(0xffffff, 1.8); L.position.set(3, 5, 4); scene.add(L);
        const sph = new THREE.SphereGeometry(1, 24, 16), cyl = new THREE.CylinderGeometry(1, 1, 1, 10);
        const mats = { si: new THREE.MeshStandardMaterial({ color: COL.si, roughness: .45 }), ga: new THREE.MeshStandardMaterial({ color: COL.ga, roughness: .45 }), as: new THREE.MeshStandardMaterial({ color: COL.as, roughness: .45 }), bond: new THREE.MeshStandardMaterial({ color: COL.bond, roughness: .6 }), hl: new THREE.MeshStandardMaterial({ color: COL.hl, emissive: 0x6a4a00, roughness: .4 }), edge: new THREE.LineBasicMaterial({ color: 0x9a948a }), plane: new THREE.MeshBasicMaterial({ color: COL.plane, transparent: true, opacity: .32, side: THREE.DoubleSide, depthWrite: false }) };
        disposables.push(sph, cyl, ...Object.values(mats));
        const group = new THREE.Group(); scene.add(group); let local = [];
        const clear = () => { group.clear(); local.forEach(d => d.dispose()); local = []; };
        const build = () => {
          clear();
          const { geo, n, mat, plane, dir, showBonds } = state.current, c = n / 2;
          group.position.set(-c, -c, -c);
          const P = plane ? PLANES[plane] : null, pd = P ? P.d(n) : 0, r = 0.075;
          geo.atoms.forEach(a => {
            const hit = P && onPlane(a.p, P.h, pd);
            const m = new THREE.Mesh(sph, hit ? mats.hl : mat === "GaAs" ? (a.s === 0 ? mats.ga : mats.as) : mats.si);
            m.scale.setScalar(hit ? r * 1.35 : r); m.position.set(a.p[0], a.p[2], a.p[1]); group.add(m);    // three 的 y 轴朝上 → 晶体 z
          });
          if (showBonds) geo.bonds.forEach(([i, j]) => {
            const p = geo.atoms[i].p, q = geo.atoms[j].p, A = new THREE.Vector3(p[0], p[2], p[1]), B = new THREE.Vector3(q[0], q[2], q[1]);
            const m = new THREE.Mesh(cyl, mats.bond); m.position.copy(A).add(B).multiplyScalar(.5); m.scale.set(.022, A.distanceTo(B), .022);
            m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize()); group.add(m);
          });
          const box = new THREE.EdgesGeometry(new THREE.BoxGeometry(n, n, n)); local.push(box);
          const edges = new THREE.LineSegments(box, mats.edge); edges.position.set(c, c, c); group.add(edges);
          if (P) {
            const poly = clipPlane(P.h, pd, n); if (poly.length > 2) {
              const pos = []; for (let k = 1; k + 1 < poly.length; k++) for (const v of [poly[0], poly[k], poly[k + 1]]) pos.push(v[0], v[2], v[1]);
              const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); local.push(g); group.add(new THREE.Mesh(g, mats.plane));
            }
          }
          if (dir) {
            const D = DIRS[dir], len = n * Math.hypot(...D), v = new THREE.Vector3(D[0], D[2], D[1]).normalize();
            const arrow = new THREE.ArrowHelper(v, new THREE.Vector3(0, 0, 0), len, 0xc0392b, .16, .09);
            arrow.line.material.linewidth = 3; local.push(arrow.line.geometry, arrow.line.material, arrow.cone.geometry, arrow.cone.material); group.add(arrow);
          }
          const ax = new THREE.AxesHelper(n * 1.15); local.push(ax.geometry, ax.material); group.add(ax);
          camera.position.set(n * 2.3, n * 1.6, n * 2.9); camera.lookAt(0, 0, 0); controls?.update(); render();
        };
        const render = () => { if (!dead) renderer.render(scene, camera); };
        controls = new OrbitControls(camera, renderer.domElement); controls.enablePan = false; controls.minDistance = 1.5; controls.maxDistance = 14; controls.addEventListener("change", render);
        observer = new ResizeObserver(() => { if (!host.current) return; const w = Math.max(260, host.current.clientWidth), h = Math.min(440, Math.round(w * .78)); renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); render(); });
        observer.observe(host.current);
        api.current = { build, clear, view: v => { const n = state.current.n; const D = { "100": [n * 3.6, 0.001, 0.001], "110": [n * 2.6, 0.001, n * 2.6], "111": [n * 2.1, n * 2.1, n * 2.1] }[v]; camera.position.set(D[0], D[2], D[1]); camera.lookAt(0, 0, 0); controls.update(); render(); } };
        build(); onReady?.();
      } catch (e) { dispose(); if (!dead) onFail?.(); }
    })();
    return () => { dead = true; cleanup(); };
  }, []);
  useEffect(() => { api.current?.build(); }, [geo, n, mat, plane, dir, showBonds]);
  return <div><div ref={host} style={{ width: "100%" }} />
    <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 6, fontSize: 13 }}>沿晶向观察：{["100", "110", "111"].map(v => <button key={v} style={btn(false)} onClick={() => api.current?.view(v)}>[{v}]</button>)}</div></div>;
}

export function LatticeExplorer() {
  const [mat, setMat] = useState("Si"), [n, setN] = useState(1), [plane, setPlane] = useState("111"), [dir, setDir] = useState("111"), [bonds, setBonds] = useState(true);
  const [mode, setMode] = useState("loading"), [az, setAz] = useState(-0.6);
  const geo = useMemo(() => diamond(n), [n]);
  const a = LATT[mat], dens = planeDensity(a);
  const P = plane ? PLANES[plane] : null, pd = P ? P.d(n) : 0;
  const nOn = P ? geo.atoms.filter(t => onPlane(t.p, P.h, pd)).length : 0;
  const nPartner = plane === "111" ? geo.atoms.filter(t => onPlane(t.p, P.h, pd - 0.25)).length : 0;
  const seg = (vals, cur, set, fmt = v => v) => <span style={{ display: "inline-flex", gap: 4, flexWrap: "wrap" }}>{vals.map(v => <button key={String(v)} style={btn(cur === v)} onClick={() => set(v)}>{fmt(v)}</button>)}</span>;
  return <div style={panel}>
    <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
      <div>材料：{seg(["Si", "GaAs"], mat, setMat, v => v === "Si" ? "Si（金刚石）" : "GaAs（闪锌矿）")}　晶胞：{seg([1, 2], n, setN, v => v === 1 ? "单个晶胞" : "八个晶胞")}　{seg([true, false], bonds, setBonds, v => v ? "显示四面体键" : "隐藏键")}</div>
      <div>晶面：{seg(["100", "110", "111", null], plane, setPlane, v => v ? `(${v})` : "不显示")}　晶向：{seg(["100", "110", "111", null], dir, setDir, v => v ? `[${v}]` : "不显示")}</div>
    </div>
    <div style={{ marginTop: 10 }}>
      {mode !== "svg" && <div style={{ display: mode === "3d" ? "block" : "none" }}><ThreeLattice {...{ geo, n, mat, plane, dir, showBonds: bonds }} onReady={() => setMode("3d")} onFail={() => setMode("svg")} /></div>}
      {mode !== "3d" && <SvgLattice {...{ geo, n, mat, plane, dir, showBonds: bonds, az, setAz }} />}
    </div>
    <p style={{ fontSize: 13, textAlign: "center", margin: "6px 0" }}>{mode === "3d" ? "拖动旋转 · 滚轮/双指缩放 · 按钮可沿晶向俯视" : mode === "svg" ? "当前环境未启用 WebGL：显示同一组原子坐标的平面投影，可用滑块转动。" : "正在加载三维视图；先显示平面投影。"}</p>
    <div style={{ fontSize: 14, lineHeight: 1.7 }}>
      {mat === "GaAs" ? <span><b style={{ color: COL.ga }}>●</b> Ga（第一套 FCC 子晶格）　<b style={{ color: COL.as }}>●</b> As（沿体对角线平移 a/4 的第二套）：每个 Ga 的四个最近邻都是 As。</span> : <span><b style={{ color: COL.si }}>●</b> Si：两套 FCC 子晶格的原子相同，每个原子以四面体键连接四个最近邻。</span>}
      {P && <div>金色原子正好落在所显示的 {P.label} 面上：本视图中 {nOn} 个{plane === "111" ? <>（与之相距 <M>{R`\sqrt3\,a/12`}</M> 的"孪生"原子层另有 {nPartner} 个，未高亮）</> : ""}。</div>}
      <div><M>{R`a_{\rm ${mat}}=${a}\,\text{Å}`}</M>；单个原子面的面密度：<M>{R`(100)\ ${(dens["100"] / 1e14).toFixed(2)},\ (110)\ ${(dens["110"] / 1e14).toFixed(2)},\ (111)\ ${(dens["111"] / 1e14).toFixed(2)}\ \times10^{14}\,\mathrm{cm^{-2}}`}</M>（{"{"}111{"}"} 双原子层合计 <M>{R`${(2 * dens["111"] / 1e14).toFixed(2)}\times10^{14}`}</M>）。</div>
    </div>
  </div>;
}
