// 第 1 章专属图解：
//  1) PresenceLadder：「离真理的距离」阶梯（传统 ⇄ 解构）
//  2) BookVsText：书本（封闭总体） ⇄ 文本（开放的指涉网络）
//  3) SousRature：被划掉的「存在」
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#6b6257";

const CSS = `
@keyframes g1fade{from{opacity:0}to{opacity:1}}
.g1-fade{animation:g1fade .9s ease both}
.g1-node{cursor:pointer;transition:transform .9s cubic-bezier(.5,0,.2,1)}
.g1-node:hover rect{filter:brightness(1.06)}
.g1-bar{transition:width .9s ease, opacity .6s}
.g1-x{transition:opacity .6s}
`;

/* ---------------- 1. 离真理的距离 ---------------- */
const LAYERS = [
  {
    id: "truth", label: "事物 · 真理", en: "the thing / logos", color: RED, presence: 100,
    t: [230, 52], d: [140, 80], cid: "transcendental_signified",
    trad: "阶梯的顶端：事物本身、真理、终极意义（在中世纪是上帝的无限理智）。它被设想为先于一切符号、自己就完满在场的东西——符号只是去「指向」它。",
    dec: "解构视角下，这个「不需要再指向别处」的终极所指被划掉了：德里达说，没有任何一个所指能逃出符号相互指涉的游戏，所指一进场就已经在充当能指。",
  },
  {
    id: "mind", label: "心灵经验", en: "pathēmata tēs psychēs", color: GOLD, presence: 90,
    t: [230, 142], d: [500, 80], cid: "logocentrism",
    trad: "亚里士多德：心灵经验像镜子一样「自然地」映照事物，所以人人相同。这一层几乎是透明的，透明到亚里士多德有时可以略过不提。",
    dec: "心灵中的「意思」也不是先于符号的纯粹在场：要想到「红」，就得把它与「不是红」的东西区分开，思想本身已经活在差异与踪迹之中。",
  },
  {
    id: "voice", label: "声音（口语）", en: "phonē", color: BLUE, presence: 75,
    t: [230, 232], d: [140, 300], cid: "phonocentrism",
    trad: "口语是心灵的「第一符号」。说话时我同时听见自己——声音仿佛不经过外部世界，能指在此「自我抹除」，意义好像直接从心里流出来。所以声音离心灵最近。",
    dec: "声音同样是一套差异系统（「八」和「爸」只靠细微差别区分），也要靠可重复的形式才能被认出。它并不比文字更「在场」，只是更善于让人忘记自己是符号。",
  },
  {
    id: "letter", label: "文字", en: "gramma", color: GREEN, presence: 35,
    t: [230, 322], d: [500, 300], cid: "signifier_of_signifier",
    trad: "文字是「符号的符号」：只是把声音记下来的技术工具，外在、次要、会让人遗忘，甚至是「死的字母」。离真理隔了两层中介。",
    dec: "「能指的能指」本来是贬低文字的说法，德里达却说它恰恰描述了一切语言的运作：每个符号都只指向别的符号。于是「文字」不再是附属品，而成了理解整个语言的模型——这就是扩展了的「文字」。",
  },
];
const EXTRA = [[40, 190], [600, 190], [320, 30], [320, 370], [40, 370], [600, 30]];

function nodePos(L, mode) { return mode === 0 ? L.t : L.d; }

export function PresenceLadder() {
  const [mode, setMode] = useState(0);
  const [sel, setSel] = useState("voice");
  const L = LAYERS.find(x => x.id === sel);
  const center = id => { const [x, y] = nodePos(LAYERS.find(l => l.id === id), mode); return [x, y]; };
  const pairs = [];
  for (let i = 0; i < LAYERS.length; i++) for (let j = i + 1; j < LAYERS.length; j++) pairs.push([LAYERS[i].id, LAYERS[j].id]);
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <style>{CSS}</style>
      <div className="seg">
        <button className={mode === 0 ? "on" : ""} onClick={() => setMode(0)}>🏛️ 传统视角：逻各斯中心主义</button>
        <button className={mode === 1 ? "on" : ""} onClick={() => setMode(1)}>🕸️ 解构视角：处处都是踪迹</button>
      </div>
      <svg viewBox="0 0 640 400" style={{ width: "100%", maxHeight: 420, background: "var(--paper)", borderRadius: 14 }}>
        <defs>
          <marker id="g1arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MUTED} />
          </marker>
        </defs>

        {mode === 0 && <g key="trad" className="g1-fade">
          {/* 左侧距离标尺 */}
          <line x1="50" y1="40" x2="50" y2="350" stroke={MUTED} strokeWidth="2" markerEnd="url(#g1arr)" />
          <text x="34" y="200" fontSize="13" fill={MUTED} textAnchor="middle" transform="rotate(-90 34 200)">离真理越来越远 · 中介越来越多</text>
          {/* 层间箭头与关系 */}
          {[["自然的相似（人人相同）", 80, 114], ["约定的象征（因民族而异）", 170, 204], ["约定之上的约定：符号的符号", 260, 294]].map(([t, y1, y2], k) =>
            <g key={k}>
              <line x1="230" y1={y1} x2="230" y2={y2} stroke={MUTED} strokeWidth="2" markerStart="url(#g1arr)" />
              <text x="240" y={(y1 + y2) / 2 + 5} fontSize="12" fill={MUTED}>{t}</text>
            </g>)}
          <text x="510" y="22" fontSize="13" textAnchor="middle" fill={INK} fontWeight="600">传统认为的「在场程度」（示意）</text>
          {LAYERS.map(l => <g key={l.id}>
            <rect x="420" y={l.t[1] - 9} width="180" height="18" rx="9" fill="#e7dcc6" />
            <rect className="g1-bar" x="420" y={l.t[1] - 9} width={1.8 * l.presence} height="18" rx="9" fill={l.color} opacity=".85" />
            <text x={420 + 1.8 * l.presence - 8} y={l.t[1] + 5} fontSize="11" fill="#fff" textAnchor="end">{l.presence}%</text>
          </g>)}
          <text x="230" y="390" fontSize="12" fill={MUTED} textAnchor="middle">亚里士多德《解释篇》：口语是心灵经验的符号，文字是口语的符号</text>
        </g>}

        {mode === 1 && <g key="dec" className="g1-fade">
          {/* 节点间、以及通往画面之外的指涉网 */}
          {pairs.map(([a, b], k) => { const [x1, y1] = center(a), [x2, y2] = center(b); return <g key={k}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={VIOLET} strokeWidth="1.5" strokeDasharray="5 5" opacity=".55">
              <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" />
            </line>
            <circle r="4" fill={VIOLET}><animateMotion dur={`${2.4 + k * .3}s`} repeatCount="indefinite" path={`M${x1},${y1} L${x2},${y2} L${x1},${y1}`} /></circle>
          </g>; })}
          {LAYERS.map((l, k) => [EXTRA[k], EXTRA[(k + 2) % EXTRA.length]].map(([ex, ey], m) =>
            <g key={l.id + m}>
              <line x1={l.d[0]} y1={l.d[1]} x2={ex} y2={ey} stroke={VIOLET} strokeWidth="1" strokeDasharray="3 5" opacity=".35" />
              <circle cx={ex} cy={ey} r="7" fill="none" stroke={VIOLET} opacity=".5">
                <animate attributeName="r" values="5;9;5" dur="2s" begin={`${k * .4}s`} repeatCount="indefinite" /></circle>
            </g>))}
          <rect x="225" y="176" width="190" height="48" rx="10" fill="#f6f1e7" />
          <text x="320" y="196" fontSize="15" fill={VIOLET} textAnchor="middle" fontWeight="600">没有终点的指涉</text>
          <text x="320" y="216" fontSize="12" fill={MUTED} textAnchor="middle">每一项都只是「能指的能指」</text>
          <text x="320" y="392" fontSize="12" fill={MUTED} textAnchor="middle">虚线圈：网络之外还有更多符号——指涉从不在某处停下来</text>
        </g>}

        {/* 节点（两种视角共用，位置平滑过渡） */}
        {LAYERS.map(l => { const [x, y] = nodePos(l, mode), on = sel === l.id; return (
          <g key={l.id} className="g1-node" style={{ transform: `translate(${x - 95}px,${y - 26}px)` }} onClick={() => setSel(l.id)}>
            <rect width="190" height="52" rx="12" fill={mode === 1 ? "#fff" : l.color}
              stroke={on ? INK : (mode === 1 ? VIOLET : "none")} strokeWidth={on ? 3 : 1.5} />
            <text x="95" y="23" fontSize="16" textAnchor="middle" fill={mode === 1 ? (l.id === "truth" ? RED : INK) : "#fff"} fontWeight="600">{l.label}</text>
            <text x="95" y="42" fontSize="11" textAnchor="middle" fill={mode === 1 ? MUTED : "#fff"} fontStyle="italic">{l.en}</text>
            {l.id === "truth" && <g className="g1-x" opacity={mode === 1 ? 1 : 0}>
              <line x1="20" y1="4" x2="170" y2="48" stroke={INK} strokeWidth="3" />
              <line x1="170" y1="4" x2="20" y2="48" stroke={INK} strokeWidth="3" />
            </g>}
          </g>); })}
      </svg>
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>
          <span style={{ color: L.color }}>●</span> {L.label} <span className="muted-it">{L.en}</span>
          {" · "}<b>{mode === 0 ? "传统怎么看" : "德里达怎么看"}</b>
        </div>
        <p style={{ margin: "6px 0" }}>{mode === 0 ? L.trad : L.dec}</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>
          相关概念：<C id={L.cid} />　·　点图中任意一层切换说明；切换上方按钮看阶梯如何瓦解。
        </p>
      </div>
    </div>);
}

/* ---------------- 2. 书本 vs 文本 ---------------- */
const PAGES = [
  { b: [190, 95], t: [120, 70] }, { b: [320, 85], t: [300, 45] }, { b: [450, 95], t: [500, 80] },
  { b: [190, 245], t: [90, 250] }, { b: [320, 255], t: [310, 300] }, { b: [450, 245], t: [520, 240] },
];
const TEXT_LINKS = [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [2, 5], [1, 4], [0, 4], [2, 3]];
const OUT = [[0, [-10, 10]], [0, [-10, 140]], [2, [650, 20]], [2, [650, 150]], [3, [-10, 330]], [4, [300, 380]], [5, [650, 330]], [1, [320, -10]]];

export function BookVsText() {
  const [m, setM] = useState(0);
  const pos = i => (m === 0 ? PAGES[i].b : PAGES[i].t);
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <style>{CSS}</style>
      <div className="seg">
        <button className={m === 0 ? "on" : ""} onClick={() => setM(0)}>📕 书本 the book</button>
        <button className={m === 1 ? "on" : ""} onClick={() => setM(1)}>🌐 文本 the text</button>
      </div>
      <svg viewBox="0 0 640 360" style={{ width: "100%", maxHeight: 380, background: "var(--paper)", borderRadius: 14 }}>
        {m === 0 && <g key="b" className="g1-fade">
          <rect x="90" y="30" width="460" height="290" rx="18" fill="#fff" stroke={RED} strokeWidth="5" />
          <rect x="90" y="30" width="22" height="290" rx="6" fill={RED} opacity=".85" />
          <text x="135" y="56" fontSize="12" fill={RED}>封面：开篇 →</text>
          <text x="530" y="312" fontSize="12" fill={RED} textAnchor="end">→ 终章（封底）</text>
          {PAGES.map((_, i) => { const [x, y] = PAGES[i].b; return (
            <line key={i} x1={x} y1={y} x2="320" y2="170" stroke={GOLD} strokeWidth="2" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" values="16;0" dur="1.2s" repeatCount="indefinite" /></line>); })}
          <circle cx="320" cy="170" r="52" fill={GOLD} />
          <text x="320" y="166" fontSize="13" fill="#fff" textAnchor="middle" fontWeight="600">所指的总体</text>
          <text x="320" y="186" fontSize="10.5" fill="#fff" textAnchor="middle">上帝·自然·原意</text>
        </g>}
        {m === 1 && <g key="t" className="g1-fade">
          {TEXT_LINKS.map(([a, b], k) => { const [x1, y1] = PAGES[a].t, [x2, y2] = PAGES[b].t; return (
            <g key={k}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={VIOLET} strokeWidth="1.6" opacity=".6" />
              <circle r="3.5" fill={VIOLET}><animateMotion dur={`${2 + k * .25}s`} repeatCount="indefinite" path={`M${x1},${y1} L${x2},${y2}`} /></circle></g>); })}
          {OUT.map(([i, [ex, ey]], k) => { const [x, y] = PAGES[i].t; return (
            <g key={"o" + k}><line x1={x} y1={y} x2={ex} y2={ey} stroke={VIOLET} strokeWidth="1.4" strokeDasharray="4 5" opacity=".45" />
              <circle r="3" fill={VIOLET} opacity=".7"><animateMotion dur={`${1.8 + k * .2}s`} repeatCount="indefinite" path={`M${x},${y} L${ex},${ey}`} /></circle></g>); })}
          <g opacity=".5"><circle cx="320" cy="170" r="30" fill="none" stroke={MUTED} strokeDasharray="4 4" />
            <text x="320" y="175" fontSize="16" fill={MUTED} textAnchor="middle">？</text></g>
          <text x="320" y="352" fontSize="12" fill={MUTED} textAnchor="middle">没有封面封底，没有统摄一切的中心，线索一直通向画面之外</text>
        </g>}
        {PAGES.map((p, i) => { const [x, y] = pos(i); return (
          <g key={i} className="g1-node" style={{ transform: `translate(${x - 34}px,${y - 20}px)` }}>
            <rect width="68" height="40" rx="8" fill={m === 0 ? "#f3ead8" : "#fff"} stroke={m === 0 ? RED : VIOLET} strokeWidth="1.5" />
            <text x="34" y="25" fontSize="12" textAnchor="middle" fill={INK}>{m === 0 ? `第 ${i + 1} 章` : `文段 ${i + 1}`}</text>
          </g>); })}
      </svg>
      {m === 0
        ? <div><b style={{ fontFamily: "var(--serif)", fontSize: 19 }}>书本：一个被看管的总体</b>
          <p style={{ margin: "6px 0" }}>有开头有结尾，每一页都最终指向同一个先于它、在它之外的意义总体（上帝的计划、自然、作者的原意）。德里达说，书本的观念是神学与<C id="logocentrism">逻各斯中心主义</C>对文字的「百科全书式保护」——防止文字那种散开、断裂、格言式的能量。</p>
          <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>类比：一套装订好的纸质百科全书，有目录、有索引，一切条目都由编委会的总体规划来担保。</p></div>
        : <div><b style={{ fontFamily: "var(--serif)", fontSize: 19 }}>文本：没有中心的指涉之网</b>
          <p style={{ margin: "6px 0" }}>书本被拆开后露出的是「文本的表面」：每个片段只通过与别的片段的差异和引用而获得意义，没有一个站在网外的中心来最终担保。这不是混乱，而是文字本来的样子——德里达说正在各个领域发生的「书本的毁坏」，就是把它暴露出来。</p>
          <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>类比：维基百科的链接、网页里的超链接、注释里的注释——你永远可以再点下去，没有一页能宣布「意义到此为止」。（这只是帮助理解的类比，德里达的「文本」不等于超文本技术。）</p></div>}
    </div>);
}

/* ---------------- 3. 被划掉的「存在」 ---------------- */
export function SousRature() {
  const [x, setX] = useState(true);
  return (
    <div className="card" style={{ display: "grid", gap: 10, justifyItems: "center", textAlign: "center" }}>
      <style>{CSS}</style>
      <svg viewBox="0 0 320 120" style={{ width: "100%", maxWidth: 380 }}>
        <text x="160" y="72" fontSize="54" textAnchor="middle" fontFamily="var(--serif)" fill={INK}>Being</text>
        <text x="160" y="106" fontSize="16" textAnchor="middle" fill={MUTED}>存在</text>
        <g className="g1-x" opacity={x ? 1 : 0}>
          <line x1="70" y1="18" x2="250" y2="88" stroke={RED} strokeWidth="5" strokeLinecap="round" />
          <line x1="250" y1="18" x2="70" y2="88" stroke={RED} strokeWidth="5" strokeLinecap="round" />
        </g>
      </svg>
      <button className="chip" onClick={() => setX(!x)}>{x ? "去掉叉号" : "打上叉号"}</button>
      <p style={{ margin: 0, maxWidth: 560, textAlign: "left" }}>
        {x
          ? "划掉了，却仍然看得见：这个词不够用（它会把「存在」误当成一个现成在场的东西），可我们又没有别的词可用。海德格尔这样书写「存在」，德里达称之为一个时代「最后的文字」，同时也是「最初的文字」。"
          : "不划掉时，「存在」像一个透明的窗口，仿佛直接把我们带到终极意义面前——这正是在场形而上学的信念。"}
      </p>
    </div>);
}
