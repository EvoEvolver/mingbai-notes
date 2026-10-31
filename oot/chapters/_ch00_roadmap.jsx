// 前言专属图解 ②：全书地图——三个知识型、两次断裂、三个知识领域
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16";

const ERAS = [
  {
    id: "ren", name: "文艺复兴", years: "16 世纪", color: GOLD, rule: "相似",
    gist: "世界是一本写满记号的书；认识 = 读出万物之间的相似。",
    detail: "知识靠相似把万物缝在一起：草药的形状暗示它的疗效，读古书和观察自然是同一件事。语言本身也是世界里的一件物，需要被无尽地评注。",
    chapters: [["ch02", "第 2 章 世界的散文"]],
  },
  {
    id: "cla", name: "古典时代", years: "17 世纪中叶 – 18 世纪末", color: BLUE, rule: "表征与表格",
    gist: "词与物分离；认识 = 用符号表征事物，按同一与差异排进一张有序的表。",
    detail: "前言着重讲的就是这一段：表征理论把语言、自然秩序、财富与价值三门学问统一在一起。林奈的分类表与同时代的普通语法、财富分析，比和后来的生物学更像亲兄弟。",
    chapters: [["ch01", "第 1 章 宫娥"], ["ch03", "第 3 章 表征"], ["ch04", "第 4 章 言说"], ["ch05", "第 5 章 分类"], ["ch06", "第 6 章 交换"]],
  },
  {
    id: "mod", name: "现代", years: "19 世纪初 – 今天", color: RED, rule: "历史性与「人」",
    gist: "表征不再是一切秩序的根基；事物有了自己的深度与历史，「人」第一次成为知识对象。",
    detail: "生产取代交换，有机体取代分类特征，语言变成有自己过去的历史形式。正是在这里，「人」作为一个知识形象登场，人文科学随之出现。我们至今还没走出这道门槛。",
    chapters: [["ch07", "第 7 章 表征的界限"], ["ch08", "第 8 章 劳动、生命、语言"], ["ch09", "第 9 章 人及其复本"], ["ch10", "第 10 章 人文科学"]],
  },
];

const ROWS = [
  { id: "lang", label: "语言", icon: "🗣️", cells: ["语言是世界上的记号，需要评注", "普通语法：语言即表征的分析", "语文学：语言有自己的历史"] },
  { id: "life", label: "生命", icon: "🌿", cells: ["博物「志」：观察、传说、寓意并置", "博物学：按可见特征排进分类表", "生物学：有机体与生命功能"] },
  { id: "wealth", label: "财富", icon: "🪙", cells: ["货币的价值在于金属本身", "财富分析：货币表征财富", "政治经济学：劳动与生产"] },
];

const X0 = 110, CW = 190, Y0 = 92, RH = 62;

export default function Roadmap() {
  const [view, setView] = useState("arch");
  const [era, setEra] = useState(1);
  const e = ERAS[era];
  return <div className="card" style={{ display: "grid", gap: 14 }}>
    <div className="seg" style={{ marginBottom: 0 }}>
      <button className={view === "idea" ? "on" : ""} onClick={() => setView("idea")}>📈 观念史的读法</button>
      <button className={view === "arch" ? "on" : ""} onClick={() => setView("arch")}>⛏️ 考古学的读法</button>
    </div>
    <svg viewBox="0 0 690 300" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
      {/* 时代列 */}
      {ERAS.map((er, j) => {
        const x = X0 + j * CW, on = view === "arch" && era === j;
        return <g key={er.id} style={{ cursor: "pointer" }} onClick={() => setEra(j)}>
          <rect x={x + 6} y={14} width={CW - 12} height={276} rx={14}
            fill={view === "arch" ? er.color + (on ? "2a" : "12") : "transparent"}
            stroke={on ? er.color : "transparent"} strokeWidth="2" style={{ transition: ".3s" }} />
          <text x={x + CW / 2} y={40} textAnchor="middle" fontSize="17" fontWeight="700" fill={er.color} fontFamily="var(--serif)">{er.name}</text>
          <text x={x + CW / 2} y={60} textAnchor="middle" fontSize="11.5" fill="var(--muted)">{er.years}</text>
          <text x={x + CW / 2} y={80} textAnchor="middle" fontSize="12.5" fill={INK} fontWeight="600">{view === "arch" ? "▸ " + er.rule : ""}</text>
        </g>;
      })}
      {/* 行标签 */}
      {ROWS.map((r, i) => <g key={r.id}>
        <text x={14} y={Y0 + i * RH + 34} fontSize="15" fill={INK}>{r.icon} {r.label}</text>
      </g>)}
      {/* 观念史：横向连续的箭头 */}
      {view === "idea" && ROWS.map((r, i) => {
        const y = Y0 + i * RH + 31;
        return <g key={"a" + i}>
          <line x1={X0 + 8} y1={y} x2={X0 + 3 * CW - 4} y2={y} stroke={GREEN} strokeWidth="4" opacity=".55" strokeDasharray="12 8">
            <animate attributeName="stroke-dashoffset" values="40;0" dur="1.2s" repeatCount="indefinite" />
          </line>
          <polygon points={`${X0 + 3 * CW - 4},${y - 7} ${X0 + 3 * CW + 8},${y} ${X0 + 3 * CW - 4},${y + 7}`} fill={GREEN} opacity=".7" />
        </g>;
      })}
      {/* 单元格 */}
      {ROWS.map((r, i) => r.cells.map((c, j) => {
        const x = X0 + j * CW + 14, y = Y0 + i * RH + 8;
        return <g key={r.id + j} style={{ cursor: "pointer" }} onClick={() => setEra(j)}>
          <rect x={x} y={y} width={CW - 28} height={RH - 14} rx={9} fill="var(--card)" stroke="var(--line)" />
          <foreignObject x={x + 4} y={y + 3} width={CW - 36} height={RH - 20}>
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: 11.5, lineHeight: 1.35, color: INK, display: "flex", alignItems: "center", height: "100%", justifyContent: "center", textAlign: "center" }}>{c}</div>
          </foreignObject>
        </g>;
      }))}
      {/* 考古学：两道断裂 */}
      {view === "arch" && [1, 2].map(k => {
        const x = X0 + k * CW, pts = [];
        for (let y = 14; y <= 290; y += 14) pts.push(`${x + ((y / 14) % 2 ? 5 : -5)},${y}`);
        return <g key={"b" + k}>
          <polyline points={pts.join(" ")} fill="none" stroke={INK} strokeWidth="2.5">
            <animate attributeName="opacity" values=".35;1;.35" dur="2.2s" repeatCount="indefinite" />
          </polyline>
        </g>;
      })}
    </svg>
    {view === "idea" ? <p style={{ margin: 0 }}>
      我们习惯这样读历史：每门学问沿着自己那一行，<b style={{ color: GREEN }}>一路进步</b>——林奈的分类到今天还有点用，Port-Royal 的语法离我们也不远，凯恩斯也承认自己和 18 世纪经济学家的分析相近。
      福柯说：这种「准连续」只是<b>观念表面的印象</b>。切换到「考古学的读法」看看。
    </p> : <div style={{ display: "grid", gap: 8 }}>
      <p style={{ margin: 0 }}>
        考古学竖着读：同一时代的三门学问共享一套<C id="episteme">知识型</C>，彼此<b>横向同构</b>；时代之间隔着<C id="discontinuity">断裂</C>。所以林奈的博物学该去和同时代的语法、货币分析比，而不是和居维叶、达尔文比。点一列看详情：
      </p>
      <div style={{ borderLeft: `4px solid ${e.color}`, paddingLeft: 14 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20, color: e.color }}>{e.name} · {e.rule}</div>
        <p style={{ margin: "4px 0", fontWeight: 600 }}>{e.gist}</p>
        <p style={{ margin: "4px 0" }}>{e.detail}</p>
        <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>📚 对应：{e.chapters.map(([id, t], i) => <span key={id}>{i ? " · " : ""}<a href={"#/" + id}>{t}</a></span>)}</p>
      </div>
    </div>}
    <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>
      注：前言只直接点名了两次断裂（约 17 世纪中叶、19 世纪初）并详谈古典与现代；文艺复兴一列与各格内容取自全书相应章节，用来给你一张进入全书的地图。
    </p>
  </div>;
}
