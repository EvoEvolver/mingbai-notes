// §8.6 调和形式与 ∂̄ 上同调群 —— 式 (8.102)–(8.120)，命题 8.3，定理 8.8–8.11；交互图 4（Hodge 菱形）
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Derivation, C } from "@kit";
import { HodgeLab } from "./_ch08_demos.jsx";

const R = String.raw;

export function Sec86() {
  return (
    <Sec n="8.6" title="Harmonic forms and Dolbeault (dbar) cohomology groups" zh={R`调和形式与 $\bar\partial$ 上同调群`}
      gist={R`$\bar\partial$ 上同调 $H^{r,s}_{\bar\partial}(M)$ → 用 Hodge 星 $\bar*$ 定义 $(r,s)$ 形式的内积，伴随算子 $\partial^\dagger=-*\bar\partial*$、$\bar\partial^\dagger=-*\partial*$（\sref{P8.3}）→ Laplace 算子 $\Delta_{\bar\partial}=\bar\partial\bar\partial^\dagger+\bar\partial^\dagger\bar\partial$，复 Hodge 定理：每个 $\bar\partial$ 上同调类有唯一的调和代表（\sref{T8.8}）→ Kähler 流形上 $\Delta=2\Delta_\partial=2\Delta_{\bar\partial}$（\sref{T8.9}）⇒ Hodge 菱形对称 $b^{r,s}=b^{s,r}=b^{m-r,m-s}$（\sref{T8.10}），$b^p=\sum_{r+s=p}b^{r,s}$、奇数 Betti 数为偶、$b^{2p}\ge1$（\sref{T8.11}）。`}
      why={R`这是本章的高潮：Kähler 条件把复结构（$\bar\partial$）与拓扑（$\dd$）连在一起。Betti 数是拓扑不变量，Hodge 数依赖复结构；在 Kähler 流形上前者被后者精确分解，从而给出强有力的拓扑障碍——例如 $S^1\times S^3$ 有复结构却不可能是 Kähler 的，因为 $b^1=1$ 是奇数。`}
      gives={["8.102", "8.104", "8.106", "8.108", "8.111b", "8.113b", "8.114", "8.115", "8.116", "8.117", "8.118", "8.119", "8.120"]}>
      <p className="muted">本节概念：<C id="dolbeault" /> · <C id="hodge_numbers" /></p>
      <Tx>{R`第 $(r,s)$ 个 **$\bar\partial$ 上同调群**定义为`}</Tx>
      <Eq n="8.102" say={R`$\bar\partial$ 闭的 $(r,s)$ 形式模去 $\bar\partial$ 恰当的形式（同 \eqref{8.46}）。`}>{R`H^{r,s}_{\bar\partial}(M)\equiv Z^{r,s}_{\bar\partial}(M)/B^{r,s}_{\bar\partial}(M).`}</Eq>
      <Tx>{R`元素 $[\omega]\in H^{r,s}_{\bar\partial}(M)$ 是双次为 $(r,s)$、彼此相差一个 $\bar\partial$ 恰当形式的 $\bar\partial$ 闭形式的等价类：`}</Tx>
      <Eq n="8.103" say={R`一个上同调类 = 所有与 $\omega$ 相差 $\bar\partial\psi$ 的 $\bar\partial$ 闭形式。`}>{R`[\omega]=\{\eta\in\Omega^{r,s}(M)\mid\bar\partial\eta=0,\ \omega-\eta=\bar\partial\psi,\ \psi\in\Omega^{r,s-1}(M)\}.`}</Eq>
      <Tx>{R`显然 $H^{r,s}_{\bar\partial}(M)$ 是复向量空间。与 de Rham 上同调群类似，$\C^m$ 的 $\bar\partial$ 上同调群是平凡的（$s\ge1$ 时），即所有 $\bar\partial$ 闭的 $(r,s)$ 形式都是 $\bar\partial$ 恰当的（Dolbeault–Grothendieck 引理，$\bar\partial$ 版本的 Poincaré 引理）。$\bar\partial$ 上同调群度量复流形 $M$ 的拓扑非平凡性。

**一个具体的 $\bar\partial$ 原像。**在 $\C$ 上，$(0,1)$ 形式 $\omega=f\,\dd\bar z$ 总是 $\bar\partial$ 闭的（没有 $(0,2)$ 形式）。要解 $\bar\partial u=\omega$ 即 $\partial u/\partial\bar z=f$：例如 $f=1$ 时 $u=\bar z$；$f=z$ 时 $u=z\bar z$；一般地，对紧支集的 $f$ 有 Cauchy 积分公式 $u(z)=\frac1{2\pi\mathrm{i}}\int\frac{f(w)}{w-z}\dd w\wedge\dd\bar w$。交互图 3 可以验证 $\partial(z\bar z)/\partial\bar z=z$。`}</Tx>

      <Sub n="8.6.1" title="The adjoint operators" zh={R`伴随算子 $\partial^\dagger$ 与 $\bar\partial^\dagger$`}>
        <Tx>{R`设 $M$ 是 Hermite 流形，$\dim_\C M=m$。定义 $\alpha,\beta\in\Omega^{r,s}(M)$（$0\le r,s\le m$）之间的内积`}</Tx>
        <Eq n="8.104" title={R`$(r,s)$ 形式的内积`} say={R`把第二个形式取共轭的 Hodge 对偶，与第一个楔起来积分——这是 $(r,s)$ 形式空间上的正定 Hermite 内积。`}>{R`(\alpha,\beta)\equiv\int_M\alpha\wedge\bar*\beta`}</Eq>
        <Tx>{R`其中 $\bar*:\Omega^{r,s}(M)\to\Omega^{m-r,m-s}(M)$ 是 **Hodge $*$**，定义为`}</Tx>
        <Eq n="8.105" say={R`共轭 Hodge 星：先作 Hodge 对偶再取共轭，等价于先取共轭再作 Hodge 对偶（$*$ 是实算子）。`}>{R`\bar*\beta\equiv\nosym{\overline{*\beta}}=*\overline\beta`}</Eq>
        <Tx>{R`其中 $*\beta$ 按 \eqref{7.173} 计算，并延拓到 $\Omega^{r+s}(M)^\C$ 上（$\C$ 线性）。［**注：**$*$ 把 $(r,s)$ 形式映为 $(m-s,m-r)$ 形式，因为它对 $\Omega^{r,s}(M)$ 的基的作用（相差无关紧要的因子）为

$$*\,\dd z^{\mu_1}\wedge\ldots\wedge\dd z^{\mu_r}\wedge\dd\bar z^{\nu_1}\wedge\ldots\wedge\dd\bar z^{\nu_s}\sim\varepsilon^{\mu_1\ldots\mu_r}{}_{\bar\mu_{r+1}\ldots\bar\mu_m}\,\varepsilon^{\bar\nu_1\ldots\bar\nu_s}{}_{\nu_{s+1}\ldots\nu_m}\,\dd\bar z^{\mu_{r+1}}\wedge\ldots\wedge\dd\bar z^{\mu_m}\wedge\dd z^{\nu_{s+1}}\wedge\ldots\wedge\dd z^{\nu_m}.$$

注意上面的 $\varepsilon$ 符号是 Hermite 流形中仅有的非零分量（Hermite 度规只把全纯指标降成反全纯指标，反之亦然）。由此 $\bar*:\Omega^{r,s}(M)\to\Omega^{m-r,m-s}(M)$。］于是 $\alpha\wedge\bar*\beta$ 是 $(m,m)$ 形式，可以积分；$(\alpha,\alpha)=\int\alpha\wedge*\overline\alpha\ge0$，等号仅当 $\alpha=0$（实形式时这就是 \eqref{7.180} 的正定性；复形式时把实部、虚部分开，交叉项相消）。

用下式定义 $\partial$ 与 $\bar\partial$ 的**伴随算子** $\partial^\dagger$ 与 $\bar\partial^\dagger$：`}</Tx>
        <Eq n="8.106" title="伴随算子" say={R`$\partial^\dagger$、$\bar\partial^\dagger$ 是 $\partial$、$\bar\partial$ 关于内积 \eqref{8.104} 的伴随：把算子从内积的一边挪到另一边。`}>{R`(\alpha,\partial\beta)=(\partial^\dagger\alpha,\beta)\qquad(\alpha,\bar\partial\beta)=(\bar\partial^\dagger\alpha,\beta).`}</Eq>
        <Tx>{R`算子 $\partial^\dagger$ 与 $\bar\partial^\dagger$ 改变双次：$\partial^\dagger:\Omega^{r,s}(M)\to\Omega^{r-1,s}(M)$，$\bar\partial^\dagger:\Omega^{r,s}(M)\to\Omega^{r,s-1}(M)$。显然 $\dd^\dagger=\partial^\dagger+\bar\partial^\dagger$。注意到复流形作为微分流形是偶数维的，有（见 \eqref{7.184a}）`}</Tx>
        <Eq n="8.107" say={R`偶数维 Riemann 流形上，余微分 = $-*\dd*$。`}>{R`\dd^\dagger=-*\,\dd\,*.`}</Eq>
        <Stmt id="P8.3">
          <Proof steps={[
            { claim: R`设 $\omega\in\Omega^{r-1,s}(M)$，$\psi\in\Omega^{r,s}(M)$（$M$ 紧、无边）。注意 $\omega\wedge\bar*\psi\in\Omega^{m-1,m}(M)$，所以 $\bar\partial(\omega\wedge\bar*\psi)=0$（不存在 $(m-1,m+1)$ 形式），$\dd=\partial$。由 \eqref{8.42c}：`, tex: R`\begin{aligned}\dd(\omega\wedge\bar*\psi)=\partial(\omega\wedge\bar*\psi)&=\partial\omega\wedge\bar*\psi+(-1)^{r+s-1}\omega\wedge\partial(\bar*\psi)\\&=\partial\omega\wedge\bar*\psi+(-1)^{r+s-1}\omega\wedge(-1)^{r+s+1}\bar*\bar*\partial(\bar*\psi)\\&=\partial\omega\wedge\bar*\psi+\omega\wedge\bar*\bar*\partial\bar*\psi\end{aligned}`, uses: ["8.109", "8.42c", "T7.4"], why: R`$\partial\bar*\psi\in\Omega^{2m-r-s+1}(M)$；由 \eqref{7.176a}，在 $n=2m$ 维流形上对 $k$ 形式 $**=(-1)^{k(2m-k)}=(-1)^k$，取 $k=2m-r-s+1$ 得 $(-1)^{r+s+1}$；又 $\bar*\bar*\beta=**\beta$。两个符号之积为 $+1$。` },
            { claim: R`在紧、无边的 $M$ 上积分，由 Stokes 定理左边为零：`, tex: R`0=(\partial\omega,\psi)+(\omega,\bar*\partial\bar*\psi)`, uses: ["8.104"] },
            { claim: R`第二项中`, tex: R`(\omega,\bar*\partial\bar*\psi)=(\omega,*\nosym{\overline{\partial*\overline\psi}})=(\omega,*\bar\partial*\psi)`, why: R`$\bar*\eta=*\overline\eta$；$\nosym{\overline{\partial\alpha}}=\bar\partial\overline\alpha$（\eqref{8.42b}）；$\nosym{\overline{*\overline\psi}}=*\psi$（$*$ 是实算子）。` },
            { claim: R`最后 $0=(\partial\omega,\psi)+(\omega,*\bar\partial*\psi)$，即 $(\psi,\partial\omega)=(-*\bar\partial*\psi,\omega)$ 对一切 $\omega$ 成立，所以 $\partial^\dagger=-*\bar\partial*$。另一式 $\bar\partial^\dagger=-*\partial*$ 同理（或取复共轭）。` },
          ]} />
        </Stmt>
        <Eq n="8.108" title={R`伴随算子的 Hodge 星表达`} say={R`$\partial$ 的伴随不是"$*\partial*$"而是"$*\bar\partial*$"：因为 $*$ 把全纯与反全纯次数对调。`}>{R`\partial^\dagger=-*\,\bar\partial\,*,\qquad\bar\partial^\dagger=-*\,\partial\,*.`}</Eq>
        <Eq n="8.109" say={R`证明的关键一步：$\omega\wedge\bar*\psi$ 的外微分等于两个内积的被积式之和，积分后由 Stokes 定理为零。`}>{R`\begin{aligned}\dd(\omega\wedge\bar*\psi)=\partial(\omega\wedge\bar*\psi)&=\partial\omega\wedge\bar*\psi+(-1)^{r+s-1}\omega\wedge\partial(\bar*\psi)\\&=\partial\omega\wedge\bar*\psi+(-1)^{r+s-1}\omega\wedge(-1)^{r+s+1}\bar*\bar*\partial(\bar*\psi)\\&=\partial\omega\wedge\bar*\psi+\omega\wedge\bar*\bar*\partial\bar*\psi\end{aligned}`}</Eq>
        <Tx>{R`作为 \sref{P8.3} 的推论，`}</Tx>
        <Eq n="8.110" say={R`伴随算子的平方也为零：$(\partial^\dagger)^2=*\bar\partial**\bar\partial*=\pm*\bar\partial^2*=0$。`}>{R`(\partial^\dagger)^2=(\bar\partial^\dagger)^2=0.`}</Eq>
      </Sub>

      <Sub n="8.6.2" title="Laplacians and the Hodge theorem" zh="Laplace 算子与 Hodge 定理">
        <Tx>{R`除了通常的 Laplace 算子 $\Delta=(\dd\dd^\dagger+\dd^\dagger\dd)$（\sref{D7.7}），在 Hermite 流形上定义另外两个 Laplace 算子 $\Delta_\partial$ 与 $\Delta_{\bar\partial}$：`}</Tx>
        <Eq n="8.111a" say={R`$\partial$ 版本的 Laplace 算子。`}>{R`\Delta_\partial\equiv(\partial+\partial^\dagger)^2=\partial\partial^\dagger+\partial^\dagger\partial`}</Eq>
        <Eq n="8.111b" title={R`$\bar\partial$ Laplace 算子`} say={R`$\bar\partial$ 版本的 Laplace 算子：保持双次 $(r,s)$ 不变的非负自伴算子。`}>{R`\Delta_{\bar\partial}\equiv(\bar\partial+\bar\partial^\dagger)^2=\bar\partial\bar\partial^\dagger+\bar\partial^\dagger\bar\partial.`}</Eq>
        <Tx>{R`满足 $\Delta_\partial\omega=0$（$\Delta_{\bar\partial}\omega=0$）的 $(r,s)$ 形式称为 **$\partial$ 调和**（**$\bar\partial$ 调和**）的。若 $\Delta_\partial\omega=0$（$\Delta_{\bar\partial}\omega=0$），则 $\omega$ 满足 $\partial\omega=\partial^\dagger\omega=0$（$\bar\partial\omega=\bar\partial^\dagger\omega=0$）：因为 $(\omega,\Delta_{\bar\partial}\omega)=(\bar\partial\omega,\bar\partial\omega)+(\bar\partial^\dagger\omega,\bar\partial^\dagger\omega)$，两项都非负（与 \sref{T7.6} 同理）。

我们有复版本的 Hodge 分解。设 $\mathrm{Harm}^{r,s}_{\bar\partial}(M)$ 是 $\bar\partial$ 调和 $(r,s)$ 形式的集合：`}</Tx>
        <Eq n="8.112" say={R`$\bar\partial$ 调和的 $(r,s)$ 形式的空间。`}>{R`\mathrm{Harm}^{r,s}_{\bar\partial}(M)\equiv\{\omega\in\Omega^{r,s}(M)\mid\Delta_{\bar\partial}\omega=0\}.`}</Eq>
        <Stmt id="T8.8">
          <Proof title={R`推论：$H^{r,s}_{\bar\partial}(M)\cong\mathrm{Harm}^{r,s}_{\bar\partial}(M)$（分解本身的证明见 Schwartz (1986) 第 22 讲）`} steps={[
            { claim: R`若 $\omega$ 是 $\bar\partial$ 闭的，由 \eqref{8.113b} 与 $\bar\partial^2=0$、$\bar\partial\gamma=0$，有 $\bar\partial\omega=\bar\partial\bar\partial^\dagger\beta=0$。`, uses: ["8.113b", "8.42a"] },
            { claim: R`于是 $0=\langle\beta,\bar\partial\bar\partial^\dagger\beta\rangle=\langle\bar\partial^\dagger\beta,\bar\partial^\dagger\beta\rangle\ge0$，推出 $\bar\partial^\dagger\beta=0$。所以任何 $\bar\partial$ 闭的 $(r,s)$ 形式都写成 $\omega=\gamma+\bar\partial\alpha$，$\alpha\in\Omega^{r,s-1}(M)$：每个类都有调和代表。`, uses: ["8.106"] },
            { claim: R`又 $\mathrm{Harm}^{r,s}_{\bar\partial}(M)\subset Z^{r,s}_{\bar\partial}(M)$，因为对 $\gamma\in\mathrm{Harm}^{r,s}_{\bar\partial}(M)$ 有 $\bar\partial\gamma=0$。` },
            { claim: R`而且 $\mathrm{Harm}^{r,s}_{\bar\partial}(M)\cap B^{r,s}_{\bar\partial}(M)=\{0\}$，因为 $B^{r,s}_{\bar\partial}(M)=\bar\partial\Omega^{r,s-1}(M)$ 与 $\mathrm{Harm}^{r,s}_{\bar\partial}(M)$ 正交：调和代表唯一。（原书写作 $=\emptyset$，应为只含零元。）`, fill: true },
            { claim: R`于是 $\mathrm{Harm}^{r,s}_{\bar\partial}(M)\cong H^{r,s}_{\bar\partial}(M)$。若 $P:\Omega^{r,s}(M)\to\mathrm{Harm}^{r,s}_{\bar\partial}(M)$ 表示到调和形式的投影，则 $[\omega]\in H^{r,s}_{\bar\partial}(M)$ 有唯一的调和代表 $P\omega\in\mathrm{Harm}^{r,s}_{\bar\partial}(M)$。` },
          ]} />
        </Stmt>
        <Eq n="8.113a" keyEq title="复 Hodge 分解" say={R`$(r,s)$ 形式的空间正交分解为三块：$\bar\partial$ 的像、$\bar\partial^\dagger$ 的像、调和形式。`}>{R`\Omega^{r,s}(M)=\bar\partial\,\Omega^{r,s-1}(M)\oplus\bar\partial^\dagger\Omega^{r,s+1}(M)\oplus\mathrm{Harm}^{r,s}_{\bar\partial}(M)`}</Eq>
        <Tx>{R`即 $(r,s)$ 形式 $\omega$ 唯一地表示为`}</Tx>
        <Eq n="8.113b" say={R`任何形式 = 恰当部分 + 余恰当部分 + 调和部分。`}>{R`\omega=\bar\partial\alpha+\bar\partial^\dagger\beta+\gamma`}</Eq>
        <Tx>{R`其中 $\alpha\in\Omega^{r,s-1}(M)$，$\beta\in\Omega^{r,s+1}(M)$，$\gamma\in\mathrm{Harm}^{r,s}_{\bar\partial}(M)$。三块两两正交：例如 $(\bar\partial\alpha,\gamma)=(\alpha,\bar\partial^\dagger\gamma)=0$，$(\bar\partial\alpha,\bar\partial^\dagger\beta)=(\bar\partial\bar\partial\alpha,\beta)=0$。`}</Tx>
      </Sub>

      <Sub n="8.6.3" title="Laplacians on a Kähler manifold" zh="Kähler 流形上的 Laplace 算子">
        <Tx>{R`在一般的 Hermite 流形上，Laplace 算子 $\Delta$、$\Delta_\partial$ 与 $\Delta_{\bar\partial}$ 之间没有特别的关系。但若 $M$ 是 Kähler 流形，它们本质上*相同*。［注意在 Kähler 流形中 Levi-Civita 联络与 Hermite 联络相容（\sref{T8.5}）。］`}</Tx>
        <Stmt id="T8.9" />
        <Eq n="8.114" keyEq title="Kähler 流形上的 Laplace 算子" say={R`在 Kähler 流形上，普通的 Laplace 算子恰好是 $\bar\partial$ Laplace 算子（也是 $\partial$ Laplace 算子）的两倍：调和形式只有一种。`}>{R`\Delta=2\Delta_\partial=2\Delta_{\bar\partial}.`}</Eq>
        <Derivation title={R`在 $\C^m$（平直 Kähler 度规）上检验 \eqref{8.114} 作用于函数`} collapsed steps={[
          { tex: R`\Delta f=-\sum_\mu\left(\frac{\partial^2}{\partial x^{\mu2}}+\frac{\partial^2}{\partial y^{\mu2}}\right)f=-4\sum_\mu\frac{\partial^2f}{\partial z^\mu\partial\bar z^\mu}`, why: R`本书约定 $\Delta=\dd\dd^\dagger+\dd^\dagger\dd$ 是正算子，对函数是 $-\nabla^2$；$4\partial_z\partial_{\bar z}=\partial_x^2+\partial_y^2$。` },
          { tex: R`\Delta_{\bar\partial}f=\bar\partial^\dagger\bar\partial f,\qquad\bar\partial f=\partial_{\bar\mu}f\,\dd\bar z^\mu`, why: R`函数上 $\bar\partial^\dagger f=0$。` },
          { tex: R`\bar\partial^\dagger(h_{\bar\mu}\dd\bar z^\mu)=-g^{\bar\mu\nu}\partial_\nu h_{\bar\mu}=-2\sum_\mu\partial_\mu h_{\bar\mu}`, why: R`平直情形 $g_{\mu\bar\nu}=\frac12\delta_{\mu\nu}$，$g^{\bar\mu\nu}=2\delta$；$\bar\partial^\dagger$ 是"散度"（由 $(h\,\dd\bar z,\bar\partial f)$ 分部积分可得）。` },
          { tex: R`\Delta_{\bar\partial}f=-2\sum_\mu\partial_\mu\partial_{\bar\mu}f=\tfrac12\Delta f`, why: R`与第一行比较。` },
        ]} result={R`$\Delta=2\Delta_{\bar\partial}$ 在函数上成立。一般情形的证明要用 Kähler 恒等式 $[\Lambda,\bar\partial]=-\mathrm{i}\partial^\dagger$（$\Lambda$ 是与 $\Omega$ 的外乘的伴随），见 Griffiths–Harris 第 0 章第 7 节。`} />
        <Tx>{R`证明需要一些技巧，此处只引 Schwartz (1986) 与 Goldberg (1962)。这个定理对 Kähler 流形的上同调群施加了约束。满足 $\bar\partial\omega=\bar\partial^\dagger\omega=0$ 的形式也满足 $\partial\omega=\partial^\dagger\omega=0$。

**全纯形式是调和的。**设 $\omega$ 是全纯 $p$ 形式：$\bar\partial\omega=0$。由于 $\omega$ 的展开中不含 $\dd\bar z^\mu$，$\bar\partial^\dagger\omega=0$（$\bar\partial^\dagger$ 把 $(p,0)$ 形式映到不存在的 $(p,-1)$ 形式）。于是 $\Delta_{\bar\partial}\omega=(\bar\partial\bar\partial^\dagger+\bar\partial^\dagger\bar\partial)\omega=0$。由 \sref{T8.9}，$\Delta\omega=0$——即*任何全纯形式关于 Kähler 度规都自动是调和的*。反之，$\Delta\omega=0$ 推出 $\bar\partial\omega=0$，所以每个双次为 $(p,0)$ 的调和形式都是全纯的。于是 $b^{p,0}=$ 全纯 $p$ 形式空间的维数。（在紧 Kähler 流形上，全纯形式自动是闭的：$\dd\omega=0$。）`}</Tx>
      </Sub>

      <Sub n="8.6.4" title="The Hodge numbers of Kähler manifolds" zh="Kähler 流形的 Hodge 数">
        <Tx>{R`$H^{r,s}_{\bar\partial}(M)$ 的复维数称为 **Hodge 数** $b^{r,s}$。复流形的上同调群用 **Hodge 菱形**（Hodge diamond）概括：`}</Tx>
        <Eq n="8.115" title="Hodge 菱形" say={R`把 $(m+1)^2$ 个 Hodge 数排成菱形：自下而上是总次数 $r+s=0,1,\ldots,2m$，每一横行之和（Kähler 时）就是对应的 Betti 数。`}>{R`\left(\begin{matrix}&&&b^{m,m}&&&\\&&b^{m,m-1}&&b^{m-1,m}&&\\&&&\cdots&&&\\b^{m,0}&b^{m-1,1}&&\cdots&&b^{1,m-1}&b^{0,m}\\&&&\cdots&&&\\&&b^{1,0}&&b^{0,1}&&\\&&&b^{0,0}&&&\end{matrix}\right).`}</Eq>
        <Tx>{R`这 $(m+1)^2$ 个 Hodge 数远非独立，下面将会看到。`}</Tx>
        <Stmt id="T8.10">
          <Proof steps={[
            { claim: R`(a) 若 $\omega\in\Omega^{r,s}(M)$ 是调和的，则 $\Delta_{\bar\partial}\omega=\Delta_\partial\omega=0$（\sref{T8.9}）。于是 $(s,r)$ 形式 $\overline\omega$ 也是调和的：`, tex: R`\Delta_{\bar\partial}\overline\omega=\nosym{\overline{\Delta_\partial\omega}}=\nosym{\overline{\Delta_{\bar\partial}\omega}}=0`, uses: ["T8.9", "8.42b"], why: R`由 \eqref{8.42b} 与 \eqref{8.108}，共轭把 $\bar\partial,\bar\partial^\dagger$ 变成 $\partial,\partial^\dagger$，所以 $\nosym{\overline{\Delta_{\bar\partial}\alpha}}=\Delta_\partial\overline\alpha$；再用 $\Delta_\partial=\Delta_{\bar\partial}$。` },
            { claim: R`所以对每个双次 $(r,s)$ 的调和形式，都有双次 $(s,r)$ 的调和形式，反之亦然（共轭是共轭线性的双射，保持维数）。由 \sref{T8.8}，$b^{r,s}=b^{s,r}$。`, uses: ["T8.8"] },
            { claim: R`(b) 设 $\omega\in H^{r,s}_{\bar\partial}(M)$、$\psi\in H^{m-r,m-s}_{\bar\partial}(M)$。则 $\omega\wedge\psi$ 是体积元（$(m,m)$ 形式），可以证明（Schwartz 1986）$\int_M\omega\wedge\psi$ 定义了**非奇异**的配对 $H^{r,s}_{\bar\partial}(M)\times H^{m-r,m-s}_{\bar\partial}(M)\to\C$，从而 $H^{r,s}_{\bar\partial}(M)$ 与 $H^{m-r,m-s}_{\bar\partial}(M)$ 对偶。`, why: R`非奇异性的要点：若 $\omega$ 是非零的调和代表，则 $\bar*\omega$ 也是调和的（$\Delta$ 与 $*$ 可交换），且 $\int\omega\wedge\bar*\omega=(\omega,\omega)>0$。（这是 Serre 对偶在 Kähler 情形的特例。）`, fill: true },
            { claim: R`所以 $H^{r,s}_{\bar\partial}(M)$ 作为向量空间同构于 $H^{m-r,m-s}_{\bar\partial}(M)$，$\dim_\C H^{r,s}_{\bar\partial}(M)=\dim_\C H^{m-r,m-s}_{\bar\partial}(M)$，即 $b^{r,s}=b^{m-r,m-s}$。` },
          ]} />
        </Stmt>
        <Eq n="8.116" keyEq title="Hodge 对称性" say={R`复共轭对称：把菱形左右翻转不变。`}>{R`b^{r,s}=b^{s,r}`}</Eq>
        <Eq n="8.117" title="Serre 对偶" say={R`对偶对称：把菱形上下翻转（中心反演）不变。`}>{R`b^{r,s}=b^{m-r,m-s}.`}</Eq>
        <Tx>{R`于是 Kähler 流形的 Hodge 菱形关于竖直线与水平线对称。这些对称性把独立 Hodge 数的个数减少到：$m$ 为偶数时 $(\frac12m+1)^2$，$m$ 为奇数时 $\frac14(m+1)(m+3)$。`}</Tx>
        <Derivation title="独立 Hodge 数的计数（Burnside 引理）" collapsed steps={[
          { tex: R`G=\{1,\ \sigma:(r,s)\mapsto(s,r),\ \iota:(r,s)\mapsto(m-r,m-s),\ \sigma\iota\}`, why: R`两个对称生成 Klein 四元群，作用在 $(m+1)^2$ 个格点 $(r,s)$ 上；独立 Hodge 数的个数 = 轨道数。` },
          { tex: R`|\mathrm{Fix}(1)|=(m+1)^2,\quad|\mathrm{Fix}(\sigma)|=|\mathrm{Fix}(\sigma\iota)|=m+1,\quad|\mathrm{Fix}(\iota)|=\begin{cases}1&m\text{ 偶}\\0&m\text{ 奇}\end{cases}`, why: R`$\sigma$ 固定对角线 $r=s$；$\sigma\iota:(r,s)\mapsto(m-s,m-r)$ 固定反对角线 $r+s=m$；$\iota$ 只固定中心 $(m/2,m/2)$。` },
          { tex: R`\#\text{轨道}=\tfrac14[(m+1)^2+2(m+1)+\epsilon]=\begin{cases}\tfrac14(m+2)^2=(\tfrac12m+1)^2&m\text{ 偶}(\epsilon=1)\\ \tfrac14(m+1)(m+3)&m\text{ 奇}(\epsilon=0)\end{cases}`, why: R`Burnside：轨道数 = 不动点数的平均。` },
        ]} result={R`例如 $m=1$：2 个（$b^{0,0}$、$b^{1,0}$）；$m=2$：4 个（$b^{0,0},b^{1,0},b^{2,0},b^{1,1}$）；$m=3$：6 个。与原书公式一致。`} />
        <Tx>{R`在一般的 Hermite 流形上，Betti 数与 Hodge 数之间没有直接的关系。但若 $M$ 是 Kähler 流形，\sref{T8.11} 建立了二者之间的密切联系。`}</Tx>
        <Stmt id="T8.11">
          <Proof steps={[
            { claim: R`(a) $H^{r,s}_{\bar\partial}(M)$ 是由 $\Delta_{\bar\partial}$ 调和的 $(r,s)$ 形式张成的复向量空间（\sref{T8.8}）。另一方面 $H^p(M)$ 是由 $\Delta$ 调和的 $p$ 形式张成的实向量空间（\sref{T7.8}），其复化为 $H^p(M)^\C=\{[\omega]\mid\omega\in\Omega^p(M)^\C,\ \Delta\omega=0\}$。`, uses: ["T8.8", "T7.8"] },
            { claim: R`由于 $M$ 是 Kähler 的，满足 $\Delta_{\bar\partial}\omega=0$ 的形式也满足 $\Delta\omega=0$，反之亦然（\sref{T8.9}）。又 $\Delta=2\Delta_{\bar\partial}$ 保持双次，所以调和 $p$ 形式的各个 $(r,s)$ 分量各自调和。由 $\Omega^p(M)^\C=\bigoplus_{r+s=p}\Omega^{r,s}(M)$ 得`, tex: R`H^p(M)^\C=\bigoplus_{r+s=p}H^{r,s}_{\bar\partial}(M)`, uses: ["T8.9", "8.36b"] },
            { claim: R`注意 $\dim_\R H^p(M)=\dim_\C H^p(M)^\C$，得 $b^p=\sum_{r+s=p}b^{r,s}$。` },
            { claim: R`(b) 由 (a) 与 \eqref{8.116}：`, tex: R`b^{2p-1}=\sum_{r+s=2p-1}b^{r,s}=2\sum_{\substack{r+s=2p-1\\ r>s}}b^{r,s}`, uses: ["8.116"], why: R`$r+s$ 为奇数时 $r\neq s$，各项按 $r>s$ 与 $r<s$ 两两配对相等。` },
            { claim: R`所以 $b^{2p-1}$ 是偶数。` },
            { claim: R`(c) 关键的观察是：Kähler 形式 $\Omega$ 是闭的*实*二形式，$\dd\Omega=0$；实 $2p$ 形式 $\Omega^p=\Omega\wedge\ldots\wedge\Omega$（$p$ 个）也是闭的，$\dd\Omega^p=0$。下面证明 $\Omega^p$ 不是恰当的。`, uses: ["D8.4", "8.34"] },
            { claim: R`设 $\Omega^p=\dd\eta$，$\eta\in\Omega^{2p-1}(M)$。则 $\Omega^m=\Omega^{m-p}\wedge\Omega^p=\dd(\Omega^{m-p}\wedge\eta)$。由 Stokes 定理`, tex: R`\int_M\Omega^m=\int_M\dd(\Omega^{m-p}\wedge\eta)=\int_{\partial M}\Omega^{m-p}\wedge\eta=0`, why: R`$\dd(\Omega^{m-p}\wedge\eta)=\dd\Omega^{m-p}\wedge\eta+\Omega^{m-p}\wedge\dd\eta$，第一项为零。` },
            { claim: R`而左边是 $M$ 的体积（乘以 $m!$，\sref{L8.1}），矛盾。所以 $H^{2p}(M)$ 中至少有一个非平凡元素 $[\Omega^p]$，$b^{2p}\ge1$。`, uses: ["L8.1"] },
          ]} />
        </Stmt>
        <Eq n="8.118" keyEq title="Betti 数 = Hodge 数之和" say={R`第 $p$ 个 Betti 数等于 Hodge 菱形第 $p$ 横行的 Hodge 数之和：拓扑被复结构精确地拆开。`}>{R`b^p=\sum_{r+s=p}b^{r,s}`}</Eq>
        <Eq n="8.119" say={R`奇数次 Betti 数必为偶数——例如 $S^1\times S^3$（$b^1=1$）不可能是 Kähler 流形。`}>{R`b^{2p-1}\text{ 为偶数}\qquad(1\le p\le m)`}</Eq>
        <Eq n="8.120" say={R`偶数次 Betti 数至少为 1：Kähler 形式的幂给出非平凡的上同调类。`}>{R`b^{2p}\ge1\qquad(1\le p\le m)`}</Eq>
        <Box kind="warning" title="注记：定理 8.8–8.11 需要 M 紧致">{R`原书在 \sref{T8.11} 中只写"$\partial M=\emptyset$"，在 \sref{T8.8}–\sref{T8.10} 中没有写拓扑条件。这些定理都要求 $M$ **紧致**（且无边）：内积 \eqref{8.104} 要有限、Hodge 分解要用椭圆理论、(c) 的证明要求 $\int_M\Omega^m$ 有限且非零。反例：$\C^m$ 是 Kähler 流形且无边，但 $b^2=0$，违反 \eqref{8.120}。本站的登记表已加上"紧致"。`}</Box>
        <Tx>{R`若 Kähler 流形是 Ricci 平坦的，Hodge 数之间还有额外的关系，进一步减少独立 Hodge 数（见 Horowitz (1986) 与 Candelas (1988)）：对 Calabi–Yau 三维流形（和乐恰为 $\mathrm{SU}(3)$），$b^{1,0}=b^{2,0}=0$、$b^{3,0}=1$，菱形只剩两个自由数 $b^{1,1}$ 与 $b^{2,1}$，Euler 数 $\chi=2(b^{1,1}-b^{2,1})$——在弦论中它们分别数 Kähler 模与复结构模，$|\chi|/2$ 是粒子"代"数。下面的交互图让你检验这些关系。`}</Tx>
        <HodgeLab />
      </Sub>
    </Sec>);
}
