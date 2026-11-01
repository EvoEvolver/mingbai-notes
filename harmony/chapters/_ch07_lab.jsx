// 第 7 章专属图解
//   NctClassifier：和弦外音分类器——一段旋律铺在和弦背景上，点每个音判断它是和弦音还是哪种外音，并对比「有 / 没有」外音的声音。
//   ApproachTarget：趋近和弦靶盘——原书图 7.4–7.8 的「十字图」：以目标和弦为临时主音，网格上各音按距离各就各位；
//                   点任一位置，选它背后的和弦族成员，听「趋近和弦 → 目标」，并看每个声部是共同音、半音还是全音趋近。
import { useEffect, useState } from "react";
import { play, stop, later, onStop, sequence, useAudioState, voiceChord, parseChord, parseNote, mod12, pcName } from "@kit/audio";

/* ───────────────────────── 和弦外音分类器 ───────────────────────── */

const TYPES = [
  { id: "ct", label: "和弦音", color: "#6b645a" },
  { id: "p", label: "经过音", color: "#c0392b" },
  { id: "n", label: "辅助音（邻音）", color: "#2f6db5" },
  { id: "cg", label: "换音（邻音组）", color: "#7b4bb3" },
  { id: "s", label: "延留音", color: "#b7791f" },
  { id: "ant", label: "先现音", color: "#2e8b57" },
  { id: "app", label: "倚音", color: "#d35400" },
];
const TY = Object.fromEntries(TYPES.map(t => [t.id, t]));
// 和弦背景（以拍为单位）
const CH = [
  { name: "C", at: 0, len: 4 }, { name: "Am", at: 4, len: 4 }, { name: "G7", at: 8, len: 4 },
  { name: "F", at: 12, len: 2 }, { name: "G7", at: 14, len: 2 }, { name: "C", at: 16, len: 4 },
];
// 旋律：[音, 起拍, 拍数, 类型, 去掉外音后的替代音, 说明, tied（与前一音连线）]
const MEL = [
  ["C5", 0, 1, "ct"], ["D5", 1, 1, "p", "C5", "C 与 E 相距三度，D 在弱拍上把它们级进连起来：从一个和弦音「路过」到另一个。"],
  ["E5", 2, 1, "ct"], ["F5", 3, 1, "n", "E5", "从 E 上行二度、再回到 E（下一小节 Am 的和弦音）：前后同一个音，形成向上的拱形——上邻音。"],
  ["E5", 4, 2, "ct"], ["A4", 6, 1, "ct"], ["C5", 7, 1, "ct"],
  ["C5", 8, 1, "s", "B4", "C 先在 Am 里作为和弦音出现（准备），用连线保持到 G7 的强拍上，与 B 形成冲突（延留），再级进下行到 B（解决）：典型的 4–3 延留。", true],
  ["B4", 9, 1, "ct"], ["D5", 10, 0.5, "ct"],
  ["E5", 10.5, 0.5, "cg", "D5", "D 的上方二度 E 与下方二度 C 先后出现，再回到 D：上下环绕的双辅助音，叫换音或邻音组。"],
  ["C5", 11, 0.5, "cg", "D5", "与前面的 E 成对：先上后下绕着 D 转一圈，回到 D。"],
  ["D5", 11.5, 0.5, "ct"],
  ["G5", 12, 1, "app", "F5", "没有准备、从 D 跳进而来，落在强拍上，紧贴着下方的和弦音 F 再级进解决——倚音。"],
  ["F5", 13, 1, "ct"], ["D5", 14, 1, "ct"], ["B4", 15, 0.5, "ct"],
  ["C5", 15.5, 0.5, "ant", "B4", "后一个和弦 C 的音提前在 G7 的弱拍上出现，并保持到 C 和弦：先现音。"],
  ["C5", 16, 4, "ct"],
].map(([note, at, len, type, alt, why, tied], k) => ({ k, note, midi: parseNote(note), at, len, type, alt: alt ? parseNote(alt) : null, why, tied }));

const LETTERS = "CDEFGAB";
const step = n => { const m = n.match(/^([A-G])(\d)$/); return LETTERS.indexOf(m[1]) + 7 * +m[2]; };
const BEAT = 0.5;   // 每拍秒数

export function NctClassifier() {
  useAudioState();
  const [ans, setAns] = useState({}), [sel, setSel] = useState(null), [msg, setMsg] = useState(null), [cur, setCur] = useState(-1), [guide, setGuide] = useState(false);
  useEffect(() => onStop(() => setCur(-1)), []);
  const voiced = (() => { let prev; return CH.map(c => { const v = voiceChord(c.name, { prev, lo: 52, style: "smooth" }); prev = v; return [36 + mod12(parseChord(c.name).root - 36), ...v]; }); })();
  const nct = MEL.filter(m => m.type !== "ct");
  const solved = MEL.filter(m => ans[m.k] === m.type).length;

  // 播放 [from, to) 拍区间；strip：去掉外音的集合（"all" 为全部去掉）
  const perform = (from, to, strip) => {
    stop();
    CH.forEach((c, i) => {
      const a = Math.max(c.at, from), b = Math.min(c.at + c.len, to);
      if (b > a) play(voiced[i], { at: (a - from) * BEAT, dur: (b - a) * BEAT * 0.98, velocity: 0.4 });
    });
    const ms = MEL.filter(m => m.at >= from && m.at < to);
    ms.forEach((m, i) => {
      const off = strip === "all" || (strip && strip.has(m.k));
      const pitch = off && m.alt != null ? m.alt : m.midi;
      // 连线的延留音：保留原样时不重新起音（由前一音延长）
      if (m.tied && !off && i > 0) return;
      let len = m.len;
      const nx = ms[i + 1];
      if (nx && nx.tied && !(strip === "all" || (strip && strip.has(nx.k)))) len += nx.len;
      play([pitch], { at: (m.at - from) * BEAT, dur: len * BEAT * 0.95, velocity: 0.85 });
    });
    ms.forEach(m => later(() => setCur(m.k), (m.at - from) * BEAT * 1000));
    later(() => setCur(-1), (to - from) * BEAT * 1000 + 100);
  };
  const choose = t => {
    if (!sel) return;
    if (t === sel.type) { setAns({ ...ans, [sel.k]: t }); setMsg({ ok: true, text: sel.type === "ct" ? `${sel.note.replace(/\d/, "")} 属于 ${chordAt(sel.at).name} 和弦：和弦音。` : sel.why }); }
    else setMsg({ ok: false, text: hintFor(sel, t) });
  };
  const chordAt = at => CH.find(c => at >= c.at && at < c.at + c.len);
  const hintFor = (m, t) => {
    const c = chordAt(m.at), pcs = parseChord(c.name).notes.map(mod12);
    const isCt = pcs.includes(mod12(m.midi));
    if (t === "ct") return `再看看：${c.name} 的和弦音是 ${pcs.map(p => pcName(p, "flat")).join("、")}，这个音不在里面。`;
    if (isCt) return `这个音在 ${c.name} 和弦里（${pcs.map(p => pcName(p, "flat")).join("、")}），它是和弦音。`;
    return "不对。留意它前后的音：是级进还是跳进？前面是否已经出现（准备）？落在强拍还是弱拍？";
  };

  // —— 画面：横轴是拍，纵轴是自然音级（A4–A5）
  const W = 34, X0 = 14, lo = step("A4"), hi = step("A5"), RH = 13, Y0 = 26;
  const y = s => Y0 + (hi - s) * RH;
  const Wtot = X0 + 20 * W + 10, Htot = Y0 + (hi - lo) * RH + 22;
  return <div className="card">
    <div className="au-ctrl">
      <button className="au-go" onClick={() => perform(0, 20, null)}>▶ 听原句</button>
      <button className="au-go" style={{ background: "#6b645a" }} onClick={() => perform(0, 20, "all")}>▶ 去掉全部外音</button>
      <button className={guide ? "on" : ""} onClick={() => setGuide(!guide)}>{guide ? "隐藏" : "显示"}和弦音参考线</button>
      <span className="au-hint">已判断 {solved} / {MEL.length} 个音（其中外音 {nct.length} 个）</span>
    </div>
    <svg viewBox={`0 0 ${Wtot} ${Htot}`} style={{ width: "100%", maxWidth: 760, userSelect: "none", display: "block" }}>
      {CH.map((c, i) => {
        const pcs = parseChord(c.name).notes.map(mod12);
        return <g key={i}>
          <rect x={X0 + c.at * W} y={Y0 - 22} width={c.len * W} height={Htot - Y0 + 18} fill={i % 2 ? "#f3efe6" : "#faf7f0"} stroke="var(--line)" />
          <text x={X0 + c.at * W + 6} y={Y0 - 8} fontSize="14" fontWeight="700" fill="var(--ink)">{c.name}</text>
          {guide && Array.from({ length: hi - lo + 1 }, (_, s) => lo + s).filter(s => pcs.includes(mod12(parseNote(LETTERS[s % 7] + Math.floor(s / 7))))).map(s =>
            <line key={s} x1={X0 + c.at * W + 2} x2={X0 + (c.at + c.len) * W - 2} y1={y(s)} y2={y(s)} stroke="#b9ad97" strokeDasharray="3 3" />)}
        </g>;
      })}
      {Array.from({ length: hi - lo + 1 }, (_, s) => lo + s).map(s => <text key={s} x={2} y={y(s) + 4} fontSize="8" fill="#a39a8a">{LETTERS[s % 7]}</text>)}
      {MEL.map(m => {
        const s = step(m.note), done = ans[m.k], t = done ? TY[done] : null, isSel = sel && sel.k === m.k, on = cur === m.k;
        const prev = MEL[m.k - 1];
        return <g key={m.k} style={{ cursor: "pointer" }} onClick={() => { setSel(m); setMsg(null); play([m.midi], { dur: 0.7 }); }}>
          {m.tied && prev && <path d={`M ${X0 + prev.at * W + 14} ${y(s) - 9} Q ${X0 + m.at * W} ${y(s) - 22} ${X0 + m.at * W + 12} ${y(s) - 9}`} fill="none" stroke="var(--ink)" strokeWidth="1.3" />}
          <rect x={X0 + m.at * W + 2} y={y(s) - 7} width={m.len * W - 4} height={14} rx={7}
            fill={on ? "var(--gold)" : t ? t.color : "#fff"} stroke={isSel ? "var(--accent)" : t ? t.color : "var(--ink)"} strokeWidth={isSel ? 3 : 1.4} />
          <text x={X0 + m.at * W + m.len * W / 2} y={y(s) + 4} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={t || on ? "#fff" : "var(--ink)"}>{m.note.replace(/\d/, "")}</text>
        </g>;
      })}
    </svg>
    <div className="au-hint">横轴是拍子，纵轴是音高；背景色块是和弦。点一个音（会响），再在下面选它的身份。</div>
    {sel && <div className="au-info">
      <div>选中：第 {Math.floor(sel.at / 4) + 1} 小节的 <b>{sel.note.replace(/\d/, "")}</b>（和弦 {chordAt(sel.at).name}，{sel.at % 1 ? "后半拍" : sel.at % 2 ? "弱拍" : "强拍"}）。它是——</div>
      <div className="au-ctrl">
        {TYPES.map(t => <button key={t.id} className={ans[sel.k] === t.id ? "on" : ""} style={{ "--c": t.color, color: ans[sel.k] === t.id ? undefined : t.color }} onClick={() => choose(t.id)}>{t.label}</button>)}
      </div>
      {msg && <div style={{ color: msg.ok ? "#2e7d32" : "var(--accent)" }}>{msg.ok ? "✓ " : "✗ "}{msg.text}</div>}
      {msg && msg.ok && sel.type !== "ct" && <div className="au-ctrl">
        <button className="au-go" onClick={() => perform(Math.max(0, Math.floor(sel.at / 2) * 2 - 2), Math.min(20, Math.floor(sel.at / 2) * 2 + 4), null)}>▶ 有这个外音</button>
        <button className="au-go" style={{ background: "#6b645a" }} onClick={() => perform(Math.max(0, Math.floor(sel.at / 2) * 2 - 2), Math.min(20, Math.floor(sel.at / 2) * 2 + 4), new Set(sel.type === "cg" ? MEL.filter(m => m.type === "cg").map(m => m.k) : [sel.k]))}>▶ 换成和弦音</button>
      </div>}
    </div>}
    <div className="au-ctrl" style={{ marginTop: 6 }}>
      {TYPES.slice(1).map(t => <span key={t.id} style={{ fontSize: 12, color: t.color, marginRight: 8 }}>● {t.label}</span>)}
    </div>
  </div>;
}

/* ───────────────────────── 趋近和弦靶盘 ───────────────────────── */

// 相对目标根音的音程 → 功能名称（原书图 7.8）、趋近类型（图 7.4–7.7）、可选的和弦族成员
const REL = {
  0: { fn: "主音", cat: "same", label: "同族和弦（变质）", opts: ["m", "7", "sus4", "+", "6", "°7"] },
  7: { fn: "属音", cat: "fifth", label: "五度趋近 · 属趋近", opts: ["7", "+7", "7b9", "13", "m7", "ø", "7b5"] },
  5: { fn: "下属音", cat: "fifth", label: "五度趋近 · 下属趋近", opts: ["m", "m6", "", "maj7", "m7", "ø"] },
  2: { fn: "上主音", cat: "whole", label: "二度趋近 · 上方全音", opts: ["m7", "ø", "7", "°7", "maj7"] },
  10: { fn: "下主音", cat: "whole", label: "二度趋近 · 下方全音", opts: ["7", "9", "maj7", "m7", "+"] },
  1: { fn: "上导音", cat: "half", label: "二度趋近 · 上方半音", opts: ["7", "maj7", "", "m7", "°7", "ø"] },
  11: { fn: "导音", cat: "half", label: "二度趋近 · 下方半音", opts: ["°7", "ø", "°", "7", "m7", "+"] },
  4: { fn: "中音", cat: "common", label: "共同音趋近 · 上方大三度", opts: ["m7", "m", "7", "+"] },
  3: { fn: "中音", cat: "common", label: "共同音趋近 · 上方小三度", opts: ["", "maj7", "7", "m"] },
  9: { fn: "下中音", cat: "common", label: "共同音趋近 · 下方小三度", opts: ["m7", "m", "7", "°7"] },
  8: { fn: "下中音", cat: "common", label: "共同音趋近 · 下方大三度", opts: ["", "maj7", "7", "m"] },
  6: { fn: "三全音（极音）", cat: "tri", label: "三全音位置（减七、三全音替换）", opts: ["°7", "ø", "7"] },
};
const CAT = {
  same: { c: "#3a3a3a", zh: "同族" }, fifth: { c: "#c0392b", zh: "五度" }, whole: { c: "#2f6db5", zh: "二度·全音" },
  half: { c: "#7b4bb3", zh: "二度·半音" }, common: { c: "#2e8b57", zh: "共同音" }, tri: { c: "#b7791f", zh: "三全音" },
};
const VIEWS = [
  { id: "all", label: "十字图（全部）", cats: ["fifth", "whole", "half", "common", "tri", "same"] },
  { id: "fifth", label: "五度趋近（图 7.4）", cats: ["fifth"] },
  { id: "second", label: "二度趋近（图 7.5）", cats: ["whole", "half"] },
  { id: "common", label: "共同音趋近（图 7.6）", cats: ["common", "tri", "same"] },
];
// 主要位置（网格坐标 i 向右 = 纯五度，j 向右上 = 大三度）；其余位置淡显
const MAIN = new Set(["0,0", "1,0", "-1,0", "0,1", "-1,1", "0,-1", "1,-1", "2,0", "-2,0", "-1,2", "1,-2", "-2,2", "2,-2", "0,2", "0,-2"]);
const ARROWS = [[1, 0], [-1, 0], [2, 0], [-2, 0], [-1, 2], [1, -2], [-2, 2], [2, -2]];
const TARGETS = [["C", 0, 0], ["D♭", 1, 1], ["D", 2, 1], ["E♭", 3, 2], ["E", 4, 2], ["F", 5, 3], ["F♯", 6, 3], ["G", 7, 4], ["A♭", 8, 5], ["A", 9, 5], ["B♭", 10, 6], ["B", 11, 6]];
const LETTER_STEP = [0, 1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6];
const NAT = [0, 2, 4, 5, 7, 9, 11];
// 按字母拼写：目标为 E♭ 时，上方半音拼成 F♭ 而不是 E；出现重升重降时退回常用拼法
function spell(tIdx, rel) {
  const [, tpc, tL] = TARGETS[tIdx];
  const L = (tL + LETTER_STEP[rel]) % 7, acc = mod12(tpc + rel - NAT[L]);
  if (acc === 0) return "CDEFGAB"[L];
  if (acc === 1) return "CDEFGAB"[L] + "♯";
  if (acc === 11) return "CDEFGAB"[L] + "♭";
  return pcName(tpc + rel, "flat");
}
const PRESETS = [
  { label: "ii7–V7–I", steps: [[2, "m7"], [7, "7"]], note: "最常用的二重趋近：二五替换。" },
  { label: "ii7–♭II7–I", steps: [[2, "m7"], [1, "7"]], note: "二五替换 + 三全音替换：低音半音下行。" },
  { label: "♭vi7–♭II7–I", steps: [[8, "m7"], [1, "7"]], note: "两步都做三全音替换（图 7.10 的第三条路线）。" },
  { label: "♭vi7–V7–I", steps: [[8, "m7"], [7, "7"]], note: "替换的 ii 接原来的 V。" },
  { label: "iiø–V7–i", steps: [[2, "ø"], [7, "7"]], minor: true, note: "小调版的二五：半减七接属七，目标换成小三和弦。" },
  { label: "♭VI–♭VII–I", steps: [[8, ""], [10, ""]], note: "全音经过：低音 A♭–B♭–C 一路上行。" },
  { label: "iii–ii–I", steps: [[4, "m"], [2, "m"]], note: "全音经过：Em–Dm–C 一路下行。" },
];

export function ApproachTarget() {
  const { active } = useAudioState();
  const [t, setT] = useState(0), [q, setQ] = useState(""), [rel, setRel] = useState(7), [suf, setSuf] = useState("7"), [view, setView] = useState("all"), [cur, setCur] = useState(null);
  useEffect(() => onStop(() => setCur(null)), []);
  const tName = TARGETS[t][0], tpc = TARGETS[t][1];
  const tSym = tName + q;
  const aSym = spell(t, rel) + suf;
  const tPcs = parseChord(tSym).notes.map(mod12), aPcs = parseChord(aSym).notes.map(mod12);
  const activePc = new Set([...active].map(mod12));
  const shown = new Set(VIEWS.find(v => v.id === view).cats);

  const bassOf = sym => 36 + mod12(parseChord(sym).root - 36);
  const chain = syms => { let prev; return syms.map(s => { const v = voiceChord(s, { prev, lo: 55, style: "smooth" }); prev = v; return [bassOf(s), ...v]; }); };
  const go = (syms) => { stop(); const v = chain(syms); sequence(v.map(n => ({ notes: n })), { gap: 1.15, onStep: i => setCur(i < 0 ? null : syms[i]) }); };
  const pick = r => { setRel(r); const s = REL[r].opts[0]; setSuf(s); go([spell(t, r) + s, tSym]); };

  // 每个声部的趋近关系：趋近和弦各音到目标和弦最近音的半音距离
  const moves = aPcs.map(p => {
    let best = null;
    for (const x of tPcs) { const d = Math.min(mod12(x - p), mod12(p - x)); if (!best || d < best.d) best = { d, to: x, up: mod12(x - p) <= 6 }; }
    return { p, ...best };
  });
  const nm = pc => { const r = mod12(pc - tpc); return spell(t, r); };
  const moveText = m => m.d === 0 ? `${nm(m.p)} 保持（共同音）` : m.d === 1 ? `${nm(m.p)}→${nm(m.to)} 半音${m.up ? "上行" : "下行"}` : m.d === 2 ? `${nm(m.p)}→${nm(m.to)} 全音${m.up ? "上行" : "下行"}` : `${nm(m.p)}→${nm(m.to)} 跳进`;

  // 画面
  const u = 66, h = u * Math.sqrt(3) / 2;
  const P = (i, j) => [(i + j / 2) * u, -j * h];
  const nodes = [];
  for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) if (Math.max(Math.abs(i), Math.abs(j), Math.abs(i + j)) <= 2) nodes.push({ i, j, r: mod12(7 * i + 4 * j) });
  const hex = [[2, 0], [0, 2], [-2, 2], [-2, 0], [0, -2], [2, -2]].map(([i, j]) => P(i, j).map(v => v * 1.2).join(",")).join(" ");
  const band = [P(0, -2), P(0, 2)];
  return <div className="card">
    <div className="au-ctrl">
      <span className="au-lab">目标（靶心）</span>
      {TARGETS.map(([n], k) => <button key={k} className={t === k ? "on" : ""} onClick={() => { setT(k); setCur(null); }}>{n}</button>)}
    </div>
    <div className="au-ctrl">
      <span className="au-lab">目标和弦性质</span>
      {[["", "大三"], ["m", "小三"], ["maj7", "大七"], ["m7", "小七"]].map(([s, l]) => <button key={s} className={q === s ? "on" : ""} onClick={() => setQ(s)}>{tName + s}<small>{l}</small></button>)}
      <span className="au-lab" style={{ marginLeft: 10 }}>视图</span>
      {VIEWS.map(v => <button key={v.id} className={view === v.id ? "on" : ""} onClick={() => setView(v.id)}>{v.label}</button>)}
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "flex-start" }}>
      <svg viewBox="-200 -165 400 330" style={{ flex: "1 1 330px", maxWidth: 440, userSelect: "none" }}>
        <polygon points={hex} fill="#f8e3d6" stroke="#c9a892" />
        <line x1={band[0][0]} y1={band[0][1]} x2={band[1][0]} y2={band[1][1]} stroke="#cfe5c8" strokeWidth={34} strokeLinecap="round" opacity={shown.has("common") ? 1 : 0.35} />
        <circle cx={0} cy={0} r={u * 1.12} fill="#dcefd4" stroke="#9cc79a" opacity={shown.has("common") ? 1 : 0.35} />
        {shown.has("common") && <circle cx={0} cy={0} r={u} fill="none" stroke={CAT.common.c} strokeWidth={2} />}
        {ARROWS.map(([i, j]) => {
          const r = mod12(7 * i + 4 * j), cat = REL[r].cat; if (!shown.has(cat)) return null;
          const [x, y] = P(i, j), L = Math.hypot(x, y), ex = x / L * 20, ey = y / L * 20;
          return <g key={i + "," + j} opacity={rel === r ? 1 : 0.75}>
            <line x1={x} y1={y} x2={ex} y2={ey} stroke={CAT[cat].c} strokeWidth={rel === r ? 4 : 2.5} />
            <polygon points={`${ex},${ey} ${ex + (x / L) * 11 - (y / L) * 6},${ey + (y / L) * 11 + (x / L) * 6} ${ex + (x / L) * 11 + (y / L) * 6},${ey + (y / L) * 11 - (x / L) * 6}`} fill={CAT[cat].c} />
          </g>;
        })}
        {nodes.map(n => {
          const [x, y] = P(n.i, n.j), main = MAIN.has(n.i + "," + n.j), info = REL[n.r];
          const pc = mod12(tpc + n.r), inT = tPcs.includes(pc), inA = aPcs.includes(pc), center = n.i === 0 && n.j === 0;
          const vis = main && (center || shown.has(info.cat));
          const ring = inA && inT ? "var(--gold)" : inA ? CAT[REL[rel].cat].c : inT ? "var(--ink)" : vis ? CAT[info.cat].c : "#c9bfae";
          const on = activePc.has(pc);
          return <g key={n.i + "," + n.j} style={{ cursor: "pointer" }} opacity={vis || inA || inT ? 1 : 0.45} onClick={() => pick(n.r)}>
            <circle cx={x} cy={y} r={center ? 21 : 17} fill={on ? "var(--gold)" : center ? "#111" : inT ? "#3b352d" : inA ? "#fff6e0" : "#fff"}
              stroke={ring} strokeWidth={inA || inT || rel === n.r ? 3 : vis ? 2 : 1} />
            <text x={x} y={y + 4.5} textAnchor="middle" fontSize={center ? 15 : 13} fontWeight="700" fill={center ? "#ffd84a" : inT && !on ? "#fff" : "var(--ink)"}>{nm(pc)}</text>
            {main && !center && vis && <text x={x} y={y + 30} textAnchor="middle" fontSize="9.5" fill={CAT[info.cat].c}>{info.fn}</text>}
          </g>;
        })}
      </svg>
      <div style={{ flex: "1 1 280px", minWidth: 260 }}>
        <div className="au-info" style={{ marginTop: 0 }}>
          <div><b style={{ color: CAT[REL[rel].cat].c }}>{REL[rel].label}</b>：{nm(tpc + rel)} 相对靶心 {tName} 是<b>{REL[rel].fn}</b>。</div>
          <div className="au-ctrl" style={{ marginTop: 4 }}>
            <span className="au-lab">{nm(tpc + rel)} 族：</span>
            {REL[rel].opts.map(s => <button key={s} className={suf === s ? "on" : ""} onClick={() => { setSuf(s); go([spell(t, rel) + s, tSym]); }}>{spell(t, rel) + s}</button>)}
          </div>
          <div style={{ fontSize: 14 }}>{aSym} → {tSym}：{moves.map(moveText).join("；")}。</div>
          <div className="au-ctrl">
            <button className="au-go" onClick={() => go([aSym, tSym])}>▶ {aSym} → {tSym}</button>
            <button onClick={() => go([tSym, aSym, tSym])}>▶ 辅助：{tSym}–{aSym}–{tSym}</button>
          </div>
          {cur && <div className="au-hint">正在发声：<b>{cur}</b></div>}
        </div>
        <div className="au-lab" style={{ margin: "10px 0 4px" }}>二重趋近（图 7.9、7.10）：再往前加一步</div>
        <div className="au-ctrl">
          {PRESETS.map(p => {
            const syms = [...p.steps.map(([r, s]) => spell(t, r) + s), tName + (p.minor ? "m" : q)];
            return <button key={p.label} onClick={() => go(syms)} title={p.note}>{p.label}<small>{syms.join(" ")}</small></button>;
          })}
        </div>
        <div className="au-hint">点网格上任一位置：它背后代表整个和弦族。实心黑点是目标和弦的音，浅黄底是趋近和弦的音，金色描边是两者的共同音。</div>
      </div>
    </div>
  </div>;
}
