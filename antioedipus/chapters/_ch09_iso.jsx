// 第 9 章专属图解 C：精神分析 ≈ 政治经济学 —— 发现抽象本质，又把它重新锁回（分步）
import { StepThrough, C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#6b6257";

// 每一步：左列（社会生产 / 政治经济学）与右列（欲望生产 / 精神分析）各自的图标与标签
const STEPS = [
  {
    label: "表象时代",
    L: { icon: "🌍👑", tag: "劳动绑在土地、专制者身上" }, R: { icon: "🏛️🎭", tag: "欲望绑在大地之身、专制者之身" },
    flow: "bound",
    content: <p>在原始与专制社会，劳动和欲望都被「编码」在具体的客体上：劳动属于这块土地、这位君主；欲望被神话（对应大地）与悲剧（对应专制者）分配到特定对象、目标和禁令中。这是客观的、确定的大型<b>表象</b>。</p>,
  },
  {
    label: "发现抽象本质",
    L: { icon: "📐", tag: "李嘉图：劳动一般" }, R: { icon: "🛋️", tag: "弗洛伊德：力比多一般" },
    flow: "free",
    content: <p>18 世纪末–19 世纪初，<b>生产</b>冲破了表象（D&G 援引福柯《词与物》）。李嘉图发现量化劳动是一切价值的原则，创立政治经济学；弗洛伊德发现量化力比多是一切欲望对象与目标的原则，创立欲望经济学。两人都越过了特定对象，发现了<C id="abstract_essence">主体的抽象本质</C>——这与资本主义的解码、解域是同一个运动。</p>,
  },
  {
    label: "本是一体，被一分为二",
    L: { icon: "⚒️", tag: "抽象劳动" }, R: { icon: "💗", tag: "抽象欲望" },
    flow: "split",
    content: <p>劳动与欲望本是同一个东西：「生产一般」。二者的同一不是神话，而是资本主义必须一再压回去的极限、一种积极的乌托邦。资本主义却把这个共同本质一分为二并维持分裂：一边是政治经济学，一边是力比多经济学。</p>,
  },
  {
    label: "重新锁回私有",
    L: { icon: "🏦", tag: "私有财产" }, R: { icon: "🏠", tag: "私人化家庭" },
    flow: "locked",
    content: <p>马克思：主体的抽象本质被发现，只是为了被重新锁上——不再锁在外在客体上，而是锁在本身是主体性的<b>私有财产</b>里。对应地，抽象欲望被表象在<b>私人化的家庭</b>里。D&G 的公式：政治经济学是<b>公理</b>，精神分析是这套公理在家庭上的<b>应用技术</b>（见 <C id="reprivatization">再私人化</C>）。</p>,
  },
  {
    label: "工厂变剧场",
    L: { icon: "🧑‍💼👷", tag: "「资本家」「工人」的形象" }, R: { icon: "👨👩🧒", tag: "爸爸-妈妈-我：私人剧场" },
    flow: "stage",
    content: <p>旧的神话与悲剧被精神分析「拆掉」，又作为私人的梦与幻想被重新抬起：梦之于神话，正如私有财产之于公共财产。俄狄浦斯是被废黜、被解域的专制者，如今在每个普通人的「爸爸-妈妈-我」里被再领土化。无意识成了一座<C id="theater_unconscious">剧场</C>，生产只能以「匮乏」的形式出现。</p>,
  },
];

function Flow({ kind, x, color, cap }) {
  // 用几条曲线表示「流」的状态
  const ys = [118, 134, 150];
  if (kind === "bound") return <g>{ys.map((y, i) => <path key={i} d={`M${x - 40} ${y} q 20 -10 40 0 t 40 0`} fill="none" stroke={color} strokeWidth="3" opacity=".7" />)}
    <rect x={x - 50} y={106} width="100" height="56" rx="8" fill="none" stroke={MUTED} strokeDasharray="4 3" /></g>;
  if (kind === "free") return <g>{ys.map((y, i) => <path key={i} d={`M${x - 75} ${y} q 25 -14 50 0 t 50 0 t 50 0`} fill="none" stroke={color} strokeWidth="3" opacity=".85">
    <animate attributeName="stroke-dasharray" values="0 400;400 0" dur="2s" repeatCount="indefinite" /></path>)}</g>;
  if (kind === "split") return <g>{ys.map((y, i) => <path key={i} d={`M${x - 75} ${y} q 25 -14 50 0 t 50 0 t 50 0`} fill="none" stroke={color} strokeWidth="3" opacity=".85" />)}</g>;
  if (kind === "locked") return <g>{ys.map((y, i) => <path key={i} d={`M${x - 90} ${y} q 25 -14 50 0 t 40 ${i * 6 - 6}`} fill="none" stroke={color} strokeWidth="3" opacity=".7" />)}
    <rect x={x - 4} y={108} width="64" height="52" rx="8" fill={color} fillOpacity=".12" stroke={color} strokeWidth="2.5" />
    <text x={x + 28} y={142} textAnchor="middle" fontSize="20">🔒</text></g>;
  return <g>
    <rect x={x - 80} y={104} width="160" height="62" rx="6" fill="#3a2a1e" />
    <path d={`M${x - 80} 104 h160 v10 q -40 12 -80 0 q -40 12 -80 0 z`} fill={RED} />
    {[-40, 0, 40].map((dx, i) => <circle key={i} cx={x + dx} cy={146} r="8" fill={["#e8c48b", "#f2d3a8", "#d9b07a"][i]} />)}
    <text x={x} y={182} textAnchor="middle" fontSize="11" fill={MUTED}>{cap}</text>
  </g>;
}

export default function Isomorphism() {
  return <StepThrough steps={STEPS} render={i => {
    const s = STEPS[i];
    return <svg viewBox="0 0 640 230" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
      <text x="160" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill={BLUE}>社会生产 · 政治经济学</text>
      <text x="480" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill={RED}>欲望生产 · 精神分析</text>
      <line x1="320" y1="40" x2="320" y2="210" stroke={s.flow === "split" ? RED : MUTED} strokeWidth={s.flow === "split" ? 4 : 1} strokeDasharray={s.flow === "split" ? "0" : "4 5"} opacity={s.flow === "split" ? .8 : .5} />
      <text x="320" y="122" textAnchor="middle" fontSize="28" fill={INK} style={{ paintOrder: "stroke", stroke: "var(--paper)", strokeWidth: 8 }}>{s.flow === "split" ? "✂️" : "≈"}</text>
      {s.flow === "split" && <text x="320" y="214" textAnchor="middle" fontSize="11" fill={RED}>资本主义把「生产一般」劈成两半</text>}
      {[[160, BLUE, s.L], [480, RED, s.R]].map(([x, col, d]) => <g key={x}>
        <text x={x} y="72" textAnchor="middle" fontSize="28">{d.icon}</text>
        <text x={x} y="96" textAnchor="middle" fontSize="13" fill={INK}>{d.tag}</text>
        <Flow kind={s.flow} x={x} color={col} cap={x < 320 ? "人只作为资本的「形象」出场" : "同一出戏，永远三个角色"} />
      </g>)}
    </svg>;
  }} />;
}
