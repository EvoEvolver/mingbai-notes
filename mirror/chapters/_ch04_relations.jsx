// 第 4 章专属图解：三种关系 × 两种读法（政治经济学之镜 vs 象征交换）
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#6b6257";

// 一个人物/事物节点
const Node = ({ x, y, icon, label, sub, color = INK, r = 34 }) => <g>
  <circle cx={x} cy={y} r={r} fill="#fffaf0" stroke={color} strokeWidth="2.5" />
  <text x={x} y={y + 9} textAnchor="middle" fontSize="26">{icon}</text>
  <text x={x} y={y + r + 18} textAnchor="middle" fontSize="14" fontWeight="600" fill={color}>{label}</text>
  {sub && <text x={x} y={y + r + 35} textAnchor="middle" fontSize="12" fill={MUTED}>{sub}</text>}
</g>;

// 可移动的小圆点，沿路径循环
const Flow = ({ d, color, dur = "2.4s", begin = "0s" }) => <circle r="5" fill={color}>
  <animateMotion path={d} dur={dur} begin={begin} repeatCount="indefinite" />
</circle>;

// 方框标签
const Tag = ({ x, y, w = 110, text, color = BLUE, dashed }) => <g>
  <rect x={x - w / 2} y={y - 14} width={w} height={26} rx="6" fill="#fff" stroke={color} strokeWidth="1.6" strokeDasharray={dashed ? "4 3" : undefined} />
  <text x={x} y={y + 4} textAnchor="middle" fontSize="12.5" fill={color}>{text}</text>
</g>;

const Arrow = ({ x1, y1, x2, y2, color = BLUE, label, ly = -8 }) => <g>
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" markerEnd={`url(#ah-${color.slice(1)})`} />
  {label && <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + ly} textAnchor="middle" fontSize="12" fill={color}>{label}</text>}
</g>;

const Banner = ({ text, color }) => <g>
  <rect x="20" y="12" width="520" height="28" rx="14" fill={color} opacity=".1" />
  <text x="280" y="31" textAnchor="middle" fontSize="13.5" fill={color} fontWeight="600">{text}</text>
</g>;

const SCENES = {
  slave: {
    sym: () => <>
      <Banner color={GREEN} text="一个不可拆开的二元结构：双方都被义务绑在一起" />
      <Node x={150} y={140} icon="👑" label="主人" sub="并非「自由的所有者」" color={GREEN} />
      <Node x={410} y={140} icon="⛓️" label="奴隶" sub="并非「被物化的对象」" color={GREEN} />
      <path id="s-up" d="M185,125 Q280,60 375,125" fill="none" stroke={GREEN} strokeWidth="2" />
      <path d="M375,155 Q280,220 185,155" fill="none" stroke={GREEN} strokeWidth="2" />
      <Flow d="M185,125 Q280,60 375,125" color={GREEN} />
      <Flow d="M375,155 Q280,220 185,155" color={GREEN} begin="1.2s" />
      <text x="280" y="80" textAnchor="middle" fontSize="13" fill={GREEN}>义务（带有互惠）</text>
      <text x="280" y="210" textAnchor="middle" fontSize="13" fill={GREEN}>义务（带有互惠）</text>
      <text x="280" y="145" textAnchor="middle" fontSize="12" fill={MUTED}>中间没有可单独买卖的「物」</text>
    </>,
    lens: () => <>
      <Banner color={BLUE} text="以雇佣工人为模板倒推：奴隶 = 劳动 + 劳动力，全部归主人" />
      <Node x={130} y={140} icon="👑" label="所有者" sub="占有他人劳动力" color={BLUE} />
      <Node x={430} y={140} icon="⛓️" label="奴隶" sub="「剥削与异化的极限」" color={BLUE} />
      <Tag x={430} y={72} w={96} text="劳动力" color={RED} />
      <Tag x={430} y={228} w={96} text="劳动" color={RED} />
      <Arrow x1={380} y1={80} x2={170} y2={118} color={RED} label="被占有" />
      <Arrow x1={380} y1={222} x2={170} y2={162} color={RED} label="被占有" ly={18} />
      <text x="280" y="145" textAnchor="middle" fontSize="12" fill={MUTED}>「真实内核」= 劳动力的剥削</text>
    </>,
    title: "奴隶 ↔ 主人",
    sym_text: "鲍德里亚：奴隶和主人谁也没有从对方那里「分离」出来，双方都不是现代意义上的独立个体。主人的统治是人身性的支配，它不把奴隶变成对象，而是一种总带着互惠成分的义务。在这层关系里，没有哪样东西（劳动力、口粮、庇护）能被单独抽出来当商品。只有奴隶贸易把奴隶卷进市场后，主人才能像处置货物一样处置他，但那时分析的已经是市场经济了。",
    lens_text: "马克思主义读法：先从雇佣工人出发，定义出「劳动」与「劳动力」，再把二者加起来，说奴隶就是两样都被主人占有的人，于是奴隶制成了剥削的最高程度，雇佣劳动成了「解放」。鲍德里亚指出这只是分析上的重构：当时两者根本没有分开，把它们相加并不能说明分开之前的状态。",
    ids: ["retrospective_reading", "personal_domination", "symbolic_obligation"],
  },
  artisan: {
    sym: () => <>
      <Banner color={GREEN} text="材料、作品、使用者与工匠彼此回应：给出、耗费、消解，而不是「投资」" />
      <Node x={280} y={95} icon="🧑‍🔧" label="工匠" color={GREEN} r={30} />
      <Node x={110} y={200} icon="🪵" label="材料" color={GREEN} r={30} />
      <Node x={450} y={200} icon="🏘️" label="使用者（共同体）" color={GREEN} r={30} />
      <text x="280" y="214" textAnchor="middle" fontSize="30">🏺</text>
      <text x="280" y="240" textAnchor="middle" fontSize="13" fill={GREEN} fontWeight="600">作品</text>
      <path d="M255,112 Q170,130 132,175" fill="none" stroke={GREEN} strokeWidth="2" />
      <path d="M305,112 Q390,130 428,175" fill="none" stroke={GREEN} strokeWidth="2" />
      <path d="M142,205 Q280,175 418,205" fill="none" stroke={GREEN} strokeWidth="1.5" strokeDasharray="5 4" />
      <Flow d="M255,112 Q170,130 132,175" color={GREEN} dur="2s" />
      <Flow d="M132,175 Q170,130 255,112" color={GOLD} dur="2s" begin="1s" />
      <Flow d="M305,112 Q390,130 428,175" color={GREEN} dur="2s" begin=".5s" />
      <Flow d="M428,175 Q390,130 305,112" color={GOLD} dur="2s" begin="1.5s" />
      <text x="150" y="128" textAnchor="end" fontSize="12" fill={GREEN}>材料不断「回应」</text>
      <text x="410" y="128" fontSize="12" fill={GREEN}>生产者也是消费者</text>
    </>,
    lens: () => <>
      <Banner color={BLUE} text="被读成一条生产线：掌控生产资料与自身劳动的小生产者" />
      <Tag x={75} y={140} w={110} text="劳动力（自有）" />
      <Tag x={205} y={140} w={110} text="生产资料（自有）" />
      <Tag x={345} y={140} w={110} text="劳动产品 = 价值" color={RED} />
      <Tag x={480} y={140} w={90} text="消费者" />
      <Arrow x1={131} y1={140} x2={146} y2={140} />
      <Arrow x1={261} y1={140} x2={286} y2={140} />
      <Arrow x1={401} y1={140} x2={431} y2={140} />
      <text x="140" y="95" textAnchor="middle" fontSize="28">🧑‍🔧</text>
      <text x="345" y="100" textAnchor="middle" fontSize="28">🏺</text>
      <text x="280" y="205" textAnchor="middle" fontSize="13" fill={RED}>「掌控自身劳动的主体」→ 手工业黄金时代 → 自我管理</text>
      <text x="280" y="228" textAnchor="middle" fontSize="12" fill={MUTED}>生产与消费被拆成两段，主体与客体分立</text>
    </>,
    title: "工匠 ↔ 材料 / 作品 / 使用者",
    sym_text: "鲍德里亚：工匠的活动根本不是「劳动」。生产者和消费者是同一群人，像语言一样人人既说也听；材料对他的所作所为不断作出回应，作品里有一种逃出价值规律的「互相挥霍」。他付出的东西被给出、被耗费、被消解，而不是被投资。作品（work）既是生产也是毁坏，铭刻着主体与客体的失落，所以是象征性的。",
    lens_text: "马克思主义读法：工匠和奴隶不同，拥有自己的劳动力；和雇佣工人不同，还拥有工具，于是被定义为「掌控生产资料与劳动过程的主人」。鲍德里亚说这些范畴只是事后的合理化：铁匠与锤子、农夫与土地的关系并不是人与「生产资料」的关系。更糟的是，这个形象孕育出「重新占有劳动」的黄金时代幻想。",
    ids: ["work_not_labor", "integrated_reciprocity", "golden_age_self_management"],
  },
  wage: {
    sym: () => <>
      <Banner color={RED} text="象征视角下看到的是「分离」：主奴关系被搬进了同一个人体内" />
      <rect x="70" y="60" width="250" height="185" rx="18" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="6 4" />
      <text x="195" y="80" textAnchor="middle" fontSize="12.5" fill={RED}>私有化的个体（一个人）</text>
      <Node x={130} y={140} icon="🧍" label="自我 = 所有者" color={RED} r={30} />
      <Node x={260} y={140} icon="💪" label="劳动力 = 财产" color={RED} r={30} />
      <Arrow x1={162} y1={140} x2={226} y2={140} color={RED} label="「支配」" />
      <Node x={460} y={140} icon="🏦" label="资本" sub="只有契约，没有义务" color={MUTED} r={30} />
      <line x1="325" y1="140" x2="425" y2="140" stroke={MUTED} strokeWidth="2" strokeDasharray="2 6" />
      <text x="375" y="130" textAnchor="middle" fontSize="12" fill={MUTED}>断裂</text>
    </>,
    lens: () => <>
      <Banner color={BLUE} text="透镜在这里对得上：抽象劳动力 ⇄ 工资的等价交换" />
      <Node x={130} y={140} icon="👷" label="雇佣工人" sub="自由出卖劳动力" color={BLUE} />
      <Node x={430} y={140} icon="🏦" label="资本" sub="购买劳动力" color={BLUE} />
      <Arrow x1={170} y1={118} x2={390} y2={118} color={BLUE} label="劳动力（商品）" />
      <Arrow x1={390} y1={165} x2={170} y2={165} color={BLUE} label="工资" ly={20} />
      <text x="280" y="148" textAnchor="middle" fontSize="22" fill={BLUE}>＝</text>
      <Flow d="M170,118 L390,118" color={BLUE} dur="1.8s" />
      <Flow d="M390,165 L170,165" color={GOLD} dur="1.8s" begin=".9s" />
    </>,
    title: "雇佣工人 ↔ 资本",
    sym_text: "鲍德里亚：自由工人在「劳动力之镜」里找到自己的身份。他被异化，不在于出卖劳动力，而在于他是劳动力的所有者，可以像处置自家财物一样「处置」自己。这种权利恰恰来自私有化，即与他人隔绝。所谓解放，就是把分离内化：主奴这一对关系被搬进同一个人体内，并没有停止运作。",
    lens_text: "马克思主义读法：这是透镜唯一真正对得上的关系，因为「劳动 / 劳动力」「生产资料」「交换价值」这套范畴本来就是从这里提炼出来的。问题在于把这副只适用于本社会的透镜扣到奴隶和工匠身上，再把差异解释成「历史还不够发达」。",
    ids: ["privatized_individual", "liberation_ideology", "separation_principle"],
  },
};

const RELS = [
  { id: "slave", icon: "⛓️", name: "奴隶 ↔ 主人" },
  { id: "artisan", icon: "🔨", name: "工匠 ↔ 作品" },
  { id: "wage", icon: "🏭", name: "雇佣工人 ↔ 资本" },
];

export default function ThreeRelations() {
  const [r, setR] = useState("slave");
  const [lens, setLens] = useState(true);
  const s = SCENES[r];
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "space-between" }}>
        <div className="seg" style={{ marginBottom: 0 }}>{RELS.map(x =>
          <button key={x.id} className={r === x.id ? "on" : ""} onClick={() => setR(x.id)}>{x.icon} {x.name}</button>)}</div>
        <div className="seg" style={{ marginBottom: 0 }}>
          <button className={lens ? "on" : ""} onClick={() => setLens(true)}>🔍 政治经济学之镜</button>
          <button className={!lens ? "on" : ""} onClick={() => setLens(false)}>🔄 象征交换</button>
        </div>
      </div>
      <svg key={r + lens} viewBox="0 0 560 270" style={{ width: "100%", maxHeight: 330, background: "var(--paper)", borderRadius: 14 }}>
        <defs>
          {[BLUE, RED, GREEN].map(c => <marker key={c} id={`ah-${c.slice(1)}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={c} /></marker>)}
          <pattern id="grid4" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22,0 L0,0 0,22" fill="none" stroke={BLUE} strokeWidth=".6" opacity=".35" /></pattern>
        </defs>
        {lens && <rect x="-300" y="0" width="1160" height="270" fill="url(#grid4)">
          <animate attributeName="opacity" from="0" to="1" dur=".8s" fill="freeze" /></rect>}
        {lens ? s.lens() : s.sym()}
        {lens && <g opacity=".9">
          <circle cx="-60" cy="140" r="56" fill="#2c4a6e" fillOpacity=".08" stroke={BLUE} strokeWidth="4">
            <animate attributeName="cx" values="-60;280;1000" dur="1.4s" fill="freeze" /></circle>
          <text x="-60" y="146" textAnchor="middle" fontSize="13" fill={BLUE} fontWeight="700">劳动 / 劳动力
            <animate attributeName="x" values="-60;280;1000" dur="1.4s" fill="freeze" /></text>
        </g>}
      </svg>
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21, marginBottom: 4 }}>
          {s.title} <span className="muted-it">· {lens ? "马克思主义 / 政治经济学读法" : "鲍德里亚的象征交换读法"}</span>
        </div>
        <p style={{ margin: "4px 0 8px" }}>{lens ? s.lens_text : s.sym_text}</p>
        <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>相关概念：{s.ids.map((id, i) => <span key={id}>{i > 0 && " · "}<C id={id} /></span>)}</p>
      </div>
    </div>);
}

// ---- 第二个小图解：三个「公式」与五种不能被拆开的位置 ----
const PAIRS = [
  ["生产者", "他的产品"],
  ["生产者", "使用者"],
  ["生产者", "他的劳动力"],
  ["使用者", "他的需要"],
  ["产品", "它的用处"],
];
const FORMULAS = [
  { name: "我们的政治经济学", f: "抽象社会劳动 → 经由整个资本体系 → 交换价值", color: BLUE, sep: 2, note: "五对位置全部被拆开，各自独立成「主体」「对象」「本质」。" },
  { name: "韦尔南笔下的古希腊工匠", f: "使用价值的劳动 → 使用价值的产品，生产者与使用者直接相对", color: GOLD, sep: 1, note: "比前者近了一步，但仍是一个经济公式：生产者与使用者被分开后，再用「服务」「人情」把两个独立主体连起来。" },
  { name: "象征关系", f: "没有公式：交换本身就是关系，位置不能单独成立", color: GREEN, sep: 0, note: "五对位置都无法自主化。这不是更温情的「心理」关系，而是根本不进入经济的另一种秩序。" },
];

export function FiveSeparations() {
  const [k, setK] = useState(0);
  const F = FORMULAS[k];
  const gap = [0, 70, 140][F.sep];
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{FORMULAS.map((x, j) =>
        <button key={j} className={k === j ? "on" : ""} onClick={() => setK(j)}>{x.name}</button>)}</div>
      <div style={{ fontFamily: "var(--serif)", fontSize: 18, color: F.color }}>{F.f}</div>
      <svg viewBox="0 0 560 250" style={{ width: "100%", maxHeight: 300, background: "var(--paper)", borderRadius: 14 }}>
        {PAIRS.map(([a, b], i) => {
          const y = 30 + i * 46;
          return <g key={i}>
            <g style={{ transform: `translateX(${-gap}px)`, transition: "transform .7s ease" }}>
              <rect x="170" y={y - 15} width="100" height="30" rx="15" fill="#fff" stroke={F.color} strokeWidth="2" />
              <text x="220" y={y + 5} textAnchor="middle" fontSize="13" fill={INK}>{a}</text>
            </g>
            <g style={{ transform: `translateX(${gap}px)`, transition: "transform .7s ease" }}>
              <rect x="290" y={y - 15} width="100" height="30" rx="15" fill="#fff" stroke={F.color} strokeWidth="2" />
              <text x="340" y={y + 5} textAnchor="middle" fontSize="13" fill={INK}>{b}</text>
            </g>
            {F.sep > 0
              ? <line x1={270 - gap + 4} y1={y} x2={290 + gap - 4} y2={y} stroke={F.color} strokeWidth="1.5" strokeDasharray={F.sep === 2 ? "3 6" : "8 4"} />
              : <rect x="160" y={y - 20} width="240" height="40" rx="20" fill="none" stroke={GREEN} strokeWidth="2.5">
                  <animate attributeName="stroke-opacity" values="1;.35;1" dur="2s" repeatCount="indefinite" /></rect>}
          </g>;
        })}
      </svg>
      <p style={{ margin: 0 }}>{F.note}</p>
    </div>);
}
