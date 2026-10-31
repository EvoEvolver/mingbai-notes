// 第 1 章专属图解：使用价值不是价值之外的「自然」，而是交换价值的影子；
// 真正的断裂不在抽象/具体之间，而在整个价值领域与象征交换之间。
import { StepThrough, C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#6b6257";
const T = { transition: "opacity .6s, fill .6s, stroke .6s, stroke-width .6s" };
const show = (on, lo = 0) => ({ ...T, opacity: on ? 1 : lo });

function Diagram({ i }) {
  const uvNatural = i < 2;
  const SYM = [["礼物", 0], ["回赠 / 挑战", 90], ["耗费", 180], ["献祭", 270]];
  return (
    <svg viewBox="0 0 760 380" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
      <defs>
        <marker id="ch01-ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={VIOLET} />
        </marker>
      </defs>

      {/* 外层：价值领域 */}
      <rect x="30" y="40" width="470" height="300" rx="18" fill={i >= 3 ? "rgba(155,44,31,.05)" : "none"}
        stroke={i >= 3 ? RED : MUTED} strokeWidth={i >= 3 ? 4 : 1} strokeDasharray={i >= 3 ? "0" : "5 6"} style={show(true)} />
      <text x="46" y="62" fontSize="14" fill={RED} fontWeight="700" style={show(i >= 3)}>价值领域 = 政治经济学（两面都在里面）</text>

      {/* 代码 / 劳动力：分叉 */}
      <g style={show(i >= 1)}>
        <path d="M265,92 L150,120 M265,92 L380,120" stroke={INK} strokeWidth="2.5" fill="none" />
        <rect x="200" y="70" width="130" height="28" rx="14" fill={INK} />
        <text x="265" y="89" textAnchor="middle" fontSize="13" fill="#fff">劳动力 · 同一套代码</text>
      </g>

      {/* 左：交换价值 */}
      <rect x="50" y="120" width="200" height="190" rx="12" fill="rgba(184,134,43,.18)" stroke={GOLD} strokeWidth="2" />
      <text x="150" y="150" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK}>交换价值</text>
      <text x="150" y="182" textAnchor="middle" fontSize="13" fill={INK}>抽象劳动</text>
      <text x="150" y="204" textAnchor="middle" fontSize="13" fill={INK}>量 · 可通约 · 时间</text>
      <text x="150" y="226" textAnchor="middle" fontSize="13" fill={INK}>异化 · 剥削</text>

      {/* 右：使用价值 */}
      <rect x="280" y="120" width="200" height="190" rx="12"
        fill={uvNatural ? "rgba(60,107,74,.18)" : "rgba(184,134,43,.18)"} stroke={uvNatural ? GREEN : GOLD} strokeWidth="2" style={T} />
      <text x="380" y="150" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK}>使用价值</text>
      <text x="380" y="182" textAnchor="middle" fontSize="13" fill={INK}>具体劳动</text>
      <text x="380" y="204" textAnchor="middle" fontSize="13" fill={INK}>质 · 不可通约 · 有用</text>
      <text x="380" y="226" textAnchor="middle" fontSize="13" fill={GREEN} style={show(uvNatural)}>自然 · 真实 · 人的目的</text>
      <text x="380" y="226" textAnchor="middle" fontSize="13" fill={RED} fontWeight="700" style={show(!uvNatural)}>交换价值的「不在场证明」</text>
      <text x="380" y="250" textAnchor="middle" fontSize="12" fill={MUTED} style={show(i === 0)}>（被当作价值之外的避难所）</text>

      {/* 镜像投射 */}
      <g style={show(i === 2)}>
        <text x="380" y="276" textAnchor="middle" fontSize="22">🪞</text>
        <circle cx="150" cy="268" r="7" fill={GOLD}>
          <animate attributeName="cx" values="150;370;150" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;.2;1" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <text x="380" y="300" textAnchor="middle" fontSize="11" fill={GOLD}>交换价值投射出的「参照物」</text>
      </g>

      {/* 马克思的分界线 */}
      <line x1="265" y1="108" x2="265" y2="318" stroke={RED} strokeWidth="3" strokeDasharray="8 6"
        style={{ ...T, opacity: i >= 3 ? .25 : i >= 1 ? .6 : 1 }} />
      <text x="265" y="333" textAnchor="middle" fontSize="12" fill={RED} style={{ ...T, opacity: i >= 3 ? .4 : 1 }}>
        {i >= 3 ? "马克思的分界线（只是内部划分）" : "马克思的分界线：革命押在这里"}</text>

      {/* 外面是什么？ */}
      <text x="630" y="200" textAnchor="middle" fontSize="40" fill={MUTED} style={show(i === 3, 0)}>?</text>
      <text x="630" y="232" textAnchor="middle" fontSize="12" fill={MUTED} style={show(i === 3, 0)}>马克思没有看向这里</text>
      <text x="630" y="200" textAnchor="middle" fontSize="13" fill={MUTED} style={show(i < 3, 0)}>（价值之外？）</text>

      {/* 真正的断裂 + 象征交换 */}
      <g style={show(i >= 4)}>
        <path d="M515,40 L525,80 L507,120 L525,160 L507,200 L525,240 L507,280 L520,340" stroke={RED} strokeWidth="4" fill="none" />
        <text x="516" y="30" textAnchor="middle" fontSize="13" fill={RED} fontWeight="700">真正的断裂</text>
        <text x="640" y="70" textAnchor="middle" fontSize="17" fontWeight="700" fill={VIOLET}>象征交换</text>
        <text x="640" y="90" textAnchor="middle" fontSize="11" fill={MUTED}>不计价值 · 必须回应 · 可逆</text>
        <g>
          <circle cx="640" cy="205" r="78" fill="none" stroke={VIOLET} strokeWidth="2" strokeDasharray="10 8" markerEnd="url(#ch01-ar)">
            <animateTransform attributeName="transform" type="rotate" from="0 640 205" to="360 640 205" dur="14s" repeatCount="indefinite" />
          </circle>
        </g>
        {SYM.map(([t, a]) => {
          const r = a * Math.PI / 180, x = 640 + 78 * Math.sin(r), y = 205 - 78 * Math.cos(r);
          return <g key={t}><rect x={x - 42} y={y - 14} width="84" height="28" rx="14" fill={VIOLET} />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fill="#fff">{t}</text></g>;
        })}
      </g>

      {/* 游戏 / 非劳动：想逃出去，又落回来 */}
      <g style={show(i === 5)}>
        <g>
          {i === 5 && <animateTransform attributeName="transform" type="translate" values="0 0;135 0;135 0;0 0;0 0" keyTimes="0;.35;.45;.8;1" dur="4s" repeatCount="indefinite" />}
          <rect x="300" y="262" width="160" height="34" rx="17" fill="#fff" stroke={BLUE} strokeWidth="2.5" />
          <text x="380" y="284" textAnchor="middle" fontSize="13" fill={BLUE} fontWeight="700">游戏 / 非劳动 / 自由时间</text>
        </g>
        <text x="380" y="360" textAnchor="middle" fontSize="12" fill={BLUE}>想越过边界，却作为「废除」的符号落回价值之内</text>
      </g>
    </svg>);
}

const steps = [
  {
    label: "马克思的图式",
    content: <p>马克思把劳动（和商品）一分为二：左边是<C id="double_labor">抽象劳动</C>，以时间计量、彼此可通约，资本的剥削发生在这里；右边是具体劳动，生产各种有用之物，被看作「质」的、真实的、属于人的那一面。革命的希望被押在中间那条红线上：去掉左边的抽象与异化，右边的「真实」就会被解放出来。</p>,
  },
  {
    label: "一把叉子分出两面",
    content: <p>鲍德里亚先指出：这两面不是「先有具体、后被抽象」，而是同一个结构一刀劈出的两半——他称之为<C id="structural_fork">「叉子」</C>。正是这次二元切分，让劳动从此无处不在：一切人类活动要么是量的劳动，要么是质的劳动，再也没有「不是劳动」的东西。</p>,
  },
  {
    label: "使用价值是镜像",
    content: <p>关键翻转：<C id="use_value_alibi">使用价值</C>并不在交换价值之前或之外，而是交换价值体系自己投射出来的参照物——一个「不在场证明」。它让抽象的交易看起来有一个真实、自然、合乎人性的根据。所以右边的格子和左边其实是同一种颜色。</p>,
  },
  {
    label: "价值领域的外边界",
    content: <p>这样一来，马克思那条线只是价值领域<b>内部</b>的划分。他把全部理论投资押在这条内线上，却把整个政治经济学的<b>外部闭合线</b>留在了阴影里：从「有用地改造自然」那一刻起，价值化就已经开始了。那么，价值之外是什么？</p>,
  },
  {
    label: "真正的断裂",
    content: <p><C id="real_rupture">真正的断裂</C>不在抽象劳动与具体劳动之间，而在整个价值领域与<C id="symbolic_exchange">象征交换</C>之间。象征交换不生产、不积累、不追求有用：礼物要求回赠，耗费与献祭是对价值的嘲弄，交换的双方彼此回应。与它相比，「具体劳动」本身已是一种巨大的理性化与压缩。</p>,
  },
  {
    label: "游戏为何逃不出去",
    content: <p>马克思的「自由王国」、马尔库塞和席勒的<C id="esthetic_of_play">游戏</C>，看起来像是跳出劳动的出口。但它们以生产力的充分发展为前提、被定义为劳动的反面，于是只是劳动的美学升华。它们越过边界的那一刻，又作为「废除政治经济学」的<b>符号</b>落回价值之内——就像反艺术反而让艺术的纯形式更加耀眼。</p>,
  },
];

export default function MirrorOfValue() {
  return <StepThrough steps={steps} render={i => <Diagram i={i} />} />;
}
