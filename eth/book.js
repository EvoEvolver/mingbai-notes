// Some exposition of "The Exponential Time Hypothesis Is False"（2026-10-29，20 页）——理论计算机论文的交互学习版。
// 每个"章节"对应论文的一节（编号一致，\eqref{2.2} 之类的跨页引用因此可直接跳转）；附录 A、B 各一页。
// 定理/证明组件来自框架（@kit，见 framework/spec/PROOF.md）；本书特有工具（参数账本、有理数与积和式算法）在 chapters/_ledger.jsx、_rat.js 等下划线文件中。
import { STMTS } from "./chapters/_stmts.js";

import { FEEDBACK_EMAIL } from "../feedback.js";

export default {
  feedbackEmail: FEEDBACK_EMAIL,
  kind: "textbook",
  // 定理/引理/命题登记表（框架 proof 组件的数据源：Stmt、SRef、\sref{}、DepGraph、StudyTable）
  statements: STMTS,
  title: "ETH 为假：稀疏积和式讲明白",
  title_en: "Some exposition of “The Exponential Time Hypothesis Is False”",
  author: "Exposition (odonnell@cs.cmu.edu, with LLMs) of [OAI26]",
  subtitle: "October 29, 2026 · 20 pp.",
  intro: String.raw`稀疏矩阵积和式（permanent）的确定性 $2^{O(n(\log\log n)^2/\sqrt{\log n})}$ 时间算法，以及由此得到的 #3SAT 亚指数算法。本站把这篇 20 页的论证拆成：全局证明依赖图、参数账本（拖动 n 看各参数与各阶段代价）、逐个引理的学习笔记，以及能在浏览器里实际运行的小规模验证（Ryser 公式、加法公式、低秩 DP、矩阵分解、奇偶多项式……）。定理、引理与公式编号均与原文一致。`,
  parts: [
    { no: 1, label: "主线：稀疏积和式算法（第 1–6 节）" },
    { no: 2, label: "附录：多项式空间与任意 3-CNF" },
  ],
  katexMacros: {
    "\\per": "\\operatorname{per}",
    "\\rank": "\\operatorname{rank}",
    "\\poly": "\\operatorname{poly}",
    "\\diag": "\\operatorname{diag}",
    "\\gap": "\\operatorname{gap}",
    "\\Bin": "\\operatorname{Bin}",
    "\\polylog": "\\operatorname{polylog}",
    "\\NTIME": "\\mathsf{NTIME}",
    "\\DTIME": "\\mathsf{DTIME}",
    "\\Q": "\\mathbb{Q}",
    "\\F": "\\mathbb{F}",
    "\\R": "\\mathbb{R}",
    "\\cJ": "\\mathcal{J}",
    "\\cL": "\\mathcal{L}",
    "\\one": "\\mathbf{1}",
    "\\Pr": "\\mathbb{P}",
  },
  chapters: [
    { id: "ch01", no: 1, title_zh: "目标与证明纲要", title_en: "Goal and outline of the proof", part: 1, pdf: [1, 2], text: "ch01.txt" },
    { id: "ch02", no: 2, title_zh: "计算结构化积和式", title_en: "Computing structured permanents", part: 1, pdf: [3, 5], text: "ch02.txt" },
    { id: "ch03", no: 3, title_zh: "导数与插值", title_en: "Derivatives and interpolation", part: 1, pdf: [5, 6], text: "ch03.txt" },
    { id: "ch04", no: 4, title_zh: "把坐标恒等式变成分块的分解", title_en: "A factorization that turns coordinate identities into blocks", part: 1, pdf: [6, 10], text: "ch04.txt" },
    { id: "ch05", no: 5, title_zh: "矩阵多项式", title_en: "The matrix polynomial", part: 1, pdf: [10, 12], text: "ch05.txt" },
    { id: "ch06", no: 6, title_zh: "参数选择与推论", title_en: "Parameters and consequences", part: 1, pdf: [12, 13], text: "ch06.txt" },
    { id: "appA", no: "A", title_zh: "多项式空间", title_en: "Polynomial space", part: 2, pdf: [14, 15], text: "appA.txt" },
    { id: "appB", no: "B", title_zh: "任意 #3SAT：稀疏四次多项式的 gap", title_en: "Arbitrary #3SAT via sparse quartic gaps", part: 2, pdf: [15, 19], text: "appB.txt" },
  ],
};
