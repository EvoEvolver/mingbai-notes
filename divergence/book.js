// 书目清单：章节顺序、标题与分部。章节内容在 chapters/<id>.jsx。
import { FEEDBACK_EMAIL } from "../feedback.js";

export default {
  feedbackEmail: FEEDBACK_EMAIL,
  title: "大分流", title_en: "The Great Divergence", author: "彭慕兰（Kenneth Pomeranz）", subtitle: "中国、欧洲与现代世界经济的形成",
  intro: "为什么工业革命发生在英格兰，而不是同样繁荣的江南？彭慕兰的答案颠覆了「欧洲早已领先」的老故事：直到 1800 年前后，西欧与中国最发达的核心区在人口、寿命、市场、消费与技术上惊人地相似，也都撞上了同样的生态天花板（土地、木材、燃料）。真正让欧洲「分流」出去的，是两件带有偶然性的事：脚下恰好可开采的煤，以及靠暴力与奴隶制获得的美洲新大陆——它们替欧洲解除了土地约束。",
  parts: [
    { no: 0, label: "导论" },
    { no: 1, label: "第一部分 · 一个惊人相似的世界" },
    { no: 2, label: "第二部分 · 从新风气到新经济？消费、投资与资本主义" },
    { no: 3, label: "第三部分 · 超越斯密与马尔萨斯：从生态约束到持续工业增长" },
  ],
  chapters: [
    { id: "ch00", no: 0, label: "导论", title_zh: "比较、联系与欧洲经济发展的叙事", title_en: "Introduction: Comparisons, Connections, and Narratives of European Economic Development", part: 0, text: "00_Introduction.txt" },
    { id: "ch01", no: 1, title_zh: "欧洲先于亚洲？人口、资本积累与技术", title_en: "Europe before Asia? Population, Capital Accumulation, and Technology", part: 1, text: "01_EuropeBeforeAsia.txt" },
    { id: "ch02", no: 2, title_zh: "欧洲与亚洲的市场经济", title_en: "Market Economies in Europe and Asia", part: 1, text: "02_MarketEconomies.txt" },
    { id: "ch03", no: 3, title_zh: "奢侈消费与资本主义的兴起", title_en: "Luxury Consumption and the Rise of Capitalism", part: 2, text: "03_LuxuryConsumption.txt" },
    { id: "ch04", no: 4, title_zh: "看得见的手：企业结构、社会政治结构与「资本主义」", title_en: "Visible Hands: Firm Structure, Sociopolitical Structure, and \"Capitalism\" in Europe and Asia", part: 2, text: "04_VisibleHands.txt" },
    { id: "ch05", no: 5, title_zh: "共同的约束：西欧与东亚的生态压力", title_en: "Shared Constraints: Ecological Strain in Western Europe and East Asia", part: 3, text: "05_SharedConstraints.txt" },
    { id: "ch06", no: 6, title_zh: "解除土地约束：美洲作为新型边缘", title_en: "Abolishing the Land Constraint: The Americas as a New Kind of Periphery", part: 3, text: "06_AbolishingLandConstraint.txt" },
  ],
};
