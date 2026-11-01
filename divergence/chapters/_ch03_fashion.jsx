// 第 3 章专属图解 ②：「时尚的速度」原因拨盘——文化本质说 / 社会秩序说 / 全球局势说
import { useState } from "react";
import { C } from "@kit";

const EU = "var(--blue)", CN = "var(--accent)", OT = "var(--gold)", INK = "var(--ink)", MU = "var(--muted)";

const MODES = [
  {
    id: "culture", name: "文化本质说", verdict: "彭慕兰：证据不支持", vtone: "warn",
    claim: "欧洲人天生好奇、爱新奇、更「物质主义」，所以热衷异域商品、时尚越转越快；中国人自认天朝无所不有，对外国货没兴趣——乾隆 1793 年对英国使团说的那番话常被当作证据。",
    check: [
      "皇帝不等于中国：拿满洲皇帝的朝贡姿态代表全体中国人的口味，就像拿几个重商主义政客的抱怨代表全体欧洲人。",
      "中国大量进口东南亚的异域品：鱼翅、燕窝、胡椒、珍珠、香料、珍稀木材，18 世纪需求猛涨，英国商人的难题是货源不够。",
      "明代鉴赏指南把外国货列为珍品；广东、福建沿海士绅收藏西洋钟表；「西洋衫」在宫中和江南流行过。",
    ],
  },
  {
    id: "order", name: "社会秩序说", verdict: "彭慕兰：可能有一部分作用，但「极其推测性」", vtone: "info",
    claim: "清与德川在 17 世纪中叶重建了秩序，又让公职与官阶重新成为身份标志；欧洲国家则削弱大家族、抬高「个人选择」，人们更需要靠买卖物品来表达自己。",
    check: [
      "清代唯一真正有效的禁奢规定是官服等级：顶戴、补服可作为奖赏授给出力的商人士绅——这等于让一部分「配额体系」复活。",
      "清初以后，新的奢侈品鉴赏书急剧减少（Clunas）；平民服饰的变化也比明代和 18 世纪末的欧洲少（沈从文）。",
      "江南闺秀以诗词往来竞争身份，比欧洲式时尚少花钱；但彭慕兰强调这些都只是线索，应去更具体的层面找原因。",
    ],
  },
  {
    id: "global", name: "全球局势说", verdict: "本章主张的解释", vtone: "key",
    claim: "差别出在具体商品与全球流动：欧洲手握美洲白银——中国最想要的「商品」——用它换回亚洲的丝、棉布、瓷器和茶，这些时髦舶来品让欧洲的时尚之轮转得更快。",
    check: [
      "1500–1800 年拉丁美洲约产全球 85% 的白银；中国在鸦片之前从欧洲及其殖民地的进口约 90% 是白银——这是套利，不是「中国人不要外国货」。",
      "中国要的异域品多是采集来的（鱼翅、燕窝、檀香），没法像美洲种植园那样靠奴隶劳动扩产压价；糖和烟草则由本国自由农自产，要和粮食争地。",
      "欧洲拿到银矿靠的是夺取与强制劳役：方向是「海外强制 → 国内斯密式动力」，而不是反过来。",
    ],
  },
];

function Box({ x, y, w, h, label, sub, color, dim }) {
  return <g style={{ opacity: dim ? .28 : 1, transition: "opacity .5s" }}>
    <rect x={x} y={y} width={w} height={h} rx="12" style={{ fill: "var(--card)", stroke: color, strokeWidth: 2 }} />
    <text x={x + 12} y={y + 22} fontSize="15" fontWeight="700" style={{ fill: color }}>{label}</text>
    {sub && <text x={x + 12} y={y + 40} fontSize="11.5" style={{ fill: MU }}>{sub}</text>}
  </g>;
}

function Wheel({ cx, cy, r, dur, color, label }) {
  return <g>
    <g>
      <circle cx={cx} cy={cy} r={r} style={{ fill: "none", stroke: color, strokeWidth: 3 }} />
      {[0, 60, 120].map(a => <line key={a} x1={cx - r * Math.cos(a * Math.PI / 180)} y1={cy - r * Math.sin(a * Math.PI / 180)} x2={cx + r * Math.cos(a * Math.PI / 180)} y2={cy + r * Math.sin(a * Math.PI / 180)} style={{ stroke: color, strokeWidth: 2 }} />)}
      <circle cx={cx} cy={cy - r} r="4" style={{ fill: color }} />
      <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur={dur} repeatCount="indefinite" />
    </g>
    <text x={cx - r - 8} y={cy + 4} textAnchor="end" fontSize="11.5" style={{ fill: MU }}>{label}</text>
  </g>;
}

function Flow({ d, color, label, lx, ly, dur = "3s", n = 3 }) {
  return <g>
    <path d={d} style={{ fill: "none", stroke: color, strokeWidth: 2.2, strokeDasharray: "5 4", opacity: .8 }} />
    {Array.from({ length: n }, (_, k) => <circle key={k} r="4.5" style={{ fill: color }}>
      <animateMotion dur={dur} begin={`${k * (parseFloat(dur) / n)}s`} repeatCount="indefinite" path={d} />
    </circle>)}
    <text x={lx} y={ly} fontSize="12" fontWeight="600" textAnchor="middle" style={{ fill: INK }}>{label}</text>
  </g>;
}

function Badge({ x, y, text, color }) {
  const w = text.length * 12.5 + 16;
  return <g>
    <rect x={x} y={y} width={w} height={22} rx="11" style={{ fill: color, opacity: .12 }} />
    <text x={x + w / 2} y={y + 15} textAnchor="middle" fontSize="12" style={{ fill: color }}>{text}</text>
  </g>;
}

function Scene({ m }) {
  const g = m === 2;
  return <svg viewBox="0 0 720 362" style={{ width: "100%", background: "var(--paper)", borderRadius: 14, display: "block" }}>
    <Box x={200} y={50} w={220} h={130} label="西欧" sub="时尚更替越来越快" color={EU} />
    <Box x={480} y={50} w={220} h={130} label="中国（及日本）" sub="物品积累相似，更替较慢" color={CN} />
    <Box x={14} y={258} w={170} h={78} label="美洲" sub="银矿 · 糖与烟草种植园" color={OT} dim={!g} />
    <Box x={500} y={266} w={200} h={72} label="东南亚" sub="采集型异域品" color={OT} dim={!g} />
    <Wheel cx={385} cy={148} r={20} dur="1.6s" color={EU} label="时尚之轮：快" />
    <Wheel cx={665} cy={148} r={20} dur="7s" color={CN} label="时尚之轮：慢" />

    {m === 0 && <g>
      <Badge x={212} y={100} text="天生好奇、物质主义？" color={EU} />
      <Badge x={492} y={100} text="天朝自足、排外？" color={CN} />
      <text x={360} y={235} textAnchor="middle" fontSize="13" style={{ fill: MU }}>原因被放在「民族心态」里：两边各自封闭，与外部世界无关</text>
    </g>}
    {m === 1 && <g>
      <Badge x={212} y={100} text="国家削弱宗族·重个人选择" color={EU} />
      <Badge x={492} y={100} text="官阶复兴·宗族受扶持" color={CN} />
      <text x={590} y={205} textAnchor="middle" fontSize="12" style={{ fill: CN }}>官服等级 = 复活的「配额」</text>
      <text x={360} y={240} textAnchor="middle" fontSize="13" style={{ fill: MU }}>原因在社会结构，但证据零散，只能当作线索</text>
    </g>}
    {g && <g>
      <Flow d="M 120 258 C 130 190, 160 140, 200 125" color={OT} label="白银（约占全球 85%）" lx={100} ly={200} />
      <Flow d="M 330 50 C 380 16, 540 16, 590 50" color={OT} label="白银 → 中国（对华输入约 90% 是银）" lx={460} ly={18} dur="3.5s" />
      <Flow d="M 520 180 C 480 236, 380 236, 320 180" color={CN} label="丝绸 · 棉布 · 瓷器 · 茶" lx={420} ly={250} dur="3.5s" n={4} />
      <Flow d="M 600 266 L 600 180" color={OT} label="" lx={0} ly={0} dur="2.4s" n={2} />
      <text x={612} y={222} fontSize="11.5" style={{ fill: INK }}>鱼翅·燕窝·檀香</text>
      <text x={612} y={238} fontSize="11.5" style={{ fill: MU }}>只能采集，难扩产</text>
      <text x={100} y={352} textAnchor="middle" fontSize="11.5" style={{ fill: MU }}>靠夺取银矿与强制劳役</text>
    </g>}
  </svg>;
}

export default function FashionDial() {
  const [m, setM] = useState(0), md = MODES[m];
  const ang = -60 + m * 60;
  return <div className="card" style={{ display: "grid", gap: 14 }}>
    <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
      <svg viewBox="0 0 160 96" style={{ width: 150, flex: "none" }} aria-label="原因拨盘">
        <path d="M 16 86 A 64 64 0 0 1 144 86" style={{ fill: "none", stroke: "var(--line)", strokeWidth: 10, strokeLinecap: "round" }} />
        {MODES.map((x, j) => { const a = (-150 + j * 60) * Math.PI / 180; return <circle key={x.id} cx={80 + 64 * Math.cos(a)} cy={86 + 64 * Math.sin(a)} r="7" style={{ fill: j === m ? "var(--ink)" : "var(--card)", stroke: "var(--ink)", strokeWidth: 1.5, cursor: "pointer" }} onClick={() => setM(j)} />; })}
        <g style={{ transform: `rotate(${ang}deg)`, transformOrigin: "80px 86px", transition: "transform .6s cubic-bezier(.5,1.6,.5,1)" }}>
          <line x1="80" y1="86" x2="80" y2="34" style={{ stroke: "var(--accent)", strokeWidth: 4, strokeLinecap: "round" }} />
        </g>
        <circle cx="80" cy="86" r="7" style={{ fill: "var(--ink)" }} />
      </svg>
      <div style={{ flex: 1, minWidth: 240 }}>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>为什么 18 世纪欧洲的时尚越转越快、中日却没有？转动拨盘，换一种解释：</div>
        <div className="seg" style={{ marginTop: 6, marginBottom: 0 }}>{MODES.map((x, j) => <button key={x.id} className={m === j ? "on" : ""} onClick={() => setM(j)}>{x.name}</button>)}</div>
      </div>
    </div>
    <Scene m={m} />
    <div>
      <div style={{ fontFamily: "var(--serif)", fontSize: 21 }}>{md.name} <span style={{ display: "inline-block", padding: "1px 10px", borderRadius: 99, fontSize: 13, fontFamily: "var(--sans)", verticalAlign: 3, color: "#fff", background: md.vtone === "key" ? "var(--green)" : md.vtone === "warn" ? "var(--accent)" : "var(--gold)" }}>{md.verdict}</span></div>
      <p style={{ margin: "6px 0" }}><b>主张：</b>{md.claim}</p>
      <div style={{ fontSize: 15 }}><b>{m === 2 ? "支撑它的证据：" : "放到证据前检验："}</b>
        <ul style={{ margin: "4px 0 0", paddingLeft: 20 }}>{md.check.map((c, i) => <li key={i} style={{ margin: "3px 0" }}>{c}</li>)}</ul>
      </div>
      {m === 2 && <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: 14 }}>关键概念：<C id="silver_as_good">白银是一种商品</C> · <C id="global_conjuncture">全球局势</C> · <C id="social_depreciation">时尚速度</C>。彭慕兰也提醒：欧洲非必需品需求是否真的强到足以造成经济差异，仍只是假说。</p>}
    </div>
  </div>;
}
