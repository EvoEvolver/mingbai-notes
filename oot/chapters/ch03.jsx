// 第 3 章 · 表征 —— 古典知识型的总纲：相似退场、符号变成二元表征、秩序与表格成为知识中心
import { ChapterPage, Block, Hook, SectionCards, ArgumentFlow, ConceptGrid, ConceptMap, ExampleCompression,
  DragSort, CompareTable, QuoteCarousel, Quiz, Takeaways, Bridge, Glossary, C, Callout, Card, Grid } from "@kit";
import QuixoteLens from "./_ch03_quixote.jsx";
import SignShift from "./_ch03_sign.jsx";
import EpistemeMap from "./_ch03_episteme.jsx";

export const meta = {
  id: "ch03",
  no: 3,
  title_zh: "表征",
  title_en: "Representing",
  era: "17 世纪初–18 世纪末（古典时代）",
  one_liner: "相似从知识的形式沦为错误之源；符号变成表征之间的二元连接，知识的中心变成一张表格。",
  big_question: "当「找相似」不再算知识之后，17、18 世纪的人靠什么来认识世界？符号又变成了什么？",
  why_it_matters: "这一章是古典时代的总纲：后面讲语言（第 4 章）、生物分类（第 5 章）、货币与财富（第 6 章）的三章，都建立在这里描绘的「秩序 + 符号 + 表格」的地基上。看懂它，你会发现我们今天习以为常的「符号 = 能指 + 所指」、「知识 = 分类排序」，其实是 17 世纪才搭起来的历史建筑。",
  original_words: 13600,
  read_minutes: 18,
};

export const groups = [
  { id: "rupture", label: "断裂：相似的退场" },
  { id: "order", label: "秩序与表格" },
  { id: "sign", label: "符号与表征" },
  { id: "imagination", label: "想象与发生" },
];

export const concepts = [
  {
    id: "don_quixote", name_zh: "堂吉诃德：相似的英雄", name_en: "Don Quixote, hero of the Same", icon: "🐴",
    section_id: "s1", group: "rupture",
    plain: "一个还在用 16 世纪方式读世界的人，在 17 世纪的世界里只能显得疯狂。",
    explain: "福柯把《堂吉诃德》读成新旧知识型的分界线。堂吉诃德本人就像一个从书里逃出来的字母，他的使命是证明骑士小说说的是真的：于是他在大地上搜寻一切相像之处，把羊群读成军队、客栈读成城堡。可书里的符号已经不再像世界里的物，每一次「证明」都变成笑话；遇到不像的地方，他又用「魔法师作祟」来解释，差异于是又被吸回相似。\n\n在第二部里，人们读过了第一部、认出了他。这时他的真实只存在于词语之间，而不在词与世界的关系之中。福柯据此称它为第一部现代文学作品：语言断绝了与物的旧亲缘，进入孤独的自主状态。",
    analogy: "像一个刷了太多谍战剧的人：快递员是特工，邻居晾衣服是暗号，路灯闪一下是信号。他不是不认真，恰恰是太认真地照剧本去「读」世界——只是世界已经不按剧本写了。",
    book_example: { what: "羊群、女仆、客栈因为跟军队、贵妇、城堡有那么一点点像，就被他当作书中符号的兑现。", point: "说明相似与符号的旧联盟已经解体：相似变成了错觉，书里的词成了没有内容的空符号。" },
    misconception: "福柯不是在讲堂吉诃德的心理病理，而是把他当作一个「知识型断裂」的文化标本。",
  },
  {
    id: "madman_poet", name_zh: "疯子与诗人", name_en: "The madman and the poet", icon: "🎭",
    section_id: "s1", group: "rupture",
    plain: "相似被逐出知识之后，只在疯子和诗人身上活下来，一个滥用它，一个守护它。",
    explain: "相似与符号一旦分开，文化的两端就出现两个对称的角色。疯子（不是病人，而是被社会设定和维持的「偏离者」）是「原始相似」之人：他把东西当成别的东西，把陌生人认作熟人，以为王冠造就国王；他到处只看见相似，所有符号在他那里都彼此相像。\n\n诗人则相反：在已命名、已区分的词语底下，他重新听见事物之间被埋没的亲缘，那种「另一种语言」。疯子给一切符号加载相似直到把符号抹掉；诗人则把相似带回说出它的符号。两者都站在文化的边缘，而它们之间展开的，正是一个只看重同一与差异的知识领域。",
    analogy: "同样是「把不同的东西连起来」：阴谋论者把一切都连成一张网，结果什么都说明不了；好诗人用一个比喻把两件事连起来，让你忽然看见它们真有某种隐秘的关联。",
    book_example: { what: "巴洛克小说和戏剧中的疯子形象，一直延续到 19 世纪精神病学出现之前。", point: "说明疯癫在古典文化里被理解为「沉迷于相似、对差异无知」。" },
    misconception: "这不是柏拉图式「神圣的迷狂」那个老主题，而是一种新的语言与物的经验。",
  },
  {
    id: "critique_of_resemblance", name_zh: "对相似的批判", name_en: "Critique of resemblance", icon: "🔍",
    section_id: "s2", group: "rupture",
    plain: "17 世纪起，「看着像」不再是知识，而是需要警惕的错误根源。",
    explain: "17 世纪初，思想不再在相似的元素中运动。笛卡尔在《指导心灵的规则》开头就警告：人们一发现两物有几处相似，就容易把只对一方成立的东西也归给另一方。相似只剩下游戏：错视画、喜剧中的错认、戏中戏、梦境、欺骗人的感官。\n\n福柯区分了两种批判。培根的是经验性的：相似是心灵的「偶像」，像海市蜃楼，走近就散、远处又聚，要靠审慎去看出自然的差异。笛卡尔的则更根本：他不是禁止比较，而是把比较普遍化、纯化，把相似分解为同一、差异、度量与秩序。古典思想由此把相似排除出「知识的基本经验」。",
    analogy: "今天的统计课第一课就是「相关不等于因果」。在 16 世纪，「像」本身就是关系的证据；在 17 世纪以后，「像」只是提醒你：先别急，去测量、去比较。",
    book_example: { what: "培根所谓的「种族偶像」：心灵天生假设自然比实际更有秩序，于是虚构出「天体都沿完美圆周运动」。", point: "说明相似被重新理解为心灵的错觉，而不是世界的结构。" },
    misconception: "这不等于「迷信终于让位给科学」。福柯要描述的是知识得以可能的深层配置怎样变了，而不是理性战胜了蒙昧。",
  },
  {
    id: "measure_order", name_zh: "度量与秩序", name_en: "Measurement & order", icon: "📏",
    section_id: "s2", group: "order",
    plain: "比较只有两种：用共同单位去量，或者从最简单的开始一格一格排。",
    explain: "笛卡尔认为比较只有两种形式。度量：先把整体分成单位，再看两个量之间相等或不等，最终都能化成算术关系。秩序：不需要外部单位，只看两个项本身，从最简单的项出发，按差异由小到大一步不断地排成系列。\n\n关键的一步是：度量总能被化为秩序，因为数值本身就能排成序列。所谓「方法」就是把一切相等/不等的判断改写成从简单到复杂的排序。不过这种秩序是相对于我们如何认识而言的，「绝对的简单」不属于物本身；同一个东西换个角度可以排在不同位置。",
    analogy: "称重是「度量」：两袋米各几公斤，比一比。按难度给题目排序是「秩序」：不需要统一单位，只要知道哪题最基础、哪题紧跟其后。古典时代的野心是把前者都改写成后者。",
    book_example: { what: "三段论「所有 A 是 B，所有 B 是 C，故所有 A 是 C」：心灵其实是在借助 B 比较 A 与 C。", point: "说明在笛卡尔那里，几乎一切知识都靠比较获得，而比较的纯形式就是排序。" },
    misconception: "古典时代的核心不是「把一切数学化」，而是「一切都可排序」，哪怕是不可度量的东西。",
  },
  {
    id: "identity_difference", name_zh: "同一与差异", name_en: "Identity & difference", icon: "⚖️",
    section_id: "s2", group: "order",
    plain: "知识的工作从「把东西拉近」变成「把东西区分开」。",
    explain: "福柯把这次变化总结为几点：分析取代了类比的等级体系，每个相似都要先经比较检验；无尽的相似游戏变成了可以完全枚举的有限领域；知识因此可以达到确定性，而不再只是越来越大的或然性；心灵的活动不再是寻找亲缘，而是辨别，即确立同一，再确定系列中每一级之间必然的连接。\n\n最后一个后果：历史与科学分家。读古书、比对作者意见成了「博学」，只能算历史；只有直觉与其系列连接才算科学。书写的词从此不再是真理的记号，语言退出物的世界，进入透明与中立的时期。",
    analogy: "16 世纪的学者像在写「万物关联」的公众号：越找越多，永远不完。古典学者像在建数据库：先定义字段，再把每条记录逐一区分、归档，原则上可以穷尽。",
    book_example: { what: "笛卡尔说，即使读完柏拉图与亚里士多德的全部论证，学到的也不是科学，而是历史。", point: "说明知识与博学、科学与历史从此被分开，这正是 16 世纪「读自然如读书」的反面。" },
    misconception: "「区分」并不意味着古典思想放弃了相似；相似被保留为比较的起点，但不再是知识本身。",
  },
  {
    id: "sign_variables", name_zh: "符号的三个变量", name_en: "Three variables of the sign", icon: "🎛️",
    section_id: "s3", group: "sign",
    plain: "古典时代用确定性、关系类型、来源这三个开关来定义符号，不再需要相似。",
    explain: "古典思想按三个变量定义符号：确定还是或然（呼吸确定地表示活着，苍白或许表示怀孕）；属于所指还是与之分离（健康的气色是健康的一部分，旧约中的形象是道成肉身的遥远符号）；自然还是约定（镜中映像是自然的，词语对某个群体表示某个观念是约定的）。这些关系都不必以相似为前提：一声惊叫是恐惧的自然符号，却并不像恐惧。\n\n由此带来三个深刻后果：符号必须在知识中才能成立，世上不再有「未被认出的沉默记号」，知识与占卜（divinatio）断绝；符号不再把远处的东西拉到一起，而是把世界在空间中展开、一步步走过，所以它与分析不可分；自然与约定的价值颠倒了，人造符号才是符号的巅峰。",
    analogy: "16 世纪的符号像矿藏：埋在地下，没人挖也在那里。古典时代的符号像一张地铁换乘表：只有当有人知道「从 A 能换到 B」时它才存在，而且它的任务是把线路一站站摊开。",
    book_example: { what: "Berkeley：视觉是上帝在我们身上为触觉设立的符号，两者毫不相像。", point: "说明即使是「自然」符号，也不再需要相似；符号关系建立在知识之中。" },
    misconception: "「符号必须被认识才存在」不是说人已掌握所有符号，而是说只有在两个已知元素之间存在可替代关系时才有符号。",
  },
  {
    id: "arbitrary_sign", name_zh: "人为符号的优先", name_en: "The arbitrary (conventional) sign", icon: "🧮",
    section_id: "s3", group: "sign",
    plain: "人造的约定符号比自然符号更好用，因为它简单、可组合，能当分析的工具。",
    explain: "16 世纪也知道人类语言是约定的，但约定符号的力量来自它对自然符号的忠实。17 世纪起两者的价值颠倒：自然符号只是从物中挑出来的一个元素，僵硬、不便、难以掌控；约定符号却可以被刻意设计得简单、好记、能无限应用、可内部细分并与其他符号组合。人造符号划开了人与动物，把想象变成自觉的记忆、把本能变成理性认识；Itard 在「阿韦龙野孩子」身上发现缺的正是它。\n\n但这种任意并非随便：一个好的符号系统必须能把事物分解到最简单的元素，又能展示元素如何组合出复杂。寻找起源与组合计算在我们看来互相矛盾，在古典思想里却是同一个安排。知识的任务不再是挖出古老的圣言，而是「造一门语言，并把它造好」。",
    analogy: "化学元素符号就是这种思路：H、O 这些字母和氢、氧毫不相像，却正因为是约定的，才能写出 H₂O 这样的组合式，把复杂物质拆回元素、再拼出所有可能的组合。",
    book_example: { what: "Itard 对「阿韦龙野孩子」的报告：这个孩子缺少的，正是人为建立的符号。", point: "说明在古典思想里，约定符号是人之为人、从想象走向反思的关键。" },
    misconception: "「任意」不是相对于功能而言的随意，它的规则被功能精确规定：必须能分析，也必须能组合。",
  },
  {
    id: "binary_sign", name_zh: "二元符号", name_en: "Binary sign", icon: "↔️",
    section_id: "s4", group: "sign",
    plain: "符号不再是「记号—相似—所指」三项，而是两个观念之间的连接。",
    explain: "文艺复兴的符号是三元的：做标记的、被标记的，以及让人从前者看出后者的东西，也就是相似。自斯多葛派与早期希腊语法学家以来，符号理论一直是三元的。随着「靠相似思考」消失，这套统一的三元系统被严格的二元组织取代。\n\nPort-Royal《逻辑》说：符号包含两个观念，一个是表征之物的观念，一个是被表征之物的观念，其本质在于用前者激起后者。两者之间不再有中介形象，纽带建立在知识内部、观念与观念之间。福柯还指出，索绪尔把符号定义为「概念与音响形象的连接」，看似心理主义，其实正是重新发现了古典时代二元符号的条件。",
    analogy: "表情包「😂」和「笑」之间没有天然的焊点：你知道它代表笑，是因为在你的观念里，这个图和这个意思已经被绑在一起。符号的连接住在你的脑子里，而不在物上。",
    book_example: { what: "Port-Royal《逻辑》：符号包含两个观念，本质在于由前者激起后者。", point: "这是二元符号的标准表述，与 16 世纪的三元符号形成鲜明对照。" },
    misconception: "二元不等于「更简单、更进步」。福柯只说它是另一种配置，而且它要成立还需要一个隐藏条件（双重表征）。",
  },
  {
    id: "duplicated_representation", name_zh: "双重表征", name_en: "Duplicated representation", icon: "🗺️",
    section_id: "s4", group: "sign",
    plain: "一个表征要成为符号，还得在自身中表出「我正在表征别的东西」。",
    explain: "一个观念只是和另一个观念相连或替代，还不算符号。它必须同时表现出它与所指之间的关系：它要表征，而这层表征本身也要在它里面被表征。这看似有了第三项，其实不是三元系统的回归，而是二元结构向内折叠，整个落在表征者一侧。表征总是「垂直于自身」：既指向对象，又显示自己。\n\n后果有三：符号与表征（即全部思想）同延，凡一个表征连着另一个并表出这层联系，就有符号；正因为如此，古典思想里没有独立的「意义理论」，符号学与诠释学通过表征的自我表征重叠在一起；二元符号理论必须以一般的表征理论（观念学）为基础，这一联系一直延续到我们今天。",
    analogy: "你看一张地图，不会把它当成一张印了彩色线条的纸，而是直接看成「这座城市的图」。地图除了它所表现的东西没有别的内容，但这个内容只有被当作「表征」来看时才显现出来。",
    book_example: { what: "Port-Royal 给出的第一个符号例子不是词、不是叫声，而是地图与图画。", point: "图画的内容只是它所表征的东西，却只有在被视为表征时才可见，正好体现双重表征。" },
    misconception: "不要把「表征之表征」理解为一个新的中介实体；它不在两项之间，而是折进了表征者内部。",
  },
  {
    id: "imagination_resemblance", name_zh: "相似与想象", name_en: "Imagination of resemblance", icon: "🌫️",
    section_id: "s5", group: "imagination",
    plain: "相似被赶到知识的边界上，但没有它和想象，任何比较都无法开始。",
    explain: "符号被收进表征之后，相似就成了知识之外的粗糙经验。可它仍是知识不可缺的边界：若两物从不相像，就根本不会被拿来比较，也就无法建立相等或秩序。休谟把同一列为需要反思的「哲学关系」，却把相似列为以「平静的力量」强迫心灵的自然关系。\n\n相似又离不开想象：如果表征没有把过去印象重新唤回的力量，就没有任何印象能显得与前一个相似或不同。于是有双重条件：物中要有相似的低语，表征中要有想象的回忆。这产生了两种分析方向：一是分析印象、回忆、想象如何把线性时间翻转为同时的比较表；二是分析自然为何以混杂、模糊相似的样子给出。两者最终在 18 世纪下半叶的「观念学」中会合。",
    analogy: "机器学习也需要「相似」作原材料：没有一堆「看起来差不多」的样本，算法连从哪里开始划分类别都不知道。但最终的模型说的是边界与特征，而不是「像」。",
    book_example: { what: "Merian 挑战哲学家：没有相似的帮助，你一步也迈不出去；种、属与一切抽象概念都靠相似形成。", point: "说明相似虽被逐出知识，却作为沉默而不可抹去的必要条件留在知识之下。" },
    misconception: "16 世纪的相似是世界的铰链、知识的内容；古典时代的相似只是最低限度的起点，地位完全不同。",
  },
  {
    id: "genesis", name_zh: "发生学", name_en: "Genesis", icon: "🌱",
    section_id: "s5", group: "imagination",
    plain: "讲清楚秩序如何从模糊的印象中一步步长出来，这是古典时代必需的另一半。",
    explain: "无序（自然与印象中的模糊相似）和重建秩序的能力（想象）这两个阶段，被统一在「发生」（genesis）的观念里。可以把无序归给想象本身：它既是错误之所，也是通向真理的力量（笛卡尔、马勒伯朗士、斯宾诺莎）；也可以把无序归给自然：自然因自身的历史和杂多，只能给表征提供彼此相像的东西（孔狄亚克、休谟）。\n\n这种分析常以神话形式出现：卢梭的第一个人、孔狄亚克的苏醒意识、休谟突然被抛入世界的陌生人。福柯说，这种「发生」恰好顶替了《创世记》（Genesis）本身的位置。一门秩序科学必须伴随一门意识的发生学，从洛克一直到意识形态学派（观念学）都是如此。",
    analogy: "就像一份产品说明书除了功能列表（表格），还附了一段「这个产品是怎么一步步设计出来的」开发者日志。古典时代觉得两者缺一不可。",
    book_example: { what: "孔狄亚克设想一个逐步苏醒的意识，从最初的感觉一步步获得全部观念。", point: "说明经验论的起源追问不是理性主义的对手，而是秩序方案的必要补充。" },
    misconception: "「发生」不是 19 世纪意义上的历史或演化；它是一种在表格空间里展开的理想时间顺序。",
  },
  {
    id: "mathesis", name_zh: "Mathesis：普遍的秩序科学", name_en: "Mathesis", icon: "🔢",
    section_id: "s6", group: "order",
    plain: "关于度量与秩序的普遍科学；对简单性质，它的方法就是代数。",
    explain: "福柯区分三件常被混为一谈的事：17 世纪后半期短暂流行的机械论、把经验知识数学化的各种尝试，以及整个古典知识与 mathesis 的关系。只有最后一个才是古典知识型的基本要素：它直到 18 世纪末都保持不变。\n\n这种关系有两个特征：一切度量问题都可以化为秩序问题，所以连不可度量之物也能排成有序序列，莱布尼茨「质的秩序的数学」正处在古典思想的重心；但它并不意味着知识被数学吞并，反而在它旁边第一次出现了一批几乎没有数学化痕迹的经验领域。严格意义上，mathesis 是相等关系的科学，因而是判断与归属的科学，即「真理的科学」。",
    analogy: "今天我们用「数据化」形容一切，但古典时代的关键词不是「数字」，而是「顺序」：图书馆不需要把书变成数字，只需要给每本书找到一个确定的位置。",
    book_example: { what: "Condorcet 实际尝试数学化，Condillac、Destutt 把它当作理想，Buffon 则认为不可能。", point: "说明数学化的成败是表层意见之争；底层不变的是与普遍秩序科学的关系。" },
    misconception: "古典理性主义不是「把自然机械化、可计算化」的倾向，也不是理性与「不可理性化的生命力」之间的斗争。",
  },
  {
    id: "taxinomia", name_zh: "Taxinomia：分类学", name_en: "Taxinomia", icon: "🗂️",
    section_id: "s6", group: "order",
    plain: "给复杂的经验表征排序：靠的不是代数，而是一套符号系统。",
    explain: "处理简单性质的排序用 mathesis 和代数；处理复杂性质（经验中给出的一般表征）就要建立 taxinomia，而为此必须建立符号系统。符号之于复杂性质的秩序，正如代数之于简单性质的秩序。两者互相包含：经验表征终可分析为简单性质，所以 taxinomia 归属于 mathesis；而证明的知觉只是表征的特例，所以也可以说 mathesis 是 taxinomia 的特例。\n\n严格说，taxinomia 处理同一与差异，是分节与分类的科学，是「关于存在者的知识」；它是一种「质的 mathesis」。与 genesis 相比，它把符号放在空间的同时性里，像一种句法；genesis 则把符号排进时间的类比物，像编年史。一般语法、自然志、财富分析都在这里出现。",
    analogy: "像电商网站的筛选栏：品牌、价格区间、尺码、颜色……每个商品都由一组可指定的特征定位，彼此的远近一目了然。这张「特征网格」就是 taxinomia 的现代后裔。",
    book_example: { what: "林奈设想在自然与社会的一切具体领域中发现同样的分布与秩序，即「普遍分类学」。", point: "说明 taxinomia 是整个古典经验知识的统一方案，而不只是生物学方法。" },
    misconception: "taxinomia 不是 mathesis 的对立面（「质 vs 量」），而是寓于其中、又与之区别的秩序科学。",
  },
  {
    id: "table", name_zh: "表格", name_en: "The table (tableau)", icon: "📋",
    section_id: "s6", group: "order",
    plain: "17、18 世纪知识的中心：一张把同一与差异同时摆出来的大表。",
    explain: "古典知识型夹在两端之间：一端是可计算秩序的 mathesis，另一端是从经验系列分析秩序如何构成的 genesis。夹在两者之间的是符号区域，它覆盖全部经验表征却从不越出；在这里，给知觉、思想、欲望配上的符号必须充当「特征」，把表征整体切分成彼此可区分的子区域，从而在时间之外的同时系统中摆出它们的远近、邻接与分离。\n\n于是可以画出同一与差异的表格。自然志、货币与价值理论、一般语法都只因这片表格空间而存在。福柯说，那些著名的争论（生命是否只是运动？自然秩序能否证明上帝？）都只是在这张表的褶皱里展开的意见；要做知识的考古学，就要重建使这些争论成为可能的网络。",
    analogy: "门捷列夫的元素周期表虽然来自 19 世纪，但能帮你想象这种「表格」的气质：每个位置由行列特征决定，空格本身也有意义，所有元素同时摊在你面前，而不是讲一个先后发生的故事。",
    book_example: { what: "Port-Royal 的《语法》作为其《逻辑》的续篇；Turgot 写「词源」条目并首次系统比较货币与词语；亚当·斯密写过语言起源论。", point: "这些交叉路径表明语言、生物、财富三个领域共享同一张表格网格。" },
    misconception: "表格不是「把已有知识列成表」的呈现方式，而是古典时代知识本身得以成立的空间。",
  },
];

export const relations = [
  { from: "don_quixote", to: "madman_poet", label: "引出两种角色" },
  { from: "don_quixote", to: "binary_sign", label: "词与物分离" },
  { from: "critique_of_resemblance", to: "identity_difference", label: "代之以" },
  { from: "critique_of_resemblance", to: "imagination_resemblance", label: "相似被推到边界" },
  { from: "madman_poet", to: "imagination_resemblance", label: "相似的残余" },
  { from: "measure_order", to: "identity_difference", label: "分析的两法" },
  { from: "measure_order", to: "mathesis", label: "度量化为秩序" },
  { from: "mathesis", to: "taxinomia", label: "质的推广" },
  { from: "identity_difference", to: "taxinomia", label: "分类依据" },
  { from: "taxinomia", to: "table", label: "铺成" },
  { from: "genesis", to: "table", label: "解释其构成" },
  { from: "imagination_resemblance", to: "genesis", label: "要求发生学" },
  { from: "sign_variables", to: "binary_sign", label: "取代相似" },
  { from: "binary_sign", to: "duplicated_representation", label: "成立条件" },
  { from: "arbitrary_sign", to: "taxinomia", label: "分类的工具" },
  { from: "arbitrary_sign", to: "genesis", label: "分解与组合" },
  { from: "duplicated_representation", to: "table", label: "符号表即物之像" },
];

const sections = [
  {
    id: "s1", no: "I", title_en: "Don Quixote", title_zh: "堂吉诃德",
    gist: "堂吉诃德是「相似的英雄」，他的冒险标出了相似与符号旧联盟的终点。",
    summary: "堂吉诃德照骑士小说去读世界，到处寻找相似以证明书是真的，可书里的符号已不再像世界里的物；差异被他解释为魔法，反而又成了相似的证据。第二部里他成了被人读过的书，真实只存在于词语之间。相似与符号一分离，文化边缘出现两个角色：滥用相似的疯子与守护相似的诗人。",
    concept_ids: ["don_quixote", "madman_poet"],
  },
  {
    id: "s2", no: "II", title_en: "Order", title_zh: "秩序",
    gist: "17 世纪初，相似从知识的形式变成错误的来源，知识转向同一、差异与秩序。",
    summary: "培根把相似看作心灵的偶像；笛卡尔则把比较普遍化，归结为度量与秩序两种，并让度量都化为秩序。结果是：分析取代类比，完全枚举带来确定性，知识即区分，历史与科学分家，语言变得透明中立。古典知识的核心不是机械论或数学化，而是与普遍秩序科学 mathesis 的关系；一般语法、自然志、财富分析由此诞生。",
    concept_ids: ["critique_of_resemblance", "measure_order", "identity_difference", "mathesis"],
  },
  {
    id: "s3", no: "III", title_en: "The Representation of the Sign", title_zh: "符号的表征",
    gist: "古典时代用三个变量重新定义符号，相似不再必要，符号成为分析与组合的工具。",
    summary: "符号按确定/或然、内在/分离、自然/约定三个变量定义。由此，符号只能在知识中成立，知识与占卜决裂，或然性进入知识；符号不再拉近万物，而是把世界展开、与分析互为因果；人为符号的价值高于自然符号，好的符号系统既能分析到最简元素，又能计算一切组合。概率、分析、组合与普遍语言构成同一张必然性之网。",
    concept_ids: ["sign_variables", "arbitrary_sign"],
  },
  {
    id: "s4", no: "IV", title_en: "Duplicated Representation", title_zh: "双重表征",
    gist: "符号是两个观念的二元连接，前提是表征者在自身中表出其表征关系。",
    summary: "Port-Royal 把符号定义为两个观念：表征者与被表征者，取代了自斯多葛派以来的三元结构。条件是：表征者必须同时表现自己的表征力，这不是第三项，而是二元结构的内折，例子是地图与图画。后果：符号与全部思想同延；没有独立的意义理论；二元符号理论必须以一般表征理论为基础，一直延续到索绪尔。",
    concept_ids: ["binary_sign", "duplicated_representation"],
  },
  {
    id: "s5", no: "V", title_en: "The Imagination of Resemblance", title_zh: "相似的想象",
    gist: "相似被推到知识边界，与想象结合，要求一门关于秩序起源的发生学。",
    summary: "相似不再是知识，却是知识不可或缺的边界：没有相似就无从比较。相似又依赖想象把过去印象唤回。由此出现两种分析：想象如何把时间序列翻成同时的表，自然为何以混杂相似的面貌给出。两者在「发生」观念中统一，常以第一个人、苏醒的意识、陌生人等神话形式出现；「自然」与「人性」概念则担保想象与相似的亲缘。",
    concept_ids: ["imagination_resemblance", "genesis"],
  },
  {
    id: "s6", no: "VI", title_en: "Mathesis and 'Taxinomia'", title_zh: "Mathesis 与 Taxinomia",
    gist: "古典知识型 = mathesis + taxinomia + genesis，中心是一张同一与差异的表格。",
    summary: "简单性质用 mathesis（代数）排序，复杂性质用 taxinomia（符号系统）分类，两端之间夹着符号区域与表格空间，另一端是 genesis。三者不是分立领域，而是一张亲缘网格：taxinomia 是质的 mathesis，genesis 寓于 taxinomia。康德之后这一布局被拆为形式学科与解释学科。语言、生物、财富三章将逐一考察这片表格空间。",
    concept_ids: ["mathesis", "taxinomia", "table", "genesis"],
  },
];

const flow = [
  { claim: "《堂吉诃德》标出了边界：相似与符号的旧联盟已经解体。", detail: "他照书读世界，可书中的符号不再像世界里的物；相似变成错觉与疯狂，词语从物身上脱落，只在词与词之间获得新的力量。" },
  { claim: "17 世纪初，相似不再是知识的形式，而是错误的来源。", detail: "培根把它看作心灵的偶像；笛卡尔则把比较普遍化，用同一、差异、度量与秩序来分析它。相似只剩错视画、戏中戏、梦境之类的游戏。" },
  { claim: "一切比较归结为度量与秩序，而度量又总能化为秩序。", detail: "于是知识的方法是从最简单项出发排列系列；可以完全枚举、达到确定性；知识即区分；博学被降为「历史」，语言退出物的世界。" },
  { claim: "古典知识的根本是与 mathesis（普遍秩序科学）的关系，而非机械论或数学化。", detail: "正因为不可度量的东西也可以排序，才首次出现一般语法、自然志、财富分析这些几乎未被数学化、却都是秩序科学的经验领域。" },
  { claim: "符号被重新定义：确定/或然、内在/分离、自然/约定，都不需要相似。", detail: "符号只能在知识中成立（与占卜决裂、或然性进入知识），它与分析互为因果，人为符号胜过自然符号，好的符号系统同时是分析与组合的工具。" },
  { claim: "符号从三元变为二元：两个观念的连接，前提是双重表征。", detail: "Port-Royal：符号含表征者与被表征者两个观念；表征者还须在自身中表出它的表征关系（地图、图画）。于是符号与全部思想同延，没有独立的意义理论。" },
  { claim: "相似被推到知识边界，与想象结合，要求一门发生学。", detail: "没有相似就无从比较，没有想象就没有相似。从印象到秩序的发生分析（孔狄亚克、休谟、卢梭）是秩序科学的必需伴侣，而非其对手。" },
  { claim: "古典知识型 = mathesis + taxinomia + genesis，中心是表格。", detail: "简单性质用代数、复杂性质用符号系统，夹在计算与发生之间的是同一与差异的表格。语言、生物、财富三大领域都在这片空间里，下面三章逐一考察。" },
];

const variables = [
  { k: "确定性", icon: "🎯", a: "确定", ae: "呼吸 → 活着", b: "或然", be: "苍白 → 或许怀孕", gain: "符号只能在知识中成立；或然性进入知识，休谟成为可能。" },
  { k: "关系类型", icon: "🧩", a: "内在于所指", ae: "健康气色 → 健康", b: "与所指分离", be: "旧约形象 → 道成肉身", gain: "符号不再拉近万物，而是把世界展开、一步步走过：与分析不可分。" },
  { k: "来源", icon: "🌱", a: "自然", ae: "镜中映像 → 被映之物", b: "约定", be: "词语 → 观念", gain: "价值颠倒：人造符号才是巅峰，可分解、可组合，能造出「计算的语言」。" },
];

const compression = [
  { examples: ["羊群 = 军队", "客栈 = 城堡", "女仆 = 贵妇", "不像？是魔法师作祟"], says: "这一串例子其实只在说：书中的符号已不再像世界里的物，坚持用相似去读世界，在 17 世纪只能显得疯狂。" },
  { examples: ["错视画", "喜剧中的错认（quid pro quo）", "戏中戏", "梦与幻象", "欺骗人的感官", "隐喻、明喻、寓言"], says: "这一串例子其实只在说：相似退出知识以后只剩游戏，它的魔力来自与「幻觉」的新亲缘，而人们都知道那是幻觉。" },
  { examples: ["呼吸 → 活着", "苍白 → 怀孕", "惊叫 → 恐惧", "视觉 → 触觉（Berkeley）", "镜像 → 被映之物"], says: "这一串例子其实只在说：古典时代的符号无论确定与否、自然与否，都不再需要「像」它所指的东西。" },
  { examples: ["抽象观念 → 具体知觉（Condillac）", "一般观念 → 特殊观念（Berkeley）", "想象 → 知觉（Hume）", "感觉 ↔ 感觉", "感觉 → 上帝的言说"], says: "这一串例子其实只在说：只要一个表征连着另一个并表出这层连接，就有符号，所以古典哲学从头到尾是一门符号哲学。" },
  { examples: ["Port-Royal：《语法》续《逻辑》", "Quesnay 写「明证」条目", "Turgot 比较货币与词语", "亚当·斯密论语言起源", "卢梭：植物学 + 语言起源"], says: "这一串例子其实只在说：语言、生物、财富这三个看似无关的领域，在古典时代走在同一张网格上，人们在它们之间来回穿行。" },
];

const sorter = {
  categories: [
    { id: "mathesis", label: "Mathesis 计算的秩序" },
    { id: "taxinomia", label: "Taxinomia 表格分类" },
    { id: "genesis", label: "Genesis 起源分析" },
  ],
  items: [
    { text: "用代数给形状、广延、运动等简单性质排序", answer: "mathesis", why: "简单性质的排序用 mathesis，其普遍方法是代数。" },
    { text: "从最简单的项出发，按递增差异排成一个不间断的系列", answer: "mathesis", why: "这是笛卡尔式的秩序比较，属于普遍的秩序科学。" },
    { text: "研究相等关系，从而作出判断与归属", answer: "mathesis", why: "严格意义上的 mathesis 是相等的科学，即「真理的科学」。" },
    { text: "林奈按特征把植物排进一张大表", answer: "taxinomia", why: "用符号（特征）对复杂性质分节、分类，是典型的 taxinomia。" },
    { text: "一般语法：分析词语这种符号如何组织思想之流", answer: "taxinomia", why: "一般语法是表格空间里三大领域之一。" },
    { text: "货币与价值理论：让需求之间可以等价交换", answer: "taxinomia", why: "财富分析同样位于符号与表格的区域中。" },
    { text: "（现代）电商网站按品牌、价格、尺码筛选商品", answer: "taxinomia", why: "用一组可指定的特征定位每个对象、显示远近，是表格思维。" },
    { text: "孔狄亚克设想一个逐步苏醒的意识如何获得观念", answer: "genesis", why: "分析秩序如何从印象一步步构成，是发生学。" },
    { text: "卢梭笔下的「第一个人」", answer: "genesis", why: "福柯说这类神话形式的起源分析顶替了《创世记》的位置。" },
    { text: "从洛克到意识形态学派（观念学），追问知识的起源", answer: "genesis", why: "秩序科学必须伴随一门意识的发生学。" },
  ],
};

const contrast = {
  title: "16 世纪（第 2 章）vs 古典时代（本章）",
  left: "16 世纪：相似的知识型",
  right: "古典时代：表征的知识型",
  rows: [
    { aspect: "相似的地位", left: "知识的形式与内容，世界的铰链", right: "错误之源；仅作为比较的起点留在知识边界" },
    { aspect: "认识的基本动作", left: "解释：寻找亲缘，把东西拉近", right: "区分：确立同一与差异，排成秩序" },
    { aspect: "符号的结构", left: "三元：记号、所指、连接两者的相似", right: "二元：两个观念的连接（以双重表征为条件）" },
    { aspect: "符号在哪里", left: "刻在物上，没人认出也照样存在", right: "只在知识中成立，没有「沉默的记号」" },
    { aspect: "自然符号 vs 约定符号", left: "约定符号靠模仿自然符号获得力量", right: "约定符号是巅峰，自然符号只是粗糙草图" },
    { aspect: "知识的边界与确定性", left: "相似无限，只能越来越或然", right: "可以完全枚举，达到确定" },
    { aspect: "博学与古书", left: "读自然与读古书是同一件事", right: "博学只是「历史」，不算科学" },
  ],
};

const quotes = [
  { en: "He is the hero of the Same.", zh: "他是「同一」的英雄。", meaning: "堂吉诃德永远在相似的平原上游荡，既跨不过差异的边界，也到不了同一的核心：他是旧知识型最后的信徒。" },
  { en: "Similitude is no longer the form of knowledge but rather the occasion of error.", zh: "相似不再是知识的形式，而是犯错的契机。", meaning: "一句话概括 17 世纪的断裂：「像」从证据变成了需要警惕的陷阱。" },
  { en: "The sign encloses two ideas, one of the thing representing, the other of the thing represented.", zh: "符号包含两个观念，一个是表征之物的观念，一个是被表征之物的观念。", meaning: "福柯引用的 Port-Royal 定义，是二元符号的标准表述，与文艺复兴的三元符号针锋相对。" },
  { en: "The centre of knowledge, in the seventeenth and eighteenth centuries, is the table.", zh: "在 17、18 世纪，知识的中心是表格。", meaning: "夹在可计算的 mathesis 与起源分析的 genesis 之间，同一与差异的表格是古典知识的心脏。" },
];

const quiz = [
  {
    q: "福柯为什么说《堂吉诃德》是第一部现代文学作品？",
    options: [
      "因为它第一次用通俗语言写作",
      "因为它讽刺了骑士制度的衰落",
      "因为在其中语言断绝了与物的旧亲缘，在分离状态中获得只属于自己的力量",
      "因为它首次描写了真正的精神病人",
    ],
    answer: 2,
    why: "福柯关注的是知识型：书里的符号不再像世界，到第二部里主人公的真实只存在于词与词之间，语言进入「孤独的自主」。",
  },
  {
    q: "笛卡尔如何对待相似？",
    options: [
      "把比较普遍化、纯化，用同一、差异、度量与秩序来分析相似",
      "彻底禁止在理性思考中使用比较",
      "把相似视为心灵的偶像，靠审慎去驱散它",
      "保留了相似作为知识的基本形式",
    ],
    answer: 0,
    why: "C 是培根的路子。笛卡尔不排斥比较，反而让一切知识都经由比较获得，只是比较被归结为度量与秩序。",
  },
  {
    q: "按福柯的说法，古典知识型最根本的要素是什么？",
    options: [
      "机械论在医学、生理学中的成功",
      "把自然全部数学化的努力",
      "生命力抵抗理性化的「对立力量」",
      "与一门普遍的秩序科学（mathesis）的关系，使不可度量之物也能排序",
    ],
    answer: 3,
    why: "福柯明确说机械论、数学化以及「对立力量」的解读都不够深；不变的是与 mathesis 的关系，以及「度量可化为秩序」这一失衡。",
  },
  {
    q: "地图被 Port-Royal 当作符号的第一个例子，最能说明什么？",
    options: [
      "符号必须与所指相似",
      "表征者除了所表征的内容别无内容，但这内容只在它被当作表征时才显现，即双重表征",
      "符号与所指之间仍然需要一个第三项",
      "古典时代偏爱视觉而轻视语言",
    ],
    answer: 1,
    why: "地图的例子体现了「表征在自身中表出其表征关系」；这不是回到三元，而是二元结构向内折叠。",
  },
  {
    q: "既然相似已被逐出知识，为什么古典时代还要大谈想象与「发生」？",
    options: [
      "因为经验论者在反对理性主义",
      "因为相似仍是任何比较得以开始的条件，而相似依赖想象，所以秩序科学需要一门说明秩序如何从印象中构成的发生学",
      "因为当时人们开始研究生物进化的历史",
      "因为想象是唯一可靠的知识来源",
    ],
    answer: 1,
    why: "福柯说这些经验分析不是理性主义的对立面（如怀疑论之于理性主义），而是「建立秩序」这一知识要求中本就包含的部分。",
  },
  {
    q: "为什么古典思想没有一门独立的「意义理论」？",
    options: [
      "因为当时的哲学家对语言不感兴趣",
      "因为意义被认为隐藏在一个需要重建的原初文本里",
      "因为符号与表征同延，二者之间没有任何中介或不透明，意义本身就在符号的完整表格中",
      "因为意义是由意识的某种特殊活动建构的",
    ],
    answer: 2,
    why: "B 是 16 世纪的想法，D 是后来的想法。古典时代的符号是透明的，分析符号就等于解读它想说什么。",
  },
];

const takeaways = [
  "17 世纪初的断裂：相似从知识的形式变为错误之源；《堂吉诃德》正是这道裂缝的文学标本，疯子与诗人是相似在文化边缘的两种残余。",
  "知识的动作从「拉近」变成「区分」：一切比较归为度量与秩序，而度量总能化为秩序，于是有了普遍的秩序科学 mathesis。",
  "符号从三元变为二元：两个观念的连接，以「双重表征」为条件；符号与全部思想同延，人为符号成了分析与组合的利器。",
  "相似并未消失，而是被推到知识的边界，与想象结合，要求一门关于秩序起源的发生学。",
  "古典知识型 = mathesis（简单性质、代数）+ taxinomia（复杂性质、符号系统）+ genesis（起源），中心是同一与差异的表格。",
];

const glossary = [
  { term: "Representation", zh: "表征", def: "古典时代思想的总元素；符号与表征同延，知识就是对表征的分析与排序。" },
  { term: "Classical age", zh: "古典时代", def: "福柯用语，大致指 17 世纪中叶到 18 世纪末的知识型。" },
  { term: "Mathesis", zh: "普遍秩序科学", def: "关于度量与秩序的普遍科学；对简单性质，其方法是代数。" },
  { term: "Taxinomia", zh: "分类学", def: "用符号系统给复杂性质排序、分类的科学，即「质的 mathesis」。" },
  { term: "Genesis", zh: "发生（学）", def: "分析秩序如何从经验系列与印象中一步步构成。" },
  { term: "Tableau / Table", zh: "表格", def: "同一与差异同时铺开的空间，古典知识的中心。" },
  { term: "Simple / complex natures", zh: "简单性质 / 复杂性质", def: "笛卡尔用语；前者如形状、广延、运动，后者是经验中给出的一般表征。" },
  { term: "Identity & difference", zh: "同一与差异", def: "古典时代取代相似、组织知识的基本范畴。" },
  { term: "Binary sign", zh: "二元符号", def: "表征者观念与被表征者观念之间的连接（Port-Royal）。" },
  { term: "Ternary sign", zh: "三元符号", def: "文艺复兴的符号：记号、所指，以及连接两者的相似。" },
  { term: "Duplicated representation", zh: "双重表征", def: "表征者在自身中表出其表征关系，二元符号成立的条件。" },
  { term: "Arbitrary / conventional sign", zh: "人为 / 约定符号", def: "人所建立的符号，简单、可组合，古典时代视为符号的巅峰。" },
  { term: "Divinatio", zh: "占卜（解读）", def: "解读先于知识存在的神圣记号；古典知识与之决裂。" },
  { term: "Idols (Bacon)", zh: "偶像", def: "培根所说的心灵错觉，如种族偶像、市场偶像，相似被视为其中一种。" },
  { term: "Port-Royal", zh: "波尔-罗亚尔", def: "17 世纪的《逻辑》与《语法》，古典符号理论的标准文本。" },
  { term: "Ideology (Idéologie)", zh: "观念学", def: "18 世纪末 Destutt de Tracy 等人对一切表征形式的一般分析。" },
  { term: "Homosemanticism", zh: "同义化", def: "疯子的功能：把所有符号归并、用不断增殖的相似牵引它们。" },
];

export default function Chapter() {
  return (
    <ChapterPage meta={meta} groups={groups} concepts={concepts} relations={relations}>
      <Block><Hook title={"一个刷了太多谍战剧的人"}>{"设想你的朋友连刷了三个月谍战剧：快递员是特工，楼下晾的红衣服是暗号，路灯闪一下是接头信号。他不傻，反而认真得可怕——他在用剧本去「读」世界，每个巧合都是证据。在 16 世纪，这种读法就是知识本身；到了 17 世纪，它只能叫疯狂。福柯这一章要问：当「找相似」被宣判为错觉之后，人们改用什么来认识世界？答案是：区分、排序、给万物找到表格里的位置。而这一切的起点，是一个骑着瘦马的西班牙绅士。"}</Hook></Block>

      <Block id="secs" toc="结构" kicker="结构" title="这一章分几步走" lead="原著六个小节，每节一句话。点开看概述。">
        <SectionCards sections={sections} />
      </Block>

      <Block id="flow" toc="论证主线" kicker="论证主线" title="一条线串起整章" lead="跳过所有例子和人名，福柯的论证其实就是这几步：">
        <ArgumentFlow steps={flow} />
      </Block>

      <Block id="quixote" toc="堂吉诃德" kicker="开场图解" title="堂吉诃德的「相似之眼」"
        lead="他是 16 世纪知识型最后的信徒。切换两种视角，再点下面三个阶段，看相似怎样从知识变成疯狂、语言又怎样获得新力量。">
        <QuixoteLens />
        <Callout tone="key" title="为什么从一部小说讲起">
          福柯要说的不是塞万提斯的文学成就，而是：<C id="don_quixote">堂吉诃德</C>的滑稽恰好暴露了相似与符号旧联盟的解体。此后相似只在
          <C id="madman_poet">疯子与诗人</C>身上活下来，而在两者之间，展开了一个只看重<C id="identity_difference">同一与差异</C>的知识领域。
        </Callout>
      </Block>

      <Block id="vars" toc="符号的三个变量" kicker="第 III 节" title="符号的三个开关：没有一个需要「像」"
        lead="古典时代用三个变量重新定义符号。每个变量的两端都举一个书中例子，下方是这个变量带来的深层后果。">
        <Grid min={240}>
          {variables.map(v => <Card key={v.k}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 20, marginBottom: 8 }}>{v.icon} {v.k}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 14 }}>
              <div style={{ background: "var(--paper)", borderRadius: 10, padding: "8px 10px" }}><b>{v.a}</b><br /><span style={{ color: "var(--muted)" }}>{v.ae}</span></div>
              <div style={{ background: "var(--paper)", borderRadius: 10, padding: "8px 10px" }}><b>{v.b}</b><br /><span style={{ color: "var(--muted)" }}>{v.be}</span></div>
            </div>
            <p style={{ margin: "10px 0 0", fontSize: 15 }}>→ {v.gain}</p>
          </Card>)}
        </Grid>
        <Callout tone="info" title="一个反例就够了">
          一声惊叫是恐惧的<b>自然</b>符号，却一点也不像恐惧。连自然符号都不需要相似，相似就彻底失去了定义符号的资格。详见 <C id="sign_variables">符号的三个变量</C> 与 <C id="arbitrary_sign">人为符号的优先</C>。
        </Callout>
      </Block>

      <Block id="sign" toc="三元 → 二元" kicker="本章专属图解 ①" title="符号的变形记：从三元到二元"
        lead="一步步看：16 世纪焊住记号与所指的「相似」如何被抽走，符号又如何变成表征之间的二元连接。">
        <SignShift />
      </Block>

      <Block id="episteme" toc="知识总图" kicker="本章专属图解 ②" title="古典知识型总图：mathesis · taxinomia · genesis"
        lead="点击图中三块（或下方按钮）查看各自排什么、用什么、算哪种知识；切换到「18 世纪末之后」看这张网格如何被拆开。">
        <EpistemeMap />
        <Callout tone="key" title="一句话记住">
          简单性质用代数排序（<C id="mathesis">mathesis</C>），复杂性质用符号系统分类（<C id="taxinomia">taxinomia</C>），
          <C id="genesis">genesis</C> 说明秩序如何从印象中长出来；三者之间铺开的，就是古典知识的中心：<C id="table">表格</C>。
        </Callout>
      </Block>

      <Block id="concepts" toc="概念卡片" kicker="核心概念" title="概念卡片" lead="每张卡：一句大白话 → 点开看深入解释、现代类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>

      <Block id="map" toc="概念地图" kicker="概念地图" title="它们怎么连在一起" lead="悬停高亮某个概念的邻居，点击打开卡片，可拖动节点。">
        <ConceptMap />
      </Block>

      <Block id="comp" toc="例子压缩" kicker="例子压缩器" title="原著的例子，其实只说了一件事" lead="福柯一口气列举大量例子和人名。点击一组，把它们压缩成一句话。">
        <ExampleCompression items={compression} />
      </Block>

      <Block id="sorter" toc="分类游戏" kicker="动手试试" title="放进古典知识的三个格子" lead="把下面的做法拖到它所属的区域（可拖拽，也可先点卡片再点格子）">
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
        <Bridge>{"本章画出了古典知识的总地图，结尾预告要依次考察表格空间里最清晰的三个子区域：语言、分类、货币。第 4 章「言说」先走进一般语法：当语言不再是世界中的物，而只是表征的透明工具，它如何把连续的思想之流切分、排列成可分析的符号？本章的二元符号与双重表征，正是理解古典语言理论的钥匙。"}</Bridge>
      </Block>

      <Block id="gloss" toc="术语表" kicker="术语表" title="术语速查">
        <Glossary terms={glossary} />
      </Block>
    </ChapterPage>
  );
}
