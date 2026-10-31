// 第 2 章专属图解 B：欲望机器的三种断流（流的切割 / 链的脱离 / 残余切分），可点击机器部件
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#6b6257";

const PARTS = {
  flow: {
    color: BLUE, icon: "🔪", name: "① 流的切割", fr: "coupure-prélèvement", cid: "flow_break",
    synth: "连接综合 · 力比多（libido）作为「提取能」 · 生产的生产",
    text: "每台机器都接在一条连续的物质流（hylè）上，像火腿切片机一样从中切下一份：嘴切奶流（也切空气流、声音流），肛门切粪便流。但切割不是连续的反面——正是切割才把被切的东西设定为「连续的流」。而且每台机器对下游来说又是一条流：奶牛群→嘴→胃→肠→肛门，「然后……然后……」。",
    analogy: "视频平台的「切片」：从 24 小时不停的直播流里切出一段；这段切片对推荐算法来说又成了新的流，算法再切一次推给你。（现代类比）",
  },
  chain: {
    color: GOLD, icon: "🧱", name: "② 链的脱离", fr: "coupure-détachement", cid: "chain_detachment",
    synth: "析取综合 · 神意（Numen）作为「脱离能」 · 记录的生产",
    text: "每台机器还内置一种「代码」，记录它切哪条流、在哪切、给谁留位置。这些代码组成链条，但链条由「本身不表意的符号」拼成，像混了几种字母表的乱码：一个象形字、一头路过的小象、爸爸的胡子、一只鞋。链条不断有砖块（bricks）脱落、被搬到别处，这就是 schizze（裂片）。",
    analogy: "表情包与梗：从电影、新闻、广告里拆下来的碎块，脱离原来的语境，被随手拼进别的对话，照样「起作用」，却说不清它「意味着」什么。（现代类比）",
  },
  rest: {
    color: VIOLET, icon: "🧍", name: "③ 残余切分", fr: "coupure-reste", cid: "residual_break",
    synth: "合取综合 · 快感（Voluptas）作为「残余能」 · 消费的生产",
    text: "机器运转之后，旁边会「剩下」一点东西：主体。它不是先在的、坐镇中央的「我」，而是机器边上的一个附件，随着每一次切割和脱离被重新生出来——「原来那是我！」。它分到的是一份收入、一份剩余，而不是一个缺口（所以阉割那套以「缺」为中心的模型在这里很糟糕）。",
    analogy: "跑步 App 的周报说你是「早起型跑者」：不是先有这个身份才去跑，而是跑完之后「结算」出来的一份。下周再跑，又结算出一个略有不同的你。（现代类比）",
  },
};

const ORDER = ["flow", "chain", "rest"];

export default function ThreeBreaks() {
  const [k, setK] = useState("flow");
  const all = k === "burp";
  const on = id => all || k === id;
  const op = id => (on(id) ? 1 : .22);
  const p = PARTS[k];
  const glyphs = ["字", "🐘", "☀", "ma", "👞", "♪", "🎀"];
  return <div className="card" style={{ display: "grid", gap: 14 }}>
    <div className="seg" style={{ marginBottom: 0 }}>
      {ORDER.map(id => <button key={id} className={k === id ? "on" : ""} onClick={() => setK(id)}>{PARTS[id].icon} {PARTS[id].name}</button>)}
      <button className={all ? "on" : ""} onClick={() => setK("burp")}>🍼 三合一：婴儿吐奶</button>
    </div>
    <svg viewBox="0 0 680 300" style={{ width: "100%", maxHeight: 340, background: "var(--paper)", borderRadius: 14, cursor: "pointer" }}>
      {/* 无器官身体：记录表面 */}
      <rect x="10" y="236" width="660" height="54" rx="27" fill={MUTED} opacity=".08" />
      <text x="340" y="268" textAnchor="middle" fontSize="12" fill={MUTED}>无器官身体（记录表面 · 代码与主体都在这上面游走）</text>

      {/* ① 流 */}
      <g opacity={op("flow")} onClick={() => setK("flow")} style={{ transition: "opacity .3s" }}>
        <path d="M10 160 C 60 140, 100 180, 150 160 S 230 140, 260 160" fill="none" stroke={BLUE} strokeWidth="16" strokeLinecap="round" opacity=".55"
          strokeDasharray="22 6"><animate attributeName="stroke-dashoffset" values="56;0" dur="1.2s" repeatCount="indefinite" /></path>
        <text x="110" y="208" textAnchor="middle" fontSize="13" fill={BLUE}>连续的流（hylè）：奶</text>
        {/* 切出来的份 */}
        {[0, 1, 2].map(i => <rect key={i} x="360" y="152" width="18" height="16" rx="3" fill={BLUE}>
          <animate attributeName="x" values="350;520" dur="2.4s" begin={`${i * .8}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;1;0" dur="2.4s" begin={`${i * .8}s`} repeatCount="indefinite" />
        </rect>)}
        <text x="450" y="200" textAnchor="middle" fontSize="12" fill={BLUE}>切下的一份份 → 又是下游的流</text>
      </g>

      {/* 机器本体：嘴 */}
      <g onClick={() => setK(all ? "burp" : "flow")}>
        <rect x="262" y="120" width="86" height="80" rx="16" fill="#fff" stroke={INK} strokeWidth="2" />
        <text x="305" y="152" textAnchor="middle" fontSize="15" fill={INK}>嘴-机器</text>
        <path d="M280 172 L330 172" stroke={RED} strokeWidth="3">
          <animate attributeName="d" values="M280 168 L330 168;M280 180 L330 180;M280 168 L330 168" dur=".6s" repeatCount="indefinite" />
        </path>
        <text x="305" y="194" textAnchor="middle" fontSize="11" fill={RED}>咔嚓</text>
      </g>

      {/* ② 代码链与脱落的砖 */}
      <g opacity={op("chain")} onClick={() => setK("chain")} style={{ transition: "opacity .3s" }}>
        <line x1="120" y1="58" x2="560" y2="58" stroke={GOLD} strokeWidth="2" strokeDasharray="2 4" />
        {glyphs.map((g, i) => {
          const x = 130 + i * 62, loose = i === 3;
          return <g key={i}>
            <rect x={x} y="40" width="44" height="36" rx="5" fill="#fff" stroke={GOLD} strokeWidth="2">
              {loose && <animateTransform attributeName="transform" type="translate" values="0 0; 150 -26; 290 10; 0 0" dur="5s" repeatCount="indefinite" />}
            </rect>
            <text x={x + 22} y="65" textAnchor="middle" fontSize="16" fill={INK}>
              {loose && <animateTransform attributeName="transform" type="translate" values="0 0; 150 -26; 290 10; 0 0" dur="5s" repeatCount="indefinite" />}
              {g}</text>
          </g>;
        })}
        <text x="340" y="24" textAnchor="middle" fontSize="12" fill={GOLD}>代码链：不表意的符号拼成的「行话」，砖块不断脱落、被搬走</text>
        <line x1="305" y1="78" x2="305" y2="118" stroke={GOLD} strokeWidth="1.5" strokeDasharray="4 3" />
      </g>

      {/* ③ 残余：主体 */}
      <g opacity={op("rest")} onClick={() => setK("rest")} style={{ transition: "opacity .3s" }}>
        <circle cx="600" cy="150" r="20" fill="none" stroke={VIOLET} strokeWidth="2.5">
          <animate attributeName="r" values="14;22;14" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <text x="600" y="157" textAnchor="middle" fontSize="20">🧍</text>
        <path d="M350 186 C 430 230, 540 220, 585 172" fill="none" stroke={VIOLET} strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="600" y="110" textAnchor="middle" fontSize="12" fill={VIOLET}>「原来那是我！」</text>
        <text x="600" y="200" textAnchor="middle" fontSize="11" fill={VIOLET}>机器旁边的残余</text>
      </g>
    </svg>

    {all ? <div>
      <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}>🍼 三种断流同时发生：婴儿打嗝吐出的奶</div>
      <p style={{ margin: "6px 0" }}>书中的例子极其朴素：婴儿打嗝吐出一口奶。这一口奶同时是 ① 从奶流中切下的那一份被<b>归还</b>；② 在代码链上<b>重演了一次脱离</b>（一种理解：嘴这一次不是「吃」而是「吐」，同一器官换了一种编码）；③ 留下一点<b>残余</b>——属于主体的那一份。</p>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>所以 D&G 说欲望机器「不是隐喻」：它就是按这三种方式切割与被切割的东西。三种断流分别对应上一章的三种综合：连接、析取、合取；也就是生产的生产、记录的生产、消费的生产。断流本身就是综合，不是分析出来的缺口。</p>
    </div> : <div>
      <div style={{ fontFamily: "var(--serif)", fontSize: 21, color: p.color }}><C id={p.cid}>{p.name}</C> <span className="muted-it">{p.fr}</span></div>
      <div style={{ fontSize: 14, color: MUTED, margin: "2px 0 6px" }}>{p.synth}</div>
      <p style={{ margin: "6px 0" }}>{p.text}</p>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>💡 {p.analogy}</p>
    </div>}
  </div>;
}
