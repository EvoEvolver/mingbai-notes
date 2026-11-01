// 第 6 章图解「泛音列」：一根基音的前 16 个谐音（f, 2f, 3f …）。逐个 / 叠加播放精确的整数倍频率，
// 并与最近的十二平均律音比较音分偏差。这里自建 Web Audio 振荡器（引擎的 play() 只接受 MIDI 音高）。
import { useEffect, useRef, useState } from "react";
import { getSettings, onStop, stop as stopAll, FLAT } from "@kit/audio";

const ROOTS = [{ label: "C2", midi: 36 }, { label: "G2", midi: 43 }, { label: "C3", midi: 48 }];
const hz = m => 440 * Math.pow(2, (m - 69) / 12);
const NAMES = { 1: "纯八度", 2: "纯五度", 3: "纯四度", 4: "大三度", 5: "小三度", 6: "偏窄的小三度（约 267 音分）", 7: "偏宽的大二度（约 231 音分）", 8: "大二度", 9: "偏窄的大二度（约 182 音分）", 10: "约 165 音分的「中立」二度", 11: "约 151 音分的「四分之三全音」", 12: "偏宽的小二度（约 139 音分）", 13: "偏宽的小二度（约 128 音分）", 14: "偏宽的小二度（约 119 音分）", 15: "小二度（约 112 音分）" };
const RATIO_NAME = n => NAMES[n] || "";

let ctx = null, live = [];
function ac() {
  if (!ctx) { const AC = window.AudioContext || window.webkitAudioContext; ctx = new AC(); }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}
function kill() { live.forEach(o => { try { o.stop(); } catch { /* 已停 */ } }); live = []; }
// 播放一组 [频率, 振幅]，at 秒后开始，持续 dur 秒
function tone(parts, { at = 0, dur = 1.6 } = {}) {
  const s = getSettings(); if (s.muted) return;
  const c = ac(), t0 = c.currentTime + at, vol = 0.18 * s.volume;
  parts.forEach(([f, a]) => {
    const o = c.createOscillator(), g = c.createGain();
    o.type = "sine"; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol * a), t0 + 0.03);
    g.gain.setValueAtTime(Math.max(0.0002, vol * a), t0 + dur - 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(c.destination); o.start(t0); o.stop(t0 + dur + 0.05);
    live.push(o); o.onended = () => { live = live.filter(x => x !== o); };
  });
}

export default function Overtones() {
  const [root, setRoot] = useState(ROOTS[0]);
  const [sel, setSel] = useState(5), [upto, setUpto] = useState(0);
  const timers = useRef([]);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => onStop(() => { kill(); clear(); setUpto(0); }), []);
  useEffect(() => () => { kill(); clear(); }, []);
  const f0 = hz(root.midi);
  const parts = Array.from({ length: 16 }, (_, k) => {
    const n = k + 1, f = f0 * n, m = 69 + 12 * Math.log2(f / 440), near = Math.round(m), cents = Math.round((m - near) * 100);
    return { n, f, near, cents, name: FLAT[near % 12] + (Math.floor(near / 12) - 1) };
  });
  const go = fn => { stopAll(); kill(); clear(); fn(); };
  const one = n => go(() => { setSel(n); tone([[f0 * n, 1]], { dur: 1.6 }); });
  const vsEqual = n => go(() => { setSel(n); const p = parts[n - 1]; tone([[p.f, 1]], { dur: 1.2 }); tone([[hz(p.near), 1]], { at: 1.3, dur: 1.2 }); tone([[p.f, 0.7], [hz(p.near), 0.7]], { at: 2.7, dur: 2.2 }); });
  const stack = () => go(() => {
    parts.forEach((p, k) => { tone([[p.f, 1 / p.n]], { at: k * 0.45, dur: 16 * 0.45 - k * 0.45 + 1.5 }); timers.current.push(setTimeout(() => setUpto(p.n), k * 450)); });
    timers.current.push(setTimeout(() => setUpto(0), 16 * 450 + 1600));
  });
  const complex = () => go(() => { setUpto(16); tone(parts.map(p => [p.f, 1 / p.n]), { dur: 2.2 }); timers.current.push(setTimeout(() => setUpto(0), 2300)); });
  const pure = () => go(() => tone([[f0, 1]], { dur: 2 }));
  const triad = () => go(() => { setSel(6); tone([[f0 * 4, 0.8], [f0 * 5, 0.8], [f0 * 6, 0.8]], { dur: 2.2 }); });
  const dom7 = () => go(() => { setSel(7); tone([[f0 * 4, 0.7], [f0 * 5, 0.7], [f0 * 6, 0.7], [f0 * 7, 0.7]], { dur: 2.2 }); });

  const W = 640, H = 230, bw = (W - 40) / 16;
  const S = parts[sel - 1];
  return <div className="card">
    <div className="au-ctrl"><span className="au-lab">基音</span>
      {ROOTS.map(r => <button key={r.label} className={r === root ? "on" : ""} onClick={() => { go(() => {}); setRoot(r); }}>{r.label}（{hz(r.midi).toFixed(1)} Hz）</button>)}
    </div>
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", background: "var(--paper)", borderRadius: 10 }}>
      {parts.map((p, k) => {
        const x = 20 + k * bw, h = 128 / Math.sqrt(p.n), on = upto >= p.n || sel === p.n;
        const col = Math.abs(p.cents) <= 5 ? "#3c8f5a" : Math.abs(p.cents) <= 20 ? "#b07a1e" : "#b8432f";
        return <g key={p.n} style={{ cursor: "pointer" }} onClick={() => one(p.n)}>
          <rect x={x + 4} y={175 - h} width={bw - 8} height={h} rx={4} fill={on ? "var(--accent)" : "#d9cfc0"} opacity={upto && upto < p.n ? 0.35 : 1} />
          <text x={x + bw / 2} y={168 - h} fontSize={11} textAnchor="middle" fill="var(--ink)">{p.name.replace("♭", "♭")}</text>
          <text x={x + bw / 2} y={192} fontSize={12} textAnchor="middle" fill="var(--ink)" fontWeight={700}>{p.n}</text>
          <text x={x + bw / 2} y={207} fontSize={10} textAnchor="middle" fill={col}>{p.cents > 0 ? "+" : ""}{p.cents}¢</text>
          <text x={x + bw / 2} y={222} fontSize={9} textAnchor="middle" fill="var(--muted)">{Math.round(p.f)}</text>
        </g>;
      })}
      <text x={20} y={16} fontSize={11} fill="var(--muted)">柱高 ∝ 强度（示意：越高的泛音越弱）· 下方：序号 / 与平均律的音分偏差 / 频率 Hz</text>
    </svg>
    <div className="au-ctrl">
      <button className="au-go" onClick={stack}>▶ 逐个叠加 16 个谐音</button>
      <button onClick={complex}>复音（一齐响）</button>
      <button onClick={pure}>只有基音（纯音）</button>
      <button onClick={triad}>4 : 5 : 6 大三和弦</button>
      <button onClick={dom7}>4 : 5 : 6 : 7 属七和弦</button>
      <button onClick={() => go(() => {})}>■</button>
    </div>
    <div className="au-info">
      第 <b>{S.n}</b> 谐音（第 {S.n - 1} 泛音）：{S.f.toFixed(1)} Hz，最接近平均律的 <b>{S.name}</b>，
      偏差 <b>{S.cents > 0 ? "+" : ""}{S.cents} 音分</b>（100 音分 = 一个半音）。
      {S.n > 1 && <> 它与下面一个谐音的频率比是 {S.n}:{S.n - 1}，即{RATIO_NAME(S.n - 1)}。</>}
      <button className="au-mini" onClick={() => vsEqual(S.n)}>▶ 与平均律 {S.name} 对比</button>
      <div className="au-hint">点任一柱子单独听这个谐音（正弦波）。第 7、11、13、14 谐音与平均律差得最远（偏差超过 ±30 音分），记谱时只是近似；第 5 谐音（自然大三度）比平均律低 14 音分。</div>
    </div>
  </div>;
}

// 平均律 vs 纯律：同一音程先弹平均律、再弹纯律（以 C4 为根音，正弦波便于听拍频）
const JI = [
  { label: "纯五度 C–G", et: [0, 7], ji: [1, 3 / 2] },
  { label: "大三度 C–E", et: [0, 4], ji: [1, 5 / 4] },
  { label: "小三度 C–E♭", et: [0, 3], ji: [1, 6 / 5] },
  { label: "大三和弦 C–E–G", et: [0, 4, 7], ji: [1, 5 / 4, 3 / 2] },
];
export function JustCompare() {
  const [on, setOn] = useState(-1);
  useEffect(() => onStop(() => { kill(); setOn(-1); }), []);
  const go = (k, which) => {
    stopAll(); kill(); setOn(k);
    const base = hz(60), x = JI[k];
    const et = x.et.map(s => [base * Math.pow(2, s / 12), 0.8]), ji = x.ji.map(r => [base * r, 0.8]);
    if (which === "et") tone(et, { dur: 2.5 }); else if (which === "ji") tone(ji, { dur: 2.5 });
    else { tone(et, { dur: 2.4 }); tone(ji, { at: 2.6, dur: 2.4 }); }
  };
  return <div className="card">
    {JI.map((x, k) => {
      const cents = x.et.map((s, i) => Math.round(s * 100 - 1200 * Math.log2(x.ji[i])));
      return <div key={k} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, margin: "4px 0", fontWeight: on === k ? 700 : 400 }}>
        <span style={{ minWidth: 140 }}>{x.label}</span>
        <button className="au-mini" onClick={() => go(k, "et")}>平均律</button>
        <button className="au-mini" onClick={() => go(k, "ji")}>纯律</button>
        <button className="au-mini" onClick={() => go(k, "both")}>先后对比</button>
        <small style={{ color: "var(--muted)" }}>平均律比纯律：{cents.slice(1).map(c => (c > 0 ? "+" : "") + c + " 音分").join("、")}</small>
      </div>;
    })}
    <div className="au-hint">用正弦波演奏，持续音上更容易听出平均律三度的轻微「颤动」（拍频）。页面右下角的声音条也可以把全站切换为纯律。</div>
  </div>;
}
