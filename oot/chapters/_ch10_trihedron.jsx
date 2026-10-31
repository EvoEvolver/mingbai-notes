// 第 10 章专属图解 ①：古典的平面表 vs 现代的知识三面体（SVG）
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16";

// 等轴投影：原点与三条轴向量
const O = [250, 250];
const AX = { a: [195, 62], b: [0, -195], c: [-195, 62] };
const P = (...vs) => vs.reduce((p, v) => [p[0] + v[0], p[1] + v[1]], O);
const sc = (v, k) => [v[0] * k, v[1] * k];
const pts = arr => arr.map(p => p.join(",")).join(" ");

const ITEMS = {
  a: { color: BLUE, title: "第一维：数学与物理科学", body: "秩序是从显明或已验证的命题出发、演绎而线性的链接。这是最「纯」的一维。", hs: "人文科学对它的关系：或迟或早，总想给自己一个数学形式化。福柯说这恰是人文科学最不成问题、最透明的一维。" },
  b: { color: GREEN, title: "第二维：经验科学（语言、生命、劳动）", body: "语文学、生物学、经济学：把不连续但相类比的要素联系起来，建立因果关系和结构常量。", hs: "人文科学对它的关系：从这里借来模型和概念（功能/规范、冲突/规则、意义/系统），见下一个图解。" },
  c: { color: VIOLET, title: "第三维：哲学反思", body: "作为「同一之思」展开；在现代，它在根本的有限性层面上思考人的存在方式（第 9 章的「有限性分析」）。", hs: "人文科学对它的关系：它对准的是哲学所思的那个有限之人，却想穿过他全部的经验表现。所以人文科学和哲学有一种「危险的亲近」。" },
  ab: { color: "#2f6f73", title: "平面：数学 × 经验科学", body: "从一个方向看，是数学在经验科学中的应用领域；从另一个方向看，是语言学、生物学、经济学中「可数学化」的部分。" },
  bc: { color: "#8a5a2b", title: "平面：经验科学 × 哲学", body: "生命哲学、异化之人的哲学、符号形式的哲学都在这里（把经验领域的概念移入哲学）；彻底追问时，还会出现「区域本体论」：追问生命、劳动、语言本身是什么。" },
  ca: { color: RED, title: "平面：哲学 × 数学", body: "思想的形式化：逻辑、形式语言、对推理本身的形式研究。" },
  hs: { color: GOLD, title: "人文科学：在体积之中", body: "它不在任何一条轴上，也不在任何一个平面上，却在三者围出的体积里，同时与三者相关：向数学求形式化、向经验科学借模型、朝向哲学所思的有限之人。\n\n所以它既「危险」又「处于危险中」：三个中间平面稍有偏差，思想就跌进人文科学的地盘，成为心理主义、社会学主义，即「人类学主义」；而它自己则永远不稳、永远二手。" },
};

function Classical() {
  // 一张均质的表：所有知识按同一与差异排在同一平面上
  const rows = [
    ["mathesis", "数学 / 代数", BLUE],
    ["taxinomia", "自然史（分类）", GREEN],
    ["taxinomia", "普遍语法（言说）", GREEN],
    ["taxinomia", "财富分析（交换）", GREEN],
    ["genesis", "观念学 / 哲学", VIOLET],
  ];
  return <svg viewBox="0 0 500 380" style={{ width: "100%", maxHeight: 400, background: "var(--paper)", borderRadius: 14 }}>
    <polygon points="70,140 430,140 470,300 30,300" fill={GOLD} opacity=".08" stroke={GOLD} strokeWidth="2" />
    {[0, 1, 2, 3, 4].map(i => <line key={i} x1={66} y1={140 + i * 40} x2={434} y2={140 + i * 40} stroke={GOLD} opacity=".25" />)}
    {rows.map(([k, label, col], i) => {
      const y = 158 + i * 31, x = 100 + i * 70;
      return <g key={i}>
        <rect x={x - 62} y={y - 14} width="124" height="26" rx="13" fill="#fff" stroke={col} strokeWidth="2">
          <animate attributeName="y" values={`${y - 14};${y - 18};${y - 14}`} dur="3s" begin={`${i * .3}s`} repeatCount="indefinite" />
        </rect>
        <text x={x} y={y + 4} textAnchor="middle" fontSize="13" fill={INK}>
          <animate attributeName="y" values={`${y + 4};${y};${y + 4}`} dur="3s" begin={`${i * .3}s`} repeatCount="indefinite" />{label}</text>
      </g>;
    })}
    <path d="M40,330 L460,330" stroke={INK} strokeWidth="1.5" markerEnd="url(#arr1)" />
    <defs><marker id="arr1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10z" fill={INK} /></marker></defs>
    <text x="250" y="352" textAnchor="middle" fontSize="13" fill={INK}>同一条「同一与差异」的秩序：从最简单的观念到最复杂的真理</text>
    <text x="250" y="60" textAnchor="middle" fontSize="20" fontFamily="var(--serif)" fill={INK}>古典时代：一张均质的表</text>
    <text x="250" y="88" textAnchor="middle" fontSize="14" fill={RED}>这张表上没有「人」的位置</text>
  </svg>;
}

function Modern({ sel, setSel }) {
  const k = .78;
  const plane = (u, v) => [O, P(sc(AX[u], k)), P(sc(AX[u], k), sc(AX[v], k)), P(sc(AX[v], k))];
  const planeLbl = (u, v, t, key) => {
    const c = P(sc(AX[u], k * .5), sc(AX[v], k * .5));
    return <text x={c[0]} y={c[1]} textAnchor="middle" fontSize="12" fill={ITEMS[key].color} style={{ pointerEvents: "none" }} fontWeight={sel === key ? 700 : 400}>{t}</text>;
  };
  const on = key => sel === null || sel === key || (sel === "hs");
  const hsC = P(sc(AX.a, .38), sc(AX.b, .42), sc(AX.c, .28));
  return <svg viewBox="0 0 500 380" style={{ width: "100%", maxHeight: 400, background: "var(--paper)", borderRadius: 14 }}>
    <defs>
      <radialGradient id="fog10"><stop offset="0" stopColor={GOLD} stopOpacity=".75" /><stop offset="1" stopColor={GOLD} stopOpacity="0" /></radialGradient>
      <marker id="arr10" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10z" fill={INK} /></marker>
    </defs>
    {[["a", "b", "ab"], ["b", "c", "bc"], ["c", "a", "ca"]].map(([u, v, key]) =>
      <polygon key={key} points={pts(plane(u, v))} fill={ITEMS[key].color} opacity={sel === key ? .32 : on(key) ? .1 : .04}
        stroke={ITEMS[key].color} strokeWidth={sel === key ? 2 : 1} strokeDasharray="4 4" style={{ cursor: "pointer", transition: ".3s" }}
        onClick={() => setSel(key)} />)}
    {planeLbl("a", "b", "数学的应用", "ab")}
    {planeLbl("b", "c", "生命哲学·区域本体论", "bc")}
    {planeLbl("c", "a", "思想的形式化", "ca")}
    {["a", "b", "c"].map(key => {
      const e = P(AX[key]);
      return <g key={key} style={{ cursor: "pointer" }} onClick={() => setSel(key)} opacity={on(key) ? 1 : .35}>
        <line x1={O[0]} y1={O[1]} x2={e[0]} y2={e[1]} stroke={ITEMS[key].color} strokeWidth={sel === key ? 7 : 4} strokeLinecap="round" />
        <line x1={O[0]} y1={O[1]} x2={e[0]} y2={e[1]} stroke="transparent" strokeWidth="22" />
      </g>;
    })}
    <text x={P(AX.a)[0] - 4} y={P(AX.a)[1] + 24} textAnchor="end" fontSize="14" fontWeight="700" fill={BLUE}>数学 / 物理</text>
    <text x={P(AX.b)[0]} y={P(AX.b)[1] - 12} textAnchor="middle" fontSize="14" fontWeight="700" fill={GREEN}>经验科学：语言 · 生命 · 劳动</text>
    <text x={P(AX.c)[0] + 4} y={P(AX.c)[1] + 24} textAnchor="start" fontSize="14" fontWeight="700" fill={VIOLET}>哲学反思</text>
    {/* 人文科学：体积中的一团雾，虚线连向三条轴 */}
    {sel === "hs" && [P(sc(AX.a, .55)), P(sc(AX.b, .6)), P(sc(AX.c, .55))].map((p, i) =>
      <line key={i} x1={hsC[0]} y1={hsC[1]} x2={p[0]} y2={p[1]} stroke={GOLD} strokeWidth="2" strokeDasharray="5 4">
        <animate attributeName="stroke-dashoffset" values="18;0" dur="1s" repeatCount="indefinite" /></line>)}
    <g style={{ cursor: "pointer" }} onClick={() => setSel("hs")}>
      {[[-14, -6, 34], [16, 4, 30], [0, 12, 28]].map(([dx, dy, r], i) =>
        <circle key={i} cx={hsC[0] + dx} cy={hsC[1] + dy} r={r} fill="url(#fog10)">
          <animate attributeName="r" values={`${r};${r + 7};${r}`} dur={`${2.4 + i * .5}s`} repeatCount="indefinite" />
          <animate attributeName="cx" values={`${hsC[0] + dx};${hsC[0] + dx + (i - 1) * 6};${hsC[0] + dx}`} dur={`${3 + i}s`} repeatCount="indefinite" />
        </circle>)}
      <text x={hsC[0]} y={hsC[1] + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} style={{ paintOrder: "stroke", stroke: "var(--paper)", strokeWidth: 4 }}>人文科学</text>
    </g>
    <text x="250" y="372" textAnchor="middle" fontSize="12" fill="var(--muted)">点击三条轴、三个虚线平面或中间的「雾」</text>
  </svg>;
}

export default function Trihedron() {
  const [mode, setMode] = useState(1);
  const [sel, setSel] = useState("hs");
  const it = sel && ITEMS[sel];
  return <div className="card" style={{ display: "grid", gap: 14 }}>
    <div className="seg">
      <button className={mode === 0 ? "on" : ""} onClick={() => setMode(0)}>古典时代：平面表</button>
      <button className={mode === 1 ? "on" : ""} onClick={() => setMode(1)}>现代：三面体</button>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18, alignItems: "center" }}>
      {mode === 0 ? <Classical /> : <Modern sel={sel} setSel={setSel} />}
      <div>
        {mode === 0 ? <>
          <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>一切知识都在同一张表上</div>
          <p>古典时代的知识场是<b>完全均质</b>的：从 <i>mathesis</i> 的普遍秩序理想，到分类学、自然史、普遍语法、财富分析，乃至日常交换和说话，都在用同一个动作工作：通过建立差异来排序，再用秩序来界定差异。</p>
          <p style={{ color: "var(--muted)" }}>19 世纪起这张表「炸开」了。切到「现代」看它变成了什么。</p>
        </> : it && <>
          <div style={{ fontFamily: "var(--serif)", fontSize: 22, color: it.color }}>{it.title}</div>
          {it.body.split("\n\n").map((t, i) => <p key={i} style={{ margin: "8px 0" }}>{t}</p>)}
          {it.hs && <p style={{ margin: "8px 0", padding: "10px 12px", background: "var(--paper)", borderRadius: 10, fontSize: 15 }}>🌫️ {it.hs}</p>}
          {sel === "hs" && <p style={{ fontSize: 15, color: "var(--muted)" }}>相关概念：<C id="trihedron">知识三面体</C> · <C id="anthropologism">人类学化</C></p>}
        </>}
      </div>
    </div>
  </div>;
}
