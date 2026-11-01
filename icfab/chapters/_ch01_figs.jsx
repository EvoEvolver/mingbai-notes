// 第 1 章自绘示意图（SVG）：图 1.3–1.7、1.9、1.11–1.14。
// 材料配色（全书约定）：Si 灰（N 型偏冷灰、P 型偏暖灰）、SiO₂ 浅蓝、光刻胶 紫、栅 红棕、金属（Al）金色。
import { useState } from "react";
import { M, TxI } from "@kit";
import { mosState } from "./_ch01_phys.jsx";

const R = String.raw;
export const C = { nSi: "#cfd6de", pSi: "#e6dccb", nPlus: "#8f9bb0", pPlus: "#c9a878", ox: "#bfe0f5", oxS: "#7aa6c2", resist: "#9b7fc7", metal: "#d4a017", gate: "#a0522d", dep: "#f6efe2", ink: "#2a2a2a", red: "#c0392b", blue: "#2c4a6e", e: "#2c6fbf", h: "#c0392b" };
const font = { fontFamily: "system-ui, sans-serif", fontSize: 13 };
const Svg = ({ w = 680, h = 260, title, children }) => <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} style={{ width: "100%", display: "block", ...font }}><title>{title}</title>{children}</svg>;
const btn = on => ({ padding: "5px 11px", borderRadius: 7, border: `1px solid ${on ? C.blue : "#c9c2b3"}`, background: on ? "#e3ecf5" : "#fffdf8", cursor: "pointer", fontSize: 14 });
const Arrow = ({ x1, y1, x2, y2, c = "#555" }) => { const a = Math.atan2(y2 - y1, x2 - x1), d = 7; return <g><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="1.6" /><polygon points={`${x2},${y2} ${x2 - d * Math.cos(a - 0.45)},${y2 - d * Math.sin(a - 0.45)} ${x2 - d * Math.cos(a + 0.45)},${y2 - d * Math.sin(a + 0.45)}`} fill={c} /></g>; };
const Term = ({ x, y, label, up = true }) => <g><line x1={x} y1={y} x2={x} y2={up ? y - 16 : y + 16} stroke={C.ink} strokeWidth="1.4" /><circle cx={x} cy={up ? y - 21 : y + 21} r="5" fill="#fff" stroke={C.ink} strokeWidth="1.4" />{label && <text x={x} y={up ? y - 31 : y + 40} textAnchor="middle">{label}</text>}</g>;
const Sup = ({ s }) => s.split("+").map((t, i) => i ? <tspan key={i}><tspan dy="-5" fontSize="9">+</tspan><tspan dy="5">{t}</tspan></tspan> : <tspan key={i}>{t}</tspan>);
// 半椭圆形扩散区（从表面 y0 向下）
const Well = ({ x, y0, w, d, fill, label, lc = C.ink }) => <g><path d={`M${x},${y0} L${x},${y0 + d * 0.45} Q${x},${y0 + d} ${x + w * 0.25},${y0 + d} L${x + w * 0.75},${y0 + d} Q${x + w},${y0 + d} ${x + w},${y0 + d * 0.45} L${x + w},${y0} Z`} fill={fill} stroke="#666" strokeWidth="0.8" />{label && <text x={x + w / 2} y={y0 + d * 0.62} textAnchor="middle" fill={lc}><Sup s={label} /></text>}</g>;

// 分步示意的通用外壳
function Stepper({ steps, title }) {
  const [i, setI] = useState(0), s = steps[i];
  return <div className="card" style={{ padding: 12 }}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 6 }}>{steps.map((t, j) => <button key={j} style={btn(i === j)} onClick={() => setI(j)}>{j + 1}. {t.t}</button>)}</div>
    <Svg title={title + "：" + s.t} h={s.h || 250}>{s.draw()}</Svg>
    <p style={{ margin: "6px 4px 0", fontSize: 14 }}><b>第 {i + 1} 步：{s.t}。</b><TxI>{s.d}</TxI></p>
    <div style={{ display: "flex", gap: 6, marginTop: 6 }}><button style={btn(false)} disabled={i === 0} onClick={() => setI(i - 1)}>上一步</button><button style={btn(false)} disabled={i === steps.length - 1} onClick={() => setI(i + 1)}>下一步</button></div>
  </div>;
}

// ---------------- 图 1.3 生长结 ----------------
export function Fig13() {
  return <Svg title="生长结晶体管的制造流程" h={275}>
    <g transform="translate(30,20)">
      <rect x="40" y="0" width="22" height="18" fill={C.nSi} stroke="#555" />
      <path d="M40,18 L10,70 L10,170 L51,215 L92,170 L92,70 L62,18 Z" fill={C.nSi} stroke="#555" />
      <rect x="10" y="108" width="82" height="14" fill={C.pSi} stroke="#555" strokeWidth="0.6" />
      <text x="51" y="95" textAnchor="middle">N</text><text x="51" y="119" textAnchor="middle" fontSize="11">P</text><text x="51" y="150" textAnchor="middle">N</text>
      <text x="51" y="232" textAnchor="middle">① 拉单晶时依次掺 N、P、N</text>
      <text x="100" y="6">籽晶</text>
    </g>
    <Arrow x1={140} y1={130} x2={185} y2={130} />
    <g transform="translate(195,85)">
      <ellipse cx="60" cy="20" rx="58" ry="16" fill={C.nSi} stroke="#555" />
      <rect x="2" y="20" width="116" height="30" fill={C.nSi} stroke="none" /><rect x="2" y="30" width="116" height="10" fill={C.pSi} />
      <ellipse cx="60" cy="50" rx="58" ry="16" fill={C.nSi} stroke="#555" /><line x1="2" y1="20" x2="2" y2="50" stroke="#555" /><line x1="118" y1="20" x2="118" y2="50" stroke="#555" />
      <text x="60" y="102" textAnchor="middle">② 切下含 NPN 的片</text>
    </g>
    <Arrow x1={325} y1={130} x2={370} y2={130} />
    <g transform="translate(385,95)">
      <rect x="10" y="0" width="22" height="16" fill={C.nSi} stroke="#555" /><rect x="10" y="16" width="22" height="7" fill={C.pSi} stroke="#555" /><rect x="10" y="23" width="22" height="16" fill={C.nSi} stroke="#555" />
      <text x="40" y="12" fontSize="11">N（发射区）</text><text x="40" y="24" fontSize="11">P（基区）</text><text x="40" y="38" fontSize="11">N（集电区）</text>
      <text x="40" y="92" textAnchor="middle">③ 锯成小条</text>
    </g>
    <Arrow x1={505} y1={130} x2={545} y2={130} />
    <g transform="translate(555,60)">
      <rect x="30" y="40" width="22" height="16" fill={C.nSi} stroke="#555" /><rect x="30" y="56" width="22" height="7" fill={C.pSi} stroke="#555" /><rect x="30" y="63" width="22" height="16" fill={C.nSi} stroke="#555" />
      <line x1="41" y1="40" x2="41" y2="10" stroke={C.metal} strokeWidth="2.5" /><line x1="41" y1="79" x2="41" y2="110" stroke={C.metal} strokeWidth="2.5" /><line x1="52" y1="59" x2="95" y2="59" stroke={C.metal} strokeWidth="2.5" />
      <text x="70" y="52" fontSize="11">基极引线</text>
      <text x="55" y="162" textAnchor="middle">④ 焊引线、封装</text>
    </g>
  </Svg>;
}

// ---------------- 图 1.4 合金结 ----------------
export function Fig14() {
  return <Svg title="合金结双极晶体管：纵向与横向结构" h={300}>
    <g transform="translate(40,60)">
      <rect x="0" y="40" width="260" height="110" fill={C.nSi} stroke="#555" /><text x="30" y="100">N 型 Ge</text>
      <path d="M150,40 Q150,10 185,10 Q220,10 220,40 Z" fill={C.metal} stroke="#555" /><Well x={150} y0={40} w={70} d={34} fill={C.pPlus} label="P+" />
      <path d="M70,150 Q70,190 115,190 Q160,190 160,150 Z" fill={C.metal} stroke="#555" />
      <path d="M70,150 L70,135 Q70,116 95,116 L135,116 Q160,116 160,135 L160,150 Z" fill={C.pPlus} stroke="#666" /><text x="115" y="140" textAnchor="middle">P⁺</text>
      <rect x="10" y="32" width="40" height="8" fill={C.metal} stroke="#555" />
      <Term x={30} y={32} label="基极" /><Term x={185} y={10} label="发射极" /><Term x={115} y={190} label="集电极" up={false} />
      <text x="130" y="-38" textAnchor="middle" fontWeight="600">纵向：发射极与集电极分居两面</text>
    </g>
    <g transform="translate(380,60)">
      <rect x="0" y="40" width="260" height="110" fill={C.nSi} stroke="#555" /><text x="110" y="110">N 型 Ge</text>
      {[30, 160].map(x => <g key={x}><path d={`M${x},40 Q${x},10 ${x + 35},10 Q${x + 70},10 ${x + 70},40 Z`} fill={C.metal} stroke="#555" /><Well x={x} y0={40} w={70} d={34} fill={C.pPlus} label="P+" /></g>)}
      <rect x="105" y="150" width="50" height="8" fill={C.metal} stroke="#555" />
      <Term x={65} y={10} label="集电极" /><Term x={195} y={10} label="发射极" /><Term x={130} y={158} label="基极" up={false} />
      <text x="130" y="-38" textAnchor="middle" fontWeight="600">横向：两者在同一面</text>
    </g>
    <text x="340" y="292" textAnchor="middle" fill="#6b6357">金属铟（金色）熔化后溶入 Ge，冷却时再结晶出 P⁺ 区；结直接暴露在晶体表面。</text>
  </Svg>;
}

// ---------------- 图 1.5 双扩散台面晶体管 ----------------
export function Fig15() {
  const wafer = (x, y, layers, extra) => <g transform={`translate(${x},${y})`}>
    <rect x="0" y="0" width="150" height="80" fill={C.nSi} stroke="#555" />
    {layers.map(([t, h, f, l], i) => <g key={i}><rect x="0" y={t} width="150" height={h} fill={f} stroke="#777" strokeWidth="0.6" /><text x="160" y={t + h - 1} fontSize="11">{l}</text></g>)}
    <text x="75" y="66" textAnchor="middle">N</text>{extra}
  </g>;
  return <Svg title="双扩散台面晶体管工艺" h={300}>
    {wafer(20, 30, [])}<text x="95" y="20" textAnchor="middle">① N 型衬底</text>
    <Arrow x1={190} y1={70} x2={225} y2={70} />
    {wafer(235, 30, [[0, 14, C.pSi, "P"]])}<text x="310" y="20" textAnchor="middle">② 气相硼扩散 → P 层</text>
    <Arrow x1={405} y1={70} x2={440} y2={70} />
    {wafer(450, 30, [[0, 14, C.pSi, "P"], [0, 7, C.nSi, "N"]])}<text x="525" y="20" textAnchor="middle">③ 再做 N 型扩散 → NPN</text>
    <Arrow x1={525} y1={120} x2={525} y2={160} />
    <g transform="translate(360,170)">
      <path d="M40,40 L60,10 L240,10 L260,40 Z" fill={C.pSi} stroke="#666" /><path d="M48,28 L56,16 L244,16 L252,28 Z" fill="none" />
      <rect x="54" y="10" width="190" height="8" fill={C.nSi} stroke="#777" strokeWidth="0.6" />
      <rect x="0" y="40" width="300" height="70" fill={C.nSi} stroke="#555" /><text x="150" y="90" textAnchor="middle">N（集电区）</text>
      <rect x="85" y="0" width="45" height="16" rx="7" fill={C.metal} stroke="#555" /><rect x="165" y="2" width="35" height="12" rx="6" fill={C.metal} stroke="#555" />
      <Term x={107} y={0} label="基极" /><Term x={182} y={2} label="发射极" /><Term x={150} y={110} label="集电极" up={false} />
      <text x="270" y="16" fontSize="11">N</text><text x="270" y="34" fontSize="11">P</text>
    </g>
    <text x="180" y="200" textAnchor="middle">④ 合金电极 + 腐蚀出台面（mesa）</text>
    <text x="180" y="222" textAnchor="middle" fill="#6b6357" fontSize="12">基极电极须与 P 欧姆接触、与 N 发射区整流接触，</text>
    <text x="180" y="240" textAnchor="middle" fill="#6b6357" fontSize="12">结仍暴露在台面侧壁上。</text>
  </Svg>;
}

// ---------------- 图 1.6 平面工艺（分步 + 扩散时间） ----------------
function Planar({ step, t }) {
  const x0 = 140, W = 400, top = 90, H = 120, oxT = 14;
  const xjP = 30 * Math.sqrt(t), xjN = 14 * Math.sqrt(t);           // 结深 ∝ √(Dt)
  const winP = [x0 + 120, x0 + 280], winN = [x0 + 170, x0 + 230];
  const oxide = (gaps, thick = oxT) => { const segs = []; let a = x0; for (const [g0, g1] of gaps) { segs.push([a, g0]); a = g1; } segs.push([a, x0 + W]); return segs.map(([s0, s1], i) => <rect key={i} x={s0} y={top - thick} width={s1 - s0} height={thick} fill={C.ox} stroke={C.oxS} strokeWidth="0.6" />); };
  const pWell = <path d={`M${winP[0] - 0.8 * xjP},${top} Q${winP[0] - 0.8 * xjP},${top + xjP} ${winP[0]},${top + xjP} L${winP[1]},${top + xjP} Q${winP[1] + 0.8 * xjP},${top + xjP} ${winP[1] + 0.8 * xjP},${top} Z`} fill={C.pSi} stroke="#7a6a50" />;
  const nWell = <path d={`M${winN[0] - 0.8 * xjN},${top} Q${winN[0] - 0.8 * xjN},${top + xjN} ${winN[0]},${top + xjN} L${winN[1]},${top + xjN} Q${winN[1] + 0.8 * xjN},${top + xjN} ${winN[1] + 0.8 * xjN},${top} Z`} fill={C.nPlus} stroke="#55607a" />;
  const dots = pts => pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4.5" fill={C.red} />);
  const arrows = ([a, b], lab) => <g>{[0.2, 0.5, 0.8].map(f => <Arrow key={f} x1={a + f * (b - a)} y1={top - 60} x2={a + f * (b - a)} y2={top - 22} c={C.red} />)}<text x={(a + b) / 2} y={top - 66} textAnchor="middle" fill={C.red}>{lab}</text></g>;
  return <g>
    <rect x={x0} y={top} width={W} height={H} fill={C.nSi} stroke="#555" /><text x={x0 + W - 20} y={top + H - 12} textAnchor="end">N 型 Si</text>
    {step === 0 && <text x={x0 + W / 2} y={top - 20} textAnchor="middle">裸露的 N 型硅片</text>}
    {step === 1 && <>{oxide([])}<text x={x0 + W + 8} y={top - 3}>SiO₂</text></>}
    {step === 2 && <>{oxide([winP])}<text x={(winP[0] + winP[1]) / 2} y={top - 20} textAnchor="middle">光刻 + 刻蚀开出窗口（图 1.7）</text></>}
    {step >= 3 && pWell}
    {step === 3 && <>{oxide([winP])}{arrows(winP, "硼（B）")}{dots([[winP[0] - 0.8 * xjP, top], [winP[1] + 0.8 * xjP, top]])}</>}
    {step >= 4 && oxide([winN], oxT)}
    {step >= 4 && <rect x={winP[0]} y={top - 7} width={winN[0] - winP[0]} height="7" fill={C.ox} stroke={C.oxS} strokeWidth="0.5" />}
    {step >= 4 && <rect x={winN[1]} y={top - 7} width={winP[1] - winN[1]} height="7" fill={C.ox} stroke={C.oxS} strokeWidth="0.5" />}
    {step === 4 && <text x={(winN[0] + winN[1]) / 2} y={top - 26} textAnchor="middle">再氧化，在 P 区内开第二个窗口</text>}
    {step === 5 && <>{nWell}{arrows(winN, "磷（P）")}{dots([[winP[0] - 0.8 * xjP, top], [winP[1] + 0.8 * xjP, top], [winN[0] - 0.8 * xjN, top], [winN[1] + 0.8 * xjN, top]])}</>}
    {step >= 3 && <text x={(winP[0] + winP[1]) / 2} y={top + xjP - 6} textAnchor="middle" fontSize="12">P</text>}
    {step >= 3 && <text x={x0 + 8} y={top + H + 18} fill="#6b6357" fontSize="12">结深 ∝ √(Dt)：P 结 {(xjP / 30).toFixed(2)}，横向扩散约为纵向的 0.8 倍——结的边缘（红点）落在氧化层之下。</text>}
  </g>;
}
export function Fig16() {
  const [t, setT] = useState(1);
  const steps = [
    ["N 型硅片", "从均匀掺杂的 N 型单晶硅片出发。"],
    ["热氧化", R`在高温氧气或水汽中生长一层致密的 $\SiO$。硅能长出稳定、绝缘、致密的自身氧化物，这是它胜过锗的关键（第 6 章）。`],
    ["开窗口", R`用光刻（图 1.7）在氧化层上刻出窗口；窗口之外的 $\SiO$ 留作扩散掩蔽层。`],
    ["P 型扩散", R`高温下通入含硼的气体（今天多用离子注入，第 8 章）。B 在 $\SiO$ 中扩散极慢，只能经窗口进入硅。杂质同时向侧面扩散，PN 结的边缘终止在氧化层之下——这就是钝化。`],
    ["再氧化、开第二窗口", "扩散的同时或之后再长氧化层，然后在 P 区内部再开一个更小的窗口。"],
    ["N 型扩散", R`通入含磷的源，形成 N$^+$ 区，得到 NPN 结构。所有结的边缘都藏在 $\SiO$ 下面，没有一条结暴露在空气中。`],
  ];
  const [i, setI] = useState(5);
  return <div className="card" style={{ padding: 12 }}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 6 }}>{steps.map(([s], j) => <button key={j} style={btn(i === j)} onClick={() => setI(j)}>{j + 1}. {s}</button>)}</div>
    <Svg title={"平面工艺：" + steps[i][0]} h={250}><Planar step={i} t={t} /></Svg>
    <p style={{ margin: "6px 4px 0", fontSize: 14 }}><b>第 {i + 1} 步：{steps[i][0]}。</b><TxI>{steps[i][1]}</TxI></p>
    {i >= 3 && <label style={{ display: "block", marginTop: 6, fontSize: 14 }}>相对扩散时间 <M>{R`t/t_0=${t.toFixed(2)}`}</M>（结深按 <M>{R`\sqrt{Dt}`}</M> 增长，详见第 7 章）
      <input type="range" min="0.25" max="2.5" step="0.01" value={t} onChange={e => setT(+e.target.value)} style={{ width: "100%" }} /></label>}
  </div>;
}

// ---------------- 图 1.7 光刻 ----------------
function Litho({ step }) {
  const x0 = 200, W = 280, top = 140, H = 70, ox = 18, rs = 16;
  const mask = [[0, 50, 1], [50, 115, 0], [115, 165, 1], [165, 230, 0], [230, 280, 1]];   // 1 = 不透光
  const kept = mask.filter(m => m[2]);
  return <g>
    <rect x={x0} y={top} width={W} height={H} fill={C.nSi} stroke="#555" /><text x={x0 + W + 8} y={top + 40}>Si</text>
    {step < 4 && <rect x={x0} y={top - ox} width={W} height={ox} fill={C.ox} stroke={C.oxS} />}
    {step >= 4 && (step >= 5 ? kept : kept).map(([a, b], i) => <rect key={i} x={x0 + a} y={top - ox} width={b - a} height={ox} fill={C.ox} stroke={C.oxS} />)}
    <text x={x0 + W + 8} y={top - 4}>SiO₂</text>
    {step >= 1 && step <= 2 && <rect x={x0} y={top - ox - rs} width={W} height={rs} fill={C.resist} stroke="#6c55a0" />}
    {step === 2 && mask.filter(m => !m[2]).map(([a, b], i) => <rect key={i} x={x0 + a} y={top - ox - rs} width={b - a} height={rs} fill="#d9cdf0" stroke="#6c55a0" />)}
    {step >= 3 && step <= 4 && kept.map(([a, b], i) => <rect key={i} x={x0 + a} y={top - ox - rs} width={b - a} height={rs} fill={C.resist} stroke="#6c55a0" />)}
    {step >= 1 && step <= 4 && <text x={x0 + W + 8} y={top - ox - 3}>光刻胶</text>}
    {step === 2 && <g>
      {mask.map(([a, b, d], i) => <rect key={i} x={x0 + a} y={50} width={b - a} height={10} fill={d ? "#222" : "#fff"} stroke="#444" />)}
      <text x={x0 - 10} y={59} textAnchor="end">掩模版</text><text x={x0 - 10} y={30} textAnchor="end">紫外光</text>
      {[20, 60, 100, 140, 180, 220, 260].map(x => { const open = mask.some(([a, b, d]) => !d && x > a && x < b); return <Arrow key={x} x1={x0 + x} y1={15} x2={x0 + x} y2={open ? top - ox - rs - 2 : 46} c={open ? "#7d3c98" : "#999"} />; })}
    </g>}
    {step === 2 && <text x={x0 + W / 2} y={top + H + 22} textAnchor="middle" fill="#6b6357">透光处的光刻胶发生光化学反应（浅紫），显影时将被溶去（正胶）</text>}
  </g>;
}
export function Fig17() {
  const steps = [
    ["生长/沉积氧化层", R`先在硅片上形成要被图形化的薄膜（这里是 $\SiO$）。`],
    ["涂光刻胶", "旋涂一层对紫外光敏感的光刻胶（resist），像相机的“胶片”。"],
    ["曝光", "紫外光透过掩模版（mask）上的透明区照到胶上，改变那里胶的化学性质。今天用 193 nm 深紫外或 13.5 nm 极紫外光（第 5 章）。"],
    ["显影", "显影液把曝过光的胶溶掉（正胶），掩模图形转移到胶上。"],
    ["刻蚀氧化层", R`以剩下的胶为掩蔽刻蚀 $\SiO$（第 9 章），图形转移到氧化层。`],
    ["去胶", R`去掉光刻胶，留下带图形的 $\SiO$——它就是下一步扩散或注入的掩模。`],
  ];
  return <Stepper title="光刻的基本步骤" steps={steps.map(([t, d], i) => ({ t, d, h: 245, draw: () => <Litho step={i} /> }))} />;
}

// ---------------- 图 1.9 集成：R–NPN–R ----------------
export function Fig19() {
  const top = 150, oxT = 10;
  const contacts = [60, 165, 250, 330, 420, 470, 575];
  return <Svg title="用光刻与掩蔽在同一衬底上制造多个元件" h={300}>
    {/* 电路 */}
    <g stroke={C.ink} strokeWidth="2" fill="none">
      <circle cx="70" cy="40" r="5" fill="#fff" /><path d="M75,40 L110,40 l8,-10 l12,20 l12,-20 l12,20 l12,-20 l8,10 L250,40 L285,15" />
      <line x1="285" y1="5" x2="285" y2="30" strokeWidth="3" /><circle cx="285" cy="-2" r="5" fill="#fff" />
      <path d="M285,25 L320,45 L380,45 l8,-10 l12,20 l12,-20 l12,20 l12,-20 l8,10 L560,45" /><circle cx="565" cy="45" r="5" fill="#fff" />
      <line x1="268" y1="18" x2="302" y2="18" strokeWidth="3" />
    </g>
    <text x="165" y="70" textAnchor="middle">R</text><text x="290" y="70" textAnchor="middle">NPN</text><text x="440" y="75" textAnchor="middle">R</text>
    {/* 截面 */}
    <rect x="40" y={top} width="600" height="130" fill={C.nSi} stroke="#555" /><text x="340" y="265" textAnchor="middle">N 型衬底</text>
    <Well x={50} y0={top} w={140} d={36} fill={C.pSi} label="P（电阻）" />
    <Well x={240} y0={top} w={140} d={40} fill={C.pSi} />
    <Well x={290} y0={top} w={45} d={16} fill={C.nPlus} label="N" />
    <text x="365" y={top + 32} textAnchor="middle">P</text>
    <Well x={410} y0={top} w={190} d={36} fill={C.pSi} label="P（电阻）" />
    <rect x="40" y={top - oxT} width="600" height={oxT} fill={C.ox} stroke={C.oxS} />
    {[60, 170, 255, 312, 360, 430, 580].map((x, i) => <g key={i}><rect x={x - 8} y={top - oxT} width="16" height={oxT} fill={C.metal} /></g>)}
    <rect x="52" y={top - oxT - 12} width="26" height="12" fill={C.metal} stroke="#9a7400" />
    <rect x="160" y={top - oxT - 12} width="105" height="12" fill={C.metal} stroke="#9a7400" />
    <rect x="300" y={top - oxT - 12} width="24" height="12" fill={C.metal} stroke="#9a7400" />
    <rect x="350" y={top - oxT - 12} width="90" height="12" fill={C.metal} stroke="#9a7400" />
    <rect x="566" y={top - oxT - 12} width="28" height="12" fill={C.metal} stroke="#9a7400" />
    <Term x={65} y={top - 22} /><Term x={312} y={top - 22} /><Term x={580} y={top - 22} />
    <text x="640" y="296" fontSize="11" textAnchor="end" fill="#6b6357">金色：Al 互连；浅蓝：SiO₂</text>
  </Svg>;
}

// ---------------- 图 1.11 MOS 晶体管：开关等效 + 截面 ----------------
function MosSection({ x = 0, y = 0, s = 1, labels = true }) {
  return <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x="0" y="60" width="300" height="110" fill={C.pSi} stroke="#555" /><text x="150" y="158" textAnchor="middle">P</text>
    <Well x={40} y0={60} w={70} d={42} fill={C.nPlus} label="N+" /><Well x={190} y0={60} w={70} d={42} fill={C.nPlus} label="N+" />
    <rect x="0" y="50" width="45" height="10" fill={C.ox} stroke={C.oxS} /><rect x="255" y="50" width="45" height="10" fill={C.ox} stroke={C.oxS} />
    <rect x="105" y="56" width="90" height="4" fill={C.ox} stroke={C.oxS} strokeWidth="0.5" />
    <rect x="50" y="30" width="55" height="30" fill={C.metal} stroke="#9a7400" /><rect x="195" y="30" width="55" height="30" fill={C.metal} stroke="#9a7400" />
    <rect x="115" y="34" width="70" height="22" fill={C.gate} />
    {labels && <><Term x={77} y={30} label="源（输入）" /><Term x={150} y={34} label="栅（控制）" /><Term x={222} y={30} label="漏（输出）" /></>}
  </g>;
}
export function Fig111() {
  return <Svg title="MOS 晶体管的开关等效电路与截面" h={250}>
    <g transform="translate(40,90)" stroke={C.ink} strokeWidth="2" fill="none">
      <circle cx="0" cy="80" r="6" fill="#fff" /><line x1="6" y1="80" x2="50" y2="80" /><line x1="50" y1="80" x2="95" y2="55" /><line x1="110" y1="80" x2="150" y2="80" /><circle cx="156" cy="80" r="6" fill="#fff" />
      <line x1="75" y1="66" x2="75" y2="20" /><line x1="55" y1="20" x2="95" y2="20" strokeWidth="3" /><circle cx="75" cy="-5" r="6" fill="#fff" /><line x1="75" y1="1" x2="75" y2="20" />
    </g>
    <text x="40" y="200" textAnchor="middle">源</text><text x="196" y="200" textAnchor="middle">漏</text><text x="115" y="70" textAnchor="middle">栅</text>
    <text x="118" y="236" textAnchor="middle" fill="#6b6357">受隔离端控制的开关</text>
    <MosSection x={300} y={45} s={1.1} />
    <text x="465" y="245" textAnchor="middle" fill="#6b6357">NMOS 截面（照片见图 1.10 右）</text>
  </Svg>;
}

// ---------------- 图 1.12 交互：积累—耗尽—反型 ----------------
export function Fig112() {
  const [VG, setVG] = useState(1.0), [lgNA, setLgNA] = useState(18), [tox, setTox] = useState(3);
  const s = mosState({ VG, NA: Math.pow(10, lgNA), tox_nm: tox });
  const reg = { acc: ["积累（OFF）", "负栅压把空穴吸到表面，表面 P 型更强；源—衬底、漏—衬底两个结串联且不导通。"], dep: ["耗尽（仍 OFF）", "空穴被推离表面，栅下出现没有可动载流子的耗尽区（点状区域）；电子还太少，开关仍断开。"], inv: ["反型（ON）", "表面电子浓度超过空穴，形成几 nm 厚的 N 型反型层，把两个 N$^+$ 区连通——开关闭合。反型层电子数正比于 $V_{\\rm G}-V_{\\rm TH}$。"] }[s.regime];
  const top = 90, scale = 2.2;   // 每 nm 像素
  const wd = Math.min(150, s.Wdep_nm * scale);
  const eT = s.ninv > 0 ? Math.min(10, 2 + s.ninv / 2e12) : 0, hT = s.pacc > 0 ? Math.min(10, 2 + s.pacc / 2e12) : 0;
  return <div className="card" style={{ padding: 12 }}>
    <Svg title="MOS 晶体管在不同栅压下的状态" h={290}>
      <rect x="120" y={top} width="440" height="180" fill={C.pSi} stroke="#555" /><text x="340" y={top + 170} textAnchor="middle">P 型衬底</text>
      {/* 结的耗尽区（示意）+ 栅下耗尽区（按 W_dep 计算） */}
      <rect x="250" y={top} width="180" height={wd} fill={C.dep} stroke="#b9a989" strokeDasharray="3 3" />
      {Array.from({ length: Math.floor(wd / 9) * 12 }, (_, i) => <circle key={i} cx={256 + (i % 12) * 15 + ((Math.floor(i / 12) % 2) * 7)} cy={top + 5 + Math.floor(i / 12) * 9} r="1.3" fill="#8a7a5a" />)}
      <Well x={150} y0={top} w={110} d={60} fill={C.nPlus} label="N+ 源" lc="#fff" /><Well x={420} y0={top} w={110} d={60} fill={C.nPlus} label="N+ 漏" lc="#fff" />
      {eT > 0 && <rect x="255" y={top} width="170" height={eT} fill={C.e} opacity="0.85" />}
      {hT > 0 && <rect x="255" y={top} width="170" height={hT} fill={C.h} opacity="0.75" />}
      <rect x="250" y={top - 6} width="180" height="6" fill={C.ox} stroke={C.oxS} />
      <rect x="255" y={top - 32} width="170" height="26" fill={C.gate} /><text x="340" y={top - 14} textAnchor="middle" fill="#fff">栅</text>
      <text x="340" y={top - 44} textAnchor="middle" fontWeight="600">{reg[0]}</text>
      {eT > 0 && <text x="262" y={top + eT + 13} fill={C.e} fontSize="12">e⁻ 反型层</text>}
      {hT > 0 && <text x="262" y={top + hT + 13} fill={C.h} fontSize="12">h⁺ 积累层</text>}
      {wd > 12 && <text x="300" y={top + wd + 14} fontSize="12" fill="#6b6357">耗尽区 {s.Wdep_nm.toFixed(0)} nm</text>}
      <text x="20" y="40" fontSize="12">V<tspan dy="3" fontSize="9">G</tspan><tspan dy="-3"> = {VG.toFixed(2)} V</tspan></text><text x="20" y="58" fontSize="12">V<tspan dy="3" fontSize="9">TH</tspan><tspan dy="-3"> = {s.Vth.toFixed(2)} V</tspan></text><text x="20" y="76" fontSize="12">V<tspan dy="3" fontSize="9">FB</tspan><tspan dy="-3"> = {s.VFB.toFixed(2)} V</tspan></text>
    </Svg>
    <p style={{ margin: "4px", fontSize: 14 }}><M>{R`V_{\rm G}`}</M> 由负到正扫过：{reg[1].split("$").map((t, i) => (i % 2 ? <M key={i}>{t}</M> : t))}</p>
    <p style={{ margin: "4px", fontSize: 13.5 }}>计算值：表面势 <M>{R`\psi_{\rm s}=${s.psi.toFixed(3)}\,\mathrm V`}</M>（反型时钉在 <M>{R`2\phi_{\rm F}=${(2 * s.phiF).toFixed(3)}\,\mathrm V`}</M>），耗尽层宽度 <M>{R`W_{\rm dep}=${s.Wdep_nm.toFixed(1)}\,\mathrm{nm}`}</M>，反型层电子面密度 <M>{R`${(s.ninv / 1e12).toFixed(2)}\times10^{12}\,\mathrm{cm^{-2}}`}</M>。</p>
    <label style={{ display: "block", fontSize: 14 }}>栅压 <M>{R`V_{\rm G}`}</M>
      <input type="range" min="-1.8" max="1.5" step="0.01" value={VG} onChange={e => setVG(+e.target.value)} style={{ width: "100%" }} /></label>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <label style={{ flex: 1, minWidth: 220, fontSize: 14 }}>衬底掺杂 <M>{R`N_{\rm A}=10^{${lgNA.toFixed(1)}}\,\mathrm{cm^{-3}}`}</M>
        <input type="range" min="16" max="18.7" step="0.05" value={lgNA} onChange={e => setLgNA(+e.target.value)} style={{ width: "100%" }} /></label>
      <label style={{ flex: 1, minWidth: 220, fontSize: 14 }}>栅氧厚度 <M>{R`t_{\rm ox}=${tox.toFixed(1)}\,\mathrm{nm}`}</M>
        <input type="range" min="1" max="20" step="0.1" value={tox} onChange={e => setTox(+e.target.value)} style={{ width: "100%" }} /></label>
    </div>
    <p style={{ fontSize: 12.5, color: "#6b6357", margin: "6px 4px 0" }}>模型：耗尽近似 + N⁺ 多晶硅栅、无界面电荷（<M>{R`V_{\rm FB}=-(0.56\,\mathrm V+\phi_{\rm F})`}</M>）；<M>{R`V_{\rm TH}=V_{\rm FB}+2\phi_{\rm F}+\gamma\sqrt{2\phi_{\rm F}}`}</M>，<M>{R`\gamma=\sqrt{2q\varepsilon_{\rm s}N_{\rm A}}/C_{\rm ox}`}</M>。源漏结的耗尽区未画出。</p>
  </div>;
}

// ---------------- 图 1.13 双极晶体管 ----------------
export function Fig113() {
  return <Svg title="双极晶体管的等效电路与截面" h={250}>
    <g transform="translate(40,95)" stroke={C.ink} strokeWidth="2" fill="none">
      <circle cx="0" cy="80" r="6" fill="#fff" /><line x1="6" y1="80" x2="45" y2="80" /><line x1="60" y1="55" x2="95" y2="80" /><line x1="95" y1="80" x2="140" y2="80" /><circle cx="146" cy="80" r="6" fill="#fff" />
      <line x1="75" y1="66" x2="75" y2="0" /><circle cx="75" cy="-6" r="6" fill="#fff" /><circle cx="75" cy="66" r="4" fill={C.ink} />
    </g>
    <text x="40" y="205" textAnchor="middle">发射极</text><text x="186" y="205" textAnchor="middle">集电极</text><text x="140" y="85" textAnchor="middle">基极</text>
    <text x="113" y="240" textAnchor="middle" fill="#6b6357">控制端与主电流通路直接相连</text>
    <g transform="translate(290,50)">
      <rect x="0" y="60" width="350" height="120" fill={C.nSi} stroke="#555" /><text x="300" y="165" textAnchor="middle">N</text>
      <Well x={10} y0={60} w={200} d={75} fill={C.pSi} />
      <Well x={40} y0={60} w={95} d={38} fill={C.nPlus} label="N+" lc="#fff" /><text x="170" y="112">P</text>
      <Well x={255} y0={60} w={70} d={34} fill={C.nPlus} label="N+" lc="#fff" />
      <rect x="0" y="50" width="350" height="10" fill={C.ox} stroke={C.oxS} />
      <rect x="60" y="30" width="55" height="30" fill={C.metal} stroke="#9a7400" /><rect x="150" y="34" width="35" height="26" fill={C.metal} stroke="#9a7400" /><rect x="262" y="30" width="55" height="30" fill={C.metal} stroke="#9a7400" />
      <Term x={87} y={30} label="发射极（输入）" /><Term x={167} y={34} label="基极（控制）" /><Term x={290} y={30} label="集电极（输出）" />
    </g>
  </Svg>;
}

// ---------------- 图 1.14 交互：CMOS 反相器与与非门 ----------------
function Fet({ x, y, p, on, label }) {
  const col = on ? "#2c6e49" : "#b03a2e";
  return <g>
    <line x1={x} y1={y - 22} x2={x} y2={y + 22} stroke={col} strokeWidth="3" />
    <line x1={x - 9} y1={y - 16} x2={x - 9} y2={y + 16} stroke={C.ink} strokeWidth="2" />
    {p && <circle cx={x - 15} cy={y} r="5" fill="#fff" stroke={C.ink} strokeWidth="1.6" />}
    <rect x={x + 6} y={y - 9} width={label.length * 7 + 30} height="18" rx="4" fill={on ? "#e5f2ea" : "#f7e3e0"} />
    <text x={x + 10} y={y + 4} fontSize="11.5" fill={col}>{label} {on ? "通" : "断"}</text>
  </g>;
}
export function Fig114() {
  const [a, setA] = useState(0), [b1, setB1] = useState(1), [b2, setB2] = useState(0);
  const inv = 1 - a, nand = b1 && b2 ? 0 : 1;
  const Tog = ({ v, set, name }) => <button style={btn(v === 1)} onClick={() => set(1 - v)}>{name} = {v}</button>;
  return <div className="card" style={{ padding: 12 }}>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
      <span>反相器：</span><Tog v={a} set={setA} name="In" /><span style={{ width: 20 }} /><span>与非门：</span><Tog v={b1} set={setB1} name="In1" /><Tog v={b2} set={setB2} name="In2" />
    </div>
    <Svg title="CMOS 反相器与 NAND 门" h={290}>
      {/* 反相器 */}
      <g>
        <line x1="150" y1="30" x2="150" y2="68" stroke={C.ink} strokeWidth="2" /><line x1="130" y1="30" x2="170" y2="30" stroke={C.ink} strokeWidth="2" /><text x="150" y="20" textAnchor="middle">V<tspan dy="3" fontSize="9">DD</tspan></text>
        <Fet x={150} y={90} p on={a === 0} label="PMOS" />
        <line x1="150" y1="112" x2="150" y2="168" stroke={C.ink} strokeWidth="2" /><circle cx="150" cy="140" r="4" fill={C.ink} /><line x1="150" y1="140" x2="215" y2="140" stroke={C.ink} strokeWidth="2" /><circle cx="221" cy="140" r="6" fill="#fff" stroke={C.ink} strokeWidth="1.6" />
        <text x="232" y="145">Out = {inv}</text>
        <Fet x={150} y={190} on={a === 1} label="NMOS" />
        <line x1="150" y1="212" x2="150" y2="240" stroke={C.ink} strokeWidth="2" /><path d="M140,240 L160,240 L150,252 Z" fill="none" stroke={C.ink} strokeWidth="1.6" />
        <path d="M126,90 L110,90 L110,190 L141,190" fill="none" stroke={C.ink} strokeWidth="2" /><line x1="60" y1="140" x2="110" y2="140" stroke={C.ink} strokeWidth="2" /><circle cx="110" cy="140" r="4" fill={C.ink} /><circle cx="54" cy="140" r="6" fill="#fff" stroke={C.ink} strokeWidth="1.6" />
        <text x="40" y="125">In = {a}</text>
        <text x="150" y="278" textAnchor="middle" fill="#6b6357">{a ? "NMOS 把输出拉到地" : "PMOS 把输出拉到电源"}；电源到地无直流通路</text>
      </g>
      {/* NAND */}
      <g transform="translate(330,0)">
        <line x1="60" y1="30" x2="200" y2="30" stroke={C.ink} strokeWidth="2" /><text x="130" y="20" textAnchor="middle">V<tspan dy="3" fontSize="9">DD</tspan></text>
        <line x1="70" y1="30" x2="70" y2="58" stroke={C.ink} strokeWidth="2" /><line x1="190" y1="30" x2="190" y2="58" stroke={C.ink} strokeWidth="2" />
        <Fet x={70} y={80} p on={b1 === 0} label="P1" /><Fet x={190} y={80} p on={b2 === 0} label="P2" />
        <line x1="70" y1="102" x2="70" y2="120" stroke={C.ink} strokeWidth="2" /><line x1="190" y1="102" x2="190" y2="120" stroke={C.ink} strokeWidth="2" /><line x1="70" y1="120" x2="190" y2="120" stroke={C.ink} strokeWidth="2" />
        <circle cx="190" cy="120" r="4" fill={C.ink} /><line x1="190" y1="120" x2="250" y2="120" stroke={C.ink} strokeWidth="2" /><circle cx="256" cy="120" r="6" fill="#fff" stroke={C.ink} strokeWidth="1.6" /><text x="268" y="125">Out = {nand}</text>
        <line x1="190" y1="120" x2="190" y2="148" stroke={C.ink} strokeWidth="2" />
        <Fet x={190} y={170} on={b1 === 1} label="N1" /><line x1="190" y1="192" x2="190" y2="208" stroke={C.ink} strokeWidth="2" /><Fet x={190} y={230} on={b2 === 1} label="N2" />
        <line x1="190" y1="252" x2="190" y2="262" stroke={C.ink} strokeWidth="2" /><path d="M180,262 L200,262 L190,274 Z" fill="none" stroke={C.ink} strokeWidth="1.6" />
        <text x="0" y="175">In1 = {b1}</text><text x="0" y="235">In2 = {b2}</text>
        <path d="M46,170 L176,170 M55,80 L40,80 L40,170" fill="none" stroke={C.ink} strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M46,230 L176,230 M175,80 L160,80 L160,230" fill="none" stroke={C.ink} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="130" y="290" textAnchor="middle" fill="#6b6357">{b1 && b2 ? "N1、N2 串联导通，输出为 0" : "至少一个 PMOS 导通，输出为 1"}</text>
      </g>
    </Svg>
    <p style={{ fontSize: 13, color: "#6b6357", margin: "4px" }}>绿色 = 导通，红色 = 截止。任意输入组合下，上拉网络（PMOS）与下拉网络（NMOS）总有一个断开，因此静态时不消耗直流功率。</p>
  </div>;
}
