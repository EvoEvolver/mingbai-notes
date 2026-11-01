// 第 5 章（上）自绘插图（SVG / Canvas）。保留原书图号；不请求原书图片。
// 配色约定（全章一致）：Si 灰、SiO₂/石英掩模基板 浅蓝、光刻胶 紫、铬 深灰、光线 琥珀、透镜 淡青。
import { useEffect, useMemo, useRef, useState } from "react";
import { renderTex, Slider, Seg, TxI } from "@kit";
import * as P from "./_ch05_phys.jsx";

const R = String.raw;
export const COL = {
  si: "#a9adb3", ox: "#cfe6f5", resist: "#a68bd8", resistDark: "#6f4fb3", cr: "#3b3b40", light: "#e8a33d", lightFill: "rgba(232,163,61,0.22)",
  lens: "#d9eef0", lensEdge: "#5b8f96", ink: "#26292e", muted: "#6b6f76", accent: "#c0392b", blue: "#2c4a6e", green: "#2c6e49", metal: "#d4a017",
};
const panel = { background: "#fbfaf6", border: "1px solid #e2ddd2", borderRadius: 10, padding: "12px 14px", boxSizing: "border-box", width: "100%" };
export const Frame = ({ children, style }) => <div style={{ ...panel, ...style }}>{children}</div>;
export function Svg({ w = 680, h = 300, title, children }) {
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} style={{ width: "100%", display: "block", fontFamily: "system-ui, sans-serif", fontSize: 13, color: COL.ink }}>
    <title>{title}</title>{children}</svg>;
}
// SVG 中的 KaTeX 标签
export const TL = ({ x, y, tex, w = 120, h = 24, anchor = "start", size = 13, color }) => {
  const dx = anchor === "middle" ? -w / 2 : anchor === "end" ? -w : 0;
  return <foreignObject x={x + dx} y={y - h / 2} width={w} height={h} style={{ overflow: "visible" }}>
    <div style={{ fontSize: size, color, textAlign: anchor === "middle" ? "center" : anchor === "end" ? "right" : "left", lineHeight: `${h}px`, whiteSpace: "nowrap" }}
      dangerouslySetInnerHTML={{ __html: renderTex(tex) }} /></foreignObject>;
};
const T = ({ x, y, children, a = "middle", s = 13, c = COL.ink, w }) => <text x={x} y={y} textAnchor={a} fontSize={s} fill={c} fontWeight={w}>{children}</text>;
export function Arrow({ x1, y1, x2, y2, c = COL.ink, sw = 1.6, head = 7, dash }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p = `${x2},${y2} ${x2 - head * Math.cos(a - 0.4)},${y2 - head * Math.sin(a - 0.4)} ${x2 - head * Math.cos(a + 0.4)},${y2 - head * Math.sin(a + 0.4)}`;
  return <g><line x1={x1} y1={y1} x2={x2 - 0.6 * head * Math.cos(a)} y2={y2 - 0.6 * head * Math.sin(a)} stroke={c} strokeWidth={sw} strokeDasharray={dash} /><polygon points={p} fill={c} /></g>;
}
const Lens = ({ cx, cy, rx = 9, ry = 40, horiz = false }) => horiz
  ? <ellipse cx={cx} cy={cy} rx={ry} ry={rx} fill={COL.lens} stroke={COL.lensEdge} strokeWidth={1.4} />
  : <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={COL.lens} stroke={COL.lensEdge} strokeWidth={1.4} />;
// 掩模（石英 + 铬图形），水平放置
const MaskH = ({ x, y, w, pattern = [0.1, 0.25, 0.4, 0.55, 0.7, 0.85], bar = 0.08, glass = 7 }) => <g>
  <rect x={x} y={y} width={w} height={glass} fill={COL.ox} stroke="#7aa6c2" />
  {pattern.map((p, i) => <rect key={i} x={x + p * w} y={y + glass} width={bar * w} height={3} fill={COL.cr} />)}
</g>;
const WaferH = ({ x, y, w, resist = 6, h = 16 }) => <g>
  <rect x={x} y={y} width={w} height={resist} fill={COL.resist} />
  <rect x={x} y={y + resist} width={w} height={h} fill={COL.si} stroke="#7d8187" />
</g>;
// 光锥（梯形/三角形填充）
const Beam = ({ pts, o = 1 }) => <polygon points={pts.map(p => p.join(",")).join(" ")} fill={COL.lightFill} opacity={o} />;

// ===================== 图 5.1 光刻全流程 =====================
export function Fig51() {
  return <Frame><Svg w={680} h={300} title="从版图设计到晶圆曝光的光刻流程：CAD → 电子束写掩模 → 投影曝光">
    {/* CAD */}
    <rect x={20} y={60} width={170} height={110} rx={6} fill="#eef2f6" stroke="#9aa7b4" />
    {Array.from({ length: 9 }, (_, i) => <rect key={i} x={32 + (i % 3) * 52} y={72 + Math.floor(i / 3) * 32} width={44} height={24} fill="none" stroke={COL.blue} strokeWidth={1} />)}
    {Array.from({ length: 6 }, (_, i) => <line key={"w" + i} x1={36 + i * 26} y1={75} x2={36 + i * 26} y2={160} stroke="#c78f2a" strokeWidth={0.8} />)}
    <rect x={95} y={170} width={20} height={14} fill="#c9cfd6" /><rect x={60} y={184} width={90} height={5} fill="#c9cfd6" />
    <T x={105} y={210} w={600}>CAD 系统</T><T x={105} y={228} s={12} c={COL.muted}>版图 · 仿真 · 设计规则检查</T>
    <Arrow x1={198} y1={120} x2={238} y2={120} />
    {/* 电子束写掩模 */}
    <rect x={292} y={22} width={22} height={14} fill="#888" />
    {[44, 96, 150].map((y, i) => <rect key={i} x={272} y={y} width={62} height={26} rx={5} fill="#555c66" />)}
    <polygon points="303,36 296,198 310,198" fill="#9fc3e8" opacity={0.85} />
    {[78, 132].map(y => <g key={y}><rect x={283} y={y} width={8} height={12} fill="#aaa" /><rect x={315} y={y} width={8} height={12} fill="#aaa" /></g>)}
    <rect x={250} y={198} width={106} height={4} fill={COL.resist} /><rect x={250} y={202} width={106} height={4} fill={COL.cr} /><rect x={250} y={206} width={106} height={22} fill={COL.ox} stroke="#7aa6c2" />
    <T x={303} y={222} s={12}>掩模基板</T>
    <T x={360} y={52} a="start" s={12}>电子源</T><T x={360} y={112} a="start" s={12}>聚焦</T><T x={360} y={166} a="start" s={12}>偏转</T>
    <T x={360} y={204} a="start" s={11} c={COL.resistDark}>胶</T><T x={242} y={208} a="end" s={11}>Cr</T>
    <T x={303} y={252} w={600}>图形发生器写掩模</T><T x={303} y={270} s={12} c={COL.muted}>电子束或激光逐点扫描</T>
    <Arrow x1={400} y1={120} x2={440} y2={120} />
    {/* 投影曝光 */}
    <ellipse cx={560} cy={22} rx={18} ry={6} fill="#f5d27a" stroke="#c99a2e" />
    <Beam pts={[[548, 26], [572, 26], [610, 58], [510, 58]]} />
    <Lens cx={560} cy={62} horiz ry={52} rx={7} />
    <Beam pts={[[512, 68], [608, 68], [608, 86], [512, 86]]} />
    <MaskH x={505} y={86} w={110} />
    <Beam pts={[[512, 96], [608, 96], [600, 150], [520, 150]]} />
    <Lens cx={560} cy={156} horiz ry={46} rx={7} />
    <Beam pts={[[522, 162], [598, 162], [576, 210], [544, 210]]} />
    <WaferH x={510} y={210} w={100} />
    <T x={630} y={66} a="start" s={12}>聚光镜</T><T x={630} y={94} a="start" s={12}>掩模</T><T x={630} y={160} a="start" s={12}>缩小镜头</T><T x={630} y={216} a="start" s={12}>胶/晶圆</T>
    <T x={560} y={252} w={600}>投影光刻机</T><T x={560} y={270} s={12} c={COL.muted}>通常 4× 缩小，步进或扫描</T>
  </Svg></Frame>;
}

// ===================== 图 5.3 空间像与潜像 =====================
export function Fig53() {
  // 斜二测：x 向右，深度向右上
  const ox = 120, oy = 120, dx = 0.55, dy = -0.35, W = 400, D = 160;
  const pt = (x, z, y) => [ox + x + z * dx, oy + y + z * dy];
  const poly = arr => arr.map(a => pt(...a).join(",")).join(" ");
  const holes = [[50, 40], [150, 100], [250, 40], [340, 100]];
  return <Frame><Svg w={680} h={330} title="空间像落在光刻胶表面，胶内形成三维潜像">
    {/* 衬底 */}
    <polygon points={poly([[0, 0, 70], [W, 0, 70], [W, 0, 170], [0, 0, 170]])} fill={COL.si} stroke="#777" />
    <polygon points={poly([[W, 0, 70], [W, D, 70], [W, D, 170], [W, 0, 170]])} fill="#8f949a" stroke="#777" />
    {/* 器件示意：栅与源漏 */}
    {[[60, "P"], [150, "P"], [260, "N"], [350, "N"]].map(([x, l], i) => <g key={i}><rect x={pt(x - 25, 0, 0)[0]} y={pt(0, 0, 112)[1]} width={50} height={14} rx={5} fill={i < 2 ? "#b06c5c" : "#6c8fb0"} /><T x={pt(x, 0, 0)[0]} y={pt(0, 0, 123)[1]} s={11} c="#fff">{l}<tspan dy={-4} fontSize={8}>+</tspan></T></g>)}
    {[105, 305].map(x => <rect key={x} x={pt(x - 14, 0, 0)[0]} y={pt(0, 0, 88)[1]} width={28} height={24} fill="#8b4a3a" />)}
    <T x={pt(105, 0, 0)[0]} y={pt(0, 0, 160)[1]} c="#333">PMOS</T><T x={pt(305, 0, 0)[0]} y={pt(0, 0, 160)[1]} c="#333">NMOS</T>
    {/* 介质层 */}
    <polygon points={poly([[0, 0, 40], [W, 0, 40], [W, 0, 70], [0, 0, 70]])} fill={COL.ox} opacity={0.75} stroke="#7aa6c2" />
    <polygon points={poly([[W, 0, 40], [W, D, 40], [W, D, 70], [W, 0, 70]])} fill="#b7d4e6" stroke="#7aa6c2" />
    {/* 光刻胶 */}
    <polygon points={poly([[0, 0, 0], [W, 0, 0], [W, 0, 40], [0, 0, 40]])} fill={COL.resist} opacity={0.85} />
    <polygon points={poly([[W, 0, 0], [W, D, 0], [W, D, 40], [W, 0, 40]])} fill="#8e74c4" />
    <polygon points={poly([[0, 0, 0], [W, 0, 0], [W, D, 0], [0, D, 0]])} fill="#2b2240" />
    {/* 潜像（亮区柱） */}
    {holes.map(([x, z], i) => <g key={i}>
      <polygon points={poly([[x - 16, z - 14, 0], [x + 16, z - 14, 0], [x + 16, z + 14, 0], [x - 16, z + 14, 0]])} fill="#f6e3a8" opacity={0.95} />
      {z < 50 && <rect x={pt(x - 16, 0, 0)[0]} y={pt(0, 0, 0)[1]} width={32} height={40} fill="#f1d58a" opacity={0.75} />}
      {[0, 1].map(k => <path key={k} d={`M${pt(x - 5 + 10 * k, z, -70)[0]},${pt(x, z, -70)[1]} q4,6 0,12 q-4,6 0,12 q4,6 0,12 q-4,6 0,12 q4,6 0,12`} fill="none" stroke={COL.light} strokeWidth={1.6} />)}
    </g>)}
    <T x={250} y={22} a="start" s={12}>入射光子</T>
    <T x={40} y={95} a="start" s={12}>空间像（表面）</T><Arrow x1={92} y1={102} x2={150} y2={118} c={COL.muted} sw={1} head={5} />
    <T x={40} y={170} a="start" s={12}>潜像（三维）</T><Arrow x1={88} y1={162} x2={163} y2={145} c={COL.muted} sw={1} head={5} />
    <T x={560} y={140} a="start" s={12} c={COL.resistDark}>光刻胶</T>
    <T x={560} y={175} a="start" s={12} c="#4b7aa0">介质</T>
    <T x={560} y={230} a="start" s={12} c="#555">Si 衬底</T>
    <T x={340} y={318} s={12} c={COL.muted}>正胶示意：亮区（黄）在显影时溶解，在介质上开出接触孔</T>
  </Svg></Frame>;
}

// ===================== 图 5.7 三种曝光方式 =====================
export function Fig57() {
  const [hi, setHi] = useState("all");
  const op = k => (hi === "all" || hi === k ? 1 : 0.28);
  return <Frame>
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}><Seg options={[["all", "全部"], ["contact", "接触式"], ["prox", "接近式"], ["proj", "投影式"]]} value={hi} onChange={setHi} /></div>
    <Svg w={680} h={300} title="接触式、接近式、投影式三种曝光方式">
      <T x={190} y={18} s={12} c={COL.muted}>1:1 曝光系统（掩模与晶圆同尺寸）</T>
      {/* 接触 */}
      <g opacity={op("contact")}>
        <ellipse cx={95} cy={40} rx={16} ry={5} fill="#f5d27a" stroke="#c99a2e" />
        <Beam pts={[[84, 44], [106, 44], [140, 92], [50, 92]]} /><Lens cx={95} cy={96} horiz ry={50} rx={7} />
        <Beam pts={[[48, 102], [142, 102], [142, 196], [48, 196]]} />
        <MaskH x={45} y={196} w={100} /><WaferH x={45} y={206} w={100} />
        <T x={95} y={250} w={600}>接触式</T><T x={95} y={268} s={11} c={COL.muted}>掩模压在胶上</T>
      </g>
      {/* 接近 */}
      <g opacity={op("prox")}>
        <ellipse cx={280} cy={40} rx={16} ry={5} fill="#f5d27a" stroke="#c99a2e" />
        <Beam pts={[[269, 44], [291, 44], [325, 92], [235, 92]]} /><Lens cx={280} cy={96} horiz ry={50} rx={7} />
        <Beam pts={[[233, 102], [327, 102], [327, 186], [233, 186]]} />
        <MaskH x={230} y={186} w={100} />
        <Beam pts={[[233, 196], [327, 196], [329, 210], [231, 210]]} o={0.6} />
        <WaferH x={230} y={210} w={100} />
        <line x1={222} y1={196} x2={222} y2={210} stroke={COL.accent} /><TL x={218} y={203} tex={R`g`} anchor="end" w={20} color={COL.accent} />
        <T x={280} y={250} w={600}>接近式</T><T x={280} y={268} s={11} c={COL.muted}>间隙 0–100 µm</T>
      </g>
      {/* 投影 */}
      <g opacity={op("proj")}>
        <ellipse cx={520} cy={24} rx={16} ry={5} fill="#f5d27a" stroke="#c99a2e" />
        <Beam pts={[[509, 28], [531, 28], [565, 64], [475, 64]]} /><Lens cx={520} cy={68} horiz ry={50} rx={7} />
        <Beam pts={[[472, 74], [568, 74], [568, 90], [472, 90]]} /><MaskH x={468} y={90} w={104} />
        <Beam pts={[[474, 100], [566, 100], [556, 150], [484, 150]]} /><Lens cx={520} cy={156} horiz ry={44} rx={7} />
        <Beam pts={[[486, 162], [554, 162], [535, 208], [505, 208]]} /><WaferH x={480} y={208} w={80} />
        <T x={600} y={98} a="start" s={11}>掩模</T><T x={600} y={160} a="start" s={11}>4× 或 5×</T><T x={600} y={175} a="start" s={11}>缩小镜头</T>
        <T x={520} y={250} w={600}>投影式</T><T x={520} y={268} s={11} c={COL.muted}>掩模与晶圆远离，镜头成像</T>
      </g>
      <T x={158} y={204} a="start" s={11}>掩模</T><T x={158} y={216} a="start" s={11} c={COL.resistDark}>胶</T><T x={158} y={228} a="start" s={11}>晶圆</T>
    </Svg>
    <p style={{ fontSize: 13, margin: "4px 0 0", textAlign: "center", color: COL.muted }}>按钮高亮某一种方式；三者的空间像对比见图 5.27 的计算。</p>
  </Frame>;
}

// ===================== 图 5.13 化学放大胶步骤 =====================
export function Fig513() {
  const [step, setStep] = useState("A");
  const [turn, setTurn] = useState(3);
  const xs = [80, 160, 240, 320, 400, 480, 560];
  const blocked = i => step === "A" || step === "B" ? true : step === "C" ? i >= Math.min(turn, 7) : false;
  const acidAt = step === "C" ? Math.min(turn, 6) : step === "D" ? 6 : null;
  return <Frame>
    <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
      <Seg options={[["A", "A 未曝光"], ["B", "B 曝光产酸"], ["C", "C PEB 催化"], ["D", "D 反应结束"]]} value={step} onChange={setStep} />
      {step === "C" && <div style={{ minWidth: 220 }}><Slider label="酸已催化的反应次数" value={turn} min={0} max={7} step={1} onChange={setTurn} /></div>}
    </div>
    <Svg w={680} h={220} title="化学放大光刻胶：光产酸、后烘中酸催化脱保护、酸再生">
      <polyline points={xs.flatMap((x, i) => [[x - 40, 60], [x, 40 + (i % 2) * 0]]).map(([x, y], i) => `${x},${i % 2 ? 40 : 60}`).join(" ") + " 600,60"} fill="none" stroke={COL.ink} strokeWidth={2.4} />
      <T x={612} y={56} a="start" s={12}>PHS 主链</T>
      {xs.map((x, i) => <g key={i}>
        <line x1={x} y1={40} x2={x} y2={78} stroke="#777" strokeWidth={2} />
        {blocked(i) ? <rect x={x - 11} y={78} width={22} height={40} fill="#7f7f86" /> : <circle cx={x} cy={92} r={14} fill={COL.green} />}
        {!blocked(i) && <T x={x} y={96} s={10} c="#fff">OH</T>}
      </g>)}
      {/* PAG / 酸 */}
      {step === "A" && <g><ellipse cx={120} cy={160} rx={26} ry={13} fill="#fff" stroke="#888" /><T x={120} y={164} s={12}>PAG</T><T x={360} y={170} s={12} c={COL.muted}>灰色方块 = 保护基（不溶于碱性显影液）</T></g>}
      {step === "B" && <g>
        <path d="M118,110 q6,6 0,12 q-6,6 0,12 q6,6 0,12" fill="none" stroke={COL.light} strokeWidth={2} transform="translate(0,-10)" />
        <ellipse cx={120} cy={170} rx={26} ry={13} fill="#fff" stroke="#888" /><T x={120} y={174} s={12}>PAG</T>
        <Arrow x1={150} y1={170} x2={200} y2={170} /><ellipse cx={226} cy={170} rx={20} ry={13} fill="#fff4e0" stroke={COL.accent} /><TL x={226} y={170} tex={R`\mathrm{H^+}`} anchor="middle" w={40} color={COL.accent} />
        <T x={450} y={170} s={12} c={COL.muted}>DUV 光子使 PAG 分解，生成酸（潜酸像）</T></g>}
      {acidAt != null && <g>
        <ellipse cx={xs[acidAt] + (step === "D" ? 60 : 0)} cy={160} rx={20} ry={13} fill="#fff4e0" stroke={COL.accent} />
        <TL x={xs[acidAt] + (step === "D" ? 60 : 0)} y={160} tex={R`\mathrm{H^+}`} anchor="middle" w={40} color={COL.accent} />
        {step === "C" && acidAt > 0 && <Arrow x1={xs[acidAt - 1] + 10} y1={150} x2={xs[acidAt] - 16} y2={152} c={COL.accent} sw={1.2} dash="4 3" />}
        <T x={340} y={205} s={12} c={COL.muted}>{step === "C" ? `后烘（PEB）：酸扩散到保护基处、切掉它并再生——已去保护 ${Math.min(turn, 7)} 个，酸仍是 1 个` : "反应结束：曝光区全部变为可溶的 OH 端基；酸本身没有被消耗"}</T>
      </g>}
    </Svg></Frame>;
}

// ===================== 图 5.16 光线追迹（真算 Snell 定律） =====================
// 双凸透镜：两球面半径 Rl，中心厚 tc，折射率 nL；点光源在轴上距透镜前顶点 s 处。
function refract(d, nrm, n1, n2) {   // d、nrm 为单位矢量，nrm 指向入射侧
  const cosi = -(d[0] * nrm[0] + d[1] * nrm[1]), eta = n1 / n2, k = 1 - eta * eta * (1 - cosi * cosi);
  if (k < 0) return null;
  const c = eta * cosi - Math.sqrt(k);
  return [eta * d[0] + c * nrm[0], eta * d[1] + c * nrm[1]];
}
function hitSphere(o, d, cx, Rr, front) {   // 圆心 (cx,0)，半径 Rr；front=true 取较近交点
  const ox = o[0] - cx, oy = o[1], b = ox * d[0] + oy * d[1], c = ox * ox + oy * oy - Rr * Rr, disc = b * b - c;
  if (disc < 0) return null;
  const t = front ? -b - Math.sqrt(disc) : -b + Math.sqrt(disc);
  return t > 1e-9 ? [o[0] + t * d[0], o[1] + t * d[1]] : null;
}
export function Fig516() {
  const Rl = 120, tc = 34, nL = 1.5, v1 = 0;                       // 前顶点 x=0，后顶点 x=tc
  const fEff = 1 / ((nL - 1) * (2 / Rl - (nL - 1) * tc / (nL * Rl * Rl)));   // 厚透镜有效焦距（从主面量起）
  const fThin = fEff * (1 - (nL - 1) * tc / (nL * Rl));                    // 前焦距（从前顶点量起）
  const [s, setS] = useState(Math.round(fThin));
  const rays = useMemo(() => {
    const out = [];
    for (const h of [-36, -24, -12, 0, 12, 24, 36]) {
      const o = [-s, 0], d0 = [s, h]; const L = Math.hypot(...d0), d = [d0[0] / L, d0[1] / L];
      const p1 = hitSphere(o, d, v1 + Rl, Rl, true); if (!p1 || Math.abs(p1[1]) > 44) continue;
      const n1 = [(p1[0] - (v1 + Rl)) / Rl, p1[1] / Rl];                 // 外法线（指向入射侧）
      const d1 = refract(d, n1, 1, nL); if (!d1) continue;
      const p2 = hitSphere(p1, d1, tc - Rl, Rl, false); if (!p2) continue;
      const n2c = [(p2[0] - (tc - Rl)) / Rl, p2[1] / Rl], n2 = [-n2c[0], -n2c[1]];   // 指向玻璃内（入射侧）
      const d2 = refract(d1, n2, nL, 1); if (!d2) continue;
      const tEnd = (300 - p2[0]) / d2[0];
      out.push({ pts: [o, p1, p2, [p2[0] + tEnd * d2[0], p2[1] + tEnd * d2[1]]], ang: Math.atan2(d2[1], d2[0]) * 180 / Math.PI });
    }
    return out;
  }, [s]);
  const X = x => 300 + x * 1.1, Y = y => 120 - y * 1.6;
  const half = Math.sqrt(Rl * Rl - (Rl - tc / 2) ** 2);
  const spread = rays.length ? Math.max(...rays.map(r => Math.abs(r.ang))) : 0;
  return <Frame>
    <Slider label={`点光源到透镜前表面的距离（焦距 $f\\approx${fThin.toFixed(0)}$）`} value={s} min={60} max={240} step={1} onChange={setS} />
    <Svg w={680} h={240} title="点光源经凸透镜的光线追迹，每个界面使用 Snell 定律">
      <line x1={20} y1={Y(0)} x2={660} y2={Y(0)} stroke="#ccc" strokeDasharray="4 4" />
      <path d={`M${X(tc / 2)},${Y(half)} A${Rl * 1.1},${Rl * 1.6} 0 0 0 ${X(tc / 2)},${Y(-half)} A${Rl * 1.1},${Rl * 1.6} 0 0 0 ${X(tc / 2)},${Y(half)} Z`} fill={COL.lens} stroke={COL.lensEdge} />
      {rays.map((r, i) => <polyline key={i} points={r.pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")} fill="none" stroke={COL.light} strokeWidth={1.6} />)}
      <circle cx={X(-s)} cy={Y(0)} r={4} fill={COL.ink} />
      <T x={X(-s)} y={Y(0) + 22} s={12}>点光源</T>
      <T x={560} y={30} s={12} c={COL.muted}>{Math.abs(s - fThin) < 4 ? "出射光近似平行（准直）" : s > fThin ? "出射光会聚" : "出射光发散"}</T>
      <T x={560} y={48} s={12} c={COL.muted}>最大出射角 {spread.toFixed(1)}°</T>
    </Svg>
    <p style={{ fontSize: 13, margin: 0, color: COL.muted }}>每条光线在两个玻璃–空气界面上都用 <span dangerouslySetInnerHTML={{ __html: renderTex(R`n_1\sin\theta_1=n_2\sin\theta_2`) }} /> 计算折射（透镜 <span dangerouslySetInnerHTML={{ __html: renderTex(R`n=1.5`) }} />，球面半径 120、中心厚 34，任意单位）。光源放在焦点上时得到准直光——这正是聚光镜的工作方式。光线追迹在尺寸远大于波长时有效。</p>
  </Frame>;
}

// ===================== 图 5.17 小孔衍射示意 =====================
export function Fig517() {
  return <Frame><Svg w={680} h={220} title="光通过窄缝后在像面上铺开的范围远大于几何投影">
    <ellipse cx={150} cy={110} rx={8} ry={18} fill="#f5d27a" stroke="#c99a2e" />
    <Beam pts={[[158, 100], [158, 120], [330, 190], [330, 30]]} o={0.7} />
    <rect x={330} y={20} width={8} height={82} fill={COL.ink} /><rect x={330} y={118} width={8} height={82} fill={COL.ink} />
    <Beam pts={[[338, 104], [338, 116], [490, 175], [490, 45]]} />
    <line x1={338} y1={104} x2={490} y2={98} stroke={COL.accent} strokeDasharray="5 4" /><line x1={338} y1={116} x2={490} y2={122} stroke={COL.accent} strokeDasharray="5 4" />
    <rect x={490} y={20} width={8} height={180} fill={COL.ink} />
    <T x={150} y={150} s={12}>光源</T><T x={334} y={14} s={12}>小孔</T><T x={494} y={14} s={12}>像面</T>
    <T x={600} y={100} s={12} c={COL.accent}>几何投影</T><T x={600} y={116} s={12} c={COL.accent}>（虚线）</T>
    <T x={600} y={150} s={12} c="#a26b10">实际光斑</T>
  </Svg></Frame>;
}

// ===================== 图 5.18 惠更斯子波（Canvas 真算） =====================
export function Fig518() {
  const [mode, setMode] = useState("b");
  const [Wl, setWl] = useState(3);     // 缝宽 / 波长
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const W = 340, H = 200, ctx = cv.getContext("2d"), img = ctx.createImageData(W, H);
    const lamPx = 14, k = 2 * Math.PI / lamPx, x0 = 40;
    const half = mode === "a" ? 1e9 : Wl * lamPx / 2;
    const n = mode === "a" ? 1 : Math.max(6, Math.round(Wl * 8));
    const ys = Array.from({ length: n }, (_, i) => H / 2 - half + (i + 0.5) * (2 * half / n));
    for (let py = 0; py < H; py++) for (let px = 0; px < W; px++) {
      let v;
      if (px < x0) v = 0.55 + 0.45 * Math.cos(k * (px - x0));                     // 入射平面波（瞬时场）
      else if (mode === "a") v = 0.55 + 0.45 * Math.cos(k * (px - x0));
      else {
        let re = 0, im = 0;
        for (const y of ys) { const r = Math.hypot(px - x0, py - y) + 0.5; const a = 1 / Math.sqrt(r); re += a * Math.cos(k * r); im += a * Math.sin(k * r); }
        const amp = Math.hypot(re, im) / (n / Math.sqrt(Math.max(1, Wl * lamPx * 0.8)));
        v = Math.min(1, 0.9 * amp) * (0.6 + 0.4 * Math.cos(Math.atan2(im, re)));
      }
      const o = 4 * (py * W + px), c = Math.max(0, Math.min(1, v));
      img.data[o] = 255 - 30 * c; img.data[o + 1] = 255 - 95 * c; img.data[o + 2] = 255 - 220 * c; img.data[o + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    if (mode === "b") { ctx.fillStyle = "#333"; ctx.fillRect(x0 - 3, 0, 6, H / 2 - half); ctx.fillRect(x0 - 3, H / 2 + half, 6, H); }
  }, [mode, Wl]);
  return <Frame>
    <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
      <Seg options={[["a", "a) 自由空间"], ["b", "b) 通过小孔"]]} value={mode} onChange={setMode} />
      {mode === "b" && <div style={{ minWidth: 240 }}><Slider label="缝宽 / 波长" value={Wl} min={0.5} max={8} step={0.5} onChange={setWl} /></div>}
    </div>
    <canvas ref={ref} width={340} height={200} style={{ width: "100%", maxWidth: 520, display: "block", margin: "8px auto", imageRendering: "auto", borderRadius: 6 }} />
    <p style={{ fontSize: 13, margin: 0, color: COL.muted }}>颜色深浅为把缝内各点发出的球面子波逐点叠加（含相位）后得到的瞬时场。缝越窄，透过的子波越少，波前越接近单个球面波，光向两侧张开得越厉害；缝宽远大于波长时，中央区域几乎仍是平面波。</p>
  </Frame>;
}

// ===================== 图 5.19 透镜收集衍射级（交互） =====================
export function Fig519() {
  const [pitchK, setPitchK] = useState(2.2);   // 周期 p / λ
  const [NA, setNA] = useState(0.6);
  const lam = 1, p = pitchK * lam;
  const orders = []; for (let m = -6; m <= 6; m++) { const s = m * lam / p; if (Math.abs(s) < 1) orders.push({ m, s, pass: Math.abs(s) <= NA + 1e-9 }); }
  const passM = orders.filter(o => o.pass).map(o => o.m);
  const img = useMemo(() => {
    const cs = m => (m === 0 ? 0.5 : Math.sin(Math.PI * m / 2) / (Math.PI * m));
    return Array.from({ length: 241 }, (_, i) => { const x = (i / 240) * 2 * p; let a = 0; for (const m of passM) a += cs(m) * Math.cos(2 * Math.PI * m * x / p); return [x / p, a * a]; });
  }, [pitchK, NA]);
  const ymax = Math.max(1.05, ...img.map(q => q[1]));
  const ax = 70, ay = 150, L = 200;   // 光栅位置与射线长度
  const lensX = ax + 230, aHalf = Math.asin(NA);
  return <Frame>
    <Slider label={`光栅周期 $p/\\lambda=${pitchK.toFixed(2)}$`} value={pitchK} min={0.6} max={6} step={0.05} onChange={setPitchK} />
    <Slider label={`物方数值孔径 $\\mathrm{NA}=\\sin\\alpha=${NA.toFixed(2)}$`} value={NA} min={0.1} max={0.95} step={0.01} onChange={setNA} />
    <Svg w={680} h={300} title="掩模光栅的衍射级与透镜接收角">
      <rect x={ax - 4} y={60} width={8} height={180} fill={COL.ox} stroke="#7aa6c2" />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={ax - 4} y={64 + i * 20} width={8} height={10} fill={COL.cr} />)}
      <Arrow x1={10} y1={ay} x2={ax - 8} y2={ay} c={COL.light} />
      <T x={ax} y={52} s={12}>掩模光栅</T>
      {/* 接收锥 */}
      <polygon points={`${ax},${ay} ${ax + L * Math.cos(aHalf) * 1.2},${ay - L * Math.sin(aHalf) * 1.2} ${ax + L * Math.cos(aHalf) * 1.2},${ay + L * Math.sin(aHalf) * 1.2}`} fill="rgba(91,143,150,0.12)" />
      {orders.map(o => { const th = Math.asin(o.s); return <g key={o.m}>
        <Arrow x1={ax + 6} y1={ay} x2={ax + L * Math.cos(th)} y2={ay - L * Math.sin(th)} c={o.pass ? COL.light : "#bbb"} sw={o.pass ? 2.2 : 1.2} dash={o.pass ? undefined : "4 3"} />
        <T x={ax + (L + 16) * Math.cos(th)} y={ay - (L + 16) * Math.sin(th) + 4} s={11} c={o.pass ? "#a26b10" : "#999"}>{o.m > 0 ? "+" + o.m : o.m}</T></g>; })}
      <ellipse cx={lensX} cy={ay} rx={8} ry={Math.min(118, 230 * Math.tan(aHalf))} fill={COL.lens} stroke={COL.lensEdge} opacity={0.9} />
      <TL x={lensX + 14} y={ay - Math.min(118, 230 * Math.tan(aHalf)) + 6} tex={R`\alpha=${(aHalf * 180 / Math.PI).toFixed(0)}^\circ`} w={90} />
      {/* 重建像 */}
      <g transform="translate(420,60)">
        <rect x={0} y={0} width={240} height={150} fill="#fff" stroke="#ccc" />
        <polyline points={[[0, 0], [0.25, 0], [0.25, 1], [0.75, 1], [0.75, 0], [1.25, 0], [1.25, 1], [1.75, 1], [1.75, 0], [2, 0]].map(([x, y]) => `${x * 120},${150 - y / ymax * 140}`).join(" ")} fill="none" stroke="#bbb" strokeDasharray="4 3" />
        <polyline points={img.map(([x, y]) => `${x * 120},${150 - y / ymax * 140}`).join(" ")} fill="none" stroke={COL.accent} strokeWidth={2} />
        <T x={120} y={168} s={12}>像面强度（两个周期）</T>
      </g>
    </Svg>
    <p style={{ fontSize: 13, margin: 0, color: COL.muted }} dangerouslySetInnerHTML={{ __html: `第 m 级衍射方向满足 ${renderTex(R`\sin\theta_m=m\lambda/p`)}；只有 ${renderTex(R`|\sin\theta_m|\le\mathrm{NA}`)} 的级次进入透镜。当前收集到 ${passM.length} 个级次（${passM.join("、")}）。${passM.length < 2 ? "<b>只剩零级：像面是均匀照明，图形完全丢失。</b>" : passM.length <= 3 ? `零级加 ${renderTex(R`\pm1`)} 级：得到正弦形的像，周期对了，但边缘圆滑。` : "收集的级次越多，像越接近方波。"}虚线为掩模透过率（相干照明，${renderTex(R`\sigma=0`)}）。` }} />
  </Frame>;
}

// ===================== 图 5.23 透镜分辨两点 =====================
export function Fig523() {
  return <Frame><Svg w={680} h={260} title="两点光源经透镜成像：入瞳孔径、接收半角与焦距">
    <line x1={60} y1={130} x2={620} y2={130} stroke="#ccc" strokeDasharray="4 4" />
    <line x1={250} y1={20} x2={250} y2={92} stroke={COL.ink} strokeWidth={2} /><line x1={250} y1={168} x2={250} y2={240} stroke={COL.ink} strokeWidth={2} />
    <ellipse cx={300} cy={130} rx={12} ry={75} fill={COL.lens} stroke={COL.lensEdge} />
    <polyline points="90,130 300,58 560,130 300,202 90,130" fill="none" stroke={COL.ink} strokeWidth={1.4} />
    <polyline points="90,150 300,58 560,112 300,202 90,150" fill="none" stroke="#999" strokeWidth={1.2} />
    <line x1={560} y1={40} x2={560} y2={220} stroke={COL.ink} strokeWidth={2} />
    <circle cx={90} cy={130} r={4} fill={COL.ink} /><circle cx={90} cy={150} r={4} fill="#999" />
    <circle cx={560} cy={130} r={4} fill={COL.ink} /><circle cx={560} cy={112} r={4} fill="#999" />
    <T x={76} y={134} a="end">A</T><T x={76} y={156} a="end" c="#999">B</T><T x={574} y={134} a="start">A</T><T x={574} y={114} a="start" c="#999">B</T>
    <Arrow x1={232} y1={130} x2={232} y2={94} c={COL.blue} sw={1.2} head={5} /><Arrow x1={232} y1={94} x2={232} y2={166} c={COL.blue} sw={1.2} head={5} />
    <TL x={226} y={130} tex={R`d`} anchor="end" w={20} color={COL.blue} />
    <path d="M150,130 A60,60 0 0 0 147,110" fill="none" stroke={COL.accent} /><TL x={158} y={116} tex={R`\alpha`} w={20} color={COL.accent} />
    <Arrow x1={300} y1={225} x2={560} y2={225} sw={1.2} head={5} /><Arrow x1={560} y1={225} x2={300} y2={225} sw={1.2} head={5} /><TL x={430} y={240} tex={R`f`} anchor="middle" w={20} />
    <T x={250} y={14} s={12}>入瞳</T><T x={560} y={32} s={12}>像面</T><T x={90} y={100} s={12}>两个点光源</T>
  </Svg></Frame>;
}

// ===================== 图 5.24 焦深几何（交互） =====================
export function Fig524() {
  const [NA, setNA] = useState(0.5);
  const [del, setDel] = useState(1.0);     // δ 以 λ/(2NA²) 为单位
  const a = Math.asin(NA), dU = del;        // 单位化：δ0 = λ/(2NA²)
  const opd = dU * (1 - Math.cos(a)) / (2 * NA * NA);   // 以 λ 为单位：δ(1−cosα)，δ = del·λ/(2NA²)
  const cx = 470, cy = 140, Rr = 230, shift = 26 * del;
  return <Frame>
    <Slider label={`$\\mathrm{NA}=\\sin\\alpha=${NA.toFixed(2)}$`} value={NA} min={0.1} max={0.9} step={0.01} onChange={setNA} />
    <Slider label={`离焦量 $\\delta$（以 $\\lambda/2\\mathrm{NA}^2$ 为单位）$=${del.toFixed(2)}$`} value={del} min={0} max={2} step={0.05} onChange={setDel} />
    <Svg w={680} h={290} title="离焦造成边缘光线相对轴上光线的光程差">
      <line x1={180} y1={cy} x2={600} y2={cy} stroke="#ccc" strokeDasharray="4 4" />
      <line x1={232} y1={cy - Rr * Math.sin(a) - 12} x2={232} y2={cy + Rr * Math.sin(a) + 12} stroke={COL.ink} strokeWidth={1} />
      {/* 理想会聚球面波（黑）与对准晶圆的球面波（红） */}
      <path d={`M${cx - Rr * Math.cos(a)},${cy - Rr * Math.sin(a)} A${Rr},${Rr} 0 0 0 ${cx - Rr * Math.cos(a)},${cy + Rr * Math.sin(a)}`} fill="none" stroke={COL.ink} strokeWidth={2} />
      <path d={`M${cx + shift - (Rr + shift) * Math.cos(a)},${cy - (Rr + shift) * Math.sin(a)} A${Rr + shift},${Rr + shift} 0 0 0 ${cx + shift - (Rr + shift) * Math.cos(a)},${cy + (Rr + shift) * Math.sin(a)}`} fill="none" stroke={COL.accent} strokeWidth={1.6} strokeDasharray="6 4" />
      <line x1={cx - Rr * Math.cos(a)} y1={cy - Rr * Math.sin(a)} x2={cx} y2={cy} stroke={COL.ink} /><line x1={cx - Rr * Math.cos(a)} y1={cy + Rr * Math.sin(a)} x2={cx} y2={cy} stroke={COL.ink} />
      <path d={`M${cx - 80},${cy} A80,80 0 0 1 ${cx - 80 * Math.cos(a)},${cy - 80 * Math.sin(a)}`} fill="none" stroke={COL.blue} /><TL x={cx - 100} y={cy - 22} tex={R`\alpha`} w={20} color={COL.blue} />
      <rect x={cx + shift} y={cy - 70} width={30} height={140} fill={COL.si} stroke="#777" /><rect x={cx + shift - 4} y={cy - 70} width={4} height={140} fill={COL.resist} />
      <T x={cx + shift + 15} y={cy + 90} s={12}>晶圆</T>
      <circle cx={cx} cy={cy} r={3} fill={COL.ink} />
      {del > 0.02 && <><Arrow x1={cx} y1={cy + 24} x2={cx + shift} y2={cy + 24} sw={1} head={5} c={COL.accent} /><TL x={cx + shift / 2} y={cy + 38} tex={R`\delta`} anchor="middle" w={20} color={COL.accent} /></>}
      <T x={232} y={cy + Rr * Math.sin(a) + 28} s={12}>透镜出瞳</T>
      <T x={cx - 10} y={cy - 8} a="end" s={11} c={COL.muted}>焦点</T>
    </Svg>
    <div style={{ fontSize: 13.5, textAlign: "center" }} dangerouslySetInnerHTML={{ __html: `边缘光线光程差 ${renderTex(R`\mathrm{OPD}=\delta(1-\cos\alpha)=${opd.toFixed(3)}\,\lambda`)}；Rayleigh 判据要求 ${renderTex(R`\le\lambda/4`)}。${opd <= 0.25 + 1e-9 ? "✔ 仍在焦深内" : "✘ 已超出焦深"}（小角近似下恰在 ${renderTex(R`\delta=\lambda/2\mathrm{NA}^2`)} 时等于 ${renderTex(R`\lambda/4`)}；大 NA 时精确值 ${renderTex(R`\delta=\lambda/4(1-\cos\alpha)=${(0.25 / (1 - Math.cos(a)) * 2 * NA * NA).toFixed(2)}\times\lambda/2\mathrm{NA}^2`)}）。` }} />
  </Frame>;
}

// ===================== 图 5.25 MTF 概念示意 =====================
export function Fig525() {
  const f = useMemo(() => P.gratingImage({ p: 1, lam: 0.62, NA: 1, sigma: 0.5 }), []);
  const pts = Array.from({ length: 121 }, (_, i) => { const x = i / 60; return [x, f(x + 0.5)]; });
  const ym = Math.max(...pts.map(q => q[1]));
  return <Frame><Svg w={680} h={330} title="调制传递函数：掩模处光强接近理想方波，晶圆上的空间像被衍射抹平">
    <ellipse cx={60} cy={90} rx={6} ry={14} fill="#f5d27a" stroke="#c99a2e" /><T x={60} y={60} s={12}>光源</T>
    <Beam pts={[[66, 80], [66, 100], [150, 150], [150, 30]]} />
    <Lens cx={150} cy={90} ry={62} rx={9} /><T x={150} y={18} s={12}>聚光镜</T>
    <Beam pts={[[160, 34], [160, 146], [240, 146], [240, 34]]} />
    <rect x={240} y={30} width={7} height={120} fill={COL.ox} stroke="#7aa6c2" />{[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x={247} y={36 + i * 20} width={3} height={10} fill={COL.cr} />)}
    <T x={244} y={18} s={12}>掩模</T>
    <Beam pts={[[252, 80], [252, 100], [380, 150], [380, 30]]} />
    <line x1={340} y1={20} x2={340} y2={50} stroke={COL.ink} strokeWidth={2} /><line x1={340} y1={130} x2={340} y2={160} stroke={COL.ink} strokeWidth={2} /><T x={340} y={14} s={12}>入瞳</T>
    <Lens cx={390} cy={90} ry={62} rx={9} /><T x={410} y={18} s={12}>物镜（聚焦镜）</T>
    <Beam pts={[[400, 34], [400, 146], [470, 92], [470, 88]]} />
    <rect x={470} y={40} width={5} height={100} fill={COL.resist} /><rect x={475} y={40} width={30} height={100} fill={COL.si} stroke="#777" /><T x={500} y={156} s={12}>胶/晶圆</T>
    {/* 下方两张强度图 */}
    <g transform="translate(110,190)">
      <line x1={0} y1={110} x2={200} y2={110} stroke={COL.ink} /><line x1={0} y1={110} x2={0} y2={0} stroke={COL.ink} />
      <polyline points="0,110 25,110 25,10 75,10 75,110 125,110 125,10 175,10 175,110 200,110" fill="none" stroke={COL.blue} strokeWidth={2} />
      <T x={100} y={130} s={12}>掩模出射光强（几乎理想）</T><T x={-6} y={14} a="end" s={11}>1</T><T x={-6} y={112} a="end" s={11}>0</T>
    </g>
    <g transform="translate(400,190)">
      <line x1={0} y1={110} x2={220} y2={110} stroke={COL.ink} /><line x1={0} y1={110} x2={0} y2={0} stroke={COL.ink} />
      <polyline points={pts.map(([x, y]) => `${x * 110},${110 - y / ym * 100}`).join(" ")} fill="none" stroke={COL.accent} strokeWidth={2} />
      <TL x={115} y={8} tex={R`I_{\rm MAX}`} w={60} /><TL x={60} y={102} tex={R`I_{\rm MIN}`} w={60} />
      <T x={110} y={130} s={12}>晶圆上的空间像</T><T x={-6} y={14} a="end" s={11}>1</T><T x={-6} y={112} a="end" s={11}>0</T>
    </g>
    <Arrow x1={248} y1={156} x2={200} y2={196} c={COL.muted} sw={1} head={5} /><Arrow x1={478} y1={146} x2={520} y2={196} c={COL.muted} sw={1} head={5} />
  </Svg></Frame>;
}

// ===================== 图 5.26 空间相干性 σ（交互） =====================
export function Fig526() {
  const [sigma, setSigma] = useState(0.5);
  const d = 150, S = sigma * d, fx = 230;
  const pts = sigma < 0.02 ? [0] : [-1, -0.5, 0, 0.5, 1].map(t => t * S / 2);
  const angs = pts.map(y => Math.atan2(-y, fx - 60));
  return <Frame>
    <Slider label={`$\\sigma=S/d=${sigma.toFixed(2)}$`} value={sigma} min={0} max={1} step={0.01} onChange={setSigma} />
    <Svg w={680} h={260} title="光源尺寸与聚光镜孔径之比：点光源给出单一方向的平面波，有限尺寸光源给出一束不同方向的平面波">
      {sigma < 0.02 ? <circle cx={60} cy={130} r={4} fill={COL.ink} /> : <ellipse cx={60} cy={130} rx={6} ry={S / 2} fill="#f5d27a" stroke="#c99a2e" />}
      {pts.map((y, i) => <g key={i}><line x1={60} y1={130 + y} x2={fx} y2={130 - d / 2} stroke={COL.light} strokeWidth={1} opacity={0.7} /><line x1={60} y1={130 + y} x2={fx} y2={130 + d / 2} stroke={COL.light} strokeWidth={1} opacity={0.7} /></g>)}
      <Lens cx={fx} cy={130} ry={d / 2 + 4} rx={12} />
      <Arrow x1={fx + 26} y1={130 - d / 2} x2={fx + 26} y2={130 + d / 2} sw={1} head={5} c={COL.blue} /><Arrow x1={fx + 26} y1={130 + d / 2} x2={fx + 26} y2={130 - d / 2} sw={1} head={5} c={COL.blue} /><TL x={fx + 32} y={130} tex={R`d`} w={20} color={COL.blue} />
      {sigma >= 0.02 && <TL x={42} y={130} tex={R`S`} anchor="end" w={20} />}
      {[-60, -30, 0, 30, 60].map(y => angs.map((a, j) => { const L = 60, x0 = 340, y0 = 130 + y; return <Arrow key={y + "_" + j} x1={x0} y1={y0 - L / 2 * Math.tan(a) * 0} x2={x0 + L * Math.cos(a)} y2={y0 + L * Math.sin(a)} c={j === Math.floor(angs.length / 2) ? COL.accent : COL.light} sw={1.3} head={5} />; }))}
      <rect x={420} y={40} width={7} height={180} fill={COL.ox} stroke="#7aa6c2" />{Array.from({ length: 8 }, (_, i) => <rect key={i} x={427} y={46 + i * 22} width={3} height={11} fill={COL.cr} />)}
      <T x={60} y={30} s={12}>光源</T><T x={fx} y={30} s={12}>聚光镜</T><T x={424} y={30} s={12}>掩模</T>
      <T x={560} y={110} s={12} c={COL.muted}>{sigma < 0.02 ? "理想相干：" : "部分相干："}</T>
      <T x={560} y={130} s={12} c={COL.muted}>{sigma < 0.02 ? "所有平面波同一方向" : `入射角展宽 ${"\u00b1"}${(Math.atan(S / 2 / fx) * 180 / Math.PI).toFixed(1)} 度`}</T>
    </Svg></Frame>;
}

// ===================== 图 5.30 光刻胶工艺流程 =====================
export function Fig530() {
  const L = [["表面清洗、脱水烘", "为涂胶准备表面"], ["涂 HMDS", "增粘剂（单分子层）"], ["旋涂光刻胶", "典型 3000–6000 rpm，约 30 s"], ["前烘", "典型 10–30 min @ 90–100 °C"]];
  const Rr = [["对准、曝光", "i 线、DUV 或 EUV 曝光机"], ["曝光后烘（PEB）", "典型 10 min @ 100 °C；CA 胶的关键步"], ["显影", "喷淋或水坑（puddle）式"], ["后烘（坚膜）", "典型 10–30 min @ 125–150 °C"]];
  const box = (x, y, [a, b], c) => <g key={a}><rect x={x} y={y} width={270} height={46} rx={6} fill={c} stroke="#b9b2a3" /><T x={x + 135} y={y + 20} s={13.5} w={600}>{a}</T><T x={x + 135} y={y + 37} s={11.5} c={COL.muted}>{b}</T></g>;
  return <Frame><Svg w={680} h={300} title="典型光刻胶工艺流程">
    {L.map((s, i) => box(40, 20 + i * 70, s, i === 2 ? "#ede6f8" : "#f1efe9"))}
    {Rr.map((s, i) => box(370, 20 + i * 70, s, i === 0 ? "#fff1d6" : i === 1 ? "#fde6e1" : "#f1efe9"))}
    {[0, 1, 2].map(i => <Arrow key={"l" + i} x1={175} y1={66 + i * 70} x2={175} y2={90 + i * 70} />)}
    {[0, 1, 2].map(i => <Arrow key={"r" + i} x1={505} y1={66 + i * 70} x2={505} y2={90 + i * 70} />)}
    <polyline points="175,276 175,292 340,292 340,8 505,8 505,16" fill="none" stroke={COL.ink} strokeWidth={1.6} /><polygon points="505,20 500,12 510,12" fill={COL.ink} />
  </Svg></Frame>;
}
