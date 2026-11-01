// 图 11.44 的自绘分步版：第 2 章 CMOS 流程的后道部分（a–n），可前后翻页。
// 几何为示意（与原书 Athena / Victory Process 模拟的层序一致，厚度不按比例）。
import { useState } from "react";
import { assetUrl, Details, TxI } from "@kit";
import { MAT, Svg } from "./_ch11b_svg.jsx";

const GX = [170, 470];                       // 两个晶体管栅中心（左 PMOS，右 NMOS）
const CX = [110, 230, 410, 530];             // 接触孔 / 通孔中心
const TR = [[80, 140], [200, 260], [380, 440], [500, 560]];   // M1 沟槽
const Y = { sub: 300, gateTop: 260, ox1: 240, n1: 234, o2: 204, n2: 198, o3: 168 };
const CW = 22, VW = 22;

export const STEPS = [
  ["a", "前道完成", "PMOS（左）与 NMOS（右）已做好：源漏上覆盖 $\\mathrm{TiSi_{2}}$，栅为高 k 金属栅，周围是平坦化的介质。"],
  ["b", "沉积 20 nm $\\mathrm{SiO_{2}}$", "均匀覆盖整片晶圆，把栅与即将沉积的金属隔开（若已有氧化层，这一步可省）。"],
  ["c", "接触孔光刻与刻蚀", "涂胶、曝光、显影，以胶为掩模等离子体刻蚀 $\\mathrm{SiO_{2}}$，打开通向源漏硅化物的接触孔，再去胶。栅极接触在纸面之外。"],
  ["d", "TiN 粘附层 2–3 nm", "共形沉积薄 TiN，让下一步的 W 牢牢粘在 $\\mathrm{SiO_{2}}$ 上。"],
  ["e", "W 填充", "沉积 W，必须无空洞地填满接触孔并溢出到表面之上。"],
  ["f", "W 的 CMP", "化学机械抛光去掉表面的 W 与 TiN，硬的 $\\mathrm{SiO_{2}}$ 作抛光停止层；W 塞中会有轻微碟形凹陷（见第 9 章图 9.52）。"],
  ["g", "沉积双大马士革介质叠层", "依次沉积 2–3 nm $\\mathrm{Si_{3}N_{4}}$ 刻蚀停止层、20 nm $\\mathrm{SiO_{2}}$、第二层 2–3 nm $\\mathrm{Si_{3}N_{4}}$、20 nm $\\mathrm{SiO_{2}}$（有的流程在顶上再加硬掩模，见图 11.19）。"],
  ["h", "第一次光刻：通孔", "定义通孔图形，依次刻穿上层 $\\mathrm{SiO_{2}}$、上层 $\\mathrm{Si_{3}N_{4}}$、下层 $\\mathrm{SiO_{2}}$，停在底层 $\\mathrm{Si_{3}N_{4}}$ 上——底层停止层要留到下一次光刻之后。去胶。"],
  ["i", "第二次光刻：M1 沟槽", "定义第一层金属的走线图形，只刻上层 $\\mathrm{SiO_{2}}$，停在上层 $\\mathrm{Si_{3}N_{4}}$ 上。去胶。注意这次光刻是在已有通孔的起伏表面上做的。"],
  ["j", "去除裸露的 $\\mathrm{Si_{3}N_{4}}$", "不用掩模的等离子体刻蚀去掉通孔底与沟槽底的 $\\mathrm{Si_{3}N_{4}}$；它必须对 $\\mathrm{SiO_{2}}$ 有高选择比。通孔这才与下面的 W 塞接通。"],
  ["k", "TaN/Ta 阻挡层 2–4 nm", "共形沉积，必须覆盖每一个表面，防止 Cu 扩散进介质与硅（详见图 11.41）。"],
  ["l", "Cu 籽晶层", "同样必须共形，为下一步电镀提供连续的导电面（阴极）。"],
  ["m", "Cu 电镀", "以 §11.4.3 的超填充方式自下而上填满通孔与沟槽并溢出。"],
  ["n", "Cu 的 CMP", "以 $\\mathrm{SiO_{2}}$ 为停止层抛平，得到嵌在介质中的 M1 导线与通孔。整个双大马士革单元可重复多达 15 次。"],
];

function Front() {
  return <g>
    <rect x={20} y={Y.sub} width={600} height={80} fill={MAT.si} stroke="#666" strokeWidth=".8" />
    {[20, 300, 580].map(x => <rect key={x} x={x} y={Y.sub} width={40} height={60} fill={MAT.sio2} stroke="#666" strokeWidth=".8" />)}
    <rect x={20} y={Y.gateTop} width={600} height={Y.sub - Y.gateTop} fill={MAT.sio2} stroke="#666" strokeWidth=".8" />
    {GX.map(g => <g key={g}>
      <rect x={g - 34} y={Y.gateTop} width={68} height={40} fill={MAT.sin} stroke="#666" strokeWidth=".8" />
      <rect x={g - 20} y={Y.gateTop} width={40} height={40} fill={MAT.poly} stroke="#666" strokeWidth=".8" />
      <rect x={g - 16} y={Y.gateTop + 4} width={32} height={10} fill="#e8d3c4" />
      <rect x={g - 92} y={Y.sub} width={58} height={8} fill={MAT.sil} /><rect x={g + 34} y={Y.sub} width={58} height={8} fill={MAT.sil} />
      <path d={`M${g - 96},${Y.sub + 8} L${g - 96},${Y.sub + 30} Q${g - 96},${Y.sub + 42} ${g - 80},${Y.sub + 42} L${g - 30},${Y.sub + 42} L${g - 30},${Y.sub + 8}Z`} fill="#a2a2a2" />
      <path d={`M${g + 96},${Y.sub + 8} L${g + 96},${Y.sub + 30} Q${g + 96},${Y.sub + 42} ${g + 80},${Y.sub + 42} L${g + 30},${Y.sub + 42} L${g + 30},${Y.sub + 8}Z`} fill="#a2a2a2" />
    </g>)}
    <text x={GX[0]} y={Y.sub + 70} textAnchor="middle" fontSize="12">PMOS</text><text x={GX[1]} y={Y.sub + 70} textAnchor="middle" fontSize="12">NMOS</text>
  </g>;
}
// 一个"沟槽 + 通孔"空腔的外轮廓（inset：向内收缩的距离，用于画阻挡层/籽晶）
function cavity(k, d = 0, bottomN2 = true) {
  const [a, b] = TR[k], c = CX[k], tb = bottomN2 ? Y.o2 : Y.n2;
  return `M${a + d},${Y.o3} L${a + d},${tb - d} L${c - VW / 2 + d},${tb - d} L${c - VW / 2 + d},${Y.ox1 - d} L${c + VW / 2 - d},${Y.ox1 - d} L${c + VW / 2 - d},${tb - d} L${b - d},${tb - d} L${b - d},${Y.o3}`;
}
function Back({ s }) {
  const el = [];
  const L = (k, x, y, w, h, f) => el.push(<rect key={k} x={x} y={y} width={w} height={h} fill={f} stroke="#666" strokeWidth=".6" />);
  if (s >= 1) L("ox1", 20, Y.ox1, 600, Y.gateTop - Y.ox1, MAT.sio2);
  // 接触孔
  if (s >= 2) CX.forEach((c, i) => {
    el.push(<rect key={"h" + i} x={c - CW / 2} y={Y.ox1} width={CW} height={Y.sub - Y.ox1} fill="#fff" />);
    if (s >= 3) el.push(<path key={"tl" + i} d={`M${c - CW / 2 + 1.5},${Y.ox1 - (s < 5 ? 0 : 0)} L${c - CW / 2 + 1.5},${Y.sub - 1.5} L${c + CW / 2 - 1.5},${Y.sub - 1.5} L${c + CW / 2 - 1.5},${Y.ox1}`} fill="none" stroke={MAT.tin} strokeWidth="3" />);
    if (s >= 4) el.push(<rect key={"w" + i} x={c - CW / 2 + 3} y={Y.ox1} width={CW - 6} height={Y.sub - Y.ox1 - 3} fill={MAT.w} />);
  });
  if (s === 3) el.push(<line key="tintop" x1={20} x2={620} y1={Y.ox1 - 1.5} y2={Y.ox1 - 1.5} stroke={MAT.tin} strokeWidth="3" />);
  if (s === 4) { el.push(<rect key="wover" x={20} y={Y.ox1 - 18} width={600} height={18} fill={MAT.w} />); el.push(<line key="tintop" x1={20} x2={620} y1={Y.ox1 - 1.5} y2={Y.ox1 - 1.5} stroke={MAT.tin} strokeWidth="3" />); }
  if (s >= 6) {
    // 叠层；之后按步骤挖空
    L("n1", 20, Y.n1, 600, Y.ox1 - Y.n1, MAT.sin); L("o2", 20, Y.o2, 600, Y.n1 - Y.o2, MAT.sio2);
    L("n2", 20, Y.n2, 600, Y.o2 - Y.n2, MAT.sin); L("o3", 20, Y.o3, 600, Y.n2 - Y.o3, MAT.sio2);
  }
  if (s >= 7) CX.forEach((c, i) => el.push(<rect key={"v" + i} x={c - VW / 2} y={Y.o3} width={VW} height={(s >= 9 ? Y.ox1 : Y.n1) - Y.o3} fill="#fff" />));
  if (s >= 8) TR.forEach(([a, b], i) => el.push(<rect key={"t" + i} x={a} y={Y.o3} width={b - a} height={Y.n2 - Y.o3} fill="#fff" />));
  if (s >= 9) TR.forEach(([a, b], i) => el.push(<rect key={"tn" + i} x={a} y={Y.n2} width={b - a} height={Y.o2 - Y.n2} fill="#fff" />));
  // 光刻胶（示意已去除的掩模，半透明）
  if (s === 7) el.push(<g key="r7" opacity=".35">{[[20, CX[0] - VW / 2], ...CX.slice(0, 3).map((c, i) => [c + VW / 2, CX[i + 1] - VW / 2]), [CX[3] + VW / 2, 620]].map(([a, b], i) => <rect key={i} x={a} y={Y.o3 - 16} width={b - a} height={16} fill={MAT.resist} />)}</g>);
  if (s === 8) el.push(<g key="r8" opacity=".35">{[[20, TR[0][0]], [TR[0][1], TR[1][0]], [TR[1][1], TR[2][0]], [TR[2][1], TR[3][0]], [TR[3][1], 620]].map(([a, b], i) => <rect key={i} x={a} y={Y.o3 - 16} width={b - a} height={16} fill={MAT.resist} />)}</g>);
  // 阻挡层、籽晶、电镀、CMP
  if (s >= 10) TR.forEach((_, k) => {
    if (s >= 12) el.push(<path key={"cu" + k} d={cavity(k, 0) + "Z"} fill={MAT.cu} />);
    el.push(<path key={"b" + k} d={cavity(k, 1.5)} fill="none" stroke={MAT.tin} strokeWidth="3" />);
    if (s === 11) el.push(<path key={"s" + k} d={cavity(k, 4)} fill="none" stroke={MAT.cuSeed} strokeWidth="2.5" />);
  });
  if (s >= 10 && s <= 12) {
    const segs = [[20, TR[0][0]], [TR[0][1], TR[1][0]], [TR[1][1], TR[2][0]], [TR[2][1], TR[3][0]], [TR[3][1], 620]];
    if (s === 12) el.push(<rect key="ob" x={20} y={Y.o3 - 22} width={600} height={22} fill={MAT.cu} />);
    segs.forEach(([a, b], i) => { el.push(<line key={"bf" + i} x1={a} x2={b} y1={Y.o3 - 1.5} y2={Y.o3 - 1.5} stroke={MAT.tin} strokeWidth="3" />); if (s === 11) el.push(<line key={"sf" + i} x1={a} x2={b} y1={Y.o3 - 4.5} y2={Y.o3 - 4.5} stroke={MAT.cuSeed} strokeWidth="2.5" />); });
  }
  return <g>{el}</g>;
}

const LEG = [[MAT.si, "Si"], [MAT.sio2, <>SiO₂</>], [MAT.sin, <>Si₃N₄</>], [MAT.poly, "栅"], [MAT.sil, <>TiSi₂</>], [MAT.w, "W"], [MAT.tin, "TiN/TaN"], [MAT.cu, "Cu"], [MAT.resist, "光刻胶"]];
export function DamasceneStepper() {
  const [s, setS] = useState(0), [k, lab, txt] = STEPS[s];
  const b = (on) => ({ padding: "5px 12px", borderRadius: 6, border: "1px solid #bcb6a9", background: on ? "#fffdf8" : "#eee", cursor: on ? "pointer" : "default", fontSize: 14 });
  return <div style={{ background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 10, padding: 12 }}>
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <button style={b(s > 0)} disabled={s === 0} onClick={() => setS(s - 1)}>◀ 上一步</button>
      <button style={b(s < STEPS.length - 1)} disabled={s === STEPS.length - 1} onClick={() => setS(s + 1)}>下一步 ▶</button>
      <input type="range" min={0} max={STEPS.length - 1} value={s} onChange={e => setS(+e.target.value)} style={{ flex: 1, minWidth: 140 }} aria-label="工艺步骤" />
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, margin: "6px 0" }}>{STEPS.map(([kk], i) => <button key={kk} onClick={() => setS(i)} style={{ padding: "1px 7px", fontSize: 12, borderRadius: 4, border: "1px solid #ccc", background: i === s ? "#2c4a6e" : i < s ? "#dfe8f0" : "#fff", color: i === s ? "#fff" : "#333", cursor: "pointer" }}>{kk}</button>)}</div>
    <Svg h={290} title={`双大马士革后道工艺，第 ${k} 步`}>
      <g transform="translate(20,-110)"><Front /><Back s={s} /></g>
      <g>{LEG.map(([c, l], i) => <g key={i} transform={`translate(${30 + i * 70},284)`}><rect width="13" height="10" y="-9" fill={c} stroke="#777" strokeWidth=".6" /><text x="16" fontSize="11">{l}</text></g>)}</g>
      <text x={8} y={22} fontSize="18" fontWeight="600">{k})</text>
    </Svg>
    <p style={{ margin: "4px 0 0", fontSize: 14 }}><b>{k}) <TxI>{lab}</TxI></b>：<TxI>{txt}</TxI></p>
  </div>;
}

export function OriginalPanels() {
  return <Details summary="原书图 11.44 的模拟截面（a–f 与 g–n 两页）">
    <img src={assetUrl("figures/fig-11.44a.png")} alt="图 11.44 a–f" style={{ maxWidth: "100%" }} loading="lazy" />
    <img src={assetUrl("figures/fig-11.44.png")} alt="图 11.44 g–n" style={{ maxWidth: "100%" }} loading="lazy" />
  </Details>;
}
