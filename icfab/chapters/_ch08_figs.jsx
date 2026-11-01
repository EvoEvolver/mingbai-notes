// 第 8 章（上）自绘示意图（SVG）：图 8.1 注入机、图 8.7 损伤与退火、图 8.12 多层靶、图 8.18 二体碰撞（交互）。
import { useState } from "react";
import { TxI } from "@kit";
const R = String.raw;
import { IONS, SI } from "./_ch08_phys.jsx";
import { Seg, Slider } from "./_ch08_plots.jsx";

const C = { si: "#9a9a9a", siL: "#d9d9d9", ox: "#cfe6f5", nit: "#bfe0b5", poly: "#a0522d", metal: "#d4a017", resist: "#b9a3d6", beam: "#c0392b", ink: "#1f1b16", muted: "#6b6b6b" };
const Svg = ({ w = 680, h, title, children }) => <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} style={{ width: "100%", display: "block", fontFamily: "system-ui, sans-serif", fontSize: 13 }}><title>{title}</title>
  <defs><marker id="ar8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="context-stroke" /></marker></defs>{children}</svg>;

// ---------- 图 8.1：离子注入机示意 ----------
export function ImplanterSVG() {
  const [hl, setHl] = useState(null);
  const parts = [
    ["src", "离子源", "气体或固体蒸气被热灯丝电子或等离子体电离；引出电压 $V_{\\rm ext}$ 给离子初速 (8.2)。"],
    ["mag", "分析磁铁", "洛伦兹力 = 向心力 (8.1)：只有 $m/q$ 合适的离子走完半径 $r$ 的弧线、穿过狭缝。"],
    ["acc", "加速管", "把选好的离子加速到最终能量（典型 0–500 keV）。"],
    ["trap", "中性束偏转 / 陷阱", "加速中被中和的原子不受静电偏转，直行进入陷阱，避免成为不可计数的剂量。"],
    ["scan", "x–y 静电扫描", "让束斑扫过整片晶圆（常配合机械扫描）。"],
    ["cup", "法拉第杯 + 电流积分器", "收集束流并对时间积分，按 (8.3) 得到剂量 $Q$。"],
  ];
  const on = k => hl === k;
  const st = k => ({ cursor: "pointer", opacity: hl && !on(k) ? 0.45 : 1 });
  return <div>
    <Svg h={330} title="离子注入机各部件示意">
      <rect x="20" y="40" width="250" height="270" fill="none" stroke={C.muted} strokeDasharray="4 3" />
      {/* 离子源 */}
      <g style={st("src")} onMouseEnter={() => setHl("src")} onClick={() => setHl("src")}>
        <rect x="45" y="250" width="90" height="40" rx="4" fill="#f3e9d8" stroke={C.ink} /><text x="90" y="275" textAnchor="middle">离子源</text>
        <rect x="75" y="232" width="18" height="6" fill={C.ink} /><rect x="99" y="232" width="18" height="6" fill={C.ink} />
      </g>
      {/* 分析磁铁 */}
      <g style={st("mag")} onMouseEnter={() => setHl("mag")} onClick={() => setHl("mag")}>
        <path d="M150 140 A 70 70 0 0 0 80 70 L80 105 A 35 35 0 0 1 115 140 Z" fill="#e9e3f3" stroke={C.ink} />
        <text x="160" y="80">分析磁铁</text>
      </g>
      {/* 束流路径 */}
      <path d="M96 232 L96 140 A 45 45 0 0 1 141 95 L300 95 L470 95 L640 140" fill="none" stroke={C.beam} strokeWidth="5" opacity=".55" />
      <path d="M470 95 L560 95" fill="none" stroke={C.muted} strokeWidth="3" strokeDasharray="5 4" />
      <rect x="258" y="70" width="8" height="18" fill={C.ink} /><rect x="258" y="102" width="8" height="18" fill={C.ink} />
      {/* 加速管 */}
      <g style={st("acc")} onMouseEnter={() => setHl("acc")} onClick={() => setHl("acc")}>
        {Array.from({ length: 9 }, (_, i) => <g key={i}><rect x={300 + i * 14} y="70" width="8" height="16" fill="#bbb" stroke={C.ink} strokeWidth=".6" /><rect x={300 + i * 14} y="104" width="8" height="16" fill="#bbb" stroke={C.ink} strokeWidth=".6" /></g>)}
        <text x="362" y="140" textAnchor="middle">加速管</text><text x="362" y="58" textAnchor="middle" fill={C.muted}>0–500 keV</text>
      </g>
      {/* 中性陷阱 */}
      <g style={st("trap")} onMouseEnter={() => setHl("trap")} onClick={() => setHl("trap")}>
        <line x1="455" y1="78" x2="490" y2="84" stroke="#888" strokeWidth="5" /><line x1="455" y1="112" x2="490" y2="118" stroke="#888" strokeWidth="5" />
        <rect x="560" y="82" width="8" height="26" fill={C.ink} /><text x="560" y="72" textAnchor="middle">中性陷阱</text>
      </g>
      {/* 扫描板 */}
      <g style={st("scan")} onMouseEnter={() => setHl("scan")} onClick={() => setHl("scan")}>
        <line x1="575" y1="112" x2="595" y2="135" stroke="#888" strokeWidth="5" /><line x1="590" y1="100" x2="610" y2="123" stroke="#888" strokeWidth="5" />
        <text x="560" y="165" textAnchor="middle">x–y 扫描</text>
      </g>
      {/* 晶圆与法拉第杯 */}
      <g style={st("cup")} onMouseEnter={() => setHl("cup")} onClick={() => setHl("cup")}>
        <line x1="645" y1="110" x2="635" y2="175" stroke={C.ink} strokeWidth="4" /><text x="650" y="100" textAnchor="end">晶圆</text>
        <path d="M630 190 L630 230 L560 230" fill="none" stroke={C.ink} /><rect x="500" y="215" width="60" height="30" rx="3" fill="#fff" stroke={C.ink} />
        <text x="530" y="235" textAnchor="middle" fontSize="12">∫I dt</text>
        <text x="530" y="270" textAnchor="middle">法拉第杯 / 电流积分器</text>
      </g>
      <text x="300" y="300" fill={C.muted}>悬停或点击各部件查看作用</text>
    </Svg>
    <div style={{ minHeight: 44, fontSize: 14, padding: "4px 8px" }}>{hl ? <TxI>{`**${parts.find(p => p[0] === hl)[1]}**：${parts.find(p => p[0] === hl)[2]}`}</TxI> : <span className="muted">（离子源 → 质量分析 → 加速 → 中性束剔除 → 扫描 → 晶圆与剂量计数）</span>}</div>
  </div>;
}

// ---------- 图 8.7：注入损伤与退火激活 ----------
export function DamageSVG() {
  const lattice = (x0, y0, nx, ny, d) => { const a = []; for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) a.push([x0 + i * d, y0 + j * d]); return a; };
  const rnd = (() => { let s = 11; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const top = lattice(40, 70, 13, 5, 22).map(([x, y]) => [x + (rnd() - .5) * 16, y + (rnd() - .5) * 16]);
  const bot = lattice(40, 180, 13, 3, 22);
  const dopL = [[3, 2], [7, 1], [9, 3], [5, 3], [11, 2]], dopR = [[2, 1], [6, 3], [10, 2], [4, 5], [12, 4]];
  const right = lattice(380, 70, 13, 8, 22);
  const bonds = pts => pts.flatMap(([x, y], k) => [[x, y, x + 22, y], [x, y, x, y + 22]]);
  return <Svg h={290} title="注入后（左）与退火激活后（右）的晶格">
    {[60, 110, 160, 210, 260, 310].map(x => <line key={x} x1={x} y1="8" x2={x} y2="50" stroke={C.beam} strokeWidth="2" markerEnd="url(#ar8)" />)}
    {bot.map(([x, y], k) => <g key={"b" + k}>{x < 300 && <line x1={x} y1={y} x2={x + 22} y2={y} stroke="#888" />}{y < 224 && <line x1={x} y1={y} x2={x} y2={y + 22} stroke="#888" />}</g>)}
    {[...top, ...bot].map(([x, y], k) => <circle key={k} cx={x} cy={y} r="7.5" fill={C.siL} stroke="#777" />)}
    {dopL.map(([i, j], k) => <circle key={"d" + k} cx={40 + i * 22 + (rnd() - .5) * 12} cy={70 + j * 22 + (rnd() - .5) * 10} r="7.5" fill={C.beam} stroke="#5a1a14" />)}
    {right.flatMap(([x, y], k) => [x < 640 && <line key={"h" + k} x1={x} y1={y} x2={x + 22} y2={y} stroke="#888" />, y < 224 && <line key={"v" + k} x1={x} y1={y} x2={x} y2={y + 22} stroke="#888" />])}
    {right.map(([x, y], k) => <circle key={"r" + k} cx={x} cy={y} r="7.5" fill={C.siL} stroke="#777" />)}
    {dopR.map(([i, j], k) => <circle key={"e" + k} cx={380 + i * 22} cy={70 + j * 22} r="7.5" fill={C.beam} stroke="#5a1a14" />)}
    <text x="172" y="262" textAnchor="middle">注入后：表层无序（可能非晶化），杂质多在间隙位</text>
    <text x="512" y="262" textAnchor="middle">退火后：晶格修复，杂质占据替位（激活）</text>
    <line x1="335" y1="140" x2="365" y2="140" stroke={C.ink} strokeWidth="2" markerEnd="url(#ar8)" /><text x="350" y="128" textAnchor="middle" fontSize="12">退火</text>
    <circle cx="40" cy="282" r="6" fill={C.siL} stroke="#777" /><text x="52" y="286" fontSize="12">Si</text><circle cx="90" cy="282" r="6" fill={C.beam} /><text x="102" y="286" fontSize="12">注入杂质</text>
  </Svg>;
}

// ---------- 图 8.12：多层靶 ----------
export function MultilayerSVG() {
  return <Svg h={260} title="向多层靶注入：左侧有材料 1、2 两层覆盖，右侧直接注入衬底">
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={150 + i * 50} y1="10" x2={150 + i * 50} y2="55" stroke={C.beam} strokeWidth="2" markerEnd="url(#ar8)" />)}
    <rect x="130" y="70" width="210" height="34" fill={C.resist} stroke={C.ink} /><text x="235" y="92" textAnchor="middle">材料 1（如光刻胶）</text>
    <rect x="130" y="104" width="210" height="26" fill={C.ox} stroke={C.ink} /><text x="235" y="122" textAnchor="middle">材料 2（如 SiO₂）</text>
    <rect x="130" y="130" width="440" height="115" fill={C.siL} stroke={C.ink} /><text x="450" y="200" textAnchor="middle">衬底 Si</text>
    <line x1="115" y1="70" x2="115" y2="104" stroke={C.ink} markerStart="url(#ar8)" markerEnd="url(#ar8)" /><text x="100" y="92" textAnchor="end">t₁</text>
    <line x1="115" y1="104" x2="115" y2="130" stroke={C.ink} markerStart="url(#ar8)" markerEnd="url(#ar8)" /><text x="100" y="122" textAnchor="end">t₂</text>
    <path d="M360 130 Q 400 175 450 140" fill="none" stroke={C.beam} strokeDasharray="4 3" /><text x="455" y="160" fontSize="12" fill={C.beam}>直接注入区</text>
  </Svg>;
}

// ---------- 图 8.18：二体碰撞（交互）----------
export function CollisionSVG() {
  const [ion, setIon] = useState("As"), [phi, setPhi] = useState(35);
  const m1 = IONS[ion].m, m2 = SI.m, g = 4 * m1 * m2 / (m1 + m2) ** 2, f = g * Math.cos(phi * Math.PI / 180) ** 2;
  // 由 φ 求离子在实验室系的偏转角 θ：质心角 Θ = π − 2φ；tanθ = sinΘ/(cosΘ + m1/m2)
  const Th = Math.PI - 2 * phi * Math.PI / 180, th = Math.atan2(Math.sin(Th), Math.cos(Th) + m1 / m2);
  const b = 10 + 80 * phi / 90;   // 示意：φ 越大碰撞参数越大
  const ix = 300, iy = 150 - b, L = 170;
  return <div>
    <Seg options={["B", "P", "As", "Sb"].map(k => [k, IONS[k].tex])} value={ion} onChange={setIon} />
    <Slider label={R`\phi\ (\text{反冲角})`} value={phi} set={setPhi} min={0} max={89} step={1} fmt={v => v.toFixed(0) + "^\\circ"} />
    <Svg h={250} title="离子与静止靶原子的二体碰撞">
      <line x1="60" y1={iy} x2={ix} y2={iy} stroke={C.ink} strokeWidth="2" markerEnd="url(#ar8)" />
      <circle cx="60" cy={iy} r="14" fill={({ B: "#2c5f8a", P: "#b03a2e", As: "#2c6e49", Sb: "#7d3c98" })[ion]} />
      <text x="60" y={iy - 22} textAnchor="middle">入射离子 E₁, m₁, Z₁</text>
      <line x1={ix} y1={iy} x2={ix + L * Math.cos(th)} y2={iy - L * Math.sin(th)} stroke={C.ink} strokeWidth="2" markerEnd="url(#ar8)" />
      <line x1={ix} y1={iy} x2={ix + 160} y2={iy} stroke={C.muted} strokeDasharray="5 4" />
      <text x={ix + 40} y={iy - 8}>θ = {(th * 180 / Math.PI).toFixed(0)}°</text>
      <circle cx={ix + 20} cy="150" r="13" fill="#888" />
      <line x1={ix + 20} y1="150" x2={ix + 20 + 150 * Math.cos(phi * Math.PI / 180)} y2={150 + 150 * Math.sin(phi * Math.PI / 180)} stroke={C.ink} strokeWidth="2" markerEnd="url(#ar8)" />
      <line x1="200" y1="150" x2={ix + 190} y2="150" stroke={C.muted} strokeDasharray="5 4" />
      <text x={ix + 70} y="175">φ = {phi.toFixed(0)}°</text>
      <text x={ix + 20} y="240" textAnchor="middle">反冲靶原子 m₂, Z₂（Si）</text>
      <line x1="230" y1={iy} x2="230" y2="150" stroke={C.ink} markerStart="url(#ar8)" markerEnd="url(#ar8)" /><text x="222" y={(iy + 150) / 2 + 4} textAnchor="end">b</text>
    </Svg>
    <div style={{ fontSize: 14 }}><TxI>{`$m_1=${m1},\\ m_2=${m2.toFixed(1)}$：最大传能比 $4m_1m_2/(m_1+m_2)^2=${g.toFixed(3)}$；此次碰撞 $\\Delta E/E_1=${f.toFixed(3)}$。离子偏转角 $\\theta=${(th * 180 / Math.PI).toFixed(1)}^\\circ$（${m1 < m2 ? "轻离子可以大角度乃至向后弹回" : "重离子偏转角有上限 $\\arcsin(m_2/m_1)=" + (Math.asin(m2 / m1) * 180 / Math.PI).toFixed(1) + "^\\circ$，只能向前"}）。图中碰撞参数 $b$ 的长度仅示意其与 $\\phi$ 的单调关系。`}</TxI></div>
  </div>;
}
