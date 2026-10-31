// 第 6 章专属图解 1：三种文本装置（+ 本书想做的第四种：导体）
// 每种装置都由三极组成：指涉（所表现之物）· 媒介/文本皮肤 · 客户身体。
// 关键看：「凝固的有机身体」被放在哪一极，运动（强度）又出现在哪一极。
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", ICE = "#7d93a8";

// 三种节点画法
function Frozen({ x, y, label, sub }) {
  // 凝固的有机身体：规整的格子
  return <g>
    <rect x={x - 46} y={y - 40} width="92" height="80" rx="6" fill="#e8eef3" stroke={BLUE} strokeWidth="2.5" />
    {[0, 1, 2].map(r => [0, 1, 2].map(c =>
      <rect key={r + "-" + c} x={x - 34 + c * 24} y={y - 28 + r * 20} width="18" height="14" fill="none" stroke={ICE} strokeWidth="1.5" />))}
    <text x={x} y={y + 60} textAnchor="middle" fontSize="14" fill={INK} fontWeight="600">{label}</text>
    {sub && <text x={x} y={y + 78} textAnchor="middle" fontSize="12" fill={BLUE}>{sub}</text>}
  </g>;
}
function Moving({ x, y, label, sub, color = RED }) {
  // 运动/强度：抖动的碎片
  const pts = [[-26, -18], [18, -24], [-6, 4], [28, 12], [-30, 22], [6, 28], [22, -4]];
  return <g>
    <circle cx={x} cy={y} r="44" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 5" opacity=".6">
      <animateTransform attributeName="transform" type="rotate" from={`0 ${x} ${y}`} to={`360 ${x} ${y}`} dur="9s" repeatCount="indefinite" />
    </circle>
    {pts.map(([dx, dy], i) =>
      <circle key={i} cx={x + dx} cy={y + dy} r={5 + (i % 3) * 2} fill={color} opacity=".8">
        <animate attributeName="cx" values={`${x + dx};${x + dx + (i % 2 ? 7 : -7)};${x + dx}`} dur={`${0.7 + i * 0.13}s`} repeatCount="indefinite" />
        <animate attributeName="cy" values={`${y + dy};${y + dy + (i % 2 ? -6 : 6)};${y + dy}`} dur={`${0.9 + i * 0.11}s`} repeatCount="indefinite" />
      </circle>)}
    <text x={x} y={y + 60} textAnchor="middle" fontSize="14" fill={INK} fontWeight="600">{label}</text>
    {sub && <text x={x} y={y + 78} textAnchor="middle" fontSize="12" fill={color}>{sub}</text>}
  </g>;
}
function Effaced({ x, y, label, sub }) {
  // 被抹除的媒介：透明玻璃
  return <g>
    <rect x={x - 30} y={y - 44} width="60" height="88" rx="4" fill="#ffffff" fillOpacity=".25" stroke={INK} strokeOpacity=".3" strokeDasharray="5 5" />
    <line x1={x - 18} y1={y - 30} x2={x + 6} y2={y - 6} stroke={INK} strokeOpacity=".2" strokeWidth="2" />
    <text x={x} y={y + 60} textAnchor="middle" fontSize="14" fill={INK} opacity=".7">{label}</text>
    {sub && <text x={x} y={y + 78} textAnchor="middle" fontSize="12" fill={INK} opacity=".5">{sub}</text>}
  </g>;
}
function Absent({ x, y, label, sub }) {
  return <g>
    <circle cx={x} cy={y} r="36" fill="none" stroke={INK} strokeOpacity=".25" strokeDasharray="2 6" strokeWidth="2" />
    <text x={x} y={y + 6} textAnchor="middle" fontSize="18" fill={INK} opacity=".35">∅</text>
    <text x={x} y={y + 60} textAnchor="middle" fontSize="14" fill={INK} opacity=".7">{label}</text>
    {sub && <text x={x} y={y + 78} textAnchor="middle" fontSize="12" fill={INK} opacity=".5">{sub}</text>}
  </g>;
}
function Cold({ x, y, label, sub, heat }) {
  // 去情感、匿名的客户：灰色无面孔的身体；heat=true 时显出底下的灼热
  return <g>
    {heat && <circle cx={x} cy={y} r="46" fill={RED} opacity=".22">
      <animate attributeName="r" values="36;52;36" dur="1.4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values=".1;.35;.1" dur="1.4s" repeatCount="indefinite" /></circle>}
    <circle cx={x} cy={y - 18} r="14" fill="#d9dee3" stroke={ICE} strokeWidth="2" />
    <rect x={x - 22} y={y} width="44" height="36" rx="10" fill="#d9dee3" stroke={ICE} strokeWidth="2" />
    <text x={x} y={y + 60} textAnchor="middle" fontSize="14" fill={INK} fontWeight="600">{label}</text>
    {sub && <text x={x} y={y + 78} textAnchor="middle" fontSize="12" fill={BLUE}>{sub}</text>}
  </g>;
}
function Arc({ x1, x2, y, color, dash, up = 70, label }) {
  const mx = (x1 + x2) / 2;
  return <g>
    <path d={`M${x1},${y} Q${mx},${y - up} ${x2},${y}`} fill="none" stroke={color} strokeWidth="2.5" strokeDasharray={dash || "7 6"}>
      <animate attributeName="stroke-dashoffset" values="26;0" dur="0.8s" repeatCount="indefinite" />
    </path>
    {label && <text x={mx} y={y - up / 2 - 8} textAnchor="middle" fontSize="12" fill={color}>{label}</text>}
  </g>;
}

const X = [110, 300, 490], Y = 130;

const MODES = [
  {
    id: "figurative_dispositif", icon: "🎞️", name: "叙事 / 具象", en: "narrative-figurative",
    still: "指涉一端：被表现的身体（「受害者」）", move: "客户身体：碎裂成局部冲动的布朗运动", medium: "被抹除，当作看向「别处」的透明玻璃",
    text: "小说、西部片、具象画、活人画：画面或故事里那个被凝固、被定格的有机身体，像被捕获的猎物；观者（利奥塔挑衅地称其为「客户」）则在另一端激动不已——眼泪、口水、起鸡皮疙瘩，感受在身体的各个碎片上跳来跳去。强度就像电弧，绷在这两极之间；代价是媒介自身的皮肤被隐藏。",
    eg: "萨德式叙事、写实色情、活人画（tableau vivant）、西部片的观众。",
    svg: (heat) => <>
      <Arc x1={X[0] + 46} x2={X[2] - 44} y={Y - 30} color={GOLD} up={90} label="强度电弧" />
      <Frozen x={X[0]} y={Y} label="指涉：被表现之物" sub="不动极 · 有机身体" />
      <Effaced x={X[1]} y={Y} label="媒介 / 文本皮肤" sub="被抹除（透明玻璃）" />
      <Moving x={X[2]} y={Y} label="客户身体" sub="局部冲动乱动" />
    </>,
  },
  {
    id: "abstract_dispositif", icon: "🟦", name: "抽象绘画", en: "abstract",
    still: "客户身体：注意力被收拢、被固定、依附于画", move: "材料本身：画布、颜料、色域之间的微小差异", medium: "不再隐身，它就是运动所在",
    text: "抽象画什么都不表现，不动极从指涉那里搬到了观者身上：他必须聚精会神、把乱跑的局部冲动捆起来。真正动起来的是画的支撑皮肤——一片蓝挨着另一片蓝，同一种白随角度互相掩饰。靠的是差异（disparities），不是对立（oppositions）。观者以为自己在看，其实像猎人一样被画盯着：他成了受害者，画成了施虐的一方。",
    eg: "克利、德劳内、纽曼、罗斯科；反例是只靠体系运作的「庸俗抽象」，它其实是理论式的。",
    svg: (heat) => <>
      <Arc x1={X[1] + 46} x2={X[2] - 30} y={Y - 30} color={BLUE} up={60} label="捕获 / 收拢" />
      <Absent x={X[0]} y={Y} label="指涉" sub="什么也不表现" />
      <g>
        {[["#2c4a6e", -40], ["#34557f", -8], ["#2c4a6e", 24]].map(([c, dx], i) =>
          <rect key={i} x={X[1] + dx - 6} y={Y - 42} width="34" height="84" fill={c} opacity={0.75 + i * 0.08}>
            <animate attributeName="opacity" values={`${0.6 + i * .1};${0.95 - i * .1};${0.6 + i * .1}`} dur={`${1.6 + i * .5}s`} repeatCount="indefinite" />
          </rect>)}
        <text x={X[1]} y={Y + 60} textAnchor="middle" fontSize="14" fill={INK} fontWeight="600">材料 / 色域皮肤</text>
        <text x={X[1]} y={Y + 78} textAnchor="middle" fontSize="12" fill={RED}>在微差中运动</text>
      </g>
      <Frozen x={X[2]} y={Y} label="客户身体" sub="不动极 · 被收拢" />
    </>,
  },
  {
    id: "theoretical_body", icon: "📐", name: "理论", en: "theoretical",
    still: "文本本身（有机身体）+ 客户身体（去情感、匿名）", move: "表面上：没有。底下：横杠在冷之中飞转", medium: "文本就是身体：一致、饱和、公理独立、完备",
    text: "理论像抽象画一样不靠拟像，只靠材料（陈述）的组织；但它的身体是凝固的：每条陈述都能从公理推出，没有可以迷路的内部。它像抽象画一样要求读者不动，还额外要求读者去情感——中立、公正、谁都可以，能原样重复它。理论朝着静止运动，伟大的抽象画朝着运动运动。可利奥塔说，这种冷恰恰就是理论特有的热。",
    eg: "公理化的形式系统；Support-Surface 小组把画框、画布摊在地上，等于给绘画写了一套公理。",
    svg: (heat) => <>
      <Arc x1={X[1] + 46} x2={X[2] - 30} y={Y - 30} color={ICE} up={60} label="只接驳匿名碎片" />
      <Absent x={X[0]} y={Y} label="指涉" sub="连指涉性也成了形式性质" />
      <Frozen x={X[1]} y={Y} label="文本 = 有机身体" sub="不动极（自身）" />
      <Cold x={X[2]} y={Y} label="客户身体" sub="去情感 · 可替换" heat={heat} />
      {heat && <circle cx={X[1]} cy={Y} r="50" fill={RED} opacity=".18">
        <animate attributeName="opacity" values=".08;.3;.08" dur="1.1s" repeatCount="indefinite" /></circle>}
    </>,
  },
  {
    id: "conductor", icon: "⚡", name: "导体写作", en: "conductors",
    still: "没有固定的不动极", move: "能量穿过文本与读者，转化方式不可预测", medium: "「不是一本书」，只是力比多的分期碎片",
    text: "本章最后想要的不是第四种「正确」装置，而是一种不去控制接驳的写作：不要求读者与自己同等级、能复述；不预判读者会接收什么；像扔进海里的瓶子，但里面没有信息，只有一些能量。作者和读者都只是匿名的导体，传递热与冷、定理与尖叫——有时管用，有时不管用。",
    eg: "济慈说诗人是变色龙；精神分析师本可以是好导体，可惜它仍在找原因与身份。",
    svg: (heat) => <>
      <path d={`M20,${Y} C120,${Y - 70} 200,${Y + 70} 300,${Y} S480,${Y - 70} 580,${Y}`} fill="none" stroke={RED} strokeWidth="3" strokeDasharray="10 8">
        <animate attributeName="stroke-dashoffset" values="36;0" dur="0.9s" repeatCount="indefinite" /></path>
      <path d={`M20,${Y + 20} C140,${Y + 80} 220,${Y - 50} 300,${Y + 20} S470,${Y + 70} 580,${Y + 10}`} fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="4 10">
        <animate attributeName="stroke-dashoffset" values="0;28" dur="1.3s" repeatCount="indefinite" /></path>
      <Moving x={X[0]} y={Y} label="词语 / 声音 / 颜色" sub="任何一块皮肤" color={GOLD} />
      <Moving x={X[1]} y={Y} label="文本：碎片" sub="非书 · 分期" />
      <Moving x={X[2]} y={Y} label="读者 / 作者" sub="匿名导体" color={BLUE} />
    </>,
  },
];

export default function ThreeDevices() {
  const [i, setI] = useState(0), [heat, setHeat] = useState(false), m = MODES[i];
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg">{MODES.map((x, j) =>
        <button key={x.id} className={i === j ? "on" : ""} onClick={() => setI(j)}>{x.icon} {x.name}</button>)}</div>
      <svg key={m.id + heat} viewBox="0 0 600 240" style={{ width: "100%", maxHeight: 300, background: "var(--paper)", borderRadius: 14 }}>
        {m.svg(heat)}
      </svg>
      {m.id === "theoretical_body" && <div>
        <button className={"st-btn"} onClick={() => setHeat(!heat)}
          style={{ border: "1px solid var(--line)", background: heat ? RED : "var(--paper)", color: heat ? "#fff" : "var(--ink)", borderRadius: 99, padding: "4px 14px", cursor: "pointer", font: "inherit", fontSize: 14 }}>
          {heat ? "🔥 已用力比多的眼睛看：冷就是它的热" : "👁 用力比多经济学家的眼睛看理论"}</button>
      </div>}
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}><C id={m.id}>{m.name}</C> <span className="muted-it">{m.en}</span></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 8, margin: "10px 0", fontSize: 14 }}>
          <div style={{ background: "#e8eef3", borderRadius: 10, padding: "8px 10px" }}><b style={{ color: BLUE }}>❄ 不动极：</b>{m.still}</div>
          <div style={{ background: "#f6e3df", borderRadius: 10, padding: "8px 10px" }}><b style={{ color: RED }}>✦ 运动在：</b>{m.move}</div>
          <div style={{ background: "#f3ecd9", borderRadius: 10, padding: "8px 10px" }}><b style={{ color: GOLD }}>▭ 媒介：</b>{m.medium}</div>
        </div>
        <p style={{ margin: "6px 0" }}>{m.text}</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>📖 书中一例：{m.eg}</p>
      </div>
    </div>);
}
