// 第 5 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。纯数据（TAKEAWAYS 为 TxI 元素）。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "地图、平行停车与陀螺仪";
export const HOOK = R`**地图。**手机地图把弯曲的地球摊平在屏幕上。任何一张平面地图都在某处失效：墨卡托投影在两极发散，从北极出发的球极投影把北极送到无穷远。于是导航软件实际上使用一叠相互重叠的"局部地图"，并在重叠处光滑地换算坐标。这一叠地图就是本章的**图册**，换算公式就是**转移函数**——流形的全部定义不过如此。

**平行停车。**汽车不能横着走：它只有两种"运动"——沿车身方向前后开（向量场 $X$），以及打方向盘转向（向量场 $Y$）。可是司机交替地"前进—打轮—后退—回轮"，车就横向挪进了车位。两种运动交替进行时多出来的那一点横向位移，正是本章的**李括号** $[X,Y]$：沿 $X$ 走 $\varepsilon$、沿 $Y$ 走 $\delta$，再反过来走，回不到原点，缺口约为 $\varepsilon\delta[X,Y]$。

**陀螺仪与旋量。**无人机的姿态是三维转动群 $\mathrm{SO}(3)$ 中的一点——一个三维的弯曲流形，而且自带乘法：这就是**李群**。飞控程序常用四元数（即 $\mathrm{SU}(2)$）而不是转动矩阵，因为 $\mathrm{SU}(2)$ 是 $\mathrm{SO}(3)$ 的二重覆盖；转 $360^\circ$ 时四元数变号——同样的现象在本章末尾以 $\mathrm{SL}(2,\C)\to$ Lorentz 群的形式出现，那是电子自旋的几何来源。

本章把这些直觉做成精确的工具：流形与坐标卡、切向量与一形式、推前与拉回、流与李导数、微分形式与外微分、积分、李群与李代数、群作用。它们是后面黎曼几何、纤维丛、规范场论的共同语言。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "5.1", title: "流形：局部像 $\\R^m$ 的空间", gist: R`单一坐标在 $S^2$ 上处处好用是不可能的；用相互重叠的卡覆盖流形，要求转移函数 $\psi_{ij}=\varphi_i\circ\varphi_j^{-1}$ 是 $C^\infty$ 的。例：$S^1$、$S^n$、$\RP^n$、$G_{k,n}(\R)$、$T^n$。`, gives: ["5.3", "5.9", "5.11", "5.14"], next: R`有了坐标，就能在流形上做微积分。` },
  { sec: "5.2", title: "流形上的微积分", gist: R`切向量 = 沿曲线的方向导数 $X=X^\mu\partial_\mu$；一形式 $\dd x^\mu$ 是对偶基；张量是多重线性映射；映射诱导推前 $f_*$（向量向前）与拉回 $f^*$（形式向后），分量都是 Jacobi 矩阵。`, gives: ["5.20", "5.23", "5.25", "5.28", "5.33", "5.36"], next: R`向量场是"无穷小运动"；把它积分起来会怎样？` },
  { sec: "5.3", title: "流与李导数", gist: R`积分曲线 $\dd x^\mu/\dd t=X^\mu$ 给出流 $\sigma_t=\exp(tX)$；用流把邻点的向量搬回来求差商，得到李导数 $\mathcal{L}_XY=[X,Y]$——两个流不可交换的程度。`, gives: ["5.41", "5.47", "5.49b", "5.53", "5.55"], next: R`在全反对称的张量上，还有一种不需要任何结构的导数。` },
  { sec: "5.4", title: "微分形式与外微分", gist: R`$r$ 形式 = 全反对称 $(0,r)$ 张量，楔积 $\wedge$；外微分 $\dd$ 统一 grad/rot/div，$\dd^2=0$；内积 $\mathrm{i}_X$ 与 Cartan 公式 $\mathcal{L}_X=\dd\mathrm{i}_X+\mathrm{i}_X\dd$；Maxwell 方程与 Hamilton 力学的形式写法。`, gives: ["5.62", "5.68", "5.70", "5.72", "5.75", "5.82", "5.95"], next: R`微分形式是天然的被积对象——但需要定向。` },
  { sec: "5.5", title: "微分形式的积分", gist: R`定向 = 所有转移函数的 Jacobi 行列式为正；$m$ 形式换坐标时乘 Jacobi 行列式；一张卡里的积分是普通多重积分，单位分解把它们拼成整体积分。`, gives: ["5.99", "5.100", "5.102"], next: R`若流形本身还是一个群呢？` },
  { sec: "5.6", title: "李群与李代数", gist: R`群运算光滑的流形；左不变向量场 $\leftrightarrow T_eG$，在李括号下封闭成李代数；矩阵群里 $L_{g*}V=gV$、括号 = 对易子；单参数子群与 $\exp$；结构常数与 Maurer–Cartan 方程。`, gives: ["5.111", "5.116", "5.128", "5.129", "5.136", "5.139"], next: R`李群在物理中总是"作用在某个东西上"。` },
  { sec: "5.7", title: "李群在流形上的作用", gist: R`作用 $\sigma:G\times M\to M$；$\mathrm{SL}(2,\C)$ 二对一地给出 Lorentz 群；轨道与迷向群；齐性空间 $S^n=\mathrm{SO}(n+1)/\mathrm{SO}(n)$、$G_{k,n}=\mathrm{O}(n)/[\mathrm{O}(k)\times\mathrm{O}(n-k)]$；诱导向量场与伴随表示。`, gives: ["5.141b", "5.145", "5.147", "5.150", "5.157", "5.160", "5.163"] },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "5.16", to: "5.21", label: "曲线 + 函数" },
  { from: "5.21", to: "5.23", label: "向量不随坐标变" },
  { from: "5.21", to: "5.25", label: R`取 $f=x^\nu$` },
  { from: "5.25", to: "5.28", label: "配对不变" },
  { from: "5.21", to: "5.33", label: R`$g\circ f$ 求导` },
  { from: "5.33", to: "5.37", label: "配对 (5.36)" },
  { from: "5.39", to: "5.41", label: "ODE 唯一性" },
  { from: "5.41", to: "5.47", label: "用流搬运" },
  { from: "5.33", to: "5.47", label: R`$(\sigma_{-\varepsilon})_*$` },
  { from: "5.47", to: "5.49b", label: "坐标展开" },
  { from: "5.49b", to: "5.53", label: "四边形缺口" },
  { from: "5.62", to: "5.68", label: "对系数求导" },
  { from: "5.68", to: "5.72", label: "混合偏导对称" },
  { from: "5.68", to: "5.75", label: "链式法则" },
  { from: "5.68", to: "5.70", label: "消去坐标" },
  { from: "5.47", to: "5.82", label: "形式的李导数" },
  { from: "5.72", to: "5.82", label: R`$+\mathrm{i}_X$` },
  { from: "5.62", to: "5.99", label: "楔积 = 行列式" },
  { from: "5.99", to: "5.102", label: "单位分解" },
  { from: "5.33", to: "5.111", label: "左平移推前" },
  { from: "5.111", to: "5.116", label: "矩阵群" },
  { from: "5.41", to: "5.128", label: "左不变场的流" },
  { from: "5.111", to: "5.128", label: "唯一性" },
  { from: "5.70", to: "5.136", label: "代入左不变标架" },
  { from: "5.116", to: "5.136", label: "结构常数" },
  { from: "5.128", to: "5.160", label: R`$\exp(tV)$ 作用` },
  { from: "5.145", to: "5.147", label: "保持间隔" },
  { from: "5.149", to: "5.157", label: R`$G/H(p)$` },
];
export const EQMAP_LABELS = {
  "5.16": "映射的坐标表示", "5.21": R`切向量 $X[f]$`, "5.23": "向量分量变换律", "5.25": "对偶基", "5.28": "一形式分量变换律",
  "5.33": R`推前 $f_*$`, "5.37": R`拉回 $f^*$`, "5.39": "积分曲线", "5.41": "流的群性质", "5.47": "李导数定义",
  "5.49b": R`$\mathcal{L}_XY=[X,Y]$`, "5.53": "流可交换判据", "5.62": "楔积", "5.68": "外微分", "5.70": "无坐标公式",
  "5.72": R`$\dd^2=0$`, "5.75": R`$\dd$ 与拉回交换`, "5.82": "Cartan 公式", "5.99": R`$m$ 形式 $\times$ Jacobi`, "5.102": "整体积分",
  "5.111": "左不变场", "5.116": "括号 = 对易子", "5.128": R`$\exp(tV)$`, "5.136": "Maurer–Cartan", "5.145": R`$\mathrm{SL}(2,\C)$ 作用`,
  "5.147": "二对一覆盖", "5.149": "迷向群", "5.157": "Grassmann 齐性空间", "5.160": "诱导向量场",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "base", label: "流形与坐标" },
  { id: "calc", label: "流形上的微积分" },
  { id: "forms", label: "形式与积分" },
  { id: "group", label: "李群" },
];

export const concepts = [
  {
    id: "manifold", name_zh: "微分流形与坐标卡", name_en: "Differentiable manifold", icon: "🗺️", section_id: "5.1", group: "base",
    plain: R`局部像 $\R^m$、可以用多张光滑衔接的"地图"覆盖的空间。`,
    explain: R`拓扑空间 $M$ 被开集 $U_i$ 覆盖，每个 $U_i$ 上有同胚 $\varphi_i:U_i\to\R^m$ 给出坐标；重叠处的转移函数 $\psi_{ij}=\varphi_i\circ\varphi_j^{-1}$ 必须 $C^\infty$。

整体结构（球面、环面、射影空间）藏在"卡怎样粘起来"之中；局部的微积分则照搬 $\R^m$。相容图册的等价类称为微分结构。`,
    analogy: "地图册：每一页只画地球的一部分，相邻页有重叠区，重叠区里两页的经纬网格可以光滑换算。没有哪一页能画下整个地球而不撕裂。",
    book_example: { what: R`例 5.3：$S^n$ 用 $2(n+1)$ 个半球作卡；习题 5.1：$S^2$ 的两张球极投影卡，转移函数 $U+\mathrm{i}V=1/(X+\mathrm{i}Y)$。`, point: "两张卡就够覆盖球面，一张不够。" },
    misconception: R`流形不必嵌入在某个 $\R^N$ 中才有意义；坐标也不是流形的一部分——点独立于坐标存在。`,
  },
  {
    id: "tangent_vector", name_zh: "切向量与切空间", name_en: "Tangent vector", icon: "➡️", section_id: "5.2.2", group: "calc",
    plain: R`切向量就是"沿某条曲线对函数求方向导数"的算子 $X=X^\mu\partial_\mu$。`,
    explain: R`流形上没有原点与直箭头，所以把向量定义为曲线的等价类，或等价地定义为作用在函数上的一阶微分算子：$X[f]=\dd f(c(t))/\dd t|_0$。

$p$ 点的切向量组成 $m$ 维向量空间 $T_pM$，坐标基 $e_\mu=\partial/\partial x^\mu$。换坐标时分量按 $\widetilde X^\mu=X^\nu\partial y^\mu/\partial x^\nu$ 变，向量本身不变。`,
    analogy: "开车时仪表盘上的速度：它描述你此刻沿路线的变化快慢，不需要知道\"原点\"在哪。",
    book_example: { what: R`例 5.7：$X[x^\mu]=\dd x^\mu/\dd t$，切向量的分量就是坐标速度。`, point: "分量是向量作用在坐标函数上的值。" },
    misconception: R`不同点的切向量属于不同的空间 $T_pM$、$T_qM$，不能直接相加或相减。`,
  },
  {
    id: "one_form", name_zh: "一形式与张量", name_en: "One-forms & tensors", icon: "📏", section_id: "5.2.3", group: "calc",
    plain: R`一形式是"吃一个向量、吐一个数"的线性函数，$\dd x^\mu$ 是对偶基。`,
    explain: R`余切空间 $T_p^*M$ 是 $T_pM$ 的对偶。函数的微分 $\dd f$ 是最基本的一形式：$\langle\dd f,V\rangle=V[f]$。分量按逆 Jacobi 矩阵变换，与向量分量配对后不变。

$(q,r)$ 型张量是 $q$ 个一形式与 $r$ 个向量的多重线性函数；物理书里的"张量变换律"是这一定义的推论。`,
    analogy: R`地形图上的等高线：向量是"走一步"，一形式是"跨过了几条等高线"——二者配对得到高度变化，与你用什么网格无关。`,
    book_example: { what: R`\eqref{5.27}：$\langle\omega,V\rangle=\omega_\mu V^\mu$；\eqref{5.28}：$\widetilde\omega_\nu=\omega_\mu\partial x^\mu/\partial y^\nu$。`, point: "上指标配下指标，才是坐标无关的量。" },
    misconception: R`没有度规时，两个向量之间没有内积，向量与一形式之间也没有典范的对应（"升降指标"要度规）。`,
  },
  {
    id: "push_pull", name_zh: "推前与拉回", name_en: "Push-forward & pullback", icon: "🔁", section_id: "5.2.6", group: "calc",
    plain: R`映射 $f$ 把向量向前推（$f_*$），把形式向后拉（$f^*$）；矩阵都是 Jacobi 矩阵。`,
    explain: R`$(f_*V)[g]=V[g\circ f]$，$\langle f^*\omega,V\rangle=\langle\omega,f_*V\rangle$。复合律 $(g\circ f)_*=g_*f_*$、$(g\circ f)^*=f^*g^*$ 就是链式法则。

拉回对任意光滑映射都把场拉成场；推前一般只对微分同胚把场推成场。混合型张量只有在 $f$ 是微分同胚时才有诱导映射。`,
    analogy: "把地图上的温度场\"拉回\"到你的行车路线上总是可以的；但把你车上的速度\"推\"成整张地图上的速度场，只有一对一时才说得通。",
    book_example: { what: R`例 5.8：把平面上的向量推前到半球面上，结果自动切于球面。`, point: "推前的分量就是 $V^\mu\partial y^\alpha/\partial x^\mu$。" },
    misconception: R`$f^*$ 不是 $f_*$ 的逆；二者作用在不同的空间上、方向相反。`,
  },
  {
    id: "flow", name_zh: "流与单参数变换群", name_en: "Flow", icon: "🌊", section_id: "5.3", group: "calc",
    plain: R`向量场的积分曲线族：每个点顺着向量场"漂流" $t$ 时间到达 $\sigma_t(x)$。`,
    explain: R`解自治 ODE $\dd x^\mu/\dd t=X^\mu(x)$。由解的唯一性，$\sigma_t\circ\sigma_s=\sigma_{t+s}$，$\{\sigma_t\}$ 是单参数变换群，可写成 $\exp(tX)$。

无穷小地，$\sigma_\varepsilon(x)=x+\varepsilon X$：向量场是变换群的无穷小生成元。`,
    analogy: "河面上撒一把纸屑，水流（定常）把每片纸屑带到下游：起点决定路径，路径可以拼接。",
    book_example: { what: R`例 5.9：$X=-y\partial_x+x\partial_y$ 的流是转动，单参数群同构于 $\mathrm{SO}(2)$；习题 5.7 的 $y\partial_x+x\partial_y$ 给出 boost，同构于 $\R$。`, point: "同样局部像 $\R$ 的群，整体可以不同。" },
    misconception: R`流不一定对所有 $t$ 存在（非紧流形上可能"有限时间跑到无穷"）。`,
  },
  {
    id: "lie_derivative", name_zh: "李导数与李括号", name_en: "Lie derivative & Lie bracket", icon: "🔀", section_id: "5.3.2", group: "calc",
    plain: R`用 $X$ 的流把邻点的量搬回来再求差商；对向量场就是 $[X,Y]$。`,
    explain: R`$\mathcal{L}_XY=\lim\frac1\varepsilon[(\sigma_{-\varepsilon})_*Y|_{\sigma_\varepsilon(x)}-Y|_x]=[X,Y]$，分量 $X^\mu\partial_\mu Y^\nu-Y^\mu\partial_\mu X^\nu$。

几何意义：两个流交替走一圈的缺口 $\varepsilon\delta[X,Y]$；$[X,Y]=0\iff$ 两个流可交换。对一般张量用 Leibniz 律推广；对形式有 Cartan 公式。`,
    analogy: "平行停车：前后开与转向交替进行，车竟横向平移——这一横向分量就是两个运动的李括号。",
    book_example: { what: R`图 5.13 与交互图 2：$X=\partial_x$、$Y=x\partial_y$ 时，缺口/$(\varepsilon\delta)\to\partial_y$。`, point: "李括号不需要度规或联络。" },
    misconception: R`$\mathcal{L}_XY$ 对 $X$ 不是函数线性的：$\mathcal{L}_{fX}Y\neq f\mathcal{L}_XY$，它不是协变导数。`,
  },
  {
    id: "diff_form", name_zh: "微分形式与楔积", name_en: "Differential forms", icon: "🧩", section_id: "5.4.1", group: "forms",
    plain: R`全反对称的 $(0,r)$ 型张量；$\dd x\wedge\dd y=-\dd y\wedge\dd x$。`,
    explain: R`$r$ 形式 $\omega=\frac1{r!}\omega_{\mu_1\ldots\mu_r}\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\mu_r}$，在 $m$ 维中有 $\binom mr$ 个独立分量，$r>m$ 时为零。

外积满足 $\xi\wedge\eta=(-1)^{qr}\eta\wedge\xi$。$m$ 形式在坐标变换下乘 Jacobi 行列式——这就是它能被积分的原因。`,
    analogy: R`有向的"小平行多面体"测量器：$\dd x\wedge\dd y$ 给出投影到 $xy$ 面上的有向面积，换个绕向就变号。`,
    book_example: { what: R`例 5.10：$\R^3$ 中的 0、1、2、3 形式分别对应函数、向量、轴矢量、标量密度。`, point: R`二形式与向量在三维中可互换只是巧合（维数都是 3）。` },
    misconception: R`对称张量（如度规）不是微分形式；"$\dd x\,\dd y$"（积分测度）与"$\dd x\wedge\dd y$"（有向）不同。`,
  },
  {
    id: "ext_derivative", name_zh: "外微分、$\\dd^2=0$ 与 Cartan 公式", name_en: "Exterior derivative", icon: "🔧", section_id: "5.4.2", group: "forms",
    plain: R`把 grad、rot、div 合成一个算子 $\dd$，它满足 $\dd^2=0$。`,
    explain: R`$\dd\omega=\frac1{r!}\partial_\nu\omega_{\mu_1\ldots\mu_r}\dd x^\nu\wedge\dd x^{\mu_1}\wedge\cdots$。混合偏导对称、楔积反对称，所以 $\dd^2=0$。$\dd$ 与拉回交换，因而与坐标无关；无坐标公式 \eqref{5.70}、\eqref{5.71}。

内积 $\mathrm{i}_X$ 把向量塞进形式；Cartan 公式 $\mathcal{L}_X=\dd\mathrm{i}_X+\mathrm{i}_X\dd$ 把流与外微分联系起来，例如 Hamilton 流保持辛形式。`,
    analogy: R`"边界的边界为零"的对偶：$\nabla\times\nabla f=0$、$\nabla\cdot\nabla\times\boldsymbol{A}=0$ 只是 $\dd^2=0$ 在三维里的两个影子。`,
    book_example: { what: R`例 5.11：$F=\dd A$，$\dd F=0$ 就是 $\nabla\cdot\boldsymbol{B}=0$ 与 Faraday 定律。`, point: "两个齐次 Maxwell 方程是恒等式，不是动力学。" },
    misconception: R`闭形式（$\dd\omega=0$）不一定恰当（$\omega=\dd\psi$）——二者之差就是第 6 章的 de Rham 上同调。`,
  },
  {
    id: "integration", name_zh: "定向与积分", name_en: "Orientation & integration", icon: "📐", section_id: "5.5", group: "forms",
    plain: R`可定向 = 能让所有转移函数的 Jacobi 行列式为正；积分 = 各卡的普通积分之和。`,
    explain: R`$m$ 形式换坐标乘 Jacobi 行列式 $J$；多重积分换元乘 $|J|$。二者一致当且仅当 $J>0$，所以积分需要定向。Möbius 带不可定向。

整体积分用单位分解 $\sum\varepsilon_i=1$ 把被积函数切成每张卡里的一块，结果与图册、单位分解的选取无关。`,
    analogy: "拼图计面积：每块拼图在自己的方格纸上量面积再相加；只要每块都按同一个绕向量，结果就与纸怎么铺无关。",
    book_example: { what: R`例 5.13：$\int_{S^1}\cos^2\theta=\frac\pi2+\frac\pi2=\pi$。`, point: "两张卡、两块单位分解，各积一半。" },
    misconception: R`没有度规时体积元的分量 $h$ 没有典范选择——"$h=1$"在别的坐标里就不是 1。`,
  },
  {
    id: "lie_group", name_zh: "李群", name_en: "Lie group", icon: "🌀", section_id: "5.6.1", group: "group",
    plain: R`本身是光滑流形、乘法与求逆都光滑的群，例如转动群 $\mathrm{SO}(3)$。`,
    explain: R`矩阵群 $\mathrm{GL}(n),\mathrm{O}(n),\mathrm{SO}(n),\mathrm{U}(n),\mathrm{SU}(n),\mathrm{SL}(n)$、Lorentz 群都是李群：由闭子群定理，只需验证它们是闭集。

左右平移是微分同胚，把单位元处的信息搬到全群，使李群的几何几乎完全由单位元附近决定。`,
    analogy: R`无人机的"姿态空间"：所有可能的朝向组成一个弯曲的三维空间，而且两个转动可以复合成一个转动。`,
    book_example: { what: R`例 5.14：$\mathrm{U}(1)=S^1$；\eqref{5.103}–\eqref{5.108} 的矩阵群。`, point: "维数是流形的维数，不是矩阵的阶数。" },
    misconception: R`陪集空间 $G/H$ 只在 $H$ 正规时才是群；$S^2=\mathrm{SO}(3)/\mathrm{SO}(2)$ 不是群。`,
  },
  {
    id: "lie_algebra", name_zh: "李代数与指数映射", name_en: "Lie algebra & exponential map", icon: "🧮", section_id: "5.6.2", group: "group",
    plain: R`左不变向量场（等价地，单位元处的切向量）连同李括号；$\exp$ 把它变回群元素。`,
    explain: R`$X_V|_g=L_{g*}V$ 给出 $T_eG\cong$ 左不变场，括号封闭（\eqref{5.112}）。矩阵群中 $L_{g*}V=gV$，括号就是对易子；李代数由线性化约束给出：$\mathrm{SO}(n)$ 的李代数是反对称矩阵，$\mathrm{SU}(n)$ 的是无迹反 Hermite 矩阵。

单参数子群 $\phi_V(t)=\exp(tV)$ 与左不变场一一对应；结构常数 $c_{\mu\nu}{}^\lambda$ 与 Maurer–Cartan 方程编码了群的局部结构。`,
    analogy: R`群是"有限的转动"，李代数是"角速度"。把角速度保持 $t$ 秒，就得到 $\exp(tV)$ 这个有限转动。`,
    book_example: { what: R`例 5.15：$\mathrm{SL}(n)$ 的李代数无迹（$\det(I+sA)=1+s\Tr A+O(s^2)$）、$\mathrm{SO}(n)$ 的反对称、$\mathrm{U}(n)$ 的反 Hermite。`, point: R`$\mathrm{O}(n)$ 与 $\mathrm{SO}(n)$、$\R$ 与 $\mathrm{SO}(2)$ 的李代数相同。` },
    misconception: R`$\exp$ 一般不是双射；$\exp(A)\exp(B)\neq\exp(A+B)$，除非 $[A,B]=0$。`,
  },
  {
    id: "group_action", name_zh: "群作用与齐性空间", name_en: "Group action & homogeneous space", icon: "🎯", section_id: "5.7", group: "group",
    plain: R`李群把流形上的点搬来搬去；可迁时 $M\cong G/H(p)$。`,
    explain: R`作用满足 $\sigma(e,p)=p$、$\sigma(g_1,\sigma(g_2,p))=\sigma(g_1g_2,p)$。轨道是一个点能到达的地方，迷向群是使它不动的元素（李子群）。

可迁时 $M$ 就是齐性空间 $G/H(p)$：$S^n=\mathrm{SO}(n+1)/\mathrm{SO}(n)$，$\RP^n$、Grassmann 流形同理，维数 $=\dim G-\dim H$。李代数元素在 $M$ 上诱导向量场 $V^\sharp$（角动量算符）。`,
    analogy: R`地球仪：转动地球仪能把任意城市转到你眼前（可迁）；把北京钉在眼前后还能做的转动只剩绕视线的旋转（迷向群 $\mathrm{SO}(2)$）。`,
    book_example: { what: R`例 5.16(c)：$\mathrm{SL}(2,\C)$ 以 $X\mapsto AXA^\dagger$ 作用在时空上，$\pm A$ 给出同一个 Lorentz 变换。`, point: "转一圈矩阵变号：旋量的来源。" },
    misconception: R`自由 $\neq$ 有效：$\mathrm{SO}(3)$ 在 $S^2$ 上有效但不自由（每点都有迷向群 $\mathrm{SO}(2)$）。`,
  },
];

export const relations = [
  { from: "manifold", to: "tangent_vector", label: "沿曲线求导" },
  { from: "tangent_vector", to: "one_form", label: "对偶" },
  { from: "tangent_vector", to: "push_pull", label: R`$f_*$` },
  { from: "one_form", to: "push_pull", label: R`$f^*$` },
  { from: "tangent_vector", to: "flow", label: "积分" },
  { from: "flow", to: "lie_derivative", label: "用流搬运" },
  { from: "push_pull", to: "lie_derivative", label: R`$(\sigma_{-\varepsilon})_*$` },
  { from: "one_form", to: "diff_form", label: "反对称化" },
  { from: "diff_form", to: "ext_derivative", label: R`$\dd$` },
  { from: "lie_derivative", to: "ext_derivative", label: "Cartan 公式" },
  { from: "diff_form", to: "integration", label: R`$m$ 形式` },
  { from: "manifold", to: "lie_group", label: "加上群结构" },
  { from: "lie_derivative", to: "lie_algebra", label: "李括号" },
  { from: "lie_group", to: "lie_algebra", label: "左不变场" },
  { from: "flow", to: "lie_algebra", label: R`$\exp$` },
  { from: "lie_group", to: "group_action", label: "作用" },
  { from: "group_action", to: "manifold", label: "齐性空间" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**流形**：用重叠的卡覆盖，转移函数 $\psi_{ij}=\varphi_i\circ\varphi_j^{-1}$ 光滑。一切先在卡里用坐标写，再证明与卡无关。`}</TxI>,
  <TxI>{R`**向量 = 方向导数**，$X=X^\mu\partial_\mu$；**一形式**是它的对偶，$\langle\dd x^\mu,\partial_\nu\rangle=\delta^\mu_\nu$。映射把向量推前（$f_*$）、把形式拉回（$f^*$），分量都乘 Jacobi 矩阵。`}</TxI>,
  <TxI>{R`**流与李导数**：向量场积分成流 $\sigma_t=\exp(tX)$；$\mathcal{L}_XY=[X,Y]$ 度量两个流不可交换的程度（平行四边形缺口 $\varepsilon\delta[X,Y]$）。`}</TxI>,
  <TxI>{R`**形式**：外微分 $\dd$ 统一 grad/rot/div，$\dd^2=0$，与拉回交换；Cartan 公式 $\mathcal{L}_X=\dd\mathrm{i}_X+\mathrm{i}_X\dd$。可定向流形上 $m$ 形式可以积分。Maxwell 方程：$\dd F=0$ 是恒等式。`}</TxI>,
  <TxI>{R`**李群**：左不变场 ↔ $T_eG$，括号封闭成李代数（矩阵群里是对易子）；$\exp(tV)$ 是单参数子群；Maurer–Cartan 方程 $\dd\theta+\frac12[\theta\wedge\theta]=0$。**群作用**：轨道、迷向群、齐性空间 $G/H$；$\mathrm{SL}(2,\C)\to\mathrm{O}^\uparrow_+(1,3)$ 二对一。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`为什么 $S^2$ 至少需要两张坐标卡？`,
    options: [R`因为 $S^2$ 不是 Hausdorff 空间`, R`因为 $S^2$ 紧致而 $\R^2$ 不紧，二者不同胚，一张卡（到 $\R^2$ 开集的同胚）覆盖不了整个球面`, R`因为极坐标的 $\phi$ 有 $2\pi$ 的周期`, R`因为球极投影不是光滑映射`],
    answer: 1, why: R`若一张卡覆盖 $S^2$，$S^2$ 就同胚于 $\R^2$ 的开子集；紧集的连续像紧，而 $\R^2$ 的开子集不紧（非空时）。极坐标的问题只是"这一种"坐标不好，不能说明所有坐标都不行。`,
  },
  {
    q: R`换坐标 $y=y(x)$ 时，下列哪个量不变？`,
    options: [R`向量分量 $X^\mu$`, R`一形式分量 $\omega_\mu$`, R`配对 $\omega_\mu X^\mu$`, R`$\partial/\partial x^1$ 本身`],
    answer: 2, why: R`$X^\mu$ 乘 $\partial y/\partial x$，$\omega_\mu$ 乘 $\partial x/\partial y$，乘积不变（\eqref{5.23}、\eqref{5.28}）。基向量 $\partial/\partial x^1$ 一般会变成其他 $\partial/\partial y^\nu$ 的组合。`,
  },
  {
    q: R`$X=\partial_x$，$Y=x\,\partial_y$。先沿 $X$ 走 $\varepsilon$ 再沿 $Y$ 走 $\delta$，与反过来走，两个终点之差是什么？`,
    options: [R`$0$`, R`$\varepsilon\delta\,\partial_y$ 方向的位移 $(0,\varepsilon\delta)$`, R`$(\varepsilon\delta,0)$`, R`$(0,\varepsilon^2)$`],
    answer: 1, why: R`从 $(x,y)$：先 $X$ 到 $(x+\varepsilon,y)$，再 $Y$ 到 $(x+\varepsilon,y+\delta(x+\varepsilon))$；反过来到 $(x+\varepsilon,y+\delta x)$。差 $(0,\varepsilon\delta)$，正是 $\varepsilon\delta[X,Y]$，$[X,Y]=\partial_y$（这里甚至精确成立）。`,
  },
  {
    q: R`为什么 $\dd^2=0$？`,
    options: [R`因为外微分把 $r$ 形式变成 $r+1$ 形式`, R`因为二阶偏导对两个求导指标对称，而 $\dd x^\lambda\wedge\dd x^\nu$ 反对称`, R`因为 Stokes 定理`, R`因为流形没有边界`],
    answer: 1, why: R`\eqref{5.72} 的证明：$\partial_\lambda\partial_\nu\omega$ 对称，$\dd x^\lambda\wedge\dd x^\nu$ 反对称，缩并为零。它是纯局部的代数事实，不需要任何整体条件。`,
  },
  {
    q: R`关于 $\mathrm{SL}(2,\C)$ 在 Minkowski 时空上的作用 $X\mapsto AXA^\dagger$，下列说法正确的是：`,
    options: [R`它给出 $\mathrm{SL}(2,\C)$ 与 $\mathrm{O}(1,3)$ 的同构`, R`$A$ 与 $-A$ 给出同一个 Lorentz 变换，所以是二对一同态，像是 $\mathrm{O}^\uparrow_+(1,3)$`, R`它不保持 $\det X$`, R`它包含空间反射`],
    answer: 1, why: R`\eqref{5.147}：像是正时向 Lorentz 群（$\det\Lambda=1$，$\Lambda_{00}>0$），不含反射与时间反演；核为 $\{\pm I_2\}$。转 $2\pi$ 对应 $A\to-A$，这是旋量的起源。`,
  },
  {
    q: R`$\dim G_{2,4}(\R)$（$\R^4$ 中二维平面的空间）是多少？`,
    options: ["2", "4", "6", "8"],
    answer: 1, why: R`\eqref{5.14}：$k(n-k)=2\cdot2=4$；或由 \eqref{5.158}：$\dim\mathrm{O}(4)-\dim\mathrm{O}(2)-\dim\mathrm{O}(2)=6-1-1=4$。`,
  },
];

export const BRIDGE = R`本章最后的结构 $\dd^2=0$ 与第 3 章的 $\partial^2=0$ 遥相呼应。第 6 章把二者配成一对：**Stokes 定理** $\int_c\dd\omega=\int_{\partial c}\omega$ 让"闭形式模恰当形式"（de Rham 上同调 $H^r(M)$）与"闭链模边缘"（同调 $H_r(M)$）互为对偶，于是 Betti 数可以用微分形式算出来——本章 \eqref{5.77} 的 de Rham 复形就是起点。再往后，第 7 章给流形加上度规（体积元的典范选择、Hodge 星算子、协变导数），第 9–10 章把李群作用推广成纤维丛与联络，Maurer–Cartan 方程将以"曲率 = 0"的身份重新出现。`;
