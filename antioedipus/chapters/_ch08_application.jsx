// 第 8 章专属图解 (c)：「应用」映射。出发集合（社会形象）被压扁、折叠到目的集合（爸爸-妈妈-我）。
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", EARTH = "#8a6a3c";

const TARGET = {
  dad: { x: 300, y: 70, name: "爸爸", sub: "继承了专制符号（资本先生）", color: BLUE },
  mom: { x: 170, y: 255, name: "妈妈", sub: "残余的领土（大地夫人）", color: EARTH },
  me: { x: 430, y: 255, name: "我", sub: "被切开、被阉割的自我（工人孩子）", color: RED },
};

// 出发集合：书中列出的社会形象（老板、工头、神父、税务员、警察、士兵、工人 + 机器与领土）
const FIG = [
  { id: "boss", icon: "💼", name: "老板", x: 60, y: 40, to: "dad", note: "资本的人格化：发号施令、给你定价。" },
  { id: "foreman", icon: "📋", name: "工头", x: 160, y: 30, to: "dad", note: "车间里的纪律与考核。" },
  { id: "priest", icon: "⛪", name: "神父", x: 440, y: 30, to: "dad", note: "良心、罪责与无限之债的看守者。" },
  { id: "tax", icon: "🧾", name: "税务员", x: 540, y: 50, to: "dad", note: "国家从你这里截取的那一份。" },
  { id: "cop", icon: "🚓", name: "警察", x: 560, y: 140, to: "dad", note: "秩序与惩罚。" },
  { id: "soldier", icon: "🪖", name: "士兵", x: 40, y: 140, to: "dad", note: "国家暴力，反生产最昂贵的一支。" },
  { id: "land", icon: "🏞️", name: "故乡 / 土地", x: 40, y: 280, to: "mom", note: "被拆散后又被怀念的领土性。" },
  { id: "nation", icon: "🏳️", name: "民族 / 祖国", x: 110, y: 330, to: "mom", note: "资本主义四处制造的「新古风」再领土化。" },
  { id: "worker", icon: "🔧", name: "工人", x: 560, y: 300, to: "me", note: "劳动能力的人格化：社会人格。" },
  { id: "machine", icon: "🏭", name: "机器与流", x: 480, y: 340, to: "me", note: "你实际接上的生产、消费、信息之流。" },
];

export default function Application() {
  const [applied, setApplied] = useState(false);
  const [sel, setSel] = useState(null);
  const s = sel && FIG.find(f => f.id === sel);
  const pos = f => applied ? TARGET[f.to] : f;
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg">
        <button className={!applied ? "on" : ""} onClick={() => setApplied(false)}>① 社会场：欲望投资的是这些</button>
        <button className={applied ? "on" : ""} onClick={() => setApplied(true)}>② 执行「应用」：压扁到家里</button>
      </div>
      <svg viewBox="0 0 600 390" style={{ width: "100%", maxHeight: 420, background: "var(--paper)", borderRadius: 14 }}>
        {/* 三角形 */}
        <polygon points={`${TARGET.dad.x},${TARGET.dad.y} ${TARGET.mom.x},${TARGET.mom.y} ${TARGET.me.x},${TARGET.me.y}`}
          fill={applied ? "rgba(155,44,31,.07)" : "none"} stroke={INK} strokeWidth={applied ? 2.5 : 1} strokeDasharray={applied ? "none" : "4 6"}
          opacity={applied ? 1 : .3} style={{ transition: ".8s" }} />
        {/* 社会场里的连线：欲望直接投向社会形象 */}
        {!applied && FIG.map(f => <line key={"l" + f.id} x1="300" y1="190" x2={f.x} y2={f.y} stroke={GOLD} strokeWidth="1.5" strokeDasharray="5 5" opacity=".7">
          <animate attributeName="stroke-dashoffset" values="20;0" dur="1s" repeatCount="indefinite" /></line>)}
        {!applied && <g><circle cx="300" cy="190" r="22" fill={GOLD} opacity=".9" />
          <text x="300" y="195" textAnchor="middle" fontSize="12" fill="#fff">欲望</text></g>}
        {/* 社会形象 */}
        {FIG.map(f => {
          const p = pos(f);
          return <g key={f.id} onClick={() => setSel(f.id)} style={{ cursor: "pointer", transform: `translate(${p.x}px,${p.y}px)`, transition: "transform 1s cubic-bezier(.6,0,.3,1), opacity 1s", opacity: applied ? .0 : 1 }}>
            <circle r="20" fill="var(--card)" stroke={sel === f.id ? RED : "var(--line)"} strokeWidth="2" />
            <text y="6" textAnchor="middle" fontSize="18">{f.icon}</text>
            <text y="36" textAnchor="middle" fontSize="12" fill={INK}>{f.name}</text>
          </g>;
        })}
        {/* 目的集合 */}
        {Object.entries(TARGET).map(([k, t]) => {
          const n = FIG.filter(f => f.to === k).length;
          return <g key={k} style={{ transition: "opacity .8s", opacity: applied ? 1 : .35 }}>
            <circle cx={t.x} cy={t.y} r={applied ? 30 : 22} fill={t.color} style={{ transition: "r .8s" }} />
            <text x={t.x} y={t.y + 6} textAnchor="middle" fontSize="16" fill="#fff" fontWeight="700">{t.name}</text>
            {applied && <text x={t.x} y={k === "dad" ? t.y - 54 : t.y + 50} textAnchor="middle" fontSize="12" fill={t.color}>{t.sub}
              <tspan x={t.x} dy="16">← 吸收了 {n} 个社会形象</tspan></text>}
          </g>;
        })}
        {applied && <text x="300" y="375" textAnchor="middle" fontSize="13" fill={INK}>「所以」是你爸、「所以」是你妈、「所以」是你</text>}
      </svg>
      <div style={{ fontSize: 15, minHeight: 48 }}>
        {applied
          ? <>出发集合（老板、警察、神父、故乡……）全部被「应用」到目的集合上：每个人都有自己私人的爸爸妈妈，于是整个社会场被分发成千千万万个小三角。这就是 <C id="application">应用</C>，也就是 <C id="oedipus_colony">俄狄浦斯</C> 的诞生方式。</>
          : s ? <><b>{s.icon} {s.name}</b>：{s.note} 「应用」之后它会落到 <b style={{ color: TARGET[s.to].color }}>{TARGET[s.to].name}</b> 身上。</>
            : <>在第 ① 状态，欲望直接投向社会场里的人物、机器与领土（点一个看看）。家庭只是其中一个刺激源，而不是终点。</>}
      </div>
      <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>
        人物清单与「爸爸 = 专制符号、妈妈 = 残余领土、我 = 被切开的自我」「资本先生、大地夫人、工人孩子」的对应出自原著第 11 节；具体哪个人物落到哪个顶点，是本页为图示做的归类（示意）。
      </p>
    </div>);
}
