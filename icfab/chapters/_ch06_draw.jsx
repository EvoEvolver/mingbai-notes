// 第 6 章自绘插图（SVG）。材料配色：Si 灰、SiO2 浅蓝、Si3N4 绿、多晶硅红棕、金属金色。
// 所有 SVG 文字中的下标用 sv("SiO_2") 这种写法（_x 或 _{xy} 为下标，^x 或 ^{xy} 为上标）。
import { useState } from "react";
import { TxI } from "@kit";
import * as P from "./_ch06_phys.jsx";
const R = String.raw;

export const COL = { si: "#c3c6cc", siDark: "#9a9ea6", ox: "#bfe1f6", oxDark: "#6fb0dc", nit: "#8fcf9a", poly: "#a5553a", metal: "#d9a441", ink: "#1f1b16", red: "#c0392b", blue: "#2c4a6e", green: "#2c6e49", gold: "#b8862b", gas: "#f4f1e8" };
const FONT = { fontFamily: "system-ui, -apple-system, 'PingFang SC', sans-serif", fontSize: 14 };
export const panel = { background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 10, padding: "12px 14px", boxSizing: "border-box", width: "100%" };
export const btn = on => ({ padding: "5px 11px", margin: "2px 4px 2px 0", borderRadius: 7, border: `1px solid ${on ? "#2c4a6e" : "#bcb6a9"}`, background: on ? "#e2ebf4" : "#fffdf8", color: "#1f1b16", cursor: "pointer", fontSize: 13.5 });
export const row = { display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" };

// 文本中的下/上标
export function sv(s) {
  const out = []; let i = 0, buf = "", k = 0;
  const flush = () => { if (buf) { out.push(buf); buf = ""; } };
  while (i < s.length) {
    const c = s[i];
    if ((c === "_" || c === "^") && i + 1 < s.length) {
      flush(); let body;
      if (s[i + 1] === "{") { const j = s.indexOf("}", i + 2); body = s.slice(i + 2, j); i = j + 1; } else { body = s[i + 1]; i += 2; }
      const dy = c === "_" ? 0.32 : -0.45;
      out.push(<tspan key={k++} dy={`${dy}em`} fontSize="0.72em">{body}</tspan>, <tspan key={k++} dy={`${-dy}em`}>{"​"}</tspan>);
    } else { buf += c; i++; }
  }
  flush(); return out;
}
export function Svg({ w = 680, h = 300, title, children }) {
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} style={{ width: "100%", display: "block", ...FONT }}><title>{title}</title>{children}</svg>;
}
export function Arrow({ x1, y1, x2, y2, color = COL.ink, w = 2, dash, head = 8 }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p = `${x2},${y2} ${x2 - head * Math.cos(a - 0.4)},${y2 - head * Math.sin(a - 0.4)} ${x2 - head * Math.cos(a + 0.4)},${y2 - head * Math.sin(a + 0.4)}`;
  return <g><line x1={x1} y1={y1} x2={x2 - 0.7 * head * Math.cos(a)} y2={y2 - 0.7 * head * Math.sin(a)} stroke={color} strokeWidth={w} strokeDasharray={dash} /><polygon points={p} fill={color} /></g>;
}
export function Range({ label, value, min, max, step, onChange, fmt }) {
  return <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, margin: "4px 0", flexWrap: "wrap" }}>
    <span style={{ minWidth: 150 }}>{typeof label === "string" ? <TxI>{label}</TxI> : label}：<b>{fmt ? fmt(value) : value}</b></span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} style={{ flex: 1, minWidth: 160 }} />
  </label>;
}
export const tex = (v, d = 2) => { if (!Number.isFinite(v)) return "-"; if (v !== 0 && (Math.abs(v) >= 1e3 || Math.abs(v) < 1e-2)) { const e = Math.floor(Math.log10(Math.abs(v))); return `${(v / 10 ** e).toFixed(d)}\\times10^{${e}}`; } return (+v).toPrecision(d + 1); };
const hatch = id => <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill={COL.ox} /><line x1="0" y1="0" x2="0" y2="6" stroke="#9cc9e8" strokeWidth="1.2" /></pattern>;

// ---------------- 图 6.1 氧化层/介质厚度范围（对数轴） ----------------
export function ThicknessRanges() {
  const y = v => 300 - (Math.log10(v) + 0.5) / 3.5 * 270;   // 10^-0.5 … 10^3
  const box = (x, v0, v1, lines, fill) => <g key={lines.join()}><rect x={x} y={y(v1)} width={230} height={y(v0) - y(v1)} fill={fill} stroke="#555" />
    {lines.map((t, i) => <text key={i} x={x + 115} y={(y(v0) + y(v1)) / 2 + (i - (lines.length - 1) / 2) * 17 + 5} textAnchor="middle">{t}</text>)}</g>;
  return <Svg h={330} title="硅工艺中氧化层与介质厚度的大致范围">
    <line x1={110} y1={y(0.32)} x2={110} y2={y(1000) - 18} stroke="#333" /><text x={40} y={22} fontSize="12.5">厚度 (nm)</text>
    {[1, 10, 100, 1000].map(v => <g key={v}><line x1={104} x2={110} y1={y(v)} y2={y(v)} stroke="#333" /><text x={98} y={y(v) + 5} textAnchor="end">{v}</text></g>)}
    <text x={235} y={22} textAnchor="middle" fontWeight="600">热生长氧化层</text><text x={535} y={22} textAnchor="middle" fontWeight="600">淀积介质</text>
    {box(120, 0.32, 1, ["化学氧化层", "自然氧化层"], "#e3eef6")}
    {box(120, 1, 10, ["栅氧化层", "隧穿氧化层"], COL.ox)}
    {box(120, 10, 100, ["垫氧化层（pad oxide）"], "#a9d3ef")}
    {box(120, 100, 1000, ["场氧化层", "掩蔽氧化层"], "#8cc3e8")}
    {box(420, 100, 1000, ["后道层间介质（BEOL ILD）", "掩蔽氧化层"], "#d7d3c8")}
    {box(420, 0.5, 2.5, ["高 k 栅介质"], "#e4c9a6")}
  </Svg>;
}

// ---------------- 图 6.3 氧化剂内扩散 + 界面反应 ----------------
export function OxidationBasic() {
  return <Svg h={250} title="硅氧化的基本过程：氧化剂穿过氧化层扩散到 Si/SiO2 界面反应">
    <defs>{hatch("h63")}</defs>
    <rect x={20} y={40} width={150} height={170} fill={COL.gas} stroke="#ccc" /><text x={95} y={30} textAnchor="middle">气相</text>
    <rect x={170} y={40} width={170} height={170} fill="url(#h63)" stroke="#6a8" /><text x={255} y={30} textAnchor="middle">{sv("SiO_2")}</text>
    <rect x={340} y={40} width={320} height={170} fill={COL.si} stroke="#888" /><text x={500} y={30} textAnchor="middle">硅 Silicon</text>
    <text x={60} y={95}>{sv("O_2, H_2O")}</text>
    <Arrow x1={70} y1={110} x2={335} y2={110} color={COL.red} w={3} />
    <text x={255} y={100} textAnchor="middle" fill={COL.red}>扩散</text>
    <circle cx={340} cy={110} r={14} fill="none" stroke={COL.red} strokeWidth={2} /><text x={350} y={145} fill={COL.red}>反应（新氧化层在此生成）</text>
    <text x={370} y={185}>{sv("Si + O_2 → SiO_2")}</text><text x={370} y={205}>{sv("Si + 2H_2O → SiO_2 + 2H_2")}</text>
  </Svg>;
}

// ---------------- 图 6.4 体积膨胀与硅消耗（交互） ----------------
export function Consumption() {
  const [mode, setMode] = useState("cube"), [xo, setXo] = useState(500);
  const k = P.CONSUME;
  return <div style={panel}>
    <div style={row}>{[["cube", "单位体积的膨胀"], ["planar", "平面氧化：上下分配"], ["locos", "LOCOS：局部氧化与鸟嘴（示意）"]].map(([m, t]) => <button key={m} style={btn(mode === m)} onClick={() => setMode(m)}>{t}</button>)}</div>
    {mode === "cube" ? <Svg h={240} title="硅转化为二氧化硅时的体积膨胀">
      <rect x={20} y={130} width={190} height={90} fill={COL.si} stroke="#888" /><rect x={95} y={130} width={40} height={40} fill="#fff" stroke="#333" /><text x={115} y={155} textAnchor="middle">Si</text><text x={115} y={122} textAnchor="middle" fontSize="12">1×1×1</text>
      <Arrow x1={225} y1={150} x2={265} y2={150} />
      <rect x={285} y={110} width={52} height={52} fill={COL.ox} stroke="#333" /><text x={311} y={141} textAnchor="middle">{sv("SiO_2")}</text><text x={311} y={102} textAnchor="middle" fontSize="12">{sv("1.3^3 = 2.197")}</text>
      <text x={311} y={190} textAnchor="middle" fontSize="12">若不受约束：每个方向 +30%</text>
      <Arrow x1={380} y1={150} x2={420} y2={150} />
      <rect x={440} y={130} width={210} height={90} fill={COL.si} stroke="#888" /><rect x={525} y={42} width={40} height={128} fill={COL.ox} stroke="#333" />
      <line x1={440} x2={650} y1={130} y2={130} stroke={COL.red} strokeDasharray="5 4" /><text x={575} y={92}>上方 1.2</text><text x={575} y={160}>下方 1.0</text>
      <text x={545} y={35} textAnchor="middle" fontSize="12">横向被衬底锁住：只能沿厚度方向 ×2.2</text>
    </Svg> : mode === "planar" ? <PlanarConsume xo={xo} k={k} /> : <LocosSketch xo={xo} k={k} />}
    {mode !== "cube" && <Range label="氧化层厚度 $x_o$" value={xo} min={20} max={1000} step={10} onChange={setXo} fmt={v => `${v} nm`} />}
    <div style={{ fontSize: 13, color: "#555" }}><TxI>{R`消耗比 $x_{\rm Si}/x_o=N_{\rm SiO_2}/N_{\rm Si}=2.2\times10^{22}/5.0\times10^{22}=${k.toFixed(2)}$：` + (mode === "cube" ? R`$1/0.44\approx2.27$，与 $1.3^3\approx2.2$ 一致。` : `生长 ${xo} nm 氧化层要吃掉 ${(k * xo).toFixed(0)} nm 硅：原表面以上 ${((1 - k) * xo).toFixed(0)} nm、以下 ${(k * xo).toFixed(0)} nm。`)}</TxI></div>
  </div>;
}
function PlanarConsume({ xo, k }) {
  const s = 150 / 1000, y0 = 120, up = (1 - k) * xo * s, dn = k * xo * s;
  return <Svg h={260} title="平面氧化中氧化层在原硅表面上下的分配">
    <rect x={40} y={y0 + dn} width={420} height={260 - y0 - dn} fill={COL.si} stroke="#888" />
    <rect x={40} y={y0 - up} width={420} height={up + dn} fill={COL.ox} stroke={COL.oxDark} />
    <line x1={30} x2={480} y1={y0} y2={y0} stroke={COL.red} strokeDasharray="6 4" /><text x={490} y={y0 + 4} fill={COL.red}>原硅表面</text>
    <text x={490} y={y0 - up + 12}>{`↑ ${(1 - k).toFixed(2)} x_o`}</text><text x={490} y={y0 + dn}>{`↓ ${k.toFixed(2)} x_o`}</text>
    <text x={250} y={y0 - up / 2 + 5} textAnchor="middle">{sv("SiO_2")}</text><text x={250} y={235} textAnchor="middle">Si</text>
  </Svg>;
}
function LocosSketch({ xo, k }) {
  const s = 140 / 1000, y0 = 120, up = (1 - k) * xo * s, dn = k * xo * s, L = 0.9 * xo * s * 1.6, xe = 330;   // 鸟嘴长度：示意，取 ~场氧厚度量级
  const top = x => x < xe - L ? y0 - up : x > xe + L ? y0 - 4 : y0 - up + (up - 4) * (0.5 - 0.5 * Math.cos(Math.PI * (x - xe + L) / (2 * L)));
  const bot = x => x < xe - L ? y0 + dn : x > xe + L ? y0 + 2 : y0 + dn - (dn - 2) * (0.5 - 0.5 * Math.cos(Math.PI * (x - xe + L) / (2 * L)));
  const xs = Array.from({ length: 121 }, (_, i) => 30 + i * 5);
  const oxPath = "M" + xs.map(x => `${x},${top(x)}`).join(" L") + " L" + xs.slice().reverse().map(x => `${x},${bot(x)}`).join(" L") + "Z";
  const nit = xs.filter(x => x >= xe - L * 0.6);
  const nitPath = "M" + nit.map(x => `${x},${top(x) - 18}`).join(" L") + " L" + nit.slice().reverse().map(x => `${x},${top(x)}`).join(" L") + "Z";
  return <Svg h={260} title="LOCOS 局部氧化与鸟嘴（示意）">
    <rect x={30} y={y0 - 10} width={600} height={150} fill={COL.si} stroke="#888" />
    <path d={oxPath} fill={COL.ox} stroke={COL.oxDark} /><path d={nitPath} fill={COL.nit} stroke="#4a8" />
    <line x1={30} x2={630} y1={y0} y2={y0} stroke={COL.red} strokeDasharray="6 4" /><text x={40} y={y0 + dn + 22} fill={COL.red} fontSize="12.5">原硅表面（虚线）</text>
    <text x={120} y={y0 - up / 2 + 10}>场氧 {sv("SiO_2")}</text><text x={520} y={top(520) - 24}>{sv("Si_3N_4 掩膜")}</text>
    <text x={xe - 10} y={y0 + 70} textAnchor="middle" fontSize="12.5">← 鸟嘴：氧化剂从掩膜边缘下方横向扩散</text>
    <text x={330} y={245} textAnchor="middle" fontSize="12">（形状为示意；上下分配 0.56 : 0.44 为计算值）</text>
  </Svg>;
}

// ---------------- 图 6.8 / 6.9 通量与浓度剖面 ----------------
// profile(ratio)：ratio = C_i/C* ∈ (0,1]
export function ProfileSvg({ xoFrac, ratio, h = 230, label, compact }) {
  const x0 = compact ? 30 : 140, ox = 40 + 220 * xoFrac, top = 50, bot = h - 40, cy = v => bot - (bot - top - 20) * v;
  return <g>
    {!compact && <><rect x={20} y={top} width={x0 - 20} height={bot - top} fill={COL.gas} /><text x={(x0 + 20) / 2} y={top - 8} textAnchor="middle" fontSize="12.5">气相</text></>}
    <rect x={x0} y={top} width={ox} height={bot - top} fill="url(#h68)" stroke="#6a8" /><text x={x0 + ox / 2} y={top - 8} textAnchor="middle" fontSize="12.5">{sv("SiO_2")}</text>
    <rect x={x0 + ox} y={top} width={compact ? 120 : 160} height={bot - top} fill={COL.si} stroke="#888" /><text x={x0 + ox + (compact ? 60 : 80)} y={top - 8} textAnchor="middle" fontSize="12.5">Si</text>
    {!compact && <path d={`M 22 ${cy(1.12)} C ${x0 - 40} ${cy(1.12)}, ${x0 - 8} ${cy(1.05)}, ${x0} ${cy(1)}`} fill="none" stroke={COL.red} strokeWidth={2.5} />}
    <line x1={x0} y1={cy(1)} x2={x0 + ox} y2={cy(ratio)} stroke={COL.red} strokeWidth={2.5} />
    <text x={x0 + 4} y={cy(1) - 6} fontSize="12.5">C*</text><text x={x0 + ox + 4} y={cy(ratio) - 4} fontSize="12.5">{sv("C_i")}</text>
    {!compact && <><text x={24} y={cy(1.12) - 6} fontSize="12.5">{sv("C_G")}</text></>}
    <line x1={x0} x2={x0 + ox} y1={bot + 12} y2={bot + 12} stroke="#333" /><text x={x0 + ox / 2} y={bot + 28} textAnchor="middle" fontSize="12.5">{sv("x_o")}</text>
    {label && <text x={x0 + ox / 2 + 60} y={h - 2} textAnchor="middle" fontSize="13" fontWeight="600">{label}</text>}
  </g>;
}
export function FluxLimits() {
  return <Svg h={250} title="Deal–Grove 模型的两个极限">
    <defs>{hatch("h68")}</defs>
    <g transform="translate(0,0)"><ProfileSvg compact xoFrac={0.12} ratio={0.97} h={240} label="薄：界面反应限制（线性区）" /></g>
    <g transform="translate(340,0)"><ProfileSvg compact xoFrac={0.75} ratio={0.04} h={240} label="厚：扩散限制（抛物线区）" /></g>
  </Svg>;
}
// 交互：拖动厚度/温度，看 F1=F2=F3 中谁是瓶颈（串联“阻力” 1/k_s 与 x_o/D）
export function FluxDemo() {
  const [amb, setAmb] = useState("dry"), [Tc, setTc] = useState(1000), [lx, setLx] = useState(Math.log10(0.05));
  const xo = Math.pow(10, lx), p = P.dgParams({ amb, Tc, ori: "100" }), { D, ks } = P.dgMicro(amb, p);
  const Rr = 1 / ks, Rd = xo * 1e-4 / D, ratio = 1 / (1 + ks * xo * 1e-4 / D);   // 式 (6.6)
  const Cs = P.DG_TABLE[amb].Cstar, F = Cs / (Rr + Rd), rate = F / P.DG_TABLE[amb].N1 * 1e7 * 60;   // nm/min
  const frac = Rr / (Rr + Rd);
  const bar = (w, c, t) => <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}><div style={{ width: `${Math.max(1, w * 100)}%`, maxWidth: "70%", height: 16, background: c, borderRadius: 3 }} /><span>{t}</span></div>;
  return <div style={panel}>
    <div style={row}><button style={btn(amb === "dry")} onClick={() => setAmb("dry")}>干氧 O2</button><button style={btn(amb === "wet")} onClick={() => setAmb("wet")}>湿氧 H2O</button><span style={{ fontSize: 13, color: "#666" }}>(100) 硅，1 atm</span></div>
    <Range label="温度 T" value={Tc} min={800} max={1200} step={10} onChange={setTc} fmt={v => `${v} °C`} />
    <Range label="当前氧化层厚度 $x_o$" value={lx} min={-3} max={0.5} step={0.01} onChange={setLx} fmt={v => { const x = Math.pow(10, v); return x < 0.1 ? `${(x * 1000).toFixed(1)} nm` : `${x.toFixed(3)} µm`; }} />
    <Svg h={240} title="氧化剂浓度剖面"><defs>{hatch("h68")}</defs><ProfileSvg xoFrac={Math.min(1, (lx + 3) / 3.5)} ratio={ratio} h={235} /></Svg>
    <div style={{ display: "grid", gap: 4, marginTop: 4 }}>
      {bar(frac, COL.gold, <TxI>{R`界面反应“阻力” $1/k_s=${tex(Rr)}\ \mathrm{s/cm}$（占 ${(frac * 100).toFixed(0)}%）`}</TxI>)}
      {bar(1 - frac, COL.oxDark, <TxI>{R`扩散“阻力” $x_o/D=${tex(Rd)}\ \mathrm{s/cm}$（占 ${((1 - frac) * 100).toFixed(0)}%）`}</TxI>)}
    </div>
    <div style={{ fontSize: 13.5, marginTop: 6 }}>
      <TxI>{R`$C_i/C^*=${ratio.toFixed(3)}$；$F_1=F_2=F_3=${tex(F)}\ \mathrm{cm^{-2}s^{-1}}$，生长速率 $dx_o/dt=F_3/N_1=${tex(rate, 3)}\ \mathrm{nm/min}$。`}</TxI>
      <b style={{ color: frac > 0.7 ? COL.gold : frac < 0.3 ? COL.oxDark : COL.ink }}>{frac > 0.7 ? " 瓶颈：界面反应（线性区）" : frac < 0.3 ? " 瓶颈：穿过氧化层的扩散（抛物线区）" : " 过渡区：两者相当"}</b>
      <span style={{ color: "#666" }}><TxI>{R`（两种阻力相等处 $x_o=D/k_s=A/2=${(p.A / 2 * 1000).toFixed(0)}\ \mathrm{nm}$）`}</TxI></span>
    </div>
  </div>;
}

// ---------------- 图 6.16 圆柱氧化 ----------------
export function cylGeom(r0, f, hole) {
  // f：已被氧化的硅占原始“可氧化量”的比例（0..1）。柱：硅半径 r0 → rs；孔：硅/氧化物界面 r0 → rs
  if (!hole) { const rs = r0 * Math.sqrt(1 - f); const R = Math.sqrt(rs * rs + 2.2 * (r0 * r0 - rs * rs)); return { rs, R, stretch: R / r0 }; }
  const rmax = r0 * Math.sqrt(2.2 / 1.2), rs = r0 + (rmax - r0) * f; const Rin = Math.sqrt(Math.max(0, 2.2 * r0 * r0 - 1.2 * rs * rs)); return { rs, R: Rin, stretch: Rin / r0 };
}
export function CylinderOx() {
  const [f, setF] = useState(0.5);
  const c = cylGeom(62, f, false), h = cylGeom(55, Math.min(1, f), true);
  return <div style={panel}>
    <Svg h={250} title="硅圆柱（凸）与圆孔（凹）的氧化">
      <defs>{hatch("h616")}</defs>
      <g transform="translate(170,125)">
        <circle r={c.R} fill="url(#h616)" stroke={COL.oxDark} /><circle r={c.rs} fill={COL.si} stroke="#777" />
        <circle r={62} fill="none" stroke={COL.red} strokeDasharray="5 4" />
        <text y={-c.R - 8} textAnchor="middle" fontSize="12.5">柱（凸）：外径 {(c.R / 62).toFixed(2)} r</text>
        <text y={4} textAnchor="middle" fontSize="12">{c.rs > 20 ? "Si" : ""}</text>
      </g>
      <g transform="translate(500,125)">
        <rect x={-150} y={-115} width={300} height={230} fill={COL.si} stroke="#777" />
        <circle r={h.rs} fill="url(#h616)" stroke={COL.oxDark} /><circle r={h.R} fill="#fff" stroke="#777" />
        <circle r={55} fill="none" stroke={COL.red} strokeDasharray="5 4" />
        <text y={-h.rs - 8} textAnchor="middle" fontSize="12.5">孔（凹）：内径 {(h.R / 55).toFixed(2)} r</text>
      </g>
    </Svg>
    <Range label="氧化进度" value={f} min={0} max={1} step={0.01} onChange={setF} fmt={v => `${(v * 100).toFixed(0)}%`} />
    <div style={{ fontSize: 13.5 }}><TxI>{R`红色虚线为原始硅表面。柱子外表面最早生成的那圈氧化层被不断“顶”到更大的半径上，切向拉伸 ${((c.stretch - 1) * 100).toFixed(0)}%（全部氧化时为 $\sqrt{2.2}-1\approx48\%$）；孔内表面的氧化层则被挤向中心，切向压缩 ${((1 - h.stretch) * 100).toFixed(0)}%。`}</TxI></div>
  </div>;
}

// ---------------- 图 6.21 氧化层中的电荷 ----------------
export function OxideCharges() {
  return <Svg h={300} title="SiO2 中四类电荷的位置">
    <rect x={30} y={30} width={620} height={150} fill={COL.ox} stroke={COL.oxDark} /><text x={45} y={52}>{sv("SiO_2")}</text>
    <rect x={30} y={180} width={620} height={22} fill="#d9e5ee" /><text x={45} y={196} fontSize="12">{sv("SiO_x 过渡区")}</text>
    <rect x={30} y={202} width={620} height={80} fill={COL.si} stroke="#888" /><text x={45} y={268}>Si</text>
    {[90, 130, 170].map((x, i) => <text key={i} x={x} y={95 + 25 * (i % 2)} fill={COL.red} fontWeight="700">{sv("Na^+")}</text>)}
    <text x={210} y={120} fill={COL.red} fontWeight="700">{sv("K^+")}</text>
    <text x={70} y={160} fontSize="12.5" fill={COL.red}>{sv("可动离子电荷 Q_m")}</text>
    {[300, 330, 360, 390].map((x, i) => <text key={i} x={x} y={80 + 30 * (i % 2)} fontWeight="700">{i % 2 ? "+" : "−"}</text>)}
    <text x={290} y={160} fontSize="12.5">{sv("氧化层陷阱电荷 Q_{ot}")}</text>
    {[440, 470, 500, 530, 560, 590].map(x => <text key={x} x={x} y={174} fontWeight="700" fill={COL.blue}>+</text>)}
    <text x={455} y={120} fontSize="12.5" fill={COL.blue}>{sv("固定氧化层电荷 Q_f")}</text><Arrow x1={510} y1={127} x2={510} y2={160} color={COL.blue} w={1.5} />
    {[440, 480, 520, 560, 600].map(x => <text key={x} x={x} y={208} fontWeight="700" fill={COL.green}>×</text>)}
    <text x={430} y={240} fontSize="12.5" fill={COL.green}>{sv("界面陷阱电荷 Q_{it}（在界面上）")}</text>
  </Svg>;
}

// ---------------- 图 6.23 D_it 的 U 形分布 ----------------
export function DitCurve() {
  const xs = Array.from({ length: 111 }, (_, i) => -0.5 + i / 110);
  const X = e => 90 + (e + 0.56) / 1.12 * 520, Y = d => 230 - (Math.log10(d) - 11) / 1 * 180;
  const pts = xs.map(e => `${X(e)},${Math.max(40, Y(P.ditOf(e, 1.1e11)))}`).join(" ");
  return <Svg h={270} title="界面陷阱密度在禁带中的 U 形分布（示意）">
    <line x1={90} y1={230} x2={610} y2={230} stroke="#333" /><line x1={90} y1={40} x2={90} y2={230} stroke="#333" /><line x1={610} y1={40} x2={610} y2={230} stroke="#333" />
    <polyline points={pts} fill="none" stroke={COL.blue} strokeWidth={2.5} />
    <line x1={X(0)} x2={X(0)} y1={230} y2={120} stroke="#333" strokeDasharray="5 4" /><text x={X(0)} y={112} textAnchor="middle">{sv("E_i")}</text>
    <text x={84} y={234} textAnchor="end" fontSize="12">{sv("10^{11}")}</text><text x={84} y={54} textAnchor="end" fontSize="12">{sv("10^{12}")}</text>
    <text x={20} y={140} fontSize="12" transform="rotate(-90 20 140)">{sv("D_{it} (cm^{-2}eV^{-1})")}</text>
    <text x={90} y={250} textAnchor="middle" fontSize="12">{sv("E_v")}</text><text x={610} y={250} textAnchor="middle" fontSize="12">{sv("E_c")}</text>
    <text x={350} y={262} textAnchor="middle" fontSize="12">禁带中的能量位置（共 1.1 eV）</text>
  </Svg>;
}

// ---------------- 图 6.24 氧化层颜色（原书色卡 + 薄膜干涉计算） ----------------
export function ColorChart() {
  const [d, setD] = useState(120);
  return <div style={panel}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(118px, 1fr))", gap: 6 }}>
      {P.COLOR_TABLE.map(([t, name]) => <div key={t} style={{ fontSize: 12, border: "1px solid #ddd", borderRadius: 6, overflow: "hidden", background: "#fff" }}>
        <div style={{ height: 34, background: P.oxideColor(t) }} /><div style={{ padding: "3px 5px" }}><b>{t} nm</b><br />{name}</div></div>)}
    </div>
    <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 10, flexWrap: "wrap" }}>
      <div style={{ width: 120, height: 80, borderRadius: 8, border: "1px solid #999", background: P.oxideColor(d) }} />
      <div style={{ flex: 1, minWidth: 240 }}><Range label="氧化层厚度" value={d} min={0} max={600} step={2} onChange={setD} fmt={v => `${v} nm`} />
        <div style={{ fontSize: 13 }}><TxI>{R`正入射时反射率 $R(\lambda)$ 的极小值落在 $2n_{ox}d=(m+\tfrac12)\lambda$ 附近（空气/$\mathrm{SiO_2}$ 与 $\mathrm{SiO_2}$/Si 两个界面的反射都有半波损失，于是二者在这些波长处反相）。当前厚度下被“挖掉”的可见光波长：` + ([0, 1, 2, 3].map(m => 2 * 1.46 * d / (m + 0.5)).filter(l => l > 380 && l < 780).map(l => l.toFixed(0) + " nm").join("、") || "无") + "。"}</TxI></div></div>
    </div>
  </div>;
}

// ---------------- 图 6.25 C–V 测量装置 ----------------
export function CVSetup() {
  return <Svg h={250} title="MOS 电容的 C–V 测量">
    <rect x={30} y={30} width={150} height={190} fill="none" stroke="#777" strokeDasharray="6 4" /><text x={105} y={240} textAnchor="middle">C–V 测试仪</text>
    <circle cx={105} cy={70} r={22} fill="#eee" stroke="#333" /><Arrow x1={92} y1={84} x2={118} y2={56} w={2} /><text x={55} y={74} fontSize="12.5">{sv("i_{AC}")}</text>
    <circle cx={105} cy={130} r={22} fill="#fff" stroke="#333" /><path d="M 92 130 q 6.5 -10 13 0 t 13 0" fill="none" stroke="#333" /><text x={50} y={134} fontSize="12.5">{sv("V_{AC}")}</text>
    <line x1={90} x2={120} y1={180} y2={180} stroke="#333" strokeWidth={2} /><line x1={96} x2={114} y1={188} y2={188} stroke="#333" strokeWidth={2} /><Arrow x1={88} y1={200} x2={124} y2={166} w={1.5} /><text x={40} y={178} fontSize="12">直流扫描</text>
    <polyline points="105,48 105,20 450,20 450,70" fill="none" stroke="#333" /><line x1={105} y1={92} x2={105} y2={108} stroke="#333" /><line x1={105} y1={152} x2={105} y2={180} stroke="#333" />
    <polyline points="105,188 105,230 450,230 450,200" fill="none" stroke="#333" />
    <rect x={380} y={70} width={140} height={40} fill={COL.metal} stroke="#333" /><text x={450} y={95} textAnchor="middle">栅 Gate</text>
    <rect x={320} y={110} width={260} height={10} fill={COL.ox} stroke="#333" /><text x={590} y={118} fontSize="12.5">绝缘层</text>
    <rect x={320} y={120} width={260} height={80} fill={COL.si} stroke="#333" /><text x={450} y={165} textAnchor="middle">硅 Silicon</text>
  </Svg>;
}

// ---------------- 图 6.26–6.28 积累、耗尽、反型（N 型衬底） ----------------
export function MOSRegime({ mode }) {
  const acc = mode === "acc", dep = mode === "dep", inv = mode === "inv";
  const xd = acc ? 0 : dep ? 45 : 70;
  const cvPts = "380,215 400,214 420,210 440,200 455,178 468,140 480,108 495,92 520,86 650,85";
  const mark = acc ? [600, 85] : dep ? [470, 135] : [405, 212];
  return <Svg h={260} title={acc ? "积累" : dep ? "耗尽" : "反型"}>
    <text x={120} y={22} textAnchor="middle">{sv(acc ? "+V_G" : "−V_G")}</text><line x1={120} y1={28} x2={120} y2={45} stroke="#333" />
    <rect x={40} y={45} width={160} height={36} fill={COL.metal} stroke="#333" /><text x={120} y={68} textAnchor="middle">栅</text>
    <rect x={40} y={81} width={160} height={10} fill={COL.ox} stroke="#333" />
    <rect x={40} y={91} width={160} height={120} fill={COL.si} stroke="#333" /><text x={120} y={200} textAnchor="middle" fontSize="12">{sv("N 型硅，掺杂 N_D")}</text>
    {acc && <>{[55, 80, 105, 130, 155, 180].map(x => <text key={x} x={x} y={104} fontSize="13" fill={COL.blue}>e⁻</text>)}<text x={30} y={66} textAnchor="end" fontSize="12">{sv("+Q_G")}</text><text x={30} y={104} textAnchor="end" fontSize="12">{sv("−Q_A")}</text></>}
    {!acc && <><rect x={41} y={92} width={158} height={xd} fill="#e9e3d2" /><line x1={40} x2={200} y1={92 + xd} y2={92 + xd} stroke="#555" strokeDasharray="5 4" />
      {Array.from({ length: 12 }, (_, i) => <text key={i} x={50 + (i % 6) * 26} y={106 + Math.floor(i / 6) * (xd / 2.2)} fontSize="12" fill={COL.red}>+</text>)}
      <text x={30} y={66} textAnchor="end" fontSize="12">{sv("−Q_G")}</text><text x={30} y={110} textAnchor="end" fontSize="12">{sv("+Q_D")}</text>
      <text x={205} y={92 + xd} fontSize="12">{sv(inv ? "x_{Dmax}" : "x_D")}</text></>}
    {inv && <><rect x={41} y={92} width={158} height={4} fill={COL.red} /><text x={30} y={96} textAnchor="end" fontSize="12" fill={COL.red}>{sv("+Q_I")}</text></>}
    {/* 等效电路 */}
    <g transform="translate(250,70)"><line x1={0} y1={0} x2={0} y2={20} stroke="#333" /><line x1={-14} x2={14} y1={20} y2={20} stroke="#333" strokeWidth={2} /><line x1={-14} x2={14} y1={27} y2={27} stroke="#333" strokeWidth={2} /><text x={20} y={28} fontSize="12">{sv("C_{ox}")}</text>
      {acc ? <line x1={0} y1={27} x2={0} y2={70} stroke="#333" /> : <><line x1={0} y1={27} x2={0} y2={47} stroke="#333" /><line x1={-14} x2={14} y1={47} y2={47} stroke="#333" strokeWidth={2} /><line x1={-14} x2={14} y1={54} y2={54} stroke="#333" strokeWidth={2} /><text x={20} y={56} fontSize="12">{sv(inv ? "C_{Dmin}" : "C_D")}</text><line x1={0} y1={54} x2={0} y2={70} stroke="#333" /></>}</g>
    {/* C–V */}
    <line x1={370} x2={660} y1={225} y2={225} stroke="#333" /><line x1={540} x2={540} y1={60} y2={225} stroke="#333" /><text x={545} y={58} fontSize="12">C</text><text x={662} y={229} fontSize="12">{sv("V_G")}</text>
    <polyline points={cvPts} fill="none" stroke="#999" strokeWidth={2} />
    <polyline points={acc ? "540,85 650,85" : dep ? "455,178 468,140 480,108 495,92 520,86 650,85" : cvPts} fill="none" stroke={COL.ink} strokeWidth={2.5} />
    <circle cx={mark[0]} cy={mark[1]} r={6} fill={COL.red} /><text x={600} y={78} fontSize="12">{sv("C_{ox}")}</text>
    {inv && <><line x1={455} x2={455} y1={178} y2={225} stroke="#333" strokeDasharray="4 3" /><text x={455} y={243} textAnchor="middle" fontSize="12">{sv("V_{TH}")}</text><text x={378} y={206} fontSize="12">{sv("C_{min}")}</text></>}
    <text x={360} y={250} fontSize="12.5">{acc ? "积累：测得 C = C_ox" : dep ? "耗尽：C_ox 与 C_D 串联，C 下降" : "反型：x_D 钉扎于 x_Dmax，C 降到最小"}</text>
  </Svg>;
}

// ---------------- 图 6.35 SiC 氧化中的 O2 与 CO 通量 ----------------
export function SiCFlux() {
  return <Svg h={250} title="SiC 氧化中的 O2 内扩散与 CO 外扩散">
    <defs>{hatch("h635")}</defs>
    <rect x={190} y={40} width={150} height={180} fill="url(#h635)" stroke="#6a8" /><text x={265} y={210} textAnchor="middle">{sv("氧化层 SiO_2")}</text>
    <rect x={340} y={40} width={300} height={180} fill="#cfcab8" stroke="#888" /><text x={490} y={210} textAnchor="middle">碳化硅 SiC</text>
    <line x1={20} x2={340} y1={130} y2={130} stroke="#555" strokeDasharray="6 4" />
    <text x={30} y={70}>{sv("O_2")}</text><path d="M 60 66 C 140 66, 170 70, 188 85" fill="none" stroke={COL.red} strokeWidth={3} /><Arrow x1={180} y1={78} x2={190} y2={88} color={COL.red} w={3} />
    <text x={70} y={55} fontSize="12.5">{sv("F_1^{trans}")}</text>
    <Arrow x1={195} y1={90} x2={334} y2={122} color={COL.red} w={3} /><text x={240} y={92} fontSize="12.5">{sv("F_2^{diff}")}</text>
    <Arrow x1={342} y1={130} x2={380} y2={130} color={COL.ink} w={3} /><text x={385} y={126} fontSize="12.5">{sv("F_3^{react}")}</text>
    <Arrow x1={334} y1={140} x2={198} y2={176} color={COL.blue} w={3} /><text x={245} y={182} fontSize="12.5" fill={COL.blue}>{sv("F_4^{diff}")}</text>
    <path d="M 188 178 C 170 190, 120 195, 60 192" fill="none" stroke={COL.blue} strokeWidth={3} /><Arrow x1={70} y1={192} x2={52} y2={192} color={COL.blue} w={3} /><text x={22} y={196} fill={COL.blue}>CO</text><text x={80} y={215} fontSize="12.5" fill={COL.blue}>{sv("F_5^{trans}")}</text>
    <line x1={190} x2={340} y1={30} y2={30} stroke="#333" /><text x={265} y={24} textAnchor="middle" fontSize="12.5">{sv("x_o")}</text>
  </Svg>;
}
