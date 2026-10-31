// 第 1 章辅助图解：《宫娥》正视构图示意——X 形、弧线、表征的螺旋
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", GREEN = "#3f6b4a";

// 人形：头 + 身体（正视）
function Person({ x, y, h = 70, c = INK, dress = false, label, kneel = false }) {
  const r = h * .13, bodyH = kneel ? h * .45 : h * .8, w = dress ? h * .55 : h * .3;
  return <g>
    <circle cx={x} cy={y} r={r} fill={c} />
    <path d={`M${x - w / 2},${y + r + bodyH} L${x - w * .18},${y + r + 2} L${x + w * .18},${y + r + 2} L${x + w / 2},${y + r + bodyH} Z`} fill={c} opacity=".8" />
    {label && <text x={x} y={y + r + bodyH + 14} textAnchor="middle" fontSize="11" fill={INK}>{label}</text>}
  </g>;
}

const P = { painter: { x: 205, y: 165 }, guard: { x: 462, y: 165 }, easel: { x: 150, y: 382 }, boy: { x: 490, y: 382 }, infanta: { x: 320, y: 262 } };

const VIEWS = [
  { id: "x", label: "✕ X 形：中心是公主",
    text: "把画家的眼睛与右下角的侏儒、后排男侍从的眼睛与左下角的画架脚各连一条线，两线交于公主的双眼。按这种看法，画像一个围着公主旋转的圣安德烈十字。",
    note: "公主的脸在画面竖直中线上、距底边三分之一高处——这是表面上的主题。" },
  { id: "curve", label: "◡ 弧线：中心是镜子",
    text: "换一种看法：从左上的画家到右上的男侍从，人物连成一条向我们凸出的浅弧，最低点是公主和侍女。这道弧像杯子的凹处，恰好托住后墙正中的镜子。",
    note: "公主在深度上与镜子重叠，镜像在竖直方向上叠在公主的脸上。两个中心都射出视线，在画外汇于一点。" },
  { id: "spiral", label: "🌀 表征的螺旋",
    text: "沿房间周边走一圈：画家的目光与画笔 → 背面朝外的画布 → 墙上的画 → 镜子 → 门口的真人 → 只剩框边的画 → 窗口涌入的光 → 光又照回画家的脸上。",
    note: "这一圈就是表征的完整生命周期：工具（目光、调色板、空白画布）→ 完成的表征（画、镜像、真人）→ 表征溶解回光。螺旋闭合了；而横穿画面深处的那些视线却都缺了一段。" },
];
const SPIRAL = [
  { x: 205, y: 165, t: "① 画家的目光" }, { x: 100, y: 120, t: "② 画布背面" }, { x: 160, y: 72, t: "③ 墙上的画" },
  { x: 307, y: 222, t: "④ 镜子" }, { x: 380, y: 230, t: "⑤ 门口的人" }, { x: 520, y: 78, t: "⑥ 只见框边" },
  { x: 605, y: 190, t: "⑦ 窗与光" }, { x: 230, y: 160, t: "" },
];

export default function Composition() {
  const [v, setV] = useState(0);
  const view = VIEWS[v];
  const spiralPath = "M" + SPIRAL.map(p => `${p.x},${p.y}`).join(" L");
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{VIEWS.map((x, j) =>
        <button key={x.id} className={v === j ? "on" : ""} onClick={() => setV(j)}>{x.label}</button>)}</div>
      <svg viewBox="0 0 640 410" style={{ width: "100%", maxHeight: 460, background: "var(--paper)", borderRadius: 14 }}>
        <defs>
          <marker id="ch01-sp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={GOLD} /></marker>
        </defs>
        {/* 画框 */}
        <rect x="20" y="20" width="600" height="370" fill="#efe6d6" stroke={INK} strokeWidth="3" />
        {/* 地面线 */}
        <line x1="20" y1="300" x2="620" y2="300" stroke={INK} opacity=".12" />
        {/* 后墙上的画 */}
        {[[150, 55], [215, 55], [285, 55], [360, 55], [430, 55]].map(([x, y], k) =>
          <rect key={k} x={x} y={y} width="50" height="36" fill="#cbbfa9" stroke={INK} strokeOpacity=".3" />)}
        {[500, 540].map(x => <rect key={x} x={x} y="60" width="10" height="40" fill="#cbbfa9" stroke={INK} strokeOpacity=".3" />)}
        {/* 镜子 */}
        <rect x="290" y="202" width="34" height="42" fill="#dfe8f2" stroke={INK} strokeWidth="3" />
        <circle cx="301" cy="220" r="4" fill={BLUE} opacity=".6" /><circle cx="313" cy="221" r="4" fill={BLUE} opacity=".6" />
        <text x="307" y="198" textAnchor="middle" fontSize="10" fill={BLUE}>镜</text>
        {/* 门 */}
        <rect x="362" y="190" width="38" height="80" fill="#f4dc8e" stroke={INK} strokeOpacity=".4" />
        <Person x={380} y={212} h={45} c={INK} />
        {/* 窗 */}
        <polygon points="600,120 620,110 620,280 600,270" fill={GOLD} opacity=".45" />
        {/* 画布背面 */}
        <rect x="35" y="30" width="125" height="352" fill="#a8916c" stroke={INK} strokeWidth="2" />
        <line x1="35" y1="200" x2="160" y2="200" stroke={INK} opacity=".35" strokeWidth="4" />
        <line x1="97" y1="30" x2="97" y2="382" stroke={INK} opacity=".35" strokeWidth="4" />
        <text x="97" y="190" textAnchor="middle" fontSize="12" fill="#fff">画布背面</text>
        {/* 人物 */}
        <Person x={205} y={165} h={150} c={INK} label="画家" />
        <Person x={425} y={182} h={90} c="#6b5d7a" />
        <Person x={462} y={165} h={110} c="#6b5d7a" label="后排侍从" />
        <Person x={268} y={268} h={95} c={GREEN} kneel label="跪着的侍女" />
        <Person x={320} y={262} h={120} c={GOLD} dress label="公主" />
        <Person x={392} y={252} h={110} c={GREEN} dress label="站着的侍女" />
        <Person x={450} y={300} h={70} c="#6b5d7a" dress />
        <Person x={500} y={315} h={55} c="#6b5d7a" label="侏儒" />
        <ellipse cx="510" cy="378" rx="40" ry="9" fill="#8a7a66" />

        {view.id === "x" && <g stroke={RED} strokeWidth="3" strokeDasharray="8 6">
          <line x1={P.painter.x} y1={P.painter.y} x2={P.boy.x} y2={P.boy.y}><animate attributeName="stroke-dashoffset" values="28;0" dur="1.2s" repeatCount="indefinite" /></line>
          <line x1={P.guard.x} y1={P.guard.y} x2={P.easel.x} y2={P.easel.y}><animate attributeName="stroke-dashoffset" values="28;0" dur="1.2s" repeatCount="indefinite" /></line>
          <circle cx={P.infanta.x} cy={P.infanta.y} r="16" fill="none" strokeDasharray="0"><animate attributeName="r" values="12;22;12" dur="1.8s" repeatCount="indefinite" /></circle>
        </g>}
        {view.id === "curve" && <g>
          <path d={`M${P.painter.x},${P.painter.y} Q320,370 ${P.guard.x},${P.guard.y}`} fill="none" stroke={RED} strokeWidth="3.5" strokeDasharray="8 6">
            <animate attributeName="stroke-dashoffset" values="28;0" dur="1.2s" repeatCount="indefinite" /></path>
          <rect x="284" y="196" width="46" height="54" fill="none" stroke={BLUE} strokeWidth="3"><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite" /></rect>
        </g>}
        {view.id === "spiral" && <g>
          <path d={spiralPath} fill="none" stroke={GOLD} strokeWidth="3.5" strokeDasharray="10 7" markerEnd="url(#ch01-sp)" strokeLinejoin="round">
            <animate attributeName="stroke-dashoffset" values="34;0" dur="1.1s" repeatCount="indefinite" /></path>
          {SPIRAL.filter(p => p.t).map(p => <g key={p.t}>
            <circle cx={p.x} cy={p.y} r="5" fill={GOLD} />
            <text x={p.x + (p.x > 560 ? -8 : 8)} y={p.y - 8} fontSize="12" fill={INK} fontWeight="bold" textAnchor={p.x > 560 ? "end" : "start"}
              stroke="#efe6d6" strokeWidth="3" paintOrder="stroke">{p.t}</text></g>)}
        </g>}
        <text x="320" y="404" textAnchor="middle" fontSize="11" fill={INK} opacity=".5">正视示意（非原画）</text>
      </svg>
      <div>
        <p style={{ margin: "0 0 6px" }}>{view.text}</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>{view.note}
          {view.id === "spiral" && <> 见 <C id="spiral_of_representation">表征的螺旋</C>。</>}
          {view.id !== "spiral" && <> 见 <C id="two_centres">两个中心</C>。</>}</p>
      </div>
    </div>
  );
}
