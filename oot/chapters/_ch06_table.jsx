// 第 6 章专属图解（三）：古典知识型的「总表」—— 普遍语法 / 自然史 / 财富分析 同构于一个四边形
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#6b6257";

const P = { att: [130, 90], art: [510, 90], des: [510, 320], der: [130, 320] };
const CORNERS = {
  att: { zh: "归属", en: "Attribution", lang: "动词 / 命题：把一个表征归给另一个", nh: "结构（可见的形式即其排列）", wealth: "价值：在交换中把此物「设定为」彼物的等价" },
  art: { zh: "分节", en: "Articulation", lang: "名词：把表征切分、区分开", nh: "结构（各部分的数目、形状、比例、位置）", wealth: "价值：进入全部交换体系后，被所有其他价值定位" },
  des: { zh: "指称", en: "Designation", lang: "词根与动作语言：一个声音直指一物", nh: "特征：给生物一个标志", wealth: "货币：某种物质与财富之间的初始关系" },
  der: { zh: "派生", en: "Derivation", lang: "转义与修辞：词义随时间滑移", nh: "特征：标出它在分类表中的位置", wealth: "价格：同一枚币代表的财富时多时少，不断涨落" },
};
const MODES = [
  { id: "lang", tab: "普遍语法", c: VIOLET, top: "判断：动词 + 名词", bot: "意义：词根 + 转义", open: "表征在想象中彼此相似、相互唤起",
    note: "语言的四个环节一旦越过「动词」这道门槛就彼此需要，但现实语言并不严密：指称与派生之间有想象的偏移，分节与归属之间有反思的错误。所以语言需要两门「技艺」来补救——让判断不出错的普遍语言（Ars combinatoria），和规范词义演变的百科全书 / 词典。语言理论因此天生是规范性的。" },
  { id: "nh", tab: "自然史", c: GREEN, top: "结构 structure", bot: "特征 character", open: "生物彼此邻接、相似，连成不断的序列",
    note: "自然史里不会出错：结构一眼可见，同时就是排列（归属＝分节）；特征在一个动作里既命名又定位（指称＝派生）。四个环节「精确叠合」，所以自然史能自己建立一套符号系统——它是一门理论。" },
  { id: "wealth", tab: "财富分析", c: GOLD, top: "价值 value", bot: "货币与价格 money / price", open: "人的需要彼此对应，且能被满足",
    note: "价值同时是「动词和名词」：既把两物连在一起，又是分析的原则；货币则像词根与转义、像分类特征，既给财富打上记号，又让这记号随数量涨落滑动。不同在于：这里的叠合要经过一个转变（估价→评价，金属→价格），取决于人的活动。财富是人造、人改的符号系统，所以财富理论处处与政治相连。" },
  { id: "all", tab: "三者叠合", c: RED, top: "", bot: "", open: "古典思想「形而上学上的强点」",
    note: "这就是福柯的「总表」：三个领域分享同一个四边形。上下两条闭合的边（判断 / 结构 / 价值；意义 / 特征 / 价格）是古典思想「科学上的强点」；左右两条敞开的边只能靠一个假设来缝合——表征、存在与需要都是连续的、无断裂的。这是它「形而上学上的强点」。" },
  { id: "modern", tab: "断裂之后", c: BLUE, top: "", bot: "", open: "",
    note: "18 世纪末的翻转：古典思想在形而上学上强的地方，长出了新的科学；在它科学上最稳的地方，裂开了哲学的空间。政治经济学、生物学、语文学不是坐在财富分析、自然史、普遍语法的旧位子上，而是长在旧理论段落之间那片空白里。与此同时，上边裂成「逻辑 vs 本体论」（走向形式化），下边裂成「意义 vs 时间」（走向诠释）——现代哲学的两大形式。" },
];

const lbl = (x, y, t, c, size = 14, w = 600) => <text x={x} y={y} textAnchor="middle" fontSize={size} fill={c} fontWeight={w}>{t}</text>;

function Quad({ mode, sel, setSel }) {
  const m = MODES.find(x => x.id === mode), modern = mode === "modern", all = mode === "all";
  const gap = modern ? 46 : 0;
  const seg = (a, b, closed, color, key) => {
    const [x1, y1] = P[a], [x2, y2] = P[b];
    if (closed && modern) {   // 闭合边从中间裂开
      const mx = (x1 + x2) / 2;
      return <g key={key}>
        <line x1={x1} y1={y1} x2={mx - gap} y2={y2} stroke={color} strokeWidth="6" strokeLinecap="round" style={{ transition: ".6s" }} />
        <line x1={mx + gap} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="6" strokeLinecap="round" style={{ transition: ".6s" }} />
      </g>;
    }
    return <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={closed ? 6 : 2.5}
      strokeDasharray={closed ? "none" : "7 7"} strokeLinecap="round" opacity={closed ? .9 : .6}>
      {!closed && <animate attributeName="stroke-dashoffset" values="0;-28" dur="2s" repeatCount="indefinite" />}</line>;
  };
  const sc = modern ? "#b8ad99" : m.c;
  return <svg viewBox="0 0 640 420" style={{ width: "100%", maxHeight: 460, background: "var(--paper)", borderRadius: 14 }}>
    {seg("att", "art", true, sc, "t")}
    {seg("der", "des", true, sc, "b")}
    {seg("att", "der", false, modern ? "#d9cdb6" : INK, "l")}
    {seg("art", "des", false, modern ? "#d9cdb6" : INK, "r")}

    {/* 上下边标签 */}
    {!all && !modern && <>{lbl(320, 76, m.top, m.c, 16)}{lbl(320, 352, m.bot, m.c, 16)}</>}
    {all && <>
      {lbl(320, 50, "判断（语法）", VIOLET, 13)}{lbl(320, 66, "结构（自然史）", GREEN, 13)}{lbl(320, 82, "价值（财富）", GOLD, 13)}
      {lbl(320, 342, "意义（语法）", VIOLET, 13)}{lbl(320, 358, "特征（自然史）", GREEN, 13)}{lbl(320, 374, "货币 / 价格（财富）", GOLD, 13)}
    </>}
    {/* 开放边：连续性 */}
    {!modern && <g>
      <text x="96" y="205" fontSize="12" fill={MUTED} textAnchor="middle" transform="rotate(-90 96 205)">敞开的边 · 靠连续性缝合</text>
      <text x="544" y="205" fontSize="12" fill={MUTED} textAnchor="middle" transform="rotate(90 544 205)">敞开的边 · 靠连续性缝合</text>
      <rect x="170" y="180" width="300" height="50" rx="12" fill="#fffdf8" stroke={m.c} strokeDasharray="4 4" />
      {lbl(320, 202, all ? "存在的连续性" : "中间靠什么连起来？", m.c, 13)}
      {lbl(320, 221, m.open, INK, 12, 400)}
    </g>}
    {mode === "lang" && lbl(320, 270, "（第 4 章：对角线交点处是「名称」）", MUTED, 12, 400)}
    {modern && <g>
      {lbl(320, 44, "形式逻辑 ⟷ 形式本体论", BLUE, 14)}{lbl(320, 62, "（形式化 · mathesis 的新形态）", MUTED, 12, 400)}
      {lbl(320, 384, "原初意义 ⟷ 历史与时间", BLUE, 14)}{lbl(320, 402, "（诠释 · 永无止境的揭示）", MUTED, 12, 400)}
      {[["政治经济学：价值 ↔ 价格", GOLD, 170], ["生物学：结构 ↔ 特征", GREEN, 205], ["语文学：命题形式 ↔ 词义", VIOLET, 240]].map(([t, c, y]) =>
        <g key={t}><rect x="190" y={y - 16} width="260" height="24" rx="12" fill={c} opacity=".9">
            <animate attributeName="opacity" values=".55;.95;.55" dur="2.4s" repeatCount="indefinite" /></rect>
          {lbl(320, y + 1, t, "#fffdf8", 13)}</g>)}
      {lbl(320, 132, "新科学长在旧理论段落之间的空白里", INK, 12, 400)}
    </g>}

    {/* 四个角：可点击 */}
    {Object.entries(CORNERS).map(([id, c]) => {
      const [x, y] = P[id], on = sel === id, up = y < 200;
      return <g key={id} style={{ cursor: "pointer" }} onClick={() => setSel(on ? null : id)}>
        <circle cx={x} cy={y} r={on ? 17 : 13} fill={on ? RED : "#fffdf8"} stroke={RED} strokeWidth="3" style={{ transition: ".2s" }} />
        <text x={x} y={up ? y - 26 : y + 38} textAnchor="middle" fontSize="16" fontWeight="700" fill={INK}>{c.zh}</text>
        <text x={x} y={up ? y - 44 : y + 54} textAnchor="middle" fontSize="11" fill={MUTED} fontStyle="italic">{c.en}</text>
      </g>;
    })}
  </svg>;
}

export default function GeneralTable() {
  const [mode, setMode] = useState("all"), [sel, setSel] = useState(null);
  const m = MODES.find(x => x.id === mode);
  return <div className="card" style={{ display: "grid", gap: 14 }}>
    <div className="seg">{MODES.map(x =>
      <button key={x.id} className={mode === x.id ? "on" : ""} onClick={() => setMode(x.id)}>{x.tab}</button>)}</div>
    <Quad mode={mode} sel={sel} setSel={setSel} />
    {sel
      ? <div style={{ background: "var(--paper)", borderRadius: 12, padding: "10px 14px" }}>
          <b style={{ fontFamily: "var(--serif)", fontSize: 19 }}>{CORNERS[sel].zh} <span className="muted-it">{CORNERS[sel].en}</span></b>
          <div style={{ display: "grid", gap: 4, marginTop: 6, fontSize: 15 }}>
            <div><b style={{ color: VIOLET }}>普遍语法</b>：{CORNERS[sel].lang}</div>
            <div><b style={{ color: GREEN }}>自然史</b>：{CORNERS[sel].nh}</div>
            <div><b style={{ color: GOLD }}>财富分析</b>：{CORNERS[sel].wealth}</div>
          </div>
        </div>
      : <div style={{ fontSize: 14, color: "var(--muted)" }}>👆 点四边形的任意一个角，看它在三个领域里分别对应什么。</div>}
    <p style={{ margin: 0 }}>{m.note}</p>
  </div>;
}

// 静态的「同构总表」，方便一眼对照
const ROWS = [
  ["归属 + 分节（闭合的上边）", "命题理论：动词 + 名词", "结构", "价值"],
  ["指称 + 派生（闭合的下边）", "词根 / 动作语言 + 转义", "特征", "货币与价格"],
  ["敞开的两边靠什么缝合", "表征在想象中相似、相互唤起", "生物邻接相似、连续不断", "需要彼此对应、能被满足"],
  ["四个环节叠合得如何", "不严密，有偏移与错误", "精确叠合", "经由转变与人的活动"],
  ["因此理论的性质", "规范性：需要普遍语言与百科全书", "理论：自己建立符号系统", "与政治相连"],
  ["18 世纪末之后", "语文学", "生物学", "政治经济学"],
];
export function IsoTable() {
  const th = { textAlign: "left", padding: "8px 10px", borderBottom: "2px solid var(--ink)", fontFamily: "var(--serif)" };
  const td = { padding: "8px 10px", borderBottom: "1px solid var(--line)", verticalAlign: "top" };
  return <div className="card" style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
      <thead><tr><th style={th}></th><th style={{ ...th, color: VIOLET }}>普遍语法</th><th style={{ ...th, color: GREEN }}>自然史</th><th style={{ ...th, color: GOLD }}>财富分析</th></tr></thead>
      <tbody>{ROWS.map((r, i) => <tr key={i}>
        <td style={{ ...td, fontWeight: 600, color: i === 5 ? BLUE : INK }}>{r[0]}</td>
        {r.slice(1).map((c, j) => <td key={j} style={{ ...td, color: i === 5 ? BLUE : INK }}>{c}</td>)}
      </tr>)}</tbody>
    </table>
    <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--muted)" }}>
      一句话：在古典时代，<C id="general_table">语言、自然、财富拥有同一种存在方式——表征</C>。
    </p>
  </div>;
}
