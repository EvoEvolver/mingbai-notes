// 第 III 章页内小组件：假设框、自绘插图外壳、三级小节标题、跨页链接。
import { Tx, TxI, pageUrl, renderTex } from "@kit";

const CN = { 1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六" };

// 假设框：<Postulate k={4} id="4b" case="离散谱的一般情形" title="…">正文（字符串可含 $…$）</Postulate>
// 锚点 postulate-<id>（缺省为 postulate-<k>），供其他页面用 pageUrl("ch03", "postulate-4") 引用。
export function Postulate({ k, id, case: cs, title, children }) {
  return (
    <div className="tb-box tb-key" id={`postulate-${id || k}`} style={{ borderLeftWidth: 6 }}>
      <div className="tb-box-h">🔑 第{CN[k]}假设{cs && <span style={{ fontWeight: 400 }}>（{cs}）</span>}{title && <>：<TxI>{title}</TxI></>}
        <small className="muted" style={{ fontWeight: 400, marginLeft: 8, fontFamily: "var(--sans)", fontSize: 12 }}>Postulate {["", "I", "II", "III", "IV", "V", "VI"][k]}</small></div>
      <div className="tb-box-b">{typeof children === "string" ? <Tx>{children}</Tx> : children}</div>
    </div>);
}

// 原书正文中的其他“框内规则”（量子化规则、守恒体系的解法、振幅与概率的加法规则……）
export function Rule({ id, title, children }) {
  return (
    <div className="tb-box tb-key" id={id}>
      <div className="tb-box-h">📌 {title}</div>
      <div className="tb-box-b">{typeof children === "string" ? <Tx>{children}</Tx> : children}</div>
    </div>);
}

// 自绘插图（SVG 或交互组件）+ 图注；锚点 fig-<n>
export function Fig({ n, caption, children }) {
  return (
    <figure className="tb-fig" id={`fig-${n}`}>
      <div className="tb-fig-int">{children}</div>
      <figcaption><b>图 {n}</b> <TxI>{caption}</TxI></figcaption>
    </figure>);
}

// 三级小节（如 B-3-a）
export function Sub3({ n, title, zh, children }) {
  return (
    <section className="tb-sub" id={`sec-${n}`}>
      <h4 className="tb-h3" style={{ fontSize: 18, marginTop: 26 }}><span className="tb-num">{n}</span> <TxI>{zh || title}</TxI>{zh && title && <small className="tb-en">{title}</small>}</h4>
      {children}
    </section>);
}
// 四级小标题（α、β、γ 段）
export const Para = ({ g, children }) => <h5 style={{ fontSize: 16, margin: "20px 0 8px", fontFamily: "var(--serif)" }}><TxI>{`$\\${g}$`}</TxI>. <TxI>{children}</TxI></h5>;

// 跨页链接（其他章的小节、公式）：<XRef ch="ch02" a="sec-D-3">第 II 章 §D-3</XRef>
export const XRef = ({ ch, a, children }) => <a className="ref" href={pageUrl(ch, a)}>{children}</a>;

// SVG 内的 KaTeX 标签（避免用 Unicode 拼数学）：anchor = start | middle | end；y 为基线附近
export const TexAt = ({ x, y, tex, w = 90, h = 26, anchor = "start", color, size = 14 }) =>
  <foreignObject x={anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x} y={y - h + 7} width={w} height={h} style={{ overflow: "visible" }}>
    <div style={{ fontSize: size, color, textAlign: anchor === "middle" ? "center" : anchor === "end" ? "right" : "left", lineHeight: `${h}px`, whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: renderTex(tex) }} />
  </foreignObject>;
