// 第 7 章专属图解 (a)：编码 → 超编码。原始领土机器的横向联姻网，专制君主降临后被拉向中心、加上一层超编码网，有限债务变成无限债务。
import { useState, useEffect } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", INK = "#1f1b16", EARTH = "#8a6a3c";
const CX = 320, CY = 235;
const NAMES = ["鹰氏族", "蛇氏族", "河边村", "山地村", "鹿氏族", "林中村"];
const V = NAMES.map((n, k) => {
  const a = (Math.PI / 180) * (k * 60 - 90 + 30);
  return { n, x: CX + 225 * Math.cos(a), y: CY + 120 * Math.sin(a) };
});
const EDGES = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3], [1, 4]];

const STAGES = [
  {
    label: "原始领土机器",
    title: "许多张横向的网，每张都有自己的编码",
    text: <>每个氏族、村落都有自己的规矩（谁能娶谁、礼物怎么流、谁欠谁）。它们靠横向的<C id="debt_blocks">联姻债务</C>彼此缠绕：债是一块一块的，有限、会移动、能还清。整张网铺在<b>大地</b>这个满盈身体上，没有中心。</>,
    stats: ["满盈身体：大地", "编码：多个地方编码", "债务：有限、可移动"],
  },
  {
    label: "专制君主降临",
    title: "从外面、从「沙漠」来的人：新联姻 + 直接血缘",
    text: <>征服者像闪电一样出现。他自称与神直接相连（<b>直接血缘</b>），并跟所有人立下一份<b>新联姻</b>：「你们都通过我连接」。旧的横向网没被拆掉，只是不再起决定作用（变灰）。见 <C id="new_alliance">新联姻与直接血缘</C>。</>,
    stats: ["满盈身体：君主的身体", "编码：地方编码仍在", "债务：开始流向中心"],
  },
  {
    label: "超编码",
    title: "旧编码不废除，而是被「砌」进一张更高的网",
    text: <>村落照样生产、照样按老规矩过日子，但它们被重新标号、登记、征发，成了国家这台「巨型机器」里的<b>砖块</b>。这就是 <C id="overcoding">超编码</C>：在编码之上再编一层码，一切流都被挤进同一个瓶颈。</>,
    stats: ["满盈身体：君主的身体", "编码：地方编码 + 超编码", "债务：贡赋"],
  },
  {
    label: "无限债务",
    title: "所有债都汇成一条大河，流向君主，永远还不完",
    text: <>横向的债务块被收编为对君主的<C id="infinite_debt">无限债务</C>：贡赋、税、徭役，最后连「你能活着」本身都成了欠他的。货币首先不是为了做买卖，而是为了收税、让债务无限下去。</>,
    stats: ["满盈身体：君主的身体", "编码：超编码统摄一切", "债务：∞（存在之债）"],
  },
];

function Village({ v, s }) {
  const brick = s >= 2;
  return <g>
    <circle cx={v.x} cy={v.y} r="26" fill="#f3e7cf" stroke={EARTH} strokeWidth="2" style={{ opacity: brick ? 0 : 1, transition: "opacity .6s" }} />
    <rect x={v.x - 34} y={v.y - 20} width="68" height="40" rx="3" fill="#e9d8c4" stroke={RED} strokeWidth="2" style={{ opacity: brick ? 1 : 0, transition: "opacity .6s" }} />
    {brick && <>
      <line x1={v.x - 34} y1={v.y} x2={v.x + 34} y2={v.y} stroke={RED} strokeWidth=".8" opacity=".5" />
      <line x1={v.x} y1={v.y - 20} x2={v.x} y2={v.y} stroke={RED} strokeWidth=".8" opacity=".5" />
    </>}
    <text x={v.x} y={v.y + 5} textAnchor="middle" fontSize="12" fill={INK}>{v.n}</text>
  </g>;
}

// 用 JS 驱动的时钟（比 SMIL 更稳定）
function useClock() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf, t0 = performance.now();
    const f = now => { setT((now - t0) / 1000); raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, []);
  return t;
}
const lerp = (p, q, u) => [p.x + (q.x - p.x) * u, p.y + (q.y - p.y) * u];
const DebtBlock = ({ at }) => <rect x={at[0] - 5} y={at[1] - 5} width="10" height="10" fill={GOLD} stroke={INK} strokeWidth=".8" />;

export default function Overcoding() {
  const [s, setS] = useState(0), st = STAGES[s];
  const t = useClock();
  const despot = s >= 1;
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <style>{`@keyframes ch07drop{from{transform:translate(260px,-200px);opacity:0}to{transform:none;opacity:1}}
        @keyframes ch07fade{from{opacity:0}to{opacity:1}}`}</style>
      <div className="seg">{STAGES.map((x, j) =>
        <button key={j} className={s === j ? "on" : ""} onClick={() => setS(j)}>{j + 1}. {x.label}</button>)}</div>
      <svg key={s} viewBox="0 0 640 400" style={{ width: "100%", maxHeight: 420, background: "var(--paper)", borderRadius: 14 }}>
        {/* 满盈身体：大地 */}
        <ellipse cx={CX} cy={CY + 10} rx="300" ry="165" fill={EARTH} opacity={despot ? .05 : .14} style={{ transition: "opacity .6s" }} />
        <text x="24" y="390" fontSize="12" fill={EARTH}>{despot ? "大地被剥夺：只是被分割、被占有的对象" : "满盈身体 = 大地"}</text>

        {/* 超编码网 */}
        {s >= 2 && <g style={{ animation: "ch07fade .8s" }} opacity=".35">
          {Array.from({ length: 13 }, (_, i) => <line key={"v" + i} x1={40 + i * 46.6} y1="95" x2={40 + i * 46.6} y2="375" stroke={RED} strokeDasharray="3 5" />)}
          {Array.from({ length: 7 }, (_, i) => <line key={"h" + i} x1="40" y1={95 + i * 46.6} x2="600" y2={95 + i * 46.6} stroke={RED} strokeDasharray="3 5" />)}
        </g>}
        {s >= 2 && <text x="600" y="90" textAnchor="end" fontSize="12" fill={RED}>超编码之网（登记 · 户籍 · 账簿）</text>}

        {/* 横向联姻 */}
        {EDGES.map(([a, b], i) => {
          const p = V[a], q = V[b];
          return <g key={i}>
            <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={despot ? "#b9ad9a" : GOLD} strokeWidth={despot ? 1.5 : 3} style={{ transition: "all .6s" }} />
            {s === 0 && (() => { const d = 2.4 + (i % 3) * .7, ph = ((t + i * .37) % d) / d; return <DebtBlock at={lerp(p, q, ph < .5 ? ph * 2 : 2 - ph * 2)} />; })()}
          </g>;
        })}

        {/* 新联姻：每个村都直接连到君主 */}
        {despot && V.map((v, i) => <line key={"n" + i} x1={v.x} y1={v.y} x2={CX} y2={CY} stroke={RED} strokeWidth="2.5" style={{ animation: "ch07fade 1s" }} />)}

        {/* 无限债务：块只流向中心 */}
        {s === 3 && V.map((v, i) => [0, 1].map(k =>
          <DebtBlock key={i + "-" + k} at={lerp(v, { x: CX, y: CY }, ((t + k * 1.1 + i * .15) % 2.2) / 2.2)} />))}

        {V.map((v, i) => <Village key={i} v={v} s={s} />)}

        {/* 君主 + 直接血缘 */}
        {despot && <g style={{ animation: s === 1 ? "ch07drop 1.1s ease-out" : "none" }}>
          <line x1={CX} y1={CY - 30} x2={CX} y2="48" stroke={RED} strokeWidth="3" strokeDasharray="6 4" />
          <text x={CX + 8} y="80" fontSize="12" fill={RED}>直接血缘：君主 ↔ 神</text>
          <circle cx={CX} cy="34" r="18" fill="#fff6dc" stroke={GOLD} strokeWidth="2" />
          <text x={CX} y="40" textAnchor="middle" fontSize="16">☀️</text>
          <circle cx={CX} cy={CY} r="30" fill={RED} />
          <text x={CX} y={CY + 7} textAnchor="middle" fontSize="20">👑</text>
          <text x={CX} y={CY + 50} textAnchor="middle" fontSize="12" fill={RED} fontWeight="bold">专制君主</text>
        </g>}
        {s === 3 && <g style={{ animation: "ch07fade 1s" }}>
          <rect x={CX + 38} y={CY - 18} width="96" height="36" rx="8" fill="#fff" stroke={RED} />
          <text x={CX + 86} y={CY + 6} textAnchor="middle" fontSize="15" fill={RED}>欠君主：∞</text>
        </g>}
        {s === 0 && <text x={CX} y={CY + 5} textAnchor="middle" fontSize="13" fill={EARTH} opacity=".8">（没有中心）</text>}
      </svg>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {st.stats.map((t, i) => <span key={i} style={{ fontSize: 13, padding: "3px 10px", borderRadius: 99, border: "1px solid var(--line)", background: s ? "#fbefea" : "#f6efdf" }}>{t}</span>)}
      </div>
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20, marginBottom: 4 }}>{st.title}</div>
        <p style={{ margin: 0 }}>{st.text}</p>
      </div>
      <div className="st-ctrl" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button disabled={s === 0} onClick={() => setS(s - 1)}>← 上一步</button>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>{s + 1} / {STAGES.length} · 村名、连线数量均为示意</span>
        <button disabled={s === STAGES.length - 1} onClick={() => setS(s + 1)}>{s === 0 ? "专制君主降临 →" : "下一步 →"}</button>
      </div>
    </div>);
}
