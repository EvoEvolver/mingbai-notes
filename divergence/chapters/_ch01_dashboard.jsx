// 第 1 章专属图解 ①：欧亚生活水平对照仪表盘（只用原著第 1 章给出的数字）
import { useState } from "react";

// 地区配色：欧洲一色、中国一色、日本一色、其他地区一色（全书统一）
export const REG = {
  eu: { label: "欧洲", color: "var(--blue)" },
  cn: { label: "中国", color: "var(--accent)" },
  jp: { label: "日本", color: "var(--gold)" },
  ot: { label: "其他亚洲", color: "var(--green)" },
};

// 行：lo/hi = 区间；pts = 若干点 [{v, t}]；gt = 「超过」
const METRICS = [
  {
    id: "life", tab: "⏳ 预期寿命", unit: "岁", min: 15, max: 60, ticks: [20, 30, 40, 50, 60],
    head: "能活多久？",
    verdict: "欧洲最好的样本（英格兰贵族、西德意志村庄）也只在 30 多到 40 岁；日本村庄与中国较富裕地区并不更差，有的还更长。只有印度的数字明显偏低——而且数据很单薄。",
    groups: [
      {
        title: "出生时预期寿命",
        rows: [
          { r: "eu", name: "英格兰 · 贵族子女", when: "1650 年", pts: [{ v: 32 }], note: "斯通（Stone）的估计：哪怕是贵族的孩子，1650 年出生时预期寿命也只有约 32 岁；要到 1750 年以后才超过 40 岁。" },
          { r: "eu", name: "英格兰 · 贵族子女", when: "1750 年后", pts: [{ v: 40, gt: true }], note: "同上：1750 年后才「越过 40 岁」。这是英格兰（大概是欧洲最富裕的地方）最上层的数字。" },
          { r: "eu", name: "英格兰 · 校正后的平民", when: "1600–1749", lo: 31.6, hi: 34.0, ghost: 37, note: "Wrigley 与 Schofield 的英格兰村庄研究给出 30 多岁中后段（例如 37 岁）。但 Razzell 认为平民出生与死亡漏报严重，真实婴儿死亡率可能高出 60%–100%；彭慕兰据此把 37 岁下调到 31.6–34.0 岁。浅色圆点为校正前的 37 岁。" },
          { r: "eu", name: "西德意志 14 个村庄", when: "18–19 世纪", lo: 35, hi: 40, note: "Knodel 的研究：在 35 到 40 岁之间波动——这还高于 19 世纪德意志更大范围人口的总体数字。" },
          { r: "eu", name: "法国（全体，男女合计）", when: "1770–1790", lo: 27.5, hi: 30, note: "Blayo 的估计：人口多得多的法国明显更低，只有 27.5–30 岁。" },
          { r: "eu", name: "德意志各省", when: "1816–1860", pts: [{ v: 24.7, t: "东西普鲁士" }, { v: 29.8, t: "莱茵省" }, { v: 31.3, t: "威斯特伐利亚" }], note: "Nipperdey 引用的数字：东西普鲁士 24.7、莱茵省 29.8、威斯特伐利亚 31.3 岁，与法国大致相当。" },
          { r: "jp", name: "日本两村 · 男性", when: "18 世纪末–19 世纪初", pts: [{ v: 34.9 }, { v: 41.1 }], note: "Hanley 与 Yamamura 对两个日本村庄的估计：男性 34.9 与 41.1 岁。这些是农村平民——按法律武士贵族须住在城下町，不在样本中。" },
          { r: "jp", name: "日本两村 · 女性", when: "18 世纪末–19 世纪初", pts: [{ v: 44.9 }, { v: 55.0 }], note: "同一研究：女性 44.9 与 55.0 岁。彭慕兰的结论：日本农民活得至少和欧洲人一样长，很可能更长。" },
          { r: "cn", name: "中国 · 较富裕地区族谱", when: "18 世纪中 → 19 世纪初", pts: [{ v: 39.6, t: "18 世纪中" }, { v: 34.9, t: "19 世纪初" }], note: "Telford 的族谱研究：18 世纪中叶 39.6 岁，到 19 世纪初降到 34.9 岁——即便下降后，也仍与英格兰的估计相当。（Lavely 与 Wong 还怀疑这个下降是否真实存在。）" },
          { r: "ot", name: "吕宋（菲律宾）教区登记", when: "19 世纪初", pts: [{ v: 42 }], note: "东南亚数据极零散，但吕宋的一份教区登记显示出生时预期寿命约 42 岁；欧洲来访者也常说当地人很健康。" },
          { r: "ot", name: "印度 · 某一地区", when: "约 1800 年", lo: 20, hi: 25, note: "唯一明显低于西北欧的数字：约 20–25 岁，且只来自一个地区的薄弱数据。即便 25 岁，也只比法国略低；另有研究显示 18 世纪中叶南印度劳工的购粮能力一般高于英国工人阶级。" },
        ],
      },
      {
        title: "满 1 岁者的预期寿命（剔除溺婴对出生时数字的扭曲）",
        rows: [
          { r: "jp", name: "日本某村 · 男 / 女", when: "18 世纪", pts: [{ v: 47.1, t: "男" }, { v: 51.8, t: "女" }], note: "Smith、Eng 与 Lundy 对一个记录完善的村庄的计算：活过 1 岁的人，男性预期寿命 47.1 岁、女性 51.8 岁。东亚溺婴较多，满 1 岁的数字更能反映整体生活条件。" },
          { r: "cn", name: "辽东（满洲）某村 · 男 / 女", when: "1792–1867", pts: [{ v: 35.7, t: "男" }, { v: 29, t: "女" }], note: "Lee 与 Campbell 的数据：满 1 岁男性 35.7 岁、女性 29 岁。女性数字可能被当地异常强烈的重男轻女压低，但仍与欧洲农村较富裕地区相当。" },
          { r: "cn", name: "清皇族宗室", when: "18 世纪末", pts: [{ v: 40, t: "约 40 或略高", pre: "≈" }], note: "宗室可能是前现代记录最好的大型人口（并非人人富裕）。出生时预期寿命因溺婴而偏低——可能多达 25% 的女婴被溺杀；但满 1 岁者到 18 世纪末约为 40 岁或略高，可与上面最好的西欧人群相比。" },
        ],
      },
    ],
  },
  {
    id: "cal", tab: "🍚 热量摄入", unit: "千卡/日", min: 1500, max: 5000, ticks: [2000, 3000, 4000, 5000],
    head: "吃得饱吗？",
    verdict: "口径不一（人均、成人当量、成年男子当量），但折算成和英国样本同一口径后，18 世纪中国人光从粮食就能得到约 2651 千卡——除一个英国样本外都不逊色，更远高于布罗代尔估计的欧洲「城市大众」。",
    groups: [
      {
        title: "欧洲",
        rows: [
          { r: "eu", name: "欧洲 · 重体力劳动者", when: "1800 年前", pts: [{ v: 3500 }], note: "布罗代尔：重体力劳动者（如西班牙舰队水手）每天约 3500 千卡。他也提醒，大多数欧洲热量记录来自特权阶层的生活。" },
          { r: "eu", name: "欧洲 · 「城市大众」（人均）", when: "1800 年前", pts: [{ v: 2000 }], note: "布罗代尔对欧洲「广大城市民众」的估计：每人每天约 2000 千卡。" },
          { r: "eu", name: "英格兰 · 非农劳工家庭", when: "19 世纪", lo: 2000, hi: 2500, note: "Clark、Huberman 与 Lindert 汇集的数据：各类非农劳工家庭每成年男子当量 2000–2500 千卡。注意这已是更富裕的 19 世纪。" },
          { r: "eu", name: "英格兰 · 农业劳工", when: "1860 年代", pts: [{ v: 3300, t: "近 3300" }], note: "同一数据集：1860 年代农村农业劳工接近 3300 千卡（每成年男子当量）。这是唯一明显高于中国估计的英国样本。" },
        ],
      },
      {
        title: "中国（只算粮食，不含其他食物）",
        rows: [
          { r: "cn", name: "长江三角洲 · 农书里的雇工口粮", when: "17 世纪", pts: [{ v: 4600 }], note: "潘敏德根据一部 17 世纪长江三角洲农书记载的雇工口粮倒推：仅粮食就约 4600 千卡。" },
          { r: "cn", name: "中国全体 · 三种口径", when: "18 世纪", pts: [{ v: 1837, t: "人均" }, { v: 2386, t: "成人当量" }, { v: 2651, t: "成年男子当量" }], note: "18 世纪全国粮食消费估计折合每人每天约 1837 千卡；按 1920–30 年代卜凯样本的年龄结构，合每成人当量 2386 千卡；再按英国 19 世纪末的男女比例折成「成年男子当量」，为 2651 千卡——这才能与上面的英国样本直接比较。且都还没算粮食以外的食物。" },
        ],
      },
    ],
  },
  {
    id: "city", tab: "🏙️ 城市与粮食", unit: "", min: 0, max: 0, head: "城市有多大、粮食运得多远？",
    verdict: "运输与市场看不出欧洲优势：日本城市化率高于西欧；中国的长途粮食贸易量是欧洲巅峰时期的五倍以上；山东一省的粮食进出口就抵得上全欧洲的长途粮食贸易。",
    custom: true,
  },
];

// 「城市与粮食」三个小图各自一根轴（不同量纲，不混用一根轴）
const MINI = [
  {
    title: "城市人口比重（18 世纪）", unit: "%", max: 25, ticks: [0, 5, 10, 15, 20, 25],
    rows: [
      { r: "jp", name: "日本", pts: [{ v: 22 }], note: "估计 18 世纪日本有 22% 的人口住在城市。" },
      { r: "eu", name: "西欧", lo: 10, hi: 15, note: "同期西欧为 10%–15%。" },
      { r: "ot", name: "马来群岛", pts: [{ v: 15, t: "可能约 15" }], note: "人口总体稀疏，但可能有 15% 的人口在城市；这些城市（以及南亚、中东的一些城市）严重依赖长途运来的大宗粮食。" },
    ],
  },
  {
    title: "人口密度（约 1750 年）", unit: "人/平方英里", max: 450, ticks: [0, 100, 200, 300, 400],
    rows: [
      { r: "cn", name: "山东（不靠净进口粮食）", pts: [{ v: 400 }], note: "黄宗智的数字：约 1750 年山东每平方英里约 400 人，而且不需要净进口粮食——这还是旱作区，没有灌溉之利。" },
      { r: "eu", name: "荷兰（靠大量进口粮食）", pts: [{ v: 160, t: "约 160" }], note: "同期即便是荷兰也只有约 160 人，还要依赖大量进口粮食。" },
    ],
  },
  {
    title: "长途粮食贸易能养活的人数（18 世纪）", unit: "百万人", max: 15, ticks: [0, 5, 10, 15],
    rows: [
      { r: "cn", name: "中国 · 长途粮食贸易", pts: [{ v: 14, t: "约 1400 万" }], note: "吴承明的保守估计：18 世纪约 3000 万石粮食进入长途贸易，够养活约 1400 万人；而且只算了最大的几条线路。" },
      { r: "eu", name: "欧洲 · 前 1800 年巅峰", lo: 0, hi: 2.8, upto: true, note: "原文只给倍数：中国的量是欧洲长途粮食贸易巅峰（取慷慨估计）的五倍以上。这里按 1400 万 ÷ 5 推算其上限约 280 万人，属推算。" },
      { r: "eu", name: "波罗的海粮食贸易 · 平常年份", lo: 0, hi: 0.7, upto: true, note: "中国的量是波罗的海粮食贸易鼎盛期平常年份的 20 倍以上；按 1400 万 ÷ 20 推算上限约 70 万人，属推算。" },
      { r: "cn", name: "山东一省 · 进口粮食", lo: 0.7, hi: 1.0, note: "山东 1800 年约 2300 万人（略多于法国），平常年份进口的粮食就能养活 70 万–100 万人（多于波罗的海贸易所养活的），出口量也大致相当。若把这个「国家大小」的省份的进出口视作欧洲的「国际贸易」，它一省就可比全欧洲的长途粮食贸易。" },
    ],
  },
];

const fmt = v => (v >= 1000 ? String(v) : String(+v.toFixed(1)));

// 一张横向点/区间图。rows 统一结构；width 固定 viewBox，自适应缩放
function DotChart({ rows, min, max, ticks, unit, sel, setSel, keyPrefix, labelW = 250 }) {
  const W = 780, rowH = 42, top = 24, plotL = labelW, plotR = W - 70;
  const H = top + rows.length * rowH + 8;
  const x = v => plotL + ((v - min) / (max - min)) * (plotR - plotL);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }} role="img">
      {ticks.map(t => <g key={t}>
        <line x1={x(t)} x2={x(t)} y1={top - 6} y2={H - 6} stroke="var(--line)" strokeWidth="1" />
        <text x={x(t)} y={top - 10} textAnchor="middle" fontSize="11" fill="var(--muted)">{t >= 1000 ? t.toLocaleString() : t}</text>
      </g>)}
      <text x={plotR + 8} y={top - 10} fontSize="11" fill="var(--muted)">{unit}</text>
      {rows.map((row, i) => {
        const k = keyPrefix + i, y = top + i * rowH + rowH / 2, c = REG[row.r].color, on = sel === k;
        const valText = row.lo != null ? (row.upto ? `≤${fmt(row.hi)}（推算）` : `${fmt(row.lo)}–${fmt(row.hi)}`)
          : row.pts.map(p => (p.gt ? ">" : p.pre || "") + fmt(p.v)).join(" / ");
        return (
          <g key={k} onClick={() => setSel(on ? null : k)} style={{ cursor: "pointer" }}>
            <rect x="0" y={y - rowH / 2} width={W} height={rowH} fill={on ? "var(--paper2)" : "transparent"} rx="6" />
            <rect x="4" y={y - 6} width="4" height="12" rx="2" fill={c} />
            <text x="14" y={y - 2} fontSize="13" fill="var(--ink)">{row.name}</text>
            {row.when && <text x="14" y={y + 13} fontSize="10.5" fill="var(--muted)">{row.when}</text>}
            {row.lo != null && <rect x={x(row.lo)} y={y - 5} width={Math.max(4, x(row.hi) - x(row.lo))} height="10" rx="4"
              fill={c} opacity={row.upto ? .5 : .85} stroke={row.upto ? c : "none"} strokeDasharray={row.upto ? "3 2" : undefined} />}
            {row.ghost != null && <circle cx={x(row.ghost)} cy={y} r="5" fill="none" stroke={c} strokeWidth="2" opacity=".5" />}
            {row.ghost != null && <line x1={x(row.ghost) - 6} x2={x(row.hi) + 4} y1={y} y2={y} stroke={c} strokeWidth="1" strokeDasharray="2 2" opacity=".6" />}
            {(row.pts || []).map((p, j) => <g key={j}>
              <circle cx={x(p.v)} cy={y} r="6" fill={c} stroke="var(--card)" strokeWidth="2" />
              {p.gt && <text x={x(p.v) + 9} y={y + 4} fontSize="13" fill={c}>→</text>}
              {p.t && row.pts.length > 1 && <text x={x(p.v)} y={j % 2 ? y + 18 : y - 10} textAnchor="middle" fontSize="9.5" fill="var(--muted)">{p.t}</text>}
            </g>)}
            <text x={W - 4} y={y + 4} textAnchor="end" fontSize="12" fill="var(--ink)" fontWeight="600">{valText}</text>
          </g>);
      })}
    </svg>);
}

export default function LivingDashboard() {
  const [m, setM] = useState(0);
  const [sel, setSel] = useState(null);
  const M = METRICS[m];
  const allRows = M.custom ? MINI.flatMap((g, gi) => g.rows.map((r, i) => ["c" + gi + "-" + i, r]))
    : M.groups.flatMap((g, gi) => g.rows.map((r, i) => ["g" + gi + "-" + i, r]));
  const cur = allRows.find(([k]) => k === sel)?.[1];
  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{METRICS.map((x, j) =>
        <button key={x.id} className={m === j ? "on" : ""} onClick={() => { setM(j); setSel(null); }}>{x.tab}</button>)}</div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13, color: "var(--muted)", alignItems: "center" }}>
        {Object.entries(REG).map(([k, r]) => <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <i style={{ width: 12, height: 12, borderRadius: 6, background: r.color, display: "inline-block" }} />{r.label}</span>)}
        <span>● 单个估计　▬ 区间　○ 校正前</span>
        <span style={{ marginLeft: "auto" }}>点任一行看出处与说明</span>
      </div>
      <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>{M.head}</div>
      {!M.custom && M.groups.map((g, gi) => <div key={gi}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", margin: "4px 0 0" }}>{g.title}</div>
        <DotChart rows={g.rows} min={M.min} max={M.max} ticks={M.ticks} unit={M.unit} sel={sel} setSel={setSel} keyPrefix={"g" + gi + "-"} />
      </div>)}
      {M.custom && MINI.map((g, gi) => <div key={gi}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", margin: "4px 0 0" }}>{g.title}</div>
        <DotChart rows={g.rows} min={0} max={g.max} ticks={g.ticks} unit={g.unit} sel={sel} setSel={setSel} keyPrefix={"c" + gi + "-"} />
      </div>)}
      <div style={{ minHeight: 64, background: "var(--paper)", borderRadius: 12, padding: "10px 14px", fontSize: 15,
        borderLeft: `4px solid ${cur ? REG[cur.r].color : "var(--line)"}` }}>
        {cur ? <><b>{cur.name}{cur.when ? ` · ${cur.when}` : ""}</b><br />{cur.note}</>
          : <span style={{ color: "var(--muted)" }}>👆 点上面任一行，看这个数字从哪来、口径是什么。</span>}
      </div>
      <div style={{ fontSize: 15 }}><b>读图结论：</b>{M.verdict}</div>
      <div style={{ fontSize: 12, color: "var(--muted)" }}>数据均为彭慕兰在第 1 章引用的各家估计，样本多为局部、口径不尽相同，只适合看「量级是否相当」，不宜精确排名。</div>
    </div>);
}
