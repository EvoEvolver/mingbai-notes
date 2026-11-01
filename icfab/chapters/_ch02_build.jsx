// 第 2 章核心交互：分步工艺搭建器（Three.js 按需加载；无 WebGL 时退化为二维截面 SVG）。
// 平面模式：把 _ch02_xsec.jsx 的截面多边形沿纸面法向拉伸成三维块；FinFET 模式：_ch02_fin.jsx 的拉伸实体。
import { useEffect, useRef, useState } from "react";
import { TxI, pageUrl } from "@kit";
import { MAT, PSTEPS, planar, XSec, Legend, CHN, CHT } from "./_ch02_xsec.jsx";
import { FSTEPS, finfet, FinCuts, FinLegend } from "./_ch02_fin.jsx";

const btn = on => ({ padding: "6px 11px", borderRadius: 7, border: `1px solid ${on ? "#2c6e9b" : "#bcb6a9"}`, background: on ? "#e2eef7" : "#fffdf8", color: "#222", cursor: "pointer", fontSize: 14 });
const panel = { background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 12, padding: 14, color: "#292b30" };

export function ChLinks({ ids }) {
  return <>{ids.map((id, i) => <span key={id}>{i ? "；" : ""}<a href={pageUrl(id)}>{CHN[id]} · {CHT[id]}</a></span>)}</>;
}

// 颜色串 → THREE 颜色 + 不透明度
function parseColor(c) {
  const m = c.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);
  return m ? { hex: (+m[1] << 16) | (+m[2] << 8) | +m[3], a: +m[4] } : { hex: parseInt(c.slice(1), 16), a: 1 };
}
// 平面截面 → 三维实体（x 居中，深度向下取负作为 y，沿 z 拉伸 100 nm）
const planarSolids = k => planar(k).map(o => ({ m: o.m, ax: "z", poly: o.p.map(([x, z]) => [x - 140, -z]), r: [-50, 50] }));

const VIEWS = { planar: { pos: [215, 150, 300], tgt: [0, 5, 0] }, fin: { pos: [165, 115, 205], tgt: [0, -12, 0] } };

function useThree(host, enabled) {
  const ctx = useRef(null);
  const [state, setState] = useState("idle");   // idle | loading | ready | failed
  useEffect(() => {
    if (!enabled) return;
    let dead = false, cleanup = () => {};
    setState("loading");
    (async () => {
      try {
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead || !host.current) return;
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("role", "img");
        renderer.domElement.setAttribute("aria-label", "可旋转的三维器件结构：拖动旋转，滚轮或双指缩放");
        host.current.appendChild(renderer.domElement);
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#f6f4ee");
        const camera = new THREE.PerspectiveCamera(35, 1, 1, 5000);
        scene.add(new THREE.AmbientLight(0xffffff, 1.6));
        const d1 = new THREE.DirectionalLight(0xffffff, 1.6); d1.position.set(1, 2.2, 1.6); scene.add(d1);
        const d2 = new THREE.DirectionalLight(0xffffff, 0.5); d2.position.set(-1.5, 0.6, -1); scene.add(d2);
        const group = new THREE.Group(); scene.add(group);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = true; controls.screenSpacePanning = true;
        const render = () => { if (!dead) renderer.render(scene, camera); };
        controls.addEventListener("change", render);
        const ro = new ResizeObserver(() => { if (!host.current) return; const w = Math.max(260, host.current.clientWidth), h = Math.round(Math.min(460, Math.max(300, w * 0.62))); renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); render(); });
        ro.observe(host.current);
        const clear = () => { for (const c of [...group.children]) { group.remove(c); c.geometry?.dispose(); c.material?.dispose(); } };
        ctx.current = { THREE, scene, group, camera, controls, render, clear };
        cleanup = () => { ro.disconnect(); clear(); controls.dispose(); renderer.dispose(); renderer.forceContextLoss?.(); renderer.domElement.remove(); ctx.current = null; };
        setState("ready");
      } catch (e) { cleanup(); if (!dead) setState("failed"); }
    })();
    return () => { dead = true; cleanup(); };
  }, [enabled]);
  return [ctx, state];
}

function buildScene(c, solids, mode, resetView) {
  const { THREE, group, camera, controls } = c;
  c.clear();
  const n = solids.length;
  solids.forEach((s, i) => {
    const pts = s.ax === "z" ? s.poly : s.poly.map(([u, v]) => [-u, v]);   // 沿 x 拉伸时用 (−z, y) 作形状，配合行列式为 +1 的旋转
    const shape = new THREE.Shape(pts.map(([u, v]) => new THREE.Vector2(u, v)));
    const geo = new THREE.ExtrudeGeometry(shape, { depth: s.r[1] - s.r[0], bevelEnabled: false, curveSegments: 1 });
    geo.translate(0, 0, s.r[0]);
    if (s.ax === "x") geo.applyMatrix4(new THREE.Matrix4().set(0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1));
    const { hex, a } = parseColor(MAT[s.m].c), dope = !!MAT[s.m].dope;
    const mat = new THREE.MeshLambertMaterial({ color: hex, transparent: dope, opacity: dope ? Math.min(0.85, a * 1.25) : 1, depthWrite: !dope,
      polygonOffset: true, polygonOffsetFactor: -0.6 * i / n * 4, polygonOffsetUnits: -2 * i });
    const mesh = new THREE.Mesh(geo, mat); mesh.renderOrder = dope ? 1000 + i : i; group.add(mesh);
    if (!dope) { const eg = new THREE.EdgesGeometry(geo, 30); const lm = new THREE.LineBasicMaterial({ color: 0x222222, transparent: true, opacity: 0.28 }); const line = new THREE.LineSegments(eg, lm); line.renderOrder = 2000; group.add(line); }
  });
  if (resetView) { const v = VIEWS[mode]; camera.position.set(...v.pos); controls.target.set(...v.tgt); controls.update(); }
  c.render();
}

export function ProcessBuilder({ initialMode = "planar" }) {
  const [mode, setMode] = useState(initialMode);
  const [k, setK] = useState(0);
  const [view3d, setView3d] = useState(true);
  const [play, setPlay] = useState(false);
  const host = useRef(null);
  const [ctx, state] = useThree(host, view3d);
  const steps = mode === "planar" ? PSTEPS : FSTEPS, st = steps[Math.min(k, steps.length - 1)], N = steps.length;
  const lastMode = useRef(null);
  useEffect(() => {
    if (state !== "ready" || !ctx.current) return;
    const kk = Math.min(k, N - 1);
    buildScene(ctx.current, mode === "planar" ? planarSolids(kk) : finfet(kk), mode, lastMode.current !== mode);
    lastMode.current = mode;
  }, [state, mode, k]);
  useEffect(() => { if (state !== "ready") lastMode.current = null; }, [state]);
  useEffect(() => {
    if (!play) return;
    const t = setInterval(() => setK(x => { if (x >= N - 1) { setPlay(false); return x; } return x + 1; }), 1400);
    return () => clearInterval(t);
  }, [play, N]);
  const go = d => setK(x => Math.max(0, Math.min(N - 1, x + d)));
  const figs = (st.fig || "").match(/\d+\.\d+/g) || [];
  const show3d = view3d && state === "ready";
  return <div style={panel}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 8 }}>
      <button style={btn(mode === "planar")} onClick={() => { setMode("planar"); setK(0); setPlay(false); }}>平面 28 nm 高 k 金属栅 CMOS</button>
      <button style={btn(mode === "fin")} onClick={() => { setMode("fin"); setK(0); setPlay(false); }}>FinFET（简化流程）</button>
      <span style={{ flex: 1 }} />
      <button style={btn(view3d)} onClick={() => setView3d(true)}>三维</button>
      <button style={btn(!view3d)} onClick={() => setView3d(false)}>二维截面</button>
    </div>
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <button style={btn(false)} onClick={() => go(-1)} disabled={k === 0} aria-label="上一步">◀ 上一步</button>
      <input type="range" min={0} max={N - 1} value={Math.min(k, N - 1)} onChange={e => { setK(+e.target.value); setPlay(false); }} style={{ flex: 1, minWidth: 160 }} aria-label="工艺步骤" />
      <button style={btn(false)} onClick={() => go(1)} disabled={k >= N - 1} aria-label="下一步">下一步 ▶</button>
      <button style={btn(play)} onClick={() => { if (k >= N - 1) setK(0); setPlay(p => !p); }}>{play ? "暂停" : "自动播放"}</button>
    </div>
    <div style={{ margin: "10px 0 6px", fontSize: 15 }}>
      <b>第 {Math.min(k, N - 1) + 1}/{N} 步 · <TxI>{st.t}</TxI></b>
    </div>
    <div style={{ position: "relative" }}>
      <div ref={host} style={{ width: "100%", display: show3d ? "block" : "none", borderRadius: 8, overflow: "hidden", border: "1px solid #ddd" }} />
      {!show3d && (mode === "planar" ? <XSec k={Math.min(k, N - 1)} /> : <FinCuts k={Math.min(k, N - 1)} />)}
    </div>
    <div style={{ fontSize: 12.5, color: "#666", margin: "4px 0 8px" }}>
      {view3d ? (state === "ready" ? "拖动旋转 · 滚轮/双指缩放 · 右键或双指拖动平移。" + (mode === "planar" ? "正面即二维截面（平面器件沿纸面法向拉伸 100 nm 显示）。" : "正面横切源漏区，右侧面纵切栅与侧墙。") : state === "failed" ? "当前浏览器未启用 WebGL，已改为显示同一结构的二维截面。" : "正在加载三维视图……先看二维截面。") : "二维截面：与原书图 2.4–2.25 同一坐标（nm；纵轴为深度，硅表面为 0）。FinFET 给出两张正交截面。"}
    </div>
    {mode === "planar" ? <Legend ks={[Math.min(k, N - 1)]} /> : <FinLegend ks={[Math.min(k, N - 1)]} />}
    <table className="tb-table" style={{ marginTop: 10, fontSize: 14 }}><tbody>
      <tr><th style={{ width: "6.5em" }}>工艺/设备</th><td><TxI>{st.proc}</TxI></td></tr>
      <tr><th>材料/参数</th><td><TxI>{st.mat}</TxI></td></tr>
      {st.d && <tr><th>为什么</th><td><TxI>{st.d}</TxI></td></tr>}
      <tr><th>本章位置</th><td><TxI>{`\\secref{${st.sec}}` + (figs.length ? "；原书 " + figs.map(f => `\\figref{${f}}`).join("、") + (st.fig.replace(/[\d.、]/g, "").trim() ? `（${st.fig}）` : "") : "")}</TxI></td></tr>
      <tr><th>深入学习</th><td><ChLinks ids={st.ch} /></td></tr>
    </tbody></table>
  </div>;
}

// 节首"深入阅读"链接
export function Deep({ ids }) {
  return <p className="muted" style={{ fontSize: 14 }}>深入阅读：<ChLinks ids={ids} /></p>;
}
