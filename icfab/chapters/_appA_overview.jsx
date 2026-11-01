// 附录 A 的高层理解层：开场、路线图、推导图、核心概念、小结、自测。
const R = String.raw;

export const HOOK_TITLE = "同一块硅，为什么在炉管里和在手机里是两种材料？";
export const HOOK = R`一片掺了 $10^{17}\,\mathrm{cm^{-3}}$ 硼的硅，在你的手机里是标准的 P 型材料：空穴是电子的 $10^{14}$ 倍，费米能级贴近价带。把同一片硅推进 $1000^\circ$C 的扩散炉，热能把大量共价键打断，本征载流子浓度飙到 $7\times10^{18}\,\mathrm{cm^{-3}}$——这时它几乎是"本征"的，电子和空穴一样多，掺杂说不上话。第 7 章里扩散系数为什么要写成 $n/n_i$ 的函数，第 8 章里注入损伤为什么在退火时这样演化，根子都在这里。

这份附录就是全书的"工具箱"：前半部分（A.1）用最少的物理把载流子浓度、费米能级、$n_i(T)$、电离与复合讲清楚；后半部分是工程师桌上常备的表格与图——常数、硅和介质的性质、氧化层颜色色卡、Irvin 曲线、误差函数表。本页把这些表都做成了能在浏览器里**算**的工具。`;

export const ROADMAP = [
  { sec: "A.1.1", title: "键模型与本征激发", gist: R`共价键、金刚石晶格；断键产生电子–空穴对，浓度 $n_i$ 随温度剧增。`, gives: [], next: R`纯硅几乎不导电——要掺杂。` },
  { sec: "A.1.2", title: "掺杂与电阻率", gist: R`V 族施主、III 族受主一对一提供载流子；$\rho=1/(qn\mu_n+qp\mu_p)$。`, gives: ["A1.1"], next: R`要定量，就换成能带语言。` },
  { sec: "A.1.3", title: "能带模型", gist: R`$E_C$、$E_V$、$E_G$；杂质能级 $E_D$、$E_A$；电离反应。`, gives: ["A1.2", "A1.3"], next: R`能级上有多少态、各被占据多少？` },
  { sec: "A.1.4", title: "态密度与统计", gist: R`$D(E)\propto\sqrt{E-E_C}$；费米–狄拉克分布及其 Boltzmann 极限。`, gives: ["A1.4", "A1.6", "A1.7"], next: R`两者相乘再积分。` },
  { sec: "A.1.5", title: "载流子浓度与 $n_i$", gist: R`$n=N_Ce^{-(E_C-E_F)/kT}$，$np=n_i^2$，$n_i^2=N_CN_Ve^{-E_G/kT}$；以 $E_i$ 为参考的形式。`, gives: ["A1.8", "A1.9", "A1.11", "A1.12", "A1.13"], next: R`温度怎样改变这一切？` },
  { sec: "A.1.6", title: "冻析、非本征、本征", gist: R`器件工作在非本征区，工艺温度常落在本征区；$E_F$ 随温度向 $E_i$ 收拢。`, gives: [], next: R`低温与深能级时杂质不再全电离。` },
  { sec: "A.1.7", title: "不完全电离", gist: R`用 (A1.15) 计算电离杂质；单杂质的解析解 $\gamma_n$、$\gamma_p$。`, gives: ["A1.15", "A1.17", "A1.18"], next: R`把所有方程放进一个补偿例题。` },
  { sec: "A.1.8", title: "例题：补偿硅", gist: R`电中性 + 质量作用定律；室温、1000 °C、50 K 三种情形。`, gives: ["A1.19", "A1.20"], next: R`平衡之外：载流子怎样复合？` },
  { sec: "A.1.9", title: "SRH 复合与寿命", gist: R`间接带隙材料借深能级复合；$\tau_R=1/\sigma v_{th}N_t$，陷阱在禁带中央最有效。`, gives: ["A1.23", "A1.24", "A1.25"], next: R`接下来是常用数据与图表。` },
  { sec: "A.2", title: "词头、换算、常数（A.2–A.4）", gist: "可搜索的单位与物理常数表。", gives: [] },
  { sec: "A.5", title: "硅与介质的性质（A.5–A.6）", gist: R`硅的电/热/力学常数；$\mathrm{SiO_2}$、$\mathrm{Si_3N_4}$、$\mathrm{SiO_xN_y}$ 对比。`, gives: [] },
  { sec: "A.7", title: "氧化层颜色色卡", gist: "薄膜干涉决定颜色；交互色卡按物理公式计算并对照原表。", gives: [] },
  { sec: "A.8", title: "Irvin 曲线", gist: R`$\bar\sigma=1/\rho_Sx_j$ 与 $C_S$、$C_B$ 的关系；浏览器内重新积分。`, gives: [] },
  { sec: "A.9", title: "误差函数", gist: "erf/erfc 定义、性质、近似与数值表。", gives: [] },
  { sec: "A.10", title: "符号与缩写（A.10–A.11）", gist: "全书符号表与缩写表，均可搜索。", gives: [] },
];

export const EQMAP = [
  { from: "A1.4", to: "A1.8", label: R`$\int D_Cf\,dE$` },
  { from: "A1.7", to: "A1.8", label: "Boltzmann 近似" },
  { from: "A1.6", to: "A1.7", label: R`$E-E_F\gg kT$` },
  { from: "A1.8", to: "A1.10", label: R`$\Gamma(3/2)$` },
  { from: "A1.4", to: "A1.9", label: "价带同理" },
  { from: "A1.8", to: "A1.11", label: R`$n\cdot p$，$E_F$ 消去` },
  { from: "A1.9", to: "A1.11", label: "" },
  { from: "A1.11", to: "A1.12", label: R`代入 $N_C,N_V$` },
  { from: "A1.8", to: "A1.13", label: R`以 $E_i$ 为参考` },
  { from: "A1.12", to: "A1.13", label: "" },
  { from: "A1.6", to: "A1.15", label: "杂质能级的占据" },
  { from: "A1.15", to: "A1.16", label: R`$n=N_D^+$` },
  { from: "A1.16", to: "A1.17", label: "解二次方程" },
  { from: "A1.11", to: "A1.19", label: "+ 电中性" },
  { from: "A1.12", to: "A1.24", label: R`$np-n_i^2$ 驱动` },
  { from: "A1.23", to: "A1.24", label: R`$\tau$` },
  { from: "A1.24", to: "A1.26", label: R`表面：$1/\tau\to s$` },
  { from: "A1.25", to: "A1.26", label: "" },
  { from: "A1.12", to: "A1.1", label: R`$n,p$ 决定 $\rho$` },
];
export const EQMAP_LABELS = {
  "A1.1": "电阻率", "A1.4": "态密度", "A1.6": "费米–狄拉克", "A1.7": "Boltzmann 近似", "A1.8": R`$n$`, "A1.9": R`$p$`, "A1.10": R`$N_C,N_V$`,
  "A1.11": "质量作用定律", "A1.12": R`$n_i(T)$`, "A1.13": R`$n(E_F-E_i)$`, "A1.15": "电离杂质", "A1.16": "只有施主时", "A1.17": "部分电离解",
  "A1.19": "补偿材料的 n", "A1.23": "SRH 寿命", "A1.24": "SRH 复合率", "A1.25": "表面复合速度", "A1.26": "表面复合率",
};

export const groups = [
  { id: "carriers", label: "载流子与能带" },
  { id: "stats", label: "统计与温度" },
  { id: "process", label: "工艺中的数据工具" },
];

export const concepts = [
  {
    id: "bond_band", name_zh: "键模型与能带模型", name_en: "Bond vs band picture", icon: "🔗", group: "carriers", section_id: "A.1.3",
    plain: "同一件事的两种画法：键模型画原子和共价键，能带模型画电子的能量。",
    explain: R`键模型里，导电来自"断键"产生的自由电子和空穴，掺杂是用多一个或少一个价电子的原子替换硅；能带模型里，同样的事画成电子从价带被激发到导带、杂质在禁带里引入 $E_D$、$E_A$ 能级。前者直观，适合理解掺杂与扩散中杂质带电；后者可定量，适合计算 $n$、$p$、$E_F$。`,
    analogy: "像描述一栋楼：键模型是建筑平面图（谁和谁相连），能带模型是电梯楼层表（每层能量多高、住了多少人）。",
    book_example: { what: "图 A1.7、A1.8 并排画出同一块本征 / 掺杂硅的两种表示。", point: "两种模型描述同一物理过程，本书交替使用。" },
    misconception: "能带图里的横向位置不代表空间位置；一维能带图只画了能量这一维。",
  },
  {
    id: "dopant", name_zh: "施主与受主", name_en: "Donors and acceptors", icon: "➕", group: "carriers", section_id: "A.1.2",
    plain: "V 族原子放出一个电子（施主，N 型），III 族原子接受一个电子、留下空穴（受主，P 型）。",
    explain: R`载流子一对一地来自杂质，所以控制掺杂浓度就控制了电导率。电离后的杂质带电（$\mathrm{As^+}$、$\mathrm{B^-}$），既在器件中建立内建电场，也影响扩散（第 7 章）。浅杂质的 $E_C-E_D$、$E_A-E_V$ 只有几十 meV，室温几乎全电离。`,
    analogy: "施主像一个随手丢出零钱的人，受主像一个总想借钱的人——借走一枚硬币，就在别人兜里留下一个'空位'。",
    book_example: { what: R`硅中 As（49 meV）与 B（45 meV）掺杂；Table A1.2 列出各种材料的杂质能级。`, point: "能级越浅越容易电离；SiC、GaN 的 P 型杂质都很深。" },
    misconception: "掺杂后材料并不带电：载流子和电离杂质电荷相反、总量相等，整体电中性。",
  },
  {
    id: "fermi", name_zh: "费米能级", name_en: "Fermi level", icon: "📏", group: "stats", section_id: "A.1.4",
    plain: R`占据概率恰为 1/2 的能量；它在禁带中的位置一眼告诉你材料是 N 型还是 P 型、掺得多重。`,
    explain: R`$E_F$ 以上几个 $kT$ 的态基本空着，以下的基本填满。由 \eqref{A1.13}，$E_F$ 每比 $E_i$ 高一个 $kT$，$n$ 增大 $e$ 倍。平衡时整块材料（乃至接触在一起的不同材料）$E_F$ 处处相同。`,
    analogy: "像水库的水位线：水位以下的空间基本是满的，以上基本是空的；掺施主相当于往水库里加水，水位上升。",
    book_example: { what: R`例题 (a) 中 $E_i-E_F=0.36$ eV；图 A1.14 中 $E_F$ 随温度向 $E_i$ 收拢。`, point: "费米能级位置是掺杂水平的可视化标尺。" },
    misconception: "费米能级不是一个真实存在的电子能级，它通常落在禁带里——那里根本没有态。",
  },
  {
    id: "mass_action", name_zh: "质量作用定律", name_en: "Law of mass action", icon: "⚖️", group: "stats", section_id: "A.1.5",
    plain: R`平衡时 $np=n_i^2$：多子越多，少子越少。`,
    explain: R`由 \eqref{A1.8}\eqref{A1.9} 相乘，$E_F$ 消掉，乘积只与材料和温度有关。物理上是产生与复合的动态平衡：电子多了，与空穴相遇复合的机会增加，空穴被压低。它只在**平衡**时成立；有注入或抽取时 $np\ne n_i^2$，差值驱动 SRH 复合或产生。`,
    analogy: "像化学平衡常数：反应物浓度的乘积固定，加多一种，另一种就得减少。",
    book_example: { what: R`例题 (a)：$p=2\times10^{16}$，$n=n_i^2/p=1.05\times10^4\,\mathrm{cm^{-3}}$。`, point: "少子浓度可以比多子小十几个数量级。" },
    misconception: R`$np=n_i^2$ 不要求 $n=p$；它对掺杂材料同样成立（但重掺杂时 $n_i$ 本身要修正）。`,
  },
  {
    id: "ni_T", name_zh: "本征载流子浓度与温度", name_en: "Intrinsic carrier concentration", icon: "🌡️", group: "stats", section_id: "A.1.5",
    plain: R`$n_i\propto T^{3/2}e^{-E_G/2kT}$：随温度指数增长，室温 $10^{10}$，工艺温度 $10^{18}$。`,
    explain: R`由 \eqref{A1.12}，$n_i$ 由禁带宽度和温度决定，且 $E_G$ 本身随温度降低（Table A1.1）。宽禁带材料（SiC、GaN）的 $n_i$ 极小，适合高温、高压器件。在扩散与退火温度下，$n_i$ 常超过掺杂浓度，材料变成本征。`,
    analogy: "像沸点附近的水：温度一高，'蒸发'出来的电子–空穴对呈指数增加。",
    book_example: { what: R`硅 300 K 时 $n_i\approx1.45\times10^{10}$，1000 °C 时 $7.14\times10^{18}\,\mathrm{cm^{-3}}$。`, point: "工艺温度和器件温度下的 $n_i$ 相差 8 个数量级以上。" },
    misconception: R`"$10^{18}$ 掺杂一定是非本征的"——在 $1100^\circ$C 下并不一定。`,
  },
  {
    id: "dos", name_zh: "态密度与有效态密度", name_en: "Density of states", icon: "📊", group: "carriers", section_id: "A.1.4",
    plain: R`每个能量上允许多少电子态；带边附近按 $\sqrt{E-E_C}$ 增长，积分后等效成带边上的 $N_C$ 个能级。`,
    explain: R`态密度来自量子力学中的电子"盒中粒子"计数（\eqref{A1.4}），乘以占据概率积分，Boltzmann 近似下结果正好是带边上 $N_C=2(2\pi m^*kT/h^2)^{3/2}$ 个"等效能级"乘以占据概率。$N_C$、$N_V$ 随 $T^{3/2}$ 增长。`,
    analogy: "像体育场的座位：越往外圈座位越多，但观众（电子）大都挤在离场地（带边）最近的几排。",
    book_example: { what: R`硅 $N_C=3.2\times10^{19}$、$N_V=1.8\times10^{19}\,\mathrm{cm^{-3}}$。`, point: "掺杂接近 $N_C$ 时 Boltzmann 近似失效（简并）。" },
    misconception: "本页已改正原书 (A1.4)(A1.5) 漏掉的因子 $2^{3/2}$。",
  },
  {
    id: "regimes", name_zh: "冻析 / 非本征 / 本征", name_en: "Freezeout, extrinsic, intrinsic", icon: "🧊", group: "stats", section_id: "A.1.6",
    plain: "低温杂质电离不全；中温载流子等于掺杂；高温本征激发压倒掺杂。",
    explain: R`器件工作在中间的非本征区，那里 $n\approx N_D$ 与温度无关；工艺温度常在本征区，$n\approx n_i$。这一区别解释了为什么扩散与氧化模型中处处出现 $n_i(T)$。`,
    analogy: "像一个湖：冬天结冰（冻析），春秋水位由上游水库（掺杂）决定，夏天暴雨（本征激发）让水位暴涨、与水库无关。",
    book_example: { what: R`图 A1.13：$N_D=10^{15}$ 的硅，100 K 以下冻析，600 K 以上本征。`, point: "掺杂越重，进入本征区的温度越高。" },
    misconception: "非本征区并非完全没有本征激发，只是本征载流子远少于掺杂提供的载流子。",
  },
  {
    id: "ionization", name_zh: "不完全电离", name_en: "Incomplete ionization", icon: "🔋", group: "stats", section_id: "A.1.7",
    plain: "杂质能级深、温度低或掺杂重时，只有一部分杂质放出载流子。",
    explain: R`用 (A1.15) 计算杂质能级的占据；只有一种杂质时得到解析解 (A1.17)(A1.18)，关键参数是 $\gamma=\frac{N_{C,V}}{g}e^{-\Delta E/kT}$。**有补偿时**必须用完整电中性 $p+N_D^+=n+N_A^-$。`,
    analogy: "像存在银行定期里的钱：利率（温度）不够高、或取款门槛（能级深度）太高时，只能取出一部分。",
    book_example: { what: R`例题 (c)：50 K 下补偿硅中只有约 1/3 的硼电离。`, point: "补偿会大大压低低温下的自由载流子浓度。" },
    misconception: R`把"净掺杂"直接代入单杂质公式——在强补偿时会高估载流子浓度一个多数量级（见本页勘误）。`,
  },
  {
    id: "srh", name_zh: "SRH 复合与少子寿命", name_en: "SRH recombination", icon: "♻️", group: "carriers", section_id: "A.1.9",
    plain: R`间接带隙材料靠深能级陷阱先后俘获电子与空穴来复合；寿命 $\tau_R=1/\sigma v_{th}N_t$。`,
    explain: R`陷阱的常态是被多子占据，等待少子——所以少子俘获是瓶颈。\eqref{A1.24} 表明复合率正比于 $np-n_i^2$，陷阱在禁带中央最有效。表面的对应量是表面复合速度 $s$。寿命因此是可以通过吸杂或受控引入陷阱来设计的参数。`,
    analogy: "像只有一个窗口的换票处：窗口（陷阱）先收下一张票（电子），再等一个持另一种票的人（空穴）；人少的那一队决定了速度。",
    book_example: { what: R`$N_t=10^{12}\,\mathrm{cm^{-3}}$ 时 $\tau_R\approx1$ ms；第 4 章据此估算允许的重金属污染。`, point: "金属污染直接缩短少子寿命。" },
    misconception: "直接带隙材料（GaAs、GaN）的寿命主要是材料固有性质，不能靠控制陷阱来大范围调节。",
  },
  {
    id: "oxide_color", name_zh: "氧化层干涉色", name_en: "Oxide interference color", icon: "🌈", group: "process", section_id: "A.7",
    plain: "氧化层上下两个界面的反射光相互干涉，拿走某些颜色；厚度不同，看到的颜色不同。",
    explain: R`正入射下反射极小满足 $2n_{ox}x_{ox}=(m+\tfrac12)\lambda$。颜色序列每约 190 nm 重复一次（"级次"），越厚越淡。只能估厚度，精确测量要用椭偏仪或反射谱仪。`,
    analogy: "像肥皂泡和水面油膜上的彩色：膜厚变一点，颜色就变。",
    book_example: { what: "A.7 色表：120 nm 宝蓝、200 nm 浅金、310 nm 蓝、520 nm 绿。", point: "同色在不同级次重复，必须结合预期判断级次。" },
    misconception: "颜色不是二氧化硅本身的颜色——它是透明的；颜色完全来自干涉。",
  },
  {
    id: "irvin", name_zh: "Irvin 曲线", name_en: "Irvin curves", icon: "📈", group: "process", section_id: "A.8",
    plain: R`把测得的方块电阻乘以结深换成平均电导率，再查出扩散层的表面浓度。`,
    explain: R`对给定形状（erfc 或 Gauss）的分布，$\bar\sigma=1/\rho_Sx_j$ 只依赖 $C_S$ 和 $C_B$，与 $Dt$ 无关。积分时载流子取净掺杂、迁移率取总杂质浓度。原曲线（1962）是在计算机不普及时为工艺工程师准备的"查找表"。`,
    analogy: "像用身高和体重查 BMI 表：两个容易量的数，换出一个不容易直接看到的量。",
    book_example: { what: "图 A8.1–A8.4：N/P 型与 erfc/Gauss 的四种组合，各三条 $C_B$ 曲线。", point: "今天 TCAD 可直接算，但 Irvin 曲线仍是快速估算的利器。" },
    misconception: "Irvin 曲线假设杂质全电离、分布形状理想；离子注入 + 退火后的实际分布可能偏离，结果只是估算。",
  },
  {
    id: "erf", name_zh: "误差函数", name_en: "Error function", icon: "🧮", group: "process", section_id: "A.9",
    plain: "高斯曲线下的面积；恒定表面源扩散的浓度分布就是余误差函数 erfc。",
    explain: R`$\mathrm{erfc}(x)$ 从 1 单调降到 0，在 $x\approx2$ 处已降到 $0.005$。扩散中自变量是 $x/2\sqrt{Dt}$，所以结深与 $\sqrt{Dt}$ 成正比。大 $x$ 渐近式 $e^{-x^2}/(x\sqrt\pi)$ 可以快速估计尾部。`,
    analogy: "像墨水滴进静水后，离源头某处的浓度：越远越淡，'变淡的速度'由扩散长度 $\sqrt{Dt}$ 决定。",
    book_example: { what: "A.9 的数值表（0.00–3.00），本页逐项核对无误。", point: "原书的大 x 渐近式有误，本页已改正。" },
    misconception: "erf 的近似式只对非负自变量有效。",
  },
];
export const relations = [
  { from: "bond_band", to: "dopant", label: "两种图像都要描述掺杂" },
  { from: "dos", to: "fermi", label: "态密度乘占据概率得载流子" },
  { from: "fermi", to: "mass_action", label: "相乘消去 E_F" },
  { from: "mass_action", to: "ni_T", label: "n_i 决定少子浓度" },
  { from: "ni_T", to: "regimes", label: "n_i 与掺杂比大小" },
  { from: "dopant", to: "ionization", label: "杂质能级深度决定电离" },
  { from: "mass_action", to: "srh", label: "np 偏离平衡值驱动复合" },
  { from: "erf", to: "irvin", label: "erfc 分布的积分" },
];

export const TAKEAWAYS = [
  R`**载流子 = 态密度乘占据概率**：Boltzmann 近似下 $n=N_Ce^{-(E_C-E_F)/kT}$、$p=N_Ve^{-(E_F-E_V)/kT}$，二者之积 $np=n_i^2$ 与掺杂无关。`,
  R`**$n_i$ 随温度指数增长**：硅室温约 $10^{10}$，$1000^\circ$C 约 $7\times10^{18}\,\mathrm{cm^{-3}}$——工艺温度下许多区域是本征的，这是后续扩散模型中 $n/n_i$ 的来源。`,
  R`**费米能级是掺杂的标尺**：$n=n_ie^{(E_F-E_i)/kT}$；温度升高，$E_F$ 向 $E_i$ 收拢。`,
  R`**电离与补偿**：浅杂质室温全电离；深能级、低温或强补偿时要回到 (A1.15) 与完整的电中性方程。`,
  R`**SRH 复合**：$\tau_R=1/\sigma v_{th}N_t$，深能级陷阱在禁带中央最有效——金属污染直接缩短少子寿命。`,
  R`**工具**：氧化层颜色估厚度（注意级次）；Irvin 曲线由 $\rho_Sx_j$ 查表面浓度；erfc 是恒定表面源扩散的解。`,
  R`**本页改正的原书错误**：(A1.4)(A1.5) 漏因子 $2^{3/2}$；例题 (c) 未计补偿；erf 大 $x$ 渐近式；若干图号与单位笔误。`,
];

export const QUIZ = [
  { q: R`一块硅掺 $N_D=10^{16}\,\mathrm{cm^{-3}}$，室温下少子空穴浓度约为多少？（$n_i=1.45\times10^{10}$）`, options: [R`$10^{16}$`, R`$1.45\times10^{10}$`, R`$2\times10^{4}$`, R`$10^{-6}$`], answer: 2, why: R`$p=n_i^2/n=(2.1\times10^{20})/10^{16}\approx2\times10^4\,\mathrm{cm^{-3}}$。` },
  { q: R`同一块 $N_D=10^{16}$ 的硅放进 $1000^\circ$C 的炉管，它的状态是？`, options: ["仍是 N 型，n 约等于 N_D", "基本本征，n 约等于 p 约等于 n_i", "变成 P 型", "杂质全部冻析"], answer: 1, why: R`$1000^\circ$C 时 $n_i\approx7\times10^{18}\gg10^{16}$，材料是本征的。` },
  { q: R`为什么 $np=n_i^2$ 对掺杂材料也成立？`, options: ["因为掺杂不改变载流子数", R`因为 $n$、$p$ 表达式相乘时 $E_F$ 被消去，乘积只与材料和温度有关`, "因为杂质全部电离", "这只是一个经验规律"], answer: 1, why: R`由 \eqref{A1.8}\eqref{A1.9}，$np=N_CN_Ve^{-E_G/kT}$，与 $E_F$ 无关（Boltzmann 近似、平衡态下）。` },
  { q: R`SRH 复合中，哪种陷阱能级最有效？`, options: ["紧贴导带的浅能级", "紧贴价带的浅能级", "禁带中央附近的深能级", "与能级位置无关"], answer: 2, why: R`\eqref{A1.24} 分母含 $2n_i\cosh[(E_T-E_i)/kT]$，$E_T=E_i$ 时最小。` },
  { q: "一片硅上氧化层看起来是蓝色。仅凭颜色能否确定厚度？", options: ["能，蓝色唯一对应 310 nm", "不能，蓝色在不同级次重复出现（如约 120、310、490、890 nm……）", "不能，颜色与厚度无关", "能，只要知道是热氧化"], answer: 1, why: "颜色随厚度周期性重复，需要结合工艺预期或色环计数判断级次。" },
  { q: R`在 Irvin 曲线中，为什么结果与扩散时间 $Dt$ 无关？`, options: ["因为扩散系数是常数", R`因为分布形状固定时，$\sqrt{Dt}$ 同时缩放了积分区间和结深 $x_j$，平均电导率只依赖 $C_S$ 与 $C_B$`, "因为方块电阻与结深无关", "因为假设了杂质未电离"], answer: 1, why: R`$\bar\sigma=\frac1{x_j}\int_0^{x_j}\dots dx$，换元 $u=x/2\sqrt{Dt}$ 后 $\sqrt{Dt}$ 约掉。` },
];

export const BRIDGE = R`附录 A 是全书的公共工具箱：第 3 章用到晶格与杂质能级，第 4 章用 $\tau_R=1/\sigma v_{th}N_t$ 估算金属污染的危害，第 6 章用氧化层颜色和介质性质，第 7 章的扩散系数写成 $n/n_i$ 的函数并用 erfc 与 Irvin 曲线描述扩散层，第 8 章讨论注入杂质的电离与激活。遇到 $n_i$、$E_F$、$\mathrm{erfc}$ 时，回到这里查算即可。`;
