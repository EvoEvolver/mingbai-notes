// §7.9 微分形式与 Hodge 理论 —— 式 (7.168)–(7.199)，定义 7.6–7.7，定理 7.4–7.8，例 7.16，习题 7.20–7.23
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, C } from "@kit";

const R = String.raw;

export function Sec79() {
  return (
    <Sec n="7.9" title="Differential forms and Hodge theory" zh="微分形式与 Hodge 理论"
      gist={R`度规给出不变体积元 $\sqrt{|g|}\dd x^1\wedge\cdots\wedge\dd x^m$ → Hodge 星 $*:\Omega^r\to\Omega^{m-r}$，$**=\pm1$（\sref{T7.4}）→ 形式的内积 $(\omega,\eta)=\int\omega\wedge*\eta$ → 余微分 $\dd^\dagger$ 是 $\dd$ 的伴随（\sref{T7.5}）→ Laplace 算子 $\Delta=\dd\dd^\dagger+\dd^\dagger\dd$，调和 ⇔ 闭且余闭 → Hodge 分解 $\Omega^r=\dd\Omega^{r-1}\oplus\dd^\dagger\Omega^{r+1}\oplus\mathrm{Harm}^r$ → Hodge 定理 $H^r(M)\cong\mathrm{Harm}^r(M)$：Betti 数 = 调和形式的个数。`}
      why={R`第 5、6 章的微分形式与上同调不需要度规；有了度规，就能定义"形式的长度"与"散度"，从而写出 Maxwell 方程的另一半 $\dd^\dagger F=j$，并把拓扑不变量（Betti 数、Euler 示性数）表示为 Laplace 算子的零模数——指标定理（第 12 章）的原型。`}
      gives={["7.168", "7.172", "7.176a", "7.181", "7.184a", "7.186", "7.187", "7.188", "7.189a", "7.192a", "7.197", "7.199"]}>
      <p className="muted">本节概念：<C id="hodge" /></p>
      <Sub n="7.9.1" title="Invariant volume elements" zh="不变体积元">
        <Tx>{R`§5.5 中把体积元定义为 $m$ 维可定向流形 $M$ 上处处不为零的 $m$ 形式。若 $M$ 带有度规 $g$，就存在一个在坐标变换下不变的自然体积元。定义**不变体积元**（invariant volume element）`}</Tx>
        <Eq n="7.168" title="不变体积元" say={R`度规给出的典范体积元：坐标体积乘 $\sqrt{|g|}$，后者恰好抵消换坐标时的 Jacobi 行列式。`}>{R`\Omega_M\equiv\sqrt{|g|}\,\dd x^1\wedge\dd x^2\wedge\ldots\wedge\dd x^m`}</Eq>
        <Tx>{R`其中 $g=\det g_{\mu\nu}$，$x^\mu$ 是卡 $(U,\varphi)$ 的坐标。$m$ 形式 $\Omega_M$ 确实在坐标变换下不变。设 $y^\lambda$ 是另一张卡 $(V,\psi)$ 的坐标，$U\cap V\neq\emptyset$。用 $y$ 坐标写出的不变体积元为

$$\sqrt{\left|\det\left(\frac{\partial x^\mu}{\partial y^\kappa}\frac{\partial x^\nu}{\partial y^\lambda}g_{\mu\nu}\right)\right|}\,\dd y^1\wedge\ldots\wedge\dd y^m.$$

注意到 $\dd y^\lambda=(\partial y^\lambda/\partial x^\mu)\dd x^\mu$，它成为

$$\begin{aligned}&\left|\det\left(\frac{\partial x^\mu}{\partial y^\kappa}\right)\right|\sqrt{|g|}\det\left(\frac{\partial y^\lambda}{\partial x^\nu}\right)\dd x^1\wedge\dd x^2\wedge\ldots\wedge\dd x^m\\&\quad=\pm\sqrt{|g|}\,\dd x^1\wedge\dd x^2\wedge\ldots\wedge\dd x^m.\end{aligned}$$

若 $x^\mu$ 与 $y^\kappa$ 定义同一个定向，则 $\det(\partial x^\mu/\partial y^\kappa)$ 在 $U\cap V$ 上严格为正，$\Omega_M$ 在坐标变换下不变。`}</Tx>
        <Exercise n="7.20" title="用 vielbein 写体积元" level="★"
          hint={R`由 \eqref{7.132b}，$\det g_{\mu\nu}=(\det e^\alpha{}_\mu)^2\det\delta$。楔积 $\hat\theta^1\wedge\cdots\wedge\hat\theta^m$ 展开时恰好产生行列式。`}
          solution={R`由 \eqref{7.132b}，$g_{\mu\nu}=e^\alpha{}_\mu\delta_{\alpha\beta}e^\beta{}_\nu$，矩阵形式 $g=E^{\mathrm t}E$，所以 $\det g=e^2$（Lorentz 情形 $\det g=-e^2$），$\sqrt{|g|}=|e|$。另一方面

$$\hat\theta^1\wedge\cdots\wedge\hat\theta^m=e^1{}_{\mu_1}\cdots e^m{}_{\mu_m}\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\mu_m}=\varepsilon_{\mu_1\ldots\mu_m}e^1{}_{\mu_1}\cdots e^m{}_{\mu_m}\,\dd x^1\wedge\cdots\wedge\dd x^m=e\,\dd x^1\wedge\cdots\wedge\dd x^m.$$

由 \eqref{7.131} 的约定 $\det e_\alpha{}^\mu>0$，$e=\det e^\alpha{}_\mu>0$，于是 $e=|e|$，三者相等，即 \eqref{7.169}。几何意义：在正交标架中，体积元就是"单位立方体" $\hat\theta^1\wedge\cdots\wedge\hat\theta^m$。`}>
          {R`设 $\{\hat\theta^\alpha\}=\{e^\alpha{}_\mu\dd x^\mu\}$ 是非坐标基。证明不变体积元可写成`}
        </Exercise>
        <Eq n="7.169" say={R`在正交标架中，体积元就是标架一形式的楔积，系数 $|e|=\sqrt{|g|}$。`}>{R`\Omega_M=|e|\,\dd x^1\wedge\dd x^2\wedge\ldots\wedge\dd x^m=\hat\theta^1\wedge\hat\theta^2\wedge\ldots\wedge\hat\theta^m`}</Eq>
        <Tx>{R`其中 $e=\det e^\alpha{}_\mu$。

有了不变体积元，自然地定义 $f\in\mathcal{F}(M)$ 在 $M$ 上的积分：`}</Tx>
        <Eq n="7.170" say={R`标量函数的不变积分：坐标积分乘 $\sqrt{|g|}$。`}>{R`\int_Mf\Omega_M\equiv\int_Mf\sqrt{|g|}\,\dd x^1\dd x^2\ldots\dd x^m.`}</Eq>
        <Tx>{R`显然 \eqref{7.170} 在坐标变换下不变。物理中许多量都表示为这类体积积分，见 §7.10。`}</Tx>
      </Sub>

      <Sub n="7.9.2" title="Duality transformations (Hodge star)" zh="对偶变换（Hodge 星）">
        <Tx>{R`如 §5.4 所述，在 $m$ 维流形 $M$ 上 $\Omega^r(M)$ 与 $\Omega^{m-r}(M)$ 同构（维数都是 $\binom mr$）。若 $M$ 带有度规 $g$，就能在二者之间定义一个自然的同构，称为 **Hodge $*$ 运算**。定义全反对称张量 $\varepsilon$：`}</Tx>
        <Eq n="7.171a" say={R`Levi-Civita 符号：偶置换 $+1$、奇置换 $-1$、有重复 $0$。`}>{R`\varepsilon_{\mu_1\mu_2\ldots\mu_m}=\begin{cases}+1&\text{若 }(\mu_1\mu_2\ldots\mu_m)\text{ 是 }(12\ldots m)\text{ 的偶置换}\\-1&\text{若 }(\mu_1\mu_2\ldots\mu_m)\text{ 是 }(12\ldots m)\text{ 的奇置换}\\0&\text{其他}.\end{cases}`}</Eq>
        <Tx>{R`注意`}</Tx>
        <Eq n="7.171b" say={R`用逆度规把 $\varepsilon$ 的全部指标升起，得到 $g^{-1}$ 乘符号本身（$\det g^{\mu\nu}=g^{-1}$）。`}>{R`\varepsilon^{\mu_1\mu_2\ldots\mu_m}=g^{\mu_1\nu_1}g^{\mu_2\nu_2}\ldots g^{\mu_m\nu_m}\varepsilon_{\nu_1\nu_2\ldots\nu_m}=g^{-1}\varepsilon_{\mu_1\mu_2\ldots\mu_m}.`}</Eq>
        <Tx>{R`Hodge $*$ 是线性映射 $*:\Omega^r(M)\to\Omega^{m-r}(M)$，它在 $\Omega^r(M)$ 的基向量上的作用定义为`}</Tx>
        <Eq n="7.172" keyEq title="Hodge 星" say={R`Hodge 星把一个 $r$ 维"有向面元"映成与它正交的 $(m-r)$ 维面元：在 $\R^3$ 中 $*\dd x=\dd y\wedge\dd z$，这正是"向量 ↔ 面"的对应。`}>{R`*(\dd x^{\mu_1}\wedge\dd x^{\mu_2}\wedge\ldots\wedge\dd x^{\mu_r})=\frac{\sqrt{|g|}}{(m-r)!}\varepsilon^{\mu_1\mu_2\ldots\mu_r}{}_{\nu_{r+1}\ldots\nu_m}\dd x^{\nu_{r+1}}\wedge\ldots\wedge\dd x^{\nu_m}.`}</Eq>
        <Tx>{R`应当注意 $*1$ 就是不变体积元：

$$*1=\frac{\sqrt{|g|}}{m!}\varepsilon_{\mu_1\mu_2\ldots\mu_m}\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_m}=\sqrt{|g|}\,\dd x^1\wedge\ldots\wedge\dd x^m.$$

对

$$\omega=\frac1{r!}\omega_{\mu_1\mu_2\ldots\mu_r}\dd x^{\mu_1}\wedge\dd x^{\mu_2}\wedge\ldots\wedge\dd x^{\mu_r}\in\Omega^r(M)$$

有`}</Tx>
        <Eq n="7.173" say={R`一般 $r$ 形式的 Hodge 对偶：分量的指标用 $\varepsilon$ 缩并（升指标用度规）。`}>{R`*\omega=\frac{\sqrt{|g|}}{r!(m-r)!}\omega_{\mu_1\mu_2\ldots\mu_r}\varepsilon^{\mu_1\mu_2\ldots\mu_r}{}_{\nu_{r+1}\ldots\nu_m}\dd x^{\nu_{r+1}}\wedge\ldots\wedge\dd x^{\nu_m}.`}</Eq>
        <Tx>{R`若取非坐标基 $\{\hat\theta^\alpha\}=\{e^\alpha{}_\mu\dd x^\mu\}$，$*$ 运算成为`}</Tx>
        <Eq n="7.174" say={R`在正交标架里 Hodge 星不再含度规因子：只是"补上剩下的方向"并带上排列的符号。`}>{R`*(\hat\theta^{\alpha_1}\wedge\ldots\wedge\hat\theta^{\alpha_r})=\frac1{(m-r)!}\varepsilon^{\alpha_1\ldots\alpha_r}{}_{\beta_{r+1}\ldots\beta_m}\hat\theta^{\beta_{r+1}}\wedge\ldots\wedge\hat\theta^{\beta_m}`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="7.175" say={R`标架指标的 Levi-Civita 符号，与坐标指标的定义相同。`}>{R`\varepsilon_{\alpha_1\ldots\alpha_m}=\begin{cases}+1&\text{若 }(\alpha_1\ldots\alpha_m)\text{ 是 }(12\ldots m)\text{ 的偶置换}\\-1&\text{若 }(\alpha_1\ldots\alpha_m)\text{ 是 }(12\ldots m)\text{ 的奇置换}\\0&\text{其他}\end{cases}`}</Eq>
        <Tx>{R`指标用 $\delta^{\alpha\beta}$ 或 $\eta^{\alpha\beta}$ 升起。`}</Tx>
        <Stmt id="T7.4">
          <Proof steps={[
            { claim: R`用非坐标基证明 \eqref{7.176a} 较简单。设 $\omega=\frac1{r!}\omega_{\alpha_1\ldots\alpha_r}\hat\theta^{\alpha_1}\wedge\ldots\wedge\hat\theta^{\alpha_r}$。两次作用 $*$：`, tex: R`**\omega=\frac1{r!}\omega_{\alpha_1\ldots\alpha_r}\frac1{(m-r)!}\varepsilon^{\alpha_1\ldots\alpha_r}{}_{\beta_{r+1}\ldots\beta_m}\times\frac1{r!}\varepsilon^{\beta_{r+1}\ldots\beta_m}{}_{\gamma_1\ldots\gamma_r}\hat\theta^{\gamma_1}\wedge\ldots\wedge\hat\theta^{\gamma_r}`, uses: ["7.174"] },
            { claim: R`Riemann 情形升降指标不改变符号。把第二个 $\varepsilon$ 的两个指标块交换位置（$r(m-r)$ 次对换）：`, tex: R`=\frac{(-1)^{r(m-r)}}{r!r!(m-r)!}\sum_{\alpha\beta\gamma}\omega_{\alpha_1\ldots\alpha_r}\varepsilon_{\alpha_1\ldots\alpha_r\beta_{r+1}\ldots\beta_m}\varepsilon_{\gamma_1\ldots\gamma_r\beta_{r+1}\ldots\beta_m}\hat\theta^{\gamma_1}\wedge\ldots\wedge\hat\theta^{\gamma_r}` },
            { claim: R`用恒等式`, tex: R`\sum_{\beta\gamma}\varepsilon_{\alpha_1\ldots\alpha_r\beta_{r+1}\ldots\beta_m}\varepsilon_{\gamma_1\ldots\gamma_r\beta_{r+1}\ldots\beta_m}\hat\theta^{\gamma_1}\wedge\ldots\wedge\hat\theta^{\gamma_r}=r!(m-r)!\,\hat\theta^{\alpha_1}\wedge\ldots\wedge\hat\theta^{\alpha_r}`, why: R`对固定的 $\alpha$（互不相同），$\beta$ 必须取剩下的 $m-r$ 个值（$(m-r)!$ 种排列，每种贡献 $\varepsilon^2=1$ 乘 $\gamma$ 对 $\alpha$ 的排列符号），$\gamma$ 是 $\alpha$ 的 $r!$ 种排列，楔积再把排列符号抵消。` },
            { claim: R`于是 $**\omega=\frac{(-1)^{r(m-r)}}{r!}\omega_{\alpha_1\ldots\alpha_r}\hat\theta^{\alpha_1}\wedge\ldots\wedge\hat\theta^{\alpha_r}=(-1)^{r(m-r)}\omega$。` },
            { claim: R`**Lorentz 情形（原书留给读者，本站补全）：**两次作用时，$\varepsilon^{\alpha_1\ldots\alpha_r}{}_{\beta\ldots}$ 中被升起的 $r$ 个指标与 $\varepsilon^{\beta\ldots}{}_{\gamma\ldots}$ 中被升起的 $m-r$ 个指标合起来，恰好把 $\{1,\ldots,m\}$ 的每个指标各升起一次，产生因子 $\prod_\alpha\eta^{\alpha\alpha}=\det\eta^{-1}=-1$；其余步骤不变，得 $**\omega=(-1)^{1+r(m-r)}\omega$。`, fill: true },
          ]} />
        </Stmt>
        <Eq n="7.176a" title={R`$**$ 的符号`} say={R`Riemann 流形上 Hodge 星做两次回到自身，至多差一个符号 $(-1)^{r(m-r)}$。`}>{R`**\omega=(-1)^{r(m-r)}\omega.`}</Eq>
        <Tx>{R`（若 $(M,g)$ 是 Riemann 流形；）以及`}</Tx>
        <Eq n="7.176b" say={R`Lorentz 流形上多一个负号，来自 $\det\eta=-1$。`}>{R`**\omega=(-1)^{1+r(m-r)}\omega`}</Eq>
        <Tx>{R`（若是 Lorentz 流形。）于是 $(-1)^{r(m-r)}**$（或 $(-1)^{1+r(m-r)}**$）是 $\Omega^r(M)$ 上的恒等映射。定义 $*$ 的逆为`}</Tx>
        <Eq n="7.177a" say={R`Riemann 情形 $*$ 的逆。`}>{R`*^{-1}=(-1)^{r(m-r)}*\qquad(M,g)\text{ 是 Riemann 流形}`}</Eq>
        <Eq n="7.177b" say={R`Lorentz 情形 $*$ 的逆。`}>{R`*^{-1}=(-1)^{1+r(m-r)}*\qquad(M,g)\text{ 是 Lorentz 流形}.`}</Eq>
      </Sub>

      <Sub n="7.9.3" title="Inner products of r-forms" zh="r 形式的内积">
        <Tx>{R`取

$$\omega=\frac1{r!}\omega_{\mu_1\ldots\mu_r}\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}\qquad\eta=\frac1{r!}\eta_{\mu_1\ldots\mu_r}\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}.$$

外积 $\omega\wedge*\eta$ 是 $m$ 形式：`}</Tx>
        <Eq n="7.178" title={R`$\omega\wedge*\eta$`} say={R`$\omega\wedge*\eta$ 就是分量的逐点内积乘体积元：Hodge 星把"楔积"变成了"内积"。`}>{R`\begin{aligned}\omega\wedge*\eta&=\frac1{(r!)^2}\omega_{\mu_1\ldots\mu_r}\eta_{\nu_1\ldots\nu_r}\frac{\sqrt{|g|}}{(m-r)!}\varepsilon^{\nu_1\ldots\nu_r}{}_{\mu_{r+1}\ldots\mu_m}\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}\wedge\dd x^{\mu_{r+1}}\wedge\ldots\wedge\dd x^{\mu_m}\\&=\frac1{r!}\sum_{\mu\nu}\omega_{\mu_1\ldots\mu_r}\eta^{\nu_1\ldots\nu_r}\frac1{r!(m-r)!}\varepsilon_{\nu_1\ldots\nu_r\mu_{r+1}\ldots\mu_m}\varepsilon_{\mu_1\ldots\mu_r\mu_{r+1}\ldots\mu_m}\sqrt{|g|}\,\dd x^1\wedge\ldots\wedge\dd x^m\\&=\frac1{r!}\omega_{\mu_1\ldots\mu_r}\eta^{\mu_1\ldots\mu_r}\sqrt{|g|}\,\dd x^1\wedge\ldots\wedge\dd x^m.\end{aligned}`}</Eq>
        <Tx>{R`这个表达式说明该乘积是对称的：`}</Tx>
        <Eq n="7.179" say={R`$\omega\wedge*\eta$ 关于 $\omega,\eta$ 对称。`}>{R`\omega\wedge*\eta=\eta\wedge*\omega.`}</Eq>
        <Tx>{R`设 $\{\hat\theta^\alpha\}$ 是非坐标基，

$$\omega=\frac1{r!}\omega_{\alpha_1\ldots\alpha_r}\hat\theta^{\alpha_1}\wedge\ldots\wedge\hat\theta^{\alpha_r}\qquad\eta=\frac1{r!}\eta_{\alpha_1\ldots\alpha_r}\hat\theta^{\alpha_1}\wedge\ldots\wedge\hat\theta^{\alpha_r}.$$

\eqref{7.178} 改写为`}</Tx>
        <Eq n="7.180" say={R`在正交标架中，分量的内积就是普通的平方和（Riemann 情形）。`}>{R`\omega\wedge*\eta=\frac1{r!}\omega_{\alpha_1\ldots\alpha_r}\eta^{\alpha_1\ldots\alpha_r}\hat\theta^1\wedge\ldots\wedge\hat\theta^m.`}</Eq>
        <Tx>{R`由于 $\alpha\wedge*\beta$ 是 $m$ 形式，它在 $M$ 上的积分有意义。定义两个 $r$ 形式的**内积** $(\omega,\eta)$：`}</Tx>
        <Eq n="7.181" title="形式的内积" say={R`形式空间上的 $L^2$ 内积：逐点内积在整个流形上积分。`}>{R`(\omega,\eta)\equiv\int\omega\wedge*\eta=\frac1{r!}\int_M\omega_{\mu_1\ldots\mu_r}\eta^{\mu_1\ldots\mu_r}\sqrt{|g|}\,\dd x^1\ldots\dd x^m.`}</Eq>
        <Tx>{R`由于 $\omega\wedge*\eta=\eta\wedge*\omega$，内积是对称的：`}</Tx>
        <Eq n="7.182" say={R`内积对称。`}>{R`(\omega,\eta)=(\eta,\omega).`}</Eq>
        <Tx>{R`若 $(M,g)$ 是 Riemann 流形，内积是正定的：`}</Tx>
        <Eq n="7.183" say={R`Riemann 情形内积正定：形式的"长度平方"非负，只有零形式长度为零。`}>{R`(\alpha,\alpha)\ge0`}</Eq>
        <Tx>{R`等号仅当 $\alpha=0$ 时成立（由 \eqref{7.180}，被积函数是分量的平方和）。若 $(M,g)$ 是 Lorentz 流形，这不成立（例如电磁场的 $(F,F)\propto\int(\boldsymbol B^2-\boldsymbol E^2)$ 可正可负）。`}</Tx>
      </Sub>

      <Sub n="7.9.4" title="Adjoints of exterior derivatives" zh="外微分的伴随">
        <Stmt id="D7.6" />
        <Eq n="7.184a" title="余微分" say={R`余微分：先对偶、再外微分、再对偶回来，带一个使其成为 $\dd$ 的伴随的符号。作用在一形式上就是负的散度。`}>{R`\dd^\dagger=(-1)^{mr+m+1}*\dd*`}</Eq>
        <Tx>{R`（若 $(M,g)$ 是 Riemann 流形；）以及`}</Tx>
        <Eq n="7.184b" say={R`Lorentz 情形的余微分。`}>{R`\dd^\dagger=(-1)^{mr+m}*\dd*`}</Eq>
        <Tx>{R`（若是 Lorentz 流形，$m=\dim M$。）总结为下面的图（Riemann 流形）：`}</Tx>
        <Eq n="7.185" say={R`余微分的图示：从 $\Omega^r$ 经 $*$ 到 $\Omega^{m-r}$，外微分，再经 $*$ 回到 $\Omega^{r-1}$。`}>{R`\begin{matrix}\Omega^{m-r}(M)&\overset{(-1)^{mr+m+1}\,\dd}{\longrightarrow}&\Omega^{m-r+1}(M)\\ *\,\uparrow&&\downarrow\,*\\ \Omega^r(M)&\overset{\dd^\dagger}{\longrightarrow}&\Omega^{r-1}(M).\end{matrix}`}</Eq>
        <Tx>{R`由于 $\dd$ 幂零，算子 $\dd^\dagger$ 也幂零：$\dd^{\dagger2}=*\dd**\dd*\propto*\dd^2*=0$。`}</Tx>
        <Stmt id="T7.5">
          <Proof steps={[
            { claim: R`$\dd\beta\wedge*\alpha$ 与 $\beta\wedge*\dd^\dagger\alpha$ 都是 $m$ 形式，在 $M$ 上的积分都有定义。让 $\dd$ 作用在 $\beta\wedge*\alpha$ 上（$\beta$ 是 $(r-1)$ 形式）：`, tex: R`\dd(\beta\wedge*\alpha)=\dd\beta\wedge*\alpha-(-1)^r\beta\wedge\dd*\alpha` },
            { claim: R`设 $(M,g)$ 是 Riemann 流形。$\dd*\alpha$ 是 $(m-r+1)$ 形式，在它前面插入恒等映射 $(-1)^{(m-r+1)[m-(m-r+1)]}**=(-1)^{mr+m+r+1}**$：`, tex: R`\dd(\beta\wedge*\alpha)=\dd\beta\wedge*\alpha-(-1)^{mr+m+1}\beta\wedge*(*\dd*\alpha)`, why: R`$(m-r+1)(r-1)=mr-m-r^2+2r-1\equiv mr+m+r+1\pmod2$（用 $r^2\equiv r$）；与前面的 $(-1)^r$ 相乘得 $(-1)^{mr+m+1}$。`, uses: ["7.176a"] },
            { claim: R`在 $M$ 上积分，用 Stokes 定理与 $\partial M=\emptyset$：`, tex: R`\int_M\dd\beta\wedge*\alpha-\int_M\beta\wedge*[(-1)^{mr+m+1}*\dd*\alpha]=\int_M\dd(\beta\wedge*\alpha)=\int_{\partial M}\beta\wedge*\alpha=0`, uses: ["T6.1"] },
            { claim: R`由 \eqref{7.181} 与 \eqref{7.184a}，这就是 $(\dd\beta,\alpha)=(\beta,\dd^\dagger\alpha)$。Lorentz 情形：插入的恒等映射多一个负号（\eqref{7.176b}），恰好对应 \eqref{7.184b} 中少一个负号。`, fill: true },
          ]} />
        </Stmt>
        <Eq n="7.186" keyEq title={R`$\dd^\dagger$ 是 $\dd$ 的伴随`} say={R`在无边紧流形上，外微分可以通过"分部积分"挪到另一边，变成余微分。`}>{R`(\dd\beta,\alpha)=(\beta,\dd^\dagger\alpha).`}</Eq>
      </Sub>

      <Sub n="7.9.5" title="The Laplacian, harmonic forms and the Hodge decomposition theorem" zh="Laplace 算子、调和形式与 Hodge 分解定理">
        <Stmt id="D7.7" />
        <Eq n="7.187" keyEq title="Laplace 算子" say={R`Laplace–de Rham 算子：$\dd$ 与 $\dd^\dagger$ 之和的平方，保持形式的次数。`}>{R`\Delta=(\dd+\dd^\dagger)^2=\dd\dd^\dagger+\dd^\dagger\dd.`}</Eq>
        <Tx>{R`作为例子，求 $\Delta:\Omega^0(M)\to\Omega^0(M)$ 的显式形式。设 $f\in\mathcal{F}(M)$。由于 $\dd^\dagger f=0$（没有 $(-1)$ 形式），由 \eqref{7.184a}（$r=1$ 时符号为 $(-1)^{2m+1}=-1$）：`}</Tx>
        <Eq n="7.188" title="Laplace–Beltrami 算子" say={R`作用在函数上，$\Delta$ 就是弯曲空间的 Laplace–Beltrami 算子（带负号）：$-\frac1{\sqrt{|g|}}\partial_\nu(\sqrt{|g|}g^{\nu\mu}\partial_\mu f)$。`}>{R`\begin{aligned}\Delta f&=\dd^\dagger\dd f=-*\dd*(\partial_\mu f\,\dd x^\mu)\\&=-*\dd\left(\frac{\sqrt{|g|}}{(m-1)!}\partial_\mu fg^{\mu\lambda}\varepsilon_{\lambda\nu_2\ldots\nu_m}\dd x^{\nu_2}\wedge\ldots\wedge\dd x^{\nu_m}\right)\\&=-*\frac1{(m-1)!}\partial_\nu[\sqrt{|g|}g^{\lambda\mu}\partial_\mu f]\varepsilon_{\lambda\nu_2\ldots\nu_m}\dd x^\nu\wedge\dd x^{\nu_2}\wedge\ldots\wedge\dd x^{\nu_m}\\&=-*\partial_\nu[\sqrt{|g|}g^{\nu\mu}\partial_\mu f]\,\dd x^1\wedge\ldots\wedge\dd x^m\\&=-\frac1{\sqrt{|g|}}\partial_\nu[\sqrt{|g|}g^{\nu\mu}\partial_\mu f].\end{aligned}`}</Eq>
        <Tx>{R`［第四行：$\varepsilon_{\lambda\nu_2\ldots\nu_m}\dd x^\nu\wedge\dd x^{\nu_2}\wedge\ldots$ 只在 $\nu=\lambda$ 时非零，给出 $(m-1)!\,\delta^\nu_\lambda\,\dd x^1\wedge\ldots\wedge\dd x^m$。最后一行用 $*(\dd x^1\wedge\ldots\wedge\dd x^m)=\sqrt{|g|}\varepsilon^{12\ldots m}=\sqrt{|g|}g^{-1}=1/\sqrt{|g|}$（\eqref{7.171b}，Riemann 情形 $g>0$）。原书把 $g^{-1}$ 写在了第四行，最终结果相同。］在 $(\R^m,\delta)$ 中这就是 $\Delta f=-\sum_\mu\partial_\mu^2f$：本书的 $\Delta$ 是**正**算子，与物理中常用的 $\nabla^2$ 差一个负号。`}</Tx>
        <Exercise n="7.21" title={R`$\R^m$ 中一形式的 Laplace 算子`} level="★★"
          hint={R`先证明（或用）Riemann 流形上 $\dd^\dagger$ 的分量公式 $(\dd^\dagger\omega)_{\nu_2\ldots\nu_r}=-\nabla^\mu\omega_{\mu\nu_2\ldots\nu_r}$；在 $\R^m$ 中 $\nabla=\partial$。对 $r=1$ 它就是 \eqref{7.188} 的中间步骤。`}
          solution={R`在 $(\R^m,\delta)$ 中用 Cartesian 坐标，$g=\delta$，$\sqrt g=1$。

**$\dd^\dagger$ 的分量。**对一形式，由 \eqref{7.188} 的推导，$\dd^\dagger\omega=-\partial_\mu\omega_\mu$。对二形式 $F=\frac12F_{\mu\nu}\dd x^\mu\wedge\dd x^\nu$，同样的计算给出 $(\dd^\dagger F)_\nu=-\partial_\mu F_{\mu\nu}$（例如 $m=3$、$F=F_{12}\dd x^1\wedge\dd x^2$：$*F=F_{12}\dd x^3$，$\dd*F=\partial_1F_{12}\dd x^1\wedge\dd x^3+\partial_2F_{12}\dd x^2\wedge\dd x^3$，$*\dd*F=-\partial_1F_{12}\dd x^2+\partial_2F_{12}\dd x^1$，符号因子 $(-1)^{6+3+1}=1$，所以 $(\dd^\dagger F)_1=\partial_2F_{12}=-\partial_2F_{21}$、$(\dd^\dagger F)_2=-\partial_1F_{12}$ ✓）。

**计算。**$\omega=\omega_\nu\dd x^\nu$：

$$\dd\dd^\dagger\omega=\dd(-\partial_\mu\omega_\mu)=-\partial_\nu\partial_\mu\omega_\mu\,\dd x^\nu,$$

$\dd\omega$ 的分量 $F_{\mu\nu}=\partial_\mu\omega_\nu-\partial_\nu\omega_\mu$，

$$\dd^\dagger\dd\omega=-\partial_\mu(\partial_\mu\omega_\nu-\partial_\nu\omega_\mu)\,\dd x^\nu=(-\partial_\mu\partial_\mu\omega_\nu+\partial_\nu\partial_\mu\omega_\mu)\,\dd x^\nu.$$

相加，$\partial_\nu\partial_\mu\omega_\mu$ 项相消：

$$\Delta\omega=-\sum_{\mu=1}^m\frac{\partial^2\omega_\nu}{\partial x^\mu\partial x^\mu}\dd x^\nu.$$

即在平直空间中 $\Delta$ 对每个分量就是 $-\nabla^2$（这是 $\R^3$ 中矢量恒等式 $\nabla(\nabla\cdot\boldsymbol A)-\nabla\times\nabla\times\boldsymbol A=\nabla^2\boldsymbol A$ 的形式写法）。弯曲空间中则多出曲率项（Weitzenböck 公式 $\Delta\omega_\nu=-\nabla^\mu\nabla_\mu\omega_\nu+\sym{Ric}{\mathit{Ric}}_\nu{}^\mu\omega_\mu$）。`}>
          {R`取 Euclid 空间 $(\R^m,\delta)$ 中的一形式 $\omega=\omega_\mu\dd x^\mu$。证明

$$\Delta\omega=-\sum_{\mu=1}^m\frac{\partial^2\omega_\nu}{\partial x^\mu\partial x^\mu}\dd x^\nu.$$`}
        </Exercise>
        <Box kind="example" n="7.16" title="Maxwell 方程的另一半">
          <Tx>{R`例 5.11 中已证明一半 Maxwell 方程化为恒等式 $\dd F=\dd^2A=0$，其中 $A=A_\mu\dd x^\mu$ 是矢势一形式，$F=\dd A$ 是电磁二形式。设 $\rho$ 是电荷密度、$\boldsymbol j$ 是电流密度，构成电流一形式 $j=\eta_{\mu\nu}j^\nu\dd x^\mu=-\rho\,\dd t+\boldsymbol j\cdot\dd\boldsymbol x$。则其余的 Maxwell 方程成为`}</Tx>
          <Eq n="7.189a" title="有源 Maxwell 方程" say={R`有源的一半 Maxwell 方程：场强的余微分（散度）等于电流。与 $\dd F=0$ 合起来就是全部 Maxwell 方程。`}>{R`\dd^\dagger F=\dd^\dagger\dd A=j.`}</Eq>
          <Tx>{R`分量表达式为`}</Tx>
          <Eq n="7.189b" say={R`Gauss 定律与 Ampère–Maxwell 定律。`}>{R`\nabla\cdot\boldsymbol E=\rho\qquad\nabla\times\boldsymbol B-\frac{\partial\boldsymbol E}{\partial t}=\boldsymbol j.`}</Eq>
          <Tx>{R`［核对：$m=4$、$r=2$ 的 Lorentz 情形，\eqref{7.184b} 的符号为 $(-1)^{8+4}=+1$，$\dd^\dagger=*\dd*$。用 \eqref{7.172}（$\eta=\mathrm{diag}(-1,1,1,1)$、$\varepsilon_{0123}=1$）得 $*(\dd x^i\wedge\dd x^0)=\dd x^j\wedge\dd x^k$、$*(\dd x^j\wedge\dd x^k)=-\dd x^i\wedge\dd x^0$（$(ijk)$ 为偶置换）。由例 5.11 的 $F=E_i\dd x^i\wedge\dd x^0+B_i\dd x^j\wedge\dd x^k$，$*F=E_i\dd x^j\wedge\dd x^k-B_i\dd x^i\wedge\dd x^0$，

$$\dd*F=(\nabla\cdot\boldsymbol E)\dd x^1\wedge\dd x^2\wedge\dd x^3+(\partial_t\boldsymbol E-\nabla\times\boldsymbol B)_i\,\dd x^j\wedge\dd x^k\wedge\dd x^0,$$

再用 $*(\dd x^1\wedge\dd x^2\wedge\dd x^3)=-\dd x^0$、$*(\dd x^j\wedge\dd x^k\wedge\dd x^0)=-\dd x^i$，得 $\dd^\dagger F=-(\nabla\cdot\boldsymbol E)\dd t+(\nabla\times\boldsymbol B-\partial_t\boldsymbol E)\cdot\dd\boldsymbol x$。令它等于 $j=-\rho\,\dd t+\boldsymbol j\cdot\dd\boldsymbol x$ 即得 \eqref{7.189b}。（习题 5.2 用了另一种 $*$ 的符号约定，所以那里写成 $\dd*F=-*J$。）］

矢势 $A$ 有大量自由度（规范自由度 $A\to A+\dd\chi$），总可以选 $A$ 满足 **Lorenz 条件** $\dd^\dagger A=0$。于是 \eqref{7.189a} 成为 $(\dd\dd^\dagger+\dd^\dagger\dd)A=\Delta A=j$：每个分量满足有源波动方程。`}</Tx>
        </Box>
        <Tx>{R`设 $(M,g)$ 是紧致 Riemann 流形。Laplace 算子 $\Delta$ 在下述意义下是 $M$ 上的正算子：`}</Tx>
        <Eq n="7.190" title="Δ 非负" say={R`Laplace 算子的期望值是两个平方之和：它是非负的自伴算子，零模必须同时满足 $\dd\omega=0$ 与 $\dd^\dagger\omega=0$。`}>{R`(\omega,\Delta\omega)=(\omega,(\dd^\dagger\dd+\dd\dd^\dagger)\omega)=(\dd\omega,\dd\omega)+(\dd^\dagger\omega,\dd^\dagger\omega)\ge0`}</Eq>
        <Tx>{R`这里用了 \eqref{7.186} 与 \eqref{7.183}。若 $\Delta\omega=0$，就称 $r$ 形式 $\omega$ 为**调和的**（harmonic）；若 $\dd\omega=0$（$\dd^\dagger\omega=0$），就称它为**闭的**（**余闭的**，coclosed）。下面的定理是 \eqref{7.190} 的直接推论。`}</Tx>
        <Stmt id="T7.6">
          <Proof steps={[
            { claim: R`（⇐）若 $\dd\omega=0$ 且 $\dd^\dagger\omega=0$，则 $\Delta\omega=\dd\dd^\dagger\omega+\dd^\dagger\dd\omega=0$。`, fill: true },
            { claim: R`（⇒）若 $\Delta\omega=0$，由 \eqref{7.190}，$0=(\omega,\Delta\omega)=(\dd\omega,\dd\omega)+(\dd^\dagger\omega,\dd^\dagger\omega)$。两项都非负（\eqref{7.183}），所以都为零；再由正定性，$\dd\omega=0$、$\dd^\dagger\omega=0$。`, uses: ["7.190", "7.183"], fill: true },
          ]} />
        </Stmt>
        <Tx>{R`若 $r$ 形式 $\omega$ 可以**整体地**写成`}</Tx>
        <Eq n="7.191" say={R`余恰当形式：某个 $(r+1)$ 形式的余微分。`}>{R`\omega_r=\dd^\dagger\beta_{r+1}`}</Eq>
        <Tx>{R`其中 $\beta_{r+1}\in\Omega^{r+1}(M)$，就称它是**余恰当的**（coexact）［对照：若 $\omega_r=\dd\alpha_{r-1}$，$\alpha_{r-1}\in\Omega^{r-1}(M)$，形式 $\omega_r\in\Omega^r(M)$ 是恰当的］。$M$ 上调和 $r$ 形式的集合记作 $\mathrm{Harm}^r(M)$，恰当 $r$ 形式（余恰当 $r$ 形式）的集合记作 $\dd\Omega^{r-1}(M)$（$\dd^\dagger\Omega^{r+1}(M)$）。［注：恰当 $r$ 形式的集合此前记作 $B^r(M)$。］`}</Tx>
        <Stmt id="T7.7">
          <Proof steps={[
            { claim: R`三个子空间两两正交（习题 7.22 前半）。`, uses: ["7.193"] },
            { claim: R`与三者都正交的形式只有零（习题 7.22 后半），所以三者的直和"填满"——但在无穷维空间中这还需要分析学：`, uses: ["7.194"] },
            { claim: R`设 $P:\Omega^r(M)\to\mathrm{Harm}^r(M)$ 为到调和形式空间的投影（$\mathrm{Harm}^r$ 有限维，投影有定义）。$\omega_r-P\omega_r$ 与 $\mathrm{Harm}^r(M)$ 正交，由（引用的）椭圆理论，它可写成 $\Delta\psi_r$：`, uses: ["X:Hodge-analysis"] },
            { claim: R`于是 $\omega_r=\dd(\dd^\dagger\psi_r)+\dd^\dagger(\dd\psi_r)+P\omega_r$，即 \eqref{7.195}，实现了分解；唯一性来自正交性。`, uses: ["7.195"] },
          ]} />
        </Stmt>
        <Eq n="7.192a" title="Hodge 分解" say={R`任意形式唯一地分成三块：恰当部分、余恰当部分与调和部分，三者互相正交。`}>{R`\Omega^r(M)=\dd\Omega^{r-1}(M)\oplus\dd^\dagger\Omega^{r+1}(M)\oplus\mathrm{Harm}^r(M).`}</Eq>
        <Tx>{R`［即任何 $r$ 形式 $\omega_r$ 都可以整体地写成`}</Tx>
        <Eq n="7.192b" say={R`Hodge 分解的显式形式（类比 $\R^3$ 向量场的 Helmholtz 分解：无旋 + 无源 + 调和）。`}>{R`\omega_r=\dd\alpha_{r-1}+\dd^\dagger\beta_{r+1}+\gamma_r`}</Eq>
        <Tx>{R`其中 $\alpha_{r-1}\in\Omega^{r-1}(M)$，$\beta_{r+1}\in\Omega^{r+1}(M)$，$\gamma_r\in\mathrm{Harm}^r(M)$。］$r=0$ 时约定 $\Omega^{-1}(M)=\{0\}$。这个定理的证明需要下面两个简单习题的结果。`}</Tx>
        <Exercise n="7.22" title="三个子空间正交" level="★★"
          hint={R`反复用 \eqref{7.186} 把 $\dd$ 挪到另一边，以及 \sref{T7.6}（调和形式闭且余闭）。后半：分别取 $\alpha=\dd^\dagger\omega$、$\beta=\dd\omega$、$\gamma=\omega$。`}
          solution={R`**正交性。**
$(\dd\alpha,\dd^\dagger\beta)=(\dd\dd\alpha,\beta)=0$（\eqref{7.186} 的转置形式 $(\dd^\dagger\beta,\eta)=(\beta,\dd\eta)$ 加 $\dd^2=0$）；
$(\dd\alpha,\gamma)=(\alpha,\dd^\dagger\gamma)=0$（$\gamma$ 调和 ⇒ 余闭）；
$(\dd^\dagger\beta,\gamma)=(\beta,\dd\gamma)=0$（$\gamma$ 调和 ⇒ 闭）。

**正交补为零。**设 $\omega_r$ 与所有恰当、余恰当、调和形式正交。
(i) 对任意 $\alpha$，$0=(\dd\alpha,\omega)=(\alpha,\dd^\dagger\omega)$。取 $\alpha=\dd^\dagger\omega$，由正定性 \eqref{7.183}，$\dd^\dagger\omega=0$。
(ii) 对任意 $\beta$，$0=(\dd^\dagger\beta,\omega)=(\beta,\dd\omega)$。取 $\beta=\dd\omega$，得 $\dd\omega=0$。
(iii) 于是 $\omega$ 闭且余闭，由 \sref{T7.6} 是调和的；它又与所有调和形式正交，取 $\gamma=\omega$ 得 $(\omega,\omega)=0$，所以 $\omega_r=0$。`}>
          {R`设 $(M,g)$ 如\sref{T7.7} 所设。证明`}
        </Exercise>
        <Eq n="7.193" say={R`恰当、余恰当、调和三类形式两两正交。`}>{R`(\dd\alpha_{r-1},\dd^\dagger\beta_{r+1})=(\dd\alpha_{r-1},\gamma_r)=(\dd^\dagger\beta_{r+1},\gamma_r)=0.`}</Eq>
        <Tx>{R`再证明：若 $\omega_r\in\Omega^r(M)$ 满足`}</Tx>
        <Eq n="7.194" say={R`若一个形式与这三类全都正交……`}>{R`(\dd\alpha_{r-1},\omega_r)=(\dd^\dagger\beta_{r+1},\omega_r)=(\gamma_r,\omega_r)=0`}</Eq>
        <Tx>{R`对所有 $\dd\alpha_{r-1}\in\dd\Omega^{r-1}(M)$、$\dd^\dagger\beta_{r+1}\in\dd^\dagger\Omega^{r+1}(M)$ 与 $\gamma_r\in\mathrm{Harm}^r(M)$ 成立，则 $\omega_r=0$。`}</Tx>
        <Exercise n="7.23" title={R`$\Delta$ 的像与调和形式正交`} level="★"
          hint={R`$\Delta$ 是自伴的：$(\Delta\psi,\gamma)=(\psi,\Delta\gamma)$。`}
          solution={R`由 \eqref{7.186} 两次，$(\dd\dd^\dagger\psi,\gamma)=(\dd^\dagger\psi,\dd^\dagger\gamma)=(\psi,\dd\dd^\dagger\gamma)$，同理 $(\dd^\dagger\dd\psi,\gamma)=(\psi,\dd^\dagger\dd\gamma)$，所以 $\Delta$ 自伴：$(\Delta\psi,\gamma)=(\psi,\Delta\gamma)$。若 $\gamma$ 调和，$(\omega_r,\gamma_r)=(\Delta\psi_r,\gamma_r)=(\psi_r,\Delta\gamma_r)=0$。

（逆命题是说 $\Delta$ 在 $\mathrm{Harm}^r$ 的正交补上可逆。它对有限维矩阵是显然的线性代数——自伴矩阵的像是核的正交补；在无穷维情形需要 $\Delta$ 是椭圆算子、紧流形上其谱离散等分析事实，原书不证，本站登记为外部引用\sref{X:Hodge-analysis}。）`}>
          {R`设 $\omega_r\in\Omega^r(M)$ 可写成 $\omega_r=\Delta\psi_r$，$\psi_r\in\Omega^r(M)$。证明对任意 $\gamma_r\in\mathrm{Harm}^r(M)$ 有 $(\omega_r,\gamma_r)=0$。逆命题"若 $\omega_r$ 与所有调和 $r$ 形式正交，则 $\omega_r$ 可写成 $\Delta\psi_r$"的证明高度技术性，我们只声明：在这里算子 $\Delta^{-1}$（Green 函数）有定义，$\psi_r=\Delta^{-1}\omega_r$。`}
        </Exercise>
        <Tx>{R`设 $P:\Omega^r(M)\to\mathrm{Harm}^r(M)$ 是到调和 $r$ 形式空间的投影算子。取 $\omega_r\in\Omega^r(M)$。由于 $\omega_r-P\omega_r$ 与 $\mathrm{Harm}^r(M)$ 正交，可以写成 $\Delta\psi_r$（$\psi_r\in\Omega^r(M)$）。于是`}</Tx>
        <Eq n="7.195" say={R`Hodge 分解的构造：$\omega=\dd(\dd^\dagger\psi)+\dd^\dagger(\dd\psi)+P\omega$，其中 $\psi=\Delta^{-1}(\omega-P\omega)$。`}>{R`\omega_r=\dd(\dd^\dagger\psi_r)+\dd^\dagger(\dd\psi_r)+P\omega_r.`}</Eq>
        <Tx>{R`这就实现了\sref{T7.7} 的分解。`}</Tx>
      </Sub>

      <Sub n="7.9.6" title="Harmonic forms and de Rham cohomology groups" zh="调和形式与 de Rham 上同调群">
        <Tx>{R`我们证明 de Rham 上同调群的每个元素都有唯一的调和代表元。设 $[\omega_r]\in H^r(M)$。先证明 $\omega_r\in\mathrm{Harm}^r(M)\oplus\dd\Omega^{r-1}(M)$。由 \eqref{7.192b}，$\omega_r$ 分解为 $\omega_r=\gamma_r+\dd\alpha_{r-1}+\dd^\dagger\beta_{r+1}$。由于 $\dd\omega_r=0$，

$$0=(\dd\omega_r,\beta_{r+1})=(\dd\dd^\dagger\beta_{r+1},\beta_{r+1})=(\dd^\dagger\beta_{r+1},\dd^\dagger\beta_{r+1}).$$

（$\dd\gamma=0$、$\dd^2\alpha=0$。）这当且仅当 $\dd^\dagger\beta_{r+1}=0$ 时成立。于是 $\omega_r=\gamma_r+\dd\alpha_{r-1}$。由 \eqref{7.195}，`}</Tx>
        <Eq n="7.196a" say={R`闭形式 = 调和代表元 + 恰当形式。`}>{R`\omega_r=P\omega_r+\dd(\dd^\dagger\psi)=P\omega_r+\dd\dd^\dagger\Delta^{-1}\omega_r.`}</Eq>
        <Tx>{R`$\gamma_r\equiv P\omega_r$ 就是 $[\omega_r]$ 的调和代表元。设 $\widetilde\omega_r$ 是 $[\omega_r]$ 的另一个代表元：$\widetilde\omega_r-\omega_r=\dd\eta_{r-1}$，$\eta_{r-1}\in\Omega^{r-1}(M)$。与 \eqref{7.196a} 相应，`}</Tx>
        <Eq n="7.196b" say={R`换一个代表元，调和部分不变：恰当形式在调和形式上的投影为零。`}>{R`\widetilde\omega_r=P\widetilde\omega_r+\dd(\dd^\dagger\Delta^{-1}\widetilde\omega_r)=P\omega_r+\dd(\ldots)`}</Eq>
        <Tx>{R`其中最后一个等号成立，是因为 $\dd\eta_{r-1}$ 与 $\mathrm{Harm}^r(M)$ 正交，其投影为零。\eqref{7.196a} 与 \eqref{7.196b} 说明 $[\omega_r]$ 有唯一的调和代表元 $P\omega_r$。

这个证明给出映射 $H^r(M)\to\mathrm{Harm}^r(M)$，$[\omega]\mapsto P\omega$（单射：若 $P\omega=0$，则 $\omega=\dd(\ldots)$ 恰当，$[\omega]=0$）。反方向：对任何 $\gamma_r\in\mathrm{Harm}^r(M)$，$\dd\gamma_r=0$，所以 $Z^r(M)\supset\mathrm{Harm}^r(M)$。又由 \eqref{7.192a}，$B^r(M)=\dd\Omega^{r-1}(M)$ 与 $\mathrm{Harm}^r(M)$ 正交，$B^r(M)\cap\mathrm{Harm}^r(M)=\{0\}$。所以每个非零调和形式都是 $H^r(M)$ 的非平凡元素，且 $P\gamma=\gamma$（满射）。我们证明了：`}</Tx>
        <Box kind="warning" title={R`勘误：$B^r\cap\mathrm{Harm}^r=\{0\}$（p.316）`}>{R`原书写 "$B^r(M)\cap\mathrm{Harm}^r(M)=\emptyset$"。两个向量子空间的交至少含零向量，应为 $\{0\}$（零形式既恰当又调和）。正文已改正。`}</Box>
        <Stmt id="T7.8" />
        <Eq n="7.197" keyEq title="Hodge 定理" say={R`每个 de Rham 上同调类恰有一个调和代表元：拓扑问题化为求解 Laplace 方程。`}>{R`H^r(M)\cong\mathrm{Harm}^r(M).`}</Eq>
        <Tx>{R`同构由把 $[\omega]\in H^r(M)$ 对应于 $P\omega\in\mathrm{Harm}^r(M)$ 给出。特别地，`}</Tx>
        <Eq n="7.198" say={R`调和形式的个数等于 Betti 数——与度规无关。`}>{R`\dim\mathrm{Harm}^r(M)=\dim H^r(M)=b^r`}</Eq>
        <Tx>{R`$b^r$ 是 Betti 数。Euler 示性数为`}</Tx>
        <Eq n="7.199" title="Euler 示性数 = 调和形式的交错和" say={R`左边是拓扑量（三角剖分的顶点−边+面……），右边是分析量（Laplace 算子零模数的交错和）：指标定理的原型。`}>{R`\chi(M)=\sum(-1)^rb^r=\sum(-1)^r\dim\mathrm{Harm}^r(M)`}</Eq>
        <Tx>{R`见\sref{T3.7}。左边是拓扑量，右边则是由 Laplace 算子 $\Delta$ 的本征值问题给出的分析量。例如环面 $T^2=\R^2/\Z^2$（平坦度规）：调和形式就是常系数形式 $1$；$\dd x,\dd y$；$\dd x\wedge\dd y$，所以 $b^0=1,b^1=2,b^2=1$，$\chi=0$；$S^2$ 上只有常数与体积形式是调和的，$\chi=2$。`}</Tx>
      </Sub>
    </Sec>);
}
