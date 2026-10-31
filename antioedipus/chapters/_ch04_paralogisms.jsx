// 第 4 章专属图解（二）：精神分析的谬误卡片 + 「这句话犯了哪个谬误？」小测
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GREEN = "#3c6b4a";

const CARDS = [
  {
    no: "1", name: "外推", en: "Paralogism of extrapolation", syn: "连接综合", cid: "paralogism_extrapolation",
    front: "从可拆卸的部分对象，跳到一个被拆下来的、超越的完整对象（阳具 / 专制能指），再由它给每个欲望位置分配「缺失」。",
    role: "俄狄浦斯的「形式因」：让三角形得以成形、得以复制。",
    back: "欲望的部分对象本来什么都不缺；它们彼此连接、互相切割，不需要一个高高在上的「1」来让它们有意义。",
  },
  {
    no: "2", name: "双重束缚", en: "Paralogism of the double bind", syn: "析取综合", cid: "double_bind",
    front: "只允许两条路：要么内化象征的分化（「正常」），要么坠入想象的未分化（「神经症」）——而两条路都是俄狄浦斯。",
    role: "俄狄浦斯的「方法」：像摔跤里的锁喉，把无意识的两头都锁死。",
    back: "包含性的析取：不必在两端中选一个，而是肯定两端，在它们之间滑行。精神分裂分析不是要「更好地解决」俄狄浦斯，而是让这个问题不再被提出。",
  },
  {
    no: "3", name: "应用", en: "Paralogism of application", syn: "合取综合", cid: "paralogism_application",
    front: "在社会场的各种角色（老板、警察、殖民者、国家）与家庭角色之间建立一一对应，把「出发集合」折叠成「目的集合」：爸爸-妈妈-我。",
    role: "俄狄浦斯的「前提条件」：而它本身又预设了一次隔离性的投注——「我们是自己人」。",
    back: "游牧的合取：历史上的专名是强度区上的效应。不是父亲被投射到老板身上，而是老板被应用到父亲身上。",
  },
  { no: "4", name: "位移", en: "Displacement", syn: "下一章", next: true, front: "在下一节（第 5 章）中登场：被压抑的东西被歪曲成「乱伦欲望」的形象。" },
  { no: "5", name: "事后", en: "The afterward", syn: "下一章", next: true, front: "在下一章登场：把社会的、实际的因素说成童年俄狄浦斯之「后」才来的东西。" },
];

const ERRORS = [
  ["匮乏 lack", "欲望缺它想要的对象", "欲望的符号生产实在，是欲望在现实中的位置"],
  ["律法 law", "没有律法就没有欲望", "欲望的符号是力量（puissance）的符号，不是律法的符号"],
  ["能指 signifier", "欲望服从于一个专制能指（阉割之笔）", "欲望的符号从不「意指」，它是多维、多义的「点-符号」"],
];

const QUIZ = [
  { s: "「你对甜食的迷恋、对夜跑的上瘾，其实都在弥补同一个缺失。」", a: 0, why: "把一串各自运转的连接（甜食、夜跑……）都归到一个「共同的、缺席的东西」之下，正是外推。" },
  { s: "「你要么好好处理和父亲的关系、成为成熟的大人，要么就会一直陷在和母亲的共生里。」", a: 1, why: "两条路（象征的分化 / 想象的未分化）都通向俄狄浦斯：典型的双重束缚。" },
  { s: "「你讨厌你的上司，是因为他让你想起了你爸。」", a: 2, why: "把社会场中的角色（上司）一一对应到家庭角色（父亲）：应用。书里正相反——是老板被应用到父亲身上。" },
  { s: "「希特勒之所以能煽动群众，是因为他在群众面前扮演了父亲。」", a: 2, why: "精神分析式历史把「伟人」与「群众」都用父母形象解释，把历史-政治内容折叠成家庭三角：应用。" },
  { s: "「你既然不想要父亲的位置，那就只能退回到无差别的婴儿状态。」", a: 1, why: "它用「未分化」来威胁，迫使你接受「分化」：钟摆的两极都是俄狄浦斯。" },
  { s: "「所有这些部分都只是某个完整之人的碎片，你真正想要的是那个人。」", a: 0, why: "从可拆卸的部分对象跳到被拆下来的完整对象，并由此引入缺失：外推。" },
];

function QuizGame() {
  const [i, setI] = useState(0), [pick, setPick] = useState(null), [score, setScore] = useState(0);
  const q = QUIZ[i], done = i >= QUIZ.length;
  if (done) return <div className="card" style={{ textAlign: "center" }}>
    <p style={{ fontFamily: "var(--serif)", fontSize: 20 }}>答对 {score} / {QUIZ.length}</p>
    <button className="opt" style={{ width: "auto", display: "inline-block" }} onClick={() => { setI(0); setPick(null); setScore(0); }}>再来一次</button>
  </div>;
  return <div className="card">
    <div style={{ fontSize: 13, color: "var(--muted)" }}>诊断练习 {i + 1} / {QUIZ.length}（句子均为本页编写的示意，不是书中引文）</div>
    <p style={{ fontFamily: "var(--serif)", fontSize: 19, margin: "8px 0 10px" }}>{q.s}</p>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {CARDS.slice(0, 3).map((c, j) => <button key={j} disabled={pick !== null}
        className={"opt" + (pick !== null && j === q.a ? " right" : pick === j ? " wrong" : "")}
        style={{ width: "auto", flex: "1 1 140px", textAlign: "center" }}
        onClick={() => { setPick(j); if (j === q.a) setScore(score + 1); }}>{c.name}<small style={{ display: "block", color: "var(--muted)" }}>{c.syn}</small></button>)}
    </div>
    {pick !== null && <>
      <p className="qwhy">{pick === q.a ? "✅ " : "❌ "}{q.why}</p>
      <button className="opt" style={{ width: "auto" }} onClick={() => { setI(i + 1); setPick(null); }}>下一句 →</button>
    </>}
  </div>;
}

export default function Paralogisms() {
  const [flip, setFlip] = useState({});
  return <div style={{ display: "grid", gap: 16 }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
      {CARDS.map(c => {
        const f = flip[c.no];
        return <div key={c.no} className="card" onClick={() => !c.next && setFlip({ ...flip, [c.no]: !f })}
          style={{ cursor: c.next ? "default" : "pointer", opacity: c.next ? .6 : 1, borderTop: `4px solid ${c.next ? "var(--line)" : f ? GREEN : RED}`, padding: 16, minHeight: 230 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--serif)", fontSize: 30, color: c.next ? "var(--muted)" : RED }}>{c.no}</span>
            <small style={{ color: "var(--muted)" }}>{c.syn}</small>
          </div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 19 }}>{c.cid ? <span onClick={e => e.stopPropagation()}><C id={c.cid}>{c.name}</C></span> : c.name}</div>
          <div className="muted-it" style={{ fontSize: 12 }}>{c.en}</div>
          {!f ? <>
            <p style={{ fontSize: 14, margin: "8px 0" }}>{c.front}</p>
            {c.role && <p style={{ fontSize: 13, margin: 0, color: RED }}>{c.role}</p>}
            {!c.next && <small style={{ color: "var(--muted)" }}>点击翻面：精神分裂分析怎么说 ↻</small>}
          </> : <>
            <p style={{ fontSize: 14, margin: "8px 0", color: GREEN }}>🌱 {c.back}</p>
            <small style={{ color: "var(--muted)" }}>再点一次翻回 ↻</small>
          </>}
        </div>;
      })}
    </div>

    <div className="card">
      <b style={{ fontFamily: "var(--serif)", fontSize: 18 }}>三个错误，其实是同一个错误</b>
      <p style={{ margin: "4px 0 10px", fontSize: 14, color: "var(--muted)" }}>第 6 节把关于欲望的错误归结为三个词：匮乏、律法、能指——一种「虔诚的」唯心主义无意识观。</p>
      <div style={{ display: "grid", gap: 8 }}>
        {ERRORS.map(([n, wrong, right]) => <div key={n} style={{ display: "grid", gridTemplateColumns: "minmax(90px,.6fr) 1fr 1fr", gap: 8, fontSize: 14, alignItems: "center" }}>
          <b>{n}</b>
          <span style={{ background: "#fbeee9", borderRadius: 8, padding: "6px 10px" }}>✗ {wrong}</span>
          <span style={{ background: "#e6f1e8", borderRadius: 8, padding: "6px 10px" }}>✓ {right}</span>
        </div>)}
      </div>
    </div>

    <QuizGame />
  </div>;
}
