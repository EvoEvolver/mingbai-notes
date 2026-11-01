// 图 A1.2 左：硅（金刚石结构）晶胞的三维视图。Three.js 按需加载；无 WebGL 时退回可旋转的 SVG 正交投影。
import { useEffect, useMemo, useRef, useState } from "react";

const A = "#8a8f96", B = "#2c4a6e";   // 两套 FCC 子晶格
// 晶胞内（含边界）原子：FCC 格点 + 沿体对角线平移 1/4 的第二套
export function diamondAtoms() {
  const fcc = [], out = [];
  for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1]) fcc.push([x, y, z]);
  fcc.push([.5, .5, 0], [.5, .5, 1], [.5, 0, .5], [.5, 1, .5], [0, .5, .5], [1, .5, .5]);
  fcc.forEach(p => out.push({ p, sub: 0 }));
  [[0, 0, 0], [0, .5, .5], [.5, 0, .5], [.5, .5, 0]].forEach(p => out.push({ p: p.map(v => v + 0.25), sub: 1 }));
  return out;
}
export function diamondBonds(atoms) {
  const L = Math.sqrt(3) / 4, bonds = [];
  for (let i = 0; i < atoms.length; i++) for (let j = i + 1; j < atoms.length; j++) {
    const d = Math.hypot(...atoms[i].p.map((v, k) => v - atoms[j].p[k]));
    if (Math.abs(d - L) < 1e-6) bonds.push([i, j]);
  }
  return bonds;
}
const EDGES = (() => { const e = []; const c = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0], [1, 0, 1], [0, 1, 1], [1, 1, 1]]; for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const d = c[i].reduce((s, v, k) => s + Math.abs(v - c[j][k]), 0); if (d === 1) e.push([c[i], c[j]]); } return e; })();

function SvgLattice({ yaw, color }) {
  const atoms = useMemo(diamondAtoms, []), bonds = useMemo(() => diamondBonds(atoms), [atoms]);
  const pr = p => { const x = p[0] - .5, y = p[1] - .5, z = p[2] - .5, c = Math.cos(yaw), s = Math.sin(yaw); const X = c * x + s * z, Z = -s * x + c * z, Y = y; const t = 0.42; return [340 + 260 * X, 165 - 260 * (Y * Math.cos(t) - Z * Math.sin(t)), Y * Math.sin(t) + Z * Math.cos(t)]; };
  const P = atoms.map(a => pr(a.p));
  const order = atoms.map((a, i) => i).sort((i, j) => P[i][2] - P[j][2]);
  return <svg viewBox="0 0 680 330" style={{ width: "100%", maxWidth: 680, display: "block", margin: "0 auto" }} role="img" aria-label="金刚石结构晶胞的正交投影">
    {EDGES.map(([a, b], i) => { const p = pr(a), q = pr(b); return <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke="#b9b4aa" strokeWidth="1.3" />; })}
    {bonds.map(([i, j], k) => <line key={"b" + k} x1={P[i][0]} y1={P[i][1]} x2={P[j][0]} y2={P[j][1]} stroke="#222" strokeWidth="4" />)}
    {order.map(i => <circle key={i} cx={P[i][0]} cy={P[i][1]} r={11 + 3 * P[i][2]} fill={color && atoms[i].sub ? B : A} stroke="#333" />)}
  </svg>;
}

export function DiamondCell() {
  const host = useRef(null), api = useRef(null);
  const [ready, setReady] = useState(false), [failed, setFailed] = useState(false);
  const [yaw, setYaw] = useState(0.55), [color, setColor] = useState(true);
  useEffect(() => {
    let dead = false, cleanup = () => { };
    (async () => {
      let renderer, controls, observer; const disposables = [];
      cleanup = () => { observer?.disconnect(); controls?.dispose(); disposables.forEach(d => d.dispose()); if (renderer) { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); } api.current = null; };
      try {
        const c = document.createElement("canvas");
        if (!(c.getContext("webgl2") || c.getContext("webgl"))) throw new Error("no webgl");
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead || !host.current) return;
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#faf8f3");
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50); camera.position.set(2.2, 1.6, 2.6);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("aria-label", "硅晶胞三维视图：拖动旋转，滚轮缩放"); host.current.appendChild(renderer.domElement);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x666055, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 2); dl.position.set(3, 4, 2); scene.add(dl);
        const atoms = diamondAtoms(), bonds = diamondBonds(atoms), off = v => v - 0.5;
        const sg = new THREE.SphereGeometry(0.06, 24, 16); disposables.push(sg);
        const mA = new THREE.MeshStandardMaterial({ color: A, roughness: .45, metalness: .1 }), mB = new THREE.MeshStandardMaterial({ color: B, roughness: .45, metalness: .1 });
        disposables.push(mA, mB);
        const meshes = atoms.map(a => { const m = new THREE.Mesh(sg, a.sub ? mB : mA); m.position.set(...a.p.map(off)); scene.add(m); return m; });
        const cg = new THREE.CylinderGeometry(0.018, 0.018, 1, 10); disposables.push(cg); const cm = new THREE.MeshStandardMaterial({ color: 0x222222 }); disposables.push(cm);
        bonds.forEach(([i, j]) => {
          const a = new THREE.Vector3(...atoms[i].p.map(off)), b = new THREE.Vector3(...atoms[j].p.map(off)), mid = a.clone().add(b).multiplyScalar(.5), dir = b.clone().sub(a);
          const m = new THREE.Mesh(cg, cm); m.scale.y = dir.length(); m.position.copy(mid); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize()); scene.add(m);
        });
        const eg = new THREE.BufferGeometry(); eg.setAttribute("position", new THREE.Float32BufferAttribute(EDGES.flat().flat().map(off), 3)); disposables.push(eg);
        const em = new THREE.LineBasicMaterial({ color: 0x999488 }); disposables.push(em); scene.add(new THREE.LineSegments(eg, em));
        const render = () => { if (!dead) renderer.render(scene, camera); };
        controls = new OrbitControls(camera, renderer.domElement); controls.enablePan = false; controls.minDistance = 1.6; controls.maxDistance = 8; controls.addEventListener("change", render);
        api.current = { color: on => { meshes.forEach((m, i) => { m.material = on && atoms[i].sub ? mB : mA; }); render(); } };
        observer = new ResizeObserver(() => { if (!host.current) return; const w = Math.max(260, host.current.clientWidth); renderer.setSize(w, 340); camera.aspect = w / 340; camera.updateProjectionMatrix(); render(); });
        observer.observe(host.current); setReady(true); render();
      } catch { cleanup(); if (!dead) setFailed(true); }
    })();
    return () => { dead = true; cleanup(); };
  }, []);
  useEffect(() => { api.current?.color(color); }, [color, ready]);
  return <div className="appa-3d">
    <div ref={host} style={{ width: "100%", height: ready ? 340 : 0, overflow: "hidden" }} />
    {!ready && <><SvgLattice yaw={yaw} color={color} />
      <label style={{ display: "block", fontSize: 13, maxWidth: 420, margin: "4px auto" }}>旋转角 <input type="range" min={0} max={6.28} step={0.01} value={yaw} onChange={e => setYaw(+e.target.value)} style={{ width: "100%" }} /></label></>}
    <p style={{ fontSize: 13, textAlign: "center", margin: "6px 0" }}>
      <label><input type="checkbox" checked={color} onChange={e => setColor(e.target.checked)} /> 用颜色区分两套 FCC 子晶格</label>
      {failed ? "当前环境未启用 WebGL：显示 SVG 投影（拖动滑块旋转）。" : ready ? "拖动旋转 · 滚轮缩放。每个原子恰有 4 根键（四面体）。" : "正在加载三维视图……"}</p>
  </div>;
}
