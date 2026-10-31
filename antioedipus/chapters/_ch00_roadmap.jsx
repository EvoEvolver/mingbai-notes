// 序言专属图解 (b)：全书路线图 —— 四章 = 四站，点击展开核心问题与关键概念。
import { useState } from "react";

const COLORS = ["#9b2c1f", "#b8862b", "#2c4a6e", "#3c6b4a"];
const INK = "#1f1b16";

const STOPS = [
  {
    no: "一", short: "欲望机器", en: "The Desiring-Machines", site: "本站第 1–2 章",
    q: "如果欲望不是「缺了什么」，而是「在生产什么」，无意识会是什么样子？",
    plain: "先把地基换掉：无意识不是上演家庭剧的剧场，而是一座日夜运转的工厂。到处是彼此连接的小机器：一台机器产出一股流，另一台把它截断、接走。",
    keys: [
      ["欲望机器", "desiring-machines"], ["流与断流", "flows & breaks"], ["无器官身体", "body without organs / CsO"],
      ["欲望生产", "desiring-production"], ["三种综合（初登场）", "connective / disjunctive / conjunctive"],
    ],
    payoff: "欲望生产与社会生产是同一种生产，只是体制不同。",
    icon: "⚙️",
  },
  {
    no: "二", short: "神圣家族", en: "Psychoanalysis and Familialism: The Holy Family", site: "本站第 3–5 章",
    q: "精神分析怎样把一座「工厂」改装成「爸爸-妈妈-我」的三角剧场？",
    plain: "批判部分：精神分析发现了欲望生产，却又把它塞回俄狄浦斯三角。德勒兹与加塔利逐一检查三种综合被「误用」的方式，说明俄狄浦斯不是无意识的真相，而是加在它上面的模子。",
    keys: [
      ["俄狄浦斯的帝国主义", "imperialism of Oedipus"], ["三种综合的合法 / 非法使用", "legitimate / illegitimate use"],
      ["社会压抑与心理压制", "social repression / psychic repression"], ["神经症 vs 精神病", "neurosis vs psychosis"], ["过程", "the process"],
    ],
    payoff: "三角形不是起点，而是被生产出来的「结果」。",
    icon: "🛋️",
  },
  {
    no: "三", short: "蒙昧人、野蛮人、文明人", en: "Savages, Barbarians, Civilized Men", site: "本站第 6–8 章",
    q: "历史上的社会机器，各自怎样处理（编码）欲望的流？",
    plain: "一部「欲望的世界史」：原始部落用亲缘、联姻与债把流编码在土地上；专制帝国在所有编码之上再加一层「超编码」，一切归于君主；资本主义把旧编码统统解开，却用「公理化」把一切重新接到资本上——而俄狄浦斯，正是在这里登场的家庭化装置。",
    keys: [
      ["原始领土机器 · 编码", "primitive territorial machine · coding"], ["野蛮专制机器 · 超编码", "despotic machine · overcoding"],
      ["文明资本主义机器 · 解码与公理化", "capitalist machine · decoding & axiomatic"], ["解域 / 再领域化", "deterritorialization / reterritorialization"],
    ],
    payoff: "俄狄浦斯是资本主义把解码的流「私人化」、收回家庭的装置，而不是人类永恒的情结。",
    icon: "🏛️",
    track: ["编码", "超编码", "解码 + 公理化"],
  },
  {
    no: "四", short: "精神分裂分析导论", en: "Introduction to Schizoanalysis", site: "本站第 9–10 章",
    q: "如果不用俄狄浦斯，我们该怎样分析一个人、一个群体的欲望？",
    plain: "替代方案：先「破坏」——拆掉俄狄浦斯与自我的幻象；再「建设」——找出一个人身上真正运转的欲望机器，分辨欲望在社会场里是朝向偏执—法西斯的一极，还是朝向精神分裂—革命的一极。",
    keys: [
      ["社会场与分子无意识", "social field · molecular unconscious"], ["偏执极 vs 精神分裂极", "paranoiac vs schizoid pole"],
      ["否定任务 / 积极任务", "negative & positive tasks"], ["群体主体 vs 被支配群体", "subject-group vs subjugated group"],
    ],
    payoff: "欲望可以革命，也可以爱上自己的压迫——分析就是要分清这两者。",
    icon: "🚶",
  },
];

export default function Roadmap() {
  const [i, setI] = useState(0), s = STOPS[i], col = COLORS[i];
  const X = k => 70 + k * 200;
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <svg viewBox="0 0 740 150" style={{ width: "100%", maxHeight: 190 }}>
        <line x1="40" y1="60" x2="700" y2="60" stroke={INK} strokeOpacity=".18" strokeWidth="10" strokeLinecap="round" />
        <line x1="40" y1="60" x2={X(i)} y2="60" stroke={col} strokeWidth="10" strokeLinecap="round" style={{ transition: "all .5s" }} />
        <circle r="6" fill="#fff" stroke={col} strokeWidth="3">
          <animateMotion dur="5s" repeatCount="indefinite" path="M40,60 L700,60" />
        </circle>
        <text x="40" y="30" fontSize="12" fill={INK} opacity=".55">序（你在这里）</text>
        {STOPS.map((t, k) => (
          <g key={k} onClick={() => setI(k)} style={{ cursor: "pointer" }}>
            <circle cx={X(k)} cy="60" r={k === i ? 26 : 19} fill={k === i ? COLORS[k] : "var(--card)"} stroke={COLORS[k]} strokeWidth="4" style={{ transition: "all .3s" }} />
            <text x={X(k)} y="67" textAnchor="middle" fontSize={k === i ? 20 : 16}>{t.icon}</text>
            <text x={X(k)} y="112" textAnchor="middle" fontSize="14" fontWeight={k === i ? 700 : 400} fill={COLORS[k]}>第{t.no}章</text>
            <text x={X(k)} y="132" textAnchor="middle" fontSize="12.5" fill={INK} opacity=".8">{t.short.length > 8 ? t.short.slice(0, 8) + "…" : t.short}</text>
          </g>))}
      </svg>
      <div className="seg" style={{ margin: 0 }}>{STOPS.map((t, k) =>
        <button key={k} className={k === i ? "on" : ""} onClick={() => setI(k)}>第{t.no}章 · {t.short}</button>)}</div>
      <div key={i} style={{ borderLeft: `5px solid ${col}`, paddingLeft: 16, display: "grid", gap: 10, animation: "pop .35s" }}>
        <div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>第{s.no}章 · {s.short} <span className="muted-it" style={{ fontSize: 15 }}>{s.en}</span></div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>{s.site}</div>
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: col }}>❓ {s.q}</div>
        <p style={{ margin: 0 }}>{s.plain}</p>
        {s.track && <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {s.track.map((t, k) => <span key={k} style={{ display: "contents" }}>
            <span style={{ padding: "4px 12px", borderRadius: 99, background: col, color: "#fff", fontSize: 13, opacity: .55 + k * .2 }}>{["部落", "帝国", "资本主义"][k]}：{t}</span>
            {k < 2 && <span style={{ color: col }}>→</span>}</span>)}
          <span style={{ color: col }}>→</span>
          <span style={{ padding: "4px 12px", borderRadius: 99, border: `2px dashed ${col}`, fontSize: 13 }}>俄狄浦斯：把解码的流收回家里</span>
        </div>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{s.keys.map(([zh, en], k) =>
          <span key={k} style={{ border: `1px solid ${col}`, borderRadius: 99, padding: "3px 12px", fontSize: 13.5 }}>{zh} <i style={{ color: "var(--muted)" }}>{en}</i></span>)}</div>
        <div style={{ background: "var(--paper)", borderRadius: 12, padding: "10px 14px", fontSize: 15 }}>🎯 这一站要带走：<b>{s.payoff}</b></div>
      </div>
      <div style={{ fontSize: 12.5, color: "var(--muted)" }}>说明：路线图是本站对全书的预告式概括，四章的细节以各章页面为准。</div>
    </div>);
}
