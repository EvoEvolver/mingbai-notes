// ALD 循环动画（Three.js，按需加载）：TMA 脉冲 → 吹扫 → H₂O 脉冲 → 吹扫，沟槽内的表面位点逐个反应、饱和后多余分子弹回，
// 每完成一个循环膜厚增加一层，可旋转观察沟槽内的共形覆盖。无 WebGL 时以同一模拟驱动的 SVG 截面代替。卸载时释放全部资源。
import { useEffect, useRef, useState } from "react";
import { Svg, T, C, box, btn, rowS } from "./_ch10_svg.jsx";

const G = { W: 0.6, D: 2.2, X: 3, Z: 1.5, dt: 0.032, cap: 12 };      // 沟槽半宽、深、衬底半宽、半长；每循环膜厚（示意放大）
const PH = [{ k: "A", name: "① TMA 脉冲", dur: 3.2 }, { k: "pA", name: "② 惰性气体吹扫", dur: 1.4 }, { k: "B", name: "③ 水汽脉冲", dur: 3.2 }, { k: "pB", name: "④ 惰性气体吹扫", dur: 1.4 }];
const ZR = [-1.2, -0.6, 0, 0.6, 1.2];
const lin = (a, b, n) => Array.from({ length: n }, (_, i) => a + (b - a) * (n === 1 ? 0.5 : i / (n - 1)));
const rnd = (a, b) => a + Math.random() * (b - a);

function makeSites(th) {
  const S = [], add = (x, y, nx, ny, trench) => ZR.forEach(z => S.push({ p: [x + nx * 0.06, y + ny * 0.06, z], n: [nx, ny], trench, st: 0 }));
  lin(-2.7, -0.95, 5).forEach(x => add(x, th, 0, 1, false));
  lin(0.95, 2.7, 5).forEach(x => add(x, th, 0, 1, false));
  lin(-0.2, -G.D + th + 0.2, 6).forEach(y => { add(-G.W + th, y, 1, 0, true); add(G.W - th, y, -1, 0, true); });
  lin(-G.W + th + 0.15, G.W - th - 0.15, 3).forEach(x => add(x, -G.D + th, 0, 1, true));
  return S;
}
function newSim() {
  return { t: 0, ph: 0, cycle: 0, th: 0, sites: makeSites(0), parts: [], prods: [], spawnAcc: 0, bounces: 0, reacted: 0 };
}
// 一步模拟（dt 秒）
function step(s, dt) {
  const ph = PH[s.ph], speed = 3.2;
  s.t += dt;
  if (ph.k === "A" || ph.k === "B") {
    s.spawnAcc += dt * 70;
    while (s.spawnAcc > 1) {
      s.spawnAcc -= 1;
      const want = ph.k === "A" ? 0 : 1, elig = s.sites.map((q, i) => i).filter(i => s.sites[i].st === want);
      const idx = Math.random() < 0.7 && elig.length ? elig[Math.floor(Math.random() * elig.length)] : Math.floor(Math.random() * s.sites.length);
      const q = s.sites[idx];
      const xs = q.trench ? rnd(-G.W + s.th + 0.05, G.W - s.th - 0.05) : q.p[0] + rnd(-1, 1);
      const a = [xs, 2.7, q.p[2] + rnd(-0.4, 0.4)], b = q.p, L = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
      s.parts.push({ a, b, u: 0, dur: L / speed, idx, kind: ph.k, out: false });
    }
  }
  for (const p of s.parts) {
    p.u += dt / p.dur;
    if (p.u >= 1 && !p.out) {
      const q = s.sites[p.idx], want = p.kind === "A" ? 0 : 1;
      if (q.st === want) {            // 反应：位点状态推进，放出 CH₄
        q.st = want + 1; s.reacted++; p.dead = true;
        s.prods.push({ a: [...q.p], b: [q.p[0] + q.n[0] * 0.4 + rnd(-0.3, 0.3), 2.9, q.p[2] + rnd(-0.3, 0.3)], u: 0, dur: 1.4 });
      } else {                        // 位点已饱和：分子弹回（自限制）
        s.bounces++; p.out = true; p.u = 0; p.a = [...q.p];
        p.b = [q.trench ? rnd(-G.W + s.th, G.W - s.th) * 0.6 : q.p[0] + rnd(-1, 1), 2.9, q.p[2] + rnd(-0.4, 0.4)]; p.dur = 1.0;
      }
    } else if (p.u >= 1 && p.out) p.dead = true;
  }
  s.parts = s.parts.filter(p => !p.dead);
  for (const p of s.prods) { p.u += dt / p.dur; if (p.u >= 1) p.dead = true; }
  s.prods = s.prods.filter(p => !p.dead);
  if (s.t >= ph.dur) {
    s.t = 0; s.ph = (s.ph + 1) % PH.length;
    if (s.ph === 0) {                 // 一个完整循环结束：膜厚 +1 层，表面重新变成 –OH
      s.cycle++; if (s.cycle <= G.cap) s.th = s.cycle * G.dt;
      s.sites = makeSites(s.th);
    }
  }
}
const pos = p => { const u = Math.min(1, p.u); return [p.a[0] + (p.b[0] - p.a[0]) * u, p.a[1] + (p.b[1] - p.a[1]) * u, p.a[2] + (p.b[2] - p.a[2]) * u]; };
const SITE_COL = ["#d65a4a", "#4d545c", "#e07a5f"];

// ---------- SVG 截面（无 WebGL 时） ----------
function Fallback({ s }) {
  const sx = x => 340 + x * 70, sy = y => 70 - y * 70, th = s.th;
  return <Svg title="ALD 沟槽截面：位点状态与膜厚随循环变化" h={250}>
    <path d={`M ${sx(-G.X)} ${sy(0)} L ${sx(-G.W)} ${sy(0)} L ${sx(-G.W)} ${sy(-G.D)} L ${sx(G.W)} ${sy(-G.D)} L ${sx(G.W)} ${sy(0)} L ${sx(G.X)} ${sy(0)} L ${sx(G.X)} ${sy(-2.6)} L ${sx(-G.X)} ${sy(-2.6)} Z`} fill={C.si} stroke="#555" />
    {th > 0 && <path d={`M ${sx(-G.X)} ${sy(0)} L ${sx(-G.W)} ${sy(0)} L ${sx(-G.W)} ${sy(-G.D)} L ${sx(G.W)} ${sy(-G.D)} L ${sx(G.W)} ${sy(0)} L ${sx(G.X)} ${sy(0)} L ${sx(G.X)} ${sy(th)} L ${sx(G.W - th)} ${sy(th)} L ${sx(G.W - th)} ${sy(-G.D + th)} L ${sx(-G.W + th)} ${sy(-G.D + th)} L ${sx(-G.W + th)} ${sy(th)} L ${sx(-G.X)} ${sy(th)} Z`} fill={C.hk} opacity={0.85} />}
    {s.sites.filter(q => q.p[2] === 0).map((q, i) => <circle key={i} cx={sx(q.p[0])} cy={sy(q.p[1])} r={4} fill={SITE_COL[q.st]} />)}
    {s.parts.filter(p => Math.abs(pos(p)[2]) < 0.5).map((p, i) => { const [x, y] = pos(p); return <circle key={`p${i}`} cx={sx(x)} cy={sy(y)} r={4.5} fill={p.kind === "A" ? "#7d8fae" : "#4aa3df"} stroke="#333" strokeWidth={0.5} />; })}
    <T x={340} y={244} s={12} c={C.mute}>（当前环境无 WebGL：显示 z = 0 截面上的同一模拟）</T>
  </Svg>;
}

export function ALD3D() {
  const host = useRef(null), sim = useRef(newSim()), play = useRef(true), api = useRef(null);
  const [ui, setUi] = useState({ ph: 0, cycle: 0, cov: 0, b: 0 }), [running, setRunning] = useState(true);
  const [mode, setMode] = useState("loading");      // loading | 3d | svg
  const [, tick] = useState(0);

  useEffect(() => {
    let dead = false, raf = 0, last = performance.now(), visible = true, lastUi = 0, cleanup = () => {};
    const loop = now => {
      if (dead) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (play.current && visible) step(sim.current, dt);
      if (api.current && visible) api.current.draw();
      if (now - lastUi > 150) {
        lastUi = now; const s = sim.current, ph = PH[s.ph], want = ph.k === "A" || ph.k === "pA" ? 1 : 2;
        const cov = s.sites.filter(q => q.st >= want).length / s.sites.length;
        setUi({ ph: s.ph, cycle: s.cycle, cov, b: s.bounces });
        if (!api.current) tick(x => x + 1);
      }
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(es => { visible = es[0]?.isIntersecting ?? true; });
    if (host.current) io.observe(host.current.parentElement);
    async function setup() {
      let renderer, controls, observer; const disp = [];
      const dispose = () => { observer?.disconnect(); controls?.dispose(); disp.forEach(d => d.dispose()); if (renderer) { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); } api.current = null; };
      cleanup = dispose;
      try {
        const test = document.createElement("canvas");
        if (!(test.getContext("webgl2") || test.getContext("webgl"))) throw new Error("no webgl");
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead || !host.current) return;
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#faf8f3");
        const camera = new THREE.PerspectiveCamera(36, 1.6, 0.1, 60); camera.position.set(4.6, 3.2, 6.4);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("role", "img"); renderer.domElement.setAttribute("aria-label", "ALD 沟槽三维动画；拖动旋转，滚轮缩放");
        host.current.appendChild(renderer.domElement);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x6b6355, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 2.0); dl.position.set(3, 6, 5); scene.add(dl);
        const mk = (geo, mat) => { disp.push(geo, mat); return new THREE.Mesh(geo, mat); };
        const siMat = new THREE.MeshStandardMaterial({ color: C.si, roughness: 0.8 }), boxG = new THREE.BoxGeometry(1, 1, 1);
        disp.push(siMat, boxG);
        const block = (x0, x1, y0, y1, mat) => { const m = new THREE.Mesh(boxG, mat); m.scale.set(x1 - x0, y1 - y0, 2 * G.Z); m.position.set((x0 + x1) / 2, (y0 + y1) / 2, 0); scene.add(m); return m; };
        block(-G.X, -G.W, -2.8, 0, siMat); block(G.W, G.X, -2.8, 0, siMat); block(-G.W, G.W, -2.8, -G.D, siMat);
        const filmMat = new THREE.MeshStandardMaterial({ color: C.hk, roughness: 0.5, transparent: true, opacity: 0.9 }); disp.push(filmMat);
        const film = [0, 1, 2, 3, 4].map(() => block(0, 1, 0, 1, filmMat));
        const setFilm = th => {
          const f = (m, x0, x1, y0, y1) => { const ok = th > 0.001; m.visible = ok; if (ok) { m.scale.set(x1 - x0, y1 - y0, 2 * G.Z); m.position.set((x0 + x1) / 2, (y0 + y1) / 2, 0); } };
          f(film[0], -G.X, -G.W, 0, th); f(film[1], G.W, G.X, 0, th); f(film[2], -G.W, -G.W + th, -G.D, 0); f(film[3], G.W - th, G.W, -G.D, 0); f(film[4], -G.W + th, G.W - th, -G.D, -G.D + th);
        };
        const sphere = new THREE.SphereGeometry(1, 12, 8); disp.push(sphere);
        const inst = (n, r) => { const mat = new THREE.MeshStandardMaterial({ roughness: 0.5 }); disp.push(mat); const m = new THREE.InstancedMesh(sphere, mat, n); m.userData.r = r; m.instanceMatrix.setUsage(THREE.DynamicDrawUsage); scene.add(m); return m; };
        const siteM = inst(200, 0.065), partM = inst(400, 0.085), prodM = inst(300, 0.055);
        const mat4 = new THREE.Matrix4(), col = new THREE.Color();
        const put = (m, i, p, c) => { const r = m.userData.r; mat4.makeScale(r, r, r).setPosition(p[0], p[1], p[2]); m.setMatrixAt(i, mat4); col.set(c); m.setColorAt(i, col); };
        let lastTh = -1;
        const draw = () => {
          const s = sim.current;
          if (s.th !== lastTh) { setFilm(s.th); lastTh = s.th; }
          s.sites.forEach((q, i) => put(siteM, i, q.p, SITE_COL[q.st])); siteM.count = s.sites.length;
          const np = Math.min(400, s.parts.length); for (let i = 0; i < np; i++) put(partM, i, pos(s.parts[i]), s.parts[i].kind === "A" ? "#7d8fae" : "#4aa3df"); partM.count = np;
          const nq = Math.min(300, s.prods.length); for (let i = 0; i < nq; i++) put(prodM, i, pos(s.prods[i]), "#e8e4dc"); prodM.count = nq;
          [siteM, partM, prodM].forEach(m => { m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; });
          renderer.render(scene, camera);
        };
        controls = new OrbitControls(camera, renderer.domElement); controls.target.set(0, -1, 0); controls.enablePan = false; controls.minDistance = 3; controls.maxDistance = 16; controls.update();
        observer = new ResizeObserver(() => { if (!host.current) return; const w = Math.max(260, host.current.clientWidth), h = Math.round(w * 0.58); renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); api.current?.draw(); });
        observer.observe(host.current);
        api.current = { draw, view: k => { camera.position.set(...(k === "front" ? [0, -0.9, 7.5] : [4.6, 3.2, 6.4])); controls.update(); draw(); } };
        controls.addEventListener("change", draw);
        requestAnimationFrame(() => api.current?.draw());
        setMode("3d");
      } catch { dispose(); if (!dead) setMode("svg"); }
    }
    setup(); raf = requestAnimationFrame(loop);
    return () => { dead = true; cancelAnimationFrame(raf); io.disconnect(); cleanup(); };
  }, []);

  const s = sim.current, ph = PH[ui.ph];
  const toggle = () => { play.current = !play.current; setRunning(play.current); };
  const reset = () => { sim.current = newSim(); };
  const skip = () => { const q = sim.current; if (PH[q.ph].k === "A" || PH[q.ph].k === "B") { const want = PH[q.ph].k === "A" ? 0 : 1; q.sites.forEach(x => { if (x.st === want) x.st = want + 1; }); } q.t = PH[q.ph].dur; };
  return <div style={box}>
    <div style={{ ...rowS, fontSize: 14 }}>
      {PH.map((p, i) => <span key={i} style={{ padding: "3px 8px", borderRadius: 6, background: i === ui.ph ? (p.k === "A" ? "#dfe5f0" : p.k === "B" ? "#d9ecf8" : "#eee") : "transparent", fontWeight: i === ui.ph ? 600 : 400 }}>{p.name}</span>)}
    </div>
    <div style={{ position: "relative" }}>
      <div ref={host} style={{ width: "100%", display: mode === "3d" ? "block" : "none" }} />
      {mode !== "3d" && <Fallback s={s} />}
    </div>
    <div style={rowS}>
      <button style={btn(false)} onClick={toggle}>{running ? "暂停" : "继续"}</button>
      <button style={btn(false)} onClick={skip}>跳到下一阶段</button>
      <button style={btn(false)} onClick={reset}>重置</button>
      {mode === "3d" && <><button style={btn(false)} onClick={() => api.current?.view("iso")}>斜视</button><button style={btn(false)} onClick={() => api.current?.view("front")}>正视截面</button></>}
    </div>
    <p style={{ fontSize: 14, margin: "6px 0 0", textAlign: "center" }}>
      已完成 <b>{ui.cycle}</b> 个循环（≈ {(ui.cycle * 0.1).toFixed(1)} nm，按约 1 Å/循环）；本阶段位点反应比例 <b>{Math.round(100 * ui.cov)}%</b>；被已饱和位点弹回的分子累计 <b>{ui.b}</b> 个。
    </p>
    <p style={{ fontSize: 13, margin: "4px 0 0", color: "#5f5a52", textAlign: "center" }}>
      {mode === "3d" ? "拖动旋转 · 滚轮缩放。" : mode === "svg" ? "" : "正在加载三维视图……"}
      红点：表面 –OH；深灰：–O–Al(CH₃)₂；蓝灰球：TMA；蓝球：H₂O；浅色小球：CH₄ 副产物；绿色：已沉积的 Al₂O₃（厚度放大示意，{G.cap} 个循环后不再加厚）。
    </p>
  </div>;
}
