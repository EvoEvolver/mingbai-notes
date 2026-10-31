// 第 2 章专属图解：四种相似性的动画示意（SVG + SMIL 动画）
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16";

const MODES = [
  {
    id: "convenientia", icon: "🔗", name: "适合", en: "Convenientia",
    rule: "挨着 → 相像", text: "两样东西因为空间上挨在一起，边缘交融、性质互相传递，于是变得相像。整个世界因此连成一条链：碰一端，全链都颤动。",
    eg: "苔藓长在贝壳上、植物长在鹿角上——挨着的东西彼此「感染」。",
    svg: () => <>
      {[0, 1, 2, 3, 4, 5].map(i => <circle key={i} cx={70 + i * 72} cy={110} r={40} fill="none" stroke={RED} strokeWidth="5" opacity=".85">
        <animate attributeName="cy" values="110;96;110" dur="1.6s" begin={`${i * .18}s`} repeatCount="indefinite" />
      </circle>)}
      <text x="70" y="190" textAnchor="middle" fontSize="14" fill={INK}>上帝</text>
      <text x="430" y="190" textAnchor="middle" fontSize="14" fill={INK}>最微小的物</text>
    </>,
  },
  {
    id: "aemulatio", icon: "🪞", name: "仿效", en: "Aemulatio",
    rule: "隔空 → 互映", text: "摆脱了位置限制的「适合」：相隔遥远的东西像镜子两侧一样互相映照、彼此竞争，分不清谁是原本、谁是影子。",
    eg: "人脸隔空模仿天空：两只眼睛对应日月。",
    svg: () => <>
      <line x1="250" y1="20" x2="250" y2="200" stroke={INK} strokeDasharray="6 6" opacity=".4" />
      <text x="250" y="16" textAnchor="middle" fontSize="12" fill={INK} opacity=".6">镜面</text>
      {[1, 2, 3].map(k => <circle key={"l" + k} cx="130" cy="110" r={k * 24} fill="none" stroke={GOLD} strokeWidth="2" opacity={.9 - k * .2}>
        <animate attributeName="r" values={`${k * 24};${k * 24 + 8};${k * 24}`} dur="2.4s" repeatCount="indefinite" /></circle>)}
      {[1, 2, 3].map(k => <circle key={"r" + k} cx="370" cy="110" r={k * 24} fill="none" stroke={GOLD} strokeWidth="2" opacity={.9 - k * .2}>
        <animate attributeName="r" values={`${k * 24 + 8};${k * 24};${k * 24 + 8}`} dur="2.4s" repeatCount="indefinite" /></circle>)}
      <text x="130" y="118" textAnchor="middle" fontSize="26">🙂</text>
      <text x="370" y="118" textAnchor="middle" fontSize="26">🌌</text>
    </>,
  },
  {
    id: "analogy", icon: "⚖️", name: "类推", en: "Analogy",
    rule: "关系 ≈ 关系", text: "不比较东西本身，而比较「关系」：A 之于 B，如同 C 之于 D。它能连接任何事物，而人站在所有类推的中心支点上。",
    eg: "植物是倒立的动物：根之于植物，如同嘴之于动物。",
    svg: () => <>
      <text x="60" y="80" fontSize="30">🌱</text><text x="60" y="160" fontSize="30">🫚</text>
      <line x1="78" y1="90" x2="78" y2="130" stroke={BLUE} strokeWidth="3" />
      <text x="105" y="118" fontSize="14" fill={BLUE}>根之于植物</text>
      <text x="250" y="122" textAnchor="middle" fontSize="40" fill={INK}>≈
        <animate attributeName="opacity" values="1;.3;1" dur="1.8s" repeatCount="indefinite" /></text>
      <text x="340" y="80" fontSize="30">🐄</text><text x="340" y="160" fontSize="30">👄</text>
      <line x1="358" y1="90" x2="358" y2="130" stroke={BLUE} strokeWidth="3" />
      <text x="385" y="118" fontSize="14" fill={BLUE}>嘴之于动物</text>
    </>,
  },
  {
    id: "sympathy_antipathy", icon: "🧲", name: "同感 / 反感", en: "Sympathy / Antipathy",
    rule: "相吸 ⇄ 相斥", text: "同感让万物互相吸引、趋同，若无约束会把世界化为一团；反感让每物守住本性、彼此保持距离。两股力的拉锯撑起了前三种相似。",
    eg: "向日葵追随太阳（同感）；橄榄与葡萄「讨厌」卷心菜（反感）。",
    svg: () => <>
      <circle cx="160" cy="110" r="26" fill={RED}><animate attributeName="cx" values="120;215;120" dur="2.6s" repeatCount="indefinite" /></circle>
      <circle cx="340" cy="110" r="26" fill={BLUE}><animate attributeName="cx" values="380;285;380" dur="2.6s" repeatCount="indefinite" /></circle>
      <text x="250" y="45" textAnchor="middle" fontSize="13" fill={RED}>同感：拉近、同化</text>
      <text x="250" y="190" textAnchor="middle" fontSize="13" fill={BLUE}>反感：推开、守住自身</text>
    </>,
  },
];

export default function FourSimilitudes() {
  const [i, setI] = useState(0), m = MODES[i];
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg">{MODES.map((x, j) =>
        <button key={x.id} className={i === j ? "on" : ""} onClick={() => setI(j)}>{x.icon} {x.name}</button>)}</div>
      <svg key={m.id} viewBox="0 0 500 210" style={{ width: "100%", maxHeight: 260, background: "var(--paper)", borderRadius: 14 }}>{m.svg()}</svg>
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}><C id={m.id}>{m.name}</C> <span className="muted-it">{m.en}</span> · <b>{m.rule}</b></div>
        <p style={{ margin: "6px 0" }}>{m.text}</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>📖 书中一例：{m.eg}</p>
      </div>
    </div>);
}
