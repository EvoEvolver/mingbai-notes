// §6.4 de Rham 上同调群的结构 —— 式 (6.35)–(6.64)，引理 6.1，定理 6.4–6.5，例 6.5–6.7，习题 6.5，交互图 4
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, Erratum, Table, C } from "@kit";
import { KunnethLab } from "./_ch06_demos.jsx";

const R = String.raw;

export function Sec64() {
  return (
    <Sec n="6.4" title="Structure of de Rham cohomology groups" zh="de Rham 上同调群的结构"
      gist={R`**Poincaré 对偶** $H^r\cong H^{m-r}$（紧致可定向），奇数维 $\chi=0$；**上同调环** $[\omega]\wedge[\eta]=[\omega\wedge\eta]$；**Künneth 公式** $H^*(M_1\times M_2)=H^*(M_1)\otimes H^*(M_2)$，$b^r(T^n)=\binom nr$；**拉回** $f^*[\omega]=[f^*\omega]$ 保持环结构，且只依赖 $f$ 的同伦类；单连通 ⇒ $H^1=0$；$H^*(S^n)$ 只在 $0$、$n$ 维非零。`}
      why={R`这些结构用同调群很难甚至无法看出（链之间没有自然的乘法），却是后面示性类、指标定理、反常的计算语言。`}
      gives={["6.35", "6.36", "6.37", "6.38", "6.39", "6.40", "6.44", "6.45", "6.47", "6.51", "6.53", "6.54", "6.55", "6.59", "6.61", "6.63", "6.64"]}>
      <Tx>{R`de Rham 上同调群展现出一些非常有趣的结构，它们用同调群很难甚至不可能看出来。`}</Tx>
      <Sub641 />
      <Sub642 />
      <Sub643 />
      <Sub644 />
      <Sub645 />
    </Sec>);
}

function Sub641() {
  return (
    <Sub n="6.4.1" title="Poincaré duality" zh="Poincaré 对偶">
      <p className="muted">本小节概念：<C id="poincare_duality" /></p>
      <Tx>{R`**想法**：$r$ 形式与 $(m-r)$ 形式的外积是 $m$ 形式——一个"体积元"，可以在整个 $M$ 上积分。这给出 $H^r$ 与 $H^{m-r}$ 之间的一个配对。

设 $M$ 是紧致（无边、可定向）$m$ 维流形，$\omega\in H^r(M)$、$\eta\in H^{m-r}(M)$（用代表闭形式）。定义内积 $\langle\ ,\ \rangle:H^r(M)\times H^{m-r}(M)\to\mathbb{R}$：`}</Tx>
      <Eq n="6.35" say={R`把一个 $r$ 阶闭形式与一个 $(m-r)$ 阶闭形式楔起来，在整个流形上积分，得到一个数。`}>{R`\langle\omega,\eta\rangle\equiv\int_M\omega\wedge\eta.`}</Eq>
      <Derivation title={R`\eqref{6.35} 在上同调上良定义（原书略）`} collapsed steps={[
        { tex: R`\langle\omega+\dd\psi,\eta\rangle-\langle\omega,\eta\rangle=\int_M\dd\psi\wedge\eta=\int_M\dd(\psi\wedge\eta)`, why: R`$\dd(\psi\wedge\eta)=\dd\psi\wedge\eta\pm\psi\wedge\dd\eta$，而 $\dd\eta=0$。` },
        { tex: R`\int_M\dd(\psi\wedge\eta)=\int_{\partial M}\psi\wedge\eta=0`, why: R`Stokes 定理（\sref{T6.1}），且 $M$ 紧致无边，$\partial M=\emptyset$。对 $\eta\to\eta+\dd\chi$ 同理。` },
      ]} result={R`配对只依赖上同调类。这里用到了：$M$ 可定向（才能积分 $m$ 形式）、紧致（积分有限）、无边（Stokes 项为零）。`} />
      <Tx>{R`这个内积是双线性的。而且它是**非奇异**的：若 $[\omega]\neq0$，则存在 $[\eta]$ 使 $\langle\omega,\eta\rangle\neq0$（对 $\eta$ 同理）。因此 \eqref{6.35} 定义了 $H^r(M)$ 与 $H^{m-r}(M)$ 的对偶：`}</Tx>
      <Eq n="6.36" keyEq title="Poincaré 对偶" say={R`紧致可定向流形上，$r$ 阶与 $m-r$ 阶上同调互为对偶：“洞”的数目关于中间维数对称。`}>{R`H^r(M)\cong H^{m-r}(M)`}</Eq>
      <Tx>{R`称为 **Poincaré 对偶**（Poincaré duality）。相应地，Betti 数有对称性`}</Tx>
      <Eq n="6.37" say={R`Betti 数关于中间维数对称：例如闭曲面 $b_0=b_2=1$。`}>{R`b_r=b_{m-r}.`}</Eq>
      <Box kind="warning" title={R`注意：Poincaré 对偶需要可定向`}>{R`原书只写"紧致"。但 \eqref{6.35} 的积分 $\int_M$ 本身要求 $M$ **可定向**（第 5 章定义 5.6），而且对不可定向流形结论确实不成立：$\mathbb{R}P^2$ 紧致、连通，$b_0=1$，但 $b_2=\dim H^2(\mathbb{R}P^2)=0$（第 3 章例 3.11：$H_2(\mathbb{R}P^2)=0$）。Klein 瓶同理（$b=(1,1,0)$）。非退化性的证明也不平凡（用 Hodge 理论或 Mayer–Vietoris，见 Bott–Tu §I.5）。交互图 4 中选 $\mathbb{R}P^2$ 或 Klein 瓶即可看到对偶失效。以下凡用到 Poincaré 对偶，都默认 $M$ 紧致、无边、可定向。`}</Box>
      <Tx>{R`由 \eqref{6.37} 立即推出：奇数维空间的 Euler 示性数为零：`}</Tx>
      <Eq n="6.38" say={R`把交错和写两遍再用对偶配对：$m$ 为奇数时第 $r$ 项与第 $m-r$ 项符号相反，两两抵消。`}>{R`\begin{aligned}\chi(M)&=\sum(-1)^rb_r=\tfrac12\Big\{\sum(-1)^rb_r+\sum(-1)^{m-r}b_{m-r}\Big\}\\&=\tfrac12\Big\{\sum(-1)^rb_r-\sum(-1)^{-r}b_r\Big\}=0.\end{aligned}`}</Eq>
      <Tx>{R`逐步看：第一个等号只是把同一个和换元 $r\to m-r$ 写了第二遍；第二个等号在第二个和里用 $b_{m-r}=b_r$，并用 $m$ 为奇数时 $(-1)^{m-r}=-(-1)^{-r}$；最后 $(-1)^{-r}=(-1)^r$，两和相消。例：$S^1$、$S^3$、$T^3$ 的 $\chi$ 都是 0。`}</Tx>
    </Sub>);
}

function Sub642() {
  return (
    <Sub n="6.4.2" title="Cohomology rings" zh="上同调环">
      <p className="muted">本小节概念：<C id="cohomology_ring" /></p>
      <Tx>{R`设 $[\omega]\in H^q(M)$、$[\eta]\in H^r(M)$。定义 $[\omega]$ 与 $[\eta]$ 的乘积：`}</Tx>
      <Eq n="6.39" keyEq title="上积" say={R`上同调类的乘积：取代表元做外积再取类。闭 ∧ 闭仍闭，换代表元只多出恰当项。`}>{R`[\omega]\wedge[\eta]\equiv[\omega\wedge\eta].`}</Eq>
      <Tx>{R`由习题 6.2，$\omega\wedge\eta$ 是闭的，所以 $[\omega\wedge\eta]$ 是 $H^{q+r}(M)$ 的元素。而且 $[\omega\wedge\eta]$ 与 $[\omega]$、$[\eta]$ 代表元的选取无关。例如用 $\omega'=\omega+\dd\psi$ 代替 $\omega$：

$$[\omega']\wedge[\eta]\equiv[(\omega+\dd\psi)\wedge\eta]=[\omega\wedge\eta+\dd(\psi\wedge\eta)]=[\omega\wedge\eta]$$

（用了 $\dd(\psi\wedge\eta)=\dd\psi\wedge\eta$，因为 $\dd\eta=0$；换 $\eta$ 的代表元同理，多出 $\pm\dd(\omega\wedge\chi)$）。于是乘积 $\wedge:H^q(M)\times H^r(M)\to H^{q+r}(M)$ 是良定义的映射。

**上同调环**（cohomology ring）$H^*(M)$ 定义为直和`}</Tx>
      <Eq n="6.40" say={R`把所有阶的上同调群直和起来，配上外积，就得到一个分次交换环；$H^0$ 中的常函数 1 是单位元。`}>{R`H^*(M)\equiv\bigoplus_{r=0}^mH^r(M).`}</Eq>
      <Box kind="warning" title={R`勘误：\eqref{6.40}、\eqref{6.46} 的直和从 $r=0$ 开始（p.258–259）`}>{R`原书印作 $\bigoplus_{r=1}^m$（\eqref{6.46} 中两处 $\sum_{r=1}^m$ 亦然）。$H^0(M)$ 必须包括在内：常函数 $1\in H^0(M)$ 是环的单位元（$[1]\wedge[\eta]=[\eta]$），而且 Künneth 公式 \eqref{6.44} 的 $p=0$、$q=0$ 项正是 $H^0\otimes H^r$、$H^r\otimes H^0$；若去掉 $H^0$，\eqref{6.46} 的最后一个等号不成立（例如 $H^*(T^2)$ 会丢掉 $H^1(S^1)\otimes H^0(S^1)$ 这类项）。正文已改正。`}</Box>
      <Tx>{R`乘积由前面定义的外积提供：`}</Tx>
      <Eq n="6.41" say={R`外积把上同调环中任意两个元素乘成第三个元素。`}>{R`\wedge:H^*(M)\times H^*(M)\to H^*(M).`}</Eq>
      <Tx>{R`加法是 $H^*(M)$ 中两个元素的形式和。由外积的分次交换律（第 5 章 \eqref{5.67b}），$[\omega]\wedge[\eta]=(-1)^{qr}[\eta]\wedge[\omega]$——$H^*(M)$ 是**分次交换环**。

上同调相对于同调的一大优越性就在这里：链之间的乘积没有好的定义，同调群不能有环结构。环结构比 Betti 数包含更多的信息：例如在环面 $T^2$ 上 $[\dd\theta_1]\wedge[\dd\theta_2]\neq0$（它在 $T^2$ 上的积分是 $4\pi^2$），它把两个"一维的洞"乘出了"二维的洞"。`}</Tx>
    </Sub>);
}

function Sub643() {
  return (
    <Sub n="6.4.3" title="The Künneth formula" zh="Künneth 公式">
      <p className="muted">本小节概念：<C id="kunneth" /></p>
      <Tx>{R`设 $M$ 是两个流形的乘积 $M=M_1\times M_2$。设 $\{\omega^p_i\}$（$1\le i\le b^p(M_1)$）是 $H^p(M_1)$ 的一组基，$\{\eta^p_i\}$（$1\le i\le b^p(M_2)$）是 $H^p(M_2)$ 的一组基。（在 $M$ 上，$\omega^p_i$ 理解为它沿投影 $M\to M_1$ 的拉回，$\eta$ 同理。）显然 $\omega^p_i\wedge\eta^{r-p}_j$（$0\le p\le r$）是 $M$ 上的闭 $r$ 形式。原书论证它不是恰当的：若它恰当，就可以写成`}</Tx>
      <Eq n="6.42" say={R`假设两个因子上的上同调类的乘积是恰当的，并（作为一个试探）把它的原形式写成两个因子上形式的乘积。`}>{R`\omega^p_i\wedge\eta^{r-p}_j=\dd(\alpha^{p-1}\wedge\beta^{r-p}+\gamma^p\wedge\delta^{r-p-1})`}</Eq>
      <Tx>{R`其中 $\alpha^{p-1}\in\Omega^{p-1}(M_1)$、$\beta^{r-p}\in\Omega^{r-p}(M_2)$、$\gamma^p\in\Omega^p(M_1)$、$\delta^{r-p-1}\in\Omega^{r-p-1}(M_2)$。（若 $p=0$，令 $\alpha^{p-1}=0$。）对 \eqref{6.42} 求外微分（Leibniz 律 \eqref{5.69}）：`}</Tx>
      <Eq n="6.43" say={R`把乘积的外微分按 Leibniz 律展开：每个因子轮流被求导，越过 $p-1$ 阶或 $p$ 阶形式时带相应的符号。`}>{R`\begin{aligned}\omega^p_i\wedge\eta^{r-p}_j&=\dd\alpha^{p-1}\wedge\beta^{r-p}+(-1)^{p-1}\alpha^{p-1}\wedge\dd\beta^{r-p}\\&\quad+\dd\gamma^p\wedge\delta^{r-p-1}+(-1)^p\gamma^p\wedge\dd\delta^{r-p-1}.\end{aligned}`}</Eq>
      <Tx>{R`比较左右两边（左边是"$M_1$ 上的 $p$ 阶闭形式 ∧ $M_2$ 上的 $r-p$ 阶闭形式"，右边的 $\dd\alpha$、$\dd\delta$ 项是恰当的），原书得出 $\alpha^{p-1}=\delta^{r-p-1}=0$，从而 $\omega^p_i\wedge\eta^{r-p}_j=0$，与假设矛盾。所以 $\omega^p_i\wedge\eta^{r-p}_j$ 是 $H^r(M)$ 的非平凡元素。反过来，$H^r(M)$ 的任何元素都可以分解为 $H^p(M_1)$ 与 $H^{r-p}(M_2)$ 元素乘积之和（$0\le p\le r$）。于是得到 **Künneth 公式**：`}</Tx>
      <Eq n="6.44" keyEq title="Künneth 公式" say={R`乘积流形的 $r$ 阶上同调，由两个因子上阶数之和为 $r$ 的上同调类两两相乘生成。`}>{R`H^r(M)=\bigoplus_{p+q=r}\big[H^p(M_1)\otimes H^q(M_2)\big].`}</Eq>
      <Erratum kind="note" loc="p.258–259 §6.4.3" title="原书的论证只是示意；一个严格的替代论证">{R`(1) 原书写 "$1\le p\le r$"，随后又讨论 $p=0$ 的情形，应为 $0\le p\le r$。(2) \eqref{6.42} 假设了原形式具有"两个因子乘积之和"的特殊形状，一般的 $(r-1)$ 形式并不如此；"比较两边得 $\alpha=\delta=0$"也没有给出理由。所以这段只能当作启发。

**严格的线性无关性证明（$M_1$、$M_2$ 紧致）。**由推论 6.1，取闭链 $c_k\subset M_1$ 与 $c'_l\subset M_2$，使 $\int_{c_k}\omega^p_i=\delta_{ik}$、$\int_{c'_l}\eta^q_j=\delta_{jl}$（对偶基 \eqref{6.24}）。在乘积闭链 $c_k\times c'_l$（$\partial(c_k\times c'_l)=\partial c_k\times c'_l\pm c_k\times\partial c'_l=0$）上，由 Fubini 定理

$$\int_{c_k\times c'_l}\omega^p_i\wedge\eta^q_j=\int_{c_k}\omega^p_i\cdot\int_{c'_l}\eta^q_j=\delta_{ik}\delta_{jl}.$$

若 $\sum_{i,j}a_{ij}\,\omega^p_i\wedge\eta^q_j$ 恰当，它在每个闭链上的周期为零（习题 6.4），代入 $c_k\times c'_l$ 得 $a_{kl}=0$。所以这些乘积类线性无关——这比"每个乘积非零"更强。

**生成性**（"反过来……"）原书未证，也不容易：标准证明对 $M_1$ 的好覆盖用 Mayer–Vietoris 序列做归纳（Bott–Tu §I.5）。交互图 4 对若干具体的乘积用三角剖分独立核对了 Betti 数。`}</Erratum>
      <Tx>{R`用 Betti 数改写（张量积的维数是维数之积）：`}</Tx>
      <Eq n="6.45" keyEq title="Betti 数的 Künneth 公式" say={R`乘积空间的 Betti 数是两个因子 Betti 数的"卷积"：Poincaré 多项式 $\sum b^rt^r$ 相乘。`}>{R`b^r(M)=\sum_{p+q=r}b^p(M_1)b^q(M_2).`}</Eq>
      <Tx>{R`Künneth 公式也给出各自上同调环之间的关系：`}</Tx>
      <Eq n="6.46" say={R`乘积流形的上同调环是两个因子上同调环的（分次）张量积。`}>{R`\begin{aligned}H^*(M)&=\sum_{r=0}^mH^r(M)=\sum_{r=0}^m\bigoplus_{p+q=r}H^p(M_1)\otimes H^q(M_2)\\&=\sum_pH^p(M_1)\otimes\sum_qH^q(M_2)=H^*(M_1)\otimes H^*(M_2).\end{aligned}`}</Eq>
      <Exercise n="6.5" title="Euler 示性数的乘法性" level="★"
        hint={R`把 \eqref{6.45} 代入 $\chi(M)=\sum_r(-1)^rb^r(M)$，并用 $(-1)^{p+q}=(-1)^p(-1)^q$。`}
        solution={R`设 $m_1=\dim M_1$、$m_2=\dim M_2$。由 \eqref{6.26} 与 \eqref{6.45}：

$$\chi(M)=\sum_{r=0}^{m_1+m_2}(-1)^r\sum_{p+q=r}b^p(M_1)b^q(M_2)=\sum_{p=0}^{m_1}\sum_{q=0}^{m_2}(-1)^p b^p(M_1)\,(-1)^q b^q(M_2)=\chi(M_1)\cdot\chi(M_2).$$

换言之：Poincaré 多项式 $P_M(t)=\sum_rb^rt^r$ 满足 $P_{M_1\times M_2}=P_{M_1}P_{M_2}$，而 $\chi=P(-1)$。例：$\chi(S^2\times S^2)=2\cdot2=4$；任何含 $S^1$ 因子的乘积 $\chi=0$。（不用 Künneth 也能看出：取 $M_1$、$M_2$ 的三角剖分，乘积可剖分为"单形与单形之积"的胞腔，$p$ 维与 $q$ 维单形之积是 $(p+q)$ 维胞腔，胞腔数的交错和直接相乘。）`}>
        <Tx>{R`设 $M=M_1\times M_2$。证明`}</Tx>
        <Eq n="6.47" say={R`乘积空间的 Euler 示性数是两个因子 Euler 示性数之积。`}>{R`\chi(M)=\chi(M_1)\cdot\chi(M_2).`}</Eq>
      </Exercise>
      <Box kind="example" n="6.5" title={R`环面 $T^2=S^1\times S^1$ 与 $T^n$`}>
        <Tx>{R`由于 $H^0(S^1)=\mathbb{R}$、$H^1(S^1)=\mathbb{R}$，`}</Tx>
        <Eq n="6.48a" say={R`环面的零阶上同调：两个常数的乘积还是常数。`}>{R`H^0(T^2)=\mathbb{R}\otimes\mathbb{R}=\mathbb{R}`}</Eq>
        <Eq n="6.48b" say={R`环面的一阶上同调有两项：第一个圆的一形式乘第二个圆的常数，或反之；所以是二维的。`}>{R`H^1(T^2)=(\mathbb{R}\otimes\mathbb{R})\oplus(\mathbb{R}\otimes\mathbb{R})=\mathbb{R}\oplus\mathbb{R}`}</Eq>
        <Eq n="6.48c" say={R`环面的二阶上同调：两个圆的一形式之积 $\dd\theta_1\wedge\dd\theta_2$ 张成一维空间。`}>{R`H^2(T^2)=\mathbb{R}\otimes\mathbb{R}=\mathbb{R}.`}</Eq>
        <Tx>{R`注意 Poincaré 对偶 $H^0(T^2)=H^2(T^2)$。［注：$\mathbb{R}\otimes\mathbb{R}$ 是张量积，不要与直积混淆。两个实数之积显然还是实数：$\mathbb{R}\otimes\mathbb{R}\cong\mathbb{R}$，而 $\mathbb{R}\times\mathbb{R}=\mathbb{R}^2$。］把 $T^2$ 的坐标参数化为 $(\theta_1,\theta_2)$，$\theta_i$ 是 $S^1$ 的坐标。$H^r(T^2)$ 由下列形式生成：`}</Tx>
        <Eq n="6.49a" say={R`环面各阶上同调的代表元：常数、$\dd\theta_1$ 与 $\dd\theta_2$ 的线性组合、以及面积形式 $\dd\theta_1\wedge\dd\theta_2$ 的倍数。`}>{R`\begin{aligned}&r=0: && \omega_0=c_0 && c_0\in\mathbb{R}\\ &r=1: && \omega_1=c_1\,\dd\theta_1+c_1'\,\dd\theta_2 && c_1,c_1'\in\mathbb{R}\\ &r=2: && \omega_2=c_2\,\dd\theta_1\wedge\dd\theta_2 && c_2\in\mathbb{R}.\end{aligned}`}</Eq>
        <Tx>{R`尽管一形式 $\dd\theta_i$ 看起来是恰当的，但 $S^1$ 上不存在单值的**函数** $\theta_i$（例 6.3）。由于 $\chi(S^1)=0$，$\chi(T^2)=0$。

$n$ 维环面 $T^n=\underbrace{S^1\times\cdots\times S^1}_{n}$ 的 de Rham 上同调群可同样求得：$H^r(T^n)$ 由形如`}</Tx>
        <Eq n="6.50" say={R`$n$ 维环面的 $r$ 阶上同调由 $r$ 个不同角坐标的微分的外积生成。`}>{R`\dd\theta^{i_1}\wedge\dd\theta^{i_2}\wedge\ldots\wedge\dd\theta^{i_r}`}</Eq>
        <Tx>{R`的 $r$ 形式生成，其中 $i_1<i_2<\cdots<i_r$ 取自 $1,\ldots,n$。显然`}</Tx>
        <Eq n="6.51" say={R`$n$ 维环面的第 $r$ 个 Betti 数是从 $n$ 个圆中选 $r$ 个的方法数。`}>{R`b^r=\dim H^r(T^n)=\binom nr.`}</Eq>
        <Tx>{R`由 \eqref{6.51} 直接得到 Euler 示性数：`}</Tx>
        <Eq n="6.52" say={R`环面 Betti 数的交错和是 $(1-1)^n$ 的二项展开，恒为零。`}>{R`\chi(T^n)=\sum(-1)^r\binom nr=(1-1)^n=0.`}</Eq>
        <Tx>{R`于是 $H^*(T^n)$ 就是由 $n$ 个反交换的生成元 $[\dd\theta^1],\ldots,[\dd\theta^n]$ 生成的外代数，总维数 $2^n$。这些类线性无关的直接验证：$\dd\theta^{i_1}\wedge\cdots\wedge\dd\theta^{i_r}$ 在子环面 $T^r_{i_1\ldots i_r}$（其余角坐标固定）上的积分是 $(2\pi)^r$，在其他坐标子环面上是 0。`}</Tx>
      </Box>
      <KunnethLab />
    </Sub>);
}

function Sub644() {
  return (
    <Sub n="6.4.4" title="Pullback of de Rham cohomology groups" zh="de Rham 上同调群的拉回">
      <p className="muted">本小节概念：<C id="homotopy_inv" /></p>
      <Tx>{R`设 $f:M\to N$ 是光滑映射。式 \eqref{5.75}（$\dd f^*=f^*\dd$）表明拉回 $f^*$ 把闭形式映成闭形式（$\dd f^*\omega=f^*\dd\omega=0$），把恰当形式映成恰当形式（$f^*\dd\psi=\dd(f^*\psi)$）。因此可以定义上同调群的拉回 $f^*:H^r(N)\to H^r(M)$：`}</Tx>
      <Eq n="6.53" say={R`映射把目标空间的上同调类拉回到源空间：取代表闭形式拉回再取类；方向与映射相反，这是“上”同调的特征。`}>{R`f^*[\omega]=[f^*\omega]\qquad[\omega]\in H^r(N).`}</Eq>
      <Tx>{R`拉回 $f^*$ 保持 $H^*(N)$ 的环结构。事实上，若 $[\omega]\in H^p(N)$、$[\eta]\in H^q(N)$，由拉回与外积交换（\eqref{5.76}）：`}</Tx>
      <Eq n="6.54" say={R`拉回与上积交换：先乘后拉回等于先拉回后乘，所以 $f^*$ 是环同态。`}>{R`\begin{aligned}f^*([\omega]\wedge[\eta])&=f^*[\omega\wedge\eta]=[f^*(\omega\wedge\eta)]\\&=[f^*\omega\wedge f^*\eta]=[f^*\omega]\wedge[f^*\eta].\end{aligned}`}</Eq>
      <Tx>{R`另外 $(g\circ f)^*=f^*\circ g^*$、$\mathrm{id}^*=\mathrm{id}$，所以若 $f$ 是微分同胚，$f^*$ 是环同构——de Rham 上同调环是微分同胚不变量（事实上，由下一小节，它是同伦不变量）。注意方向：$f:M\to N$，$f^*:H^r(N)\to H^r(M)$，与同调的推前 $f_*:H_r(M)\to H_r(N)$ 相反；二者在配对下互为伴随：$\Lambda(f_*[c],[\omega])=\int_{f(c)}\omega=\int_cf^*\omega=\Lambda([c],f^*[\omega])$。`}</Tx>
    </Sub>);
}

function Sub645() {
  return (
    <Sub n="6.4.5" title={R`Homotopy and $H^1(M)$`} zh={R`同伦与 $H^1(M)$`}>
      <p className="muted">本小节概念：<C id="homotopy_inv" /> · <C id="volume_form" /></p>
      <Tx>{R`设 $f,g:M\to N$ 是光滑映射，并设它们彼此**同伦**：存在光滑映射 $F:M\times I\to N$，使 $F(p,0)=f(p)$、$F(p,1)=g(p)$。下面证明 $f^*:H^r(N)\to H^r(M)$ 等于 $g^*:H^r(N)\to H^r(M)$。思路：Poincaré 引理的证明其实证明了更多——同伦公式 \eqref{6.31} 对任何 $M\times I$ 都成立，不需要可缩。`}</Tx>
      <Stmt id="L6.1">
        <Eq n="6.55" say={R`同伦的两个映射把同一个闭形式拉回成两个只差一个恰当形式的形式。`}>{R`f^*\omega-g^*\omega=\dd\psi\qquad\psi\in\Omega^{r-1}(M).`}</Eq>
        <Proof steps={[
          { claim: R`先注意`, tex: R`f=F\circ f_0,\qquad g=F\circ f_1`, why: R`其中 $f_t:M\to M\times I$，$p\mapsto(p,t)$，已在定理 6.3 中定义（那里 $M=U$）。` },
          { claim: R`\eqref{6.55} 的左边为`, tex: R`\begin{aligned}(F\circ f_0)^*\omega-(F\circ f_1)^*\omega&=f_0^*\circ F^*\omega-f_1^*\circ F^*\omega\\&=-\big[\dd P(F^*\omega)+P\,\dd(F^*\omega)\big]=-\dd PF^*\omega\end{aligned}`, why: R`用了 \eqref{6.33}（即同伦公式 \eqref{6.31} 作用于 $\eta=F^*\omega$），以及 $\dd F^*\omega=F^*\dd\omega=0$。`, uses: ["6.31", "6.33", "5.75"] },
          { claim: R`这表明 $f^*\omega-g^*\omega=\dd(-PF^*\omega)$，即 $\psi=-PF^*\omega$。` },
        ]} />
      </Stmt>
      <Tx>{R`现在容易看出，作为拉回映射 $H^r(N)\to H^r(M)$，$f^*=g^*$。事实上，由上面的引理，

$$[f^*\omega-g^*\omega]=[f^*\omega]-[g^*\omega]=[\dd\psi]=0.$$

我们得到了下面的定理。`}</Tx>
      <Stmt id="T6.4" />
      <Box kind="note" title="同伦不变性的推论">{R`若 $f:M\to N$、$g:N\to M$ 满足 $g\circ f\simeq\mathrm{id}_M$、$f\circ g\simeq\mathrm{id}_N$（同伦等价），则 $f^*g^*=\mathrm{id}$、$g^*f^*=\mathrm{id}$，$H^*(M)\cong H^*(N)$。例：(i) $\mathbb{R}^n\simeq$ 一点，再次得到 \eqref{6.34}；(ii) $\mathbb{R}^2-\{0\}\simeq S^1$（$f$：包含映射，$g$：$x\mapsto x/|x|$，同伦 $F(x,t)=x/|x|^t$），所以 $H^1(\mathbb{R}^2-\{0\})\cong\mathbb{R}$，由习题 6.3 的 $[\omega]$ 生成；(iii) $\mathbb{R}^3-\{0\}\simeq S^2$，于是 $H^2(\mathbb{R}^3-\{0\})\cong\mathbb{R}$——点电荷（或磁单极）的场强 $\frac{\boldsymbol{x}\cdot\dd\mathbf{S}}{|\boldsymbol{x}|^3}$ 是它的生成元。`}</Box>
      <Tx>{R`**$H^1$ 与基本群。**设 $M$ 是单连通流形，即 $\pi_1(M)\cong\{0\}$。由于 $H_1(M)$ 是 $\pi_1(M)$ 模去换位子群（第 4 章 \sref{T4.9}），$H_1(M)$ 也平凡；由 de Rham 定理，$H^1(M)=0$（$M$ 紧致时）。用 de Rham 上同调的语言，这可以表述为下面的定理，而且可以直接证明，不需要 de Rham 定理，也不需要紧致。`}</Tx>
      <Stmt id="T6.5">
        <Tx>{R`**证明。**设 $\omega$ 是 $M$ 上的闭一形式。若 $\omega=\dd f$，函数 $f$ 显然必须是（相差常数）`}</Tx>
        <Eq n="6.56" say={R`闭一形式的原函数候选：从固定点出发沿路径积分到 $p$。问题只在于它是否与路径无关。`}>{R`f(p)=\int_{p_0}^p\omega`}</Eq>
        <Tx>{R`$p_0\in M$ 为固定点。要证的是：这个积分与从 $p_0$ 到 $p$ 的路径无关。

**先证闭形式沿闭路的积分为零。**设 $\alpha:I\to M$ 是 $p$ 处的闭路，$c_p:I\to M$（$t\mapsto p$）是常值闭路。因为 $M$ 单连通，存在同伦 $F(s,t)$，$F(s,0)=\alpha(s)$、$F(s,1)=c_p(s)$（端点保持在 $p$），设 $F:I\times I\to M$ 光滑。定义一形式 $\omega$ 沿 $\alpha(I)$ 的积分为`}</Tx>
        <Eq n="6.57" say={R`闭路上的积分定义为把形式拉回到参数圆周上再积分；闭路两端重合，所以参数区间可以首尾粘成圆周。`}>{R`\int_{\alpha(I)}\omega=\int_{S^1}\alpha^*\omega`}</Eq>
        <Tx>{R`右边把积分区域取为 $S^1$，因为左边的 $I=[0,1]$（两端点映到同一点）被紧化成了 $S^1$；同伦 $F$ 也就成了 $S^1\times I\to M$ 的同伦。由 \sref{L6.1}（$M\to S^1$，$N\to M$，$f\to\alpha$，$g\to c_p$），对闭一形式 $\omega$ 有`}</Tx>
        <Eq n="6.58" say={R`闭路与常值闭路同伦，所以闭形式在二者上的拉回只差一个恰当形式。`}>{R`\alpha^*\omega-c_p^*\omega=\dd g`}</Eq>
        <Tx>{R`其中 $g=-PF^*\omega$ 是 $S^1$ 上的函数。拉回 $c_p^*\omega$ 为零，因为 $c_p$ 是常值映射。于是，由于 $\partial S^1$ 是空集，由 Stokes 定理 \eqref{6.57} 为零：`}</Tx>
        <Eq n="6.59" say={R`在单连通流形上，闭一形式沿任何闭路的积分为零：圆周没有边界，恰当形式在上面积分为零。`}>{R`\int_{S^1}\alpha^*\omega=\int_{S^1}\dd g=\int_{\partial S^1}g=0.`}</Eq>
        <Tx>{R`**路径无关。**设 $\beta$、$\gamma$ 是连接 $p_0$ 与 $p$ 的两条路径。$\beta$ 接上 $\gamma$ 的逆是 $p_0$ 处的闭路，由 \eqref{6.59}，沿 $\beta$ 与沿 $\gamma$ 的积分相同：

$$\int_{\beta(I)}\omega=\int_{\gamma(I)}\omega .$$

这表明 \eqref{6.56} 确实良定义。`}</Tx>
        <Proof title="最后一步：$\dd f=\omega$（原书略）" steps={[
          { claim: R`在 $p$ 附近取坐标卡。从 $p$ 沿坐标方向 $x^\mu$ 走一小段 $h$：由路径无关，可以先走到 $p$ 再走这条直线段，故`, tex: R`f(p+he_\mu)-f(p)=\int_0^h\omega_\mu(p+\tau e_\mu)\,\dd\tau`, fill: true },
          { claim: R`除以 $h$、令 $h\to0$ 得 $\partial f/\partial x^\mu=\omega_\mu(p)$。所以 $\dd f=\omega$，$f$ 光滑，$\omega$ 恰当。`, fill: true },
        ]} />
      </Stmt>
      <Erratum kind="erratum" loc="p.262 第 1 段" title={R`"$c_p\omega$" 应为 $c_p^*\omega$`}>{R`原书写 "The pullback $c_p\omega$ vanishes"，漏了拉回的星号；\eqref{6.58} 本身写的是 $c_p^*\omega$。常值映射的微分为零，所以它把任何一形式拉回为零。`}</Erratum>
      <Box kind="warning" title={R`逆命题不成立`}>{R`$H^1(M)=0$ 不推出单连通。de Rham 上同调是实系数的，只能看到 $\pi_1$ 交换化后的**自由部分**：$\mathbb{R}P^2$ 的 $\pi_1=\mathbb{Z}_2$，但 $H^1(\mathbb{R}P^2)=0$；Poincaré 同调球面的 $\pi_1$ 是 120 阶群，$H_1=0$。`}</Box>

      <Box kind="example" n="6.6" title={R`球面 $S^n$ 的上同调`}>
        <Tx>{R`$n$ 维球面 $S^n$（$n\ge2$）是单连通的，因此`}</Tx>
        <Eq n="6.60" say={R`二维及以上的球面单连通，所以一阶上同调为零：球面上任何闭一形式都有原函数。`}>{R`H^1(S^n)=0\qquad n\ge2.`}</Eq>
        <Tx>{R`由 Poincaré 对偶得`}</Tx>
        <Eq n="6.61" say={R`球面的最高阶上同调与零阶上同调一样，是一维的：由体积形式生成。`}>{R`H^0(S^n)\cong H^n(S^n)=\mathbb{R}.`}</Eq>
        <Tx>{R`可以证明`}</Tx>
        <Eq n="6.62" say={R`球面在中间各阶都没有上同调：除了 0 阶与 $n$ 阶，它没有“洞”。`}>{R`H^r(S^n)=0\qquad1\le r\le n-1.`}</Eq>
        <Derivation title={R`\eqref{6.62} 的证明（原书只说"可以证明"）：两块坐标卡 + 归纳`} collapsed steps={[
          { tex: R`S^n=U\cup V,\quad U=S^n-\{\text{北极}\}\cong\mathbb{R}^n,\quad V=S^n-\{\text{南极}\}\cong\mathbb{R}^n`, why: R`球极投影（第 5 章例 5.3）。$U\cap V\cong S^{n-1}\times(-1,1)$，同伦等价于赤道 $S^{n-1}$，由 \sref{T6.4}，$H^k(U\cap V)\cong H^k(S^{n-1})$。` },
          { tex: R`\omega\in Z^r(S^n),\ 1\le r\le n-1:\qquad\omega|_U=\dd\alpha,\quad\omega|_V=\dd\beta`, why: R`Poincaré 引理（\sref{T6.3}），$U$、$V$ 可缩。` },
          { tex: R`\dd(\alpha-\beta)=0\ \text{在}\ U\cap V\ \text{上}`, why: R`$\alpha-\beta$ 是 $U\cap V$ 上的闭 $(r-1)$ 形式。` },
          { tex: R`r=1:\ \alpha-\beta=\text{常数}\ k\ \Rightarrow\ f=\begin{cases}\alpha&\text{在 }U\\ \beta+k&\text{在 }V\end{cases},\quad\omega=\dd f`, why: R`$n\ge2$ 时 $U\cap V$ 连通，闭 0 形式是常数；两块拼成整体函数。（这也再次证明了 \eqref{6.60}。）` },
          { tex: R`2\le r\le n-1:\ \alpha-\beta=\dd\gamma\ \text{在}\ U\cap V\ \text{上}`, why: R`归纳假设：$1\le r-1\le n-2$，$H^{r-1}(S^{n-1})=0$。` },
          { tex: R`\alpha'=\alpha-\dd(\rho_V\gamma)\ \text{在}\ U,\qquad\beta'=\beta+\dd(\rho_U\gamma)\ \text{在}\ V`, why: R`$\{\rho_U,\rho_V\}$ 是从属于 $\{U,V\}$ 的单位分解（第 5 章定义 5.7）；$\rho_V\gamma$ 在 $U-V$ 附近为零，可延拓到整个 $U$。` },
          { tex: R`\alpha'-\beta'=\dd\gamma-\dd\big((\rho_U+\rho_V)\gamma\big)=0\ \text{在}\ U\cap V\ \text{上},\qquad\dd\alpha'=\dd\beta'=\omega`, why: R`于是 $\alpha'$、$\beta'$ 拼成 $S^n$ 上的整体 $(r-1)$ 形式，其外微分为 $\omega$。` },
        ]} result={R`$\omega$ 恰当，$H^r(S^n)=0$（$1\le r\le n-1$）。同样的论证在 $r=n$ 时停在"$H^{n-1}(S^{n-1})=\mathbb{R}$"这一步：障碍恰好是一维的，与 \eqref{6.61} 一致。这就是 Mayer–Vietoris 论证的雏形。`} />
        <Tx>{R`$H^n(S^n)$ 由体积元 $\Omega$ 生成。由于 $S^n$ 上没有 $(n+1)$ 形式，每个 $n$ 形式都是闭的。$\Omega$ 不可能是恰当的：若 $\Omega=\dd\psi$，则

$$\int_{S^n}\Omega=\int_{S^n}\dd\psi=\int_{\partial S^n}\psi=0,$$

与 $\int_{S^n}\Omega>0$（球面的体积）矛盾。Euler 示性数为`}</Tx>
        <Eq n="6.63" say={R`球面只有 0 阶与 $n$ 阶的 Betti 数为 1，所以 Euler 示性数在偶数维为 2、奇数维为 0。`}>{R`\chi(S^n)=1+(-1)^n=\begin{cases}0&n\ \text{为奇数}\\2&n\ \text{为偶数}.\end{cases}`}</Eq>
      </Box>

      <Box kind="example" n="6.7" title={R`$S^2$ 上的面积形式：闭而不恰当`}>
        <Tx>{R`把 $S^2$ 嵌入 $\mathbb{R}^3$，定义`}</Tx>
        <Eq n="6.64" say={R`单位球面的面积元：处处闭（二维流形上没有非零的三形式），积分为 $4\pi$，所以不是任何整体一形式的外微分。`}>{R`\sym{vol}{\Omega}=\sin\theta\,\dd\theta\wedge\dd\phi`}</Eq>
        <Tx>{R`其中 $(\theta,\phi)$ 是通常的极坐标。验证 $\Omega$ 是闭的：$\dd\Omega$ 是 $S^2$ 上的 3 形式，必为零（或直接算：$\dd(\sin\theta)\wedge\dd\theta\wedge\dd\phi=\cos\theta\,\dd\theta\wedge\dd\theta\wedge\dd\phi=0$）。我们可以**形式上**把 $\Omega$ 写成

$$\Omega=-\dd(\cos\theta)\wedge\dd\phi=-\dd(\cos\theta\,\dd\phi).$$

但要注意 $\Omega$ **不是**恰当的：$\int_{S^2}\Omega=\int_0^\pi\sin\theta\,\dd\theta\int_0^{2\pi}\dd\phi=4\pi\neq0$。上式的毛病在于 $\dd\phi$ 在两极没有定义（$\phi$ 在两极不是坐标），所以 $\cos\theta\,\dd\phi$ 不是 $S^2$ 上的光滑一形式。`}</Tx>
      </Box>
      <Box kind="physics" title="Dirac 磁单极与 Wu–Yang 构造">{R`磁荷 $g$ 的磁单极场强为 $F=\frac{g}{4\pi}\Omega$（限制在包围它的球面上），闭而不恰当，$\int_{S^2}F=g$。单一的光滑矢势不存在，但可以用两块：

$$A_N=\frac{g}{4\pi}(1-\cos\theta)\,\dd\phi\ \ (\text{去掉南极}),\qquad A_S=-\frac{g}{4\pi}(1+\cos\theta)\,\dd\phi\ \ (\text{去掉北极}).$$

$A_N$ 在北极 $\theta\to0$ 处 $\sim\frac{g}{8\pi}\theta^2\dd\phi$，光滑；$\dd A_N=\dd A_S=F$。在重叠区上 $A_N-A_S=\frac{g}{2\pi}\dd\phi$——又是一个闭而不恰当的形式（赤道附近的 $H^1$），周期为 $g$。要求两块上的量子力学描述只差一个单值的规范变换 $e^{\mathrm{i}e\chi/\hbar}$，就得到 Dirac 量子化条件 $eg/\hbar\in2\pi\mathbb{Z}$。这正是第 9–10 章纤维丛与联络的出发点：上同调类 $[F]$ 是 $U(1)$ 丛的第一陈类。`}</Box>
      <Table caption="本章算出的 de Rham 上同调（Betti 数）" head={["流形", R`$b^0$`, R`$b^1$`, R`$b^2$`, R`$\cdots$`, R`$\chi$`, "出处"]} rows={[
        [R`$\mathbb{R}^n$`, "1", "0", "0", "0", "1", R`例 6.4 \eqref{6.34}`],
        [R`$S^1$`, "1", "1", "—", "", "0", R`例 6.3 \eqref{6.16}`],
        [R`$\mathbb{R}^2-\{0\}$`, "1", "1", "0", "", "0", R`习题 6.3、\sref{T6.4}`],
        [R`$T^2$`, "1", "2", "1", "", "0", R`例 6.5 \eqref{6.48a}–\eqref{6.48c}`],
        [R`$T^n$`, "1", R`$n$`, R`$\binom n2$`, R`$b^r=\binom nr$`, "0", R`\eqref{6.51}–\eqref{6.52}`],
        [R`$S^n\ (n\ge2)$`, "1", "0", R`$0\ (n>2)$`, R`$b^n=1$`, R`$1+(-1)^n$`, R`例 6.6 \eqref{6.60}–\eqref{6.63}`],
      ]} />
    </Sub>);
}
