// 第 1 章专属图解：《宫娥》视线图（俯视示意，非真实画作）
// 点人物看其目光指向；切换"谁站在画外那个点上"，揭示被所有目光指向却空着的中心
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", GREEN = "#3f6b4a", VIOLET = "#5b4a7a";
const F = { x: 320, y: 468 }; // 画外的那个点

// kind: person / thing；target: "F" | 某个 id | {x,y}
const FIG = {
  painter: { x: 200, y: 245, name: "画家", sub: "委拉斯开兹自画像", kind: "person", c: RED, target: "F",
    looks: "画外的那一点——也就是正在看画的你。",
    note: "他退后一步，站在画布旁：此刻我们看得见他，他却看不见自己的画；一旦走回画布前，他看见了画，却从我们眼里消失。他就站在这两种互不相容的可见性的门槛上。" },
  canvas: { x: 105, y: 300, name: "画布", sub: "背面朝外", kind: "thing", c: INK, target: null,
    looks: "它不看任何东西，此刻也没有人看它。",
    note: "我们只看到它的木框和背面。正是这块挡板，让「画家到底在画谁」永远无法确认：被他凝视的究竟是模特还是我们？身份因此在观者与模特之间来回翻转。" },
  infanta: { x: 320, y: 262, name: "公主", sub: "玛格丽特", kind: "person", c: GOLD, target: "F",
    looks: "画外，直直看向观者所站之处。",
    note: "她的双眼正好落在画面的竖直中线上，是整幅画表面上的主题。但她的目光和镜子一样，都把我们引向画外的同一个点。" },
  kneel: { x: 262, y: 272, name: "跪着的侍女", sub: "", kind: "person", c: GREEN, target: "infanta",
    looks: "只看公主。",
    note: "传统构图手法：像祈祷的供养人、像报喜的天使，一个次要人物跪着望向主角，用来强调主角。她是少数只看画内的人。" },
  stand: { x: 378, y: 255, name: "站着的侍女", sub: "", kind: "person", c: GREEN, target: "F",
    looks: "身体侧向公主，眼睛却看向画外。",
    note: "身体在服侍画内的公主，目光却被画外的东西吸走——她和画家、公主盯着同一个地方。" },
  duenna: { x: 432, y: 172, name: "女侍从", sub: "后排", kind: "person", c: VIOLET, target: "guard",
    looks: "看向右侧（她身旁的男侍从）。",
    note: "后排两人一组：一人朝外，一人侧看；与前景的侏儒一组形成对称的「对子」。" },
  guard: { x: 480, y: 165, name: "男侍从", sub: "后排", kind: "person", c: VIOLET, target: "F",
    looks: "画外。",
    note: "他是构图中「X」右上角的顶点，也是那条大弧线的右端（左端是画家）。" },
  dwarf: { x: 452, y: 305, name: "侏儒女子", sub: "前景", kind: "person", c: VIOLET, target: "F",
    looks: "画外。",
    note: "前景的这对侏儒：一人朝外、一人望向画面中心，与后排侍从组成呼应。" },
  boy: { x: 522, y: 318, name: "侏儒男孩", sub: "脚踩着狗", kind: "person", c: VIOLET, target: { x: 400, y: 285 },
    looks: "望向画面中心。",
    note: "他在最右端，是「X」的右下角；目光拐回画内。" },
  dog: { x: 500, y: 345, name: "狗", sub: "", kind: "thing", c: INK, target: null,
    looks: "什么也不看，一动不动。",
    note: "画里唯一既不看也不动的东西：它只是「被看的对象」。与左下角背对我们的画布相对——一个把画外点变成纯粹景观，一个本身就是纯粹景观。" },
  mirror: { x: 310, y: 46, name: "镜子", sub: "后墙正中", kind: "thing", c: BLUE, target: "F",
    looks: "穿过整个房间，映出画外：国王与王后。",
    note: "满墙画作里唯一真正「让我们看见」的表征，却没有任何人回头看它。它不映出画内的任何东西，而是穿透整个画面，把画外那不可见的一点搬回画的最深处。" },
  visitor: { x: 400, y: 26, name: "门口的人", sub: "站在台阶上", kind: "person", c: BLUE, target: "F",
    looks: "从背后看这一场景，却能正面看见国王王后。",
    note: "他和镜子一样看向画外，也同样没人理他。但他不是倒影而是血肉之躯的「闯入」：一只脚在下一级台阶，像停在最低点的钟摆，同时在进来和离开。" },
};
const ORDER = ["canvas", "painter", "kneel", "infanta", "stand", "duenna", "guard", "dwarf", "boy", "dog", "mirror", "visitor"];

const MODES = [
  { id: "spectator", label: "👁 观者", who: "你（观者）", proj: "visitor",
    text: "你站在这里看画。画家仿佛在看你——但他其实只是因为你恰好站在模特的位置上才看向你。你一进入他的视线就被收进画里，又被「本来就在那里的」模特顶替。",
    lack: "你缺的是场景的真正中心：你像篡位者一样占了国王的位置。画中替你在场的，是右侧门口那个看客。" },
  { id: "painter", label: "🖌 画家", who: "委拉斯开兹（正在构图的画家）", proj: "painter",
    text: "这里也是真实的委拉斯开兹作画时站的位置——他画的不是画中那幅，而是我们眼前这幅《宫娥》。",
    lack: "他的目光缺的是模特：画中的那个「替身画家」正盯着模特，而模特只在镜子里出现。画中替他在场的，是左侧持调色板的自画像。" },
  { id: "model", label: "👑 模特（国王）", who: "国王腓力四世与王后", proj: "mirror",
    text: "在故事层面，这里站着正在被画像的国王夫妇，所有人都朝他们行注目礼；公主被盛装呈现在他们眼前。",
    lack: "他们缺的是自己的肖像：正画在那块他们看不到正面的画布上。画中替他们在场的，是镜中那对最苍白、最无人理会的小小身影。" },
  { id: "void", label: "⭕ 空位", who: "？", proj: null,
    text: "三种「看」——模特被画时的目光、观者看画的目光、画家构图的目光——精确地叠在这同一个点上。它是理想的点，又是完全真实的点：表征正是从这里才成为可能。",
    lack: "所以它必然不可见。画里只能把它拆成三个碎片（左边画家、右边看客、中间镜像），却无法让它本人出场。古典表征把一切都摆了出来，唯独让「为谁表征、由谁表征」的那个主体缺席。" },
];

function endFor(id) {
  const f = FIG[id], t = f.target;
  if (!t) return null;
  if (t === "F") return F;
  if (typeof t === "string") return FIG[t];
  return t;
}
function shorten(a, b, ra, rb) {
  const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
  return { x1: a.x + dx / d * ra, y1: a.y + dy / d * ra, x2: b.x - dx / d * rb, y2: b.y - dy / d * rb };
}

export default function GazeDiagram() {
  const [sel, setSel] = useState(null);
  const [mode, setMode] = useState(0);
  const m = MODES[mode];
  const isVoid = m.id === "void";
  const projIds = isVoid ? ["painter", "visitor", "mirror"] : [m.proj];
  const s = sel && FIG[sel];

  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 6 }}>谁站在画外那个点上？</div>
        <div className="seg" style={{ marginBottom: 0 }}>{MODES.map((x, j) =>
          <button key={x.id} className={mode === j ? "on" : ""} onClick={() => setMode(j)}>{x.label}</button>)}</div>
      </div>

      <svg viewBox="0 0 640 562" style={{ width: "100%", maxHeight: 640, background: "var(--paper)", borderRadius: 14 }}
        onClick={() => setSel(null)}>
        <defs>
          <marker id="ch01-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={RED} />
          </marker>
          <marker id="ch01-arr-dim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={INK} opacity=".35" />
          </marker>
          <radialGradient id="ch01-glow">
            <stop offset="0%" stopColor={GOLD} stopOpacity=".55" /><stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 房间（俯视） */}
        <rect x="40" y="40" width="560" height="320" fill="#fff" opacity=".55" stroke={INK} strokeOpacity=".35" />
        <text x="50" y="34" fontSize="11" fill={INK} opacity=".55">后墙（挂满画作）</text>
        {[70, 130, 190, 470, 530].map(x => <rect key={x} x={x} y="40" width="34" height="5" fill={INK} opacity=".25" />)}
        {/* 门洞 */}
        <rect x="382" y="34" width="36" height="12" fill="var(--paper)" stroke={INK} strokeOpacity=".35" />
        {/* 窗户 + 光 */}
        <rect x="596" y="95" width="8" height="130" fill={GOLD} opacity=".55" />
        <text x="612" y="165" fontSize="11" fill={GOLD} transform="rotate(90 612 165)" textAnchor="middle">窗 · 光从右侧涌入</text>
        {[120, 160, 200].map((y, k) => <line key={y} x1="590" y1={y} x2="520" y2={y + 20} stroke={GOLD} strokeWidth="2" strokeDasharray="4 6" opacity=".5">
          <animate attributeName="stroke-dashoffset" values="20;0" dur="1.5s" begin={`${k * .3}s`} repeatCount="indefinite" /></line>)}

        {/* 画面平面 */}
        <line x1="20" y1="380" x2="620" y2="380" stroke={GOLD} strokeWidth="2.5" strokeDasharray="10 6" />
        <text x="24" y="374" fontSize="12" fill={GOLD} fontWeight="bold">画框所在的平面 ↑ 画内 ／ 画外 ↓</text>

        {/* 画外的点 */}
        <circle cx={F.x} cy={F.y} r="60" fill="url(#ch01-glow)">
          {isVoid && <animate attributeName="r" values="46;66;46" dur="2.4s" repeatCount="indefinite" />}
        </circle>
        <circle cx={F.x} cy={F.y} r="30" fill={isVoid ? "none" : "#fff"} stroke={RED} strokeWidth="2.5" strokeDasharray={isVoid ? "6 5" : "0"} />
        <text x={F.x} y={F.y + 9} textAnchor="middle" fontSize="24">{["👁", "🖌", "👑", "？"][mode]}</text>
        <text x={F.x} y={F.y + 50} textAnchor="middle" fontSize="13" fill={RED} fontWeight="bold">{isVoid ? "缺席的主体" : m.who}</text>
        {isVoid && <text x={F.x} y={F.y + 66} textAnchor="middle" fontSize="11" fill={INK} opacity=".7">模特 ＋ 观者 ＋ 画家 三者叠合于此</text>}

        {/* 视线 */}
        {ORDER.map(id => {
          const f = FIG[id], e = endFor(id);
          if (!e) return null;
          const toF = f.target === "F";
          const on = sel === id || (isVoid && toF) || (!sel && !isVoid && toF && projIds.includes(id));
          const r1 = 14, r2 = f.target === "F" ? 32 : 14;
          const L = shorten(f, e, r1, r2);
          return <line key={id} {...L} stroke={on ? RED : INK} strokeOpacity={on ? .95 : .22}
            strokeWidth={on ? 2.6 : 1.3} strokeDasharray={on ? "7 5" : "3 5"}
            markerEnd={`url(#${on ? "ch01-arr" : "ch01-arr-dim"})`}>
            {on && <animate attributeName="stroke-dashoffset" values="24;0" dur="1s" repeatCount="indefinite" />}
          </line>;
        })}
        {/* 画家与画布之间的"另一个方向" */}
        {sel === "painter" && <line x1="186" y1="255" x2="128" y2="292" stroke={BLUE} strokeWidth="2" strokeDasharray="2 4" />}

        {/* 画布 */}
        <g onClick={e => { e.stopPropagation(); setSel(sel === "canvas" ? null : "canvas"); }} style={{ cursor: "pointer" }}>
          <line x1="58" y1="330" x2="150" y2="272" stroke={INK} strokeWidth={sel === "canvas" ? 11 : 8} strokeLinecap="round" />
          <line x1="62" y1="322" x2="146" y2="268" stroke={GOLD} strokeWidth="2" opacity=".8" />
          <text x="60" y="262" fontSize="12" fill={INK}>画布</text>
          <text x="60" y="276" fontSize="10" fill={INK} opacity=".6">背面朝我们</text>
        </g>

        {/* 人物与物件 */}
        {ORDER.filter(id => id !== "canvas").map(id => {
          const f = FIG[id], on = sel === id, proj = projIds.includes(id);
          const shape = id === "mirror"
            ? <rect x={f.x - 18} y={f.y - 8} width="36" height="14" rx="3" fill={proj ? BLUE : "#cfd8e4"} stroke={BLUE} strokeWidth={on ? 3 : 1.5} />
            : id === "dog"
              ? <ellipse cx={f.x} cy={f.y} rx="20" ry="9" fill="#8a7a66" stroke={on ? RED : "none"} strokeWidth="2.5" />
              : <circle cx={f.x} cy={f.y} r={id === "infanta" ? 15 : 12} fill={f.c} fillOpacity={proj || on ? 1 : .75}
                stroke={on ? RED : "#fff"} strokeWidth={on ? 3 : 1.5} />;
          const ly = id === "mirror" ? f.y + 22 : id === "visitor" ? f.y + 4 : id === "boy" ? f.y - 18 : f.y + 27;
          const lx = id === "visitor" ? f.x + 20 : f.x, anchor = id === "visitor" ? "start" : "middle";
          return <g key={id} style={{ cursor: "pointer" }} onClick={e => { e.stopPropagation(); setSel(on ? null : id); }}>
            {proj && <circle cx={f.x} cy={f.y} r="24" fill="none" stroke={RED} strokeWidth="2">
              <animate attributeName="r" values="18;26;18" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;.3;1" dur="1.8s" repeatCount="indefinite" /></circle>}
            {shape}
            <text x={lx} y={ly} textAnchor={anchor} fontSize="12" fill={INK} fontWeight={on ? "bold" : "normal"}>{f.name}</text>
          </g>;
        })}
        <text x="320" y="556" textAnchor="middle" fontSize="11" fill={INK} opacity=".5">示意图（俯视）：点人物或物件看其目光；红色虚线 = 视线</text>
      </svg>

      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
        <div style={{ borderLeft: `4px solid ${RED}`, paddingLeft: 12 }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: 19 }}>画外那一点：<b>{m.who}</b></div>
          <p style={{ margin: "6px 0" }}>{m.text}</p>
          <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>{m.lack}</p>
          {isVoid && <p style={{ margin: "6px 0 0", fontSize: 15 }}>→ 这就是 <C id="absent_subject">缺席的主体</C>，也是 <C id="classical_representation">古典表征</C> 的定义性特征。</p>}
        </div>
        <div style={{ borderLeft: `4px solid ${s ? s.c : "var(--line)"}`, paddingLeft: 12 }}>
          {s ? <>
            <div style={{ fontFamily: "var(--serif)", fontSize: 19 }}>{s.name} <span className="muted-it">{s.sub}</span></div>
            <p style={{ margin: "6px 0" }}><b>目光指向：</b>{s.looks}</p>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>{s.note}</p>
          </> : <p style={{ margin: 0, color: "var(--muted)" }}>👆 点图中任意人物或物件（画布、镜子、狗……），看它的目光指向哪里、在构图里起什么作用。数一数：有多少条线最终汇到画外同一个点？</p>}
        </div>
      </div>
    </div>
  );
}
