// 第 2 章 · 大调和声（发声组件来自 @kit/audio；专属图解见 _ch02_keygrid.jsx）
import { ChapterPage, Block, Hook, SectionCards, ArgumentFlow, ConceptGrid, ConceptMap, Quiz, Takeaways, Bridge, Glossary, C, Callout, Tabs, Timeline, CompareTable } from "@kit";
import { Play, SoundBar, Tonnetz, EarQuiz, Narrate, Score, Progression } from "@kit/audio";
import KeyGrid from "./_ch02_keygrid.jsx";

export const meta = {
  id: "ch02", no: 2, title_zh: "大调和声", title_en: "Major-Key Harmony",
  era: "基础篇 · 调与功能",
  one_liner: "在网格上框出一块 1×3 的平行四边形，就得到一个大调：七个音、七个和弦、三种功能。",
  big_question: "为什么 C–F–G–C 听起来像「出发—飞升—紧张—回家」？和弦在调里各自扮演什么角色？",
  why_it_matters: "大调是调性和声的样板：主、下属、属三种功能，稳定与不稳定的交替，终止式与常用套路，都在这里第一次成形。学会在网格上「框调、找和弦、看功能」，任何大调都不必死记。",
  original_words: 39000, read_minutes: 45,
};

export const groups = [
  { id: "key", label: "调与调内和弦" },
  { id: "func", label: "功能与进行" },
  { id: "pattern", label: "套路与终止" },
  { id: "seventh", label: "七和弦" },
];

export const concepts = [
  { id: "major_key", name_zh: "自然大调", name_en: "Natural major", icon: "🏛️", section_id: "s1", group: "key",
    plain: "在五度圈上连续取七个音，以其中第二个音为主音，就是一个大调。",
    explain: "中国五声（宫商角徵羽）是五度圈上连续的五个音；西方大调在两端各多取一个音，成为七声音阶。以 C 为主音时，取五度圈上 F 到 B 的一段，得到 C–D–E–F–G–A–B。\n\n「调」的本质是让十二个音分出等级：主音最稳定，是中心；七个调内音（自然音）是主体；其余五个调外音（变化音）只偶尔出现、增添色彩。主音靠「稳定」而不是「出现次数」确立自己的地位。",
    analogy: "像一家公司：主音是老板，六个调内音是正式员工，五个调外音是偶尔来帮忙的临时工。换一个调，就是换一位老板，整个公司重新洗牌。",
    book_example: { what: "书中先在网格上标出 C 宫的五个音，发现只能组成 C 和 Am 两个完整三和弦；再加上 F、B，变成 C 大调。", point: "五声难以形成完整的和声体系，七声大调才有足够的三和弦。" },
    misconception: "主音不一定出现得最多，但一定最稳定。" },
  { id: "scale_degree", name_zh: "音级与级数", name_en: "Scale degree / Roman numeral", icon: "🔢", section_id: "s1", group: "key",
    plain: "给调内音编号 1–7、给和弦标罗马数字，换调后编号不变。",
    explain: "从主音起按音高排列调内音，依次编号 1–7（与简谱、首调唱名一致），这就是音级。和弦也用级数标记：大三和弦用大写 I、IV、V，小三和弦用小写 ii、iii、vi，减三和弦写作 vii°。\n\n级数只描述「在调里的位置」，因此一切大调的级数关系都一样，很适合分析与声乐；具体音名则像固定唱名，随调改变，更适合器乐演奏。离开了调和主音，级数无从谈起。",
    analogy: "音级像员工号：无论哪家分公司，「1 号」总是老板；而音名是员工的真名，每家公司都不一样。",
    book_example: { what: "C 大调的 C–D–E–F–G–A–B 到了 E♭ 大调变成 E♭–F–G–A♭–B♭–C–D，但两者的级数关系完全相同。", point: "级数在调之间整体平移，相对关系不变。" },
    misconception: "有些古典教材（如斯波索宾、勋伯格）级数一律大写，不表示和弦性质；本书用大小写区分大小三和弦。" },
  { id: "diatonic_triads", name_zh: "调内三和弦", name_en: "Diatonic triads", icon: "🔺", section_id: "s1", group: "key",
    plain: "只用调内音搭成的七个三和弦：三大、三小、一减。",
    explain: "在网格上框出 C 大调的七个音，就能直接看到三个大三和弦 C、F、G 和三个小三和弦 Dm、Em、Am；剩下的 7 级音 B 上叠三度得到 B–D–F，是「小三度 + 小三度」，根音到五音是减五度——减三和弦 B°。\n\n减三和弦在网格上不是三角形，而是一条斜线段；它紧张、阴暗，减五度是其特征，所以五音不能省，三音反而可以省。",
    analogy: "七个三和弦像一个七人小组：三个开朗的（大三）、三个内敛的（小三）、一个总是坐立不安的（减三）。",
    book_example: { what: "书中把 C 大调的六个大小三和弦画成一串对角相连的平行四边形，再用一条黄色线段标出 B°。", point: "所有调内和弦都住在这块四边形里。" },
    misconception: "减三和弦不是「错误的和弦」，它是调内和弦，只是最不稳定。" },
  { id: "key_parallelogram", name_zh: "大调平行四边形", name_en: "Major-key parallelogram", icon: "▱", section_id: "s1", group: "key",
    plain: "任何大调在网格上都是同一个 1×3 的平行四边形，平移即可换调。",
    explain: "网格的同构性：结构相同的音组形状相同。大调总是一块 1×3 格的平行四边形，主音在底边第二个点。下排从左到右是 4、1、5、2，上排是 2、6、3、7；从 1 出发向右走锯齿是 3、5、7，向左是 6、4、2。\n\n拼写时记住两条：七个字母各用一次；自然调式里升号、降号不混用。于是 E♭ 大调的 4 级是 A♭ 而不是 G♯，5 级是 B♭ 而不是 A♯。",
    analogy: "像一张透明的模板卡：放在 C 上就读出 C 大调，挪到 E♭ 上就读出 E♭ 大调，不用一级一级数「全全半全全全半」。",
    book_example: { what: "书中以 E♭ 大调为例：框出四边形后，原来 C 大调的 A、E、B 变成调外音，A♭、E♭、B♭ 转为调内音。", point: "「一朝天子一朝臣」：主音一换，其余音的地位全部重排。" },
    misconception: "不要只熟悉 C 调、遇到别的调就移回 C 再想——这种「C 调依赖症」到学转调时会很痛苦。" },
  { id: "primary_triads", name_zh: "正三和弦与功能", name_en: "Primary triads & functions", icon: "👑", section_id: "s2", group: "func",
    plain: "I 主和弦（T）、V 属和弦（D）、IV 下属和弦（S）：大调和声的骨架。",
    explain: "主和弦 I 是中心，主功能代表稳定；调内各音都倾向于就近靠向主和弦的三个音（如 7→1、4→3、2→1 或 3、6→5）。属和弦 V 的三个音都朝主和弦倾斜，其中 7 级导音离主音只差半音，所以属功能最紧张、最想回到 I。下属和弦 IV 在主音下方五度，倾向性弱于属、稳定性略高。\n\n三者在五度圈上相邻，在网格上并排：以主和弦为中心，右移一格是属，左移一格是下属。级数记法始于 18 世纪；功能记法（T/S/D）由里曼在 19 世纪末提出，两者思想相通。",
    analogy: "像过山车：I 是站台，IV 是启动爬升，V 是最高点的翻转，回到 I 就是到站停车。",
    book_example: { what: "书中把 C 大调七个和弦比作后宫：C 是皇帝，G、F 是最有地位的两位，其余四位依附于他们。", point: "和弦在调里有固定的地位与分工，这就是「功能」。" },
    misconception: "趋向性只是总体倾向，不是强制规定：4 不一定要走到 3，2 也不一定要走到 1。" },
  { id: "first_law", name_zh: "和声第一定律", name_en: "Stable–unstable–stable", icon: "🎢", section_id: "s2", group: "func",
    plain: "和声的原动力是稳定与不稳定、协和与不协和的对比与转化。",
    explain: "I–IV–V–I 构成「起承转合」：稳定 → 运动 → 紧张 → 稳定。从稳定走向紧张的铺垫叫准备，从紧张回到稳定叫解决；解决是相对的，只要更稳定就算。爵士里叫 Tension–Release，道理一样。\n\n只有稳定会乏味，只有紧张会憋闷；不协和越深、持续越久，解决时越畅快。V–I 是正格进行，IV–I 是变格进行；I–IV–V–I「慢准备、快解决」，I–V–IV–I「快准备、慢解决」——后者在古典里被称为反功能，但流行与布鲁斯大量使用，本书不建议再用这个贬称。一波波「低—高—低」的起伏，岛冈让称为「曳动」。",
    analogy: "像讲故事：平静的开头、渐起的冲突、高潮、结局。只讲平静会无聊，只有冲突会让人喘不过气。",
    book_example: { what: "书中让读者对比 C 连弹八次与 C–F–G–G–G–G–C：前者无聊，后者越来越憋闷，最后解决时格外舒服。", point: "稳定与不稳定都不是「好」或「坏」，要靠对比体现价值。" },
    misconception: "「定律」是本书的学习口诀，不是科学定律，也不是业内公认术语。" },
  { id: "harmonization", name_zh: "和声编配与第二定律", name_en: "Harmonization", icon: "✍️", section_id: "s2", group: "func",
    plain: "按「节拍与调 → 句首句尾 → 填充」三步配和弦；和弦要包含当下的旋律音。",
    explain: "第一步看拍号和调：和弦一般在小节开头、强拍更换，弱起小节可不配。第二步定结构：开头、结尾用主和弦确立调性；乐句末尾用 V、IV 等不稳定和弦形成半终止（像逗号），用 V–I、IV–I 落到主和弦形成终止式（像句号）。第三步把中间填满。\n\n和弦与当下的旋律音要有交集，这是和声第二定律；包含不了的旋律音叫和弦外音。还要避免「根冠同音」——每个旋律音都配以它为根音的和弦，低音和旋律会八度平行。",
    analogy: "像写文章：先定段落和标点（逗号、句号的位置），再往句子里填词。灯塔先立好，航线才不会迷路。",
    book_example: { what: "书中给《生日快乐》（C 大调、3/4 拍）配和弦：C–G–G–C–C–F–C·G–C。", point: "先安排每句的终止，再填充，编配就有了骨架。" },
    misconception: "编配没有标准答案；同一旋律可以有许多合理的和声。" },
  { id: "function_groups", name_zh: "三个功能组", name_en: "Function groups T / S / D", icon: "🧩", section_id: "s3", group: "func",
    plain: "副三和弦按与正三和弦的共同音归队：T＝vi·I·iii，S＝ii·IV·vi，D＝iii·V·vii°。",
    explain: "网格上相邻的和弦共享边或顶点，共同音越多，听感越相近，越能互相替代。于是 vi、iii 与 I 同组（主功能）；iii、vii° 与 V 同组（属功能，导音是特征音）；ii、vi 与 IV 同组（下属功能，6 级下中音是特征音）。iii 和 vi 各在两组之间「骑墙」。\n\n稳定性有两条规律：与主和弦共同音越少、距离越远越不稳定；含导音的 D 组整体比 S 组不稳定。大致排序：I > vi > IV > ii > iii > V > vii°。",
    analogy: "像公司的三个部门：级数是员工号，主音、属音、导音等名称是职务，T/S/D 就是部门。",
    book_example: { what: "书中用三个相交的圆圈住 S、T、D 三组，每组三个相邻三角形，vi 与 iii 在两圆的交叠处。", point: "功能组就是网格上相邻的一串和弦。" },
    misconception: "「不用 T/S/D 术语、改用级数就是推翻了调性」是误解——两套记号表达的是同一种调性思维。" },
  { id: "substitution", name_zh: "和弦替换", name_en: "Chord substitution", icon: "🔄", section_id: "s3", group: "func",
    plain: "用同功能组的和弦代替原和弦，功能不变、色彩改变：六三代一、三七代五、二六代四。",
    explain: "和声变化的第一招是替换。乐句中间用主和弦容易给人提前结束的错觉，用 vi、iii 代替 I 既保留主功能又不显得「说完了」。用 iii 代 V 降低紧张，用 vii° 代 V 提高紧张。用 ii 代 IV 更柔和抒情，所以流行、爵士、中国风更爱 ii；vi 则介于 I 与 IV 之间。\n\n比较 IV–V–I、ii–V–I、vi–V–I，可以听出同一功能下不同的色彩与紧张度。",
    analogy: "像球队换人：换上同位置的替补，阵型不变，但比赛的风格立刻不同。",
    book_example: { what: "书中用口诀「六三代一」「三七代五」「二六代四」概括同组替换。", point: "替换是在功能框架内调节色彩与紧张度。" },
    misconception: "替换不是「随便换个和弦」，前提是功能基本保持。" },
  { id: "cadence", name_zh: "终止式", name_en: "Cadence", icon: "🔚", section_id: "s3", group: "pattern",
    plain: "乐句末尾的和声标点：落到 I 是句号，停在 V/IV 是逗号，V–vi 是「被打断的句号」。",
    explain: "收拢性终止落在主和弦：正格终止 V–I（加上 S 组成 IV–V–I、ii–V–I 叫完全正格终止）、变格终止 IV–I（又叫阿门终止，平静安详），以及终止后再加的补充终止。开放性终止不落在 I：半终止停在 V 或 IV；阻碍（伪）终止用 vi 等代替 I，最典型的是 V–vi，把预期的结束打断，让音乐继续。\n\n终止式必须结合结构：同样的和弦进行若出现在句中、没有句读作用，就不算终止式。",
    analogy: "像标点符号：句号、逗号、问号、省略号，以及话说到一半被人打断。",
    book_example: { what: "书中请读者对比 G–C 与 G–Am：前者踏实结束，后者意外地被拉向别处。", point: "V–vi 推迟了结束，可以扩展乐段。" },
    misconception: "形式上是 V–I 不等于就是终止式，关键要有终止感。" },
  { id: "circle_progression", name_zh: "调内五度圈进行", name_en: "Diatonic circle progression", icon: "🌀", section_id: "s3", group: "pattern",
    plain: "I–IV–vii°–iii–vi–ii–V–I：根音一路下行五度，在网格上从右往左走。",
    explain: "V–I 的五度倾向最强；V 前面加上方五度的 ii，ii 前面再加 vi……不断向前叠加，就得到调内五度圈进行「14736251」。其中只有 IV–vii° 是减五度，因为调内找不到纯五度。\n\n它是两个 T–S–D–T 循环的连缀：功能循环在网格上表现为从右往左的移动。常截取片段使用，如 ii–V–I（流行、爵士的基本进行）、vi–ii–V–I；把 vii° 换成 V，就是被称为「万能和弦」的 4536251，前四个 IV–V–iii–vi 在日本叫「王道进行」。",
    analogy: "像下楼梯：每一步都往同一个方向迈一个五度，最后稳稳落到一楼（主和弦）。",
    book_example: { what: "书中用网格图画出这条进行：从 I 出发，经过 ii、vi、iii、vii°，再从 IV 回到 I。", point: "五度圈进行把七个调内和弦都串了起来。" },
    misconception: "减五度那一步（IV–vii°）不是错误，而是为了留在调内。" },
  { id: "pop_patterns", name_zh: "常用和声套路", name_en: "Common progressions", icon: "🎵", section_id: "s3", group: "pattern",
    plain: "1645、1564、卡农进行……在五度、三度、二度进行上截取、粘接、替换而来。",
    explain: "I–vi–IV–V（50 年代进行）、vi–IV–V–I（小室进行）、I–V–vi–IV（流行朋克进行 / 四和弦）、vi–IV–I–V、IV–I–V–vi，以及 I–V–vi–iii–IV–I–IV–V 的卡农进行，都能用功能组和级数解释，并可从任意位置开始循环。\n\n套路是前人总结的「最不会出错」的组合，和声进行没有版权（No one can own chords）。但重点是理解思路、多听多练，而不是背口诀；简单与复杂各有用处，关键在「合适」。",
    analogy: "像菜谱里的经典搭配：番茄炒蛋人人会做，好不好吃还要看火候和调味。",
    book_example: { what: "书中为每种套路列出许多华语与欧美流行歌曲，如《七里香》（vi–IV–V–I）、《平凡之路》（vi–IV–I–V）、《稻香》（卡农变体）。", point: "大量歌曲背后是同一套和声，所以能串烧拼接。" },
    misconception: "用了套路不等于作品低质；但只会套模板也写不出好音乐。" },
  { id: "seventh_chords", name_zh: "调内七和弦", name_en: "Diatonic seventh chords", icon: "➕", section_id: "s4", group: "seventh",
    plain: "三和弦上再叠一个三度：IΔ、IVΔ 大七，ii7、iii7、vi7 小七，viiø 半减七。",
    explain: "和声变化的第二招是延伸：在三和弦上再叠三度。C–E–G 加 B 成为大七和弦 CΔ（大三 + 大七度），也可看成 C 与 Em 的复合（Em/C）；大调里 I、IV 级是大七和弦。ii、iii、vi 级是小七和弦（小三 + 小七度），其中 ii7 最常用，ii7–V7–IΔ 是爵士最基本的套路。7 级 B–D–F–A 是半减七和弦 Bø（减三 + 小七度），即 Bm7♭5，可看成 Dm/B，因含三全音而偏向属功能。\n\n记七和弦时，最好从根音到三、五、七音的音程来想，而不只是一层层三度。",
    analogy: "像在基础色上叠一层透明色：底色还在，但颜色更复杂、更有层次，也更「不安分」。",
    book_example: { what: "书中把七个七和弦画在网格上：大七红色平行四边形，小七蓝色，属七绿色直角三角形，半减七紫色。", point: "V7、viiø、ii7 最常用。" },
    misconception: "CΔ 不能写成 C7（那是属七）；Dm7 也不能写成 D7。" },
  { id: "dominant_seventh", name_zh: "属七和弦", name_en: "Dominant seventh", icon: "⚡", section_id: "s4", group: "seventh",
    plain: "V 级上的「大三 + 小七度」，如 G7 = G–B–D–F，最重要的七和弦。",
    explain: "G7 的三音 B 是导音，想上行半音到 C；七音 F 是 4 级，想下行半音到 E；B 与 F 构成三全音——大调中唯一的一对。这些让 V7 比 V 更紧张、更急于解决，V7–I 比 V–I 更常用。G7 可看作 G 与 B° 的叠加（B°/G），B° 也可视为省略根音的 G7。\n\n每个大调只有一个 V7，所以它能迅速确立调性：听到 G7，就知道主音多半是 C。不过属七和弦并不专属于大调，下一章会讲到。",
    analogy: "像倒计时最后三秒：所有人都屏住呼吸，等着那个必然的结局。",
    book_example: { what: "书中让读者连弹七次 G7 再到 C：越拉长，最后的解决越畅快；G7 到 Am 则形成阻碍进行。", point: "控制紧张的时长与解决方向，就能控制听感。" },
    misconception: "「属七和弦」在现代常泛指所有大小七和弦，不一定建立在属音上、也不一定有属功能。" },
];

export const relations = [
  { from: "major_key", to: "scale_degree", label: "给音编号" },
  { from: "major_key", to: "diatonic_triads", label: "叠出七个和弦" },
  { from: "major_key", to: "key_parallelogram", label: "网格上的形状" },
  { from: "key_parallelogram", to: "diatonic_triads", label: "框内三角形" },
  { from: "diatonic_triads", to: "primary_triads", label: "I·IV·V 为骨架" },
  { from: "primary_triads", to: "first_law", label: "稳定—紧张—稳定" },
  { from: "first_law", to: "harmonization", label: "指导编配" },
  { from: "harmonization", to: "cadence", label: "句尾标点" },
  { from: "primary_triads", to: "function_groups", label: "扩展为三组" },
  { from: "function_groups", to: "substitution", label: "同组替换" },
  { from: "function_groups", to: "circle_progression", label: "T-S-D 循环" },
  { from: "circle_progression", to: "pop_patterns", label: "截取粘接" },
  { from: "substitution", to: "pop_patterns", label: "变体" },
  { from: "diatonic_triads", to: "seventh_chords", label: "再叠三度" },
  { from: "seventh_chords", to: "dominant_seventh", label: "最重要的一个" },
  { from: "dominant_seventh", to: "cadence", label: "V7–I 最强" },
];

const sections = [
  { id: "s1", no: "2-1", title_zh: "大调的三和弦", title_en: "Triads of the major key", gist: "五声加两音成七声；网格上的 1×3 平行四边形装着七个调内三和弦。",
    summary: "五声是五度圈上连续五个音，只能组成两个三和弦；大调在两端各加一音，成为七声。调把十二个音分成主音、调内音、调外音三级。七个调内音叠出三大、三小、一减共七个三和弦，用罗马数字标级数。任何大调都是同一个平行四边形，平移即可得到各调的音与和弦，并按「七字母各用一次、升降不混用」拼写。",
    concept_ids: ["major_key", "scale_degree", "diatonic_triads", "key_parallelogram"] },
  { id: "s2", no: "2-2", title_zh: "大调的正三和弦", title_en: "Primary triads", gist: "I、IV、V 三个和弦撑起大调；稳定—不稳定—稳定是和声的原动力。",
    summary: "主和弦（T）稳定、属和弦（D）紧张、下属和弦（S）居中，三者在网格上并排。I–IV–V–I 是完全功能循环；V–I 正格、IV–I 变格；慢准备快解决与快准备慢解决各有味道。准备、解决与曳动构成和声的波浪。用三步法给《生日快乐》配和弦，并总结第二定律：和弦要包含旋律音。三和弦并未过时，至今仍是使用最多的和弦。",
    concept_ids: ["primary_triads", "first_law", "harmonization"] },
  { id: "s3", no: "2-3", title_zh: "副三和弦与和声套路", title_en: "Secondary triads & common progressions", gist: "副三和弦按共同音归入 T、S、D 三组；套路都是功能逻辑的截取与组合。",
    summary: "ii、iii、vi、vii° 依共同音归入三个功能组，可同组替换；七个和弦的稳定性大致为 I > vi > IV > ii > iii > V > vii°。功能是调内的角色，色彩是和弦自身的音响。调内五度圈进行、三度与二度循环、1645、1564、卡农进行等套路都由此衍生。终止式分收拢性与开放性。最后提出「第零定律」：理论服从实践。",
    concept_ids: ["function_groups", "substitution", "cadence", "circle_progression", "pop_patterns"] },
  { id: "s4", no: "2-4", title_zh: "大调的七和弦", title_en: "Seventh chords", gist: "再叠一个三度：大七、属七、小七、半减七，其中 V7 最重要。",
    summary: "延伸是和声变化的第二招。I、IV 级是大七和弦，ii、iii、vi 级是小七和弦，V 级是属七（大小七）和弦，vii 级是半减七和弦。属七含导音和唯一的三全音，比属三和弦更紧张，V7–I 是最强的终止，并能迅速确立调性。七和弦经历了从被限制到被享受的漫长历史，爵士乐以它为基础。",
    concept_ids: ["seventh_chords", "dominant_seventh"] },
];

const PENTA = [0, 2, 4, 7, 9], MAJOR = [0, 2, 4, 5, 7, 9, 11];

export default function Chapter() {
  return <ChapterPage meta={meta} groups={groups} concepts={concepts} relations={relations}>
    <SoundBar />

    <Block id="hook" toc="开场">
      <Hook title="先听，再看"><p>
        点这两个按钮：<Play seq={["C", "F", "G", "C"]} gap={0.9}>C–F–G–C</Play> 和 <Play seq={["C", "F", "G"]} gap={0.9}>C–F–G</Play>。
        第一个像坐完过山车平稳到站；第二个停在半空，你几乎会忍不住在心里替它补上最后一个和弦。
        同样是三个大三和弦，为什么 C 让人安心、G 让人着急？这一章在网格上框出一块平行四边形——这就是大调。
        你会看到七个和弦怎样分成主、下属、属三个「部门」，以及流行歌里那些熟悉的和弦套路是怎么来的。</p>
      </Hook>
    </Block>

    <Block id="secs" toc="小节" kicker="原书结构" title="本章四个小节" lead="2-1 找和弦，2-2 讲正三和弦与编配，2-3 讲功能组与套路，2-4 加上七和弦。">
      <SectionCards sections={sections} />
    </Block>

    <Block id="flow" toc="主线" kicker="论证主线" title="从七个音到一整套和声">
      <ArgumentFlow steps={[
        { claim: "五声只够两个三和弦，大调把它扩成七声", detail: "在五度圈上连续取七个音：F C G D A E B，以 C 为主音。" },
        { claim: "调 = 给十二个音排座次", detail: "主音最稳定，调内音是主体，调外音是点缀。" },
        { claim: "七个调内音叠出七个三和弦", detail: "三大（I IV V）、三小（ii iii vi）、一减（vii°）。" },
        { claim: "大调在网格上是一个平行四边形", detail: "同构：平移这块形状就得到任何一个大调。" },
        { claim: "I、IV、V 是骨架：主、下属、属三种功能", detail: "稳定性 I > IV > V，I–IV–V–I 是完全功能循环。" },
        { claim: "和声第一定律：稳定—不稳定—稳定", detail: "准备与解决、正格与变格、曳动，都源于这种对比。" },
        { claim: "副三和弦按共同音归入三个功能组", detail: "同组可以替换：六三代一、三七代五、二六代四。" },
        { claim: "套路 = 功能逻辑的截取、粘接与替换", detail: "五度圈进行、1645、1564、卡农进行……" },
        { claim: "再叠一个三度：七和弦", detail: "属七和弦 V7 最紧张、最能确立调性，引出下一章的小调。" },
      ]} />
    </Block>

    {/* ───────────── 2-1 ───────────── */}
    <Block id="scale" toc="五声与七声" kicker="2-1 · 自然大调" title="五声加两个音，就是大调"
      lead="金色交点是以 C 为宫的五声：C、D、E、G、A。在网格上找找看，能拼出几个完整的三角形？">
      <Narrate />
      <Tonnetz cols={10} rows={4} center="C" notes={PENTA} unit={54} caption="以 C 为宫的五音在网格上连成一片。" />
      <p>「五音不全」的五音，是宫、商、角、徵、羽：在五度圈上连续取五个音，如 C–G–D–A–E，按音高排成 C 宫、D 商、E 角、G 徵、A 羽。
        <Play notes="C4 D4 E4 G4 A4 C5" melodic gap={0.3}>听 C 宫五声</Play>。网格的横线就是五度圈，所以五声在图上挨在一起。</p>
      <p>只用这五个音，完整的三角形只有两个：宫角徵组成的 <Play chord="C" arp={0.06}>C</Play> 和羽宫角组成的 <Play chord="Am" arp={0.06}>Am</Play>。
        中国传统音乐以五音为本、重旋律轻和声，没有发展出独立系统的和声理论。</p>
      <p>西方的<C id="major_key">自然大调</C>在五声两端沿五度圈各加一个音：取 F 到 B 这七个音，以 C 为主音，就是 C 大调 <Play notes="C4 D4 E4 F4 G4 A4 B4 C5" melodic gap={0.28}>C–D–E–F–G–A–B</Play>。</p>
      <Tonnetz cols={10} rows={4} center="C" notes={MAJOR} unit={54} caption="C 大调七个音：比五声多了 F 与 B，三角形一下子多了起来。" />
      <Callout tone="key" title="调 = 给十二个音排座次">
        上一章里十二个音完全平等；选定一个调，它们就按「主音—调内音—调外音」三级各就各位。主音（Tonic）最稳定，旋律与和声都围绕它；
        七个调内音又叫自然音（diatonic）；其余五个是调外音或变化音（chromatic，本意就是「色彩」），只偶尔出现、增添色彩。
        主音的地位靠<strong>稳定</strong>：放在开头结尾、强拍长音、被不稳定音烘托……它不一定出现得最多，就像公司老板未必事事亲为。
      </Callout>
      <p>从主音起按音高排列，就是大调音阶，唱作 do re mi fa sol la ti。给它们编号 1–7，就是<C id="scale_degree">音级</C>，与简谱数字一致。
        按五度排列则是 4–1–5–2–6–3–7，正是网格横线上从左到右的顺序。</p>
    </Block>

    <Block id="triads" toc="调内三和弦" kicker="2-1 · 调内三和弦" title="七个音，七个三和弦"
      lead="网格上框出的 C 大调里有三个红色大三角、三个蓝色小三角；第七个和弦是一条线段。">
      <Narrate />
      <Tonnetz cols={9} rows={3} center="C" highlight={["F", "C", "G", "Dm", "Am", "Em"]} notes={MAJOR} unit={64} />
      <p>C 大调里有三个大三和弦 <Play chord="C" arp={0.05}>C</Play> <Play chord="F" arp={0.05}>F</Play> <Play chord="G" arp={0.05}>G</Play>，
        三个小三和弦 <Play chord="Dm" arp={0.05}>Dm</Play> <Play chord="Em" arp={0.05}>Em</Play> <Play chord="Am" arp={0.05}>Am</Play>，
        六个拼成一个平行四边形。它们只用调内音，叫<C id="diatonic_triads">调内（自然、顺阶）三和弦</C>。</p>
      <p>还剩 7 级音 B：向上叠小三度到 D，再叠小三度到 F。B–D–F 是「小三度 + 小三度」，根音到五音只有减五度，在网格上成了一条斜线段——这是<b>减三和弦</b>，记作 B°（或 Bdim）：
        <Play chord="B°" arp={0.06}>B°</Play>。对比 <Play seq={["Bm", "B°"]} gap={1}>Bm → B°</Play>：减五度带来紧张、阴暗的色彩，所以减三和弦的五音不能省，三音反而可以省。</p>
      <Score abc={'"C"[CEG]2 "Dm"[DFA]2 | "Em"[EGB]2 "F"[FAc]2 | "G"[GBd]2 "Am"[Ace]2 | "B°"[Bdf]2 "C"[ceg]2 |]'} tempo={84}
        caption="C 大调的七个调内三和弦（加上高八度的 C 收尾）：I ii iii IV V vi vii° I。" />
      <CompareTable left="级数（本书写法）" right="说明" rows={[
        { aspect: "I · IV · V", left: "大写", right: "大三和弦：C、F、G" },
        { aspect: "ii · iii · vi", left: "小写", right: "小三和弦：Dm、Em、Am" },
        { aspect: "vii°", left: "小写 + °", right: "减三和弦：B°" },
        { aspect: "其他写法", left: "一律大写", right: "斯波索宾《和声学教程》、勋伯格等古典教材，级数不表示性质" },
        { aspect: "纳什维尔记号", left: "阿拉伯数字", right: "1、4、5、6m……简易，流行和声书常用" },
      ]} />
      <p>所有和弦里有调外音的，叫调外和弦。主音上的 C 是主和弦——和声的中心。以主和弦为中心、主要用调内和弦、偶尔加入调外和弦，就是<b>调性和声</b>。
        即使故意不让主和弦出现，听众也常会「脑补」出中心音；从古典到流行、摇滚、爵士，大多保留了调性，完全无调性的音乐反而需要刻意回避调感。</p>
    </Block>

    <Block id="keygrid" toc="网格上的大调" kicker="专属图解 · 2-1 任意大调的三和弦" title="平移一块平行四边形，就换了一个调"
      lead="选一个调：灰框沿五度横线滑过去，调内音亮起、调外音变淡。点三角形听和弦，下方会告诉你它的级数、功能组、稳定性，以及它还出现在哪些调里。">
      <Narrate />
      <KeyGrid />
      <p>网格的同构性让所有大调都长成同一个形状：<C id="key_parallelogram">1×3 格的平行四边形</C>，主音在底边第二个点。
        下排从左到右是 4、1、5、2，上排是 2、6、3、7。另一种记法是从 1 出发「走锯齿」：向右依次是 3、5、7，向左依次是 6、4、2。
        这比逐级累加「全全半全全全半」快得多。</p>
      <p>以 E♭ 大调为例（在上图点 E♭）：主音移到 E♭，原来的 C 变成 6 级；C 大调的 A、E、B 成了调外音，A♭、E♭、B♭「临时工转正」。
        拼写时两条规则：<b>七个字母各用一次</b>（3 级是 G，所以 4 级只能写 A♭，不能写 G♯）；<b>升号、降号不混用</b>（降号调里只出现降号）。
        听一听 <Play seq={["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "D°", "Eb"]} gap={0.7}>E♭ 大调的七个三和弦</Play>——级数关系与 C 大调完全一样，只是整体平移了。</p>
      <Callout tone="info" title="级数 vs 音名：首调与固定调">
        级数像首调唱名：只看相对关系，适合分析、声乐与简谱；音名像固定唱名，直接对应音高，适合器乐与五线谱。
        大调实质上有 12 个，加上等音调常用的有 15 个。本章请先熟悉调号在三个升降号以内的七个调（E♭ B♭ F C G D A），在图上自己推，不要死记——别患上「C 调依赖症」。
      </Callout>
      <p>反过来，网格也能告诉你一个和弦可以出现在哪些调里：C 大三和弦的三角形同时落在 F、C、G 三个大调的四边形里，分别是属、主、下属和弦；
        Dm 落在 B♭、F、C 大调里，分别是 iii、vi、ii；而减三和弦 E° 只属于 F 大调（vii°）。在上图里点 I 级、ii 级、vii° 试试。</p>
    </Block>

    {/* ───────────── 2-2 ───────────── */}
    <Block id="primary" toc="正三和弦" kicker="2-2 · 正三和弦及其功能" title="主、属、下属：大调的三根支柱"
      lead="主和弦在中间，属和弦在右边一格，下属和弦在左边一格。播放 I–IV–V–I，看路线在网格上怎么走。">
      <Narrate />
      <Progression title="完全功能循环 I–IV–V–I" chords={["C", "F", "G", "C"]} keyName="C" bpm={72} tonnetz={{ cols: 9, rows: 3, center: "C" }}
        caption="三个大三和弦并排相邻：左 S、中 T、右 D。它们用到了 C 大调的全部七个音。" />
      <p>每个大调的 I 级是<C id="primary_triads">主和弦</C>（Tonic，T），代表稳定；主和弦的三个音是全调最稳的音，其他音都倾向于就近靠过去：
        <Play seq={["B4", "C5"]} gap={0.6}>7 → 1</Play>、<Play seq={["F4", "E4"]} gap={0.6}>4 → 3</Play>、<Play seq={["A4", "G4"]} gap={0.6}>6 → 5</Play>、<Play seq={["D4", "C4"]} gap={0.6}>2 → 1</Play>。
        不同和弦含有不同的「倾向音」，这就是功能的根源。不过倾向只是趋势，不是规定。</p>
      <p>第二把交椅是 V 级<b>属和弦</b>（Dominant，D）。5 级属音在主音上方纯五度；属和弦的三个音都朝主和弦倾斜，尤其是只差半音的 7 级，
        所以 <Play seq={["G", "C"]} gap={1}>G → C</Play> 有强烈的「回家」感。英文 dominant（主导）比中文「属」更贴切。</p>
      <p>4 级在主音下方纯五度，与属音对称，叫下属音；IV 级 F 是<b>下属和弦</b>（Subdominant，S），倾向性较弱、稳定性略高：<Play seq={["F", "C"]} gap={1}>F → C</Play>。
        三者合称正三和弦。换一个调，就是「新皇登基」：位子还在，换一批人坐。</p>
      <Callout tone="info" title="两套记号，一种思维">
        罗马数字级数可追溯到 18 世纪，经维也纳一批理论家推广，今天的流行、爵士和声也多用级数（有时换成阿拉伯数字）；
        T/S/D 功能记号则由德国理论家里曼在 19 世纪末提出，流行于德国、东欧、俄罗斯，也是国内音乐院校和声教学的标准体系。本书两者兼用。
      </Callout>
    </Block>

    <Block id="law1" toc="第一定律" kicker="2-2 · 和声进行的基本规律 / 准备、解决与曳动" title="稳定—不稳定—稳定：和声的原动力"
      lead="I 像站台，IV 开始爬升，V 是最高处的翻转，回到 I 是到站停车。下面几组对比请一定都听一遍。">
      <Narrate />
      <p>大调最基本的模式是从 I 出发，顺时针经过 IV、V 回到 I：遍历三种功能，叫<b>完全功能循环</b>。稳定性 I &gt; IV &gt; V：
        主功能的关键词是<b>稳定</b>，下属功能是<b>运动</b>（I–IV 有启动、上升感），属功能是<b>紧张</b>（V–I 有制动、落地感）。
        这种「稳定—不稳定—稳定」「协和—不协和—协和」的转化，本书称为<C id="first_law">和声第一定律</C>。它是学习口诀，不是科学定律；
        如果要找解释，大概是听觉心理：人听到不稳定的声音，会期待它被化解。</p>
      <Tabs tabs={[
        { label: "太稳 vs 太紧", content: <>
          <Progression title="一直是主和弦" chords={["C", "C", "C", "C", "C", "C", "C", "C"]} keyName="C" beats={2} bpm={96} caption="稳定，但很快就无聊了。" />
          <Progression title="属和弦迟迟不解决" chords={["C", "F", "G", "G", "G", "G", "C"]} keyName="C" beats={2} bpm={96} caption="G 越拖越憋闷，最后回到 C 时格外舒畅。" />
        </> },
        { label: "正格 vs 变格", content: <>
          <Progression title="正格进行 V–I" chords={["C", "G", "C"]} keyName="C" bpm={72} caption="「属—主」的五度倾向，是和声最基础的关系。" />
          <Progression title="变格进行 IV–I" chords={["C", "F", "C"]} keyName="C" bpm={72} caption="紧张感弱一些，有一种奇妙的安全感。" />
        </> },
        { label: "顺序 vs 倒序", content: <>
          <Progression title="I–IV–V–I：慢准备、快解决" chords={["C", "F", "G", "C"]} keyName="C" bpm={72} caption="张力逐步累积，一次性释放。古典和声视为「顺」功能。" />
          <Progression title="I–V–IV–I：快准备、慢解决" chords={["C", "G", "F", "C"]} keyName="C" bpm={72} caption="V 先泄掉一部分张力再回 I，更从容。流行、布鲁斯大量使用，本书不建议再叫它「反功能」。" />
        </> },
      ]} />
      <p>从稳定走向不稳定的铺垫叫<b>准备</b>，从不稳定回到稳定叫<b>解决</b>。解决是相对的：只要比刚才更稳定、更协和就算，哪怕新和弦又带来了新的不稳定——
        一部分声部在解决，另一部分可以同时在准备。爵士乐的 Tension–Release 说的是同一件事。</p>
      <Callout tone="key" title="不稳定才是变化的舞台">
        稳定的环节相对单纯，不稳定的环节却有程度、顺序、快慢之分。后面几乎所有和声技法，都是在「控制紧张」上做文章：需要时加深不协和、拉长紧张；不需要时软化它。
      </Callout>
      <p>和声一次次从稳定处启动、到达紧张的高点、再回落……这种一张一弛的波浪，日本理论家岛冈让称为<b>曳动</b>（ゆれ）。每一波「低—高—低」是一个曳动单元，
        许多单元之上还有更大的起伏（包络），就像连绵山脉上的整体山势，构成多层次的和声节奏。</p>
    </Block>

    <Block id="harmonize" toc="和弦编配" kicker="2-2 · 和弦编配 / 旋律音与第二定律" title="三步给《生日快乐》配和弦"
      lead="点「播放乐谱」听原旋律，再切换到各步看和弦怎样一步步长出来。下方低音谱表是柱式和弦。">
      <Narrate />
      <Tabs tabs={[
        { label: "原旋律", content: <Score abc={'GG | A2 G2 c2 | B4 GG | A2 G2 d2 | c4 GG | g2 e2 c2 | B2 !fermata!A2 ff | e2 c2 d2 | c4 |]'} meter="3/4" unit="1/8" tempo={96}
          caption="谱例 2.1　希尔姐妹《生日快乐》（C 大调，3/4 拍，弱起）" /> },
        { label: "第 2 步：先定框架", content: <Score abc={'GG | "C"A2 G2 c2 | "G"B4 GG | "G"A2 G2 d2 | "C"c4 GG | g2 e2 c2 | "F"B2 !fermata!A2 ff | e2 c2 "G"d2 | "C"c4 |]'}
          bass={'z2 | [C,E,G,]6 | [B,,D,G,]6 | [B,,D,G,]6 | [C,E,G,]6 | z6 | [A,,C,F,]6 | z4 [B,,D,G,]2 | [C,E,G,]4 |]'} meter="3/4" unit="1/8" tempo={96}
          caption="开头与结尾用 C；第一句停在 7（G 和弦，半终止），第二句 G–C 终止；第三句末尾用 F，最后 G–C。" /> },
        { label: "第 3 步：填满", content: <Score abc={'GG | "C"A2 G2 c2 | "G"B4 GG | "G"A2 G2 d2 | "C"c4 GG | "C"g2 e2 c2 | "F"B2 !fermata!A2 ff | "C"e2 c2 "G"d2 | "C"c4 |]'}
          bass={'z2 | [C,E,G,]6 | [B,,D,G,]6 | [B,,D,G,]6 | [C,E,G,]6 | [C,E,G,]6 | [A,,C,F,]6 | [C,E,G,]4 [B,,D,G,]2 | [C,E,G,]4 |]'} meter="3/4" unit="1/8" tempo={96}
          caption="第 5 小节的 5·3·1 与第 7 小节前两拍的 3·1 都是 C 和弦音，于是全部配上 C。" /> },
      ]} />
      <ol>
        <li><b>判断节奏与调。</b>3/4 拍、有弱起；初学时一小节一个和弦，弱起小节可不配；小节内换和弦放在强拍；同一和弦可以重复，
          但从弱拍延续到强拍（和声切分）要慎用。没有升降号、结束在 C，所以是 C 大调。</li>
        <li><b>确定开头、结尾与断句。</b>开头、结尾用主和弦确立调感。乐句末尾用不稳定的 V、IV 叫<b>半终止</b>，像逗号；
          落到主和弦、前面配上 V 或 IV 的叫<C id="cadence">终止式</C>，像句号。第一句落在 7（G 和弦的音）→ 半终止；第二句前一小节 6·5·2 中 5、2 属于 G → G–C 终止，
          一问一答像对联的上下句。第三句末尾 7–6：G 或 F 都行，试听后 F 更好，因为下一拍是两个 4。最后一小节前的 3·1·2，在 2 上用 G 形成 V–I。</li>
        <li><b>填充乐句。</b>框架就是灯塔，剩下的地方按旋律音填入合适的和弦即可。句子越长，这一步的变化越多。</li>
      </ol>
      <p>爵士里把段落末尾、引出下一段的进行（如 IV–V 回到 I）叫<b>回转</b>（turnaround），作用类似半终止。</p>
      <Callout tone="key" title="和声第二定律">
        和弦要包含当下旋律中的一部分或全部音；包含不全时，优先照顾强拍和长音。不在和弦里的旋律音叫<strong>和弦外音</strong>（第七章细讲）。
        想不起配什么和弦时，就在网格上标出旋律音，看它们落在哪个三角形里：IV 含 4·6·1，I 含 1·3·5，V 含 5·7·2。
        还要避免「根冠同音」——每个旋律音都配以它为根音的和弦，低音与旋律会形成八度平行，听感不佳。
      </Callout>
      <Tonnetz cols={7} rows={2} center="C" highlight={["F", "C", "G"]} notes={MAJOR} unit={70} caption="正三和弦与音级：F（4·6·1）、C（1·3·5）、G（5·7·2）。" />
      <h3>自己试一试</h3>
      <Tabs tabs={[
        { label: "谱例 2.2　生日快乐（G 大调）", content: <Score abc={'DD | E2 D2 G2 | F4 DD | E2 D2 A2 | G4 DD | d2 B2 G2 | F2 !fermata!E2 cc | B2 G2 A2 | G4 |]'} keySig="G" meter="3/4" unit="1/8" tempo={96}
          caption="G 大调的 I、IV、V 是哪三个和弦？试着配一配，再看下一个标签的参考答案。" /> },
        { label: "参考答案", content: <Score abc={'DD | "G"E2 D2 G2 | "D"F4 DD | "D"E2 D2 A2 | "G"G4 DD | "G"d2 B2 G2 | "C"F2 !fermata!E2 cc | "G"B2 G2 "D"A2 | "G"G4 |]'}
          bass={'z2 | [G,,B,,D,]6 | [F,,A,,D,]6 | [F,,A,,D,]6 | [G,,B,,D,]6 | [G,,B,,D,]6 | [E,,G,,C,]6 | [G,,B,,D,]4 [F,,A,,D,]2 | [G,,B,,D,]4 |]'} keySig="G" meter="3/4" unit="1/8" tempo={96}
          caption="I = G、IV = C、V = D：级数与 C 大调版完全相同，只是音名整体平移。" /> },
        { label: "谱例 2.3　送别（F 大调）", content: <Score
          abc={'"F"c2 (Ac) f4 | "B♭"d2 f2 "F"c4 | "F"c2 (FG) A2 (GF) | "C"G6 z2 |\n"F"c2 (Ac) f3 e | "B♭"d2 f2 "F"c4 | "F"c2 (GA) "C"B3 E | "F"F6 z2 |\n"B♭"d2 f2 f4 | "C"e2 (de) "F"f4 | "B♭"(de)(fd) "F"(dc)(AF) | "C"G6 z2 |\n"F"c2 (Ac) f3 e | "B♭"d2 f2 "F"c4 | "F"c2 (GA) "C"B3 E | "F"F8 |]'}
          bass={'[F,,A,,C,]8 | [F,,B,,D,]4 [F,,A,,C,]4 | [F,,A,,C,]8 | [E,,G,,C,]6 z2 |\n[F,,A,,C,]8 | [F,,B,,D,]4 [F,,A,,C,]4 | [F,,A,,C,]4 [E,,G,,C,]4 | [F,,A,,C,]6 z2 |\n[F,,B,,D,]8 | [E,,G,,C,]4 [F,,A,,C,]4 | [F,,B,,D,]4 [F,,A,,C,]4 | [E,,G,,C,]6 z2 |\n[F,,A,,C,]8 | [F,,B,,D,]4 [F,,A,,C,]4 | [F,,A,,C,]4 [E,,G,,C,]4 | [F,,A,,C,]8 |]'}
          keySig="F" meter="4/4" unit="1/8" tempo={80}
          caption="J. P. 奥德威 1851 年的旋律，李叔同 1915 年填词。原书留作练习；这里的和弦是本站给出的一种只用正三和弦（F、B♭、C）的参考编配。" /> },
      ]} />
      <Callout tone="info" title="三和弦过时了吗？">
        不少学过流行、爵士的人看不起三和弦。但对 1300 首 Billboard 热门歌曲的统计（按 C 大调换算，hooktheory.com）显示，用得最多的仍是正三和弦：
        <Play chord="G">G</Play> 约 73%、<Play chord="F">F</Play> 约 73%、<Play chord="C">C</Play> 约 68%，其后是 <Play chord="Am">Am</Play> 56%、<Play chord="Dm">Dm</Play> 26%、<Play chord="Em">Em</Play> 17%、<Play chord="E">E</Play> 10%。
        三和弦像主食：味道清淡，却永远占比最高；它纯净端正，适合儿歌、圣咏、摇篮曲、新世纪音乐。复杂不比简单「高级」，我们要追求的是「合适」。
      </Callout>
    </Block>

    {/* ───────────── 2-3 ───────────── */}
    <Block id="groups" toc="三个功能组" kicker="2-3 · 三个功能组" title="副三和弦怎样站队"
      lead="在专属图解里切换到「按功能组着色」，并点 T 组、S 组、D 组按钮。这里逐组细听。">
      <Narrate />
      <p>正三和弦之外的 ii、iii、vi、vii° 叫<b>副三和弦</b>（C 大调里是 Dm、Em、Am、B°）。它们按照与正三和弦<b>共同音</b>的多少，
        归入主、属、下属三个<C id="function_groups">功能组</C>。在网格上，有共同音的和弦共享顶点或边。</p>
      <Tabs tabs={[
        { label: "T 组 · vi I iii", content: <>
          <p>C 的左右邻居 Am 和 Em 都与它有两个共同音：<Play seq={["C", "Em", "C", "Am", "C"]} gap={0.9}>C · Em · C · Am · C</Play>。
            主和弦太稳，放在句中会让人以为要结束了；换成色彩更暗的 vi、iii，既保持主功能，又不会提前「收尾」——口诀「六三代一」。
            这是和声变化的第一招：<C id="substitution">和弦替换</C>（代理和弦）。</p>
        </> },
        { label: "D 组 · iii V vii°", content: <>
          <p>属和弦 G 两侧的 Em、B° 都能代替它。iii 建立在 3 级「中音」上，与 I 和 V 各有两个共同音，介于主、属之间，斯氏和声记作 DTIII——像宫斗里的「骑墙派」。</p>
          <p>7 级音只比主音低半音：<Play notes="C4 D4 E4 F4 G4 A4 B4" melodic gap={0.35}>唱到 ti 停住</Play>，是不是很想听到 do？所以它叫<b>导音</b>，出现在 D 组每个和弦里，是属功能的特征音。
            导和弦 B° 本身是减三和弦、又与 I 没有共同音，最不稳定：比较 <Play seq={["G", "C"]} gap={1}>V–I</Play> 与 <Play seq={["B°", "C"]} gap={1}>vii°–I</Play>（斯氏记作 DVII）。</p>
          <p>D 组稳定性 iii &gt; V &gt; vii°，在网格上正好从左到右、离主和弦由近到远。「三七代五」：用 iii 代 V 更平缓，用 vii° 代 V 更起伏。</p>
        </> },
        { label: "S 组 · ii IV vi", content: <>
          <p>下属和弦 F 两侧是 Dm 和 Am。6 级「下中音」在主音下方小三度，出现在 S 组全部三个和弦里，是下属功能的特征音；它比导音稳得多，所以 S 组整体比 D 组稳定。
            vi 与 I、IV 各有两个共同音，斯氏记作 TSVI，可替 I 或 IV。</p>
          <p>2 级「上主音」上的 ii 与主和弦没有共同音，只有下属功能（SII）。IV 显得西洋、正派、刚硬，换成 ii 更柔美抒情，所以流行、爵士、中国风更爱用 ii。
            S 组稳定性 vi &gt; IV &gt; ii，在网格上从右到左、离主和弦越来越远。口诀「二六代四」。</p>
          <Progression title="同一个终止，三种下属色彩" chords={["F", "G", "C", "Dm", "G", "C", "Am", "G", "C"]} keyName="C" bpm={80} beats={[2, 2, 4, 2, 2, 4, 2, 2, 4]}
            caption="IV–V–I、ii–V–I、vi–V–I：功能相同，色彩与紧张度不同。" />
        </> },
      ]} />
      <Callout tone="key" title="自然音体系的两条稳定性规律">
        ① 与主和弦共同音越少、在网格上离得越远，越不稳定；② 导音最不稳定，所以 D 组整体比 S 组更不稳定。
        综合起来，七个三和弦大致是 <strong>I &gt; vi &gt; IV &gt; ii &gt; iii &gt; V &gt; vii°</strong>。
      </Callout>
      <p>正三和弦的循环于是扩展成三个功能组的循环：T 组最稳，常用于开头结尾，之后可接任何和弦；D 组张力最大，强烈倾向 T；S 组居中，可承上启下，也可直接回 T。
        古典和声强调 T–S–D–T，D–S 被称为「反功能」而建议慎用；现代音乐中功能组之间几乎可以自由连接。Kostka《调性和声》与 Stephen Mugglin 的和弦路线图，
        都是从 I 出发、沿箭头回到 I 的不同画法，背后依据仍是第一定律。</p>
      <Callout tone="info" title="员工号、职务、部门">
        级数（1–7、I–vii°）像员工号；主音、上主音、中音、下属音、属音、下中音、导音像职务；T、S、D 三组像部门。三套术语都是调性功能思想。
        有人以为「不用 T/S/D、改用级数就是推翻了调性」——其实里曼之前的几百年里，调性和声一直用级数表达；没有调，级数从何谈起？
      </Callout>
    </Block>

    <Block id="color" toc="调性·功能·色彩" kicker="2-3 · 调性、功能与色彩" title="同一个 G 和弦，两种身份">
      <Narrate />
      <p><b>调性</b>是音与和弦围绕主音、主和弦形成的等级制度；<b>功能</b>是它们在调内的分工、稳定性与解决倾向，是建立和维持调性的手段；
        <b>色彩</b>则是和弦本身的音响，不依赖环境。比如 G：在 C 大调里它是急着回家的属和弦 <Play seq={["G", "C"]} gap={1}>G → C</Play>；
        到了 G 大调，它自己就是终点 <Play seq={["D", "G"]} gap={1}>D → G</Play>。但无论在哪个调，它作为大三和弦的明亮色彩都不变。</p>
      <p>B° 的不稳定既来自调内的倾向（含导音、与 I 无共同音），也来自减三和弦自身的阴暗紧张——功能与色彩共同作用。</p>
      <CompareTable left="「金字塔」式（古典调性功能和声）" right="「扁平化」组织（近现代）" rows={[
        { aspect: "中心", left: "主音、主和弦地位唯一而突出", right: "主音中心可被挑战、模糊乃至取消" },
        { aspect: "等级", left: "调内/调外界限分明，功能分工森严", right: "离调、交替等半音化手法让界限松动" },
        { aspect: "逻辑", left: "遵循 T–S–D–T 功能逻辑", right: "非功能和声：更重音响色彩，调性仍可存在" },
        { aspect: "极端", left: "—", right: "主音也被取消：无调性音乐" },
        { aspect: "本书", left: "以此为基础", right: "第三章起逐步引入，进阶篇深入" },
      ]} />
      <p>调性与功能几百年如影随形，以致常被混为一谈；但它们并非绑定：不遵循功能模式也可以建立调性，功能手法反过来也能模糊、瓦解调性。
        想打破传统，也要先知道传统是什么、前人为何如此。</p>
    </Block>

    <Block id="patterns" toc="和声套路" kicker="2-3 · 大调常用的和声套路" title="循环进行与流行套路"
      lead="每条进行都可以点「播放」和「循环」，并在网格上看路线。重点不是背口诀，而是看清它们在图上怎么走、听出它们的味道。">
      <Narrate />
      <Progression title="调内五度圈进行「14736251」" chords={["C", "F", "B°", "Em", "Am", "Dm", "G", "C"]} keyName="C" bpm={88} tonnetz={{ cols: 10, rows: 4, center: "E" }}
        caption="根音一路下行五度（上行四度），在网格上从右往左走；只有 F–B° 是减五度（7 级上方的纯五度是 ♯4，已不在调内）。它是两个 T–S–D–T 的连缀。" />
      <p>V–I 的倾向最强；V 上方五度是 ii，ii–V 也有类似倾向；再往前加 vi、iii……这就是<C id="circle_progression">调内五度圈进行</C>。
        它常被截取使用：<Play seq={["Dm", "G", "C"]} gap={0.9}>ii–V–I</Play>（流行、爵士用得比 IV–V–I 还多）、<Play seq={["Am", "Dm", "G", "C"]} gap={0.8}>vi–ii–V–I</Play>、
        <Play seq={["Em", "Am", "Dm", "G"]} gap={0.8}>iii–vi–ii–V</Play>。例如《隐形的翅膀》副歌是 vi–iii–IV–I–vi–ii–V 两遍再回 I。</p>
      <Tabs tabs={[
        { label: "4536251 · 王道进行", content: <>
          <Progression title="IV–V–iii–vi–ii–V–I（「万能和弦」）" chords={["F", "G", "Em", "Am", "Dm", "G", "C"]} keyName="C" bpm={88}
            caption="把五度圈进行里的 vii° 换成同组的 V。ii 也常换成 IV。" />
          <Progression title="IV–V–iii–vi「4536」（日本称「王道进行」）" chords={["F", "G", "Em", "Am"]} keyName="C" bpm={88} loop tonnetz={{ cols: 8, rows: 3, center: "C" }}
            caption="没有出现主和弦，调感偏向下一章的关系小调。例：《突然好想你》《演员》《青花瓷》《修炼爱情》等。" />
        </> },
        { label: "三度与二度循环", content: <>
          <Progression title="上行三度" chords={["C", "Em", "G", "B°", "Dm", "F", "Am", "C"]} keyName="C" bpm={96} beats={2} />
          <Progression title="下行三度" chords={["C", "Am", "F", "Dm", "B°", "G", "Em", "C"]} keyName="C" bpm={96} beats={2} />
          <Progression title="上行二度" chords={["C", "Dm", "Em", "F", "G", "Am", "B°", "C"]} keyName="C" bpm={96} beats={2} />
          <Progression title="下行二度" chords={["C", "B°", "Am", "G", "F", "Em", "Dm", "C"]} keyName="C" bpm={96} beats={2}
            caption="三度循环在网格上沿斜线锯齿前进（相邻和弦共两个音），二度循环则在四边形里来回跳。其他套路都是对五度、三度、二度进行的截取、粘接、替换与混合。" />
        </> },
        { label: "1645 · 50 年代进行", content: <>
          <Progression title="I–vi–IV–V" chords={["C", "Am", "F", "G"]} keyName="C" bpm={84} loop tonnetz={{ cols: 8, rows: 3, center: "C" }}
            caption="20 世纪 50 年代起大量使用，V 再回到 I 反复循环。例：《你知道我在等你吗》《传奇》。" />
          <Progression title="vi–IV–V–I（「小室进行」）" chords={["Am", "F", "G", "C"]} keyName="C" bpm={84} loop
            caption="从循环的另一处开始。例：久石让《Summer》、《七里香》、《追光者》副歌、《说爱你》。" />
          <Progression title="I–vi–IV–ii–V（「16425」）" chords={["C", "Am", "F", "Dm", "G"]} keyName="C" bpm={84} loop
            caption="用 ii 替换或插在 IV 后，循环时形成连续的五度进行。例：《我的未来不是梦》《征服》副歌。" />
        </> },
        { label: "1564 · 四和弦", content: <>
          <Progression title="I–V–vi–IV（流行朋克进行 / 国际四和弦）" chords={["C", "G", "Am", "F"]} keyName="C" bpm={84} loop tonnetz={{ cols: 8, rows: 3, center: "C" }}
            caption="例：《海阔天空》主歌、《简单爱》主歌、《红蜻蜓》副歌、Adele《Someone Like You》副歌。" />
          <Progression title="vi–IV–I–V" chords={["Am", "F", "C", "G"]} keyName="C" bpm={84} loop
            caption="可谓「烂大街」：《平凡之路》《夜空中最亮的星》《晴天》《光年之外》《芒种》、Alan Walker《Faded》、John Legend《All of Me》、Adele《Hello》。" />
          <Progression title="IV–I–V–vi" chords={["F", "C", "G", "Am"]} keyName="C" bpm={84} loop
            caption="例：Rihanna《Umbrella》。循环落在 vi 上，调感更偏向关系小调（见 3-2）。" />
        </> },
        { label: "卡农进行", content: <>
          <Progression title="帕赫贝尔《D 大调卡农》：I–V–vi–iii–IV–I–IV–V" chords={["D", "A", "Bm", "F#m", "G", "D", "G", "A"]} keyName="D" bpm={72} loop tonnetz={{ cols: 9, rows: 3, center: "D" }}
            caption="约 1680 年的作品，八个和弦反复贯穿全曲，最后落在 I。第七个和弦也可以用 ii。例：《那些花儿》《当》《情非得已》《小酒窝》《千里之外》副歌、《我的歌声里》。" />
          <Progression title="变体：I–V–vi–iii–IV–V–I（《稻香》）" chords={["C", "G", "Am", "Em", "F", "G", "C"]} keyName="C" bpm={84}
            caption="还可以用 I 替 iii、用 iii 或 vi 替第六个和弦、只截取一部分。" />
          <Progression title="变体：I–iii–vi–iii–IV–iii–ii–V（《红豆》）" chords={["C", "Em", "Am", "Em", "F", "Em", "Dm", "G"]} keyName="C" bpm={84} />
        </> },
      ]} />
      <p>以上是<C id="pop_patterns">常用和声套路</C>中最基础的三和弦版本，原曲往往还用七和弦等更丰富的变化，但都能还原成这些骨架。
        许多歌曲旋律不同却「似曾相识」，甚至可以串烧，原因正在于此。欧美乐界有句话：No one can own chords——和声进行没有版权。</p>
      <Callout tone="warn" title="套路与创作态度">
        好听的和声总是相似的：套路是前人总结出的最合乎规律、最不易出错的组合，用了套路不等于作品低质。
        但技术要为表达服务：平缓处用熟悉的套路，关键处多花心思；复杂和声更难驾驭，不要超出自己的能力去堆砌。
        和声只是音乐的一个方面，旋律、节奏、音色、编曲同样重要；而套用模板、粗制滥造的态度，则正是舒曼所说艺术的死敌。
      </Callout>
    </Block>

    <Block id="cadences" toc="终止式" kicker="2-3 · 终止式的种类" title="音乐的标点符号"
      lead="每个按钮都是一种终止。注意听「有没有说完」。">
      <Narrate />
      <CompareTable left="和声" right="听感 / 作用" rows={[
        { aspect: "正格终止", left: <Play seq={["G", "C"]} gap={1}>V–I</Play>, right: "最常用、力量强，明确的结束感（句号）" },
        { aspect: "完全正格终止", left: <><Play seq={["F", "G", "C"]} gap={0.9}>IV–V–I</Play> <Play seq={["Dm", "G", "C"]} gap={0.9}>ii–V–I</Play></>, right: "三个功能组都出现，用到调内全部音" },
        { aspect: "变格终止", left: <Play seq={["F", "C"]} gap={1.1}>IV–I</Play>, right: "又叫教会终止、阿门终止：平静、安详" },
        { aspect: "补充终止", left: <Play seq={["G", "C", "F", "C"]} gap={1}>…V–I + IV–I</Play>, right: "终止之后再加一个小尾巴，如圣咏结尾的「阿门」" },
        { aspect: "半终止", left: <Play seq={["C", "F", "G"]} gap={1}>…V</Play>, right: "停在不稳定和弦上，暂时停顿（逗号）；放在曲末则悬而未决" },
        { aspect: "阻碍（伪）终止", left: <Play seq={["F", "G", "Am"]} gap={1}>V–vi</Play>, right: "预期的结束被打断，推迟终止、扩展乐段" },
      ]} />
      <p>落在主和弦上的是<b>收拢性终止</b>，不落在主和弦上的是<b>开放性终止</b>。<C id="cadence">终止式</C>不只是和声公式，还必须有结构上的句读作用：
        句中出现的 V–I 若没有终止感，就不算终止式。终止也有强弱之分，取决于力度、色彩和解决的完满程度。</p>
      <Callout tone="quote" title="和声第零定律：理论服从实践">
        音乐的物理本质是声波，但它是艺术而非科学：一切理论都要服从实践，以人的感受为最高标准——「看、听、唱、弹」。
        理论是从大量实践中总结出的经验与建议，不是枷锁；但也不能以「实践为上」为借口拒绝思考。毛姆的话可以作注：
        <i>Tradition is a guide, and not a jailer.</i>（传统是向导，不是狱卒。）从「学会规矩」到「忘记规矩」。
      </Callout>
    </Block>

    {/* ───────────── 2-4 ───────────── */}
    <Block id="sevenths" toc="七和弦" kicker="2-4 · 大调的七和弦" title="再叠一个三度"
      lead="和声变化的第二招是延伸：在三和弦上面再叠一个三度，就得到七和弦。">
      <Narrate />
      <p><b>大七和弦。</b>C–E–G 加上 G 上方三度的 B：C 到 B 是大七度，整体是「大三和弦 + 大七度」，叫大大七和弦，简称大七和弦，本书记作 CΔ（也写 CM7、Cmaj7）。
        比较 <Play chord="C" arp={0.05}>C</Play> <Play chord="CΔ" arp={0.05}>CΔ</Play> <Play chord="Em" arp={0.05}>Em</Play>：既相似又不同。
        CΔ 的下面三个音是 C、上面三个音是 Em，所以也可写成斜线和弦 Em/C（斜线后是低音）——延伸既可以向上叠，也可以向下叠。
        C–B 的大七度不协和，B 又是导音，所以 CΔ 比 C 更紧张。记七和弦时，最好直接想根音到三、五、七音的音程：大三度、纯五度、大七度。</p>
      <p>C 大调里还有一个大七和弦 <Play chord="FΔ" arp={0.05}>FΔ</Play>：大调的 IΔ 与 IVΔ。字母记号不能写成 C7、F7，否则会与属七混淆。
        CΔ 既是 C 大调的 IΔ，也是 G 大调的 IVΔ。</p>
      <p><b>属七和弦。</b>G–B–D 加上 F，G 到 F 是小七度：「大三和弦 + 小七度」，按结构叫大小七和弦，在 V 级上就是<C id="dominant_seventh">属七和弦</C> G7（级数 V7）：
        <Play chord="G7" arp={0.05}>G7</Play>。在网格上它是一个斜放的直角三角形，可看作 G 与 B° 的叠加（B°/G）；反过来 B° 也像省略根音的 G7。</p>
      <Callout tone="key" title="属七和弦为什么最重要">
        三音 B 是导音，想上行到 C；七音 F 是 4 级，想下行到 E；B–F 构成三全音——大调里唯一的一对，属七的特征音程：<Play notes="B3 F4">B–F</Play> → <Play notes="C4 E4">C–E</Play>。
        所以 V7 比 V 更紧张、属功能更强，<Play seq={["G7", "C"]} gap={1.1}>V7–I</Play> 比 V–I 更常用。每个大调只有一个 V7，听到它就能断定主音——分析作品的窍门，也是建立调感最快的方法。
      </Callout>
      <Tabs tabs={[
        { label: "拉长紧张", content: <Progression title="G7 ×7 → C" chords={["G7", "G7", "G7", "G7", "G7", "G7", "G7", "C"]} keyName="C" beats={[1, 1, 1, 1, 1, 1, 1, 4]} bpm={88}
          caption="属七持续越久，对主和弦的期待越强，最后的解决越畅快。" /> },
        { label: "正格 vs 阻碍", content: <>
          <Progression title="V7–I" chords={["G7", "C"]} keyName="C" bpm={66} caption="自然而完满。" />
          <Progression title="V7–vi（阻碍进行）" chords={["G7", "Am", "F", "G7", "C"]} keyName="C" bpm={80} beats={[4, 4, 2, 2, 4]}
            caption="意外又不满足；之后常接 IV、ii、V，把乐段延续下去，再真正结束。" />
        </> },
      ]} />
      <p><b>小七和弦与半减七和弦。</b>ii、iii、vi 级上是「小三和弦 + 小七度」的小七和弦：<Play chord="Dm7" arp={0.05}>Dm7</Play> <Play chord="Em7" arp={0.05}>Em7</Play> <Play chord="Am7" arp={0.05}>Am7</Play>，
        级数 ii7、iii7、vi7。它们不能写成 D7、A7、E7；「−7」的写法容易与「减」或降号混淆，本书不推荐。三者都可代替同级三和弦，其中 ii7 用得最多：
        它同时包含 ii 和 IV 两个 S 组三和弦，下属功能鲜明（斯氏和声的「下属七和弦」专指 ii7）；而 IVΔ 上方三音构成 vi，反倒冲淡了下属味。
        <Play seq={["Dm7", "G7", "CΔ"]} gap={1.1}>ii7–V7–IΔ</Play> 是爵士和声最基本的套路。</p>
      <p>7 级上 B–D–F–A 是「减三和弦 + 小七度」：减小七和弦、<b>半减七和弦</b>，也叫大调的（自然）导七和弦，记作 Bø 或 Bm7♭5：
        <Play chord="Bø" arp={0.05}>Bø</Play>。与 <Play chord="Bm7" arp={0.05}>Bm7</Play>（B–D–F♯–A）相比只是五音降了半音。Bø 可看作 B° 与 Dm 的叠加（Dm/B），
        因 B–F 三全音而偏向属功能，听起来更像 B° 而不像 Dm。</p>
      <Progression title="C 大调的七个七和弦" chords={["CΔ", "Dm7", "Em7", "FΔ", "G7", "Am7", "Bø"]} roman={["IΔ", "ii7", "iii7", "IVΔ", "V7", "vi7", "viiø"]} bpm={72} tonnetz={{ cols: 9, rows: 4, center: "D" }}
        caption="大七（I、IV）、小七（ii、iii、vi）、属七（V）、半减七（vii）。其中 V7、viiø、ii7 最常用。专属图解里点「七和弦」可在网格上看到它们的形状。" />
      <Score abc={'"CΔ"[CEGB]2 "Dm7"[DFAc]2 | "Em7"[EGBd]2 "FΔ"[FAce]2 | "G7"[GBdf]2 "Am7"[Aceg]2 | "Bø"[Bdfa]4 |]'} tempo={80}
        caption="同样七个七和弦写在五线谱上：每个和弦都是四个音隔一个音叠起来（「线线线线」或「间间间间」）。" />
      <Callout tone="info" title="练一练">
        把前面几节例子里的三和弦换成七和弦听听效果；再任选一个根音，在网格上分别搭出大七、小七、属七、半减七和弦，比较它们的结构与音响。
      </Callout>
    </Block>

    <Block id="history" toc="七和弦的发展" kicker="2-4 · 七和弦的发展" title="从「必须解决」到「可以常驻」"
      lead="和声史在某种意义上就是人们逐渐接受、乃至享受不协和音响的历史。">
      <Narrate />
      <Timeline events={[
        { year: "中世纪", label: "五度、四度的「和音」", note: "宗教音乐要求和谐神圣，先发现纯五度、纯四度的协和，后加入大小三度，形成三和弦；不协和音受禁止，七和弦地位不高。" },
        { year: "文艺复兴—巴洛克", label: "七和弦出现，但须准备与解决", note: "平均律推广、大小调占据主流，增减和弦与七和弦出现，但使用前要准备、使用后必须解决——有笑话说七和弦不解决，巴洛克作曲家会睡不着觉。" },
        { year: "古典时期", label: "逐渐松绑", note: "从海顿、莫扎特到贝多芬，七和弦的限制慢慢放宽。" },
        { year: "浪漫派—近现代", label: "七和弦稀松平常", note: "肖邦、瓦格纳、德彪西、拉赫玛尼诺夫等让和声越来越复杂，更高叠的和弦与大量变化音出现。" },
        { year: "20 世纪", label: "爵士以七和弦为基础", note: "七音无须准备与解决，可以长期存在；爵士发展出独特的调式与和声体系。另一方向是无调性、十二音、微分音等。" },
        { year: "当代", label: "返璞归真", note: "新世纪、轻音乐等风格又回到三和弦的简单纯净——音乐螺旋上升。" },
      ]} />
      <p>想给和声加点「爵士味」，最简单的办法就是把三和弦换成七和弦：<Play seq={["C", "Am", "Dm", "G"]} gap={1}>C–Am–Dm–G</Play> → <Play seq={["CΔ", "Am7", "Dm7", "G7"]} gap={1}>CΔ–Am7–Dm7–G7</Play>。
        当然这只是入门：整体不协和度提高后，还需要更多手段去制造新的紧张与释放。</p>
    </Block>

    <Block id="ear" toc="听音练习" kicker="动耳朵" title="听音练习：功能与和弦性质" lead="不看谱，只用耳朵。每题可以反复听。">
      <EarQuiz items={[
        { q: "这条进行停在了哪里？", play: { seq: ["C", "F", "G"], gap: 0.9 }, options: ["主和弦，已经结束（终止）", "属和弦，像逗号（半终止）"], answer: 1, why: "C–F–G 停在 V 上，意犹未尽，期待回到 C。" },
        { q: "最后一个和弦是主和弦，还是被「打断」了？", play: { seq: ["F", "G7", "Am"], gap: 1 }, options: ["V7–I 正格终止", "V7–vi 阻碍终止"], answer: 1, why: "G7 之后来了 Am：意外而不满足，这就是阻碍进行。" },
        { q: "这是正格终止还是变格终止？", play: { seq: ["C", "F", "C"], gap: 1 }, options: ["正格 V–I", "变格 IV–I"], answer: 1, why: "F–C 是「下属—主」，紧张感较弱，像「阿门」。" },
        { q: "这个三和弦是？", play: { chord: "B°", arp: 0.05 }, options: ["大三和弦", "小三和弦", "减三和弦"], answer: 2, why: "B–D–F：两个小三度，根音到五音是减五度，紧张阴暗。" },
        { q: "在 C 之后，第二个和弦属于哪个功能组？", play: { seq: ["C", "Dm"], gap: 1.1 }, options: ["T 主功能", "S 下属功能", "D 属功能"], answer: 1, why: "Dm 是 ii，与主和弦没有共同音，属于下属功能组。" },
        { q: "这个七和弦是？", play: { chord: "G7", arp: 0.05 }, options: ["大七和弦（如 CΔ）", "属七和弦（如 G7）", "小七和弦（如 Dm7）"], answer: 1, why: "大三和弦 + 小七度，内含三全音 B–F，紧张、急于解决。" },
      ]} />
    </Block>

    <Block id="concepts" toc="概念卡" kicker="核心概念" title="本章 14 个概念"><ConceptGrid /></Block>
    <Block id="map" toc="概念图" kicker="概念关系" title="它们怎样连在一起"><ConceptMap /></Block>

    <Block id="quiz" toc="自测" kicker="检验理解" title="自测">
      <Quiz questions={[
        { q: "E♭ 大调的 4 级音为什么写成 A♭ 而不是 G♯？", options: ["A♭ 听起来更低", "七个字母必须各用一次，且降号调不用升号", "G♯ 不在键盘上", "书中随意规定"], answer: 1, why: "3 级已经是 G，4 级再用 G 就重复了；而且自然调式不混用升降号。" },
        { q: "在网格上，以 G 为主和弦时，它的下属和弦在哪里？", options: ["右边一格：D", "左边一格：C", "正上方：Bm", "左上：Em"], answer: 1, why: "正三和弦沿五度横线并排：下属在左一格，属在右一格。" },
        { q: "为什么乐句中间常用 vi 或 iii 代替 I？", options: ["因为 I 不在调内", "保留主功能，又避免过早的结束感", "因为小三和弦更响", "为了制造最强的紧张"], answer: 1, why: "「六三代一」：同组替换，功能基本不变，色彩更暗、不像收尾。" },
        { q: "七个调内三和弦的稳定性排序，哪一个最接近书中的结论？", options: ["I > ii > iii > IV > V > vi > vii°", "I > vi > IV > ii > iii > V > vii°", "I > V > IV > vi > ii > iii > vii°", "vii° > V > iii > ii > IV > vi > I"], answer: 1, why: "共同音越少越不稳定，且含导音的 D 组整体比 S 组更不稳定。" },
        { q: "关于「I–V–IV–I」，本书的态度是？", options: ["是错误进行，应避免", "古典称为反功能、建议慎用，但现代音乐广泛使用，不建议用贬义的叫法", "只能用于小调", "等同于阻碍终止"], answer: 1, why: "它「快准备、慢解决」，更从容，流行与布鲁斯常用。" },
        { q: "听到 A7（大小七和弦）作为属七出现，主音最可能是？", options: ["A", "E", "D", "G"], answer: 2, why: "每个大调只有一个 V7：A 是 D 大调的 5 级，所以 A7 是 D 大调的 V7。" },
      ]} />
    </Block>

    <Block id="end" toc="小结">
      <Takeaways items={[
        "大调是五度圈上连续的七个音；在网格上是一个 1×3 的平行四边形，平移即可换调，拼写遵循「七字母各一、升降不混」。",
        "七个调内三和弦：I、IV、V 为大，ii、iii、vi 为小，vii° 为减；I 主（稳定）、IV 下属（运动）、V 属（紧张）是骨架。",
        "和声第一定律：稳定—不稳定—稳定。准备与解决、正格与变格、曳动都由此而来；编配时先定终止式，再填充，和弦要包含旋律音（第二定律）。",
        "副三和弦按共同音归入 T（vi I iii）、S（ii IV vi）、D（iii V vii°）三组，同组可替换；各种流行套路都是功能逻辑的截取与组合。",
        "七和弦是三和弦的延伸：IΔ IVΔ、ii7 iii7 vi7、V7、viiø。属七含导音与唯一的三全音，最紧张，也最能确立调性。",
      ]} />
      <Bridge><p>大调的平行四边形里，有一个和弦格外「骑墙」：vi。循环落在 <Play seq={["F", "G", "Am"]} gap={0.9}>IV–V–vi</Play> 时，你可能已经觉得音乐暗了下来、像换了一个中心。
        下一章就让 Am 当主角：同一块四边形、同样七个音，换一个主音就是 A 小调。你还会发现属七和弦并不专属于大调——为了让小调也能「回家」，人们改动了一个音。</p></Bridge>
    </Block>

    <Block id="gloss" toc="术语" title="术语表">
      <Glossary terms={[
        { term: "Natural major", zh: "自然大调", def: "五度圈上连续七个音构成的调，以其中第二个音为主音。" },
        { term: "Tonic", zh: "主音 / 主和弦", def: "调的中心，最稳定；主和弦记作 I 或 T。" },
        { term: "Diatonic / Chromatic", zh: "调内（自然）/ 调外（变化）", def: "属于 / 不属于该调七个音的音或和弦。" },
        { term: "Scale degree", zh: "音级", def: "调内音按音高的编号 1–7。" },
        { term: "Roman numeral", zh: "级数", def: "罗马数字标记和弦在调内的位置，本书大写为大三、小写为小三。" },
        { term: "Diminished triad", zh: "减三和弦", def: "小三度 + 小三度，根音到五音为减五度，如 B°。" },
        { term: "Dominant / Subdominant", zh: "属 / 下属", def: "主音上方 / 下方纯五度的音及其和弦（V / IV）。" },
        { term: "Leading tone", zh: "导音", def: "7 级音，比主音低半音，属功能的特征音。" },
        { term: "Function group", zh: "功能组", def: "T（vi I iii）、S（ii IV vi）、D（iii V vii°）。" },
        { term: "Resolution", zh: "解决", def: "从相对不稳定、不协和进行到相对稳定、协和。" },
        { term: "Authentic / Plagal", zh: "正格 / 变格", def: "V–I / IV–I 的进行或终止。" },
        { term: "Cadence", zh: "终止式", def: "乐句末尾具有句读作用的和声进行。" },
        { term: "Half / Deceptive cadence", zh: "半终止 / 阻碍终止", def: "停在 V、IV 等不稳定和弦 / 用 vi 等代替预期的 I。" },
        { term: "Harmonization", zh: "和声编配", def: "根据旋律安排和弦。" },
        { term: "Non-chord tone", zh: "和弦外音", def: "不属于当下和弦的旋律音。" },
        { term: "Substitution", zh: "和弦替换", def: "用功能相近的和弦代替原和弦。" },
        { term: "Diatonic circle progression", zh: "调内五度圈进行", def: "I–IV–vii°–iii–vi–ii–V–I。" },
        { term: "Slash chord", zh: "斜线和弦", def: "和弦/低音，如 Em/C。" },
        { term: "Major 7th / Dominant 7th", zh: "大七 / 属七和弦", def: "大三 + 大七度（CΔ）/ 大三 + 小七度（G7）。" },
        { term: "Minor 7th / Half-diminished 7th", zh: "小七 / 半减七和弦", def: "小三 + 小七度（Dm7）/ 减三 + 小七度（Bø = Bm7♭5）。" },
      ]} />
    </Block>
  </ChapterPage>;
}
