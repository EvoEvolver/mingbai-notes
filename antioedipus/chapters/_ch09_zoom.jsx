// 第 9 章专属图解 A：克分子 ↔ 分子 缩放图（同一批机器，两种尺度/体制）
import { useState, useMemo } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", BLUE = "#2c4a6e", GREEN = "#3c6b4a", VIOLET = "#5b3f7a", INK = "#1f1b16", MUTED = "#6b6257";
const HUES = ["#9b2c1f", "#b8862b", "#2c4a6e", "#3c6b4a", "#5b3f7a", "#8a5a2b", "#2f6f73", "#c0567a", "#6b7d2a", "#4a5fa8", "#a0522d"];

const SCENES = [
  {
    id: "social", label: "🏙️ 社会场",
    boxes: [
      { name: "阶级", stat: "工人 / 老板", x: 24, y: 70, w: 180, h: 230, color: BLUE },
      { name: "民族", stat: "我族 / 他族", x: 230, y: 70, w: 180, h: 230, color: RED },
      { name: "家庭", stat: "爸爸 / 妈妈 / 我", x: 436, y: 70, w: 180, h: 230, color: GOLD },
    ],
    tokens: ["手", "眼", "嗓音", "钱流", "街道", "机床", "歌", "面包", "屏幕", "汽车", "纸币", "旗", "河", "电流", "气味", "口", "节奏", "路线"],
    molar: "远看：只有几个统计大集合——阶级、民族、家庭。每个人只是其中一个计数单位，被归入一个框。偏执狂就在这一层工作：组织群众、排兵布阵、区分「我们」和「他们」。",
    molecular: "近看：框不见了，只剩眼、手、嗓音、钱流、街道……这些局部对象彼此横向连接，跨越阶级、民族、家庭的边界，不服从统计规律。这就是欲望机器的层面，也是精神分裂极的方向。",
  },
  {
    id: "sex", label: "⚧ 性别",
    boxes: [
      { name: "男", stat: "≈ 50%", x: 40, y: 70, w: 260, h: 230, color: BLUE },
      { name: "女", stat: "≈ 50%", x: 340, y: 70, w: 260, h: 230, color: RED },
    ],
    tokens: ["目光", "嗓音", "手", "皮肤", "气味", "衣料", "笑", "舞步", "字迹", "呼吸", "发", "汗", "温度", "节奏"],
    molar: "远看：人类被统计为两个大集合——男与女。精神分析在这层打转：要么只有一个性（菲勒斯，女人被定义为「缺」），要么两个性；无论哪种都绕着阉割，都是「拟人化的克分子表象」。",
    molecular: "近看：「非人之性」。目光、嗓音、皮肤、节奏……分子元素在两个框之间自由连接，到处是微观的跨性：女人身上的男人和男人身上的一样多，反之亦然。不是一个、也不是两个性，而是 n 个性别。",
  },
];

// 可复现的伪随机
function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function layout(scene) {
  const r = rng(scene.id === "social" ? 7 : 11);
  const N = 54, k = scene.boxes.length;
  const dots = [];
  const per = Math.ceil(N / k);
  // 分子位置：9×6 网格打乱后加抖动，保证铺满画面
  const order = Array.from({ length: N }, (_, i) => i);
  for (let i = N - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  for (let i = 0; i < N; i++) {
    const g = i % k, idx = Math.floor(i / k), b = scene.boxes[g];
    const cols = Math.max(3, Math.floor((b.w - 30) / 22));
    const rows = Math.ceil(per / cols);
    const mx = b.x + 20 + (idx % cols) * ((b.w - 40) / (cols - 1 || 1));
    const my = b.y + 82 + Math.floor(idx / cols) * ((b.h - 104) / Math.max(1, rows - 1));
    const cell = order[i], cx = cell % 9, cy = Math.floor(cell / 9);
    const sx = 40 + cx * 70 + (r() - .5) * 50, sy = 40 + cy * 50 + (r() - .5) * 34;
    dots.push({ g, mx, my, sx, sy, hue: HUES[Math.floor(r() * HUES.length)], tok: scene.tokens[i % scene.tokens.length], jx: (r() - .5) * 10, jy: (r() - .5) * 10, dur: 1.6 + r() * 2 });
  }
  // 横向连接：尽量跨越不同的框
  const links = [];
  let guard = 0;
  while (links.length < 46 && guard++ < 500) {
    const a = Math.floor(r() * N), b = Math.floor(r() * N);
    if (a === b || dots[a].g === dots[b].g) continue;
    const d = Math.hypot(dots[a].sx - dots[b].sx, dots[a].sy - dots[b].sy);
    if (d < 170) links.push([a, b]);
  }
  return { dots, links };
}

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = x => Math.max(0, Math.min(1, x));

export default function MolarMolecularZoom() {
  const [si, setSi] = useState(0);
  const [t, setT] = useState(0);
  const scene = SCENES[si];
  const { dots, links } = useMemo(() => layout(scene), [scene]);
  const boxOp = clamp(1 - t * 1.6);
  const linkOp = clamp((t - .4) / .45);
  const tokOp = clamp((t - .62) / .3);
  const stage = t < .34 ? 0 : t < .67 ? 1 : 2;
  const pos = dots.map(d => ({ x: lerp(d.mx, d.sx, t), y: lerp(d.my, d.sy, t) }));

  return (
    <div className="card" style={{ display: "grid", gap: 12 }}>
      <div className="seg" style={{ marginBottom: 0 }}>
        {SCENES.map((s, j) => <button key={s.id} className={si === j ? "on" : ""} onClick={() => setSi(j)}>{s.label}</button>)}
      </div>

      <svg viewBox="0 0 640 340" style={{ width: "100%", background: "var(--paper)", borderRadius: 14 }}>
        {/* 克分子：统计框 */}
        <g opacity={boxOp}>
          {scene.boxes.map(b => <g key={b.name}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="14" fill={b.color} fillOpacity=".08" stroke={b.color} strokeWidth="2.5" />
            <text x={b.x + b.w / 2} y={b.y + 30} textAnchor="middle" fontSize="22" fontWeight="700" fill={b.color}>{b.name}</text>
            <text x={b.x + b.w / 2} y={b.y + 50} textAnchor="middle" fontSize="12" fill={MUTED}>{b.stat}</text>
          </g>)}
          <text x="320" y="40" textAnchor="middle" fontSize="14" fill={INK}>大数定律 · 统计集合 · 「个人」= 一个计数单位</text>
        </g>

        {/* 分子：横向连接 */}
        <g opacity={linkOp}>
          {links.map(([a, b], j) => <line key={j} x1={pos[a].x} y1={pos[a].y} x2={pos[b].x} y2={pos[b].y}
            stroke={dots[a].hue} strokeWidth="1.4" strokeDasharray={j % 3 ? "0" : "4 3"} opacity=".55" />)}
        </g>

        {/* 点：同一批元素 */}
        {dots.map((d, j) => {
          const fill = t < .55 ? scene.boxes[d.g].color : d.hue;
          return <g key={scene.id + j} transform={`translate(${pos[j].x},${pos[j].y})`}>
            <g>
              {t > .55 && <animateTransform attributeName="transform" type="translate" values={`0 0;${d.jx} ${d.jy};0 0`} dur={`${d.dur}s`} repeatCount="indefinite" />}
              <circle r={3.2 + 4.5 * t} fill={fill} opacity={.9} />
              {tokOp > 0 && j % 2 === 0 && <text y={-9 - 3 * t} textAnchor="middle" fontSize="11" fill={INK} opacity={tokOp}
                style={{ paintOrder: "stroke", stroke: "var(--paper)", strokeWidth: 3 }}>{d.tok}</text>}
            </g>
          </g>;
        })}

        {stage === 2 && <text x="320" y="334" textAnchor="middle" fontSize="13" fill={VIOLET} style={{ paintOrder: "stroke", stroke: "var(--paper)", strokeWidth: 4 }}>
          {scene.id === "sex" ? "n 个性别：连接不再服从「男 / 女」的统计秩序" : "局部对象 + 流：横向连接、包含性析取、多义合取"}
        </text>}
      </svg>

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 14, color: BLUE, fontWeight: 600 }}>🔭 拉远 · 克分子</span>
        <input type="range" min="0" max="100" value={Math.round(t * 100)} onChange={e => setT(+e.target.value / 100)} aria-label="缩放" style={{ width: "100%", accentColor: "var(--accent)" }} />
        <span style={{ fontSize: 14, color: RED, fontWeight: 600 }}>分子 · 拉近 🔬</span>
      </div>

      <div style={{ minHeight: 120 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20, marginBottom: 4 }}>
          {stage === 0 && <><C id="molar_molecular">克分子</C>视角 <span className="muted-it">molar</span></>}
          {stage === 1 && <>中间地带：<C id="same_machines">同一批机器</C>，两种体制</>}
          {stage === 2 && <><C id="molar_molecular">分子</C>视角 <span className="muted-it">molecular</span></>}
        </div>
        <p style={{ margin: 0 }}>
          {stage === 0 && scene.molar}
          {stage === 1 && "注意：拉近时点并没有被换掉，还是那 54 个。克分子大集合不是另一种东西，而是下层分子元素按大数定律「抽签」般组合、筛选出来的统计结果（书中借用「马尔可夫链」：部分相互依赖的随机现象）。分子元素是生产力，大集合是它们的结果，而且反过来压抑它们。"}
          {stage === 2 && scene.molecular}
        </p>
        {stage === 2 && scene.id === "sex" && <p style={{ margin: "6px 0 0", color: MUTED, fontSize: 15 }}>👉 见概念 <C id="n_sexes">n 个性别</C>：精神分裂分析的口号是「各有其性」。</p>}
      </div>
      <p style={{ margin: 0, fontSize: 13, color: MUTED }}>示意图：框的名称、百分比、点的数量与标签都是为说明而设的示意，不是书中数据。要点只有一个：同一批元素，远看是统计集合，近看是欲望机器的连接——分子 ≠ 个人，克分子 ≠ 集体，两边都是「群体」。</p>
    </div>
  );
}
