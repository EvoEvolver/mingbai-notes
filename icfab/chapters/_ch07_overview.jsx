// 第 7 章（上）高层理解层：开场、路线图、推导图、核心概念、小结与自测。
const R = String.raw;

export const HOOK_TITLE = "把一滴墨水放进晶体里：几纳米的误差值多少钱？";
export const HOOK = R`一颗先进逻辑芯片里，源漏延伸区的结深只有十来个纳米，掺杂浓度却高达 $10^{20}\,\mathrm{cm^{-3}}$——相当于每 500 个硅原子里就有一个杂质原子。结再深几纳米，漏极电场就会"够到"源极，晶体管关不断（DIBL 变差）；掺杂再淡一点，串联电阻又会吃掉驱动电流。工艺工程师手里能动的旋钮只有几个：剂量、温度、时间、气氛。

把杂质"放进去、推到位"靠的就是**扩散**。它和一滴墨水在水中化开是同一个物理过程：杂质从浓处流向淡处，流量正比于浓度梯度（Fick 定律）。不同的是，硅里的扩散发生在 900–1100˚C 的晶格中，速度对温度极端敏感（温度升 100˚C，扩散系数涨十倍以上），而且在高浓度下杂质"自己加速自己"，分布从平滑的误差函数变成陡峭的箱形。

本章（上）先把宏观扩散理论讲透：怎样用 Fick 定律算出浓度分布与结深，怎样把多步热处理折算成一个 $(Dt)_{\rm eff}$，怎样从方块电阻与结深的指标反推出工艺条件；再看这套理论在高浓度、电场与界面处如何被修正。原子尺度的机制（点缺陷）留给本章（下）。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "7.1", title: "为什么要精确控制掺杂", gist: R`结越来越浅、浓度越来越高；方块电阻 $\rho_S=\rho/x_j$ 把"能导多少电"和"结有多深"绑在一起；两步法（预淀积/注入 + 推进）。`, gives: ["7.1", "7.3", "7.4"], next: R`浓度能高到多少？先看固溶度这条天花板。` },
  { sec: "7.2", title: "固溶度：浓度的天花板", gist: R`化学固溶度可达几个原子百分比，但电激活浓度只有约 $2\times10^{20}\,\mathrm{cm^{-3}}$：多余的 As 结成 $\mathrm{As_4V}$ 等电中性团簇。`, gives: [], next: R`知道"放多少"，再问"怎么走"：宏观扩散方程。` },
  { sec: "7.3", title: "Fick 第一、第二定律", gist: R`通量正比于浓度梯度 $F=-D\partial C/\partial x$；加上质量守恒得 $\partial C/\partial t=\partial_x(D\partial_xC)$；$D$ 为常数时才能提到导数外。`, gives: ["7.5", "7.7", "7.8"], next: R`在最简单的边界条件下把它解出来。` },
  { sec: "7.4", title: "解析解：高斯与 erfc", gist: R`恒定剂量 → 高斯（表面浓度按 $1/\sqrt t$ 下降）；恒定表面浓度 → erfc（剂量按 $\sqrt t$ 增长）；扩散长度 $2\sqrt{Dt}$。`, gives: ["7.14", "7.15", "7.25", "7.26", "7.27"], next: R`公式里只出现 $Dt$：$D$ 从哪来？` },
  { sec: "7.5", title: "本征扩散系数", gist: R`$D=D^0\exp(-E_A/kT)$，常见杂质 $E_A\approx3.5$–$4$ eV；B、P 快，As、Sb 慢；浅结需要慢扩散杂质。`, gives: ["7.28"], next: R`真实工艺有很多步热处理，如何合并？` },
  { sec: "7.6", title: "多步热处理与热预算", gist: R`$(Dt)_{\rm eff}=\sum D_it_i$；指数激活使最高温步骤主导热预算；等效时间 $t_2^{\rm equiv}=t_1D_1/D_2$。`, gives: ["7.29", "7.30", "7.31"], next: R`现在可以反过来做设计了。` },
  { sec: "7.7", title: "扩散层的设计与评估", gist: R`$\rho_S$、$C_S$、$x_j$ 三者知二求一；Irvin 曲线给出 $\bar\sigma(C_S,C_B)$；完整例题：P 阱推进 6.8 h、注入剂量 $4.3\times10^{13}$。`, gives: [], next: R`解析解的条件常常不满足——转向数值解。` },
  { sec: "7.8", title: "模型与数值模拟", gist: R`原子在平面间随机跳跃 → $D=\tfrac{\nu_b}{2}\Delta x^2$；显式差分 $C_i^+=C_i+r(C_{i-1}-2C_i+C_{i+1})$，$r\le1/2$ 才稳定。`, gives: ["7.34", "7.37", "7.38"], next: R`有了数值工具，就能加入解析解处理不了的物理。` },
  { sec: "7.9", title: "电场效应", gist: R`电子跑得比电离杂质快，产生把杂质拉向体内的内建电场：$F=-hD\partial C/\partial x$，$1\le h\le2$；它对同处的低浓度杂质影响更大。`, gives: ["7.40", "7.41"], next: R`比电场更大的修正：$D$ 本身随浓度变化。` },
  { sec: "7.10", title: "浓度依赖扩散", gist: R`$D\propto n/n_i$ 或 $(n/n_i)^2$，分布变成箱形；$D_A^{\rm eff}=D^0+D^-(n/n_i)+D^=(n/n_i)^2$，参数见表 7.3。`, gives: ["7.42", "7.43", "7.44", "7.45"], next: R`最后一个边界条件：界面。` },
  { sec: "7.11", title: "分凝与界面堆积", gist: R`界面两侧浓度比 $m=C_{\rm Si}/C_{\SiO}$：B 被氧化层吸走、P/As 在硅侧"雪犁"堆积；超浅结还有单层界面陷阱造成的剂量损失。`, gives: ["7.49", "7.50", "7.51"], next: R`宏观描述到此为止；为什么 $D$ 会这样变？见本章（下）的点缺陷机制。` },
];

// ---------- 推导图 ----------
export const EQMAP_FICK = [
  { from: "7.5", to: "7.7", label: "质量守恒 (7.6)" },
  { from: "7.7", to: "7.8", label: R`$D$ 为常数` },
  { from: "7.8", to: "7.14", label: R`$\delta$ 初值 + 剂量守恒` },
  { from: "7.14", to: "7.15", label: "表面镜像，剂量 2Q" },
  { from: "7.15", to: "7.16", label: R`$x=0$` },
  { from: "7.14", to: "7.19", label: "薄片叠加" },
  { from: "7.19", to: "7.25", label: R`换元 $\eta$，用 erf` },
  { from: "7.25", to: "7.26", label: R`对称：$x=0$ 处恒为 $C/2$` },
  { from: "7.26", to: "7.27", label: R`对 $x$ 积分` },
  { from: "7.28", to: "7.30", label: R`各步 $D_i(T_i)$` },
  { from: "7.30", to: "7.31", label: R`令 $D_1t_1=D_2t_2$` },
];
export const EQMAP_EXT = [
  { from: "7.32", to: "7.34", label: "左右各半跳跃" },
  { from: "7.34", to: "7.37", label: "平面 i 的收支" },
  { from: "7.37", to: "7.38", label: R`稳定性 $r\le\tfrac12$` },
  { from: "7.7", to: "7.40", label: "加内建电场" },
  { from: "7.40", to: "7.41", label: "全电离 + 电中性" },
  { from: "7.7", to: "7.42", label: R`$D\to D(C)$` },
  { from: "7.42", to: "7.43", label: "带电点缺陷" },
  { from: "7.43", to: "7.45", label: R`$n=n_i$` },
  { from: "7.48", to: "7.49", label: "改写为分凝形式" },
  { from: "7.49", to: "7.50", label: R`稳态 $F_{AB}=0$` },
];
export const EQMAP_LABELS = {
  "7.5": "Fick 第一定律", "7.7": "Fick 第二定律", "7.8": "常 D 扩散方程", "7.14": "无限介质高斯", "7.15": "表面高斯（推进）", "7.16": R`表面浓度 $\propto1/\sqrt t$`,
  "7.19": "薄片叠加积分", "7.25": "无限源 erfc", "7.26": "恒定表面浓度 erfc", "7.27": "erfc 的剂量", "7.28": "Arrhenius", "7.30": R`$(Dt)_{\rm eff}$`, "7.31": "等效时间",
  "7.32": "跳跃频率", "7.34": "D 的微观表达", "7.37": "显式差分", "7.38": "稳定极限", "7.40": "电场增强通量", "7.41": "增强因子 h",
  "7.42": "浓度依赖 Fick", "7.43": R`$D_A^{\rm eff}$（n 型）`, "7.45": R`本征 $D_A^*$`, "7.48": "一级反应", "7.49": "界面通量", "7.50": "分凝系数",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "elec", label: "电学指标" },
  { id: "fick", label: "Fick 扩散" },
  { id: "proc", label: "工艺设计" },
  { id: "ext", label: "非理想效应" },
];

export const concepts = [
  {
    id: "sheet_res", name_zh: "方块电阻", name_en: "Sheet resistance", icon: "▦", section_id: "7.1", group: "elec",
    plain: R`一块正方形薄层两对边间的电阻，与正方形大小无关，单位 $\Omega/\square$。`,
    explain: R`对均匀掺杂层，$\rho_S=\rho/x_j$：电阻率除以结深。正方形边长加倍时，电流路径变长一倍，截面也宽一倍，两者抵消，所以"每方"电阻与尺寸无关。版图设计时只需数电阻条有几"方"。

掺杂不均匀时要按深度分层并联：$1/\rho_S=q\int_0^{x_j}[n(x)-N_B]\mu[n(x)]dx$，迁移率还随浓度变化——Irvin 曲线就是把这个积分预先算好。`,
    analogy: "像地毯的'每平方米价格'：不管裁成多大的正方形，从一边走到对边的'电阻'都一样；要看总电阻，数一数路上铺了几块方地毯。",
    book_example: { what: R`§7.7 例题：$\rho_S=900\,\Omega/\square$、$x_j=3\,\mu\mathrm m$ 的 P 阱，平均电导率 $\bar\sigma=3.7\,(\Omega\,\mathrm{cm})^{-1}$。`, point: "方块电阻、表面浓度、结深三者知二求一。" },
    misconception: "方块电阻不是'单位面积的电阻'；它的量纲就是欧姆，'方'只是几何计数。",
  },
  {
    id: "solubility", name_zh: "固溶度与电激活", name_en: "Solid solubility vs. electrical activity", icon: "⛔", section_id: "7.2", group: "elec",
    plain: "硅能'溶下'的杂质比能'用上'的多：超过约 2e20 的部分多半不导电。",
    explain: R`固溶度（图 7.4）是热力学上杂质还能留在替位格点而不析出第二相的上限，As、P 可达 $10^{21}\,\mathrm{cm^{-3}}$ 量级（几个原子百分比）。但电激活浓度在平衡下只有约 $2\times10^{20}\,\mathrm{cm^{-3}}$：多出的 As 会四个一组围住一个空位（$\mathrm{As_4V}$），每个 As 只有三个硅近邻、多余电子成孤对，整体电中性。

激光熔融、毫秒退火可以暂时得到更高的亚稳激活浓度，但后续热处理会把它们"打回原形"。`,
    analogy: "一个礼堂能塞进很多人（固溶度），但只有坐到座位上、拿到麦克风的人能发言（电激活）。挤在过道里抱团的人不算数。",
    book_example: { what: R`图 7.5：替位 $\mathrm{As^+}$ 与 $\mathrm{As_4V}$ 失活团簇的对比。`, point: "高浓度下'放进去'不等于'用得上'。" },
    misconception: "以为把浓度加到固溶度就能把电阻降到底——实际上超过电激活极限的杂质只增加散射、不增加载流子。",
  },
  {
    id: "fick_laws", name_zh: "Fick 第一、第二定律", name_en: "Fick's laws", icon: "🌊", section_id: "7.3", group: "fick",
    plain: "流量正比于浓度梯度；进多出少，浓度就涨。",
    explain: R`第一定律 $F=-D\,\partial C/\partial x$ 是"本构关系"：杂质从浓处流向淡处，比例系数是扩散系数 $D$，负号表示顺着梯度下降的方向流。第二定律是质量守恒：一个薄层里浓度的变化率等于流入减流出，$\partial C/\partial t=\partial_x(D\,\partial_xC)$。

只有 $D$ 与位置无关时才能写成 $D\,\partial^2C/\partial x^2$。高浓度时 $D$ 依赖于费米能级、进而依赖于局部浓度，这一步就不成立了（§7.10）。`,
    analogy: "和热传导（Fourier 定律）、电流（欧姆定律）同一个数学结构：'势'的梯度驱动'流'，守恒律把流和'量'的变化连起来。",
    book_example: { what: R`式 (7.5)–(7.9) 与图 7.6、7.7。`, point: "现代模拟器里最复杂的扩散模型，本质上仍是对 Fick 定律的'聪明应用'。" },
    misconception: R`把 $\partial C/\partial t=D\,\partial^2C/\partial x^2$ 当成普适的扩散方程——它只在 $D$ 为常数（本征、低浓度）时成立。`,
  },
  {
    id: "gaussian", name_zh: "高斯解（恒定剂量）", name_en: "Gaussian (fixed-dose) solution", icon: "🔔", section_id: "7.4", group: "fick",
    plain: R`剂量固定的杂质越扩越宽、越扩越矮：表面浓度 $\propto1/\sqrt t$。`,
    explain: R`$\delta$ 尖峰（剂量 $Q$）在无限介质中扩散成 $C=\frac{Q}{2\sqrt{\pi Dt}}e^{-x^2/4Dt}$；放在表面时表面相当于镜子，剂量加倍，$C=\frac{Q}{\sqrt{\pi Dt}}e^{-x^2/4Dt}$。高斯始终是高斯，所以多步热处理只要把 $Dt$ 相加。

这正是"推进"（drive-in）步骤：先浅浅地注入一个准确的剂量，再在高温下推到需要的结深。前提是初始分布的宽度远小于最终的 $2\sqrt{Dt}$。`,
    analogy: "一勺糖倒进一杯不搅拌的水：糖的总量不变，越来越均匀地铺开，杯底的甜度越来越低。",
    book_example: { what: R`§7.7 例题：$C_S=4\times10^{17}$、$Dt=3.7\times10^{-9}\,\mathrm{cm^2}$ 时 $Q=C_S\sqrt{\pi Dt}=4.3\times10^{13}\,\mathrm{cm^{-2}}$。`, point: "剂量守恒决定了表面浓度随时间下降。" },
    misconception: "以为推进时表面浓度保持不变——那是 erfc 预淀积的边界条件。",
  },
  {
    id: "erfc", name_zh: "erfc 解（恒定表面浓度）", name_en: "Error-function solution", icon: "📉", section_id: "7.4", group: "fick",
    plain: R`表面浓度被源钉住时，分布是 erfc，剂量按 $\sqrt t$ 不断增加。`,
    explain: R`无限源可以看成无数薄片，每片各自扩成高斯，叠加起来就是误差函数：$C=\tfrac C2\,\mathrm{erfc}(x/2\sqrt{Dt})$。由对称性，界面处浓度恒为一半，所以只看 $x>0$ 一侧并把表面浓度记作 $C_S$，就得到恒定表面浓度的解 $C=C_S\,\mathrm{erfc}(x/2\sqrt{Dt})$。

进入硅的剂量 $Q=2C_S\sqrt{Dt}/\sqrt\pi$：粗略地是一个高 $C_S$、底 $2\sqrt{Dt}$ 的三角形面积。气相/固相预淀积通常把表面浓度钉在固溶度上，这是它可重复的原因。`,
    analogy: "一块海绵放在一直开着的水龙头下：接触面总是湿透的（表面浓度恒定），吸进去的总水量随时间增长。",
    book_example: { what: R`§7.7 例题：950˚C、$C_S=2.5\times10^{20}$ 的硼预淀积只需 5.5 s 就能引入 $4.3\times10^{13}\,\mathrm{cm^{-2}}$。`, point: "低剂量预淀积在炉管里根本控制不了，所以要用离子注入。" },
    misconception: "erfc 与高斯在某一时刻形状相近（图 7.13），但随时间的演化截然不同。",
  },
  {
    id: "diff_length", name_zh: R`扩散长度 $2\sqrt{Dt}$ 与热预算`, name_en: "Diffusion length & thermal budget", icon: "📏", section_id: "7.6", group: "proc",
    plain: R`所有解只通过 $Dt$ 依赖时间与温度；$(Dt)_{\rm eff}=\sum D_it_i$ 就是热预算。`,
    explain: R`$2\sqrt{Dt}$ 是分布走了多远的尺度：高斯在 $x=2\sqrt{Dt}$ 处降到峰值的 $1/e$。多步热处理时各步 $D_it_i$ 直接相加（对高斯严格成立），所以总的"热预算"就是 $(Dt)_{\rm eff}$。

因为 $D$ 随温度指数增长，最高温的那一步往往占绝大部分；低温长时间的步骤可能完全可以忽略。换算温度时用等效时间 $t_2^{\rm equiv}=t_1D_1/D_2$。`,
    analogy: "像复利：一年 10% 和十年 1% 不是一回事，但只要'利率乘以时间'折算成同一个指数，就能比较。最高'利率'的那一段决定了结果。",
    book_example: { what: R`式 (7.29)–(7.31)；阱推进 6.8 h@1100˚C 必须放在流程最前面。`, point: "热预算是一种只会累加、不会退还的资源。" },
    misconception: "以为'一步 1 h + 一步 1 h'在不同温度下可以简单把时间相加。",
  },
  {
    id: "arrhenius", name_zh: "Arrhenius 激活的扩散系数", name_en: "Arrhenius diffusivity", icon: "🔥", section_id: "7.5", group: "fick",
    plain: R`$D=D^0e^{-E_A/kT}$：温度升 100˚C，D 涨一个数量级左右。`,
    explain: R`扩散需要原子越过势垒、并遇到点缺陷，两者都按 Boltzmann 因子随温度变化，所以 $\ln D$ 对 $1/T$ 是直线（图 7.14）。常见杂质 $E_A\approx3.5$–$4.0$ eV，硅自扩散高出约 1 eV。

B、In、P 是"快"扩散者，As、Sb 是"慢"扩散者；与原子尺寸或电荷态都没有简单的对应关系，要到点缺陷机制（本章下）才能解释。浅结中 n 型首选 As（慢且固溶度高），p 型只能用 B，所以浅 p$^+$ 结更难做。`,
    analogy: "像爬山越岭：温度是'体力'，活化能是山口高度。体力稍增，翻过山口的人数就成倍增加。",
    book_example: { what: R`表 7.2：B 的 $D^0=1.0\,\mathrm{cm^2/s}$、$E_A=3.5$ eV，1100˚C 时 $D\approx1.5\times10^{-13}\,\mathrm{cm^2/s}$。`, point: "温度是控制扩散最灵敏的旋钮。" },
    misconception: "把表 7.2 的本征值用于高浓度区——那时实际 D 大得多。",
  },
  {
    id: "irvin", name_zh: "Irvin 曲线", name_en: "Irvin's curves", icon: "📈", section_id: "7.7", group: "proc",
    plain: R`把式 (7.4) 的积分预先算好：给定 $C_S$、$C_B$，查出平均电导率。`,
    explain: R`对高斯或 erfc 分布，$\bar\sigma=1/(\rho_Sx_j)$ 只取决于表面浓度 $C_S$ 与本底 $C_B$（深度方向按 $x/2\sqrt{Dt}$ 归一后与 $Dt$ 无关）。Irvin 把它对 n/p 型、高斯/erfc 各画了一组曲线。

设计流程：由 $\rho_S$、$x_j$ 得 $\bar\sigma$ → 查曲线得 $C_S$ → 由 $C_S$、$C_B$、$x_j$ 解出 $Dt$ → 选温度定时间 → 回推剂量 → 检查假设（$\delta$ 函数近似、是否本征）。`,
    analogy: "像查表求贷款月供：利率、年限、本金三者知二求一，表格替你做完了积分。",
    book_example: { what: R`图 7.15：p 型高斯分布，$\bar\sigma=3.7$、$C_B=10^{15}$ 读出 $C_S\approx4\times10^{17}$。`, point: "查图的结果还要回头核对边界条件是否成立。" },
    misconception: "Irvin 曲线不是普适的：它依赖分布形状假设和所用的迁移率数据。",
  },
  {
    id: "fd_stability", name_zh: "有限差分与稳定性", name_en: "Finite differences & stability", icon: "🧮", section_id: "7.8", group: "proc",
    plain: R`把晶体切成平面，原子左右随机跳；显式算法要求 $D\Delta t/\Delta x^2\le1/2$。`,
    explain: R`每个平面上的原子以频率 $\nu_b$ 跳跃、左右各半，净通量正比于相邻平面的数目差——Fick 第一定律由此"长"出来，且 $D=\tfrac{\nu_b}2\Delta x^2$。平面 $i$ 的收支给出显式格式 $C_i^+=C_i+r(C_{i-1}-2C_i+C_{i+1})$，$r=D\Delta t/\Delta x^2$。

$r=1/2$ 时新值正好是左右邻点的平均；$r>1/2$ 等于要求一个平面在 $\Delta t$ 内跳走的原子比它拥有的还多，数值振荡会指数放大。隐式格式没有这个限制。`,
    analogy: "像一排人传水桶：每个人每次最多只能把自己桶里的水分给左右邻居，分得比自己有的还多，账就乱了。",
    book_example: { what: R`式 (7.35)–(7.39)。`, point: "数值方法的优势在于任意初始分布、任意 D(C)。" },
    misconception: "以为步长越大越快越好；显式格式超过稳定极限就会发散。",
  },
  {
    id: "efield", name_zh: "内建电场增强", name_en: "Electric-field enhancement", icon: "⚡", section_id: "7.9", group: "ext",
    plain: R`电子先跑、电离杂质被电场拖着走，通量最多加倍：$1\le h\le2$。`,
    explain: R`As 电离成 $\mathrm{As^+}$ 和电子，电子迁移率远大于杂质，会先扩散出去；电荷分离产生电场，阻止电子继续跑开，同时把 $\mathrm{As^+}$ 往体内拉。全电离时通量变为 $F=-hD\,\partial C/\partial x$，$h=1+C/\sqrt{C^2+4n_i^2}$。

对造成电场的高浓度杂质本身，最多加倍；但对同一位置的低浓度杂质，这个电场可以主导它的运动——图 7.18 中磷的电场把硼拉进 n$^+$ 区。`,
    analogy: "像遛狗：狗（电子）跑在前面，绳子（电场）一绷紧，人（杂质离子）也被拽着加快了脚步。",
    book_example: { what: R`图 7.18：1000˚C、15 min，P 与 B 分布在有/无电场时的对比。`, point: "电场效应只在浓度超过 $n_i$ 时出现。" },
    misconception: "以为电场会让所有杂质都变快——相反电荷的低浓度杂质可能被拉向相反方向。",
  },
  {
    id: "conc_dep", name_zh: "浓度依赖扩散与箱形分布", name_en: "Concentration-dependent diffusion", icon: "▭", section_id: "7.10", group: "ext",
    plain: R`浓度高处 $D$ 大、跑得快，前沿 $D$ 小、跑不动 → 平顶陡边的"箱形"分布。`,
    explain: R`高于 $n_i$ 时，带电点缺陷的浓度随费米能级变化，杂质扩散系数近似 $\propto n/n_i$ 或 $(n/n_i)^2$：$D_A^{\rm eff}=D^0+D^-(n/n_i)+D^=(n/n_i)^2$（n 型），$D^0+D^+(p/n_i)$（p 型）。此时 Fick 方程只能数值求解。

等浓度实验（如在均匀 $^{10}\mathrm B$ 背景里注入 $^{11}\mathrm B$）直接测出 $D$ 对背景浓度的依赖。1000˚C 下 $10^{20}$ 的 As 层，有效 D 比本征值大一个数量级。`,
    analogy: "像拥挤人群从广场涌向街道：广场中心人多、推挤激烈、走得快；到了人少的街口反而散不开，形成一道陡峭的'人墙'。",
    book_example: { what: R`表 7.3 与 §7.10 例题：As 在 1000˚C，$10^{18}$ 层 $D=1.43\times10^{-15}$，$10^{20}$ 层 $D=1.66\times10^{-14}\,\mathrm{cm^2/s}$。`, point: "D 不再是常数，而是分布本身的函数。" },
    misconception: "用本征 D 的 erfc 去拟合高浓度分布，会同时高估表面附近的梯度、低估结深的陡峭程度。",
  },
  {
    id: "segregation", name_zh: "分凝与界面剂量损失", name_en: "Segregation & interfacial dose loss", icon: "🧲", section_id: "7.11", group: "ext",
    plain: R`界面两侧平衡浓度之比 $m$：B 被氧化层吸走，P/As 被推回硅里；超浅结还会被界面单层吃掉一部分剂量。`,
    explain: R`杂质在两相中的化学势相等时达到平衡，浓度比 $m=C_{\rm Si}/C_{\SiO}$ 就是分凝系数。B 的 $m\approx0.3$：氧化层"更喜欢"硼，硅表面被耗尽；P、As、Sb 的 $m\approx10$：杂质被拒于氧化层之外。氧化时界面向硅内推进，被拒的杂质像雪犁前的雪一样堆在界面前。

此外，Si/SiO$_2$ 界面上约一个原子层厚的陷阱层可以俘获杂质（失活、可随氧化层一起被 HF 去掉），在超浅源漏延伸区可造成 25% 量级的剂量损失。`,
    analogy: "两种溶剂里溶同一种盐：盐更喜欢哪边，就往哪边多待一些；而一边的溶剂还在不断'吞并'另一边时，多余的盐会被推到交界处。",
    book_example: { what: R`图 7.20–7.23：LOCOS 下硼耗尽、氧化后 As/P 堆积与 B 耗尽、30 s 1050˚C RTA 后 25% 的 As 剂量损失。`, point: "界面也是一个边界条件，而且常常不是'反射'那么简单。" },
    misconception: R`以为 $m>1$ 就一定堆积：在移动界面下还要看被消耗的硅能提供多少杂质（交互图中的 $0.44m$ 判据）。`,
  },
];

export const relations = [
  { from: "fick_laws", to: "gaussian", label: "恒定剂量" },
  { from: "fick_laws", to: "erfc", label: "恒定表面浓度" },
  { from: "gaussian", to: "diff_length", label: "Dt 可相加" },
  { from: "arrhenius", to: "diff_length", label: "给出 D(T)" },
  { from: "sheet_res", to: "irvin", label: "式 7.4 积分" },
  { from: "irvin", to: "gaussian", label: "反推 Dt、Q" },
  { from: "solubility", to: "erfc", label: "钉住 C_S" },
  { from: "fick_laws", to: "fd_stability", label: "数值离散" },
  { from: "fd_stability", to: "conc_dep", label: "唯一解法" },
  { from: "efield", to: "conc_dep", label: "同属外征效应" },
  { from: "segregation", to: "fick_laws", label: "界面边界条件" },
  { from: "conc_dep", to: "sheet_res", label: "影响结深/电阻" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  R`**两个解、一个参数。** 恒定剂量 → 表面高斯 $C=\frac{Q}{\sqrt{\pi Dt}}e^{-x^2/4Dt}$；恒定表面浓度 → $C=C_S\,\mathrm{erfc}(x/2\sqrt{Dt})$，剂量 $Q=2C_S\sqrt{Dt/\pi}$。两者都只通过 $Dt$ 依赖工艺条件，扩散长度 $2\sqrt{Dt}$。`,
  R`**温度是最灵敏的旋钮。** $D=D^0e^{-E_A/kT}$，$E_A\approx3.5$–$4$ eV；多步热处理 $(Dt)_{\rm eff}=\sum D_it_i$ 由最高温步骤主导。`,
  R`**设计是反问题。** $\rho_S$、$C_S$、$x_j$ 知二求一：$\bar\sigma=1/\rho_Sx_j$ → Irvin 曲线 → $C_S$ → $Dt$ → 时间与剂量 → 回头检查假设。`,
  R`**解析解有前提。** 只在 $D$ 不随时间、位置变化（浓度低于 $n_i$、边界简单）时成立；否则用数值解，显式格式要求 $D\Delta t/\Delta x^2\le1/2$。`,
  R`**高浓度时 Fick 定律要修正。** 内建电场使通量乘以 $1\le h\le2$；带电点缺陷使 $D_A^{\rm eff}=D^0+D^-(n/n_i)+D^=(n/n_i)^2$，分布变成箱形。`,
  R`**界面不是镜子。** 分凝系数 $m=C_{\rm Si}/C_{\SiO}$ 决定 B 的耗尽与 P/As 的堆积；超浅结还要考虑界面单层陷阱造成的剂量损失。`,
];

export const QUIZ = [
  {
    q: R`同一杂质、同一温度下，"推进"（恒定剂量）时间加倍，表面浓度变为原来的多少？`,
    options: [R`不变`, R`$1/2$`, R`$1/\sqrt2$`, R`$\sqrt2$ 倍`],
    answer: 2, why: R`由 \eqref{7.16}，$C(0,t)=Q/\sqrt{\pi Dt}\propto t^{-1/2}$。不变的是恒定表面浓度的 erfc 情形；那时增加的是剂量，$Q\propto\sqrt t$。`,
  },
  {
    q: R`一个流程依次有 1100˚C 1 h、1000˚C 1 h、900˚C 1 h 三步（同一杂质）。哪一步对 $(Dt)_{\rm eff}$ 贡献最大？`,
    options: ["三步差不多", "1100˚C 那一步", "900˚C 那一步，因为它最后做", "取决于做的顺序"],
    answer: 1, why: R`$D$ 按 $e^{-E_A/kT}$ 激活，以 B 为例 1100˚C 的 $D$ 约是 1000˚C 的 10 倍、900˚C 的 100 倍；$Dt$ 相加与顺序无关（对高斯严格成立）。`,
  },
  {
    q: R`用显式格式 \eqref{7.37} 解扩散方程时，把 $r=D\Delta t/\Delta x^2$ 从 0.4 调到 0.6，会发生什么？`,
    options: ["精度略降但仍收敛", "解出现逐步放大的锯齿振荡", R`解与 $r=0.4$ 完全相同`, "时间步太大，扩散变慢"],
    answer: 1, why: R`$r>1/2$ 时最短波长误差模的放大因子 $|1-4r|>1$，每步放大；物理上相当于让一个平面在 $\Delta t$ 内跳走的原子多于它拥有的。`,
  },
  {
    q: R`1000˚C 下，表面浓度 $10^{20}\,\mathrm{cm^{-3}}$ 的 As 扩散分布通常比 erfc 更"方"，主要原因是：`,
    options: ["表面处固溶度限制", R`高浓度区 $D$ 随 $n/n_i$ 增大，前沿 $D$ 小`, "电场使通量最多增大 2 倍", "As 在氧化层中分凝"],
    answer: 1, why: R`$n_i(1000^\circ\mathrm C)\approx7\times10^{18}$，表面 $n/n_i\approx14$，表 7.3 给出的 $D$ 比本征值大一个数量级；浓度下降到 $n_i$ 附近时 $D$ 回落，形成陡峭的前沿。电场效应只贡献最多 2 倍。`,
  },
  {
    q: R`均匀掺硼的硅片热氧化后，硅表面附近的硼浓度会：`,
    options: ["升高（堆积）", "降低（耗尽）", "不变", "先升后降"],
    answer: 1, why: R`硼的分凝系数 $m=C_{\rm Si}/C_{\SiO}\approx0.3<1$，氧化层"吸"硼，硅侧被耗尽（图 7.20、7.21）；P、As 则 $m\approx10$，在硅侧堆积。`,
  },
  {
    q: R`为什么 §7.7 例题最终认为低剂量（$\sim4\times10^{13}\,\mathrm{cm^{-2}}$）应当用离子注入而不是炉管预淀积？`,
    options: ["预淀积的表面浓度太低", "在固溶度下预淀积只需几秒，炉管无法控制如此短的时间", "预淀积会产生注入损伤", R`预淀积的 $Dt$ 太大破坏了 $\delta$ 函数近似`],
    answer: 1, why: R`以 $C_S=2.5\times10^{20}$ 的固溶度预淀积，由 \eqref{7.27} 只需约 5.5 s；而气/固相预淀积要可重复，又必须把表面浓度钉在固溶度，所以低剂量做不准。`,
  },
];

export const BRIDGE = R`宏观理论到这里已经"打满补丁"：$D$ 要随浓度变、要乘电场因子、界面要分凝、注入后还有瞬态增强扩散。为什么 $D$ 会正比于 $n/n_i$？为什么氧化会加速硼和磷、却减慢锑？答案都在**点缺陷**——空位与自间隙原子——身上。本章（下）§7.12 起从原子尺度重建扩散理论：杂质如何借助空位、间隙机制移动，带电点缺陷的浓度如何随费米能级变化，以及这些机制如何统一解释本章看到的种种"反常"。`;
