// 交互：表 4.3 的"氧化还原阶梯"。勾选烧杯里有什么，看谁被氧化（溶解）、谁被还原（镀出）。
import { useState } from "react";
import { M } from "@kit";

const R = String.raw;
// [id, 显示, 电位 V, 类别]；类别 metal=待清除金属，si=硅片，ox=可加入的氧化剂
const L = [
  ["Mn", R`\mathrm{Mn^{2+}/Mn}`, 1.05, "metal"], ["Si", R`\mathrm{SiO_2/Si}`, 0.84, "si"], ["Cr", R`\mathrm{Cr^{3+}/Cr}`, 0.71, "metal"],
  ["Ni", R`\mathrm{Ni^{2+}/Ni}`, 0.25, "metal"], ["Fe", R`\mathrm{Fe^{3+}/Fe}`, 0.17, "metal"], ["H2SO4", R`\mathrm{H_2SO_4/H_2SO_3}`, -0.2, "ox"],
  ["Cu", R`\mathrm{Cu^{2+}/Cu}`, -0.34, "metal"], ["O2", R`\mathrm{O_2/H_2O}`, -1.23, "ox"], ["Au", R`\mathrm{Au^{3+}/Au}`, -1.42, "metal"],
  ["H2O2", R`\mathrm{H_2O_2/H_2O}`, -1.78, "ox"], ["O3", R`\mathrm{O_3/O_2}`, -2.07, "ox"],
];

const S = ({ c }) => <tspan baselineShift="sub" fontSize="0.75em">{c}</tspan>;
const LAB = { H2SO4: <>H<S c="2" />SO<S c="4" /></>, O2: <>O<S c="2" /></>, H2O2: <>H<S c="2" />O<S c="2" /></>, O3: <>O<S c="3" /></>, Si: <>Si（硅片）</> };

export function RedoxLadder() {
  const [on, setOn] = useState({ Si: true, Fe: true, Cu: true });
  const present = L.filter(([id]) => on[id]);
  const strongest = present.length ? present.reduce((a, b) => (b[2] < a[2] ? b : a)) : null;
  const Y = v => 20 + (1.15 - v) * 95;
  return <div className="card" style={{ padding: 12 }}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
      {L.map(([id, tex, , k]) => <label key={id} style={{ border: "1px solid #ccc", borderRadius: 6, padding: "2px 8px", background: on[id] ? (k === "ox" ? "#e3f1fa" : k === "si" ? "#eee" : "#fdf0e0") : "#fff", cursor: "pointer" }}>
        <input type="checkbox" checked={!!on[id]} onChange={e => setOn({ ...on, [id]: e.target.checked })} /> <M>{tex}</M></label>)}
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "flex-start" }}>
      <svg viewBox="0 0 330 330" style={{ width: "100%", maxWidth: 330 }} role="img" aria-label="氧化电位阶梯">
        <line x1="60" y1="10" x2="60" y2="320" stroke="#333" />
        <text x="8" y="16" fontSize="11">弱氧化剂</text><text x="8" y="326" fontSize="11">强氧化剂</text>
        {L.map(([id, , v, k]) => { const y = Y(v), act = on[id], isS = strongest && strongest[0] === id;
          const dir = !act ? "" : isS ? "← 被还原（夺电子）" : "→ 被氧化（溶解/成膜）";
          return <g key={id} opacity={act ? 1 : 0.3}>
            <line x1="55" x2="65" y1={y} y2={y} stroke="#333" /><text x="50" y={y + 4} textAnchor="end" fontSize="10.5">{v.toFixed(2)}</text>
            <rect x="72" y={y - 10} width="100" height="20" rx="4" fill={k === "ox" ? "#bfe0f2" : k === "si" ? "#c9c9c9" : "#f2d79a"} stroke={isS ? "#c0392b" : "#777"} strokeWidth={isS ? 2 : 1} />
            <text x="122" y={y + 4} textAnchor="middle" fontSize="11">{LAB[id] || id}</text>
            <text x="178" y={y + 4} fontSize="10.5" fill={isS ? "#c0392b" : "#2c6e49"}>{dir}</text></g>; })}
      </svg>
      <div style={{ flex: "1 1 240px", fontSize: 14, lineHeight: 1.7 }}>
        {!strongest ? "请至少勾选一种物质。" : <>
          <p>烧杯中最强的氧化剂是 <b><M>{strongest[1]}</M></b>：它的反应向左进行、夺走电子，其余所有反应被迫向右。</p>
          {on.Si && strongest[0] !== "Si" && <p>硅片表面被氧化，生成一层（化学）氧化膜。</p>}
          {strongest[3] === "metal" && <p style={{ color: "#c0392b" }}>糟糕：最强的"氧化剂"是金属离子本身——<b>它会被还原、镀回硅片上</b>。这正是只用纯水清洗时 Fe、Cu、Au 等会反镀的原因。</p>}
          {strongest[3] === "ox" && L.filter(([id, , , k]) => on[id] && k === "metal").length > 0 && <p style={{ color: "#2c6e49" }}>所勾选的金属都被氧化成离子、留在溶液中——<b>被清洗掉</b>。{strongest[0] === "H2O2" || strongest[0] === "O3" ? "这就是 RCA（双氧水）与臭氧清洗的化学原理。" : "试着再勾选 Au：它比这种氧化剂更“贵”，会反过来被还原。"}</p>}
          <p className="muted" style={{ fontSize: 12.5 }}>数值取自表 4.3（相对标准氢电极，越负氧化性越强）。这里只比较热力学驱动力；实际速率还取决于络合、pH 与温度。</p>
        </>}
      </div>
    </div>
  </div>;
}
