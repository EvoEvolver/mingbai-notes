// 第 6 章专属图解 ①：「幽灵土地」计算器（只用原书第 6 章与附录 D 的数字；单位：万英亩）
import { useState } from "react";

const ARABLE = 1700; // 英国耕地约 1700 万英亩（原书注：实为 1867 年数字，最早可得且较稳定）
const MAX = 5000;

// 每项：两个时间截面的数值（lo/hi 为区间；plus = 「以上」；carry = 原书无该年数字，沿用前一数字）
const ITEMS = [
  {
    id: "sugar", label: "糖", src: "加勒比种植园", color: "var(--gold)", nw: true,
    v: [
      { lo: 130, hi: 190, txt: "130–190 万", note: "约 1800 年联合王国消费的糖所含热量，若改用英格兰平均产量的麦田来生产，至少需 130 万英亩，可能超过 190 万。一英亩热带蔗田的热量相当于 4 英亩以上马铃薯或 9–12 英亩小麦。附录 D 用另一种算法（全国人均约 18 磅 × 人口）得到 1801 年 89–126 万英亩，偏低。" },
      { lo: 190, hi: 260, txt: "190–260 万", note: "1831 年需 190–260 万英亩（附录 D 的另一算法为 124–175 万）。若改用布罗代尔估计的欧陆典型产量，数字几乎翻倍；若多种马铃薯则会缩小。" },
    ],
  },
  {
    id: "timber_na", label: "北美木材", src: "北美森林", color: "var(--violet)", nw: true,
    v: [
      { lo: 0, txt: "微不足道", note: "1800 年前北美对英国的木材出口微不足道（对南欧的出口则不少）。" },
      { lo: 100, plus: true, txt: "100 万以上", note: "到 1825 年，北美对英国的木材出口（约 2.5 亿板英尺）已相当于 100 万英亩以上欧洲森林的年产出，此后还在猛增。" },
    ],
  },
  {
    id: "timber_baltic", label: "波罗的海木材", src: "间接：靠美洲白银与转口货支付", color: "var(--violet)", op: .45, nw: true, indirect: true,
    v: [
      { lo: 65, txt: "约 65 万", note: "1780–90 年代英国每年从波罗的海进口的木材（约 1.5 亿板英尺）相当于约 65 万英亩森林；这批进口大多由美洲白银与转口货支付，所以算作间接的美洲贡献。" },
      { lo: 65, carry: true, txt: "约 65 万（沿用）", note: "原书只给出 1780–90 年代的数字，这里沿用作对照。" },
    ],
  },
  {
    id: "cotton", label: "棉花", src: "美国南部等", color: "var(--green)", nw: true, fiber: true,
    wool: [
      { lo: 900, txt: "近 900 万", note: "1815 年英国进口逾 1 亿磅美洲棉花。若改养羊产毛：按鲍登复原的 500 英亩模范羊场，同等重量需约 592 万英亩；再按纺出同样多纱线（棉纱长度约为毛纱 1.5 倍）调整，近 900 万英亩。" },
      { lo: 2300, plus: true, txt: "2300 万以上", note: "1830 年进口 2.63 亿磅，换成羊毛需 2300 万英亩以上（按重量约 1539 万）。这超过了英国耕地与牧场的总和。" },
    ],
    flax: [
      { lo: 20, txt: "约 20 万", note: "若改种亚麻（精心种植每英亩约 500 磅），1815 年只需约 20 万英亩——但亚麻与大麻极费劳力和肥料，多只在园圃里种；18 世纪末英格兰亚麻总产也许只有 800 万磅、约 1.6 万英亩，三百年政府补贴都没能推广。" },
      { lo: 50, txt: "约 50 万", note: "1830 年约 50 万英亩。面积看似不大，但这条路几乎走不通：亚麻劳动与肥料密集，机器纺纱也比棉花晚出现；大麻做不了好布料。" },
    ],
  },
  {
    id: "coal", label: "煤", src: "英国本土地下", color: "#6a6256", nw: false,
    wrigley: [
      { lo: 1500, txt: "约 1500 万", note: "里格利（Wrigley）估计：要获得约 1815 年英国煤产量（约 1500 万吨）的能量，英国得凭空多出 1500 万英亩森林。" },
      { lo: 1500, carry: true, txt: "≥1500 万（沿用 1815 年）", note: "原书没给 1830 年的煤当量；煤产量此后持续增长（1815–1900 年增长 14 倍），所以 1815 年的数只是下限。" },
    ],
    smil: [
      { lo: 2100, plus: true, txt: "2100 万以上", note: "里格利假设每英亩林地年产 2 吨干木，偏乐观；彭慕兰指出，若按斯米尔的全球平均林木产量计算，煤的贡献略超 2100 万「幽灵英亩」。" },
      { lo: 2100, plus: true, carry: true, txt: "≥2100 万（沿用 1815 年）", note: "同上：1830 年的煤当量原书未给出，此处沿用 1815 年数作下限。" },
    ],
  },
];

const fmt = n => String(+(n / 100).toFixed(2));

function valOf(it, snap, fiber, coalEst) {
  const arr = it.fiber ? it[fiber] : it.id === "coal" ? it[coalEst] : it.v;
  return arr[snap];
}

export default function GhostAcres() {
  const [snap, setSnap] = useState(1);
  const [fiber, setFiber] = useState("wool");
  const [coalEst, setCoalEst] = useState("wrigley");
  const [on, setOn] = useState({ sugar: true, timber_na: true, timber_baltic: true, cotton: true, coal: true });
  const [sel, setSel] = useState("cotton");

  const rows = ITEMS.filter(it => on[it.id]).map(it => ({ it, d: valOf(it, snap, fiber, coalEst) }));
  let x = 0;
  const segs = rows.map(({ it, d }) => {
    const lo = d.lo, hi = d.hi ?? d.lo;
    const s = { it, d, x0: x, wLo: lo, wHi: hi - lo };
    x += hi;
    return s;
  });
  const sum = (pred) => rows.filter(r => pred(r.it)).reduce((a, r) => [a[0] + r.d.lo, a[1] + (r.d.hi ?? r.d.lo)], [0, 0]);
  const nw = sum(it => it.nw), all = sum(() => true);
  const anyPlus = rows.some(r => r.d.plus);
  const rng = ([a, b]) => a === b ? `${fmt(a)}` : `${fmt(a)}–${fmt(b)}`;
  const ratio = ([a, b]) => { const r1 = (a / ARABLE).toFixed(1), r2 = (b / ARABLE).toFixed(1); return r1 === r2 ? r1 : `${r1}–${r2}`; };

  const W = 720, L = 110, R = 20, pw = W - L - R, sx = v => v / MAX * pw;
  const selItem = ITEMS.find(i => i.id === sel), selD = selItem && valOf(selItem, snap, fiber, coalEst);

  return <div className="card ghost">
    <style>{`
      .ghost .row{display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;margin-bottom:10px}
      .ghost .lab{font-size:13px;color:var(--muted);margin-right:4px}
      .ghost .seg{margin-bottom:0}
      .ghost .gh-chk{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0 6px}
      .ghost .gh-chk button{display:flex;align-items:center;gap:6px;border:1px solid var(--line);background:var(--paper);border-radius:99px;padding:3px 12px 3px 8px;font:inherit;font-size:13.5px;cursor:pointer;color:var(--ink)}
      .ghost .gh-chk button.off{opacity:.45;text-decoration:line-through}
      .ghost .gh-chk i{display:inline-block;width:12px;height:12px;border-radius:3px}
      .ghost .note{font-size:14px;color:var(--muted);margin:6px 0 0;line-height:1.65}
      .ghost .sum{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-top:12px}
      .ghost .sum div{background:var(--paper);border-radius:10px;padding:10px 14px;font-size:14px;line-height:1.5}
      .ghost .sum b{display:block;font-size:22px;font-family:var(--serif);color:var(--ink)}
      .ghost svg text{font-family:var(--sans)}
    `}</style>

    <div className="row">
      <span><span className="lab">时间截面</span><span className="seg">
        {["约 1800–1815", "约 1825–1831"].map((t, j) => <button key={t} className={snap === j ? "on" : ""} onClick={() => setSnap(j)}>{t}</button>)}</span></span>
      <span><span className="lab">棉花若换成</span><span className="seg">
        <button className={fiber === "wool" ? "on" : ""} onClick={() => { setFiber("wool"); setSel("cotton"); }}>羊毛</button>
        <button className={fiber === "flax" ? "on" : ""} onClick={() => { setFiber("flax"); setSel("cotton"); }}>亚麻</button></span></span>
      <span><span className="lab">煤的森林当量</span><span className="seg">
        <button className={coalEst === "wrigley" ? "on" : ""} onClick={() => { setCoalEst("wrigley"); setSel("coal"); }}>里格利</button>
        <button className={coalEst === "smil" ? "on" : ""} onClick={() => { setCoalEst("smil"); setSel("coal"); }}>按全球均值</button></span></span>
    </div>
    <div className="gh-chk">
      {ITEMS.map(it => <button key={it.id} className={on[it.id] ? "" : "off"} onClick={() => setOn({ ...on, [it.id]: !on[it.id] })} title="点击开关此项">
        <i style={{ background: it.color, opacity: it.op ?? 1 }} />{it.label}<span style={{ color: "var(--muted)", fontSize: 12 }}>{it.nw ? (it.indirect ? "间接·美洲" : "美洲") : "本土"}</span>
      </button>)}
    </div>

    <svg viewBox={`0 0 ${W} 200`} style={{ width: "100%" }} role="img" aria-label="幽灵土地堆叠条形图">
      <defs>
        {ITEMS.map(it => <pattern key={it.id} id={`gh-h-${it.id}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="var(--card)" /><rect width="3" height="6" fill={it.color} />
        </pattern>)}
      </defs>
      {[0, 1000, 2000, 3000, 4000, 5000].map(t => <g key={t}>
        <line x1={L + sx(t)} x2={L + sx(t)} y1={18} y2={150} stroke="var(--line)" strokeWidth=".7" />
        <text x={L + sx(t)} y={166} textAnchor="middle" fontSize="11" fill="var(--muted)">{t / 100}</text>
      </g>)}
      <text x={L + pw} y={184} textAnchor="end" fontSize="11" fill="var(--muted)">百万英亩</text>

      <text x={L - 10} y={52} textAnchor="end" fontSize="13" fill="var(--ink)">「幽灵土地」</text>
      <text x={L - 10} y={67} textAnchor="end" fontSize="11" fill="var(--muted)">（可开关各项）</text>
      {segs.map(s => {
        const c = s.it.color, x0 = L + sx(s.x0), w1 = sx(s.wLo), w2 = sx(s.wHi), isSel = sel === s.it.id;
        return <g key={s.it.id} onClick={() => setSel(s.it.id)} style={{ cursor: "pointer", color: c }}>
          <rect x={x0} y={30} width={Math.max(w1 - 1.5, 0)} height={42} rx="3" fill={c} opacity={(s.it.op ?? 1) * (s.d.carry ? .55 : 1)} style={{ transition: "all .5s" }} stroke={isSel ? "var(--ink)" : "none"} strokeWidth="2" />
          {w2 > 0 && <rect x={x0 + w1} y={30} width={Math.max(w2 - 1.5, 0)} height={42} rx="3" fill={`url(#gh-h-${s.it.id})`} opacity={.85} style={{ transition: "all .5s" }} stroke={isSel ? "var(--ink)" : "none"} strokeWidth="2" />}
          {s.d.plus && w1 > 8 && <text x={x0 + w1 + w2 - 6} y={56} textAnchor="end" fontSize="13" fontWeight="700" fill="#fff">+</text>}
          {(w1 + w2) > 44 && <text x={x0 + (w1 + w2) / 2} y={56} textAnchor="middle" fontSize="12" fill="#fff" style={{ pointerEvents: "none" }}>{s.it.label}</text>}
        </g>;
      })}
      <text x={L + sx(x) + 6} y={56} fontSize="12" fill="var(--ink)">{x > 0 ? `≈ ${fmt(all[0])}${all[1] !== all[0] ? "–" + fmt(all[1]) : ""}${anyPlus ? "+" : ""}` : "（全部关闭）"}</text>

      <text x={L - 10} y={112} textAnchor="end" fontSize="13" fill="var(--ink)">英国耕地</text>
      <text x={L - 10} y={127} textAnchor="end" fontSize="11" fill="var(--muted)">约 1700 万英亩</text>
      <rect x={L} y={96} width={sx(ARABLE)} height={34} rx="3" fill="var(--blue)" />
      <line x1={L + sx(ARABLE)} x2={L + sx(ARABLE)} y1={22} y2={140} stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={L + sx(ARABLE) + 6} y={118} fontSize="12" fill="var(--blue)">英国全部耕地</text>
    </svg>

    {selItem && selD && <p className="note"><b style={{ color: "var(--ink)" }}>{selItem.label}（{selItem.src}）· {selD.txt}英亩：</b>{selD.note}</p>}
    {selItem && !on[selItem.id] && <p className="note">（此项已关闭）</p>}

    <div className="sum">
      <div><b>{rng(nw)}{rows.some(r => r.it.nw && r.d.plus) ? "+" : ""} 百万</b>美洲带来的「幽灵土地」（已开启的项）<br />≈ 英国耕地的 {ratio(nw)} 倍</div>
      <div><b>{rng(all)}{anyPlus ? "+" : ""} 百万</b>再加上煤（若开启）<br />≈ 英国耕地的 {ratio(all)} 倍</div>
      <div style={{ borderLeft: "4px solid var(--gold)" }}>原书结论：{snap === 0
        ? "不算棉花，糖与木材已有 300–400 万「幽灵英亩」（其中北美木材用的是 1825 年数字，本截面未计入），相对 1700 万英亩耕地不可忽视。"
        : "约 1830 年，棉花、糖与木材合计 2500–3000 万「幽灵英亩」，比煤的贡献还大出一截。"}</div>
    </div>
    <p className="note" style={{ fontSize: 12.5 }}>数字来自原书第 6 章与附录 D；斜纹段 = 原书给出的估算区间，「+」= 原书写「以上」，浅色 = 原书无该年数字、沿用前值。两项合计与「倍数」是本图按原书数字简单相加，原书并未把煤与美洲直接相加。英国耕地 1700 万英亩为 1867 年数字（原书称是最早可得且较稳定的数）。</p>
  </div>;
}
