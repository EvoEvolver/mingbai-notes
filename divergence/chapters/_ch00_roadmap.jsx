// 导论专属图解 (c)：全书论证路线图 —— 三部分六章，每章拆掉哪一条欧洲中心论解释
import { useState } from "react";
import { pageUrl, hasChapter } from "@kit";

const PARTS = [
  { no: 1, name: "第一部分", title: "一个惊人相似的世界", mode: "纯比较", comp: 1.0 },
  { no: 2, name: "第二部分", title: "消费、投资与资本主义", mode: "比较为主，联系开始重要", comp: 0.7 },
  { no: 3, name: "第三部分", title: "超越斯密与马尔萨斯", mode: "从比较走向联系", comp: 0.35 },
];

const CHS = [
  {
    id: "ch01", no: 1, part: 1, icon: "👪", short: "人口、资本与技术",
    myth: "欧洲靠晚婚、教士独身等「预防性抑制」摆脱了前现代的生育模式，于是人均资本（工具、牲畜）、营养、健康都领先，技术也早已领先。",
    who: "E. L. Jones、Hajnal 一脉",
    answer: "1800 年前，欧洲并没有积累起决定性的物质资本优势，也不比其他大经济体更少受马尔萨斯压力。别处的人活得一样长、一样好，也同样愿意并能够为了家庭积累而限制生育。技术确有要紧的差别（节省劳力的技术领先），但没有煤的地理幸运和海外资源，它的作用会更小、更晚，性质也不同。",
    verdict: "技术创造力是必要条件，却不充分，也不是欧洲独有。",
  },
  {
    id: "ch02", no: 2, part: 1, icon: "⚖️", short: "市场经济",
    myth: "欧洲有更有效率的市场与产权；中国家庭让妇女儿童一直干到边际产出低于糊口工资，形成「内卷」经济。",
    who: "North、Brenner；黄宗智的「内卷」说",
    answer: "直到 1789 年，西欧的土地、劳动与产品市场总体上可能比中国大部分地区离完全竞争更远，更不像斯密设想的增长环境。中国家庭的劳动配置，很像 De Vries 所说欧洲的「勤勉革命」。约 1750 年，中日核心区与西欧最先进地区相当相似。",
    verdict: "既然核心区内部这么像，分流的原因必须到核心区之外去找。",
  },
  {
    id: "ch03", no: 3, part: 2, icon: "🍬", short: "奢侈消费",
    myth: "只有西欧形成了「消费社会」，新的需求推动了生产。",
    who: "消费革命论",
    answer: "中、日、西欧之间在物品数量与消费观念上的差别小、方向不定：18 世纪中叶中国人几乎肯定比欧洲人吃更多糖，长江下游 1750 年的人均产布量可能与 1800 年的英国相当。增产通常会自己创造出需求，需求能否反过来创造供给却不清楚；对欧洲有利的消费差异，深受美洲白银、亚洲对白银的需求、种植园与奴隶制等欧洲以外因素的影响。",
    verdict: "「消费社会」不是西欧独有，有利的那部分差别来自海外。",
  },
  {
    id: "ch04", no: 4, part: 2, icon: "🏦", short: "看得见的手",
    myth: "欧洲的社会结构和商业产权规则，让商人更能积累资本、保住它不被国家侵夺、并理性运用它；欧洲利率也更低。",
    who: "Braudel、Chaudhuri、North",
    answer: "这些差别太小，撑不起它们被赋予的解释重量；早期工业革命本来就不怎么资本密集，中国的大商号能筹足铁路时代以前重大技术所需的资本。不动武力的公平竞争中，欧洲商业组织表现平平；只有在海外殖民和武装贸易里，由互相竞争、靠借债打仗的国家体系培育出的金融制度才给了欧洲关键优势。",
    verdict: "18 世纪资本并不稀缺，真正卡脖子的是土地与能源。",
  },
  {
    id: "ch05", no: 5, part: 3, icon: "🌲", short: "共同的约束",
    myth: "亚洲在生态上已经「用尽」了，欧洲还有大把增长空间（「落后的优势」）。",
    who: "「亚洲衰落」类叙事",
    answer: "欧亚所有最稠密、最商业化的核心区都面临严重生态障碍：燃料和建材短缺，部分纤维短缺，一些地区土壤肥力受威胁。英国在木材、土壤耗竭等方面并不比长江下游好，某些方面（如人均燃料）中国关键区域反而更好。各核心区都试图与人口稀疏的旧大陆地区做贸易，但运输成本、边缘区的政治经济与低需求让这条路走不通。",
    verdict: "如果说中国因人口和生态而「衰落」，欧洲也已站在同一悬崖边。",
  },
  {
    id: "ch06", no: 6, part: 3, icon: "⛏️", short: "解除土地约束",
    myth: "海外扩张只是寻常的边疆开垦；「对于核心区的增长，边缘是边缘的」。",
    who: "O'Brien 等",
    answer: "煤和新大陆两次断裂，让欧洲的土地约束突然变得更有弹性、也不那么要紧。奴隶贸易与殖民制度把美洲塑造成一种新型边缘：持续吸收欧洲的制成品，换回越来越多的土地密集型产品。海外贸易的意义不在利润和需求，而在缓解真正稀缺的土地与能源；直到进入 19 世纪很久以后，它对英国转型的重要性大致与化石燃料相当。",
    verdict: "世界上第一个「现代」核心与第一个「现代」边缘，是同时被造出来的。",
  },
];

export default function Roadmap() {
  const [i, setI] = useState(0);
  const c = CHS[i], part = PARTS[c.part - 1];
  const W = 820, colW = W / 3;
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <svg viewBox={`0 0 ${W} 232`} style={{ width: "100%", display: "block" }}>
        {PARTS.map((p, k) => {
          const x = k * colW;
          return <g key={p.no}>
            <rect x={x + 6} y="4" width={colW - 12} height="40" rx="10" fill={c.part === p.no ? "var(--ink)" : "var(--paper2)"} />
            <text x={x + colW / 2} y="21" fontSize="12.5" textAnchor="middle" fill={c.part === p.no ? "var(--paper)" : "var(--muted)"}>{p.name}</text>
            <text x={x + colW / 2} y="37" fontSize="14" fontWeight="700" textAnchor="middle" fill={c.part === p.no ? "var(--paper)" : "var(--ink)"}>{p.title}</text>
          </g>;
        })}
        {CHS.map((ch, k) => {
          const x = (ch.part - 1) * colW + (k % 2 ? colW * 0.73 : colW * 0.27), y = 92, on = k === i;
          return <g key={ch.id} onClick={() => setI(k)} style={{ cursor: "pointer" }}>
            {k < CHS.length - 1 && <line x1={x + 30} y1={y} x2={(CHS[k + 1].part - 1) * colW + ((k + 1) % 2 ? colW * 0.73 : colW * 0.27) - 30} y2={y} stroke="var(--line)" strokeWidth="2.5" markerEnd="url(#rm-arr)" />}
            <circle cx={x} cy={y} r={on ? 30 : 26} fill={on ? "var(--accent)" : "var(--card)"} stroke={on ? "var(--accent)" : "var(--line)"} strokeWidth="2" />
            <text x={x} y={y + 7} fontSize="22" textAnchor="middle">{ch.icon}</text>
            <text x={x} y={y + 48} fontSize="13" textAnchor="middle" fontWeight={on ? 700 : 400} fill="var(--ink)">第 {ch.no} 章</text>
            <text x={x} y={y + 64} fontSize="12" textAnchor="middle" fill="var(--muted)">{ch.short}</text>
          </g>;
        })}
        <defs><marker id="rm-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" fill="var(--line)" /></marker></defs>
        {/* 比较 → 联系 的比重条（示意） */}
        {PARTS.map((p, k) => {
          const x = k * colW + 10, w = colW - 20;
          return <g key={"b" + k}>
            <rect x={x} y="178" width={w * p.comp} height="10" fill="var(--gold)" rx="3" />
            <rect x={x + w * p.comp} y="178" width={w * (1 - p.comp)} height="10" fill="var(--green)" rx="3" />
            <text x={x + w / 2} y="202" fontSize="11.5" textAnchor="middle" fill="var(--muted)">{p.mode}</text>
          </g>;
        })}
        <g fontSize="11" fill="var(--muted)">
          <rect x="10" y="217" width="10" height="10" fill="var(--gold)" rx="2" /><text x="24" y="226">比较</text>
          <rect x="60" y="217" width="10" height="10" fill="var(--green)" rx="2" /><text x="74" y="226">联系</text>
          <text x="110" y="226">（比重为示意）</text>
        </g>
      </svg>
      <div key={c.id} style={{ display: "grid", gap: 10, animation: "exdIn .35s" }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>
          {c.icon} 第 {c.no} 章 · {c.short} <span className="muted" style={{ fontSize: 14 }}>（{part.name} · {part.mode}）</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
          <div style={{ borderLeft: "4px solid var(--blue)", padding: "4px 12px", background: "var(--paper)", borderRadius: 8 }}>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>要拆掉的欧洲中心论说法 · {c.who}</div>
            <p style={{ margin: "4px 0 0" }}>✗ {c.myth}</p>
          </div>
          <div style={{ borderLeft: "4px solid var(--green)", padding: "4px 12px", background: "var(--paper)", borderRadius: 8 }}>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>彭慕兰的回答（导论中的预告）</div>
            <p style={{ margin: "4px 0 0" }}>{c.answer}</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <b>⇒ {c.verdict}</b>
          {hasChapter(c.id) && <a href={pageUrl(c.id)} style={{ fontSize: 14 }}>去读第 {c.no} 章 →</a>}
        </div>
      </div>
    </div>);
}

// 「地理覆盖」梯度
const COVER = [
  { lv: 5, label: "详细讨论", items: "中国（主要是东部和东南部）、西欧", how: "比较 + 联系" },
  { lv: 3.6, label: "较少", items: "日本、南亚、中国内地", how: "比较 + 联系" },
  { lv: 2.4, label: "更少", items: "东欧、东南亚、美洲", how: "主要通过与其他地区的互动" },
  { lv: 1.5, label: "很少", items: "非洲（主要通过奴隶贸易）", how: "主要通过与其他地区的互动" },
  { lv: 0.6, label: "几乎不提", items: "中东、中亚、大洋洲", how: "—" },
];
export function Coverage() {
  return <div className="card" style={{ display: "grid", gap: 8 }}>
    {COVER.map(c => <div key={c.label} style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", alignItems: "center" }}>
      <span style={{ width: 72, fontSize: 14, color: "var(--muted)" }}>{c.label}</span>
      <span style={{ width: 130, height: 12, background: "var(--paper2)", borderRadius: 6, overflow: "hidden", flex: "none" }}>
        <span style={{ display: "block", width: `${c.lv * 20}%`, height: "100%", background: "var(--gold)", borderRadius: 6 }} />
      </span>
      <span style={{ fontSize: 15, flex: "1 1 220px" }}>{c.items} <span className="muted" style={{ fontSize: 13 }}>· {c.how}</span></span>
    </div>)}
  </div>;
}
