// 第 10 章自绘插图（一）：图 10.1–10.5、10.12、10.14–10.16、10.18–10.24。示意图，按原图内容重画。
import { useState } from "react";
import { M } from "@kit";
import { Svg, Ar, Path, T, Rect, Ball, Range, C, box, chem } from "./_ch10_svg.jsx";
const R = String.raw;

// ---------- 图 10.1 外延层与功率双极晶体管 ----------
export function Fig101() {
  return <Svg title="轻掺杂外延层在重掺杂衬底上；以及利用这种结构的功率双极晶体管" h={250}>
    <Rect x={30} y={70} w={260} h={34} f="#f2f3f5" /><T x={160} y={92}>Si 外延层（轻掺杂）</T>
    <Rect x={30} y={104} w={260} h={80} f={C.siD} /><T x={160} y={150} c="#fff">Si 衬底（重掺杂）</T>
    <Ar x1={305} y1={70} x2={305} y2={104} both c="m" w={1.2} /><T x={318} y={92} a="start" it>t</T><T x={325} y={96} a="start" s={10}>epi</T>
    <T x={160} y={210} c={C.mute}>外延：气相杂质极少，掺杂可独立设定</T>
    {/* 右：功率双极 */}
    <Rect x={390} y={66} w={260} h={10} f={C.ox} />
    <Rect x={390} y={76} w={260} h={90} f="#f2f3f5" /><T x={520} y={155}>N 外延层（集电区）</T>
    <path d="M 420 76 L 420 98 Q 420 130 460 130 L 560 130 Q 600 130 600 98 L 600 76 Z" fill="#c9ccd2" stroke="#5f5a52" />
    <T x={540} y={110}>P（基区）</T>
    <path d="M 440 76 L 440 90 Q 440 104 458 104 L 492 104 Q 508 104 508 90 L 508 76 Z" fill="#e7e9ec" stroke="#5f5a52" /><T x={474} y={96} s={12}>N⁺</T>
    <Rect x={390} y={166} w={260} h={42} f={C.siD} /><T x={520} y={192} c="#fff">N⁺⁺ 衬底</T>
    <Rect x={390} y={208} w={260} h={8} f={C.metal} /><T x={520} y={236}>集电极接触</T>
    <Rect x={444} y={52} w={60} h={24} f={C.metal} /><T x={474} y={46}>发射极</T>
    <Rect x={548} y={52} w={40} h={24} f={C.metal} /><T x={568} y={46}>基极</T>
  </Svg>;
}

// ---------- 图 10.2 吸附原子迁移到扭折/台阶 ----------
export function Fig102() {
  const atoms = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6 - (r === 3 ? 2 : 0); c++) atoms.push([90 + c * 26 + r * 10, 190 - r * 22]);
  return <Svg title="SiH4 或 SiCl4 分解出的硅吸附原子在表面迁移，落到扭折、台阶处并入晶格" h={270}>
    <path d="M 40 210 L 560 210 L 620 160 L 100 160 Z" fill={C.siL} stroke="#5f5a52" />
    <path d="M 40 210 L 560 210 L 560 240 L 40 240 Z" fill={C.si} stroke="#5f5a52" />
    <T x={300} y={258} c={C.mute}>晶体硅衬底（台面）</T>
    {atoms.map(([x, y], i) => <Ball key={i} x={x} y={y} r={12} f="#7f858d" />)}
    <T x={70} y={92} a="start">已长成的晶体 Si 层</T>
    <Ball x={330} y={150} r={11} f="#5b6068" /><Ball x={385} y={130} r={11} f="#5b6068" />
    <T x={360} y={110}>Si 吸附原子</T>
    <Ball x={300} y={192} r={10} f="#7f858d" /><Ball x={321} y={192} r={10} f="#7f858d" /><T x={312} y={232} s={12} c={C.green}>表面成核</T>
    <Ar x1={318} y1={150} x2={258} y2={124} c="g" /><T x={250} y={150} s={12} c={C.green}>台阶成核</T>
    <Ar x1={372} y1={136} x2={262} y2={172} c="g" /><T x={198} y={226} s={12} c={C.green}>扭折处并入（能量最低）</T>
    <Ar x1={585} y1={60} x2={398} y2={122} /><T x={600} y={56} a="start">SiCl₄</T>
    <Ar x1={590} y1={100} x2={402} y2={130} /><T x={600} y={104} a="start">SiH₄</T>
    <Ar x1={420} y1={160} x2={520} y2={120} c="m" /><T x={530} y={124} a="start" c={C.mute}>H₂ / HCl 脱附</T>
  </Svg>;
}

// ---------- 图 10.3 APCVD 外延反应器 ----------
export function Fig103() {
  return <Svg title="常压 CVD（APCVD）外延系统示意：气源、石英管、石墨基座与射频加热线圈" h={250}>
    {["掺杂源\nPH3, B2H6", "SiCl4\n鼓泡瓶", "HCl", "Ar", "H2", "SiH4"].map((t, i) => {
      const x = 60 + i * 42; return <g key={i}><Rect x={x - 8} y={120} w={16} h={70} f={i === 1 ? C.ox : "#d7d3cb"} r={6} />
        <line x1={x} y1={120} x2={x} y2={86} stroke="#5f5a52" /><circle cx={x} cy={100} r={6} fill="#fff" stroke="#5f5a52" />
        {t.split("\n").map((s, k) => <T key={k} x={x} y={208 + k * 15} s={11}>{chem(s)}</T>)}</g>;
    })}
    <line x1={52} y1={86} x2={330} y2={86} stroke="#5f5a52" strokeWidth={4} />
    <path d="M 330 70 Q 316 105 330 140 L 600 140 Q 614 105 600 70 Z" fill="#f7fbfd" stroke="#5f5a52" />
    <Rect x={350} y={40} w={240} h={22} f="#e9e2d4" /><Rect x={350} y={148} w={240} h={22} f="#e9e2d4" />
    {Array.from({ length: 12 }, (_, i) => <g key={i}><circle cx={362 + i * 20} cy={51} r={4} fill="#fff" stroke="#8a7a5a" /><circle cx={362 + i * 20} cy={159} r={4} fill="#fff" stroke="#8a7a5a" /></g>)}
    <path d="M 360 128 L 590 116 L 590 130 L 360 132 Z" fill="#555" />
    {[0, 1, 2].map(i => <path key={i} d={`M ${380 + i * 70} ${125 - i * 3.5} l 46 -3 l 0 -5 l -46 3 z`} fill={C.si} stroke="#444" />)}
    <T x={470} y={190}>射频加热线圈</T><T x={470} y={32}>石英管（"温壁"）</T>
    <T x={640} y={100} a="end" s={12}>尾气 →</T>
    <T x={470} y={212} s={12} c={C.mute}>石墨基座（被感应加热）上倾斜放置晶圆</T>
  </Svg>;
}

// ---------- 图 10.4 两个通量 ----------
export function Fig104() {
  return <Svg title="CVD 中的气相输运通量 F1 与表面反应通量 F2，以及边界层" h={240}>
    <line x1={150} y1={30} x2={150} y2={200} stroke={C.mute} strokeDasharray="6 4" />
    <Rect x={330} y={30} w={140} h={170} f="#eef0f2" /><Rect x={470} y={30} w={150} h={170} f={C.si} />
    <T x={400} y={190}>Si 外延层</T><T x={545} y={190}>Si 衬底</T>
    <line x1={150} y1={80} x2={330} y2={150} stroke={C.ink} strokeWidth={2.2} />
    <T x={136} y={84} a="end" it>C<tspan fontSize="10" dy="3">G</tspan></T><T x={340} y={154} a="start" it>C<tspan fontSize="10" dy="3">S</tspan></T>
    <Ar x1={160} y1={60} x2={322} y2={60} c="b" w={2.2} /><T x={240} y={50} c={C.blue} it>F<tspan fontSize="10" dy="3">1</tspan>=h<tspan fontSize="10" dy="3">G</tspan><tspan dy="-3">(C</tspan><tspan fontSize="10" dy="3">G</tspan><tspan dy="-3">−C</tspan><tspan fontSize="10" dy="3">S</tspan><tspan dy="-3">)</tspan></T>
    <Ar x1={270} y1={175} x2={326} y2={175} c="r" w={2.2} /><T x={232} y={170} c={C.red} it>F<tspan fontSize="10" dy="3">2</tspan><tspan dy="-3">=k</tspan><tspan fontSize="10" dy="3">S</tspan><tspan dy="-3">C</tspan><tspan fontSize="10" dy="3">S</tspan></T>
    <Ar x1={155} y1={22} x2={325} y2={22} both c="m" w={1.2} /><T x={240} y={16} s={12} c={C.mute}>边界层</T>
    <T x={150} y={222} it>y = δ</T><T x={330} y={222} it>y = 0</T>
  </Svg>;
}

// ---------- 图 10.5 交互：两种控制区的浓度分布 ----------
export function Fig105() {
  const [lr, setLr] = useState(-1.5);            // log10(k_S/h_G)
  const r = 10 ** lr, cs = 1 / (1 + r);           // 式 (10.4)
  const yG = 60, y0 = 190, yS = y0 - (y0 - yG) * cs;
  const regime = r < 0.1 ? "表面反应控制区" : r > 10 ? "质量输运控制区" : "混合区";
  return <div style={box}>
    <Svg title="边界层内反应物浓度分布随 kS/hG 变化" h={230}>
      <line x1={140} y1={40} x2={140} y2={200} stroke={C.mute} strokeDasharray="6 4" />
      <Rect x={360} y={40} w={120} h={160} f="#eef0f2" /><Rect x={480} y={40} w={150} h={160} f={C.si} />
      <T x={420} y={190}>Si 外延层</T><T x={555} y={190}>Si 衬底</T>
      <line x1={140} y1={yG} x2={360} y2={yS} stroke={C.red} strokeWidth={3} />
      <circle cx={360} cy={yS} r={4} fill={C.red} />
      <T x={126} y={yG + 5} a="end" it>C<tspan fontSize="10" dy="3">G</tspan></T>
      <T x={368} y={yS + 5} a="start" it>C<tspan fontSize="10" dy="3">S</tspan></T>
      <line x1={360} y1={y0} x2={360} y2={yG} stroke="#ccc" strokeDasharray="2 3" />
      <T x={140} y={222} it>y = δ</T><T x={360} y={222} it>y = 0</T>
      <T x={250} y={30} b>{regime}</T>
    </Svg>
    <Range label={<M>{R`\lg(k_S/h_G)`}</M>} value={lr} set={setLr} min={-3} max={3} step={0.05} fmt={v => v.toFixed(2)} />
    <p style={{ fontSize: 14, margin: "4px 0" }}><M>{R`C_S/C_G=(1+k_S/h_G)^{-1}=${cs.toFixed(3)}`}</M>；沉积速率占其上限 <M>{R`h_GC_G/N`}</M> 的比例 <M>{R`=${(r / (1 + r)).toFixed(3)}`}</M>。左移滑块（降温，<M>{R`k_S`}</M> 按指数下降）：边界层两侧几乎没有浓度差；右移（升温）：表面浓度趋于零，供料跟不上。</p>
  </div>;
}

// ---------- 图 10.12 应变与弛豫 ----------
function Lattice({ x0, y0, nx, ny, dx, dy, r, f, s, skip = [] }) {
  const out = [];
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    if (skip.some(([a, b]) => a === i && b === j)) continue;
    const x = x0 + i * dx, y = y0 - j * dy;
    if (i < nx - 1) out.push(<line key={`h${i}-${j}`} x1={x} y1={y} x2={x + dx} y2={y} stroke="#666" />);
    if (j < ny - 1) out.push(<line key={`v${i}-${j}`} x1={x} y1={y} x2={x} y2={y - dy} stroke="#666" />);
    out.push(<circle key={`c${i}-${j}`} cx={x} cy={y} r={r} fill={f} stroke={s} strokeWidth={0.8} />);
  }
  return <g>{out}</g>;
}
export function Fig1012() {
  return <Svg title="薄于临界厚度时外延层被拉成衬底晶格（应变）；超过临界厚度后通过失配位错弛豫" h={270}>
    <T x={130} y={22} b>厚度 &lt; h<tspan baselineShift="sub" fontSize="70%">c</tspan>：共格、应变</T>
    <Lattice x0={40} y0={240} nx={8} ny={5} dx={26} dy={24} r={7} f="#8a9099" s="#4b4f55" />
    <Lattice x0={40} y0={120} nx={8} ny={3} dx={26} dy={30} r={9} f={C.ge} s="#7d6a3a" />
    <T x={130} y={262} s={12} c={C.mute}>横向间距被压到衬底值，竖向拉长</T>
    <T x={480} y={22} b>厚度 &gt; h<tspan baselineShift="sub" fontSize="70%">c</tspan>：弛豫 + 失配位错</T>
    <Lattice x0={340} y0={240} nx={12} ny={5} dx={26} dy={24} r={7} f="#8a9099" s="#4b4f55" />
    <Lattice x0={340} y0={120} nx={11} ny={4} dx={28.6} dy={28} r={9} f={C.ge} s="#7d6a3a" />
    {[[400, 128], [545, 128]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={17} fill="none" stroke={C.red} strokeWidth={2.2} strokeDasharray="4 3" />)}
    <T x={480} y={262} s={12} c={C.mute}>上层恢复本征晶格常数；界面处多出的半原子面 = 位错（红圈）</T>
  </Svg>;
}

// ---------- 图 10.14 反相畴界 ----------
export function Fig1014() {
  const cells = [];
  for (let i = 0; i < 12; i++) for (let j = 0; j < 4; j++) {
    const left = i < 6, x = 60 + i * 44, y = 70 + j * 34;
    const ga = (i + j) % 2 === (left ? 0 : 1);   // 右侧畴 Ga/As 次序互换
    cells.push(<circle key={`${i}-${j}`} cx={x} cy={y} r={11} fill={ga ? "#c9a3d6" : "#7fb07a"} stroke="#555" />);
  }
  return <Svg title="在 Ge 衬底上生长 GaAs：两个畴的 Ga/As 次序相反，交界处形成反相畴界" h={260}>
    {cells}
    {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={60 + i * 44} cy={210} r={11} fill={C.ge} stroke="#7d6a3a" />)}
    {Array.from({ length: 12 }, (_, i) => <circle key={`b${i}`} cx={60 + i * 44} cy={240} r={11} fill={C.ge} stroke="#7d6a3a" />)}
    <line x1={302} y1={50} x2={302} y2={190} stroke={C.red} strokeWidth={3} strokeDasharray="7 4" />
    <T x={310} y={40} a="start" c={C.red}>反相畴界（Ga–Ga / As–As 错键）</T>
    <T x={630} y={225} a="start" s={12}>Ge</T>
    <circle cx={590} cy={30} r={8} fill="#c9a3d6" stroke="#555" /><T x={604} y={35} a="start">Ga</T>
    <circle cx={640} cy={30} r={8} fill="#7fb07a" stroke="#555" /><T x={654} y={35} a="start">As</T>
  </Svg>;
}

// ---------- 图 10.15 Si 上的 GaN 器件叠层 ----------
export function Fig1015() {
  const L = [["AlGaN 势垒", "#c7b9e6", 16], ["GaN 有源层", C.gaN, 30], ["GaN 缓冲层 2", "#b9aed6", 24], ["GaN 缓冲层 1", "#c5bcdc", 24], ["AlGaN 渐变层", "#d6cdea", 24], ["AlN 成核/阻挡层", "#e5d9c3", 14], ["Si 衬底 (111)", C.si, 50]];
  let y = 60;
  return <Svg title="Si 上 GaN 异质外延的层结构：成核层、渐变层与多层缓冲层，最上面是 AlGaN/GaN 器件层" h={270}>
    {L.map(([t, f, h], i) => { const r = <g key={i}><Rect x={60} y={y} w={300} h={h} f={f} /><T x={210} y={y + h / 2 + 5} s={12}>{t}</T></g>; y += h; return r; })}
    {[["源", 70], ["栅", 190], ["漏", 300]].map(([t, x]) => <g key={t}><Rect x={x} y={42} w={50} h={18} f={C.metal} /><T x={x + 25} y={36} s={12}>{t}</T></g>)}
    {/* 右：缺陷示意 */}
    <Rect x={420} y={60} w={220} h={70} f={C.gaN} /><Rect x={420} y={130} w={220} h={50} f="#c5bcdc" /><Rect x={420} y={180} w={220} h={60} f={C.si} />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={432 + i * 24} y1={180} x2={444 + i * 24 + (i % 2 ? -10 : 10)} y2={135 + (i % 3) * 6} stroke={C.red} strokeWidth={1.5} />)}
    {[470, 560].map(x => <line key={x} x1={x} y1={130} x2={x + 6} y2={70} stroke={C.red} strokeWidth={1.5} />)}
    <T x={530} y={100} s={12}>GaN 有源层</T><T x={530} y={160} s={12}>GaN 缓冲层（已弛豫）</T><T x={530} y={215} s={12}>Si 衬底</T>
    <T x={530} y={258} s={12} c={C.mute}>大多数穿透位错止于缓冲层，少数穿入有源层</T>
  </Svg>;
}

// ---------- 图 10.16 外延横向过生长 ----------
export function Fig1016() {
  return <Svg title="外延横向过生长（ELO）：窄窗口内籽晶生长，越过掩模的翼区几乎无位错" h={260}>
    <Rect x={40} y={200} w={600} h={40} f={C.si} /><T x={340} y={226}>硅衬底</T>
    <Rect x={40} y={170} w={600} h={30} f="#c6b8a0" /><T x={600} y={190} s={12}>III-V 籽晶层</T>
    <Rect x={40} y={150} w={250} h={20} f={C.ox} /><Rect x={390} y={150} w={250} h={20} f={C.ox} /><T x={140} y={165} s={12}>掩模（SiO₂）</T>
    <path d="M 290 170 L 290 120 Q 290 80 250 80 L 160 80 Q 120 80 120 100 L 120 150 L 290 150 Z" fill={C.gaN} stroke="#5f5a52" />
    <path d="M 390 170 L 390 120 Q 390 80 430 80 L 520 80 Q 560 80 560 100 L 560 150 L 390 150 Z" fill={C.gaN} stroke="#5f5a52" />
    <Rect x={290} y={80} w={100} h={90} f="#9488bb" s="#5f5a52" />
    {[300, 318, 336, 354, 372].map((x, i) => <line key={i} x1={x} y1={195} x2={x + (i - 2) * 6} y2={95 + Math.abs(i - 2) * 12} stroke={C.red} strokeWidth={1.6} />)}
    {[60, 110, 200, 470, 560, 610].map((x, i) => <line key={`m${i}`} x1={x} y1={198} x2={x + 14} y2={172} stroke={C.red} strokeWidth={1.6} />)}
    <T x={200} y={70}>ELO 翼区</T><T x={480} y={70}>ELO 翼区</T>
    <T x={200} y={118} s={12} c={C.green}>无缺陷区</T><T x={480} y={118} s={12} c={C.green}>无缺陷区</T>
    <T x={340} y={40} c={C.red}>穿透位错被困在窗口上方与掩模下</T>
  </Svg>;
}

// ---------- 图 10.18 立式 LPCVD 炉 ----------
export function Fig1018() {
  return <Svg title="立式 LPCVD 炉：晶圆紧密叠放，多区电阻加热，真空泵抽气" h={290}>
    <path d="M 230 250 L 230 80 Q 230 40 290 40 Q 350 40 350 80 L 350 250" fill="#f7fbfd" stroke="#5f5a52" strokeWidth={1.5} />
    <path d="M 210 255 L 210 75 Q 210 22 290 22 Q 370 22 370 75 L 370 255" fill="none" stroke="#c98a5a" strokeWidth={6} opacity={0.6} />
    <line x1={290} y1={22} x2={290} y2={2} stroke="#5f5a52" strokeWidth={3} /><T x={300} y={14} a="start" s={12}>进气</T>
    {Array.from({ length: 14 }, (_, i) => <Rect key={i} x={250} y={68 + i * 12} w={80} h={4} f={C.si} s="#555" sw={0.6} />)}
    <line x1={248} y1={64} x2={248} y2={240} stroke="#555" /><line x1={332} y1={64} x2={332} y2={240} stroke="#555" />
    <Rect x={244} y={240} w={92} h={8} f="#333" /><Rect x={280} y={248} w={20} h={36} f="#333" />
    <T x={170} y={150} a="end">晶圆（间距约几 mm）</T><Ar x1={175} y1={146} x2={248} y2={140} />
    <T x={400} y={120} a="start">多区电阻加热炉</T><Ar x1={398} y1={116} x2={372} y2={116} />
    <T x={200} y={278} a="end">升降台</T>
    <path d="M 350 245 L 420 245 L 420 262 L 470 262" fill="none" stroke="#5f5a52" strokeWidth={3} />
    <Rect x={470} y={246} w={60} h={32} f="#c9c6c0" /><T x={500} y={238}>真空泵</T><T x={590} y={267}>→ 尾气</T>
  </Svg>;
}

// ---------- 图 10.19 TMG + AsH3 → GaAs + 3CH4 ----------
function Methyl({ x, y }) { return <g><Ball x={x} y={y} r={8} f="#555a60" />{[[-9, -6], [9, -6], [0, 10]].map(([a, b], i) => <Ball key={i} x={x + a} y={y + b} r={3.5} f="#eee" s="#888" />)}</g>; }
export function Fig1019() {
  return <Svg title="三甲基镓与砷烷在热衬底上热解生成 GaAs 与甲烷" h={210}>
    <Ar x1={60} y1={24} x2={300} y2={24} /><T x={180} y={16} s={12}>H₂ / N₂ 载气</T>
    <Ball x={90} y={100} r={18} f="#c0c4c9" /><Methyl x={66} y={78} /><Methyl x={116} y={80} /><Methyl x={90} y={128} />
    <T x={130} y={140} a="start" s={12}>Ga</T>
    <T x={170} y={108} s={26}>+</T>
    <Ball x={225} y={100} r={14} f="#d6d9dc" />{[[-14, 12], [14, 12], [0, -16]].map(([a, b], i) => <Ball key={i} x={225 + a} y={100 + b} r={4} f="#eee" s="#888" />)}
    <T x={250} y={82} a="start" s={12}>As</T>
    <T x={300} y={108} s={26}>→</T>
    {[[350, 112], [380, 112], [410, 112], [365, 86], [395, 86]].map(([x, y], i) => <Ball key={i} x={x} y={y} r={15} f={i % 2 ? "#a7abb0" : "#d6d9dc"} />)}
    <T x={460} y={108} s={26}>+</T>
    {[[505, 90], [545, 120], [585, 84]].map(([x, y], i) => <Methyl key={i} x={x} y={y} />)}
    <T x={90} y={185}>三甲基镓</T><T x={170} y={185}>+</T><T x={225} y={185}>砷烷</T><T x={300} y={185}>→</T><T x={380} y={185}>GaAs</T><T x={460} y={185}>+</T><T x={545} y={185}>3 CH₄</T>
  </Svg>;
}

// ---------- 图 10.20 理想 MOCVD 前驱体 ----------
export function Fig1020() {
  const P = ["易挥发", "有稳定的温度窗口", "合成便宜", "热解迅速", "纯度高", "无危险"];
  return <Svg title="理想 MOCVD 前驱体应具备的六项性质" h={250}>
    <circle cx={340} cy={125} r={52} fill="#f3eadb" stroke="#8a7a5a" /><T x={340} y={120} b>理想 MOCVD</T><T x={340} y={140} b>前驱体</T>
    {P.map((t, i) => { const a = -Math.PI / 2 + i * Math.PI / 3, x = 340 + 175 * Math.cos(a), y = 125 + 92 * Math.sin(a);
      return <g key={i}><line x1={340 + 54 * Math.cos(a)} y1={125 + 54 * Math.sin(a)} x2={x - 40 * Math.cos(a)} y2={y - 16 * Math.sin(a)} stroke="#8a7a5a" />
        <ellipse cx={x} cy={y} rx={72} ry={20} fill="#fffdf8" stroke="#8a7a5a" /><T x={x} y={y + 5} s={13}>{t}</T></g>; })}
  </Svg>;
}

// ---------- 图 10.21 立式 MOCVD 反应器 ----------
export function Fig1021() {
  return <Svg title="立式（喷淋头）MOCVD 反应器与旋转基座上形成的均匀边界层" h={270}>
    <path d="M 60 40 L 300 40 L 300 230 L 60 230 Z" fill="#f7fbfd" stroke="#5f5a52" />
    <line x1={180} y1={10} x2={180} y2={40} stroke="#5f5a52" strokeWidth={4} /><T x={190} y={22} a="start" s={12}>反应气体</T>
    <line x1={80} y1={70} x2={280} y2={70} stroke="#5f5a52" strokeWidth={3} strokeDasharray="10 6" /><T x={290} y={66} a="start" s={12}>挡板 / 喷淋头</T>
    {[100, 140, 180, 220, 260].map(x => <Ar key={x} x1={x} y1={78} x2={x} y2={140} c="b" w={1.2} />)}
    <Rect x={95} y={150} w={170} h={20} f="#555" /><Rect x={120} y={144} w={120} h={6} f={C.si} s="#444" />
    <line x1={180} y1={170} x2={180} y2={225} stroke="#555" strokeWidth={5} />
    <Path d="M 160 212 A 22 8 0 1 0 200 212" c="m" w={1.2} /><T x={210} y={222} a="start" s={12}>旋转</T>
    {[0, 1, 2].map(i => <circle key={i} cx={110 + i * 70} cy={186} r={6} fill="none" stroke="#c98a5a" strokeWidth={2} />)}<T x={70} y={204} a="start" s={11}>射频线圈</T>
    <T x={290} y={246} a="end" s={12}>→ 尾气</T>
    {/* 右：边界层发展 */}
    <Rect x={380} y={200} w={260} h={16} f="#555" /><T x={510} y={236}>基座</T>
    <path d="M 380 200 Q 420 150 470 140 L 640 140" fill="none" stroke={C.red} strokeWidth={2} strokeDasharray="6 4" />
    <T x={560} y={132} s={12} c={C.red}>均匀边界层 δ</T>
    {[160, 175, 190].map(y => <Ar key={y} x1={390} y1={y - 60} x2={630} y2={y - 60} c="m" w={1} />)}
    <T x={420} y={92} s={12} c={C.mute}>气流</T>
    <Ar x1={600} y1={145} x2={600} y2={198} both c="r" w={1.2} />
  </Svg>;
}

// ---------- 图 10.22 平行板 PECVD ----------
export function Fig1022() {
  return <Svg title="平行板等离子体增强 CVD：上电极接射频，晶圆放在下电极上，SiH4 与 O2 等气体通入" h={250}>
    <Rect x={150} y={30} w={380} h={200} f="#f7f6f2" r={10} />
    <Rect x={200} y={60} w={280} h={14} f="#777" /><T x={340} y={52} s={12}>电极</T>
    <line x1={340} y1={30} x2={340} y2={10} stroke="#5f5a52" strokeWidth={2} /><T x={350} y={16} a="start" s={12}>射频功率输入</T>
    <Rect x={200} y={84} w={280} h={88} f={C.plasma} /><T x={340} y={132}>等离子体（自由基 + 离子）</T>
    <Rect x={200} y={182} w={280} h={14} f="#777" /><Rect x={250} y={174} w={180} h={8} f={C.si} />
    <T x={340} y={214} s={12}>晶圆（下电极，接地，加热 300–400 °C）</T>
    <Ar x1={60} y1={130} x2={148} y2={130} /><T x={60} y={116} a="start" s={12}>气体入口</T><T x={60} y={152} a="start" s={12}>(SiH₄, O₂)</T>
    <Ar x1={532} y1={130} x2={620} y2={130} /><T x={620} y={116} a="end" s={12}>气体出口</T>
  </Svg>;
}

// ---------- 图 10.23 远程高密度 PECVD ----------
export function Fig1023() {
  return <Svg title="远程高密度 PECVD：O2 在远离晶圆的 ICP 区被激发，SiH4 在晶圆附近引入" h={270}>
    <Rect x={200} y={20} w={260} h={220} f="#fbfaf6" />
    <Rect x={220} y={30} w={220} h={70} f={C.plasma} /><T x={330} y={70}>O⁺, O*, e⁻</T>
    <line x1={200} y1={140} x2={460} y2={140} stroke="#333" strokeDasharray="7 4" />
    {[270, 300, 330, 360, 390].map(x => <Ar key={x} x1={x} y1={104} x2={x} y2={180} c="k" w={1.3} />)}
    <Rect x={260} y={190} w={140} h={10} f={C.si} /><Rect x={240} y={200} w={180} h={10} f="#777" />
    <Ar x1={120} y1={60} x2={198} y2={60} w={3} /><T x={110} y={65} a="end">O₂</T>
    <Ar x1={120} y1={170} x2={198} y2={170} w={3} /><T x={110} y={175} a="end">SiH₄ + Ar</T>
    <T x={480} y={60} a="start">ICP 激发区</T><T x={480} y={145} a="start">控制电极</T><T x={480} y={200} a="start">反应与沉积</T>
    <line x1={230} y1={240} x2={230} y2={262} stroke="#5f5a52" strokeWidth={3} /><T x={240} y={258} a="start" s={12}>接泵</T>
  </Svg>;
}

// ---------- 图 10.24 沟槽填充：空洞 vs 斜壁 / HDP ----------
function Fill({ x, y, w = 60, d = 70, taper = 0, t = 7, bulge = 0, layers = 2, void_ }) {
  const L = [];
  const outline = (o) => `M ${x - 50} ${y - o} L ${x + taper - o * 0.2} ${y - o} L ${x + taper * 0.4} ${y + d - o} L ${x + w - taper * 0.4} ${y + d - o} L ${x + w - taper + o * 0.2} ${y - o} L ${x + w + 50} ${y - o}`;
  L.push(<path key="s" d={outline(0)} fill="none" stroke="#666" strokeWidth={2} />);
  for (let k = 1; k <= layers; k++) L.push(<path key={k} d={outline(k * t)} fill="none" stroke={C.ink} strokeWidth={2} />);
  if (bulge) [x + taper, x + w - taper].forEach((cx, i) => L.push(<circle key={`b${i}`} cx={cx + (i ? 4 : -4)} cy={y - layers * t + 2} r={bulge} fill="none" stroke={C.ink} strokeWidth={2} />));
  if (void_) L.push(<path key="v" d={`M ${x + w / 2 - 7} ${y + d - 14} L ${x + w / 2} ${y + 6} L ${x + w / 2 + 7} ${y + d - 14} Z`} fill="#fff" stroke={C.red} strokeWidth={1.5} />);
  return <g>{L}</g>;
}
export function Fig1024() {
  return <Svg title="普通 PECVD 在拐角处形成鼓包并封口留下空洞；改用斜壁或高密度 PECVD（边沉积边溅射拐角）可无空洞填充" h={300}>
    <Fill x={60} y={110} layers={0} />
    <Ar x1={185} y1={140} x2={225} y2={140} c="m" w={4} />
    <Fill x={270} y={110} layers={2} bulge={7} void_ /><T x={300} y={70} c={C.red}>空洞</T><Ar x1={300} y1={76} x2={300} y2={104} c="r" />
    <Ar x1={390} y1={110} x2={430} y2={80} c="m" w={4} /><Ar x1={390} y1={170} x2={430} y2={200} c="m" w={4} />
    <Fill x={500} y={40} taper={14} layers={2} /><T x={630} y={110} a="end" s={12}>侧壁略带斜度</T>
    <Fill x={500} y={190} layers={2} /><T x={630} y={290} a="end" s={12}>HD-PECVD（拐角溅射）</T>
  </Svg>;
}
