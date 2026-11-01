// 第 4 章 · 副调和弦（离调、副属/副导和弦、五度圈进行、近关系调；综合谱例《马赛曲》）
import { ChapterPage, Block, Hook, SectionCards, ArgumentFlow, ConceptGrid, ConceptMap, Quiz, Takeaways, Bridge, Glossary, C, Callout, Tabs, Toggle } from "@kit";
import { Play, SoundBar, Tonnetz, EarQuiz, Narrate, Score, Progression } from "@kit/audio";
import { TempTonic, ChordHunter } from "./_ch04_lab.jsx";
import { grand, chordsOf, HAPPY, INTER, MARS } from "./_ch04_scores.js";

export const meta = {
  id: "ch04", no: 4, title_zh: "副调和弦", title_en: "Secondary Chords",
  era: "基础篇 · 调与功能 · 戴上耳机效果更好",
  one_liner: "把任何一个调内和弦临时当成主和弦，在它前面放上它的属和弦——和声就会短暂地「离家」一次。",
  big_question: "除了同名调，还能从哪些调「借」和弦？D7 出现在 C 大调里，为什么听起来如此有推动力？",
  why_it_matters: "副属和弦（V7/X）几乎是所有流行、爵士与古典音乐里最常见的调外和弦。理解了「临时主音」的思路，你就能看懂 2-5-1 替换、拉格泰姆连锁进行，也能判断一段音乐是离调还是转调。网格上，它们只是主调旁边的几个邻居。",
  original_words: 17000, read_minutes: 35,
};

export const groups = [
  { id: "idea", label: "离调的思想" },
  { id: "chord", label: "副调和弦" },
  { id: "path", label: "进行与调关系" },
];

export const concepts = [
  { id: "tonicization", name_zh: "主音化与离调", name_en: "Tonicization", icon: "🎯", section_id: "s1", group: "idea",
    plain: "把调主音以外的某个音临时当主音，让和声短暂偏离本调。",
    explain: "C 大调里除了主和弦 C，F、G、Dm、Em、Am 都是大三或小三和弦，各自都可以「独挑大梁」做别的调的主和弦。把它们临时当作主和弦，前面加上属于那个调的和弦，就是主音化；在中文语境里，这种短暂偏离本调的手法叫离调。\n\n离调要「临时」「缩小」：规模小、不做完整终止，很快回到本调。导音上的减三和弦不能当主和弦，所以古典和声里不在它上面离调；浪漫派以后，这个限制被打破，几乎任何和弦都可以被主音化。",
    analogy: "像在自己家里请邻居来坐一会儿：屋子还是你的，只是这几分钟里话题围着客人转，客人一走，一切照旧。",
    book_example: { what: "书中以 C 大调为例：F、G、d、e、a 五个调都是 C 的「邻居」，统称副调，C 本身是主调。", point: "副调都是关系很近的调，离调的手续因此很简单。" },
    misconception: "离调不是转调：离调后仍回到本调，调感没有真正转移。" },
  { id: "secondary_chord", name_zh: "副调和弦与 Y/X 记号", name_en: "Secondary chords", icon: "🔖", section_id: "s1", group: "chord",
    plain: "副调里的和弦；级数写成 Y/X，读作「X 级和弦的 Y 级和弦」。",
    explain: "副调上的和弦统称副调和弦（注意和第二章的「副三和弦」不是一回事）。和弦记号照常按和弦本身写，级数则写成 Y/X，这里的斜线相当于英语的 of：V/V 是「V 级的 V 级」，ii7/iii 是「iii 级的 ii 级小七和弦」。\n\n常见片段有 IV/X–V7/X–X、ii7/X–V7/X–X、ii7/X–V7/X–vi/X 等，相当于在副调里走一遍正格、变格或阻碍进行。这里的斜线和斜线和弦（C/E）的斜线意思完全不同。",
    analogy: "像「朋友的朋友」：V/V 就是「属和弦的属和弦」，按关系链找人，而不是按门牌号。",
    book_example: { what: "C 大调中 D 和弦记为 V/V，F♯°7 记为 vii°7/V；也有人站在本调角度记为 II、♯iv°7。", point: "两种写法指同一个和弦，前者讲功能，后者讲位置。" },
    misconception: "V/V 里的「/」不是低音记号；C/E 才是「E 在低音的 C 和弦」。" },
  { id: "secondary_dominant", name_zh: "副属和弦", name_en: "Secondary dominant", icon: "➡️", section_id: "s1", group: "chord",
    plain: "某个和弦 X 的属（七）和弦 V(7)/X，强烈地倾向解决到 X。",
    explain: "副调里最常用的是属和弦。在任何一个和弦 X 前面放上它的属七和弦，就得到 V7/X–X，像一个缩小版的属–主终止。因为副属和弦里带着调外音（往往是 X 的导音），它比调内和弦更不稳定、解决的倾向更强，让音乐的起伏更大、张力更足。\n\n在网格上，V/X 的三角形就在 X 右边一格（上方纯五度）。从十九世纪起，副属和弦的用法推广到了任意和弦，前面还可以再加上它的 IV 或 ii，组成完整的离调片段。",
    analogy: "像短跑的起跑器：本来平地也能起跑，蹬上起跑器（副属）就能把力量全部导向下一个目标。",
    book_example: { what: "C–Am–D7–G7–C：D7 是 V7/V，含有调外音 F♯，把耳朵引向 G。", point: "比起 C–Am–Dm–G7–C，多了一个「被拉过去」的力量。" },
    misconception: "副属和弦不一定要解决到目标；有意进行到别处就形成「意外进行」，同样是常用手法。" },
  { id: "secondary_leading", name_zh: "副导和弦", name_en: "Secondary leading-tone chord", icon: "🪜", section_id: "s1", group: "chord",
    plain: "X 的导七和弦 vii°7/X：根音比 X 低半音，同样急着解决到 X。",
    explain: "除了属和弦，属功能组里的导和弦也能离调：vii°/X、viiø7/X，最常用的是借自和声小调的减七和弦 vii°7/X。它的根音正是 X 的导音，与 X 的根音只差一个半音。\n\n记忆诀窍是「七级代五」：V7/X 和 vii°7/X 可以互相替换，后者共用了前者的三个音，只把根音换成了降九音。减七和弦的四个音在网格上围成一个菱形，几个半音一起往 X 收拢。",
    analogy: "像从侧门进屋：副属从正门（五度）进，副导从紧挨着的侧门（半音）进，到的是同一个房间。",
    book_example: { what: "C 大调中 F、C、Dm 或 Am 之后接 F♯°7–G–C，低声部可以走 F–F♯–G 的平稳半音线。", point: "副导和弦既增加离调感，又让声部连接更顺。" },
    misconception: "减七和弦并不「怪」；放在目标和弦前半音的位置，它是最顺耳的过渡之一。" },
  { id: "double_dominant", name_zh: "重属和声组", name_en: "Double dominant (DD)", icon: "⏩", section_id: "s2", group: "chord",
    plain: "属调的属功能和弦：C 大调里的 D、D7、F♯°、F♯ø7、F♯°7，特征音是 ♯4 级。",
    explain: "以属音为主音的属调是最重要的副调。它的属功能组在离调时最常用，德奥、苏俄和中国的和声理论专门叫它「重（chóng）属」，标记为 DD。C 大调的重属三和弦是 D（V/V），重属导三和弦是 F♯°，七和弦是 D7、F♯ø7 和最常用的 F♯°7。\n\n它们的共同特征是 ♯4 级音（C 大调里的 F♯）：这是 G 大调的导音，也是 G、C 两调唯一不同的音，因此离调感非常强。属调的其他和弦（Am、Em、C 等）与主调共用，难以制造离调感，但正好可以当「共同和弦」为离调铺路。",
    analogy: "像「领导的领导」：平时不露面，一出场就让所有人都向直接领导（属和弦）看齐。",
    book_example: { what: "《生日快乐》重新配和弦后出现 F♯°7–G 与 D7–G7–C 两处重属进行。", point: "简单的旋律换上副调和弦，立刻丰富得多。" },
    misconception: "D 和弦在 C 大调里也可以理解为借用（例如后面接 E 时）；接 G 时看作重属更自然。同一个和弦可以有不同理解。" },
  { id: "subdominant_key", name_zh: "下属调与 ♭VII", name_en: "Subdominant tonicization", icon: "⬅️", section_id: "s3", group: "chord",
    plain: "下属调的离调和弦都含 ♭7 级音：C7、E°7、Gm（ii/IV）、B♭（IV/IV）。",
    explain: "下属调与主调也有六个音、四个三和弦相同。能产生离调感的必须含两调唯一不同的音——♭7 级（C 大调的 B♭）。V/IV 就是主和弦 C 本身，只有加了七音的 C7（V7/IV）、导和弦 E°、Eø7、E°7 是离调的。C–C7–F 就在主–下属之间插入了一个推动力。\n\n下属调的下属组（重下属 SS）里有 Gm 与 B♭，它们和同名小调的 v、♭VII 重合，于是有三种解释：离调的 ii/IV、IV/IV；借用自同名小调；或混合利底亚调式。B♭ 进行到 F 时看作 IV/IV 最自然（如 I–V–♭VII–IV 循环）；B♭–C 的终止更像借用。",
    analogy: "像同一张面孔出现在两个家族合影里：要看它站在谁身边，才知道该算哪一家的亲戚。",
    book_example: { what: "C–CΔ–C7–F：四个和弦里藏着 C–B–B♭–A 的半音下行。", point: "副属和弦既增加动力，也能造出平滑的半音线条。" },
    misconception: "♭VII 不总是借用和弦；后接 IV 时把它当 IV/IV 更顺理成章。" },
  { id: "ii_v_sub", name_zh: "二五替换", name_en: "ii–V substitution", icon: "🔄", section_id: "s1", group: "path",
    plain: "在任意和弦 X 前插入它的 ii–V，用一组「2-5-1」顶替一个和弦。",
    explain: "既然任何和弦都能有自己的 V7，前面再加上 X 调的 ii（小七或半减七），就得到 ii7/X–V7/X–X。这三个和弦的根音正好沿着五度圈连走两步，是爵士和声最有代表性的套路，叫二五替换。\n\n爵士乐谱上常用「括号–箭头」记号标出它：横线括住 ii–V，箭头指出属七到临时主和弦的解决。网格上，三个三角形沿水平线自右向左排成一串。",
    analogy: "像导航里的「先上匝道再并线」：直接拐弯也行，但多走两步，进入目标车道时更顺畅、更有冲力。",
    book_example: { what: "C 大调 V7–I 之前插入 G 大调的 ii–V：Am7–D7–G7–C。", point: "Am7 同时是 C 的 vi7 和 G 的 ii7，是两个调之间的桥梁。" },
    misconception: "二五替换不是爵士专利，它就是古典「离调」思想的现代说法。" },
  { id: "common_chord", name_zh: "共同和弦", name_en: "Common chord", icon: "🤝", section_id: "s2", group: "path",
    plain: "两个调都有的和弦；本身不制造离调感，却能为离调铺路。",
    explain: "属调和主调只差一个调号：在网格上两个调的区域大面积重叠，共有六个音、四个三和弦、三个七和弦。比如 C 与 G 大调共有 C、G、Em、Am 四个三和弦。\n\n这些共同和弦不能制造离调感，但可以当「桥」：先用一个两调都有的和弦，再进入只属于新调的和弦，离调就显得自然。这一技巧在第十一章转调中还会大展身手。",
    analogy: "像两国边境上的双语小镇：在这里说哪种语言都行，所以从这儿过境最不显突兀。",
    book_example: { what: "C 大调中 Am7–D7–G：Am7 既是 C 的 vi7，也是 G 的 ii7。", point: "先站在共同和弦上，再迈出离调的那一步。" },
    misconception: "共同和弦本身不是离调和弦，真正带来离调感的是含特征音的和弦。" },
  { id: "chain_progression", name_zh: "连锁进行与五度圈进行", name_en: "Chain / circle-of-fifths progression", icon: "⛓️", section_id: "s5", group: "path",
    plain: "副属的副属的副属……一串属七和弦沿五度圈不断下行解决。",
    explain: "D7–G7–C 是在 V7–I 前加了 V7/V；再给 D7 加上它的属和弦 A7，再给 A7 加上 E7……这个过程可以一直向前迭代，在网格上就是沿水平线不断向左。古典和声叫它副属七和弦的连锁进行；拉格泰姆音乐常用，所以又叫拉格泰姆进行。\n\n它像一条调性的「快速环线」，从任何一处都能离开、落到相应的主和弦上。把和弦性质从属七推广到大七、小七、半减七，根音依旧五度下行，就是爵士和流行里极常见的五度圈进行。",
    analogy: "像多米诺骨牌：每一块都倒向下一块，力量一路传下去，直到最后一块（主和弦）落地。",
    book_example: { what: "调内循环 viiø–iii7–vi7–ii7–V7–I 的离调版：B7–E7–A7–D7–G7–C。", point: "无论级数怎么记，根音连续五度下行，一听就认得出。" },
    misconception: "连锁进行很少完整绕一圈；实际作品通常只截取其中三四个和弦。" },
  { id: "deceptive_secondary", name_zh: "意外进行", name_en: "Unexpected resolution", icon: "❗", section_id: "s2", group: "path",
    plain: "副属或副导和弦不解决到临时主和弦，有意转向别处。",
    explain: "副属和弦让耳朵预期某个目标；如果偏偏不去，就制造了惊喜。C–D7–Em–Am 里，D7 本该去 G，却落到了 Em；更大胆的 C–D7–G♯m–F♯ 甚至跳出了调外。\n\n关键在于听感是否合理。这种手法与第二章的阻碍进行一脉相承：先建立期待，再以出人意料又说得通的方式打破它。",
    analogy: "像电影里的反转：铺垫都指向 A，最后揭晓的是 B——前提是回头看时，B 也说得通。",
    book_example: { what: "C–D7–Em–Am 与 C–D7–G♯m–F♯ 两个意外进行。", point: "副属和弦建立的期待越强，打破它的效果就越鲜明。" },
    misconception: "「不解决」不等于写错，只要听起来合理就是有效的手法。" },
  { id: "closely_related", name_zh: "近关系调", name_en: "Closely related keys", icon: "🏘️", section_id: "s6", group: "path",
    plain: "与本调共有大量和弦的调；狭义指调号相差不超过一个的五个调。",
    explain: "最狭义的近关系调是关系调、属调、下属调以及后两者的关系调——正是本调的五个副调，例如 C 大调的 a、G、e、F、d。更宽的定义还把同名调、关系调的同名调及其关系调，乃至大调的小下属调、小调的大属调都算进来。\n\n在网格上，这些关系一目了然：关系调与本调几乎重合，属调在右边平移一格，下属调在左边平移一格，同名小调在下方并排、同名大调在上方并排。把它们全部算上，可用的和弦几乎盖满整张图。",
    analogy: "像住在同一个街区的亲戚：串门不需要坐车，抬脚就到。",
    book_example: { what: "书中把 C 大调最广义的近关系调画在网格上：F、C、G、d、a、e、c、E♭、f、A、f♯。", point: "剩下的空格，凭二次离调、借用或下一章的变和弦就能到达。" },
    misconception: "近关系调的范围理论界并不统一，不必死记，学会在网格上「看」即可。" },
  { id: "modulation", name_zh: "离调与转调", name_en: "Tonicization vs. modulation", icon: "🧭", section_id: "s7", group: "idea",
    plain: "短暂偏离、随后回家是离调；新调站稳脚跟、不再回来是转调。",
    explain: "判断离调还是转调，主要看两点：一是长度——离调一般是几个和弦到一两个乐句，谱面多用临时记号；转调通常持续两句以上，甚至到乐段或全曲结束，往往会换调号。二是新调是否确立——典型标志是新调的正格终止，否则新调地位不稳，更适合看作离调。\n\n两者本质上只有程度之差，并非泾渭分明，有些理论干脆不严格区分。《马赛曲》里那段 g 小调片段很短，又通过 D7 回到 G 大调，所以按离调处理。",
    analogy: "像出差和搬家：出差几天就回来，家还在原处；搬家则是把户口都迁走了。",
    book_example: { what: "《马赛曲》第四行几乎全是 g 小调和弦，有的乐谱写临时记号，有的直接改了调号。", point: "长度与是否确立新调，共同决定该叫离调还是转调。" },
    misconception: "换了几个调外和弦不等于转调；没有确立新主和弦，就仍是离调。" },
  { id: "voice_independence", name_zh: "和声第三定律", name_en: "Third law: independent voices", icon: "🎚️", section_id: "s7", group: "idea",
    plain: "和声可以拆成几个声部，各自连接、各自变化。",
    explain: "《马赛曲》中出现了一个 C7：既不像 F 调的属七，也不像 g 小调 Cm7 的借用。仔细看，它的七音 B♭ 在旋律里——和声已经从 g 小调的 Cm 换到 G 大调的 C，旋律却暂时留在 g 小调，两条线临时叠在一起，就成了 C7。\n\n这提示了一个重要原则：和声的各个声部有一定独立性，可以各走各的路。本书把它定为和声第三定律，它协调了纵向和弦与横向声部，是第六到九章许多技法的依据。",
    analogy: "像两个人并肩走路：各自迈步，某一瞬间的「合影」看起来像一个新姿势，其实是两人各自动作的叠加。",
    book_example: { what: "《马赛曲》g 小调段落中的 C7：大三和弦 C + 旋律中的 B♭。", point: "有些「怪和弦」要按声部拆开理解。" },
    misconception: "不是每个和弦都要找一个调来「解释」；有时它只是几条旋律线的偶然交汇。" },
  { id: "chromaticism", name_zh: "半音化", name_en: "Chromaticism", icon: "🌈", section_id: "s8", group: "idea",
    plain: "在调内和弦之外使用调外音的总称；离调与借用都属于它。",
    explain: "至此，替换、延伸、半音三类和声变化都已出现。借用与离调都是半音化的方法，二者部分交叉；借用也可以看作一种替换。它们还能复合：借用和弦的副属和弦、副调和弦的二次借用……\n\n古典、爵士与流行对「变和弦」的定义各不相同：爵士专指变化属和弦，范围最小；流行里泛指一切含调外音的和弦，几乎等于半音化；古典定义介于二者之间——在离调、借用之外，把和弦中的次要音半音化。本书下一章采用古典定义。",
    analogy: "像调色盘：自然音是七种基本颜料，半音化就是往里加别的颜色——离调和借用是两种常用的加法，变和弦是第三种。",
    book_example: { what: "书中用一张集合图：半音化的大圈里，离调与借用两圈相交，其余部分是变和弦。", point: "名词的争议不必纠结，一切以听感为准（和声第零定律）。" },
    misconception: "术语不统一不代表理论混乱；理解思路、会用和弦才是目的。" },
];

export const relations = [
  { from: "tonicization", to: "secondary_chord", label: "临时主和弦" },
  { from: "secondary_chord", to: "secondary_dominant", label: "最常用" },
  { from: "secondary_chord", to: "secondary_leading", label: "最常用" },
  { from: "secondary_dominant", to: "secondary_leading", label: "七级代五" },
  { from: "secondary_dominant", to: "double_dominant", label: "V/V" },
  { from: "secondary_dominant", to: "subdominant_key", label: "V7/IV" },
  { from: "secondary_dominant", to: "ii_v_sub", label: "前加 ii" },
  { from: "secondary_dominant", to: "chain_progression", label: "不断迭代" },
  { from: "secondary_dominant", to: "deceptive_secondary", label: "不解决" },
  { from: "double_dominant", to: "common_chord", label: "共同和弦铺路" },
  { from: "ii_v_sub", to: "chain_progression", label: "五度下行" },
  { from: "common_chord", to: "closely_related", label: "共享越多越近" },
  { from: "tonicization", to: "modulation", label: "程度之差" },
  { from: "modulation", to: "voice_independence", label: "马赛曲" },
  { from: "tonicization", to: "chromaticism", label: "属于" },
  { from: "subdominant_key", to: "chromaticism", label: "与借用交叉" },
];

const sections = [
  { id: "s1", no: "4-1", title_zh: "主音化与离调", title_en: "Tonicization", gist: "把调内和弦临时当主和弦，前面放上它的属和弦。",
    summary: "C 大调除主和弦外的五个大小三和弦都能做临时主和弦，对应 F、G、d、e、a 五个副调。副调上的和弦叫副调和弦，级数写成 Y/X。最常用的是副属和弦 V(7)/X 与副导和弦 vii°(7)/X，前面还可加 IV/X、ii/X。离调规模小、不做终止；一去不返就成了转调。十九世纪起离调推广到任意和弦，ii–V 离调就是爵士的二五替换；副调和弦不去目标则形成意外进行。",
    concept_ids: ["tonicization", "secondary_chord", "secondary_dominant", "secondary_leading", "ii_v_sub"] },
  { id: "s2", no: "4-1", title_zh: "大调的属调", title_en: "The dominant key", gist: "重属和声组：D、D7、F♯°7，特征音 ♯4。",
    summary: "属调是最重要的副调，其属功能组叫重属（DD）。C 大调的重属和弦有 D、D7、F♯°、F♯ø7、F♯°7，共同特征是 ♯4 级音 F♯。重属和弦后接属和弦（V7/V–V7–I），也可以接主调的其他和弦，甚至做意外进行。属调与主调共有六个音、四个三和弦、三个七和弦，这些共同和弦可为离调铺路。离调的标记法古典与爵士习惯不同。",
    concept_ids: ["double_dominant", "common_chord", "deceptive_secondary"] },
  { id: "s3", no: "4-1", title_zh: "大调的下属调", title_en: "The subdominant key", gist: "离调和弦要含 ♭7：C7、E°7；♭VII 有三种理解。",
    summary: "下属调与主调同样共享六个音、四个三和弦。离调和弦必须含 ♭7 级音：C7（V7/IV）、E°、Eø7、E°7。重下属组里的 Gm、B♭ 与同名小调的 v、♭VII 重合，可理解为离调（ii/IV、IV/IV）、借用或混合利底亚调式，要看前后进行：♭VII–IV 更像 IV/IV，♭VII–I 更像借用。",
    concept_ids: ["subdominant_key"] },
  { id: "s4", no: "4-1", title_zh: "其他副调与小调的副调", title_en: "Other secondary keys", gist: "vi、iii、ii 上的小调副调；小调的大属调。",
    summary: "vi 副调（关系小调）的离调和弦是和声小调的属组：E、E7、G♯°7，特征音 ♯5 与借用的 ♭6 等音，可做出 E–Fm 这样的色彩跳跃。iii、ii 上的副调与之类似。小调的副调同理，特有的是和声小调的大属调；小调重属组的特征音除 ♯4 外还有 ♯6，不能一概当旋律小调。大调的小下属调同理，♭II 和弦有多种解释。",
    concept_ids: ["secondary_dominant"] },
  { id: "s5", no: "4-1", title_zh: "五度圈进行", title_en: "Circle-of-fifths progressions", gist: "副属的副属……沿五度圈一路向左。",
    summary: "D7–G7–C 再往前加 A7、E7……副属七和弦可以沿五度圈无限迭代，在网格上一路向左，古典叫连锁进行，现代叫拉格泰姆进行。实践中常截取一段，如 B7–E7–A7–D7–G7–C。把和弦性质推广到各种七和弦，就是爵士与流行里常见的五度圈进行；卡农、1625、4536251 等套路都可以这样替换出调外色彩。",
    concept_ids: ["chain_progression"] },
  { id: "s6", no: "4-1", title_zh: "近关系调", title_en: "Closely related keys", gist: "在网格上，关系调重合、属/下属调左右平移一格。",
    summary: "狭义的近关系调是调号相差一个以内的五个调，正是本调的五个副调。更宽的定义加入同名调、关系调的同名调及其关系调、大调的小下属调与小调的大属调。在网格上，关系调重合，属调右移一格，下属调左移一格，同名调上下并排；全部算上，可用和弦几乎覆盖全图。",
    concept_ids: ["closely_related"] },
  { id: "s7", no: "4-2", title_zh: "大调曲例：《马赛曲》", title_en: "Major-key example", gist: "V/ii、IV/IV、iv、g 小调离调、V7/IV、连锁进行。",
    summary: "《马赛曲》总体是 G 大调：E–Am 是 V/ii–ii（也可理解为借用 E 代替 Em）；F–C 是 IV/IV–IV；Cm 是小下属；第四行是一段 g 小调离调，经共同的 D7 回到 G 大调，其中 C7 要按声部拆开理解（和声第三定律）；G7–C 是 V7/IV–IV；结尾 E7–A7–D7–G 是连锁进行。离调与转调的区分看长度和新调是否确立。",
    concept_ids: ["modulation", "voice_independence"] },
  { id: "s8", no: "4-2", title_zh: "小调曲例与小结", title_en: "Minor-key example & summary", gist: "在网格上「海选」能覆盖旋律音的和弦；半音化的概念关系。",
    summary: "为 c 小调旋律配和弦：在网格上标出旋律音，找出能覆盖它们的和弦，优先照顾长音、强拍音，其余当作和弦外音。只含 E♭ 的三和弦就有十二个。小结：替换、延伸、半音三类变化都已出现，借用与离调都属半音化，可以复合使用；下一章的「变和弦」采用古典定义。",
    concept_ids: ["chromaticism"] },
];

// 谱例
const HAPPY_ABC = grand({ key: "C", meter: "3/4", unit: "1/8", tempo: 96, lines: HAPPY });
const INTER_ABC = grand({ key: "Bb", meter: "4/4", unit: "1/8", tempo: 84, lines: INTER });
const INTER_PROG = (() => {
  const { chords, beats } = chordsOf(INTER, 2);
  const R = { Bb: "I", Eb: "IV", Cm: "ii", F: "V", Gm: "vi", Dm: "iii", C7: "V7/V", D7: "V7/vi", G7: "V7/ii", F7: "V7" };
  return { chords, beats, roman: chords.map(c => R[c]) };
})();
const MARS_ABC = grand({ key: "G", meter: "4/4", unit: "1/16", tempo: 100, lines: MARS });
const MARS_ROMAN = {
  G: "I", D: "V", C: "IV", Am: "ii", D7: "V7", E: "V/ii", Bm: "iii", F: "IV/IV", Cm: "iv", Gm: "i（g）", Eb: "VI（g）", C7: "IV7（g）", G7: "V7/IV", E7: "V7/ii", Am7: "ii7", "F#ø": "viiø7", A7: "V7/V",
};
const MARS_LINES = MARS.map((ln, i) => {
  const { chords, beats } = chordsOf([ln], 4);
  const roman = chords.map((c, k) => (i === 3 && c === "D" ? "V（g）" : i === 3 && c === "D7" ? "V7（g/G）" : i === 3 && c === "Cm" ? "iv（g）" : i === 5 && c === "E7" && k === 5 ? "V7/V/V" : MARS_ROMAN[c] || ""));
  return { chords, beats, roman };
});
const MARS_NOTES = [
  "第一行全是 G 大调的调内和弦：I–V–I、I–ii–V7–I，干净有力，像进行曲的开场号令。",
  "第二行第二小节出现 E 大三和弦（含调外音 G♯），随后进到 Am：E–Am 是 V/ii–ii，接着 D7–G 构成一串五度进行。也可以把 E 看作借自 E 大调、代替调内的 Em。",
  "第三行：旋律出现还原的 F（♭7），和弦 F 之后上行五度到 C，所以理解为重下属 IV/IV 比借用的 ♭VII 更自然；随后的 Cm 是熟悉的小下属 iv，与前面的 C 形成色彩对比，再进到属和弦 D。",
  "第四行旋律满是 B♭（♭3）：Gm、D、E♭、Cm、D7 都是 g 和声小调的和弦——同主音大小调的交替，最后经两调共有的 D7 回到 G 大调。其中的 C7 是「和声换到 C、旋律仍留在 g 小调的 B♭」的结果。",
  "第五行回到 G 大调的号召段；行末的 G7 含调外音 F♮，是 V7/IV，把耳朵推向下一行开头的 C（IV）。",
  "最后一句：C–E7–Am7–D7 里 E7 是 V7/ii；结尾 E7–A7–D7–G 连用副属七和弦，是一段连锁进行，五度下行的力量把歌曲推到终点。",
];

export default function Chapter() {
  return <ChapterPage meta={meta} groups={groups} concepts={concepts} relations={relations}>
    <SoundBar />

    <Block id="hook" toc="开场">
      <Hook title="先听，再看"><p>
        先点这两段：<Play seq={["C", "Am", "Dm", "G7", "C"]} gap={0.85}>C–Am–Dm–G7–C</Play>，再听
        <Play seq={["C", "Am", "D7", "G7", "C"]} gap={0.85}>C–Am–D7–G7–C</Play>。只换了一个和弦：Dm 变成 D7，第二段却像被人从背后推了一把，迫不及待地冲向 G7。
        那个 F♯ 不属于 C 大调，它从哪里来？这一章的答案是：把 G 临时当成「家」，D7 就是这个临时之家的属和弦。
        这种「临时主音」的想法，从巴赫一直用到今天的流行歌和爵士乐。</p>
      </Hook>
    </Block>

    <Block id="secs" toc="小节" kicker="原书结构" title="本章八个小节" lead="4-1 讲副调和弦的原理与各个副调，4-2 用实际歌曲综合练习。点卡片看要点。">
      <SectionCards sections={sections} />
    </Block>

    <Block id="flow" toc="主线" kicker="论证主线" title="从「借同名调」到「借邻居」">
      <ArgumentFlow steps={[
        { claim: "上一章从同名调借和弦，打开了半音世界", detail: "那么别的调能不能也「借」？" },
        { claim: "任何大、小三和弦都能临时当主和弦", detail: "C 大调的 F、G、Dm、Em、Am 对应五个副调。这叫主音化，中文叫离调。" },
        { claim: "最有用的是副调的属和弦与导和弦", detail: "V7/X 与 vii°7/X 带着调外音，强烈地倾向 X；记作 Y/X。" },
        { claim: "属调最重要：重属和弦，特征音 ♯4", detail: "D7、F♯°7 → G：比调内的 ii 更有推动力。共同和弦让离调更自然。" },
        { claim: "下属调靠 ♭7，其他副调各有特征音", detail: "C7 → F；E7 → Am；♭VII、♭II 等和弦往往有多种理解。" },
        { claim: "副属可以无限迭代：五度圈进行", detail: "E7–A7–D7–G7–C，在网格上一路向左，是爵士与拉格泰姆的招牌。" },
        { claim: "近关系调在网格上就是邻近的区域", detail: "全部算上，可用和弦几乎覆盖整张网格。" },
        { claim: "用实际作品检验：《马赛曲》", detail: "副属、重下属、小下属、g 小调离调、连锁进行一应俱全；离调与转调只是程度之差。" },
        { claim: "网格还能帮我们「海选」和弦", detail: "标出旋律音，找能覆盖它们的三角形——配和弦的灵感工具。" },
      ]} />
    </Block>

    <Block id="tonic" toc="主音化与离调" kicker="4-1 · 主音化与离调" title="临时主音：把邻居请来做一会儿主人"
      lead="先听：同一个 G 和弦，前面是调内的 Am7 还是调外的 D7，进入时的力度完全不同。">
      <Narrate />
      <Progression title="同一个目标 G，两种前奏" chords={["C", "Am7", "D7", "G", "C"]} keyName="C" roman={["I", "vi7 = ii7/V", "V7/V", "V", "I"]} bpm={76} tonnetz={{ cols: 9, rows: 4, center: "C", spell: "sharp" }}
        caption="Am7 是 C 大调的 vi7，同时又是 G 大调的 ii7；D7 只属于 G 大调——它的 F♯ 是 G 的导音。网格上，D 在 G 的右边一格（上方纯五度）。" />
      <p>回忆大调的七个三和弦：C 大调里除了主和弦 C，<Play chord="F">F</Play>、<Play chord="G">G</Play> 是大三和弦，<Play chord="Dm">Dm</Play>、<Play chord="Em">Em</Play>、<Play chord="Am">Am</Play> 是小三和弦，
        它们都可以「独挑大梁」去当别的调的主和弦：F、G 大调，d、e、a 小调。这些调是 C 大调关系最近的邻居，统称<b>副调</b>，C 大调本身叫主调。
        把调主音以外的音当作临时主音，叫<C id="tonicization">主音化</C>；在主调和声里掺入一小段副调和弦、制造短暂偏离的感觉，中文叫<b>离调</b>。
        只有导音上的 B° 例外——减三和弦当不了主和弦（不过浪漫派以后，这条限制也被打破了）。</p>
      <p>离调要守「临时」和「缩小」两条规矩：规模小，不做完整的终止式，之后回到主调，以免喧宾夺主。如果一去不复返、调感真的落到了副调上，那就是<b>转调</b>（第十一章专讲）。</p>
      <Callout tone="key" title="Y/X 记号：斜线读作「的」">
        <C id="secondary_chord">副调和弦</C>的级数写成 Y/X，意思是「X 级和弦的 Y 级和弦」：V/V 是属和弦的属和弦，ii7/iii 是 iii 级和弦的 ii 级小七和弦。
        和弦字母照常按和弦本身写。注意这个「/」和斜线和弦 C/E 的「/」毫无关系。
      </Callout>
      <p>副调里最常用的是属和弦和导和弦：<C id="secondary_dominant">副属和弦</C> V(7)/X 与<C id="secondary_leading">副导和弦</C> vii°(7)/X，它们都倾向于解决到自己的临时主和弦。
        前面还能再加副下属 IV/X、副上主 ii/X，在副调里走一段正格、变格或阻碍进行：</p>
      <Tabs tabs={[
        { label: "IV/X – V7/X – X", content: <Progression chords={["C", "D7", "G"]} keyName="C" roman={["IV/V", "V7/V", "V"]} bpm={72} caption="X = G：C 是 G 大调的 IV，D7 是 G 大调的 V7——在 G 调里走了一次正格终止。" /> },
        { label: "ii7/X – V7/X – X", content: <Progression chords={["Am7", "D7", "G"]} keyName="C" roman={["ii7/V", "V7/V", "V"]} bpm={72} caption="二五替换：根音 A → D → G 沿五度圈连走两步。" /> },
        { label: "ii7/X – V7/X – vi/X", content: <Progression chords={["Am7", "D7", "Em"]} keyName="C" roman={["ii7/V", "V7/V", "vi/V"]} bpm={72} caption="副调里的阻碍进行：D7 本该去 G，却落到 G 大调的 vi（Em）。" /> },
      ]} />
      <p>离调的思想在巴洛克时期就很常见，但传统上只有大、小三和弦能当临时主和弦。十九世纪以后，任何和弦前面都可以插入它的 V(7)、IV–V(7) 或 ii–V(7)。
        其中 ii–V 正好沿着五度圈走，用一组「2-5-1」顶替原来的一个和弦，这就是爵士和声最有代表性的<C id="ii_v_sub">二五替换</C>。
        另一方面，副属、副导和弦也可以<b>不</b>解决到目标，而是有意走向别处，构成<C id="deceptive_secondary">意外进行</C>。</p>
    </Block>

    <Block id="lab" toc="★ 临时主音" kicker="专属图解" title="临时主音：任选一个和弦当「家」"
      lead="选一个调和一个调内和弦 X，下面自动列出 X 的副属、副导、副上主、副下属和弦（红字为调外音），点卡片听它解决到 X，网格上同步画出路线。">
      <Narrate />
      <TempTonic />
      <p>多试几个 X，你会发现几条规律：</p>
      <ul>
        <li><b>位置固定</b>：V/X 永远在 X 右边一格（上方纯五度）；ii/X 再往右一格；IV/X 在 X 左边一格——副调的「主、属、下属」三角，和本调的布局一模一样，只是整体平移了。</li>
        <li><b>调外音是离调感的来源</b>：V7/ii（A7）带来 C♯，V7/V（D7）带来 F♯，V7/IV（C7）带来 B♭……每个副属和弦恰好带进目标调的「特征音」，通常是 X 的导音。</li>
        <li><b>不是每个副调和弦都有离调感</b>：在 C 大调里选 X = G，它的 IV/V 就是 C、ii7/V 就是 Am7，全是调内音——这些就是<C id="common_chord">共同和弦</C>。</li>
        <li><b>七级代五</b>：vii°7/X 的根音比 X 低半音，和 V7/X 共用三个音，可以互相替换。</li>
      </ul>
    </Block>

    <Block id="dd" toc="重属" kicker="4-1 · 大调的属调" title="重属和声组：特征音 ♯4"
      lead="属调是所有副调里最重要的一个。它的属功能和弦在德奥、苏俄和中国的和声理论里有个专名：重（chóng）属，记作 DD。">
      <Narrate />
      <Tonnetz cols={11} rows={4} unit={54} center="C" spell="sharp" highlight={["C", "G", "D", "Bm"]} notes={[7, 9, 11, 0, 2, 4, 6]}
        caption="金色交点是 G 大调的七个音；D（V/V）在 G 的右边，Bm（iii/V）用得较少。F♯° 由 F♯–A–C 组成（不是三角形）。" />
      <p>C 大调的<C id="double_dominant">重属和声组</C>：三和弦有重属和弦 <Play chord="D" arp={0.05}>D</Play>（V/V，也记作 II）、重属导三和弦 <Play notes="F#4 A4 C5" arp={0.05}>F♯°</Play>（vii°/V，♯iv°），
        以及很少用的 Bm（iii/V）；七和弦有重属七和弦 <Play chord="D7" arp={0.05}>D7</Play>（V7/V、II7），重属导七和弦可以用 G 大调自然的 <Play chord="F#ø" arp={0.05}>F♯ø7</Play>（viiø7/V），
        更常用借自 g 和声小调的减七和弦 <Play chord="F#°7" arp={0.05}>F♯°7</Play>（vii°7/V、♯iv°7）。</p>
      <p>它们的共同特征是 <b>♯4 级音</b>——C 大调里的 F♯。它是 G 大调的导音，也是 G、C 两调唯一不同的音，所以一出现就有强烈的离调感。
        另一方面，D 和 F♯°7 也都含有主调的 C、A 两个音，旋律停在这两个音上时同样可以配重属和弦。</p>

      <h3>谱例 4.1：《生日快乐》重新配和弦</h3>
      <Score abc={HAPPY_ABC} scale={1} caption="原书谱例 4.1（C 大调，3/4）：和弦刻意换得很密，红字的两个重属和弦 F♯°7、D7 都接属和弦。下方低音谱表是按和弦记号配的柱式和弦。" />
      <p>和第二章只用正三和弦的版本比一比：这里用了副三和弦（Am、Em）、借用和弦（Fm）和离调和弦（F♯°7、E7、D7），同一段旋律焕然一新。两处重属进行的级数是：</p>
      <Tabs tabs={[
        { label: "vii°7/V – V", content: <Progression chords={["C", "Am", "Em", "F#°7", "G"]} keyName="C" roman={["I", "vi", "iii", "vii°7/V", "V"]} bpm={80} tonnetz={{ cols: 9, rows: 4, center: "C", spell: "sharp" }} caption="第一、五小节：F♯°7 的根音比 G 低半音——七级代五。" /> },
        { label: "V7/V – V7 – I", content: <Progression chords={["E7", "D7", "G7", "C"]} keyName="C" roman={["V7/vi", "V7/V", "V7", "I"]} bpm={80} tonnetz={{ cols: 9, rows: 4, center: "C", spell: "sharp" }} caption="最后一句：E7、D7、G7 三个属七和弦依次出场（E7 在这里不去 Am，而是继续走向 D7）。" /> },
        { label: "接主调其他和弦", content: <Progression chords={["F", "C", "Dm", "F#°7", "G", "C"]} keyName="C" roman={["IV", "I", "ii", "vii°7/V", "V", "I"]} bpm={80} caption="重属组前面也可以直接接主调的 T 或 S 组和弦；F–F♯–G 或 E–E♭–D 的半音线让连接更顺（详见第六章）。" /> },
        { label: "意外进行", content: <><Progression chords={["C", "D7", "Em", "Am"]} keyName="C" roman={["I", "V7/V", "iii", "vi"]} bpm={76} caption="D7 没去 G，落到了 Em。" />
          <Progression chords={["C", "D7", "G#m", "F#"]} keyName="C" roman={["I", "V7/V", "♯v", "♯IV"]} bpm={76} caption="更大胆：D7 之后直接跳出调外。听感合理就是有效的意外进行。" /></> },
      ]} />
      <Callout tone="info" title="同一个 D 和弦：借用还是离调？">
        上一章说过，a 小调可以从 A 大调借来 IV、ii，也就是 D 和 Bm。那它们在 C 大调里该算借用还是离调？看进行逻辑：D 后面接 E，当借用更合适；D 后面接 G，看作离调更合适（非要说借用也无可厚非）。
        同一个和弦在理论上可以有不同的理解——这是和声有趣的地方。
      </Callout>
      <p>属调的其他和弦很少用作离调：属调与主调只差一个调号，在网格上两块区域大面积重叠，共有六个音、四个三和弦（<Play chord="C">C</Play> <Play chord="G">G</Play> <Play chord="Em">Em</Play> <Play chord="Am">Am</Play>）、三个七和弦（CΔ7、Em7、Am7）。
        属调下属组的 ii/V、IV/V、vi/V 就是主调的 vi、I、iii。这些<C id="common_chord">共同和弦</C>不能制造离调感，却是绝佳的「桥」：G 大调的 ii7–V7–I 是 Am7–D7–G，其中 Am7 也是 C 的 vi7，离调就显得十分自然。</p>
      <Tonnetz cols={11} rows={4} unit={50} center="C" spell="sharp" highlight={["C", "G", "Em", "Am"]} notes={[0, 2, 4, 7, 9, 11]} caption="C 大调与 G 大调的共同三和弦：C、G、Em、Am；金色是两调共有的六个音（只差 F / F♯）。" />
      <h3>离调的几种标记法</h3>
      <p>同一段 Am7–D7–G7–C，不同传统写法不同（原书图 4.4）：</p>
      <div className="card" style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "var(--serif)", fontSize: 16, textAlign: "center" }}>
          <thead><tr style={{ borderBottom: "1px solid var(--line)" }}><th style={{ textAlign: "left", fontFamily: "var(--sans)", fontSize: 13, color: "var(--muted)" }}>写法</th><th>Am7</th><th>D7</th><th>G7</th><th>C</th></tr></thead>
          <tbody>
            {[["功能标记（德奥/中国）", "SII7/D", "DD7", "D7", "T"], ["带斜线的级数", "ii7/V", "V7/V", "V7", "I"], ["括号 + of", "( ii7", "V7 ) of", "V7", "I"], ["括出调性", "ii7", "V7", "V7", "I"], ["", "└ G 大调 ┘", "", "└ C 大调", "┘"]].map((r, i) =>
              <tr key={i} style={{ borderBottom: i < 3 ? "1px dashed var(--line)" : "none" }}>{r.map((c, k) => <td key={k} style={{ padding: "6px 8px", textAlign: k ? "center" : "left", fontFamily: k ? "var(--serif)" : "var(--sans)", fontSize: k ? 16 : 13 }}>{c}</td>)}</tr>)}
          </tbody>
        </table>
        <p className="au-hint" style={{ margin: "6px 0 0" }}>爵士乐谱则用「括号–箭头」：横线括住 Am7–D7（ii–V），箭头从 D7 指向 G7、从 G7 指向 C，表示属七到临时主和弦的解决。在网格上，这些都可以省略——只要看清各和弦的位置与形状。</p>
      </div>
    </Block>

    <Block id="sd" toc="下属调" kicker="4-1 · 大调的下属调" title="下属调：靠 ♭7 级制造离调感"
      lead="下属调与主调同样共有六个音、四个三和弦。唯一不同的音是 ♭7（C 大调里的 B♭）——离调和弦必须含有它。">
      <Narrate />
      <p>下属调的属和弦 V/IV 就是主和弦 C 本身，没有离调感；真正离调的是加了七音的 <Play chord="C7" arp={0.05}>C7</Play>（V7/IV，也记作 I7），以及导和弦 <Play notes="E4 G4 Bb4" arp={0.05}>E°</Play>、
        <Play chord="Eø" arp={0.05}>Eø7</Play>、<Play chord="E°7" arp={0.05}>E°7</Play>（vii°7/IV、iii°7）。在主–下属之间插一个主音上的属七和弦，就多了色彩和动力：</p>
      <Tabs tabs={[
        { label: "C – C7 – F", content: <Progression chords={["C", "C7", "F"]} keyName="C" roman={["I", "V7/IV", "IV"]} bpm={72} tonnetz={{ cols: 9, rows: 4, center: "C", spell: "flat" }} caption="C7 的 B♭ 把 C 和弦「掀」向 F。" /> },
        { label: "C – CΔ – C7 – F", content: <Progression chords={["C", "CΔ", "C7", "F"]} keyName="C" roman={["I", "IΔ7", "V7/IV", "IV"]} bpm={72} texture="arp" caption="四个和弦藏着 C–B–B♭–A 的平稳半音下行，现代极常见。" /> },
        { label: "C – Gm – C7 – F", content: <Progression chords={["C", "Gm", "C7", "F"]} keyName="C" roman={["I", "ii/IV", "V7/IV", "IV"]} bpm={72} caption="F 大调的 ii–V7–I。" /> },
        { label: "C – E°7 – F – F♯°7 – G", content: <Progression chords={["C", "E°7", "F", "F#°7", "G"]} keyName="C" roman={["I", "vii°7/IV", "IV", "vii°7/V", "V"]} bpm={72} caption="下属调与属调的导七和弦都出现了：低音 E–F–F♯–G 一路半音上行。" /> },
      ]} />
      <h3>重下属与 ♭VII：三种理解</h3>
      <p>下属调的下属组，即重下属（SS）组里有 <Play chord="Gm">Gm</Play> 与 <Play chord="Bb">B♭</Play>。它们和同名 c 小调的 v、♭VII 重合，因此可以有三种理解：
        ① 离调的 ii/IV、IV/IV；② 上一章所说的从同名小调借来的 v、♭VII；③ 混合利底亚调式的调内和弦。究竟是哪一种，要看具体情况：</p>
      <ul>
        <li>♭VII 进行到 IV（B♭→F，上行五度回到 F）时，把它看作 <C id="subdominant_key">IV/IV</C> 最自然，常见的四和弦循环 I–V–♭VII–IV 就是如此。</li>
        <li>♭VII–I 的终止式里，B♭ 显然更像借用和弦。</li>
        <li>如果整体大调感不明显，旋律里也常出现 ♭7 级音，就要考虑混合利底亚调式。</li>
      </ul>
      <Progression title="I – V – ♭VII – IV 循环" chords={["C", "G", "Bb", "F"]} keyName="C" roman={["I", "V", "IV/IV", "IV"]} bpm={88} loop={false} tonnetz={{ cols: 9, rows: 4, center: "C", spell: "flat" }}
        caption="网格上 B♭ 在 F 左边一格：B♭ → F → C 是两步「下属」，所以 B♭ 是下属的下属。披头士《Hey Jude》结尾的长段合唱反复 I–♭VII–IV–I；电影《燃情岁月》主题曲也大量使用 ♭VII。" />
    </Block>

    <Block id="others" toc="其他副调" kicker="4-1 · 大调的其他副调 / 小调的副调和弦" title="vi、iii、ii 上的小调副调，与小调的副调"
      lead="vi 副调就是关系小调。它的和弦大多与主调相同，只有和声小调的属和声组不同——以前我们把它们理解为借用，现在多了一种「离调」的理解。">
      <Narrate />
      <Tonnetz cols={11} rows={5} unit={50} center="C" spell="sharp" highlight={["C", "Am", "E", "Dm", "Em"]} notes={[9, 11, 0, 2, 4, 5, 8]}
        caption="金色交点是 a 和声小调的七个音：G♯（♯5）是唯一的调外音，E（V/vi）三角形就靠它。" />
      <p>vi 副调（C 大调里的 a 小调）的离调和弦有 <Play chord="E" arp={0.05}>E</Play>（V/vi、III）、<Play chord="E7" arp={0.05}>E7</Play>（V7/vi、III7）和 <Play chord="G#°7" arp={0.05}>G♯°7</Play>（vii°7/vi、♯v°7），
        特征音是 ♯5 级（G♯）。副调为小调时，副上主和弦是半减七：vi 副调的二五替换是 Bø7–E7–Am。
        iii、ii 上的副调（e 小调、d 小调）也一样：分别是 F♯ø7–B7–Em 与 Eø7–A7–Dm。</p>
      <Tabs tabs={[
        { label: "vi 副调：iiø7–V7–i", content: <Progression chords={["C", "Bø", "E7", "Am"]} keyName="C" roman={["I", "iiø7/vi", "V7/vi", "vi"]} bpm={76} tonnetz={{ cols: 9, rows: 4, center: "C", spell: "sharp" }} /> },
        { label: "iii 副调", content: <Progression chords={["C", "F#ø", "B7", "Em"]} keyName="C" roman={["I", "iiø7/iii", "V7/iii", "iii"]} bpm={76} tonnetz={{ cols: 9, rows: 4, center: "C", spell: "sharp" }} caption="特征音：F♯ 与 D♯。" /> },
        { label: "ii 副调", content: <Progression chords={["C", "Eø", "A7", "Dm", "G7", "C"]} keyName="C" roman={["I", "iiø7/ii", "V7/ii", "ii", "V7", "I"]} bpm={76} tonnetz={{ cols: 9, rows: 4, center: "C", spell: "sharp" }} caption="特征音：C♯（与 B♭）。" /> },
        { label: "E – Fm：等音的妙用", content: <Progression chords={["C", "G7", "Am", "E", "Fm", "C"]} keyName="C" roman={["I", "V7", "vi", "V/vi", "iv", "I"]} bpm={76} tonnetz={{ cols: 9, rows: 4, center: "C", spell: "both" }}
          caption="vi 副调的特征音 G♯ 与同名小调借来的 A♭ 等音：E 与 Fm 的三音相同，构成实质上的同中音关系。和声从 V/vi 直接跳到小下属 iv，色彩变化十分有趣。" /> },
      ]} />
      <h3>谱例 4.2：离调和弦的例子</h3>
      <p>原书给了三首熟悉的歌，都在副歌高潮处用了离调。第一首是狄盖特的《国际歌》（降 B 大调）：</p>
      <Score abc={INTER_ABC} caption="《国际歌》（皮埃尔·狄盖特曲）：C7 → F 是 V7/V–V；D7 → G7 → Cm 是 V7/vi → V7/ii → ii 的连锁；F7 → B♭ 回到主调。第 7 小节旋律里的 F♯ 是装饰性的调外音。" />
      <Progression chords={INTER_PROG.chords} beats={INTER_PROG.beats} roman={INTER_PROG.roman} bpm={84} title="《国际歌》的和弦（按原拍数）" tonnetz={{ cols: 11, rows: 4, center: "Bb" }} />
      <p>另外两首是现代歌曲，这里只说和弦：王立平《大海啊，故乡》（F 大调）开头 <Play seq={["F", "F7", "Bb"]} gap={0.9}>F–F7–B♭</Play>，F7 是 V7/IV；
        罗大佑《明天会更好》（C 大调）副歌里 <Play seq={["C", "Em", "E7", "F"]} gap={0.85}>C–Em–E7–F</Play> 与 <Play seq={["Am", "Em", "E7", "Am"]} gap={0.85}>Am–Em–E7–Am</Play>：
        E7 是 V7/vi，一次落到 Am，一次「意外」地进到 F。原书请读者边唱边弹，再把离调和弦换回调内和弦对比——情绪的推动力会明显减弱。</p>
      <h3>小调的副调和弦</h3>
      <p>小调的副调推演方法相同：以主和弦之外的大三、小三和弦为临时主和弦。特有的是<b>和声小调的大属调</b>，例如 a 小调与 E 大调。
        小调的重属组里，特征音不只有 ♯4，还有 <b>♯6</b>——它这次是属调的 2 级音，与旋律小调的 ♯6、多利亚六度都不是一回事。
        所以在小调音乐里遇到 ♯6，要结合前后和声与旋律走向判断它是哪种用法，不能一股脑当成旋律小调。</p>
      <Progression title="a 小调的重属：♯4（D♯）与 ♯6（F♯）" chords={["Am", "B7", "E", "E7", "Am"]} keyName="Am" roman={["i", "V7/V", "V", "V7", "i"]} bpm={72} tonnetz={{ cols: 9, rows: 4, center: "A", spell: "sharp" }}
        caption="B7 = B–D♯–F♯–A：F♯ 是 E 大调的 2 级音，D♯ 是 E 大调的导音。" />
      <p>同理，大调和它的<b>小下属调</b>也很近（C 大调与 f 小调），它的许多音和和弦与同名小调相关，要注意区分。尤其是大调里的 <Play chord="Db">♭II（D♭）</Play>：
        它可以是小下属调 f 小调的 VI，也可以是同名小调的 IV/VI，还可能是下一章（5-2）要讲的那不勒斯和弦。</p>
      <Callout tone="info" title="不要死记，要会推">
        掌握了借用与离调，我们能做的和声变化已经足以应付大部分歌曲的「用什么和弦」问题。可能性多到列不完，关键是理解思路：多研究实例，借鉴别人的经验，但不要生搬硬套。
        原书还介绍了 Stephen Mugglin 总结的大、小调和弦进行图（chordmaps.com），概括了流行和声最常用的路线，可以拿来测试自己能否看懂其中与离调有关的部分。
      </Callout>
    </Block>

    <Block id="chain" toc="五度圈进行" kicker="4-1 · 五度圈进行" title="副属的副属：一路向左的连锁进行"
      lead="D7–G7–C 是给 V7 加上 V7/V；再给 D7 加上它的属和弦 A7，给 A7 加上 E7……这个过程可以一直迭代下去。">
      <Narrate />
      <Tabs tabs={[
        { label: "G7 – C", content: <Progression chords={["G7", "C"]} keyName="C" roman={["V7", "I"]} bpm={80} tonnetz={{ cols: 11, rows: 3, center: "F", spell: "sharp" }} /> },
        { label: "D7 – G7 – C", content: <Progression chords={["D7", "G7", "C"]} keyName="C" roman={["V7/V", "V7", "I"]} bpm={80} tonnetz={{ cols: 11, rows: 3, center: "F", spell: "sharp" }} /> },
        { label: "A7 – D7 – G7 – C", content: <Progression chords={["A7", "D7", "G7", "C"]} keyName="C" roman={["V7/V/V", "V7/V", "V7", "I"]} bpm={80} tonnetz={{ cols: 11, rows: 3, center: "F", spell: "sharp" }} /> },
        { label: "E7 – A7 – D7 – G7 – C", content: <Progression chords={["E7", "A7", "D7", "G7", "C"]} keyName="C" roman={["V7/V/V/V", "V7/V/V", "V7/V", "V7", "I"]} bpm={80} tonnetz={{ cols: 11, rows: 3, center: "F", spell: "sharp" }} /> },
      ]} />
      <p>最终可以沿五度圈串成一个环：…F♯7–B7–E7–A7–D7–G7–C7–F7–B♭7…，在网格上就是沿水平线不断向左。离调属和弦可以沿五度圈的降号方向无限循环下去。
        古典和声叫它副属七和弦的<C id="chain_progression">连锁进行</C>；二十世纪初的拉格泰姆音乐常用它，所以爵士和流行界又叫<b>拉格泰姆进行</b>。从环上任何一处都能离开、解决到相应的主和弦，它就像调性的「快速环线」。</p>
      <Progression title="一整圈属七和弦（听它怎样「永不落地」）" chords={["F#7", "B7", "E7", "A7", "D7", "G7", "C7", "F7", "Bb7", "Eb7", "Ab7", "Db7", "F#7"]} beats={2} bpm={96}
        tonnetz={{ cols: 14, rows: 3, center: "D", unit: 44 }} caption="每个和弦都像要解决，下一个却又是新的属七——直到你决定在哪里停下。" />
      <p>实践中很少完整绕一圈，通常只截取一段。比如第二章的调内循环进行 viiø–iii7–vi7–ii7–V7–I，换成离调版本就是：</p>
      <Progression chords={["B7", "E7", "A7", "D7", "G7", "C"]} keyName="C" roman={["VII7", "III7", "VI7", "II7", "V7", "I"]} bpm={84} tonnetz={{ cols: 11, rows: 3, center: "F", spell: "sharp" }}
        caption="按本调级数记为 VII7–III7–VI7–II7–V7–I。无论级数怎么记，根音连续五度下行，非常好认。" />
      <p>再进一步，和弦性质从属七推广到大七、小七、半减七、减七等，根音仍然四度上行（五度下行），就是广义的<b>五度圈进行</b>：</p>
      <Progression chords={["B7", "Em7", "Aø", "D7", "G7", "Cm7", "FΔ"]} roman={["B7", "Em7", "Aø7", "D7", "G7", "Cm7", "FΔ7"]} bpm={84} tonnetz={{ cols: 11, rows: 3, center: "F", spell: "sharp" }}
        caption="原书的例子：调性随走随变，突破了单一调的限制。爵士乐的大量套路都是这样构成的。" />
      <p>同样的思路可以用到所有调内套路上：卡农进行、「1625」、「1564」、「4536251」……都可以把某些调内和弦换成调外和弦，带来不一样的色彩。例如「1625」把 vi 和 ii 换成属七：</p>
      <Progression chords={["C", "A7", "D7", "G7", "C"]} keyName="C" roman={["I", "V7/ii", "V7/V", "V7", "I"]} bpm={88} texture="pop"
        caption="C–Am–Dm–G7 → C–A7–D7–G7：经典的拉格泰姆「1625」。" />
    </Block>

    <Block id="close" toc="近关系调" kicker="4-1 · 近关系调" title="近关系调：网格上的邻居"
      lead="一个调与它的几个副调共有大量和弦，所以乐理上有「近关系调」的概念——但它的范围，各家说法不一。">
      <Narrate />
      <p>最狭义的<C id="closely_related">近关系调</C>是关系调、属调、下属调以及它们的关系调，即调号相差不超过一个升降号的调：C 大调的近关系调是 a、G、e、F、d，正是它的五个副调；
        a 小调的近关系调是 C、e、G、d、F，正是 a 自然小调的五个副调。</p>
      <p>有些现代观点认为同名调也很近（互相大量借用），于是把本调和关系调的同名调、以及它们的关系调也算进来；还有理论把和声大小调纳入，算上大调的小下属调与小调的大属调。
        原书倾向于取这些理论的并集，以提供最大范围的和声思路。在网格上看，这些关系一目了然：</p>
      <Tabs tabs={[
        { label: "C 大调的广义近关系调", content: <Tonnetz cols={11} rows={6} unit={48} center="C" spell="both" highlight={["C", "G", "F", "Am", "Em", "Dm", "Cm", "Eb", "A", "F#m", "Fm"]}
          caption="红色大三、蓝色小三分别是各调的主和弦：C；关系调 a；属调 G 与 e；下属调 F 与 d；同名调 c 与其关系调 E♭；关系调的同名调 A 与其关系调 f♯；小下属调 f。" /> },
        { label: "a 小调的广义近关系调", content: <Tonnetz cols={11} rows={6} unit={48} center="A" spell="both" highlight={["Am", "C", "Em", "G", "Dm", "F", "A", "F#m", "Cm", "Eb", "E"]}
          caption="a 小调：关系调 C；e、G；d、F；同名调 A 与 f♯；关系调的同名调 c 与 E♭；大属调 E。" /> },
      ]} />
      <p>规律是：关系调与本调位置基本重合；属调在右边平移一格，下属调在左边平移一格；大调的同名小调在它下方并排，小调的同名大调在它上方并排。
        把这些调都算上，可用和弦几乎盖满全图；剩下的空格，靠二次离调、借用，或下一章的那不勒斯和弦、增六和弦就能到达——一个主音几乎可以统领所有和弦了。</p>
    </Block>

    <Block id="mars" toc="★ 马赛曲" kicker="4-2 · 大调曲例" title="谱例 4.3：《马赛曲》里的离调全家福"
      lead="法国国歌《马赛曲》（鲁日·德·李尔，1792）总体是 G 大调，却用了大量调外和弦。先完整听一遍，再逐行分析。">
      <Narrate />
      <Score abc={MARS_ABC} tempo={100} caption="原书谱例 4.3 的旋律与和弦（G 大调），低音谱表按和弦记号配柱式和弦。原书红字标出的调外和弦：E、F、Cm、Gm、E♭、Cm、C7、G7、E7、A7。末尾原有 D.C.（从头反复）。" />
      <p>这首诞生于法国大革命时期的进行曲旋律慷慨激昂。它有许多版本，标准的合唱加管弦乐版由柏辽兹编配，李斯特还改编过钢琴版；这份谱例的和弦只是众多可能之一。下面按原谱的六行逐行听：</p>
      <Tabs tabs={MARS_LINES.map((ln, i) => ({ label: "第 " + (i + 1) + " 行", content: <>
        <Progression chords={ln.chords} beats={ln.beats} roman={ln.roman} bpm={100} tonnetz={{ cols: 11, rows: 4, center: "G", spell: i === 3 ? "flat" : i === 2 ? "both" : "sharp" }} />
        <p style={{ marginTop: 8 }}>{MARS_NOTES[i]}</p></> }))} />
      <h3>E 和弦：副属，还是借用？</h3>
      <p>第二行的 E 含有不属于 G 大调的 G♯，后面接 Am——E–Am 正好是 a 和声小调的 V–i，而 Am 是 G 大调的 ii，所以 E 可理解为 <b>V/ii</b>，强化了 ii。
        于是 E–Am–D7–G 的级数是 V/ii–ii–V7–I，按五度关系连续进行，非常有力；把 E 换成 E7 效果更强。
        另一个思路：E 的根音是 G 大调的 6 级，本该是 Em；Em–Am–D7–G 是调内的五度循环 vi–ii–V7–I，E 是从 e 小调的同名大调借来、替代 Em 的。两种理解都说得通。</p>
      <Toggle options={["E 作为 V/ii", "E 作为借用（代替 Em）"]}>{v => v === 0
        ? <Progression chords={["E", "Am", "D7", "G"]} keyName="G" roman={["V/ii", "ii", "V7", "I"]} bpm={80} tonnetz={{ cols: 9, rows: 4, center: "G", spell: "sharp" }} />
        : <Progression chords={["Em", "Am", "D7", "G"]} keyName="G" roman={["vi", "ii", "V7", "I"]} bpm={80} tonnetz={{ cols: 9, rows: 4, center: "G", spell: "sharp" }} caption="调内版本：把 E 换回 Em，听听推动力少了多少。" />}</Toggle>
      <h3>F 与 Cm：重下属与小下属</h3>
      <p>第三行旋律出现还原的 F（♭7），和弦也用了 F。它可以按借用的 ♭VII 理解吗？F 之后上行五度到了 C（IV），所以把它看作重下属 <b>IV/IV</b> 更自然。
        下一小节的 <Play chord="Cm">Cm</Play> 是熟悉的小下属 iv，与前面的 C 形成色彩对比，然后进到属和弦 D；如果把它当作 c 小调的离调和弦，前后就不好解释了。</p>
      <Progression chords={["G", "F", "C", "Cm", "D"]} keyName="G" roman={["I", "IV/IV", "IV", "iv", "V"]} bpm={80} tonnetz={{ cols: 9, rows: 4, center: "G", spell: "both" }} />
      <h3>第四行：一段 g 小调，与那个奇怪的 C7</h3>
      <p>第四行旋律里全是 B♭（♭3），大部分和弦都不在 G 大调内，听起来已经不像 G 大调了。画到网格上一目了然：除了 C7，这些和弦都是 g 和声小调的和弦，构成 g 小调内的一段进行——
        同主音大小调的交替，最后经由两调共有的属七和弦 D7 穿梭回 G 大调。</p>
      <Progression chords={["Gm", "D", "Eb", "Cm", "C7", "D7", "G"]} keyName="Gm" roman={["i", "V", "VI", "iv", "IV7?", "V7", "I（G 大调）"]} beats={[4, 3, 1, 2, 2, 4, 4]} bpm={76} tonnetz={{ cols: 9, rows: 4, center: "G", spell: "flat" }} />
      <p>C7 是怎么回事？当作 F 大调或 f 小调的属七，前后逻辑说不通；当作 g 小调的 Cm7 向 G 大调借用、三音升高，又解释不了七音 B♭。仔细看，B♭ 在<b>旋律</b>里。
        所以可以拆成「大三和弦 + 七音」两部分：和声从 g 小调的小下属 Cm 换到了 G 大调的大下属 C，而旋律还暂时留在 g 小调，唱着 B♭。旋律与和声各走各的，临时纵向叠在一起，就成了一个大小七和弦。</p>
      <Callout tone="key" title="和声第三定律">
        和声可以拆分成若干声部，各自连接、各自变化——每个声部都有一定独立性。这条<C id="voice_independence">定律</C>协调了纵向和弦与横向声部的关系，是第六至九章许多技法的依据。
        （另一种理解：若考虑爵士小调，C7 正是 g 爵士小调的 IV7，属于各种小调之间的借用。）
      </Callout>
      <h3>离调还是转调？</h3>
      <p>这段 g 小调，本谱例用临时记号记写；有些乐谱则直接把调号改成了 g 小调。判断<C id="modulation">离调与转调</C>有两个标准：</p>
      <ol>
        <li><b>片段长度</b>：离调较短，一般几个和弦到一两个乐句，谱面用临时记号；转调较长，一般两句以上，甚至持续到乐段或全曲结束，通常会改调号。</li>
        <li><b>新调是否确立</b>：转调要确立新调主和弦的中心地位，最典型的是新调的正格终止；否则新调地位不稳，更适合看作离调。</li>
      </ol>
      <p>所以这里按离调处理。不过两者本来只有程度之差，部分理论根本不严格区分；非要划清界限，很多时候既不容易，也没必要。</p>
      <h3>结尾：V7/IV 与连锁进行</h3>
      <p>第五行最后的 <Play chord="G7" arp={0.05}>G7</Play> 是主音上的属七和弦，七音 F 不属于本调，应理解为 V7/IV：G7–C 构成下属调 C 大调的 V7–I。
        最后一句 E7–A7–D7–G 连用副属七和弦，是一段连锁进行，连续的五度进行力度极强。</p>
      <Progression chords={["G7", "C", "E7", "Am7", "D7", "F#ø", "E7", "A7", "D7", "G"]} keyName="G" roman={["V7/IV", "IV", "V7/ii", "ii7", "V7", "viiø7", "V7/V/V", "V7/V", "V7", "I"]}
        beats={[4, 2, 2, 2, 1, 1, 2, 1, 1, 4]} bpm={84} tonnetz={{ cols: 11, rows: 4, center: "G", spell: "sharp" }} />
      <Callout tone="warn" title="副属和弦不是越多越好">
        《马赛曲》需要慷慨激昂，这样密集的副属和弦恰如其分；抒情作品若也这样写，可能显得过于刚硬。另外，离调容易带出「西洋味」，用在民族风格的音乐里要小心。
        许多国歌都用离调营造雄壮庄严：美国《星条旗永不落》、加拿大《哦，加拿大》、德国《德意志之歌》、奥地利、意大利国歌等，都值得一听。
        原书还留了两个练习：分析 C 大调歌曲《孤单北半球》怎样在调内套路里加入调外和弦；听圣桑《动物狂欢节》中的《天鹅》，解释旋律、和声与调性的关系。
      </Callout>
    </Block>

    <Block id="hunt" toc="看图配和弦" kicker="4-2 · 小调曲例" title="用网格「海选」和弦"
      lead="原书用 c 小调歌曲《羞答答的玫瑰静悄悄地开》练习配和弦：旋律里半音很多，提示着和弦可以施展变化。怎么找和弦？在网格上标出旋律音，再找能覆盖它们的形状。">
      <Narrate />
      <p>第一小节的旋律有 E♭、D、C、G 四个音。D 只是从 E♭ 到 C 途中、弱拍上顺便经过的八分音符，可以当作和弦外音；剩下的 E♭、C、G 正好是 Cm 的三个音，又是 c 小调的开头，用 Cm 最稳妥。</p>
      <p>想不出用什么和弦时，可以借助<b>和声第二定律</b>（和弦要包含旋律的部分或全部音）：把有疑问的旋律音标在网格上，找出能覆盖它们的和弦；不能全部覆盖时，优先照顾长音和强拍音，其余当作和弦外音。下面就是这样一台「和弦猎头」：</p>
      <ChordHunter initial={[3, 0, 7]} center="C" />
      <ul>
        <li><b>E♭、C、G</b>：除了 <Play chord="Cm">Cm</Play>，还有 <Play chord="Cm7">Cm7</Play>、<Play chord="CmM7">CmΔ7</Play>，甚至 <Play chord="AbΔ">A♭Δ7</Play>，都是 c 小调的和弦，用在开头很自然；
          <Play chord="Aø">Aø7</Play> 比较紧张，不适合开头，但放在中间、作为 c 爵士小调的 6 级七和弦或离调的 iiø/v，或许就可用了。</li>
        <li>把 G 也当作外音，只保留 <b>C、E♭</b>，候选范围更大（点掉 G 试试）。</li>
        <li>如果一小节一个和弦太单调，可按两拍一组配：前两拍是三个 E♭ 和一个 D——试试只选 <b>E♭、D</b>。</li>
        <li>只保留 <b>E♭</b> 一个音：大、小、增、减三和弦一共 12 个，七和弦更是超过 20 个。</li>
      </ul>
      <p>网格就像猎头，善于找出尽量多的候选和弦供我们「海选」，还常常带来「这个和弦竟然也能用」的惊喜。对某一个旋律音，一个常用的思考方法是：以它为根音、三音、五音、七音……分别有哪些和弦，再从中挑选。</p>
      <Callout tone="info" title="原书的两个综合练习">
        ① 法语歌曲《蓝色的爱（L'amour est bleu）》（Andre Popp，1967；保罗·莫里哀改编后风靡世界）：找出 A、B 两段的演唱次序，全曲在关系大小调、同主音大小调之间多次切换，A 段末尾的和弦有 D、Dm 两种处理——为什么？
        ② 电影《赤壁》主题曲《心战》（2008）：「扒谱」听记旋律与和弦，判断调性，找出调外音与调外和弦的功能，并注意结尾是否落在主和弦上。
      </Callout>
    </Block>

    <Block id="summary" toc="变化小结" kicker="4-2 · 和声的变化小结" title="半音化：离调、借用与变和弦">
      <Narrate />
      <svg viewBox="0 0 420 230" style={{ width: "100%", maxWidth: 460, display: "block", margin: "6px auto" }}>
        <circle cx="210" cy="115" r="108" fill="#f6efe2" stroke="#b8862b" strokeWidth="2" />
        <circle cx="168" cy="118" r="58" fill="#9b2c1f22" stroke="#9b2c1f" strokeWidth="2" />
        <circle cx="252" cy="118" r="58" fill="#2c4a6e22" stroke="#2c4a6e" strokeWidth="2" />
        <text x="210" y="32" textAnchor="middle" fontSize="16" fontWeight="700">半音化</text>
        <text x="148" y="122" textAnchor="middle" fontSize="15" fontWeight="700" fill="#9b2c1f">离调</text>
        <text x="272" y="122" textAnchor="middle" fontSize="15" fontWeight="700" fill="#2c4a6e">借用</text>
        <text x="210" y="122" textAnchor="middle" fontSize="11" fill="#5b3f7a">两可</text>
        <text x="210" y="205" textAnchor="middle" fontSize="15" fontWeight="700">变和弦（古典定义）</text>
      </svg>
      <p>至此，替换、延伸、半音三类和声变化都已经出场。借用和离调都属于<C id="chromaticism">半音化</C>，两者部分交叉——不少和弦都有两种理解；借用也可以看作替换的一种（拿同名调的同级和弦代用）。
        这些方法还能复合：借用和弦的副属和弦、副调和弦的二次借用……第四类变化是「进行」，与和弦排列、声部连接、和弦外音有关，属于「怎么用和弦」的范畴，从第六章开始介绍。</p>
      <p>理论界很多观点至今没有统一：半音化、变音、离调的确切含义，中文术语都很混乱，英语里甚至找不到与「离调」完全对应的词。不必纠结字眼——正如第二章的<b>和声第零定律</b>所说，一切以实际听感为准。
        爵士乐源自美国非洲裔民间音乐，借鉴古典理论却不墨守成规，才长出了一套自己的和声理论。</p>
      <Callout tone="info" title="三种「变和弦」">
        <b>爵士</b>：「变和弦」是「变化属和弦」的简称，专指属七和弦上的变化，范围最小。<b>流行</b>：泛指一切含调外音的和弦，离调、借用都算，几乎等于半音化，范围最广。
        <b>古典</b>：在离调、借用之外，把和弦中次要的音半音化得到的和弦，范围居中——本书下一章采用这个定义。
      </Callout>
    </Block>

    <Block id="ear" toc="听音练习" kicker="动耳朵" title="听音练习：调内，还是离调？" lead="不看谱，只用耳朵。每题可以反复听。">
      <EarQuiz items={[
        { q: "C 大调。两段进行哪一段用了副属和弦？", play: { seq: ["C", "Dm", "G7", "C", "C", "D7", "G7", "C"], gap: 0.75 }, options: ["前四个和弦", "后四个和弦"], answer: 1, why: "后一段 D7 含调外音 F♯（V7/V），冲向 G7 的力量明显更强。" },
        { q: "这个和弦最想解决到哪里？（听完和弦再想象下一个）", play: { seq: ["C", "A7"], gap: 1.1 }, options: ["Dm（ii）", "G（V）", "C（I）"], answer: 0, why: "A7 是 V7/ii，其中的 C♯ 是 Dm 的导音。" },
        { q: "C 大调。第二个和弦是什么？", play: { seq: ["C", "C7", "F"], gap: 1 }, options: ["CΔ7（调内）", "C7（V7/IV）", "Cm（借用）"], answer: 1, why: "B♭ 把主和弦变成了 F 的属七，推向 IV。" },
        { q: "听这串和弦：根音的运动方式是？", play: { seq: ["E7", "A7", "D7", "G7", "C"], gap: 0.8 }, options: ["级进上行", "连续五度下行（连锁进行）", "三度下行"], answer: 1, why: "E7–A7–D7–G7–C：每个属七都是下一个的副属，沿五度圈一路向左。" },
        { q: "第二个和弦是副属七还是副导七？", play: { seq: ["C", "F#°7", "G"], gap: 1 }, options: ["副属七 D7", "副导七 F♯°7"], answer: 1, why: "减七和弦四个音等距，根音比 G 低半音——七级代五。" },
        { q: "D7 之后，进行有没有「按预期」走到 G？", play: { seq: ["C", "D7", "Em", "Am"], gap: 0.9 }, options: ["走到了 G", "没有，这是意外进行"], answer: 1, why: "D7 落到了 Em：期待被打破，又说得通。" },
      ]} />
    </Block>

    <Block id="concepts" toc="概念卡" kicker="核心概念" title="本章 14 个概念"><ConceptGrid /></Block>
    <Block id="map" toc="概念图" kicker="概念关系" title="它们怎样连在一起"><ConceptMap /></Block>

    <Block id="quiz" toc="自测" kicker="检验理解" title="自测">
      <Quiz questions={[
        { q: "C 大调中，A7 的级数记号应写成？", options: ["V7/V", "V7/ii", "V7/vi", "VI7/I"], answer: 1, why: "A 是 D 的上方纯五度，A7 是 Dm（ii）的属七：V7/ii。也可按本调位置记为 VI7。" },
        { q: "为什么 C 大调里的 Em、Am 很难制造「向 G 离调」的感觉？", options: ["它们是小三和弦", "它们是 C、G 两调的共同和弦，没有特征音 F♯", "它们离 G 太远", "它们不能做主和弦"], answer: 1, why: "离调感来自目标调特有的音；共同和弦只能当桥梁。" },
        { q: "B♭–F–C（在 C 大调中）里的 B♭，最自然的理解是？", options: ["借用的 ♭VII–I", "IV/IV（重下属）", "那不勒斯和弦", "V/V"], answer: 1, why: "B♭ 上行五度到 F（IV），作为 IV 的下属最合理；♭VII 直接进 I 时才更像借用。" },
        { q: "副导七和弦 vii°7/X 的根音在哪里？", options: ["比 X 高纯五度", "比 X 低半音", "比 X 高大三度", "与 X 相同"], answer: 1, why: "它的根音就是 X 的导音——「七级代五」。" },
        { q: "判断一段调外和弦是「离调」还是「转调」，主要看什么？", options: ["和弦是否含七音", "片段长度，以及新调主和弦是否通过终止确立", "是否用到减七和弦", "旋律是否有半音"], answer: 1, why: "离调短而不确立新调；转调长且新调站稳（常见正格终止、换调号）。" },
        { q: "《马赛曲》g 小调段落里的 C7，书中最主要的解释是？", options: ["F 大调的 V7", "f 小调的 V7", "和声换到 C、旋律停在 B♭，两个声部临时叠加", "C 大调的 I7"], answer: 2, why: "和声第三定律：声部各自独立运动，纵向结合成了大小七和弦。" },
      ]} />
    </Block>

    <Block id="end" toc="小结">
      <Takeaways items={[
        "任何大、小三和弦都能临时当主和弦；在它前面放上它所在调的和弦，就是主音化/离调，级数记作 Y/X。",
        "最常用的是副属 V(7)/X 与副导 vii°(7)/X：它们带着 X 的导音等调外音，强烈地倾向 X；前面加 ii/X 就是二五替换。",
        "属调靠 ♯4（重属：D7、F♯°7），下属调靠 ♭7（C7、E°7）；共同和弦不制造离调感，却能为离调铺路。",
        "副属可以无限迭代：沿五度圈一路向左的连锁进行（拉格泰姆进行），推广后就是五度圈进行。",
        "网格上，副调就是本调旁边平移的区域；离调与转调只差程度——看长度，看新调是否确立。",
      ]} />
      <Bridge><p>借用和离调都是把<b>整个和弦</b>换成别的调里的和弦。下一章「变化与延伸」换一个角度：保留和弦的骨架，只把其中次要的音升高或降低半音（古典意义的变和弦），
        或在三和弦上继续往上叠三度——九、十一、十三和弦。你会遇到上一节提过的 <Play seq={["Db", "G7", "C"]} gap={0.9}>那不勒斯和弦</Play>、增六和弦，它们正是填补网格空格的工具。</p></Bridge>
    </Block>

    <Block id="gloss" toc="术语" title="术语表">
      <Glossary terms={[
        { term: "Tonicization", zh: "主音化 / 离调", def: "把调主音以外的音临时当主音，短暂偏离本调。" },
        { term: "Secondary key", zh: "副调", def: "以本调内大、小三和弦为主和弦的邻近调。" },
        { term: "Secondary chord", zh: "副调和弦", def: "副调上的和弦，级数记作 Y/X。" },
        { term: "Secondary dominant", zh: "副属和弦", def: "V(7)/X，X 的属（七）和弦。" },
        { term: "Secondary leading-tone chord", zh: "副导和弦", def: "vii°(7)/X，根音为 X 的导音。" },
        { term: "Double dominant (DD)", zh: "重属", def: "属调的属功能和弦，如 C 大调的 D7、F♯°7。" },
        { term: "ii–V substitution", zh: "二五替换", def: "在和弦 X 前插入 ii/X–V/X。" },
        { term: "Bracket-arrow notation", zh: "括号–箭头标记", def: "爵士乐中标示 ii–V 与属七解决的记号。" },
        { term: "Common chord", zh: "共同和弦", def: "两个调共有的和弦，可做离调与转调的桥梁。" },
        { term: "Chain progression / Ragtime progression", zh: "连锁进行 / 拉格泰姆进行", def: "副属七和弦沿五度圈连续解决。" },
        { term: "Closely related keys", zh: "近关系调", def: "与本调共有大量和弦的调。" },
        { term: "Modulation", zh: "转调", def: "调感真正转移到新调并确立。" },
        { term: "Chromaticism", zh: "半音化", def: "使用调外音的各种手法的总称。" },
        { term: "Altered chord", zh: "变和弦", def: "古典定义：把和弦次要音半音化所得的和弦。" },
      ]} />
    </Block>
  </ChapterPage>;
}
