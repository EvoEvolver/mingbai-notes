// 书目清单：章节顺序、标题与分部。章节内容在 chapters/<id>.jsx。
import { FEEDBACK_EMAIL } from "../feedback.js";

export default {
  feedbackEmail: FEEDBACK_EMAIL,
  title: "反俄狄浦斯", title_en: "Anti-Oedipus", author: "吉尔·德勒兹 & 费利克斯·加塔利", subtitle: "资本主义与精神分裂（卷一）",
  intro: "精神分析说：欲望源于匮乏，一切无意识都绕着「爸爸-妈妈-我」的俄狄浦斯三角打转。德勒兹与加塔利反问：如果欲望不是匮乏，而是生产——像工厂一样连接、切断、流动——那会怎样？他们把无意识从家庭剧场拉回社会与历史：从原始的领土机器、专制的帝国机器到资本主义机器，追问欲望如何被编码、超编码、解码，又如何被俄狄浦斯重新关进家庭。全书以「精神分裂分析」收尾：一种解放欲望流动的政治与临床实践。",
  parts: [
    { no: 0, label: "前言与导论" },
    { no: 1, label: "第一章 · 欲望机器" },
    { no: 2, label: "第二章 · 精神分析与家庭主义：神圣家族" },
    { no: 3, label: "第三章 · 蒙昧人、野蛮人、文明人" },
    { no: 4, label: "第四章 · 精神分裂分析导论" },
  ],
  chapters: [
    { id: "ch00", no: 0, label: "序", title_zh: "福柯序言与英译导论", title_en: "Preface (Foucault) & Introduction (Mark Seem)", part: 0, text: "00_Preface_Intro.txt" },
    { id: "ch01", no: 1, title_zh: "欲望生产与无器官身体", title_en: "Desiring-Production · The Body without Organs · The Subject and Enjoyment", part: 1, text: "01_DM_1-3.txt" },
    { id: "ch02", no: 2, title_zh: "唯物主义精神病学与机器", title_en: "A Materialist Psychiatry · The Machines · The Whole and Its Parts", part: 1, text: "02_DM_4-6.txt" },
    { id: "ch03", no: 3, title_zh: "俄狄浦斯的帝国主义", title_en: "The Imperialism of Oedipus · Three Texts of Freud", part: 2, text: "03_HF_1-2.txt" },
    { id: "ch04", no: 4, title_zh: "无意识的三种综合", title_en: "The Three Syntheses: Connective, Disjunctive, Conjunctive", part: 2, text: "04_HF_3-6.txt" },
    { id: "ch05", no: 5, title_zh: "压抑、神经症与过程", title_en: "Social & Psychic Repression · Neurosis and Psychosis · The Process", part: 2, text: "05_HF_7-9.txt" },
    { id: "ch06", no: 6, title_zh: "原始领土机器", title_en: "The Inscribing Socius · The Primitive Territorial Machine · Oedipus & Ethnology", part: 3, text: "06_SBC_1-4.txt" },
    { id: "ch07", no: 7, title_zh: "野蛮专制机器与原国家", title_en: "Territorial Representation · The Barbarian Despotic Machine · The Urstaat", part: 3, text: "07_SBC_5-8.txt" },
    { id: "ch08", no: 8, title_zh: "文明资本主义机器", title_en: "The Civilized Capitalist Machine · Capitalist Representation · Oedipus at Last", part: 3, text: "08_SBC_9-11.txt" },
    { id: "ch09", no: 9, title_zh: "社会场与分子无意识", title_en: "The Social Field · The Molecular Unconscious · Psychoanalysis and Capitalism", part: 4, text: "09_SA_1-3.txt" },
    { id: "ch10", no: 10, title_zh: "精神分裂分析的积极任务", title_en: "The First and Second Positive Tasks of Schizoanalysis", part: 4, text: "10_SA_4-5.txt" },
  ],
};
