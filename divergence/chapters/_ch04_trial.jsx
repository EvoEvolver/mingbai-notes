// 第 4 章专属图解 ①：「资本主义」的五项指控——逐条翻牌受审（只用原书第 4 章的数字）
import { useState } from "react";
import { C } from "@kit";

// 全书配色约定：欧洲/英国 = --blue，中国/江南 = --accent，其他地区 = --gold
const REG = { eu: "var(--blue)", cn: "var(--accent)", other: "var(--gold)" };

// 判定（与地区色区分开）
const VERDICT = {
  no: { label: "✗ 不成立", color: "var(--green)", note: "欧亚核心区相似" },
  minor: { label: "◐ 真差异，但不关键", color: "var(--violet)", note: "差异存在，解释不了工业化" },
  open: { label: "？ 可能，但未证实", color: "var(--muted)", note: "不能排除，也不能断定" },
  overseas: { label: "→ 只在海外成立", color: "var(--ink)", note: "优势只用于武装贸易与殖民" },
};

// 名义利率（%）。lo/hi 为区间
const RATES = [
  { who: "荷兰 · 最佳借款人", when: "17–18 世纪", reg: "eu", v: 3, txt: "3%", note: "可能是当时世界上最低的利率。" },
  { who: "英国", when: "18 世纪", reg: "eu", lo: 4, hi: 5, txt: "4–5%", note: "18 世纪内降到这一水平。" },
  { who: "苏拉特（印度）· 最佳借款人", when: "17 世纪末", reg: "other", v: 7, txt: "约 7%", note: "17 世纪印度各地利率似乎都在下降。" },
  { who: "日本 · 借给大名", when: "1707–1740", reg: "other", v: 12.45, txt: "12.45%", note: "大名常违约，算不上理想借款人。" },
  { who: "日本 · 借给大名", when: "1860 年代", reg: "other", v: 8.68, txt: "8.68%", note: "尽管那十年政局剧烈动荡，利率仍降了。" },
  { who: "天津「银号」· 借给官府与殷实商人", when: "18 世纪末", reg: "cn", v: 10, txt: "10%", note: "中国的证据零散；名义利率大致与日本相当，19 世纪更高。" },
  { who: "典当铺 · 向官府借款", when: "清代", reg: "cn", v: 12, txt: "12%", note: "典当铺觉得这笔官款划算，愿意为此遵守官府的种种规定。" },
];

function RateChart() {
  const max = 14.5, [hover, setHover] = useState(null);
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 6 }}>名义年利率（%）· 悬停看说明</div>
      <div style={{ display: "grid", gap: 5 }}>
        {RATES.map((r, i) => {
          const hi = r.hi ?? r.v, lo = r.lo ?? r.v;
          return (
            <div key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              style={{ display: "grid", gridTemplateColumns: "minmax(150px,38%) 1fr", gap: 8, alignItems: "center", fontSize: 13, cursor: "default" }}>
              <div style={{ lineHeight: 1.3 }}>{r.who}<span style={{ color: "var(--muted)" }}> · {r.when}</span></div>
              <div style={{ position: "relative", height: 18, background: hover === i ? "var(--paper2)" : "transparent", borderRadius: 4 }}>
                <div style={{ position: "absolute", left: 0, top: 3, height: 12, width: `${lo / max * 100}%`, background: REG[r.reg], borderRadius: "0 4px 4px 0" }} />
                {r.lo != null && <div style={{ position: "absolute", left: `${lo / max * 100}%`, top: 3, height: 12, width: `${(hi - lo) / max * 100}%`, background: REG[r.reg], opacity: .4, borderRadius: "0 4px 4px 0" }} />}
                <span style={{ position: "absolute", left: `calc(${hi / max * 100}% + 6px)`, top: 0, fontSize: 12.5, fontVariantNumeric: "tabular-nums" }}>{r.txt}</span>
              </div>
            </div>);
        })}
      </div>
      <div style={{ minHeight: 40, fontSize: 13, color: "var(--muted)", marginTop: 6, lineHeight: 1.55 }}>
        {hover != null ? <><b style={{ color: "var(--ink)" }}>{RATES[hover].who}（{RATES[hover].when}）{RATES[hover].txt}</b>：{RATES[hover].note}</>
          : <>
            <span style={{ marginRight: 12 }}><i style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: REG.eu, marginRight: 4 }} />西欧</span>
            <span style={{ marginRight: 12 }}><i style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: REG.other, marginRight: 4 }} />印度 / 日本</span>
            <span><i style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: REG.cn, marginRight: 4 }} />中国</span>
            <div>注意：都是名义利率；18 世纪中国的通胀率不明，实际利率无从得知。</div>
          </>}
      </div>
    </div>);
}

// 库兹涅茨的假想前工业经济：毛投资 = 产出的 26%，净资本积累只有产出的 1.32%
function FreeLunch() {
  const [x, setX] = useState(7); // 毛投资变动的百分比
  const net = 1.32 + 26 * x / 100;
  const W = 4.5, ratio = net / 1.32;
  const pos = Math.max(net, 0);
  return (
    <div style={{ marginTop: 6, fontSize: 13.5 }}>
      <div style={{ color: "var(--muted)", marginBottom: 6 }}>
        库兹涅茨的<b>假想</b>前工业经济（模型，非真实数据）：毛投资占产出 26%，大部分只够抵折旧，净资本积累仅占产出 1.32%（他的现代模型是 19%）。拖动滑块，改变毛投资：
      </div>
      <input type="range" min={-7} max={7} step={0.5} value={x} onChange={e => setX(+e.target.value)} onClick={e => e.stopPropagation()}
        style={{ width: "100%" }} aria-label="毛投资变动百分比" />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)" }}><span>毛投资 −7%</span><span>0</span><span>+7%（奥布莱恩的上限）</span></div>
      <div style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: 8, alignItems: "center", marginTop: 8 }}>
        <div>原净积累</div>
        <div style={{ position: "relative", height: 16 }}>
          <div style={{ position: "absolute", left: 0, top: 2, height: 12, width: `${1.32 / W * 100}%`, background: "var(--muted)", opacity: .55, borderRadius: "0 4px 4px 0" }} />
          <span style={{ position: "absolute", left: `calc(${1.32 / W * 100}% + 6px)`, top: -1, fontSize: 12.5 }}>1.32%</span>
        </div>
        <div>调整后</div>
        <div style={{ position: "relative", height: 16 }}>
          <div style={{ position: "absolute", left: 0, top: 2, height: 12, width: `${pos / W * 100}%`, background: "var(--blue)", borderRadius: "0 4px 4px 0", transition: "width .25s" }} />
          <span style={{ position: "absolute", left: `calc(${pos / W * 100}% + 6px)`, top: -1, fontSize: 12.5 }}>{net.toFixed(2)}%（{net > 0 ? `原来的 ${ratio.toFixed(1)} 倍` : "净积累被抹平"}）</span>
        </div>
      </div>
      <div style={{ color: "var(--muted)", marginTop: 6 }}>
        毛投资多 7%，净积累就翻一倍以上；少 5% 左右，净积累几乎归零。所以「只占 7%」不等于「无关紧要」——但彭慕兰强调这只是「可能」，不是「确实」。
      </div>
    </div>);
}

const COUNTS = [
  {
    id: "org", icon: "🏛️", title: "企业组织更先进", cid: "capital_owner_separation",
    charge: "只有西欧发展出理性会计、合股公司，把企业资本与家族、个人分开（韦伯、早期的乔杜里）；亚洲商号离不开宗族，难以长久积累。",
    evidence: [
      "中国会计远比韦伯以为的精细；而西方企业直到 19 世纪末大型「经理制」企业兴起，也很少采用最「理性」的会计。",
      "中国商号可以很长寿：瑞蚨祥绸布店延续三百多年，玉堂酱园从 1776 年开到 1949 年后；天津有多个从 18 世纪兴盛到 20 世纪的商家。",
      "规模与形式：19 世纪初陕西每家大木材商号据说雇工 3000–5000 人；汉口、四川富荣盐场的许多企业按合股原则组织，投资者来自全国。",
      "宗族「义庄」反而能锁住本金、长期积累，经理可自行决定分红比例；而欧洲直到 19 世纪末也几乎都是家族企业。",
    ],
    v: "no",
    verdict: "日常商业中欧企业形式差不多。真正的差别只在一个领域：远洋贸易与殖民——欧洲为此发明了合股公司；而中国帆船「人货同船」是适应季风的合理安排。",
  },
  {
    id: "secure", icon: "🔒", title: "亚洲商业资本不安全", cid: "capital_owner_separation",
    charge: "中国与伊斯兰世界的国家太强，富人没有安全感；亚洲的商业资本没有法律承认，「任意没收的阴影」挥之不去（布罗代尔、乔杜里）。",
    evidence: [
      "把欧洲君主赖账这种「事实上的没收」算进来，亚洲大商人未必更常被剥夺；清朝几乎不借债，中国商人基本免于此害。",
      "孟加拉的贾格特·塞特家族替纳瓦卜预付税收、换取征税权；统治者被推翻时，他们的债权依然有效——借钱给欧洲君主的人往往没有这种保障。",
      "印度的「组合资本家」：征税权、村长职位等收益份额可买卖、可抵押、可继承，国王也不能收回，和欧洲债券一样是「证券」。",
      "克拉克：1540–1837 年英国公债利率随政局起伏，但私人借贷利率基本不受影响；议会掌控预算这类大变化也没让私人资本变便宜。",
    ],
    v: "no",
    verdict: "既然英国内部产权保障的大幅改善都没改变资本价格，就更难说 18 世纪欧亚之间的差别是关键。",
  },
  {
    id: "rate", icon: "💰", title: "欧洲资本更便宜、更充裕", cid: "interest_rate_gap", chart: "rates",
    charge: "西欧利率最低、资本市场最发达，所以只有它投得起工业化。",
    evidence: [
      "利率差距确实存在（见下图）：西北欧最低，印度港口次之，日本与中国较高。",
      "但缺的不是资本：布罗代尔早就指出，前工业时代的大商人有大笔资本「徒然寻找投资出路」。中国前 2% 人口所占收入份额与英格兰相近；1840 年代日本农民储蓄率约 20%。",
      "早期工业很便宜：纺纱厂、英国煤矿主要靠家族与本地关系筹资，几乎不用公司制。荷兰信贷全世界最便宜，却没有实现能源突破——它的泥炭量少质差。",
      "江南农民以高息借贷去养蚕、种棉、纺织，收入照样大增；取赎权难以剥夺的习俗，反而让农民敢于借钱。",
    ],
    v: "minor",
    verdict: "利率差距是真的，但对核心区的农业、原始工业和早期机械化都不是决定性的。它可能真正起作用的地方是：长期投资的运河收费路，以及组织从遥远边缘输入初级产品。",
  },
  {
    id: "williams", icon: "⛓️", title: "殖民与奴隶贸易利润是资本积累的关键", cid: "williams_thesis", chart: "lunch",
    charge: "奴隶贸易、美洲矿山与海盗掠夺积累的金融资本，为工业革命提供了资金（威廉斯论题）。",
    evidence: [
      "反方：奥布莱恩估算，海外强制的成果最多只占 18 世纪末英国毛投资的约 7%，对整个欧洲则低得多。",
      "彭慕兰：在前工业经济里，大部分毛投资只够抵消折旧，一小笔「免费午餐」就可能让净积累大增（见下方模型）。",
      "但奥布莱恩的 7% 是在假设海外贸易利润是「正常」的两倍时得出的，而没人证明过这一点；强制的部分成本也还没扣除。",
    ],
    v: "open",
    verdict: "不能轻易否定，也不能假定它是关键。更稳妥的结论是：不论有没有海外的钱，18 世纪末欧洲在积累、保护、运用商业资本的方式上，都没有能解释其长期道路的优势。",
  },
  {
    id: "war", icon: "⚔️", title: "国家间竞争造就了更好的经济制度", cid: "military_fiscalism",
    charge: "欧洲诸国长期争霸，君主为筹军费不得不向富人让步，产权因此更安全，市场更自由；中国没有对等的邻国，就没有这种压力（诺斯等）。",
    evidence: [
      "中国的市场在第 2 章已显示比欧洲更接近新古典模型：普通产权的安全，别的社会可以走别的路达到。",
      "战争真正保障的是「特权产权」：包税权、捐官、特许垄断与行会特权；清代全国性的特许只有盐与广州贸易，没有公债，税收直接征收。",
      "这些特权压低了产出：垄断让糖、烟草、盐只卖到 19 世纪市场规模的一小部分；法国为筹钱确认地方否决权，使圈地几乎不可能。",
      "时间也对不上：英国 1790–1830 年是最专制的时期之一，却恰好在这时成为头号强国、在经济上与欧陆分流。",
    ],
    v: "overseas",
    verdict: "在欧洲内部，军事竞争对增长几乎无益甚至有害；但当这种竞争、特许公司与垄断被投射到海外时，它确实带来了回报——见下一个图解。",
  },
];

export default function Trial() {
  const [open, setOpen] = useState(() => new Set());
  const flip = id => setOpen(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const N = COUNTS.length, all = open.size === N;

  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 15, color: "var(--muted)" }}>已审理 {open.size} / {N} 项指控 · 点卡片翻面看证据与判定</div>
        <div className="seg" style={{ margin: 0 }}>
          <button onClick={() => setOpen(new Set(COUNTS.map(c => c.id)))}>全部翻开</button>
          <button onClick={() => setOpen(new Set())}>全部合上</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {COUNTS.map((c, i) => {
          const on = open.has(c.id), v = VERDICT[c.v];
          return <span key={c.id} style={{ fontSize: 12.5, padding: "2px 10px", borderRadius: 99, border: `1px solid ${on ? v.color : "var(--line)"}`,
            background: on ? v.color : "transparent", color: on ? "var(--paper)" : "var(--muted)", transition: "all .3s" }}>
            {i + 1}. {on ? v.label : "待审"}</span>;
        })}
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {COUNTS.map((c, i) => {
          const on = open.has(c.id), v = VERDICT[c.v];
          return (
            <div key={c.id} onClick={() => flip(c.id)} role="button" aria-expanded={on}
              style={{ cursor: "pointer", borderRadius: 14, padding: "12px 16px", border: `1.5px solid ${on ? v.color : "var(--line)"}`,
                background: on ? "var(--card)" : "var(--paper)", transition: "border-color .3s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 18 }}>{c.icon} 指控 {i + 1}：{c.title}</div>
                {on ? <span style={{ fontSize: 12.5, padding: "1px 10px", borderRadius: 99, background: v.color, color: "var(--paper)", whiteSpace: "nowrap" }}>{v.label}</span>
                  : <span style={{ fontSize: 12.5, color: "var(--muted)" }}>翻开 ↻</span>}
              </div>
              <div style={{ fontSize: 14.5, marginTop: 6, lineHeight: 1.65, borderLeft: "3px solid var(--blue)", paddingLeft: 10 }}>
                <b style={{ color: "var(--blue)" }}>欧洲中心论的说法</b>　{c.charge}
              </div>
              {on && <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                <div style={{ fontSize: 14, lineHeight: 1.65 }}>
                  <b>彭慕兰的证据</b>
                  <ul style={{ margin: "4px 0 0", paddingLeft: 20 }}>{c.evidence.map((e, k) => <li key={k} style={{ marginBottom: 3 }}>{e}</li>)}</ul>
                </div>
                {c.chart && <div onClick={e => e.stopPropagation()} style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 10, padding: "10px 12px", cursor: "default" }}>
                  {c.chart === "rates" ? <RateChart /> : <FreeLunch />}
                </div>}
                <div style={{ fontSize: 14.5, lineHeight: 1.65, borderLeft: `3px solid ${v.color}`, paddingLeft: 10 }}>
                  <b>判定：{v.label}</b>（{v.note}）　{c.verdict}
                </div>
                <div style={{ fontSize: 13 }} onClick={e => e.stopPropagation()}>相关概念：<C id={c.cid}>打开概念卡 →</C></div>
              </div>}
            </div>);
        })}
      </div>

      <div style={{ borderTop: "1px solid var(--line)", paddingTop: 12, fontSize: 15.5, minHeight: 52 }}>
        {all
          ? <><b style={{ fontFamily: "var(--serif)" }}>结案：</b>五项指控里，两项不成立，一项是真差异但不关键，一项证据不足，最后一项只在欧洲之外成立。欧洲「资本主义」的组织优势几乎只适用于<b>战争、武装远程贸易与殖民</b>。它的重要性不在多攒了钱，而在帮欧洲拿到了新大陆的<b>实物资源</b>。</>
          : <span style={{ color: "var(--muted)" }}>先猜一猜：五项指控里，彭慕兰认为有几项能解释欧洲在 1800 年前的领先？全部翻开后这里给出结案陈词。</span>}
      </div>
    </div>);
}
