// 第 5 章（下）的小工具：页内引用记号、跨页引用第 5 章（上）、SVG 基础件与材料配色。
// 本章与第 5 章（上）共用编号前缀 "5."，框架的 \eqref/\figref/\secref 会把 5.x 一律解析到 ch05 页面；
// 所以本章内部引用改用 \eqb{} \figb{} \secb{}（页内滚动），引用上半章用 \eqa{} \figa{} \seca{}（跳到 ch05）。
import { extendInline, pageUrl, renderTex } from "@kit";

const local = (kind, label) => (n, k) => (
  <a key={k} className={"ref ref-" + kind} href={`#${kind}-${n}`} onClick={e => {
    const el = document.getElementById(`${kind}-${n}`);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "center" }); el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); }
  }}>{label(n)}</a>);
const remote = (kind, label) => (n, k) => <a key={k} className={"ref ref-" + kind} href={pageUrl("ch05", `${kind}-${n}`)}>{label(n)}</a>;

extendInline("eqb", local("eq", n => `(${n})`));
extendInline("figb", local("fig", n => `图 ${n}`));
extendInline("secb", local("sec", n => `§${n}`));
extendInline("eqa", remote("eq", n => `第 5 章（上）式 (${n})`));
extendInline("figa", remote("fig", n => `第 5 章（上）图 ${n}`));
extendInline("seca", remote("sec", n => `第 5 章（上）§${n}`));

// ---------- 材料配色（全书约定） ----------
export const COL = {
  si: "#a3a3a3", siDark: "#7d7d7d", ox: "#bfe0f2", nit: "#86c08a", poly: "#a5523a", metal: "#d9a63c",
  pr: "#9b7cc4", prLight: "#cdbbe6", chrome: "#1f1b16", quartz: "#eaf4f8", light: "#e8b400", red: "#c0392b", blue: "#2c4a6e", ink: "#1f1b16", muted: "#777",
};

// ---------- SVG 基础件 ----------
export function Svg({ w = 680, h = 300, title, children, style }) {
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} style={{ width: "100%", maxWidth: w, display: "block", margin: "0 auto", fontFamily: "var(--sans)", fontSize: 13, ...style }}>{title && <title>{title}</title>}{children}</svg>;
}
export const Txt = ({ x, y, children, a = "middle", s = 13, c = COL.ink, w, ...rest }) => <text x={x} y={y} textAnchor={a} fontSize={s} fill={c} fontWeight={w} {...rest}>{children}</text>;
export function Arrow({ x1, y1, x2, y2, c = COL.ink, w = 1.5, head = 7, dash }) {
  const a = Math.atan2(y2 - y1, x2 - x1), h1 = [x2 - head * Math.cos(a - 0.4), y2 - head * Math.sin(a - 0.4)], h2 = [x2 - head * Math.cos(a + 0.4), y2 - head * Math.sin(a + 0.4)];
  return <g><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={w} strokeDasharray={dash} /><polygon points={`${x2},${y2} ${h1.join(",")} ${h2.join(",")}`} fill={c} /></g>;
}
export const Lens = ({ x, y, h = 120, w = 22, fill = "#dde6ee" }) => <ellipse cx={x} cy={y} rx={w / 2} ry={h / 2} fill={fill} stroke={COL.ink} strokeWidth={1.4} />;
export const Hatch = ({ id, c = COL.pr }) => <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill={c} opacity="0.35" /><line x1="0" y1="0" x2="0" y2="6" stroke={c} strokeWidth="2" /></pattern>;
// 统一的控件行
export const Row = ({ children }) => <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4em 1.2em", alignItems: "center", margin: "0.4em 0" }}>{children}</div>;
export const Readout = ({ children }) => <div style={{ fontSize: 14, background: "var(--card, #faf8f3)", border: "1px solid var(--line, #ddd)", borderRadius: 6, padding: "0.5em 0.8em", margin: "0.5em 0" }}>{children}</div>;
// 灰度/热图颜色（0..1）
export function heat(v) {
  const t = Math.max(0, Math.min(1, v));
  const stops = [[0, [20, 18, 40]], [0.35, [90, 50, 140]], [0.65, [220, 110, 60]], [1, [255, 236, 160]]];
  for (let i = 1; i < stops.length; i++) if (t <= stops[i][0]) {
    const [t0, c0] = stops[i - 1], [t1, c1] = stops[i], f = (t - t0) / (t1 - t0);
    return c0.map((c, j) => Math.round(c + f * (c1[j] - c)));
  }
  return stops[stops.length - 1][1];
}
export const rgb = a => `rgb(${a[0]},${a[1]},${a[2]})`;
// 简单折线图（自绘交互件内部用）：series=[{pts:[[x,y]],color,dash,width}]
export function MiniPlot({ w = 680, h = 260, xd, yd, series, xl, yl, xticks, yticks, vlines = [], hlines = [], children }) {
  const m = { l: 52, r: 14, t: 12, b: 40 }, iw = w - m.l - m.r, ih = h - m.t - m.b;
  const sx = x => m.l + (x - xd[0]) / (xd[1] - xd[0]) * iw, sy = y => m.t + ih - (y - yd[0]) / (yd[1] - yd[0]) * ih;
  const cl = y => Math.max(m.t, Math.min(m.t + ih, y));
  return <Svg w={w} h={h}>
    <rect x={m.l} y={m.t} width={iw} height={ih} fill="#fff" stroke="#bbb" />
    {(xticks || []).map(v => <g key={"x" + v}><line x1={sx(v)} x2={sx(v)} y1={m.t} y2={m.t + ih} stroke="#eee" /><Txt x={sx(v)} y={m.t + ih + 15} s={11}>{v}</Txt></g>)}
    {(yticks || []).map(v => <g key={"y" + v}><line x1={m.l} x2={m.l + iw} y1={sy(v)} y2={sy(v)} stroke="#eee" /><Txt x={m.l - 5} y={sy(v) + 4} s={11} a="end">{v}</Txt></g>)}
    {hlines.map((l, i) => <g key={"h" + i}><line x1={m.l} x2={m.l + iw} y1={sy(l.y)} y2={sy(l.y)} stroke={l.c || "#999"} strokeDasharray="5 4" />{l.label && <Txt x={m.l + iw - 4} y={sy(l.y) - 4} a="end" s={11} c={l.c || "#666"}>{l.label}</Txt>}</g>)}
    {vlines.map((l, i) => <g key={"v" + i}><line x1={sx(l.x)} x2={sx(l.x)} y1={m.t} y2={m.t + ih} stroke={l.c || "#999"} strokeDasharray="5 4" />{l.label && <Txt x={sx(l.x) + 4} y={m.t + 13} a="start" s={11} c={l.c || "#666"}>{l.label}</Txt>}</g>)}
    {series.map((s, i) => s.fill
      ? <path key={i} d={s.pts.map(([x, y], j) => `${j ? "L" : "M"}${sx(x).toFixed(1)},${cl(sy(y)).toFixed(1)}`).join("") + `L${sx(s.pts[s.pts.length - 1][0])},${sy(yd[0])}L${sx(s.pts[0][0])},${sy(yd[0])}Z`} fill={s.fill} stroke="none" />
      : <path key={i} d={s.pts.map(([x, y], j) => `${j ? "L" : "M"}${sx(x).toFixed(1)},${cl(sy(y)).toFixed(1)}`).join("")} fill="none" stroke={s.color || COL.ink} strokeWidth={s.width || 2} strokeDasharray={s.dash} />)}
    {children && children({ sx, sy, m, iw, ih })}
    <Txt x={m.l + iw / 2} y={h - 6} s={12}>{xl}</Txt>
    <Txt x={14} y={m.t + ih / 2} s={12} transform={`rotate(-90 14 ${m.t + ih / 2})`}>{yl}</Txt>
  </Svg>;
}

// SVG 中的 KaTeX 标签（foreignObject）：x,y 为中心点
export const TexSvg = ({ x, y, tex, w = 200, h = 26, s = 13, c }) => <foreignObject x={x - w / 2} y={y - h / 2 - 4} width={w} height={h}><div style={{ textAlign: "center", fontSize: s, color: c, lineHeight: `${h}px`, whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} /></foreignObject>;
