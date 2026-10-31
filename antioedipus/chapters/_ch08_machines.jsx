// 第 8 章专属图解 (a)：三种社会机器编码表。同一批流（生产者、财富/货币、家庭、符号）在原始 / 专制 / 资本主义机器里分别被怎样处理。
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", EARTH = "#8a6a3c", VIOLET = "#5b3f7a";

const FLOWS = [
  { k: "labor", icon: "🧑‍🌾", name: "生产者", color: GREEN },
  { k: "money", icon: "🪙", name: "财富 / 货币", color: GOLD },
  { k: "family", icon: "👪", name: "家庭 / 亲属", color: RED },
  { k: "sign", icon: "✍️", name: "符号 / 书写", color: BLUE },
];

const MACHINES = [
  {
    id: "savage", icon: "🌍", name: "原始领土机器", era: "蒙昧", body: "大地", op: "编码 coding", color: EARTH,
    gist: "每一种流都有自己的规矩、自己的回路；规矩彼此只能间接、按质换算。",
    rows: {
      labor: "按氏族、世系与联姻地位登记：你是谁家的、排第几，决定你在生产里的位置。",
      money: "多条按「质」分开的回路（日用品、威望品、女人与孩子），只能在有限的债务块里间接互换。",
      family: "家庭是向整个社会场敞开的策略：联姻与血缘本身就是社会结构（被「决定为支配性」）。",
      sign: "刻写在肉身上（文身、割礼、仪式之痛），由集体的「评估之眼」来读；声音与图形各自独立。",
      surplus: "代码的剩余价值：靠编码在流里截出一份。",
      anti: "大地作为满盈身体「落回」生产之上，好像一切都从它那里来。",
      oedipus: "空着——家庭太大、太社会化，无法把社会缩回家里。",
    },
  },
  {
    id: "despot", icon: "👑", name: "野蛮专制机器", era: "野蛮", body: "君主 / 原国家 Urstaat", op: "超编码 overcoding", color: VIOLET,
    gist: "旧编码不废除，全被拉到一个顶点上再编一层：一切流都先流向君主，再按他的意志流下来。",
    rows: {
      labor: "普遍奴役：村社照旧耕作，但剩余劳动被国家征发（贡赋、徭役）。",
      money: "货币首先为税而生，所有债务汇成对君主的无限债务。",
      family: "君主的「新联姻 + 直接血缘」凌驾于各家族之上；王朝家族成为整个社会的轴心。",
      sign: "书写出现：一个高高在上的「专制能指」统摄声音，法令从上面压下来。",
      surplus: "仍是代码的剩余价值，只是被超编码、集中到顶点。",
      anti: "反生产是超越的、独立的：一个不劳动的主人阶层站在生产之外。",
      oedipus: "被「象征地」占据（王室乱伦的神话），但没人在其中生活。",
    },
  },
  {
    id: "capital", icon: "💹", name: "文明资本主义机器", era: "文明", body: "资本-货币", op: "解码 + 公理化 axiomatic", color: RED,
    gist: "先把所有旧规矩全部拆掉，让流赤裸地流；再用少数纯数量的「公理」把它们重新接到资本上。",
    rows: {
      labor: "被「解放」的赤裸劳动者：除了劳动能力一无所有；被登记的不再是人，而是一个抽象数量。",
      money: "抽象、无上限的 M–C–M′；而且分裂成两种互不可通约的钱：工资（支付手段）与融资（信用）。",
      family: "被私人化、放到社会场之外：只负责生出「人力材料」，社会的一切再被「应用」到它身上。",
      sign: "书写沦为古风；电视、计算机这类非能指的流-断流取而代之；不再需要人「相信」什么。",
      surplus: "流的剩余价值：人的剩余价值 + 机器的剩余价值，没有共同尺度。",
      anti: "反生产渗进生产内部：国家、军队、官僚、广告无处不在，负责吸收过剩。",
      oedipus: "被占据、被居住、被亲身经历：俄狄浦斯终于到来。",
    },
  },
];

const EXTRA = [
  { k: "surplus", name: "剩余从哪来" },
  { k: "anti", name: "反生产在哪" },
  { k: "oedipus", name: "俄狄浦斯位置" },
];

// SVG：四条流在三种机器中的走向
function Diagram({ m }) {
  const ys = [50, 100, 150, 200];
  if (m.id === "savage") return <>
    <ellipse cx="300" cy="235" rx="290" ry="22" fill={EARTH} opacity=".25" />
    <text x="300" y="252" textAnchor="middle" fontSize="13" fill={EARTH}>满盈身体：大地</text>
    {FLOWS.map((f, i) => <g key={f.k}>
      <path d={`M20 ${ys[i]} H250`} stroke={f.color} strokeWidth="5" strokeDasharray="10 8" fill="none">
        <animate attributeName="stroke-dashoffset" values="36;0" dur="1.2s" repeatCount="indefinite" /></path>
      <rect x="250" y={ys[i] - 15} width="110" height="30" rx="6" fill="var(--card)" stroke={f.color} strokeWidth="2" />
      <text x="305" y={ys[i] + 5} textAnchor="middle" fontSize="12" fill={f.color}>{f.name}的规矩</text>
      <path d={`M360 ${ys[i]} H560`} stroke={f.color} strokeWidth="5" strokeDasharray="10 8" fill="none" opacity=".75">
        <animate attributeName="stroke-dashoffset" values="36;0" dur="1.2s" repeatCount="indefinite" /></path>
      <text x="14" y={ys[i] + 5} textAnchor="end" fontSize="16">{f.icon}</text>
    </g>)}
    <path d="M305 66 V84 M305 116 V134 M305 166 V184" stroke={INK} strokeWidth="1.5" strokeDasharray="2 3" opacity=".5" />
    <text x="420" y="22" fontSize="12" fill={INK} opacity=".7">各走各的回路，彼此只能间接换算</text>
  </>;
  if (m.id === "despot") return <>
    <polygon points="300,18 340,62 260,62" fill={VIOLET} opacity=".9" />
    <text x="300" y="52" textAnchor="middle" fontSize="18">👑</text>
    {FLOWS.map((f, i) => <g key={f.k}>
      <rect x="40" y={ys[i] + 5} width="80" height="22" rx="5" fill="var(--card)" stroke={f.color} />
      <text x="80" y={ys[i] + 21} textAnchor="middle" fontSize="11" fill={f.color}>{f.icon} 旧编码</text>
      <path d={`M120 ${ys[i] + 16} Q 220 ${ys[i] - 10} 290 64`} stroke={f.color} strokeWidth="4" strokeDasharray="8 7" fill="none">
        <animate attributeName="stroke-dashoffset" values="30;0" dur="1.1s" repeatCount="indefinite" /></path>
      <path d={`M310 64 Q 380 ${ys[i] - 10} 480 ${ys[i] + 16}`} stroke={f.color} strokeWidth="3" strokeDasharray="8 7" fill="none" opacity=".6">
        <animate attributeName="stroke-dashoffset" values="30;0" dur="1.1s" repeatCount="indefinite" /></path>
      <text x="490" y={ys[i] + 21} fontSize="11" fill={f.color}>按君主意志下放</text>
    </g>)}
    <text x="300" y="250" textAnchor="middle" fontSize="12" fill={INK} opacity=".7">超编码：旧规矩还在，但一切先流向顶点</text>
  </>;
  return <>
    <circle cx="300" cy="128" r="118" fill="none" stroke={RED} strokeWidth="1.5" strokeDasharray="4 6" opacity=".55">
      <animate attributeName="r" values="112;124;112" dur="3s" repeatCount="indefinite" /></circle>
    <text x="300" y="20" textAnchor="middle" fontSize="11" fill={RED} opacity=".8">外部极限：精神分裂（被不断推开）</text>
    {FLOWS.map((f, i) => <g key={f.k}>
      <text x="14" y={ys[i] + 5} textAnchor="end" fontSize="16">{f.icon}</text>
      <path d={`M24 ${ys[i]} C 140 ${ys[i]}, 180 128, 250 128`} stroke={f.color} strokeWidth="5" strokeDasharray="10 8" fill="none">
        <animate attributeName="stroke-dashoffset" values="36;0" dur=".8s" repeatCount="indefinite" /></path>
    </g>)}
    <text x="120" y="248" fontSize="11" fill={INK} opacity=".7">规矩被拆光：流赤裸地流</text>
    <rect x="250" y="104" width="110" height="48" rx="10" fill={INK} />
    <text x="305" y="125" textAnchor="middle" fontSize="12" fill="#fff">公理：只看数量</text>
    <text x="305" y="143" textAnchor="middle" fontSize="13" fill={GOLD}>dy / dx → M′</text>
    <path d="M360 128 H560" stroke={GOLD} strokeWidth="12" strokeDasharray="14 8" fill="none">
      <animate attributeName="stroke-dashoffset" values="44;0" dur=".7s" repeatCount="indefinite" /></path>
    <text x="470" y="112" textAnchor="middle" fontSize="12" fill={GOLD}>资本-货币（满盈身体）</text>
    <text x="470" y="160" textAnchor="middle" fontSize="11" fill={INK} opacity=".7">一条巨大的、不问来历的流</text>
  </>;
}

export default function ThreeMachines() {
  const [i, setI] = useState(2), m = MACHINES[i];
  const cell = (mm, k) => <td key={mm.id} style={{
    padding: "8px 10px", verticalAlign: "top", fontSize: 14, borderTop: "1px solid var(--line)",
    background: mm.id === m.id ? "rgba(184,134,43,.12)" : "transparent", opacity: mm.id === m.id ? 1 : .55, transition: ".3s",
  }}>{mm.rows[k]}</td>;
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg">{MACHINES.map((x, j) =>
        <button key={x.id} className={i === j ? "on" : ""} onClick={() => setI(j)}>{x.icon} {x.name}</button>)}</div>
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}>
          {m.name} <span className="muted-it">· {m.era}</span> · 满盈身体：<b>{m.body}</b> · 操作：<b style={{ color: m.color }}>{m.op}</b>
        </div>
        <p style={{ margin: "6px 0 0" }}>{m.gist}</p>
      </div>
      <svg key={m.id} viewBox="0 0 600 260" style={{ width: "100%", maxHeight: 300, background: "var(--paper)", borderRadius: 14 }}>
        <Diagram m={m} />
      </svg>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
          <thead><tr>
            <th style={{ textAlign: "left", fontSize: 13, color: "var(--muted)", padding: "4px 10px", width: 110 }}>同一批流</th>
            {MACHINES.map((mm, j) => <th key={mm.id} onClick={() => setI(j)} style={{
              textAlign: "left", padding: "4px 10px", fontFamily: "var(--serif)", cursor: "pointer",
              color: mm.id === m.id ? mm.color : "var(--muted)",
            }}>{mm.icon} {mm.name}</th>)}
          </tr></thead>
          <tbody>
            {FLOWS.map(f => <tr key={f.k}>
              <td style={{ padding: "8px 10px", borderTop: "1px solid var(--line)", fontWeight: 600, color: f.color, fontSize: 14 }}>{f.icon} {f.name}</td>
              {MACHINES.map(mm => cell(mm, f.k))}
            </tr>)}
            {EXTRA.map(e => <tr key={e.k}>
              <td style={{ padding: "8px 10px", borderTop: "1px solid var(--line)", fontWeight: 600, fontSize: 14 }}>{e.name}</td>
              {MACHINES.map(mm => cell(mm, e.k))}
            </tr>)}
          </tbody>
        </table>
      </div>
      <p style={{ margin: 0, fontSize: 15, color: "var(--muted)" }}>
        看最后一行：俄狄浦斯在原始机器里是「空位」，在专制机器里被象征地占据，只有在资本主义里才被真正住进去——这就是第 11 节的标题「终于，俄狄浦斯」。参见 <C id="oedipus_colony">俄狄浦斯：私密的殖民地</C>。
      </p>
    </div>);
}
