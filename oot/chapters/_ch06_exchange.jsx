// 第 6 章专属图解（二）：交换如何创造价值 —— 两个人交换多余之物（据 Condillac / Turgot 的三种情形）
import { StepThrough, C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", INK = "#1f1b16", MUTED = "#6b6257";
const N = 8;

// 每个物件在第 s 步的位置与样式
const grid = (x0, k, row = Math.floor(k / 4)) => ({ x: x0 + (k % 4) * 34, y: 104 + row * 40 });
const recv = (x0, j) => ({ x: x0 + j * 28, y: 190 });   // 换来的东西排在第三行
function place(kind, k, s) {
  const mine = kind === "w" ? 40 : 430, theirs = kind === "w" ? 430 : 40;
  const home = { ...grid(mine, k), o: 1 };
  if (s === 0) return { ...home, o: k >= 5 ? .28 : 1 };
  if (s === 1) return k >= 5 ? { ...recv(theirs, k - 5), o: 1 } : home;
  if (s === 2) {
    if (kind === "w") return k >= 5 ? { ...recv(theirs, k - 5), o: 1 } : home;
    if (k === 7) return { x: 288, y: 250, o: 1 };          // 乙留下一捆柴，去找第三方
    return k >= 5 ? { ...recv(theirs, k - 5), o: 1 } : home;
  }
  if (s === 3) {
    const give = kind === "w" ? k >= 4 : k >= 3;          // 4 麦 ⇄ 5 柴
    return give ? { ...recv(theirs, kind === "w" ? k - 4 : k - 3), o: 1 } : home;
  }
  return { ...home, o: 0 };
}

const VALUES = [[5, 5], [8, 8], [7, 7]];   // 双方各自感到的「用处」（示意）

function Scene({ s }) {
  const items = [];
  ["w", "d"].forEach(kind => { for (let k = 0; k < N; k++) {
    const p = place(kind, k, s);
    items.push(<text key={kind + k} fontSize="24" textAnchor="middle"
      style={{ transform: `translate(${p.x + 12}px,${p.y}px)`, opacity: p.o, transition: "transform .9s cubic-bezier(.5,0,.2,1), opacity .6s" }}>
      {kind === "w" ? "🌾" : "🪵"}</text>);
  } });
  const v = VALUES[s];
  return <svg viewBox="0 0 600 280" style={{ width: "100%", maxHeight: 330, background: "var(--paper)", borderRadius: 14 }}>
    <text x="96" y="34" textAnchor="middle" fontSize="16" fill={INK} fontWeight="600">甲 · 只有小麦</text>
    <text x="486" y="34" textAnchor="middle" fontSize="16" fill={INK} fontWeight="600">乙 · 只有木柴</text>
    {items}
    {v && <g>
      {[0, 1].map(j => <g key={j} transform={`translate(${j ? 430 : 40},236)`}>
        <rect width="140" height="10" rx="5" fill="#e6dcc8" />
        <rect width={v[j] / 8 * 140} height="10" rx="5" fill={j ? GREEN : GOLD} style={{ transition: "width .8s" }} />
        <text y="28" fontSize="12" fill={MUTED}>{j ? "乙" : "甲"}感到的「用处」：{v[j]}</text>
      </g>)}
    </g>}
    {s === 0 && <g>
      <text x="96" y="62" textAnchor="middle" fontSize="12" fill={MUTED}>后 3 份吃不完：对甲而言几乎无价值</text>
      <text x="486" y="62" textAnchor="middle" fontSize="12" fill={MUTED}>后 3 捆用不上：对乙而言几乎无价值</text>
      <text x="300" y="140" textAnchor="middle" fontSize="14" fill={BLUE}>各自估价：物 ↔ 需要</text>
    </g>}
    {s === 1 && <g>
      <text x="300" y="120" textAnchor="middle" fontSize="15" fill={RED}>⇄ 多余换多余</text>
      <text x="300" y="144" textAnchor="middle" fontSize="12" fill={MUTED}>无用 → 有用，两边同时、等量创造价值</text>
    </g>}
    {s === 2 && <g>
      <text x="300" y="112" textAnchor="middle" fontSize="15" fill={RED}>3 麦 ⇄ 2 柴</text>
      <text x="300" y="134" textAnchor="middle" fontSize="12" fill={MUTED}>乙还缺麦，留下一捆柴去找丙</text>
      <text x="300" y="212" textAnchor="middle" fontSize="13" fill={BLUE}>丙（第三方）↓</text>
      <text x="300" y="162" textAnchor="middle" fontSize="14" fill={INK} fontWeight="600">讨价还价 → 价格诞生</text>
    </g>}
    {s === 3 && <g>
      <text x="300" y="98" textAnchor="middle" fontSize="12" fill={GOLD}>甲：5 柴 ＞ 4 麦（对我）</text>
      <text x="300" y="120" textAnchor="middle" fontSize="12" fill={GREEN}>乙：4 麦 ＞ 5 柴（对我）</text>
      <text x="300" y="150" textAnchor="middle" fontSize="16" fill={RED} fontWeight="600">4 麦 = 5 柴</text>
      <text x="300" y="170" textAnchor="middle" fontSize="12" fill={MUTED}>两个不等式 → 一个关系的等式</text>
      <text x="300" y="262" textAnchor="middle" fontSize="13" fill={INK}>双方都觉得「赚了」：各自得到的比让出的更有用</text>
    </g>}
    {s === 4 && <Mass />}
    {s === 5 && <TwoReadings />}
  </svg>;
}

// 第 5 步：新物品进入财富总量，旧物品的相对价值下降
function Mass() {
  const seg = [["🌾 小麦", 260, GOLD], ["🪵 木柴", 200, GREEN], ["💎 钻石·享乐之物", 0, BLUE]];
  return <g>
    <text x="300" y="58" textAnchor="middle" fontSize="13" fill={MUTED}>财富总量不变（宽度固定）</text>
    {[0, 1].map(row => {
      let x = 70; const ws = row ? [190, 150, 120] : [260, 200, 0];
      return <g key={row} transform={`translate(0,${row ? 170 : 90})`}>
        <text x="20" y="22" fontSize="12" fill={MUTED}>{row ? "之后" : "之前"}</text>
        {seg.map((sg, j) => { const r = <g key={j}>
          {ws[j] > 0 && <rect x={x} y="0" width={ws[j]} height="34" fill={sg[2]} opacity=".8" rx="4" />}
          {ws[j] > 0 && <text x={x + ws[j] / 2} y="22" textAnchor="middle" fontSize="12" fill="#fffdf8">{sg[0]}</text>}
        </g>; x += ws[j]; return r; })}
      </g>;
    })}
    <text x="300" y="236" textAnchor="middle" fontSize="13" fill={RED}>新的「用处」出现，旧物品各自让出一块：无用变有用，有用变得不那么有用</text>
  </g>;
}

// 第 6 步：同一段理论，两个方向
function TwoReadings() {
  return <g>
    <line x1="90" y1="150" x2="510" y2="150" stroke={INK} strokeWidth="3" />
    <circle cx="90" cy="150" r="8" fill={GREEN} /><circle cx="510" cy="150" r="8" fill={BLUE} />
    <text x="90" y="186" textAnchor="middle" fontSize="13" fill={GREEN}>给出之物：自然的剩余</text>
    <text x="510" y="186" textAnchor="middle" fontSize="13" fill={BLUE}>得到之物：需要与估价</text>
    <path d="M110 120 H490" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#a6g)" strokeDasharray="8 6">
      <animate attributeName="stroke-dashoffset" values="0;-28" dur="1.2s" repeatCount="indefinite" /></path>
    <text x="300" y="108" textAnchor="middle" fontSize="13" fill={GREEN}>重农学派：剩余 →（每一步都要付出消耗）→ 价值</text>
    <path d="M490 216 H110" stroke={BLUE} strokeWidth="2.5" markerEnd="url(#a6b)" strokeDasharray="8 6">
      <animate attributeName="stroke-dashoffset" values="0;-28" dur="1.2s" repeatCount="indefinite" /></path>
    <text x="300" y="244" textAnchor="middle" fontSize="13" fill={BLUE}>功利派：判断「有用」→（交换增加用处）→ 价格</text>
    <text x="90" y="80" textAnchor="middle" fontSize="12" fill={MUTED}>≈ 语法里的「词根」</text>
    <text x="510" y="80" textAnchor="middle" fontSize="12" fill={MUTED}>≈ 语法里的「命题/动词」</text>
    <defs>
      <marker id="a6g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill={GREEN} /></marker>
      <marker id="a6b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill={BLUE} /></marker>
    </defs>
  </g>;
}

const steps = [
  { label: "各自估价", content: <p>还没有价格、没有共同尺度。甲种麦、乙砍柴，是因为各自判断这东西<b>对我有用</b>——这就是 Turgot 说的「估价价值」：一物对一个孤立的人的需要而言值多少。注意：吃不完、用不上的那部分，对主人来说<b>没有价值</b>。</p> },
  { label: "情形一：恰好互补", content: <p>甲的多余正好是乙需要的，反之亦然。一交换，原本无用的东西在对方眼里变得完全有用：两边<b>同时、等量</b>地创造了价值，用处和「价钱」严丝合缝，用不着讨价还价。这是 <C id="utility">交换创造价值</C> 最纯粹的样子。</p> },
  { label: "情形二：一方不够", content: <p>甲多出 3 份麦，乙却需要 5 份。乙不会把多余的柴全给甲，而要留一点去和第三方换剩下的麦。被扣下的这一点引发了<b>讨价还价</b>：不再是「多余换多余」，而是「几捆柴换几斗麦」——<b>价格</b>由此出现。给得多的一方吃亏了吗？没有：既然肯换，他一定更看重得到的东西。</p> },
  { label: "情形三：谁都不多余", content: <p>双方的东西迟早都用得上。但甲盘算：5 捆柴对我比 4 斗麦更有用；乙恰好相反。两人各有一个<b>不等式</b>，交换发生在两个比例相等的那一点：「4 麦 = 5 柴」。这就是「评价价值」——两个人、四种利益的比较。交换的是<b>不等</b>：双方都得到了比原先更多的价值。</p> },
  { label: "交换也降低价值", content: <p>交换让钻石这种对饥民毫无用处的东西，只要世上有人想要，就成了主人的「间接财富」——所以奢侈品重要，需要、舒适和享乐在财富眼里没有区别。但在相互比较之中，每多一种新用处，<b>所有旧物的相对价值都会下降</b>，总量并不增加。交换给每样东西定价，也同时压低每样东西的价格。</p> },
  { label: "两种读法", content: <p>同一段理论可以从两头读。<C id="physiocrats">重农学派</C>从「给出之物」读：只有自然的剩余是真实的，每次交换都要消耗一部分货物，价值是货物的「负片」。<C id="utility">功利派</C>（Condillac、Galiani、Graslin）从「得到之物」读：需要和判断是起点，交换增加价值。福柯说：两派的要素一样，只是起点和方向相反——一方正面凸起的，在另一方是凹下去的模子。</p> },
];

export default function ExchangeSim() {
  return <StepThrough steps={steps} render={i => <Scene s={i} />} />;
}
