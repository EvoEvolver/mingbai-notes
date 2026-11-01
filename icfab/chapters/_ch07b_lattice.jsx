// 图 7.24 的自绘版：硅中三种扩散机制（空位、踢出、间隙–替位对）。
// MechanismSVG：二维示意动画（也是无 WebGL 时的替代图）；Lattice3D：金刚石晶格中的 Three.js 动画（懒加载，卸载时释放）。
import { useEffect, useRef, useState } from "react";

const SI = "#9aa0a6", DOP = "#c0392b", INT = "#2c6ea0", VAC = "#7d3c98";
const panel = { background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 12, padding: 14, width: "100%", boxSizing: "border-box" };
const row = { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "center", margin: "6px 0" };
const btn = on => ({ padding: "6px 11px", borderRadius: 7, border: `1px solid ${on ? "#2c6ea0" : "#bcb6a9"}`, background: on ? "#e2eef7" : "#fffdf8", cursor: "pointer", fontSize: 14 });
export const MECHS = [
  { id: "vac", label: "(a) 空位机制" },
  { id: "kick", label: "(b) 间隙：踢出" },
  { id: "pair", label: "(c) 间隙–替位对（interstitialcy）" },
];
const NOTE = {
  vac: "掺杂原子与相邻空位换位；空位必须绕一个环走到另一侧（金刚石晶格中至少到第三近邻）再回来，掺杂原子才产生净位移。",
  kick: "硅自间隙原子把替位掺杂原子“踢”到间隙位置；掺杂原子沿开放的四面体间隙通道快速游走，再踢出另一个硅原子回到替位位置。",
  pair: "掺杂原子与一个硅自间隙原子共享一个格点，作为束缚对沿键方向一起迁移；对分解时掺杂原子回到替位位置，同时释放一个自间隙原子。",
};

// ======================= 共享：关键帧插值 =======================
// steps: [{moves:[[id, [x,y,(z)]], …]}]；返回 time(步数，可为小数) 时各原子位置
function poseAt(init, steps, time) {
  const pos = new Map(Object.entries(init).map(([k, v]) => [k, v.slice()]));
  const n = Math.floor(time), f = time - n;
  for (let s = 0; s < Math.min(n, steps.length); s++) for (const [id, p] of steps[s].moves) pos.set(id, p.slice());
  if (n < steps.length) {
    const e = f < 0.5 ? 2 * f * f : 1 - 2 * (1 - f) * (1 - f);      // 缓入缓出
    for (const [id, p] of steps[n].moves) { const a = pos.get(id); pos.set(id, a.map((v, i) => v + (p[i] - v) * e)); }
  }
  return pos;
}
// 掺杂原子轨迹（各步终点 + 当前点）
function trail(init, steps, time, id = "D") {
  const pts = [init[id]]; let cur = init[id];
  for (let s = 0; s < Math.min(Math.floor(time), steps.length); s++) for (const [k, p] of steps[s].moves) if (k === id) { cur = p; pts.push(p); }
  pts.push(poseAt(init, steps, time).get(id));
  return pts;
}

// ======================= 二维示意（正方晶格） =======================
const G = 70, OX = 60, OY = 45, NX = 7, NY = 4;
const gp = (i, j) => [OX + i * G, OY + j * G];
const ip = (i, j) => [OX + (i + 0.5) * G, OY + (j + 0.5) * G];   // 正方中心 = 间隙位置
function scenario2D(kind) {
  const init = {};
  for (let i = 0; i < NX; i++) for (let j = 0; j < NY; j++) init[`s${i}_${j}`] = gp(i, j);
  let steps = [], vac = null;
  if (kind === "vac") {
    // 掺杂在 (2,1)，空位在 (3,1)；空位绕正方 (3,1)->(2,1)->(2,2)->(3,2) 一圈回到掺杂另一侧
    init.D = gp(2, 1); delete init.s2_1; delete init.s3_1; vac = gp(3, 1);
    steps = [
      { moves: [["D", gp(3, 1)]], vac: gp(2, 1) },
      { moves: [["s2_2", gp(2, 1)]], vac: gp(2, 2) },
      { moves: [["s3_2", gp(2, 2)]], vac: gp(3, 2) },
      { moves: [["D", gp(3, 2)]], vac: gp(3, 1) },
      { moves: [["s4_1", gp(3, 1)]], vac: gp(4, 1) },
    ];
  } else if (kind === "kick") {
    init.D = gp(1, 1); delete init.s1_1; init.I = ip(0, 0);
    steps = [
      { moves: [["I", gp(1, 1)], ["D", ip(1, 1)]] },
      { moves: [["D", ip(2, 1)]] }, { moves: [["D", ip(3, 1)]] }, { moves: [["D", ip(4, 1)]] },
      { moves: [["D", gp(5, 2)], ["s5_2", ip(5, 2)]] },
      { moves: [["s5_2", ip(6, 2)]] },
    ];
  } else {
    // 束缚对：两原子分享一个格点（沿键方向偏移），逐键前进
    const off = (i, j, s) => { const [x, y] = gp(i, j); return [x + s * 13, y]; };
    init.D = off(1, 1, -1); init.s1_1 = off(1, 1, 1);
    steps = [
      { moves: [["D", off(2, 1, -1)], ["s2_1", off(2, 1, 1)], ["s1_1", gp(1, 1)]] },
      { moves: [["D", off(3, 1, -1)], ["s3_1", off(3, 1, 1)], ["s2_1", gp(2, 1)]] },
      { moves: [["D", off(4, 1, -1)], ["s4_1", off(4, 1, 1)], ["s3_1", gp(3, 1)]] },
      { moves: [["D", gp(4, 1)], ["s4_1", ip(4, 1)]] },
      { moves: [["s4_1", ip(5, 1)]] },
    ];
  }
  return { init, steps, vac };
}
function vacAt(sc, time) {
  if (!sc.vac) return null; let v = sc.vac; const n = Math.floor(time);
  for (let s = 0; s < Math.min(n, sc.steps.length); s++) v = sc.steps[s].vac;
  return v;
}

function usePlayer(nSteps, dep) {
  const [time, setTime] = useState(0), [play, setPlay] = useState(false);
  const last = useRef(0);
  useEffect(() => { setTime(0); setPlay(false); }, [dep]);
  useEffect(() => {
    if (!play) return; let raf; last.current = performance.now();
    const tick = now => { const dt = (now - last.current) / 1000; last.current = now; setTime(t => { const nt = t + dt * 0.9; if (nt >= nSteps) { setPlay(false); return nSteps; } return nt; }); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [play, nSteps]);
  return { time, setTime, play, setPlay };
}

export function MechanismSVG({ kind: kind0 = "vac", controls = true }) {
  const [kind, setKind] = useState(kind0);
  const sc = scenario2D(kind), P = usePlayer(sc.steps.length, kind);
  const pos = poseAt(sc.init, sc.steps, P.time), tr = trail(sc.init, sc.steps, P.time), v = vacAt(sc, P.time);
  return <div style={panel}>
    {controls && <div style={row}>{MECHS.map(m => <button key={m.id} style={btn(kind === m.id)} onClick={() => setKind(m.id)}>{m.label}</button>)}</div>}
    <svg viewBox="0 0 560 300" role="img" aria-label="硅中掺杂扩散机制的二维示意动画" style={{ width: "100%", display: "block", fontFamily: "system-ui,sans-serif" }}>
      {Array.from({ length: NX }, (_, i) => <line key={"v" + i} x1={OX + i * G} x2={OX + i * G} y1={OY - 25} y2={OY + (NY - 1) * G + 25} stroke="#c9c3b6" strokeWidth="3" />)}
      {Array.from({ length: NY }, (_, j) => <line key={"h" + j} y1={OY + j * G} y2={OY + j * G} x1={OX - 25} x2={OX + (NX - 1) * G + 25} stroke="#c9c3b6" strokeWidth="3" />)}
      {v && <circle cx={v[0]} cy={v[1]} r="15" fill="none" stroke={VAC} strokeWidth="2" strokeDasharray="4 3" />}
      <polyline points={tr.map(p => p.join(",")).join(" ")} fill="none" stroke={DOP} strokeWidth="2" strokeDasharray="5 4" opacity=".8" />
      {[...pos.entries()].map(([id, p]) => p && <circle key={id} cx={p[0]} cy={p[1]} r={id === "D" ? 15 : 14}
        fill={id === "D" ? DOP : (id === "I" && P.time < 1) || (kind === "kick" && id === "s5_2" && P.time > 4) || (kind === "pair" && id === "s4_1" && P.time > 3) ? INT : SI} stroke="#555" strokeWidth=".8" />)}
      <g fontSize="13" fill="#333">
        <circle cx="70" cy="282" r="7" fill={DOP} /><text x="82" y="287">掺杂原子</text>
        <circle cx="170" cy="282" r="7" fill={SI} /><text x="182" y="287">硅</text>
        <circle cx="230" cy="282" r="7" fill={INT} /><text x="242" y="287">（游离）硅自间隙</text>
        <circle cx="380" cy="282" r="7" fill="none" stroke={VAC} strokeDasharray="3 2" /><text x="392" y="287">空位</text>
        <line x1="440" x2="470" y1="282" y2="282" stroke={DOP} strokeDasharray="5 4" /><text x="476" y="287">掺杂轨迹</text>
      </g>
    </svg>
    <div style={row}>
      <button style={btn(P.play)} onClick={() => { if (P.time >= sc.steps.length) P.setTime(0); P.setPlay(!P.play); }}>{P.play ? "暂停" : "播放"}</button>
      <button style={btn(false)} onClick={() => { P.setPlay(false); P.setTime(t => Math.min(sc.steps.length, Math.floor(t) + 1)); }}>单步</button>
      <button style={btn(false)} onClick={() => { P.setPlay(false); P.setTime(0); }}>复位</button>
      <span style={{ fontSize: 13 }}>第 {Math.min(sc.steps.length, Math.floor(P.time))}/{sc.steps.length} 步</span>
    </div>
    <p style={{ fontSize: 14, margin: "4px 6px" }}>{NOTE[kind]}</p>
  </div>;
}

// ======================= 三维：金刚石晶格 =======================
const Q = 0.25, NN = Math.sqrt(3) / 4;
const key = p => p.map(v => Math.round(v * 4)).join(",");
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
function buildLattice() {
  const fcc = [[0, 0, 0], [0, .5, .5], [.5, 0, .5], [.5, .5, 0]], sites = [], tsites = [];
  const inBox = p => p.every(v => v >= -1e-9 && v <= 2 + 1e-9);
  for (let i = -1; i < 3; i++) for (let j = -1; j < 3; j++) for (let k = -1; k < 3; k++) for (const f of fcc) {
    const a = [i + f[0], j + f[1], k + f[2]], b = a.map(v => v + Q);
    if (inBox(a)) sites.push(a); if (inBox(b)) sites.push(b);
    const t1 = a.map(v => v + .5), t2 = a.map(v => v + .75);
    if (inBox(t1)) tsites.push(t1); if (inBox(t2)) tsites.push(t2);
  }
  const uniq = arr => { const m = new Map(); arr.forEach(p => m.set(key(p), p)); return [...m.values()]; };
  const S = uniq(sites), T = uniq(tsites);
  const nb = p => S.filter(q => Math.abs(dist(p, q) - NN) < 1e-6);
  const tnb = p => T.filter(q => Math.abs(dist(p, q) - NN) < 1e-6);
  const bonds = []; S.forEach((p, i) => S.forEach((q, j) => { if (j > i && Math.abs(dist(p, q) - NN) < 1e-6) bonds.push([p, q]); }));
  return { S, T, nb, tnb, bonds };
}
const near = (list, p) => list.reduce((b, q) => dist(q, p) < dist(b, p) ? q : b, list[0]);
// 找一个包含 s0 的六元环（金刚石晶格最小环）
function ring6(L, s0) {
  const path = [s0];
  const dfs = () => {
    if (path.length === 6) return L.nb(path[5]).some(q => key(q) === key(s0));
    for (const q of L.nb(path[path.length - 1])) {
      if (path.some(p => key(p) === key(q))) continue;
      if (q.some(v => v < .25 || v > 1.75)) continue;
      path.push(q); if (dfs()) return true; path.pop();
    }
    return false;
  };
  return dfs() ? path : null;
}
function scenario3D(kind, L) {
  const id = p => "s" + key(p), init = {}; L.S.forEach(p => { init[id(p)] = p; });
  const s0 = near(L.S, [1, 1, 1]); let steps = [], vac = null;
  if (kind === "vac") {
    const r = ring6(L, s0);                          // r0=s0（掺杂），r1 为空位
    init.D = r[0]; delete init[id(r[0])]; delete init[id(r[1])]; vac = r[1];
    steps.push({ moves: [["D", r[1]]], vac: r[0] });
    // 空位绕环 r0 → r5 → r4 → r3 → r2（每步与一个硅交换）
    let v = r[0];
    for (const k of [5, 4, 3, 2]) { steps.push({ moves: [[id(r[k]), v]], vac: r[k] }); v = r[k]; }
    steps.push({ moves: [["D", r[2]]], vac: r[1] });
  } else if (kind === "kick") {
    init.D = s0; delete init[id(s0)];
    const t0 = L.tnb(s0).sort((a, b) => a[0] - b[0])[0];       // 掺杂近旁的一个四面体间隙位
    const tStart = L.tnb(t0).filter(t => dist(t, s0) > NN + 1e-6).sort((a, b) => a[0] - b[0])[0] || t0;
    init.I = tStart;
    steps.push({ moves: [["I", s0], ["D", t0]] });
    // 掺杂原子沿间隙通道向 +x 方向游走 4 步
    let t = t0; const seen = new Set([key(t0)]);
    for (let s = 0; s < 3; s++) {
      const c = L.tnb(t).filter(q => !seen.has(key(q)) && q.every(v => v > .3 && v < 1.6)).sort((a, b) => (b[0] - a[0]) || (a[1] - b[1]));
      if (!c.length) break; t = c[0]; seen.add(key(t)); steps.push({ moves: [["D", t]] });
    }
    const inner = q => q.every(v => v > .2 && v < 1.8);
    const victim = L.nb(t).filter(q => q.every(v => v > .3 && v < 1.7)).sort((a, b) => b[0] - a[0])[0] || near(L.S, t);
    const tOut = L.tnb(victim).filter(q => key(q) !== key(t) && inner(q)).sort((a, b) => b[0] - a[0])[0];
    steps.push({ moves: [["D", victim], [id(victim), tOut]] });
    const tAway = tOut && L.tnb(tOut).filter(q => !seen.has(key(q)) && inner(q)).sort((a, b) => b[1] - a[1])[0];
    if (tAway) steps.push({ moves: [[id(victim), tAway]] });
    return { init, steps, vac, freed: id(victim), early: "I" };
  } else {
    // 束缚对沿键链前进：D 与该格点原来的 Si 分享格点
    const chain = [s0]; let cur = s0;
    for (let s = 0; s < 3; s++) { const c = L.nb(cur).filter(q => !chain.some(p => key(p) === key(q)) && q.every(v => v > .2 && v < 1.8)).sort((a, b) => (b[0] + b[2]) - (a[0] + a[2])); cur = c[0]; chain.push(cur); }
    const split = (p, dir, s) => p.map((v, i) => v + s * 0.11 * dir[i]);
    const dirOf = (a, b) => { const d = b.map((v, i) => v - a[i]), l = Math.hypot(...d); return d.map(v => v / l); };
    const d0 = dirOf(chain[0], chain[1]);
    init.D = split(chain[0], d0, 1); init.X = split(chain[0], d0, -1);   // X：成对的自间隙硅
    delete init[id(chain[0])];
    let partner = "X";
    for (let s = 1; s < chain.length; s++) {
      const d = dirOf(chain[s - 1], chain[s]);
      steps.push({ moves: [["D", split(chain[s], d, -1)], [id(chain[s]), split(chain[s], d, 1)], [partner, chain[s - 1]]] });
      partner = id(chain[s]);
    }
    const last = chain[chain.length - 1], tOut = L.tnb(last).sort((a, b) => b[1] - a[1])[0];
    steps.push({ moves: [["D", last], [partner, tOut]] });
    const tAway = L.tnb(tOut).filter(q => dist(q, last) > NN + 1e-6).sort((a, b) => b[1] - a[1])[0];
    if (tAway) steps.push({ moves: [[partner, tAway]] });
    return { init, steps, vac, freed: partner };
  }
  return { init, steps, vac };
}

export function Lattice3D() {
  const host = useRef(null), api = useRef(null);
  const [kind, setKind] = useState("vac"), [ready, setReady] = useState(false), [failed, setFailed] = useState(false);
  const [time, setTime] = useState(0), [play, setPlay] = useState(false);
  const sc = useRef(null);
  // 初始化场景（只做一次）
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
        const L = buildLattice();
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#faf8f3");
        const camera = new THREE.PerspectiveCamera(40, 1, .05, 50); camera.position.set(2.9, 2.1, 3.4);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("role", "img"); renderer.domElement.setAttribute("aria-label", "金刚石晶格中的掺杂扩散机制三维动画；拖动旋转，滚轮缩放");
        host.current.appendChild(renderer.domElement);
        const root = new THREE.Group(); root.position.set(-1, -1, -1); scene.add(root);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x605848, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 1.8); dl.position.set(3, 5, 4); scene.add(dl);
        const bg = new THREE.BufferGeometry(); bg.setAttribute("position", new THREE.Float32BufferAttribute(L.bonds.flat(2), 3));
        const bm = new THREE.LineBasicMaterial({ color: 0x8f877a, transparent: true, opacity: .55 }); root.add(new THREE.LineSegments(bg, bm)); disposables.push(bg, bm);
        const sg = new THREE.SphereGeometry(.075, 18, 12), sgBig = new THREE.SphereGeometry(.095, 20, 14); disposables.push(sg, sgBig);
        const mSiBg = new THREE.MeshStandardMaterial({ color: SI, roughness: .6, transparent: true, opacity: .35 }), mSi = new THREE.MeshStandardMaterial({ color: "#7f868d", roughness: .5 }), mD = new THREE.MeshStandardMaterial({ color: DOP, roughness: .4 }), mI = new THREE.MeshStandardMaterial({ color: INT, roughness: .4 });
        const mV = new THREE.MeshBasicMaterial({ color: VAC, wireframe: true }); disposables.push(mSiBg, mSi, mD, mI, mV);
        const vMesh = new THREE.Mesh(new THREE.SphereGeometry(.1, 10, 8), mV); disposables.push(vMesh.geometry); root.add(vMesh);
        const trailGeo = new THREE.BufferGeometry(), trailMat = new THREE.LineBasicMaterial({ color: DOP, depthTest: false, transparent: true, opacity: .9 });
        const trailLine = new THREE.Line(trailGeo, trailMat); trailLine.renderOrder = 10; root.add(trailLine); disposables.push(trailGeo, trailMat);
        let meshes = new Map();
        const render = () => { if (!dead) renderer.render(scene, camera); };
        controls = new OrbitControls(camera, renderer.domElement); controls.enablePan = false; controls.minDistance = 1.5; controls.maxDistance = 9; controls.addEventListener("change", render);
        const setScenario = k => {
          meshes.forEach(m => root.remove(m)); meshes = new Map();
          const s = scenario3D(k, L); sc.current = s;
          const active = new Set(s.steps.flatMap(st => st.moves.map(([id]) => id)));   // 参与本机制的原子不透明，其余淡化
          s.bg = id => !active.has(id) && id !== "D" && id !== "I" && id !== "X";
          for (const [id, p] of Object.entries(s.init)) {
            const m = new THREE.Mesh(id === "D" ? sgBig : sg, id === "D" ? mD : id === "I" || id === "X" ? mI : s.bg(id) ? mSiBg : mSi);
            m.position.set(...p); root.add(m); meshes.set(id, m);
          }
        };
        const pose = t => {
          const s = sc.current; if (!s) return;
          const P = poseAt(s.init, s.steps, t);
          P.forEach((p, id) => {
            const m = meshes.get(id); if (!m) return; m.position.set(...p);
            if (s.freed === id) m.material = t > s.steps.length - 1.5 ? mI : mSi;
            else if (id === "I" || id === "X") m.material = t >= 1 ? mSi : mI;      // 进入替位后就是普通晶格硅
          });
          const v = vacAt(s, t); vMesh.visible = !!v; if (v) vMesh.position.set(...v);
          const tr = trail(s.init, s.steps, t); trailGeo.setAttribute("position", new THREE.Float32BufferAttribute(tr.flat(), 3)); trailGeo.computeBoundingSphere();
          render();
        };
        api.current = { setScenario, pose, view: v => { camera.position.set(...(v === "111" ? [2.3, 2.3, 2.3] : v === "100" ? [0.001, 0, 4.0] : [2.9, 2.1, 3.4])); controls.update(); render(); } };
        observer = new ResizeObserver(() => { if (!host.current) return; const w = Math.max(260, host.current.clientWidth), h = Math.min(420, Math.max(300, w * .62)); renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); render(); });
        observer.observe(host.current);
        setScenario("vac"); pose(0); setReady(true);
      } catch { cleanup(); if (!dead) setFailed(true); }
    })();
    return () => { dead = true; cleanup(); };
  }, []);
  useEffect(() => { if (!api.current) return; api.current.setScenario(kind); setTime(0); setPlay(false); api.current.pose(0); }, [kind, ready]);
  useEffect(() => { api.current?.pose(time); }, [time]);
  const nSteps = sc.current?.steps.length || 6;
  useEffect(() => {
    if (!play) return; let raf, last = performance.now();
    const tick = now => { const dt = (now - last) / 1000; last = now; setTime(t => { const nt = t + dt * 0.8; if (nt >= nSteps) { setPlay(false); return nSteps; } return nt; }); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [play, nSteps]);
  if (failed) return <div className="ch07b-lattice-fallback"><p style={{ fontSize: 13, textAlign: "center", margin: "4px 0" }}>当前环境未启用 WebGL，改为显示同样三种机制的二维示意动画。</p><MechanismSVG /></div>;
  return <div style={panel} className="ch07b-lattice3d">
    <div style={row}>{MECHS.map(m => <button key={m.id} style={btn(kind === m.id)} onClick={() => setKind(m.id)}>{m.label}</button>)}</div>
    <div style={{ position: "relative", minHeight: 300 }}>
      <div ref={host} style={{ width: "100%", overflow: "hidden", borderRadius: 8 }} />
      {!ready && <p style={{ textAlign: "center", fontSize: 13 }}>正在加载三维晶格……</p>}
    </div>
    <div style={row}>
      <button style={btn(play)} disabled={!ready} onClick={() => { if (time >= nSteps) setTime(0); setPlay(!play); }}>{play ? "暂停" : "播放"}</button>
      <button style={btn(false)} disabled={!ready} onClick={() => { setPlay(false); setTime(t => Math.min(nSteps, Math.floor(t) + 1)); }}>单步</button>
      <button style={btn(false)} disabled={!ready} onClick={() => { setPlay(false); setTime(0); }}>复位</button>
      <input type="range" min="0" max={nSteps} step="0.01" value={time} onChange={e => { setPlay(false); setTime(+e.target.value); }} aria-label="动画进度" />
      <button style={btn(false)} disabled={!ready} onClick={() => api.current?.view("111")}>沿 [111] 看</button>
      <button style={btn(false)} disabled={!ready} onClick={() => api.current?.view("100")}>沿 [001] 看</button>
      <button style={btn(false)} disabled={!ready} onClick={() => api.current?.view("iso")}>斜视</button>
    </div>
    <p style={{ fontSize: 14, margin: "4px 6px" }}>{NOTE[kind]}</p>
    <p style={{ fontSize: 12.5, margin: "2px 6px", color: "#666" }}>拖动旋转 · 滚轮/双指缩放。红：掺杂原子；深灰：参与本机制的晶格硅（其余淡化）；蓝：成对或被释放的硅自间隙；紫色线框：空位；红线：掺杂原子的跳跃路径（总在最前显示）。显示范围为 8 个立方晶胞（每边 2 个）。</p>
  </div>;
}
