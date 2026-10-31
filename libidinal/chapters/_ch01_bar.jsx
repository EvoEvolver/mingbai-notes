// 第 1 章专属图解：横杠的旋转（转速滑块 → 力比多带 ⇄ 剧场体积）
import { useState, useEffect, useRef } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", GREY = "#8a8178";
const TAU = Math.PI * 2;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;

// 力比多带的中线：一条 8 字形（莫比乌斯带的平面投影，只有一面）
const lem = u => [320 + 235 * Math.sin(u), 180 + 118 * Math.sin(2 * u)];
// 剧场的「台口」矩形：带子被折成的盒子正面
const RX = 150, RY = 60, RW = 340, RH = 240, PER = 2 * (RW + RH);
const rect = u => {
  let d = (((u / TAU) % 1) + 1) % 1 * PER;
  if (d < RW) return [RX + d, RY];
  d -= RW; if (d < RH) return [RX + RW, RY + d];
  d -= RH; if (d < RW) return [RX + RW - d, RY + RH];
  d -= RW; return [RX, RY + RH - d];
};
const P = (u, m) => { const a = lem(u), b = rect(u + Math.PI / 2); return [lerp(a[0], b[0], m), lerp(a[1], b[1], m)]; };

const DOTS = Array.from({ length: 18 }, (_, i) => ({ base: i * TAU / 18 + Math.sin(i * 7.3), v: .6 + .8 * Math.abs(Math.sin(i * 3.1)), ph: i * 1.7 }));

const INFO = {
  band: { t: "力比多带 / 巨大的短暂皮肤", c: "libidinal_band", x: "把「身体」剖开摊平后得到的一条无限的带子：器官、皮肤、声音、词语、刀剑、草、画布……首尾相接。它像莫比乌斯带，要紧的不是封闭，而是只有一面——所以没有内与外，没有藏在背后的东西。" },
  dots: { t: "强度", c: "intensity", x: "在带上奔流、不可预测的能量光点。它们不代表任何东西、不缺任何东西，只是一次次单一的「通过」。转速越高，它们越烫、越快，也越无法被记下。" },
  bar: { t: "旋转的横杠", c: "turning_bar", x: "本来用来区分「这」与「非这」的那道横杠。利奥塔让它绕所有轴、绕一个随机漂移的中心狂转：它扫过的轨迹本身就生成了力比多带。转得越快，耗能越多，扫过的地方越热。" },
  both: { t: "「这」且「非这」", c: "incompossibility", x: "转速极高时，带上每一点在同一瞬间被横杠从两侧同时投注：它既是这，又是非这。不是因为阉割或矛盾心理，而是因为运动太快，根本来不及分出两边。这就是不可共存（incompossible）之痛。" },
  fortda: { t: "fort / da：时间与记忆的开始", c: "fort_da", x: "横杠减速到一定程度，「这」与「非这」开始轮流出现：现在是这，现在没了——正是弗洛伊德外孙玩线轴时喊的 fort/da。轮替带来重复，重复带来记忆、时间与叙事。" },
  stage: { t: "舞台：那边，非这", c: "theatrical_volume", x: "横杠慢下来之后变成边界：那边是「非这」，这边是「这」。舞台上演的永远是一个不在场的「外部」的表征——人物只是替代品，意义总在别处。" },
  hall: { t: "观众席：这边", c: "theatrical_volume", x: "剧场把观众这一侧当作不存在：所有目光被导向舞台，而舞台又指向更远处。利奥塔说，奥古斯丁重建的正是这种「无视观众席、只看舞台」的装置。" },
  outside: { t: "门外的「外部」", c: "disintensification", x: "概念靠排斥运作：要么这、要么非这。被排斥的「非这」被留在剧场门口，成了「外部」；接着概念又想去征服、吞并它——旅行、人类学、精神病学，对被排斥者的爱，都是这出戏。" },
  zero: { t: "大零", c: "great_zero", x: "剧场后方那个空的中心：上帝、柏拉图理念、能指、他者、资本……一切强度都被归到它那里结账。利奥塔不说它是谬误，而说它本身也是一种欲望的形象——只是带着恐怖与「应当」。" },
  price: { t: "越界要付钱：价值诞生", c: "abatement", x: "一旦有了边界，从「非这」到「这」就要付代价：登台要买票，「拥有」成了以否定为前提的假肢。掩饰结束，价值与矛盾心理开始。会计学由此进入欲望。" },
};

function regime(s) {
  if (s >= 62) return { n: "极速：力比多带", d: "横杠转得飞快，这/非这来不及区分，强度在一面无背的带子上奔流。没有内外，没有中心，也没有记忆。" };
  if (s >= 22) return { n: "减速：fort / da", d: "横杠变慢，「这」与「非这」开始轮流出现。带子被折弯，时间、重复、记忆随之出现。" };
  return { n: "停转：剧场体积", d: "横杠停成一道边界。带子被折成有内外、台前台后的盒子，中心出现大零：表征、意义、价值都在这里诞生。" };
}

export default function TurningBar() {
  const [s, setS] = useState(90);
  const [sel, setSel] = useState(null);
  const [sweep, setSweep] = useState(false);
  const [, force] = useState(0);
  const st = useRef({ t: 0, th: 0, last: null, s: 90, sweep: false });
  st.current.s = s; st.current.sweep = sweep;

  useEffect(() => {
    let raf;
    const loop = now => {
      const r = st.current;
      const dt = r.last == null ? 0 : Math.min(.05, (now - r.last) / 1000);
      r.last = now;
      const k = r.s / 100, m = clamp((55 - r.s) / 35);
      r.th += TAU * k * k * 5 * (1 - m) * dt;
      r.t += dt * (.15 + k);
      if (r.sweep) {
        const ns = r.s - dt * 14;
        if (ns <= 4) { setS(4); setSweep(false); } else setS(ns);
      }
      force(x => x + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const { t, th } = st.current;
  const k = s / 100, m = clamp((55 - s) / 35), o2 = clamp((m - .55) / .45), oBand = 1 - .75 * m;
  const pts = []; for (let i = 0; i <= 160; i++) pts.push(P(i / 160 * TAU, m));
  const path = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");

  // 横杠：沿带子漂移，减速时滑到台口下沿，变成边界
  const ub = t * .35 + .6 * Math.sin(t * .7);
  const bc0 = P(ub, 0);
  const bx = lerp(bc0[0], 320, m), by = lerp(bc0[1], 300, m), bl = lerp(30, 170, m);
  let a = ((th % Math.PI) + Math.PI) % Math.PI; if (a > Math.PI / 2) a -= Math.PI;
  const ang = a * (1 - m);
  const omega = TAU * k * k * 5 * (1 - m);
  const ghosts = omega > .5 ? Array.from({ length: 9 }, (_, j) => ang - j * omega * .011) : [ang];
  const seg = (g, key, op, w) => <line key={key} x1={bx - bl * Math.cos(g)} y1={by - bl * Math.sin(g)} x2={bx + bl * Math.cos(g)} y2={by + bl * Math.sin(g)}
    stroke={INK} strokeWidth={w} strokeLinecap="round" opacity={op} />;
  const fortda = Math.cos(th * 1.0) > 0;
  const R = regime(s);
  const pick = id => e => { e.stopPropagation(); setSel(id); };
  const hot = { cursor: "pointer" };
  const info = sel && INFO[sel];

  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <b style={{ fontFamily: "var(--serif)", fontSize: 19 }}>{R.n}</b>
        <span style={{ color: "var(--muted)", fontSize: 14, flex: "1 1 260px" }}>{R.d}</span>
      </div>
      <svg viewBox="0 0 640 390" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }} onClick={() => setSel(null)}>
        <defs>
          <linearGradient id="ch01heat" x1="0" x2="1">
            <stop offset="0" stopColor={GOLD} /><stop offset=".5" stopColor={RED} /><stop offset="1" stopColor={GOLD} />
          </linearGradient>
          <radialGradient id="ch01glow"><stop offset="0" stopColor={RED} stopOpacity=".55" /><stop offset="1" stopColor={RED} stopOpacity="0" /></radialGradient>
        </defs>

        {/* ---- 剧场体积（慢速时浮现） ---- */}
        <g opacity={o2} style={{ pointerEvents: o2 > .5 ? "auto" : "none" }}>
          <g onClick={pick("outside")} style={hot}>
            <rect x="8" y="60" width="118" height="240" rx="10" fill={BLUE} opacity=".07" />
            <rect x="514" y="60" width="118" height="240" rx="10" fill={BLUE} opacity=".07" />
            <rect x="126" y="200" width="20" height="60" fill="none" stroke={BLUE} strokeDasharray="3 3" />
            <text x="67" y="170" textAnchor="middle" fontSize="13" fill={BLUE}>门外</text>
            <text x="67" y="188" textAnchor="middle" fontSize="11" fill={BLUE}>被排斥的「外部」</text>
            <text x="573" y="170" textAnchor="middle" fontSize="13" fill={BLUE}>门外</text>
            <text x="573" y="188" textAnchor="middle" fontSize="11" fill={BLUE}>等着被征服</text>
          </g>
          <g onClick={pick("stage")} style={hot}>
            <polygon points="150,300 490,300 390,230 250,230" fill={GOLD} opacity=".22" />
            <polygon points="150,60 250,120 250,230 150,300" fill={INK} opacity=".05" />
            <polygon points="490,60 390,120 390,230 490,300" fill={INK} opacity=".05" />
            <rect x="250" y="120" width="140" height="110" fill={INK} opacity=".08" />
            {[[150, 60, 250, 120], [490, 60, 390, 120], [150, 300, 250, 230], [490, 300, 390, 230]].map((l, i) =>
              <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke={INK} opacity=".35" />)}
            <path d="M150 60 Q175 120 162 175 L150 175 Z" fill={RED} opacity=".55" />
            <path d="M490 60 Q465 120 478 175 L490 175 Z" fill={RED} opacity=".55" />
            {[230, 320, 410].map((x, i) => <g key={i} transform={`translate(${x},${262 + (i === 1 ? -8 : 0)})`}>
              <circle cy="-16" r="6" fill={GREY} /><rect x="-6" y="-9" width="12" height="20" rx="4" fill={GREY} />
              <line x1="0" y1="-16" x2={(320 - x) * .9} y2={-90 + (i === 1 ? 8 : 0)} stroke={GREY} strokeDasharray="2 4" />
            </g>)}
            <text x="320" y="292" textAnchor="middle" fontSize="12" fill={INK}>那边：非这（表征）</text>
          </g>
          <g onClick={pick("zero")} style={hot}>
            <circle cx="320" cy="168" r="24" fill="var(--paper)" stroke={INK} strokeWidth="2.5" />
            <text x="320" y="178" textAnchor="middle" fontSize="28" fontFamily="var(--serif)" fill={INK}>0</text>
            <text x="320" y="136" textAnchor="middle" fontSize="11" fill={INK}>大零</text>
          </g>
          <g onClick={pick("hall")} style={hot}>
            {[0, 1, 2].map(r => Array.from({ length: 9 - r }, (_, i) =>
              <circle key={r + "-" + i} cx={320 + (i - (8 - r) / 2) * (34 + r * 4)} cy={334 + r * 18} r="6" fill={BLUE} opacity={.35 + r * .1} />))}
            <text x="320" y="388" textAnchor="middle" fontSize="12" fill={BLUE}>这边：这（观众席，被无视的一侧）</text>
          </g>
          <g onClick={pick("price")} style={hot}>
            <rect x="500" y="306" width="118" height="26" rx="13" fill={GOLD} opacity=".25" />
            <text x="559" y="324" textAnchor="middle" fontSize="12" fill={INK}>越界要付钱</text>
          </g>
        </g>

        {/* ---- 力比多带 ---- */}
        <g opacity={oBand} onClick={pick("band")} style={hot}>
          <path d={path} fill="none" stroke="url(#ch01heat)" strokeOpacity={.18 + .3 * (1 - m)} strokeWidth={lerp(34, 6, m)} strokeLinejoin="round" />
          <path d={path} fill="none" stroke={RED} strokeWidth="1.5" strokeDasharray="5 16" strokeDashoffset={-t * 220} opacity={.25 + .5 * k} />
        </g>
        <g onClick={pick("dots")} style={hot} opacity={1 - .85 * m}>
          {DOTS.map((d, i) => {
            const [x, y] = P(d.base + t * d.v * 1.2, m);
            const heat = clamp(k + .15 * Math.sin(t * 4 + d.ph));
            return <circle key={i} cx={x} cy={y} r={2.5 + 5 * heat * Math.abs(Math.sin(t * 3 + d.ph))} fill={heat > .55 ? RED : GOLD} opacity={.45 + .5 * heat} />;
          })}
        </g>

        {/* ---- 横杠 ---- */}
        <g onClick={pick(m > .7 ? "price" : "bar")} style={hot}>
          {omega > .5 && <circle cx={bx} cy={by} r={bl + 12} fill="url(#ch01glow)" opacity={clamp(k * k * 1.3)} />}
          {ghosts.map((g, j) => seg(g, j, j ? .5 * (1 - j / ghosts.length) : 1, j ? 3 : 5))}
          <circle cx={bx} cy={by} r={m > .7 ? 0 : 3.5} fill={GOLD} />
        </g>
        {s >= 62 && <g onClick={pick("both")} style={hot}>
          <rect x={bx - 46} y={by - 62} width="92" height="22" rx="11" fill="var(--paper)" stroke={RED} opacity=".9" />
          <text x={bx} y={by - 47} textAnchor="middle" fontSize="13" fill={RED}>这 ∧ 非这</text>
        </g>}
        {s < 62 && s >= 22 && <g onClick={pick("fortda")} style={hot}>
          <rect x={bx - 50} y={by - 66} width="100" height="40" rx="10" fill="var(--paper)" stroke={BLUE} opacity=".95" />
          <text x={bx} y={by - 49} textAnchor="middle" fontSize="15" fill={fortda ? RED : BLUE}>{fortda ? "这" : "非这"}</text>
          <text x={bx} y={by - 33} textAnchor="middle" fontSize="11" fill={GREY}>{fortda ? "da！在这儿" : "fort！没了"}</text>
        </g>}
        {m > .7 && <text x="320" y="318" textAnchor="middle" fontSize="11" fill={INK} style={{ pointerEvents: "none" }}>—— 横杠 = 边界：这 | 非这 ——</text>}
        {m < .3 && <text x="14" y="24" fontSize="12" fill={GREY} style={{ pointerEvents: "none" }}>只有一面 · 无内无外 · 无中心</text>}
      </svg>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <label style={{ fontSize: 14, color: "var(--muted)" }}>横杠转速</label>
        <input type="range" min="0" max="100" value={Math.round(s)} onChange={e => { setSweep(false); setS(+e.target.value); }} style={{ flex: "1 1 220px", accentColor: RED }} />
        <div className="seg" style={{ margin: 0 }}>
          <button className={s >= 62 ? "on" : ""} onClick={() => { setSweep(false); setS(95); }}>极速</button>
          <button className={s < 62 && s >= 22 ? "on" : ""} onClick={() => { setSweep(false); setS(42); }}>减速</button>
          <button className={s < 22 ? "on" : ""} onClick={() => { setSweep(false); setS(4); }}>停转</button>
          <button className={sweep ? "on" : ""} onClick={() => { setS(100); setSweep(true); }}>▶ 演示冷却</button>
        </div>
      </div>

      <div style={{ minHeight: 92, borderTop: "1px solid var(--line)", paddingTop: 10 }}>
        {info ? <>
          <div style={{ fontFamily: "var(--serif)", fontSize: 19 }}>{info.t} <span style={{ fontSize: 14 }}>→ <C id={info.c}>概念卡</C></span></div>
          <p style={{ margin: "6px 0 0" }}>{info.x}</p>
        </> : <p style={{ margin: 0, color: "var(--muted)" }}>
          点图中的任何元素（带子、光点、横杠、标签；慢下来后还有舞台、观众席、门外、大零、价签）看解释。拖动滑块，或按「演示冷却」看带子怎样被折成剧场。
        </p>}
      </div>
    </div>);
}
