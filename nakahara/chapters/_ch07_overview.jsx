// 第 7 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。纯数据（TAKEAWAYS 为 TxI 元素）。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "Foucault 摆、GPS 卫星与绕地球一圈的箭头";
export const HOOK = R`**手持一支箭头环球旅行。**从赤道上某点出发，箭头指向正北；沿经线走到北极，再沿另一条经线（向东转 $90^\circ$）走回赤道，最后沿赤道走回起点——一路上你都小心地"不转动"箭头。回到起点时，箭头却指向了正东，转了 $90^\circ$。这个转角恰好等于你走过的三角形所围的面积（以地球半径为单位）。这就是本章的**和乐**：曲率不是"空间看起来弯不弯"，而是"把向量平行地搬一圈回不回得来"。

**Foucault 摆。**在纬度 $\lambda$ 处，摆的振动面一天转过 $2\pi\sin\lambda$——正是例 7.7 中纬圈平行移动的转角 $2\pi\cos\theta_0$（$\theta_0$ 为余纬）。巴黎先贤祠里的那只摆，是在演示球面的 Levi-Civita 联络。

**GPS。**卫星上的原子钟每天比地面快约 $38\,\mu\mathrm{s}$，其中引力的贡献来自 Schwarzschild 度规 $g_{00}=-(1-2M/r)$——若不按广义相对论修正，定位误差每天累积约 10 公里。度规是引力势，测地线是自由下落，Riemann 张量是潮汐力。

本章给流形装上"尺子"（度规）与"搬运规则"（联络），由此得到测地线、曲率、Killing 对称性、Hodge 理论，以及广义相对论与弦论的作用量。`;

// ---------- 路线图：每节一张 ----------
export const ROADMAP = [
  { sec: "7.1", title: "度规：给切空间装上内积", gist: R`对称非退化的 $(0,2)$ 张量 $g$；线元 $\dd s^2=g_{\mu\nu}\dd x^\mu\dd x^\nu$；升降指标；Lorentz 度规与光锥；子流形上的诱导度规 $f^*g$。`, gives: ["7.1a", "7.2", "7.3", "7.5", "7.6"], next: R`有了长度，还要会比较不同点的向量。` },
  { sec: "7.2", title: "联络、平行移动与协变导数", gist: R`规定平行移动 $\widetilde V^\mu=V^\mu-V^\lambda\Gamma^\mu{}_{\nu\lambda}\Delta x^\nu$；仿射联络公理；$\nabla_\mu W^\lambda=\partial_\mu W^\lambda+\Gamma^\lambda{}_{\mu\nu}W^\nu$；测地线方程；$\Gamma$ 的非齐次变换律；度规相容 ⇒ $\Gamma$ = Christoffel + 切扭。`, gives: ["7.9", "7.16", "7.18b", "7.19b", "7.29", "7.33", "7.34"], next: R`$\Gamma$ 不是张量；什么才是坐标无关的"弯曲"？` },
  { sec: "7.3", title: "曲率与挠率", gist: R`$T=\nabla_XY-\nabla_YX-[X,Y]$、$R=[\nabla_X,\nabla_Y]-\nabla_{[X,Y]}$ 都是张量；曲率 = 平行移动依赖路径，挠率 = 平行四边形不闭合；可平行化的 $S^3$、李群有挠无曲；Ricci 张量与标量曲率。`, gives: ["7.36", "7.37", "7.42", "7.44", "7.45", "7.50b"], next: R`度规能否唯一地挑出一个"好"联络？` },
  { sec: "7.4", title: "Levi-Civita 联络", gist: R`度规相容 + 无挠 ⇒ 唯一（基本定理）；测地线 = 弧长极值；球面的大圆、上半平面的半圆；正规坐标中 $\Gamma(p)=0$；Riemann 张量的对称性、Bianchi 恒等式、$\nabla_\mu G^{\mu\nu}=0$；独立分量 $m^2(m^2-1)/12$。`, gives: ["7.53", "7.61", "7.70", "7.75", "7.80c", "7.81a", "7.85", "7.88", "7.89"], next: R`曲率的整体效应：绕一圈回来，向量转了多少？` },
  { sec: "7.5", title: "和乐", gist: R`闭合回路上的平行移动构成和乐群 $H(p)\subset\mathrm{SO}(m)$；$S^2$ 上沿纬圈一圈转 $2\pi\cos\theta_0$，$H=\mathrm{SO}(2)$。`, gives: ["7.90", "7.92", "7.95"], next: R`哪些变换保持度规？` },
  { sec: "7.6", title: "等距与共形变换", gist: R`等距 $f^*g=g$；共形变换 $f^*g=\mathrm{e}^{2\sigma}g$ 保角；全纯函数共形；Weyl 重标度下联络与曲率的变化，Weyl 张量；二维总是共形平坦（等温坐标）。`, gives: ["7.96a", "7.97a", "7.103", "7.110", "7.115", "7.119"], next: R`对称性的无穷小版本。` },
  { sec: "7.7", title: "Killing 向量场", gist: R`$\mathcal{L}_Xg=0$ ⇔ $\nabla_\mu X_\nu+\nabla_\nu X_\mu=0$；Minkowski 的 10 个 Killing 场；$S^2$ 的 $\mathfrak{so}(3)$；共形 Killing 方程与伸缩场。`, gives: ["7.120a", "7.121", "7.127", "7.129a"], next: R`换一种基：正交标架让计算变快。` },
  { sec: "7.8", title: "非坐标基与 Cartan 结构方程", gist: R`vielbein $\hat\theta^\alpha=e^\alpha{}_\mu\dd x^\mu$，$g=\delta_{\alpha\beta}\hat\theta^\alpha\hat\theta^\beta$；联络一形式 $\omega^\alpha{}_\beta$；$\dd\hat\theta+\omega\wedge\hat\theta=T$，$\dd\omega+\omega\wedge\omega=R$；局部转动下 $\omega$ 像规范势；球面与 Schwarzschild 的曲率。`, gives: ["7.135", "7.145", "7.146a", "7.146b", "7.152", "7.155", "7.167"], next: R`度规也改变了微分形式的世界。` },
  { sec: "7.9", title: "微分形式与 Hodge 理论", gist: R`不变体积元；Hodge 星；形式的内积；$\dd^\dagger$ 是 $\dd$ 的伴随；$\Delta=\dd\dd^\dagger+\dd^\dagger\dd$；调和 ⇔ 闭且余闭；Hodge 分解；$H^r\cong\mathrm{Harm}^r$，$\chi=\sum(-1)^r\dim\mathrm{Harm}^r$。`, gives: ["7.168", "7.172", "7.181", "7.186", "7.188", "7.189a", "7.192a", "7.197", "7.199"], next: R`把这些工具用到引力上。` },
  { sec: "7.10", title: "广义相对论", gist: R`Einstein 方程推广 Poisson 方程；Palatini 恒等式；Einstein–Hilbert 作用量的变分 ⇒ $G_{\mu\nu}=8\pi GT_{\mu\nu}$；弯曲时空的 Dirac 作用量与自旋联络。`, gives: ["7.202", "7.205", "7.207", "7.214", "7.227", "7.229a"], next: R`同样的几何也描述弦的世界面。` },
  { sec: "7.11", title: "玻色弦", gist: R`粒子作用量 = 世界线长度；Nambu 作用量 = 世界面面积；Polyakov 作用量（二次）对 $g_{\alpha\beta}$ 变分回到 Nambu；重参数化 + Weyl 不变性让世界面度规可取 $\eta_{\alpha\beta}$；调和映射。`, gives: ["7.230", "7.232", "7.233", "7.237a", "7.237b", "7.239", "7.242"] },
];

// ---------- 推导图 ----------
export const EQMAP = [
  { from: "7.1a", to: "7.3", label: "喂入位移" },
  { from: "7.9", to: "7.16", label: "差商" },
  { from: "7.16", to: "7.18b", label: R`沿曲线 $\nabla_V X=0$` },
  { from: "7.18b", to: "7.19b", label: R`$X=V$` },
  { from: "7.16", to: "7.26", label: "Leibniz 律" },
  { from: "7.26", to: "7.30b", label: R`$\nabla g=0$` },
  { from: "7.30b", to: "7.34", label: "三个轮换" },
  { from: "7.34", to: "7.53", label: "令挠率为零" },
  { from: "7.16", to: "7.42", label: R`$[\nabla,\nabla]$` },
  { from: "7.9", to: "7.44", label: "绕小回路" },
  { from: "7.42", to: "7.44", label: "比较" },
  { from: "7.53", to: "7.61", label: "弧长变分" },
  { from: "7.19b", to: "7.61", label: "同一方程" },
  { from: "7.61", to: "7.70", label: "Poincaré 度规" },
  { from: "7.42", to: "7.81a", label: "无挠 + Jacobi" },
  { from: "7.81a", to: "7.85", label: "缩并两次" },
  { from: "7.18b", to: "7.95", label: "球面纬圈" },
  { from: "7.44", to: "7.95", label: "积分 = 面积" },
  { from: "7.53", to: "7.121", label: R`$\mathcal L_Xg=0$` },
  { from: "7.42", to: "7.146b", label: "非坐标基" },
  { from: "7.146b", to: "7.167", label: "Schwarzschild" },
  { from: "7.168", to: "7.186", label: "Hodge 星 + Stokes" },
  { from: "7.186", to: "7.197", label: R`$\Delta$ 与 Hodge 分解` },
  { from: "7.85", to: "7.214", label: "相容的物质耦合" },
  { from: "7.205", to: "7.214", label: "作用量变分" },
  { from: "7.214", to: "7.233", label: "二维世界面" },
];
export const EQMAP_LABELS = {
  "7.1a": "度规张量", "7.3": "线元", "7.9": "无穷小平行移动", "7.16": "协变导数", "7.18b": "平行移动方程", "7.19b": "测地线方程",
  "7.26": "张量的协变导数", "7.30b": "度规相容", "7.34": "度规联络", "7.53": "Christoffel 符号", "7.42": "Riemann 张量",
  "7.44": "曲率 = 绕圈差", "7.61": "测地线 = 弧长极值", "7.70": "双曲平面的半圆", "7.81a": "Bianchi 恒等式", "7.85": R`$\nabla_\mu G^{\mu\nu}=0$`,
  "7.95": "纬圈和乐", "7.121": "Killing 方程", "7.146b": "Cartan 第二结构方程", "7.167": "Schwarzschild 曲率",
  "7.168": "不变体积元", "7.186": R`$\dd^\dagger$ 是伴随`, "7.197": "Hodge 定理", "7.205": "Palatini 恒等式", "7.214": "Einstein 方程", "7.233": "Polyakov 作用量",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "metric", label: "度规与联络" },
  { id: "curv", label: "曲率与对称性" },
  { id: "forms", label: "标架与形式" },
  { id: "phys", label: "物理应用" },
];

export const concepts = [
  {
    id: "metric", name_zh: "度规张量", name_en: "Metric tensor", icon: "📏", section_id: "7.1", group: "metric",
    plain: R`每个切空间上的内积：告诉你向量多长、夹角多大。`,
    explain: R`$g=g_{\mu\nu}\dd x^\mu\otimes\dd x^\nu$，对称、非退化（Riemann 情形还正定）。线元 $\dd s^2=g_{\mu\nu}\dd x^\mu\dd x^\nu$ 是"弯曲空间的勾股定理"。

度规给出 $T_pM\cong T^*_pM$（升降指标）、不变体积元 $\sqrt{|g|}\dd^mx$、Hodge 星，并唯一决定 Levi-Civita 联络。指标 $(i,j)$ 区分 Riemann 与 Lorentz（相对论）度规。`,
    analogy: R`给一块橡皮膜画上网格只是坐标；在每个格子里放一把"本地尺子"告诉你格子实际有多大，这才是度规。`,
    book_example: { what: R`\eqref{7.6}：单位球面从 $\R^3$ 继承 $\dd\theta^2+\sin^2\theta\,\dd\phi^2$；习题 7.2 的环面度规。`, point: "嵌入就能诱导度规：拉回外部的内积。" },
    misconception: R`度规分量依赖坐标（极坐标里 $g_{\phi\phi}=r^2$），不能凭分量判断空间是否弯曲——要看曲率。`,
  },
  {
    id: "connection", name_zh: "联络与协变导数", name_en: "Connection & covariant derivative", icon: "🔗", section_id: "7.2", group: "metric",
    plain: R`把向量从一点"原样"搬到邻点的规则，从而能对张量求导。`,
    explain: R`不同点的切空间不同，向量不能直接相减。联络规定平行移动 $\widetilde V^\mu=V^\mu-V^\lambda\Gamma^\mu{}_{\nu\lambda}\Delta x^\nu$，协变导数 $\nabla_\mu W^\lambda=\partial_\mu W^\lambda+\Gamma^\lambda{}_{\mu\nu}W^\nu$。

$\Gamma$ 不是张量（变换律有非齐次项），两个联络之差才是张量。与李导数不同，$\nabla_XY$ 只依赖 $X$ 在该点的值。`,
    analogy: R`在两座城市之间比较"正北"：需要一条约定的路线和沿途"保持方向"的规则，结果可能依赖路线。`,
    book_example: { what: R`例 7.1：平面极坐标中 $\Gamma^r{}_{\phi\phi}=-r$、$\Gamma^\phi{}_{r\phi}=1/r$，而 Cartesian 坐标中全为零。`, point: R`同一个平行移动，在不同坐标里 $\Gamma$ 不同。` },
    misconception: R`$\nabla_\mu W^\lambda$ 不是"分量 $W^\lambda$ 的导数"，而是向量 $\nabla_\mu W$ 的第 $\lambda$ 个分量。`,
  },
  {
    id: "geodesic", name_zh: "测地线", name_en: "Geodesic", icon: "🛰️", section_id: "7.2.3", group: "metric",
    plain: R`速度向量自己平行于自己的曲线：最直，也是长度的极值。`,
    explain: R`$\nabla_VV=0$，即 $\ddot x^\mu+\Gamma^\mu{}_{\nu\lambda}\dot x^\nu\dot x^\lambda=0$。对 Levi-Civita 联络，它正是 $F=\frac12g_{\mu\nu}x'^\mu x'^\nu$ 的 Euler–Lagrange 方程，所以"最直 = 最短（极值）"。

在广义相对论中，自由下落的粒子沿时空测地线运动，$\Gamma$ 项就是引力。`,
    analogy: R`飞机的大圆航线：在地图（坐标）上弯弯曲曲，在地球上却是"一直往前飞"。`,
    book_example: { what: R`例 7.5：$S^2$ 的测地线是大圆；例 7.6：Poincaré 上半平面的测地线是圆心在实轴上的半圆，长度无穷。`, point: "交互图 2 数值验证这两点。" },
    misconception: R`测地线不一定是最短的（球面上绕远路的大圆弧、柱面上的螺旋线），只是长度的局部极值。`,
  },
  {
    id: "curvature", name_zh: "曲率与挠率", name_en: "Curvature & torsion", icon: "🌀", section_id: "7.3", group: "curv",
    plain: R`曲率：沿不同路径搬运向量结果不同；挠率：无穷小平行四边形合不拢。`,
    explain: R`$R(X,Y)Z=[\nabla_X,\nabla_Y]Z-\nabla_{[X,Y]}Z$，分量 $R^\kappa{}_{\lambda\mu\nu}=\partial_\mu\Gamma^\kappa{}_{\nu\lambda}-\partial_\nu\Gamma^\kappa{}_{\mu\lambda}+\Gamma\Gamma-\Gamma\Gamma$；沿小回路一圈，向量改变 $R^\mu{}_{\kappa\lambda\nu}V^\kappa\varepsilon^\lambda\delta^\nu$。

挠率 $T(X,Y)=\nabla_XY-\nabla_YX-[X,Y]$。两者都是张量。缩并得 Ricci 张量与标量曲率；二维中只有一个函数——Gauss 曲率 $K=\mathcal R/2$。`,
    analogy: R`在山坡上走一个"方形"回来：曲率让你的指南针（平行移动的箭头）转了角；挠率让你的方形差一点合不上口。`,
    book_example: { what: R`例 7.2：保持与纬线夹角的"航海"联络有挠无曲；$S^3$ 与李群的可平行化联络同样。`, point: "曲率与挠率是独立的两种缺陷。" },
    misconception: R`曲率不等于"嵌入时看起来弯"：柱面在 $\R^3$ 里弯，但内禀平坦（$R=0$）。`,
  },
  {
    id: "levi_civita", name_zh: "Levi-Civita 联络", name_en: "Levi-Civita connection", icon: "⚖️", section_id: "7.4", group: "metric",
    plain: R`由度规唯一决定的、无挠且保长度的联络。`,
    explain: R`基本定理：度规相容 $\nabla g=0$ 与无挠 $\Gamma^\lambda{}_{\mu\nu}=\Gamma^\lambda{}_{\nu\mu}$ 唯一确定 $\Gamma^\kappa{}_{\mu\nu}=\frac12g^{\kappa\lambda}(\partial_\mu g_{\lambda\nu}+\partial_\nu g_{\lambda\mu}-\partial_\lambda g_{\mu\nu})$。

在正规坐标中 $\Gamma(p)=0$（等效原理），但曲率去不掉。Riemann 张量此时有成对对称性与 Bianchi 恒等式，缩并得 $\nabla_\mu G^{\mu\nu}=0$。`,
    analogy: R`把橡皮膜上的箭头"贴着膜、不打转"地推着走——这是曲面上唯一自然的平行移动。`,
    book_example: { what: R`例 7.3：$S^2$ 上 $\Gamma^\theta{}_{\phi\phi}=-\sin\theta\cos\theta$，$\Gamma^\phi{}_{\theta\phi}=\cot\theta$。`, point: "从度规三项导数直接算出。" },
    misconception: R`"度规相容"本身不够：还可以加任意挠率（切扭张量）。必须同时要求无挠。`,
  },
  {
    id: "holonomy", name_zh: "和乐", name_en: "Holonomy", icon: "🧭", section_id: "7.5", group: "curv",
    plain: R`沿闭合回路平行移动一圈，向量被转了一个角：这些转动组成和乐群。`,
    explain: R`回路 $c$ 给出 $P_c:T_pM\to T_pM$，全体组成 $H(p)$；度规联络下 $H(p)\subset\mathrm{SO}(m)$。二维时转角 $=\iint K\,\dd A$（模 $2\pi$）。

$S^2$ 上沿纬圈 $\theta_0$ 一圈转 $2\pi\cos\theta_0$，$H=\mathrm{SO}(2)$；乘积流形的和乐群是直积。`,
    analogy: R`Foucault 摆：地球带着摆绕地轴一天，摆的振动面相对地面转过 $2\pi\sin(\text{纬度})$。`,
    book_example: { what: R`例 7.7 与交互图 1：拖动球面三角形，转角始终等于面积。`, point: "曲率是和乐的无穷小版本。" },
    misconception: R`平坦但非单连通的空间（锥面、宇宙弦）也可以有非平凡和乐。`,
  },
  {
    id: "isometry", name_zh: "等距、共形与 Weyl 重标度", name_en: "Isometry & conformal maps", icon: "🔍", section_id: "7.6", group: "curv",
    plain: R`等距保长度；共形变换只保角度；Weyl 重标度逐点缩放度规。`,
    explain: R`$f^*g=g$（等距）、$f^*g=\mathrm{e}^{2\sigma}g$（共形）。全纯函数是平面的共形映射；共形变换保持光锥。

Weyl 重标度下联络差 $K(X,Y)=X[\sigma]Y+Y[\sigma]X-g(X,Y)U$，曲率的变化只通过 $B$ 张量；Weyl 张量不变。二维度规总能化为 $\mathrm{e}^{2\sigma}\delta$（等温坐标）。`,
    analogy: R`墨卡托地图：放大倍数逐点不同（不等距），但每个小角都画对了（共形）——所以航海用它。`,
    book_example: { what: R`例 7.9：$u=\log\tan\frac\theta2$、$v=\phi$ 把球面度规化为 $\sin^2\theta(\dd u^2+\dd v^2)$——正是 Mercator 投影。`, point: "二维中共形平坦是普遍现象。" },
    misconception: R`共形变换（移动点）与 Weyl 重标度（只改度规）不同。`,
  },
  {
    id: "killing", name_zh: "Killing 向量场", name_en: "Killing vector field", icon: "♻️", section_id: "7.7", group: "curv",
    plain: R`沿它流动度规不变的向量场：流形的连续对称方向。`,
    explain: R`$\mathcal{L}_Xg=0$ ⇔ $\nabla_\mu X_\nu+\nabla_\nu X_\mu=0$。Killing 场构成李代数；$m$ 维最多 $m(m+1)/2$ 个（最大对称空间：$\R^m$、$S^m$、Minkowski）。

沿测地线，$g(X,\dot x)$ 守恒——能量、动量、角动量的几何来源。共形 Killing 场满足 $\mathcal{L}_Xg=\psi g$。`,
    analogy: R`旋转一个完美的球，看不出任何变化：转轴方向就是 Killing 场。把球压扁，就只剩绕扁轴的那一个。`,
    book_example: { what: R`例 7.10：Minkowski 时空的 10 个 Killing 场（平移、转动、boost）；例 7.11：$S^2$ 的 $L_x,L_y,L_z$ 生成 $\mathfrak{so}(3)$。`, point: "Killing 场的李代数 = 等距群的李代数。" },
    misconception: R`Killing 场的个数可以多于维数（$S^2$ 二维却有 3 个）；"独立"指常系数线性无关。`,
  },
  {
    id: "cartan", name_zh: "标架与 Cartan 结构方程", name_en: "Vielbein & Cartan's structure equations", icon: "🧱", section_id: "7.8", group: "forms",
    plain: R`用正交标架代替坐标基；曲率 $=\dd\omega+\omega\wedge\omega$。`,
    explain: R`$\hat\theta^\alpha=e^\alpha{}_\mu\dd x^\mu$ 使 $g=\delta_{\alpha\beta}\hat\theta^\alpha\hat\theta^\beta$。联络一形式 $\omega^\alpha{}_\beta$ 满足 $\dd\hat\theta+\omega\wedge\hat\theta=T$、$\dd\omega+\omega\wedge\omega=R$。

Levi-Civita：$\omega_{\alpha\beta}=-\omega_{\beta\alpha}$ 且 $\dd\hat\theta+\omega\wedge\hat\theta=0$，可直接解出 $\omega$。局部标架转动下 $\omega'=\Lambda\omega\Lambda^{-1}+\Lambda\dd\Lambda^{-1}$——规范势的原型。`,
    analogy: R`每个城市用自己的"东-北"正交坐标；相邻城市的标架差一个小转动，这个转动就是联络一形式。`,
    book_example: { what: R`例 7.14：球面 $\omega^1{}_2=-\cos\theta\,\dd\phi$，一行算出 $K=1$；例 7.15：Schwarzschild 的潮汐曲率 $\propto M/r^3$。`, point: "比 Christoffel 符号快得多。" },
    misconception: R`正交标架的分量 $R^1{}_{212}$ 与坐标分量 $R^\theta{}_{\phi\theta\phi}$ 相差 vielbein 因子（原书例 7.14 在此出错）。`,
  },
  {
    id: "hodge", name_zh: "Hodge 星与 Hodge 定理", name_en: "Hodge star & Hodge theorem", icon: "🎼", section_id: "7.9", group: "forms",
    plain: R`度规让形式有了内积与"散度"；每个上同调类恰有一个调和代表元。`,
    explain: R`$*:\Omega^r\to\Omega^{m-r}$，$(\omega,\eta)=\int\omega\wedge*\eta$，$\dd^\dagger$ 是 $\dd$ 的伴随，$\Delta=\dd\dd^\dagger+\dd^\dagger\dd\ge0$。调和 ⇔ 闭且余闭。

Hodge 分解 $\Omega^r=\dd\Omega^{r-1}\oplus\dd^\dagger\Omega^{r+1}\oplus\mathrm{Harm}^r$；Hodge 定理 $H^r\cong\mathrm{Harm}^r$，$\chi(M)=\sum(-1)^r\dim\mathrm{Harm}^r$。`,
    analogy: R`Helmholtz 分解：任何向量场 = 无旋部分 + 无源部分 + "绕洞"的调和部分；只有最后一块记得空间的拓扑。`,
    book_example: { what: R`例 7.16：$\dd F=0$、$\dd^\dagger F=j$ 就是全部 Maxwell 方程；Lorenz 规范下 $\Delta A=j$。`, point: "度规只出现在 $\dd^\dagger$（即 $*$）里。" },
    misconception: R`调和形式依赖度规，但它们的个数（Betti 数）不依赖。`,
  },
  {
    id: "einstein", name_zh: "Einstein 方程与 Einstein–Hilbert 作用量", name_en: "Einstein equation & Einstein–Hilbert action", icon: "🌌", section_id: "7.10", group: "phys",
    plain: R`$G_{\mu\nu}=8\pi GT_{\mu\nu}$：物质决定时空曲率；它来自作用量 $\int\mathcal R\sqrt{-g}$。`,
    explain: R`Einstein 张量 $G=\mathit{Ric}-\frac12g\mathcal R$ 由 Bianchi 恒等式自动守恒，与 $\nabla_\mu T^{\mu\nu}=0$ 相容。用 $\delta\sqrt{-g}=\frac12\sqrt{-g}g^{\mu\nu}\delta g_{\mu\nu}$ 与 Palatini 恒等式，$\delta S_{\rm EH}\propto\int(-\mathit{Ric}^{\mu\nu}+\frac12\mathcal Rg^{\mu\nu})\delta g_{\mu\nu}$。

弱场下回到 Poisson 方程；旋量要用 vierbein 与自旋联络 $\Omega_\mu=\frac12\mathrm{i}\Gamma^\alpha{}_\mu{}^\beta\Sigma_{\alpha\beta}$ 才能耦合到引力。`,
    analogy: R`蹦床上的保龄球：球（物质）把床面压弯（曲率），弹珠（自由粒子）沿弯曲床面的"直线"滚动（测地线）。`,
    book_example: { what: R`习题 7.24：$g_{00}=-1-2\Phi/c^2$ 时 Einstein 方程化为 $\nabla^2\Phi=4\pi G\rho$；习题 7.10(c)：Schwarzschild 度规 $\mathit{Ric}=0$。`, point: "引力势就是度规分量。" },
    misconception: R`真空中 $\mathit{Ric}=0$ 不意味着没有引力：Riemann 张量（潮汐力）可以不为零。`,
  },
  {
    id: "polyakov", name_zh: "Polyakov 弦与 Weyl 不变性", name_en: "Polyakov string", icon: "🎻", section_id: "7.11", group: "phys",
    plain: R`弦的作用量是世界面面积；引入独立的世界面度规后变成二次的 Polyakov 作用量。`,
    explain: R`Nambu：$-\frac1{2\pi\alpha'}\int\sqrt{-\det h}$，$h$ 是诱导度规；Polyakov：$-\frac1{4\pi\alpha'}\int\sqrt{-g}g^{\alpha\beta}\partial_\alpha X\cdot\partial_\beta X$。对 $g$ 变分得 $T_{\alpha\beta}=0$，$g\propto h$，回到 Nambu。

对称性：重参数化（2 个函数）+ Weyl 重标度（1 个函数，只在二维）恰好消去 $g_{\alpha\beta}$ 的 3 个分量，可取 $g=\eta$，$X^\mu$ 满足波动方程。`,
    analogy: R`肥皂膜总是取面积极小的形状；Polyakov 的技巧相当于先在膜上画一张任意的网格，再让网格自己调整到与膜"贴合"。`,
    book_example: { what: R`习题 7.26：点粒子的 $-\frac12\int\sqrt g(g^{-1}\dot X^2-m^2)$ 消去 $g$ 后回到 $m\int\dd s$。`, point: "辅助度规把平方根作用量变成二次型。" },
    misconception: R`Weyl 不变性只在二维世界面上存在：$\sqrt{-g}\to\mathrm{e}^{m\sigma}\sqrt{-g}$ 与 $g^{\alpha\beta}\to\mathrm{e}^{-2\sigma}g^{\alpha\beta}$ 只在 $m=2$ 抵消。`,
  },
];

export const relations = [
  { from: "metric", to: "levi_civita", label: "唯一决定" },
  { from: "connection", to: "levi_civita", label: "无挠 + 相容" },
  { from: "connection", to: "geodesic", label: R`$\nabla_VV=0$` },
  { from: "metric", to: "geodesic", label: "弧长极值" },
  { from: "connection", to: "curvature", label: "不可交换" },
  { from: "curvature", to: "holonomy", label: "积分" },
  { from: "metric", to: "isometry", label: "保持" },
  { from: "isometry", to: "killing", label: "无穷小" },
  { from: "connection", to: "cartan", label: "标架中" },
  { from: "cartan", to: "curvature", label: R`$\dd\omega+\omega\wedge\omega$` },
  { from: "metric", to: "hodge", label: R`$*$ 与 $\dd^\dagger$` },
  { from: "curvature", to: "einstein", label: "Ricci 张量" },
  { from: "cartan", to: "einstein", label: "旋量" },
  { from: "isometry", to: "polyakov", label: "Weyl 不变" },
  { from: "metric", to: "polyakov", label: "诱导度规" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**度规** $g_{\mu\nu}$ 给每个切空间内积：线元、升降指标、诱导度规 $f^*g$、不变体积元 $\sqrt{|g|}\dd^mx$。`}</TxI>,
  <TxI>{R`**联络**规定平行移动；$\nabla_\mu W^\lambda=\partial_\mu W^\lambda+\Gamma^\lambda{}_{\mu\nu}W^\nu$，$\Gamma$ 不是张量。测地线 $\ddot x+\Gamma\dot x\dot x=0$。**基本定理**：度规相容 + 无挠 ⇒ $\Gamma$ = Christoffel 符号，测地线 = 弧长极值。`}</TxI>,
  <TxI>{R`**曲率** $R=[\nabla,\nabla]-\nabla_{[\,,\,]}$ 度量平行移动的路径依赖（\eqref{7.44}），整体效应是**和乐**：二维中转角 $=\iint K\,\dd A$；**挠率**度量平行四边形不闭合。Levi-Civita 曲率满足 Bianchi 恒等式，$\nabla_\mu G^{\mu\nu}=0$。`}</TxI>,
  <TxI>{R`**对称性**：Killing 方程 $\nabla_{(\mu}X_{\nu)}=0$；共形变换保角、Weyl 张量共形不变；二维总共形平坦。**正交标架**中 $\dd\hat\theta+\omega\wedge\hat\theta=0$、$R=\dd\omega+\omega\wedge\omega$ 是算曲率的捷径。`}</TxI>,
  <TxI>{R`**Hodge 理论**：$*$、$\dd^\dagger$、$\Delta$；调和形式 ↔ de Rham 上同调，$\chi=\sum(-1)^r\dim\mathrm{Harm}^r$。**物理**：$\delta\int\mathcal R\sqrt{-g}$ ⇒ Einstein 方程；Polyakov 弦是世界面到时空的调和映射。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`平面极坐标中 $\Gamma^r{}_{\phi\phi}=-r\neq0$。这说明什么？`,
    options: [R`平面在极坐标下是弯曲的`, R`$\Gamma$ 不是张量，它可以在一个坐标系中为零、在另一个中不为零；平面依然平坦（$R=0$）`, R`极坐标下 Levi-Civita 联络有挠率`, R`极坐标不是合法的坐标卡`],
    answer: 1, why: R`\eqref{7.29} 中的非齐次项使 $\Gamma$ 依赖坐标选取；判断弯曲要看 Riemann 张量。例 7.1 的 $\Gamma$ 关于下指标对称，挠率为零；交互图 3 的"平面极坐标"预设给出 $K=0$。`,
  },
  {
    q: R`在单位球面上沿一个测地三角形（八分之一球面：北极与赤道上经度差 $90^\circ$ 的两点）平行移动一个向量，回到起点时它转了多少？`,
    options: [R`$0$`, R`$\pi/4$`, R`$\pi/2$`, R`$\pi$`],
    answer: 2, why: R`转角 $=\iint K\,\dd A=1\times\frac{4\pi}{8}=\frac\pi2$。也可以用 Girard 公式：三个内角都是 $\pi/2$，面积 $=3\cdot\frac\pi2-\pi=\frac\pi2$。`,
  },
  {
    q: R`例 7.2 的"保持与纬线夹角"的联络，其曲率与挠率分别是：`,
    options: [R`曲率与挠率都为零`, R`曲率为零，挠率不为零`, R`曲率不为零，挠率为零`, R`两者都不为零`],
    answer: 1, why: R`这种平行移动由一组整体的标架（东、北）定义，结果与路径无关，所以 $R=0$；但小四边形不闭合，$T^\phi{}_{\theta\phi}=\cot\theta\neq0$（本站已改正原书的符号）。Levi-Civita 联络则相反：无挠有曲。`,
  },
  {
    q: R`为什么 Einstein 最终让 $G_{\mu\nu}$ 而不是 $\mathit{Ric}_{\mu\nu}$ 正比于 $T_{\mu\nu}$？`,
    options: [R`因为 $\mathit{Ric}_{\mu\nu}$ 不对称`, R`因为由第二 Bianchi 恒等式 $\nabla_\mu G^{\mu\nu}\equiv0$，与能动量守恒 $\nabla_\mu T^{\mu\nu}=0$ 相容；而 $\nabla_\mu \mathit{Ric}^{\mu\nu}=\frac12\nabla^\nu\mathcal R$ 一般不为零`, R`因为 $G_{\mu\nu}$ 的分量更少`, R`因为 $\mathit{Ric}_{\mu\nu}$ 在真空中不为零`],
    answer: 1, why: R`\eqref{7.84}–\eqref{7.86}：缩并两次的 Bianchi 恒等式给出 $\nabla_\mu(\mathit{Ric}^{\mu\nu}-\frac12g^{\mu\nu}\mathcal R)=0$。它也可由 Einstein–Hilbert 作用量变分得到（\eqref{7.207}）。`,
  },
  {
    q: R`$m$ 维 Riemann 流形的 Riemann 张量有多少独立分量？四维呢？`,
    options: [R`$m^4$；256`, R`$\frac1{12}m^2(m^2-1)$；20`, R`$\binom m2^2$；36`, R`$\frac12m(m+1)$；10`],
    answer: 1, why: R`\eqref{7.88}：两对反对称、成对对称给出 $\frac12N(N+1)$（$N=\binom m2$），第一 Bianchi 恒等式再减去 $\binom m4$。$m=2$ 时为 1（Gauss 曲率），$m=4$ 时为 20（其中 10 个在 Ricci 张量里，10 个在 Weyl 张量里）。`,
  },
  {
    q: R`Hodge 定理 $H^r(M)\cong\mathrm{Harm}^r(M)$ 意味着：`,
    options: [R`调和形式与度规无关`, R`每个 de Rham 上同调类有唯一的调和代表元，所以 Betti 数 $b^r$ 等于 Laplace 算子在 $r$ 形式上的零模个数`, R`所有闭形式都是调和的`, R`它对 Lorentz 流形也成立`],
    answer: 1, why: R`调和代表元依赖度规，但其个数是拓扑不变量。证明要用内积的正定性（\eqref{7.183}）与紧致性，所以不适用于 Lorentz 流形。$\chi(M)=\sum(-1)^r\dim\mathrm{Harm}^r$ 是指标定理的雏形。`,
  },
];

export const BRIDGE = R`本章的 Riemann 几何建立在实流形之上。第 8 章把同样的想法用到**复流形**：坐标卡之间的转移函数要求是全纯的，度规要与复结构相容（Hermite 度规、Kähler 度规），Hodge 理论分裂成 $(p,q)$ 形式的 Dolbeault 上同调——例 7.8"全纯函数是共形映射"与例 7.9"二维总有等温坐标"正是复几何的入口（每个可定向二维 Riemann 流形都是 Riemann 面）。再往后，第 9–10 章把 §7.8 的标架转动 $\Lambda(p)$ 与联络一形式 $\omega'=\Lambda\omega\Lambda^{-1}+\Lambda\dd\Lambda^{-1}$ 抽象为主丛上的联络与规范变换，曲率 $\dd\omega+\omega\wedge\omega$ 变成规范场强 $F$，而和乐群、Bianchi 恒等式都原封不动地保留下来。`;
