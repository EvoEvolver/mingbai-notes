// 图 11.2：互连层级。HierarchySVG 为二维剖面（自绘，同时作无 WebGL 时的替代图）；
// Stack3D 为可旋转的 Three.js 多层互连堆栈（进入视口时才加载 three，卸载时释放全部 GPU 资源）。
import { useEffect, useRef, useState } from "react";
import { COL, Svg, T } from "./_ch11_figs.jsx";

// 层级数据：pitch / 线宽 / 线高 / 通孔高（相对单位）；local = 局部，mid = 中间，glob = 全局
export const LEVELS = [
  { name: "M1", g: "local", pitch: 0.4, w: 0.2, h: 0.24, vh: 0.2 },
  { name: "M2", g: "local", pitch: 0.4, w: 0.2, h: 0.24, vh: 0.2 },
  { name: "M3", g: "mid", pitch: 0.8, w: 0.4, h: 0.42, vh: 0.32 },
  { name: "M4", g: "mid", pitch: 0.8, w: 0.4, h: 0.42, vh: 0.32 },
  { name: "M5", g: "mid", pitch: 0.8, w: 0.4, h: 0.42, vh: 0.32 },
  { name: "M6", g: "mid", pitch: 0.8, w: 0.4, h: 0.42, vh: 0.32 },
  { name: "M7", g: "glob", pitch: 2.0, w: 1.0, h: 0.9, vh: 0.6 },
  { name: "M8", g: "glob", pitch: 2.0, w: 1.0, h: 0.9, vh: 0.6 },
];
const GROUPS = [
  { id: "feol", label: "衬底与晶体管" }, { id: "contact", label: "W 接触塞" },
  { id: "local", label: "局部 M1–M2" }, { id: "mid", label: "中间 M3–M6" }, { id: "glob", label: "全局 M7–M8" }, { id: "diel", label: "介质（半透明）" },
];
const GCOL = { local: "#2c6e49", mid: "#2c4a6e", glob: "#7d3c98" };

// ---------- 二维剖面（图 11.2 的自绘版 / 3D 的替代图）----------
export function HierarchySVG() {
  const X0 = 150, WID = 260, S = 60;   // 1 相对单位 = 60 px（横向），纵向同比例
  let y = 490; const parts = [];
  // 衬底、晶体管、PMD 与 W 接触
  parts.push(<rect key="si" x={X0} y={y} width={WID} height={40} fill={COL.si} stroke="#555" />);
  for (let i = 0; i < 6; i++) parts.push(<rect key={"g" + i} x={X0 + 14 + i * 42} y={y - 14} width={14} height={14} fill={COL.poly} />);
  parts.push(<rect key="pmd" x={X0} y={y - 40} width={WID} height={40} fill={COL.ox} stroke="#555" opacity={0.85} />);
  for (let i = 0; i < 6; i++) parts.push(<rect key={"w" + i} x={X0 + 34 + i * 42} y={y - 40} width={8} height={40} fill={COL.w} />);
  const pmdTop = y - 40; y = pmdTop;
  const bands = {};
  LEVELS.forEach((L, k) => {
    const vh = L.vh * S, h = L.h * S, p = L.pitch * S, w = L.w * S, top = y - vh - h;
    parts.push(<rect key={"d" + k} x={X0} y={top} width={WID} height={vh + h} fill={COL.lowk} stroke="#888" strokeWidth={0.5} />);
    parts.push(<rect key={"es" + k} x={X0} y={y - 3} width={WID} height={3} fill={COL.nit} />);
    if (k % 2 === 0) {          // 垂直于剖面的线：小矩形
      for (let x = X0 + (p - w) / 2, i = 0; x + w <= X0 + WID; x += p, i++) {
        parts.push(<rect key={`l${k}-${i}`} x={x} y={top} width={w} height={h} fill={COL.cu} stroke="#7a4a1a" strokeWidth={0.5} />);
        if ((i * 7 + k * 3) % 3 === 0) parts.push(<rect key={`v${k}-${i}`} x={x + w / 4} y={top + h} width={w / 2} height={vh} fill={COL.cu} />);
      }
    } else {                    // 平行于剖面的线：长条
      const segs = k < 2 ? [[0, 0.45], [0.55, 1]] : k < 6 ? [[0, 0.3], [0.38, 0.8], [0.88, 1]] : [[0, 0.62], [0.72, 1]];
      segs.forEach(([a, b], i) => {
        parts.push(<rect key={`l${k}-${i}`} x={X0 + a * WID} y={top} width={(b - a) * WID} height={h} fill={COL.cu} stroke="#7a4a1a" strokeWidth={0.5} />);
        parts.push(<rect key={`v${k}-${i}`} x={X0 + (a + 0.08) * WID} y={top + h} width={w / 2} height={vh} fill={COL.cu} />);
      });
    }
    (bands[L.g] ||= [y, top]); bands[L.g][1] = top;
    y = top;
  });
  parts.push(<rect key="pas" x={X0} y={y - 22} width={WID} height={22} fill="#555" />);
  const brace = (g, label) => { const [b, t] = bands[g]; return <g key={"b" + g}><path d={`M${X0 - 8},${b} q-8,0 -8,-8 L${X0 - 16},${(b + t) / 2 + 6} l-6,-6 l6,-6 L${X0 - 16},${t + 8} q0,-8 8,-8`} fill="none" stroke={GCOL[g]} strokeWidth={1.5} />
    <T x={X0 - 28} y={(b + t) / 2 + 4} a="end" s={12} c={GCOL[g]}>{label}</T></g>; };
  return <Svg w={600} h={548} max={560} title="现代 CMOS 芯片的互连层级：局部、中间与全局互连">
    {parts}
    {brace("local", "局部互连 M1–M2")}{brace("mid", "中间互连 M3–M6")}{brace("glob", "全局互连 M7–M8")}
    <line x1={X0 + 10} y1={pmdTop} x2={X0 + 60} y2={y} stroke="#2c6e49" strokeWidth={2} opacity={0.7} /><line x1={X0 + 30} y1={pmdTop} x2={X0 + 140} y2={y} stroke="#2c6e49" strokeWidth={2} opacity={0.7} />
    {[["钝化层", y - 11], ["低 K 介质", y + 40], ["刻蚀停止/介质帽层", bands.mid[1] - 2], ["Cu 导线（含阻挡/成核层）", bands.mid[1] + 60], ["W 塞接触", pmdTop + 20], ["金属前介质 PMD", pmdTop + 36], ["晶体管层", 515]].map(([t, yy], i) =>
      <g key={"r" + i}><line x1={X0 + WID + 4} y1={yy - 4} x2={X0 + WID + 18} y2={yy - 4} stroke="#555" /><T x={X0 + WID + 22} y={yy} a="start" s={12}>{t}</T></g>)}
    <T x={X0 + WID / 2} y={538} s={11} c="#666">绿色斜线：越往上，导线越宽越厚、间距越大</T>
  </Svg>;
}

// ---------- Three.js 堆栈 ----------
export function Stack3D() {
  const host = useRef(null), wrap = useRef(null), api = useRef(null);
  const [vis, setVis] = useState(() => Object.fromEntries(GROUPS.map(g => [g.id, true])));
  const [explode, setExplode] = useState(0);
  const [state, setState] = useState("idle");   // idle | loading | ready | failed
  const visRef = useRef(vis); visRef.current = vis;
  const expRef = useRef(explode); expRef.current = explode;

  useEffect(() => {
    let dead = false, cleanup = () => {};
    const el = host.current; if (!el) return;
    const start = async () => {
      setState("loading");
      let renderer, controls, observer; const disposables = [];
      cleanup = () => { observer?.disconnect(); controls?.dispose(); disposables.forEach(d => d.dispose()); if (renderer) { renderer.dispose(); renderer.forceContextLoss?.(); renderer.domElement.remove(); } api.current = null; };
      try {
        const probe = document.createElement("canvas");
        if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) throw new Error("no webgl");
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead) return;
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#faf8f3");
        const camera = new THREE.PerspectiveCamera(35, 1.4, 0.1, 200); camera.position.set(13, 11, 15);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("role", "img"); renderer.domElement.setAttribute("aria-label", "可旋转的多层互连三维模型");
        el.appendChild(renderer.domElement);
        const mat = (c, o = {}) => { const m = new THREE.MeshStandardMaterial({ color: c, roughness: 0.55, metalness: o.metal ?? 0.1, transparent: !!o.op, opacity: o.op ?? 1, depthWrite: !o.op }); disposables.push(m); return m; };
        const M = { si: mat(COL.si), poly: mat(COL.poly), ox: mat(COL.ox, { op: 0.25 }), w: mat(COL.w, { metal: 0.5 }), cu: mat(COL.cu, { metal: 0.6 }), lowk: mat("#9ccbe0", { op: 0.18 }), es: mat(COL.nit, { op: 0.45 }), pas: mat("#666", { op: 0.5 }) };
        const box = new THREE.BoxGeometry(1, 1, 1); disposables.push(box);
        const groups = Object.fromEntries(GROUPS.map(g => [g.id, new THREE.Group()]));
        const levelGroups = [];          // 每层一个组，用于"拉开"视图
        const F = 8, half = F / 2;
        const add = (grp, m, x, y, z, sx, sy, sz) => { const o = new THREE.Mesh(box, m); o.position.set(x, y, z); o.scale.set(sx, sy, sz); grp.add(o); return o; };
        // 衬底 + 晶体管（栅条沿 z）
        add(groups.feol, M.si, 0, -0.5, 0, F, 1, F);
        for (let i = 0; i < 10; i++) add(groups.feol, M.poly, -half + 0.4 + i * 0.8, 0.1, 0, 0.12, 0.2, F * 0.9);
        add(groups.diel, M.ox, 0, 0.35, 0, F, 0.7, F);
        for (let i = 0; i < 10; i++) for (let j = 0; j < 4; j++) add(groups.contact, M.w, -half + 0.8 + i * 0.8, 0.35, -3 + j * 2, 0.14, 0.7, 0.14);
        let y = 0.7;
        LEVELS.forEach((L, k) => {
          const lg = new THREE.Group(); lg.userData.base = y; lg.userData.k = k;
          const metal = new THREE.Group(), diel = new THREE.Group();
          const n = Math.round(F / L.pitch), alongX = k % 2 === 1;
          // 通孔
          const prev = LEVELS[k - 1], pn = prev ? Math.round(F / prev.pitch) : 0;
          for (let i = 0; i < n; i++) {
            const c = -half + (i + 0.5) * L.pitch;
            if (alongX) add(metal, M.cu, 0, L.vh + L.h / 2, c, F, L.h, L.w); else add(metal, M.cu, c, L.vh + L.h / 2, 0, L.w, L.h, F);
            // 通孔落在本层线与下层线的交点上（伪随机挑选）
            const m = prev ? pn : 10;
            for (let j = 0; j < m; j++) {
              if ((i * 7 + j * 5 + k * 3) % (k < 2 ? 5 : 3)) continue;
              const cp = prev ? -half + (j + 0.5) * prev.pitch : -half + 0.8 + j * 0.8;
              const vw = Math.min(L.w, prev ? prev.w : 0.2) * 0.8;
              if (alongX) add(metal, M.cu, cp, L.vh / 2, c, vw, L.vh, vw); else add(metal, M.cu, c, L.vh / 2, cp, vw, L.vh, vw);
            }
          }
          add(diel, M.lowk, 0, (L.vh + L.h) / 2, 0, F, L.vh + L.h, F);
          add(diel, M.es, 0, L.vh + L.h + 0.02, 0, F, 0.04, F);
          metal.userData.g = L.g; diel.userData.g = "diel";
          lg.add(metal); lg.add(diel); levelGroups.push({ lg, metal, diel, g: L.g });
          scene.add(lg);
          y += L.vh + L.h + 0.04;
        });
        const pas = new THREE.Group(); add(pas, M.pas, 0, 0.2, 0, F, 0.4, F); pas.userData.base = y; levelGroups.push({ lg: pas, metal: pas, diel: pas, g: "diel", pas: true }); scene.add(pas);
        Object.values(groups).forEach(g => scene.add(g));
        scene.add(new THREE.HemisphereLight(0xffffff, 0x777060, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 2.2); dl.position.set(6, 12, 8); scene.add(dl);
        controls = new OrbitControls(camera, renderer.domElement); controls.target.set(0, y / 2, 0); controls.enablePan = false; controls.minDistance = 6; controls.maxDistance = 45;
        const render = () => { if (!dead) renderer.render(scene, camera); };
        controls.addEventListener("change", render); controls.update();
        const apply = () => {
          const v = visRef.current, e = expRef.current;
          groups.feol.visible = v.feol; groups.contact.visible = v.contact; groups.diel.visible = v.diel;
          levelGroups.forEach(({ lg, metal, diel, g, pas }, i) => {
            lg.position.y = lg.userData.base + e * 0.9 * (i + 1);
            if (pas) { lg.visible = v.diel; return; }
            metal.visible = v[g]; diel.visible = v.diel && v[g];
          });
          render();
        };
        api.current = { apply, view: k => { const P = { iso: [13, 11, 15], side: [0, y / 2, 24], top: [0.01, 30, 0.01] }[k]; camera.position.set(...P); controls.update(); render(); } };
        observer = new ResizeObserver(() => { const w = Math.max(260, el.clientWidth), h = Math.round(Math.min(460, w * 0.72)); renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); render(); });
        observer.observe(el);
        apply(); setState("ready");
      } catch (err) { cleanup(); if (!dead) setState("failed"); }
    };
    // 进入视口才加载
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); start(); } }, { rootMargin: "200px" });
    io.observe(wrap.current || el);   // host 在就绪前为 display:none，观察外层卡片
    return () => { dead = true; io.disconnect(); cleanup(); };
  }, []);
  useEffect(() => { api.current?.apply(); }, [vis, explode]);

  const btn = on => ({ padding: "2px 9px", margin: 2, borderRadius: 6, border: "1px solid #bbb", background: on ? "#2c4a6e" : "#fff", color: on ? "#fff" : "#333", fontSize: 13, cursor: "pointer" });
  return <div ref={wrap} className="card" style={{ padding: 10 }}>
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}>
      {GROUPS.map(g => <button key={g.id} style={btn(vis[g.id])} onClick={() => setVis(s => ({ ...s, [g.id]: !s[g.id] }))}>{vis[g.id] ? "隐藏" : "显示"} {g.label}</button>)}
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, margin: "6px 0" }}>
      <label style={{ fontSize: 13 }}>层间拉开 <input type="range" min={0} max={1} step={0.02} value={explode} onChange={e => setExplode(+e.target.value)} disabled={state !== "ready"} /></label>
      {["iso", "side", "top"].map((k, i) => <button key={k} style={btn(false)} disabled={state !== "ready"} onClick={() => api.current?.view(k)}>{["斜视", "侧视", "俯视"][i]}</button>)}
    </div>
    <div ref={host} style={{ width: "100%", display: state === "ready" ? "block" : "none" }} />
    {state !== "ready" && <HierarchySVG />}
    <p style={{ fontSize: 13, textAlign: "center", margin: "4px 0 0" }}>
      {state === "ready" ? "拖动旋转 · 滚轮/双指缩放 · 按钮逐组显隐；相邻层导线方向互相垂直，Cu 通孔落在上下两层导线的交叉处"
        : state === "failed" ? "当前环境未启用 WebGL，已显示同一层级结构的二维剖面。" : "三维视图将在滚动到此处时加载；先看二维剖面。"}
    </p>
  </div>;
}
