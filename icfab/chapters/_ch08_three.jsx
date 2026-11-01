// 第 8 章（上）三维场景：图 8.9 金刚石晶格沟道（可旋转）与简化 BCA Monte Carlo 离子轨迹。
// Three.js 在 useEffect 中按需加载；无 WebGL 时显示同一数据的 SVG 正交投影；卸载时释放全部资源。
import { useEffect, useMemo, useRef, useState } from "react";
import { TxI } from "@kit";
import * as P from "./_ch08_phys.jsx";
import { Seg, Slider, ION_COLOR, sci } from "./_ch08_plots.jsx";

const R = String.raw;
const row = { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" };
const H3D = 360;

// ---------------- 通用：Three.js 宿主 ----------------
// build(THREE, ctx) 在场景建好后调用，返回 {update?(data), dispose?()}；ctx 含 scene、camera、render、controls
function useThree(host, { ortho = false, camPos = [6, 4, 8], bg = "#faf8f3" }, build, deps) {
  const api = useRef(null);
  const [state, setState] = useState("loading");   // loading | ready | failed
  useEffect(() => {
    let dead = false, cleanup = () => { };
    (async () => {
      let renderer, controls, observer, extra;
      const disposeAll = () => {
        observer?.disconnect(); controls?.dispose(); extra?.dispose?.();
        if (api.current?.scene) api.current.scene.traverse(o => { o.geometry?.dispose?.(); if (o.material) [].concat(o.material).forEach(m => m.dispose()); });
        if (renderer) { renderer.dispose(); renderer.forceContextLoss?.(); renderer.domElement.remove(); }
        api.current = null;
      };
      cleanup = disposeAll;
      try {
        const [THREE, { OrbitControls }] = await Promise.all([import("three"), import("three/addons/controls/OrbitControls.js")]);
        if (dead || !host.current) return;
        const probe = document.createElement("canvas");
        if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) throw new Error("no webgl");
        const scene = new THREE.Scene(); scene.background = new THREE.Color(bg);
        const camera = ortho ? new THREE.OrthographicCamera(-4, 4, 3, -3, 0.01, 100) : new THREE.PerspectiveCamera(40, 1, 0.01, 200);
        camera.position.set(...camPos); camera.lookAt(0, 0, 0);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.setAttribute("role", "img"); renderer.domElement.setAttribute("aria-label", "可旋转的三维场景：拖动旋转，滚轮缩放");
        host.current.appendChild(renderer.domElement);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x5a5348, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 1.8); dl.position.set(3, 6, 5); scene.add(dl);
        const render = () => { if (!dead) renderer.render(scene, camera); };
        controls = new OrbitControls(camera, renderer.domElement); controls.enablePan = true; controls.addEventListener("change", render);
        const ctx = { THREE, scene, camera, controls, render, renderer };
        extra = build(ctx) || {};
        const resize = () => {
          if (!host.current) return; const w = Math.max(260, host.current.clientWidth), h = H3D;
          renderer.setSize(w, h);
          if (ortho) { const s = extra.halfH || 3; camera.left = -s * w / h; camera.right = s * w / h; camera.top = s; camera.bottom = -s; }
          else camera.aspect = w / h;
          camera.updateProjectionMatrix(); render();
        };
        observer = new ResizeObserver(resize); observer.observe(host.current);
        api.current = { ...ctx, ...extra }; resize(); setState("ready");
      } catch { disposeAll(); if (!dead) setState("failed"); }
    })();
    return () => { dead = true; cleanup(); };
  }, deps);   // eslint-disable-line
  return [api, state];
}

// ---------------- 图 8.9：金刚石晶格与 [110] 沟道 ----------------
function diamond(n = 4) {
  const basis = [[0, 0, 0], [0, .5, .5], [.5, 0, .5], [.5, .5, 0]], pts = [];
  for (let i = -1; i <= n; i++) for (let j = -1; j <= n; j++) for (let k = -1; k <= n; k++)
    for (const b of basis) for (const o of [[0, 0, 0], [.25, .25, .25]]) {
      const p = [i + b[0] + o[0], j + b[1] + o[1], k + b[2] + o[2]];
      if (p.every(v => v >= -1e-6 && v <= n + 1e-6)) pts.push(p.map(v => v - n / 2));
    }
  const bonds = [], d2 = 3 / 16 + 1e-4;
  for (let a = 0; a < pts.length; a++) for (let b = a + 1; b < pts.length; b++) {
    const dx = pts[a][0] - pts[b][0], dy = pts[a][1] - pts[b][1], dz = pts[a][2] - pts[b][2];
    if (dx * dx + dy * dy + dz * dz < d2) bonds.push([a, b]);
  }
  return { pts, bonds };
}
const norm = v => { const l = Math.hypot(...v); return v.map(x => x / l); };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
// 旋转向量 v 绕单位轴 k 转 t 弧度
const rot = (v, k, t) => { const c = Math.cos(t), s = Math.sin(t), kv = cross(k, v), kd = dot(k, v); return v.map((x, i) => x * c + kv[i] * s + k[i] * kd * (1 - c)); };
// 倾斜 tilt° 并绕 [110] 方位旋转 rotDeg°（模拟 "随机" 方向）
function viewDir(kind, tilt, rotDeg) {
  const base = { "110": [1, 1, 0], "100": [0, 0, 1], "111": [1, 1, 1] }[kind] || [1, 1, 0];
  const d = norm(base); if (!tilt) return d;
  const perp = norm(cross(d, Math.abs(d[2]) < .9 ? [0, 0, 1] : [1, 0, 0]));
  return norm(rot(rot(d, perp, tilt * Math.PI / 180), d, rotDeg * Math.PI / 180));
}
function LatticeSVG({ data, dir }) {
  const up0 = Math.abs(dir[2]) < .9 ? [0, 0, 1] : [0, 1, 0];
  const e1 = norm(cross(up0, dir)), e2 = cross(dir, e1);
  const pr = data.pts.map(p => [dot(p, e1), dot(p, e2), dot(p, dir)]);
  const order = pr.map((_, i) => i).sort((a, b) => pr[a][2] - pr[b][2]);
  const zmin = Math.min(...pr.map(p => p[2])), zmax = Math.max(...pr.map(p => p[2]));
  const S = 52, X = u => 340 + u * S, Y = v => 180 - v * S;
  return <svg viewBox="0 0 680 360" style={{ width: "100%", display: "block", background: "#faf8f3" }} role="img" aria-label="金刚石晶格沿所选方向的正交投影">
    {data.bonds.map(([a, b], k) => <line key={k} x1={X(pr[a][0])} y1={Y(pr[a][1])} x2={X(pr[b][0])} y2={Y(pr[b][1])} stroke="#bbb" strokeWidth="1" />)}
    {order.map(i => { const t = (pr[i][2] - zmin) / (zmax - zmin || 1); return <circle key={i} cx={X(pr[i][0])} cy={Y(pr[i][1])} r="5" fill={`hsl(0,0%,${40 + 40 * t}%)`} stroke="#555" strokeWidth=".5" />; })}
  </svg>;
}
export function Lattice3D() {
  const host = useRef(null);
  const [view, setView] = useState("110");
  const data = useMemo(() => diamond(4), []);
  const dirOf = v => (v === "rand" ? viewDir("110", 7, 22) : v === "tilt" ? viewDir("110", 7, 0) : viewDir(v, 0, 0));
  const [api, st] = useThree(host, { ortho: true, camPos: dirOf("110").map(x => x * 20) }, ({ THREE, scene }) => {
    const geo = new THREE.SphereGeometry(0.085, 14, 10), mat = new THREE.MeshStandardMaterial({ color: 0x9a9a9a, roughness: .55, metalness: .1 });
    const inst = new THREE.InstancedMesh(geo, mat, data.pts.length), M = new THREE.Matrix4();
    data.pts.forEach((p, i) => { M.makeTranslation(p[0], p[1], p[2]); inst.setMatrixAt(i, M); }); scene.add(inst);
    const lp = []; data.bonds.forEach(([a, b]) => lp.push(...data.pts[a], ...data.pts[b]));
    const lg = new THREE.BufferGeometry(); lg.setAttribute("position", new THREE.Float32BufferAttribute(lp, 3));
    scene.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0x777777, transparent: true, opacity: .55 })));
    return { halfH: 2.7 };
  }, []);
  useEffect(() => {   // 视角切换：相机平滑转到所选方向
    const a = api.current; if (!a || st !== "ready") return;
    const target = dirOf(view).map(x => x * 20), start = a.camera.position.toArray(), t0 = performance.now();
    const up = Math.abs(dirOf(view)[2]) < .9 ? [0, 0, 1] : [0, 1, 0];
    let raf; const step = now => {
      const s = Math.min(1, (now - t0) / 700), e = s * s * (3 - 2 * s);
      const p = start.map((v, i) => v + (target[i] - v) * e), l = Math.hypot(...p);
      a.camera.position.set(...p.map(x => x / l * 20)); a.camera.up.set(...up); a.camera.lookAt(0, 0, 0); a.controls.update(); a.render();
      if (s < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, [view, st]);   // eslint-disable-line
  return <div>
    <Seg tex={false} options={[["110", "沿 [110] 看（沟道敞开）"], ["100", "沿 [100]"], ["111", "沿 [111]"], ["tilt", "[110] 倾斜 7°"], ["rand", "倾斜 7° + 旋转 22°（“随机”）"]]} value={view} onChange={setView} />
    <div style={{ position: "relative", minHeight: H3D }}>
      <div ref={host} style={{ width: "100%", height: st === "ready" ? H3D : 0, overflow: "hidden" }} />
      {st !== "ready" && <LatticeSVG data={data} dir={dirOf(view)} />}
    </div>
    <p style={{ fontSize: 13, textAlign: "center", margin: "4px 0" }}>{st === "failed" ? "当前环境未启用 WebGL：显示同一晶格的 SVG 正交投影（按钮同样有效）。" : st === "ready" ? "拖动旋转 · 滚轮缩放 · 右键平移；按钮把视线转到指定晶向（正交投影，便于看清沟道）" : "正在加载三维视图……"}</p>
  </div>;
}

// ---------------- §8.7：简化 BCA Monte Carlo 离子轨迹 ----------------
const MC_IONS = ["B", "P", "As", "Sb"];
function TracksSVG({ res, scale }) {
  const X = x => 340 + x * scale, Y = z => 30 + z * scale;
  return <svg viewBox="0 0 680 360" style={{ width: "100%", display: "block", background: "#faf8f3" }} role="img" aria-label="离子轨迹在 x–深度平面上的投影">
    <rect x="0" y="30" width="680" height="330" fill="#ececec" /><line x1="0" y1="30" x2="680" y2="30" stroke="#555" />
    <text x="8" y="22" fontSize="12" fill="#555">表面 z = 0（x–深度投影）</text>
    {res.tracks.map((t, i) => <polyline key={i} points={t.pts.map(p => `${X(p[0]).toFixed(1)},${Y(p[2]).toFixed(1)}`).join(" ")} fill="none" stroke={res.color} strokeOpacity=".6" strokeWidth="1" />)}
    {res.stops.map((p, i) => <circle key={"s" + i} cx={X(p[0])} cy={Y(p[2])} r="1.6" fill="#1f1b16" fillOpacity=".55" />)}
  </svg>;
}
function Histogram({ res, mom }) {
  const W = 680, H = 230, m = { l: 56, r: 14, t: 12, b: 40 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  const zs = res.stops.map(p => p[2]), zmax = Math.max(mom.Rp + 4 * mom.dRp, ...zs) * 1.02, nb = 40, bw = zmax / nb;
  const cnt = Array(nb).fill(0); zs.forEach(z => { const k = Math.min(nb - 1, Math.max(0, Math.floor(z / bw))); cnt[k]++; });
  const dens = cnt.map(c => c / (zs.length * bw)), s = P.statsZ(res.stops);
  const g = (z, mu, sd) => Math.exp(-((z - mu) ** 2) / (2 * sd * sd)) / (Math.sqrt(2 * Math.PI) * sd);
  const ymax = Math.max(...dens, g(mom.Rp, mom.Rp, mom.dRp), g(s.Rp, s.Rp, s.dRp)) * 1.1;
  const X = z => m.l + z / zmax * iw, Y = v => m.t + ih - v / ymax * ih;
  const curve = (mu, sd) => Array.from({ length: 121 }, (_, i) => { const z = zmax * i / 120; return `${i ? "L" : "M"}${X(z).toFixed(1)},${Y(g(z, mu, sd)).toFixed(1)}`; }).join("");
  const ticks = Array.from({ length: 6 }, (_, i) => Math.round(zmax * i / 5));
  return <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }} role="img" aria-label="停止深度直方图与高斯分布对照">
    <rect x={m.l} y={m.t} width={iw} height={ih} fill="none" stroke="#bbb" />
    {dens.map((d, k) => <rect key={k} x={X(k * bw) + .5} y={Y(d)} width={Math.max(0, iw / nb - 1)} height={m.t + ih - Y(d)} fill={res.color} fillOpacity=".35" />)}
    <path d={curve(mom.Rp, mom.dRp)} fill="none" stroke="#1f1b16" strokeWidth="2" strokeDasharray="7 5" />
    <path d={curve(s.Rp, s.dRp)} fill="none" stroke={res.color} strokeWidth="2" />
    {ticks.map(t => <g key={t}><line x1={X(t)} x2={X(t)} y1={m.t + ih} y2={m.t + ih + 5} stroke="#555" /><text x={X(t)} y={m.t + ih + 18} fontSize="12" textAnchor="middle">{t}</text></g>)}
    <text x={m.l + iw / 2} y={H - 4} fontSize="12" textAnchor="middle">停止深度 z [nm]</text>
    <text x="14" y={m.t + ih / 2} fontSize="12" textAnchor="middle" transform={`rotate(-90 14 ${m.t + ih / 2})`}>概率密度</text>
    <g fontSize="12"><rect x={W - 250} y="16" width="14" height="8" fill={res.color} fillOpacity=".35" /><text x={W - 230} y="24">MC 直方图</text>
      <line x1={W - 250} x2={W - 236} y1="40" y2="40" stroke={res.color} strokeWidth="2" /><text x={W - 230} y="44">同矩高斯</text>
      <line x1={W - 250} x2={W - 236} y1="58" y2="58" stroke="#1f1b16" strokeWidth="2" strokeDasharray="5 3" /><text x={W - 230} y="62">表 8.1 高斯</text></g>
  </svg>;
}
export function MonteCarlo3D() {
  const host = useRef(null);
  const [ion, setIon] = useState("P"), [E, setE] = useState(35), [nI, setNI] = useState(400), [tilt, setTilt] = useState(0);
  const [res, setRes] = useState(null), [prog, setProg] = useState(0), [seed, setSeed] = useState(7);
  // 分块模拟，避免卡住页面
  useEffect(() => {
    let dead = false; const { Z, m } = P.IONS[ion], chunk = 25, out = { stops: [], tracks: [], nBack: 0 };
    setProg(0);
    const run = k => {
      if (dead) return;
      const r = P.simulateBCA({ Z1: Z, m1: m, E0_keV: E, nIons: Math.min(chunk, nI - k), nTracks: k === 0 ? 30 : 0, tiltDeg: tilt, seed: seed * 1000 + k });
      out.stops.push(...r.stops); out.tracks.push(...r.tracks); out.nBack += r.nBack;
      const kk = k + chunk;
      if (kk < nI) { setProg(kk / nI); setTimeout(() => run(kk), 0); }
      else { setProg(1); setRes({ ...out, ion, E, tilt, color: ION_COLOR[ion] }); }
    };
    const t = setTimeout(() => run(0), 30);
    return () => { dead = true; clearTimeout(t); };
  }, [ion, E, nI, tilt, seed]);
  const mom = P.moments(ion, E);
  const L = Math.max(mom.Rp + 3.5 * mom.dRp, 20);   // 场景尺度 nm
  const [api, st] = useThree(host, { camPos: [2.2, 1.0, 3.0] }, ({ THREE, scene }) => {
    const grp = new THREE.Group(); scene.add(grp);
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.4), new THREE.MeshBasicMaterial({ color: 0x9a9a9a, transparent: true, opacity: .18, side: THREE.DoubleSide, depthWrite: false }));
    plane.rotation.x = -Math.PI / 2; plane.position.y = 0.5; scene.add(plane);
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(2.4, 1.6, 2.4)), new THREE.LineBasicMaterial({ color: 0xaaaaaa }));
    edge.position.y = -0.3; scene.add(edge);
    const beamG = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 1.2, 0), new THREE.Vector3(0, 0.5, 0)]);
    const beam = new THREE.Line(beamG, new THREE.LineBasicMaterial({ color: 0xc0392b })); scene.add(beam);
    return {
      update(r, Lnm) {
        grp.children.slice().forEach(o => { grp.remove(o); o.geometry.dispose(); o.material.dispose(); });
        const s = 1.6 / Lnm, toV = p => [p[0] * s, 0.5 - p[2] * s, p[1] * s];
        const col = new THREE.Color(r.color);
        r.tracks.forEach(t => {
          const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(t.pts.flatMap(toV), 3));
          grp.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: .75 })));
        });
        const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.Float32BufferAttribute(r.stops.flatMap(toV), 3));
        grp.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x1f1b16, size: 0.022, transparent: true, opacity: .7 })));
        const a = (r.tilt || 0) * Math.PI / 180; beamG.setFromPoints([new THREE.Vector3(-Math.sin(a) * 0.7, 0.5 + Math.cos(a) * 0.7, 0), new THREE.Vector3(0, 0.5, 0)]);
      },
    };
  }, []);
  useEffect(() => { if (res && api.current?.update && st === "ready") { api.current.update(res, L); api.current.render(); } }, [res, st]);   // eslint-disable-line
  const s = res ? P.statsZ(res.stops) : null;
  const scale2d = 300 / L;
  return <div>
    <Seg options={MC_IONS.map(k => [k, P.IONS[k].tex])} value={ion} onChange={setIon} />
    <Slider label={R`E\ [\mathrm{keV}]`} value={E} set={setE} min={5} max={200} step={1} fmt={v => v.toFixed(0)} />
    <Slider label={R`\text{离子数}`} value={nI} set={v => setNI(Math.round(v))} min={50} max={2000} log fmt={v => Math.round(v)} />
    <Slider label={R`\text{倾角}`} value={tilt} set={setTilt} min={0} max={60} step={1} fmt={v => v.toFixed(0) + "^\\circ"} />
    <div style={row}><button className="plot-reset" onClick={() => setSeed(seed + 1)}>换一组随机数重新模拟</button>
      <span style={{ fontSize: 13 }}>{prog < 1 ? `模拟中…… ${Math.round(prog * 100)}%` : `已完成 ${res?.stops.length ?? 0} 个离子（背散射 ${res?.nBack ?? 0} 个）`}</span></div>
    <div style={{ position: "relative", minHeight: H3D }}>
      <div ref={host} style={{ width: "100%", height: st === "ready" ? H3D : 0, overflow: "hidden" }} />
      {st !== "ready" && res && <TracksSVG res={res} scale={scale2d} />}
    </div>
    <p style={{ fontSize: 13, textAlign: "center", margin: "4px 0" }}>{st === "failed" ? "当前环境未启用 WebGL：显示同一组轨迹在 x–深度平面上的投影。" : st === "ready" ? "前 30 个离子画出完整轨迹，其余只画停止位置（黑点）；红线为入射束。拖动旋转 · 滚轮缩放" : "正在加载三维视图……"}</p>
    {res && <Histogram res={res} mom={mom} />}
    {s && <div style={{ fontSize: 14, lineHeight: 1.7 }}><TxI>{`**MC 统计**（${res.stops.length} 个离子）：$R_P=${s.Rp.toFixed(1)}\\,\\mathrm{nm}$，$\\Delta R_P=${s.dRp.toFixed(1)}\\,\\mathrm{nm}$，偏度 $\\gamma=${s.gamma.toFixed(2)}$，横向 $\\Delta R_{\\rm lat}=${s.dRlat.toFixed(1)}\\,\\mathrm{nm}$。**表 8.1**：$R_P=${mom.Rp.toFixed(1)}$，$\\Delta R_P=${mom.dRp.toFixed(1)}\\,\\mathrm{nm}$${mom.extrap ? "（表外外推）" : ""}。${res.tilt ? `倾角 $${res.tilt}^\\circ$ 时，非晶靶中的深度分布约按 $\\cos\\theta$ 缩短（$R_P\\cos\\theta\\approx${(mom.Rp * Math.cos(res.tilt * Math.PI / 180)).toFixed(1)}$）。` : ""}`}</TxI></div>}
  </div>;
}
