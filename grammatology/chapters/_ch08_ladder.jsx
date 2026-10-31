// 第 8 章专属图解（一）：三种文字 × 三种社会 —— 卢梭的阶梯 vs 德里达的「增补的增补」
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#8a8175";

const STAGES = [
  {
    key: "picto", icon: "🦌", name: "图画", en: "pictography", glyph: "🦌",
    society: "野蛮人 · 猎人", societyEn: "sauvage · chasseur",
    paints: "画的是「物」本身",
    how: "不记录声音，直接描绘对象：或者像墨西哥人那样直画，或者像古埃及人那样用寓意图像。",
    rousseau: "最古老、最粗糙。只需要「某种社会」和由激情催生的一点需要，还谈不上约定和法律。",
    derrida: "连「直接画物」都已经是寓意：把物搬进它的复本、交给另一个人看，本身就是一次转移。画得再像，物也已经不在场——根本没有「物本身」可画。第一级就已是增补。",
    chain: ["物", "图像"],
  },
  {
    key: "ideo", icon: "🀄", name: "表意（词与命题的符号）", en: "ideo-phonography", glyph: "鹿",
    society: "未开化人 · 牧人", societyEn: "barbare · pasteur",
    paints: "画的是「词与命题」",
    how: "用约定的字符整块地代表「声音＋意义」，例如汉字。卢梭说它「真正表达声音，并且对眼睛说话」。",
    rousseau: "需要「双重约定」：语言已完全成形，全民受共同法律约束。比图画进步，但仍未拆开声音。",
    derrida: "它已经在「画语言」：所指不再是物，而是已经代表物的词。表征的对象本身就是一个表征——增补开始叠在增补上。",
    chain: ["物", "词（音＋义）", "字符"],
  },
  {
    key: "alpha", icon: "🔤", name: "字母", en: "alphabet", glyph: "d·e·e·r",
    society: "文明人 · 农人（及商人）", societyEn: "policé · laboureur",
    paints: "分析声音，而非描绘",
    how: "把说话的声音拆成有限的元音、辅音，任意拼出所有词。卢梭推测是四处经商、要应付多种语言的商人发明的。",
    rousseau: "最理性、最清晰，适合文明的法治社会；但也最冷、最远离激情与歌唱，是「言语的增补」，必要时只是朗读。",
    derrida: "字母是「表征者的表征」：它记录的是本身无意义的音素。它离在场最远，却最善于抹掉自己、让声音「好像」直接在场——越失去，越还原。卢梭对它又爱又怕。",
    chain: ["思想", "言语", "音素", "字母"],
  },
];

function Ladder({ i, mode, setI }) {
  return <svg viewBox="0 0 640 270" style={{ width: "100%", maxHeight: 320, background: "var(--paper)", borderRadius: 14 }}>
    {/* 三级台阶：卢梭模式向上（进步），德里达模式标注「增补」叠层 */}
    {STAGES.map((s, j) => {
      const x = 20 + j * 92, y = 170 - j * 55, on = j === i;
      return <g key={s.key} style={{ cursor: "pointer" }} onClick={() => setI(j)}>
        <rect x={x} y={y} width={92} height={260 - y - 10} fill={on ? (mode ? GOLD : RED) : "#e9e1d3"} opacity={on ? .9 : 1} stroke="#fff" strokeWidth="2" />
        <text x={x + 46} y={y + 30} textAnchor="middle" fontSize="24">{s.icon}</text>
        <text x={x + 46} y={y + 52} textAnchor="middle" fontSize="12" fill={on ? "#fff" : INK}>{s.name.slice(0, 2)}</text>
        {mode === 1 && j > 0 && <text x={x + 46} y={y - 6} textAnchor="middle" fontSize="11" fill={GOLD}>+ 增补</text>}
      </g>;
    })}
    <text x={20} y={20} fontSize="12" fill={MUTED}>{mode ? "每一级 = 在上一级之上再加一层代表" : "卢梭：一步步「进步」，也一步步远离激情"}</text>

    {/* 右侧：表征链。德里达模式下，链条起点虚化、向左退后 */}
    <line x1="320" y1="40" x2="320" y2="250" stroke={INK} strokeDasharray="3 5" opacity=".2" />
    <text x="480" y="40" textAnchor="middle" fontSize="13" fill={INK}>谁代表谁？（← 读作「代表」）</text>
    {(() => {
      const ch = STAGES[i].chain, n = ch.length;
      return <g key={i + "-" + mode}>
        {mode === 1 && <g>
          <text x={336} y={150} fontSize="18" fill={MUTED}>⋯
            <animate attributeName="opacity" values=".2;1;.2" dur="2s" repeatCount="indefinite" /></text>
          <text x={330} y={182} fontSize="11" fill={MUTED}>原点？</text>
        </g>}
        {ch.map((c, k) => {
          const x0 = mode ? 370 : 340, sp = (630 - x0) / n, cx = x0 + sp * (k + .5), first = k === 0;
          const fade = mode === 1 && first, bw = Math.min(sp - 18, 84);
          return <g key={k}>
            <rect x={cx - bw / 2} y={122} width={bw} height={40} rx={10}
              fill={first ? (mode ? "none" : GREEN) : (k === n - 1 ? (mode ? GOLD : RED) : BLUE)}
              stroke={fade ? MUTED : "none"} strokeDasharray={fade ? "5 4" : ""} opacity={k === n - 1 || first ? 1 : .8}>
              {fade && <animate attributeName="opacity" values="1;.25;1" dur="2.6s" repeatCount="indefinite" />}
            </rect>
            <text x={cx} y={147} textAnchor="middle" fontSize={c.length > 4 ? 11 : 13} fill={fade ? MUTED : "#fff"}>{c}</text>
            {k > 0 && <text x={cx - sp / 2} y={148} textAnchor="middle" fontSize="15" fill={INK}>←</text>}
          </g>;
        })}
        <text x={490} y={212} textAnchor="middle" fontSize="12" fill={mode ? GOLD : RED}>
          {mode ? `距「在场」隔了 ${n - 1} 层，而第一层本身也只是假定` : `符号与原物之间隔了 ${n - 1} 层`}
        </text>
        <text x={490} y={244} textAnchor="middle" fontSize="22" fill={INK}>{STAGES[i].glyph}</text>
      </g>;
    })()}
  </svg>;
}

export default function ScriptLadder() {
  const [i, setI] = useState(0), [mode, setMode] = useState(0), s = STAGES[i];
  return <div className="card" style={{ display: "grid", gap: 14 }}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between" }}>
      <div className="seg">{STAGES.map((x, j) =>
        <button key={x.key} className={i === j ? "on" : ""} onClick={() => setI(j)}>{x.icon} {x.name.split("（")[0]}</button>)}</div>
      <div className="seg">{["卢梭的读法", "德里达的读法"].map((x, j) =>
        <button key={x} className={mode === j ? "on" : ""} onClick={() => setMode(j)}>{x}</button>)}</div>
    </div>
    <Ladder i={i} mode={mode} setI={setI} />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>{s.name} <span className="muted-it">{s.en}</span></div>
        <p style={{ margin: "6px 0" }}><b>对应社会：</b>{s.society} <span style={{ color: "var(--muted)", fontSize: 13 }}>（{s.societyEn}）</span></p>
        <p style={{ margin: "6px 0" }}><b>{s.paints}。</b>{s.how}</p>
      </div>
      <div style={{ borderLeft: `4px solid ${mode ? GOLD : RED}`, paddingLeft: 14 }}>
        <div style={{ fontSize: 13, letterSpacing: ".12em", color: mode ? GOLD : RED, fontWeight: 600 }}>{mode ? "德里达：这一级其实是……" : "卢梭的评价"}</div>
        <p style={{ margin: "6px 0" }}>{mode ? s.derrida : s.rousseau}</p>
      </div>
    </div>
    <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>
      {mode
        ? <>切到第三级再看左边：链条越长，最左边那个「原点」越虚。德里达的结论是：没有一个先于一切代表的「物本身」，<C id="originary_supplement">增补在源头处</C>就已经开始。</>
        : <>卢梭坚持三种文字与三种社会「大致」对应，但又承认它们相对独立：文明社会里照样有图画和表意的成分。见 <C id="three_scripts">三种文字</C>。</>}
    </p>
  </div>;
}
