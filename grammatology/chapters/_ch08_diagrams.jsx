// 第 8 章专属图解（二）「巨人」原初隐喻 StepThrough；（三）代表制同构图：字母 ↔ 议员 ↔ 演员
import { useState } from "react";
import { StepThrough, C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#8a8175";

// 简笔小人：脚底在 (x, base)，高度 h
function Person({ x, base = 210, h = 80, color = INK, shake }) {
  const head = h * .16, top = base - h;
  return <g stroke={color} strokeWidth={Math.max(2, h / 28)} fill="none" strokeLinecap="round">
    {shake && <animateTransform attributeName="transform" type="translate" values="0 0;2 0;-2 0;0 0" dur=".25s" repeatCount="indefinite" />}
    <circle cx={x} cy={top + head} r={head} />
    <line x1={x} y1={top + head * 2} x2={x} y2={base - h * .38} />
    <line x1={x} y1={top + h * .42} x2={x - h * .2} y2={top + h * .58} />
    <line x1={x} y1={top + h * .42} x2={x + h * .2} y2={top + h * .58} />
    <line x1={x} y1={base - h * .38} x2={x - h * .16} y2={base} />
    <line x1={x} y1={base - h * .38} x2={x + h * .16} y2={base} />
  </g>;
}

function Bubble({ x, y, text, color = RED, w = 92 }) {
  return <g>
    <rect x={x - w / 2} y={y - 22} width={w} height={34} rx={12} fill="#fff" stroke={color} strokeWidth="2" />
    <text x={x} y={y + 1} textAnchor="middle" fontSize="16" fill={color} fontWeight="700">{text}</text>
  </g>;
}

const GIANT_STEPS = [
  { label: "相遇", content: <>荒野中散居的「野蛮人」第一次遇见另一个人。对方站在远处——对卢梭来说，自然状态的基本特征就是<b>分散</b>，他者首先是在距离中被遇见的。</> },
  { label: "恐惧", content: <>第一反应是<b>害怕</b>。恐惧放大了对方：在他眼里，那人比自己高大、强壮。德里达指出，这不是随便挑的例子——遇见「作为他者的他者」，最初的激情正是恐惧。</> },
  { label: "喊出「巨人」", content: <>于是他把对方叫作<b>「巨人」</b>。注意这个词的双重身份：作为<b>恐惧</b>的符号，它完全「如实」——我确实看见了巨人；作为<b>对象</b>的符号，它是错的、是比喻。这就是 <C id="originary_metaphor">原初隐喻</C>：第一个词就是比喻，前面没有任何「本义」可供转借。</> },
  { label: "比较与冷却", content: <>经过多次接触，他发现这些「巨人」并不比自己更高更强。恐惧平息，比较开始——这是一种<b>劳作</b>：冷却激情、拉开距离、学会辨别。</> },
  { label: "发明「人」", content: <>他造出一个对彼此都适用的普通名词：<b>「人」</b>。而「巨人」被留给那个曾让他着迷的虚幻对象。结论：<b>比喻义先于本义诞生，本义是最后才被发现的。</b>修辞学家后来「冷静地」使用比喻，只是在重演这次最初的位移。</> },
  { label: "德里达的追问", content: <>卢梭看似颠覆了「先本义、后比喻」的常识，其实又把<b>本义</b>（<C id="propre">propre</C>）放回了两头：开头，激情的观念被「如实」表达；结尾，理性稳定了真正的本义。可是开头那个「如实」的东西——「激情呈现给我们的观念」——本身就是<b>符号的符号</b>：它只通过一个虚假的表征者来表达恐惧。起点处已经是代表，而不是在场。</> },
];

function giantSvg(i) {
  const otherH = [70, 150, 150, 84, 84, 84][i];
  const otherX = i === 0 ? 500 : 420;
  return <svg viewBox="0 0 600 250" style={{ width: "100%", maxHeight: 280, background: "var(--paper)", borderRadius: 14 }}>
    <line x1="20" y1="211" x2="580" y2="211" stroke={MUTED} opacity=".4" />
    {i < 5 && <>
      <Person x={150} h={84} color={BLUE} shake={i === 1 || i === 2} />
      <text x={150} y={236} textAnchor="middle" fontSize="13" fill={BLUE}>我</text>
      <g opacity={i === 0 ? .55 : 1}>
        <Person x={otherX} h={otherH} color={i >= 1 && i <= 2 ? RED : INK} />
        <animate attributeName="opacity" from=".2" to={i === 0 ? .55 : 1} dur=".8s" fill="freeze" />
      </g>
      <text x={otherX} y={236} textAnchor="middle" fontSize="13" fill={INK}>他者</text>
    </>}
    {i === 0 && <text x={330} y={120} textAnchor="middle" fontSize="13" fill={MUTED}>← 遥远的距离 →</text>}
    {i === 1 && <text x={212} y={110} fontSize="30">😨</text>}
    {i === 2 && <>
      <Bubble x={230} y={90} text="巨人！" />
      <text x={300} y={30} textAnchor="middle" fontSize="12" fill={GREEN}>对「恐惧」而言：如实（本义）</text>
      <text x={300} y={50} textAnchor="middle" fontSize="12" fill={RED}>对「那个人」而言：错的（比喻）</text>
    </>}
    {i === 3 && <>
      <line x1={110} y1={126} x2={470} y2={126} stroke={GOLD} strokeDasharray="6 5" strokeWidth="2">
        <animate attributeName="stroke-dashoffset" values="0;-22" dur="1s" repeatCount="indefinite" />
      </line>
      <text x={300} y={115} textAnchor="middle" fontSize="13" fill={GOLD}>比较：其实一样高</text>
    </>}
    {i === 4 && <>
      <Bubble x={150} y={100} text="人" color={GREEN} w={56} />
      <Bubble x={420} y={100} text="人" color={GREEN} w={56} />
      <rect x={232} y={30} width={136} height={36} rx={8} fill="none" stroke={MUTED} strokeDasharray="4 4" />
      <text x={300} y={53} textAnchor="middle" fontSize="13" fill={MUTED}>「巨人」→ 留给幻觉</text>
    </>}
    {i === 5 && <g>
      {[["开端：激情的观念", "「本义」?", GREEN, 90], ["中途：比喻（巨人）", "位移", RED, 300], ["终点：理性的本义（人）", "本义", GREEN, 510]].map(([t, s, c, x], k) =>
        <g key={k}>
          <rect x={x - 80} y={80} width={160} height={56} rx={12} fill={c} opacity=".9" />
          <text x={x} y={104} textAnchor="middle" fontSize="13" fill="#fff">{t}</text>
          <text x={x} y={124} textAnchor="middle" fontSize="13" fill="#fff" fontWeight="700">{s}</text>
          {k < 2 && <text x={x + 105} y={114} textAnchor="middle" fontSize="20" fill={INK}>→</text>}
        </g>)}
      <text x={300} y={40} textAnchor="middle" fontSize="13" fill={INK}>卢梭：本义 = 起点（arche）+ 终点（telos）</text>
      <rect x={20} y={150} width={140} height={66} rx={12} fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="5 4">
        <animate attributeName="opacity" values="1;.3;1" dur="2.4s" repeatCount="indefinite" />
      </rect>
      <text x={90} y={176} textAnchor="middle" fontSize="12" fill={GOLD}>其实是「符号的符号」</text>
      <text x={90} y={198} textAnchor="middle" fontSize="12" fill={GOLD}>起点已是代表</text>
    </g>}
  </svg>;
}

export function GiantStep() {
  return <StepThrough steps={GIANT_STEPS} render={giantSvg} />;
}

// —— 代表制同构图 ——
const ORDERS = [
  {
    key: "lang", icon: "🗣️", name: "语言", present: "带着重音与激情的活的嗓音", rep: "文字（尤其字母）", repIcon: "🔤",
    ideal: "说话的人亲自在场，语气随时决定意思；写下来只是「必要时的朗读」。",
    harm: "文字是无调的：说话的主体缺席，重音变成标点，句子离开了它唯一的时间和地点。",
    twist: "卢梭承认：取代重音的「分节」恰恰是语言的起源。没有分节就只有叫喊，不成语言。",
  },
  {
    key: "pol", icon: "🏛️", name: "政治", present: "亲自集会的人民（公意）", rep: "议员、法令、首都", repIcon: "📜",
    ideal: "主权不可被代表：意志「要么是同一个，要么是另一个，没有中间状态」。人民集会时，代表就不复存在。",
    harm: "一旦让自己被代表，人民就不再自由；法令（即书写）取代法律，公意沉默，不平等由此开始。",
    twist: "定期集会需要一个「标记好的日子」——而任何标记，不正是书写的可能性吗？公意本身也被称为法律的「源头与增补」。",
  },
  {
    key: "stage", icon: "🎭", name: "剧场", present: "露天节庆：人人既是演员也是观众", rep: "职业演员、舞台", repIcon: "🎭",
    ideal: "广场中央立一根花柱，让观众自己成为表演，「每个人在他人身上看见并爱自己」——没有什么需要「看」。",
    harm: "演员说别人让他说的话，在角色中「消灭自己」；巴黎上流社会在包厢里同时是观众和戏子。",
    twist: "北方的冬天里，卢梭只好推荐「未婚青年的舞会」作替代——节庆本身也需要增补。",
  },
];

export function Isomorph() {
  const [i, setI] = useState(0), o = ORDERS[i];
  return <div className="card" style={{ display: "grid", gap: 14 }}>
    <div className="seg">{ORDERS.map((x, j) =>
      <button key={x.key} className={i === j ? "on" : ""} onClick={() => setI(j)}>{x.icon} {x.name}</button>)}</div>
    <svg viewBox="0 0 600 190" style={{ width: "100%", maxHeight: 230, background: "var(--paper)", borderRadius: 14 }}>
      {ORDERS.map((x, j) => {
        const y = 36 + j * 56, on = j === i;
        return <g key={x.key} opacity={on ? 1 : .5} style={{ cursor: "pointer" }} onClick={() => setI(j)}>
          <rect x={20} y={y - 20} width={220} height={40} rx={10} fill={on ? GREEN : "#d9d0c0"} />
          <text x={130} y={y + 5} textAnchor="middle" fontSize="12.5" fill={on ? "#fff" : INK}>{x.present.length > 16 ? x.present.slice(0, 16) + "…" : x.present}</text>
          <rect x={360} y={y - 20} width={220} height={40} rx={10} fill={on ? RED : "#d9d0c0"} />
          <text x={470} y={y + 5} textAnchor="middle" fontSize="12.5" fill={on ? "#fff" : INK}>{x.repIcon} {x.rep}</text>
          <line x1={244} y1={y} x2={356} y2={y} stroke={on ? GOLD : MUTED} strokeWidth="2" strokeDasharray="6 5">
            {on && <animate attributeName="stroke-dashoffset" values="0;22" dur="1s" repeatCount="indefinite" />}
          </line>
          <text x={300} y={y - 6} textAnchor="middle" fontSize="11" fill={on ? GOLD : MUTED}>代表 · 延迟 · 委托</text>
        </g>;
      })}
      <text x={130} y={186} textAnchor="middle" fontSize="12" fill={GREEN}>被代表者（在场）</text>
      <text x={470} y={186} textAnchor="middle" fontSize="12" fill={RED}>代表者（增补）</text>
    </svg>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
      <div><b style={{ color: GREEN }}>卢梭的理想</b><p style={{ margin: "4px 0" }}>{o.ideal}</p></div>
      <div><b style={{ color: RED }}>代表带来的恶</b><p style={{ margin: "4px 0" }}>{o.harm}</p></div>
      <div><b style={{ color: GOLD }}>文本里的裂缝</b><p style={{ margin: "4px 0" }}>{o.twist}</p></div>
    </div>
    <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>三个领域是同一个结构：卢梭批判的从来不只是「演了什么、写了什么」，而是<b>再现（re-presentation）本身</b>。见 <C id="sovereignty_representation">主权不可代表</C>、<C id="theater_festival">剧场与节庆</C>。</p>
  </div>;
}
