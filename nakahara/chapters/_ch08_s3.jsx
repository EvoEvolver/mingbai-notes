// §8.3 复微分形式 —— 式 (8.30)–(8.46)，命题 8.1，定义 8.2–8.3，定理 8.1，习题 8.4–8.6
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, C } from "@kit";

const R = String.raw;

export function Sec83() {
  return (
    <Sec n="8.3" title="Complex differential forms" zh="复微分形式"
      gist={R`复化 $q$ 形式（共轭、外积、$\dd$ 都按实部虚部延拓）→ 在复流形上按"吃几个全纯向量、几个反全纯向量"分出 $(r,s)$ 形式（\sref{D8.2}），$\Omega^q(M)^\C=\bigoplus_{r+s=q}\Omega^{r,s}(M)$（\sref{P8.1}）→ $\dd=\partial+\bar\partial$（Dolbeault 算子），$\partial^2=\bar\partial^2=\partial\bar\partial+\bar\partial\partial=0$（\sref{T8.1}）→ 全纯 $r$ 形式（\sref{D8.3}）、Dolbeault 复形与 $\bar\partial$ 上同调 $H^{r,s}_{\bar\partial}(M)$。`}
      why={R`实流形上 $\dd^2=0$ 给出 de Rham 上同调；复流形上 $\dd$ 本身分裂成两半，$\bar\partial^2=0$ 给出更精细的不变量 $H^{r,s}_{\bar\partial}$。§8.6 将证明：在紧 Kähler 流形上，这些"精细的"上同调恰好把 Betti 数拆开，$b^p=\sum_{r+s=p}b^{r,s}$。`}
      gives={["8.31", "8.32", "8.35", "8.36b", "8.38", "8.39", "8.40", "8.42a", "8.42b", "8.42d", "8.43", "8.45", "8.46"]}>
      <p className="muted">本节概念：<C id="rs_forms" /> · <C id="dolbeault" /></p>
      <Tx>{R`在复流形上定义复微分形式，并借助它讨论上同调群等拓扑性质。`}</Tx>

      <Sub n="8.3.1" title="Complexification of real differential forms" zh="实微分形式的复化">
        <Tx>{R`设 $M$ 是微分流形，$\dim_\R M=m$。在 $p$ 点取两个 $q$ 形式 $\omega,\eta\in\Omega^q_p(M)$，定义**复 $q$ 形式** $\zeta=\omega+\mathrm{i}\eta$。$p$ 点复 $q$ 形式的向量空间记为 $\Omega^q_p(M)^\C$。显然 $\Omega^q_p(M)\subset\Omega^q_p(M)^\C$。$\zeta$ 的共轭为 $\overline\zeta=\omega-\mathrm{i}\eta$。若 $\zeta=\overline\zeta$，复 $q$ 形式 $\zeta$ 是实的。`}</Tx>
        <Exercise n="8.4" title="复形式的共轭" level="★"
          hint={R`把 $\omega$ 写成 $\alpha+\mathrm{i}\beta$（$\alpha,\beta$ 为实形式，按 \eqref{8.8} 复线性延拓），先对实形式证明 $\nosym{\overline{\alpha(\overline V_1,\ldots,\overline V_q)}}=\alpha(V_1,\ldots,V_q)$。`}
          solution={R`**实形式。**设 $\alpha$ 是实 $q$ 形式，复多重线性地延拓到 $T_pM^\C$ 上。对 $V_i=X_i+\mathrm{i}Y_i$ 展开 $\alpha(V_1,\ldots,V_q)$：每一项是某个 $\alpha(\ldots)$（只含实向量，因而是实数）乘以 $\mathrm{i}^k$，$k$ 是取了 $Y$ 的位置数。把每个 $V_i$ 换成 $\overline V_i=X_i-\mathrm{i}Y_i$，每项变成乘以 $(-\mathrm{i})^k=\nosym{\overline{\mathrm{i}^k}}$。所以 $\alpha(\overline V_1,\ldots,\overline V_q)=\nosym{\overline{\alpha(V_1,\ldots,V_q)}}$。

**\eqref{8.30}。**$\omega=\alpha+\mathrm{i}\beta$，$\overline\omega=\alpha-\mathrm{i}\beta$。则

$$\overline\omega(V_1,\ldots,V_q)=\alpha(V)-\mathrm{i}\beta(V)=\nosym{\overline{\alpha(\overline V)}}-\mathrm{i}\,\nosym{\overline{\beta(\overline V)}}=\nosym{\overline{\alpha(\overline V)+\mathrm{i}\beta(\overline V)}}=\nosym{\overline{\omega(\overline V_1,\ldots,\overline V_q)}}.$$

**代数性质。**设 $\eta=\gamma+\mathrm{i}\delta$，$\lambda=a+\mathrm{i}b$。$\nosym{\overline{\omega+\eta}}=(\alpha+\gamma)-\mathrm{i}(\beta+\delta)=\overline\omega+\overline\eta$。$\lambda\omega=(a\alpha-b\beta)+\mathrm{i}(b\alpha+a\beta)$，其共轭 $(a\alpha-b\beta)-\mathrm{i}(b\alpha+a\beta)=(a-\mathrm{i}b)(\alpha-\mathrm{i}\beta)=\overline\lambda\,\overline\omega$。$\nosym{\overline{\overline\omega}}=\nosym{\overline{\alpha-\mathrm{i}\beta}}=\alpha+\mathrm{i}\beta=\omega$。`}>
          <>
            <Tx>{R`设 $\omega\in\Omega^q_p(M)^\C$。证明`}</Tx>
            <Eq n="8.30" say={R`共轭形式在一组向量上的值，等于原形式在这组向量的共轭上取值再取共轭——共轭在"形式"与"向量"之间可以来回搬。`}>{R`\overline\omega(V_1,\ldots,V_q)=\nosym{\overline{\omega(\overline V_1,\ldots,\overline V_q)}}\qquad V_i\in T_pM^\C.`}</Eq>
            <Tx>{R`再证明 $\nosym{\overline{\omega+\eta}}=\overline\omega+\overline\eta$、$\nosym{\overline{\lambda\omega}}=\overline\lambda\,\overline\omega$ 与 $\nosym{\overline{\overline\omega}}=\omega$，其中 $\omega,\eta\in\Omega^q_p(M)^\C$，$\lambda\in\C$。`}</Tx>
          </>
        </Exercise>
        <Tx>{R`定义在微分流形 $M$ 上的复 $q$ 形式 $\alpha$ 是在每点光滑地指定 $\Omega^q_p(M)^\C$ 的一个元素。复 $q$ 形式的集合记为 $\Omega^q(M)^\C$。复 $q$ 形式 $\zeta$ 唯一地分解为 $\zeta=\omega+\mathrm{i}\eta$，$\omega,\eta\in\Omega^q(M)$。$\zeta=\omega+\mathrm{i}\eta$ 与 $\xi=\varphi+\mathrm{i}\psi$ 的外积定义为`}</Tx>
        <Eq n="8.31" say={R`复形式的外积按"复数乘法"展开：实部 $=\omega\wedge\varphi-\eta\wedge\psi$，虚部 $=\omega\wedge\psi+\eta\wedge\varphi$。`}>{R`\begin{aligned}\zeta\wedge\xi&=(\omega+\mathrm{i}\eta)\wedge(\varphi+\mathrm{i}\psi)\\&=(\omega\wedge\varphi-\eta\wedge\psi)+\mathrm{i}(\omega\wedge\psi+\eta\wedge\varphi).\end{aligned}`}</Eq>
        <Tx>{R`外微分 $\dd$ 作用在 $\zeta=\omega+\mathrm{i}\eta$ 上为`}</Tx>
        <Eq n="8.32" say={R`外微分分别作用在实部与虚部上；它是实算子，与复共轭可交换。`}>{R`\dd\zeta=\dd\omega+\mathrm{i}\,\dd\eta.`}</Eq>
        <Tx>{R`$\dd$ 是实算子：$\nosym{\overline{\dd\zeta}}=\dd\omega-\mathrm{i}\,\dd\eta=\dd\overline\zeta$。`}</Tx>
        <Exercise n="8.5" title="复形式的分次交换律与 Leibniz 律" level="★"
          hint={R`把 $\omega=\omega_1+\mathrm{i}\omega_2$、$\xi=\xi_1+\mathrm{i}\xi_2$ 展开，对每个实的分量用 \eqref{5.67b} 与 \eqref{5.69}；或者直接注意到 \eqref{8.31} 是 $\C$ 双线性的、\eqref{8.32} 是 $\C$ 线性的。`}
          solution={R`由 \eqref{8.31}，复外积就是实外积的 $\C$ 双线性延拓；由 \eqref{8.32}，复外微分是实外微分的 $\C$ 线性延拓。

**\eqref{8.33}。**$\omega\wedge\xi=\omega_1\wedge\xi_1-\omega_2\wedge\xi_2+\mathrm{i}(\omega_1\wedge\xi_2+\omega_2\wedge\xi_1)$。对每一项用实形式的 $\alpha\wedge\beta=(-1)^{qr}\beta\wedge\alpha$（\eqref{5.67b}），得 $(-1)^{qr}[\xi_1\wedge\omega_1-\xi_2\wedge\omega_2+\mathrm{i}(\xi_2\wedge\omega_1+\xi_1\wedge\omega_2)]=(-1)^{qr}\xi\wedge\omega$。

**\eqref{8.34}。**$\dd(\omega\wedge\xi)$ 的四个实项各自满足 \eqref{5.69}：$\dd(\omega_a\wedge\xi_b)=\dd\omega_a\wedge\xi_b+(-1)^q\omega_a\wedge\dd\xi_b$。按 $(a,b)$ 与 $\mathrm{i}$ 的幂重新组合，前一半合成 $\dd\omega\wedge\xi$，后一半合成 $(-1)^q\omega\wedge\dd\xi$。`}>
          <>
            <Tx>{R`设 $\omega\in\Omega^q(M)^\C$，$\xi\in\Omega^r(M)^\C$。证明`}</Tx>
            <Eq n="8.33" say={R`复形式交换次序的符号与实形式相同：阶数之积的奇偶。`}>{R`\omega\wedge\xi=(-1)^{qr}\xi\wedge\omega`}</Eq>
            <Eq n="8.34" say={R`复形式的外微分满足同样的分次 Leibniz 律。`}>{R`\dd(\omega\wedge\xi)=\dd\omega\wedge\xi+(-1)^q\omega\wedge\dd\xi.`}</Eq>
          </>
        </Exercise>
      </Sub>

      <Sub n="8.3.2" title="Differential forms on complex manifolds" zh="复流形上的微分形式">
        <Tx>{R`现在限定在复流形上，这里有分解 $T_pM^\C=T_pM^+\oplus T_pM^-$ 与 $\mathcal{X}(M)^\C=\mathcal{X}(M)^+\oplus\mathcal{X}(M)^-$。`}</Tx>
        <Stmt id="D8.2" />
        <Tx>{R`取卡 $(U,\varphi)$，复坐标 $\varphi(p)=z^\mu$。对切空间 $T_pM^\pm$ 取基 \eqref{8.13a}、\eqref{8.13b}，对偶基由 \eqref{8.14} 给出。注意 $\dd z^\mu$ 是 $(1,0)$ 次的，因为 $\langle\dd z^\mu,\partial/\partial\bar z^\nu\rangle=0$；$\dd\bar z^\mu$ 是 $(0,1)$ 次的。用这些基，$(r,s)$ 次形式 $\omega$ 写成`}</Tx>
        <Eq n="8.35" keyEq title={R`$(r,s)$ 形式的展开`} say={R`$(r,s)$ 形式 = $r$ 个 $\dd z$ 与 $s$ 个 $\dd\bar z$ 的楔积的组合；分量分别对 $\mu$ 组与 $\bar\nu$ 组全反对称，$1/(r!s!)$ 抵消重复计数。`}>{R`\omega=\frac{1}{r!\,s!}\,\omega_{\mu_1\ldots\mu_r\bar\nu_1\ldots\bar\nu_s}\,\dd z^{\mu_1}\wedge\ldots\wedge\dd z^{\mu_r}\wedge\dd\bar z^{\nu_1}\wedge\ldots\wedge\dd\bar z^{\nu_s}.`}</Eq>
        <Tx>{R`集合 $\{\dd z^{\mu_1}\wedge\ldots\wedge\dd z^{\mu_r}\wedge\dd\bar z^{\nu_1}\wedge\ldots\wedge\dd\bar z^{\nu_s}\}$ 是 $\Omega^{r,s}_p(M)$ 的基。分量对 $\mu$ 与对 $\nu$ 分别全反对称。设 $z^\mu$ 与 $w^\mu$ 是两组重叠的坐标。读者应验证：在 $z^\mu$ 坐标系中的 $(r,s)$ 形式，在 $w^\nu$ 坐标系中也是 $(r,s)$ 形式。（理由：坐标变换全纯，$\dd w^\nu=(\partial w^\nu/\partial z^\mu)\dd z^\mu$ 不含 $\dd\bar z$，$\dd\bar w^\nu$ 不含 $\dd z$；这与习题 8.2 是对偶的说法。）`}</Tx>
        <Stmt id="P8.1">
          <Proof title="命题 8.1 的证明（原书留给读者）" steps={[
            { claim: R`(a) 设 $\omega\in\Omega^{q,r}(M)$，$V_i$ 各自属于 $T_pM^+$ 或 $T_pM^-$。由 \eqref{8.30}，$\overline\omega(V_1,\ldots)=\nosym{\overline{\omega(\overline V_1,\ldots)}}$。共轭把 $T_pM^\pm$ 互换（\eqref{8.27}）。`, uses: ["8.30", "8.27"], fill: true },
            { claim: R`所以 $\overline\omega(V_1,\ldots)\neq0$ 要求 $\overline V_i$ 中恰有 $q$ 个全纯、$r$ 个反全纯，即 $V_i$ 中恰有 $r$ 个全纯、$q$ 个反全纯：$\overline\omega\in\Omega^{r,q}(M)$。在坐标中这就是 $\nosym{\overline{\dd z^\mu}}=\dd\bar z^\mu$。`, fill: true },
            { claim: R`(b) 在基上看：$\omega$ 的每一项含 $q$ 个 $\dd z$、$r$ 个 $\dd\bar z$；$\xi$ 的每一项含 $q'$ 个 $\dd z$、$r'$ 个 $\dd\bar z$。它们的楔积含 $q+q'$ 个 $\dd z$、$r+r'$ 个 $\dd\bar z$（可能为零）。由 \eqref{8.35} 的基的刻画，$\omega\wedge\xi\in\Omega^{q+q',r+r'}(M)$。`, uses: ["8.35"], fill: true },
            { claim: R`(c) 存在性：$\{\dd z^\mu,\dd\bar z^\mu\}$ 是 $T_p^*M^\C$ 的基，所以 $\{\dd z^{\mu_1}\wedge\cdots\wedge\dd\bar z^{\nu_s}\}_{r+s=q}$ 是 $\Omega^q_p(M)^\C$ 的基（§5.4 的论证，只是把基换成复的）。把 $\omega$ 按基展开，按 $\dd z$ 的个数 $r$ 分组，即得 \eqref{8.36a}。`, fill: true },
            { claim: R`唯一性：不同 $(r,s)$ 的基元素互不相同，因此彼此线性无关；或者用"喂 $r$ 个 $\partial/\partial z$、$s$ 个 $\partial/\partial\bar z$"的值 \eqref{8.38} 把每一块 $\omega^{(r,s)}$ 的分量直接读出来。光滑性由分量光滑保证。`, uses: ["8.38"], fill: true },
          ]} />
        </Stmt>
        <Tx>{R`(c) 中的分解写成`}</Tx>
        <Eq n="8.36a" say={R`任何复 $q$ 形式都唯一地拆成各个双次部分之和。`}>{R`\omega=\sum_{r+s=q}\omega^{(r,s)}`}</Eq>
        <Tx>{R`其中 $\omega^{(r,s)}\in\Omega^{r,s}(M)$。于是有分解`}</Tx>
        <Eq n="8.36b" keyEq title="双次分解" say={R`复 $q$ 形式的空间按 $(\dd z$ 的个数, $\dd\bar z$ 的个数$)$ 直和分解。`}>{R`\Omega^q(M)^\C=\bigoplus_{r+s=q}\Omega^{r,s}(M).`}</Eq>
        <Tx>{R`任何 $q$ 形式 $\omega$ 分解为`}</Tx>
        <Eq n="8.37" say={R`把双次分解与坐标展开 \eqref{8.35} 合在一起写出。`}>{R`\begin{aligned}\omega&=\sum_{r+s=q}\omega^{(r,s)}\\&=\sum_{r+s=q}\frac{1}{r!s!}\omega_{\mu_1\ldots\mu_r\bar\nu_1\ldots\bar\nu_s}\dd z^{\mu_1}\wedge\ldots\wedge\dd z^{\mu_r}\wedge\dd\bar z^{\nu_1}\wedge\ldots\wedge\dd\bar z^{\nu_s}\end{aligned}`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="8.38" say={R`分量就是把形式喂上 $r$ 个全纯基向量与 $s$ 个反全纯基向量得到的值。`}>{R`\omega_{\mu_1\ldots\mu_r\bar\nu_1\ldots\bar\nu_s}=\omega\left(\frac{\partial}{\partial z^{\mu_1}},\ldots,\frac{\partial}{\partial z^{\mu_r}},\frac{\partial}{\partial\bar z^{\nu_1}},\ldots,\frac{\partial}{\partial\bar z^{\nu_s}}\right).`}</Eq>
        <Exercise n="8.6" title={R`$\Omega^{r,s}_p(M)$ 的维数`} level="★"
          hint={R`从 $m$ 个 $\dd z$ 中选 $r$ 个、从 $m$ 个 $\dd\bar z$ 中选 $s$ 个。求和用 Vandermonde 恒等式：从 $2m$ 个元素中选 $q$ 个，按其中有几个来自前 $m$ 个分类。`}
          solution={R`**$\Omega^{r,s}_p(M)$。**基元素 $\dd z^{\mu_1}\wedge\cdots\wedge\dd z^{\mu_r}\wedge\dd\bar z^{\nu_1}\wedge\cdots\wedge\dd\bar z^{\nu_s}$ 由（无序的）指标集 $\{\mu_1<\cdots<\mu_r\}\subset\{1,\ldots,m\}$ 与 $\{\nu_1<\cdots<\nu_s\}\subset\{1,\ldots,m\}$ 决定（次序只影响符号；重复指标给零）。所以当 $0\le r,s\le m$ 时

$$\dim_\C\Omega^{r,s}_p(M)=\binom mr\binom ms,$$

$r>m$ 或 $s>m$ 时某个 $\dd z$（或 $\dd\bar z$）必然重复，空间为零。

**求和。**由 \eqref{8.36b}，

$$\dim_\C\Omega^q_p(M)^\C=\sum_{r+s=q}\binom mr\binom ms=\binom{2m}{q}.$$

最后一步是 Vandermonde 恒等式：从 $2m$ 个对象（$m$ 个 $\dd z$ 与 $m$ 个 $\dd\bar z$）中选 $q$ 个，按其中 $\dd z$ 的个数 $r$ 分类。这与 $\dim_\R\Omega^q_p(M)=\binom{2m}{q}$（实流形 $\dim_\R M=2m$，§5.4）一致——复化不改变维数的数值，只是把实维数变成复维数。`}>
          {R`设 $\dim_\C M=m$。验证

$$\dim_\C\Omega^{r,s}_p(M)=\begin{cases}\dbinom mr\dbinom ms&\text{若 }0\le r,s\le m\\ 0&\text{其他情形.}\end{cases}$$

再证明 $\dim_\C\Omega^q_p(M)^\C=\sum_{r+s=q}\dim_\C\Omega^{r,s}_p(M)=\binom{2m}{q}$。`}
        </Exercise>
        <Box kind="warning" title={R`勘误：习题 8.6 中应为 $\dim_\C$；定义 8.2 中 $r,s$ 应为非负整数（p.341–342）`}>{R`原书习题 8.6 写的是 $\dim_\R\Omega^{r,s}_p(M)$ 与 $\dim_\R\Omega^q_p(M)^\C$。$\Omega^{r,s}_p(M)$ 是**复**向量空间（对复数乘法封闭；$\dd z^{\mu}$ 乘以 $\mathrm{i}$ 仍是 $(1,0)$ 形式），基元素个数 $\binom mr\binom ms$ 是复维数；其实维数是两倍。同理 $\dim_\C\Omega^q_p(M)^\C=\binom{2m}q$。另外，\sref{D8.2} 中原书说"$r,s$ 为正整数"，但随后的 $\Omega^{r,0}$、$\Omega^{0,s}$ 等都要求 $r,s$ 可以为 $0$，应为非负整数。登记表与正文均已改正。`}</Box>
      </Sub>

      <Sub n="8.3.3" title="Dolbeault operators" zh="Dolbeault 算子">
        <Tx>{R`计算 $(r,s)$ 形式 $\omega$ 的外微分。由 \eqref{8.35}，外微分只作用在分量上，而分量是 $(z,\bar z)$ 的函数，所以`}</Tx>
        <Eq n="8.39" keyEq title={R`$(r,s)$ 形式的外微分`} say={R`对分量求导时，沿 $z$ 方向的导数带出一个 $\dd z$，沿 $\bar z$ 方向的导数带出一个 $\dd\bar z$——外微分自然地分成两部分。`}>{R`\begin{aligned}\dd\omega=\frac{1}{r!s!}&\left(\frac{\partial}{\partial z^\lambda}\omega_{\mu_1\ldots\mu_r\bar\nu_1\ldots\bar\nu_s}\dd z^\lambda+\frac{\partial}{\partial\bar z^\lambda}\omega_{\mu_1\ldots\mu_r\bar\nu_1\ldots\bar\nu_s}\dd\bar z^\lambda\right)\\&\times\dd z^{\mu_1}\wedge\ldots\wedge\dd z^{\mu_r}\wedge\dd\bar z^{\nu_1}\wedge\ldots\wedge\dd\bar z^{\nu_s}.\end{aligned}`}</Eq>
        <Tx>{R`（这用到了实函数的微分 $\dd f=\partial_xf\,\dd x+\partial_yf\,\dd y$ 在复基下等于 $\partial_zf\,\dd z+\partial_{\bar z}f\,\dd\bar z$：把 \eqref{8.13a}、\eqref{8.14} 代入右边展开即可。）$\dd\omega$ 是一个 $(r+1,s)$ 形式与一个 $(r,s+1)$ 形式的混合。按去向把 $\dd$ 的作用拆开：`}</Tx>
        <Eq n="8.40" keyEq title={R`$\dd=\partial+\bar\partial$`} say={R`外微分 = 全纯部分 $\partial$（只增加一个 $\dd z$）+ 反全纯部分 $\bar\partial$（只增加一个 $\dd\bar z$）。`}>{R`\dd=\partial+\bar\partial`}</Eq>
        <Tx>{R`其中 $\partial:\Omega^{r,s}(M)\to\Omega^{r+1,s}(M)$，$\bar\partial:\Omega^{r,s}(M)\to\Omega^{r,s+1}(M)$。例如若 $\omega=\omega_{\mu\bar\nu}\dd z^\mu\wedge\dd\bar z^\nu$，其外微分为

$$\partial\omega=\frac{\partial\omega_{\mu\bar\nu}}{\partial z^\lambda}\dd z^\lambda\wedge\dd z^\mu\wedge\dd\bar z^\nu,$$

$$\bar\partial\omega=\frac{\partial\omega_{\mu\bar\nu}}{\partial\bar z^\lambda}\dd\bar z^\lambda\wedge\dd z^\mu\wedge\dd\bar z^\nu=-\frac{\partial\omega_{\mu\bar\nu}}{\partial\bar z^\lambda}\dd z^\mu\wedge\dd\bar z^\lambda\wedge\dd\bar z^\nu.$$

算子 $\partial$ 与 $\bar\partial$ 称为 **Dolbeault 算子**。若 $\omega$ 是 \eqref{8.37} 给出的一般 $q$ 形式，$\partial$ 与 $\bar\partial$ 对 $\omega$ 的作用定义为`}</Tx>
        <Eq n="8.41" say={R`对混合双次的形式，逐块作用 Dolbeault 算子再相加。`}>{R`\partial\omega=\sum_{r+s=q}\partial\omega^{(r,s)}\qquad\bar\partial\omega=\sum_{r+s=q}\bar\partial\omega^{(r,s)}.`}</Eq>
        <Stmt id="T8.1">
          <Proof title="定理 8.1 的证明" steps={[
            { claim: R`只需对双次为 $(r,s)$ 的 $\omega$ 证明（一般形式按 \eqref{8.41} 逐块相加，所有式子都是线性的）。` },
            { claim: R`(a) 由 $\dd=\partial+\bar\partial$ 与 $\dd^2=0$（\eqref{5.72}）：`, tex: R`0=\dd^2\omega=(\partial+\bar\partial)(\partial+\bar\partial)\omega=\partial\partial\omega+(\partial\bar\partial+\bar\partial\partial)\omega+\bar\partial\bar\partial\omega`, uses: ["8.40", "5.72"] },
            { claim: R`右边三项的双次分别为 $(r+2,s)$、$(r+1,s+1)$、$(r,s+2)$。由 \sref{P8.1}(c) 的唯一分解，每项必须分别为零。`, uses: ["P8.1"] },
            { claim: R`(b) $\dd$ 是实算子，$\dd\overline\omega=\nosym{\overline{\dd\omega}}$：`, tex: R`\partial\overline\omega+\bar\partial\overline\omega=\dd\overline\omega=\nosym{\overline{(\partial+\bar\partial)\omega}}=\nosym{\overline{\partial\omega}}+\nosym{\overline{\bar\partial\omega}}`, uses: ["8.32"] },
            { claim: R`由 \sref{P8.1}(a)，$\overline\omega$ 的双次为 $(s,r)$。$\partial\overline\omega$ 与 $\nosym{\overline{\bar\partial\omega}}$ 的双次都是 $(s+1,r)$，$\bar\partial\overline\omega$ 与 $\nosym{\overline{\partial\omega}}$ 的双次都是 $(s,r+1)$。按双次比较，$\partial\overline\omega=\nosym{\overline{\bar\partial\omega}}$，$\bar\partial\overline\omega=\nosym{\overline{\partial\omega}}$。`, uses: ["P8.1"] },
            { claim: R`(c) 设 $\omega$ 的双次为 $(r,s)$，$\xi$ 的双次为 $(r',s')$。把 \eqref{8.34} 按双次拆开：`, tex: R`\dd(\omega\wedge\xi)=\dd\omega\wedge\xi+(-1)^q\omega\wedge\dd\xi`, uses: ["8.34"] },
            { claim: R`代入 $\dd=\partial+\bar\partial$，$(r+r'+1,s+s')$ 部分给出 \eqref{8.42c}，$(r+r',s+s'+1)$ 部分给出 \eqref{8.42d}。`, uses: ["P8.1"], fill: true },
          ]} />
        </Stmt>
        <Eq n="8.42a" keyEq title="Dolbeault 算子的平方" say={R`$\partial$、$\bar\partial$ 各自平方为零，并且彼此反对易——这是 $\dd^2=0$ 按双次拆开后的三个分量。`}>{R`\partial\partial\omega=(\partial\bar\partial+\bar\partial\partial)\omega=\bar\partial\bar\partial\omega=0`}</Eq>
        <Eq n="8.42b" say={R`共轭把 $\partial$ 与 $\bar\partial$ 互换：先取共轭再作用 $\partial$，等于先作用 $\bar\partial$ 再取共轭。`}>{R`\partial\overline\omega=\nosym{\overline{\bar\partial\omega}},\qquad\bar\partial\overline\omega=\nosym{\overline{\partial\omega}}`}</Eq>
        <Eq n="8.42c" say={R`$\partial$ 满足与 $\dd$ 相同的分次 Leibniz 律。`}>{R`\partial(\omega\wedge\xi)=\partial\omega\wedge\xi+(-1)^q\omega\wedge\partial\xi`}</Eq>
        <Eq n="8.42d" keyEq title={R`$\bar\partial$ 的 Leibniz 律`} say={R`$\bar\partial$ 同样满足分次 Leibniz 律：越过 $q$ 形式时带出 $(-1)^q$。`}>{R`\bar\partial(\omega\wedge\xi)=\bar\partial\omega\wedge\xi+(-1)^q\omega\wedge\bar\partial\xi.`}</Eq>
        <Box kind="warning" title="勘误：定理 8.1 证明 (b) 中漏印的共轭号（p.343）">{R`原书写"注意 $\partial\omega$ 与 $\nosym{\overline{\bar\partial\omega}}$ 的双次为 $(s+1,r)$"，第一个应为 $\partial\overline\omega$（$\partial\omega$ 的双次是 $(r+1,s)$）。正文已改正。`}</Box>
        <Tx>{R`定理 8.1 (a) 包含三个独立的恒等式：$\partial^2=0$、$\bar\partial^2=0$、$\partial\bar\partial=-\bar\partial\partial$。最后一个在 §8.4 推导 Ricci 形式时会反复用到：$\partial\bar\partial=-\frac12\dd(\partial-\bar\partial)$，见 \eqref{8.79} 后的讨论。`}</Tx>
        <Stmt id="D8.3" />
        <Tx>{R`看卡 $(U,\varphi)$ 上的全纯 0 形式 $f\in\mathcal{F}(U)^\C$。条件 $\bar\partial f=0$ 变成`}</Tx>
        <Eq n="8.43" keyEq title="Cauchy–Riemann 方程的复形式" say={R`函数被所有 $\partial/\partial\bar z$ 消灭——这正是多变量 Cauchy–Riemann 方程的紧凑写法。`}>{R`\frac{\partial f}{\partial\bar z^\lambda}=0\qquad1\le\lambda\le m=\dim_\C M.`}</Eq>
        <Tx>{R`全纯 0 形式就是全纯函数 $f\in\mathcal{F}(U)^\C$。设 $\omega\in\Omega^{r,0}(M)$，$1\le r\le m=\dim_\C M$。在卡 $(U,\varphi)$ 上`}</Tx>
        <Eq n="8.44" say={R`$(r,0)$ 形式只含 $\dd z$，没有 $\dd\bar z$。`}>{R`\omega=\frac{1}{r!}\omega_{\mu_1\ldots\mu_r}\dd z^{\mu_1}\wedge\ldots\wedge\dd z^{\mu_r}.`}</Eq>
        <Tx>{R`则 $\bar\partial\omega=0$ 当且仅当

$$\frac{\partial}{\partial\bar z^\lambda}\omega_{\mu_1\ldots\mu_r}=0,$$

即 $\omega_{\mu_1\ldots\mu_r}$ 是 $U$ 上的全纯函数。

设 $\dim_\C M=m$。$\C$ 线性映射的序列`}</Tx>
        <Eq n="8.45" keyEq title="Dolbeault 复形" say={R`固定全纯次数 $r$，让反全纯次数从 $0$ 走到 $m$，每一步用 $\bar\partial$ 连接；因为 $\bar\partial^2=0$，这是一个复形。`}>{R`\begin{aligned}&\Omega^{r,0}(M)\xrightarrow{\ \bar\partial\ }\Omega^{r,1}(M)\xrightarrow{\ \bar\partial\ }\cdots\\&\cdots\xrightarrow{\ \bar\partial\ }\Omega^{r,m-1}(M)\xrightarrow{\ \bar\partial\ }\Omega^{r,m}(M)\end{aligned}`}</Eq>
        <Tx>{R`称为 **Dolbeault 复形**。注意 $\bar\partial^2=0$。$\bar\partial$ 闭的 $(r,s)$ 形式（满足 $\bar\partial\omega=0$ 的 $\omega\in\Omega^{r,s}(M)$）的集合称为 **$(r,s)$ 上闭链**（cocycle），记为 $Z^{r,s}_{\bar\partial}(M)$。$\bar\partial$ 恰当的 $(r,s)$ 形式（对某个 $\eta\in\Omega^{r,s-1}(M)$ 有 $\omega=\bar\partial\eta$ 的 $\omega\in\Omega^{r,s}(M)$）的集合称为 **$(r,s)$ 上边缘**（coboundary），记为 $B^{r,s}_{\bar\partial}(M)$。复向量空间`}</Tx>
        <Eq n="8.46" keyEq title={R`$\bar\partial$ 上同调群`} say={R`$\bar\partial$ 闭的 $(r,s)$ 形式模去 $\bar\partial$ 恰当的形式：度量"能被 $\bar\partial$ 消灭、却不是别人的 $\bar\partial$"的形式有多少。`}>{R`H^{r,s}_{\bar\partial}(M)\equiv Z^{r,s}_{\bar\partial}(M)/B^{r,s}_{\bar\partial}(M)`}</Eq>
        <Tx>{R`称为第 $(r,s)$ 个 **$\bar\partial$ 上同调群**，见 §8.6。

**最简单的例子。**$H^{0,0}_{\bar\partial}(M)$ 是全纯函数的空间 $\mathcal{O}(M)$（$s=0$ 时没有上边缘）；对紧连通复流形，由 \secref{8.2.1} 的定理它是 $\C$，$b^{0,0}=1$。$H^{r,0}_{\bar\partial}(M)$ 是全纯 $r$ 形式的空间。`}</Tx>
        <Box kind="physics" title={R`为什么 $\bar\partial$ 上同调比 de Rham 上同调更"细"`}>{R`de Rham 上同调只依赖于流形的拓扑；$\bar\partial$ 上同调依赖于复结构。例如例 8.2 中所有复环面拓扑相同，但"全纯一形式" $\dd z$ 在不同的 $\tau$ 下是不同的对象：它在两条闭曲线上的积分（周期）是 $1$ 与 $\tau$。Hodge 理论（§8.6）说：在紧 Kähler 流形上，de Rham 上同调恰好按 $(r,s)$ 分解，$H^1(T^2)^\C=H^{1,0}\oplus H^{0,1}$，而复结构就藏在"哪一个实上同调类是 $(1,0)$ 型的"这一信息里。`}</Box>
      </Sub>
    </Sec>);
}
