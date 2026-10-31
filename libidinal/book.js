// 书目清单：章节顺序、标题与分部。章节内容在 chapters/<id>.jsx。
export default {
  title: "力比多经济", title_en: "Libidinal Economy", author: "让-弗朗索瓦·利奥塔", subtitle: "欲望、符号与资本的能量学",
  intro: "1974 年，利奥塔写下他自称「邪恶之书」的作品：不再批判资本、不再寻找被异化的真实，而是把一切——符号、理论、马克思、货币、资本——都读成力比多强度在一条「巨大的短暂皮肤」上的流动与凝结。它同时向马克思主义、精神分析、符号学，以及鲍德里亚的「象征交换」开战。",
  parts: [{ no: 0, label: "译者序与导言" }, { no: 1, label: "装置：皮肤、横杠与张量" }, { no: 2, label: "力比多地读政治经济学" }, { no: 3, label: "收束：理论自身的经济" }],
  chapters: [
    { id: "ch00", no: 0, label: "导言", title_zh: "译者序、术语与导言", title_en: "Translator's Preface, Glossary & Introduction", part: 0, text: "00_Intro.txt" },
    { id: "ch01", no: 1, title_zh: "巨大的短暂皮肤", title_en: "The Great Ephemeral Skin", part: 1, text: "01_Skin.txt" },
    { id: "ch02", no: 2, title_zh: "张量", title_en: "The Tensor", part: 1, text: "02_Tensor.txt" },
    { id: "ch03", no: 3, title_zh: "名为马克思的欲望", title_en: "The Desire Named Marx", part: 2, text: "03_Marx.txt" },
    { id: "ch04", no: 4, title_zh: "交易", title_en: "Trade", part: 2, text: "04_Trade.txt" },
    { id: "ch05", no: 5, title_zh: "资本", title_en: "Capital", part: 2, text: "05_Capital.txt" },
    { id: "ch06", no: 6, title_zh: "这部写作的经济", title_en: "Economy of This Writing", part: 3, text: "06_Writing.txt" },
  ],
};
