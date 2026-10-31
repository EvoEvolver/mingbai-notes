// 第 7 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "两块从未见过面的天空，温度却一样";
export const HOOK = R`把 Planck 卫星的全天 CMB 图摊开，挑天空中相对的两点——比如正北和正南方向。它们的温度相同，差别不到十万分之一。可是按照第 2 章的膨胀历史倒推，这两处光子出发时（复合时期）相隔的距离，远远超过光从宇宙诞生起能走过的路程：它们从未有过任何因果联系，凭什么"商量"好同一个温度？

更奇怪的是，这十万分之一的起伏本身也很有规律：几乎是高斯的，所有成分"步调一致"（绝热），在不同尺度上的幅度几乎相同，只是大尺度略强一点。第 5、6 章的方程组可以把这些起伏一路演化到今天，但它们需要一个起点——初始条件。

本章的答案是暴胀（inflation）：在极早期，宇宙经历了大约 60 个 e 倍的加速膨胀。它把一块原本有因果联系的小区域拉伸成整个可观测宇宙，从而解释了均匀性；同时，量子力学的真空涨落在这一过程中被拉到视界之外、冻结成经典的扰动——这就是星系、星系团与 CMB 各向异性的种子。我们将从谐振子的量子化出发，一步步算出它们的功率谱。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "7.1", title: "视界问题及其解决", gist: R`共动视界是共动哈勃半径的对数积分 $\eta=\int d\ln a\,(aH)^{-1}$ \eqref{7.3}。若只有物质与辐射，$(aH)^{-1}$ 一直增大，复合时相隔 $\gtrsim1.2^\circ$ 的区域从未接触 \eqref{7.2}。让 $(aH)^{-1}$ 在早期缩小（$\ddot a>0$）即可解决，约需 60 个 e 倍。`, gives: ["7.2", "7.3", "7.4", "7.5"], next: R`什么东西能让宇宙加速膨胀、而且还能停下来？` },
  { sec: "7.2", title: "暴胀：慢滚标量场", gist: R`标量场的能动张量给出 $\rho=\frac12\dot\phi^2+V$、$\mathcal P=\frac12\dot\phi^2-V$；势能主导时 $w\to-1$。运动方程 $\ddot\phi+3H\dot\phi+V_{,\phi}=0$；用慢滚参数 $\epsilon_{\rm sr}$、$\delta_{\rm sr}$ 量化"滚得多慢"。`, gives: ["7.8", "7.9", "7.14", "7.16", "7.17", "7.18"], next: R`均匀的背景之上，量子涨落不可避免——先算最简单的张量扰动。` },
  { sec: "7.3", title: "引力波的产生", gist: R`谐振子量子化：$\hat x=v\hat a+v^*\hat a^\dagger$，真空方差 $|v|^2$。把张量方程改写为 $v''+(k^2-a''/a)v=0$，de Sitter 中 $a''/a=2/\eta^2$，解为 \eqref{7.40}；出视界后 $h$ 冻结，$P_h=8\pi GH^2/k^3$。`, gives: ["7.26", "7.33", "7.35", "7.40", "7.42"], next: R`标量扰动多了两个麻烦：规范依赖，以及 $\delta\phi$ 与度规的耦合。` },
  { sec: "7.4", title: "标量扰动", gist: R`忽略引力时 $\delta\phi$ 满足与 $h$ 相同的方程，$P_{\delta\phi}=H^2/2k^3$。曲率扰动 $\mathcal R$ 在视界外守恒：暴胀中 $\mathcal R=-aH\delta\phi/\bar\phi'$，辐射期 $\mathcal R=-\frac32\Psi=\frac32\Phi$，于是 $P_{\mathcal R}=2\pi GH^2/(\epsilon_{\rm sr}k^3)$、$P_\Phi=\frac49P_{\mathcal R}$。`, gives: ["7.43", "7.54", "7.55", "7.57", "7.62", "7.71", "7.78"], next: R`有了 $\Phi$ 的谱，还要知道每种成分的初始扰动。` },
  { sec: "7.5", title: "早期的 Einstein–Boltzmann 方程", gist: R`$k\eta\ll1$ 时丢掉一切带 $k$ 的项：$\Theta_0'=-\Phi'$，$\delta_{\rm c}'=-3\Phi'$；Einstein 方程给出 $\Phi$ 的常数模与衰减模 $\eta^{-3}$。绝热初条件：$\Phi=2\Theta_0$，$\delta_{\rm c}=\delta_{\rm b}=3\Theta_0$，偶极与速度 $\propto k\eta$。`, gives: ["7.81", "7.85", "7.88", "7.91", "7.94", "7.95"], next: R`把全部结果整理成观测者使用的参数。` },
  { sec: "7.6", title: "小结：原初谱的参数化", gist: R`高斯、零均值、各模式独立 \eqref{7.98}。$P_{\mathcal R}=2\pi^2\mathcal A_sk^{-3}(k/k_{\rm p})^{n_s-1}$，$\mathcal A_s\simeq2.1\times10^{-9}$；张量 $P_{\rm T}=4P_h$；慢滚预言 $r=16\epsilon_{\rm sr}$、$n_{\rm T}=-2\epsilon_{\rm sr}$、$n_s=1-4\epsilon_{\rm sr}-2\delta_{\rm sr}$。`, gives: ["7.98", "7.99", "7.102", "7.104", "7.108", "7.110"] },
];

// ---------- 推导图 ----------
export const EQMAP_BG = [
  { from: "7.3", to: "7.2", label: R`只有物质 + 辐射` },
  { from: "7.3", to: "7.4", label: R`令 $(aH)^{-1}$ 缩小：$H=H_{\rm inf}$` },
  { from: "7.4", to: "7.5", label: R`以暴胀结束为 $\eta=0$` },
  { from: "7.6", to: "7.8", label: R`均匀场：$T^0{}_0=-\rho$` },
  { from: "7.6", to: "7.9", label: R`$T^i{}_i=P$` },
  { from: "7.8", to: "7.10", label: "" },
  { from: "7.9", to: "7.10", label: R`$w=P/\rho\to-1$` },
  { from: "7.12", to: "7.14", label: R`代入 $\rho$、$P$` },
  { from: "7.8", to: "7.14", label: "" },
  { from: "7.14", to: "7.15", label: R`换成 $\eta$` },
  { from: "7.5", to: "7.16", label: R`$H\approx$ 常数` },
  { from: "7.16", to: "7.17", label: R`$H$ 的变化率` },
  { from: "7.15", to: "7.18", label: R`场的"加速度"` },
];
export const EQMAP_PERT = [
  { from: "7.20", to: "7.26", label: R`$\hat a|0\rangle=0$` },
  { from: "7.27", to: "7.33", label: R`$\mathfrak h=ah/\sqrt{16\pi G}$` },
  { from: "7.16", to: "7.40", label: R`$a''/a=2/\eta^2$` },
  { from: "7.33", to: "7.40", label: R`视界内归一化` },
  { from: "7.26", to: "7.35", label: "每个模式一个振子" },
  { from: "7.35", to: "7.42", label: R`$-k\eta\to0$` },
  { from: "7.40", to: "7.42", label: "" },
  { from: "7.42", to: "7.55", label: R`$\delta\phi$ 同方程，去掉 $16\pi G$` },
  { from: "7.57", to: "7.71", label: R`超视界守恒条件` },
  { from: "7.55", to: "7.78", label: R`$\mathcal R=-aH\delta\phi/\bar\phi'$` },
  { from: "7.71", to: "7.78", label: "" },
  { from: "7.78", to: "7.62", label: R`$\mathcal R=-\frac32\Psi$` },
  { from: "7.85", to: "7.91", label: R`常数模 + 绝热` },
  { from: "7.62", to: "7.91", label: "" },
  { from: "7.91", to: "7.94", label: R`$n_{\rm c}/n_\gamma$ 均匀` },
  { from: "7.78", to: "7.99", label: R`参数化：$\mathcal A_s$、$n_s$` },
  { from: "7.42", to: "7.102", label: R`两种偏振：$P_{\rm T}=4P_h$` },
  { from: "7.99", to: "7.104", label: "" },
  { from: "7.102", to: "7.104", label: R`$r=P_{\rm T}/P_{\mathcal R}$` },
  { from: "7.99", to: "7.110", label: R`$d\ln/d\ln k$ 于 $aH=k$` },
];
export const EQMAP_LABELS = {
  "7.2": R`视界问题：$1.2^\circ$`, "7.3": "共动视界", "7.4": "指数膨胀", "7.5": R`$\eta$ 重新定义`, "7.6": "标量场能动张量",
  "7.8": "能量密度", "7.9": "压强", "7.10": "物态方程", "7.12": "连续性方程", "7.14": R`场方程（$t$）`, "7.15": R`场方程（$\eta$）`,
  "7.16": R`$\eta\simeq-1/aH$`, "7.17": R`$\epsilon_{\rm sr}$`, "7.18": R`$\delta_{\rm sr}$`,
  "7.20": "位置算符", "7.26": "真空方差", "7.27": "张量模方程", "7.33": "模函数方程", "7.35": "张量功率谱定义", "7.40": "de Sitter 模函数",
  "7.42": "引力波功率谱", "7.55": R`$\delta\phi$ 功率谱`, "7.57": R`曲率扰动 $\mathcal R$`, "7.71": R`$\mathcal R$ 守恒条件`, "7.78": R`$\mathcal R$ 功率谱`, "7.62": R`$\Phi$ 功率谱`,
  "7.85": "早期 Einstein 方程", "7.91": R`$\Phi=2\Theta_0$`, "7.94": R`$\delta_{\rm c}=\delta_{\rm b}=3\Theta_0$`, "7.99": R`$\mathcal A_s$、$n_s$`, "7.102": R`张量谱 $P_{\rm T}$`, "7.104": R`$r=16\epsilon_{\rm sr}$`, "7.110": R`$n_s$`,
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "bg", label: "背景：视界与暴胀" },
  { id: "quant", label: "量子涨落" },
  { id: "scalar", label: "标量扰动与规范" },
  { id: "obs", label: "初始条件与观测" },
];

export const concepts = [
  {
    id: "horizon", name_zh: "视界问题", name_en: "Horizon problem", icon: "🌐", section_id: "7.1", group: "bg",
    plain: R`CMB 上相隔超过约 $1.2^\circ$ 的区域在复合时从未因果接触，温度却相同。`,
    explain: R`共动视界 $\eta_*$ 是复合之前光能走过的共动距离。只含物质与辐射时，$\eta_*\approx281\,\mathrm{Mpc}$，而我们到最后散射面的距离 $\eta_0-\eta_*$ 约为它的 50 倍。于是天空上张角 $\theta\gtrsim\eta_*/(\eta_0-\eta_*)\approx1.2^\circ$ 的两块区域，过去光锥在 $\eta=0$ 之前都不重叠（图 7.1）。

热平衡需要接触；没有接触就没有理由温度相同。问题的根源在于假设：$\eta$ 的主要贡献来自最近的时期，因为物质/辐射主导时共动哈勃半径一直在增大。`,
    analogy: R`像在两个从未通信过的城市里，各自随机设定的室温竟然都是 $20.0000\,^\circ$C——要么是巧合到极点，要么它们很久以前其实是同一个房间。`,
    book_example: { what: R`式 (7.1)–(7.2)：$\chi(\theta)\simeq(\eta_0-\eta_*)\theta$，$\eta_0\approx14200\,\mathrm{Mpc}$。`, point: "视界问题是“宇宙为何又光滑又大”的定量版本。" },
    misconception: R`视界问题不是说宇宙“太大”，而是说在只有减速膨胀的历史里，可观测宇宙由大约 $10^4$ 个互不相干的区域拼成，它们却一模一样。`,
  },
  {
    id: "hubble_radius", name_zh: "共动哈勃半径", name_en: "Comoving Hubble radius", icon: "📏", section_id: "7.1", group: "bg",
    plain: R`$(aH)^{-1}$：一个 e 倍膨胀时间内光能走过的共动距离。`,
    explain: R`共动视界是它的对数积分：$\eta=\int_0^a d\ln a'\,(a'H)^{-1}$。它衡量的是“此刻、在一次 e 倍膨胀内，哪些粒子能互相通信”。

物质/辐射主导时 $(aH)^{-1}\propto a^{1/2}$ 或 $a$，不断增大；而 $(aH)^{-1}=\dot a^{-1}$ 减小就等价于 $\ddot a>0$——加速膨胀。暴胀期间 $H$ 几乎不变，$(aH)^{-1}\propto1/a$ 指数式缩小，所以早期它曾经比今天的哈勃半径还大（图 7.2）。`,
    analogy: R`像一个“当前通话半径”：通话半径在缩小，但很久以前大家都在同一个通话圈里交换过信息，所以现在彼此看起来协调一致。`,
    book_example: { what: R`图 7.2：暴胀段 $(aH)^{-1}$ 随 $a$ 下降，之后在辐射、物质时期上升；宇宙学尺度的水平带两次穿越它。`, point: R`区分“视界” $\eta$（历史积累）与“哈勃半径” $(aH)^{-1}$（当下）。` },
    misconception: R`暴胀期间缩小的是**共动**哈勃半径；物理哈勃半径 $H^{-1}$ 基本不变。`,
  },
  {
    id: "inflation", name_zh: "暴胀", name_en: "Inflation", icon: "🎈", section_id: "7.1", group: "bg",
    plain: R`早期一段近乎指数式的加速膨胀：$a\propto e^{H_{\rm inf}t}$。`,
    explain: R`暴胀把一块曾经有因果联系、已热化的小区域拉伸成远大于今天可观测宇宙的区域，从而解决视界问题；同时任何原有的粒子、曲率、不均匀都被指数式稀释（$n\propto a^{-3}\propto e^{-3H_{\rm inf}t}$），宇宙被“清空”和“熨平”（图 7.4）。

需要多久？设暴胀后温度 $T_e=10^{14}\,\mathrm{GeV}$、全程按辐射主导估算，$a_e/a_0\simeq T_0/T_e\simeq10^{-27}$，故 $a$ 至少增大 $10^{27}\simeq e^{62}$ 倍——约 60 个 e 倍（e-folds）。

暴胀结束时，驱动它的物质衰变为普通粒子并热化（再加热），因为这种物质处处几乎相同，所以热大爆炸的温度也处处相同。暴胀还不可避免地留下量子涨落——结构的种子。`,
    analogy: "像吹气球：起初皱巴巴的表面，越吹越平滑；画在上面的小图案被拉得巨大。",
    book_example: { what: R`式 (7.4) 与图 7.3、7.4：粒子在共动网格上被稀释，暴胀物质的能量密度 $\rho_{\rm inf}$ 保持常数。`, point: "暴胀一举解决均匀性并提供扰动的来源。" },
    misconception: "暴胀不能由宇宙学常数驱动：宇宙学常数会让加速永远持续下去，而暴胀必须结束并过渡到辐射时期。",
  },

  {
    id: "scalar_field", name_zh: "暴胀子（标量场）", name_en: "Inflaton", icon: "⚽", section_id: "7.2", group: "bg",
    plain: R`像一颗小球在势 $V(\phi)$ 上滚：动能 $\frac12\dot\phi^2$、势能 $V$。`,
    explain: R`标量场的能动张量给出 $\rho=\frac12\dot\phi^2+V$、$\mathcal P=\frac12\dot\phi^2-V$。势能主导时 $\mathcal P\approx-\rho$，$w\approx-1$，产生加速膨胀。场的运动方程 $\ddot\phi+3H\dot\phi+V_{,\phi}=0$ 就是带摩擦（$3H\dot\phi$，“哈勃摩擦”）的小球在势中运动。

当场滚到势的极小值，开始振荡，$w\approx0$，暴胀结束；随后衰变为更轻的粒子（再加热）。已知的 Higgs 场无法担此任，暴胀子是假想的新场。`,
    analogy: "一颗小球在几乎平坦、略有坡度的高原上缓缓滚动，最后掉进山谷来回晃荡——高原上是暴胀，山谷里是再加热。",
    book_example: { what: R`式 (7.6)–(7.15) 与图 7.5。`, point: "所有结论对标量场暗能量（quintessence）同样适用。" },
    misconception: R`不要把场 $\phi$ 与度规扰动 $\Phi$ 混为一谈；前者是物质场，后者是引力势。`,
  },
  {
    id: "slow_roll", name_zh: "慢滚参数", name_en: "Slow-roll parameters", icon: "🐢", section_id: "7.2", group: "bg",
    plain: R`$\epsilon_{\rm sr}$ 量 $H$ 变得多快，$\delta_{\rm sr}$ 量场的“加速度”；暴胀时都很小。`,
    explain: R`$\epsilon_{\rm sr}\equiv\frac{d}{dt}\frac1H=-\frac{H'}{aH^2}$：一个 e 倍膨胀中 $H$ 的相对减小。$\epsilon_{\rm sr}<1$ 等价于加速膨胀；辐射期 $\epsilon_{\rm sr}=2$。$\delta_{\rm sr}\equiv\ddot\phi/(H\dot\phi)$：场的加速度相对于哈勃摩擦的大小。

这两个参数正是观测量的“翻译器”：$r=16\epsilon_{\rm sr}$、$n_{\rm T}=-2\epsilon_{\rm sr}$、$n_s-1=-4\epsilon_{\rm sr}-2\delta_{\rm sr}$。它们又可以用势及其导数表示（\exref{7.8}），所以测量谱指数就是在测势的形状。`,
    analogy: R`像测量一辆车是否“匀速巡航”：一个看速度表的变化（$\epsilon_{\rm sr}$），一个看油门的变化（$\delta_{\rm sr}$）。`,
    book_example: { what: R`式 (7.17)、(7.18)；\exref{7.7}、\exref{7.8} 的恒等式。`, point: "两参数就概括了慢滚模型的主要预言。" },
    misconception: R`文献中常写作 $\epsilon$、$\eta$（或 $\delta$），定义与归一化各不相同；本书带下标 sr 以免与共形时间 $\eta$ 混淆。`,
  },

  {
    id: "vacuum", name_zh: "真空涨落被放大", name_en: "Amplified vacuum fluctuations", icon: "✨", section_id: "7.3", group: "quant",
    plain: "在快速膨胀的时空里，起初的真空在后来“看起来”含有粒子：涨落被拉伸、放大。",
    explain: R`每个 Fourier 模式都是一个谐振子：量子化后 $\hat x=v\hat a+v^*\hat a^\dagger$，$v=e^{-i\omega t}/\sqrt{2\omega}$，真空中 $\hat a|0\rangle=0$ 但方差 $|v|^2=1/2\omega\neq0$——零点涨落。暴胀计算的诀窍是把张量扰动与标量场扰动都写成 $v''+(k^2-a''/a)v=0$。

在 Minkowski 空间，真空涨落不随时间变化，可以减掉，不产生真实粒子。但在暴胀中，模函数的两个独立解时间行为截然不同：视界内振荡，视界外分裂成常数模与衰减模。起初的真空在后来的观测者看来已不是真空——引力子（与标量场的量子）被产生出来。

方差 $|v|^2$ 被识别为功率谱：$P_h=16\pi G|v|^2/a^2$，出视界后变成常数 $8\pi GH^2/k^3$。`,
    analogy: "像在一块不断被快速拉伸的橡皮膜上画的细小涟漪：拉伸得够快，涟漪来不及振荡就被“定格”成了大尺度的起伏。",
    book_example: { what: R`式 (7.34)–(7.42)。`, point: R`测到原初引力波就是测到暴胀时的 $H$，从而测到势 $V$。` },
    misconception: "暴胀扰动并非来自暴胀之前的“初始不均匀”——那些早被稀释掉了；它们是不可预测的量子涨落，理论只预言其统计分布。",
  },
  {
    id: "freeze", name_zh: "出视界冻结", name_en: "Freeze-out at horizon exit", icon: "🧊", section_id: "7.3", group: "quant",
    plain: R`模式在 $k|\eta|\approx1$（$k=aH$）离开视界，此后幅度保持不变，直到很久以后重新进入视界。`,
    explain: R`de Sitter 中 $v=\frac{e^{-ik\eta}}{\sqrt{2k}}(1-\frac{i}{k\eta})$。$k|\eta|\gg1$ 时它是普通的振荡；$k|\eta|\ll1$ 时 $|v|\propto1/|\eta|\propto a$，于是 $h\propto v/a$ 冻结为常数。

暴胀让每个模式经历“视界内（量子振荡）→ 出视界（冻结）→ 暴胀结束后在辐射/物质期重新进入视界（再次演化）”。再加热的细节不影响超视界模式，所以我们不需要知道它。`,
    analogy: "像一张照片：快门（出视界）之前画面在动，之后就被定格；很久以后才把照片拿出来继续“播放”。",
    book_example: { what: R`式 (7.41) 及图 7.6（$\mathcal R$ 在 $k\eta\simeq-1$ 冻结）。`, point: R`功率谱中的 $H$ 应取在 $aH=k$ 时刻。` },
    misconception: R`“出视界”是指离开**哈勃半径** $(aH)^{-1}$，而不是离开某个真正的因果边界。`,
  },
  {
    id: "tensor_gw", name_zh: "原初引力波", name_en: "Primordial gravitational waves", icon: "🌊", section_id: "7.3", group: "quant",
    plain: R`张量模 $h_+$、$h_\times$ 的真空涨落：$P_h=8\pi GH^2/k^3$，几乎尺度不变。`,
    explain: R`张量扰动是规范不变的，也不与其他扰动耦合，所以最先计算。两种偏振互不相关，总张量谱 $P_{\rm T}=4P_h$。幅度只依赖暴胀时的 $H$，即 $\propto\rho/m_{\rm Pl}^4$：暴胀能标若远低于 Planck 尺度，原初引力波将无法探测。

它们不影响物质分布，但会在 CMB 中产生各向异性与 B 模偏振（第 10 章），是暴胀独一无二的印记。`,
    analogy: "像暴胀时期时空本身的“颤抖”被永久录音：只要能听见，就能读出当时的能量标度。",
    book_example: { what: R`式 (7.42)、(7.102)、(7.104)。`, point: R`$r=16\epsilon_{\rm sr}$ 直接量出暴胀能标。` },
    misconception: "原初引力波与 LIGO 探测到的致密天体并合引力波频率相差数十个数量级，探测手段完全不同。",
  },
  {
    id: "adiabatic", name_zh: "绝热扰动", name_en: "Adiabatic perturbations", icon: "⚖️", section_id: "7.4", group: "obs",
    plain: R`各成分的分数扰动相同：$\delta\rho_s/\rho_s$ 对所有 $s$ 一样，物质与辐射之比处处均匀。`,
    explain: R`单场暴胀中，任何一处的状态完全由场值决定，暴胀在各处“结束得早一点或晚一点”而已——所以每处只是时间平移，各成分的相对比例不变。这就是绝热性 \eqref{7.43}。观测上，CMB 限制非绝热（等曲率）扰动不超过百分之几。

于是只需一个函数（例如 $\Phi$ 或 $\mathcal R$）就能确定所有成分的初始扰动：$\Theta_0=\mathcal N_0=\Phi/2$，$\delta_{\rm c}=\delta_{\rm b}=3\Theta_0$。`,
    analogy: "像把同一锅汤分成几碗：每碗的量不同，但汤里各种配料的比例都一样。",
    book_example: { what: R`式 (7.43) 与 (7.93)–(7.94)：$n_{\rm c}/n_\gamma$ 均匀推出 $\delta_{\rm c}=3\Theta_0$。`, point: "绝热 = 一个函数决定一切。" },
    misconception: R`绝热不是说各成分的**能量密度扰动** $\delta\rho_s$ 相同，而是**分数**扰动相同；数密度扰动 $\delta n/n$ 才对各成分完全相同（$\delta_{\rm c}=3\Theta_0=\frac34\delta_\gamma$）。`,
  },
  {
    id: "curv_R", name_zh: R`曲率扰动 $\mathcal R$`, name_en: "Curvature perturbation", icon: "🧭", section_id: "7.4", group: "scalar",
    plain: R`规范不变的组合 $\mathcal R=-\mathcal H+aH\mathcal V$；在单场暴胀中视界外守恒。`,
    explain: R`标量扰动的麻烦在于 $\delta\phi$ 与度规扰动耦合，且数值随规范而变。曲率扰动 $\mathcal R$ 把二者组合成一个规范不变量：暴胀中它等于 $-aH\delta\phi/\bar\phi'$，辐射期等于 $-\frac32\Psi=\frac32\Phi$。只要 $\delta P=(\dot P/\dot\rho)\delta\rho$（单场时自动成立），它在视界外守恒——所以不论再加热多复杂，都能把暴胀时的 $\delta\phi$ 直接接到暴胀后的 $\Phi$ 上。

另一条路线（\secref{7.4.3}）：在空间平直切片 $g_{ij}=a^2\delta_{ij}$ 中 $\delta\phi$ 的方程精确地不与度规耦合，再用 Bardeen 不变量构造的 $\mathcal R$ 翻译回牛顿规范；在共动规范中 $\mathcal R$ 就是空间曲率扰动，故名。

直观图像：$\Phi=\delta a/a$，而 $\delta a=aH\delta t$、$\delta\phi=\dot\phi\delta t$，故 $\Phi\sim H\delta\phi/\dot\phi$：场就是暴胀的钟。`,
    analogy: R`像一座桥的两端分别用不同的度量单位：$\mathcal R$ 是两边都认可的“通用货币”，过桥时不贬值。`,
    book_example: { what: R`式 (7.57)–(7.62)、(7.71)、(7.75)–(7.79)。`, point: R`观测约束通常直接写成 $P_{\mathcal R}(k)$。` },
    misconception: R`本书 $\mathcal R$ 与 $\Phi$ 的符号约定：辐射期 $\mathcal R=-\frac32\Psi=+\frac32\Phi$；不同文献 $\mathcal R$ 的符号与定义可能不同（如 $\zeta$）。`,
  },

  {
    id: "superhorizon_ic", name_zh: "超视界初始条件", name_en: "Super-horizon initial conditions", icon: "🌱", section_id: "7.5", group: "obs",
    plain: R`$k\eta\ll1$ 时丢掉所有带 $k$ 的项：只剩引力，扰动是常数。`,
    explain: R`暴胀结束后不久，所有感兴趣的模式都在视界外：$k\eta\ll1$。Boltzmann 方程中 $ik\mu\Theta$ 等项比 $\Theta'$ 小 $k\eta$ 倍，可以忽略，于是 $\Theta_0'=-\Phi'$，$\delta_{\rm c}'=\delta_{\rm b}'=-3\Phi'$。Einstein 方程化为 $\Phi''\eta+4\Phi'=0$，解为常数模（$p=0$）与衰减模（$p=-3$）。

保留常数模并加上绝热条件，得到 $\Phi=2\Theta_0$、$\delta_{\rm c}=\delta_{\rm b}=3\Theta_0$；偶极与速度比单极小 $k\eta$ 倍。`,
    analogy: "视界外的区域像一个与外界失联的房间：里面只有引力在起作用，各种成分一起“静止待命”。",
    book_example: { what: R`式 (7.80)–(7.96)。`, point: R`第 8、9 章的数值积分正是从这些初值出发。` },
    misconception: R`“扰动是常数”只对超视界模式成立，而且是在 $\Phi$ 与 $\Psi$ 互为相反数（忽略中微子四极矩）近似下；\exref{7.16} 给出修正。`,
  },
  {
    id: "tilt", name_zh: "谱指数与红倾斜", name_en: "Spectral tilt", icon: "📉", section_id: "7.6", group: "obs",
    plain: R`$n_s=1$ 表示尺度不变；暴胀预言 $n_s$ 略小于 1：大尺度幅度稍大。`,
    explain: R`尺度不变（scale-free）意为 $k^3P_{\mathcal R}(k)$ 与 $k$ 无关。暴胀中 $H$ 缓慢减小，较早出视界的大尺度模式感受到的 $H$ 更大，所以幅度略大——红倾斜。定量地 $n_s=1-4\epsilon_{\rm sr}-2\delta_{\rm sr}$，$n_{\rm T}=-2\epsilon_{\rm sr}$。

**一致性关系**：$r=16\epsilon_{\rm sr}$ 与 $n_{\rm T}=-2\epsilon_{\rm sr}$ 由同一个参数决定，消去得 $r=-8n_{\rm T}$（\exref{7.14}）——单场慢滚暴胀稳健、可证伪的预言。

观测（CMB）已确定地探测到红倾斜，$n_s\approx0.965$；标量振幅 $\mathcal A_s\simeq2.1\times10^{-9}$，即曲率扰动典型幅度 $\sqrt{\mathcal A_s}\simeq4.6\times10^{-5}$。`,
    analogy: "像一段逐渐减弱的鼓声：先敲的（大尺度）稍响，后敲的（小尺度）稍轻。",
    book_example: { what: R`式 (7.99)–(7.110)。`, point: "谱的微小倾斜是对慢滚动力学的直接测量。" },
    misconception: R`注意约定：标量谱的“尺度不变”是 $n_s=1$，而张量谱是 $n_{\rm T}=0$。`,
  },

];

export const relations = [
  { from: "horizon", to: "hubble_radius", label: "对数积分" },
  { from: "hubble_radius", to: "inflation", label: "缩小 = 加速" },
  { from: "scalar_field", to: "inflation", label: "驱动" },
  { from: "scalar_field", to: "slow_roll", label: "量化" },
  { from: "vacuum", to: "freeze", label: "出视界" },
  { from: "freeze", to: "tensor_gw", label: R`$P_h$` },
  { from: "freeze", to: "curv_R", label: R`$\delta\phi\to\mathcal R$` },
  { from: "curv_R", to: "superhorizon_ic", label: R`$\mathcal R=-\frac32\Psi$` },
  { from: "adiabatic", to: "superhorizon_ic", label: "一个函数" },
  { from: "slow_roll", to: "tilt", label: R`$n_s$、$n_{\rm T}$` },
  { from: "tensor_gw", to: "tilt", label: R`$r=-8n_{\rm T}$` },
  { from: "scalar_field", to: "adiabatic", label: "单场" },
  { from: "inflation", to: "vacuum", label: "拉伸涨落" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**视界问题与暴胀**：共动视界是共动哈勃半径 $(aH)^{-1}$ 的对数积分。只有减速膨胀时，CMB 上相隔 $\gtrsim1.2^\circ$ 的区域从未接触；让 $(aH)^{-1}$ 在早期缩小（$\ddot a>0$）约 60 个 e 倍即可解决，并顺带清空、熨平宇宙。`}</TxI>,
  <TxI>{R`**慢滚标量场**：$\rho=\frac12\dot\phi^2+V$、$\mathcal P=\frac12\dot\phi^2-V$，势能主导时 $w\approx-1$；$\ddot\phi+3H\dot\phi+V_{,\phi}=0$。慢滚参数 $\epsilon_{\rm sr}=d(1/H)/dt$、$\delta_{\rm sr}=\ddot\phi/(H\dot\phi)$ 很小。`}</TxI>,
  <TxI>{R`**量子涨落 → 经典扰动**：每个模式是一个谐振子，方差 $|v|^2$。de Sitter 中 $v=\frac{e^{-ik\eta}}{\sqrt{2k}}(1-\frac{i}{k\eta})$，出视界后冻结：$P_h=\frac{8\pi GH^2}{k^3}$，$P_{\delta\phi}=\frac{H^2}{2k^3}$（$H$ 取在 $aH=k$）。`}</TxI>,
  <TxI>{R`**曲率扰动**：$\mathcal R$ 规范不变、单场时视界外守恒，把暴胀中的 $\delta\phi$ 接到暴胀后的 $\Phi$：$P_{\mathcal R}=\frac{2\pi GH^2}{\epsilon_{\rm sr}k^3}$，$P_\Phi=\frac49P_{\mathcal R}$。**绝热初条件**：$\Phi=2\Theta_0$，$\delta_{\rm c}=\delta_{\rm b}=3\Theta_0$。`}</TxI>,
  <TxI>{R`**观测参数**：$\mathcal A_s\simeq2.1\times10^{-9}$（$k_{\rm p}=0.05\,\mathrm{Mpc}^{-1}$），$n_s=1-4\epsilon_{\rm sr}-2\delta_{\rm sr}$，$r=16\epsilon_{\rm sr}$，$n_{\rm T}=-2\epsilon_{\rm sr}$；后两者给出一致性关系 $r=-8n_{\rm T}$。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`为什么"共动哈勃半径 $(aH)^{-1}$ 缩小"能解决视界问题？`,
    options: [
      R`因为光速在暴胀期间变快了`,
      R`因为共动视界 $\eta=\int d\ln a\,(aH)^{-1}$ 会从极早期 $(aH)^{-1}$ 很大的时期获得巨大贡献，使复合时的因果区域远大于朴素估计`,
      R`因为暴胀让 CMB 光子重新热化`,
      R`因为物理哈勃半径 $H^{-1}$ 在暴胀期间急剧增大`,
    ],
    answer: 1, why: R`$\eta$ 是 $(aH)^{-1}$ 的对数积分。若早期 $(aH)^{-1}$ 曾经很大，$\eta_*$ 就会远大于只有物质与辐射时的 $281\,\mathrm{Mpc}$。物理哈勃半径在暴胀中基本不变。`,
  },
  {
    q: R`标量场要产生加速膨胀，需要满足什么？`,
    options: [R`动能远大于势能`, R`势能占主导，使 $\mathcal P\approx-\rho$`, R`场值为零`, R`$V_{,\phi}$ 很大`],
    answer: 1, why: R`$\mathcal P=\frac12\dot\phi^2-V$、$\rho=\frac12\dot\phi^2+V$；势能主导时 $w\to-1$，$\rho+3\mathcal P<0$。势很陡（$V_{,\phi}$ 大）反而会让场快速滚动、破坏慢滚。`,
  },
  {
    q: R`在 de Sitter 背景中，张量模出视界（$k|\eta|\ll1$）后，度规扰动 $h$ 如何变化？`,
    options: [R`继续以 $1/a$ 衰减`, R`保持常数（冻结）`, R`指数增长`, R`以频率 $k$ 振荡`],
    answer: 1, why: R`$|v|\to1/(\sqrt{2k}\,k|\eta|)\propto a$，而 $h\propto v/a$，所以为常数。视界内则是振幅 $\propto1/a$ 的振荡。`,
  },
  {
    q: R`标量扰动功率谱 $P_{\mathcal R}\propto H^2/\epsilon_{\rm sr}$ 中的 $1/\epsilon_{\rm sr}$ 从何而来？`,
    options: [
      R`来自引力波的两种偏振`,
      R`场扰动 $\delta\phi$ 通过"时间平移" $\delta t=\delta\phi/\dot\phi$ 转化为曲率扰动；势越平，$\dot\phi$ 越小，转化系数越大`,
      R`来自再加热过程的细节`,
      R`来自中微子的四极矩`,
    ],
    answer: 1, why: R`$\mathcal R=-aH\delta\phi/\bar\phi'$，$(aH/\bar\phi')^2=4\pi G/\epsilon_{\rm sr}$。$\delta\phi$ 的方差只依赖 $H$，转化系数依赖场滚得多快。再加热不影响超视界的 $\mathcal R$。`,
  },
  {
    q: R`绝热初条件下，暗物质过密度与光子温度单极矩的关系是？`,
    options: [R`$\delta_{\rm c}=\Theta_0$`, R`$\delta_{\rm c}=3\Theta_0$`, R`$\delta_{\rm c}=4\Theta_0$`, R`$\delta_{\rm c}=0$`],
    answer: 1, why: R`光子数密度 $n_\gamma\propto T^3$，$\delta n_\gamma/n_\gamma=3\Theta_0$；绝热要求 $n_{\rm c}/n_\gamma$ 处处相同，于是 $\delta_{\rm c}=3\Theta_0$（$=\frac32\Phi$）。`,
  },
  {
    q: R`若观测到 $r=0.04$，单场慢滚暴胀预言张量谱指数为多少？`,
    options: [R`$n_{\rm T}=+0.005$`, R`$n_{\rm T}=-0.005$`, R`$n_{\rm T}=-0.04$`, R`$n_{\rm T}=0.965$`],
    answer: 1, why: R`$r=16\epsilon_{\rm sr}\Rightarrow\epsilon_{\rm sr}=0.0025$；$n_{\rm T}=-2\epsilon_{\rm sr}=-0.005$，即一致性关系 $r=-8n_{\rm T}$。`,
  },
];

export const BRIDGE = R`现在方程组（第 5、6 章）与初始条件（本章）都齐备了：每个 Fourier 模式从 $\Phi=2\Theta_0$、$\delta_{\rm c}=\delta_{\rm b}=3\Theta_0$ 出发，振幅按 $P_\Phi(k)\propto k^{n_s-4}$ 随机抽取。第 8 章先追踪暗物质：模式重新进入视界后，辐射期与物质期的增长有何不同？这会把原初的近乎尺度不变的谱，加工成带有特征拐点的物质功率谱（转移函数与增长因子）。`;
