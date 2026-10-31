// 第 4 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "宇宙最早的三分钟，写进了每一颗恒星的配方";
export const HOOK = `随便拿起一颗恒星的光谱、一团最古老的星系际气体的吸收线，你都会读到同一个数字：按质量算，大约四分之一是氦。这个比例几乎不随地点而变——不管是银河系里的年轻恒星，还是贫金属矮星系中几乎没被恒星"加工"过的电离气体。恒星燃烧确实会造氦，但远远造不出这么多。答案藏在宇宙诞生后的头几分钟：温度跌破 1 MeV 时，中子和质子之间的弱相互作用"跟不上"膨胀，中子比例被冻结在约 1/7；几分钟后，几乎所有剩下的中子都被装进了氦-4。

同样的剧情在宇宙史上还上演过两次：38 万年后，电子与质子结合成中性氢，光子从此畅通无阻——这就是今天的宇宙微波背景；而在更早、更热的时刻，一种我们至今叫不出名字的粒子也许正是这样"没来得及湮灭干净"，留下了今天占物质 85% 的暗物质。

这三件事——核合成、复合、暗物质遗迹——是同一个物理过程的三个版本：反应率掉到膨胀率以下，平衡被打破，丰度被"冻结"。本章用第 3 章的 Boltzmann 方程，把它们一次性算清楚。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "4.1", title: "一个通用的速率方程", gist: R`动力学平衡 + 玻尔兹曼统计把 Boltzmann 积分方程 \eqref{4.1} 化成一个常微分方程 \eqref{4.8}；反应率远大于 $H$ 时退化为化学平衡（Saha）条件 \eqref{4.9}。`, gives: ["4.5", "4.7", "4.8", "4.9"], next: R`有了这个"万能公式"，第一个应用：宇宙在 1 MeV 时的原子核。` },
  { sec: "4.2", title: "BBN：为什么核合成要等到 0.1 MeV", gist: R`$\eta_{\rm b}\sim6\times10^{-10}$ 意味着光子极多；氘的平衡（Saha）丰度 \eqref{4.16} 要等温度降到结合能的约 1/30 才变成 $\mathcal O(1)$——"氘瓶颈"。`, gives: ["4.10", "4.15", "4.16"], next: R`在此之前只有自由的中子和质子，所以先要算出中子比例。` },
  { sec: "4.2.1", title: "中子丰度的冻结", gist: R`弱相互作用率 $\lambda_{np}\propto T^3$ 比 $H\propto T^2$ 下降更快；解速率方程 \eqref{4.26} 得中子比例冻结在 $X_n\approx0.15$，再经中子衰变降到 $X_n(T_{\rm nuc})=0.11$。`, gives: ["4.22", "4.25", "4.26", "4.28"], next: R`这些中子最终去了哪里？——几乎全部进了氦-4。` },
  { sec: "4.2.2", title: "轻元素丰度", gist: R`在 $T_{\rm nuc}\sim0.07\,\mathrm{MeV}$ 氘一旦形成就立即烧成 $^4$He：$Y_P=2X_n(T_{\rm nuc})\approx0.22$，只对数依赖 $\eta_{\rm b}$；残余氘对 $\eta_{\rm b}$ 极敏感，是重子密度的探针。`, gives: ["4.29", "4.30", "4.31"], next: R`同样的"光子太多、结合被推迟"在原子尺度上再演一次：复合。` },
  { sec: "4.3", title: "复合与退耦", gist: R`Saha 方程 \eqref{4.34} 给出复合发生在 $T\approx0.3\,\mathrm{eV}\ll\epsilon_0$；但要追踪偏离平衡的 $X_e$ 必须解 \eqref{4.36}；散射率/膨胀率 \eqref{4.43} 说明光子在复合期间退耦。`, gives: ["4.34", "4.36", "4.39", "4.43", "4.44"], next: R`第三个、也是最具推测性的应用：暗物质能否同样是"冻结"的遗迹？` },
  { sec: "4.4", title: "暗物质：WIMP 的冻结", gist: R`对 $Y=n_X/T^3$ 写出 Riccati 方程 \eqref{4.49}；冻结后 $Y_\infty\simeq x_f/\lambda$，得到 $\Omega_Xh^2\simeq0.1\,(2\times10^{-26}\,\mathrm{cm^3s^{-1}}/\langle\sigma v\rangle)$——"WIMP 奇迹"；以及直接、间接、对撞机三类探测。`, gives: ["4.49", "4.50", "4.53", "4.56", "4.57"], next: R`最后把三段历史并列起来。` },
  { sec: "4.5", title: "小结", gist: R`三段"失衡"的历史：$T\sim0.1\,\mathrm{MeV}$ 的核合成、$z_*\sim1100$ 的复合、（可能的）$T\sim m_X/20$ 的暗物质冻结；后续各章只需要暗物质"冷、弱相互作用"与 $\Omega_{\rm c}$。` },
];

// ---------- 推导图（三张）----------
export const EQMAP_A = [
  { from: "4.1", to: "4.3", label: "动力学平衡 + 玻尔兹曼统计" },
  { from: "4.2", to: "4.3", label: R`$f\ll1$` },
  { from: "4.4", to: "4.6", label: R`$e^{\mu/T}=n/n^{(0)}$` },
  { from: "4.5", to: "4.6", label: R`定义 $n^{(0)}$` },
  { from: "4.3", to: "4.8", label: "代回 (4.1)" },
  { from: "4.6", to: "4.8", label: "" },
  { from: "4.7", to: "4.8", label: R`吸收进 $\langle\sigma v\rangle$` },
  { from: "4.8", to: "4.9", label: R`$n_2\langle\sigma v\rangle\gg H$` },
  { from: "4.9", to: "4.15", label: R`$n+p\leftrightarrow{\rm D}+\gamma$` },
  { from: "4.15", to: "4.16", label: R`$n_n\simeq n_p\simeq\eta_{\rm b}n_\gamma$` },
  { from: "4.16", to: "4.29", label: R`令右边 $\sim1$` },
  { from: "4.8", to: "4.22", label: R`$1=n,\ 3=p$` },
  { from: "4.22", to: "4.26", label: R`换变量 $x=\mathcal Q/T$` },
  { from: "4.25", to: "4.26", label: R`$H\propto\sqrt{g_*}T^2$` },
  { from: "4.26", to: "4.28", label: R`数值解 0.15 $\times$ 衰变 0.74` },
  { from: "4.27", to: "4.28", label: R`$e^{-t/\tau_n}$` },
  { from: "4.28", to: "4.30", label: "中子全进 He-4" },
  { from: "4.29", to: "4.30", label: R`$T_{\rm nuc}$` },
];
export const EQMAP_B = [
  { from: "4.9", to: "4.32", label: R`$e+p\leftrightarrow{\rm H}+\gamma$` },
  { from: "4.32", to: "4.34", label: R`$n_e=n_p$，代入 (4.5)` },
  { from: "4.8", to: "4.35", label: R`$1=e,\ 2=p,\ 3={\rm H}$` },
  { from: "4.34", to: "4.35", label: R`$n^{(0)}_en^{(0)}_p/n^{(0)}_{\rm H}$` },
  { from: "4.35", to: "4.36", label: R`$n_e=n_{\rm b}X_e$` },
  { from: "4.39", to: "4.36", label: R`$\alpha^{(2)}$` },
  { from: "4.36", to: "4.40", label: R`数值解 $X_e(z)$` },
  { from: "4.40", to: "4.43", label: R`除以 $H(z)$` },
  { from: "4.43", to: "4.44", label: R`令 $X_e=1$，比值 =1` },
];
export const EQMAP_C = [
  { from: "4.8", to: "4.45", label: R`$X+X\leftrightarrow\psi+\psi$` },
  { from: "4.45", to: "4.47", label: R`$Y=n_X/T^3$` },
  { from: "4.47", to: "4.49", label: R`$x=m_X/T$，$H\propto x^{-2}$` },
  { from: "4.49", to: "4.51", label: R`$Y\gg Y_{\rm EQ}$` },
  { from: "4.51", to: "4.53", label: R`积分 $x_f\to\infty$` },
  { from: "4.53", to: "4.55", label: R`$\rho_{X,0}=m_XY_\infty T_0^3/30$` },
  { from: "4.55", to: "4.56", label: R`$H(m_X)$ 由 (4.25)` },
  { from: "4.56", to: "4.57", label: R`代入数值` },
];
export const EQMAP_LABELS = {
  "4.1": "完整 Boltzmann 方程", "4.2": "玻尔兹曼分布", "4.3": "碰撞项化简", "4.4": R`$n$ 与 $\mu$`, "4.5": R`平衡数密度 $n^{(0)}$`, "4.6": R`化学势 → 数密度`,
  "4.7": "热平均截面", "4.8": "速率方程", "4.9": "化学平衡 / Saha", "4.15": "氘的 Saha 方程", "4.16": "氘丰度估计", "4.29": R`$T_{\rm nuc}$`,
  "4.22": "中子丰度方程", "4.25": R`$g_*$ 与 $\rho(T)$`, "4.26": R`以 $x$ 为变量`, "4.27": "时间–温度关系", "4.28": R`$X_n(T_{\rm nuc})=0.11$`, "4.30": "氦质量分数",
  "4.32": "复合的 Saha 方程", "4.34": R`Saha 解 $X_e$`, "4.35": "电子的速率方程", "4.36": R`$X_e$ 演化方程`, "4.39": "复合系数", "4.40": "汤姆孙散射率",
  "4.43": "散射率/膨胀率", "4.44": "无复合时的退耦", "4.45": "WIMP 速率方程", "4.47": R`$Y$ 的方程`, "4.49": "Riccati 方程", "4.51": "冻结后",
  "4.53": R`$Y_\infty\approx x_f/\lambda$`, "4.55": R`$\Omega_X$`, "4.56": R`$\Omega_X$ 与质量无关`, "4.57": "WIMP 奇迹",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "frame", label: "统一框架" },
  { id: "bbn", label: "核合成" },
  { id: "rec", label: "复合与退耦" },
  { id: "dm", label: "暗物质" },
];

export const concepts = [
  {
    id: "rate_eq", name_zh: "速率方程与热平均截面", name_en: "Rate equation & thermally averaged cross section", icon: "⚖️", section_id: "4.1", group: "frame",
    plain: R`共动粒子数的变化 = 产生 − 湮灭；一切细节被压缩进 $\langle\sigma v\rangle$。`,
    explain: R`完整的 Boltzmann 方程 (4.1) 是关于分布函数的积分–微分方程。两条近似让它变得可解：其一，散射极快，使各物种处于动力学平衡（分布形状由同一个 $T$ 和各自的化学势 $\mu$ 决定）；其二，$T\ll E-\mu$，量子统计的 $\pm1$ 可忽略（玻尔兹曼分布）。

于是只剩每种粒子一个未知函数 $n(t)$，方程 (4.8) 的右边是"产生项 − 湮灭项"，所有粒子物理被吸收进热平均截面 $\langle\sigma v\rangle$。核合成、复合、暗物质的计算都从这个式子出发，只是 1、2、3、4 换成不同的粒子（表 4.1）。`,
    analogy: "一个游泳池的进水口和出水口：水位（共动数密度）的变化只看进水速率减出水速率。不需要知道每个水分子的轨迹，只要两个阀门的流量公式。",
    book_example: { what: R`表 4.1：中子–质子比（$n+\nu_e\leftrightarrow p+e^-$）、复合（$e+p\leftrightarrow{\rm H}+\gamma$）、暗物质（$X+X\leftrightarrow\psi+\psi$）三个应用都是 (4.8) 的特例。`, point: "同一个方程，三段宇宙史。" },
    misconception: R`$\langle\sigma v\rangle$ 不是一个固定常数；它是按热分布平均的结果，一般依赖温度（例如 $\lambda_{np}\propto T^3$ 中就含有 $\langle\sigma v\rangle$ 的温度依赖）。`,
  },
  {
    id: "chem_eq", name_zh: "动力学平衡与化学平衡", name_en: "Kinetic vs chemical equilibrium", icon: "🔄", section_id: "4.1", group: "frame",
    plain: "散射决定\"形状\"（同温度），湮灭/产生决定\"数量\"（化学势是否平衡）。",
    explain: R`动力学平衡（kinetic equilibrium）：粒子之间频繁散射，能量重新分配，所有物种的分布都取 BE/FD/玻尔兹曼形式且温度相同，但各自的化学势 $\mu$ 可以任意。化学平衡（chemical equilibrium）：改变粒子数的反应也足够快，于是反应两边化学势之和相等 $\mu_1+\mu_2=\mu_3+\mu_4$，即 (4.9)。

早期宇宙中散射几乎总比湮灭快，所以动力学平衡通常成立；本章研究的三个过程，都是化学平衡被打破、需要追踪 $\mu$（等价地追踪 $n$）的时刻。`,
    analogy: "一场舞会：大家不停换舞伴（散射），整体\"热闹程度\"（温度）很快一致；但进出门（产生/湮灭）的速度如果跟不上，场内人数就不再由门外的人流决定。",
    book_example: { what: R`$e^++e^-\leftrightarrow\gamma+\gamma$ 处于化学平衡时要求 $\mu_{e^+}+\mu_{e^-}=2\mu_\gamma$；(4.9) 又名核统计平衡（NSE）或 Saha 方程。`, point: R`只要反应率 $n_2\langle\sigma v\rangle\gg H$，(4.8) 右边的两项就必须几乎抵消。` },
    misconception: "\"平衡\"不等于\"丰度不变\"：化学平衡时丰度随温度剧烈变化（如 $e^{-m/T}$），恰恰是失去平衡之后丰度才\"冻结\"不变。",
  },
  {
    id: "saha", name_zh: "Saha 方程与\"光子太多\"", name_en: "Saha equation & the photon excess", icon: "🌡️", section_id: "4.2", group: "frame",
    plain: "因为每个重子对应约十亿个光子，原子核和原子都要等温度降到结合能的几十分之一才能存活。",
    explain: R`对 $n+p\leftrightarrow{\rm D}+\gamma$ 应用 (4.9) 得 $n_{\rm D}/n_{\rm b}\sim\eta_{\rm b}(T/m_p)^{3/2}e^{B_{\rm D}/T}$。指数因子在 $T<B_{\rm D}$ 时就偏向氘，但前面的小系数 $\eta_{\rm b}\sim6\times10^{-10}$ 把它压住：直到 $B_{\rm D}/T\approx35$，即 $T\approx0.07\,\mathrm{MeV}$，右边才变成 1。

物理上：光子数是重子的 $10^9$ 倍，即使能量高于 $B_{\rm D}$ 的光子只占指数小的尾巴，每个新生的氘核在一个哈勃时间内仍会撞上一个这样的光子而被打碎。复合是同一剧情在原子尺度的重演：$\epsilon_0=13.6\,\mathrm{eV}$，复合却发生在 $T\approx0.3\,\mathrm{eV}$。`,
    analogy: "在一个满是捣蛋鬼的教室里搭积木：每个人都只是偶尔捣乱（高能光子只占尾巴），但人数实在太多，你搭一块就被推倒一块，直到捣蛋鬼们全都累得没力气。",
    book_example: { what: R`(4.13)–(4.16) 与 (4.29)；复合的 (4.34) 中右边在 $T\sim\epsilon_0$ 时约 $10^{15}$，只有 $X_e\approx1$ 才能满足。`, point: R`$\eta_{\rm b}$ 很小 ⇒ 结合被推迟；这也使 BBN 与复合的时刻对 $\eta_{\rm b}$ 只有对数依赖。` },
    misconception: R`核合成并不是在 $T\approx B_{\rm D}\approx2\,\mathrm{MeV}$ 开始，也不是复合在 $T\approx13.6\,\mathrm{eV}$ 发生——光子的数量优势把两者都推迟了约 30–50 倍。`,
  },
  {
    id: "freeze_out", name_zh: "冻结", name_en: "Freeze-out", icon: "🧊", section_id: "4.2.1", group: "frame",
    plain: R`当单个粒子的反应率掉到膨胀率 $H$ 以下，丰度不再追随平衡值，而是停在某个数上。`,
    explain: R`判据：(4.8) 左边 $\sim n_1H$，右边 $\sim n_1n_2\langle\sigma v\rangle$。若 $\Gamma\equiv n_2\langle\sigma v\rangle\gg H$，系统处于化学平衡；若 $\Gamma\ll H$，反应几乎停止，共动丰度保持不变——"冻结"。由于 $\Gamma$ 通常随温度下降得比 $H$ 快（例如 $\lambda_{np}\propto T^3$，$H\propto T^2$），每个反应都会在某个温度冻结。

冻结丰度可以由解速率方程精确得到；数量级上，冻结后的丰度约为冻结时的平衡值。对 WIMP，冻结后 $Y_\infty\simeq x_f/\lambda$：截面越大，冻结越晚，遗迹越少。`,
    analogy: "退潮的海滩上的水坑：潮水（反应）来回冲刷时水坑的水位与海面一致；一旦潮水退到够不着，水坑就保留着最后那一刻的水量。",
    book_example: { what: R`中子比例在 $T\lesssim0.5\,\mathrm{MeV}$ 冻结于 0.15（图 4.2）；复合后 $X_e$ 冻结于 $\sim10^{-4}$–$10^{-3}$（图 4.4）；WIMP 在 $x_f\sim10$–$20$ 冻结（图 4.5）。`, point: "宇宙中一切有趣的遗迹，都来自偏离平衡的时刻。" },
    misconception: R`冻结不是反应"突然停止"；它是一段渐变过程，所以要精确结果必须数值解速率方程，粗略的 $\Gamma=H$ 判据只给数量级。`,
  },
  {
    id: "g_star", name_zh: R`有效自由度 $g_*$`, name_en: "Relativistic degrees of freedom g*", icon: "🧮", section_id: "4.2.1", group: "frame",
    plain: R`辐射时代的能量密度 $\rho=g_*\pi^2T^4/30$；$g_*$ 数一数有多少种相对论粒子（费米子打 7/8 折）。`,
    explain: R`每个相对论玻色自由度贡献 $\pi^2T^4/30$，费米子贡献 7/8 倍。$T\sim1\,\mathrm{MeV}$ 时有光子 (2)、三代中微子 (6)、e$^\pm$ (4)：$g_*=2+\frac78\times10=10.75$。e$^\pm$ 湮灭之后只剩光子和较冷的中微子，$g_*=3.36$。$T\gtrsim100\,\mathrm{GeV}$ 时整个标准模型都是相对论的，$g_*\approx100$。

由 Friedmann 方程 $H=\sqrt{8\pi G\rho/3}\propto\sqrt{g_*}\,T^2$，所以 $g_*$ 决定了膨胀有多快，从而决定冻结的早晚。BBN 对 $g_*$ 的敏感正是它能限制额外中微子种类的原因。`,
    analogy: "宇宙的\"热容\"计数器：参与热平衡的粒子种类越多，同样温度下的能量越多、膨胀越快、时钟走得越快。",
    book_example: { what: R`(4.25)、(4.61) 中的 $\sqrt{10.75}$；(4.27) 用 $g_*=3.36$；(4.57) 用 $g_*(m_X)\approx100$。`, point: R`$g_*$ 把粒子物理内容转换成宇宙的膨胀速率。` },
    misconception: R`$g_*$ 不是"粒子种数"，而是加权后的自由度数；而且它随温度阶梯式变化——粒子变成非相对论并湮灭后就退出计数，同时加热光子。`,
  },
  {
    id: "np_ratio", name_zh: "中子–质子比", name_en: "Neutron-to-proton ratio", icon: "⚛️", section_id: "4.2.1", group: "bbn",
    plain: "中子比质子重 1.293 MeV；高温时两者一样多，降温后中子变少，最终冻结在约 1/7。",
    explain: R`平衡时 $n_p/n_n=e^{\mathcal Q/T}$，$\mathcal Q=m_n-m_p=1.293\,\mathrm{MeV}$。弱过程 $n+\nu_e\leftrightarrow p+e^-$ 等维持平衡，其速率 $\lambda_{np}$ 在 $x=\mathcal Q/T=1$ 时为 $5.5\,\mathrm{s^{-1}}$，略大于 $H=1.13\,\mathrm{s^{-1}}$；但 $\lambda_{np}\propto T^3$ 比 $H\propto T^2$ 下降得快，于是中子比例在 $T\lesssim0.5\,\mathrm{MeV}$ 冻结于 $X_n\approx0.15$（$n/p\approx0.18$）。

此后自由中子以 $\tau_n=886\,\mathrm s$ 衰变；到核合成在 $T_{\rm nuc}\approx0.07\,\mathrm{MeV}$（$t\approx270\,\mathrm s$）开始时，衰变把 $X_n$ 再乘以 0.74，得 0.11。`,
    analogy: "两种价格略有差别的货币自由兑换：市场活跃时兑换比例紧跟汇率（玻尔兹曼因子）；兑换窗口关闭（弱相互作用冻结）后，手里两种货币的比例就固定了——只剩一种（中子）还在慢慢\"贬值\"（衰变）。",
    book_example: { what: R`式 (4.18)–(4.28) 与图 4.2：实线（数值解）在 $T\sim1\,\mathrm{MeV}$ 离开虚线（平衡），之后平台约 0.18，$T\approx0.1\,\mathrm{MeV}$ 处因氘的形成陡降。`, point: "BBN 产物几乎完全由一个冻结比例决定。" },
    misconception: R`中子丰度冻结并不是因为中子衰变——冻结发生在 $\sim1\,\mathrm s$，而衰变寿命是 886 s；衰变只是后来再打一个 0.74 的折扣。`,
  },
  {
    id: "helium", name_zh: "氦丰度与氘探针", name_en: "Helium abundance & deuterium probe", icon: "🎈", section_id: "4.2.2", group: "bbn",
    plain: R`几乎所有中子都进了氦-4：$Y_P\approx2X_n\approx0.22$–$0.25$；残留的氘对重子密度极其敏感。`,
    explain: R`氦-4 结合能大，因子 $e^{B/T}$ 偏向氦，所以氘一形成就被迅速加工成 $^4$He；$A=5$ 处没有稳定核，$A=5$–$8$ 也没有足够稳定的核，低密度又使三 $\alpha$ 过程来不及发生，核合成就停在 $^4$He（加上微量 $^7$Li）。每个 $^4$He 含两个中子，所以质量分数 $Y_P=2X_n(T_{\rm nuc})$。

$Y_P$ 只对数依赖 $\eta_{\rm b}$（通过 $T_{\rm nuc}$），因而是检验标准 BBN 的稳健预言；残留的 D 则因 $\mathrm D+p\to{}^3\mathrm{He}+\gamma$ 未能烧尽而冻结在 $\sim3\times10^{-5}$，重子越多烧得越干净，所以 D/H 是 $\Omega_{\rm b}h^2$ 的灵敏探针（类星体吸收线测量）。`,
    analogy: "做饺子：面皮（质子）有很多，馅（中子）有限，几乎所有馅都被包进饺子（氦）里；剩下零星没包完的馅（氘）多少，取决于包饺子的人手（重子密度）够不够。",
    book_example: { what: R`式 (4.30)–(4.31)，图 4.3（BBN 期间各元素质量分数的演化），图 1.6（丰度对 $\Omega_{\rm b}h^2$ 的依赖）。`, point: "氦检验理论，氘测量重子。" },
    misconception: R`$Y_P$ 是质量分数而非数目比：按数目算氦核只占氢核的约 1/12。`,
  },
  {
    id: "recombination", name_zh: "复合与 Peebles 瓶颈", name_en: "Recombination & the Peebles bottleneck", icon: "💡", section_id: "4.3", group: "rec",
    plain: "电子与质子首次结合成中性氢；平衡（Saha）给出时刻，但真实过程被\"到基态的光子\"卡住，拖得更久。",
    explain: R`Saha 方程 (4.34) 表明复合发生在 $T\approx0.3\,\mathrm{eV}$（$z\approx1300$）而非 $13.6\,\mathrm{eV}$。但随着 $X_e$ 下降，复合率 $\propto X_e^2$ 也下降，平衡难以维持，必须解 (4.36)。

关键细节：直接复合到基态放出的光子会立即电离另一个原子，净效果为零，所以只计复合到激发态的 $\sym{ch04-alpha2}{\alpha}^{(2)}$。而处于 $n=2$ 的原子要落到基态，又得靠缓慢的双光子衰变（$8.227\,\mathrm{s^{-1}}$）或让 Ly$\alpha$ 光子被膨胀红移出共振——否则又被电离。Peebles 因子 $C$ 正是"成功落地"的概率。结果：$X_e$ 的下降比 Saha 慢得多，最终冻结在 $\sim2\times10^{-4}$。`,
    analogy: R`一个只有一条窄楼梯的体育馆散场：大家都想离开（复合），但楼梯（$n=2\to1$ 的跃迁）一次只能走一点人，于是退场比"按需求"预计的慢得多。`,
    book_example: { what: "式 (4.32)–(4.39)、习题 4.7 的 (4.62)–(4.63)、图 4.4（CLASS 数值解与 Saha 解的比较）。", point: R`Saha 能抓住复合的红移，抓不住 $X_e$ 的演化，而后者决定 CMB 各向异性的精确形状。` },
    misconception: "\"复合\"（recombination）是误称：这是电子与质子第一次结合，并没有\"再\"。",
  },
  {
    id: "decoupling", name_zh: "光子退耦与再电离", name_en: "Photon decoupling & reionization", icon: "📸", section_id: "4.3", group: "rec",
    plain: R`当汤姆孙散射率 $n_e\sigma_{\rm T}$ 掉到 $H$ 以下，光子自由飞行——CMB 就是那一刻的快照。`,
    explain: R`$n_e\sigma_{\rm T}/H\approx129X_e(\Omega_{\rm b}h^2/0.022)(0.14/\Omega_{\rm m}h^2)^{1/2}((1+z)/1000)^{3/2}[\cdots]^{-1/2}$。$z\gg10^3$ 时 $X_e=1$，散射率远大于膨胀率；复合使 $X_e$ 骤降，当 $X_e\lesssim10^{-2}$ 时比值降到 1 以下——退耦发生在复合期间。

即使没有复合（$X_e$ 始终为 1），稀释也会让光子在 $1+z\approx39$ 时退耦。今天弥散气体又是电离的：再电离发生在 $6<z<10$，再散射在 CMB 上留下印记（第 9、10 章）。`,
    analogy: "雾中的灯塔：雾（自由电子）浓时光被反复散射，看不到灯；雾一下子散去（复合），光直线传到远方，我们今天看到的就是雾散那一刻灯塔的模样。",
    book_example: { what: R`式 (4.40)–(4.44)；脚注：电子在 $z\sim1000$ 之后仍被光子散射很多次，因为光子远比电子多。`, point: "复合与退耦几乎同时发生，所以 CMB 是复合时刻的快照。" },
    misconception: R`退耦不需要 $X_e$ 降到 0：只要散射率低于膨胀率即可，而 $X_e$ 冻结值 $\sim10^{-4}$ 远小于所需的 $10^{-2}$。`,
  },
  {
    id: "wimp", name_zh: "WIMP 冻结与遗迹丰度", name_en: "WIMP freeze-out & relic abundance", icon: "🌑", section_id: "4.4", group: "dm",
    plain: R`重粒子在 $T\approx m/20$ 时湮灭跟不上膨胀而冻结；遗迹密度只由湮灭截面决定。`,
    explain: R`对 $Y=n_X/T^3$ 得 Riccati 方程 $dY/d\sym{ch04-xm}{x}=-(\lambda/\sym{ch04-xm}{x}^2)(Y^2-Y_{\rm EQ}^2)$，$\lambda=m_X^3\langle\sigma v\rangle/H(m_X)$ 一般很大。早期 $Y$ 紧跟 $Y_{\rm EQ}$；$Y_{\rm EQ}\propto e^{-\sym{ch04-xm}{x}}$ 骤降后，湮灭跟不上，$Y$ 停在 $Y_\infty\simeq x_f/\lambda$（$x_f\approx20$）。

今天 $\Omega_X=x_fm_XT_0^3/(30\lambda\rho_{\rm cr})\propto1/\langle\sigma v\rangle$，显式不依赖 $m_X$。代入数值：$\Omega_Xh^2\simeq0.1\times(2\times10^{-26}\,\mathrm{cm^3\,s^{-1}}/\langle\sigma v\rangle)$。弱相互作用尺度的截面恰好给出正确的暗物质丰度，这一巧合被称为"WIMP 奇迹"。截面越大，冻结越晚、遗迹越少。`,
    analogy: "派对上配对跳舞的人逐渐离场（湮灭），但随着会场不断扩大（膨胀），剩下的人越来越难找到舞伴；最后总会剩下一些没配上对的人——舞伴越容易找（截面越大），剩下的越少。",
    book_example: { what: R`式 (4.45)–(4.57)；图 4.5：$\lambda=10^5$ 与 $10^9$ 两条曲线在 $\sym{ch04-xm}{x}\sim10$ 离开平衡，$\lambda$ 越大冻结越晚、遗迹越低。`, point: R`宇宙学给粒子物理开出"目标截面" $\langle\sigma v\rangle\approx2\times10^{-26}\,\mathrm{cm^3/s}$。` },
    misconception: R`遗迹丰度不是"越强的相互作用留下越多"——恰恰相反，$\Omega_X\propto1/\langle\sigma v\rangle$。`,
  },
  {
    id: "detection", name_zh: "暗物质的三种探测", name_en: "Direct, indirect & collider searches", icon: "🔍", section_id: "4.4", group: "dm",
    plain: R`同一个 $XX\leftrightarrow{\rm SM\,SM}$ 相互作用，正向看是间接探测，反向看是对撞机产生，侧着看是直接探测。`,
    explain: R`间接探测：星系（尤其暗物质主导的矮星系）中的 $X$ 粒子湮灭，产物（如 $\gamma$ 射线）被 Fermi-LAT 等望远镜接收；湮灭率 $\propto n_X^2\propto1/m_X^2$，所以对低质量最敏感，已排除许多通道下 $m_X\lesssim10\,\mathrm{GeV}$ 的热遗迹。对撞机：两个标准模型粒子产生一对 $X$。直接探测：银河系中的 $X$ 撞击地下大型探测器里的原子核，测反冲。

直接探测的灵敏度十年提高约三个数量级，许多 WIMP 模型已被排除；因此学界也在研究非热产生的候选者，如轴子（玻色–爱因斯坦凝聚，质量 $\ll1\,\mathrm{eV}$ 却是冷暗物质），以及从 $10^{-21}\,\mathrm{eV}$ 到数个太阳质量（黑洞）的各种可能。`,
    analogy: "同一扇门的三种用法：看谁从门里出来（间接）、自己推门造人进去（对撞机）、站在门边等人撞你一下（直接）。",
    book_example: { what: R`图 4.6（三种探测示意）、图 4.7（Fermi $\gamma$ 射线对湮灭截面的限制，虚线为 (4.57) 的目标值）、图 4.8（直接探测对 WIMP–核子截面的限制）。`, point: "宇宙学丰度把截面锁定在可检验的范围内。" },
    misconception: "直接探测约束的是 WIMP–核子散射截面，而决定遗迹丰度的是湮灭截面；两者在具体模型中相关，但不是同一个量。",
  },
];

export const relations = [
  { from: "rate_eq", to: "chem_eq", label: R`$\Gamma\gg H$ 时化为` },
  { from: "chem_eq", to: "saha", label: "具体化为" },
  { from: "rate_eq", to: "freeze_out", label: R`$\Gamma\lesssim H$ 时` },
  { from: "g_star", to: "freeze_out", label: R`决定 $H(T)$` },
  { from: "saha", to: "np_ratio", label: R`平衡值 $e^{-\mathcal Q/T}$` },
  { from: "freeze_out", to: "np_ratio", label: R`$X_n\to0.15$` },
  { from: "saha", to: "helium", label: R`给出 $T_{\rm nuc}$` },
  { from: "np_ratio", to: "helium", label: R`$Y_P=2X_n$` },
  { from: "saha", to: "recombination", label: "原子尺度重演" },
  { from: "freeze_out", to: "recombination", label: R`$X_e$ 冻结` },
  { from: "recombination", to: "decoupling", label: R`$X_e$ 骤降` },
  { from: "freeze_out", to: "wimp", label: R`$Y_\infty\approx x_f/\lambda$` },
  { from: "g_star", to: "wimp", label: R`$g_*(m_X)\approx100$` },
  { from: "wimp", to: "detection", label: "目标截面" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**一个方程**：动力学平衡 + 玻尔兹曼统计把 Boltzmann 方程化成速率方程 $a^{-3}d(n_1a^3)/dt=n_1^{(0)}n_2^{(0)}\langle\sigma v\rangle\{\cdots\}$；反应率 $\gg H$ 时化为 Saha 条件，$\lesssim H$ 时丰度冻结。`}</TxI>,
  <TxI>{R`**光子太多**：$\eta_{\rm b}=6\times10^{-10}$ 使核合成推迟到 $T_{\rm nuc}\approx0.07\,\mathrm{MeV}\approx B_{\rm D}/30$、复合推迟到 $T\approx0.3\,\mathrm{eV}\approx\epsilon_0/45$。`}</TxI>,
  <TxI>{R`**BBN**：中子比例在 $T\lesssim0.5\,\mathrm{MeV}$ 冻结于 $X_n\approx0.15$，衰变后 $X_n(T_{\rm nuc})=0.11$，$Y_P=2X_n\approx0.22$–$0.25$，只对数依赖 $\eta_{\rm b}$；残余氘是 $\Omega_{\rm b}h^2$ 的灵敏探针。`}</TxI>,
  <TxI>{R`**复合**：Saha 给出 $z_*\sim1100$，但 $X_e$ 的演化需解 Peebles 方程；$X_e\lesssim10^{-2}$ 时 $n_e\sigma_{\rm T}<H$，光子在复合期间退耦，CMB 是那一刻的快照。`}</TxI>,
  <TxI>{R`**WIMP**：$Y_\infty\simeq x_f/\lambda$，$\Omega_Xh^2\simeq0.1(x_f/20)(g_*/100)^{1/2}(2\times10^{-26}\,\mathrm{cm^3s^{-1}}/\langle\sigma v\rangle)$，与 $m_X$ 显式无关；截面越大遗迹越少。后续各章只用到暗物质"冷、弱相互作用"与 $\Omega_{\rm c}$。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`为什么氘核要等到 $T\approx0.07\,\mathrm{MeV}$ 才能大量存活，而它的结合能是 2.22 MeV？`,
    options: [R`氘核在 $T>0.07\,\mathrm{MeV}$ 时会自发衰变`, R`光子数是重子数的约 $10^9$ 倍，高能尾部的光子仍足以把新生氘核打碎`, "中子在此之前还没有产生", R`弱相互作用在 $T>0.07\,\mathrm{MeV}$ 时把氘转化为氦`],
    answer: 1, why: R`式 (4.16)：$n_{\rm D}/n_{\rm b}\sim\eta_{\rm b}(T/m_p)^{3/2}e^{B_{\rm D}/T}$，小系数 $\eta_{\rm b}$ 要等 $B_{\rm D}/T\approx35$ 才被指数因子补偿。`,
  },
  {
    q: "中子丰度冻结的直接原因是什么？",
    options: ["中子衰变", R`$\lambda_{np}\propto T^3$ 比 $H\propto T^2$ 下降得更快，弱相互作用跟不上膨胀`, "所有中子都结合成了氘", R`e$^\pm$ 湮灭使温度骤升`],
    answer: 1, why: R`$x=1$ 时 $\lambda_{np}=5.5\,\mathrm{s^{-1}}$ 略大于 $H=1.13\,\mathrm{s^{-1}}$；温度再降，转化率相对膨胀率按 $T$ 下降，平衡无法维持。衰变发生在更晚的 $\sim10^2\,\mathrm s$。`,
  },
  {
    q: R`若早期宇宙存在一种额外的相对论粒子（$g_*$ 增大），原初氦丰度 $Y_P$ 会怎样？`,
    options: ["增大", "减小", "不变", R`取决于 $\eta_{\rm b}$ 的正负`],
    answer: 0, why: R`$H\propto\sqrt{g_*}\,T^2$，膨胀更快 ⇒ 中子更早冻结（冻结值更大），且到 $T_{\rm nuc}$ 的时间更短、衰变更少 ⇒ $X_n(T_{\rm nuc})$ 与 $Y_P$ 都增大。交互图中把 $g_*$ 调高即可看到。`,
  },
  {
    q: R`复合中为什么只计入复合到激发态的速率 $\sym{ch04-alpha2}{\alpha}^{(2)}$？`,
    options: ["基态复合截面为零", "复合到基态放出的光子会立即电离另一个中性原子，净效果为零", "激发态原子更稳定", R`基态复合只在 $T>\epsilon_0$ 时发生`],
    answer: 1, why: R`直接到基态的复合产生一个能量 $\ge\epsilon_0$ 的光子，在稠密的中性氢中几乎立刻被吸收并电离另一个原子。`,
  },
  {
    q: R`在 WIMP 冻结图景中，若湮灭截面 $\langle\sigma v\rangle$ 增大 10 倍，遗迹密度 $\Omega_X$ 大致会怎样？`,
    options: ["增大约 10 倍", "减小约 10 倍", R`几乎不变，因为 $x_f$ 不变`, R`取决于 $m_X$`],
    answer: 1, why: R`$\Omega_X\propto x_f/\langle\sigma v\rangle$；$x_f$ 只对数地增大（冻结稍晚），所以 $\Omega_X$ 大约减小 10 倍。`,
  },
  {
    q: "下列哪个说法正确？",
    options: ["若宇宙一直保持电离，光子将永远不会退耦", R`退耦要求 $X_e$ 降到 $10^{-4}$ 以下`, R`即使没有复合，光子也会在 $1+z\approx39$ 左右因电子被稀释而退耦`, R`复合发生在 $T\approx13.6\,\mathrm{eV}$`],
    answer: 2, why: R`式 (4.44)：令 $X_e=1$，$n_e\sigma_{\rm T}/H=1$ 给出 $1+z_{\rm decouple}\approx39$。真实的退耦发生在复合期间 $X_e\sim10^{-2}$ 时。`,
  },
];

export const BRIDGE = R`到此为止，宇宙在我们的描述里仍是"光滑"的：只有随时间变化的平均密度和温度。但本章已经暗示了下一步——CMB 是复合时刻的快照，而它的各向异性取决于 $X_e(t)$ 的细节；暗物质只要"冷、弱相互作用"，就会在引力作用下成团。第 5 章起我们让分布函数也依赖位置与传播方向：为光子、重子、暗物质和中微子分别写出非均匀宇宙中的 Boltzmann 方程，这将是理解 CMB 各向异性与大尺度结构的出发点。`;
