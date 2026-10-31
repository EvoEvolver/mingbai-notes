// 第 7 章专属图解 (c)：原国家 Urstaat。常见的「渐进演化」直觉 vs 德勒兹-加塔利的「一下子出现 · 潜伏 · 回归」。曲线为示意，非数据。
import { useState } from "react";

const RED = "#9b2c1f", BLUE = "#2c4a6e", INK = "#1f1b16", MUTED = "#8a8174";
const X = ["原始社会", "原国家", "古代城邦", "封建", "绝对君主制", "现代国家", "民主国家"];
const xs = X.map((_, i) => 60 + i * 86);

const VIEWS = [
  {
    label: "常见直觉：国家一步步演化出来",
    text: "很多教科书式的叙事把国家当作逐渐长出来的东西：部落 → 酋邦 → 早期国家 → ……越来越复杂、越来越「进步」。马克思主义的「五阶段论」也把每一种形态并排放在同一条演化线上。",
  },
  {
    label: "德勒兹-加塔利：原国家一下子出现",
    text: "原国家不是演化中的一个台阶，而是「全副武装」地一下子出现，像从奠基者脑子里蹦出来的一个抽象理念（超编码的统一体）。之后它会被私有财产与商品「打入潜伏」，但每一种后来的国家都在模仿它、在新的条件下让它回归，而且越来越「具体」、越来越冷、越伪善。",
  },
];

export default function Urstaat() {
  const [v, setV] = useState(1);
  const yRamp = i => 250 - i * 30;
  const ramp = xs.map((x, i) => `${x},${yRamp(i)}`).join(" ");
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg">{VIEWS.map((x, j) => <button key={j} className={v === j ? "on" : ""} onClick={() => setV(j)}>{x.label}</button>)}</div>
      <svg key={v} viewBox="0 0 640 320" style={{ width: "100%", maxHeight: 360, background: "var(--paper)", borderRadius: 14 }}>
        <line x1="40" y1="270" x2="620" y2="270" stroke={INK} opacity=".4" />
        <text x="620" y="290" textAnchor="end" fontSize="11" fill={MUTED}>历史 →（非等距，示意）</text>
        <text x="40" y="22" fontSize="11" fill={MUTED}>{v ? "「国家」作为超编码统一体的在场强度（示意）" : "「国家化」程度（示意）"}</text>
        {X.map((t, i) => <text key={i} x={xs[i]} y="306" textAnchor="middle" fontSize="10.5" fill={INK}>{t}</text>)}
        {v === 0 && <>
          <polyline points={ramp} fill="none" stroke={BLUE} strokeWidth="3" strokeDasharray="600" strokeDashoffset="600">
            <animate attributeName="stroke-dashoffset" from="600" to="0" dur="1.6s" fill="freeze" />
          </polyline>
          {xs.map((x, i) => <circle key={i} cx={x} cy={yRamp(i)} r="5" fill={BLUE} />)}
          <text x="330" y="120" fontSize="13" fill={BLUE}>一级一级往上爬</text>
        </>}
        {v === 1 && <>
          {/* 原始：几乎为零，但「驱魔」着可能的君主 */}
          <line x1={xs[0]} y1="255" x2={xs[1] - 4} y2="255" stroke={RED} strokeWidth="3" />
          {/* 一下子出现 */}
          <line x1={xs[1]} y1="255" x2={xs[1]} y2="40" stroke={RED} strokeWidth="5">
            <animate attributeName="y2" from="255" to="40" dur=".35s" fill="freeze" />
          </line>
          <text x={xs[1] + 10} y="48" fontSize="13" fill={RED} fontWeight="bold">全副武装，一下子出现</text>
          {/* 潜伏的抽象：虚线，始终高悬 */}
          <line x1={xs[1]} y1="40" x2="610" y2="40" stroke={RED} strokeDasharray="5 6" opacity=".55" />
          <text x="610" y="34" textAnchor="end" fontSize="11" fill={RED}>原国家：作为抽象、作为「地平线」一直在</text>
          {/* 具体存在：潜伏后反复回归，逐渐「具体化」 */}
          <polyline points={`${xs[1]},40 ${xs[2]},200 ${xs[3]},170 ${xs[4]},95 ${xs[5]},120 ${xs[6]},135`} fill="none" stroke={BLUE} strokeWidth="3" strokeDasharray="700" strokeDashoffset="700">
            <animate attributeName="stroke-dashoffset" from="700" to="0" dur="2s" begin=".3s" fill="freeze" />
          </polyline>
          {[[2, 200, "潜伏：私有财产、商品", 22], [4, 95, "专制者以绝对君主回归", -14], [6, 135, "更冷、更会算的专制者", 22]].map(([i, y, t, dy], k) =>
            <g key={k}><circle cx={xs[i]} cy={y} r="5" fill={BLUE} /><text x={xs[i]} y={y + dy} textAnchor="middle" fontSize="11" fill={BLUE}>{t}</text></g>)}
          <text x="48" y="222" fontSize="11" fill={RED}>原始社会：</text>
          <text x="48" y="237" fontSize="11" fill={RED}>提防内部长出君主</text>
          <text x="430" y="252" fontSize="11" fill={BLUE} textAnchor="middle">蓝线 = 国家的具体形态：逐渐从超编码者变为被阶级与解码流塑造的协调者</text>
        </>}
      </svg>
      <p style={{ margin: 0 }}>{VIEWS[v].text}</p>
    </div>);
}
