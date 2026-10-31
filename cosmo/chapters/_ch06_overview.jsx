// 第 6 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
const R = String.raw;

export const HOOK_TITLE = "引力怎样回应物质？";
export const HOOK = R`2015 年 9 月 14 日，LIGO 的两台干涉仪先后记录到一段持续不到一秒的"啁啾"：两个黑洞并合时发出的时空涟漪，让 4 公里长的臂长发生了约 $10^{-18}$ 米的伸缩——一个沿 $x$ 方向拉长、沿 $y$ 方向压短、再反过来的"四极"图样。那是**张量扰动**。

而在宇宙学尺度上，引力还有另一副面孔：物质聚集的地方，时间流逝得慢一点（$\Psi$），空间被"压弯"一点（$\Phi$）。正是这两个势，把上一章里光子、暗物质、重子、中微子的方程连成一体。

上一章我们只问了"给定度规扰动，物质和辐射怎样运动"；这一章要回答反过来的问题：**物质和辐射的扰动，怎样决定度规扰动本身？**答案就是线性化的 Einstein 方程。为了把 10 个分量的张量方程理清楚，我们先学会按"在空间转动下怎样变换"把扰动分成标量、矢量、张量三类，再弄清楚哪些自由度只是坐标选取的假象（规范），最后各取所需地算出标量势的两个方程与引力波方程。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "6.1", title: "标量–矢量–张量分解", gist: R`把一般扰动度规 \eqref{6.1} 的 10 个函数按空间转动性质分为 4 个标量（$A,B,D,E$）、2 个横向矢量（各 2 个自由度）与 2 个张量自由度 $h^{\rm TT}_{ij}$。分解定理：三类扰动在线性阶上**各自独立演化**。`, gives: ["6.1", "6.3", "6.5", "6.6"], next: R`10 个函数里有多少是"真的"？坐标的自由会吃掉一部分。` },
  { sec: "6.2", title: "从一个规范到另一个规范", gist: R`小坐标变换 $t\to t+\zeta$、$x^i\to x^i+\xi^{,i}$ 使 $A,B,D,E$ 按 \eqref{6.17}–\eqref{6.18} 变化；两个标量函数可被消去，只剩 2 个物理标量自由度，可由 Bardeen 不变量 $\Phi_A,\Phi_H$ 表示。总计 $10-4=6$：标量、矢量、张量各 2。`, gives: ["6.10", "6.13", "6.17", "6.18", "6.19"], next: R`于是可以放心地用只含 $\Psi$、$\Phi$ 的共形牛顿规范来算 Einstein 方程。` },
  { sec: "6.3", title: "标量扰动的 Einstein 方程", gist: R`由 Christoffel 符号 → Ricci 张量 \eqref{6.26}–\eqref{6.27} → Ricci 标量 \eqref{6.30} → Einstein 张量；取时–时分量得广义相对论版 Poisson 方程 \eqref{6.41}，取纵向无迹的空–空分量得 $k^2(\Phi+\Psi)\propto$ 各向异性应力 \eqref{6.48}。`, gives: ["6.26", "6.27", "6.30", "6.34", "6.41", "6.44", "6.47", "6.48"], next: R`标量方程都是"约束方程"，没有传播的自由度；张量模则不同。` },
  { sec: "6.4", title: "张量扰动：引力波", gist: R`对 $h^{\rm TT}_{ij}$ 重复 Christoffel → Ricci → Einstein，得到 $h_t''+2\frac{a'}ah_t'+k^2h_t=0$ \eqref{6.73}：膨胀宇宙中被哈勃摩擦阻尼的波动方程。超视界时冻结，进入视界后振荡并按 $1/a$ 衰减。最后验证张量不进入标量方程。`, gives: ["6.49", "6.67", "6.70", "6.72", "6.73", "6.74", "6.76"], next: R`汇总：线性 Einstein 方程给出什么。` },
  { sec: "6.5", title: "小结", gist: R`用物质/辐射的加权量重写两条标量方程 \eqref{6.77}–\eqref{6.78}；与时–空分量（习题 6.6）组合得代数形式 \eqref{6.80}；张量模满足 \eqref{6.81}。`, gives: ["6.77", "6.78", "6.79", "6.80", "6.81"] },
];

// ---------- 推导图 ----------
export const EQMAP_SCALAR = [
  { from: "6.1", to: "6.6", label: "按空间转动分类" },
  { from: "6.6", to: "6.11", label: "只留标量部分" },
  { from: "6.11", to: "6.17", label: R`代入 \eqref{6.13} 的 00 分量` },
  { from: "6.11", to: "6.18", label: "其余分量（习题 6.2）" },
  { from: "6.17", to: "6.19", label: "组合出不变量" },
  { from: "6.18", to: "6.19", label: "" },
  { from: "6.19", to: "6.20", label: R`取 $B=E=0$` },
  { from: "6.20", to: "6.26", label: R`由 \eqref{3.56} 组装` },
  { from: "6.20", to: "6.27", label: "习题 6.5" },
  { from: "6.26", to: "6.30", label: R`缩并 $g^{\mu\nu}R_{\mu\nu}$` },
  { from: "6.27", to: "6.30", label: "" },
  { from: "6.30", to: "6.34", label: R`$G^0{}_0=g^{00}R_{00}-R/2$` },
  { from: "6.34", to: "6.41", label: R`$=8\pi G\,\delta T^0{}_0$，换 $\eta$` },
  { from: "6.38", to: "6.41", label: R`光子 $4\Theta_0$` },
  { from: "6.27", to: "6.44", label: "纵向无迹投影" },
  { from: "6.44", to: "6.48", label: "等于各向异性应力" },
  { from: "6.47", to: "6.48", label: R`$-\frac83\rho_\gamma\Theta_2$` },
  { from: "6.41", to: "6.80", label: "加上时–空分量" },
];
export const EQMAP_TENSOR = [
  { from: "6.49", to: "6.53", label: R`$\Gamma^0{}_{ij}$` },
  { from: "6.49", to: "6.56", label: R`$\Gamma^i{}_{0j}$` },
  { from: "6.49", to: "6.57", label: R`$\Gamma^i{}_{jk}$（习题 6.8）` },
  { from: "6.53", to: "6.65", label: R`代入 \eqref{6.58} 四项` },
  { from: "6.56", to: "6.65", label: "" },
  { from: "6.57", to: "6.65", label: "" },
  { from: "6.65", to: "6.67", label: R`展开 $g_{ij,00}$` },
  { from: "6.67", to: "6.70", label: R`$\delta R=0$，升指标` },
  { from: "6.70", to: "6.72", label: R`取 $11-22$，换 $\eta$` },
  { from: "6.72", to: "6.73", label: "无各向异性应力" },
  { from: "6.73", to: "6.74", label: "忽略膨胀" },
  { from: "6.70", to: "6.76", label: "投影为零：分解定理" },
];
export const EQMAP_LABELS = {
  "6.1": "一般扰动度规", "6.6": "空–空扰动的完整分解", "6.11": "标量扰动度规", "6.17": R`$A$ 的变换`, "6.18": R`$B,D,E$ 的变换`,
  "6.19": "Bardeen 不变量", "6.20": "共形牛顿规范", "6.26": R`$R_{00}$`, "6.27": R`$R_{ij}$`, "6.30": R`一阶 $\delta R$`,
  "6.34": R`$\delta G^0{}_0$`, "6.38": "光子能量密度扰动", "6.41": "广义相对论 Poisson 方程", "6.44": "纵向无迹的 Einstein 张量",
  "6.47": "光子各向异性应力", "6.48": R`$\Phi+\Psi$ 方程`, "6.80": "代数形式的势方程",
  "6.49": "张量扰动度规", "6.53": R`$\Gamma^0{}_{ij}$`, "6.56": R`$\Gamma^i{}_{0j}$`, "6.57": R`$\Gamma^i{}_{jk}$`, "6.65": R`$R_{ij}$（未展开）`,
  "6.67": R`张量模的 $R_{ij}$`, "6.70": R`$\delta G^i{}_j$`, "6.72": R`$11-22$ 分量`, "6.73": "引力波方程", "6.74": "平直时空的平面波", "6.76": "张量不进入标量方程",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "decomp", label: "分解与规范" },
  { id: "scalar", label: "标量：两个势" },
  { id: "tensor", label: "张量：引力波" },
];

export const concepts = [
  {
    id: "svt", name_zh: "标量–矢量–张量分解", name_en: "Scalar–vector–tensor decomposition", icon: "🧩", section_id: "6.1", group: "decomp",
    plain: R`按空间转动下的变换方式，把度规扰动分成标量、矢量、张量三类。`,
    explain: R`$h_{00}$ 没有空间指标，是 3-标量；$h_{0i}$ 是 3-矢量，可拆成一个标量的梯度 $-B_{,i}$ 与一个无散矢量 $-B_i$；$h_{ij}$ 是对称 3-张量，可拆成 $2D\delta_{ij}$、$-2E_{,ij}$（标量）、$V_{i,j}+V_{j,i}$（矢量）以及剩下的横向无迹部分 $h^{\rm TT}_{ij}$（张量）。

这里的"标量/矢量/张量"是相对**空间转动**而言的 3 维概念，不要与时空标量 $\phi(x)$、四矢量 $P^\mu$、度规 $g_{\mu\nu}$ 这类 4 维概念混淆——作者自己也为这个命名道歉。`,
    analogy: R`像把一段录音拆成低音、中音、高音三个声部：每个声部可以单独演奏（独立演化），合起来才是完整的曲子。`,
    book_example: { what: R`式 \eqref{6.3}–\eqref{6.6}：Fourier 空间中 $h_{ij}=2D\delta_{ij}+2k_ik_jE+ik_iV_j+ik_jV_i+h^{\rm TT}_{ij}$。`, point: R`同样的分解适用于任何张量，包括能动张量。` },
    misconception: R`不是"$h_{ij}$ 有 6 个分量，所以都是张量"——其中 2 个是标量、2 个是矢量，只有 2 个是真正的张量自由度。`,
  },
  {
    id: "dof", name_zh: "自由度计数", name_en: "Counting degrees of freedom", icon: "🔢", section_id: "6.1", group: "decomp",
    plain: R`$10=4$（标量）$+4$（矢量）$+2$（张量）；去掉 4 个坐标自由后剩 6 个：每类各 2。`,
    explain: R`对称的 $4\times4$ 张量 $h_{\mu\nu}$ 有 $16-6=10$ 个独立函数。标量 $A,B,D,E$ 占 4 个；两个横向矢量 $B_i$、$V_i$ 各受一个横向约束，各 2 个；剩下 2 个就是张量 $h_+$、$h_\times$。

坐标变换 $\xi^\mu$ 有 4 个函数：$\zeta$ 与 $\xi$（标量型 2 个），横向 $\xi^i$（矢量型 2 个）。它们能消去 2 个标量与 2 个矢量自由度，而张量不受影响。最终 $10-4=6$：标量、矢量、张量各 2 个物理自由度。`,
    analogy: R`像在一张地图上标注地形：10 个读数里，有 4 个只取决于你把网格画在哪里、朝哪个方向——换一张网格它们就变了；真正属于地形本身的只有 6 个。`,
    book_example: { what: R`§6.1 数出 8 个标量与矢量函数，剩下 2 个是张量；§6.2 末尾：坐标变换 \eqref{6.8} 去掉 4 个，剩 6 个。`, point: R`这也解释了为何共形牛顿规范只需要 $\Psi$、$\Phi$ 两个标量。` },
    misconception: R`矢量扰动不是 3 个自由度：横向条件 $k^iB_i=0$ 去掉了沿 $\boldsymbol k$ 的分量（那一部分属于标量 $B$）。`,
  },
  {
    id: "decomp_thm", name_zh: "分解定理", name_en: "Decomposition theorem", icon: "🔀", section_id: "6.1", group: "decomp",
    plain: R`线性阶上，标量、矢量、张量扰动互不耦合、各自演化。`,
    explain: R`根本原因是 FLRW 背景空间**均匀**（不同 $\boldsymbol k$ 解耦）且**各向同性**（同一 $\boldsymbol k$ 下，绕 $\hat{\boldsymbol k}$ 转动性质不同的分量不能互相混合）。线性方程里，一个 3-标量只能由 $\delta_{ij}$ 或 $k_i$ 与扰动缩并得到，而这两种缩并作用在横向无迹的 $h^{\rm TT}_{ij}$ 上都为零。

本章三处体现：$R_{00}$ 与 $R$ 不含张量扰动的一阶项；纵向无迹投影把张量贡献消掉 \eqref{6.76}；标量势对 $G^1{}_1-G^2{}_2$ 与 $G^1{}_2$ 没有贡献（习题 6.10）。`,
    analogy: R`像一个各向同性的鼓面：绕中心对称的"呼吸"振动与"两叶"振动是不同的本征模，线性振幅下它们各振各的，互不交换能量。`,
    book_example: { what: R`§6.4.4：$(\hat k_i\hat k_j-\frac13\delta_{ij})\delta G^i{}_j$ 作用在张量扰动上恒为零。`, point: R`这就是此前一直可以只研究标量扰动的理由。` },
    misconception: R`分解定理只在线性阶成立；二阶时标量扰动可以产生引力波（"诱导引力波"），但这超出本书线性理论的范围。`,
  },
  {
    id: "gauge", name_zh: "规范与规范变换", name_en: "Gauge transformations", icon: "📐", section_id: "6.2", group: "decomp",
    plain: R`"规范"就是坐标的选法；同一物理状态在不同坐标里有不同的扰动值。`,
    explain: R`把扰动定义为"真实量减去背景量"时，必须先决定用哪个时刻的背景去比——这依赖于时间坐标的选择。所以即便标量场本身不变，$\hat\phi(\hat x)=\phi(x)$，它的扰动仍按 $\delta\hat\phi=\delta\phi-\dot{\bar\phi}\zeta$ 改变 \eqref{6.10}。

对度规，小坐标变换 $t\to t+\zeta$、$x^i\to x^i+\xi^{,i}$ 使 $A\to A-\zeta'/a$，$B\to B-\zeta/a+\xi'$，$D\to D-H\zeta$，$E\to E+\xi$。选择 $\zeta,\xi$ 就能把任意两个标量函数设为零：$B=E=0$ 是共形牛顿规范，$D=E=0$ 是空间平坦规范，$A=B=0$ 是同步规范。`,
    analogy: R`测量海浪高度时，"零点"取哪一刻的平均海平面会影响每个浪的读数——但浪本身的形状并不因此改变。`,
    book_example: { what: R`式 \eqref{6.17}–\eqref{6.18}；例：取 $\xi=-E$ 即可得到 $\hat E=0$。`, point: R`不同计算可以挑最方便的规范（第 7 章用空间平坦规范算暴胀扰动）。` },
    misconception: R`规范自由不是"物理的不确定性"：可观测量在任何规范下都相同；变化的只是我们给扰动起的名字。`,
  },
  {
    id: "bardeen", name_zh: "Bardeen 规范不变量", name_en: "Bardeen potentials", icon: "⚖️", section_id: "6.2", group: "decomp",
    plain: R`$\Phi_A$、$\Phi_H$ 是度规扰动的两个组合，在任何小坐标变换下都不变。`,
    explain: R`$\Phi_A\equiv A+\frac1a\partial_\eta[a(E'-B)]$，$\Phi_H\equiv-D+aH(B-E')$。代入 \eqref{6.17}–\eqref{6.18}，$\zeta$ 与 $\xi$ 的贡献恰好抵消。共形牛顿规范中 $B=E=0$，于是 $\Phi_A=\Psi$、$\Phi_H=-\Phi$：两个牛顿势本身就是规范不变量的"化身"。

用法：在最方便的规范里算出 $A,B,D,E$，组成 $\Phi_A,\Phi_H$，再换算到想要的规范——第 7.4.3 节正是这样从空间平坦规范转到共形牛顿规范。`,
    analogy: R`就像两点之间的距离：不管你把坐标原点放在哪、坐标轴怎么转，算出来都一样。`,
    book_example: { what: R`式 \eqref{6.19} 与习题 6.2。`, point: R`恰好两个独立不变量 = 两个物理标量自由度。` },
    misconception: R`$\Phi_H$ 在共形牛顿规范中等于 $-\Phi$ 而不是 $\Phi$——符号约定要小心。`,
  },
  {
    id: "poisson", name_zh: "广义相对论版 Poisson 方程", name_en: "GR Poisson equation", icon: "🍎", section_id: "6.3", group: "scalar",
    plain: R`$k^2\Phi+3\frac{a'}a(\Phi'-\Psi\frac{a'}a)=4\pi Ga^2\delta\rho$：小尺度回到牛顿引力，大尺度有膨胀修正。`,
    explain: R`由 Einstein 方程时–时分量得到 \eqref{6.41}。没有膨胀（$a'=0$）时左边就是 $-\nabla^2\Phi$，右边是 $4\pi Ga^2\delta\rho$——熟悉的 Poisson 方程。含 $a'$ 的项只在物理波长 $a/k$ 接近或超过哈勃半径 $H^{-1}$ 时重要；而今天关心的每个模式都曾经大于哈勃半径，所以必须用完整的相对论形式。

右边按能量密度扰动加权：物质贡献 $\rho\delta$，光子与中微子贡献 $4\rho_\gamma\Theta_0$、$4\rho_\nu\mathcal N_0$（因子 4 来自 $\rho\propto T^4$）。`,
    analogy: R`在一个小房间里，你感受到的重力只取决于附近物质的多少；但若"房间"大到与整个可观测宇宙相当，就不能忽略房间本身在膨胀。`,
    book_example: { what: R`式 \eqref{6.40}–\eqref{6.41}；习题 6.7 给出无时间导数的代数形式 \eqref{6.80}，$k\gg aH$ 时化为 Poisson 方程。`, point: R`这是联系物质扰动与势的主方程。` },
    misconception: R`光子的扰动不是 $\Theta_0$ 而是 $4\Theta_0$ 进入能量密度——文献中有人把 $\Theta$ 定义为 $\delta\rho_\gamma/\rho_\gamma$，两种约定差 4 倍。`,
  },
  {
    id: "aniso", name_zh: R`各向异性应力与 $\Phi+\Psi$`, name_en: "Anisotropic stress", icon: "🌀", section_id: "6.3", group: "scalar",
    plain: R`没有四极矩时 $\Phi=-\Psi$；只有中微子（以及少量光子）的四极矩能让两者不同。`,
    explain: R`用投影算符 $\hat k_i\hat k^j-\frac13\delta^j_i$ 从 $G^i{}_j$ 中取出纵向无迹部分，得 $\frac{2}{3a^2}k^2(\Phi+\Psi)$；从能动张量中取出相同部分，被积函数正比于 $\mu^2-\frac13=\frac23\mathcal P_2(\mu)$，即分布函数的**四极矩**——这就是各向异性应力。

非相对论物质被 $p/E$ 压低，不贡献；光子在紧耦合时四极矩很小；只有自由流动的中微子在辐射时期有可观的 $\mathcal N_2$。于是 $k^2(\Phi+\Psi)=-32\pi Ga^2[\rho_\gamma\Theta_2+\rho_\nu\mathcal N_2]$，多数时候 $\Phi\simeq-\Psi$。`,
    analogy: R`压强像各方向等大的"推力"；各向异性应力则像一束定向的风：只有当粒子流在某些方向上更强（四极分布）时才出现。`,
    book_example: { what: R`式 \eqref{6.44}–\eqref{6.48}。`, point: R`$\Phi\neq-\Psi$ 是自由流中微子留下的可观测印记。` },
    misconception: R`"$\Phi=-\Psi$" 不是规范选择，而是 Einstein 方程在无各向异性应力时的结果。`,
  },
  {
    id: "constraint", name_zh: "约束方程", name_en: "Constraint equations", icon: "🔒", section_id: "6.3", group: "scalar",
    plain: R`标量方程里没有 $\Phi$、$\Psi$ 的二阶时间导数：势不是独立传播的自由度。`,
    explain: R`\eqref{6.41} 与 \eqref{6.48} 最多只含一阶时间导数 $\Phi'$。这意味着只要知道某一时刻的物质与辐射分布，势就被"约束"出来，而不是像波那样携带自己的初始数据独立传播——牛顿引力势也是如此。

相比之下，张量方程 \eqref{6.73} 含 $h''$，是真正的波动方程：引力波一旦产生就能脱离源独立传播。`,
    analogy: R`势像物体的影子：物体动，影子立刻跟着动；引力波则像抛出去的石子，离手后自己飞。`,
    book_example: { what: R`§6.3.2 末尾的说明。`, point: R`标量势只是"跟随"物质；张量模才是引力的辐射自由度。` },
    misconception: R`约束方程不等于"静态"：$\Phi$、$\Psi$ 当然随时间变化，只是变化由源决定。`,
  },
  {
    id: "tt", name_zh: "横向无迹与两种偏振", name_en: "Transverse-traceless tensor", icon: "➕", section_id: "6.4", group: "tensor",
    plain: R`张量扰动对称、无迹、垂直于传播方向：$\boldsymbol k\parallel z$ 时只剩 $h_+$ 与 $h_\times$。`,
    explain: R`横向 $k^ih^{\rm TT}_{ij}=0$ 去掉 3 个分量，无迹去掉 1 个，6 个对称分量只剩 2 个。取 $\hat{\boldsymbol k}=\hat{\boldsymbol e}_z$，$h^{\rm TT}_{ij}$ 只在 $x$–$y$ 块非零：对角 $\pm h_+$，非对角 $h_\times$。

几何上，$h_+>0$ 把一圈测试粒子在 $x$ 方向拉长、$y$ 方向压短；$h_\times$ 的图样转了 $45^\circ$。这种绕 $\hat{\boldsymbol k}$ 的椭圆图样是张量模区别于标量模的标志：标量扰动造成的形变总是绕 $\hat{\boldsymbol k}$ 轴对称。`,
    analogy: R`像捏一个橡皮圈：一只手横向拉、另一只手纵向挤（$+$），或者沿两条对角线这样做（$\times$）。`,
    book_example: { what: R`式 \eqref{6.49} 与图 6.1。`, point: R`$h_+$、$h_\times$ 线性阶上规范不变，各满足同一个方程。` },
    misconception: R`引力波不在传播方向上拉伸空间（横波），也不改变面积（无迹，一阶上）。`,
  },
  {
    id: "gw_eq", name_zh: "膨胀宇宙中的引力波方程", name_en: "Gravitational waves in FLRW", icon: "🌊", section_id: "6.4", group: "tensor",
    plain: R`$h''+2\frac{a'}ah'+k^2h=0$：波动方程加上膨胀造成的"哈勃摩擦"。`,
    explain: R`Einstein 方程的 $11-22$ 分量（以及 $12$ 分量）在没有各向异性应力时给出 \eqref{6.73}。忽略膨胀时解为 $e^{\pm ik\eta}$，即以光速沿 $\pm z$ 传播的波。

膨胀带来阻尼项 $2(a'/a)h'$：$k\eta\ll1$（超视界）时 $h=$ 常数；进入视界（$k\eta\sim1$）后以 $\cos k\eta$ 振荡并按 $1/a$ 衰减，于是能量密度 $\propto a^{-4}$，和辐射一样。辐射主导下精确解为 $j_0(k\eta)$，物质主导下为 $3j_1(k\eta)/(k\eta)$（习题 6.12）。`,
    analogy: R`像在一个不断变大的游泳池里荡起的水波：池子越大，波越"稀"、越弱。`,
    book_example: { what: R`式 \eqref{6.72}–\eqref{6.74} 与图 6.2：$k/H_0=1,10,100,1000$ 的四个模式依次在 $k\eta\sim1$ 时开始衰减。`, point: R`小尺度模式进入视界更早，衰减更多。` },
    misconception: R`引力波振幅衰减不是因为"被吸收"——它在一个膨胀的背景里自由传播，振幅衰减只是能量被稀释与红移。`,
  },
  {
    id: "horizon", name_zh: "视界进入", name_en: "Horizon entry", icon: "🌅", section_id: "6.4", group: "tensor",
    plain: R`$k\eta=1$ 时模式的波长与视界相当；之前冻结，之后振荡衰减。`,
    explain: R`共形时间 $\eta$ 是光自宇宙诞生以来走过的共动距离，即（共动）视界。$k\eta<1$ 的模式波长比视界大，因果上无法"感受到"自身的振荡，方程中 $k^2h$ 项可忽略，$h=$ 常数是解。

$k\eta\sim1$ 后 $k^2h$ 项开始主导，模式振荡。进入时刻 $\eta\sim1/k$：$k/H_0=1000$ 的模式在 $H_0\eta\sim10^{-3}$ 进入，$k/H_0=1$ 的模式直到今天（$H_0\eta_0\approx3.2$）附近才进入。同样的逻辑贯穿标量扰动（第 7、8 章）。`,
    analogy: R`像远处海面的一个超长涌浪：在你站的那一小块水面上，它只表现为水位缓慢的整体升降；只有当你能看到整个波长时，它才是"波"。`,
    book_example: { what: R`图 6.2 与 §6.4.3 末段。`, point: R`大尺度引力波保留了原初振幅，是在 CMB 大角度上寻找它们的原因。` },
    misconception: R`"视界进入"不是模式穿过了某个物理边界，而是视界随时间长大、追上了固定的共动波长。`,
  },
];

export const relations = [
  { from: "svt", to: "dof", label: "计数" },
  { from: "svt", to: "decomp_thm", label: "各自演化" },
  { from: "dof", to: "gauge", label: "坐标去掉 4 个" },
  { from: "gauge", to: "bardeen", label: "不变组合" },
  { from: "bardeen", to: "poisson", label: "共形牛顿规范" },
  { from: "poisson", to: "constraint", label: "无二阶导" },
  { from: "aniso", to: "constraint", label: "同属约束" },
  { from: "decomp_thm", to: "aniso", label: "投影取标量" },
  { from: "svt", to: "tt", label: "剩下的 2 个" },
  { from: "tt", to: "gw_eq", label: "Einstein 方程" },
  { from: "gw_eq", to: "horizon", label: "冻结与衰减" },
  { from: "aniso", to: "gw_eq", label: "中微子阻尼" },
  { from: "decomp_thm", to: "gw_eq", label: "不受标量影响" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  R`**分解**：度规扰动的 10 个函数 = 4 个标量（$A,B,D,E$）+ 2 个横向矢量（各 2）+ 张量 $h^{\rm TT}_{ij}$（2）。FLRW 背景的均匀各向同性保证三类扰动在线性阶上互不耦合（分解定理）。`,
  R`**规范**：小坐标变换使 $A\to A-\zeta'/a$，$B\to B-\zeta/a+\xi'$，$D\to D-H\zeta$，$E\to E+\xi$；4 个坐标函数去掉 4 个自由度，剩标量、矢量、张量各 2。Bardeen 组合 $\Phi_A$、$\Phi_H$ 规范不变，共形牛顿规范中即 $\Psi$ 与 $-\Phi$。`,
  R`**标量方程**：时–时分量给出相对论 Poisson 方程 $k^2\Phi+3\frac{a'}a(\Phi'-\Psi\frac{a'}a)=4\pi Ga^2[\rho_{\rm m}\delta_{\rm m}+4\rho_{\rm r}\Theta_{\rm r,0}]$；纵向无迹的空–空分量给出 $k^2(\Phi+\Psi)=-32\pi Ga^2\rho_{\rm r}\Theta_{\rm r,2}$。两者都是约束方程。`,
  R`**张量方程**：$h_t''+2\frac{a'}ah_t'+k^2h_t=0$。超视界时冻结，$k\eta\sim1$ 进入视界后振荡并按 $1/a$ 衰减（能量密度 $\propto a^{-4}$）；RD 解 $j_0(k\eta)$，MD 解 $3j_1(k\eta)/k\eta$。`,
  R`**连同第 5 章**：Boltzmann 方程 + 这两条 Einstein 方程构成一组闭合的线性方程，只差初始条件——那是第 7 章的任务。`,
];

export const QUIZ = [
  {
    q: R`为什么 $h_{ij}$ 的 6 个分量里只有 2 个是"张量"自由度？`,
    options: [R`因为 $h_{ij}$ 对称`, R`因为其中 2 个可由标量 $D,E$ 构造、2 个可由横向矢量 $V_i$ 构造，剩下的横向无迹部分只有 2 个`, R`因为坐标变换消去了 4 个分量`, R`因为 $h_{ij}$ 必须无迹`],
    answer: 1, why: R`对称性已用于"6 个分量"本身；$2D\delta_{ij}-2E_{,ij}$ 占 2 个、$V_{i,j}+V_{j,i}$ 占 2 个，剩下的 $h^{\rm TT}_{ij}$ 满足横向与无迹条件，只有 2 个。坐标变换消去的是标量与矢量，不碰张量。`,
  },
  {
    q: R`标量场的扰动在时间平移 $t\to t+\zeta$ 下变为 $\delta\phi-\dot{\bar\phi}\zeta$，而场本身 $\hat\phi(\hat x)=\phi(x)$ 不变。原因是？`,
    options: [R`标量场其实不是标量`, R`扰动是相对背景定义的，而"同一时刻的背景值"依赖时间坐标的选择`, R`$\zeta$ 是二阶小量`, R`只有在暴胀期间才如此`],
    answer: 1, why: R`$\delta\phi=\phi-\bar\phi(t)$；换了时间坐标后，与同一个时空点比较的背景值变成 $\bar\phi(t+\zeta)$，差出 $\dot{\bar\phi}\zeta$。若背景不随时间变化，扰动就是规范不变的。`,
  },
  {
    q: R`在没有膨胀（$a=$ 常数）时，\eqref{6.41} 化为什么？`,
    options: [R`波动方程`, R`Poisson 方程 $-\nabla^2\Phi\leftrightarrow k^2\Phi=4\pi Ga^2\delta\rho$`, R`$\Phi=-\Psi$`, R`$\Phi=0$`],
    answer: 1, why: R`含 $a'$ 的项全部消失，剩 $k^2\Phi=4\pi Ga^2\delta\rho$，即 Fourier 空间的 Poisson 方程。膨胀项只在波长可与哈勃半径相比时重要。`,
  },
  {
    q: R`辐射时期 $\Phi+\Psi$ 主要由谁决定？`,
    options: [R`暗物质密度`, R`重子速度`, R`光子四极矩 $\Theta_2$`, R`中微子四极矩 $\mathcal N_2$`],
    answer: 3, why: R`各向异性应力只来自相对论粒子的四极矩；光子与电子紧耦合，$\Theta_2$ 被抑制；无碰撞的中微子可以自由流动，形成可观的 $\mathcal N_2$。`,
  },
  {
    q: R`一个张量模在 $k\eta\ll1$ 时的行为是？`,
    options: [R`振荡并衰减`, R`保持常数`, R`指数增长`, R`按 $1/a$ 衰减但不振荡`],
    answer: 1, why: R`$k\to0$ 时 \eqref{6.73} 化为 $h''+2\frac{a'}ah'=0$，常数是解（另一个解衰减）。只有进入视界后 $k^2h$ 项才使它振荡。`,
  },
  {
    q: R`为什么张量扰动不出现在 $G^0{}_0$ 与 $(\hat k_i\hat k_j-\frac13\delta_{ij})G^i{}_j$ 中？`,
    options: [R`因为张量扰动太小`, R`因为线性阶上它们只能与 $\delta_{ij}$ 或 $k_i$ 缩并，而 $h^{\rm TT}_{ij}$ 无迹且横向，这些缩并都为零`, R`因为张量扰动是规范自由度`, R`因为我们选择了共形牛顿规范`],
    answer: 1, why: R`这是分解定理的具体体现（\eqref{6.76}）：3-标量组合 $\delta^{ij}h^{\rm TT}_{ij}$ 与 $\hat k^ih^{\rm TT}_{ij}$ 都恒为零。`,
  },
];

export const BRIDGE = R`把本章的两条 Einstein 方程 \eqref{6.41}、\eqref{6.48} 与第 5 章的 Boltzmann 方程放在一起，宇宙中所有成分与度规的线性扰动方程就闭合了：给定初值，原则上可以把每个 Fourier 模式一路积分到今天。缺的只是**初始条件**：$\Phi$、$\delta$、$\Theta_0$ 等在极早期取什么值？第 7 章将论证这些初值由暴胀产生——同一个机制也会产生本章的张量模 $h_+$、$h_\times$，它们在超视界时保持冻结，等待着在 CMB 大角度偏振中被发现。`;
