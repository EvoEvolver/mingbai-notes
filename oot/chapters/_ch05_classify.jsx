// 第 5 章专属图解 ②③：体系 vs 方法；自然史的表格 vs 生物学的生命
import { useState } from "react";
import { C, Toggle } from "@kit";
import { Plant, DEFAULT_PLANT } from "./_ch05_structure.jsx";

// ---------- 六株玩具植物 ----------
const FEATS = [
  { key: "petalN", name: "花瓣数", fmt: v => v + " 瓣" },
  { key: "petalForm", name: "花瓣形", fmt: v => ({ round: "圆", pointed: "尖", linear: "条" }[v]) },
  { key: "stamN", name: "雄蕊数", fmt: v => v + " 蕊" },
  { key: "leafForm", name: "叶形", fmt: v => ({ oval: "卵形叶", lance: "披针叶", heart: "心形叶" }[v]) },
  { key: "leafArr", name: "叶序", fmt: v => ({ opposite: "对生", alternate: "互生", whorled: "轮生" }[v]) },
];
const PLANTS = [
  { id: "A", petalN: 5, petalForm: "round", stamN: 5, leafForm: "oval", leafArr: "opposite" },
  { id: "B", petalN: 5, petalForm: "round", stamN: 5, leafForm: "oval", leafArr: "alternate" },
  { id: "C", petalN: 5, petalForm: "round", stamN: 10, leafForm: "oval", leafArr: "opposite" },
  { id: "D", petalN: 4, petalForm: "pointed", stamN: 6, leafForm: "lance", leafArr: "whorled" },
  { id: "E", petalN: 4, petalForm: "pointed", stamN: 6, leafForm: "lance", leafArr: "alternate" },
  { id: "F", petalN: 4, petalForm: "pointed", stamN: 5, leafForm: "lance", leafArr: "whorled" },
];
const shared = (a, b) => FEATS.filter(f => a[f.key] === b[f.key]).length;

function Mini({ pl, size = 92, dim }) {
  const p = { ...DEFAULT_PLANT, ...pl, leafN: pl.leafArr === "whorled" ? 6 : 4, stamSize: 1, petalSize: 1 };
  return <svg viewBox="-110 -215 220 345" style={{ width: size, height: size * 1.4, opacity: dim ? .35 : 1, transition: "opacity .3s" }}><Plant p={p} /></svg>;
}

const SYS_CHARS = [
  { key: "stamN", label: "只看雄蕊数", note: "林奈式的选择：只看结实（生殖）器官。F 因为恰好 5 枚雄蕊，被分到了 A、B 一边——叶子、花瓣再不相同也不算数。" },
  { key: "leafArr", label: "只看叶序", note: "换一个特征，就是另一套体系：分组全变了。Adanson 一人就列出过 65 种可能的体系。体系是任意的，但一经选定就不能增减任何一个元素。" },
  { key: "petalN", label: "只看花瓣数", note: "这一次分组恰好和「整体相似」一致。林奈并不否认：总有一天，一个人为体系也许能撞上「自然体系」——但在那之前，人为体系是必需的。" },
];

function SystemView() {
  const [ci, setCi] = useState(0);
  const ch = SYS_CHARS[ci], f = FEATS.find(x => x.key === ch.key);
  const groups = {};
  PLANTS.forEach(pl => { (groups[pl[ch.key]] ??= []).push(pl); });
  return <div>
    <p style={{ marginTop: 0 }}><C id="system">体系</C>：先从一切可描述的结构里<b>挑出少数几个元素</b>当作特征，其他差异一律视而不见。选一个特征试试：</p>
    <div className="seg">{SYS_CHARS.map((c, j) => <button key={c.key} className={ci === j ? "on" : ""} onClick={() => setCi(j)}>{c.label}</button>)}</div>
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
      {Object.entries(groups).map(([val, pls]) => <div key={val} style={{ border: "2px solid var(--accent)", borderRadius: 14, padding: "6px 10px", background: "var(--paper)" }}>
        <div style={{ fontSize: 14, color: "var(--accent)", fontWeight: 600 }}>{f.fmt(isNaN(+val) ? val : +val)} 类</div>
        <div style={{ display: "flex", gap: 4 }}>{pls.map(pl => <div key={pl.id} style={{ textAlign: "center" }}>
          <Mini pl={pl} size={70} /><div style={{ fontSize: 13 }}>{pl.id}</div></div>)}</div>
      </div>)}
    </div>
    <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 0 }}>{ch.note}</p>
  </div>;
}

// 方法：逐个描述，只记新的差异；家族从整体相似中浮现
function MethodView() {
  const [n, setN] = useState(1);
  const seen = PLANTS.slice(0, n);
  const fam = []; // 家族划分：与已有家族首成员共享 ≥3 个特征即归入
  seen.forEach(pl => { const g = fam.find(g => shared(g[0], pl) >= 3); g ? g.push(pl) : fam.push([pl]); });
  const done = n === PLANTS.length;
  const essential = g => FEATS.filter(f => g.every(x => x[f.key] === g[0][f.key]));
  return <div>
    <p style={{ marginTop: 0 }}><C id="method">方法</C>：不预先挑特征。第一株<b>全部</b>描述；之后每一株<b>只记下前面没出现过的差异</b>。一步步加入植物：</p>
    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
      <button className="ch05-btn" disabled={n <= 1} onClick={() => setN(n - 1)}>← 退回</button>
      <span style={{ fontSize: 14, color: "var(--muted)" }}>已描述 {n} / {PLANTS.length} 株</span>
      <button className="ch05-btn" disabled={done} onClick={() => setN(n + 1)}>描述下一株 →</button>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 8 }}>
      {seen.map((pl, i) => {
        const prev = PLANTS.slice(0, i);
        const items = FEATS.filter(f => i === 0 || !prev.some(q => q[f.key] === pl[f.key]));
        return <div key={pl.id} style={{ background: "var(--paper)", borderRadius: 12, padding: 8, display: "flex", gap: 6 }}>
          <Mini pl={pl} size={56} />
          <div style={{ fontSize: 13, lineHeight: 1.6 }}><b>{pl.id}</b>{i === 0 ? " · 全描述" : " · 只记新差异"}<br />
            {items.length ? items.map(f => <span key={f.key} style={{ display: "inline-block", background: "#fff", border: "1px solid var(--line)", borderRadius: 6, padding: "0 5px", margin: "1px 2px 1px 0" }}>{f.fmt(pl[f.key])}</span>)
              : <i style={{ color: "var(--muted)" }}>无新特征值，只是旧值的新组合</i>}</div>
        </div>;
      })}
    </div>
    {done ? <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 15, marginBottom: 6 }}>描述越往后越稀疏——大量「默默相同」的东西沉到背景里，<b>家族</b>从整体相似中自己浮现：</div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>{fam.map((g, k) => <div key={k} style={{ border: "2px solid var(--green)", borderRadius: 14, padding: "6px 12px", background: "var(--paper)" }}>
        <div style={{ fontSize: 14, color: "var(--green)", fontWeight: 600 }}>家族 {k + 1}：{g.map(x => x.id).join("、")}</div>
        <div style={{ fontSize: 13 }}>家族共同特征：{essential(g).map(f => f.fmt(g[0][f.key])).join(" · ")}</div>
      </div>)}</div>
      <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 0 }}>注意 F：它只有 5 枚雄蕊，却明显属于家族 2。所以「雄蕊数」不是这个家族的本质特征——方法随时准备<b>自我修正</b>。到这一步，人们会把方向倒过来：先承认这些一眼可辨的大家族，再只说明新成员与「邻居」的差别。</p>
    </div> : <p style={{ fontSize: 14, color: "var(--muted)" }}>提示：一直点到第 6 株，看看家族如何浮现。</p>}
  </div>;
}

export function SystemVsMethod() {
  return <>
    <Toggle options={["🗂 体系 System（林奈）", "🧭 方法 Method（Adanson / Buffon / Jussieu）"]}>
      {v => v === 0 ? <SystemView /> : <MethodView />}
    </Toggle>
    <style>{`.ch05-btn{border:1px solid var(--line);background:var(--paper);border-radius:99px;padding:3px 12px;font:inherit;font-size:13px;cursor:pointer}
      .ch05-btn:disabled{opacity:.4;cursor:default}`}</style>
  </>;
}

// ---------- 表格 vs 生命 ----------
const SHIFTS = [
  ["分类", "解剖"], ["结构", "有机体"], ["可见的特征", "内部的从属关系"], ["表格", "系列（时间）"],
];

function TableSVG() {
  const cols = ["1 蕊", "2 蕊", "3 蕊", "4 蕊", "5 蕊", "6 蕊"], rows = ["圆瓣", "尖瓣", "条瓣", "无瓣"];
  const filled = { "0-0": "🌼", "0-4": "🌸", "1-2": "🌷", "1-5": "🌺", "2-3": "🪻", "3-1": "🌿", "2-1": "🌾", "0-2": "🌻", "3-4": "🍀" };
  return <svg viewBox="0 0 520 300" style={{ width: "100%", maxHeight: 340, background: "var(--paper)", borderRadius: 14 }}>
    {cols.map((c, j) => <text key={c} x={110 + j * 66 + 33} y="26" textAnchor="middle" fontSize="13" fill="#6b6257">{c}</text>)}
    {rows.map((r, i) => <text key={r} x="96" y={56 + i * 48 + 26} textAnchor="end" fontSize="13" fill="#6b6257">{r}</text>)}
    {rows.map((r, i) => cols.map((c, j) => {
      const e = filled[i + "-" + j];
      return <g key={i + "-" + j}>
        <rect x={110 + j * 66 + 3} y={42 + i * 48 + 3} width="60" height="42" rx="6" fill={e ? "#fffdf8" : "none"} stroke="#1f1b16" strokeOpacity={e ? .7 : .35} strokeDasharray={e ? "" : "4 4"} />
        <text x={110 + j * 66 + 33} y={42 + i * 48 + 31} textAnchor="middle" fontSize={e ? 20 : 14} fill="#9b2c1f" opacity={e ? 1 : .5}>{e || "?"}
          {!e && <animate attributeName="opacity" values=".2;.7;.2" dur="2.4s" begin={`${(i + j) * .2}s`} repeatCount="indefinite" />}</text>
      </g>;
    }))}
    <text x="260" y="256" textAnchor="middle" fontSize="13" fill="#1f1b16">平面、同时、没有深度：每个生物 = 一个格子；「?」= 尚未见到但可预言的生物</text>
    <path d="M30,280 C130,262 170,292 260,276 S420,262 500,282" fill="none" stroke="#b8862b" strokeWidth="2.5" strokeDasharray="7 5">
      <animate attributeName="stroke-dashoffset" values="0;-24" dur="1.5s" repeatCount="indefinite" /></path>
    <text x="30" y="270" fontSize="12" fill="#b8862b">时间 = 外部的灾变：只从外面打乱、遮掩这张表</text>
  </svg>;
}

function LifeSVG() {
  const ring = [[118, "可见器官：爪、蹄、花、果", "#d9cdb6"], [82, "器官系统：骨骼、循环", "#c9b48f"], [44, "功能：呼吸、营养", "#b8862b"]];
  return <svg viewBox="0 0 520 300" style={{ width: "100%", maxHeight: 340, background: "var(--paper)", borderRadius: 14 }}>
    {ring.map(([r, t, c], i) => <g key={i}>
      <circle cx="180" cy="145" r={r} fill={c} opacity={.35 + i * .2} stroke="#1f1b16" strokeOpacity=".3">
        <animate attributeName="r" values={`${r};${r + 3};${r}`} dur="2.2s" begin={`${i * .3}s`} repeatCount="indefinite" /></circle>
    </g>)}
    <text x="180" y="150" textAnchor="middle" fontSize="16" fill="#1f1b16" fontWeight="700">生命</text>
    {ring.map(([r, t], i) => <g key={"t" + i}>
      <line x1={180 + r * .72} y1={145 - r * .69} x2="330" y2={60 + i * 50} stroke="#6b6257" strokeWidth="1" />
      <text x="336" y={64 + i * 50} fontSize="13" fill="#1f1b16">{t}</text></g>)}
    <text x="336" y="222" fontSize="12" fill="#6b6257">外层服从内层：差异从深处的</text>
    <text x="336" y="240" fontSize="12" fill="#6b6257">有机统一体里长出来</text>
    <line x1="30" y1="282" x2="490" y2="282" stroke="#2c4a6e" strokeWidth="2.5" markerEnd="url(#ch05arr)" />
    <defs><marker id="ch05arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="#2c4a6e" /></marker></defs>
    <text x="30" y="272" fontSize="12" fill="#2c4a6e">时间 = 生物自身内部的历史（19 世纪才有的东西）</text>
  </svg>;
}

export function TableVsLife() {
  return <Toggle options={["📋 古典：自然史的表格", "🫀 19 世纪：生物学与「生命」"]}>
    {v => <div style={{ display: "grid", gap: 12 }}>
      {v === 0 ? <TableSVG /> : <LifeSVG />}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {SHIFTS.map(([a, b], i) => <span key={i} style={{ padding: "3px 12px", borderRadius: 99, fontSize: 14, background: v === 0 ? "var(--paper)" : "#2c4a6e", color: v === 0 ? "var(--ink)" : "#fff", border: "1px solid var(--line)", transition: "all .4s" }}>
          {v === 0 ? a : b}</span>)}
      </div>
      <div style={{ fontSize: 15 }}>{v === 0
        ? <>古典博物学家只关心<b>表面与线条</b>：「生命」不是门槛，只是一个随标准滑动的分类特征（矿物会生长；植物会生长、有感受；动物会自发运动）。时间不进入生物内部，只作为地球的 <C id="catastrophe">灾变</C> 从外面把表格搅乱。</>
        : <>到居维叶那里，玻璃罐被打碎、动物被解剖：差异从骨骼、呼吸、循环这些<b>看不见的内部统一体</b>中生出，<C id="no_biology_yet">「生命」</C>第一次成为独立对象，时间也能够沉入生物的深处。福柯说的就是这四个替换。</>}</div>
    </div>}
  </Toggle>;
}
