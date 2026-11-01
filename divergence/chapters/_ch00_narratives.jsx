// 导论专属图解 (b)：两种叙事 —— 欧洲何时「分流」？（纯示意曲线）
import { useState } from "react";

const EU = "var(--blue)", CN = "var(--accent)";
const X0 = 70, X1 = 800, Y0 = 290, Y1 = 40;
const xOf = yr => X0 + (yr - 1500) / 400 * (X1 - X0);
const yOf = v => Y0 - v * (Y0 - Y1);
const line = (f) => {
  const pts = [];
  for (let yr = 1500; yr <= 1900; yr += 5) pts.push(`${xOf(yr).toFixed(1)},${yOf(f(yr)).toFixed(1)}`);
  return "M" + pts.join("L");
};
const sm = (t) => t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);

const STORIES = [
  {
    key: "euro", label: "欧洲中心论的叙事",
    eu: yr => 0.18 + 0.25 * (yr - 1500) / 300 + (yr > 1800 ? 0.3 * sm((yr - 1800) / 100) : 0),
    cn: yr => 0.18 + 0.02 * (yr - 1500) / 400 - (yr > 1780 ? 0.05 * sm((yr - 1780) / 120) : 0),
    notes: [
      { yr: 1510, v: 0.5, a: "start", t: "欧洲：晚婚、生育控制、资本积累、更好的市场与产权……", col: EU },
      { yr: 1650, v: 0.1, t: "亚洲：人口吞噬增长，「停滞」", col: CN },
    ],
    shade: [1500, 1800, "1800 年前已经拉开差距"],
    claim: "欧洲在 16-18 世纪就因人口模式、资本、制度或文化内生地领先；工业革命只是早已开始的分叉的延续，海外扩张是领先的结果而非原因。",
  },
  {
    key: "pom", label: "彭慕兰的叙事",
    eu: yr => 0.2 + 0.1 * sm((yr - 1500) / 250) + (yr > 1790 ? 0.6 * sm((yr - 1790) / 110) : 0),
    cn: yr => 0.2 + 0.1 * sm((yr - 1500) / 250) + 0.006 * Math.sin((yr - 1500) / 40) - (yr > 1780 ? 0.06 * sm((yr - 1780) / 120) : 0),
    notes: [
      { yr: 1510, v: 0.42, a: "start", t: "各核心区大致并行，也共同撞上土地与燃料的天花板", col: "var(--ink)" },
      { yr: 1828, v: 0.62, a: "end", t: "煤 + 美洲 →", col: EU },
      { yr: 1890, v: 0.1, a: "end", t: "约 1780 年后江南越来越难从外围换到粮食与木材", col: CN },
    ],
    shade: [1750, 1800, "约 1750-1800"],
    claim: "直到约 1750 年（甚至接近 1800 年），欧亚多个核心区大致并行；19 世纪的急剧分流是需要解释的「断裂」，来自位置便利的煤和靠暴力、奴隶制、疾病获得的美洲资源。",
  },
];

export default function TwoNarratives() {
  const [i, setI] = useState(1);
  const s = STORIES[i];
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{STORIES.map((x, j) =>
        <button key={x.key} className={i === j ? "on" : ""} onClick={() => setI(j)}>{x.label}</button>)}</div>
      <svg viewBox="0 0 830 340" style={{ width: "100%", background: "var(--paper)", borderRadius: 14, display: "block" }}>
        <rect x={xOf(s.shade[0])} y={Y1 - 10} width={xOf(s.shade[1]) - xOf(s.shade[0])} height={Y0 - Y1 + 10} fill="var(--gold)" opacity=".12" />
        <text x={(xOf(s.shade[0]) + xOf(s.shade[1])) / 2} y={Y1 - 16} fontSize="12" textAnchor="middle" fill="var(--gold)">{s.shade[2]}</text>
        <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="var(--ink)" strokeOpacity=".5" />
        <line x1={X0} y1={Y0} x2={X0} y2={Y1 - 10} stroke="var(--ink)" strokeOpacity=".5" />
        {[1500, 1600, 1700, 1750, 1800, 1900].map(yr => <g key={yr}>
          <line x1={xOf(yr)} y1={Y0} x2={xOf(yr)} y2={Y0 + 5} stroke="var(--ink)" strokeOpacity=".5" />
          <text x={xOf(yr)} y={Y0 + 20} fontSize="12" textAnchor="middle" fill="var(--muted)">{yr}</text>
        </g>)}
        <text x={X0 - 10} y={Y1 + 4} fontSize="12" textAnchor="end" fill="var(--muted)">高</text>
        <text x={X0 - 10} y={Y0 - 2} fontSize="12" textAnchor="end" fill="var(--muted)">低</text>
        <text x="22" y={(Y0 + Y1) / 2} fontSize="12" fill="var(--muted)" textAnchor="middle" transform={`rotate(-90 22 ${(Y0 + Y1) / 2})`}>人均经济水平（示意）</text>
        <path key={s.key + "e"} d={line(s.eu)} fill="none" stroke={EU} strokeWidth="3.5" strokeDasharray="1400" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" from="1400" to="0" dur="1.4s" fill="freeze" />
        </path>
        <path key={s.key + "c"} d={line(s.cn)} fill="none" stroke={CN} strokeWidth="3.5" strokeDasharray="1400" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" from="1400" to="0" dur="1.4s" fill="freeze" />
        </path>
        <text x={X1 + 4} y={yOf(s.eu(1900)) + 4} fontSize="13" fill={EU} fontWeight="700" textAnchor="end" dy="-10">西北欧 / 英格兰</text>
        <text x={X1 + 4} y={yOf(s.cn(1900)) + 4} fontSize="13" fill={CN} fontWeight="700" textAnchor="end" dy="-10">中国 / 江南</text>
        {s.notes.map((n, k) => <text key={s.key + k} x={xOf(n.yr)} y={yOf(n.v)} fontSize="12.5" fill={n.col} textAnchor={n.a || "middle"} style={{ paintOrder: "stroke", stroke: "var(--paper)", strokeWidth: 4 }}>{n.t}</text>)}
        <text x={X0 + 6} y="18" fontSize="11" fill="var(--muted)">示意曲线 · 不是实测数据</text>
      </svg>
      <p style={{ margin: 0 }}><b style={{ color: i ? "var(--green)" : "var(--accent)" }}>{s.label}：</b>{s.claim}</p>
    </div>);
}
