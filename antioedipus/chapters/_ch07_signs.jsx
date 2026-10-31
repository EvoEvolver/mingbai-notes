// 第 7 章专属图解 (b)：「声音-图形-眼睛」魔法三角 → 专制能指的金字塔；苏美尔/阿卡德的符号脱离；俄狄浦斯细胞的迁移。
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", GREEN = "#3f6b45";

const NODES = {
  voice: { x: 120, y: 90, icon: "🗣️", color: GOLD },
  graph: { x: 480, y: 90, icon: "✋", color: BLUE },
  eye: { x: 300, y: 300, icon: "👁️", color: GREEN },
};
const IMP = { voice: { x: 120, y: 255 }, graph: { x: 480, y: 255 }, eye: { x: 300, y: 310 } };
const INFO = {
  territorial: {
    voice: ["声音 · 听", "联姻之声：长老宣告、吟唱、立约。它代表「词」，在横向联姻中说话。"],
    graph: ["手 · 图形", "刻在身体上的记号：疤痕、文身、割礼、地上的舞步。它不去「抄写」声音，而是独立地、多维地回应声音。"],
    eye: ["眼睛 · 痛", "集体或神明的眼睛，看着受刑的身体。它不「读」，而是「看见」词语，掂量痛苦，从中榨出一份「代码剩余价值」。"],
    body: ["被标记的身体", "声音与图形在身体上交汇，形成符号。符号不代表什么意思，它直接作用于身体：这是欲望的一种位置与生产。"],
  },
  imperial: {
    voice: ["声音 → 口授、颁布", "声音不再歌唱，而是发号施令。更关键的是，书写制造出一种「来自上面的、沉默的虚构之声」：神或君主只通过文字说话（启示）。"],
    graph: ["图形 → 书写", "图形不再在身体上跳舞，而是把自己排成一行，对齐声音，刻上泥板、石头、书本。它服从于声音，却正因此取代了声音。"],
    eye: ["眼睛 → 阅读、监视", "眼睛不再评估痛苦，而是开始阅读，并负责「预警」：盯住每一份剩余价值，别让它逃出超编码。"],
    body: ["底座：旧三角变成砖块", "魔法三角没有完全消失：领土机器还在新机器里运转，它被压成金字塔的底座。"],
  },
};

export function TrianglePyramid() {
  const [mode, setMode] = useState("territorial");
  const [sel, setSel] = useState("body");
  const imp = mode === "imperial";
  const info = INFO[mode][sel];
  const N = NODES;
  const node = (k, label) => {
    const n = N[k], on = sel === k;
    const { x, y } = P(k);
    return <g key={k} onClick={() => setSel(k)} style={{ cursor: "pointer" }}>
      <circle cx={x} cy={y} r={on ? 34 : 30} fill="#fff" stroke={n.color} strokeWidth={on ? 4 : 2.5} style={{ transition: "all .3s" }} />
      <text x={x} y={y + 8} textAnchor="middle" fontSize="24">{n.icon}</text>
      {imp && k !== "eye"
        ? <text x={k === "voice" ? x - 38 : x + 38} y={y - 26} textAnchor={k === "voice" ? "end" : "start"} fontSize="13" fill={n.color} fontWeight="bold">{label}</text>
        : <text x={x} y={y + (k === "eye" ? 52 : -40)} textAnchor="middle" fontSize="13" fill={n.color} fontWeight="bold">{label}</text>}
    </g>;
  };
  const P = k => (imp ? IMP[k] : N[k]);
  const apex = { x: 300, y: 30 };
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg">
        <button className={!imp ? "on" : ""} onClick={() => { setMode("territorial"); setSel("body"); }}>领土表象：魔法三角</button>
        <button className={imp ? "on" : ""} onClick={() => { setMode("imperial"); setSel("body"); }}>帝国表象：书写的金字塔</button>
      </div>
      <svg key={mode} viewBox="0 0 600 410" style={{ width: "100%", maxHeight: 440, background: "var(--paper)", borderRadius: 14 }}>
        {!imp && <>
          {/* 三边：独立、彼此跳跃 */}
          {[["voice", "graph"], ["graph", "eye"], ["eye", "voice"]].map(([a, b], i) =>
            <line key={i} x1={P(a).x} y1={P(a).y} x2={P(b).x} y2={P(b).y} stroke={INK} strokeWidth="1.5" strokeDasharray="8 6" opacity=".55">
              <animate attributeName="stroke-dashoffset" values="0;-28" dur="1.2s" repeatCount="indefinite" />
            </line>)}
          {/* 锯齿：符号在三者之间跳跃 */}
          <polyline points="150,110 210,150 250,120 300,175 350,130 390,165 450,110" fill="none" stroke={RED} strokeWidth="2" opacity=".6">
            <animate attributeName="opacity" values=".2;.8;.2" dur="2s" repeatCount="indefinite" />
          </polyline>
          <g onClick={() => setSel("body")} style={{ cursor: "pointer" }}>
            <rect x="255" y="170" width="90" height="60" rx="12" fill="#f3e7cf" stroke={sel === "body" ? RED : "#b9ad9a"} strokeWidth="2" />
            <text x="300" y="198" textAnchor="middle" fontSize="20">🧍</text>
            <text x="300" y="220" textAnchor="middle" fontSize="11" fill={INK}>被标记的身体</text>
          </g>
          <text x="300" y="402" textAnchor="middle" fontSize="12" fill="var(--muted)">内涵（connotation）的平面：三者各自独立，符号在其间「之」字形跳跃</text>
        </>}
        {imp && <>
          {/* 底座三角（变成砖块） */}
          <polygon points={`${P("voice").x},${P("voice").y} ${P("graph").x},${P("graph").y} ${P("eye").x},${P("eye").y}`} fill="#e9d8c4" opacity=".55" stroke="#b9ad9a" onClick={() => setSel("body")} style={{ cursor: "pointer" }} />
          <text x="120" y="304" textAnchor="middle" fontSize="11" fill={INK} opacity=".75">旧三角 = 底座（砖块）</text>
          {/* 三条棱汇聚到顶点 */}
          {["voice", "graph", "eye"].map(k => <line key={k} x1={P(k).x} y1={P(k).y} x2={apex.x} y2={apex.y} stroke={RED} strokeWidth="2.5" />)}
          
          <circle cx={apex.x} cy={apex.y} r="22" fill={RED} />
          <text x={apex.x} y={apex.y + 7} textAnchor="middle" fontSize="18">👑</text>
          <text x={apex.x + 30} y={apex.y + 4} fontSize="12" fill={RED} fontWeight="bold">专制能指：来自上面的沉默之声</text>
          {/* 一行线性文字 */}
          <g>
            {Array.from({ length: 8 }, (_, i) => <rect key={i} x={199 + i * 26} y="150" width="18" height="8" rx="2" fill={INK} opacity=".7" />)}
            <text x="300" y="148" textAnchor="middle" fontSize="11" fill={INK} dy="-6">线性的文字流（一行，依附顶点）</text>
          </g>
          <text x="300" y="402" textAnchor="middle" fontSize="12" fill="var(--muted)">从属（subordination）的平面：一切汇向顶点，并被排成一行</text>
        </>}
        {node("voice", imp ? "口授 · 颁布" : "声音 · 听")}
        {node("graph", imp ? "书写 · 泥板" : "手 · 身体上的图形")}
        {node("eye", imp ? "阅读 · 监视" : "眼睛 · 痛")}
      </svg>
      <div style={{ minHeight: 70 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 19 }}>{info[0]}</div>
        <p style={{ margin: "4px 0 0" }}>{info[1]}</p>
      </div>
      <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>点击三个顶点或中间区域查看说明。一句话：领土里，图形<b>不依附</b>声音，所以社会是「口头的」；帝国里，图形<b>对齐</b>声音成了文字，结果文字反过来统治声音。见 <C id="magic_triangle">魔法三角</C>、<C id="despotic_signifier">专制能指</C>。</p>
    </div>);
}

const SUMER = [
  { who: "苏美尔人", say: "这个记号画的就是水，我们读作「a」。", link: true, sound: "a", meaning: "💧 水" },
  { who: "阿卡德学生", say: "「老师，这是什么？」——「这是 a。」阿卡德语里「水」叫 mû，跟 a 毫无关系。", link: true, sound: "a", meaning: "💧 水（mû）？" },
  { who: "阿卡德人", say: "记号从此只等于一个音「a」，与水断了联系：它变成了一个纯粹的、可拼写的音符。", link: false, sound: "a", meaning: "（与水无关）" },
];

export function SumerDemo() {
  const [i, setI] = useState(0), s = SUMER[i];
  return (
    <div className="card" style={{ display: "grid", gap: 10 }}>
      <div className="seg">{SUMER.map((x, j) => <button key={j} className={i === j ? "on" : ""} onClick={() => setI(j)}>{j + 1}. {x.who}</button>)}</div>
      <svg viewBox="0 0 600 150" style={{ width: "100%", maxHeight: 180, background: "var(--paper)", borderRadius: 14 }}>
        {/* 示意字形（非真实楔形文字） */}
        <g transform="translate(70,40)">
          <rect x="-20" y="-15" width="100" height="100" rx="10" fill="#e9d8c4" stroke="#b9ad9a" />
          <path d="M0,20 l18,-8 l0,16 z M26,40 l18,-8 l0,16 z M52,20 l18,-8 l0,16 z" fill={INK} />
          <text x="30" y="80" textAnchor="middle" fontSize="10" fill="var(--muted)">示意字形</text>
        </g>
        <line x1="180" y1="60" x2="300" y2="60" stroke={GOLD} strokeWidth="3" />
        <text x="320" y="68" fontSize="24" fill={GOLD} fontFamily="serif">「{s.sound}」</text>
        <text x="240" y="50" textAnchor="middle" fontSize="11" fill={GOLD}>读音</text>
        <line x1="180" y1="100" x2="420" y2="100" stroke={BLUE} strokeWidth="3" strokeDasharray={s.link ? (i === 1 ? "6 6" : "0") : "2 10"} opacity={s.link ? 1 : .3} style={{ transition: "all .5s" }} />
        <text x="440" y="106" fontSize="18" fill={BLUE} opacity={s.link ? 1 : .35}>{s.meaning}</text>
        {!s.link && <text x="300" y="130" textAnchor="middle" fontSize="13" fill={RED}>✂ 符号脱离了事物 = 去领土化的符号 = 能指</text>}
      </svg>
      <p style={{ margin: 0 }}><b>{s.who}：</b>{s.say}</p>
      <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>书中引亚述学家 Nougayrol 的推测：两个民族（主人与被征服者）的接触，几乎是新文字（表音化）诞生的必要条件。德勒兹与加塔利由此说：书面语言预设了「两种语言」，一种属于主人，一种属于奴隶。</p>
    </div>);
}

const SLOTS = [
  { id: "rep", zh: "被压抑的表象者", en: "repressed representative", note: "欲望本身：未编码的强度之流" },
  { id: "repr", zh: "压抑的表象", en: "repressing representation", note: "执行压抑的那套规矩" },
  { id: "disp", zh: "被移置的被表象者", en: "displaced represented", note: "压抑制造出来的、用来抹黑欲望的假形象" },
];
const ERAS = [
  {
    label: "原始领土机器", at: "disp", other: { rep: "强度的胚芽流（大地的记忆）", repr: "联姻（与债务）" },
    text: "乱伦只是一个被移置的形象：一条「什么也过不去的浅溪」。名称（母亲、姐妹）和身体永远对不上，所以乱伦根本不可能发生。压抑靠的是联姻，而不是俄狄浦斯。",
  },
  {
    label: "野蛮专制机器", at: "repr", other: { rep: "欲望之流（被君主据为己有）", disp: "新的移置形象：隐喻与换喻" },
    text: "乱伦第一次变得「可能」：成为君主的特权与印记。它从被移置的形象，升级为压抑本身的执行者。君主乱伦不是解放欲望，而是超编码欲望的手段。父亲和儿子还没有出场，三角是「君主-姐妹-母亲」。",
  },
  {
    label: "资本主义机器（下一章）", at: "rep", other: { repr: "私人化家庭中的压抑", disp: "（俄狄浦斯也仍是假形象）" },
    text: "迁移还要再走一步：俄狄浦斯不仅压抑欲望，还要冒充「欲望本身」——你以为自己内心深处就是想要爸爸妈妈。无限债务被内化、精神化，三角「男性化」为父-母-子。这一步要到下一章才完成。",
  },
];

export function OedipalMigration() {
  const [e, setE] = useState(0), era = ERAS[e];
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg">{ERAS.map((x, j) => <button key={j} className={e === j ? "on" : ""} onClick={() => setE(j)}>{x.label}</button>)}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 10 }}>
        {SLOTS.map(sl => {
          const here = era.at === sl.id;
          return <div key={sl.id} style={{ border: `2px ${here ? "solid" : "dashed"} ${here ? RED : "var(--line)"}`, borderRadius: 14, padding: 12, background: here ? "#fbefea" : "var(--paper)", transition: "all .4s", minHeight: 150 }}>
            <div style={{ fontWeight: "bold" }}>{sl.zh}</div>
            <div className="muted-it" style={{ fontSize: 12 }}>{sl.en}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", margin: "4px 0 8px" }}>{sl.note}</div>
            {here
              ? <div style={{ fontSize: 15, color: RED, fontWeight: "bold" }}>🔺 乱伦 / 俄狄浦斯形象在这里</div>
              : <div style={{ fontSize: 14 }}>{era.other[sl.id]}</div>}
          </div>;
        })}
      </div>
      <p style={{ margin: 0 }}>{era.text}</p>
      <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>书中称之为俄狄浦斯「细胞」在表象各层之间的迁移。见 <C id="oedipal_migration">俄狄浦斯的迁移</C>、<C id="royal_incest">君主的双重乱伦</C>。</p>
    </div>);
}
