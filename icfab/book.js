// Integrated Circuit Fabrication: Science and Technology (Plummer & Griffin) — 数理教科书。章节内容在 chapters/<id>.jsx；插图在 public/figures/。
import { FEEDBACK_EMAIL } from "../feedback.js";

export default {
  feedbackEmail: FEEDBACK_EMAIL,
  kind: "textbook",
  title: "集成电路制造：科学与技术", title_en: "Integrated Circuit Fabrication: Science and Technology", author: "James D. Plummer · Peter B. Griffin", subtitle: "Cambridge University Press, 2023（预印版）",
  intro: "从一块硅锭到数十亿晶体管的芯片：晶体生长、洁净与良率、光刻、氧化与界面、扩散、离子注入、刻蚀与 CMP、薄膜沉积、互连。每一步都有物理与化学的模型（Deal–Grove、Fick 定律、LSS 射程理论、成像光学……），也都有工艺工程师的取舍。本站为原书的中文学习版：公式编号、插图与章节结构依原书，并配以可交互的模型与三维工艺结构。",
  parts: [
    { no: 1, label: "全景：历史、CMOS 工艺流程、材料与制造环境（第 1–4 章）" },
    { no: 2, label: "图形化与前道单元工艺（第 5–8 章）" },
    { no: 3, label: "刻蚀、沉积与后道互连（第 9–11 章）" },
    { no: 4, label: "附录" },
  ],
  katexMacros: {
    "\\dd": "\\mathrm{d}",
    "\\um": "\\,\\mu\\mathrm{m}",
    "\\nm": "\\,\\mathrm{nm}",
    "\\cm": "\\,\\mathrm{cm}",
    "\\eV": "\\,\\mathrm{eV}",
    "\\kT": "kT",
    "\\SiO": "\\mathrm{SiO_2}",
  },
  chapters: [
    { id: "ch01", no: 1, title_zh: "历史回顾、摩尔定律与技术前景", title_en: "Historical Perspective, Moore's Law and Future Technology Prospects", part: 1, pdf: [13, 45], text: "ch01.txt" },
    { id: "ch02", no: 2, title_zh: "现代 CMOS 工艺", title_en: "Modern CMOS Technology", part: 1, pdf: [46, 76], text: "ch02.txt" },
    { id: "ch03", no: 3, title_zh: "半导体材料：晶体生长、晶圆制备与材料性质", title_en: "Semiconductor Materials: Crystal Growth, Wafer Preparation and Material Properties", part: 1, pdf: [77, 115], text: "ch03.txt" },
    { id: "ch04", no: 4, title_zh: "半导体制造：洁净室、晶圆清洗、吸杂与芯片良率", title_en: "Semiconductor Manufacturing: Clean Rooms, Wafer Cleaning, Gettering and Chip Yield", part: 1, pdf: [116, 161], text: "ch04.txt" },
    { id: "ch05", no: 5, label: "第 5 章（上）", title_zh: "光刻（上）：发展、光学基础与光刻胶", title_en: "Lithography (I): History, Optics and Photoresists (§5.1–5.4)", part: 2, pdf: [162, 199], text: "ch05.txt" },
    { id: "ch05b", no: 0, label: "第 5 章（下）", title_zh: "光刻（下）：曝光与光刻胶建模、分辨率增强、纳米压印", title_en: "Lithography (II): Modeling, Resolution Enhancement, Nanoimprint (§5.5–5.11)", part: 2, pdf: [200, 253], text: "ch05b.txt" },
    { id: "ch06", no: 6, title_zh: "半导体/绝缘体界面：热氧化", title_en: "Semiconductor/Insulator Interfaces", part: 2, pdf: [254, 303], text: "ch06.txt" },
    { id: "ch07", no: 7, label: "第 7 章（上）", title_zh: "半导体掺杂（上）：宏观扩散", title_en: "Doping in Semiconductors (I): Macroscopic Diffusion (§7.1–7.11)", part: 2, pdf: [304, 336], text: "ch07.txt" },
    { id: "ch07b", no: 0, label: "第 7 章（下）", title_zh: "半导体掺杂（下）：原子尺度机制与点缺陷", title_en: "Doping in Semiconductors (II): Atomic-Scale Mechanisms (§7.12–7.21)", part: 2, pdf: [337, 363], text: "ch07b.txt" },
    { id: "ch08", no: 8, label: "第 8 章（上）", title_zh: "离子注入（上）：射程分布与阻止本领", title_en: "Ion Implantation (I): Profiles and Stopping (§8.1–8.7)", part: 2, pdf: [364, 389], text: "ch08.txt" },
    { id: "ch08b", no: 0, label: "第 8 章（下）", title_zh: "离子注入（下）：损伤、退火与瞬态增强扩散", title_en: "Ion Implantation (II): Damage, Annealing and TED (§8.8–8.16)", part: 2, pdf: [390, 423], text: "ch08b.txt" },
    { id: "ch09", no: 9, title_zh: "刻蚀技术与化学机械抛光", title_en: "Etching Technologies and Chemical-Mechanical Polishing", part: 3, pdf: [424, 475], text: "ch09.txt" },
    { id: "ch10", no: 10, title_zh: "薄膜沉积技术", title_en: "Deposition Technologies", part: 3, pdf: [476, 519], text: "ch10.txt" },
    { id: "ch11", no: 11, label: "第 11 章（上）", title_zh: "后道互连工艺（上）：RC 限制与发展历程", title_en: "Back-End (Interconnect) Processing (I): RC Limits and Historical Development (§11.1–11.3)", part: 3, pdf: [520, 544], text: "ch11.txt" },
    { id: "ch11b", no: 0, label: "第 11 章（下）", title_zh: "后道互连工艺（下）：关键工艺、未来结构与三维集成", title_en: "Back-End (Interconnect) Processing (II): Key Processes, Future Structures, 3D Integration (§11.4–11.11)", part: 3, pdf: [545, 587], text: "ch11b.txt" },
    { id: "appA", no: "A", title_zh: "附录：常数、材料性质与常用图表", title_en: "Appendices", part: 4, pdf: [588, 627], text: "appA.txt" },
  ],
};
