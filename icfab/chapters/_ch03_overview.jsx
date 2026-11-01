// 第 3 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
const R = String.raw;

export const HOOK_TITLE = "一片 300 mm 硅片，凭什么只卖约 100 美元？";
export const HOOK = R`你手里这块指甲盖大小的处理器，起点是一根约 1 m 长、300 mm 粗、几百千克重的硅单晶锭。它几乎没有位错，杂质（除了有意掺入的硼或磷）只有 ppb 量级——地球上能常规大量生产的最纯的材料。可就是这样一片抛光到镜面、平整到微米的晶圆，售价只占芯片制造总成本的一个零头。

背后是几十年积累的"材料工程学"：用热力学理解为什么晶体里总有空位和间隙原子、它们又如何随掺杂改变带电态；用一个简单的热平衡解释为什么晶锭越粗拉得越慢；用一个关于"杂质更喜欢待在液体里"的守恒方程，算出晶锭从头到尾的电阻率如何漂移，甚至反过来利用它把硅提纯到 $10^{13}\,\mathrm{cm^{-3}}$ 以下。本章就讲这条从石英砂到抛光晶圆的路，以及路上每一步背后的定量模型。`;

export const ROADMAP = [
  { sec: "3.1", title: "为什么是硅：晶圆的规格", gist: R`硅的丰度、易提纯、近乎理想的 Si/$\SiO$ 界面让它统治 IC；晶圆采购要规定几何、电学与杂质三类参数。`, gives: [], next: R`要理解这些规格，先得会描述晶体本身。` },
  { sec: "3.2", title: "晶体结构：晶向、晶面与金刚石晶格", gist: R`Miller 指数描述晶向 [hkl] 与晶面 (hkl)；Si 是两套 FCC 错开 $a/4$ 的金刚石结构，GaAs 为闪锌矿；六方 GaN 用四指数。`, gives: ["3.1"], next: R`真实晶体从不完美——缺陷按维度分类。` },
  { sec: "3.3", title: "晶体缺陷：点、线、面、体", gist: R`空位/间隙、位错、层错、析出物；热梯度产生的应力 $\sigma=\alpha Y\Delta T$ 可超过屈服强度而产生位错；层错长大/缩小可当作点缺陷的"探针"。`, gives: ["3.2"], next: R`其中只有点缺陷是热力学"必然存在"的，需要定量处理。` },
  { sec: "3.4", title: "点缺陷：浓度、扩散与电荷态", gist: R`$C^*\propto\exp(-H^f/kT)$；硅中 $C_{V^0}^*\gg C_{I^0}^*$ 但都远小于 $n_i$；带电缺陷浓度随 $n/n_i$、$(n/n_i)^2$ 增长，掺杂会让缺陷总数增加。`, gives: ["3.3", "3.4", "3.5", "3.6", "3.7", "3.11", "3.12", "3.13"], next: R`有了材料物理，接下来造出单晶。` },
  { sec: "3.5", title: "硅单晶生长：CZ 与 FZ", gist: R`石英砂 → 冶金级硅 → $\mathrm{SiHCl_3}$ 精馏 → 多晶硅；直拉法（CZ）引入氧和碳，Dash 缩颈消除位错；界面热平衡给出 $v_{\rm PMAX}\propto r^{-1/2}$；区熔（FZ）无坩埚、低氧。`, gives: ["3.14"], next: R`化合物半导体要解决组元挥发问题。` },
  { sec: "3.6", title: "化合物半导体生长", gist: R`GaAs/InP 用液封直拉（LEC）或两温区 Bridgman；SiC 只能升华生长；GaN 难以体生长，多为异质外延。`, gives: [], next: R`晶锭长好，还要切成晶圆。` },
  { sec: "3.7", title: "晶圆制备", gist: R`滚圆、磨定位边/切口、内圆切片、研磨、倒角、$\mathrm{HNO_3/HF}$ 化学腐蚀（式 3.15）、CMP 镜面抛光、激光打标。`, gives: ["3.15"], next: R`回头看生长过程中掺杂如何分布——分凝。` },
  { sec: "3.8", title: "生长中的掺杂与杂质：分凝", gist: R`$k_O=C_S/C_L$；CZ：$C_S=k_OC_O(1-f)^{k_O-1}$；FZ 单次：$C_S=C_O[1-(1-k_O)e^{-k_Ox/L}]$；多次通过即区熔提纯；NTD 用核嬗变均匀掺磷。`, gives: ["3.16", "3.22", "3.25", "3.26"], next: R`最后看一类"非常规"衬底：SOI。` },
  { sec: "3.9", title: "SOI 与键合晶圆", gist: R`SIMOX 注氧、BESOI 键合减薄、Smart-Cut 注氢剥离，三条路线得到"硅–埋氧–硅"结构；键合还通向三维集成。`, gives: [] },
];

export const EQMAP_PD = [
  { from: "3.3", to: "3.4", label: R`拟合 $S^f,H^f$（I）` },
  { from: "3.3", to: "3.5", label: R`拟合 $S^f,H^f$（V）` },
  { from: "3.5", to: "3.8", label: "Shockley–Last 统计" },
  { from: "3.5", to: "3.9", label: "" },
  { from: "3.5", to: "3.10", label: "" },
  { from: "3.9", to: "3.11", label: R`$n=n_ie^{(E_F-E_i)/kT}$` },
  { from: "3.8", to: "3.12", label: R`$p=n_ie^{(E_i-E_F)/kT}$` },
  { from: "3.10", to: "3.13", label: R`两次代入 $n/n_i$` },
  { from: "3.4", to: "3.6", label: "迁移能（Arrhenius）" },
  { from: "3.5", to: "3.7", label: "" },
];
export const EQMAP_SEG = [
  { from: "3.16", to: "3.17", label: R`$C_L=I_L/(V_O-V_S)$` },
  { from: "3.17", to: "3.18", label: "分离变量" },
  { from: "3.18", to: "3.19", label: "积分" },
  { from: "3.19", to: "3.20", label: "取指数" },
  { from: "3.20", to: "3.21", label: "" },
  { from: "3.21", to: "3.22", label: R`$f=V_S/V_O$` },
  { from: "3.16", to: "3.23", label: "熔区收支" },
  { from: "3.23", to: "3.24", label: R`$C_L=I/L$` },
  { from: "3.24", to: "3.25", label: R`$I_O=C_OL,\ C_S=k_OI/L$` },
];
export const EQMAP_LABELS = {
  "3.3": "点缺陷平衡浓度", "3.4": R`$C_{I^0}^*(T)$`, "3.5": R`$C_{V^0}^*(T)$`, "3.6": R`$D_I(T)$`, "3.7": R`$D_V(T)$`,
  "3.8": R`$\mathrm{V}^+$`, "3.9": R`$\mathrm{V}^-$`, "3.10": R`$\mathrm{V}^=$`, "3.11": R`$\mathrm{V}^-\propto n/n_i$`, "3.12": R`$\mathrm{V}^+\propto p/n_i$`, "3.13": R`$\mathrm{V}^=\propto(n/n_i)^2$`,
  "3.16": "分凝系数", "3.17": "冻结 dV 带走的杂质", "3.18": "分离变量积分", "3.19": "对数形式", "3.20": "熔体杂质数", "3.21": "固相浓度定义", "3.22": "CZ 轴向分布（Scheil）",
  "3.23": "熔区杂质收支", "3.24": "积分式", "3.25": "FZ 单次通过",
};

export const groups = [
  { id: "struct", label: "晶体结构" },
  { id: "defect", label: "缺陷物理" },
  { id: "growth", label: "晶体生长" },
  { id: "doping", label: "掺杂与晶圆" },
];

export const concepts = [
  {
    id: "diamond", name_zh: "金刚石与闪锌矿晶格", name_en: "Diamond & zincblende lattices", icon: "💎", section_id: "3.2", group: "struct",
    plain: R`两套面心立方（FCC）晶格沿体对角线错开 $a/4$ 套在一起；每个原子用四面体键连接四个最近邻。`,
    explain: R`金刚石结构可看成"FCC 晶格的每个格点上放两个原子"，两原子相距 $(a/4)(1,1,1)$。最近邻距离 $\sqrt3a/4$（Si 为 2.35 Å），每个立方晶胞含 8 个原子，原子密度 $8/a^3=5.0\times10^{22}\,\mathrm{cm^{-3}}$。

当两套子晶格分别由两种原子占据（Ga 与 As）时就是闪锌矿结构：每个 Ga 的四个最近邻都是 As，反之亦然。Si、Ge、GaAs、InP 等都属于这一家族，因而晶向、晶面的描述方法完全相同。`,
    analogy: R`像两层完全相同的蛋托交错叠放：第二层的每个蛋都落在第一层四个蛋围成的"坑"里。`,
    book_example: { what: R`图 3.3：由一个 FCC 晶胞出发，平移 $a/4$ 叠加第二个 FCC，再只保留落在第一个晶胞内的四个原子，就得到金刚石晶胞。`, point: R`本章交互三维模型可以切换 Si 与 GaAs、显示四面体键与晶面。` },
    misconception: R`金刚石晶胞不是"FCC + 体心原子"。体心位置 $(\tfrac12,\tfrac12,\tfrac12)$ 在金刚石结构中是空的，第二套原子在 $(\tfrac14,\tfrac14,\tfrac14)$ 等四个四面体间隙位。`,
  },
  {
    id: "miller", name_zh: "Miller 指数", name_en: "Miller indices", icon: "🧭", section_id: "3.2", group: "struct",
    plain: R`晶面：取三个轴上截距的倒数并化为互质整数，记作 (hkl)；晶向：矢量分量记作 [hkl]。`,
    explain: R`截距取倒数是为了把"平行于某轴（截距 $\infty$）"变成 0。负截距在数字上加横线。等价的一族晶面写 $\nosym{\{hkl\}}$，等价晶向写 $\nosym{\langle hkl\rangle}$。立方晶系中 [hkl] 恰好垂直于 (hkl)。

六方晶系（GaN、4H-SiC）用 Miller–Bravais 四指数 $\nosym{[hkil]}$：底面上三根互成 120° 的轴加一根 c 轴，第三个指数满足 $\nosym{i=-(h+k)}$。`,
    analogy: R`像给一叠书页编号：(100) 是"竖着排的书页"，(111) 是"斜着切过立方体三个角的那一组书页"。`,
    book_example: { what: R`截距 3、4、2 → 倒数 1/3、1/4、1/2 → 乘 12 得 (436)；截距 1、−1、2 → $(2\bar21)$。`, point: R`(100) 晶圆是今天 MOS 工艺的主流。` },
    misconception: R`(110) 与 [110] 不是同一个东西：前者是一族平面，后者是一个方向；只是在立方晶系中两者恰好垂直。`,
  },
  {
    id: "defect_dim", name_zh: "缺陷按维度分类", name_en: "Point, line, area and volume defects", icon: "🧩", section_id: "3.3", group: "defect",
    plain: R`零维点缺陷（空位、间隙、替位杂质、反位）、一维位错、二维层错、三维析出物与空洞。`,
    explain: R`只有点缺陷是热力学平衡必然存在的；位错、层错、析出多由工艺引起（应力、过饱和），可通过工艺控制减到最少。但"有害"不是绝对的：CZ 硅中氧析出在体内形成的缺陷区可以吸杂（第 4 章）。

位错可以通过吸收点缺陷"攀移"；外插型层错吸收 I 长大、吸收 V 缩小——所以层错长度是判断某工艺注入了间隙还是空位的探针（OISF）。`,
    analogy: R`一支队伍里：少一个人（空位）、挤进一个人（间隙）、半排人插进队列（位错）、一整排站错了位（层错）、一群外人扎堆（析出物）。`,
    book_example: { what: R`图 3.8 左：氧化诱生层错（OISF）的俯视像；右：GaN-on-Si 中 $10^9\,\mathrm{cm^{-2}}$ 量级的位错与层错。`, point: R`热氧化向衬底注入过量间隙原子，层错因而长大。` },
    misconception: R`"硅片无位错"指不含宏观位错；微小的位错环与点缺陷团簇在原始晶圆中通常仍存在。`,
  },
  {
    id: "native_pd", name_zh: "本征点缺陷 I 与 V", name_en: "Native point defects", icon: "⚫", section_id: "3.4", group: "defect",
    plain: R`空位和自间隙原子在任何高于 0 K 的温度下都会出现，因为它们降低晶体的自由能。`,
    explain: R`平衡浓度 $C^*=N_S\exp(S^f/k)\exp(-H^f/kT)$。硅中拟合值给出 1000 ℃ 时 $C_{V^0}^*\approx10^{17}$、$C_{I^0}^*\approx2\times10^{13}\,\mathrm{cm^{-3}}$，只占格点的 $10^{-5}$–$10^{-10}$，远小于 $n_i$ 与掺杂浓度，因而无法直接测量。

它们极易迁移（$D_I$、$D_V$ 远大于杂质扩散率），并且是第 7、8 章掺杂扩散和注入损伤退火的"主角"。工艺建模通常假设温度一变，平衡浓度瞬间建立；离子注入是明显的例外。`,
    analogy: R`像拥挤剧场里总有几个空座、几个站着的人——不是管理失误，而是让系统"熵"更大的自然状态。`,
    book_example: { what: R`式 (3.4)–(3.7) 与图 3.9、3.10。`, point: R`温度从 1000 ℃ 升到 1100 ℃，$C_{I^0}^*$ 增大约 5 倍、$C_{V^0}^*$ 约 2 倍。` },
    misconception: R`I 和 V 不必成对出现：表面可以单独产生或吞掉一种缺陷，所以二者的平衡浓度彼此独立。`,
  },
  {
    id: "charged_pd", name_zh: "带电点缺陷与费米能级", name_en: "Charged point defects", icon: "⚡", section_id: "3.4", group: "defect",
    plain: R`点缺陷在禁带中有能级，像深施主/深受主一样随 $E_F$ 位置带上不同电荷。`,
    explain: R`N 型材料中 $E_F$ 升到 $\mathrm{V}^-$ 能级之上，空位俘获电子带负电；P 型中 $E_F$ 低于 $\mathrm{V}^+$ 能级，空位带正电。浓度满足 $C_{V^-}^*=(n/n_i)C_{V^0}^*e^{-(E_{V^-}-E_i)/kT}$ 等。

关键在于：中性缺陷浓度只依赖温度，不随掺杂变；于是带电缺陷是晶体"额外生成"的——掺杂越重，缺陷总数越多。这正是第 7 章掺杂扩散率 $\propto n/n_i$ 的根源。`,
    analogy: R`费米能级是"水位"：水位漫过哪个能级，那个能级就被电子占满（受主带负电）；水位低于施主能级，它就空着（带正电）。`,
    book_example: { what: R`图 3.11 与式 (3.11)–(3.13)：1000 ℃ 时 $n_i\approx7\times10^{18}\,\mathrm{cm^{-3}}$，掺杂低于此值时材料仍是本征的。`, point: R`工艺温度下掺杂可超过 $n_i$ 10–100 倍，带电缺陷随之大增。` },
    misconception: R`不是"把中性空位充上电"——那样中性空位会减少，但 $C_{V^0}^*$ 只由温度决定。实际是晶体新产生了空位。`,
  },
  {
    id: "cz", name_zh: "直拉法（CZ）与 Dash 缩颈", name_en: "Czochralski growth & Dash necking", icon: "🧪", section_id: "3.5", group: "growth",
    plain: R`把籽晶插进石英坩埚里的硅熔体，边转边慢慢提拉，熔体按籽晶的取向逐层结晶。`,
    explain: R`拉速主要决定直径：凝固潜热必须经晶体向上传导、再从表面辐射掉，热平衡给出 $v_{\rm PMAX}\propto r^{-1/2}$（150 mm 约 24 cm/h）。

冷籽晶插入熔体时巨大的温度梯度会产生位错。Dash 的办法是先快速拉出一段细颈，让位错滑出表面终止，再降速放肩长成无位错的大直径晶体。坩埚溶解带入氧（$10^{17}$–$10^{18}\,\mathrm{cm^{-3}}$），石墨件经 SiO/CO 气相循环带入碳。`,
    analogy: R`像从糖浆里慢慢拉出一根冰糖棒：拉得太快，凝固的热来不及散掉，"棒"就变细。`,
    book_example: { what: R`图 3.13、3.14 与式 (3.14)；图 3.15 的商用软件热场模拟。`, point: R`现代拉晶炉用红外测温与激光测径闭环控制拉速与加热功率。` },
    misconception: R`位错不是在晶体长大后才"退火"消除的，而是在生长初期靠细颈把它们"引出"晶体。`,
  },
  {
    id: "oxygen", name_zh: "CZ 硅中的氧", name_en: "Oxygen in CZ silicon", icon: "🫧", section_id: "3.5", group: "growth",
    plain: R`坩埚溶解带来的间隙氧：既能强化晶片、又会生成热施主、还会析出——析出正好用来吸杂。`,
    explain: R`三种效应：(1) 间隙氧 $\mathrm{O_I}$（Si–O–Si 桥键）通过固溶强化把屈服强度提高约 25%；(2) 400–500 ℃ 形成 $\mathrm{SiO_4}$ 热施主，形成速率 $\propto[\mathrm{O_I}]^4$，可达 $10^{16}\,\mathrm{cm^{-3}}$，500 ℃ 以上退火可消除；(3) 氧在熔点按溶解度并入，到工艺温度过饱和而析出成 $\mathrm{SiO_2}$，这是第 4 章内吸杂的基础。碳会改变氧析出动力学。`,
    analogy: R`像钢筋混凝土里的"钢筋"——适量让材料更强；太多又会在不该出现的地方结块。`,
    book_example: { what: R`§3.5：籽晶端氧浓度通常高于尾端，因为熔体液面下降后坩埚溶解减少；磁场直拉（MCZ）抑制对流，降低并均匀化氧含量。`, point: R`$\mathrm{P/P^+}$ 外延片中外延层氧含量低，析出天然发生在远离器件的衬底里。` },
    misconception: R`氧在硅里并不总是"坏杂质"；FZ 硅因几乎不含氧反而机械强度较低。`,
  },
  {
    id: "segregation", name_zh: "分凝系数", name_en: "Segregation coefficient", icon: "⚖️", section_id: "3.8", group: "doping",
    plain: R`$k_O=C_S/C_L$：杂质在固液界面两侧的浓度比；$k_O<1$ 说明杂质"更喜欢"液体。`,
    explain: R`分凝源于杂质在两相中化学势必须相等而溶解度不同。$k_O<1$ 时，晶体每长一层就把杂质"让"给熔体，熔体越来越浓，晶锭尾端掺杂越来越重：$C_S=k_OC_O(1-f)^{k_O-1}$。

B 的 $k_O=0.8$，轴向分布平坦；Sb 的 $k_O=0.023$，头尾相差两个数量级。凝固过快或界面有溶质边界层时实测的是有效分凝系数 $k_{\rm eff}$。`,
    analogy: R`像煮汤时浮沫总留在锅里：盛出去的清汤（晶体）杂质少，锅底（熔体）越来越浓。`,
    book_example: { what: R`表 3.1 与图 3.22。`, point: R`后面第 6、7 章中，掺杂在 $\SiO$/Si 界面上的再分布也是同样的分凝概念。` },
    misconception: R`$k_O$ 不是"杂质进入晶体的效率"那样的动力学量，而是平衡热力学量；动力学偏离由 $k_{\rm eff}$ 描述。`,
  },
  {
    id: "zone_refining", name_zh: "区熔与区熔提纯", name_en: "Float zone & zone refining", icon: "🔥", section_id: "3.8", group: "doping",
    plain: R`一个约 2 cm 长的熔区沿多晶棒移动；$k_O<1$ 的杂质被熔区"扫"向棒的末端。`,
    explain: R`单次通过：$C_S(x)=C_O[1-(1-k_O)e^{-k_Ox/L}]$，起点只有 $k_OC_O$，随后逐渐回升到 $C_O$。多次通过时上一遍的剖面成为下一遍的原料，起始段越来越纯，杂质堆积在末端。

FZ 无坩埚，氧含量极低，适合高阻探测器与功率器件；但直径难以放大（≤ 6 in 为主），微区电阻率起伏较 CZ 大。`,
    analogy: R`像用一把梳子反复梳头：每梳一次，打结（杂质）都被推向发梢。`,
    book_example: { what: R`图 3.23–3.25（$k_O=0.1$ 的五次通过）。`, point: R`实用中可在水平舟中同时移动多个熔区以节省时间，但要找不污染熔硅的舟材。` },
    misconception: R`单次区熔不能把整根棒均匀提纯：后段浓度会回升到 $C_O$，末端甚至超过 $C_O$。`,
  },
  {
    id: "ntd", name_zh: "中子嬗变掺杂（NTD）", name_en: "Neutron transmutation doping", icon: "☢️", section_id: "3.8", group: "doping",
    plain: R`把未掺杂 FZ 晶锭放进反应堆，$^{30}$Si 俘获热中子后衰变成 $^{31}$P，实现极均匀的 N 型掺杂。`,
    explain: R`$^{30}$Si 天然丰度约 3%，俘获中子成 $^{31}$Si，半衰期约 2.6 h 衰变为稳定的 $^{31}$P。中子吸收深度远大于晶锭直径，因而掺杂沿径向与轴向都很均匀。辐照损伤可低温退火恢复。电阻率一般只做到 $>5\,\mathrm{\Omega\,cm}$，更重的掺杂需要更长时间等放射性降到安全水平。`,
    analogy: R`不是往面团里撒盐，而是让面团里本来就有的一小部分面粉"变成"盐——自然分布得均匀。`,
    book_example: { what: R`式 (3.26)。`, point: R`同样适用于 SiC（一半原子是 Si）。` },
    misconception: R`NTD 并不能做 P 型掺杂；嬗变产物是磷（施主）。`,
  },
  {
    id: "soi", name_zh: "SOI 与晶圆键合", name_en: "Silicon-on-insulator & bonding", icon: "🥪", section_id: "3.9", group: "doping",
    plain: R`在绝缘的埋氧层（BOX）上放一层薄单晶硅，器件做在薄硅里，寄生电容小、隔离容易。`,
    explain: R`三条路线：SIMOX 注入约 $10^{18}\,\mathrm{cm^{-2}}$ 氧后高温退火形成埋氧；BESOI 把两片氧化晶圆键合后减薄其中一片；Smart-Cut 先注氢定出劈裂面，键合后 400–600 ℃ 沿氢层剥离，再 >1000 ℃ 加固，剥下的晶圆可重复使用。键合本身是更普遍的技术，也用于异质材料集成与三维集成（第 11 章）。`,
    analogy: R`像三明治：底层面包是硅衬底，中间奶酪是埋氧，上层薄薄一片是做器件的硅。`,
    book_example: { what: R`图 3.26。`, point: R`Smart-Cut 的顶层硅厚度由注氢射程精确控制，且每片 SOI 只消耗一片原始晶圆。` },
    misconception: R`SIMOX 的顶层硅质量一般不如原晶圆；键合类方法的顶层硅才能保持原晶圆的品质。`,
  },
];

export const relations = [
  { from: "diamond", to: "miller", label: "用指数描述" },
  { from: "diamond", to: "defect_dim", label: "偏离完美" },
  { from: "defect_dim", to: "native_pd", label: "唯一热力学必然的" },
  { from: "native_pd", to: "charged_pd", label: "随 $E_F$ 带电" },
  { from: "cz", to: "oxygen", label: "坩埚带入" },
  { from: "native_pd", to: "cz", label: "冷却时冻结（漩涡缺陷）" },
  { from: "cz", to: "segregation", label: "掺杂沿晶锭漂移" },
  { from: "segregation", to: "zone_refining", label: "反过来用于提纯" },
  { from: "zone_refining", to: "ntd", label: "均匀掺杂的替代方案" },
  { from: "oxygen", to: "defect_dim", label: "析出 → 体缺陷" },
  { from: "miller", to: "soi", label: "键合/剥离沿晶面" },
];

export const TAKEAWAYS = [
  R`**晶体**：Si、Ge、GaAs 都是"两套 FCC 错开 $a/4$"的金刚石/闪锌矿结构；晶面 (hkl) 由截距倒数得到，立方晶系中 [hkl] ⊥ (hkl)；六方晶系用 $\nosym{[hkil]}$，$\nosym{i=-(h+k)}$。光发射波长 $\lambda=hc/E_G$。`,
  R`**缺陷**：点、线、面、体四类；热应力 $\sigma\approx\alpha Y\Delta T$，约 100 K/cm 的温差即可让硅屈服产生位错；外插型层错随过量 I 长大，是点缺陷的"探针"。`,
  R`**点缺陷**：$C^*=N_Se^{S^f/k}e^{-H^f/kT}$；1000 ℃ 时 $C_{V^0}^*\sim10^{17}$、$C_{I^0}^*\sim10^{13}$–$10^{14}\,\mathrm{cm^{-3}}$，远小于 $n_i\approx7\times10^{18}$；带电缺陷 $\propto n/n_i$、$p/n_i$、$(n/n_i)^2$，掺杂使缺陷总数增加。`,
  R`**生长**：EGS 纯度达 ppb；CZ 为主，Dash 缩颈除位错，氧 $10^{17}$–$10^{18}$、碳 $10^{15}$–$10^{16}\,\mathrm{cm^{-3}}$；$v_{\rm PMAX}\propto r^{-1/2}$；FZ 低氧高阻；化合物用 LEC/Bridgman，SiC 升华，GaN 靠外延。`,
  R`**分凝**：CZ $C_S=k_OC_O(1-f)^{k_O-1}$；FZ 单次 $C_S=C_O[1-(1-k_O)e^{-k_Ox/L}]$；多次通过即区熔提纯；NTD 把 $^{30}$Si 嬗变为 $^{31}$P 实现均匀 N 型掺杂。`,
  R`**晶圆与 SOI**：切片、研磨、$\mathrm{HNO_3/HF}$ 腐蚀、CMP 得到单面镜面晶圆；SOI 由 SIMOX、BESOI、Smart-Cut 获得，键合也是三维集成的基础。`,
];

export const QUIZ = [
  { q: R`截距为 $2、\infty、1$ 的晶面，Miller 指数是？`, options: [R`(201)`, R`(102)`, R`(120)`, R`(210)`], answer: 1, why: R`倒数为 1/2、0、1，乘 2 得 (102)。` },
  { q: R`1000 ℃ 下把 Si 从本征掺到 $n=10n_i$（N 型），以下哪一项基本不变？`, options: [R`$C_{V^-}^*$`, R`$C_{V^=}^*$`, R`$C_{V^0}^*$`, R`空位总数`], answer: 2, why: R`中性缺陷浓度只依赖温度（式 3.5）；$C_{V^-}^*$ 增大约 10 倍，$C_{V^=}^*$ 约 100 倍，总数随之增加。` },
  { q: R`CZ 生长掺锑（$k_O=0.023$）的晶锭，凝固 90% 处的 $C_S$ 约为籽晶端的多少倍？`, options: [R`约 1.1 倍`, R`约 2 倍`, R`约 10 倍`, R`约 100 倍`], answer: 2, why: R`$C_S(f)/C_S(0)=(1-f)^{k_O-1}=0.1^{-0.977}\approx9.5$。` },
  { q: R`把 CZ 晶锭直径从 150 mm 增大到 300 mm，按式 (3.14) 最大拉速约变为原来的？`, options: [R`2 倍`, R`$1/\sqrt2\approx0.71$`, R`1/2`, R`1/4`], answer: 1, why: R`$v_{\rm PMAX}\propto r^{-1/2}$，半径加倍拉速降为 $1/\sqrt2$。` },
  { q: R`为什么氧化后观察到外插型层错长大，就能推断氧化向硅中注入了过量间隙原子？`, options: [R`层错吸收空位才会长大`, R`外插型层错是多出的一层原子面，吸收 I 才能扩展`, R`层错长大只与应力有关`, R`氧原子直接构成层错`], answer: 1, why: R`外插型层错多一层 {111} 原子面，加入原子（I）就向外扩展，吸收 V 则缩小。` },
  { q: R`区熔单次通过（$k_O=0.1$）后，起始端单晶的杂质浓度是？`, options: [R`$C_O$`, R`$0.1C_O$`, R`$0.01C_O$`, R`$0.9C_O$`], answer: 1, why: R`$x=0$ 时 $C_S=C_O[1-(1-k_O)]=k_OC_O$。` },
];

export const BRIDGE = R`有了"什么样的晶圆"，下一章转向"在什么样的环境里加工它"：洁净室如何把颗粒挡在门外、湿法清洗如何去除有机物与金属沾污、本章提到的 CZ 氧析出如何被用来**内吸杂**，以及缺陷密度如何通过 Poisson/Murphy 模型决定芯片良率。`;
