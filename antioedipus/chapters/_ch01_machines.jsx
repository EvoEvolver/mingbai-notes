// 第 1 章专属图解 (a)：欲望机器流水线——点部件把它们接成链，看流怎样被截断、再放出
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16";
const FLOWCOL = [RED, GOLD, BLUE, GREEN, VIOLET, "#2f6f73", "#c0567a"];

// out：这台机器放出的流；oe：精神分析（漫画化）会把它读成谁
const PARTS = {
  breast: { icon: "🤱", name: "乳房", out: "奶流", oe: "妈妈" },
  mouth: { icon: "👄", name: "嘴", out: "气息与话语", oe: "我" },
  gut: { icon: "🌀", name: "肠胃", out: "养分与残渣", oe: "我" },
  anus: { icon: "🕳️", name: "肛门", out: "粪便", oe: "我" },
  sun: { icon: "☀️", name: "太阳", out: "光线", oe: "爸爸" },
  star: { icon: "✨", name: "星空", out: "星光", oe: "爸爸" },
  tree: { icon: "🌳", name: "叶绿素", out: "氧气", oe: "妈妈" },
  lung: { icon: "🫁", name: "肺", out: "呼吸", oe: "我" },
  eye: { icon: "👁️", name: "眼睛", out: "目光", oe: "我" },
  hand: { icon: "✋", name: "手", out: "动作", oe: "我" },
  pocket: { icon: "🧥", name: "口袋", out: "石子", oe: "妈妈" },
  socket: { icon: "🔌", name: "插座", out: "电流", oe: "爸爸" },
  phone: { icon: "📱", name: "屏幕", out: "光与图像", oe: "妈妈" },
  ear: { icon: "👂", name: "耳朵", out: "声音", oe: "我" },
};

const PRESETS = [
  { label: "🍼 婴儿", chain: ["breast", "mouth", "gut", "anus"], note: "书中最基本的一对：乳房产出奶流，嘴把它截下来；嘴又接着肠胃，肠胃再接着肛门……" },
  { label: "🏔️ 伦茨的散步", chain: ["star", "eye", "sun", "tree", "lung", "mouth"], note: "毕希纳笔下的伦茨在山里散步：星辰、阳光、植物都与他的身体接在一起，他想成为一台「叶绿素/光合作用机器」中的一个部件。" },
  { label: "☀️ 施瑞伯", chain: ["sun", "anus"], note: "施瑞伯法官说太阳光线照进他的肛门——「太阳肛门」。作者说：放心，它真的在运转，有感受、有产出，他还能讲出一套理论。" },
  { label: "🪨 贝克特吸石子", chain: ["pocket", "hand", "mouth", "hand", "pocket"], note: "贝克特笔下人物把 16 颗石子在四个口袋之间轮转，嘴是「吸石子的机器」。作者问：在这个循环里，性快感在哪儿被生产？" },
  { label: "🚇 通勤（现代示意）", chain: ["socket", "phone", "eye", "hand", "phone"], note: "现代类比（示意，非书中例子）：电网→屏幕→眼睛→手指→屏幕……你每天就是一台台小机器的接线员。" },
];

const MAXN = 7;

export default function DesireChain() {
  const [chain, setChain] = useState(PRESETS[0].chain);
  const [note, setNote] = useState(PRESETS[0].note);
  const [oedipus, setOedipus] = useState(false);
  const add = id => { if (chain.length < MAXN) { setChain([...chain, id]); setNote(null); } };
  const n = chain.length;
  const W = 640, H = 230;
  const pos = i => ({ x: n === 1 ? W / 2 : 60 + i * ((W - 120) / (n - 1)), y: i % 2 ? 132 : 92 });

  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 14, color: "var(--muted)" }}>预设：</span>
        <div className="seg" style={{ marginBottom: 0 }}>
          {PRESETS.map(p => <button key={p.label} onClick={() => { setChain(p.chain); setNote(p.note); setOedipus(false); }}>{p.label}</button>)}
          <button onClick={() => { setChain([]); setNote(null); setOedipus(false); }}>🧹 清空</button>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        {!oedipus && n === 0 && <text x={W / 2} y={H / 2} textAnchor="middle" fontSize="16" fill="#6b6257">点下面的部件，开始接线……</text>}
        {!oedipus && chain.slice(0, -1).map((id, i) => {
          const a = pos(i), b = pos(i + 1), col = FLOWCOL[i % FLOWCOL.length];
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          return <g key={"l" + i}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={col} strokeWidth="7" strokeLinecap="round" strokeDasharray="10 9" opacity=".85">
              {/* 时断时续：欲望机器只在不断故障中运转 */}
              <animate attributeName="stroke-dashoffset" values="38;19;19;0" keyTimes="0;.45;.6;1" dur={`${1.1 + (i % 3) * .25}s`} repeatCount="indefinite" />
            </line>
            <text x={mx} y={my + (i % 2 ? -22 : 30)} textAnchor="middle" fontSize="13" fill={col} fontWeight="600">{PARTS[id].out}</text>
            <text x={mx} y={my + (i % 2 ? -38 : 46)} textAnchor="middle" fontSize="11" fill="#6b6257">和……</text>
          </g>;
        })}
        {!oedipus && chain.map((id, i) => {
          const p = pos(i), part = PARTS[id];
          return <g key={"n" + i} style={{ cursor: "pointer" }} onClick={() => { setChain(chain.filter((_, j) => j !== i)); setNote(null); }}>
            <circle cx={p.x} cy={p.y} r="28" fill="#fffdf8" stroke={INK} strokeWidth="2" />
            <text x={p.x} y={p.y + 9} textAnchor="middle" fontSize="25">{part.icon}</text>
            <text x={p.x} y={p.y + (i % 2 ? 50 : -38)} textAnchor="middle" fontSize="13" fill={INK}>{part.name}</text>
          </g>;
        })}
        {!oedipus && n > 0 && <text x={W - 10} y={H - 10} textAnchor="end" fontSize="11" fill="#6b6257">点链上的部件可拆下 · 流动时断时续是故意的</text>}

        {oedipus && (() => {
          const V = { "爸爸": { x: 170, y: 48 }, "妈妈": { x: 470, y: 48 }, "我": { x: 320, y: 150 } };
          const groups = { "爸爸": [], "妈妈": [], "我": [] };
          chain.forEach(id => groups[PARTS[id].oe].push(PARTS[id]));
          return <g>
            <polygon points="170,48 470,48 320,150" fill="none" stroke={INK} strokeWidth="2.5" opacity=".7" />
            {Object.entries(V).map(([k, v]) => <g key={k}>
              <circle cx={v.x} cy={v.y} r="30" fill={k === "我" ? "#fbf3df" : "#fbeee9"} stroke={RED} strokeWidth="2" />
              <text x={v.x} y={v.y + 6} textAnchor="middle" fontSize="17" fontWeight="700" fill={RED}>{k}</text>
              {groups[k].map((p, j) => <text key={j} x={v.x + (k === "我" ? (j - (groups[k].length - 1) / 2) * 26 : (k === "爸爸" ? -60 : 60) + (j % 2) * (k === "爸爸" ? -24 : 24))}
                y={k === "我" ? v.y + 56 : v.y + 6 + Math.floor(j / 2) * 24 - 8} textAnchor="middle" fontSize="18" opacity=".8">{p.icon}</text>)}
            </g>)}
            <text x="320" y="225" textAnchor="middle" fontSize="12" fill="#6b6257">所有的流都停了：每个部件都被翻译成家庭剧里的一个角色（漫画化示意）</text>
          </g>;
        })()}
      </svg>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {Object.entries(PARTS).map(([id, p]) =>
          <button key={id} disabled={chain.length >= MAXN || oedipus} onClick={() => add(id)}
            style={{ border: "1px solid var(--line)", background: "var(--paper)", borderRadius: 99, padding: "3px 10px", font: "inherit", fontSize: 14, cursor: "pointer", opacity: chain.length >= MAXN || oedipus ? .4 : 1 }}>
            {p.icon} {p.name}</button>)}
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <div className="seg" style={{ marginBottom: 0 }}>
          <button className={!oedipus ? "on" : ""} onClick={() => setOedipus(false)}>⚙️ 欲望生产视角</button>
          <button className={oedipus ? "on" : ""} onClick={() => setOedipus(true)} disabled={n === 0}>🛋️ 交给精神分析解读</button>
        </div>
      </div>

      {!oedipus ? <div>
        <p style={{ margin: "0 0 6px", fontFamily: "var(--serif)", fontSize: 18 }}>
          {n ? chain.map(id => PARTS[id].name).join(" 和 ") + " 和……" : "（空）"}</p>
        {note && <p style={{ margin: "0 0 6px", fontSize: 15 }}>📖 {note}</p>}
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, color: "var(--muted)" }}>
          {chain.slice(0, -1).map((id, i) => <li key={i}><b style={{ color: "var(--ink)" }}>{PARTS[chain[i + 1]].name}</b> 截取 {PARTS[id].name} 放出的「{PARTS[id].out}」，再放出自己的「{PARTS[chain[i + 1]].out}」给下一台。</li>)}
          {n === 1 && <li>一台机器总在等着接上另一台：它产出「{PARTS[chain[0]].out}」，谁来截取？</li>}
        </ul>
        <p style={{ margin: "8px 0 0", fontSize: 14 }}>这就是 <C id="connective_synthesis">连接综合</C>：每台 <C id="desiring_machine">欲望机器</C> 都只是「接收一股流 → 截断它 → 放出新流」的部件，链条可以无限地「和……和……」下去，没有总导演，也没有剧本。</p>
      </div> : <div>
        <p style={{ margin: "0 0 6px", fontSize: 15 }}>精神分析的问法：乳房「其实是」妈妈，太阳和施瑞伯的上帝「其实是」爸爸，所有器官都归到「我」。链条被折叠成一个三角形，流不再流动，只剩下「爸爸-妈妈-我」的剧情。</p>
        <p style={{ margin: 0, fontSize: 15 }}>作者的反问：俄狄浦斯根本不是一开始就摆在那里的「给定事实」，它以<b>对欲望机器的一场巨大压抑</b>为前提。比起「它代表谁」，更该问：<b>这台机器怎么运转？能产出什么效果？</b>（图中把哪个部件读成谁，是对精神分析的漫画化示意。）</p>
      </div>}
    </div>);
}
