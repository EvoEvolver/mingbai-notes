// 第 8 章专属图解：「PLR 翻转器」。
// 网格上选一个大/小三和弦，点 P / L / R：三角形沿对应的边翻到相邻三角形（两个共同音不动，一个音走半音或全音），同时听到前后两个和弦。
// 复合变换 S / N / Y / H 逐步翻转；每一步都记入「变换串」，可整串播放；另有 PL（六和弦）、PR（八和弦）、LR（二十四和弦）循环自动演示。
import { useEffect, useRef, useState } from "react";
import { play, sequence, stop, later, onStop, useAudioState, mod12 } from "@kit/audio";

const U = 56, H = U * Math.sqrt(3) / 2;
const I0 = -7, I1 = 7, J0 = -2, J1 = 2;                       // 可见格点范围（i 沿五度横线，j 向右上 = 大三度）
const pcAt = (i, j) => mod12(7 * i + 4 * j);
const xy = (i, j) => [(i + j / 2) * U, -j * H];
const NAME = ["C", "D♭", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
const SNAME = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
const MNAME = ["Cm", "C♯m", "Dm", "E♭m", "Em", "Fm", "F♯m", "Gm", "G♯m", "Am", "B♭m", "Bm"];
// 三角形：{ m:false, i, j } 大三 = (i,j) 根、(i+1,j) 五、(i,j+1) 三；{ m:true, i, j } 小三 = (i,j+1) 根、(i+1,j+1) 五、(i+1,j) 三
const verts = t => (t.m ? [[t.i, t.j + 1], [t.i + 1, t.j], [t.i + 1, t.j + 1]] : [[t.i, t.j], [t.i, t.j + 1], [t.i + 1, t.j]]);   // 顺序：根、三、五
const rootOf = t => (t.m ? pcAt(t.i, t.j + 1) : pcAt(t.i, t.j));
const nameOf = t => (t.m ? MNAME : NAME)[rootOf(t)];
const pcsOf = t => verts(t).map(([i, j]) => pcAt(i, j));
// 三种基本翻转（见原书图 8.1）
const STEP = {
  P: t => (t.m ? { m: false, i: t.i, j: t.j + 1 } : { m: true, i: t.i, j: t.j - 1 }),
  R: t => (t.m ? { m: false, i: t.i + 1, j: t.j } : { m: true, i: t.i - 1, j: t.j }),
  L: t => (t.m ? { m: false, i: t.i, j: t.j } : { m: true, i: t.i, j: t.j }),
};
// 复合变换：字母从右往左执行（RL(C) = 先 L 再 R）
const OPS = [
  { k: "P", name: "P 平行", seq: "P", tip: "三音移动半音：同名大小和弦", short: "三音 ±半音" },
  { k: "L", name: "L 导音", seq: "L", tip: "大三的根音下行半音 / 小三的五音上行半音", short: "根↓半音 / 五↑半音" },
  { k: "R", name: "R 关系", seq: "R", tip: "大三的五音上行全音 / 小三的根音下行全音", short: "五↑全音 / 根↓全音" },
  { k: "S", name: "S 同中音", seq: "LPR", tip: "= LPR：三音不动，根音、五音同时移动半音" },
  { k: "N", name: "N", seq: "PLR", tip: "= PLR：大三 → 小下属，小三 → 大属" },
  { k: "Y", name: "Y", seq: "PRL", tip: "= PRL：大三 → 小属，小三 → 大下属" },
  { k: "H", name: "H 六声极", seq: "PLP", tip: "= PLP：六和弦循环的对极，没有共同音" },
];
const DEMOS = [
  { k: "PL", ops: "PL", n: 6, name: "PL 交替 · 六和弦循环", note: "P、L 交替六步回到起点：根音走出一条大三度循环（原书称北/东/南/西方循环）。" },
  { k: "PR", ops: "PR", n: 8, name: "PR 交替 · 八和弦循环", note: "P、R 交替八步回到起点：根音走出一条小三度循环（巴托克轴心的一条轴）。" },
  { k: "LR", ops: "LR", n: 24, name: "LR 交替 · 二十四和弦", note: "L、R 交替要走完全部 24 个大小三和弦才回家：沿五度圈下行，每两步换一个关系大小调。" },
];

// 把三角形挪回视野中央（网格是循环的：(0,3) 与 (4,-1) 平移后音名完全相同）
function recenter(t) {
  let di = 0, dj = 0;
  for (let k = 0; k < 8; k++) {
    const vs = verts({ ...t, i: t.i + di, j: t.j + dj }), cx = vs.reduce((a, [i, j]) => a + i + j / 2, 0) / 3, cj = vs.reduce((a, [, j]) => a + j, 0) / 3;
    if (cj > 1.1) dj -= 3; else if (cj < -1.1) dj += 3;
    else if (cx > 3.6) { di -= 4; dj += 1; } else if (cx < -3.6) { di += 4; dj -= 1; }
    else break;
  }
  return [di, dj];
}
const dirText = d => (d > 0 ? "上行" : "下行") + (Math.abs(d) === 1 ? "半音" : Math.abs(d) === 2 ? "全音" : Math.abs(d) + " 个半音");
// 声部：只移动变化的那个音，走最近的距离；跑出音域就整体移八度
function moveVoices(v, from, to) {
  const a = pcsOf(from), b = pcsOf(to), gone = a.find(p => !b.includes(p)), come = b.find(p => !a.includes(p));
  let d = mod12(come - gone); if (d > 6) d -= 12;
  let out = v.map(m => (mod12(m) === gone ? m + d : m));
  if (Math.max(...out) > 81) out = out.map(m => m - 12); if (Math.min(...out) < 50) out = out.map(m => m + 12);
  return { voices: out, gone, come, d };
}
const closeVoices = t => { const r = 60 + rootOf(t) - (rootOf(t) > 7 ? 12 : 0); return pcsOf(t).map((p, k) => r + mod12(p - rootOf(t))); };

export default function PLRFlipper() {
  useAudioState();
  const [, force] = useState(0);
  const S = useRef(null);
  if (!S.current) { const t0 = { m: false, i: 0, j: 0 }; S.current = { cur: t0, chain: [{ t: t0, name: "C", voices: closeVoices(t0), op: null }], anim: null, info: null, busy: false, playIdx: -1, demo: null }; }
  const s = S.current, rerender = () => force(x => x + 1);
  const raf = useRef(0);
  useEffect(() => onStop(() => { s.busy = false; s.demo = null; s.playIdx = -1; rerender(); }), []); // eslint-disable-line
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // 翻转动画：共同的两个顶点不动，第三个顶点越过公共边落到新位置
  const animate = (from, to, ms) => new Promise(res => {
    const A = verts(from).map(v => xy(...v)), B0 = verts(to).map(v => xy(...v));
    const key = p => p.map(Math.round).join(",");
    const shared = A.filter(p => B0.some(q => key(q) === key(p)));
    const a3 = A.find(p => !shared.some(q => key(q) === key(p))), b3 = B0.find(p => !shared.some(q => key(q) === key(p)));
    const t0 = performance.now();
    const tick = now => {
      const u = Math.min(1, (now - t0) / ms), e = u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2;
      s.anim = { pts: [...shared, [a3[0] + (b3[0] - a3[0]) * e, a3[1] + (b3[1] - a3[1]) * e]], minor: e < 0.5 ? from.m : to.m };
      rerender();
      if (u < 1) raf.current = requestAnimationFrame(tick); else { s.anim = null; res(); }
    };
    raf.current = requestAnimationFrame(tick);
  });
  const shiftAll = () => {
    const [di, dj] = recenter(s.cur); if (!di && !dj) return;
    const sh = t => ({ ...t, i: t.i + di, j: t.j + dj });
    s.cur = sh(s.cur); s.chain = s.chain.map(c => ({ ...c, t: sh(c.t) }));
  };
  // 执行一个（可能是复合的）变换
  const apply = async (op, { sound = "pair", ms = 420 } = {}) => {
    if (s.busy && sound !== "demo") return;
    const steps = op.seq.split("").reverse();
    const start = s.cur, v0 = s.chain[s.chain.length - 1].voices;
    if (sound !== "demo") { stop(); s.busy = true; s.demo = null; }
    let t = start, v = v0, last = null;
    for (const k of steps) {
      const nt = STEP[k](t);
      last = moveVoices(v, t, nt); v = last.voices;
      await animate(t, nt, steps.length > 1 ? ms * 0.7 : ms);
      s.cur = nt; shiftAll(); t = s.cur; rerender();
    }
    const common = pcsOf(start).filter(p => pcsOf(t).includes(p));
    const moved = v0.map((m, k) => [m, v[k]]).filter(([a, b]) => a !== b);
    s.info = { op, from: nameOf(start), to: nameOf(t), common, moved };
    s.chain = [...s.chain, { t, name: nameOf(t), voices: v, op: op.k }].slice(-40);
    if (sound === "pair") { sequence([{ notes: v0 }, { notes: v }], { gap: 0.85 }); s.busy = false; }
    else if (sound === "demo") play(v, { dur: 0.9 });
    rerender();
  };
  const reset = t => { stop(); const tt = { ...t }; s.cur = tt; s.chain = [{ t: tt, name: nameOf(tt), voices: closeVoices(tt), op: null }]; s.info = null; s.busy = false; s.demo = null; shiftAll(); play(s.chain[0].voices, { arp: 0.03, dur: 1.4 }); rerender(); };
  const runDemo = d => {
    reset(s.cur); s.demo = d.k; s.busy = true; rerender();
    const gap = d.n > 10 ? 650 : 850;
    for (let k = 0; k < d.n; k++) {
      const ch = d.ops[k % 2];
      later(() => { if (s.demo === d.k) apply(OPS.find(o => o.k === ch), { sound: "demo", ms: 360 }); }, 700 + k * gap);
    }
    later(() => { if (s.demo === d.k) { s.demo = null; s.busy = false; s.info = { demo: d }; play(s.chain[s.chain.length - 1].voices, { arp: 0.04, dur: 1.6 }); rerender(); } }, 700 + d.n * gap + 300);
  };
  const playChain = () => {
    stop(); s.busy = false;
    sequence(s.chain.map(c => ({ notes: c.voices })), { gap: 0.8, onStep: i => { s.playIdx = i; rerender(); } });
  };
  const undo = () => { if (s.chain.length < 2 || s.busy) return; stop(); s.chain = s.chain.slice(0, -1); s.cur = s.chain[s.chain.length - 1].t; s.info = null; shiftAll(); rerender(); };

  // ── 绘制 ──
  const nodes = [];
  for (let j = J0; j <= J1; j++) for (let i = I0 - Math.ceil(j / 2); i <= I1 - Math.floor(j / 2); i++) nodes.push({ i, j, pc: pcAt(i, j), p: xy(i, j) });
  const has = (i, j) => nodes.some(n => n.i === i && n.j === j);
  const tris = [];
  for (const n of nodes) for (const m of [false, true]) { const t = { m, i: n.i, j: n.j }; if (verts(t).every(v => has(...v))) tris.push(t); }
  const xs = nodes.map(n => n.p[0]), ys = nodes.map(n => n.p[1]), pad = 24;
  const vb = [Math.min(...xs) - pad, Math.min(...ys) - pad, Math.max(...xs) - Math.min(...xs) + 2 * pad, Math.max(...ys) - Math.min(...ys) + 2 * pad];
  const ctr = t => { const ps = verts(t).map(v => xy(...v)); return [(ps[0][0] + ps[1][0] + ps[2][0]) / 3, (ps[0][1] + ps[1][1] + ps[2][1]) / 3]; };
  const cur = s.cur, curPts = s.anim ? s.anim.pts : verts(cur).map(v => xy(...v)), curMinor = s.anim ? s.anim.minor : cur.m;
  const info = s.info, common = info && info.common ? new Set(info.common) : null;
  const curV = verts(cur).map(v => v.join(","));
  const trail = s.chain.slice(-13);
  const playT = s.playIdx >= 0 ? s.chain[s.playIdx] : null;
  const SP = info && info.op && /♯/.test(info.from + info.to) ? SNAME : NAME;
  const roleOf = pc => { const r = rootOf(cur); return pc === r ? "根" : mod12(pc - r) === 7 ? "五" : "三"; };

  return <div className="card">
    <div className="au-ctrl">
      <span className="au-lab">基本变换</span>
      {OPS.slice(0, 3).map(o => <button key={o.k} title={o.tip} disabled={s.busy} onClick={() => apply(o)}><b>{o.name}</b><small>{o.short}</small></button>)}
      <span className="au-lab" style={{ marginLeft: 8 }}>复合</span>
      {OPS.slice(3).map(o => <button key={o.k} title={o.tip} disabled={s.busy} onClick={() => apply(o)}><b>{o.name}</b><small>{o.seq}</small></button>)}
    </div>
    <svg viewBox={vb.join(" ")} style={{ width: "100%", display: "block", userSelect: "none" }}>
      {tris.map(t => <polygon key={(t.m ? "m" : "M") + t.i + "," + t.j} points={verts(t).map(v => xy(...v).join(",")).join(" ")}
        fill={t.m ? "#2c4a6e0d" : "#9b2c1f0d"} style={{ cursor: s.busy ? "default" : "pointer" }} onClick={() => !s.busy && reset(t)}><title>{nameOf(t)}（点击设为起点）</title></polygon>)}
      {nodes.flatMap(n => [[1, 0], [0, 1], [-1, 1]].map(([di, dj], k) => has(n.i + di, n.j + dj) &&
        <line key={n.i + "," + n.j + k} x1={n.p[0]} y1={n.p[1]} x2={xy(n.i + di, n.j + dj)[0]} y2={xy(n.i + di, n.j + dj)[1]} stroke="#cfc7b8" strokeDasharray={k ? "4 4" : null} />))}
      {trail.length > 1 && <polyline points={trail.map(c => ctr(c.t).join(",")).join(" ")} fill="none" stroke="var(--gold)" strokeWidth="3" strokeDasharray="2 5" strokeLinecap="round" opacity=".9" />}
      {trail.slice(0, -1).map((c, k) => <circle key={"tr" + k} cx={ctr(c.t)[0]} cy={ctr(c.t)[1]} r="4" fill="var(--gold)" opacity=".7" />)}
      {playT && <polygon points={verts(playT.t).map(v => xy(...v).join(",")).join(" ")} fill="none" stroke="var(--gold)" strokeWidth="5" />}
      <polygon points={curPts.map(p => p.join(",")).join(" ")} fill={curMinor ? "#5d82b3" : "#d4574a"} stroke={curMinor ? "#1d3554" : "#7a1d12"} strokeWidth="2.5" opacity=".92" style={{ pointerEvents: "none" }} />
      {!s.anim && <text x={ctr(cur)[0]} y={ctr(cur)[1] + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" style={{ pointerEvents: "none" }}>{nameOf(cur)}</text>}
      {nodes.map(n => {
        const inCur = curV.includes(n.i + "," + n.j), held = inCur && common && common.has(n.pc) && !s.anim, isNew = inCur && info && info.moved && !s.anim && info.moved.some(([, b]) => mod12(b) === n.pc);
        return <g key={"n" + n.i + "," + n.j} style={{ cursor: "pointer" }} onClick={() => play([60 + n.pc], { dur: 0.9 })}>
          <circle cx={n.p[0]} cy={n.p[1]} r={inCur ? 14 : 11} fill={isNew ? "var(--gold)" : "var(--card)"} stroke={held ? "var(--ink)" : inCur ? "#7a6a55" : "#a39b8d"} strokeWidth={held ? 3 : 1.2} />
          <text x={n.p[0]} y={n.p[1] + 4} textAnchor="middle" fontSize={NAME[n.pc].length > 1 ? 10 : 12} fontWeight="600" style={{ pointerEvents: "none" }}>{NAME[n.pc]}</text>
          {inCur && !s.anim && <text x={n.p[0] + 24 * (n.p[0] - ctr(cur)[0]) / Math.hypot(n.p[0] - ctr(cur)[0], n.p[1] - ctr(cur)[1])} y={n.p[1] + 4 + 24 * (n.p[1] - ctr(cur)[1]) / Math.hypot(n.p[0] - ctr(cur)[0], n.p[1] - ctr(cur)[1])} textAnchor="middle" fontSize="11" fontWeight="700" style={{ paintOrder: "stroke", stroke: "#fff", strokeWidth: 3, pointerEvents: "none" }}>{roleOf(n.pc)}</text>}
        </g>;
      })}
    </svg>
    <div className="au-info">
      {info && info.op ? <>
        <b>{info.op.k}({info.from}) = {info.to}</b>{info.op.seq.length > 1 && <span>（{info.op.k} = {info.op.seq}，从右往左依次执行）</span>}。
        {info.common.length ? <> 保持不动的共同音：<b>{info.common.map(p => SP[p]).join("、")}</b>（粗圈）；</> : <> <b>没有共同音</b>；</>}
        移动的音：{info.moved.map(([a, b], k) => <span key={k}>{k ? "、" : ""}<b>{SP[mod12(a)]} → {SP[mod12(b)]}</b>（{dirText(b - a)}）</span>)}（金色）。
        {info.op.seq.length === 1 && " 一步变换＝翻过一条边：两个音保留，一个音二度移动，和弦性质大小互换。"}
      </> : info && info.demo ? <><b>{info.demo.name}</b>：{info.demo.note}</>
        : <>当前和弦 <b>{nameOf(cur)}</b>（{cur.m ? "小三和弦，朝下的蓝三角" : "大三和弦，朝上的红三角"}）。点上方按钮做变换；点网格中任意三角形换起点；点交点试听单音。</>}
    </div>
    <div className="au-seq" style={{ marginTop: 8 }}>
      {s.chain.map((c, k) => <span key={k} className={k === s.playIdx ? "on" : ""}>{c.op ? <small style={{ color: "var(--muted)" }}>–{c.op}→ </small> : null}{c.name}</span>)}
    </div>
    <div className="au-ctrl" style={{ marginTop: 6 }}>
      <button className="au-go" onClick={playChain} disabled={s.chain.length < 2}>▶ 播放变换串</button>
      <button onClick={undo} disabled={s.chain.length < 2 || s.busy}>↶ 撤销一步</button>
      <button onClick={() => reset(s.cur)}>清空（以当前和弦为起点）</button>
      <span className="au-lab" style={{ marginLeft: 8 }}>自动演示</span>
      {DEMOS.map(d => <button key={d.k} className={s.demo === d.k ? "on" : ""} disabled={s.busy && s.demo !== d.k} onClick={() => (s.demo === d.k ? stop() : runDemo(d))}>{s.demo === d.k ? "■ " : ""}{d.name}</button>)}
    </div>
    <div className="au-hint">网格是循环的：三角形走到边缘时，会从等价的位置（音名完全相同）重新出现在中间；金色虚线是最近的路线。</div>
  </div>;
}
