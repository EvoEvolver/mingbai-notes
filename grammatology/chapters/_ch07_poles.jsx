// 第 7 章专属图解 ②：南方 vs 北方的语言地图 —— 卢梭声明的两个固定极 vs 德里达读出的滑动极
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", BLUE = "#2c4a6e", GOLD = "#b8862b", INK = "#1f1b16";

const POLES = {
  south: {
    color: RED, icon: "☀️", name: "南方", rows: [
      ["气候与土地", "温暖、丰饶，几乎没有冬天；自然替人做了大部分事"],
      ["谁生出谁", "需要由激情生出（激情在先）"],
      ["第一句话", "「爱我」（aimez-moi），最早的话语是情歌"],
      ["声音的样子", "元音、声调、抑扬，像歌；生动、响亮、雄辩，却常因力量而晦涩"],
      ["人聚在哪里", "水井与泉边：取水、饮牲口，相遇，节庆"],
      ["与文字的关系", "一写下来就失去生命和温度：「意义只有一半在词里，力量全在声调里」"],
      ["激情的种类", "爱与温柔，耽于逸乐"],
    ],
  },
  north: {
    color: BLUE, icon: "❄️", name: "北方", rows: [
      ["气候与土地", "寒冷、贫瘠，冬天漫长；人要拼命才能活下去"],
      ["谁生出谁", "激情由需要生出（需要在先）"],
      ["第一句话", "「帮帮我」（aidez-moi）：不是让人感动，而是让人明白"],
      ["声音的样子", "辅音、分节；清楚但单调、刺耳、喧闹，清晰来自词汇而非结构"],
      ["人聚在哪里", "火塘边：为了过冬互相帮忙，劳动、约定，也围着火跳舞"],
      ["与文字的关系", "更适合写而不是说；「读我们比听我们更有乐趣」"],
      ["激情的种类", "激情没有消失，而是被劳动压抑、转移成易怒、焦躁"],
    ],
  },
};

// 德里达模式：一条从北到南的梯子，点任意一级作为参照点
const LADDER = [
  { name: "极北（拉普兰）", note: "卢梭：绝对的北方就是死亡。" },
  { name: "德国 / 英国", note: "卢梭把德语、英语和法语一起归为「更适合写」的现代北方语言。" },
  { name: "法国（温带）", note: "《爱弥儿》：只有温带的人才能长全，所以选一个法国学生。差异只能从一个「中间点」被看见。" },
  { name: "意大利 / 普罗旺斯", note: "卢梭：这里的人先做手势再说话，借此吸引听众。" },
  { name: "阿拉伯 / 波斯", note: "卢梭：宣示神圣奥秘、给人民立法的人，必须讲阿拉伯语或波斯语。" },
  { name: "「绝对的南方」", note: "卢梭想要的那个唯一、固定的起源。但在这条梯子上，它也只是一级。" },
];

function Globe({ pick, setPick }) {
  return (
    <svg viewBox="0 0 260 280" style={{ width: "100%", maxWidth: 300, justifySelf: "center" }}>
      <circle cx="130" cy="140" r="96" fill="var(--paper)" stroke={INK} strokeOpacity=".25" strokeWidth="2" />
      <ellipse cx="130" cy="140" rx="96" ry="22" fill="none" stroke={GOLD} strokeDasharray="4 5" />
      <text x="130" y="112" textAnchor="middle" fontSize="11" fill={GOLD}>温带 · 观察者</text>
      <g>
        <line x1="130" y1="22" x2="130" y2="258" stroke={INK} strokeWidth="1.5" strokeDasharray="2 4" />
        <animateTransform attributeName="transform" type="rotate" values="-6 130 140;6 130 140;-6 130 140" dur="6s" repeatCount="indefinite" />
      </g>
      {[["north", 40, "北极 · 需要"], ["south", 240, "南极 · 激情"]].map(([k, y, lab]) => {
        const p = POLES[k], on = pick === k;
        return <g key={k} style={{ cursor: "pointer" }} onClick={() => setPick(k)}>
          <circle cx="130" cy={y} r={on ? 30 : 24} fill={p.color} opacity={on ? 1 : .55}>
            {on && <animate attributeName="r" values="28;32;28" dur="1.6s" repeatCount="indefinite" />}
          </circle>
          <text x="130" y={y + 7} textAnchor="middle" fontSize="20">{p.icon}</text>
          <text x="130" y={k === "north" ? 12 : 278} textAnchor="middle" fontSize="13" fill={p.color} fontWeight="700">{lab}</text>
        </g>;
      })}
    </svg>);
}

export default function NorthSouth() {
  const [mode, setMode] = useState(0);
  const [pick, setPick] = useState("south");
  const [ref, setRef] = useState(2);
  const p = POLES[pick];
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg" style={{ margin: 0 }}>
        <button className={mode === 0 ? "on" : ""} onClick={() => setMode(0)}>① 卢梭的声明：两个固定的极</button>
        <button className={mode === 1 ? "on" : ""} onClick={() => setMode(1)}>② 德里达读出的描述：滑动的极</button>
      </div>

      {mode === 0 && <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, alignItems: "center" }}>
        <Globe pick={pick} setPick={setPick} />
        <div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 22, color: p.color, marginBottom: 6 }}>{p.icon} {p.name}的语言（点地球两极切换）</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
            <tbody>{p.rows.map(([a, b]) =>
              <tr key={a} style={{ borderTop: "1px solid var(--line)" }}>
                <td style={{ padding: "6px 8px 6px 0", color: "var(--muted)", whiteSpace: "nowrap", verticalAlign: "top" }}>{a}</td>
                <td style={{ padding: "6px 0" }}>{b}</td></tr>)}</tbody>
          </table>
          <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--muted)" }}>
            卢梭的声明：语言只在南方真正「形成」，北方只是「变形」。他给南方语言的篇幅是北方的十倍。</p>
        </div>
      </div>}

      {mode === 1 && <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>↑ 北　点任意一级，把它当作「我站的地方」</div>
          {LADDER.map((l, i) => {
            const rel = i < ref ? "north" : i > ref ? "south" : "here";
            const col = rel === "north" ? BLUE : rel === "south" ? RED : GOLD;
            return <button key={i} onClick={() => setRef(i)} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, cursor: "pointer",
              border: `2px solid ${col}`, background: rel === "here" ? "#fbf3df" : "var(--card)", borderRadius: 10,
              padding: "8px 12px", font: "inherit", transition: "all .25s",
            }}>
              <span>{l.name}</span>
              <b style={{ color: col, fontSize: 13 }}>{rel === "north" ? "❄️ 对我来说是北方" : rel === "south" ? "☀️ 对我来说是南方" : "📍 我在这里"}</b>
            </button>;
          })}
          <div style={{ fontSize: 13, color: "var(--muted)" }}>↓ 南</div>
        </div>
        <div style={{ display: "grid", gap: 10, alignContent: "start" }}>
          <div className="callout key" style={{ margin: 0 }}><b>{LADDER[ref].name}</b><div>{LADDER[ref].note}</div></div>
          <p style={{ margin: 0 }}>换一个站点，同一个地方就从「北」变成「南」。德里达的结论：南北对立是<b>关系性的、结构性的</b>，不是自然的、实体的；
            它不是把现成的语言分成两堆，而是一根划过<b>每一种语言内部</b>的参照轴。「北方可以成为更北之地的南方」，推到极端，北方就是南方的南方。</p>
          <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
            卢梭描述了这种滑动，却声明有一个「绝对的南方」作为唯一起源。德里达要测量的，正是<C id="description_declaration">描述与声明</C>之间的这道裂缝。</p>
        </div>
      </div>}
    </div>);
}
