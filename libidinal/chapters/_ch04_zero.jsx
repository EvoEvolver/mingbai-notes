// 第 4 章专属图解：零的四种装置——希腊中心之零 / 吕底亚扩张 / 出口阀门 / 重商主义双重封闭
// 另附：托斯卡—斯卡皮亚的博弈矩阵（Rapoport），以及矩阵之外的那一刀。
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", MUTED = "#8a7f72", GREEN = "#3c6b4a";
const CX = 320, CY = 222;
const pt = (r, deg) => [CX + r * Math.cos(deg * Math.PI / 180), CY + r * Math.sin(deg * Math.PI / 180)];
const f = n => n.toFixed(1);

// 一个沿路径运动的小颗粒
const Packet = ({ d, color = GOLD, dur = 3, begin = 0, r = 5, shape = "c" }) => (
  shape === "c"
    ? <circle r={r} fill={color} opacity="0">
        <animateMotion path={d} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
      </circle>
    : <rect x={-r} y={-r} width={r * 2} height={r * 2} fill={color} opacity="0">
        <animateMotion path={d} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
      </rect>);

// 穿过中心的交换：A → 零 → B
const via = (a, b, R) => { const [x1, y1] = pt(R, a), [x2, y2] = pt(R, b); return `M${f(x1)},${f(y1)} L${CX},${CY} L${f(x2)},${f(y2)}`; };

const ZeroHub = ({ label = "méson", sub = "0" }) => <>
  <circle cx={CX} cy={CY} r="28" fill="#fffdf8" stroke={INK} strokeWidth="2" />
  <text x={CX} y={CY + 9} textAnchor="middle" fontSize="26" fontFamily="Georgia,serif" fill={INK}>{sub}</text>
  <text x={CX} y={CY + 46} textAnchor="middle" fontSize="12" fill={MUTED} fontStyle="italic">{label}</text>
</>;

// ---------- 模式 A：希腊城邦 ----------
function Greek() {
  const R = 118, ang = [0, 45, 90, 135, 180, 225, 270, 315];
  const outs = [["女人", 200], ["奴隶", 250], ["外邦人", 300], ["劳作的手", 340], ["孩子", 20], ["外语 · 叫喊", 160], ["子宫", 125]];
  const pairs = [[0, 4], [1, 5], [2, 6], [3, 7], [6, 1], [7, 3]];
  const [ux, uy] = pt(172, 125), [ex, ey] = pt(R, 100);
  return <>
    {outs.map(([t, a]) => { const [x, y] = pt(178, a); return <text key={t} x={x} y={y} textAnchor="middle" fontSize="13" fill={MUTED} opacity=".75">{t}</text>; })}
    <circle cx={CX} cy={CY} r={R} fill="rgba(184,134,43,.06)" stroke={INK} strokeWidth="2.5" />
    {pairs.map(([a, b], k) => <Packet key={k} d={via(ang[a], ang[b], R)} dur={3.2} begin={k * .55} />)}
    {ang.map(a => { const [x, y] = pt(R, a); return <circle key={a} cx={x} cy={y} r="9" fill={BLUE} />; })}
    <ZeroHub />
    {/* 圈外的「付款」：精液 → 子宫 → 孩子回到圈内 */}
    <path d={`M${f(ex)},${f(ey)} Q${f(ex - 60)},${f(ey + 40)} ${f(ux)},${f(uy - 10)}`} fill="none" stroke={RED} strokeDasharray="4 4" strokeWidth="1.5" />
    <Packet d={`M${f(ex)},${f(ey)} Q${f(ex - 60)},${f(ey + 40)} ${f(ux)},${f(uy - 10)} Q${f(ex + 70)},${f(ey + 60)} ${f(ex + 18)},${f(ey - 2)}`} color={RED} dur={4} r={4} />
    <text x="24" y="30" fontSize="13" fill={INK}>每轮结算：<tspan fontWeight="700">收支 = 0</tspan></text>
    <text x="24" y="50" fontSize="12" fill={MUTED}>蓝点 = 等距的男性公民（isonomia）</text>
    <text x="24" y="430" fontSize="12" fill={RED}>红虚线：与妻子生育＝「以精液付账」，孩子回流城邦</text>
  </>;
}

// ---------- 模式 B：吕底亚 ----------
function Lydian() {
  const R0 = 118, R1 = 150;
  const old = [0, 45, 90, 135, 180, 225, 270, 315];
  const neu = [22, 67, 112, 157, 202, 247, 292, 337];
  const labels = [["女儿", 112], ["任何部位", 315], ["手心 · 腋窝", 22], ["叫声 · 气味", 180]];
  const pairs = [[0, 9], [3, 12], [5, 14], [10, 7], [1, 13], [15, 2], [11, 6]];
  const all = [...old, ...neu];
  return <>
    <circle cx={CX} cy={CY} r={R1} fill="rgba(155,44,31,.05)" stroke={INK} strokeWidth="2.5">
      <animate attributeName="r" from={R0} to={R1} dur="1.6s" fill="freeze" />
    </circle>
    {pairs.map(([a, b], k) => <Packet key={k} d={via(all[a], all[b], R1)} dur={2.6} begin={1.4 + k * .4} r={4.5} />)}
    {old.map(a => { const [x0, y0] = pt(R0, a), [x, y] = pt(R1, a); return <circle key={a} cx={x} cy={y} r="8" fill={BLUE}>
      <animate attributeName="cx" from={x0} to={x} dur="1.6s" fill="freeze" /><animate attributeName="cy" from={y0} to={y} dur="1.6s" fill="freeze" /></circle>; })}
    {neu.map((a, k) => { const [x0, y0] = pt(215, a), [x, y] = pt(R1, a); return <circle key={a} cx={x} cy={y} r="8" fill={RED}>
      <animate attributeName="cx" from={x0} to={x} dur="1.6s" begin={`${.3 + k * .08}s`} fill="freeze" />
      <animate attributeName="cy" from={y0} to={y} dur="1.6s" begin={`${.3 + k * .08}s`} fill="freeze" />
      <animate attributeName="r" values="16;8" dur="1.6s" begin={`${.3 + k * .08}s`} fill="freeze" /></circle>; })}
    {labels.map(([t, a]) => { const [x, y] = pt(196, a); return <text key={t} x={x} y={y + 4} textAnchor="middle" fontSize="12.5" fill={RED}>{t}</text>; })}
    <ZeroHub label="铸币 · 支付货币" />
    <text x="24" y="30" fontSize="13" fill={INK}>圈子扩大：<tspan fontWeight="700">更多身体片段可被标价</tspan></text>
    <text x="24" y="50" fontSize="12" fill={MUTED}>红点 = 新入圈的片段：大小不一的强度被压成同样大小的「货品」</text>
    <text x="24" y="430" fontSize="12" fill={MUTED}>极限处：整条迷宫般的力比多带都成为商品化的候选——这就是普遍资本主义的问题</text>
  </>;
}

// ---------- 模式 C：出口阀门 ----------
function Outlet() {
  const R = 118;
  const valves = [{ a: 325, t: "献祭", s: "火焰：纯粹耗费", p: "daksina（祭司酬金）", icon: "🔥" },
    { a: 35, t: "卖淫", s: "「不育」的享乐", p: "嫖资", icon: "🌙" },
    { a: 180, t: "精神分析", s: "移情", p: "诊费 + 可懂的话语", icon: "🛋️" }];
  return <>
    <circle cx={CX} cy={CY} r={R} fill="rgba(44,74,110,.05)" stroke={INK} strokeWidth="2.5" />
    {[0, 90, 135, 225, 270, 345].map(a => { const [x, y] = pt(R, a); return <circle key={a} cx={x} cy={y} r="7" fill={BLUE} opacity=".8" />; })}
    {valves.map((v, k) => {
      const [x1, y1] = pt(R, v.a), [x2, y2] = pt(205, v.a), [lx0, ly] = pt(212, v.a); const right = Math.cos(v.a * Math.PI / 180) > 0, lx = lx0 + (right ? 14 : -14), anc = right ? "start" : "end";
      const [ox1, oy1] = pt(R, v.a - 9), [ox2, oy2] = pt(205, v.a - 9);
      const [ix1, iy1] = pt(205, v.a + 9), [ix2, iy2] = pt(R, v.a + 9);
      return <g key={v.t}>
        <path d={`M${f(ox1)},${f(oy1)} L${f(ox2)},${f(oy2)} L${f(ix1)},${f(iy1)} L${f(ix2)},${f(iy2)}`} fill="rgba(155,44,31,.08)" stroke={RED} strokeWidth="1.2" />
        <Packet d={`M${f(x1)},${f(y1)} L${f(x2)},${f(y2)}`} color={RED} dur={1.8} begin={k * .5} r={5} />
        <Packet d={`M${f(ix1)},${f(iy1)} L${f(ix2)},${f(iy2)} L${CX},${CY}`} color={GOLD} dur={2.6} begin={1 + k * .5} r={4.5} shape="s" />
        <text x={lx} y={ly - 8} textAnchor={anc} fontSize="15" fill={INK} fontWeight="700">{v.icon} {v.t}</text>
        <text x={lx} y={ly + 9} textAnchor={anc} fontSize="11.5" fill={RED}>出：{v.s}</text>
        <text x={lx} y={ly + 24} textAnchor={anc} fontSize="11.5" fill={GOLD}>回：{v.p}</text>
      </g>;
    })}
    <ZeroHub label="交换的零" />
    <text x="24" y="30" fontSize="13" fill={INK}>圆周上开出阀门：<tspan fontWeight="700" fill={RED}>享乐—死亡</tspan>流出，<tspan fontWeight="700" fill={GOLD}>付款</tspan>流回</text>
    <text x="24" y="430" fontSize="12" fill={MUTED}>付款把一段不可逆的「出神」时间兑成现金——「射了？那就该让它受孕。」</text>
  </>;
}

// ---------- 模式 D：重商主义 ----------
const NATIONS = [{ n: "西班牙", a: 195, k: 1.6 }, { n: "德意志", a: 245, k: 1.4 }, { n: "意大利", a: 150, k: 1.5 },
  { n: "英格兰", a: 295, k: 1.25 }, { n: "荷兰", a: 345, k: .75 }, { n: "巴巴里海岸", a: 100, k: 1.3 }];
function Mercantile({ t }) {
  const R = 112, r = 44, frac = t / 100;
  const flame = 14 + 26 * frac;
  return <>
    {NATIONS.map((x, k) => {
      const left = Math.max(0, 1 - frac * x.k);
      const [nx, ny] = pt(185, x.a), [bx, by] = pt(R, x.a);
      return <g key={x.n}>
        <circle cx={nx} cy={ny} r={13 + 17 * left} fill={GOLD} opacity={.15 + .7 * left} stroke={GOLD} />
        <text x={nx} y={ny + 4} textAnchor="middle" fontSize="12" fill={INK} opacity={.5 + .5 * left}>{x.n}</text>
        {left > 0.02 && <Packet d={`M${f(nx)},${f(ny)} L${f(bx)},${f(by)} L${CX},${CY}`} color={GOLD} dur={2.4} begin={k * .35} r={4.5} />}
        <Packet d={`M${f(bx)},${f(by)} L${f(nx)},${f(ny)}`} color={BLUE} dur={2.2} begin={.6 + k * .3} r={3.5} shape="s" />
      </g>;
    })}
    <circle cx={CX} cy={CY} r={R} fill="rgba(184,134,43,.05)" stroke={INK} strokeWidth="4" strokeDasharray="10 5" />
    <text x={CX} y={CY - R - 8} textAnchor="middle" fontSize="12" fill={INK}>第一道界限：关税壁垒（王国＝剧场，臣民＝观众）</text>
    <circle cx={CX} cy={CY} r={r} fill="rgba(155,44,31,.08)" stroke={RED} strokeWidth="2" />
    <text x={CX} y={CY + r + 15} textAnchor="middle" fontSize="11.5" fill={RED}>第二道界限：凡尔赛舞台</text>
    <path d={`M${CX - flame * .6},${CY + 14} Q${CX - flame * .7},${CY - flame * .4} ${CX},${CY - flame} Q${CX + flame * .7},${CY - flame * .4} ${CX + flame * .6},${CY + 14} Z`} fill={RED} opacity=".85">
      <animate attributeName="opacity" values=".65;.95;.65" dur=".9s" repeatCount="indefinite" />
    </path>
    <text x="616" y="384" textAnchor="end" fontSize="13" fill={INK}>法国境内流通白银：<tspan fontWeight="700">{Math.round(150 + 50 * frac)}</tspan> 百万里弗尔</text>
    <text x="616" y="404" textAnchor="end" fontSize="13" fill={INK}>邻国被夺走：<tspan fontWeight="700" fill={RED}>−{Math.round(50 * frac)}</tspan>（欧洲总量恒定 → 零和）</text>
    <text x="24" y="430" fontSize="12" fill={MUTED}>中心不是「零」而是一团火：金子在宴会与排场中被烧掉。蓝方块＝外销商品，金点＝流入的白银</text>
    {frac > .97 && <text x={CX} y="24" textAnchor="middle" fontSize="13" fill={RED} fontWeight="700">「只有荷兰还在以强大力量作战」——直到它也被抽干</text>}
  </>;
}

const MODES = [
  { id: "greek", icon: "🏛️", name: "希腊：中心之零", concept: "meson_zero",
    head: "城邦与市场：一切流动都要穿过空的中心，最后归零",
    text: "男性公民在圆周上与中心等距。交换（商品、言辞、爱欲）都穿过 méson——货币、讲坛、计票——被抵消，账面永远回到 0。圈外的女人、奴隶、外邦人、劳作的手被排除；城邦只能靠公民「以精液付账」生出孩子来补充自己。",
    eg: "苏格拉底拒绝阿尔基比亚德「以美色换智慧」的买卖，说他的智慧在金子上值零——这恰恰是一切市场的理论：每笔交易结算为零。" },
  { id: "lydian", icon: "🪙", name: "吕底亚：圈子扩张", concept: "lydian_dispositif",
    head: "第一批铸币的人，也让女儿进入市场：越来越多的身体片段被标价",
    text: "希罗多德说吕底亚人最早用金银铸币、开零售，并让女儿卖淫。利奥塔把两件事读成同一个装置：只要能经由货币找到买主，带子上的任何一块都可以进圈。圈子扩大了，零仍在中心，而每块被纳入的强度都被压成可比的「货品」。",
    eg: "维拉·施密特的莫斯科幼儿园：老师教孩子「你借给他，他也会借给你」，最后小盒子与手推车按 2:1 换来换去，「人人都高兴」——社会身体就此建立。" },
  { id: "outlet", icon: "🔥", name: "出口阀门", concept: "outlet_valve",
    head: "圆周上开出通往「外部」的阀门，但付款总把溢出的能量收回来",
    text: "献祭、卖淫、精神分析：三种阀门让圈内不可交换的冲动有处可泄——祭火、一夜情、移情。但每一处都伴着付款：吠陀祭司的 daksina、嫖资、分析费。付款把那段可能一去不返的「享乐—死亡」时间买断，让人恢复成有机身体，回到交换的循环。",
    eg: "吠陀祭祀中，献祭者把身体逐块「交给」各位祭司，进入一段破碎、狂喜的时间；结束时付给祭司金子、衣物、马匹，才收回自己的身体。祭司酬金常比祭品还贵。" },
  { id: "merc", icon: "⚔️", name: "重商主义：白银之战", concept: "war_of_silver",
    head: "柯尔贝尔：把全欧洲的白银吸进王国，再在凡尔赛烧掉",
    text: "柯尔贝尔假定欧洲白银总量恒定，所以法国之得就是邻国之失。商贸公司「像军队」，工场是「后备军」，关税是城堡外墙。吸进来的金子并不主要用于再投资，而是在凡尔赛的宴会与排场中被挥霍。拖动滑块，看邻国被抽干、中心的火越烧越旺。",
    eg: "利奥塔把凡尔赛比作萨德《索多玛 120 天》里的城堡：国王与宫廷是闭门的浪荡主，法国农民与外国人是供养他们、被耗尽的「受害者身体」。" },
];

export default function ZeroDispositifs() {
  const [i, setI] = useState(0), [t, setT] = useState(35);
  const m = MODES[i];
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{MODES.map((x, j) =>
        <button key={x.id} className={i === j ? "on" : ""} onClick={() => setI(j)}>{x.icon} {x.name}</button>)}</div>
      <svg key={m.id} viewBox="0 0 640 440" style={{ width: "100%", maxHeight: 480, background: "var(--paper)", borderRadius: 14 }}>
        {m.id === "greek" && <Greek />}
        {m.id === "lydian" && <Lydian />}
        {m.id === "outlet" && <Outlet />}
        {m.id === "merc" && <Mercantile t={t} />}
      </svg>
      {m.id === "merc" && <label style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--muted)" }}>
        白银之战进程
        <input type="range" min="0" max="100" value={t} onChange={e => setT(+e.target.value)} style={{ flex: 1, accentColor: RED }} />
        <b style={{ color: "var(--ink)", minWidth: 40 }}>{t}%</b>
      </label>}
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}><C id={m.concept}>{m.name}</C> · <b>{m.head}</b></div>
        <p style={{ margin: "6px 0" }}>{m.text}</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>📖 书中一例：{m.eg}</p>
      </div>
    </div>);
}

// ---------- 托斯卡矩阵 ----------
// Rapoport 的囚徒困境式矩阵：(托斯卡收益, 斯卡皮亚收益)
const PAY = { gg: [5, 5], bg: [10, -10], gb: [-10, 10], bb: [-5, -5] };
const TX = { g: "守约（委身斯卡皮亚）", b: "背约（逃脱）" }, SX = { g: "守约（释放卡瓦拉多西）", b: "背约（照样枪决）" };
export function ToscaMatrix() {
  const [tc, setTc] = useState("g"), [sc, setSc] = useState("g"), [knife, setKnife] = useState(false);
  const [pt_, ps] = PAY[tc + sc];
  const cell = (a, b) => {
    const on = !knife && a === tc && b === sc, [x, y] = PAY[a + b];
    return <td key={b} onClick={() => { setTc(a); setSc(b); setKnife(false); }}
      style={{ padding: "10px 12px", textAlign: "center", cursor: "pointer", border: "1px solid var(--line)",
        background: on ? "var(--ink)" : "var(--paper)", color: on ? "var(--paper)" : "var(--ink)", opacity: knife ? .35 : 1 }}>
      <span style={{ color: on ? "#f3c9a0" : RED }}>托 {x > 0 ? "+" : ""}{x}</span> ／ <span style={{ color: on ? "#bcd0ea" : BLUE }}>斯 {y > 0 ? "+" : ""}{y}</span></td>;
  };
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14.5 }}>
          <thead><tr><th style={{ padding: 8 }} />{["g", "b"].map(b => <th key={b} style={{ padding: 8, color: BLUE, fontWeight: 600 }}>斯卡皮亚：{SX[b]}</th>)}</tr></thead>
          <tbody>{["g", "b"].map(a => <tr key={a}><th style={{ padding: 8, color: RED, fontWeight: 600, textAlign: "left" }}>托斯卡：{TX[a]}</th>{["g", "b"].map(b => cell(a, b))}</tr>)}</tbody>
        </table>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="btn" onClick={() => setKnife(!knife)} style={{ border: `1px solid ${RED}`, background: knife ? RED : "transparent", color: knife ? "#fff" : RED, borderRadius: 99, padding: "4px 14px", cursor: "pointer", font: "inherit", fontSize: 14 }}>
          🗡️ {knife ? "收回" : "托斯卡拿起刀（矩阵之外）"}</button>
      </div>
      {!knife ? <p style={{ margin: 0 }}>
        当前：托斯卡 <b style={{ color: RED }}>{pt_ > 0 ? "+" : ""}{pt_}</b>，斯卡皮亚 <b style={{ color: BLUE }}>{ps > 0 ? "+" : ""}{ps}</b>。
        {tc + sc === "gg" && "双方都守约，各得 +5：这就是「理性对话」承诺的极小极大——平分、不输不赢，好比象棋和局。"}
        {tc + sc === "bb" && "双双背叛，各得 −5：单独对任何一方讲道理，都劝不住他们骗对方，于是落入「双重背叛」的陷阱。"}
        {tc + sc === "bg" && "托斯卡骗过斯卡皮亚：+10 而不是 +15——利奥塔发现，矩阵把「逃过他的床」记作 0，价格随交易性质「浮动」，恰好让她犹豫。"}
        {tc + sc === "gb" && "斯卡皮亚得手又枪决情敌：他「算得对」——只要托斯卡不会想到杀他。"}
        <br /><span style={{ color: "var(--muted)", fontSize: 14 }}>Rapoport 的结论：只有一个同时对双方说话的中介——一个零、一个计算单位——才能救他们。利奥塔：这正是亚里士多德式的「审慎与民主」。</span>
      </p> : <KnifeNote />}
    </div>);
}
function KnifeNote() {
  return <div style={{ borderLeft: `4px solid ${RED}`, padding: "6px 14px", background: "rgba(155,44,31,.06)", borderRadius: 8 }}>
    <b>矩阵里没有这一格。</b> 歌剧里，被骗了两次的托斯卡杀了斯卡皮亚。利奥塔指出：这种不计后果的毁灭「不在矩阵里」，并且一般被排除在城邦伙伴的圈子之外。在零和的世界里，若必须有人去死，也得从中心之零的立场来定义——比如苏格拉底。强度不按收支表行事。
  </div>;
}
