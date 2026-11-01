// 第 9 章自写的交互模拟器（浏览器内真算）：
//  EtchProfileSim —— 二维刻蚀轮廓演化（水平集，线性组合模型）
//  BoschSim       —— Bosch 工艺交替钝化/刻蚀动画（扇贝侧壁，示意几何 + 真实速率换算）
//  CosNPolar      —— (cos θ)^n 入射角分布（式 9.12）
//  CmpSim         —— Preston 方程 + 图形密度–台阶高度模型的 CMP 平坦化
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { M } from "@kit";
import { MAT } from "./_ch09_figs.jsx";

const R = String.raw;
const panel = { background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 10, padding: "12px 14px", margin: "0.6em 0" };
const grid2 = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "4px 18px" };
const statBox = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 6, fontSize: 13, marginTop: 8 };
const stat = { background: "#fff", border: "1px solid #e4dfd3", borderRadius: 6, padding: "4px 8px" };
const btn = on => ({ padding: "4px 12px", borderRadius: 6, border: `1px solid ${on ? "#3b6fb6" : "#bcb6a9"}`, background: on ? "#e2eef7" : "#fffdf8", cursor: "pointer", fontSize: 13 });

function Slider({ label, value, min, max, step, onChange, fmt = v => v, log = false }) {
  const toS = v => (log ? Math.log(v) : v), fromS = s => (log ? Math.exp(s) : s);
  return <label style={{ display: "block", fontSize: 13 }}>
    <span><M>{label}</M> = <b>{fmt(value)}</b></span>
    <input type="range" min={toS(min)} max={toS(max)} step={log ? (toS(max) - toS(min)) / 200 : step} value={toS(value)}
      onChange={e => onChange(+fromS(+e.target.value).toPrecision(6))} style={{ width: "100%" }} />
  </label>;
}
function usePlayer(n, speed = 60) {
  const [i, setI] = useState(n - 1), [play, setPlay] = useState(false);
  useEffect(() => { setI(n - 1); setPlay(false); }, [n]);
  useEffect(() => {
    if (!play) return;
    let raf, last = 0;
    const tick = ts => { if (ts - last > speed) { last = ts; setI(k => { if (k >= n - 1) { setPlay(false); return k; } return k + 1; }); } raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [play, n, speed]);
  return { i, setI, play, toggle: () => { if (!play && i >= n - 1) setI(0); setPlay(!play); } };
}

// =====================================================================
// 1. 刻蚀轮廓演化模拟器（水平集）
// 无量纲：膜厚 H = 1，平坦底面的纵向刻蚀速率 r_vert = 1 → 刚好刻穿时间 t = 1。
// 速度：F = fac·[(1−A)·|∇φ|_Godunov + A·vis·max(D⁻_z φ, 0)]；φ>0 为固体。
// 材料因子 fac：膜 1、掩模 1/S_mask、下层 1/S_sub。vis：该点上方同一列没有固体（离子竖直入射、被遮挡）。
// =====================================================================
const LX = 2.2, Z0 = -0.5, Z1 = 2.0, DX = 0.025, HM = 0.35;
const NX = Math.round(2 * LX / DX) + 1, NZ = Math.round((Z1 - Z0) / DX) + 1;
const gx = i => -LX + i * DX, gz = j => Z0 + j * DX;
function segDist(px, pz, ax, az, bx, bz) {
  const vx = bx - ax, vz = bz - az, t = Math.max(0, Math.min(1, ((px - ax) * vx + (pz - az) * vz) / (vx * vx + vz * vz)));
  return Math.hypot(px - ax - t * vx, pz - az - t * vz);
}
export function simulateEtch({ A, w, oe, Smask, Ssub, frames = 36 }) {
  const n = NX * NZ, phi = new Float32Array(n), fac = new Float32Array(n), nxt = new Float32Array(n);
  const poly = [[-LX - 1, -HM], [-w / 2, -HM], [-w / 2, 0], [w / 2, 0], [w / 2, -HM], [LX + 1, -HM]];
  for (let j = 0; j < NZ; j++) for (let i = 0; i < NX; i++) {
    const x = gx(i), z = gz(j), k = j * NX + i;
    const solid = z >= 0 || (z >= -HM && Math.abs(x) >= w / 2);
    let d = 1e9; for (let s = 0; s < poly.length - 1; s++) d = Math.min(d, segDist(x, z, ...poly[s], ...poly[s + 1]));
    phi[k] = solid ? d : -d;
    fac[k] = z < 0 ? 1 / Smask : z >= 1 ? 1 / Ssub : 1;
  }
  const levels = [...new Set(fac)].sort((a, b) => b - a);
  const tEnd = 1 + oe, dt = 0.45 * DX, steps = Math.ceil(tEnd / dt), h = tEnd / steps;
  const out = [{ t: 0, phi: phi.slice() }], every = Math.max(1, Math.round(steps / frames));
  const first = new Int32Array(NX) /* 每列可见区下界 */, ext = new Float32Array(n), seen = new Uint8Array(n), queue = new Int32Array(n), RI = 1 - A, RA = A;
  for (let s = 1; s <= steps; s++) {
    // 速度延拓：材料因子取"正在被刻的固体"——真空格点用多源 BFS 继承最近固体格点的因子
    let qh = 0, qt = 0;
    seen.fill(0);
    for (const fv of levels) for (let k = 0; k < n; k++) if (phi[k] > 0 && fac[k] === fv) { ext[k] = fv; seen[k] = 1; queue[qt++] = k; }   // 等距时优先刻得快的材料
    while (qh < qt) { const k = queue[qh++], i = k % NX; for (const kk of [i > 0 ? k - 1 : -1, i < NX - 1 ? k + 1 : -1, k - NX, k + NX]) if (kk >= 0 && kk < n && !seen[kk]) { seen[kk] = 1; ext[kk] = ext[k]; queue[qt++] = kk; } }
    // 每列"第一段连续固体"的下端：其下方（隔着空腔）的点被上方固体遮挡，竖直离子打不到
    for (let i = 0; i < NX; i++) { let j = 0; while (j < NZ && phi[j * NX + i] <= 0) j++; while (j < NZ && phi[j * NX + i] > 0) j++; first[i] = j; }
    for (let j = 0; j < NZ; j++) for (let i = 0; i < NX; i++) {
      const k = j * NX + i, p = phi[k];
      // 边界上线性外推（避免零梯度边界"压平"φ）
      const pL = i > 0 ? phi[k - 1] : 2 * p - phi[k + 1], pR = i < NX - 1 ? phi[k + 1] : 2 * p - phi[k - 1];
      const pU = j > 0 ? phi[k - NX] : 2 * p - phi[k + NX], pD = j < NZ - 1 ? phi[k + NX] : 2 * p - phi[k - NX];
      const dxm = (p - pL) / DX, dxp = (pR - p) / DX, dzm = (p - pU) / DX, dzp = (pD - p) / DX;
      const g = Math.sqrt(Math.max(dxm, 0) ** 2 + Math.min(dxp, 0) ** 2 + Math.max(dzm, 0) ** 2 + Math.min(dzp, 0) ** 2);
      const vis = j < first[i] ? 1 : 0;
      nxt[k] = p - h * ext[k] * (RI * g + RA * vis * Math.max(dzm, 0));
    }
    phi.set(nxt);
    if (s % every === 0 || s === steps) out.push({ t: s * h, phi: phi.slice() });
  }
  return out;
}
// 沿一行/一列找 φ 的零点
function rowCross(phi, z, x0, x1) { // 在高度 z 从 x0 走向 x1，返回第一次进入固体的位置
  const j = Math.round((z - Z0) / DX), dir = x1 > x0 ? 1 : -1;
  let i = Math.round((x0 + LX) / DX); const iEnd = Math.round((x1 + LX) / DX);
  for (; i !== iEnd; i += dir) { const a = phi[j * NX + i], b = phi[j * NX + i + dir]; if (a <= 0 && b > 0) return gx(i) + dir * DX * a / (a - b); }
  return NaN;
}
function colDepth(phi, x) { const i = Math.round((x + LX) / DX); for (let j = 0; j < NZ - 1; j++) { const a = phi[j * NX + i], b = phi[(j + 1) * NX + i]; if (j > 0 && a <= 0 && b > 0 && gz(j) > -0.05) return gz(j) + DX * a / (a - b); } return NaN; }
function maskTop(phi) { const i = NX - 4; for (let j = 0; j < NZ - 1; j++) { const a = phi[j * NX + i], b = phi[(j + 1) * NX + i]; if (a <= 0 && b > 0) return gz(j) + DX * a / (a - b); } return NaN; }

function EtchCanvas({ phi, w }) {
  const ref = useRef(null), W = 660, Hh = Math.round(W * (Z1 - Z0) / (2 * LX));
  useEffect(() => {
    const cv = ref.current; if (!cv) return; const ctx = cv.getContext("2d"), img = ctx.createImageData(W, Hh), d = img.data;
    const col = { mask: [185, 162, 220], film: [191, 224, 245], sub: [189, 189, 189], vac: [255, 255, 255] };
    for (let py = 0; py < Hh; py++) {
      const z = Z0 + (py + 0.5) / Hh * (Z1 - Z0), fj = (z - Z0) / DX, j0 = Math.min(NZ - 2, Math.floor(fj)), tj = fj - j0;
      for (let px = 0; px < W; px++) {
        const x = -LX + (px + 0.5) / W * 2 * LX, fi = (x + LX) / DX, i0 = Math.min(NX - 2, Math.floor(fi)), ti = fi - i0, k = j0 * NX + i0;
        const v = (phi[k] * (1 - ti) + phi[k + 1] * ti) * (1 - tj) + (phi[k + NX] * (1 - ti) + phi[k + NX + 1] * ti) * tj;
        const c = v <= 0 ? col.vac : z < 0 ? col.mask : z < 1 ? col.film : col.sub, o = (py * W + px) * 4;
        const edge = Math.abs(v) < 0.6 * DX;
        d[o] = edge ? 40 : c[0]; d[o + 1] = edge ? 42 : c[1]; d[o + 2] = edge ? 46 : c[2]; d[o + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    // 原始掩模边缘与膜/下层界面
    const X = x => (x + LX) / (2 * LX) * W, Y = z => (z - Z0) / (Z1 - Z0) * Hh;
    ctx.setLineDash([5, 4]); ctx.strokeStyle = "#c0392b"; ctx.lineWidth = 1.2;
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(X(s * w / 2), Y(-HM)); ctx.lineTo(X(s * w / 2), Y(1)); ctx.stroke(); }
    ctx.strokeStyle = "#555"; ctx.beginPath(); ctx.moveTo(0, Y(1)); ctx.lineTo(W, Y(1)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "#333"; ctx.font = "12px system-ui"; ctx.fillText("掩模", 6, Y(-HM / 2) + 4); ctx.fillText("被刻薄膜（厚 H）", 6, Y(0.5)); ctx.fillText("下层（停止层）", 6, Y(1.4));
  }, [phi, w, Hh]);
  return <canvas ref={ref} width={W} height={Hh} style={{ width: "100%", maxWidth: W, display: "block", margin: "0 auto", border: "1px solid #ddd" }} />;
}

export function EtchProfileSim({ init = {}, note }) {
  const [A, setA] = useState(init.A ?? 0.5), [w, setW] = useState(init.w ?? 1.0), [oe, setOe] = useState(init.oe ?? 0.3);
  const [Sm, setSm] = useState(init.Sm ?? 20), [Ss, setSs] = useState(init.Ss ?? 50);
  const key = useDeferredValue(JSON.stringify({ A, w, oe, Sm, Ss })), q = JSON.parse(key);
  const frames = useMemo(() => simulateEtch({ A: q.A, w: q.w, oe: q.oe, Smask: q.Sm, Ssub: q.Ss }), [key]);
  const pl = usePlayer(frames.length, 70), f = frames[Math.min(pl.i, frames.length - 1)];
  const xe = rowCross(f.phi, 0.04, q.w / 2 - 0.02, LX - 0.1), under = xe - q.w / 2;
  const depth = colDepth(f.phi, 0), mt = maskTop(f.phi);
  const xb = depth > 0.15 ? rowCross(f.phi, Math.min(depth, 1) - 0.06, 0, LX - 0.1) : NaN;
  const pct = v => (100 * v).toFixed(0) + "%", f2 = v => (Number.isFinite(v) ? v.toFixed(2) : "—");
  return <div style={panel}>
    <div style={grid2}>
      <Slider label={R`A`} value={A} min={0} max={1} step={0.01} onChange={setA} fmt={v => v.toFixed(2)} />
      <Slider label={R`\text{开口宽度}/H`} value={w} min={0.3} max={2.4} step={0.05} onChange={setW} fmt={v => v.toFixed(2)} />
      <Slider label={R`\text{过刻}`} value={oe} min={0} max={1.5} step={0.05} onChange={setOe} fmt={pct} />
      <Slider label={R`S_{\text{膜/掩模}}`} value={Sm} min={1} max={100} log onChange={setSm} fmt={v => v.toFixed(1)} />
      <Slider label={R`S_{\text{膜/下层}}`} value={Ss} min={1} max={200} log onChange={setSs} fmt={v => v.toFixed(1)} />
      <label style={{ fontSize: 13 }}>时间 <M>{R`t/t_{\rm clear}`}</M> = <b>{f.t.toFixed(2)}</b>
        <input type="range" min={0} max={frames.length - 1} value={pl.i} onChange={e => pl.setI(+e.target.value)} style={{ width: "100%" }} />
        <button style={btn(pl.play)} onClick={pl.toggle}>{pl.play ? "暂停" : "▶ 播放演化"}</button></label>
    </div>
    <EtchCanvas phi={f.phi} w={q.w} />
    <div style={statBox}>
      <div style={stat}>纵向深度（中心）：<b>{f2(depth)}</b> H</div>
      <div style={stat}>掩模下钻蚀（每边）：<b>{f2(under)}</b> H<br /><span style={{ color: "#777" }}>理论 <M>{R`(1-A)\,t`}</M> = {((1 - q.A) * f.t).toFixed(2)} H</span></div>
      <div style={stat}>顶部线宽损失 <M>{R`2\times`}</M>钻蚀：<b>{f2(2 * under)}</b> H</div>
      <div style={stat}>底部开口半宽：<b>{f2(xb)}</b> H（掩模半宽 {(q.w / 2).toFixed(2)}）</div>
      <div style={stat}>剩余掩模厚度：<b>{f2(-mt)}</b> / {HM} H</div>
      <div style={stat}>由剖面量出的 <M>{R`A`}</M>（1 − 钻蚀/深度，刻穿前）：<b>{depth > 0.05 && depth < 0.97 ? f2(1 - under / depth) : "—"}</b></div>
    </div>
    <p style={{ fontSize: 12.5, color: "#666", margin: "8px 0 0" }}>{note || "模型（简化）：线性组合模型（式 9.14 的思想）——各向同性分量 (1−A) 沿表面法向推进，定向分量 A 竖直向下且只作用于上方无遮挡的表面；掩模、下层的速率分别除以选择比。用水平集方程 (9.11) 在 177 列、101 行的网格上求解（一阶 Godunov 迎风格式；掩模角处的数值扩散使钻蚀比理论值偏小约 5–10%）。未计离子散射、粒子再发射、再沉积与充电。红色虚线为原始掩模边缘。"}</p>
  </div>;
}

// =====================================================================
// 2. Bosch 工艺动画
// =====================================================================
export function BoschSim() {
  const [te, setTe] = useState(4), [tp, setTp] = useState(2), [rv, setRv] = useState(6), [ratio, setRatio] = useState(0.5), [wid, setWid] = useState(3), [Nc, setNc] = useState(24);
  const b = rv * te / 60, a = ratio * b;                 // 每周期纵向步长 b（µm）、扇贝横向幅度 a（µm）
  const per = 3, total = Nc * per;                        // 每个周期 3 帧阶段：钝化 / 清底 / 刻蚀
  const [k, setK] = useState(total), [play, setPlay] = useState(false);
  useEffect(() => { setK(total); setPlay(false); }, [total]);
  useEffect(() => {
    if (!play) return; let raf, last = 0;
    const tick = ts => { if (ts - last > 160) { last = ts; setK(v => { if (v >= total) { setPlay(false); return v; } return v + 1; }); } raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [play, total]);
  const done = Math.floor(k / per), phase = k % per;      // 已完成周期数；当前阶段 0=钝化 1=清底 2=刻蚀
  const depthFull = Nc * b, scale = Math.min(300 / Math.max(depthFull + 1.5 * b, wid * 1.8), 60), W = 560, Hp = 340, cx = W / 2, top = 30;
  const X = x => cx + x * scale, Y = z => top + z * scale;
  const wallPts = side => {
    const pts = [[side * wid / 2, 0]]; const nEtched = done + (phase === 2 ? 1 : 0);
    for (let c = 0; c < nEtched; c++) for (let s = 1; s <= 16; s++) { const u = s / 16, z = (c + u) * b, xx = side * (wid / 2 + a * Math.sin(Math.PI * u)); pts.push([xx, z]); }
    return pts;
  };
  const nEt = done + (phase === 2 ? 1 : 0), D = nEt * b;
  const L = wallPts(-1), Rr = wallPts(1);
  const hole = [...L, ...[...Rr].reverse()].map(([x, z]) => `${X(x).toFixed(1)},${Y(z).toFixed(1)}`).join(" ");
  const showPoly = phase === 0 || phase === 1 || k === 0;
  const polyPts = side => wallPts(side).map(([x, z]) => `${X(x - side * 0.0).toFixed(1)},${Y(z).toFixed(1)}`).join(" ");
  const tCycle = te + tp, avg = b / tCycle * 60;
  const phaseName = k >= total ? "完成" : ["① 钝化：C4F8 等离子体沉积碳氟聚合物", "② 离子轰击清除槽底钝化层", "③ SF₆ 各向同性刻蚀 Si"][phase];
  return <div style={panel}>
    <div style={grid2}>
      <Slider label={R`t_{\text{刻蚀}}\ (\mathrm{s})`} value={te} min={1} max={12} step={0.5} onChange={setTe} />
      <Slider label={R`t_{\text{钝化}}\ (\mathrm{s})`} value={tp} min={0.5} max={6} step={0.5} onChange={setTp} />
      <Slider label={R`r_{\rm vert}\ (\mu\mathrm{m/min})`} value={rv} min={1} max={15} step={0.5} onChange={setRv} />
      <Slider label={R`r_{\rm lat}/r_{\rm vert}`} value={ratio} min={0.2} max={1} step={0.05} onChange={setRatio} />
      <Slider label={R`\text{开口宽度}\ (\mu\mathrm{m})`} value={wid} min={1} max={10} step={0.5} onChange={setWid} />
      <Slider label={R`\text{循环数}`} value={Nc} min={1} max={60} step={1} onChange={setNc} />
    </div>
    <div style={{ display: "flex", gap: 10, alignItems: "center", margin: "6px 0" }}>
      <button style={btn(play)} onClick={() => { if (!play && k >= total) setK(0); setPlay(!play); }}>{play ? "暂停" : "▶ 播放循环"}</button>
      <input type="range" min={0} max={total} value={k} onChange={e => setK(+e.target.value)} style={{ flex: 1 }} />
      <span style={{ fontSize: 13, minWidth: 220 }}>第 {Math.min(done + 1, Nc)} / {Nc} 周期 · {phaseName}</span>
    </div>
    <svg viewBox={`0 0 ${W} ${Hp}`} style={{ width: "100%", maxWidth: W, display: "block", margin: "0 auto", fontFamily: "system-ui", fontSize: 12 }}>
      <rect x={20} y={top} width={W - 40} height={Hp - top - 10} fill={MAT.si} stroke={MAT.siDark} />
      <polygon points={hole} fill="#fff" stroke="#444" strokeWidth="1" />
      {phase === 2 && k < total && <path d={`M${X(-wid / 2)},${Y(D - b)} L${X(wid / 2)},${Y(D - b)}`} stroke="#c0392b" strokeDasharray="4 3" />}
      {showPoly && <><polyline points={polyPts(-1)} fill="none" stroke={MAT.poly} strokeWidth="4" opacity="0.85" /><polyline points={polyPts(1)} fill="none" stroke={MAT.poly} strokeWidth="4" opacity="0.85" />
        {phase === 0 && k < total && <line x1={X(-wid / 2)} y1={Y(D)} x2={X(wid / 2)} y2={Y(D)} stroke={MAT.poly} strokeWidth="4" />}</>}
      {phase === 1 && k < total && Array.from({ length: 5 }, (_, i) => { const x = X(-wid / 2 + wid * (i + 0.5) / 5); return <line key={i} x1={x} y1={top - 20} x2={x} y2={Y(D) - 4} stroke="#c0392b" strokeWidth="1.5" markerEnd="url(#ch09-arR)" />; })}
      <rect x={20} y={top - 12} width={X(-wid / 2) - 20} height={12} fill="url(#ch09-hatch)" stroke={MAT.resistEdge} />
      <rect x={X(wid / 2)} y={top - 12} width={W - 20 - X(wid / 2)} height={12} fill="url(#ch09-hatch)" stroke={MAT.resistEdge} />
      <text x={W - 30} y={Hp - 18} textAnchor="end" fill="#333">比例尺：{(50 / scale).toFixed(2)} µm</text>
      <line x1={W - 30 - 50} y1={Hp - 32} x2={W - 30} y2={Hp - 32} stroke="#333" strokeWidth="2" />
    </svg>
    <div style={statBox}>
      <div style={stat}>每周期纵向步长 <M>{R`b=r_{\rm vert}t_{\text{刻蚀}}`}</M>：<b>{(b * 1000).toFixed(0)} nm</b></div>
      <div style={stat}>扇贝横向幅度 <M>{R`a`}</M>：<b>{(a * 1000).toFixed(0)} nm</b></div>
      <div style={stat}>当前深度：<b>{D.toFixed(2)} µm</b>，深宽比 <b>{(D / wid).toFixed(1)}</b></div>
      <div style={stat}>平均刻蚀速率（含钝化时间）：<b>{avg.toFixed(2)} µm/min</b></div>
    </div>
    <p style={{ fontSize: 12.5, color: "#666", margin: "8px 0 0" }}>示意模型：每个刻蚀步在槽底刻出纵向 <M>{R`b`}</M>、横向幅度 <M>{R`a=(r_{\rm lat}/r_{\rm vert})\,b`}</M> 的半椭圆扇贝；钝化层保护此前的侧壁，离子只清除槽底的钝化层。缩短刻蚀步能减小扇贝，但钝化步占时比例上升、平均速率下降——这正是原书所说的"扇贝深浅取决于切换时间"的权衡。</p>
  </div>;
}

// =====================================================================
// 3. (cos θ)^n 极坐标图（式 9.12、图 9.30）
// =====================================================================
export function CosNPolar() {
  const [n, setN] = useState(3);
  const W = 560, Hh = 300, cx = W / 2, cy = 270, Rr = 240;
  const curve = m => { const p = []; for (let k = 0; k <= 180; k++) { const th = (-90 + k) * Math.PI / 180, r = m === 0 ? 1 : Math.pow(Math.max(Math.cos(th), 0), m); p.push(`${(cx + Rr * r * Math.sin(th)).toFixed(1)},${(cy - Rr * r * Math.cos(th)).toFixed(1)}`); } return p.join(" "); };
  const hwhm = n > 0 ? Math.acos(Math.pow(2, -1 / n)) * 180 / Math.PI : 90, within = d => 1 - Math.pow(Math.cos(d * Math.PI / 180), n + 1);
  return <div style={panel}>
    <Slider label={R`n`} value={n} min={0} max={100} log={false} step={1} onChange={setN} />
    <svg viewBox={`0 0 ${W} ${Hh}`} style={{ width: "100%", maxWidth: W, display: "block", margin: "0 auto", fontFamily: "system-ui", fontSize: 12 }}>
      {[0.2, 0.4, 0.6, 0.8, 1].map(r => <path key={r} d={`M${cx - Rr * r},${cy} A${Rr * r},${Rr * r} 0 0 1 ${cx + Rr * r},${cy}`} fill="none" stroke="#e2ddd0" />)}
      {[-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75].map(d => { const t = d * Math.PI / 180; return <g key={d}><line x1={cx} y1={cy} x2={cx + Rr * Math.sin(t)} y2={cy - Rr * Math.cos(t)} stroke="#eee8da" /><text x={cx + (Rr + 12) * Math.sin(t)} y={cy - (Rr + 12) * Math.cos(t) + 4} textAnchor="middle" fill="#888">{d}°</text></g>; })}
      <line x1={cx - Rr - 10} y1={cy} x2={cx + Rr + 10} y2={cy} stroke="#555" />
      {[1, 2, 3].map(m => <polyline key={m} points={curve(m)} fill="none" stroke="#bbb" strokeDasharray="3 3" />)}
      <polyline points={curve(n)} fill="rgba(192,57,43,0.12)" stroke="#c0392b" strokeWidth="2.5" />
      <text x={cx + 6} y={cy - Rr * 0.2 + 14} fill="#888">0.2</text><text x={cx + 6} y={cy - Rr + 14} fill="#888">1.0</text>
      <text x={cx} y={cy + 20} textAnchor="middle" fill="#333">晶圆表面（法线向上）；灰虚线：n = 1, 2, 3</text>
    </svg>
    <div style={statBox}>
      <div style={stat}>半高半宽 <M>{R`\theta_{1/2}=\arccos 2^{-1/n}`}</M>：<b>{hwhm.toFixed(1)}°</b></div>
      <div style={stat}>落在 ±10° 内的通量比例：<b>{(100 * within(10)).toFixed(1)}%</b></div>
      <div style={stat}>落在 ±30° 内的通量比例：<b>{(100 * within(30)).toFixed(1)}%</b></div>
    </div>
    <p style={{ fontSize: 12.5, color: "#666", margin: "8px 0 0" }}>曲线为归一化的 <M>{R`F/F_0=(\cos\theta)^n`}</M>。比例按"单位立体角通量 <M>{R`\propto\cos^n\theta`}</M>"在半空间积分：<M>{R`1-\cos^{n+1}\theta_0`}</M>。<M>{R`n=0`}</M> 为半圆（各方向相同），<M>{R`n=1`}</M> 为理想余弦（中性粒子），<M>{R`n\approx50`}</M> 时离子几乎全部落在 ±15° 以内。</p>
  </div>;
}

// =====================================================================
// 4. CMP：Preston 方程 + 图形密度–台阶高度模型
// 凸起区受压 P/ρ（台阶高于接触高度 h_c 时凹陷区不受压）；h < h_c 后压力线性重新分配：
//   P_down = P(1 − h/h_c)，P_up = P[1 + (1−ρ)h/(ρ h_c)] ⇒ dh/dt = −K h/(ρ h_c)，K = K_p P V。
// =====================================================================
function cmpLevels(t, K, rho, h0, hc, zd0) {
  const t1 = h0 > hc ? rho * (h0 - hc) / K : 0;
  if (t <= t1) return { up: zd0 + h0 - K * t / rho, down: zd0, h: h0 - K * t / rho };
  const hs = Math.min(h0, hc), tau = t - t1, e = Math.exp(-K * tau / (rho * hc)), h = hs * e;
  const down = zd0 - K * tau + rho * hc * (hs / hc) * (1 - e);
  return { up: down + h, down, h };
}
export function CmpSim() {
  const [Kp, setKp] = useState(1.0), [Ppsi, setP] = useState(5), [rpm, setRpm] = useState(60), [r1, setR1] = useState(0.25), [r2, setR2] = useState(0.75), [hc, setHc] = useState(200), [t, setT] = useState(1.5);
  const h0 = 500, zd0 = 800, rad = 0.15;                        // 台阶高 500 nm；凹陷区氧化物 800 nm；晶圆中心到台中心 0.15 m
  const V = 2 * Math.PI * rad * rpm / 60, P = Ppsi * 6895, K = Kp * 1e-13 * P * V * 6e10; // nm/min
  const tMax = 4, L1 = cmpLevels(t, K, r1, h0, hc, zd0), L2 = cmpLevels(t, K, r2, h0, hc, zd0);
  const W = 640, Hc = 200, base = 185, sc = 0.12;               // 截面：1 nm = 0.12 px
  const region = (x0, rho, L) => { const per = 40, els = []; for (let x = x0; x < x0 + 280; x += per) { const wu = rho * per; els.push(<rect key={"m" + x} x={x + (per - wu) / 2} y={base - 500 * sc} width={wu} height={500 * sc} fill={MAT.metal} />); }
    const path = []; for (let x = x0; x < x0 + 280; x += per) { const wu = rho * per, a = x + (per - wu) / 2, b = a + wu; path.push(`L${a},${base - L.down * sc} L${a},${base - L.up * sc} L${b},${base - L.up * sc} L${b},${base - L.down * sc} L${x + per},${base - L.down * sc}`); }
    return <g>{<path d={`M${x0},${base} L${x0},${base - L.down * sc} ${path.join(" ")} L${x0 + 280},${base} Z`} fill={MAT.ox} stroke={MAT.oxEdge} />}{els}</g>; };
  // 时间曲线
  const PW = 640, PH = 190, px = s => 50 + s / tMax * 570, py = z => 170 - (z - 200) / 1200 * 150;
  const series = (rho, key) => Array.from({ length: 121 }, (_, i) => { const s = i / 120 * tMax; const L = cmpLevels(s, K, rho, h0, hc, zd0); return `${i ? "L" : "M"}${px(s).toFixed(1)},${py(L[key]).toFixed(1)}`; }).join(" ");
  const tPlan = rho => (h0 > hc ? rho * (h0 - hc) / K : 0) + rho * hc / K * Math.log(Math.min(h0, hc) / 10);   // 台阶降到 10 nm 的时间
  return <div style={panel}>
    <div style={grid2}>
      <Slider label={R`K_{\rm p}\ (10^{-13}\,\mathrm{Pa^{-1}})`} value={Kp} min={0.2} max={3} step={0.05} onChange={setKp} />
      <Slider label={R`P\ (\mathrm{psi})`} value={Ppsi} min={1} max={8} step={0.1} onChange={setP} />
      <Slider label={R`\text{抛光台转速 (rpm)}`} value={rpm} min={20} max={120} step={1} onChange={setRpm} />
      <Slider label={R`\rho_1\ \text{（左区图形密度）}`} value={r1} min={0.05} max={0.95} step={0.01} onChange={setR1} />
      <Slider label={R`\rho_2\ \text{（右区图形密度）}`} value={r2} min={0.05} max={0.95} step={0.01} onChange={setR2} />
      <Slider label={R`h_{\rm c}\ (\mathrm{nm})`} value={hc} min={50} max={500} step={10} onChange={setHc} />
      <Slider label={R`t\ (\mathrm{min})`} value={t} min={0} max={tMax} step={0.02} onChange={setT} />
    </div>
    <div style={statBox}>
      <div style={stat}>相对速度 <M>{R`V`}</M>：<b>{V.toFixed(2)} m/s</b></div>
      <div style={stat}>覆盖膜去除速率 <M>{R`\mathrm{RR}=K_{\rm p}PV`}</M>：<b>{K.toFixed(0)} nm/min</b></div>
      <div style={stat}>左区台阶 <M>{R`h_1`}</M>：<b>{L1.h.toFixed(0)} nm</b>（DOP {(1 - L1.h / h0).toFixed(2)}）</div>
      <div style={stat}>右区台阶 <M>{R`h_2`}</M>：<b>{L2.h.toFixed(0)} nm</b>（DOP {(1 - L2.h / h0).toFixed(2)}）</div>
      <div style={stat}>两区凸起面高度差（片内不均匀）：<b>{Math.abs(L1.up - L2.up).toFixed(0)} nm</b></div>
      <div style={stat}>台阶降到 10 nm 用时：左 <b>{tPlan(r1).toFixed(2)}</b> / 右 <b>{tPlan(r2).toFixed(2)}</b> min</div>
    </div>
    <svg viewBox={`0 0 ${W} ${Hc}`} style={{ width: "100%", maxWidth: W, display: "block", margin: "8px auto 0", fontFamily: "system-ui", fontSize: 12 }}>
      <rect x={20} y={base} width={600} height={12} fill={MAT.si} />
      {region(20, r1, L1)}{region(340, r2, L2)}
      <line x1={20} y1={base - (zd0 + h0) * sc} x2={620} y2={base - (zd0 + h0) * sc} stroke="#999" strokeDasharray="4 3" />
      <text x={160} y={16} textAnchor="middle">左区 ρ₁ = {r1.toFixed(2)}</text><text x={480} y={16} textAnchor="middle">右区 ρ₂ = {r2.toFixed(2)}</text>
      <text x={624} y={base - (zd0 + h0) * sc + 4} fontSize="11" fill="#888">t=0 顶面</text>
    </svg>
    <svg viewBox={`0 0 ${PW} ${PH}`} style={{ width: "100%", maxWidth: PW, display: "block", margin: "4px auto 0", fontFamily: "system-ui", fontSize: 11 }}>
      <line x1={50} y1={170} x2={620} y2={170} stroke="#333" /><line x1={50} y1={170} x2={50} y2={15} stroke="#333" />
      {[0, 1, 2, 3, 4].map(s => <text key={s} x={px(s)} y={184} textAnchor="middle">{s}</text>)}<text x={620} y={164} textAnchor="end">t (min)</text>
      {[400, 800, 1200].map(z => <text key={z} x={44} y={py(z) + 4} textAnchor="end">{z}</text>)}<text x={54} y={22}>表面高度 (nm)</text>
      <path d={series(r1, "up")} stroke="#c0392b" fill="none" strokeWidth="2" /><path d={series(r1, "down")} stroke="#c0392b" fill="none" strokeDasharray="5 4" />
      <path d={series(r2, "up")} stroke="#2c4a6e" fill="none" strokeWidth="2" /><path d={series(r2, "down")} stroke="#2c4a6e" fill="none" strokeDasharray="5 4" />
      <line x1={px(t)} y1={15} x2={px(t)} y2={170} stroke="#999" />
      <text x={600} y={40} textAnchor="end" fill="#c0392b">左区：实线 凸起 / 虚线 凹陷</text><text x={600} y={56} textAnchor="end" fill="#2c4a6e">右区：实线 凸起 / 虚线 凹陷</text>
    </svg>
    <p style={{ fontSize: 12.5, color: "#666", margin: "8px 0 0" }}>模型（简化，非原书内容）：图形密度–台阶高度模型。台阶高于接触高度 <M>{R`h_{\rm c}`}</M> 时抛光垫只压在凸起上，凸起区压力 <M>{R`P/\rho`}</M>、凹陷区不受压；台阶低于 <M>{R`h_{\rm c}`}</M> 后压力按台阶线性重新分配，台阶按 <M>{R`e^{-Kt/\rho h_{\rm c}}`}</M> 指数衰减。局部去除速率一律用 Preston 方程。金属线（金色）高 500 nm，凹陷区氧化物初始 800 nm。</p>
  </div>;
}
