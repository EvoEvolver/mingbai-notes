// 第 3 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "两行方程，算出整张 CMB 功率谱";
export const HOOK = R`2013 年和 2018 年，Planck 卫星公布了宇宙微波背景的温度功率谱：两千多个多极矩上的起伏，误差小到千分之一。和它叠在一起的理论曲线不是拟合出来的"经验公式"，而是程序 CAMB 和 CLASS 从第一性原理算出来的。这类程序有一个专门的名字——"Einstein–Boltzmann 求解器"（Einstein–Boltzmann solver）。

名字已经说明了一切：整个现代宇宙学，几乎就是两个方程的应用。一个是 Einstein 方程，告诉我们时空如何被其中的物质和能量弯曲；另一个是 Boltzmann 方程，用统计力学追踪光子、中微子、暗物质、重子这些"粒子群"如何在弯曲的时空中流动、碰撞。莱顿一面墙上画着前者（图 3.1）；后者则写在每一段宇宙学代码的核心循环里。

本章就是这两个方程的"出厂说明书"：先把 Einstein 方程用在光滑宇宙上，推出决定 $a(t)$ 的 Friedmann 方程；再从一个弹簧上的小球出发建立 Boltzmann 方程，把它搬进膨胀宇宙、配上碰撞项；最后在时空中加入微小的起伏 $\Psi$、$\Phi$，看光子和物质怎样被引力推动、红移和偏折。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "3.1", title: "Einstein 方程 → Friedmann 方程", gist: R`$G_{\mu\nu}+\Lambda g_{\mu\nu}=8\pi GT_{\mu\nu}$；由 FLRW 的 Christoffel 符号算出 $R_{00}=-3\ddot a/a$、$R=6[\ddot a/a+H^2]$，00 分量给出 $H^2=8\pi G\rho/3$；$\Lambda$ 等效于 $w=-1$ 的成分。`, gives: ["3.1", "3.3", "3.9", "3.10", "3.12", "3.14"], next: R`引力侧决定了 $a(t)$；但 $\rho$ 来自哪里、物质和辐射怎样演化？转向统计侧。` },
  { sec: "3.2", title: "Boltzmann 方程：分布函数的运动方程", gist: R`分布函数 $f(\boldsymbol x,\boldsymbol p,t)$；粒子数守恒 ⇒ $df/dt=0$，加上相互作用 ⇒ $df/dt=C[f]$；$f$ 还决定 Einstein 方程右边的 $T^\mu{}_\nu$。`, gives: ["3.15", "3.17", "3.19", "3.20"], next: R`先在最简单的系统里看清这个方程的全部特征。` },
  { sec: "3.2.1", title: "玩具模型：谐振势中的粒子", gist: R`$\partial_tf+\frac pm\partial_xf-kx\,\partial_pf=0$：相空间刚性转动；任何只依赖能量的 $f(E)$ 都是平衡分布。`, gives: ["3.23", "3.24"], next: R`把牛顿运动方程换成测地线方程，搬进膨胀宇宙。` },
  { sec: "3.2.2", title: "膨胀宇宙中的 Boltzmann 方程", gist: R`$P^i=(p/a)\hat p^i$，$dx^i/dt=\frac pE\frac{\hat p^i}a$，$dp/dt=-Hp$ ⇒ $\partial_tf+\frac pE\frac{\hat p^i}a\partial_if-Hp\,\partial_pf=C[f]$；对动量积分得 $\dot n+3Hn=\int C$。`, gives: ["3.33", "3.37", "3.38", "3.43"], next: R`右边的碰撞项到底长什么样？` },
  { sec: "3.2.3", title: "碰撞项", gist: R`两体反应 $1+2\leftrightarrow3+4$：对其余三个粒子做洛伦兹不变相空间积分，$\delta_{\rm D}$ 函数保证能量动量守恒，$|\mathcal M|^2$ 管微观物理，$f_3f_4(1\pm f_1)(1\pm f_2)-f_1f_2(1\pm f_3)(1\pm f_4)$ 管"得失"。`, gives: ["3.44", "3.47", "3.48"], next: R`光滑宇宙已经齐备（足够算第 4 章的热历史）。下面加入扰动。` },
  { sec: "3.3.1", title: "扰动时空", gist: R`共形牛顿规范：$g_{00}=-1-2\Psi$，$g_{ij}=a^2\delta_{ij}(1+2\Phi)$；$|\Psi|,|\Phi|<10^{-4}$，只保留线性阶；算出一阶 Christoffel 符号。`, gives: ["3.49", "3.55", "3.56"], next: R`粒子在这个起伏的时空中怎么走？` },
  { sec: "3.3.2", title: "扰动时空中的测地线", gist: R`$dp/dt=-(H+\dot\Phi)p-\frac Ea\hat p^i\Psi_{,i}$（红移 + 局域膨胀 + 引力红移）；$d\hat p^i/dt\propto[\delta^{ik}-\hat p^i\hat p^k](\frac{p^2}{E^2}\Phi-\Psi)_{,k}$（偏折，光是牛顿的 2 倍）。`, gives: ["3.60", "3.62", "3.69", "3.71", "3.72"], next: R`把这些代回 \eqref{3.33}，就得到扰动宇宙中的 Boltzmann 方程。` },
  { sec: "3.3.3", title: "辐射的线性 Boltzmann 方程", gist: R`零阶 $f$ 与位置、方向无关 ⇒ 偏折项是二阶，可扔：$\partial_tf+\frac{\hat p^i}a\partial_if-[H+\dot\Phi+\frac1a\hat p^i\partial_i\Psi]p\,\partial_pf$。`, gives: ["3.73", "3.74"], next: R`对有质量粒子做同样的事。` },
  { sec: "3.3.4", title: "有质量粒子的线性 Boltzmann 方程", gist: R`多出速度因子：流动项 $\times p/E$，势梯度项 $\times E/p$；晚期非相对论物质的线性近似会失效（第 12 章）。`, gives: ["3.75", "3.76"], next: R`把全章压缩成一页。` },
  { sec: "3.4", title: "小结", gist: R`Einstein 方程 + Friedmann 方程；扰动度规与四动量；$dp^i/dt$；均匀与线性 Boltzmann 方程；两体碰撞项；扰动宇宙中的能动张量 \eqref{3.86}。`, gives: ["3.77", "3.81", "3.83", "3.86"] },
];

// ---------- 推导图（三张）----------
export const EQMAP_GRAV = [
  { from: "3.3", to: "3.6", label: R`取 00 分量 + FLRW 的 $\Gamma^\mu{}_{\alpha\beta}$` },
  { from: "3.3", to: "3.7", label: R`取 ij 分量` },
  { from: "3.6", to: "3.9", label: R`$R=-R_{00}+R_{ii}/a^2$` },
  { from: "3.7", to: "3.9", label: "" },
  { from: "3.1", to: "3.10", label: R`把 $\Lambda g_{\mu\nu}$ 移到右边` },
  { from: "3.2", to: "3.12", label: R`00 分量：$\ddot a$ 相消` },
  { from: "3.6", to: "3.12", label: "" },
  { from: "3.9", to: "3.12", label: "" },
  { from: "3.10", to: "3.12", label: R`$\rho$ 含 $\rho_\Lambda$` },
  { from: "3.12", to: "3.14", label: R`除以 $H_0^2$，加曲率` },
  { from: "3.12", to: "3.90", label: R`+ ij 分量 (3.89)` },
];
export const EQMAP_BOLTZ = [
  { from: "3.17", to: "3.19", label: "加碰撞项" },
  { from: "3.19", to: "3.23", label: R`谐振子：$\dot p=-kx$` },
  { from: "3.23", to: "3.24", label: R`$\partial_tf=0$` },
  { from: "3.19", to: "3.33", label: R`拆成 $p$、$\hat p^i$` },
  { from: "3.33", to: "3.38", label: R`$dx^i/dt$、$dp/dt$` },
  { from: "3.37", to: "3.38", label: R`$dp/dt=-Hp$` },
  { from: "3.38", to: "3.43", label: R`$\int d^3p$，分部积分` },
  { from: "3.46", to: "3.48", label: R`+ 量子因子 + 相空间测度` },
  { from: "3.48", to: "3.43", label: R`右边 $\int C[f]$` },
];
export const EQMAP_PERT = [
  { from: "3.49", to: "3.56", label: R`一阶 Christoffel` },
  { from: "3.49", to: "3.60", label: R`质壳条件` },
  { from: "3.60", to: "3.62", label: R`$P^i/P^0$` },
  { from: "3.56", to: "3.69", label: R`测地线方程` },
  { from: "3.60", to: "3.69", label: R`消去 $P^\mu$` },
  { from: "3.69", to: "3.71", label: R`投影到 $\hat p^i$` },
  { from: "3.69", to: "3.72", label: R`垂直分量` },
  { from: "3.62", to: "3.74", label: R`$m=0$，扔二阶项` },
  { from: "3.71", to: "3.74", label: "" },
  { from: "3.62", to: "3.76", label: R`$m\neq0$` },
  { from: "3.71", to: "3.76", label: "" },
  { from: "3.60", to: "3.86", label: R`代入 (3.20)` },
];
export const EQMAP_LABELS = {
  "3.1": "Einstein 方程", "3.2": "Einstein 张量", "3.3": "Ricci 张量", "3.6": R`$R_{00}=-3\ddot a/a$`, "3.7": R`$R_{ij}$`, "3.9": "Ricci 标量",
  "3.10": R`$\Lambda$ 的能动张量`, "3.12": "第一 Friedmann 方程", "3.14": "含曲率的 Friedmann", "3.90": "第二 Friedmann 方程",
  "3.17": R`$df/dt=0$`, "3.19": "Boltzmann 方程", "3.23": "谐振子", "3.24": "平衡分布", "3.33": "全导数四项", "3.37": R`$dp/dt=-Hp$`,
  "3.38": "膨胀宇宙 Boltzmann", "3.43": "数密度方程", "3.46": "碰撞项（示意）", "3.48": "两体碰撞项",
  "3.49": "扰动度规", "3.56": R`一阶 $\Gamma^i{}_{\mu\nu}$`, "3.60": "四动量", "3.62": "坐标速度", "3.69": R`$dp^i/dt$`, "3.71": "动量大小", "3.72": "方向偏折",
  "3.74": "辐射 Boltzmann", "3.76": "有质量粒子 Boltzmann", "3.86": "扰动能动张量",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "grav", label: "引力侧：Einstein 方程" },
  { id: "stat", label: "统计侧：Boltzmann 方程" },
  { id: "pert", label: "扰动宇宙" },
];

export const concepts = [
  {
    id: "einstein_eq", name_zh: "Einstein 方程", name_en: "Einstein equations", icon: "⚖️", section_id: "3.1", group: "grav",
    plain: "几何 = 内容：时空弯成什么样，由其中装了多少能量和动量决定。",
    explain: R`左边的 Einstein 张量 $G_{\mu\nu}=R_{\mu\nu}-\frac12g_{\mu\nu}R$ 只由度规及其导数构成；右边的能动张量 $T_{\mu\nu}$ 描述物质、辐射、暗能量。系数 $8\pi G$ 由弱场极限下回到牛顿引力的要求固定。

这是十个耦合的非线性偏微分方程，但在均匀宇宙中只剩一个独立方程（00 分量），给出 Friedmann 方程。在扰动宇宙中（第 6 章）它给出势 $\Psi$、$\Phi$ 与密度扰动的关系——牛顿泊松方程的推广。`,
    analogy: "像一张蹦床：放在上面的保龄球（能动张量）决定了蹦床面怎么凹（几何）；而滚过的弹珠（测地线）则按凹下去的形状走。Einstein 方程是“球 → 凹陷”这一半的精确规则。",
    book_example: { what: R`图 3.1 莱顿墙上的 $R_{\mu\nu}-\frac12Rg_{\mu\nu}+\Lambda g_{\mu\nu}=8\pi G\,T_{\mu\nu}/c^4$；式 (3.1)–(3.2)。`, point: "一行方程同时支配宇宙膨胀、结构增长、引力波与黑洞。" },
    misconception: R`$\Lambda$ 放在左边还是右边只是记账方式；但放在右边（作为 $\rho_\Lambda$）便于推广到动态暗能量。`,
  },
  {
    id: "ricci", name_zh: "Ricci 张量与曲率标量", name_en: "Ricci tensor & scalar", icon: "🌀", section_id: "3.1", group: "grav",
    plain: "用 Christoffel 符号的导数和乘积度量时空“弯了多少”。",
    explain: R`$R_{\mu\nu}=\Gamma^\alpha{}_{\mu\nu,\alpha}-\Gamma^\alpha{}_{\mu\alpha,\nu}+\Gamma^\alpha{}_{\beta\alpha}\Gamma^\beta{}_{\mu\nu}-\Gamma^\alpha{}_{\beta\nu}\Gamma^\beta{}_{\mu\alpha}$。因为 $\Gamma^\mu{}_{\alpha\beta}$ 是度规的一阶导数，$R_{\mu\nu}$ 含度规的二阶导数与一阶导数的平方。对 FLRW，只有 $\ddot a$ 与 $\dot a^2$ 两种结构。

标量 $R=g^{\mu\nu}R_{\mu\nu}$ 与坐标无关，所以只能依赖 $\ddot a/a$ 与 $H^2$（$a$ 的整体缩放不影响它）。欧氏 FLRW 中 $R=6(\ddot a/a+H^2)\neq0$：空间平直，时空却是弯的。`,
    analogy: R`在地球表面沿一个小圈搬运一支始终“不转动”的箭头，回到起点时箭头会转过一个角度——曲率就是这个“回不到原样”的程度。平面上（哪怕用极坐标）箭头不会转，所以 $R=0$。`,
    book_example: { what: R`式 (3.6)–(3.9) 与习题 3.1/3.2：极坐标平面 $R=0$，半径 $r$ 的球面 $R=2/r^2$。`, point: "曲率标量能区分“真弯”与“坐标看起来弯”。" },
    misconception: R`$R=0$ 不等于时空平直：Schwarzschild 黑洞外部处处 $R=0$，但时空显然弯曲（曲率藏在 Riemann 张量的其他部分）。`,
  },
  {
    id: "friedmann", name_zh: "Friedmann 方程", name_en: "Friedmann equation", icon: "🎈", section_id: "3.1", group: "grav",
    plain: R`膨胀率的平方正比于总能量密度：$H^2=8\pi G\rho/3$。`,
    explain: R`Einstein 方程 00 分量中 $\ddot a$ 项恰好相消，留下 $3H^2=8\pi G\rho$。除以 $H_0^2$ 并用临界密度归一，得到 $H^2/H_0^2=\sum_s\Omega_sa^{-3(1+w_s)}+\Omega_{\rm K}a^{-2}$。

只要知道今天各成分的 $\Omega_s$ 与 $w_s$，就能积分 $dt=da/(aH)$ 得到 $a(t)$、宇宙年龄与整个膨胀史。它是第 1 章式 (1.3) 的严格推导；曲率项可由开放宇宙度规推出（习题 3.5）。`,
    analogy: R`像一个预算表：$H^2$ 是总支出，每种成分是一栏，各栏随 $a$ 按自己的规律变化（辐射 $a^{-4}$、物质 $a^{-3}$、曲率 $a^{-2}$、$\Lambda$ 常数）。哪一栏最大，宇宙就处于那个“时代”。`,
    book_example: { what: R`式 (3.11)–(3.14)；交互图中 $\Lambda$CDM 年龄 13.47 Gyr，EdS 9.31 Gyr。`, point: "膨胀史完全由成分清单决定。" },
    misconception: R`Friedmann 方程只给出 $\dot a^2$，不决定 $\dot a$ 是否在增大；加速与否要看第二 Friedmann 方程中的 $\rho+3\mathcal P$。`,
  },
  {
    id: "lambda_fluid", name_zh: R`宇宙学常数 = $w=-1$ 的成分`, name_en: "Cosmological constant as a fluid", icon: "🌌", section_id: "3.1", group: "grav",
    plain: R`把 $\Lambda$ 移到右边，它就像一种能量密度恒定、压强为负的“流体”。`,
    explain: R`$T_{(\Lambda)}{}^\mu{}_\nu=-(\Lambda/8\pi G)\delta^\mu_\nu=\mathrm{diag}(-\rho_\Lambda,-\rho_\Lambda,-\rho_\Lambda,-\rho_\Lambda)$。与理想流体 $\mathrm{diag}(-\rho,\mathcal P,\mathcal P,\mathcal P)$ 对比：$\mathcal P_\Lambda=-\rho_\Lambda$，$w=-1$。

这与连续性方程一致：只有 $w=-1$ 时 $\rho\propto a^{-3(1+w)}$ 才是常数。把 $\Lambda$ 写在右边，所有公式都能直接推广到随时间变化的暗能量 $\rho_{\rm DE}(t)$。`,
    analogy: "像墙纸的底色：无论房间（宇宙）怎么扩大，每平方米的颜色浓度都不变——它不会像家具（物质）那样被“摊薄”。",
    book_example: { what: R`式 (3.10)：$\rho_\Lambda\equiv\Lambda/8\pi G$，$\mathcal P_\Lambda=-\rho_\Lambda$。`, point: R`$w=-1$ 不是假设，而是 $\Lambda g_{\mu\nu}$ 的张量结构的必然结果。` },
    misconception: R`负压不是“向内吸”：在 Friedmann 方程里它让 $\rho+3\mathcal P<0$，从而使膨胀加速。`,
  },
  {
    id: "acceleration", name_zh: "第二 Friedmann 方程与加速", name_en: "Acceleration equation", icon: "🚀", section_id: "3.1", group: "grav",
    plain: R`$\ddot a/a=-(4\pi G/3)(\rho+3\mathcal P)$：只有足够负的压强才能让宇宙加速。`,
    explain: R`Einstein 方程的空–空分量给出 $\ddot a/a+\frac12H^2=-4\pi G\mathcal P$，与第一 Friedmann 方程联立得 $\ddot a/a=-(4\pi G/3)(\rho+3\mathcal P)$。压强也“产生引力”，而且权重是 3 倍。

单一成分时加速条件为 $w<-1/3$；多成分时要求密度加权平均 $w$ 小于 $-1/3$。普通物质、辐射、曲率都做不到——这就是加速膨胀需要“暗能量”的原因。平直 $\Lambda$CDM 中加速始于 $a\approx0.6$（$z\approx0.67$）。`,
    analogy: "向上抛的球会减速（引力）；要让它越飞越快，必须有一种“反引力”的东西——在广义相对论里，负压正好扮演这个角色。",
    book_example: { what: R`习题 3.4、3.6：式 (3.89)–(3.90) 与 $w<-1/3$ 的条件。`, point: "加速不是 Friedmann 方程 00 分量能单独告诉你的。" },
    misconception: R`“暗能量占主导”与“开始加速”不是同一时刻：加速始于 $\rho_{\rm m}=2\rho_\Lambda$，早于 $\rho_{\rm m}=\rho_\Lambda$。`,
  },
  {
    id: "phase_space", name_zh: "分布函数与相空间守恒", name_en: "Distribution function & Liouville", icon: "🎲", section_id: "3.2", group: "stat",
    plain: R`跟着一小团粒子在相空间里走，它的“密度” $f$ 不变。`,
    explain: R`$f(\boldsymbol x,\boldsymbol p,t)$ 是相空间单元 $d^3x\,d^3p/(2\pi)^3$ 中的平均粒子数。无相互作用时粒子数守恒，等价于 $f$ 的全导数为零：$df/dt=\partial f/\partial t+\dot{\boldsymbol x}\cdot\nabla_xf+\dot{\boldsymbol p}\cdot\nabla_pf=0$（Liouville 定理）。

难点不在方程本身，而在粒子沿复杂轨迹运动：$\dot{\boldsymbol x}$ 与 $\dot{\boldsymbol p}$ 来自运动方程（牛顿方程 → 测地线方程）。由 $f$ 可以积分出一切宏观量：$n$、$\rho$、$\mathcal P$，乃至能动张量 $T^\mu{}_\nu$（式 3.20）。`,
    analogy: "像一群在舞池里跳舞的人：每个人都在移动，但舞池中任一“人群块”的人数密度跟着这块人群走是不变的——人群可以变形、拉长，但不会被压缩。",
    book_example: { what: "图 3.2：谐振势中的云团在相空间中转动，所占体积不变。", point: "宏观的热力学量全部来自 f 的动量积分。" },
    misconception: R`$df/dt=0$ 不是说 $f$ 在固定点不变（那是 $\partial f/\partial t=0$，即平衡）；它说的是沿粒子轨迹不变。`,
  },
  {
    id: "boltzmann", name_zh: "Boltzmann 方程", name_en: "Boltzmann equation", icon: "🌊", section_id: "3.2.2", group: "stat",
    plain: R`$df/dt=C[f]$：左边是自由流动与引力，右边是碰撞。`,
    explain: R`在膨胀宇宙中，用 $p$、$\hat p$ 代替 $P^\mu$，并由测地线方程得到 $dx^i/dt=(p/E)\hat p^i/a$、$dp/dt=-Hp$，得 $\partial f/\partial t+(p/E)(\hat p^i/a)\,\partial f/\partial x^i-Hp\,\partial f/\partial p=C[f]$。第二项是流动，第三项是红移。

两个常用极限：相对论（$E\approx p$，光子、早期中微子）与非相对论（$E\approx m$，流动项被速度 $p/m$ 压低）。无碰撞的均匀解是任意 $f(pa)$：分布形状不变，只是整体红移。`,
    analogy: "像河流里的染料：染料随水流漂移（流动项），河道整体在被拉宽导致染料变稀、变“红”（膨胀项），而河里的化学反应会把一种颜色变成另一种（碰撞项）。",
    book_example: { what: R`式 (3.33)–(3.40)：第三次推出 $p\propto1/a$。`, point: R`同一个方程管光子、中微子、暗物质、重子——差别只在 $p/E$ 与碰撞项。` },
    misconception: R`保留 $\partial f/\partial x^i$ 项并不矛盾于“均匀”：它在均匀宇宙中为零，但扰动时必须用到。`,
  },
  {
    id: "equilibrium", name_zh: "平衡分布", name_en: "Equilibrium distribution", icon: "⚪", section_id: "3.2.1", group: "stat",
    plain: R`只依赖能量的分布 $f(E)$ 是静态的：粒子在动，分布不变。`,
    explain: R`静态（$\partial f/\partial t=0$）的分布叫平衡分布。在谐振势中，粒子沿等能线运动，所以任何 $f(E)$ 都满足 $(p/m)\partial_xf-kx\,\partial_pf=f'(E)[(p/m)kx-kx(p/m)]=0$。

无碰撞时选哪个 $f(E)$ 取决于初始条件；有碰撞时还需 $C[f_{\rm EQ}]=0$，这会把 $f$ 推向玻色–爱因斯坦或费米–狄拉克分布（细致平衡）。`,
    analogy: "像旋转木马：每匹木马都在转，但从远处拍一张照片，和一分钟后再拍的一张看起来完全一样。",
    book_example: { what: "式 (3.24)–(3.25)；交互图中“沿等能线铺开的环”不随时间变化。", point: "“静态”不等于“粒子静止”。" },
    misconception: R`平衡分布不唯一：无碰撞系统可以停留在任何 $f(E)$ 上，不一定是热分布。`,
  },
  {
    id: "number_density", name_zh: "数密度方程", name_en: "Number density equation", icon: "🔢", section_id: "3.2.2", group: "stat",
    plain: R`$\dot n+3Hn=\int C[f]$：没有碰撞时 $n\propto a^{-3}$，碰撞才能改变共动粒子数。`,
    explain: R`把 Boltzmann 方程对所有动量积分，红移项分部积分后变成 $-3Hn$。左边等于 $a^{-3}d(na^3)/dt$，所以无碰撞时共动体积内的粒子数守恒。

右边的动量积分只有在碰撞产生或消灭粒子时不为零（散射只搬动粒子、不改变数目）。第 4 章的暗物质冻结、核合成、复合都从这个方程出发。`,
    analogy: "像一个不断扩建的城市：没有出生和死亡时，人口密度按面积扩大而稀释；只有出生/死亡（碰撞项）能改变总人口。",
    book_example: { what: "式 (3.41)–(3.43)。", point: "宏观的粒子数守恒是 Boltzmann 方程的零阶矩。" },
    misconception: R`弹性散射虽然改变 $f$ 的形状，却不改变 $n$——它的 $\int C[f]$ 为零。`,
  },
  {
    id: "collision", name_zh: "碰撞项", name_en: "Collision term", icon: "💥", section_id: "3.2.3", group: "stat",
    plain: "“被逆反应送进来的 − 被正反应带走的”，对所有守恒的动量组合求和。",
    explain: R`对 $1+2\leftrightarrow3+4$：$C[f_1]=\frac1{2E_1}\int$（三个洛伦兹不变相空间测度）$|\mathcal M|^2(2\pi)^4\delta_{\rm D}^{(3)}\delta_{\rm D}^{(1)}\times\{f_3f_4(1\pm f_1)(1\pm f_2)-f_1f_2(1\pm f_3)(1\pm f_4)\}$。

$\delta_{\rm D}$ 函数保证能量动量守恒；$|\mathcal M|^2$ 包含全部微观物理；$(1\pm f)$ 是玻色增强（+）或泡利阻塞（−）。当各粒子取化学势满足 $\mu_1+\mu_2=\mu_3+\mu_4$ 的 BE/FD 分布时花括号为零——细致平衡。`,
    analogy: "像一个交易市场：每一种“交换”都可以双向进行，市场的净变化 = 买入 − 卖出；当价格（温度、化学势）合适时，买卖在每一对商品上都精确平衡。",
    book_example: { what: R`式 (3.44)–(3.48)，图 3.3 的相空间格子示意；Compton 散射与 $e^+e^-$ 湮灭都是这种形式。`, point: "所有微观过程用同一个模板拼装。" },
    misconception: R`$1/2E$ 不是任意的归一化：它来自对四维动量积分时在壳 $\delta_{\rm D}$ 函数 $\delta_{\rm D}(E^2-p^2-m^2)$ 的雅可比因子。`,
  },
  {
    id: "perturbed_metric", name_zh: "扰动度规与规范", name_en: "Perturbed metric & gauge", icon: "〰️", section_id: "3.3.1", group: "pert",
    plain: R`在 FLRW 上加两个小势：$\Psi$ 扰动时间，$\Phi$ 扰动空间，都小于 $10^{-4}$。`,
    explain: R`共形牛顿规范：$g_{00}=-1-2\Psi$，$g_{0i}=0$，$g_{ij}=a^2\delta_{ij}(1+2\Phi)$。$\Psi$ 是牛顿势，管慢速物体；$\Phi$ 是空间曲率扰动，也可看作局域标度因子 $a\sqrt{1+2\Phi}$，其三维曲率为 $4\sym{ch03-kwave}{k}^2\Phi/a^2$。

因为 $|\Psi|,|\Phi|<10^{-4}$，线性阶极其精确。这只包含标量扰动（张量扰动 = 引力波另需函数）；而且这是一种规范选择——不同规范描述同一物理。`,
    analogy: R`像一张有轻微起伏的橡皮膜：$a(t)$ 是整张膜的均匀拉伸，$\Phi$ 是局部额外鼓起或凹下，$\Psi$ 则相当于不同地方的钟走得快慢不一。`,
    book_example: { what: R`式 (3.49)–(3.56)：一阶 Christoffel 符号 $\Gamma^0{}_{00}=\dot\Psi$，$\Gamma^0{}_{0i}=\Psi_{,i}$，$\Gamma^i{}_{00}=\Psi_{,i}/a^2$ …`, point: "两个标量函数就足以描述结构形成所需的全部引力。" },
    misconception: R`$\Psi$、$\Phi$ 的数值依赖规范；只有规范不变的组合或可观测量才有物理意义（第 6 章）。`,
  },
  {
    id: "geodesic_pert", name_zh: "扰动时空中的红移与偏折", name_en: "Geodesics in perturbed spacetime", icon: "🔭", section_id: "3.3.2", group: "pert",
    plain: R`$dp/dt=-(H+\dot\Phi)p-(E/a)\hat{\boldsymbol p}\cdot\nabla\Psi$；方向变化 $\propto$ 横向的 $(v^2\Phi-\Psi)$ 梯度。`,
    explain: R`动量大小：第一项是局域膨胀（$H+\dot\Phi$）造成的红移；第二项是掉进势阱获能、爬出失能（引力红移，Pound–Rebka）。若光子穿越期间势在变化，进出不抵消，留下净效应（积分 Sachs–Wolfe）。

动量方向：$d\hat p^i/dt=(E/ap)[\delta^{ik}-\hat p^i\hat p^k](v^2\Phi-\Psi)_{,k}$。慢粒子只感受 $\Psi$，并因 $E/p$ 大而强烈偏折（被束缚）；光子 $\Phi$、$\Psi$ 同等贡献，$\Phi=-\Psi$ 时偏折是牛顿的 2 倍（1919 日食，$1.75''$）。`,
    analogy: "光子像一辆过山车：冲下坡（势阱）时加速、爬坡时减速，若坡在它经过时被削平，它就会带着多出来的速度离开。",
    book_example: { what: "式 (3.69)–(3.72)，图 3.4：星系团同时偏折光线、束缚星系。", point: "一个式子同时包含牛顿动力学、引力红移、ISW 与引力透镜。" },
    misconception: R`引力透镜中光的偏折并不“只是牛顿的”：空间曲率 $\Phi$ 贡献了另一半。`,
  },
  {
    id: "linear_boltzmann", name_zh: "线性 Boltzmann 方程", name_en: "Linearized Boltzmann equation", icon: "📡", section_id: "3.3.3", group: "pert",
    plain: R`零阶 $f$ 均匀各向同性 ⇒ 只需保留 $\partial f/\partial p$ 前的一阶系数。`,
    explain: R`假设分布对平衡的偏离与 $\Psi$、$\Phi$ 同阶。$\partial f/\partial x^i$ 与 $\partial f/\partial\hat p^i$ 只含一阶的 $\delta f$，所以它们的系数只取零阶；$\partial f/\partial p$ 含零阶部分，其系数 $[H+\dot\Phi+(E/ap)\hat p^i\Psi_{,i}]$ 必须保留到一阶。

辐射：$df/dt=\partial_tf+(\hat p^i/a)\partial_if-[H+\dot\Phi+\hat p^i\partial_i\Psi/a]p\,\partial_pf$，直接导向 CMB 各向异性方程；有质量粒子多出 $p/E$ 与 $E/p$ 因子。晚期物质的线性近似失效，需第 12 章的非线性处理。`,
    analogy: "像在平静湖面上研究小涟漪：只需关心涟漪本身与平静湖面的相互作用，涟漪与涟漪之间的相互作用小到可以忽略。",
    book_example: { what: "式 (3.73)–(3.76)。", point: "CMB 与大尺度结构的线性理论都从这两个方程出发。" },
    misconception: "扔掉偏折项不是说光子不偏折，而是它对分布函数的影响在线性阶为零（透镜效应是二阶的，另行处理）。",
  },
];

export const relations = [
  { from: "ricci", to: "einstein_eq", label: "构成左边" },
  { from: "einstein_eq", to: "friedmann", label: "00 分量" },
  { from: "lambda_fluid", to: "friedmann", label: R`$\rho$ 含 $\rho_\Lambda$` },
  { from: "einstein_eq", to: "acceleration", label: "ij 分量" },
  { from: "lambda_fluid", to: "acceleration", label: R`$w=-1<-1/3$` },
  { from: "phase_space", to: "boltzmann", label: "加碰撞+膨胀" },
  { from: "boltzmann", to: "equilibrium", label: R`$\partial f/\partial t=0$` },
  { from: "collision", to: "equilibrium", label: R`$C[f_{\rm EQ}]=0$` },
  { from: "boltzmann", to: "number_density", label: "对 p 积分" },
  { from: "collision", to: "number_density", label: R`改变 $na^3$` },
  { from: "phase_space", to: "einstein_eq", label: R`$f\to T^\mu{}_\nu$` },
  { from: "perturbed_metric", to: "geodesic_pert", label: R`一阶 $\Gamma^\mu{}_{\alpha\beta}$` },
  { from: "geodesic_pert", to: "linear_boltzmann", label: "代入 df/dt" },
  { from: "boltzmann", to: "linear_boltzmann", label: "推广" },
  { from: "friedmann", to: "geodesic_pert", label: "H 项" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**Einstein 方程** $G_{\mu\nu}=8\pi GT_{\mu\nu}$（$\Lambda$ 放右边即 $\rho_\Lambda=\Lambda/8\pi G$、$w=-1$）；对欧氏 FLRW，$R_{00}=-3\ddot a/a$，$R_{ij}=\delta_{ij}(2\dot a^2+a\ddot a)$，$R=6(\ddot a/a+H^2)$。`}</TxI>,
  <TxI>{R`**Friedmann 方程** $H^2/H_0^2=\sum_s\Omega_sa^{-3(1+w_s)}+\Omega_{\rm K}a^{-2}$ 决定整个膨胀史；加速要求 $\rho+3\mathcal P<0$，即平均 $w<-1/3$。`}</TxI>,
  <TxI>{R`**Boltzmann 方程** $df/dt=C[f]$：均匀宇宙中 $\partial_tf+\frac pE\frac{\hat p^i}a\partial_if-Hp\,\partial_pf=C[f]$；积分得 $\dot n+3Hn=\int C$；无碰撞解 $f(pa)$ 保持形状。`}</TxI>,
  <TxI>{R`**碰撞项**：$\frac1{2E_1}\int\prod\frac{d^3p_i}{(2\pi)^32E_i}|\mathcal M|^2(2\pi)^4\delta^4\{f_3f_4(1\pm f_1)(1\pm f_2)-f_1f_2(1\pm f_3)(1\pm f_4)\}$；细致平衡给出 BE/FD 分布。`}</TxI>,
  <TxI>{R`**扰动宇宙**：$g_{00}=-1-2\Psi$，$g_{ij}=a^2\delta_{ij}(1+2\Phi)$；$dp/dt=-(H+\dot\Phi)p-\frac Ea\hat p^i\Psi_{,i}$；光偏折是牛顿的 2 倍；线性 Boltzmann 方程 \eqref{3.74}、\eqref{3.76} 是 CMB 与结构形成的起点。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`在欧氏 FLRW 中推导第一 Friedmann 方程时，为什么最后的方程里没有 $\ddot a$？`,
    options: [R`因为假设了 $\ddot a=0$`, R`因为 $R_{00}=-3\ddot a/a$ 与 $-\frac12g_{00}R$ 中的 $\ddot a$ 项恰好相消`, R`因为宇宙学常数抵消了 $\ddot a$`, "因为只取了空间分量"],
    answer: 1, why: R`$R_{00}-\frac12g_{00}R=-3\ddot a/a+3(\ddot a/a+H^2)=3H^2$：Einstein 张量的 00 分量不含二阶时间导数——它是一个“约束方程”，不是演化方程。`,
  },
  {
    q: R`宇宙只含一种 $w=-1/2$ 的成分（且 $\rho>0$）。宇宙在加速还是减速？`,
    options: [R`加速，因为 $\rho+3\mathcal P=-\rho/2<0$`, R`减速，因为 $w<0$ 的成分也产生吸引`, "匀速膨胀", R`无法判断，需要知道 $H$`],
    answer: 0, why: R`第二 Friedmann 方程 $\ddot a/a=-(4\pi G/3)(1+3w)\rho$；$w=-1/2$ 时 $1+3w=-1/2<0$，$\ddot a>0$。临界值是 $w=-1/3$。`,
  },
  {
    q: "一维谐振势中，无碰撞粒子的哪种分布是平衡（静态）的？",
    options: ["只有 Maxwell–Boltzmann 分布", R`只有所有粒子静止在 $x=0$ 的分布`, "不存在平衡分布，因为粒子一直在运动", R`任何只依赖能量 $E=p^2/2m+kx^2/2$ 的分布`],
    answer: 3, why: R`任何 $f(E)$ 满足 $(p/m)\partial_xf-kx\,\partial_pf=f'(E)\cdot0=0$。选哪一个由初始条件决定；只有加上碰撞，$C[f]=0$ 才会挑出热分布。`,
  },
  {
    q: "均匀宇宙、无碰撞时，把 Boltzmann 方程对动量积分得到什么？",
    options: [R`$n$ 为常数`, R`$n\propto a^{-4}$`, R`$\dot n+3Hn=0$，即 $n\propto a^{-3}$`, R`$\dot n=-Hn$`],
    answer: 2, why: R`红移项 $-Hp\,\partial_pf$ 分部积分得 $+3Hn$，所以 $d(na^3)/dt=\int C[f]=0$。注意数密度对辐射和物质都按 $a^{-3}$ 稀释；能量密度才有 $a^{-4}$ 与 $a^{-3}$ 之分。`,
  },
  {
    q: R`光子穿越一个在其通过期间逐渐变浅的引力势阱（$\Phi=-\Psi$）。离开后它的能量相比进入前：`,
    options: ["不变，进出抵消", R`增加，因为出来时要爬的坡比进去时下的坡浅，且 $\dot\Phi$ 项同号贡献`, "减少，因为势阱让光子红移", "取决于光子的初始能量"],
    answer: 1, why: R`由 (3.71)，$\Delta\ln p=-\Delta\Psi+2\int\dot\Psi\,dt$；变浅意味着 $\dot\Psi>0$，净效应为正（积分 Sachs–Wolfe 效应），且线性理论中 $\delta p/p$ 与 $p$ 无关。`,
  },
  {
    q: "为什么经过星系团的光线偏折远小于团内星系的“偏折”（被束缚）？",
    options: [R`偏折率含因子 $E/p\approx1/v$，慢粒子在弯曲时空中停留更久`, "光子没有质量，所以不受引力", R`光子只感受 $\Phi$，星系只感受 $\Psi$`, "星系团对光是透明的"],
    answer: 0, why: R`(3.72) 前的 $E/(ap)$ 对非相对论粒子很大；物理上，慢粒子有更多时间被弯曲。光子虽然每单位时间偏折更小，但 $\Phi$ 与 $\Psi$ 同时贡献，使它是同速度牛顿预言的 2 倍。`,
  },
];

export const BRIDGE = R`本章给出了两件工具：Friedmann 方程决定了宇宙怎样膨胀；带碰撞项的 Boltzmann 方程决定了各种粒子的分布怎样随之演化。第 4 章立刻把它们用在光滑宇宙的热历史上：利用数密度方程 $\dot n+3Hn=\int C[f]$ 和本章的碰撞项，我们将看到暗物质如何在反应率跟不上膨胀时"冻结"成今天的丰度，轻元素如何在大爆炸后几分钟内合成，以及电子与质子如何在 $z\approx1100$ 复合成中性氢，让宇宙变得透明。至于 §3.3 的扰动方程，则要等到第 5、6 章再接上 Compton 碰撞项和扰动的 Einstein 方程。`;
