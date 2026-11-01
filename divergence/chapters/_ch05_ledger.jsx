// 第 5 章专属图解 ①：生态账本——森林、燃料、剩余木材、氮收支（数字只取自原书第 5 章与附录 B、C）
import { useState } from "react";

const COL = { eu: "var(--blue)", cn: "var(--accent)" };
const REG = { eu: "欧洲", cn: "中国" };

/* ---------------- 森林覆盖 ---------------- */
const FOREST = [
  { who: "法国", yr: "16 世纪中叶", reg: "eu", v: 33, txt: "超过 33%", plus: true, note: "Cooper 的估计：约 1800 万公顷森林。" },
  { who: "法国", yr: "1789", reg: "eu", v: 16, txt: "约 16%", note: "约 900 万公顷；人口密度不到 50 人/平方公里。法国常被当作「森林还多」的欧洲国家。" },
  { who: "德意志与奥地利", yr: "18 世纪末", reg: "eu", v: 25, txt: "至多约 25%", note: "M. Williams 的估计。整体比法国多，但局部短缺严重，全德年消耗可能已超过森林生长量。" },
  { who: "丹麦", yr: "1500", reg: "eu", lo: 20, hi: 25, txt: "20–25%", note: "Kjaergaard 的估计。" },
  { who: "丹麦", yr: "1800", reg: "eu", v: 4, txt: "约 4%", note: "尽管采取了大规模节约燃料措施。这与岭南到 1930 年代才降到的水平相当。" },
  { who: "意、西、低地国家、英国", yr: "1850", reg: "eu", lo: 5, hi: 10, txt: "5–10%", note: "M. Williams 对「岛屿与半岛欧洲」的估计。原书还说江苏约 5% 的覆盖率「与 18 世纪的英格兰相当」。" },
  { who: "中国（除西藏、新疆、青海、外蒙）", yr: "约 1700", reg: "cn", v: 37.2, txt: "37.2%", note: "凌大燮估计全帝国约 26%；扣除四个偏远、人口稀少、与内地关系不大的地区后为 37.2%。华北平原的数字可能偏低。" },
  { who: "岭南（粤 + 桂）", yr: "1753", reg: "cn", v: 40, txt: "约 40%", note: "表 5.1：彭慕兰按人口增长推算（每增 1 人，广东约少 0.4 公顷林、广西约 0.6），方法偏向「把情况说坏」。" },
  { who: "岭南（粤 + 桂）", yr: "1853", reg: "cn", v: 24, txt: "约 24%", note: "表 5.1。此时约 77 人/平方公里——比 1789 年的法国稠密得多，森林比例却更高。" },
  { who: "江苏（含大半江南）", yr: "约 1700", reg: "cn", v: 5, txt: "约 5%", note: "凌大燮。江南多由海涂沼泽围垦而成，一向少林；但浙江丘陵就在不远处，直到 1802 年仍有大片森林。" },
  { who: "直隶", yr: "约 1700", reg: "cn", v: 22.7, txt: "22.7%", note: "凌大燮。" },
  { who: "鲁西南 27 县（样本区）", yr: "约 1800", reg: "cn", v: 13, txt: "至少约 13%", plus: true, note: "彭慕兰从 1930 年代数据倒推的保守估计（附录 C），明显高于凌大燮的全省数字。" },
  { who: "河南", yr: "约 1700", reg: "cn", v: 6.3, txt: "6.3%", note: "凌大燮。" },
  { who: "山东（全省）", yr: "约 1700", reg: "cn", v: 1.3, txt: "1.3%", note: "凌大燮；彭慕兰认为偏低——1696 年杜赫德仍在鲁南看到大片森林。" },
];

function ForestBars() {
  const [sel, setSel] = useState(null);
  const max = 42;
  return <div>
    <div className="ld-hint">单位：国土中森林的比例（%）。斜纹 = 区间；▸ = 「超过 / 至少」。点任一行看来源。</div>
    {FOREST.map((r, i) => {
      const lo = r.lo ?? r.v, hi = r.hi ?? r.v, c = COL[r.reg];
      return <button key={i} className="ld-row" onClick={() => setSel(sel === i ? null : i)} style={{ outline: sel === i ? "2px solid var(--ink)" : "none", marginTop: i === 6 ? 10 : 0 }}>
        <div className="ld-who">{r.who}<span className="ld-yr">{r.yr}</span></div>
        <div className="ld-track">
          <div className="ld-bar" style={{ width: `${lo / max * 100}%`, background: c }} />
          {r.hi != null && <div className="ld-bar" style={{ left: `${lo / max * 100}%`, width: `${(hi - lo) / max * 100}%`, background: `repeating-linear-gradient(45deg, ${c} 0 3px, transparent 3px 7px)`, borderRadius: "0 4px 4px 0" }} />}
          <span className="ld-val" style={{ left: `calc(${hi / max * 100}% + 6px)` }}>{r.plus ? "▸ " : ""}{r.txt}</span>
        </div>
      </button>;
    })}
    {sel != null && <p className="ld-note"><b>{FOREST[sel].who}（{FOREST[sel].yr}）：</b>{FOREST[sel].note}</p>}
    <div className="ld-say">「中国人多，所以森林一定更少」并不成立：1853 年的岭南（约 77 人/km²）森林比例仍高于 1789 年的法国（不到 50 人/km²）；丹麦、英国、低地国家的比例与中国最秃的省份相当。</div>
  </div>;
}

/* ---------------- 燃料 / 剩余木材：时间线 ---------------- */
// 法国：附录 C（1550 与 1789）；岭南：表 5.2 / 5.3（1753–1853）；鲁西南：附录 C
const LN_YEARS = [1753, 1773, 1793, 1813, 1833, 1853];
const SERIES = {
  fuel: {
    label: "潜在燃料供给", unit: "tce / 人 / 年（吨标准煤）", max: 2.5, ticks: [0, .5, 1, 1.5, 2, 2.5],
    france: [[1550, 2.3], [1789, .64]],
    lingnan: [1.75, 1.45, 1.19, .99, .83, .70],
    extra: [{ x: 1800, v: .62, who: "鲁西南 1800", reg: "cn" }],
    refs: [{ v: .5, txt: "布罗代尔：欧洲实际用量约 0.5" }, { v: .33, txt: "亚洲开发银行：最低需要 0.33" }],
    def: "假如所有可持续采伐的木材都拿来烧（岭南再加上可烧的秸秆），每人每年能得到多少热量。",
    say: "岭南 1853 年的燃料潜力（0.70）仍略高于 1789 年的法国（0.64）。鲁西南这个 1930 年代极度缺柴（约 0.09）的地方，1800 年也有约 0.62，比布罗代尔估计的法国用量高约 20%。",
  },
  wood: {
    label: "燃料之外的剩余木材", unit: "吨 / 人 / 年", max: 4, ticks: [0, 1, 2, 3, 4],
    france: [[1550, 3.6], [1789, .29]],
    lingnan: [2.85, 2.25, 1.73, 1.32, 1.00, .74],
    extra: [{ x: 1800, v: .24, who: "华北 约1800", reg: "cn" }],
    refs: [],
    def: "满足基本家用燃料（法国按 0.5 tce，岭南按 0.33 tce）之后，每人还剩多少木材可用于造房、造船、造纸、窑炉与锻铁。",
    say: "人口都增加约 75–80%：岭南（1753→1853）人均剩余木材降约 75%，法国（1550→1789）降约 92%——1789 年只剩岭南 1853 年水平的约 40%。两地都在走向困境，但「更紧」的反而是法国。",
  },
};

function FuelChart() {
  const [m, setM] = useState("fuel");
  const [yi, setYi] = useState(5);
  const S = SERIES[m];
  const W = 660, H = 300, L = 46, R = 16, T = 16, B = 256;
  const x = yr => L + (yr - 1540) / (1870 - 1540) * (W - L - R);
  const y = v => B - v / S.max * (B - T);
  const ln = LN_YEARS.map((yr, i) => [yr, S.lingnan[i]]);
  const path = pts => pts.map((p, i) => `${i ? "L" : "M"}${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join(" ");
  const cur = ln[yi];
  return <div>
    <div className="seg">{Object.entries(SERIES).map(([k, s]) => <button key={k} className={m === k ? "on" : ""} onClick={() => setM(k)}>{s.label}</button>)}</div>
    <div className="ld-hint">{S.def}</div>
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxHeight: 340 }} role="img" aria-label={S.label}>
      {S.ticks.map(t => <g key={t}><line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke="var(--line)" strokeWidth=".7" />
        <text x={L - 6} y={y(t) + 4} textAnchor="end" fontSize="11" style={{ fill: "var(--muted)" }}>{t}</text></g>)}
      {[1550, 1600, 1650, 1700, 1750, 1800, 1850].map(t => <text key={t} x={x(t)} y={B + 18} textAnchor="middle" fontSize="11" style={{ fill: "var(--muted)" }}>{t}</text>)}
      {S.refs.map(r => <g key={r.v}><line x1={L} x2={W - R} y1={y(r.v)} y2={y(r.v)} stroke="var(--muted)" strokeDasharray="5 4" strokeWidth="1" />
        <text x={L + 6} y={y(r.v) - 4} fontSize="10.5" style={{ fill: "var(--muted)" }}>{r.txt}</text></g>)}
      {/* 法国：只有两个端点，中间用虚线表示「没有中间数据」 */}
      <path d={path(S.france)} fill="none" stroke={COL.eu} strokeWidth="2" strokeDasharray="6 5" />
      {S.france.map(([yr, v]) => <g key={yr}><circle cx={x(yr)} cy={y(v)} r="5" fill={COL.eu} stroke="var(--card)" strokeWidth="2" />
        <text x={yr > 1700 ? x(yr) - 10 : x(yr) + 8} y={yr > 1700 ? y(v) - 10 : y(v) - 8} textAnchor={yr > 1700 ? "end" : "start"} fontSize="12" style={{ fill: "var(--ink)", stroke: "var(--card)", strokeWidth: 4, paintOrder: "stroke" }}>法国 {yr}：{v}</text></g>)}
      <path d={path(ln)} fill="none" stroke={COL.cn} strokeWidth="2.2" />
      {ln.map(([yr, v], i) => <g key={yr} style={{ cursor: "pointer" }} onClick={() => setYi(i)}>
        <circle cx={x(yr)} cy={y(v)} r="11" fill="transparent" />
        <circle cx={x(yr)} cy={y(v)} r={i === yi ? 6.5 : 4.5} fill={COL.cn} stroke="var(--card)" strokeWidth="2" /></g>)}
      <text x={yi >= 3 ? x(cur[0]) + 4 : x(cur[0])} y={yi >= 3 ? y(cur[1]) + 24 : y(cur[1]) - 12} textAnchor={yi >= 3 ? "end" : "middle"} fontSize="12.5" fontWeight="700" style={{ fill: "var(--ink)" }}>岭南 {cur[0]}：{cur[1]}</text>
      {S.extra.map(e => <g key={e.who}><rect x={x(e.x) - 5} y={y(e.v) - 5} width="10" height="10" fill={COL[e.reg]} stroke="var(--card)" strokeWidth="2" transform={`rotate(45 ${x(e.x)} ${y(e.v)})`} />
        <text x={x(e.x) - 10} y={y(e.v) + 18} textAnchor="end" fontSize="11.5" style={{ fill: "var(--ink)" }}>◆ {e.who}：{e.v}</text></g>)}
      <text x={L} y={T - 4} fontSize="11" style={{ fill: "var(--muted)" }}>{S.unit}</text>
    </svg>
    <div className="ld-slider">
      <span>岭南年份</span>
      <input type="range" min="0" max="5" step="1" value={yi} onChange={e => setYi(+e.target.value)} aria-label="岭南年份" />
      <b>{cur[0]}</b>
      <span className="ld-legend"><i style={{ background: COL.eu }} />法国（虚线：只有两端数据）<i style={{ background: COL.cn }} />中国</span>
    </div>
    <div className="ld-say">{S.say}</div>
    <p className="ld-note">岭南为原书表 5.2 / 5.3（附录 C 表 C.3 四舍五入为 2.8 … 0.7）；法国为附录 C 按 Cooper 的森林面积、Smil 每公顷 3.6 吨木材（1.8 tce）的可持续产量推算。彭慕兰有意让估算对中国不利：没算南方树木长得更快、没算拾捡枝丫、只算粮食作物的秸秆。</p>
  </div>;
}

/* ---------------- 氮收支（附录 B） ---------------- */
function Nitrogen() {
  const [beans, setBeans] = useState(false);
  const rows = [
    { who: "英格兰模型农场", reg: "eu", rot: ["麦", "麦", beans ? "豆" : "苜", "麦", "麦", beans ? "豆" : "苜"], take: 44.77, fix: beans ? 6 : 120,
      fixTxt: beans ? "2 季豆类 × 约 3 = 约 6" : "2 季三叶草 × 约 60 = 120", yieldTxt: "4 季小麦 × 523 = 2,092 kg/英亩" },
    { who: "华北模型农场", reg: "cn", rot: ["麦", "豆", "麦", "麦", "豆", "麦", "麦", "豆", "麦"], take: 42.49, fix: 144,
      fixTxt: "3 季大豆 × 约 48 = 144", yieldTxt: "6 季小麦 × 306 = 1,816 kg/英亩（另有 3 季大豆）" },
  ];
  const max = 150;
  return <div>
    <div className="ld-hint">附录 B 的模型：六年里每英亩小麦带走多少氮、豆科作物又能固定多少氮（kg N / 英亩，取今日平均值）。粪肥的氮输入无法可靠估算，只比较施用量。</div>
    <label className="ld-check"><input type="checkbox" checked={beans} onChange={e => setBeans(e.target.checked)} /> 英格兰轮作改种普通豆类而非三叶草（按 1737–38 年英国农场的实际低产量折算）</label>
    {rows.map(r => <div key={r.who} className="ld-n">
      <div className="ld-nh"><b>{r.who}</b>
        <span className="ld-rot">{r.rot.map((c, i) => <i key={i} style={{ background: c === "麦" ? "var(--line)" : COL[r.reg], color: c === "麦" ? "var(--ink)" : "var(--paper)" }}>{c}</i>)}</span>
      </div>
      <div className="ld-nrow"><span>小麦带走</span><div className="ld-track sm"><div className="ld-bar" style={{ width: `${r.take / max * 100}%`, background: "var(--muted)", opacity: .55 }} /><span className="ld-val" style={{ left: `calc(${r.take / max * 100}% + 6px)` }}>{r.take}</span></div></div>
      <div className="ld-nrow"><span>豆科固氮</span><div className="ld-track sm"><div className="ld-bar" style={{ width: `${r.fix / max * 100}%`, background: COL[r.reg] }} /><span className="ld-val" style={{ left: `calc(${r.fix / max * 100}% + 6px)` }}>{r.fixTxt}</span></div></div>
      <div className="ld-yield">产出：{r.yieldTxt}</div>
    </div>)}
    <div className="ld-grid">
      <div><b>粪肥施用量</b>（kg / 每英亩播种地）<br /><span style={{ color: COL.cn }}>■</span> 华北约 1800：5,600–8,900<br /><span style={{ color: COL.eu }}>■</span> 西欧 18 世纪末：4,000–5,600<br /><small>华北约多 40–60%，施用更勤、储存损失更少。</small></div>
      <div><b>粪肥含氮</b>（占鲜重 %，今日数据）<br /><span style={{ color: COL.cn }}>■</span> 猪粪：2.0–7.5<br /><span style={{ color: COL.eu }}>■</span> 肉牛：0.6–4.9；奶牛：1.5–3.9<br /><small>中国粪肥多来自猪，英国多来自牛。</small></div>
    </div>
    <div className="ld-say">{beans ? "若英格兰农场的轮休作物是豆类而非三叶草，固氮只剩约 6，远不足以补偿两季小麦——这也说明圈地后推广三叶草可能确实很重要。" : "彭慕兰承认这类估算「远非精确」，但所有证据都指向同一结论：华北的地力没有更差，很可能更好——棉田或许例外。英国到 19 世纪要靠鸟粪、磷矿和后来的化肥才维持住产量。"}</div>
  </div>;
}

const TABS = [
  { id: "forest", label: "森林覆盖", el: <ForestBars /> },
  { id: "fuel", label: "燃料与剩余木材", el: <FuelChart /> },
  { id: "n", label: "地力：氮收支", el: <Nitrogen /> },
];

export default function EcoLedger() {
  const [t, setT] = useState(1);
  return <div className="card ld">
    <style>{`
      .ld-row{display:grid;grid-template-columns:minmax(150px,250px) 1fr;gap:10px;align-items:center;width:100%;background:none;border:0;padding:3px 4px;border-radius:8px;cursor:pointer;font:inherit;text-align:left;color:var(--ink)}
      .ld-row:hover{background:var(--paper)}
      .ld-who{font-size:13.5px;line-height:1.25}
      .ld-yr{margin-left:6px;font-size:11.5px;color:var(--muted)}
      .ld-track{position:relative;height:24px;margin-right:120px}
      .ld-track.sm{height:20px;margin-right:190px}
      .ld-bar{position:absolute;left:0;top:3px;bottom:3px;border-radius:0 4px 4px 0;transition:all .5s}
      .ld-val{position:absolute;top:3px;white-space:nowrap;font-size:12.5px;color:var(--ink);font-variant-numeric:tabular-nums;transition:left .5s}
      .ld-hint{font-size:13px;color:var(--muted);margin:0 0 8px}
      .ld-note{font-size:13.5px;color:var(--muted);margin:8px 0 0}
      .ld-note b{color:var(--ink)}
      .ld-say{margin-top:12px;padding:10px 14px;border-left:4px solid var(--gold);background:var(--paper);border-radius:6px;font-size:14.5px}
      .ld-slider{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:13.5px;color:var(--muted)}
      .ld-slider input{width:180px}
      .ld-slider b{color:var(--ink);font-variant-numeric:tabular-nums}
      .ld-legend{margin-left:auto}
      .ld-legend i{display:inline-block;width:11px;height:11px;border-radius:3px;margin:0 4px 0 12px;vertical-align:-1px}
      .ld-check{display:block;font-size:13.5px;margin:4px 0 10px;cursor:pointer}
      .ld-n{border:1px solid var(--line);border-radius:12px;padding:10px 12px;margin:8px 0}
      .ld-nh{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:6px;font-size:14px}
      .ld-rot{display:inline-flex;gap:3px}
      .ld-rot i{font-style:normal;font-size:11.5px;width:22px;height:22px;border-radius:5px;display:inline-flex;align-items:center;justify-content:center}
      .ld-nrow{display:grid;grid-template-columns:70px 1fr;gap:8px;align-items:center;font-size:13px;color:var(--muted)}
      .ld-yield{font-size:12.5px;color:var(--muted);margin-top:4px}
      .ld-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;font-size:13.5px;margin-top:10px}
      .ld-grid>div{background:var(--paper);border-radius:10px;padding:10px 12px;line-height:1.6}
      .ld-grid small{color:var(--muted)}
      @media (max-width:600px){.ld-row{grid-template-columns:1fr}.ld-track{margin-right:100px}.ld-track.sm{margin-right:150px}}
    `}</style>
    <div className="seg">{TABS.map((x, i) => <button key={x.id} className={t === i ? "on" : ""} onClick={() => setT(i)}>{x.label}</button>)}</div>
    {TABS[t].el}
    <p className="ld-note" style={{ fontSize: 12.5 }}>所有数字取自原书第 5 章及附录 B、C，均为粗略估算（「约」）；区间照原书给出。蓝 = 欧洲，橙 = 中国。</p>
  </div>;
}
