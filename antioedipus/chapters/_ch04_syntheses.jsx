// 第 4 章专属图解：三种综合 × 合法（内在）/ 非法（俄狄浦斯·超越性）使用 切换器
import { useState, Fragment } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#8a7f70";

// 帮助：在第 i 段（共 n 段，周期 dur）时让某个属性鼓起一下
function pulse(i, n, base, peak) {
  const t = i / n, w = 0.05;
  if (i === 0) return { values: `${peak};${base};${base};${peak}`, keyTimes: `0;${w};${1 - w / 2};1` };
  return { values: `${base};${base};${peak};${base};${base}`, keyTimes: `0;${(t - w).toFixed(3)};${t.toFixed(3)};${(t + w).toFixed(3)};1` };
}

/* ---------------- 连接综合 ---------------- */
const CHAIN = [["嘴", 50, 120], ["乳房", 130, 70], ["眼睛", 210, 140], ["脸颊", 290, 70], ["声音", 370, 140], ["花", 450, 80]];
const chainPath = "M" + CHAIN.map(([, x, y]) => `${x} ${y}`).join(" L");

const ConnLegit = () => <>
  <path d={chainPath} fill="none" stroke={GREEN} strokeWidth="3" strokeDasharray="8 7">
    <animate attributeName="stroke-dashoffset" values="60;0" dur="1.2s" repeatCount="indefinite" />
  </path>
  {[0, 1, 2, 3].map(k => <circle key={k} r="5" fill={GOLD}>
    <animateMotion path={chainPath} dur="5s" begin={`${k * 1.25}s`} repeatCount="indefinite" />
  </circle>)}
  {CHAIN.map(([t, x, y], i) => <g key={t}>
    <circle cx={x} cy={y} r="24" fill="#fff" stroke={GREEN} strokeWidth="2.5">
      <animate attributeName="r" values="24;28;24" dur="1.6s" begin={`${i * .25}s`} repeatCount="indefinite" />
    </circle>
    <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fill={INK}>{t}</text>
  </g>)}
  {[0, 1, 2, 3, 4].map(i => <text key={i} x={(CHAIN[i][1] + CHAIN[i + 1][1]) / 2} y={(CHAIN[i][2] + CHAIN[i + 1][2]) / 2 + (i % 2 ? -14 : 22)} textAnchor="middle" fontSize="13" fill={GREEN} fontWeight="700">和</text>)}
  <text x="260" y="215" textAnchor="middle" fontSize="15" fill={INK}>一个部分对象接上另一个，流被采集又被切断：「和……和……和……」</text>
  <text x="260" y="234" textAnchor="middle" fontSize="12" fill={MUTED}>没有中心、没有「这些属于谁」——唯一的主体就是在无器官身体上流动的欲望本身</text>
</>;

const MOM = [260, 128];
const ConnIllegit = () => <>
  <circle cx={MOM[0]} cy={MOM[1]} r="70" fill="rgba(155,44,31,.06)" stroke={RED} strokeWidth="3" strokeDasharray="5 4">
    <animate attributeName="r" values="95;70" dur="2.2s" fill="freeze" />
  </circle>
  <text x={MOM[0]} y={MOM[1] + 92} textAnchor="middle" fontSize="15" fill={RED} fontWeight="700">「妈妈」——一个完整人物</text>
  {CHAIN.map(([t, x, y], i) => {
    const a = (i / CHAIN.length) * Math.PI * 2, tx = MOM[0] + Math.cos(a) * 40, ty = MOM[1] + Math.sin(a) * 36;
    return <g key={t}>
      <animateTransform attributeName="transform" type="translate" from="0 0" to={`${tx - x} ${ty - y}`} dur="2.2s" fill="freeze" />
      <circle cx={x} cy={y} r="17" fill="#fff" stroke={RED} strokeWidth="2" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fill={INK}>{t}</text>
    </g>;
  })}
  <g opacity="0">
    <animate attributeName="opacity" values="0;1" begin="2.2s" dur=".6s" fill="freeze" />
    <circle cx="455" cy="40" r="20" fill={INK} />
    <text x="455" y="46" textAnchor="middle" fontSize="16" fill="#fff">φ</text>
    <line x1="437" y1="50" x2="325" y2="100" stroke={INK} strokeDasharray="4 4" />
    <text x="455" y="80" textAnchor="middle" fontSize="12" fill={INK}>+1：超越的</text>
    <text x="455" y="95" textAnchor="middle" fontSize="12" fill={INK}>阳具 / 能指</text>
    <text x="70" y="40" textAnchor="middle" fontSize="13" fill={RED}>「它们都是妈妈的」</text>
    <text x="70" y="58" textAnchor="middle" fontSize="13" fill={RED}>「而且总缺了点什么」</text>
  </g>
</>;

/* ---------------- 析取综合 ---------------- */
const BARS = [["男", "女", 3.2], ["生", "死", 4.4], ["父母", "孩子", 3.8]];
const DisjLegit = () => <>
  {BARS.map(([a, b, d], i) => {
    const y = 50 + i * 62;
    return <g key={a}>
      <line x1="110" y1={y} x2="410" y2={y} stroke={BLUE} strokeWidth="3" opacity=".5" />
      <circle cx="110" cy={y} r="20" fill={BLUE} /><text x="110" y={y + 5} textAnchor="middle" fontSize="13" fill="#fff">{a}</text>
      <circle cx="410" cy={y} r="20" fill={BLUE} /><text x="410" y={y + 5} textAnchor="middle" fontSize="13" fill="#fff">{b}</text>
      <circle cy={y} r="9" fill={GOLD} stroke="#fff" strokeWidth="2">
        <animate attributeName="cx" values="132;388;132" dur={`${d}s`} repeatCount="indefinite" />
      </circle>
      <text x="260" y={y - 10} textAnchor="middle" fontSize="12" fill={MUTED}>{["trans-sexual", "trans-alivedead", "trans-parentchild"][i]}</text>
      <text x="460" y={y + 5} fontSize="13" fill={BLUE}>{i < 2 ? "或者……" : "或者"}</text>
    </g>;
  })}
  <text x="260" y="222" textAnchor="middle" fontSize="15" fill={INK}>两端都被肯定，主体滑过整段不可分的距离：「或者……或者……或者」</text>
</>;

const DisjIllegit = () => <>
  <text x="260" y="22" textAnchor="middle" fontSize="14" fill={INK}>「要么按 爸爸-妈妈-我 分清位置，要么坠入未分化的黑夜」</text>
  <circle cx="260" cy="44" r="5" fill={INK} />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-38 260 44;38 260 44;-38 260 44" dur="3s" repeatCount="indefinite" />
    <line x1="260" y1="44" x2="260" y2="160" stroke={INK} strokeWidth="2.5" />
    <circle cx="260" cy="168" r="16" fill={RED} />
    <text x="260" y="173" textAnchor="middle" fontSize="12" fill="#fff">你</text>
  </g>
  <rect x="20" y="150" width="150" height="62" rx="12" fill="rgba(44,74,110,.1)" stroke={BLUE} />
  <text x="95" y="174" textAnchor="middle" fontSize="13" fill={BLUE} fontWeight="700">象征极：分化</text>
  <text x="95" y="194" textAnchor="middle" fontSize="12" fill={INK}>内化律法＝「正常」</text>
  <rect x="350" y="150" width="150" height="62" rx="12" fill="rgba(91,63,122,.1)" stroke={VIOLET} />
  <text x="425" y="174" textAnchor="middle" fontSize="13" fill={VIOLET} fontWeight="700">想象极：未分化</text>
  <text x="425" y="194" textAnchor="middle" fontSize="12" fill={INK}>认同混乱＝「神经症」</text>
  <text x="260" y="232" textAnchor="middle" fontSize="13" fill={RED} fontWeight="700">两头写的都是「俄狄浦斯」——双重束缚 double bind</text>
  {[["父母", "孩子", 72], ["男", "女", 102]].map(([a, b, y]) => <g key={a}>
    <text x="40" y={y} fontSize="13" fill={INK}>{a}</text><text x="68" y={y} fontSize="13" fill={RED}>/</text><text x="80" y={y} fontSize="13" fill={INK}>{b}</text>
  </g>)}
  <text x="40" y="132" fontSize="13" fill={INK}>生 <tspan fill={RED}>/</tspan> 死</text>
  <text x="480" y="90" textAnchor="end" fontSize="12" fill={MUTED}>二选一，</text>
  <text x="480" y="106" textAnchor="end" fontSize="12" fill={MUTED}>另一端被排除</text>
</>;

/* ---------------- 合取综合 ---------------- */
const ZONES = [["圣女贞德", 110, 85], ["赫利奥加巴卢斯", 255, 55], ["蒙古大汗", 400, 85], ["圣殿骑士", 400, 150], ["我的儿子", 255, 170], ["我的父亲", 110, 150]];
const DUR = 9;
const ConjLegit = () => {
  const xs = [...ZONES.map(z => z[1]), ZONES[0][1]].join(";"), ys = [...ZONES.map(z => z[2]), ZONES[0][2]].join(";");
  return <>
    <ellipse cx="255" cy="112" rx="235" ry="92" fill="rgba(184,134,43,.08)" stroke={GOLD} strokeWidth="2" />
    <text x="255" y="120" textAnchor="middle" fontSize="11" fill={MUTED}>无器官身体：一只布满梯度与阈限的「蛋」</text>
    <text x="260" y="226" textAnchor="middle" fontSize="15" fill={INK}>主体穿过一个个强度区，每过一处就得出一个「原来是我！」</text>
    {ZONES.map(([t, x, y], i) => {
      const p = pulse(i, ZONES.length, 26, 36), o = pulse(i, ZONES.length, 0, 1);
      return <g key={t}>
        <circle cx={x} cy={y} r="26" fill="rgba(184,134,43,.18)" stroke={GOLD}>
          <animate attributeName="r" values={p.values} keyTimes={p.keyTimes} dur={`${DUR}s`} repeatCount="indefinite" />
        </circle>
        <text x={x} y={y + 4} textAnchor="middle" fontSize={t.length > 5 ? 10 : 12} fill={INK}>{t}</text>
        <text x={x} y={y - 30} textAnchor="middle" fontSize="13" fill={RED} fontWeight="700" opacity="0">原来是我！
          <animate attributeName="opacity" values={o.values} keyTimes={o.keyTimes} dur={`${DUR}s`} repeatCount="indefinite" />
        </text>
      </g>;
    })}
    <circle r="9" fill={RED} stroke="#fff" strokeWidth="2">
      <animate attributeName="cx" values={xs} dur={`${DUR}s`} repeatCount="indefinite" />
      <animate attributeName="cy" values={ys} dur={`${DUR}s`} repeatCount="indefinite" />
    </circle>
  </>;
};

const AGENTS = [["老板", 0], ["警察", 0], ["国王", 0], ["传教士", 1], ["祖国", 1], ["士兵", 2], ["工人", 2]];
const TRI = [[260, 70, "爸爸"], [190, 180, "妈妈"], [330, 180, "我"]];
const ConjIllegit = () => <>
  <polygon points={TRI.map(([x, y]) => `${x},${y}`).join(" ")} fill="rgba(155,44,31,.06)" stroke={RED} strokeWidth="2.5" />
  {TRI.map(([x, y, t]) => <g key={t}><circle cx={x} cy={y} r="22" fill={RED} /><text x={x} y={y + 5} textAnchor="middle" fontSize="14" fill="#fff">{t}</text></g>)}
  <text x="345" y="200" fontSize="18">📌</text>
  <circle cx="260" cy="128" r="15" fill={INK} /><text x="260" y="133" textAnchor="middle" fontSize="14" fill="#fff">φ</text>
  <text x="260" y="160" textAnchor="middle" fontSize="11" fill={INK}>+1</text>
  {AGENTS.map(([t, k], i) => {
    const x0 = i < 4 ? 50 : 470, y0 = 30 + (i < 4 ? i : i - 4) * 45, [tx, ty] = TRI[k];
    return <g key={t}>
      <animateTransform attributeName="transform" type="translate" values={`0 0;0 0;${tx - x0} ${ty - y0}`} keyTimes="0;.35;1" dur="3s" fill="freeze" />
      <animate attributeName="opacity" values="1;1;0" keyTimes="0;.85;1" dur="3s" fill="freeze" />
      <rect x={x0 - 30} y={y0 - 14} width="60" height="26" rx="8" fill="#fff" stroke={BLUE} />
      <text x={x0} y={y0 + 4} textAnchor="middle" fontSize="13" fill={BLUE}>{t}</text>
    </g>;
  })}
  <g opacity="0">
    <animate attributeName="opacity" values="0;1" begin="3s" dur=".5s" fill="freeze" />
    <text x="260" y="22" textAnchor="middle" fontSize="15" fill={RED} fontWeight="700">「原来是你爸爸！原来是你妈妈！」</text>
    <text x="110" y="60" textAnchor="middle" fontSize="12" fill={MUTED}>出发集合：阶级、种族、</text>
    <text x="110" y="76" textAnchor="middle" fontSize="12" fill={MUTED}>国家、教会……（4+n 个角）</text>
    <text x="420" y="60" textAnchor="middle" fontSize="12" fill={MUTED}>目的集合：爸爸-妈妈-我</text>
    <text x="420" y="76" textAnchor="middle" fontSize="12" fill={MUTED}>（3+1）</text>
    <text x="260" y="228" textAnchor="middle" fontSize="13" fill={INK}>桌布被折起来：社会场的每个角色都被一一对应到家里</text>
  </g>
</>;

/* ---------------- 数据 ---------------- */
const ROWS = [
  {
    id: "connective_synthesis", icon: "🔗", name: "连接综合", en: "Connective synthesis of production", formula: ["和……和……", "这是妈妈的……"],
    cells: [
      {
        label: "部分的、非特定的使用", svg: ConnLegit,
        text: "部分对象（嘴、乳房、眼睛、一片脸颊、一朵花）彼此直接连接，流被采集、又被切断。没有一个先在的「自我」去占有它们，也没有一个「完整的人」作为它们的主人。性别也不是事先指定的：在普鲁斯特的「花」的主题里，每个人都是双性的，一个人的男性部分可以与另一个女性的女性部分、男性部分……横向连接，于是罪感不复存在。",
        eg: "普鲁斯特写第一次亲吻阿尔贝蒂娜：脸先是一团星云，然后成为人，最后在极近处像沙画一样碎成分子般的部分对象。",
        analogy: "像刷短视频时手指—屏幕—一段音乐—一阵笑—下一个视频的链条：一节接一节地运转，不需要追问「这一切归根结底是谁」。",
      },
      {
        label: "全局的、特定的使用（俄狄浦斯）", svg: ConnIllegit, paralogism: "外推谬误 extrapolation",
        text: "俄狄浦斯把部分对象「收回」到完整人物名下：先是父母（父母式使用，造出三角形），再是配偶（婚配式使用，让三角形一代代复制）。为此，它从链条里抽出一个超越的、「人人都缺」的东西——阳具／律法／那个专制能指（3+1 的「1」），所有部分对象从此都显得缺了点什么。",
        eg: "康德把婚姻定义为「一个人对另一个人性器官的所有权」：部分对象变成了某个人的财产。",
        analogy: "心理博主对你说：「你沉迷刷手机，其实是在找母亲的怀抱。」——一串运转中的连接，被折算成一个完整人物和一份「缺失」。",
      },
    ],
  },
  {
    id: "disjunctive_synthesis", icon: "🔀", name: "析取综合", en: "Disjunctive synthesis of recording", formula: ["或者……或者……或者", "要么……要么……"],
    cells: [
      {
        label: "包含性的、非限制性的使用", svg: DisjLegit,
        text: "精神分裂者并不是「既男又女」的混合体，也不是两者之间的中间态；他是男或女，但两边都属于——在男人那边是男人，在女人那边是女人。每一组对立的两端都被肯定，他滑过两端之间不可分解的距离：trans-sexual、trans-alivedead、trans-parentchild。析取依然是析取，只是不再排除。",
        eg: "尼金斯基的日记：「我是神，我不是神，我是神的小丑……我是丈夫也是妻子……」施瑞伯法官既是男人又是女人、既是父母又是孩子、既死又生。",
        analogy: "像一条环线地铁：每一站都是你的站，你可以在两端之间一路滑行；站与站之间的距离不是障碍，而正是把它们连起来的东西。",
      },
      {
        label: "排他性的、限制性的使用（俄狄浦斯）", svg: DisjIllegit, paralogism: "双重束缚谬误 double bind",
        text: "俄狄浦斯给记录面上的析取强加二选一：是父母还是孩子、是男还是女、是死还是活——「待在你的位置上」。它同时制造了分化与一个用来恐吓的「未分化」：要么内化律法（「解决」俄狄浦斯），要么坠入神经症的想象认同。两头都是俄狄浦斯，像钟摆一样来回把无意识碾平。",
        eg: "贝特森的双重束缚：父亲说「尽管批评我」，又暗示真正的批评不受欢迎。德勒兹与加塔利说，这不是精神分裂的成因，而恰恰就是整个俄狄浦斯。",
        analogy: "像一张只有「男 / 女」「已婚 / 未婚」两个选项、且必填的表格：不是选项不够多，而是表格本身规定了你只能是其中一格，否则就算「填写错误」。",
      },
    ],
  },
  {
    id: "conjunctive_synthesis", icon: "✨", name: "合取综合", en: "Conjunctive synthesis of consumption-consummation", formula: ["原来是我！", "原来是你爸爸！"],
    cells: [
      {
        label: "游牧的、多义的使用", svg: ConjLegit,
        text: "在无器官身体这只「蛋」上，主体沿着强度的梯度与阈限游走，每穿过一个区就消费一次强度，并得出一个「原来是我！」。种族、文化、神祇、历史人物不是他「认同」的人物，而是身体上的强度区；专名不是表象，而是像「焦耳效应」那样的效应。主体只是转一圈后剩下的残余物。",
        eg: "尼采：「历史上的每一个名字都是我。」冒充路易十七的里什蒙不只自称路易十七，还把其他冒名者也收为自己经过的状态。",
        analogy: "像一场万人合唱：在某个副歌的高潮你忽然觉得「这首歌就是我」，下一首又成了另一个「我」。不是你以为自己是歌手，而是一阵强度穿过了你。",
      },
      {
        label: "隔离的、一义的使用（俄狄浦斯）", svg: ConjIllegit, paralogism: "应用谬误 application",
        text: "先有一个隔离的时刻：「我们是自己人，是受外敌威胁的优等种族」（种族主义、民族主义、宗教的投注）——这构成俄狄浦斯所预设的「出发集合」；再有一个家庭化的时刻：把社会场的所有角色一一对应（biunivocal）到爸爸、妈妈、我身上，像把有 4+n 个角的桌布折成 3+1。于是一切都成了「原来是你爸爸！」。",
        eg: "精神分析式的历史书：希特勒「消灭了父亲、释放了坏母亲」，路德「内化了父亲」。——不是父亲被投射到老板身上，而是老板被应用到父亲身上。",
        analogy: "像把一场复杂的职场冲突、一次房价暴涨、一场战争的新闻，统统解读成「你和你爸的关系没处理好」：社会被折叠进了客厅。",
      },
    ],
  },
];

export default function SynthesesMatrix() {
  const [r, setR] = useState(0), [c, setC] = useState(0);
  const row = ROWS[r], cell = row.cells[c], Svg = cell.svg;
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      {/* 小矩阵导航 */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(90px,.8fr) 1fr 1fr", gap: 6, fontSize: 13 }}>
        <div />
        <div style={{ textAlign: "center", color: GREEN, fontWeight: 700 }}>内在的·合法使用<br /><small style={{ fontWeight: 400, color: "var(--muted)" }}>欲望生产 / 精神分裂分析</small></div>
        <div style={{ textAlign: "center", color: RED, fontWeight: 700 }}>超越的·非法使用<br /><small style={{ fontWeight: 400, color: "var(--muted)" }}>俄狄浦斯 / 精神分析</small></div>
        {ROWS.map((x, i) => <Fragment key={x.id}>
          <div style={{ alignSelf: "center", fontFamily: "var(--serif)", fontSize: 16 }}>{x.icon} {x.name}</div>
          {[0, 1].map(j => {
            const on = i === r && j === c;
            return <button key={x.id + j} onClick={() => { setR(i); setC(j); }}
              style={{ border: `1.5px solid ${on ? (j ? RED : GREEN) : "var(--line)"}`, background: on ? (j ? "#fbeee9" : "#e6f1e8") : "var(--paper)", borderRadius: 10, padding: "6px 8px", cursor: "pointer", font: "inherit", fontSize: 13 }}>
              「{x.formula[j]}」
            </button>;
          })}
        </Fragment>)}
      </div>

      <div className="seg" style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>同一个综合，切换用法：</span>
        <button className={c === 0 ? "on" : ""} onClick={() => setC(0)}>🌱 内在使用</button>
        <button className={c === 1 ? "on" : ""} onClick={() => setC(1)}>🔺 俄狄浦斯使用</button>
      </div>

      <svg key={r + "-" + c} viewBox="0 0 520 240" style={{ width: "100%", maxHeight: 300, background: "var(--paper)", borderRadius: 14, borderTop: `4px solid ${c ? RED : GREEN}` }}><Svg /></svg>

      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}>
          <C id={row.id}>{row.name}</C> <span className="muted-it">{row.en}</span> · <b style={{ color: c ? RED : GREEN }}>{cell.label}</b>
        </div>
        {cell.paralogism && <div style={{ marginTop: 6, fontSize: 14 }}><span style={{ background: RED, color: "#fff", borderRadius: 99, padding: "1px 10px" }}>⚠ 对应谬误：{cell.paralogism}</span></div>}
        <p style={{ margin: "8px 0" }}>{cell.text}</p>
        <p style={{ margin: "0 0 6px", color: "var(--muted)", fontSize: 15 }}>📖 书中一例：{cell.eg}</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>💡 现代类比（示意，非原著）：{cell.analogy}</p>
      </div>
    </div>);
}
