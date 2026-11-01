// 第 4 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "一粒 0.1 微米的灰尘值多少钱？";
export const HOOK = R`一片 300 mm 晶圆走完先进逻辑工艺要经过上千道工序、耗时两三个月，加工成本可达上万美元；上面排着几百颗芯片，每颗售价可能数百美元。只要一粒比病毒还小的颗粒在某次光刻时恰好落在晶体管的栅上，那颗芯片就报废了；只要每立方厘米的硅里多出 $10^{12}$ 个铁原子——相当于每 500 亿个硅原子里混进一个——DRAM 就记不住数据。

所以晶圆厂里有三道看不见的防线：比手术室干净上万倍的空气、一套半个世纪前在 RCA 实验室定下的化学清洗配方、以及一个巧妙的"缓兵之计"——把漏网的金属原子引诱到晶圆深处的氧化物沉淀里关起来。三道防线守得多好，最后都体现在一个数字上：**良率**。本章会把这些"工厂常识"变成可以计算的物理与统计：颗粒浓度如何随尺寸按幂律分布，为什么双氧水能把铁从硅片上剥下来，金属在硅中跑得有多快，以及为什么缺陷"扎堆"反而让大芯片的良率更高。`;

export const ROADMAP = [
  { sec: "4.1", title: "为什么干净决定成败", gist: R`良率随面积指数下降；可动离子使阈值漂移 $qQ_{\rm M}/C_{\rm ox}$，深能级金属使寿命 $\tau_G=1/\sigma v_{\rm th}N_t$ 缩短——把 ITRS 规格换算成器件物理。`, gives: ["4.1", "4.2"], next: R`知道了要多干净，第一步是让环境干净。` },
  { sec: "4.2", title: "第一道防线：洁净室", gist: R`ISO 等级的幂律 $10^N(0.1/D)^{2.08}$；HEPA 与层流；人、设备、化学品与纯水（$18\,\mathrm{M\Omega\,cm}$ 的来历）。`, gives: ["4.3", "4.4"], next: R`环境再干净，颗粒和薄膜仍会上片，需要清洗。` },
  { sec: "4.3", title: "第二道防线：晶圆清洗", gist: R`去胶 + RCA（SC-1/SC-2）；用氧化电位表判断谁被氧化、谁被镀回；后道与化合物半导体的差异。`, gives: ["4.5", "4.6"], next: R`清洗只管表面；已进入硅里的金属要靠吸杂。` },
  { sec: "4.4", title: "第三道防线：吸杂", gist: R`释放（踢出/离解）→ 扩散（Arrhenius，金属极快）→ 俘获（体内氧沉淀 / 背面损伤）。洁净区靠氧外扩散；背面吸杂可能受 I 注入限速。`, gives: ["4.7", "4.9", "4.10", "4.11", "4.12", "4.13"], next: R`同一套深能级物理，反过来也能用来"设计"寿命。` },
  { sec: "4.5", title: "寿命控制", gist: R`SRH 复合率在禁带中央最大；$\tau_R\propto1/N_t$。功率器件用扩金或辐照有意引入陷阱。`, gives: ["4.15", "4.16"], next: R`回到底线：缺陷最终如何决定良率？` },
  { sec: "4.6", title: "功能良率模型", gist: R`Poisson $e^{-A_CD_{\rm O}}$；Murphy 积分对缺陷密度起伏求平均 → 负二项（Gamma）与 Seeds（指数）；多道工序良率相乘。`, gives: ["4.20", "4.21", "4.22", "4.23", "4.26"], next: R`没有缺陷的芯片也有性能差异。` },
  { sec: "4.7", title: "参数良率与过程控制", gist: R`正态分布、规格限、$C_p$ 与 $C_{pk}$；控制图；新工艺的良率爬坡。`, gives: ["4.27"], next: R`回顾全章。` },
  { sec: "4.8", title: "要点回顾", gist: R`三道防线 + 良率是底线。` },
];

export const EQMAP_CONTAM = [
  { from: "4.1", to: "4.2", label: "两种器件失效机制" },
  { from: "4.6", to: "4.5", label: R`比较氧化电位` },
  { from: "4.7", to: "4.9", label: R`$\mathrm{Au_i}$ 才能快扩散` },
  { from: "4.8", to: "4.9", label: "" },
  { from: "4.10", to: "4.12", label: "过饱和驱动析出" },
  { from: "4.11", to: "4.12", label: "扩散控制长大" },
  { from: "4.12", to: "4.13", label: "沉淀/损伤做陷阱" },
  { from: "4.13", to: "4.14", label: R`$\mathrm N^+$ 中 $\mathrm{V^-}$ 多` },
  { from: "4.15", to: "4.16", label: R`小注入极限` },
  { from: "4.2", to: "4.16", label: "同一式子" },
];
export const EQMAP_YIELD = [
  { from: "4.17", to: "4.19", label: "计数论证" },
  { from: "4.18", to: "4.19", label: R`除以 $C^M$` },
  { from: "4.19", to: "4.20", label: R`$C\to\infty$` },
  { from: "4.20", to: "4.21", label: R`对 $D$ 的分布求平均` },
  { from: "4.21", to: "4.22", label: R`$f$ 取 Gamma` },
  { from: "4.21", to: "4.23", label: R`$f$ 取指数` },
  { from: "4.22", to: "4.24", label: R`$C\to\infty$` },
  { from: "4.22", to: "4.25", label: R`$C=1$` },
  { from: "4.22", to: "4.26", label: "逐道相乘" },
];
export const EQMAP_LABELS = {
  "4.1": "可动离子与阈值", "4.2": "SRH 产生寿命", "4.3": "ISO 洁净度", "4.5": "硅的氧化", "4.6": "金属的溶解",
  "4.7": "踢出机制", "4.8": "离解机制", "4.9": "Arrhenius 扩散", "4.10": "氧固溶度", "4.11": "氧扩散系数", "4.12": "氧沉淀反应",
  "4.13": "陷阱束缚比例", "4.14": "空位俘获 Au", "4.15": "SRH 复合率", "4.16": "复合寿命",
  "4.17": "良率的一般形式", "4.18": "无缺陷的分配数", "4.19": "单芯片无缺陷概率", "4.20": "Poisson 模型", "4.21": "Murphy 积分",
  "4.22": "负二项模型", "4.23": "Seeds 模型", "4.24": R`$C\to\infty$ 极限`, "4.25": R`$C=1$ 极限`, "4.26": "多工序累积",
};

export const groups = [
  { id: "env", label: "洁净与清洗" },
  { id: "getter", label: "吸杂与深能级" },
  { id: "yield", label: "良率与控制" },
];

export const concepts = [
  {
    id: "defect_types", name_zh: "系统性缺陷与随机缺陷", name_en: "Systematic vs random defects", icon: "🎯", section_id: "4.1", group: "yield",
    plain: "开发期的敌人是“设计/工艺没调好”，量产期的敌人是“随机飞来的颗粒和污染”。",
    explain: R`**系统性缺陷**可重复、有确定原因：刻蚀时间偏短导致接触孔打不开、光刻波动过大、模块串接后的意外相互作用。它们在开发阶段占主导，靠一轮轮"跑片–分析–修正"的学习周期逐个消灭，缺陷密度呈台阶式下降。

**随机缺陷**是颗粒与污染物随机落在某处造成的，量产阶段占主导，只能用统计（良率模型）描述、用三道防线压低。`,
    analogy: "装修房子：开发期是发现“插座位置画错了”这类图纸问题，改一次就好；量产期是工人偶尔掉一颗螺丝在墙里——只能靠管理和统计把概率压低。",
    book_example: { what: R`图 4.2 的学习曲线：开发期缺陷密度从 $10^6\,\mathrm{cm^{-2}}$ 量级降到 $1\,\mathrm{cm^{-2}}$ 以下，进入量产后由随机缺陷决定。`, point: "两类缺陷的应对方法完全不同。" },
    misconception: "良率低不一定是“厂里不干净”——新工艺早期的低良率主要来自系统性问题。",
  },
  {
    id: "three_tier", name_zh: "三道防线", name_en: "Three-tier contamination control", icon: "🛡️", section_id: "4.1", group: "env",
    plain: "洁净室挡住、清洗洗掉、吸杂藏起来。",
    explain: R`**洁净室**减少颗粒与污染到达晶圆的机会；**清洗**在高温工序前把表面的颗粒、薄膜与痕量元素除去；**吸杂**处理已经进入硅体内的金属，把它们转移到远离器件的地方。三者互补：任何一道都无法单独达到表 4.1 的指标。`,
    analogy: "防疫：口罩和通风（洁净室）、洗手消毒（清洗）、把病人集中隔离到远离人群的病房（吸杂）。",
    book_example: { what: "§4.1 末尾的三级策略，§4.2–4.4 依次展开。", point: "前两道针对表面，第三道针对体内。" },
    misconception: "吸杂不是“把杂质除掉”，而是把它们挪到无害处；晶圆里的杂质总量并没有减少。",
  },
  {
    id: "iso_class", name_zh: "ISO 洁净度等级", name_en: "ISO cleanroom class", icon: "🌬️", section_id: "4.2", group: "env",
    plain: R`ISO $N$ 级：每立方米空气中 $\geq0.1\,\mu$m 的颗粒不超过 $10^N$ 个。`,
    explain: R`颗粒数随尺寸按幂律分布：$\geq D$ 的颗粒数 $=10^N(0.1/D)^{2.08}$（式 4.3）。等级每升 1 级，颗粒多 10 倍。旧标准 Class X 指每立方英尺 $\geq0.5\,\mu$m 颗粒少于 X 个，ISO 5 相当于 Class 100。先进硅厂关键区为 ISO 1，办公室约 ISO 8。`,
    analogy: "就像空气质量指数，只不过它数的是比 PM2.5 小 25 倍的颗粒，标准严苛十万倍。",
    book_example: { what: R`表 4.2；ISO 5 洁净室中每平方厘米每小时约沉积 5 个 $\geq0.1\,\mu$m 颗粒。`, point: "即使在洁净室中，晶圆也不宜裸露——于是有了密封传送盒。" },
    misconception: "等级数字越小越干净（ISO 1 最干净），与旧 Class 的数字方向一致，但两者不是同一个数。",
  },
  {
    id: "rca", name_zh: "RCA 清洗", name_en: "RCA clean (SC-1 / SC-2)", icon: "🧪", section_id: "4.3.2", group: "env",
    plain: "两步双氧水清洗：碱性 SC-1 去有机物和颗粒，酸性 SC-2 去金属和碱金属离子。",
    explain: R`SC-1：$\mathrm{NH_4OH/H_2O_2/H_2O}$，70–85 ˚C；氧化有机物、络合 Cu/Ni/Zn 等，并通过"刻蚀–再氧化"托起颗粒（配合兆声更有效）。SC-2：$\mathrm{HCl/H_2O_2/H_2O}$；溶解 SC-1 中沉淀的 Al、Fe、Mg 氢氧化物和残余贵金属。可选的稀 HF 步骤剥除化学氧化层。1970 年由 Kern 提出，至今仍是前道清洗主力。`,
    analogy: "先用碱性洗洁精去油污（SC-1），再用酸性除垢剂去水垢（SC-2）。",
    book_example: { what: "图 4.11 的完整流程；近年的改进：更稀的配方、降低氨水浓度以防微粗糙、臭氧水替代方案。", point: "两步都依赖双氧水的强氧化电位。" },
    misconception: "RCA 清洗本来不是为去颗粒设计的；颗粒主要靠兆声/超声辅助去除。",
  },
  {
    id: "redox", name_zh: "氧化还原电位与反镀", name_en: "Oxidation potential & replating", icon: "⚡", section_id: "4.3.2", group: "env",
    plain: "烧杯里最强的氧化剂说了算：它夺电子，其余的都被氧化。",
    explain: R`金属要被清洗掉，就必须被氧化成可溶离子 $\mathrm M\to\mathrm M^{z+}+z\mathrm e^-$。在纯水中，若金属离子的氧化电位比 $\mathrm{SiO_2/Si}$ 更负（如 $\mathrm{Fe^{3+}}$、$\mathrm{Cu^{2+}}$），硅会把电子交给金属离子——金属**反镀**到硅上。加入 $\mathrm{H_2O_2}$（$-1.78\,$V）或 $\mathrm{O_3}$（$-2.07\,$V）这样更强的氧化剂，它们夺走电子，金属就留在溶液中。`,
    analogy: "抢电子的拔河：谁的“拉力”最强（电位最负），电子就归谁，其他人只能松手（被氧化）。",
    book_example: { what: "表 4.3 与图 4.13 的思想实验：只有水时 Fe 会镀到硅片上。", point: "这就是 RCA 清洗必须用双氧水的化学理由。" },
    misconception: "“清洗液越纯越好”并不总对：纯水中的金属离子反而会镀回硅片；关键是要有足够强的氧化剂。",
  },
  {
    id: "gettering", name_zh: "吸杂三步：释放–扩散–俘获", name_en: "Gettering: release, diffuse, trap", icon: "🧲", section_id: "4.4", group: "getter",
    plain: "先让金属“动起来”，再让它“跑过去”，最后“关起来”。",
    explain: R`**释放**：把金属变成快扩散的间隙态（Au、Pt 尤其需要）；**扩散**：间隙金属的 $D$ 比掺杂剂大许多个数量级，几分钟就能穿透整片晶圆；**俘获**：在体内 $\SiO$ 沉淀及其伴生缺陷，或背面损伤层中被抓住。任何一步最慢的那个就是限速步骤。`,
    analogy: "清理散落在房子各处的弹珠：先把卡在地板缝里的撬出来（释放），它们自己会滚（扩散），在墙角放个收纳盒（俘获）。",
    book_example: { what: "图 4.15 的①②③。", point: "Ti、Mo 这类扩散慢的金属最难吸杂。" },
    misconception: "吸杂只对扩散快的杂质有效；对掺杂原子（B、P、As）几乎无影响，因为它们在同样的热处理中只移动不到一微米。",
  },
  {
    id: "kickout", name_zh: "踢出与离解机制", name_en: "Kick-out & Frank–Turnbull", icon: "🦶", section_id: "4.4.2", group: "getter",
    plain: R`硅自间隙原子 I 把格点上的金"踢"成间隙金：$\mathrm{Au_S}+\mathrm I\leftrightarrow\mathrm{Au_i}$。`,
    explain: R`两条途径：踢出 $\mathrm{Au_S}+\mathrm I\leftrightarrow\mathrm{Au_i}$；离解 $\mathrm{Au_S}\leftrightarrow\mathrm{Au_i}+\mathrm V$。质量作用定律：$[\mathrm{Au_i}]/[\mathrm{Au_S}]\propto[\mathrm I]\propto1/[\mathrm V]$。所以注入 I 的工艺（高浓度磷扩散、注入损伤、氧化/氧沉淀）促进吸杂，产生过量 V 的工艺阻碍吸杂。`,
    analogy: "抢座位：一个站着的人（I）把坐着的人（替位金）挤起来，被挤起的人就可以四处走动了。",
    book_example: { what: "图 4.21：背面吸杂的速度被 I 从背面扩散进来的速度所限制，Au 剖面出现陡峭前沿。", point: "I 的扩散系数介于掺杂剂与间隙金属之间，因此成为限速环节。" },
    misconception: "并非所有金属都需要“踢出”：Cu、Ni 本来就主要是间隙态。",
  },
  {
    id: "intrinsic_g", name_zh: "本征吸杂与洁净区", name_en: "Intrinsic gettering & denuded zone", icon: "🫧", section_id: "4.4.3", group: "getter",
    plain: R`用 CZ 硅自带的氧在体内析出 $\SiO$ 做陷阱，同时让表面几十微米"无氧"以保护器件。`,
    explain: R`CZ 硅含氧 $10^{17}$–$10^{18}\,\mathrm{cm^{-3}}$，在工艺温度下过饱和（式 4.10）。三段热处理：高温**外扩散**造洁净区（按式 4.11 的 $D$ 估算深度）→ 约 700 ˚C **成核** → 约 1000 ˚C **长大**到 50–100 nm。沉淀体积膨胀约 2 倍，伴生层错与位错环，金属在这些无序区被俘获。`,
    analogy: "在地下室布满捕鼠夹，但一楼（器件层）一个也不放。",
    book_example: { what: "图 4.19：1150 ˚C 4 h + 800 ˚C 8 h + 1050 ˚C 16 h 处理后约 25 µm 的洁净区。", point: "陷阱离器件近（几十微米），所需热循环少——这是它成为主流的原因。" },
    misconception: "洁净区不是“完全没有氧”，只是氧浓度低到后续不会析出的水平。",
  },
  {
    id: "extrinsic_g", name_zh: "非本征（背面）吸杂", name_en: "Extrinsic (backside) gettering", icon: "🔙", section_id: "4.4.4", group: "getter",
    plain: "在晶圆背面人为造损伤（注入、多晶硅、磷扩散），把金属吸到背面。",
    explain: R`用于不能做本征吸杂的场合：FZ 硅（几乎无氧）、纵向功率器件、光伏电池、SiC。俘获机制包括结合能陷阱（式 4.13）、分凝、重掺杂中固溶度增大、离子配对，以及 $\mathrm{Au_i}+\mathrm{V^-}\leftrightarrow\mathrm{Au_S^-}$（式 4.14）。扩散距离是整片厚度，所以比本征吸杂慢。`,
    analogy: "把垃圾桶放在后院：总能用，但每次都要走远路。",
    book_example: { what: "图 4.20（纯扩散限制，从背面逐渐耗尽）与图 4.21（I 注入限制，陡峭前沿）的对比。", point: "剖面形状能揭示限速步骤是什么。" },
    misconception: "“温度越高吸杂越好”不一定：式 (4.13) 表明高温下陷阱会放走金属。",
  },
  {
    id: "srh_lifetime", name_zh: "SRH 寿命与深能级", name_en: "SRH lifetime & deep levels", icon: "⏱️", section_id: "4.5", group: "getter",
    plain: R`$\tau=1/(\sigma v_{\rm th}N_t)$：深能级陷阱越多，载流子寿命越短、漏电越大。`,
    explain: R`SRH 复合率 $U=(np-n_i^2)/\{\tau[p+n+2n_i\cosh((E_T-E_i)/kT)]\}$ 在陷阱位于禁带中央时最大。同一个 $\tau$ 既决定正向时的少子复合，也决定反偏耗尽区的热产生（漏电）。过渡金属的能级都很深，所以 $10^{12}\,\mathrm{cm^{-3}}$ 量级的金属就足以把寿命压到毫秒以下。`,
    analogy: "禁带中央的陷阱像一条河正中间的踏脚石：电子和空穴都能“一步”跳上去，复合最容易。",
    book_example: { what: "§4.1 的 DRAM 刷新例子；§4.5 功率器件用扩金（图 4.22）或辐照有意缩短寿命。", point: "同一物理：在 DRAM 中是敌人，在功率二极管中是工具。" },
    misconception: "直接带隙材料（GaAs）本征寿命已很短，金属杂质的影响小——所以化合物半导体很少做吸杂。",
  },
  {
    id: "yield_models", name_zh: "良率模型与缺陷聚集", name_en: "Yield models & clustering", icon: "🎲", section_id: "4.6", group: "yield",
    plain: R`Poisson $e^{-A_CD_{\rm O}}$ 假设缺陷均匀；真实缺陷会扎堆，大芯片的良率因此比 Poisson 预言的高。`,
    explain: R`Murphy：对局部缺陷密度的分布 $f(D)$ 求 Poisson 良率的平均（式 4.21）。$f$ 取 Gamma 分布（形状 $C$）得负二项模型 $(1+A_CD_{\rm O}/C)^{-C}$；$C=1$（指数分布）得 Seeds 模型 $1/(1+A_CD_{\rm O})$；$C\to\infty$ 回到 Poisson。工业常用 $C\approx2$。多道工序时良率相乘。`,
    analogy: "下冰雹：如果冰雹总是集中砸在某几辆车上，停车场里完好的车反而更多。",
    book_example: { what: R`图 4.23：$D_{\rm O}=0.5\,\mathrm{cm^{-2}}$、$A_C=10\,\mathrm{cm^2}$ 时 Poisson 0.7%、$C=2$ 时 8%、Seeds 17%。`, point: R`$A_CD_{\rm O}\lesssim1$ 时各模型差别很小，大芯片时差别巨大。` },
    misconception: "聚集并不减少缺陷总数，只是改变了它们在芯片间的分配方式。",
  },
  {
    id: "cpk", name_zh: "工艺能力 Cp 与 Cpk", name_en: "Process capability", icon: "📊", section_id: "4.7", group: "yield",
    plain: R`$C_p$ 看分布够不够窄，$C_{pk}$ 还看是否居中。`,
    explain: R`$C_p=(\mathrm{USL}-\mathrm{LSL})/6\sigma$；$C_{pk}=\min(\mathrm{USL}-\bar X,\bar X-\mathrm{LSL})/3\sigma$。居中时相等。$C_p>1.33$ 视为受控，六西格玛工艺 $C_p\geq2$。超规格比例约为 $1-\Phi(3C_{pk})$。`,
    analogy: "停车：Cp 问车比车位窄多少，Cpk 问车停得离两边的线各有多远——车再窄，停歪了也会压线。",
    book_example: { what: R`图 4.26：均值 98.9、标准差 1.03、规格 94–106，得 $C_p=1.94$、$C_{pk}\approx1.6$。`, point: R`$C_p$ 高而 $C_{pk}$ 低，说明只需把均值调回中心。` },
    misconception: R`$C_p$ 高不代表良品多：如果均值偏到规格限上，$C_p$ 再高也会有一半超规格。`,
  },
];

export const relations = [
  { from: "defect_types", to: "yield_models", label: "随机缺陷 → 统计" },
  { from: "three_tier", to: "iso_class", label: "第一道" },
  { from: "three_tier", to: "rca", label: "第二道" },
  { from: "three_tier", to: "gettering", label: "第三道" },
  { from: "redox", to: "rca", label: "解释" },
  { from: "gettering", to: "kickout", label: "释放" },
  { from: "gettering", to: "intrinsic_g", label: "体内俘获" },
  { from: "gettering", to: "extrinsic_g", label: "背面俘获" },
  { from: "kickout", to: "extrinsic_g", label: "I 注入限速" },
  { from: "srh_lifetime", to: "gettering", label: "动机" },
  { from: "yield_models", to: "cpk", label: "功能 → 参数良率" },
];

export const TAKEAWAYS = [
  <TxI>{R`**为什么要干净**：一个缺陷毁一颗芯片；可动离子使 $V_{\rm TH}$ 漂移 $qQ_{\rm M}/C_{\rm ox}$；深能级金属使 $\tau=1/(\sigma v_{\rm th}N_t)$ 缩短——$\tau\geq1\,$ms 要求 $N_t\lesssim10^{12}\,\mathrm{cm^{-3}}$。`}</TxI>,
  <TxI>{R`**洁净室**：ISO $N$ 级每 $\mathrm{m^3}$ 中 $\geq D$ 的颗粒 $=10^N(0.1/D)^{2.08}$；HEPA（99.97%）+ 垂直层流 + 控制人员与设备；理论纯水 $18\,\mathrm{M\Omega\,cm}$。`}</TxI>,
  <TxI>{R`**清洗**：去胶 + RCA（SC-1 碱性、SC-2 酸性，都靠 $\mathrm{H_2O_2}$）；氧化电位表中最强的氧化剂夺电子——没有它，Fe、Cu 会反镀到硅上。`}</TxI>,
  <TxI>{R`**吸杂**：释放（$\mathrm{Au_S}+\mathrm I\leftrightarrow\mathrm{Au_i}$）→ 扩散（$D=D_{\rm O}e^{-E_A/kT}$，金属比掺杂剂快 $10^6$ 倍以上）→ 俘获（体内氧沉淀 + 洁净区；或背面损伤）。`}</TxI>,
  <TxI>{R`**良率**：Poisson $e^{-A_CD_{\rm O}}$；缺陷聚集用负二项 $(1+A_CD_{\rm O}/C)^{-C}$，$C=1$ 即 Seeds；多工序相乘，50 道单步 99% 的工序总良率约 60%。`}</TxI>,
  <TxI>{R`**参数良率**：$C_p=(\mathrm{USL}-\mathrm{LSL})/6\sigma$ 看宽窄，$C_{pk}$ 还看居中；$C_p>1.33$ 受控。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`ISO 3 洁净室中，每立方米空气里 $\geq0.5\,\mu$m 的颗粒大约有多少？`,
    options: ["约 1000 个", "约 35 个", "约 3.5 个", "约 350 个"], answer: 1,
    why: R`式 (4.3)：$10^3\times(0.1/0.5)^{2.08}=10^3\times0.0352\approx35$，与表 4.2 一致。`,
  },
  {
    q: R`把一片沾有 Fe 的硅片泡在纯水中，根据表 4.3 会发生什么？`,
    options: ["Fe 被氧化成离子溶入水中", R`$\mathrm{Fe^{3+}}$ 被还原、镀到硅片上，硅被氧化`, "什么都不发生", "硅被还原"], answer: 1,
    why: R`$\mathrm{Fe^{3+}/Fe}$（0.17 V）位于 $\mathrm{SiO_2/Si}$（0.84 V）下方，是更强的氧化剂：Fe 反应向左（镀出），Si 反应向右（被氧化）。需要加入 $\mathrm{H_2O_2}$ 才能扭转。`,
  },
  {
    q: "为什么背面磷扩散和离子注入损伤是有效的吸杂处理？",
    options: ["它们降低了金属的固溶度", R`它们注入过量的硅自间隙原子 I，把 $\mathrm{Au_S}+\mathrm I\to\mathrm{Au_i}$ 推向右边，并提供俘获位置`, "它们提高了掺杂剂的扩散系数", "它们在表面形成氧化层"], answer: 1,
    why: R`踢出机制 (4.7)：I 过饱和使替位金变为快扩散的间隙金；损伤区（位错、沉淀）又是俘获位置。`,
  },
  {
    q: "本征吸杂中，为什么成核步骤选在约 700 ˚C？",
    options: ["这是氧固溶度最高的温度", "更低温度氧扩散太慢、难以成核；更高温度胚胎没长到临界尺寸就溶解", "此温度下金属扩散最快", "为了外扩散表面的氧"], answer: 1,
    why: "成核需要氧原子相遇（要求足够扩散）又要求胚胎稳定（要求温度不太高），两者折中出一个最佳温度。",
  },
  {
    q: R`缺陷密度 $D_{\rm O}=0.5\,\mathrm{cm^{-2}}$，芯片面积 $4\,\mathrm{cm^2}$。负二项模型 $C=2$ 给出的良率是？`,
    options: [R`$e^{-2}\approx13.5\%$`, R`$1/3\approx33\%$`, R`$(1+1)^{-2}=25\%$`, R`$50\%$`], answer: 2,
    why: R`$(1+A_CD_{\rm O}/C)^{-C}=(1+2/2)^{-2}=1/4$。Poisson 是 13.5%，Seeds 是 33%：负二项夹在两者之间。`,
  },
  {
    q: R`某工艺参数规格 94–106，均值 103、$\sigma=1$。$C_p$ 与 $C_{pk}$ 各是多少？`,
    options: ["2 与 2", "2 与 1", "1 与 1", "1 与 2"], answer: 1,
    why: R`$C_p=12/6=2$；$C_{pk}=\min(106-103,103-94)/3=3/3=1$。分布够窄但不居中——对应图 4.25 情形 2。`,
  },
];

export const BRIDGE = R`本章把"在什么样的环境里、以什么样的洁净度"制造芯片讲清楚了。从下一章起进入具体的单元工艺，第一个就是决定一切图形的光刻：在第 5 章里我们会看到，前面提到的黄光区、颗粒挡光造成缺陷、光刻胶的化学，乃至关键缺陷尺寸为什么随特征尺寸一起缩小，都与成像光学和光刻胶物理紧密相关。本章的点缺陷（I、V）与扩散的 Arrhenius 图像，则会在第 6–8 章（氧化、扩散、离子注入）中成为主角。`;
