// 第 3 章专属图解 ①：人均「日常奢侈品」对比（只用原书第 3 章给出的数字）
import { useState } from "react";

const COL = { eu: "var(--blue)", cn: "var(--accent)", other: "var(--gold)" };
const REG = { eu: "欧洲 / 英国", cn: "中国 / 江南", other: "其他" };

// v: 单值；lo/hi: 区间；ghost: 跨年代对照；kind: 产量/消费
const GOODS = [
  {
    id: "sugar", label: "糖", unit: "磅 / 人 / 年", max: 20,
    periods: [
      {
        id: "1680", label: "约 1680–1700",
        rows: [
          { who: "英国", reg: "eu", v: 4, txt: "约 4", note: "原书表 3.1 用 1700 年的英国数字代替 1680 年。" },
          { who: "欧洲（含英国）", reg: "eu", v: 1.0, txt: "1.0", note: "表 3.1：按殖民地产糖量与欧洲人口推算。" },
          { who: "欧洲（不含英国）", reg: "eu", v: 0.85, txt: "0.85", note: "表 3.1。" },
        ],
        say: "17 世纪末，英国人均吃糖已是欧陆的约 4–5 倍；中国此时没有可比数字。",
      },
      {
        id: "1750", label: "约 1750",
        rows: [
          { who: "英国", reg: "eu", v: 10, txt: "10", note: "表 3.1。" },
          { who: "欧洲（含英国）", reg: "eu", v: 2.2, txt: "2.2", note: "表 3.1。" },
          { who: "欧洲（不含英国）", reg: "eu", v: 1.9, txt: "1.90", note: "表 3.1。" },
          { who: "中国全国", reg: "cn", lo: 3.8, hi: 5.0, txt: "约 3.8–5.0", note: "彭慕兰的保守估算：只算广东与台湾产量，加越南进口，约 8.56 亿磅；除以 1750 年人口 1.7–2.25 亿。计入其他省份还要再加 0.4–0.5 磅；若用最低的亩产估计则要减 1.1–1.4 磅。" },
          { who: "台湾（产糖区）", reg: "cn", v: 10, txt: "约 10", note: "Shepherd 的估计，糖在当地最便宜。" },
        ],
        say: "中国 1750 年的人均糖消费（区间估算）高于欧陆，只有英国明显领先。",
      },
      {
        id: "1800", label: "约 1800",
        rows: [
          { who: "英国", reg: "eu", v: 18, txt: "18", note: "表 3.1（Mintz）。" },
          { who: "欧洲（含英国）", reg: "eu", v: 2.6, txt: "2.6", note: "表 3.1。1800 年正值拿破仑战争，数字偏低。" },
          { who: "欧洲（不含英国）", reg: "eu", v: 1.98, txt: "1.98", note: "表 3.1。原书说欧陆 1800 年「略低于 2 磅」。" },
          { who: "法国（1788）", reg: "eu", v: 2.2, txt: "约 1 公斤 ≈ 2.2", note: "布罗代尔的估计：人均约 1 公斤。" },
          { who: "中国全国（1750 估算，对照）", reg: "cn", lo: 3.8, hi: 5.0, txt: "约 3.8–5.0", ghost: true, note: "1800 年中国没有新数字；这里放 1750 年的估算作对照。彭慕兰：即使中国的估算翻倍高估，中国离欧陆也比欧陆离英国近得多。" },
        ],
        say: "1750–1800 年欧陆人均几乎没涨（1.90 → 1.98）：这是「英国的革命」，不是「欧洲的革命」。",
      },
      {
        id: "later", label: "19–20 世纪",
        rows: [
          { who: "巴黎（1846）", reg: "eu", v: 7.8, txt: "略低于 8", note: "布罗代尔。欧洲大陆人均糖消费的持续上升要到 1830/1840 年后价格大跌才开始。" },
          { who: "中国全国（1930 年代）", reg: "cn", v: 2.2, txt: "约 2.2", note: "卜凯（J. L. Buck）调查，只有 1750 年最低估计的约 60%。下降主要发生在 1750–1870 年间。" },
        ],
        say: "此后才真正分流：欧洲靠殖民地糖暴涨，中国人均反而下降——一大原因是人口增长集中在不吃糖的贫穷地区。",
      },
    ],
  },
  {
    id: "tea", label: "茶", unit: "磅 / 人 / 年（1 磅 = 16 盎司）", max: 5.5,
    periods: [
      {
        id: "1800", label: "约 1780–1800",
        rows: [
          { who: "英格兰（约 1800）", reg: "eu", v: 1, txt: "约 1", note: "布罗代尔引 Staunton。即使在英格兰，平民成为日常饮茶者也要等到 1840 年后茶价大跌。" },
          { who: "全欧洲（非俄，1780 年代）", reg: "eu", v: 0.125, txt: "约 2 盎司 ≈ 0.13", note: "非俄欧洲每年约 2200 万磅；英格兰之外的欧洲还要低得多。" },
        ],
        say: "1800 年前后，茶在欧洲大陆几乎还不算「日常」。",
      },
      {
        id: "1840", label: "约 1840",
        rows: [
          { who: "英格兰", reg: "eu", v: 1.4, txt: "1.4", note: "原书数字。" },
          { who: "全欧洲（输欧茶叶摊到人头）", reg: "eu", v: 0.25, txt: "勉强 4 盎司 ≈ 0.25", note: "输往欧洲 8000–9000 万磅。" },
          { who: "中国全国", reg: "cn", v: 0.68, txt: "略低于 11 盎司 ≈ 0.68", note: "吴承明估计国内茶叶贸易约 2.6 亿磅，除以约 3.8 亿人；吴的估计一向偏低，所以这可能是低估。" },
        ],
        say: "中国人均茶消费远高于欧洲平均；只有英格兰一个国家超过中国。",
      },
      {
        id: "later", label: "1880 / 1930 年代",
        rows: [
          { who: "英格兰（1880）", reg: "eu", v: 5, txt: "约 5", note: "1840 年后茶价大跌，平民才成为日常饮茶者。" },
          { who: "中国全国（1930 年代）", reg: "cn", lo: 1.1, hi: 1.3, txt: "1.1–1.3", note: "张仲礼引用的全国估计（18–21 盎司）。中国茶消费没有暴跌，但可能停滞。" },
        ],
        say: "欧洲（英格兰）的爆发是 19 世纪中叶以后的事。",
      },
    ],
    caveat: "彭慕兰自己提醒：比茶对欧洲不公平——运费、关税与垄断让茶在欧洲贵得多，欧洲人还喝咖啡、可可和葡萄酒。",
  },
  {
    id: "cloth", label: "布", unit: "磅 / 人 / 年（纺织品重量）", max: 18,
    periods: [
      {
        id: "1800", label: "约 1750–1800",
        rows: [
          { who: "江南 11 府（约 1750，产量）", reg: "cn", v: 16.5, txt: "约 14.5 棉 + 2.0 丝", kind: "产量", note: "长江三角洲南岸 11 个高度商业化的府。原书称这是「可信但或许略高」的估计；江南布有多少外销不清楚，外销比例可能比英国还高。" },
          { who: "英国（1800，产量）", reg: "eu", v: 12.9, txt: "12.9", kind: "产量", note: "棉、毛、麻合计；此时纺织技术革命已在进行中。约三分之一出口。" },
          { who: "英国含爱尔兰（1800，消费）", reg: "eu", v: 8.7, txt: "约 8.7", kind: "消费", note: "棉、毛、麻合计。" },
          { who: "法国（1780 年代，产量）", reg: "eu", v: 8.4, txt: "约 8.4", kind: "产量", note: "亚麻约 6.9 + 棉约 0.3 + 毛约 1.2（毛按面积换算）。略高于中国估算的上限。" },
          { who: "中国全国（约 1750，消费）", reg: "cn", lo: 6.2, hi: 8.0, txt: "约 6.2–8.0", kind: "消费", note: "从 1900 / 1870 年的全国棉产量倒推（1750 年产量不低于此），扣除絮棉，除以 1750 年 1.7–2.25 亿人。只算棉花。" },
          { who: "德意志（19 世纪初，产量）", reg: "eu", v: 5, txt: "约 5", kind: "产量", note: "毛 1.1（1816）+ 棉 0.6（1838）+ 麻约 3.3（1850）。进口英国布后消费会高一些，但仍可能少于 75 年前的中国平均。" },
        ],
        say: "核心区对核心区（江南 vs 英国）大体相当；全国对全国，中国也不输法、德。",
      },
    ],
    caveat: "产量与消费不能直接画等号；毛、麻布比棉布轻，把它们合计其实对中国不利。",
  },
];

const FURN = {
  items: ["桌", "长凳", "椅", "镜", "床", "箱柜"],
  series: [
    { who: "中国·麦区（北方）", reg: "cn", op: 1, v: [4.1, 4.0, 2.1, .4, 3.4, 2.2] },
    { who: "中国·稻区（南方）", reg: "cn", op: .5, v: [4.6, 12.0, 4.0, .3, 4.1, 2.7] },
    { who: "弗里斯兰·内陆", reg: "eu", op: .5, v: [1.3, 2.5, 6.7, 1.0, 3.3, 1.0] },
    { who: "弗里斯兰·沿海", reg: "eu", op: 1, v: [2.6, 4.3, 13.5, 1.2, 5.2, 1.2] },
  ],
};

function Bar({ r, max, sel, onClick }) {
  const c = COL[r.reg];
  const end = r.hi ?? r.v, lo = r.lo ?? r.v;
  return <button onClick={onClick} className="lux-row" style={{ outline: sel ? "2px solid var(--ink)" : "none" }}>
    <div className="lux-who">{r.who}{r.kind && <span className="lux-pill">{r.kind}</span>}</div>
    <div className="lux-track">
      <div style={{ position: "absolute", left: 0, top: 3, bottom: 3, width: `${lo / max * 100}%`, background: c, opacity: r.ghost ? .35 : 1, borderRadius: "0 4px 4px 0", transition: "width .5s" }} />
      {r.hi != null && <div style={{ position: "absolute", left: `${lo / max * 100}%`, top: 3, bottom: 3, width: `${(r.hi - r.lo) / max * 100}%`, background: `repeating-linear-gradient(45deg, ${c} 0 3px, transparent 3px 7px)`, opacity: r.ghost ? .35 : .8, borderRadius: "0 4px 4px 0", transition: "all .5s" }} />}
      <span className="lux-val" style={{ left: `calc(${end / max * 100}% + 6px)` }}>{r.txt}</span>
    </div>
  </button>;
}

function Furniture() {
  const [hover, setHover] = useState(null);
  const W = 640, H = 250, L = 40, B = 210, maxV = 14, gw = (W - L - 10) / FURN.items.length, bw = 16;
  const y = v => B - v / maxV * (B - 20);
  return <div>
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxHeight: 300 }}>
      {[0, 4, 8, 12].map(t => <g key={t}><line x1={L} x2={W - 6} y1={y(t)} y2={y(t)} stroke="var(--line)" strokeWidth=".7" />
        <text x={L - 6} y={y(t) + 4} textAnchor="end" fontSize="11" style={{ fill: "var(--muted)" }}>{t}</text></g>)}
      {FURN.items.map((it, i) => {
        const x0 = L + i * gw + (gw - bw * 4 - 6) / 2;
        return <g key={it}>
          {FURN.series.map((s, j) => {
            const v = s.v[i], x = x0 + j * (bw + 2), on = hover && hover[0] === i && hover[1] === j;
            return <g key={j} onMouseEnter={() => setHover([i, j])} onMouseLeave={() => setHover(null)}>
              <rect x={x - 1} y={20} width={bw + 2} height={B - 20} fill="transparent" />
              <rect x={x} y={y(v)} width={bw} height={B - y(v)} rx="3" style={{ fill: COL[s.reg], opacity: s.op * (hover && !on ? .55 : 1) }} />
              {on && <text x={x + bw / 2} y={y(v) - 5} textAnchor="middle" fontSize="12" fontWeight="700" style={{ fill: "var(--ink)" }}>{v}</text>}
            </g>;
          })}
          <text x={L + i * gw + gw / 2} y={B + 18} textAnchor="middle" fontSize="13" style={{ fill: "var(--ink)" }}>{it}</text>
        </g>;
      })}
      <text x={L} y={12} fontSize="11" style={{ fill: "var(--muted)" }}>件 / 户（悬停看数值）</text>
    </svg>
    <div className="lux-legend">{FURN.series.map(s => <span key={s.who}><i style={{ background: COL[s.reg], opacity: s.op }} />{s.who}</span>)}</div>
    <p className="lux-note">原书表 3.2：中国为卜凯 1920 年代 3 万余农户调查，弗里斯兰为德弗里斯整理的 17 世纪一个内陆村、两个沿海村的遗产清册。荷兰家具多精致、中国家具多粗糙（只有 36% 上漆），彭慕兰说不要过度解读——但它足以打破「中国农家家徒四壁、欧洲农家堆满新物件」的刻板印象。</p>
  </div>;
}

export default function LuxuryChart() {
  const [g, setG] = useState(0), [p, setP] = useState(1), [sel, setSel] = useState(null);
  const isF = g === GOODS.length;
  const good = GOODS[g], per = good && good.periods[Math.min(p, good.periods.length - 1)];
  const pick = j => { setG(j); setP(j === 0 ? 1 : j === 1 ? 1 : 0); setSel(null); };
  return <div className="card lux">
    <style>{`
      .lux-row{display:grid;grid-template-columns:minmax(120px,210px) 1fr;gap:10px;align-items:center;width:100%;background:none;border:0;padding:4px 4px;border-radius:8px;cursor:pointer;font:inherit;text-align:left;color:var(--ink)}
      .lux-row:hover{background:var(--paper)}
      .lux-who{font-size:14px;line-height:1.25}
      .lux-pill{display:inline-block;margin-left:6px;font-size:11px;padding:0 6px;border:1px solid var(--line);border-radius:99px;color:var(--muted)}
      .lux-track{position:relative;height:26px;margin-right:150px}
      .lux-val{position:absolute;top:4px;white-space:nowrap;font-size:13px;color:var(--ink);font-variant-numeric:tabular-nums;transition:left .5s}
      .lux-legend{display:flex;gap:14px;flex-wrap:wrap;font-size:13px;color:var(--muted);margin:8px 0}
      .lux-legend i{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:5px;vertical-align:-1px}
      .lux-note{font-size:14px;color:var(--muted);margin:8px 0 0}
      .lux-say{margin-top:10px;padding:10px 14px;border-left:4px solid var(--gold);background:var(--paper);border-radius:6px}
      @media (max-width:600px){.lux-row{grid-template-columns:1fr}.lux-track{margin-right:120px}}
    `}</style>
    <div className="seg">{GOODS.map((x, j) => <button key={x.id} className={g === j ? "on" : ""} onClick={() => pick(j)}>{x.label}</button>)}
      <button className={isF ? "on" : ""} onClick={() => { setG(GOODS.length); setSel(null); }}>农家家具</button></div>
    {!isF && good.periods.length > 1 && <div className="seg" style={{ marginLeft: 8 }}>
      <span style={{ fontSize: 13, color: "var(--muted)", alignSelf: "center", marginRight: 4 }}>年代：</span>
      {good.periods.map((x, j) => <button key={x.id} className={per === x ? "on" : ""} onClick={() => { setP(j); setSel(null); }}>{x.label}</button>)}</div>}
    {isF ? <Furniture /> : <>
      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>单位：{good.unit}{per.rows.some(r => r.hi != null) && " · 斜纹段 = 估算区间"}{per.rows.some(r => r.ghost) && " · 浅色 = 其他年代的对照"}</div>
      {per.rows.map((r, j) => <Bar key={good.id + per.id + j} r={r} max={good.max} sel={sel === j} onClick={() => setSel(sel === j ? null : j)} />)}
      <div className="lux-legend">{["eu", "cn"].map(k => <span key={k}><i style={{ background: COL[k] }} />{REG[k]}</span>)}<span>· 点任一行看来源与说明</span></div>
      {sel != null && per.rows[sel] && <p className="lux-note"><b style={{ color: "var(--ink)" }}>{per.rows[sel].who}：</b>{per.rows[sel].note}</p>}
      <div className="lux-say">{per.say}</div>
      {good.caveat && <p className="lux-note">⚠️ {good.caveat}</p>}
    </>}
    <p className="lux-note" style={{ fontSize: 12.5 }}>全部数字来自原书第 3 章（数字多为「约」，区间照原书给出）；1 磅 ≈ 0.45 公斤。</p>
  </div>;
}
