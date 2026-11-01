// 第 8 章（下）高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "退火温度越低，杂质反而扩散得越远？";
export const HOOK = R`把同一个注入样品分成两半：一半在 800 °C 退火 2 分钟，另一半在 1000 °C 退火 10 秒。按第 7 章的 Fick 扩散，1000 °C 下扩散系数要大两个多数量级，即使时间短 12 倍，$Dt$ 也大得多——它的分布理应走得更远。可实测结果正好相反（图 8.35）：800 °C 的那一半扩散得更深。

这个"反常"让 1990 年代的工艺工程师吃尽了苦头：结深做不浅，阈值电压对不上，而且越想用低温"温和地"退火，问题越严重。谜底藏在注入留下的**损伤**里：每个离子把上千个 Si 原子撞离格点，绝大部分很快复合，却总会剩下"多出来的一个"间隙原子；这些间隙原子先抱团成 {311} 棒状缺陷，再在退火中缓慢"蒸发"，把间隙原子浓度抬高到平衡值的上千甚至上万倍——杂质借着它们疯狂扩散，直到 {311} 溶解完为止。这就是**瞬态增强扩散**（TED）。

本章（第 8 章下半）沿着"损伤 → 修复 → 残余缺陷 → TED → 怎样退火"这条线，建立一个只有几个参数却能定量预言 TED 的模型，并由此理解为什么今天的先进工艺要用毫秒级的闪光退火。最后看看离子注入在掺杂之外的妙用：SIMOX 与 Smart Cut 制造 SOI 晶圆，以及等离子体浸没注入。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "8.8", title: "损伤的产生：一个离子撞出上千个原子", gist: R`位移能 $E_{\rm d}\approx15$ eV 远小于离子能量；Kinchin–Pease 估计 $n=E_{\rm n}/2E_{\rm d}$；损伤在 $10^{-13}$ s 内产生、$10^{-11}$ s 内部分复合。`, gives: ["8.32", "8.33"], next: R`损伤会积累——积累到什么程度晶格就"崩"成非晶？` },
  { sec: "8.8", title: "非晶化阈值与固相外延", gist: R`沉积的核能量密度超过 $E_{\rm cr}\approx5\times10^{23}\,\mathrm{eV/cm^3}$ 即非晶化；非晶层在约 500 °C 由 SPE 逐层再生长，留下 a/c 界面处的 EOR 位错环。`, gives: ["8.34", "8.35"], next: R`低于阈值的区域怎么修复？那里留下的才是麻烦。` },
  { sec: "8.8", title: "+1 模型与 {311} 缺陷", gist: R`I、V 成对产生、几乎全部复合；离子占位多出一个间隙原子——"+1"。这些间隙原子在 >400 °C 迅速聚成 {311} 棒状缺陷，大剂量时可演化成位错环。`, gives: [], next: R`{311} 是间隙原子的"仓库"——仓库慢慢开闸会怎样？` },
  { sec: "8.9", title: "TED：幅度由团簇平衡决定", gist: R`团簇生长–蒸发 $\mathrm I+\mathrm{CI}_n\rightleftharpoons\mathrm{CI}_{n+1}$ 的平衡把自由间隙浓度钉在 $C_{\rm I}^{\max}=k_{\rm r}/k_{\rm f}$；过饱和度只依赖温度，800 °C 约 5000 倍。`, gives: ["8.36", "8.37", "8.38", "8.39", "8.40", "8.41", "8.42", "8.43", "8.44"], next: R`增强有多大知道了——能持续多久？` },
  { sec: "8.9", title: "TED：持续时间与总量", gist: R`间隙原子以通量 $d_{\rm I}C_{\rm I}^{\max}/R_{\rm P}$ 流向表面，$\tau_{\rm enh}\propto R_{\rm P}Q\,e^{(E_{\rm b}+E_{\rm m})/kT}$；总扩散量 $\propto D_{\rm A}/D^{\rm self}$，因 4.8 eV > 3.5 eV 而低温更多。`, gives: ["8.45", "8.46", "8.47", "8.48"], next: R`结论：要少 TED，就要"极高温、极短时"。设备怎么做到？` },
  { sec: "8.10", title: "闪光退火", gist: R`卤素灯预热 + 电容放电驱动的 Xe 闪光灯，毫秒内把晶圆表面加热到 1200 °C 以上，溶解 {311}、提高激活率。`, gives: [], next: R`这些规律在 Si 之外是否成立？` },
  { sec: "8.11", title: "化合物半导体与 SiC", gist: R`GaAs 有源层多靠外延，注入用于隔离；SiC 的非晶层几乎无法修复，常用高温注入，退火需 1600–1700 °C，但几乎没有扩散。`, gives: [], next: R`注入还能做什么？` },
  { sec: "8.12", title: "掺杂之外：SIMOX 与 Smart Cut", gist: R`$10^{18}\,\mathrm{cm^{-2}}$ 的 $\mathrm{O^+}$ 高温注入 + 1300 °C 退火形成埋氧（SIMOX）；$\mathrm{H^+}$ 注入 + 键合 + 劈裂制造 SOI（Smart Cut）。`, gives: [], next: R`当剂量大到束线机太贵时……` },
  { sec: "8.13", title: "等离子体浸没注入", gist: R`晶圆浸在等离子体中加负偏压：通量大、可保形掺杂三维结构，但无质量分选、能量分散——适合低能大剂量。`, gives: [], next: R`最后把整章（上、下两半）收拢成几条要点。` },
  { sec: "8.14", title: "要点小结", gist: R`注入精确控制剂量；损伤与 TED 是代价；SPE、+1 模型与 {311} 溶解动力学让我们能预言并控制它。`, gives: [] },
];

// ---------- 推导图 ----------
export const EQMAP_DAMAGE = [
  { from: "8.32", to: "8.34", label: R`核能量沉积 $\to$ 能量密度` },
  { from: "8.33", to: "8.32", label: R`$10^{-13}$ s 内完成` },
  { from: "8.34", to: "8.35", label: "非晶层 → SPE 修复" },
];
export const EQMAP_TED = [
  { from: "8.36", to: "8.37", label: "速率方程" },
  { from: "8.37", to: "8.40", label: "长时间：只剩蒸发" },
  { from: "8.37", to: "8.41", label: "稳态" },
  { from: "8.38", to: "8.42", label: R`$k_{\rm f}$ 扩散限制` },
  { from: "8.39", to: "8.42", label: R`$k_{\rm r}$ 蒸发` },
  { from: "8.41", to: "8.42", label: R`$C_{\rm I}=k_{\rm r}/k_{\rm f}$` },
  { from: "8.42", to: "8.43", label: R`除以 $C_{\rm I}^*$` },
  { from: "8.44", to: "8.43", label: "平衡浓度" },
  { from: "8.42", to: "8.45", label: R`梯度 $\approx C_{\rm I}^{\max}/R_{\rm P}$` },
  { from: "8.45", to: "8.46", label: "剂量 ÷ 通量" },
  { from: "8.46", to: "8.47", label: R`代入 $d_{\rm I}(T)$` },
  { from: "8.43", to: "8.48", label: "增强倍数" },
  { from: "8.47", to: "8.48", label: "持续时间" },
];
export const EQMAP_LABELS = {
  "8.32": "Kinchin–Pease 位移数", "8.33": "损伤产生时间", "8.34": "非晶化剂量", "8.35": "SPE 速率",
  "8.36": "团簇反应", "8.37": "团簇速率方程", "8.38": R`$k_{\rm f}$`, "8.39": R`$k_{\rm r}$`, "8.40": "指数衰减", "8.41": "稳态条件",
  "8.42": R`$C_{\rm I}^{\max}$`, "8.43": "过饱和度", "8.44": R`$C_{\rm I}^*$`, "8.45": "表面复合通量", "8.46": R`$\tau_{\rm enh}$`, "8.47": R`$\tau_{\rm enh}$ 的激活能`, "8.48": "TED 总量",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "dmg", label: "损伤的产生与修复" },
  { id: "ted", label: "残余缺陷与 TED" },
  { id: "proc", label: "退火与应用" },
];

export const concepts = [
  {
    id: "cascade", name_zh: "碰撞级联与位移", name_en: "Collision cascade", icon: "💥", section_id: "8.8", group: "dmg",
    plain: "一个高能离子像保龄球，撞出的 Si 原子又去撞别的原子，一路留下成百上千个空位和间隙原子。",
    explain: R`把一个 Si 原子撞离格点、并让它与留下的空位分开成稳定的 Frenkel 对，只需要位移能 $E_{\rm d}\approx15$ eV；而注入离子带着几十上百 keV。核碰撞交出的能量 $E_{\rm n}$ 在"反冲原子再撞别人"的级联中层层分配，直到每个运动原子的能量降到 $2E_{\rm d}$ 以下。于是位移数 $n\approx E_{\rm n}/2E_{\rm d}$（Kinchin–Pease），30 keV As 约 1000 个。整个过程在 $10^{-13}$ s 内完成，随后 $10^{-11}$ s 量级的局部跳跃让相当一部分复合。`,
    analogy: "开局一杆打散的台球：母球（离子）能量很大，每颗被撞的球又去撞别的，直到大家都慢下来。",
    book_example: { what: "例题：30 keV As 穿过约 90 个原子面，平均每面交出 333 eV，估计产生 1000 个位移原子（式 8.32，图 8.24）。分子动力学（图 8.25）显示 5 keV Si 级联中瞬时位移原子多达 800 个，8 ps 后已大量回位。", point: "损伤数量巨大，但大部分会自愈；关键在于自愈之后还剩什么。" },
    misconception: "位移原子数不是离子能量除以 15 eV：只有核碰撞那部分能量产生位移，而且每个反冲原子必须有 2E_d 以上才能增加运动原子数。",
  },
  {
    id: "amorph", name_zh: "非晶化阈值", name_en: "Amorphization threshold", icon: "🧊", section_id: "8.8", group: "dmg",
    plain: "损伤密到一定程度，晶格就整体塌成无序的非晶层。",
    explain: R`最简单的判据：单位体积沉积的核碰撞能量超过临界值 $E_{\rm cr}\approx5\times10^{23}\,\mathrm{eV/cm^3}$。于是临界剂量 $\Phi=E_{\rm cr}/NS_{\rm n}(E)$：100 keV As 约 $4\times10^{13}\,\mathrm{cm^{-2}}$，B 要大约 50 倍。重离子损伤沿整条路径较均匀，非晶层从表面长起；轻离子损伤集中在射程末端，先形成**埋层**非晶带再向两侧扩展（图 8.27）。注入温度越低、束流越大，自愈越少，阈值越低。`,
    analogy: "往一片整齐的麦田里踩脚印：脚印少时麦子能自己立回去，脚印密到一定程度整片就倒伏了。",
    book_example: { what: "300 keV $\\mathrm{Si^+}$ 在 $1\\times10^{15}\\,\\mathrm{cm^{-2}}$ 时只在 0.3 µm 深处出现一条埋层非晶带，到 $4\\times10^{15}\\,\\mathrm{cm^{-2}}$ 才连通到表面（图 8.27）。", point: "非晶化先出现在核能量沉积最大的深度。" },
    misconception: "非晶化并不总是坏事：非晶层可以由 SPE 几乎完美地修复，真正难缠的是阈值附近的晶体区。",
  },
  {
    id: "spe", name_zh: "固相外延再生长", name_en: "Solid-phase epitaxy (SPE)", icon: "🧱", section_id: "8.8", group: "dmg",
    plain: "非晶层以下面的晶体为模板，在 500–600 °C 一层一层地重新长成单晶。",
    explain: R`SPE 的速率 $v=A\exp(-2.3\,\mathrm{eV}/kT)$，2.3 eV 对应 Si–Si 键的断裂与重组；600 °C 时 $\langle100\rangle$ 约 50 nm/min、$\langle110\rangle$ 20 nm/min、$\langle111\rangle$ 仅 2 nm/min，重掺杂可快 10 倍。再生长过程中杂质大多直接进入替位，激活率高而几乎不扩散；非晶区里多余的间隙原子只是让晶体"多长一两层原子面"。`,
    analogy: "像结冰：冰面从已有的冰（晶种）一层层向外推进，新冰自动沿用旧冰的晶格取向。",
    book_example: { what: "图 8.32：525 °C 下非晶层在 20 分钟内从 a/c 界面逐层长回表面，原 a/c 界面处留下一条暗带（EOR 损伤）。", point: "SPE 修复非晶区几乎完美，留下的问题都在 a/c 界面以下。" },
    misconception: "SPE 不是熔化再结晶，它发生在远低于熔点的固相中。",
  },
  {
    id: "eor", name_zh: "射程末端（EOR）位错环", name_en: "End-of-range loops", icon: "⭕", section_id: "8.8", group: "dmg",
    plain: "非晶层正下方损伤\"差一点就非晶\"，这里会长出难以消除的位错环。",
    explain: R`a/c 界面以下紧挨着的是"晶体在该注入温度下能承受的最大损伤"。退火时这里过量的间隙原子聚成 {311} 缺陷和一带非本征位错环（多出一片 (111) 原子面）。它们比 {311} 稳定得多，若落在 pn 结耗尽区会降低寿命、增大漏电；若落在重掺杂区内则基本无害。`,
    analogy: "冰面与湖水交界处总有一圈杂乱的冰碴。",
    book_example: { what: "图 8.31、8.34（右）：SPE 区下方的 EOR 环与 +1 尾部。", point: "设计时要让 EOR 带落在重掺杂区内，而不是结区。" },
    misconception: "EOR 环不是 SPE 造成的，而是界面以下原本就存在的高损伤在退火中演化出来的。",
  },
  {
    id: "plus1", name_zh: "+1 模型", name_en: "\"+1\" model", icon: "➕", section_id: "8.8", group: "ted",
    plain: "成千上万的空位和间隙原子几乎全部两两抵消，最后只多出注入离子挤占格点时顶出来的那一个间隙原子。",
    explain: R`级联中的 I 与 V 严格成对产生，若全部复合晶体就完美了；但注入的杂质原子也要占一个格点，于是每个离子净剩一个 Si 间隙原子。+1 模型断言：在退火早期之后，残余间隙原子的面密度约等于注入剂量 $Q$，深度分布与杂质分布相同。Giles 等人的实验（同一深度、不同能量与倾角注入，TED 相同）有力地支持了它。非晶化注入中，SPE 区内的 +1 被再生长吸收，只有 a/c 界面以下的尾部计入。`,
    analogy: "派对散场时舞伴成对离开，只剩下自己带来的那位客人——他就是那个 \"+1\"。",
    book_example: { what: "图 8.28：40 keV、$5\\times10^{13}\\,\\mathrm{cm^{-2}}$ $\\mathrm{Si^+}$ 的模拟中，每个离子产生的上百对 I、V 在 $10^{-2}$ s 内几乎全部复合。", point: "一个参数（剂量）就决定了残余间隙原子的数量。" },
    misconception: "能量更高、初始损伤更多，并不意味着残余间隙原子更多——它们几乎都复合掉了。",
  },
  {
    id: "c311", name_zh: "{311} 缺陷", name_en: "{311} rod-like defects", icon: "🥢", section_id: "8.8", group: "ted",
    plain: "多余的间隙原子在 400 °C 以上迅速排队，沿 $\\langle110\\rangle$ 方向在 {311} 面上组成细长的\"棒\"。",
    explain: R`+1 间隙原子扩散极快却没有空位可复合，于是聚成团簇：间隙原子二聚体沿 $\langle110\rangle$ 排成带状，带面是 {311} 面（图 8.29）。900 °C 退火 5 s 后密度可达 $10^{11}\,\mathrm{cm^{-2}}$、长约 10 nm。它们是间隙原子的"仓库"：退火时缓慢蒸发、维持高的间隙过饱和度；剂量大时部分长大转变成稳定的位错环。`,
    analogy: "停车场：散乱的车（间隙原子）先停进停车场，再一辆辆慢慢开出去，出口处于是一直车流不断。",
    book_example: { what: "图 8.30：5 keV、$1\\times10^{14}\\,\\mathrm{cm^{-2}}$ $\\mathrm{Si^+}$ 在 800 °C 退火后，其他损伤都消失了，只剩几根 {311} 棒。", point: "TED 的源头就是这些棒状缺陷的溶解。" },
    misconception: "{311} 缺陷并非由空位组成，它们是间隙型的（多出的原子）。",
  },
  {
    id: "supersat", name_zh: "间隙过饱和度", name_en: "Interstitial supersaturation", icon: "📈", section_id: "8.9", group: "ted",
    plain: "团簇的生长与蒸发达到平衡时，自由间隙浓度被钉在平衡值的几百到上万倍。",
    explain: R`团簇反应 $\mathrm I+\mathrm{CI}_n\rightleftharpoons\mathrm{CI}_{n+1}$ 的正向速率 $k_{\rm f}=4\pi ad_{\rm I}$（扩散限制），逆向 $k_{\rm r}=(d_{\rm I}/a^2)e^{-E_{\rm b}/kT}$。平衡时 $C_{\rm I}^{\max}=k_{\rm r}/k_{\rm f}$——$d_{\rm I}$ 消掉了，与剂量无关。除以 $C_{\rm I}^*$ 得过饱和度 $\propto e^{(E_{\rm F}-E_{\rm b})/kT}=e^{1.19\,\mathrm{eV}/kT}$：温度越低越大（800 °C 约 5000，1200 °C 约 150）。`,
    analogy: "饱和蒸气压：只要锅里还有水（团簇），水面上方的蒸气浓度就固定在饱和值，与水有多少无关。",
    book_example: { what: R`例题：$C_{\rm I}^{\max}/C_{\rm I}^*=1.22\times10^{-2}\exp(1.19/kT)$（图 8.38）；实测 750 °C 约 10000、1000 °C 约 800。`, point: "增强倍数只由温度决定，所以剂量加倍不会让扩散更快，只会让它持续更久。" },
    misconception: R`过饱和度高不等于间隙原子绝对浓度高：1200 °C 时过饱和度小，但 $C_{\rm I}^*$ 大得多，$C_{\rm I}^{\max}$ 反而更高。`,
  },
  {
    id: "ted", name_zh: "瞬态增强扩散", name_en: "Transient enhanced diffusion (TED)", icon: "⚡", section_id: "8.9", group: "ted",
    plain: "只要 {311} 还没溶解完，靠间隙原子扩散的杂质就以正常速度的成百上千倍扩散；溶解完后一切恢复正常。",
    explain: R`TED 的总量 = 增强倍数 $\times$ 持续时间。持续时间 $\tau_{\rm enh}=Q$ 除以流向表面的通量 $d_{\rm I}C_{\rm I}^{\max}/R_{\rm P}$，正比于 $R_{\rm P}Q\,e^{(E_{\rm b}+E_{\rm m})/kT}$。两者相乘：$D_{\rm A}^{\rm eff}t_{\rm eff}=D_{\rm A}QR_{\rm P}/(d_{\rm I}C_{\rm I}^*)$，分子激活能约 3.5 eV，分母（Si 自扩散）约 4.8 eV——所以**温度越低，TED 总量越大**。剂量、能量增大都使 TED 更长。B、P 几乎全靠间隙机制，受害最深；Sb 靠空位，反而被抑制。`,
    analogy: "一阵突然的顺风：风力（增强倍数）低温时更大、持续时间也更长；高温时风小而且很快就停。",
    book_example: { what: "100 keV、$5\\times10^{13}\\,\\mathrm{cm^{-2}}$ P：800 °C 下 TED 约持续 3 分钟（图 8.40–8.42），1200 °C 下只有约 5 ms（图 8.43–8.44），总扩散量显著更小。", point: "要少 TED，就要极高温、极短时的退火。" },
    misconception: "TED 不能用\"降低温度、延长时间以保持 Dt 不变\"来补偿——低温恰恰让 TED 更严重。",
  },
  {
    id: "bic", name_zh: "硼–间隙原子团簇", name_en: "Boron–interstitial clusters (BIC)", icon: "🔗", section_id: "8.9", group: "ted",
    plain: "高浓度 B 会和间隙原子结成团簇，与 {311} 争夺间隙原子，使硼的 TED 更持久、部分硼失活。",
    explain: R`B 原子小、引入巨大应变，高浓度 B 层中 {311} 缺陷较少、却仍有明显 TED；TEM 上的小黑点可能就是 BIC。BIC 对间隙原子的结合能更高，释放更慢，所以 B 的 TED 瞬态拖得更长。但总体图像不变：TED 的幅度与持续时间由微观缺陷团簇蒸发间隙原子的过程控制。`,
    analogy: "另一家抢客的停车场，而且出口更窄。",
    book_example: { what: "原书 §8.9 末尾：As、P、Si 注入损伤的 TED 已被实验定量验证，B 的 TED 因 BIC 而更复杂。", point: "同一模型框架，换一个结合能更大的\"仓库\"。" },
    misconception: "BIC 中的 B 不在替位上，因此不仅扩散异常，也不提供载流子。",
  },
  {
    id: "flash", name_zh: "热预算与闪光退火", name_en: "Thermal budget & flash annealing", icon: "📸", section_id: "8.10", group: "proc",
    plain: "既然 TED 在高温下又小又短，就用毫秒级的极高温退火把 {311} 一扫而空。",
    explain: R`300 mm 晶圆放在几根细针上，卤素灯先预热到中间温度（可完成 SPE），再由电容放电驱动的 Xe 闪光灯在几毫秒内把表面加热到 1200 °C 以上：{311} 迅速溶解、杂质占位，高温下固溶度更大还能提高激活浓度、降低方块电阻。难点是保证片内温度均匀，否则热应力会引入缺陷。`,
    analogy: "煎牛排：大火快煎表面焦香、内部不老；小火慢炖则整块都熟透了。",
    book_example: { what: "图 8.48：闪光退火系统与温度–时间曲线。", point: "退火工艺的进化（炉 → RTA → 尖峰 → 闪光/激光）本质上就是在压缩 TED。" },
    misconception: "闪光退火并不是简单地\"减小 Dt\"——它利用的是 TED 持续时间随温度指数下降。",
  },
  {
    id: "soi", name_zh: "SIMOX 与 Smart Cut", name_en: "SOI by implantation", icon: "🥪", section_id: "8.12", group: "proc",
    plain: "用离子注入在硅里\"埋\"一层氧化物，或者用氢注入把一层薄硅\"剥\"下来贴到另一片晶圆上。",
    explain: R`SIMOX：约 200 keV、$10^{18}\,\mathrm{cm^{-2}}$ 的 $\mathrm{O^+}$ 在约 600 °C 下注入（防止非晶化），再在约 1300 °C 退火数小时，形成化学计量的埋氧层与单晶顶层。Smart Cut：氧化后的晶圆 A 注入 $10^{16}$–$10^{17}\,\mathrm{cm^{-2}}$ $\mathrm{H^+}$，与晶圆 B 键合，约 500 °C 时 H 在 $R_{\rm P}$ 处聚成微腔使 A 劈裂，再约 1100 °C 加固、CMP 抛平；顶层 Si 厚度由 $\mathrm{H^+}$ 能量决定，A 可回收。`,
    analogy: "SIMOX 像往蛋糕里注射一层奶油；Smart Cut 像沿着预先打好的一排孔把纸撕开。",
    book_example: { what: "图 8.49、8.50。", point: "注入不只是掺杂工具，它能精确地在给定深度放置大量原子。" },
    misconception: "Smart Cut 中起作用的主要不是 H 造成的损伤，而是 H 在射程处的高浓度。",
  },
  {
    id: "piii", name_zh: "等离子体浸没注入", name_en: "Plasma immersion ion implantation (PIII)", icon: "🌊", section_id: "8.13", group: "proc",
    plain: "不用束线，把晶圆直接泡在掺杂气体的等离子体里，加负偏压把离子吸进去。",
    explain: R`等离子体功率决定离子通量（可很大），衬底偏压决定离子能量；离子沿垂直于等势面的电场线入射，能保形地掺杂 FinFET、沟槽等三维表面，整片同时注入。代价：没有质量分选（如 $\mathrm{BF_3}$ 会同时注入 $\mathrm{B^+}$、$\mathrm{F^+}$ 等），气相碰撞使能量分散——适合低能、大剂量、对能量不敏感的应用。`,
    analogy: "束线注入像用狙击枪逐点射击；PIII 像下了一场垂直落下的雨。",
    book_example: { what: "图 8.51。", point: "成本与保形性 vs. 纯度与能量精度的权衡。" },
    misconception: "PIII 的离子并不都沿晶圆法向入射——\"垂直\"是相对于局部表面而言，正因如此才能掺杂三维结构的侧壁。",
  },
];

export const relations = [
  { from: "cascade", to: "amorph", label: "损伤积累" },
  { from: "amorph", to: "spe", label: "非晶层由它修复" },
  { from: "spe", to: "eor", label: "界面以下留下" },
  { from: "cascade", to: "plus1", label: "I、V 复合后剩下" },
  { from: "plus1", to: "c311", label: "聚集成" },
  { from: "c311", to: "supersat", label: "生长–蒸发平衡" },
  { from: "supersat", to: "ted", label: "增强杂质扩散" },
  { from: "c311", to: "eor", label: "大剂量时长成位错环" },
  { from: "bic", to: "ted", label: "B 的 TED 更持久" },
  { from: "ted", to: "flash", label: "高温短时可压缩" },
  { from: "amorph", to: "soi", label: "SIMOX 须高温注入避免" },
];

export const TAKEAWAYS = [
  <TxI>{R`**损伤**：核碰撞把能量交给晶格，$n\approx E_{\rm n}/2E_{\rm d}$（$E_{\rm d}\approx15$ eV），一个 30 keV As 约 1000 个位移原子；损伤在 $10^{-13}$ s 内产生，大部分随即复合。`}</TxI>,
  <TxI>{R`**非晶化与 SPE**：核能量密度 $\Phi NS_{\rm n}>E_{\rm cr}\approx5\times10^{23}\,\mathrm{eV/cm^3}$ 即非晶化（100 keV As 约 $4\times10^{13}\,\mathrm{cm^{-2}}$）；非晶层在约 500 °C 由 SPE 以 $v=A e^{-2.3\,\mathrm{eV}/kT}$ 逐层修复，留下 a/c 界面处的 EOR 位错环。`}</TxI>,
  <TxI>{R`**+1 与 {311}**：阈值以下 I、V 几乎全部复合，只剩与剂量相等的 "+1" 间隙原子，它们迅速聚成 {311} 棒状缺陷——TED 的间隙原子仓库。`}</TxI>,
  <TxI>{R`**TED 幅度**：团簇平衡把 $C_{\rm I}$ 钉在 $C_{\rm I}^{\max}=k_{\rm r}/k_{\rm f}$，过饱和度 $\propto e^{(E_{\rm F}-E_{\rm b})/kT}$ 只依赖温度（800 °C 约 5000）。**TED 持续时间** $\tau_{\rm enh}=4\pi a^3R_{\rm P}Q\,e^{(E_{\rm b}+E_{\rm m})/kT}/d_{\rm I}^0$，正比于剂量与射程。`}</TxI>,
  <TxI>{R`**TED 总量** $D_{\rm A}^{\rm eff}t_{\rm eff}=D_{\rm A}QR_{\rm P}/(f_{\rm I}^{\rm self}D^{\rm self}C_{\rm Si})$：分子约 3.5 eV、分母约 4.8 eV，所以低温退火扩散**更多**；对策是极高温、极短时的尖峰 / 闪光退火。B 的 TED 因 BIC 更持久。`}</TxI>,
  <TxI>{R`**其他**：SiC 注入损伤需 1600–1700 °C 修复且几乎无扩散；SIMOX、Smart Cut 用注入制造 SOI；PIII 以低成本、保形性换取纯度与能量精度。`}</TxI>,
];

export const QUIZ = [
  {
    q: "按 Kinchin–Pease 公式，下列哪一项会使一个离子产生的位移原子数**加倍**？",
    options: [R`位移能 $E_{\rm d}$ 加倍`, R`交给核碰撞的能量 $E_{\rm n}$ 加倍`, "注入剂量加倍", "离子质量加倍、能量不变"],
    answer: 1, why: R`$n=E_{\rm n}/2E_{\rm d}$：只与核碰撞能量成正比、与 $E_{\rm d}$ 成反比。剂量影响的是总损伤，不是每个离子的位移数；质量加倍会提高核阻止的比例，但 $E_{\rm n}$ 不超过入射能量，不一定加倍。`,
  },
  {
    q: "同样 100 keV，为什么 B 注入比 As 注入难非晶化得多？",
    options: ["B 的射程更短，能量更集中", R`B 的核阻止 $S_{\rm n}$ 小约 50 倍，大部分能量经电子阻止变成热`, "B 原子更小，容易进入间隙位", "B 注入一定在高温下进行"],
    answer: 1, why: R`式 (8.34) $\Phi=E_{\rm cr}/NS_{\rm n}$：只有核碰撞能量产生损伤。B 轻、速度快，主要靠电子阻止减速，$S_{\rm n}$ 小得多，所以临界剂量大约 50 倍（$>10^{15}\,\mathrm{cm^{-2}}$）。`,
  },
  {
    q: R`一个低于非晶化阈值的 P 注入，剂量从 $5\times10^{13}$ 加倍到 $10^{14}\,\mathrm{cm^{-2}}$（能量不变），TED 期间的**增强倍数**和**持续时间**如何变化？`,
    options: ["增强倍数加倍，持续时间不变", "增强倍数不变，持续时间加倍", "两者都加倍", "两者都不变"],
    answer: 1, why: R`过饱和度 \eqref{8.43} 只依赖温度（团簇的生长–蒸发平衡与剂量无关）；而持续时间 \eqref{8.47} 正比于需要被表面"消化"的 +1 剂量 $Q$。所以总 TED 加倍。`,
  },
  {
    q: "为什么 TED 在低温下反而更严重？",
    options: [R`低温下杂质扩散系数 $D_{\rm A}$ 的激活能更小`, R`TED 总量 $\propto D_{\rm A}/D^{\rm self}$，Si 自扩散的激活能（约 4.8 eV）大于杂质（约 3.5 eV）`, "低温下 {311} 缺陷数量更多", "低温下非晶层更厚"],
    answer: 1, why: R`由 \eqref{8.48}，$D_{\rm A}^{\rm eff}t_{\rm eff}=D_{\rm A}QR_{\rm P}/(f_{\rm I}^{\rm self}D^{\rm self}C_{\rm Si})$。降温时分母（自扩散，4.8 eV）比分子（3.5 eV）下降得更快，比值增大。物理上：过饱和度更高，且间隙原子扩散更慢、仓库清空更慢。`,
  },
  {
    q: "一个高剂量 As 注入使表面 80 nm 非晶化。退火时哪部分杂质分布会出现明显的 TED？",
    options: ["整个分布都均匀增强", "只有 SPE 再生长区内", "a/c 界面以下的尾部（+1 间隙原子在那里形成 {311}）", "完全没有 TED，因为 SPE 修复了所有损伤"],
    answer: 2, why: R`SPE 区内多余的间隙原子被再生长的晶体吸收，不产生 {311}；只有 a/c 界面以下的尾部按 +1 模型留下间隙原子，并在 EOR 区附近形成 {311} 与位错环（图 8.34、8.45–8.46）。`,
  },
  {
    q: "在 Smart Cut 工艺中，SOI 顶层硅的厚度主要由什么决定？",
    options: ["键合退火的温度", "CMP 的时间", R`$\mathrm{H^+}$ 注入的能量（决定 $R_{\rm P}$，即劈裂深度）`, "晶圆 B 的厚度"],
    answer: 2, why: R`H 在投影射程附近聚成微腔，晶圆 A 沿这个深度劈裂；所以转移层厚度由注入能量决定，CMP 只去掉很薄的粗糙层。`,
  },
];

export const BRIDGE = R`本章两半合起来讲完了离子注入：上半学会了"把多少杂质放到多深"，下半学会了"放进去之后晶格发生了什么、退火时杂质还会走多远"。到这里，前道（FEOL）的主要掺杂与热工艺——氧化、扩散、注入、退火——都已具备定量模型。下一章转向把图形"刻"进材料的工艺：等离子体刻蚀与化学机械抛光。本章 §8.13 刚提到的等离子体，将在第 9 章成为主角。`;
