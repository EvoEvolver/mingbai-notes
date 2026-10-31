// 第 3 章专属图解 ③：欧洲眼中的「他者文字」—— 翻卡片：他们看到的 vs 德里达看穿的
import { useState } from "react";
import { C } from "@kit";

const CARDS = [
  {
    pic: "א", name: "希伯来字母", who: "维吉内尔（1586）", cid: "theological_prejudice",
    front: "这是最古老的文字，由上帝亲手写成。文字的起源是神圣的、自然的，不需要历史。",
    back: "神学偏见：把自己传统的文字当作文字本身。只要字母被看作神赐，它就不可能有历史，文字史也就无从谈起。第一步「去中心」，要等到人们读懂了非西方文字才发生。",
    tone: "#5b3f7a",
  },
  {
    pic: "字", name: "汉字", who: "莱布尼茨（1703 年致白晋）", cid: "chinese_prejudice",
    front: "汉字不依赖声音，像是聋子发明的；它按数、序、关系构造，是哲学的、理智的文字，正好做我的普遍文字的蓝本。",
    back: "汉字偏见：被赞美的「汉字」只是欧洲哲学方案投射出来的影子。莱布尼茨夸它，只为指出它的缺陷（字太多、要学一辈子），好让自己的普遍文字取而代之。德里达称之为一种「欧洲的幻觉」。",
    tone: "#9b2c1f",
  },
  {
    pic: "𓂀", name: "埃及象形文字", who: "基歇尔（1636）", cid: "hieroglyphist_prejudice",
    front: "象形文字不是由字母和词组成的普通文字，而是崇高的符号，一眼就能向智者呈现复杂的推理与神圣奥秘。",
    back: "象形文字偏见：表面是极度崇拜，效果却是拒绝破译。既然它神秘而崇高，就不必、也不该去把它还原为语音。直到瓦尔伯顿猛烈批评基歇尔，再到商博良，破译才真正可能。",
    tone: "#b8862b",
  },
];

function Flip({ c }) {
  const [f, setF] = useState(false);
  return (
    <div role="button" tabIndex={0} onClick={() => setF(!f)} style={{ cursor: "pointer", perspective: 1000, minHeight: 300 }}>
      <div style={{ position: "relative", height: "100%", minHeight: 300, transformStyle: "preserve-3d", transition: "transform .7s", transform: f ? "rotateY(180deg)" : "none" }}>
        <div className="card" style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderTop: `5px solid ${c.tone}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 44, fontFamily: "var(--serif)", color: c.tone, lineHeight: 1 }}>{c.pic}</span>
            <div><div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>{c.name}</div><div style={{ fontSize: 13, color: "var(--muted)" }}>{c.who}</div></div>
          </div>
          <div style={{ fontSize: 12, letterSpacing: ".15em", color: c.tone, margin: "14px 0 4px" }}>他们看到的</div>
          <p style={{ margin: 0, fontSize: 15 }}>「{c.front}」</p>
          <div style={{ position: "absolute", bottom: 14, right: 18, fontSize: 13, color: "var(--muted)" }}>点击翻面 ↻</div>
        </div>
        <div className="card" style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "#f3ede2", borderTop: `5px solid ${c.tone}` }}>
          <div style={{ fontSize: 12, letterSpacing: ".15em", color: c.tone, marginBottom: 6 }}>德里达看穿的</div>
          <p style={{ margin: 0, fontSize: 15 }}>{c.back}</p>
          <div onClick={e => e.stopPropagation()} style={{ position: "absolute", bottom: 14, right: 18, fontSize: 13 }}><C id={c.cid}>概念卡 →</C></div>
        </div>
      </div>
    </div>);
}

export default function EuroGaze() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 16 }}>
      {CARDS.map(c => <Flip key={c.name} c={c} />)}
    </div>);
}
