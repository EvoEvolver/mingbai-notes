// 第 6 章专属图解 2：美杜莎滑块——从流动的强度，到被凝视固定为理论
// 滑块 0→100：粒子从皮肤上的自由流动，被横杠分到「这 / 非这」两侧，再被锁进公理格子。
// 但到了 100，横杠仍在原地飞转（虚影），热度也没有消失：冷就是理论的热。
import { useEffect, useRef, useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", BLUE = "#2c4a6e", INK = "#1f1b16", ICE = "#7d93a8";
const W = 600, H = 260, CX = 300, CY = 130, N = 32;

// 固定的伪随机，保证截图稳定
const rnd = (k) => { const s = Math.sin(k * 12.9898) * 43758.5453; return s - Math.floor(s); };
const SEEDS = Array.from({ length: N }, (_, i) => ({
  x: 90 + rnd(i + 1) * 420, y: 70 + rnd(i + 101) * 120,
  ax: 15 + rnd(i + 201) * 45, ay: 10 + rnd(i + 301) * 35,
  fx: 0.4 + rnd(i + 401) * 1.2, fy: 0.3 + rnd(i + 501) * 1.1, ph: rnd(i + 601) * 6.28,
}));
// 格子目标：左半「这」4x4，右半「非这」4x4
const GRID = Array.from({ length: N }, (_, i) => {
  const side = i < N / 2 ? 0 : 1, k = i % (N / 2), r = Math.floor(k / 4), c = k % 4;
  return { x: (side ? 360 : 120) + c * 34, y: 70 + r * 34 };
});

const STAGES = [
  { at: 0, name: "强度之流", body: "一切都在只有一面的皮肤上奔流：没有内外，没有「这」与「非这」，横杠转得飞快，快到看不出它划出了什么区分。" },
  { at: 30, name: "横杠慢下来", body: "美杜莎看了一眼。横杠开始减速，把皮肤折出两侧：这是这，不是那。可利奥塔提醒：要把两边分开，你得同时站在两边——析取同时就是综合。" },
  { at: 65, name: "公理化", body: "每一条陈述都被排进格子：要么可接受，要么不可接受。文本变成一个一致、饱和、公理彼此独立、完备的有机身体，读者也被要求冷静、中立、可以原样重复。" },
  { at: 92, name: "美杜莎：凝固的享乐", body: "完全凝固——这正是理论的快感所在。横杠一边静止一边飞转：恰恰因为它在固定，它才在旋转。冷不是强度的缺席，冷就是理论特有的热。" },
];

export default function MedusaSlider() {
  const [t, setT] = useState(0);
  const [, tick] = useState(0);
  const time = useRef(0);
  useEffect(() => {
    let id, last = performance.now();
    const loop = (now) => { time.current += (now - last) / 1000; last = now; tick(x => (x + 1) % 1e6); id = requestAnimationFrame(loop); };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);
  const s = t / 100, tm = time.current;
  const e = s * s * (3 - 2 * s);                      // 平滑
  const stage = [...STAGES].reverse().find(x => t >= x.at);
  const speed = 6 * (1 - s) + 0.15;                    // 横杠转速：越凝固越慢
  const ang = (tm * speed * 60) % 360;
  const ghost = (tm * 540) % 360;                       // 凝固后仍在飞转的虚影
  const heatCol = (k) => { // 颜色从红到冰蓝，但有脉动的余热
    const pulse = 0.5 + 0.5 * Math.sin(tm * 4 + k);
    return s < 0.9 ? (s < 0.5 ? RED : `rgba(155,44,31,${1 - (s - 0.5) * 1.6})`) : `rgba(155,44,31,${0.15 + pulse * 0.35})`;
  };
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxHeight: 320, background: "var(--paper)", borderRadius: 14 }}>
        {/* 皮肤：一条带子 */}
        <rect x="14" y="14" width={W - 28} height={H - 28} rx="20" fill="none" stroke={INK} strokeOpacity=".12" strokeWidth="2" />
        {/* 格子：在公理化阶段浮现 */}
        <g opacity={Math.max(0, (s - 0.45) * 2)}>
          {GRID.map((g, i) => <rect key={i} x={g.x - 13} y={g.y - 13} width="26" height="26" fill="none" stroke={ICE} strokeWidth="1.2" />)}
          <text x="171" y="225" textAnchor="middle" fontSize="15" fill={BLUE} fontWeight="600">这（可接受）</text>
          <text x="411" y="225" textAnchor="middle" fontSize="15" fill={BLUE} fontWeight="600">非这（不可接受）</text>
        </g>
        {/* 横杠 */}
        <g transform={`rotate(${s > 0.92 ? 0 : ang * (1 - e) } ${CX} ${CY})`}>
          <line x1={CX} y1={CY - 92 * (0.45 + e * 0.55)} x2={CX} y2={CY + 92 * (0.45 + e * 0.55)} stroke={INK} strokeWidth={3 + e * 3} strokeLinecap="round" />
        </g>
        {s > 0.88 && <g transform={`rotate(${ghost} ${CX} ${CY})`} opacity=".22">
          <line x1={CX} y1={CY - 92} x2={CX} y2={CY + 92} stroke={RED} strokeWidth="3" strokeDasharray="4 6" />
        </g>}
        {/* 粒子 */}
        {SEEDS.map((p, i) => {
          const fx = p.x + Math.sin(tm * p.fx + p.ph) * p.ax * (1 - e);
          const fy = p.y + Math.cos(tm * p.fy + p.ph) * p.ay * (1 - e);
          const x = fx * (1 - e) + GRID[i].x * e, y = fy * (1 - e) + GRID[i].y * e;
          const r = 7 - e * 2;
          return e > 0.9
            ? <g key={i}><rect x={x - r} y={y - r} width={r * 2} height={r * 2} fill="#e8eef3" stroke={BLUE} strokeWidth="1.5" />
                <rect x={x - r} y={y - r} width={r * 2} height={r * 2} fill={heatCol(i)} /></g>
            : <circle key={i} cx={x} cy={y} r={r} fill={heatCol(i)} stroke={e > 0.5 ? BLUE : "none"} strokeWidth="1.2" />;
        })}
        {/* 美杜莎之眼 */}
        <g opacity={0.25 + s * 0.75}>
          <ellipse cx={CX} cy="30" rx={18 + s * 10} ry={6 + s * 4} fill="none" stroke={INK} strokeWidth="2" />
          <circle cx={CX} cy="30" r={3 + s * 3} fill={INK} />
        </g>
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 14, color: RED }}>🔥 流动</span>
        <input type="range" min="0" max="100" value={t} onChange={ev => setT(+ev.target.value)} style={{ flex: 1, minWidth: 180 }} aria-label="美杜莎的凝视强度" />
        <span style={{ fontSize: 14, color: BLUE }}>❄ 凝固为理论</span>
      </div>
      <div className="seg" style={{ marginBottom: 0 }}>{STAGES.map(x =>
        <button key={x.at} className={stage === x ? "on" : ""} onClick={() => setT(x.at === 92 ? 100 : x.at)}>{x.name}</button>)}</div>
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>{stage.name}</div>
        <p style={{ margin: "6px 0 0" }}>{stage.body}</p>
        {t >= 92 && <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 15 }}>
          看那些格子里仍在脉动的余热，和横杠的红色虚影：<C id="medusa">美杜莎</C>让一切不动，而「让它不动」本身就是享乐。这就是 <C id="disaffection">冷就是热</C>。</p>}
      </div>
    </div>);
}
