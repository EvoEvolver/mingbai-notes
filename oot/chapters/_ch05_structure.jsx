// 第 5 章专属图解 ①：博物学家的眼睛 —— 先"少看"，再用四个变量把一株植物说出来
import { useState } from "react";
import { C } from "@kit";

const INK = "#1f1b16", PAPER = "#fffdf8", MUTED = "#6b6257";

// ---------- 通用植物绘制（另一个图解也会复用） ----------
// p: { petalN, petalForm: round|pointed|linear, petalWhorl: 1|2, petalSize: 0|1|2,
//      stamN, antherForm: dot|bar, stamArr: circle|triangle|hexagon, stamSize: 0|1|2,
//      leafForm: oval|lance|heart, leafN: 2|4|6, leafArr: opposite|alternate|whorled, leafSize: 0|1|2 }
export const DEFAULT_PLANT = {
  petalN: 5, petalForm: "round", petalWhorl: 1, petalSize: 1,
  stamN: 5, antherForm: "dot", stamArr: "circle", stamSize: 1,
  leafForm: "oval", leafN: 4, leafArr: "opposite", leafSize: 1,
};

function petalPath(form, len, w) {
  if (form === "pointed") return `M0,0 C${w},${-len * .35} ${w * .7},${-len * .8} 0,${-len} C${-w * .7},${-len * .8} ${-w},${-len * .35} 0,0Z`;
  if (form === "linear") return `M${-w * .28},0 L${-w * .28},${-len * .92} Q0,${-len * 1.04} ${w * .28},${-len * .92} L${w * .28},0Z`;
  return `M0,0 C${w * 1.25},${-len * .15} ${w * 1.15},${-len} 0,${-len} C${-w * 1.15},${-len} ${-w * 1.25},${-len * .15} 0,0Z`;
}
function leafPath(form, len, w) {
  if (form === "lance") return `M0,0 C${w * .55},${-len * .25} ${w * .4},${-len * .7} 0,${-len} C${-w * .4},${-len * .7} ${-w * .55},${-len * .25} 0,0Z`;
  if (form === "heart") return `M0,0 C${w},${-len * .1} ${w * 1.1},${-len * .75} ${w * .45},${-len * 1.02} C${w * .15},${-len * 1.1} 0,${-len * .95} 0,${-len * .88} C0,${-len * .95} ${-w * .15},${-len * 1.1} ${-w * .45},${-len * 1.02} C${-w * 1.1},${-len * .75} ${-w},${-len * .1} 0,0Z`;
  return `M0,0 C${w},${-len * .2} ${w * .9},${-len * .85} 0,${-len} C${-w * .9},${-len * .85} ${-w},${-len * .2} 0,0Z`;
}
function stamenPoints(n, arr, r) {
  const pts = [];
  if (arr === "circle") {
    for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / n; pts.push([r * Math.cos(a), r * Math.sin(a)]); }
    return pts;
  }
  const k = arr === "triangle" ? 3 : 6;
  const verts = Array.from({ length: k }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / k; return [r * Math.cos(a), r * Math.sin(a)]; });
  for (let i = 0; i < n; i++) {
    const t = i * k / n, s = Math.floor(t) % k, f = t - Math.floor(t);
    const [x1, y1] = verts[s], [x2, y2] = verts[(s + 1) % k];
    pts.push([x1 + (x2 - x1) * f, y1 + (y2 - y1) * f]);
  }
  return pts;
}

// colored=true 时用"文艺复兴式"的颜色；否则黑白线描
export function Plant({ p, colored = false, x = 0, y = 0, scale = 1, showStem = true }) {
  const pf = colored ? "#e7a3b5" : PAPER, ps = colored ? "#b24a6a" : INK;
  const lf = colored ? "#8fc28a" : PAPER, ls = colored ? "#2f6b3a" : INK;
  const sf = colored ? "#e2b437" : INK;
  const pl = [34, 46, 58][p.petalSize], pw = 15;
  const stemTop = -150, stemBot = 120;
  const stamR = 13, stamLen = [pl * .45, pl * .8, pl * 1.15][p.stamSize];
  const leafL = [34, 48, 64][p.leafSize];
  // 叶子位置
  const leaves = [];
  const span = stemBot - 30 - (stemTop + 70);
  if (p.leafArr === "opposite") {
    const pairs = p.leafN / 2;
    for (let i = 0; i < pairs; i++) { const yy = stemBot - 30 - i * span / Math.max(pairs, 1); leaves.push([yy, 62]); leaves.push([yy, -62]); }
  } else if (p.leafArr === "alternate") {
    for (let i = 0; i < p.leafN; i++) { const yy = stemBot - 25 - i * span / p.leafN; leaves.push([yy, i % 2 ? -58 : 58]); }
  } else {
    const per = p.leafN >= 6 ? 3 : p.leafN === 4 ? 4 : 2, rows = Math.ceil(p.leafN / per);
    let c = 0;
    for (let r = 0; r < rows; r++) {
      const yy = stemBot - 35 - r * span / Math.max(rows, 1);
      const angs = per === 3 ? [-65, 0, 65] : per === 4 ? [-80, -30, 30, 80] : [-62, 62];
      for (const a of angs) { if (c++ < p.leafN) leaves.push([yy, a, true]); }
    }
  }
  const whorls = p.petalWhorl === 2 ? [[0, .82, Math.PI / p.petalN], [1, 1, 0]] : [[1, 1, 0]];
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      {showStem && <line x1="0" y1={stemBot} x2="0" y2={stemTop} stroke={ls} strokeWidth="3" />}
      {showStem && leaves.map(([yy, a, w], i) =>
        <path key={"l" + i} d={leafPath(p.leafForm, leafL, leafL * .42)} transform={`translate(0,${yy}) rotate(${a})${w ? " scale(.85)" : ""}`}
          fill={lf} stroke={ls} strokeWidth="2" style={{ transition: "all .4s" }} />)}
      <g transform={`translate(0,${stemTop})`}>
        {whorls.map(([k, s, off]) => Array.from({ length: p.petalN }, (_, i) =>
          <path key={k + "-" + i} d={petalPath(p.petalForm, pl * s, pw * s)} transform={`rotate(${(i * 360 / p.petalN) + off * 180 / Math.PI})`}
            fill={pf} stroke={ps} strokeWidth="2" opacity={k === 0 ? .9 : 1} />))}
        <circle r={stamR + 5} fill={colored ? "#f3d27a" : PAPER} stroke={ps} strokeWidth="1.5" />
        {stamenPoints(p.stamN, p.stamArr, stamR).map(([sx, sy], i) => {
          const d = Math.hypot(sx, sy) || 1, ex = sx / d * stamLen, ey = sy / d * stamLen;
          const ang = Math.atan2(ey, ex) * 180 / Math.PI;
          return <g key={"s" + i}>
            <line x1={sx * .3} y1={sy * .3} x2={ex} y2={ey} stroke={INK} strokeWidth="1.6" />
            {p.antherForm === "dot" ? <circle cx={ex} cy={ey} r="4" fill={sf} stroke={INK} strokeWidth="1" />
              : <rect x={-7} y={-2.6} width="14" height="5.2" rx="2" fill={sf} stroke={INK} strokeWidth="1" transform={`translate(${ex},${ey}) rotate(${ang})`} />}
          </g>;
        })}
        <circle r="4" fill={INK} />
      </g>
    </g>);
}

// ---------- 感官过滤器 ----------
const CHANNELS = [
  { id: "shape", icon: "👁", name: "形状、线条、数目", keep: true, why: "唯一完整保留的通道：视觉能感知广延、给出证明，可以把对象拆成「部分之外的部分」，人人都能核对。" },
  { id: "color", icon: "🎨", name: "颜色", why: "连看见的东西也要再筛一遍：颜色难以拿来作有用的比较。留下的可见性只剩「黑与白」。" },
  { id: "smell", icon: "👃", name: "气味", why: "气味和味道不确定、因人而异，无法拆成人人都认可的清晰元素。" },
  { id: "taste", icon: "👅", name: "味道", why: "同上：今天苦明天甜、你说涩他说香，没法成为公共描述的基础。" },
  { id: "touch", icon: "✋", name: "触感", partial: true, why: "触觉被压缩到极少几种明显的区分（比如光滑/粗糙），其余一律不计。" },
  { id: "hearsay", icon: "👂", name: "传闻与古人记载", why: "「听说」理所当然被排除。这正是 Aldrovandi 式写法被剥掉的那一层。" },
  { id: "virtue", icon: "📜", name: "寓意、药效、纹章", why: "动物与植物身上的「语义」整层消失；这些顶多被挤到描述末尾的 Litteraria（文献）一栏。" },
];
const NOTES = {
  smell: [-150, -175, "闻起来像蜂蜜"], taste: [118, -150, "嚼起来微苦"], touch: [70, 30, "叶面柔软多毛"],
  hearsay: [-160, 60, "古书说它生于英雄之血"], virtue: [-150, -60, "可治头痛 · 象征贞洁"],
};

// ---------- 四个变量 ----------
const PARTS = [
  {
    id: "petal", name: "花冠", vars: [
      { v: "form", label: "形状", key: "petalForm", opts: [["round", "圆形"], ["pointed", "尖形"], ["linear", "条形"]] },
      { v: "number", label: "数量", key: "petalN", opts: [[3, "3 枚"], [4, "4 枚"], [5, "5 枚"], [6, "6 枚"]] },
      { v: "arr", label: "排列", key: "petalWhorl", opts: [[1, "单轮"], [2, "两轮交错"]] },
      { v: "size", label: "大小", key: "petalSize", opts: [[0, "短"], [1, "中"], [2, "长"]] },
    ]
  },
  {
    id: "stamen", name: "雄蕊", vars: [
      { v: "form", label: "形状", key: "antherForm", opts: [["dot", "圆头"], ["bar", "条状头"]] },
      { v: "number", label: "数量", key: "stamN", opts: [[3, "3 枚"], [5, "5 枚"], [6, "6 枚"], [10, "10 枚"]] },
      { v: "arr", label: "排列", key: "stamArr", opts: [["circle", "成圆"], ["triangle", "成三角"], ["hexagon", "成六边形"]] },
      { v: "size", label: "大小", key: "stamSize", opts: [[0, "短于花瓣"], [1, "与花瓣近等"], [2, "伸出花外"]] },
    ]
  },
  {
    id: "leaf", name: "叶", vars: [
      { v: "form", label: "形状", key: "leafForm", opts: [["oval", "卵形"], ["lance", "披针形"], ["heart", "心形"]] },
      { v: "number", label: "数量", key: "leafN", opts: [[2, "2 片"], [4, "4 片"], [6, "6 片"]] },
      { v: "arr", label: "排列", key: "leafArr", opts: [["opposite", "对生"], ["alternate", "互生"], ["whorled", "轮生"]] },
      { v: "size", label: "大小", key: "leafSize", opts: [[0, "小"], [1, "中"], [2, "大"]] },
    ]
  },
];
const VAR_COLOR = { form: "var(--accent)", number: "var(--blue)", arr: "var(--green)", size: "var(--gold)" };
const VAR_NAME = { form: "形状", number: "数量", arr: "排列", size: "大小" };
const lab = (part, key, val) => part.vars.find(x => x.key === key).opts.find(o => o[0] === val)[1];
const TOTAL = PARTS.reduce((m, pt) => m * pt.vars.reduce((k, v) => k * v.opts.length, 1), 1);

export default function StructureLab() {
  const [off, setOff] = useState({});           // 已被过滤掉的通道
  const [p, setP] = useState(DEFAULT_PLANT);
  const [part, setPart] = useState(0);
  const [msg, setMsg] = useState(null);
  const dropIds = CHANNELS.filter(c => !c.keep).map(c => c.id);
  const filtered = dropIds.every(id => off[id]);
  const colored = !off.color;
  const toggle = c => {
    setMsg(c);
    if (c.keep) return;
    setOff(o => ({ ...o, [c.id]: !o[c.id] }));
  };
  const pt = PARTS[part];
  const desc = PARTS.map(P => ({ P, txt: P.vars.map(v => lab(P, v.key, p[v.key])) }));

  return (
    <div className="card" style={{ display: "grid", gap: 16 }}>
      {/* 第一步 */}
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 19, marginBottom: 6 }}>第一步 · 先学会「少看」</div>
        <div style={{ color: "var(--muted)", fontSize: 15, marginBottom: 10 }}>
          一株植物最初带着颜色、气味、传说和药效一起涌来。点击下面的通道，把古典博物学不允许进入描述的东西关掉（<C id="restricted_gaze">被过滤的观看</C>）。
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CHANNELS.map(c => {
            const isOff = off[c.id];
            return <button key={c.id} onClick={() => toggle(c)} style={{
              border: "1px solid var(--line)", borderRadius: 99, padding: "4px 12px", font: "inherit", fontSize: 14, cursor: "pointer",
              background: c.keep ? "var(--ink)" : isOff ? "var(--paper)" : "var(--card)", color: c.keep ? "var(--paper)" : isOff ? "var(--muted)" : "var(--ink)",
              textDecoration: isOff ? "line-through" : "none", opacity: isOff ? .6 : 1,
            }}>{c.icon} {c.name}{c.keep ? " ✓" : ""}</button>;
          })}
          {!filtered && <button onClick={() => { setOff(Object.fromEntries(dropIds.map(i => [i, true]))); setMsg(null); }}
            style={{ border: "1px dashed var(--accent)", color: "var(--accent)", background: "transparent", borderRadius: 99, padding: "4px 12px", font: "inherit", fontSize: 14, cursor: "pointer" }}>
            一键应用古典过滤器</button>}
        </div>
        {msg && <div style={{ marginTop: 8, fontSize: 15, borderLeft: "3px solid var(--gold)", paddingLeft: 10 }}><b>{msg.icon} {msg.name}：</b>{msg.why}</div>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(240px,1fr) minmax(280px,1.2fr)", gap: 18, alignItems: "start" }} className="ch05-lab">
        <svg viewBox="-200 -230 400 370" style={{ width: "100%", background: "var(--paper)", borderRadius: 14, transition: "filter .6s", filter: colored ? "none" : "grayscale(1)" }}>
          <Plant p={p} colored={colored} />
          {Object.entries(NOTES).map(([k, [nx, ny, t]]) => !off[k] &&
            <g key={k}><rect x={nx - 4} y={ny - 15} width={t.length * 13 + 8} height="22" rx="6" fill="#fff" stroke={MUTED} strokeDasharray="3 3" opacity=".95" />
              <text x={nx} y={ny} fontSize="13" fill={MUTED}>{t}</text></g>)}
          <text x="0" y="132" textAnchor="middle" fontSize="13" fill={MUTED}>
            {filtered ? "只剩：线条、表面、形状、凸起" : "文艺复兴式的「整个语义网」仍附着在它身上"}</text>
        </svg>

        <div style={{ opacity: filtered ? 1 : .45, pointerEvents: filtered ? "auto" : "none", transition: "opacity .4s" }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: 19, marginBottom: 4 }}>第二步 · 只用四个变量描述</div>
          <div style={{ color: "var(--muted)", fontSize: 14, marginBottom: 8 }}>
            {filtered ? <>对每个部分，只许回答四个问题：<b style={{ color: VAR_COLOR.form }}>形状</b>、<b style={{ color: VAR_COLOR.number }}>数量</b>、<b style={{ color: VAR_COLOR.arr }}>排列</b>、<b style={{ color: VAR_COLOR.size }}>大小</b>。这就是 <C id="structure">结构</C>。</> : "先完成第一步的过滤。"}
          </div>
          <div className="seg">{PARTS.map((P, j) => <button key={P.id} className={part === j ? "on" : ""} onClick={() => setPart(j)}>{P.name}</button>)}</div>
          {pt.vars.map(v => <div key={v.key} style={{ display: "flex", alignItems: "center", gap: 8, margin: "6px 0", flexWrap: "wrap" }}>
            <span style={{ width: 44, fontSize: 14, fontWeight: 600, color: VAR_COLOR[v.v] }}>{v.label}</span>
            {v.opts.map(([val, l]) => <button key={String(val)} onClick={() => setP(q => ({ ...q, [v.key]: val }))} style={{
              border: "1px solid " + (p[v.key] === val ? VAR_COLOR[v.v] : "var(--line)"), background: p[v.key] === val ? VAR_COLOR[v.v] : "var(--paper)",
              color: p[v.key] === val ? "#fff" : "var(--ink)", borderRadius: 8, padding: "2px 10px", font: "inherit", fontSize: 14, cursor: "pointer"
            }}>{l}</button>)}
          </div>)}
          <div style={{ marginTop: 12, background: "var(--paper)", borderRadius: 12, padding: "10px 14px", fontFamily: "var(--serif)", fontSize: 15, lineHeight: 1.9 }}>
            {desc.map(({ P, txt }) => <div key={P.id}><b>{P.name}：</b>{txt.map((t, i) =>
              <span key={i} style={{ color: VAR_COLOR[P.vars[i].v] }}>{t}{i < 3 ? "，" : "。"}</span>)}</div>)}
          </div>
          <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 8 }}>
            这三行字就是全部描述。任何人拿着它都能画出左边同一株植物；反过来，任何人看到这株植物都会写出同一段话。
            这个小网格一共能区分 <b style={{ color: "var(--ink)" }}>{TOTAL.toLocaleString()}</b> 种不同的「植物」——林奈算过，38 个生殖器官 × 四个变量足以给出 5,776 种组合，够用来定义所有的属。
          </div>
        </div>
      </div>
      <style>{`@media(max-width:700px){.ch05-lab{grid-template-columns:1fr !important}}`}</style>
    </div>);
}
