// 第 5 章专属图解（二）：增补链——一步步往回追「原初在场」，却永远到不了起点
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", MUTED = "#8a8070";

const CHAINS = {
  desire: {
    label: "💞 欲望之链（《忏悔录》）",
    color: RED,
    nodes: [
      { short: "危险的增补", sub: "想象中的在场", icon: "🌙",
        text: "卢梭晚年在《忏悔录》第十二卷交代：为了身体，也为了不让泰蕾兹再冒风险，他选择克制与泰蕾兹同居，而那个他「始终没能完全戒掉」的习惯，在他看来害处更小。想象中召来的在场，顶替了一个真实的女人。" },
      { short: "泰蕾兹", sub: "Thérèse Levasseur", icon: "👩",
        text: "可泰蕾兹本人就已经是替身。卢梭坦言：心里空了一块，「我需要一个妈妈的继任者」，在泰蕾兹身上找到了所需要的增补（supplément）。" },
      { short: "「妈妈」", sub: "华伦夫人 Mme de Warens", icon: "🏡",
        text: "华伦夫人被卢梭唤作「妈妈」，她叫他「小家伙」。这个称呼本身就标明：她在顶替一位母亲。卢梭亲吻她睡过的床、她走过的地板——在她不在场时，物件又成了她的替身。" },
      { short: "生母", sub: "卢梭出生后不久去世", icon: "🕯️",
        text: "常见的精神分析式解读追到这里就停下：真正的源头找到了——缺席的生母！德里达说：不，「真正的母亲」在某种意义上也已经是一种增补，从第一道踪迹起就是。" },
      { short: "自然 · 纯粹在场", sub: "？", icon: "❓", origin: true,
        text: "链条指向的终点——「自然」「真正的母亲」、不经任何中介的直接在场——从未作为在场出现过。它只是被整条替代链「事后」制造出来的海市蜃楼：直接性是派生的。" },
    ],
  },
  sign: {
    label: "🔤 符号之链（卢梭的语言理论）",
    color: BLUE,
    nodes: [
      { short: "文字", sub: "卢梭：言语的增补", icon: "✍️",
        text: "卢梭的公式：语言是用来说的，文字只是言语的增补；它是表征的表征，因而次要、外在、危险。" },
      { short: "言语", sub: "思想的约定符号", icon: "🗣️",
        text: "但按卢梭自己的说法，言语也只是用约定的符号去代表思想。言语已经是「替代」，只是比文字少一层。卢梭自己也体验到：当面说话会让他失真。" },
      { short: "内心的声音", sub: "自己对自己说", icon: "💭",
        text: "退到最内在处：在心里对自己说话，看似「自己触碰自己」、不经过世界。可这种自我感发（auto-affection）同样是靠符号把自己呈现给自己——已是一种分离与替代。" },
      { short: "思想本身 · 自我在场", sub: "？", icon: "❓", origin: true,
        text: "那个不需要任何符号、完全贴合自身的「在场」，正是形而上学想要的源头。德里达：它从未在符号链之外出现；言语本身已经是广义的「文字」。" },
    ],
  },
};

export default function SupplementChain() {
  const [c, setC] = useState("desire");
  const [k, setK] = useState(0);
  const ch = CHAINS[c], N = ch.nodes.length;
  const W = 680, gap = (W - 120) / (N - 1);
  const x = j => 60 + j * gap, Y = 125;
  const cur = ch.nodes[k];
  const atEnd = k === N - 1;
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{Object.entries(CHAINS).map(([id, v]) =>
        <button key={id} className={c === id ? "on" : ""} onClick={() => { setC(id); setK(0); }}>{v.label}</button>)}</div>
      <svg viewBox={`0 0 ${W} 235`} style={{ width: "100%", maxHeight: 280, background: "var(--paper)", borderRadius: 14 }}>
        <defs>
          <marker id="ch05arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={MUTED} /></marker>
        </defs>
        <text x="60" y="24" textAnchor="middle" fontSize="12" fill={MUTED}>此刻手里的替代品</text>
        <text x={W - 60} y="24" textAnchor="middle" fontSize="12" fill={MUTED}>「源头」？</text>
        <line x1="60" y1="34" x2={W - 60} y2="34" stroke={MUTED} strokeWidth="1" strokeDasharray="2 4" markerEnd="url(#ch05arr)" />
        {ch.nodes.map((n, j) => j < N - 1 && j < k &&
          <g key={c + "a" + j}>
            <line x1={x(j) + 34} y1={Y} x2={x(j + 1) - 34} y2={Y} stroke={ch.color} strokeWidth="2.5" strokeDasharray="7 5" markerEnd="url(#ch05arr)">
              <animate attributeName="stroke-dashoffset" values="24;0" dur="1s" repeatCount="indefinite" />
            </line>
            <text x={(x(j) + x(j + 1)) / 2} y={Y - 10} textAnchor="middle" fontSize="11" fill={ch.color}>替代了</text>
          </g>)}
        {ch.nodes.map((n, j) => {
          const shown = j <= k, on = j === k;
          if (!shown) return <g key={c + j} opacity=".35">
            <circle cx={x(j)} cy={Y} r="30" fill="none" stroke={MUTED} strokeDasharray="3 4" />
            <text x={x(j)} y={Y + 5} textAnchor="middle" fontSize="16" fill={MUTED}>?</text></g>;
          return <g key={c + j} style={{ cursor: "pointer" }} onClick={() => setK(j)}>
            {n.origin
              ? <circle cx={x(j)} cy={Y} r="32" fill="none" stroke={ch.color} strokeWidth="2.5" strokeDasharray="5 5">
                  <animate attributeName="r" values="32;40;32" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;.2;1" dur="2.4s" repeatCount="indefinite" />
                </circle>
              : <circle cx={x(j)} cy={Y} r="32" fill={on ? ch.color : "#fff"} stroke={ch.color} strokeWidth="2.5">
                  <animate attributeName="r" values="0;32" dur=".45s" fill="freeze" />
                </circle>}
            <text x={x(j)} y={Y + 7} textAnchor="middle" fontSize="20">{n.icon}</text>
            <text x={x(j)} y={Y + 54} textAnchor="middle" fontSize="13.5" fontWeight={on ? "bold" : "normal"} fill={INK}>{n.short}</text>
            <text x={x(j)} y={Y + 72} textAnchor="middle" fontSize="10.5" fill={MUTED}>{n.sub}</text>
          </g>;
        })}
        {atEnd && <g>
          <path d={`M${x(N - 1)},${Y - 42} C${x(N - 1) - 60},${Y - 95} ${x(0) + 60},${Y - 95} ${x(0)},${Y - 42}`} fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="6 5" markerEnd="url(#ch05arr)">
            <animate attributeName="stroke-dashoffset" values="44;0" dur="1.4s" repeatCount="indefinite" />
          </path>
          <text x={W / 2} y={Y - 58} textAnchor="middle" fontSize="12" fill={GOLD}>「源头」只是由这条链倒推出来的效果</text>
        </g>}
      </svg>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} className="seg">
        <button className="on" disabled={atEnd} style={{ opacity: atEnd ? .4 : 1 }} onClick={() => setK(Math.min(N - 1, k + 1))}>↶ 它又在替代谁？往回追一步</button>
        <button onClick={() => setK(0)}>重来</button>
      </div>
      <div style={{ borderLeft: `4px solid ${cur.origin ? GOLD : ch.color}`, paddingLeft: 12 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 19, marginBottom: 4 }}>{cur.icon} {cur.short} <span className="muted-it">{cur.sub}</span></div>
        <p style={{ margin: 0 }}>{cur.text}</p>
        {atEnd && <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 15 }}>
          结论：<C id="chain_of_supplements">增补链</C>没有第一环。每个「在场」都是替代的替代，所谓源头是被这条链制造出来的意义——这就是 <C id="differance">延异</C> 在卢梭生活与文本中的样子。</p>}
      </div>
    </div>);
}
