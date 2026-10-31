// 第 4 章专属图解：语言的四边形（四个理论片段 + 四条边 + 两条对角线 + 中心的「名称」 + 外缘的「相似」）
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#6b6257";

// 角点：按原文顺序 命题—分节—指称—派生 绕一圈；对角线 = 分节↔派生、命题↔指称
const CORNERS = {
  P: { x: 150, y: 90, zh: "命题", en: "Proposition / Attribution", c: RED, cid: "verb_to_be", sec: "III",
    rule: "把两个表征用「是」连起来：这是那。",
    text: "语言的「存在」所在：没有动词「是」（哪怕是隐含的），就只有一堆记号，没有语言。命题提供的是纯形式：一个待判断者、一个被判断者、中间一个系词。它是线性展开的。" },
  A: { x: 450, y: 90, zh: "分节", en: "Articulation", c: BLUE, cid: "articulation", sec: "IV",
    rule: "用名词、形容词、虚词把表征切成块。",
    text: "命题的空架子要靠词来填。名词沿「个体→一般」与「实体→性质」两条轴切分表征；冠词、介词、词尾再补上关系。没有一般性的名词，就无法谓述。" },
  D: { x: 450, y: 330, zh: "指称", en: "Designation", c: GREEN, cid: "language_of_action", sec: "V",
    rule: "词最初像手指一样「指着」某物。",
    text: "语言的「起源」所在：动作语言里的叫喊与手势，经过约定变成符号；少量词根靠声音与事物的相似固定下来。这是指示，不是判断。" },
  R: { x: 150, y: 330, zh: "派生", en: "Derivation", c: GOLD, cid: "derivation_tropes", sec: "VI",
    rule: "词沿着提喻、换喻、隐喻从原义滑开。",
    text: "名字从一棵橡树滑到所有「树」，从一个夜晚滑到所有「夜」。这种修辞性的滑动在空间中发生，让专名变成通名，也让各语言分道扬镳。" },
};

const EDGES = [
  { id: "PA", a: "P", b: "A", title: "命题 — 分节",
    help: "分节给命题空洞的动词形式填进内容。",
    oppose: "分节是区分事物的「命名」，命题是把事物连起来的「谓述」，两者方向相反。" },
  { id: "AD", a: "A", b: "D", title: "分节 — 指称",
    help: "指称揭示了分节切出来的每个名词最终「挂」在哪里。",
    oppose: "指称是瞬间的、手势式的、垂直指向某物；分节则建立在一般性之上的网格。" },
  { id: "DR", a: "D", b: "R", title: "指称 — 派生",
    help: "派生说明词如何从源头出发连续移动。",
    oppose: "派生是表征表面的滑移，指称却要求一个词根稳稳地绑在一个表征上。" },
  { id: "RP", a: "R", b: "P", title: "派生 — 命题",
    help: "派生又引回命题：没有派生，每个指称都封闭在自身，得不到谓述所需的一般性。",
    oppose: "派生靠一种空间性的修辞图形发生，命题却按线性的先后顺序展开。" },
];

const DIAGS = [
  { id: "AR", a: "A", b: "R", title: "对角线一：分节 ↔ 派生", role: "词作为「元素」",
    text: "一门语言能切分得多细，取决于它沿派生线走了多远：词离开原初指称越远、外延变化越多，分节能力越强。这条线标出一门语言的「状态」，既是它的历史位置，也是它的辨别力。在这条线上，词是可组合、可拆解的元素。" },
  { id: "PD", a: "P", b: "D", title: "对角线二：命题 ↔ 指称", role: "词作为「替代物」",
    text: "从每个判断核心的肯定，到每次命名隐含的指示。这条线确立词与它所表征之物的关系：词说出的永远只是「表征的存在」，但它总是在命名某个被表征的东西。在这条线上，词是代替表征的替代物，即「表征的表征」。" },
];

const CENTER = { title: "交点：名称（Name）", cid: "the_name",
  text: "两条对角线在中心相交，那里站着「名称」。命名同时做两件事：给一个表征一个语词表征，并把它放进一张总表。语言的所有功能都在名称这里交汇，判断的真假也从这里开始与知识相接。如果所有名字都准确，语言就「造得好」，错误会像代数算错一样一眼可见。" };

const RING = { title: "外缘：相似的低语", cid: "resemblance_edge",
  text: "四边形定义的是一圈「边界」，不是内部图形。命题要求同一与差异；但词根、派生、分节都需要事物之间先有相似与连续，否则无法比较、无法取共名。17 世纪起被逐出知识的相似，仍是语言的外缘：话语驱散这阵低语，没有它却说不出话。" };

export default function Quadrilateral() {
  const [sel, setSel] = useState({ k: "center" });
  const isOn = (k, id) => sel.k === k && sel.id === id;
  const hot = (k) => sel.k === "corner" && sel.id === k;
  const edgeHot = (e) => isOn("edge", e.id) || hot(e.a) || hot(e.b);

  let panel;
  if (sel.k === "corner") {
    const c = CORNERS[sel.id];
    panel = <>
      <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}><span style={{ color: c.c }}>●</span> <C id={c.cid}>{c.zh}</C> <span className="muted-it">{c.en}</span> · 第 {c.sec} 节</div>
      <p style={{ margin: "6px 0 4px" }}><b>{c.rule}</b></p>
      <p style={{ margin: 0 }}>{c.text}</p>
    </>;
  } else if (sel.k === "edge") {
    const e = EDGES.find(x => x.id === sel.id);
    panel = <>
      <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>边：{e.title} <span className="muted-it">两两相对，也两两相撑</span></div>
      <p style={{ margin: "6px 0 4px" }}>🤝 <b>相互支撑：</b>{e.help}</p>
      <p style={{ margin: 0 }}>⚔️ <b>彼此对立：</b>{e.oppose}</p>
    </>;
  } else if (sel.k === "diag") {
    const d = DIAGS.find(x => x.id === sel.id);
    panel = <>
      <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>{d.title} · <b>{d.role}</b></div>
      <p style={{ margin: "6px 0 0" }}>{d.text}</p>
    </>;
  } else {
    const o = sel.k === "ring" ? RING : CENTER;
    panel = <>
      <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}><C id={o.cid}>{o.title}</C></div>
      <p style={{ margin: "6px 0 0" }}>{o.text}</p>
    </>;
  }

  const P = CORNERS;
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg">
        {Object.entries(CORNERS).map(([k, c]) =>
          <button key={k} className={hot(k) ? "on" : ""} onClick={() => setSel({ k: "corner", id: k })}>{c.zh}</button>)}
        {DIAGS.map(d => <button key={d.id} className={isOn("diag", d.id) ? "on" : ""} onClick={() => setSel({ k: "diag", id: d.id })}>{d.title.slice(0, 4)}</button>)}
        <button className={sel.k === "center" ? "on" : ""} onClick={() => setSel({ k: "center" })}>名称</button>
        <button className={sel.k === "ring" ? "on" : ""} onClick={() => setSel({ k: "ring" })}>外缘</button>
      </div>
      <svg viewBox="0 0 600 420" style={{ width: "100%", maxHeight: 460, background: "var(--paper)", borderRadius: 14, cursor: "pointer" }}>
        {/* 外缘：相似 */}
        <g onClick={() => setSel({ k: "ring" })}>
          <rect x="40" y="22" width="520" height="366" rx="60" fill="none" stroke={VIOLET} strokeWidth={sel.k === "ring" ? 4 : 2}
            strokeDasharray="3 9" opacity={sel.k === "ring" ? .9 : .45}>
            <animate attributeName="stroke-dashoffset" values="0;24" dur="2.4s" repeatCount="indefinite" />
          </rect>
          <rect x="40" y="22" width="520" height="366" rx="60" fill="none" stroke="transparent" strokeWidth="18" />
          <text x="300" y="410" textAnchor="middle" fontSize="12" fill={VIOLET}>外缘 · 相似的低语（话语驱散它，却离不开它）</text>
        </g>
        {/* 对角线 */}
        {DIAGS.map(d => {
          const a = P[d.a], b = P[d.b], on = isOn("diag", d.id);
          return <g key={d.id} onClick={() => setSel({ k: "diag", id: d.id })}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={on ? RED : MUTED} strokeWidth={on ? 4 : 2} strokeDasharray="8 6" opacity={on ? 1 : .5}>
              {on && <animate attributeName="stroke-dashoffset" values="28;0" dur="1s" repeatCount="indefinite" />}
            </line>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="transparent" strokeWidth="18" />
          </g>;
        })}
        <text x="196" y="146" fontSize="12" fill={MUTED} transform="rotate(38.7 196 146)">词作为替代物</text>
        <text x="345" y="160" fontSize="12" fill={MUTED} transform="rotate(-38.7 345 160)">词作为元素</text>
        {/* 四条边 */}
        {EDGES.map(e => {
          const a = P[e.a], b = P[e.b], on = edgeHot(e);
          return <g key={e.id} onClick={() => setSel({ k: "edge", id: e.id })}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={on ? INK : "#b9ab92"} strokeWidth={isOn("edge", e.id) ? 6 : on ? 4 : 3} />
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="transparent" strokeWidth="20" />
          </g>;
        })}
        {/* 中心：名称 */}
        <g onClick={() => setSel({ k: "center" })}>
          <circle cx="300" cy="210" r={sel.k === "center" ? 40 : 34} fill={sel.k === "center" ? RED : "#fff"} stroke={RED} strokeWidth="3">
            {sel.k === "center" && <animate attributeName="r" values="38;44;38" dur="2s" repeatCount="indefinite" />}
          </circle>
          <text x="300" y="207" textAnchor="middle" fontSize="18" fontFamily="var(--serif)" fill={sel.k === "center" ? "#fff" : RED}>名称</text>
          <text x="300" y="225" textAnchor="middle" fontSize="11" fill={sel.k === "center" ? "#fff" : RED}>Name</text>
        </g>
        {/* 角点 */}
        {Object.entries(CORNERS).map(([k, c]) => {
          const on = hot(k), top = c.y < 200;
          return <g key={k} onClick={() => setSel({ k: "corner", id: k })}>
            <circle cx={c.x} cy={c.y} r={on ? 34 : 28} fill={c.c} opacity={on ? 1 : .88} />
            <text x={c.x} y={c.y + 6} textAnchor="middle" fontSize="17" fontFamily="var(--serif)" fill="#fff">{c.zh}</text>
            <text x={c.x} y={top ? c.y - 44 : c.y + 54} textAnchor="middle" fontSize="12" fill={INK}>{c.en}</text>
          </g>;
        })}
        <text x="300" y="80" textAnchor="middle" fontSize="11" fill={MUTED}>谓述连接 ⇄ 命名区分</text>
        <text x="300" y="350" textAnchor="middle" fontSize="11" fill={MUTED}>表面滑移 ⇄ 稳定纽带</text>
      </svg>
      <div style={{ minHeight: 120 }}>{panel}</div>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>提示：点角点看理论，点边看「既相撑又相对」，点虚线对角线看词的两种身份，点中心看名称，点外圈虚线看相似。</p>
    </div>);
}
