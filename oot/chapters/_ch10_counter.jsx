// 第 10 章专属图解 ③：反科学 —— 精神分析、民族学、语言学如何「消解人」（分步 SVG）
import { StepThrough, C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16";
const CX = 190, CY = 165; // 两条线的交点 / 「人」的位置

function Scene(i) {
  const show = k => i >= k;
  const faceOp = i >= 5 ? 0.12 : 1;
  return <svg viewBox="0 0 500 330" style={{ width: "100%", maxHeight: 400, background: "var(--paper)", borderRadius: 14 }}>
    <defs>
      <marker id="ar10c" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10z" fill="context-stroke" /></marker>
      <marker id="ar10cR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10z" fill={RED} /></marker>
      <marker id="ar10cG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10z" fill={GREEN} /></marker>
      <marker id="ar10cK" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10z" fill={INK} /></marker>
      <linearGradient id="fin10" x1="0" x2="1"><stop offset="0" stopColor={VIOLET} stopOpacity=".05" /><stop offset="1" stopColor={VIOLET} stopOpacity=".22" /></linearGradient>
    </defs>

    {/* 表征的空间 */}
    <rect x="30" y="55" width="290" height="215" rx="16" fill="#fff" stroke={INK} strokeOpacity=".25" />
    <text x="44" y="76" fontSize="12" fill="var(--muted)">表征的空间：人文科学在这里工作</text>
    {/* 有限性一侧 */}
    <rect x="320" y="55" width="160" height="215" fill="url(#fin10)" />
    <line x1="320" y1="50" x2="320" y2="275" stroke={VIOLET} strokeWidth="2" strokeDasharray="6 5" />
    <text x="400" y="76" textAnchor="middle" fontSize="12" fill={VIOLET}>有限性（表征之外）</text>
    {/* 实证性一侧（底部） */}
    <text x="175" y="300" textAnchor="middle" fontSize="12" fill={GREEN}>实证性：生命 · 劳动 · 语言</text>
    <line x1="30" y1="285" x2="320" y2="285" stroke={GREEN} strokeWidth="2" strokeDasharray="6 5" opacity=".7" />

    {/* 「人」 */}
    <g opacity={faceOp} style={{ transition: "opacity 1.6s" }}>
      <circle cx={CX - 70} cy={CY - 45} r="22" fill="none" stroke={GOLD} strokeWidth="2.5" />
      <circle cx={CX - 78} cy={CY - 49} r="2.4" fill={GOLD} /><circle cx={CX - 62} cy={CY - 49} r="2.4" fill={GOLD} />
      <path d={`M${CX - 80},${CY - 38} Q${CX - 70},${CY - 30} ${CX - 60},${CY - 38}`} fill="none" stroke={GOLD} strokeWidth="2" />
      <text x={CX - 70} y={CY - 12} textAnchor="middle" fontSize="12" fill={GOLD}>「人」</text>
    </g>

    {/* ① 人文科学：倒退着走向无意识 */}
    <g opacity={i === 0 ? 1 : .3} style={{ transition: ".4s" }}>
      <line x1="60" y1="225" x2="300" y2="225" stroke={INK} strokeWidth="2.5" markerEnd="url(#ar10cK)" />
      <text x="62" y="248" fontSize="12" fill={INK}>意识 ─── 人文科学背对着靠近 ──→ 无意识</text>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;170,0;0,0" dur="6s" repeatCount="indefinite" />
        <text x="80" y="217" fontSize="20">🚶</text>
      </g>
    </g>

    {/* ② 精神分析：正面迎向，越过表征 */}
    {show(1) && <g>
      <line x1="60" y1={CY} x2="455" y2={CY} stroke={RED} strokeWidth={i === 1 ? 4 : 3} markerEnd="url(#ar10cR)" strokeDasharray="10 6">
        <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite" /></line>
      <text x="222" y={CY - 8} fontSize="13" fontWeight="700" fill={RED}>精神分析</text>
      {["死亡 Death", "欲望 Desire", "法则 Law"].map((t, k) =>
        <g key={k}>
          <rect x="350" y={100 + k * 55 - (k === 1 ? 0 : 0)} width="110" height="28" rx="14" fill="#fff" stroke={VIOLET} strokeWidth="1.5" />
          <text x="405" y={119 + k * 55} textAnchor="middle" fontSize="13" fill={VIOLET}>{t}
            {i === 1 && <animate attributeName="opacity" values=".3;1;.3" dur="2s" begin={`${k * .4}s`} repeatCount="indefinite" />}</text>
        </g>)}
    </g>}

    {/* ③ 民族学：历史性维度（纵向） */}
    {show(2) && <g>
      <line x1={CX} y1="22" x2={CX} y2="282" stroke={GREEN} strokeWidth={i === 2 ? 4 : 3} markerEnd="url(#ar10cG)" strokeDasharray="10 6">
        <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite" /></line>
      <text x={CX + 8} y="36" fontSize="12" fill={GREEN}>西方理性（ratio）的历史位置</text>
      <text x={CX + 8} y="268" fontSize="12" fontWeight="700" fill={GREEN}>民族学 → 规范·规则·系统</text>
    </g>}

    {/* ④ 直角相交 */}
    {show(3) && <g>
      <path d={`M${CX + 14},${CY} L${CX + 14},${CY - 14} L${CX},${CY - 14}`} fill="none" stroke={INK} strokeWidth="2" />
      <circle cx={CX} cy={CY} r="6" fill={GOLD}>
        <animate attributeName="r" values="5;9;5" dur="1.6s" repeatCount="indefinite" /></circle>
      {i === 3 && <>
        <text x="206" y="186" fontSize="11" fill={RED}>横：个体经验的能指链</text>
        <text x="200" y="120" fontSize="11" fill={GREEN}>纵：文化的形式系统</text>
      </>}
    </g>}

    {/* ⑤ 语言学：两侧溢出 */}
    {show(4) && <g>
      <ellipse cx="245" cy={CY + 10} rx="225" ry="138" fill="none" stroke={BLUE} strokeWidth={i === 4 ? 3.5 : 2.5} strokeDasharray="3 6">
        <animate attributeName="stroke-dashoffset" values="0;36" dur="2s" repeatCount="indefinite" /></ellipse>
      <text x="470" y="318" textAnchor="end" fontSize="13" fontWeight="700" fill={BLUE}>语言学：同时溢出实证性与有限性两侧</text>
    </g>}

    {/* ⑥ 倒着纺：线被收回线轴 */}
    {show(5) && <g>
      {[0, 1, 2].map(k => <path key={k} d={`M${CX - 70},${CY - 45} m-${30 + k * 14},0 a${30 + k * 14},${30 + k * 14} 0 1,0 ${60 + k * 28},0`} fill="none" stroke={GOLD} strokeWidth="1.5" opacity=".6">
        <animateTransform attributeName="transform" type="rotate" from={`0 ${CX - 70} ${CY - 45}`} to={`-360 ${CX - 70} ${CY - 45}`} dur={`${3 + k}s`} repeatCount="indefinite" /></path>)}
      <text x={CX - 70} y="44" textAnchor="middle" fontSize="13" fontWeight="700" fill={GOLD}>人被倒着纺回出生地</text>
    </g>}
  </svg>;
}

const steps = [
  { label: "人文科学", content: <p>人文科学都在<b>表征的空间</b>里工作。它们也走向无意识，但像是<b>背对着</b>它倒退过去：一边分析意识，一边等无意识自己慢慢显露。它们一直在建构一个叫「人」的对象。见 <C id="representation_unconscious">表征与无意识</C>。</p> },
  { label: "精神分析", content: <p><C id="psychoanalysis">精神分析</C>转过身来，<b>正对着</b>无意识。它越过表征、在有限性一侧溢出，碰到的不是又一层功能、冲突、意义，而是让它们得以可能的三种形象：<b>死亡、欲望、法则（作为法则的语言）</b>。它因此只能是一种两人之间的实践，成不了「关于人的一般理论」。</p> },
  { label: "民族学", content: <p><C id="ethnology">民族学</C>处在<b>历史性</b>的维度：它扎根于西方理性与其他一切文化面对面的独特历史位置。它不把内容拉回认识主体的历史（那是历史主义），而是看各文化怎样规范生物功能、订立交换规则、组织符号系统，再追问这个文化能有什么样的历史。</p> },
  { label: "直角相交", content: <p>两门学科不是在「个人与社会」的层面接上，而是像两条<b>直角相交</b>的线：个体经验的能指链，垂直于一个文化的形式系统。每一刻，个体结构都在社会体系里找到若干可能的选择（并排除其他）；就像语言的线性结构在每一刻都要在几个词之间选一个。</p> },
  { label: "语言学", content: <p>于是浮现出一种纯粹的语言理论，作为两者共同的形式模型。语言学成为<b>第三门反科学</b>：它研究人之外的纯粹语言（实证性一侧），却又碰到有限性的问题（思想只能在语言中思考），在两侧同时溢出整个人文科学的场域。</p> },
  { label: "消解人", content: <p>这三门 <C id="counter_sciences">反科学</C> 都不通往一个普遍的「人」，反而把人拆回到使他得以出现的条件。福柯的比喻：人的命运在我们眼前被纺织，却是<b>倒着纺</b>，被线轴领回它诞生的故乡。这难道不正是让人走向终结的一种方式？见 <C id="death_of_man">人之死</C>。</p> },
];

export default function CounterSciences() {
  return <StepThrough steps={steps} render={Scene} />;
}
