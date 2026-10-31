// 第 10 章结尾图解：海边沙地上的一张脸（点击涨潮，脸被抹去）
import { useState, useEffect, useRef } from "react";
import { C } from "@kit";

const SAND = "#e9d8b4", SAND2 = "#d9c193", SEA = "#2c4a6e", FOAM = "#f4efe4", INK = "#7a5c33";

export default function SandFace() {
  const [phase, setPhase] = useState(0); // 0 画在沙上；1 潮水涌上；2 已抹去
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const tide = () => {
    if (phase !== 0) return;
    setPhase(1);
    timers.current.push(setTimeout(() => setPhase(2), 1700));
  };
  const reset = () => setPhase(0);
  const waveY = phase === 1 ? 175 : 0;
  const faceOp = phase === 0 ? 1 : phase === 1 ? .35 : 0;

  return <div className="card" style={{ display: "grid", gap: 12 }}>
    <svg viewBox="0 0 700 260" style={{ width: "100%", maxHeight: 340, borderRadius: 14, background: SAND }}>
      {/* 沙地纹理 */}
      {Array.from({ length: 9 }).map((_, k) => <path key={k} d={`M0,${110 + k * 18} Q175,${104 + k * 18} 350,${110 + k * 18} T700,${110 + k * 18}`} fill="none" stroke={SAND2} strokeWidth="1" opacity=".6" />)}
      {/* 沙上画的脸 */}
      <g opacity={faceOp} style={{ transition: "opacity 1.4s ease-in" }} fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round">
        <ellipse cx="350" cy="170" rx="62" ry="72" />
        <path d="M322,152 q8,-8 16,0" /><path d="M362,152 q8,-8 16,0" />
        <path d="M350,160 l-6,24 h10" />
        <path d="M328,204 q22,14 44,0" />
      </g>
      {phase === 2 && <text x="350" y="178" textAnchor="middle" fontSize="15" fill={INK} opacity=".7" fontFamily="var(--serif)">
        <animate attributeName="opacity" from="0" to=".7" dur="1.2s" fill="freeze" />平整的沙地还在，脸不见了</text>}
      {/* 海与潮水 */}
      <g style={{ transform: `translateY(${waveY}px)`, transition: phase === 1 ? "transform 1.1s cubic-bezier(.3,.6,.4,1)" : "transform 1.6s ease-in-out" }}>
        <rect x="-60" y="-200" width="820" height="262" fill={SEA} />
        <path d="M-60,62 Q-30,48 0,62 T60,62 T120,62 T180,62 T240,62 T300,62 T360,62 T420,62 T480,62 T540,62 T600,62 T660,62 T720,62 T780,62 T840,62 V40 H-60z" fill={SEA} />
        <path d="M-60,62 Q-30,48 0,62 T60,62 T120,62 T180,62 T240,62 T300,62 T360,62 T420,62 T480,62 T540,62 T600,62 T660,62 T720,62 T780,62 T840,62" fill="none" stroke={FOAM} strokeWidth="5" opacity=".9">
          <animate attributeName="d" dur="3s" repeatCount="indefinite"
            values="M-60,62 Q-30,48 0,62 T60,62 T120,62 T180,62 T240,62 T300,62 T360,62 T420,62 T480,62 T540,62 T600,62 T660,62 T720,62 T780,62 T840,62;M-90,62 Q-60,76 -30,62 T30,62 T90,62 T150,62 T210,62 T270,62 T330,62 T390,62 T450,62 T510,62 T570,62 T630,62 T690,62 T750,62 T810,62;M-60,62 Q-30,48 0,62 T60,62 T120,62 T180,62 T240,62 T300,62 T360,62 T420,62 T480,62 T540,62 T600,62 T660,62 T720,62 T780,62 T840,62" />
        </path>
      </g>
      <text x="16" y="28" fontSize="13" fill={FOAM} opacity=".85">知识型的潮水</text>
    </svg>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <div className="seg" style={{ marginBottom: 0 }}>
        <button className={phase === 0 ? "on" : ""} onClick={tide} disabled={phase !== 0}>🌊 涨潮</button>
        <button onClick={reset} disabled={phase === 0}>↺ 重新画一张脸</button>
      </div>
    </div>
    <p style={{ margin: 0 }}>{phase < 2
      ? <>沙上的脸看上去清晰、自然，好像一直在那里。可它只是某次退潮后平整沙面上的一幅画：「人」这个形象，是约 1800 年那次知识布局变动画出来的。</>
      : <>福柯打赌：如果支撑「人」的那套布局像古典思想的地基在 18 世纪末那样崩塌，<C id="death_of_man">人</C>就会被抹去。消失的不是人类，而是知识中「人」的形象；沙滩（知识本身）还在，等着下一幅画。</>}
    </p>
    <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>注意福柯的语气：他说的是「如果」「也许」，并且明言这些是无法回答、只能悬置的问题。</p>
  </div>;
}
