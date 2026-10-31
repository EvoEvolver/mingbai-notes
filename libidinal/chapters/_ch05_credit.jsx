// 第 5 章专属图解：同一笔信用货币的三种功能（稳态 / 再生产 / 投机 1921、1929）
// 数据全部取自原文（利奥塔转引 J. Néré《1929 年危机》），不补充原文以外的数字。
import { useEffect, useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", MUTED = "#6b6257", LINE = "#d9cdb6";
const CX = 190, CY = 140;

const MODES = [
  {
    key: "pay", btn: "① 支付货币 · 稳态", title: "清偿之零：C—M—C", color: BLUE,
    stations: ["商品 C", "货币 M", "商品 C′", "需要得到满足"],
    zero: "清偿之零（商品标准 u）", time: "循环时间：每一轮回到同一个 u",
    text: "亚里士多德的家政交换：货币只是中介，用来把两边的物品与需要「抵消」干净。系统像控制论里的稳态回路，任何扰动都被测量、翻译成信息、再归零。这就是斯拉法「标准商品」做的事。",
    eg: "卖出多余的谷物、换回所需的油：货币在中间一闪而过，交换以家庭需要为限，不会无限扩张。",
    concept: "concentratory_zero",
  },
  {
    key: "repro", btn: "② 再生产信用 · 增殖", title: "无之预付：M 先行，新商品后到", color: GOLD,
    stations: ["银行预付 M", "买进生产手段", "俘获新能量区 → 新商品", "售出 · 清偿"],
    zero: "仍是清偿之零，只是单位在增长（u → Δu）", time: "可逆的循环时间：未来与过去同构，债权人可以「买下未来」",
    text: "企业主必须先花钱后挣钱：信用就是把「尚不存在的财富」提前做成手段，好让它真的出现。贷款有中长期、有生产义务、利率挂钩平均利润——这笔「无」最终要被新商品兑现，所以仍然服从清偿之零，只是一轮比一轮大。",
    eg: "地主借给佃户种子（semence），按来年收成结算：这里还有季节这座独立的「宇宙时钟」；发达的工业生产连这座钟也没有了。",
    concept: "reproductive_credit",
  },
  {
    key: "1921", btn: "③ 投机用法 · 1921", title: "货币失忆：迷宫时间", color: RED,
    stations: ["银行预付 M", "买进生产手段", "俘获新能量区 → 新商品", "售出 · 清偿"],
    zero: "参照单位崩塌：没有可以「归零」的标准", time: "迷宫时间：有多少次交换就有多少个时间，彼此不连续",
    text: "美国为保卫美元收紧贸易信用，中欧失去稳定的参照单位（黄金或盯住黄金的美元）。每一次拿到钞票都是一场必须逃离的事件：M—C—M 被倒转回 C—M—C，人只想要奶酪，不想要钱。",
    eg: "凯恩斯笔下的莫斯科杂货商：卖掉一磅奶酪，抓着卢布拼命跑到中央市场，赶在它贬值之前再换回奶酪。",
    concept: "labyrinth_time",
  },
  {
    key: "1929", btn: "④ 投机用法 · 1929", title: "华尔街：没有循环，只有涨落与反转", color: RED,
    stations: ["银行预付 M", "买进生产手段", "俘获新能量区 → 新商品", "售出 · 清偿"],
    zero: "征服之零：利润不再折算成生产", time: "掠夺的时间：没有周期，只有不可预测的趋势与反转",
    text: "证券不再被当作「生产手段的符号」，而像黄金一样被争夺：一阵抢购就抬高价格，嫉妒一旦反转就变成清盘。随时可收回的 call loan 让信用的可置换性达到最大。最要命的是：本该投入再生产的企业营运资本，也自己跑来「玩」。",
    eg: "一个经纪人得了「内幕消息」，当场拿到一张见票即付的借据，约好赚了就分成——这笔钱不经过任何生产周期。",
    concept: "speculation_mercantilism",
  },
];

const ringPath = r => `M ${CX} ${CY - r} A ${r} ${r} 0 1 1 ${CX} ${CY + r} A ${r} ${r} 0 1 1 ${CX} ${CY - r}`;
const advancePath = r => `M ${CX} ${CY} L ${CX} ${CY - r} A ${r} ${r} 0 1 1 ${CX} ${CY + r} A ${r} ${r} 0 1 1 ${CX} ${CY - r} L ${CX} ${CY}`;

// 1921：散落的、互不相通的小圆圈（原文借色彩失忆症：不再是一个色环，而是许多互不沟通的小圆）
const LAB = [[250, 140], [292, 72], [330, 205], [372, 58], [404, 228], [446, 96], [472, 196], [512, 52], [534, 236], [566, 112], [590, 206], [624, 40]];
// 1929：上涨的锯齿 → 顶点 → 崩落
const BUBBLE = [[250, 140], [282, 160], [310, 120], [338, 138], [368, 96], [396, 112], [428, 70], [456, 84], [490, 44], [516, 56], [540, 30], [560, 250], [600, 262]];
const sx = x => Math.round(CX + 90 + (x - 250) * 350 / 374);
const poly = pts => "M " + pts.map(([x, y]) => sx(x) + " " + y).join(" L ");

function Diagram({ m, lap }) {
  const spec = m.key === "1921" || m.key === "1929";
  const r = m.key === "repro" ? 62 + (lap % 6) * 7 : 90;
  const sr = spec ? 90 : r;
  const st = [[CX, CY - sr - 14, "middle"], [CX + sr + 8, CY + 4, "start"], [CX, CY + sr + 22, "middle"], [CX - sr - 8, CY + 4, "end"]];
  const pts = m.key === "1921" ? LAB : BUBBLE;
  return (
    <svg viewBox="0 0 640 290" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
      {/* 中心：零 */}
      <circle cx={CX} cy={CY} r="24" fill={INK} opacity={spec ? .35 : .9} />
      <text x={CX} y={CY + 7} textAnchor="middle" fontSize="20" fill="#fff" fontFamily="var(--serif)">0</text>
      {/* 循环 */}
      <path d={ringPath(sr)} fill="none" stroke={spec ? LINE : m.color} strokeWidth={spec ? 2 : 3}
        strokeDasharray={spec ? "6 6" : "none"} style={{ transition: "all .6s" }} />
      {m.key === "repro" && lap > 0 && [...Array(Math.min(lap % 6, 5))].map((_, k) =>
        <circle key={k} cx={CX} cy={CY} r={62 + k * 7} fill="none" stroke={GOLD} strokeWidth="1" opacity=".3" />)}
      {st.map(([x, y, a], i) => spec && i === 1 ? null : (
        <text key={i} x={x} y={y} textAnchor={a} fontSize="12" fill={spec ? MUTED : INK} opacity={spec ? .6 : 1}>
          {m.stations[i]}
        </text>))}

      {/* 稳态：硬币绕圈 */}
      {m.key === "pay" && <circle r="9" fill={BLUE}>
        <animateMotion dur="4s" repeatCount="indefinite" path={ringPath(90)} />
      </circle>}

      {/* 再生产：从中心预付出去，绕一圈，回到中心清偿 */}
      {m.key === "repro" && <g key={"lap" + lap}>
        <circle r="9" fill={GOLD} stroke="#fff" strokeWidth="2">
          <animateMotion dur="4s" repeatCount="1" fill="freeze" path={advancePath(r)} />
        </circle>
        <text x={CX} y="284" textAnchor="middle" fontSize="12" fill={MUTED}>第 {lap + 1} 轮 · 单位 u{lap % 6 ? ` +${lap % 6}Δ` : ""}</text>
      </g>}
      {m.key === "repro" && <text x="370" y="70" fontSize="13" fill={INK}>
        <tspan x="370" dy="0">信用 = 尚不存在的财富的预付，</tspan>
        <tspan x="370" dy="22">为的是让它存在。</tspan>
        <tspan x="370" dy="30" fill={MUTED}>每一轮都必须被新商品「兑现」，</tspan>
        <tspan x="370" dy="22" fill={MUTED}>回到中心的零：循环变大，</tspan>
        <tspan x="370" dy="22" fill={MUTED}>但仍是同一个循环。</tspan>
      </text>}

      {/* 投机：脱离循环，加速漂移 */}
      {spec && <g key={m.key}>
        <path d={poly(pts)} fill="none" stroke={RED} strokeWidth="1.5" opacity=".35" />
        {m.key === "1921" && LAB.slice(1).map(([x, y], i) =>
          <circle key={i} cx={sx(x)} cy={y} r={10 + (i % 3) * 4} fill="none" stroke={RED} strokeWidth="1.5" opacity=".5">
            <animate attributeName="opacity" values=".6;.1;.6" dur={`${1.2 + (i % 4) * .3}s`} repeatCount="indefinite" />
          </circle>)}
        {m.key === "1929" && <>
          <text x="545" y="22" fontSize="12" fill={RED}>1929.10.24 / 29</text>
          <text x="500" y="282" fontSize="12" fill={MUTED}>反转：清盘</text>
        </>}
        <circle r="8" fill={RED} stroke="#fff" strokeWidth="2">
          <animateMotion dur="3.2s" repeatCount="indefinite" path={poly(pts)}
            calcMode="linear" keyTimes="0;0.45;0.75;0.9;1" keyPoints="0;0.15;0.4;0.7;1" />
        </circle>
        <text x={CX + 96} y="168" fontSize="12" fill={RED}>脱离循环 →</text>
      </g>}
    </svg>);
}

// —— 1921：纸马克 / 金马克（对数刻度）——
const MARK = [["1920.12", 17], ["1921.12", 46], ["1922.12", 1778], ["1923.06", 45000], ["1923.08", 1000000]];
const fmt = v => v.toLocaleString("zh-CN");

function Inflation({ step }) {
  const W = 520, H = 205, base = 175, bw = 62;
  const shown = Math.min(step, MARK.length);
  const cur = MARK[Math.max(shown - 1, 0)];
  return <div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
      <span style={{ fontSize: 14, color: "var(--muted)" }}>{cur[0]} · 1 金马克 =</span>
      <b style={{ fontFamily: "var(--serif)", fontSize: 34, color: "var(--ink)" }}>{fmt(cur[1])}</b>
      <span style={{ fontSize: 14, color: "var(--muted)" }}>纸马克</span>
    </div>
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: 560 }}>
      {[1, 2, 3, 4, 5, 6].map(k => <g key={k}>
        <line x1="50" x2={W - 10} y1={base - k * 25} y2={base - k * 25} stroke={LINE} strokeWidth=".6" />
        <text x="44" y={base - k * 25 + 4} textAnchor="end" fontSize="10" fill={MUTED}>{fmt(10 ** k)}</text>
      </g>)}
      <line x1="50" x2={W - 10} y1={base} y2={base} stroke={MUTED} strokeWidth="1" />
      {MARK.map(([lab, v], i) => {
        const h = Math.log10(v) * 25, x = 70 + i * 88, on = i < shown;
        return <g key={lab}>
          <title>{`${lab}：1 金马克 = ${fmt(v)} 纸马克`}</title>
          <rect x={x} y={on ? base - h : base} width={bw} height={on ? h : 0} rx="4" fill={RED}
            style={{ transition: "all .5s" }} />
          <rect x={x - 8} y="0" width={bw + 16} height={base} fill="transparent" />
          {on && <text x={x + bw / 2} y={base - h - 6} textAnchor="middle" fontSize="11" fill={INK}>{fmt(v)}</text>}
          <text x={x + bw / 2} y={base + 16} textAnchor="middle" fontSize="11" fill={MUTED}>{lab}</text>
        </g>;
      })}
      <text x="50" y={H - 2} fontSize="10" fill={MUTED}>纵轴为对数刻度：每一格 ×10</text>
    </svg>
  </div>;
}

function Cheesemonger() {
  return <svg viewBox="0 0 520 70" style={{ width: "100%", maxWidth: 560 }}>
    <text x="10" y="44" fontSize="26">🧀</text>
    <text x="460" y="44" fontSize="26">🧀</text>
    <text x="40" y="64" fontSize="10" fill={MUTED}>卖出一磅奶酪</text>
    <text x="420" y="64" fontSize="10" fill={MUTED}>中央市场：换回奶酪</text>
    <line x1="50" x2="450" y1="38" y2="38" stroke={LINE} strokeDasharray="4 5" />
    <g>
      <animateTransform attributeName="transform" type="translate" values="0 0;380 0" dur="2.4s" repeatCount="indefinite" />
      <text x="50" y="30" fontSize="22">🏃</text>
      <text x="76" y="30" fontSize="13" fill={RED} fontWeight="700">₽
        <animate attributeName="opacity" values="1;.1" dur="2.4s" repeatCount="indefinite" />
      </text>
    </g>
  </svg>;
}

// —— 1929：给经纪人的贷款（百万美元），银行 vs 非银行来源 ——
const LOANS = [["1924.12.31", 2230, 550], ["1927.12.31", 4430, 1830], ["1928.12.31", 6440, 3885], ["1929.10.04", 8525, 6440]];

function BrokerLoans() {
  const W = 520, H = 210, base = 170, max = 9000, bw = 70;
  const y = v => base - v / max * 150;
  return <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: 560 }}>
    {[0, 3000, 6000, 9000].map(v => <g key={v}>
      <line x1="56" x2={W - 10} y1={y(v)} y2={y(v)} stroke={LINE} strokeWidth=".6" />
      <text x="50" y={y(v) + 4} textAnchor="end" fontSize="10" fill={MUTED}>{fmt(v)}</text>
    </g>)}
    {LOANS.map(([lab, tot, nb], i) => {
      const x = 80 + i * 110, bank = tot - nb;
      return <g key={lab}>
        <title>{`${lab}：经纪人贷款共 ${fmt(tot)} 百万美元，其中非银行来源 ${fmt(nb)}（${Math.round(nb / tot * 100)}%）`}</title>
        <rect x={x} y={y(bank)} width={bw} height={base - y(bank)} rx="0" fill={GOLD} />
        <rect x={x} y={y(tot)} width={bw} height={y(bank) - y(tot) - 2} rx="4" fill={RED} />
        <text x={x + bw / 2} y={y(tot) - 6} textAnchor="middle" fontSize="11" fill={INK}>{fmt(tot)}</text>
        <text x={x + bw / 2} y={y(bank) - y(tot) > 20 ? y(tot) + 14 : y(tot) - 20} textAnchor="middle" fontSize="11" fill={y(bank) - y(tot) > 20 ? "#fff" : RED} fontWeight="700">{Math.round(nb / tot * 100)}%</text>
        <text x={x + bw / 2} y={base + 16} textAnchor="middle" fontSize="11" fill={MUTED}>{lab}</text>
      </g>;
    })}
    <rect x="60" y={H - 14} width="10" height="10" rx="2" fill={RED} />
    <text x="76" y={H - 5} fontSize="11" fill={INK}>非银行来源（多为工商企业的营运资本）</text>
    <rect x="320" y={H - 14} width="10" height="10" rx="2" fill={GOLD} />
    <text x="336" y={H - 5} fontSize="11" fill={INK}>银行来源</text>
  </svg>;
}

const Stat = ({ k, v, note }) => <div style={{ background: "var(--paper)", borderRadius: 12, padding: "8px 12px", minWidth: 150 }}>
  <div style={{ fontSize: 12, color: "var(--muted)" }}>{k}</div>
  <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>{v}</div>
  {note && <div style={{ fontSize: 12, color: "var(--muted)" }}>{note}</div>}
</div>;

export default function CreditTwoUses() {
  const [i, setI] = useState(1);
  const [lap, setLap] = useState(0);
  const [step, setStep] = useState(1);
  const m = MODES[i];

  useEffect(() => {
    if (m.key !== "repro") return;
    setLap(0);
    const t = setInterval(() => setLap(l => l + 1), 4000);
    return () => clearInterval(t);
  }, [m.key]);
  useEffect(() => {
    if (m.key !== "1921") return;
    setStep(1);
    const t = setInterval(() => setStep(s => (s >= MARK.length + 2 ? 1 : s + 1)), 1100);
    return () => clearInterval(t);
  }, [m.key]);

  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div style={{ fontSize: 14, color: "var(--muted)" }}>同一笔信用货币 M，放进三种功能里：</div>
      <div className="seg">{MODES.map((x, j) =>
        <button key={x.key} className={i === j ? "on" : ""} onClick={() => setI(j)}>{x.btn}</button>)}</div>
      <Diagram m={m} lap={lap} />
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}><C id={m.concept}>{m.title}</C></div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "8px 0", fontSize: 14 }}>
          <span className="chip" style={{ cursor: "default" }}>零：{m.zero}</span>
          <span className="chip" style={{ cursor: "default" }}>时间：{m.time}</span>
        </div>
        <p style={{ margin: "6px 0" }}>{m.text}</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>📖 书中一例：{m.eg}</p>
      </div>

      {m.key === "1921" && <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14, display: "grid", gap: 10 }}>
        <b style={{ fontFamily: "var(--serif)" }}>价格表狂跳：中欧通胀（原文数据）</b>
        <Inflation step={step} />
        <Cheesemonger />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Stat k="美联储商业票据组合（百万美元）" v="435 → 1578" note="1918.6 → 1920.12，贴现欧洲汇票" />
          <Stat k="黄金储备比例（1921 初）" v="42.4%" note="法定下限 40%" />
          <Stat k="收缩之后" v="659 → 294" note="1921.12 → 1922.6：「稳住美元」" />
          <Stat k="美国贸易顺差（1922）" v="110 亿美元" note="原文：$11,000 million" />
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>
          利奥塔原作把这一段写作 1929；英译者指出莫斯科杂货商出自凯恩斯 1923 年的货币著作，改为 1921。悬停柱子看数值。
        </div>
      </div>}

      {m.key === "1929" && <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14, display: "grid", gap: 10 }}>
        <b style={{ fontFamily: "var(--serif)" }}>给经纪人的贷款：钱从哪里来？（百万美元，原文数据）</b>
        <BrokerLoans />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Stat k="纽约 call loan 利率" v="3.32% → 9.41%" note="1925.1 → 1929.7" />
          <Stat k="1925 初贴现率" v="柏林 10% · 纽约 3%" note="短期投向欧洲：投机，也可能是再生产" />
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>
          关键不在「坏投机者」：非银行来源的比例从约四分之一升到约四分之三，本该用于再生产的企业营运资本，自己跑去以最高利率借给股市。悬停柱子看数值。
        </div>
      </div>}
    </div>);
}
