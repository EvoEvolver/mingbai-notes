// 第 6 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
const R = String.raw;

export const HOOK_TITLE = "炉管里的一小时，与芯片里的五层原子";
export const HOOK = R`把一舟（100）硅片推进 1000 °C 的石英炉管，通入水汽一小时，再拉出来——硅片表面多了约 0.41 µm 的二氧化硅，整片晶圆因为薄膜干涉而换了颜色；同样的条件换成干氧，只长 39 nm。为什么水汽快十倍？为什么几十片硅片背靠背只隔几毫米地插在舟上，每一片的厚度却一样？为什么长到后来越来越慢？

再看另一个极端：图 6.7 的透射电镜照片里，多晶硅栅和硅衬底之间的栅氧化层只有 1.2 nm，大约五层原子。它要承受每厘米上千万伏的电场，界面上每 $10^{4}$ 个硅原子里最多允许一个“缺陷”。正是这层氧化物，让硅而不是锗、砷化镓成为集成电路的材料。

本章回答两类问题。**怎么长**：氧化剂必须穿过已经长出的氧化层到达硅界面才能反应，于是“穿过去”与“反应掉”两个串联步骤之争，给出 Deal–Grove 线性–抛物线律；再把晶向、压强、掺杂、薄氧异常、二维形状和应力一一加进来。**长得好不好**：界面上的四类电荷怎样用 C–V 曲线“看见”；当 SiO$_2$ 薄到量子隧穿无法容忍时，高 k 介质如何接班；以及唯一能热氧化出 SiO$_2$ 的化合物半导体 SiC 有什么不同。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "6.1", title: "为什么是 Si/SiO$_2$", gist: R`硅是唯一能直接热生长出稳定、近乎电学完美氧化层的简单半导体；氧化层厚度从 1 nm 自然氧化层到 1 µm 场氧化层。`, gives: [], next: R`这层氧化物怎样“长”出来？` },
  { sec: "6.2", title: "Deal–Grove 模型", gist: R`氧化剂向内扩散、在界面反应；稳态下 $F_2=F_3$ 给出 $dx_o/dt=B/(2x_o+A)$，积分得线性–抛物线律；$B$、$B/A$ 服从 Arrhenius 律。`, gives: ["6.8", "6.9", "6.11", "6.12", "6.13", "6.14"], next: R`模型在干氧最初 20 nm 失灵——要修补。` },
  { sec: "6.3", title: "干氧薄氧异常", gist: R`在 Deal–Grove 速率上加一个随厚度指数衰减的增强项（Massoud），或用虚拟初始厚度 $x_i$ 与 $\tau$ 修正。`, gives: ["6.15", "6.16"], next: R`$C^*$ 随分压变化，于是 $B$、$B/A$ 也随压强变化。` },
  { sec: "6.4", title: "压强依赖", gist: R`Henry 定律：$C^*\propto P$。湿氧 $B$、$B/A$ 都 $\propto P$；干氧 $B/A\propto P^n$（$n\approx0.7$–0.8）。`, gives: ["6.17", "6.18", "6.19"], next: R`界面反应还依赖晶面。` },
  { sec: "6.5", title: "晶向依赖", gist: R`$B$ 与晶向无关（氧化层是非晶的），$B/A$ 按 (111) : (110) : (100) = 1.68 : 1.4 : 1 缩放。`, gives: ["6.20"], next: R`界面反应还依赖衬底掺杂。` },
  { sec: "6.6", title: "重掺杂增强", gist: R`N$^+$ 衬底中空位多，可为体积膨胀“让位”，$B/A$ 按 $V^*/V_i^*$ 增大。`, gives: ["6.21"], next: R`反过来，氧化也向衬底注入点缺陷。` },
  { sec: "6.7", title: "氧化与点缺陷", gist: R`界面反应消耗空位、产生间隙原子；少量间隙原子注入硅中，引起氧化增强/阻滞扩散（OED/ORD）。`, gives: [], next: R`离开平面：凸角、凹角与应力。` },
  { sec: "6.8", title: "二维氧化与应力", gist: R`柱与孔的氧化都被应力减慢、凹角更甚；用应力依赖的 $B/A$、$D$ 与非线性黏度建模，解释 LOCOS 鸟嘴。`, gives: ["6.22", "6.23", "6.24", "6.25"], next: R`形貌之外，界面的电学质量如何？` },
  { sec: "6.9", title: "界面与氧化层电荷", gist: R`$Q_f$、$Q_m$、$Q_{ot}$、$Q_{it}$（与 $D_{it}$）四类电荷的位置、来源与消除办法；氢钝化 $Q_{it}$。`, gives: ["6.26"], next: R`这些电荷少到看不见——要用电学方法测。` },
  { sec: "6.10", title: "C–V 与 I–V 表征", gist: R`MOS 电容的积累–耗尽–反型；高频/低频/深耗尽曲线；$Q_f$、$\phi_{MS}$ 使曲线平移，$D_{it}$ 使曲线拉伸；隧穿电流。`, gives: ["6.27", "6.31", "6.32", "6.35", "6.36"], next: R`隧穿把 SiO$_2$ 的减薄逼到尽头。` },
  { sec: "6.11", title: "高 k 介质", gist: R`用 $\kappa$ 更大的介质在更厚的物理厚度下得到同样电容：$t_{eq}=3.9\,t_{\text{hi-K}}/\kappa_{\text{hi-K}}$；还要禁带够宽、热力学稳定。`, gives: ["6.37", "6.39", "6.40", "6.41"], next: R`另一种能热氧化的半导体：SiC。` },
  { sec: "6.12", title: "SiC 的氧化", gist: R`多了一路 CO 外扩散；$B/A$ 与硅相同形式，$B$ 由 O$_2$ 内扩散与 CO 外扩散共同决定；C 面比 Si 面快近一个量级。`, gives: ["6.42", "6.46", "6.47", "6.51"] },
];

// ---------- 推导图 ----------
export const EQMAP_KIN = [
  { from: "6.3", to: "6.5", label: R`$F_2=F_3$` },
  { from: "6.4", to: "6.5", label: "" },
  { from: "6.5", to: "6.6", label: R`解出 $C_i$` },
  { from: "6.6", to: "6.7", label: R`$dx_o/dt=F_3/N_1$` },
  { from: "6.7", to: "6.8", label: R`定义 $A$、$B$` },
  { from: "6.8", to: "6.9", label: "分离变量积分" },
  { from: "6.10", to: "6.9", label: R`初值 $x_i$` },
  { from: "6.9", to: "6.11", label: "解二次方程" },
  { from: "6.9", to: "6.12", label: "两个极限" },
  { from: "6.13", to: "6.11", label: R`$B(T)$` },
  { from: "6.14", to: "6.11", label: R`$B/A(T)$` },
  { from: "6.8", to: "6.15", label: "加薄氧增强项" },
  { from: "6.14", to: "6.19", label: R`Henry：$C^*\propto P$` },
  { from: "6.14", to: "6.20", label: R`晶向只进 $C_2$` },
  { from: "6.14", to: "6.21", label: "空位" },
  { from: "6.14", to: "6.23", label: "应力" },
  { from: "6.8", to: "6.46", label: "SiC 同构" },
  { from: "6.46", to: "6.51", label: "" },
  { from: "6.47", to: "6.51", label: "" },
];
export const EQMAP_EL = [
  { from: "6.27", to: "6.31", label: "串联电容" },
  { from: "6.29", to: "6.30", label: R`$x_D$ 随 $V_G$ 变` },
  { from: "6.30", to: "6.31", label: "" },
  { from: "6.32", to: "6.34", label: R`$x_D\to x_{Dmax}$` },
  { from: "6.33", to: "6.34", label: "对耗尽区积分" },
  { from: "6.34", to: "6.35", label: R`$\div C_{ox}$` },
  { from: "6.36", to: "6.31", label: R`平带电压平移` },
  { from: "6.37", to: "6.38", label: R`同样的 $C$` },
  { from: "6.38", to: "6.39", label: R`$\kappa_{ox}=3.9$` },
];
export const EQMAP_LABELS = {
  "6.3": R`氧化层中的扩散 $F_2$`, "6.4": R`界面反应 $F_3$`, "6.5": "稳态通量相等", "6.6": R`界面浓度 $C_i$`, "6.7": "生长速率", "6.8": R`$dx_o/dt=B/(2x_o+A)$`,
  "6.9": "线性–抛物线律", "6.10": R`时间平移 $\tau$`, "6.11": R`显式解 $x_o(t)$`, "6.12": "线性 / 抛物线极限", "6.13": R`$B$ 的 Arrhenius 律`, "6.14": R`$B/A$ 的 Arrhenius 律`,
  "6.15": "Massoud 薄氧模型", "6.19": "干氧压强依赖", "6.20": "晶向因子", "6.21": "掺杂增强", "6.23": "应力减慢反应", "6.46": R`SiC 的 $B/A$`, "6.47": R`SiC 的 $B$`, "6.51": "SiC 线性–抛物线律",
  "6.27": "电容定义", "6.29": "电荷平衡", "6.30": "耗尽层电容", "6.31": "串联电容", "6.32": "反型时的电荷平衡", "6.33": "热产生率", "6.34": "产生电流", "6.35": "避免深耗尽的扫描速率",
  "6.36": "半导体功函数", "6.37": "平板电容", "6.38": "等电容条件", "6.39": "EOT",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "basics", label: "基本图像" },
  { id: "kinetics", label: "生长动力学" },
  { id: "beyond", label: "偏离一维平面" },
  { id: "electrical", label: "电学界面" },
  { id: "materials", label: "超越 Si/SiO2" },
];

export const concepts = [
  {
    id: "thermal_oxide", name_zh: "热氧化与 Si/SiO$_2$ 界面", name_en: "Thermal oxidation & the Si/SiO$_2$ interface", icon: "🔥", section_id: "6.1", group: "basics",
    plain: "把硅放进高温氧气或水汽里，表面就长出一层几乎完美的玻璃。",
    explain: R`硅在 800–1200 °C 的 $\mathrm{O_2}$ 或 $\mathrm{H_2O}$ 中直接生成非晶 SiO$_2$。这层氧化物禁带约 9 eV、耐高场、可选择性刻蚀、能掩蔽掺杂，更重要的是它与硅的界面在原子尺度上近乎突变，电学缺陷极少且长期稳定。

其他半导体做不到：锗的氧化物溶于水，SiC 氧化会放出 CO、界面差得多，III–V 族的氧化物成分不均匀。这正是硅取代锗、成为集成电路材料的根本原因。`,
    analogy: "像铝锅表面那层自生的氧化铝保护膜，但硅的这层“膜”还能当电路元件用——而且是迄今最好的绝缘体之一。",
    book_example: { what: R`图 6.1 列出从 1 nm 的自然/化学氧化层到 1 µm 场氧化层的各种用途；图 6.7 是 1.2 nm 栅氧的 TEM 照片。`, point: "从栅介质到场隔离，一种材料覆盖三个数量级的厚度。" },
    misconception: "热氧化层并不是“沉积”上去的；新的氧化物在 Si/SiO$_2$ 界面（底部）生成，而不是在表面。",
  },
  {
    id: "volume_expansion", name_zh: "体积膨胀与硅消耗", name_en: "Volume expansion & silicon consumption", icon: "📐", section_id: "6.2", group: "basics",
    plain: "长 1 份氧化层要吃掉 0.44 份硅；氧化层一半多在原表面之上。",
    explain: R`SiO$_2$ 中硅原子密度 $2.2\times10^{22}\ \mathrm{cm^{-3}}$，硅晶体中 $5.0\times10^{22}\ \mathrm{cm^{-3}}$。同样多的硅原子做成氧化物，体积变为约 2.2 倍。若各向同性膨胀，每个方向 +30%（$1.3^3\approx2.2$）；但衬底锁住了横向，于是全部膨胀只能沿厚度方向发生：原表面以下 0.44 $x_o$、以上 0.56 $x_o$。

被锁住的膨胀意味着氧化层处于压应力状态（可达 $5\times10^9\ \mathrm{dyn\,cm^{-2}}$），冷却时热膨胀失配又再加一些。`,
    analogy: "像往一排紧挨着的书里每本都塞一张卡片——书架两侧不能动，书只能往上冒。",
    book_example: { what: R`图 6.4 的 $1\to1.3^3\to1\times1\times2.2$ 示意；图 6.5 LOCOS 截面中氧化层在原表面上下各占一部分。`, point: "厚度测量、台阶高度、结深计算都要记得这个 0.44。" },
    misconception: "氧化层厚度不等于“硅表面下降了多少”——硅只损失 44%。",
  },
  {
    id: "three_fluxes", name_zh: "三段串联通量", name_en: "Series fluxes F1 = F2 = F3", icon: "🚰", section_id: "6.2", group: "kinetics",
    plain: "氧化剂要先到表面、再穿过氧化层、最后在界面反应；稳态下三段通量相等，最慢的一段说了算。",
    explain: R`$F_1$：气相输运到外表面；$F_2=D(C^*-C_i)/x_o$：穿过氧化层的扩散；$F_3=k_sC_i$：界面反应。稳态要求三者相等，否则某处会堆积氧化剂。

紧贴着竖插的硅片与平放的硅片长出一样厚的氧化层，说明 $F_1$ 极快、不限速，于是只需 $F_2=F_3$。它等价于两个“阻力”串联：$F=C^*/(1/k_s+x_o/D)$。薄时 $1/k_s$ 占主导（反应限制），厚时 $x_o/D$ 占主导（扩散限制）。`,
    analogy: "像水流过两段串联的水管：总流量由两段阻力之和决定。氧化层越长，第二段水管越长、越窄。",
    book_example: { what: "图 6.8 的浓度剖面与三个通量；图 6.9 两个极限的剖面。", point: R`$C_i/C^*=1/(1+2x_o/A)$：只看 $x_o$ 与 $A$ 之比就知道处在哪个区。` },
    misconception: "“扩散限制”不是说氧化剂扩散得慢，而是说相对于界面反应，穿过越来越厚的氧化层成了瓶颈。",
  },
  {
    id: "linear_parabolic", name_zh: "线性–抛物线律", name_en: "Linear-parabolic growth law", icon: "📈", section_id: "6.2", group: "kinetics",
    plain: R`先线性、后抛物线：$x_o^2/B+x_o/(B/A)=t+\tau$。`,
    explain: R`由 $dx_o/dt=B/(2x_o+A)$ 积分得 $x_o^2+Ax_o=B(t+\tau)$。$x_o\ll A$ 时 $x_o\approx(B/A)(t+\tau)$，速率恒定，等于界面反应能支持的最大速率；$x_o\gg A$ 时 $x_o\approx\sqrt{B(t+\tau)}$，厚度翻倍要四倍时间。

$\tau$ 把已有的初始氧化层 $x_i$ 折算成“已经长了多久”，使任意起点的氧化都能用同一条曲线描述。`,
    analogy: "像在越积越厚的雪里赶路：起初步伐只受腿速限制，后来每一步都要先蹚过更深的雪。",
    book_example: { what: "图 6.11：(100) 硅干氧、湿氧在 800–1200 °C 的厚度–时间曲线（由表 6-1 算出）。", point: "干氧适合薄而精的栅氧，湿氧适合厚的场氧。" },
    misconception: R`$B$ 不是扩散系数，而是 $D$ 乘以无量纲的 $2C^*/N_1$；$A$ 是长度而不是面积。`,
  },
  {
    id: "rate_constants", name_zh: "B 与 B/A 的物理含义", name_en: "Physical meaning of B and B/A", icon: "🌡️", section_id: "6.2", group: "kinetics",
    plain: R`$B$ 管扩散、$B/A$ 管界面；两者都按 Arrhenius 律随温度变化。`,
    explain: R`$B=2DC^*/N_1$ 的激活能（干氧 1.23 eV，湿氧 0.78 eV）与 $\mathrm{O_2}$、$\mathrm{H_2O}$ 在 SiO$_2$ 中扩散的激活能相近；$B/A=k_sC^*/N_1$ 的激活能都约 2 eV、与气氛无关，常归因于 Si–Si 键断裂。

因此：晶向只影响 $B/A$（界面反应位点数），不影响 $B$（非晶氧化层里的扩散）；压强通过 $C^*$ 同时影响两者；湿氧比干氧快主要因为 $\mathrm{H_2O}$ 的溶解度 $C^*$ 大约 600 倍。`,
    analogy: "B 像高速公路的通行能力，B/A 像收费站的处理速度；拓宽路面和多开收费窗口影响的是不同环节。",
    book_example: { what: "表 6-1 与图 6.10 的 Arrhenius 图；式 (6.17)–(6.20) 的压强与晶向依赖。", point: "看激活能就能猜出一个参数背后的物理过程。" },
    misconception: "(111) 比 (100) 氧化快并不意味着厚氧化层也快 1.68 倍——到了抛物线区，晶向影响消失。",
  },
  {
    id: "thin_anomaly", name_zh: "干氧薄氧异常", name_en: "Thin dry-oxide anomaly", icon: "🔬", section_id: "6.3", group: "kinetics",
    plain: "干氧最初约 20 nm 长得比 Deal–Grove 预言快得多，至今没有公认的物理解释。",
    explain: R`Deal 与 Grove 当年用一个虚拟初始厚度 $x_i$（约 20–23 nm）和相应的 $\tau$ 把这段异常“吸收”掉。现代模拟器多用 Massoud 的修正：在速率上加一项 $C\exp(-x_o/L)$，$L\approx7$ nm，激活能 2.37 eV，几乎与晶向无关——暗示这是薄氧化层自身的性质。

1965 年这只是小修补；可当栅氧只有几 nm 时，整片栅氧都落在“异常区”里，工艺只能依赖经验标定。湿氧没有这种异常。`,
    analogy: "像新铺的柏油路，最初几天车辙下陷得特别快，之后才按“正常”速率磨损。",
    book_example: { what: "图 6.12：700 °C 干氧数据，外推直线在纵轴上截出约 23 nm。", point: R`$x_i$ 与 $\tau$ 是拟合手段，不是真有一层初始氧化物。` },
    misconception: "薄氧异常不是自然氧化层造成的——实验中初始自然氧化层只有 1–2 nm。",
  },
  {
    id: "point_defects", name_zh: "氧化与点缺陷", name_en: "Oxidation & point defects", icon: "⚛️", section_id: "6.7", group: "beyond",
    plain: "界面反应要找地方安放多出来的体积：吃掉空位、挤出间隙硅原子。",
    explain: R`重掺杂 N$^+$ 硅中荷电空位多，空位能为膨胀“让位”，所以 $B/A$ 增大（式 6.21），线性区（低温、薄层）最明显，P$^+$ 区增强较弱。

反过来，界面也产生间隙硅原子 I。绝大多数回到氧化层中被反应消耗，不到千分之一注入硅衬底，却能让几十微米外的硼、磷扩散加快（OED）或锑扩散变慢（ORD）——这是第 7 章理解掺杂扩散机制的关键证据。`,
    analogy: "像拥挤的车厢里有人上车：要么占掉空座位（空位），要么把站着的人挤到别的车厢（间隙原子注入）。",
    book_example: { what: "图 6.14：磷注入区湿氧 5 min 长出两倍以上厚度；图 6.15：LOCOS 下埋层硼的 OED。", point: "氧化不是孤立工序，它会改写后续扩散。" },
    misconception: "用 As 还是 P 形成 N$^+$ 区对氧化增强没有区别——起作用的是费米能级（电活性浓度），不是杂质种类。",
  },
  {
    id: "stress_2d", name_zh: "二维氧化与应力减薄", name_en: "2D oxidation & stress retardation", icon: "🌀", section_id: "6.8", group: "beyond",
    plain: "在凸角和凹角上，氧化层被拉伸或挤压，应力让氧化变慢，凹角更甚。",
    explain: R`整根硅柱氧化后半径变为 $\sqrt{2.2}$ 倍，最外层旧氧化层被切向拉伸 48%；孔内则被挤压。Kao 的柱/孔实验发现：凸、凹都减薄，凹比凸严重，温度越低越严重，而且氧化层从不开裂——说明高温下它在黏性流动。

模型：法向应力减慢界面反应（式 6.23），静水压减慢扩散（式 6.24），黏度随切向应力按 $u/\sinh u$ 急剧下降（式 6.25）。这些用于模拟 LOCOS 鸟嘴与沟槽拐角。`,
    analogy: "像给一根柱子和一个洞口同时刷越来越厚的漆：柱子外面的漆被撑开，洞里的漆越刷越挤。",
    book_example: { what: "图 6.16–6.18：柱与孔的截面照片和归一化厚度–曲率曲线；图 6.19–6.20：考虑应力的 LOCOS 模拟。", point: "1D 的 Deal–Grove 在拐角处必须加应力修正。" },
    misconception: "凸角并不因为“更暴露在氧化剂中”而长得更厚——实验恰恰相反。",
  },
  {
    id: "oxide_charges", name_zh: "四类氧化层电荷", name_en: "Qf, Qm, Qot, Qit", icon: "⚡", section_id: "6.9", group: "electrical",
    plain: R`固定电荷 $Q_f$、可动离子 $Q_m$、氧化层陷阱 $Q_{ot}$、界面陷阱 $Q_{it}$——位置、成因、消除办法各不相同。`,
    explain: R`$Q_f$：界面 2 nm 内的正电荷，来自未完全氧化的硅，高温氧化与惰性气体退火可降低（“$Q_f$ 三角形”）。$Q_m$：$\mathrm{Na^+}$、$\mathrm{K^+}$，靠洁净工艺消除。$Q_{ot}$：辐射、等离子体、热载流子在体内造成的陷阱。$Q_{it}$：界面上的悬挂键 $\equiv\mathrm{Si}\cdot$，能级遍布禁带（U 形 $D_{it}$），可随表面势充放电，用 400 °C 氢气或合成气退火钝化成 $\equiv$SiH。

典型 $Q_f$、$Q_{it}$ 为 $10^9$–$10^{11}\ \mathrm{cm^{-2}}$，相当于每 $10^4$ 个界面硅原子才一个——物理方法根本看不见。`,
    analogy: "像一栋楼里的四种访客：长住户（Q_f）、流动摊贩（Q_m）、被困在楼层中的人（Q_ot）、门口随时进出的人（Q_it）。",
    book_example: { what: "图 6.21 位置示意；图 6.22 $Q_f$ 三角形；图 6.23 $D_{it}$ 的 U 形分布；式 (6.26) 氢钝化。", point: "工艺末尾的“高温惰性退火 + 400 °C 合成气退火”就是为此而设。" },
    misconception: R`$Q_{it}$ 与 $Q_f$ 常同时偏高，但只有 $Q_{it}$ 能被低温氢退火去掉。`,
  },
  {
    id: "cv_method", name_zh: "C–V 测量", name_en: "Capacitance–voltage measurement", icon: "📉", section_id: "6.10", group: "electrical",
    plain: "扫描栅压、用小交流信号测电容：积累得 C_ox，耗尽时下降，反型时到最小或回升。",
    explain: R`MOS 电容的电容是 $C_{ox}$ 与半导体电容串联。积累：$C=C_{ox}$；耗尽：$1/C=1/C_{ox}+x_D/\epsilon_s$；反型：高频下少子来不及产生，$x_D$ 钉在 $x_{Dmax}$，$C=C_{min}$；低频下反型层跟得上，回到 $C_{ox}$；直流扫得太快则深耗尽。

非理想：$Q_f$ 与 $\phi_{MS}$ 让曲线整体平移 $\phi_{MS}-qQ_f/C_{ox}$；$D_{it}$ 使曲线被“拉伸”；高低频曲线之差给出 $D_{it}$；偏压–温度应力（BTS）测 $Q_m$。`,
    analogy: "像用手指按压床垫测它的软硬：轻按只压到表层（积累），用力压到弹簧层（耗尽），弹簧到底就再也压不下去（反型）。",
    book_example: { what: "图 6.25–6.31：测量装置、三个工作区、HF/LF/深耗尽曲线、非理想效应和准静态法。", point: "一条曲线同时给出氧化层厚度、衬底掺杂、阈值电压、界面电荷。" },
    misconception: "高频 C–V 在反型区“平底”不是因为反型层不存在，而是因为反型层电荷跟不上交流信号。",
  },
  {
    id: "high_k", name_zh: "高 k 介质与 EOT", name_en: "High-K dielectrics & EOT", icon: "🧱", section_id: "6.11", group: "materials",
    plain: "介电常数大 4 倍，就能用 4 倍的物理厚度得到同样的电容，隧穿电流骤降。",
    explain: R`电容 $C=\kappa\epsilon_0/t$，所以只要 $t/\kappa$ 不变电容就不变：$\mathrm{EOT}=3.9\,t_{\text{hi-K}}/\kappa_{\text{hi-K}}$。隧穿电流随物理厚度指数下降，因此 $\kappa=16$、4 nm 的介质与 1 nm SiO$_2$ 电容相同而漏电小得多。

但 $\kappa$ 与禁带宽度此消彼长（图 6.33），带阶需 $\ge1$ eV；介质还必须与硅热力学稳定，不生成 SiO$_2$ 或硅化物。综合下来是铪基氧化物，2007 年 Intel 45 nm 节点首次量产，并且往往仍保留一层薄的界面 SiO$_2$。`,
    analogy: "像用更“导”电场的材料做隔墙：墙可以更厚（挡住漏水），却不减弱两边的耦合。",
    book_example: { what: "图 6.32 隧穿电流随厚度的指数变化；图 6.33 禁带–介电常数；图 6.34 与硅稳定的氧化物周期表。", point: "高 k 解决的是“漏电”，代价是失去 SiO$_2$ 那份近乎完美的界面。" },
    misconception: "EOT 不是高 k 层的物理厚度；测得的电学厚度还含量子效应和栅耗尽的零点几 nm 修正。",
  },
  {
    id: "sic_ox", name_zh: "SiC 的热氧化", name_en: "Thermal oxidation of SiC", icon: "💎", section_id: "6.12", group: "materials",
    plain: "SiC 也能长出 SiO$_2$，但要同时把碳以 CO 形式送出去；C 面比 Si 面快近十倍。",
    explain: R`$\mathrm{SiC}+1.5\mathrm{O_2}\to\mathrm{SiO_2}+\mathrm{CO}$。除了氧化剂内扩散与界面反应，还多一路 CO 外扩散。由于 $C_{O_2}^*\gg C_{CO}^*$，$B/A\approx K_fC_{O_2}^*/N_1$ 与硅同形；$B$ 则由“O$_2$ 进”与“CO 出”两个串联的扩散阻力共同决定，哪个大就由谁限速。

实验上 (000$\nosym{\bar1}$) C 面比 (0001) Si 面氧化快近一个数量级：C 面第一层碳原子易被氧化成稳定的 CO，而 Si 面每个硅原子有三根 Si–C 键连向下层，更难打断。`,
    analogy: "像一扇门既要进人又要出人：如果出口太窄（CO 难出去），进门再快也没用。",
    book_example: { what: "图 6.35 五个通量；图 6.36 C 面与 Si 面在 1050–1150 °C 的厚度–时间数据与 Deal–Grove 拟合；表 6.3。", point: "Deal–Grove 的“串联阻力”框架可以直接推广到多种反应产物。" },
    misconception: "SiC 的氧化层同样是 SiO$_2$，但界面质量远不如 Si/SiO$_2$——这限制了 SiC MOSFET 的沟道迁移率。",
  },
];

export const relations = [
  { from: "volume_expansion", to: "stress_2d", label: "膨胀受约束" },
  { from: "volume_expansion", to: "point_defects", label: "需安放体积" },
  { from: "three_fluxes", to: "linear_parabolic", label: "积分得到" },
  { from: "linear_parabolic", to: "rate_constants", label: "参数 B、B/A" },
  { from: "rate_constants", to: "thin_anomaly", label: "薄层失灵" },
  { from: "rate_constants", to: "point_defects", label: "掺杂改 B/A" },
  { from: "rate_constants", to: "stress_2d", label: "应力改 B/A、D" },
  { from: "thermal_oxide", to: "oxide_charges", label: "界面质量" },
  { from: "oxide_charges", to: "cv_method", label: "用 C–V 测" },
  { from: "cv_method", to: "high_k", label: "测 EOT" },
  { from: "thermal_oxide", to: "high_k", label: "减薄到极限" },
  { from: "three_fluxes", to: "sic_ox", label: "加 CO 通量" },
  { from: "thermal_oxide", to: "volume_expansion", label: "2.2 倍体积" },
  { from: "point_defects", to: "stress_2d", label: "同源：体积" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  R`**新氧化层长在底部**：氧化剂穿过已有氧化层扩散到 Si/SiO$_2$ 界面反应；体积变为 2.2 倍，消耗 0.44 $x_o$ 的硅。`,
  R`**串联阻力**：$F=C^*/(1/k_s+x_o/D)$ → $dx_o/dt=B/(2x_o+A)$ → $x_o^2/B+x_o/(B/A)=t+\tau$。薄时线性（界面限制），厚时抛物线（扩散限制），分界在 $x_o\sim A/2$。`,
  R`**看参数认物理**：$B$（激活能 0.78/1.23 eV）跟扩散走，与晶向无关、正比于压强；$B/A$（约 2 eV）跟界面走，随晶向（1.68 : 1.4 : 1）、压强（湿氧 $\propto P$，干氧 $\propto P^{0.7\text{–}0.8}$）、N$^+$ 掺杂而变。`,
  R`**偏离理想**：干氧最初 ~20 nm 的异常增强（Massoud 项）；凸角凹角的应力减薄；氧化向衬底注入间隙原子造成 OED/ORD。`,
  R`**电学质量**：$Q_f$、$Q_m$、$Q_{ot}$、$Q_{it}$ 只能用电学方法看见——C–V 曲线平移读出 $Q_f$ 与 $\phi_{MS}$、拉伸与 HF/LF 之差读出 $D_{it}$；SiO$_2$ 薄到隧穿主导后，由 EOT $=3.9t_{\text{hi-K}}/\kappa$ 的高 k 介质接班。`,
];

export const QUIZ = [
  { q: "把干氧温度固定、氧化时间从 1 h 延长到 4 h。若氧化已深入抛物线区，厚度大约变为原来的多少倍？", options: ["4 倍", "2 倍", "1.4 倍", "不变"], answer: 1, why: R`抛物线区 $x_o\approx\sqrt{Bt}$，时间 $\times4$ → 厚度 $\times2$。线性区才是 $\times4$。` },
  { q: "(111) 硅与 (100) 硅在 1100 °C 湿氧中长 2 µm 厚的场氧，两者厚度差别：", options: ["(111) 厚约 68%", "(111) 厚约 40%", "几乎相同", "(100) 更厚"], answer: 2, why: R`2 µm 远大于 $A$，处于抛物线区，由与晶向无关的 $B$ 决定；晶向只影响 $B/A$，只在薄层时显著。` },
  { q: "为什么竖插在舟上、彼此只隔几毫米的硅片能长出均匀的氧化层？", options: ["炉管里的气体流速极高", "气相输运 $F_1$ 远快于扩散与反应，不是限速步骤", "氧化层生长与气氛无关", "硅片之间的辐射加热更均匀"], answer: 1, why: "Deal 与 Grove 的叠片实验表明 $F_1$ 不限速，因此硅片排布不影响厚度——这让一炉可以装上百片。" },
  { q: R`N 型衬底 MOS 电容中，正的固定电荷 $Q_f$ 增加，高频 C–V 曲线会：`, options: ["向正栅压方向平移", "向负栅压方向平移", "被拉伸变缓", "反型区电容回升到 C_ox"], answer: 1, why: R`平移量 $-qQ_f/C_{ox}$：正电荷像额外的正栅压，使表面更 N 型，要更负的栅压才能耗尽和反型。拉伸来自 $D_{it}$。` },
  { q: "高频 C–V 在强反型区停在 C_min，而低频 C–V 回到 C_ox，根本原因是：", options: ["高频下界面陷阱不响应", "高频下反型层少子靠热产生跟不上交流信号，只能靠耗尽边缘移动", "高频下氧化层电容变小", "低频下耗尽层消失"], answer: 1, why: "N 型衬底中空穴只能靠热产生–复合提供，速度远慢于高频信号；电荷平衡只能靠耗尽区底边振动，测到 C_ox 与 C_Dmin 串联。" },
  { q: "$\kappa=20$ 的高 k 介质要做到 EOT = 1 nm，同时下面还有 0.4 nm 的界面 SiO$_2$，高 k 层物理厚度应为：", options: ["约 5.1 nm", "约 3.1 nm", "约 2.0 nm", "约 7.8 nm"], answer: 1, why: R`$t_{\text{hi-K}}=(\mathrm{EOT}-t_{IL})\kappa/3.9=0.6\times20/3.9\approx3.1$ nm。界面层“吃掉”了大部分 EOT 预算。` },
];

export const BRIDGE = R`本章多次“借用”了掺杂与点缺陷：重掺杂让氧化加速（式 6.21），氧化注入的间隙原子又让下方杂质扩散加速（OED），界面处杂质还会在硅与氧化层之间分凝。下一章把这些放回主角位置：从 Fick 定律出发，求解恒定源与有限源扩散的 erfc 与高斯分布，然后深入原子尺度——杂质为何要借助空位与间隙原子才能移动，而氧化又如何通过注入点缺陷改写扩散速率。`;
