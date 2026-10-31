// 第 7 章专属图解 ①：分节滑块 —— 从纽姆（无分节的纯发声）一路拖到文字
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", BLUE = "#2c4a6e", GOLD = "#b8862b", INK = "#1f1b16";

const STAGES = [
  {
    from: 0, name: "纽姆 · 自然之声", en: "Neume", cid: "neume", word: "a～～～～～～～～～",
    rousseau: "纯粹的呼气，无词的欢呼，只配献给上帝；也像婴儿学会说话之前那种只有语调的「语言」。没有间隔、没有断裂，现在永远持续。",
    derrida: "这是语言不可能抵达的界限：真的毫无分节，它就只是叫喊，不再是语言。卢梭自己说：「自然的声音是不分节的」，所以它们还不构成语言。",
  },
  {
    from: .15, name: "南方的原初语言 · 被唱出的话", en: "Southern tongue", cid: "north_south", word: "a～i～me～z～mo～i",
    rousseau: "元音为主，只插几个辅音填缝；声调繁多、节奏丰富，「与其说是说，不如说是唱」；靠格言而非论证，打动人而不说服人。",
    derrida: "卢梭全用条件式（would be）描述它：一种已经脱离叫喊、却尚未被分节败坏的语言，处在「已经」与「尚未」之间的神话时刻，既不在起源之前，也不在之后。",
  },
  {
    from: .4, name: "分节的语言", en: "Articulation", cid: "articulation", word: "ai · mez · moi",
    rousseau: "需要增多、事务复杂、知识增长，语言「用观念代替情感」，更规则、更清楚，但更啰嗦、更沉闷、更冷。他把这叫作堕落。",
    derrida: "分节不是从外面撞上来的意外：没有分节就没有言语、没有歌，连音乐都没有。语言「诞生于自身退化的过程」，变成文字就是语言变成语言。",
  },
  {
    from: .65, name: "北方 / 现代语言", en: "Northern tongue", cid: "north_south", word: "ai · dez · moi",
    rousseau: "第一句话不再是「爱我」而是「帮帮我」。法语、英语、德语「更适合写而不是说」，读我们比听我们更有乐趣：辅音把声调啃光了。",
    derrida: "北方不是力量的简单衰减，而是力量内部的冲突：需要借助劳动去压抑、转移欲望，把歌打碎成分节。激情没有消失，只是被替换了。",
  },
  {
    from: .85, name: "文字", en: "Writing", cid: "accent_marks", word: "AIDEZ-MOI",
    rousseau: "重音符号、标点想把失去的语调补回来，可「声调已经丢了，人们才发明重音符号」：这只是给声调的尸体化妆。",
    derrida: "语言越分节就越可写。分节同时让言语和文字成为可能，所以「在字素之前没有音素」。文字只是给这种间隔起的另一个名字。",
  },
];

const X0 = 20, X1 = 580, BASE = 122;

function wave(t) {
  const segs = t < .12 ? 1 : Math.min(8, 2 + Math.round(t * 7));
  const gap = t < .12 ? 0 : .08 + .32 * t;
  const w = (X1 - X0) / segs;
  const A = 48 * (1 - .65 * t);
  const pts = [];
  for (let k = 0; k <= 560; k++) {
    const x = X0 + k;
    const u = ((x - X0) % w) / w;
    let y = BASE;
    const silent = u < gap / 2 || u > 1 - gap / 2;
    if (!silent) {
      const env = Math.sin(Math.PI * (u - gap / 2) / (1 - gap)); // 每段淡入淡出
      const accent = 1 + (1 - t) * .55 * Math.sin(x / 37);       // 声调起伏随 t 减弱
      y = BASE + A * accent * (segs === 1 ? 1 : env) * Math.sin(x * .22);
      // 辅音：每段开头一阵高频「噪声」
      const onset = (u - gap / 2) / (1 - gap);
      if (t > .3 && onset < .14) y += 22 * t * Math.sin(x * 2.7) * (1 - onset / .14);
    }
    pts.push(`${k ? "L" : "M"}${x},${y.toFixed(1)}`);
  }
  return { d: pts.join(""), segs, gap, w };
}

const Meter = ({ label, v, color }) => (
  <div style={{ fontSize: 14 }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}><span>{label}</span><span style={{ color: "var(--muted)" }}>{Math.round(v * 100)}%</span></div>
    <div style={{ height: 8, background: "var(--line)", borderRadius: 6, overflow: "hidden" }}>
      <div style={{ width: `${v * 100}%`, height: "100%", background: color, transition: "width .2s" }} /></div>
  </div>);

export default function ArticulationSlider() {
  const [v, setV] = useState(10);
  const [lens, setLens] = useState(false);
  const t = v / 100;
  const st = [...STAGES].reverse().find(s => t >= s.from);
  const { d, segs, gap, w } = wave(t);
  const writing = t >= .85;
  const letters = "AIDEZMOI";
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <svg viewBox="0 0 600 236" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        <line x1={X0} y1={BASE} x2={X1} y2={BASE} stroke={INK} opacity=".12" />
        <path d={d} fill="none" stroke={t < .5 ? RED : BLUE} strokeWidth="2.4" opacity={writing ? .22 : .9} strokeLinejoin="round" />
        {writing && Array.from({ length: segs }).map((_, i) => {
          const x = X0 + i * w + w * gap / 2, bw = w * (1 - gap);
          return <g key={i}>
            <rect x={x} y={BASE - 34} width={bw} height={68} rx="6" fill="#fff" stroke={INK} strokeWidth="1.5" />
            <text x={x + bw / 2} y={BASE + 13} textAnchor="middle" fontSize="34" fontFamily="var(--serif)" fill={INK}>{letters[i]}</text>
          </g>;
        })}
        {lens && Array.from({ length: 15 }).map((_, i) =>
          <line key={i} x1={X0 + (i + .5) * 560 / 15} y1="44" x2={X0 + (i + .5) * 560 / 15} y2="196" stroke={GOLD} strokeWidth="1.5" strokeDasharray="3 5">
            <animate attributeName="opacity" values=".25;.9;.25" dur="2.2s" begin={`${i * .1}s`} repeatCount="indefinite" />
          </line>)}
        <text x="20" y="226" fontSize="13" fill={RED}>◀ 声调 · 激情 · 歌（南）</text>
        <text x="580" y="226" fontSize="13" fill={BLUE} textAnchor="end">分节 · 需要 · 文字（北）▶</text>
        <text x="300" y="26" textAnchor="middle" fontSize="17" fontFamily="var(--serif)" fill={INK}>{st.word}</text>
      </svg>

      <input type="range" min="0" max="100" value={v} onChange={e => setV(+e.target.value)} aria-label="分节程度" style={{ width: "100%", accentColor: "var(--accent)" }} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}><C id={st.cid}>{st.name}</C> <span className="muted-it">{st.en}</span></div>
        <div className="seg" style={{ margin: 0 }}>
          <button className={lens ? "" : "on"} onClick={() => setLens(false)}>卢梭的眼睛</button>
          <button className={lens ? "on" : ""} onClick={() => setLens(true)}>🔍 德里达透镜：显示间隔</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
        <Meter label="声调 / 激情（卢梭说的「生命」）" v={1 - t * .85} color={RED} />
        <Meter label="清晰 / 理性" v={.1 + t * .9} color={BLUE} />
        <Meter label="可被书写的程度" v={.05 + t * .95} color={GOLD} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
        <div style={{ borderLeft: `4px solid ${RED}`, paddingLeft: 12 }}>
          <b>卢梭声明的读法：一路堕落</b>
          <p style={{ margin: "4px 0 0" }}>{st.rousseau}</p>
        </div>
        <div style={{ borderLeft: `4px solid ${GOLD}`, paddingLeft: 12, opacity: lens ? 1 : .55, transition: "opacity .3s" }}>
          <b>德里达读出的描述：间隔从一开始就在</b>
          <p style={{ margin: "4px 0 0" }}>{st.derrida}</p>
        </div>
      </div>
      {lens && <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
        金色虚线在每一个位置都存在，包括最左端：即使是「纯元音」，也要有音高的区别、长短的节拍、换气的停顿，才能被听成一首歌。
        滑块改变的只是间隔被看见的程度，而不是间隔有没有。</p>}
    </div>);
}
