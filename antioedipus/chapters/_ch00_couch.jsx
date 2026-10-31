// 序言专属图解 (c)：「沙发 vs 街头」—— 同一批社会要素，两种分析方式。
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", GOLD = "#b8862b";

const ITEMS = [
  { t: "老板", e: "💼", as: "爸爸" }, { t: "警察", e: "👮", as: "爸爸" }, { t: "学校", e: "🏫", as: "爸爸" },
  { t: "祖国", e: "🚩", as: "妈妈" }, { t: "金钱", e: "💰", as: "爸爸" }, { t: "战争新闻", e: "📺", as: "爸爸" },
  { t: "邻居", e: "🏘️", as: "妈妈" }, { t: "工厂", e: "🏭", as: "爸爸" },
];
const CX = 300, CY = 165, R = 132;
const pos = k => { const a = (k / ITEMS.length) * Math.PI * 2 - Math.PI / 2; return [CX + R * 1.55 * Math.cos(a), CY + R * Math.sin(a)]; };
// 街头模式：网络连线（示意）
const LINKS = [[0, 4], [0, 7], [1, 3], [1, 5], [2, 6], [2, 0], [3, 5], [4, 7], [5, 6], [6, 7], [3, 4], [1, 2]];

export default function CouchVsStreet() {
  const [m, setM] = useState(0);
  const couch = m === 0;
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ margin: 0 }}>
        <button className={couch ? "on" : ""} onClick={() => setM(0)}>🛋️ 沙发上：精神分析</button>
        <button className={!couch ? "on" : ""} onClick={() => setM(1)}>🚶 街头：精神分裂分析</button>
      </div>
      <svg key={m} viewBox="0 0 600 370" style={{ width: "100%", maxHeight: 420, background: "var(--paper)", borderRadius: 14 }}>
        {couch ? <>
          {/* 社会要素被拉进三角形并被「翻译」成爸爸妈妈 */}
          {ITEMS.map((it, k) => { const [x, y] = pos(k); return <g key={k}>
            <line x1={x} y1={y} x2={CX} y2={CY} stroke={RED} strokeWidth="1.5" strokeDasharray="5 6" opacity=".55">
              <animate attributeName="stroke-dashoffset" values="0;-22" dur="1s" repeatCount="indefinite" /></line>
            <circle r="4" fill={RED}><animateMotion dur="2.2s" begin={`${k * .25}s`} repeatCount="indefinite" path={`M${x},${y} L${CX},${CY}`} /></circle>
            <text x={x} y={y + 6} textAnchor="middle" fontSize="20">{it.e}</text>
            <text x={x} y={y + 26} textAnchor="middle" fontSize="12.5" fill={INK}>{it.t}</text>
            <text x={x} y={y + 41} textAnchor="middle" fontSize="11.5" fill={RED}>→「其实是{it.as}」</text>
          </g>; })}
          <polygon points={`${CX},${CY - 52} ${CX - 58},${CY + 40} ${CX + 58},${CY + 40}`} fill="#fff" stroke={RED} strokeWidth="3" />
          <text x={CX} y={CY - 58} textAnchor="middle" fontSize="13" fontWeight="700" fill={RED}>爸爸</text>
          <text x={CX - 66} y={CY + 56} textAnchor="middle" fontSize="13" fontWeight="700" fill={RED}>妈妈</text>
          <text x={CX + 66} y={CY + 56} textAnchor="middle" fontSize="13" fontWeight="700" fill={RED}>我</text>
          <text x={CX} y={CY + 20} textAnchor="middle" fontSize="26">🛋️</text>
          <text x={CX} y={CY - 8} textAnchor="middle" fontSize="18">👂<animate attributeName="font-size" values="18;24;18" dur="2s" repeatCount="indefinite" /></text>
          <text x="300" y="360" textAnchor="middle" fontSize="12.5" fill={INK} opacity=".7">一切社会内容都被导向同一个家庭三角，再由「一只大耳朵」解释（示意图）</text>
        </> : <>
          {LINKS.map(([a, b], k) => { const [x1, y1] = pos(a), [x2, y2] = pos(b); return (
            <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={k % 3 === 0 ? GOLD : k % 3 === 1 ? GREEN : BLUE} strokeWidth="2.2" strokeDasharray="8 7" opacity=".7">
              <animate attributeName="stroke-dashoffset" values="0;-30" dur={`${1.2 + (k % 4) * .4}s`} repeatCount="indefinite" /></line>); })}
          {ITEMS.map((it, k) => { const [x, y] = pos(k); return <g key={k}>
            <circle cx={x} cy={y} r="24" fill="#fff" stroke={GREEN} strokeWidth="2" />
            <text x={x} y={y + 7} textAnchor="middle" fontSize="20">{it.e}</text>
            <text x={x} y={y + 40} textAnchor="middle" fontSize="12.5" fill={INK}>{it.t}</text>
          </g>; })}
          <circle cx={CX} cy={CY} r="44" fill="none" stroke={GREEN} strokeWidth="2" strokeDasharray="4 5">
            <animate attributeName="r" values="40;50;40" dur="3s" repeatCount="indefinite" /></circle>
          <text x={CX} y={CY - 4} textAnchor="middle" fontSize="22">👥</text>
          <text x={CX} y={CY + 20} textAnchor="middle" fontSize="12" fill={GREEN} fontWeight="700">群体自己分析</text>
          <text x="300" y="360" textAnchor="middle" fontSize="12.5" fill={INK} opacity=".7">欲望直接投注在社会场上：要素彼此连接、流动，没有一个中心三角（示意图）</text>
        </>}
      </svg>
      {couch ? <p style={{ margin: 0 }}>
        希姆借亨利·米勒的话描绘诊疗室：你躺在柔软的沙发上，分析师是一只按分钟收费、永远耐心的「大耳朵」。无论你谈的是老板、警察还是战争，
        最后都会被解读成「爸爸-妈妈-我」的<C id="oedipus">俄狄浦斯</C>故事。社会被关在门外，问题被「私人化」了。
      </p> : <p style={{ margin: 0 }}>
        <C id="schizoanalysis">精神分裂分析</C>走出诊疗室：老板就是老板，工厂就是工厂，欲望直接投注在这些社会要素上，彼此连接成网。
        分析不再由专家替你完成，而是由<C id="subject_group">群体</C>自己去追问：我们的欲望被哪些权力效应捕获了？哪里还能接出新的连接？
      </p>}
    </div>);
}
