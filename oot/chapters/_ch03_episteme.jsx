// 第 3 章专属图解 2：古典知识型总图 —— mathesis / taxinomia（表格）/ genesis，以及 18 世纪末的拆解
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#7a6f62";

const PARTS = {
  mathesis: {
    color: BLUE, name: "Mathesis", zh: "普遍的秩序科学", cid: "mathesis",
    orders: "简单性质（形状、广延、运动……）",
    tool: "代数：给简单性质配上符号并对符号运算",
    kind: "相等关系的科学 → 判断与归属 → 「真理的科学」",
    who: "笛卡尔《指导心灵的规则》；莱布尼茨「质的秩序的数学」",
    note: "关键不在「把自然数学化」，而在于：一切度量问题都可还原为排序问题，所以连不可度量的东西也能被排成有序序列。",
  },
  taxinomia: {
    color: GOLD, name: "Taxinomia", zh: "分类学 · 表格", cid: "taxinomia",
    orders: "复杂性质（经验中给出的一般表征）",
    tool: "符号系统：符号之于复杂性质，正如代数之于简单性质",
    kind: "同一与差异的科学 → 分节与分类 → 「关于存在者的知识」",
    who: "一般语法（词）、自然志（生物）、财富分析（需要）；林奈的「普遍分类」之梦",
    note: "它不与 mathesis 对立，而是「质的 mathesis」。它在空间中同时铺开符号，像一种句法：知识的中心是表格。",
  },
  genesis: {
    color: GREEN, name: "Genesis", zh: "发生学分析", cid: "genesis",
    orders: "秩序如何从经验系列中一步步构成",
    tool: "分析印象、回忆、想象在心中留下的痕迹",
    kind: "把符号分配到一种「时间的类比物」上，像一部编年史",
    who: "洛克 → 孔狄亚克（苏醒的意识）、休谟（陌生人）、卢梭（第一个人）→ 观念学派",
    note: "表格要求存在是连续的，而我们只有断续的表征；所以必须追问知识的起源。经验论的起源分析不是理性主义的对手，而是同一个秩序方案的必需部分。",
  },
};

const DOMAINS = [["📖", "一般语法", "words"], ["🌿", "自然志", "beings"], ["💰", "财富分析", "needs"]];

function ClassicalSvg({ sel, setSel }) {
  const hit = id => ({ onClick: () => setSel(id), style: { cursor: "pointer" }, opacity: sel && sel !== id ? .45 : 1 });
  return <svg viewBox="0 0 720 360" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
    <defs>
      <marker id="ar3e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill={MUTED} />
      </marker>
    </defs>
    {/* 顶部轴 */}
    <line x1="70" y1="26" x2="650" y2="26" stroke={MUTED} strokeWidth="1.5" markerEnd="url(#ar3e)" />
    <text x="70" y="18" fontSize="12" fill={MUTED}>可计算的秩序（简单）</text>
    <text x="650" y="18" textAnchor="end" fontSize="12" fill={MUTED}>最复杂的表征 / 经验的系列</text>
    {/* 符号区域 */}
    <rect x="200" y="46" width="320" height="212" rx="16" fill="none" stroke={GOLD} strokeDasharray="4 5" />
    <text x="360" y="62" textAnchor="middle" fontSize="11.5" fill={GOLD}>符号区域：覆盖全部经验表征，但从不越出</text>

    {/* mathesis */}
    <g {...hit("mathesis")}>
      <circle cx="105" cy="150" r="78" fill="#eef2f7" stroke={BLUE} strokeWidth="2.5" />
      <text x="105" y="135" textAnchor="middle" fontSize="19" fontStyle="italic" fontWeight="700" fill={BLUE}>Mathesis</text>
      <text x="105" y="157" textAnchor="middle" fontSize="13" fill={INK}>简单性质</text>
      <text x="105" y="177" textAnchor="middle" fontSize="13" fill={INK}>x + y = z</text>
      <text x="105" y="196" textAnchor="middle" fontSize="11" fill={MUTED}>代数 · 计算</text>
    </g>
    {/* taxinomia / table */}
    <g {...hit("taxinomia")}>
      <rect x="225" y="74" width="270" height="168" rx="12" fill="#fbf3df" stroke={GOLD} strokeWidth="2.5" />
      <text x="360" y="100" textAnchor="middle" fontSize="19" fontStyle="italic" fontWeight="700" fill={GOLD}>Taxinomia</text>
      <text x="360" y="118" textAnchor="middle" fontSize="12" fill={MUTED}>复杂性质 · 同一与差异的表格</text>
      {/* 表格网格 */}
      {[0, 1, 2, 3].map(r => <line key={"r" + r} x1="245" x2="475" y1={130 + r * 12} y2={130 + r * 12} stroke={GOLD} opacity=".35" />)}
      {[0, 1, 2, 3, 4, 5].map(c => <line key={"c" + c} y1="130" y2="166" x1={245 + c * 46} x2={245 + c * 46} stroke={GOLD} opacity=".35" />)}
      <rect x="291" y="142" width="46" height="12" fill={GOLD} opacity=".5">
        <animate attributeName="x" values="245;291;337;383;429;245" dur="5s" repeatCount="indefinite" />
      </rect>
      {DOMAINS.map(([ic, t, en], k) => <g key={t}>
        <rect x={238 + k * 84} y="180" width="78" height="48" rx="9" fill="#fffdf8" stroke={GOLD} />
        <text x={277 + k * 84} y="200" textAnchor="middle" fontSize="13" fill={INK}>{ic} {t}</text>
        <text x={277 + k * 84} y="218" textAnchor="middle" fontSize="10.5" fontStyle="italic" fill={MUTED}>{en}</text>
      </g>)}
    </g>
    {/* genesis */}
    <g {...hit("genesis")}>
      <circle cx="615" cy="150" r="78" fill="#eef4ef" stroke={GREEN} strokeWidth="2.5" />
      <text x="615" y="135" textAnchor="middle" fontSize="19" fontStyle="italic" fontWeight="700" fill={GREEN}>Genesis</text>
      <text x="615" y="157" textAnchor="middle" fontSize="13" fill={INK}>秩序的起源</text>
      <text x="615" y="177" textAnchor="middle" fontSize="13" fill={INK}>印象 → 观念</text>
      <text x="615" y="196" textAnchor="middle" fontSize="11" fill={MUTED}>编年 · 时间序列</text>
    </g>
    {/* 连接 */}
    <line x1="185" y1="150" x2="222" y2="150" stroke={MUTED} strokeWidth="2" markerEnd="url(#ar3e)" markerStart="url(#ar3e)" />
    <line x1="498" y1="150" x2="535" y2="150" stroke={MUTED} strokeWidth="2" markerEnd="url(#ar3e)" markerStart="url(#ar3e)" />
    {/* 相似 + 想象：底部边界 */}
    <rect x="40" y="282" width="640" height="56" rx="14" fill="#f3ece2" stroke={RED} strokeDasharray="6 5" />
    <text x="360" y="304" textAnchor="middle" fontSize="13.5" fontWeight="700" fill={RED}>知识的边界：事物模糊的相似 × 表征中的想象（回忆）</text>
    <text x="360" y="324" textAnchor="middle" fontSize="11.5" fill={MUTED}>没有它，任何比较都无从开始；但它本身不再算知识</text>
    <path d="M600,282 C600,255 610,240 612,230" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#ar3e)">
      <animate attributeName="stroke-dashoffset" values="16;0" dur="1s" repeatCount="indefinite" />
    </path>
    <path d="M360,282 L360,246" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#ar3e)">
      <animate attributeName="stroke-dashoffset" values="16;0" dur="1s" repeatCount="indefinite" />
    </path>
    <text x="368" y="270" fontSize="11" fill={RED}>原材料</text>
  </svg>;
}

function ModernSvg() {
  return <svg viewBox="0 0 720 360" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
    <defs>
      <marker id="ar3m" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill={MUTED} />
      </marker>
    </defs>
    <text x="360" y="28" textAnchor="middle" fontSize="13" fill={MUTED}>康德批判与 18 世纪末之后：古典的网格被拆开、重组</text>
    <g opacity=".35">
      <rect x="225" y="74" width="270" height="140" rx="12" fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="6 6" />
      <text x="360" y="140" textAnchor="middle" fontSize="18" fontStyle="italic" fill={GOLD}>Taxinomia（表格）</text>
      <text x="360" y="162" textAnchor="middle" fontSize="12" fill={GOLD}>中心消失</text>
      <animate attributeName="opacity" values=".9;.35" dur="1.4s" fill="freeze" />
    </g>
    <g>
      <animateTransform attributeName="transform" type="translate" from="60 0" to="0 0" dur="1s" fill="freeze" />
      <rect x="20" y="230" width="300" height="100" rx="14" fill="#eef2f7" stroke={BLUE} strokeWidth="2.5" />
      <text x="170" y="262" textAnchor="middle" fontSize="16" fontWeight="700" fill={BLUE}>形式学科</text>
      <text x="170" y="284" textAnchor="middle" fontSize="12.5" fill={INK}>mathesis 重组为 陈述学（apophantics）+ 本体论</text>
      <text x="170" y="306" textAnchor="middle" fontSize="11.5" fill={MUTED}>主导形式学科直到今天</text>
    </g>
    <g>
      <animateTransform attributeName="transform" type="translate" from="-60 0" to="0 0" dur="1s" fill="freeze" />
      <rect x="400" y="230" width="300" height="100" rx="14" fill="#f2eef6" stroke={VIOLET} strokeWidth="2.5" />
      <text x="550" y="262" textAnchor="middle" fontSize="16" fontWeight="700" fill={VIOLET}>解释学科</text>
      <text x="550" y="284" textAnchor="middle" fontSize="12.5" fill={INK}>历史 + 符号学（后者被前者吸收）</text>
      <text x="550" y="306" textAnchor="middle" fontSize="11.5" fill={MUTED}>施莱尔马赫 → 尼采、弗洛伊德</text>
    </g>
    <circle cx="105" cy="120" r="56" fill="none" stroke={BLUE} strokeWidth="2" />
    <text x="105" y="125" textAnchor="middle" fontSize="16" fontStyle="italic" fill={BLUE}>Mathesis</text>
    <circle cx="615" cy="120" r="56" fill="none" stroke={GREEN} strokeWidth="2" />
    <text x="615" y="115" textAnchor="middle" fontSize="15" fontStyle="italic" fill={GREEN}>Genesis</text>
    <text x="615" y="134" textAnchor="middle" fontSize="11" fill={MUTED}>→ 历史</text>
    <line x1="120" y1="176" x2="150" y2="226" stroke={MUTED} strokeWidth="2" markerEnd="url(#ar3m)" />
    <line x1="600" y1="176" x2="570" y2="226" stroke={MUTED} strokeWidth="2" markerEnd="url(#ar3m)" />
    <line x1="420" y1="214" x2="500" y2="226" stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#ar3m)" />
    <text x="470" y="206" fontSize="11" fill={MUTED}>符号学</text>
  </svg>;
}

export default function EpistemeMap() {
  const [era, setEra] = useState(0);
  const [sel, setSel] = useState("taxinomia");
  const p = PARTS[sel];
  return <div className="card" style={{ display: "grid", gap: 14 }}>
    <div className="seg" style={{ marginBottom: 0 }}>
      {["古典时代（17–18 世纪）", "18 世纪末之后"].map((t, j) =>
        <button key={j} className={era === j ? "on" : ""} onClick={() => setEra(j)}>{t}</button>)}
    </div>
    {era === 0 ? <>
      <ClassicalSvg sel={sel} setSel={setSel} />
      <div className="seg" style={{ marginBottom: 0 }}>
        {Object.entries(PARTS).map(([id, x]) =>
          <button key={id} className={sel === id ? "on" : ""} onClick={() => setSel(id)}>{x.name} · {x.zh}</button>)}
      </div>
      <div style={{ borderLeft: `4px solid ${p.color}`, paddingLeft: 14 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}><C id={p.cid}>{p.name}</C> <span className="muted-it">{p.zh}</span></div>
        <div style={{ display: "grid", gridTemplateColumns: "88px 1fr", gap: "4px 10px", fontSize: 15, margin: "8px 0" }}>
          <b>排什么</b><span>{p.orders}</span>
          <b>用什么</b><span>{p.tool}</span>
          <b>算哪种知识</b><span>{p.kind}</span>
          <b>谁在做</b><span>{p.who}</span>
        </div>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>💡 {p.note}</p>
      </div>
    </> : <>
      <ModernSvg />
      <p style={{ margin: 0, fontSize: 15 }}>
        这套三合一的布局后来消失得如此彻底，以至于后人连它曾经存在都忘了：mathesis 走向形式学科，历史与符号学合成解释学科，
        而居中的<C id="table">表格</C>空间不复存在。这也是为什么思想史家习惯把古典思想读成「笛卡尔影响」「机械论 vs 生命力」之类的意见之争——福柯认为这看错了层次。
      </p>
    </>}
  </div>;
}
