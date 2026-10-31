// 第 7 章的陈述登记表（定义 D、定理 T、引理 L、命题 P、推论 C）。格式见 framework/spec/PROOF.md。
// 数学与原书逐字符核对；原书笔误在 statusNote 中注明，正文已直接改正。
const R = String.raw;
export const S = {
  // ======================= 外部引用 =======================
  "X:Jacobi": {
    kind: "cited", n: "（第 5 章）", ch: "ch07", en: "Jacobi identity", zh: "李括号的 Jacobi 恒等式", page: 289,
    stmt: R`对任意向量场 $X,Y,Z$：$[[X,Y],Z]+[[Y,Z],X]+[[Z,X],Y]=0$。对线性算子的对易子同样成立，例如 $[\nabla_Z,[\nabla_X,\nabla_Y]]$ 的轮换和为零。`,
    deps: [], status: "note",
    statusNote: R`第 5 章（习题 5.9、\eqref{5.58}）已证明；对易子的 Jacobi 恒等式是纯代数恒等式（展开即得）。`,
    role: R`Bianchi 恒等式证明中的唯一"非平凡"输入：把轮换和里的二阶项消掉。`,
  },
  "X:Hodge-analysis": {
    kind: "cited", n: "（椭圆算子理论）", ch: "ch07", en: "Solvability of the Laplace equation", zh: "Laplace 方程的可解性", page: 315,
    stmt: R`设 $(M,g)$ 是紧致、可定向、无边的 Riemann 流形。若 $\omega_r\in\Omega^r(M)$ 与所有调和 $r$ 形式正交，则存在 $\psi_r\in\Omega^r(M)$ 使 $\omega_r=\Delta\psi_r$；即 Green 算子 $\Delta^{-1}$ 在调和形式的正交补上有定义。`,
    deps: [], status: "note",
    statusNote: R`原书称其证明"高度技术性"而直接引用（习题 7.23 之后）。证明需要椭圆正则性与 Sobolev 空间中的紧性，见 Warner《Foundations of Differentiable Manifolds and Lie Groups》第 6 章。`,
    role: R`Hodge 分解定理中唯一不能用初等方法证明的一步：它保证 $\omega-P\omega$ 落在 $\Delta$ 的像里。`,
  },

  // ======================= §7.1 度规 =======================
  "D7.1": {
    kind: "definition", n: "7.1", ch: "ch07", en: "Riemannian and pseudo-Riemannian metric", zh: "Riemann 度规与伪 Riemann 度规", page: 264,
    stmt: R`设 $M$ 是微分流形。$M$ 上的 **Riemann 度规** $g$ 是 $M$ 上的 $(0,2)$ 型张量场，在每点 $p\in M$ 满足：(i) $g_p(U,V)=g_p(V,U)$；(ii) $g_p(U,U)\ge0$，等号仅当 $U=0$ 时成立。这里 $U,V\in T_pM$，$g_p=g|_p$。简言之，$g_p$ 是对称正定双线性型。$(0,2)$ 型张量场 $g$ 若满足 (i) 以及 (ii′) 若对所有 $U\in T_pM$ 都有 $g_p(U,V)=0$，则 $V=0$，就称为**伪 Riemann 度规**。`,
    deps: ["D5.1"], status: "checked",
    role: R`全章的起点：给每个切空间一个内积，从而有长度、角度、体积元，以及 $T_pM\cong T_p^*M$ 的典范同构（升降指标）。`,
    key: R`(ii′) 只要求非退化，不要求正定——这为 Lorentz 度规（相对论）留出了位置；指标 $(i,j)$ 记正负特征值的个数。`,
    pitfall: R`伪 Riemann 情形下 $g(U,U)=0$ 不推出 $U=0$（类光向量）；所以"长度"可以为零或为负，测地线是长度的**极值**而非最小值。`,
  },

  // ======================= §7.2 联络 =======================
  "D7.2": {
    kind: "definition", n: "7.2", ch: "ch07", en: "Affine connection", zh: "仿射联络", page: 269,
    stmt: R`**仿射联络** $\nabla$ 是映射 $\nabla:\mathcal{X}(M)\times\mathcal{X}(M)\to\mathcal{X}(M)$，$(X,Y)\mapsto\nabla_XY$，满足 \eqref{7.13a}–\eqref{7.13d}：$\nabla_X(Y+Z)=\nabla_XY+\nabla_XZ$，$\nabla_{(X+Y)}Z=\nabla_XZ+\nabla_YZ$，$\nabla_{(fX)}Y=f\nabla_XY$，$\nabla_X(fY)=X[f]Y+f\nabla_XY$，其中 $f\in\mathcal{F}(M)$，$X,Y,Z\in\mathcal{X}(M)$。`,
    deps: ["D5.1"], status: "checked",
    role: R`给出"把向量搬到邻点再比较"的规则；在坐标中完全由 $m^3$ 个联络系数 $\Gamma^\lambda{}_{\nu\mu}$ 决定（\eqref{7.14}）。平行移动、测地线、挠率、曲率都由它定义。`,
    key: R`对下标 $X$ 是**函数线性**的（\eqref{7.13c}），对被求导的 $Y$ 满足 Leibniz 律（\eqref{7.13d}）。前者使 $\nabla_XY|_p$ 只依赖 $X$ 在 $p$ 点的值——这正是李导数 $\mathcal{L}_XY$ 不具备的性质。`,
    pitfall: R`$\Gamma$ 不是张量（\eqref{7.29} 有非齐次项），在一个坐标系里为零不代表在别的坐标系里为零；两个联络之差才是张量（习题 7.5）。`,
  },

  // ======================= §7.4 Levi-Civita =======================
  "T7.1": {
    kind: "theorem", n: "7.1", ch: "ch07", en: "Fundamental theorem of (pseudo-)Riemannian geometry", zh: "（伪）Riemann 几何基本定理", page: 281,
    stmt: R`在（伪）Riemann 流形 $(M,g)$ 上，存在唯一一个与度规 $g$ **相容**的**对称**联络。这个联络称为 **Levi-Civita 联络**，其系数为 Christoffel 符号 $\Gamma^\kappa{}_{\mu\nu}=\frac12g^{\kappa\lambda}(\partial_\mu g_{\lambda\nu}+\partial_\nu g_{\lambda\mu}-\partial_\lambda g_{\mu\nu})$（\eqref{7.53}）。`,
    deps: ["D7.2", "7.30a", "7.34", "7.52"], status: "filled",
    statusNote: R`原书的证明"由 \eqref{7.34} 直接得到"，唯一性只说"显然"。本站补全：度规相容条件 \eqref{7.30b} 的三个轮换组合唯一地解出对称部分 \eqref{7.32}，再令挠率为零即得；存在性则需验证 \eqref{7.53} 确实满足 \eqref{7.30b} 与 \eqref{7.52}。`,
    role: R`把"度规"这一种结构变成"联络"这一种结构：有了 $g$ 就自动有了平行移动、测地线、曲率。广义相对论里引力场方程只需要 $g_{\mu\nu}$，正是因为这条定理。`,
    key: R`三个轮换组合 $-(7.30\mathrm{b})+(7.30\mathrm{c})+(7.30\mathrm{d})$ 把含 $\Gamma$ 的项整理成"对称部分 + 挠率"，于是度规相容的联络 = Christoffel 符号 + 挠率决定的切扭（contorsion）。`,
    pitfall: R`两个条件缺一不可：只要求度规相容，还剩挠率可以任意（Einstein–Cartan 理论）；只要求对称，还剩一个任意的对称张量。`,
  },
  "T7.2": {
    kind: "theorem", n: "7.2", ch: "ch07", en: "Bianchi identities", zh: "Bianchi 恒等式", page: 289,
    stmt: R`设 $R$ 是 Levi-Civita 联络的 Riemann 张量，则 $R(X,Y)Z+R(Z,X)Y+R(Y,Z)X=0$（第一 Bianchi 恒等式，\eqref{7.81a}）；$(\nabla_XR)(Y,Z)V+(\nabla_ZR)(X,Y)V+(\nabla_YR)(Z,X)V=0$（第二 Bianchi 恒等式，\eqref{7.81b}）。`,
    deps: ["7.36", "7.37", "X:Jacobi"], status: "checked",
    role: R`第一式减少 Riemann 张量的独立分量（\eqref{7.88}）；第二式缩并两次给出 $\nabla_\mu G^{\mu\nu}=0$（\eqref{7.85}），这是 Einstein 方程能与守恒的能动张量相容的几何原因。`,
    key: R`证明完全不用坐标：对恒等式 $T=0$ 求协变导数再作轮换和，二阶项靠 Jacobi 恒等式相消。`,
    pitfall: R`两式都依赖**无挠**。有挠率时右边出现挠率项（章末习题 7.1）。`,
  },

  // ======================= §7.5 和乐 =======================
  "D7.3": {
    kind: "definition", n: "7.3", ch: "ch07", en: "Holonomy group", zh: "和乐群", page: 291,
    stmt: R`设 $p\in(M,g)$，考虑 $p$ 处的闭合回路集合 $\{c(t)\mid0\le t\le1,\ c(0)=c(1)=p\}$。取 $X\in T_pM$ 沿 $c(t)$ 平行移动，走完一圈得到新的向量 $X_c\in T_pM$。于是回路 $c(t)$ 与联络 $\nabla$ 诱导线性变换 $P_c:T_pM\to T_pM$（\eqref{7.90}）。这些变换的集合记作 $H(p)$，称为 $p$ 处的**和乐群**。`,
    deps: ["D7.2", "7.18a"], status: "checked",
    role: R`把"绕一圈回来向量转了多少"这一曲率的整体效应组织成一个群；度规联络的和乐群落在 $\mathrm{SO}(m)$（或 $\mathrm{SO}(m-1,1)$）中。`,
    key: R`$P_{c'}P_c$ 对应先走 $c$ 再走 $c'$ 的复合回路 \eqref{7.91}，逆元对应反向回路，所以 $H(p)$ 确实是群；连通流形上不同点的和乐群共轭同构（\eqref{7.92}）。`,
    pitfall: R`原书说"$H(p)$ 平凡当且仅当 Riemann 张量为零"。这只对**单连通**流形成立；平坦但非单连通的空间（锥面、宇宙弦，见章末习题 7.3）可以有非平凡的离散和乐。`,
  },

  // ======================= §7.6 等距与共形 =======================
  "D7.4": {
    kind: "definition", n: "7.4", ch: "ch07", en: "Isometry", zh: "等距映射", page: 293,
    stmt: R`设 $(M,g)$ 是（伪）Riemann 流形。微分同胚 $f:M\to M$ 若保持度规，$f^*g_{f(p)}=g_p$（\eqref{7.96a}），即对 $X,Y\in T_pM$ 有 $g_{f(p)}(f_*X,f_*Y)=g_p(X,Y)$，则称为**等距映射**。`,
    deps: ["D5.2", "D7.1"], status: "checked",
    role: R`流形的"刚体运动"；无穷小等距给出 Killing 向量场（§7.7）。`,
    key: R`分量形式 \eqref{7.96b} 是拉回的分量公式 \eqref{5.37} 作用在 $g$ 上。`,
    pitfall: R`等距是**同一个**流形到自身的微分同胚，与"换坐标"不同：换坐标时度规分量改变而几何不变；等距则是把点挪动而度规分量（在对应点上）不变。`,
  },
  "D7.5": {
    kind: "definition", n: "7.5", ch: "ch07", en: "Conformal transformation", zh: "共形变换", page: 294,
    stmt: R`设 $(M,g)$ 是（伪）Riemann 流形。微分同胚 $f:M\to M$ 若只差一个标度地保持度规，$f^*g_{f(p)}=\mathrm{e}^{2\sigma}g_p$，$\sigma\in\mathcal{F}(M)$（\eqref{7.97a}），即 $g_{f(p)}(f_*X,f_*Y)=\mathrm{e}^{2\sigma}g_p(X,Y)$，则称为**共形变换**。`,
    deps: ["D7.4"], status: "checked",
    role: R`保角（\eqref{7.98}）而不保长度的变换；与之相关的 Weyl 重标度 $g\to\mathrm{e}^{2\sigma}g$ 是弦论的核心对称性（§7.11）。`,
    key: R`$\mathrm{e}^{2\sigma}$ 在 $\cos\theta$ 的分子分母中相消，所以角度不变。`,
    pitfall: R`共形变换（挪动点）与 Weyl 重标度（不挪点、只改度规）是两回事，前者构成 $\mathrm{Conf}(M)$，后者构成 $\mathrm{Weyl}(M)$。`,
  },
  "P7.1": {
    kind: "proposition", n: "7.1", ch: "ch07", en: "Difference of Levi-Civita connections under Weyl rescaling", zh: "共形相关度规的联络之差", page: 295,
    stmt: R`设 $\bar g=\mathrm{e}^{2\sigma}g$，$K(X,Y)\equiv\bar\nabla_XY-\nabla_XY$（\eqref{7.102}），$U$ 是与一形式 $\dd\sigma$ 对应的向量场：$Z[\sigma]=\langle\dd\sigma,Z\rangle=g(U,Z)$。则 $K(X,Y)=X[\sigma]Y+Y[\sigma]X-g(X,Y)U$（\eqref{7.103}）。`,
    deps: ["T7.1", "7.102"], status: "checked",
    statusNote: R`原书证明中 "$\bar g(\bar\nabla_X,Z)$""$g(\nabla_X,Z)$" 漏写了 $Y$，应为 $\bar g(\bar\nabla_XY,Z)$、$g(\nabla_XY,Z)$；本站已改正。`,
    role: R`共形变换下曲率如何变化（\eqref{7.108}–\eqref{7.115}、Weyl 张量）的出发点。`,
    key: R`与 Levi-Civita 联络的唯一性证明同一手法：度规相容给出 \eqref{7.104a}，三个轮换组合 (a)+(b)−(c) 解出 $g(K(X,Y),Z)$。`,
    pitfall: R`$K$ 对 $X,Y$ 对称是因为两个联络都无挠；$K$ 是 $(1,2)$ 型张量（两联络之差，习题 7.5）。`,
  },
  // ======================= §7.8 Cartan =======================
  "T7.3": {
    kind: "theorem", n: "7.3", ch: "ch07", en: "Cartan's structure equations", zh: "Cartan 结构方程", page: 305,
    stmt: R`联络一形式 $\omega^\alpha{}_\beta\equiv\Gamma^\alpha{}_{\gamma\beta}\hat\theta^\gamma$ 满足 Cartan 结构方程 $\dd\hat\theta^\alpha+\omega^\alpha{}_\beta\wedge\hat\theta^\beta=T^\alpha$（\eqref{7.146a}）与 $\dd\omega^\alpha{}_\beta+\omega^\alpha{}_\gamma\wedge\omega^\gamma{}_\beta=R^\alpha{}_\beta$（\eqref{7.146b}），其中挠率二形式 $T^\alpha\equiv\frac12T^\alpha{}_{\beta\gamma}\hat\theta^\beta\wedge\hat\theta^\gamma$，曲率二形式 $R^\alpha{}_\beta\equiv\frac12R^\alpha{}_{\beta\gamma\delta}\hat\theta^\gamma\wedge\hat\theta^\delta$。`,
    deps: ["7.143", "7.144", "7.145", "5.70"], status: "filled",
    statusNote: R`原书证明了 \eqref{7.146a}，把 \eqref{7.146b} 留作习题。本站补全了 \eqref{7.146b}：两边作用在 $(\hat e_\gamma,\hat e_\delta)$ 上，与 \eqref{7.144} 逐项比较。`,
    role: R`用微分形式算曲率的最快方法（例 7.14 球面、例 7.15 Schwarzschild）；第 10 章把它推广为纤维丛上的 $\Omega=\dd\omega+\omega\wedge\omega$。`,
    key: R`把 \eqref{5.70} 的无坐标外微分公式用于 $\hat\theta^\alpha$ 与 $\omega^\alpha{}_\beta$：$\dd\hat\theta^\alpha(\hat e_\gamma,\hat e_\delta)=-c_{\gamma\delta}{}^\alpha$ 提供了非坐标基特有的结构常数项。`,
    pitfall: R`$\omega^\alpha{}_\beta$ 的定义中 $\Gamma$ 的第一个下标是"求导方向"（与 $\hat\theta^\gamma$ 缩并）。指标顺序一错，\eqref{7.146a} 的符号就错。`,
  },

  // ======================= §7.9 Hodge 理论 =======================
  "T7.4": {
    kind: "theorem", n: "7.4", ch: "ch07", en: "Square of the Hodge star", zh: "Hodge 星算子的平方", page: 311,
    stmt: R`对 $r$ 形式 $\omega$：若 $(M,g)$ 是 Riemann 流形，$**\omega=(-1)^{r(m-r)}\omega$（\eqref{7.176a}）；若是 Lorentz 流形，$**\omega=(-1)^{1+r(m-r)}\omega$（\eqref{7.176b}）。`,
    deps: ["7.174"], status: "filled",
    statusNote: R`原书把 Lorentz 情形留给读者（"利用 $\det\eta=-1$"）；本站补全：两次作用 $*$ 时，$\varepsilon$ 的全部 $m$ 个指标恰好各被 $\eta^{\alpha\beta}$ 升起一次，给出因子 $\det(\eta^{\alpha\beta})=-1$，所以比 Riemann 情形多一个负号。`,
    role: R`给出 $*$ 的逆 \eqref{7.177a}，从而定义余微分 $\dd^\dagger$ 与 Laplace 算子。`,
    key: R`把 $\varepsilon_{\alpha_1\ldots\alpha_r\beta_{r+1}\ldots\beta_m}$ 的指标块整体换位置，要交换 $r(m-r)$ 次。`,
    pitfall: R`在 Lorentz 符号下，$*$ 的两次作用要把 $\varepsilon$ 的所有指标升起一次，$\varepsilon^{0123}=-\varepsilon_{0123}$；漏掉它就会得到 Riemann 情形的符号。`,
  },
  "D7.6": {
    kind: "definition", n: "7.6", ch: "ch07", en: "Adjoint exterior derivative", zh: "伴随外微分（余微分）", page: 313,
    stmt: R`设 $\dd:\Omega^{r-1}(M)\to\Omega^r(M)$ 为外微分。**伴随外微分算子** $\dd^\dagger:\Omega^r(M)\to\Omega^{r-1}(M)$ 定义为 $\dd^\dagger=(-1)^{mr+m+1}*\dd*$（Riemann，\eqref{7.184a}）或 $\dd^\dagger=(-1)^{mr+m}*\dd*$（Lorentz，\eqref{7.184b}），$m=\dim M$。`,
    deps: ["T7.4", "D5.5"], status: "checked",
    role: R`$\dd$ 关于内积 \eqref{7.181} 的伴随（\sref{T7.5}）；作用在一形式上就是（负的）散度，在 Maxwell 方程中给出有源的一半。`,
    key: R`符号因子 $(-1)^{mr+m+1}$ 恰好让 \sref{T7.5} 中的分部积分没有多余符号。`,
    pitfall: R`$\dd^\dagger$ 把形式的次数**降低**一，且依赖度规（通过 $*$）；$\dd$ 则与度规无关。`,
  },
  "T7.5": {
    kind: "theorem", n: "7.5", ch: "ch07", en: "d† is the adjoint of d", zh: "余微分是外微分的伴随", page: 313,
    stmt: R`设 $(M,g)$ 是紧致、可定向、无边的流形，$\alpha\in\Omega^r(M)$，$\beta\in\Omega^{r-1}(M)$，则 $(\dd\beta,\alpha)=(\beta,\dd^\dagger\alpha)$（\eqref{7.186}）。`,
    deps: ["D7.6", "T7.4", "T6.1", "7.181"], status: "checked",
    role: R`把 $\dd^\dagger$ 与 $\dd$ 的"转置"关系建立起来；由此 Laplace 算子自伴、非负（\eqref{7.190}），Hodge 理论才能展开。`,
    key: R`对 $\beta\wedge*\alpha$ 用 Leibniz 律与 Stokes 定理，在 $\dd*\alpha$ 前插入恒等映射 $(-1)^{mr+m+r+1}**$。`,
    pitfall: R`"无边"必不可少：有边界时多出边界项 $\int_{\partial M}\beta\wedge*\alpha$。`,
  },
  "D7.7": {
    kind: "definition", n: "7.7", ch: "ch07", en: "Laplacian", zh: "Laplace 算子", page: 314,
    stmt: R`**Laplace 算子** $\Delta:\Omega^r(M)\to\Omega^r(M)$ 定义为 $\Delta=(\dd+\dd^\dagger)^2=\dd\dd^\dagger+\dd^\dagger\dd$（\eqref{7.187}）。`,
    deps: ["D7.6"], status: "checked",
    role: R`作用在函数上就是 Laplace–Beltrami 算子 \eqref{7.188}（在欧氏空间是 $-\nabla^2$）；它的零空间（调和形式）给出 de Rham 上同调（\sref{T7.8}）。`,
    key: R`$(\dd+\dd^\dagger)^2$ 的交叉项 $\dd^2$、$\dd^{\dagger2}$ 都为零。`,
    pitfall: R`这个 $\Delta$ 是**正**算子，与物理里的 $\nabla^2$ 差一个负号：$\Delta f=-\nabla^2f$。`,
  },
  "T7.6": {
    kind: "theorem", n: "7.6", ch: "ch07", en: "Harmonic = closed and coclosed", zh: "调和 ⇔ 闭且余闭", page: 315,
    stmt: R`$r$ 形式 $\omega$ 是调和的（$\Delta\omega=0$）当且仅当 $\omega$ 既是闭的（$\dd\omega=0$）又是余闭的（$\dd^\dagger\omega=0$）。（$M$ 为紧致可定向无边的 Riemann 流形。）`,
    deps: ["7.190", "T7.5"], status: "filled",
    statusNote: R`原书一句话带过（"\eqref{7.190} 的直接推论"）。本站补全两个方向，并指出用到了内积的正定性 \eqref{7.183}。`,
    role: R`把二阶方程 $\Delta\omega=0$ 化为两个一阶方程；Hodge 定理证明中"调和形式是闭形式"即来自此。`,
    key: R`$(\omega,\Delta\omega)=(\dd\omega,\dd\omega)+(\dd^\dagger\omega,\dd^\dagger\omega)$，两项都非负。`,
    pitfall: R`在 Lorentz 流形或非紧流形上不成立（内积不正定或分部积分有边界项）：例如 Minkowski 空间的平面波满足 $\Delta A=0$ 却不必闭。`,
  },
  "T7.7": {
    kind: "theorem", n: "7.7", ch: "ch07", en: "Hodge decomposition theorem", zh: "Hodge 分解定理", page: 315,
    stmt: R`设 $(M,g)$ 是紧致、可定向、无边的 Riemann 流形，则 $\Omega^r(M)$ 唯一地分解为 $\Omega^r(M)=\dd\Omega^{r-1}(M)\oplus\dd^\dagger\Omega^{r+1}(M)\oplus\mathrm{Harm}^r(M)$（\eqref{7.192a}），即任一 $r$ 形式整体地写成 $\omega_r=\dd\alpha_{r-1}+\dd^\dagger\beta_{r+1}+\gamma_r$（\eqref{7.192b}），$\gamma_r$ 调和。（$r=0$ 时约定 $\Omega^{-1}(M)=\{0\}$。）`,
    deps: ["T7.5", "T7.6", "X:Hodge-analysis"], status: "filled",
    statusNote: R`原书的证明由习题 7.22、7.23 与"$\Delta^{-1}$ 有定义"拼成（\eqref{7.195}）。本站在两道习题的解答中补全了正交性与唯一性。`,
    role: R`把任意形式拆成"恰当 + 余恰当 + 调和"三块互相正交的部分；它是 Hodge 定理与物理中规范固定（如 Lorentz 规范）的数学背景。`,
    key: R`三个子空间两两正交（习题 7.22），且它们的正交补只有零（同一习题后半）；"补全"一步依赖 $\omega-P\omega=\Delta\psi$。`,
    pitfall: R`分解是**整体**的：局部上每个闭形式都恰当（Poincaré 引理），但整体上调和部分捕捉的正是拓扑。`,
  },
  "T7.8": {
    kind: "theorem", n: "7.8", ch: "ch07", en: "Hodge's theorem", zh: "Hodge 定理", page: 316,
    stmt: R`在紧致可定向（无边）的 Riemann 流形 $(M,g)$ 上，$H^r(M)\cong\mathrm{Harm}^r(M)$（\eqref{7.197}），同构由 $[\omega]\in H^r(M)\mapsto P\omega\in\mathrm{Harm}^r(M)$ 给出。特别地 $\dim\mathrm{Harm}^r(M)=\dim H^r(M)=b^r$（\eqref{7.198}）。`,
    deps: ["T7.7", "T7.6", "D6.2"], status: "checked",
    statusNote: R`原书写 "$B^r(M)\cap\mathrm{Harm}^r(M)=\emptyset$"，应为 $=\{0\}$（两个向量子空间至少共有零向量）。正文已改正。`,
    role: R`把拓扑（Betti 数）与分析（Laplace 算子的零模个数）联系起来——第 12 章指标定理的原型：$\chi(M)=\sum(-1)^r\dim\mathrm{Harm}^r(M)$。`,
    key: R`闭形式的 Hodge 分解中余恰当部分必为零：$0=(\dd\omega,\beta)=(\dd^\dagger\beta,\dd^\dagger\beta)$。`,
    pitfall: R`调和代表元依赖度规，但它的**个数** $b^r$ 不依赖——这正是"拓扑不变量 = 分析量"的意思。`,
  },

  // ======================= §7.10 广义相对论 =======================
  "P7.2": {
    kind: "proposition", n: "7.2", ch: "ch07", en: "Variations of the metric quantities; Palatini identity", zh: "度规量的变分与 Palatini 恒等式", page: 318,
    stmt: R`设 $(M,g)$ 是（伪）Riemann 流形。在变分 $g_{\mu\nu}\to g_{\mu\nu}+\delta g_{\mu\nu}$ 下，(a) $\delta g^{\mu\nu}=-g^{\mu\kappa}g^{\lambda\nu}\delta g_{\kappa\lambda}$（\eqref{7.203}）；(b) $\delta g=gg^{\mu\nu}\delta g_{\mu\nu}$，$\delta\sqrt{|g|}=\frac12\sqrt{|g|}g^{\mu\nu}\delta g_{\mu\nu}$（\eqref{7.204}）；(c) $\delta \mathit{Ric}_{\mu\nu}=\nabla_\kappa\delta\Gamma^\kappa{}_{\nu\mu}-\nabla_\nu\delta\Gamma^\kappa{}_{\kappa\mu}$（Palatini 恒等式，\eqref{7.205}）。`,
    deps: ["7.42", "7.75", "7.50b"], status: "filled",
    statusNote: R`原书 (c) 的证明中第二项印作 "$\nabla_\nu\Gamma^\kappa{}_{\kappa\mu}$"，漏了 $\delta$；并请读者验证"第二个等号"。本站补全：在正规坐标中 $\Gamma=0$，所以 $\partial$ 与 $\nabla$ 作用在张量 $\delta\Gamma$ 上相同，\eqref{7.42} 中 $\Gamma\Gamma$ 项的变分也为零。`,
    role: R`Einstein–Hilbert 作用量变分 \eqref{7.207} 的三块原料；(c) 说明 $g^{\mu\nu}\delta \mathit{Ric}_{\mu\nu}$ 是全散度，不贡献运动方程。`,
    key: R`(b) 用 $\ln\det g=\Tr\ln g$；(c) 用正规坐标（\eqref{7.75}）与"两联络之差是张量"（习题 7.5）。`,
    pitfall: R`$\delta\Gamma$ 是张量，但 $\Gamma$ 不是；所以 $\nabla\delta\Gamma$ 有意义，而 $\nabla\Gamma$ 没有。`,
  },
};
