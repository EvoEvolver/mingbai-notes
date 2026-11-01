// 第 2 章专属图解（二）：内卷 vs 勤勉 —— 示意曲线 + 江南 1750 年代收入账本 + 欧洲的「更多劳动换同样面包」
import { useState } from "react";
import { C } from "@kit";

const INK = "var(--ink)", MUTED = "var(--muted)", CN = "var(--accent)", EU = "var(--blue)", LINE = "var(--line)";

/* ---------- ① 两种解读（示意曲线） ---------- */
const X0 = 64, X1 = 540, Y0 = 250, Y1 = 34, DMAX = 300, RMAX = 1.6;
const px = d => X0 + (d / DMAX) * (X1 - X0);
const py = r => Y0 - (r / RMAX) * (Y0 - Y1);
const huang = d => 1.35 * Math.exp(-d / 85);
const pomeranz = d => 1.38 - 0.0016 * d;
const MODES = [
  {
    key: "huang", label: "黄宗智：内卷化", f: huang, who: "involution",
    claim: "家里多出的劳动力（主要是妇女儿童）反正要吃饭，于是哪怕每天只多挣一点点也值得干——越干，每天的边际收入越低，最后远低于市场工资。",
    ev: ["18 世纪河南的工钱契约：夫妻一起受雇，现金工钱竟比丈夫单独受雇还少", "纺织女工收入按 17 世纪末（1690 年代）的价格估算"],
    below: "已低于男工市场工资：按黄宗智的逻辑，这份劳动只因为「不花钱」才被继续投入——这就是「内卷」。",
    above: "这一段还在市场工资以上，谁家都愿意干；问题在后面。",
  },
  {
    key: "pomeranz", label: "彭慕兰：与勤勉革命可比", f: pomeranz, who: "industrious_revolution",
    claim: "江南家庭并不把妇女的时间当作零成本：他们会花钱省劳力，妇女织布的收入在一年 200 多个工作日里都不低于男工的市场工资。",
    ev: ["家庭花钱买豆饼肥、买蜡烛、改穿好纺的棉布——愿意用钱换时间", "按 18 世纪中叶（1750 年代）价格重算，中等棉布的价格约为 17 世纪的近两倍"],
    below: "到了全年 300 天左右，边际收入才慢慢接近市场工资——和欧洲「勤勉革命」中多干活、多挣钱、多买东西的家庭差不多。",
    above: "仍在市场工资之上：多干一天确实多挣到「像样」的钱，而不是一点点零头。",
  },
];

function Curves() {
  const [m, setM] = useState(0), [d, setD] = useState(150);
  const M = MODES[m], r = M.f(d), other = MODES[1 - m];
  const path = f => Array.from({ length: 61 }, (_, i) => i * 5).map((x, i) => `${i ? "L" : "M"}${px(x).toFixed(1)},${py(f(x)).toFixed(1)}`).join("");
  return <div style={{ display: "grid", gap: 10 }}>
    <div className="seg" style={{ margin: 0 }}>{MODES.map((x, j) =>
      <button key={x.key} className={m === j ? "on" : ""} onClick={() => setM(j)}>{x.label}</button>)}</div>
    <svg viewBox="0 0 560 300" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
      <text x="548" y="22" textAnchor="end" fontSize="13" fill={CN} fontWeight="700">示意</text>
      {/* axes */}
      <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke={INK} />
      <line x1={X0} y1={Y0} x2={X0} y2={Y1 - 6} stroke={INK} />
      {[0, 100, 200, 300].map(t => <g key={t}><line x1={px(t)} y1={Y0} x2={px(t)} y2={Y0 + 5} stroke={INK} />
        <text x={px(t)} y={Y0 + 19} fontSize="12" textAnchor="middle" fill={MUTED}>{t}</text></g>)}
      <text x={(X0 + X1) / 2} y={Y0 + 40} fontSize="13" textAnchor="middle" fill={INK}>一年中投入的家庭劳动（天）</text>
      <text x="16" y={(Y0 + Y1) / 2} fontSize="13" textAnchor="middle" fill={INK} transform={`rotate(-90 16 ${(Y0 + Y1) / 2})`}>多干一天的收入</text>
      {/* 210 天工作年 */}
      <rect x={px(200)} y={Y1} width={px(210) - px(200)} height={Y0 - Y1} fill={CN} opacity=".07" />
      <text x={px(205)} y={Y1 + 12} fontSize="11" textAnchor="middle" fill={MUTED}>200–210 天</text>
      {/* wage line */}
      <line x1={X0} y1={py(1)} x2={X1} y2={py(1)} stroke={INK} strokeDasharray="6 5" />
      <text x={X1} y={py(1) - 6} fontSize="12" textAnchor="end" fill={INK}>男性雇工的市场日工资</text>
      {/* curves */}
      <path d={path(other.f)} fill="none" stroke={MUTED} strokeWidth="2" opacity=".35" />
      <path d={path(M.f)} fill="none" stroke={CN} strokeWidth="3.5" />
      {/* marker */}
      <line x1={px(d)} y1={Y0} x2={px(d)} y2={py(r)} stroke={CN} strokeDasharray="3 3" />
      <circle cx={px(d)} cy={py(r)} r="7" fill={r < 1 ? "var(--card)" : CN} stroke={CN} strokeWidth="3" />
      <text x={Math.min(px(d) + 10, X1 - 150)} y={r > 0.5 ? py(r) + 28 : py(r) - 12} fontSize="13" fill={CN} fontWeight="700">≈ {r.toFixed(2)} × 男工日工资</text>
    </svg>
    <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
      <span style={{ whiteSpace: "nowrap" }}>家庭劳动投入：<b>{d}</b> 天</span>
      <input type="range" min="10" max="300" step="5" value={d} onChange={e => setD(+e.target.value)} style={{ flex: 1, accentColor: "#9b2c1f" }} />
    </label>
    <div style={{ fontSize: 15 }}>
      <p style={{ margin: "0 0 6px" }}><b style={{ fontFamily: "var(--serif)" }}><C id={M.who}>{M.label}</C></b>：{M.claim}</p>
      <p style={{ margin: "0 0 6px", color: r < 1 ? CN : INK }}>▸ {r < 1 ? M.below : M.above}</p>
      <div style={{ fontSize: 13.5, color: MUTED }}>依据：{M.ev.join("；")}。</div>
    </div>
    <div style={{ fontSize: 12.5, color: MUTED }}>注：两条曲线的形状是为说明两种解读而画的示意，并非原书数据；灰线为另一种解读。真实数字见下一页签。</div>
  </div>;
}

/* ---------- ② 江南 1750 年代的账本（原文数据） ---------- */
const S = 18, BX0 = 196, BX1 = 540;
const bx = v => BX0 + (v / S) * (BX1 - BX0);
const ROWS = [
  { lab: "只纺纱", sub: "多为未成年女孩", v: 2.2, derived: true, note: "≈1.3 石米，约够成年妇女一半口粮（折两为本页按 12 两≈7.2 石推算）" },
  { lab: "母女养蚕织绸", sub: "母亲 + 9 岁女儿", v: 11.73, ext: 13.73, note: "11.73 两（按最高利率借本）；自有本钱则 13.73 两" },
  { lab: "纺纱 + 织布", sub: "一年 210 天", v: 12, note: "约 12 两 ≈ 7.2 石米，可养活一名成年妇女和至多五个小孩" },
  { lab: "只织布（买纱）", sub: "一年 210 天", v: 16.2, note: "16.2 两，比纺织合一或男工高出约 35%" },
];

function Ledger() {
  const [hi, setHi] = useState(null);
  const male = { cashLo: 2, cashHi: 5, total: 12 };
  const H = 52, top = 40;
  const yOf = i => top + i * H;
  const yMale = yOf(ROWS.length) + 10;
  return <div style={{ display: "grid", gap: 10 }}>
    <svg viewBox={`0 0 560 ${yMale + 74}`} style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
      <text x="14" y="22" fontSize="13" fill={INK} fontWeight="700">江南，18 世纪中叶 · 一年的收入（两银）</text>
      <text x="548" y="22" fontSize="11.5" textAnchor="end" fill={MUTED}>低价格情景</text>
      {[0, 3, 6, 9, 12, 15, 18].map(t => <g key={t}>
        <line x1={bx(t)} y1={top - 6} x2={bx(t)} y2={yMale + 40} stroke={LINE} />
        <text x={bx(t)} y={yMale + 56} fontSize="11.5" textAnchor="middle" fill={MUTED}>{t}</text></g>)}
      <text x={bx(9)} y={yMale + 71} fontSize="12" textAnchor="middle" fill={MUTED}>两 / 年</text>
      {ROWS.map((r, i) => {
        const y = yOf(i), on = hi === i;
        return <g key={i} onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)} onClick={() => setHi(on ? null : i)} style={{ cursor: "pointer" }}>
          <rect x="0" y={y - 4} width="560" height={H - 6} fill={on ? "rgba(155,44,31,.06)" : "transparent"} />
          <text x="14" y={y + 15} fontSize="14" fill={INK}>{r.lab}</text>
          <text x="14" y={y + 32} fontSize="11.5" fill={MUTED}>{r.sub}</text>
          {r.ext && <rect x={BX0} y={y + 4} width={bx(r.ext) - BX0} height="24" rx="4" fill={CN} opacity=".3" />}
          <rect x={BX0} y={y + 4} width={bx(r.v) - BX0} height="24" rx="4" fill={CN} opacity={r.derived ? .55 : .9}
            strokeDasharray={r.derived ? "4 3" : undefined} stroke={r.derived ? CN : "none"} />
          <text x={bx(r.ext || r.v) + 6} y={y + 21} fontSize="13" fill={INK} fontWeight="700">
            {r.derived ? "≈" : ""}{r.v}{r.ext ? ` / ${r.ext}` : ""}{r.derived ? "（推算）" : ""}</text>
        </g>;
      })}
      {/* 男工参照 */}
      <g>
        <text x="14" y={yMale + 15} fontSize="14" fill={INK}>男性农业雇工</text>
        <text x="14" y={yMale + 32} fontSize="11.5" fill={MUTED}>按全年 12 个月都有活</text>
        <rect x={BX0} y={yMale + 4} width={bx(male.total) - BX0} height="24" rx="4" fill="none" stroke={INK} strokeDasharray="5 4" />
        <rect x={bx(male.cashLo)} y={yMale + 4} width={bx(male.cashHi) - bx(male.cashLo)} height="24" rx="4" fill="var(--gold)" opacity=".85" />
        <text x={bx(male.cashLo) + 4} y={yMale + 21} fontSize="11.5" fill="#fff">现金 2–5</text>
        <text x={bx(male.total) + 6} y={yMale + 21} fontSize="13" fill={INK} fontWeight="700">≈12（含伙食，推算）</text>
      </g>
      <line x1={bx(male.total)} y1={top - 6} x2={bx(male.total)} y2={yMale + 40} stroke={INK} strokeDasharray="2 4" opacity=".6" />
    </svg>
    <div style={{ fontSize: 14.5, minHeight: 24 }}>
      {hi !== null ? <span><b>{ROWS[hi].lab}</b>：{ROWS[hi].note}</span>
        : <span style={{ color: MUTED }}>悬停或点一行看说明。虚线竖线 = 男性雇工最好情形的全年收入。</span>}
    </div>
    <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.7 }}>
      数据：彭慕兰据潘敏德的农家预算与本书附录 E 估算（江南，1750 年代前后）。他故意对男工做了偏高的假设（全年 12 个月有活、伙食全包），
      对女工做了偏低的假设（一年只做 200–210 天、取较低的价格序列、母女组按月息 10% 借本）。男工：按日/月受雇最多约 5 两现金外加部分伙食；
      做长工则伙食全包、现金 2–4 两。「≈12」由原文两句话推得：纺织合一的 12 两「略高于」男工区间中点，只织布的 16.2 两比男工高约 35%。
      会织布的妇女扣除自身口粮后的剩余，是男工的 1.6–3 倍。
    </div>
  </div>;
}

/* ---------- ③ 欧洲：更多劳动换同样的面包 ---------- */
function Europe() {
  const bx2 = h => 150 + (h / 140) * 380;
  return <div style={{ display: "grid", gap: 10 }}>
    <svg viewBox="0 0 560 210" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
      <text x="14" y="22" fontSize="13" fill={INK} fontWeight="700">斯特拉斯堡：四口之家买一个月小麦需要的体力劳动（小时）</text>
      {[0, 20, 40, 60, 80, 100, 120, 140].map(t => <g key={t}>
        <line x1={bx2(t)} y1="40" x2={bx2(t)} y2="160" stroke={LINE} />
        <text x={bx2(t)} y="176" fontSize="11.5" textAnchor="middle" fill={MUTED}>{t}</text></g>)}
      <line x1={bx2(100)} y1="36" x2={bx2(100)} y2="160" stroke={INK} strokeDasharray="5 4" />
      <text x={bx2(100)} y="194" fontSize="11.5" textAnchor="middle" fill={INK}>100 小时线</text>
      <text x="14" y="70" fontSize="14" fill={INK}>1400–1500</text>
      <rect x={bx2(40)} y="54" width={bx2(100) - bx2(40)} height="24" rx="4" fill={EU} opacity=".25" />
      <rect x={bx2(60)} y="54" width={bx2(80) - bx2(60)} height="24" rx="4" fill={EU} />
      <text x={bx2(40) + 4} y="94" fontSize="11.5" fill={MUTED}>波动 40–100；通常 60–80</text>
      <text x="14" y="128" fontSize="14" fill={INK}>1540 年起</text>
      <text x="14" y="144" fontSize="11.5" fill={MUTED}>约三个世纪</text>
      <rect x={bx2(100)} y="114" width={bx2(136) - bx2(100)} height="24" fill={EU} />
      <path d={`M${bx2(136)},108 L${bx2(141)},126 L${bx2(136)},144 Z`} fill={EU} />
      <text x={bx2(100) - 6} y="131" fontSize="12" textAnchor="end" fill={EU} fontWeight="700">始终 &gt;100</text>
    </svg>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 8, fontSize: 14 }}>
      {[
        ["法国整体", "直到 1880 年代，一个月的口粮才重新能用 100 小时以内的劳动买到。"],
        ["德意志", "工资的谷物购买力在 1500–1650 年间下降约 50%。"],
        ["巴黎", "人均面包消费在 1637–1854 年间没有长期上升趋势。"],
        ["法兰克福", "有足够财产成为市民的男子比例：1723 年 75% → 1811 年约 33%。"],
      ].map(([a, b]) => <div key={a} style={{ borderLeft: "3px solid var(--blue)", paddingLeft: 8 }}><b style={{ color: EU }}>{a}</b>　{b}</div>)}
    </div>
    <div style={{ fontSize: 14.5 }}>
      这正是德弗里斯所说的<C id="industrious_revolution">「勤勉革命」</C>的另一面：1500–1800 年欧洲产出的增长，主要靠投入更多劳动而不是生产率突破；
      而 Levine 等人研究的<b>原始工业化</b>地区，工资下滑逼人干得更久，同样是一种「内卷」。彭慕兰据此说：要把「内卷的中国」与「勤勉的欧洲」对立起来，证据并不支持。
    </div>
  </div>;
}

const TABS = [
  { label: "① 两种解读（示意）", el: <Curves /> },
  { label: "② 江南 1750 年代的账本", el: <Ledger /> },
  { label: "③ 欧洲也在「多干活」", el: <Europe /> },
];

export default function InvolutionLab() {
  const [t, setT] = useState(0);
  return <div className="card" style={{ display: "grid", gap: 12 }}>
    <div className="seg" style={{ margin: 0 }}>{TABS.map((x, j) =>
      <button key={j} className={t === j ? "on" : ""} onClick={() => setT(j)}>{x.label}</button>)}</div>
    {TABS[t].el}
  </div>;
}
