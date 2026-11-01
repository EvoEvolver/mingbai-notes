// 第 7 章（上）三维交互：掩模窗口下二维扩散的浓度场 C(x,z) 高度曲面（Three.js 按需加载；无 WebGL 时只显示 SVG 截面图）。
// 数值：P.mask2D（推进：解析解；预淀积：二维显式差分），长度以 $2\sqrt{Dt}$ 为单位。
// 校核：C_B/C_S = 1e-3 时横向扩散/结深 ≈ 0.84（推进）、0.87（预淀积），与"横向约 0.75–0.85 x_j"的经验一致。
import { useEffect, useMemo, useRef, useState } from "react";
import * as P from "./_ch07_phys.jsx";
import { Seg, Slider, Row, Readout, MAT } from "./_ch07_ui.jsx";

const R = String.raw;
const W = 4, H = 3.5, NX = 81, NZ = 41;

// 高度：h = log10(C/C_B)/log10(C_S/C_B)，C<C_B 时为 0（结外）
const heightOf = (c, cb) => (c > cb ? Math.log10(c / cb) / Math.log10(1 / cb) : 0);
function colorOf(h) {   // 0 → 硅灰；1 → 深玫红
  if (h <= 0) return [0.80, 0.80, 0.80];
  const a = [0.93, 0.74, 0.79], b = [0.62, 0.20, 0.33], s = Math.min(1, h);
  return a.map((v, i) => v + (b[i] - v) * s);
}

// ---------- SVG 截面图（同时作为无 WebGL 时的替代）----------
function Section({ f, a, cb, j }) {
  const sx = 600 / (2 * W), sz = 260 / H, X = x => 20 + (x + W) * sx, Z = z => 30 + z * sz;
  const cells = [];
  for (let jz = 0; jz < NZ - 1; jz++) for (let i = 0; i < NX - 1; i++) {
    const h = heightOf(f.C[jz * NX + i], cb), [r, g, b] = colorOf(h);
    cells.push(<rect key={jz * NX + i} x={X(f.xs[i])} y={Z(f.zs[jz])} width={sx * (f.xs[1] - f.xs[0]) + 0.6} height={sz * (f.zs[1] - f.zs[0]) + 0.6} fill={`rgb(${r * 255 | 0},${g * 255 | 0},${b * 255 | 0})`} />);
  }
  // 结（C=C_B）等值线：沿每列找穿越点
  const pts = [];
  for (let i = 0; i < NX; i++) for (let jz = 1; jz < NZ; jz++) { const c0 = f.C[(jz - 1) * NX + i], c1 = f.C[jz * NX + i]; if (c0 >= cb && c1 < cb) { pts.push([f.xs[i], f.zs[jz - 1] + (f.zs[jz] - f.zs[jz - 1]) * Math.log(c0 / cb) / Math.log(c0 / c1)]); break; } }
  return (
    <svg viewBox="0 0 640 320" style={{ width: "100%", height: "auto", display: "block", maxWidth: 680, margin: "0 auto" }} role="img" aria-label="掩模窗口下扩散区的截面浓度图与结深等值线">
      {cells}
      <rect x={X(-W)} y={18} width={X(-a) - X(-W)} height={12} fill={MAT.ox} stroke={MAT.oxEdge} />
      <rect x={X(a)} y={18} width={X(W) - X(a)} height={12} fill={MAT.ox} stroke={MAT.oxEdge} />
      {pts.length > 1 && <polyline points={pts.map(([x, z]) => `${X(x)},${Z(z)}`).join(" ")} fill="none" stroke="#1f1b16" strokeWidth="2" strokeDasharray="5 3" />}
      {Number.isFinite(j.zj) && <g stroke="#2c4a6e" strokeWidth="1.5"><line x1={X(0)} y1={Z(0)} x2={X(0)} y2={Z(j.zj)} /><text x={X(0) + 5} y={Z(j.zj / 2)} fontSize="13" fill="#2c4a6e" stroke="none" fontStyle="italic">x<tspan dy="4" fontSize="10">j</tspan></text></g>}
      {Number.isFinite(j.xl) && <g stroke="#c0392b" strokeWidth="1.5"><line x1={X(a)} y1={Z(0) + 4} x2={X(a + j.xl)} y2={Z(0) + 4} /><text x={X(a + j.xl / 2)} y={Z(0) + 18} fontSize="12" fill="#c0392b" stroke="none" textAnchor="middle">横向</text></g>}
      <text x={X(0)} y={14} fontSize="12" textAnchor="middle">掩模窗口</text>
      <text x={X(-W) + 4} y={Z(H) - 6} fontSize="12" fill="#555">横向 x 与深度 z 均以扩散长度 2√(Dt) 为单位</text>
    </svg>);
}

// ---------- Three.js 高度曲面 ----------
function Surface3D({ f, cb, a }) {
  const host = useRef(null), api = useRef(null);
  const [state, setState] = useState("loading");
  useEffect(() => {
    let dead = false, cleanup = () => {};
    (async () => {
      let renderer, controls, geom, mat, lineGeom, lineMat, maskGeom, maskMat, observer;
      const dispose = () => { observer?.disconnect(); controls?.dispose(); [geom, mat, lineGeom, lineMat, maskGeom, maskMat].forEach(o => o?.dispose()); if (renderer) { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); } api.current = null; };
      cleanup = dispose;
      try {
        const probe = document.createElement("canvas");
        if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) throw new Error("no webgl");
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead || !host.current) return;
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#faf8f3");
        const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50); camera.position.set(3.2, 3.0, 4.2); camera.lookAt(0, 0, 0.6);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("aria-label", "可旋转的浓度曲面；拖动旋转，滚轮缩放"); renderer.domElement.setAttribute("role", "img");
        host.current.appendChild(renderer.domElement);
        const pos = new Float32Array(NX * NZ * 3), col = new Float32Array(NX * NZ * 3), idx = [];
        for (let j = 0; j < NZ - 1; j++) for (let i = 0; i < NX - 1; i++) { const k = j * NX + i; idx.push(k, k + NX, k + 1, k + 1, k + NX, k + NX + 1); }
        geom = new THREE.BufferGeometry(); geom.setAttribute("position", new THREE.BufferAttribute(pos, 3)); geom.setAttribute("color", new THREE.BufferAttribute(col, 3)); geom.setIndex(idx);
        mat = new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.75, metalness: 0.02 });
        scene.add(new THREE.Mesh(geom, mat));
        lineGeom = new THREE.BufferGeometry(); lineMat = new THREE.LineBasicMaterial({ color: 0x1f1b16 });
        const lines = new THREE.LineSegments(lineGeom, lineMat); scene.add(lines);
        maskGeom = new THREE.BoxGeometry(1, 0.04, 0.12); maskMat = new THREE.MeshStandardMaterial({ color: MAT.ox, roughness: 0.5 });
        const mL = new THREE.Mesh(maskGeom, maskMat), mR = new THREE.Mesh(maskGeom, maskMat); scene.add(mL, mR);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x777066, 2.2)); const light = new THREE.DirectionalLight(0xffffff, 2.0); light.position.set(2, 5, 3); scene.add(light);
        const render = () => { if (!dead) renderer.render(scene, camera); };
        controls = new OrbitControls(camera, renderer.domElement); controls.target.set(0, 0, 0.6); controls.enablePan = false; controls.minDistance = 2.5; controls.maxDistance = 12; controls.addEventListener("change", render); controls.update();
        const sxs = 2 / W, szs = 1.75 / H, hs = 1.3;
        api.current = {
          update: (F, CB, A) => {
            for (let j = 0; j < NZ; j++) for (let i = 0; i < NX; i++) {
              const k = j * NX + i, h = heightOf(F.C[k], CB), c = colorOf(h);
              pos[3 * k] = F.xs[i] * sxs; pos[3 * k + 1] = h * hs; pos[3 * k + 2] = F.zs[j] * szs;
              col[3 * k] = c[0]; col[3 * k + 1] = c[1]; col[3 * k + 2] = c[2];
            }
            geom.attributes.position.needsUpdate = true; geom.attributes.color.needsUpdate = true; geom.computeVertexNormals();
            // 结的等值线：在 h=0 平面上，相邻格点跨越 C_B 处连线（行与列方向各扫一遍取交点，再按列顺序相连）
            const seg = []; let prev = null;
            for (let i = 0; i < NX; i++) {
              let hit = null;
              for (let j = 1; j < NZ; j++) { const c0 = F.C[(j - 1) * NX + i], c1 = F.C[j * NX + i]; if (c0 >= CB && c1 < CB) { hit = [F.xs[i] * sxs, 0.01, (F.zs[j - 1] + (F.zs[j] - F.zs[j - 1]) * Math.log(c0 / CB) / Math.log(c0 / c1)) * szs]; break; } }
              if (hit && prev) seg.push(...prev, ...hit); prev = hit;
            }
            lineGeom.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
            const wL = (W - A) * sxs; mL.scale.set(wL, 1, 1); mR.scale.set(wL, 1, 1);
            mL.position.set(-A * sxs - wL / 2, 0.02, -0.08); mR.position.set(A * sxs + wL / 2, 0.02, -0.08);
            render();
          },
          view: k => { camera.position.set(...(k === "front" ? [0, 0.6, 5] : k === "top" ? [0, 5.5, 0.61] : [3.2, 3.0, 4.2])); controls.update(); render(); },
        };
        observer = new ResizeObserver(() => { if (!host.current) return; const w = Math.max(260, host.current.clientWidth); renderer.setSize(w, 330); camera.aspect = w / 330; camera.updateProjectionMatrix(); render(); });
        observer.observe(host.current);
        if (!dead) setState("ready");
      } catch { dispose(); if (!dead) setState("failed"); }
    })();
    return () => { dead = true; cleanup(); };
  }, []);
  useEffect(() => { if (state === "ready") api.current?.update(f, cb, a); }, [f, cb, a, state]);
  if (state === "failed") return <p style={{ fontSize: 13, textAlign: "center", color: "var(--muted)" }}>当前环境未启用 WebGL：三维曲面不可用，请看下方的截面图（同一组数据）。</p>;
  const btn = { border: "1px solid var(--line)", background: "var(--paper)", borderRadius: 99, padding: "2px 12px", fontSize: 13, cursor: "pointer", color: "var(--muted)" };
  return <div>
    <div ref={host} style={{ width: "100%", height: state === "ready" ? 330 : 0, overflow: "hidden" }} />
    <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "6px 0" }}>
      {[["iso", "斜视"], ["front", "正视（截面）"], ["top", "俯视"]].map(([k, l]) => <button key={k} style={btn} disabled={state !== "ready"} onClick={() => api.current?.view(k)}>{l}</button>)}
    </div>
    <p style={{ fontSize: 13, textAlign: "center", color: "var(--muted)", margin: 0 }}>{state === "ready" ? "拖动旋转 · 滚轮/双指缩放。曲面高度取浓度相对本底的对数，贴到地面的边界就是 pn 结。" : "正在加载三维视图……"}</p>
  </div>;
}

export function MaskDiffusion3D() {
  const [mode, setMode] = useState("pre"), [a, setA] = useState(1), [cb, setCb] = useState(1e-3);
  const f = useMemo(() => P.mask2D({ mode, a, W, H, nx: NX, nz: NZ }), [mode, a]);
  const j = P.junction2D(f, a, cb);
  return (
    <div style={{ margin: "18px 0" }}>
      <div style={{ borderLeft: "3px solid var(--line)", paddingLeft: 12, marginBottom: 6 }}>
        <Row><Seg options={[["pre", "预淀积：窗口内表面浓度恒定"], ["drive", "推进：窗口内剂量恒定"]]} value={mode} onChange={setMode} /></Row>
        <Row><Slider label={R`\text{窗口半宽}\ a`} value={a} set={setA} min={0.3} max={3} step={0.05} fmt={v => R`${v.toFixed(2)}\times2\sqrt{Dt}`} />
          <Slider label={R`C_B/C_S`} value={cb} set={setCb} min={1e-5} max={0.1} log fmt={v => P.sci(v, 1)} /></Row>
        <Readout items={[[R`x_j`, R`${j.zj.toFixed(2)}\times2\sqrt{Dt}`], [R`\text{横向扩散}`, R`${j.xl.toFixed(2)}\times2\sqrt{Dt}`], [R`\text{横向}/x_j`, (j.xl / j.zj).toFixed(2)]]} />
      </div>
      <Surface3D f={f} cb={cb} a={a} />
      <Section f={f} a={a} cb={cb} j={j} />
    </div>);
}
