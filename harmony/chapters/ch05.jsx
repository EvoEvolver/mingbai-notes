// 第 5 章 · 变化与延伸：属变和弦与三全音替换、拿坡里和弦、增六和弦、高叠和弦与爵士的和弦—音阶理论
import { ChapterPage, Block, Hook, SectionCards, ArgumentFlow, ConceptGrid, ConceptMap, Quiz, Takeaways, Bridge, Glossary, C, Callout, Tabs, CompareTable } from "@kit";
import { Play, SoundBar, Tonnetz, EarQuiz, Narrate, Score, Progression } from "@kit/audio";
import TritoneSub from "./_ch05_tritone.jsx";
import StackBuilder from "./_ch05_stack.jsx";

export const meta = {
  id: "ch05", no: 5, title_zh: "变化与延伸", title_en: "Alteration and Extension",
  era: "基础篇 · 调与功能（终章）",
  one_liner: "把和弦里的次要音升降半音、把三度继续往上叠：和声变得更紧、更香，也更暧昧。",
  big_question: "当和弦里的音可以被升降、替换、无限叠高时，调性功能体系是被扩张了，还是被瓦解了？",
  why_it_matters: "前几章解决了「用哪些和弦」；这一章给和弦加「变化音」和「延伸音」：属变和弦、三全音替换、拿坡里和弦、增六和弦、九/十一/十三和弦。它们是浪漫派色彩和声与爵士和声的共同源头——学会了，就能读懂从贝多芬到《秋叶》的大部分和声。",
  original_words: 52000, read_minutes: 60,
};

export const groups = [
  { id: "alter", label: "变和弦与替换" },
  { id: "func", label: "功能的扩张" },
  { id: "ext", label: "高叠与爵士" },
];

export const concepts = [
  { id: "altered_chord", name_zh: "变和弦（属变和弦）", name_en: "Altered chord", icon: "🌶️", section_id: "s1", group: "alter",
    plain: "根音、性质、功能都不变，只把次要的音升高或降低半音。",
    explain: "把 G 和弦的三音 B 降成 B♭，和弦变成 Gm，性质变了，那属于借用或离调。但如果动的是相对次要的五音 D（调的 2 级），根音、性质和功能都保持，只是在原型上「加料」，这就是古典和声的变和弦：G+（G♯5）、G♭5、G7♯5、G7♭5，以及升降三音的导七和弦等。\n\n变化音有两个作用：它是调外音，常与别的音形成不协和音程，让和弦更紧张；它又有半音进行到自然音级的强烈倾向，让解决更迫切。用法有两种：代替原型和弦（G+ 代替 G 进行到 C），或放在原型前面「引出」原型（G+ → G）。大调最常变化 ♭2、♯2、♯4 级，小调最常变化 ♭2、♭4、♯4 级。",
    analogy: "像给一道熟菜加一撮辣椒：菜还是那道菜（根音和功能不变），但味道更冲、更让人想喝口水（解决）。",
    book_example: { what: "C 大调中比较 C–G–C 与 C–G+–C：升高的五音 D♯ 与主和弦的 E 形成新的一对半音。", point: "G+ 到 C 比 G 到 C 多了一个半音倾向，解决更急迫。" },
    misconception: "爵士理论里的「Altered chord」专指变化的属和弦（如 G7alt），范围比古典的「变和弦」窄得多。" },
  { id: "enharmonic_chord", name_zh: "等音和弦", name_en: "Enharmonic chords", icon: "🎭", section_id: "s1", group: "alter",
    plain: "写法、根音、意义都不同，但在平均律下每个音都等高的两个和弦。",
    explain: "B°7♭3 是 B–D♭–F–A♭，D♭7 是 D♭–F–A♭–C♭。B 与 C♭ 在十二平均律下同一个音高，所以两个和弦逐音等高，耳朵无法区分——它们是一对等音和弦。\n\n变和弦制造了大量等音关系：B°7♯3 = Fø、G+7 = Fø♭3、Dm7♯1 = F7……等音和弦听起来一样，但所属的调、记法和后续走向不同：Dm7♯1/F 常回到 C，而 F7 常解决到 B♭。遇到无法解释的大小七和弦，可以想想它是不是某个变和弦的等音。等音也是后面增六和弦与远关系转调的钥匙。",
    analogy: "像同一个人在公司和在家里有两个称呼：「王经理」和「爸爸」。人是同一个，但叫哪个名字，决定了接下来要做什么。",
    book_example: { what: "图 5.7：B°7♭3 与 D♭7 在网格上占据同一组音。", point: "这正是古典「属变和弦」与爵士「三全音替换」殊途同归的地方。" },
    misconception: "等音和弦不等于同一个和弦：功能与解决方向由上下文和记法决定。" },
  { id: "tritone_sub", name_zh: "三全音替换", name_en: "Tritone substitution", icon: "🔄", section_id: "s2", group: "alter",
    plain: "保留属七和弦的三全音，把根音移动三全音：用 ♭II7 代替 V7。",
    explain: "G7 中 B–F 的三全音是属功能的核心。爵士理论大胆地只保留这对三全音，把根音直接换成相距三全音的 D♭，得到 D♭7（D♭–F–A♭–C♭）。两个和弦共享同一对三全音，根音也相距三全音——「三全音」一词两义。\n\n于是 ii7–V7–I 可以变成 ii7–♭II7–I，低音从五度大跳变成 D–D♭–C 的半音下行；♭2 级比主音只高半音，被称为「上导音」。任何副属七和弦都可以同样替换。进一步，所有含同一对三全音的和弦（D♭7♭5、B7♭5、Fø、F7♭5、G♯°7……）都能代替 G7；从 ♭II7 再改变和弦性质（如 D♭m7）则叫「变质」。爵士谱习惯「五度用实线、半音用虚线」来标记这些路径。",
    analogy: "像换了一个乐队主唱，但保留了原来的副歌：最抓耳的那两句（三全音）还在，听众依然知道接下来要回到哪里。",
    book_example: { what: "图 5.8、5.9：G7 与 D♭7 的三全音替换，以及 Dm7/A♭m7 × G7/D♭7 到 CΔ 的四条路径。", point: "古典的 vii°7♭3 与爵士的 subV7 是同一现象的两种解释。" },
    misconception: "三全音替换并不「反功能」，它的思路恰恰来自属功能：替换的是属和弦，解决的仍是主和弦。" },
  { id: "common_tone_sub", name_zh: "共同音替换", name_en: "Common-tone substitution", icon: "🧩", section_id: "s2", group: "alter",
    plain: "保留原和弦的一部分关键音，换掉其余的音，得到「似是而非」的替代和弦。",
    explain: "三全音替换背后是一个更一般的思想：保留原和弦一部分重要结构，改变剩下的音，就得到一个既相似又不同的和弦，可以互相代替，甚至不必顾及调性与功能是否「合理」。\n\n以 Dm7–G7–C 里的 G7 为例：保留 D–F 换成 B♭7；保留 B–D 换成 E7；保留根音和七音换成 Gø；根音升半音得到 G♯°7；只留根音换成 G°7。后两种叫共同音减七和弦。这些都是让听众预期落空的「意外进行」，制造耳目一新的效果。",
    analogy: "像电影里的替身演员：保留了观众最认得的特征（发型、外套），换掉了其余部分——一时真假难辨，却别有新意。",
    book_example: { what: "书中列出 Dm7–G7–C 中 G7 的五种共同音替换。", point: "替换的关键是「保留什么」，保留得越多越像原和弦。" },
    misconception: "共同音替换不必遵守功能逻辑，它更多是色彩与意外感的手段。" },
  { id: "neapolitan", name_zh: "拿坡里和弦", name_en: "Neapolitan chord (N)", icon: "🍕", section_id: "s3", group: "alter",
    plain: "♭2 级上的大三和弦，有下属功能，常以三音为低音（N6）。",
    explain: "小调的 ii°（如 c 小调 D–F–A♭）中，F 和 A♭ 是下属和弦的骨干，根音 D 反而最不重要；把它降成 D♭，就得到 ♭2 级上的大三和弦 D♭——拿坡里和弦，得名于巴洛克时期常用它的那不勒斯乐派。它比主和弦只高半音，符合弗里几亚调式的特征，又称弗里几亚 II；同名大小调共用它。\n\n实践中常把三音（调式 4 级）放在低音，叫拿坡里六和弦 N6，字母记号写成 D♭/F。大调里它与 F 和弦相比上方两音都降了半音，所以格外尖锐，常先用 iv 或 ♭VI 铺垫。它也能用于阻碍终止（G7–D♭/F）、变格进行（D♭/F–C）、离调（V/N = ♭VI），还有拿坡里七和弦 NΔ。在网格上它是以下属音为顶角的大三和弦。",
    analogy: "像正式场合里一句带口音的方言：意思没变（还是下属功能），但那股陌生的「味儿」一下子抓住了耳朵。",
    book_example: { what: "贝多芬《月光奏鸣曲》第一乐章第 3 小节的 D/F♯：c♯ 小调 i7–VI–N6–V7–i。", point: "N6 的色彩来自那个降低的 2 级音，它随后滑向属和弦的导音。" },
    misconception: "N6 的「6」是转位记号（三音在低音），字母记号不能写成 D♭6——那是加六和弦。" },
  { id: "function_blend", name_zh: "功能组的渗透", name_en: "Blurring of function groups", icon: "🌫️", section_id: "s4", group: "func",
    plain: "变化音越多，每个音可配的和弦越多，一个和弦的功能也越多义。",
    explain: "第二章里旋律 4 级音只能配 IV、ii 或 vii°；加入七和弦、离调、借用、变和弦后，选择大大扩张。和声变化带来三个结果：每个音可用的和弦突破功能组限制；单个和弦的功能越来越混合（如 viiø 下半部是属、上半部是下属）；和弦之间的共同音与等音关系增多，同一组音可承担不同功能（如 NΔ 只动两个音就到 V7♭5，vii°7♯3 与 iv° 等音）。\n\n这些变化虽都能与调性功能理论挂钩，却让体系越来越复杂暧昧：功能的明确对比让位于色彩，最终在十九世纪末引发「调性革命」。",
    analogy: "像一家公司不断招临时工、外包、兼职：业务越来越丰富，但「谁属于哪个部门」越来越说不清。",
    book_example: { what: "图 5.20–5.24：大调 4 级、1 级可用的和弦，以及 NΔ→V7♭5、vii°7♭3/♯3 的多重理解。", point: "量变积累成质变：调性功能体系由扩张走向松动。" },
    misconception: "功能模糊不是「错误」，而是浪漫派色彩和声的主动追求。" },
  { id: "aug6", name_zh: "增六和弦", name_en: "Augmented sixth chord", icon: "🇮🇹", section_id: "s5", group: "alter",
    plain: "用属音上下两个半音夹住属音（♭6 与 ♯4），形成增六度，向外扩张到八度。",
    explain: "C 大调/c 小调中，A♭ 和 F♯ 分别是属音 G 下方和上方的「导音」。A♭ 在下、F♯ 在上构成增六度，再向外扩张到两个 G 构成的八度——双重半音逼近，对属和弦形成强力支撑。\n\n在增六度里加入主音是意大利增六 It+6（A♭–C–F♯）；再加 2 级是法国增六 Fr+6（A♭–C–D–F♯）；加 ♭3 级是德国增六 Gr+6（A♭–C–E♭–F♯）。国名只是标签。从功能看，It+6 相当于 vii°♭3/V 或 iv♯1，Fr+6 相当于 V7♭5/V，Gr+6 相当于 vii°7♭3/V；爵士则看作 subV7/V（省五音、降五音、完整）。Gr+6 与属七和弦等音，因此还能做远关系转调。",
    analogy: "像两个人从楼上楼下同时往同一层赶：一个下楼一个上楼，都只差一级台阶——会合（解决到八度）几乎是必然的。",
    book_example: { what: "贝多芬《命运交响曲》主题末尾三个和弦的中间一个，是 c 小调 It+6，随即解决到属和弦。", point: "增六和弦最典型的走向：两个外声部各自半音向外到属音八度。" },
    misconception: "增六度与小七度等音，但增六和弦向外扩张到八度，属七和弦的七音却要下行解决——听起来一样，走法不同。" },
  { id: "tristan", name_zh: "特里斯坦和弦", name_en: "Tristan chord", icon: "💔", section_id: "s6", group: "func",
    plain: "瓦格纳《特里斯坦与伊索尔德》开头的 F–B–D♯–G♯，众说纷纭的名和弦。",
    explain: "序曲第 3 小节出现 F–B–D♯–G♯，虽与 Fø 等音，在 a 小调里却难以解释。常见观点有：它是「澳大利亚增六」（从 E 和弦保留 G♯、B，加上 E 上下半音 F、D♯），即瓦格纳和弦 vii°7♯5；或原形是 a 小调 Fr+6（F–A–C♭–D♯），G♯ 是倚音；或是 B–F 三全音保留、另两音变化的替换；也有人把它拆成 F 与 G♯m 的复合。\n\n还有一种横向理解：最高声部 G♯–A–A♯–B 半音上行（「爱欲」），次高声部 F–E–D♯–D 半音下行（「悲叹」），这个「和弦」只是两条线交错的副产物。随后的 E7 并未解决，调性长期游移——这部作品是走向现代和声的路标。",
    analogy: "像一句没有标点的诗：每个读者都能断出自己的句子，作者却从未告诉我们哪一种才对。",
    book_example: { what: "谱例 5.11 与图 5.30：特里斯坦和弦的六七种理解。", point: "音乐实践总领先于理论；乐谱是一手材料，分析只是二手解读。" },
    misconception: "没有哪一种分析是「标准答案」；与其背结论，不如反复去听。" },
  { id: "predominant", name_zh: "属前功能组", name_en: "Predominant function (P)", icon: "🪜", section_id: "s6", group: "func",
    plain: "把下属组、重属组、拿坡里、增六等放在属前面的和弦合称 P：T–P–D–T。",
    explain: "T–S–D–T 循环里，S 是承上启下的环节。如今能放在 D 之前的和弦多了很多：主和弦第二转位 I64、IV/ii/vi、借用和弦 iv、♭VI、♭VII 等、V+ 与 V7♭5、重属组、拿坡里和弦、三种增六和弦。一些理论把它们合并为属前功能组 P，功能循环推广为 T–P–D–T。\n\n使用原则仍是和声第一定律：同组和弦连用时，把更不稳定、更不协和的放在后面，让力度逐步积累（V7 在 V 之后、拿坡里和增六前面先用下属和弦铺垫）。古典时期功能进行「短平快」；浪漫派则用大段铺垫推迟属和弦、用各种手段推迟主和弦，制造更大的期待。",
    analogy: "像飞机起飞前的滑跑：滑跑的方式可以五花八门，但目的都是为「起飞」（属功能）积蓄速度。",
    book_example: { what: "书中列出以大调为准的 P 组成员：I64、IV、ii、iv、♭VI、V/V、N6、It/Fr/Gr+6 等。", point: "P 让复杂的浪漫派和声分析思路更清楚。" },
    misconception: "P 不是取代 S，而是把 S 推广到所有「通往属」的和弦。" },
  { id: "total_function", name_zh: "全功能理论", name_en: "Total-function theory", icon: "🌐", section_id: "s6", group: "func",
    plain: "沿五度圈把功能组向两侧无限延伸：…SS–S–T–D–DD–3D…，所有和弦都归同一个主音统辖。",
    explain: "D 组以 G 为核心、导音 B 为特性音；G 的属和弦 D 是重属 DD 的核心，特性音 F♯；D 的属和弦 A 代表三重属 3D……下属方向 F（S）、B♭（SS）、E♭（3S）……同名小调也可这样向两侧延伸。每个功能组以一个三和弦为核心，其三音就是特性音。\n\n这就是华萃康的全功能理论：只要主音确定，所有和弦都被纳入调性功能体系。相邻组会「瓜分」较弱的组（功能转移）。按此理论，增六和弦接近 s 组，拿坡里属于 ss 组。它与勋伯格的「单调性」与调性领域（Region）理论异曲同工；还隐约显示小三度轴线上的功能相似性，留待第八章。",
    analogy: "像以首都为中心的环线地图：一环、二环、三环……无论住得多远，地址都能用「几环」来描述。",
    book_example: { what: "图 5.35、5.36：C 大调与 c 小调功能组的五度序列，以及以 C 为主音的完全功能分布。", point: "调式交替、离调、变和弦都能放进这张图。" },
    misconception: "全功能理论不是说「什么都一样」，而是给每个调外和弦一个相对主音的位置。" },
  { id: "extended_chord", name_zh: "高叠和弦", name_en: "Extended (tertian) chords", icon: "🏗️", section_id: "s7", group: "ext",
    plain: "七和弦上继续三度叠置：九、十一、十三和弦，最多七个音。",
    explain: "G7 的七音 F 上继续用调内音叠三度，得到九音 A、十一音 C、十三音 E：G9、G11、G13（V9、V11、V13）。再往上就回到 G，所以传统认为最多叠到十三和弦。七音以上的音叫延伸音，最高音叫冠音。爵士用「首调」标记：以根音为 1，G13 的音是 1、3、5、♭7、9、11、13。\n\n九度和二度音名相同，但应看作「七度 + 三度」：复音程音响较柔和，压进一个八度会形成浑浊的二度堆积。高叠和弦色彩浓郁（「Fat」），功能却更暧昧（G9 = G + Dm，属中带下属）。古典里多限于 V9、ii9，十九世纪渐多，为爵士和声做了准备。",
    analogy: "像叠积木：越高越壮观，也越容易摇晃——高到一定程度，就看不出最底下是哪块了。",
    book_example: { what: "图 5.38–5.40：G7 延伸到 G13，以及 Dm13、CΔ13 的结构比较。", point: "推算高叠和弦要看根音到各音的音程，而不是一层层数三度。" },
    misconception: "延伸不是越高越好；简单和弦与高叠和弦交替使用，才有张弛对比。" },
  { id: "altered_dominant", name_zh: "变化属和弦与 alt", name_en: "Altered dominant (7alt)", icon: "🔥", section_id: "s7", group: "ext",
    plain: "属和弦的五、九、十一、十三音升降半音：♭9、♯9、♯11、♭13……统称 alt。",
    explain: "属十三和弦中根音、三音、七音是骨干，其余的五音、九音、十一音、十三音都可升降：五音和九音可升可降（♯5、♭5、♯9、♭9）；十一音降低会与三音重合，只能升（♯11 = ♭5）；十三音升高会与七音重合，只能降（♭13 = ♯5）。\n\n这些变化音像香辛料，给音响带来「Spicy」的刺激。写法可以逐个列出（G7♭5♭9），也可一律记作 G7alt；其「标准结构」含全部变化音，七个音构成「变化音阶」，即从 7 级开始的爵士小调。最常见的是 V7♯11 与和声小调来的 V7♭9。alt 和弦还相当于 V13♯11 的三全音替换。",
    analogy: "像点咖啡：基础款是属七，♭9 加一份浓缩、♯11 加点肉桂……「alt」就是「随你加，越刺激越好」。",
    book_example: { what: "《秋叶》的一个版本中，许多小七和弦之前的 V7 都加入了 ♭9。", point: "即使谱上只写 G7，爵士乐手也会自行加入延伸、变化音。" },
    misconception: "爵士所说的「altered chord」只指变化的属和弦，不等于古典的全部变和弦。" },
  { id: "avoid_note", name_zh: "避免音与和弦音层级", name_en: "Guide tones & avoid notes", icon: "⚠️", section_id: "s7", group: "ext",
    plain: "导引音（3、7）定性质；延伸音加色彩；避免音太刺耳或改变性质，要小心用。",
    explain: "爵士把和弦音分层：七和弦是骨架，其中三音和七音是导引音，根音加导引音就是「躯壳排列」；还可以省去根音（无根音排列）。七和弦外的延伸、变化音统称张力音。省略的传统规则是：根音、冠音、三音、七音和变化音尽量保留，五音优先省略。\n\n张力音中太刺耳、抢风头或会改变和弦性质的叫避免音：Dm7 上的 B（与 F 成三全音）、G7 上的 C（与 B 成小九度）、CΔ 上的 F（与 E 成小九度、与 B 成三全音）。但它是约定俗成而非禁令：可放弱拍、短时值或升降处理（G7 的 C 升成 C♯ 即 G7♯11，或让 C 挂留成 G7sus）。「禁止小九度/三全音」的口诀过于机械，最终以听感为准。",
    analogy: "像穿搭：衬衫和裤子是骨干，围巾、帽子是配饰；有些配饰跟某件衬衫「撞色」——不是不能穿，只是要会搭。",
    book_example: { what: "C 大调 Dm7–G7–CΔ 中的三个典型避免音，以及图 5.45 G13♯11 的音层级。", point: "从骨干音出发逐个加音试听，比背避免音表更有用。" },
    misconception: "避免音不是禁用音；有时作曲家正是要它的突兀与尴尬感。" },
  { id: "chord_scale", name_zh: "和弦—音阶理论", name_en: "Chord-scale approach", icon: "🎷", section_id: "s8", group: "ext",
    plain: "和弦即调、调即和弦：每个高叠和弦对应一条可以即兴的音阶（调式）。",
    explain: "早期爵士独奏只用和弦音，七和弦上只有四个音可用。把更多音当作延伸、变化音纳入和弦后，G13 或 Dm13 就包含了 C 大调全部七个音：只要不出某条音阶，任何旋律音都是高叠和弦的一部分。1950 年代以 George Russell 的理论为发端，形成了和弦—音阶理论与调式爵士。\n\n古典是「一个大/小调下七个音级和弦」；爵士是「一个自然音阶下七个调式/高叠和弦」，如 D Dorian、F Lydian 既指和弦也指音阶。兼容原则：音阶含有和弦的骨干音即可相配。G7 上至少可用七种音阶（C 大调、c 爵士小调、c 和声小调、d 爵士小调、a♭ 爵士小调即 alt、减音阶、全音阶），一条音阶也可配多种和弦——多对多。",
    analogy: "古典和声像团体操：每人只是队形的一部分；和弦—音阶像时装秀：每位模特（和弦）独自登场，自带一整套风格（音阶）。",
    book_example: { what: "图 5.46 与谱例 5.14：C 大调七个调式的十三和弦，及 G7 上可用的七条音阶。", point: "爵士用「负面清单」（只标雷区），古典用「正面清单」（规定怎么做）。" },
    misconception: "和弦—音阶理论并未抛弃调性：在每个和弦内部，根音仍是临时的「主音」，2–5–1 与三全音替换都是功能思维。" },
];

export const relations = [
  { from: "altered_chord", to: "enharmonic_chord", label: "制造等音" },
  { from: "enharmonic_chord", to: "tritone_sub", label: "vii°7♭3 = ♭II7" },
  { from: "tritone_sub", to: "common_tone_sub", label: "推广" },
  { from: "altered_chord", to: "neapolitan", label: "♭2 用于下属" },
  { from: "altered_chord", to: "aug6", label: "双重变化音" },
  { from: "tritone_sub", to: "aug6", label: "Gr+6 = subV7/V" },
  { from: "enharmonic_chord", to: "aug6", label: "Gr+6 = 属七" },
  { from: "neapolitan", to: "predominant", label: "属前成员" },
  { from: "aug6", to: "predominant", label: "属前成员" },
  { from: "aug6", to: "tristan", label: "澳洲/法国增六" },
  { from: "altered_chord", to: "function_blend", label: "功能多义" },
  { from: "function_blend", to: "total_function", label: "体系扩张" },
  { from: "predominant", to: "total_function", label: "T–P–D 推广" },
  { from: "extended_chord", to: "altered_dominant", label: "升降张力音" },
  { from: "altered_dominant", to: "tritone_sub", label: "alt = V13♯11 替换" },
  { from: "extended_chord", to: "avoid_note", label: "音的层级" },
  { from: "avoid_note", to: "chord_scale", label: "音阶里的雷区" },
  { from: "extended_chord", to: "chord_scale", label: "和弦即调" },
];

const sections = [
  { id: "s1", no: "5-1", title_zh: "属变和弦", title_en: "Altered dominant chords", gist: "升降属和弦的五音、导和弦的三音：更紧张、更想解决。",
    summary: "保持根音、性质、功能不变，只把次要音升降半音，就是变和弦。大调属和弦升降五音得到 G+、G♭5、G7♯5、G7♭5；导和弦升降三音得到 Bø♭3、B°7♭3 等，其中常出现减三度，实践中转位成增六度。B°7♭3 与 D♭7 等音。小调只降 2 级；后来又引入 ♭4、♯4（瓦格纳和弦）。副调也有属变和弦。",
    concept_ids: ["altered_chord", "enharmonic_chord"] },
  { id: "s2", no: "5-1", title_zh: "三全音替换", title_en: "Tritone substitution", gist: "保留 B–F，根音换成 D♭：♭II7 代替 V7。",
    summary: "爵士理论用 ♭II7 代替 V7，二者共享三全音、根音相距三全音；ii–♭II7–I 的低音变成半音下行。所有含同一对三全音的和弦都可互替，还可「变质」。更一般的是共同音替换：保留部分关键音、换掉其余音，制造意外进行。",
    concept_ids: ["tritone_sub", "common_tone_sub"] },
  { id: "s3", no: "5-2", title_zh: "拿坡里和弦", title_en: "The Neapolitan chord", gist: "♭2 级大三和弦，常以 N6 出现，色彩尖锐的下属。",
    summary: "小调 ii° 降低根音得到 ♭II，同名大小调共用。常用三音在低音的 N6（D♭/F），大调中比 F 和弦尖锐，可先用 iv、♭VI 铺垫；可作阻碍终止、变格进行。还有拿坡里七和弦 NΔ、副调的拿坡里和弦（N/IV 在 ♭5 级）与拿坡里的离调（V/N = ♭VI）。",
    concept_ids: ["neapolitan"] },
  { id: "s4", no: "5-2", title_zh: "♭2 以外的变化音与功能渗透", title_en: "Other alterations; blurring of functions", gist: "♯2、♭4 用于下属组；每个音可配的和弦越来越多。",
    summary: "大调 ♯2 级可用于 ii7（Dm7♯1，常以 F 为低音），小调 ♭4 级可产生「小拿坡里」等。等音关系随之增多（Dm7♯1 = F7）。和声变化让每个音可配的和弦突破功能组、单个和弦功能混合、和弦间共同音与等音增多，调性功能体系从扩张走向松动。",
    concept_ids: ["function_blend"] },
  { id: "s5", no: "5-3", title_zh: "增六和弦", title_en: "Augmented sixth chords", gist: "A♭ 与 F♯ 从两侧夹击属音：意、法、德三兄弟。",
    summary: "♭6 与 ♯4 构成增六度，向外解决到属音八度。加主音为 It+6，再加 2 级为 Fr+6，加 ♭3 级为 Gr+6。它们分别等音于 A♭7no5、A♭7♭5、A♭7，可理解为重属变和弦或 subV7/V。实例：《土耳其进行曲》《命运》《路标》《离别练习曲》，以及爵士化用法（《粉红豹》《Friend Like Me》）。",
    concept_ids: ["aug6"] },
  { id: "s6", no: "5-3", title_zh: "特里斯坦和弦与功能扩张", title_en: "Tristan chord; predominant; total function", gist: "众说纷纭的特里斯坦和弦、T–P–D–T、全功能理论。",
    summary: "增六和弦可推广（瑞士、奥地利、澳大利亚、日本增六，增三度和弦）。特里斯坦和弦有多种解释。增六可建在其他音级、与属七等音转调。属前功能组 P 把 D 之前的和弦合并；全功能理论沿五度圈无限延伸功能组，所有和弦都归一个主音统辖。",
    concept_ids: ["tristan", "predominant", "total_function"] },
  { id: "s7", no: "5-4", title_zh: "高叠和弦及其变化音", title_en: "Extended chords & alterations", gist: "九、十一、十三和弦；♭9、♯9、♯11、♭13；省略与避免音。",
    summary: "七和弦上继续叠三度到十三和弦。属和弦的五、九、十一、十三音可升降，统称 alt。和弦音按重要性分层：导引音、躯壳排列、无根音排列、张力音；省略时五音优先。避免音太刺耳或改变性质，但可软化或升降处理。",
    concept_ids: ["extended_chord", "altered_dominant", "avoid_note"] },
  { id: "s8", no: "5-4", title_zh: "爵士的和弦—音阶理论", title_en: "The chord-scale approach", gist: "和弦即调：G7 上至少有七条音阶可用。",
    summary: "把调内所有音看作一个高叠和弦，和弦与音阶合一；C 大调七个音上各有一个调式和十三和弦。兼容原则：音阶含骨干音即可相配，和弦与音阶多对多。古典与爵士不是对立的，而是互相联系、侧重不同的工具箱。",
    concept_ids: ["chord_scale"] },
  { id: "s9", no: "5-4", title_zh: "高叠和弦的更多理解", title_en: "Slash chords, upper structures, polychords", gist: "斜线和弦、上层结构、复合和弦、「摩天大楼」。",
    summary: "B°/G 相当于 G9；G13 = G7 + Am（上层结构 USii）；复合和弦强调分层（厄勒克特拉和弦、彼得鲁什卡和弦）。避开根音重复可叠到「二十三和弦」。斜线和弦术语混乱，本书区分转位、向下延伸、高叠转位与混合和弦。",
    concept_ids: ["extended_chord", "chord_scale"] },
];

const FUNC_MAJ = [["3S", "Eb"], ["SS", "Bb"], ["S", "F"], ["T", "C"], ["D", "G"], ["DD", "D"], ["3D", "A"], ["4D", "E"]];
const FUNC_MIN = [["3s", "Ebm"], ["ss", "Bbm"], ["s", "Fm"], ["t", "Cm"], ["d", "Gm"], ["dd", "Dm"], ["3d", "Am"], ["4d", "Em"]];
const MODES = [
  { label: "C Ionian", scale: "C4 D4 E4 F4 G4 A4 B4 C5", chord: "C3 E3 G3 B3 D4 F4 A4", name: "CΔ13（11 音 F 为避免音）" },
  { label: "D Dorian", scale: "D4 E4 F4 G4 A4 B4 C5 D5", chord: "D3 F3 A3 C4 E4 G4 B4", name: "Dm13（13 音 B 与 F 成三全音，常避开）" },
  { label: "E Phrygian", scale: "E4 F4 G4 A4 B4 C5 D5 E5", chord: "E3 G3 B3 D4 F4 A4 C5", name: "Em7(♭9, 11, ♭13)" },
  { label: "F Lydian", scale: "F4 G4 A4 B4 C5 D5 E5 F5", chord: "F2 A2 C3 E3 G3 B3 D4", name: "FΔ13♯11（♯4 是特性音）" },
  { label: "G Mixolydian", scale: "G4 A4 B4 C5 D5 E5 F5 G5", chord: "G2 B2 D3 F3 A3 C4 E4", name: "G13（11 音 C 为避免音）" },
  { label: "A Aeolian", scale: "A4 B4 C5 D5 E5 F5 G5 A5", chord: "A2 C3 E3 G3 B3 D4 F4", name: "Am7(9, 11, ♭13)" },
  { label: "B Locrian", scale: "B4 C5 D5 E5 F5 G5 A5 B5", chord: "B2 D3 F3 A3 C4 E4 G4", name: "Bø(♭9, 11, ♭13)" },
];
const G7SCALES = [
  ["C 大调（G Mixolydian）", "G4 A4 B4 C5 D5 E5 F5 G5", "9、11、13 均为自然音；C 是避免音。"],
  ["c 爵士小调（第 5 音阶）", "G4 A4 B4 C5 D5 Eb5 F5 G5", "13 音降为 E♭（♭13）。"],
  ["c 和声小调（第 5 音阶）", "G4 Ab4 B4 C5 D5 Eb5 F5 G5", "♭9 与 ♭13：古典味最浓的属和弦色彩。"],
  ["d 爵士小调（第 4 音阶）", "G4 A4 B4 C#5 D5 E5 F5 G5", "♯11：C 升成 C♯，避免音消失（Lydian dominant）。"],
  ["a♭ 爵士小调（第 7 音阶 = altered）", "G4 Ab4 Bb4 B4 C#5 Eb5 F5 G5", "♭9、♯9、♯11、♭13 全部到齐：G7alt。"],
  ["减音阶（半—全）", "G4 Ab4 Bb4 B4 C#5 D5 E5 F5 G5", "八声音阶，详见第十三章。"],
  ["全音阶", "G4 A4 B4 C#5 D#5 F5 G5", "♯11 与 ♯5，悬浮感，详见第十三章。"],
];

export default function Chapter() {
  return <ChapterPage meta={meta} groups={groups} concepts={concepts} relations={relations}>
    <SoundBar />

    <Block id="hook" toc="开场">
      <Hook title="先听：同一个「回家」，三种口味"><p>
        先点 <Play seq={["G7", "C"]} gap={1}>G7 → C</Play>，这是最熟悉的属到主。再点 <Play seq={["G2 B3 D#4 F4", "C3 C4 E4 G4"]} gap={1}>G7♯5 → C</Play>：
        只把一个音升了半音，「想回家」的感觉更急了。最后点 <Play seq={["Db2 Cb4 F4 Ab4", "C2 C4 E4 G4"]} gap={1}>D♭7 → C</Play>：
        根音换成了相距最远的 D♭，可它照样回得了家，而且低音只滑了一个半音。
        为什么一个离 C 大调「最远」的和弦能代替属和弦？答案藏在两个和弦共用的那对三全音里。
        这一章讲和弦的两种「升级」：<b>变化</b>（把音升降半音）与<b>延伸</b>（把三度继续往上叠）。</p>
      </Hook>
    </Block>

    <Block id="secs" toc="小节" kicker="原书结构" title="本章九个知识单元" lead="原书 5-1 至 5-4 四节，内容很多，这里按主题拆成九张卡片。点卡片看要点。">
      <SectionCards sections={sections} />
    </Block>

    <Block id="flow" toc="主线" kicker="论证主线" title="从「加一撮辣椒」到「和弦即调」">
      <ArgumentFlow steps={[
        { claim: "动次要的音，不动和弦的身份", detail: "升降五音（属和弦）或三音（导和弦），根音、性质、功能都不变——这就是变和弦。" },
        { claim: "变化音让紧张更紧张、解决更迫切", detail: "调外半音与自然音构成新的半音倾向，本质仍是和声第一定律。" },
        { claim: "变化制造等音：B°7♭3 = D♭7", detail: "古典的属变和弦与爵士的三全音替换在这里会合：保留三全音，根音可以移动三全音。" },
        { claim: "♭2 级走向下属组：拿坡里和弦", detail: "小调 ii° 降根音得到 ♭II；N6 是色彩最尖锐的下属。" },
        { claim: "双重变化音从两侧夹击属音：增六和弦", detail: "♭6 与 ♯4 向外解决到属音八度；意、法、德三种只是填充音不同。" },
        { claim: "功能组互相渗透，体系扩张也在松动", detail: "属前功能组 P、全功能理论试图收编一切调外和弦，而特里斯坦和弦预示了调性的瓦解。" },
        { claim: "三度继续往上叠：九、十一、十三和弦", detail: "延伸音加色彩，变化音加辛辣；导引音、避免音给每个音分层。" },
        { claim: "叠满七个音，和弦就是一条音阶", detail: "爵士的和弦—音阶理论：和弦即调；古典与爵士是互补的工具箱，不是对立的门派。" },
      ]} />
    </Block>

    {/* ───────── 5-1 属变和弦 ───────── */}
    <Block id="altered" toc="属变和弦" kicker="5-1 · 大调的属变和弦" title="只动五音：G+ 与 G♭5"
      lead="先听：同样从 C 走到 C，中间的属和弦换成升五音或降五音的版本，紧张度有什么不同？">
      <Narrate />
      <Progression title="C–G–C 对比 C–G+–C" chords={["C", "G", "C", "C", "G+", "C"]} keyName="C" beats={[2, 2, 4, 2, 2, 4]} bpm={72}
        caption="后半段的 G+（G–B–D♯）里，D♯ 与主和弦的 E 只差半音：除了 B→C，又多了一对半音倾向。" />
      <p>把 G 和弦的三音 B 降半音，<Play seq={["G", "Gm"]} gap={0.9}>G → Gm</Play>，和弦性质就变了——那是借用或离调的范畴。
        而相对次要的<b>五音 D</b>（调的 2 级）升降半音时，根音、性质与功能都不变，只是在原型上做「变音」，这类和弦就是<C id="altered_chord">变和弦</C>；
        属功能组的叫属变和弦，下属组的叫下属变和弦。变化音的作用有两条：它在调外，常与别的音形成不协和音程，让和弦更紧张；
        它又带着强烈的半音倾向，让解决更迫切——本质上仍是和声第一定律。</p>
      <ul>
        <li><b>升高五音</b>：<Play chord="G+" arp={0.06}>G+（G♯5）</Play>，级数 V+。D♯ 与根音形成尖锐的增五度。可以<b>代替</b> V（C–G+–C），也可以放在 V 之前<b>引出</b>原型：
          <Play seq={["C", "G", "G+", "G"]} gap={0.8}>C–G vs. C–G+–G</Play>（变化音消失也是一种「解决」）。注意 G♯5 不是以 G♯ 为根的和弦。</li>
        <li><b>降低五音</b>：<Play notes="G3 B3 Db4" arp={0.06}>G♭5</Play>，D♭ 比主音只高半音，同样倾向强烈：
          <Play seq={["C4 E4 G4", "G3 B3 Db4", "C4 E4 G4"]} gap={0.9}>C–G♭5–C</Play>。D♭ 与 B 构成<b>减三度</b>（只有两个半音），
          实践中常转位成增六度：<Play notes="B3 Db4">减三度 B–D♭</Play> vs. <Play notes="Db3 B3">增六度 D♭–B</Play>，后者略为舒展。</li>
        <li><b>同时升降</b>：<Play notes="Db3 G3 B3 D#4" arp={0.06}>G♯5♭5</Play>，四个音仍行使属三和弦功能；两个变化五音拉开成倍增八度（听感为大九度）。</li>
      </ul>
      <p>属七和弦里，三音 B 与七音 F 构成三全音，是特征音程，传统上不动；能动的仍只有五音：
        <Play notes="G3 B3 D#4 F4" arp={0.06}>G7♯5（增七和弦 G+7）</Play>、<Play notes="G3 B3 Db4 F4" arp={0.06}>G7♭5</Play>，都可代替或引出 G7，
        也有双重变化的 G7♯5♭5。同样会出现减三度（D♯–F、B–D♭），常转位成增六度使用。</p>
      <p>导七和弦 <Play chord="Bø" arp={0.06}>Bø</Play> 里根音、七音、五音（减五度是特征）都不宜动，能变的只有三音 D（又是 2 级）：
        <Play notes="B3 Db4 F4 A4" arp={0.06}>Bø♭3</Play>、<Play notes="B3 D#4 F4 A4" arp={0.06}>Bø♯3</Play>。大调常借用的减七和弦 <Play chord="B°7" arp={0.06}>B°7</Play> 同理：
        <Play notes="B3 Db4 F4 Ab4" arp={0.06}>B°7♭3</Play>、<Play notes="B3 D#4 F4 Ab4" arp={0.06}>B°7♯3</Play>。</p>
      <Callout tone="key" title="等音和弦：B°7♭3 = D♭7">
        B°7♭3 是 B–D♭–F–A♭，<Play chord="Db7" arp={0.06}>D♭7</Play> 是 D♭–F–A♭–C♭。B 与 C♭ 在平均律下同音高，于是两个和弦四个音逐一等高——
        这叫<C id="enharmonic_chord">等音和弦</C>。同样 B°7♯3 = Fø、G+7 = Fø♭3。听起来一样，记法、所属调与走向却不同；遇到「无法解释」的大小七和弦，不妨想想它是谁的等音。
      </Callout>
      <Callout tone="info" title="变化音的倾向（原书图 5.2）">
        原书把大、小调的音排成圆，用箭头画出每个音（含变化音）的半音倾向：大调中 ♭2 下行到 1、♯2 上行到 3、♯4 上行到 5、♭6 下行到 5……
        变化音几乎都「贴着」一个自然音级，只差半音，所以特别想解决。
      </Callout>
    </Block>

    <Block id="tritone" toc="三全音替换" kicker="5-1 · 三全音替换（本章专属图解）" title="G7 与 D♭7：共享同一条三全音"
      lead="下图是五度圈。红色实线是 V7，绿色虚线是替换和弦，金线是它们共享的三全音。换调、换替换和弦，听它们是不是都能回到主和弦。">
      <Narrate />
      <TritoneSub />
      <p>属七和弦里 B–F 的三全音曾经被视为禁忌，后来却成了属功能的核心：它决定了属七和弦独特的紧张感与倾向性。
        既然如此，五音可以省，根音为什么不可以换？爵士理论保留 B（C♭）–F，把根音直接换成 D♭，得到另一个属七和弦 D♭7——这就是<C id="tritone_sub">三全音替换</C>。
        「三全音」有两层意思：两个和弦共享同一对三全音；两个根音相距三全音。在五度圈上，这两件事是同一个画面：两个和弦互为 180° 旋转，共用一条直径。</p>
      <p>任何调都可以用 ♭II7 代替 V7，俗称「降二代五」，记作 subV7。它和古典的 vii°7♭3 是同一组音，殊途同归；只是爵士的思路更直接，便于即兴。
        于是 ii7–V7–I 可以改成 ii7–♭II7–I：</p>
      <Progression title="ii–V–I 与 ii–subV–I" chords={["Dm7", "G7", "Cmaj7", "Dm7", "Db7", "Cmaj7"]} roman={["ii7", "V7", "IΔ", "ii7", "♭II7（subV7）", "IΔ"]}
        beats={[2, 2, 4, 2, 2, 4]} bpm={80} texture="pop"
        caption="第二遍的低音 D–D♭–C 是平稳的半音下行。♭2 级比主音高半音，被称为「上导音」（下行导音）。" />
      <p>爵士谱用「五度用实线、半音用虚线」的括号箭头标记这类进行。2–5–1 结合三全音替换，有四条路径（原书图 5.9）：
        <Play seq={["Dm7", "G7", "Cmaj7"]} gap={0.9}>Dm7–G7–CΔ</Play>、
        <Play seq={["Dm7", "Db7", "Cmaj7"]} gap={0.9}>Dm7–D♭7–CΔ</Play>、
        <Play seq={["Abm7", "Db7", "Cmaj7"]} gap={0.9}>A♭m7–D♭7–CΔ</Play>、
        <Play seq={["Abm7", "G7", "Cmaj7"]} gap={0.9}>A♭m7–G7–CΔ</Play>（A♭m7 是 Dm7 的「替换 ii」）。
        推广到副调，任何离调 V7 都可以用比它高半音的属七和弦代替。</p>
      <p>在此基础上还能继续变：从 ♭II7 出发改变性质，如 <Play seq={["Dm7", "C#m7", "Cmaj7"]} gap={0.9}>D♭m7（= C♯m7）</Play>、大七、半减七，
        这叫「变质」，属于非功能的「交替」手法；或者像上图那样，把所有含同一对三全音的和弦（含等音形式）都当成可互换的成员。三全音的更多奇妙性质见 6-3。</p>
    </Block>

    <Block id="commontone" toc="共同音替换" kicker="5-1 · 三全音替换" title="保留一部分，换掉其余：共同音替换"
      lead="同样是 Dm7 → ? → C，中间换成不同的和弦。每个替换都保留了 G7 的一部分。">
      <Narrate />
      <p>三全音替换背后有一个更普遍的思想：保留原和弦的一部分关键结构，改变其余的音，就造出一个「既像又不像」的和弦，
        可以打破调性与功能的「合理性」去替换——这叫<C id="common_tone_sub">共同音替换</C>。以 Dm7–G7–C 为例：</p>
      <ul>
        <li>原型：<Play seq={["Dm7", "G7", "C"]} gap={0.9}>Dm7–G7–C</Play></li>
        <li>保留 D–F 小三度，换成 <Play seq={["Dm7", "Bb7", "C"]} gap={0.9}>B♭7</Play></li>
        <li>保留 B–D 小三度，换成 <Play seq={["Dm7", "E7", "C"]} gap={0.9}>E7</Play></li>
        <li>保留根音 G 和七音 F，换成半减七 <Play seq={["Dm7", "Gø", "C"]} gap={0.9}>Gø</Play></li>
        <li>根音升半音、其余不动，得到减七 <Play seq={["Dm7", "G#dim7", "C"]} gap={0.9}>G♯°7</Play></li>
        <li>只保留根音，换成含 G 的减七 <Play seq={["Dm7", "Gdim7", "C"]} gap={0.9}>G°7</Play></li>
      </ul>
      <p>它们都让听众的预期落空，相当于斯波索宾和声所说的「意外进行」。最后两种叫共同音减七和弦，7-3 再细讲。</p>
    </Block>

    <Block id="minoralt" toc="小调与副属变和弦" kicker="5-1 · 小调的属变和弦 · 副属变和弦" title="小调只降 2 级；后来又多了 ♭4 与 ♯4">
      <Narrate />
      <p>小调里 2 级音升高会与 3 级（小三度）重合，耳朵会把 ♯2 当作 3 级；所以 V+、V+7 在小调里只是「含小六度音的属和弦」或 III 的转位，是调内和弦。
        小调属变和弦中 2 级<b>只降低</b>，例如 a 小调 <Play seq={["E2 G#3 Bb3 D4", "A2 A3 C4 E4"]} gap={1}>E7♭5 → Am</Play>。</p>
      <p>十九世纪后半叶半音化达到高潮，关系大调的 ♭2、♯2 被引入小调，给小调带来 ♭4 级和 ♯4 级：♭4 常在属和导和弦中下行半音解决到 3 级；
        ♯4 多用于导七和弦、上行解决到 5 级，因瓦格纳爱用而称<b>瓦格纳和弦</b>，例如 a 小调 <Play seq={["G#3 B3 D#4 F4", "E3 B3 E4 G#4"]} gap={1}>G♯°7♯5 → E</Play>（它与 5-3 的增六和弦关系密切）。
        这些变化后来又被同名大调借去，但大调中 ♭4 等音于 3 级，所以大调 4 级只升高。</p>
      <Callout tone="key" title="常见变化音小结">
        <b>大调</b>：♭2、♯2、♯4 级（♭4 = 3 级，不算变化音）。<b>小调</b>：♭2、♭4、♯4 级（♯2 = 3 级，不算变化音）。
        两种调中 2 级最自由、最常变化；4 级的变化较晚近、较有限。
      </Callout>
      <p><b>副属变和弦</b>：属变和弦也可以用在副调上。大调副调引入它的 ♭2、♯2、♯4，例如下属调的 V+/IV 就是主音上的 <Play seq={["C", "C+", "F"]} gap={0.9}>C → C+ → F</Play>。
        更常见的是重属组：<Play seq={["D3 F#3 Ab3 C4", "G2 B3 D4 F4"]} gap={1}>V7♭5/V（D7♭5）→ G7</Play>、V+7/V，以及降三音的 vii°7♭3/V、升三音的 vii°7♯3/V 等。
        这些变化都把某个小三度变成减三度，转位后成为增六度——正是 5-3 增六和弦的伏笔。副调是小调时，则引入它的 ♭2、♭4、♯4。</p>
    </Block>

    {/* ───────── 5-2 拿坡里 ───────── */}
    <Block id="neapolitan" toc="拿坡里和弦" kicker="5-2 · 拿坡里和弦" title="♭II：以下属音为顶角的大三和弦"
      lead="点网格上的 D♭ 三角形：它紧贴 F 与 Fm，三个和弦共用下属音 F。">
      <Narrate />
      <Tonnetz cols={9} rows={4} center="C" highlight={["Db", "Fm", "F", "C", "G"]} unit={60} />
      <p>小调 <Play notes="D4 F4 Ab4" arp={0.06}>ii°（c 小调 D°）</Play> 中，F 与 A♭ 是下属和弦的骨干，根音 D 反而最不重要；把 D 降成 D♭，
        得到 <Play chord="Db" arp={0.06}>D♭</Play>，整体仍是下属功能，属于下属变和弦。♭2 级上的这个大三和弦叫<C id="neapolitan">拿坡里和弦</C>（那不勒斯和弦，记作 N），
        因巴洛克时期的那不勒斯乐派常用而得名；它比主和弦只高半音，符合弗里几亚调式，又称弗里几亚 II。同名大小调共用同一个 N。</p>
      <p>N 的三音（调式 4 级）常放在低音，叫拿坡里六和弦 N6：<Play notes="F3 Ab3 Db4" arp={0.06}>D♭/F</Play>。旋律为 4 级、小调 6 级或大调 ♭6 级时可选用。
        大调里它与 F 和弦相比，上方两个音都降了半音，格外尖锐：</p>
      <Tabs tabs={[
        { label: "小调：iv vs. N6", content: <Progression chords={["Cm", "Fm", "G7", "Cm", "Cm", "Db/F", "G7", "Cm"]} roman={["i", "iv", "V7", "i", "i", "N6", "V7", "i"]} bpm={80} beats={2} /> },
        { label: "大调：IV vs. N6", content: <Progression chords={["C", "F", "G7", "C", "C", "Db/F", "G7", "C"]} roman={["I", "IV", "V7", "I", "I", "N6", "V7", "I"]} bpm={80} beats={2} /> },
        { label: "先铺垫再用 N6", content: <Progression chords={["C", "F", "Fm", "Db/F", "G7", "C"]} roman={["I", "IV", "iv", "N6", "V7", "I"]} bpm={80} beats={2}
          caption="嫌太尖锐，就先用含 ♭6 级的 iv（或 ♭VI）做准备：A→A♭→A♭，一步步变暗。" /> },
        { label: "阻碍 / 变格", content: <Progression chords={["G7", "Db/F", "Db/F", "C"]} roman={["V7", "N6（阻碍终止）", "N6", "I（变格进行）"]} bpm={72} beats={[3, 3, 3, 4]} /> },
      ]} />
      <p><b>实例</b>：贝多芬《月光奏鸣曲》第一乐章开头，第 3 小节后半就是拿坡里六和弦（谱上记作 D/F♯），整体是 c♯ 小调 i7–VI–N6–V7–i。</p>
      <Score keySig="C#m" meter="C|" unit="1/8" tempo={54}
        abc={'"C#m"(3G,CE (3G,CE (3G,CE (3G,CE | "C#m7/B"(3G,CE (3G,CE (3G,CE (3G,CE | "A"(3A,CE (3A,CE "D/F#"(3A,=DF (3A,DF | "G#7"(3G,^B,F (3G,CE (3G,CD (3F,B,D | "C#m"[G,CE]8 |]'}
        bass={'[C,,C,]8 | [B,,,B,,]8 | [A,,,A,,]4 [F,,,F,,]4 | [G,,,G,,]4 [G,,,G,,]4 | [C,,C,]8 |]'}
        caption="谱例 5.1：贝多芬《月光》第 1–4 小节（第 5 小节简化为 i 和弦）。第 3 小节的 D 还原，就是 c♯ 小调的 ♭2 级。" />
      <p>电影《夺宝奇兵》主题（约翰·威廉姆斯，1981）的第二乐句同样用了拿坡里和弦：C 大调旋律下的和弦大致是
        <Play seq={["C", "Db", "G7", "C"]} gap={0.9}>C–D♭–G7–C</Play>，那一下 D♭ 带来英雄冒险式的「异域」色彩。</p>
      <h4>拿坡里七和弦与离调</h4>
      <p>ii° 降根音得到 <Play notes="F3 Ab3 C4 Db4" arp={0.06}>拿坡里七和弦 NΔ（D♭Δ，仍常以 F 为低音）</Play>，像是 ♭2 级音与小下属和弦 iv 的结合。
        N 还能与离调结合：</p>
      <ul>
        <li>N 是小下属调的 VI：<Progression chords={["C", "Db/F", "C7", "Fm", "C"]} roman={["I", "N6 = f: VI", "V7/iv", "iv", "I"]} bpm={80} beats={2} /></li>
        <li>副调的拿坡里和弦：大调中 N/iii = IV、N/V = ♭VI、N/ii = ♭III、N/vi = ♭VII（都已作为借用和弦出现过）；唯一的新面孔是 N/IV，建在 ♭5 级上：<Play seq={["C", "Gb", "C7", "F"]} gap={0.9}>C–G♭–C7–F</Play>，与本调关系很远。</li>
        <li>N 自己的离调：V/N 就是 ♭VI，V/V/N 就是 ♭III：<Progression chords={["C", "Ab", "Db/F", "G7", "C"]} roman={["I", "V/N（♭VI）", "N6", "V7", "I"]} bpm={80} beats={2}
          caption="肖邦《马祖卡》op.7 no.2（a 小调）与《降 b 小调夜曲》op.9 no.1（b 小调段落）都用了 V7/N–N(6)–V7。" /></li>
      </ul>
    </Block>

    <Block id="blend" toc="功能组渗透" kicker="5-2 · ♭2 级以外的变化音 · 功能组的渗透" title="越变越多义：功能体系开始松动">
      <Narrate />
      <p>大调特有的 ♯2 级也能用于下属组：Dm7 升根音得到 Dm7♯1（D♯–F–A–C），D♯ 与 F 构成减三度，所以仍常把 F 放在低音，形成 F–D♯ 增六度。
        小调特有的 ♭4 级也能用于下属，甚至进入大调，产生「小拿坡里和弦」（<Play notes="Fb3 Ab3 Db4" arp={0.06}>D♭m/F♭</Play>）等。♯4 级用在下属组较少见，不妨想想为什么。</p>
      <p>等音关系随之大增：Dm7♯1 = F7、D°♭3 = E7 省五音、Fm♭1 = E+……但等音和弦只是音响相同，记号、调与功能都不同：</p>
      <p><Play seq={["C", "F3 A3 C4 D#4", "C"]} gap={1}>C–Dm7♯1/F–C（变格回主）</Play> vs. <Play seq={["F7", "Bb"]} gap={1}>F7–B♭（属七解决）</Play></p>
      <p>和声变化带来<C id="function_blend">功能组的渗透</C>：</p>
      <ol>
        <li><b>每个音可配的和弦越来越多</b>：大调 4 级音从只能配 IV、ii、vii°，扩大到属七、导七、离调、借用与属变和弦；主音 1 级可配 I、IV、vi 及其七和弦，还有 iv、ii7、V7/V、vii°7/V、♭VI……</li>
        <li><b>单个和弦的功能越来越混合</b>：七和弦是两个三和弦的叠加，如 viiø 下方是 vii°（属）、上方是 ii（下属）。</li>
        <li><b>共同音与等音越来越多</b>：<Play seq={["F3 Ab3 C4 Db4", "F3 G3 B3 Db4"]} gap={1.1}>NΔ → V7♭5</Play> 保留 ♭2 与 4 级，另两音各降半音；
          vii°7♭3 既含 N 和弦又等于 ♭II7；vii°7♯3 与 iv° 等音，又是 V7 的另一种三全音替换；vii°♯3 还等于 V7♭5/ii、IV7♭5，以及关系小调的 Fr+6。</li>
      </ol>
      <Callout tone="quote" title="量变到质变">
        这些变化都能想办法与调性功能理论挂上钩，但体系也随之越来越复杂暧昧：调内与调外的界限模糊，「临时主音」挑战主音的地位，功能组互相渗透。
        古典时期明确的功能对比，在浪漫派让位于色彩和声，最终在十九世纪末、二十世纪初引发「调性革命」。
      </Callout>
    </Block>

    {/* ───────── 5-3 增六 ───────── */}
    <Block id="aug6" toc="增六和弦" kicker="5-3 · 三种增六和弦" title="从两侧夹击属音：意、法、德增六"
      lead="先听增六度如何「张开」到八度：A♭ 下行到 G，F♯ 上行到 G。">
      <Narrate />
      <p><Play seq={["Ab3 F#4", "G3 G4"]} gap={1.1}>A♭–F♯ → G–G</Play>：A♭ 与 F♯ 是属音 G 下方和上方的两个「导音」，构成增六度，再向外扩张到八度。
        这种双重半音逼近让属和弦得到更有力的支持。以增六度为框架，填进不同的音，就得到各种<C id="aug6">增六和弦</C>（C 大调与 c 小调相同）：</p>
      <Tabs tabs={[
        { label: "意大利 It+6", content: <div>
          <p>♭6–1–♯4：A♭–C–F♯。<Play notes="Ab2 C4 F#4" arp={0.05}>It+6</Play> → <Play seq={["Ab2 C4 F#4", "G2 B3 G4"]} gap={1.1}>解决到 V</Play></p>
          <Tonnetz cols={9} rows={4} center="C" notes={[8, 0, 6]} unit={48} compact />
          <p className="au-hint">等音于 A♭7 省五音（A♭7no5）。功能上相当于 vii°♭3/V（降三音的重属导三和弦）或 iv♯1；爵士看作 subV7/V 省五音。</p></div> },
        { label: "法国 Fr+6", content: <div>
          <p>♭6–1–2–♯4：A♭–C–D–F♯。<Play notes="Ab2 C4 D4 F#4" arp={0.05}>Fr+6</Play> → <Play seq={["Ab2 C4 D4 F#4", "G2 B3 D4 G4"]} gap={1.1}>解决到 V</Play></p>
          <Tonnetz cols={9} rows={4} center="C" notes={[8, 0, 2, 6]} unit={48} compact />
          <p className="au-hint">两对三全音（A♭–D、C–F♯），全音阶般的朦胧音色。等音于 A♭7♭5 与 D7♭5：即 V7♭5/V、iiø♯3，或 subV7/V 降五音。</p></div> },
        { label: "德国 Gr+6", content: <div>
          <p>♭6–1–♭3–♯4：A♭–C–E♭–F♯。<Play notes="Ab2 C4 Eb4 F#4" arp={0.05}>Gr+6</Play> → <Play seq={["Ab2 C4 Eb4 F#4", "G2 C4 Eb4 G4", "G2 B3 D4 G4"]} gap={1.1}>经 i64 解决到 V</Play></p>
          <Tonnetz cols={9} rows={4} center="C" notes={[8, 0, 3, 6]} unit={48} compact />
          <p className="au-hint">与完整的属七和弦 A♭7 等音（♭VI7 / VI7）。功能相当于 vii°7♭3/V 或 iv7♯1；爵士看作 subV7/V。直接到 V 会产生平行五度，所以常先经过 i64。</p></div> },
      ]} />
      <Score keySig="Cm" meter="4/4" tempo={66}
        abc={'"It+6"[C^Fc]2 "V"[=B,G=B]2 | "Fr+6"[CD^F]2 "V"[=B,DG]2 | "Gr+6"[CE^F]2 "i64"[CEG]2 | "V"[=B,DG]4 |]'}
        bass={'A,,2 G,,2 | A,,2 G,,2 | A,,2 G,,2 | G,,4 |]'}
        caption="c 小调的三种增六和弦及其解决：低音 A♭→G，上方 F♯→G，增六度向外张开成八度。" />
      <p>三个和弦都含主音、建在小调 6 级（大调 ♭6 级）上，在网格图上都以主音为顶角。国名只是标签，与国家没有必然联系。</p>
    </Block>

    <Block id="aug6why" toc="增六的理解与实例" kicker="5-3 · 增六和弦的理解 · 实例" title="一个和弦，三派解释；从莫扎特到《阿拉丁》">
      <Narrate />
      <p>增六和弦是「应用优先于理论」的典型：它的起源、根音、功能争论了几个世纪也没统一。英美考级（ABRSM、RCM）把它列为必考，斯波索宾《和声学教程》却不提这个名字，一律按重属变和弦处理；
        从声部运动角度反而最好理解（6-3）；流行与爵士则因等音关系把它并入属七和弦，看作各种属和弦的三全音替换。无论哪种解释，都说明它为什么走向属功能组。</p>
      <Callout tone="warn" title="Gr+6 与 V7/N：听起来一样，走向相反">
        记作 A♭7 的和弦，后接 D♭ 或 D♭m 时是拿坡里的离调属七（网格上向左下解决）：<Play seq={["Ab2 C4 Eb4 Gb4", "Db3 Db4 F4 Ab4"]} gap={1.1}>A♭7 → D♭</Play>；
        后接 C/G、G、G7 时就是增六和弦（向右上解决）：<Play seq={["Ab2 C4 Eb4 F#4", "G2 C4 E4 G4", "G2 B3 D4 G4"]} gap={1.1}>Gr+6 → C/G → G</Play>。
      </Callout>
      <h4>古典实例</h4>
      <Tabs tabs={[
        { label: "莫扎特《土耳其进行曲》", content: <Score keySig="Am" meter="2/4" tempo={72}
          abc={'"It+6"[A^d]2 | "Am/E"[Ace]2 | "E"[^GBe]2 | "Am"[Ace]2 |]'} bass={'F,,2 | E,,2 | E,,2 | A,,2 |]'}
          caption="谱例 5.4 的和声缩谱（K.331 回旋曲开头不久）：a 小调 It+6（F–A–D♯）解决到主和弦第二转位 Am/E。" /> },
        { label: "贝多芬《命运》", content: <Score keySig="Cm" meter="2/4" tempo={60}
          abc={'"Cm"[Gce] z | "It+6"[C^Fc] z | "V"H[=B,G=B]2 |]'} bass={'[C,,C,] z | [A,,,A,,] z | H[G,,,G,,]2 |]'}
          caption="谱例 5.5 末尾三个沉重和弦的缩写：Cm – It+6 – G（延长）。" /> },
        { label: "舒伯特《路标》", content: <Score keySig="Gm" meter="2/4" tempo={60}
          abc={'"Gm"[GBd]2 | "F#°7/Eb"[^FAc] "Fr+6"[GA^c] | "D"[^FAd]2 | "Gm"[GBd]2 |]'} bass={'G,,2 | E,,E,, | D,,2 | G,,2 |]'}
          caption="谱例 5.6 的和声缩谱：g 小调，E♭ 上的导七 F♯°7 中 F♯、C 各升半音，变成 E♭ 上的 Fr+6，再解决到 D。" /> },
        { label: "肖邦《离别练习曲》", content: <p>E 大调练习曲 op.10 no.3 第二行末尾：一串离调进行后，重属和弦 F♯7 位于低音的五音 C♯ 下降到 C，形成 C 上的法国增六和弦，
          随后解决到主和弦第二转位，形成这一段的小高潮：<Play seq={["C#3 A#3 E4 F#4", "C3 A#3 E4 F#4", "B2 B3 E4 G#4"]} gap={1.1}>F♯7/C♯ → Fr+6 → E/B</Play>（示意）。
          这体现了增六和弦与重属和声的血缘。</p> },
      ]} />
      <h4>现代用法：上方音不再上行</h4>
      <p>在现代，增六和弦更多被当作属七和弦（三全音替换）使用，后面常接大七、小七等七和弦，增六度的上方音不再上行，而是保持或下行半音，成为下一个和弦的七音。
        《粉红豹》主题（亨利·曼西尼，1963）中的 C7 相当于 e 小调的 Gr+6；动画电影《阿拉丁》（1992）里《Friend Like Me》的伴奏反复循环 i–Gr+6–V7：</p>
      <Progression title="《Friend Like Me》式循环（a 小调）" chords={["Am", "F7", "E7", "Am"]} roman={["i", "Gr+6（记作 F7）", "V7", "i"]} bpm={96} texture="pop" loop={false}
        caption="F7 中的 E♭（= D♯）没有上行到 E，而是下行半音到 E7 的七音 D。" />
      <p>浪漫派以后，增六和弦常不再进行到属功能，而去往重属原型、下属组等，色彩性越来越强。肖邦《e 小调前奏曲》op.28 no.4 里有两个 C7 式和弦：
        前一个省五音，接 F♯ø/C（<Play seq={["C3 Bb3 E4", "C3 A3 F#4"]} gap={1.2}>声部各自半音或全音挪动</Play>），按爵士思路是 B7 的 subV7；
        后一个之后是著名的停顿，再以 V7–i 结束。按增六和弦理解很顺，但肖邦记成 B♭ 而非 A♯，且把 B♭ 放在低音——也有人认为它是低音半音下行的结果，或是没有兑现的 V7/N。大师的笔触有时难以用理论说清。</p>
    </Block>

    <Block id="aug6more" toc="增六的推广" kicker="5-3 · 增六和弦的推广 · 特里斯坦和弦" title="增六度「随便加几个音」，以及特里斯坦和弦">
      <Narrate />
      <p>增六度与小七度在平均律下等音，三种增六和弦都能等音为含小七度的和弦——但意义、倾向和解决方式不同。反过来，从任意增六度/减三度出发加几个音，都可能造出一种「增六和弦」（C 调为例）：</p>
      <ul>
        <li>瑞士（英国）增六 Sw+6：Gr+6 的 E♭ 记作 D♯，<Play notes="Ab2 C4 D#4 F#4" arp={0.05}>A♭–C–D♯–F♯</Play>。</li>
        <li>奥地利增六 At+6：增七和弦 A♭+7 改记为 <Play notes="Ab2 C4 E4 F#4" arp={0.05}>A♭–C–E–F♯</Play>，可理解为 vii°♭3/V 一类重属变和弦。</li>
        <li>澳大利亚增六 Au+6：保留属和弦的 B、D，<Play notes="Ab2 B3 D4 F#4" arp={0.05}>A♭–B–D–F♯</Play> → <Play seq={["Ab2 B3 D4 F#4", "G2 B3 D4 G4"]} gap={1.1}>G</Play>，与 A♭ø 等音，即瓦格纳和弦 vii°7♯5。</li>
        <li>日本增六 Jp+6：<Play notes="Ab2 Bb3 D4 F#4" arp={0.05}>A♭–B♭–D–F♯</Play>，等音于 B♭+7、B♭+/A♭，或重属 D 同时升降五音（8-3 再谈）。</li>
      </ul>
      <p>这几个名字远不如意、法、德三种公认。再推广一步：以纯五度 G–D 为目标，用 A♭、C♯ 从两侧半音逼近，形成增三度 <Play seq={["Ab3 C#4", "G3 D4"]} gap={1.1}>A♭–C♯ → G–D</Play>，
        也能构造「趋近和弦」。这种「双重趋近音」思路是重要的现代技法，7-3 详述。</p>
      <h4>特里斯坦和弦</h4>
      <Score keySig="Am" meter="6/8" unit="1/8" tempo={40}
        abc={'A, | F3- F2 E | "^特里斯坦和弦"^G3- G2 A & ^D6 | "E7"^A B3- B z & =D3- D z2 |]'}
        bass={'z | z6 | [F,B,]6 | [E,^G,]3- [E,G,] z2 |]'}
        caption="谱例 5.11：瓦格纳《特里斯坦与伊索尔德》序曲开头（a 小调部分，略去后面 c 小调的重复）。第 3 小节的 F–B–D♯–G♯ 即特里斯坦和弦，随后到 E7。" />
      <p>它出现在与主人公特里斯坦相关的动机里，贯穿整部歌剧，音响很不协和。<C id="tristan">特里斯坦和弦</C>虽与 Fø 等音，在 a 小调里却不好解释：</p>
      <ul>
        <li><b>澳大利亚增六 / 瓦格纳和弦</b>：从属和弦 E–G♯–B 出发，保留 G♯、B，加上 E 上下半音 F、D♯；即 G♯°7 五音升高。</li>
        <li><b>法国增六</b>：原形是 F–A–C♭–D♯（= B7♭5），G♯ 是倚音，随后到 A 再接 E7。</li>
        <li>a 和声小调导七 G♯°7，D♯ 是外音；或 F♯ 大调的 E♯ø 等音；或 Bø 的变化（保留 B–F，另两音升降）；或 G7 的一种三全音替换。</li>
        <li>拆成两层：低音 F 加上方 G♯m，即 G♯m/F，甚至双调性。</li>
        <li><b>横向理解</b>：最高声部 <Play notes="G#4 A4 A#4 B4" melodic gap={0.5}>G♯–A–A♯–B</Play> 半音上行（「爱欲」），次高声部 <Play notes="F4 E4 D#4 D4" melodic gap={0.5}>F–E–D♯–D</Play> 半音下行（「悲叹」）：「和弦」只是两条线交错的副产物（7-2）。</li>
      </ul>
      <p>后面的 E7 也没有解决，一片沉默后直接跳到另一个调。整首序曲刻意回避明确的终止，调性始终游移，象征「求而不得」。
        这部作品被誉为二十世纪音乐的先声——而这种反叛本身，恰恰是对功能规律深刻理解之后的「逆向运用」。理论众说纷纭时记住：最终听的是声音，乐谱是一手材料，分析只是二手解读。</p>
    </Block>

    <Block id="otherdeg" toc="其他音级的增六" kicker="5-3 · 其他音级上的增六和弦" title="增六 ⇄ 属七：通往远关系调的暗门">
      <Narrate />
      <p>增六和弦也能与离调结合。最值得一提的是 <Play chord="F7" arp={0.05}>F7</Play>：它等音于 C 大调下属变和弦 Dm7♯1，又是关系小调 a 小调的 Gr+6、副属和弦 B7（V7/iii）的三全音替换，还是同主音 c 爵士小调的 VI7。</p>
      <p>柴可夫斯基等人认为 ♭6 级以外也能建增六和弦，尤其是 ♭2 级：它既是（小）下属调的增六，也等于本调的属变和弦（It+6 = vii°♭3、Fr+6 = V7♭5、Gr+6 = subV7），可以直接接主和弦。
        舒伯特《A 大调钢琴奏鸣曲》D959 第一乐章结尾的终止式里，♭2 级上的 It+6 就充当了属和弦——「三全音替换」式的用法早已有之。</p>
      <p>Gr+6 与属七和弦的等音还能用来做远关系转调：</p>
      <Tabs tabs={[
        { label: "Gr+6 当作 V7", content: <Progression chords={["C", "Ab7", "Db"]} roman={["C: I", "Gr+6 = D♭: V7", "D♭: I"]} bpm={72} beats={[3, 3, 4]}
          caption="C 调的 Gr+6（A♭–C–E♭–F♯）记成 A♭7，就是 D♭ 大调的属七：主音只升半音，调号却差了五个。" /> },
        { label: "V7 当作 Gr+6", content: <Progression chords={["C", "G7", "B/F#", "F#7", "B"]} roman={["C: I", "V7 = B: Gr+6", "B: I64", "V7", "I"]} bpm={72} beats={[3, 3, 2, 2, 4]}
          caption="反过来，C 调的 G7（G–B–D–F = G–B–D–E♯）可以理解为 B 大调的 Gr+6，主音下降半音。" /> },
      ]} />
      <p>各个副属和弦也都能这样做。加入拿坡里和增六和弦的离调后，第四章图 4.15、4.16 里最后的空白也被覆盖了：所有调外和弦都能与本调取得联系。转调中的妙用留待 11-6。</p>
    </Block>

    <Block id="pfunc" toc="属前与全功能" kicker="5-3 · 属前功能组 · 全功能理论" title="T–P–D–T，以及沿五度圈无限延伸的功能组">
      <Narrate />
      <p>2-2 的功能循环 T–S–D–T 中，S 是承上启下的环节。现在能放在 D 之前的和弦多得多，一些理论把它们合并为<C id="predominant">属前功能组</C> P：</p>
      <ul>
        <li>主和弦第二转位 I64、i64（6-4 详述）</li>
        <li>下属功能组 S：IV(Δ)、ii(7)、vi(7)</li>
        <li>借用和弦：iv(7)、ii°、iiø、♭III、♭III+、♭VI、♭VII(7)</li>
        <li>属变和弦：V+(7)、V(7)♭5；重属组 DD：V(7)/V、vii°(7)/V、viiø/V、iii(7)/V</li>
        <li>拿坡里和弦 N(Δ)、N6 等下属变和弦；增六和弦 It+6、Fr+6、Gr+6</li>
      </ul>
      <Progression title="一条 T–P–P–D–T" chords={["C", "F", "Db/F", "Ab7", "G7", "C"]} roman={["T：I", "P：IV", "P：N6", "P：Gr+6", "D：V7", "T：I"]} bpm={80} beats={2}
        caption="同一功能组连用时，把更不稳定、更不协和的放在后面，让力度逐步积累。" />
      <p>古典时期功能进行「短平快」：不协和程度不深、有铺垫、解决干脆，以海顿、莫扎特为典范。浪漫派则在属和弦到来之前大段铺垫、属和弦之后又用阻碍终止推迟主和弦，
        制造更多期待；流行和声的「刹车和弦」只是其中最简单的一种。</p>
      <h4>全功能理论</h4>
      <p>D 组以 G 为核心、导音 B 为特性音；G 的属和弦 D 是重属 DD（特性音 F♯）；D 的属和弦 A 代表三重属 3D（特性音 C♯）……下属方向 F 是 S、B♭ 是 SS、E♭ 是 3S……
        同名小调亦然。每组以一个三和弦为核心，其三音就是特性音。点下面的核心和弦试听：</p>
      <div className="card" style={{ overflowX: "auto" }}>
        {[FUNC_MAJ, FUNC_MIN].map((row, r) => <div key={r} style={{ display: "flex", gap: 6, margin: "4px 0", alignItems: "center" }}>
          <small style={{ width: 52 }}>{r ? "c 小调" : "C 大调"}</small>
          {row.map(([f, ch]) => <Play key={f} chord={ch} arp={0.04}><b>{f}</b>&nbsp;{ch.replace("b", "♭")}</Play>)}
        </div>)}
        <div className="au-hint">← 下属方向 · · · 主 · · · 属方向 →（主音确定后，所有和弦都能在这条五度序列上找到位置）</div>
      </div>
      <p>这就是华萃康的<C id="total_function">全功能理论</C>（详见其《色彩和声》）：从功能角度把调性扩张到极致，单一主音的影响辐射到所有音。
        相邻功能组会「瓜分」较弱的组（功能转移）：大调 SS 以下被小调组吸收，小调 dd 以上被大调组吸收。按此理论，增六和弦接近 s 组，拿坡里和弦属于 ss 组。
        「属—主」的五度趋向可推广到所有功能组：在图上都有向左解决的倾向；还隐约可见小三度轴线上的功能相似性（A 与 C、E♭m 与 Cm 都像「主」），第八章再谈。
        勋伯格的「单调性」原则与调性领域（Region）图也异曲同工：离调、交替、变和弦都是向周围领域借音，仍在本调主音统辖之内。</p>
      <p>七种中古调式也能放进这张图（进阶篇细讲）：
        <Play notes="C4 D4 E4 F#4 G4 A4 B4 C5" melodic gap={0.22}>Lydian</Play>
        <Play notes="C4 D4 E4 F4 G4 A4 B4 C5" melodic gap={0.22}>Ionian</Play>
        <Play notes="C4 D4 E4 F4 G4 A4 Bb4 C5" melodic gap={0.22}>Mixolydian</Play>
        <Play notes="C4 D4 Eb4 F4 G4 A4 Bb4 C5" melodic gap={0.22}>Dorian</Play>
        <Play notes="C4 D4 Eb4 F4 G4 Ab4 Bb4 C5" melodic gap={0.22}>Aeolian</Play>
        <Play notes="C4 Db4 Eb4 F4 G4 Ab4 Bb4 C5" melodic gap={0.22}>Phrygian</Play>
        <Play notes="C4 Db4 Eb4 F4 Gb4 Ab4 Bb4 C5" melodic gap={0.22}>Locrian</Play>（按从亮到暗排列，每次只变一个音）。</p>
    </Block>

    {/* ───────── 5-4 高叠和弦 ───────── */}
    <Block id="stack" toc="高叠和弦" kicker="5-4 · 七和弦的延伸" title="搭积木：从 G 叠到 G13"
      lead="选择叠到几层，再给五、九、十一、十三音加上升降号。每块积木都能单独听。">
      <Narrate />
      <StackBuilder />
      <p>G7 的七音 F 上继续用调内音叠三度：大九度 A、纯十一度 C、大十三度 E，得到属九 G9、属十一 G11、属十三 G13（V9、V11、V13），统称<C id="extended_chord">高叠和弦</C>。
        七音以上的音叫延伸音，最高的叫冠音。再往上就回到 G（十五度），所以传统认为最多叠到七个音的十三和弦。历史上高叠和弦从属和弦开始用，所以属系列最常见、记号最简单。</p>
      <p>推算时别一层层数三度，而要看根音到各音的音程。爵士用「首调」标记：根音为 1，G13 的音是 1、3、5、♭7、9、11、13。
        九度与二度音名相同，但应看作「七度 + 三度」：<Play notes="G3 B3 D4 F4 A4" arp={0.05}>九音在上方（复音程）</Play> vs. <Play notes="G3 A3 B3 D4 F4" arp={0.05}>压进八度内（二度堆积）</Play>，后者浑浊得多（6-1 详述）。</p>
      <p>其他高叠和弦同理：<Play notes="D3 F3 A3 C4 E4 G4 B4" arp={0.05}>Dm13</Play>（小七和弦基础，三音为 ♭3）、<Play notes="C3 E3 G3 B3 D4 F4 A4" arp={0.05}>CΔ13</Play>。
        它们可以代替各自的三和弦、七和弦：<Play seq={["D3 C4 E4 F4 A4", "G2 F3 A3 B3 E4", "C3 B3 D4 E4 A4"]} gap={1.2}>Dm9–G13–CΔ(9,13)</Play>。
        叠得越高色彩越「Fat」，功能却越暧昧（G9 = G + Dm，属中带下属）。古典里多限于 V9、ii9，更常把延伸音当作和弦外音；十九世纪渐多，为爵士和声做了准备。</p>
      <Callout tone="key" title="根音与上方音的「循环矩阵」（原书图 5.44）">
        以 C 为根，其余十一个音都能在和弦里找到位置：♭9、9、♯9/♭3、3、11、♯11/♭5、5、♭13/♯5、13、♭7、7。换根音只是把整张表平移。
        反过来看，任何一个旋律音都能配上任意根音的某种和弦——和声编配的空间因此大大扩展。在网格图上，这些音恰好落在以根音为中心的一块平行四边形「晶格」里。
      </Callout>
    </Block>

    <Block id="alt" toc="变化音与 alt" kicker="5-4 · 高叠和弦的变化音" title="♭9、♯9、♯11、♭13：属和弦的香辛料">
      <Narrate />
      <p>G13 中根音、三音、七音是骨干，较次要的五、九、十一、十三音都能升降：五音与九音可升可降；十一音降低会与三音重合，所以只能升（♯11 = ♭5）；
        十三音升高会撞上七音，所以只能降（♭13 = ♯5）。在属和弦基础上变化，就得到各种<C id="altered_dominant">变化属和弦</C>：</p>
      <p>
        <Play notes="G2 F3 B3 E4" arp={0.04}>G13（躯壳 + 13）</Play>{" "}
        <Play notes="G2 F3 B3 Ab4" arp={0.04}>G7♭9</Play>{" "}
        <Play notes="G2 F3 B3 Bb4" arp={0.04}>G7♯9</Play>{" "}
        <Play notes="G2 F3 B3 C#5 E5" arp={0.04}>G13♯11</Play>{" "}
        <Play notes="G2 F3 B3 Eb4" arp={0.04}>G7♭13</Play>{" "}
        <Play notes="G2 F3 B3 Db4 Eb4 Ab4 Bb4" arp={0.03}>G7alt（全部变化音）</Play>
      </p>
      <p>逐个写出很繁琐（G7♭5♭9、G7♭9♯11♭13……），于是有人一律记作 G7alt。alt 和弦的「标准结构」含全部变化音（V7♭5♯5♭9♯9），七个音构成「变化音阶」，即从 7 级开始的爵士小调；
        实践中具体用哪些由乐手决定，最常见的是 V7♯11 和来自和声小调的 V7♭9。即使谱上只写 G7，乐手也会视情况加入。其他和弦同理，如小调的 iiø♭9（ii7♭5♭9）。</p>
      <Progression title="《秋叶》（Autumn Leaves）式的 2–5–1" chords={["Cm7", "F7", "Bbmaj7", "Ebmaj7", "Aø", "D7", "Gm"]}
        roman={["B♭: ii7", "V7", "IΔ", "IVΔ", "g: iiø", "V7(♭9)", "i"]} bpm={92} texture="pop"
        caption="前半是 B♭ 大调 2–5–1，后半是 g 小调 2–5–1。原书所用版本在小和弦前的 V7 上加了 ♭9；播放器只奏 D7，可点下方按钮听 D7♭9。" />
      <p>对比小调属和弦的两种颜色：<Play seq={["D3 C4 F#4 A4", "G3 Bb3 D4 G4"]} gap={1.1}>D7 → Gm</Play> 与 <Play seq={["D3 C4 F#4 Eb5", "G3 Bb3 D4 G4"]} gap={1.1}>D7♭9 → Gm</Play>。
        在充满高叠和弦的环境里，七和弦反而显得单纯，可以不准备、不解决，甚至当主和弦——稳定与否，取决于所处的环境。</p>
    </Block>

    <Block id="avoid" toc="省略与避免音" kicker="5-4 · 和弦音的省略与层级 · 避免音" title="骨干、延伸、避免：给每个音排座次">
      <Narrate />
      <p>音太多会浑浊，乐器和手指也有限（吉他六根弦，一只手五根手指），所以要省略。传统规则：根音（叠置基础）、冠音（决定高度）、三音和七音（决定性质）、变化音（决定特色）尽量保留；
        <b>五音优先省略</b>（增、减和弦则五音比三音重要）。但这只是基本规则——十九世纪后半叶起三音、七音也开始变化，省掉三音的空五度（摇滚的 Power chord）在印象派、爵士、摇滚与中国民族和声中都很常见：
        <Play notes="E2 B2 E3">空五度</Play>。</p>
      <p>爵士进一步分层：三音与七音是<b>导引音</b>（增减和弦为五音），根音加导引音是<b>躯壳排列</b>：<Play notes="G2 B3 F4">G7 躯壳</Play>；
        连根音也省掉是<b>无根音排列</b>：<Play notes="F3 A3 B3 E4">G13 无根音</Play>（vii° 可看作省根音的 V9，<Play notes="B3 D4 F4 Ab4" arp={0.05}>vii°7</Play> 可看作 V7♭9 省根音）。
        注意乐队里贝斯负责低音，键盘、吉他谱上「省根音」可能只是分工造成的假象。七和弦外的延伸、变化音统称张力音，像「扩展插件」一样彼此独立、可增可减：G13 一般只要 G、B、F、E 必备。</p>
      <p>张力音里太刺耳、抢风头的叫<C id="avoid_note">避免音</C>。以 C 大调 2–5–1 为例，对比含与不含避免音的排列：</p>
      <ul>
        <li>Dm7 上的 B（13 音，与 F 成三全音，色彩偏向属）：<Play notes="D3 C4 F4 A4">Dm7</Play> vs. <Play notes="D3 C4 F4 B4">Dm7 + B</Play></li>
        <li>G7 上的 C（11 音，与 B 成小九度）：<Play notes="G2 F3 B3 E4">G13</Play> vs. <Play notes="G2 F3 B3 C5">G7 + C</Play>；升成 C♯ 就成了 <Play notes="G2 F3 B3 C#5">G7♯11</Play>；
          让 C 挂留、B 退出，则成 <Play seq={["G2 F3 C4 D4", "G2 F3 B3 D4"]} gap={1}>G7sus → G7</Play>（7-5）。</li>
        <li>CΔ 上的 F（11 音，与 E 成小九度、与 B 成三全音）：<Play notes="C3 B3 E4 A4">CΔ6/9 色彩</Play> vs. <Play notes="C3 B3 E4 F5">CΔ + F</Play></li>
      </ul>
      <p>还有一些音会改变和弦性质：Dm7 上的 ♯11（= A♭，变成 Dø 的减五度）、G7 上的 F♯（大七度）、CΔ 上的 ♯9（= E♭，小三度）、♭13（= G♯，增五度）、♯13（= B♭，小七度）。</p>
      <Callout tone="warn" title="避免音不是禁令">
        「禁止小九度/三全音延伸音」的口诀过于机械：属和弦本就以三全音为骨干，几乎百无禁忌；而有些非小九度、非三全音的音反而要小心。避免音是约定俗成的经验，
        人们对不协和的容忍度一直在提高。可以用音色、音区、弱拍、短时值、错开时间等办法「软化」它；有时甚至故意用它制造滑稽、尴尬的效果。
        最好的办法：从七和弦骨干出发，一个一个加音，边加边听。
      </Callout>
      <p>原书图 5.45 把完整的 G13♯11 按层级排开：把 ♯11 音 C♯ 放到底下当根音，整个和弦就等音为 C♯7alt，骨干三全音 B–F 不动——
        <Play seq={["G2 F3 B3 C#4 E4 A4", "Db2 F3 B3 E4 A4", "C3 E3 G3 B3"]} gap={1.2}>G13♯11 → C♯7alt → CΔ</Play>：alt 和弦相当于 V13♯11 的三全音替换。
        altered 音阶就是某个大调升高 1 级（或某大调 1 级不动、其余六音都降半音）。流行和爵士谱往往不计较拼写（C♯7alt 的三音本该写 E♯，常写成 F）。</p>
    </Block>

    <Block id="chordscale" toc="和弦—音阶理论" kicker="5-4 · 爵士的和弦—音阶理论" title="和弦即调，调即和弦"
      lead="C 大调的七个音上，各有一个调式、一个十三和弦。先听音阶，再听同样的音叠成的和弦。">
      <Narrate />
      <Tabs tabs={MODES.map(m => ({ label: m.label, content: <p>
        <Play notes={m.scale} melodic gap={0.24}>音阶</Play> <Play notes={m.chord} arp={0.06}>{m.name}</Play>
        <span className="au-hint">　同一组白键音，换个根音就是另一种颜色。</span></p> }))} />
      <p>早期爵士独奏只用和弦音，一个七和弦上只有四个音可用。把更多音以延伸、变化音的名义纳入和弦后，G13、Dm13 就包含了 C 大调全部七个音；G7♭9♭13、Dø13♭9 涵盖 c 和声小调全部音。
        只要不出音阶，任何旋律音都是高叠和弦的一部分，不再有「和弦外音」——乐手只要分清骨干、延伸、变化、避免音。于是思维从纵向转向横向，1950 年代以 George Russell 的
        《Lydian Chromatic Concept of Tonal Organization》（1953）为发端，形成了<C id="chord_scale">和弦—音阶理论</C>与调式爵士（Modal Jazz）。</p>
      <p>古典是「一个大/小调下七个音级和弦」，爵士是「一个自然音阶下七个调式/高叠和弦」：「D Dorian」「F Lydian」既指和弦也指音阶。
        和弦变换时调式音阶也随之变换，非功能、色彩性的和声比重大增，调感变得多变、瞬时、流动。注意：中古调式历史悠久，并非爵士的专利。</p>
      <h4>G7 上能用哪些音阶？</h4>
      <p>兼容原则：只要音阶含有和弦的骨干音，就能「速配」，其余音按延伸、变化、避免音处理。G7 上至少有七条：</p>
      <div className="card">{G7SCALES.map(([n, s, w]) => <div key={n} style={{ margin: "4px 0" }}>
        <Play notes={s} melodic gap={0.2}>{n}</Play> <small>{w}</small></div>)}
        <div className="au-hint">先点 <Play notes="G2 F3 B3" arp={0.03}>G7 躯壳</Play> 当背景，再点音阶，听哪条最合你的口味。</div>
      </div>
      <p>反过来，同一条音阶也能配不同和弦：G 上的 C 大调音阶，强调 G、B、F 就是 G7（C 为避免音），强调 G、C、F 就是 <Play notes="G2 F3 C4 D4">G7sus</Play>（B 成为避免音）；
        a♭ 爵士小调第七音阶，强调 G、D♭、F 是 <Play notes="G2 F3 Bb3 Db4">Gø</Play>，强调 G、B（C♭）、F 是 G7alt。和弦与音阶是<b>多对多</b>：即使 Dm7–G7–CΔ，也可以在 Dm7 上用 c 爵士小调、G7 上用 a♭ 爵士小调（alt）、CΔ 上用 G 大调（Lydian）即兴。
        与其背「搭配清单」和「避免音表」，不如自己任选和弦与音阶，分析、试听、归纳——否则就成了「爵士教条主义」。</p>
      <CompareTable left="古典和声（调性功能）" right="爵士和声（和弦—音阶）" rows={[
        { aspect: "G7 上的 A、C、E", left: "和弦外音，只在旋律里出现，需要解决", right: "九、十一、十三音，是和弦的一部分（C 为避免音）" },
        { aspect: "规则的写法", left: "「正面清单」：规定该怎么做、不协和音怎样解决", right: "「负面清单」：只标出雷区，其余自由" },
        { aspect: "和弦与调", left: "和弦是调的碎片，团队作战（团体操）", right: "一个和弦即一个调式，独立登场（时装秀）" },
        { aspect: "调性", left: "单一、持久、明确、稳定", right: "多变、瞬时、松散、流动；局部仍有临时主音" },
        { aspect: "记谱", left: "严式：精确全面，忠实呈现", right: "宽式：抓大放小，留出即兴空间" },
        { aspect: "共同点", left: "也发展出色彩和声与调式应用", right: "保留 2–5–1、五度圈、三全音替换等功能思路" },
      ]} />
      <Callout tone="quote" title="工具箱，而不是门派">
        古典与爵士、调性与调式、功能与色彩不是水火不容，而是像生物演化一样遗传与变异并存。学各种理论就是扩充自己的「工具箱」：工具越全，越能更好地完成作品；
        囿于门户之见、党同伐异，只会画地为牢。
      </Callout>
    </Block>

    <Block id="poly" toc="复合与斜线和弦" kicker="5-4 · 高叠和弦的更多理解 · 斜线和弦的乱象" title="上层结构、复合和弦与「摩天大楼」">
      <Narrate />
      <p>斜线后的低音不是和弦音时，可能构成高叠和弦：<Play notes="G2 B3 D4 F4 A4">Bø/G = G9</Play>；<Play notes="C3 G3 B3 D4 F4">G7/C</Play> 可看作省九音的 G11。
        写成斜线是为了演奏方便：现代乐队里贝斯负责低音，键盘、吉他只看上方。</p>
      <p>爵士的<b>上层结构</b>（Upper Structure）是七和弦上方再叠一个和弦：G13 = G7 + Am，记作 G7 USii；G13♯11 = G7 + A，即 G7 USII：
        <Play notes="G2 B2 F3 A4 C#5 E5" arp={0.05}>G7 USII</Play>。古典里相近的概念是<b>复合和弦</b>（Polychord）：两个以上和弦上下相叠。
        G13 = G7 + Am = G + FΔ，甚至 = G + B° + Dm + F + Am 五个三和弦；G7♭9♯11 含 G–B–D–F–A♭–C♯，可看作 G 与 D♭ 的复合。</p>
      <p>二者音可能相同，侧重点不同：高叠和弦强调整体，复合和弦强调分层，常在音区、乐器、音色上加以区分；两层的调关系越远，层次越分明。</p>
      <ul>
        <li>理查·施特劳斯《厄勒克特拉》的<b>厄勒克特拉和弦</b> E–B–D♭–F–A♭：<Play notes="E2 B2 Db4 F4 Ab4" arp={0.05}>听</Play>，可看作 D♭7♯9 的转位（D♭7/E），或 E 与 D♭ 两个三和弦的复合。</li>
        <li>斯特拉文斯基《彼得鲁什卡》的<b>彼得鲁什卡和弦</b>：相距三全音的 C 与 F♯ 两个大三和弦复合，<Play notes="C4 E4 G4 F#5 A#5 C#6" arp={0.04}>听</Play>，是多调性音乐的先驱。</li>
      </ul>
      <p>传统认为十三和弦封顶，因为十五音会重复根音；可如果刻意避开重复呢？从 C13♯11 继续叠，直到用尽十二个音，就是「二十三和弦」：
        <Play notes="C3 E3 G3 Bb3 D4 F#4 A4 C#5 E#5 G#5 B5 D#6" arp={0.06}>谱例 5.19 的 C 上「二十三和弦」</Play>。
        这类「摩天大楼和弦」音响混沌、极为罕见，现实的用法是拆成若干和弦的复合，或铺成旋律线条。</p>
      <Callout tone="info" title="斜线和弦的乱象">
        「和弦/低音」这种记号是个大杂烩：低音若是和弦音，是转位（6-4）；在根音下方三度，是向下延伸；在冠音上方三度，是高叠和弦的转位；都不是，则叫混合和弦（Hybrid），有时可看作挂留和弦（7-5）。
        「分割和弦」「复合和弦」等中文术语各家用法不一；本书用「复合和弦」专指 Polychord。流行与爵士理论生长自由而缺乏梳理，各地区、各资料又各自转译，
        作者呼吁先统一术语，再争论观点。
      </Callout>
    </Block>

    <Block id="ear" toc="听音练习" kicker="动耳朵" title="听音练习：变化与延伸" lead="不看谱，只用耳朵。每题可以反复听。">
      <EarQuiz items={[
        { q: "这个属和弦是原型 G，还是升五音的 G+？", play: { chord: "G+", arp: 0.05 }, options: ["原型 G", "升五音 G+"], answer: 1, why: "G–B–D♯：两个大三度叠起来，悬而未决、急着往 C 走。" },
        { q: "听这个属到主：低音是五度下行，还是半音下行？", play: { seq: ["Db7", "C"], gap: 1.1 }, options: ["五度下行（V7–I）", "半音下行（subV7–I）"], answer: 1, why: "D♭7 → C：三全音替换，低音只滑了半音。" },
        { q: "i 之后的第二个和弦是 iv（Fm），还是拿坡里六和弦？", play: { seq: ["Cm", "F3 Ab3 Db4", "G7", "Cm"], gap: 1 }, options: ["iv（Fm）", "拿坡里六和弦 N6"], answer: 1, why: "F–A♭–D♭：最上方的 D♭ 比 iv 的 C 高半音，色彩更尖锐。" },
        { q: "这个增六和弦里有两对三全音、带点全音阶的朦胧感——是哪一种？", play: { notes: "Ab2 C4 D4 F#4", arp: 0.05 }, options: ["意大利 It+6", "法国 Fr+6", "德国 Gr+6"], answer: 1, why: "A♭–C–D–F♯：A♭–D 与 C–F♯ 两对三全音，是法国增六。" },
        { q: "两个 G 属和弦，哪一个含有避免音（11 音 C）？", play: { seq: ["G2 F3 B3 E4", "G2 F3 B3 C5"], gap: 1.3 }, options: ["第一个", "第二个"], answer: 1, why: "C 与三音 B 构成小九度，最刺耳；第一个是 G13（13 音 E），平顺得多。" },
        { q: "这个和弦是纯粹的 G7，还是加了延伸音的 G13？", play: { notes: "G2 F3 B3 E4", arp: 0.05 }, options: ["G7", "G13"], answer: 1, why: "最上方的 E 是 13 音：G–F–B–E 是 G13 常见的四音排列（五、九、十一音省略）。" },
      ]} />
    </Block>

    <Block id="concepts" toc="概念卡" kicker="核心概念" title="本章 14 个概念"><ConceptGrid /></Block>
    <Block id="map" toc="概念图" kicker="概念关系" title="它们怎样连在一起"><ConceptMap /></Block>

    <Block id="quiz" toc="自测" kicker="检验理解" title="自测">
      <Quiz questions={[
        { q: "为什么属和弦通常变化五音，而不轻易变化三音？", options: ["五音不在调内", "变化三音会改变和弦性质，变成借用或离调", "三音没有倾向性", "五音是根音的重复"], answer: 1, why: "B 降为 B♭ 就成了 Gm；变五音则根音、性质、功能都保持，才算「变和弦」。" },
        { q: "D♭7 能代替 G7 解决到 C，最根本的原因是？", options: ["两者根音相同", "两者共享 B（C♭）–F 这对三全音", "D♭ 是 C 大调的调内音", "两者都是小七和弦"], answer: 1, why: "三全音是属功能的核心；保留它，根音移动三全音，属功能仍在。" },
        { q: "C 大调中的拿坡里六和弦 N6 是？", options: ["D♭–F–A♭，D♭ 在低音", "F–A♭–D♭，F 在低音", "D–F–A，F 在低音", "F–A–C"], answer: 1, why: "♭II 的三音（调式 4 级 F）在低音，记作 D♭/F。" },
        { q: "C 调的德国增六和弦与哪个和弦等音？", options: ["D7", "G7", "A♭7", "D♭7"], answer: 2, why: "A♭–C–E♭–F♯ = A♭–C–E♭–G♭ = A♭7；后接 D♭ 则是 V7/N，后接 C/G 或 G 才是增六。" },
        { q: "为什么属和弦的十一音只能升、不能降？", options: ["降了会变成三音", "降了会与三音重合（♭11 = 3）", "规则规定", "十一音是根音的重复"], answer: 1, why: "G 上的 C 降半音就是 B，与三音重合；所以只有 ♯11（= ♭5）。" },
        { q: "关于避免音，下列说法最恰当的是？", options: ["避免音绝对不能用", "所有小九度都必须避免", "它是需要格外小心处理的音，可以软化、升降或刻意利用", "只有爵士才有避免音"], answer: 2, why: "避免音是经验约定，标准因人而异；可通过音区、时值、升降等方式使用。" },
      ]} />
    </Block>

    <Block id="end" toc="小结">
      <Takeaways items={[
        "变和弦只动次要音（属和弦的五音、导和弦的三音），保持根音、性质、功能；变化音让紧张更紧、解决更急。大调常变 ♭2、♯2、♯4，小调常变 ♭2、♭4、♯4。",
        "三全音替换保留属七和弦的三全音、把根音移动三全音：♭II7 代替 V7；它与古典的 vii°7♭3 等音，殊途同归。",
        "拿坡里和弦 N 是 ♭2 级大三和弦，常以 N6 出现；增六和弦用 ♭6 与 ♯4 从两侧夹击属音，意、法、德三种只差填充音，Gr+6 与属七等音。",
        "变化带来等音与多义，功能组互相渗透：属前功能 P、全功能理论试图收编一切，特里斯坦和弦却预示了调性的瓦解。",
        "高叠和弦叠到十三音；♭9、♯9、♯11、♭13 是属和弦的香料；导引音、延伸音、避免音给每个音分层；爵士由此走向「和弦即调」的和弦—音阶理论。",
      ]} />
      <Callout tone="key" title="上半部分回顾：四条和声规律">
        <b>0</b>：一切以实际听感为准。<b>1</b>：和声的原动力是稳定与不稳定、协和与不协和的对比变化。
        <b>2</b>：和弦要含有旋律中的部分或全部音。<b>3</b>：和声可以分成若干声部，各自连接、变化。
      </Callout>
      <Bridge><p>到这里，本书上半部分「用什么和弦」就讲完了：网格图带我们认识了大小调的和弦、功能、离调、借用，以及替换、延伸、半音三种变化手法。
        但同一个 <Play seq={["Dm7", "G7", "Cmaj7"]} gap={0.9}>Dm7–G7–CΔ</Play>，排列和连接得好不好，效果天差地别——你已经听到：增六度要张开、三全音要收拢、延伸音要放在上方。
        下一章「排列与连接」就来回答：和弦的每个音放在哪里，声部之间又该怎样走。</p></Bridge>
    </Block>

    <Block id="gloss" toc="术语" title="术语表">
      <Glossary terms={[
        { term: "Altered chord", zh: "变和弦", def: "根音、性质、功能不变，次要音升降半音的和弦；爵士中专指变化的属和弦。" },
        { term: "Enharmonic chords", zh: "等音和弦", def: "记法不同、各音音高相同的和弦，如 B°7♭3 与 D♭7。" },
        { term: "Diminished 3rd / Augmented 6th", zh: "减三度 / 增六度", def: "两个半音 / 十个半音；变和弦里的减三度常转位为增六度。" },
        { term: "Tritone substitution (subV7)", zh: "三全音替换", def: "保留三全音、根音移动三全音：♭II7 代替 V7。" },
        { term: "Upper leading tone", zh: "上导音", def: "♭2 级，半音下行到主音。" },
        { term: "Common-tone substitution", zh: "共同音替换", def: "保留原和弦部分音、改变其余音得到的替代和弦。" },
        { term: "Neapolitan chord (N, N6)", zh: "拿坡里和弦", def: "♭2 级大三和弦，常以三音在低音的 N6 出现。" },
        { term: "Augmented 6th chord (It/Fr/Gr+6)", zh: "增六和弦", def: "以 ♭6–♯4 增六度为框架、向外解决到属音八度的和弦。" },
        { term: "Tristan chord", zh: "特里斯坦和弦", def: "瓦格纳歌剧中的 F–B–D♯–G♯，众说纷纭。" },
        { term: "Predominant function (P)", zh: "属前功能组", def: "所有通往属功能的和弦：T–P–D–T。" },
        { term: "Region / Monotonality", zh: "调性领域 / 单调性", def: "勋伯格：一切离调与变化都在本调主音统辖之内。" },
        { term: "Extension / Top note", zh: "延伸音 / 冠音", def: "七音以上的九、十一、十三音 / 叠置的最高音。" },
        { term: "Altered dominant (7alt)", zh: "变化属和弦", def: "五、九、十一、十三音升降的属和弦。" },
        { term: "Guide tone / Shell voicing", zh: "导引音 / 躯壳排列", def: "三音和七音 / 根音 + 导引音。" },
        { term: "Rootless voicing", zh: "无根音排列", def: "省略根音的和弦排列。" },
        { term: "Tension / Avoid note", zh: "张力音 / 避免音", def: "七和弦外的音 / 其中太刺耳或改变性质、需小心处理的音。" },
        { term: "Chord-scale approach / Modal jazz", zh: "和弦—音阶理论 / 调式爵士", def: "和弦与音阶合一、按调式即兴的爵士理论与风格。" },
        { term: "Upper structure / Polychord", zh: "上层结构 / 复合和弦", def: "七和弦上叠加另一和弦 / 两个以上和弦上下相叠。" },
        { term: "Slash chord / Hybrid chord", zh: "斜线和弦 / 混合和弦", def: "「和弦/低音」记号 / 低音既非和弦音也非三度延伸的情况。" },
      ]} />
    </Block>
  </ChapterPage>;
}
