// 第 2 章专属图解：差异之网（踪迹）、延异双轴、索绪尔的内/外
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#6b6257", LINE = "#d9cdb6";

/* ---------------------------------------------------------------
   (A) 差异之网：一个符号的价值 = 它与其他符号的差异
---------------------------------------------------------------- */
const SIGNS = [
  { id: "猫", py: "māo", ini: "m", fin: "ao", tone: 1, gloss: "猫" },
  { id: "毛", py: "máo", ini: "m", fin: "ao", tone: 2, gloss: "毛发" },
  { id: "卯", py: "mǎo", ini: "m", fin: "ao", tone: 3, gloss: "卯时" },
  { id: "帽", py: "mào", ini: "m", fin: "ao", tone: 4, gloss: "帽子" },
  { id: "包", py: "bāo", ini: "b", fin: "ao", tone: 1, gloss: "包" },
  { id: "刀", py: "dāo", ini: "d", fin: "ao", tone: 1, gloss: "刀" },
  { id: "高", py: "gāo", ini: "g", fin: "ao", tone: 1, gloss: "高" },
  { id: "妈", py: "mā", ini: "m", fin: "a", tone: 1, gloss: "妈妈" },
  { id: "摸", py: "mō", ini: "m", fin: "o", tone: 1, gloss: "摸" },
  { id: "宝", py: "bǎo", ini: "b", fin: "ao", tone: 3, gloss: "宝贝" },
  { id: "报", py: "bào", ini: "b", fin: "ao", tone: 4, gloss: "报纸" },
  { id: "到", py: "dào", ini: "d", fin: "ao", tone: 4, gloss: "到达" },
];
const FEAT = {
  tone: { label: "声调", color: RED },
  ini: { label: "声母", color: BLUE },
  fin: { label: "韵母", color: GOLD },
};
function diff(a, b) {
  const d = [];
  if (a.tone !== b.tone) d.push("tone");
  if (a.ini !== b.ini) d.push("ini");
  if (a.fin !== b.fin) d.push("fin");
  return d;
}
function diffText(a, b, f) {
  if (f === "tone") return `${a.tone}声 ≠ ${b.tone}声`;
  if (f === "ini") return `${a.ini} ≠ ${b.ini}`;
  return `${a.fin} ≠ ${b.fin}`;
}

export function DifferenceWeb() {
  const [cid, setCid] = useState("猫");
  const [hover, setHover] = useState(null);
  const [noTone, setNoTone] = useState(false);
  const c = SIGNS.find(s => s.id === cid);
  const nbs = SIGNS.filter(s => s.id !== cid && diff(c, s).length === 1);
  const W = 680, H = 410, cx = W / 2, cy = H / 2 + 4, R = 142;
  const pos = nbs.map((s, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / nbs.length;
    const f = diff(c, s)[0];
    const merged = noTone && f === "tone";
    return { s, f, merged, x: merged ? cx + Math.cos(a) * 26 : cx + Math.cos(a) * R * 1.35, y: merged ? cy + Math.sin(a) * 18 : cy + Math.sin(a) * R };
  });
  const toneMates = pos.filter(p => p.f === "tone");
  const hv = pos.find(p => p.s.id === hover);
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 14, color: MUTED }}>选一个符号放到中心：</span>
        {SIGNS.map(s => <button key={s.id} className={"chip" + (s.id === cid ? " on" : "")}
          style={s.id === cid ? { background: INK, color: "#fff", borderColor: INK } : {}}
          onClick={() => { setCid(s.id); setHover(null); }}>{s.id} {s.py}</button>)}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        <text x="14" y="22" fontSize="12" fill={MUTED}>虚线连着只差一个特征的「邻居」：它们缺席，却在中心符号身上留下踪迹</text>
        {pos.map(p => {
          const col = FEAT[p.f].color, on = hover === p.s.id;
          return <g key={"l" + p.s.id + cid}>
            <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={col} strokeWidth={on ? 4 : 2}
              strokeDasharray="6 5" opacity={p.merged ? 0 : on ? 1 : .55}>
              <animate attributeName="stroke-dashoffset" values="22;0" dur="1.2s" repeatCount="indefinite" />
            </line>
            {!p.merged && <text x={(cx + p.x) / 2} y={(cy + p.y) / 2 - 6} textAnchor="middle" fontSize="12" fill={col}
              style={{ paintOrder: "stroke", stroke: "#f6f1e7", strokeWidth: 4 }}>{diffText(c, p.s, p.f)}</text>}
          </g>;
        })}
        {pos.map(p => {
          const col = FEAT[p.f].color, on = hover === p.s.id;
          return <g key={"n" + p.s.id + cid} style={{ cursor: "pointer", transition: "all .5s" }}
            onMouseEnter={() => setHover(p.s.id)} onMouseLeave={() => setHover(null)}
            onClick={() => setHover(hover === p.s.id ? null : p.s.id)}
            opacity={p.merged ? .35 : 1}>
            <circle cx={p.x} cy={p.y} r={on ? 34 : 30} fill="#fffdf8" stroke={col} strokeWidth={on ? 3 : 2} strokeDasharray="4 3" />
            <text x={p.x} y={p.y + 1} textAnchor="middle" fontSize="20" fill={INK} opacity=".7">{p.s.id}</text>
            <text x={p.x} y={p.y + 18} textAnchor="middle" fontSize="11" fill={MUTED}>{p.s.py}</text>
          </g>;
        })}
        <g>
          <circle cx={cx} cy={cy} r={noTone && toneMates.length ? 54 : 46} fill={INK}>
            <animate attributeName="r" values={noTone && toneMates.length ? "54;58;54" : "46;49;46"} dur="2.4s" repeatCount="indefinite" />
          </circle>
          <text x={cx} y={cy + 4} textAnchor="middle" fontSize="28" fill="#f6f1e7">
            {noTone && toneMates.length ? "?" : c.id}</text>
          <text x={cx} y={cy + 26} textAnchor="middle" fontSize="12" fill="#f7d79b">
            {noTone && toneMates.length ? [c, ...toneMates.map(p => p.s)].map(s => s.id).join("/") : c.py}</text>
        </g>
        {Object.entries(FEAT).map(([k, v], i) =>
          <g key={k} transform={`translate(${14 + i * 92},${H - 16})`}>
            <line x1="0" y1="-4" x2="22" y2="-4" stroke={v.color} strokeWidth="3" strokeDasharray="6 4" />
            <text x="28" y="0" fontSize="12" fill={INK}>{v.label}之差</text>
          </g>)}
      </svg>
      <label style={{ fontSize: 15, display: "flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
        <input type="checkbox" checked={noTone} onChange={e => setNoTone(e.target.checked)} />
        思想实验：假如汉语里「声调」这组对立不存在
      </label>
      <div style={{ background: "var(--card)", borderRadius: 12, padding: "12px 16px", borderLeft: `4px solid ${RED}` }}>
        {hv ? <>
          <b>{c.id}（{c.py}）不是 {hv.s.id}（{hv.s.py}）</b>：两者只差一个{FEAT[hv.f].label}（{diffText(c, hv.s, hv.f)}）。
          「{hv.s.gloss}」此刻并不在场，但正是「不是它」这一点，参与构成了「{c.gloss}」的身份——这就是缺席者留下的<C id="trace">踪迹</C>。
        </> : noTone && toneMates.length ? <>
          声音一点没变，{c.py.replace(/[āáǎà]/, "a").replace(/[ōóǒò]/, "o")} 却不再能区分 {[c, ...toneMates.map(p => p.s)].map(s => s.id).join("、")}——它们塌缩成一个模糊的「?」。
          可见一个符号的意义不在它自己的声音「实体」里，而在系统中的<C id="difference">差异</C>里：抽掉一组对立，意义就跟着消失。
        </> : <>
          「{c.id}」的意义 = <b>不是</b> {nbs.map(s => s.id).join("、不是 ")}……
          它身上没有任何「自带」的正面内容，只有与缺席者之间的一道道差异。把鼠标移到外圈的符号上，看它在中心留下的<C id="trace">踪迹</C>。
        </>}
      </div>
    </div>);
}

/* ---------------------------------------------------------------
   (B) 延异 = 空间上的「区分」 + 时间上的「推迟」
---------------------------------------------------------------- */
const CHAIN = [
  { w: "咬死了", alts: ["咬伤了", "吓跑了"], read: [["谁咬死了谁？还不知道", 100]],
    note: "第一个符号到场，但它的意义悬而未决：主语、宾语都还在后面。它与「咬伤了」「吓跑了」的区别（纵轴），已经在默默起作用。" },
  { w: "猎人的", alts: ["农夫的", "狼的"], read: [["……咬死了猎人的什么？", 100]],
    note: "第二个符号到场，前一个符号的意义仍然没有关上——它在等下一个。" },
  { w: "狗", alts: ["羊", "马"], read: [["猎人的狗被（某物）咬死了", 50], ["那只咬死了猎人的狗", 50]],
    note: "整句看似完整了，却裂成两种读法。意义没有「到达」，而是分岔。" },
  { w: "跑了", alts: ["死了", "叫了"], read: [["那只咬死了猎人的狗跑了", 92], ["猎人的狗被咬死……跑了？（读不通）", 8]],
    note: "后来的符号回过头改写了先前的意义——这正是德里达借弗洛伊德「事后性」（Nachträglichkeit）想到的时间结构：先前的「现在」被后来者决定。" },
  { w: "——语法课的歧义例句", alts: ["——新闻标题", "——小说开头"], read: [["这句话并不在讲某只狗，而是被「引用」来示范歧义", 80], ["那只咬死了猎人的狗跑了", 20]],
    note: "新的符号再次挪动一切：这句话从「讲狗」变成「被举作例子」。意义又被往后推了一格。" },
  { w: "……", alts: [], read: [["？——还有下一个符号", 100]],
    note: "原则上永远可以再来一个符号（语境、引用、反讽……）。意义从不在某一刻完全「在场」，它总是被推迟到下一个符号那里——这就是延异。" },
];

export function DifferanceAxes() {
  const [n, setN] = useState(1);
  const W = 760, H = 330, x0 = 70, y0 = 210, step = 96, TW = 80;
  const k = n - 1, cur = CHAIN[k];
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        <defs>
          <marker id="arrD" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={INK} />
          </marker>
        </defs>
        {/* axes */}
        <line x1={x0 - 30} y1={y0 + 50} x2={W - 20} y2={y0 + 50} stroke={INK} strokeWidth="1.5" markerEnd="url(#arrD)" />
        <text x={W - 24} y={y0 + 70} textAnchor="end" fontSize="13" fill={INK}>时间：符号一个接一个到来 → 推迟（defer）</text>
        <line x1={x0 - 30} y1={y0 + 50} x2={x0 - 30} y2="18" stroke={INK} strokeWidth="1.5" markerEnd="url(#arrD)" />
        <text x={x0 - 22} y="24" fontSize="13" fill={INK}>系统：每个位置上「不是它」的其他可能 → 区分（differ）</text>

        {CHAIN.slice(0, n).map((t, i) => {
          const x = x0 + i * step, last = i === k;
          const age = k - i;
          return <g key={i} opacity={last ? 1 : Math.max(.35, 1 - age * .18)}>
            {t.alts.map((a, j) => <g key={a}>
              <line x1={x + TW / 2} y1={y0 - 16} x2={x + TW / 2} y2={y0 - 44 - j * 46 + 12} stroke={GOLD} strokeDasharray="3 4" />
              <text x={x + TW / 2} y={y0 - 44 - j * 46} textAnchor="middle" fontSize="12.5" fill={GOLD} fontStyle="italic">
                {a.length > 7 ? a.slice(0, 7) + "…" : a}</text>
            </g>)}
            <rect x={x} y={y0 - 16} width={TW} height="34" rx="9" fill={last ? INK : "#fffdf8"} stroke={INK} strokeWidth="1.2" />
            <text x={x + TW / 2} y={y0 + 6} textAnchor="middle" fontSize={t.w.length > 6 ? 11 : 15} fill={last ? "#f6f1e7" : INK}>
              {t.w.length > 6 ? t.w.slice(0, 6) + "…" : t.w}</text>
            {i < k && <path d={`M${x + TW},${y0 + 1} L${x + step},${y0 + 1}`} stroke={MUTED} strokeWidth="1.2" />}
          </g>;
        })}
        {/* deferred meaning box */}
        {(() => {
          const x = x0 + n * step;
          const fx = Math.min(x, W - 108);
          return <g>
            <path d={`M${x0 + k * step + TW},${y0 + 1} L${fx - 2},${y0 + 1}`} stroke={RED} strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrD)">
              <animate attributeName="stroke-dashoffset" values="18;0" dur="1s" repeatCount="indefinite" />
            </path>
            <rect x={fx} y={y0 - 22} width="102" height="46" rx="10" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="6 4">
              <animate attributeName="opacity" values="1;.35;1" dur="1.8s" repeatCount="indefinite" />
            </rect>
            <text x={fx + 51} y={y0 - 2} textAnchor="middle" fontSize="12" fill={RED}>完整的意义？</text>
            <text x={fx + 51} y={y0 + 14} textAnchor="middle" fontSize="11" fill={RED}>还在下一个符号里</text>
          </g>;
        })()}
        <text x={x0} y={y0 + 40} fontSize="11.5" fill={MUTED}>越早的符号越淡：它们没有消失，而是作为「保留」（踪迹）留在当下</text>
      </svg>

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 14, color: MUTED }}>拖动：让符号一个个到来</span>
        <input type="range" min="1" max={CHAIN.length} value={n} onChange={e => setN(+e.target.value)} style={{ flex: 1, minWidth: 200, accentColor: RED }} />
        <b style={{ fontFamily: "var(--serif)" }}>{n} / {CHAIN.length}</b>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <div style={{ fontSize: 13, color: MUTED }}>此刻读者手里的候选意义：</div>
        {cur.read.map(([r, p]) =>
          <div key={r} style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: 10, alignItems: "center", fontSize: 15 }}>
            <span>{r}</span>
            <span style={{ background: "var(--paper2)", borderRadius: 99, height: 10, overflow: "hidden" }}>
              <span style={{ display: "block", height: "100%", width: p + "%", background: p >= 80 ? GREEN : GOLD, transition: "width .5s" }} /></span>
          </div>)}
      </div>
      <div style={{ background: "var(--card)", borderRadius: 12, padding: "12px 16px", borderLeft: `4px solid ${RED}`, fontSize: 15 }}>
        {cur.note}
      </div>
      <p style={{ margin: 0, fontSize: 14, color: MUTED }}>
        纵轴是<b style={{ color: GOLD }}>区分</b>：每个词靠「不是那些词」才有价值；横轴是<b style={{ color: RED }}>推迟</b>：意义总在等后来者。
        法语 <i>différer</i> 同时有这两个意思，德里达把 <i>différence</i> 改一个字母写成 <C id="differance"><i>différance</i></C>，把两者绑在一起。
      </p>
    </div>);
}

/* ---------------------------------------------------------------
   (C) 索绪尔的内 / 外 → 外部早已在内部
---------------------------------------------------------------- */
export function InsideOutside() {
  const [v, setV] = useState(0);
  const W = 640, H = 300;
  return (
    <div className="card">
      <div className="seg">{["① 索绪尔的划界（第六章）", "② 德里达：外部早已在内部"].map((o, j) =>
        <button key={j} className={v === j ? "on" : ""} onClick={() => setV(j)}>{o}</button>)}</div>
      <svg key={v} viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        {v === 0 ? <>
          <circle cx="230" cy="150" r="110" fill="#fffdf8" stroke={BLUE} strokeWidth="4" />
          <text x="230" y="120" textAnchor="middle" fontSize="16" fill={BLUE} fontWeight="700">语言的「内部系统」</text>
          <text x="230" y="148" textAnchor="middle" fontSize="14" fill={INK}>声音 ⟷ 意义</text>
          <text x="230" y="170" textAnchor="middle" fontSize="12" fill={MUTED}>「自然的、唯一真实的纽带」</text>
          <text x="230" y="196" textAnchor="middle" fontSize="12" fill={MUTED}>活的言语 · 灵魂 · 在场</text>
          <rect x="430" y="100" width="170" height="100" rx="14" fill="#fbeee9" stroke={RED} strokeWidth="2" strokeDasharray="7 5" />
          <text x="515" y="135" textAnchor="middle" fontSize="16" fill={RED} fontWeight="700">文字</text>
          <text x="515" y="158" textAnchor="middle" fontSize="12" fill={INK}>外衣 · 伪装 · 图像</text>
          <text x="515" y="178" textAnchor="middle" fontSize="12" fill={INK}>「符号的符号」</text>
          <line x1="345" y1="150" x2="425" y2="150" stroke={INK} strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="385" y="140" textAnchor="middle" fontSize="11" fill={MUTED}>只是再现</text>
          <path d="M440,215 C400,260 330,265 300,240" fill="none" stroke={RED} strokeWidth="2.5" markerEnd="url(#arrIO)">
            <animate attributeName="stroke-dasharray" values="0 300;300 0" dur="2.2s" repeatCount="indefinite" />
          </path>
          <text x="420" y="285" textAnchor="middle" fontSize="12" fill={RED}>可它偏偏「篡夺」、侵入：Lefébure 的 b 被念出来了</text>
          <defs><marker id="arrIO" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={RED} /></marker></defs>
        </> : <>
          <rect x="20" y="20" width="600" height="260" rx="20" fill="#f2ecf7" stroke={"#5b3f7a"} strokeWidth="2" strokeDasharray="2 6">
            <animate attributeName="stroke-dashoffset" values="0;16" dur="1.6s" repeatCount="indefinite" />
          </rect>
          <text x="320" y="48" textAnchor="middle" fontSize="16" fill="#5b3f7a" fontWeight="700">原文字（arche-writing）：差异 · 踪迹 · 间隔 · 延异</text>
          <circle cx="210" cy="158" r="80" fill="#fffdf8" stroke={BLUE} strokeWidth="3" strokeDasharray="10 6" />
          <text x="210" y="150" textAnchor="middle" fontSize="15" fill={BLUE} fontWeight="700">言语</text>
          <text x="210" y="172" textAnchor="middle" fontSize="12" fill={INK}>靠音位之间的差异运作</text>
          <rect x="360" y="105" width="190" height="120" rx="14" fill="#fffdf8" stroke={RED} strokeWidth="3" strokeDasharray="10 6" />
          <text x="455" y="155" textAnchor="middle" fontSize="15" fill={RED} fontWeight="700">狭义文字</text>
          <text x="455" y="178" textAnchor="middle" fontSize="12" fill={INK}>靠字形之间的差异运作</text>
          {[0, 1, 2, 3, 4].map(i => <line key={i} x1={302 + i * 2} y1={120 + i * 22} x2={358} y2={125 + i * 22} stroke="#5b3f7a" strokeWidth="1.4" strokeDasharray="3 3" opacity=".7">
            <animate attributeName="opacity" values=".2;.9;.2" dur="2s" begin={`${i * .3}s`} repeatCount="indefinite" /></line>)}
          <text x="320" y="268" textAnchor="middle" fontSize="12" fill={MUTED}>二者是同一种「书写」（差异的铭刻）的两种表现；边界线本身就是虚线</text>
        </>}
      </svg>
      <p style={{ margin: "10px 0 0", fontSize: 15 }}>
        {v === 0
          ? "索绪尔把语言学的对象限定为「口说的词」，把文字赶到外面当作「外衣」。但他又不得不花一整章去防范它——因为文字总在反过来改变发音。一个真正的「外部」，为什么需要这样严防死守？"
          : "一旦承认「语言中只有差异」，声音和字形就都不再是意义的天然载体。言语与狭义文字共享同一个更深的结构——被德里达称为原文字。所谓「篡夺」不是意外，而是因为言语从一开始就已经是某种书写。"}
      </p>
    </div>);
}
