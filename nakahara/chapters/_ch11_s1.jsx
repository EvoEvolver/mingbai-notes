// 引言 + §11.1 不变多项式与 Chern–Weil 同态 —— 式 (11.1)–(11.24)，定理 11.1–11.2，推论 11.1
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Derivation, C } from "@kit";

const R = String.raw;

export function Intro() {
  return (
    <Sec n="11.0" title="Introduction" zh="引言：示性类测量丛的扭曲"
      gist={R`给定纤维 $F$、结构群 $G$ 与底空间 $M$，可以有许多不同的丛；示性类是 $M$ 的上同调类，测量丛偏离平凡丛 $M\times F$ 的程度——它们是丛平凡化的障碍。`}
      why={R`第 9、10 章已经看到：$S^4$ 上的 $\mathrm{SU}(2)$ 丛由整数 $n\in\pi_3(\mathrm{SU}(2))\cong\Z$ 分类，这个整数又等于 $\Tr\mathcal{F}^2$ 在 $S^4$ 上的积分（\sref{T10.7}）。本章把这个现象系统化。`}
      gives={[]}>
      <Tx>{R`给定纤维 $F$、结构群 $G$ 与底空间 $M$，按转移函数的不同选法，可以造出 $M$ 上许多纤维丛。自然要问：给定 $F$ 与 $G$，$M$ 上一共有多少种丛？它们与平凡丛 $M\times F$ 差多少？

我们已经见过一个答案的雏形。§10.5 指出，$S^4$ 上的 $\mathrm{SU}(2)$ 丛由同伦群 $\pi_3(\mathrm{SU}(2))\cong\Z$ 分类：整数 $n\in\Z$ 告诉我们，把丛的各个局部片段粘起来时，转移函数怎样把它们"拧"在一起。我们还看到，这个同伦类可以通过把 $\Tr\mathcal{F}^2\in H^4(S^4)$ 在 $S^4$ 上积分来求出（\sref{T10.7}）。

**示性类**（characteristic classes）是底空间上同调类的一些子集，它们测量丛的非平凡性或扭曲程度。在这个意义下，它们是阻止一个丛成为平凡丛的**障碍**（obstruction）。大部分示性类由 de Rham 上同调类给出。除了在纤维丛分类中的重要性，示性类还在指标定理（第 12 章）中扮演核心角色。

本章的叙述主要依照 Alvarez-Gaumé–Ginsparg (1984)、Eguchi 等 (1980)、Gilkey (1995) 与 Wells (1980)；更数学化的论述见 Bott–Tu (1982)、Milnor–Stasheff (1974)。`}</Tx>
      <Box kind="physics" title="本章的一条主线">{R`**局部量的积分 = 拓扑整数。**曲率 $\mathcal{F}$ 是逐点定义、依赖于联络的局部量；但只要把它代入一个规范不变的多项式 $P$，$P(\mathcal{F})$ 就是闭形式，并且换联络只改变一个恰当形式。于是闭流形上的积分 $\int_MP(\mathcal{F})$ 只依赖于丛的拓扑。单极子的磁荷、瞬子数、球面的 Euler 示性数都是这样的积分。交互图 1 和 3 分别在 $S^2$ 上的 U(1) 丛与切丛上数值地展示这一点。`}</Box>
    </Sec>);
}

export function Sec111() {
  return (
    <Sec n="11.1" title="Invariant polynomials and the Chern–Weil homomorphism" zh="不变多项式与 Chern–Weil 同态"
      gist={R`对称多线性型 $\tilde P$ 在 $\mathrm{Ad}_g$ 下不变 → 对角化得不变多项式 $P(A)$ → 推广到 $\mathfrak{g}$ 值形式 → **Chern–Weil 定理**：$\dd P(\mathcal{F})=0$，且 $P(\mathcal{F}')-P(\mathcal{F})=\dd\,TP(\mathcal{A}',\mathcal{A})$ → 示性类 $\chi_E(P)\in H^*(M)$ 与联络无关；Weil 同态与自然性 $\chi_{f^*E}=f^*\chi_E$；平凡丛的示性类平凡。`}
      why={R`曲率 $\mathcal{F}$ 依赖于联络，而且换卡时按 $\mathcal{F}_j=t_{ij}^{-1}\mathcal{F}_it_{ij}$ 变换。要从中提取只属于丛本身的信息，必须 (1) 消除共轭的影响——用不变多项式；(2) 消除联络选择的影响——取上同调类。`}
      gives={["11.3", "11.6", "11.7", "11.14", "11.20", "11.21", "11.22", "11.23", "11.24"]}>
      <p className="muted">本节概念：<C id="invariant_polynomial" /> · <C id="chern_weil" /> · <C id="characteristic_class" /></p>
      <Tx>{R`**de Rham 上同调回顾**（详见第 6 章）。设 $M$ 是 $m$ 维流形。$r$ 形式 $\omega\in\Omega^r(M)$ 若满足 $\dd\omega=0$ 称为**闭**的，若 $\omega=\dd\eta$（$\eta\in\Omega^{r-1}(M)$）称为**恰当**的。闭 $r$ 形式的集合记为 $Z^r(M)$，恰当 $r$ 形式的集合记为 $B^r(M)$。由 $\dd^2=0$，$Z^r(M)\supset B^r(M)$。第 $r$ 个 de Rham 上同调群定义为

$$H^r(M)\equiv Z^r(M)/B^r(M).$$

在 $H^r(M)$ 中，若 $\omega_1-\omega_2=\dd\eta$，两个闭 $r$ 形式 $\omega_1$、$\omega_2$ 被等同。形式和

$$H^*(M)\equiv H^0(M)\oplus H^1(M)\oplus\cdots\oplus H^m(M)$$

是**上同调环**，乘法 $\wedge:H^*(M)\times H^*(M)\to H^*(M)$ 由 $\wedge:H^p(M)\times H^q(M)\to H^{p+q}(M)$ 诱导。设 $f:M\to N$ 光滑。拉回 $f^*:\Omega^r(N)\to\Omega^r(M)$ 自然诱导线性映射 $f^*:H^r(N)\to H^r(M)$，因为 $f^*$ 与外微分交换：$f^*\dd\omega=\dd f^*\omega$。由于 $f^*(\omega\wedge\eta)=f^*\omega\wedge f^*\eta$，拉回保持上同调环的代数结构。`}</Tx>

      <Sub n="11.1.1" title="Invariant polynomials" zh="不变多项式">
        <Tx>{R`**我们要做什么。**曲率是一个矩阵值的二形式，在规范变换下被共轭。矩阵在共轭下最著名的不变量是迹与行列式——更一般地，是特征值的对称函数。这一小节把"共轭不变的矩阵函数"做成一个代数，并把它的定义域从矩阵推广到矩阵值的微分形式。

设 $M(k,\C)$ 是 $k\times k$ 复矩阵的集合，$S^r(M(k,\C))$ 是 $M(k,\C)$ 上对称的 $r$ 线性 $\C$ 值函数构成的向量空间。换句话说，映射

$$\tilde P:\bigotimes^rM(k,\C)\to\C$$

是 $S^r(M(k,\C))$ 的元素，如果它对每个变元线性，并且满足对称性`}</Tx>
        <Eq n="11.1" say={R`对称性：交换任意两个变元，$\tilde P$ 的值不变——它只"看"变元的集合，不看顺序。`}>{R`\tilde P(a_1,\ldots,a_i,\ldots,a_j,\ldots,a_r)=\tilde P(a_1,\ldots,a_j,\ldots,a_i,\ldots,a_r)\qquad1\le i,j\le r`}</Eq>
        <Tx>{R`其中 $a_p\in M(k,\C)$。［原书此处写 $a_p\in\mathrm{GL}(k,\C)$；$\tilde P$ 的定义域是全体矩阵 $M(k,\C)$，而且下面要代入的李代数元一般不可逆，应为 $M(k,\C)$。］令

$$S^*(M(k,\C))\equiv\bigoplus_{r=0}^\infty S^r(M(k,\C))$$

表示对称多线性 $\C$ 值函数的形式和。对 $\tilde P\in S^p(M(k,\C))$、$\tilde Q\in S^q(M(k,\C))$ 定义乘积`}</Tx>
        <Eq n="11.2" say={R`两个对称多线性函数的乘积：把 $p+q$ 个变元分给 $\tilde P$ 与 $\tilde Q$，对所有分法取平均，结果仍然对称。`}>{R`\tilde P\tilde Q(X_1,\ldots,X_{p+q})=\frac{1}{(p+q)!}\sum_P\tilde P(X_{P(1)},\ldots,X_{P(p)})\tilde Q(X_{P(p+1)},\ldots,X_{P(p+q)})`}</Eq>
        <Tx>{R`其中 $P$ 取遍 $(1,\ldots,p+q)$ 的置换。有了这个乘法，$S^*(M(k,\C))$ 成为一个代数。

设 $G$ 是矩阵群，$\mathfrak{g}$ 是它的李代数。实际中取 $G=\mathrm{GL}(k,\C)$、$\mathrm{U}(k)$ 或 $\mathrm{SU}(k)$。李代数 $\mathfrak{g}$ 是 $M(k,\C)$ 的子空间，我们可以考虑限制 $S^r(\mathfrak{g})$ 与 $S^*(\mathfrak{g})\equiv\bigoplus_{r\ge0}S^r(\mathfrak{g})$。若对任意 $g\in G$ 与 $A_i\in\mathfrak{g}$，$\tilde P\in S^r(\mathfrak{g})$ 满足`}</Tx>
        <Eq n="11.3" title="不变性" say={R`不变性：把所有变元同时用同一个群元共轭，函数值不变——它对"换一组规范"不敏感。`}>{R`\tilde P(\mathrm{Ad}_gA_1,\ldots,\mathrm{Ad}_gA_r)=\tilde P(A_1,\ldots,A_r)`}</Eq>
        <Tx>{R`就称它是**不变的**（invariant），其中 $\mathrm{Ad}_gA_i=g^{-1}A_ig$。例如`}</Tx>
        <Eq n="11.4" say={R`对称化迹：把矩阵的乘积以所有顺序取迹再平均。迹的循环性给出不变性，平均给出对称性。`}>{R`\tilde P(A_1,A_2,\ldots,A_r)=\mathrm{str}(A_1,A_2,\ldots,A_r)\equiv\frac1{r!}\sum_P\Tr(A_{P(1)}A_{P(2)}\cdots A_{P(r)})`}</Eq>
        <Tx>{R`是对称、$r$ 线性且不变的，其中"str"代表**对称化迹**（symmetrized trace），由最后一个等式定义。（不变性：$\Tr(g^{-1}A_1g\,g^{-1}A_2g\cdots)=\Tr(g^{-1}A_1A_2\cdots g)=\Tr(A_1A_2\cdots)$。）$S^r(\mathfrak{g})$ 中 $G$ 不变元素的集合记为 $I^r(G)$。注意 $\mathfrak{g}_1=\mathfrak{g}_2$ 并不一定意味着 $I^r(G_1)=I^r(G_2)$（例如 $\mathrm{O}(2l)$ 与 $\mathrm{SO}(2l)$ 李代数相同，但 Pfaffian 只是后者的不变量，见 §11.4.2）。由 \eqref{11.2} 定义的乘积自然诱导乘法`}</Tx>
        <Eq n="11.5" say={R`两个不变多项式的乘积仍是不变多项式：次数相加。`}>{R`I^p(G)\otimes I^q(G)\to I^{p+q}(G).`}</Eq>
        <Tx>{R`和 $I^*(G)\equiv\bigoplus_{r\ge0}I^r(G)$ 在这个乘法下是一个代数。

取 $\tilde P\in I^r(G)$。"对角组合"的简写是`}</Tx>
        <Eq n="11.6" keyEq title="不变多项式" say={R`把同一个矩阵 $A$ 填满 $\tilde P$ 的全部 $r$ 个变元：得到 $A$ 的一个 $r$ 次多项式——不变多项式。`}>{R`P(A)\equiv\tilde P(\underbrace{A,A,\ldots,A}_r)\qquad A\in\mathfrak{g}.`}</Eq>
        <Tx>{R`显然 $P$ 是 $r$ 次多项式，称为**不变多项式**（invariant polynomial）。$P$ 也是 $\mathrm{Ad}\,G$ 不变的：`}</Tx>
        <Eq n="11.7" title={R`$\mathrm{Ad}$ 不变`} say={R`不变多项式只依赖于矩阵的共轭类：这正是曲率在规范变换下"协变"而 $P(\mathcal{F})$"不变"的原因。`}>{R`P(\mathrm{Ad}_gA)=P(g^{-1}Ag)=P(A)\qquad A\in\mathfrak{g},\ g\in G.`}</Eq>
        <Tx>{R`例如 $\Tr(A^r)$ 是由 \eqref{11.4} 得到的不变多项式。一般地，不变多项式可以写成 $P_r\equiv\Tr(A^r)$ 的乘积之和。

**极化。**反过来，任何不变多项式 $P$ 都定义一个不变、对称的 $r$ 线性型 $\tilde P$：把 $P(t_1A_1+\cdots+t_rA_r)$ 展开成 $t_i$ 的多项式，$t_1t_2\cdots t_r$ 的系数乘以 $1/r!$，按构造就是不变且对称的，称为 $P$ 的**极化**（polarization）。以 $P(A)\equiv\Tr(A^3)$ 为例：按上面的处方，把 $\Tr(t_1A_1+t_2A_2+t_3A_3)^3$ 按 $t_1,t_2,t_3$ 的幂展开，$t_1t_2t_3$ 的系数是

$$\Tr(A_1A_2A_3+A_1A_3A_2+A_2A_1A_3+A_2A_3A_1+A_3A_1A_2+A_3A_2A_1)=3\Tr(A_1A_2A_3+A_2A_1A_3)$$

这里用了迹的循环性（六个排列分成两个循环类，每类三个）。于是极化为

$$\tilde P(A_1,A_2,A_3)=\tfrac12\Tr(A_1A_2A_3+A_2A_1A_3)=\mathrm{str}(A_1,A_2,A_3).$$`}</Tx>
        <Box kind="note" title="为什么极化与对角化互逆">{R`若 $\tilde P$ 对称 $r$ 线性，$P(\sum_it_iA_i)=\sum_{i_1,\ldots,i_r}t_{i_1}\cdots t_{i_r}\tilde P(A_{i_1},\ldots,A_{i_r})$。含 $t_1t_2\cdots t_r$ 的项来自 $(i_1,\ldots,i_r)$ 是 $(1,\ldots,r)$ 的一个排列，共 $r!$ 项，由对称性都等于 $\tilde P(A_1,\ldots,A_r)$。所以系数除以 $r!$ 恰好还原 $\tilde P$。这说明 $I^r(G)$ 中"对称多线性型"与"$r$ 次不变多项式"是一回事，下文两种说法通用。`}</Box>
        <Tx>{R`**回到丛。**上一章在主丛上引入了局部规范势 $\mathcal{A}=\mathcal{A}_\mu\dd x^\mu$ 与场强 $\mathcal{F}=\frac12\mathcal{F}_{\mu\nu}\dd x^\mu\wedge\dd x^\nu$，并说明这些几何对象同样描述相伴向量丛。由于联络 $\{\mathcal{A}_i\}$ 的集合刻画了纤维丛的扭曲，主丛的非平凡性同样由它的相伴丛分享。事实上，若把 \eqref{10.57} 作为向量丛中局部联络的定义，那么无需提到原先与之相伴的主丛也能定义它。以后会遇到必须使用向量丛的情形（Whitney 和、分裂原理等）。

设 $P(M,G)$ 是主丛。［原书印作 $P(M,\C)$，应为 $P(M,G)$。］我们把不变多项式的定义域从 $\mathfrak{g}$ 推广到 $M$ 上 $\mathfrak{g}$ 值的 $p$ 形式。对 $A_i\eta_i$（$A_i\in\mathfrak{g}$，$\eta_i\in\Omega^{p_i}(M)$，$1\le i\le r$），定义`}</Tx>
        <Eq n="11.8" say={R`对"矩阵乘形式"的变元：形式部分按顺序做外积，矩阵部分交给原来的 $\tilde P$。`}>{R`\tilde P(A_1\eta_1,\ldots,A_r\eta_r)\equiv\eta_1\wedge\ldots\wedge\eta_r\,\tilde P(A_1,\ldots,A_r).`}</Eq>
        <Tx>{R`例如，对应于 \eqref{11.4} 有

$$\mathrm{str}(A_1\eta_1,\ldots,A_r\eta_r)=\eta_1\wedge\ldots\wedge\eta_r\,\mathrm{str}(A_1,\ldots,A_r).$$

对角组合是`}</Tx>
        <Eq n="11.9" say={R`把同一个 $\mathfrak{g}$ 值形式填满所有变元：形式部分是 $\eta$ 的 $r$ 次外幂。`}>{R`P(A\eta)\equiv\underbrace{\eta\wedge\ldots\wedge\eta}_rP(A).`}</Eq>
        <Tx>{R`$\tilde P$ 或 $P$ 在一般元素上的作用由 $r$ 线性给出。特别地，下面我们关心形如 $P(\mathcal{F})$ 的不变多项式。由于 $\mathcal{F}=\mathcal{F}^\alpha T_\alpha$ 中的 $\mathcal{F}^\alpha$ 都是二形式（偶数次，彼此交换），$P(\mathcal{F})$ 的计算就像普通交换变量的多项式一样，这是本章大量代数操作的基础。不变多项式的重要性在于下面这个基本定理。`}</Tx>

        <Stmt id="T11.1" />
        <Tx>{R`**证明的思路。**(a) 要证 $\dd P(\mathcal{F})=0$。如果 $\mathcal{F}$ 是普通的闭形式，这很显然；但 $\mathcal{F}$ 本身并不闭——Bianchi 恒等式说的是 $\mathcal{D}\mathcal{F}=\dd\mathcal{F}+[\mathcal{A},\mathcal{F}]=0$。关键是：由于 $P$ 不变，"$\dd$ 作用在 $P$ 上"与"$\mathcal{D}$ 作用在 $P$ 上"没有区别（多出来的对易子项在不变性下抵消）。(b) 要比较两个联络，就在它们之间直线插值，证明 $P(\mathcal{F}_t)$ 对 $t$ 的导数是一个外微分。

**(a) 的证明。**只需对 $r$ 次齐次的不变多项式 $P_r(\mathcal{F})$ 证明 $\dd P_r(\mathcal{F})=0$，因为任何不变多项式都可以分解为齐次部分之和。先考虑恒等式

$$\tilde P_r(g_t^{-1}X_1g_t,\ldots,g_t^{-1}X_rg_t)=\tilde P_r(X_1,\ldots,X_r),$$

其中 $g_t\equiv\exp(tX)$，$X,X_i\in\mathfrak{g}$。对 $t$ 求导后令 $t=0$（$\frac{\dd}{\dd t}g_t^{-1}X_ig_t|_{t=0}=X_iX-XX_i=[X_i,X]$），得到`}</Tx>
        <Eq n="11.10" say={R`不变性的无穷小形式：把对易子 $[\cdot,X]$ 依次作用到每个变元上再求和，结果为零——就像"总角动量"作用在不变量上为零。`}>{R`\sum_{i=1}^r\tilde P_r(X_1,\ldots,[X_i,X],\ldots,X_r)=0.`}</Eq>
        <Tx>{R`接着，设 $A$ 是 $\mathfrak{g}$ 值 $p$ 形式，$\Omega_i$ 是 $\mathfrak{g}$ 值 $p_i$ 形式（$1\le i\le r$）。不失一般性，可取 $A=X\eta$、$\Omega_i=X_i\eta_i$，其中 $X,X_i\in\mathfrak{g}$，$\eta$（$\eta_i$）是 $p$ 形式（$p_i$ 形式）。定义`}</Tx>
        <Eq n="11.11" say={R`形式值矩阵的"分次对易子"：交换两个形式时要带上符号 $(-1)^{pp_i}$。`}>{R`[\Omega_i,A]\equiv\eta_i\wedge\eta[X_i,X]=X_iX(\eta_i\wedge\eta)-(-1)^{pp_i}XX_i(\eta\wedge\eta_i).`}</Eq>
        <Tx>{R`注意到

$$\begin{aligned}\tilde P_r(\Omega_1,\ldots,[\Omega_i,A],\ldots,\Omega_r)&=\eta_1\wedge\ldots\wedge\eta_i\wedge\eta\wedge\ldots\wedge\eta_r\,\tilde P_r(X_1,\ldots,X_iX,\ldots,X_r)\\&\quad-(-1)^{p\cdot p_i}\eta_1\wedge\ldots\wedge\eta\wedge\eta_i\wedge\ldots\wedge\eta_r\,\tilde P_r(X_1,\ldots,XX_i,\ldots,X_r)\\&=\eta\wedge\eta_1\wedge\ldots\wedge\eta_r(-1)^{p(p_1+\cdots+p_i)}\tilde P_r(X_1,\ldots,[X_i,X],\ldots,X_r).\end{aligned}$$

（把 $\eta$ 移到最前面：第一项中 $\eta$ 越过 $\eta_1,\ldots,\eta_i$，得 $(-1)^{p(p_1+\cdots+p_i)}$；第二项中 $\eta$ 越过 $\eta_1,\ldots,\eta_{i-1}$，得 $(-1)^{p(p_1+\cdots+p_{i-1})}$，再乘上原有的 $(-1)^{pp_i}$，两项的符号因子相同，于是合成对易子。）由此及 \eqref{11.10}（公共形式因子 $\eta\wedge\eta_1\wedge\ldots\wedge\eta_r$ 提出后，剩下的就是 \eqref{11.10} 的左边），得到`}</Tx>
        <Eq n="11.12" title="形式值的无穷小不变性" say={R`把 \eqref{11.10} 推广到形式值的变元：每一项带一个分次符号。下面要反复"加上一个这样的零"来把 $\dd$ 换成协变的 $\mathcal{D}$。`}>{R`\sum_{i=1}^r(-1)^{p(p_1+\cdots+p_i)}\tilde P_r(\Omega_1,\ldots,[\Omega_i,A],\ldots,\Omega_r)=0.`}</Eq>
        <Tx>{R`其次考虑外微分`}</Tx>
        <Eq n="11.13" say={R`外微分对 $\tilde P$ 满足分次 Leibniz 律：依次作用到每个变元上，越过前面的形式时带符号。`}>{R`\begin{aligned}\dd\tilde P_r(\Omega_1,\ldots,\Omega_r)&=\dd(\eta_1\wedge\ldots\wedge\eta_r)\tilde P_r(X_1,\ldots,X_r)\\&=\sum_{i=1}^r(-1)^{(p_1+\cdots+p_{i-1})}(\eta_1\wedge\ldots\wedge\dd\eta_i\wedge\ldots\wedge\eta_r)\tilde P_r(X_1,\ldots,X_i,\ldots,X_r)\\&=\sum_{i=1}^r(-1)^{(p_1+\cdots+p_{i-1})}\tilde P_r(\Omega_1,\ldots,\dd\Omega_i,\ldots,\Omega_r).\end{aligned}`}</Eq>
        <Tx>{R`在 \eqref{11.12} 与 \eqref{11.13} 中令 $A=\mathcal{A}$、$\Omega_i=\mathcal{F}$，此时 $p=1$、$p_i=2$，所有符号因子都是 $+1$。\eqref{11.12} 给出 $\sum_i\tilde P_r(\ldots,[\mathcal{F},\mathcal{A}],\ldots)=0$，而由 \eqref{11.11}，$[\mathcal{F},\mathcal{A}]=\mathcal{F}\wedge\mathcal{A}-\mathcal{A}\wedge\mathcal{F}=-[\mathcal{A},\mathcal{F}]$。把这个形如 \eqref{11.12} 的零加到 \eqref{11.13} 上，得到`}</Tx>
        <Eq n="11.14" keyEq title={R`$\dd P(\mathcal{F})=0$`} say={R`$\dd$ 作用在不变多项式上可以换成协变导数 $\mathcal{D}$，而 Bianchi 恒等式说 $\mathcal{D}\mathcal{F}=0$：所以 $P(\mathcal{F})$ 是闭形式。`}>{R`\begin{aligned}\dd\tilde P_r(\mathcal{F},\ldots,\mathcal{F})&=\sum_{i=1}^r[\tilde P_r(\mathcal{F},\ldots,\dd\mathcal{F},\ldots,\mathcal{F})+\tilde P_r(\mathcal{F},\ldots,[\mathcal{A},\mathcal{F}],\ldots,\mathcal{F})]\\&=\sum_{i=1}^r\tilde P_r(\mathcal{F},\ldots,\mathcal{D}\mathcal{F},\ldots,\mathcal{F})=0\end{aligned}`}</Eq>
        <Tx>{R`因为 $\mathcal{D}\mathcal{F}=\dd\mathcal{F}+[\mathcal{A},\mathcal{F}]=0$（Bianchi 恒等式 \eqref{10.46}）。这就证明了 $\dd P_r(\mathcal{F})=\dd\tilde P_r(\mathcal{F},\ldots,\mathcal{F})=0$。

**(b) 的证明。**设 $\mathcal{A}$ 与 $\mathcal{A}'$ 是 $E$ 上的两个联络，$\mathcal{F}$ 与 $\mathcal{F}'$ 是相应的场强。定义插值规范势 $\mathcal{A}_t$：`}</Tx>
        <Eq n="11.15" say={R`在两个联络之间走直线：$t=0$ 是 $\mathcal{A}$，$t=1$ 是 $\mathcal{A}'$。联络的集合是仿射空间，直线上的每一点都是联络。`}>{R`\mathcal{A}_t\equiv\mathcal{A}+t\theta\qquad\theta\equiv(\mathcal{A}'-\mathcal{A})\qquad0\le t\le1`}</Eq>
        <Tx>{R`使 $\mathcal{A}_0=\mathcal{A}$、$\mathcal{A}_1=\mathcal{A}'$。（$\mathcal{A}_t$ 确实是联络：在 $U_i\cap U_j$ 上，$\mathcal{A}$ 与 $\mathcal{A}'$ 的非齐次项 $t_{ij}^{-1}\dd t_{ij}$ 相同，在差 $\theta$ 中相消，所以 $\theta$ 按 $\theta_j=t_{ij}^{-1}\theta_it_{ij}$ 变换，$\mathcal{A}_t$ 满足 \eqref{10.9}。）相应的场强为`}</Tx>
        <Eq n="11.16" say={R`插值联络的曲率：原曲率加上 $\theta$ 的协变导数（一阶）与 $\theta$ 的平方（二阶）。`}>{R`\mathcal{F}_t\equiv\dd\mathcal{A}_t+\mathcal{A}_t\wedge\mathcal{A}_t=\mathcal{F}+t\mathcal{D}\theta+t^2\theta^2`}</Eq>
        <Tx>{R`其中 $\mathcal{D}\theta=\dd\theta+[\mathcal{A},\theta]=\dd\theta+\mathcal{A}\wedge\theta+\theta\wedge\mathcal{A}$（$\theta$ 是一形式，分次对易子取"+"号）。首先注意`}</Tx>
        <Eq n="11.17" say={R`两端之差 = 对 $t$ 的导数的积分；由多线性与对称性，导数只落在 $r$ 个变元之一上，乘以 $r$。`}>{R`P_r(\mathcal{F}')-P_r(\mathcal{F})=P_r(\mathcal{F}_1)-P_r(\mathcal{F}_0)=\int_0^1\dd t\,\frac{\dd}{\dd t}P_r(\mathcal{F}_t)=r\int_0^1\dd t\,\tilde P_r\Big(\frac{\dd}{\dd t}\mathcal{F}_t,\mathcal{F}_t,\ldots,\mathcal{F}_t\Big).`}</Eq>
        <Tx>{R`由 \eqref{11.16}，`}</Tx>
        <Eq n="11.18" say={R`代入 $\frac{\dd}{\dd t}\mathcal{F}_t=\mathcal{D}\theta+2t\theta^2$：导数分成"协变导数项"和"平方项"两部分。`}>{R`\frac{\dd}{\dd t}P_r(\mathcal{F}_t)=r\tilde P_r(\mathcal{D}\theta+2t\theta^2,\mathcal{F}_t,\ldots,\mathcal{F}_t)=r\tilde P_r(\mathcal{D}\theta,\mathcal{F}_t,\ldots,\mathcal{F}_t)+2rt\tilde P_r(\theta^2,\mathcal{F}_t,\ldots,\mathcal{F}_t).`}</Eq>
        <Tx>{R`还要注意

$$\mathcal{D}\mathcal{F}_t=\dd\mathcal{F}_t+[\mathcal{A},\mathcal{F}_t]=-[\mathcal{A}_t,\mathcal{F}_t]+[\mathcal{A},\mathcal{F}_t]=t[\mathcal{F}_t,\theta]$$

这里用了 Bianchi 恒等式 $\mathcal{D}_t\mathcal{F}_t=\dd\mathcal{F}_t+[\mathcal{A}_t,\mathcal{F}_t]=0$。［$\mathcal{D}$ 是关于 $\mathcal{A}$ 的协变导数，$\mathcal{D}_t$ 是关于 $\mathcal{A}_t$ 的协变导数；最后一步 $-[t\theta,\mathcal{F}_t]=t[\mathcal{F}_t,\theta]$ 用了一形式与二形式的分次对易子 $[\theta,\mathcal{F}_t]=\theta\wedge\mathcal{F}_t-\mathcal{F}_t\wedge\theta=-[\mathcal{F}_t,\theta]$。］于是`}</Tx>
        <Eq n="11.19" say={R`对"$\theta$ 放在第一个变元"的那个 $2r-1$ 形式求外微分：$\dd$ 先换成 $\mathcal{D}$，再用 $\mathcal{D}\mathcal{F}_t=t[\mathcal{F}_t,\theta]$。`}>{R`\begin{aligned}\dd[\tilde P_r(\theta,\mathcal{F}_t,\ldots,\mathcal{F}_t)]&=\tilde P_r(\dd\theta,\mathcal{F}_t,\ldots,\mathcal{F}_t)-(r-1)\tilde P_r(\theta,\dd\mathcal{F}_t,\ldots,\mathcal{F}_t)\\&=\tilde P_r(\mathcal{D}\theta,\mathcal{F}_t,\ldots,\mathcal{F}_t)-(r-1)\tilde P_r(\theta,\mathcal{D}\mathcal{F}_t,\ldots,\mathcal{F}_t)\\&=\tilde P_r(\mathcal{D}\theta,\mathcal{F}_t,\ldots,\mathcal{F}_t)-(r-1)t\tilde P_r(\theta,[\mathcal{F}_t,\theta],\mathcal{F}_t,\ldots,\mathcal{F}_t)\end{aligned}`}</Eq>
        <Tx>{R`其中第二步加上了一个形如 \eqref{11.12} 的零（取 $A=\mathcal{A}$，$\Omega_1=\theta$，其余为 $\mathcal{F}_t$），把 $\dd$ 换成 $\mathcal{D}$。再在 \eqref{11.12} 中取 $\Omega_1=A=\theta$、$\Omega_2=\cdots=\Omega_r=\mathcal{F}_t$（原书误印为 $\Omega_m$），此时 $p=p_1=1$、$p_i=2$（$i\ge2$）：$i=1$ 项符号为 $(-1)^1$，$[\theta,\theta]=\theta\wedge\theta-(-1)^1\theta\wedge\theta=2\theta^2$；$i\ge2$ 项符号为 $(-1)^{1+2(i-1)}=-1$，且由对称性 $r-1$ 项相同。于是

$$2\tilde P_r(\theta^2,\mathcal{F}_t,\ldots,\mathcal{F}_t)+(r-1)\tilde P_r(\theta,[\mathcal{F}_t,\theta],\mathcal{F}_t,\ldots,\mathcal{F}_t)=0.$$

由 \eqref{11.18}、\eqref{11.19} 与上面的恒等式得到

$$\frac{\dd}{\dd t}P_r(\mathcal{F}_t)=r\,\dd[\tilde P_r(\theta,\mathcal{F}_t,\ldots,\mathcal{F}_t)].$$

最后得到`}</Tx>
        <Eq n="11.20" keyEq title="Chern–Weil：差是恰当形式" say={R`两个联络给出的 $P(\mathcal{F})$ 之差，是一个整体定义的形式的外微分：曲率的局部细节只贡献一个"全导数"。`}>{R`P_r(\mathcal{F}')-P_r(\mathcal{F})=\dd\Big[r\int_0^1\tilde P_r(\mathcal{A}'-\mathcal{A},\mathcal{F}_t,\ldots,\mathcal{F}_t)\,\dd t\Big].`}</Eq>
        <Tx>{R`这表明 $P_r(\mathcal{F}')$ 与 $P_r(\mathcal{F})$ 只差一个恰当形式。∎`}</Tx>
        <Proof title="证明结构一览（与上文逐式对应）" collapsed steps={[
          { claim: R`不变性 \eqref{11.3} 对单参数子群求导得无穷小不变性 \eqref{11.10}。`, uses: ["11.3", "11.10"] },
          { claim: R`把 \eqref{11.10} 推广到形式值变元，注意把 $\eta$ 移到最前面的符号，得 \eqref{11.12}。`, uses: ["11.11", "11.12"], fill: true },
          { claim: R`$\dd$ 对 $\tilde P$ 满足分次 Leibniz 律 \eqref{11.13}；加上 \eqref{11.12} 型的零，把 $\dd$ 换成 $\mathcal{D}$；Bianchi 恒等式给出 $\dd P(\mathcal{F})=0$。`, uses: ["11.13", "11.14", "10.46"] },
          { claim: R`直线插值 \eqref{11.15}；$\theta=\mathcal{A}'-\mathcal{A}$ 伴随变换，故后面的形式整体有定义。`, uses: ["11.15", "10.9"], fill: true },
          { claim: R`$\frac{\dd}{\dd t}P_r(\mathcal{F}_t)=r\tilde P_r(\mathcal{D}\theta+2t\theta^2,\ldots)$，再由 \eqref{11.19} 与 $[\theta,\theta]=2\theta^2$ 识别为 $r\,\dd\tilde P_r(\theta,\mathcal{F}_t,\ldots)$。`, uses: ["11.18", "11.19"], fill: true },
          { claim: R`对 $t$ 积分得 \eqref{11.20}。`, uses: ["11.20"] },
        ]} />

        <Tx>{R`**超渡形式。**定义 $P_r$ 的**超渡**（transgression）$TP_r(\mathcal{A}',\mathcal{A})$ 为`}</Tx>
        <Eq n="11.21" title="超渡形式" say={R`超渡形式：沿联络空间中的直线，把"联络之差"与插值曲率填入极化后积分——它的外微分就是两个示性形式之差。`}>{R`TP_r(\mathcal{A}',\mathcal{A})\equiv r\int_0^1\dd t\,\tilde P_r(\mathcal{A}'-\mathcal{A},\mathcal{F}_t,\ldots,\mathcal{F}_t)`}</Eq>
        <Tx>{R`其中 $\tilde P_r$ 是 $P_r$ 的极化。在 §11.5 讨论陈–Simons 形式时，超渡将扮演重要角色。设 $\dim M=m$，记 $P_m$ 为 $P$ 中恰为 $m$ 形式的那一部分（即 $m/2$ 次齐次部分）。由于 $P_m(\mathcal{F}')$ 与 $P_m(\mathcal{F})$ 只差一个恰当形式，它们在无边界流形 $M$ 上的积分应该相同：`}</Tx>
        <Eq n="11.22" title="积分与联络无关" say={R`在没有边界的流形上，示性形式的积分与联络无关：差是全导数，由 Stokes 定理积分为零。`}>{R`\int_MP_m(\mathcal{F}')-\int_MP_m(\mathcal{F})=\int_M\dd TP_m(\mathcal{A}',\mathcal{A})=\int_{\partial M}TP_m(\mathcal{A}',\mathcal{A})=0.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{11.22} 中的边界项（p.445）`}>{R`原书第三个等号右边印作 $\int_{\partial M}P_m(\mathcal{A}',\mathcal{A})$，漏了超渡的记号 $T$；由 Stokes 定理（\sref{T6.1}）应为 $\int_{\partial M}TP_m(\mathcal{A}',\mathcal{A})$，它在 $\partial M=\emptyset$ 时为零。本站已改正。`}</Box>
        <Tx>{R`**示性类。**如上所证，不变多项式是闭的，一般而言非平凡。因此它定义 $M$ 的一个上同调类。\sref{T11.1}(b) 保证这个上同调类与所选的规范势无关。这样定义的上同调类称为**示性类**（characteristic class）。由不变多项式 $P$ 定义的示性类记为 $\chi_E(P)$，其中 $E$ 是定义了联络与曲率的纤维丛。［注：由于主丛与其相伴丛共用同一组规范势与场强，Chern–Weil 定理同样适用于二者。因此 $E$ 可以是主丛，也可以是向量丛。］`}</Tx>
        <Stmt id="F:charclass" toc={false} />
        <Box kind="physics" title="为什么必须是「不变」多项式">{R`若 $P$ 不是不变的（例如取 $\mathcal{F}$ 的某个矩阵元 $\mathcal{F}_{12}$），换卡时 $\mathcal{F}_j=t_{ij}^{-1}\mathcal{F}_it_{ij}$ 会改变它，$P(\mathcal{F})$ 甚至不是 $M$ 上的整体形式。不变性保证 $P(\mathcal{F}_i)=P(\mathcal{F}_j)$ 在重叠区一致——这是"规范不变量"的数学含义。物理上，可观测量必须由 $\Tr\mathcal{F}^2$、$\Tr\mathcal{F}\wedge\mathcal{F}$ 这样的组合构成，正是同一个道理。`}</Box>

        <Stmt id="T11.2">
          <Proof steps={[
            { claim: R`(a) 取 $P_r\in I^r(G)$、$P_s\in I^s(G)$，写 $\mathcal{F}=\mathcal{F}^\alpha T_\alpha$。由 \eqref{11.2}、\eqref{11.8}：`, tex: R`(P_rP_s)(\mathcal{F})=\mathcal{F}^{\alpha_1}\wedge\ldots\wedge\mathcal{F}^{\alpha_r}\wedge\mathcal{F}^{\beta_1}\wedge\ldots\wedge\mathcal{F}^{\beta_s}\times\frac1{(r+s)!}\sum_P\tilde P_r(T_{\gamma_{P(1)}},\ldots)\tilde P_s(\ldots,T_{\gamma_{P(r+s)}})=P_r(\mathcal{F})\wedge P_s(\mathcal{F})`, why: R`$(\gamma_1,\ldots,\gamma_{r+s})=(\alpha_1,\ldots,\beta_s)$。二形式 $\mathcal{F}^\alpha$ 彼此交换，所以 $\sum_P$ 中每一项重新标记求和指标后都等于 $\tilde P_r(T_{\alpha_1},\ldots,T_{\alpha_r})\tilde P_s(T_{\beta_1},\ldots,T_{\beta_s})$，$(r+s)!$ 项与前面的 $1/(r+s)!$ 抵消。原书把第二个因子误印为 $\tilde P_n$。`, uses: ["11.2", "11.8"], fill: true },
            { claim: R`因为 $P_r(\mathcal{F})$、$P_s(\mathcal{F})$ 定义 $H^*(M)$ 中的类，而上同调环的乘法由 $\wedge$ 诱导，所以 $\chi_E(P_rP_s)=\chi_E(P_r)\wedge\chi_E(P_s)$：$\chi_E$ 是代数同态。`, uses: ["T11.1"] },
            { claim: R`(b) $f^*E$ 的转移函数是 $f^*t_{ij}=t_{ij}\circ f$（\eqref{9.18}）。拉回的局部联络满足相容条件：`, tex: R`f^*\mathcal{A}_j=f^*(t_{ij}^{-1}\mathcal{A}_it_{ij}+t_{ij}^{-1}\dd t_{ij})=(f^*t_{ij}^{-1})(f^*\mathcal{A}_i)(f^*t_{ij})+(f^*t_{ij}^{-1})(\dd f^*t_{ij})`, why: R`$f^*$ 与乘积、与 $\dd$ 交换。所以 $f^*\mathcal{A}$ 确实是 $f^*E$ 上的局部联络（\eqref{10.9}）。`, uses: ["9.18", "10.9"] },
            { claim: R`它的场强是曲率的拉回：`, tex: R`\dd(f^*\mathcal{A}_i)+f^*\mathcal{A}_i\wedge f^*\mathcal{A}_i=f^*[\dd\mathcal{A}_i+\mathcal{A}_i\wedge\mathcal{A}_i]=f^*\mathcal{F}_i.`, uses: ["10.38a"] },
            { claim: R`于是 $f^*P(\mathcal{F}_i)=P(f^*\mathcal{F}_i)$（$f^*$ 与 $\wedge$ 交换，$P$ 的矩阵系数是常数），即 $f^*\chi_E(P)=\chi_{f^*E}(P)$。由 \sref{T11.1}(b)，用哪个联络计算 $f^*E$ 的示性类都一样。`, uses: ["T11.1"] },
          ]} />
        </Stmt>
        <Eq n="11.23" title="Weil 同态" say={R`每个不变多项式都给出一个上同调类，而且多项式的乘法对应上同调类的外积：示性类构成一个环。`}>{R`\chi_E:I^*(G)\to H^*(M)`}</Eq>
        <Eq n="11.24" title="自然性" say={R`先拉回丛再取示性类，等于先取示性类再拉回上同调类：示性类与映射相容。`}>{R`\chi_{f^*E}=f^*\chi_E.`}</Eq>

        <Stmt id="C11.1">
          <Proof steps={[
            { claim: R`设 $E\xrightarrow{\pi}M$ 平凡，$E\cong M\times F$。取常值映射 $f:M\to\{p\}$，则 $E=f^*E_0$，其中 $E_0\to\{p\}$ 是点上的丛（就是 $F$ 本身）。`, fill: true },
            { claim: R`一点的 de Rham 上同调群除 $H^0$ 外全为零，所以 $E_0$ 的示性类（除常数项外）平凡。`, uses: ["D6.2"] },
            { claim: R`由\sref{T11.2}(b)，$\chi_E=f^*\chi_{E_0}$ 也平凡。`, uses: ["T11.2"] },
          ]} />
        </Stmt>
        <Box kind="note" title="直接的理解">{R`平凡丛上有平坦联络 $\mathcal{A}=0$（在整体平凡化下），$\mathcal{F}=0$，于是 $P(\mathcal{F})$ 除常数项外为零；由\sref{T11.1}(b)，任何其他联络给出的 $P(\mathcal{F})$ 都与零只差恰当形式。这是推论 11.1 最直接的证明。反过来，交互图 1 中 $2g\neq0$ 的单极子丛 $\int c_1\neq0$，所以它必然不平凡。`}</Box>
      </Sub>
    </Sec>);
}
