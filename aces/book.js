// Hockings, Doherty, Harper — Scalable noise characterization of syndrome-extraction circuits with averaged circuit eigenvalue sampling (arXiv:2404.06545)
// 论文导读（kind: "paper"），组件见 framework/spec/PAPER.md。
import { FEEDBACK_EMAIL } from "../feedback.js";

export default {
  lang: "zh",
  feedbackEmail: FEEDBACK_EMAIL,
  kind: "paper",
  title: "用 ACES 给纠错电路做「体检」",
  title_en: "Scalable noise characterization of syndrome-extraction circuits with averaged circuit eigenvalue sampling",
  author: "Evan T. Hockings · Andrew C. Doherty · Robin Harper",
  subtitle: "arXiv:2404.06545",
  intro: String.raw`量子纠错要靠综合征提取电路反复测量，可这些电路本身的噪声怎么测清楚？这篇论文把「平均电路本征值采样」（ACES）做成可扩展的噪声刻画协议，给出衡量实验设计好坏的性能指标并据此优化，在上千比特的 25 码距表面码上做了完整数值模拟。本页是这篇论文的中文导读。`,
  paper: {
    title: "Scalable noise characterization of syndrome-extraction circuits with averaged circuit eigenvalue sampling",
    authors: ["Evan T. Hockings", "Andrew C. Doherty", "Robin Harper"],
    venue: "arXiv", year: 2024, arxiv: "2404.06545", code: "https://github.com/evanhockings/QuantumACES.jl", license: "CC BY 4.0",
  },
  footer: "本页为论文 arXiv:2404.06545（CC BY 4.0）的中文导读：讲解、图示与评注为本站自写；结论、数据与公式出自原论文，请以原文为准。",
  katexMacros: { "\\R": "\\mathbb{R}", "\\dd": "\\mathrm{d}", "\\Tr": "\\operatorname{Tr}", "\\E": "\\mathbb{E}" },
  chapters: [
    { id: "paper", no: 0, label: "速读与导读", title_zh: "速读与导读", title_en: "The paper at a glance" },
    { id: "fmap", no: 0, label: "公式树图样例", title_zh: "公式树图：面积按重要性分配", title_en: "Formula treemap — a sample" },
    { id: "method", no: 0, eqs: true, label: "方法深读", title_zh: "方法深读：ACES、性能指标与实验设计", title_en: "Method in depth" },
  ],
};
