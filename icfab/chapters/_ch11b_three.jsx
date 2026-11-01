// 第 11 章（下）三维场景（Three.js，按需懒加载；无 WebGL 时显示 SVG 剖面替代；卸载时释放全部 GPU 资源）。
// 1) Integration3D：硅中介层 + TSV + 微凸点 + Chiplet + 混合键合堆叠（图 11.50/11.52），可旋转、可爆炸视图。
// 2) Nand3D：3D NAND 垂直串（图 11.53），交替的字线/氧化层叠层、垂直沟道孔、台阶接触。
import { useEffect, useRef, useState } from "react";
import { MAT } from "./_ch11b_svg.jsx";

const hex = c => parseInt(c.slice(1), 16);
const panel = { background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 10, padding: 12 };

// 通用：建立场景，build(THREE, scene, track) 返回 update(params)；track(obj) 记录需要释放的几何/材质
function useThreeScene(host, build, params, camPos) {
  const api = useRef(null), pr = useRef(params);
  const [state, setState] = useState("loading");
  pr.current = params;
  useEffect(() => {
    let dead = false, cleanup = () => {};
    (async () => {
      const disposables = [];
      let renderer, controls, observer;
      const dispose = () => { observer?.disconnect(); controls?.dispose(); disposables.forEach(d => d.dispose?.()); if (renderer) { renderer.dispose(); renderer.forceContextLoss?.(); renderer.domElement.remove(); } api.current = null; };
      cleanup = dispose;
      try {
        const probe = document.createElement("canvas");
        if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) throw new Error("no webgl");
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead || !host.current) return;
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#faf8f3");
        const camera = new THREE.PerspectiveCamera(36, 1.6, 0.1, 200); camera.position.set(...camPos); camera.lookAt(0, 0, 0);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("role", "img"); renderer.domElement.setAttribute("aria-label", "可旋转的三维工艺结构；拖动旋转，滚轮缩放");
        host.current.appendChild(renderer.domElement);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x887766, 2.0));
        const dl = new THREE.DirectionalLight(0xffffff, 2.0); dl.position.set(5, 9, 6); scene.add(dl);
        const track = o => { disposables.push(o); return o; };
        const update = build(THREE, scene, track);
        const render = () => { if (!dead) renderer.render(scene, camera); };
        controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping = false; controls.addEventListener("change", render);
        controls.minDistance = 4; controls.maxDistance = 40;
        observer = new ResizeObserver(() => { if (!host.current) return; const w = Math.max(260, host.current.clientWidth), h = Math.round(Math.min(420, w * 0.62)); renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); render(); });
        observer.observe(host.current);
        api.current = { set: p => { update(p); render(); }, reset: () => { camera.position.set(...camPos); controls.target.set(0, 0, 0); controls.update(); render(); } };
        api.current.set(pr.current); setState("ready");
      } catch { dispose(); if (!dead) setState("failed"); }
    })();
    return () => { dead = true; cleanup(); };
  }, []);
  return [api, state];
}

const btnS = { padding: "4px 10px", borderRadius: 6, border: "1px solid #bcb6a9", background: "#fffdf8", cursor: "pointer", fontSize: 13 };

// ================= 1. Chiplet + 中介层 + TSV + 混合键合 =================
function buildIntegration(THREE, scene, track) {
  const mat = (c, o = {}) => track(new THREE.MeshStandardMaterial({ color: hex(c), roughness: .55, metalness: o.metal ?? .05, transparent: o.op != null, opacity: o.op ?? 1 }));
  const box = (w, h, d) => track(new THREE.BoxGeometry(w, h, d));
  const mSi = mat("#9a9a9a", { op: .55 }), mCu = mat(MAT.cu, { metal: .5 }), mSol = mat("#c8c8cc", { metal: .6 }), mDie = mat("#3b4a63"), mIO = mat("#5b6b52"),
    mGPU = mat("#6a4a5a"), mDram = mat("#4c5a6e"), mBase = mat("#2f3a48"), mHB = mat("#e0a060", { metal: .4 }), mSub = mat("#2f6b4f");
  const groups = {};
  const G = n => { const g = new THREE.Group(); scene.add(g); groups[n] = g; return g; };
  // 封装基板
  const sub = G("sub"); sub.add(new THREE.Mesh(box(11, .35, 8), mSub));
  // C4 焊球（中介层下方）
  const c4 = G("c4"); const sphB = track(new THREE.SphereGeometry(.16, 14, 10));
  for (let x = -4.5; x <= 4.5; x += .75) for (let z = -3; z <= 3; z += .75) { const m = new THREE.Mesh(sphB, mSol); m.position.set(x, 0, z); c4.add(m); }
  // 中介层 + TSV + RDL
  const ip = G("ip"); ip.add(new THREE.Mesh(box(10, .5, 7), mSi));
  const tsvG = track(new THREE.CylinderGeometry(.06, .06, .5, 10));
  for (let x = -4.5; x <= 4.5; x += .75) for (let z = -3; z <= 3; z += .75) { const m = new THREE.Mesh(tsvG, mCu); m.position.set(x, 0, z); ip.add(m); }
  const rdl = (x1, z1, x2, z2) => { const L = Math.hypot(x2 - x1, z2 - z1); const m = new THREE.Mesh(box(L, .03, .08), mCu); m.position.set((x1 + x2) / 2, .27, (z1 + z2) / 2); m.rotation.y = -Math.atan2(z2 - z1, x2 - x1); ip.add(m); };
  for (let k = -3; k <= 3; k++) { rdl(-1, k * .35, 1.2, k * .35); rdl(-2.6, 1.4 + k * .1, -2.6 + .01, 2.2 + k * .1); }
  for (let k = -3; k <= 3; k++) rdl(2.6 + k * .2, -1.4, 2.6 + k * .2, -0.4);
  // 微凸点与芯粒
  const ub = G("ub"), ch = G("chips"); const sphS = track(new THREE.SphereGeometry(.07, 10, 8));
  const chips = [{ x: -2.6, z: 0, w: 3.2, d: 2.6, m: mDie, name: "CPU" }, { x: -2.6, z: 2.6, w: 2.4, d: 1.2, m: mIO, name: "I/O" }, { x: 2.6, z: 1.6, w: 2.6, d: 2.4, m: mGPU, name: "加速器" }];
  for (const c of chips) {
    const m = new THREE.Mesh(box(c.w, .3, c.d), c.m); m.position.set(c.x, 0, c.z); ch.add(m);
    for (let x = c.x - c.w / 2 + .2; x < c.x + c.w / 2; x += .3) for (let z = c.z - c.d / 2 + .2; z < c.z + c.d / 2; z += .3) { const b = new THREE.Mesh(sphS, mCu); b.position.set(x, 0, z); ub.add(b); }
  }
  // HBM 式堆叠：基底逻辑芯片 + 4 层 DRAM，混合键合界面 + 内部 TSV
  const st = G("stack"); const dies = [];
  for (let i = 0; i < 5; i++) {
    const g = new THREE.Group(); const d = new THREE.Mesh(box(2.2, .28, 1.8), i ? mDram : mBase); g.add(d);
    if (i) { const hb = new THREE.Mesh(box(2.2, .04, 1.8), mHB); hb.position.y = -.16; g.add(hb); }
    const tg = track(new THREE.CylinderGeometry(.04, .04, .3, 8));
    for (let x = -.8; x <= .8; x += .4) { const t = new THREE.Mesh(tg, mCu); t.position.set(x, 0, 0); g.add(t); }
    st.add(g); dies.push(g);
  }
  for (let x = 1.7; x < 3.6; x += .3) for (let z = -2.4; z < -.8; z += .3) { const b = new THREE.Mesh(sphS, mCu); b.position.set(x, 0, z); ub.add(b); }
  return ({ e, xray }) => {
    mSi.opacity = xray ? .35 : .9;
    groups.sub.position.y = -1.0 - 1.2 * e; groups.c4.position.y = -.65 - .8 * e; groups.ip.position.y = 0;
    groups.ub.position.y = .32 + .5 * e; groups.chips.position.y = .55 + 1.1 * e;
    groups.stack.position.set(2.6, .55 + 1.1 * e, -1.6);
    dies.forEach((d, i) => { d.position.y = i * (.32 + .45 * e); });
  };
}
function IntegrationSvg({ e }) {
  const y = v => 230 - v;
  return <svg viewBox="0 0 680 260" style={{ width: "100%" }} role="img" aria-label="Chiplet、中介层、TSV 与堆叠芯片的剖面（无 WebGL 时的替代图）">
    <rect x={40} y={y(10) + 30 * e} width={600} height={18} fill="#2f6b4f" />
    {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={70 + i * 36} cy={y(22) + 18 * e} r={7} fill="#c8c8cc" stroke="#888" />)}
    <rect x={60} y={y(60)} width={560} height={30} fill="#aaa" stroke="#666" />
    {Array.from({ length: 16 }, (_, i) => <rect key={i} x={68 + i * 36} y={y(60)} width={5} height={30} fill={MAT.cu} />)}
    <line x1={140} x2={330} y1={y(60) + 2} y2={y(60) + 2} stroke={MAT.cu} strokeWidth="3" />
    {[[80, 190, "CPU"], [210, 120, "I/O"], [420, 110, "基底逻辑"]].map(([x, w, l], i) => <g key={i}>
      {Array.from({ length: Math.floor(w / 12) }, (_, k) => <circle key={k} cx={x + 6 + k * 12} cy={y(66) - 8 * e} r={3} fill={MAT.cu} />)}
      <rect x={x} y={y(92) - 22 * e} width={w} height={20} fill="#3b4a63" /><text x={x + w / 2} y={y(78) - 22 * e} fill="#fff" fontSize="12" textAnchor="middle">{l}</text></g>)}
    {[1, 2, 3, 4].map(i => <g key={i}><rect x={420} y={y(92 + i * 22) - 22 * e - i * 12 * e} width={110} height={18} fill="#4c5a6e" /><rect x={420} y={y(92 + i * 22) - 22 * e - i * 12 * e + 18} width={110} height={3} fill="#e0a060" /></g>)}
    <text x={540} y={y(160) - 40 * e} fontSize="12">DRAM 堆叠（混合键合）</text>
    <text x={630} y={y(48)} fontSize="12" textAnchor="end">硅中介层 + TSV</text>
  </svg>;
}
export function Integration3D() {
  const host = useRef(null), [e, setE] = useState(0.35), [xray, setX] = useState(true);
  const [api, state] = useThreeScene(host, buildIntegration, { e, xray }, [9, 7.5, 10]);
  useEffect(() => { api.current?.set({ e, xray }); }, [e, xray]);
  return <div style={panel}>
    <label style={{ fontSize: 14 }}>爆炸视图：{Math.round(e * 100)}%<input type="range" min={0} max={1} step={0.01} value={e} onChange={ev => setE(+ev.target.value)} style={{ width: "100%" }} /></label>
    <div style={{ display: "flex", gap: 8, margin: "4px 0" }}><button style={btnS} onClick={() => setX(!xray)} disabled={state !== "ready"}>{xray ? "中介层：半透明（看 TSV）" : "中介层：不透明"}</button><button style={btnS} onClick={() => api.current?.reset()} disabled={state !== "ready"}>复位视角</button></div>
    <div ref={host} style={{ width: "100%", display: state === "ready" ? "block" : "none" }} />
    {state !== "ready" && <IntegrationSvg e={e} />}
    <p style={{ fontSize: 13, margin: "4px 0 0" }}>{state === "failed" ? "当前环境不支持 WebGL，显示剖面替代图（爆炸滑块仍可用）。" : state === "ready" ? "拖动旋转 · 滚轮缩放。" : "正在加载三维视图…"}
      自下而上：封装基板（绿）→ C4 焊球 → 硅中介层（内嵌铜 TSV，表面铜 RDL 走线）→ 微凸点 → 芯粒（CPU、I/O、加速器）；右后方为 1 颗基底逻辑芯片 + 4 层 DRAM，层间是混合键合界面（橙色薄层）与芯片内 TSV。</p>
  </div>;
}

// ================= 2. 3D NAND 垂直串 =================
function buildNand(THREE, scene, track) {
  const mat = (c, o = {}) => track(new THREE.MeshStandardMaterial({ color: hex(c), roughness: .6, metalness: o.metal ?? .05, transparent: o.op != null, opacity: o.op ?? 1, depthWrite: o.op == null, side: THREE.DoubleSide }));
  const mWL = mat("#8f8f99", { metal: .3, op: .3 }), mOx = mat(MAT.sio2, { op: .15 }), mCh = mat(MAT.poly), mCT = mat(MAT.sin), mW = mat(MAT.w, { metal: .5 }), mCu = mat(MAT.cu, { metal: .5 }), mSi = mat("#9a9a9a");
  const root = new THREE.Group(); scene.add(root);
  let cur = [];
  return ({ n, cut }) => {
    cur.forEach(o => { root.remove(o); o.geometry?.dispose(); }); cur = [];
    const add = (geo, m, x, y, z) => { const o = new THREE.Mesh(track(geo), m); o.position.set(x, y, z); root.add(o); cur.push(o); return o; };
    const t = 0.16, H = n * 2 * t, y0 = -H / 2, W = 6, D = 3;
    add(new THREE.BoxGeometry(W + 2.2, .4, D), mSi, -1.1, y0 - .2, 0);
    for (let i = 0; i < n; i++) {
      const step = (n - 1 - i) * (2.0 / n);                              // 台阶：越往上越短
      const yw = y0 + (2 * i + 1.5) * t, yo = y0 + (2 * i + .5) * t;
      add(new THREE.BoxGeometry(W + step, t, D), mOx, -step / 2, yo, 0);
      add(new THREE.BoxGeometry(W + step, t * .9, D), mWL, -step / 2, yw, 0);
      if (i % Math.max(1, Math.round(n / 8)) === 0) {               // 台阶接触（W）
        const h = H - (2 * i + 1.5) * t + .3;
        add(new THREE.CylinderGeometry(.07, .07, h, 10), mW, -W / 2 - step + .2, yw + h / 2, -D / 2 + .5);
      }
    }
    // 垂直沟道孔阵列：外环电荷俘获层（SiN），内为多晶沟道
    for (let x = -2.2; x <= 2.21; x += 1.1) for (let z = -1; z <= 1.01; z += 1) {
      if (cut && z > 0.5) continue;
      add(new THREE.CylinderGeometry(.28, .28, H, 20, 1, true), mCT, x, 0, z);
      add(new THREE.CylinderGeometry(.18, .18, H + .05, 16), mCh, x, 0, z);
    }
    for (let x = -2.2; x <= 2.21; x += 1.1) add(new THREE.BoxGeometry(.18, .08, D + .4), mCu, x, H / 2 + .2, 0);   // 位线
  };
}
function NandSvg({ n }) {
  const L = Math.min(n, 24), h = 200 / (2 * L);
  return <svg viewBox="0 0 680 260" style={{ width: "100%" }} role="img" aria-label="3D NAND 垂直串剖面（无 WebGL 时的替代图）">
    <rect x={60} y={230} width={560} height={20} fill="#9a9a9a" /><text x={340} y={245} textAnchor="middle" fontSize="12">衬底 / 公共源线</text>
    {Array.from({ length: L }, (_, i) => <g key={i}><rect x={60} y={230 - (2 * i + 1) * h} width={560} height={h} fill={MAT.sio2} /><rect x={60} y={230 - (2 * i + 2) * h} width={560} height={h} fill="#8f8f99" /></g>)}
    {[150, 260, 370, 480].map(x => <g key={x}><rect x={x - 14} y={30} width={28} height={200} fill={MAT.sin} /><rect x={x - 8} y={28} width={16} height={202} fill={MAT.poly} /></g>)}
    <rect x={120} y={18} width={400} height={8} fill={MAT.cu} /><text x={540} y={26} fontSize="12">位线</text>
  </svg>;
}
export function Nand3D() {
  const host = useRef(null), [n, setN] = useState(16), [cut, setCut] = useState(true);
  const [api, state] = useThreeScene(host, buildNand, { n, cut }, [-9, 5, 12]);
  useEffect(() => { api.current?.set({ n, cut }); }, [n, cut]);
  return <div style={panel}>
    <label style={{ fontSize: 14 }}>字线层数：{n}（商用产品已超过 200 层）<input type="range" min={4} max={48} step={4} value={n} onChange={ev => setN(+ev.target.value)} style={{ width: "100%" }} /></label>
    <div style={{ display: "flex", gap: 8, margin: "4px 0" }}><button style={btnS} onClick={() => setCut(!cut)} disabled={state !== "ready"}>{cut ? "显示全部沟道孔" : "剖开一排沟道孔"}</button><button style={btnS} onClick={() => api.current?.reset()} disabled={state !== "ready"}>复位视角</button></div>
    <div ref={host} style={{ width: "100%", display: state === "ready" ? "block" : "none" }} />
    {state !== "ready" && <NandSvg n={n} />}
    <p style={{ fontSize: 13, margin: "4px 0 0" }}>{state === "failed" ? "当前环境不支持 WebGL，显示剖面替代图。" : state === "ready" ? "拖动旋转 · 滚轮缩放。" : "正在加载三维视图…"}
      灰色半透明板 = 字线（控制栅），浅蓝 = 层间氧化物；每根竖直圆柱是一条 NAND 串：外环绿色为电荷俘获层，内芯红棕为多晶硅沟道，字线与沟道每相交一次就是一个存储晶体管。左侧台阶上的金色竖柱是逐层引出字线的接触，顶部橙色为位线。</p>
  </div>;
}
