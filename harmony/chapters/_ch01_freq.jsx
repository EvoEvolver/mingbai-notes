// 第 1 章专用：十二平均律的「频率阶梯」——C4 到 C5 的 13 个音，柱高 = 频率，点击试听
import { useState } from "react";
import { play, sequence, stop, useAudioState, freq, pcName } from "@kit/audio";

export default function FreqLadder() {
  const { active } = useAudioState();
  const [cur, setCur] = useState(null);
  const notes = Array.from({ length: 13 }, (_, k) => 60 + k);
  const f0 = freq(60), W = 640, H = 230, bw = W / 13;
  const y = f => H - 30 - ((f - f0 * 0.75) / (f0 * 2 - f0 * 0.75)) * (H - 60);
  const info = cur ?? 7;
  return <div className="card">
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block", userSelect: "none" }}>
      {notes.map((m, k) => {
        const f = freq(m), on = active.has(m);
        return <g key={m} style={{ cursor: "pointer" }} onClick={() => { play([m], { dur: 1.2 }); setCur(k); }}>
          <rect x={k * bw + 4} y={y(f)} width={bw - 8} height={H - 30 - y(f)} rx={4}
            fill={on ? "var(--gold)" : k === 0 || k === 12 ? "var(--accent)" : "#d9cfbf"} />
          <text x={k * bw + bw / 2} y={H - 12} textAnchor="middle" fontSize="12" fontWeight="600">{pcName(m, "sharp")}</text>
          <text x={k * bw + bw / 2} y={y(f) - 6} textAnchor="middle" fontSize="10" fill="#6b645a">{Math.round(f)}</text>
        </g>;
      })}
    </svg>
    <div className="au-info">
      <b>{pcName(60 + info)}{info === 12 ? "（高八度）" : ""}</b>：比 C 高 {info} 个半音，频率比 = 2<sup>{info}/12</sup> ≈ <b>{(2 ** (info / 12)).toFixed(4)}</b>
      {info === 12 ? "——恰好是 2，回到「同一个音」。" : info === 7 ? "——接近 3/2，这就是听起来格外和谐的纯五度。" : info === 4 ? "——接近 5/4，即大三度。" : "。"}
      （柱上数字为频率 Hz，以 A4 = 440 Hz 为准）
    </div>
    <div className="au-ctrl">
      <button className="au-go" onClick={() => { stop(); sequence(notes.map(m => ({ notes: [m] })), { gap: 0.32, onStep: i => setCur(i < 0 ? null : i) }); }}>▶ 从 C 走到高八度 C</button>
      <button className="au-go" onClick={() => play([60, 72], { dur: 2 })}>▶ C 与高八度 C 同时响</button>
      <span className="au-hint">点任意一根柱子试听</span>
    </div>
  </div>;
}
