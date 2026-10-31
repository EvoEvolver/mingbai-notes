// Cohen-Tannoudji, Diu, Laloë, Quantum Mechanics, Volume I (2nd ed.) —— 物理教科书（中文学习版）。
// 章节内容在 chapters/<id>.jsx。正文页 id 为 chNN，补充材料（Complements）单独成页：chNNc、chNNd。
// 公式编号：正文沿用原书 (C-7) → <Eq n="C-7">；补充材料加补充材料名前缀 → <Eq n="AI-12">。
export default {
  kind: "textbook",
  title: "量子力学（卷 I）", title_en: "Quantum Mechanics, Volume I (2nd ed.)", author: "C. Cohen-Tannoudji, B. Diu, F. Laloë", subtitle: "Wiley-VCH, 2020",
  intro: String.raw`经典的量子力学教科书：从波粒二象性与波包出发，建立 Hilbert 空间与 Dirac 记号的数学工具，再陈述量子力学的基本假设及其物理诠释。本站为前三章及其补充材料的中文学习版：用自己的话讲清概念与推导，保留原书公式编号，配交互图。`,
  footer: "本页为原书的中文学习版：公式与编号依原书，讲解、推导组织与插图均为本站自写/自绘。",
  parts: [{ no: 1, label: "第 I 章 波与粒子" }, { no: 2, label: "第 II 章 数学工具" }, { no: 3, label: "第 III 章 基本假设" }],
  katexMacros: {
    "\\R": "\\mathbb{R}", "\\C": "\\mathbb{C}", "\\dd": "\\mathrm{d}", "\\Tr": "\\operatorname{Tr}",
  },
  chapters: [
    { id: "ch01", no: 1, title_zh: "波与粒子：量子力学基本概念", title_en: "Waves and Particles. Introduction to the Basic Ideas of Quantum Mechanics", part: 1, pdf: [25, 56], text: "ch01.txt" },
    { id: "ch01c", no: 0, title_zh: "第 I 章补充材料", title_en: "Complements of Chapter I", part: 1, pdf: [57, 110], text: "ch01c.txt" },
    { id: "ch02", no: 2, title_zh: "量子力学的数学工具", title_en: "The Mathematical Tools of Quantum Mechanics", part: 2, pdf: [111, 182], text: "ch02.txt" },
    { id: "ch02c", no: 0, title_zh: "第 II 章补充材料", title_en: "Complements of Chapter II", part: 2, pdf: [183, 236], text: "ch02c.txt" },
    { id: "ch03", no: 3, title_zh: "量子力学的基本假设", title_en: "The Postulates of Quantum Mechanics", part: 3, pdf: [237, 290], text: "ch03.txt" },
    { id: "ch03c", no: 0, title_zh: "第 III 章补充材料（A–H）", title_en: "Complements of Chapter III (A–H)", part: 3, pdf: [291, 359], text: "ch03c.txt" },
    { id: "ch03d", no: 0, title_zh: "第 III 章补充材料（J–N）", title_en: "Complements of Chapter III (J–N)", part: 3, pdf: [360, 416], text: "ch03d.txt" },
  ],
};
