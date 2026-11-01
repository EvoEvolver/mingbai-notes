// 导论专属图解 (a)：「该拿什么比？」—— 比较单位切换器（示意地图）
import { useState } from "react";
import { C } from "@kit";

// 配色：欧洲/英格兰 = blue；中国/江南 = accent；其他地区 = gold
const EU = "var(--blue)", CN = "var(--accent)", OT = "var(--gold)";
const HALO = { paintOrder: "stroke", stroke: "var(--paper)", strokeWidth: 4 };

// 粗略的经纬度 → 画布坐标（等距圆柱投影，仅示意）
const P = (lon, lat) => [((lon + 18) * 5.2).toFixed(1), ((68 - lat) * 6.2).toFixed(1)];
const path = pts => "M" + pts.map(([a, b]) => P(a, b).join(",")).join("L") + "Z";

const LAND = [
  // 欧亚大陆主体（极度简化）
  [[-9, 37], [-9, 43], [-2, 43.5], [-4.5, 48], [2, 51], [5, 53], [8, 54], [9, 57], [11, 56], [10, 54], [14, 54], [20, 55], [22, 58], [24, 60], [22, 61], [21, 64], [25, 65.5], [30, 67], [60, 67], [100, 67], [140, 67], [146, 62],
  [142, 59], [137, 54], [140, 48], [135, 43], [130, 42], [129, 35.2], [126.5, 34.6], [126, 38], [125, 40], [121, 40], [122, 37], [119, 37], [120, 34], [122, 31], [121, 28], [119, 25], [117, 23], [113, 22], [110, 21],
  [108, 21], [106, 18], [109, 12], [105, 9], [103, 10], [100, 13], [100, 8], [103.5, 1.5], [100, 3], [98, 8], [98, 16], [94, 17], [92, 22], [89, 22], [86, 20], [80, 15], [80, 10], [77, 8], [73, 16], [72.6, 21], [70, 22],
  [67, 25], [62, 25], [57, 25.5], [56, 27], [50, 30], [48, 29.5], [51, 25], [56, 24], [59, 22.5], [52, 16], [45, 13], [43, 13], [39, 21], [35, 28], [34, 31], [35, 36], [36, 36.5], [30, 36.5], [27, 37], [26, 40],
  [23, 40], [23, 37], [21, 38], [19, 40], [19.5, 42], [14, 45.5], [12.5, 44], [18, 40], [16, 38], [15.5, 40], [12, 42], [10, 44], [7, 43.5], [3, 43], [3, 42], [0, 39], [-2, 36.7], [-6, 36]],
  // 斯堪的纳维亚
  [[5, 58], [5, 62.5], [12, 66], [22, 67], [21, 64], [17, 61], [19, 60], [16, 57], [14, 55.5], [12.5, 56], [11, 59], [8, 58]],
  // 非洲北部（截断）
  [[-17, 15], [-17, 21], [-10, 30], [-6, 35.8], [10, 37], [11, 33], [20, 31], [32, 31], [34, 28], [43, 12], [51, 12], [50, 4], [-8, 4]],
  // 不列颠、爱尔兰
  [[-5, 50], [1.5, 51], [1.7, 52.7], [0, 53.5], [-1.5, 55], [-2, 57.6], [-5, 58.6], [-6, 56.5], [-4.8, 54.8], [-3, 54], [-4.5, 53.3], [-4.5, 51.7]],
  [[-10, 51.5], [-6, 52], [-6, 54.5], [-8, 55], [-10, 54]],
  // 日本、台湾、斯里兰卡
  [[131, 34], [135, 33.5], [140, 35], [141, 38], [141.5, 41], [140, 40], [139.5, 38], [137, 37], [133, 35.5], [131, 34.5]],
  [[129.7, 33.5], [131.8, 33], [131, 31], [130.2, 31.4]],
  [[140, 42], [141.5, 45], [145, 43.5], [143, 42]],
  [[120.2, 22.5], [121.8, 24.8], [121, 25.2], [120, 23.5]],
  [[80, 6], [81.8, 7], [80, 9.8]],
];

// 国家与大陆的粗略轮廓
const SHAPES = {
  britain: [[-5, 50], [1.5, 51], [1.7, 52.7], [0, 53.5], [-1.5, 55], [-2, 57.6], [-5, 58.6], [-6, 56.5], [-4.8, 54.8], [-3, 54], [-4.5, 53.3], [-4.5, 51.7]],
  china: [[98, 28], [98, 24], [101, 22], [106, 22], [108, 21.5], [110, 21], [113, 22], [117, 23], [119, 25], [121, 28], [122, 31], [120, 34], [119, 37], [122, 37], [121, 40], [118, 40.5], [114, 41.5], [110, 41], [105, 38.5], [103, 37.5], [100, 38], [97, 36], [97, 32]],
  india: [[68, 24], [70, 22], [72.6, 21], [73, 16], [77, 8], [80, 10], [80, 15], [86, 20], [89, 22], [92, 22], [92, 26], [88, 27], [80, 30], [75, 32.5], [73, 34], [71, 30], [69, 27]],
  europe: [[-10, 36], [-10, 44], [-5, 48], [3, 52], [5, 57], [5, 62.5], [14, 67], [40, 67], [45, 56], [40, 47], [31, 45], [28.5, 41], [23, 36], [15, 37], [12, 37.5], [3, 39], [-2, 36.5]],
};

// 地点（经度、纬度）
const PLACES = {
  england: { ll: [-1.2, 52.5], name: "英格兰", col: EU },
  holland: { ll: [5, 52.2], name: "荷兰", col: EU },
  ukraine: { ll: [32, 49], name: "乌克兰", col: EU },
  poland: { ll: [20, 52], name: "波兰", col: EU },
  balkans: { ll: [22, 43], name: "巴尔干", col: EU },
  s_italy: { ll: [16, 40], name: "南意大利", col: EU },
  yangzi: { ll: [120.3, 31], name: "长江三角洲（江南）", col: CN },
  gansu: { ll: [103.5, 36], name: "甘肃", col: CN },
  kanto: { ll: [139.6, 35.9], name: "关东平原", col: OT },
  gujarat: { ll: [72, 22.8], name: "古吉拉特", col: OT },
};

const MODES = [
  {
    key: "nation", label: "① 国家 vs 国家", q: "英国 vs 中国（或印度）",
    verdict: "不公平",
    text: "按今天的民族国家来分：一边是一个岛国，另一边是一个次大陆。中国、印度在面积、人口和内部差异上更接近「整个欧洲」，而不是某个欧洲国家；它们内部能与英国、荷兰相比的地区，被包括「亚洲的巴尔干、南意大利、波兰」在内的平均数淹没了。",
    note: "除非故事的主角就是国家政策，否则「国家」并不是一个好用的比较单位。",
  },
  {
    key: "continent", label: "② 大陆 vs 大陆", q: "「欧洲」vs「中国」",
    verdict: "仍然失真",
    text: "常见的第二种做法：先找出让「欧洲」整体与众不同的东西（其实往往只描述了欧洲的一部分），把世界其余部分丢开后，再在欧洲内部找英国的特殊之处。可是荷兰与乌克兰、江南与甘肃之间几乎没有什么本质上的共同点，大陆或「文明」这样的单位与日常生活、贸易与技术传播的格局关系不大。",
    note: "脚注里彭慕兰还提醒：「西欧」本身就是一个社会经济建构，爱尔兰、南意大利和伊比利亚大部分地区并不具备通常归给「西欧」的那种发展。",
  },
  {
    key: "core", label: "③ 核心区 vs 核心区", q: "英格兰 vs 江南（以及关东、古吉拉特）",
    verdict: "公平",
    text: "旧大陆上散布着几块核心区——长江三角洲、关东平原、英国与荷兰、古吉拉特——它们彼此共享、却不与所在大陆的其余部分共享一些关键特征：相对自由的市场、广泛的手工业、高度商业化的农业。长江三角洲约 1750 年人口约 3100 万至 3700 万（视划定范围而定），完全够格与 18 世纪的欧洲国家对比。",
    note: "所以先在这些位置相当的核心区之间直接比较，再在需要时回到大陆或更大的单位。",
  },
];

function Region({ ll, name, col, r = 9, dim, label = true, dx = 12, dy = 4, anchor = "start", pulse }) {
  const [x, y] = P(...ll);
  return <g opacity={dim ? 0.55 : 1}>
    {pulse && <circle cx={x} cy={y} r={r} fill="none" stroke={col} strokeWidth="2">
      <animate attributeName="r" values={`${r};${r + 12};${r}`} dur="2.4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values=".8;0;.8" dur="2.4s" repeatCount="indefinite" />
    </circle>}
    <circle cx={x} cy={y} r={r} fill={col} fillOpacity={dim ? 0.25 : 0.85} stroke={col} strokeWidth="1.5" />
    {label && <text x={+x + dx} y={+y + dy} fontSize="13" textAnchor={anchor} fill="var(--ink)" style={{ paintOrder: "stroke", stroke: "var(--paper)", strokeWidth: 3 }}>{name}</text>}
  </g>;
}

function Outline({ shape, col, label, lx, ly, dashed, fillOp = 0.16 }) {
  return <g>
    <path d={path(SHAPES[shape])} fill={col} fillOpacity={fillOp} stroke={col} strokeWidth="2" strokeDasharray={dashed ? "6 4" : undefined} />
    {label && <text x={lx} y={ly} fontSize="15" fontWeight="700" textAnchor="middle" fill={col} style={{ paintOrder: "stroke", stroke: "var(--paper)", strokeWidth: 4 }}>{label}</text>}
  </g>;
}

function MapSvg({ mode }) {
  const Pl = (k, o = {}) => <Region key={k} {...PLACES[k]} {...o} />;
  return <svg viewBox="0 0 860 380" style={{ width: "100%", background: "var(--paper)", borderRadius: 14, display: "block" }}>
    {LAND.map((pts, i) => <path key={i} d={path(pts)} fill="var(--paper2)" stroke="var(--line)" strokeWidth="1" />)}
    {mode === "nation" && <>
      <Outline shape="china" col={CN} label="中国（整体平均）" lx={P(108, 31)[0]} ly={P(108, 31)[1]} />
      <Outline shape="india" col={OT} label="印度（整体）" lx={P(79, 22)[0]} ly={P(79, 22)[1]} />
      <Outline shape="britain" col={EU} fillOp={0.6} />
      <text x={P(-3, 61)[0]} y={P(-3, 61)[1]} fontSize="15" fontWeight="700" fill={EU} textAnchor="middle">英国</text>
      {Pl("yangzi", { dim: true, label: true, r: 6, name: "江南", dx: 10 })}
      {Pl("gansu", { dim: true, r: 6, dx: -10, anchor: "end" })}
      <text x="430" y="368" fontSize="13" textAnchor="middle" fill="var(--muted)" style={HALO}>一边是岛国，一边是次大陆：江南与甘肃被平均成同一个「中国」</text>
    </>}
    {mode === "continent" && <>
      <Outline shape="europe" col={EU} label="「欧洲」" lx={P(18, 57)[0]} ly={P(18, 57)[1]} dashed />
      <Outline shape="china" col={CN} label="「中国」" lx={P(108, 31)[0]} ly={P(108, 31)[1]} dashed />
      <Outline shape="india" col={OT} label="「印度」" lx={P(79, 22)[0]} ly={P(79, 22)[1]} dashed />
      {Pl("holland", { r: 6, dx: -9, dy: -8, anchor: "end" })}
      {Pl("ukraine", { r: 6, dim: true })}
      {Pl("poland", { r: 5, dim: true, dy: -8, dx: 6 })}
      {Pl("balkans", { r: 5, dim: true, dy: -6 })}
      {Pl("s_italy", { r: 5, dim: true, dy: 14, dx: -2 })}
      {Pl("yangzi", { r: 6, name: "江南", dx: 10 })}
      {Pl("gansu", { r: 6, dim: true, dx: -10, anchor: "end" })}
      <text x="430" y="368" fontSize="13" textAnchor="middle" fill="var(--muted)" style={HALO}>荷兰与乌克兰、江南与甘肃：同一大陆之内，差别比两端之间还大</text>
    </>}
    {mode === "core" && <>
      {Pl("england", { r: 10, pulse: true, name: "英格兰", dx: -14, anchor: "end", dy: -6 })}
      {Pl("holland", { r: 8, pulse: true, dx: 11, dy: -8 })}
      {Pl("gujarat", { r: 10, pulse: true, dx: -14, anchor: "end" })}
      {Pl("yangzi", { r: 11, pulse: true, dx: -14, anchor: "end", dy: 22 })}
      {Pl("kanto", { r: 9, pulse: true, dx: -12, anchor: "end", dy: -14 })}
      {Pl("ukraine", { r: 5, dim: true })}
      {Pl("gansu", { r: 5, dim: true, dx: -9, anchor: "end" })}
      {[["england", "yangzi"], ["holland", "kanto"], ["england", "gujarat"]].map(([a, b], i) => {
        const [x1, y1] = P(...PLACES[a].ll), [x2, y2] = P(...PLACES[b].ll);
        const mx = (+x1 + +x2) / 2, my = Math.min(+y1, +y2) - 60 - i * 14;
        return <path key={i} d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`} fill="none" stroke="var(--ink)" strokeOpacity=".35" strokeDasharray="5 5" strokeWidth="1.5">
          <animate attributeName="stroke-dashoffset" values="20;0" dur="1.2s" repeatCount="indefinite" />
        </path>;
      })}
      <text x="430" y="368" fontSize="13" textAnchor="middle" fill="var(--muted)" style={HALO}>位置相当的核心区：自由市场、手工业、商业化农业——它们彼此更像</text>
    </>}
    <text x="850" y="18" fontSize="11" textAnchor="end" fill="var(--muted)">示意地图 · 轮廓与位置均为近似</text>
    <g fontSize="12" fill="var(--ink)">
      <rect x="12" y="300" width="12" height="12" fill={EU} rx="2" /><text x="30" y="310">欧洲</text>
      <rect x="12" y="318" width="12" height="12" fill={CN} rx="2" /><text x="30" y="328">中国</text>
      <rect x="12" y="336" width="12" height="12" fill={OT} rx="2" /><text x="30" y="346">其他地区</text>
    </g>
  </svg>;
}

export default function UnitSwitcher() {
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const m = MODES[i];
  const vcol = i === 2 ? "var(--green)" : "var(--accent)";
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <div className="seg" style={{ marginBottom: 0 }}>{MODES.map((x, j) =>
        <button key={x.key} className={i === j ? "on" : ""} onClick={() => setI(j)}>{x.label}</button>)}</div>
      <MapSvg mode={m.key} />
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>
          {m.q} <span style={{ fontSize: 14, padding: "2px 10px", borderRadius: 99, border: `1.5px solid ${vcol}`, color: vcol, marginLeft: 6, verticalAlign: 3 }}>{m.verdict}</span>
        </div>
        <p style={{ margin: "8px 0" }}>{m.text}</p>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>{m.note}</p>
      </div>
      {i === 2 && <div style={{ borderTop: "1px dashed var(--line)", paddingTop: 12, display: "grid", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <b>再进一步：<C id="reciprocal_comparison">相互比较</C>——问题要能倒过来问</b>
          <button className="btn" onClick={() => setFlip(f => !f)} style={{ border: "1px solid var(--line)", background: "var(--paper)", borderRadius: 99, padding: "3px 14px", cursor: "pointer", font: "inherit", fontSize: 14 }}>⇄ 倒过来问</button>
        </div>
        <div key={flip ? "b" : "a"} style={{ display: "grid", gridTemplateColumns: "1fr", gap: 6, animation: "exdIn .4s" }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: 19 }}>
            {flip
              ? <>为什么<span style={{ color: EU }}>英格兰</span>没有变成<span style={{ color: CN }}>江南</span>？</>
              : <>为什么<span style={{ color: CN }}>江南</span>没有变成<span style={{ color: EU }}>英格兰</span>？</>}
          </div>
          <div style={{ fontSize: 15 }}>
            {flip
              ? "彭慕兰的新问法：把英格兰也当成「偏离」，去找是哪些缺失、意外与障碍让它没有走上江南那条更劳动密集的道路。答案指向两次断裂：位置便利的煤，和美洲新大陆。"
              : "传统问法：把欧洲道路当成「正常」，只去找非欧洲地区的「阻碍」与「失败」。这样一来，欧洲何时真正走出马尔萨斯世界反而变得不重要了。"}
          </div>
        </div>
      </div>}
    </div>);
}
