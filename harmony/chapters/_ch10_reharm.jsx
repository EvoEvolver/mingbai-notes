// 第 10 章专属图解：《生日快乐》逐步、分层的和弦重配（原书谱例 10.1）。
// 五层和弦记号（基础 / 替换 / 延伸 / 半音 / 线性）按拍对齐；读者开关各层，后开的层覆盖前面的层，
// 播放时旋律 + 低音 + 和弦一起响，表格上的播放头逐拍移动；下方同步生成五线谱（含和弦记号）。
import { useEffect, useMemo, useState } from "react";
import { play, stop, later, onStop, voiceChord, parseChord, mod12, Score } from "@kit/audio";

// 拍位：0 = 弱起拍（两个八分音符），小节 k 第 b 拍 = 1 + 3(k−1) + (b−1)；末小节只有两拍（与弱起互补），共 24 拍
export const LAYERS = [
  { id: "base", label: "基础", color: "#8a8178", note: "只用正三和弦 I、IV、V（第二章的配法），句尾半终止 V、全曲以 V–I 收束。",
    at: { 0: "C", 1: "C", 4: "G", 7: "F", 8: "G", 10: "C", 13: "C", 16: "G", 17: "F", 19: "C/G", 21: "G", 22: "C" } },
  { id: "sub", label: "替换", color: "#d9772b", note: "同功能组替换（Am、Em 代 C）、借用小调的 Fm、加六与挂留和弦。",
    at: { 0: "Em", 1: "Am", 4: "G6", 6: "Em", 10: "Csus2", 12: "Em", 14: "Am", 18: "Fm" } },
  { id: "ext", label: "延伸", color: "#c99a10", note: "三和弦叠成七和弦（Am7、G7、Em7、CΔ），再叠到十三和弦 C13。",
    at: { 1: "Am7", 4: "G7", 9: "Em7", 12: "CΔ", 13: "C13", 14: "Am7", 21: "G7", 23: "C13" } },
  { id: "chr", label: "半音", color: "#3f74b5", note: "副属与离调：F♯°7（导向 G）、F7–Gm、A（V/ii）、E7–D7（副属连锁）、减七和弦。",
    at: { 3: "F#°7", 7: "F7", 8: "Gm", 14: "A", 15: "F#°7", 16: "D°7", 19: "E7", 20: "D7" } },
  { id: "lin", label: "线性", color: "#4f8f3a", note: "从声部线条出发：转位 Em/G、半音趋近 A♭7、增七 F+7、低音持续的 F/C–B/C、经过减七 E♭°7。",
    at: { 2: "Em/G", 3: "Ab7", 5: "F+7", 10: "F/C", 11: "B/C", 15: "Eb°7" } },
];
// 旋律：[起始拍, 时值(拍), MIDI]
const MEL = [[0, .5, 67], [.5, .5, 67], [1, 1, 69], [2, 1, 67], [3, 1, 72], [4, 2, 71], [6, .5, 67], [6.5, .5, 67], [7, 1, 69], [8, 1, 67], [9, 1, 74],
  [10, 2, 72], [12, .5, 67], [12.5, .5, 67], [13, 1, 79], [14, 1, 76], [15, 1, 72], [16, 1, 71], [17, 1, 69], [18, .5, 77], [18.5, .5, 77],
  [19, 1, 76], [20, 1, 72], [21, 1, 74], [22, 2, 72]];
const ABCN = { 67: "G", 69: "A", 71: "B", 72: "c", 74: "d", 76: "e", 77: "f", 79: "g" };
const NAMES = { 67: "G", 69: "A", 71: "B", 72: "C", 74: "D", 76: "E", 77: "F", 79: "G" };
const N = 24, BAR_START = [0, 1, 4, 7, 10, 13, 16, 19, 22];
const beatLen = s => (s === 17 ? 1.8 : 1);   // 第 6 小节第 2 拍有延长记号
const pretty = s => s.replace(/b(?=[0-9°ø+Δ/]|$)/g, "♭").replace(/#/g, "♯").replace(/^([A-G])b/, "$1♭");

// 当前开启的层 → 每拍的和弦事件（后面的层覆盖前面的层；没有记号的拍延续前一个和弦）
export function eventsOf(on) {
  const ev = [];
  for (let s = 0; s < N; s++) {
    let hit = null;
    LAYERS.forEach((L, k) => { if (on[k] && L.at[s]) hit = { s, sym: L.at[s], layer: k }; });
    if (hit) ev.push(hit);
  }
  return ev;
}

// 生成 ABC（unit = 1/8）：和弦记号写在该拍的第一个音前；二分音符中途换和弦时拆成连线的两个四分音符
function abcOf(ev) {
  const chordAt = Object.fromEntries(ev.map(e => [e.s, e.sym]));
  const q = s => (chordAt[s] ? `"${chordAt[s]}"` : "");
  let out = "";
  MEL.forEach(([pos, d, m], idx) => {
    if (idx > 0 && BAR_START.includes(pos)) out += "| ";
    const n = ABCN[m], s = Math.floor(pos), first = pos === s;
    if (d === 2 && chordAt[s + 1]) out += `${q(s)}${n}2- ${q(s + 1)}${n}2 `;
    else if (pos === 16) out += `(${q(s)}${n}2 `;
    else if (pos === 17) out += `${q(s)}!fermata!${n}2) `;
    else out += (first ? q(s) : "") + n + (d === 2 ? "4" : d === 1 ? "2" : "") + (d === .5 && first ? "" : " ");
  });
  return out + "|]";
}

export default function Reharm() {
  const [on, setOn] = useState([true, false, false, false, false]);
  const [cur, setCur] = useState(-1), [playing, setPlaying] = useState(false), [bpm, setBpm] = useState(96);
  useEffect(() => onStop(() => { setPlaying(false); setCur(-1); }), []);
  const ev = useMemo(() => eventsOf(on), [on.join()]);
  const evAt = Object.fromEntries(ev.map(e => [e.s, e]));
  // 每拍实际发声的和弦（含延续）
  const sounding = useMemo(() => { const a = []; let c = null; for (let s = 0; s < N; s++) { if (evAt[s]) c = evAt[s]; a.push(c); } return a; }, [ev]); // eslint-disable-line
  const abc = useMemo(() => abcOf(ev), [ev]);

  const start = () => {
    if (playing) { stop(); return; }
    stop(); setPlaying(true);
    const spb = 60 / bpm, T = [0]; for (let s = 0; s < N; s++) T.push(T[s] + beatLen(s) * spb);
    const tm = p => { const s = Math.floor(p); return T[s] + (p - s) * beatLen(s) * spb; };
    MEL.forEach(([p, d, m]) => play([m], { at: tm(p) + 0.01, dur: Math.max(0.2, (tm(p + d) - tm(p)) * 0.95), velocity: 0.95 }));
    let prev;
    ev.forEach((e, k) => {
      const end = k + 1 < ev.length ? ev[k + 1].s : N, at = T[e.s], len = T[end] - at;
      const [sym, b] = e.sym.split("/");
      const upper = voiceChord(sym, { prev, lo: 47, style: "smooth" }); prev = upper;
      const bassPc = b ? mod12(parseChord(b).root) : mod12(parseChord(sym).root);
      play([36 + mod12(bassPc - 36)], { at, dur: len * 0.97, velocity: 0.7 });
      play(upper, { at, dur: len * 0.97, velocity: 0.4 });
    });
    for (let s = 0; s < N; s++) later(() => setCur(s), T[s] * 1000);
    later(() => { setPlaying(false); setCur(-1); }, T[N] * 1000 + 300);
  };
  const toggle = k => { if (k === 0) return; const n = on.slice(); n[k] = !n[k]; setOn(n); };
  const preset = upto => setOn(LAYERS.map((_, k) => k <= upto));
  const cell = { padding: "3px 2px", textAlign: "center", fontSize: 13, whiteSpace: "nowrap", borderLeft: "1px solid var(--line)" };

  return <div className="card">
    <div className="au-ctrl" style={{ flexWrap: "wrap" }}>
      <span className="au-lab">图层</span>
      {LAYERS.map((L, k) => <button key={L.id} className={on[k] ? "on" : ""} onClick={() => toggle(k)}
        style={{ borderColor: L.color, ...(on[k] ? { background: L.color, color: "#fff" } : { color: L.color }) }}
        title={k === 0 ? "基础层始终开启" : "开关这一层"}>{on[k] ? "✓ " : ""}{L.label}</button>)}
      <span className="au-lab" style={{ marginLeft: 8 }}>逐层叠加</span>
      {LAYERS.map((L, k) => <button key={"p" + k} onClick={() => preset(k)} title={"开启前 " + (k + 1) + " 层"}>{k + 1}</button>)}
    </div>
    <div style={{ overflowX: "auto", margin: "8px 0" }}>
      <table style={{ borderCollapse: "collapse", minWidth: 760, width: "100%" }}>
        <thead>
          <tr><th style={{ ...cell, borderLeft: 0, color: "var(--muted)", fontWeight: 400 }}>小节</th>
            {Array.from({ length: N }, (_, s) => <th key={s} style={{ ...cell, fontWeight: 400, color: "var(--muted)", borderLeft: BAR_START.includes(s) ? "2px solid var(--ink)" : cell.borderLeft }}>
              {BAR_START.includes(s) ? (s === 0 ? "弱起" : BAR_START.indexOf(s)) : ""}</th>)}</tr>
          <tr><th style={{ ...cell, borderLeft: 0 }}>旋律</th>
            {Array.from({ length: N }, (_, s) => <td key={s} style={{ ...cell, fontWeight: 600, background: s === cur ? "rgba(214,163,27,.35)" : undefined,
              borderLeft: BAR_START.includes(s) ? "2px solid var(--ink)" : cell.borderLeft }}>
              {MEL.filter(([p]) => Math.floor(p) === s).map(([, , m]) => NAMES[m]).join("")}{s === 17 ? "𝄐" : ""}</td>)}</tr>
        </thead>
        <tbody>
          {LAYERS.map((L, k) => <tr key={L.id} style={{ opacity: on[k] ? 1 : 0.35 }}>
            <th style={{ ...cell, borderLeft: 0, color: L.color, cursor: k ? "pointer" : "default" }} onClick={() => toggle(k)}>{L.label}</th>
            {Array.from({ length: N }, (_, s) => {
              const sym = L.at[s], won = sym && evAt[s] && evAt[s].layer === k && on[k];
              return <td key={s} style={{ ...cell, borderLeft: BAR_START.includes(s) ? "2px solid var(--ink)" : cell.borderLeft,
                background: won ? L.color : s === cur ? "rgba(214,163,27,.18)" : undefined, color: won ? "#fff" : undefined, fontWeight: won ? 700 : 400, borderRadius: 3 }}>
                {sym ? <span style={{ cursor: "pointer" }} onClick={() => play(parseChord(sym).bass != null ? [parseChord(sym).bass, ...parseChord(sym).notes] : parseChord(sym).notes, { arp: 0.03 })}>{pretty(sym)}</span> : ""}</td>;
            })}
          </tr>)}
          <tr><th style={{ ...cell, borderLeft: 0 }}>实际</th>
            {Array.from({ length: N }, (_, s) => <td key={s} style={{ ...cell, borderLeft: BAR_START.includes(s) ? "2px solid var(--ink)" : cell.borderLeft,
              color: sounding[s] ? LAYERS[sounding[s].layer].color : undefined, fontWeight: evAt[s] ? 700 : 400, background: s === cur ? "rgba(214,163,27,.35)" : undefined }}>
              {evAt[s] ? pretty(evAt[s].sym) : sounding[s] ? "·" : ""}</td>)}</tr>
        </tbody>
      </table>
    </div>
    <div className="au-ctrl" style={{ flexWrap: "wrap" }}>
      <button className="au-go" onClick={start}>{playing ? "■ 停止" : "▶ 播放当前版本（旋律 + 低音 + 和弦）"}</button>
      <label className="au-lab">速度 <input type="range" min="60" max="140" value={bpm} onChange={e => setBpm(+e.target.value)} /> {bpm}</label>
    </div>
    <div className="au-info">
      {LAYERS.map((L, k) => on[k] && <div key={L.id}><b style={{ color: L.color }}>{L.label}</b>：{L.note}</div>)}
      <div className="au-hint">表格上色的格子是当前真正发声的和弦（后开的层覆盖前面的层；空拍延续前一个和弦）。点表中任意和弦可单独试听。</div>
    </div>
    <Score key={abc} abc={abc} meter="3/4" unit="1/8" tempo={bpm} accomp caption="当前版本的五线谱（自动生成；伴奏只弹和弦上方声部，斜线低音请用上面的播放器听）" />
  </div>;
}
