// 第 2 章专属图解：「自然」被生产代码重写 —— 三种视角切换（象征交换 / 政治经济学 / 马克思主义的镜像）
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3d6b45", INK = "#1f1b16", MUTED = "#8a8075";

// 可点击的标签框：CJK 字符按 1 个字宽、ASCII 按半个估算宽度
function Spot({ x, y, label, sub, color = INK, on, onClick, pulse }) {
  const w = s => [...(s || "")].reduce((a, ch) => a + (ch.charCodeAt(0) > 255 ? 1 : .55), 0);
  const W = Math.max(w(label) * 15, w(sub) * 11.5) + 26, H = sub ? 46 : 30;
  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      <rect x={x - W / 2} y={y - H / 2} width={W} height={H} rx="10" fill={on ? color : "#fffdf8"} stroke={color} strokeWidth={on ? 2.5 : 1.6}>
        {pulse && <animate attributeName="stroke-width" values="1.6;4;1.6" dur="1.4s" repeatCount="indefinite" />}
      </rect>
      <text x={x} y={sub ? y - 4 : y + 5} textAnchor="middle" fontSize="15" fontWeight="600" fill={on ? "#fff" : color}>{label}</text>
      {sub && <text x={x} y={y + 15} textAnchor="middle" fontSize="11.5" fill={on ? "#fff" : MUTED}>{sub}</text>}
    </g>);
}

const Flow = ({ path, color, n = 3, dur = 3, r = 4.5 }) => <>
  {Array.from({ length: n }).map((_, k) =>
    <circle key={k} r={r} fill={color}>
      <animateMotion dur={`${dur}s`} begin={`-${(k * dur) / n}s`} repeatCount="indefinite" path={path} />
    </circle>)}
</>;

const RING = "M 140 170 A 180 100 0 1 1 500 170 A 180 100 0 1 1 140 170";

const MODES = [
  {
    id: "sym", tab: "🔄 象征交换中的自然",
    title: "没有「主体」与「客体」，只有一个互惠的环",
    summary: "在象征交换里，人并不拿自己去「对付」自然。人从自然那里得到，也必须回馈：献祭、守禁忌、履行义务。双方被义务和交换绑在一起，所以既没有一个要被征服的「必然性」，也没有「匮乏」这条自然律。点图中标签看细节。",
    spots: [
      { id: "man", x: 140, y: 170, label: "人", color: BLUE, note: "这里的人还没有被当成「劳动力」。他不拿「必然性」来衡量自己和自然的关系，因为「必然性」这条律法要等自然变成客体以后才会出现。" },
      { id: "nat", x: 500, y: 170, label: "自然", color: GREEN, note: "这里的自然也不是「资源」或「生产力」，而是交换中的一方。人对它负有象征义务，拿了就得还。" },
      { id: "give", x: 320, y: 290, label: "馈赠 · 收获", sub: "自然 → 人", color: GREEN, note: "收获被体验为一份馈赠，馈赠就带来要还的债。下面的「回礼」就是还这份债。" },
      { id: "back", x: 320, y: 50, label: "回礼 · 献祭 · 守禁忌", sub: "人 → 自然", color: BLUE, note: "人回馈自然，交换才能继续下去。莱库古的神话讲的就是反面：一旦单方面对自然下手、打断交换，惩罚马上就来。" },
      { id: "core", x: 320, y: 170, label: "互惠 / 可逆", sub: "没有必然性、匮乏、律法", color: GOLD, note: "鲍德里亚认为，原始秩序的整套象征策略，就是为了不让「律法」出现。所以在这里既谈不上必然性和匮乏，也谈不上压抑和无意识。" },
    ],
    draw: () => <>
      <path d={RING} fill="none" stroke={GOLD} strokeWidth="3" opacity=".55" />
      <Flow path={RING} color={GOLD} n={6} dur={7} />
    </>,
  },
  {
    id: "pe", tab: "➡️ 政治经济学中的自然",
    title: "环断了：主体 → 客体，自然一分为二",
    summary: "18 世纪，自然进入了被技术支配的时代。主体和「自然-客体」彻底分开，又一起被生产原则收编：自然被「解放」成生产力，人被「解放」成劳动力。被硬性理性化的自然在别处冒了出来，于是分裂成被驯服的「好自然」和充满威胁的「坏自然」，人也照样分裂成两种。",
    spots: [
      { id: "prod", x: 320, y: 30, label: "生产原则 = 镜子 / 代码", color: INK, note: "主体和自然看起来是两极，其实是同一种合理性里的两个项：都是生产要素。把两者「辩证地」统一起来的，是同一个抽象形式。生产就是那面让一切按代码对应起来的镜子。" },
      { id: "subj", x: 120, y: 130, label: "主体", sub: "人 = 劳动力", color: BLUE, note: "自然被「解放」成生产力的同时，个人也被「解放」成劳动力。这两种分离看起来对立，其实是一伙的。" },
      { id: "obj", x: 340, y: 130, label: "自然-客体", sub: "自然 = 生产力", color: GREEN, note: "自然成了「大所指」「大参照」，被科学、技术和生产盖上「真实」的印章。它的「现实」不过是工业结构化的运作原则。马克思说劳动是财富之父、土地是财富之母，鲍德里亚说这是错的：劳动并不是人和自然一起生孩子。" },
      { id: "good", x: 548, y: 70, label: "好自然", sub: "资源 · 理想的文化参照", color: GREEN, note: "被支配、被理性化的自然。它被当作理想的文化参照，比如「天然」「回归自然」。可它本身就是被支配的本质。" },
      { id: "bad", x: 548, y: 200, label: "坏自然", sub: "敌意 · 灾难 · 污染", color: RED, pulse: true, note: "被强行理性化的自然，又以非理性的样子回来：敌对、威胁、灾难、污染。全部资产阶级意识形态就在这两极之间摇摆。" },
      { id: "gm", x: 62, y: 262, label: "善人", sub: "被剥削的劳动力", color: BLUE, note: "从 18 世纪起，「人」也被一分为二。一边是天性善良、有待解放的理性潜能，其实是把人升华成了生产力。被剥削时的劳动力也属于这一边：它「正常」，合乎自然。马克思主义和各种革命视角都站在这个乐观的版本上。" },
      { id: "bm", x: 184, y: 262, label: "恶人", sub: "危险的无产阶级", color: RED, pulse: true, note: "另一边是本能邪恶的人。劳动力一旦「解放」，以无产阶级的面目出现，就被说成魔鬼般的、破坏性的「坏自然」。经济秩序里的分裂就这样转成了道德秩序和社会歧视。" },
    ],
    draw: () => <>
      <path d={RING} fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="5 8" opacity=".18" />
      <text x="500" y="300" textAnchor="middle" fontSize="12" fill={RED} opacity=".75">✕ 与自然的象征交换被禁止</text>
      <line x1="120" y1="44" x2="520" y2="44" stroke={INK} strokeWidth="1" opacity=".25" />
      <line x1="120" y1="44" x2="120" y2="104" stroke={INK} strokeDasharray="3 4" opacity=".3" />
      <line x1="340" y1="44" x2="340" y2="104" stroke={INK} strokeDasharray="3 4" opacity=".3" />
      <line x1="170" y1="130" x2="282" y2="130" stroke={BLUE} strokeWidth="5" markerEnd="url(#m2arr)" />
      <text x="226" y="118" textAnchor="middle" fontSize="12.5" fill={BLUE}>支配 · 开发</text>
      <Flow path="M 172 130 L 280 130" color={BLUE} n={3} dur={1.6} r={4} />
      <path d="M 400 120 C 450 100, 470 75, 490 72" fill="none" stroke={GREEN} strokeWidth="3" />
      <path d="M 400 142 C 450 170, 470 195, 490 198" fill="none" stroke={RED} strokeWidth="3" strokeDasharray="6 4" />
      <Flow path="M 400 120 C 450 100, 470 75, 490 72" color={GREEN} n={2} dur={2.2} r={3.5} />
      <Flow path="M 400 142 C 450 170, 470 195, 490 198" color={RED} n={2} dur={2.2} r={3.5} />
      <path d="M 105 154 L 70 238" stroke={BLUE} strokeWidth="2.5" fill="none" />
      <path d="M 135 154 L 175 238" stroke={RED} strokeWidth="2.5" strokeDasharray="6 4" fill="none" />
    </>,
  },
  {
    id: "mx", tab: "🪞 马克思主义：镜中的翻转",
    title: "内容翻了面，形式原封未动",
    summary: "马克思主义拆穿了私有制、市场和资本的「自然性」，却原样接过了「自然的必然性」「匮乏」和生产力。它的革命蓝图只是把这些范畴翻过来：用支配自然对付必然性，用丰裕对付匮乏。精神分析也一样，用无意识的「解放」去对付压抑。底座没动，所以这面镜子照出来的仍是政治经济学。",
    spots: [
      { id: "l1", x: 150, y: 60, label: "必然性", sub: "与自然搏斗", color: RED, note: "马克思说，野蛮人和文明人在一切生产方式下都必须与自然搏斗来满足需要。鲍德里亚反驳：原始人在象征交换中并不以自然来衡量自己，「必然性」只是在自然被客体化之后才成立的律法。" },
      { id: "r1", x: 490, y: 60, label: "自由", sub: "有意识地支配自然", color: GREEN, note: "马克思主义拿来对付必然性的是「支配自然」，而支配自然正是政治经济学写下的那个终极目的。所谓自由，就是必然性被升华后的反面。" },
      { id: "l2", x: 150, y: 128, label: "匮乏", sub: "Scarcity", color: RED, note: "匮乏不是经济天生就有的维度。它产生于市场经济，又不断再生产出经济交换。原始交换根本不知道这条装成人类本体论的「自然律」。" },
      { id: "r2", x: 490, y: 128, label: "丰裕", sub: "「各取所需」", color: GREEN, note: "用丰裕对抗匮乏，却从不追问这两个概念本身多么任意，又怎样被政治经济学塑造。「需要」仍被当作人的自然本质。" },
      { id: "l3", x: 150, y: 196, label: "压抑 · 律法", sub: "精神分析", color: RED, note: "精神分析的律法、禁令、压抑，和唯物主义的必然性、匮乏一样，根源都是自然的客体化。莱库古的故事显示：律法和阉割来自与自然交换的断裂，并不是什么普遍的人类结构。" },
      { id: "r3", x: 490, y: 196, label: "解放无意识", sub: "弗洛伊德-马克思主义", color: GREEN, note: "把无意识理解成被压住的「自然财富」，等着革命行动让它迸发出来。这和马克思主义一样，都是接受了一个本质性的形式，再把它的内容理想化、升华掉。" },
      { id: "base", x: 320, y: 278, label: "共同底座：主体支配自然 · 生产原则", color: INK, note: "这就是为什么鲍德里亚说没有哪种辩证法能带人走出政治经济学：辩证运动本身就是政治经济学的运动。必然性、匮乏、生产这些概念不能翻转，只能炸掉。" },
    ],
    draw: () => <>
      <defs>
        <linearGradient id="m2mir" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#cfd8e3" /><stop offset=".5" stopColor="#ffffff" /><stop offset="1" stopColor="#cfd8e3" />
        </linearGradient>
      </defs>
      <rect x="312" y="22" width="16" height="214" rx="4" fill="url(#m2mir)" stroke={BLUE} strokeWidth="1">
        <animate attributeName="opacity" values=".6;1;.6" dur="2.6s" repeatCount="indefinite" />
      </rect>
      <text x="320" y="16" textAnchor="middle" fontSize="11.5" fill={MUTED}>生产之镜</text>
      <text x="150" y="16" textAnchor="middle" fontSize="12" fill={RED}>政治经济学的「坏自然」</text>
      <text x="490" y="16" textAnchor="middle" fontSize="12" fill={GREEN}>马克思主义的革命蓝图</text>
      {[60, 128, 196].map((y, k) => <g key={y}>
        <line x1="222" y1={y} x2="414" y2={y} stroke={GOLD} strokeWidth="2" strokeDasharray="4 5" markerEnd="url(#m2arrg)" />
        <circle r="4" fill={GOLD}><animateMotion dur="2.4s" begin={`-${k * .5}s`} repeatCount="indefinite" path={`M 222 ${y} L 412 ${y}`} /></circle>
      </g>)}
      <text x="268" y="250" textAnchor="middle" fontSize="11.5" fill={GOLD}>只翻转内容</text>
      <rect x="40" y="258" width="560" height="40" rx="10" fill="none" stroke={INK} strokeWidth="1" opacity=".15" />
      <line x1="150" y1="222" x2="150" y2="258" stroke={INK} opacity=".25" />
      <line x1="490" y1="222" x2="490" y2="258" stroke={INK} opacity=".25" />
    </>,
  },
];

export default function NatureRewritten() {
  const [i, setI] = useState(0);
  const [s, setS] = useState(null);
  const m = MODES[i];
  const spot = m.spots.find(x => x.id === s);
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg">{MODES.map((x, j) =>
        <button key={x.id} className={i === j ? "on" : ""} onClick={() => { setI(j); setS(null); }}>{x.tab}</button>)}</div>
      <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}>{m.title}</div>
      <svg key={m.id} viewBox="0 0 640 320" style={{ width: "100%", maxHeight: 380, background: "var(--paper)", borderRadius: 14 }}>
        <defs>
          <marker id="m2arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill={BLUE} /></marker>
          <marker id="m2arrg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill={GOLD} /></marker>
        </defs>
        {m.draw()}
        {m.spots.map(p => <Spot key={p.id} {...p} on={s === p.id} onClick={() => setS(s === p.id ? null : p.id)} />)}
      </svg>
      <div style={{ minHeight: 84, background: "var(--paper)", borderRadius: 12, padding: "10px 14px", borderLeft: `4px solid ${spot ? spot.color : GOLD}` }}>
        {spot ? <><b>{spot.label}</b>{spot.sub ? <span className="muted-it">（{spot.sub}）</span> : null}：{spot.note}</>
          : <>{m.summary}</>}
      </div>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>
        💡 三张图要连起来看：第二张把第一张的环剪断；第三张说明 <C id="sublimation">马克思主义的翻转</C> 只是在镜子里换了内容，剪断的环并没有接回去。
      </p>
    </div>);
}
