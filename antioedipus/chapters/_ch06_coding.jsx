// 第 6 章专属图解 (a)：原始领土机器的「编码机」
// 血缘纵轴 × 联姻横轴；让女人、礼物、宴会、金钱这些「流」穿过网格，看它们怎样被标记、记账、永不结清。
import { useState, useEffect, useRef } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#6b6257", VIOLET = "#5b3f7a";
const LINES = [
  { name: "鹰族", x: 130, color: RED },
  { name: "龟族", x: 330, color: BLUE },
  { name: "蛇族", x: 530, color: GREEN },
];
const GEN = [{ y: 105, l: "祖先" }, { y: 170, l: "父辈" }, { y: 235, l: "我辈" }];

const KINDS = [
  { id: "woman", icon: "💍", name: "联姻（嫁出一位女子）", two: true, color: RED,
    hint: "先点「给妻方」家系，再点「娶妻方」家系。" },
  { id: "gift", icon: "🐄", name: "礼物 / 聘礼（牛、贝币）", two: true, color: GOLD,
    hint: "先点送礼的家系，再点收礼的家系。" },
  { id: "feast", icon: "🎉", name: "盛宴（把财富化成名声）", two: false, color: VIOLET,
    hint: "点一个家系，让它的首领办一场盛宴。" },
  { id: "money", icon: "💰", name: "金钱（一股无法编码的流）", two: true, color: INK,
    hint: "先点一个家系，再点另一个，看看会发生什么。" },
];

const init = () => ({ debts: {}, stock: [6, 6, 6], fame: [0, 0, 0], decoded: false, log: [] });
const key = (a, b) => a + ">" + b; // a 欠 b

function Blocks({ v, color }) {
  const full = Math.floor(v), half = v - full >= 0.5;
  return <span style={{ letterSpacing: 2 }}>
    {Array.from({ length: full }).map((_, i) => <span key={i} style={{ display: "inline-block", width: 14, height: 14, background: color, borderRadius: 3, marginRight: 3, verticalAlign: "middle" }} />)}
    {half && <span style={{ display: "inline-block", width: 7, height: 14, background: color, opacity: .6, borderRadius: 3, verticalAlign: "middle" }} />}
  </span>;
}

export default function CodingMachine() {
  const [kind, setKind] = useState("woman");
  const [sel, setSel] = useState(null);
  const [st, setSt] = useState(init);
  const [anim, setAnim] = useState(null); // {from,to,kind,t}
  const raf = useRef();
  const K = KINDS.find(k => k.id === kind);

  useEffect(() => {
    if (!anim || anim.t >= 1) return;
    const t0 = performance.now() - anim.t * 900;
    const step = now => {
      const t = Math.min(1, (now - t0) / 900);
      setAnim(a => a && { ...a, t });
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [anim && anim.id]);

  const say = (s, msg) => ({ ...s, log: [msg, ...s.log].slice(0, 4) });

  function fire(from, to) {
    const N = i => LINES[i].name;
    setSt(s0 => {
      let s = { ...s0, debts: { ...s0.debts }, stock: [...s0.stock], fame: [...s0.fame] };
      if (kind === "woman") {
        s.debts[key(to, from)] = (s.debts[key(to, from)] || 0) + 1;
        s.fame[from] += 1;
        return say(s, `💍 ${N(from)}的女儿嫁入${N(to)}。这不是「交换」完就两清：${N(to)}在账上多了一块欠${N(from)}的联姻债；给妻方的地位随之抬高（在不少体系里，给妻者高于受妻者）。`);
      }
      if (kind === "gift") {
        if (s.stock[from] <= 0) return say(s, `${N(from)}的库存已空，送不出礼了。`);
        s.stock[from] -= 1; s.stock[to] += 1;
        const owe = s.debts[key(from, to)] || 0;
        if (owe > 0) {
          s.debts[key(from, to)] = owe - 1;
          s.debts[key(to, from)] = (s.debts[key(to, from)] || 0) + 0.5;
          return say(s, `🐄 ${N(from)}送牛还掉一块旧债，可礼物总要「带着利息」回报：${N(to)}反过来欠下半块。账本永远对不平。`);
        }
        s.debts[key(to, from)] = (s.debts[key(to, from)] || 0) + 1;
        return say(s, `🐄 ${N(to)}收下礼物，同时收下一块人情债：东西流过去，一笔「记录」也跟着被刻下。`);
      }
      if (kind === "feast") {
        if (s.stock[from] < 2) return say(s, `${N(from)}的库存不够办盛宴。`);
        s.stock[from] -= 2; s.fame[from] += 2;
        return say(s, `🎉 ${N(from)}的首领办盛宴：会腐坏的食物被吃掉，换成不会腐坏的威望——这就是「代码剩余价值」被抵偿的一种方式，而吃宴席的正是当初种粮的人。`);
      }
      // money
      s.decoded = true;
      return say(s, `💰 金钱进来了。它只能勉强被当作「威望物」编码，可商人拿它去买原本属于另一类流的消费品——三类流的隔墙松动，账本上的标记开始失效。长老们看着满载出口货的卡车开走，知道发生了什么，却不知该怪谁（书中 Tiv 人的例子）。`);
    });
    setAnim({ from, to, kind, t: 0, id: Math.random() });
  }

  function click(i) {
    if (st.decoded && kind !== "money") { /* 允许继续，但提示 */ }
    if (!K.two) { fire(i, i); return; }
    if (sel === null) { setSel(i); return; }
    if (sel === i) { setSel(null); return; }
    fire(sel, i); setSel(null);
  }

  // 动画中的流
  let token = null;
  if (anim && anim.t < 1) {
    const a = LINES[anim.from], b = LINES[anim.to], t = anim.t, kd = KINDS.find(k => k.id === anim.kind);
    let p0, p1, p2;
    if (anim.kind === "feast") { p0 = [a.x, 300]; p1 = [a.x, 160]; p2 = [a.x, 40]; }
    else if (anim.kind === "money") { p0 = [a.x, 235]; p1 = [(a.x + b.x) / 2, 90]; p2 = [b.x > a.x ? 700 : -40, 20]; }
    else { const y = anim.kind === "woman" ? 235 : 300; p0 = [a.x, y]; p1 = [(a.x + b.x) / 2, y - 120]; p2 = [b.x, y]; }
    const u = 1 - t, x = u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], y = u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1];
    token = <g transform={`translate(${x},${y})`}>
      <circle r="16" fill="#fffdf8" stroke={kd.color} strokeWidth="2.5" />
      <text textAnchor="middle" dy="6" fontSize="17">{kd.icon}</text>
    </g>;
  }

  const debtList = Object.entries(st.debts).filter(([, v]) => v > 0);
  const total = debtList.reduce((s, [, v]) => s + v, 0);

  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{KINDS.map(k =>
        <button key={k.id} className={kind === k.id ? "on" : ""} onClick={() => { setKind(k.id); setSel(null); }}>{k.icon} {k.name}</button>)}</div>
      <div style={{ fontSize: 14, color: MUTED }}>👉 {K.hint}{sel !== null && <b style={{ color: LINES[sel].color }}> 已选：{LINES[sel].name}，再点目标家系。</b>}</div>

      <svg viewBox="0 0 660 380" style={{ width: "100%", background: "var(--paper)", borderRadius: 14, userSelect: "none" }}>
        <defs>
          <linearGradient id="ch06earth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c9a46a" /><stop offset="1" stopColor="#8a5a2b" />
          </linearGradient>
          <marker id="ch06arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0L10,5L0,10z" fill={MUTED} /></marker>
        </defs>
        {/* 大地 */}
        <rect x="0" y="335" width="660" height="45" fill="url(#ch06earth)" opacity={st.decoded ? .45 : .9}>
          {st.decoded && <animate attributeName="opacity" values=".9;.3;.9" dur="1.2s" repeatCount="indefinite" />}
        </rect>
        <text x="330" y="363" textAnchor="middle" fontSize="13" fill="#fffdf8">大地 · 社会的「满盈身体」——一切流与标记都刻在它上面（不动的发动机）</text>

        {/* 轴说明 */}
        <text x="16" y="22" fontSize="12" fill={MUTED}>↓ 血缘 filiation：纵轴，代代相传的库存与等级</text>
        <text x="644" y="22" textAnchor="end" fontSize="12" fill={MUTED}>联姻 alliance：横轴，流动的债务 ↔</text>

        {/* 代际线 */}
        {GEN.map(g => <g key={g.y}>
          <line x1="40" x2="620" y1={g.y} y2={g.y} stroke={INK} strokeOpacity=".07" />
          <text x="18" y={g.y + 4} fontSize="11" fill={MUTED}>{g.l}</text>
        </g>)}

        {/* 债务弧线 */}
        {debtList.map(([k, v]) => {
          const [a, b] = k.split(">").map(Number), xa = LINES[a].x, xb = LINES[b].x;
          const lift = 40 + Math.abs(xa - xb) * .22 + (a > b ? 18 : 0);
          return <g key={k} opacity={st.decoded ? .35 : 1}>
            <path d={`M${xa},${215} Q${(xa + xb) / 2},${215 - lift} ${xb},${215}`} fill="none" stroke={LINES[a].color} strokeWidth={1.5 + v * 1.4}
              strokeDasharray={st.decoded ? "4 6" : "none"} markerEnd="url(#ch06arr)" opacity=".55" />
            <text x={(xa + xb) / 2} y={215 - lift / 2 - 4 - (a > b ? 8 : 0)} textAnchor="middle" fontSize="11" fill={LINES[a].color}>
              {st.decoded ? "？" : `欠 ${v}`}</text>
          </g>;
        })}

        {/* 家系 */}
        {LINES.map((L, i) => <g key={i} style={{ cursor: "pointer" }} onClick={() => click(i)}>
          <rect x={L.x - 62} y="36" width="124" height="292" rx="14" fill={sel === i ? L.color : "#fffdf8"} fillOpacity={sel === i ? .12 : .001}
            stroke={sel === i ? L.color : "transparent"} strokeWidth="2" />
          <text x={L.x} y="58" textAnchor="middle" fontSize="17" fontWeight="700" fill={L.color}>{L.name}</text>
          <text x={L.x} y="78" textAnchor="middle" fontSize="12" fill={GOLD}>{"★".repeat(Math.min(st.fame[i], 8)) || "·"}</text>
          <line x1={L.x} x2={L.x} y1="92" y2="280" stroke={L.color} strokeWidth="4" strokeLinecap="round" opacity=".75" />
          {GEN.map(g => <circle key={g.y} cx={L.x} cy={g.y} r="9" fill="#fffdf8" stroke={L.color} strokeWidth="3" />)}
          {/* 身体上的标记：每获得一点名声 = 一道刻痕 */}
          {Array.from({ length: Math.min(st.fame[i], 6) }).map((_, j) => <line key={j} x1={L.x + 14} x2={L.x + 24} y1={226 + j * 4} y2={222 + j * 4} stroke={L.color} strokeWidth="1.6" />)}
          <rect x={L.x - 46} y="288" width="92" height="34" rx="6" fill={L.color} opacity=".14" />
          <text x={L.x} y="310" textAnchor="middle" fontSize="13" fill={INK}>库存 {"▪".repeat(Math.min(st.stock[i], 10))} {st.stock[i]}</text>
        </g>)}

        {st.decoded && <g>
          <rect x="150" y="120" width="360" height="44" rx="10" fill={INK} opacity=".85" />
          <text x="330" y="147" textAnchor="middle" fontSize="14" fill="#fffdf8">⚠ 解码的流：标记失灵，账本「对不上号」</text>
        </g>}
        {token}
      </svg>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
        <div>
          <b>账本（有限的债务块）</b>
          {debtList.length === 0 ? <p style={{ margin: "4px 0", color: MUTED, fontSize: 14 }}>还没有任何流动。先试一次「联姻」。</p> :
            <ul style={{ margin: "4px 0", paddingLeft: 18, fontSize: 14 }}>
              {debtList.map(([k, v]) => { const [a, b] = k.split(">").map(Number); return <li key={k}>
                <span style={{ color: LINES[a].color }}>{LINES[a].name}</span> 欠 <span style={{ color: LINES[b].color }}>{LINES[b].name}</span>　<Blocks v={v} color={LINES[a].color} /> {st.decoded ? "（已无法用代码衡量）" : ""}</li>; })}
            </ul>}
          {total > 0 && <p style={{ margin: "4px 0", fontSize: 13, color: MUTED }}>未结清的债务块合计 {total}。注意：怎么点都不会归零——联姻的账本本来就不闭合。</p>}
          <button onClick={() => { setSt(init()); setSel(null); setAnim(null); }} style={{ marginTop: 6, border: "1px solid var(--line)", background: "var(--paper)", borderRadius: 99, padding: "3px 14px", cursor: "pointer", fontSize: 13 }}>↺ 重置</button>
        </div>
        <div>
          <b>机器在做什么</b>
          {st.log.length === 0 ? <p style={{ margin: "4px 0", color: MUTED, fontSize: 14 }}>每一次流动都会在这里被「铭写」。</p> :
            st.log.map((m, i) => <p key={i} style={{ margin: "4px 0", fontSize: 14, opacity: 1 - i * .22 }}>{m}</p>)}
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: MUTED }}>
        示意说明：家系名称、库存、债务的数字与「带利息回礼＝反欠半块」的规则都是为演示而虚构的简化模型，不是任何具体民族志数据。
        它要演示的是书中的三点：<C id="filiation_alliance">血缘是纵向的库存、联姻是横向的流动债务</C>；
        <C id="surplus_value_code">失衡不是故障而是发动机</C>；以及原始机器最怕的东西——<C id="segmentary_warding">一股无法编码的流</C>。
      </p>
    </div>);
}
