// 第 3 章专属图解二：「两个马克思」——同一个主题上，小女孩马克思与老检察官马克思的两种欲望，以及利奥塔的读法
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", VIOLET = "#5b3f7a";

const TOPICS = [
  {
    id: "book", name: "《资本论》为何写不完",
    girl: "我要一件「艺术整体」：在全部写完、全部摆在眼前之前，我什么都不想付印。我想要一个孩子——先出生的「词语之子」，预告着血肉之子：无产阶级、社会主义。",
    pros: "受命起诉资本，却被被告迷住：在大英博物馆里对资本的种种「反常」做显微分析，找出千百条理由延长调查，一章变一本，一段变一节，结案陈词无限推迟。",
    ly: "这种延宕本身就是一种享乐——「先别到」的无限享乐，与资本「爱生产胜过爱产品」、把一切投入手段的装置完全同构。作品成不了一个身体，正如资本成不了一个身体。",
    cid: "non_finito",
  },
  {
    id: "money", name: "货币",
    girl: "货币是皮条客，横在人的需要与对象之间、人与人之间。它让心的语言失效：恳求显得可耻，激情显得疯狂，而物化的价值语言反倒成了尊严。",
    pros: "把这份厌恶改写成理论：等价、交换价值、货币对一切品质的冷漠，以及把人与人的关系伪装成物与物关系的「拜物教」。",
    ly: "对金钱世界的恐惧，就是对部分冲动之「倒错」的恐惧，因而也是对它的贪恋。货币能为任何东西辩护，于是解除责任、彻底谵妄——它是激情的诡辩术，也是激情的能量假肢。",
    cid: "universal_prostitution",
  },
  {
    id: "prost", name: "卖淫",
    girl: "资本主义里最让我退缩的，是卖淫：婚姻是目的，于是大多数人只剩卖淫。我要的是自然、直接、必要的人与人的关系，首先是男女之间的关系。",
    pros: "把它变成普遍命题：卖淫只是工人普遍卖淫的特殊表达；交换价值的发展等同于普遍的可出卖性；废除现有生产方式，也就废除公开与私下的卖淫。",
    ly: "巴塔耶的艾德瓦尔妲「过度享受她的职业」而发疯：强度不来自外部，而是在区分客人与情人的那道横杠上被烧到白热。资本的秩序与资本的无序，是同一个东西。",
    cid: "universal_prostitution",
  },
  {
    id: "force", name: "劳动力",
    girl: "在所有等价交换之下，藏着一份原初的、不平等的礼物：活的力给出的比它拿走的多。资本对它犯下的不只是经济之错，而是本体论之错。",
    pros: "据此搭建剩余价值理论和利润率下降规律：资本既要把劳动时间压到最低，又要以劳动时间为财富的唯一尺度——这个「运动中的矛盾」将炸毁它。",
    ly: "「力」是批判请回来的主权馈赠模型，是一个超越性的外部。可资本只需要某处的能量势差，取自人或取自自然都行；那个致命矛盾，只和检察官的仇恨一样深。",
    cid: "living_force",
  },
  {
    id: "commune", name: "前资本主义公社",
    girl: "曾经有过和解：土地是劳动者的无机身体，公社是同一具大身体的一部分，没有中介、没有分裂。我和我的爱人（无产阶级）被夺走了它。",
    pros: "把它当方法上的对照：要解释的不是人与自然条件的统一，而是二者的分离——这种分离只在雇佣劳动与资本的关系中才完全成立。",
    ly: "两者其实是同一个动作：把一个未经批判的「统一」设为批判者发言的场所，由此建立内外分明的剧场。利奥塔说，整个马克思都建立在这种虚无主义之上。",
    cid: "inorganic_body",
  },
];

const VOICES = [
  { key: "girl", label: "👧 小女孩马克思", color: RED, sub: "渴望有机身体的爱人" },
  { key: "pros", label: "🧔 老检察官马克思", color: BLUE, sub: "构建理论、起诉资本" },
  { key: "ly", label: "🌀 利奥塔的读法", color: VIOLET, sub: "两者合成的装置" },
];

function Figure({ v }) {
  // 一个「雌雄同体的怪物」：巨大的头 + 柔软的身体；当前声音高亮
  const head = v === 1 || v === 2, body = v === 0 || v === 2;
  return (
    <svg viewBox="0 0 300 200" style={{ width: "100%", maxWidth: 300, display: "block", margin: "0 auto" }}>
      <ellipse cx="150" cy="150" rx="70" ry="42" fill={RED} opacity={body ? .85 : .15} style={{ transition: "opacity .6s" }}>
        {v === 0 && <animate attributeName="ry" values="42;46;42" dur="2s" repeatCount="indefinite" />}
      </ellipse>
      <text x="150" y="156" textAnchor="middle" fontSize="13" fill="#fff" opacity={body ? 1 : .4}>恋人柔软的身体</text>
      <circle cx="150" cy="62" r="52" fill={BLUE} opacity={head ? .85 : .15} style={{ transition: "opacity .6s" }}>
        {v === 1 && <animate attributeName="r" values="52;56;52" dur="2s" repeatCount="indefinite" />}
      </circle>
      <path d="M 116 82 Q 150 128 184 82 Q 150 100 116 82 Z" fill={INK} opacity={head ? .35 : .08} />
      <text x="150" y="58" textAnchor="middle" fontSize="13" fill="#fff" opacity={head ? 1 : .4}>检察官的大头</text>
      {v === 2 && <path d="M 60 110 C 20 40, 280 40, 240 110 C 280 180, 20 180, 60 110" fill="none" stroke={GOLD} strokeWidth="3" strokeDasharray="8 6">
        <animate attributeName="stroke-dashoffset" values="0;-28" dur="1s" repeatCount="indefinite" /></path>}
    </svg>);
}

export default function TwoMarx() {
  const [t, setT] = useState(0), [v, setV] = useState(0);
  const topic = TOPICS[t], voice = VOICES[v];
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg" style={{ flexWrap: "wrap" }}>{TOPICS.map((x, j) =>
        <button key={x.id} className={t === j ? "on" : ""} onClick={() => setT(j)}>{x.name}</button>)}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}>
        <div style={{ flex: "0 1 240px", minWidth: 180 }}><Figure v={v} /></div>
        <div style={{ flex: "1 1 320px" }}>
          <div className="seg" style={{ flexWrap: "wrap", marginBottom: 10 }}>{VOICES.map((x, j) =>
            <button key={x.key} className={v === j ? "on" : ""} onClick={() => setV(j)}>{x.label}</button>)}</div>
          <div key={topic.id + v} style={{ padding: "12px 16px", borderLeft: `4px solid ${voice.color}`, background: "var(--paper)", borderRadius: 8, animation: "fadeUp2 .45s both" }}>
            <div style={{ fontSize: 13, color: voice.color, marginBottom: 4 }}>{voice.sub} · 论「{topic.name}」</div>
            <div>{topic[voice.key]}</div>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--muted)" }}>相关概念：<C id={topic.cid} />　·　切换三种声音，看同一段马克思文本里怎样同时住着两种欲望。</p>
        </div>
      </div>
      <style>{"@keyframes fadeUp2{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}"}</style>
    </div>);
}
