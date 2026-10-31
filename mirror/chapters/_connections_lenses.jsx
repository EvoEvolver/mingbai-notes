// 全书脉络 · 专属图解：「五块镜片」——每章拆掉政治经济学之镜的一块；拆完后镜子背后露出「象征交换」。
// 另含「贯穿概念追踪」组件 Trace。
import { useState } from "react";
import { C } from "@kit";

const RED = "#9b2c1f", GOLD = "#b8862b", INK = "#1f1b16", MUTED = "#6b6257";
const SHARD_COLORS = ["#9b2c1f", "#3c6b4a", "#2c4a6e", "#5b3f7a", "#8a5a2b"];

const LENSES = [
  {
    ch: "ch01", no: "第 1 章", name: "劳动 / 使用价值",
    mirror: "人天生有劳动力，劳动分为抽象与具体两面；只要把具体劳动和使用价值从交换价值下解放出来，人就回到了自身。",
    crack: "劳动二重性这把「叉子」本身就是政治经济学的切法：使用价值不是交换之外的自然，而是交换价值为自己准备的不在场证明。被定义为「劳动力」，才是最深的异化。",
    ids: [["ch01:use_value_alibi", "使用价值是不在场证明"], ["ch01:structural_fork", "二元切分"], ["ch01:alienated_as_labor_power", "作为劳动力而异化"], ["ch01:critique_in_form", "以政治经济学的形式批判它"]],
  },
  {
    ch: "ch02", no: "第 2 章", name: "自然 / 需要",
    mirror: "人必须与自然搏斗才能活下去，匮乏是永恒处境；生产力越发达，人越接近自由。",
    crack: "「自然」「必然性」「匮乏」是启蒙与政治经济学（远溯犹太-基督教）写出来的：自然被解放成生产力的同时，人被解放成劳动力。马克思接过了这对概念，也接过了支配。",
    ids: [["ch02:nature_as_referent", "自然作为大所指"], ["ch02:double_liberation", "双重解放"], ["ch02:scarcity", "匮乏"], ["ch02:promethean_myth", "普罗米修斯神话"]],
  },
  {
    ch: "ch03", no: "第 3 章", name: "原始社会的剩余",
    mirror: "原始社会是生产力低下的「生存经济」：经济归根结底起决定作用，只是被亲属、宗教「主导」着；它本可生产剩余，只是还没做到。",
    crack: "原始交换是反生产的：多出来的东西被耗费、被烧掉，以此拒绝积累。生存只是象征交换的残余，而不是它的前提。用「剩余」去读他们，是把我们的经济学投射过去。",
    ids: [["ch03:determinant_dominant", "决定 vs 主导"], ["ch03:potential_surplus", "潜在剩余"], ["ch03:anti_production", "反生产"], ["ch03:symbolic_primacy", "生存是象征交换的残余"]],
  },
  {
    ch: "ch04", no: "第 4 章", name: "奴隶与工匠",
    mirror: "奴隶是被剥削到极点的劳动者，工匠是掌控自身劳动的主人；从奴隶到雇佣工人是一部解放史，重新掌握劳动就是革命。",
    crack: "奴隶被绑在人身支配与相互义务里，不是出卖劳动力的「个体」；工匠的活计是「作品」，是象征交换，不是劳动。把他们读成劳动者，是在路灯下找钥匙——代码的种族中心主义。",
    ids: [["ch04:retrospective_reading", "回溯式重构"], ["ch04:symbolic_obligation", "象征性义务"], ["ch04:work_not_labor", "作品不是劳动"], ["ch04:ethnocentrism_of_code", "代码的种族中心主义"]],
  },
  {
    ch: "ch05", no: "第 5 章", name: "历史 / 阶级 / 革命",
    mirror: "历史是生产方式的辩证更替，资本主义是看清一切的制高点；无产阶级作为生产者阶级，将在历史终点完成革命。",
    crack: "统治已从剥削劳动转向代码与符号形式；阶级矛盾能被体系吸收，真正的颠覆来自被代码边缘化的「非标记项」，来自此时此地的象征要求，而不是被推迟到未来的革命。",
    ids: [["ch05:euclidean_history", "历史的欧几里得几何"], ["ch05:form_sign", "符号形式"], ["ch05:class_trap", "阶级概念的陷阱"], ["ch05:subversion", "颠覆"]],
  },
];

// 5 个扇形镜片（从中心向外辐射，裁成椭圆镜面）
const CX = 300, CY = 200, RX = 250, RY = 175;
const pt = (deg, r) => [CX + Math.cos(deg * Math.PI / 180) * r, CY + Math.sin(deg * Math.PI / 180) * r];
const JIT = [-4, 7, -3, 5, -6];
const B = k => -90 + k * 72 + JIT[k % 5];
const SHARDS = LENSES.map((_, i) => {
  const a0 = B(i), a1 = i === 4 ? B(0) + 360 : B(i + 1);
  const pts = [[CX, CY], pt(a0, 420), pt((a0 + a1) / 2, 460), pt(a1, 420)];
  const mid = (a0 + a1) / 2;
  const lab = [CX + Math.cos(mid * Math.PI / 180) * RX * .58, CY + Math.sin(mid * Math.PI / 180) * RY * .58];
  return { d: "M" + pts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" L") + " Z", lab, mid };
});

export function FiveLenses() {
  const [broken, setBroken] = useState([]);
  const [sel, setSel] = useState(0);
  const click = i => { setSel(i); if (!broken.includes(i)) setBroken([...broken, i]); };
  const all = broken.length === 5;
  const L = LENSES[sel];
  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 340px", minWidth: 280 }}>
          <svg viewBox="0 0 600 425" style={{ width: "100%", display: "block" }} role="img" aria-label="五块镜片">
            <defs>
              <clipPath id="lens-clip"><ellipse cx={CX} cy={CY} rx={RX} ry={RY} /></clipPath>
              <radialGradient id="lens-glow"><stop offset="0" stopColor="#fff6dc" /><stop offset="1" stopColor="#efe2bf" /></radialGradient>
            </defs>
            <ellipse cx={CX} cy={CY} rx={RX + 14} ry={RY + 14} fill="none" stroke={INK} strokeWidth="10" opacity=".85" />
            <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="url(#lens-glow)" />
            {/* 镜子背后：象征交换 */}
            <g opacity={0.25 + broken.length * 0.15} style={{ transition: "opacity .6s" }}>
              <text x={CX} y={CY - 6} textAnchor="middle" fontSize="40" fontFamily="var(--serif)" fill={GOLD} fontWeight="700">象征交换</text>
              <text x={CX} y={CY + 26} textAnchor="middle" fontSize="15" fill={MUTED}>给予 · 回应 · 耗费 · 可逆</text>
            </g>
            <g clipPath="url(#lens-clip)">
              {SHARDS.map((s, i) => {
                const off = broken.includes(i);
                const dx = off ? Math.cos(s.mid * Math.PI / 180) * 16 : 0, dy = off ? Math.sin(s.mid * Math.PI / 180) * 16 : 0;
                return (
                  <g key={i} style={{ cursor: "pointer", transition: "transform .5s, opacity .5s", transform: `translate(${dx}px,${dy}px)`, opacity: off ? (sel === i ? .32 : .12) : .93 }}
                    onClick={() => click(i)}>
                    <path d={s.d} fill={SHARD_COLORS[i]} stroke="#fffdf8" strokeWidth={sel === i ? 5 : 3} />
                  </g>);
              })}
            </g>
            {SHARDS.map((s, i) => {
              const off = broken.includes(i);
              return (
                <g key={"t" + i} style={{ pointerEvents: "none" }} opacity={off ? .9 : 1}>
                  <text x={s.lab[0]} y={s.lab[1] - 6} textAnchor="middle" fontSize="13" fill={off ? SHARD_COLORS[i] : "#fff"} fontWeight="600">{LENSES[i].no}</text>
                  <text x={s.lab[0]} y={s.lab[1] + 13} textAnchor="middle" fontSize="15" fill={off ? INK : "#fff"} fontWeight="700"
                    style={{ paintOrder: "stroke", stroke: off ? "#fff6dc" : "none", strokeWidth: 4 }}>{LENSES[i].name}</text>
                </g>);
            })}
            <text x={CX} y={418} textAnchor="middle" fontSize="13" fill={MUTED}>
              {all ? "五块镜片都已拆下：镜子背后不是「真实的生产者」，而是另一种交换" : `点击镜片拆下它 · 已拆 ${broken.length}/5`}
            </text>
          </svg>
          <div style={{ textAlign: "center", marginTop: 6 }}>
            <button className="chip" onClick={() => { setBroken([]); setSel(0); }}>↺ 把镜子装回去</button>
          </div>
        </div>
        <div style={{ flex: "1 1 300px", minWidth: 260 }}>
          <div className="kicker" style={{ color: SHARD_COLORS[sel] }}>{L.no} · 镜片「{L.name}」</div>
          <div style={{ background: "#f3ece0", borderRadius: 12, padding: "10px 14px", marginBottom: 10 }}>
            <small style={{ color: MUTED, letterSpacing: ".1em" }}>镜中所见（马克思主义 / 政治经济学）</small>
            <p style={{ margin: "4px 0 0" }}>{L.mirror}</p>
          </div>
          <div style={{ background: "#fffdf8", border: `2px solid ${broken.includes(sel) ? SHARD_COLORS[sel] : "#d9cdb6"}`, borderRadius: 12, padding: "10px 14px", transition: ".3s" }}>
            <small style={{ color: RED, letterSpacing: ".1em" }}>拆下之后（鲍德里亚）</small>
            {broken.includes(sel)
              ? <p style={{ margin: "4px 0 0" }}>{L.crack}</p>
              : <p style={{ margin: "4px 0 0", color: MUTED }}>点左侧这块镜片，把它拆下来看看。</p>}
          </div>
          <div className="chips">{L.ids.map(([id, t]) => <span key={id} className="chip"><C id={id}>{t}</C></span>)}</div>
          <p style={{ fontSize: 14, color: MUTED, marginTop: 12 }}>
            {all ? <>五章合起来：劳动、需要、自然、剩余、历史都不是人的永恒本质，而是同一面镜子的不同角度。镜子背后露出的是 <C id="ch01:symbolic_exchange">象征交换</C>——以及第 5 章说的 <C id="ch05:symbolic_demand">象征的要求</C>。</>
              : <>导言（<C id="ch00:mirror_of_production">生产之镜</C>）先立起整面镜子，五章各拆一块。</>}
          </p>
        </div>
      </div>
    </div>);
}

// 贯穿概念追踪：同一概念在各章的变奏。stations: [{ch, id, text}]
export function Trace({ stations, color = RED }) {
  return (
    <div style={{ position: "relative", paddingLeft: 26 }}>
      <div style={{ position: "absolute", left: 9, top: 8, bottom: 8, width: 2, background: color, opacity: .35 }} />
      {stations.map((s, i) => (
        <div key={i} style={{ position: "relative", marginBottom: 14 }}>
          <span style={{ position: "absolute", left: -23, top: 6, width: 14, height: 14, borderRadius: "50%", background: color, border: "3px solid #fffdf8", boxShadow: "0 0 0 1px " + color }} />
          <div style={{ fontSize: 13, color: MUTED }}>{s.ch === "ch00" ? "导言与序言" : `第 ${+s.ch.slice(2)} 章`} · <C id={`${s.ch}:${s.id}`} /></div>
          <div style={{ marginTop: 2 }}>{s.text}</div>
        </div>))}
    </div>);
}
