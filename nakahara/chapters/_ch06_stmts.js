// 第 6 章的陈述登记表（定义 D、定理 T、引理 L、命题 P、推论 C）。格式见 framework/spec/PROOF.md。
// 数学与原书（PDF pp. 246–263）逐字符核对；原书笔误在 statusNote 中注明，正文已直接改正。
// 注意：String.raw 中不要让 $ 紧跟 {（会被当成插值）。
const R = String.raw;
export const S = {
  // ======================= §6.1 Stokes 定理 =======================
  "T6.1": {
    kind: "theorem", n: "6.1", ch: "ch06", en: "Stokes' theorem", zh: "Stokes 定理", page: 248, eq: "6.8",
    stmt: R`设 $\omega\in\Omega^{r-1}(M)$，$c\in C_r(M)$。则 $\displaystyle\int_c\dd\omega=\int_{\partial c}\omega$。`,
    deps: ["5.75", "D5.5"], status: "filled",
    statusNote: R`原书只对 $\psi=a(x)\,\dd x^1\wedge\ldots\wedge\dd x^{r-1}$ 一项做了计算，其余各项"同理"。本站补出：(i) 一般项 $\dd x^1\wedge\ldots\nosym{\widehat{\dd x^\mu}}\ldots\wedge\dd x^r$ 可用坐标的线性置换化归为这一项；(ii) 第一个面投影后的定向符号 $(-1)^{r-1}$ 的来由（$r$ 个顶点的轮换）；(iii) 对 $r=2,3$ 的显式核对。原书末尾"对 $m=3$ 验证"应为"对 $r=3$ 验证"。`,
    role: R`本章一切的发动机：它让外微分 $\dd$ 与边界算子 $\partial$ 互为伴随 \eqref{6.20}，从而 de Rham 上同调与奇异同调能够配对（\sref{T6.2}），也是证明"体积形式不是恰当形式"（例 6.6、6.7）的唯一工具。`,
    key: R`先用拉回把问题搬回标准单形：$\int_{s_r}\dd\omega=\int_{\bar\sigma_r}f^*\dd\omega=\int_{\bar\sigma_r}\dd(f^*\omega)$（\eqref{5.75}），再在 $\bar\sigma_r$ 上对 $x^r$ 用微积分基本定理；$\partial\bar\sigma_r$ 中只有两个面有贡献。`,
    pitfall: R`符号 $(-1)^{r-1}$ 出现两次：一次来自把 $\dd x^r$ 移到最后，一次来自面 $(p_1\ldots p_r)$ 投影成 $(p_1\ldots p_{r-1}p_0)$ 时的轮换。两者相消之前，很容易把其中一个漏掉。`,
  },
  // ======================= §6.2 de Rham 上同调群 =======================
  "D6.1": {
    kind: "definition", n: "6.1", ch: "ch06", en: "Cocycle group and coboundary group", zh: "上闭链群与上边缘群", page: 250,
    stmt: R`设 $M$ 是 $m$ 维微分流形。闭 $r$ 形式的全体称为第 $r$ **上闭链群**（cocycle group），记作 $Z^r(M)$；恰当 $r$ 形式的全体称为第 $r$ **上边缘群**（coboundary group），记作 $B^r(M)$。它们都是 $\mathbb{R}$ 系数的向量空间。由 $\dd^2=0$ 得 $Z^r(M)\supset B^r(M)$。`,
    deps: ["D5.5", "5.72"], status: "checked",
    role: R`与第 3 章的 $Z_r=\ker\partial_r$、$B_r=\operatorname{im}\partial_{r+1}$ 一一对应：这里 $Z^r=\ker\dd_{r+1}$、$B^r=\operatorname{im}\dd_r$。`,
    key: R`$\omega=\dd\psi\Rightarrow\dd\omega=\dd\dd\psi=0$：恰当必闭。`,
    pitfall: R`反过来闭不一定恰当——这正是上同调要测量的东西。例：$\mathbb{R}^2-\{0\}$ 上的 $\dd\theta$（习题 6.3）。`,
  },
  "D6.2": {
    kind: "definition", n: "6.2", ch: "ch06", en: "de Rham cohomology group", zh: "de Rham 上同调群", page: 251, eq: "6.11",
    stmt: R`第 $r$ **de Rham 上同调群**定义为 $H^r(M;\mathbb{R})\equiv Z^r(M)/B^r(M)$。当 $r\le-1$ 或 $r\ge m+1$ 时规定 $H^r(M;\mathbb{R})$ 为平凡群。以下省略系数 $\mathbb{R}$。`,
    deps: ["D6.1"], status: "checked",
    role: R`本章的核心对象。它的元素 $[\omega]$ 是"相差一个恰当形式"的闭形式类（上同调类）；它测量闭形式在**整体**上不能写成 $\dd$ 某物的障碍。`,
    key: R`$\omega\sim\omega'$ ⇔ $\omega'-\omega=\dd\psi$。$H^0(M)=Z^0(M)$ 是局部常值函数，数连通分支（例 6.1）。`,
    pitfall: R`$H^r(M)$ 是实向量空间，看不到第 3 章的挠（例如 $H^1(\mathbb{R}P^2)=0$，而 $H_1(\mathbb{R}P^2;\mathbb{Z})=\mathbb{Z}_2$）。`,
  },
  "T6.2": {
    kind: "theorem", n: "6.2", ch: "ch06", en: "de Rham's theorem", zh: "de Rham 定理", page: 254, eq: "6.21",
    stmt: R`若 $M$ 是紧致流形，则 $H_r(M)$ 与 $H^r(M)$ 都是有限维的。而且映射 $\Lambda:H_r(M)\times H^r(M)\to\mathbb{R}$（$\Lambda([c],[\omega])=\int_c\omega$）是双线性且非退化的。因此 $H^r(M)$ 是 $H_r(M)$ 的对偶向量空间。`,
    deps: ["T6.1", "D6.2"], status: "note",
    statusNote: R`原书不加证明地引用（"证明高度非平凡"）。本站只补出 $\Lambda$ 良定义的论证（Stokes 定理）以及"非退化 ⇒ 维数相等"这一步线性代数；完整证明见 Bott–Tu《Differential Forms in Algebraic Topology》§I.8（用 Mayer–Vietoris 与好覆盖归纳）。这里 $H_r(M)$ 是**实系数**奇异同调群。`,
    role: R`把"分析"（解偏微分方程 $\dd\omega=0$）与"拓扑"（数洞）连起来：$\dim H^r(M)=b_r(M)$ \eqref{6.25}，Euler 示性数可以用微分形式来算 \eqref{6.26}。`,
    key: R`良定义：换代表元 $c\to c+\partial c'$ 或 $\omega\to\omega+\dd\psi$，由 Stokes 定理多出的项是 $\int_{c'}\dd\omega=0$ 或 $\int_{\partial c}\psi=0$。`,
    pitfall: R`"非退化"说的是：若 $\int_c\omega=0$ 对**所有**闭链 $c$ 成立，则 $\omega$ 恰当；若 $\int_c\omega=0$ 对**所有**闭形式成立，则 $c$ 是边缘（实系数意义下）。只对一条闭链积分为零什么也说明不了。`,
  },
  "C6.1": {
    kind: "corollary", n: "6.1", ch: "ch06", en: "Periods determine cohomology classes", zh: "周期决定上同调类", page: 254,
    stmt: R`设 $M$ 是紧致流形，$k$ 为第 $r$ 个 Betti 数。取 $c_1,c_2,\ldots,c_k\in Z_r(M)$，使 $[c_1],\ldots,[c_k]$ 构成 $H_r(M)$ 的一组基。(a) 闭 $r$ 形式 $\psi$ 是恰当的，当且仅当 $\int_{c_i}\psi=0$（$1\le i\le k$）。(b) 对任意实数 $b_1,\ldots,b_k$，存在闭 $r$ 形式 $\omega$ 使 $\int_{c_i}\omega=b_i$（$1\le i\le k$）。`,
    deps: ["T6.2"], status: "note",
    statusNote: R`原书写"适当选取的 $c_i$，使 $[c_i]\neq[c_j]$"。两两不同远远不够（例如 $[c_2]=2[c_1]$），必须要求 $\{[c_i]\}$ 是 $H_r(M)$ 的一组**基**——原书证明 (b) 时正是这样用的（"homology basis"）。正文已按此改正。`,
    role: R`"周期"（$\int_{c_i}\omega$）是上同调类的完整坐标：(a) 说周期全零 ⇔ 类为零；(b) 说周期可以任意指定。物理上：磁单极荷、Aharonov–Bohm 相位、瞬子数都是某个闭形式的周期。`,
    key: R`取对偶基 $\int_{c_i}\omega_j=\delta_{ij}$ \eqref{6.24}，再令 $\omega=\sum_ib_i\omega_i$。`,
    pitfall: R`(a) 中"$\Rightarrow$"方向只需 Stokes 定理（习题 6.4）；"$\Leftarrow$"方向才真正用到 de Rham 定理。`,
  },
  // ======================= §6.3 Poincaré 引理 =======================
  "T6.3": {
    kind: "theorem", n: "6.3", ch: "ch06", en: "Poincaré's lemma", zh: "Poincaré 引理", page: 255, eq: "6.32",
    stmt: R`若流形 $M$ 的坐标邻域 $U$ 可缩到点 $p_0\in M$，则 $U$ 上任何闭 $r$ 形式（$r\ge1$）也是恰当的。`,
    deps: ["5.75", "D5.5"], status: "filled",
    statusNote: R`原书陈述未写 $r\ge1$；但 $r=0$ 时闭 0 形式是常数，而 $B^0=\{0\}$，常数 $\neq0$ 不是恰当的。证明中"$(F\circ f_1)^*=0$"也只对 $r\ge1$ 成立（常值映射拉回 0 形式得到常数而非零）。本站补出：同伦公式 \eqref{6.31} 中 $\dd P\eta$ 与 $P\dd\eta$ 的逐项相消；对 1 形式与 2 形式在 $\mathbb{R}^2$ 中写出显式原函数（径向线积分），并在交互图中数值验证。`,
    role: R`闭形式**局部**总是恰当的；所以 de Rham 上同调只能来自整体拓扑。同伦算子 $P$ 还被 \sref{L6.1} 再次使用，给出上同调的同伦不变性 \sref{T6.4}。`,
    key: R`同伦公式 $\dd(P\eta)+P(\dd\eta)=f_1^*\eta-f_0^*\eta$：把 $\eta=F^*\omega$ 代入，右边是 $-\omega$，左边第二项因 $\dd\omega=0$ 而消失。`,
    pitfall: R`可缩性是关键：$\mathbb{R}^2-\{0\}$ 上 $\dd\theta$ 闭而不恰当，因为它不可缩；但在去掉一条射线后的区域（星形）上，它就是 $\dd$（角度）。`,
  },
  // ======================= §6.4 de Rham 上同调群的结构 =======================
  "L6.1": {
    kind: "lemma", n: "6.1", ch: "ch06", en: "Homotopic maps pull back closed forms to cohomologous forms", zh: "同伦映射的拉回只差恰当形式", page: 261, eq: "6.55",
    stmt: R`设 $f,g:M\to N$ 同伦，$F:M\times I\to N$ 为光滑同伦，$F(p,0)=f(p)$，$F(p,1)=g(p)$。若 $\omega\in\Omega^r(N)$ 是闭形式，则拉回之差是恰当的：$f^*\omega-g^*\omega=\dd\psi$，$\psi\in\Omega^{r-1}(M)$；具体地 $\psi=-PF^*\omega$。`,
    deps: ["T6.3", "5.75"], status: "checked",
    role: R`Poincaré 引理证明的"推广版"：那里 $g$ 是常值映射；这里 $g$ 任意。它是 \sref{T6.4} 与 \sref{T6.5} 的共同引擎。`,
    key: R`$f=F\circ f_0$，$g=F\circ f_1$；同伦公式 \eqref{6.31} 应用于 $\eta=F^*\omega$，再用 $\dd F^*\omega=F^*\dd\omega=0$。`,
    pitfall: R`同伦公式 \eqref{6.31} 只用到 $M\times I$ 的乘积结构，对任意流形 $M$（不必可缩）都成立；可缩性只在 Poincaré 引理里用于让 $F\circ f_1$ 成为常值映射。`,
  },
  "T6.4": {
    kind: "theorem", n: "6.4", ch: "ch06", en: "Homotopy invariance of pullback", zh: "上同调拉回的同伦不变性", page: 261,
    stmt: R`设 $f,g:M\to N$ 彼此同伦。则它们在 de Rham 上同调群上诱导的拉回 $f^*,g^*:H^r(N)\to H^r(M)$ 相同。`,
    deps: ["L6.1"], status: "checked",
    role: R`推论：同伦等价的流形上同调同构（例如 $\mathbb{R}^2-\{0\}\simeq S^1$，所以 $H^1(\mathbb{R}^2-\{0\})\cong\mathbb{R}$）；可缩流形的上同调与一点相同（再次得到 \eqref{6.34}）。`,
    key: R`$[f^*\omega]-[g^*\omega]=[\dd\psi]=0$。`,
    pitfall: R`定理说的是上同调类层面的相等；在形式层面 $f^*\omega\neq g^*\omega$ 一般成立。`,
  },
  "T6.5": {
    kind: "theorem", n: "6.5", ch: "ch06", en: "Simply connected ⇒ H¹ = 0", zh: "单连通流形的 $H^1$ 平凡", page: 261,
    stmt: R`设 $M$ 是单连通流形。则它的第一 de Rham 上同调群是平凡的：$H^1(M)=0$。`,
    deps: ["L6.1", "T6.1", "T4.9"], status: "filled",
    statusNote: R`原书先用 Hurewicz 定理（\sref{T4.9}）说明 $H_1(M)=0$，再给出不依赖 de Rham 定理的直接证明：闭形式沿零伦闭路的积分为零 \eqref{6.59}，故 $f(p)=\int_{p_0}^p\omega$ 与路径无关。本站补出最后一步"$\dd f=\omega$"的验证（在 $p$ 的坐标卡内沿直线段求导），并指出 (6.58) 中原书的 "$c_p\omega$" 应为 $c_p^*\omega$。`,
    role: R`把同伦论（第 4 章的 $\pi_1$）与上同调联系起来；立刻给出 $H^1(S^n)=0$（$n\ge2$）\eqref{6.60}。`,
    key: R`把闭路 $\alpha$ 看成 $S^1\to M$，它与常值闭路同伦；由 \sref{L6.1}，$\alpha^*\omega=\dd g$，而 $\partial S^1=\emptyset$，Stokes 给出 $\oint\alpha^*\omega=0$。`,
    pitfall: R`逆命题不成立：$H^1(M)=0$ 不推出单连通（例：$\pi_1$ 为有限群的空间，如 $\mathbb{R}P^2$，$H^1(\mathbb{R}P^2)=0$ 而 $\pi_1=\mathbb{Z}_2$）。`,
  },
};
