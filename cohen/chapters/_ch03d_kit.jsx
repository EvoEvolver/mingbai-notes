// 第 III 章补充材料（下）页内小组件：跨页链接记号、自绘插图外壳。
import { extendInline, pageUrl, renderTex, TxI } from "@kit";

const link = (href, text, k, title) => <a key={k} className="ref ref-eq" href={href} title={title}>{text}</a>;
// 第 III 章正文：\mainref{D-54} → 第 III 章 (D-54)；\mainsec{D-2-e} → 第 III 章 §D-2-e（锚点取到 §D-2 一级）
extendInline("mainref", (n, k) => link(pageUrl("ch03", "eq-" + n), `第 III 章 (${n})`, k, "跳到第 III 章正文"));
extendInline("mainsec", (n, k) => link(pageUrl("ch03", "sec-" + n.split("-").slice(0, 2).join("-")), `第 III 章 §${n}`, k, "跳到第 III 章正文"));
// 第 I、II 章正文
extendInline("Isec", (n, k) => link(pageUrl("ch01", "sec-" + n), `第 I 章 §${n}`, k));
extendInline("IIsec", (n, k) => link(pageUrl("ch02", "sec-" + n), `第 II 章 §${n}`, k));
// 其他补充材料：\Ic{HI} / \Ic{HI-2} → 第 I 章补充页；\IIc{GII} → 第 II 章补充页；\IIIc{FIII} → 第 III 章补充（上）页
const cname = (c, roman) => <span dangerouslySetInnerHTML={{ __html: renderTex(`\\mathrm{${c.replace(new RegExp(roman + "$"), "")}}_{\\rm ${roman}}`) }} />;
const comp = (page, roman) => (n, k) => { const c = n.split("-")[0], s = n.slice(c.length + 1); return link(pageUrl(page, "sec-" + n), <>补充材料 {cname(c, roman)}{s && ` §${s}`}</>, k); };
extendInline("Ic", comp("ch01c", "I"));
extendInline("IIc", comp("ch02c", "II"));
extendInline("IIIc", comp("ch03c", "III"));
// 其他补充材料的公式：\Icref{HI-18} → 第 I 章补充页的 (HI-18)；\IIIcref{FIII-18} → 第 III 章补充（上）页的 (FIII-18)
extendInline("Icref", (n, k) => link(pageUrl("ch01c", "eq-" + n), `(${n})`, k, "跳到第 I 章补充材料"));
extendInline("IIIcref", (n, k) => link(pageUrl("ch03c", "eq-" + n), `(${n})`, k, "跳到第 III 章补充材料（上）"));

// 自绘插图（SVG 或交互组件）+ 图注
export function Fig({ caption, children }) {
  return (
    <figure className="tb-fig" style={{ margin: "1.2em auto" }}>
      <div className="tb-fig-int">{children}</div>
      {caption && <figcaption><TxI>{caption}</TxI></figcaption>}
    </figure>);
}
