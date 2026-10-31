// 全书脉络 · 总览图：三个知识型 × 两次断裂，章节方块可点击跳转
import { useState } from "react";
import { modules, book, chapterLabel } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#6b6257";
const X = y => 100 + (y - 1500) * 1.8;              // 年份 → x
const R1 = X(1650), R2 = X(1800);

const ERAS = [
  { x1: X(1500), x2: R1, c: GOLD, name: "文艺复兴", form: "知识的形式：相似" },
  { x1: R1, x2: R2, c: BLUE, name: "古典时代", form: "知识的形式：表征与秩序（表格）" },
  { x1: R2, x2: X(1950), c: RED, name: "现代", form: "知识的形式：历史与「人」" },
];
const LANES = [
  { y: 100, h: 56, label: "表征 / 人" },
  { y: 176, h: 40, label: "语言", c: VIOLET },
  { y: 228, h: 40, label: "自然 / 生命", c: GREEN },
  { y: 280, h: 40, label: "财富 / 劳动", c: GOLD },
];
// 章节方块：[id, x, y, w, h, 第一行, 第二行]
const BOXES = [
  ["ch02", X(1520), 176, X(1640) - X(1520), 144, "02 世界的散文", "相似 · 标记 · 语言即物"],
  ["ch03", R1 - 66, 100, 132, 56, "03 表征", "相似 → 符号与表格"],
  ["ch01", X(1690), 100, 130, 56, "01 宫娥", "古典表征的自画像"],
  ["ch04", X(1662), 176, X(1778) - X(1662), 40, "04 言说", "普遍语法"],
  ["ch05", X(1662), 228, X(1778) - X(1662), 40, "05 分类", "博物学"],
  ["ch06", X(1662), 280, X(1778) - X(1662), 40, "06 交换", "财富分析"],
  ["ch07", R2 - 32, 176, 64, 144, "07", "表征的界限"],
  ["ch08", X(1825), 176, X(1945) - X(1825), 144, "08 劳动、生命、语言", ""],
  ["ch09", 678, 100, 110, 56, "09 人及其复本", "有限性 · 复本"],
  ["ch10", 796, 100, 114, 56, "10 人文科学", "三面体 · 人之死"],
];
const SUB08 = [["→ 语文学", 210], ["→ 生物学", 252], ["→ 政治经济学", 304]];

const zig = x => { let d = `M${x} 64`; for (let y = 64; y < 344; y += 20) d += ` L${x + (((y - 64) / 20) % 2 ? -7 : 7)} ${y + 20}`; return d; };

export default function Overview() {
  const [hov, setHov] = useState(null);
  const go = id => { location.hash = "#/" + id; };
  const info = id => {
    if (id === "ch00") return { label: "前言", one: modules.ch00?.meta?.one_liner };
    const c = book.chapters.find(x => x.id === id);
    return { label: chapterLabel(c), one: modules[id]?.meta?.one_liner };
  };
  const cur = hov && info(hov);
  const box = ([id, x, y, w, h, t1, t2]) => {
    const on = hov === id;
    return <g key={id} style={{ cursor: "pointer" }} onMouseEnter={() => setHov(id)} onMouseLeave={() => setHov(null)} onClick={() => go(id)}>
      <rect x={x} y={y} width={w} height={h} rx="9" fill={on ? "#fffaf0" : "#fbf6ec"} stroke={on ? RED : "#c9b99c"} strokeWidth={on ? 2.5 : 1.3} style={{ transition: ".2s" }} />
      {id === "ch07"
        ? <><text x={x + w / 2} y={y + 40} textAnchor="middle" fontSize="20" fontWeight="700" fill={RED}>07</text>
          {"表征的界限".split("").map((ch, i) => <text key={i} x={x + w / 2} y={y + 66 + i * 16} textAnchor="middle" fontSize="13" fill={INK}>{ch}</text>)}</>
        : <><text x={x + w / 2} y={y + (id === "ch08" ? 15 : h > 50 ? 24 : 17)} textAnchor="middle" fontSize={id === "ch08" ? 12.5 : 13.5} fontWeight="700" fill={INK}>{t1}</text>
          {t2 && <text x={x + w / 2} y={y + (h > 100 ? 80 : h > 50 ? 43 : 33)} textAnchor="middle" fontSize="11.5" fill={MUTED}>{t2}</text>}</>}
      {id === "ch08" && SUB08.map(([s, yy]) => <text key={s} x={x + w / 2} y={yy} textAnchor="middle" fontSize="12" fill={MUTED}>{s}</text>)}
    </g>;
  };
  return <div className="card" style={{ padding: 14 }}>
    <svg viewBox="0 0 960 430" style={{ width: "100%", display: "block" }}>
      {/* 前言横条 */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHov("ch00")} onMouseLeave={() => setHov(null)} onClick={() => go("ch00")}>
        <rect x={X(1500)} y="12" width={X(1950) - X(1500)} height="34" rx="9" fill={hov === "ch00" ? "#fffaf0" : "#f3ecdf"} stroke={hov === "ch00" ? RED : "#c9b99c"} strokeWidth={hov === "ch00" ? 2.5 : 1.3} />
        <text x={(X(1500) + X(1950)) / 2} y="34" textAnchor="middle" fontSize="13.5" fill={INK}><tspan fontWeight="700">00 前言</tspan> · 考古学的视角：一部「中国百科全书」照出我们分类方式的历史；预告两次断裂与「人」的发明</text>
      </g>
      {/* 时代色带 */}
      {ERAS.map(e => <g key={e.name}>
        <rect x={e.x1} y="58" width={e.x2 - e.x1} height="290" fill={e.c} opacity=".07" />
        <text x={(e.x1 + e.x2) / 2} y="78" textAnchor="middle" fontSize="15" fontWeight="700" fill={e.c}>{e.name}</text>
        <text x={(e.x1 + e.x2) / 2} y="94" textAnchor="middle" fontSize="11.5" fill={MUTED}>{e.form}</text>
      </g>)}
      {/* 泳道 */}
      {LANES.map(l => <g key={l.label}>
        <line x1={X(1500)} x2={X(1950)} y1={l.y + l.h / 2} y2={l.y + l.h / 2} stroke={l.c || "#c9b99c"} strokeWidth="1.5" strokeDasharray="3 6" opacity=".55" />
        <text x={X(1500) - 6} y={l.y + l.h / 2 + 4} textAnchor="end" fontSize="11.5" fill={l.c || MUTED} fontWeight="600">{l.label}</text>
      </g>)}
      {/* 断裂线 */}
      {[[R1, "约 1650 · 第一次断裂", "相似 → 表征"], [R2, "约 1775–1825 · 第二次断裂", "表征 → 历史"]].map(([x, t, s]) => <g key={x}>
        <path d={zig(x)} fill="none" stroke={RED} strokeWidth="2.4" opacity=".85">
          <animate attributeName="opacity" values=".85;.35;.85" dur="2.6s" repeatCount="indefinite" />
        </path>
        <text x={x} y="366" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={RED}>⚡ {t}</text>
        <text x={x} y="382" textAnchor="middle" fontSize="11.5" fill={MUTED}>{s}</text>
      </g>)}
      {BOXES.map(box)}
      {/* 时间轴 */}
      <line x1={X(1500)} x2={X(1950)} y1="402" y2="402" stroke={MUTED} />
      {[1500, 1600, 1700, 1800, 1900].map(y => <g key={y}>
        <line x1={X(y)} x2={X(y)} y1="398" y2="406" stroke={MUTED} />
        <text x={X(y)} y="422" textAnchor="middle" fontSize="11" fill={MUTED}>{y}</text>
      </g>)}
    </svg>
    <div style={{ minHeight: 52, padding: "6px 10px", borderTop: "1px solid var(--line)", fontSize: 15 }}>
      {cur ? <><b>{cur.label}</b>：{cur.one} <span style={{ color: "var(--muted)" }}>（点击进入）</span></>
        : <span style={{ color: "var(--muted)" }}>把鼠标移到任一章节方块上看它的一句话主旨；点击跳到该章。第 3 章和第 7 章正好骑在两条断裂线上。</span>}
    </div>
  </div>;
}
