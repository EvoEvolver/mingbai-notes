// 第 3 章专属图解：同一份「收获」的两种读法（政治经济学之镜 vs 象征交换）
// SVG + SMIL：粒子沿路径流动；可切换视角、调节收成多少、点击节点看解释。
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#8a8070";

const LEVELS = ["平常年景", "丰收", "意外多出一笔（如外来物资）"];

// 沿 path 流动的小圆点；begin 用负值，让动画一开始就「已经在流」
function Dot({ path, dur = 2.6, begin = 0, color = GOLD, r = 5, fade = false }) {
  const b = `-${begin}s`;
  return <circle r={r} fill={color}>
    <animateMotion path={path} dur={`${dur}s`} begin={b} repeatCount="indefinite" />
    {fade && <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.65;1" dur={`${dur}s`} begin={b} repeatCount="indefinite" />}
  </circle>;
}
const Dots = ({ n, ...p }) => <>{Array.from({ length: n }, (_, i) => <Dot key={i} {...p} begin={(p.dur || 2.6) * i / n} />)}</>;

function Node({ x, y, w = 150, h = 54, title, sub, color, icon, on, onClick, crossed }) {
  return <g style={{ cursor: "pointer" }} onClick={onClick}>
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="12" fill="#fffdf8" stroke={color}
      strokeWidth={on ? 4 : 2} strokeDasharray={crossed ? "6 5" : undefined} opacity={crossed ? .6 : 1} />
    <text x={x} y={y - 4} textAnchor="middle" fontSize="15" fontWeight="700" fill={color} opacity={crossed ? .6 : 1}>{icon} {title}</text>
    <text x={x} y={y + 15} textAnchor="middle" fontSize="11.5" fill={MUTED}>{sub}</text>
    {crossed && <g stroke={RED} strokeWidth="4" strokeLinecap="round">
      <line x1={x - w / 2 + 10} y1={y - h / 2 + 6} x2={x + w / 2 - 10} y2={y + h / 2 - 6} />
      <line x1={x + w / 2 - 10} y1={y - h / 2 + 6} x2={x - w / 2 + 10} y2={y + h / 2 - 6} /></g>}
  </g>;
}

function Harvest({ on, onClick, level }) {
  return <g style={{ cursor: "pointer" }} onClick={onClick}>
    <circle cx="80" cy="170" r={42 + level * 5} fill="#f4e6c4" stroke={GOLD} strokeWidth={on ? 4 : 2} />
    <text x="80" y="170" textAnchor="middle" fontSize="30">🌾</text>
    <text x="80" y="194" textAnchor="middle" fontSize="14" fontWeight="700" fill={INK}>收获</text>
  </g>;
}

const NOTES = {
  eco: {
    _: "政治经济学（以及沿用其范畴的马克思主义人类学）这样读：收获先拿去满足「生存需要」，多出来的叫「剩余」。剩余可以储存、积累、再投入生产，于是生产力增长、历史前进。原始人「本可以」多生产却不生产，就成了一个要解释的谜。",
    harvest: "收获被当成「产品」：劳动这一生产要素投入、产出一定数量。一切从「产量」这个量出发。",
    need: "先划出一条「维持生存的最低限度」。鲍德里亚指出：这条线没有经济上的严格根据，来自道德哲学对「必需/多余」的区分和功能主义的「自我保存本能」。",
    surplus: "Godelier：原始社会几乎都「能」生产剩余却不生产，剩余「处于潜在状态」。鲍德里亚：这个概念对他们毫无意义，是人类学家先替他们造出剩余，再惊讶于他们对剩余的冷漠。",
    store: "剩余被积累和再投资：这是增长逻辑的关键一环。注意这里藏着一个后来被用来解释一切的发动机。",
    growth: "生产的真理是生产率——数量上的扩大再生产。以此为标尺，一个不增长的社会只能被看作「异常」或「拒绝生产」。",
    puzzle: "这个问题本身就是镜像造成的：只有先假定「他们在生产」，「为什么不多生产」才成其为问题。",
  },
  sym: {
    _: "鲍德里亚这样读：没有「先生存、后剩余」的经济次序。收获首先进入交换——献给神灵的初果、节庆中的挥霍、人与人之间的礼物循环。吃喝本身也是被交换的行为；功能性的使用只是从象征流通里抽出的残余，极端情况下残余为零。不存在可积累的剩余，被再生产的是关系。",
    harvest: "收成不是劳动的「等价物」。按鲍德里亚（引 Vernant），农人对收成的贡献更多在于周期性的仪式与节庆，而不在于付出的辛劳。",
    spirit: "取必有还：初果立即被献还，砍一棵树、犁一道沟都要先以回礼或献祭「安抚神灵」。从自然拿走的东西，总要还回去。",
    feast: "节庆把资源挥霍掉，甚至让人活到「最低限度」以下。Godelier 自己描述过 Siane 人：与白人接触后多出来的东西，被重新倒进节庆的交换里。多出来的越多，烧掉的越多。",
    ring: "礼物交换按「人与人之间的对抗性互惠」运作，而非物与物的等价。交换物被严格限量、常从远方按规矩引入：一旦放开生产，它们就会泛滥，打破脆弱的互惠。",
    store: "任何不能被交换、不能被象征性分享的东西都会打破互惠、造就权力。所以这里没有仓库，没有积累：交换本身建立在「非生产」与可能的毁弃之上。",
    rel: "最后被再生产出来的不是更多产品，而是群体与他人、与神灵、与自然之间的象征关系。",
  },
};

export default function HarvestTwoReadings() {
  const [mode, setMode] = useState("eco");
  const [level, setLevel] = useState(1);
  const [focus, setFocus] = useState("_");
  const pick = id => () => setFocus(focus === id ? "_" : id);
  const sw = m => { setMode(m); setFocus("_"); };
  const eco = mode === "eco";
  const note = NOTES[mode][focus] || NOTES[mode]._;

  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        <div className="seg" style={{ marginBottom: 0 }}>
          <button className={eco ? "on" : ""} onClick={() => sw("eco")}>📈 政治经济学之镜</button>
          <button className={!eco ? "on" : ""} onClick={() => sw("sym")}>🔥 象征交换</button>
        </div>
        <div className="seg" style={{ marginBottom: 0 }}>
          {LEVELS.map((l, i) => <button key={i} className={level === i ? "on" : ""} onClick={() => setLevel(i)}>{"🌾".repeat(i + 1)} {l}</button>)}
        </div>
      </div>

      <svg key={mode + level} viewBox="0 0 680 340" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        <defs>
          <marker id="ch03-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MUTED} /></marker>
        </defs>
        {eco ? <EcoScene level={level} focus={focus} pick={pick} /> : <SymScene level={level} focus={focus} pick={pick} />}
      </svg>

      <div style={{ borderLeft: `4px solid ${eco ? BLUE : RED}`, paddingLeft: 12 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 19, marginBottom: 4 }}>
          {eco ? <>读法一：<C id="potential_surplus">生存 + 剩余</C></> : <>读法二：<C id="symbolic_exchange">象征流通优先</C>，<C id="anti_production">反生产</C></>}
          {focus !== "_" && <span className="muted-it" style={{ fontSize: 14 }}> · 已选节点（再点一次取消）</span>}
        </div>
        <p style={{ margin: 0 }}>{note}</p>
        <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: 14 }}>
          {eco
            ? ["平常年景：剩余小，增长缓慢——「他们为什么不多生产？」", "丰收：剩余变大，被认为可以积累，增长曲线变陡。", "意外之财：在这面镜子里，多出的部分理应成为积累和发展的起点。"][level]
            : ["平常年景：收获照样先进入献祭、节庆与礼物环。", "丰收：多出来的部分没有进仓库，而是让节庆的火烧得更旺。", "意外之财：像 Siane 人那样，把外来的多余之物倒回节庆交换——什么也不剩下。"][level]}
          {"　"}点击图中节点看解释。
        </p>
      </div>
    </div>);
}

function EcoScene({ level, focus, pick }) {
  const P = {
    need: "M122,186 C180,240 200,256 222,256",
    surplus: "M122,152 C180,100 200,86 222,86",
    store: "M378,86 L428,86",
    growth: "M560,112 C575,140 585,160 590,180",
  };
  const top = 290 - (level + 1) * 32;
  return <>
    {Object.values(P).map((d, i) => <path key={i} d={d} fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="4 5" markerEnd="url(#ch03-arr)" />)}
    <Dots n={4} path={P.need} color={BLUE} dur={2.4} />
    <Dots n={1 + level * 2} path={P.surplus} color={GOLD} dur={2.4} />
    <Dots n={1 + level} path={P.store} color={GOLD} dur={1.4} />
    <Dots n={1 + level} path={P.growth} color={GOLD} dur={1.6} />

    <Harvest on={focus === "harvest"} onClick={pick("harvest")} level={level} />
    <Node x={300} y={256} title="生存需要" sub="先被满足的「最低限度」" icon="🍚" color={BLUE} on={focus === "need"} onClick={pick("need")} />
    <Node x={300} y={86} w={150 + level * 14} title={"剩余" + " +".repeat(level + 1)} sub="满足需要后「多出来的」" icon="➕" color={GOLD} on={focus === "surplus"} onClick={pick("surplus")} />
    <Node x={505} y={86} title="积累 · 再投资" sub="储存起来、投入再生产" icon="🏚️" color={GOLD} on={focus === "store"} onClick={pick("store")} />

    <g style={{ cursor: "pointer" }} onClick={pick("growth")}>
      <rect x="455" y="185" width="200" height="130" rx="10" fill="#fffdf8" stroke={focus === "growth" ? GREEN : "transparent"} strokeWidth="3" />
      <line x1="475" y1="300" x2="645" y2="300" stroke={INK} strokeWidth="1.5" />
      <line x1="475" y1="300" x2="475" y2="200" stroke={INK} strokeWidth="1.5" />
      <path d={`M475,295 C540,293 590,${top + 30} 640,${top}`} fill="none" stroke={GREEN} strokeWidth="4" strokeDasharray="260" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" values="260;0;0" keyTimes="0;0.7;1" dur="3s" repeatCount="indefinite" />
      </path>
      <text x="560" y="214" textAnchor="middle" fontSize="12.5" fill={GREEN} fontWeight="700">生产力增长 = 历史的发动机</text>
      <text x="645" y="315" textAnchor="end" fontSize="11" fill={MUTED}>时间 →</text>
    </g>

    <g style={{ cursor: "pointer" }} onClick={pick("puzzle")}>
      <rect x="20" y="16" width="250" height="34" rx="17" fill={focus === "puzzle" ? "#f7e3df" : "#fffdf8"} stroke={RED} strokeWidth="1.5" />
      <text x="145" y="38" textAnchor="middle" fontSize="13" fill={RED}>❓ 他们「本可以」生产剩余，为何不？</text>
    </g>
  </>;
}

function SymScene({ level, focus, pick }) {
  const P = {
    spirit: "M110,138 C140,70 180,50 212,50",
    back: "M212,40 C170,8 90,40 72,124",
    feast: "M124,172 L205,172",
    ring: "M120,152 C200,110 330,108 438,150",
    store: "M112,200 C150,270 190,284 212,284",
  };
  const cx = 540, cy = 180, R = 82;
  const orbit = `M ${cx} ${cy - R} A ${R} ${R} 0 1 1 ${cx - 0.01} ${cy - R} Z`;
  const ppl = [[cx, cy - R], [cx + R, cy], [cx, cy + R], [cx - R, cy]];
  const s = 1 + level * 0.25;
  return <>
    {[P.spirit, P.feast, P.ring].map((d, i) => <path key={i} d={d} fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="4 5" markerEnd="url(#ch03-arr)" />)}
    <path d={P.back} fill="none" stroke={GREEN} strokeWidth="2" strokeDasharray="4 5" markerEnd="url(#ch03-arr)" />
    <text x="120" y="22" fontSize="12" fill={GREEN}>取必有还 ↺</text>
    <path d={P.store} fill="none" stroke={MUTED} strokeWidth="1.5" strokeDasharray="2 6" opacity=".5" />

    <Dots n={2} path={P.spirit} color={GOLD} dur={2.6} />
    <Dots n={2} path={P.back} color={GREEN} dur={2.6} />
    <Dots n={2 + level * 2} path={P.feast} color={RED} dur={2} fade />
    <Dots n={3} path={P.ring} color={GOLD} dur={2.8} />

    <Harvest on={focus === "harvest"} onClick={pick("harvest")} level={level} />
    <Node x={285} y={50} w={146} title="初果 · 献祭" sub="还给神灵与自然" icon="🕯️" color={GREEN} on={focus === "spirit"} onClick={pick("spirit")} />

    <g style={{ cursor: "pointer" }} onClick={pick("feast")}>
      <rect x="205" y="140" width="160" height="64" rx="12" fill="#fffdf8" stroke={RED} strokeWidth={focus === "feast" ? 4 : 2} />
      <g transform={`translate(240,178) scale(${s})`}>
        {[[-9, 0, "#e0662f"], [0, -4, RED], [9, 0, "#e9a23b"]].map(([dx, dy, c], i) =>
          <ellipse key={i} cx={dx} cy={dy} rx="6" ry="12" fill={c} opacity=".9">
            <animate attributeName="ry" values="12;16;10;12" dur={`${0.9 + i * 0.2}s`} repeatCount="indefinite" />
          </ellipse>)}
      </g>
      <text x="318" y="170" textAnchor="middle" fontSize="15" fontWeight="700" fill={RED}>节庆</text>
      <text x="318" y="189" textAnchor="middle" fontSize="11.5" fill={MUTED}>耗费 · 烧掉</text>
    </g>

    <Node x={285} y={284} w={140} title="仓库 / 积累" sub="不存在" icon="🏚️" color={MUTED} crossed on={focus === "store"} onClick={pick("store")} />

    <g style={{ cursor: "pointer" }} onClick={pick("ring")}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={GOLD} strokeWidth={focus === "ring" ? 4 : 2.5} />
      <Dots n={6} path={orbit} color={GOLD} dur={6} r={4.5} />
      {ppl.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="17" fill="#fffdf8" stroke={GOLD} strokeWidth="2" />
        <text x={x} y={y + 7} textAnchor="middle" fontSize="19">{["🧑", "👩", "🧔", "👵"][i]}</text></g>)}
      <text x={cx} y={cy - 98 - 10} textAnchor="middle" fontSize="13" fontWeight="700" fill={GOLD}>礼物环 · 对抗性互惠</text>
    </g>
    <g style={{ cursor: "pointer" }} onClick={pick("rel")}>
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>再生产的是</text>
      <text x={cx} y={cy + 15} textAnchor="middle" fontSize="13" fontWeight="700" fill={focus === "rel" ? RED : INK}>关系，不是产量</text>
    </g>
  </>;
}
