// 第 1 章专属图解 (b)：三种综合「三层楼」+ 无器官身体的排斥/吸引滑块
import { useState } from "react";
import { C, StepThrough } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#6b6257";

// 楼层：y 起点、高度
const FLOORS = [
  { key: "top", y: 4, h: 112, name: "消费", syn: "合取综合", word: "「原来是……！」", energy: "Voluptas 快感", col: VIOLET },
  { key: "mid", y: 122, h: 156, name: "记录", syn: "析取综合", word: "「或……或……或」", energy: "Numen 神性能量", col: GOLD },
  { key: "bot", y: 284, h: 112, name: "生产", syn: "连接综合", word: "「和……然后……」", energy: "Libido 力比多", col: RED },
];
// 每一步哪些楼层亮着
const LIT = [["bot"], ["bot", "mid"], ["mid"], ["mid"], ["top"], ["top", "mid", "bot"]];

const ORGANS = ["🤱", "👄", "👁️", "☀️", "✋"];
const SOCIAL = ["👷", "🏭", "🌾", "🚚", "💡"];
const EX = 390, EY = 200, ERX = 200, ERY = 46; // 无器官身体（蛋形）

function Chain({ running }) {
  const xs = [170, 270, 370, 470, 570], y = 345, icons = ["🤱", "👄", "🌀", "🕳️", "🌳"];
  return <g>
    {xs.slice(0, -1).map((x, i) => <g key={i}>
      <line x1={x + 20} y1={y} x2={xs[i + 1] - 20} y2={y} stroke={RED} strokeWidth="6" strokeDasharray="8 8" strokeLinecap="round">
        {running && <animate attributeName="stroke-dashoffset" values="32;16;16;0" keyTimes="0;.45;.6;1" dur="1.2s" repeatCount="indefinite" />}
      </line>
      <text x={x + 50} y={y - 14} textAnchor="middle" fontSize="11" fill={MUTED}>和……</text>
    </g>)}
    {xs.map((x, i) => <g key={"n" + i}><circle cx={x} cy={y} r="20" fill="#fffdf8" stroke={INK} strokeWidth="1.5" />
      <text x={x} y={y + 7} textAnchor="middle" fontSize="19">{icons[i]}</text></g>)}
    {!running && <text x={370} y={386} textAnchor="middle" fontSize="13" fill={RED} fontWeight="700">⏸ 一切骤然停住……</text>}
  </g>;
}

function Egg({ grid }) {
  return <g>
    <defs>
      <radialGradient id="ch01egg" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#fffdf8" /><stop offset="100%" stopColor="#e9dcc0" />
      </radialGradient>
      <clipPath id="ch01eggclip"><ellipse cx={EX} cy={EY} rx={ERX} ry={ERY} /></clipPath>
    </defs>
    <ellipse cx={EX} cy={EY} rx={ERX} ry={ERY} fill="url(#ch01egg)" stroke={GOLD} strokeWidth="2" />
    {grid && <g stroke={GOLD} strokeWidth="1" opacity=".55" fill="none" clipPath="url(#ch01eggclip)">
      {[-120, -60, 0, 60, 120].map(dx => <ellipse key={dx} cx={EX + dx} cy={EY} rx={Math.max(6, 60 - Math.abs(dx) * .3)} ry={ERY - 2} />)}
      {[-22, 0, 22].map(dy => <line key={dy} x1={EX - Math.sqrt(1 - (dy / ERY) ** 2) * ERX} x2={EX + Math.sqrt(1 - (dy / ERY) ** 2) * ERX} y1={EY + dy} y2={EY + dy} />)}
    </g>}
  </g>;
}

function Organs({ att, icons, label }) {
  // att 0..1：0 = 完全排斥（被推离蛋面），1 = 完全吸引（像奖章挂在蛋面上）
  return <g>
    {icons.map((ic, i) => {
      const dx = (i - 2) * 80, attached = { x: EX + dx, y: EY - 4 + (i % 2) * 10 };
      const away = { x: EX + dx * 1.3, y: i % 2 ? EY + 50 : EY - 50 };
      const x = away.x + (attached.x - away.x) * att, y = away.y + (attached.y - away.y) * att;
      return <g key={i}>
        {att < .5 && <text x={x + 16} y={y - 10} fontSize="13" fill={RED} opacity={1 - att * 2}>⚡</text>}
        <circle cx={x} cy={y - 6} r="15" fill="#fffdf8" stroke={att > .5 ? GOLD : RED} strokeWidth="1.5" />
        <text x={x} y={y + 1} textAnchor="middle" fontSize="16">{ic}</text>
      </g>;
    })}
    {label && <text x={EX} y={EY + 73} textAnchor="middle" fontSize="12" fill={MUTED}>{label}</text>}
  </g>;
}

function Circles() {
  const cx = 390, cy = 56, R = [[58, 16], [118, 29], [190, 42]];
  const names = ["成为女人", "成为神", "「历史上每个名字都是我」"];
  return <g>
    {R.map(([rx, ry], i) => <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={VIOLET} strokeWidth={1.5} strokeDasharray="4 5" opacity={.4 + i * .15} />)}
    <circle cx={cx} cy={cy} r="15" fill="#fffdf8" stroke={INK} />
    <text x={cx} y={cy + 6} textAnchor="middle" fontSize="16">⚙️</text>
    {names.map((t, i) => <text key={t} x={cx + [64, -124, 150][i]} y={cy + [-12, 4, 52][i]} textAnchor={["start", "end", "middle"][i]} fontSize="11" fill={VIOLET}>{t}</text>)}
    <g>
      <circle r="8" fill={VIOLET}>
        <animateMotion dur="7s" repeatCount="indefinite" path={`M ${cx + 190} ${cy} A 190 42 0 1 1 ${cx - 190} ${cy} A 190 42 0 1 1 ${cx + 190} ${cy}`} />
      </circle>
      <text fontSize="12" fill={VIOLET} fontWeight="700" textAnchor="middle" dy="-12">原来是我！
        <animateMotion dur="7s" repeatCount="indefinite" path={`M ${cx + 190} ${cy} A 190 42 0 1 1 ${cx - 190} ${cy} A 190 42 0 1 1 ${cx + 190} ${cy}`} />
      </text>
    </g>
  </g>;
}

export default function ThreeSyntheses() {
  const [att, setAtt] = useState(.15);
  const [social, setSocial] = useState(false);
  const attLabel = att < .35 ? "偏执机器：排斥——机器像迫害者，被推开" : att > .65 ? "奇迹机器：吸引——器官像奖章挂在身上，仿佛从它身上长出" : "排斥与吸引同时在场、互相拉锯";

  const render = i => {
    const lit = LIT[i];
    return <svg viewBox="0 0 640 400" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
      {FLOORS.map(f => {
        const on = lit.includes(f.key);
        return <g key={f.key} opacity={on ? 1 : .2} style={{ transition: "opacity .4s" }}>
          <rect x="4" y={f.y} width="632" height={f.h} rx="12" fill={on ? "#fffdf8" : "none"} stroke={f.col} strokeWidth={on ? 2 : 1} />
          <text x="18" y={f.y + 28} fontSize="20" fontWeight="700" fill={f.col} fontFamily="var(--serif)">{f.name}</text>
          <text x="18" y={f.y + 48} fontSize="13" fill={INK}>{f.syn}</text>
          <text x="18" y={f.y + 66} fontSize="12" fill={MUTED}>{f.word}</text>
          <text x="18" y={f.y + f.h - 12} fontSize="11" fill={f.col}>⚡ {f.energy}</text>
        </g>;
      })}
      {/* 生产层 */}
      <g opacity={lit.includes("bot") ? 1 : .2}><Chain running={i !== 1} /></g>
      {/* 记录层 */}
      <g opacity={lit.includes("mid") ? 1 : .2}>
        {i >= 1 && <Egg grid={i === 3 || i === 5} />}
        {i === 1 && <text x={EX} y={EY + 6} textAnchor="middle" fontSize="14" fill={GOLD} fontWeight="700">无器官身体 · 强度 = 0</text>}
        {i === 2 && <Organs att={att} icons={ORGANS} label={attLabel} />}
        {(i === 3 || i === 5) && <Organs att={1} icons={social && i === 3 ? SOCIAL : ORGANS}
          label={social && i === 3 ? "资本：一切劳动与机器都显得是从它身上「奇迹般」产生的" : "机器被登记为蛋面上的一个个析取点：或这里，或那里，或那里……"} />}
        {i === 3 && social && <text x={EX} y={EY - 52} textAnchor="middle" fontSize="15" fontWeight="700" fill={GOLD}>💰 资本（社会的无器官身体）</text>}
        {i === 0 && <text x={EX} y={EY + 6} textAnchor="middle" fontSize="13" fill={MUTED}>（还没有出现）</text>}
      </g>
      {/* 消费层 */}
      <g opacity={lit.includes("top") ? 1 : .2}>{i >= 4 ? <Circles /> : <text x="390" y="64" textAnchor="middle" fontSize="13" fill={MUTED}>（还没有出现）</text>}</g>
      {i === 5 && <g fontSize="12" fill={INK}>
        <path d="M 615 290 L 615 270" stroke={INK} strokeWidth="2" markerEnd="url(#ch01arr)" />
        <path d="M 615 130 L 615 110" stroke={INK} strokeWidth="2" markerEnd="url(#ch01arr)" />
        <defs><marker id="ch01arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill={INK} /></marker></defs>
      </g>}
    </svg>;
  };

  const steps = [
    { label: "生产：连接", content: <><p>最底层是工厂车间：<C id="desiring_machine">欲望机器</C> 一台接一台，乳房产奶、嘴截取、肠胃接着嘴……这是 <C id="connective_synthesis">连接综合</C>，即「生产的生产」，口诀是「和……然后……」。驱动它的能量叫力比多（libido），作者把它理解为欲望生产的连接性「劳动」。</p><p style={{ fontSize: 14, color: "var(--muted)" }}>注意流是时断时续的：欲望机器只有在不断故障中才运转。</p></> },
    { label: "反生产：停住", content: <><p>在「生产 = 产品」的同一性里，冒出一个第三项：一个巨大的、未分化的对象。一切骤然停住、冻结：没有嘴、没有舌、没有牙、没有肛门。这就是 <C id="body_without_organs">无器官身体</C>（<i>body without organs, CsO</i>），它不生产、不消费、不是生出来的，属于<b>反生产</b>。</p><p>它不是原初的虚无，也不是身体意象的投射，而是在生产中途、在某时某地被生产出来的；然后过程又会重新开始。</p></> },
    {
      label: "排斥 ↔ 吸引", content: <><p>拖动滑块，看无器官身体与欲望机器的两种关系：</p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "6px 0 10px" }}>
          <span style={{ color: RED, fontSize: 14, whiteSpace: "nowrap" }}>排斥</span>
          <input type="range" min="0" max="100" value={Math.round(att * 100)} onChange={e => setAtt(e.target.value / 100)} style={{ flex: 1, accentColor: GOLD }} aria-label="排斥与吸引" />
          <span style={{ color: GOLD, fontSize: 14, whiteSpace: "nowrap" }}>吸引</span>
        </div>
        <p><b>{attLabel}</b></p>
        <p>排斥端是 <C id="paranoiac_machine">偏执机器</C>：每一次连接都让无器官身体无法忍受，它把机器当作一整套迫害装置推开。作者说，精神分析所谓的「原初压抑」其实就是这个。吸引端是 <C id="miraculating_machine">奇迹机器</C>：它把机器吸附到自己身上，好像一切都是从它身上奇迹般长出来的。作者强调两者是<b>共存</b>的，而不是简单的先后替代。</p></>
    },
    {
      label: "记录：析取", content: <><div className="seg" style={{ marginBottom: 8 }}>
        <button className={!social ? "on" : ""} onClick={() => setSocial(false)}>欲望版：施瑞伯的身体</button>
        <button className={social ? "on" : ""} onClick={() => setSocial(true)}>社会版：资本</button></div>
        {!social ? <p>被吸附的机器成了无器官身体表面的一个个<b>析取点</b>，表面被织成经纬网格。这就是 <C id="disjunctive_synthesis">析取综合</C>，即「记录的生产」，口诀是「或……或……或」：不是在两项之间做非此即彼的选择，而是在同一个光滑表面上排列、滑移，排来排去「都一样」。一部分力比多由此转成登记的能量 Numen。</p>
          : <p>社会生产里同样有一具无器官身体，即 <C id="socius">社会体</C>：大地、暴君或<b>资本</b>。资本把整个生产「折回」到自己身上，成为登记一切的表面；工人、机器、土地的生产力看上去全都出自资本，资本像是准原因。马克思称之为一个被施了魔法的世界。</p>}</>
    },
    { label: "消费：合取", content: <><p>顶层是消费。登记表面上出现一个奇特的主体：它不在中心（中心是机器），而在外圈游走，没有固定身份。每经过一种状态（一条强度带），它就重生一次，并惊叹「<b>原来是我！</b>」。这就是 <C id="conjunctive_synthesis">合取综合</C>，即「消费的生产」，驱动它的是又一次能量转化：Voluptas（快感）。</p><p>这个 <C id="residual_subject">残余的主体</C> 是在 <C id="celibate_machine">独身机器</C> 旁边被生产出来的副产品，它所消费的是纯粹的 <C id="intensity">强度</C>。</p></> },
    { label: "合起来看", content: <><p>三层是同一个<C id="process">过程</C>：记录「折回」到生产之上，消费又在记录之中被生产出来；能量依次转化：libido → Numen → Voluptas。顺序是：<b>先有机器和流，再有登记，最后才有「我」</b>。</p><p>在作者看来，精神分析把顺序倒了过来：先有一个「我」和爸爸妈妈，欲望是从这个家庭剧里派生出来的。作者的反问贯穿全章：欲望的登记一定要经过俄狄浦斯三角吗？「原来是我！」为什么被缩减成「原来是我爸、我妈」？</p></> },
  ];
  return <StepThrough steps={steps} render={render} />;
}
