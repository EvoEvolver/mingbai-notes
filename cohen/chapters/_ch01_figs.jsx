// 第 I 章自绘插图（SVG），不使用原书图片。<Fig> 生成锚点 fig-<n>，图注支持公式。
import { TxI, renderTex } from "@kit";

const R = String.raw;
const INK = "#1f1b16", RED = "#c0392b", BLUE = "#2c4a6e", GREY = "#9a948b", GOLD = "#b8862b";

export function Fig({ n, caption, children }) {
  return (
    <figure className="tb-fig" id={`fig-${n}`}>
      <div className="tb-fig-int">{children}</div>
      <figcaption><b>图 {n}</b> <TxI>{caption}</TxI></figcaption>
    </figure>);
}
function T({ tex, x, y, w = 120, h = 24, align = "left", color, size }) {
  const dx = align === "center" ? -w / 2 : align === "right" ? -w : 0;
  return <foreignObject x={x + dx} y={y - h / 2} width={w} height={h} style={{ overflow: "visible", pointerEvents: "none" }}>
    <div className="plot-tex" style={{ textAlign: align, color, fontSize: size, whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} /></foreignObject>;
}
const path = (f, x0, x1, n, X, Y) => { let s = ""; for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; s += `${i ? "L" : "M"}${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`; } return s; };

// ---------- 图 1：杨氏双缝（a 装置；b 单缝强度与其和；c 双缝强度） ----------
export function YoungSetup() {
  const W = 680, H = 300;
  const sinc = z => (Math.abs(z) < 1e-9 ? 1 : Math.sin(z) / z), a = 0.3, d = 1.5;
  const I1 = u => sinc(Math.PI * a * u) ** 2, I = u => 4 * I1(u) * Math.cos(Math.PI * d * u) ** 2;
  // b、c 两个小图：横向为强度，纵向为屏上位置 u ∈ [−3.5, 3.5]
  const panel = (x0, f, g, label) => {
    const Y = u => 150 - u * 36, X = v => x0 + v * 60;
    return <g>
      <line x1={x0} x2={x0} y1={20} y2={280} stroke={INK} />
      {g && <path d={path(u => g(u), -3.5, 3.5, 300, u => X(g(u)), u => Y(u)).replace(/L([\d.]+),([\d.]+)/g, "L$1,$2")} fill="none" stroke={GREY} strokeDasharray="5 4" />}
      <path d={(() => { let s = ""; for (let i = 0; i <= 400; i++) { const u = -3.5 + 7 * i / 400; s += `${i ? "L" : "M"}${X(f(u)).toFixed(1)},${Y(u).toFixed(1)}`; } return s; })()} fill="none" stroke={INK} strokeWidth={1.6} />
      <text x={x0 + 4} y={296} fontSize="13" fill="#6b6257">{label}</text>
    </g>;
  };
  const sumPath = (x0, f) => { const Y = u => 150 - u * 36, X = v => x0 + v * 60; let s = ""; for (let i = 0; i <= 300; i++) { const u = -3.5 + 7 * i / 300; s += `${i ? "L" : "M"}${X(f(u)).toFixed(1)},${Y(u).toFixed(1)}`; } return s; };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
      {/* a：装置 */}
      <circle cx={30} cy={150} r={6} fill={GOLD} />
      <T tex={R`\mathscr S`} x={24} y={128} w={20} />
      {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M${48 + i * 18},120 Q${56 + i * 18},150 ${48 + i * 18},180`} fill="none" stroke={GREY} />)}
      <line x1={150} x2={150} y1={30} y2={128} stroke={INK} strokeWidth={4} />
      <line x1={150} x2={150} y1={136} y2={164} stroke={INK} strokeWidth={4} />
      <line x1={150} x2={150} y1={172} y2={270} stroke={INK} strokeWidth={4} />
      <T tex={R`F_1`} x={158} y={126} w={30} /><T tex={R`F_2`} x={158} y={176} w={30} />
      <T tex={R`\sym{plate}{\mathscr P}`} x={140} y={20} w={20} align="right" />
      <line x1={150} y1={132} x2={300} y2={60} stroke={GREY} strokeDasharray="3 3" />
      <line x1={150} y1={168} x2={300} y2={60} stroke={GREY} strokeDasharray="3 3" />
      <line x1={300} x2={300} y1={20} y2={280} stroke={INK} strokeWidth={2} />
      <T tex={R`\sym{screen}{\mathscr E}`} x={306} y={20} w={20} />
      <T tex={R`x`} x={306} y={60} w={20} />
      <text x={150} y={296} fontSize="13" fill="#6b6257" textAnchor="middle">(a) 装置</text>
      {/* b：单缝强度 I₁、I₂（实线）与其和（虚线）；两缝相距很近，I₁ 与 I₂ 几乎重合 */}
      {panel(350, u => I1(u - 0.25) * 0.95, null, "(b) 单缝图样及其和")}
      <path d={sumPath(350, u => I1(u + 0.25) * 0.95)} fill="none" stroke={INK} strokeWidth={1.6} />
      <path d={sumPath(350, u => (I1(u - 0.25) + I1(u + 0.25)) * 0.95)} fill="none" stroke={GREY} strokeDasharray="5 4" />
      {/* c：两缝同开 */}
      {panel(520, u => I(u) * 0.95 * 0.5, null, "(c) 双缝同开：I(x)")}
    </svg>);
}

// ---------- 图 7：方势（a）代表陡变的真实势（b）及其力（c） ----------
export function SquareVsReal() {
  const W = 680, H = 330, x0 = 60, x1 = 640, X = u => x0 + (u + 1) / 8 * (x1 - x0);
  const sq = u => (u < 2 ? 1 : u < 4.5 ? -0.4 : 0.6);
  const s = 0.12, th = z => Math.tanh(z / s);
  const real = u => 1 + (-1.4) * 0.5 * (1 + th(u - 2)) + 1.0 * 0.5 * (1 + th(u - 4.5));
  const force = u => -((-1.4) * 0.5 / s / Math.cosh((u - 2) / s) ** 2 + 1.0 * 0.5 / s / Math.cosh((u - 4.5) / s) ** 2);
  const rows = [{ f: sq, y0: 70, k: 38, lab: "(a) 方势" }, { f: real, y0: 175, k: 38, lab: "(b) 真实的势" }, { f: u => force(u) / 6, y0: 280, k: 38, lab: "(c) 力 F = −dV/dx" }];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
      {rows.map(({ f, y0, k, lab }, i) => <g key={i}>
        <line x1={x0} x2={x1} y1={y0} y2={y0} stroke={GREY} />
        <path d={path(f, -1, 7, 1200, X, v => y0 - v * k)} fill="none" stroke={i === 2 ? RED : INK} strokeWidth={1.8} />
        <text x={x1} y={y0 + 22} fontSize="13" fill="#6b6257" textAnchor="end">{lab}</text>
        <text x={x0 - 14} y={y0 + 4} fontSize="12" fill="#6b6257" textAnchor="end">0</text>
      </g>)}
      <T tex={R`x`} x={x1 + 4} y={280} w={20} />
    </svg>);
}

// ---------- 图 8–10：三种方势（单独的示意，交互版在图 D 中） ----------
export function SquareShapes() {
  const W = 680, H = 150, items = [
    { lab: "势阶（图 8）", pts: [[0, 0], [60, 0], [60, 1], [180, 1]], marks: [[60, R`x_1`]] },
    { lab: "势垒（图 9）", pts: [[0, 0], [60, 0], [60, 1], [110, 1], [110, 0], [180, 0]], marks: [[60, R`x_1`], [110, R`x_2`]] },
    { lab: "势阱（图 10）", pts: [[0, 0], [60, 0], [60, -1], [110, -1], [110, 0], [180, 0]], marks: [[60, R`x_1`], [110, R`x_2`]] },
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="plot-svg">
      {items.map((it, i) => { const ox = 50 + i * 215, oy = 75, Y = v => oy - v * 45; return <g key={i}>
        <line x1={ox} x2={ox + 190} y1={oy} y2={oy} stroke={GREY} />
        <polyline points={it.pts.map(([x, v]) => `${ox + x},${Y(v)}`).join(" ")} fill="none" stroke={INK} strokeWidth={2} />
        {it.marks.map(([x, t], j) => <T key={j} tex={t} x={ox + x} y={i === 2 ? oy - 12 : oy + 14} w={30} align="center" />)}
        <T tex={i === 2 ? R`-V_0` : R`V_0`} x={ox - 2} y={Y(i === 2 ? -1 : 1)} w={40} align="right" />
        <text x={ox + 95} y={H - 6} fontSize="13" fill="#6b6257" textAnchor="middle">{it.lab}</text>
      </g>; })}
    </svg>);
}
