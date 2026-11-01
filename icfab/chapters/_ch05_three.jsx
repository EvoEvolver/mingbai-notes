// 步进扫描式投影光刻机光路三维示意（Three.js 按需加载；无 WebGL 时显示 SVG 侧视图）。
// 比例：1 单位 = 50 mm。晶圆 300 mm（半径 3），曝光场 26 mm × 33 mm；掩模为 4 倍（6 英寸掩模上 104 mm × 132 mm 的图形区）。
import { useEffect, useRef, useState } from "react";
import { COL, Frame, Svg, Arrow, TL } from "./_ch05_figs.jsx";

const R = String.raw;
const FW = 0.52, FH = 0.66, SLIT = 0.16, WR = 2.95;   // 场宽（x）、场长（扫描方向 z）、晶圆面上的狭缝高度、可用半径
const fields = (() => {
  const out = [];
  for (let j = -5; j <= 5; j++) for (let i = -6; i <= 6; i++) {
    const x = i * FW, z = j * FH, cs = [[x - FW / 2, z - FH / 2], [x + FW / 2, z - FH / 2], [x - FW / 2, z + FH / 2], [x + FW / 2, z + FH / 2]];
    if (cs.every(([a, b]) => a * a + b * b < WR * WR)) out.push({ x, z, j });
  }
  // 蛇形顺序：逐行，行内往返
  out.sort((a, b) => a.j - b.j || (a.j % 2 ? b.x - a.x : a.x - b.x));
  return out;
})();
const btn = on => ({ padding: "5px 12px", borderRadius: 7, border: `1px solid ${on ? COL.blue : "#bcb6a9"}`, background: on ? "#e2eef7" : "#fffdf8", cursor: "pointer", fontSize: 13 });

function ScannerSVG() {
  return <Svg w={680} h={330} title="步进扫描式光刻机侧视示意：光源、照明系统、掩模台、投影物镜、晶圆台">
    <rect x={40} y={20} width={90} height={34} rx={6} fill="#f5d27a" stroke="#c99a2e" /><text x={85} y={42} textAnchor="middle" fontSize={12}>准分子激光</text>
    <polyline points="130,37 330,37 330,62" fill="none" stroke={COL.light} strokeWidth={3} />
    <rect x={300} y={62} width={60} height={26} rx={4} fill={COL.lens} stroke={COL.lensEdge} /><text x={370} y={80} fontSize={12}>照明系统（形成狭缝、设定 σ）</text>
    <polygon points="318,88 342,88 342,110 318,110" fill={COL.lightFill} />
    <rect x={230} y={110} width={200} height={10} fill={COL.ox} stroke="#7aa6c2" />{[250, 280, 310, 340, 370, 400].map(x => <rect key={x} x={x} y={120} width={12} height={3} fill={COL.cr} />)}
    <Arrow x1={440} y1={115} x2={520} y2={115} c={COL.accent} /><TL x={526} y={115} tex={R`\text{掩模台}\ 4\sym{vscan}{v}`} w={120} color={COL.accent} />
    <polygon points="318,123 342,123 352,150 308,150" fill={COL.lightFill} />
    <rect x={290} y={150} width={80} height={110} rx={10} fill="#e9f3f4" stroke={COL.lensEdge} />
    {[165, 190, 215, 240].map((y, i) => <ellipse key={y} cx={330} cy={y} rx={34 - i * 4} ry={6} fill={COL.lens} stroke={COL.lensEdge} />)}
    <text x={380} y={205} fontSize={12}>投影物镜（4× 缩小）</text>
    <polygon points="322,260 338,260 333,282 327,282" fill={COL.lightFill} />
    <rect x={200} y={282} width={260} height={5} fill={COL.resist} /><rect x={200} y={287} width={260} height={14} fill={COL.si} stroke="#777" />
    <Arrow x1={190} y1={294} x2={130} y2={294} c={COL.blue} /><TL x={124} y={294} tex={R`\text{晶圆台}\ \sym{vscan}{v}`} anchor="end" w={110} color={COL.blue} />
    <text x={330} y={322} textAnchor="middle" fontSize={12} fill={COL.muted}>掩模与晶圆反向同步扫描，速度比等于缩小倍率 4</text>
  </Svg>;
}

export function Scanner3D() {
  const host = useRef(null), api = useRef(null);
  const [ready, setReady] = useState(false), [failed, setFailed] = useState(false), [playing, setPlaying] = useState(true), [count, setCount] = useState(0);
  useEffect(() => {
    let dead = false, raf = 0, cleanup = () => {};
    (async () => {
      const disposables = []; let renderer, controls, observer;
      cleanup = () => { cancelAnimationFrame(raf); observer?.disconnect(); controls?.dispose(); disposables.forEach(d => d.dispose?.()); if (renderer) { renderer.dispose(); renderer.forceContextLoss?.(); renderer.domElement.remove(); } api.current = null; };
      try {
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead || !host.current) return;
        const probe = document.createElement("canvas");
        if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) throw new Error("no webgl");
        const keep = x => (disposables.push(x), x);
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#faf8f3");
        const camera = new THREE.PerspectiveCamera(36, 1.6, 0.1, 100); camera.position.set(9.5, 7.5, 9.5);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("role", "img"); renderer.domElement.setAttribute("aria-label", "步进扫描光刻机光路三维示意：可拖动旋转、滚轮缩放");
        host.current.appendChild(renderer.domElement);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8170, 2.2));
        const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(5, 10, 6); scene.add(dl);
        const mat = (c, o = {}) => keep(new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, metalness: 0.05, ...o }));
        const mesh = (g, m) => new THREE.Mesh(keep(g), m);
        // 光源与照明
        const src = mesh(new THREE.SphereGeometry(0.25, 20, 14), mat(0xf5c542, { emissive: 0xf0a020, emissiveIntensity: 0.8 })); src.position.set(0, 8.2, 0); scene.add(src);
        const cond = mesh(new THREE.SphereGeometry(1, 32, 16), mat(0xbfe3e8, { transparent: true, opacity: 0.75 })); cond.scale.set(1.3, 0.16, 1.3); cond.position.set(0, 7.2, 0); scene.add(cond);
        const beamMat = mat(0xe8a33d, { transparent: true, opacity: 0.22, emissive: 0xe8a33d, emissiveIntensity: 0.3, depthWrite: false });
        const b1 = mesh(new THREE.CylinderGeometry(1.0, 0.2, 0.9, 24, 1, true), beamMat); b1.position.set(0, 7.75, 0); scene.add(b1);
        // 照明狭缝光束：从聚光镜到掩模（矩形截面 4FW × 4SLIT）
        const slitBeam = mesh(new THREE.BoxGeometry(4 * FW, 2.6, 4 * SLIT), beamMat); slitBeam.position.set(0, 5.8, 0); scene.add(slitBeam);
        // 掩模（带铬图形的纹理）
        const cv = document.createElement("canvas"); cv.width = cv.height = 256; const g2 = cv.getContext("2d");
        g2.fillStyle = "#cfe6f5"; g2.fillRect(0, 0, 256, 256); g2.fillStyle = "#3b3b40";
        for (let i = 0; i < 26; i++) g2.fillRect(46 + i * 6.4, 40, 3, 176);
        for (let k = 0; k < 8; k++) g2.fillRect(46, 50 + k * 20, 166, 2);
        g2.strokeStyle = "#7a7a80"; g2.lineWidth = 3; g2.strokeRect(46, 40, 166, 176);
        const tex = keep(new THREE.CanvasTexture(cv)); tex.colorSpace = THREE.SRGBColorSpace;
        const reticle = mesh(new THREE.BoxGeometry(3.04, 0.1, 3.04), [mat(0xcfe6f5), mat(0xcfe6f5), mat(0xffffff, { map: tex }), mat(0xcfe6f5), mat(0xcfe6f5), mat(0xcfe6f5)]);
        const retGroup = new THREE.Group(); retGroup.add(reticle); retGroup.position.set(0, 4.5, 0); scene.add(retGroup);
        const stage = mesh(new THREE.BoxGeometry(3.6, 0.12, 0.3), mat(0x7f8790)); stage.position.set(0, -0.11, 1.55); retGroup.add(stage);
        const stage2 = stage.clone(); stage2.position.z = -1.55; retGroup.add(stage2);
        // 投影物镜：镜筒 + 透镜组
        const barrel = mesh(new THREE.CylinderGeometry(1.25, 1.0, 3.0, 40, 1, true), mat(0x9aa7ad, { transparent: true, opacity: 0.25, side: THREE.DoubleSide, depthWrite: false })); barrel.position.set(0, 2.55, 0); scene.add(barrel);
        [3.7, 3.15, 2.6, 2.05, 1.5].forEach((y, i) => { const l = mesh(new THREE.SphereGeometry(1, 32, 12), mat(0xbfe3e8, { transparent: true, opacity: 0.8 })); l.scale.set(1.12 - 0.08 * Math.abs(i - 2), 0.12, 1.12 - 0.08 * Math.abs(i - 2)); l.position.y = y; scene.add(l); });
        const cone = mesh(new THREE.CylinderGeometry(0.75, 0.2, 3.9, 4, 1, true), beamMat); cone.rotation.y = Math.PI / 4; cone.scale.set(1, 1, 0.35); cone.position.set(0, 2.42, 0); scene.add(cone);
        // 晶圆（纹理上画曝光场）
        const wc = document.createElement("canvas"); wc.width = wc.height = 512; const wg = wc.getContext("2d");
        const wtex = keep(new THREE.CanvasTexture(wc)); wtex.colorSpace = THREE.SRGBColorSpace;
        const U = v => (v / 3 + 1) * 256;   // 世界坐标（−3..3）→ 纹理像素
        const done = new Float32Array(fields.length);
        const paint = () => {
          wg.clearRect(0, 0, 512, 512); wg.fillStyle = "#a9adb3"; wg.beginPath(); wg.arc(256, 256, 254, 0, 7); wg.fill();
          wg.fillStyle = "#c9b6ec"; wg.beginPath(); wg.arc(256, 256, 250, 0, 7); wg.fill();
          fields.forEach((f, i) => {
            // 圆柱顶面 UV：u ↔ z、v ↔ x，且纹理默认 flipY，故 世界 (x,z) → 画布 (U(z), U(−x))
            const cx0 = U(f.z - FH / 2), cy0 = U(-(f.x + FW / 2)), w = FH / 6 * 512, h = FW / 6 * 512;
            if (done[i] > 0) { wg.fillStyle = "#6f4fb3"; wg.fillRect(cx0, cy0, w * Math.min(1, done[i]), h); }
            wg.strokeStyle = "#ffffff"; wg.lineWidth = 1.2; wg.strokeRect(cx0, cy0, w, h);
          });
          wtex.needsUpdate = true;
        };
        paint();
        const wafer = mesh(new THREE.CylinderGeometry(3, 3, 0.06, 64), [mat(0x9ca0a6), mat(0xffffff, { map: wtex }), mat(0x9ca0a6)]);
        const wGroup = new THREE.Group(); wGroup.add(wafer); wGroup.position.y = 0.32; scene.add(wGroup);
        const chuck = mesh(new THREE.CylinderGeometry(3.25, 3.25, 0.25, 64), mat(0x6b7178)); chuck.position.y = -0.14; wGroup.add(chuck);
        const base = mesh(new THREE.BoxGeometry(9, 0.2, 9), mat(0xd8d3c8)); base.position.y = -0.1; scene.add(base);
        controls = new OrbitControls(camera, renderer.domElement); controls.target.set(0, 3, 0); controls.enablePan = false; controls.minDistance = 6; controls.maxDistance = 26; controls.update();
        const render = () => renderer.render(scene, camera);
        controls.addEventListener("change", render);
        observer = new ResizeObserver(() => { if (!host.current) return; const w = Math.max(260, host.current.clientWidth), h = Math.round(Math.min(460, w * 0.66)); renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); render(); });
        observer.observe(host.current);
        // 动画：每个场 扫描 1.6 s + 步进 0.5 s
        let k = 0, phase = 0, last = performance.now(), run = true;
        const place = () => {
          const f = fields[k], scan = Math.min(1, phase / 1.6), L = FH + SLIT;
          const zc = phase <= 1.6 ? f.z - L / 2 + scan * L : f.z + L / 2;
          let wx = f.x, wz = zc;
          if (phase > 1.6) { const g = fields[(k + 1) % fields.length], t = (phase - 1.6) / 0.5, s = t * t * (3 - 2 * t); wx = f.x + (g.x - f.x) * s; wz = (f.z + L / 2) + (g.z - L / 2 - (f.z + L / 2)) * s; }
          wGroup.position.x = -wx; wGroup.position.z = -wz;          // 晶圆台带着晶圆走，使当前点位于物镜正下方
          retGroup.position.z = phase <= 1.6 ? 4 * (zc - f.z) : 0;   // 掩模反向（像倒置）以 4 倍速度扫描
          if (phase <= 1.6) { done[k] = Math.max(0, Math.min(1, (zc - (f.z - FH / 2)) / FH)); paint(); }
        };
        const tick = now => {
          const dt = Math.min(0.05, (now - last) / 1000); last = now;
          if (run) { phase += dt; if (phase > 2.1) { done[k] = 1; phase = 0; k++; if (k >= fields.length) { k = 0; done.fill(0); } setCount(k); } place(); render(); }
          raf = requestAnimationFrame(tick);
        };
        api.current = { play: v => { run = v; last = performance.now(); }, reset: () => { k = 0; phase = 0; done.fill(0); setCount(0); place(); paint(); render(); }, view: top => { camera.position.set(...(top ? [0.01, 16, 0.01] : [9.5, 7.5, 9.5])); controls.update(); render(); } };
        place(); render(); setReady(true); raf = requestAnimationFrame(tick);
      } catch (e) { cleanup(); if (!dead) setFailed(true); }
    })();
    return () => { dead = true; cleanup(); };
  }, []);
  return <Frame>
    <div style={{ position: "relative" }}>
      <div ref={host} style={{ width: "100%", height: ready ? "auto" : 0, overflow: "hidden" }} />
      {!ready && <ScannerSVG />}
    </div>
    <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 6 }}>
      <button style={btn(playing)} disabled={!ready} onClick={() => { const v = !playing; setPlaying(v); api.current?.play(v); }}>{playing ? "暂停" : "播放"}</button>
      <button style={btn(false)} disabled={!ready} onClick={() => api.current?.reset()}>重来</button>
      <button style={btn(false)} disabled={!ready} onClick={() => api.current?.view(false)}>斜视</button>
      <button style={btn(false)} disabled={!ready} onClick={() => api.current?.view(true)}>俯视晶圆</button>
    </div>
    <p style={{ fontSize: 13, textAlign: "center", color: COL.muted, margin: "6px 0 0" }}>
      {failed ? "当前环境未启用 WebGL，显示侧视示意图。" : ready ? `拖动旋转 · 滚轮缩放 · 已完成 ${count} / ${fields.length} 个曝光场（每场 26 mm 乘 33 mm）` : "正在加载三维视图……"}
    </p>
  </Frame>;
}
