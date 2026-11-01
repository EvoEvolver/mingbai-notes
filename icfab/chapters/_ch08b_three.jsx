// 三维示意：金刚石结构 Si 晶格中的 {311} 棒状缺陷与 {111} 非本征位错环（Three.js，按需加载；无 WebGL 时显示 SVG 投影）。
// 几何为示意：{311} 面法向 [311]，棒沿 [01-1]（位于该面内的 ⟨110⟩ 方向）；位错环为夹在两层 (111) 原子面之间的一片额外原子。
import { useEffect, useRef, useState } from "react";
import { TxI } from "@kit";

const R = String.raw;
const NC = 4;                                  // 每边晶胞数
const C0 = [NC / 2, NC / 2, NC / 2];
const norm = v => { const l = Math.hypot(...v); return v.map(x => x / l); };
const add = (a, b, s = 1) => a.map((x, i) => x + s * b[i]);

export function lattice() {
  const fcc = [[0, 0, 0], [0, .5, .5], [.5, 0, .5], [.5, .5, 0]], out = [];
  for (let i = 0; i < NC; i++) for (let j = 0; j < NC; j++) for (let k = 0; k < NC; k++)
    for (const f of fcc) for (const b of [[0, 0, 0], [.25, .25, .25]]) out.push([i + f[0] + b[0], j + f[1] + b[1], k + f[2] + b[2]]);
  return out;
}
export function bonds(atoms) {
  const out = [], d0 = Math.sqrt(3) / 4;
  for (let i = 0; i < atoms.length; i++) for (let j = i + 1; j < atoms.length; j++) {
    const d = Math.hypot(atoms[i][0] - atoms[j][0], atoms[i][1] - atoms[j][1], atoms[i][2] - atoms[j][2]);
    if (Math.abs(d - d0) < 0.02) out.push([i, j]);
  }
  return out;
}
// {311} 缺陷：在 (311) 面内沿 [01-1] 排列的间隙原子"双链"（若干行），中心在晶块中部
export function rod311() {
  const n = norm([3, 1, 1]), d = norm([0, 1, -1]), w = norm([-2, 3, 3]), out = [];
  for (let r = 0; r < 3; r++) for (let s = -6; s <= 6; s++) {
    const p = add(add(C0, d, s * 0.354), w, (r - 1) * 0.38);
    out.push(add(p, n, (s % 2 ? 0.06 : -0.06)));
  }
  return { atoms: out, n, d, w };
}
// 非本征位错环：(111) 面上一片六角排列的额外原子（半径约 1.25 个晶格常数）
export function loop111() {
  const n = norm([1, 1, 1]), u = norm([1, -1, 0]), v = norm([1, 1, -2]), a = Math.SQRT1_2, out = [];
  const c = add(C0, n, Math.sqrt(3) / 8);              // 置于两层 (111) 面之间
  for (let i = -4; i <= 4; i++) for (let j = -4; j <= 4; j++) {
    const x = (i + j / 2) * a, y = j * a * Math.sqrt(3) / 2;
    if (Math.hypot(x, y) <= 1.3) out.push(add(add(c, u, x), v, y));
  }
  return { atoms: out, n, u, v, c, r: 1.42 };
}

const MODES = [["perfect", "完美晶格"], ["rod", "{311} 棒状缺陷"], ["loop", "(111) 位错环"]];
const panel = { background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 10, padding: "10px 12px" };
const btn = on => ({ padding: "5px 11px", margin: "2px 4px", borderRadius: 7, border: `1px solid ${on ? "#2c4a6e" : "#bcb6a9"}`, background: on ? "#e2eef7" : "#fffdf8", cursor: "pointer", fontSize: 14 });

// ---------- SVG 投影（无 WebGL 时） ----------
function Projected({ mode }) {
  const atoms = lattice(), B = bonds(atoms);
  const th = 0.62, ph = 0.42;                           // 斜视
  const rot = ([x, y, z]) => { x -= C0[0]; y -= C0[1]; z -= C0[2]; const x1 = x * Math.cos(th) - z * Math.sin(th), z1 = x * Math.sin(th) + z * Math.cos(th); const y1 = y * Math.cos(ph) - z1 * Math.sin(ph), z2 = y * Math.sin(ph) + z1 * Math.cos(ph); return [340 + 62 * x1, 160 - 62 * y1, z2]; };
  const P = atoms.map(rot), def = mode === "rod" ? rod311().atoms : mode === "loop" ? loop111().atoms : [];
  const D = def.map(rot);
  const items = [...P.map(p => ({ p, c: "#9aa0a6", r: 4 })), ...D.map(p => ({ p, c: mode === "rod" ? "#c0392b" : "#d68910", r: 6 }))].sort((a, b) => a.p[2] - b.p[2]);
  return <svg viewBox="0 0 680 330" role="img" aria-label="晶格缺陷的静态投影" style={{ width: "100%", display: "block" }}>
    {B.map(([i, j], k) => <line key={k} x1={P[i][0]} y1={P[i][1]} x2={P[j][0]} y2={P[j][1]} stroke="#c9ccd0" strokeWidth={1} />)}
    {items.map((it, k) => <circle key={k} cx={it.p[0]} cy={it.p[1]} r={it.r} fill={it.c} stroke="#fff" strokeWidth={0.6} />)}
  </svg>;
}

// ---------- Three.js 场景 ----------
export function DefectLattice3D() {
  const host = useRef(null), api = useRef(null), modeRef = useRef("rod");
  const [mode, setMode] = useState("rod"), [ready, setReady] = useState(false), [failed, setFailed] = useState(false);
  modeRef.current = mode;
  useEffect(() => {
    let dead = false, cleanup = () => {};
    async function setup() {
      const trash = []; let renderer, controls, observer;
      const dispose = () => { observer?.disconnect(); controls?.dispose(); trash.forEach(o => o.dispose?.()); if (renderer) { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); } api.current = null; };
      cleanup = dispose;
      try {
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead || !host.current) return;
        const probe = document.createElement("canvas");
        if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) throw new Error("no webgl");
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#faf8f3");
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60); camera.position.set(6.5, 4.2, 7.5);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("role", "img"); renderer.domElement.setAttribute("aria-label", "可旋转的 Si 晶格与缺陷三维示意");
        host.current.appendChild(renderer.domElement);
        const root = new THREE.Group(); root.position.set(-C0[0], -C0[1], -C0[2]); scene.add(root);
        const atoms = lattice(), B = bonds(atoms);
        const sph = new THREE.SphereGeometry(0.075, 12, 8), mLat = new THREE.MeshStandardMaterial({ color: 0x9aa0a6, roughness: .6 });
        trash.push(sph, mLat);
        const inst = new THREE.InstancedMesh(sph, mLat, atoms.length), mtx = new THREE.Matrix4();
        atoms.forEach((p, i) => { mtx.makeTranslation(...p); inst.setMatrixAt(i, mtx); }); root.add(inst);
        const bp = []; B.forEach(([i, j]) => bp.push(...atoms[i], ...atoms[j]));
        const bg = new THREE.BufferGeometry(); bg.setAttribute("position", new THREE.Float32BufferAttribute(bp, 3));
        const bm = new THREE.LineBasicMaterial({ color: 0xb8bcc2, transparent: true, opacity: .55 }); trash.push(bg, bm);
        root.add(new THREE.LineSegments(bg, bm));
        // 晶胞框
        const box = new THREE.BoxGeometry(NC, NC, NC), eg = new THREE.EdgesGeometry(box), em = new THREE.LineBasicMaterial({ color: 0x777777 });
        const frame = new THREE.LineSegments(eg, em); frame.position.set(...C0); root.add(frame); trash.push(box, eg, em);
        // 缺陷组
        const groups = {};
        const mkAtoms = (pts, color, r) => { const g = new THREE.SphereGeometry(r, 14, 10), m = new THREE.MeshStandardMaterial({ color, roughness: .45 }); trash.push(g, m); const im = new THREE.InstancedMesh(g, m, pts.length); pts.forEach((p, i) => { mtx.makeTranslation(...p); im.setMatrixAt(i, mtx); }); return im; };
        const mkPlane = (c, n, size, color) => { const g = new THREE.PlaneGeometry(size, size), m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .16, side: THREE.DoubleSide, depthWrite: false }); trash.push(g, m); const pl = new THREE.Mesh(g, m); pl.position.set(...c); pl.lookAt(c[0] + n[0], c[1] + n[1], c[2] + n[2]); return pl; };
        const rod = rod311(); groups.rod = new THREE.Group(); groups.rod.add(mkAtoms(rod.atoms, 0xc0392b, .1)); groups.rod.add(mkPlane(C0, rod.n, 3.4, 0xc0392b));
        const lp = loop111(); groups.loop = new THREE.Group(); groups.loop.add(mkAtoms(lp.atoms, 0xd68910, .1)); groups.loop.add(mkPlane(lp.c, lp.n, 3.4, 0xd68910));
        const tg = new THREE.TorusGeometry(lp.r, 0.03, 8, 64), tm = new THREE.MeshBasicMaterial({ color: 0x8e5a00 }); trash.push(tg, tm);
        const torus = new THREE.Mesh(tg, tm); torus.position.set(...lp.c); torus.lookAt(lp.c[0] + lp.n[0], lp.c[1] + lp.n[1], lp.c[2] + lp.n[2]); groups.loop.add(torus);
        Object.values(groups).forEach(g => root.add(g));
        scene.add(new THREE.HemisphereLight(0xffffff, 0x6b6050, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 2); dl.position.set(4, 8, 6); scene.add(dl);
        const render = () => { if (!dead) renderer.render(scene, camera); };
        controls = new OrbitControls(camera, renderer.domElement); controls.enablePan = false; controls.minDistance = 4; controls.maxDistance = 20; controls.addEventListener("change", render);
        api.current = {
          mode: m => { Object.entries(groups).forEach(([k, g]) => { g.visible = k === m; }); render(); },
          view: v => { const d = 10.5; const dir = v === "rod" ? norm([0, 1, -1]) : v === "loop" ? norm([1, 1, 1]) : norm([6.5, 4.2, 7.5]); camera.position.set(dir[0] * d, dir[1] * d, dir[2] * d); controls.update(); render(); },
        };
        observer = new ResizeObserver(() => { if (!host.current) return; const w = Math.max(260, host.current.clientWidth); renderer.setSize(w, 340); camera.aspect = w / 340; camera.updateProjectionMatrix(); render(); });
        observer.observe(host.current);
        api.current.mode(modeRef.current); setReady(true);
      } catch { dispose(); if (!dead) setFailed(true); }
    }
    setup(); return () => { dead = true; cleanup(); };
  }, []);
  useEffect(() => { api.current?.mode(mode); }, [mode]);
  return <div style={panel} data-three="lattice">
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
      {MODES.map(([k, l]) => <button key={k} style={btn(mode === k)} onClick={() => setMode(k)}>{l}</button>)}
      <span style={{ flex: 1 }} />
      <button style={btn(false)} disabled={!ready} onClick={() => api.current?.view("free")}>斜视</button>
      <button style={btn(false)} disabled={!ready} onClick={() => api.current?.view("rod")}>沿 [01‾1] 看</button>
      <button style={btn(false)} disabled={!ready} onClick={() => api.current?.view("loop")}>沿 [111] 看</button>
    </div>
    <div style={{ position: "relative", minHeight: 300 }}>
      <div ref={host} style={{ width: "100%", height: ready ? 340 : 0, overflow: "hidden" }} />
      {!ready && <Projected mode={mode} />}
    </div>
    <div style={{ fontSize: 13, textAlign: "center" }}>
      {failed ? "当前环境未启用 WebGL，显示同一结构的静态投影。" : ready ? "拖动旋转 · 滚轮/双指缩放 · 按钮切换缺陷与视角" : "正在加载三维视图；先看静态投影。"}
    </div>
    <div style={{ fontSize: 13.5, marginTop: 6 }}><TxI>{mode === "rod"
      ? R`红色：多余的 Si 间隙原子排成沿 $\langle110\rangle$ 方向（此处为 $\nosym{[01\bar1]}$）延伸的"带"，带面就是 $(311)$ 面（淡红色平面）。沿 $\nosym{[01\bar1]}$ 看，整条棒缩成几个点——这就是 TEM 中 {311} 缺陷呈细长棒状的原因。`
      : mode === "loop" ? R`橙色：夹在两层 $(111)$ 原子面之间的一片额外原子（非本征位错环），金色圆环是环的边界——即位错线。沿 $[111]$ 看，它是一个圆盘；侧看则是一条短线。`
      : R`金刚石结构 Si：$4\times4\times4$ 个立方晶胞，每个原子有 4 个最近邻（键长 $\sqrt3a/4$）。`}</TxI></div>
  </div>;
}
