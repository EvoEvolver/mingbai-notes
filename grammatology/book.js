// 书目清单：章节顺序、标题与分部。章节内容在 chapters/<id>.jsx。
import { FEEDBACK_EMAIL } from "../feedback.js";

export default {
  lang: "zh",
  feedbackEmail: FEEDBACK_EMAIL,
  title: "论文字学", title_en: "Of Grammatology", author: "雅克·德里达", subtitle: "文字先于字母：解构逻各斯中心主义",
  intro: "西方思想两千年来把「说话」当作意义的亲身在场，把「文字」当作可有可无、甚至危险的补充。德里达追问：如果所谓的「在场」本身就由差异、踪迹与延迟构成——也就是说，言语本身早已是一种「文字」——那会怎样？第一部分搭建理论框架（原文字、延异、踪迹），第二部分细读列维-斯特劳斯与卢梭，揭示「增补」的逻辑。",
  parts: [{ no: 0, label: "译者序" }, { no: 1, label: "第一部分 · 字母之前的文字" }, { no: 2, label: "第二部分 · 自然、文化、文字" }],
  chapters: [
    { id: "ch00", no: 0, label: "译者序", title_zh: "斯皮瓦克译者序", title_en: "Translator's Preface (G. C. Spivak)", part: 0, text: "00_TranslatorsPreface.txt" },
    { id: "ch01", no: 1, title_zh: "书本的终结与文字的开端", title_en: "The End of the Book and the Beginning of Writing", part: 1, text: "01_Exergue_EndOfBook.txt" },
    { id: "ch02", no: 2, title_zh: "语言学与文字学", title_en: "Linguistics and Grammatology", part: 1, text: "02_LinguisticsGrammatology.txt" },
    { id: "ch03", no: 3, title_zh: "作为实证科学的文字学", title_en: "Of Grammatology as a Positive Science", part: 1, text: "03_PositiveScience.txt" },
    { id: "ch04", no: 4, title_zh: "文字的暴力：从列维-斯特劳斯到卢梭", title_en: "The Violence of the Letter: From Lévi-Strauss to Rousseau", part: 2, text: "04_ViolenceOfLetter.txt" },
    { id: "ch05", no: 5, title_zh: "「……那危险的增补……」", title_en: "\"…That Dangerous Supplement…\"", part: 2, text: "05_DangerousSupplement.txt" },
    { id: "ch06", no: 6, title_zh: "《语言起源论》的发生与结构（上）：位置与模仿", title_en: "Genesis and Structure of the Essay (I–II): Place & Imitation", part: 2, text: "06_GenesisStructure_I_II.txt" },
    { id: "ch07", no: 7, title_zh: "《语言起源论》的发生与结构（下）：分节", title_en: "Genesis and Structure of the Essay (III): Articulation", part: 2, text: "07_GenesisStructure_III.txt" },
    { id: "ch08", no: 8, title_zh: "从增补到源头：文字的理论", title_en: "From/Of the Supplement to the Source: The Theory of Writing", part: 2, text: "08_SupplementToSource.txt" },
  ],
};
