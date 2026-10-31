// 第 8 章的陈述登记表（定义 D、定理 T、引理 L、命题 P、推论 C）。格式见 framework/spec/PROOF.md。
// 数学与原书（PDF pp.328–367）逐字符核对；原书笔误在 statusNote 中注明，正文已直接改正。
const R = String.raw;
export const S = {
  // ======================= 外部引用 =======================
  "X:max-principle": {
    kind: "cited", n: "（复分析）", ch: "ch08", en: "Holomorphic functions on compact complex manifolds are constant", zh: "紧复流形上的全纯函数是常数", page: 336,
    stmt: R`设 $M$ 是连通的紧复流形，$f:M\to\C$ 全纯，则 $f$ 是常数。即 $\mathcal{O}(M)=\C$。`,
    deps: [], status: "note",
    statusNote: R`原书引 Wells (1980)。证明：$|f|$ 在紧集上取到最大值；由最大模原理 $f$ 在该点邻域内为常数；由解析延拓（恒等定理）在整个连通的 $M$ 上为常数。`,
    role: R`说明紧复流形不能全纯地嵌入 $\C^N$，只能嵌入射影空间；也给出 $b^{0,0}=\dim H^{0,0}_{\bar\partial}=1$。`,
  },
  "X:aut-C": {
    kind: "cited", n: "（复分析）", ch: "ch08", en: "Biholomorphic self-maps of the plane", zh: "复平面的双全纯自映射", page: 332,
    stmt: R`$\C$ 到自身上的一一全纯映射必形如 $z\mapsto az+b$，$a,b\in\C$，$a\neq0$。`,
    deps: [], status: "note",
    statusNote: R`标准结果：一一的整函数在 $\infty$ 处不能有本性奇点（Casorati–Weierstrass 与单射矛盾），故为多项式；单射的多项式只能是一次的。`,
    role: R`例 8.2 中把"两个复环面全纯等价"化为"两个格相差一个复数倍 $\lambda$ 与模群矩阵"的关键一步（\eqref{8.5}）。`,
  },

  // ======================= §8.1 =======================
  "D8.1": {
    kind: "definition", n: "8.1", ch: "ch08", en: "Complex manifold", zh: "复流形", page: 328,
    stmt: R`$M$ 称为**复流形**（complex manifold），如果下列公理成立：(i) $M$ 是拓扑空间。(ii) $M$ 带有一族对子 $\{(U_i,\varphi_i)\}$。(iii) $\{U_i\}$ 是覆盖 $M$ 的一族开集；映射 $\varphi_i$ 是从 $U_i$ 到 $\C^m$ 的开子集 $U$ 上的同胚。［因此 $M$ 是偶数维的。］(iv) 对满足 $U_i\cap U_j\neq\emptyset$ 的 $U_i$、$U_j$，从 $\varphi_i(U_i\cap U_j)$ 到 $\varphi_j(U_i\cap U_j)$ 的映射 $\psi_{ji}=\varphi_j\circ\varphi_i^{-1}$ 是全纯的。`,
    deps: ["D5.1", "8.1"], status: "checked",
    role: R`全章的起点：与微分流形（\sref{D5.1}）的唯一区别是卡取值于 $\C^m$、转移函数要求全纯而不只是光滑。由此切空间带有与卡无关的殆复结构 $J$，形式按 $(r,s)$ 分级。`,
    key: R`全纯性只需在转移函数（$\C^m$ 开集之间的普通映射）上用 Cauchy–Riemann 方程 \eqref{8.1} 检验；全纯函数的复合仍全纯，所以"全纯映射""全纯函数"的概念与卡无关。`,
    pitfall: R`(a) 实维数为偶数只是必要条件（$S^4$ 连殆复结构都没有）。(b) 同一个光滑流形可以带有许多不等价的复结构（例 8.2：$T^2$ 的复结构由 $\tau\in\mathrm{H}/\mathrm{PSL}(2,\Z)$ 参数化）。(c) 例 8.1 中若不翻转南极卡的定向，转移函数是反全纯的 $1/\bar Z$，不构成复图册。`,
  },

  // ======================= §8.3 =======================
  "D8.2": {
    kind: "definition", n: "8.2", ch: "ch08", en: "Forms of bidegree (r, s)", zh: "双次为 (r,s) 的形式", page: 341,
    stmt: R`设 $M$ 是复流形，$\dim_\C M=m$。设 $\omega\in\Omega^q_p(M)^\C$（$q\le2m$），$r,s$ 是满足 $r+s=q$ 的非负整数。设 $V_i\in T_pM^\C$（$1\le i\le q$）中每个都属于 $T_pM^+$ 或 $T_pM^-$。若除非恰有 $r$ 个 $V_i$ 属于 $T_pM^+$、$s$ 个 $V_i$ 属于 $T_pM^-$，总有 $\omega(V_1,\ldots,V_q)=0$，则称 $\omega$ 的**双次**（bidegree）为 $(r,s)$，或简称 $\omega$ 为 **$(r,s)$ 形式**。$p$ 点 $(r,s)$ 形式的集合记为 $\Omega^{r,s}_p(M)$。若在 $M$ 的每点光滑地指定一个 $(r,s)$ 形式，就得到 $M$ 上的 $(r,s)$ 形式；其集合记为 $\Omega^{r,s}(M)$。`,
    deps: ["8.23", "D5.4"], status: "note",
    statusNote: R`原书写"$r,s$ 为正整数"，但随后大量使用 $\Omega^{r,0}$、$\Omega^{0,s}$，应为非负整数；本站已改正。`,
    role: R`把复形式按"含几个 $\dd z$、几个 $\dd\bar z$"分级（坐标表示 \eqref{8.35}）。外微分随之分裂成 $\partial+\bar\partial$，度规、Kähler 形式、曲率都按双次归类。`,
    key: R`$\dd z^\mu$ 是 $(1,0)$ 次的，因为 $\langle\dd z^\mu,\partial/\partial\bar z^\nu\rangle=0$；全纯坐标变换不混合 $\dd z$ 与 $\dd\bar z$，所以双次与卡无关。`,
    pitfall: R`双次需要复结构才能定义；在一般实流形上只有总次数 $q$。$\Omega^{r,s}$ 的复维数是 $\binom mr\binom ms$（习题 8.6），不是实维数。`,
  },
  "P8.1": {
    kind: "proposition", n: "8.1", ch: "ch08", en: "Conjugation, wedge product and decomposition of (r,s)-forms", zh: "(r,s) 形式的共轭、外积与分解", page: 341,
    stmt: R`设 $M$ 是复流形，$\dim_\C M=m$，$\omega$ 与 $\xi$ 是 $M$ 上的复微分形式。(a) 若 $\omega\in\Omega^{q,r}(M)$，则 $\overline\omega\in\Omega^{r,q}(M)$。(b) 若 $\omega\in\Omega^{q,r}(M)$、$\xi\in\Omega^{q',r'}(M)$，则 $\omega\wedge\xi\in\Omega^{q+q',r+r'}(M)$。(c) 复 $q$ 形式 $\omega$ 唯一地写成 $\omega=\sum_{r+s=q}\omega^{(r,s)}$（\eqref{8.36a}），其中 $\omega^{(r,s)}\in\Omega^{r,s}(M)$；于是有分解 $\Omega^q(M)^\C=\bigoplus_{r+s=q}\Omega^{r,s}(M)$（\eqref{8.36b}）。`,
    deps: ["D8.2", "8.27", "8.30", "8.35"], status: "filled",
    statusNote: R`原书："证明很容易，留给读者。"本站在正文中给出三部分的证明。`,
    role: R`双次分解的代数基础；\sref{T8.1} 证明 $\partial^2=\bar\partial^2=0$ 时正是靠 (c) 的唯一性"按双次比较"。`,
    key: R`(a) 来自 \eqref{8.30} 与共轭把 $T_pM^\pm$ 互换（\eqref{8.27}）；(c) 来自 $\{\dd z^\mu,\dd\bar z^\mu\}$ 是 $T_p^*M^\C$ 的基。`,
    pitfall: R`(a) 中双次的两个数字**对调**：$\overline{\dd z\wedge\dd\bar z\wedge\dd\bar z}$ 是 $(2,1)$ 形式。`,
  },
  "T8.1": {
    kind: "theorem", n: "8.1", ch: "ch08", en: "Properties of the Dolbeault operators", zh: "Dolbeault 算子的性质", page: 343,
    stmt: R`设 $M$ 是复流形，$\omega\in\Omega^q(M)^\C$，$\xi\in\Omega^p(M)^\C$。则 $\partial\partial\omega=(\partial\bar\partial+\bar\partial\partial)\omega=\bar\partial\bar\partial\omega=0$（\eqref{8.42a}）；$\partial\overline\omega=\overline{\bar\partial\omega}$，$\bar\partial\overline\omega=\overline{\partial\omega}$（\eqref{8.42b}）；$\partial(\omega\wedge\xi)=\partial\omega\wedge\xi+(-1)^q\omega\wedge\partial\xi$（\eqref{8.42c}）；$\bar\partial(\omega\wedge\xi)=\bar\partial\omega\wedge\xi+(-1)^q\omega\wedge\bar\partial\xi$（\eqref{8.42d}）。`,
    deps: ["8.40", "5.72", "P8.1", "8.32", "8.34"], status: "checked",
    statusNote: R`原书证明 (b) 中"$\partial\omega$ 与 $\overline{\bar\partial\omega}$ 的双次为 $(s+1,r)$"的 $\partial\omega$ 应为 $\partial\overline\omega$；(d) 原书未写，与 (c) 同理。`,
    role: R`$\bar\partial^2=0$ 让 Dolbeault 复形 \eqref{8.45} 与 $\bar\partial$ 上同调 \eqref{8.46} 有意义；$\partial\bar\partial=-\bar\partial\partial$ 用于 Ricci 形式与 Kähler 势；(b) 用于证明 Ricci 形式为实、以及 Hodge 对称 $b^{r,s}=b^{s,r}$。`,
    key: R`把 $\dd^2=0$ 按双次拆成三块，各块双次不同，由唯一分解必须分别为零。`,
    pitfall: R`这三个恒等式依赖于 $\dd$ 只分裂成**两**块（$\partial$、$\bar\partial$），这要求复结构可积；在一般殆复流形上 $\dd$ 还有改变双次 $(-1,+2)$、$(+2,-1)$ 的部分，$\bar\partial^2\neq0$（§8.7）。`,
  },
  "D8.3": {
    kind: "definition", n: "8.3", ch: "ch08", en: "Holomorphic r-form", zh: "全纯 r 形式", page: 343,
    stmt: R`设 $M$ 是复流形。若 $\omega\in\Omega^{r,0}(M)$ 满足 $\bar\partial\omega=0$，则称 $r$ 形式 $\omega$ 为**全纯 $r$ 形式**（holomorphic $r$-form）。`,
    deps: ["D8.2", "8.40"], status: "checked",
    role: R`全纯 0 形式就是全纯函数（\eqref{8.43}）；全纯 $r$ 形式在卡中就是系数全纯的 $\frac1{r!}\omega_{\mu_1\ldots\mu_r}\dd z^{\mu_1}\wedge\cdots\wedge\dd z^{\mu_r}$（\eqref{8.44}）。在紧 Kähler 流形上它们自动调和（§8.6.3），个数为 $b^{r,0}$。`,
    pitfall: R`只对 $(r,0)$ 形式定义。系数全纯的 $(r,s)$ 形式（$s>0$）不叫全纯形式——$\dd\bar z$ 本身不是全纯的。`,
  },

  // ======================= §8.4 =======================
  "T8.2": {
    kind: "theorem", n: "8.2", ch: "ch08", en: "Existence of Hermitian metrics", zh: "Hermite 度规的存在性", page: 345,
    stmt: R`复流形总容许 Hermite 度规。`,
    deps: ["8.50", "8.52", "8.17"], status: "checked",
    role: R`保证 §8.4 以后的一切（Kähler 形式、Hermite 联络、曲率、Ricci 形式、$\bar\partial^\dagger$）在任何复流形上都有意义；由 \sref{L8.1} 进而推出所有复流形可定向。`,
    key: R`对 $J$ 求平均：$\hat g(X,Y)=\frac12[g(X,Y)+g(JX,JY)]$。$J$ 生成的群 $\{1,J,-1,-J\}$ 作用在度规上只有两个不同的像，所以平均两项就够。`,
    pitfall: R`Hermite 度规总存在，但 **Kähler** 度规不一定存在（\sref{D8.4} 后的警告；例如 $S^1\times S^3$）。`,
  },
  "L8.1": {
    kind: "lemma", n: "8.1", ch: "ch08", en: "The top power of the Kähler form", zh: "Kähler 形式的最高次幂", page: 346,
    stmt: R`设 $\Omega$ 是 Hermite 流形的 Kähler 形式，$\dim_\C M=m$。则 $\underbrace{\Omega\wedge\ldots\wedge\Omega}_m$ 是处处不为零的 $2m$ 形式。`,
    deps: ["8.55", "8.56", "5.65"], status: "filled",
    statusNote: R`原书直接写"$=\sum_P\ldots=m!$"。本站补出：为何只有"每对 $(\hat e_i,J\hat e_i)$ 整体喂给同一个 $\Omega$"的项不为零，以及 \eqref{5.65} 的归一化如何给出 $m!$。`,
    role: R`给出整体的体积形式 $\Omega^m=m!\,\mathrm{vol}_g$，从而复流形可定向（\sref{T8.3}）；在 Kähler 情形又给出 $b^{2p}\ge1$（\sref{T8.11}）。`,
    key: R`在适配基 $\{\hat e_1,J\hat e_1,\ldots,\hat e_m,J\hat e_m\}$ 中 $\Omega$ 是标准辛形式 $\sum_i\hat e^i\wedge(J\hat e)^i$，其 $m$ 次幂是体积元的 $m!$ 倍。`,
  },
  "T8.3": {
    kind: "theorem", n: "8.3", ch: "ch08", en: "Complex manifolds are orientable", zh: "复流形可定向", page: 347,
    stmt: R`复流形是可定向的。`,
    deps: ["T8.2", "L8.1", "D5.6"], status: "checked",
    role: R`说明复流形上总能积分 $2m$ 形式，§8.6 的内积 \eqref{8.104} 才有意义；也解释了 $\RP^2$、Klein 瓶等不可定向曲面上没有复结构。`,
    key: R`实 $2m$ 形式 $\Omega^m$ 处处非零，可作体积元。另一个证明：全纯 Jacobi 矩阵的实行列式 $=|\det(\partial w/\partial z)|^2>0$。`,
  },
  "T8.4": {
    kind: "theorem", n: "8.4", ch: "ch08", en: "J is parallel for the Hermitian connection", zh: "J 关于 Hermite 联络协变常数", page: 348,
    stmt: R`殆复结构 $J$ 关于 Hermite 联络是协变常数：$(\nabla_\kappa J)_\nu{}^\mu=(\nabla_{\bar\kappa}J)_\nu{}^\mu=(\nabla_\kappa J)_{\bar\nu}{}^{\bar\mu}=(\nabla_{\bar\kappa}J)_{\bar\nu}{}^{\bar\mu}=0$（\eqref{8.70}）。`,
    deps: ["8.22", "8.62a", "8.62b", "8.69"], status: "filled",
    statusNote: R`原书只证第一个等式，"其余由类似计算得到"；本站补出第二个（混合联络为零）与后两个（共轭）以及混合分量的说明。`,
    role: R`Hermite 联络的平行移动保持全纯向量为全纯向量（构造时的要求）的张量表述；在 Kähler 流形上 Hermite 联络 = Levi-Civita 联络，于是 \sref{T8.5} 的"⇒"方向由它得出。`,
    key: R`$J$ 在复基下是常数矩阵 $\mathrm{diag}(\mathrm{i},-\mathrm{i})$，而联络不混合两个块，两个联络项正好相消。`,
  },
  "P8.2": {
    kind: "proposition", n: "8.2", ch: "ch08", en: "The first Chern class is metric independent", zh: "第一陈类与度规无关", page: 350,
    stmt: R`第一陈类 $c_1(M)=[\mathfrak{R}/2\pi]$ 在度规的光滑变化 $g\to g+\delta g$ 下不变。`,
    deps: ["8.79", "7.204", "P7.2", "8.42a"], status: "filled",
    statusNote: R`原书证明中写 $\delta\mathfrak{R}=-\frac12\dd(\partial-\bar\partial)\mathrm{i}g^{\mu\bar\nu}\delta g_{\mu\bar\nu}$、$\omega=-\frac12(\partial-\bar\partial)g^{\mu\bar\nu}\delta g_{\mu\bar\nu}$：符号应为正（$\bar\partial\partial=+\frac12\dd(\partial-\bar\partial)$），且 $\omega$ 漏了因子 $\mathrm{i}$。正确的 $\omega=\frac{\mathrm{i}}{2}(\partial-\bar\partial)g^{\mu\bar\nu}\delta g_{\mu\bar\nu}$ 是实的整体一形式。结论不变。`,
    role: R`说明 $c_1(M)$ 是复流形（而非度规）的不变量；\sref{T8.6} 用它推出"存在 Ricci 平坦度规 ⇒ $c_1=0$"。`,
    key: R`$\delta\log G=g^{\mu\bar\nu}\delta g_{\mu\bar\nu}$ 是**标量**，所以 $(\partial-\bar\partial)$ 作用在它上面是整体定义的；而 $\log G$ 本身不是标量，$\mathfrak{R}$ 因此不必恰当。`,
    pitfall: R`$\mathfrak{R}$ 是闭的但一般不恰当：恰当性只对**变分** $\delta\mathfrak{R}$ 成立。`,
  },

  // ======================= §8.5 =======================
  "D8.4": {
    kind: "definition", n: "8.4", ch: "ch08", en: "Kähler manifold", zh: "Kähler 流形", page: 350,
    stmt: R`**Kähler 流形**是 Kähler 形式闭合（$\dd\Omega=0$）的 Hermite 流形 $(M,g)$。度规 $g$ 称为 $M$ 的 **Kähler 度规**。［警告：并非所有复流形都容许 Kähler 度规。］`,
    deps: ["8.55", "T8.2"], status: "checked",
    role: R`本章的核心概念。等价刻画：$\nabla J=0$（\sref{T8.5}）；分量条件 \eqref{8.82}；局部存在 Kähler 势 \eqref{8.83}；Hermite 联络无挠 \eqref{8.96a}。后果：Hodge 理论给出 $b^p=\sum b^{r,s}$ 等拓扑约束（\sref{T8.11}）。`,
    key: R`$\dd\Omega=0$ 是一个一阶条件，在坐标中就是 $\partial_\lambda g_{\mu\bar\nu}=\partial_\mu g_{\lambda\bar\nu}$——度规的"旋度"为零，因而局部是 $\partial\bar\partial$ 某个势。`,
    pitfall: R`复一维时自动成立（例 8.7），所以 Kähler 条件的威力只在 $\dim_\C\ge2$ 时显现；反例 $S^1\times S^3$（$b^1=1$）、$S^3\times S^3$（$b^2=0$）。`,
  },
  "T8.5": {
    kind: "theorem", n: "8.5", ch: "ch08", en: "Kähler iff J is parallel", zh: "Kähler ⇔ J 平行", page: 351,
    stmt: R`Hermite 流形 $(M,g)$ 是 Kähler 流形，当且仅当殆复结构 $J$ 满足 $\nabla_\mu J=0$（\eqref{8.80}），其中 $\nabla_\mu$ 是 $g$ 的 Levi-Civita 联络。`,
    deps: ["8.81", "8.55", "T7.1", "8.82", "8.96a", "T8.4"], status: "filled",
    statusNote: R`原书证明了 $\nabla J=0\iff\nabla\Omega=0$ 与 $\dd\Omega=\nabla\Omega$（全反对称化），由此只得出"$\nabla J=0\Rightarrow\dd\Omega=0$"；反方向（$\dd\Omega$ 只是 $\nabla\Omega$ 的反对称部分）没有给出。本站用本章自己的结果补全："Kähler ⇒ \eqref{8.82} ⇒ Hermite 联络无挠 ⇒（Levi-Civita 联络唯一性）Hermite 联络 = Levi-Civita 联络 ⇒（\sref{T8.4}）$\nabla J=0$"。`,
    role: R`说明在 Kähler 流形上 Riemann 结构与复结构完全相容：Levi-Civita 平行移动保持全纯向量，和乐群 $\subset\mathrm{U}(m)$。`,
    key: R`$(\nabla_Z\Omega)(X,Y)=g((\nabla_ZJ)X,Y)$；以及"无挠 + 度规相容"的联络唯一。`,
    pitfall: R`条件 $\dd\Omega=0$ 只约束 $\nabla\Omega$ 的全反对称部分；之所以能推出 $\nabla\Omega=0$ 全部为零，是因为 $J$ 可积（Nijenhuis 张量为零）——在殆 Hermite 流形上 $\dd\Omega=0$ 不足以推出 $\nabla J=0$（"殆 Kähler"流形）。`,
  },
  "T8.6": {
    kind: "theorem", n: "8.6", ch: "ch08", en: "Ricci-flat implies vanishing first Chern class", zh: "Ricci 平坦 ⇒ 第一陈类为零", page: 355,
    stmt: R`设 $(M,g)$ 是 Kähler 流形。若 $M$ 容许 Ricci 平坦度规 $h$，则其第一陈类必为零。`,
    deps: ["P8.2", "8.79"], status: "filled",
    statusNote: R`原书引用 \sref{P8.2} 的结论 $\mathfrak{R}(g)-\mathfrak{R}(h)=\dd\omega$；P8.2 讨论的是无穷小变分，本站补充：对有限差，$\log(G_g/G_h)$ 是整体函数，直接给出恰当性。`,
    role: R`Calabi–Yau 条件的必要性一半；逆命题是 Calabi 猜想（Yau 1977 证明）。`,
    pitfall: R`反过来，$c_1=0$ 并不说明**给定的**度规 Ricci 平坦，只说明（在紧情形）每个 Kähler 类中存在唯一的 Ricci 平坦度规（Yau）。`,
  },
  "T8.7": {
    kind: "theorem", n: "8.7", ch: "ch08", en: "Holonomy of Ricci-flat Kähler manifolds", zh: "Ricci 平坦 Kähler 流形的和乐群", page: 355,
    stmt: R`若 $g$ 是 $m$ 维 Calabi–Yau 流形 $M$ 的 Ricci 平坦度规，则（限制）和乐群包含于 $\mathrm{SU}(m)$。`,
    deps: ["8.99", "8.100", "8.101", "8.78", "D7.3", "T8.5"], status: "note",
    statusNote: R`原书标明证明是"概要的"，并注明严格说只证明了**限制**和乐群包含于 $\mathrm{SU}(m)$。原书又说"对多连通的 $M$ 这一结论仍成立"——对完整和乐群这需要额外条件（如 $M$ 单连通或典范丛平凡）：例如 Enriques 面的 Ricci 平坦度规（$c_1$ 在实系数下为零）的完整和乐群不在 $\mathrm{SU}(2)$ 中。登记表陈述中已写"限制和乐群"。另原书"maifold"为 manifold 之误。`,
    role: R`把 Ricci 平坦与 $\mathrm{SU}(m)$ 和乐联系起来；物理上意味着存在平行旋量，Calabi–Yau 紧化保留部分超对称。`,
    key: R`和乐的 $\mathfrak{u}(1)$ 部分（迹）恰是 Ricci 形式：$\mathrm{tr}(h-1)=\mathfrak{R}_{\mu\bar\nu}\varepsilon^\mu\bar\delta^\nu$。`,
  },

  // ======================= §8.6 =======================
  "P8.3": {
    kind: "proposition", n: "8.3", ch: "ch08", en: "Adjoints of the Dolbeault operators", zh: "Dolbeault 算子的伴随", page: 357,
    stmt: R`在紧、无边的 Hermite 流形上，$\partial^\dagger=-*\bar\partial*$，$\bar\partial^\dagger=-*\partial*$（\eqref{8.108}）。`,
    deps: ["8.104", "8.106", "8.42c", "8.42b", "T7.4", "8.109"], status: "checked",
    statusNote: R`原书陈述中未写"紧、无边"，但证明用 Stokes 定理积分 \eqref{8.109}，需要这一条件。`,
    role: R`给出 $\partial^\dagger$、$\bar\partial^\dagger$ 的显式表达，从而 $(\partial^\dagger)^2=(\bar\partial^\dagger)^2=0$（\eqref{8.110}）、$\Delta_{\bar\partial}$ 是二阶微分算子；共轭关系 $\overline{\bar\partial^\dagger\alpha}=\partial^\dagger\overline\alpha$ 用于 Hodge 对称。`,
    key: R`$\omega\wedge\bar*\psi$ 是 $(m-1,m)$ 形式，被 $\bar\partial$ 消灭，所以 $\dd=\partial$；符号 $(-1)^{r+s-1}(-1)^{r+s+1}=1$。`,
    pitfall: R`$\partial$ 的伴随里出现的是 $\bar\partial$：$*$ 把 $(r,s)$ 形式变成 $(m-s,m-r)$ 形式，交换了全纯与反全纯次数。`,
  },
  "T8.8": {
    kind: "theorem", n: "8.8", ch: "ch08", en: "Hodge's theorem (Dolbeault version)", zh: "Hodge 定理（Dolbeault 版本）", page: 358,
    stmt: R`设 $M$ 是紧（无边）Hermite 流形。$\Omega^{r,s}(M)$ 有唯一的正交分解 $\Omega^{r,s}(M)=\bar\partial\Omega^{r,s-1}(M)\oplus\bar\partial^\dagger\Omega^{r,s+1}(M)\oplus\mathrm{Harm}^{r,s}_{\bar\partial}(M)$（\eqref{8.113a}），即 $(r,s)$ 形式 $\omega$ 唯一地表示为 $\omega=\bar\partial\alpha+\bar\partial^\dagger\beta+\gamma$（\eqref{8.113b}），其中 $\alpha\in\Omega^{r,s-1}(M)$，$\beta\in\Omega^{r,s+1}(M)$，$\gamma\in\mathrm{Harm}^{r,s}_{\bar\partial}(M)$。由此 $H^{r,s}_{\bar\partial}(M)\cong\mathrm{Harm}^{r,s}_{\bar\partial}(M)$。`,
    deps: ["8.106", "8.111b", "8.112", "T7.7"], status: "note",
    statusNote: R`分解本身原书引 Schwartz (1986) 第 22 讲，未证明（与实情形 \sref{T7.7} 一样需要椭圆算子理论）。推论 $H\cong\mathrm{Harm}$ 原书给出证明，本站逐步写出；原书"$\mathrm{Harm}\cap B=\emptyset$"应为"$=\{0\}$"。陈述中补上"紧"。`,
    role: R`把每个 $\bar\partial$ 上同调类与唯一的调和代表对应起来，于是 Hodge 数 $b^{r,s}$ 有限，并可以借助 Laplace 算子比较（\sref{T8.9}–\sref{T8.11}）。`,
    key: R`$\bar\partial\omega=0$ 推出 $\bar\partial\bar\partial^\dagger\beta=0$，与 $\beta$ 内积得 $\|\bar\partial^\dagger\beta\|^2=0$。`,
  },
  "T8.9": {
    kind: "theorem", n: "8.9", ch: "ch08", en: "Laplacians on a Kähler manifold", zh: "Kähler 流形上的 Laplace 算子", page: 359,
    stmt: R`设 $M$ 是 Kähler 流形，则 $\Delta=2\Delta_\partial=2\Delta_{\bar\partial}$（\eqref{8.114}）。`,
    deps: ["D8.4", "T8.5", "8.111a", "8.111b", "D7.7"], status: "note",
    statusNote: R`原书："证明需要一些技巧"，引 Schwartz (1986) 与 Goldberg (1962)。标准证明用 Kähler 恒等式 $[\Lambda,\bar\partial]=-\mathrm{i}\partial^\dagger$、$[\Lambda,\partial]=\mathrm{i}\bar\partial^\dagger$（Griffiths–Harris 第 0 章 §7）。本站在正文中对 $\C^m$ 上的函数直接验证了 $\Delta=2\Delta_{\bar\partial}$。`,
    role: R`Kähler 流形上"调和"只有一种：$\Delta$ 调和 ⇔ $\Delta_{\bar\partial}$ 调和 ⇔ $\Delta_\partial$ 调和。由此全纯形式自动调和，并推出 \sref{T8.10}、\sref{T8.11}。`,
    pitfall: R`在一般 Hermite 流形上三个 Laplace 算子没有关系；$\Delta_{\bar\partial}$ 调和的形式不一定闭。`,
  },
  "T8.10": {
    kind: "theorem", n: "8.10", ch: "ch08", en: "Symmetries of the Hodge numbers", zh: "Hodge 数的对称性", page: 360,
    stmt: R`设 $M$ 是紧 Kähler 流形，$\dim_\C M=m$。则 Hodge 数满足 (a) $b^{r,s}=b^{s,r}$（\eqref{8.116}）；(b) $b^{r,s}=b^{m-r,m-s}$（\eqref{8.117}）。`,
    deps: ["T8.9", "T8.8", "8.42b", "8.108"], status: "filled",
    statusNote: R`(b) 中配对的非奇异性原书引 Schwartz (1986)；本站补充要点：非零调和 $\omega$ 与调和的 $\bar*\omega$ 配对给出 $(\omega,\omega)>0$。陈述中补上"紧"。`,
    role: R`Hodge 菱形关于竖直线与水平线对称，独立 Hodge 数从 $(m+1)^2$ 减到 $(\frac m2+1)^2$（$m$ 偶）或 $\frac14(m+1)(m+3)$（$m$ 奇）。`,
    key: R`(a)：共轭把 $\Delta_{\bar\partial}$ 变成 $\Delta_\partial$，而 Kähler 时二者相等。(b)：Serre 对偶。`,
    pitfall: R`(a) 需要 Kähler；(b) 对任意紧复流形都成立（Serre 对偶），但 (a) 在 Hopf 曲面上失效（$b^{0,1}=1$，$b^{1,0}=0$）。`,
  },
  "T8.11": {
    kind: "theorem", n: "8.11", ch: "ch08", en: "Betti numbers of compact Kähler manifolds", zh: "紧 Kähler 流形的 Betti 数", page: 360,
    stmt: R`设 $M$ 是紧 Kähler 流形，$\dim_\C M=m$，$\partial M=\emptyset$。则 Betti 数 $b^p$（$1\le p\le2m$）满足：(a) $b^p=\sum_{r+s=p}b^{r,s}$（\eqref{8.118}）；(b) $b^{2p-1}$ 为偶数（$1\le p\le m$，\eqref{8.119}）；(c) $b^{2p}\ge1$（$1\le p\le m$，\eqref{8.120}）。`,
    deps: ["T8.8", "T8.9", "T7.8", "8.116", "L8.1", "D8.4", "8.36b"], status: "checked",
    statusNote: R`原书陈述只写 $\partial M=\emptyset$，漏了"紧致"（$\C^m$ 是无边 Kähler 流形但 $b^2=0$）；本站已补上。`,
    role: R`Kähler 性的拓扑障碍：$S^1\times S^3$（$b^1=1$）、$S^3\times S^3$（$b^2=0$）有复结构却没有 Kähler 度规。`,
    key: R`(a)：$\Delta=2\Delta_{\bar\partial}$ 保持双次，调和 $p$ 形式按 $(r,s)$ 分解。(c)：若 $\Omega^p=\dd\eta$，则 $\Omega^m=\dd(\Omega^{m-p}\wedge\eta)$，积分为零与体积为正矛盾。`,
  },

  // ======================= §8.7 =======================
  "D8.5": {
    kind: "definition", n: "8.5", ch: "ch08", en: "Almost complex manifold", zh: "殆复流形", page: 362,
    stmt: R`设 $M$ 是微分流形。若存在 $(1,1)$ 型张量场 $J$，使得在 $M$ 的每点 $p$ 有 $J_p^2=-\mathrm{id}_{T_pM}$，则称对子 $(M,J)$（或简称 $M$）为**殆复流形**（almost complex manifold）。张量场 $J$ 也称为**殆复结构**。`,
    deps: ["8.17"], status: "checked",
    role: R`把 §8.2 中"$J$ 来自全纯坐标"这一条件放宽为纯代数条件 $J^2=-1$；$T_pM^\pm$、$\mathcal{X}(M)^\pm$ 的分类照样可做。`,
    pitfall: R`殆复流形必为偶数维，但并非偶数维流形都有殆复结构（$S^4$）；有殆复结构也不一定是复流形（$S^6$ 的标准结构，或 §8.7 补充例）。`,
  },
  "D8.6": {
    kind: "definition", n: "8.6", ch: "ch08", en: "Integrable almost complex structure", zh: "可积的殆复结构", page: 363,
    stmt: R`设 $(M,J)$ 是殆复流形。若任意全纯向量场 $X,Y\in\mathcal{X}^+(M)$ 的李括号仍是全纯向量场，$[X,Y]\in\mathcal{X}^+(M)$，则称殆复结构 $J$ 是**可积的**（integrable）。`,
    deps: ["D8.5", "8.122"], status: "checked",
    role: R`复流形上这一性质自动成立（习题 8.3）；Newlander–Nirenberg 定理（\sref{T8.13}）说它也是充分的。`,
    key: R`由 Frobenius 定理的思路：$T^+$ 对括号封闭，才可能存在使 $T^+$ 由 $\partial/\partial z^\mu$ 张成的坐标。`,
  },
  "T8.12": {
    kind: "theorem", n: "8.12", ch: "ch08", en: "Integrability and the Nijenhuis tensor", zh: "可积性与 Nijenhuis 张量", page: 363,
    stmt: R`流形 $M$ 上的殆复结构 $J$ 可积，当且仅当对任意 $A,B\in\mathcal{X}(M)$ 有 $N(A,B)=0$，其中 $N$ 是 Nijenhuis 张量 \eqref{8.124}。`,
    deps: ["D8.6", "8.124", "8.126", "8.10"], status: "filled",
    statusNote: R`原书"容易看出 $N(Z^+,W^-)=0$"，本站补出这一行计算；以及"⇐"方向中 $N(Z,W)=2\{[Z,W]+\mathrm{i}J[Z,W]\}$ 的展开。`,
    role: R`把可积性（一个关于所有向量场的条件）化为一个张量是否为零，可以逐点用分量公式 \eqref{8.125} 检验。`,
    key: R`在 $T^\pm$ 上 $J=\pm\mathrm{i}$，$N(Z^+,W^+)$ 化为 $4\mathcal{P}^-[Z^+,W^+]$ 的倍数——它正是括号的反全纯分量。`,
  },
  "T8.13": {
    kind: "theorem", n: "8.13", ch: "ch08", en: "Newlander–Nirenberg theorem", zh: "Newlander–Nirenberg 定理", page: 364,
    stmt: R`（Newlander and Nirenberg 1957）设 $(M,J)$ 是 $2m$ 维殆复流形。若 $J$ 可积，则 $M$ 是以 $J$ 为殆复结构的复流形。`,
    deps: ["D8.6", "T8.12"], status: "note",
    statusNote: R`原书称其"重要且难以证明"，未给出证明。实解析情形可由 Frobenius 定理的复版本得到；光滑情形需要偏微分方程的估计（见 Newlander–Nirenberg 原文或 Hörmander 的 $\bar\partial$ 理论）。`,
    role: R`完成链条：可积殆复结构 = Nijenhuis 张量为零 = 复流形。`,
  },
};
