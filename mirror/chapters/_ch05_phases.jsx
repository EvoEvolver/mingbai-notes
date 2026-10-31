// 第 5 章专属图解一：政治经济学的三个阶段——「可交换之物」的同心圆逐步扩张（SVG + SMIL）
import { StepThrough, C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", GREY = "#9a948a";
const CX = 180, CY = 180, R = [58, 108, 158];

// 每个环在各步骤中的状态：0=不交换（灰虚线） 1=进入交换（金） 2=代码（蓝）
const STATE = [
  [1, 0, 0],
  [1, 1, 0],
  [1, 1, 1],
  [2, 2, 2],
];

const PANEL = [
  { head: "阶段一 · 只交换剩余", rows: [["被交换的", "只有剩余产品"], ["交换之外", "大片生活：自用、分享、义务"], ["对应", "古代与封建生产"]] },
  { head: "阶段二 · 全部工业品被交换", rows: [["被交换的", "全部工业产品 + 劳动力"], ["主导形式", "商品形式"], ["统治方式", "剥削：榨取剩余价值"], ["关键", "资本诞生——质变"]] },
  { head: "阶段三 · 马克思的读法", rows: [["被交换的", "德性、爱、知识、良心"], ["定性", "「普遍贿赂」的时代"], ["判断", "只是阶段二的量的延伸"], ["分析工具", "仍是商品、剥削、利润"]] },
  { head: "阶段三 · 鲍德里亚的读法", shift: [["商品形式", "符号形式"], ["生产方式", "代码"], ["剥削", "操控与排斥"], ["一般等价物", "代码下的互换"], ["竞争", "代码的垄断"]] },
];

function Ring({ k, s, active }) {
  const r = R[k];
  const fill = s === 0 ? "none" : s === 1 ? GOLD : BLUE;
  const op = s === 0 ? 0 : [.55, .32, .18][k];
  return <g>
    <circle cx={CX} cy={CY} r={r} fill={fill} fillOpacity={op} stroke={s === 0 ? GREY : s === 1 ? GOLD : BLUE}
      strokeWidth={active ? 4 : 2} strokeDasharray={s === 0 ? "6 6" : s === 2 ? "3 5" : "none"}>
      {active && s === 1 && <animate attributeName="stroke-opacity" values="1;.35;1" dur="1.6s" repeatCount="indefinite" />}
      {s === 2 && <animate attributeName="stroke-dashoffset" values="0;-40" dur={`${2 + k}s`} repeatCount="indefinite" />}
    </circle>
    {active && s === 1 && <circle cx={CX} cy={CY} r={r} fill="none" stroke={GOLD} strokeWidth="2">
      <animate attributeName="r" values={`${r};${r + 14}`} dur="1.6s" repeatCount="indefinite" />
      <animate attributeName="opacity" values=".8;0" dur="1.6s" repeatCount="indefinite" />
    </circle>}
  </g>;
}

const T = (x, y, s, o = {}) => <text x={x} y={y} textAnchor="middle" fontSize={o.fs || 14} fill={o.c || INK} fontWeight={o.b ? 700 : 400} opacity={o.op ?? 1}>{s}</text>;

function Figure({ i }) {
  const st = STATE[i], p = PANEL[i], code = i === 3;
  const lab = (k, on) => ({ c: on === 0 ? GREY : on === 2 ? BLUE : INK, b: on !== 0 });
  return (
    <svg key={i} viewBox="0 0 680 360" style={{ width: "100%", maxHeight: 380, background: "var(--paper)", borderRadius: 14 }}>
      {[2, 1, 0].map(k => <Ring key={k + "-" + i} k={k} s={st[k]} active={i === k || (i === 3)} />)}
      {/* 环内标签 */}
      {T(CX, CY - 4, code ? "剩余" : "剩余", lab(0, st[0]))}
      {T(CX, CY + 14, code ? "→ 符号" : "产品", { ...lab(0, st[0]), fs: 12 })}
      {T(CX, CY - 78, "工业品", lab(1, st[1]))}
      {T(CX, CY + 88, st[1] ? "劳动力" : "自用 · 分享", lab(1, st[1]))}
      {T(CX, CY - 128, "德性", lab(2, st[2]))}
      {T(CX + 133, CY + 5, "爱", lab(2, st[2]))}
      {T(CX, CY + 138, "知识", lab(2, st[2]))}
      {T(CX - 133, CY + 5, "良心", lab(2, st[2]))}
      {i >= 2 && <>
        {T(CX + 96, CY - 96, code ? "性" : "", { c: BLUE, fs: 12 })}
        {T(CX - 96, CY - 96, code ? "信息" : "", { c: BLUE, fs: 12 })}
        {T(CX + 96, CY + 104, code ? "需要" : "", { c: BLUE, fs: 12 })}
        {T(CX - 96, CY + 104, code ? "文化" : "", { c: BLUE, fs: 12 })}
      </>}
      {i === 0 && T(CX, CY + 172, "虚线 = 尚在交换之外", { c: GREY, fs: 12 })}
      {i === 2 && T(CX, CY + 175, "马克思：只是「上层建筑效应」", { c: GOLD, fs: 12, b: true })}
      {/* 第三阶段：被甩出体系的人 */}
      {code && [0, 1, 2, 3, 4, 5, 6].map(j => {
        const a = -Math.PI / 2 + j * (2 * Math.PI / 7) + .3, rr = 172;
        return <circle key={j} cx={CX + rr * Math.cos(a)} cy={CY + rr * Math.sin(a)} r="5" fill={RED}>
          <animate attributeName="r" values="4;7;4" dur="1.8s" begin={`${j * .25}s`} repeatCount="indefinite" />
        </circle>;
      })}
      {code && <text x="370" y="314" fontSize="12" fill={RED}>● 圆外红点 = 被甩到边缘的「非标记项」</text>}

      {/* 右侧面板 */}
      <text x="370" y="40" fontSize="18" fontWeight="700" fill={code ? BLUE : INK}>{p.head}</text>
      {p.rows && p.rows.map(([a, b], j) => <g key={i + "r" + j} opacity="0">
        <animate attributeName="opacity" from="0" to="1" begin={`${j * .18}s`} dur=".5s" fill="freeze" />
        <text x="370" y={84 + j * 46} fontSize="13" fill={GREY}>{a}</text>
        <text x="460" y={84 + j * 46} fontSize="15" fill={INK}>{b}</text>
        <line x1="370" x2="660" y1={96 + j * 46} y2={96 + j * 46} stroke={INK} opacity=".08" />
      </g>)}
      {p.shift && p.shift.map(([a, b], j) => <g key={i + "s" + j} opacity="0">
        <animate attributeName="opacity" from="0" to="1" begin={`${.2 + j * .35}s`} dur=".5s" fill="freeze" />
        <text x="370" y={82 + j * 50} fontSize="15" fill={GREY} textDecoration="line-through">{a}</text>
        <text x="475" y={82 + j * 50} fontSize="16" fill={RED}>→
          <animate attributeName="x" values="470;482;470" dur="1.4s" repeatCount="indefinite" /></text>
        <text x="510" y={82 + j * 50} fontSize="16" fontWeight="700" fill={BLUE}>{b}</text>
      </g>)}
      {code && <text x="370" y="340" fontSize="12" fill={BLUE}>「垄断的与其说是生产资料，不如说是代码」</text>}
    </svg>);
}

const steps = [
  { label: "只交换剩余", content: <p>古代与封建社会里，只有<b>剩余</b>才拿去交换；大片生活——自用、分享、义务往来——都在交换之外。这是马克思在《哲学的贫困》里画的<C id="three_phases">谱系</C>的起点。</p> },
  { label: "全部工业品", content: <p>资本主义下，<b>全部</b>工业产品连同劳动力都进入交换。从一到二是<b>资本的诞生</b>：不只是交换范围扩大，社会关系也被彻底改写，统治的形式是对劳动的<C id="contradiction">剥削</C>。</p> },
  { label: "一切都被定价（马克思）", content: <p>第三阶段，连德性、爱、知识、良心这些「只分享、不交换」的东西也被拿到市场上，马克思称之为「普遍贿赂」。但在马克思和后来的马克思主义者看来，这只是阶段二的<b>量的延伸</b>，于是今天对文化、消费、性的批判仍停留在「资本主义卖淫」的说法上。</p> },
  { label: "突变：代码统治（鲍德里亚）", content: <p>鲍德里亚说：阶段三相对阶段二，就像阶段二相对阶段一一样，<b>是一次革命</b>。统治的核心从<C id="form_sign">商品形式转为符号形式</C>：一切价值都变成可互换的符号，受<C id="monopoly_code">代码的垄断</C>支配；统治方式不再主要是剥削，而是结构性的操控，以及把整批人群甩到边缘成为<C id="non_marked">非标记项</C>。劳动本身也只是被分配的一个位置，一种社会控制方式。</p> },
];

export default function ThreePhases() {
  return <StepThrough steps={steps} render={i => <Figure i={i} />} />;
}
