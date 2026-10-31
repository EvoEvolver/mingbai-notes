// 第 8 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "从十万分之一到宇宙网";
export const HOOK = R`今天的星系巡天（DESI、Euclid）把数千万个星系的三维位置画成一张"宇宙网"：纤维、墙、空洞，密度对比动辄上百倍。可是在 CMB 上，同一批扰动在 38 万岁时只有十万分之一。从 $10^{-5}$ 长到 $\mathcal O(1)$，靠的是引力不稳定性——过密的地方吸引更多物质，于是更加过密。

但"引力把扰动养大"这句话远不够。膨胀会拖慢增长；辐射的压强会让扰动只振荡不增长；不同大小的扰动"出生"（进入视界）的时刻不同，赶上的宇宙环境也不同：有的在辐射主导时就进入视界，被压低；有的直到物质主导后才进入，几乎原样保留。把这些效应算清楚，就得到一条形状独特的曲线——**线性物质功率谱** $P_{\rm L}(k)$：大尺度上 $\propto k^{n_s}$，在 $k_{\rm eq}\approx0.01\,\mathrm{Mpc^{-1}}$ 处转折，小尺度上按 $k^{n_s-4}\ln^2k$ 下降。星系巡天测到的正是这条曲线（乘上偏袒因子），它的转折位置称出了宇宙中物质的总量，它的振幅随时间的增长检验着暗能量。这一章，我们就从第 5–7 章的方程出发，把这条曲线"算"出来，并且理解它每一个特征的物理来源。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "8.1", title: "序曲：三个阶段与方程组", gist: R`看数值解：所有模式都经历"视界外常数 → 进入视界/物质辐射转变 → 晚期一致演化"三阶段。据此把 $\Phi$ 分解为 $\frac35\mathcal R\times T(k)\times D_+(a)/a$，写出功率谱 \eqref{8.8}；再把第 5–6 章方程截断为 5 个变量的方程组。`, gives: ["8.4", "8.7", "8.8", "8.9", "8.14", "8.15"], next: R`方程组没有处处成立的解析解；先看最容易的极限——大尺度。` },
  { sec: "8.2", title: "大尺度：视界外与物质期进入视界", gist: R`视界外丢掉所有 $k$ 项，Kodama–Sasaki 精确解 \eqref{8.31} 表明势在物质–辐射转变中下降到 $9/10$；物质期 $\Phi=$ 常数是严格解，所以大尺度 $T(k)=1$。`, gives: ["8.24", "8.31", "8.32", "8.37", "8.39"], next: R`大尺度在物质期才进入视界；小尺度则在辐射期进入——那是一个完全不同的故事。` },
  { sec: "8.3", title: "小尺度：辐射期进入视界", gist: R`辐射期势由辐射决定、满足带阻尼的波动方程，解为 $j_1$ 型衰减振荡 \eqref{8.46}；暗物质被它驱动，进入视界后只能对数增长 \eqref{8.52}。过了相等后由 Meszaros 方程 \eqref{8.59} 接管，增长解 $D_+=a+\frac23a_{\rm eq}$。`, gives: ["8.44", "8.46", "8.50", "8.52", "8.59", "8.60", "8.65"], next: R`两条极限解拼起来，就能写出转移函数的形状。` },
  { sec: "8.4", title: "转移函数", gist: R`由匹配条件取出增长模式系数，得小尺度转移函数 $T(k)\simeq12\,(k_{\rm eq}/k)^2\ln(0.12k/k_{\rm eq})$ \eqref{8.71}；$T$ 只依赖 $k/k_{\rm eq}$，即由 $\Omega_{\rm m}h^2$ 决定。`, gives: ["8.66", "8.68", "8.69", "8.70", "8.71"], next: R`早期物理装进了 $T(k)$；晚期的暗能量则只通过增长因子起作用。` },
  { sec: "8.5", title: "增长因子", gist: R`视界内、无压、晚期：$\delta_{\rm m}$ 满足 \eqref{8.75}，只依赖 $H(a)$。$\Lambda$ + 曲率时有积分解 \eqref{8.77}；增长率 $f\simeq\Omega_{\rm m}(a)^{0.55}$。`, gives: ["8.74", "8.75", "8.77", "8.78"], next: R`最后看看 CDM 与辐射之外的成分如何修改这幅图。` },
  { sec: "8.6", title: "超越冷暗物质与辐射", gist: R`重子：小尺度压低 + 重子声学振荡（BAO），相对扰动只衰减 \eqref{8.82}；有质量中微子：在 $k\gtrsim k_{\rm fs}$ 上自由流压低，使增长因子依赖尺度 \eqref{8.83}；暗能量：通过 $H(a)$ 改变 $D_+$ \eqref{8.84}。`, gives: ["8.79", "8.82", "8.83", "8.84"], next: R`总结：$T(k)$ 与 $D_+(a)$ 的分解与功率谱。` },
  { sec: "8.7", title: "小结", gist: R`$\delta_{\rm m}=\frac25\frac{k^2}{\Omega_{\rm m}H_0^2}\mathcal R\,T(k)D_+(a)$ 与 $P_{\rm L}(k,a)$ \eqref{8.85}–\eqref{8.86}；早期物理在 $T(k)$ 中，晚期物理在 $D_+(a)$ 中。`, gives: ["8.85", "8.86"] },
];

// ---------- 推导图 ----------
export const EQMAP_T = [
  { from: "8.14", to: "8.18", label: R`$k\eta\to0$：丢掉 $k$ 项` },
  { from: "8.18", to: "8.24", label: R`$\Theta_{{\rm r},0}=\delta_{\rm c}/3$，换自变量 $y$` },
  { from: "8.24", to: "8.31", label: "Kodama–Sasaki 代换 (8.25)" },
  { from: "8.31", to: "8.32", label: R`$y\to\infty$：$\times\frac{9}{10}$` },
  { from: "8.15", to: "8.35", label: "物质期：忽略辐射" },
  { from: "8.35", to: "8.38", label: R`$\Phi=$ 常数是解` },
  { from: "8.15", to: "8.40", label: "辐射期：忽略物质" },
  { from: "8.40", to: "8.44", label: R`消去 $\Theta_{{\rm r},0}$、$\Theta_{{\rm r},1}$` },
  { from: "8.44", to: "8.46", label: R`$u=\Phi\eta$：球 Bessel` },
  { from: "8.46", to: "8.52", label: "作外源驱动 (8.49)" },
  { from: "8.52", to: "8.65", label: "匹配函数值与导数" },
  { from: "8.59", to: "8.65", label: R`Meszaros 解 $D_\pm$` },
  { from: "8.65", to: "8.68", label: R`$a\gg a_{\rm eq}$：只留 $C_1$` },
  { from: "8.68", to: "8.69", label: "与 (8.7) 对比" },
  { from: "8.69", to: "8.71", label: R`$A=6.4$，$B=0.44$` },
];
export const EQMAP_G = [
  { from: "8.4", to: "8.6", label: "Poisson (8.5)" },
  { from: "8.5", to: "8.6", label: R`$\rho_{\rm m}=\Omega_{\rm m}\rho_{\rm cr}/a^3$` },
  { from: "8.6", to: "8.7", label: "代入 (8.4)" },
  { from: "8.7", to: "8.8", label: R`$P_{\mathcal R}(k)$ (7.99)` },
  { from: "8.8", to: "8.9", label: R`对数区间方差` },
  { from: "8.12", to: "8.72", label: R`$\times a$，求导，代入 (8.13)` },
  { from: "8.72", to: "8.74", label: "" },
  { from: "8.73", to: "8.74", label: R`$\rho_{\rm m}\propto a^{-3}$` },
  { from: "8.74", to: "8.75", label: R`自变量换成 $a$` },
  { from: "8.75", to: "8.77", label: R`$\Lambda$ + 曲率：积分解` },
  { from: "8.77", to: "8.78", label: "增长率拟合" },
  { from: "8.84", to: "8.75", label: R`$w\neq-1$：数值解` },
];
export const EQMAP_LABELS = {
  "8.14": "Einstein 00 分量", "8.15": "代数 Einstein 方程", "8.18": "视界外方程组", "8.24": R`$\Phi$ 的二阶方程`, "8.31": "Kodama–Sasaki 解",
  "8.32": R`$\Phi$ 与 $\mathcal R$ 的关系`, "8.35": "物质期方程组", "8.38": R`$\Phi=$ 常数`, "8.40": "辐射期 Poisson", "8.44": "阻尼波动方程", "8.46": "辐射期势",
  "8.52": "对数增长", "8.59": "Meszaros 方程", "8.65": "匹配条件", "8.68": R`晚期 $\delta_{\rm c}$`, "8.69": R`小尺度 $T(k)$`, "8.71": R`$T(k)$ 数值形式`,
  "8.4": R`$\Phi=\frac35\mathcal R\,T\,D_+/a$`, "8.5": "Poisson 方程", "8.6": R`$\delta_{\rm m}$ 与 $\Phi$`, "8.7": R`$\delta_{\rm m}$ 与 $\mathcal R$`, "8.8": "线性功率谱", "8.9": R`$\Delta^2_{\rm L}$`,
  "8.12": "CDM 连续性", "8.72": "二阶方程", "8.73": "Poisson", "8.74": R`增长方程（$\eta$）`, "8.75": R`增长方程（$a$）`, "8.77": "积分解", "8.78": R`增长率 $f$`, "8.84": R`$w$ 暗能量的 $H(z)$`,
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "frame", label: "框架：T(k) 与 D(a)" },
  { id: "large", label: "大尺度" },
  { id: "small", label: "小尺度" },
  { id: "late", label: "晚期与其他成分" },
];

export const concepts = [
  {
    id: "three_stages", name_zh: "三个演化阶段", name_en: "Three stages of evolution", icon: "🎬", section_id: "8.1", group: "frame",
    plain: R`每个模式都经历：视界外不变 → 进入视界并经历物质–辐射转变 → 晚期一致增长。`,
    explain: R`数值解（图 8.1）显示，早期所有模式都在视界外（$k\eta\ll1$），势 $\Phi$ 为常数；中间阶段同时发生两件事——模式进入视界、宇宙从辐射主导转为物质主导，两者的先后顺序决定了模式的命运；晚期所有模式又以相同方式演化（物质期 $\Phi$ 恒定、暗能量期一起衰减）。

正因为第三阶段与 $k$ 无关，我们才能把势写成"原初值乘以只依赖 $k$ 的因子乘以只依赖 $a$ 的因子"。`,
    analogy: R`像一批同时报名的长跑选手：起跑前都在原地（视界外）；比赛中途有人遇到上坡（辐射期进入视界）有人遇到平路，掉队程度各不相同；最后一段大家都在同一条下坡路上，速度比例保持不变。`,
    book_example: { what: R`图 8.1：$k=0.001$、$0.01$、$0.1$、$2\,\mathrm{Mpc^{-1}}$ 四个模式的 $\Phi(a)/\Phi(0)$。`, point: R`进入视界越早（$k$ 越大），势被压低越多；晚期曲线形状相同。` },
    misconception: R`"晚期所有模式一致演化"不是说振幅相同，而是说它们之间的**比例**不再变化——差别全部冻结在 $T(k)$ 里。`,
  },
  {
    id: "transfer", name_zh: R`转移函数 $T(k)$`, name_en: "Transfer function", icon: "🎚️", section_id: "8.1", group: "frame",
    plain: R`把原初势"翻译"为物质期势时，与尺度有关的压低因子；大尺度为 1。`,
    explain: R`定义 $T(k)\equiv\Phi(k,a_{\rm late})/\Phi_{\text{large-scale}}(k,a_{\rm late})$：分母是物质期才进入视界的模式的势，即原初势乘以 $9/10$。这样约定后大尺度 $T=1$，它只记录"进入视界 + 物质辐射转变"造成的与尺度有关的差异。

在只有 CDM 与辐射、忽略各向异性应力时，$T$ 只依赖 $k/k_{\rm eq}$；小尺度 $T\simeq12(k_{\rm eq}/k)^2\ln(0.12k/k_{\rm eq})$。`,
    analogy: R`像音响的频率响应曲线：低音（大尺度）原样通过，高音（小尺度）被衰减，衰减规律由"箱体"（宇宙的物质辐射比）决定。`,
    book_example: { what: R`式 (8.71) 与图 8.14。`, point: R`功率谱在 $k_{\rm eq}$ 处转折，形状由 $\Omega_{\rm m}h^2$ 控制。` },
    misconception: R`$T(k)$ 不是"势的衰减随时间"——它是晚期（$a_{\rm late}$）时刻的一个与时间无关的函数；晚期的时间依赖全部放进 $D_+$。`,
  },
  {
    id: "growth", name_zh: R`增长因子 $D_+(a)$`, name_en: "Growth factor", icon: "📈", section_id: "8.5", group: "frame",
    plain: R`晚期与尺度无关的增长：物质期 $D_+=a$，暗能量使增长放缓。`,
    explain: R`定义 $D_+(a)/a\equiv\Phi(k,a)/\Phi(k,a_{\rm late})$。物质主导时势不变，$D_+=a$，而密度 $\delta_{\rm m}\propto a\Phi\propto D_+$ 在长——所以叫"增长因子"。

它由二阶方程 \eqref{8.75} 决定，只需要知道膨胀史 $H(a)$；Λ 与曲率时有积分解 \eqref{8.77}。增长率 $f=d\ln D_+/d\ln a\simeq\Omega_{\rm m}(a)^{0.55}$。`,
    analogy: R`像复利账户：物质期利率恒定（$\delta\propto a$），暗能量时代相当于央行不断降息，本金还在涨但越来越慢。`,
    book_example: { what: R`图 8.15：三种平直宇宙中 $D_+/a$。`, point: R`$\Omega_\Lambda$ 越大、$w$ 越大于 $-1$，晚期增长被压得越多。` },
    misconception: R`物质期**势**恒定，但**密度对比**在增长；"势不变"与"结构增长"并不矛盾——Poisson 方程里多了一个 $a$。`,
  },
  {
    id: "horizon", name_zh: "进入视界", name_en: "Horizon crossing", icon: "🌅", section_id: "8.1", group: "frame",
    plain: R`当共动视界 $\eta$ 长到与 $1/k$ 相当时，模式第一次"感受到"因果物理。`,
    explain: R`视界外（$k\eta\ll1$）压强、流动来不及起作用，只有引力（度规）演化；视界内（$k\eta\gg1$）压强梯度、粒子流动都起作用。共动视界 $\eta$ 随时间单调增长，所以小尺度先进入、大尺度后进入。

本书两种定义并用：$k\eta=1$（图 8.4）与 $a_HH(a_H)=k$（\exref{8.6}），二者只差一个 $\mathcal O(1)$ 因子。`,
    analogy: R`像远处的雷声：闪电（扰动）早已存在，但声音（因果信号）传到你这里之前，你对它毫无反应。`,
    book_example: { what: R`图 8.4：$\eta(a)$ 曲线与各个近似成立的区域。`, point: R`$k=10^{-3}\,\mathrm{Mpc^{-1}}$ 的模式在 $a\sim0.006$ 才进入视界。` },
    misconception: R`"进入视界"不是模式的尺度在变——共动尺度 $1/k$ 不变，是视界 $\eta$ 在长大。`,
  },
  {
    id: "keq", name_zh: R`相等尺度 $k_{\rm eq}$`, name_en: "Equality scale", icon: "⚖️", section_id: "8.2", group: "large",
    plain: R`物质–辐射相等时恰好进入视界的波数，功率谱转折处。`,
    explain: R`$k_{\rm eq}\equiv a_{\rm eq}H(a_{\rm eq})=\sqrt{2\Omega_{\rm m}H_0^2/a_{\rm eq}}=0.073\,\mathrm{Mpc^{-1}}\Omega_{\rm m}h^2\approx0.010\,\mathrm{Mpc^{-1}}$。$k\ll k_{\rm eq}$ 的模式在物质期进入视界，$T\approx1$；$k\gg k_{\rm eq}$ 的模式在辐射期进入视界，被压低。

因为 $a_{\rm eq}\propto(\Omega_{\rm m}h^2)^{-1}$，测量转折位置就是在称物质总量。以 $h\,\mathrm{Mpc^{-1}}$ 为单位时，控制参数变为"形状参数" $\Omega_{\rm m}h$。`,
    analogy: R`像一条分界线：分界线之前出生的孩子赶上了"艰难年代"（辐射期），之后出生的赶上了"好年代"（物质期）。`,
    book_example: { what: R`式 (8.39) 与图 8.14：改变 $\Omega_{\rm m}$ 使峰位移动。`, point: R`$\Omega_{\rm m}$ 降低 ⇒ 相等更晚 ⇒ $k_{\rm eq}$ 更小。` },
    misconception: R`$k_{\rm eq}$ 由**物理**密度 $\Omega_{\rm m}h^2$ 决定；在 $h\,\mathrm{Mpc^{-1}}$ 单位里出现的 $\Omega_{\rm m}h$ 只是单位约定的结果。`,
  },
  {
    id: "nine_tenths", name_zh: R`$9/10$ 与 $3/5$`, name_en: "Super-horizon drop", icon: "🔟", section_id: "8.2", group: "large",
    plain: R`即使在视界外，势在辐射期到物质期的转变中也下降到原来的 9/10。`,
    explain: R`视界外只有引力在起作用，方程可以精确解出（Kodama–Sasaki，\eqref{8.31}）：$y\to0$ 时 $\Phi=\Phi(0)$，$y\to\infty$ 时 $\Phi\to\frac9{10}\Phi(0)$。结合守恒的曲率扰动：辐射期 $\Phi=\frac23\mathcal R$，物质期 $\Phi=\frac35\mathcal R$——这就是 \eqref{8.4} 中 $3/5$ 的来源。

这个转变很慢：直到 $a\simeq10^{-2}$（远晚于 $a_{\rm eq}$）势仍在下降，对 CMB 的积分 Sachs–Wolfe 效应很重要。`,
    analogy: R`像一个封闭的气球从热天进入冷天：没有人碰它，但"环境的物态"变了，它的大小就跟着调整到新的平衡值。`,
    book_example: { what: R`图 8.6：$k=0.001$、$0.003$、$0.01\,\mathrm{Mpc^{-1}}$ 的数值解与解析解。`, point: R`计入中微子各向异性应力后下降因子约为 $0.86$。` },
    misconception: R`"视界外什么都不变"是错的：$\mathcal R$ 守恒，但 $\Phi$ 会随背景物态变化。`,
  },
  {
    id: "const_phi", name_zh: "物质期势恒定", name_en: "Constant potential", icon: "🧘", section_id: "8.2", group: "large",
    plain: R`物质主导时，无论在视界内外，势都保持不变。`,
    explain: R`物质主导的方程组 \eqref{8.33}–\eqref{8.35} 化成二阶方程后不含正比于 $\Phi$ 的项，所以 $\Phi=$ 常数是严格解；另一个解衰减，初条件（视界外 $\Phi'=0$）恰好选出常数解。

物理上：物质不断落入势阱使阱加深，膨胀又把物质拉开使阱变浅，物质期两者恰好抵消。暗能量出现后（$a\gtrsim0.1$）平衡被打破，势衰减。`,
    analogy: R`像一个进出水量恰好相等的水池，水位保持不变；一旦出水口变大（暗能量），水位开始下降。`,
    book_example: { what: R`§8.2.2 的证明与图 8.6 中晚期的平台。`, point: R`所以 $k\ll k_{\rm eq}$ 时 $T(k)\approx1$。` },
    misconception: R`势恒定不代表密度恒定：$\delta_{\rm m}=\frac{2k^2a}{3\Omega_{\rm m}H_0^2}\Phi\propto a$。`,
  },
  {
    id: "rad_decay", name_zh: "辐射期势的衰减振荡", name_en: "Potential decay in radiation era", icon: "🌊", section_id: "8.3", group: "small",
    plain: R`辐射压强让辐射扰动只振荡不增长，于是势随 $\eta^{-2}$ 衰减。`,
    explain: R`辐射期势由辐射扰动决定，满足 $\Phi''+\frac4\eta\Phi'+\frac{k^2}3\Phi=0$——带阻尼的波动方程，声速 $1/\sqrt3$。解为 $\Phi=2\mathcal R\,(\sin x-x\cos x)/x^3$，$x=k\eta/\sqrt3$：进入视界后振荡并以 $\eta^{-2}$ 衰减。

原因：Poisson 方程中 $\Phi\sim\Theta_0/(k\eta)^2$，而 $\Theta_0$ 被压强维持为等幅振荡（驻声波）；分母随视界增长，势就衰减了。`,
    analogy: R`像蹦床上的人：压强（弹力）把下陷又顶回来，永远不会越陷越深；而周围的"场地"（视界内的物质总量）越来越大，单个凹坑的影响就越来越弱。`,
    book_example: { what: R`图 8.10：$k=1$ 与 $10\,\mathrm{Mpc^{-1}}$ 的势。`, point: R`解析式 \eqref{8.46} 与数值解几乎重合；中微子会带来额外阻尼。` },
    misconception: R`这里的振荡与之后的 BAO、CMB 声学峰是同一个物理：光子–重子流体中的声波。`,
  },
  {
    id: "log_growth", name_zh: "对数增长（Meszaros 效应）", name_en: "Logarithmic growth", icon: "🐢", section_id: "8.3", group: "small",
    plain: R`辐射期进入视界的暗物质扰动只能 $\propto\ln a$ 地慢慢增长。`,
    explain: R`暗物质没有压强，会响应进入视界时势的"一推"，获得速度并继续聚集；但辐射主导下膨胀太快、而它自身的引力又可忽略，于是 $\delta_{\rm c}''+\delta_{\rm c}'/\eta=S$ 的齐次解只有常数与 $\ln\eta$：$\delta_{\rm c}=A\mathcal R\ln(Bk\eta)$，$A\approx6$、$B\approx0.5$。

若没有这一对数增长，早进入视界的模式相对大尺度会被压低 $(k_{\rm eq}/k)^2$；对数增长把它改善为 $(k_{\rm eq}/k)^2\ln k$。`,
    analogy: R`像被推了一把之后在冰面上滑行的人：没有持续的力，但惯性让他继续前进——只是冰面（膨胀）在不断"拉长"，他走过的共动距离只按对数增长。`,
    book_example: { what: R`图 8.11：$k=1$、$10\,\mathrm{Mpc^{-1}}$ 的 $\delta_{\rm c}$ 与 $\ln$ 解。`, point: R`进入视界后迅速锁定到对数增长模式。` },
    misconception: R`对数增长不是"暗物质被辐射压住"——暗物质不感受辐射压强，它只是失去了势阱的持续驱动、又被快速膨胀拖累。`,
  },
  {
    id: "meszaros", name_zh: "Meszaros 方程", name_en: "Meszaros equation", icon: "🧮", section_id: "8.3", group: "small",
    plain: R`视界内、辐射扰动可忽略时暗物质的增长方程，跨越物质–辐射相等。`,
    explain: R`以 $y=a/a_{\rm eq}$ 为自变量：$\frac{d^2\delta_{\rm c}}{dy^2}+\frac{2+3y}{2y(y+1)}\frac{d\delta_{\rm c}}{dy}-\frac{3}{2y(y+1)}\delta_{\rm c}=0$。增长解 $D_+=y+2/3$，衰减解 $D_-$（早期 $\propto\ln y$，晚期 $\propto y^{-3/2}$）。

把它与辐射期的对数解在 $y_H\ll y_m\ll1$ 处匹配，就得到小尺度晚期的 $\delta_{\rm c}$，进而得到 $T(k)$。`,
    analogy: R`像接力赛的交接区：前一棒（对数解）和后一棒（Meszaros 解）在交接区里并跑，位置和速度对上了才能交棒。`,
    book_example: { what: R`图 8.13：匹配于 $y_m=3y_H$ 的解析解与数值解。`, point: R`相等之前已是 $\delta\propto y+2/3$ 的形状；晚期偏离来自被忽略的重子。` },
    misconception: R`$D_+=a+2a_{\rm eq}/3$ 在 $a\ll a_{\rm eq}$ 时为常数——辐射期"增长解"不增长，增长只来自 $D_-$ 的 $\ln y$ 部分。`,
  },
  {
    id: "pk", name_zh: "线性功率谱与非线性尺度", name_en: "Linear power spectrum", icon: "📊", section_id: "8.1", group: "late",
    plain: R`$P_{\rm L}\propto D_+^2T^2k^{n_s}$：大尺度上升、$k_{\rm eq}$ 处转折、小尺度下降。`,
    explain: R`由 Poisson 方程 $\delta_{\rm m}=\frac25\frac{k^2}{\Omega_{\rm m}H_0^2}\mathcal R\,T(k)D_+(a)$ 与原初谱 $P_{\mathcal R}=\frac{2\pi^2}{k^3}\mathcal A_s(k/k_{\rm p})^{n_s-1}$ 得 \eqref{8.8}。无量纲方差 $\Delta^2_{\rm L}=k^3P_{\rm L}/2\pi^2$ 告诉我们哪些尺度已经非线性：$\Delta^2_{\rm L}(k_{\rm NL})=1$，今天 $k_{\rm NL}\simeq0.25\,h\,\mathrm{Mpc^{-1}}$。

越早的时候 $D_+$ 越小，$k_{\rm NL}$ 越大。`,
    analogy: R`像一张收入分布：大多数"财富"（方差）集中在中间尺度；小尺度的那部分已经"失控"（非线性），线性理论只适合描述其余部分。`,
    book_example: { what: R`图 8.3：$z=0,0.5,1,2$ 的 $P_{\rm L}$ 与 $k_{\rm NL}(z)$。`, point: R`$k>k_{\rm NL}$ 的部分只是假想量，要用第 12 章的非线性理论。` },
    misconception: R`$P_{\rm L}$ 的转折不在 $k_{\rm NL}$ 处，而在 $k_{\rm eq}$ 处；前者是"今天多不均匀"，后者是"早期宇宙的历史"。`,
  },
  {
    id: "beyond", name_zh: "重子、中微子与暗能量", name_en: "Beyond CDM", icon: "🧩", section_id: "8.6", group: "late",
    plain: R`重子带来压低与 BAO，中微子自由流抹平小尺度，暗能量改变增长因子。`,
    explain: R`**重子**：退耦前与光子紧耦合，不随暗物质成团，使小尺度 $T(k)$ 压低；它们参与的声波在 $T(k)$ 上留下重子声学振荡（BAO），可作标准尺。退耦后相对扰动 $\delta_{\rm bc}$ 只有常数或衰减模，重子最终追上暗物质。

**有质量中微子**：$k\gtrsim k_{\rm fs}$ 的尺度上被抹平，增长因子变得依赖尺度。**暗能量**：通过 $H(a)$ 改变 $D_+$，并通过 $\Omega_{\rm m}=1-\Omega_\Lambda$ 间接改变谱形。`,
    analogy: R`重子像一群被乐队（光子）绑住的舞者，乐队散场后才去追赶早已就位的队伍；中微子像跑得太快的孩子，哪个坑都留不住他们。`,
    book_example: { what: R`图 8.16：重子与不同 $\sum m_\nu$ 对转移函数的影响。`, point: R`BAO 振荡出现在 $k\simeq0.1\,h\,\mathrm{Mpc^{-1}}$，振幅小，因为重子只占物质的 16%。` },
    misconception: R`中微子质量越小并不一定压低越少：在很大尺度上，轻中微子跑得更远，反而压低更大尺度。`,
  },
];

export const relations = [
  { from: "three_stages", to: "transfer", label: "中间阶段" },
  { from: "three_stages", to: "growth", label: "晚期阶段" },
  { from: "horizon", to: "three_stages", label: "划分阶段" },
  { from: "keq", to: "horizon", label: "相等时进入" },
  { from: "nine_tenths", to: "transfer", label: "归一化分母" },
  { from: "const_phi", to: "transfer", label: R`大尺度 $T=1$` },
  { from: "rad_decay", to: "log_growth", label: "外源驱动" },
  { from: "log_growth", to: "meszaros", label: "匹配" },
  { from: "meszaros", to: "transfer", label: R`小尺度 $T(k)$` },
  { from: "transfer", to: "pk", label: R`$T^2$` },
  { from: "growth", to: "pk", label: R`$D_+^2$` },
  { from: "beyond", to: "growth", label: "暗能量、中微子" },
  { from: "beyond", to: "transfer", label: "重子 BAO" },
  { from: "const_phi", to: "growth", label: R`$D_+=a$` },
];

export const TAKEAWAYS = [
  <TxI>{R`**分解**：$\Phi(\boldsymbol k,a)=\frac35\mathcal R(\boldsymbol k)T(k)\frac{D_+(a)}{a}$。$T(k)$ 装着早期（进入视界、物质辐射转变）的全部与尺度有关的物理；$D_+(a)$ 装着晚期与尺度无关的增长（暗能量）。`}</TxI>,
  <TxI>{R`**大尺度**：视界外势在相等前后下降到 $9/10$（辐射期 $\Phi=\frac23\mathcal R$，物质期 $\frac35\mathcal R$）；物质期无论在视界内外势都恒定，所以 $k\ll k_{\rm eq}$ 时 $T=1$。`}</TxI>,
  <TxI>{R`**小尺度**：辐射期进入视界后势衰减振荡（$j_1$ 型，$\propto\eta^{-2}$），暗物质只能对数增长；相等之后由 Meszaros 方程接管。结果 $T(k)\simeq12(k_{\rm eq}/k)^2\ln(0.12k/k_{\rm eq})$，功率谱在 $k_{\rm eq}=0.073\,\mathrm{Mpc^{-1}}\Omega_{\rm m}h^2$ 处转折。`}</TxI>,
  <TxI>{R`**增长因子**：视界内无压物质满足 \eqref{8.75}，只依赖 $H(a)$；物质期 $D_+=a$，$\Lambda$ 时 $D_+\propto H\int da/(aH)^3$，$f\simeq\Omega_{\rm m}(a)^{0.55}$。`}</TxI>,
  <TxI>{R`**功率谱**：$P_{\rm L}=\frac{8\pi^2}{25}\frac{\mathcal A_s}{\Omega_{\rm m}^2}D_+^2T^2\frac{k^{n_s}}{H_0^4k_{\rm p}^{n_s-1}}$；今天 $k_{\rm NL}\simeq0.25\,h\,\mathrm{Mpc^{-1}}$。重子带来压低与 BAO，有质量中微子在 $k\gtrsim k_{\rm fs}$ 处压低并打破分解。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`为什么转移函数的分母取"大尺度解" $\Phi_{\text{large-scale}}=\frac9{10}\Phi(0)$，而不是原初势 $\Phi(0)$？`,
    options: ["为了让小尺度 T 更大", R`因为连最大尺度的势在相等前后也会降到 $9/10$，约定把这一与尺度无关的下降去掉，使大尺度 $T=1$`, "因为 9/10 是暗能量造成的", "因为原初势无法测量"],
    answer: 1, why: R`$9/10$ 是视界外的物态转变造成的、与 $k$ 无关；把它放进 $\frac35=\frac9{10}\cdot\frac23$ 里，$T(k)$ 就只描述与尺度有关的部分。`,
  },
  {
    q: R`一个 $k\ll k_{\rm eq}$ 的模式在物质期进入视界。进入视界前后它的势 $\Phi$ 怎样变化？`,
    options: ["进入视界时振荡并衰减", "进入视界后对数增长", "保持不变（直到暗能量开始主导）", R`立即降到 $9/10$`],
    answer: 2, why: R`物质期方程组的二阶形式不含正比于 $\Phi$ 的项，$\Phi=$ 常数是解且被初条件选中（\secref{8.2.2}）。`,
  },
  {
    q: R`辐射期进入视界的模式，其势为什么会衰减？`,
    options: ["暗物质把势阱填平了", R`辐射压强让辐射扰动只做等幅振荡，而 Poisson 方程给出 $\Phi\sim\Theta_0/(k\eta)^2$，势随视界增大而下降`, "光子把势能带走到视界外", R`因为这时 $\Psi\neq-\Phi$`],
    answer: 1, why: R`主导成分（辐射）不增长，势就会在膨胀中衰减；\eqref{8.47} 给出振幅 $\propto\eta^{-2}$。`,
  },
  {
    q: R`辐射期视界内的暗物质扰动如何增长？`,
    options: [R`$\propto a$`, R`$\propto a^2$`, R`$\propto\ln a$`, "完全不增长"],
    answer: 2, why: R`$\delta_{\rm c}''+\delta_{\rm c}'/\eta=S$ 的齐次解为常数与 $\ln\eta$；源项随势衰减而消失后只剩 $A\mathcal R\ln(Bk\eta)$。`,
  },
  {
    q: R`若把 $h$ 保持不变而减小 $\Omega_{\rm m}$（平直，$\Omega_\Lambda=1-\Omega_{\rm m}$），功率谱的峰会怎样移动？`,
    options: ["移向更大 k", "移向更小 k", "不动", "峰消失"],
    answer: 1, why: R`$a_{\rm eq}\propto1/(\Omega_{\rm m}h^2)$ 变大，相等更晚，视界更大，$k_{\rm eq}=0.073\,\mathrm{Mpc^{-1}}\Omega_{\rm m}h^2$ 变小（图 8.14）。`,
  },
  {
    q: R`暗能量 $w=-0.5$ 与 $w=-1$（同样 $\Omega_{\rm de}=0.69$）相比，今天的 $D_+/a$：`,
    options: [R`更大（增长更多）`, R`更小（增长被压得更多）`, "相同", R`取决于 $k$`],
    answer: 1, why: R`$w>-1$ 的暗能量在过去更重要（$\rho\propto a^{-3(1+w)}$），更早开始压制增长；图 8.15 中点划线明显更低（$D_+/a\approx0.61$ 对 $0.79$）。`,
  },
];

export const BRIDGE = R`这一章我们只盯着暗物质，把光子简化成只有单极和偶极的流体。下一章反过来：在已知的引力势背景下，完整地求解光子的温度扰动——紧耦合下的声学振荡、Silk 扩散阻尼、复合之后的自由流，最终得到 CMB 各向异性的角功率谱 $C_l$。本章的许多结果会在那里重现：辐射期势的衰减振荡 \eqref{8.46} 驱动了声学峰，视界外势从 $\frac23\mathcal R$ 到 $\frac35\mathcal R$ 的下降与晚期的暗能量衰减则产生积分 Sachs–Wolfe 效应，而 \eqref{8.86} 中的归一化正是由大角度 CMB 各向异性确定的。`;
