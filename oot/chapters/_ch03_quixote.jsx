// 第 3 章小图解：堂吉诃德的「相似之眼」—— 书里的符号 vs 世界里的物
import { useState } from "react";

const PAIRS = [
  { world: "🐑", wt: "一群羊", book: "⚔️", bt: "一支军队" },
  { world: "🏚️", wt: "一家客栈", book: "🏰", bt: "一座城堡" },
  { world: "👩‍🌾", wt: "几个女仆", book: "👸", bt: "高贵的夫人" },
];

const PHASES = [
  { label: "第一部：读世界以证明书", text: "他在大地上搜寻一切能证明骑士小说为真的形状。最轻微的相像也被当作沉睡的符号唤醒——可这种相似永远站不住，证明一次次变成笑柄。" },
  { label: "不像怎么办？", text: "「不像」也有现成的模板：书里早写过魔法师会变戏法。于是每一处差异都被解释成被施了法的相似——反而又成了「书说得对」的证据。相似在这里已近乎疯狂。" },
  { label: "第二部：他成了书", text: "第二部里，人们已经读过第一部，认出他就是书中的主人公。塞万提斯的文本折回自身：堂吉诃德的真实不在词与世界的关系里，而只在词与词之间。语言获得了新的、只属于自己的力量。" },
];

export default function QuixoteLens() {
  const [eye, setEye] = useState(true);
  const [ph, setPh] = useState(0);
  return <div className="card" style={{ display: "grid", gap: 14 }}>
    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
      <div className="seg" style={{ marginBottom: 0 }}>
        <button className={eye ? "on" : ""} onClick={() => setEye(true)}>📕 堂吉诃德看见的</button>
        <button className={!eye ? "on" : ""} onClick={() => setEye(false)}>🌍 世界本来的</button>
      </div>
      <span style={{ color: "var(--muted)", fontSize: 14 }}>切换看看：书中的符号还「像」世界吗？</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
      {PAIRS.map((p, i) => <div key={i} style={{
        textAlign: "center", padding: "14px 6px", borderRadius: 14, transition: ".4s",
        background: eye ? "#fbf3df" : "var(--paper)", border: `2px ${eye ? "dashed" : "solid"} ${eye ? "var(--gold)" : "var(--line)"}`,
      }}>
        <div style={{ fontSize: 44, lineHeight: 1.1, transition: ".4s", transform: eye ? "scale(1.08)" : "none" }}>{eye ? p.book : p.world}</div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 17, marginTop: 6 }}>{eye ? p.bt : p.wt}</div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>{eye ? `（其实是${p.wt}）` : `（他读成了${p.bt}）`}</div>
      </div>)}
    </div>
    <div>
      <div className="seg">{PHASES.map((x, j) =>
        <button key={j} className={ph === j ? "on" : ""} onClick={() => setPh(j)}>{x.label}</button>)}</div>
      <p style={{ margin: 0 }}>{PHASES[ph].text}</p>
    </div>
  </div>;
}
