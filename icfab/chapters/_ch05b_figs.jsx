// 第 5 章（下）自绘插图（SVG）。原书示意图按原意重画；能计算的（图 5.46、5.50、5.66）直接用模型算出。
import { useState } from "react";
import { StepThrough, Seg } from "@kit";
import * as P from "./_ch05b_phys.jsx";
import { TxI } from "@kit";
import { COL, Svg, Txt, Arrow, Lens, Hatch, Row, TexSvg } from "./_ch05b_kit.jsx";
const R = String.raw;

// ---------- 公共小件 ----------
const Source = ({ x, y }) => <g><circle cx={x} cy={y} r={9} fill="#f6d365" stroke={COL.ink} /><Txt x={x} y={y + 30} s={12}>光源</Txt></g>;
const Beam = ({ pts, op = 0.25, c = "#f2c94c" }) => <polygon points={pts.map(p => p.join(",")).join(" ")} fill={c} opacity={op} />;
function MaskV({ x, y, h = 110, gaps = [[0.3, 0.42], [0.58, 0.7]], label = "掩模" }) {
  const segs = []; let last = 0;
  [...gaps, [1, 1]].forEach(([a, b], i) => { if (a > last) segs.push(<rect key={i} x={x} y={y - h / 2 + last * h} width={6} height={(a - last) * h} fill={COL.chrome} />); last = b; });
  return <g><rect x={x - 3} y={y - h / 2} width={3} height={h} fill={COL.quartz} stroke="#999" />{segs}<Txt x={x} y={y - h / 2 - 8} s={12}>{label}</Txt></g>;
}
const Wafer = ({ x, y, h = 120, label = "涂胶晶圆" }) => <g><rect x={x} y={y - h / 2} width={5} height={h} fill={COL.pr} /><rect x={x + 5} y={y - h / 2} width={34} height={h} fill={COL.si} /><Txt x={x + 20} y={y - h / 2 - 8} s={12}>{label}</Txt></g>;

// 图 5.31：衍射区域
export function Fig531() {
  return <Svg h={260} title="平面波通过宽 W 的狭缝后，按距离 z 划分的三个衍射近似区">
    {[0, 1, 2, 3, 4, 5].map(i => <line key={i} x1={30 + i * 8} y1={40} x2={30 + i * 8} y2={220} stroke="#4a78a8" strokeWidth={1.5} />)}
    <Arrow x1={30} y1={130} x2={92} y2={130} c="#4a78a8" /><Txt x={50} y={245} s={12}>入射平面波</Txt>
    <rect x={110} y={30} width={7} height={80} fill={COL.chrome} /><rect x={110} y={150} width={7} height={80} fill={COL.chrome} />
    <line x1={100} y1={110} x2={100} y2={150} stroke={COL.ink} /><Txt x={92} y={135} a="end" s={13}>W</Txt>
    <path d="M117,110 Q160,100 660,30 L660,230 Q160,160 117,150 Z" fill="#f2c94c" opacity={0.18} />
    {[[200, "Kirchhoff 区", R`z>\lambda/2,\ W>\lambda`, "需解完整波动方程"], [380, "Fresnel 区（近场）", R`z\gg W`, "接近式/接触式曝光"], [560, "Fraunhofer 区（远场）", R`z\gg\pi W^2/\lambda`, "投影式曝光"]].map(([x, a, b, c]) =>
      <g key={x}><Txt x={x} y={120} w={600}>{a}</Txt><TexSvg x={x} y={140} tex={b} s={12} /><Txt x={x} y={166} s={11} c={COL.muted}>{c}</Txt></g>)}
    <line x1={290} y1={60} x2={290} y2={200} stroke="#bbb" strokeDasharray="4 4" /><line x1={470} y1={60} x2={470} y2={200} stroke="#bbb" strokeDasharray="4 4" />
    <Arrow x1={120} y1={250} x2={660} y2={250} c="#888" w={1} /><Txt x={668} y={254} a="start" s={12}>z</Txt>
  </Svg>;
}

// 图 5.32：通用投影光刻系统
export function Fig532({ math = false }) {
  return <Svg h={280} title="投影光刻系统：光源、聚光镜、掩模、入瞳、物镜、晶圆">
    <Beam pts={[[50, 140], [160, 80], [160, 200]]} /><Beam pts={[[160, 80], [250, 85], [250, 195], [160, 200]]} />
    <Beam pts={[[256, 140], [440, 45], [470, 60], [470, 220], [440, 235]]} op={0.18} />
    <Beam pts={[[470, 60], [590, 140], [470, 220]]} op={0.28} />
    <Source x={50} y={140} /><Lens x={160} y={140} h={130} /><Txt x={160} y={65} s={12}>聚光镜</Txt>
    <MaskV x={252} y={140} /><Txt x={252} y={225} s={11}>x₁y₁ 平面</Txt>
    <line x1={400} y1={40} x2={400} y2={85} stroke={COL.ink} strokeWidth={3} /><line x1={400} y1={195} x2={400} y2={240} stroke={COL.ink} strokeWidth={3} />
    <Txt x={400} y={30} s={12}>入瞳（光阑）</Txt><Txt x={400} y={258} s={11}>x′y′ 平面</Txt>
    <Lens x={470} y={140} h={170} w={26} /><Txt x={505} y={40} s={12}>物镜（投影镜头）</Txt>
    <Wafer x={590} y={140} /><Txt x={600} y={225} s={11}>xy 平面（像面）</Txt>
    <line x1={256} y1={140} x2={590} y2={140} stroke="#888" strokeDasharray="5 4" />
    <line x1={256} y1={140} x2={470} y2={60} stroke={COL.red} strokeDasharray="4 3" /><Txt x={330} y={128} s={13} c={COL.red}>α</Txt>
    <line x1={470} y1={60} x2={590} y2={140} stroke={COL.red} strokeDasharray="4 3" /><Txt x={555} y={128} s={13} c={COL.red}>α_w</Txt>
    {math && <g fontSize={11}>
      <TexSvg x={252} y={272} w={110} s={11} c={COL.blue} tex={R`t(x_1,y_1)`} />
      <TexSvg x={365} y={272} w={120} s={11} c={COL.blue} tex={R`\mathcal F\{t\}`} />
      <TexSvg x={505} y={272} w={120} s={11} c={COL.blue} tex={R`\mathcal F^{-1}\{\mathcal EP\}`} />
      <TexSvg x={625} y={272} w={90} s={11} c={COL.blue} tex={R`I_{\rm i}=|\mathcal E|^2`} /></g>}
  </Svg>;
}
// 图 5.34：把系统的每一级对应到一个数学运算
export function Fig534() {
  const box = (x, t1, t2, c) => <g><rect x={x} y={150} width={118} height={70} rx={8} fill={c} stroke={COL.ink} /><Txt x={x + 59} y={178} s={13} w={600}>{t1}</Txt><TexSvg x={x + 59} y={200} w={116} tex={t2} s={11} /></g>;
  return <div><Fig532 math />
    <Svg h={240} title="投影曝光系统的数学模型链">
      {box(10, "掩模透过率", R`t(x_1,y_1)\ \ (5.20)`, "#f3f3f3")}{box(145, "远场衍射", R`\mathcal E=\mathcal F\{t\}\ \ (5.23)`, "#fdf2d0")}
      {box(280, "光瞳低通", R`\times P(f_x,f_y)\ \ (5.25)`, "#e3eef8")}{box(415, "透镜逆变换", R`\mathcal F^{-1}\{\mathcal EP\}\ \ (5.27)`, "#e8f4e8")}{box(550, "光强 = 空间像", R`I_{\rm i}=|\mathcal E|^2\ \ (5.28)`, "#f1e8fa")}
      {[128, 263, 398, 533].map(x => <Arrow key={x} x1={x} y1={185} x2={x + 16} y2={185} />)}
      <Txt x={340} y={60} s={13}>斜入射（式 5.29）：把频谱平移 sinθ/λ 后再乘 P</Txt>
      <Txt x={340} y={84} s={13}>部分相干（式 5.31）：对光源上每个点源各走一遍，按 S 加权把光强相加</Txt>
      <Txt x={340} y={108} s={13}>离焦与像差：在光瞳上乘一个相位因子</Txt>
      <Arrow x1={340} y1={115} x2={340} y2={146} c="#888" />
    </Svg></div>;
}
// 图 5.35：Optolith 的系统模型（Köhler 照明 + 双远心投影）
export function Fig535() {
  return <Svg h={200} title="仿真器中的光刻系统模型：光源、聚光镜、掩模、两组投影透镜、孔径光阑、像面">
    <line x1={30} y1={100} x2={660} y2={100} stroke="#999" strokeDasharray="8 4 2 4" />
    <Source x={40} y={100} /><Lens x={140} y={100} h={110} /><Txt x={140} y={35} s={12}>聚光镜</Txt>
    <line x1={220} y1={30} x2={220} y2={170} stroke={COL.ink} strokeDasharray="4 3" /><Txt x={220} y={22} s={12}>掩模</Txt>
    <Lens x={330} y={100} h={120} /><Lens x={490} y={100} h={120} /><Txt x={330} y={30} s={12}>投影透镜 1</Txt><Txt x={490} y={30} s={12}>投影透镜 2</Txt>
    <line x1={410} y1={30} x2={410} y2={78} stroke={COL.ink} strokeWidth={3} /><line x1={410} y1={122} x2={410} y2={170} stroke={COL.ink} strokeWidth={3} /><Txt x={410} y={188} s={12}>孔径光阑（决定 NA）</Txt>
    <line x1={600} y1={40} x2={600} y2={160} stroke={COL.pr} strokeWidth={4} /><Txt x={600} y={30} s={12}>像面</Txt>
    {[-1, 1].map(s => <g key={s}><line x1={220} y1={100} x2={330} y2={100 + s * 50} stroke={COL.red} /><line x1={330} y1={100 + s * 50} x2={490} y2={100 - s * 50} stroke={COL.red} /><line x1={490} y1={100 - s * 50} x2={600} y2={100} stroke={COL.red} /></g>)}
    <line x1={140} y1={45} x2={220} y2={100} stroke="#d39e00" /><line x1={140} y1={155} x2={220} y2={100} stroke="#d39e00" />
  </Svg>;
}
// 图 5.40：EUV 反射掩模
export function Fig540() {
  const layers = Array.from({ length: 16 }, (_, i) => i);
  return <Svg h={300} title="EUV 掩模截面：低热膨胀基板、Mo/Si 多层反射镜、Ru 帽层、吸收体与抗反射层，入射角 6 度">
    <rect x={60} y={230} width={380} height={50} fill="#cfcfcf" /><rect x={60} y={280} width={380} height={8} fill="#777" />
    {layers.map(i => <rect key={i} x={60} y={150 + i * 5} width={380} height={5} fill={i % 2 ? "#8c9aa8" : "#5b6673"} />)}
    <rect x={60} y={145} width={380} height={5} fill="#b07a4a" />
    {[[90, 190], [330, 420]].map(([a, b], k) => <g key={k}><rect x={a} y={110} width={b - a} height={35} fill="#555" /><rect x={a} y={98} width={b - a} height={12} fill="#ddd" stroke="#999" /></g>)}
    <Arrow x1={235} y1={20} x2={255} y2={150} c="#7b3fbf" w={2} /><Arrow x1={260} y1={150} x2={282} y2={18} c="#7b3fbf" w={2} dash="5 3" />
    <line x1={258} y1={20} x2={258} y2={150} stroke="#999" strokeDasharray="3 3" /><Txt x={250} y={40} s={12}>6°</Txt>
    <Txt x={180} y={70} s={11} c={COL.red}>吸收体侧壁造成阴影</Txt>
    {[[95, "抗反射层（ARC）"], [128, "吸收体（如 TaN）"], [148, "Ru 帽层"], [192, "Mo/Si 多层膜（约 40 对）"], [256, "低热膨胀基板"], [285, "导电背面镀层"]].map(([y, t]) =>
      <g key={t}><line x1={442} y1={y} x2={470} y2={y} stroke="#999" /><Txt x={475} y={y + 4} a="start" s={12}>{t}</Txt></g>)}
  </Svg>;
}
// 图 5.41：接近式系统
export function Fig541() {
  return <Svg h={230} title="接近式光刻：掩模与涂胶晶圆之间有间隙 g，没有物镜">
    <Beam pts={[[60, 115], [220, 50], [220, 180]]} /><Beam pts={[[220, 50], [380, 55], [380, 175], [220, 180]]} />
    <Beam pts={[[386, 100], [460, 85], [460, 145], [386, 130]]} op={0.35} />
    <Source x={60} y={115} /><Lens x={220} y={115} h={140} /><Txt x={220} y={35} s={12}>聚光镜</Txt>
    <MaskV x={382} y={115} h={130} gaps={[[0.38, 0.62]]} />
    <Wafer x={460} y={115} h={140} />
    <Arrow x1={392} y1={30} x2={455} y2={30} /><Arrow x1={455} y1={30} x2={392} y2={30} /><Txt x={424} y={22} s={13}>间隙 g</Txt>
    <Txt x={382} y={205} s={11}>x₁y₁ 平面</Txt><Txt x={470} y={205} s={11}>xy 平面</Txt>
  </Svg>;
}
// 图 5.46：衍射区汇总——在不同距离处真实计算的狭缝光强剖面
export function Fig546() {
  const W = 1, lam = 0.1, zs = [0.15, 0.6, 2, 6, 25, 120];
  const xs = Array.from({ length: 161 }, (_, i) => -4 + 8 * i / 160);
  return <Svg h={270} title="狭缝后不同距离处的光强剖面：近处像阴影，Fresnel 区出现振铃，远处变为 sinc 平方图样">
    <rect x={40} y={30} width={6} height={95} fill="#666" /><rect x={40} y={145} width={6} height={95} fill="#666" />
    <Txt x={30} y={140} a="end" s={12}>W</Txt>
    {zs.map((z, k) => {
      const x0 = 120 + k * 95;
      // 横向尺度随 z 放宽：远场按 λz/W 缩放
      const sc = z > 2 ? Math.sqrt(lam * z) * 1.5 : 1;
      const vals = xs.map(x => P.fresnelSlit(x * sc / 1.5, W, z, lam)), mx = Math.max(...vals);
      return <g key={z}>
        <line x1={x0} y1={30} x2={x0} y2={240} stroke="#999" />
        <path d={xs.map((x, i) => `${i ? "L" : "M"}${(x0 + vals[i] / mx * 60).toFixed(1)},${(135 + x * 26).toFixed(1)}`).join("")} fill="none" stroke={COL.red} strokeWidth={1.8} />
        <Txt x={x0 + 20} y={258} s={11}>{`z/W = ${z / W}`}</Txt>
      </g>;
    })}
    <Txt x={210} y={20} s={12}>Fresnel 区：z ≫ W</Txt><Txt x={550} y={20} s={12}>Fraunhofer 区：z ≫ πW²/λ</Txt>
  </Svg>;
}
// 图 5.47：胶层内的电场
export function Fig547() {
  return <Svg h={220} title="空间像照到胶面，胶内电场 E_PR(x,y,z)，下有晶圆">
    <Txt x={330} y={18} s={13}>ℰ_i(x,y)：空间像（空气，n₁）</Txt>
    {[150, 200, 330, 380, 430, 540].map(x => <Arrow key={x} x1={x} y1={28} x2={x} y2={70} c="#c99a00" />)}
    {[[110, 170], [230, 310], [460, 520]].map(([a, b]) => <rect key={a} x={a} y={70} width={b - a} height={5} fill={COL.chrome} />)}
    <rect x={100} y={75} width={480} height={60} fill={COL.prLight} /><Txt x={140} y={110} s={12}>光刻胶 n₂</Txt>
    {[150, 200, 330, 380, 430, 540].map(x => <Arrow key={x} x1={x} y1={80} x2={x} y2={128} c="#7a5aa8" />)}
    <Txt x={480} y={110} s={12}>ℰ_PR(x,y,z)</Txt>
    <rect x={100} y={135} width={480} height={60} fill={COL.si} /><Txt x={340} y={170} s={12}>晶圆 n₃</Txt>
    <Arrow x1={70} y1={80} x2={70} y2={130} /><Txt x={60} y={110} a="end" s={13}>z</Txt>
  </Svg>;
}
// 图 5.49：Dill 参数测量装置
export function Fig549() {
  return <Svg h={220} title="Dill 参数测量：单色光照射透明衬底上的胶膜，探测器记录透过光随时间变化">
    <Beam pts={[[50, 110], [170, 50], [170, 170]]} /><Beam pts={[[170, 50], [470, 60], [470, 160], [170, 170]]} op={0.2} />
    <Source x={50} y={110} /><Lens x={170} y={110} h={130} /><Txt x={170} y={35} s={12}>聚光镜</Txt>
    <rect x={290} y={50} width={6} height={120} fill="#9fc5e8" /><Txt x={293} y={38} s={12}>滤光片（选波长）</Txt>
    <rect x={400} y={50} width={6} height={120} fill={COL.pr} /><rect x={406} y={50} width={40} height={120} fill={COL.quartz} stroke="#999" />
    <Txt x={425} y={30} s={12}>透明衬底上的胶膜</Txt><Txt x={403} y={190} s={12}>厚 D</Txt>
    <rect x={446} y={50} width={3} height={120} fill="#7aa" /><Txt x={470} y={200} s={11}>背面增透膜</Txt>
    <Beam pts={[[449, 80], [540, 85], [540, 135], [449, 140]]} op={0.35} />
    <rect x={545} y={90} width={40} height={40} fill="#555" /><Txt x={565} y={150} s={12}>光探测器</Txt>
  </Svg>;
}
// 图 5.55：同轴照明与斜入射照明
export function Fig555() {
  const row = (y, tilt, label) => {
    const fr = tilt ? 0.28 : 0;   // 频谱平移（以 ±1 级间距为单位）
    const orders = [-2, -1, 0, 1, 2];
    return <g>
      {[0, 1, 2, 3, 4].map(i => <Arrow key={i} x1={30 - (tilt ? 18 : 0)} y1={y - 40 + i * 20 - (tilt ? 8 : 0)} x2={78} y2={y - 40 + i * 20} />)}
      <MaskV x={85} y={y} h={110} gaps={[[0.1, 0.2], [0.3, 0.4], [0.5, 0.6], [0.7, 0.8]]} label="" />
      {orders.map(n => { const yy = y + (n + fr) * 40; return <line key={n} x1={92} y1={y} x2={300} y2={yy} stroke={Math.abs(n + fr) <= 1.4 ? "#d39e00" : "#bbb"} strokeWidth={n === 0 ? 3 : 2} strokeDasharray={Math.abs(n + fr) <= 1.4 ? "" : "4 3"} />; })}
      <line x1={300} y1={y - 120} x2={300} y2={y - 58} stroke={COL.ink} strokeWidth={3} /><line x1={300} y1={y + 58} x2={300} y2={y + 120} stroke={COL.ink} strokeWidth={3} />
      <Lens x={330} y={y} h={110} />
      {orders.map(n => { const yy = y + (n + fr) * 40; return <g key={"o" + n}><circle cx={440} cy={yy} r={n === 0 ? 7 : 5} fill={Math.abs(n + fr) <= 1.4 ? "#d39e00" : "#ccc"} /><Txt x={455} y={yy + 4} a="start" s={11}>{n === 0 ? "0 级" : `${n > 0 ? "+" : ""}${n} 级`}</Txt></g>; })}
      <rect x={432} y={y - 56} width={16} height={112} fill="none" stroke={COL.blue} strokeDasharray="4 3" />
      <Txt x={560} y={y - 6} s={12}>{label}</Txt>
      <Txt x={560} y={y + 14} s={11} c={COL.muted}>{tilt ? "0 级与 +1 级都进入光瞳：能成像" : "只有 0 级进入光瞳：无图形"}</Txt>
    </g>;
  };
  return <Svg h={420} title="同轴照明时正负一级衍射光落在光瞳外；斜入射照明把衍射图样整体平移，使 0 级与一个一级同时被收集">
    {row(105, false, "同轴（正入射）照明")}{row(315, true, "斜入射（离轴）照明")}
    <Txt x={440} y={18} s={11} c={COL.blue}>虚框 = 物镜光瞳（|f| ≤ NA/λ）</Txt>
  </Svg>;
}
// 图 5.56：照明光源形状
export function Fig556() {
  const R0 = 42, c = "#9a9a9a";
  return <Svg h={130} title="常规（圆盘）、环形、四极、偶极照明">
    {[["常规", <circle r={R0 * 0.6} fill={c} />], ["环形", <g><circle r={R0 * 0.85} fill={c} /><circle r={R0 * 0.55} fill="#fff" /></g>],
      ["四极", <g><circle r={R0} fill="none" stroke={COL.ink} />{[[1, 1], [1, -1], [-1, 1], [-1, -1]].map(([a, b], i) => <circle key={i} cx={a * 17} cy={b * 17} r={9} fill={c} />)}</g>],
      ["偶极", <g><circle r={R0} fill="none" stroke={COL.ink} /><circle cx={-27} r={9} fill={c} /><circle cx={27} r={9} fill={c} /></g>]].map(([t, g], i) =>
      <g key={t} transform={`translate(${95 + i * 165},58)`}><circle r={R0} fill="none" stroke="#ddd" />{g}<Txt x={0} y={66} s={12}>{t}</Txt></g>)}
  </Svg>;
}
// 图 5.57：Köhler 照明
export function Fig557() {
  return <Svg h={230} title="Köhler 照明：聚光镜把光源成像在物镜入瞳上，掩模上各处的衍射光都能被物镜同样好地收集">
    <Source x={40} y={115} /><Lens x={150} y={115} h={150} /><Txt x={150} y={30} s={12}>聚光镜</Txt>
    <MaskV x={260} y={115} h={140} gaps={[[0.1, 0.2], [0.45, 0.55], [0.8, 0.9]]} />
    {[-1, 1].map(s => <line key={s} x1={40} y1={115} x2={150} y2={115 + s * 70} stroke="#d39e00" />)}
    {[-1, 1].map(s => <line key={"b" + s} x1={150} y1={115 + s * 70} x2={430} y2={115 - s * 6} stroke="#d39e00" opacity={0.6} />)}
    {[0.15, 0.5, 0.85].map((g, k) => { const y = 45 + g * 140; return <polygon key={k} points={`263,${y} 430,${115 - 30} 430,${115 + 30}`} fill="#9fc5e8" opacity={0.35} />; })}
    <line x1={420} y1={30} x2={420} y2={80} stroke={COL.ink} strokeWidth={3} /><line x1={420} y1={150} x2={420} y2={200} stroke={COL.ink} strokeWidth={3} /><Txt x={420} y={22} s={12}>入瞳（光源的像在此）</Txt>
    <Lens x={450} y={115} h={150} /><Txt x={470} y={212} s={12}>物镜</Txt>
    <Wafer x={580} y={115} />
    <Txt x={340} y={222} s={11} c={COL.muted}>蓝色三角 = 各掩模开口的衍射光锥，都汇聚到光瞳中心附近</Txt>
  </Svg>;
}
// 图 5.58：干式与浸没式
export function Fig558() {
  return <Svg h={230} title="干式与浸没式：镜头下方介质不同，焦面位置不同">
    <polygon points="60,40 240,40 200,140 100,140" fill="#dde6ee" stroke={COL.ink} /><Txt x={150} y={95} s={12}>镜头</Txt>
    <rect x={100} y={140} width={100} height={22} fill="#9fc5e8" /><Txt x={260} y={156} a="start" s={12}>水或空气</Txt>
    <rect x={40} y={162} width={220} height={10} fill={COL.pr} /><rect x={40} y={172} width={220} height={40} fill={COL.si} /><Txt x={150} y={198} s={12}>晶圆</Txt>
    <line x1={420} y1={60} x2={660} y2={60} stroke={COL.ink} /><Txt x={540} y={52} s={12}>镜头 n = 1.5</Txt>
    <line x1={470} y1={20} x2={490} y2={60} stroke={COL.red} strokeWidth={1.8} /><line x1={610} y1={20} x2={590} y2={60} stroke={COL.red} strokeWidth={1.8} />
    <line x1={490} y1={60} x2={540} y2={130} stroke={COL.blue} strokeWidth={1.8} /><line x1={590} y1={60} x2={540} y2={130} stroke={COL.blue} strokeWidth={1.8} />
    <line x1={490} y1={60} x2={536} y2={168} stroke="#2c6e49" strokeWidth={1.8} /><line x1={590} y1={60} x2={544} y2={168} stroke="#2c6e49" strokeWidth={1.8} />
    <line x1={420} y1={130} x2={660} y2={130} stroke={COL.blue} strokeDasharray="4 3" /><Txt x={665} y={134} a="start" s={11} c={COL.blue}>干式焦面 n=1</Txt>
    <line x1={420} y1={168} x2={660} y2={168} stroke="#2c6e49" strokeDasharray="4 3" /><Txt x={665} y={172} a="start" s={11} c="#2c6e49">湿式焦面 n=1.44</Txt>
    <Txt x={510} y={95} s={12} c={COL.blue}>θ₂</Txt><Txt x={560} y={150} s={12} c="#2c6e49">θ₃≈θ₁</Txt>
  </Svg>;
}
// 图 5.59：NA < 1 与 NA > 1
export function Fig559() {
  return <Svg h={220} title="大角度光线在镜头/空气界面全反射；换成水后可以透射，NA 可大于 1">
    {[0, 1].map(k => { const x0 = 40 + k * 330, wet = k === 1; return <g key={k}>
      <path d={`M${x0},120 L${x0},70 Q${x0 + 140},10 ${x0 + 280},70 L${x0 + 280},120 Z`} fill="#dde6ee" stroke={COL.ink} />
      <rect x={x0} y={120} width={280} height={25} fill={wet ? "#9fc5e8" : "#fff"} stroke="#ccc" /><Txt x={x0 + 250} y={137} s={11}>{wet ? "水" : "空气"}</Txt>
      <rect x={x0} y={145} width={280} height={10} fill={COL.pr} /><rect x={x0} y={155} width={280} height={35} fill={COL.si} />
      <line x1={x0 + 15} y1={60} x2={x0 + 140} y2={120} stroke={COL.red} strokeWidth={1.8} />
      {wet ? <line x1={x0 + 140} y1={120} x2={x0 + 192} y2={150} stroke={COL.red} strokeWidth={1.8} /> : <Arrow x1={x0 + 140} y1={120} x2={x0 + 200} y2={92} c={COL.red} />}
      <Txt x={x0 + 140} y={210} s={12}>{wet ? "浸没：入射角 < 临界角，光线透射（NA > 1）" : "干式：超过临界角 41°，全反射"}</Txt>
    </g>; })}
  </Svg>;
}
// 图 5.62：多层胶工艺
export function Fig562() {
  const topo = (x, y) => `M${x},${y} h40 v-20 h40 v20 h30 v-20 h40 v20 h30`;
  const stack = (x, y, kind) => <g>
    <rect x={x} y={y} width={180} height={40} fill={COL.si} />
    <path d={`M${x},${y} h40 v-20 h40 v20 h30 v-20 h40 v20 h30 v40 h-180 Z`} fill={COL.si} />
    <path d={`M${x},${y - 6} h46 v-20 h28 v20 h42 v-20 h28 v20 h36 v6 h-36 v-20 h-28 v20 h-42 v-20 h-28 v20 h-46 Z`} fill={COL.red} />
    {kind === 0 && <path d={`M${x},${y - 6} C${x + 40},${y - 40} ${x + 90},${y - 30} ${x + 180},${y - 36} L${x + 180},${y - 52} L${x},${y - 52} Z`} fill={COL.prLight} opacity={0.9} />}
    {kind >= 1 && <rect x={x} y={y - 46} width={180} height={40} fill="#d8c79e" opacity={0.9} />}
    {kind === 2 && <rect x={x} y={y - 54} width={180} height={8} fill={COL.ox} />}
    {kind >= 1 && <rect x={x} y={kind === 2 ? y - 64 : y - 56} width={180} height={10} fill={COL.pr} />}
  </g>;
  return <Svg h={250} title="单层胶、有机平坦化层 + 薄成像胶、有机层 + 氧化物硬掩模 + 薄胶">
    {stack(20, 180, 0)}{stack(250, 180, 1)}{stack(480, 180, 2)}
    <Txt x={110} y={240} s={12}>单层胶（厚度随形貌起伏）</Txt><Txt x={340} y={240} s={12}>有机平坦化层 + 薄成像胶</Txt><Txt x={570} y={240} s={12}>有机层 + 氧化物硬掩模 + 薄胶</Txt>
    <Txt x={340} y={40} s={12}>紫 = 成像胶　土黄 = 有机平坦化层　浅蓝 = 氧化物硬掩模　红 = 待刻蚀层　灰 = 衬底</Txt>
  </Svg>;
}
// 图 5.63：BARC
export function Fig563() {
  return <Svg h={200} title="BARC 层：胶/BARC 界面与 BARC/衬底界面的两束反射光相差 180 度而相消">
    <rect x={120} y={20} width={360} height={70} fill={COL.prLight} /><rect x={120} y={90} width={360} height={40} fill="#d8c79e" /><rect x={120} y={130} width={360} height={60} fill={COL.si} />
    <Txt x={500} y={60} a="start" s={13}>胶 n₁</Txt><Txt x={500} y={115} a="start" s={13}>BARC n₂</Txt><Txt x={500} y={165} a="start" s={13}>衬底 n₃</Txt>
    <line x1={135} y1={90} x2={135} y2={130} stroke={COL.ink} /><Txt x={145} y={115} a="start" s={12}>D</Txt>
    <Arrow x1={230} y1={25} x2={260} y2={88} c={COL.red} /><Arrow x1={262} y1={90} x2={290} y2={30} c={COL.red} dash="4 3" />
    <line x1={262} y1={90} x2={282} y2={128} stroke={COL.red} /><Arrow x1={282} y1={130} x2={302} y2={92} c={COL.red} /><Arrow x1={304} y1={90} x2={330} y2={30} c={COL.blue} dash="4 3" />
    <Txt x={380} y={50} s={11} c={COL.muted}>两束反射光相位差 180° 时相消</Txt>
  </Svg>;
}
// 图 5.67：移相掩模的几种实现
export function Fig567() {
  return <Svg h={260} title="交替移相（刻蚀石英）、衰减移相、边缘移相（rim PSM）与散射条移相">
    <rect x={30} y={30} width={250} height={60} fill={COL.quartz} stroke="#888" /><rect x={95} y={70} width={45} height={20} fill="#fff" stroke="#888" />
    {[[30, 60], [140, 180], [240, 280]].map(([a, b]) => <rect key={a} x={a} y={90} width={b - a} height={6} fill={COL.chrome} />)}
    <Txt x={117} y={64} s={11}>d</Txt><Txt x={155} y={118} s={12}>交替 PSM：石英刻蚀深 d</Txt>
    <rect x={370} y={30} width={250} height={60} fill={COL.quartz} stroke="#888" /><rect x={470} y={90} width={50} height={8} fill="#777" />
    <Txt x={495} y={118} s={12}>衰减 PSM（如 MoSi，透过 5–15%）</Txt>
    <rect x={90} y={140} width={100} height={100} fill={COL.chrome} /><rect x={115} y={165} width={50} height={50} fill="url(#psmh)" /><rect x={123} y={173} width={34} height={34} fill="#fff" />
    <Txt x={140} y={256} s={12}>边缘移相（rim PSM）</Txt>
    <rect x={450} y={140} width={100} height={100} fill={COL.chrome} /><rect x={483} y={173} width={34} height={34} fill="#fff" />
    {[[483, 160, 34, 6], [483, 214, 34, 6], [470, 173, 6, 34], [524, 173, 6, 34]].map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} fill="url(#psmh)" />)}
    <Txt x={500} y={256} s={12}>散射条移相（scattering bar）</Txt>
    <defs><Hatch id="psmh" c="#7aa7d6" /></defs>
  </Svg>;
}

// 图 5.73：LELE 双重图形（分步）
const LAYOUT_LINES = [[0, 0, 1], [1, 0, 1], [2, 0, 0.45], [2, 0.6, 1], [3, 0, 1], [4, 0.3, 1], [5, 0, 1], [6, 0, 0.7], [7, 0, 1]];   // [列, y0, y1]
function Lines({ which, color, x0 = 0, faded }) {
  return LAYOUT_LINES.map(([c, a, b], i) => (which === "all" || (which === "A" ? c % 2 === 0 : c % 2 === 1)) &&
    <rect key={i} x={x0 + 20 + c * 26} y={20 + (1 - b) * 150} width={13} height={(b - a) * 150} fill={color} opacity={faded ? 0.35 : 1} />);
}
export function Fig573() {
  const steps = [
    { label: "版图", content: "设计版图：九条线，节距小于一次曝光能分辨的极限。把它按奇偶列拆成 A、B 两张掩模，每张掩模上的节距翻倍。" },
    { label: "第一次光刻", content: "用掩模 A 曝光、显影：胶图形（紫）只含偶数列，节距是原来的两倍，空间像对比度大幅提高（对照图 5.71 → 5.72）。" },
    { label: "第一次刻蚀", content: "以胶为掩模刻蚀硬掩模层，A 组线转移到硬掩模（深灰）中，去胶。" },
    { label: "第二次光刻", content: "重新涂胶，用掩模 B 曝光：B 组线（紫）必须与已刻好的 A 组精确套准——套刻误差直接变成线间距误差。" },
    { label: "第二次刻蚀", content: "再刻蚀一次，B 组也进入硬掩模。" },
    { label: "最终图形", content: "两组合成完整版图，再以硬掩模刻蚀下层薄膜。代价：两倍的光刻 + 刻蚀步骤，以及对套刻精度的严苛要求。" },
  ];
  const render = i => <Svg w={300} h={190} title="LELE 双重图形工艺步骤">
    <rect x={10} y={15} width={240} height={160} fill={i === 0 ? "#fff" : COL.ox} stroke="#ccc" />
    {i === 0 && <Lines which="all" color="#555" />}
    {i === 1 && <Lines which="A" color={COL.pr} />}
    {i >= 2 && <Lines which="A" color="#555" />}
    {i === 3 && <Lines which="B" color={COL.pr} />}
    {i >= 4 && <Lines which="B" color="#555" />}
    {i === 0 && <><Lines which="A" color="#c0392b" faded /></>}
  </Svg>;
  return <StepThrough steps={steps} render={render} />;
}
// 图 5.75：SADP（侧墙自对准双重图形，分步截面）
export function Fig575() {
  const steps = [
    { label: "芯轴光刻", content: <TxI>{R`在薄 $\mathrm{SiO_2}$ 上沉积多晶硅（可牺牲的芯轴 mandrel），以较宽松的节距光刻、刻蚀出芯轴条。`}</TxI> },
    { label: "氮化硅沉积", content: <TxI>{R`LPCVD 共形沉积 $\mathrm{Si_3N_4}$：侧壁上的竖直厚度远大于平面上的厚度。`}</TxI> },
    { label: "侧墙刻蚀", content: "不用掩模，各向异性回刻氮化物：平面上的氮化物去净，芯轴两侧留下侧墙。" },
    { label: "去芯轴", content: "选择性去掉多晶硅芯轴，只剩侧墙：线数翻倍、节距减半，线宽由氮化物厚度（而非光刻）决定。" },
    { label: "切割光刻 + 刻蚀", content: "侧墙总是成对闭合环，需要再做一次（较宽松的）切割/修剪光刻，去掉不要的段落，再以侧墙为硬掩模刻蚀下层，得到最终图形。" },
  ];
  const N = 3, pitch = 200, mw = 80, t = 30, base = 150;
  const render = i => <Svg w={680} h={210} title="SADP 截面步骤">
    <rect x={20} y={base} width={640} height={45} fill={COL.si} /><rect x={20} y={base - 10} width={640} height={10} fill={COL.ox} />
    {Array.from({ length: N }, (_, k) => {
      const x = 80 + k * pitch;
      return <g key={k}>
        {i <= 2 && <rect x={x} y={base - 90} width={mw} height={80} fill={COL.poly} />}
        {i === 1 && <path d={`M20,${base - 10} H${x - t} V${base - 90 - t} H${x + mw + t} V${base - 10} H${x + pitch - t - (k === N - 1 ? 0 : 0)}`} fill="none" stroke={COL.nit} strokeWidth={t} strokeLinejoin="miter" opacity={0.85} />}
        {i >= 2 && i <= 3 && [x - t, x + mw].map(xx => <rect key={xx} x={xx} y={base - 90} width={t} height={80} fill={COL.nit} />)}
        {i === 4 && [x - t, x + mw].map((xx, j) => (k === 1 && j === 1) ? null : <g key={xx}><rect x={xx} y={base - 90} width={t} height={80} fill={COL.nit} /><rect x={xx} y={base - 10} width={t} height={10} fill={COL.ox} /></g>)}
      </g>;
    })}
    {i === 4 && <rect x={20} y={base - 10} width={640} height={10} fill="#fff" opacity={0.75} />}
    <Txt x={340} y={20} s={12}>{["红棕 = 多晶硅芯轴（节距 200）", "绿 = 共形氮化硅", "侧墙宽度 = 氮化物厚度", "侧墙节距 = 芯轴节距的一半", "切割光刻去掉一条侧墙（示意）后转移图形"][i]}</Txt>
  </Svg>;
  return <StepThrough steps={steps} render={render} />;
}

// 图 5.76–5.79：纳米压印
const Mold = ({ x, y, w = 220, clear, nicr, teeth = [[20, 45], [70, 95], [120, 135], [160, 175]] }) => <g>
  <path d={`M${x},${y} h${w} v30 ` + [...teeth].reverse().map(([a, b]) => `H${x + b} v18 H${x + a} v-18`).join(" ") + ` H${x} Z`} fill={clear ? "#fff" : "#777"} stroke={COL.ink} />
  {nicr && teeth.map(([a, b]) => <rect key={a} x={x + a} y={y + 45} width={b - a} height={4} fill="#111" />)}
</g>;
const Sub = ({ x, y, w = 220, h = 30, c = "#777" }) => <rect x={x} y={y} width={w} height={h} fill={c} />;
const Resist = ({ x, y, w = 220, h = 14, gaps, thin = 4 }) => gaps
  ? <g>{[[0, gaps[0][0]], ...gaps.slice(0, -1).map((g, i) => [g[1], gaps[i + 1][0]]), [gaps[gaps.length - 1][1], w]].map(([a, b], i) => <rect key={i} x={x + a} y={y} width={b - a} height={h} fill="url(#nilR)" />)}{thin > 0 && gaps.map(([a, b]) => <rect key={"t" + a} x={x + a} y={y + h - thin} width={b - a} height={thin} fill="url(#nilR)" />)}</g>
  : <rect x={x} y={y} width={w} height={h} fill="url(#nilR)" />;
const GAPS = [[20, 45], [70, 95], [120, 135], [160, 175]];
export function Fig576() {
  return <Svg h={330} title="热压印与紫外压印的三个步骤">
    <defs><Hatch id="nilR" c={COL.pr} /></defs>
    {[0, 1].map(k => { const x = 40 + k * 340, uv = k === 1; return <g key={k}>
      <Txt x={x + 110} y={18} s={13} w={600}>{uv ? "紫外压印（UV NIL）" : "热压印（thermal NIL）"}</Txt>
      <Mold x={x} y={30} clear={uv} /><Resist x={x} y={88} /><Sub x={x} y={102} /><Txt x={x - 10} y={95} a="end" s={12}>a)</Txt>
      <Mold x={x} y={150} clear={uv} /><Resist x={x} y={184} h={14} gaps={GAPS} thin={0} /><Sub x={x} y={198} /><Txt x={x - 10} y={195} a="end" s={12}>b)</Txt>
      {Array.from({ length: 9 }, (_, i) => <Arrow key={i} x1={x + 15 + i * 24} y1={128} x2={x + 15 + i * 24} y2={146} c={uv ? "#7b3fbf" : COL.red} />)}
      <Txt x={x + 236} y={140} a="start" s={11}>{uv ? "UV 固化" : "加热 + 加压"}</Txt>
      <Mold x={x} y={238} clear={uv} /><Resist x={x} y={300} h={14} gaps={GAPS} thin={4} /><Sub x={x} y={314} h={14} /><Txt x={x - 10} y={310} a="end" s={12}>c)</Txt>
    </g>; })}
  </Svg>;
}
export function Fig577() {
  return <Svg h={270} title="UV 压印后去除残留层：左为氧等离子体整体减薄，右为模具底部 NiCr 挡光后直接显影">
    <defs><Hatch id="nilR" c={COL.pr} /></defs>
    {[0, 1].map(k => { const x = 40 + k * 340, ni = k === 1; return <g key={k}>
      <Txt x={x + 110} y={18} s={13} w={600}>{ni ? "NiCr 挡光层：直接显影" : "氧等离子体去残胶（descum）"}</Txt>
      <Mold x={x} y={30} clear nicr={ni} /><Resist x={x} y={92} h={14} gaps={GAPS} thin={4} /><Sub x={x} y={106} /><Txt x={x - 10} y={100} a="end" s={12}>c)</Txt>
      {ni && <Txt x={x + 236} y={80} a="start" s={11}>NiCr</Txt>}
      <Resist x={x} y={186} h={ni ? 14 : 10} gaps={GAPS} thin={0} /><Sub x={x} y={200} /><Txt x={x - 10} y={196} a="end" s={12}>d)</Txt>
      <Txt x={x + 110} y={250} s={11} c={COL.muted}>{ni ? "凹槽底部被挡光未曝光（负胶），显影即去除" : "整体减薄：凸起部分也被削低"}</Txt>
    </g>; })}
  </Svg>;
}
export function Fig578() {
  return <Svg h={250} title="图形转移：左为直接以胶为掩模干法刻蚀；右为沉积硬掩模、剥离后再刻蚀（得到反相图形）">
    <defs><Hatch id="nilR" c={COL.pr} /></defs>
    <Txt x={150} y={18} s={13} w={600}>胶作掩模直接刻蚀</Txt><Txt x={490} y={18} s={13} w={600}>硬掩模 + 剥离（lift-off）</Txt>
    <Resist x={40} y={50} h={20} gaps={GAPS} thin={0} /><Sub x={40} y={70} /><Txt x={30} y={68} a="end" s={12}>a)</Txt>
    <Resist x={40} y={150} h={20} gaps={GAPS} thin={0} /><path d={`M40,170 ` + GAPS.map(([a, b]) => `H${40 + a} v20 H${40 + b} v-20`).join(" ") + ` H260 v30 H40 Z`} fill="#777" /><Txt x={30} y={170} a="end" s={12}>b)</Txt>
    <Resist x={380} y={40} h={20} gaps={GAPS} thin={0} /><rect x={380} y={34} width={220} height={6} fill="#111" />{GAPS.map(([a, b]) => <rect key={a} x={380 + a} y={54} width={b - a} height={6} fill="#111" />)}<Sub x={380} y={60} /><Txt x={370} y={58} a="end" s={12}>a)</Txt>
    {GAPS.map(([a, b]) => <rect key={a} x={380 + a} y={124} width={b - a} height={6} fill="#111" />)}<Sub x={380} y={130} /><Txt x={370} y={130} a="end" s={12}>b)</Txt>
    {GAPS.map(([a, b]) => <g key={a}><rect x={380 + a} y={194} width={b - a} height={6} fill="#111" /><rect x={380 + a} y={200} width={b - a} height={20} fill="#777" /></g>)}<Sub x={380} y={220} h={20} /><Txt x={370} y={210} a="end" s={12}>c)</Txt>
  </Svg>;
}
export function Fig579() {
  return <Svg h={200} title="步进-闪光压印：喷墨滴胶、压模、紫外闪光固化、抬起并步进">
    <defs><Hatch id="nilR" c={COL.pr} /></defs>
    <rect x={30} y={150} width={600} height={40} fill="#777" /><rect x={30} y={140} width={600} height={10} fill="#bbb" />
    <Txt x={330} y={175} s={12} c="#fff">衬底</Txt><Txt x={500} y={149} s={10}>平坦化层</Txt>
    <Resist x={40} y={126} w={160} h={14} gaps={[[15, 30], [50, 65], [85, 100], [120, 135]]} thin={4} />
    <Mold x={230} y={66} clear />{[[255], [300], [345], [390]].map(([x]) => <circle key={x} cx={x} cy={134} r={5} fill={COL.pr} />)}
    {Array.from({ length: 7 }, (_, i) => <Arrow key={i} x1={260 + i * 26} y1={30} x2={260 + i * 26} y2={60} c="#7b3fbf" />)}<Txt x={340} y={22} s={12}>UV</Txt>
    <Arrow x1={238} y1={30} x2={238} y2={62} w={3} /><Arrow x1={442} y1={30} x2={442} y2={62} w={3} /><Txt x={238} y={22} s={12}>压</Txt><Txt x={442} y={22} s={12}>压</Txt>
    <path d="M520,70 h30 v25 l-15,15 l-15,-15 Z" fill="#555" /><circle cx={530} cy={128} r={4} fill={COL.pr} /><circle cx={545} cy={134} r={4} fill={COL.pr} />
    <Txt x={565} y={80} a="start" s={12}>喷墨滴胶</Txt><Txt x={565} y={98} a="start" s={11}>（低黏度胶）</Txt>
    <path d="M80,110 Q120,60 200,70" fill="none" stroke={COL.ink} markerEnd="" /><Arrow x1={190} y1={68} x2={205} y2={72} /><Txt x={90} y={60} s={12}>抬起并步进</Txt>
  </Svg>;
}
