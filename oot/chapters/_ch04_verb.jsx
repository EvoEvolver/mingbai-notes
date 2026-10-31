// 第 4 章专属图解：动词「是」如何把一串词变成判断（StepThrough）+ 分节的两条轴
import { useState } from "react";
import { StepThrough, C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#6b6257";

const Tok = ({ x, y = 120, w = 110, label, sub, color = INK, fill = "#fff", dash, big, subColor = MUTED }) => <g>
  <rect x={x - w / 2} y={y - 28} width={w} height={56} rx="12" fill={fill} stroke={color} strokeWidth="2.5" strokeDasharray={dash} />
  <text x={x} y={y + (sub ? 0 : 7)} textAnchor="middle" fontSize={big ? 24 : 20} fontFamily="var(--serif)" fill={color}>{label}</text>
  {sub && <text x={x} y={y + 18} textAnchor="middle" fontSize="11" fill={subColor}>{sub}</text>}
</g>;

const Arrow = ({ x1, x2, y = 120, c = MUTED }) => <g>
  <line x1={x1} y1={y} x2={x2 - 8} y2={y} stroke={c} strokeWidth="2" />
  <path d={`M${x2 - 10},${y - 6} L${x2},${y} L${x2 - 10},${y + 6}`} fill="none" stroke={c} strokeWidth="2" />
</g>;

const FRAMES = [
  // 0 叫喊
  () => <>
    <text x="300" y="40" textAnchor="middle" fontSize="13" fill={MUTED}>阿韦龙野孩子面前放着一碗牛奶</text>
    <Tok x={300} label="「牛奶！」" color={MUTED} dash="5 5" w={150} big />
    <text x="300" y="185" textAnchor="middle" fontSize="13" fill={MUTED}>= 液体 + 碗 + 想喝 混成一团的声音标记</text>
    <text x="300" y="208" textAnchor="middle" fontSize="13" fill={RED}>没有任何判断 → 还不是语言</text>
  </>,
  // 1 同时的表征
  () => <>
    <text x="300" y="40" textAnchor="middle" fontSize="13" fill={MUTED}>在眼睛里：树和绿是同时给出的一整块</text>
    <circle cx="300" cy="120" r="62" fill={GREEN} opacity=".18"><animate attributeName="r" values="58;66;58" dur="2.4s" repeatCount="indefinite" /></circle>
    <text x="300" y="138" textAnchor="middle" fontSize="54">🌳</text>
    <text x="300" y="208" textAnchor="middle" fontSize="13" fill={INK}>思想（表征）：同时性的，一下子全在</text>
  </>,
  // 2 线性排列
  () => <>
    <text x="300" y="40" textAnchor="middle" fontSize="13" fill={MUTED}>可是声音只能一个接一个发出</text>
    <Tok x={190} label="树" color={BLUE} />
    <Tok x={410} label="绿" color={GREEN} />
    <Arrow x1={250} x2={350} />
    <text x="300" y="185" textAnchor="middle" fontSize="13" fill={INK}>语言 = 把同时的东西拆开、排成先后</text>
    <text x="300" y="208" textAnchor="middle" fontSize="13" fill={RED}>但两个词并排放着，仍然什么也没「说」</text>
  </>,
  // 3 插入「是」
  () => <>
    <text x="300" y="40" textAnchor="middle" fontSize="13" fill={MUTED}>插入系词，判断诞生</text>
    <Tok x={130} label="树" sub="主语 · judicandum" color={BLUE} w={140} />
    <g><Tok x={300} label="是" sub="系词 · 肯定" color="#fff" fill={RED} w={100} big subColor="#fbe9e4" />
      <animateTransform attributeName="transform" type="translate" values="0,-60;0,0" dur=".7s" fill="freeze" /></g>
    <Tok x={470} label="绿的" sub="属性 · judicatum" color={GREEN} w={140} />
    <text x="300" y="190" textAnchor="middle" fontSize="13" fill={INK}>「这是那」：两个表征被肯定地连在一起</text>
    <text x="300" y="212" textAnchor="middle" fontSize="13" fill={RED}>从此这串声音可以为真、也可以为假</text>
  </>,
  // 4 一切动词都是「是」
  () => <>
    <text x="300" y="30" textAnchor="middle" fontSize="13" fill={MUTED}>剥掉附加物，每个动词底下都是「是」</text>
    {[["我唱", "我 · 是 · 正在唱的", "加进了属性"], ["我唱过", "我 · 是 · 先前正在唱的", "加进了时间"], ["vivo", "ego · sum · vivens", "连主语也并进去了"]].map(([a, b, n], i) => {
      const y = 70 + i * 55;
      return <g key={i}>
        <text x="110" y={y + 6} textAnchor="middle" fontSize="20" fontFamily="var(--serif)" fill={INK}>{a}</text>
        <Arrow x1={160} x2={220} y={y} />
        <text x="235" y={y + 6} fontSize="18" fontFamily="var(--serif)" fill={INK}>{b.split("·").map((s, j) =>
          <tspan key={j} fill={j === 1 ? RED : INK} fontWeight={j === 1 ? 700 : 400}>{s}{j < 2 ? "·" : ""}</tspan>)}</text>
        <text x="590" y={y + 6} textAnchor="end" fontSize="12" fill={MUTED}>{n}</text>
      </g>;
    })}
  </>,
  // 5 画布
  () => <>
    <text x="300" y="30" textAnchor="middle" fontSize="13" fill={MUTED}>「是」肯定的不是事物存在，而是两个表征「共存」</text>
    <rect x="150" y="50" width="300" height="140" rx="6" fill="#fffaf0" stroke={RED} strokeWidth="3" strokeDasharray="6 4" />
    <text x="160" y="68" fontSize="12" fill={RED}>画布 = 动词「是」</text>
    <rect x="200" y="85" width="80" height="80" rx="40" fill="none" stroke={BLUE} strokeWidth="3" />
    <text x="240" y="182" textAnchor="middle" fontSize="12" fill={BLUE}>形状 = 名词</text>
    <rect x="320" y="85" width="80" height="80" rx="10" fill={GREEN} opacity=".55" />
    <text x="360" y="182" textAnchor="middle" fontSize="12" fill={GREEN}>颜色 = 形容词</text>
    <text x="300" y="214" textAnchor="middle" fontSize="13" fill={INK}>看不见的画布，却让整幅画得以显现</text>
  </>,
];

const STEPS = [
  { label: "只是叫喊", content: <p>福柯举了阿韦龙野孩子的例子：碗端到面前，他会喊「牛奶」，但这只是一团混在一起的声音标记（液体、碗、想喝）。他从没想说「牛奶<b>是</b>热的」。对古典思想来说，<b>语言不从表达开始，而从话语开始</b>：没有藏着一个命题的声音，只是噪音。</p> },
  { label: "思想是同时的", content: <p>看见一棵绿树时，「树」和「绿」是同时给你的，在表征里不分先后。古典语法家（Condillac、Destutt de Tracy）都承认：思想是一个简单的动作，表达它却必须是一个<b>连续</b>的动作。</p> },
  { label: "语言是线性的", content: <p>语言的独特之处不在于任意或约定，而在于它只能<b>一个一个</b>地排列。它之于思想，就像代数之于几何：把同时的比较换成一步步走过的顺序。这就是 <C id="linear_discourse">「语言分析思想」</C> 的严格含义。可光把词排成一排，还不成句子。</p> },
  { label: "插入「是」", content: <p>命题只需要三样东西：主语、属性、连接二者的系词。主语和属性性质相同，甚至能互换位置；唯一不可替代的是那个 <C id="verb_to_be">动词</C>。它表明说话的人不只是在想几个名词，而是在<b>判断</b>它们。有了它，话语才可能为真或为假；普通符号只有「合不合适」，没有真假。</p> },
  { label: "所有动词都是「是」", content: <p>Port-Royal 的结论：全部动词可以归结为唯一一个表示「是」的动词。「我唱」是把属性糅进了「是」，「我唱过」又加进了时间，拉丁语的 <i>vivo</i> 连主语也吞了进去。这些都是围绕一个极细小功能的沉积物，只有「是」保持了单纯。</p> },
  { label: "「是」到底肯定了什么", content: <p>「是」不是在说树<b>存在</b>，因为它同样可以肯定「死」。Condillac 认为它只肯定两个表征的<b>共存</b>，例如树与绿常常一同出现在我的印象中。一位 18 世纪末语法家打了个比方：名词是形状，形容词是颜色，动词是画布本身。所以「是」通向的存在，其实就是<b>表征</b>本身的存在。到了 19 世纪，动词沦为众多词类之一，而「是」与存在的关系则另起炉灶，变成一个更古老的谜（从 Hegel 到 Mallarmé）。</p> },
];

export function VerbToBe() {
  return <StepThrough steps={STEPS} render={i =>
    <svg key={i} viewBox="0 0 600 230" style={{ width: "100%", maxHeight: 280, background: "var(--paper)", borderRadius: 14 }}>{FRAMES[i]()}</svg>} />;
}

// —— 分节的两条正交轴 ——
const HORIZ = [
  { w: "旺财", n: "专名：只指这一只", g: 0 },
  { w: "西班牙猎犬", n: "种", g: 1 },
  { w: "狗", n: "更一般", g: 2 },
  { w: "四足动物", n: "纲目式的大类", g: 3 },
  { w: "动物", n: "最一般", g: 4 },
];
const VERT = [
  { w: "狗", n: "实体：能独立存在" },
  { w: "白色的", n: "性质：不能单独存在 → 形容词" },
  { w: "「白色」", n: "错位：性质被当成名词用" },
];

export function ArticulationAxes() {
  const [h, setH] = useState(2), [v, setV] = useState(0);
  const X = (i) => 90 + i * 110;
  return <div className="card" style={{ display: "grid", gap: 10 }}>
    <svg viewBox="0 0 600 260" style={{ width: "100%", maxHeight: 300, background: "var(--paper)", borderRadius: 14 }}>
      <line x1="60" y1="70" x2="570" y2="70" stroke={BLUE} strokeWidth="3" />
      <path d="M560,63 L572,70 L560,77" fill="none" stroke={BLUE} strokeWidth="3" />
      <text x="570" y="52" textAnchor="end" fontSize="12" fill={BLUE}>水平分节：个体 → 一般（名词）</text>
      {HORIZ.map((t, i) => <g key={i} style={{ cursor: "pointer" }} onClick={() => { setH(i); setV(0); }}>
        <circle cx={X(i)} cy="70" r={h === i ? 13 : 8} fill={h === i ? BLUE : "#fff"} stroke={BLUE} strokeWidth="2.5" />
        <text x={X(i)} y="105" textAnchor="middle" fontSize="16" fontFamily="var(--serif)" fill={h === i ? BLUE : INK} fontWeight={h === i ? 700 : 400}>{t.w}</text>
      </g>)}
      <line x1={X(2)} y1="120" x2={X(2)} y2="245" stroke={GREEN} strokeWidth="3" />
      <text x={X(2) + 10} y="250" fontSize="12" fill={GREEN}>垂直分节：实体 → 性质（形容词）</text>
      {VERT.slice(1).map((t, i) => <g key={i} style={{ cursor: "pointer" }} onClick={() => { setV(i + 1); setH(2); }}>
        <circle cx={X(2)} cy={160 + i * 50} r={v === i + 1 ? 13 : 8} fill={v === i + 1 ? GREEN : "#fff"} stroke={GREEN} strokeWidth="2.5" />
        <text x={X(2) + 22} y={166 + i * 50} fontSize="16" fontFamily="var(--serif)" fill={v === i + 1 ? GREEN : INK} fontWeight={v === i + 1 ? 700 : 400}>{t.w}</text>
      </g>)}
      <text x={X(0)} y="140" textAnchor="middle" fontSize="11" fill={MUTED}>一端：专名</text>
      <text x={X(2) - 18} y="140" textAnchor="end" fontSize="11" fill={RED}>交点：通名</text>
    </svg>
    <p style={{ margin: 0 }}>
      <b>{v ? VERT[v].w : HORIZ[h].w}</b>：{v ? VERT[v].n : HORIZ[h].n}。
      {!v && h === 0 && " 如果只有专名，就得为每样东西造一个词，记忆塞满、秩序全无，连最简单的「这是那」都说不出来。"}
      {!v && h > 0 && " 越往右越一般、数量越少；也可以反过来不断细分，一直回到专名。这就是名词承担的分类（taxonomy）功能。"}
      {v === 1 && " 形容词标出表征中「不能自己存在」的东西，Adam Smith 说这里面已经藏着一套形而上学。"}
      {v === 2 && " 语言可以挪动：把性质说成名词，或把名词当形容词用。这并不违背表征，恰恰说明语言自身就是一种可以重新切分的表征。"}
    </p>
    <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>点击轴上的词。两轴交点上的是「通名」，一端是专名，另一端是形容词。</p>
  </div>;
}
