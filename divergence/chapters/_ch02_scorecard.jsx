// 第 2 章专属图解（一）：谁更接近斯密的自由市场？逐项翻牌的记分卡
import { useState } from "react";
import { C } from "@kit";

// 全书配色约定：中国/江南 = --accent，欧洲/英格兰 = --blue，其他/持平 = --gold
const V = {
  china: { label: "中国更接近", color: "var(--accent)" },
  tie: { label: "大致相当", color: "var(--gold)" },
  europe: { label: "西欧更接近", color: "var(--blue)" },
};

const CARDS = [
  {
    id: "land", icon: "🗺️", dim: "土地买卖", q: "土地能不能自由买卖？", cid: "land_alienability",
    china: "绝大多数土地可自由转让。名义上属国家的军屯、漕运屯田与皇庄，纸面上最多约 350 万英亩，约占耕地 3%，且常被当作私产买卖。20 世纪调查：约 93% 农地为完全私有。",
    europe: "英格兰直到 19 世纪仍有约一半土地受家族限嗣安排约束，几乎无法出售；西班牙限嗣使地价高到无人投资。荷兰、伦巴第、瑞典是少数例外。",
    v: "china",
  },
  {
    id: "use", icon: "🌾", dim: "土地使用", q: "能不能采用已知的最好农法？", cid: "enclosure_new_husbandry",
    china: "亲族、同村优先承租/购买的习俗确实存在，但常被绕开；找不到像欧洲那样大规模拖慢最佳农法推广的习俗或法律。",
    europe: "新农法（休耕地种饲料作物）需要先圈地，而世袭租佃与公共放牧权让法国、德意志、西班牙迟迟圈不了。新农法亩产可高约 60%，德意志约 1800 万公顷农地每年约 400 万公顷休耕。",
    v: "china",
  },
  {
    id: "bound", icon: "⛓️", dim: "束缚劳动", q: "劳动者是不是自由身？", cid: "bound_labor",
    china: "江南的世仆到 18 世纪已不重要；华北农工最后的法律低人一等在 1780 年代取消。徽州等例外只涉及几千户，而 1780 年人口约 3 亿。",
    europe: "易北河以西到 1500 年已少见完整农奴制，但法国仍有少数农奴与领主磨坊垄断、劳役、领主司法；丹麦劳役仍重；英格兰《济贫法》把穷人拴在本教区。",
    v: "tie",
  },
  {
    id: "mig_land", icon: "🧭", dim: "向土地迁移", q: "人多地少的地方，人能不能去找地？", cid: "migration_directions",
    china: "17 世纪末至 18 世纪的远距离移民轻松超过 1000 万，国家常提供路费、贷款、种子、耕牛和土地；多数成为自耕农，佃农也几乎都是自由佃农。",
    europe: "往东去要面对「第二次农奴制」与不稳的地权；1800 年前去美洲的欧洲人总数可能不足 150 万，来自英格兰的近三分之二是契约仆役。",
    v: "china",
  },
  {
    id: "mig_cap", icon: "🏙️", dim: "向资本迁移", q: "人能不能去城市、工场找活？", cid: "migration_directions",
    china: "国家提防「游民」，只帮人去边疆种地；标准的纺织者是家中的妇女，不会单身外出。不过江南每平方英里已超 1000 人（湖南约 175），本来也难吸引外来打工者。",
    europe: "德意志与斯堪的纳维亚人去荷兰、爱尔兰人去英格兰，短中程地流向核心区更常见——尽管流量也不大。",
    v: "europe",
  },
  {
    id: "grain", icon: "🛒", dim: "农产品市场", q: "农民卖粮时面对几个买家？", cid: "private_grain_market",
    china: "清廷发牙帖、管牙行，首要目标就是让集市上有多个相互竞争的买卖者；至少在 1850 年前，农民很少失去选择卖给谁的能力。",
    europe: "为供应伦敦、巴黎，英法王室默许「私下市场」：商人绕过集市直接向农民收粮，布罗代尔称之为「本质上不平等」，常让农民陷入负债循环。",
    v: "china",
  },
  {
    id: "craft", icon: "🧵", dim: "乡村工业", q: "农家能不能自由纺织出售？", cid: "rural_industry_guilds",
    china: "匠籍制度在明末瓦解，清 1645 年正式废除；纺织行会无足轻重；官府发棉种、印手册，提倡「男耕女织」。17 世纪初江南几乎每户都为市场纺织。",
    europe: "城市行会的特权被视为正当财产，1789 年后才被法律否定；德意志行会 18 世纪反而更强，一直追捕乡下「地兔」；拉特兰公爵不许自家村庄出现织袜工。",
    v: "china",
  },
  {
    id: "wage", icon: "⚖️", dim: "劳动市场整合", q: "城乡、行业之间工资会不会拉平？", cid: "labor_market_segmentation",
    china: "没有可靠工资序列，但 18 世纪农业雇工与乡村纺织者收入相近，且没有法律限制人在两业间流动。日本畿内自 1750 年代起城镇与乡村日工工资大致相同。",
    europe: "英格兰名义工资几十年不变；18 世纪末城市工资为农村的 154%，1851 年差距升到 81%。荷兰 1650 年后分裂成三个彼此隔绝的劳动市场。",
    v: "china", weak: true,
  },
  {
    id: "family", icon: "🏠", dim: "家庭劳动", q: "妇女的劳动是否被当成「零成本」？", cid: "involution",
    china: "家庭会花钱省劳力（买豆饼、买蜡烛、棉布代替麻布）；1750 年代江南会织布的妇女收入不低于男性雇工。",
    europe: "德弗里斯的「勤勉革命」：多干活、多买现成品。但原始工业化地区同样出现工资下降、劳动时间拉长的「内卷式」处境。",
    v: "tie",
  },
];

export default function Scorecard() {
  const [open, setOpen] = useState(() => new Set());
  const flip = id => setOpen(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const all = open.size === CARDS.length;
  const tally = { china: 0, tie: 0, europe: 0 };
  CARDS.forEach(c => { if (open.has(c.id)) tally[c.v]++; });
  const N = CARDS.length;

  return (
    <div className="card" style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 15, color: "var(--muted)" }}>已翻开 {open.size} / {N} 张 · 点卡片翻面</div>
        <div className="seg" style={{ margin: 0 }}>
          <button onClick={() => setOpen(new Set(CARDS.map(c => c.id)))}>全部翻开</button>
          <button onClick={() => setOpen(new Set())}>全部合上</button>
        </div>
      </div>

      {/* 计分条 */}
      <div>
        <div style={{ display: "flex", height: 26, borderRadius: 8, overflow: "hidden", background: "var(--paper2)", border: "1px solid var(--line)" }}>
          {["china", "tie", "europe"].map(k => tally[k] > 0 &&
            <div key={k} style={{ width: `${tally[k] / N * 100}%`, background: V[k].color, color: "#fff", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", transition: "width .4s" }}>
              {tally[k]}
            </div>)}
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13, marginTop: 6, color: "var(--muted)" }}>
          {["china", "tie", "europe"].map(k => <span key={k}><i style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: V[k].color, marginRight: 5 }} />{V[k].label}：{tally[k]}</span>)}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 12 }}>
        {CARDS.map(c => {
          const on = open.has(c.id), v = V[c.v];
          return (
            <div key={c.id} onClick={() => flip(c.id)} role="button"
              style={{ cursor: "pointer", borderRadius: 14, padding: "12px 14px", border: `1.5px solid ${on ? v.color : "var(--line)"}`,
                background: on ? "var(--card)" : "var(--paper)", transition: "border-color .3s", minHeight: on ? 0 : 108 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 18 }}>{c.icon} {c.dim}</div>
                {on ? <span style={{ fontSize: 12, padding: "1px 9px", borderRadius: 99, background: v.color, color: "#fff", whiteSpace: "nowrap" }}>{v.label}{c.weak ? "（证据较弱）" : ""}</span>
                  : <span style={{ fontSize: 12, color: "var(--muted)" }}>翻开 ↻</span>}
              </div>
              <div style={{ fontSize: 14.5, color: "var(--muted)", margin: "4px 0 0" }}>{c.q}</div>
              {on && <div style={{ marginTop: 10, display: "grid", gap: 8, fontSize: 14, lineHeight: 1.65 }}>
                <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: 8 }}><b style={{ color: "var(--accent)" }}>中国</b>　{c.china}</div>
                <div style={{ borderLeft: "3px solid var(--blue)", paddingLeft: 8 }}><b style={{ color: "var(--blue)" }}>西欧</b>　{c.europe}</div>
                <div style={{ fontSize: 13 }} onClick={e => e.stopPropagation()}>相关概念：<C id={c.cid}>{c.dim}</C></div>
              </div>}
            </div>);
        })}
      </div>

      <div style={{ borderTop: "1px solid var(--line)", paddingTop: 12, fontSize: 15.5, minHeight: 52 }}>
        {all
          ? <><b style={{ fontFamily: "var(--serif)" }}>总账：</b>9 个维度里，中国 {tally.china} 项更接近教科书式市场，{tally.tie} 项大致持平，西欧只在「向资本迁移」一项占优。彭慕兰的结论不是「中国是完美市场」——两边都远离理想——而是：<b>如果「市场更自由」是欧洲领先的原因，那么 18 世纪的中国（也许还有日本）本该领先。</b></>
          : <span style={{ color: "var(--muted)" }}>先猜一猜：在这 9 项里，你觉得 18 世纪的西欧会赢几项？全部翻开后这里会给出总账。</span>}
      </div>
    </div>);
}
