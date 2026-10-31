// 第 9 章专属图解 3：人的三对复本——可翻面、可自动摇摆的「双面硬币」
import { useEffect, useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a";

const PAIRS = [
  {
    id: "et", tab: "经验 ⇄ 先验", sec: "IV", color: GOLD, cid: "empirico_transcendental",
    faces: [
      { icon: "🔬", name: "经验的人", role: "对象面", sub: "被研究的标本",
        text: "生理学研究他的感官、神经和知觉机制；历史学、经济学研究他的幻象与意识形态。在这一面，人是一堆可以测量、可以解释的经验内容。" },
      { icon: "🔭", name: "先验的人", role: "主体面", sub: "使认识可能的条件",
        text: "可正是这些感官结构和历史条件，又被拿来说明「认识为什么可能、边界在哪里」。在这一面，人成了一切知识的前提——康德意义上的「先验」被搬进了人身上。" },
    ],
    swing: "认识的条件，要到人身上的经验内容里去找；经验内容一被找到，又被抬升为条件。硬币刚落下一面，就又翻了回去。",
    trapTitle: "想把硬币按在一面：两种「天真」",
    traps: [
      { name: "实证主义（归结）", text: "让对象的真理决定话语的真理：人被「归结」为经验事实。" },
      { name: "末世论（许诺）", text: "让话语预先勾勒尚在形成的真理：人是一个「被许诺」的真理。" },
    ],
    note: <>孔德与马克思表明两者在考古学上不可分：人「既被归结又被许诺」。现象学的<C id="actual_experience">实际经验分析</C>想站在中间，结果把两面都收下了。</>,
    book: "「准先验感性论」从感知与神经运动图式中发现认识的自然；「准先验辩证论」从人类古老的幻象中发现认识的历史。",
  },
  {
    id: "cu", tab: "我思 ⇄ 非思", sec: "V", color: BLUE, cid: "modern_cogito",
    faces: [
      { icon: "💡", name: "我思", role: "主体面", sub: "自觉的思想",
        text: "人是会思考、也许唯一会思考的存在。思想要照亮一切，把昏暗的东西变成「为我」的东西——这是认识者的一面。" },
      { icon: "🌑", name: "非思", role: "对象面", sub: "思想够不着的厚度",
        text: "可我思总嵌在比它古老的语言、尚未开始就已逃离我的劳动、规定着我死亡的生命里。这片昏暗既在思想之内又在它之外——是人身上那个被认识、却从未被认尽的部分。" },
    ],
    swing: "思想每照亮一块非思，就改变了它，也改变了自己；于是非思后退、又生出新的非思。现代我思因而不是一次性的确证，而是一项永远重新开始的任务——思考本身就成了行动。",
    trapTitle: "两面都站不住",
    traps: [
      { name: "笛卡尔式的透明我思", text: "把错误、梦、疯狂收为「思想」而化解，直通「我在」。现代人做不到：我既是又不是我说的语言。" },
      { name: "纯粹客观的惰性", text: "把人当作永远不会抵达自我意识的物。也做不到：恰恰是人在思考这一切。" },
    ],
    note: <>非思是人的<C id="unthought">孪生他者</C>：黑格尔叫它 An sich（自在），叔本华叫它无意识，马克思叫它异化的人，胡塞尔叫它隐含物、沉积物。</>,
    book: "「我能说我就是我所说的这门语言吗？」——语言、劳动、生命三问，问出的不是「我在」，而是「我是什么」。",
  },
  {
    id: "or", tab: "退隐 ⇄ 回归", sec: "VI", color: GREEN, cid: "retreat_return_origin",
    faces: [
      { icon: "🌒", name: "起源的退隐", role: "对象面", sub: "人总是迟到者",
        text: "想追问自己作为活物、劳动者、说话者的开端，人找到的总是「早已开始」：生命早于他，世界被耕作了几千年，词语比一切记忆更古老。在这一面，人是被时间抛在后面的东西，「没有祖国，没有日期」。" },
      { icon: "🌕", name: "起源的回归", role: "主体面", sub: "时间从人这里展开",
        text: "可正因为人没有起源，他成了时间得以流动、物得以「开始」的那个开口。起源被推到前方，变成思想要一步步走近、永远临近却永不抵达的「回归」。" },
    ],
    swing: "起源越往后退，思想越把它当作前方的目标；越往前追，它又越往后退。人与「使他存在的东西」永远不同时——有限性在这里显露为人与时间的不可逾越的关系。",
    trapTitle: "两种「回归」",
    traps: [
      { name: "圆满的回归", text: "黑格尔、马克思、斯宾格勒：思想绕完一圈，在终点认出自己，回到它出发的海洋。" },
      { name: "极远处的回归", text: "荷尔德林、尼采、海德格尔：只在诸神隐去、荒漠扩大的最远处，起源才随退隐而被释放——「最远即最近」。" },
    ],
    note: <>对比古典：18 世纪的起源是可以重建的「理想发生」——以物易物、动作语言。现代起源则<C id="retreat_return_origin">永远退隐</C>。</>,
    book: "人把劳动施于被耕作了几千年的世界，用比记忆更古老的词，造出从未被说过的句子。",
  },
];

const css = `
.c9-coin{width:230px;height:230px;perspective:900px;cursor:pointer;margin:0 auto}
.c9-in{position:relative;width:100%;height:100%;transition:transform .9s cubic-bezier(.4,.1,.2,1);transform-style:preserve-3d}
.c9-face{position:absolute;inset:0;border-radius:50%;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.18), inset 0 0 0 10px rgba(255,255,255,.35)}
.c9-face.b{transform:rotateY(180deg)}
.c9-face .ic{font-size:46px;line-height:1.1}
.c9-face .nm{font-family:var(--serif);font-size:26px;font-weight:700;color:#fff}
.c9-face .rl{font-size:13px;color:#fff;opacity:.9;border:1px solid rgba(255,255,255,.6);border-radius:99px;padding:0 10px;margin-top:4px}
.c9-sw{display:flex;align-items:center;gap:10px;justify-content:center;font-size:14px;margin-top:10px}
.c9-sw span{padding:2px 10px;border-radius:99px;border:1.5px solid var(--line);transition:.4s}
.c9-sw span.on{color:#fff}
.c9-pend{display:inline-block;animation:c9p 1.7s ease-in-out infinite alternate}
@keyframes c9p{from{transform:translateX(-6px)}to{transform:translateX(6px)}}
.c9-traps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
.c9-traps div{background:var(--paper);border-radius:12px;padding:10px 14px;font-size:15px}
`;

export default function Doubles() {
  const [p, setP] = useState(0), [side, setSide] = useState(0), [auto, setAuto] = useState(false);
  useEffect(() => { setSide(0); }, [p]);
  useEffect(() => { if (!auto) return; const t = setInterval(() => setSide(s => 1 - s), 1800); return () => clearInterval(t); }, [auto]);
  const d = PAIRS[p], f = d.faces[side];
  return <div className="card" style={{ display: "grid", gap: 16 }}>
    <style>{css}</style>
    <div className="seg" style={{ marginBottom: 0 }}>{PAIRS.map((x, j) =>
      <button key={x.id} className={p === j ? "on" : ""} onClick={() => setP(j)}>{x.sec} · {x.tab}</button>)}</div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, alignItems: "center" }}>
      <div>
        <div className="c9-coin" onClick={() => setSide(1 - side)} title="点击翻面">
          <div className="c9-in" style={{ transform: `rotateY(${side * 180}deg)` }}>
            {d.faces.map((x, k) =>
              <div key={k} className={"c9-face" + (k ? " b" : "")}
                style={{ background: k ? `radial-gradient(circle at 35% 30%, ${d.color}cc, #1f1b16)` : `radial-gradient(circle at 35% 30%, ${d.color}, ${d.color}99)` }}>
                <div className="ic">{x.icon}</div><div className="nm">{x.name}</div><div className="rl">{x.role} · {x.sub}</div>
              </div>)}
          </div>
        </div>
        <div className="c9-sw">
          <span className={side === 0 ? "on" : ""} style={side === 0 ? { background: d.color, borderColor: d.color } : {}}>{d.faces[0].name}</span>
          <span className="c9-pend">⇄</span>
          <span className={side === 1 ? "on" : ""} style={side === 1 ? { background: "#1f1b16", borderColor: "#1f1b16" } : {}}>{d.faces[1].name}</span>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10 }} className="seg">
          <button onClick={() => { setAuto(false); setSide(1 - side); }}>🪙 翻面</button>
          <button className={auto ? "on" : ""} onClick={() => setAuto(!auto)}>{auto ? "⏸ 停止摇摆" : "▶ 让它摇摆"}</button>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 13, color: d.color, fontWeight: 700, letterSpacing: ".1em" }}>当前这一面 · {f.role}</div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 24 }}>{f.icon} {f.name} <span className="muted-it" style={{ fontSize: 16 }}>{f.sub}</span></div>
        <p style={{ margin: "6px 0 12px", minHeight: 110 }}>{f.text}</p>
        <div style={{ borderLeft: `4px solid ${d.color}`, paddingLeft: 12 }}>
          <b>为什么停不下来：</b>{d.swing}
        </div>
      </div>
    </div>

    <div>
      <div style={{ fontFamily: "var(--serif)", fontWeight: 700, marginBottom: 6 }}>{d.trapTitle}</div>
      <div className="c9-traps">{d.traps.map(t => <div key={t.name}><b style={{ color: d.color }}>{t.name}</b><br />{t.text}</div>)}</div>
      <p style={{ margin: "10px 0 4px", fontSize: 15 }}>{d.note}</p>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>📖 书中一例：{d.book}　→ 概念卡：<C id={d.cid}>{d.tab}</C></p>
    </div>
  </div>;
}
