// 译者序专属图解 2：先驱谱系 —— 德里达从每个人那里继承了什么、又推进/批评了什么
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", INK = "#1f1b16", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3d6b4a", VIOLET = "#5b4a7a";

const P = [
  { id: "hegel", name: "黑格尔", en: "Hegel", tag: "序言 · 扬弃", color: VIOLET, erased: "序言 / 扬弃",
    got: "序言问题本身：黑格尔一边宣布「别把序言当真」，一边不停写序言。他的「扬弃」(Aufhebung) 让序言被正文收回、词被意义收回，像儿子被父亲认领。德里达称他为「第一位文字哲学家」。",
    push: "黑格尔把父与子、正文与序言的圆圈闭合了。德里达让这个结构两端敞开：文本没有稳定的起点和终点，每次阅读都是下一次阅读的序言；种子不被父亲收回，而是四处撒落（播撒）。",
    cid: "preface_paradox" },
  { id: "nietzsche", name: "尼采", en: "Nietzsche", tag: "隐喻 · 游戏", color: RED, erased: "认识 knowing",
    got: "对真理、意义、存在的系统性怀疑：真理是「被遗忘了自己是幻象的幻象」，像磨光了头像的硬币。认识就是「把不同的东西弄成相同」，一种无止境的解读。还有：颠倒对立、主动遗忘、肯定式的游戏。",
    push: "德里达追问：尼采把「隐喻」扩张到一切言说，「隐喻」会不会变成意义生成的新名字，而不再是对它的批判？更好的做法是把隐喻、解读、真理也放到抹除之下——斯皮瓦克认为尼采对主体的质疑已朝这个方向走。",
    cid: "differance" },
  { id: "freud", name: "弗洛伊德", en: "Freud", tag: "踪迹 · 延迟", color: GREEN, erased: "心灵 psyche",
    got: "意识不是主人；无意识是彻底的他者。「神秘书写板」把心灵描绘成一个书写空间：知觉本身已是铭写，时间感来自这台机器断续的运作；记忆痕迹要很久以后才「事后」起作用。还有梦的「肚脐」——文本中解不开的结。",
    push: "弗洛伊德仍在形而上学的概念里工作，「无意识」本身就是一个形而上学的名字。德里达借他的洞见，却要解构他的概念；也拒绝把文字学说成一场对整个西方的「宏观精神分析」。",
    cid: "mystic_pad" },
  { id: "heidegger", name: "海德格尔", en: "Heidegger", tag: "打叉 · 解构", color: BLUE, erased: "存在 Being",
    got: "在「存在」一词上打叉、让字与叉号并存的做法；对「在场形而上学」的拆除（Destruktion）；读一位哲学家时，不看他说了什么，而看文本实际完成了什么、作者没能掌控什么。",
    push: "海德格尔仍怀念一个本源之词：他的「存在」虽超出一切能指，却像一个统摄一切的「先验所指」，带着神学意味。德里达打叉的是「踪迹」——它不是主词，只是某种从未在场的东西留下的痕。",
    cid: "transcendental_signified" },
  { id: "husserl", name: "胡塞尔", en: "Husserl", tag: "声音 · 自我在场", color: GOLD, erased: "声音 / 活的当下",
    got: "德里达的第一本书就是翻译并导读胡塞尔《几何学的起源》。胡塞尔的「活的当下」里已有一种「延迟意识」、自我区分——延异的雏形；他也发现言语可以在没有直观的情况下有意义。",
    push: "胡塞尔用内心独白中的「声音」来保证自我在场。德里达顺着胡塞尔自己的逻辑反读：意义必须在说话者与对象都缺席时仍能运作——「我」这个词说出来时，「我」的死亡在结构上已被包含。声音其实是按文字的结构构成的。",
    cid: "logocentrism" },
  { id: "saussure", name: "索绪尔", en: "Saussure", tag: "差异 · 符号", color: BLUE, erased: "符号 sign",
    got: "符号是一个差异结构：同一个音位由两个人说出并不相同，它的身份只在于与其他音位的差异；语音能指与书写能指一样是约定的。这一洞见足以「解构先验所指」。",
    push: "索绪尔却规定语言学只研究言语，把文字当外衣；他提出了二元符号，却没有把它放到抹除之下。所以他「不是文字学家」——第 2 章会详细展开。",
    cid: "trace" },
  { id: "levistrauss", name: "列维-斯特劳斯", en: "Lévi-Strauss", tag: "修补 · 怀旧", color: GREEN, erased: "修补 bricolage",
    got: "「修补术」(bricolage)：用手边现成的旧工具干活，明知它们有局限，仍拿来拆掉它们所属的旧机器。这很像德里达对待形而上学概念的策略。",
    push: "列维-斯特劳斯以为人类学家可以挑工具，背后还有一个「工程师」的理想。德里达认为根本不存在工程师，一切知识都是修补；他还批评列维-斯特劳斯怀念「无文字的纯真社会」——这是第二部分的主战场。",
    cid: "bricolage" },
  { id: "lacan", name: "拉康", en: "Lacan", tag: "能指 · 真理", color: VIOLET, erased: "真理 / 菲勒斯",
    got: "拉康认为无意识像语言一样被结构，主体永远分裂、与欲望对象隔开，这与德里达很接近；他也是「文本问题」在精神分析中的推动者。",
    push: "德里达认为拉康把无意识当作「真理」的所在，又让菲勒斯成为统摄一切的「先验能指」。拉康说「信总会到达目的地」，德里达回答：它总是可能到不了——这就是「播撒」。",
    cid: "dissemination" },
];

export default function Lineage() {
  const [i, setI] = useState(3), p = P[i];
  const cx = 300, cy = 175, R = 135;
  const pos = P.map((_, j) => { const a = -Math.PI / 2 + j * 2 * Math.PI / P.length; return [cx + R * 1.55 * Math.cos(a), cy + R * Math.sin(a)]; });
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <svg viewBox="0 0 600 350" style={{ width: "100%", maxHeight: 400, background: "var(--paper)", borderRadius: 14 }}>
        {P.map((x, j) => {
          const [x1, y1] = pos[j], on = i === j;
          return <line key={"l" + x.id} x1={x1} y1={y1} x2={cx} y2={cy} stroke={on ? x.color : INK} strokeWidth={on ? 3.5 : 1.2}
            opacity={on ? .9 : .18} strokeDasharray={on ? "10 8" : "none"}>
            {on && <animate attributeName="stroke-dashoffset" values="36;0" dur="1s" repeatCount="indefinite" />}
          </line>;
        })}
        <circle cx={cx} cy={cy} r="46" fill={INK} />
        <text x={cx} y={cy - 2} textAnchor="middle" fontSize="18" fill="#fff" fontFamily="var(--serif)">德里达</text>
        <text x={cx} y={cy + 18} textAnchor="middle" fontSize="11" fill="#fff" opacity=".7">Derrida</text>
        {P.map((x, j) => {
          const [px, py] = pos[j], on = i === j;
          return <g key={x.id} onClick={() => setI(j)} style={{ cursor: "pointer" }}>
            <rect x={px - 56} y={py - 22} width="112" height="44" rx="22" fill={on ? x.color : "#fff"} stroke={x.color} strokeWidth="2" />
            <text x={px} y={py - 2} textAnchor="middle" fontSize="15" fill={on ? "#fff" : INK}>{x.name}</text>
            <text x={px} y={py + 14} textAnchor="middle" fontSize="10.5" fill={on ? "#fff" : INK} opacity=".75">{x.tag}</text>
          </g>;
        })}
      </svg>
      <div style={{ fontSize: 13, color: "var(--muted)", textAlign: "center" }}>点击任一人名查看</div>
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>{p.name} <span className="muted-it">{p.en}</span>
          <span style={{ fontSize: 14, marginLeft: 10, color: p.color }}>被放到抹除之下的词：<s>{p.erased}</s></span></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14, marginTop: 8 }}>
          <div style={{ borderLeft: `4px solid ${p.color}`, paddingLeft: 12 }}>
            <b>⬇ 德里达继承了什么</b><p style={{ margin: "4px 0 0", fontSize: 15 }}>{p.got}</p></div>
          <div style={{ borderLeft: `4px dashed ${p.color}`, paddingLeft: 12 }}>
            <b>➜ 又在哪里推进 / 批评</b><p style={{ margin: "4px 0 0", fontSize: 15 }}>{p.push}</p></div>
        </div>
        <p style={{ margin: "8px 0 0", fontSize: 15, color: "var(--muted)" }}>相关概念：<C id={p.cid} /></p>
      </div>
    </div>);
}
