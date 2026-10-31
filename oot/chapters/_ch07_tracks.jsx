// 第 7 章专属图解：
// 1) ThreeTracks —— 三条平行轨道同步跨过 18 世纪末的断裂线（古典 / 第一阶段 / 第二阶段预告）
// 2) IdeologyCritique —— 意识形态学派 vs 康德批判：在表征内部分析 vs 追问表征的界限
// 3) Triangle —— 19 世纪的「批判—实证主义—对象形而上学」三角
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3f6b4a", INK = "#1f1b16", MUTED = "#7a6f62";

const TRACKS = [
  {
    id: "econ", icon: "💰", color: GOLD, cid: "labour_measure",
    from: "财富分析", to: "政治经济学",
    old: "需要 / 食物 → 价格", surface: "交换价值", deep: "劳动：时间与辛劳", deep2: "生产与资本",
    who: "亚当·斯密（对照：坎蒂隆、魁奈、孔狄亚克）",
    stages: [
      "古典时代：一件东西值多少，最终由「需要」来衡量——一个人的劳动值多少，取决于养活他和家人需要多少口粮。说到底，衡量价格的绝对标准是食物，所以农业和土地格外受重视。",
      "斯密没有发明「劳动」，坎蒂隆早就用它衡量交换价值。他做的是挪位：人们因为需要而交换，但交换物之间的等级和差额由投入其中的劳动单位决定。尺度从欲望那一侧搬到了人人都受其支配的时间、辛劳，乃至死亡那一侧。",
      "下一阶段（第 8 章）：劳动不再只是衡量交换的尺子，而成为价值的来源；经济学的对象从「交换」转向「生产」，并获得了资本自身发展的内部时间。",
    ],
    eg: "别针工厂：一个人独自完成 18 道工序，一天做不出 20 枚；十个人分工，一天做 48000 多枚。劳动日这个「分子」没变，变的是分母，于是每枚别针相对于劳动「缩小」了。",
  },
  {
    id: "bio", icon: "🌿", color: GREEN, cid: "organic_structure",
    from: "自然史", to: "生物学",
    old: "可见结构 → 特征", surface: "可见的特征", deep: "有机结构 · 功能", deep2: "生命",
    who: "裘西厄、维克-达齐尔、拉马克（对照：林奈、图内福尔、阿当松）",
    stages: [
      "古典时代：分类者比较可见结构，挑出某些可见部分来代表其他部分，从而定出「特征」。从描述到特征，整个过程都停留在「可见的东西代表可见的东西」这一层。",
      "裘西厄、维克-达齐尔、拉马克之后，特征要先回到身体内部那套看不见的、分等级的功能结构才能确定。一个特征之所以重要，不是因为它常见；反过来，它常见是因为它在功能上重要。分类还在做，但标准已经换到了表征之外。",
      "下一阶段（第 8 章）：有机结构最终撑破分类表，「生命」成为独立的研究对象，生与死的对立成为根本。",
    ],
    eg: "子叶数目之所以能划分植物三大类，是因为它关系到生殖这一首要功能；拉马克则因为甲壳类用鳃呼吸、有肌肉质的心脏，把它们从昆虫里挪到了软体动物之后。",
  },
  {
    id: "lang", icon: "🗣️", color: BLUE, cid: "inflection",
    from: "普通语法", to: "语文学",
    old: "名词 / 词根 → 原初意义", surface: "词的意义", deep: "屈折系统", deep2: "语言的内部历史",
    who: "库尔杜、威廉·琼斯、蒙博多（对照：孔狄亚克、博泽、库尔·德·热伯兰）",
    stages: [
      "古典时代：语言是对表征的分析，「名词」居于中心。每个词都可以一路追溯到最初的命名和原始呼喊；比较各种语言，是为了找出共同的原初词根。",
      "比较梵语和拉丁语的「是」动词时，人们发现变化的反倒是词根，稳定对应的却是词尾变化。比较的单位从「一组字母 + 一个意思」换成了屈折系统（变位、变格、前后缀）。语言内部出现了一个不靠表征来组织的形式层面。",
      "下一阶段（第 8 章）：语言被当作有自身规律、自身历史的对象；历史性进入了词语本身。",
    ],
    eg: "梵语 asmi, asi, asti, smas, stha, santi 与拉丁语 sum, es, est, sumus, estis, sunt 一一对应，起对应作用的是整套人称词尾（m、s、t……）的类比，而不是某个词根的意思。",
  },
];

const STATES = [
  { label: "古典（~1775 前）", note: "三个领域各自停在「表征的平面」上：价值、特征、词义，都靠表征之间互相比较、互相代表来确定（虚线回环 = 表征表征自身）。" },
  { label: "第一阶段（1775–1795）", note: "三条轨道几乎同时跨过断裂线：表面上还在做交换分析、分类、语法，但确定秩序的那个东西已经锚定在表征之外（向下的锚链）。这正是本章的研究对象。" },
  { label: "第二阶段（1795–1825）", note: "预告第 8 章：深层的东西摆脱了表格，表征平面在右半边碎裂。劳动、生命、语言本身成了知识的对象，带着各自的历史。" },
];

const X_OLD = 215, X_NEW = 575, BREAK = 380;

function Track({ t, k, s, sel, onSel }) {
  const y0 = 40 + k * 122, surf = y0 + 60, deepY = surf + 24;
  const moved = s >= 1, broken = s === 2;
  const dx = moved ? X_NEW - X_OLD : 0;
  return (
    <g style={{ cursor: "pointer" }} onClick={() => onSel(k)} opacity={sel === null || sel === k ? 1 : .45}>
      <rect x="6" y={y0 - 6} width="748" height="116" rx="10" fill={sel === k ? t.color : "transparent"} opacity=".07" />
      <text x="16" y={y0 + 14} fontSize="15" fill={t.color} fontWeight="700">{t.icon} {t.from}</text>
      <text x="744" y={y0 + 14} fontSize="13" fill={t.color} textAnchor="end" opacity={broken ? 1 : .55}>→ {t.to}{broken ? "" : "（尚未成形）"}</text>
      {/* 表征之外的深层 */}
      <rect x="16" y={surf} width="728" height="46" fill={INK} opacity=".045" />
      <text x="22" y={surf + 40} fontSize="10" fill={MUTED}>表征之外</text>
      {/* 表征平面：左半永远完整，右半在第二阶段碎裂 */}
      <line x1="16" y1={surf} x2={BREAK} y2={surf} stroke={INK} strokeWidth="2" opacity=".55" />
      <line x1={BREAK} y1={surf} x2="744" y2={surf} stroke={INK} strokeWidth="2"
        strokeDasharray={broken ? "10 14" : "none"} style={{ transition: "opacity .8s" }} opacity={broken ? .25 : .55} />
      <text x="22" y={surf - 5} fontSize="10" fill={MUTED}>表征平面</text>
      {/* 古典节点 + 自我回环 */}
      <g style={{ transition: "opacity .8s" }} opacity={moved ? .3 : 1}>
        <rect x={X_OLD - 82} y={surf - 32} width="164" height="26" rx="13" fill="#fff" stroke={t.color} />
        <text x={X_OLD} y={surf - 14} fontSize="12.5" textAnchor="middle" fill={INK}>{t.old}</text>
        <path d={`M ${X_OLD - 50} ${surf - 32} C ${X_OLD - 40} ${surf - 52}, ${X_OLD + 40} ${surf - 52}, ${X_OLD + 50} ${surf - 32}`}
          fill="none" stroke={t.color} strokeDasharray="3 3">
          {!moved && <animate attributeName="stroke-dashoffset" values="0;12" dur="1s" repeatCount="indefinite" />}
        </path>
      </g>
      {/* 新节点：表层 + 下坠锚链 + 深层 */}
      <g style={{ transition: "opacity .8s .5s" }} opacity={moved ? 1 : 0}>
        <rect x={X_NEW - 66} y={surf - 32} width="132" height="26" rx="13" fill="#fff" stroke={t.color} opacity={broken ? .5 : 1} />
        <text x={X_NEW} y={surf - 14} fontSize="12.5" textAnchor="middle" fill={INK} opacity={broken ? .5 : 1}>{t.surface}</text>
        <line x1={X_NEW} y1={surf - 6} x2={X_NEW} y2={deepY - 13} stroke={t.color} strokeWidth="2.5" strokeDasharray="5 4">
          <animate attributeName="stroke-dashoffset" values="18;0" dur="1.2s" repeatCount="indefinite" />
        </line>
        <rect x={X_NEW - (broken ? 105 : 90)} y={deepY - 13} width={broken ? 210 : 180} height="26" rx="6" fill={t.color}
          style={{ transition: "all .6s" }} />
        <text x={X_NEW} y={deepY + 4} fontSize="13" textAnchor="middle" fill="#fff" fontWeight="700">
          {broken ? t.deep2 : t.deep}</text>
      </g>
      {/* 移动的标记 */}
      <g style={{ transform: `translateX(${dx}px)`, transition: `transform 1s cubic-bezier(.6,0,.3,1) ${k * .08}s` }}>
        <circle cx={X_OLD - 98} cy={surf - 19} r="7" fill={t.color} />
      </g>
    </g>);
}

export function ThreeTracks() {
  const [s, setS] = useState(0), [sel, setSel] = useState(null);
  const t = sel === null ? null : TRACKS[sel];
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{STATES.map((x, j) =>
        <button key={j} className={s === j ? "on" : ""} onClick={() => setS(j)}>{x.label}</button>)}</div>
      <svg viewBox="0 0 760 410" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        <line x1={BREAK} y1="22" x2={BREAK} y2="402" stroke={RED} strokeWidth="2" strokeDasharray="6 5" opacity={s ? .9 : .4} />
        <text x={BREAK} y="16" fontSize="12" textAnchor="middle" fill={RED}>断裂线 · 1775–1800</text>
        <text x={X_OLD - 60} y="16" fontSize="12" textAnchor="middle" fill={MUTED}>秩序（Order）·表格</text>
        <text x={X_NEW + 40} y="16" fontSize="12" textAnchor="middle" fill={MUTED}>{s === 2 ? "历史（History）" : "表格之内，锚在表格之外"}</text>
        {TRACKS.map((tr, k) => <Track key={tr.id} t={tr} k={k} s={s} sel={sel} onSel={i => setSel(sel === i ? null : i)} />)}
      </svg>
      <p style={{ margin: 0 }}><b>{STATES[s].label}：</b>{STATES[s].note}</p>
      <div className="seg" style={{ marginBottom: 0 }}>
        <span style={{ color: "var(--muted)", fontSize: 13, alignSelf: "center", marginRight: 6 }}>看某一条轨道（也可点图）：</span>
        {TRACKS.map((x, j) => <button key={x.id} className={sel === j ? "on" : ""} onClick={() => setSel(sel === j ? null : j)}>{x.icon} {x.from}</button>)}
      </div>
      {t && <div style={{ borderLeft: `4px solid ${t.color}`, paddingLeft: 14 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 19 }}>{t.icon} {t.from} → {t.to} · <C id={t.cid}>{t.deep}</C></div>
        <div style={{ color: "var(--muted)", fontSize: 14, margin: "2px 0 6px" }}>{t.who}</div>
        <p style={{ margin: "0 0 6px" }}>{t.stages[s]}</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>📖 书中一例：{t.eg}</p>
      </div>}
    </div>);
}

// ---------- 意识形态 vs 批判 ----------
const IC = [
  {
    id: "ideology", name: "意识形态学派", who: "德斯蒂·德·特拉西、热朗多", motto: "在表征内部分析表征",
    text: "它把一切知识都放进表征的空间里，一层层拆解：复杂的观念拆成判断，判断拆成「感觉到一种关系」，最后拆到最简单的感觉。它从不问表征凭什么成立、边界在哪，只描述其中的组合与分解规律。拆到最底层时，「感觉」却翻进了生理学的地盘——德斯蒂甚至说意识形态学是动物学的一部分。",
    verdict: "古典哲学的最后一位：想用表征的语言，把正在表征之外成形的东西重新收回来。",
  },
  {
    id: "critique", name: "康德批判", who: "康德", motto: "追问表征的界限与条件",
    text: "它和意识形态学派盯着同一个问题：表征之间的连接靠什么成立。但康德不在表征内部往下挖，而是退后一步问：任何表征一般地得以可能的条件是什么？普遍有效的连接不能从表征的内容里得来，只能奠基于一切经验之前的先验条件——不是另一个世界，而是任何关于世界的表征得以存在的条件。",
    verdict: "现代性的门槛：知识与思想第一次退出表征的空间，表征的无限领域反过来被看成一种未经审查的形而上学。",
  },
];

export function IdeologyCritique() {
  const [m, setM] = useState(0), x = IC[m];
  const dots = [[200, 90], [260, 120], [330, 80], [400, 110], [450, 150], [230, 170], [300, 160], [380, 190], [440, 210], [260, 220]];
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{IC.map((y, j) =>
        <button key={y.id} className={m === j ? "on" : ""} onClick={() => setM(j)}>{j ? "🔭" : "🔬"} {y.name}</button>)}</div>
      <svg key={x.id} viewBox="0 0 640 300" style={{ width: "100%", maxHeight: 320, background: "var(--paper)", borderRadius: 14 }}>
        <rect x="140" y="50" width="360" height="200" rx="18" fill="#fff"
          stroke={m ? GOLD : INK} strokeWidth={m ? 5 : 1.5} opacity={m ? 1 : .9}>
          {m === 1 && <animate attributeName="stroke-opacity" values="1;.4;1" dur="1.8s" repeatCount="indefinite" />}
        </rect>
        <text x="320" y="40" textAnchor="middle" fontSize="14" fill={INK}>表征的领域</text>
        {dots.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="5" fill={BLUE} opacity=".55" />)}
        {m === 0 ? <>
          {/* 向内、向下拆解 */}
          {[["科学 · 语法 · 经济", 80], ["判断 = 感到一种关系", 140], ["感觉", 200]].map(([t, y], i) =>
            <g key={i}>
              <rect x={320 - (90 - i * 25)} y={y - 16} width={180 - i * 50} height="26" rx="13" fill={i === 2 ? RED : "#f3ece0"} stroke={RED} />
              <text x="320" y={y + 2} textAnchor="middle" fontSize="13" fill={i === 2 ? "#fff" : INK}>{t}</text>
              {i < 2 && <path d={`M320 ${y + 12} L320 ${y + 42}`} stroke={RED} strokeWidth="2" markerEnd="url(#ah7)" />}
            </g>)}
          <circle cx="320" cy="214" r="4" fill={RED}>
            <animate attributeName="cy" values="214;252;214" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <text x="320" y="286" textAnchor="middle" fontSize="13" fill={RED}>↓ 碰到边缘外：生理学 / 「人的自然科学」（尚未存在）</text>
        </> : <>
          {[[70, 150, 132, 150], [570, 150, 508, 150], [570, 40, 504, 62], [70, 60, 136, 80]].map(([a, b, c, d], i) =>
            <path key={i} d={`M${a} ${b} L${c} ${d}`} stroke={GOLD} strokeWidth="3" markerEnd="url(#ah7g)">
              <animate attributeName="opacity" values=".3;1;.3" dur="1.8s" begin={`${i * .3}s`} repeatCount="indefinite" />
            </path>)}
          <text x="66" y="140" textAnchor="middle" fontSize="13" fill={GOLD}>凭什么</text>
          <text x="66" y="170" textAnchor="middle" fontSize="13" fill={GOLD}>能连接？</text>
          <text x="576" y="140" textAnchor="middle" fontSize="13" fill={GOLD}>边界</text>
          <text x="576" y="170" textAnchor="middle" fontSize="13" fill={GOLD}>在哪？</text>
          <rect x="200" y="136" width="240" height="28" rx="8" fill="#fff" opacity=".92" /><text x="320" y="155" textAnchor="middle" fontSize="15" fill={INK} opacity=".8">表征本身被悬置为「问题」</text>
          <text x="320" y="285" textAnchor="middle" fontSize="13" fill={GOLD}>先验条件：任何表征得以可能的形式</text>
        </>}
        <defs>
          <marker id="ah7" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill={RED} /></marker>
          <marker id="ah7g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill={GOLD} /></marker>
        </defs>
      </svg>
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}><C id={x.id}>{x.name}</C> <span className="muted-it">{x.who}</span> · <b>{x.motto}</b></div>
        <p style={{ margin: "6px 0" }}>{x.text}</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>⚖️ 福柯的定位：{x.verdict}</p>
      </div>
    </div>);
}

// ---------- 批判—实证主义—形而上学 三角 ----------
const TRI = [
  { name: "批判", x: 300, y: 62, c: GOLD, text: "康德式的追问：知识的条件在先验主体一侧。它是另外两角的共同地基——正是先划定了表征的界限，才谈得上「表征之外」。" },
  { name: "对象的形而上学", x: 100, y: 200, c: RED, text: "把劳动、生命、语言（或意志、上帝之言）当作藏在对象深处、永远无法彻底对象化的力量；虽然出现在康德之后，看起来却像「前批判」的。它从实证知识的宝库里取材。" },
  { name: "实证主义", x: 500, y: 200, c: BLUE, text: "只研究给予经验的现象及其规律：能认识现象，不能认识实体；能认识规律，不能认识本质。它的正当性恰恰来自「不可知的深处」与「可知的合理性」之间的划分。" },
];

export function Triangle() {
  const [i, setI] = useState(0);
  return (
    <div className="card" style={{ display: "grid", gap: 10 }}>
      <svg viewBox="0 0 600 270" style={{ width: "100%", maxHeight: 280, background: "var(--paper)", borderRadius: 14 }}>
        <polygon points={TRI.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke={INK} strokeOpacity=".3" strokeWidth="2" />
        <text x="300" y="150" textAnchor="middle" fontSize="13" fill={MUTED}>欧洲思想 · 19 世纪初 → 柏格森</text>
        {TRI.map((p, j) => <g key={j} style={{ cursor: "pointer" }} onClick={() => setI(j)}>
          <circle cx={p.x} cy={p.y} r={i === j ? 26 : 20} fill={p.c} opacity={i === j ? 1 : .55} style={{ transition: "all .3s" }} />
          <text x={p.x} y={p.y + (p.y < 100 ? -34 : 48)} textAnchor="middle" fontSize="15" fill={INK} fontWeight={i === j ? 700 : 400}>{p.name}</text>
        </g>)}
      </svg>
      <p style={{ margin: 0 }}><b style={{ color: TRI[i].c }}>{TRI[i].name}：</b>{TRI[i].text}</p>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>点三角形的顶点切换。三者互相支撑：形而上学从实证知识取材，实证主义靠「深处不可知」为自己正名。</p>
    </div>);
}
