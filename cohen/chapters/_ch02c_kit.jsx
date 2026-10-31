// 第 II 章补充材料页的小工具：跨页引用记号与自绘插图外框。
// 行内记号（在所有 Tx/TxI/Rich 文本中可用）：
//   \IIeq{E-26}   → 链接到第 II 章正文页的式 (E-26)
//   \IIsec{D-3-a} → 链接到第 II 章正文页的 §D-3-a
//   \Isec{B-2}    → 链接到第 I 章正文页的 §B-2
//   \Ic{HI}       → 链接到第 I 章补充材料页（补充材料 H_I 一节）
import { extendInline, pageUrl, TxI } from "@kit";

const link = (href, label, key) => <a key={key} className="ref ref-eq" href={href}>{label}</a>;
extendInline("IIeq", (n, k) => link(pageUrl("ch02", `eq-${n}`), `第 II 章 (${n})`, k));
extendInline("IIsec", (n, k) => link(pageUrl("ch02", `sec-${n}`), `第 II 章 §${n}`, k));
extendInline("Isec", (n, k) => link(pageUrl("ch01", `sec-${n}`), `第 I 章 §${n}`, k));
extendInline("Ic", (n, k) => { const [c, sub] = n.split("|"); return link(pageUrl("ch01c", `sec-${sub || c}`), <>补充材料 {c.replace(/I$/, "")}<sub>I</sub>{sub && sub !== c ? ` §${sub.replace(/^[A-Z]+I-/, "")}` : ""}</>, k); });

// 自绘插图外框（不使用原书图片）
export function Fig({ n, caption, children }) {
  return (
    <figure className="tb-fig" id={`fig-${n}`}>
      <div className="tb-fig-int">{children}</div>
      <figcaption><b>图 {n}</b> <TxI>{caption}</TxI></figcaption>
    </figure>);
}
