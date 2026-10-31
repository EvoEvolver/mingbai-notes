// 《生产之镜》导言与序言：Mark Poster 译者导言 + 鲍德里亚序言
import { ChapterPage, Block, Hook, SectionCards, ArgumentFlow, ConceptGrid, ConceptMap, ExampleCompression,
  DragSort, CompareTable, QuoteCarousel, Quiz, Takeaways, Bridge, Glossary, C, Callout, Timeline } from "@kit";
import { MirrorOfProduction, BookRoadmap } from "./_ch00_mirror.jsx";

export const meta = {
  id: "ch00",
  no: 0,
  title_zh: "导言与序言",
  title_en: "Translator's Introduction & Preface",
  era: "1973 / 1975 英译",
  one_liner: "马克思批判资本，却借用了资本的「生产」语法——革命想象被生产的幽灵缠住了。",
  big_question: "如果批判者和被批判者说着同一套「劳动—价值—生产」的语言，这种批判还能有多激进？",
  why_it_matters: "导言和序言给全书定调：鲍德里亚要追问的不是马克思对资本主义的分析「对不对」，而是「生产」这个框架本身是否只是政治经济学的镜像。Poster 的导言则同时交代了鲍德里亚的新武器（符号与代码的批判）和他的软肋（象征交换与历史断裂没有被充分理论化）。读懂这两部分，后面五章就是逐块拆镜子。",
  original_words: 5100,
  read_minutes: 14,
};

export const groups = [
  { id: "mirror", label: "生产之镜" },
  { id: "pe", label: "共享的生产语法" },
  { id: "sign", label: "符号与代码" },
  { id: "symbolic", label: "象征交换" },
];

export const concepts = [
  {
    id: "mirror_of_production", name_zh: "生产之镜", name_en: "Mirror of Production", icon: "🪞", section_id: "s5", group: "mirror",
    plain: "人只能透过「生产」这面镜子来认识自己和社会。",
    explain: "这是全书的中心隐喻。鲍德里亚借用拉康的「镜像阶段」：婴儿在镜中第一次把自己认作一个完整的「我」，但这个「我」是想象出来的。同样，现代人透过生产、劳动、价值这套图式「意识到」自己——把自己看成要去生产、改造、实现为价值的东西。\n\n关键在于：这面镜子不只照出资本主义，也照出它的批判者。马克思把社会生活的每个方面都放到生产之镜前解读，于是批判在镜中复制了被批判的体系。所以鲍德里亚说，政治经济学正是通过「生产话语」和「表征话语」这面镜子在想象中反映、再生产自己。",
    analogy: "就像你和对手吵架时始终用对方的评分标准——「谁更有效率」「谁产出更多」。你可以赢下这场争论，但赢的前提是先接受了对方设定的考场。",
    book_example: { what: "序言：人通过自己的作品不断「解读」自己，被这面「操作性的镜子」反射成一种生产主义的自我理想。", point: "镜子塑造的是人对自己的想象，而不只是经济制度。" },
    misconception: "它不是说马克思「太重视经济」。鲍德里亚明确说问题不在经济决定论，而在生产这个形式本身没被追问。",
  },
  {
    id: "productivism", name_zh: "生产主义", name_en: "Productivism", icon: "🏭", section_id: "s1", group: "mirror",
    plain: "把一切人类活动都理解为「生产」的思维习惯。",
    explain: "生产主义指的是：社会财富、语言、意义、欲望、文本……统统被说成是某种「劳动」的「产品」。鲍德里亚在序言里点名当时法国最前卫的理论——阿尔都塞把理论看作「生产」，德勒兹与加塔利把无意识看作生产欲望的机器，Tel Quel 派谈「文本生产」。\n\n他认为这种一致本身就可疑：如果资本主义和它最激进的反对者都把「生产」当作主旋律，那么所谓革命不过是要求一种「更真、更解放」的生产力，仍在同一个价值形式之内。",
    analogy: "今天的「自我提升」话语：休息是为了更好地工作，爱好要能变现，连情绪都要「管理」以提高产出。反抗内卷的口号也常常是「更高效地生活」——还是同一把尺子。",
    book_example: { what: "Poster 引述：阿尔都塞、德勒兹—加塔利、Tel Quel 都被困在「生产」这个概念笼子里。", point: "生产隐喻已经渗透到激进理论最前沿。" },
    misconception: "生产主义不只是「重视 GDP」；它是一种看待人和世界的根本框架，左派右派都可能持有。",
  },
  {
    id: "form_vs_content", name_zh: "生产的形式 vs 内容", name_en: "Form vs. Content of Production", icon: "📐", section_id: "s5", group: "mirror",
    plain: "马克思批判了「怎样生产」，却没批判「生产」这个形式本身。",
    explain: "序言开头的核心论断：生产方式的批判理论没有触及生产的原则。马克思的概念描述的是生产「内容」的辩证历史——谁占有生产资料、剩余价值如何被榨取、生产关系怎样更替——却让「生产」作为一种形式完好无损。\n\n于是这个形式在批判背后被理想化地重新出现：资本主义被要求让位于「真正的、去异化的」生产。鲍德里亚说，生产形式和表征形式（符号、语言的地位）是马克思没有分析的两大形式，它们一起给马克思划定了界限。",
    analogy: "像批评一家工厂的管理制度——工时太长、分配不公——却从不问「为什么所有人生活的意义都要通过上班来衡量」。改革制度不等于跳出这个问题。",
    book_example: { what: "序言：批判理论只描述了生产内容的谱系，让生产作为形式「完好无损」。", point: "后面每章都在追问被保留下来的那个形式。" },
    misconception: "这不是「马克思忽视了文化」之类的补充性批评，而是说他的整个批判工具来自对手。",
  },
  {
    id: "labor_power", name_zh: "劳动力", name_en: "Labor Power", icon: "💪", section_id: "s1", group: "pe",
    plain: "人「天生拥有」的、靠劳动创造价值的能力——鲍德里亚怀疑这种天然性。",
    explain: "在马克思那里，工人之所以被剥削，是因为他出卖了自己的劳动力，而劳动力创造的价值多于工资。这一分析的前提是：人本来就是一种能创造价值的力量，只是被异化了。\n\n鲍德里亚的指控更狠：马克思主义让人们相信自己因出卖劳动力而被异化，恰恰帮了资本的忙，因为它遮蔽了一个更激进的假设——人根本不必是「劳动力」。他希望工人不要在「生产」的标志下理解自己。",
    analogy: "如果有人告诉你「你被低估了，你的时薪应该更高」，这是在为你争取利益；但这句话也默认了「你 = 一份可计价的工时」。鲍德里亚想问的是后一点。",
    book_example: { what: "Poster 引用鲍德里亚：马克思主义「协助了资本的诡计」，让人以为问题只在劳动力被出卖。", point: "批判剥削反而巩固了「人=劳动力」的身份。" },
    misconception: "鲍德里亚并不否认剥削存在，他质疑的是用「劳动力」定义人的那个前提。",
  },
  {
    id: "use_value", name_zh: "使用价值", name_en: "Use Value", icon: "🔧", section_id: "s2", group: "pe",
    plain: "马克思用来对抗交换价值的「真实有用性」，其实只是交换价值的背面。",
    explain: "政治经济学关心商品在市场上的交换价值；马克思揭示其背后有「具体的」使用价值、「具体的」劳动和真实的需要。看起来他从抽象走向了现实。\n\n鲍德里亚认为这只是翻到了同一体系被压抑的那一面。把使用价值当作交换价值的「彼岸」，等于把一切超越都锁在「价值」这个场域内部：有用性、功利、理性目的同样是一种抽象。在交换价值和抽象劳动时间出现之前，「劳动」「生产」相对于丰富的象征交换就已经是一种化约。",
    analogy: "像一个人说「别看价格标签，看东西真正的用处」。听起来更真实，但他仍然在用「这东西对我有什么用」的眼光看世界——礼物、纪念、仪式里的物件，没法用这两种眼光看懂。",
    book_example: { what: "Poster：马克思在交换价值体系后面揭示出需要与使用价值的人类学，但这「并非超越政治经济学，只是看到它的反面」。", point: "第 1 章将详细展开对使用价值的批判。" },
    misconception: "鲍德里亚不是说东西「没用」，而是说「有用性」并非人与物关系的自然、普遍的本质。",
  },
  {
    id: "domination_of_nature", name_zh: "征服自然的人类学", name_en: "Domination of Nature", icon: "⛏️", section_id: "s2", group: "pe",
    plain: "人面对自然必须劳动，让它交出财富——两大理论都这样设想人。",
    explain: "政治经济学和马克思主义共享一幅图景：自然是人必须应对的必然性；人用劳动力、借助技术，迫使自然交出财富供人享用。政治经济学把劳动理想化为个人主义道德，历史唯物主义则把它物质化为人的自我实现，但两者都认为人的目的（telos）在于征服自然。\n\n在这幅图景里没有象征交换，没有意义与行为的相互往来；劳动和自然都被化为待技术实现的「价值」。Poster 指出，当这个体系开始制造生态灾难时，这种人类学就变得具有欺骗性。",
    analogy: "把一座山只看成「矿藏储量」，把一片森林只看成「木材产能」。无论收益归资本家还是归全民，山和森林都已经被翻译成了生产力。",
    book_example: { what: "Poster：两者参与的是同一种人类学——人在征服自然中寻找自己的目的。", point: "第 2 章专门拆解这块镜片。" },
    misconception: "这不是简单的环保主张；重点在批判「自然 = 生产力」这种看法的来历与普遍化。",
  },
  {
    id: "universalization", name_zh: "历史唯物主义的普遍化", name_en: "Universalization of Historical Materialism", icon: "🌐", section_id: "s4", group: "mirror",
    plain: "马克思主义忘了自己的历史边界，用今天的「生产」去读全部历史。",
    explain: "Poster 概括了鲍德里亚在各章「认识论」小节里的两项指控。第一，黑格尔式的自信：因为资本主义创造了普遍科学知识的条件，马克思主义便自认站在历史的特权位置上，能客观读懂一切过去；它由此放弃了自我相对化。\n\n第二，分析模型的投射：把「生产方式」套到原始社会，只能把它看成「生产力不发达」的阶段，抓不住两者之间根本的差异。鲍德里亚不是说马克思犯了一时疏忽，而是说这种普遍化深植于其认识论前提，也是整个西方思想传统的通病。",
    analogy: "像用「用户增长」的眼光去评价一个村庄的节庆：只会看到「转化率低」「资源浪费」，看不到那里交换的是荣誉、义务和关系。",
    book_example: { what: "Poster：生产模式「把原始社会吸收为自己的同类」，只照出它的相对差异——不发达的生产方式。", point: "第 3、4 章会把这块镜片拆开。" },
    misconception: "鲍德里亚不只是说「马克思不懂人类学」，而是说任何一个自命普遍的分析模型都会把断裂抹平为程度差异。",
  },
  {
    id: "mode_of_signification", name_zh: "表意方式", name_en: "Mode of Signification", icon: "🔣", section_id: "s3", group: "sign",
    plain: "资本主义的真正逻辑，是给物「打上符号」的方式，而不只是生产方式。",
    explain: "马克思把重心从市场的交换转移到生产；鲍德里亚说两者底下的真实逻辑是同一个：给物赋予价值，也就是在物上放置符号。这种「意指」的逻辑才是资本的本质。\n\n Poster 指出，马克思理论化了政治经济学的第一次转变（生产方式与生产关系），却没看到第二次决定性转变：一种指向「符号」而非商品的社会抽象。鲍德里亚的最大贡献，就是对「符号的政治经济学」展开批判，并把它看作发达资本主义的主导社会形式。",
    analogy: "一双球鞋的成本、用途和工人工资都摆在那里，但它卖出天价靠的是联名、限量、潮流圈的认可——它在一套符号体系中的位置。",
    book_example: { what: "Poster：马克思看不到这个对象，一因他被生产之镜束缚，二因他的话语与古典经济学家一样是「表征式」的。", point: "批判的重心从商品转到符号。" },
    misconception: "这不是用「唯心」替换「唯物」。Poster 明确说问题不在于唯物还是唯心，而在于是否抓住了政治经济学的表意逻辑。",
  },
  {
    id: "code", name_zh: "代码", name_en: "The Code", icon: "🧬", section_id: "s3", group: "sign",
    plain: "能指脱离所指和现实，只指向其他符号，自成一套运转规则。",
    explain: "Poster 借结构语言学说明：符号由能指（词）、所指（意义）和指涉物（现实中的东西）组成。结构主义者发现能指越来越脱离主体和物，却认为这是自然的；鲍德里亚则说，这种分离正是政治经济学的本质，它扩展到所有社会交换。\n\n结果是所指与指涉物都被废除，只剩能指之间的游戏：能指成为自己的指涉物，符号只指向其他符号，代码成为「绝对参照」。由于代码没有外部参照，就没有限定需要的终点，只要体系控制着代码，消费就能无限扩张；生产不再是矛盾所在，反倒变成体系的意识形态支撑。",
    analogy: "社交平台上的「点赞数」：它最初指向「有人喜欢这条内容」，后来点赞只和其他点赞比较、互相换算，变成一套自我参照的游戏，没人再问它对应什么真实的东西。",
    book_example: { what: "腋下除臭剂的「革命」：重要的不是它的交换价值、使用价值或生产它的工人，而是它能脱离这一切，成为代码中的一个元素。", point: "被消费的不是物，而是代码。" },
    misconception: "「代码」不是计算机代码，而是一套自我指涉的符号差异体系，它规定什么有意义、什么没有。",
  },
  {
    id: "active_consumption", name_zh: "作为符号交换的消费", name_en: "Consumption as Sign Exchange", icon: "🛍️", section_id: "s3", group: "sign",
    plain: "消费不是被动地用掉东西，而是主动地占有符号、加入一套交流结构。",
    explain: "政治经济学开创、马克思确认了一种偏见：生产是主动的环节，消费是被动的。这种生产主义意识形态让社会理论看不到消费中复杂的交换。鲍德里亚在《物体系》中就主张：消费和生产一样是「主动」的交换。\n\n消费者占有的不是满足理性需要的物质对象，而是一种象征意义，他借此把自己放进一个与整个政治经济学体系紧密相连的交流结构中。所以体系要延续下去，不只要再生产劳动力，还要不断再生产代码。",
    analogy: "你买的不是一部手机，而是「某一类人」的身份标签；换机也常常不是因为旧的坏了，而是因为它在符号序列中「过时」了。",
    book_example: { what: "Poster：通过购买商品来「获得」（想象的或真实的）个人品质。", point: "消费是符号的主动占有，不是物的消耗。" },
    misconception: "说消费「主动」不是在赞美消费者自由；Poster 说这套符号体系对人的交换造成了严重扭曲，是代码的「恐怖主义」。",
  },
  {
    id: "symbolic_exchange", name_zh: "象征交换", name_en: "Symbolic Exchange", icon: "🎁", section_id: "s4", group: "symbolic",
    plain: "相互给予与回应、有得也有失、不能积累成价值的交换。",
    explain: "这是鲍德里亚拿来对抗代码与生产主义的概念。在象征交换中，意义与行为相互往来，有能量与意义的释放，既是纯粹的损失也是收获。政治经济学恰好相反：它从不认赔，一切（甚至战争）最终都化为价值积累与再投资——这就是资本主义无休止增长的秘密。体系即便试图让渡一点权力，「参与」也会变成收编。\n\n在 Poster 的叙述中，体系正是经由漫长的抽象与分离过程设计出来摧毁象征交换的，因此在其中象征交换「根本不可能」。后面几章会用原始社会的礼物、耗费与「反-生产」来充实这个概念。",
    analogy: "朋友请你吃饭，你下次回请——但没人会精确算账，算清了反而伤感情。那顿饭交换的是关系本身，不是「等价物」。",
    book_example: { what: "Poster 以言语（la parole）为例：说话中有意义的相互给予和接受，超越了符号的抽象与操纵。", point: "象征交换的核心是互惠与损耗，而非积累。" },
    misconception: "象征交换不是「以物易物」，也不是一种更公平的经济；它根本不按价值与等价的逻辑运作。",
  },
  {
    id: "la_parole", name_zh: "言语与代码零点", name_en: "La Parole / Zero Point of the Code", icon: "🗣️", section_id: "s4", group: "symbolic",
    plain: "被代码排除在外的人，用自发的说话去对抗代码本身。",
    explain: "发达资本主义制造出一些「非标记」群体——黑人、女性、青年、领救济者。他们被定义为「不负责任」，处在代码的「零点」，说的话不算数。正因如此他们的位置最激进：要反对的不是代码内部的某种不平等，而是代码本身。1968 年五月风暴中，他们正是自发地诉诸言语（la parole）。\n\n这条思路与列斐伏尔把「信号」与面对面的言语相对立一脉相承。Poster 的批评是：颂扬言语预设了交换双方「完全在场」——鲍德里亚说「我们总是完全在那里」——这是一种中心化在场的本体论，解释不了误解；它在政治上也只剩下对自发推翻代码的空洞召唤。",
    analogy: "广场上的即兴辩论、墙上的涂鸦，与经过算法排序、被平台评分的「内容」相比，前者不必先换算成流量才算数。",
    book_example: { what: "1968 年五月：被边缘化的群体以自发言语对抗代码。", point: "也暴露了这一立场在理论和政治上的薄弱处。" },
    misconception: "这里的「言语」不是索绪尔意义上与语言系统相对的个人言语行为，而是指不经代码中介、相互回应的交流。",
  },
  {
    id: "historical_stages", name_zh: "三阶段与断裂", name_en: "Phases and Discontinuity", icon: "🧭", section_id: "s4", group: "symbolic",
    plain: "象征交换社会 → 政治经济学 → 代码统治的第三阶段，其间是断裂。",
    explain: "Poster 把鲍德里亚隐含的历史压缩成一条线：前工业的象征交换社会；政治经济学；第三阶段——政治经济学在彻底否定象征时达到完全发展；还暗示有回归象征的第四阶段。\n\n这段历史强调断裂而非连续，它本身就隐含着一套分析表意系统的方法。但 Poster 认为两者都没有被鲍德里亚理论化：他批评马克思主义过于连续、带有目的论，方向是对的，却没有给出一个既不把全部历史收束到现在、又能提供批判立足点的「非连续模型」。",
    analogy: "像说「胶片时代、数码时代、算法时代」之间不是逐步升级而是游戏规则彻底改变——但若说不清规则怎样改变，就容易只剩口号。",
    book_example: { what: "Poster 认为，鲍德里亚对历史唯物主义认识论的批判中那些不完整和含混之处，又在他自己的立场里重新冒了出来。", point: "第 5 章会正面展开「第三阶段」。" },
    misconception: "这不是严格的历史分期理论；Poster 恰恰指出它缺少理论支撑，有滑向纯粹相对主义的风险。",
  },
];

export const relations = [
  { from: "mirror_of_production", to: "productivism", label: "表现为" },
  { from: "form_vs_content", to: "mirror_of_production", label: "镜子未被打破" },
  { from: "productivism", to: "labor_power", label: "定义人为" },
  { from: "labor_power", to: "use_value", label: "具体劳动造" },
  { from: "use_value", to: "domination_of_nature", label: "预设功利人类学" },
  { from: "domination_of_nature", to: "mirror_of_production", label: "共享于镜两侧" },
  { from: "mirror_of_production", to: "universalization", label: "投射到全部历史" },
  { from: "form_vs_content", to: "mode_of_signification", label: "被忽略的另一形式" },
  { from: "mode_of_signification", to: "code", label: "发展为" },
  { from: "code", to: "active_consumption", label: "通过消费再生产" },
  { from: "code", to: "symbolic_exchange", label: "摧毁" },
  { from: "symbolic_exchange", to: "productivism", label: "对抗" },
  { from: "la_parole", to: "code", label: "反抗代码本身" },
  { from: "la_parole", to: "symbolic_exchange", label: "范例" },
  { from: "historical_stages", to: "universalization", label: "以断裂反对" },
  { from: "historical_stages", to: "code", label: "第三阶段" },
];

const sections = [
  {
    id: "s1", no: "导言 1", title_zh: "为何要重审马克思", title_en: "The Impasse of Marxism",
    gist: "马克思的批判太依赖它要推翻的那套概念，反而协助了资本。",
    summary: "Poster 开篇说：许多左翼早就怀疑马克思主义不足以分析发达社会，各种「综合」（法兰克福学派、弗洛伊德—马克思主义等）都不尽如人意。鲍德里亚调动《物体系》《消费社会》《符号政治经济学批判》的成果，对马克思做系统批判：历史唯物主义的「生产」「劳动」形式来自政治经济学本身。马克思主义让人相信自己因出卖劳动力而被异化，反而掩盖了「人不必是劳动力」的更激进可能；连法国前卫理论也困在生产隐喻里。",
    concept_ids: ["productivism", "labor_power", "mirror_of_production"],
  },
  {
    id: "s2", no: "导言 2", title_zh: "劳动、自然与使用价值：同一种人类学", title_en: "One Anthropology, Two Sides",
    gist: "从市场转向生产，只是看到了同一体系的背面。",
    summary: "政治经济学与马克思主义都设想：人面对自然的必然性，用劳动和技术迫使自然交出财富。一个把劳动理想化为个人道德，一个把它物质化为人的实现，却共享以征服自然为目的的人类学。马克思把资本主义的重心从交换价值移到生产与使用价值，揭露了剩余价值的榨取；但在鲍德里亚看来，两者的逻辑一致：都是给物赋予价值。社会领域被生产与劳动这对概念过滤，后者成了不受质疑的形而上学参照点。",
    concept_ids: ["use_value", "domination_of_nature", "labor_power"],
  },
  {
    id: "s3", no: "导言 3", title_zh: "从生产方式到表意方式", title_en: "Toward a Political Economy of the Sign",
    gist: "资本主义的核心是符号逻辑；被消费的是代码，不是物。",
    summary: "问题不是马克思「太经济决定论」，而是他没看到政治经济学的表意逻辑，以及指向符号而非商品的第二次社会抽象。借结构语言学，鲍德里亚说能指脱离所指与指涉物正是政治经济学的本质：代码只指向自身。消费因此是对符号的主动占有；体系需要再生产的不只是劳动力，还有代码。只要控制代码，消费就能无限扩张，生产不再是矛盾所在。",
    concept_ids: ["mode_of_signification", "code", "active_consumption"],
  },
  {
    id: "s4", no: "导言 4", title_zh: "Poster 的保留", title_en: "Difficulties and Affinities",
    gist: "象征交换与言语预设了「完全在场」；历史断裂缺少理论。",
    summary: "鲍德里亚用象征交换对抗代码：被代码排斥的群体以自发言语反抗，如 1968 年五月。Poster 认为这预设了在场的本体论。他把鲍德里亚与马尔库塞、哈贝马斯相比，肯定他把马克思全集作为整体来批判，也梳理了其认识论指控：马克思主义自命普遍、把生产模式投射到过去。但如何让断裂可理解、避免纯粹相对主义，鲍德里亚没给出答案。总体上，符号政治经济学批判仍是激进理论有前途的方向。",
    concept_ids: ["symbolic_exchange", "la_parole", "universalization", "historical_stages"],
  },
  {
    id: "s5", no: "序言", title_zh: "生产的幽灵", title_en: "Preface: The Phantom of Production",
    gist: "生产方式的批判没碰生产的原则；人在生产之镜中想象自己。",
    summary: "鲍德里亚仿《共产党宣言》开头：一个幽灵在革命想象中徘徊——生产的幽灵。批判只追溯生产内容的谱系，生产形式完好无损，又在革命话语中被理想化：解放生产力、解放能指的文本生产、把无意识还原为生产机器。马克思打破了「经济人」的虚构，却以「劳动力」之名造出相似的虚构。借拉康的镜像阶段，人在生产之镜中于想象界认识自己；生产形式与表征形式是马克思未分析的两大形式。",
    concept_ids: ["mirror_of_production", "form_vs_content", "productivism"],
  },
];

const flow = [
  { claim: "左翼普遍感到马克思主义不够用了，但问题出在哪？", detail: "Poster 说各种修补式综合都不令人满意；鲍德里亚要做的是回到马克思本人，系统追问其概念。" },
  { claim: "马克思批判政治经济学时，借用的「生产」「劳动」形式本身就来自政治经济学。", detail: "他没有批判这些形式，只是用它们反过来攻击资本。" },
  { claim: "从交换价值翻到使用价值、从抽象劳动翻到具体劳动，只是看到同一体系的背面。", detail: "两者共享一种人类学：人是生产者，自然是待征服的资源，有用性是天然的。" },
  { claim: "因此马克思主义反而协助了资本的诡计。", detail: "它让人以为问题只是劳动力被出卖，却遮蔽了「人不必是劳动力」这一更激进的可能。" },
  { claim: "资本主义的深层逻辑不是生产，而是表意：给物打上符号。", detail: "马克思没看到指向符号的第二次社会抽象；发达资本主义由自我指涉的代码主导，消费的是符号。" },
  { claim: "代码没有外部参照，所以消费可以无限扩张，生产不再是矛盾所在。", detail: "真正的对立面是象征交换：互惠、损耗、不可积累。" },
  { claim: "Poster 的保留：象征交换与历史断裂都没被充分理论化。", detail: "言语预设完全在场；拒绝分析模型可能滑向相对主义；政治上只剩对自发反抗的召唤。" },
  { claim: "序言收束：生产之镜是想象界的镜子，人在其中把自己看作要生产的价值。", detail: "生产形式和表征形式是马克思未分析的两大形式；全书要做的，就是拆掉这面镜子。" },
];

const compression = [
  { examples: ["阿尔都塞：理论是一种「生产」", "德勒兹—加塔利：无意识是欲望的生产机器", "Tel Quel：文本的「生产性」", "当代人文主义：不是「做」自己，而是「生产」自己"], says: "连最激进的理论也说着生产的语言——生产隐喻已渗入革命想象。" },
  { examples: ["富兰克林：人是制造工具的动物", "马克思：人通过劳动实现自身", "马克思拆穿「经济人」却代之以「劳动力」"], says: "辩护者与批判者对「人是什么」的答案一样：生产者。" },
  { examples: ["腋下除臭剂的「革命」", "通过购物获得个人品质", "「清洁炸弹」"], says: "这些现象在马克思的「稳定世界」里说不出口——它们属于自我指涉的代码，不属于生产。" },
  { examples: ["黑人", "女性", "青年", "领救济者", "1968 年五月"], says: "处在代码「零点」的群体，反抗的是代码本身，而不是代码内部的不平等。" },
  { examples: ["《1844 年手稿》", "《德意志意识形态》", "《资本论》", "《评瓦格纳》"], says: "鲍德里亚不区分早期与成熟马克思，批判的是贯穿全集的主题。" },
];

const sorter = {
  instruction: "把下列说法放进它所属的逻辑",
  categories: [
    { id: "mirror", label: "生产之镜（政治经济学与其批判共享）" },
    { id: "code", label: "代码（第三阶段）" },
    { id: "symbolic", label: "象征交换" },
  ],
  items: [
    { text: "工人应当夺回被剥削的剩余价值", answer: "mirror", why: "要求公平分配劳动成果，仍把人定义为创造价值的劳动力。" },
    { text: "把无意识看作生产欲望的机器", answer: "mirror", why: "序言点名的例子：欲望也被说成「生产」。" },
    { text: "人通过劳动改造自然、实现自身", answer: "mirror", why: "征服自然的人类学，两大理论共享。" },
    { text: "原始社会是生产力尚不发达的阶段", answer: "mirror", why: "把今天的生产模式投射到过去，抹平断裂。" },
    { text: "不是「做」自己，而是「生产」自己", answer: "mirror", why: "序言说这是当代普遍化的人文主义主题。" },
    { text: "买除臭剂，买的是它在广告符号体系里的意义", answer: "code", why: "被消费的是代码中的元素，而不是物。" },
    { text: "能指不再指向现实，只指向其他符号", answer: "code", why: "能指成为自己的指涉物，代码自成参照。" },
    { text: "只要控制代码，消费就能无限扩张", answer: "code", why: "没有外部指涉物来限定需要，生产不再是矛盾所在。" },
    { text: "说话时彼此给出又回应意义，有得也有失", answer: "symbolic", why: "Poster 对言语中象征交换的描述。" },
    { text: "收到的礼物必须回赠，不能折算成价格", answer: "symbolic", why: "互惠的义务，而非等价交换。" },
    { text: "把能量与意义「白白」释放，不转化为积累", answer: "symbolic", why: "纯粹的损失——政治经济学恰恰从不认赔。" },
  ],
};

const contrast = {
  title: "马克思主义视角 vs 鲍德里亚视角",
  left: "马克思主义（历史唯物主义）",
  right: "鲍德里亚（符号批判 + 象征交换）",
  rows: [
    { aspect: "人的本质", left: "通过劳动改造世界、实现自身的生产者", right: "「生产者」是政治经济学投给人的镜像；人不必是劳动力" },
    { aspect: "批判的对象", left: "生产方式的内容：所有制、剥削、异化", right: "生产这一形式本身，以及表征形式" },
    { aspect: "资本主义的重心", left: "生产资料与生产关系", right: "表意逻辑：给物打上符号，最终由代码主导" },
    { aspect: "消费", left: "被动环节，满足（被扭曲的）需要", right: "主动占有符号、加入交流结构" },
    { aspect: "体系的矛盾在哪", left: "生产力与生产关系的冲突", right: "体系难以再生产代码；生产只是意识形态支撑" },
    { aspect: "解放的方向", left: "解放生产力，消除异化的劳动", right: "跳出生产语法，走向象征交换与互惠" },
    { aspect: "看待过去的社会", left: "生产方式依次演进，原始社会是不发达阶段", right: "深刻断裂：象征社会不能用生产来读" },
  ],
};

const quotes = [
  { en: "A specter haunts the revolutionary imagination: the phantom of production.", zh: "一个幽灵在革命想象中徘徊：生产的幽灵。", meaning: "仿《共产党宣言》开头的反讽：缠住革命的不是外敌，而是它自己的「生产」想象。" },
  { en: "The critical theory of the mode of production does not touch the principle of production.", zh: "生产方式的批判理论，并未触及生产的原则。", meaning: "全书的核心论断：批判内容，保留形式。" },
  { en: "they do not have to be the labor power, the 'unalienable' power of creating value by their labor.", zh: "他们并不必须是劳动力，那种靠劳动创造价值的「不可让渡」的力量。", meaning: "Poster 引用的鲍德里亚原话：比「劳动力被异化」更激进的假设。" },
  { en: "it is no longer a question of 'being' oneself but of 'producing' oneself", zh: "问题不再是「成为」自己，而是「生产」自己。", meaning: "生产之镜已经进入人的自我理解。" },
];

const quiz = [
  {
    q: "鲍德里亚对马克思的核心不满是什么？",
    options: ["马克思过于强调经济，忽视了文化与精神", "马克思批判了生产的内容，却把「生产」这一形式当作不言自明的前提", "马克思的剩余价值计算有误", "马克思不够重视工人阶级的革命作用"],
    answer: 1,
    why: "Poster 明确说问题不在经济决定论，也不是用唯心替换唯物；而是生产与劳动的形式从未被追问。",
  },
  {
    q: "为什么说「从交换价值转向使用价值」不是真正的超越？",
    options: ["因为使用价值在资本主义中不存在", "因为马克思后来放弃了使用价值概念", "因为使用价值同样是价值逻辑的一部分，只是交换价值的背面", "因为使用价值只适用于原始社会"],
    answer: 2,
    why: "把使用价值当作交换价值的「彼岸」，等于把超越锁在价值场域内部；有用性本身也是一种抽象。",
  },
  {
    q: "按 Poster 的转述，「马克思主义协助了资本的诡计」是指：",
    options: ["它让人以为问题只在劳动力被出卖，从而遮蔽了「人不必是劳动力」的可能", "马克思主义政党与资本家秘密合作", "马克思主义鼓励消费主义", "马克思主义否认剥削的存在"],
    answer: 0,
    why: "批判剥削反而巩固了「人=劳动力」的自我理解。",
  },
  {
    q: "在鲍德里亚的分析中，为什么生产「不再是矛盾所在」？",
    options: ["因为工人的工资已经足够高", "因为机器取代了全部劳动", "因为革命已经成功", "因为代码以自身为参照，没有限定需要的终点，只要控制代码，消费和生产就能无限延续"],
    answer: 3,
    why: "体系的张力转移到能否再生产代码；生产只是「交付商品」的意识形态支撑。",
  },
  {
    q: "Poster 对鲍德里亚「象征交换 / 言语」的主要批评是：",
    options: ["它太依赖经济数据", "它预设了交换双方「完全在场」，解释不了误解，政治上只剩对自发反抗的召唤", "它完全照搬了哈贝马斯", "它把马克思分成早期与晚期"],
    answer: 1,
    why: "Poster 指出这是一种中心化在场的本体论；鲍德里亚没有给出在场与缺席的辩证。",
  },
  {
    q: "序言借用拉康「镜像阶段」想说明什么？",
    options: ["人在想象中透过生产、劳动、价值来认出自己，这种自我认识是想象性的", "资本主义像婴儿一样尚未成熟", "工人阶级需要通过精神分析获得解放", "生产之镜能真实地反映人的本质"],
    answer: 0,
    why: "生产之镜给人一个「生产主义自我」的理想形象，人把自己看成待生产、待实现的价值——这属于想象界。",
  },
];

const takeaways = [
  "批判的对象有两层：生产方式的「内容」和「生产」这个形式。马克思只批了前者，于是在镜中复制了政治经济学。",
  "劳动、使用价值、需要、自然，在政治经济学与马克思主义中是同一套语法的正反两面。",
  "发达资本主义的核心是符号与代码：消费的是符号，体系需要再生产的是代码。",
  "鲍德里亚以象征交换（互惠、损耗、不可积累）对抗生产主义；Poster 提醒，这个替代方案和他的「断裂史观」都还缺乏理论支撑。",
];

const glossary = [
  { term: "Mirror of Production", zh: "生产之镜", def: "人只能透过生产、劳动、价值来理解自己与社会的想象性框架；批判者与被批判者共享。" },
  { term: "Productivism", zh: "生产主义", def: "把一切活动（财富、语言、欲望、文本）都理解为某种劳动产品的思维方式。" },
  { term: "Political Economy", zh: "政治经济学", def: "斯密、李嘉图等的古典经济学，也指以价值、交换、生产组织起来的整个社会体系。" },
  { term: "Historical Materialism", zh: "历史唯物主义", def: "马克思以生产方式与生产关系的演变解释历史的理论。" },
  { term: "Labor Power", zh: "劳动力", def: "工人出卖给资本家、能创造多于自身价值的劳动能力。" },
  { term: "Use Value / Exchange Value", zh: "使用价值 / 交换价值", def: "物的有用性 / 物在市场上与他物交换的比例。鲍德里亚认为二者属同一价值逻辑。" },
  { term: "Homo economicus", zh: "经济人", def: "追逐自身利益、理性计算的人的模型；马克思批判了它，却代之以劳动的人。" },
  { term: "Signifier / Signified / Referent", zh: "能指 / 所指 / 指涉物", def: "符号的词形 / 意义 / 所指向的现实对象。" },
  { term: "Code", zh: "代码", def: "能指脱离所指与现实后，只在符号之间相互参照的自我指涉体系。" },
  { term: "Mode of Signification", zh: "表意方式", def: "Poster 用来对照「生产方式」：社会如何给物赋予符号与意义。" },
  { term: "Symbolic Exchange", zh: "象征交换", def: "互惠的给予与回应，包含损耗、不可积累；鲍德里亚对抗生产主义的立足点。" },
  { term: "La parole", zh: "言语", def: "面对面、相互回应的说话；Poster 用它说明象征交换，并批评其预设的「完全在场」。" },
  { term: "Mirror Stage", zh: "镜像阶段", def: "拉康的概念：婴儿在镜中把自己认作完整的「我」，这种认同属于想象界。" },
  { term: "Tel Quel", zh: "《如是》派", def: "1960—70 年代法国先锋文学理论团体，强调「文本生产」。" },
];

const stages = [
  { year: "前工业", label: "象征交换社会", note: "交换以互惠、礼物、耗费为核心，不以价值与生产组织。" },
  { year: "政治经济学", label: "商品与生产", note: "交换价值与生产成为社会组织原则；马克思所分析的正是这一阶段。" },
  { year: "第三阶段", label: "代码统治", note: "政治经济学在彻底否定象征时达到完全发展：能指自我指涉，代码成为绝对参照。第 5 章展开。" },
  { year: "（暗示）", label: "回归象征", note: "Poster 说鲍德里亚只暗示了这个阶段，并未理论化。" },
];

export default function Chapter() {
  return (
    <ChapterPage meta={meta} groups={groups} concepts={concepts} relations={relations}>
      <Block><Hook title={"连休息都要「高效」？"}>{"年终总结要写「产出」，读书要算「收获」，周末要「充电」以便下周更有战斗力，连情绪都要「管理」。抱怨内卷的人，开出的药方往往是「找到真正有价值的工作」「实现真正的自我」。仔细听，赞成者和反对者说的是同一种语言：人是用来生产的，问题只在生产得对不对、成果归谁。\n\n1973 年，鲍德里亚把这种直觉推到马克思面前：最彻底的资本批判者，是否也说着资本的语言？他的回答是：是的。马克思批判了怎样生产、为谁生产，却从没问过：人为什么必须被理解为生产者？"}</Hook></Block>

      <Block id="secs" toc="结构" kicker="结构" title="导言与序言分几步走" lead="Mark Poster 的译者导言按论证拆成四节，再加鲍德里亚本人的序言。点开看概述。">
        <SectionCards sections={sections} />
      </Block>

      <Block id="flow" toc="论证主线" kicker="论证主线" title="一条线串起导言与序言" lead="跳过人名与引文，论证其实就是这几步：">
        <ArgumentFlow steps={flow} />
      </Block>

      <Block id="mirror" toc="生产之镜" kicker="本章专属图解" title="一面镜子，两边同一套语法"
        lead="左边是政治经济学，右边是马克思主义的批判。依次切换三种状态：看它们怎样对立，怎样共享同一套「生产」语法，以及打破镜子后剩下什么。">
        <MirrorOfProduction />
        <Callout tone="key" title="关键一步">
          鲍德里亚不是换到镜子的另一边站，而是质疑镜子本身。这就是 <C id="form_vs_content">形式 vs 内容</C> 的区分：马克思翻转了每一组概念的内容，却保留了「生产」这个形式。
        </Callout>
      </Block>

      <Block id="road" toc="全书路线图" kicker="全书路线图" title="五章，各打碎一块镜片" lead="序言提出总论点，正文五章逐一拆解。每章末尾还有一节「认识论」，追问马克思主义理论模型本身。">
        <BookRoadmap />
        <div style={{ marginTop: 16 }}><Timeline events={stages} /></div>
        <Callout tone="info" title="三阶段（点上面的时间轴）">
          这是 Poster 从鲍德里亚书中提炼的历史轮廓，见 <C id="historical_stages">三阶段与断裂</C>。注意 Poster 认为这条线本身并没有被充分理论化。
        </Callout>
      </Block>

      <Block id="concepts" toc="概念卡片" kicker="核心概念" title="概念卡片" lead="每张卡：一句大白话 → 点开看深入解释、现代类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>

      <Block id="map" toc="概念地图" kicker="概念地图" title="它们怎么连在一起" lead="悬停高亮某个概念的邻居，点击打开卡片，可拖动节点。">
        <ConceptMap />
      </Block>

      <Block id="comp" toc="例子压缩" kicker="例子压缩器" title="一串人名和例子，其实只说了一件事" lead="点击一组，把它们压缩成一句话。">
        <ExampleCompression items={compression} />
      </Block>

      <Block id="sorter" toc="分类游戏" kicker="动手试试" title="分类游戏" lead={sorter.instruction + "（可拖拽，也可先点卡片再点格子）"}>
        <DragSort categories={sorter.categories} items={sorter.items} />
      </Block>

      <Block id="contrast" toc="对照" kicker="对照" title={contrast.title}>
        <CompareTable left={contrast.left} right={contrast.right} rows={contrast.rows} />
      </Block>

      <Block id="quotes" toc="原文金句" kicker="原文金句" title="原话（精选）">
        <QuoteCarousel quotes={quotes} />
      </Block>

      <Block id="quiz" toc="自测" kicker="自测" title="你真的懂了吗" lead="考理解，不考记忆。">
        <Quiz questions={quiz} />
      </Block>

      <Block id="end" toc="带走" kicker="带走" title="记住这几条就够了">
        <Takeaways items={takeaways} />
        <Bridge title="→ 如何进入第 1 章">{"序言的总论点是「生产的形式没被批判」，第 1 章从最中心的一块镜片下手：劳动。鲍德里亚将逐一检查使用价值与劳动力、具体劳动的「质与量」、人的「类本质」、劳动伦理与游戏美学，追问马克思用来对抗资本的这些概念如何本身就是政治经济学的产物。读的时候带着镜子图解里的「价值」「劳动」「需要」三行。"}</Bridge>
      </Block>

      <Block id="gloss" toc="术语表" kicker="术语表" title="术语速查">
        <Glossary terms={glossary} />
      </Block>
    </ChapterPage>
  );
}
