// 第 10 章专属图解 B：第二积极任务——「利益」与「欲望」两条轴（前意识利益投注 × 无意识力比多投注）
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#6b6257";

// x: 前意识利益投注 0=反动/保守 → 1=革命；y: 无意识力比多投注 0=偏执-法西斯化极 → 1=精神分裂-革命极
// 坐标只是示意摆放，书中没有任何量化。
const CASES = [
  { id: "oppressed", icon: "🧎", label: "热爱压迫自己的体制的人", src: "书中", x: .3, y: .14,
    text: "书中指出：社会里最受压迫、最被排斥的人，往往满怀激情地投注那台压迫他们的机器，还在其中找到「自己的利益」。D&G 的结论是：利益总是后到的，它是在欲望已经投注过的地方被寻找、被衡量出来的。" },
  { id: "officer", icon: "⚙️", label: "《在流放地》的军官", src: "书中", x: .14, y: .05,
    text: "卡夫卡小说里的军官，痴迷那台把判决刻进犯人身体的刑具。D&G 用他说明：对一台社会机器的力比多投注可以强烈到这种地步——欲望欲求着它自己的压抑。" },
  { id: "smallcap", icon: "🏪", label: "没赚到大钱的小资本家", src: "书中", x: .2, y: .22,
    text: "利润不大、前景也一般，却完整保持着对资本主义的全部力比多投注。他爱的不是到手的利润，而是那股不属于任何人的「大流」本身——一种无关利益的爱：这台机器真了不起！" },
  { id: "union", icon: "📢", label: "只谈涨工资的大工会", src: "书中", x: .52, y: .28,
    text: "书中第一种情形：被剥削者把前意识利益局限在涨工资、改善生活水平上，由强大的组织代表。利益在资本主义的「洞」里被找到；资本主义随时可以加一条公理（新政、承认工会）把它吸收。" },
  { id: "party", icon: "🏛️", label: "夺权后的革命党", src: "书中", x: .9, y: .16,
    text: "前意识层面是真正革命的——新的目标、新的社会体。但只要新权力仍在奴役、碾压欲望生产，它在无意识层面就仍是「被奴役群」：群体超我、自恋、等级。书中的讽刺：从马克思到列宁，最后是一句「欢迎勃列日涅夫先生」。" },
  { id: "artaud", icon: "🎭", label: "阿尔托（独自一人）", src: "书中", x: .46, y: .9,
    text: "书中说，有时一个人就能作为「流-断裂」、作为主体群起作用：他与被奴役群（超现实主义团体）决裂，自我排除或被排除。他不代表哪个阶级的利益，却在欲望层面打开了逃逸线。" },
  { id: "venice", icon: "🎨", label: "15 世纪中叶的威尼斯画派", src: "书中", x: .38, y: .78,
    text: "在拜占庭式代码下，色彩与线条服从等级化的垂直秩序；威尼斯商业资本主义露出衰落迹象时，画中线条被解域、色彩被解码，横向的逃逸线出现——随后又被透视法这类新的「画面公理」收回。" },
  { id: "subject", icon: "⚡", label: "主体群：断裂发生的那一刻", src: "书中", x: .9, y: .9,
    text: "例如「列宁主义断裂」：一部分布尔什维克意识到革命可以不按预期的力量因果顺序到来，而是一头扎进缺口。真正的无意识革命断裂，是「与因果性的决裂」，只有欲望的闯入能解释它在此时此地成真。" },
];

const W = 560, H = 380, L = 70, T = 24, PW = 460, PH = 300;
const px = x => L + x * PW, py = y => T + (1 - y) * PH;

// 主体群的「致命倾向」：革命的力比多投注 → 仅前意识的革命投注 → 改良投注（书中原话的三步）
const SLIDE = [
  { x: .9, y: .9, t: "① 主体群：欲望与利益都是革命的，欲望流贯穿社会场。" },
  { x: .9, y: .2, t: "② 只剩前意识的革命：目标还在，但新社会体重新奴役欲望——成了被奴役群。" },
  { x: .52, y: .24, t: "③ 再滑到改良：利益缩回到资本主义框架里，又多了一条公理。" },
];

export default function InvestPoles() {
  const [sel, setSel] = useState("party");
  const [slide, setSlide] = useState(-1);
  const c = CASES.find(k => k.id === sel);
  const s = slide >= 0 ? SLIDE[slide] : null;
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxHeight: 420, background: "var(--paper)", borderRadius: 14 }}>
        {/* 四个象限底色 */}
        <rect x={L} y={T} width={PW / 2} height={PH / 2} fill={GREEN} opacity=".06" />
        <rect x={L + PW / 2} y={T} width={PW / 2} height={PH / 2} fill={GREEN} opacity=".13" />
        <rect x={L} y={T + PH / 2} width={PW / 2} height={PH / 2} fill={RED} opacity=".13" />
        <rect x={L + PW / 2} y={T + PH / 2} width={PW / 2} height={PH / 2} fill={RED} opacity=".06" />
        <rect x={L} y={T} width={PW} height={PH} fill="none" stroke={INK} opacity=".35" />
        <line x1={L + PW / 2} y1={T} x2={L + PW / 2} y2={T + PH} stroke={INK} opacity=".15" strokeDasharray="4 4" />
        <line x1={L} y1={T + PH / 2} x2={L + PW} y2={T + PH / 2} stroke={INK} opacity=".15" strokeDasharray="4 4" />
        <text x={L + PW - 6} y={T + PH - 8} textAnchor="end" fontSize="11" fill={RED} opacity=".8">利益革命，欲望仍偏执 = 被奴役群</text>
        <text x={L + PW - 6} y={T + 16} textAnchor="end" fontSize="11" fill={GREEN} opacity=".9">利益与欲望都革命 = 主体群</text>
        <text x={L + 6} y={T + PH / 2 + 16} fontSize="11" fill={RED} opacity=".8">反动利益 + 偏执欲望</text>
        {/* 轴 */}
        <text x={L + PW / 2} y={H - 18} textAnchor="middle" fontSize="13" fill={INK}>前意识的「利益/阶级」投注 →</text>
        <text x={L} y={H - 34} fontSize="11" fill={MUTED}>反动 / 保守</text>
        <text x={L + PW / 2} y={H - 34} textAnchor="middle" fontSize="11" fill={MUTED}>改良</text>
        <text x={L + PW} y={H - 34} textAnchor="end" fontSize="11" fill={MUTED}>革命</text>
        <g transform={`translate(22 ${T + PH / 2}) rotate(-90)`}>
          <text textAnchor="middle" fontSize="13" fill={INK}>无意识的「欲望/群体」投注 →</text>
        </g>
        <text x={L - 8} y={T + 12} textAnchor="end" fontSize="10" fill={GREEN}>精神分裂</text>
        <text x={L - 8} y={T + 24} textAnchor="end" fontSize="10" fill={GREEN}>革命极</text>
        <text x={L - 8} y={T + PH - 14} textAnchor="end" fontSize="10" fill={RED}>偏执</text>
        <text x={L - 8} y={T + PH - 2} textAnchor="end" fontSize="10" fill={RED}>法西斯化极</text>
        {/* 案例点 */}
        {CASES.map(k => {
          const on = k.id === sel && !s;
          return <g key={k.id} style={{ cursor: "pointer" }} onClick={() => { setSel(k.id); setSlide(-1); }} opacity={s ? .3 : 1}>
            <circle cx={px(k.x)} cy={py(k.y)} r={on ? 17 : 13} fill={k.y > .5 ? GREEN : RED} opacity={on ? .95 : .7} />
            <text x={px(k.x)} y={py(k.y) + 5} textAnchor="middle" fontSize="13">{k.icon}</text>
            {on && <circle cx={px(k.x)} cy={py(k.y)} r="22" fill="none" stroke={GOLD} strokeWidth="2">
              <animate attributeName="r" values="19;26;19" dur="1.6s" repeatCount="indefinite" /></circle>}
          </g>;
        })}
        {/* 滑落动画 */}
        {s && <>
          {SLIDE.slice(0, slide + 1).map((p, j) => j > 0 &&
            <line key={j} x1={px(SLIDE[j - 1].x)} y1={py(SLIDE[j - 1].y)} x2={px(p.x)} y2={py(p.y)} stroke={GOLD} strokeWidth="2.5" strokeDasharray="6 5">
              <animate attributeName="stroke-dashoffset" from="22" to="0" dur=".8s" repeatCount="indefinite" /></line>)}
          <g style={{ transform: `translate(${px(s.x)}px, ${py(s.y)}px)`, transition: "transform 1s ease" }}>
            <circle r="18" fill={GOLD} stroke={INK} strokeWidth="1.5" />
            <text y="6" textAnchor="middle" fontSize="16">👥</text>
          </g>
        </>}
      </svg>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 14, color: "var(--muted)" }}>演示「主体群的滑落」：</span>
        {SLIDE.map((p, j) => <button key={j} className={"chip" + (slide === j ? " on" : "")}
          style={slide === j ? { background: "var(--ink)", color: "var(--paper)" } : {}} onClick={() => setSlide(j)}>第 {j + 1} 步</button>)}
        {slide >= 0 && <button className="chip" onClick={() => setSlide(-1)}>回到案例</button>}
      </div>
      {s ? <div style={{ borderLeft: `4px solid ${GOLD}`, paddingLeft: 12 }}>
        <b>{s.t}</b>
        <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: 15 }}>书中原意：一个革命群体有一种「致命倾向」——从革命的力比多投注，滑到仅仅是前意识的革命投注（利益投注），再滑到仅仅是改良的投注。每次追问「从哪儿开始变坏的」，都得往前再追溯一点。</p>
      </div> : <div style={{ borderLeft: `4px solid ${c.y > .5 ? GREEN : RED}`, paddingLeft: 12 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 19 }}>{c.icon} {c.label} <span className="muted-it" style={{ fontSize: 13 }}>（{c.src}）</span></div>
        <p style={{ margin: "6px 0 0" }}>{c.text}</p>
      </div>}
      <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>
        说明：各点的位置是本页为了直观而作的<b>示意摆放</b>，原书并没有给出坐标；书里强调的只是两条轴彼此独立、可以错位，同一个人或群体还可以同时落在几个位置上。点圆点查看；参见 <C id="interest_vs_desire">利益投注与欲望投注</C>、<C id="subject_groups">主体群与被奴役群</C>。
      </p>
    </div>);
}
