// 第 2 章图解 C：赖希之问——群众为何欲望自己的压迫？三种回答逐一翻开
import { useState } from "react";
import { C } from "@kit";

const ANSWERS = [
  {
    who: "常见回答", tag: "被骗了", verdict: "赖希拒绝", color: "#6b6257",
    text: "群众无知、被宣传蒙蔽、产生了错觉，所以才支持法西斯。只要启蒙他们、揭穿谎言，问题就解决了。",
    judge: "赖希最深刻的地方，就是拒绝这个解释：群众不是无辜的受骗者。在某个时刻、某些条件下，他们是真的「想要」法西斯。需要解释的是欲望本身的这种倒错。",
  },
  {
    who: "赖希自己的退路", tag: "理性的社会 + 非理性的欲望", verdict: "D&G 批评", color: "#b8862b",
    text: "社会生产本身是（或应当是）理性的；出问题的是欲望里那点非理性、被压抑的部分。精神分析只负责解释社会场中「负面的、主观的、被抑制的」那一块。",
    judge: "D&G 认为赖希在这里倒退了：他又把世界劈成两半——理性生产出来的真实对象 vs 非理性的幻想生产。于是他放弃了寻找欲望与社会场的「共同外延」。他缺的正是一个范畴：欲望生产。",
  },
  {
    who: "德勒兹 & 加塔利", tag: "欲望直接投资社会场", verdict: "本章立场", color: "#3c6b4a",
    text: "欲望不需要任何中介、升华或「投射」就直接投资（invest）生产力和生产关系。最压抑、最致命的社会形式，也是在特定条件下由欲望生产出来的。",
    judge: "所以政治哲学的根本问题仍是斯宾诺莎提出、赖希重新发现的那一个。它不能用「意识形态骗局」打发，只能用欲望来回答：要分析欲望在什么条件下投资了压迫性的社会机器，又在什么条件下能做出「反投资」，把革命的欲望接入社会场。",
  },
];

export default function ReichQuestion() {
  const [n, setN] = useState(0);
  return <div className="card" style={{ display: "grid", gap: 14 }}>
    <div style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: 14, padding: "18px 22px" }}>
      <div style={{ fontSize: 13, letterSpacing: ".15em", opacity: .7 }}>斯宾诺莎 → 赖希之问</div>
      <div style={{ fontFamily: "var(--serif)", fontSize: 22, margin: "6px 0" }}>人们为什么会像争取救赎一样，顽强地为自己的奴役而战？</div>
      <div style={{ opacity: .85, fontSize: 15 }}>为什么会有人喊出「多交税！少给面包！」？赖希说，令人惊讶的不是有人偷窃、有人罢工，而是挨饿的人并不总在偷，受剥削的人并不总在罢工。</div>
    </div>
    <div style={{ display: "grid", gap: 10 }}>
      {ANSWERS.map((a, i) => <div key={i} onClick={() => i === n && setN(n + 1)}
        style={{ border: "1px solid var(--line)", borderLeft: `5px solid ${a.color}`, borderRadius: 12, padding: "12px 16px", cursor: i < n ? "default" : "pointer", background: i < n ? "var(--card)" : "var(--paper)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <b style={{ color: a.color }}>回答 {i + 1} · {a.who}：{a.tag}</b>
          {i < n ? <span style={{ fontSize: 13, color: a.color, border: `1px solid ${a.color}`, borderRadius: 99, padding: "0 10px" }}>{a.verdict}</span>
            : <span style={{ fontSize: 13, color: "var(--muted)" }}>{i === n ? "点击翻开 ▸" : "🔒"}</span>}
        </div>
        {i < n && <><p style={{ margin: "6px 0" }}>{a.text}</p><p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>⚖️ {a.judge}</p></>}
      </div>)}
    </div>
    {n === 3 && <div className="callout key"><b>落点</b><div>这正是 <C id="desiring_social_identity">欲望生产 = 社会生产</C> 的政治后果：如果欲望和社会只是「平行」或互相投射，就永远解释不了法西斯；只有承认欲望直接投资社会场，<C id="reich_question">赖希之问</C>才可能有答案。</div></div>}
  </div>;
}
