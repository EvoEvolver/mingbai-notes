// 前言 · Preface —— 博尔赫斯的笑、秩序的经验、考古学与全书地图
import { ChapterPage, Block, Hook, SectionCards, ArgumentFlow, ConceptGrid, ConceptMap, ExampleCompression,
  DragSort, CompareTable, QuoteCarousel, Quiz, Takeaways, Bridge, Glossary, C, Callout, StepThrough } from "@kit";
import Encyclopedia from "./_ch00_encyclopedia.jsx";
import Roadmap from "./_ch00_roadmap.jsx";

export const meta = {
  id: "ch00",
  no: 0,
  title_zh: "前言",
  title_en: "Preface",
  era: "写于 1966 年 · 考察范围：16 世纪至今",
  one_liner: "一部荒诞的「中国百科全书」让人发笑，也让人看见：我们的分类方式本身有历史。",
  big_question: "我们凭什么确信「猫和狗不如两只灵缇像」？让一切分类成立的那块地面，从哪里来，又会不会变？",
  why_it_matters: "前言是全书的使用说明书：它交代了福柯要挖的不是「观念」，而是让观念得以出现的深层秩序（知识型、历史先天），并预告了全书的骨架——两次断裂、三个时代，以及那句惊人的结论：「人」只是一个晚近的发明。",
  original_words: 4471,
  read_minutes: 6,
};

export const groups = [
  { id: "shock", label: "博尔赫斯的笑" },
  { id: "order", label: "秩序" },
  { id: "method", label: "考古学方法" },
  { id: "map", label: "全书地图" },
];

export const concepts = [
  {
    id: "chinese_encyclopedia", name_zh: "中国百科全书", name_en: "The 'Chinese encyclopaedia'", icon: "📜",
    section_id: "s1", group: "shock",
    plain: "博尔赫斯虚构的动物分类，荒诞到让我们根本「想不了」它。",
    explain: "博尔赫斯引用一部「某中国百科全书」，把动物分成：属于皇帝的、制成标本的、驯服的、乳猪、人鱼……一直到「远看像苍蝇的」。福柯说，读到这里的大笑，一下子震碎了我们思想里所有熟悉的地标。\n\n但他追问：不可思议的到底是什么？每一类单看都有明确意思，怪物也被老老实实关进了自己的格子。真正越界的，是把这些类目一个接一个连起来的那串字母 a、b、c……它们之间没有任何共同的地面。\n\n异域的魅力因此反照出我们自己思想的边界：我们发现有些东西，我们就是没法那样去想。",
    analogy: "像有人给你的衣柜贴标签：「周一穿的」「蓝色的」「借来的」「让我想起前任的」「等等」。每张标签都看得懂，可你整理不了——因为它们不在同一个维度上，连一件衣服该放哪儿都定不下来。",
    book_example: { what: "(h)「包括在本分类中的」这一类：如果所有动物都在这张表里，其他各类似乎也都落入 (h)，容器与内容无法稳定。", point: "荒诞摧毁的不是某个类目，而是让东西能被「分进去」的那个空间。" },
    misconception: "福柯并不是在嘲笑中国或拿异域猎奇；「中国」在这里是西方想象中的一个符号，笑声针对的是我们自己思想的极限。",
  },
  {
    id: "tabula", name_zh: "桌子 / 表（tabula）", name_en: "Table / tabula", icon: "🛏️",
    section_id: "s1", group: "shock",
    plain: "让万物可以并排摆放、分门别类的那块看不见的共同地面。",
    explain: "福柯借超现实主义的名句「雨伞和缝纫机在手术台上相遇」，给「桌子」叠了两层意思：一层是那张真实的手术台，再怪的东西也能在上面碰面；另一层是 tabula——一张让思想对万物进行排序、分类、按相似与差异命名的「表」。\n\n对照很清楚：小说人物 Eusthenes 列了一长串 A 字头的怪虫，荒诞，但它们都在他的嘴里有个落脚处。博尔赫斯的列表却连这个落脚处都没有，他拿走的正是这张桌子。\n\n福柯说，自古以来，语言就是在这张桌子上与空间相交的。",
    analogy: "像电子表格的「列」：数据再杂，只要放在同一张表、同一组列下，就能比较、排序。博尔赫斯的分类相当于每一行都有自己的列名，表格本身塌了。",
    book_example: { what: "Eusthenes 宣布不吃的那串怪物（Aspics、Axolotls、Anacondas……）都在他的嘴里「同居」。", point: "古怪的并置只要有共同场所就还能理解；博尔赫斯的可怕在于连场所都被取消了。" },
    misconception: "这里的「桌子」不是比喻家具，而是指任何分类活动预设的那个同质空间；后文古典时代的「表格」正是它的历史形态之一。",
  },
  {
    id: "heterotopia", name_zh: "异托邦", name_en: "Heterotopia", icon: "🌀",
    section_id: "s2", group: "shock",
    plain: "把东西放在彼此毫无公共处的位置上，让语言无从下口的空间。",
    explain: "福柯区分了两种「不在场的地方」。乌托邦虽然不真实，却展开在一个平静的幻想空间里，有宽阔大道和花园，它顺着语言的纹理生长，可以讲成故事，所以给人安慰。\n\n异托邦令人不安：它暗中瓦解语言，让人没法给这个那个命名，甚至事先摧毁「句法」——不只是造句的句法，还有让词与物「挨着、对着」而聚在一起的那种更隐蔽的句法。它让话语干涸、让抒情失效。\n\n比单纯的「不协调」更糟的无序，是许多可能秩序的碎片各自闪烁，却找不到一个共同处所。福柯强调要按词源理解 heteroclite：东西被「放置」在彼此迥异的地方。",
    analogy: "乌托邦像一部设定完整的奇幻小说，虽然虚构但能顺畅讲下去；异托邦像一部每页换一套语法和地图的书，你连「这里在说什么」都无法开口。",
    book_example: { what: "失语症者面对一桌不同颜色的毛线，一会儿按浅色、一会儿按红色、一会儿按软硬或长短分堆，分了又散，越分越焦虑。", point: "失去「地点与名称的共同处」，就是无法建立秩序：无地点（atopia）与失语（aphasia）是同一种困境。" },
    misconception: "异托邦不等于「很奇怪的地方」；它的要害是取消了共同的命名与摆放空间，而不只是罕见或荒诞。",
  },
  {
    id: "grid_of_order", name_zh: "秩序的格栅", name_en: "Order and its grid", icon: "🔲",
    section_id: "s3", group: "order",
    plain: "再朴素的分类也先要有一套标准；秩序既在物中，又只在目光的格栅里显现。",
    explain: "我们凭什么断定猫和狗不如两只灵缇像？这既不是逻辑推导出来的，也不是感官直接给的。建立秩序看似最经验、最靠眼力，可即便未受训练的眼睛，每一次「像」与「不像」都已经是一次运作，套用了一个预先的标准。\n\n福柯称之为「元素系统」：先划定按哪些片段比较，这些片段可以怎样变化，以及一条门槛——过了它算差异、没过算相似。\n\n于是秩序有双重身份：它像是物自身的内在法则，又只存在于一道目光、一次检查、一种语言织成的格栅中；而正是在格栅的空白处，它显得仿佛早已在那儿静静等待。",
    analogy: "就像图片识别模型：它看出「这是猫」，背后早有人决定了看哪些特征、阈值设多少。换一组特征和阈值，「像」与「不像」的边界就跟着变。",
    book_example: { what: "猫与狗 vs 两只灵缇：即使二者都驯服、都是标本、都刚打破水罐，我们仍确信灵缇彼此更像。", point: "我们用的那张「表」是默认的；博尔赫斯的类目恰恰是另一套格栅。" },
    misconception: "福柯不是说秩序纯属主观捏造；他说秩序既被当成物的内在法则，又只在某种格栅中显现，两面同时成立。",
  },
  {
    id: "experience_of_order", name_zh: "秩序的经验（中间地带）", name_en: "The pure experience of order", icon: "🧭",
    section_id: "s3", group: "order",
    plain: "介于日常文化代码和科学理论之间、最底层的那层「事物本来就有秩序」的体验。",
    explain: "福柯把一种文化分成三层。一端是基本代码：语言、感知图式、交换、技术、价值，一开始就替每个人定好了他会遇到、会感到自在的经验秩序。另一端是科学理论和哲学解释，回答秩序为何存在、遵循什么法则。\n\n两者之间有一个更模糊、更难分析的中间地带：文化在这里悄悄偏离自己的初级代码，意识到这些秩序未必是唯一或最好的，于是直面「秩序本身存在」这一赤裸事实。这层经验里，秩序可以呈现为连续或断裂、绑定空间或被时间推动……\n\n福柯认为它最根本：先于词语、感知与手势，又比试图解释它的理论更古老、更「真」。本书就是要分析这层经验。",
    analogy: "像一座城市的地基：上面的街道（日常代码）和城市规划理论（科学）都看得见，地基埋在中间，平时没人注意，但它决定了街道能怎么修、规划能怎么写。",
    book_example: { what: "前言把这层经验描述为在「已被编码的眼睛」与「反思性知识」之间、让秩序本身得以解放出来的中间区域。", point: "考古学的对象就在这里，而不在日常习惯或成熟理论中。" },
    misconception: "它不是某个人的心理体验，而是一个文化在特定时代整体上「如何经验秩序」的方式。",
  },
  {
    id: "episteme", name_zh: "知识型", name_en: "Episteme", icon: "🗺️",
    section_id: "s4", group: "method",
    plain: "某个时代所有知识共同站立的认识论场地，决定什么能被当成知识。",
    explain: "福柯要照亮的是「认识论场域」，即 episteme：在这里，知识被抛开它的理性价值和客观形式来考察，看它如何建立自己的实证性。\n\n这样显现出的历史，不是知识越来越完善的历史，而是知识「可能性条件」的历史。知识型像一个时代的共同地形：语言研究、生命研究、财富研究看似各自独立，其实被同一种秩序模式塑造。\n\n所以同一知识型下的不同学科，彼此之间往往比和自己的「后代」更像。",
    analogy: "像一个时代的「操作系统」：上面跑的应用（语法、分类学、经济学）千差万别，但都调用同一套底层接口；换了系统，旧应用不是升级，而是根本跑不起来。",
    book_example: { what: "林奈、Tournefort、Buffon 的博物学，与其说接近居维叶和达尔文，不如说接近同时代 Bauzée 的普通语法和 Law、Turgot 的货币财富分析。", point: "知识型是横向的同构，而不是纵向的传承。" },
    misconception: "知识型不是一个时代的「世界观」或主流思想，也不是人们有意遵守的规则；它是让各种思想得以出现的无意识配置。",
  },
  {
    id: "historical_a_priori", name_zh: "历史先天", name_en: "Historical a priori", icon: "⏳",
    section_id: "s4", group: "method",
    plain: "让某时代的知识成为可能的前提条件，它是先在的，却又是历史的、会变的。",
    explain: "康德的「先天」指一切经验之前、普遍必然的条件。福柯给它加上「历史」二字，故意制造张力：确实有一些条件先于具体的观念与科学，决定它们能否出现；但这些条件不是永恒的，它们属于某个时代，也会随时代瓦解。\n\n前言提问的方式就是：在什么样的历史先天之上、在什么实证性的元素中，观念得以出现、科学得以建立、理性得以形成，然后也许很快又消散？\n\n在讲「同一的历史」时，福柯又问：是什么历史先天，让古典思想能在杂乱的差异背景上画出一张清晰同一性的大棋盘？",
    analogy: "像一门语言的语法：你说话前它已经在那儿，决定什么句子「说得通」，可它不是天经地义——几百年后的语法可能完全不同。",
    book_example: { what: "古典时代能把相似与等价关系当作词语、分类、交换体系的基础，这本身需要一个历史先天来解释。", point: "全书就是在追问每个时代的这一前提。" },
    misconception: "「先天」不是指与生俱来或逻辑必然；在福柯这里它恰恰是可变的、属于历史的。",
  },
  {
    id: "archaeology", name_zh: "考古学", name_en: "Archaeology", icon: "⛏️",
    section_id: "s4", group: "method",
    plain: "不讲知识怎样进步，而是挖出每个时代知识的可能性条件及其断层。",
    explain: "福柯明确说，这项研究既不属于观念史，也不属于科学史。它不描述知识怎样一步步走向今天的客观性，而是要找出：知识与理论在什么基础上成为可能，在怎样的秩序空间中被建构起来。\n\n考古学面向知识的总体空间及其配置，界定「同时性系统」，以及跨入新实证性门槛所必要且充分的一系列突变。它承认观念或许会彼此影响、自我转化，但那不是它的问题。\n\n这个词很贴切：像考古一样，它挖的是安静地层，并让这片看似不动的土地重新露出裂缝。",
    analogy: "观念史像看家谱：谁传给谁、谁影响了谁。考古学像看地质剖面：不问哪块石头是哪块的后代，只看同一地层里一起沉积了什么，以及地层之间哪里突然断开。",
    book_example: { what: "前言末尾：挖掘西方文化最深的地层，就是把裂缝、不稳定和缺陷还给我们沉默而看似不动的土地。", point: "考古学的成果正是「断裂」与「地层」，而不是一条连续的进步线。" },
    misconception: "考古学不是研究古代文物，也不是说过去的知识「错了」；它悬置真假与进步评价，只问条件。",
  },
  {
    id: "discontinuity", name_zh: "两次断裂", name_en: "Two great discontinuities", icon: "⚡",
    section_id: "s4", group: "map",
    plain: "约 17 世纪中叶与 19 世纪初，西方知识的整个地基两次整体翻转。",
    explain: "考古学发现西方知识型的两大断裂：第一次开启古典时代（约 17 世纪中叶），第二次在 19 世纪初开启现代。\n\n我们容易以为欧洲理性从文艺复兴一路连续发展：林奈的分类今天仍有点效力，孔狄亚克的价值论在边际主义里依稀可辨，凯恩斯意识到自己和 Cantillon 相近，Port-Royal 的普通语法离我们也不远。福柯说，这些观念层面的「准连续」只是表面。\n\n在考古层面，实证性系统在 18 世纪末、19 世纪初被整体改写。不是理性进步了，而是事物的存在方式、以及事先划分它们的秩序发生了深刻改变。",
    analogy: "像从胶片相机到数码相机：「拍照」这个词还在，构图术语也沿用，但底层从化学感光变成了传感器和像素，整套技术逻辑换了。",
    book_example: { what: "19 世纪起：交换与货币分析让位于生产研究，分类特征让位于有机体，语言失去特权、变成有自己过去的历史形式。", point: "三个领域同时翻转，说明变的是共同的地基，而非某门学科的内部进展。" },
    misconception: "断裂不是说一夜之间所有人都换了想法；它是在考古层面上，一个配置被另一个配置取代，不等于「进步」。",
  },
  {
    id: "man_invention", name_zh: "人是晚近的发明", name_en: "Man as a recent invention", icon: "👤",
    section_id: "s4", group: "map",
    plain: "作为知识对象的「人」不到两百年，是现代知识型的产物，也可能随之消失。",
    explain: "当表征不再充当一切秩序的普遍基础，事物开始在自身的发展中寻找可理解性的原则，「人」才第一次进入西方知识的领域。\n\n天真的人以为研究人是自苏格拉底以来最古老的课题；福柯却说，人或许只是「物的秩序」中的一道裂隙，一个由他在知识中新占据的位置所勾勒的形象。由此产生了各种新人文主义的幻象，以及半经验、半哲学的「人类学」。\n\n福柯说，想到人只是知识中的一道新皱纹，并且一旦知识找到新形式就会再次消失，反倒令人宽慰。这是全书最后几章要论证的结论。",
    analogy: "像地图上的「国界线」：看起来天经地义，其实是某次条约画出来的。不是土地上的人不存在了，而是那条线可能被重新画掉。",
    book_example: { what: "前言预告：正是在古典与现代之间的那道门槛上，「人」这个奇特的知识形象首次出现，并为人文科学开辟了空间。", point: "第 9、10 章将完整展开这一论题。" },
    misconception: "福柯不是说人类这个物种是新的或会灭绝，而是说「人」作为知识的对象与主体这一形象是 19 世纪才有的。",
  },
];

export const relations = [
  { from: "chinese_encyclopedia", to: "tabula", label: "拿走了" },
  { from: "chinese_encyclopedia", to: "heterotopia", label: "是一种" },
  { from: "heterotopia", to: "tabula", label: "缺乏共同" },
  { from: "chinese_encyclopedia", to: "grid_of_order", label: "反照出" },
  { from: "tabula", to: "grid_of_order", label: "即分类空间" },
  { from: "grid_of_order", to: "experience_of_order", label: "扎根于" },
  { from: "experience_of_order", to: "episteme", label: "历史形态即" },
  { from: "historical_a_priori", to: "episteme", label: "奠定" },
  { from: "archaeology", to: "episteme", label: "挖掘" },
  { from: "archaeology", to: "historical_a_priori", label: "追问" },
  { from: "archaeology", to: "discontinuity", label: "揭示" },
  { from: "discontinuity", to: "episteme", label: "分隔" },
  { from: "discontinuity", to: "man_invention", label: "第二次带来" },
  { from: "episteme", to: "man_invention", label: "现代型产生" },
  { from: "tabula", to: "episteme", label: "古典时代为表" },
];

const sections = [
  {
    id: "s1", no: "1", title_zh: "博尔赫斯的笑", title_en: "The Chinese encyclopaedia",
    gist: "一部荒诞分类让我们看见自己思想的界限：被拿走的是让东西并置的「桌子」。",
    summary: "全书起于博尔赫斯笔下一部「中国百科全书」的动物分类。福柯发现，每一类单看都有意义，怪物也被安排在专属格子里；真正不可思议的是把它们串在一起的那串字母。对照 Eusthenes 嘴里的怪虫与手术台上的雨伞缝纫机：怪异的并置只要有共同场所就还可理解，而博尔赫斯取消的正是这个场所——那张让思想分类万物的 tabula。",
    concept_ids: ["chinese_encyclopedia", "tabula"],
  },
  {
    id: "s2", no: "2", title_zh: "异托邦与失语", title_en: "Heterotopia, aphasia, China",
    gist: "比不协调更糟的无序，是连共同处所都找不到：异托邦让语言失效。",
    summary: "乌托邦虽属虚构，却展开在平静的幻想空间里，可以讲成故事；异托邦则瓦解语言和让词与物「凑在一起」的隐秘句法。失语症者面对彩色毛线分了又散、陷入焦虑，正是失去「地点与名称的共同处」。博尔赫斯把这种分类放到「中国」，而中国在西方想象中恰是最讲究空间秩序的文明——一种极度有序、却不按我们范畴分配万物的文化。",
    concept_ids: ["heterotopia"],
  },
  {
    id: "s3", no: "3", title_zh: "秩序的三层", title_en: "The experience of order",
    gist: "一切分类都靠预设的格栅；在文化代码与科学理论之间，有一层赤裸的秩序经验。",
    summary: "我们凭什么断定两只灵缇比猫和狗更像？任何相似与差异都依赖一个「元素系统」。秩序既像物的内在法则，又只在目光与语言的格栅中显现。文化里有三层：规定日常经验秩序的基本代码，解释秩序的科学与哲学理论，以及二者之间那片模糊却最根本的中间地带——文化在此直面「秩序存在」本身，并以连续或断裂、空间或时间等不同方式经验它。",
    concept_ids: ["grid_of_order", "experience_of_order"],
  },
  {
    id: "s4", no: "4", title_zh: "考古学与两次断裂", title_en: "Episteme, archaeology, man",
    gist: "研究秩序经验的历史，就是知识型的考古学；它发现两次断裂和晚近的「人」。",
    summary: "本书追踪 16 世纪以来，语言、生物、交换三个领域如何显现秩序。这不是观念史或科学史，而是寻找知识的历史先天与认识论场域（知识型），即可能性条件的历史，故称「考古学」。它发现两次断裂：约 17 世纪中叶进入古典时代、19 世纪初进入现代。古典时代以表征理论统一语法、博物学与财富分析；现代则引入历史性，「人」首次成为知识对象，而这个形象不到两百年。",
    concept_ids: ["episteme", "historical_a_priori", "archaeology", "discontinuity", "man_invention"],
  },
  {
    id: "s5", no: "5", title_zh: "同一的历史", title_en: "A history of the Same",
    gist: "《疯癫史》写「他者」如何被排斥；本书写「同一」如何被分类与聚合。",
    summary: "本书与福柯的《古典时代疯狂史》有相同的时间节点：从文艺复兴末到 19 世纪初的现代门槛。但疯癫史研究文化如何划出限定自身的差异，是「他者」的历史；本书研究文化如何经验事物的邻近、建立它们关系的表格，是「同一」的历史，也就是一部相似的历史。疾病兼具他者与同一两面，医学可另成一种考古学。挖掘深层地层，就是让脚下这片土地重新颤动。",
    concept_ids: ["historical_a_priori", "man_invention"],
  },
];

const flow = [
  { claim: "博尔赫斯的分类让人发笑，笑声暴露了我们思想的边界。", detail: "我们一下子「想不了」那样的分类，异域的奇趣反照出自己思想的局限。" },
  { claim: "不可思议的不是任何一个类目，而是让它们并置的共同场所消失了。", detail: "怪物各有格子；越界的是把 (a)(b)(c)… 串起来的「和」。Eusthenes 的嘴、手术台都还提供场所，博尔赫斯连场所都取消了。" },
  { claim: "失去共同场所，就是异托邦：语言与命名都会瓦解。", detail: "乌托邦能被讲述；异托邦让句法失效。失语症者无法把毛线排出连贯的秩序，便是这种困境的临床版本。" },
  { claim: "反过来看，我们自己的分类也依赖一张看不见的「表」。", detail: "认定灵缇比猫狗更像，需要预先设定比较片段、变化方式与相似/差异的门槛，即一个元素系统。" },
  { claim: "在文化代码与科学理论之间，有一层最根本的「秩序经验」。", detail: "它先于词语、感知与手势，比理论更古老、更「真」；文化在这里发现秩序本身存在，并以特定方式经验它。" },
  { claim: "本书分析这层经验的历史：这是知识型的考古学，而非观念史。", detail: "不问知识如何进步，而问在什么历史先天、什么实证性之上，各门知识得以成立。" },
  { claim: "考古学发现两次整体断裂：约 1650 年的古典时代、约 1800 年的现代。", detail: "观念上的连续只是表面；林奈的博物学属于同时代的语法与财富分析，而不是后来的生物学。" },
  { claim: "现代知识型中，「人」第一次成为知识对象，而它可能随知识型一起消失。", detail: "人只是一道新的皱纹；这让本书成为一部「同一」的历史，也让我们脚下的地面重新晃动。" },
];

const layers = [
  { label: "基本代码", content: <><p><b>最上层，也是你每天活在其中的那层。</b>语言、感知方式、交换、技术、价值、实践的等级，从一开始就替每个人安排好了他会碰到、会感到自在的经验秩序。</p><p>它像空气：你在里面，却意识不到它是一种安排。</p></> },
  { label: "科学与哲学理论", content: <><p><b>另一端是反思的层面。</b>科学理论与哲学解释回答：为什么一般地存在秩序？它遵循什么普遍法则？为什么是这种秩序而不是别的？</p><p>观念史和科学史通常研究的就是这一层。</p></> },
  { label: "中间地带：秩序的经验", content: <><p><b>夹在两者之间、更模糊也更难分析的一层。</b>文化在这里悄悄偏离自己的代码，发现那些秩序未必唯一或最好，从而直面「秩序本身存在」。</p><p>福柯说它最根本：先于词语与感知，比理论更古老。秩序在这里会呈现为连续或断裂、属于空间或被时间推动——不同时代各不相同。<C id="experience_of_order">这正是本书要分析的对象</C>。</p></> },
  { label: "考古学挖哪里", content: <><p><b>结论：</b>考古学不盯着日常习惯，也不盯着成熟理论，而是向下挖到中间那层，找出每个时代经验秩序的方式——它的<C id="episteme">知识型</C>与<C id="historical_a_priori">历史先天</C>。</p><p>由此再回头看：语言、感知与实践会被它重新批评，理论也会以它为地基被建立起来。</p></> },
];

function LayerSvg(i) {
  const L = [
    { y: 18, t: "基本代码：语言 · 感知 · 交换 · 技术 · 价值", c: "#b8862b" },
    { y: 150, t: "科学理论 · 哲学解释", c: "#2c4a6e" },
    { y: 84, t: "秩序的经验（中间地带）", c: "#9b2c1f" },
  ];
  const hi = i === 0 ? 0 : i === 1 ? 1 : 2;
  return <svg viewBox="0 0 520 220" style={{ width: "100%", maxHeight: 250, background: "var(--paper)", borderRadius: 14 }}>
    {[L[0], L[2], L[1]].map((l, k) => {
      const idx = L.indexOf(l), on = idx === hi;
      return <g key={k}>
        <rect x={40} y={l.y} width={440} height={52} rx={12} fill={l.c + (on ? "33" : "10")} stroke={on ? l.c : "var(--line)"} strokeWidth={on ? 3 : 1.5} style={{ transition: ".3s" }} />
        <text x={260} y={l.y + 32} textAnchor="middle" fontSize="15" fill="#1f1b16" fontWeight={on ? 700 : 400}>{l.t}</text>
      </g>;
    })}
    {i === 3 && <g>
      <text x={500} y={120} fontSize="26" textAnchor="end">⛏️
        <animate attributeName="y" values="70;118;70" dur="1.6s" repeatCount="indefinite" /></text>
      <line x1={20} y1={110} x2={36} y2={110} stroke="#9b2c1f" strokeWidth="3" />
    </g>}
    <text x={14} y={44} fontSize="11" fill="var(--muted)">日常</text>
    <text x={14} y={176} fontSize="11" fill="var(--muted)">反思</text>
  </svg>;
}

const compression = [
  { examples: ["中国百科全书的 14 类动物", "Eusthenes 嘴里的 A 字头怪虫", "手术台上的雨伞与缝纫机"], says: "并置能否被思考，取决于有没有一个共同的「场所 / 桌子」；博尔赫斯取消的就是它。" },
  { examples: ["异托邦 vs 乌托邦", "失语症者分不好的毛线", "西方想象中的「中国」"], says: "失去「地点与名称的共同处」，命名与秩序就无从建立。" },
  { examples: ["猫与狗 vs 两只灵缇", "未经训练的眼睛也在分组", "「元素系统」与相似/差异的门槛"], says: "没有任何相似是「直接看到」的，每次分类都套用了预设标准。" },
  { examples: ["林奈的分类今天仍有效？", "孔狄亚克 → 边际主义", "凯恩斯 ≈ Cantillon", "Port-Royal 语法离我们不远"], says: "观念层面的连续只是表面；在考古层面，19 世纪初地基已整体更换。" },
];

const sorter = {
  instruction: "下面这些问题，哪些是传统观念史 / 科学史会问的，哪些是福柯的考古学会问的？",
  categories: [{ id: "hist", label: "观念史 / 科学史" }, { id: "arch", label: "考古学" }],
  items: [
    { text: "林奈的分类法影响了哪些后来的生物学家？", answer: "hist", why: "追问影响与传承，是纵向的观念史问题。" },
    { text: "林奈的博物学与同时代的普通语法共享什么秩序模式？", answer: "arch", why: "横向比较同一时代不同学科的共同配置，正是知识型分析。" },
    { text: "达尔文的进化论比之前的理论正确在哪里？", answer: "hist", why: "以今天的科学为终点评判进步，是考古学刻意悬置的。" },
    { text: "在什么条件下，「人」才能成为一个知识对象？", answer: "arch", why: "追问可能性条件（历史先天），是考古学的核心问题。" },
    { text: "凯恩斯从 Cantillon 那里继承了什么？", answer: "hist", why: "寻找思想谱系的连续性，福柯认为这只停留在表面。" },
    { text: "为什么 19 世纪初，交换分析会让位于生产研究？", answer: "arch", why: "关注整体配置的突变与断裂，而非单个学说的改进。" },
    { text: "某位学者的哪个发现推动了学科进步？", answer: "hist", why: "围绕个人发现与进步叙事，是传统科学史的写法。" },
    { text: "古典时代凭什么能把相似与等价当作分类与交换的基础？", answer: "arch", why: "这是福柯在前言中直接提出的历史先天问题。" },
  ],
};

const contrast = {
  title: "观念史 / 科学史 vs 福柯的考古学",
  left: "观念史 / 科学史",
  right: "考古学",
  rows: [
    { aspect: "研究对象", left: "观念、理论、学说及其作者", right: "让观念得以出现的秩序空间（知识型）" },
    { aspect: "阅读方向", left: "纵向：一门学科从古到今", right: "横向：同一时代的不同学科" },
    { aspect: "时间形态", left: "连续、积累、进步", right: "同时性系统 + 整体断裂" },
    { aspect: "评价标准", left: "以今天的科学为准，看谁更接近真理", right: "悬置理性价值与客观性，只问可能性条件" },
    { aspect: "林奈应该和谁放在一起", left: "居维叶、达尔文（生物学的前辈）", right: "Bauzée 的语法、Turgot 的财富分析" },
    { aspect: "「人」的地位", left: "自苏格拉底以来最古老的研究对象", right: "19 世纪才出现的知识形象，可能消失" },
  ],
};

const quotes = [
  { en: "the limitation of our own, the stark impossibility of thinking that.", zh: "我们自身的局限，那种根本无法那样去思考的赤裸的不可能性。", meaning: "笑声的真正对象不是异域，而是我们自己思想的边界。" },
  { en: "What is impossible is not the propinquity of the things listed, but the very site on which their propinquity would be possible.", zh: "不可能的不是所列事物的邻近，而是它们得以邻近的那个场所本身。", meaning: "博尔赫斯拿走的是「桌子」：让一切并置与分类成立的共同地面。" },
  { en: "Such an enterprise is not so much a history, in the traditional meaning of that word, as an 'archaeology'.", zh: "这项工作与其说是传统意义上的历史，不如说是一种「考古学」。", meaning: "福柯要挖的是知识的可能性条件与地层，而非进步的故事。" },
  { en: "man is only a recent invention, a figure not yet two centuries old, a new wrinkle in our knowledge", zh: "人只是一个晚近的发明，一个还不到两百年的形象，我们知识中的一道新皱纹。", meaning: "「人」是现代知识型的产物，并非永恒的知识对象。" },
];

const quiz = [
  {
    q: "福柯认为博尔赫斯那份动物分类「不可思议」，关键原因是：",
    options: ["里面出现了人鱼、传说动物等不存在的东西", "每一个类目的意思都含糊不清", "各类目之间没有可以让它们并置的共同场所", "它来自一个西方人不熟悉的文明"],
    answer: 2,
    why: "福柯明说每一类都有明确含义，怪物也被关进自己的格子；不可能的是让它们挨在一起的那块地面。",
  },
  {
    q: "Eusthenes 嘴里的怪虫列表和博尔赫斯的列表，区别在于：",
    options: ["前者有一个共同处所（他的嘴）把它们收容在一起，后者没有", "前者都是真实动物，后者都是虚构动物", "前者按字母排列，后者没有", "前者更长、更荒诞"],
    answer: 0,
    why: "Eusthenes 的列表虽古怪，但「嘴」提供了栖身之处；博尔赫斯的列表其实也按字母排，而字母恰恰掩盖了场所的缺失。",
  },
  {
    q: "说「两只灵缇比猫和狗更像」，在福柯看来意味着什么？",
    options: ["这是任何人都能直接看到的客观事实，无需标准", "这依赖一个预先的元素系统：比什么、怎么变、以什么门槛算相似", "这完全是个人主观偏好", "这是逻辑上可以推导出来的必然结论"],
    answer: 1,
    why: "福柯说秩序既不是先天必然推导出来的，也不是感官直接给的；任何相似与区别都是一次套用了预设标准的运作。",
  },
  {
    q: "关于「秩序的经验」所在的中间地带，以下哪项最准确？",
    options: ["就是一个文化的日常语言习惯", "就是科学家对秩序所做的理论解释", "是某位哲学家的个人体验", "位于基本代码与理论之间，文化在此直面「秩序本身存在」，福柯认为它最根本"],
    answer: 3,
    why: "它介于已编码的眼睛与反思性知识之间，先于词语和感知、比理论更古老，是本书的分析对象。",
  },
  {
    q: "按照考古学的读法，林奈的博物学最应该和谁并列比较？",
    options: ["达尔文的进化论", "同时代的普通语法与货币财富分析", "居维叶的比较解剖学", "今天的分子生物学"],
    answer: 1,
    why: "福柯说 Tournefort、林奈、Buffon 的博物学若能和别的东西相关，那就是 Bauzée 的语法以及 Law、Turgot 的财富分析，而非生物学。",
  },
  {
    q: "「人是晚近的发明」这一说法的意思是：",
    options: ["作为知识对象的「人」这一形象是 19 世纪知识型的产物，并可能随之消失", "人类这个物种出现得很晚", "人文主义思想在 18 世纪被发明出来", "人们直到最近才开始思考自身"],
    answer: 0,
    why: "福柯说的是知识配置中的「人」：表征秩序瓦解后，人才第一次进入西方知识的领域。",
  },
];

const takeaways = [
  "博尔赫斯的分类可笑，是因为它拿走了让万物并置、分类的「桌子」；这一笑照出了我们自己思想的边界。",
  "我们的分类并非直接看到的事实，而依赖预设的格栅；秩序既像物的内在法则，又只在格栅中显现。",
  "在日常文化代码与科学理论之间，有一层最根本的「秩序经验」；它的历史形态就是知识型。",
  "考古学不讲知识的进步，而挖掘可能性条件（历史先天）；它发现了约 1650 年与约 1800 年的两次整体断裂。",
  "「人」作为知识对象只是现代知识型的产物，不到两百年，也可能被抹去——这是全书要一路论证到底的结论。",
];

const glossary = [
  { term: "Episteme", zh: "知识型", def: "某一时代所有知识共同依托的认识论场域，决定什么可被当作知识。" },
  { term: "Historical a priori", zh: "历史先天", def: "先于具体观念、使其成为可能，却属于特定历史并会改变的条件。" },
  { term: "Archaeology", zh: "考古学", def: "研究知识可能性条件及其断裂的方法，区别于观念史与科学史。" },
  { term: "Positivity", zh: "实证性", def: "一个时代的知识得以确立自身、作为知识出现的具体基础。" },
  { term: "Tabula / table", zh: "表 / 桌子", def: "让万物可被并置、排序、分类的共同空间；兼指手术台与分类表。" },
  { term: "Heterotopia", zh: "异托邦", def: "事物被置于毫无共同处所的位置，使命名与句法失效的空间。" },
  { term: "Utopia", zh: "乌托邦", def: "虽无真实地点、却在平静幻想空间中展开、可被讲述的地方。" },
  { term: "Heteroclite", zh: "异质混杂", def: "按词源指事物被「放置」在彼此迥异、找不到共同处所的地方。" },
  { term: "The Same / the Other", zh: "同一 / 他者", def: "本书写如何把事物聚合为同一（相似的历史），《疯癫史》写如何排斥他者。" },
  { term: "Classical age", zh: "古典时代", def: "约 17 世纪中叶至 18 世纪末，以表征为一切秩序基础的时代。" },
];

export default function Chapter() {
  return (
    <ChapterPage meta={meta} groups={groups} concepts={concepts} relations={relations}>
      <Block><Hook title={"手机相册为什么不会让你笑？"}>{"手机相册自动把照片分成「人物、宠物、美食、截图」，没人觉得奇怪。可如果它的分类是「属于老板的、做成标本的、刚打碎水杯的、远看像苍蝇的、等等」——你一定会笑出声。福柯说，这本书就起于这样一阵笑：博尔赫斯笔下一部「中国百科全书」的动物分类。笑完之后他不安起来：既然这种分类我们「想不了」，那我们觉得理所当然的分类，又是站在什么地面上的？这块地面，会不会也有历史？"}</Hook></Block>

      <Block id="encyc" toc="中国百科全书" kicker="本章专属图解 ①" title="亲手试试：这份分类为什么「想不了」"
        lead="博尔赫斯的 14 类动物。先试着给它们找一个共同标准，再看福柯怎样把问题推到「场所」上。">
        <Encyclopedia />
        <Callout tone="key" title="从笑声到问题">
          荒诞分类的价值在于反照：它让我们意识到自己的分类也依赖一块看不见的地面。福柯把这块地面称为<C id="experience_of_order">秩序的经验</C>，它的历史形态就是<C id="episteme">知识型</C>，它的前提就是<C id="historical_a_priori">历史先天</C>。
        </Callout>
      </Block>

      <Block id="secs" toc="结构" kicker="结构" title="前言分几步走" lead="原文没有小节编号，这里按论证段落分成五段。点开看概述。">
        <SectionCards sections={sections} />
      </Block>

      <Block id="flow" toc="论证主线" kicker="论证主线" title="从一阵笑到一整部考古学" lead="跳过所有例子，前言的推理其实就是这几步：">
        <ArgumentFlow steps={flow} />
      </Block>

      <Block id="layers" toc="秩序的三层" kicker="图解" title="秩序的三层：考古学往哪里挖"
        lead="福柯把一种文化拆成三层。一步步看，本书的研究对象在哪一层。">
        <StepThrough steps={layers} render={LayerSvg} />
      </Block>

      <Block id="roadmap" toc="全书地图" kicker="本章专属图解 ②" title="全书地图：三个知识型，两次断裂"
        lead="前言预告了全书的骨架。切换两种读法，比较「观念史」与「考古学」看到的是不是同一张图。">
        <Roadmap />
      </Block>

      <Block id="concepts" toc="概念卡片" kicker="核心概念" title="概念卡片" lead="每张卡：一句大白话 → 点开看深入解释、现代类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>

      <Block id="map" toc="概念地图" kicker="概念地图" title="它们怎么连在一起" lead="悬停高亮某个概念的邻居，点击打开卡片，可拖动节点。">
        <ConceptMap />
      </Block>

      <Block id="comp" toc="例子压缩" kicker="例子压缩器" title="前言的例子，其实只说了几件事" lead="点击一组，把它们压缩成一句话。">
        <ExampleCompression items={compression} />
      </Block>

      <Block id="sorter" toc="分类游戏" kicker="动手试试" title="这是谁会问的问题？" lead={sorter.instruction + "（可拖拽，也可先点卡片再点格子）"}>
        <DragSort categories={sorter.categories} items={sorter.items} />
      </Block>

      <Block id="contrast" toc="对照" kicker="对照" title={contrast.title}>
        <CompareTable left={contrast.left} right={contrast.right} rows={contrast.rows} />
      </Block>

      <Block id="quotes" toc="原文金句" kicker="原文金句" title="福柯原话（精选）">
        <QuoteCarousel quotes={quotes} />
      </Block>

      <Block id="quiz" toc="自测" kicker="自测" title="你真的懂了吗" lead="考理解，不考记忆。">
        <Quiz questions={quiz} />
      </Block>

      <Block id="end" toc="带走" kicker="带走" title="记住这几条就够了">
        <Takeaways items={takeaways} />
        <Bridge>{"带着前言的问题——「是什么让表征与分类成为可能？」——进入第 1 章《宫娥》。福柯不从理论开始，而是细读委拉斯开兹的一幅画：画中画家、画布、镜子、观者层层相望，古典时代的表征在此几乎完整地呈现了自己。留意画中那个被反复指向、却始终空着的位置——它是谁的？这个空位，正是前言所说「人」尚未登场的伏笔。"}</Bridge>
      </Block>

      <Block id="gloss" toc="术语表" kicker="术语表" title="术语速查">
        <Glossary terms={glossary} />
      </Block>
    </ChapterPage>
  );
}
