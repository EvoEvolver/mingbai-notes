// 第 9 章专属图解 2：有限性分析——生命/劳动/语言的限制如何翻转为人的根基（分步讲解）
import { StepThrough, C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", MUTED = "#6b6257", GREEN = "#3c6b4a", VIOLET = "#5b3f7a";
const POS = [
  { x: 100, l: "生命", icon: "🧬", c: GREEN, down: "早于我", mark: "我会死", up: "身体" },
  { x: 300, l: "劳动", icon: "⚙️", c: GOLD, down: "支配我", mark: "我有需要", up: "欲望" },
  { x: 500, l: "语言", icon: "📜", c: BLUE, down: "比我古老", mark: "我说旧词", up: "言说的时间" },
];

const Defs = () => <defs>
  {[["a9f", INK], ["a9r", RED], ["a9v", VIOLET]].map(([id, c]) =>
    <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill={c} /></marker>)}
</defs>;

const Box = ({ p, y }) => <g>
  <rect x={p.x - 70} y={y} width="140" height="48" rx="10" fill="#fff" stroke={p.c} strokeWidth="2.5" />
  <text x={p.x} y={y + 31} textAnchor="middle" fontSize="18" fill={p.c} fontWeight="700">{p.icon} {p.l}</text>
</g>;

const Man = ({ y = 205, label = "人" }) => <g>
  <circle cx="300" cy={y} r="28" fill={RED} />
  <text x="300" y={y + 7} textAnchor="middle" fontSize="20" fill="#fff" fontWeight="700">{label}</text>
</g>;

function Stage({ i }) {
  const W = { width: "100%", maxWidth: 640, background: "var(--paper)", borderRadius: 14 };
  if (i <= 1) return <svg viewBox="0 0 600 270" style={W}><Defs />
    {POS.map(p => <g key={p.l}><Box p={p} y={22} />
      <path d={`M${p.x} 72 L${300 + (p.x - 300) * .14} 172`} stroke={p.c} strokeWidth="3" fill="none" markerEnd="url(#a9f)" strokeDasharray="7 5">
        <animate attributeName="stroke-dashoffset" values="24;0" dur="1s" repeatCount="indefinite" /></path>
      <text x={(p.x + 300) / 2 + (p.x < 300 ? -62 : p.x > 300 ? 62 : 36)} y="128" textAnchor="middle" fontSize="13" fill={INK}>{p.down}</text>
    </g>)}
    <Man />
    {i === 1 && <g>
      <circle cx="300" cy="205" r="52" fill="none" stroke={MUTED} strokeDasharray="3 4" />
      {POS.map((p, k) => <text key={k} x={[190, 300, 410][k]} y={[232, 266, 232][k]} textAnchor="middle" fontSize="13" fill={p.c} fontWeight="700">{p.mark}</text>)}
      <text x="300" y="150" textAnchor="middle" fontSize="11" fill={MUTED}>有限性：像水印一样透出来</text>
    </g>}
  </svg>;

  if (i === 2) return <svg viewBox="0 0 600 270" style={W}><Defs />
    {POS.map(p => <g key={p.l}><Box p={p} y={22} />
      <line x1={p.x} y1="200" x2={p.x} y2="76" stroke={RED} strokeWidth="3.5" markerEnd="url(#a9r)">
        <animate attributeName="y2" values="200;76" dur="1.4s" fill="freeze" /></line>
      <rect x={p.x - 56} y="122" width="112" height="26" rx="13" fill="#f3e0da" stroke={RED} strokeWidth="1" />
      <text x={p.x} y="140" textAnchor="middle" fontSize="14" fill={RED} fontWeight="700">{p.up}</text>
    </g>)}
    <rect x="40" y="200" width="520" height="44" rx="12" fill={RED} />
    <text x="300" y="228" textAnchor="middle" fontSize="16" fill="#fff" fontWeight="700">根本有限性（人的存在）：只建立在它自身之上</text>
    <text x="300" y="262" textAnchor="middle" fontSize="11" fill={MUTED}>上面的箭头从「压下来」变成「托上去」</text>
  </svg>;

  if (i === 3) return <svg viewBox="0 0 600 270" style={W}><Defs />
    <line x1="300" y1="14" x2="300" y2="256" stroke="var(--line)" />
    <text x="150" y="26" textAnchor="middle" fontSize="13" fill={MUTED} fontWeight="700">17–18 世纪</text>
    <text x="450" y="26" textAnchor="middle" fontSize="13" fill={MUTED} fontWeight="700">19 世纪以后</text>
    <text x="150" y="80" textAnchor="middle" fontSize="44" fill={VIOLET}>∞</text>
    <text x="150" y="102" textAnchor="middle" fontSize="12" fill={VIOLET}>无限（上帝、创造、堕落）</text>
    <line x1="150" y1="112" x2="150" y2="178" stroke={VIOLET} strokeWidth="3" markerEnd="url(#a9v)" />
    <rect x="70" y="184" width="160" height="40" rx="10" fill="#fff" stroke={INK} />
    <text x="150" y="209" textAnchor="middle" fontSize="13" fill={INK}>有限＝「不够无限」</text>
    <text x="150" y="246" textAnchor="middle" fontSize="11" fill={MUTED}>单向，从外部定义</text>
    <rect x="360" y="60" width="180" height="40" rx="10" fill="#fff" stroke={GREEN} strokeWidth="2" />
    <text x="450" y="85" textAnchor="middle" fontSize="13" fill={GREEN}>生命·劳动·语言的实证性</text>
    <rect x="360" y="184" width="180" height="40" rx="10" fill="#fff" stroke={RED} strokeWidth="2" />
    <text x="450" y="209" textAnchor="middle" fontSize="13" fill={RED}>认识的有限形式</text>
    <path d="M520 104 Q560 142 520 180" stroke={RED} strokeWidth="2.5" fill="none" markerEnd="url(#a9r)" />
    <path d="M380 180 Q340 142 380 104" stroke={GREEN} strokeWidth="2.5" fill="none" markerEnd="url(#a9f)" />
    <circle r="5" fill={RED}><animateMotion dur="3s" repeatCount="indefinite" path="M520 104 Q560 142 520 180 L380 180 Q340 142 380 104 Z" /></circle>
    <text x="450" y="147" textAnchor="middle" fontSize="12" fill={INK}>互为根据，无限退场</text>
    <text x="450" y="246" textAnchor="middle" fontSize="11" fill={MUTED}>双重参照：有限只回指有限</text>
  </svg>;

  const corners = [
    { x: 300, y: 34, t: "实证性 ⇄ 有限性", s: "III", c: RED, id: "analytic_of_finitude" },
    { x: 498, y: 135, t: "经验 ⇄ 先验", s: "IV", c: GOLD, id: "empirico_transcendental" },
    { x: 300, y: 238, t: "我思 ⇄ 非思", s: "V", c: BLUE, id: "modern_cogito" },
    { x: 102, y: 135, t: "起源：退隐 ⇄ 回归", s: "VI", c: GREEN, id: "retreat_return_origin" },
  ];
  return <svg viewBox="0 0 600 270" style={W}>
    <polygon points={corners.map(c => `${c.x},${c.y}`).join(" ")} fill={RED} fillOpacity=".06" stroke={INK} strokeWidth="1.5" strokeDasharray="5 4">
      <animate attributeName="stroke-dashoffset" values="0;-18" dur="1.5s" repeatCount="indefinite" /></polygon>
    <text x="300" y="132" textAnchor="middle" fontSize="16" fill={INK} fontWeight="700">人的存在方式</text>
    <text x="300" y="152" textAnchor="middle" fontSize="11" fill={MUTED}>「人类学四边形」</text>
    {corners.map(c => <g key={c.s}>
      <rect x={c.x - 82} y={c.y - 18} width="164" height="36" rx="18" fill="#fff" stroke={c.c} strokeWidth="2.5" />
      <text x={c.x} y={c.y + 5} textAnchor="middle" fontSize="13" fill={c.c} fontWeight="700">{c.s} · {c.t}</text>
    </g>)}
  </svg>;
}

const steps = [
  {
    label: "被规定", content: <p>19 世纪，生物学、经济学、语文学让生命、劳动、语言有了自己的规律和历史。表征不再是它们的源头，而只是它们在意识里的模糊倒影。人被夹在中间：生命早于他出生，劳动的规律像外来系统一样压在他身上，他说的词比他古老得多。<b>只能通过他的词、他的机体、他造的东西去接近他</b>——仿佛真理先在它们那里。</p>,
  },
  {
    label: "有限性显现", content: <p>于是知识「宣告」了人的有限：我们知道人有限，就像知道大脑的解剖结构、生产成本的机制、印欧语的变位系统一样。有限性像一道<b>水印</b>，透在这些实实在在的知识背面。但福柯提醒：这第一次发现还不稳——也许物种还会进化、劳动终将不再异化、纯粹的符号系统能消除语言的不透明？有限看起来像一场「也许没有尽头」的旅程。</p>,
  },
  {
    label: "翻转", content: <p>决定性的一步：这些实证内容之所以能出现在知识的光里，<b>恰恰因为人有限</b>。若人困在动物生命那种无声的直接性里，他看不见它们；若人有无限理智，能一眼看穿，它们也不会作为「对象」浮现。生命的存在方式由<b>我的身体</b>给出，生产的分量由<b>我的欲望</b>给出，语言的历史由<b>我说话的时间</b>给出。于是，<C id="analytic_of_finitude">有限性分析</C>把限制翻转成了根基——一种「只建立在自身事实之上」的根本有限性。经验层的死亡和根基层的死亡是同一个死亡：这就是贯穿全章的「重复」。</p>,
  },
  {
    label: "古典 vs 现代", content: <p>古典时代也谈有限，但那是相对于<b>无限</b>定义的：人要流汗劳作、用不透明的词思考，是因为他不是上帝。现代则是<C id="finitude_self_reference">有限性的自我参照</C>：认识有限，因为人困在生命、劳动、语言里；生命、劳动、语言能被认识，又因为认识有有限的形式。两边互为根据，「无限的形而上学」变得多余——这就是常说的「形而上学的终结」，福柯说它只是「人的出现」的负面。</p>,
  },
  {
    label: "四边形", content: <p>这种「实证的东西在根基中重复自身」的结构，接下来会展开成三对<b>复本</b>：先验重复经验，我思重复非思，起源的回归重复它的退隐。连同有限性分析本身，它们围成福柯所说的人类学<b>四边形</b>，定义了现代「人」的存在方式。下一个图解，逐对翻看这三枚硬币。</p>,
  },
];

export default function FinitudeFlip() {
  return <StepThrough steps={steps} render={i => <Stage key={i} i={i} />} />;
}
