// 二维空间像 I(x,y) 的三维高度场（Three.js，按需懒加载；无 WebGL 时只显示 SVG 热图）。
// 版图仿原书图 5.39/5.65：两个肘形 + 一个接触孔，特征尺寸 100 nm，λ = 193 nm；可切换 OPC 衬线/缺口。
import { useEffect, useMemo, useRef, useState } from "react";
import { Slider, Seg, TxI } from "@kit";
import * as P from "./_ch05b_phys.jsx";
import { COL, Row, Svg, Txt, heat, rgb, Readout } from "./_ch05b_kit.jsx";

const R = String.raw;
const N = 128, L = 1280;   // 网格 128×128，10 nm/像素，视场 1.28 µm

function TopView({ I, opc, thr, vmax }) {
  const M = 64, s = N / M, cell = 4.4, off = 20;
  const rects = [];
  for (let j = 0; j < M; j++) for (let i = 0; i < M; i++) {
    let v = 0; for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) v += I[(j * s + a) * N + i * s + b];
    v /= s * s;
    const c = heat(v / vmax);
    rects.push(<rect key={j * M + i} x={off + i * cell} y={off + (M - 1 - j) * cell} width={cell + 0.3} height={cell + 0.3} fill={rgb(c)} />);
    if (v >= thr) rects.push(<rect key={"t" + (j * M + i)} x={off + i * cell} y={off + (M - 1 - j) * cell} width={cell + 0.3} height={cell + 0.3} fill="#ffffff" opacity={0.35} />);
  }
  const sc = (M * cell) / L, X = x => off + (x + L / 2) * sc, Y = y => off + (L / 2 - y) * sc;
  const box = ([x0, y0, x1, y1], k, c, dash) => <rect key={k} x={X(x0)} y={Y(y1)} width={(x1 - x0) * sc} height={(y1 - y0) * sc} fill="none" stroke={c} strokeWidth={1.3} strokeDasharray={dash} />;
  return <Svg w={off * 2 + M * cell + 150} h={off * 2 + M * cell} title="空间像俯视热图（白色叠加 = 光强超过显影阈值、会被印出的区域）">
    {rects}
    {P.LAYOUT.map((r, k) => box(r, "L" + k, "#7fd3ff"))}
    {opc && P.OPC_ADD.map((r, k) => box(r, "A" + k, "#7cff9a"))}
    {opc && P.OPC_CUT.map((r, k) => box(r, "C" + k, "#ff8080", "3 2"))}
    <Txt x={off + M * cell + 12} y={40} a="start" s={12}>青框：设计图形</Txt>
    {opc && <Txt x={off + M * cell + 12} y={60} a="start" s={12} c="#2a8a3f">绿框：OPC 衬线</Txt>}
    {opc && <Txt x={off + M * cell + 12} y={80} a="start" s={12} c={COL.red}>红虚框：内角缺口</Txt>}
    <Txt x={off + M * cell + 12} y={110} a="start" s={12}>白色叠加：</Txt>
    <Txt x={off + M * cell + 12} y={126} a="start" s={12}>I ≥ 阈值（印出）</Txt>
    <Txt x={off + M * cell + 12} y={off + M * cell - 6} a="start" s={11} c="#666">视场 1.28 µm</Txt>
  </Svg>;
}

function Surface3D({ I, vmax, opc }) {
  const host = useRef(null), api = useRef(null), [state, setState] = useState("loading");
  useEffect(() => {
    let dead = false, cleanup = () => {};
    (async () => {
      let renderer, controls, geo, mat, lineGeo, lineMat, observer;
      const dispose = () => { observer?.disconnect(); controls?.dispose(); geo?.dispose(); mat?.dispose(); lineGeo?.dispose(); lineMat?.dispose(); if (renderer) { renderer.dispose(); renderer.forceContextLoss?.(); renderer.domElement.remove(); } api.current = null; };
      cleanup = dispose;
      try {
        const c = document.createElement("canvas");
        if (!(c.getContext("webgl2") || c.getContext("webgl"))) throw new Error("no webgl");
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead || !host.current) return;
        const scene = new THREE.Scene(); scene.background = new THREE.Color("#faf8f3");
        const camera = new THREE.PerspectiveCamera(40, 1.6, 0.1, 50); camera.position.set(0, -3.2, 2.6); camera.up.set(0, 0, 1); camera.lookAt(0, 0, 0.2);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("aria-label", "空间像强度曲面：拖动旋转，滚轮缩放"); host.current.appendChild(renderer.domElement);
        geo = new THREE.PlaneGeometry(2, 2, N - 1, N - 1);
        geo.setAttribute("color", new THREE.Float32BufferAttribute(new Float32Array(N * N * 3), 3));
        mat = new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.65, metalness: 0.05 });
        scene.add(new THREE.Mesh(geo, mat));
        lineMat = new THREE.LineBasicMaterial({ color: 0x2c4a6e }); lineGeo = new THREE.BufferGeometry(); const lines = new THREE.LineSegments(lineGeo, lineMat); scene.add(lines);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x554466, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(2, -2, 4); scene.add(dl);
        const render = () => { if (!dead) renderer.render(scene, camera); };
        controls = new OrbitControls(camera, renderer.domElement); controls.target.set(0, 0, 0.2); controls.minDistance = 1.5; controls.maxDistance = 8; controls.addEventListener("change", render); controls.update();
        api.current = {
          update: (I, vmax, opc) => {
            const pos = geo.attributes.position, col = geo.attributes.color;
            // PlaneGeometry 顶点顺序：行从 +y 到 −y
            for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
              const k = r * N + c, j = N - 1 - r, v = I[j * N + c];
              pos.setZ(k, v / vmax * 0.9); const h = heat(v / vmax); col.setXYZ(k, h[0] / 255, h[1] / 255, h[2] / 255);
            }
            pos.needsUpdate = true; col.needsUpdate = true; geo.computeVertexNormals();
            const segs = [], rect = ([x0, y0, x1, y1]) => { const t = v => v / (L / 2); const p = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; for (let i = 0; i < 4; i++) { const a = p[i], b = p[(i + 1) % 4]; segs.push(t(a[0]), t(a[1]), 0.002, t(b[0]), t(b[1]), 0.002); } };
            P.LAYOUT.forEach(rect); if (opc) P.OPC_ADD.forEach(rect);
            lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(segs, 3)); lineGeo.attributes.position.needsUpdate = true;
            render();
          },
          view: top => { camera.position.set(...(top ? [0, -0.01, 4] : [0, -3.2, 2.6])); controls.update(); render(); },
        };
        observer = new ResizeObserver(() => { if (!host.current) return; const w = Math.max(260, host.current.clientWidth); renderer.setSize(w, 360); camera.aspect = w / 360; camera.updateProjectionMatrix(); render(); });
        observer.observe(host.current);
        setState("ready");
      } catch { dispose(); if (!dead) setState("failed"); }
    })();
    return () => { dead = true; cleanup(); };
  }, []);
  useEffect(() => { if (state === "ready") api.current?.update(I, vmax, opc); }, [I, vmax, opc, state]);
  return <div>
    <div ref={host} style={{ width: "100%", height: state === "ready" ? 360 : 0, overflow: "hidden" }} />
    {state === "ready" && <Row><button className="plot-reset" onClick={() => api.current?.view(false)}>斜视</button><button className="plot-reset" onClick={() => api.current?.view(true)}>俯视</button><span style={{ fontSize: 13 }}>拖动旋转 · 滚轮/双指缩放 · 高度与颜色 = 相对光强</span></Row>}
    {state === "failed" && <p className="muted" style={{ fontSize: 13 }}>当前浏览器未启用 WebGL，三维曲面不可用；上方 SVG 热图显示同一份计算结果。</p>}
    {state === "loading" && <p className="muted" style={{ fontSize: 13 }}>正在加载三维视图……</p>}
  </div>;
}

export function AerialSurface() {
  const [NA, setNA] = useState(0.93), [sig, setSig] = useState(0.5), [zf, setZf] = useState(0), [mode, setMode] = useState("raw"), [thr, setThr] = useState(0.3);
  const res = useMemo(() => P.aerial2D({ N, L, lambda: 193, NA, sigma: sig, zf, opc: mode === "opc" }), [NA, sig, zf, mode]);
  const vmax = 1.0, opc = mode === "opc";
  // 接触孔中心与小肘形内角的光强（定量对比 OPC 效果）
  const at = (x, y) => res.I[Math.round((y + L / 2) / L * N - 0.5) * N + Math.round((x + L / 2) / L * N - 0.5)];
  return <div className="card" id="aerial-3d" style={{ padding: "0.8em" }}>
    <Row>
      <Seg options={[["raw", "原始掩模"], ["opc", "加 OPC（衬线 + 缺口）"]]} value={mode} onChange={setMode} />
      <Slider label={R`$\mathrm{NA}$`} value={NA} min={0.5} max={1.35} step={0.01} onChange={setNA} />
      <Slider label={R`$\sigma$`} value={sig} min={0} max={0.9} step={0.05} onChange={setSig} />
      <Slider label="离焦 (nm)" value={zf} min={-200} max={200} step={10} onChange={setZf} />
      <Slider label="显影阈值" value={thr} min={0.1} max={0.6} step={0.01} onChange={setThr} />
    </Row>
    <TopView I={res.I} opc={opc} thr={thr} vmax={vmax} />
    <Readout><TxI>{R`$\lambda=193$ nm，特征 100 nm，$k_1=0.1\,\mathrm{NA}/0.193=${(0.1 * NA / 0.193).toFixed(2)}$。接触孔中心光强 $I=${at(200, -200).toFixed(2)}$；大肘形右端线端 $I=${at(235, 200).toFixed(2)}$；小肘形内角 $I=${at(55, -45).toFixed(2)}$（$N_{\rm src}=${res.nSrc}$ 个点源叠加）。`}</TxI></Readout>
    <Surface3D I={res.I} vmax={vmax} opc={opc} />
  </div>;
}
