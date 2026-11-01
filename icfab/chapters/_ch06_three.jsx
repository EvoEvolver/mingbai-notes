// 三维：硅柱（凸）与圆孔（凹）的氧化——剖切视图。按需懒加载 three；无 WebGL 时显示 SVG 截面。卸载时释放全部资源。
import { useEffect, useRef, useState } from "react";
import { TxI } from "@kit";
import { panel, row, btn, Range, COL, Svg, cylGeom } from "./_ch06_draw.jsx";

const R = String.raw;
const R0P = 1.0, R0H = 0.75, HGT = 1.6, PHI0 = 0.35 * Math.PI, PHIL = 1.55 * Math.PI;   // 柱半径、孔半径、截取高度、剖切角

// 环形截面（r1..r2，高 HGT）的 Lathe 剖切体 + 两个切面
function ringMesh(THREE, r1, r2, mat, out) {
  const pts = [new THREE.Vector2(r1, -HGT / 2), new THREE.Vector2(r2, -HGT / 2), new THREE.Vector2(r2, HGT / 2), new THREE.Vector2(r1, HGT / 2), new THREE.Vector2(r1, -HGT / 2)];
  const g = new THREE.LatheGeometry(pts, 72, PHI0, PHIL); out.push(g);
  const grp = new THREE.Group(); grp.add(new THREE.Mesh(g, mat));
  const shape = new THREE.Shape(pts.slice(0, 4)); const sg = new THREE.ShapeGeometry(shape); out.push(sg);
  for (const ph of [PHI0, PHI0 + PHIL]) { const m = new THREE.Mesh(sg, mat); m.rotation.y = ph - Math.PI / 2; grp.add(m); }
  return grp;
}

function FallbackSvg({ f }) {
  const c = cylGeom(70, f, false), h = cylGeom(52, f, true);
  return <Svg h={220} title="柱与孔氧化的截面（无 WebGL 时的替代图）">
    <g transform="translate(170,110)"><circle r={c.R} fill={COL.ox} stroke={COL.oxDark} /><circle r={c.rs} fill={COL.si} stroke="#777" /><circle r={70} fill="none" stroke={COL.red} strokeDasharray="5 4" /></g>
    <g transform="translate(500,110)"><rect x={-140} y={-100} width={280} height={200} fill={COL.si} stroke="#777" /><circle r={h.rs} fill={COL.ox} stroke={COL.oxDark} /><circle r={h.R} fill="#fff" stroke="#777" /><circle r={52} fill="none" stroke={COL.red} strokeDasharray="5 4" /></g>
  </Svg>;
}

export function PillarHole3D() {
  const host = useRef(null), api = useRef(null), fRef = useRef(0.6);
  const [f, setF] = useState(0.6), [ready, setReady] = useState(false), [failed, setFailed] = useState(false);
  fRef.current = f;
  useEffect(() => {
    let dead = false, cleanup = () => { };
    (async () => {
      let renderer, controls, observer; const geos = [], mats = [];
      const dispose = () => { observer?.disconnect(); controls?.dispose(); geos.forEach(g => g.dispose()); mats.forEach(m => m.dispose()); if (renderer) { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); } api.current = null; };
      cleanup = dispose;
      try {
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead || !host.current) return;
        const test = document.createElement("canvas"); if (!(test.getContext("webgl2") || test.getContext("webgl"))) throw new Error("no webgl");
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#faf8f3");
        const camera = new THREE.PerspectiveCamera(35, 2, 0.1, 50); camera.position.set(0.6, 3.4, 6.2); camera.lookAt(0, 0, 0);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("role", "img"); renderer.domElement.setAttribute("aria-label", "可旋转的三维剖切图：左为氧化中的硅柱，右为氧化中的圆孔");
        host.current.appendChild(renderer.domElement);
        const mSi = new THREE.MeshStandardMaterial({ color: 0xb9bcc2, roughness: 0.6, metalness: 0.15, side: THREE.DoubleSide });
        const mOx = new THREE.MeshStandardMaterial({ color: 0x8fc6ec, roughness: 0.35, transparent: true, opacity: 0.85, side: THREE.DoubleSide });
        const mRef = new THREE.LineBasicMaterial({ color: 0xc0392b }); mats.push(mSi, mOx, mRef);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x776655, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 2.0); dl.position.set(3, 6, 4); scene.add(dl);
        // 原始表面参考圈
        const circ = (r, x) => { const pts = []; for (let i = 0; i <= 96; i++) { const a = i / 96 * 2 * Math.PI; pts.push(new THREE.Vector3(x + r * Math.sin(a), HGT / 2 + 0.01, r * Math.cos(a))); } const g = new THREE.BufferGeometry().setFromPoints(pts); geos.push(g); scene.add(new THREE.Line(g, mRef)); };
        circ(R0P, -1.9); circ(R0H, 1.9);
        let dyn = new THREE.Group(); scene.add(dyn); let dynGeos = [];
        const build = ff => {
          scene.remove(dyn); dynGeos.forEach(g => g.dispose()); dynGeos = []; dyn = new THREE.Group();
          const c = cylGeom(R0P, ff, false), h = cylGeom(R0H, ff, true);
          const a = ringMesh(THREE, 0.0001, c.rs, mSi, dynGeos), b = ringMesh(THREE, c.rs, c.R, mOx, dynGeos);
          a.position.x = b.position.x = -1.9; dyn.add(a, b);
          const s = ringMesh(THREE, h.rs, 1.55, mSi, dynGeos), o = ringMesh(THREE, Math.max(0.0001, h.R), h.rs, mOx, dynGeos);
          s.position.x = o.position.x = 1.9; dyn.add(s, o); scene.add(dyn);
        };
        const render = () => { if (!dead) renderer.render(scene, camera); };
        controls = new OrbitControls(camera, renderer.domElement); controls.enablePan = false; controls.minDistance = 3; controls.maxDistance = 14; controls.addEventListener("change", render);
        api.current = { set: ff => { build(ff); render(); }, view: k => { camera.position.set(...(k === "top" ? [0, 7.5, 0.01] : [0.6, 3.4, 6.2])); controls.update(); render(); } };
        observer = new ResizeObserver(() => { if (!host.current) return; const w = Math.max(260, host.current.clientWidth), hh = Math.round(Math.min(360, w * 0.55)); renderer.setSize(w, hh); camera.aspect = w / hh; camera.updateProjectionMatrix(); render(); });
        observer.observe(host.current);
        geos.push({ dispose: () => dynGeos.forEach(g => g.dispose()) });
        api.current.set(fRef.current); setReady(true);
      } catch { dispose(); if (!dead) setFailed(true); }
    })();
    return () => { dead = true; cleanup(); };
  }, []);
  useEffect(() => { api.current?.set(f); }, [f]);
  const c = cylGeom(1, f, false), h = cylGeom(1, f, true);
  return <div style={panel}>
    <div style={{ position: "relative" }}><div ref={host} style={{ width: "100%", height: ready ? "auto" : 0, overflow: "hidden" }} />{!ready && <FallbackSvg f={f} />}</div>
    <div style={row}><button style={btn(false)} disabled={!ready} onClick={() => api.current?.view("iso")}>斜视</button><button style={btn(false)} disabled={!ready} onClick={() => api.current?.view("top")}>俯视</button>
      <span style={{ fontSize: 12.5, color: "#666" }}>{failed ? "当前环境未启用 WebGL，显示的是同一几何的截面图。" : ready ? "拖动旋转 · 滚轮/双指缩放。灰：硅；蓝：SiO2；红圈：原始硅表面。" : "正在加载三维视图……"}</span></div>
    <Range label="氧化进度" value={f} min={0} max={1} step={0.01} onChange={setF} fmt={v => `${(v * 100).toFixed(0)}%`} />
    <div style={{ fontSize: 13.5 }}><TxI>{R`左（柱，凸角）：氧化层外径 $=${c.R.toFixed(2)}\,r_0$，最外层旧氧化层切向**拉伸** ${((c.stretch - 1) * 100).toFixed(0)}%。右（孔，凹角）：孔径缩为 $${h.R.toFixed(2)}\,r_0$，内表面氧化层切向**压缩** ${((1 - h.stretch) * 100).toFixed(0)}%。体积守恒：新生氧化层体积 $=2.2\times$ 被消耗的硅体积。`}</TxI></div>
  </div>;
}
