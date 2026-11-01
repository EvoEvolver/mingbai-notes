// 第 10 章自绘插图的公共工具：SVG 外框、箭头、文字、滑块与配色。
// 材料配色（全书约定）：Si 灰、SiO₂ 浅蓝、Si₃N₄ 绿、多晶硅/栅 红棕、金属 金色、光刻胶 紫；高 k（Al₂O₃）深绿。
import { useId, createContext, useContext } from "react";

export const C = {
  si: "#b9bec4", siD: "#8a9099", siL: "#dde0e4", ox: "#bfe0f5", oxD: "#7fb6d9", nit: "#8cc79a", poly: "#a0522d", metal: "#d4a63a",
  hk: "#3f9a6b", resist: "#8e6bbf", gas: "#f4efe4", plasma: "#f6d9ea", plasmaD: "#d98cb8", ink: "#24262b", mute: "#6d6a63",
  red: "#c0392b", blue: "#2c4a6e", green: "#2c6e49", gold: "#b8862b", ge: "#e9d9a8", gaN: "#a99ad1", wall: "#d8d2c4",
};
export const box = { background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 12, padding: "12px 14px", width: "100%", boxSizing: "border-box" };
export const btn = on => ({ padding: "5px 11px", borderRadius: 7, border: `1px solid ${on ? C.blue : "#c9c2b3"}`, background: on ? "#e3ecf5" : "#fffdf8", cursor: "pointer", fontSize: 14, margin: "2px 4px" });
export const rowS = { display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "center" };

export function Svg({ title, w = 680, h = 300, children }) {
  const id = useId().replace(/:/g, "");
  return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title} style={{ width: "100%", maxWidth: w, display: "block", margin: "0 auto", fontFamily: "system-ui, -apple-system, 'PingFang SC', sans-serif", fontSize: 14 }}>
    <title>{title}</title>
    <defs>
      {[["k", C.ink], ["r", C.red], ["b", C.blue], ["g", C.green], ["m", C.mute], ["o", C.gold]].map(([k, c]) =>
        <marker key={k} id={`ah${k}${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={c} /></marker>)}
    </defs>
    <SvgCtx.Provider value={id}>{children}</SvgCtx.Provider>
  </svg>;
}
const SvgCtx = createContext("");
export const useSvgId = () => useContext(SvgCtx);
// 箭头：color 取 k/r/b/g/m/o
export function Ar({ x1, y1, x2, y2, c = "k", w = 1.6, dash, both }) {
  const id = useSvgId(), col = { k: C.ink, r: C.red, b: C.blue, g: C.green, m: C.mute, o: C.gold }[c];
  return <line {...{ x1, y1, x2, y2 }} stroke={col} strokeWidth={w} strokeDasharray={dash} markerEnd={`url(#ah${c}${id})`} markerStart={both ? `url(#ah${c}${id})` : undefined} />;
}
export function Path({ d, c = "k", w = 1.6, dash, arrow = true, fill = "none" }) {
  const id = useSvgId(), col = { k: C.ink, r: C.red, b: C.blue, g: C.green, m: C.mute, o: C.gold }[c];
  return <path d={d} stroke={col} strokeWidth={w} strokeDasharray={dash} fill={fill} markerEnd={arrow ? `url(#ah${c}${id})` : undefined} />;
}
export function T({ x, y, children, a = "middle", s = 14, c = C.ink, b, it }) {
  return <text x={x} y={y} textAnchor={a} fontSize={s} fill={c} fontWeight={b ? 600 : 400} fontStyle={it ? "italic" : undefined}>{children}</text>;
}
export function Rect({ x, y, w, h, f = C.si, s = "#5f5a52", sw = 1, r = 0, o }) {
  return <rect x={x} y={y} width={w} height={h} fill={f} stroke={s} strokeWidth={sw} rx={r} opacity={o} />;
}
export function Ball({ x, y, r = 8, f = "#9aa0a8", s = "#55595f" }) {
  return <circle cx={x} cy={y} r={r} fill={f} stroke={s} strokeWidth={0.8} />;
}
export function Range({ label, value, set, min, max, step = 0.01, fmt = v => v }) {
  const id = useId();
  return <label htmlFor={id} style={{ display: "block", margin: "6px 0", fontSize: 14 }}>{label}：<b>{fmt(value)}</b>
    <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={e => set(+e.target.value)} style={{ display: "block", width: "100%" }} /></label>;
}
// SVG 文本中的化学式：数字自动下标（字符串里不写 Unicode 下标）。例：<T>{chem("SiH4")}</T>
export function chem(str) {
  return String(str).split(/(\d+)/).map((t, i) => (i % 2 ? <tspan key={i} baselineShift="sub" fontSize="72%">{t}</tspan> : t));
}
// 正文用的标签模板：K`…{{SiH4}}…` → $\mathrm{SiH_4}$（字母或右括号后的数字变下标）；其余同 String.raw
export const chemTex = f => `$\\mathrm{${f.replace(/([A-Za-z)])(\d+)/g, "$1_{$2}")}}$`;
export const K = (s, ...v) => String.raw(s, ...v).replace(/\{\{([^}]+)\}\}/g, (_, f) => chemTex(f));
