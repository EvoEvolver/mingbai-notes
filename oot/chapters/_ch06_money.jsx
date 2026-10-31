// 第 6 章专属图解（一）：货币观念的三次转变 + 「货币与财富是一对孪生质量」小实验
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#6b6257";

// 三个属性：有价格（珍贵）/ 衡量 / 替代（交换）
const NODE = {
  price: { label: "珍贵（自身有价格）", c: GOLD },
  measure: { label: "能衡量一切价格", c: BLUE },
  subst: { label: "能替代、能交换", c: GREEN },
};
// 每个阶段：谁在底部当「基础」，谁在上面当「派生」
const POS = {
  base: { x: 280, y: 196 }, l: { x: 130, y: 62 }, r: { x: 430, y: 62 },
};

const ERAS = [
  {
    id: "mark", tab: "16 世纪 · 标记", concept: "money_as_mark",
    layout: { price: "base", measure: "l", subst: "r" },
    rule: "因为金属本身珍贵 → 所以能衡量、能交换",
    text: "货币之所以能「表示」财富，是因为它自己就是财富：金属稀有、有用、令人渴望，像草药表面的标记一样，把「真实的印记」带在身上。所以改革者要求币面值必须等于所含金属重量；面值偏离重量，就是「伪造的标记」。",
    eg: "1561 年英格兰把一连串贬值后的硬币面值「拉回」到实际含银量；1577 年法国以金埃居同时充当实币和记账单位。",
    hint: "它与第 2 章同构：标记 = 相似；交换在需求体系里的位置，正对应相似在知识体系里的位置。地下的金属矿脉与天上的星辰遥相呼应。",
  },
  {
    id: "sign", tab: "17 世纪 · 重商主义", concept: "mercantilism",
    layout: { subst: "base", measure: "l", price: "r" },
    rule: "因为能交换（表征财富）→ 所以能衡量、所以才珍贵",
    text: "三种属性还在，但地基翻了个面：交换功能成了基础，「衡量」和「有价格」都从它派生。金银本身几乎没有家用价值；是被铸成货币，才获得了稀缺和用处。物的价值由人的估价决定，货币只是像名称表征观念那样把它表示出来。",
    eg: "17 世纪论者直言：货币的价值不来自材料，而来自它的形式——君主的像或印记。福柯据此概括：金子珍贵，是因为它是货币，而不是反过来。",
    hint: "所以重商主义并非「把金钱和财富混为一谈」：它是让货币覆盖全部财富、毫无剩余地表征它们——就像任何生物都能被分类、任何个体都能被命名。",
  },
  {
    id: "pledge", tab: "17 世纪末起 · 抵押", concept: "pledge",
    layout: { subst: "base", measure: "l", price: "r" },
    rule: "货币 = 抵押（pledge）：一张能换回等值之物的「凭证」",
    text: "货币是公认的凭证，因而是一种虚构；但它又必须恰好值它换来的东西，因为随时能再换回同量的货物。它是物质化的记忆、延期完成的交换。剩下唯一的分歧：这份抵押由什么来担保？拖动下方滑块看两种答案。",
    eg: "Law 用土地、后来用贸易公司担保纸币；1726 年后法国回到稳定的金属币，Turgot 批评 Law 把货币只当符号。",
    hint: "Law 和反对者的争论，只关于「抵押」与「被抵押之物」之间的距离——他们共享同一个货币定义。",
  },
];

function Node({ id, at }) {
  const p = POS[at], n = NODE[id], base = at === "base";
  return <g style={{ transform: `translate(${p.x}px,${p.y}px)`, transition: "transform .8s cubic-bezier(.5,0,.2,1)" }}>
    <rect x={-92} y={-22} width={184} height={44} rx={22} fill={base ? n.c : "#fffdf8"} stroke={n.c} strokeWidth={2.5} />
    <text y={6} textAnchor="middle" fontSize={15} fill={base ? "#fffdf8" : n.c} fontWeight={600}>{n.label}</text>
    {base && <text y={44} textAnchor="middle" fontSize={12} fill={MUTED}>▲ 地基：其余两项由它派生</text>}
  </g>;
}

export function MoneyShift() {
  const [i, setI] = useState(0), [dist, setDist] = useState(0), e = ERAS[i];
  const lawSide = dist > 50;
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg">{ERAS.map((x, j) =>
        <button key={x.id} className={i === j ? "on" : ""} onClick={() => setI(j)}>{x.tab}</button>)}</div>
      <svg viewBox="0 0 560 270" style={{ width: "100%", maxHeight: 320, background: "var(--paper)", borderRadius: 14 }}>
        {/* 派生箭头：从地基指向上面两项 */}
        <path d="M250 172 L150 86" stroke={INK} strokeWidth="2" opacity=".35" markerEnd="url(#ar6)" />
        <path d="M310 172 L410 86" stroke={INK} strokeWidth="2" opacity=".35" markerEnd="url(#ar6)" />
        <defs><marker id="ar6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill={INK} opacity=".5" /></marker></defs>
        {Object.entries(e.layout).map(([id, at]) => <Node key={id} id={id} at={at} />)}
        {e.id === "mark" && <g>
          {/* 星辰 ↔ 矿脉：Davanzatti 的天上镜子 */}
          <text x="280" y="34" textAnchor="middle" fontSize="22">✦<animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite" /></text>
          <line x1="280" y1="42" x2="280" y2="168" stroke={GOLD} strokeDasharray="3 6" opacity=".6" />
          <text x="292" y="120" fontSize="12" fill={GOLD}>星辰 ↔ 地下金属</text>
        </g>}
        {e.id === "sign" && <g>
          <text x="280" y="34" textAnchor="middle" fontSize="13" fill={MUTED}>翻转：交换 → 衡量 / 价格</text>
          <path d="M60 230 q-30 -100 40 -150" stroke={RED} fill="none" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#ar6)">
            <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" /></path>
          <text x="20" y="252" fontSize="12" fill={RED}>16 世纪的顺序被倒置</text>
        </g>}
        {e.id === "pledge" && <g>
          {/* 担保物与硬币的距离 */}
          <line x1="370" y1="196" x2={380 + dist * 1.5} y2="196" stroke={RED} strokeWidth="2" strokeDasharray="4 4" />
          <g style={{ transform: `translate(${390 + dist * 1.5}px,196px)`, transition: "transform .3s" }}>
            <text textAnchor="middle" y="8" fontSize="26">{lawSide ? (dist > 80 ? "🚢" : "🌾") : "🪙"}</text>
            <text textAnchor="middle" y="34" fontSize="12" fill={RED}>担保物</text>
          </g>
          <text x="280" y="34" textAnchor="middle" fontSize="13" fill={MUTED}>货币 = 抵押：「借由它」交换{lawSide ? "" : "，也「为了它」交换"}</text>
        </g>}
      </svg>
      {e.id === "pledge" && <div style={{ display: "grid", gap: 4 }}>
        <input type="range" min="0" max="100" value={dist} onChange={ev => setDist(+ev.target.value)} aria-label="担保物与货币的距离" />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--muted)" }}>
          <span>← 担保就在币里：金属本身的市价（1726 年后、Turgot）</span><span>担保在币外：土地、贸易公司（Law）→</span></div>
        <div style={{ fontSize: 15, background: "var(--paper)", borderRadius: 10, padding: "8px 12px" }}>
          {lawSide
            ? "Law 一方：货币本身无市价，由外部的价值担保——更充足，但也更依赖信任。此时货币只是「借由它」交换的东西。"
            : "金属派：担保就是币材本身的市价——更稳、更不易投机。此时货币既是「借由它」，也是「为了它」交换的东西。"}
          <span style={{ color: "var(--muted)" }}>　两边共享同一个前提：货币是抵押。</span>
        </div>
      </div>}
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}><C id={e.concept}>{e.tab}</C> · <b>{e.rule}</b></div>
        <p style={{ margin: "6px 0" }}>{e.text}</p>
        <p style={{ margin: "0 0 6px", color: "var(--muted)", fontSize: 15 }}>📖 书中一例：{e.eg}</p>
        <p style={{ margin: 0, fontSize: 15, borderLeft: "3px solid var(--gold)", paddingLeft: 10 }}>{e.hint}</p>
      </div>
    </div>);
}

// 「孪生质量」：货币总量 M 与商品总量 G 互相对应，一份货币摊到的财富 = G/M
export function TwinMasses() {
  const [m, setM] = useState(4), [g, setG] = useState(4);
  const price = m / g;
  const coins = Array.from({ length: m }), goods = Array.from({ length: g });
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <svg viewBox="0 0 560 170" style={{ width: "100%", maxHeight: 220, background: "var(--paper)", borderRadius: 14 }}>
        <text x="20" y="30" fontSize="13" fill={GOLD}>货币总量</text>
        {coins.map((_, k) => <circle key={k} cx={110 + k * 44} cy={26} r={15} fill={GOLD} opacity=".85" />)}
        <text x="20" y="140" fontSize="13" fill={GREEN}>财富总量</text>
        {goods.map((_, k) => <text key={k} x={110 + k * 44} y={146} textAnchor="middle" fontSize="24">🌾</text>)}
        {/* 对应线：每枚硬币对应 g/m 份财富 */}
        {[...new Set([
          ...coins.map((_, k) => k + "-" + Math.floor((k + .5) * g / m)),
          ...goods.map((_, h) => Math.floor((h + .5) * m / g) + "-" + h),
        ])].map(key => { const [k, h] = key.split("-").map(Number);
          return <line key={key} x1={110 + k * 44} y1={42} x2={110 + h * 44} y2={124} stroke={INK} opacity=".25" />; })}
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 14 }}>
        <label>货币量：{m}<input type="range" min="1" max="10" value={m} onChange={e => setM(+e.target.value)} style={{ width: "100%" }} /></label>
        <label>财富量：{g}<input type="range" min="1" max="10" value={g} onChange={e => setG(+e.target.value)} style={{ width: "100%" }} /></label>
      </div>
      <div style={{ fontSize: 15 }}>
        一份财富的价格 ≈ <b style={{ fontSize: 20, color: RED }}>{price.toFixed(2)}</b> 枚币
        <span style={{ color: "var(--muted)" }}>　{price > 1.2 ? "币多物少：每枚币分摊的「表征任务」变轻，价格上涨。" : price < .85 ? "物多币少：每枚币被「抵押」得更重，价格下跌。" : "两者大致同比，价格稳定。"}</span>
      </div>
      <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
        同一个现象，16 世纪的 Bodin 解释为金属自身「贬值」；古典时代则解释为货币的<b>表征能力</b>被摊薄或加重——不是金子变贱了，而是一枚币要代表的东西变了。
      </p>
    </div>);
}
