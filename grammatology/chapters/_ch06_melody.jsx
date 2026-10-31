// 第 6 章专属图解 ①：旋律 / 和声 / 间隔 —— 从叫喊到歌的滑块 + 可试听
import { useState, useRef } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", GREEN = "#3d6b4a";
const SCALE = [0, 2, 4, 5, 7, 9, 11, 12, 14];           // 大调音阶（半音数）
const NAMES = ["do", "re", "mi", "fa", "sol", "la", "si", "do'", "re'"];
const SEG = 8;                                          // 8 个「音节」
const W = 600, H = 270, X0 = 54, X1 = 584, Y0 = 228, Y1 = 26, PMAX = 14;

// 一段激动说话的音高轮廓（连续滑动，单位：半音）
const contour = t => 6.2 + 3.6 * Math.sin(t * 5.3 + .4) + 2.1 * Math.sin(t * 13.1 + 1.2) + 1.1 * Math.sin(t * 29 + .3) - 2.2 * t;
const segOf = t => Math.min(SEG - 1, Math.floor(t * SEG));
const nearest = p => SCALE.reduce((a, b) => Math.abs(b - p) < Math.abs(a - p) ? b : a);
// 每个音节的「歌唱音」：取该音节中点的轮廓并贴到音阶上
const NOTES = Array.from({ length: SEG }, (_, k) => nearest(contour((k + .5) / SEG)));
const pitch = (t, s) => (1 - s) * contour(t) + s * NOTES[segOf(t)];
const xOf = t => X0 + t * (X1 - X0), yOf = p => Y0 - (p / PMAX) * (Y0 - Y1);
const hz = p => 261.63 * Math.pow(2, p / 12);

const MODES = [
  { id: "rousseau", label: "① 卢梭：旋律 = 激情的重音", color: RED },
  { id: "rameau", label: "② 加上和声（拉莫）", color: BLUE },
  { id: "derrida", label: "③ 德里达：间隔早已在源头", color: GREEN },
];

function stageText(s) {
  if (s < .25) return ["叫喊 / 哭诉", "音高一直在滑，没有一处停得住。卢梭自己说：孩子会叫、会哭，却不会唱；聋哑人只发出「没有持久性」的声音。这还不是歌。"];
  if (s < .7) return ["说话的抑扬", "音高开始在某些点上停留，像激动时说话的语调——卢梭眼中「旋律」的胚胎：模仿激情之声的重音（accent）。"];
  return ["歌", "每个音节的音高都「停住」并落在音阶的某一级上：这才是能被记住、被重复、被别人跟着唱的歌。注意——它已经由一级一级的间隔构成了。"];
}

export default function MelodyLab() {
  const [m, setM] = useState(0);
  const [s, setS] = useState(.55);
  const [play, setPlay] = useState(0);
  const ctxRef = useRef(null);
  const mode = MODES[m].id;
  const N = 160;
  const pts = Array.from({ length: N + 1 }, (_, i) => { const t = i / N; return `${xOf(t).toFixed(1)},${yOf(pitch(t, s)).toFixed(1)}`; });
  const [stage, stageDesc] = stageText(s);

  const listen = () => {
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      const ctx = ctxRef.current || (ctxRef.current = new AC());
      const now = ctx.currentTime + .05, D = 3.2;
      const mk = (type, g0) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = type; o.connect(g); g.connect(ctx.destination);
        g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(g0, now + .08); g.gain.setValueAtTime(g0, now + D - .15); g.gain.linearRampToValueAtTime(0, now + D); return o; };
      const v = mk("triangle", .22);
      for (let i = 0; i <= 64; i++) { const t = i / 64; v.frequency[i ? "linearRampToValueAtTime" : "setValueAtTime"](hz(pitch(t, s)), now + t * D); }
      v.start(now); v.stop(now + D + .05);
      if (mode === "rameau") {
        NOTES.forEach((n, k) => {
          const root = n - 12;
          [root, root + 4, root + 7].forEach(p => {
            const o = ctx.createOscillator(), g = ctx.createGain(); o.type = "sine"; o.frequency.value = hz(p);
            o.connect(g); g.connect(ctx.destination);
            const a = now + k * D / SEG, b = a + D / SEG;
            g.gain.setValueAtTime(0, a); g.gain.linearRampToValueAtTime(.06, a + .03); g.gain.setValueAtTime(.06, b - .05); g.gain.linearRampToValueAtTime(0, b);
            o.start(a); o.stop(b + .02);
          });
        });
      }
      setPlay(p => p + 1);
    } catch (e) { /* 无音频环境时静默 */ }
  };

  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg">{MODES.map((x, j) =>
        <button key={x.id} className={m === j ? "on" : ""} onClick={() => setM(j)}>{x.label}</button>)}</div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        {/* 音阶线：模式 ① 淡，模式 ②③ 显 */}
        {SCALE.map((p, i) => <g key={p}>
          <line x1={X0} x2={X1} y1={yOf(p)} y2={yOf(p)} stroke={mode === "rousseau" ? "#0002" : BLUE} strokeOpacity={mode === "rousseau" ? 1 : .35} strokeDasharray={mode === "rousseau" ? "2 6" : "none"} />
          <text x={X0 - 8} y={yOf(p) + 4} textAnchor="end" fontSize="11" fill={INK} opacity=".55">{NAMES[i]}</text>
        </g>)}

        {/* 和声：每个音节下方的三和弦块 */}
        {mode === "rameau" && NOTES.map((n, k) => {
          const xa = xOf(k / SEG) + 4, xb = xOf((k + 1) / SEG) - 4, root = Math.max(0, n - 7);
          return <g key={k}>
            {[root, root + 4 <= PMAX ? root + 4 : root, n].map((p, j) =>
              <rect key={j} x={xa} y={yOf(p) - 5} width={xb - xa} height="10" rx="4" fill={BLUE} opacity={.18 + j * .06}>
                <animate attributeName="opacity" values={`${.12 + j * .05};${.3 + j * .05};${.12 + j * .05}`} dur="2.4s" begin={`${k * .15}s`} repeatCount="indefinite" />
              </rect>)}
          </g>;
        })}

        {/* 声音的轨迹 */}
        <polyline points={pts.join(" ")} fill="none" stroke={MODES[m].color} strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" />

        {/* 德里达：标出音节之间的间隔 */}
        {mode === "derrida" && s > .45 && NOTES.slice(1).map((n, k) => {
          const prev = NOTES[k], x = xOf((k + 1) / SEG), d = n - prev;
          if (!d) return null;
          return <g key={k}>
            <line x1={x} x2={x} y1={yOf(prev)} y2={yOf(n)} stroke={GOLD} strokeWidth="2.5" strokeDasharray="4 3">
              <animate attributeName="stroke-dashoffset" values="0;14" dur="1s" repeatCount="indefinite" />
            </line>
            <text x={x + 4} y={(yOf(prev) + yOf(n)) / 2 + 4} fontSize="11" fill={GOLD}>{d > 0 ? "+" : ""}{d}</text>
          </g>;
        })}
        {mode === "derrida" && s <= .45 &&
          <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="13" fill={GOLD}>把滑块往「歌」那边推，看看间隔从哪里冒出来</text>}

        {/* 播放头 */}
        {play > 0 && <line key={play} x1={X0} x2={X0} y1={Y1 - 8} y2={Y0 + 6} stroke={INK} strokeWidth="1.5" opacity=".6">
          <animate attributeName="x1" from={X0} to={X1} dur="3.2s" fill="freeze" />
          <animate attributeName="x2" from={X0} to={X1} dur="3.2s" fill="freeze" />
        </line>}
        <text x={X1} y={H - 8} textAnchor="end" fontSize="11" fill={INK} opacity=".5">时间 →</text>
      </svg>

      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 14, color: "var(--muted)" }}>叫喊</span>
        <input type="range" min="0" max="1" step=".01" value={s} onChange={e => setS(+e.target.value)} style={{ flex: "1 1 220px" }} aria-label="从叫喊到歌" />
        <span style={{ fontSize: 14, color: "var(--muted)" }}>歌</span>
        <div className="seg" style={{ margin: 0 }}><button className="on" onClick={listen}>▶ 听一听</button></div>
      </div>

      <div style={{ fontFamily: "var(--serif)", fontSize: 19 }}>此刻：<b style={{ color: MODES[m].color }}>{stage}</b></div>
      <p style={{ margin: 0 }}>{stageDesc}</p>

      {mode === "rousseau" && <p style={{ margin: 0 }}>
        <b>卢梭的故事：</b>起初说话就是唱歌，<C id="accent">重音</C>就是旋律；<C id="melody_harmony">旋律</C>模仿激情的声音，所以能直接打动人心。音阶那几条虚线，在他看来是后来才被画上去的「格子」。
      </p>}
      {mode === "rameau" && <p style={{ margin: 0 }}>
        <b>堕落的故事：</b>拉莫（Rameau）说和声是音乐的基础、旋律由和声派生。卢梭反驳：和声只是「音程的计算」，它<i>抹掉</i>激情的重音、<i>替换</i>成和声间隔，让歌与说话分家——这是从外面加进来的、危险的<C id="supplement_logic">增补</C>。（点「听一听」，蓝色方块就是加进来的和弦。）
      </p>}
      {mode === "derrida" && <p style={{ margin: 0 }}>
        <b>德里达的反转：</b>卢梭自己承认：说话的声音缺的只是「持久性」就能成歌，而他在《音乐辞典》里给「歌」下定义时就用到了「音程」。也就是说，旋律要成为可重复、可辨认的歌，就<i>必须</i>已经停在一级一级的<C id="spacing">间隔</C>上。和声并没有从外部闯入——它要「补」的那个缺口，在源头处就已经在了。
      </p>}
    </div>);
}
