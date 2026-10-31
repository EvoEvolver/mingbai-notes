// 全书脉络 · 「人」的线索：从前言的预告到人之死，八站分步讲解；图中那个「空位」随步骤变化
import { StepThrough, C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#6b6257";
const STATIONS = ["前言", "第1章", "第3–6章", "第7章", "第8章", "第9章", "第10章", "结尾"];

function Figure({ x, y, op = 1, fill = INK, dash }) {
  return <g opacity={op} style={{ transition: "opacity .6s" }}>
    <circle cx={x} cy={y - 34} r="15" fill={dash ? "none" : fill} stroke={fill} strokeWidth="2" strokeDasharray={dash ? "4 4" : "none"} />
    <path d={`M${x - 26} ${y + 30} Q${x - 24} ${y - 14} ${x} ${y - 14} Q${x + 24} ${y - 14} ${x + 26} ${y + 30} Z`} fill={dash ? "none" : fill} stroke={fill} strokeWidth="2" strokeDasharray={dash ? "4 4" : "none"} />
  </g>;
}

function Scene({ i }) {
  const P = { x: 330, y: 150 };
  const frame = i <= 2;              // 古典的「表格 / 画」
  const forces = i >= 3 && i <= 6;   // 生命、劳动、语言从三面挤压
  const filled = i >= 4 && i <= 6;
  const doubled = i >= 5 && i <= 6;
  return <svg viewBox="0 0 660 260" style={{ width: "100%", maxHeight: 300, background: "var(--paper)", borderRadius: 14 }}>
    {/* 车站条 */}
    {STATIONS.map((s, j) => <g key={s}>
      {j > 0 && <line x1={40 + (j - 1) * 83} x2={40 + j * 83} y1="22" y2="22" stroke={j <= i ? RED : "#d9cdb6"} strokeWidth="3" />}
      <circle cx={40 + j * 83} cy="22" r={j === i ? 8 : 5} fill={j <= i ? RED : "#d9cdb6"} />
      <text x={40 + j * 83} y="44" textAnchor="middle" fontSize="11" fill={j === i ? INK : MUTED} fontWeight={j === i ? 700 : 400}>{s}</text>
    </g>)}
    {/* 古典：画 / 表格，人只是一个空位 */}
    <g opacity={frame ? 1 : .15} style={{ transition: "opacity .6s" }}>
      <rect x="70" y="70" width="170" height="150" rx="4" fill="#efe6d4" stroke={INK} strokeWidth="1.5" />
      {[0, 1, 2, 3].map(r => [0, 1, 2].map(c => <rect key={r + "-" + c} x={82 + c * 52} y={82 + r * 34} width="44" height="26" fill="none" stroke={BLUE} opacity=".5" />))}
      <text x="155" y="238" textAnchor="middle" fontSize="12" fill={MUTED}>表征的表格（画内）</text>
      {i <= 2 && <line x1="240" y1="145" x2={P.x - 32} y2={P.y} stroke={GOLD} strokeDasharray="5 5" strokeWidth="1.5">
        <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" /></line>}
    </g>
    {/* 中央的位置 */}
    <circle cx={P.x} cy={P.y} r="56" fill="none" stroke={filled ? RED : GOLD} strokeWidth="2.5" strokeDasharray={filled ? "none" : "7 6"}>
      {!filled && <animate attributeName="r" values="52;58;52" dur="2.4s" repeatCount="indefinite" />}
    </circle>
    {i === 0 && <text x={P.x} y={P.y + 6} textAnchor="middle" fontSize="15" fill={GOLD} fontWeight="700">将来的「人」？</text>}
    {(i === 1 || i === 2) && <><text x={P.x} y={P.y - 2} textAnchor="middle" fontSize="15" fill={GOLD} fontWeight="700">空位</text>
      <text x={P.x} y={P.y + 18} textAnchor="middle" fontSize="11" fill={MUTED}>{i === 1 ? "国王 · 观者 · 画家" : "只有「人性」，没有「人」"}</text></>}
    {i === 3 && <text x={P.x} y={P.y + 6} textAnchor="middle" fontSize="14" fill={RED} fontWeight="700">表征裂开</text>}
    {filled && <Figure x={P.x} y={P.y + 10} fill={RED} />}
    {doubled && <Figure x={P.x + 44} y={P.y + 14} fill={RED} dash />}
    {doubled && <text x={P.x + 20} y={P.y + 78} textAnchor="middle" fontSize="12" fill={RED}>复本：对象 ⇄ 条件</text>}
    {i === 7 && <>
      <Figure x={P.x} y={P.y + 10} fill={MUTED} op={.35} dash />
      <path d="M200 225 Q260 205 320 225 T440 225 T560 225" fill="none" stroke={BLUE} strokeWidth="3">
        <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M200 225 Q260 205 320 225 T440 225 T560 225;M200 220 Q260 240 320 220 T440 220 T560 220;M200 225 Q260 205 320 225 T440 225 T560 225" /></path>
      <text x={P.x} y="250" textAnchor="middle" fontSize="12" fill={MUTED}>海边沙滩上的一张脸</text></>}
    {/* 三股力量 */}
    {[{ x: 520, y: 90, l: "生命", c: GREEN }, { x: 560, y: 150, l: "劳动", c: GOLD }, { x: 520, y: 210, l: "语言", c: VIOLET }].map(k =>
      <g key={k.l} opacity={forces ? 1 : .12} style={{ transition: "opacity .6s" }}>
        <line x1={k.x - 26} y1={k.y} x2={P.x + 62} y2={P.y + (k.y - 150) * .4} stroke={k.c} strokeWidth="2.5" />
        <circle cx={k.x} cy={k.y} r="22" fill={k.c} /><text x={k.x} y={k.y + 5} textAnchor="middle" fontSize="13" fill="#fff" fontWeight="700">{k.l}</text>
      </g>)}
  </svg>;
}

const steps = [
  { label: "预告", content: <p>前言在结尾抛出全书最惊人的论断：<C id="ch00:man_invention">人是晚近的发明</C>。这里的「人」不是生物学上的人类，而是知识中那个<b>既被研究、又负责认识</b>的特殊形象。它有出生日期，也就可能有终点。</p> },
  { label: "宫娥的空位", content: <p>《宫娥》里所有目光都汇向画外的一点，那里同时属于模特、观者和画家——<C id="ch01:sovereign_place">君主之位</C>。可这个位置永远不被画出来：<C id="ch01:absent_subject">表征的主体必然缺席</C>。古典表征什么都能摆出，唯独摆不出「为谁、由谁」表征的那个人。</p> },
  { label: "古典：没有人", content: <p>古典知识有「人性」、有关于人的种种论述，却没有作为知识对象的「人」。因为表征被认为能自己连接自己：<C id="ch03:duplicated_representation">表征在自身中表出自身</C>，<C id="ch04:general_grammar">语法</C>、<C id="ch05:natural_history">博物学</C>、<C id="ch06:analysis_of_wealth">财富分析</C>都在表格内部完成，不需要一个额外的奠基者。</p> },
  { label: "表征裂开", content: <p>18 世纪末，<C id="ch07:representation_limits">表征失去了奠基能力</C>：劳动、有机结构、屈折这些东西在表征之外决定着秩序。康德的<C id="ch07:critique">批判</C>开始追问表征的条件，劳动、生命、语言则成了<C id="ch07:objective_transcendentals">客观的「先验」</C>。</p> },
  { label: "有限的人", content: <p>政治经济学里，人在<C id="ch08:scarcity_finitude">稀缺与死亡的威胁下劳动</C>；生物学里，<C id="ch08:life_death">生命与死亡相连</C>；语文学里，语言有它自己的历史。人第一次以「有限者」的身份出现：被生命、劳动、语言从三面限定。</p> },
  { label: "人及其复本", content: <p>现代思想把这种限制翻转为根基——<C id="ch09:analytic_of_finitude">有限性分析</C>。人于是站进<C id="ch09:place_of_king">国王的位置</C>，成为<C id="ch09:empirico_transcendental">经验—先验复本</C>，并拖着一个孪生的影子：<C id="ch09:unthought">非思</C>。哲学由此沉入<C id="ch09:anthropological_sleep">人类学之眠</C>。</p> },
  { label: "人文科学", content: <p>人文科学正是在这个复本位置上研究人：不研究生命、劳动、语言本身，而研究<C id="ch10:duplication">人如何表征它们</C>。而精神分析、民族学这些<C id="ch10:counter_sciences">反科学</C>逆流而上，把人拆回到他之所以可能的条件里。</p> },
  { label: "人之死", content: <p>当<C id="ch09:return_of_language">语言重新聚拢</C>，支撑「人」的那套布局就可能瓦解。<C id="ch09:death_of_man">人之死</C>不是人类灭绝，而是一个知识形象的退场；福柯用一个画面收尾：<C id="ch10:death_of_man">人会像海边沙滩上的一张脸那样被抹去</C>。</p> },
];

export default function ManThread() {
  return <StepThrough steps={steps} render={i => <Scene i={i} />} />;
}
