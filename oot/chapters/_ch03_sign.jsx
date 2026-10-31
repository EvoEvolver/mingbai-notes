// 第 3 章专属图解 1：从 16 世纪「三元符号」到古典时代「二元符号 / 双重表征」的分步演示
import { StepThrough, C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", MUTED = "#7a6f62";

const Node = ({ x, y, w = 150, h = 54, title, sub, color = INK, dashed, fill = "#fffdf8", children }) => (
  <g>
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="12" fill={fill} stroke={color} strokeWidth="2.2"
      strokeDasharray={dashed ? "6 5" : undefined} />
    <text x={x} y={sub ? y - 4 : y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={color}>{title}</text>
    {sub && <text x={x} y={y + 15} textAnchor="middle" fontSize="12" fill={MUTED}>{sub}</text>}
    {children}
  </g>);

const Arrow = () => (
  <defs>
    <marker id="ar3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill={BLUE} />
    </marker>
  </defs>);

const fadeIn = (d = "0s") => <animate attributeName="opacity" from="0" to="1" dur=".8s" begin={d} fill="freeze" />;

// 第 0 步：三元
const Ternary = ({ broken }) => <>
  <ellipse cx="300" cy="135" rx="270" ry="118" fill="none" stroke={GOLD} strokeWidth="1.5" strokeDasharray="3 6" />
  <text x="300" y="30" textAnchor="middle" fontSize="12" fill={GOLD}>世界本身（符号就长在物上）</text>
  {!broken && <>
    <line x1="160" y1="85" x2="440" y2="85" stroke={INK} strokeWidth="2" opacity=".35" />
    <line x1="175" y1="105" x2="285" y2="185" stroke={RED} strokeWidth="3" />
    <line x1="425" y1="105" x2="315" y2="185" stroke={RED} strokeWidth="3" />
  </>}
  {broken && <>
    <line x1="160" y1="85" x2="440" y2="85" stroke={RED} strokeWidth="2" strokeDasharray="5 6" />
    <text x="300" y="80" textAnchor="middle" fontSize="22" fill={RED}>✕
      <animate attributeName="opacity" values="0;1;.4;1" dur="1.2s" fill="freeze" /></text>
    <text x="300" y="110" textAnchor="middle" fontSize="12" fill={RED}>书里的符号 ≠ 世界的物</text>
  </>}
  <Node x={160} y={85} title="记号" sub="核桃的外形 / 骑士小说" color={INK} />
  <Node x={440} y={85} title="被标记者" sub="大脑与疗效 / 城堡与巨人" color={INK} />
  <g>
    {broken && <animateTransform attributeName="transform" type="translate" from="0 0" to="0 22" dur="1.2s" fill="freeze" />}
    <g opacity={broken ? .35 : 1}>
      <Node x={300} y={205} w={170} title="相似" sub="第三项：把两者焊在一起" color={RED} dashed={broken} fill={broken ? "#f6efe5" : "#fbeee9"} />
    </g>
    {broken && <text x={395} y={250} fontSize="12" fill={RED}>→ 降为想象、错觉、疯狂
      <animate attributeName="opacity" from="0" to="1" dur=".6s" begin=".9s" fill="freeze" /></text>}
  </g>
</>;

// 第 2、3 步：二元（可选双重）
const Binary = ({ doubled }) => <>
  <Arrow />
  <rect x="30" y="20" width="540" height="225" rx="18" fill="none" stroke={BLUE} strokeWidth="1.5" strokeDasharray="3 6" />
  <text x="300" y="40" textAnchor="middle" fontSize="12" fill={BLUE}>表征 / 知识的内部（不再在物身上）</text>
  <g>{fadeIn()}
    <rect x="60" y="70" width="210" height={doubled ? 150 : 90} rx="14" fill="#eef2f7" stroke={BLUE} strokeWidth="2.4" />
    <text x="165" y="96" textAnchor="middle" fontSize="15" fontWeight="700" fill={BLUE}>表征者的观念</text>
    <text x="165" y="118" textAnchor="middle" fontSize="13" fill={INK}>🗺️ 一张地图</text>
    {doubled && <g>{fadeIn(".3s")}
      <rect x="78" y="134" width="174" height="72" rx="10" fill="#fffdf8" stroke={GOLD} strokeWidth="2" strokeDasharray="5 4" />
      <text x="165" y="158" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={GOLD}>＋「它正在表征」</text>
      <text x="165" y="176" textAnchor="middle" fontSize="12" fill={INK}>这一点也被表征了出来</text>
      <text x="165" y="194" textAnchor="middle" fontSize="11" fill={MUTED}>（我把它当地图看，而非一张纸）</text>
    </g>}
  </g>
  <g>{fadeIn(".2s")}
    <rect x="330" y="70" width="210" height="90" rx="14" fill="#fffdf8" stroke={INK} strokeWidth="2.2" />
    <text x="435" y="96" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK}>被表征者的观念</text>
    <text x="435" y="118" textAnchor="middle" fontSize="13" fill={INK}>🏞️ 那片土地</text>
  </g>
  <line x1="272" y1="112" x2="326" y2="112" stroke={BLUE} strokeWidth="3" markerEnd="url(#ar3)">
    <animate attributeName="stroke-dasharray" values="0 80;80 0" dur="1s" fill="freeze" />
  </line>
  <text x="299" y="102" textAnchor="middle" fontSize="12" fill={BLUE}>激起</text>
  {!doubled && <text x="300" y="200" textAnchor="middle" fontSize="13" fill={MUTED}>没有第三项：两个观念之间的纽带，是在知识里建立的。</text>}
  {doubled && <text x="435" y="200" textAnchor="middle" fontSize="12" fill={MUTED}>
    <tspan x="435">不是偷偷回到三元：</tspan><tspan x="435" dy="16">那个「关系」折回到表征者内部</tspan></text>}
</>;

// 第 4 步：符号与表征同延
const NET = [
  [90, 70, "具体知觉"], [250, 55, "抽象观念"], [420, 70, "一般观念"], [530, 140, "特殊观念"],
  [110, 180, "感觉 A"], [270, 160, "感觉 B"], [420, 205, "想象"], [175, 222, "知觉"],
];
const EDGES = [[1, 0, "Condillac"], [2, 3, "Berkeley"], [4, 5, "Berkeley"], [6, 5, "Hume"], [5, 7, ""], [0, 4, ""], [6, 3, ""], [1, 2, ""]];
const Network = () => <>
  <Arrow />
  {EDGES.map(([a, b, who], k) => {
    const [ax, ay] = NET[a], [bx, by] = NET[b], d = Math.hypot(bx - ax, by - ay);
    const x1 = ax + (bx - ax) * 31 / d, y1 = ay + (by - ay) * 31 / d, x2 = bx - (bx - ax) * 34 / d, y2 = by - (by - ay) * 34 / d;
    return <g key={k}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={BLUE} strokeWidth="2" opacity=".55" markerEnd="url(#ar3)">
        <animate attributeName="opacity" values="0;.7" dur=".5s" begin={`${k * .15}s`} fill="freeze" />
      </line>
      {who && <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} textAnchor="middle" fontSize="11" fill={GOLD} fontStyle="italic">{who}</text>}
    </g>;
  })}
  {NET.map(([x, y, t], k) => <g key={k}>
    <circle cx={x} cy={y} r="30" fill="#fffdf8" stroke={BLUE} strokeWidth="2" />
    <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fill={INK}>{t}</text>
  </g>)}
  <text x="300" y="273" textAnchor="middle" fontSize="13" fill={BLUE}>凡一个表征连着另一个、并在自身中表出这层连接，那里就有符号</text>
</>;

const STEPS = [
  { label: "16 世纪：三元", content: <p>文艺复兴的符号有<b>三项</b>：做标记的东西、被标记的东西，以及让人从前者看出后者的<b>相似</b>。核桃之所以是治头病的记号，是因为它「几乎就是」大脑。符号刻在物上，哪怕无人认出，它也照样在那里（见第 2 章 <C id="binary_sign">三元结构</C>）。</p> },
  { label: "相似退场", content: <p>17 世纪初，相似从知识的形式变成<b>错误的来源</b>。<C id="don_quixote">堂吉诃德</C>就站在这道裂缝上：他照骑士小说去找世界，可书里的符号再也不像真实的人与物。第三项被抽走，记号与所指之间失去了天然的焊点。</p> },
  { label: "古典：二元", content: <p>Port-Royal 的定义：符号包含<b>两个观念</b>——表征者的观念和被表征者的观念，前者用来激起后者。两者之间没有中介形象，纽带建立在<b>知识内部</b>。所以符号可以确定也可以或然，可以是自然的也可以是约定的，都不影响它是符号（<C id="sign_variables">三个变量</C>）。</p> },
  { label: "双重表征", content: <p>但光是「一个观念代替另一个」还不够：表征者还必须<b>把自己的表征关系也表现出来</b>。Port-Royal 的第一个例子不是词，而是<b>地图和图画</b>——我们把它当作「某地的图」来看，而不是一张纸。这看似多出第三项，其实只是二元结构向内折叠：<C id="duplicated_representation">双重表征</C>。</p> },
  { label: "符号 = 思想全域", content: <p>后果：符号不再是通往知识的钥匙，而是与<b>表征（即全部思想）同延</b>。抽象观念是具体知觉的符号，想象是知觉的符号，感觉彼此互为符号……古典哲学「从头到尾是一门符号哲学」，却恰恰因此没有独立的「意义理论」：符号与内容之间没有任何不透明的东西。</p> },
];

export default function SignShift() {
  return <StepThrough steps={STEPS} render={i =>
    <svg key={i} viewBox="0 0 600 280" style={{ width: "100%", maxHeight: 320, background: "var(--paper)", borderRadius: 14 }}>
      {i === 0 && <Ternary />}
      {i === 1 && <Ternary broken />}
      {i === 2 && <Binary />}
      {i === 3 && <Binary doubled />}
      {i === 4 && <Network />}
    </svg>} />;
}
