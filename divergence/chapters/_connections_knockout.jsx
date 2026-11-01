// 全书脉络专属图解：「欧洲中心论解释的淘汰赛」
// 十种「欧洲为何领先」的解释，按全书三部分逐轮受检：第一部分淘汰 4 种，第二部分淘汰 4 种，
// 第三部分确认剩下的两种——煤与美洲——是真正解除土地约束的关键。
import { useState } from "react";
import { C } from "@kit";

// 全书配色约定：欧洲/英国 = --blue，中国/江南 = --accent，其他地区 = --gold
const VERDICT = {
  out: { label: "✗ 推翻", color: "var(--green)" },
  part: { label: "◐ 部分成立", color: "var(--violet)" },
  open: { label: "？ 可能，但未证实", color: "var(--muted)" },
  key: { label: "★ 关键", color: "var(--ink)" },
};

// round：在第几轮（1 = 第一部分 ch01-02，2 = 第二部分 ch03-04，3 = 第三部分 ch05-06）被裁决
const CANDS = [
  {
    id: "marriage", icon: "💍", name: "人口与婚姻模式", round: 1, verdict: "out", chs: "第 1 章",
    claim: "欧洲人晚婚、多人不婚，生得少、攒得多，人均财富慢慢拉开差距。",
    test: "中国几乎人人早婚，却靠婚内推迟与停止生育把出生率压到西欧以下；18 世纪中国、日本较好地区的人活得至少和西欧人一样长，吃得也不比英国劳工差。",
    ids: ["ch01:european_marriage_pattern", "ch01:marital_fertility_control", "ch01:life_expectancy", "ch01:calorie_intake"],
  },
  {
    id: "capital", icon: "🏦", name: "资本积累", round: 1, verdict: "out", chs: "第 1、4 章",
    claim: "欧洲的牲畜、房屋、运输工具更多更耐用，资本存量早就领先。",
    test: "欧洲人均牲畜多是土地用法不同；中国水运的粮食运得更远更多；「天灾少、折旧少」证据不足。第 4 章补刀：欧洲利率是更低，但前工业时代缺的不是钱，而是值得投钱的技术。",
    ids: ["ch01:livestock_capital", "ch01:transport_capital", "ch01:capital_depreciation", "ch04:interest_rate_gap"],
  },
  {
    id: "tech", icon: "⚙️", name: "技术优势", round: 1, verdict: "part", chs: "第 1 章",
    claim: "欧洲工资高，逼出了一连串省人工的机器，技术早已领先。",
    test: "1750 年欧洲平均技术不比亚洲高，「高工资催生省力机器」除棉纺外大多站不住。但个别领域的最佳技术确实领先——其中真正要紧的，是和煤绑在一起的蒸汽机。技术差异因此指向了煤的位置。",
    ids: ["ch01:best_vs_average_tech", "ch01:labor_saving_thesis", "ch01:pithead_steam"],
  },
  {
    id: "market", icon: "⚖️", name: "市场与产权", round: 1, verdict: "out", chs: "第 2 章",
    claim: "欧洲率先形成了自由的土地、劳动与产品市场，产权更清晰。",
    test: "拿新古典市场当尺子量，清代中国反而更接近：地能买卖、粮市有多买家竞争、农妇纺织卖钱受鼓励；欧洲却有世袭租佃挡住新农法、行会压制乡村工业、城乡工资长期拉不平。",
    ids: ["ch02:market_ideal", "ch02:land_alienability", "ch02:enclosure_new_husbandry", "ch02:rural_industry_guilds"],
  },
  {
    id: "consume", icon: "☕", name: "消费文化与时尚", round: 2, verdict: "out", chs: "第 3 章",
    claim: "欧洲人更爱买东西，「消费革命」拉动了需求和勤勉。",
    test: "1850 年前消费爆发主要是英国一国的事，欧陆其实像中国；晚明已有「长物」鉴赏指南。欧洲真正突出的只是时尚更替的速度——而这又靠美洲白银与殖民地嗜好品撑着，不是民族性。",
    ids: ["ch03:english_exception", "ch03:superfluous_things", "ch03:social_depreciation", "ch03:global_conjuncture"],
  },
  {
    id: "firm", icon: "🏢", name: "资本主义企业", round: 2, verdict: "out", chs: "第 3、4 章",
    claim: "奢侈需求造就了资本家，欧洲独有能长期积累的公司组织。",
    test: "企业形态取决于需求与要素市场，不在奢侈与否；华商帆船「人货同船」是适应季风的最优解。欧洲公司制的独特之处只在一处：带着枪做远洋生意的武装贸易公司。",
    ids: ["ch03:sombart_thesis", "ch03:market_context", "ch04:monsoon_peddling", "ch04:armed_trading_company"],
  },
  {
    id: "state", icon: "⚔️", name: "国家竞争与军事财政", round: 2, verdict: "part", chs: "第 4 章",
    claim: "欧洲列国竞争，逼出了更好的金融与产权制度。",
    test: "战争确实长出了一整套金融制度，但它保护的多是包税、垄断这类「挡住别人」的特权，而非普通财产。这套东西在国内并不更有效率；它的威力在于把武力投向海外——为美洲殖民开路。",
    ids: ["ch04:military_fiscalism", "ch04:property_in_privileges", "ch04:armed_trading_company"],
  },
  {
    id: "profit", icon: "⛓️", name: "殖民与奴隶贸易利润", round: 2, verdict: "open", chs: "第 4 章",
    claim: "（威廉斯论题）奴隶贸易与殖民掠夺的利润为工业革命提供了资金。",
    test: "在折旧吞掉大部分投资的前工业经济里，一笔额外的钱杠杆很大，不能轻易否定；但也不能假定它是关键——欧洲在商业资本上本无决定性优势。海外的真正意义不在钱，而在土地。",
    ids: ["ch04:williams_thesis", "ch04:free_lunch_leverage"],
  },
  {
    id: "coal", icon: "⛏️", name: "煤", round: 3, verdict: "key", region: "var(--blue)", chs: "第 1、5、6 章",
    claim: "英国的煤紧挨市场、水运与工匠，蒸汽机在矿口上最划算。",
    test: "第 5 章证明西欧正陷入柴荒、林地锐减；第 6 章算出 1815 年英国的煤相当于凭空多出 1500 万英亩森林。中国的煤远在西北，江南够不着——这是地理的幸运，不是文化的胜利。",
    ids: ["ch01:coal_location", "ch01:pithead_steam", "ch05:fuel_crisis", "ch06:coal_forest"],
  },
  {
    id: "americas", icon: "🌎", name: "美洲：新型边缘", round: 3, verdict: "key", region: "var(--gold)", chs: "第 3、4、6 章",
    claim: "靠武力与奴隶制拿下的新大陆，替欧洲种糖、种棉、产白银。",
    test: "旧世界的边缘会长人口、会自己织布，出口迟早封顶；美洲种植园靠买来的奴隶、不种口粮，只能不断出口原料、进口制成品。糖、棉、木材加起来是数千万英亩的「幽灵土地」，白银又打开了亚洲的货。",
    ids: ["ch05:smithian_ceiling", "ch06:new_periphery", "ch06:slave_market", "ch06:ghost_acreage", "ch06:silver_windfall"],
  },
];

const ROUNDS = [
  { label: "候选名单", sub: "导论", note: "导论列出欧洲中心论的两大类故事（人口—积累说、市场—制度说），并约定：拿英格兰比江南，双向互问。十种「欧洲为何领先」的解释全部上场。" },
  { label: "第一轮", sub: "第 1–2 章", note: "人口、寿命、资本、技术、市场：欧亚核心区惊人地相似。唯一留下的技术差异，指向煤的位置。" },
  { label: "第二轮", sub: "第 3–4 章", note: "消费与资本主义企业也没有欧洲独有的优势；国家竞争只在一处真正起作用——武装贸易与海外殖民；殖民利润作为资本来源「可能，但未证实」。" },
  { label: "决赛", sub: "第 5–6 章", note: "欧亚核心区都撞上了土地、木材、燃料的天花板，旧世界的边缘也已封顶。只有煤与美洲解除了土地约束。" },
];

export default function Knockout() {
  const [r, setR] = useState(0);
  const [sel, setSel] = useState("coal");
  const decided = (c) => c.round <= r;
  const alive = CANDS.filter((c) => !decided(c) || c.verdict === "key").length;
  const s = CANDS.find((c) => c.id === sel);
  const sv = decided(s) ? VERDICT[s.verdict] : null;
  const counts = [10, 6, 2, 2];
  return (
    <div className="card ko" style={{ display: "grid", gap: 14 }}>
      <style>{`
        .ko .ko-rounds{display:flex;gap:8px;flex-wrap:wrap}
        .ko .ko-rounds button{flex:1 1 120px;border:1px solid var(--line);background:var(--paper);border-radius:12px;padding:8px 10px;font:inherit;cursor:pointer;color:var(--ink);text-align:left}
        .ko .ko-rounds button.on{border-color:var(--ink);box-shadow:var(--shadow);background:var(--card)}
        .ko .ko-rounds small{display:block;color:var(--muted);font-size:12px}
        .ko .ko-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
        .ko .tile{position:relative;border:1.5px solid var(--line);border-radius:12px;padding:10px 10px 8px;background:var(--paper);cursor:pointer;transition:all .45s;font:inherit;text-align:left;color:var(--ink)}
        .ko .tile .nm{font-weight:700;font-size:14.5px}
        .ko .tile .chs{font-size:12px;color:var(--muted)}
        .ko .tile.out{opacity:.42;filter:grayscale(.8)}
        .ko .tile.out .nm{text-decoration:line-through}
        .ko .tile.key{box-shadow:0 0 0 3px var(--kc),var(--shadow);background:var(--card)}
        .ko .tile.sel{border-color:var(--ink)}
        .ko .stamp{position:absolute;right:6px;top:6px;font-size:11px;font-weight:700;padding:1px 6px;border-radius:99px;color:#fff}
        .ko .detail{border-left:4px solid var(--dc);padding-left:14px;line-height:1.7}
        .ko .detail p{margin:4px 0}
      `}</style>

      <div className="ko-rounds">
        {ROUNDS.map((x, i) => (
          <button key={i} className={i === r ? "on" : ""} onClick={() => setR(i)}>
            <b>{x.label}</b><small>{x.sub} · 剩 {counts[i]} 种</small>
          </button>))}
      </div>

      {/* 漏斗：候选数随轮次收窄 */}
      <svg viewBox="0 0 720 70" style={{ width: "100%" }}>
        {counts.map((n, i) => {
          const x = 30 + i * 210, h = 8 + n * 5, on = i <= r;
          return <g key={i}>
            {i < 3 && <path d={`M${x + 40},${35 - h / 2} L${x + 180},${35 - (8 + counts[i + 1] * 5) / 2} L${x + 180},${35 + (8 + counts[i + 1] * 5) / 2} L${x + 40},${35 + h / 2} Z`}
              fill={i < r ? "var(--ink)" : "var(--line)"} fillOpacity={i < r ? .12 : .5} style={{ transition: "all .5s" }} />}
            <circle cx={x + 20} cy="35" r="18" fill={on ? "var(--ink)" : "var(--card)"} stroke="var(--ink)" strokeWidth="1.5" style={{ transition: "all .4s" }} />
            <text x={x + 20} y="40" textAnchor="middle" fontSize="14" fontWeight="700" fill={on ? "#fff" : "var(--ink)"}>{n}</text>
          </g>;
        })}
      </svg>

      <div style={{ fontSize: 14.5, lineHeight: 1.7 }}><b>{ROUNDS[r].label}（{ROUNDS[r].sub}）</b>：{ROUNDS[r].note}
        <span style={{ color: "var(--muted)" }}> 仍在场：{alive} 种。</span></div>

      <div className="ko-grid">
        {CANDS.map((c) => {
          const d = decided(c), v = VERDICT[c.verdict];
          const cls = ["tile", d && c.verdict !== "key" ? "out" : "", d && c.verdict === "key" ? "key" : "", sel === c.id ? "sel" : ""].join(" ");
          return (
            <button key={c.id} className={cls} style={{ "--kc": c.region || "var(--ink)" }} onClick={() => setSel(c.id)}>
              <div style={{ fontSize: 20 }}>{c.icon}</div>
              <div className="nm">{c.name}</div>
              <div className="chs">检验：{c.chs}</div>
              {d && <span className="stamp" style={{ background: v.color }}>{v.label}</span>}
            </button>);
        })}
      </div>

      <div className="detail" style={{ "--dc": s.region || (sv ? sv.color : "var(--line)") }}>
        <p><b>{s.icon} {s.name}</b>
          <span style={{ color: "var(--muted)" }}> · 在第{s.round === 1 ? "一" : s.round === 2 ? "二" : "三"}部分受检（{s.chs}）</span>
          {sv ? <b style={{ color: sv.color, marginLeft: 8 }}>{sv.label}</b> : <span style={{ color: "var(--muted)", marginLeft: 8 }}>（尚未裁决——切到{ROUNDS[s.round].label}看结果）</span>}</p>
        <p><b>这种解释说：</b>{s.claim}</p>
        {sv ? <p><b>彭慕兰的检验：</b>{s.test}</p> : <p style={{ color: "var(--muted)" }}>点上方的轮次按钮推进比赛。</p>}
        <p style={{ fontSize: 13.5 }}>相关概念：{s.ids.map((id, i) => <span key={id}>{i > 0 && " · "}<C id={id} /></span>)}</p>
      </div>
    </div>);
}
