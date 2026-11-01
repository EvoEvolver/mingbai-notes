// KOH / TMAH 各向异性湿法刻蚀的三维模型（Three.js，按需加载；无 WebGL 时显示 SVG 剖面与俯视图）。
// 几何：(100) 硅片上氮化硅掩模开方形窗口（边长 a，可相对 ⟨110⟩ 旋转 α）。坑的侧壁是四个 (111) 面，
// 与表面夹角 θ = arctan√2 = 54.74°；坑口为外接于窗口、沿 ⟨110⟩ 对齐的正方形（边长 a(|cos α|+|sin α|)），
// (111) 面以 r111 沿法向缓慢后退（水平方向 r111·t/sin θ），(100) 底面以 r100 下降，两组侧壁相交即自停止（倒金字塔）。
import { useEffect, useRef, useState } from "react";
import { M } from "@kit";
import { MAT } from "./_ch09_figs.jsx";

const R = String.raw;
const TH = Math.atan(Math.SQRT2), TAN = Math.SQRT2, SIN = Math.sin(TH);
const ETCH = { KOH: { r100: 1.4, r111: 0.047, label: "KOH 44%，85 °C" }, TMAH: { r100: 0.5, r111: 0.0135, label: "TMAH 25%，80 °C" } };   // µm/min，表 9.2
const L = 1000, TW = 400;   // 硅块边长与厚度（µm）

export function pitGeom({ a, alpha, t, etch }) {
  const { r100, r111 } = ETCH[etch], ca = Math.abs(Math.cos(alpha)), sa = Math.abs(Math.sin(alpha));
  const W = a * (ca + sa) / 2 + r111 * t / SIN;          // 坑口半宽
  const dApex = W * TAN;                                   // 侧壁相交的深度（自停止）
  let d = Math.min(r100 * t, dApex), through = false;
  if (d >= TW) { d = TW; through = true; }
  const b = Math.max(W - d / TAN, 0);                      // 底面半宽
  const tStop = (a * (ca + sa) / 2) * TAN / (r100 - r111 * TAN / SIN);   // 近似自停止时间
  return { W, d, b, through, dApex, tStop: tStop > 0 ? tStop : Infinity, selfStopped: !through && r100 * t >= dApex };
}

function Fallback({ g, a, alpha }) {
  const s = 300 / L, cx = 170, top = 60, X = x => cx + x * s, Y = z => top + z * s;
  const hole = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([u, v]) => { const x = u * a / 2, y = v * a / 2; return [x * Math.cos(alpha) - y * Math.sin(alpha), x * Math.sin(alpha) + y * Math.cos(alpha)]; });
  const ox = 520, oy = 170, s2 = 0.26;
  return <svg viewBox="0 0 680 300" style={{ width: "100%", display: "block", fontFamily: "system-ui", fontSize: 12 }}>
    <text x={cx} y={24} textAnchor="middle">剖面（过坑中心，沿 ⟨110⟩）</text>
    <rect x={X(-L / 2)} y={Y(0)} width={L * s} height={TW * s} fill={MAT.si} stroke={MAT.siDark} />
    <polygon points={[[-g.W, 0], [-g.b, g.d], [g.b, g.d], [g.W, 0]].map(([x, z]) => `${X(x)},${Y(z)}`).join(" ")} fill="#fff" stroke="#333" />
    <rect x={X(-L / 2)} y={Y(0) - 6} width={(L / 2 - a / 2) * s} height={6} fill={MAT.nit} /><rect x={X(a / 2)} y={Y(0) - 6} width={(L / 2 - a / 2) * s} height={6} fill={MAT.nit} />
    <path d={`M${X(g.W) - 30},${Y(0)} A30,30 0 0 1 ${X(g.W) - 30 * Math.cos(TH)},${Y(0) + 30 * Math.sin(TH)}`} fill="none" stroke="#c0392b" />
    <text x={X(g.W) - 44} y={Y(0) + 22} fill="#c0392b">54.7°</text>
    <text x={cx} y={Y(TW) + 20} textAnchor="middle">深度 {g.d.toFixed(0)} µm{g.through ? "（已刻穿）" : g.selfStopped ? "（自停止）" : ""}</text>
    <text x={ox} y={24} textAnchor="middle">俯视图</text>
    <rect x={ox - L / 2 * s2} y={oy - L / 2 * s2} width={L * s2} height={L * s2} fill={MAT.nit} opacity="0.5" />
    <rect x={ox - g.W * s2} y={oy - g.W * s2} width={2 * g.W * s2} height={2 * g.W * s2} fill="#ddd" stroke="#333" />
    {g.b > 0 && <rect x={ox - g.b * s2} y={oy - g.b * s2} width={2 * g.b * s2} height={2 * g.b * s2} fill={g.through ? "#fff" : "#eee"} stroke="#333" />}
    {[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([u, v], i) => <line key={i} x1={ox + u * g.W * s2} y1={oy + v * g.W * s2} x2={ox + u * g.b * s2} y2={oy + v * g.b * s2} stroke="#333" />)}
    <polygon points={hole.map(([x, y]) => `${ox + x * s2},${oy + y * s2}`).join(" ")} fill="none" stroke="#2c6e49" strokeWidth="2" strokeDasharray="4 3" />
    <text x={ox} y={oy + L / 2 * s2 + 18} textAnchor="middle" fill="#2c6e49">绿虚线：掩模窗口</text>
  </svg>;
}

function buildPit(THREE, g) {
  const pos = [], quad = (p, q, r, s) => pos.push(...p, ...q, ...r, ...p, ...r, ...s);
  const y0 = 0, yb = -g.d, H = L / 2, W = g.W, b = g.b;
  // 顶面：大正方形减去坑口（四个梯形条）
  quad([-H, y0, -H], [H, y0, -H], [W, y0, -W], [-W, y0, -W]);
  quad([H, y0, -H], [H, y0, H], [W, y0, W], [W, y0, -W]);
  quad([H, y0, H], [-H, y0, H], [-W, y0, W], [W, y0, W]);
  quad([-H, y0, H], [-H, y0, -H], [-W, y0, -W], [-W, y0, W]);
  // 坑壁：四个 (111) 面
  quad([-W, y0, -W], [W, y0, -W], [b, yb, -b], [-b, yb, -b]);
  quad([W, y0, -W], [W, y0, W], [b, yb, b], [b, yb, -b]);
  quad([W, y0, W], [-W, y0, W], [-b, yb, b], [b, yb, b]);
  quad([-W, y0, W], [-W, y0, -W], [-b, yb, -b], [-b, yb, b]);
  if (b > 0 && !g.through) quad([-b, yb, -b], [b, yb, -b], [b, yb, b], [-b, yb, b]);
  // 侧面与底面
  const yB = -TW;
  quad([-H, y0, -H], [-H, yB, -H], [H, yB, -H], [H, y0, -H]); quad([H, y0, -H], [H, yB, -H], [H, yB, H], [H, y0, H]);
  quad([H, y0, H], [H, yB, H], [-H, yB, H], [-H, y0, H]); quad([-H, y0, H], [-H, yB, H], [-H, yB, -H], [-H, y0, -H]);
  if (g.through && b > 0) { quad([-H, yB, -H], [H, yB, -H], [b, yB, -b], [-b, yB, -b]); quad([H, yB, -H], [H, yB, H], [b, yB, b], [b, yB, -b]); quad([H, yB, H], [-H, yB, H], [-b, yB, b], [b, yB, b]); quad([-H, yB, H], [-H, yB, -H], [-b, yB, -b], [-b, yB, b]); }
  else quad([-H, yB, -H], [-H, yB, H], [H, yB, H], [H, yB, -H]);
  const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); geo.computeVertexNormals();
  return geo;
}
function buildMask(THREE, a, alpha) {
  const H = L / 2, sh = new THREE.Shape([new THREE.Vector2(-H, -H), new THREE.Vector2(H, -H), new THREE.Vector2(H, H), new THREE.Vector2(-H, H)]);
  const pts = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([u, v]) => { const x = u * a / 2, y = v * a / 2; return new THREE.Vector2(x * Math.cos(alpha) - y * Math.sin(alpha), x * Math.sin(alpha) + y * Math.cos(alpha)); });
  sh.holes.push(new THREE.Path(pts));
  const geo = new THREE.ExtrudeGeometry(sh, { depth: 8, bevelEnabled: false }); geo.rotateX(-Math.PI / 2);
  return geo;
}

export function KohPit3D() {
  const [a, setA] = useState(400), [alphaDeg, setAlpha] = useState(0), [t, setT] = useState(150), [etch, setEtch] = useState("KOH"), [showMask, setShowMask] = useState(true);
  const alpha = alphaDeg * Math.PI / 180, g = pitGeom({ a, alpha, t, etch });
  const host = useRef(null), api = useRef(null), [ready, setReady] = useState(false), [failed, setFailed] = useState(false);
  const cur = useRef({ g, a, alpha, showMask }); cur.current = { g, a, alpha, showMask };
  useEffect(() => {
    let dead = false, cleanup = () => {};
    (async () => {
      let renderer, controls, observer, meshes = [], mats = [];
      const disposeMeshes = () => { meshes.forEach(m => { m.geometry.dispose(); }); meshes.forEach(m => m.parent?.remove(m)); meshes = []; };
      const dispose = () => { observer?.disconnect(); controls?.dispose(); disposeMeshes(); mats.forEach(m => m?.dispose()); if (renderer) { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); } api.current = null; };
      cleanup = dispose;
      try {
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead || !host.current) return;
        const probe = document.createElement("canvas"); if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) throw new Error("no webgl");
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#faf8f3");
        const camera = new THREE.PerspectiveCamera(35, 1.6, 10, 10000); camera.position.set(900, 750, 1100);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("role", "img"); renderer.domElement.setAttribute("aria-label", "KOH 刻蚀倒金字塔坑的三维模型，可拖动旋转");
        host.current.appendChild(renderer.domElement);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x666655, 1.6)); const dl = new THREE.DirectionalLight(0xffffff, 2.2); dl.position.set(400, 1200, 700); scene.add(dl);
        const dl2 = new THREE.DirectionalLight(0xffffff, 0.8); dl2.position.set(-600, -300, -500); scene.add(dl2);
        const siMat = new THREE.MeshStandardMaterial({ color: 0xa9a9ad, roughness: 0.55, metalness: 0.15, side: THREE.DoubleSide, flatShading: true });
        const maskMat = new THREE.MeshStandardMaterial({ color: 0x7fbf8a, roughness: 0.6, transparent: true, opacity: 0.55, side: THREE.DoubleSide });
        const edgeMat = new THREE.LineBasicMaterial({ color: 0x333333 });
        mats = [siMat, maskMat, edgeMat];
        const render = () => { if (!dead) renderer.render(scene, camera); };
        controls = new OrbitControls(camera, renderer.domElement); controls.target.set(0, -120, 0); controls.minDistance = 400; controls.maxDistance = 4000; controls.addEventListener("change", render); controls.update();
        const rebuild = () => {
          disposeMeshes(); const c = cur.current;
          const pit = new THREE.Mesh(buildPit(THREE, c.g), siMat); scene.add(pit); meshes.push(pit);
          const eg = new THREE.EdgesGeometry(pit.geometry, 20), edges = new THREE.LineSegments(eg, edgeMat); scene.add(edges); meshes.push(edges);
          if (c.showMask) { const mk = new THREE.Mesh(buildMask(THREE, c.a, c.alpha), maskMat); scene.add(mk); meshes.push(mk); }
          render();
        };
        api.current = { rebuild, view: v => { camera.position.set(...({ iso: [900, 750, 1100], top: [0, 1800, 1], bottom: [300, -1400, 500] }[v])); controls.update(); render(); } };
        observer = new ResizeObserver(() => { if (!host.current) return; const w = Math.max(260, host.current.clientWidth), h = Math.round(Math.min(420, w * 0.62)); renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); render(); });
        observer.observe(host.current); rebuild(); setReady(true);
      } catch (e) { dispose(); if (!dead) setFailed(true); }
    })();
    return () => { dead = true; cleanup(); };
  }, []);
  useEffect(() => { api.current?.rebuild(); }, [g.W, g.d, g.b, g.through, a, alpha, showMask]);
  const sl = { width: "100%" }, lab = { display: "block", fontSize: 13 };
  const tMax = 300;
  return <div style={{ background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 10, padding: "12px 14px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "4px 18px" }}>
      <label style={lab}>刻蚀时间 <b>{t}</b> min<input type="range" min={0} max={tMax} value={t} onChange={e => setT(+e.target.value)} style={sl} /></label>
      <label style={lab}>窗口边长 <M>{R`a`}</M> = <b>{a}</b> µm<input type="range" min={100} max={800} step={10} value={a} onChange={e => setA(+e.target.value)} style={sl} /></label>
      <label style={lab}>窗口相对 ⟨110⟩ 旋转 <b>{alphaDeg}</b>°<input type="range" min={0} max={45} value={alphaDeg} onChange={e => setAlpha(+e.target.value)} style={sl} /></label>
      <label style={lab}>刻蚀液 <select value={etch} onChange={e => setEtch(e.target.value)}>{Object.keys(ETCH).map(k => <option key={k} value={k}>{ETCH[k].label}</option>)}</select>
        <span style={{ marginLeft: 10 }}><input type="checkbox" checked={showMask} onChange={e => setShowMask(e.target.checked)} /> 显示 Si₃N₄ 掩模</span></label>
    </div>
    <div style={{ position: "relative", minHeight: 260, marginTop: 6 }}>
      <div ref={host} style={{ width: "100%", height: ready ? "auto" : 0, overflow: "hidden" }} />
      {!ready && <Fallback g={g} a={a} alpha={alpha} />}
    </div>
    {ready && <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "4px 0" }}>{[["iso", "斜视"], ["top", "俯视"], ["bottom", "仰视"]].map(([k, s]) => <button key={k} onClick={() => api.current?.view(k)} style={{ padding: "3px 10px", borderRadius: 6, border: "1px solid #bcb6a9", background: "#fffdf8", cursor: "pointer" }}>{s}</button>)}</div>}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 6, fontSize: 13 }}>
      <div>坑深 <b>{g.d.toFixed(0)}</b> µm（<M>{R`r_{100}t`}</M> = {(ETCH[etch].r100 * t).toFixed(0)} µm）</div>
      <div>坑口边长 <b>{(2 * g.W).toFixed(0)}</b> µm，底面边长 <b>{(2 * g.b).toFixed(0)}</b> µm</div>
      <div>自停止深度 <M>{R`W\tan54.74^\circ`}</M> ≈ <b>{g.dApex.toFixed(0)}</b> µm{g.selfStopped ? "（已到达）" : ""}{g.through ? "，已刻穿 400 µm 硅片" : ""}</div>
    </div>
    <p style={{ fontSize: 12.5, color: "#666", margin: "6px 0 0" }}>{failed ? "当前环境未启用 WebGL，显示同一几何的剖面与俯视图。" : ready ? "拖动旋转 · 滚轮缩放 · 按钮切换视角。" : "正在加载三维视图；先看剖面与俯视图。"} 速率取表 9.2：KOH (100) 1.4 µm/min、(111) 0.047 µm/min；TMAH 0.5 / 0.0135 µm/min。几何模型（简化）：侧壁为 (111) 面，坑口为外接于窗口的 ⟨110⟩ 对齐正方形；不模拟凸角处的高指数面钻蚀。</p>
  </div>;
}
