// 全书脉络 · 专属图解：「零的变形记」——大零在各章换了六副面孔。
// 横杠拨到「慢」：看剧场如何把强度结账到这个零；拨到「快」：看利奥塔如何把它读回皮肤上的强度。
// 另含「贯穿线索追踪」组件 Trace。
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", INK = "#1f1b16", MUTED = "#6b6257";
const COLORS = ["#9b2c1f", "#2c4a6e", "#3c6b4a", "#8a5a2b", "#5b3f7a", "#4a4a4a"];

const STATIONS = [
  {
    ch: "ch01", no: "第 1 章", mask: "剧场的大零", short: "剧场",
    slow: "横杠一减速，力比多带被折成有里有外的剧场体积：台上只演替身，台后供着那个空的中心——上帝、理念、能指。台上发生的一切都要向它结账，于是一切在场之物都只是「缺了点什么」的表象。",
    fast: "零并不在皮肤之外，它就是横杠转慢时的一种效果。批判、宗教与意义理论共享同一个剧场，所以利奥塔不去推翻剧场（那又要一个更真的外部），而是让横杠重新转起来。",
    ids: [["ch01:great_zero", "大零"], ["ch01:theatrical_volume", "剧场体积"], ["ch01:abatement", "横杠减速"], ["ch01:critique_religion", "批判即宗教"]],
  },
  {
    ch: "ch02", no: "第 2 章", mask: "缺席的所指", short: "符号学",
    slow: "符号学把每个符号读成替代：意义永远在下一个符号那里，链条尽头是一个永远缺席、却让一切有意义的中心。读符号就是出发去勘探、破译、带回收益——一门「有人在对我们说话」的宗教科学。",
    fast: "同一个符号同时是一团不可交换的强度：张量符号。两种读法互相掩饰、无法分离，没有哪一种是「真相」。所以不是把符号学换成别的理论，而是看到每个符号都是双面的。",
    ids: [["ch02:great_zero", "缺席的中心"], ["ch02:semiotic_nihilism", "符号学的虚无主义"], ["ch02:tensor_sign", "张量符号"], ["ch02:dissimulation", "掩饰"]],
  },
  {
    ch: "ch03", no: "第 3 章", mask: "有机身体 / 外部", short: "马克思",
    slow: "「小女孩马克思」渴望一具完整的身体：人与大地、公社浑然一体的（无）机身体，或活劳动力那份「给出多于所得」的原初馈赠。资本被控诉为对这具身体的切割与卖淫——批判需要这个外部来对照。鲍德里亚的象征交换与原始社会，是同一个外部的另一个版本。",
    fast: "没有颠覆性的区域，也没有原始社会：资本主义交换里的强度不比象征交换少，所谓外部只是剧场的后台。利奥塔转而读马克思文本里的情感与享乐（《资本论》的「未完成」本身就是一种享受）。",
    ids: [["ch03:inorganic_body", "（无）机身体"], ["ch03:little_girl_marx", "小女孩马克思"], ["ch03:no_primitive", "没有原始社会"], ["ch03:every_economy_libidinal", "一切政治经济学都是力比多的"]],
  },
  {
    ch: "ch04", no: "第 4 章", mask: "méson 与货币", short: "城邦·货币",
    slow: "希腊城邦中心的 méson——堆放战利品、谁都能上去却谁也不能久占的讲坛——和亚里士多德的货币是同一个零：一切交换都穿过它，最后被抵消。强度一旦被拿来比较、按比例换算，就被取消了；「需要」是被驯化、可度量的欲望。",
    fast: "méson 不是藏在舞台下的「地下室」（马克思要下去找劳动价值），而是皮肤表面的一种布置：决定哪些冲动被引向中心、哪些被封锁在外。献祭、卖淫、精神分析是它的泄口，但付款总把泄出去的东西收回循环。",
    ids: [["ch04:meson_zero", "中项之零"], ["ch04:comparison_annuls", "比较即取消"], ["ch04:need_chreia", "需要（chreia）"], ["ch04:outlet_valve", "出口阀门"]],
  },
  {
    ch: "ch05", no: "第 5 章", mask: "集中之零 / 信用之零", short: "资本",
    slow: "资本建立在一个中心零上：以标准为参照，把一切扰动测量、翻译、抵消归零。它又分成清偿之零（价格平衡）和征服之零（利润扩张）。信用预付尚不存在的财富，但仍要用新商品清偿。",
    fast: "同一笔信用里，符号与张量并存于不同的时空：投资也可能是投机，手段也可能是财宝。这是双重性而非矛盾——资本没有外部，但它的零本身就在不可预测地被投注，要做的是在里面漂移，而不是等它崩溃。",
    ids: [["ch05:concentratory_zero", "集中之零"], ["ch05:two_zeros", "两种零"], ["ch05:credit_money", "信用货币"], ["ch05:duplicity_credit", "信用的双重性"]],
  },
  {
    ch: "ch06", no: "第 6 章", mask: "凝固的美杜莎", short: "理论",
    slow: "理论把流动之物盯住、定住：理想的理论文本是一个一致、饱和、自给自足的有机身体，可以被无限复述——与资本「商品生产商品」同构。它要求符号清晰，就像情人要求爱的证据。",
    fast: "石化本身就是一种享乐，理论不是欲望之外的冷静区域。因此也没有「反理论」、没有强度的专属地盘；这本书只想做一个匿名导体，让强度通过并变形——连利奥塔自己的写作也在零的谱系之内。",
    ids: [["ch06:medusa", "美杜莎"], ["ch06:theoretical_body", "理论 = 凝固的有机身体"], ["ch06:no_anti_theory", "没有反理论"], ["ch06:conductor", "匿名导体"]],
  },
];

// 六个化身沿一条横杠排开；横杠慢时中心是实心的零，快时零溶进皮肤
const W = 640, H = 230, Y = 112;
const xs = STATIONS.map((_, i) => 60 + i * ((W - 120) / 5));

export function ZeroMetamorphosis() {
  const [sel, setSel] = useState(0);
  const [fast, setFast] = useState(false);
  const S = STATIONS[sel], col = COLORS[sel];
  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="seg" style={{ marginBottom: 10 }}>
        <button className={!fast ? "on" : ""} onClick={() => setFast(false)}>横杠转慢 · 剧场读法</button>
        <button className={fast ? "on" : ""} onClick={() => setFast(true)}>横杠转快 · 力比多读法</button>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }} role="img" aria-label="零的六个化身">
        <defs>
          <radialGradient id="zero-skin"><stop offset="0" stopColor="#f6d9b8" /><stop offset="1" stopColor="#f6d9b8" stopOpacity="0" /></radialGradient>
        </defs>
        {/* 横杠 / 皮肤 */}
        {fast
          ? <path d={`M20,${Y} ` + Array.from({ length: 32 }, (_, k) => `Q${30 + k * 19},${Y + (k % 2 ? 26 : -26)} ${40 + k * 19},${Y}`).join(" ")}
              fill="none" stroke={GOLD} strokeWidth="3" opacity=".55" />
          : <line x1="20" y1={Y} x2={W - 20} y2={Y} stroke={INK} strokeWidth="5" opacity=".75" />}
        {STATIONS.map((s, i) => {
          const on = i === sel;
          return (
            <g key={i} style={{ cursor: "pointer" }} onClick={() => setSel(i)}>
              {fast && <circle cx={xs[i]} cy={Y} r={on ? 52 : 40} fill="url(#zero-skin)" />}
              <circle cx={xs[i]} cy={Y} r={on ? 36 : 28}
                fill={fast ? "none" : (on ? COLORS[i] : "#fffdf8")}
                stroke={COLORS[i]} strokeWidth={on ? 4 : 2.5}
                strokeDasharray={fast ? "4 6" : "none"}
                style={{ transition: "all .4s" }} />
              <text x={xs[i]} y={Y + 9} textAnchor="middle" fontSize={on ? 26 : 22} fontFamily="var(--serif)" fontWeight="700"
                fill={fast ? COLORS[i] : (on ? "#fff" : COLORS[i])} opacity={fast ? .45 : 1} style={{ pointerEvents: "none" }}>0</text>
              <text x={xs[i]} y={Y - 52} textAnchor="middle" fontSize="12" fill={MUTED} style={{ pointerEvents: "none" }}>{s.no}</text>
              <text x={xs[i]} y={Y + 64} textAnchor="middle" fontSize="14" fontWeight={on ? 700 : 500} fill={on ? COLORS[i] : INK} style={{ pointerEvents: "none" }}>{s.short}</text>
            </g>);
        })}
        <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="12.5" fill={MUTED}>
          {fast ? "横杠转快：零不再是中心，只是皮肤上一处被投注的区域" : "横杠转慢：每一章都有一个把强度结账归零的中心 · 点击圆圈切换"}
        </text>
      </svg>
      <div style={{ marginTop: 8 }}>
        <div className="kicker" style={{ color: col }}>{S.no} · 零的化身：{S.mask}</div>
        <div style={{ background: fast ? "#fffdf8" : "#f3ece0", border: fast ? `2px solid ${col}` : "2px solid transparent", borderRadius: 12, padding: "10px 14px", transition: ".3s" }}>
          <small style={{ color: fast ? RED : MUTED, letterSpacing: ".1em" }}>{fast ? "皮肤上看（利奥塔的力比多读法）" : "剧场里看（零如何结账）"}</small>
          <p style={{ margin: "4px 0 0" }}>{fast ? S.fast : S.slow}</p>
        </div>
        <div className="chips">{S.ids.map(([id, t]) => <span key={id} className="chip"><C id={id}>{t}</C></span>)}</div>
        <p style={{ fontSize: 14, color: MUTED, marginTop: 10 }}>
          术语表里，这个结构叫 <C id="ch00:great_zero">大零</C>，它贪婪的后半身叫 <C id="ch00:concentratory_zero">集中之零</C>；二者都是 <C id="ch00:the_bar">横杠</C> 减速的产物。名字一章一换，结构不变：一切强度都被结算到一个别处。
        </p>
      </div>
    </div>);
}

// 贯穿线索追踪：stations: [{ch, id, text}]
export function Trace({ stations, color = RED }) {
  return (
    <div style={{ position: "relative", paddingLeft: 26 }}>
      <div style={{ position: "absolute", left: 9, top: 8, bottom: 8, width: 2, background: color, opacity: .35 }} />
      {stations.map((s, i) => (
        <div key={i} style={{ position: "relative", marginBottom: 14 }}>
          <span style={{ position: "absolute", left: -23, top: 6, width: 14, height: 14, borderRadius: "50%", background: color, border: "3px solid #fffdf8", boxShadow: "0 0 0 1px " + color }} />
          <div style={{ fontSize: 13, color: MUTED }}>{s.ch === "ch00" ? "导言与术语" : `第 ${+s.ch.slice(2)} 章`} · <C id={`${s.ch}:${s.id}`} /></div>
          <div style={{ marginTop: 2 }}>{s.text}</div>
        </div>))}
    </div>);
}
