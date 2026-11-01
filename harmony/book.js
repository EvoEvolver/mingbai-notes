// 书目清单：章节顺序、标题与分部。章节内容在 chapters/<id>.jsx。
// 本书为「可听」试点：章节使用 @kit/audio 的发声组件（见 framework/spec/AUDIO.md）。
export default {
  title: "图解和声", title_en: "Harmony Illustrated", author: "叶小胖", subtitle: "用网格图听懂和声",
  intro: "这本书不靠五线谱和键盘图，而是用一张「网格图」（Tonnetz）讲和声：十二个音怎样循环，三和弦为什么是三角形，调、功能与和声进行又在图上走出什么形状。本站把书里的每一张图都做成了能点、能听的乐器——看见和弦的同时，也听见它。",
  parts: [{ no: 1, label: "基础篇 · 音与和弦" }, { no: 2, label: "基础篇 · 调与功能" }, { no: 3, label: "进阶篇 · 声部与结构" }],
  chapters: [
    { id: "ch01", no: 1, title_zh: "循环与网格图", title_en: "Cycles and the Tonnetz", part: 1, text: "ch01.txt" },
    { id: "ch02", no: 2, title_zh: "大调和声", title_en: "Major-Key Harmony", part: 2 },
    { id: "ch03", no: 3, title_zh: "小调和声", title_en: "Minor-Key Harmony", part: 2 },
    { id: "ch04", no: 4, title_zh: "副调和弦", title_en: "Secondary Chords", part: 2 },
    { id: "ch05", no: 5, title_zh: "变化与延伸", title_en: "Alteration and Extension", part: 2 },
    { id: "ch06", no: 6, title_zh: "排列与连接", title_en: "Voicing and Voice Leading", part: 3 },
    { id: "ch07", no: 7, title_zh: "和弦外音", title_en: "Non-Chord Tones", part: 3 },
    { id: "ch08", no: 8, title_zh: "和弦变换", title_en: "Chord Transformations", part: 3 },
    { id: "ch09", no: 9, title_zh: "音乐的结构", title_en: "Musical Structure", part: 3 },
    { id: "ch10", no: 10, title_zh: "基础篇总结", title_en: "Summary", part: 3 },
  ],
};
