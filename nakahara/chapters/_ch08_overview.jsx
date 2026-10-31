// 第 8 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。纯数据（TAKEAWAYS 为 TxI 元素）。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "甜甜圈有多少种形状、弦论为什么需要复几何";
export const HOOK = R`**同一个甜甜圈，许多种"复的形状"。**拿一张平行四边形的纸，把对边粘起来，就得到环面。平行四边形的形状由一个复数 $\tau$（两条边之比）描述。拓扑上所有这些环面都一样；但如果要求粘合是"全纯的"——在每一小块上都像复平面——那么不同的 $\tau$ 一般给出**不能**全纯地互相变形的环面。只有相差模群 $\mathrm{PSL}(2,\Z)$ 的 $\tau$ 才是同一个复环面，所以全部"复形状"构成一个基本区域（图 8.3）。弦论的单圈真空振幅正是对这个基本区域积分；本章的交互图 1 让你亲手把任意 $\tau$ 约化进去。

**额外维度的形状。**超弦理论生活在十维时空中。为了看起来像四维，其余六维必须卷成一个微小的紧空间，而且为了保留超对称，这个空间必须是复三维的、Kähler 的、Ricci 平坦的——**Calabi–Yau 流形**。它的 Hodge 数 $b^{1,1}$、$b^{2,1}$ 数出低能物理中无质量场的个数，Euler 数的一半给出费米子的"代"数。

**乘以 $\mathrm{i}$ 的几何。**这一切的起点很朴素：在复平面上，乘以 $\mathrm{i}$ 就是转 $90^\circ$。复流形的每个切空间里都有一个处处定义、与坐标无关的"转 $90^\circ$"操作 $J$。它把形式分成 $(r,s)$ 型、把外微分拆成 $\partial+\bar\partial$；当度规也尊重它、且相应的 Kähler 形式闭合时，复结构与 Riemann 几何完全咬合，拓扑（Betti 数）被复几何（Hodge 数）精确地拆开。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "8.1", title: "复流形与例子", gist: R`卡同胚于 $\C^m$、转移函数全纯。$S^2=\CP^1$（$W=1/Z$）；复环面 $\C/L(\omega_1,\omega_2)$ 的复结构由 $\tau\in\mathrm{H}/\mathrm{PSL}(2,\Z)$ 决定；$\CP^n$、$G_{k,n}(\C)$、代数簇。`, gives: ["8.1", "8.2", "8.5", "8.6"], next: R`有了全纯卡，切空间里多出一个结构。` },
  { sec: "8.2", title: "复化与殆复结构", gist: R`复化 $T_pM^\C$；基 $\partial/\partial z$、$\partial/\partial\bar z$ 与 $\dd z$、$\dd\bar z$；$J$（转 $90^\circ$）与卡无关，$J^2=-1$，本征空间 $T_pM^\pm$ 给出全纯 / 反全纯向量。`, gives: ["8.13a", "8.15b", "8.16", "8.18", "8.22", "8.23"], next: R`对偶地，形式也一分为二。` },
  { sec: "8.3", title: "复微分形式与 Dolbeault 算子", gist: R`$(r,s)$ 形式；$\Omega^q(M)^\C=\bigoplus\Omega^{r,s}(M)$；$\dd=\partial+\bar\partial$，$\bar\partial^2=0$；全纯形式；Dolbeault 复形与 $H^{r,s}_{\bar\partial}$。`, gives: ["8.35", "8.36b", "8.40", "8.42a", "8.46"], next: R`加上度规，要求它与 $J$ 相容。` },
  { sec: "8.4", title: "Hermite 几何", gist: R`$g(JX,JY)=g(X,Y)$ ⇒ 只剩 $g_{\mu\bar\nu}$；Kähler 形式 $\Omega=\mathrm{i}g_{\mu\bar\nu}\dd z\wedge\dd\bar z$；复流形可定向；Hermite 联络 $\Gamma=g^{-1}\partial g$；曲率只剩 $R^\kappa{}_{\lambda\bar\mu\nu}$；Ricci 形式 $\mathrm{i}\bar\partial\partial\log G$ 与 $c_1$。`, gives: ["8.53", "8.58", "8.69", "8.75a", "8.79"], next: R`若 Kähler 形式闭合，一切都更好。` },
  { sec: "8.5", title: "Kähler 流形", gist: R`$\dd\Omega=0$ ⇔ $\nabla J=0$ ⇔ $g_{\mu\bar\nu}=\partial_\mu\partial_{\bar\nu}\mathcal{K}$；$\C^m$、Riemann 面、$\CP^m$（Fubini–Study）；无挠、Ricci 形式 = Ricci 张量；Ricci 平坦 ⇒ $c_1=0$；Calabi–Yau 和乐 $\subset\mathrm{SU}(m)$。`, gives: ["8.82", "8.83", "8.86", "8.95", "8.96a", "8.101"], next: R`Kähler 条件对拓扑有什么约束？` },
  { sec: "8.6", title: "调和形式与 Hodge 数", gist: R`伴随 $\bar\partial^\dagger=-*\partial*$；$\Delta_{\bar\partial}$；复 Hodge 定理：$H^{r,s}_{\bar\partial}\cong\mathrm{Harm}^{r,s}$；Kähler 时 $\Delta=2\Delta_{\bar\partial}$ ⇒ Hodge 菱形双重对称、$b^p=\sum b^{r,s}$、奇 Betti 数为偶、$b^{2p}\ge1$。`, gives: ["8.108", "8.113a", "8.114", "8.116", "8.117", "8.118"], next: R`回头问：$J$ 什么时候来自复结构？` },
  { sec: "8.7", title: "殆复流形", gist: R`只要求 $J^2=-1$；可积 ⇔ 全纯向量场对括号封闭 ⇔ Nijenhuis 张量为零 ⇔ 复流形（Newlander–Nirenberg）。`, gives: ["8.124", "8.125"], next: R`最后放宽"流形"本身。` },
  { sec: "8.8", title: "轨形", gist: R`$M/G$（$G$ 离散）：不动点成为曲率集中的锥形奇点，绕它的和乐是 $G$ 的元素；$T^2/\Z_3\cong S^2$；$T^6/\Z_3$ 有 27 个奇点。`, gives: [] },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "8.1", to: "8.13b", label: R`$\partial_{\bar z}f=0\iff$ CR` },
  { from: "8.13a", to: "8.15b", label: "对偶基" },
  { from: "8.16", to: "8.20", label: "复基下对角化" },
  { from: "8.20", to: "8.23", label: R`本征空间 $\pm\mathrm{i}$` },
  { from: "8.23", to: "8.36b", label: "对偶：双次分解" },
  { from: "8.36b", to: "8.40", label: R`$\dd$ 按双次拆开` },
  { from: "8.40", to: "8.42a", label: R`$\dd^2=0$ 按双次` },
  { from: "8.42a", to: "8.46", label: R`$\bar\partial^2=0$` },
  { from: "8.50", to: "8.53", label: R`$g_{\mu\nu}=0$` },
  { from: "8.53", to: "8.58", label: R`$\Omega=g(J\cdot,\cdot)$` },
  { from: "8.53", to: "8.69", label: "度规相容 + 不混合" },
  { from: "8.69", to: "8.73a", label: "挠率" },
  { from: "8.69", to: "8.75a", label: "曲率" },
  { from: "8.75a", to: "8.79", label: R`取迹，$\log G$` },
  { from: "8.58", to: "8.82", label: R`$\dd\Omega=0$` },
  { from: "8.82", to: "8.83", label: "局部可积" },
  { from: "8.82", to: "8.96a", label: "代入挠率" },
  { from: "8.83", to: "8.95", label: R`$\mathcal{K}=\log(1+|\zeta|^2)$` },
  { from: "8.79", to: "8.101", label: R`迹 = $\mathfrak{u}(1)$ 部分` },
  { from: "8.106", to: "8.108", label: "Stokes" },
  { from: "8.108", to: "8.113a", label: "Hodge 分解" },
  { from: "8.96a", to: "8.114", label: "Kähler 恒等式" },
  { from: "8.114", to: "8.116", label: "共轭" },
  { from: "8.114", to: "8.118", label: "调和形式按双次分解" },
  { from: "8.118", to: "8.119", label: R`$+$\eqref{8.116}` },
  { from: "8.124", to: "8.125", label: "分量展开" },
];
export const EQMAP_LABELS = {
  "8.1": "Cauchy–Riemann", "8.13a": R`$\partial/\partial z$`, "8.13b": R`$\partial/\partial\bar z$`, "8.15b": "复对偶基", "8.16": R`殆复结构 $J$`,
  "8.20": R`$J=\pm\mathrm{i}$`, "8.23": R`$T^+\oplus T^-$`, "8.36b": R`$(r,s)$ 分解`, "8.40": R`$\dd=\partial+\bar\partial$`, "8.42a": R`$\bar\partial^2=0$`,
  "8.46": R`$H^{r,s}_{\bar\partial}$`, "8.50": "Hermite 度规", "8.53": R`只剩 $g_{\mu\bar\nu}$`, "8.58": "Kähler 形式", "8.69": "Hermite 联络",
  "8.73a": "挠率", "8.75a": "曲率", "8.79": "Ricci 形式", "8.82": "Kähler 条件", "8.83": "Kähler 势", "8.95": "Fubini–Study",
  "8.96a": "Kähler ⇒ 无挠", "8.101": R`$\mathfrak{u}=\mathfrak{su}\oplus\mathfrak{u}(1)$`, "8.106": "伴随算子", "8.108": R`$\partial^\dagger=-*\bar\partial*$`,
  "8.113a": "复 Hodge 分解", "8.114": R`$\Delta=2\Delta_{\bar\partial}$`, "8.116": R`$b^{r,s}=b^{s,r}$`, "8.118": R`$b^p=\sum b^{r,s}$`, "8.119": "奇 Betti 数为偶",
  "8.124": "Nijenhuis 张量", "8.125": "分量公式",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "struct", label: "复结构" },
  { id: "forms", label: "复形式与上同调" },
  { id: "metric", label: "Hermite 与 Kähler 几何" },
];

export const concepts = [
  {
    id: "complex_manifold", name_zh: "复流形", name_en: "Complex manifold", icon: "🌀", section_id: "8.1", group: "struct",
    plain: R`坐标卡取值于 $\C^m$、卡与卡之间用全纯函数粘起来的流形。`,
    explain: R`与微分流形（第 5 章）相比，只改了两处：卡 $\varphi_i:U_i\to\C^m$，转移函数 $\psi_{ji}=\varphi_j\circ\varphi_i^{-1}$ 必须全纯（满足 Cauchy–Riemann 方程）。

全纯性是非常刚性的条件：紧复流形上的全纯函数只能是常数；同一个拓扑空间可以有一族由有限个复参数描述的、互不等价的复结构（模空间）。复流形的实维数必为偶数，且总是可定向的。`,
    analogy: "像用相互重叠的复平面小块拼一张大地图，但相邻两块的对应关系不只是光滑的，而是保角的旋转加缩放——任何一点附近都不允许有剪切或翻转。",
    book_example: { what: R`例 8.1：$S^2$ 的北极、南极球极投影坐标 $Z$、$W$ 满足 $W=1/Z$；例 8.3：$\CP^n$ 的转移函数是乘以 $z^\nu/z^\mu$。`, point: "两张卡、一个全纯转移函数就能定义 Riemann 球面。" },
    misconception: R`"偶数维流形把坐标两两配对就是复流形"——不对：配对后的转移函数还得全纯；$S^4$ 甚至连殆复结构都没有。`,
  },
  {
    id: "modular", name_zh: "模参数与模群", name_en: "Modular parameter", icon: "🍩", section_id: "8.1.2", group: "struct",
    plain: R`复环面的"复形状"由 $\tau=\omega_2/\omega_1$ 决定，但只在 $\mathrm{PSL}(2,\Z)$ 作用下有意义。`,
    explain: R`$\C/L(\omega_1,\omega_2)$ 与 $\C/L(\tilde\omega_1,\tilde\omega_2)$ 全纯等价，当且仅当两组周期相差一个复数倍与一个 $\mathrm{SL}(2,\Z)$ 矩阵（\eqref{8.5}）。归一化 $\omega_1=1$ 后，$\tau$ 与 $(a\tau+b)/(c\tau+d)$ 等价。

模群由 $T:\tau\mapsto\tau+1$（Dehn 扭转）与 $S:\tau\mapsto-1/\tau$（交换两条闭曲线）生成；不等价的复环面与基本区域 $|\mathrm{Re}\,\tau|\le\frac12,\ |\tau|\ge1$ 中的点一一对应。`,
    analogy: "像描述一块平行四边形瓷砖铺成的墙：换一组能铺出同一面墙的瓷砖（换格的基）、或者把整面墙放大旋转，都不改变它；真正的不变量只有一个复数。",
    book_example: { what: R`图 8.3 的基本区域；图 8.4 的 Dehn 扭转与 $l\leftrightarrow m$ 交换。`, point: R`$\mathrm{H}/\mathrm{PSL}(2,\Z)$ 就是环面复结构的模空间。` },
    misconception: R`"$\tau$ 与 $\tau+1$ 是不同的环面"——它们给出同一个格 $\{m+n\tau\}$，所以是同一个复环面。`,
  },
  {
    id: "almost_complex", name_zh: "殆复结构 J", name_en: "Almost complex structure", icon: "↻", section_id: "8.2.3", group: "struct",
    plain: R`每个切空间里与坐标无关的"转 $90^\circ$"操作：$J^2=-1$。`,
    explain: R`在全纯坐标中 $J\partial_x=\partial_y$、$J\partial_y=-\partial_x$；全纯坐标变换与 $J$ 可交换，所以 $J$ 是整体定义的张量。在复基下 $J=\mathrm{diag}(\mathrm{i},-\mathrm{i})$，$T_pM^\C=T_pM^+\oplus T_pM^-$。

反过来，只给一个满足 $J^2=-1$ 的张量场（殆复流形）并不保证有全纯坐标；判据是 Nijenhuis 张量 $N(X,Y)=[X,Y]+J[JX,Y]+J[X,JY]-[JX,JY]$ 为零（Newlander–Nirenberg）。`,
    analogy: "复平面上乘以 i 就是逆时针转 90°。复流形在每一点都有这样一个转向器，而且相邻点的转向器彼此协调——就像一大片罗盘都对准同一个规则。",
    book_example: { what: R`\eqref{8.18}：$J=\begin{pmatrix}0&-I_m\\ I_m&0\end{pmatrix}$；\eqref{8.22}：$J=\mathrm{diag}(\mathrm{i}I_m,-\mathrm{i}I_m)$。`, point: "同一个算子，在实基下是转动、在复基下是对角的。" },
    misconception: R`"$J^2=-1$ 就够了"——那只是殆复结构；可积性（$N=0$）是额外的一阶微分条件。`,
  },
  {
    id: "rs_forms", name_zh: "(r,s) 形式", name_en: "Forms of bidegree (r,s)", icon: "🧮", section_id: "8.3.2", group: "forms",
    plain: R`含 $r$ 个 $\dd z$ 与 $s$ 个 $\dd\bar z$ 的复微分形式。`,
    explain: R`复 $q$ 形式唯一地分解为 $\sum_{r+s=q}\omega^{(r,s)}$；$\dim_\C\Omega^{r,s}_p=\binom mr\binom ms$。共轭把 $(r,s)$ 变成 $(s,r)$，外积把双次相加。

度规、Kähler 形式（$(1,1)$ 型）、Ricci 形式、曲率形式都按双次归类，这让复几何的计算大大简化。`,
    analogy: R`像把多项式按 $z$ 的次数与 $\bar z$ 的次数双重分级：$z^2\bar z$ 是 $(2,1)$ 型。乘法时次数相加，取共轭时两个次数对调。`,
    book_example: { what: R`\eqref{8.35}：$\omega=\frac1{r!s!}\omega_{\mu_1\ldots\bar\nu_s}\dd z^{\mu_1}\wedge\cdots\wedge\dd\bar z^{\nu_s}$；习题 8.6 的维数计数。`, point: R`$\sum_{r+s=q}\binom mr\binom ms=\binom{2m}q$。` },
    misconception: R`双次需要复结构；全纯坐标变换保持双次，但一般的光滑坐标变换会把 $\dd z$ 与 $\dd\bar z$ 混起来。`,
  },
  {
    id: "dolbeault", name_zh: R`Dolbeault 算子与 $\bar\partial$ 上同调`, name_en: "Dolbeault operators & cohomology", icon: "🪞", section_id: "8.3.3", group: "forms",
    plain: R`外微分拆成两半 $\dd=\partial+\bar\partial$；$\bar\partial^2=0$ 给出比 de Rham 更细的上同调 $H^{r,s}_{\bar\partial}$。`,
    explain: R`$\partial$ 把 $(r,s)$ 送到 $(r+1,s)$，$\bar\partial$ 送到 $(r,s+1)$。$\dd^2=0$ 按双次拆开得 $\partial^2=\bar\partial^2=\partial\bar\partial+\bar\partial\partial=0$。$\bar\partial f=0$ 正是 Cauchy–Riemann 方程。

$H^{r,s}_{\bar\partial}=\ker\bar\partial/\mathrm{im}\,\bar\partial$ 依赖复结构；紧 Hermite 流形上每个类有唯一的 $\Delta_{\bar\partial}$ 调和代表，其维数是 Hodge 数 $b^{r,s}$。`,
    analogy: "就像把一条河的流量拆成东西向和南北向两部分分别统计：每一部分各自守恒，因而能得到比总流量更细的信息。",
    book_example: { what: R`\eqref{8.45} 的 Dolbeault 复形；\eqref{8.42a}–\eqref{8.42d}。`, point: R`$H^{0,0}_{\bar\partial}$ = 全纯函数；$H^{r,0}_{\bar\partial}$ = 全纯 $r$ 形式。` },
    misconception: R`"$\bar\partial$ 闭就是 $\dd$ 闭"——不对；但在紧 Kähler 流形上，调和代表同时满足两者。`,
  },
  {
    id: "hermitian", name_zh: "Hermite 度规与 Hermite 联络", name_en: "Hermitian metric & connection", icon: "📐", section_id: "8.4", group: "metric",
    plain: R`与 $J$ 相容的度规（$J$ 是等距），只有混合分量 $g_{\mu\bar\nu}$；配套的联络不混合全纯与反全纯指标。`,
    explain: R`任何复流形都有 Hermite 度规（对 $J$ 平均）。$g_{\mu\bar\nu}$ 是正定 Hermite 矩阵。Hermite 联络 $\Gamma^\lambda{}_{\kappa\mu}=g^{\bar\nu\lambda}\partial_\kappa g_{\mu\bar\nu}$ 由"度规相容 + 不混合类型"唯一决定，满足 $\nabla J=0$。

它一般有挠率 $T^\lambda{}_{\mu\nu}=g^{\bar\xi\lambda}(\partial_\mu g_{\nu\bar\xi}-\partial_\nu g_{\mu\bar\xi})$；曲率只剩一类分量 $R^\kappa{}_{\lambda\bar\mu\nu}=\partial_{\bar\mu}(g^{\bar\xi\kappa}\partial_\nu g_{\lambda\bar\xi})$。`,
    analogy: R`像量子力学里的内积 $\langle\psi|\phi\rangle$：对第二个参数取共轭才正定。Hermite 度规就是切空间上的这种内积。`,
    book_example: { what: R`\eqref{8.53}、\eqref{8.69}、\eqref{8.75a}；例 8.6：$\C^m$ 上 $g_{\mu\bar\nu}=\frac12\delta_{\mu\nu}$。`, point: "复几何的曲率公式比实 Riemann 几何简单得多。" },
    misconception: R`"Hermite 联络就是 Levi-Civita 联络"——只有在 Kähler 流形上才是。`,
  },
  {
    id: "kahler_form", name_zh: "Kähler 形式", name_en: "Kähler form", icon: "🔲", section_id: "8.4.2", group: "metric",
    plain: R`$\Omega(X,Y)=g(JX,Y)$：度规与复结构合成的实 $(1,1)$ 形式，$\Omega=\mathrm{i}g_{\mu\bar\nu}\dd z^\mu\wedge\dd\bar z^\nu$。`,
    explain: R`$\Omega$ 反对称、$J$ 不变、实。$\Omega^m=m!\,\mathrm{vol}_g$ 处处不为零，所以复流形可定向。

平直 $\C^m$ 上 $\Omega=\sum\dd x^\mu\wedge\dd y^\mu$——正是标准辛形式。Kähler 流形就是 $\Omega$ 闭合的 Hermite 流形，因而同时是辛流形。`,
    analogy: R`在每个复坐标平面上，$\Omega$ 量的是"有向面积"。度规量长度，复结构给出转向，二者合起来就是面积。`,
    book_example: { what: R`\eqref{8.55}–\eqref{8.60}；引理 8.1；\eqref{8.86}。`, point: R`$\Omega$ 的最高次幂是体积元。` },
    misconception: R`$\dd z\wedge\dd\bar z=-2\mathrm{i}\,\dd x\wedge\dd y$，所以 $\frac{\mathrm{i}}{2}\dd z\wedge\dd\bar z=\dd x\wedge\dd y$——常见的符号与因子错误之源（原书 \eqref{8.86} 也在此出错）。`,
  },
  {
    id: "kahler", name_zh: "Kähler 流形与 Kähler 势", name_en: "Kähler manifold", icon: "💎", section_id: "8.5", group: "metric",
    plain: R`Kähler 形式闭合的 Hermite 流形；度规局部是一个实函数的 $\partial\bar\partial$：$g_{\mu\bar\nu}=\partial_\mu\partial_{\bar\nu}\mathcal{K}$。`,
    explain: R`等价条件：$\dd\Omega=0$ ⇔ $\nabla J=0$（Levi-Civita）⇔ $\partial_\lambda g_{\mu\bar\nu}=\partial_\mu g_{\lambda\bar\nu}$ ⇔ Hermite 联络无挠。Kähler 势在换卡时可差一个全纯函数加反全纯函数。

例子：$\C^m$（$\mathcal{K}=\frac12|z|^2$）、所有 Riemann 面、$\CP^m$ 的 Fubini–Study 度规（$\mathcal{K}=\log(1+|\zeta|^2)$）以及其中的一切光滑代数簇。`,
    analogy: "整张度规表（$m^2$ 个函数）由一个势函数生成，就像静电场由一个电势生成——这让 Kähler 几何的计算变得出奇地简单。",
    book_example: { what: R`例 8.8：$\CP^m$ 的 Fubini–Study 度规 \eqref{8.95}，正定性来自 Cauchy–Schwarz 不等式。`, point: R`$\CP^1$ 上 $\mathfrak{R}=2\Omega$，$\int c_1=2=\chi(S^2)$。` },
    misconception: R`"每个复流形都是 Kähler 的"——$S^1\times S^3$（Hopf 曲面）有复结构但 $b^1=1$ 为奇数，不可能 Kähler。`,
  },
  {
    id: "chern1", name_zh: "Ricci 形式与第一陈类", name_en: "Ricci form & first Chern class", icon: "🎯", section_id: "8.4.4", group: "metric",
    plain: R`曲率的迹给出闭的实 $(1,1)$ 形式 $\mathfrak{R}=\mathrm{i}\bar\partial\partial\log G$；它的上同调类 $c_1=[\mathfrak{R}/2\pi]$ 与度规无关。`,
    explain: R`$\mathfrak{R}$ 闭（$\partial\bar\partial=-\frac12\dd(\partial-\bar\partial)$）但一般不恰当，因为 $\log G$ 换卡时变化。度规的变化只给 $\mathfrak{R}$ 加一个恰当形式，所以 $c_1(M)$ 是复流形的拓扑不变量。

在 Kähler 流形上 $\mathfrak{R}_{\mu\bar\nu}=\mathrm{Ric}_{\mu\bar\nu}$；存在 Ricci 平坦度规 ⇒ $c_1=0$。`,
    analogy: "像一张弯曲曲面上的总曲率（Gauss–Bonnet）：你可以随意局部改动曲面的形状，总量却由拓扑锁死。",
    book_example: { what: R`\eqref{8.78}、\eqref{8.79}、命题 8.2；$\CP^1$ 上 $\int\mathfrak{R}/2\pi=2$。`, point: "第 11 章将系统讨论陈类。" },
    misconception: R`"$\mathfrak{R}$ 闭，所以恰当"——闭不等于恰当；$c_1$ 正是度量这一差距。`,
  },
  {
    id: "calabi_yau", name_zh: "Calabi–Yau 流形", name_en: "Calabi–Yau manifold", icon: "🪐", section_id: "8.5.2", group: "metric",
    plain: R`第一陈类为零的紧 Kähler 流形；Yau 定理保证它有 Ricci 平坦度规，和乐群 $\subset\mathrm{SU}(m)$。`,
    explain: R`Calabi 猜想（Yau 1977 证明）：$c_1=0$ 的紧 Kähler 流形在每个 Kähler 类里有唯一的 Ricci 平坦度规。Ricci 平坦 ⇔ 和乐的 $\mathfrak{u}(1)$ 部分为零 ⇔ 和乐 $\subset\mathrm{SU}(m)$ ⇒ 存在平行旋量。

复一维：环面；复二维：K3；复三维：如 $\CP^4$ 中的五次超曲面（$b^{1,1}=1$，$b^{2,1}=101$，$\chi=-200$）。`,
    analogy: R`像一只完全"放松"的鼓面：没有任何方向上的平均弯曲（Ricci 平坦），却可以有复杂的形状。`,
    book_example: { what: R`定理 8.6、8.7；\eqref{8.99}–\eqref{8.101}；交互图 4 的 K3 与五次 Calabi–Yau。`, point: "超弦紧化保留 N=1 超对称的几何条件。" },
    misconception: R`"Ricci 平坦就是平直"——Calabi–Yau 流形一般不平直（只有复环面是平直的），Riemann 曲率不为零。`,
  },
  {
    id: "hodge_numbers", name_zh: "Hodge 数与 Hodge 菱形", name_en: "Hodge numbers", icon: "💠", section_id: "8.6.4", group: "forms",
    plain: R`$b^{r,s}=\dim_\C H^{r,s}_{\bar\partial}$；紧 Kähler 流形上它们排成左右、上下都对称的菱形，横行之和是 Betti 数。`,
    explain: R`Kähler 时 $\Delta=2\Delta_{\bar\partial}$，调和形式按双次分解：$b^p=\sum_{r+s=p}b^{r,s}$。复共轭给 $b^{r,s}=b^{s,r}$，Serre 对偶给 $b^{r,s}=b^{m-r,m-s}$。

推论：奇数 Betti 数为偶；$b^{2p}\ge1$（Kähler 形式的幂不恰当）；全纯形式自动调和。`,
    analogy: "Betti 数告诉你一栋楼每层有几个房间；Hodge 数进一步告诉你每个房间朝东还是朝西——而 Kähler 条件保证朝东与朝西的房间一样多。",
    book_example: { what: R`\eqref{8.115} 的菱形；定理 8.10、8.11。`, point: "Kähler 性的拓扑障碍。" },
    misconception: R`"Hodge 数是拓扑不变量"——在一般复流形上它依赖复结构；只有在 Kähler 情形，它们的横行和才等于拓扑的 Betti 数。`,
  },
  {
    id: "orbifold", name_zh: "轨形", name_en: "Orbifold", icon: "🔺", section_id: "8.8", group: "struct",
    plain: R`流形模去离散群：不动点成为锥形奇点，曲率集中在那里。`,
    explain: R`$\C/\Z_3$ 是锥角 $2\pi/3$ 的锥面，绕锥点一圈的和乐是转 $2\pi/3$。$T^2/\Z_3$ 有三个锥点，拓扑上是球面（Gauss–Bonnet：$3\times\frac{4\pi}3=4\pi$）。

$T^6/\Z_3$ 有 $27$ 个奇点，不是流形；吹胀后得到 Calabi–Yau 流形。轨形在弦论中可精确求解。`,
    analogy: "把一张纸卷成冰淇淋筒：除了尖端处处平直，所有弯曲都集中在那一点。",
    book_example: { what: R`图 8.6–8.8；不动点 $z=(n/\sqrt3)\mathrm{e}^{\pi\mathrm{i}/6}$。`, point: R`曲率 = 和乐的非平凡性，奇点处像 $\delta$ 函数。` },
    misconception: R`"轨形一定不是流形"——$\C/\Z_3$ 拓扑上仍是流形（锥可以压平），只是度规奇异；$\C^2/\Z_2$、$\C^3/\Z_3$ 才在拓扑上奇异。`,
  },
];

export const relations = [
  { from: "complex_manifold", to: "almost_complex", label: "诱导 J" },
  { from: "complex_manifold", to: "modular", label: "环面的复结构" },
  { from: "almost_complex", to: "rs_forms", label: "本征分解" },
  { from: "rs_forms", to: "dolbeault", label: R`$\dd=\partial+\bar\partial$` },
  { from: "almost_complex", to: "hermitian", label: "J 是等距" },
  { from: "hermitian", to: "kahler_form", label: R`$g(J\cdot,\cdot)$` },
  { from: "kahler_form", to: "kahler", label: R`$\dd\Omega=0$` },
  { from: "hermitian", to: "chern1", label: "曲率的迹" },
  { from: "chern1", to: "calabi_yau", label: R`$c_1=0$` },
  { from: "kahler", to: "calabi_yau", label: "Ricci 平坦" },
  { from: "dolbeault", to: "hodge_numbers", label: "调和代表" },
  { from: "kahler", to: "hodge_numbers", label: R`$\Delta=2\Delta_{\bar\partial}$` },
  { from: "calabi_yau", to: "orbifold", label: "退化极限" },
  { from: "modular", to: "orbifold", label: R`$\tau=\mathrm{e}^{\mathrm{i}\pi/3}$` },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**复流形**：卡在 $\C^m$ 中、转移函数全纯。同一个拓扑空间可有一族复结构，例如环面的 $\tau\in\mathrm{H}/\mathrm{PSL}(2,\Z)$。`}</TxI>,
  <TxI>{R`**殆复结构 $J$**（"乘以 $\mathrm{i}$"）把 $T_pM^\C$ 分成全纯与反全纯两半，形式分成 $(r,s)$ 型，$\dd=\partial+\bar\partial$，$\bar\partial^2=0$，$\bar\partial f=0$ 即 Cauchy–Riemann 方程。可积性 ⇔ Nijenhuis 张量为零。`}</TxI>,
  <TxI>{R`**Hermite 度规**只有 $g_{\mu\bar\nu}$；**Kähler 形式** $\Omega=\mathrm{i}g_{\mu\bar\nu}\dd z^\mu\wedge\dd\bar z^\nu$，$\Omega^m$ 是体积元，复流形可定向。Ricci 形式 $\mathrm{i}\bar\partial\partial\log G$ 给出与度规无关的 $c_1$。`}</TxI>,
  <TxI>{R`**Kähler**：$\dd\Omega=0$ ⇔ $\nabla J=0$ ⇔ $g_{\mu\bar\nu}=\partial_\mu\partial_{\bar\nu}\mathcal{K}$。$\CP^m$ 的 Fubini–Study 度规是典型例子；Ricci 平坦的紧 Kähler 流形（Calabi–Yau）有 $c_1=0$、和乐 $\subset\mathrm{SU}(m)$。`}</TxI>,
  <TxI>{R`**Hodge 理论**：每个 $\bar\partial$ 上同调类有唯一调和代表；紧 Kähler 流形上 $\Delta=2\Delta_{\bar\partial}$，于是 $b^p=\sum_{r+s=p}b^{r,s}$，Hodge 菱形双重对称，奇数 Betti 数为偶，$b^{2p}\ge1$。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`为什么例 8.1 中南极投影坐标要取 $V=-y/(1+z)$ 而不是 $+y/(1+z)$？`,
    options: [R`为了让 $W$ 有界`, R`取 $+$ 号时 $U+\mathrm{i}V=1/\bar Z$ 是反全纯的，两张卡不能构成复图册`, R`为了让两张卡覆盖整个球面`, R`为了让度规是 Hermite 的`],
    answer: 1, why: R`$(x+\mathrm{i}y)/(1+z)=1/\overline Z$。翻转一张卡的定向把它变成 $1/Z$，全纯。这与"复流形的全纯图册是定向图册"（实 Jacobi 行列式 $=|W'|^2>0$）一致。`,
  },
  {
    q: R`$\tau$ 与下列哪个模参数定义同一个复环面？`,
    options: [R`$2\tau$`, R`$\bar\tau$`, R`$-1/\tau$`, R`$\tau+\frac12$`],
    answer: 2, why: R`$-1/\tau=(0\cdot\tau-1)/(1\cdot\tau+0)$，矩阵 $\begin{pmatrix}0&-1\\1&0\end{pmatrix}\in\mathrm{SL}(2,\Z)$。$2\tau$、$\tau+\frac12$ 一般给出不同的格；$\bar\tau$ 在下半平面（对应反向定向）。`,
  },
  {
    q: R`函数 $f(z)=z\bar z$ 的 $\partial f/\partial\bar z$ 等于什么？`,
    options: [R`$0$`, R`$\bar z$`, R`$z$`, R`$2|z|$`],
    answer: 2, why: R`把 $z$、$\bar z$ 当独立变量：$\partial(z\bar z)/\partial\bar z=z$。由 \eqref{8.13b} 也可直接验证：$\frac12(\partial_x+\mathrm{i}\partial_y)(x^2+y^2)=x+\mathrm{i}y$。所以 $|z|^2$ 不是全纯的。`,
  },
  {
    q: R`关于 Hermite 度规 $g$ 与 Kähler 形式 $\Omega$，下列哪个说法正确？`,
    options: [R`$g_{\mu\nu}=g(\partial_\mu,\partial_\nu)$ 一般不为零`, R`$\Omega$ 是 $(2,0)+(0,2)$ 型形式`, R`$\Omega$ 是实的 $(1,1)$ 形式，$\Omega^m$ 处处不为零`, R`只有 Kähler 流形才有 Kähler 形式`],
    answer: 2, why: R`$g(JX,JY)=g(X,Y)$ 推出 $g_{\mu\nu}=-g_{\mu\nu}=0$；$\Omega=\mathrm{i}g_{\mu\bar\nu}\dd z^\mu\wedge\dd\bar z^\nu$ 是实 $(1,1)$ 形式；任何 Hermite 流形都有 Kähler 形式，Kähler 流形是它**闭合**的那些。`,
  },
  {
    q: R`为什么 $S^1\times S^3$ 有复结构却不可能是 Kähler 流形？`,
    options: [R`它不可定向`, R`它的 $b^1=1$ 是奇数，违反 \eqref{8.119}；$b^2=0$ 违反 \eqref{8.120}`, R`它不紧`, R`它的 Euler 数不为零`],
    answer: 1, why: R`紧 Kähler 流形的奇数 Betti 数都是偶数（$b^{2p-1}=2\sum_{r>s}b^{r,s}$），且 $[\Omega]\neq0$ 给出 $b^2\ge1$。$S^1\times S^3$ 的 $b^1=1$、$b^2=0$，两条都违反（交互图 4 的 Hopf 曲面）。`,
  },
  {
    q: R`紧 Kähler 流形上的全纯 $p$ 形式 $\omega$：`,
    options: [R`一般不闭`, R`满足 $\bar\partial\omega=0$ 但不一定调和`, R`自动调和，因而自动闭（$\dd\omega=0$）`, R`只在 Calabi–Yau 流形上存在`],
    answer: 2, why: R`$\bar\partial\omega=0$ 且 $\bar\partial^\dagger\omega=0$（没有 $\dd\bar z$），所以 $\Delta_{\bar\partial}\omega=0$；由 $\Delta=2\Delta_{\bar\partial}$ 得 $\Delta\omega=0$，调和形式在紧流形上闭且余闭。全纯 $p$ 形式的个数就是 $b^{p,0}$。`,
  },
];

export const BRIDGE = R`本章把第 5–7 章的工具搬到复流形上：$J$、$(r,s)$ 形式、Dolbeault 上同调、Hermite 与 Kähler 几何。其中有两条线索刻意留到后面：Ricci 形式的类 $c_1(M)=[\mathfrak{R}/2\pi]$ 只是更一般的**示性类**的第一个例子；Hermite 联络只是复向量丛上联络的特例。第 9 章先建立**纤维丛**的语言（切丛、主丛、伴随丛、全纯线丛），第 10 章在其上定义联络与曲率，第 11 章用曲率形式构造陈类、Pontrjagin 类与 Euler 类——届时你会看到 $\int_{\CP^1}c_1=2$ 是 Gauss–Bonnet 定理的一个特例，而 Calabi–Yau 条件 $c_1=0$ 就是"典范丛的陈类为零"。`;
