// 全书脉络专属图解：「增补逻辑贯穿全书」
// 一条主线上的 9 站，每站都有一对「源头 Y / 外来补充 X」。切换「传统读法 / 解构读法」，
// 看 X 如何从 Y 的圈外被推回圈内：Y 本身早已需要 X。
import { useState } from "react";
import { C, useChapter } from "@kit";

const INK = "#1f1b16", MUTED = "#8a8070";

const STATIONS = [
  { ch: "ch00", tag: "序言", y: "书（完整的意义）", x: "序言", ids: ["ch00:preface_paradox", "ch00:supplement"],
    trad: "序言只是书的附件：书写完了，意义已经齐全，序言不过替读者「事先说一遍」。",
    dec: "可序言恰恰暴露了：书并不能自己把自己交代清楚，它需要一个写在后面、放在前面的补充——书的「完整」本来就有缺口。" },
  { ch: "ch01", tag: "逻各斯", y: "言语 / 逻各斯", x: "文字", ids: ["ch01:logocentrism", "ch01:arche_writing"],
    trad: "真理住在活的声音、内心的「道」里；纸上的字只是声音的影子，是「能指的能指」。",
    dec: "可「能指的能指」恰好描述了一切语言：言语本身也是指向别处的符号。所谓文字的次等性，正是语言的普遍处境——原文字。" },
  { ch: "ch02", tag: "索绪尔", y: "口语（语言学的唯一对象）", x: "字母文字", ids: ["ch02:usurpation", "ch02:difference"],
    trad: "索绪尔：文字只是把语言「记下来」，却篡夺了主人地位、扭曲发音，必须被逐出语言学。",
    dec: "可索绪尔自己的原则——任意性与差异——只有在「铭刻差异」的意义上才能成立。他赶出门的文字，从后门成了语言的模型。" },
  { ch: "ch03", tag: "文字史", y: "纯表音文字", x: "非表音成分", ids: ["ch03:phoneticization", "ch03:complicity_origins"],
    trad: "文字史被讲成一路进化到字母：越来越透明地记录声音，画、谜、标点只是落后的残余。",
    dec: "可从来没有纯表音的文字：间隔、标点、图像与画谜性成分始终在场。「进步」的终点本身就靠非表音之物撑着。" },
  { ch: "ch04", tag: "列维-斯特劳斯", y: "无文字的纯真社会", x: "文字（暴力）", ids: ["ch04:writing_lesson", "ch04:arche_violence"],
    trad: "南比克瓦拉人原本纯洁、彼此以声音相守；文字从外面闯入，带来剥削与暴力。",
    dec: "可他们已经在命名、分类、禁用专名——差异的铭刻（原暴力）早就在那里。文字不是闯入者，而是社会得以成立的条件。" },
  { ch: "ch05", tag: "增补", y: "自然 / 母亲 / 自我在场", x: "替代品", ids: ["ch05:supplement", "ch05:chain_of_supplements"],
    trad: "卢梭：文字、教育、想象、「危险的增补」都是从外面加到自然身上的，一旦加上就败坏了本真。",
    dec: "可每一个被替代的「原物」本身也是替身：泰蕾兹替「妈妈」，「妈妈」替母亲……链条向后追，永远没有第一环。" },
  { ch: "ch06", tag: "音乐", y: "旋律（激情的歌）", x: "和声 / 间隔", ids: ["ch06:melody_harmony", "ch06:spacing"],
    trad: "卢梭：旋律模仿激情，有生命；和声靠计算音程，是北方式的冷漠堕落，从外面压在歌上。",
    dec: "可旋律之所以是旋律，正因为音与音之间有间隔、有可计算的差别。被当作外来之恶的间隔，从一开始就住在歌里面。" },
  { ch: "ch07", tag: "南北", y: "南方：激情、语调", x: "北方：需要、分节", ids: ["ch07:north_south", "ch07:articulation"],
    trad: "南方语言生于激情、是歌；北方语言生于需要、被分节切碎。前者是起源，后者是退化。",
    dec: "可南北只是相对位置：没有分节就没有语言，激情与需要彼此寄居。「北方」不是后来加上的，而是起源的另一面——延异。" },
  { ch: "ch08", tag: "代表", y: "人民亲身在场（主权）", x: "代表 / 字母", ids: ["ch08:sovereignty_representation", "ch08:originary_supplement"],
    trad: "卢梭：主权不可代表，议会、演员、字母都让人缺席于自身，是政治与语言的同一种堕落。",
    dec: "可「活的当下」也要靠重复与标记才能成立：起源处已有增补。卢梭的文本描述了这一点，尽管他的意图宣告的是相反的东西。" },
];

export default function SupplementThread() {
  const { color } = useChapter();
  const [k, setK] = useState(4);
  const [mode, setMode] = useState("trad");
  const s = STATIONS[k], col = color(s.ch), dec = mode === "dec";
  const W = 720, x0 = 50, step = (W - 100) / (STATIONS.length - 1);
  // 示意图几何
  const cy = 120, yx = 250, yr = 70;
  const xPos = dec ? { x: yx + yr + 20, y: cy } : { x: 520, y: cy };
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      {/* 主线：九站 */}
      <svg viewBox={`0 0 ${W} 92`} style={{ width: "100%" }}>
        <line x1={x0} y1="34" x2={W - x0} y2="34" stroke={MUTED} strokeWidth="2" strokeDasharray="4 4" />
        <text x={x0 + 2.5 * step} y="84" textAnchor="middle" fontSize="12" fill={MUTED}>第一部分 · 建立原文字</text>
        <text x={x0 + 6 * step} y="84" textAnchor="middle" fontSize="12" fill={MUTED}>第二部分 · 在卢梭文本中检验</text>
        <line x1={x0 + 3.5 * step} y1="20" x2={x0 + 3.5 * step} y2="88" stroke="var(--line)" strokeWidth="1.5" />
        {STATIONS.map((t, i) => {
          const on = i === k, c = color(t.ch);
          return <g key={t.ch} style={{ cursor: "pointer" }} onClick={() => setK(i)}>
            <circle cx={x0 + i * step} cy="34" r={on ? 15 : 10} fill={on ? c : "var(--card)"} stroke={c} strokeWidth="2.5">
              {on && <animate attributeName="r" values="14;17;14" dur="1.8s" repeatCount="indefinite" />}
            </circle>
            <text x={x0 + i * step} y="38.5" textAnchor="middle" fontSize="11" fontWeight="700" fill={on ? "#fff" : c}>{i}</text>
            <text x={x0 + i * step} y="64" textAnchor="middle" fontSize="11.5" fill={on ? INK : MUTED} fontWeight={on ? 700 : 400}>{t.tag}</text>
          </g>;
        })}
      </svg>

      <div className="seg" style={{ marginBottom: 0 }}>
        <button className={!dec ? "on" : ""} onClick={() => setMode("trad")}>① 传统读法：X 是外来的补充</button>
        <button className={dec ? "on" : ""} onClick={() => setMode("dec")}>② 解构读法：Y 早已需要 X</button>
      </div>

      {/* 示意图：Y 的圆与 X 的位置 */}
      <svg viewBox="0 0 720 240" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        <defs>
          <marker id="cxarr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={MUTED} /></marker>
        </defs>
        <text x="20" y="26" fontSize="13" fill={MUTED}>{s.ch === "ch00" ? "译者序" : `第 ${k} 章`} · 同一个结构</text>
        {/* Y：传统读法下是完整实线圆；解构读法下圆有缺口 */}
        <circle cx={yx} cy={cy} r={yr} fill={col} fillOpacity="0.1" stroke={col} strokeWidth="3"
          strokeDasharray={dec ? "400 40" : "0"} style={{ transition: "stroke-dasharray .6s" }} transform={`rotate(16 ${yx} ${cy})`} />
        <text x={yx - (dec ? 28 : 0)} y={cy - 6} textAnchor="middle" fontSize="14" fontWeight="700" fill={INK}
          style={{ transition: "all .6s" }}>Y</text>
        <text x={yx - (dec ? 28 : 0)} y={cy + 14} textAnchor="middle" fontSize="12" fill={INK} style={{ transition: "all .6s" }}>{s.y}</text>
        <text x={yx} y={cy + yr + 26} textAnchor="middle" fontSize="12" fill={MUTED}>
          {dec ? "「源头」本身就有缺口" : "被当作自足、完整的源头"}</text>
        {/* 箭头：传统读法 X →「加上去」 */}
        <g style={{ opacity: dec ? 0 : 1, transition: "opacity .4s" }}>
          <line x1="455" y1={cy} x2={yx + yr + 8} y2={cy} stroke={MUTED} strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#cxarr)" />
          <text x={(455 + yx + yr) / 2} y={cy - 10} textAnchor="middle" fontSize="12" fill={MUTED}>从外面「加上去」</text>
        </g>
        {/* X：平移进入 Y 的缺口 */}
        <g style={{ transform: `translate(${xPos.x}px, ${xPos.y}px)`, transition: "transform .8s cubic-bezier(.5,0,.2,1)" }}>
          <rect x="-62" y="-24" width="124" height="48" rx="12" fill={dec ? col : "var(--card)"} stroke={col} strokeWidth="2.5"
            style={{ transition: "fill .6s" }} />
          <text x="0" y="-3" textAnchor="middle" fontSize="13" fontWeight="700" fill={dec ? "#fff" : col}>X</text>
          <text x="0" y="14" textAnchor="middle" fontSize="11.5" fill={dec ? "#fff" : INK}>{s.x}</text>
        </g>
        <text x={dec ? yx + yr + 90 : 520} y={cy + 52} textAnchor="middle" fontSize="12" fill={MUTED} style={{ transition: "all .8s" }}>
          {dec ? "补在缺口上：没有它 Y 就不成立" : "次要、外在、危险"}</text>
        {/* 右侧标语 */}
        <text x="600" y="215" textAnchor="middle" fontSize="13" fontWeight="700" fill={dec ? col : MUTED}>
          {dec ? "增补 = 填补 + 顶替" : "增补 = 多余的添加"}</text>
      </svg>

      <div style={{ borderLeft: `4px solid ${col}`, paddingLeft: 14 }}>
        <p style={{ margin: "0 0 8px" }}><b>{dec ? "德里达的读法：" : "传统的说法："}</b>{dec ? s.dec : s.trad}</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: ".95em" }}>
          相关概念：{s.ids.map((id, i) => <span key={id}>{i > 0 && "、"}<C id={id} /></span>)}
          {" · "}<a href={`#/${s.ch}`}>📖 去这一章</a>
        </p>
      </div>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: ".9em" }}>
        点上方圆点换一站，再切换 ①/② 看 X 是否「移进」Y。九站的人物和题材各不相同，结构却始终是同一个。</p>
    </div>);
}
