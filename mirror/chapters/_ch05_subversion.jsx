// 第 5 章专属图解二：矛盾（体系内部，可被吸收） vs 颠覆（来自边缘，瞄准代码本身）
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", GREY = "#9a948a";
const CX = 340, CY = 175, RAD = 122;

const GROUPS = [
  { id: "stu", name: "学生", x: 110, y: 55, aim: "被提前判为「不合格」，被排除在游戏之外。他们的反抗不再要求游戏里的好位置，而是瞄准游戏规则本身。" },
  { id: "youth", name: "青年", x: 570, y: 55, aim: "占据代码最关键的「非地点」：被剥夺发言权与责任。这不是一个年龄组，而是横跨经济、政治、科学、文化各领域的处境，所以它的反抗处处有回响。" },
  { id: "women", name: "女性", x: 75, y: 185, aim: "瞄准把女性变成「非标记项」、以男性为性的一般等价物的代码。目标不是让女性掌权（把代码翻过来用），而是废除代码。" },
  { id: "black", name: "黑人", x: 605, y: 185, aim: "瞄准作为代码的种族，比经济剥削更深一层：资产阶级化的黑人仍然是黑人。客体化来自代码，而非来自被剥削的劳动力。" },
  { id: "eth", name: "族群 / 语言少数", x: 135, y: 315, aim: "在官僚集权与技术官僚的金字塔化中被推到外围，落入「无责任、不被关心」的地带，因而能从外部质疑整套社会空间。" },
  { id: "wild", name: "「永不工作」的罢工者", x: 545, y: 315, aim: "1968 年五月的「永不工作」、Usinor「为罢工而罢工」：否定的不只是剥削，而是把工作当作现实原则。这种隐秘的叛离就潜伏在生产过程内部。" },
];

function edgePoint(x, y) {
  const a = Math.atan2(y - CY, x - CX);
  return [CX + RAD * Math.cos(a), CY + RAD * Math.sin(a)];
}

export default function ContradictionSubversion() {
  const [mode, setMode] = useState(0);
  const [sel, setSel] = useState("women");
  const sub = mode === 1, g = GROUPS.find(x => x.id === sel);
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg">
        <button className={!sub ? "on" : ""} onClick={() => setMode(0)}>⚔️ 矛盾：体系内部</button>
        <button className={sub ? "on" : ""} onClick={() => setMode(1)}>💥 颠覆：来自别处</button>
      </div>
      <svg key={mode} viewBox="0 0 680 350" style={{ width: "100%", maxHeight: 380, background: "var(--paper)", borderRadius: 14 }}>
        <defs>
          <marker id="ch05ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={sub ? RED : GOLD} /></marker>
        </defs>
        {/* 体系 */}
        <circle cx={CX} cy={CY} r={RAD} fill={BLUE} fillOpacity=".08" stroke={BLUE} strokeWidth="3" strokeDasharray={sub ? "10 6" : "none"}>
          {sub && <animate attributeName="stroke-dashoffset" values="0;32" dur="1.2s" repeatCount="indefinite" />}
          {sub && <animate attributeName="r" values={`${RAD};${RAD - 4};${RAD}`} dur=".9s" repeatCount="indefinite" />}
        </circle>
        <text x={CX} y={CY - RAD + 34} textAnchor="middle" fontSize="13" fill={BLUE} fontWeight="700">体系 = 代码 / 价值规律</text>

        {/* 内部：工人 vs 资本 */}
        <g opacity={sub ? .3 : 1}>
          <rect x={CX - 88} y={CY - 16} width="56" height="30" rx="8" fill="#fff" stroke={INK} />
          <text x={CX - 60} y={CY + 4} textAnchor="middle" fontSize="14" fill={INK}>工人</text>
          <rect x={CX + 32} y={CY - 16} width="56" height="30" rx="8" fill="#fff" stroke={INK} />
          <text x={CX + 60} y={CY + 4} textAnchor="middle" fontSize="14" fill={INK}>资本</text>
          <line x1={CX - 28} y1={CY - 1} x2={CX + 28} y2={CY - 1} stroke={GOLD} strokeWidth="3" markerEnd="url(#ch05ar)" markerStart="url(#ch05ar)">
            {!sub && <animate attributeName="stroke-width" values="2;5;2" dur="1s" repeatCount="indefinite" />}
          </line>
        </g>
        {!sub && <>
          <path id="ch05loop" d={`M ${CX} ${CY + 22} C ${CX + 170} ${CY + 95}, ${CX - 170} ${CY + 95}, ${CX} ${CY + 22}`} fill="none" stroke={GOLD} strokeDasharray="4 4" />
          <circle r="6" fill={GOLD}><animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#ch05loop" /></animateMotion></circle>
          <text x={CX} y={CY + 58} textAnchor="middle" fontSize="12" fill={GOLD}>工资 · 福利 · 消费</text>
          <text x={CX} y={CY + 102} textAnchor="middle" fontSize="12" fill={GOLD}>→ 回流、被吸收</text>
        </>}

        {/* 外部群体 */}
        {GROUPS.map((x, j) => {
          const [ex, ey] = edgePoint(x.x, x.y), on = sub && sel === x.id;
          const w = x.name.length * 14 + 20;
          return <g key={x.id} style={{ cursor: sub ? "pointer" : "default" }} opacity={sub ? 1 : .35} onClick={() => sub && setSel(x.id)}>
            {sub && <line x1={x.x} y1={x.y} x2={ex} y2={ey} stroke={RED} strokeWidth={on ? 3.5 : 2} markerEnd="url(#ch05ar)" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" values="20;0" dur=".8s" begin={`${j * .1}s`} repeatCount="indefinite" />
            </line>}
            <rect x={x.x - w / 2} y={x.y - 15} width={w} height="30" rx="15" fill={on ? RED : "#fff"} stroke={sub ? RED : GREY} strokeWidth="2" />
            <text x={x.x} y={x.y + 5} textAnchor="middle" fontSize="14" fill={on ? "#fff" : sub ? RED : GREY}>{x.name}</text>
          </g>;
        })}
        {!sub && <text x={CX} y="345" textAnchor="middle" fontSize="12" fill={GREY}>边缘群体在这套视角里看不见：它们只是「次要矛盾」</text>}
        {sub && <text x={CX} y="345" textAnchor="middle" fontSize="12" fill={RED}>没有辩证：只有越界与对代码的解构（点击外圈群体）</text>}
      </svg>
      {!sub ? <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}><C id="contradiction">矛盾</C> · <span className="muted-it">contradiction</span></div>
        <p style={{ margin: "6px 0" }}>工人与资本在<b>同一个场域</b>里对立：被剥削者虽然被粗暴地整合，但毕竟是被整合进生产体系的。这是一种内在的、辩证的否定，所以体系能把它谈成工资、福利与消费，再吸收回来——一百年来资本主义正是这样化解了它。</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>切换到「颠覆」，看那些根本没被纳入游戏的人。</p>
      </div> : <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}><C id="subversion">颠覆</C> · {g.name}</div>
        <p style={{ margin: "6px 0" }}>{g.aim}</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>共同点：他们被代码放到<C id="non_marked">非标记项</C>的位置，反抗对准的是规则本身，而不是自己在规则里得到的份额。</p>
      </div>}
    </div>);
}
