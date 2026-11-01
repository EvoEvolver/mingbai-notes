// 第 3 章 · 小调和声（发声组件来自 @kit/audio；专属图解见 _ch03_minorlab.jsx）
import { ChapterPage, Block, Hook, SectionCards, ArgumentFlow, ConceptGrid, ConceptMap, Quiz, Takeaways, Bridge, Glossary, C, Callout, Tabs, Toggle, CompareTable } from "@kit";
import { Play, SoundBar, Tonnetz, EarQuiz, Narrate, Score, Progression } from "@kit/audio";
import { MinorLab, DegreeSchemes } from "./_ch03_minorlab.jsx";

export const meta = {
  id: "ch03", no: 3, title_zh: "小调和声", title_en: "Minor-Key Harmony",
  era: "基础篇 · 调与功能",
  one_liner: "同一组音换个主音就是小调；升一个音、借一个和弦，明暗就在大小调之间来回切换。",
  big_question: "小调为什么有三种？大调和小调之间能不能互相「借」和弦？",
  why_it_matters: "流行歌曲里一大半是小调，而且几乎没有「纯」的小调：自然、和声、旋律小调混用，关系大调、同主音大调随时串门。看懂这些混合，才听得懂一首歌为什么忽明忽暗；♭VI、♭VII、iv 这些「调外」和弦，也从这里正式登场。",
  original_words: 34000, read_minutes: 45,
};

export const groups = [
  { id: "scale", label: "三种小调" },
  { id: "chord", label: "新和弦" },
  { id: "mix", label: "调关系与借用" },
  { id: "analysis", label: "分析与记号" },
];

export const concepts = [
  { id: "natural_minor", name_zh: "自然小调", name_en: "Natural minor", icon: "🌙", section_id: "s1", group: "scale",
    plain: "以大调 6 级为主音的音阶；主和弦是小三和弦，7 级是「下主音」。",
    explain: "把 C 大调的七个音从 A 开始排，就是 a 自然小调 A–B–C–D–E–F–G。主音到中音是小三度，主和弦 Am 是小三和弦，色彩暗淡抒情。小调的 1、4、5 级仍叫主音、下属音、属音，但 3、6 级与主音是小三度、小六度。\n\n最关键的是 7 级 G：它在主音下方一个全音，倾向主音的力量弱，所以不叫导音而叫下主音。结果是属功能组乏力（v 是小三和弦），下属功能组反而因 6 级只比 5 级高半音而加强；III、VI、VII 连用时还容易被关系大调抢走调感。",
    analogy: "像同一家公司换了领导班子：员工（七个音）一个没变，职务和权力重新分配，公司的作风就完全不同了。",
    book_example: { what: "书中比较 C–F–G–C 与 Am–Dm–Em–Am：后者明显没那么「有劲」。", point: "缺了导音，v–i 的推动力大减，这是自然小调一切特点的根源。" },
    misconception: "小调不是从大调「派生」的次一级调式；大小调从诞生起就是并立的两种调式，名字里的大小不代表地位。" },
  { id: "relative_keys", name_zh: "关系大小调", name_en: "Relative major & minor", icon: "👯", section_id: "s1", group: "mix",
    plain: "用同一组音、同一调号的一对大小调，如 C 大调与 a 小调。",
    explain: "大调的 6 级就是关系小调的主音，小调的 3 级就是关系大调的主音。二者在网格上是同一个平行四边形，只是主音位置不同：C 在底边，A 在顶边。不算等音调，共有 12 对。\n\n关系调的和弦成员完全相同、互为正副，所以极易互相渗透：大调里连用 vi、ii、iii 会「走进小调」，小调里连用 III、VI、VII 又会透出大调的明亮。我国受苏联影响把它叫「平行大小调」，但英语的 parallel key 指同主音调，本书避免使用这个容易混淆的词。",
    analogy: "像同一套房子的两种家具摆法：房间、家具完全一样，客厅的中心从沙发换成了餐桌，整个家的气氛就变了。",
    book_example: { what: "《星语心愿》（a 小调）配的是 Am–Em–Am、F–G–Am，C 大调的 F、G、C 频繁出现。", point: "关系大小调交替，让歌曲忽明忽暗、婉转多情。" },
    misconception: "关系大小调不是同一个调：用的音一样，但主音和各音的地位不同，因此是两种调性。" },
  { id: "harmonic_minor", name_zh: "和声小调", name_en: "Harmonic minor", icon: "🗝️", section_id: "s2", group: "scale",
    plain: "把自然小调 7 级升高半音，人工造出导音，让属和弦重新有力。",
    explain: "a 和声小调把 G 升成 G♯：属和弦从 Em 变成大三和弦 E（V），7 级上出现减三和弦 G♯°（vii°），二者都强烈倾向主和弦，调性因此稳固。这个升号不写进调号，而用临时记号；必要时还会用还原号或重升号（如 g♯ 小调的 F𝄪）。\n\n副作用是 6、7 级之间出现增二度 F–G♯，听起来尖锐、带「异域味」。古典音乐的小调默认就是和声小调，即便旋律用自然小调，和弦也常用 V、V7。",
    analogy: "像给一支没有前锋的球队临时调来一名射手：进攻（属功能）立刻有了威胁，只是阵型（音阶）看起来有点别扭。",
    book_example: { what: "比较 Am–Dm–Em–Am 与 Am–Dm–E–Am。", point: "只升高一个音，属到主的推动力就回来了。" },
    misconception: "vii° 的根音 G♯ 比自然小调 VII 的 G 高半音，但它仍是调内和弦，级数一般不写升号。" },
  { id: "augmented_triad", name_zh: "增三和弦", name_en: "Augmented triad", icon: "➕", section_id: "s2", group: "chord",
    plain: "两个大三度叠成的三和弦，如 C–E–G♯，记作 C+。",
    explain: "和声小调 3 级上的和弦 C–E–G♯ 由两个大三度叠置，根音到五音是增五度，所以叫增三和弦，记 C+ 或 Caug。它不协和、有扩张感，在和声小调里只有属功能（III+），不像大调 iii 那样兼有主、属功能，传统上用得不多。\n\n与减三和弦类似，增三和弦的五音决定它的性格，不能省略；三音反倒可省。加上大七度就是增大七和弦 C+Δ。",
    analogy: "像一只吹得太满的气球：均匀、对称，却总让人担心下一秒要「啪」地释放。",
    book_example: { what: "a 和声小调的三和弦里，C 上的和弦变成 C+。", point: "升高导音不仅改了 V，也改了含 7 级音的 III。" },
    misconception: "增三和弦不是「大三和弦升一下根音」，而是把五音升高半音。" },
  { id: "diminished_seventh", name_zh: "减七和弦", name_en: "Diminished 7th chord", icon: "🌀", section_id: "s2", group: "chord",
    plain: "减三和弦再叠小三度：G♯–B–D–F，四个音把八度四等分。",
    explain: "和声小调导音上的七和弦是减减七和弦，简称减七和弦（G♯°7）。它含两对三全音，紧张、暗淡而神秘，属功能很强。同样因为升高了 7 级，和声小调的主七和弦变成小大七和弦 AmΔ，属七和弦恢复成和大调一样的 E7，3 级是增大七和弦 C+Δ。\n\n减七和弦效果太好，连大调都常借它代替调内的半减七和弦，以致「导七和弦」几乎默认就是减七。本书不建议把任何减七和弦都叫导七和弦，以免混淆。",
    analogy: "像一张四条腿一样长的方桌：完全对称，往哪个方向推都推得动——这也是它日后被大量用来转调的原因。",
    book_example: { what: "C 大调比较 Bø–C 与 B°7–C。", point: "B°7 的根音 B 从下、七音 A♭ 从上，两头逼近 C–G 纯五度，解决更迫切。" },
    misconception: "减七和弦不等于「导七和弦」：导七指建在导音上的七和弦，在大调里本来是半减七。" },
  { id: "melodic_minor", name_zh: "旋律小调与爵士小调", name_en: "Melodic / jazz minor", icon: "🎶", section_id: "s3", group: "scale",
    plain: "上行升高 6、7 级避开增二度，下行还原；爵士乐则上下行都升高。",
    explain: "为了既要导音、又不要增二度，旋律上行时把 6、7 级都升高（a 小调 F♯、G♯），下行不需要导向，便都还原成自然小调。这就是旋律小调，它传统上只管旋律，不推广到和声。\n\n爵士乐把上行形式固定下来，不论上下行都升 6、7 级，并用它构造和弦，称爵士小调。它也等于同主音大调只把 3 级降半音，于是 IV（D）、V（E）、IV7 等都与大调相同，主音上是小大七和弦 iΔ。",
    analogy: "像上坡时换低速挡、下坡时换回来：同一条路，上下行的「挡位」不一样。",
    book_example: { what: "《莫斯科郊外的晚上》d 小调前奏：B♮–C♯–D 上行进入主音。", point: "升高的 6、7 级只为旋律顺畅，这就是旋律小调。" },
    misconception: "旋律小调升高的 6 级与多利安六度听起来一样，但前者是为了上行到导音，后者常下行到 5 级，二者实质不同。" },
  { id: "harmonic_analysis", name_zh: "和声分析与移调", name_en: "Harmonic analysis & transposition", icon: "🔍", section_id: "s4", group: "analysis",
    plain: "定调与乐句 → 标级数 → 分析进行；移调后级数不变。",
    explain: "和声分析就是「读」别人的编配：先看拍子、调号和起止音确定调性（简谱写 1=C 却以 6 开头结尾，其实是 a 小调），再在和弦下方标级数，最后体会每处和弦选择的效果。五线谱没写和弦时，把同时或依次出现的音放到网格上，看它们围成什么三角形即可。\n\n移调就是 K 歌的「升降 Key」：整首歌平移到别的调，级数不变、音高全变。Am–Em–Am 上移两个半音成 Bm–F♯m–Bm，仍是 i–v–i。简谱是首调思维，移调只改调号；吉他用变调夹（Capo），夹几品就高几个半音。",
    analogy: "像读一篇文章时划出主谓宾：先找到主语（主音），再看每个句子（乐句）怎样起承转合。",
    book_example: { what: "《星语心愿》第一行：a: i–v–i–VI–VII–i–III–VII，同时可写成 6m–3m–6m–4–5–6m–1–5。", point: "两套级数各有拥护者，关键是事先约定、能互相换算。" },
    misconception: "简谱调号写着 1=C 不代表就是 C 大调，要看主音与终止。" },
  { id: "parallel_keys", name_zh: "同主音大小调", name_en: "Parallel keys", icon: "🪞", section_id: "s5", group: "mix",
    plain: "主音相同的一对大小调，如 C 大调与 c 小调；网格上上下相邻。",
    explain: "C 大调与 c 自然小调共有 C、D、F、G 四个音，只把 3、6、7 级的 E、A、B 降半音，就是 c 自然小调（1–2–♭3–4–5–♭6–♭7），调号多三个降号。和声小调只差 3、6 两级，爵士小调只差 3 级。\n\n在网格上，同主音大小调的平行四边形上下相邻、共用一条边。英语把它叫 parallel key，俄、德传统里的「平行调」却指关系调，所以本书叫它同名调或同主音调。",
    analogy: "像同一位歌手的「白天版」和「夜晚版」演唱：调门（主音）没变，换了几处音色就从晴转阴。",
    book_example: { what: "网格上 C 大调与 c 小调共用 F–C–G–D 这条边，A/E/B 与 A♭/E♭/B♭ 分居两侧。", point: "同主音调各音级一一对应，这是互相借和弦的基础。" },
    misconception: "同主音调与关系调是两种不同的关系：前者主音相同、音不同；后者音相同、主音不同。" },
  { id: "modal_mixture", name_zh: "调式交替与借用和弦", name_en: "Modal mixture / borrowed chords", icon: "🔄", section_id: "s5", group: "mix",
    plain: "从同主音的另一种调式里借和弦来用，级数相同、功能不变。",
    explain: "同名大小调相同级数的和弦可以互相替换，功能属性保持不变，这叫调式交替（modal interchange），借来的和弦叫借用和弦。大调借小调时主要借自然小调的 iv、v、ii°、♭III、♭VI、♭VII，导七和弦则借和声小调的减七和弦 vii°7。\n\n借用让和弦带上本调以外的半音，从此跳出「调内和弦」的自然音体系，进入半音体系（chromaticism）。iv 让大调突然「暗一下」，♭VI、♭VII 则带来意外的明亮；小调借大调则有多利安终止、皮卡第三度。",
    analogy: "像在白天的风景照里叠一层夜景滤镜：构图（功能）没变，只是某几块颜色换了。",
    book_example: { what: "《雪绒花》把 G、F 换成 Gm、Fm。", point: "小属、小下属和弦让大调旋律蒙上一层暗色。" },
    misconception: "借用不是转调：主音没变，只是临时换了同级和弦的颜色。" },
  { id: "flat_six_seven", name_zh: "♭VI–♭VII–I", name_en: "Aeolian cadence to major", icon: "🏆", section_id: "s5", group: "chord",
    plain: "借来的两个大三和弦依次上行全音，落到大主和弦，辉煌有胜利感。",
    explain: "♭VI、♭VII 是同主音小调的 VI、VII。♭VI 只有三音 1 在大调内，♭VII 相当于 vii° 根音降半音；它们色彩明亮，♭VI–I 有光明宏伟感，♭VII(7)–I 俗称后门进行。\n\n两者连用成 ♭VI–♭VII–I：三个大三和弦逐级上行一个全音，就是自然小调的伊奥里亚终止直接落到同主音大调主和弦，游戏胜利音乐常用，俗称「马力欧终止」。小调里同样手法写作 VI–VII–I。",
    analogy: "像爬楼梯最后三步：一步一个台阶往上，推开门是阳光。",
    book_example: { what: "书中比较 Am–B°–C 与 A♭–B♭–C；《我和你》片段结尾也用了 F–G（A 大调的 ♭VI–♭VII）。", point: "同样走到 C，借来的大三和弦让终止明亮得多。" },
    misconception: "♭VI、♭VII 不是「弹错的和弦」，而是从同主音小调借来的调外和弦。" },
  { id: "picardy_third", name_zh: "皮卡第三度", name_en: "Picardy third", icon: "☀️", section_id: "s6", group: "mix",
    plain: "小调乐曲结尾用大主和弦代替小主和弦。",
    explain: "小调借大调时，连主和弦都能直接换：Am–B°–Dm–E–A。这个办法中世纪就有了，叫皮卡第三度或皮卡第终止——当时人们觉得小三和弦不够纯净，以大三和弦结束才算圆满，有找到光明、获得救赎之感，巴赫作品里尤为常见。\n\n前面再用大三和弦预备，亮色更持久：F–G–A 就是小调的 VI–VII–I，相当于大调 ♭VI–♭VII–I 的小调版本。",
    analogy: "像一部压抑的电影最后一个镜头突然拉开窗帘：前面的阴暗都为这一刻的光做铺垫。",
    book_example: { what: "《Time after time》b 小调结尾 G–A–（Bsus）–B。", point: "VI–VII–I 让小调歌曲在结尾走入光明。" },
    misconception: "大调借小主和弦要谨慎（容易像转调），小调借大主和弦却可以不加预备直接用在终止上。" },
  { id: "dorian_cadence", name_zh: "多利安终止", name_en: "Dorian cadence", icon: "🏞️", section_id: "s6", group: "chord",
    plain: "小调里用大下属和弦 IV 回到小主和弦 i，带古老民歌味。",
    explain: "小调借同主音大调的 IV（a 小调的 D），IV–i 就叫多利安终止。IV 的三音是升高的 6 级（F♯），与主音构成大六度，叫多利安六度，是中古多利安调式的特征音，听起来古老而神秘。\n\n旋律里出现升高的 6 级时，用小下属 iv 会和旋律打架，提示改用 IV。多利安六度常下行大二度到 5 级；旋律小调的升 6 级则是为了上行到导音，二者不能混为一谈。",
    analogy: "像一首老歌里突然出现的一句方言：意思没变，口音一下把人带回很久以前。",
    book_example: { what: "《鲁冰花》（g 小调）旋律唱到 E♮，和弦配 C（IV）而不是 Cm。", point: "旋律里的多利安六度决定了必须用大下属和弦。" },
    misconception: "多利安六度不是旋律小调的升 6 级：一个常往下走，一个只往上走。" },
  { id: "mixture_system", name_zh: "交替大小调与调性扩张", name_en: "Major-minor mixture & tonal expansion", icon: "🌐", section_id: "s7", group: "mix",
    plain: "同主音大小调合为一体，T/t、S/s、D/d 自由混用，主音统辖的范围变大。",
    explain: "浪漫派以后，调式交替司空见惯，大调的 T、S、D 与小调的 t、s、d 功能组频繁混用，同主音大小调最终合成一个更广的调性——交替大小调体系。其中 T、t 最稳定，S、d 其次，s、D 最不稳定、动力最强。这种让主音控制更多音与和弦的思想叫调性扩张，后面的离调、半音化都是它的延续。\n\n把关系调和同名调连起来推，C→a→A→f♯→F♯（=G♭）→e♭→E♭→c→C 绕回原点：四个主音 C、E♭、F♯/G♭、A 正好是第 1 章的小三度循环。24 个大小调由此分成三组八调循环。和声大调、旋律大调等说法则只是交替的特例。",
    analogy: "像几个相邻的街区打通成一个商圈：店还是那些店，但顾客可以随意穿行，整个商圈的影响力就扩大了。",
    book_example: { what: "书中把 C 大调出发的八个关系调、同名调画在网格上，排成一条斜带。", point: "在五度圈上，这四个主音连成正方形。" },
    misconception: "调式交替不等于没有调性，主音反而管得更宽了。" },
  { id: "degree_schemes", name_zh: "小调的级数方案", name_en: "Minor-key numbering schemes", icon: "🔢", section_id: "s8", group: "analysis",
    plain: "固定、顺阶、自然（la 小调）、首调（do 小调）四种记法，各有用处。",
    explain: "以 d 自然小调为例：固定记法按实际音高写 2–3–4–5–6–♭7–1；顺阶记法以主音为 1 写 1–7（古典和声，「二元制」）；自然记法借关系大调写 6–7–1–2–3–4–5（简谱、流行和声）；首调记法借同主音大调写 1–2–♭3–4–5–♭6–♭7（爵士和声）。后两种都以大调为参照，属于「一元制」。\n\n本书小调默认用顺阶级数，讲借用时用以同主音大调为准的首调级数，并加「级」字；不带「级」的阿拉伯数字按简谱的自然记法理解。作者的态度很明确：符号只是代号，音与和弦的结构不会因为叫法而改变。",
    analogy: "像同一位老板在不同系统里的工号：叫 1 号还是 6 号都不影响他是老板。",
    book_example: { what: "书中把 d 自然小调四种方案画成四张网格让读者连线。", point: "无论数字怎么写，网格上用到的音和形状完全一样。" },
    misconception: "「主音唱 la 就没有稳定感」之类说法只是个人习惯，主音由音阶结构与和声体系决定，不由名字决定。" },
];

export const relations = [
  { from: "natural_minor", to: "relative_keys", label: "同一组音" },
  { from: "natural_minor", to: "harmonic_minor", label: "升高 7 级" },
  { from: "harmonic_minor", to: "melodic_minor", label: "再升 6 级" },
  { from: "harmonic_minor", to: "augmented_triad", label: "III+" },
  { from: "harmonic_minor", to: "diminished_seventh", label: "vii°7" },
  { from: "relative_keys", to: "harmonic_analysis", label: "分析中常见" },
  { from: "natural_minor", to: "parallel_keys", label: "降 3、6、7 级" },
  { from: "parallel_keys", to: "modal_mixture", label: "同级互换" },
  { from: "modal_mixture", to: "flat_six_seven", label: "借 VI、VII" },
  { from: "modal_mixture", to: "picardy_third", label: "借大主和弦" },
  { from: "modal_mixture", to: "dorian_cadence", label: "借 IV" },
  { from: "diminished_seventh", to: "modal_mixture", label: "被大调借用" },
  { from: "melodic_minor", to: "dorian_cadence", label: "形似实异" },
  { from: "modal_mixture", to: "mixture_system", label: "固定下来" },
  { from: "relative_keys", to: "mixture_system", label: "八调循环" },
  { from: "relative_keys", to: "degree_schemes", label: "自然记法" },
  { from: "parallel_keys", to: "degree_schemes", label: "首调记法" },
];

const sections = [
  { id: "s1", no: "3-1", title_zh: "自然小调与关系大小调", title_en: "Natural minor & relative keys", gist: "大调 6 级做主音：同一组音，换了领导。",
    summary: "以大调 6 级为主音得到自然小调，C 大调与 a 小调共用音和调号，是关系大小调。小调 7 级离主音一个全音，是下主音。自然小调三个特点：属功能组乏力（v 是小三和弦）、下属功能组强化（iv–i 比 v–i 更常用）、容易被关系大调渗透（VI–VII–i 伊奥里亚终止）。",
    concept_ids: ["natural_minor", "relative_keys"] },
  { id: "s2", no: "3-1", title_zh: "和声小调及其和弦", title_en: "Harmonic minor", gist: "升高 7 级：导音回来了，增二度也来了。",
    summary: "和声小调把 7 级升高半音，属和弦变为大三 V、导和弦变为减三 vii°，调性稳固；3 级出现增三和弦 III+。七和弦中，主七变小大七 iΔ，属七恢复 V7，导七成为减七和弦 vii°7。属七和弦可以同时通往大主和弦与小主和弦。",
    concept_ids: ["harmonic_minor", "augmented_triad", "diminished_seventh"] },
  { id: "s3", no: "3-1", title_zh: "旋律小调与爵士小调", title_en: "Melodic & jazz minor", gist: "上行升 6、7 级，下行还原；爵士乐则一律升高。",
    summary: "为避开增二度，旋律小调上行升高 6、7 级、下行还原为自然小调，传统上只管旋律。爵士乐不分上下行都升高，并据此构造和弦，称爵士小调。小调也不一定忧郁，深沉壮阔、慷慨激昂同样是它的拿手好戏。",
    concept_ids: ["melodic_minor"] },
  { id: "s4", no: "3-2", title_zh: "和声分析与小调进行", title_en: "Analysis & minor progressions", gist: "定调 → 标级数 → 分析；小调总是混合着用。",
    summary: "和声分析三步：确定节奏、调性与乐句；标出级数；分析进行的效果。移调后级数不变。实例显示：几种小调彼此融合（属组有 d、D 两套），大调套路都有小调版本，小调与关系大调频繁互相转换，以至「大小难辨」。",
    concept_ids: ["harmonic_analysis"] },
  { id: "s5", no: "3-3", title_zh: "大调的借用和弦", title_en: "Borrowed chords in major", gist: "从同主音小调借 iv、v、♭III、♭VI、♭VII……",
    summary: "同主音大小调上下相邻，相同级数的和弦可以互换，这叫调式交替。大调借小调：iv、v 带来暗色；同名主和弦可经 V7 切换；导七借减七和弦；ii° 更紧张，♭III、♭VI、♭VII 更明亮；♭VI–♭VII–I 有胜利感。借用引入了调外半音，即半音体系。",
    concept_ids: ["parallel_keys", "modal_mixture", "flat_six_seven"] },
  { id: "s6", no: "3-4", title_zh: "小调的借用和弦", title_en: "Borrowed chords in minor", gist: "多利安终止、皮卡第三度、连续小三和弦。",
    summary: "小调借同主音大调：借 V、vii° 其实就是和声小调；借 IV 成多利安终止，特征音是多利安六度；爵士小调可看作同时借了大调的属与下属。小调可直接借大主和弦作终止，即皮卡第三度。副三和弦借用还能做出全是小三和弦的卡农进行。",
    concept_ids: ["dorian_cadence", "picardy_third"] },
  { id: "s7", no: "3-4", title_zh: "交替大小调与调的循环", title_en: "Mixture system & key cycles", gist: "大小调合一，八个调连成小三度循环。",
    summary: "浪漫派以后，同主音大小调的 T/t、S/s、D/d 功能组自由混用，形成交替大小调体系，主音的控制范围扩大（调性扩张）。把关系调与同名调连起来推，C、E♭、F♯/G♭、A 四个主音上的八个调连成一个环——正是小三度循环；24 个调由此分成三组。",
    concept_ids: ["mixture_system"] },
  { id: "s8", no: "3-4", title_zh: "混乱的小调级数", title_en: "Numbering schemes for minor", gist: "固定、顺阶、自然、首调：符号不是本质。",
    summary: "小调的级数与唱名有四套方案：固定（按实际音高）、顺阶（主音为 1）、自然（借关系大调，主音为 6）、首调（借同主音大调，1–2–♭3…）。本书小调默认顺阶级数，借用时用首调级数。各方案没有绝对优劣，交流前约定清楚即可；网格图上调的形状不随记号改变。",
    concept_ids: ["degree_schemes"] },
];

const AM = [9, 11, 0, 2, 4, 5, 7];

export default function Chapter() {
  return <ChapterPage meta={meta} groups={groups} concepts={concepts} relations={relations}>
    <SoundBar />

    <Block id="hook" toc="开场">
      <Hook title="先听，再看"><p>
        先听两条音阶：<Play notes="C4 D4 E4 F4 G4 A4 B4 C5" melodic gap={0.3}>C 大调</Play>，
        再听 <Play notes="A3 B3 C4 D4 E4 F4 G4 A4" melodic gap={0.3}>a 小调</Play>。它们用的是<b>同一组白键</b>，一个明亮、一个暗淡。
        再听两条进行：<Play seq={["Am", "Dm", "Em", "Am"]} gap={0.9}>Am–Dm–Em–Am</Play> 与 <Play seq={["Am", "Dm", "E", "Am"]} gap={0.9}>Am–Dm–E–Am</Play>——
        只改了一个音（G → G♯），后者就有了「必须回家」的力量。最后听 <Play seq={["C", "F", "G", "C"]} gap={0.8}>C–F–G–C</Play> 和 <Play seq={["C", "Ab", "Bb", "C"]} gap={0.8}>C–A♭–B♭–C</Play>：
        后面这条用了两个「不属于 C 大调」的和弦，却像游戏通关一样辉煌。这一章就讲这些：小调为什么有三种，大小调之间怎样互相借和弦。</p>
      </Hook>
    </Block>

    <Block id="secs" toc="小节" kicker="原书结构" title="本章八个小节" lead="原书 3-1 至 3-4 四节，这里按主题拆成八张卡片。点卡片看要点。">
      <SectionCards sections={sections} />
    </Block>

    <Block id="flow" toc="主线" kicker="论证主线" title="从「换个主音」到「大小调合一」">
      <ArgumentFlow steps={[
        { claim: "大调 6 级做主音，就是自然小调", detail: "C 大调与 a 小调用同一组音——关系大小调。主音换了，各音的地位全变。" },
        { claim: "自然小调没有导音，属功能乏力", detail: "v 是小三和弦，推不动主音；下属功能反而加强，还容易被关系大调抢走调感。" },
        { claim: "升高 7 级：和声小调", detail: "V 变成大三和弦、vii° 变成减三和弦，属功能恢复；代价是增二度，副产品是增三和弦与减七和弦。" },
        { claim: "再升 6 级：旋律小调 / 爵士小调", detail: "上行时消除增二度；爵士乐把它固定下来并构造和弦。" },
        { claim: "实际音乐里，几种小调与关系大调总是混用", detail: "和声分析时会看到 d 与 D 两套属组、关系大小调频繁穿插。" },
        { claim: "同主音大小调上下相邻，可以互借同级和弦", detail: "这是调式交替：大调借 iv、♭VI、♭VII……小调借 IV、I……" },
        { claim: "借用把调外半音带了进来", detail: "从自然音体系走进半音体系：多利安终止、皮卡第三度、♭VI–♭VII–I。" },
        { claim: "同主音大小调最终合为一体", detail: "交替大小调体系扩张了主音的势力范围；关系调 + 同名调串成小三度循环。" },
        { claim: "记号只是记号", detail: "小调级数有四套方案，网格上调的形状却始终不变。" },
      ]} />
    </Block>

    <Block id="lab" toc="三种小调实验台" kicker="本章专属图解" title="三种小调实验台：同一个 A，四种颜色"
      lead="上方切换自然 / 和声 / 旋律（爵士）小调，再对照关系大调 C 与同主音大调 A。看金色交点（调内音）在网格上怎样变形，听音阶与七个调内和弦怎样变色。">
      <Narrate />
      <MinorLab />
      <p>试着这样玩：先在<b>自然小调</b>里听「基本进行」，再切到<b>和声小调</b>听同一条——只有 G 变成了 G♯，网格上右侧的一个交点挪了位置，属和弦从蓝（Em）变成了红（E）。
        切到<b>关系大调 C</b>：金色交点一个都没动，变的只是主音。切到<b>同主音大调 A</b>：三个交点（C♯、F♯、G♯）一起移动，和弦大小全部翻转——这就是后面「借用和弦」的仓库。</p>
    </Block>

    <Block id="natural" toc="自然小调" kicker="3-1 · 自然小调" title="自然小调：同一组音，换了主音">
      <Narrate />
      <p>以大调的 6 级为主音，就得到<C id="natural_minor">自然小调</C>：C 大调 C–D–E–F–G–A–B 从 A 开始排，就是 a 自然小调
        <Play notes="A3 B3 C4 D4 E4 F4 G4 A4" melodic gap={0.32}>A–B–C–D–E–F–G–A</Play>。两个调用的音、调号完全一样，互为<C id="relative_keys">关系大小调</C>（G 大调–e 小调、F 大调–d 小调……共 12 对）。</p>
      <Tonnetz cols={11} rows={5} center="C" notes={[0, 2, 4, 5, 7, 9, 11]} highlight={["C", "Am"]} unit={52}
        caption="金色交点是 C 大调 = a 自然小调的七个音：形状完全重合。C 大调主和弦（红）在底边，a 小调主和弦（蓝）在顶边。" />
      <p>小调的 1、4、5 级同样叫主音、下属音、属音；3、6 级仍叫中音、下中音，但与主音成小三度、小六度。最特别的是 7 级：
        <Play notes="B3 C4" melodic gap={0.5}>C 大调的 B→C</Play> 只差半音，是导音；<Play notes="G4 A4" melodic gap={0.5}>a 小调的 G→A</Play> 差一个全音，倾向弱得多，所以叫<b>下主音</b>。</p>
      <Callout tone="info" title="简谱怎么记小调">简谱参照关系大调，把小调主音记作 6（调号写 6=A），音阶写 6–7–1–2–3–4–5、唱 la–ti–do…，不用升降号就能体现小调结构——本书称之为<strong>自然记法</strong>。
        这时「1」不再是主音，「7」也不是导音。至于古典和声用的以主音为 1 的<strong>顺阶记法</strong>，以及另外两种方案，本章最后再细说。</Callout>
      <Progression title="a 自然小调的七个三和弦" chords={["Am", "B°", "C", "Dm", "Em", "F", "G"]} keyName="Am" beats={2}
        caption="正三和弦 i、iv、v 都是小三和弦（小写级数）；III、VI、VII 是大三和弦（大写）；ii° 是减三和弦。和弦与 C 大调完全相同，只是级数全换了。" />
      <h3>特点一：属功能组乏力</h3>
      <p>比较 <Play seq={["C", "F", "G", "C"]} gap={0.85}>C–F–G–C</Play> 与 <Play seq={["Am", "Dm", "Em", "Am"]} gap={0.85}>Am–Dm–Em–Am</Play>：小调版明显「软」。
        没有导音，v 是小三和弦，v–i 的趋向变弱；在主、属之间骑墙的 III 因为本身就是关系大调的 I，更偏向主功能；VII 与主和弦没有共同音，属功能还算纯粹，但 VII–III 连用就像关系大调的正格进行，会抢主音的风头。</p>
      <h3>特点二：下属功能组强化</h3>
      <p>iv、ii°、VI 都含 6 级音 F，它只比属音 E 高半音，倾向很强。于是 <Play seq={["Am", "Dm", "Am"]} gap={0.9}>iv–i</Play> 比 v–i 用得还多，t–d–s–t 这类「反功能」进行也常见；VI 也更偏下属。
        东欧、俄罗斯民族音乐常有这种色彩，可以看作中古伊奥里亚调式的遗存。</p>
      <h3>特点三：与关系大调互相渗透</h3>
      <p>大调连用 vi、ii、iii 会有「走进小调」的感觉；反过来，小调连用 III、VI、VII 也透出大调的明亮。VI–VII–i 叫<b>伊奥里亚终止</b>，比 iv–v–i 更辉煌，电影配乐常用。
        Adele《Rolling in the Deep》副歌就是 i–VII–VI–VII：</p>
      <Tabs tabs={[
        { label: "伊奥里亚终止 VI–VII–i", content: <Progression key="tp1" chords={["F", "G", "Am"]} keyName="Am" tonnetz={{ cols: 9, rows: 4, center: "C" }} caption="三个三和弦在网格上并排：从关系大调那一侧「爬」回 a 小调主和弦。" /> },
        { label: "比较 iv–v–i", content: <Progression key="tp2" chords={["Dm", "Em", "Am"]} keyName="Am" tonnetz={{ cols: 9, rows: 4, center: "C" }} caption="全是小三和弦，一贯暗淡，终止感也弱。" /> },
        { label: "i–VII–VI–VII", content: <Progression key="tp3" chords={["Cm", "B♭", "A♭", "B♭"]} keyName="Cm" loop texture="pop" bpm={104} caption="《Rolling in the Deep》副歌的循环（c 小调）。" /> },
      ]} />
      <Callout tone="key" title="自然小调的功能组（原书图 3.5）">
        s（下属）组：ii°、iv、VI　·　t（主）组：VI、i、III　·　d（属）组：III、v、VII。VI 横跨 s、t，III 横跨 t、d。<br />
        关系大小调再次说明：<strong>调性的实质是音与和弦之间的地位关系</strong>，同一组音、同一组和弦，地位不同就是不同的调，不能把调性简单等同于音阶。
      </Callout>
    </Block>

    <Block id="harmonic" toc="和声小调" kicker="3-1 · 和声小调及其和弦" title="和声小调：人工造一个导音">
      <Narrate />
      <p>为了救回属功能，西洋音乐把自然小调的 7 级升高半音，得到<C id="harmonic_minor">和声小调</C>：
        <Play notes="A3 B3 C4 D4 E4 F4 G#4 A4" melodic gap={0.32}>A–B–C–D–E–F–G♯–A</Play>。升号写成临时记号，不进调号；简谱写作 ♯5（唱「升 sol」或 si）。
        五线谱上要看情况用升号、还原号或重升号：g 小调 F→F♯，c 小调 B♭→B♮，g♯ 小调 F♯→F𝄪（虽与 G 等音，也不能写成 G）。</p>
      <p>升高的 7 级让导向感回来了；同时 6、7 级之间出现了<b>增二度</b> <Play notes="F4 G#4" melodic gap={0.5}>F–G♯</Play>，尖锐、带异域味——印度、西亚、西班牙和我国新疆音乐的音阶里常有它。</p>
      <Tonnetz cols={11} rows={5} center="A" spell="sharp" notes={[9, 11, 0, 2, 4, 5, 8]} highlight={["Am", "Dm", "E", "F"]} unit={52}
        caption="a 和声小调：G 换成 G♯，交点「跳」到右侧，E 变成红色大三和弦。" />
      <Progression title="a 和声小调的三和弦" chords={["Am", "B°", "C+", "Dm", "E", "F", "G♯°"]} roman={["i", "ii°", "III+", "iv", "V", "VI", "vii°"]} beats={2}
        caption="含 7 级音的 III、V、VII 三个和弦都变了：C+（增三）、E（大三）、G♯°（减三）。vii° 根音虽然比自然小调 VII 高半音，级数一般不加升号。" />
      <p>比较 <Play seq={["Am", "Dm", "Em", "Am"]} gap={0.85}>Am–Dm–Em–Am</Play> 与 <Play seq={["Am", "Dm", "E", "Am"]} gap={0.85}>Am–Dm–E–Am</Play>：V（E）和 vii°（G♯°）都强烈倾向主和弦，调性稳固多了。</p>
      <p>3 级上的 C–E–G♯ 是新面孔：两个大三度叠成，根音到五音是增五度，叫<C id="augmented_triad">增三和弦</C>，记 C+：
        <Play chord="Caug" arp={0.06}>C+</Play>。它不协和、有扩张感，在和声小调里只有属功能，传统上用得少；五音不能省，三音反而可省。</p>
      <Callout tone="info" title="小调的 3、5、7 级各有两个和弦">
        v（Em，自然小调的小属和弦）与 V（E，和声小调的大属和弦）；VII（G，下主和弦）与 vii°（G♯°，导和弦）；III（C）与 III+（C+）。
        古典和声的小调默认是和声小调，所以不特别说明时，小调的属、导和弦就是 V 与 vii°；3 级则反过来，自然小调的 III 用得更多。
        和声小调的功能组：s 组 ii°、iv、VI；t 组 VI、i；D 组 III+、V、vii°。
      </Callout>
      <h3>七和弦</h3>
      <p>Dm7、Bø、FΔ 三个与自然小调相同；含 7 级音的四个都变了：</p>
      <Progression chords={["AmM7", "Bø", "Dm7", "E7", "Fmaj7", "G♯°7"]} roman={["iΔ", "iiø7", "iv7", "V7", "VIΔ", "vii°7"]} beats={2} voicing="close"
        caption="主音上是小大七和弦 AmΔ（小三和弦 + 大七度）；属七恢复为 E7；导音上是减七和弦 G♯°7。3 级的增大七和弦 C+Δ（C–E–G♯–B，也记 CΔ♯5）可在上方实验台的「七和弦」里听。" />
      <p>3 级上的「增三和弦 + 大七度」叫增大七和弦：<Play notes="C4 E4 G#4 B4" arp={0.06}>C+Δ</Play>。</p>
      <p>导音上的 G♯–B–D–F 是减三和弦再叠小三度，根音到七音为减七度，叫<C id="diminished_seventh">减七和弦</C>：<Play notes="G#3 B3 D4 F4" arp={0.06}>G♯°7</Play>。
        它含两对三全音，紧张而神秘，属功能很强。比较一下半减七：<Play notes="B3 D4 F4 A4" arp={0.06}>Bø</Play>，它只是把七音再降半音。</p>
      <Callout tone="key" title="属七和弦的「三角关系」有了答案">
        属七和弦既是大调的 V7，也是同主音和声小调的 V7：<Play seq={["G7", "C"]} gap={1}>G7→C</Play> 与 <Play seq={["G7", "Cm"]} gap={1}>G7→Cm</Play> 都有属→主的感觉。
        所以单看一个属七（或属三、导三、导七）和弦，无法判断它要去大调还是小调。
      </Callout>
    </Block>

    <Block id="melodic" toc="旋律 / 爵士小调" kicker="3-1 · 旋律小调与爵士小调" title="旋律小调：上行和下行不一样">
      <Narrate />
      <p>欧洲人过去不喜欢增二度。折中办法是：上行时需要导音，就把 7 级连同 6 级一起升高；下行时不需要导向，就都还原。这就是<C id="melodic_minor">旋律小调</C>：</p>
      <Score abc={'A B c d e ^f ^g a | a =g =f e d c B A |]'} keySig="Am" meter="8/4" unit="1/4" tempo={120}
        caption="a 旋律小调：上行 F♯、G♯，下行还原为自然小调。" />
      <p>传统上这种调整只针对旋律。爵士乐则不论上下行都升高 6、7 级，并用它构造和弦，称<b>爵士小调</b>
        <Play notes="A3 B3 C4 D4 E4 F#4 G#4 A4" melodic gap={0.32}>A–B–C–D–E–F♯–G♯–A</Play>。它的和弦在 3-4 节「小调借大调」里再看（实验台里也可以先听）。</p>
      <p>《莫斯科郊外的晚上》d 小调版本的前奏就是一段教科书式的旋律小调：B♮–C♯ 一路升上主音 D，随后的下行又回到 B♭。</p>
      <Score abc={'"E7"=B2 "A7"^c2 | "Dm"e d A2- | A E2 D | "Gm"A G B2- | B z c B | "Dm"A2 G F | "A7"A2 G2 | "Dm"D4- | D z z2 |]'}
        keySig="Dm" meter="2/4" unit="1/8" tempo={84} caption="谱例 3.4《莫斯科郊外的晚上》前奏（d 小调，节选，只有旋律）。开头 B♮、C♯ 是升高的 6、7 级；原谱首个和弦也可用 G7（来自爵士小调）。" />
      <Callout tone="info" title="三种小调各音的趋向（原书图 3.13）">
        主音最稳定；5 级、3 级次之。自然小调的 ♭6 倾向下行到 5，♭7（下主音）倾向弱；和声小调的升 7 级强烈倾向主音；旋律小调升高的 6 级倾向上行到升 7。
      </Callout>
      <Callout tone="warn" title="小调不只会忧郁">
        小调种类多、变化音丰富，表现力反而比大调更有弹性：巴赫《d 小调托卡塔与赋格》、肖邦《革命练习曲》、电影《加勒比海盗》主题、《火影忍者》插曲《青鸟》……深沉壮阔、慷慨激昂，都是小调。
      </Callout>
    </Block>

    <Block id="analysis" toc="和声分析" kicker="3-2 · 和声分析与小调进行" title="和声分析：读懂别人的编配">
      <Narrate />
      <p>如果编配是写作，<C id="harmonic_analysis">和声分析</C>就是阅读。步骤三步：</p>
      <ol>
        <li><b>确定节奏、调性与乐句。</b>《星语心愿》简谱写 1=C、4/4 拍，可第一个音和最后一个音都是 6、和弦都是 Am——所以它是 a 小调，严谨的写法是 6=A。各乐句的结束音也会提示调性。</li>
        <li><b>标出和弦级数。</b>和弦字母写在谱上方，级数写在下方，开头注明调（「a:」）。</li>
        <li><b>分析和声进行。</b>体会每处和弦选择的效果。</li>
      </ol>
      <Score abc={'"Am"A3 c "Em"B A G A- | "Am"A E E4 A G | "F"A3 c "G"B c/B/ A B | "Am"c6 c d | "C"e e e e "G"d4 |]'}
        keySig="Am" unit="1/8" tempo={72} caption="谱例 3.1《星语心愿》第一行旋律（a 小调，只录音高与和弦记号）。" />
      <Progression title="第一行的级数：顺阶 / 纳什维尔（自然记法）" chords={["Am", "Em", "Am", "F", "G", "Am", "C", "G"]}
        roman={["i · 6m", "v · 3m", "i · 6m", "VI · 4", "VII · 5", "i · 6m", "III · 1", "VII · 5"]} beats={[2, 2, 4, 2, 2, 4, 2, 2]}
        caption="上面一行顺阶级数（主和弦为 i），下面一行是流行和声常用的纳什维尔数字，参照关系大调，小调主和弦记 6m。" />
      <p>前两句配的是 Am–Em–Am、F–G–Am。更「纯」的小调写法是 <Play seq={["Am", "Em", "Am", "Dm", "Em", "Am"]} gap={0.7}>Am–Em–Am、Dm–Em–Am</Play>；
        对比原版 <Play seq={["Am", "Em", "Am", "F", "G", "Am"]} gap={0.7}>Am–Em–Am、F–G–Am</Play>：F、G 是关系大调 C 的 IV、V，像一道光闪过又暗下去，更合歌曲的情绪。
        接下来甚至有 C–G（C 大调的 I–V）。这首歌里关系大小调的渗透比比皆是，a 小调自己的 Dm、Em 反而用得不多。</p>
      <h3>移调</h3>
      <p>K 歌的「升降 Key」，乐理上叫<b>移调</b>：整体平移到别的调，音之间的相对关系不变，所以级数不变。
        <Play seq={["Am", "Em", "Am"]} gap={0.8}>a 小调 Am–Em–Am</Play> 上移两个半音就是 <Play seq={["Bm", "F#m", "Bm"]} gap={0.8}>b 小调 Bm–F♯m–Bm</Play>，都是 i–v–i。
        简谱是首调思维，移调只改调号（6=A → 6=B）；五线谱则调号、所有音符都要改。钢琴移调要换指法；吉他可以换指型，也可以用<b>变调夹</b>：Capo=4 时按 C 和弦的指法，响的是 E。</p>
      <h3>五线谱：从音找和弦</h3>
      <p>钢琴谱通常不写和弦，要从音反推。《风中有朵雨做的云》调号两个降号，乐句多落在 D、G，结尾是 G——g 小调。
        第一小节旋律 D–G–G–D、伴奏 G–D–G–A–B♭，围成 G–B♭–D，即 Gm（i），A 暂视为和弦外音；第二小节前两拍旋律 F–G–F、伴奏 D–A–D，即 Dm（v）。伴奏把和弦音一个个依次弹出，叫<b>分解和弦</b>（第 9 章细讲）。</p>
      <Score abc={'"Gm"d g g d | "Dm"f g/f/ "Gm"g2 |]'} bass={'G,,/D,/G,/A,/ B,2 | D,/A,/ D G,,/D,/G,/A,/ |]'} keySig="Gm" tempo={76}
        caption="谱例 3.2《风中有朵雨做的云》开头两小节（大谱表，节选）。" />
      <Tonnetz cols={11} rows={5} center="G" notes={[7, 9, 10, 0, 2, 3, 5]} highlight={["Gm", "Cm", "Dm", "Eb", "F", "Bb"]} unit={50}
        caption="g 小调（自然）的音与三和弦。把谱上的音点亮，看它们落在哪个三角形里，和弦就找到了。" />
      <p>前两句的和弦合起来是两遍 <Play seq={["Gm", "Dm", "Gm"]} gap={0.8}>Gm–Dm–Gm</Play>（i–v–i）。第二句也可以转向关系大调：
        <Play seq={["Gm", "F", "Bb"]} gap={0.8}>Gm–F–B♭</Play> 或 <Play seq={["Eb", "F", "Bb"]} gap={0.8}>E♭–F–B♭</Play>，你更喜欢哪种？
        谱中还有两处 D7——不是 g 自然小调的和弦，而是和声小调的属七：<Play seq={["Cm", "D7", "Gm"]} gap={0.85}>Cm–D7–Gm</Play> 对比 <Play seq={["Cm", "Dm7", "Gm"]} gap={0.85}>Cm–Dm7–Gm</Play>。
        看似自然小调的旋律，也可以用和声小调的 V、V7，尤其在高潮处。</p>
      <Callout tone="info" title="吉他谱">《追梦人》等歌曲的吉他六线谱（Tablature）对应六根弦、直接指示指法，通常写明和弦，不弹吉他也能参考；注意「Capo=X」表示实际音高比谱面高 X 个半音。</Callout>
    </Block>

    <Block id="minorprog" toc="小调和声的特点" kicker="3-2 · 小调和声的特点" title="小调：总是混合着用">
      <Narrate />
      <p>从这些实例可以总结出小调和声的三个要点。</p>
      <p><b>1. 几种小调彼此融合。</b>属和声组因此有两套：自然小调的 d 组（III、v、VII）与和声小调的 D 组（III+、V、vii°）。D 组张力更强，但「古典」「西洋」味较重，用于流行、民族风格要小心。旋律小调这里暂只当旋律现象。</p>
      <p><b>2. 功能组循环与大调相通，大调套路都有小调版。</b>点开听：</p>
      <Tabs tabs={[
        { label: "小调终止", content: <Progression key="tp4" chords={["Am", "Dm", "E7", "Am"]} keyName="Am" caption="iv–V7–i，即大调 IV–V7–I 的小调版；V7 也可换成较柔和的 v7（Em7）。" /> },
        { label: "阻碍终止", content: <Progression key="tp5" chords={["Am", "Dm", "E7", "F"]} keyName="Am" caption="V7–VI：本该回到 i，却落到了 VI。" /> },
        { label: "小调 2-5-1", content: <Progression key="tp6" chords={["Bø", "E7", "Am"]} keyName="Am" caption="iiø7–V7–i：爵士里最常见的小调终止。" /> },
        { label: "小调卡农", content: <Progression key="tp7" chords={["Am", "Em", "F", "C", "Dm", "Am", "B°", "E"]} keyName="Am" roman={["i", "v", "VI", "III", "iv", "i", "ii°", "V"]} loop
          caption="i–v–VI–III–iv–i–ii°–V（最后也可用 v）。《天空之城》主题曲《伴随着你》用了这条进行。" /> },
        { label: "调内五度圈", content: <Progression key="tp8" chords={["Am", "Dm", "G", "C", "F", "B°", "E", "Am"]} keyName="Am" tonnetz={{ cols: 10, rows: 5, center: "C" }}
          caption="i–iv–VII–III–VI–ii°–V–i：根音一路下行纯五度，在网格上是一条向左的路线。" /> },
      ]} />
      <p><b>3. 小调与关系大调融合，经常互相转换。</b>大调连用 vi、ii、iii 就要考虑是不是转到了关系小调；若出现调外的 ♯5、III 大三和弦或 III7，多半是转到了关系<b>和声</b>小调。
        反过来，小调 i 后面接 iv–VII–III 或 VI–VII–III，就成了关系大调的 vi–ii–V–I、vi–IV–V–I，大调感迅速建立。</p>
      <Progression title="大小难辨：《Viva la Vida》式循环" chords={["D♭", "E♭", "A♭", "Fm"]} keyName="Fm" loop bpm={120} texture="pop"
        caption="按 f 小调是 VI–VII–III–i；可这里没有 f 小调的属和弦，正三和弦又全是 A♭ 大调的，于是也可听成 A♭ 大调的 IV–V–I–vi——大调进行停在 vi。" />
      <Progression chords={["D♭", "E♭", "Cm", "Fm"]} keyName="Fm" bpm={120} texture="pop"
        caption="最后把 A♭ 换成 Cm：f 小调的 VI–VII–v–i 出现了（较弱的）属和弦，小调感明显起来；再把 Cm 换成 C 或 C7，调性就更稳。" />
      <p>所以流行和声干脆让关系大小调合用一套级数：以大调为准，小调主音记 6、主和弦记 vi。站在 C 大调看，它与 a 的三种小调交融在网格上占了一大片（原书图 3.17）：</p>
      <Tonnetz cols={11} rows={5} center="C" spell="sharp" notes={[0, 2, 4, 5, 7, 9, 11, 6, 8]} highlight={["C", "F", "G", "Am", "Dm", "Em", "E", "D"]} unit={50}
        caption="C 大调七个音，加上 a 和声 / 旋律小调的 G♯、F♯：E（III，指向关系小调的属和弦）、D（a 爵士小调的 IV）都进来了。" />
      <Callout tone="key" title="大小调不是非此即彼">关系大调与三种小调之间经常「串门」。除此之外，大小调之间还有另一种重要联系——同主音调之间的调式交替，下一节开始讲。</Callout>
    </Block>

    <Block id="borrowmaj" toc="大调借小调" kicker="3-3 · 大调的借用和弦" title="大调向同主音小调借和弦">
      <Narrate />
      <p>主音相同的大小调叫<C id="parallel_keys">同主音调</C>（同名调），如 C 大调与 c 小调。从 C 大调到 c 自然小调，只要把 3、6、7 级 E、A、B 降成 E♭、A♭、B♭：
        <Play notes="C4 D4 E4 F4 G4 A4 B4 C5" melodic gap={0.28}>C 大调</Play> → <Play notes="C4 D4 Eb4 F4 G4 Ab4 Bb4 C5" melodic gap={0.28}>c 自然小调</Play>，即 1–2–♭3–4–5–♭6–♭7，调号多三个降号。
        和声小调 7 级不降，只差 3、6 两级；爵士小调只差 3 级。网上那些「把欢快歌曲转小调」的视频，用的就是这个关系。</p>
      <Tabs tabs={[
        { label: "C 大调", content: <Tonnetz cols={11} rows={5} center="C" notes={[0, 2, 4, 5, 7, 9, 11]} highlight={["C", "F", "G"]} unit={50} caption="C 大调：正三和弦 F、C、G 并排在上。" /> },
        { label: "c 自然小调", content: <Tonnetz cols={11} rows={5} center="C" notes={[0, 2, 3, 5, 7, 8, 10]} highlight={["Cm", "Fm", "Gm"]} unit={50} caption="c 自然小调：正三和弦 Fm、Cm、Gm 并排在下。" /> },
        { label: "两调叠在一起", content: <Tonnetz cols={11} rows={5} center="C" notes={[0, 2, 3, 4, 5, 7, 8, 9, 10, 11]} highlight={["C", "F", "G", "Cm", "Fm", "Gm"]} unit={50} caption="同主音大小调上下相邻，共用 F–C–G–D 一条边：上方红色是大调正三和弦，下方蓝色是小调正三和弦。" /> },
      ]} />
      <p>同名大小调相同级数的和弦可以互相替换，功能不变，这叫<C id="modal_mixture">调式交替</C>，借来的和弦叫借用和弦。本节以大调为中心，级数以大调为准（♭III、♭VI、♭VII……），主要从自然小调借。</p>
      <Callout tone="warn" title="关于「平行调」">英语的 parallel key 指同主音调；可我国教材沿袭俄、德传统，「平行调」指的是关系调。为避免歧义，本书不用这个词。</Callout>

      <h3>属、下属和弦的借用：iv 与 v</h3>
      <p>c 小调的 i、iv、v 是 Cm、Fm、Gm。成对听：</p>
      <ul>
        <li><Play seq={["C", "F", "C"]} gap={0.8}>C–F–C</Play> vs <Play seq={["C", "Fm", "C"]} gap={0.8}>C–Fm–C</Play></li>
        <li><Play seq={["C", "G", "C"]} gap={0.8}>C–G–C</Play> vs <Play seq={["C", "Gm", "C"]} gap={0.8}>C–Gm–C</Play></li>
        <li><Play seq={["C", "F", "G7", "C"]} gap={0.8}>C–F–G7–C</Play> vs <Play seq={["C", "Fm", "Gm7", "C"]} gap={0.8}>C–Fm–Gm7–C</Play></li>
        <li>先后出现：<Play seq={["C", "F", "Fm", "C"]} gap={0.8}>C–F–Fm–C</Play>、<Play seq={["C", "Gm", "G", "C"]} gap={0.8}>C–Gm–G–C</Play></li>
      </ul>
      <Toggle options={["借用版（Gm、Fm）", "全用大三和弦（G、F）"]}>{v => v === 0
        ? <Score abc={'"C"E2 G | "Gm"d3 | "Am"c2 G | "Fm"F3 | "C"E2 G | "G7"G A B | "Fm"c3 | "C"c3 |]'} bass={'[C,E,G,]3 | [G,,_B,,D,]3 | [A,,C,E,]3 | [F,,_A,,C,]3 | [C,E,G,]3 | [G,,B,,F,]3 | [F,,_A,,C,]3 | [C,E,G,]3 |]'}
            meter="3/4" tempo={88} caption="谱例 3.5《雪绒花》（C 大调）开头八小节，原书标红的 Gm、Fm 是小属、小下属和弦。" />
        : <Score abc={'"C"E2 G | "G"d3 | "Am"c2 G | "F"F3 | "C"E2 G | "G7"G A B | "F"c3 | "C"c3 |]'} bass={'[C,E,G,]3 | [G,,B,,D,]3 | [A,,C,E,]3 | [F,,A,,C,]3 | [C,E,G,]3 | [G,,B,,F,]3 | [F,,A,,C,]3 | [C,E,G,]3 |]'}
            meter="3/4" tempo={88} caption="同一段旋律，改回调内的 G、F：明亮，但少了那层回忆般的暗色。" />}
      </Toggle>
      <p>注意结尾 G7 之后接了 Fm——传统和声禁止的「属→下属」反功能进行，听起来真的不好吗？周杰伦《菊花台》、水木年华《一生有你》临近结尾也都在 iv 上停留片刻，
        产生突然悬停、情感沉淀的效果，坊间俗称「刹车和弦」（并非学术概念）；原理仍是紧张感与解决期待的积累。</p>
      <p>功能上也有差别。<b>v</b> 的三音从导音 B 变成下主音 B♭，<Play seq={["Gm", "C"]} gap={1}>v–I</Play> 比 <Play seq={["G", "C"]} gap={1}>V–I</Play> 柔和得多——把大调 7 级降半音正是中古<b>混合利底亚调式</b>的特征，v 也带这种色彩。
        <b>iv</b> 则相反：三音 A♭ 只比 G 高半音、根音 F 只比 E 高半音，两股力量一起推，<Play seq={["Fm", "C"]} gap={1}>iv–I</Play> 叫<b>小变格终止</b>，用于终止、阻碍或补充终止都好，还能在一片大调色彩里突然「暗一下」。</p>

      <h3>同名主和弦的切换</h3>
      <p>属七和弦同时属于大调和同名和声小调，是两个主和弦之间的天然桥梁：</p>
      <Tabs tabs={[
        { label: "经过 V7", content: <Progression key="tp9" chords={["C", "G7", "Cm", "G7", "C"]} keyName="C" caption="C–G7–Cm–G7–C：同一个 G7，一次去大主和弦、一次去小主和弦。" /> },
        { label: "终止到小主", content: <Progression key="tp10" chords={["C", "Em7", "F", "G7", "Cm"]} keyName="C" caption="C–Em7–F–G7–Cm：一路大调，最后落在 Cm。" /> },
        { label: "经过 V / vii°", content: <Progression key="tp11" chords={["C", "G", "Cm", "G", "C", "B°", "Cm", "B°", "C"]} keyName="C" beats={2} caption="V 和 vii° 都是 V7 的一部分，同样能沟通大小主和弦。" /> },
        { label: "经过 IV", content: <Progression key="tp12" chords={["C", "F", "Cm", "F", "C"]} keyName="C" caption="变格进行也行：C–F–Cm–F–C。" /> },
      ]} />
      <p>主和弦是大调最稳定的核心，用 i 替换 I 容易让调感滑向小调。所以除非要转调，借小主和弦一般不放在终止式里，而是放在乐句中间做临时的色彩变化（还可以用 i7 进一步降低稳定性）。
        2008 北京奥运会主题曲《我和你》（A 大调）第二小节就借了 Am：</p>
      <Progression title="谱例 3.6《我和你》片段（A 大调）" chords={["D", "A", "D", "Am", "F♯m", "B7", "E", "A", "Aaug", "D", "F♯m", "B7", "E", "F", "G", "A"]} keyName="A"
        beats={[2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4]}
        caption="Am 是借来的 i；结尾 F–G 是 ♭VI–♭VII（下面马上讲），旋律此时停在主音 A 上，最后的 A 是为了听完整而补的。B7 见第 4 章，A+ 见第 5 章。" />

      <h3>导七和弦：借和声小调的减七</h3>
      <p>大调借用以自然小调为主，导七和弦是例外：C 大调调内是半减七 Bø，c 和声小调导音上是减七 B°7。比较 <Play seq={["Bø", "C"]} gap={1}>Bø–C</Play> 与 <Play seq={["B°7", "C"]} gap={1}>B°7–C</Play>：
        B°7 有两对三全音（B–F、D–A♭），根音 B 从下方、七音 A♭ 从上方夹住 C–G，倾向更强。加上减七和弦的对称性日后大有用处，大调里默认的导七和弦几乎就是减七了。</p>
      <p>借用和弦带来调外半音，要留意与旋律的配合：旋律是 A 时配 Fm，A 与 A♭ 只差半音，很刺耳——
        <Play notes="F3 C4 Ab3 A4" arp={0.03}>旋律 A + Fm</Play> vs <Play notes="F3 C4 A3 A4" arp={0.03}>旋律 A + F</Play>。不协和不一定不好，需要制造冲突时它反而出彩。
        因为 iv 和 vii°7 都含 ♭6，有人提出把 ♭6 固定下来，叫<b>和声大调</b> <Play notes="C4 D4 E4 F4 G4 Ab4 B4 C5" melodic gap={0.28}>C–D–E–F–G–A♭–B–C</Play>；是否必要有争议，本书暂视为调式交替的特例。</p>

      <h3>副三和弦的借用</h3>
      <p>对应关系（C 大调 → c 小调）：Dm → D°，Em → E♭，Am → A♭，B° → B♭。</p>
      <ul>
        <li><b>ii → ii°</b>：只把五音降半音，根音、三音不变。<Play seq={["Dm7", "G7", "C"]} gap={0.85}>Dm7–G7–C</Play> vs <Play seq={["Dø", "G7", "C"]} gap={0.85}>Dø–G7–C</Play>：更紧张、更暗，解决更迫切，流行与爵士常用；同理还有 IV–iiø7–I。</li>
        <li><b>iii → ♭III</b>：只有五音 G 是调内音，多在旋律为 5 时用；新奇的色彩，可代替属和弦：
          <Play seq={["C", "G7", "C"]} gap={0.8}>C–G7–C</Play> vs <Play seq={["C", "Em7", "C"]} gap={0.8}>C–Em7–C</Play> vs <Play seq={["C", "Ebmaj7", "C"]} gap={0.8}>C–E♭Δ–C</Play>；
          也可插进正格进行：<Play seq={["C", "Eb", "G"]} gap={0.8}>I–♭III–V</Play>、<Play seq={["Eb", "G7", "C"]} gap={0.8}>♭III–V7–I</Play>。
          只把 E 降成 E♭、其余不动，则 Em 变成增三和弦 E♭+（「单音」借用）。</li>
        <li><b>vi → ♭VI</b>：只有三音 C 是调内音，多在旋律为 1 时用；放在主和弦前光明宏伟，也可代替 vi 做阻碍终止：
          <Play seq={["G7", "C"]} gap={0.9}>G7–C</Play> vs <Play seq={["G7", "Abmaj7", "C"]} gap={0.9}>G7–A♭Δ–C</Play>；<Play seq={["G7", "Am7"]} gap={0.9}>G7–Am7</Play> vs <Play seq={["G7", "Abmaj7"]} gap={0.9}>G7–A♭Δ</Play>。
          ♭VI 与 vi、♭III 与 iii 都只有三音相同，在网格上上下相抵，叫<b>同中音关系</b>，这种替换叫同中音替换。</li>
        <li><b>vii° → ♭VII</b>：根音降成 B♭，从紧张的减三变成协和的大三，导音消失、属功能削弱，却明亮积极（也带混合利底亚色彩）：
          <Play seq={["G", "B°", "C"]} gap={0.8}>G–B°–C</Play> vs <Play seq={["G", "Bb", "C"]} gap={0.8}>G–B♭–C</Play>。
          ♭VII 还能直接替代属和弦（俗称「降七代五」）；加小调的 ♭6 成 B♭7，<Play seq={["F", "Bb7", "C"]} gap={0.85}>♭VII7–I</Play> 俗称<b>后门进行</b>，前面可接 IV、iv7、ii7。</li>
      </ul>
      <Tabs tabs={[
        { label: "♭VI–♭VII–I", content: <Progression key="tp13" chords={["A♭", "B♭", "C"]} keyName="C" tonnetz={{ cols: 10, rows: 5, center: "C" }}
          caption="三个大三和弦逐个上行全音——自然小调的伊奥里亚终止直接落到同主音大调主和弦，俗称「马力欧终止」。" /> },
        { label: "对比 vi–vii°–I", content: <Progression key="tp14" chords={["Am", "B°", "C"]} keyName="C" tonnetz={{ cols: 10, rows: 5, center: "C" }} caption="调内版本：同样上行到 C，色彩平淡得多。" /> },
        { label: "♭III–♭VII–I", content: <Progression key="tp15" chords={["E♭", "B♭", "C"]} keyName="C" caption="♭VII 前加下方五度的 ♭III。" /> },
        { label: "全是大三和弦", content: <Progression key="tp16" chords={["E♭", "F", "G", "A♭", "B♭", "C"]} keyName="C" caption="iii–IV–V–vi–vii°–I 借用成 ♭III–IV–V–♭VI–♭VII–I，整体特别明亮。" /> },
      ]} />
      <p>通过副三和弦的借用，也可以在同名大小调之间穿梭：</p>
      <Tabs tabs={[
        { label: "i–♭VI–iv–V7–I", content: <Progression key="tp17" chords={["Cm", "A♭", "Fm", "G7", "C"]} keyName="C" caption="从小调出发，回到大调主和弦。" /> },
        { label: "I–IV–♭VI–i", content: <Progression key="tp18" chords={["C", "F", "A♭", "Cm"]} keyName="C" caption="从大调出发，落到小调主和弦。" /> },
        { label: "i–♭VII–IV–I", content: <Progression key="tp19" chords={["Cm", "B♭", "F", "C"]} keyName="C" /> },
        { label: "I–ii–♭VII–♭III–i", content: <Progression key="tp20" chords={["C", "Dm", "B♭", "E♭", "Cm"]} keyName="C" /> },
      ]} />
      <p><C id="flat_six_seven">♭VI–♭VII–I</C> 在游戏胜利音乐（超级马里奥、最终幻想）里耳熟能详；电视剧《北京人在纽约》主题曲《千万次的问》也以它开头、收尾。再看两个实例：</p>
      <Progression title="谱例 3.7《爱丽丝主题》（《最终幻想 7》，D 大调）" chords={["D", "Am/E", "D", "Am/E", "D", "Am", "B♭", "Gm", "D"]} keyName="D"
        beats={[4, 4, 4, 4, 4, 4, 4, 4, 4]} bpm={72} texture="arp"
        caption="除主和弦 D 外几乎都是同主音 d 小调的和弦：v（Am）、♭VI（B♭）、iv（Gm），温柔而感伤。" />
      <Progression title="谱例 3.8《十年》副歌片段（A♭ 大调）" chords={["A♭", "E♭", "D♭", "A♭", "B♭m7", "G♭", "C7", "E♭7", "A♭", "E♭", "Fm", "D♭", "D♭m", "C7", "Fm"]} keyName="Ab"
        beats={[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2]} bpm={76}
        caption="主歌在 f 小调，这里转到关系大调 A♭，又穿插关系小调 f 小调（C7–Fm）与同名小调 a♭ 小调的和弦：iv（D♭m）与 ♭VII（G♭）。" />
      <Callout tone="key" title="从自然音体系到半音体系">
        此前我们讲的都是<strong>调内和弦</strong>（diatonic chord，顺阶和弦），和弦音全在一个调内。借用和弦带进了调外的半音，形成<strong>半音体系</strong>（chromaticism，本意「色彩」）——
        它是替换、延伸之外的第三种和声变化法。大调借小调，古典理论叫「交替大–小调」。
      </Callout>
    </Block>

    <Block id="borrowmin" toc="小调借大调" kicker="3-4 · 小调的借用和弦" title="小调向同主音大调借和弦">
      <Narrate />
      <p>反过来，从 a 自然小调到 A 大调，要把 3、6、7 级 C、F、G 升成 C♯、F♯、G♯：按顺阶级数是 1–2–♯3–4–5–♯6–♯7，按简谱自然记法是 6–7–♯1–2–3–♯4–♯5。
        所以简谱小调里出现 ♯1、♯4、♯5，就要想到可能交替到了大调。同名大调的调号比小调多三个升号。本节级数以小调为准。</p>
      <Tonnetz cols={11} rows={5} center="A" spell="sharp" highlight={["A", "D", "E", "Am", "Dm", "Em"]} unit={52}
        caption="a 小调与 A 大调同样上下相邻：上排红色 D、A、E 是 A 大调正三和弦，下排蓝色 Dm、Am、Em 是 a 小调正三和弦。" />
      <h3>属、下属和弦的借用</h3>
      <p>小调借大属和弦 V、导和弦 vii°，其实就是和声小调——当初正是因为借得太频繁，才把它固定成一种小调；而和声小调的 vii°7 又反过来被大调借走。</p>
      <p>借下属和弦更有特色：<Play seq={["Am", "D", "Am"]} gap={0.9}>IV–i</Play>（对比 <Play seq={["Am", "Dm", "Am"]} gap={0.9}>iv–i</Play>）叫<C id="dorian_cadence">多利安终止</C>。
        D 和弦的三音 F♯ 与主音 A 成大六度，叫<b>多利安六度</b>，是中古多利安调式的特征音，古老、神秘，有民歌风。</p>
      <Score abc={'"Gm"g2 g g d2 g2 | "C"=e d c e "Gm"d4 | "Eb"B B2 c "Bb"d2 f2 | "C"g3 =e "D"d4 |]'}
        bass={'[G,,D,B,]8 | [C,=E,G,]4 [G,,D,B,]4 | [E,,B,,G,]3 [B,,F,D,]5 | [C,=E,G,]4 [D,^F,A,]4 |]'}
        keySig="Gm" unit="1/8" tempo={76} caption="谱例 3.9《鲁冰花》（g 小调）开头四小节：旋律唱到 E♮（升高的 6 级），配 C（IV）而不是 Cm——用 iv 会与旋律打架。" />
      <Progression title="谱例 3.9《橄榄树》（b 小调）的和弦" chords={["Bm", "E", "Bm", "Bm", "E", "G", "D", "Bm", "Bm", "E", "Bm", "E", "G", "F♯7", "Bm"]} keyName="Bm"
        beats={[2, 2, 4, 2, 2, 4, 2, 2, 2, 2, 4, 4, 4, 4, 4]} bpm={88}
        caption="E 是 b 小调的 IV（三音 G♯ 即多利安六度），反复出现的 IV–i 就是多利安终止。" />
      <p>想一想：《鲁冰花》里第一次用了大属和弦 D，后面却用了小属和弦 Dm，换成 D 效果会怎样？类似色彩的歌还有《滚滚红尘》《相思》和英国民歌《斯卡布罗集市》。</p>
      <Callout tone="warn" title="多利安六度 ≠ 旋律小调的升 6 级">两者音高一样，但旋律小调升 6 级是为了消除增二度、只在 6→7 上行时用；多利安六度常下行大二度到 5 级。</Callout>
      <p>近现代的爵士小调已经有了和声意义，可以理解成小调同时借了大调的属与下属：<Play seq={["Am", "D", "E", "Am"]} gap={0.85}>i–IV–V–i</Play>。
        它等于同主音大调只把 3 级降半音，所以多数和弦与大调相同（V7、viiø7、ii7），只有含 3 级的变了：主音上是 i 与小大七 iΔ，下属音上是 IV7——调内除 V7 外的第二个属七型和弦。</p>
      <Progression title="a 爵士小调的七和弦（III+Δ 即 C+Δ，见实验台）" chords={["AmM7", "Bm7", "D7", "E7", "F♯ø", "G♯ø"]} roman={["iΔ", "ii7", "IV7", "V7", "viø7", "viiø7"]} beats={2} voicing="close" />

      <h3>主和弦与皮卡第三度</h3>
      <p>大调借小主和弦要谨慎，小调却可以毫无预备地直接换成大主和弦：
        <Play seq={["Am", "B°", "Dm", "E", "Am"]} gap={0.75}>…E–Am</Play> vs <Play seq={["Am", "B°", "Dm", "E", "A"]} gap={0.75}>…E–A</Play>。
        小调终止用 I 代替 i，叫<C id="picardy_third">皮卡第三度</C>（皮卡第终止）。中世纪宗教音乐认为小三和弦不够纯净，结尾跳到大三和弦才算圆满，有获得救赎之感——巴赫的小调作品结尾常这样；拉赫玛尼诺夫也爱在深沉的小调后突然落到庄严的大和弦。</p>
      <p>大主和弦前再用大三和弦预备，亮色更持久：<Play seq={["Dm", "E", "Am"]} gap={0.85}>Dm–E–Am</Play> vs <Play seq={["F", "G", "Am"]} gap={0.85}>F–G–Am</Play> vs <Play seq={["F", "G", "A"]} gap={0.85}>F–G–A</Play>。
        VI–VII–I 正是上一节 ♭VI–♭VII–I 的小调版本。</p>
      <Progression title="谱例 3.10《Time after time ~花舞う街で~》结尾（b 小调）" chords={["G", "A", "Bsus4", "B"]} keyName="Bm" beats={[4, 4, 4, 4]} bpm={70}
        caption="VI–VII–(Isus4)–I：小调歌曲结尾走入光明。Bsus 用纯四度 E 代替三音（挂留和弦，见第 7 章），是从 A 到 B 的过渡。也可把 G、A 换成 E、F♯，成 B 大调的 IV–V–I。" />

      <h3>副三和弦的借用</h3>
      <p>对应关系（a 小调 → A 大调）：B° → Bm，F → F♯m，C（或 C+）→ C♯m，G → G♯°。试试这些替换：</p>
      <Tabs tabs={[
        { label: "阻碍终止", content: <Progression key="tp21" chords={["E7", "C", "Am", "E7", "C♯m", "Am"]} roman={["V7", "III", "i", "V7", "♯iii", "i"]} keyName="Am" caption="E7–C–Am vs E7–C♯m–Am。" /> },
        { label: "VI–VII–i → ♯vi–vii°–i", content: <Progression key="tp22" chords={["F", "G", "Am", "F♯m", "G♯°", "Am"]} roman={["VI", "VII", "i", "♯vi", "vii°", "i"]} caption="F–G–Am vs F♯m–G♯°–Am。" /> },
        { label: "全是小三和弦的卡农", content: <Progression key="tp23" chords={["Am", "Em", "F♯m", "C♯m", "Dm", "Am", "Bm", "Em"]} roman={["i", "v", "♯vi", "♯iii", "iv", "i", "ii", "v"]} loop
          caption="大调能借出一串大三和弦，小调同样能借出一串小三和弦：i–v–♯vi–♯iii–iv–i–ii–v。" /> },
      ]} />
    </Block>

    <Block id="system" toc="交替大小调" kicker="3-4 · 交替大小调体系 · 调的循环" title="大小调合一，八调成环">
      <Narrate />
      <p>和弦借用一直在发展：自然小调借大调的属和声，先固定成了和声小调；从浪漫乐派开始，调式交替司空见惯，大调的 T、S、D 与小调的 t、s、d 频繁混用，同主音大小调终于合为一体——
        <C id="mixture_system">交替大小调体系</C>。T、t 组最稳定，S、d 组其次，s、D 组最不稳定、动力最强；三组仍按 T→S→D→T 的方向循环。舒伯特的艺术歌曲《小夜曲》是大小调交替的经典，听听它何时大、何时小。</p>
      <CompareTable left="大调组（T / S / D）" right="小调组（t / s / d）" rows={[
        { aspect: "主功能", left: "I（C）——最稳定", right: "i（Cm）——同样稳定，色彩暗" },
        { aspect: "下属功能", left: "IV（F）、ii——较稳", right: "iv（Fm）、ii°、♭VI——有 ♭6→5 的半音倾向，动力强" },
        { aspect: "属功能", left: "V（G）、vii°——含导音，动力最强", right: "v（Gm）、♭VII、♭III——无导音，较柔和" },
      ]} />
      <p>主音的控制范围由此扩大，向更多的音、更广的空间辐射，这叫<b>调性扩张</b>。本书后面的离调、半音化等，都是在单一调性之外「开疆拓土」。
        十九世纪以来还有人提出和声大调（♭6）、旋律大调（下行 ♭7、♭6，上行还原），但它们相对小众，可看作交替的特例，重点在用法与效果。</p>
      <h3>关系调 + 同名调 = 小三度循环</h3>
      <p>从 C 大调出发，交替推关系调与同名调：C →（关系）a →（同名）A →（关系）f♯ →（同名）F♯ = G♭ →（关系）e♭ →（同名）E♭ →（关系）c →（同名）C。八个调在网格上排成一条斜带，盖满了整张图：</p>
      <Tonnetz cols={9} rows={8} center="C" highlight={["C", "Am", "A", "Gbm", "Gb", "Ebm", "Eb", "Cm"]} unit={46}
        caption="八个调的主和弦（F♯m 显示为 G♭m，F♯ 为 G♭）。四个主音 C、E♭、F♯/G♭、A 正是第 1 章的小三度循环。" />
      <p>在五度圈上，这四个主音连成正方形。G 大调、F 大调也各有一个八调循环，于是 24 个大小调被分成三组。浪漫派大师们（舒伯特、勃拉姆斯、里姆斯基-科萨科夫）在这些调之间自由跳转；
        流行歌曲里也常见，如飞儿乐团《千年之恋》、范玮琪《最初的梦想》。还有「一级、二级、双重交替」等更细的分类，初学者不必深究。</p>
      <Callout tone="key" title="小三度循环还会再出现">这是继第 1 章减七和弦之后，小三度循环第二次登场，后面还会见到，最好记住它。</Callout>
    </Block>

    <Block id="degrees" toc="小调级数" kicker="3-4 · 混乱的小调级数" title="同一个 d 小调，四套记号"
      lead="点上方切换方案，下方同一组音、同一组和弦换上不同的「工号」。点格子可以听和弦。">
      <Narrate />
      <DegreeSchemes />
      <p>级数（数字，用于分析）和唱名（音节，用于演唱）本质上都是给调内各音起的代号。设想你来设计 d 小调（D–E–F–G–A–B♭–C）的记号，会有四条路：</p>
      <ul>
        <li><b>固定记法</b>：按音名，C 永远是 1（do），d 小调就是 2–3–4–5–6–♭7–1。反映实际音高，适合器乐、绝对音感者、复杂转调或无调性音乐；五线谱就是这种思维。缺点是每个调写法不同，看不出调式的共同规律。</li>
        <li><b>首调</b>思想：记号随调移动（移动 do），只需相对音感。它又分三种：
          <ul>
            <li><b>顺阶记法</b>：从主音起 1–7。「二元制」观念下大小调各一套，罗马数字级数沿用至今；但数字不显示音程性质。</li>
            <li><b>自然（首调）记法</b>：借关系大调，主音记 6（la-based minor），全是自然音，简谱与许多流行和声书用它——「4536」「4156」这些套路其实终止在小调，顺阶应为 VI–VII–v–i、VI–III–VII–i。</li>
            <li><b>大调首调记法</b>：借同主音大调，主音仍为 1（do-based minor），1–2–♭3–4–5–♭6–♭7，音程关系统一，便于讲调式交替，爵士常用。</li>
          </ul>
        </li>
      </ul>
      <p>后两种都以大调为参照，属于「一元制」。<b>本书约定</b>：小调和弦默认用顺阶级数；被借用时以同名大调为准，用首调记法并加「级」字（如 C 在 d 小调是 7 级音、VII 和弦，被 D 大调借用时是 ♭7 级、♭VII）；单独的阿拉伯数字按简谱的自然记法理解；需要确切音高时直接写音名。</p>
      <Callout tone="quote" title="符号是思想的载体，不是思想本身">
        作者的看法：各种记法各有优劣，长期并存；与人交流先约定体系即可。d 小调主音写成 2、1 还是 6，它都是 D；中音 F 写成 3 级、4、1 还是 ♭3，离主音都是小三度。
        「主音不唱 do 就没有稳定感」「简谱让音乐落后一百年」之类说法，只是个人习惯的放大。网格图的好处正在这里：同一个调，不管怎么标，用到的音和形状都不变。
      </Callout>
    </Block>

    <Block id="ear" toc="听音练习" kicker="动耳朵" title="听音练习：哪种小调？借了什么？" lead="不看谱，只用耳朵。每题可以反复听。">
      <EarQuiz items={[
        { q: "这是哪种小调的上行音阶？", play: { notes: "A3 B3 C4 D4 E4 F4 G#4 A4", melodic: true }, options: ["自然小调", "和声小调", "旋律小调"], answer: 1, why: "F–G♯ 之间那个尖锐的增二度，是和声小调的标志。" },
        { q: "这条小调进行里，属和弦是大三还是小三？", play: { seq: ["Am", "Dm", "Em", "Am"], gap: 0.9 }, options: ["大属和弦 E（和声小调）", "小属和弦 Em（自然小调）"], answer: 1, why: "Em 没有导音 G♯，回到 Am 时推力很弱。" },
        { q: "这条 C 大调进行中间的下属和弦是？", play: { seq: ["C", "Fm", "C"], gap: 0.9 }, options: ["调内的 IV（F）", "借来的 iv（Fm）"], answer: 1, why: "中间突然「暗了一下」：A♭ 只比 G 高半音，这是借自 c 小调的小下属和弦。" },
        { q: "这三个和弦怎样走到 C？", play: { seq: ["Ab", "Bb", "C"], gap: 0.9 }, options: ["vi–vii°–I（调内）", "♭VI–♭VII–I（借用）"], answer: 1, why: "三个大三和弦逐个上行全音，辉煌明亮——「马力欧终止」。" },
        { q: "a 小调里，中间这个下属和弦是？", play: { seq: ["Am", "D", "Am"], gap: 0.9 }, options: ["小下属 Dm（iv）", "大下属 D（IV，多利安终止）"], answer: 1, why: "D 的三音 F♯ 与主音成大六度——多利安六度，古老的民歌味。" },
        { q: "这条小调进行最后落在？", play: { seq: ["Dm", "E", "A"], gap: 0.9 }, options: ["小主和弦 Am", "大主和弦 A（皮卡第三度）"], answer: 1, why: "小调结尾突然变亮，是皮卡第三度。" },
      ]} />
    </Block>

    <Block id="concepts" toc="概念卡" kicker="核心概念" title="本章 14 个概念"><ConceptGrid /></Block>
    <Block id="map" toc="概念图" kicker="概念关系" title="它们怎样连在一起"><ConceptMap /></Block>

    <Block id="quiz" toc="自测" kicker="检验理解" title="自测">
      <Quiz questions={[
        { q: "C 大调与 a 小调用完全相同的音，为什么听感不同？", options: ["因为调号不同", "因为主音不同，各音的地位与关系随之改变", "因为 a 小调更低", "因为 a 小调用了升号"], answer: 1, why: "调性的实质是音与和弦之间的地位关系，不只是音阶里有哪些音。" },
        { q: "自然小调的属功能为什么弱？", options: ["属音不在调内", "7 级离主音一个全音，不是导音，v 是小三和弦", "下属和弦太强", "没有属七和弦"], answer: 1, why: "下主音倾向弱，v–i 推不动；和声小调升高 7 级正是为此。" },
        { q: "和声小调的增二度出现在哪两个音级之间？", options: ["2 与 3", "6 与 7", "7 与 1", "3 与 4"], answer: 1, why: "6 级不变、7 级升高，如 a 小调 F–G♯。旋律小调再把 6 级升高来消除它。" },
        { q: "C 大调里出现 A♭ 和弦，按本书应怎样理解？", options: ["写错了", "从 c 小调借来的 ♭VI", "C 大调的 vi", "转到了 A♭ 大调"], answer: 1, why: "同主音小调的 VI 在大调里记作 ♭VI，是借用和弦。" },
        { q: "小调中用大下属和弦 IV 回到 i，叫什么？", options: ["皮卡第终止", "伊奥里亚终止", "多利安终止", "后门进行"], answer: 2, why: "IV 的三音是多利安六度（升高的 6 级）。" },
        { q: "从 C 大调交替推关系调与同名调，八个调的主音构成什么循环？", options: ["五度圈", "大三度循环", "小三度循环", "全音阶"], answer: 2, why: "C、E♭、F♯/G♭、A 相隔小三度，在五度圈上连成正方形。" },
      ]} />
    </Block>

    <Block id="end" toc="小结">
      <Takeaways items={[
        "自然小调 = 大调换个主音：与关系大调同音同调号，但 7 级是下主音，属功能弱、下属强，并容易被关系大调渗透。",
        "和声小调升 7 级找回导音（V、vii°、V7、vii°7），带来增二度、增三和弦与减七和弦；旋律小调上行再升 6 级，爵士小调把它固定下来。",
        "实际音乐里几种小调与关系大调总是混用；分析时先定调、再标级数、后看效果，移调不改级数。",
        "同主音大小调上下相邻，可以互借同级和弦：大调借 iv、v、ii°、♭III、♭VI、♭VII、vii°7；小调借 IV（多利安终止）、I（皮卡第三度）。",
        "借用把调外半音带进和声，同主音大小调最终合为交替大小调；关系调与同名调串成小三度循环。级数记法有四套，结构不变。",
      ]} />
      <Progression title="回顾：一条进行里的大与小" chords={["C", "F", "Fm", "C", "A♭", "B♭", "C"]} keyName="C" tonnetz={{ cols: 10, rows: 5, center: "C" }}
        caption="I–IV–iv–I–♭VI–♭VII–I：路线一会儿走在大调（上方），一会儿钻进同主音小调（下方）。" />
      <Bridge><p>借用和弦是从「同主音的另一个调」借，下一章换个方向：向调内<b>其他和弦</b>借一个属和弦。
        《莫斯科郊外的晚上》里的 E7、《我和你》里的 B7 都不在本调里——它们是「副属和弦」，临时把某个和弦当成主和弦来解决：
        <Play seq={["C", "A7", "Dm", "G7", "C"]} gap={0.8}>C–A7–Dm–G7–C</Play>。第 4 章「副调和弦」就从这里开始。</p></Bridge>
    </Block>

    <Block id="gloss" toc="术语" title="术语表">
      <Glossary terms={[
        { term: "Natural minor", zh: "自然小调", def: "以大调 6 级为主音的音阶，7 级为下主音。" },
        { term: "Relative keys", zh: "关系大小调", def: "同一组音、同一调号的大小调，如 C 与 a。" },
        { term: "Subtonic", zh: "下主音", def: "在主音下方全音的 7 级音。" },
        { term: "Harmonic minor", zh: "和声小调", def: "自然小调升高 7 级，获得导音。" },
        { term: "Augmented 2nd", zh: "增二度", def: "和声小调 6、7 级之间三个半音的音程。" },
        { term: "Augmented triad", zh: "增三和弦", def: "两个大三度叠成，记 C+ / Caug。" },
        { term: "Diminished 7th chord", zh: "减七和弦", def: "减三和弦叠小三度，四个音等分八度。" },
        { term: "Minor-major 7th", zh: "小大七和弦", def: "小三和弦 + 大七度，记 AmΔ / AmM7。" },
        { term: "Melodic / Jazz minor", zh: "旋律小调 / 爵士小调", def: "上行升 6、7 级；爵士小调上下行都升高。" },
        { term: "Transposition", zh: "移调", def: "整体平移到另一个调，级数不变。" },
        { term: "Parallel keys", zh: "同主音调 / 同名调", def: "主音相同的大小调，如 C 与 c。" },
        { term: "Modal mixture / interchange", zh: "调式交替", def: "同主音大小调之间互借同级和弦。" },
        { term: "Borrowed chord", zh: "借用和弦", def: "从同主音调借来的和弦，如 ♭VI、iv。" },
        { term: "Backdoor progression", zh: "后门进行", def: "♭VII(7)–I 终止。" },
        { term: "Dorian cadence / Dorian 6th", zh: "多利安终止 / 多利安六度", def: "小调 IV–i；IV 的三音与主音成大六度。" },
        { term: "Picardy third", zh: "皮卡第三度", def: "小调乐曲以大主和弦结束。" },
        { term: "Chromaticism", zh: "半音体系", def: "引入调外半音的和声，与自然音体系相对。" },
        { term: "Tonality expansion", zh: "调性扩张", def: "主音控制的音与和弦范围超出单一调。" },
        { term: "Fixed do / Movable do", zh: "固定唱名 / 首调唱名", def: "唱名绑定音高 / 随调移动。" },
      ]} />
    </Block>
  </ChapterPage>;
}
