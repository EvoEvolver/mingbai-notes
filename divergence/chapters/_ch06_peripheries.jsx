// 第 6 章专属图解 ②：两种边缘——旧世界边缘为何会「用完」，新世界种植园为何「不会用完」
import { useState, useEffect } from "react";

const KIND = {
  old: {
    tab: "旧世界边缘",
    core: ["核心区", "江南 / 西欧"],
    peri: ["自由劳动或半自给的边缘", "长江中上游、华北 / 东欧、波罗的海"],
    out: "粮食、木材、原棉",
    back: "布、白银",
    stages: [
      { t: "起步", ex: 7, im: 6, pop: 2, craft: 0, text: "边缘人少地多，用粮食、木材、原棉换核心区的布与白银。江南的稻米、豆饼、木材，西欧的波罗的海谷物与木材，都这样来。" },
      { t: "扩张", ex: 9, im: 6, pop: 4, craft: 1, text: "边缘人口增长，最方便的资源先被用掉；伐木者离开河岸，运费飙升；自由农遇到报酬递减，把更多时间转向手工业。" },
      { t: "封顶", ex: 5, im: 3, pop: 6, craft: 3, text: "边缘自己纺纱织布（进口替代），可卖的余粮与木材减少，出口持平甚至下降。东欧则有「小市场问题」：半自给的农民和领主对核心区的制成品需求有限。" },
    ],
  },
  new: {
    tab: "新世界边缘",
    core: ["核心区", "英国"],
    peri: ["奴隶制种植园", "加勒比、巴西东北、后来的美国南部"],
    out: "糖、烟草，后来是棉花",
    back: "廉价棉布等制成品",
    stages: [
      { t: "起步", ex: 5, im: 4, sl: 4, na: 2, text: "接触后疾病让美洲原住民大量死亡；欧洲穷人付不起船费，原住民难以奴役。种植园主于是从非洲购买奴隶，在岛屿与沿海开辟种植园——靠水运，没有内陆运费问题。" },
      { t: "扩张", ex: 10, im: 8, sl: 7, na: 5, text: "奴隶很少有机会自种口粮，男多女少、很少成家，衣食几乎都要进口。1760–1810 年英属西印度的糖出口收入：约 1/4 买奴隶，约 1/2 买英国制成品，约 1/4 买北美的粮食与木材——北美再用这笔钱买英国货。" },
      { t: "自我扩张", ex: 16, im: 13, sl: 10, na: 8, text: "多卖糖 → 多买奴隶与衣食 →（常常）多欠债 → 来年不论价格再多卖糖。单一作物让代理商可以提前囤货，18 世纪跨大西洋运费下降约 50%。出口价格一路走低：这是第一个具有今天「第三世界」轮廓的边缘。" },
    ],
  },
};

const SPLIT = [
  { label: "买奴隶", v: 25, color: "var(--accent)" },
  { label: "买英国制成品", v: 50, color: "var(--blue)" },
  { label: "买北美粮食与木材", v: 25, color: "var(--violet)" },
];

function Flow({ d, w, color, dur, label, lx, ly, anchor = "middle" }) {
  if (!w) return null;
  return <g>
    <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" opacity=".28" style={{ transition: "stroke-width .6s" }} />
    <path d={d} fill="none" stroke={color} strokeWidth={Math.max(2, w / 3)} strokeDasharray="2 14" strokeLinecap="round" style={{ transition: "stroke-width .6s" }}>
      <animate attributeName="stroke-dashoffset" from="32" to="0" dur={dur} repeatCount="indefinite" />
    </path>
    {label && <text x={lx} y={ly} textAnchor={anchor} fontSize="12.5" fill="var(--ink)">{label}</text>}
  </g>;
}

function Box({ x, y, w, h, title, sub, color }) {
  return <g>
    <rect x={x} y={y} width={w} height={h} rx="12" fill="var(--card)" stroke={color} strokeWidth="2" />
    <text x={x + w / 2} y={y + 24} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">{title}</text>
    <text x={x + w / 2} y={y + 42} textAnchor="middle" fontSize="11.5" fill="var(--muted)">{sub}</text>
  </g>;
}

function Diagram({ k, s }) {
  const K = KIND[k], st = K.stages[s], isNew = k === "new";
  const coreC = isNew ? "var(--blue)" : "var(--accent)";
  return <svg viewBox="0 0 720 350" style={{ width: "100%" }} role="img" aria-label={K.tab + "示意图"}>
    <Box x={20} y={120} w={170} h={70} title={K.core[0]} sub={K.core[1]} color={coreC} />
    <Box x={470} y={120} w={230} h={isNew ? 70 : 150} title={K.peri[0]} sub={K.peri[1]} color="var(--gold)" />
    <Flow d="M 470 140 C 360 110, 300 110, 190 140" w={st.ex} color="var(--gold)" dur="1.6s" label={"→ " + K.out} lx={330} ly={100} />
    <Flow d="M 190 172 C 300 205, 360 205, 470 172" w={st.im} color={coreC} dur="1.9s" label={K.back + " →"} lx={330} ly={222} />
    {isNew ? <>
      <Box x={490} y={250} w={190} h={60} title="非洲" sub="内部奴隶贸易发达" color="var(--muted)" />
      <Flow d="M 585 250 L 585 192" w={st.sl} color="var(--accent)" dur="1.4s" label="被掳掠的奴隶" lx={596} ly={228} anchor="start" />
      <Box x={490} y={14} w={190} h={60} title="英属北美" sub="粮食、木材充足" color="var(--muted)" />
      <Flow d="M 585 74 L 585 120" w={st.na} color="var(--violet)" dur="1.4s" label="粮食、木材" lx={596} ly={102} anchor="start" />
      <Flow d="M 190 128 C 280 60, 380 40, 490 44" w={st.na ? Math.max(2, st.na - 2) : 0} color="var(--blue)" dur="2.2s" label="英国制成品 → 北美" lx={300} ly={52} />
      <text x={700} y={340} textAnchor="end" fontSize="12" fill="var(--muted)">种植园几乎什么都要买：出口与进口互相推高，贸易大体平衡、不断扩张</text>
    </> : <>
      <text x={485} y={210} fontSize="12" fill="var(--muted)">人口</text>
      {Array.from({ length: st.pop }).map((_, i) => <circle key={i} cx={525 + i * 16} cy={206} r="5.5" fill="var(--gold)" style={{ transition: "all .5s" }} />)}
      <text x={485} y={240} fontSize="12" fill="var(--muted)">本地纺织</text>
      <rect x={545} y={230} width={140} height={12} rx="6" fill="var(--paper)" />
      <rect x={545} y={230} width={st.craft / 3 * 140} height={12} rx="6" fill="var(--accent)" opacity=".7" style={{ transition: "width .6s" }} />
      <text x={485} y={262} fontSize="11.5" fill="var(--muted)">{st.craft >= 3 ? "进口替代：自己织布，少买核心区的布" : st.craft ? "开始自己纺织" : "几乎不织布"}</text>
      <text x={700} y={340} textAnchor="end" fontSize="12" fill="var(--muted)">边缘长大、变得像核心区：可交换的原料越来越少</text>
    </>}
    <text x={20} y={340} fontSize="11" fill="var(--muted)">箭头粗细为示意</text>
  </svg>;
}

function Curves({ s }) {
  // 纯示意：两类边缘向核心区出口原料的长期走势
  const W = 340, H = 150, L = 30, B = 125, xs = [L + 20, L + 140, L + 270];
  const old = [70, 100, 62], neu = [50, 92, 120];
  const y = v => B - v / 130 * (B - 15);
  const line = arr => arr.map((v, i) => `${i ? "L" : "M"} ${xs[i]} ${y(v)}`).join(" ");
  return <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: 380 }}>
    <line x1={L} x2={W - 10} y1={B} y2={B} stroke="var(--line)" />
    <line x1={L} x2={L} y1={10} y2={B} stroke="var(--line)" />
    <text x={L + 4} y={16} fontSize="11" fill="var(--muted)">向核心区出口的原料（示意）</text>
    {["起步", "扩张", "后期"].map((t, i) => <text key={t} x={xs[i]} y={B + 16} textAnchor="middle" fontSize="11" fill="var(--muted)">{t}</text>)}
    <path d={line(old)} fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 3" />
    <path d={line(neu)} fill="none" stroke="var(--gold)" strokeWidth="2" />
    <circle cx={xs[s]} cy={y(old[s])} r="5" fill="var(--accent)" stroke="var(--card)" strokeWidth="2" />
    <circle cx={xs[s]} cy={y(neu[s])} r="5" fill="var(--gold)" stroke="var(--card)" strokeWidth="2" />
    <text x={xs[2] + 8} y={y(old[2]) + 4} fontSize="11" fill="var(--ink)">旧世界</text>
    <text x={xs[2] - 6} y={y(neu[2]) - 8} textAnchor="end" fontSize="11" fill="var(--ink)">新世界</text>
  </svg>;
}

export default function TwoPeripheries() {
  const [k, setK] = useState("new"), [s, setS] = useState(0), [play, setPlay] = useState(false);
  useEffect(() => {
    if (!play) return;
    const t = setInterval(() => setS(v => (v + 1) % 3), 2600);
    return () => clearInterval(t);
  }, [play]);
  const K = KIND[k], st = K.stages[s];
  return <div className="card twop">
    <style>{`
      .twop .bar{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;margin-bottom:6px}
      .twop .seg{margin-bottom:0}
      .twop .say{padding:10px 14px;border-left:4px solid var(--gold);background:var(--paper);border-radius:6px;font-size:15px;line-height:1.7;min-height:5.2em}
      .twop .low{display:grid;grid-template-columns:minmax(240px,380px) 1fr;gap:18px;align-items:start;margin-top:12px}
      .twop .split{display:flex;height:30px;border-radius:6px;overflow:hidden;gap:2px;margin:6px 0}
      .twop .split div{display:flex;align-items:center;justify-content:center;color:#fff;font-size:12.5px;white-space:nowrap}
      .twop .sm{font-size:13px;color:var(--muted);line-height:1.6}
      @media (max-width:640px){.twop .low{grid-template-columns:1fr}}
    `}</style>
    <div className="bar">
      <span className="seg">{Object.entries(KIND).map(([id, x]) => <button key={id} className={k === id ? "on" : ""} onClick={() => setK(id)}>{x.tab}</button>)}</span>
      <span className="seg">{K.stages.map((x, j) => <button key={j} className={s === j ? "on" : ""} onClick={() => { setS(j); setPlay(false); }}>{j + 1}. {x.t}</button>)}
        <button onClick={() => setPlay(!play)}>{play ? "⏸ 暂停" : "▶ 自动播放"}</button></span>
    </div>
    <Diagram k={k} s={s} />
    <div className="say"><b>{K.tab} · {st.t}：</b>{st.text}</div>
    <div className="low">
      <div><Curves s={s} /><div className="sm">示意曲线，不是原书数据：旧世界边缘的出口会随边缘人口增长与进口替代而封顶；新世界种植园的出口与进口互相推高。</div></div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 14.5 }}>英属西印度：糖出口收入花在哪里（1760–1810，约）</div>
        <div className="split">{SPLIT.map(x => <div key={x.label} style={{ width: x.v + "%", background: x.color }}>{x.v === 50 ? "约 1/2" : "约 1/4"}</div>)}</div>
        <div className="sm" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>{SPLIT.map(x => <span key={x.label}><i style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: x.color, marginRight: 4 }} />{x.label}</span>)}</div>
        <p className="sm">原书数字。法属加勒比的奴隶进口约占糖收入的 30%；巴西 1821–26 年买奴隶花的钱约等于全国出口收入（偏高的特殊年份），18 世纪末大概也在 1/4 左右。旧世界的不自由劳动者（东欧农奴、爪哇农民）则大多自种口粮，几乎不构成进口市场。</p>
      </div>
    </div>
  </div>;
}
