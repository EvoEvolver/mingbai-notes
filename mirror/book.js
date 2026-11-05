// 书目清单：章节顺序、标题与分部。章节内容在 chapters/<id>.jsx。
import { FEEDBACK_EMAIL } from "../feedback.js";

export default {
  lang: "zh",
  feedbackEmail: FEEDBACK_EMAIL,
  title: "生产之镜", title_en: "The Mirror of Production", author: "让·鲍德里亚", subtitle: "对马克思主义「生产主义」的批判",
  intro: "马克思批判了资本主义，却把「生产」「劳动」「使用价值」当作人类永恒的本质——鲍德里亚说，这恰恰是政治经济学在马克思身上照出的镜像。本书逐层拆掉这面镜子：劳动概念、人类学、原始社会、古代与封建社会，直到今天的符号与代码统治，并以「象征交换」对抗生产主义。",
  parts: [{ no: 0, label: "导言与序言" }, { no: 1, label: "拆解概念：劳动与自然" }, { no: 2, label: "回溯历史：原始、古代与封建" }, { no: 3, label: "面向当下：政治经济学的第三阶段" }],
  chapters: [
    { id: "ch00", no: 0, label: "导言与序言", title_zh: "导言与序言", title_en: "Translator's Introduction & Preface", part: 0, text: "00_Intro_Preface.txt" },
    { id: "ch01", no: 1, title_zh: "劳动的概念", title_en: "The Concept of Labor", part: 1, text: "01_Chapter1.txt" },
    { id: "ch02", no: 2, title_zh: "马克思主义人类学与对自然的支配", title_en: "Marxist Anthropology and the Domination of Nature", part: 1, text: "02_Chapter2.txt" },
    { id: "ch03", no: 3, title_zh: "历史唯物主义与原始社会", title_en: "Historical Materialism and Primitive Societies", part: 2, text: "03_Chapter3.txt" },
    { id: "ch04", no: 4, title_zh: "论古代与封建生产方式", title_en: "On the Archaic and Feudal Mode", part: 2, text: "04_Chapter4.txt" },
    { id: "ch05", no: 5, title_zh: "马克思主义与政治经济学体系", title_en: "Marxism and the System of Political Economy", part: 3, text: "05_Chapter5.txt" },
  ],
};
