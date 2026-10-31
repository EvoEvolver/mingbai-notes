// Nakahara, Geometry, Topology and Physics (2nd ed.) —— 数学物理教科书（定理–证明 + 公式推导）。
// 章节内容在 chapters/<id>.jsx；每章的定义/定理等登记在 chapters/_<id>_stmts.js（合并为 statements，供 Stmt / SRef / \\sref 使用）；插图在 public/figures/。
import { S as S01 } from "./chapters/_ch01_stmts.js";
import { S as S02 } from "./chapters/_ch02_stmts.js";
import { S as S03 } from "./chapters/_ch03_stmts.js";
import { S as S04 } from "./chapters/_ch04_stmts.js";
import { S as S05 } from "./chapters/_ch05_stmts.js";
import { S as S06 } from "./chapters/_ch06_stmts.js";
import { S as S07 } from "./chapters/_ch07_stmts.js";
import { S as S08 } from "./chapters/_ch08_stmts.js";
import { S as S09 } from "./chapters/_ch09_stmts.js";
import { S as S10 } from "./chapters/_ch10_stmts.js";
import { S as S11 } from "./chapters/_ch11_stmts.js";
import { S as S12 } from "./chapters/_ch12_stmts.js";
import { S as S13 } from "./chapters/_ch13_stmts.js";
import { S as S14 } from "./chapters/_ch14_stmts.js";

export default {
  kind: "textbook",
  title: "几何、拓扑与物理", title_en: "Geometry, Topology and Physics (2nd ed.)", author: "Mikio Nakahara", subtitle: "Institute of Physics Publishing, 2003",
  intro: String.raw`把现代物理用到的几何与拓扑讲给物理学家：同调与同伦、流形与微分形式、黎曼几何与复几何、纤维丛与联络、示性类与指标定理，最后落到规范场论的反常与弦论。本站为原书的中文学习版：定义、定理、例子、公式编号与插图依原书。`,
  parts: [{ no: 1, label: "物理与数学预备（第 1–2 章）" }, { no: 2, label: "拓扑与流形上的几何（第 3–8 章）" }, { no: 3, label: "纤维丛、联络与示性类（第 9–12 章）" }, { no: 4, label: "物理应用（第 13–14 章）" }],
  statements: { ...S01, ...S02, ...S03, ...S04, ...S05, ...S06, ...S07, ...S08, ...S09, ...S10, ...S11, ...S12, ...S13, ...S14 },
  katexMacros: {
    "\\R": "\\mathbb{R}", "\\C": "\\mathbb{C}", "\\Z": "\\mathbb{Z}", "\\Q": "\\mathbb{Q}", "\\N": "\\mathbb{N}",
    "\\dd": "\\mathrm{d}", "\\Tr": "\\operatorname{tr}", "\\ind": "\\operatorname{ind}",
  },
  chapters: [
    { id: "ch01", no: 1, title_zh: "量子物理", title_en: "Quantum Physics", part: 1, pdf: [21, 86], text: "ch01.txt" },
    { id: "ch02", no: 2, title_zh: "数学预备", title_en: "Mathematical Preliminaries", part: 1, pdf: [87, 112], text: "ch02.txt" },
    { id: "ch03", no: 3, title_zh: "同调群", title_en: "Homology Groups", part: 2, pdf: [113, 140], text: "ch03.txt" },
    { id: "ch04", no: 4, title_zh: "同伦群", title_en: "Homotopy Groups", part: 2, pdf: [141, 188], text: "ch04.txt" },
    { id: "ch05", no: 5, title_zh: "流形", title_en: "Manifolds", part: 2, pdf: [189, 245], text: "ch05.txt" },
    { id: "ch06", no: 6, title_zh: "de Rham 上同调群", title_en: "de Rham Cohomology Groups", part: 2, pdf: [246, 263], text: "ch06.txt" },
    { id: "ch07", no: 7, title_zh: "黎曼几何", title_en: "Riemannian Geometry", part: 2, pdf: [264, 327], text: "ch07.txt" },
    { id: "ch08", no: 8, title_zh: "复流形", title_en: "Complex Manifolds", part: 2, pdf: [328, 367], text: "ch08.txt" },
    { id: "ch09", no: 9, title_zh: "纤维丛", title_en: "Fibre Bundles", part: 3, pdf: [368, 393], text: "ch09.txt" },
    { id: "ch10", no: 10, title_zh: "纤维丛上的联络", title_en: "Connections on Fibre Bundles", part: 3, pdf: [394, 438], text: "ch10.txt" },
    { id: "ch11", no: 11, title_zh: "示性类", title_en: "Characteristic Classes", part: 3, pdf: [439, 472], text: "ch11.txt" },
    { id: "ch12", no: 12, title_zh: "指标定理", title_en: "Index Theorems", part: 3, pdf: [473, 520], text: "ch12.txt" },
    { id: "ch13", no: 13, title_zh: "规范场论中的反常", title_en: "Anomalies in Gauge Field Theories", part: 4, pdf: [521, 547], text: "ch13.txt" },
    { id: "ch14", no: 14, title_zh: "玻色弦理论", title_en: "Bosonic String Theory", part: 4, pdf: [548, 579], text: "ch14.txt" },
  ],
};
