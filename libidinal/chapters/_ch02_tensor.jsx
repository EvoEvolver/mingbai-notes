// 第 2 章专属图解：同一个符号，两种读法（符号学读法 ⇄ 掩饰 ⇄ 张量读法）
import { useState, useEffect, useRef } from "react";
import { C } from "@kit";

const INK = "#1f1b16", BLUE = "#2c4a6e", RED = "#9b2c1f", GOLD = "#b8862b", MUTED = "#6b6257";
const CX = 330, CY = 215;

const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const mix = (a, b, k) => { const A = hex(a), B = hex(b); return "rgb(" + A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(",") + ")"; };
const ANGLES = { 4: [-125, -55, 55, 125], 5: [-140, -80, -30, 60, 130], 6: [-140, -90, -40, 40, 90, 140] };

const EXAMPLES = [
  {
    id: "flechsig", icon: "🔥", label: "专名 Flechsig", sign: "Flechsig", sub: "一个专名",
    concept: "proper_name",
    decoder: "施瑞伯 / 读者",
    decoderNote: "符号学预设有人在对我说话、我必须听懂。自我就在「接收—解码」中被构成：一面被动接收消息，一面主动解码，并把每一次经历囤积成「我的经验」。",
    chain: [
      { t: "施瑞伯的医生", n: "逻辑学家的办法：专名只指向唯一对象，在系统里没有等价物，于是用「存在谓词」把它锚住——至少存在一个人叫 Flechsig，他是施瑞伯的主治医生。" },
      { t: "「我爱他」", n: "弗洛伊德的读法：施瑞伯关于 Flechsig 的一切陈述，都可以看成从一个核心句「我（男人）爱他（男人）」经压抑、否定、移置转换出来的。利奥塔称之为典范式的符号学—概念式读法。" },
      { t: "上帝·父亲", n: "同义链继续延伸：Flechsig = 上帝 = 父亲。每一项都替代另一项，意义一路被推向下一个词。" },
    ],
    zero: "大零：链条尽头是一个永不在场、只以缺席起作用的「大能指」，在力比多经济里叫做不可念出的「阉割者」（Kastrator）。一切都向这个别处结算。",
    rays: [
      { t: "保护者", n: "在施瑞伯的妄想里，Flechsig 是帮他、照看他的那一位。" },
      { t: "刽子手", n: "同一个 Flechsig 又是谋害他灵魂、要把他身体当作娼妓来使用的主谋。" },
      { t: "上帝", n: "Flechsig 与上帝不断凝缩为同一个「一者」：上诉的法庭和犯罪的人原来是同一个。" },
      { t: "情人", n: "Flechsig 被施瑞伯的「女性魅力」吸引——却处在防御之中，害怕被这种享乐所奴役。" },
      { t: "迫害者", n: "他「奇迹般地」阻止施瑞伯自然地完成最日常的身体功能，以此羞辱、迫害他。" },
      { t: "警察", n: "妄想里他也是看守、监控者。所有这些谓词在同一瞬间同时成立，利奥塔称之为「不可共存者的不可分辨」。" },
    ],
    clashes: [[0, 1], [3, 4]],
    semi: "把 Flechsig 当作符号学符号：它先指一个人，再指一个核心句，再指父亲……每一步都是替代，意义总在下一个词那里。就算承认它「有很多意义」，那也只是多义：情人 Flechsig 与刽子手 Flechsig 同音异义，Flechsig 与上帝同义——符号学家对此非但不反对，反而觉得正中下怀。",
    tensor: "作为张量，Flechsig 不是「意义很多」，而是一片着火的区域：保护与处决、爱与迫害在同一瞬间都被投注，无法判定归属。这个名字把施瑞伯身体上的眩晕扩展到宗教与历史的语言里，甚至冲破医生自己的身体边界。利奥塔的结论：超出同义与同音之外，是匿名——这些冲动不属于任何人。",
    dissim: "两种读法同时成立：弗洛伊德的转换语法能解释每一句话，而这套解释恰好盖住了那片无法归属的强度；反过来，强度也只能借这些可解释的陈述现身。不是二选一，而是一个遮住另一个。",
  },
  {
    id: "proust", icon: "🕯️", label: "父亲提灯上楼", sign: "提灯上楼", sub: "《追忆》里的一幕",
    concept: "tensor_sign",
    decoder: "读者 / 分析家",
    decoderNote: "符号学式的接收：先假定文本运送着原则上可以传达的消息——「有人在对我说话，我必须理解他」。理解、变得聪明，是这种读者压倒一切的激情。",
    chain: [
      { t: "儿子的激动", n: "马塞尔看到父亲举着灯走上楼梯，心中一阵激动。符号学读法首先把这份激动当成「效果」，要追问它的原因与意义。" },
      { t: "俄狄浦斯结构", n: "精神分析式解读：这份激动是俄狄浦斯结构产生的「意义效果」。场景被放进一个早已写好的结构，成为其中一项。" },
      { t: "父之法", n: "结构再指向律法、禁止与缺失：一切都要在那个不在场的中心那里得到解释。" },
    ],
    zero: "大零：解释的终点不是这一幕本身，而是一个永远缺席的结构中心。场景被「掏空」，成了替代物。",
    rays: [
      { t: "新的文本", n: "利奥塔：我们试图把这份激动延续下去，去造出别的东西——首先是新的文本。" },
      { t: "图像", n: "也可以是图像。关键不是数量，而是普鲁斯特文本那种「独一的质」，生出任何别的对象都生不出的分岔。" },
      { t: "声音", n: "声音、音乐：像凯奇、坎宁汉那样，让姿势、音色、词语在每一点都处在独一的关系中。" },
      { t: "政治", n: "政治也是延伸方向之一：符号不是要被理解，而是要让我们动起来。" },
      { t: "爱抚", n: "还有爱抚：新的力比多碎片被发明出来，接到这条带子上。" },
      { t: "舞蹈", n: "「理解并非我们首要的激情，我们宁愿被推动」——所以激情更像舞蹈，如尼采所愿。" },
    ],
    clashes: [],
    semi: "精神分析的读法：孩子在楼梯下的激动，是俄狄浦斯结构的意义效果。文本被当作一条需要解码的消息：有人在对我说话，我必须理解他。理解完成之时，场景本身也就被消耗掉了，只剩它所「代表」的东西。",
    tensor: "利奥塔的读法：不问它说了什么，而问它让我们怎样动起来——把这份激动带往别的东西的建造：文本、图像、声音、政治、爱抚。要紧的不是「产出多少」，而是这段文字独一的质，它生出的延伸与分岔是任何别的对象都生不出的。",
    dissim: "两种接收同时可能：你可以把它读成俄狄浦斯，我们把它当作推力。利奥塔并不说精神分析错了；他说结构像一个「罩子」盖在情感上，是它的秘密，几乎就是它的掩饰。正因如此要「深爱」结构主义者：他们是我们的敌人，也是同谋。",
  },
  {
    id: "dora", icon: "🫁", label: "多拉的咳嗽", sign: "咳嗽", sub: "多拉的症状",
    concept: "eros_death",
    decoder: "分析师",
    decoderNote: "分析师的立场：症状是一条讯息，要被解读、归类，最终被「修复」——让失调的机器重新符合有机身体的常态。",
    chain: [
      { t: "被压抑之物", n: "症状被当成替代品：咳嗽代表某个被禁止、被压抑的东西。" },
      { t: "多重意义网", n: "进一步的精致化：咳嗽处在几条意义链的交叉口，「多义」「多重决定」。利奥塔说，这仍然只是符号学——多义不是张量。" },
      { t: "一种冲动原则", n: "最后要把它指派给一种冲动原则：要么是爱若斯（制造整体），要么是死亡冲动（拆解整体）。" },
    ],
    zero: "大零：一个「正常」的有机身体作为隐藏的标准——咳嗽相对于它才算是「卡住了」。",
    rays: [
      { t: "爱若斯·成形", n: "作为一台运转良好的、自成整体的小机器，它是爱若斯式的。" },
      { t: "死亡·卡死", n: "作为失调、要被分析师修理的机器，它是致死的。" },
      { t: "重复·不育", n: "作为被调节的机器它也是致死的：它把多拉判给了不育的重复。" },
      { t: "失调·活着", n: "作为失调它又是活的：它证明力比多在有机身体上流通、投注，不可预测地移位。" },
    ],
    clashes: [[0, 1], [2, 3]],
    semi: "分析师把咳嗽放进若干意义网络里，说它多义、多重决定，并把它分配给某一个冲动原则（是爱若斯在制造整体，还是死亡在拆解系统？），以便知道怎么修。对「有机的多拉」而言，呼吸系统卡住了。",
    tensor: "对「歇斯底里的多拉」而言，呼吸系统运转得好极了：一台自行运转的冲动机器，好处是直接的，或者说根本无所谓好处。它同时是爱若斯（调节好的机器）与死亡（失调），又是致死的调节（重复）与活着的失调（流动）。功能不可判定——不是多义，而是根本无法指派。",
    dissim: "利奥塔差点要说：说到底，是先有喉咙这一块的白炽，符号学家才有理由张网。但他刹住了——优先性与因果性本身也是罪疚的形式。要紧的只是：同一个症状，不可避免地有两种同时可能的接收。",
  },
  {
    id: "money", icon: "🪙", label: "一枚货币", sign: "货币", sub: "资本里的任一物",
    concept: "living_currency",
    decoder: "经济学家",
    decoderNote: "经济理论与结构人类学：货币只是沟通系统中的一个项，其流通由规则调节，需求由交换双方产生。",
    chain: [
      { t: "交换价值", n: "货币首先被读成可兑换的价值：它代表别的商品，自身只是等价物。" },
      { t: "价值规律", n: "交换背后有价值规律、生产成本——一套可测量、可计算的秩序。" },
      { t: "原初使用价值", n: "批判再往后指：资本据说遮蔽了一个「在先」的使用价值。利奥塔说，这是异化的浪漫主义，是基督教。" },
    ],
    zero: "大零：真正的价值、未被异化的源头——一个永远在别处、用来审判一切现存交易的空中心。",
    rays: [
      { t: "囤积的紧张", n: "货币也是力比多强度的负荷：积攒本身就能被投注。" },
      { t: "挥霍的焚烧", n: "萨德的罪犯把金钱撤出流通，烧成「财富的废墟」：货币成了身体的一块，被强度灼烧。" },
      { t: "交易的狂喜", n: "利奥塔最想想象的东西：写作、谈判、资本化本身如何能产生狂喜。" },
      { t: "计算之「冰」", n: "冷冰冰的计算也可以被欲望投注：横杠的句法之「冰」必须同时就是它的白炽。" },
    ],
    clashes: [[0, 1], [2, 3]],
    semi: "经济学只把货币当作一个可兑换、可计算的项，并认为资本背后藏着被它遮蔽的「原初」使用价值。照此读法，批判的任务就是揭开遮蔽、找回真实——这正是利奥塔要终结的那种二元论。",
    tensor: "货币（以及资本系统里的每一样东西，因为都是商品）同时——不是辩证对立地——是一份力比多强度。可以像读专名那样读它：既无用也不可交换的力比多价值，爱若斯与死亡的一个瞬间。句法、价值规律、交易这些看似「去强度化」的区域，本身也能变成白炽的区域。",
    dissim: "价格与「越轨」（exorbitant）混在一起：无可比之物被付了钱、被估了价。这种混淆既不可能又不可避免——因为语言与金钱并不是一个单独的领域，它们和身体一样，都是同一条带子上的碎片。",
  },
];

function Readout({ t }) {
  const to = t / 100;
  const name = to < .3 ? "符号学读法" : to > .7 ? "张量读法" : "掩饰：二者叠合";
  const col = to < .3 ? BLUE : to > .7 ? RED : GOLD;
  return <b style={{ color: col }}>{name}</b>;
}

export default function TensorSign() {
  const [ei, setEi] = useState(0);
  const [t, setT] = useState(0);
  const [sel, setSel] = useState(null);
  const [play, setPlay] = useState(false);
  const [askChoose, setAskChoose] = useState(false);
  const dir = useRef(1);
  const ex = EXAMPLES[ei];
  const to = t / 100, so = 1 - to;
  const mode = to < .3 ? "semi" : to > .7 ? "tensor" : "dissim";

  useEffect(() => {
    if (!play) return;
    const h = setInterval(() => setT(v => {
      let n = v + dir.current * 2;
      if (n >= 100) { n = 100; dir.current = -1; } else if (n <= 0) { n = 0; dir.current = 1; }
      return n;
    }), 60);
    return () => clearInterval(h);
  }, [play]);

  const pick = (i) => { setEi(i); setSel(null); };
  const preset = (v) => { setPlay(false); setT(v); setSel(null); };

  const angles = ANGLES[ex.rays.length] || ANGLES[6];
  const R = 112 + 46 * to;
  const pts = angles.map(a => { const r = a * Math.PI / 180; return [Math.cos(r), Math.sin(r)]; });
  const signFill = mix("#e7edf4", "#f2b48a", to);
  const signStroke = mix(BLUE, RED, to);
  const barDur = (2.6 - 2.2 * to).toFixed(2) + "s";
  const chainX = [480, 610, 718], zeroX = 790;
  const chainFs = [14, 12.5, 11];

  const info = sel ? sel : { title: mode === "semi" ? "符号学读法" : mode === "tensor" ? "张量读法" : "掩饰（dissimulation）", text: ex[mode] };

  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg">{EXAMPLES.map((x, j) =>
        <button key={x.id} className={ei === j ? "on" : ""} onClick={() => pick(j)}>{x.icon} {x.label}</button>)}</div>

      <svg viewBox="0 0 820 450" style={{ width: "100%", background: "var(--paper)", borderRadius: 14, userSelect: "none" }}>
        <defs>
          <radialGradient id="tz-glow">
            <stop offset="0%" stopColor="#f6a15b" stopOpacity=".95" />
            <stop offset="55%" stopColor={RED} stopOpacity=".35" />
            <stop offset="100%" stopColor={RED} stopOpacity="0" />
          </radialGradient>
          <marker id="tz-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={BLUE} />
          </marker>
        </defs>

        {/* ---- 符号学层 ---- */}
        <g opacity={so} style={{ transition: "opacity .25s" }}>
          <text x="640" y="34" textAnchor="middle" fontSize="13" fill={BLUE}>意义永远延迟：每一项都只是下一项的替代 →</text>
          {/* 解码者 */}
          <g style={{ cursor: "pointer" }} onClick={() => setSel({ title: "收信人 / 解码的「我」", text: ex.decoderNote })}>
            <rect x="14" y="190" width="112" height="50" rx="10" fill="#fffdf8" stroke={BLUE} strokeWidth="1.5" />
            <text x="70" y="212" textAnchor="middle" fontSize="13" fill={BLUE}>{ex.decoder}</text>
            <text x="70" y="230" textAnchor="middle" fontSize="11" fill={MUTED}>接收·解码·囤积</text>
          </g>
          <line x1={CX - 52} y1={CY} x2="130" y2={CY} stroke={BLUE} strokeWidth="1.6" markerEnd="url(#tz-arr)" strokeDasharray="5 5">
            <animate attributeName="stroke-dashoffset" values="10;0" dur=".8s" repeatCount="indefinite" />
          </line>
          <text x="205" y={CY - 10} textAnchor="middle" fontSize="11" fill={BLUE}>消息 → 我</text>
          {/* 意义链 */}
          {ex.chain.map((c, i) => {
            const x0 = i === 0 ? CX + 56 : chainX[i - 1] + 50 - i * 6, x1 = chainX[i] - 56 + i * 7;
            const w = 112 - i * 14, h = 40 - i * 5;
            return <g key={i}>
              <line x1={x0} y1={CY} x2={x1} y2={CY} stroke={BLUE} strokeWidth={1.6 - i * .3} markerEnd="url(#tz-arr)" strokeDasharray="5 5" opacity={1 - i * .2}>
                <animate attributeName="stroke-dashoffset" values="10;0" dur=".8s" repeatCount="indefinite" />
              </line>
              <g style={{ cursor: "pointer" }} opacity={1 - i * .22} onClick={() => setSel({ title: "意义链 · " + c.t, text: c.n })}>
                <rect x={chainX[i] - w / 2} y={CY - h / 2} width={w} height={h} rx="8" fill="#fffdf8" stroke={BLUE} strokeWidth="1.3" />
                <text x={chainX[i]} y={CY + chainFs[i] / 2 - 1} textAnchor="middle" fontSize={chainFs[i]} fill={BLUE}>{c.t}</text>
              </g>
            </g>;
          })}
          <line x1={chainX[2] + 38} y1={CY} x2={zeroX - 24} y2={CY} stroke={BLUE} strokeWidth=".9" strokeDasharray="3 4" opacity=".5" />
          <g style={{ cursor: "pointer" }} onClick={() => setSel({ title: "大零 · 缺席的中心", text: ex.zero })}>
            <circle cx={zeroX} cy={CY} r="22" fill="none" stroke={BLUE} strokeWidth="1.5" strokeDasharray="4 3">
              <animate attributeName="r" values="22;19;22" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x={zeroX} y={CY + 7} textAnchor="middle" fontSize="20" fill={BLUE} fontFamily="Georgia,serif">0</text>
            <text x={zeroX} y={CY + 44} textAnchor="middle" fontSize="11" fill={BLUE}>大零</text>
          </g>
          {/* 一个在链上永远走不到头的点 */}
          <circle r="4" fill={BLUE}>
            <animate attributeName="cx" values={`${CX + 50};${zeroX - 26}`} dur="3.2s" repeatCount="indefinite" />
            <animate attributeName="cy" values={`${CY};${CY}`} dur="3.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;1;0" dur="3.2s" repeatCount="indefinite" />
          </circle>
          <text x={CX} y={CY + 78} textAnchor="middle" fontSize="12" fill={BLUE}>符号被「掏空」：它只代表别处的东西</text>
        </g>

        {/* ---- 张量层 ---- */}
        <g opacity={to} style={{ transition: "opacity .25s" }}>
          <circle cx={CX} cy={CY} r={70 + 60 * to} fill="url(#tz-glow)">
            <animate attributeName="r" values={`${70 + 60 * to};${82 + 70 * to};${70 + 60 * to}`} dur="1.3s" repeatCount="indefinite" />
          </circle>
          {ex.clashes.map(([a, b], k) => {
            const A = pts[a], B = pts[b];
            const ax = CX + A[0] * R, ay = CY + A[1] * R, bx = CX + B[0] * R, by = CY + B[1] * R;
            const mx = (ax + bx) / 2, my = (ay + by) / 2;
            const ox = (mx - CX) * .35, oy = (my - CY) * .35;
            return <g key={k}>
              <path d={`M${ax},${ay} Q${mx + ox},${my + oy} ${bx},${by}`} fill="none" stroke={RED} strokeWidth="1.4" strokeDasharray="4 4" opacity=".8" />
              <text x={mx + ox * .55} y={my + oy * .55 + 5} textAnchor="middle" fontSize="15" fill={RED} fontWeight="700">✕</text>
            </g>;
          })}
          {ex.rays.map((r, i) => {
            const [dx, dy] = pts[i];
            const ex2 = CX + dx * R, ey = CY + dy * R;
            const lx = CX + dx * (R + 16), ly = CY + dy * (R + 16);
            const anchor = dx > .3 ? "start" : dx < -.3 ? "end" : "middle";
            const on = sel && sel.title === "强度方向 · " + r.t;
            return <g key={i} style={{ cursor: "pointer" }} onClick={() => setSel({ title: "强度方向 · " + r.t, text: r.n })}>
              <line x1={CX + dx * 48} y1={CY + dy * 48} x2={ex2} y2={ey} stroke={RED} strokeWidth={on ? 4 : 2.4} strokeLinecap="round">
                <animate attributeName="stroke-width" values={on ? "4;5.5;4" : "2.2;3.6;2.2"} dur={(1 + i * .17).toFixed(2) + "s"} repeatCount="indefinite" />
              </line>
              <circle r="3.2" fill="#f6a15b">
                <animateMotion dur={(1.1 + (i % 3) * .25).toFixed(2) + "s"} repeatCount="indefinite" path={`M${CX + dx * 48},${CY + dy * 48} L${ex2},${ey}`} />
              </circle>
              <circle cx={ex2} cy={ey} r={on ? 8 : 6} fill={RED} />
              <rect x={anchor === "start" ? lx - 4 : anchor === "end" ? lx - r.t.length * 15 - 6 : lx - r.t.length * 7.5 - 5}
                y={ly + (dy > .5 ? 4 : dy < -.5 ? -24 : -11)} width={r.t.length * 15 + 10} height="22" rx="6" fill="#fffdf8" opacity=".9" />
              <text x={lx} y={ly + (dy > .5 ? 20 : dy < -.5 ? -8 : 5)} textAnchor={anchor} fontSize="14" fill={RED} fontWeight={on ? 700 : 500}>{r.t}</text>
            </g>;
          })}
          {/* 高速旋转的横杠 */}
          <g key={barDur}>
            <line x1={CX - 62} y1={CY} x2={CX + 62} y2={CY} stroke={GOLD} strokeWidth="3" strokeLinecap="round" opacity=".85">
              <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur={barDur} repeatCount="indefinite" />
            </line>
          </g>
          <text x={CX} y="440" textAnchor="middle" fontSize="12" fill={RED}>
            {ex.clashes.length ? "同时被投注、彼此不可共存（✕）的方向：无法指派给任何一个意义" : "不是要被理解，而是向多个方向延伸、分岔"}
          </text>
        </g>

        {/* ---- 中心：同一个符号 ---- */}
        <g style={{ cursor: "pointer" }} onClick={() => setSel({ title: "张量符号：同一个符号的双重性", text: "利奥塔反复强调：这不是两种符号，而是同一个符号。一面，它是关系网中的一项，靠差异与对立产生意义，可以被符号学处理；另一面，它是一次单一、短暂、不可交换的强度集中。两面不可分离，也无法推出谁先谁后。" })}>
          <circle cx={CX} cy={CY} r={46 + 8 * to} fill={signFill} stroke={signStroke} strokeWidth="2.5" />
          {so > .05 && <circle cx={CX} cy={CY} r={30} fill="var(--paper)" opacity={so * .9} stroke={BLUE} strokeDasharray="3 3" strokeWidth="1" />}
          <text x={CX} y={CY + 6} textAnchor="middle" fontSize={ex.sign.length > 5 ? 15 : 19} fontWeight="700" fill={mix(INK, "#5a120a", to)} fontFamily="var(--serif)">{ex.sign}</text>
          <text x={CX} y={CY + 72 + 8 * to} textAnchor="middle" fontSize="11" fill={MUTED} opacity={to > .7 ? 1 : 0}>{ex.sub}</text>
        </g>

        {/* ---- 掩饰带 ---- */}
        {mode === "dissim" && <g>
          <rect x="14" y="12" width="250" height="30" rx="15" fill={GOLD} opacity=".16" />
          <text x="139" y="32" textAnchor="middle" fontSize="13.5" fill="#7a5a14" fontWeight="600">掩饰：两种读法叠在同一个符号上</text>
        </g>}
      </svg>

      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ color: BLUE, fontSize: 14, whiteSpace: "nowrap" }}>符号学读法</span>
          <input type="range" min="0" max="100" value={t} aria-label="读法"
            onChange={e => { setPlay(false); setT(+e.target.value); setSel(null); }}
            style={{ flex: 1, minWidth: 160, accentColor: mix(BLUE, RED, to) }} />
          <span style={{ color: RED, fontSize: 14, whiteSpace: "nowrap" }}>张量读法</span>
        </div>
        <div className="seg" style={{ flexWrap: "wrap" }}>
          <button className={t === 0 ? "on" : ""} onClick={() => preset(0)}>① 符号学</button>
          <button className={t === 50 ? "on" : ""} onClick={() => preset(50)}>② 掩饰</button>
          <button className={t === 100 ? "on" : ""} onClick={() => preset(100)}>③ 张量</button>
          <button className={play ? "on" : ""} onClick={() => setPlay(p => !p)}>{play ? "⏸ 停住" : "▶ 来回摆动"}</button>
        </div>
      </div>

      <div style={{ borderLeft: "4px solid " + mix(BLUE, RED, to), paddingLeft: 14 }}>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>当前：<Readout t={t} /> · 例子：<C id={ex.concept}>{ex.label}</C>{sel ? "" : " · 点图中任一节点看细节"}</div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 19, margin: "4px 0" }}>{info.title}</div>
        <p style={{ margin: 0 }}>{info.text}</p>
        {sel && <button onClick={() => setSel(null)} style={{ marginTop: 8, border: "1px solid var(--line)", background: "var(--card)", borderRadius: 8, padding: "2px 10px", cursor: "pointer", fontSize: 13 }}>← 回到本读法总述</button>}
      </div>

      <div>
        <button onClick={() => setAskChoose(a => !a)}
          style={{ border: "1px dashed " + GOLD, background: "transparent", borderRadius: 10, padding: "6px 14px", cursor: "pointer", color: "#7a5a14", fontSize: 15 }}>
          {askChoose ? "▾" : "▸"} 能不能干脆只选一边？
        </button>
        {askChoose && <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12, marginTop: 10 }}>
          <div style={{ background: "#eef2f7", borderRadius: 12, padding: "10px 14px" }}>
            <b style={{ color: BLUE }}>只留符号学一边</b>
            <p style={{ margin: "4px 0 0", fontSize: 15 }}>每一份强烈的情感都被归到某种缺失之下，每一种力都被归到有限性之下——意义永远延迟、主体永远在丧失。利奥塔说这就是虚无主义，一门「宗教科学」。</p>
          </div>
          <div style={{ background: "#f7ece8", borderRadius: 12, padding: "10px 14px" }}>
            <b style={{ color: RED }}>只留张量一边</b>
            <p style={{ margin: "4px 0 0", fontSize: 15 }}>宣布「我们离开符号，进入符号之外的张量秩序」，正中符号学家下怀：他会像殖民者对待「外部」那样把它勘探、收编。宣称强度「在先」也不行——优先性与因果本身就是罪疚的形式。</p>
          </div>
          <div style={{ background: "#f6efdf", borderRadius: 12, padding: "10px 14px" }}>
            <b style={{ color: "#7a5a14" }}>利奥塔的做法</b>
            <p style={{ margin: "4px 0 0", fontSize: 15 }}>不占领新领域，原地不动，占据符号的地盘，只是换一种接收方式；去「精炼掩饰」，而不是揭穿它。所以这根滑块没有正确的位置——它本来就该来回摆。</p>
          </div>
        </div>}
      </div>
    </div>
  );
}
