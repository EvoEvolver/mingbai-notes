// 三维：晶圆剖块中的吸杂过程（本征：体内 SiO2 沉淀；非本征：背面损伤层）。
// 按需懒加载 three；无 WebGL 时显示同一组数据的二维剖面投影；卸载时释放全部资源。
import { useEffect, useMemo, useRef, useState } from "react";
import { rng } from "./_ch04_phys.jsx";

// 几何（任意单位）：x ∈ [-2,2]，z ∈ [-1.2,1.2]；y：器件层 1.1–1.2，洁净区 0.8–1.1，体区 -1.0–0.8，背面损伤层 -1.2–-1.0
const Y = { top: 1.2, dev: 1.1, dz: 0.8, back: -1.0, bot: -1.2 };
function makeData() {
  const r = rng(2024), prec = [], atoms = [];
  for (let i = 0; i < 160; i++) prec.push([(r() * 2 - 1) * 1.9, Y.back + 0.05 + r() * (Y.dz - Y.back - 0.1), (r() * 2 - 1) * 1.1, 0.03 + 0.04 * r()]);
  for (let i = 0; i < 260; i++) atoms.push([(r() * 2 - 1) * 1.9, Y.bot + 0.25 + r() * (Y.top - Y.bot - 0.3), (r() * 2 - 1) * 1.1, r()]);
  return { prec, atoms };
}
function targets(data, mode) {
  return data.atoms.map(([x, y, z, u]) => {
    if (mode === "back") return [x + (u - 0.5) * 0.2, Y.bot + 0.04 + 0.12 * u, z];
    let best = null, bd = 1e9;
    for (const p of data.prec) { const d = (p[0] - x) ** 2 + (p[1] - y) ** 2 + (p[2] - z) ** 2; if (d < bd) { bd = d; best = p; } }
    const a = u * 6.283; return [best[0] + Math.cos(a) * best[3] * 1.3, best[1] + Math.sin(a) * best[3] * 1.3, best[2]];
  });
}
// 进度 s∈[0,1]：每个原子有自己的到达时刻（距离越远越晚），之后停在陷阱处
function posAt(a, t, s) {
  const d = Math.hypot(t[0] - a[0], t[1] - a[1], t[2] - a[2]), arrive = Math.min(1, 0.15 + d * 0.35 + a[3] * 0.2);
  const k = Math.min(1, s / arrive), e = k * k * (3 - 2 * k), w = Math.sin(k * Math.PI) * 0.06;
  return [a[0] + (t[0] - a[0]) * e + w * Math.sin(a[3] * 40), a[1] + (t[1] - a[1]) * e, a[2] + (t[2] - a[2]) * e + w * Math.cos(a[3] * 40)];
}

function Fallback({ data, tg, s, mode }) {
  const X = x => 40 + (x + 2) * 150, Yp = y => 20 + (Y.top - y) * 110;
  return <svg viewBox="0 0 680 300" style={{ width: "100%", maxWidth: 680, display: "block", margin: "0 auto" }} role="img" aria-label="吸杂过程的二维剖面投影">
    <rect x={X(-2)} y={Yp(Y.top)} width="600" height={Yp(Y.bot) - Yp(Y.top)} fill="#e6e6e6" stroke="#333" />
    <rect x={X(-2)} y={Yp(Y.top)} width="600" height={Yp(Y.dev) - Yp(Y.top)} fill="#d4a017" opacity=".6" />
    <rect x={X(-2)} y={Yp(Y.dev)} width="600" height={Yp(Y.dz) - Yp(Y.dev)} fill="#f6f6f6" />
    <rect x={X(-2)} y={Yp(Y.back)} width="600" height={Yp(Y.bot) - Yp(Y.back)} fill={mode === "back" ? "#9a9a9a" : "#d0d0d0"} />
    {mode !== "back" && data.prec.map((p, i) => <circle key={i} cx={X(p[0])} cy={Yp(p[1])} r={p[3] * 90} fill="#7fb8d9" opacity=".8" />)}
    {data.atoms.map((a, i) => { const q = posAt(a, tg[i], s); return <circle key={"a" + i} cx={X(q[0])} cy={Yp(q[1])} r="2.6" fill="#e67e22" />; })}
    <text x={X(2) + 6} y={Yp(1.15)} fontSize="11">器件层</text><text x={X(2) + 6} y={Yp(0.95)} fontSize="11">洁净区</text>
    <text x={X(2) + 6} y={Yp(0)} fontSize="11">体区</text><text x={X(2) + 6} y={Yp(-1.1)} fontSize="11">背面</text>
  </svg>;
}

export function GetterScene3D() {
  const data = useMemo(makeData, []);
  const [mode, setMode] = useState("intr"), [s, setS] = useState(0);
  const tg = useMemo(() => targets(data, mode), [data, mode]);
  const host = useRef(null), api = useRef(null);
  const [ready, setReady] = useState(false), [failed, setFailed] = useState(false);
  const st = useRef({ s, tg, mode }); st.current = { s, tg, mode };
  useEffect(() => {
    let dead = false, cleanup = () => {};
    (async () => {
      const disposables = []; let renderer, controls, observer;
      cleanup = () => { observer?.disconnect(); controls?.dispose(); disposables.forEach(d => d.dispose()); if (renderer) { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); } api.current = null; };
      try {
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead || !host.current) return;
        const T = o => (disposables.push(o), o);
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#faf8f3");
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50); camera.position.set(4.2, 2.6, 5.2); camera.lookAt(0, 0, 0);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("role", "img"); renderer.domElement.setAttribute("aria-label", "可旋转的晶圆剖块：拖动旋转，滚轮缩放");
        host.current.appendChild(renderer.domElement);
        const slab = (y0, y1, color, opacity) => {
          const g = T(new THREE.BoxGeometry(4, y1 - y0, 2.4)), m = T(new THREE.MeshStandardMaterial({ color, transparent: opacity < 1, opacity, depthWrite: opacity >= 1, roughness: 0.8 }));
          const mesh = new THREE.Mesh(g, m); mesh.position.y = (y0 + y1) / 2; scene.add(mesh);
          const e = T(new THREE.EdgesGeometry(g)), lm = T(new THREE.LineBasicMaterial({ color: 0x555555, transparent: true, opacity: 0.5 }));
          const l = new THREE.LineSegments(e, lm); l.position.y = mesh.position.y; scene.add(l); return m;
        };
        slab(Y.dev, Y.top, 0xd4a017, 0.55);
        slab(Y.dz, Y.dev, 0xf2f2f2, 0.18);
        slab(Y.back, Y.dz, 0xbdbdbd, 0.16);
        const backMat = slab(Y.bot, Y.back, 0x8a8a8a, 0.35);
        // 沉淀
        const sg = T(new THREE.SphereGeometry(1, 12, 8)), pm = T(new THREE.MeshStandardMaterial({ color: 0x7fb8d9, roughness: 0.5 }));
        const prec = new THREE.InstancedMesh(sg, pm, data.prec.length); const M = new THREE.Matrix4();
        data.prec.forEach((p, i) => { M.makeScale(p[3], p[3] * 0.7, p[3]); M.setPosition(p[0], p[1], p[2]); prec.setMatrixAt(i, M); }); scene.add(prec);
        // 金属原子
        const ag = T(new THREE.SphereGeometry(0.028, 10, 8)), am = T(new THREE.MeshStandardMaterial({ color: 0xe67e22, emissive: 0x6a2c00, roughness: 0.4 }));
        const atoms = new THREE.InstancedMesh(ag, am, data.atoms.length); scene.add(atoms);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x666655, 2.2)); const L = new THREE.DirectionalLight(0xffffff, 1.8); L.position.set(3, 5, 4); scene.add(L);
        const render = () => { if (!dead) renderer.render(scene, camera); };
        const update = () => {
          const { s, tg, mode } = st.current;
          data.atoms.forEach((a, i) => { const q = posAt(a, tg[i], s); M.makeTranslation(q[0], q[1], q[2]); atoms.setMatrixAt(i, M); });
          atoms.instanceMatrix.needsUpdate = true; prec.visible = mode !== "back"; backMat.opacity = mode === "back" ? 0.8 : 0.35; render();
        };
        controls = new OrbitControls(camera, renderer.domElement); controls.enablePan = false; controls.minDistance = 3; controls.maxDistance = 14; controls.addEventListener("change", render);
        observer = new ResizeObserver(() => { if (!host.current) return; const w = Math.max(260, host.current.clientWidth), h = Math.round(Math.min(420, w * 0.62)); renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); render(); });
        observer.observe(host.current);
        api.current = { update }; update(); setReady(true);
      } catch { cleanup(); if (!dead) setFailed(true); }
    })();
    return () => { dead = true; cleanup(); };
  }, [data]);
  useEffect(() => { api.current?.update(); }, [s, tg, mode]);
  const btn = on => ({ padding: "3px 10px", borderRadius: 6, border: "1px solid #888", background: on ? "#2c4a6e" : "#fff", color: on ? "#fff" : "#222", cursor: "pointer" });
  return <div className="card" style={{ padding: 12 }}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 8 }}>
      <button style={btn(mode === "intr")} onClick={() => setMode("intr")}>本征吸杂（体内 SiO₂ 沉淀）</button>
      <button style={btn(mode === "back")} onClick={() => setMode("back")}>非本征吸杂（背面损伤层）</button>
      <label style={{ flex: "1 1 220px", display: "flex", gap: 8, alignItems: "center" }}>热处理进程<input type="range" min="0" max="1" step="0.01" value={s} onChange={e => setS(+e.target.value)} style={{ flex: 1 }} /></label>
    </div>
    <div style={{ position: "relative" }}>
      <div ref={host} style={{ width: "100%", height: ready ? "auto" : 0, overflow: "hidden" }} />
      {!ready && <Fallback data={data} tg={tg} s={s} mode={mode} />}
    </div>
    <p style={{ fontSize: 13, textAlign: "center", margin: "6px 0 0" }}>{failed ? "当前环境未启用 WebGL，已显示同一组原子的二维剖面投影（滑块同样可用）。" : ready ? "拖动旋转 · 滚轮/双指缩放。橙点＝金属原子，蓝色椭球＝二氧化硅沉淀，顶部金色＝器件层。" : "正在加载三维视图；二维剖面可先阅读。"}</p>
  </div>;
}
