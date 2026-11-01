// 第 7 章（上）交互组件共用的小控件：分段按钮、滑块、读数条、材料配色。
import { renderTex } from "@kit";

// 材料配色（全书约定）：Si 灰、SiO2 浅蓝、Si3N4 绿、多晶硅/栅 红棕、金属 金色、光刻胶 紫；掺杂区用玫红
export const MAT = {
  si: "#d4d4d4", siDark: "#9c9c9c", ox: "#cfe5f2", oxEdge: "#6f9fbd", nit: "#9cc9a4", poly: "#9b4a2f",
  metal: "#d4a537", silicide: "#b07d2a", resist: "#9b7fc4", dopeN: "#d98b9f", dopeP: "#86b0d8", dopeDeep: "#c96f86", ink: "#1f1b16",
};
// 杂质配色（各交互图一致）
export const DOPC = { B: "#2c6e49", P: "#c0392b", As: "#7d3c98", Sb: "#b8862b", In: "#16808a", Si: "#888888" };

export const TeX = ({ t, className }) => <span className={className} dangerouslySetInnerHTML={{ __html: renderTex(t) }} />;

export function Seg({ options, value, onChange }) {
  return <div className="seg" style={{ marginBottom: 6 }}>{options.map(([v, label]) =>
    <button key={String(v)} className={value === v ? "on" : ""} onClick={() => onChange(v)}>{label}</button>)}</div>;
}

// 滑块：log=true 时按对数刻度；fmt(v) 返回 TeX
export function Slider({ label, value, set, min, max, step, log = false, fmt }) {
  const toS = v => (log ? Math.log10(v) : v), fromS = s => (log ? Math.pow(10, s) : s);
  const shown = fmt ? fmt(value) : String(+(+value).toPrecision(3));
  return (
    <label className="plot-param">
      <span className="plot-plabel" dangerouslySetInnerHTML={{ __html: renderTex(`${label} = ${shown}`) }} />
      <input type="range" min={toS(min)} max={toS(max)} step={log ? 0.01 : step || (max - min) / 100} value={toS(value)}
        onChange={e => set(fromS(+e.target.value))} />
    </label>);
}

export const Row = ({ children, style }) => <div className="plot-params" style={style}>{children}</div>;

// 读数：items = [[TeX 标签, TeX 数值], ...]
export function Readout({ items, note }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 10px", margin: "6px 0 2px", fontSize: 14 }}>
      {items.map(([k, v], i) => <span key={i} style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 8, padding: "1px 8px" }}>
        <TeX t={`${k} = ${v}`} /></span>)}
      {note && <span style={{ color: "var(--accent)", fontSize: 13, alignSelf: "center" }}>{note}</span>}
    </div>);
}

export const Panel = ({ children, title }) => (
  <div className="card" style={{ margin: "18px 0", padding: "14px 16px" }}>
    {title && <div style={{ fontWeight: 600, marginBottom: 6 }}>{title}</div>}
    {children}
  </div>);
