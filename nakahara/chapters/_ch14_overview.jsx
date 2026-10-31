// 第 14 章高层理解层：开场、路线图、推导图、核心概念、小结与自测、全书回望。纯数据（TAKEAWAYS 为 TxI 元素）。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "把所有的甜甜圈加起来";
export const HOOK = R`量子力学告诉我们：一个粒子从 A 到 B，要对所有可能的路径求和。弦论把"粒子"换成一根小小的闭合弦——它在时空中扫出的不是一条世界线，而是一张二维的**世界面**。真空中弦自己生成、传播、湮灭，扫出的是没有边界的闭曲面：球面、环面（甜甜圈）、双孔环面……于是"对路径求和"变成了"对所有曲面求和"。

但"所有曲面"里藏着巨大的冗余。同一张曲面换一种坐标（微分同胚），或者把它的度规在每一点各自放大缩小（Weyl 变换），弦的作用量都不变——如果天真地积分，同一个几何会被数无穷多次。剥掉这些冗余之后还剩下什么？对于甜甜圈，答案出奇地简单：只剩下一个复数 $\tau$，它描述甜甜圈的"形状"（第 8 章的模参数）；而且 $\tau$ 与 $\tau+1$、$-1/\tau$ 描述的是同一个甜甜圈。

本章把这件事算到底：Riemann 面上的复几何（\secref{14.1}）、Faddeev–Popov 技巧与鬼场行列式（\secref{14.2}）、Riemann–Roch 定理告诉我们剩下多少个参数、为什么时空必须是 $D=26$ 维，最后在环面上得到一个干净的公式：
$$Z_1=\int_{\mathrm{Mod}}\frac{\dd^2\tau}{\tau_2^2}\,\tau_2^{-12}|\eta(\tau)|^{-48}.$$
被积函数里的 Dedekind $\eta$ 函数与模变换下的不变性，把第 1 章的路径积分、第 7 章的共形 Killing 向量、第 8 章的模参数、第 12 章的指标定理连成了一条线。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "14.0", title: "Polyakov 作用量与圈展开", gist: R`弦的配分函数 = 对亏格 $g$ 求和，每个亏格内对嵌入 $X$ 与世界面度规 $\gamma$ 积分；Euler 项给 $g$ 圈一个权重 $\mathrm{e}^{-2\lambda g}$。`, gives: ["14.1"], next: R`先把世界面——Riemann 面——上的几何工具准备好。` },
  { sec: "14.1.1–14.1.2", title: "复结构与螺旋度张量", gist: R`二维度规局部共形平坦 $\mathrm{e}^{2\sigma}|\dd z|^2$，保持这一形式的坐标变换是全纯的；张量按螺旋度 $n$（上减下 $z$ 指标）分类为 $\mathcal{T}^n$。`, gives: ["14.5", "14.8", "14.15", "14.16"], next: R`在 $\mathcal{T}^n$ 上求导需要协变导数。` },
  { sec: "14.1.3", title: R`两种协变导数与 Laplace 算子`, gist: R`$\nabla^z_{(n)}=2\mathrm{e}^{-2\sigma}\partial_{\bar z}$ 升螺旋度，$\nabla_z^{(n)}=\mathrm{e}^{-2n\sigma}\partial_z\mathrm{e}^{2n\sigma}$ 降螺旋度，二者互为负伴随；$\Delta^\pm_{(n)}$ 之差正比于 $n\mathcal{R}$。`, gives: ["14.18a", "14.18b", "14.21a", "14.22", "14.23a", "14.24a", "14.25"], next: R`这些算子的核有多大？指标定理回答。` },
  { sec: "14.1.4", title: "Riemann–Roch 定理（热核证明）", gist: R`$\ind\nabla_z^{(n)}=(2n-1)(g-1)$：热核短时展开的常数项 $\frac{1\pm3n}{12\pi}\Delta\sigma$ 之差积分成 Euler 示性数。`, gives: ["14.27", "14.28", "14.29a", "14.29b"], next: R`现在可以写弦的路径积分了。` },
  { sec: "14.2.1", title: "真空振幅与规范冗余", gist: R`作用量在 $\mathrm{Diff}*\mathrm{Weyl}$ 下不变；配分函数要除以规范群体积。模空间 $\mathrm{Mod}=\mathcal{M}_g/G$，Teichmüller 空间维数 $0,2,6g-6$。`, gives: ["14.30", "14.31", "14.38", "14.39", "14.40"], next: R`怎样"除以无穷大"？换积分变量并算 Jacobi 行列式。` },
  { sec: "14.2.2", title: "Faddeev–Popov 测度与临界维数", gist: R`度规变形正交分解为 Weyl $\oplus$ $\operatorname{im}P_1$ $\oplus$ $\ker P_1^\dagger$；CKV（$\ker P_1$）单独处理；Gauss 积分给出鬼行列式 $\det'P_1^\dagger P_1$ 与模的 Jacobi 因子；Weyl 反常 $D-26$ 相消要求 $D=26$；对 $X$ 积分得 $(\det'\Delta/\text{面积})^{-13}$。`, gives: ["14.47", "14.50", "14.57", "14.58", "14.76", "14.80b", "14.84a", "14.84b", "14.93", "14.94"], next: R`用复几何把 $P_1$ 对角化。` },
  { sec: "14.2.3", title: "复形式：Beltrami 与二次微分", gist: R`$P_1=\mathrm{diag}(\nabla^z_{(1)},\nabla_z^{(-1)})$；模方向 $=\ker\nabla^z_{(-2)}=$ 全纯二次微分；Riemann–Roch 给出 CKV 数 − 二次微分数 $=3-3g$；鬼行列式 $=\det'\Delta^+_{(1)}$。`, gives: ["14.100", "14.107", "14.110", "14.112", "14.113", "14.117"], next: R`模空间本身长什么样？` },
  { sec: "14.2.4", title: "模空间与单值化", gist: R`$\mathrm{Mod}=\mathrm{Teich}/\mathrm{MCG}$；$Z_0=0$（$\mathrm{SL}(2,\C)$ 体积无穷）；单值化定理：每个 Riemann 面共形等价于常曲率曲面，由此定义 Weil–Petersson 测度。`, gives: ["14.118", "14.119", "14.120"], next: R`在环面上把一切算出来。` },
  { sec: "14.3.1", title: "环面：CKV、Beltrami、二次微分", gist: R`模空间 $H/\mathrm{SL}(2,\Z)$；CKV 是平移，$V(\mathrm{CKV})=\tau_2^2$；$\phi=a\,\dd z\otimes\dd z$，$\mu_{zz}=\mathrm{i}/2\tau_2$，W-P 因子 $\tau_2^{-1}$。`, gives: ["14.121", "14.124", "14.126", "14.127"], next: R`最后算行列式。` },
  { sec: "14.3.2", title: R`$\zeta$ 正规化与 $Z_1$`, gist: R`谱 $\lambda_{m,n}\propto|m+\tau n|^2/\tau_2^2$；$\zeta_\Delta\propto\tau_2^sE(\tau,s)$；函数方程 + Kronecker 极限公式 ⇒ $\det'\Delta/\tau_2=\tau_2|\eta|^4$；$Z_1=\int\frac{\dd^2\tau}{\tau_2^2}\tau_2^{-12}|\eta|^{-48}$，测度与被积函数分别模不变。`, gives: ["14.129", "14.133", "14.135", "14.136", "14.140b", "14.141", "14.142", "14.145", "14.147"] },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "14.5", to: "14.8", label: "换卡保持共形平坦" },
  { from: "14.8", to: "14.15", label: "纯 z 指标" },
  { from: "14.15", to: "14.18b", label: R`联络 $2\partial_z\sigma$` },
  { from: "14.18b", to: "14.22", label: "不变内积" },
  { from: "14.22", to: "14.23a", label: "分部积分" },
  { from: "14.23a", to: "14.25", label: R`$\Delta^\pm$` },
  { from: "14.25", to: "14.29a", label: "热核展开" },
  { from: "14.29a", to: "14.27", label: R`$\int\Delta\sigma\propto\chi$` },
  { from: "14.1", to: "14.39", label: R`除以 $V(\mathrm{Diff}*\mathrm{Weyl})$` },
  { from: "14.39", to: "14.80b", label: "度规变形分解" },
  { from: "14.50", to: "14.80b", label: R`$\operatorname{im}P_1$` },
  { from: "14.76", to: "14.80b", label: R`$\ker P_1^\dagger$` },
  { from: "14.80b", to: "14.94", label: "Gauss 积分" },
  { from: "14.84a", to: "14.94", label: R`$D=26$` },
  { from: "14.27", to: "14.113", label: R`$n=-1$` },
  { from: "14.113", to: "14.38", label: "消没定理" },
  { from: "14.94", to: "14.117", label: "复形式" },
  { from: "14.107", to: "14.117", label: "鬼行列式" },
  { from: "14.119", to: "14.121", label: "平坦环面" },
  { from: "14.117", to: "14.121", label: R`$g=1$` },
  { from: "14.121", to: "14.129", label: R`$V(\mathrm{CKV})$、W-P` },
  { from: "14.135", to: "14.140b", label: "函数方程" },
  { from: "14.136", to: "14.140b", label: R`$s\to1$` },
  { from: "14.140b", to: "14.141", label: R`$\zeta$ 正规化` },
  { from: "14.129", to: "14.142", label: "因子分解" },
  { from: "14.141", to: "14.142", label: "代入" },
  { from: "14.147", to: "14.142", label: "模不变" },
];
export const EQMAP_LABELS = {
  "14.1": "Polyakov 作用量", "14.5": "共形平坦度规", "14.8": "全纯换卡", "14.15": "螺旋度", "14.18b": "协变导数", "14.22": "不变内积", "14.23a": "伴随", "14.25": R`$\Delta^+-\Delta^-$`,
  "14.29a": "热核系数", "14.27": "Riemann–Roch", "14.39": "除以规范体积", "14.50": R`$P_1$`, "14.76": R`$P_1^\dagger$`, "14.80b": "正交分解", "14.84a": "Weyl 反常", "14.94": R`$g$ 圈振幅`,
  "14.113": "CKV − 二次微分", "14.38": R`$\dim\mathrm{Teich}$`, "14.107": "鬼行列式", "14.117": "复形式", "14.119": "单值化", "14.121": R`$Z_1$（未化简）`, "14.129": "因子分解",
  "14.135": "Eisenstein 级数", "14.136": "Kronecker 极限公式", "14.140b": R`$E'(\tau,0)$`, "14.141": R`$\det'\Delta/\tau_2$`, "14.142": R`$Z_1$`, "14.147": R`$\eta$ 的模变换`,
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "geom", label: "Riemann 面的几何" },
  { id: "path", label: "弦的路径积分" },
  { id: "moduli", label: "模空间" },
  { id: "loop", label: "单圈振幅" },
];

export const concepts = [
  {
    id: "riemann_surface", name_zh: "Riemann 面 = 共形类 = 复结构", name_en: "Riemann surface", icon: "🍩", section_id: "14.1.1", group: "geom",
    plain: R`二维度规局部总是 $\mathrm{e}^{2\sigma}|\dd z|^2$；保持这一形式的换卡是全纯的。`,
    explain: R`等温坐标让任何二维度规局部写成共形平坦的形式。两张卡在重叠处都共形平坦，要求坐标变换 $w(z)$ 全纯（保定向时），所以带度规的可定向曲面自动是一维复流形。

更进一步，只差 Weyl 因子的两个度规给出同一组等温坐标、同一个复结构：度规的共形类 ↔ 复结构。弦论的 Weyl 对称性正是在说"只有复结构是物理的"。`,
    analogy: R`像一张可以随意拉伸的橡皮地图：拉伸会改变距离，但不会改变"哪里是直角"——角度（共形结构）才是这张地图的本质。`,
    book_example: { what: R`\eqref{14.7}–\eqref{14.9}：$\mathrm{e}^{2\sigma}=\mathrm{e}^{2\sigma'}|\partial w/\partial z|^2$。`, point: "共形因子吸收全纯变换的伸缩率。" },
    misconception: R`Riemann 面不需要"选一个复结构"再"选一个度规"：在二维里，前者就是后者模掉 Weyl 变换。`,
  },
  {
    id: "helicity", name_zh: "螺旋度与张量空间", name_en: R`Helicity, $\mathcal{T}^n$`, icon: "🌀", section_id: "14.1.2", group: "geom",
    plain: R`纯 $z$ 指标张量在 $z\to w$ 下乘 $(\partial w/\partial z)^n$；$n$ = 上减下指标数。`,
    explain: R`度规让我们把 $\bar z$ 指标都换成 $z$ 指标，于是任何张量都等价于纯 $z$ 指标张量，它只由螺旋度 $n$ 刻画——即切平面转动群 $\mathrm{U}(1)=\mathrm{SO}(2)$ 的表示。

本章最常用的几个：$n=1$ 向量 $\delta v^z$，$n=-1$ 一形式 / $\delta v_z$，$n=-2$ 度规的无迹变形 $\delta\gamma_{zz}$ 与二次微分，$n=0$ 函数 $X^\mu$；$n=\frac12$ 是旋量。`,
    analogy: R`像角动量的磁量子数：转动坐标时，螺旋度 $n$ 的张量多出相位 $\mathrm{e}^{\mathrm{i}n\theta}$。`,
    book_example: { what: R`例 14.1：$T^{zz}=2(T^{11}+\mathrm{i}T^{12})$ 螺旋度 $+2$。`, point: R`对称无迹张量 = 螺旋度 $\pm2$ 的一对。` },
    misconception: R`螺旋度不是张量的阶数：$T^{zz}{}_z$ 是三阶张量，螺旋度却是 1。`,
  },
  {
    id: "cov_deriv", name_zh: "两种协变导数", name_en: R`Covariant derivatives on $\mathcal{T}^n$`, icon: "↕️", section_id: "14.1.3", group: "geom",
    plain: R`$\nabla^z_{(n)}\propto\partial_{\bar z}$ 升螺旋度，$\nabla_z^{(n)}=\mathrm{e}^{-2n\sigma}\partial_z\mathrm{e}^{2n\sigma}$ 降螺旋度，互为负伴随。`,
    explain: R`共形平坦度规只有一个 Christoffel 分量 $\Gamma^z{}_{zz}=2\partial_z\sigma$，它像一个 U(1) 规范势，$\mathcal{T}^n$ 带"荷" $n$。两个导数在不变内积 $(T,U)=\int\sqrt g(g_{z\bar z})^n\bar TU$ 下满足 $(\nabla^z_{(n)})^\dagger=-\nabla_z^{(n+1)}$。

组合出两个非负 Laplace 算子 $\Delta^\pm_{(n)}$，其核分别是两个导数的核；它们之差 $-\frac12n\mathcal{R}$ 是 Riemann–Roch 定理中 $n$ 依赖性的来源。`,
    analogy: R`像量子力学的升降算符 $a^\dagger$、$a$：一个把螺旋度加一，一个减一，$a^\dagger a$ 与 $aa^\dagger$ 的谱只在零模上不同。`,
    book_example: { what: R`\eqref{14.21a}：$\nabla^z_{(n)}=2\mathrm{e}^{-2\sigma}\partial_{\bar z}$，$\nabla_z^{(n)}=\mathrm{e}^{-2n\sigma}\partial_z\mathrm{e}^{2n\sigma}$。`, point: R`$\ker\nabla^z_{(n)}$ 就是全纯截面。` },
    misconception: R`$\nabla_z$ 的伴随不是 $\nabla_{\bar z}$，而是 $-\nabla^z$（指标已用度规升起）。`,
  },
  {
    id: "riemann_roch", name_zh: "Riemann–Roch 定理", name_en: "Riemann–Roch theorem", icon: "🧮", section_id: "14.1.4", group: "geom",
    plain: R`$\dim\ker\nabla_z^{(n)}-\dim\ker\nabla^z_{(n-1)}=(2n-1)(g-1)$。`,
    explain: R`由热核表示（第 12 章）：指标 $=\mathrm{Tr}\,\mathrm{e}^{-t\Delta^-_{(n)}}-\mathrm{Tr}\,\mathrm{e}^{-t\Delta^+_{(n-1)}}$，与 $t$ 无关；$t\to0$ 时只剩热核对角元的常数项 $\frac{1\mp3n}{12\pi}\Delta\sigma$，它正比于 $\sqrt g\mathcal{R}$，积分就是 Euler 示性数。

弦论中取 $n=-1$：CKV 数 − 二次微分数 $=3-3g$；再加上消没定理得到 CKV 与模参数的个数。`,
    analogy: R`像一个"守恒的差额"：单独的收入和支出会随度规（市场）变化，但差额只由拓扑（账户的结构）决定。`,
    book_example: { what: R`\eqref{14.113}：$\dim\ker\nabla_z^{(-1)}-\dim\ker\nabla^z_{(-2)}=3-3g$。`, point: R`$g\ge2$ 时 $3g-3$ 个复模参数。` },
    misconception: R`指标只给差；$g\ge2$ 时"没有 CKV"需要单独的论证（负次数线丛无全纯截面）。`,
  },
  {
    id: "polyakov", name_zh: "Polyakov 弦的路径积分", name_en: "Polyakov path integral", icon: "🧵", section_id: "14.2.1", group: "path",
    plain: R`$Z=\sum_g\int\mathcal{D}X\mathcal{D}\gamma\,\mathrm{e}^{-S}$：对所有曲面、所有嵌入、所有度规求和。`,
    explain: R`弦的真空振幅是对世界面的"路径积分"：外层对拓扑（亏格 $g$）求和，内层对嵌入 $X:\Sigma_g\to\R^D$ 与度规 $\gamma$ 积分。Euler 项给每个亏格权重 $\mathrm{e}^{-2\lambda g}$，起弦耦合的作用。

Polyakov 作用量有两种局部对称性：微分同胚与 Weyl 重标度。量子化后它们必须保留，否则理论有反常。`,
    analogy: R`像对一根绳子的所有摆动方式求和——只不过绳子是闭合的二维膜，它在时空里扫出的"管道"可以分叉、汇合，形成带洞的曲面。`,
    book_example: { what: R`\figref{14.1}：$Z=Z_0+Z_1+Z_2+\cdots$。`, point: "圈展开 = 亏格展开。" },
    misconception: R`对 $\gamma$ 积分不是对"嵌入诱导的度规"积分；$\gamma$ 是独立的变量，经典上运动方程才使它与诱导度规共形等价。`,
  },
  {
    id: "gauge_slice", name_zh: "规范切片与 Faddeev–Popov", name_en: "Gauge slice", icon: "🔪", section_id: "14.2.1", group: "path",
    plain: R`在每条规范轨道上只取一个代表点；除掉的规范体积换成一个 Jacobi 行列式。`,
    explain: R`$\mathcal{E}\times\mathcal{M}_g$ 被规范群 $G=\mathrm{Diff}*\mathrm{Weyl}$ 分成轨道。规范切片与每条轨道横截相交，切片上的点彼此不规范等价。

Faddeev–Popov：$\int\mathcal{D}\gamma\mathcal{D}X\,(\ldots)/V(G)=\int_{\text{切片}}J\,(\ldots)$。$J$ 用切空间上的 Gauss 积分求（例 14.2 的推广）。`,
    analogy: R`统计一座城市的建筑时，每栋楼只拍一张正面照，而不是从所有角度各拍一张——但要记录"换角度"的变换有多少种（Jacobi 因子）。`,
    book_example: { what: R`\figref{14.2}：$(f^*X,\mathrm{e}^\phi f^*\gamma)$ 由切片上的 $(X,\gamma)$ 生成。`, point: R`轨道 $\times$ 切片 = 全空间。` },
    misconception: R`切片未必能整体选取（Gribov 问题）；本章只需要局部的切片与有限的映射类群。`,
  },
  {
    id: "fp_measure", name_zh: "度规变形的正交分解与鬼行列式", name_en: "Orthogonal decomposition & ghost determinant", icon: "👻", section_id: "14.2.2", group: "path",
    plain: R`$\{\delta\gamma\}=\{\text{conf}\}\oplus\{\operatorname{im}P_1\}\oplus\{\ker P_1^\dagger\}$；Jacobi 因子含 $\det'P_1^\dagger P_1$。`,
    explain: R`度规变形的迹部分是 Weyl 方向；无迹部分里，$P_1\delta v$（微分同胚的无迹部分）组成 $\operatorname{im}P_1$，它的正交补是 $\ker P_1^\dagger$——无散的无迹张量，即模方向。

在这些坐标下切空间度规是"对角"的，Gauss 积分给出：鬼行列式 $(\det'P_1^\dagger P_1)^{1/2}$、模的 Jacobi 因子 $\det(T,\psi)/\det^{1/2}(\psi,\psi)$、CKV 的 Gram 行列式。复形式下鬼行列式 $=\det'\Delta^+_{(1)}$。`,
    analogy: R`像把一个力分解成"沿约束面的分量"和"垂直于约束面的分量"——只有后者对应真正的自由度。`,
    book_example: { what: R`\eqref{14.80a}：$\delta\gamma=\delta\phi\gamma+P_1(\delta\tilde v+\delta t^iu_i)+\delta t^i\psi_rQ_{ri}$。`, point: R`Teichmüller 形变的规范分量被吸收进 $\delta\bar v$。` },
    misconception: R`$T_i=\partial\gamma/\partial t^i$ 一般不在 $\ker P_1^\dagger$ 中；必须先投影，这正是 $\det(T,\psi)$ 的来源。`,
  },
  {
    id: "ckv", name_zh: "共形 Killing 向量", name_en: "Conformal Killing vectors", icon: "🧭", section_id: "14.2.2", group: "path",
    plain: R`$P_1\delta v=0$：只改变尺度的微分同胚——Diff 与 Weyl 的重叠，个数 $6,2,0$。`,
    explain: R`CKV 生成的微分同胚可以被一个 Weyl 变换完全抵消，所以它们在规范群 $\mathrm{Diff}*\mathrm{Weyl}$ 中被"数了两次"，必须单独除掉 $V(\mathrm{CKV})$。

球面：Möbius 群 $\mathrm{SL}(2,\C)$（6 个实参数），体积无穷 ⇒ $Z_0=0$；环面：平移（2 个），$V=\tau_2^2$；$g\ge2$：没有。`,
    analogy: R`像把一张地图整体平移：地图上的一切关系都没变，这种"变换"不该被当作新的地图。`,
    book_example: { what: R`\eqref{14.123}：环面的 CKV 是平移 $z\to z+\tau_2^{-1/2}(v^1+\mathrm{i}v^2)$。`, point: "平移群本身是环面，体积有限。" },
    misconception: R`CKV 不是 Killing 向量：它可以改变度规，只是改变量是纯迹（可被 Weyl 吸收）。`,
  },
  {
    id: "weyl_anomaly", name_zh: "Weyl 反常与临界维数", name_en: "Weyl anomaly, D = 26", icon: "⚖️", section_id: "14.2.2", group: "path",
    plain: R`测度 $\mathcal{D}X$、$\mathcal{D}\gamma$ 在 Weyl 变换下各多出 $\exp(\frac{c}{24\pi}S_L)$，$c=D$ 与 $-26$。`,
    explain: R`经典作用量完全 Weyl 不变，但定义测度的超局域度规依赖共形因子（习题 14.3）。Polyakov 计算出两部分测度的变换都正比于 Liouville 作用量 $\int\sqrt\gamma(\gamma^{\alpha\beta}\partial\phi\partial\phi+\mathcal{R}\phi)$，系数分别为 $D/24\pi$ 与 $-26/24\pi$。

只有 $D=26$ 时总测度 Weyl 不变，$\int\mathcal{D}\phi$ 才能作为规范体积整体除掉。`,
    analogy: R`像一架天平：每个时空维度往一边放一份砝码，鬼场往另一边放 26 份；只有 26 维时天平才平衡。`,
    book_example: { what: R`\eqref{14.84a}–\eqref{14.84b}。`, point: "临界维数 26。" },
    misconception: R`26 不是作用量的性质，而是量子测度的性质；非临界维数下 Weyl 因子变成动力学场（Liouville 理论）。`,
  },
  {
    id: "moduli", name_zh: "模空间与 Teichmüller 空间", name_en: "Moduli & Teichmüller spaces", icon: "🗺️", section_id: "14.2.4", group: "moduli",
    plain: R`$\mathrm{Mod}=\mathcal{M}_g/(\mathrm{Diff}*\mathrm{Weyl})$，$\mathrm{Teich}$ 只模掉恒等分支；$\mathrm{Mod}=\mathrm{Teich}/\mathrm{MCG}$。`,
    explain: R`模空间是"共形不等价的 Riemann 面"的集合，维数 $0$、$2$、$6g-6$（实）。Teichmüller 空间可缩，是模空间的万有覆叠；离散的映射类群（Dehn 扭转生成）把它折叠成模空间。

$g=1$：$\mathrm{Teich}=H$（上半平面），$\mathrm{MCG}=\mathrm{SL}(2,\Z)$，$\mathrm{Mod}=H/\mathrm{SL}(2,\Z)$——第 8 章的基本区域。`,
    analogy: R`Teichmüller 空间像一张无限延伸的墙纸，模空间是墙纸上的一个"花样单元"：全部信息都在单元里，墙纸只是它的重复。`,
    book_example: { what: R`\eqref{14.38} 与 \eqref{14.118}。`, point: R`$Z_g$ 是模空间上的积分 \eqref{14.95}。` },
    misconception: R`对 Teichmüller 空间积分会把每个曲面数无穷多次（$|\mathrm{MCG}|=\infty$），必须对模空间积分。`,
  },
  {
    id: "beltrami", name_zh: "Beltrami 微分与二次微分", name_en: "Beltrami & quadratic differentials", icon: "🎯", section_id: "14.2.3", group: "moduli",
    plain: R`Beltrami 微分 $\mu$ 描述"沿切片走一步"，二次微分 $\phi\in\ker\nabla^z_{(-2)}$ 是与规范正交的模方向。`,
    explain: R`改变模参数等于在 $\dd z$ 里混入一点 $\dd\bar z$：$|\dd z+\mu\,\dd\bar z|^2$，$\mu$ 是 Beltrami 微分。它一般含有规范分量；把这部分投影掉，剩下的就是全纯二次微分 $\phi=\phi_{zz}\dd z\otimes\dd z$。

二者的配对 $|\det(\mu,\phi)|^2/\det(\phi,\phi)$ 定义 Weil–Petersson 测度，与切片选取无关。`,
    analogy: R`Beltrami 微分像"实际走的路线"，二次微分像"标准坐标轴"；前者在后者上的投影才是真正的位移。`,
    book_example: { what: R`\eqref{14.126}：环面上 $\mu_{zz}=\mathrm{i}/2\tau_2$，\eqref{14.127} W-P 因子 $\tau_2^{-1}$。`, point: R`改变 $\tau$ = 混入 $\dd\bar z$。` },
    misconception: R`二次微分不是度规；它是余切丛平方的全纯截面，对应度规变形空间的对偶。`,
  },
  {
    id: "uniformization", name_zh: "单值化定理", name_en: "Uniformization theorem", icon: "🌐", section_id: "14.2.4", group: "moduli",
    plain: R`每个 Riemann 面共形等价于球面、平坦环面或 $H/G$（常曲率 $+,0,-$）。`,
    explain: R`这让我们在每个共形类中选一个"最好的"度规作为规范切片：常曲率度规。$g=1$ 时就是 $\C/L$ 上的平坦度规，计算极其简单；$g\ge2$ 时是 Poincaré 度规模 Fuchs 群。

曲率符号由 Gauss–Bonnet 固定：$\int\sqrt\gamma\mathcal{R}=4\pi(2-2g)$。`,
    analogy: R`无论一块橡皮泥怎么捏，只要不撕不粘，总能把它"熨平"成三种标准形状之一。`,
    book_example: { what: R`\eqref{14.119} 与习题 14.6：$\mathcal{R}=8,0,-2$。`, point: "常曲率代表。" },
    misconception: R`单值化说的是共形等价，不是等距：同一个复结构有无穷多个度规，常曲率的只有一个（归一化后）。`,
  },
  {
    id: "zeta_reg", name_zh: "ζ 函数正规化与 Kronecker 极限公式", name_en: "Zeta regularization", icon: "♾️", section_id: "14.3.2", group: "loop",
    plain: R`$\ln\det'\Delta=-\zeta_\Delta'(0)$；环面上 $\zeta_\Delta\propto\tau_2^sE(\tau,s)$，结果 $\det'\Delta/\tau_2=\tau_2|\eta|^4$。`,
    explain: R`无穷乘积 $\prod'\lambda_{m,n}$ 发散。$\zeta$ 正规化把它定义为 $\exp(-\zeta'(0))$，其中 $\zeta(s)=\sum'\lambda^{-s}$ 由 $\mathrm{Re}\,s>1$ 解析延拓到 $s=0$。

环面上 $\zeta$ 就是非全纯 Eisenstein 级数；函数方程把 $s=0$ 翻到 $s=1$，Kronecker 第一极限公式给出那里的常数项 $\propto\ln(\sqrt{\tau_2}|\eta|^2)$。`,
    analogy: R`像给发散的级数 $1+2+3+\cdots$ 赋予一个"合理"的有限值：不是去掉无穷大，而是用解析延拓找到唯一自然的定义。`,
    book_example: { what: R`\eqref{14.138}–\eqref{14.141}。`, point: R`$E(\tau,0)=-1$ 使面积项正好消掉。` },
    misconception: R`$\zeta$ 正规化不是随意的：在这里它保证了 $\det'\Delta/\tau_2$ 的模不变性（$\zeta(0)=-1$ 与面积缩放恰好配合）。`,
  },
  {
    id: "modular_inv", name_zh: "模不变性", name_en: "Modular invariance", icon: "♾️", section_id: "14.3.2", group: "loop",
    plain: R`$\tau$ 与 $(a\tau+b)/(c\tau+d)$ 描述同一个环面；$\dd^2\tau/\tau_2^2$ 与 $\tau_2^{-12}|\eta|^{-48}$ 各自不变。`,
    explain: R`模群 $\mathrm{SL}(2,\Z)$（由 $T:\tau\to\tau+1$、$S:\tau\to-1/\tau$ 生成）就是环面的映射类群。振幅只依赖于共形类，所以被积函数必须是模不变函数，积分区域是基本区域。

$\eta$ 是权 $\frac12$ 的模形式，$\Delta=(2\pi)^{12}\eta^{24}$ 是权 12 的尖点形式；$\tau_2^{-12}|\Delta|^{-2}$ 的权恰好抵消。`,
    analogy: R`同一个甜甜圈可以用无数种"切法"摊平成平行四边形；模变换就是在不同切法之间换算。`,
    book_example: { what: R`\eqref{14.147}；交互图 1 在任意 $\tau$ 处数值核对。`, point: "测度与被积函数分别不变。" },
    misconception: R`$\eta$ 本身不是模不变的（它在 $T$ 下多一个 24 次单位根），只有 $\tau_2^{1/4}|\eta|$ 这样的组合才是。`,
  },
  {
    id: "tachyon", name_zh: "能级匹配与迅子", name_en: "Level matching & tachyon", icon: "⚡", section_id: "14.3.2", group: "loop",
    plain: R`$|\eta|^{-48}=|q|^{-2}\sum d_Nd_{\tilde N}q^N\bar q^{\tilde N}$；对 $\tau_1$ 积分留下 $N=\tilde N$；$N=0$ 是迅子，使 $Z_1$ 在 $\tau_2\to\infty$ 发散。`,
    explain: R`$\eta^{-24}$ 是 24 个横向振子的配分函数（$q^{-1}$ 来自零点能 $-1$）。对 $\tau_1$ 积分投影到左右能级相等的态：$\frac{\alpha'}4m^2=N-1$。

$N=0$：$m^2<0$ 的迅子；$N=1$：576 个无质量态（引力子、$B$ 场、伸缩子）。迅子贡献 $\mathrm{e}^{4\pi\tau_2}$，在尖点处使积分发散——玻色弦真空不稳定的信号。（本站补充的物理解读。）`,
    analogy: R`像一个乐器的泛音表：$q$ 展开的每一项是一个"音"（质量能级），系数是同一音高下有多少种发声方式。`,
    book_example: { what: R`交互图 4：$\int\dd\tau_1|\eta|^{-48}=\sum d_N^2\mathrm{e}^{-4\pi\tau_2(N-1)}$。`, point: R`$d_1^2=576$。` },
    misconception: R`发散不是计算错误：它是玻色弦的物理问题；超弦中迅子被投影掉，$Z_1=0$。`,
  },
];

export const relations = [
  { from: "riemann_surface", to: "helicity", label: "纯 z 指标" },
  { from: "helicity", to: "cov_deriv", label: "协变导数" },
  { from: "cov_deriv", to: "riemann_roch", label: "热核指标" },
  { from: "polyakov", to: "gauge_slice", label: "规范冗余" },
  { from: "gauge_slice", to: "fp_measure", label: "Jacobi 因子" },
  { from: "fp_measure", to: "ckv", label: R`$\ker P_1$` },
  { from: "fp_measure", to: "weyl_anomaly", label: "测度依赖 σ" },
  { from: "riemann_roch", to: "moduli", label: "数维数" },
  { from: "riemann_roch", to: "ckv", label: "数维数" },
  { from: "fp_measure", to: "beltrami", label: R`$\ker P_1^\dagger$` },
  { from: "uniformization", to: "beltrami", label: "常曲率切片" },
  { from: "moduli", to: "modular_inv", label: R`$g=1$` },
  { from: "beltrami", to: "zeta_reg", label: R`W-P $\times$ 行列式` },
  { from: "zeta_reg", to: "modular_inv", label: R`$\tau_2|\eta|^4$` },
  { from: "modular_inv", to: "tachyon", label: R`$q$ 展开` },
  { from: "riemann_surface", to: "uniformization", label: "常曲率代表" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**Riemann 面的几何**：二维度规局部 $\mathrm{e}^{2\sigma}|\dd z|^2$，共形类 = 复结构；张量按螺旋度 $n$ 分类为 $\mathcal{T}^n$；$\nabla^z_{(n)}$、$\nabla_z^{(n)}$ 互为负伴随，$\Delta^+_{(n)}-\Delta^-_{(n)}=-\frac12n\mathcal{R}$；热核给出 **Riemann–Roch**：$\ind\nabla_z^{(n)}=(2n-1)(g-1)$。`}</TxI>,
  <TxI>{R`**Faddeev–Popov**：$Z_g=\int\mathcal{D}X\mathcal{D}\gamma\,\mathrm{e}^{-S}/V(\mathrm{Diff}*\mathrm{Weyl})$。度规变形 $=\{\text{conf}\}\oplus\{\operatorname{im}P_1\}\oplus\{\ker P_1^\dagger\}$：Weyl 方向、规范方向（鬼行列式 $\det'P_1^\dagger P_1$）、模方向（全纯二次微分）；CKV $=\ker P_1$ 单独除掉。`}</TxI>,
  <TxI>{R`**计数**：CKV 数 − 二次微分数 $=3-3g$（\eqref{14.113}）；实维数 CKV $6,2,0$，Teich $0,2,6g-6$。**临界维数**：测度的 Weyl 反常 $\propto D-26$，只有 $D=26$ 时规范体积能整体除掉。`}</TxI>,
  <TxI>{R`**模空间**：$\mathrm{Mod}=\mathrm{Teich}/\mathrm{MCG}$；单值化定理让规范切片取常曲率度规，定义 Weil–Petersson 测度。$g$ 圈振幅 = 模空间上的有限维积分 \eqref{14.117}。`}</TxI>,
  <TxI>{R`**单圈**：$V(\mathrm{CKV})=\tau_2^2$、W-P 因子 $\tau_2^{-1}$、鬼 = 物质 Laplacian；$\zeta$ 正规化 + Kronecker 极限公式 ⇒ $\det'\Delta/\tau_2=\tau_2|\eta|^4$；$Z_1=\int_{\mathrm{Mod}}\frac{\dd^2\tau}{\tau_2^2}\tau_2^{-12}|\eta(\tau)|^{-48}$，测度与被积函数分别模不变；$q$ 展开读出迅子与 576 个无质量态。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`为什么带度规的可定向二维曲面自动是复流形？`,
    options: [R`因为任何二维流形都可以嵌入 $\C$`, R`因为等温坐标存在，而两张共形平坦的卡之间、保定向的坐标变换必为全纯`, R`因为 Euler 示性数是偶数`, R`因为 Christoffel 记号只有一个分量`],
    answer: 1, why: R`\eqref{14.7}–\eqref{14.8}：$\dd w\otimes\dd\bar w\propto\dd z\otimes\dd\bar z$ 要求 $\partial w/\partial\bar z=0$（或反全纯，但那会反转定向）。`,
  },
  {
    q: R`Riemann–Roch 定理取 $n=-1$ 给出 $\dim_{\C}\ker\nabla_z^{(-1)}-\dim_{\C}\ker\nabla^z_{(-2)}=3-3g$。对 $g=1$，下列哪个说法正确？`,
    options: [R`没有 CKV，也没有二次微分`, R`CKV 与二次微分各有 1 个复维数`, R`有 3 个复 CKV，没有二次微分`, R`有 3 个二次微分`],
    answer: 1, why: R`$g=1$ 时差为 0；$K$ 平凡，全纯向量场与全纯二次微分都是常数倍的 $\partial_z$、$\dd z\otimes\dd z$，各 1 个复维数（交互图 2）。`,
  },
  {
    q: R`共形 Killing 向量为什么要单独除掉 $V(\mathrm{CKV})$？`,
    options: [R`因为它们不满足 Killing 方程`, R`因为它们生成的微分同胚可以被 Weyl 变换抵消，在 $\mathrm{Diff}*\mathrm{Weyl}$ 中被重复计入`, R`因为它们是物理的模参数`, R`因为它们只在 $g\ge2$ 时存在`],
    answer: 1, why: R`$\delta v\in\ker P_1$ 时 $\delta_{\rm D}\gamma=(\nabla\cdot\delta v)\gamma$，与 $\delta\phi=\nabla\cdot\delta v$ 的 Weyl 变换相同：这是 Diff 与 Weyl 的交集（\eqref{14.63}）。`,
  },
  {
    q: R`临界维数 $D=26$ 来自哪里？`,
    options: [R`Polyakov 作用量的经典 Weyl 不变性只在 26 维成立`, R`物质测度的 Weyl 反常（系数 $\propto D$）与度规测度/鬼场的反常（系数 $\propto-26$）相消`, R`Teichmüller 空间的维数是 26`, R`$\eta$ 函数的权`],
    answer: 1, why: R`\eqref{14.84a}：经典作用量在任何 $D$ 下都 Weyl 不变（\eqref{14.36}）；反常来自测度。`,
  },
  {
    q: R`单圈振幅中 $\tau_2^{-12}$ 与 $|\eta|^{-48}$ 中的"12"和"48"从何而来？`,
    options: [R`都来自 26 个 $X^\mu$`, R`物质给 $(\det'\Delta/\tau_2)^{-13}$，鬼场给 $(\det'\Delta/\tau_2)^{+1}$，合起来 $(\tau_2|\eta|^4)^{-12}$——相当于 24 个横向自由度`, R`来自 CKV 的体积 $\tau_2^2$`, R`来自 Weil–Petersson 测度`],
    answer: 1, why: R`\eqref{14.129} 与 \eqref{14.141}：$26-2=24$，鬼场抵消了两个纵向（光锥）自由度。`,
  },
  {
    q: R`为什么 $Z_1$ 的积分区域是基本区域而不是整个上半平面？`,
    options: [R`因为上半平面积分发散而基本区域积分收敛`, R`因为 $\tau$ 与 $\gamma\tau$（$\gamma\in\mathrm{SL}(2,\Z)$）描述同一个环面，对 $H$ 积分会把每个环面数无穷多次`, R`因为 Kronecker 极限公式只在基本区域成立`, R`因为 $\eta$ 在基本区域外为零`],
    answer: 1, why: R`\eqref{14.95}：$\frac{1}{|\mathrm{MCG}|}\int_{\mathrm{Teich}}=\int_{\mathrm{Mod}}$；被积函数与测度模不变保证了这样做有意义。注意基本区域上的积分仍因迅子在 $\tau_2\to\infty$ 发散。`,
  },
];

// ---------- 全书回望 ----------
export const BRIDGE = R`这是全书的最后一章，也是一次"总复习"——单圈振幅的每一个因子都调用了前面某一章的工具：


**第 1 章（路径积分）**：$Z=\int\mathcal{D}X\mathcal{D}\gamma\,\mathrm{e}^{-S}$ 是第 1 章路径积分的二维推广；对 $X$ 的 Gauss 积分给出 $(\det'\Delta)^{-13}$，零模给出时空体积。

**第 2 章（群与映射）**：规范群 $\mathrm{Diff}*\mathrm{Weyl}$ 的半直积、商空间 $\mathcal{M}_g/G$、$\mathrm{SL}(2,\Z)$ 与 $\mathrm{SL}(2,\C)$。

**第 3–4 章（同调与同伦）**：亏格 $g$、Euler 示性数 $\chi=2-2g$、映射类群由 Dehn 扭转生成（\figref{14.3}）。

**第 5–6 章（流形与 de Rham 上同调）**：Lie 导数 $\mathcal{L}_{\delta v}\gamma$、Stokes 定理（分部积分 \eqref{14.23a}）、Gauss–Bonnet $\int\sqrt\gamma\mathcal{R}=4\pi\chi$。

**第 7 章（Riemann 几何）**：等温坐标（例 7.9）、共形 Killing 向量（\secref{7.7}）、Weyl 重标度、Polyakov 作用量（\secref{7.11}）、Laplace–Beltrami 算子 \eqref{7.188}。

**第 8 章（复流形）**：Riemann 面是复流形、Hermite 联络 \eqref{8.69}、复环面 $\C/L$ 与模参数 $\tau$、基本区域（\secref{8.1}，例 8.2）。

**第 9–10 章（纤维丛与联络）**：$\mathcal{T}^n$ 是线丛 $K^{\mp n}$ 的截面，$2n\partial_z\sigma$ 是 U(1) 联络，曲率 $\mathcal{F}$。

**第 11 章（示性类）**：$\chi(\Sigma_g)$ 是 Euler 类的积分，旋量的存在由 Stiefel–Whitney 类决定。

**第 12 章（指标定理）**：Riemann–Roch 定理 \eqref{14.27} 由热核指标公式（\sref{T12.5}、\sref{T12.2}）推出，它决定了 CKV 与模参数的个数。

一个计算用到全书几乎所有的数学——这或许正是 Nakahara 把弦论放在最后的用意：几何、拓扑与物理在这里不再是三门学科，而是同一个问题的三种语言。`;
