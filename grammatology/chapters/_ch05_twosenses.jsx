// 第 5 章专属图解（一）：「增补」的两义切换器
// 同一个增补物，切换「加在完整之物上（盈余）」与「填补本应完整之物的空缺（替代）」，再看两义叠在一起时暴露了什么。
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", MUTED = "#8a8070";

const ITEMS = [
  {
    id: "vit", icon: "💊", name: "维生素片", orig: "一日三餐", sup: "维生素",
    add: "饮食本来就均衡，维生素只是锦上添花——多一点更好，没有也无妨。",
    rep: "可你之所以吃它，恰恰因为担心三餐缺了点什么。它填的是一个洞。",
    both: "一旦「补充剂」这个东西存在，「均衡饮食是完整的」这句话就动摇了：完整之物不需要补充。",
  },
  {
    id: "sub", icon: "🎬", name: "字幕", orig: "电影原声", sup: "字幕",
    add: "原声已经足够，字幕只是锦上添花的附加信息。",
    rep: "但你开字幕，往往是因为没听清、听不懂——它顶替了「直接听懂」本该完成的工作。",
    both: "字幕的存在说明：「一听就懂」从来不是有保证的。所谓直接理解，本身就可能缺口。",
  },
  {
    id: "memo", icon: "📝", name: "备忘录", orig: "记忆", sup: "便签",
    add: "记性好的人记一笔备份，有备无患。",
    rep: "可写下来，是因为知道记忆会漏。卢梭在《忏悔录》里也说，他收集材料是为了填补记忆的空白。",
    both: "如果记忆需要外部的字来撑，那「活的记忆」本身就已经带着遗忘的缝——它在源头上就要求「文字」。",
  },
  {
    id: "write", icon: "✍️", name: "文字（卢梭）", orig: "当面说话", sup: "文字", rousseau: true,
    add: "卢梭的理论：言语是思想的自然表达，文字只是言语的「图像」，是多余的、外在的附件，甚至是危险的。",
    rep: "卢梭的经验：他一当面说话就显得笨拙、被误解，只好「隐身去写」，用文字修复在言语中失落的自我。",
    both: "同一个人同时贬低文字又依赖文字。德里达：这不是自相矛盾，而是增补的统一逻辑——言语本就不能保住在场。",
  },
  {
    id: "nurse", icon: "🍼", name: "奶妈/教育（《爱弥儿》）", orig: "母爱·自然", sup: "教育", rousseau: true,
    add: "教育只是辅助自然，越少越晚越好，让自然自己完成工作。",
    rep: "但孩子生来弱小、母亲可能失职，于是需要奶妈、需要教育来「顶替」自然。",
    both: "卢梭说母爱无可替代，却又把整套教育设计成一套替代体系。自然若真自足，就不会有童年这种「天然的缺口」。",
  },
];

const MODES = [
  { id: "add", label: "① 添加：锦上添花", color: GOLD },
  { id: "rep", label: "② 替代：填补空缺", color: BLUE },
  { id: "both", label: "③ 两义叠合：德里达看到的", color: RED },
];

// 圆心与半径
const CX = 170, CY = 120, R = 78;
const pt = (deg, r = R) => [CX + r * Math.cos(deg * Math.PI / 180), CY + r * Math.sin(deg * Math.PI / 180)];
const [ax, ay] = pt(-28), [bx, by] = pt(28);
const PAC = `M${CX},${CY} L${bx},${by} A${R},${R} 0 1 1 ${ax},${ay} Z`;
const wedge = (r) => { const [x1, y1] = pt(-28, r), [x2, y2] = pt(28, r); return `M${CX},${CY} L${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2} Z`; };

function Figure({ it, mode }) {
  const k = it.id + mode;
  return (
    <svg key={k} viewBox="0 0 520 250" style={{ width: "100%", maxHeight: 300, background: "var(--paper)", borderRadius: 14 }}>
      {mode === "add" && <>
        <circle cx={CX} cy={CY} r={R} fill={INK} fillOpacity=".1" stroke={INK} strokeWidth="2.5" />
        <text x={CX} y={CY + 5} textAnchor="middle" fontSize="16" fill={INK}>{it.orig}</text>
        <text x={CX} y={CY - R - 12} textAnchor="middle" fontSize="12" fill={MUTED}>原物：已经完整</text>
        <g>
          <animateTransform attributeName="transform" type="translate" from="120 0" to="0 0" dur=".9s" fill="freeze" />
          <circle cx={CX + R + 38} cy={CY - 46} r="32" fill={GOLD} opacity=".9" />
          <text x={CX + R + 38} y={CY - 41} textAnchor="middle" fontSize="13" fill="#fff">{it.sup}</text>
        </g>
        <text x={CX + R + 4} y={CY - 66} fontSize="22" fill={GOLD}>+</text>
        <text x="390" y="70" fontSize="15" fill={GOLD} fontWeight="bold">盈余 surplus</text>
        <text x="390" y="94" fontSize="12.5" fill={INK}>满上加满</text>
        <text x="390" y="114" fontSize="12.5" fill={INK}>在场的「累积」</text>
        <text x="390" y="134" fontSize="12.5" fill={INK}>拿掉它，原物照样完整</text>
      </>}
      {mode === "rep" && <>
        <path d={PAC} fill={INK} fillOpacity=".1" stroke={INK} strokeWidth="2.5" />
        <path d={wedge(R)} fill="none" stroke={BLUE} strokeWidth="1.5" strokeDasharray="5 4" />
        <text x={CX - 28} y={CY + 5} textAnchor="middle" fontSize="16" fill={INK}>{it.orig}</text>
        <text x={CX} y={CY - R - 12} textAnchor="middle" fontSize="12" fill={MUTED}>原物：原来有个缺口</text>
        <g>
          <animateTransform attributeName="transform" type="translate" from="150 0" to="0 0" begin=".2s" dur="1s" fill="freeze" />
          <path d={wedge(R)} fill={BLUE} opacity=".9" />
        </g>
        <text x={CX + R + 30} y={CY + 52} fontSize="13" fill={BLUE}>{it.sup} 嵌入空位</text>
        <text x="390" y="70" fontSize="15" fill={BLUE} fontWeight="bold">替代 substitute</text>
        <text x="390" y="94" fontSize="12.5" fill={INK}>顶替、代位</text>
        <text x="390" y="114" fontSize="12.5" fill={INK}>「占据……的位置」</text>
        <text x="390" y="134" fontSize="12.5" fill={INK}>拿掉它，露出一个洞</text>
      </>}
      {mode === "both" && <>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 5">
          <animate attributeName="opacity" values="1;.25;1" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <path d={PAC} fill={INK} fillOpacity=".1" stroke={INK} strokeWidth="2.5" />
        <text x={CX - 28} y={CY + 5} textAnchor="middle" fontSize="16" fill={INK}>{it.orig}</text>
        <text x={CX} y={CY - R - 12} textAnchor="middle" fontSize="12" fill={MUTED}>虚线 = 想象中「本应」的完整</text>
        <path d={wedge(R + 22)} fill={RED} opacity=".85">
          <animate attributeName="opacity" values=".85;.55;.85" dur="2s" repeatCount="indefinite" />
        </path>
        <text x={CX + R + 30} y={CY + 60} fontSize="13" fill={RED}>{it.sup}：既填洞，又溢出</text>
        <text x="380" y="62" fontSize="15" fill={RED} fontWeight="bold">两义不可分</text>
        <text x="380" y="86" fontSize="12.5" fill={INK}>它若能「补」，</text>
        <text x="380" y="106" fontSize="12.5" fill={INK}>原物就从未自足；</text>
        <text x="380" y="126" fontSize="12.5" fill={INK}>它又总是「外来」的，</text>
        <text x="380" y="146" fontSize="12.5" fill={INK}>被当作多余甚至危险。</text>
      </>}
      <text x="260" y="238" textAnchor="middle" fontSize="12" fill={MUTED}>增补 supplément · 法语里同时有「追加」与「顶替」两义</text>
    </svg>);
}

export default function TwoSenses() {
  const [i, setI] = useState(0), [m, setM] = useState(0);
  const it = ITEMS[i], mode = MODES[m];
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>选一个增补物：</div>
        <div className="seg" style={{ marginBottom: 6 }}>{ITEMS.map((x, j) =>
          <button key={x.id} className={i === j ? "on" : ""} onClick={() => setI(j)}>{x.icon} {x.name}</button>)}</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>切换读法：</div>
        <div className="seg" style={{ marginBottom: 0 }}>{MODES.map((x, j) =>
          <button key={x.id} className={m === j ? "on" : ""} onClick={() => setM(j)}>{x.label}</button>)}</div>
      </div>
      <Figure it={it} mode={mode.id} />
      <div style={{ borderLeft: `4px solid ${mode.color}`, paddingLeft: 12 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 19, marginBottom: 4 }}>
          {it.icon} {it.sup} 之于 {it.orig} · <span style={{ color: mode.color }}>{mode.label.slice(2)}</span>
        </div>
        <p style={{ margin: 0 }}>{it[mode.id]}</p>
        {mode.id === "both" && <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 15 }}>
          这就是 <C id="two_senses">两义的同居</C>：第二义（替代）悄悄揭穿了第一义（添加）所预设的「原物已完整」。
          {it.rousseau ? " 而卢梭总想只用第一义来谈它——这正是他的盲点。" : " 卢梭笔下的文字、教育、想象，都是同一结构。"}
        </p>}
      </div>
    </div>);
}
