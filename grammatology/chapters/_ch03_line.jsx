// 第 3 章专属图解 ②：线性书写 vs 多维书写（神话图示 / 程序网络）
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16";

// 同一组「意思单元」：一次狩猎与祭祀
const NODES = [
  { id: "hunter", pic: "🏹", label: "猎人" },
  { id: "deer", pic: "🦌", label: "鹿" },
  { id: "moon", pic: "🌙", label: "月亮" },
  { id: "river", pic: "💧", label: "河" },
  { id: "fire", pic: "🔥", label: "火" },
  { id: "clan", pic: "👥", label: "氏族" },
];
const LINKS = [
  ["hunter", "deer", "追逐"], ["deer", "moon", "鹿是月的化身"], ["moon", "river", "潮汐/季节"],
  ["river", "clan", "水源与领地"], ["clan", "fire", "祭祀"], ["fire", "deer", "献祭"],
  ["hunter", "clan", "身份"], ["moon", "fire", "历法节庆"], ["hunter", "river", "猎场"],
];

const VIEWS = [
  {
    label: "➖ 线性书写", color: BLUE,
    title: "一维：一个接一个，像声音一样流过",
    text: "字母文字把意思排成一条线：先「猎人」，再「在月夜」，再「于河边」……读的时候一次只有一个点是「现在」，前面的已经过去，后面的还没到。这正对应着传统的时间观：由一个个「现在」连成的直线。线性让记账、存储、积累变得安全高效，代价是压抑一切排不进这条线的东西。",
  },
  {
    label: "🕸️ 神话图示 mythogram", color: GOLD,
    title: "多维：没有起点，所有关系同时在场",
    text: "勒鲁瓦-古朗所说的「神话图示」把符号摆成一张网：鹿既是猎物，又是月亮的化身，又连着献祭的火。意思不服从先后顺序，你可以从任何一点读起。点一点各个节点，看它同时牵出几条关系。在这里，技术、艺术、宗教和经济还没有被拆成不同领域。",
  },
  {
    label: "💻 今天：程序与网络", color: VIOLET,
    title: "再次多维：跳转、分支、链接",
    text: "从遗传密码到电脑程序、超链接、数据库：今天的「书写」越来越不是一条线，而是可分支、可跳转、可同时调用的结构。德里达说，这不是退回原始，而是让我们看清：被线性统治的理性本身，也只是另一种、另一个时代的「神话图示」。线性书写的终结，也就是「书本」的终结。",
  },
];

const W = 560, H = 285;
const circlePos = NODES.map((_, i) => {
  const a = -Math.PI / 2 + i * 2 * Math.PI / NODES.length;
  return [W / 2 + 180 * Math.cos(a), 135 + 95 * Math.sin(a)];
});
const linePos = NODES.map((_, i) => [55 + i * 90, 120]);
const netPos = [[70, 70], [210, 50], [350, 90], [490, 60], [260, 200], [450, 200]];

function Diagram({ v, sel, setSel }) {
  const pos = v === 0 ? linePos : v === 1 ? circlePos : netPos;
  const P = id => pos[NODES.findIndex(n => n.id === id)];
  const col = VIEWS[v].color;
  const visibleLinks = v === 0 ? [] : v === 1 ? LINKS : LINKS.filter((_, i) => i % 2 === 0 || i === 7);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxHeight: 320, background: "var(--paper)", borderRadius: 14 }}>
      <defs><marker id="arL" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill={col} /></marker></defs>
      {v === 0 && <>
        <line x1="20" y1="120" x2={W - 20} y2="120" stroke={col} strokeWidth="3" markerEnd="url(#arL)" />
        <text x="20" y="200" fontSize="13" fill={INK} opacity=".6">过去 ←</text>
        <text x={W - 20} y="200" textAnchor="end" fontSize="13" fill={INK} opacity=".6">→ 未来</text>
        <circle r="34" cy="120" fill="none" stroke={RED} strokeWidth="3">
          <animate attributeName="cx" values={linePos.map(p => p[0]).join(";")} dur="6s" calcMode="discrete" repeatCount="indefinite" />
        </circle>
        <text x={W / 2} y="235" textAnchor="middle" fontSize="13" fill={RED}>红圈 = 唯一的「现在」，一次只读一个</text>
      </>}
      {visibleLinks.map(([a, b, lab], i) => {
        const [x1, y1] = P(a), [x2, y2] = P(b);
        const on = sel && (sel === a || sel === b);
        return <g key={a + b} opacity={sel ? (on ? 1 : .15) : .7}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth={on ? 3 : 1.6}
            strokeDasharray={v === 2 ? "6 5" : undefined} markerEnd={v === 2 ? "url(#arL)" : undefined}>
            {v === 2 && <animate attributeName="stroke-dashoffset" values="22;0" dur="1s" repeatCount="indefinite" />}
          </line>
          {v === 1 && on && <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 4} textAnchor="middle" fontSize="12" fill={INK} fontWeight="600"
            style={{ paintOrder: "stroke", stroke: "#f6f1e7", strokeWidth: 4 }}>{lab}</text>}
        </g>;
      })}
      {NODES.map((n, i) => {
        const [x, y] = pos[i];
        const on = sel === n.id;
        return <g key={n.id} style={{ transform: `translate(${x}px,${y}px)`, cursor: v === 0 ? "default" : "pointer", transition: "transform .7s ease" }}
          onClick={() => v !== 0 && setSel(on ? null : n.id)}>
          <circle r="28" fill="#fff" stroke={on ? RED : col} strokeWidth={on ? 3 : 2} />
          <text y="9" textAnchor="middle" fontSize="26">{n.pic}</text>
          <text y="46" textAnchor="middle" fontSize="12" fill={INK}>{v === 2 ? ["输入", "函数", "条件", "链接", "数据库", "输出"][i] + "·" + n.label : n.label}</text>
          {v === 0 && <text y="-38" textAnchor="middle" fontSize="11" fill={INK} opacity=".55">第 {i + 1} 个</text>}
        </g>;
      })}
      {v === 2 && <circle r="7" fill={RED}>
        <animateMotion dur="5s" repeatCount="indefinite" path={`M70,70 L210,50 L260,200 L490,60 L450,200 L70,70`} />
      </circle>}
    </svg>);
}

export default function LineVsMulti() {
  const [v, setV] = useState(0);
  const [sel, setSel] = useState(null);
  const m = VIEWS[v];
  return (
    <div className="card" style={{ display: "grid", gap: 10 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{VIEWS.map((x, j) =>
        <button key={j} className={v === j ? "on" : ""} onClick={() => { setV(j); setSel(v === 1 && j === 1 ? sel : j === 1 ? "deer" : null); }}>{x.label}</button>)}</div>
      <Diagram v={v} sel={sel} setSel={setSel} />
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20, color: m.color }}>{m.title}</div>
        <p style={{ margin: "6px 0 0" }}>{m.text}</p>
        {v === 1 && <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: 14 }}>（示意：节点与关系为编者虚构的狩猎神话，用来说明「多维」的结构，不是书中的具体图示。）</p>}
      </div>
      <p style={{ margin: 0, paddingTop: 10, borderTop: "1px solid var(--line)", fontSize: 15 }}>
        德里达的要点：<C id="linearization">线性化</C>不是文字的天性，而是一场长达数千年的「压抑」；它从未彻底成功，因为文字内部始终有间隔、差异与非线性的东西。
        当书写重新变得多维，我们也必须换一种方式重读过去的书。
      </p>
    </div>);
}
