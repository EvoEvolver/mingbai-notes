// 第 10 章专属图解 A：精神分裂分析工具箱——否定任务（清洗）→ 第一积极任务（它怎样运转？）→ 第二积极任务（投注朝哪个方向？）
import { useState } from "react";
import { C } from "@kit";
import InvestPoles from "./_ch10_poles.jsx";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#6b6257";

/* ---------------- 第 1 步：否定任务 ---------------- */
const BG_PARTS = [
  ["🔧", 40, 140], ["👄", 90, 250], ["✋", 150, 120], ["👁️", 230, 260], ["⚙️", 300, 140], ["🐝", 380, 260],
  ["🌸", 440, 110], ["🎺", 520, 240], ["🪨", 590, 130], ["👂", 610, 270],
];
const STATUES = [
  { id: "oedipus", x: 40, y: 22, icon: "🔺", name: "俄狄浦斯三角", sub: "爸 · 妈 · 我",
    act: "去家庭化、去俄狄浦斯化", why: "俄狄浦斯不是无意识的「本来面目」，而是把整个社会场压缩成「爸-妈-我」的后来装置；书里说它是「虚拟的、反应性的」。" },
  { id: "ego", x: 245, y: 14, icon: "🧍", name: "「正常」自我", sub: "人格 · 身份",
    act: "拆解自我及其预设", why: "书中强调：精神分裂分析若不在积极任务之外加上「持续瓦解正常自我」这项破坏任务，就一事无成。男人女人都不是边界清晰的人格，而是振动、流、断裂与「结」。" },
  { id: "castration", x: 450, y: 30, icon: "✂️", name: "阉割 / 阳具", sub: "人人同一道伤口",
    act: "去阉割化", why: "阳具从来不是欲望的对象或原因，而是「把匮乏塞进欲望」的装置：它让所有流干涸，把来自外部与现实的无数断裂，统一成同一道与现实的断裂。" },
  { id: "theater", x: 100, y: 166, icon: "🎭", name: "幻想剧场", sub: "梦 · 幻想 · 表象",
    act: "拆掉剧场、梦与幻想", why: "精神分析把无意识当成上演家庭戏剧的舞台；D&G 说那里没有可挖掘的雕像，只有贝克特式可以拿来吮吸的石头，以及种种机器元素。" },
  { id: "death", x: 360, y: 176, icon: "🪦", name: "死亡本能", sub: "超验原则",
    act: "取消「死亡本能」", why: "弗洛伊德把死亡立为一个没有模型、没有经验的超验原则；D&G 反过来说：无意识里既有死亡的模型也有死亡的经验，所以根本不需要死亡本能——死亡只是欲望机器的一个部件。" },
];

function NegativeStep() {
  const [gone, setGone] = useState({});
  const n = Object.values(gone).filter(Boolean).length;
  const [last, setLast] = useState(null);
  const clear = id => { setGone(g => ({ ...g, [id]: true })); setLast(id); };
  const info = STATUES.find(s => s.id === last);
  return <div style={{ display: "grid", gap: 10 }}>
    <svg viewBox="0 0 660 300" style={{ width: "100%", maxHeight: 320, background: "var(--paper)", borderRadius: 14 }}>
      <g opacity={.15 + .85 * n / STATUES.length} style={{ transition: "opacity .8s" }}>
        {BG_PARTS.map(([e, x, y], i) => i > 0 &&
          <line key={"l" + i} x1={BG_PARTS[i - 1][1]} y1={BG_PARTS[i - 1][2]} x2={x} y2={y} stroke={GREEN} strokeWidth="2" strokeDasharray="5 6">
            {n === STATUES.length && <animate attributeName="stroke-dashoffset" from="22" to="0" dur=".9s" repeatCount="indefinite" />}
          </line>)}
        {BG_PARTS.map(([e, x, y], i) => <text key={i} x={x} y={y + 8} textAnchor="middle" fontSize="24">{e}
          {n === STATUES.length && <animate attributeName="y" values={`${y + 8};${y};${y + 8}`} dur="1.4s" begin={`${i * .12}s`} repeatCount="indefinite" />}</text>)}
      </g>
      {STATUES.map(s => <g key={s.id} onClick={() => clear(s.id)} style={{
        cursor: "pointer", opacity: gone[s.id] ? 0 : 1, transform: gone[s.id] ? "translateY(-60px)" : "none",
        transition: "opacity .7s, transform .7s", pointerEvents: gone[s.id] ? "none" : "auto"
      }}>
        <rect x={s.x} y={s.y} width="180" height="92" rx="10" fill="#e9dfcd" stroke={INK} strokeWidth="1.5" />
        <text x={s.x + 28} y={s.y + 52} textAnchor="middle" fontSize="28">{s.icon}</text>
        <text x={s.x + 54} y={s.y + 42} fontSize="16" fill={INK} fontWeight="600">{s.name}</text>
        <text x={s.x + 54} y={s.y + 64} fontSize="12" fill={MUTED}>{s.sub}</text>
        <text x={s.x + 170} y={s.y + 84} textAnchor="end" fontSize="10" fill={RED}>点我清除</text>
      </g>)}
      {n === STATUES.length && <text x="330" y="40" textAnchor="middle" fontSize="16" fill={GREEN} fontWeight="600">雕像清空 → 下面的欲望机器重新开动</text>}
    </svg>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {STATUES.map(s => <button key={s.id} className="chip" disabled={gone[s.id]} onClick={() => clear(s.id)}
        style={gone[s.id] ? { textDecoration: "line-through", opacity: .5 } : {}}>{s.icon} {s.act}</button>)}
      <button className="chip" onClick={() => { setGone({}); setLast(null); }}>↺ 全部复原</button>
    </div>
    <div style={{ borderLeft: `4px solid ${info ? RED : "var(--line)"}`, paddingLeft: 12, minHeight: 60 }}>
      {info ? <><b>清除 {info.icon} {info.name}：{info.act}</b><p style={{ margin: "4px 0 0" }}>{info.why}</p></>
        : <p style={{ margin: 0, color: "var(--muted)" }}>这些「大雕像」压在无意识上面，让底下的小零件动弹不得。点雕像或按钮把它们清掉，看看下面露出什么。</p>}
    </div>
    <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
      书里把 <C id="negative_task">否定任务</C> 形容为一场暴力、粗野的「可怕刮除」：去家庭化、去俄狄浦斯化、去阉割化，拆掉剧场、梦与幻想，解码、解域。但它和积极任务<b>同时</b>进行，不是先拆完再建。
    </p>
  </div>;
}

/* ---------------- 第 2 步：第一积极任务 ---------------- */
const SCENES = [
  {
    id: "mech", tab: "🔧 修车少年", src: "情景来自书中所引 Maud Mannoni 的信；部件拆解为本页示意",
    parts: [
      { id: "hand", e: "✋", n: "手", x: 140, y: 160 },
      { id: "wrench", e: "🔧", n: "扳手", x: 250, y: 95 },
      { id: "engine", e: "⚙️", n: "发动机", x: 400, y: 100 },
      { id: "ear", e: "👂", n: "耳朵", x: 490, y: 200 },
      { id: "garage", e: "🏚️", n: "修车铺", x: 270, y: 222 },
    ],
    flows: [["hand", "wrench", "力"], ["wrench", "engine", "扭矩"], ["engine", "ear", "轰鸣声"], ["ear", "hand", "节奏修正"], ["garage", "hand", "零件·活计"]],
    subject: "「我原来是会修车的人！」",
    meaning: {
      lines: [["wrench", "dad"], ["engine", "mom"], ["hand", "me"], ["garage", "dad"]],
      text: "（虚构的「典型诠释」，示意）扳手是父亲的阳具，发动机是母亲的身体；他沉迷修理，是想修复被父亲「阉割」的自己……一切都指回家里那三个人。",
    },
    how: "输入：零件、油污、师傅的指点；输出：一台重新响起来的发动机。书中引用的事实是：这个被判定「不适合读书」的少年，只要还能做点机械活，在课堂上就表现得很好；修车师傅是他最好的治疗师；拿走机械，他就会「再次变成精神分裂」。关键不在象征什么，而在社会机器（学校、修车铺）、技术机器（发动机）与欲望机器在这里接通了。",
    tips: {
      parts: "手、扳手、发动机、耳朵、修车铺：彼此异质、互不隶属，不是某个「整体」的碎片。它们只因流而相接。",
      flows: "力流进扳手，扭矩流进发动机，声音流进耳朵……每个部件都从上一个部件的流里切下一段，又发出新的流。红色短线就是「断流」。",
      bwo: "全神贯注时那种「忘了身体、只剩这台机器」的光滑平面：一切部件和动作都登记在它上面。它本身不干活，是不动的马达。",
      subject: "主体不在中心，而是在边上被「顺带」产生出来：「原来我是这样的人！」——一种被体验到的强度，而不是事先给定的自我。",
    },
  },
  {
    id: "game", tab: "🎵 沉迷音游的人", src: "现代情景，全部为示意",
    parts: [
      { id: "beat", e: "🎵", n: "节拍流", x: 120, y: 110 },
      { id: "phones", e: "🎧", n: "耳机", x: 250, y: 80 },
      { id: "finger", e: "👆", n: "手指", x: 390, y: 120 },
      { id: "screen", e: "📱", n: "判定线", x: 470, y: 225 },
      { id: "board", e: "🏆", n: "排行榜", x: 230, y: 235 },
    ],
    flows: [["beat", "phones", "声"], ["phones", "finger", "节奏"], ["finger", "screen", "点击"], ["screen", "board", "分数"], ["board", "beat", "下一首"]],
    subject: "「我是能打 Full Combo 的人！」",
    meaning: {
      lines: [["board", "dad"], ["screen", "mom"], ["finger", "me"], ["phones", "mom"]],
      text: "（虚构的「典型诠释」，示意）排行榜代表父亲的认可，沉迷屏幕是退回母亲怀抱、逃避现实……于是要找的是童年创伤，而不是这台机器本身。",
    },
    how: "（示意）输入：一首曲子的音符流；每一次点击都是一次「断流」，从连续的节拍里切下一段，换成分数。要问的是：手指和耳朵怎样耦合？在哪儿卡住（某种节奏老是断）？机器产出了什么强度（心流、手速、手感）？它接到哪些社会机器上（排行榜、氪金、谱面社区）？这些问题都不必经过「爸爸妈妈」。",
    tips: {
      parts: "节拍、耳机、手指、判定线、排行榜：异质零件。它们不需要被一个「意义」统一起来才能工作。",
      flows: "声流→节奏流→点击流→分数流。点击就是切断：从音符流中截一段，再发出新的流。红色短线是断流。",
      bwo: "「进入状态」时身体仿佛消失，只剩一个让一切登记上去的平面：连击数、判定、手感都写在这里。它反生产，却让生产得以挂靠。",
      subject: "主体是机器运转的副产品：在连击的强度中冒出来的「我」，下一首曲子又会换一个。",
    },
  },
];
const TRI = { dad: { x: 330, y: 40, n: "爸爸" }, mom: { x: 200, y: 265, n: "妈妈" }, me: { x: 460, y: 265, n: "我" } };
const HL = [
  { id: "parts", label: "部件（部分对象）", syn: "工作部件", c: BLUE, cid: "partial_objects" },
  { id: "flows", label: "流与断流", syn: "连接综合 · Libido", c: GREEN, cid: "partial_objects" },
  { id: "bwo", label: "无器官身体", syn: "析取综合 · Numen", c: GOLD, cid: "bwo_motor" },
  { id: "subject", label: "邻接部件（主体）", syn: "合取综合 · Voluptas", c: RED, cid: "schizo_mechanic" },
];

function PositiveStep() {
  const [si, setSi] = useState(0), [mode, setMode] = useState(1), [hl, setHl] = useState(null);
  const sc = SCENES[si], P = Object.fromEntries(sc.parts.map(p => [p.id, p]));
  const dim = k => (hl && hl !== k ? .25 : 1);
  return <div style={{ display: "grid", gap: 10 }}>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <div className="seg" style={{ marginBottom: 0 }}>{SCENES.map((s, j) =>
        <button key={s.id} className={si === j ? "on" : ""} onClick={() => { setSi(j); setHl(null); }}>{s.tab}</button>)}</div>
      <div className="seg" style={{ marginBottom: 0 }}>
        <button className={mode === 0 ? "on" : ""} onClick={() => setMode(0)}>精神分析问：这意味着什么？</button>
        <button className={mode === 1 ? "on" : ""} onClick={() => setMode(1)}>精神分裂分析问：它怎样运转？</button>
      </div>
    </div>
    <svg key={sc.id + mode} viewBox="0 0 640 320" style={{ width: "100%", maxHeight: 340, background: "var(--paper)", borderRadius: 14 }}>
      <defs><marker id="ar10" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill={GREEN} /></marker></defs>
      {mode === 1 ? <>
        <g opacity={dim("bwo")}>
          <ellipse cx="310" cy="170" rx="270" ry="128" fill={GOLD} opacity={hl === "bwo" ? .22 : .09} stroke={GOLD} strokeDasharray="6 5" />
          <text x="310" y="292" textAnchor="middle" fontSize="13" fill={GOLD} fontWeight="600">无器官身体（登录表面 / 不动的马达）</text>
        </g>
        <g opacity={dim("flows")}>
          {sc.flows.map(([a, b, lab], i) => {
            const A = P[a], B = P[b], mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
            const dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
            return <g key={i}>
              <line x1={A.x + ux * 26} y1={A.y + uy * 26} x2={B.x - ux * 28} y2={B.y - uy * 28} stroke={GREEN} strokeWidth={hl === "flows" ? 3.5 : 2.5}
                strokeDasharray="7 6" markerEnd="url(#ar10)">
                <animate attributeName="stroke-dashoffset" from="26" to="0" dur="1s" repeatCount="indefinite" /></line>
              <line x1={mx - uy * 9} y1={my + ux * 9} x2={mx + uy * 9} y2={my - ux * 9} stroke={RED} strokeWidth="3" />
              <text x={mx + uy * 18} y={my - ux * 18 + 4} textAnchor="middle" fontSize="11" fill={GREEN}>{lab}</text>
            </g>;
          })}
        </g>
        <g opacity={dim("parts")}>
          {sc.parts.map(p => <g key={p.id}>
            <circle cx={p.x} cy={p.y} r="24" fill="var(--card)" stroke={BLUE} strokeWidth={hl === "parts" ? 3 : 1.5} />
            <text x={p.x} y={p.y + 8} textAnchor="middle" fontSize="22">{p.e}</text>
            <text x={p.x} y={p.y + 40} textAnchor="middle" fontSize="12" fill={BLUE}>{p.n}</text>
          </g>)}
        </g>
        <g opacity={dim("subject")}>
          <line x1="560" y1="70" x2="520" y2="110" stroke={RED} strokeDasharray="3 4" />
          <text x="590" y="58" textAnchor="middle" fontSize="24">🙂
            <animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite" /></text>
          <text x="632" y="24" textAnchor="end" fontSize="12" fill={RED}>{sc.subject}</text>
        </g>
      </> : <>
        {sc.parts.map(p => <g key={p.id} opacity=".55">
          <circle cx={p.x} cy={p.y} r="22" fill="var(--card)" stroke={MUTED} />
          <text x={p.x} y={p.y + 8} textAnchor="middle" fontSize="20">{p.e}</text>
        </g>)}
        {sc.meaning.lines.map(([a, t], i) => <line key={i} x1={P[a].x} y1={P[a].y} x2={TRI[t].x} y2={TRI[t].y} stroke={RED} strokeDasharray="4 4" opacity=".7">
          <animate attributeName="opacity" values="0;.7" dur=".6s" begin={`${i * .25}s`} fill="freeze" /></line>)}
        <polygon points={Object.values(TRI).map(v => `${v.x},${v.y}`).join(" ")} fill={RED} opacity=".08" stroke={RED} strokeWidth="2.5" />
        {Object.values(TRI).map(v => <g key={v.n}><circle cx={v.x} cy={v.y} r="22" fill={RED} /><text x={v.x} y={v.y + 5} textAnchor="middle" fontSize="13" fill="#fff" fontWeight="600">{v.n}</text></g>)}
        <text x="20" y="300" fontSize="12" fill={RED}>每个零件都被翻译成家庭成员的「代表」——零件本身不再被看见</text>
      </>}
    </svg>
    {mode === 1 ? <>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {HL.map(h => <button key={h.id} className="chip" onClick={() => setHl(hl === h.id ? null : h.id)}
          style={hl === h.id ? { background: h.c, color: "#fff", borderColor: h.c } : { borderColor: h.c, color: h.c }}>{h.label} <span style={{ fontSize: 11, opacity: .8 }}>· {h.syn}</span></button>)}
      </div>
      <div style={{ borderLeft: `4px solid ${hl ? HL.find(h => h.id === hl).c : GREEN}`, paddingLeft: 12 }}>
        {hl ? <p style={{ margin: 0 }}><C id={HL.find(h => h.id === hl).cid}>{HL.find(h => h.id === hl).label}</C>：{sc.tips[hl]}</p>
          : <p style={{ margin: 0 }}><b>它怎样运转？</b> {sc.how}</p>}
      </div>
    </> : <div style={{ borderLeft: `4px solid ${RED}`, paddingLeft: 12 }}><p style={{ margin: 0 }}>{sc.meaning.text}</p>
      <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: 14 }}>D&G 的批评：这样的诠释永远只能在压抑给出的「假图像」里读被压抑之物，部件、流和断裂统统消失了。切到右边的提问试试。</p></div>}
    <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>来源：{sc.src}。三种部件、三种能量、三种综合的对应是书中对欲望机器的总结。</p>
  </div>;
}

/* ---------------- 外壳 ---------------- */
const STEPS = [
  { label: "否定任务：清洗", icon: "🧹", q: "先拆掉什么？", el: () => <NegativeStep /> },
  { label: "第一积极任务：找出欲望机器", icon: "🔧", q: "它怎样运转？", el: () => <PositiveStep /> },
  { label: "第二积极任务：判断投注方向", icon: "🧭", q: "欲望朝哪一极投注社会场？", el: () => <InvestPoles /> },
];

export default function Toolbox() {
  const [i, setI] = useState(0), s = STEPS[i];
  return <div className="card" style={{ display: "grid", gap: 14 }}>
    <div className="seg" style={{ marginBottom: 0 }}>{STEPS.map((x, j) =>
      <button key={j} className={i === j ? "on" : ""} onClick={() => setI(j)}>{j + 1}. {x.icon} {x.label}</button>)}</div>
    <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}>{s.icon} 第 {i + 1} 步 · {s.label} <span className="muted-it" style={{ fontSize: 16 }}>—— {s.q}</span></div>
    {s.el()}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <button className="chip" disabled={i === 0} onClick={() => setI(i - 1)}>← 上一步</button>
      <span style={{ color: "var(--muted)", fontSize: 13 }}>{i + 1} / {STEPS.length}</span>
      <button className="chip" disabled={i === STEPS.length - 1} onClick={() => setI(i + 1)}>下一步 →</button>
    </div>
  </div>;
}
