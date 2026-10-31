// 全书脉络 · 可按章节与类型筛选的联系列表
import { useState } from "react";
import { ConceptChip, book, chapterLabel } from "@kit";
import { KINDS } from "./_connections_links.jsx";

const chOf = id => id.split(":")[0];
const short = c => (c.no === 0 ? "前言" : `第${c.no}章`);

export default function LinkList({ links }) {
  const [ch, setCh] = useState("*"), [kind, setKind] = useState("*");
  const count = id => links.filter(l => chOf(l.from) === id || chOf(l.to) === id).length;
  const list = links.filter(l => (ch === "*" || chOf(l.from) === ch || chOf(l.to) === ch) && (kind === "*" || l.kind === kind));
  const K = Object.fromEntries(KINDS.map(k => [k.id, k]));
  const cur = book.chapters.find(c => c.id === ch);
  return <div>
    <div className="filters">
      <button className={ch === "*" ? "on" : ""} onClick={() => setCh("*")}>全部章节</button>
      {book.chapters.map(c => <button key={c.id} className={ch === c.id ? "on" : ""} onClick={() => setCh(c.id)} title={chapterLabel(c)}>
        {short(c)} <small style={{ opacity: .6 }}>{count(c.id)}</small></button>)}
    </div>
    <div className="filters">
      <button className={kind === "*" ? "on" : ""} onClick={() => setKind("*")}>全部类型</button>
      {KINDS.map(k => <button key={k.id} className={kind === k.id ? "on" : ""} onClick={() => setKind(k.id)}>{k.label}</button>)}
    </div>
    <p style={{ color: "var(--muted)", fontSize: 14 }}>
      共 {list.length} 条{cur && <> · 涉及 <a href={`#/${cur.id}`}>{chapterLabel(cur)}</a></>}。点击概念胶囊查看概念卡。</p>
    <div className="xlinks">{list.map((l, i) => <div className="card xl" key={i} style={{ borderLeft: `5px solid ${K[l.kind]?.color || "var(--line)"}` }}>
      <div className="xl-row"><ConceptChip id={l.from} /> <span className="xl-lab">{l.label} →</span> <ConceptChip id={l.to} />
        <small style={{ marginLeft: "auto", color: K[l.kind]?.color }}>{K[l.kind]?.label}</small></div>
      <p>{l.note}</p>
    </div>)}</div>
  </div>;
}
