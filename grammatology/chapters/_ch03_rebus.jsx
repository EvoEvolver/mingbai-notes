// 第 3 章专属图解 ①：画谜 rebus 生成器 —— 同一个图形，同时指向「物」和「音」
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16";

// 预设画谜。每个图块：pic 图，thing 它画的是什么物，sound 借来的音，note 补充
const PUZZLES = [
  {
    id: "aztec", tab: "📖 阿兹特克地名", origin: "书中例子",
    tiles: [
      { pic: "👄", thing: "嘴唇 tentli", sound: "te" },
      { pic: "🛤️", thing: "道路 otlim", sound: "o" },
      { pic: "🏠", thing: "房子 calli", sound: "cal" },
      { pic: "🦷", thing: "牙齿 tlanti", sound: "tlan" },
    ],
    literal: "嘴唇、道路、房子、牙齿：四样毫不相干的东西？",
    joined: "Te-o-cal-(ti)tlan",
    meaning: "一个地名 Teocaltitlan",
    lesson: "德里达引用的例子：阿兹特克人用四幅「物的图」拼出一个专名的读音。看上去是图画文字，实际已经在做音节分析，和字母的原理一样。",
  },
  {
    id: "cn", tab: "🧧 年画吉祥图", origin: "中文谐音",
    tiles: [
      { pic: "🦇", thing: "蝙蝠 · 蝠", sound: "fú" },
      { pic: "🦌", thing: "鹿", sound: "lù" },
      { pic: "🐟", thing: "鱼", sound: "yú" },
    ],
    literal: "一只蝙蝠、一头鹿、一条鱼：一幅动物画？",
    joined: "fú · lù · yú",
    meaning: "福 · 禄 · 余（有福、有禄、年年有余）",
    lesson: "春节年画里的蝙蝠、鹿和鱼都不是在画动物，画的是读音：福、禄、余。图画先是「物」，再被借作「音」，最后落到一个和原物毫不相干的意思上。",
  },
  {
    id: "en", tab: "🔤 英文画谜", origin: "现代例子",
    tiles: [
      { pic: "👁️", thing: "眼睛 eye", sound: "/aɪ/" },
      { pic: "🥫", thing: "罐头 can", sound: "/kæn/" },
    ],
    literal: "一只眼睛加一个罐头？",
    joined: "/aɪ/ + /kæn/",
    meaning: "I can（我能行）",
    lesson: "「我」和「能」都画不出来：它们是抽象的语法词。可借「眼睛」与「罐头」的读音一拼，抽象的东西就写出来了。表音化的第一步，往往就这样从图画里长出来。",
  },
];

// 「自己拼」的图块库。kind: phon=借音，ideo=表意（直接表示意思）
const BANK = [
  { k: "eye", pic: "👁️", thing: "眼睛 eye", sound: "I", kind: "phon" },
  { k: "can", pic: "🥫", thing: "罐头 can", sound: "can", kind: "phon" },
  { k: "bee", pic: "🐝", thing: "蜜蜂 bee", sound: "be", kind: "phon" },
  { k: "leaf", pic: "🍃", thing: "叶子 leaf", sound: "-lieve", kind: "phon" },
  { k: "sea", pic: "🌊", thing: "大海 sea", sound: "see", kind: "phon" },
  { k: "ewe", pic: "🐑", thing: "母羊 ewe", sound: "you", kind: "phon" },
  { k: "heart", pic: "❤️", thing: "一颗心", sound: "love", kind: "ideo" },
  { k: "four", pic: "4️⃣", thing: "数字四 four", sound: "for", kind: "phon" },
];
const KNOWN = {
  "eye,can": "I can（我能行）",
  "bee,leaf": "believe（相信）",
  "eye,sea,ewe": "I see you（我看见你）",
  "eye,heart,ewe": "I love you（我爱你）",
  "eye,can,sea,ewe": "I can see you（我能看见你）",
  "eye,heart,ewe,four,eye,can": "…有点乱，但你已经在「写」了",
  "bee,four": "before（之前）",
  "eye,bee,leaf": "I believe（我相信）",
  "eye,bee,leaf,eye,can": "I believe I can（我相信我能行）",
};

const MODES = [
  { label: "① 当图画看", hint: "只看「物」：每个图都在画一样东西。" },
  { label: "② 当声音读", hint: "把物的名字念出来，只留下声音。" },
  { label: "③ 当意思懂", hint: "声音连起来，指向一个和原物无关的意思。" },
];

function Tile({ t, mode, i }) {
  const showSound = mode >= 1;
  return (
    <g transform={`translate(${i * 120},0)`}>
      <rect x="6" y="6" width="104" height="104" rx="16" fill="#fff" stroke={mode === 0 ? GOLD : "#d9cfbd"} strokeWidth="2" />
      <text x="58" y="78" textAnchor="middle" fontSize="54" opacity={mode === 2 ? .45 : 1}>{t.pic}</text>
      <text x="58" y="134" textAnchor="middle" fontSize="13" fill={mode === 0 ? INK : "#8a7f70"}>{t.thing}</text>
      <g opacity={showSound ? 1 : 0} style={{ transition: "opacity .5s" }}>
        <line x1="58" y1="142" x2="58" y2="162" stroke={BLUE} strokeWidth="2" markerEnd="url(#ar3)" />
        <rect x="18" y="168" width="80" height="30" rx="15" fill={BLUE} opacity={mode === 1 ? 1 : .55} />
        <text x="58" y="189" textAnchor="middle" fontSize="15" fill="#fff" fontWeight="600">{t.sound}</text>
      </g>
    </g>);
}

function PresetView({ p }) {
  const [mode, setMode] = useState(0);
  const W = p.tiles.length * 120;
  return (
    <div>
      <div className="seg">{MODES.map((m, j) =>
        <button key={j} className={mode === j ? "on" : ""} onClick={() => setMode(j)}>{m.label}</button>)}</div>
      <svg viewBox={`-10 0 ${Math.max(W, 360) + 20} 270`} style={{ width: "100%", maxHeight: 300, background: "var(--paper)", borderRadius: 14 }}>
        <defs><marker id="ar3" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" fill={BLUE} /></marker></defs>
        <g transform={`translate(${(Math.max(W, 360) - W) / 2},0)`}>
          {p.tiles.map((t, i) => <Tile key={p.id + i} t={t} mode={mode} i={i} />)}
        </g>
        <g opacity={mode === 2 ? 1 : 0} style={{ transition: "opacity .5s" }}>
          <rect x={(Math.max(W, 360)) / 2 - 170} y="214" width="340" height="42" rx="21" fill={RED} />
          <text x={(Math.max(W, 360)) / 2} y="241" textAnchor="middle" fontSize="17" fill="#fff" fontWeight="700">{p.meaning}</text>
        </g>
        {mode === 0 && <text x={(Math.max(W, 360)) / 2} y="240" textAnchor="middle" fontSize="15" fill={GOLD}>{p.literal}</text>}
        {mode === 1 && <text x={(Math.max(W, 360)) / 2} y="240" textAnchor="middle" fontSize="16" fill={BLUE} fontWeight="600">{p.joined}</text>}
      </svg>
      <p style={{ margin: "10px 0 4px", color: "var(--muted)", fontSize: 15 }}>{MODES[mode].hint}</p>
      <p style={{ margin: 0 }}><b style={{ color: "var(--accent)" }}>{p.origin}：</b>{p.lesson}</p>
    </div>);
}

function Builder() {
  const [seq, setSeq] = useState(["eye", "heart", "ewe"]);
  const tiles = seq.map(k => BANK.find(b => b.k === k));
  const hit = KNOWN[seq.join(",")];
  const hasIdeo = tiles.some(t => t.kind === "ideo"), hasPhon = tiles.some(t => t.kind === "phon");
  return (
    <div>
      <p style={{ margin: "0 0 8px", color: "var(--muted)", fontSize: 15 }}>点下面的图块加入句子，点句子里的图块删除。试试拼出 I can / believe / I see you / before。</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {BANK.map(b => <button key={b.k} onClick={() => seq.length < 6 && setSeq([...seq, b.k])}
          style={{ border: "1px solid var(--line)", background: "var(--paper)", borderRadius: 12, padding: "4px 10px", cursor: "pointer", font: "inherit", fontSize: 14 }}>
          <span style={{ fontSize: 22, verticalAlign: "middle" }}>{b.pic}</span> {b.thing}</button>)}
        <button onClick={() => setSeq([])} style={{ border: 0, background: "none", color: "var(--accent)", cursor: "pointer", font: "inherit", fontSize: 14 }}>清空</button>
      </div>
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: 14, minHeight: 150 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {tiles.length === 0 && <span style={{ color: "var(--muted)" }}>（空）</span>}
          {tiles.map((t, i) => <button key={i} onClick={() => setSeq(seq.filter((_, j) => j !== i))} title="点击删除"
            style={{ width: 92, border: `2px solid ${t.kind === "ideo" ? GREEN : BLUE}`, background: "#fff", borderRadius: 14, padding: "6px 4px", cursor: "pointer", font: "inherit" }}>
            <div style={{ fontSize: 34 }}>{t.pic}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>物：{t.thing}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.kind === "ideo" ? GREEN : BLUE }}>{t.kind === "ideo" ? "义" : "音"}：{t.sound}</div>
          </button>)}
        </div>
        <div style={{ marginTop: 12, fontFamily: "var(--serif)", fontSize: 19 }}>
          读出来：<b>{tiles.map(t => t.sound).join(" ") || "…"}</b>
          {hit && <span style={{ color: RED }}> → {hit}</span>}
        </div>
      </div>
      <p style={{ margin: "10px 0 0", fontSize: 15 }}>
        <span style={{ color: BLUE, fontWeight: 700 }}>蓝框 = 借音</span>，<span style={{ color: GREEN, fontWeight: 700 }}>绿框 = 直接表意</span>。
        {hasIdeo && hasPhon
          ? " 你刚写的句子里，表音和表意混在同一套代码里，就像楔形文字：同一个符号时而读音、时而表意。所谓「表音文字」和「表意文字」从来不是两种纯粹的东西。"
          : " 试试把 ❤️ 放进去：它不借音，直接表示「爱」。表音与表意立刻混在了同一句里。"}
      </p>
    </div>);
}

export default function RebusMaker() {
  const [t, setT] = useState(0);
  const tabs = [...PUZZLES.map(p => p.tab), "🧩 自己拼"];
  return (
    <div className="card" style={{ display: "grid", gap: 6 }}>
      <div className="seg">{tabs.map((x, j) =>
        <button key={j} className={t === j ? "on" : ""} onClick={() => setT(j)}>{x}</button>)}</div>
      {t < PUZZLES.length ? <PresetView key={t} p={PUZZLES[t]} /> : <Builder />}
      <p style={{ margin: "10px 0 0", paddingTop: 10, borderTop: "1px solid var(--line)", fontSize: 15 }}>
        注意：切到「③ 当意思懂」时，图画并没有消失，只是变淡了。一个<C id="rebus">画谜</C>符号<b>同时</b>指向一件物和一个音，二者都不是它「真正的、唯一的」意思。
        这就是德里达说的：<C id="phoneticization">没有纯粹的表音文字</C>，也没有纯粹的图画文字。
      </p>
    </div>);
}
