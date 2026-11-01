// 第 1 章 · 循环与网格图（「可听」试点章：发声组件来自 @kit/audio）
import { ChapterPage, Block, Hook, SectionCards, ArgumentFlow, ConceptGrid, ConceptMap, Quiz, Takeaways, Bridge, Glossary, C, Callout, Tabs } from "@kit";
import { Play, SoundBar, Keyboard, PitchCircle, IntervalLab, Tonnetz, EarQuiz, Narrate, Score, Progression } from "@kit/audio";
import FreqLadder from "./_ch01_freq.jsx";

export const meta = {
  id: "ch01", no: 1, title_zh: "循环与网格图", title_en: "Cycles and the Tonnetz",
  era: "可听试点章 · 戴上耳机效果更好",
  one_liner: "十二个音首尾相接成一个圈；把三度和五度织在一起，和弦就变成了网格上的三角形。",
  big_question: "能不能不靠五线谱和琴键，只用几何图形看懂（并听懂）音程与和弦？",
  why_it_matters: "全书的工具都在这一章打造：半音阶循环、五度圈和 Tonnetz 网格图。之后讲调、功能、和声进行，都是在这张网格上「移动形状」。先在这里把耳朵和眼睛对齐，后面会轻松得多。",
  original_words: 9000, read_minutes: 20,
};

export const groups = [
  { id: "pitch", label: "音高与循环" },
  { id: "interval", label: "音程" },
  { id: "chord", label: "和弦与网格" },
];

export const concepts = [
  { id: "equal_temperament", name_zh: "十二平均律", name_en: "12-TET", icon: "📏", section_id: "s1", group: "pitch",
    plain: "把一个八度按频率比等分成 12 份，每份都是一个半音。",
    explain: "音高由振动频率决定，频率翻倍听起来就是「同一个音高了一层」，这个距离叫八度。十二平均律把八度按比例（而不是按差值）均分成十二份，相邻两音的频率比都是 2 的 12 次方根，约 1.0595。\n\n这样做的好处是十二个音地位完全平等：从哪个音出发，走同样多的半音就得到同样的音程。代价是除八度外，其他音程都和最「纯」的整数比略有偏差——但偏差小到大多数耳朵可以接受。",
    analogy: "像一把对数刻度的尺子：每格不是「加 30 赫兹」，而是「乘 1.06」。所以无论从低音区还是高音区量，走一格的听感都一样。",
    book_example: { what: "书中列出各音相对 C 的频率比：2^(1/12)、2^(2/12)……直到 2^(12/12) = 2。", point: "带根号的数字不好用，所以才需要音名和半音数这样的「名字」。" },
    misconception: "十二平均律不是自然界唯一正确的音阶，而是一种折中的工程方案；它最大的优点是可以自由转调。" },
  { id: "octave_cycle", name_zh: "八度循环", name_en: "Octave equivalence", icon: "🔁", section_id: "s1", group: "pitch",
    plain: "升高或降低 12 个半音就回到同名的音，所以十二个音围成一个圈。",
    explain: "既然每走 12 个半音频率正好翻倍、音名重复，就可以把一条无限长的音高直线首尾相接，卷成一个只有十二个位置的圆圈——半音阶循环。\n\n在圈上，「高」和「低」失去了绝对意义：从 C 往上走 2 个半音到 D，和往下走 10 个半音到 D，到的是同一个位置。这正是后面一切循环现象的来源。",
    analogy: "像钟表：13 点和 1 点在表盘上是同一个位置，表盘只关心「几点」，不关心「第几天」。",
    book_example: { what: "书中的半音阶循环图：C、C♯/D♭、D……B 均匀排在一个圆上。", point: "在圆上，D 不一定比 C 高，B 也不一定比 F 高——它们只是位置不同。" },
    misconception: "八度相同不等于音高相同：C4 和 C5 是两个音，只是同属一个「音级」。" },
  { id: "pitch_names", name_zh: "音名与等音", name_en: "Pitch names & enharmonics", icon: "🔤", section_id: "s1", group: "pitch",
    plain: "七个字母 C–B 加升降号命名十二个音；同一个音可能有两个名字。",
    explain: "C D E F G A B 七个字母对应钢琴白键，升号 ♯ 抬高一个半音，降号 ♭ 降低一个半音。因为 E–F、B–C 之间只差半音，所以 E♯ 就是 F，B♯ 就是 C。\n\n同一个音高的不同写法叫等音（例如 C♯ 与 D♭）。在十二平均律里它们发同一个声音，但在调和和弦里用哪个名字有讲究，后面章节会用到。",
    analogy: "像同一个人的大名和小名：叫法不同，人是同一个；但在不同场合（调）里，只有一种叫法是「得体」的。",
    book_example: { what: "书中提醒：C、D、E 等白键音只是键盘上方便，并不比黑键「更基本」——对其他乐器来说并非如此。", point: "十二个音理论上完全平等，没有谁是核心。" },
    misconception: "黑键音不是「次要的音」，只是钢琴把它们做成了黑色。" },
  { id: "interval", name_zh: "音程", name_en: "Interval", icon: "📐", section_id: "s2", group: "interval",
    plain: "两个音之间的距离，用「性质 + 度数」命名，如大三度、纯五度。",
    explain: "度数数的是从低音（根音）到高音（冠音）经过了几个字母：C 到 E 经过 C、D、E，是三度。但 C–E 和 C–E♭ 都是三度，距离却差一个半音，所以要加上性质：大、小、纯、增、减。\n\n最可靠的办法是数半音：大三度 4 个半音、小三度 3 个、纯五度 7 个、三全音 6 个。半音数相同而写法不同的音程（如增二度与小三度）听起来一样。",
    analogy: "像地址里的「第几栋」和「几号门」：只说第三栋不够，还要说是东门还是西门，才能精确定位。",
    book_example: { what: "书中用一张对照表：列是半音数，行是度数，交叉处给出性质。", point: "相同度数可以有不同半音数；相同半音数也可以有不同度数（等音程）。" },
    misconception: "「三度」不是「3 个半音」——度数数字母，半音数数格子，两套计数要分开。" },
  { id: "interval_sum", name_zh: "音程加法", name_en: "Adding intervals", icon: "➕", section_id: "s2", group: "interval",
    plain: "度数相加再减一，半音数直接相加，再据此判断性质。",
    explain: "叠两个音程时，中间那个音被数了两次，所以度数要「相加减一」：三度 + 三度 = 五度。半音数则直接相加：大三度（4）+ 小三度（3）= 7 个半音，正是纯五度。\n\n超过八度的音程叫复音程，例如小七度 + 大三度 = 九度、14 个半音，即大九度。减去一个八度后就回到单音程的大二度。",
    analogy: "像数台阶：从第 1 级走到第 3 级，再从第 3 级走到第 5 级——共到第 5 级，而不是第 6 级，因为第 3 级只踩了一次。",
    book_example: { what: "书中的两个例子：大三度 + 小三度 = 纯五度；小七度 + 大三度 = 大九度。", point: "这正是三和弦与九和弦的搭建方式。" },
    misconception: "度数不能直接相加（3+3≠6），这是初学者最常见的错误。" },
  { id: "inversion", name_zh: "转位", name_en: "Inversion", icon: "⇅", section_id: "s3", group: "interval",
    plain: "把音程的低音升高一个八度（或高音降低一个八度），两音上下颠倒。",
    explain: "转位前后的两个音程「互补」：度数相加为 9，半音数相加为 12，正好凑成一个纯八度。性质也成对翻转：纯仍为纯，大变小、小变大，增变减、减变增。\n\n例如 C 到上方 E 是大三度（4 个半音）；把 C 升高八度，E 到 C 就是小六度（8 个半音）。纯四度与纯五度互为转位，这就是「向上纯四度」和「向下纯五度」到达同一个音名的原因。",
    analogy: "像钟面上的「顺时针 4 格」和「逆时针 8 格」：方向相反，到的是同一个点，两段弧加起来正好一圈。",
    book_example: { what: "书中用纯四度与纯五度说明：从 C 向上纯四度和向下纯五度都得到 F，只差一个八度。", point: "因此纯四度循环和五度圈是同一个圈，只是方向相反。" },
    misconception: "转位不改变两个音的音名，只改变谁在上、谁在下。" },
  { id: "interval_cycles", name_zh: "音程循环", name_en: "Interval cycles", icon: "⭕", section_id: "s3", group: "pitch",
    plain: "从一个音出发，反复走同一个音程，最终一定回到起点，画出一个正多边形。",
    explain: "在半音阶圈上每次走 k 格：走全音（2 格）经过 6 个音成正六边形；小三度（3 格）经过 4 个音成正方形；大三度（4 格）经过 3 个音成正三角形；三全音（6 格）只有 2 个音，是一条直径。\n\n能走遍几个音，由 k 与 12 的最大公约数决定：公约数是几，就有几组互不相交的循环。纯四度（5 格）和纯五度（7 格）与 12 互质，所以一口气走遍全部十二个音，画出十二芒星。",
    analogy: "像在 12 个座位的圆桌边每隔 k 个座位发一张牌：k 和 12 有公因数，就只能发到一部分人，剩下的人要另起一轮。",
    book_example: { what: "书中把六种循环逐一画出：两种全音阶、三种减七和弦、四种增三和弦、十二芒星状的四/五度圈，以及六对三全音。", point: "因为循环的存在，减七和弦本质上只有三种，增三和弦只有四种。" },
    misconception: "对称并不意味着悦耳：减七、增三、三全音在几何上最完美，听起来却最紧张。" },
  { id: "circle_of_fifths", name_zh: "五度圈", name_en: "Circle of fifths", icon: "🎡", section_id: "s3", group: "pitch",
    plain: "按纯五度排列的十二个音：C–G–D–A–E–B–F♯–C♯…–F–C。",
    explain: "从 C 出发不断上行纯五度（7 个半音），依次得到 G、D、A、E……十二步后回到 C。因为 7 与 12 互质，十二个音一个不漏。\n\n五度圈与半音阶循环是「一体两面」：把半音阶画成圆，五度圈就是一颗十二芒星；把五度圈画成圆，半音阶又变成十二芒星。两者可以相互推出，数学上叫同构。",
    analogy: "像翻花绳：同一根绳子，换一种撑法就从圆圈变成星星，绳上的结（十二个音）一个也没少。",
    book_example: { what: "书中用红蓝两色把半音阶与五度圈叠在一张图里，演示圆与十二芒星的互换。", point: "五度圈是基础乐理的难点，但从循环角度看它只是「每步 7 格」的那一种。" },
    misconception: "五度圈不是额外要背的东西，它可以从半音阶循环直接推出来。" },
  { id: "tritone", name_zh: "三全音", name_en: "Tritone", icon: "⚡", section_id: "s3", group: "interval",
    plain: "6 个半音，正好是八度的一半；十二个音两两配成六对。",
    explain: "增四度和减五度都是 6 个半音，等于三个全音，所以合称三全音。它把八度一分为二：从 C 上行三全音到 F♯/G♭，再上行三全音就回到 C。\n\n在半音阶圈上，三全音就是六条直径的两端。它是最不协和、最想「解决」的音程之一，后面的属七和弦正是靠它产生推动力。",
    analogy: "像钟面上的 12 点和 6 点：正对面，是离彼此最远的位置。",
    book_example: { what: "书中把三全音画成圆上的六条直径。", point: "两个音互为三全音，从哪一个出发都一样——完全对称。" },
    misconception: "三全音不是「错误的音程」，而是和声张力的主要来源。" },
  { id: "triad", name_zh: "三和弦", name_en: "Triad", icon: "🔺", section_id: "s4", group: "chord",
    plain: "三个音按三度叠起来：根音、三音、五音。",
    explain: "传统和弦由三度音程堆叠而成，最基本的是三个音的三和弦。以 C–E–G 为例：C 是叠置的基础，叫根音；E 在根音上方三度，叫三音；G 在根音上方五度，叫五音。\n\n在圆上或网格上把这三个音连起来，就得到一个三角形，三条边恰好是三和弦内部的三个音程：大三度、小三度和纯五度。",
    analogy: "像三脚架：根音是落地的那条腿，三音决定朝哪边倾斜（大或小），五音让整体稳当。",
    book_example: { what: "书中第一个例子就是 C 和弦：C 上叠大三度到 E，E 上叠小三度到 G。", point: "和弦记号用根音名代表整个和弦：C–E–G 记作 C。" },
    misconception: "和弦符号 C 不是只按一个 C 音（那是电子琴的「单指和弦」），而是三个音同时响。" },
  { id: "major_minor", name_zh: "大三和弦与小三和弦", name_en: "Major vs. minor triad", icon: "🌗", section_id: "s5", group: "chord",
    plain: "大三 = 大三度 + 小三度（明亮）；小三 = 小三度 + 大三度（暗淡）。",
    explain: "两种三和弦的外框都是纯五度，区别只在中间的三音：根音到三音是大三度就是大三和弦，书中涂红；是小三度就是小三和弦，记作 Em 之类，书中涂蓝。\n\n同一根音上的大、小三和弦只差三音的半音：E–G♯–B 把 G♯ 降半音就是 E–G–B。半音距离很近，听感差别却很大，这是和声里最常用的「小改动、大效果」。所以三音决定和弦性质，一般不能省；五音常可省略。",
    analogy: "像一张脸只动嘴角：同样的五官，嘴角上扬半毫米是笑，下垂半毫米是愁。",
    book_example: { what: "书中比较 E 与 Em：只有三音 G♯/G 不同。", point: "在网格图上，这个变化就是三角形上下翻转。" },
    misconception: "小三和弦不是「错的」或「不和谐的」，它同样协和，只是色彩更暗。" },
  { id: "tonnetz", name_zh: "网格图（Tonnetz）", name_en: "Tonnetz", icon: "🕸️", section_id: "s6", group: "chord",
    plain: "把三和弦三角形铺满平面：每个交点是一个音，向上三角是大三，向下三角是小三。",
    explain: "把 C 和弦的三角形继续向四周铺开，就得到一张三角网格。本书的方向是：横线向右每格上行纯五度，右上斜线每格上行大三度，左上斜线每格下行小三度。于是每个朝上的三角形都是大三和弦，每个朝下的都是小三和弦。\n\n同样结构的和弦在网格上形状相同，看形状就能判断和弦性质。这张图最早由欧拉在 1739 年提出，后来经里曼等人发展，德语名 Tonnetz 意为「音的网络」。本书的网格把传统画法上下颠倒，好让「越往上、往右音越高」。",
    analogy: "像地铁线路图：不关心真实距离，只关心谁和谁相邻、换乘一站要走哪条线。",
    book_example: { what: "书中从 C、G、Em 三个三角形出发，一步步铺成整张网格。", point: "之后讲调、和声进行，都是在这张图上移动和翻转三角形。" },
    misconception: "网格上同一个音会重复出现多次——这不是错，而是循环在平面上的投影。" },
  { id: "grid_cycles", name_zh: "网格中的循环", name_en: "Cycles in the Tonnetz", icon: "🍩", section_id: "s6", group: "chord",
    plain: "横线是五度圈，两条斜线是大三度、小三度循环；网格可以卷成一个甜甜圈。",
    explain: "网格的三个方向各对应一种循环：横线是五度圈，右上斜线每三个音循环一次（大三度），左上斜线每四个音循环一次（小三度）。所以这张平面图其实是三种循环交织而成的。\n\n按这些循环把平面卷起来，就得到一个环面（甜甜圈）。平面上，它像瓷砖一样由面积为 24 个三角形的「单元胞」重复铺成，每块单元胞里十二个音恰好各出现一次。全音阶、半音阶、三全音也都能在网格上找到。",
    analogy: "像老式游戏的地图：从右边走出去会从左边回来，从上面走出去会从下面回来——地图其实是一个甜甜圈。",
    book_example: { what: "书中画出三种不同形状的四边形单元胞，面积都是 24 个三角形格子。", point: "看网格要留意重复结构：一个和弦在图上会出现很多次。" },
    misconception: "网格并不是无限多个不同的音，它只有 12 个音级在周期性地重复。" },
];

export const relations = [
  { from: "equal_temperament", to: "octave_cycle", label: "等分八度" },
  { from: "octave_cycle", to: "interval_cycles", label: "首尾相接" },
  { from: "pitch_names", to: "octave_cycle", label: "给位置命名" },
  { from: "interval", to: "interval_sum", label: "可以相加" },
  { from: "interval", to: "inversion", label: "上下颠倒" },
  { from: "interval", to: "interval_cycles", label: "反复叠加" },
  { from: "inversion", to: "circle_of_fifths", label: "四度=反向五度" },
  { from: "interval_cycles", to: "circle_of_fifths", label: "步长 7" },
  { from: "interval_cycles", to: "tritone", label: "步长 6" },
  { from: "interval_sum", to: "triad", label: "大三+小三" },
  { from: "triad", to: "major_minor", label: "三音定性质" },
  { from: "major_minor", to: "tonnetz", label: "上下三角" },
  { from: "triad", to: "tonnetz", label: "铺满平面" },
  { from: "circle_of_fifths", to: "grid_cycles", label: "横线" },
  { from: "interval_cycles", to: "grid_cycles", label: "斜线" },
  { from: "tonnetz", to: "grid_cycles", label: "卷成环面" },
];

const sections = [
  { id: "s1", no: "1-1", title_zh: "半音阶循环", title_en: "The chromatic cycle", gist: "八度等分成十二个半音，首尾相接成一个圈。",
    summary: "声音的高低由频率决定，频率翻倍就是八度。十二平均律把八度按比例等分成十二份，每份一个半音。因为每 12 个半音就回到同名音，十二个音可以排成一个圆——半音阶循环。音名 C–B 加升降号给这些位置命名，同一位置可能有两个名字（等音）。",
    concept_ids: ["equal_temperament", "octave_cycle", "pitch_names"] },
  { id: "s2", no: "1-1", title_zh: "音程", title_en: "Intervals", gist: "两音之间的距离：性质 + 度数，最可靠的是数半音。",
    summary: "度数数字母，性质区分同度数下的不同距离（大、小、纯、增、减）。音程可以相加：度数相加减一，半音数直接相加。大三度 + 小三度 = 纯五度；小七度 + 大三度 = 大九度，超过八度的叫复音程。",
    concept_ids: ["interval", "interval_sum"] },
  { id: "s3", no: "1-1", title_zh: "更多的循环", title_en: "More cycles", gist: "反复走同一个音程，在圆上画出正多边形。",
    summary: "全音画正六边形（两种全音阶），小三度画正方形（三种减七和弦），大三度画正三角形（四种增三和弦），三全音是六条直径，纯四度/纯五度走遍十二音画出十二芒星。借助转位可以看出：纯四度循环和五度圈是同一个圈，五度圈与半音阶互为「翻花绳」。",
    concept_ids: ["interval_cycles", "inversion", "circle_of_fifths", "tritone"] },
  { id: "s4", no: "1-2", title_zh: "大三和弦", title_en: "Major triads", gist: "大三度 + 小三度：网格上朝上的红色三角形。",
    summary: "三度叠置的三个音构成三和弦，分别叫根音、三音、五音。C–E–G 是大三和弦，明亮和谐，记作 C。任何音上都能建立大三和弦，共十二个。和弦字母记号流行于流行与爵士音乐，写法不统一，需要事先约定。",
    concept_ids: ["triad"] },
  { id: "s5", no: "1-2", title_zh: "小三和弦", title_en: "Minor triads", gist: "小三度 + 大三度：朝下的蓝色三角形。",
    summary: "C 和弦与 G 和弦之间夹着一个倒三角 E–G–B，这就是小三和弦 Em。同根音的大、小三和弦只差三音的半音，在图上就是三角形上下翻转。三音决定性质不能省，五音常可省略。半音虽近，听感差别却很大。",
    concept_ids: ["major_minor"] },
  { id: "s6", no: "1-2", title_zh: "三和弦的网格图", title_en: "The triad Tonnetz", gist: "三角形铺满平面：三个方向是三种循环。",
    summary: "把三角形向四周铺开就得到 Tonnetz：每个交点一个音，朝上三角大三、朝下三角小三，同结构和弦形状相同。横线是五度圈，右上斜线是大三度循环，左上斜线是小三度循环；整张图可以卷成环面，由单元胞周期性铺成。全音阶、三全音等也能在网格上找到。",
    concept_ids: ["tonnetz", "grid_cycles"] },
];

const WT = [0, 2, 4, 6, 8, 10];

export default function Chapter() {
  return <ChapterPage meta={meta} groups={groups} concepts={concepts} relations={relations}>
    <SoundBar />

    <Block id="hook" toc="开场">
      <Hook title="先听，再看"><p>
        先点一下这两个按钮：<Play chord="C" arp={0.06}>C 和弦</Play> 和 <Play chord="Cm" arp={0.06}>Cm 和弦</Play>。
        前一个明亮，后一个暗淡——可两者只差<b>一个音、一个半音</b>。为什么半步之差能让情绪翻转？为什么吉他手说「这几个和弦形状都一样」？
        这一章把十二个音排成一个圆，再把和弦画成三角形，你会看到：和声里许多看似要死记的规则，其实是几何。
        页面右下角是音量条；文中所有带 ▶ 的按钮都可以点。</p>
      </Hook>
    </Block>

    <Block id="secs" toc="小节" kicker="原书结构" title="本章六个小节" lead="1-1 讲「音」怎样循环，1-2 讲「和弦」怎样成网。点卡片看要点。">
      <SectionCards sections={sections} />
    </Block>

    <Block id="flow" toc="主线" kicker="论证主线" title="从一根弦到一张网">
      <ArgumentFlow steps={[
        { claim: "音高 = 频率；频率翻倍 = 八度", detail: "这是一切的起点：八度听起来是「同一个音高了一层」。" },
        { claim: "十二平均律把八度等比例切成 12 个半音", detail: "十二个音地位平等，走同样多的半音得到同样的音程。" },
        { claim: "首尾相接：十二个音围成一个圆", detail: "于是有了「循环」——往上走和往下走可以到同一个位置。" },
        { claim: "音程 = 圆上走几格", detail: "度数和性质是传统叫法，半音数是最可靠的度量。" },
        { claim: "反复走同一步，画出正多边形", detail: "最大公约数决定能走遍几个音：全音阶、减七、增三、三全音、五度圈都由此而来。" },
        { claim: "三度叠成三和弦：一个三角形", detail: "大三和弦与小三和弦只差三音的一个半音。" },
        { claim: "三角形铺满平面：Tonnetz 网格", detail: "三个方向恰是五度、大三度、小三度三种循环。" },
        { claim: "以后的和声，就是在网格上移动形状", detail: "调、功能、和声进行都会在这张图上展开。" },
      ]} />
    </Block>

    <Block id="freq" toc="八度与平均律" kicker="1-1 · 半音阶循环" title="频率翻倍，就是八度"
      lead="下面是 C4 到 C5 的 13 个音。柱高是频率：每升一个半音乘约 1.0595，走满 12 步正好乘 2。">
      <Narrate />
      <FreqLadder />
      <p>声音是振动，每秒振动次数叫频率。频率越高听着越高。最特别的关系是<b>频率翻倍</b>：试听 <Play notes="C4 C5" melodic>C4 → C5</Play>，
        两个音高度不同，却像「同一个音」，这就是<C id="octave_cycle">八度</C>。</p>
      <p><C id="equal_temperament">十二平均律</C>按<b>比例</b>而不是按差值来切八度：每个半音都乘同一个数（2 的 12 次方根）。
        所以无论从哪个音出发，走 7 个半音都得到同样的纯五度——十二个音一律平等。</p>
    </Block>

    <Block id="names" toc="音名" kicker="1-1 · 半音阶循环" title="给十二个位置起名字">
      <Narrate />
      <Keyboard from="C4" to="B5" names="white" />
      <p>白键依次是 C D E F G A B；升号 ♯ 抬高半音，降号 ♭ 降低半音，于是黑键有两个名字，如 C♯/D♭——这叫<C id="pitch_names">等音</C>。
        E 与 F、B 与 C 之间本来就只差半音，所以 E♯ = F、B♯ = C。点键盘可以试听。</p>
      <Callout tone="key" title="十二个音没有「主次」">
        白键在钢琴上好弹，不代表 C D E 比黑键更基本。对很多管乐器和吉他来说，「简单」的音完全是另一批。理论上，十二个音完全平等。
      </Callout>
    </Block>

    <Block id="intervals" toc="音程" kicker="1-1 · 音程" title="音程：在圆上走几格">
      <Narrate />
      <p>两个音的距离叫<C id="interval">音程</C>，传统叫法是「性质 + 度数」：度数数字母（C 到 E 经过 C、D、E，是三度），性质区分同度数里的远近：
        <Play notes="C4 E4">C–E 大三度（4 个半音）</Play> 与 <Play notes="C4 Eb4">C–E♭ 小三度（3 个半音）</Play> 都是三度，却差一个半音。
        最省事的办法：<b>数半音</b>。</p>
      <IntervalLab />
      <p><C id="interval_sum">音程可以相加</C>：度数「相加减一」（中间那个音被数了两次），半音数直接相加。</p>
      <ul>
        <li>大三度 + 小三度 = 4 + 3 = 7 个半音 = 纯五度：<Play notes="C4 E4 G4" melodic gap={0.45}>C → E → G</Play>，再 <Play notes="C4 G4">同时听 C–G</Play></li>
        <li>小七度 + 大三度 = 10 + 4 = 14 个半音 = 大九度（超过八度，叫复音程）：<Play notes="C4 Bb4 D5" melodic gap={0.45}>C → B♭ → D</Play></li>
      </ul>
    </Block>

    <Block id="cycles" toc="六种循环" kicker="1-1 · 更多的循环" title="反复走同一步，会画出什么？"
      lead="选一个步长，看它在圆上画出的形状，再点「播放这个循环」听它。试试 8–11：它们和哪个小步长画出同一个形状？">
      <Narrate />
      <PitchCircle step={2} steps={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]} />
      <Tabs tabs={[
        { label: "全音 · 六边形", content: <p>每步 2 格，六个音构成<b>全音阶</b>：<Play notes="C4 D4 E4 F#4 G#4 A#4 C5" melodic gap={0.3}>听全音阶</Play>。
          剩下六个音组成另一个全音阶——全音阶本质上只有<b>两种</b>。它没有「家」的感觉，常用来营造梦境、悬浮感。</p> },
        { label: "小三度 · 正方形", content: <p>每步 3 格，四个音 C、E♭、F♯/G♭、A 叠在一起就是<b>减七和弦</b>：<Play notes="C4 Eb4 Gb4 A4" arp={0.05}>听减七和弦</Play>。
          从哪个音起建都是同一组音，所以减七和弦本质上只有<b>三种</b>。</p> },
        { label: "大三度 · 三角形", content: <p>每步 4 格，三个音 C、E、G♯ 就是<b>增三和弦</b>：<Play notes="C4 E4 G#4" arp={0.05}>听增三和弦</Play>，本质上只有<b>四种</b>。</p> },
        { label: "三全音 · 直径", content: <p>每步 6 格，只有两个音：<Play notes="C4 F#4">C–F♯ 三全音</Play>。十二个音两两相对，配成六对<C id="tritone">三全音</C>。</p> },
        { label: "四度 · 五度圈", content: <p>每步 5 格或 7 格，因为 5、7 与 12 互质，会走遍全部十二个音，画出十二芒星：<Play seq={["C4", "G4", "D5", "A4", "E5", "B4", "F#5"]} gap={0.35}>听五度上行</Play>。
          按 7 格排成的圆就是<C id="circle_of_fifths">五度圈</C>；按 5 格走只是方向相反——纯四度与纯五度互为<C id="inversion">转位</C>。</p> },
      ]} />
      <Callout tone="info" title="翻花绳：半音阶 ⇄ 五度圈">
        选步长 7，点「五度圈排列」：十二个音沿弧线换位，原本的十二芒星变成了圆；再选步长 1，半音阶反而成了星。两个循环是同一结构的两种画法（同构）。
      </Callout>
      <Callout tone="warn" title="几何上最对称，听起来最紧张">
        全音阶、减七、增三、三全音在圆上最匀称，可点听一下——它们恰恰最不协和、最想往别处走。这种反差是后面「和声张力」的伏笔。
      </Callout>
    </Block>

    <Block id="triads" toc="三和弦" kicker="1-2 · 大三和弦 / 小三和弦" title="三个音，一个三角形"
      lead="点红色三角听 C 和弦；点中间的蓝色倒三角听 Em。选中后，下方按钮只移动三音一个半音，听大小互换。">
      <Narrate />
      <Tonnetz cols={7} rows={3} center="C" highlight={["C", "G", "Em"]} select="M0" unit={78} />
      <p>把 C、E、G 连起来是一个三角形：C 是<C id="triad">根音</C>，E 是三音，G 是五音；三条边正是大三度（C–E）、小三度（E–G）和纯五度（C–G）。
        「大三度 + 小三度」的叫大三和弦，记作 C，书里一律涂红：<Play chord="C" arp={0.08}>C</Play> <Play chord="G" arp={0.08}>G</Play>。</p>
      <Score abc={'"C"[CEG]4 | "G"[B,DG]4 | "Em"[EGB]4 | "E"[E^GB]4 |]'} tempo={60} caption="同样三个和弦写在五线谱上：C、G、Em，以及只把 G 升半音的 E。" />
      <p>C 和 G 之间夹着一个倒三角 E–G–B：先小三度、再大三度，这是<C id="major_minor">小三和弦</C> Em，涂蓝：<Play chord="Em" arp={0.08}>Em</Play>。</p>
      <p>同根音的大小三和弦只差三音：<Play seq={["E", "Em", "E", "Em"]} gap={0.9}>E ⇄ Em</Play>。半音在键盘上只隔一个键，在和声里却改变了整个色彩——所以三音不能随便省，五音则常可省略。</p>
    </Block>

    <Block id="tonnetz" toc="网格图" kicker="1-2 · 三和弦的网格图" title="Tonnetz：把三角形铺满平面"
      lead="每个交点是一个音，朝上三角 = 大三和弦，朝下三角 = 小三和弦。打开上方按钮，看三个方向各是什么循环；发声时，所有同名的音会一起亮起。">
      <Narrate />
      <Tonnetz cols={12} rows={7} center="C" showAxesToggle unit={56} />
      <p>这张<C id="tonnetz">网格图</C>由欧拉在 1739 年首创，后经里曼等人发展。本书的方向：<b>向右</b>每格升纯五度，<b>右上</b>每格升大三度，<b>左上</b>每格降小三度
        （传统画法上下颠倒，书里翻了过来，好符合「往上、往右就更高」的直觉）。</p>
      <p>同一个音在网格上会出现很多次——因为三个方向都是<C id="grid_cycles">循环</C>：横线是五度圈，右上斜线三个音一循环，左上斜线四个音一循环。
        把平面按这些循环卷起来，就是一个甜甜圈形的环面；平面上它由面积 24 个三角形的「单元胞」周期性铺成。</p>
      <Tabs tabs={[
        { label: "全音阶在网格上", content: <Tonnetz cols={10} rows={5} center="C" notes={WT} unit={50} caption="金色交点是全音阶 C、D、E、F♯/G♭、G♯/A♭、A♯/B♭，在网格上排成规则的条带。" /> },
        { label: "三全音在网格上", content: <Tonnetz cols={10} rows={5} center="C" notes={[0, 6]} unit={50} caption="金色交点是 C 与 F♯/G♭，在网格上隔着固定的距离成对出现。" /> },
        { label: "大三度循环", content: <Tonnetz cols={10} rows={5} center="C" notes={[0, 4, 8]} axes={["M3"]} unit={50} caption="C–E–G♯ 沿右上斜线反复出现：三步一循环。" /> },
      ]} />
    </Block>

    <Block id="ear" toc="听音练习" kicker="动耳朵" title="听音练习：大三还是小三？" lead="不看谱，只用耳朵。每题可以反复听。">
      <EarQuiz items={[
        { q: "这是大三和弦还是小三和弦？", play: { chord: "F", arp: 0.05 }, options: ["大三和弦（明亮）", "小三和弦（暗淡）"], answer: 0, why: "F–A–C，三音 A 与根音成大三度。" },
        { q: "这一个呢？", play: { chord: "Am", arp: 0.05 }, options: ["大三和弦（明亮）", "小三和弦（暗淡）"], answer: 1, why: "A–C–E，三音 C 与根音成小三度。" },
        { q: "下面两个和弦，哪一个是小三？", play: { seq: ["D", "Dm"], gap: 1.1 }, options: ["第一个", "第二个"], answer: 1, why: "D → Dm：只有三音 F♯ 降到了 F。" },
        { q: "这个音程有多少个半音？", play: { notes: "C4 G4" }, options: ["4（大三度）", "7（纯五度）", "6（三全音）"], answer: 1, why: "纯五度空旷稳定，是三和弦的外框。" },
        { q: "这个和弦在圆上最对称——它是？", play: { notes: "C4 E4 G#4", arp: 0.05 }, options: ["大三和弦", "增三和弦", "小三和弦"], answer: 1, why: "增三和弦由两个大三度叠成，把八度三等分，听起来悬而未决。" },
        { q: "这个音程是？", play: { notes: "F4 B4" }, options: ["纯四度", "三全音", "纯五度"], answer: 1, why: "F–B 是 6 个半音的三全音，紧张、想要解决。" },
      ]} />
    </Block>

    <Block id="concepts" toc="概念卡" kicker="核心概念" title="本章 13 个概念"><ConceptGrid /></Block>
    <Block id="map" toc="概念图" kicker="概念关系" title="它们怎样连在一起"><ConceptMap /></Block>

    <Block id="quiz" toc="自测" kicker="检验理解" title="自测">
      <Quiz questions={[
        { q: "为什么 C 往上走 2 个半音和往下走 10 个半音会到同一个音名？", options: ["因为 2 和 10 都是偶数", "因为每 12 个半音回到同名音，2 + 10 = 12", "因为 D 比 C 高", "只在钢琴上成立"], answer: 1, why: "八度循环：圆上顺时针 2 格与逆时针 10 格是同一位置。" },
        { q: "小三度循环为什么只有 3 组？", options: ["因为小三和弦只有 3 种", "3 与 12 的最大公约数是 3", "因为一组有 3 个音", "书中规定的"], answer: 1, why: "每组走 12 ÷ 3 = 4 个音，共 3 组互不相交的循环——对应三种减七和弦。" },
        { q: "大三度 + 小三度 等于？", options: ["六度", "纯五度", "大六度", "三全音"], answer: 1, why: "度数 3 + 3 − 1 = 5，半音 4 + 3 = 7，纯五度。" },
        { q: "把 C–E（大三度）转位，得到？", options: ["小三度", "小六度", "大六度", "纯四度"], answer: 1, why: "度数相加为 9、半音相加为 12：六度、8 个半音，小六度。" },
        { q: "在本书的网格图上，朝下的三角形是什么？", options: ["增三和弦", "大三和弦", "小三和弦", "减三和弦"], answer: 2, why: "朝上为大三（红），朝下为小三（蓝）。" },
        { q: "网格图里同一个音出现很多次，说明了什么？", options: ["画错了", "三个方向都是循环，平面是环面的展开", "高八度的音", "等音的写法不同"], answer: 1, why: "横向五度圈、两条斜向三度循环让图周期性重复，可以卷成环面。" },
      ]} />
    </Block>

    <Block id="end" toc="小结">
      <Takeaways items={[
        "十二平均律把八度按比例等分成十二个半音，十二个音地位平等，并首尾相接成一个圆。",
        "音程最好用半音数理解；度数「相加减一」，转位前后半音数之和为 12。",
        "反复走同一个音程会画出正多边形，k 与 12 的最大公约数决定循环有几组：全音阶 2、减七 3、增三 4、三全音 6、五度圈 1。",
        "三和弦是三角形；大三与小三只差三音的一个半音，在网格上表现为三角形翻转。",
        "Tonnetz 由五度、大三度、小三度三种循环编织而成——之后的一切都在这张图上展开。",
      ]} />
      <Progression title="预告：C–F–G–C 在网格上怎么走" chords={["C", "F", "G", "C"]} keyName="C" tonnetz={{ cols: 9, rows: 4, center: "C" }}
        caption="三个大三和弦在网格上并排相邻：主和弦居中，下属在左、属在右。下一章细讲。" />
      <Bridge><p>下一章把网格上的一块平行四边形框出来：七个音、七个三和弦——这就是大调。
        你会看到 <Play seq={["C", "F", "G", "C"]} gap={0.8}>C–F–G–C</Play> 为什么听起来像「回家」，以及主、属、下属三种功能在网格上的位置。</p></Bridge>
    </Block>

    <Block id="gloss" toc="术语" title="术语表">
      <Glossary terms={[
        { term: "Octave", zh: "八度", def: "频率比 2:1 的两个音，音名相同。" },
        { term: "12-TET", zh: "十二平均律", def: "把八度按频率比等分为 12 个半音的律制。" },
        { term: "Semitone / Whole tone", zh: "半音 / 全音", def: "十二平均律的最小单位 / 两个半音。" },
        { term: "Enharmonic", zh: "等音", def: "音高相同、写法不同，如 C♯ 与 D♭。" },
        { term: "Interval", zh: "音程", def: "两音距离，以「性质 + 度数」命名。" },
        { term: "Compound interval", zh: "复音程", def: "超过八度的音程，如大九度。" },
        { term: "Inversion", zh: "转位", def: "两音上下颠倒；转位前后半音数之和为 12。" },
        { term: "Whole tone scale", zh: "全音阶", def: "由六个全音构成的音阶，只有两种。" },
        { term: "Circle of fifths", zh: "五度圈", def: "按纯五度排列的十二个音。" },
        { term: "Tritone", zh: "三全音", def: "6 个半音的增四度/减五度。" },
        { term: "Triad", zh: "三和弦", def: "根音、三音、五音三度叠置。" },
        { term: "Diminished 7th / Augmented triad", zh: "减七和弦 / 增三和弦", def: "由小三度 / 大三度循环构成的对称和弦。" },
        { term: "Tonnetz", zh: "网格图", def: "三和弦三角形铺成的音高网络，欧拉首创。" },
      ]} />
    </Block>
  </ChapterPage>;
}
