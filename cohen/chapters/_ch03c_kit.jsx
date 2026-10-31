// 第 III 章补充材料（上）页内小组件：跨页链接记号、自绘插图外壳。
import { extendInline, pageUrl, TxI } from "@kit";

const link = (href, text, k, title) => <a key={k} className="ref ref-eq" href={href} title={title}>{text}</a>;
// \mainref{D-54} → 第 III 章 (D-54)；\mainsec{E-2} → 第 III 章 §E-2
extendInline("mainref", (n, k) => link(pageUrl("ch03", "eq-" + n), `第 III 章 (${n})`, k, "跳到第 III 章正文"));
extendInline("mainsec", (n, k) => link(pageUrl("ch03", "sec-" + n), `第 III 章 §${n}`, k, "跳到第 III 章正文"));
// 第 I、II 章正文与补充材料
extendInline("Iref", (n, k) => link(pageUrl("ch01", "eq-" + n), `第 I 章 (${n})`, k));
extendInline("Isec", (n, k) => link(pageUrl("ch01", "sec-" + n), `第 I 章 §${n}`, k));
extendInline("IIsec", (n, k) => link(pageUrl("ch02", "sec-" + n), `第 II 章 §${n}`, k));
// \Ic{HI} → 补充材料 H_I；\Ic{HI-2} → 补充材料 H_I §2（第 I 章补充页）
extendInline("Ic", (n, k) => { const c = n.split("-")[0], s = n.slice(c.length + 1); return link(pageUrl("ch01c", "sec-" + n), <>补充材料 {c.replace(/I$/, "")}<sub>I</sub>{s && ` §${s}`}</>, k); });
// \IIc{CII} → 补充材料 C_II（第 II 章补充页）
extendInline("IIc", (n, k) => { const c = n.split("-")[0], s = n.slice(c.length + 1); return link(pageUrl("ch02c", "sec-" + n), <>补充材料 {c.replace(/II$/, "")}<sub>II</sub>{s && ` §${s}`}</>, k); });

// 自绘插图（SVG 或交互组件）+ 图注；锚点 fig-<n>
export function Fig({ n, caption, children }) {
  return (
    <figure className="tb-fig" id={n ? `fig-${n}` : undefined}>
      <div className="tb-fig-int">{children}</div>
      {caption && <figcaption>{n && <b>图 {n} </b>}<TxI>{caption}</TxI></figcaption>}
    </figure>);
}
