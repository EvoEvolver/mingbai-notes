// 第 1 章三维结构：平面 MOSFET → FinFET → GAA 纳米片 → 堆叠 GAA（CFET）。
// Three.js 在 useEffect 中按需加载；无 WebGL 时显示同一结构的 SVG 截面；卸载时释放几何体、材质与渲染器。
// 配色（全书约定）：Si 灰、SiO₂ 浅蓝、高 k 介质 绿、栅（金属/多晶硅）红棕、源漏（重掺杂 Si）蓝灰；受栅控制的沟道表面以红色标出。
import { useEffect, useRef, useState } from "react";
import { M as TeX } from "@kit";
const R = String.raw;

const COL = { si: "#b9bec4", siDark: "#8a9099", sd: "#7d8fae", ox: "#bfe0f5", hk: "#3f9a6b", gate: "#a0522d", gateP: "#6e3a22", chan: "#e05a4a", mos2: "#3a3a46" };
const btn = on => ({ padding: "6px 11px", borderRadius: 7, border: `1px solid ${on ? "#2c4a6e" : "#c9c2b3"}`, background: on ? "#e3ecf5" : "#fffdf8", cursor: "pointer", fontSize: 14 });

export const MODES = {
  planar: { name: "平面 MOSFET", era: "至 2011 年（22 nm 前）", perim: R`W`, note: "只有顶面一面受栅控制" },
  finfet: { name: "FinFET（三栅）", era: "2011 年起（22 nm）", perim: R`2H_{\rm fin}+W_{\rm fin}`, note: "顶面和两个侧面受控，鳍底部（子鳍）不受控" },
  gaa: { name: "GAA 纳米片", era: "3 nm/2 nm 代起", perim: R`N_{\rm sh}\cdot 2(W_{\rm sh}+T_{\rm sh})`, note: "每片纳米片四面全包" },
  cfet: { name: "堆叠 GAA（CFET）", era: "研究 / 预期", perim: R`2\times N_{\rm sh}\cdot 2(W_{\rm sh}+T_{\rm sh})`, note: "NMOS 与 PMOS 上下叠放，各自四面全包，占地面积减半" },
};

// ---------------- 结构的盒子列表（单位：任意，约 10 nm）----------------
// 每个盒子：[x0,x1, y0,y1, z0,z1, 颜色键, 选项]；x 沿沟道（源→漏），y 向上，z 沿沟道宽度。
function boxes(mode) {
  const B = [], add = (x0, x1, y0, y1, z0, z1, c, o = {}) => B.push({ x0, x1, y0, y1, z0, z1, c, ...o });
  const Lg = 1.0;   // 半栅长
  if (mode === "planar") {
    add(-4, 4, -3, -0.9, -2.6, 2.6, "si");
    add(-4, 4, -0.9, 0, -2.6, -2.0, "ox"); add(-4, 4, -0.9, 0, 2.0, 2.6, "ox");          // STI
    add(-4, -Lg, -0.9, 0, -2.0, 2.0, "sd"); add(Lg, 4, -0.9, 0, -2.0, 2.0, "sd");
    add(-Lg, Lg, -0.9, -0.08, -2.0, 2.0, "si");
    add(-Lg, Lg, -0.08, 0, -2.0, 2.0, "chan");                                            // 受控表面
    add(-Lg, Lg, 0, 0.14, -2.3, 2.3, "hk");
    add(-Lg, Lg, 0.14, 1.5, -2.3, 2.3, "gate", { gate: true });
  } else if (mode === "finfet") {
    const w = 0.35, top = 1.6;
    add(-4, 4, -3, -1.2, -2.6, 2.6, "si");
    add(-4, 4, -1.2, -0.4, -2.6, -w, "ox"); add(-4, 4, -1.2, -0.4, w, 2.6, "ox");
    add(-4, -Lg, -1.2, top, -w - 0.15, w + 0.15, "sd"); add(Lg, 4, -1.2, top, -w - 0.15, w + 0.15, "sd");
    add(-Lg, Lg, -1.2, -0.4, -w, w, "siDark");                                             // 子鳍：栅管不着
    add(-Lg, Lg, -0.4, top, -w, w, "chan");
    add(-Lg, Lg, -0.4, top + 0.14, -w - 0.14, w + 0.14, "hk", { shell: true });
    add(-Lg, Lg, -0.4, 2.5, -2.3, 2.3, "gate", { gate: true });
  } else {
    const w = 0.9, t = 0.32, stack = mode === "cfet";
    const ys = stack ? [-0.2, 0.55, 1.3, 2.6, 3.35, 4.1] : [-0.2, 0.55, 1.3];
    add(-4, 4, -3, -1.2, -2.6, 2.6, "si");
    add(-4, 4, -1.2, -0.6, -2.6, -0.5, "ox"); add(-4, 4, -1.2, -0.6, 0.5, 2.6, "ox");
    add(-Lg, Lg, -1.2, -0.6, -0.5, 0.5, "siDark");
    const yTop = ys[ys.length - 1] + t;
    add(-4, -Lg, -0.6, yTop, -w - 0.1, w + 0.1, "sd"); add(Lg, 4, -0.6, yTop, -w - 0.1, w + 0.1, "sd");
    ys.forEach((y, i) => add(-Lg, Lg, y, y + t, -w, w, "chan", { sheet: true, upper: stack && i >= 3 }));
    if (stack) {
      add(-Lg, Lg, -0.6, 1.95, -1.6, 1.6, "gate", { gate: true });
      add(-Lg, Lg, 1.95, 2.15, -1.6, 1.6, "ox");                                           // 上下器件之间的隔离
      add(-Lg, Lg, 2.15, yTop + 0.6, -1.6, 1.6, "gateP", { gate: true });
    } else add(-Lg, Lg, -0.6, yTop + 0.6, -1.6, 1.6, "gate", { gate: true });
  }
  return B;
}

// ---------------- SVG 截面（沿沟道中心切开，看 y–z 平面；也用作图 1.22 的自绘图）----------------
export function CrossSection({ mode, w = 170, h = 230, label = true }) {
  const sc = 26, cx = w / 2, cy = h - 30, X = z => cx + z * sc, Y = y => cy - (y + 3) * sc * 0.62;
  const rect = (z0, z1, y0, y1, fill, k, extra = {}) => <rect key={k} x={X(z0)} y={Y(y1)} width={(z1 - z0) * sc} height={(y1 - y0) * sc * 0.62} fill={fill} {...extra} />;
  const els = [];
  const bs = boxes(mode === "mos2" ? "gaa" : mode).filter(b => b.x0 <= 0 && b.x1 >= 0);
  bs.filter(b => b.gate).forEach((b, i) => els.push(rect(b.z0, b.z1, b.y0, b.y1, COL[b.c], "g" + i)));
  bs.filter(b => !b.gate).forEach((b, i) => {
    if (b.sheet) {
      const thin = mode === "mos2";
      els.push(rect(b.z0 - 0.1, b.z1 + 0.1, b.y0 - 0.1, b.y1 + 0.1, COL.hk, "h" + i, { rx: 3 }));
      els.push(rect(b.z0, b.z1, thin ? (b.y0 + b.y1) / 2 - 0.05 : b.y0, thin ? (b.y0 + b.y1) / 2 + 0.05 : b.y1, thin ? COL.mos2 : COL.chan, "s" + i, { rx: thin ? 0 : 2 }));
    } else if (b.shell) {
      els.push(rect(b.z0, b.z1, b.y0, b.y1, COL.hk, "k" + i));
    } else els.push(rect(b.z0, b.z1, b.y0, b.y1, COL[b.c], "b" + i));
  });
  // FinFET：高 k 壳在沟道之下，需要把沟道再画一遍
  bs.filter(b => b.c === "chan" && !b.sheet).forEach((b, i) => els.push(rect(b.z0, b.z1, b.y0, b.y1, COL.chan, "c" + i)));
  const name = { planar: "平面 MOSFET", finfet: "FinFET", gaa: "GAA FET", cfet: "堆叠 GAA FET", mos2: "二维沟道 GAA FET" }[mode];
  return <svg viewBox={`0 0 ${w} ${h}`} style={{ width: w, maxWidth: "100%" }} role="img" aria-label={name + " 截面"}>
    <g>{els}</g>
    {label && <text x={w / 2} y={h - 8} textAnchor="middle" fontSize="13" fontFamily="system-ui, sans-serif">{name}</text>}
    {mode === "cfet" && <><text x={6} y={Y(3.4)} fontSize="11">PMOS</text><text x={6} y={Y(0.6)} fontSize="11">NMOS</text></>}
  </svg>;
}

export function Fig122() {
  return <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", alignItems: "flex-end" }}>
    {["finfet", "gaa", "cfet", "mos2"].map(m => <CrossSection key={m} mode={m} h={m === "cfet" ? 300 : 230} />)}
    <div style={{ fontSize: 12.5, color: "#5c554a", width: "100%", textAlign: "center" }}>
      <Swatch c={COL.si} t="Si 衬底 / 子鳍" /> <Swatch c={COL.ox} t={<>SiO<sub>2</sub>（STI）</>} /> <Swatch c={COL.chan} t="受栅控制的 Si 沟道" /> <Swatch c={COL.mos2} t={<>二维半导体（MoS<sub>2</sub> 等）</>} /> <Swatch c={COL.hk} t="高 k 栅介质" /> <Swatch c={COL.gate} t="NMOS 金属栅" /> <Swatch c={COL.gateP} t="PMOS 金属栅" />
    </div>
  </div>;
}
const Swatch = ({ c, t }) => <span style={{ whiteSpace: "nowrap", marginRight: 8 }}><span style={{ display: "inline-block", width: 11, height: 11, background: c, border: "1px solid #888", verticalAlign: -1, marginRight: 3 }} />{t}</span>;

// ---------------- Three.js 视图 ----------------
export function Mosfet3D() {
  const host = useRef(null), api = useRef(null);
  const [mode, setMode] = useState("finfet"), [gateOn, setGateOn] = useState(true);
  const [ready, setReady] = useState(false), [failed, setFailed] = useState(false);
  useEffect(() => {
    let dead = false, cleanup = () => {};
    (async () => {
      let renderer, controls, observer; const disposables = [];
      cleanup = () => { observer?.disconnect(); controls?.dispose(); disposables.forEach(d => d.dispose()); if (renderer) { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); } api.current = null; };
      try {
        const probe = document.createElement("canvas");
        if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) throw new Error("no webgl");
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead || !host.current) return;
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#faf8f3");
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100); camera.position.set(11, 8.5, 12.5); camera.lookAt(0, 0.3, 0);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("role", "img"); renderer.domElement.setAttribute("aria-label", "可旋转的晶体管三维结构");
        host.current.appendChild(renderer.domElement);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x6b5f4f, 2.2));
        const sun = new THREE.DirectionalLight(0xffffff, 2.0); sun.position.set(5, 9, 6); scene.add(sun);
        const group = new THREE.Group(); scene.add(group);
        const geo = new THREE.BoxGeometry(1, 1, 1); disposables.push(geo);
        const mats = {};
        const mat = (c, gate) => {
          const key = c + (gate ? "g" : "");
          if (!mats[key]) { mats[key] = new THREE.MeshStandardMaterial({ color: COL[c], roughness: 0.65, metalness: c.startsWith("gate") ? 0.25 : 0.02, transparent: !!gate, opacity: 1, depthWrite: !gate }); disposables.push(mats[key]); }
          return mats[key];
        };
        const edgeMat = new THREE.LineBasicMaterial({ color: 0x3a3a3a, transparent: true, opacity: 0.35 }); disposables.push(edgeMat);
        const edgeGeo = new THREE.EdgesGeometry(geo); disposables.push(edgeGeo);
        const render = () => { if (!dead) renderer.render(scene, camera); };
        const build = (m, gate) => {
          group.clear();
          for (const b of boxes(m)) {
            const mesh = new THREE.Mesh(geo, mat(b.c, b.gate || b.shell));
            mesh.scale.set(b.x1 - b.x0, b.y1 - b.y0, b.z1 - b.z0);
            mesh.position.set((b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2, (b.z0 + b.z1) / 2);
            if (b.gate) { mesh.material.opacity = gate ? 0.5 : 0.08; mesh.renderOrder = 2; }
            if (b.shell) { mesh.material.opacity = 0.3; mesh.renderOrder = 1; }
            group.add(mesh);
            const e = new THREE.LineSegments(edgeGeo, edgeMat); e.scale.copy(mesh.scale); e.position.copy(mesh.position); group.add(e);
          }
          render();
        };
        controls = new OrbitControls(camera, renderer.domElement); controls.target.set(0, 0.3, 0); controls.enablePan = false; controls.minDistance = 6; controls.maxDistance = 26; controls.addEventListener("change", render); controls.update();
        api.current = { build, view: v => { const P = { iso: [11, 8.5, 12.5], front: [0.01, 1.5, 17], side: [17, 1.5, 0.01] }[v]; camera.position.set(...P); controls.update(); render(); } };
        observer = new ResizeObserver(() => { if (!host.current) return; const w = Math.max(260, host.current.clientWidth), h = Math.round(Math.min(420, w * 0.62)); renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); render(); });
        observer.observe(host.current);
        setReady(true);
      } catch { cleanup(); if (!dead) setFailed(true); }
    })();
    return () => { dead = true; cleanup(); };
  }, []);
  useEffect(() => { if (ready) api.current?.build(mode, gateOn); }, [ready, mode, gateOn]);
  const MD = MODES[mode];
  return <div className="card" style={{ padding: 12 }}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
      {Object.entries(MODES).map(([k, v]) => <button key={k} style={btn(mode === k)} onClick={() => setMode(k)}>{v.name}</button>)}
      <span style={{ flex: 1 }} />
      <button style={btn(!gateOn)} onClick={() => setGateOn(!gateOn)}>{gateOn ? "让栅几乎透明" : "显示栅"}</button>
    </div>
    <div style={{ position: "relative" }}>
      <div ref={host} style={{ width: "100%", height: ready ? "auto" : 0, overflow: "hidden" }} />
      {!ready && <div style={{ textAlign: "center" }}><CrossSection mode={mode} w={260} h={mode === "cfet" ? 320 : 250} /></div>}
    </div>
    {ready && <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 6 }}>
      {[["iso", "斜视"], ["front", "沿沟道看（截面）"], ["side", "侧视（源→漏）"]].map(([k, t]) => <button key={k} style={btn(false)} onClick={() => api.current?.view(k)}>{t}</button>)}
    </div>}
    <p style={{ fontSize: 13.5, margin: "8px 4px 0" }}><b>{MD.name}</b>（{MD.era}）。受栅控制的沟道周长 <TeX>{MD.perim}</TeX>（{MD.note}）。红色是被栅包住的 Si 沟道；源漏（蓝灰）在沟道两端，电流沿长轴从源流向漏。</p>
    <p style={{ fontSize: 12.5, color: "#6b6357", margin: "4px 4px 0" }}>{failed ? "当前环境未启用 WebGL，已显示同一结构沿沟道中心的截面（与原书图 1.22 的视角相同）。" : ready ? "拖动旋转 · 滚轮/双指缩放 · 点「让栅几乎透明」看栅如何包住沟道。" : "正在加载三维视图，先显示截面。"}</p>
  </div>;
}
