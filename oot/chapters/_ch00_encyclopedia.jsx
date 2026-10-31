// 前言专属图解 ①：博尔赫斯「中国百科全书」——亲手体验这种分类为何不可思议
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16";

// 14 个类目（中文为意译）
const CATS = [
  { k: "a", zh: "属于皇帝的", icon: "👑" },
  { k: "b", zh: "制成标本的", icon: "🏺" },
  { k: "c", zh: "驯服的", icon: "🐑" },
  { k: "d", zh: "乳猪", icon: "🐖" },
  { k: "e", zh: "塞壬（人鱼）", icon: "🧜" },
  { k: "f", zh: "传说中的", icon: "🐉" },
  { k: "g", zh: "流浪狗", icon: "🐕" },
  { k: "h", zh: "包括在本分类中的", icon: "🔁" },
  { k: "i", zh: "发狂的", icon: "🌀" },
  { k: "j", zh: "数不清的", icon: "♾️" },
  { k: "k", zh: "用极细驼毛笔画出的", icon: "🖌️" },
  { k: "l", zh: "等等", icon: "…" },
  { k: "m", zh: "刚打破水罐的", icon: "🏺💥" },
  { k: "n", zh: "远看像苍蝇的", icon: "🪰" },
];

// 读者可以尝试的「分类标准」：每一种都只能接住其中几类
const AXES = [
  { id: "species", label: "按物种", color: GREEN, fits: ["d", "e", "g"], note: "只有「乳猪」「流浪狗」（勉强加上「人鱼」）是物种名。其余类目根本不在回答「这是什么动物」。" },
  { id: "owner", label: "按归属", color: GOLD, fits: ["a", "g"], note: "「属于皇帝的」讲主人，「流浪狗」讲没有主人——可「发狂的」「数不清的」跟主人毫无关系。" },
  { id: "real", label: "按真实 / 虚构", color: VIOLET, fits: ["e", "f"], note: "福柯特意指出：怪物被关进了自己的格子（人鱼、传说动物），一点也不混乱。所以不可能之处不在怪物本身。" },
  { id: "state", label: "按状态与行为", color: RED, fits: ["b", "c", "i", "m"], note: "标本、驯服、发狂、刚打破水罐——这是在描述某一刻的动物，而不是动物的种类。" },
  { id: "seen", label: "按如何被看见", color: BLUE, fits: ["k", "n"], note: "「用驼毛笔画的」「远看像苍蝇的」——标准落在画家和观看者身上，而不在动物身上。" },
  { id: "logic", label: "按逻辑 / 数量", color: INK, fits: ["h", "j", "l"], note: "「数不清的」是数量，「等等」是列表的尾巴，「包括在本分类中的」干脆指向分类自身。" },
];

function Grid({ lit, color, letters, onPick, picked }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 8 }}>
    {CATS.map(c => {
      const on = lit ? lit.includes(c.k) : true;
      return <button key={c.k} onClick={() => onPick && onPick(c.k)}
        style={{
          textAlign: "left", font: "inherit", fontSize: 14, lineHeight: 1.4, cursor: onPick ? "pointer" : "default",
          padding: "8px 10px", borderRadius: 12, border: `1.5px solid ${on && lit ? color : "var(--line)"}`,
          background: on && lit ? color + "18" : "var(--paper)", opacity: on ? 1 : .32, transition: ".25s",
          outline: picked === c.k ? `2px solid ${RED}` : "none",
        }}>
        <span style={{ fontFamily: "var(--serif)", fontWeight: 700, color: letters ? RED : "var(--muted)", marginRight: 6, fontSize: letters ? 17 : 14 }}>({c.k})</span>
        <span style={{ marginRight: 4 }}>{c.icon}</span>{c.zh}
      </button>;
    })}
  </div>;
}

function TryAxes() {
  const [ax, setAx] = useState(null);
  const a = AXES.find(x => x.id === ax);
  const [abc, setAbc] = useState(false);
  return <div style={{ display: "grid", gap: 12 }}>
    <p style={{ margin: 0 }}>挑一个你觉得「正常」的分类标准，看看它能接住几类动物：</p>
    <div className="seg" style={{ marginBottom: 0 }}>
      {AXES.map(x => <button key={x.id} className={ax === x.id ? "on" : ""} onClick={() => { setAx(x.id); setAbc(false); }}>{x.label}</button>)}
      <button className={abc ? "on" : ""} onClick={() => { setAbc(true); setAx(null); }}>🔤 唯一共同点？</button>
    </div>
    <Grid lit={a ? a.fits : null} color={a ? a.color : INK} letters={abc} />
    {a && <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
      <div style={{ flex: "0 0 220px" }}>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>覆盖率</div>
        <div style={{ height: 12, background: "var(--paper2)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ width: `${a.fits.length / 14 * 100}%`, height: "100%", background: a.color, transition: ".4s" }} />
        </div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>{a.fits.length} / 14</div>
      </div>
      <p style={{ margin: 0, flex: 1, minWidth: 240 }}>{a.note}</p>
    </div>}
    {abc && <p style={{ margin: 0 }}>把它们串在一起的，只剩下 <b style={{ color: RED }}>a、b、c、d……</b> 这一串字母。字母顺序是唯一可见的「秩序」，它恰恰掩盖了：这些类目之间<b>没有任何共同的地面</b>。福柯说，越界的不是哪一个类目，而是把它们一个接一个连起来的那个「和」。</p>}
    {!a && !abc && <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>提示：单看每一类都有清楚的意思。试完所有标准，你会发现没有一个能超过 4/14。</p>}
  </div>;
}

// 有共同场所的并置 vs 没有场所的并置
function MouthVsNowhere() {
  const [side, setSide] = useState(0);
  const words = ["Aspics", "Ammonites", "Axolotls", "Anacondas", "Annelids", "Amphipods"];
  const borges = ["(i) 发狂的", "(j) 数不清的", "(k) 驼毛笔画的", "(n) 像苍蝇的", "(a) 皇帝的", "(g) 流浪狗"];
  return <div style={{ display: "grid", gap: 10 }}>
    <div className="seg" style={{ marginBottom: 0 }}>
      <button className={side === 0 ? "on" : ""} onClick={() => setSide(0)}>👄 Eusthenes 的嘴</button>
      <button className={side === 1 ? "on" : ""} onClick={() => setSide(1)}>🈳 博尔赫斯的列表</button>
    </div>
    <svg key={side} viewBox="0 0 520 230" style={{ width: "100%", maxHeight: 280, background: "var(--paper)", borderRadius: 14 }}>
      {side === 0 ? <>
        <ellipse cx="260" cy="130" rx="210" ry="74" fill={RED + "14"} stroke={RED} strokeWidth="3" />
        <text x="260" y="42" textAnchor="middle" fontSize="14" fill={RED}>一张嘴 = 共同的「场所」</text>
        {words.map((w, i) => {
          const x = 110 + (i % 3) * 150, y = 112 + Math.floor(i / 3) * 44;
          return <text key={w} x={x} y={y} textAnchor="middle" fontSize="16" fill={INK} fontStyle="italic">{w}
            <animate attributeName="y" values={`${y - 70};${y}`} dur=".9s" begin={`${i * .15}s`} fill="freeze" />
            <animate attributeName="opacity" values="0;1" dur=".9s" begin={`${i * .15}s`} fill="freeze" />
          </text>;
        })}
        <text x="260" y="222" textAnchor="middle" fontSize="12" fill="var(--muted)">再怪的组合，只要有地方「放得下」（嘴、手术台），就只是新奇，不是不可思议</text>
      </> : <>
        <line x1="60" y1="190" x2="460" y2="190" stroke={INK} strokeWidth="2" strokeDasharray="8 8" opacity=".35" />
        <text x="260" y="212" textAnchor="middle" fontSize="13" fill="var(--muted)">（这里本该有一张「桌子」——它被拿走了）</text>
        {borges.map((w, i) => {
          const x = 90 + (i % 3) * 170, y = 60 + Math.floor(i / 3) * 70;
          return <text key={w} x={x} y={y} textAnchor="middle" fontSize="15" fill={INK}>{w}
            <animate attributeName="y" values={`${y};${y + 14 + i * 3};${y}`} dur={`${2.2 + i * .3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;.45;1" dur={`${2.6 + i * .2}s`} repeatCount="indefinite" />
          </text>;
        })}
      </>}
    </svg>
    <p style={{ margin: 0 }}>{side === 0
      ? "Eusthenes 宣布不吃的一长串 A 字头怪物，彼此毫不相干，但它们都在他的嘴里「同居」；超现实主义名句里雨伞和缝纫机的相遇也一样，靠手术台担保。荒诞，但有地方可站。"
      : "「发狂的」「数不清的」「用驼毛笔画的」能在哪里相遇？只能在念出它们的声音里、写下它们的纸上，也就是语言的「非场所」。不可能的不是这些东西挨在一起，而是让它们挨在一起的那块地面不存在。"}</p>
  </div>;
}

// 第 (h) 类的悖论：容器与内容无法稳定
function ParadoxH() {
  const [step, setStep] = useState(0);
  const small = CATS.filter(c => c.k !== "h");
  return <div style={{ display: "grid", gap: 10 }}>
    <svg viewBox="0 0 520 240" style={{ width: "100%", maxHeight: 290, background: "var(--paper)", borderRadius: 14 }}>
      <rect x="20" y="20" width="480" height="200" rx="18" fill="none" stroke={INK} strokeWidth="2" opacity=".5" />
      <text x="34" y="40" fontSize="13" fill="var(--muted)">整部分类（容器）</text>
      {small.map((c, i) => {
        const x = 60 + (i % 7) * 66, y = 80 + Math.floor(i / 7) * 80;
        const inH = step >= 1;
        return <g key={c.k}>
          <circle cx={x} cy={y} r="20" fill={inH ? RED + "22" : "var(--card)"} stroke={inH ? RED : INK} strokeWidth="1.5" />
          <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fill={INK} fontWeight="700">{c.k}</text>
        </g>;
      })}
      {step >= 1 && <rect x="34" y="52" width="452" height="152" rx="14" fill="none" stroke={RED} strokeWidth="3" strokeDasharray="10 6">
        <animate attributeName="stroke-dashoffset" values="0;32" dur="1.2s" repeatCount="indefinite" /></rect>}
      <text x="260" y="232" textAnchor="middle" fontSize="13" fill={step >= 1 ? RED : INK}>
        {step === 0 ? "(h)「包括在本分类中的」——它自己放在哪里？" : step === 1 ? "(h) 要包住所有被分类的动物 → 其他 13 类全掉进 (h) 里" : "(h) 既是格子之一，又是装下所有格子的盒子：「在……之中」失效了"}
      </text>
    </svg>
    <div className="seg" style={{ marginBottom: 0 }}>
      {["① 提问", "② (h) 吞下一切", "③ 结论"].map((l, i) => <button key={i} className={step === i ? "on" : ""} onClick={() => setStep(i)}>{l}</button>)}
    </div>
    <p style={{ margin: 0 }}>{[
      "这一类明显在暗示我们熟悉的自指悖论。如果每只动物都属于这张表的某一格，那它们也都「包括在本分类中」——",
      "于是其他所有格子，似乎都应该落进 (h) 这一格里面。那 (h) 又在什么「空间」里存在？容器与内容的关系无法稳定下来。",
      "福柯的结论：荒诞摧毁了列举中的「和」，因为它让「在……之中」变得不可能。分类需要一个能把东西分进去的空间，而这里连这个空间都没了。",
    ][step]}</p>
  </div>;
}

const MODES = [
  { label: "① 找一个共同标准", el: <TryAxes /> },
  { label: "② 有场所 vs 没场所", el: <MouthVsNowhere /> },
  { label: "③ 第 (h) 类的悖论", el: <ParadoxH /> },
];

export default function Encyclopedia() {
  const [i, setI] = useState(0);
  return <div className="card" style={{ display: "grid", gap: 14 }}>
    <div className="tabs" style={{ marginBottom: 0, flexWrap: "wrap" }}>
      {MODES.map((m, j) => <button key={j} className={i === j ? "on" : ""} onClick={() => setI(j)}>{m.label}</button>)}
    </div>
    <div>{MODES[i].el}</div>
    <div style={{ borderTop: "1px solid var(--line)", paddingTop: 10, fontSize: 15, color: "var(--muted)" }}>
      被拿走的东西，福柯叫它<C id="tabula">桌子（tabula）</C>：既是手术台，也是让思想把万物分门别类的「表」。
      这一笑让我们看见：我们自己的分类也站在某张看不见的桌子上——这就是<C id="experience_of_order">秩序的经验</C>。
    </div>
  </div>;
}
