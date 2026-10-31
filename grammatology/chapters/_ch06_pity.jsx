// 第 6 章图解 ③：怜悯的经济 —— 自爱 → 怜悯 → 想象力 → 有距离的认同 → 普遍化
import { StepThrough, C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", GREEN = "#3d6b4a";

const NODES = [
  { x: 70, y: 70, t: "自爱", s: "amour de soi", c: RED },
  { x: 210, y: 70, t: "怜悯（沉睡）", s: "pitié", c: GOLD },
  { x: 350, y: 70, t: "想象力", s: "imagination", c: BLUE },
  { x: 490, y: 70, t: "有距离的认同", s: "知其苦，不必受其苦", c: GREEN },
  { x: 490, y: 175, t: "普遍化 → 正义", s: "推及全人类", c: GREEN },
  { x: 350, y: 175, t: "欲望 > 能力", s: "道德之爱、堕落", c: RED },
];
const EDGES = [[0, 1, "第一次偏转"], [1, 2, "唤醒"], [2, 3, "走出自己"], [3, 4, "概念/比较"], [2, 5, "同一能力"]];
const SHOW = [[0], [0, 1], [0, 1, 2], [0, 1, 2, 3], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5]];

const steps = [
  { label: "自爱", content: <p>一切激情的源头是<b>自爱</b>（amour de soi）：想保存自己，这是自然的、正当的（要和堕落形式「自尊/虚荣」amour-propre 区分）。动物也有。</p> },
  { label: "怜悯", content: <p><C id="pity">怜悯</C>不是另一条独立的河，而是自爱的<b>第一次偏转</b>：几乎和源头一样原初。卢梭说它像大自然/母亲的「温柔之声」，在自然状态中代替了法律与道德。德里达注意到：这里已经是<C id="supplement_logic">增补</C>的结构——怜悯「代替」法律，法律又「代替」怜悯。</p> },
  { label: "想象力唤醒", content: <p>《语言起源论》第九章：怜悯虽天生于人心，若没有<C id="imagination">想象力</C>把它激活，就会永远沉睡。斯塔罗宾斯基以为这与《论不平等》的「先于反思的怜悯」矛盾。德里达：不矛盾——唤醒它的是想象力而不是理性；怜悯天生，但只是潜能。用德里达的话说：想象力就是怜悯之「成为人」。</p> },
  { label: "保持距离", content: <p>被唤醒的怜悯要靠走出自己、认同受苦者——但不能完全认同：完全感同身受会把自己毁掉，而且也就认不出那是「他人」的痛苦。卢梭：要怜悯别人的不幸，必须知道它，却不必亲身感受它。真正的认同，恰恰需要一点不认同。</p> },
  { label: "普遍化", content: <p>只对眼前这一个人的怜悯可能变得不公（怜悯坏人就是对其他人残忍）。所以怜悯要借比较与概念推及全人类，才与正义一致。想象、时间（记忆与预期）、他人与概念，在这里是同一个「对不在场者的开放」。</p> },
  { label: "同一能力，两面", content: <p>唤醒怜悯的想象力，也是让欲望超出能力、催生「道德之爱」等一切堕落的同一种能力。它和对死亡的预知、和自由与可完善性连在一起。德里达：想象力就是<b>作为自我感发的延异</b>——善与恶出自同一处，没法干净分开。</p> },
];

export default function PityEconomy() {
  return <StepThrough steps={steps} render={i => (
    <svg viewBox="0 8 580 222" style={{ width: "100%", maxHeight: 260 }}>
      <defs><marker id="ch06arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={INK} opacity=".6" /></marker></defs>
      {EDGES.map(([a, b, l], k) => {
        const on = SHOW[i].includes(a) && SHOW[i].includes(b); if (!on) return null;
        const A = NODES[a], B = NODES[b], vert = A.x === B.x;
        const x1 = vert ? A.x : A.x + 58, y1 = vert ? A.y + 26 : A.y, x2 = vert ? B.x : B.x - 58, y2 = vert ? B.y - 26 : B.y;
        return <g key={k}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeOpacity=".55" strokeWidth="2" markerEnd="url(#ch06arr)" strokeDasharray={b === 5 ? "5 4" : "none"} />
          <text x={(x1 + x2) / 2 + (vert ? 8 : 0)} y={vert ? (y1 + y2) / 2 : A.y - 34} textAnchor={vert ? "start" : "middle"} fontSize="11" fill={INK} opacity=".7">{l}</text>
        </g>;
      })}
      {NODES.map((n, k) => {
        const on = SHOW[i].includes(k), cur = SHOW[i][SHOW[i].length - 1] === k;
        return <g key={k} opacity={on ? 1 : .12}>
          <rect x={n.x - 58} y={n.y - 26} width="116" height="52" rx="12" fill={cur ? n.c : "var(--paper)"} stroke={n.c} strokeWidth="2.2">
            {cur && <animate attributeName="opacity" values="1;.75;1" dur="1.8s" repeatCount="indefinite" />}
          </rect>
          <text x={n.x} y={n.y - 2} textAnchor="middle" fontSize="14" fontWeight="600" fill={cur ? "#fff" : INK}>{n.t}</text>
          <text x={n.x} y={n.y + 15} textAnchor="middle" fontSize="10.5" fill={cur ? "#fff" : INK} opacity=".8">{n.s}</text>
        </g>;
      })}
      {i === 1 && <text x="210" y="125" textAnchor="middle" fontSize="20">💤</text>}
    </svg>)} />;
}
