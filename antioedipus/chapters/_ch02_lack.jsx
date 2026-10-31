// 第 2 章专属图解 A：同一场景，两种欲望理论（匮乏 vs 生产），再揭开第三层「匮乏从哪来」
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#6b6257";

const SCENES = [
  {
    id: "hunger", icon: "🍜", label: "饿了",
    want: "一碗面",
    lack: {
      head: "我缺一碗面，所以我想要。",
      text: "欲望的起点是一个「洞」：身体里少了点什么，于是去外面把它拿回来。欲望 = 对缺席对象的渴求；填满了，欲望就熄灭。",
    },
    chain: ["胃", "嘴", "筷子", "面馆", "麦田"],
    prod: {
      head: "嘴接上了一条食物的流。",
      text: "这里没有一个先在的「洞」，只有一串接起来的机器：胃—嘴—筷子—面馆—麦田—骑手……每台机器从上一台的流里切一段。D&G 并不否认饥饿是真的；他们说的是，「需要」是在这套已在运转的生产中被派生出来的，而不是欲望的本质。",
    },
    organized: "书里的说法很尖锐：真正挨饿的穷人知道自己缺的不是「心底的某个对象」，而是那些不断被拿走的东西。饥饿被分配在谁身上，是社会生产组织出来的。",
  },
  {
    id: "phone", icon: "📱", label: "想要新手机",
    want: "新款手机",
    lack: {
      head: "我缺一部新手机，它在橱窗里发光。",
      text: "对象在「那边」，我在「这边」，中间是一道裂缝。即使买到手，它也会立刻变旧，于是又出现一个新的缺口——按这种理论，欲望注定永远不满足。",
    },
    chain: ["手指", "屏幕", "相机", "朋友圈", "工作群"],
    prod: {
      head: "我想要的不是一个物件，而是一整套连接。",
      text: "手—眼—屏幕—网络—朋友圈—工作群：欲望投资的是整个社会场，是拍、发、看、被看、被找到。欲望和它的对象是同一回事——一台机器接上另一台机器。",
    },
    organized: "示意（非书中例子）：年度换代、限量发售、「旧款」标签、存储空间刚好不够……这正是 D&G 所说的「在丰裕的生产之中刻意组织出匮乏」——制造稀缺，是支配阶级的技艺。",
  },
  {
    id: "love", icon: "💞", label: "恋爱",
    want: "「另一半」",
    lack: {
      head: "我不完整，我在寻找另一半。",
      text: "柏拉图《会饮》里的老故事：人本来是一个整体，被劈成两半，于是终生寻找失去的那一半。欲望 = 对失落整体的怀念。",
    },
    chain: ["目光", "对话", "饭桌", "城市路线", "两群朋友"],
    prod: {
      head: "恋爱是把两套机器接在一起，生产出新的现实。",
      text: "一起吃饭的时间流、深夜对话的流、新的城市路线、两群朋友的交叉——欲望不是在补一个洞，而是在造：新的习惯、新的空间、新的「我们」。不预设一个失落的整体。",
    },
    organized: "示意（非书中例子）：婚恋市场和某些社交软件把「单身」标记为一种欠缺、一种待修复的状态，并围绕这个「缺」组织出整套消费。缺口是被安装进来的。",
  },
];

function LackSVG({ s }) {
  return <svg viewBox="0 0 640 230" style={{ width: "100%", maxHeight: 280, background: "var(--paper)", borderRadius: 14 }}>
    {/* 主体与它的空洞 */}
    <circle cx="150" cy="115" r="70" fill="#fff" stroke={INK} strokeWidth="2" />
    <circle cx="150" cy="115" r="30" fill="var(--paper)" stroke={RED} strokeWidth="2" strokeDasharray="5 5">
      <animate attributeName="r" values="26;34;26" dur="2.4s" repeatCount="indefinite" />
    </circle>
    <text x="150" y="120" textAnchor="middle" fontSize="13" fill={RED}>空缺</text>
    <text x="150" y="208" textAnchor="middle" fontSize="15" fill={INK}>「我」（主体）</text>
    {/* 另一个世界里的对象 */}
    <ellipse cx="500" cy="115" rx="105" ry="62" fill="none" stroke={MUTED} strokeDasharray="3 6" />
    <text x="500" y="70" textAnchor="middle" fontSize="12" fill={MUTED}>「另一个地方」</text>
    <text x="500" y="122" textAnchor="middle" fontSize="34">{s.icon}</text>
    <text x="500" y="152" textAnchor="middle" fontSize="13" fill={INK}>{s.want}</text>
    <path d="M225 115 C 300 60, 340 60, 395 105" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="7 7" markerEnd="url(#arrL)">
      <animate attributeName="stroke-dashoffset" values="28;0" dur="1.2s" repeatCount="indefinite" />
    </path>
    <text x="310" y="58" textAnchor="middle" fontSize="13" fill={RED}>想要（却够不着）</text>
    <defs><marker id="arrL" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={RED} /></marker></defs>
  </svg>;
}

function ProdSVG({ s, organized }) {
  const n = s.chain.length, xs = s.chain.map((_, i) => 70 + i * (500 / (n - 1)));
  const path = `M${xs[n - 1]} 125 L${xs[0]} 125`;
  return <svg viewBox="0 0 640 230" style={{ width: "100%", maxHeight: 280, background: "var(--paper)", borderRadius: 14 }}>
    <path id={"pf-" + s.id} d={path} fill="none" />
    <line x1={xs[0]} y1="125" x2={xs[n - 1]} y2="125" stroke={BLUE} strokeWidth="3" opacity=".35" />
    {[0, 1, 2, 3, 4, 5].map(k => <circle key={k} r="5" fill={BLUE}>
      <animateMotion dur="3.6s" begin={`-${k * .6}s`} repeatCount="indefinite"><mpath href={"#pf-" + s.id} /></animateMotion>
    </circle>)}
    {s.chain.map((c, i) => <g key={c}>
      <rect x={xs[i] - 42} y="100" width="84" height="50" rx="10" fill="#fff" stroke={GREEN} strokeWidth="2" />
      <text x={xs[i]} y="131" textAnchor="middle" fontSize="14" fill={INK}>{c}</text>
      <text x={xs[i]} y="172" textAnchor="middle" fontSize="10" fill={MUTED}>机器 {i + 1}</text>
    </g>)}
    <text x="320" y="40" textAnchor="middle" fontSize="14" fill={GREEN}>流 → 切 → 再流 → 再切……（「然后……然后……」）</text>
    <text x="320" y="210" textAnchor="middle" fontSize="12" fill={MUTED}>没有「洞」，只有连接；产品是真实的</text>
    {organized && <g>
      <rect x="200" y="54" width="240" height="30" rx="8" fill={GOLD} opacity=".95" />
      <text x="320" y="74" textAnchor="middle" fontSize="13" fill="#fff">社会生产 / 反生产：在这里「挖洞」</text>
      {[1, 2, 3].map(i => <g key={i}>
        <line x1={320} y1="84" x2={xs[i] + (xs[i + 1] - xs[i]) / 2} y2="118" stroke={GOLD} strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx={xs[i] + (xs[i + 1] - xs[i]) / 2} cy="125" r="9" fill="var(--paper)" stroke={RED} strokeWidth="2" strokeDasharray="3 3">
          <animate attributeName="r" values="6;11;6" dur="1.8s" begin={`${i * .3}s`} repeatCount="indefinite" />
        </circle>
      </g>)}
    </g>}
  </svg>;
}

export default function LackVsProduction() {
  const [si, setSi] = useState(0), [lens, setLens] = useState(0), [org, setOrg] = useState(false);
  const s = SCENES[si];
  return <div className="card" style={{ display: "grid", gap: 14 }}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
      <div className="seg" style={{ marginBottom: 0 }}>{SCENES.map((x, j) =>
        <button key={x.id} className={si === j ? "on" : ""} onClick={() => { setSi(j); setOrg(false); }}>{x.icon} {x.label}</button>)}</div>
      <div className="seg" style={{ marginBottom: 0 }}>
        <button className={lens === 0 ? "on" : ""} onClick={() => { setLens(0); setOrg(false); }}>🕳️ 欲望 = 匮乏</button>
        <button className={lens === 1 ? "on" : ""} onClick={() => setLens(1)}>⚙️ 欲望 = 生产</button>
      </div>
    </div>
    {lens === 0 ? <LackSVG key={s.id + "l"} s={s} /> : <ProdSVG key={s.id + "p" + org} s={s} organized={org} />}
    <div>
      <div style={{ fontFamily: "var(--serif)", fontSize: 21, color: lens ? GREEN : RED }}>
        {lens === 0 ? "精神分析 / 柏拉图式读法：" : "德勒兹 & 加塔利的读法："}{(lens ? s.prod : s.lack).head}
      </div>
      <p style={{ margin: "6px 0" }}>{(lens ? s.prod : s.lack).text}</p>
      {lens === 1 && <button className="chip" style={{ fontSize: 15, padding: "4px 14px" }} onClick={() => setOrg(!org)}>
        {org ? "▲ 收起第三层" : "▼ 第三层：那「匮乏」到底从哪来？"}</button>}
      {lens === 1 && org && <div className="callout warn" style={{ marginTop: 12 }}>
        <b>匮乏是被组织出来的</b>
        <div>{s.organized} 参见 <C id="organized_lack">被组织的匮乏</C>。</div>
      </div>}
      {lens === 0 && <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>👉 切到「欲望 = 生产」，看同一件事怎样被重新描述。</p>}
    </div>
  </div>;
}
