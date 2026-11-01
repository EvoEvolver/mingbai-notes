// 第 9 章专属图解（二）：伴奏音型切换器 + 织体分层
//   固定一个和弦进行，在原书 9-6 介绍的各种伴奏音型（柱式、半分解、分解、阿尔贝蒂、理查十度……）之间切换，实时播放；
//   下方「钢琴卷帘」把旋律层 / 和声层 / 低音层 / 节奏层画成不同颜色（对应图 9.8 织体的层次），每层可单独开关。
import { useEffect, useRef, useState } from "react";
import { play, stop, later, onStop, parseChord, mod12, voiceChord } from "@kit/audio";

const PROGS = [
  { id: "vi", label: "vi–IV–V–I", sub: "谱例 9.38 的和声", chords: ["Am", "F", "G", "C"] },
  { id: "I", label: "I–vi–IV–V", sub: "50 年代进行", chords: ["C", "Am", "F", "G"] },
  { id: "canon", label: "卡农进行", sub: "I–V–vi–iii–IV–I–IV–V", chords: ["C", "G", "Am", "Em", "F", "C", "F", "G"] },
];

// 每个音型：beats（每小节拍数）与 gen(ch) → 事件 [{t,d,m:[midi],v,layer,arp?}]，t/d 以拍为单位
// ch = { bass（低音根音）, close（中音区密集三和弦）, low（偏低的密集三和弦）, ladder（开放排列：根、五、八、十、十二、十五） }
const ev = (t, d, m, layer, v = 0.7, arp = 0) => ({ t, d, m: [].concat(m), layer, v, arp });
const eighths = (ch, idx, src = "ladder", v = 0.62) => idx.map((k, i) => ev(i * 0.5, i === 0 ? 2 : 0.5, ch[src][k], k === 0 && src === "ladder" ? "B" : "H", i % 2 ? v - 0.12 : v));
const PATTERNS = [
  { id: "beat", group: "柱式", label: "打拍子", beats: 4,
    gen: ch => [ev(0, 2, ch.bass, "B"), ev(2, 2, ch.bass, "B"), ...[0, 1, 2, 3].map(t => ev(t, 0.9, ch.close, "H", t === 0 ? 0.75 : 0.55))],
    note: "每拍一个柱式和弦，低音两拍一换：最朴素，庄重、坚定，适合进行曲、颂歌。" },
  { id: "rhy", group: "柱式", label: "带节奏", beats: 4,
    gen: ch => [[0, 1.5, 0.85], [1.5, 0.5, 0.55], [2, 1, 0.75], [3, 0.5, 0.55], [3.5, 0.5, 0.6]].flatMap(([t, d, v]) => [ev(t, d * 0.9, ch.close, "H", v), ev(t, d * 0.9, [ch.bass, ch.bass + 12], "B", v)]),
    note: "柱式和弦加上附点、重音：像鼓乐或号角，更加雄壮。" },
  { id: "roll", group: "柱式", label: "琶音和弦", beats: 4,
    gen: ch => [ev(0, 4, [ch.bass, ...ch.ladder.slice(1, 5)], "H", 0.7, 0.07)],
    note: "从下往上快速扫过再保持（谱上画竖波浪线），像竖琴、吉他扫弦：柱式与分解之间，轻柔灵动。" },
  { id: "boom", group: "半分解", label: "嘭—嚓", beats: 4,
    gen: ch => [ev(0, 1, ch.bass, "B", 0.75), ev(1, 0.8, ch.close, "H", 0.5), ev(2, 1, ch.bass + 7 - (ch.bass + 7 > 55 ? 12 : 0), "B", 0.65), ev(3, 0.8, ch.close, "H", 0.5)],
    note: "低音单独放在强拍，和弦放在弱拍：饱满之中多了跳跃感（《土耳其进行曲》《长江之歌》的左手）。" },
  { id: "off", group: "半分解", label: "反拍和弦", beats: 4,
    gen: ch => [0, 1, 2, 3].flatMap(t => [ev(t, 0.45, t % 2 ? ch.bass + 12 : ch.bass, "B", 0.7), ev(t + 0.5, 0.4, ch.close, "H", 0.55)]),
    note: "低音踩在每拍上，和弦落在后半拍（反拍）：轻快、有弹性的行进感。" },
  { id: "waltz", group: "半分解", label: "圆舞曲", beats: 3,
    gen: ch => [ev(0, 1, ch.bass, "B", 0.75), ev(1, 0.8, ch.close, "H", 0.45), ev(2, 0.8, ch.close, "H", 0.45)],
    note: "3/4 拍的「嘭—嚓—嚓」：强—弱—弱，一听就是华尔兹。" },
  { id: "arp", group: "分解", label: "短琶音", beats: 4,
    gen: ch => [ev(0, 4, ch.bass, "B", 0.6), ...[0, 1, 2, 3, 0, 1, 2, 3].map((k, i) => ev(i * 0.5, 0.5, [...ch.low, ch.low[0] + 12][k], "H", i % 4 ? 0.45 : 0.6))],
    note: "和弦音按顺序从低到高逐个弹出（不超过八度叫短琶音）：音区展宽、音响清澈。" },
  { id: "wave", group: "分解", label: "波浪式", beats: 4,
    gen: ch => eighths(ch, [0, 1, 2, 3, 4, 3, 2, 1]),
    note: "开放排列的琶音上去又下来，有流动的层次美（《天鹅》的钢琴伴奏）。" },
  { id: "alberti", group: "分解", label: "阿尔贝蒂低音", beats: 4,
    gen: ch => [0, 2, 1, 2, 0, 2, 1, 2].map((k, i) => ev(i * 0.5, 0.5, ch.close[k], k === 0 ? "B" : "H", k === 0 ? 0.6 : 0.45)),
    note: "「低—高—中—高」锯齿形（左手 1535、1646 的来历）：纯净轻快；排列密集，所以音区不宜太低（莫扎特 K545）。" },
  { id: "ten", group: "分解", label: "理查十度", beats: 4,
    gen: ch => eighths(ch, [0, 1, 3, 1, 3, 1, 3, 1]),
    note: "低根音之后，五音与高八度的三音（根音上方十度）交替：跨度大，可以放在更低的音区，起伏推动情绪（克莱德曼常用）。" },
  { id: "332", group: "节奏型", label: "切分 3+3+2", beats: 4,
    gen: ch => [[0, 1.5], [1.5, 1.5], [3, 1]].flatMap(([t, d], i) => [ev(t, d * 0.9, ch.close, "H", i ? 0.6 : 0.75), ev(t, d * 0.9, ch.bass, "B", i ? 0.6 : 0.75)]),
    note: "八个八分音符按 3+3+2 分组（附加节奏，谱例 9.62）：重音离开第三拍，流行与拉丁音乐里极常见。" },
];
const GROUPS = ["柱式", "半分解", "分解", "节奏型"];

function chordShape(sym, prev) {
  const c = parseChord(sym); const r = mod12(c.root);
  const iv = c.notes.map(n => n - c.root);
  const bass = 40 + mod12(r - 40);                       // E2–D♯3
  const close = voiceChord(sym, { prev, lo: 57, style: "smooth" });   // 中音区，平滑连接
  const low = iv.map(x => 48 + mod12(r - 48) + x);        // C3 起的密集原位
  const ladder = [bass, bass + 7, bass + 12, bass + 12 + iv[1], bass + 19, bass + 24];
  return { bass, close, low, ladder };
}
// 示意旋律（自动生成，非原书）：每小节先停在一个和弦音上，再经一个级进音走向下一个和弦音
const SCALE = [0, 2, 4, 5, 7, 9, 11];
function melody(chords, beats) {
  let prev = 76; const out = [];
  chords.forEach((s, i) => {
    const c = parseChord(s), pcs = c.notes.map(mod12);
    const cands = []; for (let m = 67; m <= 81; m++) if (pcs.includes(mod12(m))) cands.push(m);
    const a = cands.reduce((x, y) => Math.abs(y - prev) < Math.abs(x - prev) ? y : x);
    const b2 = cands.filter(m => m !== a).reduce((x, y) => Math.abs(y - a) < Math.abs(x - a) ? y : x);
    const step = b2 > a ? -1 : 1; let p = b2 + step; while (!SCALE.includes(mod12(p))) p += step;
    const t0 = i * beats;
    if (beats === 3) out.push(ev(t0, 2, a, "M", 0.8), ev(t0 + 2, 1, b2, "M", 0.7));
    else out.push(ev(t0, 2, a, "M", 0.8), ev(t0 + 2, 1.5, b2, "M", 0.7), ev(t0 + 3.5, 0.5, p, "M", 0.6));
    prev = b2;
  });
  return out;
}
function drums(n, beats) {
  const out = [];
  for (let b = 0; b < n; b++) for (let k = 0; k < beats * 2; k++) {
    const t = b * beats + k / 2;
    out.push(ev(t, 0.08, 96, "R", k % 2 ? 0.18 : 0.28));                        // 踩镲
    if (k === 0 || (beats === 4 && k === 4)) out.push(ev(t, 0.18, 36, "R", 0.9)); // 底鼓
    if (beats === 4 && (k === 2 || k === 6)) out.push(ev(t, 0.1, 62, "R", 0.45)); // 军鼓（反拍重音）
  }
  return out;
}
const LAYERS = [
  { id: "M", label: "旋律层", c: "#c0392b" },
  { id: "H", label: "和声层", c: "#2c6e9e" },
  { id: "B", label: "低音层", c: "#222" },
  { id: "R", label: "节奏层", c: "#999" },
];

export function AccompLab({ layered = false, initial = 8 }) {
  const [pi, setPi] = useState(0), [ai, setAi] = useState(initial), [bpm, setBpm] = useState(92);
  const [on, setOn] = useState({ M: layered, H: true, B: true, R: layered });
  const [playing, setPlaying] = useState(false), [pos, setPos] = useState(-1);
  const raf = useRef(0), t0 = useRef(0);
  const P = PROGS[pi], A = PATTERNS[ai];
  let pv; const sh = P.chords.map(s => { const x = chordShape(s, pv); pv = x.close; return x; });
  const events = [
    ...sh.flatMap((ch, i) => A.gen(ch).map(e => ({ ...e, t: e.t + i * A.beats }))),
    ...melody(P.chords, A.beats), ...drums(P.chords.length, A.beats),
  ];
  const total = P.chords.length * A.beats, spb = 60 / bpm;
  useEffect(() => onStop(() => { setPlaying(false); cancelAnimationFrame(raf.current); setPos(-1); }), []);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  const go = () => {
    if (playing) { stop(); return; }
    stop();
    const vis = events.filter(e => on[e.layer]);
    for (const e of vis) {
      const opt = { at: e.t * spb + 0.05, dur: Math.max(0.12, e.d * spb), velocity: e.v, arp: e.arp };
      if (e.layer === "R") opt.timbre = "sine";
      play(e.m, opt);
    }
    setPlaying(true); t0.current = performance.now() + 50;
    const tick = () => { const b = (performance.now() - t0.current) / 1000 / spb; setPos(b); if (b < total) raf.current = requestAnimationFrame(tick); };
    raf.current = requestAnimationFrame(tick);
    later(() => { setPlaying(false); setPos(-1); cancelAnimationFrame(raf.current); }, total * spb * 1000 + 600);
  };
  const change = f => { if (playing) stop(); f(); };
  // 钢琴卷帘
  const W = 760, H = 230, L = 34, lo = 34, hi = 86;
  const x = t => L + (t / total) * (W - L - 6), y = m => 8 + (hi - m) / (hi - lo) * (H - 46);
  const drumY = { 96: H - 30, 62: H - 22, 36: H - 14 };
  return <div className="card">
    <div className="au-ctrl"><span className="au-lab">和弦进行</span>
      {PROGS.map((p, i) => <button key={p.id} className={i === pi ? "on" : ""} onClick={() => change(() => setPi(i))}>{p.label}<small>{p.sub}</small></button>)}
    </div>
    {GROUPS.map(g => <div className="au-ctrl" key={g}><span className="au-lab" style={{ minWidth: 48 }}>{g}</span>
      {PATTERNS.map((a, i) => a.group === g && <button key={a.id} className={i === ai ? "on" : ""} onClick={() => change(() => setAi(i))}>{a.label}</button>)}
    </div>)}
    <div className="au-ctrl"><span className="au-lab">织体层</span>
      {LAYERS.map(l => <button key={l.id} className={on[l.id] ? "on" : ""} style={{ "--c": l.c }} onClick={() => change(() => setOn({ ...on, [l.id]: !on[l.id] }))}>{l.label}</button>)}
      <span className="au-lab" style={{ marginLeft: 10 }}>速度</span>
      {[72, 92, 112].map(v => <button key={v} className={bpm === v ? "on" : ""} onClick={() => change(() => setBpm(v))}>{v}</button>)}
      <button className="au-go" onClick={go}>{playing ? "■ 停止" : "▶ 播放"}</button>
    </div>
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block", background: "var(--paper)", borderRadius: 10 }}>
      {P.chords.map((c, i) => <g key={i}>
        <rect x={x(i * A.beats)} y={0} width={x(A.beats) - L} height={H - 36} fill={i % 2 ? "#00000006" : "none"} />
        <line x1={x(i * A.beats)} x2={x(i * A.beats)} y1={0} y2={H} stroke="var(--line)" />
        <text x={x(i * A.beats) + 4} y={H - 38} fontSize="12" fontWeight="700" fill="var(--muted)">{c}</text>
      </g>)}
      {[36, 48, 60, 72, 84].map(m => <g key={m}><line x1={L} x2={W} y1={y(m)} y2={y(m)} stroke="#0000000d" /><text x={2} y={y(m) + 4} fontSize="10" fill="var(--muted)">C{m / 12 - 1}</text></g>)}
      <text x={2} y={H - 18} fontSize="10" fill="var(--muted)">鼓</text>
      {events.map((e, k) => {
        const col = LAYERS.find(l => l.id === e.layer).c, op = on[e.layer] ? 1 : 0.12;
        const act = pos >= e.t && pos < e.t + Math.max(e.d, 0.25);
        if (e.layer === "R") return <text key={k} x={x(e.t)} y={drumY[e.m[0]]} fontSize="9" fill={col} opacity={op} fontWeight={act ? 900 : 400}>×</text>;
        return e.m.map((m, j) => <rect key={k + "-" + j} x={x(e.t + j * (e.arp || 0) * bpm / 60)} y={y(m) - 3} width={Math.max(3, x(e.d) - L - 1.5)} height={6} rx={2}
          fill={col} opacity={op * (act ? 1 : 0.7)} stroke={act ? "var(--gold)" : "none"} strokeWidth={act ? 2 : 0} />);
      })}
      {pos >= 0 && <line x1={x(pos)} x2={x(pos)} y1={0} y2={H} stroke="var(--accent)" strokeWidth="2" />}
    </svg>
    <div className="au-info"><b>{A.group} · {A.label}</b>：{A.note}
      <div className="au-hint" style={{ marginTop: 4 }}>同一组和弦、同一条旋律，只换伴奏音型，情绪就从「庄重」变成「轻快」「抒情」「摇摆」。
        红色旋律是为演示自动生成的示意旋律（非原书）；鼓点用纯音模拟：低音为底鼓、中音为军鼓（二、四拍反拍重音）、高音为踩镲。</div>
    </div>
  </div>;
}
