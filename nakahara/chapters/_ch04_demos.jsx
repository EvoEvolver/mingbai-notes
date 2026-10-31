// 第 4 章交互图（全部在浏览器内真算）：
//  1. WindingLab    —— 在挖去原点的平面上手画闭曲线，逐段累加转角得卷绕数（π₁(S¹)=ℤ，式 4.10）；
//                      圈的乘积 deg(α*β)=deg α+deg β，以及引理 4.2 证明中提升的直线同伦（度数不变）
//  2. DefectLab     —— 平面上的矢量场 / 指向矢场：点击放置 ±1、±1/2 缺陷，沿可拖动的圆周计算卷绕数，
//                      并给出在 S¹（超导/XY）、ℝP¹、ℝP²（三维向列相，π₁=ℤ₂）、S²（Heisenberg）中的同伦类
//  3. EdgeGroupLab  —— §4.4.2 的“游戏规则”：生成元、关系、Tietze 化简，交换化与第 3 章算法的 H₁ 对照
//  4. SkyrmionLab   —— 平面 Heisenberg 自旋的 Belavin–Polyakov 斯格明子：在紧化平面的三角剖分上
//                      用球面三角形立体角求和计算 π₂(S²) 的类（习题 4.11）
import { useMemo, useRef, useState } from "react";
import { TxI, M, RunCard, Check, Slider, Seg, Table } from "@kit";
import * as E from "./_ch04_edge.js";

const R = String.raw;
const INK = "#1f1b16", BLUE = "#2c4a6e", RED = "#9b2c1f", GOLD = "#b8862b", GREEN = "#2c6e49", MUTED = "#7a6e5a";
const TAU = 2 * Math.PI;
const wrap = (d, P = TAU) => { d = ((d % P) + P) % P; return d > P / 2 ? d - P : d; };   // 化到 (−P/2, P/2]
const Row = ({ children, gap = 16 }) => <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "flex-start" }}>{children}</div>;
const box = { background: "#fffdf8", border: "1px solid #e8e0d0", borderRadius: 6, maxWidth: "100%", touchAction: "none" };

// 闭合折线的卷绕数（绕原点）：逐段累加最小转角
export function windingAround(pts, cx = 0, cy = 0) {
  let tot = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length];
    tot += wrap(Math.atan2(y2 - cy, x2 - cx) - Math.atan2(y1 - cy, x1 - cx));
  }
  return tot / TAU;
}
// 提升：连续追踪的角度序列
function liftAngles(pts) {
  const out = [Math.atan2(pts[0][1], pts[0][0])];
  for (let i = 1; i < pts.length; i++) out.push(out[i - 1] + wrap(Math.atan2(pts[i][1], pts[i][0]) - Math.atan2(pts[i - 1][1], pts[i - 1][0])));
  return out;
}
function LiftPlot({ ang, W = 300, H = 210, color = BLUE, title }) {
  const n = ang.length; if (n < 2) return null;
  const a0 = ang[0], rel = ang.map(a => (a - a0) / TAU), lo = Math.min(-1, ...rel), hi = Math.max(1, ...rel);
  const L = 34, T = 24, B = 26, X = i => L + (W - L - 8) * i / (n - 1), Y = v => T + (H - T - B) * (hi - v) / (hi - lo || 1);
  const ticks = []; for (let k = Math.ceil(lo); k <= Math.floor(hi); k++) ticks.push(k);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={box}>
      {ticks.map(k => <g key={k}><line x1={L} x2={W - 8} y1={Y(k)} y2={Y(k)} stroke={k ? "#eee4d2" : "#c9bfa8"} /><text x={L - 4} y={Y(k) + 4} fontSize="10" textAnchor="end" fill={MUTED}>{k === 0 ? "0" : `${k} 圈`}</text></g>)}
      <polyline points={rel.map((v, i) => `${X(i)},${Y(v)}`).join(" ")} fill="none" stroke={color} strokeWidth="2" />
      <text x={(L + W) / 2} y={H - 6} fontSize="11" textAnchor="middle" fill={MUTED}>{title || "参数 s：0 → 1"}</text>
      <text x={4} y={11} fontSize="10" fill={MUTED}>提升角的增量（单位：圈）</text>
    </svg>);
}

// ============================================================
// 1. 卷绕数实验室
// ============================================================
const presetLoop = n => Array.from({ length: 240 }, (_, i) => {
  const s = i / 240;
  if (n === 0) return [1.45 + 0.35 * Math.cos(TAU * s), 0.35 * Math.sin(TAU * s)];      // 不绕洞
  const r = 1 + 0.18 * Math.sin(3 * TAU * s), th = TAU * n * s;                           // 绕洞 n 圈、带一点起伏
  return [r * Math.cos(th), r * Math.sin(th)];
});
export function WindingLab() {
  const [mode, setMode] = useState("draw");
  const [pts, setPts] = useState(() => presetLoop(1));
  const drawing = useRef(false), svg = useRef(null);
  const [n, setN] = useState(1), [m, setM] = useState(2), [t, setT] = useState(0);
  const S = 90, W = 330, H = 330, cx = W / 2, cy = H / 2;
  const toXY = e => { const r = svg.current.getBoundingClientRect(); return [((e.clientX - r.left) * W / r.width - cx) / S, -((e.clientY - r.top) * H / r.height - cy) / S]; };
  const k = useMemo(() => windingAround(pts), [pts]);
  const minR = useMemo(() => Math.min(...pts.map(([x, y]) => Math.hypot(x, y))), [pts]);
  // 乘积与同伦：α（度 n）、β（度 m），α*β 与标准圈 γ(s)=e^{2πi(n+m)s} 之间的直线同伦（在提升上插值）
  const prod = useMemo(() => {
    const N = 400, lift = [], rad = [];
    for (let i = 0; i <= N; i++) {
      const s = i / N;
      const [u, which] = s <= 0.5 ? [2 * s, 0] : [2 * s - 1, 1];
      const deg = which ? m : n, off = which ? TAU * n : 0;
      const a = off + TAU * deg * u + 0.9 * Math.sin(TAU * u) * (which ? -1 : 1);   // α、β 带一点“摆动”，但端点 u=0,1 处摆动为 0
      const r = 1 + 0.35 * Math.sin(Math.PI * u) * (which ? -0.6 : 1);
      const g = TAU * (n + m) * s;   // 标准圈的提升
      lift.push((1 - t) * a + t * g); rad.push((1 - t) * r + t * 1);
    }
    const P = lift.map((a, i) => [rad[i] * Math.cos(a), rad[i] * Math.sin(a)]);
    return { lift, P, deg: (lift[N] - lift[0]) / TAU, wind: windingAround(P.slice(0, -1)) };
  }, [n, m, t]);
  const path = P => P.map(([x, y], i) => `${i ? "L" : "M"}${cx + S * x},${cy - S * y}`).join(" ") + (mode === "draw" ? " Z" : "");
  const Hole = () => <><circle cx={cx} cy={cy} r={S * 1.95} fill="rgba(184,134,43,0.08)" stroke="#d8ccb4" /><circle cx={cx} cy={cy} r={S * 0.28} fill="#fff" stroke={INK} /><text x={cx} y={cy + 4} fontSize="11" textAnchor="middle" fill={MUTED}>洞</text></>;
  return (
    <RunCard title={R`交互图 1：卷绕数与 $\pi_1(S^1)\cong\mathbb{Z}$`}
      lead={R`平面挖去一个洞（$\mathbb{R}^2-\{0\}$，与 $S^1$ 同伦型相同，习题 4.2）。**手画模式**：按住鼠标画一条闭曲线（松开时自动闭合），程序逐段累加"相邻两点相对洞心的最小转角"——这就是 §4.3 的提升 $\tilde f$——得到卷绕数 $\deg$。**乘积模式**：选 $\deg\alpha=n$、$\deg\beta=m$，看 $\alpha*\beta$ 的提升增量恰为 $2\pi(n+m)$；拖动 $t$，按 \sref{L4.2} 证明中的直线同伦 $t\tilde g+(1-t)\tilde f$ 把 $\alpha*\beta$ 连续变成标准圈 $e^{2\pi i(n+m)s}$，卷绕数始终不变。`}>
      <Seg options={[["draw", "手画闭曲线"], ["prod", R`圈的乘积与同伦`]]} value={mode} onChange={setMode} />
      {mode === "draw" ? <>
        <Row>
          <svg ref={svg} viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ ...box, cursor: "crosshair" }}
            onPointerDown={e => { e.currentTarget.setPointerCapture?.(e.pointerId); drawing.current = true; setPts([toXY(e)]); }}
            onPointerMove={e => { if (!drawing.current) return; const p = toXY(e); setPts(q => { const l = q[q.length - 1]; return Math.hypot(p[0] - l[0], p[1] - l[1]) > 0.02 ? [...q, p] : q; }); }}
            onPointerUp={() => { drawing.current = false; }}>
            <Hole />
            {pts.length > 1 && <path d={path(pts)} fill="none" stroke={BLUE} strokeWidth="2.2" />}
            {pts.length > 0 && <circle cx={cx + S * pts[0][0]} cy={cy - S * pts[0][1]} r="4.5" fill={RED} />}
            <text x={8} y={H - 8} fontSize="11" fill={MUTED}>红点：起点（基点）。按住拖动画圈。</text>
          </svg>
          <div style={{ minWidth: 260 }}>
            <LiftPlot ang={pts.length > 1 ? liftAngles([...pts, pts[0]]) : [0, 0]} />
            <p style={{ fontSize: 20, margin: "10px 0" }}><TxI>{`$\\deg=${Math.round(k)}$`}</TxI> <span className="muted" style={{ fontSize: 13 }}>（数值 {k.toFixed(4)}）</span></p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[[1, "绕 1 圈"], [2, "绕 2 圈"], [-1, "反向 1 圈"], [0, "不绕洞"]].map(([q, l]) => <button key={q} onClick={() => setPts(presetLoop(q))}>{l}</button>)}
            </div>
          </div>
        </Row>
        <div className="chk-row" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
          <Check ok={Math.abs(k - Math.round(k)) < 1e-9} label={R`闭合曲线的总转角是 $2\pi$ 的整数倍`} />
          <Check ok={minR > 0.28} label={minR > 0.28 ? "曲线没有穿过洞" : R`曲线穿过了洞：圈不在 $\mathbb{R}^2-\{0\}$ 中`} />
        </div>
        <p className="muted" style={{ fontSize: 13 }}><TxI>{R`试一试：画一条绕洞两圈的"8 字形"以外的任意曲线，只要不碰洞，怎么扭都不改变 $\deg$；把曲线拖过洞（穿过洞心），$\deg$ 才会跳变——这就是 \figref{4.1}(a) 中 $\alpha$ 无法缩成一点的原因。`}</TxI></p>
      </> : <>
        <Row>
          <div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div><TxI>{R`$\deg\alpha=n$：`}</TxI><Seg options={[-2, -1, 0, 1, 2, 3].map(q => [q, String(q)])} value={n} onChange={setN} /></div>
              <div><TxI>{R`$\deg\beta=m$：`}</TxI><Seg options={[-2, -1, 0, 1, 2, 3].map(q => [q, String(q)])} value={m} onChange={setM} /></div>
            </div>
            <Slider label="t" value={t} min={0} max={1} step={0.01} onChange={setT} fmt={v => v.toFixed(2)} />
            <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={box}>
              <Hole />
              <path d={prod.P.map(([x, y], i) => `${i ? "L" : "M"}${cx + S * x},${cy - S * y}`).join(" ")} fill="none" stroke={t < 1e-9 ? BLUE : GREEN} strokeWidth="2" />
              <circle cx={cx + S} cy={cy} r="4.5" fill={RED} />
              <text x={8} y={H - 8} fontSize="11" fill={MUTED}>{t < 1e-9 ? "t=0：两个圈的乘积（前半时间走第一个，后半走第二个）" : t > 1 - 1e-9 ? "t=1：匀速绕 n+m 圈的标准圈" : "中间时刻：仍是基点处的圈"}</text>
            </svg>
          </div>
          <div style={{ minWidth: 260 }}>
            <LiftPlot ang={prod.lift} color={t < 1e-9 ? BLUE : GREEN} title="参数 s：前半段第一个圈，后半段第二个圈" />
            <p style={{ fontSize: 18 }}><TxI>{`$\\deg(\\alpha*\\beta)=${Math.round(prod.deg)}$，$\\ n+m=${n + m}$`}</TxI></p>
          </div>
        </Row>
        <div className="chk-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Check ok={Math.round(prod.deg) === n + m} label={R`$\deg(\alpha*\beta)=\deg\alpha+\deg\beta$`} />
          <Check ok={Math.round(prod.wind) === n + m} label={R`同伦过程中卷绕数不变（直接数转角）`} />
        </div>
      </>}
    </RunCard>);
}

// ============================================================
// 2. 缺陷实验室：矢量场 / 指向矢场
// ============================================================
const DPRESET = {
  half: { label: R`图 4.24：$+\frac12$ 向错`, mode: "nem", defs: [{ x: 0, y: 0, q: 0.5 }] },
  radial: { label: R`图 4.25：$+1$ 径向（习题 4.9）`, mode: "nem", defs: [{ x: 0, y: 0, q: 1 }] },
  merge: { label: R`两个 $+\frac12$`, mode: "nem", defs: [{ x: -1.1, y: 0, q: 0.5 }, { x: 1.1, y: 0, q: 0.5 }] },
  pair: { label: R`$+\frac12$ 与 $-\frac12$`, mode: "nem", defs: [{ x: -1.2, y: 0.2, q: 0.5 }, { x: 1.2, y: -0.2, q: -0.5 }] },
  vortex: { label: R`超导涡旋 $+1$`, mode: "vec", defs: [{ x: 0, y: 0, q: 1 }] },
  vpair: { label: R`涡旋 $+1$ 与 $+1$`, mode: "vec", defs: [{ x: -1.2, y: 0, q: 1 }, { x: 1.2, y: 0, q: 1 }] },
};
export function DefectLab() {
  const [mode, setMode] = useState("nem");
  const [defs, setDefs] = useState(DPRESET.half.defs);
  const [qSel, setQSel] = useState(0.5);
  const [th0, setTh0] = useState(0);
  const [loop, setLoop] = useState({ x: 0, y: 0, r: 1.6 });
  const [drag, setDrag] = useState(false);
  const svg = useRef(null);
  const W = 460, H = 340, S = 52, cx = W / 2, cy = H / 2, XM = W / 2 / S, YM = H / 2 / S;
  const angle = (x, y) => th0 + defs.reduce((a, d) => a + d.q * Math.atan2(y - d.y, x - d.x), 0);
  const toXY = e => { const r = svg.current.getBoundingClientRect(); return [((e.clientX - r.left) * W / r.width - cx) / S, -((e.clientY - r.top) * H / r.height - cy) / S]; };
  const res = useMemo(() => {
    const N = 720, ang = [];
    let tot = 0, near = Infinity;
    for (let i = 0; i <= N; i++) {
      const s = i / N, x = loop.x + loop.r * Math.cos(TAU * s), y = loop.y + loop.r * Math.sin(TAU * s);
      defs.forEach(d => { near = Math.min(near, Math.hypot(x - d.x, y - d.y)); });
      const a = angle(x, y);
      if (i) tot += wrap(a - ang[ang.length - 1].raw, mode === "nem" ? Math.PI : TAU);
      ang.push({ raw: a, lift: tot });
    }
    const k = tot / TAU, enclosed = defs.filter(d => Math.hypot(d.x - loop.x, d.y - loop.y) < loop.r).reduce((a, d) => a + d.q, 0);
    return { k, enclosed, near, lift: ang.map(a => a.lift) };
  }, [defs, loop, th0, mode]);
  const okVec = mode === "nem" || defs.every(d => Number.isInteger(d.q));
  const kR = Math.round(res.k * 2) / 2;
  const glyphs = [];
  for (let gx = -XM + 0.35; gx < XM; gx += 0.42) for (let gy = -YM + 0.35; gy < YM; gy += 0.42) {
    if (defs.some(d => Math.hypot(gx - d.x, gy - d.y) < 0.12)) continue;
    const a = angle(gx, gy), L = 0.16, dx = L * Math.cos(a), dy = L * Math.sin(a);
    const x1 = cx + S * (gx - dx), y1 = cy - S * (gy - dy), x2 = cx + S * (gx + dx), y2 = cy - S * (gy + dy);
    glyphs.push(mode === "nem"
      ? <line key={gx + "," + gy} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      : <g key={gx + "," + gy}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="1.5" /><circle cx={x2} cy={y2} r="2.2" fill={INK} /></g>);
  }
  const click = e => {
    if (drag) return;
    const [x, y] = toXY(e);
    const hit = defs.findIndex(d => Math.hypot(d.x - x, d.y - y) < 0.25);
    if (hit >= 0) setDefs(defs.filter((_, i) => i !== hit));
    else if (mode === "nem" || Number.isInteger(qSel)) setDefs([...defs, { x, y, q: qSel }]);
  };
  const setPreset = p => { setMode(DPRESET[p].mode); setDefs(DPRESET[p].defs); setQSel(DPRESET[p].mode === "nem" ? 0.5 : 1); setLoop({ x: 0, y: 0, r: 1.6 }); };
  const kTex = q => (Number.isInteger(q) ? String(q) : (q < 0 ? "-" : "") + R`\tfrac{${Math.abs(q * 2)}}{2}`);
  return (
    <RunCard title={R`交互图 2：序参量场的拓扑缺陷与 $\pi_1(M)$`}
      lead={R`场的方向角 $\theta(\boldsymbol{x})=\theta_0+\sum_kq_k\arg(\boldsymbol{x}-\boldsymbol{x}_k)$。**点击空白处**放置所选荷 $q$ 的缺陷，**点击缺陷**删除；**拖动绿圈的圆心**移动测量圈。程序沿绿圈取 720 个点，逐段累加相邻两点之间的最小转角——对矢量取模 $2\pi$，对**无头尾的指向矢**取模 $\pi$（因为 $\boldsymbol{n}\sim-\boldsymbol{n}$）——得到卷绕数 $k$，再按序参量空间 $M$ 给出同伦类。`}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <Seg options={[["vec", R`矢量（$M=S^1$）`], ["nem", R`指向矢（向列相）`]]} value={mode} onChange={v => { setMode(v); if (v === "vec") { setDefs(defs.filter(d => Number.isInteger(d.q))); if (!Number.isInteger(qSel)) setQSel(1); } }} />
        <span>放置的荷 <TxI>{R`$q$`}</TxI>：</span>
        <Seg options={(mode === "nem" ? [-1, -0.5, 0.5, 1] : [-1, 1, 2]).map(q => [q, `$${kTex(q)}$`])} value={qSel} onChange={setQSel} />
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "6px 0" }}>
        {Object.keys(DPRESET).map(p => <button key={p} onClick={() => setPreset(p)}><TxI>{DPRESET[p].label}</TxI></button>)}
        <button onClick={() => setDefs([])}>清空</button>
      </div>
      <Row>
        <svg ref={svg} viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ ...box, cursor: "pointer" }} onClick={click}
          onPointerMove={e => { if (!drag) return; const [x, y] = toXY(e); setLoop(l => ({ ...l, x, y })); }}
          onPointerUp={() => setTimeout(() => setDrag(false), 0)}>
          {glyphs}
          <circle cx={cx + S * loop.x} cy={cy - S * loop.y} r={S * loop.r} fill="none" stroke={GREEN} strokeWidth="2.5" strokeDasharray="7 4" />
          <circle cx={cx + S * loop.x} cy={cy - S * loop.y} r="7" fill={GREEN} style={{ cursor: "move" }}
            onPointerDown={e => { e.stopPropagation(); e.currentTarget.ownerSVGElement.setPointerCapture?.(e.pointerId); setDrag(true); }} onClick={e => e.stopPropagation()} />
          {defs.map((d, i) => <g key={i}><circle cx={cx + S * d.x} cy={cy - S * d.y} r="9" fill={d.q > 0 ? RED : BLUE} opacity="0.85" />
            <text x={cx + S * d.x} y={cy - S * d.y + 4} fontSize="10" textAnchor="middle" fill="#fff" fontWeight="bold">{d.q > 0 ? "+" : "−"}{Number.isInteger(d.q) ? Math.abs(d.q) : "½"}</text></g>)}
        </svg>
        <div style={{ minWidth: 250, maxWidth: 330 }}>
          <Slider label={R`测量圈半径`} value={loop.r} min={0.3} max={3} step={0.05} onChange={r => setLoop(l => ({ ...l, r }))} fmt={v => v.toFixed(2)} />
          <Slider label={R`$\theta_0$（整体转动）`} value={th0} min={0} max={6.28} step={0.02} onChange={setTh0} fmt={v => v.toFixed(2)} />
          <LiftPlot ang={res.lift} W={300} H={150} color={GREEN} title="沿测量圈一周" />
          <p style={{ fontSize: 18, margin: "6px 0" }}><TxI>{`卷绕数 $k=${kTex(kR)}$`}</TxI></p>
          <Table head={[R`序参量空间 $M$`, "同伦类"]} rows={mode === "vec" ? [
            [R`$S^1=\mathrm{U}(1)$（超导、超流 $^4$He、XY 自旋）`, R`$${kTex(kR)}\in\pi_1(S^1)=\mathbb{Z}$`],
            [R`$S^2$（Heisenberg 自旋，允许转出平面）`, R`$0\in\pi_1(S^2)=\{e\}$：可以消除`],
          ] : [
            [R`$\sym{RP}{\RP^1}$（指向矢限制在平面内）`, R`$${Math.round(2 * kR)}\in\pi_1(\sym{RP}{\RP^1})=\mathbb{Z}$（以半圈为单位）`],
            [R`$\sym{RP}{\RP^2}$（三维向列相，\eqref{4.32}）`, R`$${((Math.round(2 * kR) % 2) + 2) % 2}\in\pi_1(\sym{RP}{\RP^2})=\mathbb{Z}_2$${Math.round(2 * kR) % 2 ? "：稳定向错" : "：可以“逃逸到第三维”而消除"}`],
          ]} />
        </div>
      </Row>
      <div className="chk-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={Math.abs(res.k - kR) < 1e-6} label={mode === "nem" ? R`总转角是 $\pi$ 的整数倍` : R`总转角是 $2\pi$ 的整数倍`} />
        <Check ok={Math.abs(kR - res.enclosed) < 1e-6} label={R`$k=\sum(\text{圈内缺陷的荷})=${kTex(Math.round(res.enclosed * 2) / 2)}$`} />
        <Check ok={res.near > 0.08} label={res.near > 0.08 ? "测量圈远离所有缺陷芯" : "测量圈压到了缺陷芯：序参量无定义"} />
        {!okVec && <Check ok={false} label="矢量场不允许半整数荷" />}
      </div>
      <p className="muted" style={{ fontSize: 13 }}><TxI>{R`读法：在指向矢模式下选"图 4.25：$+1$ 径向"，平面内 $k=1$，但三维向列相中它属于 $\pi_1(\sym{RP}{\RP^2})$ 的平凡类——指向矢可以在芯附近逐渐竖起来（转向 $z$ 方向）而把奇点消除，这就是习题 4.9 的"$1+1=0$"。选"两个 $+\frac12$"并把测量圈放大到同时包住两者，$k=\frac12+\frac12=1$：两条稳定向错合并后变得不稳定。把测量圈只包住一个 $+\frac12$，类为 $1\in\mathbb{Z}_2$：这条线（\figref{4.24}）不能被消除。`}</TxI></p>
    </RunCard>);
}

// ============================================================
// 3. 边群计算器
// ============================================================
const vlab = (item, v) => (item.vname ? item.vname(v) : String(v));
const gTex = (item, [a, b]) => `g_{${vlab(item, a).replace(/^v_?/, "").replace(/^p_/, "") || "v"}${vlab(item, b).replace(/^v_?/, "").replace(/^p_/, "")}}`;
function wordTex(w, names) {
  if (!w.length) return "1";
  const out = []; let i = 0;
  while (i < w.length) { let j = i; while (j < w.length && w[j] === w[i]) j++; const p = (j - i) * (w[i] > 0 ? 1 : -1); out.push(names[Math.abs(w[i])] + (p === 1 ? "" : `^{${p}}`)); i = j; }
  return out.join("");
}
export function EdgeGroupLab() {
  const [id, setId] = useState("torus");
  const [useBook, setUseBook] = useState(true);
  const item = E.BOOK.find(b => b.id === id);
  const r = useMemo(() => E.run(item, useBook), [id, useBook]);
  const gname = (k) => {   // 显示名：保留的生成元用 x,y,z，其他用 g_{ij}
    const gi = r.S.gens.indexOf(k);
    if (gi >= 0 && r.S.gens.length <= 3) return ["x", "y", "z"][gi];
    return gTex(item, r.E.gens[k - 1]);
  };
  const names = ["", ...r.E.gens.map((_, i) => gname(i + 1))];
  const grpTex = (free, tor) => { const p = []; if (free === 1) p.push(R`\mathbb{Z}`); else if (free > 1) p.push(Array(free).fill(R`\mathbb{Z}`).join(R`\oplus`)); tor.forEach(k => p.push(R`\mathbb{Z}_{${k}}`)); return p.length ? p.join(R`\oplus`) : R`\{0\}`; };
  const pres = `(${r.S.gens.map(k => names[k]).join(",") || ""};${r.S.rels.length ? r.S.rels.map(w => wordTex(w, names)).join(",") : R`\emptyset`})`;
  const same = r.ab.free === r.h.free && JSON.stringify(r.ab.torsion) === JSON.stringify(r.h.torsion);
  const relRows = r.E.rels.map(rel => {
    const [i, j, k] = rel.tri, L = r.E.inL, k2 = (a, b) => (a < b ? a + "," + b : b + "," + a);
    const show = (a, b) => (L.has(k2(a, b)) ? R`\underset{1}{${gTex(item, [a, b])}}` : gTex(item, [a, b]));
    return [R`$\langle ${[i, j, k].map(v => vlab(item, v)).join("")}\rangle$`, R`$${show(i, j)}\,${show(j, k)}=${show(i, k)}$`, `$${wordTex(rel.word, names)}=1$`];
  });
  const nL = r.L.length;
  return (
    <RunCard title={R`交互图 3：多面体的基本群——"游戏规则"计算器`}
      lead={R`选一个复形。程序按 §4.4.2 的规则 (1)–(5)：取子复形 $L$（原书图中的阴影区/粗线，或程序自动求的极大树）；对 $K-L$ 的每条棱 $\langle v_iv_j\rangle$（$i<j$）引入 $g_{ij}$；每个 2 单形给关系 $g_{ij}g_{jk}=g_{ik}$（$L$ 中的棱记为 1，下标标 1）；再用 **Tietze 变换**（某生成元在某关系中只出现一次，就用该关系解出它并代入其余关系）化简。最后把关系的指数和排成整数矩阵，用第 3 章的 Smith 标准形求交换化 $\pi_1/F$，并与第 3 章算法**独立**算出的 $H_1(K)$ 对照（\sref{T4.9}）。`}>
      <Seg options={E.BOOK.map(b => [b.id, b.label])} value={id} onChange={setId} />
      <div style={{ margin: "6px 0" }}>
        <Seg options={[[true, R`原书的 $L$`], [false, R`自动极大树`]]} value={useBook && !!item.L} onChange={v => setUseBook(v)} />
        <span className="muted" style={{ fontSize: 13, marginLeft: 8 }}>出处：<TxI>{item.src}</TxI>{!item.L && "（原书未指定 L，用极大树）"}</span>
      </div>
      <p><TxI>{R`顶点 $${item.K.verts.length}$ 个，棱 $${item.K.edges.length}$ 条，三角形 $${item.K.tris.length}$ 个；$L$ 含 $${nL}$ 条棱 ⇒ **生成元 $${r.E.gens.length}$ 个，关系 $${r.E.rels.length}$ 个**。`}</TxI></p>
      {relRows.length > 0 && <details open={relRows.length <= 10}><summary>逐个 2 单形的关系（共 {relRows.length} 个）</summary>
        <Table head={["2 单形", R`$g_{ij}g_{jk}=g_{ik}$`, "作为关系子"]} rows={relRows} /></details>}
      {r.S.log.length > 0 && <details><summary>Tietze 消元记录（{r.S.log.length} 步）</summary>
        <ol style={{ fontSize: 14 }}>{r.S.log.map((s, i) => <li key={i}><TxI>{`$${names[s.k]}=${wordTex(s.expr, names)}$`}</TxI></li>)}</ol></details>}
      <p style={{ fontSize: 18, margin: "8px 0" }}><TxI>{`$\\pi_1\\cong G(K;L)\\cong${pres}$`}</TxI></p>
      <p className="muted"><TxI>{R`原书结果：$${item.expect}$`}</TxI></p>
      <Table head={["", "结果"]} rows={[
        [R`交换化 $\pi_1/F$（关系矩阵的 Smith 标准形）`, `$${grpTex(r.ab.free, r.ab.torsion)}$`],
        [R`第 3 章算法：$H_1(K)=\ker\partial_1/\operatorname{im}\partial_2$`, `$${grpTex(r.h.free, r.h.torsion)}$`],
      ]} />
      <div className="chk-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={same} label={R`$\pi_1/F\cong H_1$（定理 4.9）`} />
        <Check ok={r.E.gens.length - r.E.rels.length === 1 - (item.K.verts.length - item.K.edges.length + item.K.tris.length)} label={R`生成元数 − 关系数 $=1-\chi(K)$`} />
      </div>
      {id === "klein" && <p className="muted" style={{ fontSize: 13 }}><TxI>{R`程序给出的关系子 $xy^{-1}xy$ 与原书的 $xyxy^{-1}$ 等价：前者说 $y^{-1}xy=x^{-1}$，后者说 $yxy^{-1}=x^{-1}$；对后者两边用 $y^{-1}$ 共轭，并注意 $x\mapsto x^{-1}$ 是对合，即得前者。`}</TxI></p>}
      {!useBook || !item.L ? <p className="muted" style={{ fontSize: 13 }}><TxI>{R`换用不同的 $L$，生成元与关系的个数会变（差值不变），但化简后的群同构——这正是 \sref{T4.8} 说"$G(K;L)$ 与 $L$ 的选取无关"的意思。`}</TxI></p> : null}
    </RunCard>);
}

// ============================================================
// 4. 斯格明子：π₂(S²) 的类
// ============================================================
// w(z)：k>0 时 (λ/z)^k，k<0 时 (λ/ z̄)^{|k|}；m = (2 Re w, 2 Im w, 1−|w|²)/(1+|w|²)，|x|→∞ 时 m→ẑ
function mAt(x, y, k, lam, gam) {
  if (k === 0) return [0, 0, 1];
  const r = Math.hypot(x, y); if (r === 0) return [0, 0, -1];
  const ph = Math.atan2(y, x), mod = Math.pow(lam / r, Math.abs(k)), arg = -k * ph + gam;   // (λ/z)^k 的辐角 −kφ；共轭时 +|k|φ
  const wr = mod * Math.cos(arg), wi = mod * Math.sin(arg), w2 = mod * mod;
  return [2 * wr / (1 + w2), 2 * wi / (1 + w2), (1 - w2) / (1 + w2)];
}
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
// 球面三角形 (a,b,c) 的有向立体角（Van Oosterom–Strackee）
const solid = (a, b, c) => 2 * Math.atan2(dot(a, cross(b, c)), 1 + dot(a, b) + dot(b, c) + dot(c, a));
export function SkyrmionLab() {
  const [k, setK] = useState(1), [lam, setLam] = useState(1), [gam, setGam] = useState(0);
  const Q = useMemo(() => {
    // 紧化平面 = 球面：极坐标网格 r = λ tan(πρ/2)，ρ∈[0,1]；ρ=0 为原点，ρ=1 为无穷远点（m=ẑ）
    const NR = 120, NP = 160; let tot = 0;
    const P = (i, j) => { const rho = i / NR; if (i === NR) return [0, 0, 1]; const r = lam * Math.tan(Math.PI * rho / 2), ph = TAU * j / NP; return mAt(r * Math.cos(ph), r * Math.sin(ph), k, lam, gam); };
    for (let i = 0; i < NR; i++) for (let j = 0; j < NP; j++) {
      const a = P(i, j), b = P(i + 1, j), c = P(i + 1, j + 1), d = P(i, j + 1);
      tot += solid(a, b, c) + solid(a, c, d);
    }
    return tot / (4 * Math.PI);
  }, [k, lam, gam]);
  const W = 400, H = 400, S = 48, cx = W / 2, cy = H / 2, arrows = [];
  for (let gx = -3.75; gx <= 3.8; gx += 0.5) for (let gy = -3.75; gy <= 3.8; gy += 0.5) {
    const m = mAt(gx, gy, k, lam, gam), L = 0.42 * S;
    const col = m[2] > 0 ? `rgba(44,74,110,${0.35 + 0.65 * m[2]})` : `rgba(155,44,31,${0.35 - 0.65 * m[2]})`;
    const x1 = cx + S * gx - L * m[0] / 2, y1 = cy - S * gy + L * m[1] / 2, x2 = cx + S * gx + L * m[0] / 2, y2 = cy - S * gy - L * m[1] / 2;
    arrows.push(<g key={gx + "," + gy}><circle cx={cx + S * gx} cy={cy - S * gy} r={3 + 3 * Math.abs(m[2])} fill={col} />
      {Math.hypot(m[0], m[1]) > 0.08 && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="1.6" />}
      {Math.hypot(m[0], m[1]) > 0.08 && <circle cx={x2} cy={y2} r="2" fill={INK} />}</g>);
  }
  return (
    <RunCard title={R`交互图 4：平面 Heisenberg 铁磁体的斯格明子与 $\pi_2(S^2)\cong\mathbb{Z}$`}
      lead={R`位形 $\boldsymbol{m}=(2\,\mathrm{Re}\,w,\,2\,\mathrm{Im}\,w,\,1-|w|^2)/(1+|w|^2)$，$w=(\lambda/z)^k$（$k<0$ 时用 $\bar z$），$z=x+iy$。$|\boldsymbol{x}|\to\infty$ 时 $\boldsymbol{m}\to\boldsymbol{e}_z$（\eqref{4.75}），平面紧化为 $S^2$。程序在紧化平面的 $120\times160$ 网格三角剖分上把每个小三角形的像（球面三角形）的有向立体角加起来，除以 $4\pi$，得到拓扑荷 $Q=\frac1{4\pi}\int\boldsymbol{m}\cdot(\partial_x\boldsymbol{m}\times\partial_y\boldsymbol{m})\,\dd x\,\dd y$。箭头：面内分量；圆点颜色：蓝 $m_z>0$，红 $m_z<0$。`}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <span><TxI>{R`$k$：`}</TxI></span><Seg options={[-2, -1, 0, 1, 2, 3].map(q => [q, String(q)])} value={k} onChange={setK} />
        <span className="muted" style={{ fontSize: 13 }}>习题 4.11 要求的类：<button onClick={() => setK(-1)}>−1</button> <button onClick={() => setK(2)}>+2</button></span>
      </div>
      <Row>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={box}>{arrows}</svg>
        <div style={{ minWidth: 240 }}>
          <Slider label={R`尺度 $\lambda$`} value={lam} min={0.2} max={2.5} step={0.05} onChange={setLam} fmt={v => v.toFixed(2)} />
          <Slider label={R`面内整体转角 $\gamma$`} value={gam} min={0} max={6.28} step={0.02} onChange={setGam} fmt={v => v.toFixed(2)} />
          <p style={{ fontSize: 20 }}><TxI>{`$Q=${Q.toFixed(4)}$`}</TxI></p>
          <p className="muted" style={{ fontSize: 13 }}><TxI>{R`改变 $\lambda$（大小）与 $\gamma$（面内转动）都是连续形变，$Q$ 纹丝不动；只有换 $k$（另一个同伦类）它才跳变。$\lambda\to0$ 时斯格明子缩成一点，场在原点变得奇异——要把它"消掉"必须经过奇点，这就是拓扑稳定性。`}</TxI></p>
        </div>
      </Row>
      <div className="chk-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Check ok={Math.abs(Q - Math.round(Q)) < 1e-6} label={R`$Q$ 是整数`} />
        <Check ok={Math.round(Q) === k} label={R`$Q=k$：位形属于 $\pi_2(S^2)$ 的类 $k$`} />
      </div>
    </RunCard>);
}
