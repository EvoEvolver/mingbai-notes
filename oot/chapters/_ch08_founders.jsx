// 第 8 章专属图解：三位"现代奠基者"的剖面图 / 李嘉图与马克思的"同一个水池" / 语言成为对象后的补偿
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#6b6257";

/* ------------------------------------------------------------------ */
/* 1. 三位奠基者：秩序从表格表面沉入深处                                 */
/* ------------------------------------------------------------------ */

const PHASES = [
  { label: "① 古典：1775 年以前", cap: "一切秩序都铺在同一张可见的表格上：交换中的价值、可见的特征、表征事物的词。表格下面什么也没有，也不需要有。" },
  { label: "② 第一阶段：1775–1795", cap: "斯密的劳动、Jussieu 的特征从属、语法系统（Wilkins 等）被引进表格，但它们仍只是帮表格排序的「尺子」。不过这些尺子已经无法单靠拆解、重组表征来定义：它们隐隐指向下方。" },
  { label: "③ 第二阶段：约 1795–1825", cap: "李嘉图、居维叶、葆朴把这些概念从表格中拔出来，放到表格「之下」。表格缩成一层薄薄的表面，只是深处力量的效果：秩序由劳动、生命、语言从下往上生成，而且带着时间。" },
];

const FOUNDERS = [
  {
    id: "ricardo", who: "李嘉图", en: "Ricardo", color: GOLD, x: 215,
    old: "财富分析", modern: "政治经济学",
    surface: ["交换 · 需求", "价值 = 彼此表征"], mid: ["劳动（作为尺度）", "斯密"],
    deep: ["劳动 / 生产", "价值之源"], cons: ["生产的线性序列 → 历史", "稀缺 → 人的有限性", "历史趋于静止"],
    concept: "labour_value",
    before: "价值来自商品在交换中相互表征的能力。斯密已重视劳动，但只把它当作一把衡量一切商品的恒定尺子：劳动本身也被看成可以用「多少天的口粮」来表征的东西。",
    move: "把「劳动」拆成两半：一半是被买卖、拿工资的劳动力；另一半是开矿、制造、运输、凭空造出价值的生产活动。后者是一切价值的源头，比任何表征都更原始。价值不再是符号，而成了产品；生产理论从此必须先于流通理论。",
    then: ["每一份劳动的成果都成为下一次劳动的成本：一条线性、累积的生产序列出现，经济第一次与时间、历史相连。", "稀缺不再是「人想要而没有」，而是土地本身的吝啬：人口增长迫使人在死亡威胁下耕种越来越贫瘠的土地。经济学的地基变成人的有限性。", "地租上升、工资卡在糊口线、利润下降，直到人口与生产停止增长：历史最终变缓、凝固。"],
    trap: "李嘉图的「悲观」与马克思的「革命」看似对立，其实只是同一个知识型给出的两种答案，见下方「水池」图解。",
  },
  {
    id: "cuvier", who: "居维叶", en: "Cuvier", color: GREEN, x: 510,
    old: "自然史", modern: "生物学",
    surface: ["可见特征", "形 · 数 · 排列 · 大小"], mid: ["特征的从属", "Jussieu"],
    deep: ["功能 / 组织计划", "不可见的生命"], cons: ["门类之间断裂", "存在条件 · 与环境交换", "生命 ⇄ 死亡"],
    concept: "function_plan",
    before: "博物学家用四个可见变量（形状、数量、排列、大小）描述生物，把它们排进一张从最简单到最复杂、连续无缝的大表格。Jussieu 已发现特征有轻重之分，但只是为了分类更准。",
    move: "让功能压倒器官：鳃和肺在形态上毫无共同点，却「相似」，因为它们都是呼吸这一看不见的功能的实现方式。器官彼此共存、互相牵制，并按功能重要性组成等级，受一个隐藏的「组织计划」支配。",
    then: ["物种在中心（不可见的核心功能）相似，在外围（可见的次要器官）相异：可见的多样，隐藏的统一。", "动物界碎裂为几个互不过渡的大门类（如脊椎动物与无脊椎动物），连续的「存在之链」断了。", "生物靠呼吸、进食与环境不断交换，受「存在条件」支配；生命成为深处的力量，也随时面对死亡。"],
    trap: "人们常说拉马克是进步的进化论先驱、居维叶是顽固的「固定论者」。福柯反过来说：拉马克仍站在古典的连续性上，居维叶打碎连续，才让「生命的历史」成为可能。",
  },
  {
    id: "bopp", who: "葆朴", en: "Bopp", color: BLUE, x: 805,
    old: "普遍语法", modern: "语文学",
    surface: ["表征之词", "动词「是」连接思维"], mid: ["语法系统", "Wilkins 等"],
    deep: ["屈折系统", "语言的内在规律"], cons: ["语音变化有规律", "词根 = 行动与意志", "语系 · 内在历史"],
    concept: "inflection_system",
    before: "词之所以存在，是因为它能表征某个观念；语言的任务是分析表征，动词「是」把语言接到判断和思维上。词根被看作指称具体事物的原始名称，可以无限变形。",
    move: "词能说出意思，前提是它先属于一个语法整体：屈折变化、语音规律、词根结构对整个语言一视同仁地起作用。语言由此按内部结构而不是按「表征得好不好」来区分，所有语言地位平等。",
    then: ["语言被当作声音而非字母来研究：音变「从不任意」，Grimm 的辅音对应表显示语言自带演变原则。", "词根原本表达的是行动、状态、意愿，而不是看到的物：语言扎根于说话的民族及其自由。", "语系之间断裂无过渡；梵语不是希腊语、拉丁语的母亲而是姐姐：语言有了自己的内在历史。"],
    trap: "三件事中，语文学的诞生最不被人注意，好像只是一门冷僻学问；福柯认为它对我们文化的影响反而最深，因为改变的是「语言（包括我们正在说的语言）的存在方式」本身。",
  },
];

const W = 960, H = 560, SURF = 196;

function Grid3({ x, phase, color }) {
  const op = phase === 2 ? .2 : 1;
  const cells = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++)
    cells.push(<rect key={r + "-" + c} x={x - 110 + c * 55} y={78 + r * 34} width={53} height={32} rx={3}
      fill={phase === 2 ? "none" : "#fffdf8"} stroke={color} strokeOpacity=".45" />);
  return <g style={{ opacity: op, transition: "opacity .8s" }}>{cells}</g>;
}

export function ThreeFounders() {
  const [phase, setPhase] = useState(2);
  const [fi, setFi] = useState(0);
  const f = FOUNDERS[fi];
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{PHASES.map((p, j) =>
        <button key={j} className={phase === j ? "on" : ""} onClick={() => setPhase(j)}>{p.label}</button>)}</div>
      <p style={{ margin: 0, fontSize: 15, color: MUTED, minHeight: 50 }}>{PHASES[phase].cap}</p>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", borderRadius: 14, background: "var(--paper)" }}>
        <defs>
          <linearGradient id="ch8deep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e9dec7" /><stop offset="1" stopColor="#c9b892" />
          </linearGradient>
          <marker id="ch8arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={INK} opacity=".55" /></marker>
        </defs>
        <rect x="0" y={SURF} width={W} height={H - SURF} fill="url(#ch8deep)"
          style={{ opacity: phase === 0 ? .35 : 1, transition: "opacity .8s" }} />
        <line x1="0" y1={SURF} x2={W} y2={SURF} stroke={INK} strokeWidth="2" strokeDasharray={phase === 2 ? "3 5" : "none"} opacity=".6" />
        <text transform={`translate(34 ${SURF / 2 + 14}) rotate(-90)`} textAnchor="middle" fontSize="14" fill={MUTED}>表面 · 可见的表格</text>
        <text transform={`translate(34 ${(SURF + H - 40) / 2}) rotate(-90)`} textAnchor="middle" fontSize="14" fill={INK} opacity=".7">深处 · 带着时间的力量</text>

        {FOUNDERS.map((F, k) => {
          const on = k === fi;
          return <g key={F.id} onClick={() => setFi(k)} style={{ cursor: "pointer" }}>
            <rect x={F.x - 140} y="26" width="280" height={H - 40} rx="14" fill="none"
              stroke={F.color} strokeWidth={on ? 3 : 0} opacity=".7" />
            <text x={F.x} y="62" textAnchor="middle" fontSize="20" fontFamily="var(--serif)" fill={F.color} fontWeight="700">
              {phase === 2 ? F.modern : F.old}</text>
            <Grid3 x={F.x} phase={phase} color={F.color} />
            {/* 表面上的标签 */}
            <g style={{ opacity: phase === 2 ? 0 : 1, transition: "opacity .6s" }}>
              <rect x={F.x - 92} y="104" width="184" height="50" rx="10" fill={phase === 1 ? "#fbf3df" : "#fffdf8"} stroke={F.color} strokeWidth="1.5" />
              <text x={F.x} y="125" textAnchor="middle" fontSize="15" fill={INK} fontWeight="600">{phase === 1 ? F.mid[0] : F.surface[0]}</text>
              <text x={F.x} y="145" textAnchor="middle" fontSize="12" fill={MUTED}>{phase === 1 ? F.mid[1] : F.surface[1]}</text>
            </g>
            {phase === 1 && <g>
              <line x1={F.x} y1="158" x2={F.x} y2={SURF + 70} stroke={F.color} strokeWidth="2" strokeDasharray="5 5">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" /></line>
              <text x={F.x} y={SURF + 92} textAnchor="middle" fontSize="22" fill={F.color}>?</text>
            </g>}
            {/* 沉入深处的核心力量 */}
            <g style={{ opacity: phase === 2 ? 1 : 0, transform: `translateY(${phase === 2 ? 0 : -150}px)`, transition: "opacity .7s, transform .9s" }}>
              <line x1={F.x} y1={SURF + 52} x2={F.x} y2="160" stroke={F.color} strokeWidth="2" strokeDasharray="4 6" markerEnd="url(#ch8arr)">
                <animate attributeName="stroke-dashoffset" values="20;0" dur="1.2s" repeatCount="indefinite" /></line>
              <text x={F.x + 8} y="182" fontSize="11" fill={MUTED}>从下往上决定可见之物</text>
              <circle cx={F.x} cy={SURF + 100} r="50" fill={F.color} opacity=".92" />
              <text x={F.x} y={SURF + 94} textAnchor="middle" fontSize="17" fill="#fff" fontWeight="700">{F.who}</text>
              <text x={F.x} y={SURF + 114} textAnchor="middle" fontSize="12" fill="#fff" opacity=".9">{F.en}</text>
              <text x={F.x} y={SURF + 174} textAnchor="middle" fontSize="16" fill={INK} fontWeight="700">{F.deep[0]}</text>
              <text x={F.x} y={SURF + 193} textAnchor="middle" fontSize="12" fill={MUTED}>{F.deep[1]}</text>
              {F.cons.map((c, j) => <g key={j}>
                <rect x={F.x - 112} y={SURF + 206 + j * 30} width="224" height="25" rx="12" fill="#fffdf8" opacity=".85" stroke={F.color} strokeOpacity=".5" />
                <text x={F.x} y={SURF + 223 + j * 30} textAnchor="middle" fontSize="12.5" fill={INK}>{c}</text>
              </g>)}
            </g>
          </g>;
        })}
        {phase === 0 && <text x={(W + 50) / 2} y={SURF + 170} textAnchor="middle" fontSize="16" fill={MUTED}>（表格之下什么也没有：秩序就在表格本身）</text>}
        <g style={{ opacity: phase === 2 ? 1 : 0, transition: "opacity 1s" }}>
          <rect x="60" y={H - 34} width={W - 70} height="26" rx="13" fill={INK} opacity=".85" />
          <text x={(W + 50) / 2} y={H - 16} textAnchor="middle" fontSize="13" fill="#f6f1e7">共同的地基：历史性 + 有限性（劳动的辛苦、生命的死亡、语言的历史）——「人」将在这里登场</text>
        </g>
      </svg>

      <div className="seg" style={{ marginBottom: 0 }}>{FOUNDERS.map((F, k) =>
        <button key={F.id} className={fi === k ? "on" : ""} onClick={() => setFi(k)}>{F.who} · {F.old} → {F.modern}</button>)}</div>
      <div style={{ borderLeft: `4px solid ${f.color}`, paddingLeft: 16 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>{f.who} <span className="muted-it">{f.en}</span> · <C id={f.concept}>{f.deep[0]}</C></div>
        <p style={{ margin: "8px 0" }}><b style={{ color: MUTED }}>古典的做法：</b>{f.before}</p>
        <p style={{ margin: "8px 0" }}><b style={{ color: f.color }}>关键一步：</b>{f.move}</p>
        <div style={{ margin: "8px 0" }}><b style={{ color: f.color }}>于是：</b>
          <ol style={{ margin: "4px 0 0", paddingLeft: 22 }}>{f.then.map((t, j) => <li key={j}>{t}</li>)}</ol></div>
        <p style={{ margin: "8px 0 0", fontSize: 15, color: MUTED }}>⚠️ {f.trap}</p>
      </div>
    </div>);
}

/* ------------------------------------------------------------------ */
/* 2. 李嘉图 vs 马克思：同一个水池里的两种历史终点                        */
/* ------------------------------------------------------------------ */

const ENDINGS = [
  {
    name: "李嘉图的「悲观」", color: GOLD,
    path: "M60,190 C150,170 220,120 300,95 S430,70 540,70",
    end: <><line x1="300" y1="70" x2="560" y2="70" stroke={GOLD} strokeWidth="2" strokeDasharray="2 6" opacity=".7" />
      <text x="420" y="58" textAnchor="middle" fontSize="13" fill={GOLD}>逐渐放缓 → 静止</text></>,
    text: "历史是一台补偿机器：稀缺越紧，劳动越拼，生产越多，但成本也越高。终有一天，人口与生产停止增长，生与死严丝合缝地贴在一起。历史一点点剥去遮掩，把人的有限性以赤裸的形式摆在他面前，然后停下来。",
  },
  {
    name: "马克思的「革命」", color: RED,
    path: "M60,190 C160,175 240,140 320,100 S420,40 450,32",
    end: <><line x1="450" y1="32" x2="450" y2="205" stroke={RED} strokeWidth="3" />
      <path d="M455,150 C490,150 520,140 560,135" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="6 5" />
      <text x="505" y="125" textAnchor="middle" fontSize="13" fill={RED}>翻转 → 另一种时间</text></>,
    text: "历史本身在加剧匮乏：劳动产品不断积累，却不断从劳动者手中溜走，资本借此买入更多劳动。一个阶级被逼到生存边缘，赤裸地经验到需要、饥饿与劳动，因而能认出这是历史造成的异化。只有翻转历史，一种全新形式的时间才会开始。",
  },
];

export function HistoryPool() {
  const [i, setI] = useState(0), e = ENDINGS[i];
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{ENDINGS.map((x, j) =>
        <button key={j} className={i === j ? "on" : ""} onClick={() => setI(j)}>{x.name}</button>)}</div>
      <svg viewBox="0 0 620 260" style={{ width: "100%", maxHeight: 300 }}>
        <rect x="20" y="12" width="580" height="210" rx="60" fill="#dbe7ea" opacity=".55" stroke={BLUE} strokeOpacity=".35" strokeWidth="2" />
        {[0, 1, 2].map(k => <path key={k} d={`M70,${150 + k * 22} q30,-8 60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0`} fill="none" stroke={BLUE} strokeOpacity=".18" strokeWidth="2">
          <animateTransform attributeName="transform" type="translate" values="0,0;-30,0;0,0" dur={`${3 + k}s`} repeatCount="indefinite" /></path>)}
        <line x1="60" y1="205" x2="575" y2="205" stroke={INK} opacity=".4" markerEnd="url(#ch8arr2)" />
        <line x1="60" y1="205" x2="60" y2="25" stroke={INK} opacity=".4" />
        <defs><marker id="ch8arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={INK} opacity=".5" /></marker></defs>
        <text x="570" y="222" textAnchor="end" fontSize="12" fill={MUTED}>历史时间</text>
        <text x="66" y="38" fontSize="12" fill={MUTED}>稀缺与劳动的压力（离死亡多近）</text>
        <path key={i} d={e.path} fill="none" stroke={e.color} strokeWidth="4" strokeLinecap="round" strokeDasharray="700" strokeDashoffset="700">
          <animate attributeName="stroke-dashoffset" from="700" to="0" dur="1.4s" fill="freeze" /></path>
        <g key={"e" + i} opacity="0"><animate attributeName="opacity" from="0" to="1" begin="1.2s" dur=".5s" fill="freeze" />{e.end}</g>
        <text x="310" y="246" textAnchor="middle" fontSize="13" fill={BLUE}>水池 = 19 世纪的同一个知识型（历史性 + 人的有限性 + 历史的终点）</text>
      </svg>
      <p style={{ margin: 0 }}><b style={{ color: e.color }}>{e.name}：</b>{e.text}</p>
      <p style={{ margin: 0, fontSize: 15, color: MUTED }}>两种方案的分歧真实存在，但它们都以<C id="scarcity_finitude">稀缺与有限性</C>为前提，都预言<C id="end_of_history">历史的终点</C>。在福柯看来，这场论战只是「儿童戏水池里的风暴」：激起几道浪花，却没动到池底。</p>
    </div>);
}

/* ------------------------------------------------------------------ */
/* 3. 语言成为对象之后：三重补偿、四个出口                                */
/* ------------------------------------------------------------------ */

const OUTLETS = [
  {
    id: "pure", tag: "补偿一 a", name: "纯化的科学语言", who: "实证主义 · 居维叶的「摹本」", color: BLUE, x: 140, y: 80, side: "形式化",
    text: "语言总会在「认识主体」那一侧冒出来：科学要说出它知道的东西，就离不开语言。于是第一个愿望是把科学语言打磨干净，去掉一切个性和杂质，让它成为非语言知识的一面无雾的镜子。这里的「表格」已不是古典时代给自然分格的网格，而更像一幅忠实的肖像画。",
  },
  {
    id: "logic", tag: "补偿一 b", name: "符号逻辑", who: "Boole → Russell", color: VIOLET, x: 140, y: 240, side: "形式化",
    text: "第二个愿望是寻找一种独立于任何语法、词汇的逻辑，把思维的普遍形式从具体语言里救出来。不是古典时代的「通用语言」，而是在一切语言之外表示思维的形式。福柯说：逻辑代数与印欧语系是普遍语法解体后的两个产物，它们的可能性条件相同。",
  },
  {
    id: "exegesis", tag: "补偿二", name: "注释 / 解释学", who: "马克思 · 尼采 · 弗洛伊德", color: RED, x: 620, y: 160, side: "解释",
    text: "语言成了沉甸甸的历史实在，积淀着一个民族不自知的思维习惯：语法安排是能说什么的先决条件。于是要从观点、哲学乃至科学倒追回使它们成为可能的词。《资本论》第一卷是对「价值」的注释，尼采注释了几个希腊词，弗洛伊德注释那些没说出口的句子。与 16 世纪不同，这不是寻找原初之词，而是揭露我们早已被语言支配。",
  },
  {
    id: "lit", tag: "补偿三（最重要）", name: "文学", who: "浪漫派 → Mallarmé", color: GOLD, x: 380, y: 280, side: "文学",
    text: "就在语言变成知识对象的同时，它在别处以完全相反的方式重组自身：「文学」作为一种独立的语言形态诞生。它是语文学的孪生兄弟，又是对它的抗议：把语言从语法拉回赤裸的言说力量，脱离品味、真实等古典价值，越来越不及物，最终只指向书写这一行为本身。",
  },
];

export function Compensations() {
  const [i, setI] = useState(2), o = OUTLETS[i];
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <svg viewBox="0 0 760 330" style={{ width: "100%" }}>
        {OUTLETS.map((x, j) => <line key={x.id} x1="380" y1="160" x2={x.x} y2={x.y} stroke={x.color} strokeWidth={i === j ? 4 : 2} opacity={i === j ? .9 : .4}>
          {i === j && <animate attributeName="stroke-dasharray" values="0 400;400 0" dur=".8s" fill="freeze" />}</line>)}
        <rect x="280" y="128" width="200" height="64" rx="32" fill={INK} />
        <text x="380" y="156" textAnchor="middle" fontSize="16" fill="#f6f1e7" fontWeight="700">语言降为「对象之一」</text>
        <text x="380" y="176" textAnchor="middle" fontSize="12" fill="#f6f1e7" opacity=".8">失去透明，有了自己的密度与历史</text>
        <text x="30" y="156" fontSize="13" fill={VIOLET} fontWeight="700">形式化</text>
        <text x="30" y="174" fontSize="12" fill={MUTED}>从上方规定能说什么</text>
        <text x="725" y="104" textAnchor="end" fontSize="13" fill={RED} fontWeight="700">解释</text>
        <text x="725" y="122" textAnchor="end" fontSize="12" fill={MUTED}>从下方让语言开口</text>
        <path d="M250,44 Q380,10 510,44" fill="none" stroke={MUTED} strokeDasharray="4 4" opacity=".6" />
        <text x="380" y="52" textAnchor="middle" fontSize="12" fill={MUTED}>两条路彼此交叉：Russell 与 Freud 的「双重推进」，</text>
        <text x="380" y="68" textAnchor="middle" fontSize="12" fill={MUTED}>结构主义与现象学的共同空间</text>
        <text x="560" y="300" fontSize="12" fill={MUTED}>语文学的孪生，又是对它的抗议</text>
        {OUTLETS.map((x, j) => <g key={x.id} onClick={() => setI(j)} style={{ cursor: "pointer" }}>
          <rect x={x.x - 105} y={x.y - 32} width="210" height="64" rx="14" fill={i === j ? x.color : "#fffdf8"} stroke={x.color} strokeWidth="2" />
          <text x={x.x} y={x.y - 11} textAnchor="middle" fontSize="11" fill={i === j ? "#fff" : MUTED}>{x.tag}</text>
          <text x={x.x} y={x.y + 8} textAnchor="middle" fontSize="16" fontWeight="700" fill={i === j ? "#fff" : x.color}>{x.name}</text>
          <text x={x.x} y={x.y + 24} textAnchor="middle" fontSize="11" fill={i === j ? "#fff" : MUTED}>{x.who}</text>
        </g>)}
      </svg>
      <div className="seg" style={{ marginBottom: 0 }}>{OUTLETS.map((x, j) =>
        <button key={x.id} className={i === j ? "on" : ""} onClick={() => setI(j)}>{x.name}</button>)}</div>
      <div style={{ borderLeft: `4px solid ${o.color}`, paddingLeft: 16 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>{o.tag} · {o.name} <span className="muted-it">{o.who}</span></div>
        <p style={{ margin: "6px 0 0" }}>{o.text}</p>
      </div>
    </div>);
}
