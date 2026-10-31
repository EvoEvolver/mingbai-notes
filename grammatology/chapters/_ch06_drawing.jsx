// 第 6 章专属图解 ②：素描 vs 色彩 ‖ 旋律 vs 和声 的 2×2 对应 + 「版画测试」
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", GREEN = "#3d6b4a";

const CELLS = {
  melody: { art: "音乐", side: "life", name: "旋律", en: "melody", icon: "🎵",
    text: "旋律模仿激情说话时的抑扬（重音），因此能「描绘」情感、打动心灵。卢梭：使音乐成为模仿艺术的，是旋律。" },
  harmony: { art: "音乐", side: "death", name: "和声", en: "harmony", icon: "🎹",
    text: "和声是和弦按规则的接续、音程的计算。卢梭认为它只取悦耳朵的物理感觉，是北欧（尤其拉莫）把一种约定俗成的体系冒充为「自然」。" },
  drawing: { art: "绘画", side: "life", name: "素描线条", en: "drawing / design", icon: "✏️",
    text: "线条勾出形体与表情，是模仿的条件。卢梭：赋予色彩生命与灵魂的，是素描，是模仿；动人的画即使印成版画也照样动人。" },
  color: { art: "绘画", side: "death", name: "色彩", en: "color", icon: "🎨",
    text: "色彩只是感官的愉悦，其物理规律可以被量化计算。乍看反常：卢梭把色彩放在「科学/计算」一边。德里达提醒：希腊词 chroma 就是「色」，而音乐里的「半音阶」正叫 chromatic。" },
};
const SIDES = { life: { label: "模仿 · 形式（卢梭：生命）", color: RED }, death: { label: "物理 · 计算（卢梭：死亡）", color: BLUE } };

function Picture({ mode }) {
  // 一幅极简的「母亲与孩子」：mode 0 原作（色彩+线条），1 版画（只剩线条+排线），2 复本叠复本
  const colored = mode === 0;
  const fig = (dx = 0, dy = 0, op = 1, k = "a") => <g key={k} transform={`translate(${dx},${dy})`} opacity={op}>
    <rect x="20" y="16" width="220" height="180" rx="6" fill={colored ? "#f3e2c0" : "#fffdf8"} stroke={INK} strokeWidth="2" />
    {colored && <><circle cx="200" cy="52" r="22" fill="#f2b84b" opacity=".85" /><rect x="20" y="140" width="220" height="56" fill="#9fb98a" opacity=".8" /></>}
    {!colored && [...Array(9)].map((_, i) => <line key={i} x1={24 + i * 24} y1="192" x2={44 + i * 24} y2="150" stroke={INK} strokeWidth=".8" opacity=".5" />)}
    {/* 母亲 */}
    <path d="M90 196 C 86 150, 92 112, 112 100 C 132 112, 138 150, 134 196 Z" fill={colored ? RED : "none"} fillOpacity={colored ? .75 : 0} stroke={INK} strokeWidth="2" />
    <circle cx="112" cy="84" r="16" fill={colored ? "#e8b896" : "none"} stroke={INK} strokeWidth="2" />
    {/* 孩子 */}
    <circle cx="140" cy="118" r="10" fill={colored ? "#efc7a5" : "none"} stroke={INK} strokeWidth="2" />
    <path d="M112 124 C 124 136, 146 136, 156 124" fill="none" stroke={INK} strokeWidth="2" />
    {/* 表情：低头的弧线、泪滴 —— 这是「激情」，它在线条里 */}
    <path d="M105 88 q 4 3 8 0" fill="none" stroke={INK} strokeWidth="1.6" />
    <path d="M120 90 q 2 6 0 9 q -2 -3 0 -9" fill={colored ? BLUE : "none"} stroke={INK} strokeWidth="1" />
  </g>;
  if (mode < 2) return <svg viewBox="0 0 260 212" style={{ width: "100%", maxWidth: 360 }}>{fig()}</svg>;
  return <svg viewBox="0 0 300 250" style={{ width: "100%", maxWidth: 380 }}>
    {fig(36, 34, .25, "c")}{fig(18, 17, .5, "b")}
    <g>{fig(0, 0, 1, "a")}<animateTransform attributeName="transform" type="translate" values="0,0;-3,-3;0,0" dur="2.4s" repeatCount="indefinite" /></g>
  </svg>;
}

const PRINT = [
  { label: "原作（有色彩）", text: "一幅动人的画：母亲低头抱着孩子。是什么在打动你？是颜色，还是低头的弧线、那滴泪？" },
  { label: "拓成版画", text: "颜色全没了，只剩线条和排线——可它照样动人。卢梭以此证明：艺术的生命在「线条/模仿」，不在「色彩/感觉」。" },
  { label: "德里达追问", text: "可如果一件作品复制之后毫无损失，那它在「第一次」被画出来时，就已经具有「可被复制」的本质。版画抄录艺术的范本，却又是艺术的范本：可重复性（也就是「死」的原则）从作品诞生起就在里面。" },
];

export default function DrawingColor() {
  const [cell, setCell] = useState("drawing");
  const [p, setP] = useState(0);
  const c = CELLS[cell];
  const box = id => {
    const x = CELLS[id], on = cell === id, col = SIDES[x.side].color;
    return <button key={id} onClick={() => setCell(id)} style={{
      border: `2px solid ${on ? col : "var(--line)"}`, background: on ? col : "var(--paper)", color: on ? "var(--paper)" : "var(--ink)",
      borderRadius: 12, padding: "12px 8px", font: "inherit", cursor: "pointer", textAlign: "center" }}>
      <div style={{ fontSize: 24 }}>{x.icon}</div><div style={{ fontFamily: "var(--serif)", fontSize: 18 }}>{x.name}</div>
      <div style={{ fontSize: 12, opacity: .75 }}>{x.en}</div></button>;
  };
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "64px 1fr 1fr", gap: 8, alignItems: "stretch" }}>
          <div />
          {["life", "death"].map(s => <div key={s} style={{ textAlign: "center", fontSize: 13, fontWeight: 600, color: SIDES[s].color }}>{SIDES[s].label}</div>)}
          <div style={{ alignSelf: "center", fontFamily: "var(--serif)" }}>音乐</div>{box("melody")}{box("harmony")}
          <div style={{ alignSelf: "center", fontFamily: "var(--serif)" }}>绘画</div>{box("drawing")}{box("color")}
        </div>
        <div style={{ borderLeft: `4px solid ${SIDES[c.side].color}`, paddingLeft: 12 }}>
          <b>{c.art} · {c.name}</b>：{c.text}
        </div>
        <p style={{ margin: 0, fontSize: 15, color: "var(--muted)" }}>
          卢梭的公式：<b>旋律之于音乐 = 素描之于绘画</b>；和声与声音只是音乐的「颜色」。他还打比方：演说家用墨水写稿，难道墨水是雄辩的液体？
          德里达：这个类比本身就是一种「类比/比例」——两门艺术里被指控的「坏原则」都是同一个东西：<C id="spacing">间隔</C>可被计算的规则性。
        </p>
      </div>

      <div className="card" style={{ display: "grid", gap: 12 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>🖨️ 版画测试</div>
        <div className="seg" style={{ margin: 0 }}>{PRINT.map((x, j) =>
          <button key={j} className={p === j ? "on" : ""} onClick={() => setP(j)}>{x.label}</button>)}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, alignItems: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", background: "var(--paper)", borderRadius: 14, padding: 10 }}><Picture mode={p} /></div>
          <div>
            <p style={{ marginTop: 0 }}>{PRINT[p].text}</p>
            {p === 2 && <p style={{ margin: 0, color: GREEN }}>
              所以<C id="imitation">模仿</C>同时是艺术的生与死：让作品能「像」、能被认出的那条线，也正是打开计算、规则与复制的那条线。卢梭想把好形式（旋律、素描）和坏形式（和声、色彩）分开，却发现坏原则早就住在好原则里——「和声已经在旋律之中」。
            </p>}
          </div>
        </div>
      </div>
    </div>);
}
