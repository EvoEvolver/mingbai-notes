// 第 4 章专属图解 ②：暴力的两本账——国内账 vs 海外账（含欧洲新大陆 vs 华人东南亚两条路径）
import { useState } from "react";
import { C } from "@kit";

const EU = "var(--blue)", CN = "var(--accent)";

// —— 国内账：战争被认为带来的好处，逐项记账 ——
const DOMESTIC = [
  { item: "技术外溢", sign: "−", claim: "军备竞赛推动技术进步。",
    fact: "1800 年前，有民用价值的军事创新少得惊人；炮管镗孔有助于蒸汽机，但钟表业同样教这门手艺。战争还抽走工匠、打断信息流动、杀死潜在发明家，净效应可能为负。" },
  { item: "需求刺激", sign: "−", claim: "军需订单拉动了工业。",
    fact: "军需最终靠税收支付，等量挤掉了私人需求；而欧亚两端除灾荒时期外都不缺总需求——没有问题，军需也就算不上解药。" },
  { item: "产权与制度", sign: "−", claim: "君主为筹军费让步，产权更安全。",
    fact: "战争保障的主要是「特权产权」：包税、捐官、特许垄断、行会特权。它们靠排斥别人参与市场来获利：垄断让糖、烟草、盐价居高不下；法国为筹钱确认的地方否决权让圈地几乎无法进行。", cid: "property_in_privileges" },
  { item: "资本的去向", sign: "−", claim: "特权把财富交到最会再投资的人手里。",
    fact: "德弗里斯指出，欧洲增长的资本多是从体面而无生产性的用途中「找回来」的；战争让各国抛售更多官职、包税与头衔，反而阻碍这一转化。荷兰的债券持有人甚至不愿看到战争结束。" },
  { item: "金融创新", sign: "±", claim: "公债与包税孕育了公司制与证券化。",
    fact: "永久存续、独立法人的公司确属西方独有；但直到铁路时代，它主要用于海外殖民与武装贸易。英国的煤与棉都靠家族网络融资，19 世纪连帝国贸易也多由家族企业经营。", cid: "armed_trading_company" },
];

// —— 海外账：同样是人少地多、能供应土地密集型产品的边缘，两种结局 ——
const STAGES = [
  { stage: "谁撑腰",
    eu: { t: "竞争的国家 + 特许公司", d: "国家间竞争推动了出海；新大陆的军事保护（防美洲原住民、防其他欧洲人、防人数常多于白人的非洲奴隶）与政治组织成本，由国家或特许垄断者一家承担，抽取全部出口的分成，避免「搭便车」。" },
    cn: { t: "清廷不为海外定居者撑腰", d: "清廷保护每年往返、以中国为基地的「客商」，但对定居海外的华人漠不关心甚至敌视；也不许民间从中国基地进行武装贸易。清的扩张方向是中亚，对沿海商人没有用处。" } },
  { stage: "安全",
    eu: { t: "殖民地由本国武装保护", d: "疾病让美洲大片地区人口锐减，这一点与军事技术同样重要；但单靠病菌，并不能用出口经济与大规模移民取代被摧毁的社会。" },
    cn: { t: "屠杀与禁止置地", d: "荷兰、西班牙殖民当局不许马尼拉、巴达维亚的华商买地，还不时纵容乃至亲自发动屠杀：马尼拉 1603、1764 年，巴达维亚 1740 年。" } },
  { stage: "投资取向",
    eu: { t: "长期、耐心的资本", d: "VOC 等公司要承担庞大的固定军事成本，只能把资本视为永久、留存利润，并用股票市场让不耐烦的股东退出——公司制正是从强制性的殖民贸易里长出来的。" },
    cn: { t: "资产保持流动", d: "华商有充分理由不置地、不改良土地，以便随时逃走或行贿；真想买地，就回家乡买——那里产权更安全，还有亲族照看。" } },
  { stage: "组织",
    eu: { t: "商人垫资，移民与奴隶被运过去", d: "为奴隶贸易提供大部分营运资本的是欧洲商人；1800 年前自付船费的白人移民不到三分之一，其余由想用其劳动生产出口品的人出钱。运烟草、糖的船返程空舱，也压低了移民船费。" },
    cn: { t: "城里的商人与乡下的蔗农脱节", d: "1710 年巴达维亚城外 84 家糖厂中有 79 家属华人，但城内富商并不参与；乡村华人归一个腐败的荷兰官员管，糖由 VOC 以管制价收购。1740 年的屠杀前后，城乡华人几乎没有联系。" } },
  { stage: "谁买单",
    eu: { t: "欧洲消费者为奢侈品付高价", d: "糖、咖啡、茶、丝（以及很长时间里的烟草）在欧洲没有本土竞品，加价足以收回海外的保护成本；关税还养活了殖民地政府。1670 年代弗吉尼亚一名烟田劳工为王室创造的收入，比他为自己或主人挣的还多。" },
    cn: { t: "无法加价，国家也不收钱", d: "中国自己大量产糖，垄断糖进口毫无用处；约 90% 的糖、全部丝与烟草不跨任何关卡、不缴税（1850 年代厘金之前），官员没有理由推动这些贸易。竞争性的低利润贸易让 1730 年代的台湾一地出口的糖约等于 1750 年代整个新大陆的三分之一，却养不起一次殖民。" } },
  { stage: "结局",
    eu: { t: "定居点长成社会，资源回流", d: "奢侈品出口「引水」两百多年后，新大陆转向棉花、廉价糖与小麦等大宗出口，为 19 世纪欧洲的工业与人口膨胀提供了不可或缺的资源（第 6 章的「幽灵土地」）。" },
    cn: { t: "临时营地，等到 1850 年后", d: "华人乡村定居点像追逐短期繁荣的临时营地。伊洛瓦底、湄公、湄南河三角洲本可变成稻米仓，技术上并无障碍，却要等到 1850 年后英法殖民政权来开发。" } },
];

function Domestic() {
  const [k, setK] = useState(null);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ fontSize: 14.5, color: "var(--muted)" }}>欧洲内部：战争与「军事财政」被认为带来的五项好处。点击一行看彭慕兰怎么记账。</div>
      <div style={{ border: "1px solid var(--line)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 56px", background: "var(--paper2)", fontSize: 13, padding: "6px 12px", color: "var(--muted)" }}>
          <span>科目</span><span>欧洲中心论的说法</span><span style={{ textAlign: "right" }}>记账</span>
        </div>
        {DOMESTIC.map((d, i) => (
          <div key={i} onClick={() => setK(k === i ? null : i)} role="button" aria-expanded={k === i}
            style={{ cursor: "pointer", padding: "8px 12px", borderTop: "1px solid var(--line)", background: k === i ? "var(--card)" : "var(--paper)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 56px", alignItems: "baseline", fontSize: 14.5 }}>
              <b style={{ fontFamily: "var(--serif)" }}>{d.item}</b>
              <span>{d.claim}</span>
              <span style={{ textAlign: "right", fontSize: 20, fontFamily: "var(--serif)", color: d.sign === "−" ? "var(--ink)" : "var(--violet)" }}>{d.sign}</span>
            </div>
            {k === i && <div style={{ fontSize: 14, lineHeight: 1.65, marginTop: 6, color: "var(--ink)" }}>
              {d.fact}{d.cid && <span onClick={e => e.stopPropagation()}>　相关概念：<C id={d.cid}>{d.item}</C></span>}
            </div>}
          </div>))}
        <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 56px", padding: "8px 12px", borderTop: "2px solid var(--ink)", fontSize: 14.5, alignItems: "baseline" }}>
          <b style={{ fontFamily: "var(--serif)" }}>合计</b>
          <span>对欧洲<b>国内</b>增长：几乎无益，战争本身还加速资产折旧、技能流失、抬高经商成本。</span>
          <span style={{ textAlign: "right", fontSize: 20, fontFamily: "var(--serif)", color: "var(--ink)" }}>≈ −</span>
        </div>
      </div>
      <div style={{ fontSize: 13, color: "var(--muted)" }}>「−」＝彭慕兰认为净效应为零或为负；「±」＝只在特定领域（海外）有用。</div>
    </div>);
}

function Overseas() {
  const [n, setN] = useState(1);
  const [sel, setSel] = useState(null);
  const shown = STAGES.slice(0, n);
  const done = n === STAGES.length;
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ fontSize: 14.5, color: "var(--muted)" }}>
        东南亚和新大陆一样地广人稀，能供应「老家」需要的土地密集型产品；福建、广东也有大量缺地的人。为什么东南亚没有成为中国沿海的「新大陆」？逐步展开两条路径，点任一格看细节。
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <div className="seg" style={{ margin: 0 }}>
          <button onClick={() => { setN(Math.max(1, n - 1)); setSel(null); }} disabled={n === 1}>← 上一步</button>
          <button className={done ? "" : "on"} onClick={() => setN(Math.min(STAGES.length, n + 1))} disabled={done}>下一步 →</button>
          <button onClick={() => setN(STAGES.length)}>全部展开</button>
        </div>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>第 {n} / {STAGES.length} 步</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "64px 1fr 1fr", gap: "6px 10px", alignItems: "stretch" }}>
        <span />
        <div style={{ fontFamily: "var(--serif)", fontSize: 16, color: EU, borderBottom: `2px solid ${EU}`, paddingBottom: 4 }}>欧洲人在新大陆<div style={{ fontSize: 12.5, fontFamily: "var(--sans)", color: "var(--muted)" }}>有国家撑腰的武装贸易与殖民</div></div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 16, color: CN, borderBottom: `2px solid ${CN}`, paddingBottom: 4 }}>华人在东南亚<div style={{ fontSize: 12.5, fontFamily: "var(--sans)", color: "var(--muted)" }}>没有国家撑腰的商人与移民网络</div></div>
        {shown.map((s, i) => {
          const last = i === n - 1;
          return [
            <div key={s.stage + "l"} style={{ fontSize: 13, color: "var(--muted)", display: "flex", alignItems: "center", lineHeight: 1.3 }}>{i + 1}. {s.stage}</div>,
            ...["eu", "cn"].map(side => {
              const c = s[side], col = side === "eu" ? EU : CN, key = i + side, on = sel === key;
              return (
                <div key={key} onClick={() => setSel(on ? null : key)} role="button" aria-expanded={on}
                  style={{ cursor: "pointer", border: `1.5px solid ${on || last ? col : "var(--line)"}`, borderLeft: `5px solid ${col}`, borderRadius: 10,
                    padding: "7px 10px", background: on ? "var(--card)" : "var(--paper)", animation: last ? "ch04fade .45s ease" : "none" }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600 }}>{c.t}</div>
                  {(on || last) && <div style={{ fontSize: 13.5, lineHeight: 1.6, marginTop: 4 }}>{c.d}</div>}
                </div>);
            }),
          ];
        })}
      </div>
      <style>{"@keyframes ch04fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}"}</style>

      <div style={{ borderTop: "1px solid var(--line)", paddingTop: 10, fontSize: 15, minHeight: 48, lineHeight: 1.65 }}>
        {done
          ? <><b style={{ fontFamily: "var(--serif)" }}>关键一句：</b>如果出口品的消费者没法替殖民买单，殖民就无从谈起。郑氏海上帝国（17 世纪击败荷兰、夺取台湾、威胁吕宋）说明中国人并非不会武装贸易——但它只兴盛于改朝换代之际，并非中国国家体制的常态。见 <C id="stateless_diaspora">无国家撑腰的海外网络</C>。</>
          : <span style={{ color: "var(--muted)" }}>差别不在商人的本事：没有武力时，华商在多数航线上与欧洲人竞争不落下风。差别在于背后有没有一套能把暴力成本转嫁给消费者的政治经济。</span>}
      </div>
    </div>);
}

export default function Ledgers() {
  const [tab, setTab] = useState("home");
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ margin: 0 }}>
        <button className={tab === "home" ? "on" : ""} onClick={() => setTab("home")}>① 国内账：战争对欧洲内部增长</button>
        <button className={tab === "abroad" ? "on" : ""} onClick={() => setTab("abroad")}>② 海外账：暴力投射到欧洲之外</button>
      </div>
      {tab === "home" ? <Domestic /> : <Overseas />}
    </div>);
}
