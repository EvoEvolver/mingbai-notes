// 导言专属图解：术语装置图。一个「横杠转速」开关：快 → 力比多带；慢 → 剧场体积与大零出现。
import { useState, useEffect, useRef } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", VIO = "#6b4c8a", GREEN = "#3f6b3a";
const N = 140, K = 14;
const CX = 330, CY = 190;
const RX0 = 160, RX1 = 500, RY0 = 85, RY1 = 305; // 剧场矩形
const ZX = 330, ZY = 150; // 大零位置

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };

// 带：一条自我交叉的「8」字曲线，暗示只有一面的扭转之带
function bandPt(t) {
  const s = Math.sin(t), c = Math.cos(t), d = 1 + s * s;
  return [CX + 230 * c / d, CY + 150 * s * c / d];
}
// 剧场：矩形周长参数化
function rectPt(t) {
  const W = RX1 - RX0, H = RY1 - RY0, P = 2 * (W + H);
  let u = (((t / (2 * Math.PI)) % 1 + 1) % 1) * P;
  if (u < W) return [RX0 + u, RY0]; u -= W;
  if (u < H) return [RX1, RY0 + u]; u -= H;
  if (u < W) return [RX1 - u, RY1]; u -= W;
  return [RX0, RY1 - u];
}
// 剧场里符号的固定座位（避开大零）
const SLOTS = Array.from({ length: K }, (_, i) => {
  const col = i % 7, row = Math.floor(i / 7);
  return [RX0 + 34 + col * 45, row === 0 ? 225 : 270];
});
const SEEDS = Array.from({ length: K }, (_, i) => ({ t0: i * 2 * Math.PI / K, v: .6 + ((i * 37) % 11) / 10, ph: i * 1.7 }));

const NODES = [
  { id: "libidinal_band", name: "力比多带 / 皮肤", icon: "🎗️", color: RED,
    plain: "一张只有一面、没有里外的表面。一切还没被分成「主体/客体」「内/外」之前的状态。",
    now: f => f < .34 ? "现在正是这个样子：只有一条扭转的带，强度在上面乱窜。" : f < .67 ? "它正在被弯折，开始有了「边」。" : "它被折成了一个盒子——但译者提醒：带与横杠「是同一个东西」，剧场只是慢下来的带。" },
  { id: "the_bar", name: "横杠", icon: "➖", color: INK,
    plain: "一个会旋转的「区分」：把发生的事切成「这」和「非这」。转得飞快时什么都分不开，等于没有区分。",
    now: f => f < .34 ? "横杠转得飞快：区分刚出现就被抹掉，于是我们只看到带。" : f < .67 ? "横杠在减速：「这/非这」开始能被分辨。" : "横杠几乎停住：它冷却成一道道固定的概念边界（理想/真实、正常/变态……）。" },
  { id: "theatrical_volume", name: "剧场体积", icon: "🎭", color: BLUE,
    plain: "带被折成有里有外的「体积」：台上的表象、台后的本质；符号在里，所指在外。",
    now: f => f < .34 ? "还没有剧场。把转速调慢试试。" : f < .67 ? "剧场正在成形：曲线正被拉直成一个盒子。" : "剧场已经搭好：台上的一切都要参照「别处」来获得意义。" },
  { id: "great_zero", name: "大零", icon: "⭕", color: VIO,
    plain: "剧场背后那个「空的中心」：上帝、理念、真正的生产方式、菲勒斯……一切意义都被算到它头上。",
    now: f => f < .67 ? "大零还没出现——它只是横杠变慢的效果，不是原本就在那里的东西。" : "大零出现了：每个强度都被虚线拉向它，变成「缺了点什么」的符号。所以利奥塔说意义理论都是虚无主义的。" },
  { id: "intensity", name: "强度", icon: "✴️", color: GOLD,
    plain: "不受束缚的能量冲动：可移置、瞬间的、记不住的，谁也无法「意愿」它。",
    now: f => f < .34 ? "看那些闪烁的点：位置不定、大小不定，这就是强度。" : f < .67 ? "强度开始被安排到座位上。" : "强度被固定成可交流、可交换的符号，闪烁几乎熄灭。" },
  { id: "tensor_sign", name: "张量（符号）", icon: "↯", color: RED,
    plain: "每个符号都是双重的：既是指向缺席意义的符号，又是一团不可交换的强度；两面互相掩饰。",
    now: f => f < .67 ? "打开下方的「张量视角」，再把转速调慢：你会看到符号的两面同时在场。" : "张量视角下，每个符号既有指向大零的虚线（意义），又有自己的光晕（强度）。它不在表征「之外」，而就在符号里。" },
  { id: "dispositif", name: "装置", icon: "⚙️", color: GREEN,
    plain: "力比多能量的一种「布置」：把能量放在某处、以某种方式流动。dis- 是移动，posit 是安放。",
    now: f => `滑杆每停在一个位置，就是一种装置——现在这一个是「${f < .34 ? "带" : f < .67 ? "半折叠" : "剧场 + 大零"}」。剧场与大零本身也只是一种装置，并非真相。` },
  { id: "investment", name: "投注", icon: "📍", color: BLUE,
    plain: "能量占据一个位置（Besetzung）：既是精神分析的「贯注」，也是金融的「投资」，还是军事的「驻军」。",
    now: f => f < .34 ? "投注在带上不断换位：力比多从不为一个「更好」的投注而放弃旧的。" : "细线标出能量被安顿在哪个座位上：这就是投注，也是批判「驻军守边」的原型。" },
];

export default function TermApparatus() {
  const [speed, setSpeed] = useState(90);
  const [sel, setSel] = useState("the_bar");
  const [tensor, setTensor] = useState(false);
  const [time, setTime] = useState(0);
  const st = useRef({ ang: 0, ts: SEEDS.map(s => s.t0), last: 0, speed: .9 });
  st.current.speed = speed / 100;

  useEffect(() => {
    let raf;
    const tick = now => {
      const S = st.current, dt = S.last ? Math.min(.05, (now - S.last) / 1000) : 0; S.last = now;
      const sp = S.speed;
      S.ang += (0.3 + sp * sp * 28) * dt;
      S.ts = S.ts.map((t, i) => t + SEEDS[i].v * (sp * sp) * 1.4 * dt);
      setTime(now / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const sp = speed / 100, f = 1 - sp;           // f：折叠程度
  const fold = smooth(.25, .8, f);              // 曲线 → 矩形
  const zeroOp = smooth(.6, .85, f);
  const phase = f < .34 ? 0 : f < .67 ? 1 : 2;
  const node = NODES.find(n => n.id === sel);
  const hi = id => sel === id;

  // 带/剧场的轮廓
  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N * 2 * Math.PI, a = bandPt(t), b = rectPt(t + Math.PI / 4);
    return [lerp(a[0], b[0], fold), lerp(a[1], b[1], fold)];
  });
  const path = "M" + pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join("L");

  // 强度粒子
  const jit = sp * sp * 14;
  const parts = st.current.ts.map((t, i) => {
    const b = bandPt(t), ph = SEEDS[i].ph;
    const bx = b[0] + Math.sin(time * 7 + ph) * jit, by = b[1] + Math.cos(time * 5 + ph * 2) * jit;
    const [sx, sy] = SLOTS[i];
    const k = smooth(.3, .8, f);
    const flick = Math.abs(Math.sin(time * (3 + SEEDS[i].v * 4) + ph));
    const halo = (1 - k) + (tensor ? k * .9 : 0);
    return { x: lerp(bx, sx, k), y: lerp(by, sy, k), r: lerp(3 + flick * 6 * sp, 4.5, k), flick, halo, k };
  });

  const bandStroke = hi("libidinal_band") ? 9 : 6;
  const barLen = 30;

  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <b style={{ fontFamily: "var(--serif)", fontSize: 18 }}>横杠转速</b>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>慢</span>
        <input type="range" min="0" max="100" value={speed} onChange={e => setSpeed(+e.target.value)} style={{ flex: "1 1 200px", accentColor: RED }} aria-label="横杠转速" />
        <span style={{ fontSize: 13, color: "var(--muted)" }}>快</span>
        <div className="seg" style={{ margin: 0 }}>
          {[["快：带", 92], ["减速", 50], ["慢：剧场", 6]].map(([l, v]) =>
            <button key={l} className={Math.abs(speed - v) < 8 ? "on" : ""} onClick={() => setSpeed(v)}>{l}</button>)}
          <button className={tensor ? "on" : ""} onClick={() => { setTensor(!tensor); setSel("tensor_sign"); }}>↯ 张量视角</button>
        </div>
      </div>

      <svg viewBox="0 0 660 380" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        {/* 装置：整体虚框 */}
        {hi("dispositif") && <g>
          <rect x="14" y="14" width="632" height="352" rx="16" fill="none" stroke={GREEN} strokeWidth="2.5" strokeDasharray="8 6" />
          <text x="640" y="32" textAnchor="end" fontSize="13" fill={GREEN}>此刻这整套布置 = 一个装置</text>
        </g>}

        {/* 带 → 剧场轮廓 */}
        <path d={path} fill={fold > .9 ? "rgba(44,74,110,.06)" : "none"} stroke={lerp(0, 1, fold) > .5 ? BLUE : RED}
          strokeOpacity={hi("libidinal_band") || hi("theatrical_volume") ? 1 : .7}
          strokeWidth={hi("theatrical_volume") && fold > .5 ? 6 : bandStroke} strokeLinejoin="round" />
        {fold < .5 && <path d={path} fill="none" stroke={GOLD} strokeWidth="1.5" strokeDasharray="3 7" opacity={.8 - fold} />}

        {/* 剧场的「这 / 非这」 */}
        <g opacity={smooth(.45, .75, f)}>
          <line x1={RX0 + 10} y1="200" x2={RX1 - 10} y2="200" stroke={BLUE} strokeDasharray="2 4" opacity=".5" />
          <text x={RX0 + 12} y={RY1 - 8} fontSize="12" fill={BLUE}>内 · 这：台上的表象 / 符号</text>
          <text x={RX1 + 8} y={RY0 + 12} fontSize="12" fill={BLUE}>外 · 非这</text>
          <text x={RX1 + 8} y={RY0 + 28} fontSize="12" fill={BLUE}>本质 / 所指</text>
          <text x={RX0 - 8} y={RY0 - 8} fontSize="13" fill={BLUE} fontWeight={hi("theatrical_volume") ? 700 : 400}>🎭 剧场体积</text>
        </g>

        {/* 大零 */}
        <g opacity={zeroOp}>
          <circle cx={ZX} cy={ZY} r={hi("great_zero") ? 34 : 28} fill="var(--paper)" stroke={VIO} strokeWidth={hi("great_zero") ? 4 : 2.5} strokeDasharray="5 4">
            <animate attributeName="stroke-dashoffset" values="0;18" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x={ZX} y={ZY + 9} textAnchor="middle" fontSize="26" fontFamily="var(--serif)" fill={VIO}>0</text>
          <text x={ZX} y={ZY - 42} textAnchor="middle" fontSize="12" fill={VIO}>大零：空的中心 / 「别处」</text>
        </g>

        {/* 符号指向大零的虚线（意义） */}
        {parts.map((p, i) => {
          const op = zeroOp * .55; if (op < .02) return null;
          const dx = ZX - p.x, dy = ZY - p.y, d = Math.hypot(dx, dy), e = (d - 32) / d;
          return <line key={"a" + i} x1={p.x} y1={p.y} x2={p.x + dx * e} y2={p.y + dy * e} stroke={VIO} strokeWidth="1" strokeDasharray="3 3" opacity={op} />;
        })}

        {/* 投注：能量被安放的位置 */}
        {hi("investment") && parts.map((p, i) => {
          const [sx, sy] = SLOTS[i];
          const tgt = p.k > .5 ? [sx, sy + 18] : bandPt(st.current.ts[i] + .5);
          return <g key={"inv" + i}>
            <line x1={p.x} y1={p.y} x2={tgt[0]} y2={tgt[1]} stroke={BLUE} strokeWidth="1.2" opacity=".7" />
            <text x={tgt[0]} y={tgt[1] + 4} textAnchor="middle" fontSize="10">📍</text>
          </g>;
        })}

        {/* 强度粒子（张量：光晕 + 符号） */}
        {parts.map((p, i) => <g key={"p" + i}>
          {p.halo > .05 && <circle cx={p.x} cy={p.y} r={p.r + 6 + p.flick * 8} fill={GOLD} opacity={p.halo * (.15 + p.flick * .25) * (hi("intensity") || hi("tensor_sign") ? 1.6 : 1)} />}
          <circle cx={p.x} cy={p.y} r={p.r} fill={p.k > .6 ? (tensor ? RED : INK) : (i % 2 ? RED : GOLD)}
            stroke={hi("intensity") ? INK : "none"} strokeWidth="1.5" opacity={lerp(.55 + p.flick * .45, .9, p.k)} />
        </g>)}

        {/* 横杠 */}
        <g transform="translate(70,330)">
          {sp > .55 && <circle r={barLen} fill={INK} opacity={(sp - .55) * .3} />}
          <line x1={-barLen * Math.cos(st.current.ang)} y1={-barLen * Math.sin(st.current.ang)}
            x2={barLen * Math.cos(st.current.ang)} y2={barLen * Math.sin(st.current.ang)}
            stroke={hi("the_bar") ? RED : INK} strokeWidth={hi("the_bar") ? 7 : 5} strokeLinecap="round" opacity={sp > .8 ? .55 : 1} />
          <text x="44" y="-6" fontSize="13" fill={INK}>横杠</text>
          <text x="44" y="12" fontSize="12" fill="var(--muted)">{phase === 0 ? "飞转：分不出这/非这" : phase === 1 ? "减速：区分开始成形" : "冷却：边界固定"}</text>
        </g>

        <text x="330" y="32" textAnchor="middle" fontSize="15" fontFamily="var(--serif)" fill={INK}>
          {phase === 0 ? "力比多带：只有一面，强度不可预测地奔流" : phase === 1 ? "带正在被弯折：「这 / 非这」开始出现" : "剧场体积：有内有外，一切都指向大零"}
        </text>
        {tensor && phase === 2 && <text x="330" y="360" textAnchor="middle" fontSize="12" fill={RED}>张量视角：每个符号同时是「指向大零的意义」与「自身的光晕强度」，二者互相掩饰</text>}
      </svg>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {NODES.map(n => <button key={n.id} onClick={() => setSel(n.id)}
          style={{ border: "1.5px solid " + (sel === n.id ? n.color : "var(--line)"), background: sel === n.id ? n.color : "var(--card)", color: sel === n.id ? "#fff" : "var(--ink)",
            borderRadius: 999, padding: "5px 12px", cursor: "pointer", font: "inherit", fontSize: 14 }}>{n.icon} {n.name}</button>)}
      </div>
      <div style={{ borderLeft: "4px solid " + node.color, paddingLeft: 14 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}><C id={node.id}>{node.icon} {node.name}</C></div>
        <p style={{ margin: "6px 0" }}>{node.plain}</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>🎚️ 在当前转速下：{node.now(f)}</p>
      </div>
    </div>);
}
