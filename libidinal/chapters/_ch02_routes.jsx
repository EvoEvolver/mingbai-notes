// 第 2 章辅助图解：强度与秩序之间的几条路线（卖淫 / 通奸 / 罪犯 / 活货币 / 原地的掩饰）
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", BLUE = "#2c4a6e", GOLD = "#b8862b", MUTED = "#6b6257";
const L = 150, Rx = 610, Y = 120;

const ROUTES = [
  {
    id: "prost", name: "卖淫", who: "波德莱尔", concept: "adultery_prostitution",
    rule: "从强度到秩序",
    text: "不可交换的幻像（客人）被换成经济系统的符号（货币）；可交流的「智性符号」又把强度转到自己身上。波德莱尔：「什么是艺术？卖淫。」在纨绔子身上，享乐恰恰落在交易的普遍化与系统之「冰」上。",
    draw: () => <>
      <path d={`M${L + 46},${Y - 8} C 300,40 460,40 ${Rx - 62},${Y - 8}`} fill="none" stroke={RED} strokeWidth="3" markerEnd="url(#rt-r)" strokeDasharray="8 6">
        <animate attributeName="stroke-dashoffset" values="28;0" dur="1s" repeatCount="indefinite" /></path>
      <text x="380" y="40" textAnchor="middle" fontSize="13" fill={RED}>强度 → 被兑换成货币</text>
    </>,
  },
  {
    id: "adult", name: "通奸", who: "克罗索夫斯基《好客法则》", concept: "syntax_skin",
    rule: "从秩序到强度",
    text: "丈夫奥克塔夫把妻子罗贝特推向侄子，不是为了收钱，而是为了给他与罗贝特之间那份无法思考的过度引入尺度与思想。句法的法则以其全部严格被投注，成为享乐与眩晕的机会：「我的句法构成罗贝特皮肤的组织。」",
    draw: () => <>
      <path d={`M${Rx - 62},${Y + 8} C 460,200 300,200 ${L + 46},${Y + 8}`} fill="none" stroke={BLUE} strokeWidth="3" markerEnd="url(#rt-b)" strokeDasharray="8 6">
        <animate attributeName="stroke-dashoffset" values="28;0" dur="1s" repeatCount="indefinite" /></path>
      <text x="380" y="210" textAnchor="middle" fontSize="13" fill={BLUE}>法则·句法 → 被投注为强度</text>
    </>,
  },
  {
    id: "crime", name: "罪犯之友协会", who: "萨德 / 克罗索夫斯基的解读", concept: "living_currency",
    rule: "把货币撤出流通、烧掉",
    text: "萨德的罪犯既是皮条客又是客人，或者两者都不是：他把收入从商品流通中撤出，全部献给纯粹的享乐消耗。货币不再是替代品，而成了大皮肤上的一块，和身体、语言一样被强度灼烧。它不是资本主义的：它积累的是「废墟的财富」。",
    draw: () => <>
      <path d={`M${Rx - 10},${Y + 44} Q ${Rx - 40},${Y + 70} 470,${Y + 78}`} fill="none" stroke={GOLD} strokeWidth="3" markerEnd="url(#rt-g)" />
      <text x="440" y={Y + 88} textAnchor="middle" fontSize="28">🔥
        <animate attributeName="font-size" values="26;34;26" dur="1.2s" repeatCount="indefinite" /></text>
      <text x="440" y={Y + 116} textAnchor="middle" fontSize="13" fill={GOLD}>货币被焚尽：废墟的财富</text>
    </>,
  },
  {
    id: "living", name: "活货币", who: "克罗索夫斯基《活货币》", concept: "living_currency",
    rule: "想让两极合一，却仍是货币",
    text: "克罗索夫斯基设想一种「以人支付」的工业：身体本身就是货币，其情感力量直接决定其力比多价格。利奥塔致敬这个虚构，但指出：货币活了也仍是货币——它还是替代、还是拟像，还在异化与「背叛」的奥古斯丁传统里，像一座够不着的天上之城的复本。",
    draw: () => <>
      <path d={`M${L + 46},${Y} L ${Rx - 60},${Y}`} fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="3 5" />
      <circle cx="380" cy={Y} r="26" fill="#f2d7a8" stroke={GOLD} strokeWidth="2">
        <animate attributeName="cx" values="300;460;300" dur="3s" repeatCount="indefinite" /></circle>
      <text x="380" y={Y + 60} textAnchor="middle" fontSize="13" fill={MUTED}>身体＝货币？摆来摆去，仍被拉回「替代」一端</text>
    </>,
  },
  {
    id: "lyotard", name: "原地的掩饰", who: "利奥塔", concept: "dissimulation",
    rule: "同一条路线，原地不动",
    text: "「卖淫是从强度到秩序，通奸是从秩序到强度。」但利奥塔说这是同一条路线：不动的掩饰，原地的旅行，同时穿过冲动的愚蠢与概念的清晰。所以他既不要浪漫的自发激情政治，也不要理解力的政治：结构是愚蠢的，激情是不育的。",
    draw: () => <>
      <g>
        <circle cx="380" cy={Y} r="44" fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="4 4">
          <animateTransform attributeName="transform" type="rotate" from={`0 380 ${Y}`} to={`360 380 ${Y}`} dur="6s" repeatCount="indefinite" /></circle>
        <path d={`M380,${Y - 44} A44,44 0 0 1 380,${Y + 44}`} fill={RED} opacity=".55" />
        <path d={`M380,${Y + 44} A44,44 0 0 1 380,${Y - 44}`} fill={BLUE} opacity=".55" />
        <animateTransform attributeName="transform" type="rotate" values={`-20 380 ${Y};20 380 ${Y};-20 380 ${Y}`} dur="2.4s" repeatCount="indefinite" />
      </g>
      <text x="380" y={Y + 70} textAnchor="middle" fontSize="13" fill="#7a5a14">两极不再分处两边：同一个符号的两面</text>
    </>,
  },
];

export default function Routes() {
  const [i, setI] = useState(0), r = ROUTES[i];
  const collapsed = r.id === "lyotard";
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ flexWrap: "wrap" }}>{ROUTES.map((x, j) =>
        <button key={x.id} className={i === j ? "on" : ""} onClick={() => setI(j)}>{x.name}</button>)}</div>
      <svg key={r.id} viewBox="0 0 760 250" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        <defs>
          {[["rt-r", RED], ["rt-b", BLUE], ["rt-g", GOLD]].map(([id, c]) =>
            <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={c} /></marker>)}
        </defs>
        <g opacity={collapsed ? .25 : 1}>
          <circle cx={L} cy={Y} r="44" fill="#f7ddd2" stroke={RED} strokeWidth="2" />
          <text x={L} y={Y - 4} textAnchor="middle" fontSize="15" fill={RED} fontWeight="700">强度</text>
          <text x={L} y={Y + 16} textAnchor="middle" fontSize="11" fill={RED}>幻像·不可交换</text>
          <rect x={Rx - 60} y={Y - 40} width="120" height="80" rx="10" fill="#e3eaf2" stroke={BLUE} strokeWidth="2" />
          <text x={Rx} y={Y - 4} textAnchor="middle" fontSize="15" fill={BLUE} fontWeight="700">秩序</text>
          <text x={Rx} y={Y + 16} textAnchor="middle" fontSize="11" fill={BLUE}>货币·句法·可交换</text>
        </g>
        {r.draw()}
      </svg>
      <div style={{ borderLeft: "4px solid " + GOLD, paddingLeft: 14 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}><C id={r.concept}>{r.name}</C> <span className="muted-it">{r.who}</span> · <b>{r.rule}</b></div>
        <p style={{ margin: "6px 0 0" }}>{r.text}</p>
      </div>
    </div>
  );
}
