// 第 9 章专属图解 1：国王的位置——回扣第 1 章《宫娥》。古典：画外空位四重身份闪烁；现代：「人」站进空位。
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", MUTED = "#6b6257", GREEN = "#3c6b4a";
const P = { x: 300, y: 296 };
const SOURCES = [
  { x: 212, y: 98, l: "画家" }, { x: 300, y: 134, l: "公主" }, { x: 266, y: 140 }, { x: 334, y: 140 },
  { x: 410, y: 70, l: "门口的人" }, { x: 300, y: 58, l: "镜子" },
];
const ROLES = ["模特", "画家", "国王", "观者"];

function Painting({ modern }) {
  return <>
    <rect x="110" y="16" width="380" height="196" rx="4" fill="#efe6d4" stroke={INK} strokeWidth="2" />
    <text x="116" y="30" fontSize="11" fill={MUTED}>《宫娥》（示意）</text>
    {/* 背面朝外的大画布 */}
    <rect x="126" y="54" width="62" height="146" fill="#b49b74" opacity=".85" />
    <text x="157" y="122" textAnchor="middle" fontSize="11" fill="#fff">背对</text><text x="157" y="138" textAnchor="middle" fontSize="11" fill="#fff">我们的</text><text x="157" y="154" textAnchor="middle" fontSize="11" fill="#fff">画布</text>
    {/* 镜子 */}
    <rect x="284" y="38" width="32" height="38" fill="#fff8e6" stroke={GOLD} strokeWidth="3" />
    <text x="300" y="61" textAnchor="middle" fontSize="10" fill={GOLD}>王·后</text>
    {/* 门 */}
    <rect x="398" y="40" width="26" height="60" fill="#e2d4b8" stroke={MUTED} />
    {/* 人物 */}
    {SOURCES.slice(0, 5).map((s, i) => <g key={i}>
      <circle cx={s.x} cy={s.y} r={i === 1 ? 11 : 8} fill={INK} opacity=".8" />
      <line x1={s.x} y1={s.y + 8} x2={s.x} y2={s.y + 40} stroke={INK} strokeWidth="5" opacity=".6" />
      {s.l && <text x={s.x} y={s.y + 56} textAnchor="middle" fontSize="11" fill={INK}>{s.l}</text>}
    </g>)}
    <text x="300" y="206" textAnchor="middle" fontSize="11" fill={modern ? MUTED : BLUE}>
      {modern ? "表格已经瓦解：秩序退回到物自身" : "画内＝表格：自然与人性在「话语」中交汇"}
    </text>
    {/* 目光线 */}
    {SOURCES.map((s, i) => <line key={"g" + i} x1={s.x} y1={s.y} x2={P.x} y2={P.y - 30}
      stroke={modern ? RED : GOLD} strokeWidth={modern ? 1.6 : 1.2} strokeDasharray={modern ? "none" : "5 5"} opacity=".7">
      {!modern && <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" />}
    </line>)}
  </>;
}

function Classical() {
  return <svg viewBox="0 0 600 370" style={{ width: "100%", maxHeight: 400, background: "var(--paper)", borderRadius: 14 }}>
    <Painting />
    <circle cx={P.x} cy={P.y} r="34" fill="none" stroke={GOLD} strokeWidth="2.5" strokeDasharray="6 5">
      <animate attributeName="r" values="32;37;32" dur="2s" repeatCount="indefinite" />
    </circle>
    {ROLES.map((r, i) => <text key={r} x={P.x} y={P.y + 6} textAnchor="middle" fontSize="17" fontWeight="700" fill={GOLD} opacity="0">
      {r}<animate attributeName="opacity" values={ROLES.map((_, j) => (j === i ? 1 : 0)).join(";")} dur="4s" calcMode="discrete" repeatCount="indefinite" />
    </text>)}
    <text x={P.x} y="350" textAnchor="middle" fontSize="13" fill={INK}>画外的空位：四重身份不停闪烁、互相替换</text>
    <text x={P.x} y="366" textAnchor="middle" fontSize="12" fill={MUTED}>始终有人在场，却从不被画进「表格」</text>
  </svg>;
}

function Modern() {
  return <svg viewBox="0 0 600 370" style={{ width: "100%", maxHeight: 400, background: "var(--paper)", borderRadius: 14 }}>
    <Painting modern />
    {/* 生命、劳动、语言从三面挤压 */}
    {[{ x: 70, y: 296, l: "生命", c: GREEN }, { x: 530, y: 296, l: "劳动", c: GOLD }, { x: 300, y: 360, l: "语言", c: BLUE }].map(k => <g key={k.l}>
      <text x={k.x} y={k.y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={k.c}>{k.l}</text>
      <line x1={k.x + (k.x < 300 ? 26 : k.x > 300 ? -26 : 0)} y1={k.y - (k.x === 300 ? 14 : 0)} x2={P.x + (k.x < 300 ? -44 : k.x > 300 ? 44 : 0)} y2={P.y + (k.x === 300 ? 34 : 0)}
        stroke={k.c} strokeWidth="2.5" markerEnd="url(#arr9k)">
        <animate attributeName="opacity" values=".35;1;.35" dur="2.2s" repeatCount="indefinite" />
      </line>
    </g>)}
    <defs><marker id="arr9k" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill={INK} /></marker></defs>
    {/* 「人」实体化 */}
    <circle cx={P.x} cy={P.y - 12} r="11" fill={RED} />
    <path d={`M${P.x - 16} ${P.y + 26} Q${P.x} ${P.y - 6} ${P.x + 16} ${P.y + 26} Z`} fill={RED} />
    <text x={P.x} y={P.y + 44} textAnchor="middle" fontSize="15" fontWeight="700" fill={RED}>人</text>
    <text x={P.x - 60} y={P.y - 34} textAnchor="end" fontSize="13" fill={INK}>被观看的观者</text>
    <text x={P.x + 60} y={P.y - 34} fontSize="13" fill={INK}>被奴役的君主</text>
    <text x={P.x - 60} y={P.y - 18} textAnchor="end" fontSize="11" fill={MUTED}>（认识的对象）</text>
    <text x={P.x + 60} y={P.y - 18} fontSize="11" fill={MUTED}>（认识的主体）</text>
  </svg>;
}

export default function KingPlace() {
  const [v, setV] = useState(0);
  return <div className="card" style={{ display: "grid", gap: 12 }}>
    <div className="seg" style={{ marginBottom: 0 }}>
      {["古典时代：空着的位置", "19 世纪起：人站了进来"].map((o, j) =>
        <button key={j} className={v === j ? "on" : ""} onClick={() => setV(j)}>{o}</button>)}
    </div>
    {v === 0 ? <Classical /> : <Modern />}
    {v === 0
      ? <p style={{ margin: 0 }}>画中所有目光都指向画外同一点：被画的国王夫妇站在那里，画家作画时站在那里，我们看画时也站在那里。这个位置一直「有人」，却只在后墙小镜子里被偷偷映出。福柯说这就是古典表征的法则：<b>为之而有表征、并在其中认出自己的那个人，自己永远不在表格里。</b>交汇点上真正起作用的，是透明的<b>话语</b>，而不是「人」——这就是福柯说<C id="man_invention">「人」是晚近发明</C>的意思。</p>
      : <p style={{ margin: 0 }}>当博物学变成生物学、财富分析变成经济学、普遍语法变成语文学，表格瓦解了。模特、画家、国王、观者忽然停止闪烁，凝成一个有血有肉的形象——<C id="place_of_king">人</C>。他被生命、劳动、语言从三面挤出、规定（是<b>对象</b>）；又被要求让整个表征空间都关联到他这一道具体目光（是<b>主体</b>）。这种「既是又是」，就是本章所有<C id="empirico_transcendental">复本</C>的起点。</p>}
  </div>;
}
