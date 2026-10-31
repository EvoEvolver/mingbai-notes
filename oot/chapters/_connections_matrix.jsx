// 全书脉络 · 三条线索穿越三个时代（演变矩阵）
import { useState } from "react";
import { C } from "@kit";

const COLS = [
  { t: "文艺复兴", s: "16 世纪 · 第 2 章", c: "#b8862b" },
  { t: "古典时代", s: "17–18 世纪 · 第 3–6 章", c: "#2c4a6e" },
  { t: "现代", s: "19 世纪起 · 第 7–9 章", c: "#9b2c1f" },
  { t: "人文科学借走的模型", s: "第 10 章", c: "#5b3f7a" },
];

const ROWS = [
  {
    id: "form", icon: "▦", label: "知识的总形式", c: "#2f6f73",
    cells: [
      <>万物以<C id="ch02:analogy">相似</C>互相牵连，靠<C id="ch02:signature">标记</C>读出来</>,
      <><C id="ch03:mathesis">mathesis</C> 与 <C id="ch03:taxinomia">taxinomia</C>：一切摆进一张<C id="ch03:table">表格</C></>,
      <><small>⚡ <C id="ch07:age_of_history">历史取代秩序</C></small><br />秩序<C id="ch08:table_to_depth">从表格沉到深处</C>，<C id="ch08:historicity">历史性进入事物</C></>,
      <>三门学科与数学、哲学张成<C id="ch10:trihedron">三面体</C>，人文科学挤在缝里</>,
    ],
    story: "这一行是另外三行的「地基」：文艺复兴用相似把世界织成一张网，古典时代用表征把世界摊成一张表，现代则把秩序的根据挪到表格下面看不见的、有时间的力量里。下面三行都只是这条总线在不同领域的投影。",
  },
  {
    id: "lang", icon: "🗣", label: "语言", c: "#5b3f7a",
    cells: [
      <><C id="ch02:language_as_thing">语言是世界中的物</C>；符号是<C id="ch02:ternary_sign">三元结构</C>，知识即<C id="ch02:commentary_text">评注</C></>,
      <><C id="ch03:binary_sign">二元符号</C>；<C id="ch04:general_grammar">普遍语法</C>研究词序如何表征思想，核心是<C id="ch04:verb_to_be">动词「是」</C></>,
      <><small>⚡ <C id="ch07:inflection">屈折系统</C></small><br /><C id="ch08:verbal_root">动词词根</C>与<C id="ch08:language_kinship">语系</C>：<C id="ch08:language_object">语言降为对象</C>；同时<C id="ch08:literature">文学诞生</C>、<C id="ch09:return_of_language">语言回归</C></>,
      <><C id="ch10:signification_system">意义 / 系统</C></>,
    ],
    story: "语言的命运最曲折：16 世纪它是要破译的物，古典时代它变成透明的分析工具（因此「普遍语法」而非「语言学」），19 世纪它又变回有自身历史和规律的对象。但被拆散的语言在文学中重新聚拢——福柯认为，正是这种聚拢在威胁「人」。",
  },
  {
    id: "life", icon: "🌿", label: "自然 → 生命", c: "#3c6b4a",
    cells: [
      <>植物上的<C id="ch02:signature">标记</C>指明药性；动物的「历史」包括<C id="ch02:divinatio_eruditio">关于它的一切文字</C></>,
      <><C id="ch05:natural_history">博物学</C>：用<C id="ch05:structure">结构</C>和<C id="ch05:character">特征</C>排表，<C id="ch05:no_biology_yet">还没有「生命」</C></>,
      <><small>⚡ <C id="ch07:organic_structure">有机结构</C></small><br />居维叶的<C id="ch08:function_plan">功能与组织计划</C>，<C id="ch08:life_discontinuity">生命的断裂</C>，<C id="ch08:life_death">生命与死亡</C></>,
      <><C id="ch10:function_norm">功能 / 规范</C></>,
    ],
    story: "从「读物上的记号」到「看可见的结构」，再到「推断不可见的功能」：观看的对象一路从表面下沉。古典博物学故意少看、只看形状数量排列大小；19 世纪的生物学则必须穿透表面去找器官服务的功能——于是才第一次有了「生命」。",
  },
  {
    id: "wealth", icon: "🪙", label: "财富 → 劳动", c: "#b8862b",
    cells: [
      <><C id="ch06:money_as_mark">货币即标记</C>：金属本身珍贵，所以能衡量一切</>,
      <><C id="ch06:analysis_of_wealth">财富分析</C>：<C id="ch06:mercantilism">货币因交换而珍贵</C>，<C id="ch06:value_exchange">价值在交换中诞生</C></>,
      <><small>⚡ <C id="ch07:labour_measure">劳动作为尺度</C></small><br />李嘉图：<C id="ch08:labour_value">劳动是价值之源</C>，前提是<C id="ch08:scarcity_finitude">稀缺与有限性</C></>,
      <><C id="ch10:conflict_rule">冲突 / 规则</C></>,
    ],
    story: "货币先是「自带价值的标记」，再是「表征财富的符号」，最后价值本身被追溯到表征之外的劳动。注意这里的「16 世纪」格子在第 6 章开头讲，而不在第 2 章——它和自然物上的标记属于同一种逻辑。",
  },
];

export default function Matrix() {
  const [row, setRow] = useState("lang");
  const r = ROWS.find(x => x.id === row);
  const cell = { padding: "10px 12px", background: "var(--card)", borderRadius: 12, fontSize: 14.5, lineHeight: 1.65 };
  return <div>
    <div style={{ overflowX: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "118px repeat(3, minmax(170px, 1fr)) minmax(120px, .7fr)", gap: 8, minWidth: 820 }}>
        <div />
        {COLS.map((c, i) => <div key={i} style={{ padding: "6px 10px", borderBottom: `3px solid ${c.c}` }}>
          <b style={{ color: c.c }}>{c.t}</b><br /><small style={{ color: "var(--muted)" }}>{c.s}</small></div>)}
        {ROWS.map(x => {
          const on = x.id === row;
          return [
            <button key={x.id} onClick={() => setRow(x.id)} style={{
              font: "inherit", textAlign: "left", cursor: "pointer", borderRadius: 12, padding: "10px 12px",
              border: `2px solid ${on ? x.c : "var(--line)"}`, background: on ? x.c : "var(--paper)", color: on ? "#fff" : "var(--ink)", fontWeight: 600,
            }}>{x.icon} {x.label}</button>,
            ...x.cells.map((ct, i) => <div key={x.id + i} style={{ ...cell, opacity: on ? 1 : .55, outline: on ? `2px solid ${x.c}` : "none", transition: ".25s" }}>{ct}</div>),
          ];
        })}
      </div>
    </div>
    <div className="callout key" style={{ marginTop: 16 }}><b>{r.icon} {r.label}这条线怎么走：</b><p>{r.story}</p></div>
    <p style={{ color: "var(--muted)", fontSize: 14 }}>点击左侧行名切换线索；格子里带下划线的词都可点开概念卡，卡片顶部有「📖 跳到该章」的链接。⚡ 标出的是第 7 章里那一步「过渡」。</p>
  </div>;
}
