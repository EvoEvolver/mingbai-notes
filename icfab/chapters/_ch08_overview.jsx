// 第 8 章（上）高层理解层：开场、路线图、推导图、核心概念、小结与自测。纯数据。
const R = String.raw;

export const HOOK_TITLE = "一片芯片要被“打”二三十次";
export const HOOK = R`打开任何一份先进 CMOS 工艺流程，你会数出二三十道离子注入：阱、防穿通、阈值调节、源漏延伸、晕环（halo）、源漏接触、多晶硅栅掺杂……剂量从 $10^{11}$ 跨到 $10^{16}\,\mathrm{cm^{-2}}$，能量从不到 1 keV 跨到数百 keV（图 8.3）。每一道都要求：放进去的杂质**不多不少**，停在**指定深度**，**只**落在光刻胶没盖住的地方。

奇妙的是，实现这种精度的手段相当"粗暴"：把杂质离子加速到每个上千倍于化学键能的能量，直接砸进晶体，一个离子沿途能撞飞成百上千个硅原子。单个离子走的是一条随机折线（图 8.4），落点完全不可预言；可是 $10^{13}$ 个离子的落点统计却可以算到几个纳米。

本章（上半）回答的就是这件事：剂量怎样被精确"数"出来；大量随机轨迹叠加成怎样的深度分布（高斯 → Pearson → 带沟道尾巴的双 Pearson）；掩模要多厚才挡得住；以及这一切背后的物理——离子靠什么停下来（核阻止与电子阻止），计算机怎样一个个离子地模拟它（Monte Carlo）。`;

export const ROADMAP = [
  { sec: "8.2", title: "注入机与高斯分布", gist: R`质量分析 $mv^2/r=qvB$ 选出单一离子；法拉第杯积分束流得到剂量 $Q$；大量离子的停止深度近似为以 $R_P$ 为中心、$\Delta R_P$ 为宽度的高斯分布，$Q=\sqrt{2\pi}\Delta R_PC_P$；退火扩散后按 $\Delta R_P^2\to\Delta R_P^2+2Dt$ 展宽。`, gives: ["8.1", "8.3", "8.4", "8.7", "8.9"], next: R`真实分布并不对称，还会被晶格"导"得更深——需要更好的一维描述。` },
  { sec: "8.3", title: "矩、Pearson 分布与沟道效应", gist: R`用四个矩（$R_P,\Delta R_P,\gamma,\beta$）刻画分布：轻离子负偏、重离子正偏；Pearson IV 由四个矩唯一确定形状；沿晶轴入射的离子可被"沟道"导向深处，形成长尾，用双 Pearson 建模、靠倾斜与预非晶化抑制。`, gives: ["8.10", "8.11", "8.12", "8.13"], next: R`实际注入几乎都穿过表面薄膜或被掩模部分挡住——多层靶怎么算？` },
  { sec: "8.4", title: "多层注入与掩蔽", gist: R`剂量匹配法逐层拼接分布；掩模厚度可按"界面浓度 $\le C_B$"定义（$x_{\rm m}=R_P+m\Delta R_P$），也可按"穿透剂量"定义（$Q_P=\tfrac Q2\operatorname{erfc}$）。`, gives: ["8.14", "8.16", "8.19"], next: R`掩模边缘下方的杂质会横向散开——进入二维。` },
  { sec: "8.5", title: "二维与三维分布", gist: R`单束元的点扩展函数 = 纵向分布 $\times$ 横向高斯；对开口积分得到 erfc 形的横向边缘；倾斜注入造成不对称。`, gives: ["8.20", "8.21"], next: R`这些"矩"从哪里来？要回到离子在固体中减速的物理。` },
  { sec: "8.6", title: "核阻止与电子阻止", gist: R`$dE/dx=-N[S_n(E)+S_e(E)]$：核阻止是与屏蔽库仑势的弹性二体碰撞，低能、重离子占优；电子阻止像黏滞阻力，$\propto v\propto E^{1/2}$。积分得射程 $R$，再换算到投影射程 $R_P$。`, gives: ["8.22", "8.23", "8.24", "8.25", "8.28", "8.30"], next: R`解析式只能估到"两倍以内"；要可靠就一个个离子去模拟。` },
  { sec: "8.7", title: "Monte Carlo 注入模拟", gist: R`二体碰撞近似（BCA）逐个追踪离子：非晶靶随机放置原子，晶体靶按晶格确定性散射；能算沟道、预非晶化、注入顺序、复杂结构，代价是计算量与统计噪声。`, gives: [], next: R`离子停下来以后留下的损伤怎样退火、又怎样让杂质"瞬态增强扩散"——第 8 章（下）。` },
];

export const EQMAP_DIST = [
  { from: "8.3", to: "8.5", label: "剂量 = 分布的积分" },
  { from: "8.4", to: "8.5", label: "代入" },
  { from: "8.6", to: "8.7", label: "高斯积分" },
  { from: "8.5", to: "8.7", label: "" },
  { from: "8.4", to: "8.8", label: R`浅注入、长扩散：视作表面 $\delta$ 源` },
  { from: "8.4", to: "8.9", label: R`$\Delta R_P^2\to\Delta R_P^2+2Dt$` },
  { from: "8.10", to: "8.11", label: "二阶矩" },
  { from: "8.11", to: "8.12", label: "三阶：偏度" },
  { from: "8.12", to: "8.13", label: "四阶：峰度" },
  { from: "8.5", to: "8.14", label: R`只积分到 $t_1$` },
  { from: "8.4", to: "8.15", label: "在掩模/衬底界面取值" },
  { from: "8.15", to: "8.16", label: R`令 $C(x_{\rm m})=C_B$ 解出` },
  { from: "8.4", to: "8.17", label: R`对 $x>x_{\rm m}$ 积分` },
  { from: "8.17", to: "8.19", label: "" },
  { from: "8.18", to: "8.19", label: "换元成 erfc" },
  { from: "8.4", to: "8.20", label: "乘横向高斯" },
  { from: "8.20", to: "8.21", label: "对开口叠加" },
];
export const EQMAP_STOP = [
  { from: "8.26", to: "8.27", label: "电子屏蔽" },
  { from: "8.25", to: "8.28", label: "对碰撞参数平均" },
  { from: "8.27", to: "8.28", label: "" },
  { from: "8.28", to: "8.22", label: R`核阻止 $S_n$` },
  { from: "8.29", to: "8.22", label: "化合物靶" },
  { from: "8.31", to: "8.30", label: "Si 中的系数" },
  { from: "8.30", to: "8.22", label: R`电子阻止 $S_e$` },
  { from: "8.22", to: "8.23", label: "分离变量积分" },
  { from: "8.23", to: "8.24", label: "折算到表面法向" },
];
export const EQMAP_LABELS = {
  "8.4": "高斯分布", "8.7": "剂量–峰值", "8.9": "扩散展宽", "8.16": "掩模厚度", "8.19": "穿透剂量", "8.21": "横向边缘",
  "8.22": "能量损失率", "8.23": "射程积分", "8.24": "投影射程", "8.28": "常数核阻止", "8.30": "电子阻止",
};

export const groups = [
  { id: "dist", label: "分布的描述" },
  { id: "struct", label: "结构、掩蔽与晶体" },
  { id: "phys", label: "阻止物理与模拟" },
];

export const concepts = [
  {
    id: "mass_analysis", name_zh: "质量分析与剂量计数", name_en: "Mass analysis & Faraday-cup dosimetry", icon: "🧲", section_id: "8.2", group: "struct",
    plain: R`磁场按 $m/q$ 筛选离子，法拉第杯数电荷：剂量是"数"出来的，不是"扩"出来的。`,
    explain: R`离子源产生的是一锅混合物（$\mathrm{BF_2}$ 气体会解离出 $\mathrm B^{++},\mathrm B^+,\mathrm F^+,\mathrm{BF}^+,\mathrm{BF_2}^+$，还分 $^{10}\mathrm B$、$^{11}\mathrm B$）。经同一引出电压后各离子动能相同 $qV_{\rm ext}$，进入磁场后回旋半径 $r=\sqrt{2mV_{\rm ext}/q}/B$ 只取决于 $m/q$，狭缝只放过一种。

剂量则由束流积分得到：$Q=\frac1A\int\frac Iq\,dt$。电流可以测得极准，所以剂量重复性远好于扩散预淀积。中性化的原子既不能被静电扫描也不被计数，所以束线末端有一段偏转把它们甩进陷阱。`,
    analogy: "像自动售票闸机：磁铁是只认某种票（m/q）的闸口，法拉第杯是计数器——过一个记一个，进站人数精确到个位。",
    book_example: { what: R`式 (8.1)–(8.3)，图 8.1 注入机示意，图 8.2 高束流注入机与转盘式靶室。`, point: "剂量精确可控是注入取代扩散预淀积的首要原因。" },
    misconception: R`"能量 = 加速电压"只对单电荷离子成立；双电荷离子 $\mathrm B^{++}$ 在同样电压下获得两倍能量，这正是用低压机器得到高能注入的老办法。`,
  },
  {
    id: "range_straggle", name_zh: "投影射程与离散", name_en: "Projected range & straggle", icon: "🎯", section_id: "8.2", group: "dist",
    plain: R`$R_P$ 是落点的平均深度，$\Delta R_P$ 是落点深度的标准差。`,
    explain: R`每个离子走一条随机折线，总路程 $R$ 大于它在法向上的投影深度。大量离子的停止深度的平均值叫投影射程 $R_P$，标准差叫离散（straggle）$\Delta R_P$。

能量越高，$R_P$ 越深；同样能量下轻离子（B）比重离子（As、Sb）走得深得多，分布也更宽。表 8.1 给出常用杂质在非晶 Si 中的数值，例如 100 keV 时 B 约 $296\,\mathrm{nm}$，As 约 $69\,\mathrm{nm}$。`,
    analogy: "像往沙坑里投很多颗弹珠：每颗陷进去的深度不同，平均深度是 $R_P$，深浅的分散程度是 $\\Delta R_P$。",
    book_example: { what: "表 8.1；图 8.5 四种杂质 100 keV、$10^{15}\\,\\mathrm{cm^{-2}}$ 的高斯分布。", point: "工艺工程师选能量，本质是选 R_P。" },
    misconception: R`$R_P$ 不是"离子走过的路程"——那是总射程 $R$；两者之比与质量比有关 \eqref{8.24}。`,
  },
  {
    id: "gaussian", name_zh: "高斯近似与剂量–峰值关系", name_en: "Gaussian profile", icon: "🔔", section_id: "8.2", group: "dist",
    plain: R`一阶近似下注入分布是高斯：$C_P=Q/(\sqrt{2\pi}\Delta R_P)$，峰在 $R_P$。`,
    explain: R`把注入分布写成以 $R_P$ 为中心、标准差 $\Delta R_P$ 的高斯 \eqref{8.4}。对全空间积分得 $Q=\sqrt{2\pi}\Delta R_PC_P$：知道剂量与离散，峰值浓度就定了。距峰 $\pm\Delta R_P$ 处浓度降到 $0.606C_P$，$\pm2\Delta R_P$ 处降到 $0.135C_P$。

退火扩散时，高斯与扩散核（也是高斯）卷积仍是高斯，只需把 $\Delta R_P^2$ 换成 $\Delta R_P^2+2Dt$ \eqref{8.9}；若注入很浅、扩散很长，则可当作表面 $\delta$ 源，得到一侧高斯 \eqref{8.8}。`,
    analogy: "注入像往池子里一次性倒一勺墨水：刚倒下去是一团（宽度 $\\Delta R_P$），之后扩散只是让这团墨越摊越开，形状仍是那个钟形。",
    book_example: { what: "式 (8.4)–(8.9)；图 8.6 浅注入与深注入的扩散。", point: "高斯近似足以做大多数手算估计（掩模、结深、峰值）。" },
    misconception: "高斯在 $x<0$ 处的部分被忽略了；当 $R_P$ 与 $\\Delta R_P$ 可比时（低能、轻离子）这会造成剂量误差。",
  },
  {
    id: "moments", name_zh: "四个矩与 Pearson 分布", name_en: "Moments & Pearson IV", icon: "📐", section_id: "8.3", group: "dist",
    plain: R`再加两个矩：偏度 $\gamma$ 说明歪向哪边，峰度 $\beta$ 说明尾巴有多重。`,
    explain: R`任何分布都可以用矩来描述：一阶矩 $R_P$、二阶矩 $\Delta R_P$、三阶偏度 $\gamma$、四阶峰度 $\beta$。轻离子（B）撞到较重的 Si 原子时容易大角度反弹，把分布的浅侧"填满"，$\gamma<0$；重离子（Sb）几乎只能向前散射，$\gamma>0$。

Pearson 曲线族由一个简单的微分方程定义，其系数由四个矩唯一决定；常用的 IV 型（对应 $\gamma,\beta$ 的一片区域）能描述单峰、偏斜、带重尾的注入分布，模拟器用查表的矩生成分布。`,
    analogy: "描述一座山：海拔最高点的位置（$R_P$）、山的宽度（$\\Delta R_P$）、哪一侧坡缓（$\\gamma$）、山脚延伸得有多远（$\\beta$）。",
    book_example: { what: "式 (8.10)–(8.13)；图 8.8 B 与 Sb 的高斯/Pearson 对比。", point: "B 的 Pearson 分布向表面偏，Sb 向深处偏。" },
    misconception: R`按 (8.13) 的定义 $\beta$ 恒为正，高斯 $\beta=3$；"峰度为正/负"指的是超额峰度 $\beta-3$，而且 $\beta>3$ 是两翼**更重**（不是更轻）。`,
  },
  {
    id: "channeling", name_zh: "沟道效应", name_en: "Channeling", icon: "🕳️", section_id: "8.3", group: "struct",
    plain: "离子顺着晶体中敞开的原子“隧道”滑行，走得远超预期。",
    explain: R`沿 $\langle110\rangle$ 等低指数晶向看，金刚石晶格里有一排排敞开的通道（图 8.9）。离子若一进入就对准通道，通道壁上原子给它的都是小角度"轻推"，把它导向通道中心；只有电子阻力慢慢消耗它的能量，于是形成远超高斯预测的深尾（图 8.10）。

对策：倾斜与旋转晶圆（常用 $7^\circ$），表面加一层非晶的屏蔽氧化层，或先用 Si 等离子预非晶化。剂量越大，被撞离格点的原子越多，通道被"堵"，沟道越弱。模拟器用双 Pearson（随机部分 + 沟道部分）建模。`,
    analogy: "在整齐种植的果园里，沿着树行方向扔一颗球能滚得很远；斜着扔，很快就撞到树干停下。",
    book_example: { what: "图 8.9–8.11：[110] 沟道；P 的剂量依赖；B 的倾角依赖；图 8.20 预非晶化消除 As 沟道。", point: R`即使倾斜 $10^\circ$，B 的沟道尾巴仍不可忽略。` },
    misconception: R`倾斜 $7^\circ$ 并不能完全消除沟道：离子在表层散射后仍可能被"捕获"进其他通道。`,
  },
  {
    id: "dose_matching", name_zh: "多层靶与剂量匹配", name_en: "Dose matching", icon: "🧱", section_id: "8.4", group: "struct",
    plain: "穿过一层材料后，下一层的分布从“等效已穿过的深度”接着画。",
    explain: R`不同材料的矩不同。剂量匹配法：先用材料 1 的矩算出停在材料 1 里的剂量 $Q_1$；再假设整个靶都是材料 2，求出"装下 $Q_1$ 所需的材料 2 厚度 $x'$"；材料 2 中的真实分布就取这条曲线从 $x'$ 开始的那一段。逐层重复直到衬底。

这样保证了剂量守恒，但分布在界面处可能不连续（图 8.13）。`,
    analogy: "像换乘交通工具：你已经用掉的“路程预算”换算成新车的里程，然后在新车的时刻表上从对应的站点接着走。",
    book_example: { what: R`式 (8.14)；图 8.12、8.13（80 nm $\mathrm{Si_3N_4}$ 上的 P 注入）。`, point: "界面处的不连续是方法的产物，不是物理。" },
    misconception: "不能把各层的分布简单地按厚度平移拼接——那样剂量不守恒。",
  },
  {
    id: "masking", name_zh: "掩蔽判据", name_en: "Mask thickness criteria", icon: "🛡️", section_id: "8.4", group: "struct",
    plain: R`掩模要厚到 $R_P+m\Delta R_P$，或使穿透剂量 $\tfrac Q2\operatorname{erfc}(\cdot)$ 足够小。`,
    explain: R`高斯尾巴永远不为零，"挡住"必须先定义。浓度判据：要求掩模/衬底界面处浓度不超过衬底背景 $C_B$，得 $x_{\rm m}=R_P+\Delta R_P\sqrt{2\ln(C_P/C_B)}$，典型 $m\approx4$–$5$。剂量判据：要求穿过掩模的总剂量 $Q_P=\frac Q2\operatorname{erfc}[(x_{\rm m}-R_P)/(\sqrt2\Delta R_P)]$ 小于容许值——对 MOSFET 沟道尤其重要，因为阈值电压取决于总电荷。

两点要牢记：矩要用**掩模材料**的；能量一变，原来够厚的掩模可能就不够了（例题中 50 keV→80 keV，穿透剂量升到 $2\times10^{13}\,\mathrm{cm^{-2}}$）。`,
    analogy: "防洪堤高度：可以按“堤内水位不超过某线”设计，也可以按“漫过的总水量不超过某值”设计；两种标准给出的高度不同。",
    book_example: { what: "式 (8.15)–(8.19)；图 8.14；多晶硅栅掩蔽 As 源漏注入的例题。", point: R`$m$ 只以 $\sqrt{\ln}$ 依赖于浓度比，所以掩模厚度对 $C_B$ 不敏感，对 $R_P$、$\Delta R_P$ 很敏感。` },
    misconception: "掩模只要比 $R_P$ 厚一点就够——错，必须再加几个 $\\Delta R_P$，否则尾部会把可观剂量送进衬底。",
  },
  {
    id: "lateral", name_zh: "横向离散与点扩展函数", name_en: "Lateral straggle", icon: "↔️", section_id: "8.5", group: "dist",
    plain: R`离子也会横向散开 $\Delta R_{\rm lat}$，掩模边缘下方的分布呈 erfc 形。`,
    explain: R`一束细束注入后的二维分布近似为"纵向分布 $\times$ 横向高斯"\eqref{8.20}，叫点扩展函数。对整个开口叠加，横向边缘就是两个 erfc 之差 \eqref{8.21}：掩模边缘处浓度恰为开口中心的一半，向掩模下方按 $\Delta R_{\rm lat}$ 的尺度衰减。

这决定了源漏与栅的交叠，从而影响短沟道器件。倾斜注入（如 $30^\circ$）会让两侧不对称，必须用 $\pm$ 多个方向补偿。`,
    analogy: "用喷枪透过镂空模板喷漆：模板边缘下面总有一圈渐淡的雾边，宽度由喷雾的扩散角决定。",
    book_example: { what: "式 (8.20)–(8.21)；图 8.15 As 在栅边缘的剖面；图 8.16、8.17 的 0° 与 30° 注入模拟。", point: "30° 倾斜时一侧的 N+ 区与栅分离，器件不能工作。" },
    misconception: "掩模边缘下方的浓度并不是陡然降到零；对 $\\Delta R_{\\rm lat}$ 与器件尺寸可比的先进节点，这一点非常关键。",
  },
  {
    id: "stopping", name_zh: "核阻止与电子阻止", name_en: "Nuclear & electronic stopping", icon: "🛑", section_id: "8.6", group: "phys",
    plain: R`$dE/dx=-N(S_n+S_e)$：撞原子核（弹性、造成损伤）+ 电子拖拽（非弹性、生热）。`,
    explain: R`核阻止：离子与被电子屏蔽的靶原子核发生弹性二体碰撞，传给靶原子的能量最多为 $4m_1m_2E/(m_1+m_2)^2$，是产生损伤的根源；它在低能端最强，对重离子很大。电子阻止：离子穿过电子云受到类似黏滞的阻力，正比于速度 $\propto E^{1/2}$，与离子种类关系不大。

两者交叉的能量对 B 约 10 keV、对 P 约 100–200 keV、对 As 超过 1 MeV：所以 As 全程以核阻止为主、沿途都在造成损伤；B 在大部分路程上以电子阻止为主，损伤集中在路径末端。`,
    analogy: "保龄球穿过一片人群（电子）与一排排木桩（原子核）：人群像黏稠的阻力一直在减速；撞木桩则是一次次剧烈的弹开，并把木桩撞倒（损伤）。",
    book_example: { what: "式 (8.22)–(8.31)；图 8.19 B、P、As 在 Si 中的阻止本领。", point: "图 8.19 解释了图 8.5 中轻离子为何走得远：同能量下速度大，核阻止弱。" },
    misconception: "“核阻止”与核力无关，是原子核之间的库仑散射（“台球碰撞”）。",
  },
  {
    id: "lss", name_zh: "LSS 射程理论", name_en: "LSS range theory", icon: "📏", section_id: "8.6", group: "phys",
    plain: R`把 $S_n$、$S_e$ 代入 $R=\frac1N\int dE/(S_n+S_e)$，就能估出任意离子的射程。`,
    explain: R`1963 年 Lindhard、Scharff、Schiøtt 把屏蔽库仑散射与电子阻止统一起来，可以对任意离子–单质靶组合算出阻止本领，精度约在两倍以内。简化版本：$S_n$ 取常数 \eqref{8.28}，$S_e=kE^{1/2}$，积分有闭式解；再用 $R_P\approx R/(1+m_2/3m_1)$ 把总路程折算成投影深度。

化合物靶（$\mathrm{SiO_2}$、GaAs）可以用 Bragg 规则把各元素的阻止本领相加。`,
    analogy: "像估算一辆车滑行多远：知道空气阻力（电子阻止）与路面摩擦（核阻止）随速度怎样变化，积分就得到刹车距离。",
    book_example: { what: "式 (8.23)、(8.24)、(8.28)–(8.31)。", point: "用这些简式对 As 100 keV 可估到 64 nm（表 8.1：69 nm）。" },
    misconception: "常数 S_n 近似对 As 尚可，对 B 很差（图 8.19 中 B 的核阻止随能量变化很大）。",
  },
  {
    id: "monte_carlo", name_zh: "Monte Carlo 与二体碰撞近似", name_en: "Monte Carlo (BCA)", icon: "🎲", section_id: "8.7", group: "phys",
    plain: "一个个离子地模拟碰撞与减速，统计落点得到分布——慢但通用。",
    explain: R`二体碰撞近似（binary collision approximation, BCA）：离子每次只与一个靶原子发生弹性碰撞，散射角由屏蔽势确定，碰撞之间受连续的电子阻力。非晶靶中原子随机放置、平均间距 $N^{-1/3}$；晶体靶中原子按晶格排列，轨迹由入射方向（倾斜、旋转）确定性地决定，于是自然包含沟道效应。

同时记录被撞离格点的原子，就能预测损伤与非晶化，进而预测预非晶化对沟道的抑制、两次注入的顺序效应。代价是计算时间与离子数成正比、统计噪声随离子数减少而增大（图 8.22）。`,
    analogy: "与其推导一条河的平均流速，不如放一万只小纸船进去，看它们最后搁浅在哪里。",
    book_example: { what: "图 8.4（UT-Marlowe）、图 8.20–8.23（Victory Process）。", point: "Monte Carlo 是多层结构、晶体靶、缺乏实验矩表时的首选方法。" },
    misconception: "离子数越多越好——精度确实随离子数提升，但计算量线性增长；尾部（低浓度区）需要的离子数尤其多。",
  },
];

export const relations = [
  { from: "mass_analysis", to: "range_straggle", label: "单一离子与能量" },
  { from: "range_straggle", to: "gaussian", label: "前两个矩" },
  { from: "gaussian", to: "moments", label: "推广到四个矩" },
  { from: "moments", to: "channeling", label: "双 Pearson" },
  { from: "gaussian", to: "masking", label: "尾部 erfc" },
  { from: "dose_matching", to: "masking", label: "多层特例" },
  { from: "gaussian", to: "lateral", label: "横向乘积" },
  { from: "stopping", to: "lss", label: "积分得射程" },
  { from: "lss", to: "range_straggle", label: "解释 R_P" },
  { from: "stopping", to: "moments", label: "解释偏度" },
  { from: "stopping", to: "monte_carlo", label: "物理输入" },
  { from: "monte_carlo", to: "channeling", label: "晶体靶自然包含" },
  { from: "channeling", to: "monte_carlo", label: "预非晶化" },
];

export const TAKEAWAYS = [
  R`**剂量是数出来的**：质量分析 $mv^2/r=qvB$ 选离子，法拉第杯积分 $Q=\frac1A\int\frac Iq\,dt$；这是注入相对扩散预淀积的根本优势。`,
  R`**高斯一阶近似**：$C(x)=C_P\exp[-(x-R_P)^2/2\Delta R_P^2]$，$Q=\sqrt{2\pi}\Delta R_PC_P$；扩散后 $\Delta R_P^2\to\Delta R_P^2+2Dt$。$R_P$、$\Delta R_P$ 查表 8.1。`,
  R`**更真实的分布**：用 $\gamma$、$\beta$ 构造 Pearson IV（B 负偏、Sb 正偏）；晶体中的沟道产生深尾，用双 Pearson 建模，用倾斜、屏蔽氧化层、预非晶化抑制。`,
  R`**掩蔽**：$x_{\rm m}=R_P+\Delta R_P\sqrt{2\ln(C_P/C_B)}$；穿透剂量 $Q_P=\frac Q2\operatorname{erfc}[(x_{\rm m}-R_P)/\sqrt2\Delta R_P]$；多层靶用剂量匹配；横向边缘为 erfc 形。`,
  R`**阻止物理**：$dE/dx=-N(S_n+S_e)$；核阻止（弹性、造成损伤）低能重离子占优，电子阻止 $\propto E^{1/2}$；B 约 10 keV 以下、As 全程以核阻止为主。Monte Carlo（BCA）逐离子模拟，自然包含沟道与损伤。`,
];

export const QUIZ = [
  {
    q: R`同一束流中，$^{11}\mathrm B^+$ 与 $^{10}\mathrm B^+$ 经相同引出电压后进入分析磁铁，哪个回旋半径大？`,
    options: [R`$^{10}\mathrm B^+$`, "一样大，因为能量相同", R`$^{11}\mathrm B^+$`, "取决于磁场方向"],
    answer: 2, why: R`$r=mv/(qB)=\sqrt{2mV_{\rm ext}/q}/B\propto\sqrt m$：能量相同时重的那个动量大、半径大。`,
  },
  {
    q: R`把剂量加倍而能量不变，高斯分布会怎样？`,
    options: ["峰值加倍，峰位与宽度不变", "峰位变深", "宽度加倍", R`峰值增加 $\sqrt2$ 倍`],
    answer: 0, why: R`$R_P$、$\Delta R_P$ 只由离子与能量（以及靶）决定，$C_P=Q/(\sqrt{2\pi}\Delta R_P)$ 与 $Q$ 成正比。（极高剂量下的饱和、溅射等效应不在此近似中。）`,
  },
  {
    q: R`100 keV 的 B 注入分布的 Pearson 拟合偏度 $\gamma$ 通常为负，物理原因是：`,
    options: ["B 扩散快，向表面外扩散", "轻离子撞上较重的 Si 原子容易大角度反弹，填充浅侧", "电子阻止使 B 更快停下", "沟道效应"],
    answer: 1, why: R`$m_1<m_2$ 时离子可被大角度散射甚至向后；重离子（Sb）只能向前偏转，所以 $\gamma>0$。`,
  },
  {
    q: R`某掩模按 $C(x_{\rm m})=C_B$ 设计，若把背景浓度要求从 $10^{16}$ 收紧到 $10^{15}\,\mathrm{cm^{-3}}$（$C_P\sim10^{20}$），所需厚度大约：`,
    options: ["增加 10 倍", R`只增加约半个到一个 $\Delta R_P$`, R`增加 $\ln10$ 倍`, "不变"],
    answer: 1, why: R`$m=\sqrt{2\ln(C_P/C_B)}$：从 $\sqrt{2\ln10^4}=4.29$ 到 $\sqrt{2\ln10^5}=4.80$，只多约 $0.5\Delta R_P$。`,
  },
  {
    q: "为什么 As 注入几乎全程都在制造晶格损伤，而 B 的损伤集中在射程末端？",
    options: ["As 的电子阻止更大", "B 不会产生核碰撞", "As 的核阻止在注入能量范围内始终高于电子阻止，B 只有在 10 keV 以下才以核阻止为主", "As 化学活性更强"],
    answer: 2, why: R`核碰撞是弹性的，把能量交给晶格原子；图 8.19 中 As 的 $S_n$ 在 1 MeV 以下都高于 $S_e$，B 则相反。`,
  },
  {
    q: "Monte Carlo 注入模拟中把离子数从 500,000 减为 5,000，主要后果是：",
    options: ["平均射程明显变浅", "分布形状定性不变，但尾部出现明显的统计噪声与截断", "沟道效应消失", "不再能处理多层结构"],
    answer: 1, why: R`统计误差约 $\propto1/\sqrt{n}$；低浓度尾部每个深度箱里只有个位数离子，曲线呈台阶状（图 8.22）。`,
  },
];

export const BRIDGE = R`本章上半把"离子停在哪里"讲完了：它们的分布、掩蔽与阻止物理。但离子停下来时，沿途已把成百上千个 Si 原子撞离格点——低剂量时形成点缺陷与团簇，高剂量时整层非晶化。第 8 章（下）接着讨论：损伤怎样产生、怎样在退火中修复（固相外延、{311} 缺陷、射程末端位错环），杂质怎样被激活，以及过剩间隙原子怎样在退火初期引起杂质的**瞬态增强扩散**（TED）——它往往比注入本身更决定最终结深。`;
