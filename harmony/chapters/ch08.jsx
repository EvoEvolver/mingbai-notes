// 第 8 章 · 和弦变换：新黎曼理论的 P/L/R 变换、对角与中音关系、三度循环与巴托克轴心、和弦音的升降与游移和弦、
// 七和弦的变换（减七、属七、Blackadder 和弦）、平移与倒影（负极和声）、终止式的发展
import { ChapterPage, Block, Hook, SectionCards, ArgumentFlow, ConceptGrid, ConceptMap, Quiz, Takeaways, Bridge, Glossary, C, Callout, Tabs, CompareTable } from "@kit";
import { Play, SoundBar, Tonnetz, EarQuiz, Narrate, Score, Progression } from "@kit/audio";
import PLRFlipper from "./_ch08_plr.jsx";
import ToneLab from "./_ch08_tones.jsx";

export const meta = {
  id: "ch08", no: 8, title_zh: "和弦变换", title_en: "Chord Transformations",
  era: "进阶篇 · 声部与结构 · 本章最「几何」",
  one_liner: "把和弦当成网格上的三角形来翻转、平移、镜像：和弦之间的远近，就是要走几步。",
  big_question: "抛开调与功能，只看和弦本身的音怎样移动，和弦之间还有哪些联系？",
  why_it_matters: "前几章用调和功能解释和声；这一章换一副眼镜：新黎曼理论把和弦关系看成网格上的几何操作。P、L、R 三种翻转能解释浪漫派的中音进行、柯川的《Giant Steps》、巴托克的轴心体系；和弦音的半音升降引出增三、减七、属七三种「游移和弦」；倒影又带来了近年很热的「负极和声」。",
  original_words: 39000, read_minutes: 55,
};

export const groups = [
  { id: "plr", label: "三元变换与距离" },
  { id: "cycle", label: "循环与轴心" },
  { id: "voice", label: "升降与游移和弦" },
  { id: "mirror", label: "平移、倒影与终止" },
];

export const concepts = [
  { id: "plr", name_zh: "三元变换 P / L / R", name_en: "Triadic transformations", icon: "🔺", section_id: "s1", group: "plr",
    plain: "保留两个音、把第三个音移动半音或全音，大三和小三互换。",
    explain: "新黎曼理论把和弦关系看作「对和弦的操作」。P（平行）把大三和弦的三音降半音、小三和弦的三音升半音，得到同名和弦：P(C) = Cm；R（关系）把大三的五音升全音、小三的根音降全音，得到关系和弦：R(C) = Am；L（导音）把大三的根音降半音、小三的五音升半音：L(C) = Em。\n\n在网格图上，三种变换都是让三角形沿某一条边翻转到相邻三角形：P 翻过「根音—五音」边，R 翻过「根音—三音」边，L 翻过「三音—五音」边。两个音保留、一个音二度移动，所以接近度最高、进行力度最弱（弱进行），而且和弦性质一定大小互换。变换只看和弦本身，与它属于哪个调、发挥什么功能无关，是一种非功能思路。",
    analogy: "像翻纸牌：牌的一条边贴着桌面不动，整张牌翻过去，落在旁边的格子里。三条边对应三种翻法，翻过去的牌颜色（大/小）一定变了。",
    book_example: { what: "图 8.1 与谱例 8.1：C 与 Am 各做 P、R、L 三种变换，红色音符就是移动的那个音。", point: "与 I–i、I–vi、I–iii 的音相同，但变换不问调与功能。" },
    misconception: "P 的「平行」指同名大小调（Parallel key），不是第 7 章的「平行和声」。" },
  { id: "step_distance", name_zh: "变换步数与和弦接近度", name_en: "Harmonic proximity", icon: "📏", section_id: "s1", group: "plr",
    plain: "两个三和弦之间最少要翻几次三角形，就是它们的距离；步数越少越接近、进行越弱。",
    explain: "更远的关系都能拆成三元变换的叠加，写法从右往左执行：C 到 G 是先 L 再 R，记作 RL(C) = G；C 到 F 是 LR(C)。五度关系要走两步，只有一个共同音，属于相对的强进行；二度关系和三全音关系（如 C–Dm、C–F♯m）要走三步，完全没有共同音，是更强的进行。\n\n由于网格首尾循环，任意两个大小三和弦之间最多五步。步数为奇数时和弦性质改变，为偶数时性质不变。勋伯格则从根音运动划分强弱：根音下五度或下三度是「升进行」（强），上五度或上三度是「降进行」（弱），二度是「超强进行」。这些划分都是一家之言，重点在听感与运用。",
    analogy: "像在棋盘上走马：相邻格一步就到，对角要绕两三步。步数越多，和声「换景」越彻底。",
    book_example: { what: "图 8.4：C、Am 到所有 24 个和弦的步数图；谱例 8.2 两步与三步变换的进行。", point: "步数是共同音多少的几何化。" },
    misconception: "「强进行」不等于「好进行」。弱进行平滑柔和，强进行鲜明有力，各有用途。" },
  { id: "diagonal", name_zh: "对角关系 S / N / Y", name_en: "Slide, Nebenverwandt, Y", icon: "✖️", section_id: "s1", group: "plr",
    plain: "三步变换中最特别的三种：只有一个共同音，另两个音都只走二度。",
    explain: "S（Slide，同中音）保持三音，根音和五音一起移半音：S(C) = C♯m，等于 LPR。N（Nebenverwandt）把大三和弦变成它的小下属、小三和弦变成它的大属：N(C) = Fm，N(Am) = E，等于 PLR。第三种没有公认术语，原书称 Y：Y(C) = Gm，Y(Am) = D，等于 PRL。\n\n它们在网格上与原三角形「顶角对顶角」，虽然要走三步，声部却非常平稳。另有「重同名」关系：P 与 S 的复合，和弦性质不变，整体平移半音（C 与 B、C♯）。",
    analogy: "像对角的邻居：隔着一个路口，但只要穿过一条斑马线就到。",
    book_example: { what: "谱例 8.4：C/E–C♯m/E（S）、C–Fm/C（N）、C/G–Gm（Y）等。", point: "这些进行以前都用借用、离调解释过，变换给了另一种更直接的理解。" },
    misconception: "对角关系不是「两步」：它在网格上看着近，实际是三次翻转的结果。" },
  { id: "chromatic_mediant", name_zh: "变化中音关系", name_en: "Chromatic mediant", icon: "🌗", section_id: "s2", group: "plr",
    plain: "根音相距三度、性质相同、只有一个共同音的和弦关系，如 C–A、C–E、C–A♭、C–E♭。",
    explain: "根音相距大、小三度的关系叫中音关系。一步 R、L 得到的中音/下中音和弦属于同一个调，叫自然中音（DM），有两个共同音，进行平稳。引入变化音后得到变化中音（CM）：大小三和弦各有四个，要两步变换，只剩一个共同音，色彩变化明显，常表现为和弦性质不变、整体平移三度。\n\n再远一步是二重变化中音：根音仍相距三度，但没有共同音（PRP、PLP，如 C–A♭m），调号可差六七个升降号。浪漫派爱用中音和弦代替刚硬的五度进行，用于阻碍终止、离调、转调和 ♭VI–I、III–I 之类的终止，有人因此提出独立的「中音功能」。",
    analogy: "五度进行像直角转弯，中音进行像斜着滑过去：车还在开，但窗外的颜色一下子全变了。",
    book_example: { what: "柴可夫斯基《无词歌》Op.2 No.3：持续低音上用 ♭VI（D♭）阻碍进行，结尾用 vi–I 三度进行收束。", point: "三度进行削弱了终止力度，调感变得朦胧温柔。" },
    misconception: "变化中音和弦不一定是离调：它常常只是「换颜色」，并不建立新调。" },
  { id: "hexatonic_cycle", name_zh: "六和弦循环（大三度循环）", name_en: "Hexatonic cycle", icon: "🧭", section_id: "s3", group: "cycle",
    plain: "从任何大小三和弦出发交替做 P、L，六步回到起点，根音走一条大三度循环。",
    explain: "C–Cm–A♭–G♯m–E–Em–C：交替 P 与 L，声部极平稳（每次只有一个音动半音），色彩却变化强烈。Cohn 等人把从 C 出发的这一圈叫北方循环；大三度循环共四个，所以有东、南、西、北四组。循环两极的和弦（C 与 A♭m）构成 H（六声极）关系，等于 PLP，没有共同音。\n\n大三度循环也能作为和声框架：李斯特《爱之梦》第 3 首走过 D♭m–A♭、Fm–C、Am–E、C♯m 的完整一圈；柯川《Giant Steps》以 B、G、E♭ 三个大七和弦的大三度循环为骨架，中间插入各自的属七或 2–5。这种做法在浪漫派中早已大量使用。",
    analogy: "像一座六边形的旋转楼梯：每一级只抬一点点脚，转一圈后已经看过四面不同的风景，又回到了原地。",
    book_example: { what: "谱例 8.8 北方循环；谱例 8.9 勃拉姆斯《双协奏曲》A♭–G♯m–E–Em–C–Cm–A♭–G♯m–E7。", point: "勃拉姆斯这里正好绕着北方循环走。" },
    misconception: "《Giant Steps》的大三度循环并非柯川首创；一个世纪前的欧洲浪漫派已经常用。" },
  { id: "axis_system", name_zh: "八和弦循环与巴托克轴心", name_en: "Octatonic cycle & axis system", icon: "✚", section_id: "s3", group: "cycle",
    plain: "P、R 交替形成小三度循环；轴心体系把小三度上的八个和弦归为同一功能。",
    explain: "从 C 交替做 P、R：C–Cm–E♭–E♭m–G♭–F♯m–A–Am–C，根音走一条小三度循环，正是同名、关系大小调层层交替的八个主和弦。Lendvai 据此提出轴心体系（巴托克轴心）：在五度圈上，主、属、下属和弦各对应一个「十」字轴，同轴的八个和弦具有同一功能（T、D、S），可以互相替换、甚至同时使用。\n\n相距三全音的两端叫极与对极；含主、属、下属音的一对叫主支，另一对叫副支。重属 DD 归入下属轴、重下属 SS 归入属轴，所以这是对功能和声的推广而不是反叛：T–S–D–T 变成十字轴的逆时针转动，C–F–G–C 可以换成 C–A♭–E–C。三全音替换也成了同轴的「极音替换」。功能被分散的结果是调中心变得多元，走向泛调性与多调性。",
    analogy: "像把一个班的学生按学号除以 4 的余数分成小组：组内的人（同轴和弦）可以互相顶班，换组才算「换岗」（功能进行）。",
    book_example: { what: "巴托克《蓝胡子公爵的城堡》：「夜」在 f♯ 小调、「光」在 C 大调，互为极点；「花」「泪之湖」在 E♭ 大调与 a 小调，构成副支。", point: "调性的对立被安排在同一根轴的两极。" },
    misconception: "轴心体系不是废除功能，而是把「属—主」的五度逻辑扩展到小三度方向。" },
  { id: "chord_family", name_zh: "同族和弦与和弦音的升降", name_en: "Chord families & semitone voice leading", icon: "🎚️", section_id: "s4", group: "voice",
    plain: "根音不变时，三音、五音（七音）的不同选择构成一族；每个音单独升降，就在不同和弦间穿梭。",
    explain: "根音为 C 时，三音有 E、E♭ 两种，五音有 G♯、G、G♭ 三种，于是 C 族三和弦有 2×3 = 6 种：增、大、小、减，以及大三降五（C♭5 = F♯ø no3）和小三升五（Cm♯5 = A♭）。把五音逐次升降：C → C+ → Am/C，或 C → C♭5 → FΔ no3；三音和根音也能升降。三个音各自升降，构成一个三维的点阵网络（Tymoczko《音乐几何》）。\n\n七和弦再加一个七音（B、B♭、A），同族理论上有 18 种，按基础三和弦分六组：例如 C → CΔ → C7 → C6 → C♭6 只是高八度的根音一路下滑半音，途中出现 C6 = Am7、C♭6 = A♭+Δ 等等音关系。",
    analogy: "像调音台上的推子：每个推子（声部）只推一格，整首歌的颜色就变了一档。",
    book_example: { what: "图 8.15–8.18 C、Cm 的五音、三音、根音变换；图 8.28–8.33 六组七和弦。", point: "所有和弦都能通过半音一步步连起来。" },
    misconception: "等音和弦名称不同，并不说明音响不同：C6 与 Am7 四个音完全一样，区别在根音的理解与走向。" },
  { id: "line_cliche", name_zh: "线性套路与半音滑动", name_en: "Line cliché", icon: "〰️", section_id: "s4", group: "voice",
    plain: "一个和弦持续时，让某个声部做半音（或全音）级进，改变色彩。",
    explain: "在单一和弦背景上让一个声部二度级进，爵士叫线性套路（Line cliché），以半音为主时又叫半音滑动，是典型的线性、非功能和声。电影《007》主题在 Em 上让五音 B–C–C♯–C 滑动，营造标志性的悬疑感。\n\n滑动的声部可以并入和弦（Em → Em♯5 → Em6），也可以看作独立的旋律线条，甚至与和弦无关。放在低音上更有趣（C → C/B → C/B♭ → C/A），现代常写成斜线和弦。它能在长时间持续的和弦里增加新鲜感，也能顺滑地引入或解决增三、减七、增六等变化和弦。",
    analogy: "像霓虹灯招牌只有一根灯管在慢慢变色：整体图案不变，气氛却一点点变了。",
    book_example: { what: "谱例 8.15《詹姆斯·邦德主题》、谱例 8.16 低音半音滑动、谱例 8.19 拉赫玛尼诺夫第二钢琴协奏曲开头。", point: "半音在声部上最近，在调性上却很远。" },
    misconception: "滑动不必「解释成和弦」：它可以只是一条独立的线。" },
  { id: "vagrant_chord", name_zh: "游移和弦：增三、减七、属七", name_en: "Vagrant chords", icon: "🐒", section_id: "s5", group: "voice",
    plain: "调性归属模糊、能通过半音迅速连接很远的和弦与调的枢纽和弦。",
    explain: "增三和弦把八度三等分，C+ = E+ = A♭+；它的任一音降半音（或任两音升半音）得大三和弦，任一音升半音（或任两音降半音）得小三和弦，一共连接 12 个三和弦。四个增三和弦把四组六和弦循环串成「方块之舞」（Cube dance）。\n\n减七和弦把八度四等分，B°7 = D°7 = F°7 = A♭°7；任一音降半音得属七，任一音升半音得半减七。减七、属七、半减七、小七构成七和弦「输电塔」（Power towers）。加上导七、趋近、共同音减七等用法，任何和弦都能经由任何减七和弦连到任何和弦。属七和弦则是体系内的「正规军」：可作属、副属、重属，等音于德国增六，又与相距三全音的属七互替，前后几乎可接任何和弦。",
    analogy: "增三、减七像孙悟空：神通广大但属于「编外人员」；属七像二郎神：本领同样高超，还在体制内有正统编制。",
    book_example: { what: "图 8.19–8.21 方块之舞；图 8.34–8.39 减七与输电塔；图 8.40–8.41 G7 与 24 个和弦。", point: "三种游移和弦是远距离转调和意外进行的枢纽。" },
    misconception: "属七和弦不再「必须解决」：现代音乐里它常作主和弦，甚至结束全曲。" },
  { id: "blackadder", name_zh: "Blackadder 和弦与增六的双重性", name_en: "Blackadder chord", icon: "🎌", section_id: "s7", group: "voice",
    plain: "低音上方叠一个增三和弦（如 C 上的 F♯–B♭–D），日本流行乐里常见，可看作「日本增六」。",
    explain: "2017 年 Joshua Taipale 研究日本流行音乐时提出这个名称，记作 Cblk，在日本称「分数 aug」或「田中 aug」。典型用法是 C 大调里 C+/G♭ → F：低音 G–G♭–F 半音下行，高音 G–G♯–A 半音上行，外声部反向扩张；内声部 E 与低音 G♭ 构成增六度，向外解决到 F 的八度——又一次增六和弦的模式，所以有人叫它「日本增六」Jp+6。功能上可理解为 V+/IV 加降五音，也可逆向使用（A♭+/F♯ → G）。\n\n它其实并不新：柴可夫斯基、拉赫玛尼诺夫、斯克里亚宾、普罗科菲耶夫、瞿希贤的作品里都有类似结构。由此推广：小七度与增六度等音，所以任何含小七度/大二度的和弦都能等音成一个增六和弦使用，五声音阶 C–D–E–G–A 中就有三对，原书戏称「中国增六」。",
    analogy: "像一把万能钥匙：上面那组增三和弦本来就能开很多锁，下面再配一个低音，就决定这次开哪一扇门。",
    book_example: { what: "谱例 8.25 C 大调典型用法：C/G → C+/G♭ → F(m)；G → C+/G♭ → F；F → A♭+/F♯ → G。", point: "外声部反向半音运动，是它最直观的理解。" },
    misconception: "不必执着于「它到底叫什么」：同一结构可以有功能、线性、等音多种解释，目的是多想到几种用法。" },
  { id: "inversion_dualism", name_zh: "平移、倒影与二元性", name_en: "Transposition, inversion, dualism", icon: "🪞", section_id: "s8", group: "mirror",
    plain: "平移 Tx 让和弦整体移动 x 个半音；倒影 Ix 以某个音为轴上下翻转，大三和弦变成小三和弦。",
    explain: "严格的平行和声在网格上就是平移：T7(C) = G；因为八度循环，Tx = T−(12−x)。移调是整段音乐的平移；属七和弦连锁是 T5/T−7 交替的锯齿形平移，也就是模进。\n\n以 C 为轴倒影 C 和弦：上方大三度 E 变成下方大三度 A♭，上方纯五度 G 变成下方纯五度 F，于是 C → Fm；C7 → Dø。大三与小三互为镜像，这叫二元性（里曼理论的出发点），其物理基础被认为是沉音列——泛音列以基音为轴的倒影，第 3、4、5 沉音构成小三和弦。在网格上，倒影是以一点为中心的对称：N、S、Y 三种对角关系都是对称变换。音程结构上下对称的和弦（增三、减七、巴托克的 E–G–C–E♭）倒影后性质不变。只翻转度数、按调内音阶调整性质的叫守调倒影。",
    analogy: "平移像把整张贴纸挪个位置；倒影像照镜子——左手变右手，大三变小三。",
    book_example: { what: "图 8.47 C、C7 以 C 为轴的倒影；谱例 8.30 C 的泛音列与沉音列。", point: "大小三和弦是一对镜像。" },
    misconception: "沉音列并不自然产生，只能人工制造；这是它常被诟病的地方，但不妨碍镜像思维的价值。" },
  { id: "negative_harmony", name_zh: "负极和声", name_en: "Negative harmony", icon: "🧲", section_id: "s8", group: "mirror",
    plain: "把倒影轴放在主音和属音正中间（C 大调在 E 与 E♭ 之间），整首和声做镜像，主和弦 C 变成 Cm。",
    explain: "严格镜像时，选恰当的轴能让和弦的根音、冠音互换而位置不变：C 原位翻转成 Cm。负极和声（Negative harmony）就是把调的镜像轴放在主、属音正中，C ↔ G、D ↔ F、E ↔ E♭、A ↔ B♭、B ↔ A♭。于是 G → Fm、Dm → B♭、F → Gm……虽然都是 c 小调和弦，但与同名大小调交替的对应关系完全颠倒。\n\n七和弦为了保持音级对应，要拆成「三和弦 + 七音」分别镜像：G7 → Fm + D = Fm6（与 Dø 等音但根音不同），整组变成各种加六和弦。转位问题尚无定论（严格镜像会把最高音翻到低音）。它的思想源自巴洛克的倒影与十九世纪的二元论，Ernst Levy 1941 年提出，近年因 Jacob Collier 而走红。浪漫派常见的 Fm–C、Dø/F–C 终止，也可理解为 G、G7 的负极。",
    analogy: "像照片的负片：明暗颠倒、轮廓还在。正负片可以叠印，出来的效果既熟悉又陌生。",
    book_example: { what: "谱例 8.33–8.37：C 大调三和弦与七和弦的负极、卡农进行与《生日快乐》的正、小调、负极三个版本。", point: "负极不是简单地换成同名小调。" },
    misconception: "负极和声不是新发明，也不是万能钥匙；把七和弦拆成三和弦加七音的处理多少有些刻意。" },
  { id: "modern_cadence", name_zh: "终止式的发展", name_en: "Evolving cadences", icon: "🏁", section_id: "s9", group: "mirror",
    plain: "浪漫派到现代，终止不再只靠属—主：拖延、替换、三度/二度进行、不完整的主和弦都可以。",
    explain: "第一类是拉长终止过程：肖邦夜曲用 V7/N–N6 阻碍、在 V7 上插入大段华彩、反复用阻碍进行「调戏」听众。第二类用变化思路替换传统和弦：用 v 代替 V、iv 代替 IV（iv 也可看作 V 的负极），甚至结束在另一个调。更重要的是以三度、二度进行代替四五度：♭III–I（德彪西《月光》）、♭VI、vi7–iii7–ii7–I（拉威尔）、♭II7–I，或用轴心思想造出三全音终止（斯克里亚宾）。\n\n最后的主和弦也可以是大七、属七、属九、挂留、附加音和弦。属七和弦本身也从「必须解决」变得几乎协和稳定，爵士和流行常用它收尾。终止的完满度、清晰度普遍下降，它也不再是确立调性的唯一手段。",
    analogy: "以前的电影都有「大团圆」字幕；现代电影常以开放式结局收尾——故事讲完了，但余味留在你心里。",
    book_example: { what: "肖邦夜曲 Op.9 三首与 Op.48 No.1、勃拉姆斯第三交响曲、德彪西《月光》、拉威尔《小奏鸣曲》、斯克里亚宾前奏曲。", point: "终止的力度与色彩成了可以调节的参数。" },
    misconception: "「不完满」不是缺陷：它是作曲家刻意选择的表情。" },
];

export const relations = [
  { from: "plr", to: "step_distance", label: "叠加成多步" },
  { from: "plr", to: "diagonal", label: "三步特例" },
  { from: "step_distance", to: "chromatic_mediant", label: "两步、一个共同音" },
  { from: "plr", to: "hexatonic_cycle", label: "P、L 交替" },
  { from: "plr", to: "axis_system", label: "P、R 交替" },
  { from: "chromatic_mediant", to: "hexatonic_cycle", label: "三度平移" },
  { from: "hexatonic_cycle", to: "axis_system", label: "C–A♭–E–C 功能化" },
  { from: "chord_family", to: "line_cliche", label: "半音升降" },
  { from: "chord_family", to: "vagrant_chord", label: "枢纽" },
  { from: "vagrant_chord", to: "hexatonic_cycle", label: "方块之舞" },
  { from: "vagrant_chord", to: "blackadder", label: "上方增三" },
  { from: "axis_system", to: "vagrant_chord", label: "三全音替换" },
  { from: "diagonal", to: "inversion_dualism", label: "也是对称" },
  { from: "inversion_dualism", to: "negative_harmony", label: "轴在主属正中" },
  { from: "negative_harmony", to: "modern_cadence", label: "iv–I = V 的负极" },
  { from: "chromatic_mediant", to: "modern_cadence", label: "♭VI–I、♭III–I" },
];

const sections = [
  { id: "s1", no: "8-1", title_zh: "三元变换与和弦的距离", title_en: "Triadic transformations", gist: "P、L、R 让三角形翻到相邻格；步数衡量远近。",
    summary: "新黎曼理论用变换描述和弦接近度。P、R、L 三种基本变换保留两个音、一个音二度移动，在网格上是沿三条边的翻转，属弱进行。五度关系要两步（RL、LR），二度和三全音关系要三步；任意两个三和弦最多五步，步数奇偶决定性质是否改变。勋伯格另从根音运动分升进行、降进行与超强进行。三步中的 S、N、Y 构成对角关系，另有 P 与 S 复合的重同名关系。",
    concept_ids: ["plr", "step_distance", "diagonal"] },
  { id: "s2", no: "8-1", title_zh: "中音关系", title_en: "Mediant relations", gist: "自然中音、变化中音、二重变化中音。",
    summary: "根音相距三度为中音关系。一步 R、L 得自然中音（两个共同音）；两步得变化中音（一个共同音，性质不变、整体平移三度）；PRP、PLP 三步得二重变化中音（没有共同音）。浪漫派用它代替刚硬的五度进行，形成 ♭VI–I、III–I 等柔和终止，有人提出独立的中音功能。例：柴可夫斯基《无词歌》、《最终幻想 7》背景音乐。",
    concept_ids: ["chromatic_mediant"] },
  { id: "s3", no: "8-1", title_zh: "三度循环与巴托克轴心", title_en: "Cycles and the axis system", gist: "PL 交替六和弦一圈，PR 交替八和弦一圈。",
    summary: "PL 交替形成大三度方向的六和弦循环（东南西北四组），两极为 H 关系；它是勃拉姆斯、李斯特、瓦格纳、柴可夫斯基常用的框架，也是柯川《Giant Steps》的骨架。PR 交替形成小三度方向的八和弦循环，即同名、关系大小调的八个主和弦；Lendvai 的轴心体系把它们归为同一功能，T、S、D 三条十字轴把 24 个和弦分成三组，三全音两极可以互替，C–F–G–C 可换成 C–A♭–E–C。",
    concept_ids: ["hexatonic_cycle", "axis_system"] },
  { id: "s4", no: "8-2", title_zh: "同族三和弦、升降变换与半音滑动", title_en: "Chord families; semitone shifts; line cliché", gist: "一个根音上 2×3 = 6 种三和弦；每个音都能升降。",
    summary: "根音不变时三音两种、五音三种，同族三和弦六种（含 C♭5 与 Cm♯5 两个等音和弦），挂留和弦关系密切。五音、三音、根音各自升降，形成三维点阵。由此得到线性套路与半音滑动：《007》主题的 Em 上 B–C–C♯–C、低音的半音滑动（斜线和弦）、格什温前奏曲的多声部滑动。",
    concept_ids: ["chord_family", "line_cliche"] },
  { id: "s5", no: "8-2", title_zh: "增三和弦的游移与和弦空间", title_en: "Augmented triads; chord spaces", gist: "增三连接 12 个三和弦；四个增三串起「方块之舞」。",
    summary: "增三和弦对称、彼此等音，调性归属模糊，是第一种游移和弦：一音降半音或两音升半音得大三，一音升半音或两音降半音得小三，四个增三把四组六和弦循环连成方块之舞。之后介绍音高、和弦、调性三种空间：勋伯格的正方网格与三角网格的对应、同构键盘的优点、音高螺旋与 Elaine Chew 的螺旋序列模型。",
    concept_ids: ["vagrant_chord"] },
  { id: "s6", no: "8-3", title_zh: "七和弦的变换与游移和弦", title_en: "Seventh-chord transformations", gist: "同族 18 种七和弦；减七、属七的枢纽作用。",
    summary: "七音有大七、小七、减七三种，同族七和弦 2×3×3 = 18 种，按基础三和弦分六组，组内是七音的升降（C → CΔ → C7 → C6 → C♭6）。减七和弦四等分八度，是第二种游移和弦：一音降半音得属七、一音升半音得半减七，组成「输电塔」，任何和弦都能经减七连到任何和弦（贝多芬《热情》）。属七和弦是第三种游移和弦，兼具属与属前功能，几乎可接任何和弦。",
    concept_ids: ["chord_family", "vagrant_chord"] },
  { id: "s7", no: "8-3", title_zh: "增六与 Blackadder 和弦", title_en: "Aug-6th and the Blackadder chord", gist: "C+/G♭ → F：外声部反向半音的「日本增六」。",
    summary: "从非功能角度看，增六和弦是两个声部从两侧半音趋近属音的趋近和弦。Blackadder 和弦（Cblk = C 上叠 F♯–B♭–D）在日本流行乐常见，典型为 C+/G♭ → F：低音半音下行、高音半音上行，内声部构成增六度。它可逆向用作 A♭+/F♯ → G，也在柴可夫斯基、拉赫玛尼诺夫等人的作品里出现过。推广：含小七度的和弦都可等音为增六和弦。",
    concept_ids: ["blackadder"] },
  { id: "s8", no: "8-4", title_zh: "平移、倒影与负极和声", title_en: "Translation, inversion, negative harmony", gist: "Tx 平移、Ix 倒影；以主属正中为轴的镜像就是负极和声。",
    summary: "平行和声与移调是平移 Tx；属七连锁的锯齿进行是平移与模进。倒影以某音为轴翻转：Ic(C) = Fm，大小三和弦互为镜像（二元性），基础是沉音列。网格上倒影是中心对称；对称和弦倒影后不变。守调倒影只翻转度数。负极和声把轴放在主、属音正中：C → Cm、G → Fm、G7 → Fm6，可用于卡农进行、《生日快乐》、离调五度圈等，并存在转位问题。",
    concept_ids: ["inversion_dualism", "negative_harmony"] },
  { id: "s9", no: "8-4", title_zh: "终止式的发展", title_en: "Evolution of the cadence", gist: "拖延、替换、三度与二度进行、不完整的主和弦。",
    summary: "浪漫派起终止式不断变化：用阻碍、华彩、离调拉长终止（肖邦夜曲、理查·施特劳斯）；用 v、iv、负极和弦替换（萨蒂、肖邦 Op.32/2）；用 ♭III–I、♭VI、vi7–iii7–ii7–I、♭II7–I、三全音进行代替四五度（勃拉姆斯、德彪西、拉威尔、斯克里亚宾）；主和弦可带七音、九音、挂留。终止的完满度下降，没有什么和弦必须解决。",
    concept_ids: ["modern_cadence"] },
];

// 负极和声：C 大调七和弦（原书谱例 8.34）
const NEG7 = [
  ["CΔ", "C4 E4 G4 B4", "Cm♭6", "C4 Eb4 G4 Ab4"], ["Dm7", "D4 F4 A4 C5", "B♭6", "Bb3 D4 F4 G4"], ["Em7", "E4 G4 B4 D5", "A♭6", "Ab3 C4 Eb4 F4"],
  ["FΔ", "F4 A4 C5 E5", "Gm♭6", "G3 Bb3 D4 Eb4"], ["G7", "G3 B3 D4 F4", "Fm6", "F3 Ab3 C4 D4"], ["Am7", "A3 C4 E4 G4", "E♭6", "Eb4 G4 Bb4 C5"],
  ["Bø", "B3 D4 F4 A4", "D°♭6", "D4 F4 Ab4 Bb4"],
];
const HB_MAJ = `"C"G/G/ | "Am"A "Em"G "F#dim7"c | "G"B2 "C"G/G/ | "F"A "G"G "G7"d | "C"c2 "C"G/G/ | "Em"g "Am"e "F#dim7"c | "G"B "F"!fermata!A "Fm"f/f/ | "E7"e "D7"c "G7"d | "C"c2 |]`;
const HB_MIN = `"Cm"G/G/ | "Ab"_A "Eb"G "F#dim7"c | "G"B2 "Cm"G/G/ | "Fm"_A "Gm"G "G7"d | "Cm"c2 "Cm"G/G/ | "Eb"g "Ab"_e "F#dim7"c | "Gm"_B "Fm"!fermata!_A "F"f/f/ | "Eb7"_e "D7"c "G7"d | "C"c2 |]`;
const HB_NEG = `"Cm"c/c/ | "Eb"_B "Ab"c "Gdim7"G | "Fm"_A2 "Cm"c/c/ | "Gm"_B "Fm"c "Fm6"F | "Cm"G2 "Cm"c/c/ | "Ab"C "Eb"_E "Gdim7"G | "Fm"_A "Gm"!fermata!_B "G"D/D/ | "Abm6"_E "Bbm6"G "Fm6"F | "Cm"G2 |]`;

export default function Chapter() {
  return <ChapterPage meta={meta} groups={groups} concepts={concepts} relations={relations}>
    <SoundBar />

    <Block id="hook" toc="开场">
      <Hook title="先听：每次只动一个音，六步回到家"><p>
        点 <Play seq={["C4 E4 G4", "C4 Eb4 G4", "C4 Eb4 Ab4", "B3 D#4 G#4", "B3 E4 G#4", "B3 E4 G4", "C4 E4 G4"]} gap={0.85}>C → Cm → A♭ → G♯m → E → Em → C</Play>。
        每一步只有一个音挪了半音，另外两个音纹丝不动，所以声部滑得像丝绸；可六个和弦的颜色变化之大，几乎跨遍了半个五度圈——A♭ 和 E 本来是「八竿子打不着」的两个调。
        按调和功能很难说清这条路线，但在网格图上它一目了然：一个三角形沿着边，<b>翻过去、再翻过去</b>，绕着一个点转了一圈。
        这一章就从「翻三角形」讲起：和弦之间的远近、浪漫派的中音进行、柯川的《Giant Steps》、巴托克的轴心、减七和弦的七十二变，直到近年流行的负极和声。</p>
      </Hook>
    </Block>

    <Block id="secs" toc="小节" kicker="原书结构" title="本章九个知识单元" lead="原书 8-1 至 8-4 四节，这里按主题拆成九张卡片。">
      <SectionCards sections={sections} />
    </Block>

    <Block id="flow" toc="主线" kicker="论证主线" title="从「翻三角形」到「照镜子」">
      <ArgumentFlow steps={[
        { claim: "和弦关系可以看作对和弦的操作", detail: "P、L、R 三种变换各保留两个音、移动一个音，在网格上就是三角形沿三条边翻转。" },
        { claim: "翻几次，就有多远", detail: "五度两步、二度与三全音三步，最多五步；步数少则共同音多、进行弱，步数多则换景彻底。" },
        { claim: "三步里藏着对角与中音关系", detail: "S、N、Y 只有一个共同音却声部平稳；变化中音让和弦整体平移三度，浪漫派用它软化终止。" },
        { claim: "交替变换会绕圈", detail: "PL 交替绕大三度六和弦一圈，PR 交替绕小三度八和弦一圈——后者催生了巴托克轴心。" },
        { claim: "换个角度：每个和弦音都能单独升降", detail: "同族三和弦、七和弦在半音升降中互相转化，形成三维、四维网络，也带来半音滑动。" },
        { claim: "对称的和弦是枢纽", detail: "增三、减七把八度等分，属七处于体系中心，三者都能把很远的和弦和调连起来。" },
        { claim: "再加两种几何操作：平移与倒影", detail: "平移是平行和声与模进；倒影让大三变小三，以主属正中为轴就是负极和声。" },
        { claim: "终止不再只有属—主", detail: "三度、二度、三全音、负极、带色彩音的主和弦——终止的完满度成为可调的表情参数。" },
      ]} />
    </Block>

    {/* ───────── 8-1 三元变换 ───────── */}
    <Block id="plr" toc="P / L / R" kicker="8-1 · 三元变换" title="三种翻转：P、L、R"
      lead="先听 C 分别变成 Cm、Em、Am，再听 Am 变成 A、F、C。每一对里都只有一个音在动（谱上红色）。">
      <Narrate />
      <Score abc={'"C"[CGe]2 "Cm"[CG_e]2 | "C"[CGe]2 "Am/C"[CAe]2 | "C"[CGe]2 "Em/B"[B,Ge]2 || "Am"[A,Ec]2 "A"[A,E^c]2 | "Am"[A,Ec]2 "C/G"[G,Ec]2 | "Am"[A,Ec]2 "F/A"[A,Fc]2 |]'}
        tempo={80} caption="谱例 8.1：C 与 Am 的三元变换，依次为 P、R、L（前三小节从 C 出发，后三小节从 Am 出发）。" />
      <p>上一章的声部大多走得很平稳：和弦越接近，连接越顺。可是「接近」怎么衡量？由德国理论家胡戈·里曼的研究发展而来的<b>新黎曼理论</b>（Neo-Riemannian theory）
        提出了<b>和声接近度</b>的概念，并用<b>变换</b>（Transformation）来描述相近和弦之间的关系。所谓变换，就是对和弦的一种操作。三和弦最基本的变换有三种，合称<C id="plr">三元变换</C>：</p>
      <ul>
        <li><b>P（Parallel，平行）</b>：换成同名和弦。大三和弦的三音降半音、小三和弦的三音升半音：<Play seq={["C", "Cm"]} gap={0.9}>P(C) = Cm</Play>、<Play seq={["Am", "A"]} gap={0.9}>P(Am) = A</Play>。网格上是上下翻转。</li>
        <li><b>R（Relative，关系）</b>：换成关系和弦。大三和弦的五音升全音，变成它的下中音和弦；小三和弦的根音降全音，变成它的中音和弦：<Play seq={["C", "Am"]} gap={0.9}>R(C) = Am</Play>、<Play seq={["Am", "C"]} gap={0.9}>R(Am) = C</Play>。</li>
        <li><b>L（Leading tone，导音）</b>：通过导音关系转换。大三和弦的根音降半音，变成它的中音和弦；小三和弦的五音升半音，变成它的下中音和弦：<Play seq={["C", "Em"]} gap={0.9}>L(C) = Em</Play>、<Play seq={["Am", "F"]} gap={0.9}>L(Am) = F</Play>。</li>
      </ul>
      <Tonnetz cols={9} rows={4} center="C" highlight={["C", "Cm", "Am", "Em"]} unit={58} caption="图 8.1 左：C（红）与它的 P、R、L 三个邻居（蓝）。三个蓝三角各贴着红三角的一条边。" />
      <p>你也许会说：这不就是前面讲过的 I–i、I–vi、I–iii 吗？音是一样的，思路却不同。变换只针对和弦本身，<b>不问它属于哪个调、发挥什么功能</b>，是一种非功能思路，
        能帮我们跳出调性功能的框框，看到和弦之间更广泛的联系。</p>
      <Callout tone="key" title="三种基本变换的共同点">
        都把和弦移到网格上相邻的一格；三个音保留两个，只有一个音二度移动，所以连接平滑、音响相似、接近度最高——进行力度也因此较弱，可归为<strong>弱进行</strong>；
        而且一定改变和弦性质：大三变小三，或小三变大三。
      </Callout>
    </Block>

    <Block id="flipper" toc="PLR 翻转器" kicker="8-1 · 本章专属图解" title="PLR 翻转器：在网格上翻三角形"
      lead="点 P / L / R，看三角形翻过哪条边、哪两个音（粗圈）不动、哪个音（金色）走了半音还是全音，同时听前后两个和弦。再试试复合变换和三个自动演示。">
      <Narrate />
      <PLRFlipper />
      <p>几个值得动手验证的事实：</p>
      <ul>
        <li>每个基本变换都是自己的「逆」：连按两次 P（或 L、R）回到原地。</li>
        <li>从 C 出发按 L 再按 R，到 G；先 R 再 L，到 F。下属、属和弦都在两步之外。</li>
        <li>按 S、N、Y：三角形走了三步，落在与原三角形「顶角相对」的位置，却仍有一个共同音。</li>
        <li>按 H：三步之后没有任何共同音，却仍然只是三个音各走半音——这就是六和弦循环的对极。</li>
        <li>三个自动演示分别绕大三度、小三度和五度方向转圈。数一数：分别几步回到起点？</li>
      </ul>
    </Block>

    <Block id="steps" toc="多步变换与强弱" kicker="8-1 · 多步变换与进行的强弱" title="翻几次，就有多远"
      lead="下面两组进行分别需要两步和三步变换。对比听感：步数越多，换景越彻底。">
      <Narrate />
      <Tabs tabs={[
        { label: "两步：四/五度", content: <Progression key="p2" title="谱例 8.2 上：两步变换" chords={["C", "G/B", "C", "F/C", "Am", "Em/G", "Am", "Dm/A"]}
          roman={["C", "RL", "C", "LR", "Am", "LR", "Am", "RL"]} bpm={88} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }}
          caption="C 到 G 是先 L 再 R（从右往左记为 RL），C 到 F 是 LR。根音相距五度，只剩一个共同音：相对的强进行。" /> },
        { label: "三步：二度、三全音", content: <Progression key="p3" title="谱例 8.2 下：三步变换" chords={["C", "Dm", "C", "Bm", "C", "F#m/C#", "Am", "Bb", "Am", "G", "Am", "Eb/G"]}
          roman={["C", "RLR", "C", "LRL", "C", "RPR", "Am", "LRL", "Am", "RLR", "Am", "RPR"]} bpm={88} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }}
          caption="二度关系（C–Dm、C–Bm、Am–B♭、Am–G）和三全音关系（C–F♯m、Am–E♭）完全没有共同音，音响变化明显，属于更强的进行。" /> },
      ]} />
      <p>大小三和弦之间更远的关系，都能由三元变换叠加而来，像在棋盘上走好几格。由此，<C id="step_distance">变换步数</C>就成了和弦接近度的量尺：
        步数越少，接近度越大、音响变化越小、进行越弱。由于网格上的音与和弦首尾循环，许多变换可以等价成更短的路线，<b>任意两个三和弦之间最多只要五步</b>。
        还有一个规律：<b>步数为奇数，和弦性质改变；步数为偶数，性质不变</b>（原书图 8.4 画出了 C、Am 到所有和弦的步数）。</p>
      <h4>勋伯格：看根音怎么走</h4>
      <p>以上的强弱看的是共同音多少、变换距离远近。勋伯格另辟一路，考虑和弦音地位的变化与新鲜感，按<b>根音</b>（不是低音）的运动划分：</p>
      <ul>
        <li><b>升进行 / 强进行</b>：根音上四度（下五度）或下三度。前一个和弦的根音降格为新和弦的五音或三音，被新根音「统治」，产生新鲜与转变感；下五度又比下三度更强。</li>
        <li><b>降进行 / 弱进行</b>：根音下四度（上五度）或上三度。原来次要的五音或三音升为根音，听来不新鲜，勋伯格形容为「衰退」「泄气」；上三度共同音多，更像前一个和弦的延伸。</li>
        <li><b>超强进行 / 超越进行</b>：根音二度上下行。没有共同音，每个音都走到新音，新鲜而有跳跃感。</li>
      </ul>
      <Tabs tabs={[
        { label: "升进行", content: <Progression key="s1" chords={["G", "C", "Am", "Dm", "C/E", "F", "C", "Am", "Am", "F", "F/A", "Dm/F"]} keyName="C" bpm={88} beats={2}
          caption="谱例 8.3 第一行：根音下五度（上四度）与下三度。" /> },
        { label: "降进行", content: <Progression key="s2" chords={["C", "G", "Dm", "Am/C", "F", "C", "C", "Em", "Dm", "F", "Em/G", "G"]} keyName="C" bpm={88} beats={2}
          caption="谱例 8.3 第二行：根音下四度（上五度）与上三度。" /> },
        { label: "超强进行", content: <Progression key="s3" chords={["C", "Dm", "F", "G", "G/D", "Am/C", "F", "Em", "Em", "Dm/F", "Dm", "C/E"]} keyName="C" bpm={88} beats={2}
          caption="谱例 8.3 第三行：根音二度上行与下行。" /> },
      ]} />
      <Callout tone="info" title="一家之言">
        基于步数的强弱与勋伯格的强弱并不完全一致（比如五度上下行在步数上一样，在勋伯格那里却一强一弱）。这些划分都是人为的主观归类，理解思想即可，
        不必死抠概念；重点是音响效果与实践中怎么用。
      </Callout>
    </Block>

    <Block id="diag" toc="对角关系" kicker="8-1 · 对角关系" title="S、N、Y：隔着路口的对角邻居"
      lead="三步变换中，有三种在网格上与原三角形顶角相对。它们只有一个共同音，另外两个音却都只走二度。">
      <Narrate />
      <Tonnetz cols={9} rows={4} center="C" highlight={["C", "C#m", "Fm", "Gm"]} unit={58} caption="图 8.5 左：C 的三个对角和弦 C♯m（S）、Fm（N）、Gm（Y），各与 C 共享一个顶点。" />
      <ul>
        <li><C id="diagonal">S（Slide）</C>：就是前面说过的<b>同中音</b>关系——三音不动，根音、五音一起移半音：<Play seq={["C", "C#m"]} gap={0.9}>S(C) = C♯m</Play>、<Play seq={["Am", "Ab"]} gap={0.9}>S(Am) = A♭</Play>。等于 RPL 或 LPR 三步。</li>
        <li><b>N（Nebenverwandt）</b>：大三和弦的小下属、小三和弦的大属：<Play seq={["C", "Fm"]} gap={0.9}>N(C) = Fm</Play>、<Play seq={["Am", "E"]} gap={0.9}>N(Am) = E</Play>。名称直接借自德语，等于 PLR 或 RLP。</li>
        <li><b>Y</b>（原书暂称，目前无公认术语）：大三和弦的小属、小三和弦的大下属：<Play seq={["C", "Gm"]} gap={0.9}>Y(C) = Gm</Play>、<Play seq={["Am", "D"]} gap={0.9}>Y(Am) = D</Play>。等于 PRL 或 LRP。</li>
      </ul>
      <Progression title="谱例 8.4：C 与 Am 的对角变换" chords={["C/E", "C#m/E", "C", "Fm/C", "C/G", "Gm", "Am/C", "Ab/C", "Am/E", "E", "Am", "D/A"]}
        roman={["C", "S", "C", "N", "C", "Y", "Am", "S", "Am", "N", "Am", "Y"]} bpm={84} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }}
        caption="这些进行以前都见过：C–Fm 是借用 iv，Am–E 是小调的大属……想一想按借用、离调又该怎样解释。" />
      <p><b>重同名关系</b>（童忠良等提出）：同名与同中音关系的连用，即 P 与 S 的复合。C 的同名是 Cm，Cm 的同中音是 B；C 的同中音是 C♯m，C♯m 的同名是 C♯。
        于是 <Play seq={["C", "B"]} gap={0.9}>C–B</Play>、<Play seq={["C", "C#"]} gap={0.9}>C–C♯</Play> 构成重同名关系：性质不变、整体平移半音。
        （练习：用上面的翻转器验证，并找出 Am 的重同名和弦——答案是 <Play seq={["Am", "G#m"]} gap={0.9}>G♯m</Play> 与 <Play seq={["Am", "Bbm"]} gap={0.9}>B♭m</Play>。）</p>
    </Block>

    {/* ───────── 8-1 中音关系 ───────── */}
    <Block id="mediant" toc="中音关系" kicker="8-1 · 中音关系" title="自然中音、变化中音、二重变化中音"
      lead="同样是根音相距三度，共同音从两个减到一个、再到零，颜色一次比一次鲜明。">
      <Narrate />
      <p>两个和弦根音相距大、小三度，就是<b>中音关系</b>（Median relationship，M）。一步 R、L 得到的中音、下中音和弦与原和弦属于同一个自然大调或小调，
        叫<b>自然中音</b>（顺阶中音，DM）：有两个共同音，进行相当平稳，力度通常弱于四五度和二度进行，例如 <Play seq={["C", "Am"]} gap={0.9}>C–Am</Play>、<Play seq={["C", "Em"]} gap={0.9}>C–Em</Play>。</p>
      <p>想增强三度进行的新鲜感，可以引入变化音，得到<C id="chromatic_mediant">变化中音</C>（CM）和弦。大、小三和弦各有四个，根音仍相距三度，但只剩一个共同音，需要两步变换
        （中音/下中音和弦的同名和弦，或同名和弦的中音/下中音）：C 的变化中音是 <Play seq={["C", "A"]} gap={0.9}>A</Play>、<Play seq={["C", "E"]} gap={0.9}>E</Play>、
        <Play seq={["C", "Ab"]} gap={0.9}>A♭</Play>、<Play seq={["C", "Eb"]} gap={0.9}>E♭</Play>；Am 的是 <Play seq={["Am", "F#m"]} gap={0.9}>F♯m</Play>、<Play seq={["Am", "C#m"]} gap={0.9}>C♯m</Play>、
        <Play seq={["Am", "Fm"]} gap={0.9}>Fm</Play>、<Play seq={["Am", "Cm"]} gap={0.9}>Cm</Play>。</p>
      <Tonnetz cols={9} rows={4} center="C" highlight={["C", "A", "E", "Ab", "Eb"]} unit={58} caption="图 8.6 左：C 与它的四个变化中音和弦，性质都不变（全是红色），在网格上沿大、小三度方向平移。" />
      <p>这些和弦以前都出现过（副调和弦、借用和弦），但作为变化中音，它们常伴随在临时主和弦前后，表现为<b>性质不变、整体做大三度或小三度平移</b>：</p>
      <Tabs tabs={[
        { label: "C–A–Dm 与 C–A–C", content: <Progression key="m1" chords={["C", "A", "Dm", "C", "A", "C"]} roman={["I", "V/ii", "ii", "I", "VI", "I"]} bpm={80} beats={2}
          caption="谱例 8.5 左：同一个 A 和弦，接 Dm 时是副属和弦，回到 C 时就是变化中音 VI。" /> },
        { label: "C–E–Am 与 C–E–C", content: <Progression key="m2" chords={["C", "E", "Am", "C", "E", "C"]} roman={["I", "V/vi", "vi", "I", "III", "I"]} bpm={80} beats={2}
          caption="谱例 8.5 右：E 接 Am 是 V/vi；E 直接回到 C，就是变化中音 III。" /> },
      ]} />
      <p>再远一步是<b>二重变化中音</b>（Double chromatic mediant）：根音还相距三度，但完全没有共同音，需要 PRP 或 PLP 三步，调号可差六七个升降号：
        <Play seq={["C", "Ebm"]} gap={0.9}>C–E♭m</Play>（PRP）、<Play seq={["C", "Abm"]} gap={0.9}>C–A♭m</Play>（PLP）、<Play seq={["Am", "F#"]} gap={0.9}>Am–F♯</Play>（PRP）、<Play seq={["Am", "C#"]} gap={0.9}>Am–C♯</Play>（PLP）。两个 P 中间只夹一个 R 或 L，网格上距离不算太远，听起来却相当遥远。</p>
      <h4>浪漫派的中音和弦</h4>
      <p>V–I、IV–I 这类五度强进行简单明快、力度刚硬，不利于细腻的情感与某些气氛。浪漫主义时期，柔和多变的中音和弦越来越受欢迎：润色和声、阻碍进行、离调转调，
        尤其在终止里构成 III–I、♭VI–I、♭III–I，削弱力度、让调感朦胧。有人因此提出把<b>中音功能</b>（M）独立为一个功能组。</p>
      <Progression title="谱例 8.6：柴可夫斯基《无词歌》Op.2 No.3（1867），第 43–50 小节和声" chords={["F", "F", "Db", "F", "F", "Db", "F", "Edim7", "F7", "Bb", "Gø", "C7", "F", "Dm", "F"]}
        keyName="F" bpm={92} beats={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3]} texture="pop"
        caption="F 的持续低音上，♭VI（D♭）两次阻碍进行，推迟终止；最后不用 V–I，而是 vi–I 的三度进行收束。与传统 V–I 比一比听感。" />
      <Callout tone="info" title="练习：《最终幻想 7》的《不安的心》">
        原书用植松伸夫为游戏《最终幻想 7》写的背景音乐《不安な心》（1997）的简缩谱做练习：写出和弦记号、找出哪些和弦构成中音关系、分析和弦外音、判断整体调性。
        （有版权的作品，本页不转写。）这些变换关系还可推广到调之间：除了关系调、同名调，还有中音调、同中音调、重同名调等，进阶篇第 11 章再谈。
      </Callout>
    </Block>

    {/* ───────── 8-1 三度循环 ───────── */}
    <Block id="hexa" toc="大三度循环" kicker="8-1 · 大三度循环" title="PL 交替：六和弦一圈"
      lead="从 C 出发交替做 P、L，第六步回到 C。根音是 C、A♭、E——第 1 章的大三度循环。">
      <Narrate />
      <Score abc={'"C"[Ge]2 "Cm"[G_e]2 | "Ab/C"[_A_e]2 "G#m/B"[^G^d]2 | "E/B"[^Ge]2 "Em"[=Ge]2 | "C"[Gc]4 |]'} bass={'C,2 C,2 | C,2 B,,2 | B,,2 B,,2 | C,4 |]'}
        meter="4/4" tempo={72} caption="谱例 8.8：北方循环 C–Cm–A♭–G♯m–E–Em–C。每一步只有一个声部移动半音。" />
      <p>更神奇的是：从任何大小三和弦出发，交替进行 P、L 变换，竟会形成六个和弦的循环。Douthett、Steinbach、Cohn 等人把从 C 出发的这一圈叫<b>北方循环</b>（Northern circle）。
        循环两极的和弦构成 <b>H 关系</b>（Hexatonic pole，六声极）：<Play seq={["C", "Abm"]} gap={0.9}>H(C) = A♭m</Play>，等于 PLP 或 LPL，也是二重变化中音的一种。
        整圈声部极平稳、色彩变化却很明显。</p>
      <p>大三度循环一共四个，所以这样的<C id="hexatonic_cycle">六和弦循环</C>也有四组，分别叫东、南、西、北方循环：</p>
      <Tabs tabs={[
        { label: "北：C", content: <Progression key="n" chords={["C", "Cm", "Ab", "G#m", "E", "Em", "C"]} roman={["C", "P", "L", "P", "L", "P", "L"]} bpm={96} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }} /> },
        { label: "东：D♭", content: <Progression key="e" chords={["Db", "C#m", "A", "Am", "F", "Fm", "Db"]} roman={["D♭", "P", "L", "P", "L", "P", "L"]} bpm={96} beats={2} tonnetz={{ cols: 9, rows: 4, center: "A" }} /> },
        { label: "南：D", content: <Progression key="s" chords={["D", "Dm", "Bb", "Bbm", "F#", "F#m", "D"]} roman={["D", "P", "L", "P", "L", "P", "L"]} bpm={96} beats={2} tonnetz={{ cols: 9, rows: 4, center: "D" }} /> },
        { label: "西：E♭", content: <Progression key="w" chords={["Eb", "Ebm", "B", "Bm", "G", "Gm", "Eb"]} roman={["E♭", "P", "L", "P", "L", "P", "L"]} bpm={96} beats={2} tonnetz={{ cols: 9, rows: 4, center: "G" }} /> },
      ]} />
      <Progression title="谱例 8.9：勃拉姆斯《a 小调小提琴与大提琴双协奏曲》Op.102 第一乐章（1887），第 270–278 小节和声"
        chords={["Ab", "G#m", "E", "Em", "C", "Cm", "Ab", "G#m", "E7"]} roman={["A♭", "G♯m", "E", "Em", "C", "Cm", "A♭", "G♯m", "E7"]} bpm={76} beats={4}
        tonnetz={{ cols: 9, rows: 4, center: "C" }} caption="练习：这里用了哪个循环？——北方循环，绕了一圈多，最后停在 E7 上，准备回到 a 小调。" />
      <h4>大三度循环作为框架</h4>
      <p>除了这种逐步变换，大三度循环还能作为整段和声的骨架，浪漫主义时期很常见。李斯特《爱之梦》第 3 首的一段，经过 (D♭m–A♭)–(Fm–C)–(Am–E)–C♯m，
        四组和弦的主音 A♭–C–E–A♭(G♯) 正好走过一个完整的大三度循环：</p>
      <Progression title="谱例 8.10：李斯特《爱之梦》S.541 No.3（1850），第 13–21 小节和声" chords={["Dbm/Fb", "Dbm", "Ab", "Fm/Ab", "Fm", "C", "Am", "E", "C#m/E", "D#", "Dbm/Fb", "Eb"]}
        roman={["A♭: iv6", "iv", "I", "f: i6", "i", "V", "a: i", "V", "c♯: i6", "D♯ = E♭", "A♭: iv6", "V"]} bpm={84} beats={[3, 3, 6, 3, 3, 6, 6, 6, 6, 6, 3, 3]} texture="arp" tonnetz={{ cols: 10, rows: 4, center: "C" }}
        caption="每组「小三和弦 → 大三和弦」都是 iv–I 或 i–V 的一对；四组的落脚点 A♭、C、E、G♯(A♭) 沿大三度循环走了一圈。D♯ 与 E♭ 等音，经 D♭m/F♭ 回到 A♭ 的属和弦 E♭。" />
      <p>爵士里著名的<b>柯川进行</b>（Coltrane changes）也与大三度循环有关。约翰·柯川的《Giant Steps》（1960）以 BΔ、GΔ、E♭Δ 三个大七和弦的大三度循环为框架，
        中间插入各自的属七或 2–5 趋近：</p>
      <Progression title="谱例 8.11：柯川《Giant Steps》和声（只列和弦）" chords={["Bmaj7", "D7", "Gmaj7", "Bb7", "Ebmaj7", "Am7", "D7", "Gmaj7", "Bb7", "Ebmaj7", "F#7", "Bmaj7", "Fm7", "Bb7",
        "Ebmaj7", "Am7", "D7", "Gmaj7", "C#m7", "F#7", "Bmaj7", "Fm7", "Bb7", "Ebmaj7", "C#m7", "F#7"]}
        roman={["BΔ", "V7/G", "GΔ", "V7/E♭", "E♭Δ", "ii/G", "V7", "GΔ", "V7/E♭", "E♭Δ", "V7/B", "BΔ", "ii/E♭", "V7", "E♭Δ", "ii/G", "V7", "GΔ", "ii/B", "V7", "BΔ", "ii/E♭", "V7", "E♭Δ", "ii/B", "V7"]}
        bpm={200} beats={[2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2]} texture="pop" loop
        caption="三个主和弦 B、G、E♭ 两两相距大三度。爵士界誉之为「革命性」，但这类进行一个世纪前已在欧洲浪漫派中大量使用；当时的爵士乐手多未受过系统训练，才误以为是柯川首创。" />
    </Block>

    <Block id="axis" toc="小三度循环与轴心" kicker="8-1 · 小三度循环与巴托克轴心" title="PR 交替：八和弦一圈，与巴托克轴心"
      lead="从 C 交替做 P、R，八步回到 C，根音走出 C–E♭–F♯–A 的小三度循环。这八个和弦，正是第 3 章那八个同名、关系大小调的主和弦。">
      <Narrate />
      <Progression title="图 8.10：从 C 出发的八和弦循环" chords={["C", "Cm", "Eb", "Ebm", "Gb", "F#m", "A", "Am", "C"]} roman={["C", "P", "R", "P", "R", "P", "R", "P", "R"]}
        bpm={96} beats={2} tonnetz={{ cols: 10, rows: 4, center: "C" }} />
      <p>以 C 大调为中心：Am 是关系小调主和弦，Cm 是同名小调主和弦，A 是关系小调的同名大调主和弦，E♭ 是同名小调的关系大调主和弦……作为大小调交替的推广，
        这八个和弦可以互相借用、自由替换，都具有广义的主功能。同理，它们的属、下属和弦也各自形成一个小三度循环。</p>
      <p>Lendvai 据此提出<C id="axis_system">轴心体系</C>（Axis system），因为最初用来分析巴托克，又叫<b>巴托克轴心</b>。C 大调的主、属、下属和弦各对应一个小三度循环，
        画在五度圈上都是「十」字形，称主轴、属轴、下属轴；同轴和弦功能相同，于是 12 对大小三和弦分成广义的 T、D、S 三组：</p>
      <Tabs tabs={[
        { label: "主轴 T：C · E♭ · F♯ · A", content: <Tonnetz key="T" cols={10} rows={4} center="C" highlight={["C", "Cm", "Eb", "Ebm", "F#", "F#m", "A", "Am"]} unit={50} compact /> },
        { label: "属轴 D：G · B♭ · D♭ · E", content: <Tonnetz key="D" cols={10} rows={4} center="C" highlight={["G", "Gm", "Bb", "Bbm", "Db", "C#m", "E", "Em"]} unit={50} compact /> },
        { label: "下属轴 S：F · A♭ · B · D", content: <Tonnetz key="S" cols={10} rows={4} center="C" highlight={["F", "Fm", "Ab", "Abm", "B", "Bm", "D", "Dm"]} unit={50} compact /> },
      ]} />
      <p>第 5 章末尾留下的疑问——全功能体系里小三度方向的功能组似乎有联系——在这里揭晓：按轴心理论，重属 DD 归入下属轴，重下属 SS 归入属轴。
        这不是对功能和声的反叛，而是极大的推广：功能逻辑的基础是「属—主」的五度倾向，T–S–D–T 循环里 S 引出 D、D 引出 T；重属可由下属借来、后面多接属功能，
        符合广义下属；重下属更常被看作 d 功能的 v、♭VII，属于广义属功能。</p>
      <h4>同轴与跨轴</h4>
      <ul>
        <li><b>同轴</b>：功能相同，可替换也可相接。同一位点的大、小三和弦构成 P 关系；相隔 90° 的根音差小三度（R 或 M 关系）；相隔 180° 的根音差三全音，
          传统上最远、最不相容，在轴心理论里却是同轴的<b>极与对极</b>（Pole and counterpole），可以替换、交替甚至同时使用。巴托克偏爱三全音，大量制造「极点对置」；
          爵士的三全音替换也就成了同功能的极音替换。每个十字轴的两对三全音有主次：含主、属、下属音的一对叫<b>主支</b>（C 大调主轴为 C–F♯），另一对叫<b>副支</b>（A–E♭）；
          属轴主支 G–D♭、副支 E–B♭；下属轴主支 F–B、副支 D–A♭。</li>
        <li><b>跨轴</b>：就是功能进行的推广。T–S–D–T 变成十字轴的逆时针转动，网格上从右向左不断跨越小三度轴。相距小三度的和弦同轴，相距大三度的属于不同轴：
          E、A♭ 分别与 G、F 同轴，于是 C–F–G–C 可以换成大三度循环 C–A♭–E–C。</li>
      </ul>
      <Tabs tabs={[
        { label: "C–F–G–C", content: <Progression key="a1" chords={["C", "F", "G", "C"]} keyName="C" bpm={80} beats={2} tonnetz={{ cols: 10, rows: 4, center: "C" }} /> },
        { label: "C–A♭–E–C（图 8.12）", content: <Progression key="a2" chords={["C", "Ab", "E", "C"]} roman={["T", "S 轴", "D 轴", "T"]} bpm={80} beats={2} tonnetz={{ cols: 10, rows: 4, center: "C" }}
          caption="大三度循环被赋予了 T–S–D–T 的功能逻辑：和声从五度思维中彻底解放出来。" /> },
      ]} />
      <p>巴托克歌剧《蓝胡子公爵的城堡》（1918）把「夜」与「光」两个主题分别写在 <Play chord="F#m" arp={0.05}>f♯ 小调</Play> 与 <Play chord="C" arp={0.05}>C 大调</Play> 上，互为极点，突出二者的对立；
        「花」与「泪之湖」写在 <Play chord="Eb" arp={0.05}>E♭ 大调</Play> 与 <Play chord="Am" arp={0.05}>a 小调</Play>，构成主轴的副支。
        《弦乐、打击乐与钢片琴的音乐》第二乐章的和弦乍看毫无章法，按轴心体系看却有功能逻辑，下方五音一组的固定音型又与它形成多调性。</p>
      <Callout tone="warn" title="物极必反">
        按轴心理论，以 C、E♭、F♯、A 为根的八个和弦都有主功能、都能结束乐句——调中心被分散，没有谁能一家独大。横向上这叫<strong>泛调性</strong>，纵向上叫<strong>多调性</strong>。
        属、下属功能同样被分散，调内外界线淡化。调性功能体系发展到极致，反而亲手瓦解了传统调性；20 世纪不少音乐只剩一个「中心音」，而不再有传统意义上的主音。
      </Callout>
      <h4>浪漫派的三度循环</h4>
      <Tabs tabs={[
        { label: "瓦格纳《罗恩格林》", content: <Progression key="r1" title="谱例 8.14：瓦格纳《罗恩格林》第一幕第二场（1848）" chords={["Ab", "Fb", "Cb", "Bm", "D", "A7", "D", "Dm", "F", "C7", "F", "Bbm7/Db", "Ab/Eb", "Eb7", "Ab"]}
          roman={["A♭: I", "♭VI", "C♭ = B", "D: vi", "I", "V7", "I", "i", "F: I", "V7", "I", "A♭: ii7", "I64", "V7", "I"]} bpm={72} beats={[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4]} tonnetz={{ cols: 10, rows: 4, center: "Ab" }}
          caption="A♭–F♭（大三度下行）–C♭=B（再下大三度）–D–F–A♭：主要和弦沿三度不断平移，最后经 ii–V 回到 A♭。" /> },
        { label: "柴可夫斯基第四交响曲 · 二", content: <Progression key="r2" title="谱例 8.14：柴可夫斯基《第四交响曲》第二乐章（1878）" chords={["Ab", "B", "D", "F"]} bpm={76} beats={4} tonnetz={{ cols: 10, rows: 4, center: "C" }}
          caption="A♭–B–D–F：大三和弦沿小三度循环整体平移。" /> },
        { label: "柴可夫斯基第四交响曲 · 三", content: <Progression key="r3" title="谱例 8.14：柴可夫斯基《第四交响曲》第三乐章" chords={["F", "Dm", "Dm", "F", "Db", "Bbm", "Bbm", "Db", "A", "F#m", "F#m", "A", "F", "Dm", "Dm", "F"]}
          keyName="F" bpm={120} beats={2} tonnetz={{ cols: 10, rows: 4, center: "F" }}
          caption="F/Dm → D♭/B♭m → A/F♯m → F/Dm：一对关系和弦沿大三度循环下行一圈。" /> },
      ]} />
    </Block>

    {/* ───────── 8-2 ───────── */}
    <Block id="family" toc="同族三和弦与升降" kicker="8-2 · 同族三和弦 · 和弦音的升降变换" title="每个音都能单独升降半音"
      lead="下面的实验台里，三个音各有 ▲▼ 两个按钮。从 C 出发，把五音一路升高或降低，看和弦名称与网格形状怎样变。">
      <Narrate />
      <ToneLab />
      <p>上一节在网格上一格格移动；这一节换个层面，看和弦音本身升降会发生什么。先总结三和弦的种类：根音不变，三音有大三度、小三度两种，五音有增五、纯五、减五三种
        （增三度等音于纯四度、减三度等音于大二度，又非自然音程，不考虑）。所以一个根音上的<C id="chord_family">同族三和弦</C>共有 2×3 = 6 种：</p>
      <p><Play chord="C+" arp={0.05}>C+</Play>、<Play chord="C" arp={0.05}>C</Play>、<Play chord="Cm" arp={0.05}>Cm</Play>、<Play chord="C°" arp={0.05}>C°</Play> 四种已经很熟；
        另两种存在等音关系：<Play notes="C4 E4 Gb4" arp={0.05}>大三降五 C♭5 = F♯ø no3</Play>、<Play notes="C4 Eb4 G#4" arp={0.05}>小三升五 Cm♯5 = A♭</Play>。
        此外三音被取代的 <Play chord="Csus2" arp={0.05}>挂二</Play>、<Play chord="Csus4" arp={0.05}>挂四</Play>，以及五音被取代的挂六和弦，一般不算三和弦，但联系密切。</p>
      <Callout tone="info" title="五音的升降（原书图 8.15）">
        C 的五音 G 升半音得 C+（C–E–G♯），再升得 Am/C（C–E–A）；降半音得 C♭5 = F♯ø no3/C（C–E–G♭），再降得 Cadd4no5 = FΔ no3（C–E–F）。
        Cm 的五音升半音得 Cm♯5 = A♭（C–E♭–G♯），再升得 A°/C（C–E♭–A）；降半音得 C° = F♯°7 no3/C，再降得 Cmadd4no5 = F7 no3/C（C–E♭–F）。
        三音的升降在大、小三与挂二、挂四之间转换（Csus2 = Gsus4、Csus4 = Fsus2）；连根音也能升降：C 的根音升半音得 C♯°，降半音得 Em；Cm 的根音降半音得 B+，升半音（等音为 D♭）……
      </Callout>
      <p>三个音各自都能升降，于是形成一个<b>三维</b>的点阵（Lattice）网络——Dmitri Tymoczko 的《音乐几何》（A Geometry of Music）有更详细的介绍。</p>
    </Block>

    <Block id="slide" toc="半音滑动" kicker="8-2 · 半音滑动" title="一个声部慢慢滑，整个和弦变颜色">
      <Narrate />
      <p>这些半音升降给和声变化提供了灵感。《詹姆斯·邦德主题》（Monty Norman，1962）在 Em 上让一个声部 B–C–C♯–C 来回滑动：
        <Play seq={["E3 G3 B3", "E3 G3 C4", "E3 G3 C#4", "E3 G3 C4"]} gap={0.75}>Em – Em(♭6) – Em6 – Em(♭6)</Play>，小三和弦配上半音滑动，就是那股标志性的悬疑味（有版权，这里只给和弦）。</p>
      <p>在单一和弦背景上让某个声部做二度进行来改变色彩，爵士叫<C id="line_cliche">线性套路</C>（Line cliché），半音为主时又叫<b>半音滑动</b>，也有全音的，属于典型的线性、非功能和声。
        正如 6-1 所说，半音和全音既近又远：声部上是最平稳的级进，调性与和声上却距离很远。滑动的声部可以并入和弦、让整个和弦性质跟着变，也可以独立成一条旋律线，
        甚至与和弦完全无关。它能在长时间持续的和弦上增加新鲜感，也能巧妙地引入或解决增三、减七、增六等变化和弦。</p>
      <Score abc={'"C"[CEGc] "C/B"[B,EGc] "C/Bb"[_B,EGc] "C/A"[A,EGc] | "G/Ab"[_A,DGB]2 "/G"[G,DGB]2 | "/F#"[^F,DGB]2 "/G"[G,DGB]2 |]'} tempo={84}
        caption="谱例 8.16：低音的半音滑动（原谱后四个和弦写在一小节里，这里按二分音符分成两小节）。上方和弦重复或持续时，可以只在斜线后写低音。" />
      <p>放在低音上更有趣：低音围绕根音半音滑动时，即使有些能和上方合成七和弦乃至高叠和弦，也倾向于分开看待，现代常写成斜线和弦。
        与持续低音类似，这时低音是一个独立声部，与上方和弦可以有关，也可以无关。格什温《三首钢琴前奏曲》之二（1926）里有大量半音滑动，有时不止一个声部同时滑。</p>
      <p>七和弦同样如此。拉赫玛尼诺夫《c 小调第二钢琴协奏曲》开头的钢琴独奏，就在 F 的低音上让和弦内声部半音移动（示意）：
        <Play seq={["F2 F3 Ab3 C4 F4", "F2 F3 Ab3 Db4 F4", "F2 F3 Ab3 D4 F4", "F2 F3 Ab3 Eb4 F4", "F2 F3 A3 Eb4 F4", "F2 F3 Ab3 Eb4 F4", "F2 F3 Ab3 D4 F4", "F2 F3 Ab3 Db4 F4", "C2 C4 Eb4 G4 C5"]} gap={1.1}>
          Fm – Fm♭6 – Fm6 – Fm7 – F7 – Fm7 – Fm6 – Fm♭6 – Cm</Play>，钟声般的和弦一个音一个音地变暗变亮，最后落到 c 小调。</p>
    </Block>

    <Block id="aug" toc="增三和弦与方块之舞" kicker="8-2 · 增三和弦的游移" title="增三和弦：连接 12 个三和弦的交通枢纽"
      lead="增三和弦把八度三等分，C+ = E+ = A♭+。它的任意一个音动半音，就落进一个大三或小三和弦。">
      <Narrate />
      <p>增三和弦本身就是一个大三度循环，结构对称、转位后实质不变，同一循环上的三个增三和弦彼此等音。它本不是大小调体系的核心，游离在调的边缘，
        等音关系又让它的根音有多重理解，容易让调性模糊、游移。更有趣的是：</p>
      <ul>
        <li>任何<b>一个音降半音</b>，或任何<b>两个音升半音</b>，都得到大三和弦：C+ → <Play seq={["C4 E4 G#4", "C4 E4 G4"]} gap={0.8}>C</Play>、<Play seq={["C4 E4 G#4", "B3 E4 G#4"]} gap={0.8}>E</Play>、<Play seq={["C4 E4 G#4", "C4 Eb4 G#4"]} gap={0.8}>A♭</Play>；<Play seq={["C4 E4 G#4", "Db4 F4 Ab4"]} gap={0.8}>D♭</Play>、<Play seq={["C4 E4 G#4", "C#4 E4 A4"]} gap={0.8}>A</Play>、<Play seq={["C4 E4 G#4", "C4 F4 A4"]} gap={0.8}>F</Play>。</li>
        <li>任何<b>一个音升半音</b>，或任何<b>两个音降半音</b>，都得到小三和弦：<Play seq={["C4 E4 G#4", "C#4 E4 G#4"]} gap={0.8}>C♯m</Play>、<Play seq={["C4 E4 G#4", "C4 F4 G#4"]} gap={0.8}>Fm</Play>、<Play seq={["C4 E4 G#4", "C4 E4 A4"]} gap={0.8}>Am</Play>；<Play seq={["C4 E4 G#4", "B3 Eb4 G#4"]} gap={0.8}>G♯m</Play>、<Play seq={["C4 E4 G#4", "B3 E4 G4"]} gap={0.8}>Em</Play>、<Play seq={["C4 E4 G#4", "C4 Eb4 G4"]} gap={0.8}>Cm</Play>。</li>
      </ul>
      <Tonnetz cols={10} rows={5} center="E" highlight={["C+", "C", "E", "Ab", "Db", "A", "F", "C#m", "Fm", "Am", "G#m", "Em", "Cm"]} unit={48}
        caption="图 8.19：C+（金色多边形，在网格上是一条大三度斜线）与它能「一步到达」的 12 个大小三和弦，全都紧贴着这条斜线。" />
      <p>于是上一节的东、南、西、北四个六和弦循环，能被四个增三和弦沟通起来：每个循环的三个大三和弦升高五音，汇入一个增三和弦；这个增三和弦再升高一个音，
        又通到下一个循环的三个小三和弦。这个网络被 Douthett、Steinbach、Cohn 称为<b>方块之舞</b>（Cube dance）。下面这条路线途经全部四个增三和弦，每一步都只动一个半音：</p>
      <Progression title="方块之舞上的一圈：北 → 东 → 南 → 西 → 北" chords={["C", "C+", "Am", "A", "A+", "Dm", "D", "D+", "Gm", "G", "G+", "Cm", "C"]}
        bpm={100} beats={2} tonnetz={{ cols: 10, rows: 4, center: "C" }}
        caption="C 升五音成 C+，C+ 再升一个音成 Am；A 升五音成 A+（= D♭+ = F+）……每个增三和弦都像「三头六臂」的哪吒，直接连着六个大小三和弦。" />
      <p>勋伯格把这种调性归属模糊、却能连通远距离和弦与调的和弦叫<C id="vagrant_chord">游移和弦</C>（Vagrant / Roving chord）。主要有三种，增三和弦是第一种。
        传统调性和声里，它主要作为变和弦（大调 V+、小调 V 的变体）出现，还有和声小调的 III+、和声大调的 ♭VI+ 两个调内和弦。下面这些含增三和弦的进行，
        可以从级数功能、半音经过音或辅助音、以及「方块之舞」三个角度分别理解：</p>
      <Tabs tabs={[
        { label: "C–C+–C / G–G+–C", content: <Progression key="g1" title="谱例 8.18（一）" chords={["C", "C+", "C", "G", "G+", "C"]} keyName="C" bpm={88} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }} /> },
        { label: "C–C+–Fm / Am–A♭+–G7", content: <Progression key="g2" title="谱例 8.18（二）" chords={["C", "C+", "Fm", "Am", "Ab+", "G7"]} keyName="C" bpm={88} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }}
          caption="C+ = A♭+/C；Am–A♭+–G7 的低音 A–A♭–G 半音下行。" /> },
        { label: "C/E–C+/E–C♯m/E / Dm/F–D♭+/F–G7", content: <Progression key="g3" title="谱例 8.18（三）" chords={["C/E", "C+/E", "C#m/E", "Dm/F", "Db+/F", "G7"]} keyName="C" bpm={88} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }}
          caption="内声部 G–G♯–（G♯）、A–A♭–G 都是半音滑动。" /> },
      ]} />
      <p>结合离调、借用，任何一个增三和弦都能与全部 24 个大小三和弦取得联系（原书图 8.22），你可以试着想想 C+ 在每个调里扮演什么角色。</p>
    </Block>

    <Block id="space" toc="和弦空间" kicker="8-2 · 和弦空间" title="音高空间、和弦空间、调性空间">
      <Narrate />
      <p>理论家都喜欢用空间（Space）表示音、和弦、调之间的关系，分别叫音高空间、和弦空间、调性空间，形成「音—和弦—调」三级结构。本书的网格图、五度圈、半音阶循环
        既是音的关系网，也能研究和弦与调（网格图作为调性空间，会在第 11 章转调中大显身手）。</p>
      <ul>
        <li><b>正方网格</b>：勋伯格的和声理论反复使用正方网格表示调与和弦的「领域」（Region）；它由 F. G. Vial 1767 年提出，Weber、里曼也用过，与三角形 Tonnetz 一一对应。</li>
        <li><b>同构键盘</b>（Isomorphic keyboard）：按几何规则排列音，见于巴扬式手风琴、Jammer 键盘、Launchpad 等。优点：①更紧凑，手指移动距离小；
          ②同样的和弦、同样的调在任何位置指型都一样，便于学习和移调（比较钢琴上 <Play chord="G7" arp={0.04}>G7</Play> 与 <Play chord="Ab7" arp={0.04}>A♭7</Play> 的黑白键）；
          ③相邻键多为协和音程，按错也不太难听，容错率高。钢琴键盘沿用了数百年，未必就是最优排列。</li>
        <li><b>音高螺旋</b>：M. W. Drobisch 1855 年提出，把音按半音排在螺旋上，每圈一个八度，投影到底面就是半音阶循环；因八度循环，音高又像衔尾蛇或彭罗斯阶梯。
          Elaine Chew 的<b>螺旋序列模型</b>把音按五度排成螺旋，再推算和弦与调。</li>
      </ul>
      <p>这些模型都体现了音乐与数学的联系：巴赫的复调、按数学排列音高时值的序列主义，以及用平行、倒影、逆行、斐波那契数列、黄金分割等数理逻辑设计和声的「理性化」潮流——
        近年流行的负极和声就是镜像倒影的运用，本章 8-4 介绍。</p>
    </Block>

    {/* ───────── 8-3 ───────── */}
    <Block id="sev" toc="同族七和弦" kicker="8-3 · 同族七和弦" title="18 种七和弦，按六个三和弦分组"
      lead="四个音的变化形成四维网络，难以想象全貌；但把七和弦看成「三和弦 + 七音」，就能分门别类。">
      <Narrate />
      <p>以 C 为根：三音可以是 E 或 E♭，五音有 G、G♯（= A♭）、G♭（= F♯），七音有大七度 B、小七度 B♭（= A♯）、减七度 B𝄫（= A）。同族七和弦理论上有 2×3×3 = 18 种，
        按基础三和弦分成六组，组内是七音的升降。最直观的做法：从重复根音的四音和弦出发，把高八度的根音一路下滑半音：</p>
      <Tabs tabs={[
        { label: "大三和弦组", content: <p><Play seq={["C4 E4 G4 C5", "C4 E4 G4 B4", "C4 E4 G4 Bb4", "C4 E4 G4 A4", "C4 E4 G4 Ab4", "C4 E4 G4"]} gap={0.85}>C → CΔ → C7 → C6 → C♭6 → C</Play>。
          其中 <Play notes="C4 E4 G4 A4" arp={0.05}>C6 = Am7</Play>、<Play notes="C4 E4 G4 Ab4" arp={0.05}>C♭6 = A♭+Δ</Play>：小七和弦降低根音就成了增大七和弦。</p> },
        { label: "小三和弦组", content: <p><Play seq={["C4 Eb4 G4 C5", "C4 Eb4 G4 B4", "C4 Eb4 G4 Bb4", "C4 Eb4 G4 A4", "C4 Eb4 G4 Ab4", "C4 Eb4 G4"]} gap={0.85}>Cm → CmΔ → Cm7 → Cm6 → Cm♭6 → Cm</Play>。
          其中 <Play notes="C4 Eb4 G4 A4" arp={0.05}>Cm6 = Aø</Play>、<Play notes="C4 Eb4 G4 Ab4" arp={0.05}>Cm♭6 = A♭Δ</Play>：大七和弦升高根音就成了半减七和弦。</p> },
        { label: "增三和弦组", content: <p><Play seq={["C4 E4 G#4 C5", "C4 E4 G#4 B4", "C4 E4 G#4 Bb4", "C4 E4 G#4 A4"]} gap={0.85}>C+ → C+Δ → C+7 → C+6</Play>（C+6 即 Am 的大七和弦转位：A–C–E–G♯ = AmΔ）。</p> },
        { label: "减三和弦组", content: <p><Play seq={["C4 Eb4 Gb4 C5", "C4 Eb4 Gb4 B4", "C4 Eb4 Gb4 Bb4", "C4 Eb4 Gb4 A4"]} gap={0.85}>C° → C°Δ → Cø → C°7</Play>（Cø = E♭m6，C°7 = A°7 = F♯°7 = E♭°7）。</p> },
        { label: "大三降五组", content: <p><Play seq={["C4 E4 Gb4 C5", "C4 E4 Gb4 B4", "C4 E4 Gb4 Bb4", "C4 E4 Gb4 A4"]} gap={0.85}>C♭5 → CΔ♭5 → C7♭5 → C♭5(♭♭7)</Play>（C7♭5 = G♭7♭5，两对三全音）。</p> },
        { label: "小三升五组", content: <p><Play seq={["C4 Eb4 G#4 C5", "C4 Eb4 G#4 B4", "C4 Eb4 G#4 Bb4", "C4 Eb4 G#4 A4"]} gap={0.85}>Cm♯5 → CmΔ♯5 → Cm7♯5 → A°Δ</Play>（即 A♭、A♭₅、A♭add2、A♭addb2 的转位，见原书图 8.33）。</p> },
      ]} />
      <p>各组之间的关系，参考上一节三和弦的升降（实验台里点「＋ 第四个音」就能试）。七和弦的升降同样可以塑造声部线条、构成半音滑动——上面拉赫玛尼诺夫第二协奏曲的开头就是例子。</p>
    </Block>

    <Block id="dim7" toc="减七与输电塔" kicker="8-3 · 减七和弦的游移" title="减七和弦：第二种游移和弦"
      lead="B°7 = D°7 = F°7 = A♭°7。它的任一音降半音成属七，任一音升半音成半减七。">
      <Narrate />
      <p>减七和弦的四个音正好是小三度循环，把八度四等分，转位后实质不变，同一循环上的四个减七和弦彼此等音：<Play chord="B°7" arp={0.06}>B°7 = D°7 = F°7 = A♭°7</Play>。
        与增三和弦同理，它的调性归属不明，是第二种<C id="vagrant_chord">游移和弦</C>。古典作品常用大段减七和弦悬置调性，制造朦胧、彷徨、迷惑的感觉：
        贝多芬《热情》奏鸣曲第三乐章在 f 小调中用了二十几小节导七和弦 E°7 的分解和弦，四个音轮流做低音，调感松动，直到最后 <Play seq={["E3 G3 Bb3 Db4", "C3 E3 G3 Bb3", "F2 C4 F4 Ab4"]} gap={1}>E°7 … C7 → Fm</Play> 的属—主进行出现，调性才复归清晰。</p>
      <p>减七和弦与其他七和弦之间有变换关系：<b>任一音降半音（或任三个音升半音）得属七</b>，<b>任一音升半音（或任三个音降半音）得半减七</b>。
        属七与半减七又可以通过小七和弦沟通。下面两条路线（原书图 8.35）在网格上画出四音形状（属七绿、小七蓝、半减七紫）：</p>
      <Tabs tabs={[
        { label: "A♭°7 → G7 → Gm7 → Gø → G°7", content: <Progression key="t1" chords={["Ab°7", "G7", "Gm7", "Gø", "G°7"]} roman={["A♭°7", "A♭↓", "B↓", "D↓", "F↓"]} bpm={72} beats={2}
          tonnetz={{ cols: 9, rows: 5, center: "D" }} caption="每一步只有一个音降半音：A♭→G、B→B♭、D→D♭、F→E。" /> },
        { label: "A♭°7 → Bø → Dm7 → F7 → A°7", content: <Progression key="t2" chords={["Ab°7", "Bø", "Dm7", "F7", "A°7"]} roman={["A♭°7", "A♭↑", "B↑", "D↑", "F↑"]} bpm={72} beats={2}
          tonnetz={{ cols: 9, rows: 5, center: "D" }} caption="每一步只有一个音升半音：A♭→A、B→C、D→E♭、F→F♯。" /> },
      ]} />
      <p>于是减七、属七、半减七、小七四种七和弦组成一个网络，Douthett 与 Steinbach 称之为七和弦<b>「输电塔」</b>（Power towers），三个减七和弦在其中处于枢纽。</p>
      <h4>减七和弦的七十二变</h4>
      <p>回忆前几章，B°7 可以：作导七和弦解决到 <Play seq={["B°7", "C"]} gap={0.9}>C</Play> 或 <Play seq={["B°7", "Cm"]} gap={0.9}>Cm</Play>；作高半音的趋近和弦进行到 <Play seq={["B°7", "Bb"]} gap={0.9}>B♭</Play> 或 B♭m；
        作共同音减七和弦进行到 <Play seq={["B°7", "B"]} gap={0.9}>B</Play> 或 Bm。再加上与另外三个减七和弦的等音，它能接全部 24 个大小三和弦，甚至 12 对大小调里的大七、小七、属七等调内和弦。
        反过来，从 C 或 Cm 出发也能进行到任何一个减七和弦：B°7 是导七（也等音于下属共同音减七 F°7），F♯°7 是重属导七（也是主音的共同音减七 C°7），
        E°7 是下属离调导七（等音于 D♭°7，也是属的共同音减七 G°7）。</p>
      <Callout tone="key" title="任意 Y → X°7 → Z">
        理论上，任意和弦都能以任意一个减七和弦为中介，连到其他任意和弦。减七和弦上天入地，像会七十二变、腾云驾雾的孙悟空。试试：
        <Play seq={["C", "C#°7", "Dm"]} gap={0.9}>C–C♯°7–Dm</Play>、<Play seq={["C", "Ebdim7", "E"]} gap={0.9}>C–E♭°7–E</Play>、<Play seq={["Am", "G#°7", "Ab"]} gap={0.9}>Am–G♯°7–A♭</Play>、<Play seq={["F", "F#dim7", "Gb"]} gap={0.9}>F–F♯°7–G♭</Play>。
      </Callout>
    </Block>

    <Block id="dom7" toc="属七的游移" kicker="8-3 · 属七和弦的游移" title="属七和弦：体系内的「二郎神」"
      lead="同一个 G7，后面可以接的和弦远不止 C。">
      <Narrate />
      <p>减七和弦再神通广大，毕竟不是大小调的骨干和弦。属七和弦不同：作为大小调和声的支柱，它的游移不仅来自本章的变换关系，更来自多重功能。
        G7 可以是属七、重属、副属；等音于德国增六（G–B–D–E♯，指向 F♯）；与 D♭7 互为三全音替换；加上趋近、共同音等用法，能勾连全部 12 对大小三和弦与大小调。
        属七和弦的功能分两类：<b>属功能 D</b>（含重属、副属），在网格上倾向往左下方解决；<b>属前功能 P</b>（含下属、增六），倾向往右上方解决。</p>
      <Tabs tabs={[
        { label: "→ C(m)", content: <Progression key="d1" chords={["G7", "C", "G7", "Cm"]} roman={["V7", "I", "V7", "i"]} bpm={80} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }} /> },
        { label: "→ A♭", content: <Progression key="d2" chords={["G7", "Ab"]} roman={["V7", "♭VI（阻碍）"]} bpm={80} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }} /> },
        { label: "→ D/A", content: <Progression key="d3" chords={["G7", "D/A"]} roman={["G7（属前功能）", "D/A"]} bpm={80} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }} /> },
        { label: "→ E♭/G", content: <Progression key="d4" chords={["G7", "Eb/G"]} roman={["V7", "♭III/G"]} bpm={80} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }} /> },
        { label: "→ F♯(m)", content: <Progression key="d5" chords={["G7", "F#", "G7", "F#m"]} roman={["Gr+6 = ♭II7", "I", "♭II7", "i"]} bpm={80} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }}
          caption="G7 等音为德国增六（G–B–D–E♯），或看作 F♯ 的三全音替换 ♭II7。" /> },
        { label: "→ B(m)/F♯", content: <Progression key="d6" chords={["G7", "B/F#", "G7", "Bm/F#"]} roman={["Gr+6（b 调）", "I64", "Gr+6", "i64"]} bpm={80} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }}
          caption="作为 b 小调/B 大调的增六和弦，解决到主和弦的第二转位。" /> },
        { label: "→ G♯m7", content: <Progression key="d7" chords={["G7", "G#m7"]} roman={["G7", "趋近（半音上行）"]} bpm={80} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }} /> },
        { label: "→ D♭7/A♭", content: <Progression key="d8" chords={["G7", "Db7/Ab"]} roman={["V7", "subV7（三全音替换）"]} bpm={80} beats={2} tonnetz={{ cols: 9, rows: 4, center: "C" }} /> },
      ]} />
      <p className="au-hint">谱例 8.21：G7 的一些进行。不少进行不止一种解释，也可以用纯粹的非功能（共同音、半音级进）思路理解。</p>
      <p>其他属七和弦都是如此。现代用法里属七和弦前后几乎能接任何和弦，怎么走都找得到说法，实践中甚至可以「先斩后奏」，凭感觉用，不必先想理论。
        与种种复杂新奇的和弦相比，属七和弦已相当纯净、和谐、稳定，不再必须解决，用作主和弦乃至结束全曲都没问题。作为第三种游移和弦，它功能性最强、在调内是骨干，
        就像二郎神：本领高超，还在体系内有正统地位。</p>
      <Callout tone="key" title="三种游移和弦">
        增三、减七、属七是和弦变换的三个枢纽，能把很远的和弦与调迅速沟通起来。属七和减七联系尤其紧密：属七的根音升半音即等音为减七，减七的任一音降半音即等音为属七——
        二者既能靠声部半音级进互相转化，也能视为彼此的变和弦互相替代。
      </Callout>
      <h4>综合练习：谱例 8.22</h4>
      <Tabs tabs={[
        { label: "①", content: <Progression key="c1" chords={["C", "Cmaj7", "C7", "Cm7", "F7/C", "Bb"]} bpm={84} beats={2} tonnetz={{ cols: 9, rows: 5, center: "C" }} caption="上方声部 C–B–B♭–B♭–A–B♭，七音一路下滑。" /> },
        { label: "②", content: <Progression key="c2" chords={["C", "Dm7/F", "G7", "G°7", "F#7", "B"]} bpm={84} beats={2} tonnetz={{ cols: 9, rows: 5, center: "C" }} caption="G7 的三音、五音各降半音成 G°7；G°7 的 G 再降半音就是 F♯7（A♯ = B♭、C♯ = D♭），正格解决到 B。" /> },
        { label: "③", content: <Progression key="c3" chords={["C/E", "Cmaj7/E", "C#ø/E", "Edim7", "Eb7", "Ab"]} bpm={84} beats={2} tonnetz={{ cols: 9, rows: 5, center: "C" }} caption="低音 E 持续，上方一个个半音推移，最后 E♭7–A♭ 正格到远关系调。" /> },
        { label: "④", content: <Progression key="c4" chords={["Am", "C+maj7", "C#m7", "F#7/C#", "F/C", "Bbm"]} bpm={84} beats={2} tonnetz={{ cols: 9, rows: 5, center: "C" }} /> },
        { label: "⑤", content: <Progression key="c5" chords={["C", "Cm", "Cm6", "B+7", "B7", "E"]} bpm={84} beats={2} tonnetz={{ cols: 9, rows: 5, center: "C" }} caption="Cm6 = Aø；根音 C 降半音成 B+7，五音再降半音成 B7，解决到 E。" /> },
        { label: "⑥", content: <Progression key="c6" chords={["C", "Dm7/F", "G7", "G7b5", "Db7/Ab", "Gb"]} bpm={84} beats={2} tonnetz={{ cols: 9, rows: 5, center: "C" }} caption="G7♭5 与 D♭7♭5 同一组音：经三全音替换转到 G♭。" /> },
      ]} />
    </Block>

    <Block id="blk" toc="Blackadder 和弦" kicker="8-3 · 案例：增六与「Blackadder」和弦" title="增六和弦的线性本质，与「日本增六」"
      lead="先听增六和弦最传统的解决：构成增六度的两个音从两边夹住属音。">
      <Narrate />
      <Tabs tabs={[
        { label: "It+6 → V / K64", content: <Progression key="b1" chords={["AbIt+6", "G", "AbIt+6", "C/G", "G"]} roman={["It+6", "V", "It+6", "K64", "V"]} bpm={72} beats={2} /> },
        { label: "Gr+6 → V / K64", content: <Progression key="b2" chords={["AbGer+6", "G", "AbGer+6", "Cm/G", "G"]} roman={["Gr+6", "V", "Gr+6", "k64", "V"]} bpm={72} beats={2} /> },
      ]} />
      <p className="au-hint">谱例 8.23 第一行：C 大调 / c 小调的意大利、德国增六和弦（字母记号为 A♭7no5、A♭7）。原谱第二行还有三个增六和弦与特里斯坦和弦的解决练习。</p>
      <p>5-3 与 6-3 说过，增六和弦在功能上可看作重属组的变和弦或三全音替换，常解决到属和弦或主和弦的第二转位。从非功能角度看更直观：它就是<b>声部运动造出来的趋近和弦</b>——
        构成增六度的两个音从两个方向半音趋近属音，其余声部级进或保持共同音，是典型的线性思路。</p>
      <p>2017 年，Joshua Taipale 研究日本流行音乐时提出了 <C id="blackadder">「Blackadder」和弦</C>：低音为 C 时，上方是 F♯、B♭、D，简记 Cblk。
        上方三个音是增三和弦，所以日本叫「分数 aug」，又因作曲家田中秀和常用而叫「田中 aug」。由于增三和弦的游移性，Cblk 可写成 F♯+/C、B♭+/C 或 D+/C。
        例如槇原敬之《どんなときも》、山口隆《世界はそれを愛と呼ぶんだぜ》、田中秀和《Star!!》里，它都表现为「I+ 下面叠调式 ♭5 级」，接着进行到 IV（歌曲有版权，不转写）。</p>
      <Score abc={'"C/G"[CEG]4 | "C+/Gb"[CE^G]4 | "F(m)"[CFA]4 || "G"[B,DG]4 | "C+/Gb"[CE^G]4 | "F"[CFA]4 || "F"[CFA]4 | "Ab+/F#"[CE_A]4 | "G"[B,DG]4 || "Dm7/A"[CDFA]4 | "Ab+7"[CE^F]4 | "C/G"[CEG]4 |]'}
        bass={'G,4 | _G,4 | F,4 || G,4 | _G,4 | F,4 || F,4 | ^F,4 | G,4 || A,4 | _A,4 | G,4 |]'} tempo={60}
        caption="谱例 8.25：C 大调里 blk 和弦的典型用法（原书分两行四组；F(m) 可换成 Fm，此时 G♯ 与 A♭ 等音保持）。最后一组 A♭+7 即奥地利增六 At+6（低音 A♭ 与上方 F♯ 成增六度）。" />
      <ul>
        <li><b>声部运动</b>（最直观）：前两组低音都是 G–G♭–F 半音下行、高音 G–G♯–A 半音上行，外声部反向扩张，内声部级进或保持；尤其内声部 E 与低音 G♭ 构成<b>增六度</b>，
          向外解决到 F 的八度——又是增六和弦的模式。Joshua 因此提议把它正式命名为<b>「日本」增六和弦 Jp+6</b>。</li>
        <li><b>功能</b>：把上方 C+ 看作下属调 F 大调的属变和弦 V+/IV，G♯ 半音解决到 F 和弦的三音 A，低音 G♭ 半音趋近 F；G♭ 也可纳入和弦，整体是 C 同时升、降五音的变和弦
          V♯5♭5/IV，按「用宽不用窄」把 G♭ 放在低音，与 G♯ 构成倍增八度，扩张解决到 F–A 的大十度。换成 Fm 时，G♯ 与 A♭ 等音保持，倍增八度等音为大九度，解决到小十度。</li>
        <li><b>逆向使用</b>：为保持「升号上行、降号下行」，C+/G♭ 等音改写为 <Play seq={["F2 C4 F4 A4", "F#2 C4 E4 Ab4", "G2 B3 D4 G4"]} gap={1}>A♭+/F♯ → G</Play>：低音 F–F♯–G 上行、高音 A–A♭–G 下行，外声部收缩。
          功能上它是 F♯ø♭3（vii ø♭3/V），C 大调的重属组变和弦。把 F♯ 与 A♭ 上下颠倒，A♭–F♯ 又成增六度，就是 5-3 提过的<b>奥地利增六</b> At+6（= A♭+7）。</li>
      </ul>
      <p>所以 blk 和弦能进行到低音下方或上方小二度的和弦，功能与非功能思路兼具。不妨试试在 2–5–1 里把属和弦换成 blk，看声部怎么处理；也可以想想它和三种游移和弦、
        三全音替换、高叠和弦（有人看作降五省三的属九，或省三加九的半减七）有什么关系。</p>
      <Callout tone="info" title="并非「沧海遗珠」">
        这类结构一百多年前就不新鲜了：柴可夫斯基《悲怆》第二乐章、拉赫玛尼诺夫《小岛》、斯克里亚宾《狂喜之诗》、普罗科菲耶夫《献给孩子们》之进行曲、
        瞿希贤《蝶恋花·答李淑一》里都能找到。以为是近年才被发现，是「涉猎不足、少见多怪」的达克效应。
      </Callout>
      <h4>小七度 = 增六度：每个含小七度的和弦都能当增六用</h4>
      <p>blk 和弦有望成为第四种游移和弦：上方是增三和弦，具备增三的游移性；又与属七、半减七关系密切，含一对三全音和两对小七度/大二度，可等音为两个不同的增六和弦，
        进行方向非常多。推而广之：<b>小七度与增六度等音</b>，所以和弦每含一对小七度，就可以等音成一个增六和弦使用。半减七和弦可等音为澳大利亚增六或特里斯坦和弦；
        小七和弦也能当增六用；属七降五可等音为两个法国增六，趋近到相距三全音的两个音；五声音阶 <Play notes="C4 D4 E4 G4 A4" arp={0.08}>C–D–E–G–A</Play> 里有 D–C、A–G、E–D 三对小七度，
        可等音为三个朝不同方向进行的增六和弦，原书戏称「中国增六」Cn+6。</p>
      <p>Blackadder 和弦与增六和弦一样，是对一类结构与用法的概括，具有功能和非功能的多重意义，内涵远超「属或副属组的变和弦」。桑桐在《半音化的历史演进》中也指出，
        浪漫派利用增六和弦的等音变换转向远关系和弦与远关系调，使之融半音性、紧张性、游移性与色彩性于一体。罗列这么多理论，不是为了「回字有几种写法」，
        而是为了在实践中想得到、用得上。（综合练习：瓦格纳《帕西法尔》第一幕「Nie tu' ich Gutes」唱段。）</p>
    </Block>

    {/* ───────── 8-4 ───────── */}
    <Block id="trans" toc="平移变换" kicker="8-4 · 平移变换" title="平行和声 = 网格上的平移"
      lead="德彪西《沉没的教堂》里的属七和弦整体平行移动，在网格上就是一块形状被原样平移。">
      <Narrate />
      <p>回忆 7-4 的平行和声：严格平动保持和弦结构不变，在网格上正是<C id="inversion_dualism">平移</C>（Translation），记作 Tx，x 是平移的半音数。
        <Play seq={["C", "G"]} gap={0.9}>T7(C) = G</Play>（向上纯五度）；因为十二个半音构成循环，T−5(C) 也是 G，只是低一个八度。同理 T−7(C) = T5(C) = F，T−1(C) = T11(C) = B。
        也就是说，如果 x + y = 12，那么 Tx = T−y。3-2 讲的移调，实质就是整段音乐的平移。</p>
      <p>前面反复出现的属七和弦连锁，就是和弦沿五度圈不断平移。一直上四度（T5）或下五度（T−7）很快就会太高或太低，所以实际采用 T5、T−7 交替的锯齿状进行：
        低音交替上下跳进，其余声部平稳连接。同一模式在不同音高上重复、连成一串，这叫<b>模进</b>（Sequence），下一章详谈。</p>
      <Progression title="谱例 8.29：属七和弦连锁的平移与模进" chords={["F#7", "B7", "E7", "A7", "D7", "G7", "C7", "C7", "F7", "Bb7", "Eb7", "Ab7", "Db7", "Gb7"]}
        bpm={100} beats={[2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4]} texture="pop" tonnetz={{ cols: 11, rows: 4, center: "C" }}
        caption="每个属七和弦都是前一个的 T5（或 T−7）：网格上的绿色四音形状一路向左平移。" />
    </Block>

    <Block id="mirror" toc="倒影与沉音列" kicker="8-4 · 倒影与沉音列 · 对称变换" title="照镜子：大三和弦的倒影是小三和弦"
      lead="以 C 为轴上下翻转 C 和弦：上方大三度 E 变成下方大三度 A♭，上方纯五度 G 变成下方纯五度 F。">
      <Narrate />
      <p>倒影（Inversion）或镜像（Mirroring）是巴洛克时代就广泛使用的技法，类似几何上的轴对称；最早多用于旋律（下一章详谈），这里关注和弦。
        以 C 为轴：<Play seq={["C4 E4 G4", "F3 Ab3 C4"]} gap={1}>C → Fm</Play>；七和弦同理，<Play seq={["C4 E4 G4 Bb4", "D3 F3 Ab3 C4"]} gap={1}>C7 → Dø</Play>。
        五度圈也能推算倒影：以 C–F♯ 为对称轴左右对折，F ↔ G、B♭ ↔ D、E♭ ↔ A、A♭ ↔ E、D♭ ↔ B。</p>
      <p>由此发现：大三和弦与小三和弦是镜像关系。十九世纪初的理论家称之为<b>二元性</b>（Dualism），它是里曼理论的出发点；Ernst Levy 称之为<b>极性</b>（Polarity）。
        和声的物理基础是泛音列，而镜像也有它的基础——<b>沉音列</b>（Undertone series），即泛音列以基音为轴的倒影：</p>
      <div className="card">
        <div><Play notes="C4 C5 G5 C6 E6 G6 Bb6 C7 D7 E7" melodic gap={0.35}>C 的泛音列（向上）</Play> <small>频率为基频的 1、2、3……倍；第 4、5、6 个音（C–E–G，4:5:6）构成大三和弦</small></div>
        <div style={{ marginTop: 6 }}><Play notes="C4 C3 F2 C2 Ab1 F1 D1 C1 Bb0 Ab0" melodic gap={0.35}>C 的沉音列（向下）</Play> <small>频率为基频的 1/2、1/3……；对应的 C–A♭–F（1/4 : 1/5 : 1/6）构成小三和弦 Fm</small></div>
        <div className="au-hint" style={{ marginTop: 4 }}>谱例 8.30（按平均律近似；沉音列的低音区很低，用耳机听更清楚）。</div>
      </div>
      <p>泛音列在物体发声时自然产生，沉音列却只能人工制造，这是沉音理论常被诟病的原因。但正如无理数、虚数、相对论起初也显得违背常理，说不定沉音里也藏着尚未发现的道理。
        今天它已有现实意义：以 125% 速度播放音频，频率乘 5/4，音高升大三度；降到 80%，频率乘 4/5，就进入了原音下方的「沉音区域」，整体降大三度。
        （想一想：C 大调的音乐以 150%、200%、75%、50% 的速度播放，各是什么调？DJ 混音时必须留意这种音高漂移。）</p>
      <h4>网格上：倒影 = 中心对称</h4>
      <Tonnetz cols={9} rows={4} center="C" highlight={["C", "Fm"]} unit={58} caption="图 8.49：C 与 Fm 关于 C 点中心对称。原书把它记作 Ic(C) = Fm；同理 Ic(C7) = Dø。" />
      <p>倒影在网格上变成以点为中心的<b>对称变换</b>，记作 Ix（x 为对称中心的音高）。按这个观点，8-1 的三个对角变换也都是对称的：N(C) = Ic(C) = Fm；
        S(C) = C♯m 以 E 为中心（Ie），Y(C) = Gm 以 G 为中心（Ig）。</p>
      <p>大三倒影成小三、属七倒影成半减七，性质都变了。有没有性质不变的？如果和弦音程结构上下对称、网格形状中心对称，倒影后性质不变，相当于原和弦的平移：
        <Play chord="C+" arp={0.05}>增三</Play>、<Play chord="C°7" arp={0.05}>减七</Play>都是。20 世纪的巴托克、梅西安有意围绕倒影轴上下对称叠置音程，造出<b>对称和弦</b>：
        巴托克爱用的 <Play notes="E3 G3 C4 Eb4" arp={0.06}>E–G–C–E♭</Play>（小三度—纯四度—小三度），转位成三度分裂和弦 <Play notes="C4 Eb4 E4 G4" arp={0.06}>Cs：C–E♭–E–G</Play> 仍然对称。
        这些和弦都不怎么协和——严格倒影几乎一定打破调性与功能，属于按数理思维设计的理性和声。</p>
      <p>与之相对的是<b>守调倒影</b>（Tonal inversion）：只镜像音程度数，性质随调内音阶调整。大小调的音级本身就暗含了关于主音的守调对称（上主音 / 下主音、中音 / 下中音、属音 / 下属音）。
        以 C 为轴在 C 大调中守调倒影 C 和弦：E 翻成 A，G 翻成 F，得 <Play seq={["C", "F"]} gap={0.9}>F</Play>；改在 G 大调中，G 只能翻成 F♯，得 <Play seq={["C", "F#dim"]} gap={0.9}>F♯°</Play>。
        守调倒影的效果更传统、和谐，与功能体系更相容。</p>
    </Block>

    <Block id="neg" toc="负极和声" kicker="8-4 · 负极和声" title="负极和声：以主、属正中为轴的镜像"
      lead="先听卡农进行的三个版本：原样、换成同名小调、做负极镜像。后两个都是 c 小调的和弦，却完全是两回事。">
      <Narrate />
      <Tabs tabs={[
        { label: "正像", content: <Progression key="k1" chords={["C", "G/B", "Am", "Em/G", "F", "C/E", "Dm", "G7", "C"]} keyName="C" bpm={84} beats={[2, 2, 2, 2, 2, 2, 2, 2, 4]} tonnetz={{ cols: 9, rows: 4, center: "C" }} /> },
        { label: "同名小调", content: <Progression key="k2" chords={["Cm", "G/B", "Ab", "Eb/G", "Fm", "Cm/Eb", "D°", "G7", "Cm"]} keyName="Cm" bpm={84} beats={[2, 2, 2, 2, 2, 2, 2, 2, 4]} tonnetz={{ cols: 9, rows: 4, center: "C" }} /> },
        { label: "负极", content: <Progression key="k3" chords={["Cm/Eb", "Fm", "Eb/G", "Ab", "Gm/Bb", "Cm", "Bb/D", "Fm6", "Cm"]} keyName="Cm" bpm={84} beats={[2, 2, 2, 2, 2, 2, 2, 2, 4]} tonnetz={{ cols: 9, rows: 4, center: "C" }}
          caption="谱例 8.35：外声部保持了倒影关系，所以负极版本也有平稳的低音线。" /> },
      ]} />
      <p>作为严格镜像的特例，选恰当的轴可以让和弦根音、冠音位置不变而结构上下翻转：<Play seq={["C", "Cm"]} gap={0.9}>C 原位翻转成 Cm</Play>，轴在 C 与 G 正中，即 E 与 E♭ 之间（原书用反写的降号表示「降 1/4 音」）；
        <Play seq={["C4 E4 G4 Bb4", "C4 Eb4 Gb4 Bb4"]} gap={0.9}>C7 原位翻转成 Cø</Play>，轴是 C 与 B♭ 正中的 F。对称和弦原位翻转后不变。</p>
      <p>对大小调来说，把轴放在主、属音正中间，主和弦就能原位翻转、镜像后主音不变：C 大调的 C 镜像为 Cm。这就是<C id="negative_harmony">负极和声</C>（Negative harmony）。
        思想可追溯到巴洛克的倒影与十九世纪的二元论，最早见于 Ernst Levy 1941 年的《A Theory of Harmony》，近年因 Jacob Collier 而走红。中文尚无统一译名，
        原书仿照物理的正负极译作「负极和声」（也有「负和声」「负面和声」「阴极和声」；「镜像和声」易与一般镜像混淆，不建议）。</p>
      <CompareTable left="同名大小调交替" right="负极和声（C 大调，轴在 E/E♭ 之间）" rows={[
        { aspect: "C（I）", left: "Cm（i）", right: "Cm（i）" },
        { aspect: "Dm（ii）", left: "D°（ii°）", right: "B♭（VII）" },
        { aspect: "Em（iii）", left: "E♭（III）", right: "A♭（VI）" },
        { aspect: "F（IV）", left: "Fm（iv）", right: "Gm（v）" },
        { aspect: "G（V）", left: "Gm（v）", right: "Fm（iv）" },
        { aspect: "Am（vi）", left: "A♭（VI）", right: "E♭（III）" },
        { aspect: "B°（vii°）", left: "B♭（VII）", right: "D°（ii°）" },
      ]} />
      <Tabs tabs={[
        { label: "三和弦：交替", content: <Progression key="n1" chords={["Cm", "D°", "Eb", "Fm", "Gm", "Ab", "Bb", "Cm"]} keyName="Cm" bpm={96} beats={2} /> },
        { label: "三和弦：负极", content: <Progression key="n2" chords={["Cm", "Bb", "Ab", "Gm", "Fm", "Eb", "D°", "Cm"]} keyName="Cm" bpm={96} beats={2}
          caption="谱例 8.33：音级顺序整个颠倒。自然大调音阶镜像后也不是小调，而是弗里几亚调式（12-2）。" /> },
      ]} />
      <p>七和弦更微妙。单看和弦，G7 镜像应是 Dø；但放在调中，为了让音级对应与三和弦一致，要拆成「三和弦 + 七音」：G 镜像成 Fm，七音 F 镜像成 D，附加在 Fm 上成为大六度，
        整体是 <Play seq={["G3 B3 D4 F4", "F3 Ab3 C4 D4"]} gap={1}>G7 → Fm6</Play>——与 Dø 等音，但根音不同。于是七和弦的负极都成了各种加六和弦（谱例 8.34）：</p>
      <div className="card">{NEG7.map(([a, an, b, bn]) => <span key={a} style={{ display: "inline-block", margin: "3px 10px 3px 0" }}>
        <Play seq={[an, bn]} gap={1}>{a} → {b}</Play></span>)}</div>
      <p>客观地说，这种处理是为了凑出更有意义的根音，多少有些刻意，到九、十一、十三和弦问题会更突出。另一个缺陷是<b>转位</b>：严格镜像把原和弦的最高音翻到低音，
        不论原来是 C、C/E 还是 C/G，只要最高声部是 C，镜像后的低音都是 G，一律成了 Cm/G。究竟严格倒影优先、保持转位优先，还是只看和弦性质，尚待理论厘清，
        目前只能折衷，优先照顾旋律与低音。下面的《生日快乐》所有和弦都写成原位：</p>
      <Tabs tabs={[
        { label: "大调", content: <Score key="h1" abc={HB_MAJ} meter="3/4" unit="1/4" tempo={100} accomp caption="谱例 8.36 上：C 大调原版（含 F♯°7、E7–D7–G7 等副属和弦）。" /> },
        { label: "同名小调", content: <Score key="h2" abc={HB_MIN} meter="3/4" unit="1/4" tempo={100} accomp caption="谱例 8.36 中：同名小调版本（旋律的 3、6 级降低）。" /> },
        { label: "负极", content: <Score key="h3" abc={HB_NEG} meter="3/4" unit="1/4" tempo={100} accomp caption="谱例 8.36 下：负极版本——旋律本身也被镜像（G ↔ C、A ↔ B♭、B ↔ A♭、D ↔ F），听起来像是从镜子里传来的歌。" /> },
      ]} />
      <p>负极思维能解释一些和声现象：浪漫派常见的 <Play seq={["F3 Ab3 C4", "E3 G3 C4"]} gap={1}>Fm–C</Play>、<Play seq={["F2 D4 Ab4 C5", "C3 E4 G4 C5"]} gap={1}>Dø/F–C</Play> 终止，
        今天可理解为 G、G7 的负极 Fm、Fm6。离调五度圈进行 E7–A7–D7–G7–CΔ 全部改成镜像，不仅五度方向调转，色彩也完全不同；正负和弦还可以混用：</p>
      <Tabs tabs={[
        { label: "正", content: <Progression key="f1" chords={["E7", "A7", "D7", "G7", "Cmaj7"]} roman={["V7/vi", "V7/ii", "V7/V", "V7", "IΔ"]} bpm={88} beats={[2, 2, 2, 2, 4]} tonnetz={{ cols: 10, rows: 4, center: "C" }} /> },
        { label: "负", content: <Progression key="f2" chords={["Abm6", "Ebm6", "Bbm6", "Fm6", "Abmaj7/C"]} roman={["A♭m6", "E♭m6", "B♭m6", "Fm6", "Cm♭6"]} bpm={88} beats={[2, 2, 2, 2, 4]} tonnetz={{ cols: 10, rows: 4, center: "C" }}
          caption="五度进行的方向反过来了：每一步向右（上五度）。最后的 Cm♭6 = A♭Δ/C。" /> },
        { label: "混合", content: <Progression key="f3" chords={["E7", "Ebm6", "D7", "Fm6", "Cmaj7"]} roman={["E7", "E♭m6（负）", "D7", "Fm6（负）", "CΔ"]} bpm={88} beats={[2, 2, 2, 2, 4]} tonnetz={{ cols: 10, rows: 4, center: "C" }}
          caption="谱例 8.37 第三组：正负穿插。试着自己再写一条。" /> },
      ]} />
      <p>小调同理：把对称轴放在小调主、属音正中（a 小调在 C 与 C♯ 之间），也能做出负极和声（原书图 8.54）。</p>
      <Callout tone="info" title="平移与倒影：古老又年轻">
        平移与倒影的理论 20 世纪才完全成熟，实际应用却早得多：中世纪已有雏形，后来在复调音乐中大显身手；模进、平行和声与平移有关，二元论、负极和声是倒影思想的延续。
        它们还用于序列主义、无调性理论、十二音技法，也是梅西安「有限移位调式」的基础，进阶篇再谈。
      </Callout>
    </Block>

    <Block id="cad" toc="终止式的发展" kicker="8-4 · 终止式的发展" title="终止不再只有「属—主」"
      lead="2-3 总结过古典终止式：以属—主、下属—主的五度关系迅速明确调性。浪漫派之后，作曲家用前几章的一切手段改造了它。">
      <Narrate />
      <h4>一、拖延：推迟主和弦的到来</h4>
      <Tabs tabs={[
        { label: "肖邦 Op.48 No.1", content: <Progression key="e1" title="谱例 8.41 示意：肖邦《c 小调夜曲》结尾" chords={["Cm", "G7", "Ab7", "Db/F", "G7", "Cm"]} roman={["i", "V7", "V7/N（阻碍）", "N6", "V7", "i"]}
          bpm={60} beats={[2, 2, 2, 2, 2, 4]} caption="属和弦本可一气呵成解决到主和弦，肖邦却突然用 V7/N–N6 阻碍，再完满终止，扩展出几小节尾声，给悲伤一个平复的空间。" /> },
        { label: "肖邦 Op.9 No.3", content: <Progression key="e2" title="谱例 8.40 示意：肖邦《B 大调夜曲》结尾" chords={["F#7", "G#m", "A#dim", "D#7", "E", "E#dim7", "F#7sus4", "F#7", "B"]}
          roman={["V7", "vi（阻碍）", "ii°/vi", "V7/vi", "VI/vi（再阻碍）", "vii°7/V", "V7sus4", "V7", "I"]} bpm={64} beats={[2, 2, 2, 2, 2, 2, 2, 2, 4]}
          caption="两次阻碍「调戏」听众；最后的属七先挂留（导音被主音替代，解决动力弱），完整的 V7 姗姗来迟，最终的正格终止格外满足。" /> },
        { label: "R. 施特劳斯《秋水仙》", content: <Progression key="e3" title="谱例 8.43 示意：理查·施特劳斯《秋水仙》Op.10 No.7 结尾" chords={["D7", "G7", "Cm", "F#dim7", "Gm", "F#dim7", "Gm"]}
          roman={["V7", "V7/iv", "iv", "vii°7", "i", "vii°7", "i"]} bpm={60} beats={[2, 2, 2, 2, 2, 2, 4]}
          caption="D7 本可直接到 Gm；作者改用主音上的属七引出下属离调，再重复两遍「导—主」。低音四小节主持续音提前完成了属—主终止；最后的主和弦落在弱拍、非根音旋律位置。" /> },
      ]} />
      <p>肖邦 Op.9 的三首夜曲是范例：第一首用 V7/N–N6–V7 阻碍终止，最后以主和弦上方半音的增六和弦结束到同主音大三和弦；第二首在 V7/V–V7–I 的 V7 上加入大段华彩，
        既拖延终止又增强期待；第三首用两次阻碍、挂留属和弦层层推迟。</p>
      <h4>二、替换：不用传统和弦</h4>
      <Tabs tabs={[
        { label: "勃拉姆斯第三交响曲", content: <Progression key="e4" title="谱例 8.42：勃拉姆斯《第三交响曲》第二乐章结尾" chords={["F", "C", "Ab", "C", "Ab", "Fm", "C"]} keyName="C" bpm={60} beats={[4, 2, 2, 4, 4, 4, 4]}
          caption="IV–I 变格进行之后，用中音关系的 ♭VI 继续推进、增加色彩，最后以 iv–I 收束。iv 既是小下属，也可看作 V 的负极。" /> },
        { label: "肖邦 Op.32 No.2", content: <Progression key="e5" title="谱例 8.45 示意：肖邦《A♭ 大调夜曲》补充终止" chords={["Eb7", "Ab", "Db", "Dbm6", "Ab"]} roman={["V7", "I", "IV", "iv6", "I"]} bpm={60} beats={[2, 4, 2, 2, 4]}
          caption="正格终止后的补充终止：旋律 A♭–B♭–C 全音上行，次高声部 F–F♭–E♭ 半音下行，构成 D♭m6（= B♭ø/D♭）。可看作调式交替，也可看作 E♭7 的负极。" /> },
        { label: "萨蒂", content: <p>萨蒂《裸体歌舞》（Gymnopédies，1888）第一首以 D 大调开头，却结束于 d 小调，和声多为较弱的三度进行，低音仍保留 2–5–1；第二首结尾用小属和弦 <Play seq={["Gm", "C"]} gap={1.1}>v–I</Play>，
          可视为降七级的混合利底亚调式。</p> },
      ]} />
      <h4>三、三度、二度、三全音代替四五度</h4>
      <Tabs tabs={[
        { label: "♭III–I（德彪西《月光》）", content: <Progression key="e6" chords={["Fb/Ab", "Db"]} roman={["♭III", "I"]} bpm={50} beats={[6, 6]} texture="arp"
          caption="谱例 8.46：德彪西《月光》结尾，变化中音关系，比五度柔和朦胧；低音仍保留 A♭–D♭ 的五度框架。" /> },
        { label: "vi7–iii7–ii7–I（拉威尔）", content: <Progression key="e7" chords={["Bbm7", "Fm7", "Ebm7", "Db"]} keyName="Db" bpm={60} beats={[2, 2, 2, 4]}
          caption="谱例 8.47 示意：拉威尔《小奏鸣曲》第二乐章结尾，D♭ 大调的属、下属和弦完全没有出现；声部中有许多平行运动，最后的主和弦落在弱拍。" /> },
        { label: "♭II7–I", content: <Progression key="e8" chords={["Dm7", "Db7", "Cmaj7"]} roman={["ii7", "subV7", "IΔ"]} bpm={72} beats={[2, 2, 4]} caption="三全音替换：根音小二度下行。" /> },
        { label: "半音平行（德彪西）", content: <Progression key="e9" chords={["C/Bb", "Db/Bb", "D/Bb"]} roman={["C", "D♭", "D"]} bpm={60} beats={[2, 2, 4]}
          caption="谱例 8.48 示意：《平原上的风》结尾，C–D♭–D 三个大三和弦在 B♭ 持续低音上半音平行上行，最后甚至没有完整的和弦——它结束在哪个调？" /> },
        { label: "三全音低音（斯克里亚宾）", content: <p>谱例 8.50：斯克里亚宾两首前奏曲的结尾，低音是极不协和的三全音进行，和弦叠置复杂、音响紧张，例如 <Play seq={["F#2 C4 E4 A#4", "C2 B3 E4 G4"]} gap={1.3}>（示意）</Play>。</p> },
      ]} />
      <p>最后的主和弦也可以用传统认为不完整、不协和、不稳定的结构：大七、小七、属七、属九、挂留、附加音，甚至不以主和弦结束。
        拉威尔《小奏鸣曲》第一乐章结尾用到 Am–F 的变化中音关系，最后的主和弦附加了九音：<Play seq={["Am", "F2 C4 F4 A4 G5"]} gap={1.3}>Am → Fadd9</Play>。爵士里以七、九乃至更复杂和弦收束更是家常便饭。</p>
      <Callout tone="key" title="没有什么「必须」">
        这些终止从古典观点看大多不够充满有力，有不同程度的「模糊暧昧」感，调性也被削弱；但它们是音乐发展的成果，在近现代极其常见，完全传统的终止反而越来越少。
        大小七和弦的命运最典型：从「必须正格解决」，到阻碍、变化、三全音替换、等音为增六、悬置不解决（特里斯坦）、延伸为高叠和弦、模进与平行，再到 8-3 的游移和弦，
        如今已几乎算协和稳定，爵士和流行常用它结束全曲。学音乐就是不断挑战旧观念、打破定式的过程：没有和弦必须解决，没有功能必须遵循，只有创作意图与风格的差异。
      </Callout>
    </Block>

    <Block id="ear" toc="听音练习" kicker="动耳朵" title="听音练习：变换与距离" lead="不看谱，只用耳朵。每题可以反复听。">
      <EarQuiz items={[
        { q: "从 C 出发，第二个和弦是经过哪一种变换得到的？", play: { seq: ["C4 E4 G4", "C4 Eb4 G4"], gap: 1 }, options: ["P", "L", "R"], answer: 0, why: "只有中间的音 E 降了半音：三音移动，是 P，C → Cm。" },
        { q: "这一次呢？", play: { seq: ["C4 E4 G4", "B3 E4 G4"], gap: 1 }, options: ["P", "L", "R"], answer: 1, why: "最低的根音 C 降半音到 B：L(C) = Em。" },
        { q: "从 Am 出发，第二个和弦是？", play: { seq: ["A3 C4 E4", "G3 C4 E4"], gap: 1 }, options: ["P", "L", "R"], answer: 2, why: "根音 A 降了全音到 G：R(Am) = C。" },
        { q: "C 之后的和弦和 C 有几个共同音？", play: { seq: ["C4 E4 G4", "C4 Eb4 Ab4"], gap: 1.1 }, options: ["两个（自然中音）", "一个（变化中音）", "零个（二重变化中音）"], answer: 1, why: "C → A♭：只保留 C，E→E♭、G→A♭ 各走半音，性质不变、整体平移大三度。" },
        { q: "这一对和弦呢？", play: { seq: ["C4 E4 G4", "B3 Eb4 Ab4"], gap: 1.1 }, options: ["两个", "一个", "零个"], answer: 2, why: "C → A♭m（G♯m）：三个音各走半音，没有共同音——六和弦循环的两极，H 关系。" },
        { q: "这个和弦把八度四等分，是哪一种？", play: { chord: "B°7", arp: 0.06 }, options: ["属七和弦", "减七和弦", "半减七和弦"], answer: 1, why: "B–D–F–A♭ 全是小三度：减七和弦，四个转位都长一个样。" },
      ]} />
    </Block>

    <Block id="concepts" toc="概念卡" kicker="核心概念" title="本章 13 个概念"><ConceptGrid /></Block>
    <Block id="map" toc="概念图" kicker="概念关系" title="它们怎样连在一起"><ConceptMap /></Block>

    <Block id="quiz" toc="自测" kicker="检验理解" title="自测">
      <Quiz questions={[
        { q: "R(C) 等于？", options: ["Cm", "Am", "Em", "F"], answer: 1, why: "R 把大三和弦的五音升全音（G→A），得到关系小三和弦 Am。" },
        { q: "用三元变换从 C 走到 G，最少几步？", options: ["一步", "两步", "三步", "五步"], answer: 1, why: "RL(C) = G：先 L 到 Em，再 R 到 G。步数为偶数，性质不变。" },
        { q: "从 C 交替做 P、L，形成的循环里根音构成？", options: ["大三度循环", "小三度循环", "五度圈", "半音阶"], answer: 0, why: "C–Cm–A♭–G♯m–E–Em：根音 C、A♭、E，是大三度循环（北方循环）。" },
        { q: "按巴托克轴心，C 大调中与 C 同属主轴、互为「极与对极」的是？", options: ["G", "F♯", "F", "D"], answer: 1, why: "主轴是 C–E♭–F♯–A，C 与 F♯ 相距三全音，位于同一轴的两端。" },
        { q: "减七和弦的任意一个音降半音，得到？", options: ["属七和弦", "半减七和弦", "小七和弦", "大七和弦"], answer: 0, why: "例如 A♭°7 的 A♭ 降成 G，得 G–B–D–F = G7；升半音则得半减七。" },
        { q: "C 大调的负极和声中，G7 一般变成？", options: ["Gm7", "Fm6（与 Dø 等音）", "Cm7", "D♭7"], answer: 1, why: "拆成三和弦 + 七音：G → Fm，七音 F → D，合成 Fm6；单看和弦是 Dø，但根音按调中音级对应取 F。" },
      ]} />
    </Block>

    <Block id="end" toc="小结">
      <Takeaways items={[
        "新黎曼理论把和弦关系看作操作：P、L、R 各保留两个音、移动一个音，在网格上是三角形沿三条边翻转；变换步数衡量和弦接近度，最多五步。",
        "S、N、Y 对角关系与变化中音只有一个共同音；浪漫派用中音进行代替刚硬的五度，让终止和调感变得柔和朦胧。",
        "PL 交替绕大三度六和弦一圈（勃拉姆斯、李斯特、柯川），PR 交替绕小三度八和弦一圈；巴托克轴心把小三度上的八个和弦归为同一功能。",
        "和弦的每个音都能单独升降：同族三和弦 6 种、七和弦 18 种；增三、减七、属七三种游移和弦是连接远距离和弦与调的枢纽，blk 和弦则是「日本增六」。",
        "平移即平行和声与模进，倒影让大三变小三；以主属正中为轴的镜像就是负极和声。终止式从此不再只有属—主。",
      ]} />
      <Bridge><p>这一章我们一直在看「下一个和弦去哪里」：翻一格、走两步、绕一圈、照一次镜子。8-4 已经提到，模进是同一模式的平移重复，倒影也最早用在旋律上——
        它们都是让音乐「成形」的手段。下一章「音乐的结构」把视野从两个和弦之间拉远到整首曲子：动机、乐句、乐段、模进与曲式，看和声怎样参与搭起一座完整的建筑。</p></Bridge>
    </Block>

    <Block id="gloss" toc="术语" title="术语表">
      <Glossary terms={[
        { term: "Neo-Riemannian theory", zh: "新黎曼理论", def: "由里曼的研究发展而来、以变换描述和弦关系的理论。" },
        { term: "Harmonic proximity", zh: "和声接近度", def: "两个和弦有多「近」：共同音越多、变换步数越少越近。" },
        { term: "P / R / L", zh: "平行 / 关系 / 导音变换", def: "三元变换：保留两个音、一个音移动半音或全音，大小三和弦互换。" },
        { term: "Weak / strong progression", zh: "弱进行 / 强进行", def: "按共同音与步数划分的进行力度；勋伯格另有升进行、降进行、超强进行。" },
        { term: "Slide (S) / Nebenverwandt (N)", zh: "同中音 / N 关系", def: "S = LPR，三音不动；N = PLR，大三到小下属。原书另称 PRL 为 Y。" },
        { term: "Chromatic mediant (CM)", zh: "变化中音", def: "根音相距三度、只有一个共同音的同性质和弦；没有共同音的叫二重变化中音。" },
        { term: "Hexatonic cycle / pole (H)", zh: "六和弦循环 / 六声极", def: "PL 交替形成的六和弦循环（东南西北）；循环两极为 H = PLP。" },
        { term: "Coltrane changes", zh: "柯川进行", def: "以大三度循环为框架、插入属七或 2–5 的进行，如《Giant Steps》。" },
        { term: "Axis system", zh: "轴心体系（巴托克轴心）", def: "Lendvai 理论：小三度循环上的八个和弦属同一功能；主支、副支；极与对极。" },
        { term: "Pantonality / Polytonality", zh: "泛调性 / 多调性", def: "多个调中心横向混用 / 纵向同时出现。" },
        { term: "Lattice", zh: "点阵", def: "和弦音各自升降形成的多维网络。" },
        { term: "Line cliché", zh: "线性套路 / 半音滑动", def: "持续和弦上某个声部做半音或全音级进以改变色彩。" },
        { term: "Vagrant (roving) chord", zh: "游移和弦", def: "调性归属模糊、可连接远距离和弦与调的和弦：增三、减七、属七。" },
        { term: "Cube dance / Power towers", zh: "方块之舞 / 输电塔", def: "增三和弦连接四组六和弦循环的网络 / 减七、属七、半减七、小七的网络。" },
        { term: "Isomorphic keyboard", zh: "同构键盘", def: "按几何规则排列音、同一结构指型不随调改变的键盘。" },
        { term: "Blackadder chord (Jp+6)", zh: "Blackadder 和弦（日本增六）", def: "低音上叠增三和弦，如 C+/G♭ → F。" },
        { term: "Translation (Tx)", zh: "平移", def: "和弦整体移动 x 个半音；平行和声、移调、模进。" },
        { term: "Inversion (Ix) / Mirroring", zh: "倒影 / 镜像", def: "以某音为轴上下翻转；网格上为中心对称。" },
        { term: "Dualism / Polarity", zh: "二元性 / 极性", def: "大三与小三互为镜像的观点。" },
        { term: "Undertone (subharmonic) series", zh: "沉音列", def: "泛音列以基音为轴的倒影，频率为基频的整数分之一。" },
        { term: "Symmetric chord / Tonal inversion", zh: "对称和弦 / 守调倒影", def: "结构上下对称的和弦 / 只镜像度数、性质随调调整的倒影。" },
        { term: "Negative harmony", zh: "负极和声", def: "以主、属音正中为轴的镜像和声：C ↔ Cm、G → Fm、G7 → Fm6。" },
      ]} />
    </Block>
  </ChapterPage>;
}
