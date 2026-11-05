// 书目清单：章节顺序、标题与分部。章节内容在 chapters/<id>.jsx。
import { FEEDBACK_EMAIL } from "../feedback.js";

export default {
  lang: "zh",
  feedbackEmail: FEEDBACK_EMAIL,
  title: "词与物", title_en: "The Order of Things", author: "米歇尔·福柯", subtitle: "人文科学考古学",
  intro: "福柯追问：不同时代的人，凭什么规则来决定「什么算知识」？他把 16 世纪以来的西方思想划分为几个「知识型」——文艺复兴、古典时代、现代——本书逐层挖掘。",
  parts: [{ no: 0, label: "前言" }, { no: 1, label: "第一部分 · 文艺复兴与古典时代" }, { no: 2, label: "第二部分 · 现代" }],
  chapters: [
    { id: "ch00", no: 0, label: "前言", title_zh: "前言", title_en: "Preface", part: 0, text: "09_Preface.txt" },
    { id: "ch01", no: 1, title_zh: "宫娥", title_en: "Las Meninas", part: 1, text: "11_Chapter01.txt" },
    { id: "ch02", no: 2, title_zh: "世界的散文", title_en: "The Prose of the World", part: 1, text: "12_Chapter02.txt" },
    { id: "ch03", no: 3, title_zh: "表征", title_en: "Representing", part: 1, text: "13_Chapter03.txt" },
    { id: "ch04", no: 4, title_zh: "言说", title_en: "Speaking", part: 1, text: "14_Chapter04.txt" },
    { id: "ch05", no: 5, title_zh: "分类", title_en: "Classifying", part: 1, text: "15_Chapter05.txt" },
    { id: "ch06", no: 6, title_zh: "交换", title_en: "Exchanging", part: 1, text: "16_Chapter06.txt" },
    { id: "ch07", no: 7, title_zh: "表征的界限", title_en: "The Limits of Representation", part: 2, text: "18_Chapter07.txt" },
    { id: "ch08", no: 8, title_zh: "劳动、生命、语言", title_en: "Labour, Life, Language", part: 2, text: "19_Chapter08.txt" },
    { id: "ch09", no: 9, title_zh: "人及其复本", title_en: "Man and His Doubles", part: 2, text: "20_Chapter09.txt" },
    { id: "ch10", no: 10, title_zh: "人文科学", title_en: "The Human Sciences", part: 2, text: "21_Chapter10.txt" },
  ],
};
