// 第 3 章专属图解一：「寻找外部」——每个被当作资本之外的「真实」候选，如何被折回力比多带
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", GREEN = "#3c6b4a";

const CANDS = [
  {
    id: "proletariat", icon: "⛓️", name: "无产阶级的苦难", who: "马克思（1843）",
    pitch: "有一个「戴着彻底锁链」的阶级，它承受的不是某个具体的不公，而是总体的不公；它的总体苦难，就是全人类总体救赎的价格。",
    fold: [
      "这是一出基督教剧本：无产阶级是受难的基督，马克思是为他作证的殉道者，理论写作是他背负的十字架。",
      "可「苦难换救赎」要成立，得先有一个记账的主体——一个能把痛苦与快感登记、结算的参照之身。利奥塔猜测，马克思的研究之所以停不下来，正是因为他隐约发现：没有人在为苦难与享乐记账。",
      "被统治者也并非只有苦难：同一具劳动的身体里，痛苦与享乐、顺从与反抗交织在一起，无法干净地分开。把它只读成「缺失」，就是把它的力量（puissance）读成了负数。",
    ],
    verdict: "「受难—救赎」是一种怨恨与赎罪的力比多装置，而不是站在资本之外的支点。",
    cid: "little_girl_marx", sec: "§1 力比多的马克思；§3 一切政治经济学都是力比多的",
  },
  {
    id: "organic", icon: "🌾", name: "未异化的（无）机身体", who: "马克思《大纲》；居埃里",
    pitch: "前资本主义的公社里，土地是劳动者的「无机身体」，个人、公社、大地是同一具身体的三个部件；资本把它撕裂了。",
    fold: [
      "所谓「无机」只是相对劳动者的肉身而言；实际上它是一具与肉身有机相连、同样是「给定的而非生产出来的」大身体——自然在其中自我再生产。",
      "利奥塔反驳：头从来都在。即使行会内部不分高下，古代城邦的言说与刀剑（斯巴达、雅典的政治修辞）早就把各种冲动归拢到一个中心零点之下。",
      "「完整的身体」本身就是一个幻想（希腊式的爱欲-卫生，或基督教式的爱欲-超自然），所有「异化」都是对照它想出来、怨恨出来的。",
    ],
    verdict: "（无）机身体是资本剧场舞台上的一个表象，是「回归之欲」投注的对象。",
    cid: "inorganic_body", sec: "§4 续；§6 无机身体",
  },
  {
    id: "usevalue", icon: "💪", name: "使用价值 / 活劳动力", who: "马克思《资本论》",
    pitch: "劳动力给出的比它消耗的多：这份「额外的礼物」是剩余价值的隐秘源头，处在一切估价之外，所以资本终将因此崩溃。",
    fold: [
      "这正是巴塔耶「主权耗费」的模型被请回了批判：一份超越价值的原初馈赠，藏在一切等价交换之下。",
      "但使用价值和交换价值一样，属于可感符号的系统，并不在系统之外。马克思自己在《大纲》里也承认：随着大工业，知识成为直接生产力，直接劳动退到生产过程的「旁边」。",
      "资本要增长，只需要系统某处存在一个能量的「势差」——它可以取自人，也可以取自自然。它的外部是自然的，而不是超越的。那么，罪责何在？",
    ],
    verdict: "「力」是检察官为起诉资本而设定的超越性外部；斯拉法式的模型可以完全不用它。",
    cid: "living_force", sec: "§8 力；§9 同义反复",
  },
  {
    id: "symbolic", icon: "🎁", name: "原始社会 / 象征交换", who: "鲍德里亚《生产之镜》",
    pitch: "原始社会没有生产方式，也没有生产；没有辩证法，也没有无意识。那里只有馈赠与回赠，爱与死的双重情感在不计得失的耗费中流转。",
    fold: [
      "利奥塔回答：没有原始社会。民族志里最极端的强度（克拉斯特尔笔下瓜亚基人的仪式性谋杀、莱里斯遇见的贡德尔附魔者）同样被读成秩序、回归秩序，它们组成社会而不颠覆它——所以「象征交换」也是政治经济学意义上的交换。",
      "「礼物」本身是一个剧场性的观念：它预设一个主体、一个专属的身体与财产，然后慷慨地越过它。莫斯不是发现了前资本主义经济，而是在这个经济的心脏里发明了它不可或缺的「先在—外在」补充。",
      "说野蛮人「没有无意识」，等于对美拉尼西亚人重演荷尔德林与青年黑格尔对希腊人做过的事：想象一个透明、和解的他者。这仍是西方「好野蛮人」的幻想。",
    ],
    verdict: "象征交换是一个高度力比多化的「凝缩」观念，它扮演的是批判资本时那个失落的参照与不在场证明。",
    cid: "symbolic_exchange", sec: "§2 没有颠覆性的区域；§5 没有原始社会",
  },
  {
    id: "marginal", icon: "🌼", name: "边缘人与嬉皮", who: "鲍德里亚",
    pitch: "被生产力的发展放逐到流通之外的一代代人，是现代社会中正面在场的颠覆者——他们不是「否定之否定」，而是力比多的肯定。",
    fold: [
      "利奥塔承认这比马克思高明：这里没有辩证法，颠覆不进入政治经济学的秩序。",
      "他担心的只是一个「方法上」的小细节：肯定被划成了一个区域。",
      "而每个区域都会生出政体与统治、符号与机制；把全部希望押在一个区域上，注定要绝望。",
    ],
    verdict: "「颠覆性区域」只是把外部从过去搬到了社会边缘，横杠照样把带子折成剧场。",
    cid: "subversive_region", sec: "§2 没有颠覆性的区域",
  },
  {
    id: "creativity", icon: "✨", name: "创造性与自发性", who: "卡斯托里亚迪斯",
    pitch: "现代资本主义的核心问题不再是剥削，而是官僚化扼杀了人们不断自发创造新关系的能力；以普遍的创造性对抗普遍的异化。",
    fold: [
      "利奥塔在这里插入了一段「仇恨的括号」，讲述 1964 年与卡斯托里亚迪斯的决裂：普遍异化理论必然以普遍创造性理论为其孪生。",
      "这是黑格尔（也许还有耶稣）以来唯一一种「不异化又不成为神」的办法，也就是人自己成神的浮士德式新宗教。",
      "要紧的不是换一套说法，而是换掉话语的位置：只要还在说「重启革命」，还在当拯救者，墙就还是同一堵墙。",
    ],
    verdict: "「创造性」是缺失理论的另一面——把被统治者的力量先读成匮乏，再许诺补回来。",
    cid: "no_critique", sec: "§4 续",
  },
  {
    id: "desire", icon: "🌀", name: "欲望 / 分裂欲望本身", who: "利奥塔自己（及其同道）",
    pitch: "好吧，那就不要无产阶级、不要原始社会：流动是善，投注是恶；运动与事件是善，重复同一的反应是恶。分裂欲望才是真理！",
    fold: [
      "利奥塔先拿自己开刀：如果我们只是揭发马克思的怨恨，然后把符号倒过来——他要有机身体，我们要不稳定的身体；他起诉，我们赦免——那只是换了一个新神。",
      "宣布某种装置有「排他的价值」，这个排他的价值就叫真理。「分裂欲望才是真理」与「爱是真理」「社会主义是真理」的肯定方式没有区别。",
      "所以规则是：永远不要把任何东西描述为结果（效应），而要描述它能产生什么效应——欲望也不能被立为外部法庭。",
    ],
    verdict: "连「欲望」也不能当作资本之外的好地方；它在资本里面，也在马克思的理论写作里面。",
    cid: "no_critique", sec: "§1 力比多的马克思",
  },
];

// 无限符号形状的单面带
const BAND = "M 110 130 C 110 50, 290 50, 320 130 C 350 210, 530 210, 530 130 C 530 50, 350 50, 320 130 C 290 210, 110 210, 110 130 Z";
const OUT = { x: 590, y: 44 }, IN = { x: 450, y: 176 };

export default function FindOutside() {
  const [i, setI] = useState(null);
  const [folded, setFolded] = useState(false);
  const [done, setDone] = useState([]);
  const c = i === null ? null : CANDS[i];
  const pick = j => { setI(j); setFolded(false); };
  const fold = () => { setFolded(true); if (!done.includes(i)) setDone([...done, i]); };
  const pos = folded ? IN : OUT;

  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg" style={{ flexWrap: "wrap" }}>{CANDS.map((x, j) =>
        <button key={x.id} className={i === j ? "on" : ""} onClick={() => pick(j)}>
          {done.includes(j) ? "✓ " : ""}{x.icon} {x.name}</button>)}</div>

      <svg viewBox="0 0 640 240" style={{ width: "100%", maxHeight: 300, background: "var(--paper)", borderRadius: 14 }}>
        <path d={BAND} fill="none" stroke={GOLD} strokeWidth="26" opacity=".22" />
        <path d={BAND} fill="none" stroke={GOLD} strokeWidth="3" strokeDasharray="10 8">
          <animate attributeName="stroke-dashoffset" values="0;-36" dur="1.2s" repeatCount="indefinite" />
        </path>
        <text x="200" y="135" textAnchor="middle" fontSize="15" fill={INK}>资本</text>
        <text x="440" y="135" textAnchor="middle" fontSize="13" fill={INK} opacity=".7">理论·工作·货币·身体…</text>
        <text x="320" y="230" textAnchor="middle" fontSize="12" fill={INK} opacity=".55">力比多带：只有一面，没有内外</text>

        {/* 批判之矛：从外部指向资本 */}
        <g style={{ opacity: c && !folded ? 1 : 0, transition: "opacity .5s" }}>
          <line x1={OUT.x - 40} y1={OUT.y + 10} x2="230" y2="100" stroke={RED} strokeWidth="2" strokeDasharray="6 5" />
          <polygon points="230,100 244,92 240,106" fill={RED} />
          <text x="400" y="62" textAnchor="middle" fontSize="12" fill={RED}>批判：站在外面审判</text>
        </g>

        {c && <g style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, transition: "transform 1.3s cubic-bezier(.6,-0.2,.3,1.3)" }}>
          {/* 剧场布景框：外部其实是被搭出来的舞台 */}
          <rect x="-44" y="-26" width="88" height="52" rx="4" fill="none" stroke={BLUE} strokeWidth="2"
            style={{ opacity: folded ? 0 : 1, transition: "opacity .8s" }} />
          <circle r="22" fill={folded ? GREEN : BLUE} opacity=".9" style={{ transition: "fill 1s" }} />
          <text y="8" textAnchor="middle" fontSize="22">{c.icon}</text>
          <text y={folded ? -30 : 42} textAnchor="middle" fontSize="12" fill={folded ? GREEN : BLUE}>
            {folded ? "也在带上" : "「外部」？"}</text>
        </g>}
        {!c && <text x="590" y="50" textAnchor="middle" fontSize="13" fill={BLUE}>选一个「外部」</text>}
      </svg>

      {!c && <p style={{ margin: 0, color: "var(--muted)" }}>每一种对资本的批判，都需要一个站在资本之外的「真实」作支点。上面是常被请来担任这个角色的候选。点一个，看它如何被利奥塔折回同一条带子上。</p>}

      {c && <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}>{c.icon} {c.name} <span className="muted-it" style={{ fontSize: 15 }}>· 提出者：{c.who}</span></div>
        <p style={{ margin: "8px 0", padding: "10px 14px", background: "var(--paper)", borderLeft: `4px solid ${BLUE}`, borderRadius: 8 }}>
          <b style={{ color: BLUE }}>它被当作外部时说：</b>{c.pitch}</p>
        {!folded && <button className="btn" onClick={fold} style={{ padding: "8px 16px", borderRadius: 99, border: `1px solid ${RED}`, background: "#fbeee9", color: RED, cursor: "pointer", fontSize: 15 }}>看它怎样被折回 →</button>}
        {folded && <div style={{ display: "grid", gap: 8 }}>
          {c.fold.map((f, k) => <div key={c.id + k} style={{ animation: `fadeUp .6s ${k * .35}s both`, display: "flex", gap: 10 }}>
            <span style={{ flex: "0 0 26px", height: 26, borderRadius: 99, background: GREEN, color: "#fff", display: "grid", placeItems: "center", fontSize: 13 }}>{k + 1}</span>
            <span>{f}</span></div>)}
          <div style={{ marginTop: 4, padding: "10px 14px", background: "#eef4ee", borderLeft: `4px solid ${GREEN}`, borderRadius: 8, animation: "fadeUp .6s 1.1s both" }}>
            <b style={{ color: GREEN }}>结论：</b>{c.verdict} <span style={{ color: "var(--muted)", fontSize: 14 }}>相关概念：<C id={c.cid} />　📖 {c.sec}</span></div>
        </div>}
      </div>}

      <div style={{ fontSize: 14, color: "var(--muted)" }}>已折回 {done.length} / {CANDS.length}
        {done.length === CANDS.length && <b style={{ color: GREEN }}>　—— 没有一个外部站得住。剩下的不是批判，而是对资本全部享乐装置的「惊恐的着迷」。</b>}</div>
      <style>{"@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}"}</style>
    </div>);
}
