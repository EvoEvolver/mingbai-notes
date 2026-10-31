// §7.8 非坐标基 —— 式 (7.131)–(7.167)，定理 7.3，例 7.13–7.15，习题 7.19
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, C } from "@kit";

const R = String.raw;

export function Sec78() {
  return (
    <Sec n="7.8" title="Non-coordinate bases" zh="非坐标基"
      gist={R`用正交归一标架 $\hat e_\alpha=e_\alpha{}^\mu\partial_\mu$、对偶 $\hat\theta^\alpha=e^\alpha{}_\mu\dd x^\mu$ 代替坐标基（vielbein）→ 标架之间有非零李括号 $c_{\alpha\beta}{}^\gamma$ → 联络一形式 $\omega^\alpha{}_\beta$，Cartan 结构方程 $\dd\hat\theta+\omega\wedge\hat\theta=T$、$\dd\omega+\omega\wedge\omega=R$（\sref{T7.3}）→ 局部标架转动 $\Lambda\in\mathrm{SO}(m)$ 下 $\omega$ 像规范势一样变换、$R$ 协变 → Levi-Civita 条件：$\omega_{\alpha\beta}=-\omega_{\beta\alpha}$ 与 $\dd\hat\theta^\alpha+\omega^\alpha{}_\beta\wedge\hat\theta^\beta=0$ → 球面、Schwarzschild 的曲率。`}
      why={R`正交标架让度规变成常数 $\delta_{\alpha\beta}$，所有"弯曲"都转移到联络一形式上；计算曲率只需外微分，比 Christoffel 符号快得多。旋量必须在正交标架中定义（§7.10.3），而 $\omega$ 的规范变换律正是第 10 章纤维丛联络的原型。`}
      gives={["7.131", "7.135", "7.136b", "7.142", "7.145", "7.146a", "7.146b", "7.152", "7.155", "7.156", "7.166", "7.167"]}>
      <p className="muted">本节概念：<C id="cartan" /></p>
      <Sub n="7.8.1" title="Definitions" zh="定义">
        <Tx>{R`在坐标基中，$T_pM$ 由 $\{e_\mu\}=\{\partial/\partial x^\mu\}$ 张成，$T^*_pM$ 由 $\{\dd x^\mu\}$ 张成。若 $M$ 还带有度规 $g$，就有另一种选择。考虑线性组合`}</Tx>
        <Eq n="7.131" keyEq title="非坐标标架" say={R`非坐标标架：在每点用一个可逆矩阵把坐标基"转"成一组新基，矩阵元就是 vielbein。`}>{R`\hat e_\alpha=e_\alpha{}^\mu\frac{\partial}{\partial x^\mu}\qquad\{e_\alpha{}^\mu\}\in\mathrm{GL}(m,\R)`}</Eq>
        <Tx>{R`其中 $\det e_\alpha{}^\mu>0$。换言之，$\{\hat e_\alpha\}$ 是把基 $\{e_\mu\}$ 作保定向的 $\mathrm{GL}(m,\R)$"转动"得到的基向量标架。我们要求 $\{\hat e_\alpha\}$ 关于 $g$ 正交归一：`}</Tx>
        <Eq n="7.132a" say={R`正交归一条件：标架向量两两内积为 $\delta_{\alpha\beta}$。`}>{R`g(\hat e_\alpha,\hat e_\beta)=e_\alpha{}^\mu e_\beta{}^\nu g_{\mu\nu}=\delta_{\alpha\beta}.`}</Eq>
        <Tx>{R`若流形是 Lorentz 的，$\delta_{\alpha\beta}$ 换成 $\eta_{\alpha\beta}$。容易把 \eqref{7.132a} 反过来：`}</Tx>
        <Eq n="7.132b" say={R`反过来，度规由 vielbein 的"平方"给出：$g=e^{\mathrm t}\delta e$。`}>{R`g_{\mu\nu}=e^\alpha{}_\mu e^\beta{}_\nu\delta_{\alpha\beta}`}</Eq>
        <Tx>{R`其中 $e^\alpha{}_\mu$ 是 $e_\alpha{}^\mu$ 的逆：$e^\alpha{}_\mu e_\alpha{}^\nu=\delta_\mu{}^\nu$，$e^\alpha{}_\mu e_\beta{}^\mu=\delta^\alpha{}_\beta$。［矩阵与其逆用了同一个字母。只要明确写出指标就不会混淆。］由于向量 $V$ 与基的选取无关，$V=V^\mu e_\mu=V^\alpha\hat e_\alpha=V^\alpha e_\alpha{}^\mu e_\mu$，于是`}</Tx>
        <Eq n="7.133" say={R`同一向量在两套基下的分量用 vielbein 互相换算。`}>{R`V^\mu=V^\alpha e_\alpha{}^\mu\qquad V^\alpha=e^\alpha{}_\mu V^\mu.`}</Eq>
        <Tx>{R`引入由 $\langle\hat\theta^\alpha,\hat e_\beta\rangle=\delta^\alpha{}_\beta$ 定义的对偶基 $\{\hat\theta^\alpha\}$，它为`}</Tx>
        <Eq n="7.134" say={R`对偶的正交一形式基。`}>{R`\hat\theta^\alpha=e^\alpha{}_\mu\dd x^\mu.`}</Eq>
        <Tx>{R`用 $\{\hat\theta^\alpha\}$ 表示，度规为`}</Tx>
        <Eq n="7.135" say={R`在正交标架里，度规分量处处是单位矩阵：弯曲被"藏"进了标架如何随点转动之中。`}>{R`g=g_{\mu\nu}\dd x^\mu\otimes\dd x^\nu=\delta_{\alpha\beta}\hat\theta^\alpha\otimes\hat\theta^\beta.`}</Eq>
        <Tx>{R`基 $\{\hat e_\alpha\}$ 与 $\{\hat\theta^\alpha\}$ 称为**非坐标基**（non-coordinate bases）。我们用 $\kappa,\lambda,\mu,\nu,\ldots$（$\alpha,\beta,\gamma,\delta,\ldots$）表示坐标（非坐标）基的指标。系数 $e_\alpha{}^\mu$ 在四维时称为**四维标架**（vierbein），在多维时称为**多维标架**（vielbein）。非坐标基的李括号不为零。若 $\{\hat e_\alpha\}$ 由 \eqref{7.131} 给出，它们满足`}</Tx>
        <Eq n="7.136a" say={R`非坐标基一般不可交换——它们不是任何坐标系的坐标基。`}>{R`[\hat e_\alpha,\hat e_\beta]|_p=c_{\alpha\beta}{}^\gamma(p)\hat e_\gamma|_p`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="7.136b" say={R`"结构函数" $c$ 由 vielbein 的导数算出（李括号的坐标公式）。`}>{R`c_{\alpha\beta}{}^\gamma(p)=e^\gamma{}_\nu[e_\alpha{}^\mu\partial_\mu e_\beta{}^\nu-e_\beta{}^\mu\partial_\mu e_\alpha{}^\nu](p).`}</Eq>
        <Box kind="example" n="7.13" title={R`$S^2$ 的 zweibein`}>
          <Tx>{R`$S^2$ 的标准度规为`}</Tx>
          <Eq n="7.137" say={R`把球面度规写成两个正交一形式的平方和。`}>{R`g=\dd\theta\otimes\dd\theta+\sin^2\theta\,\dd\phi\otimes\dd\phi=\hat\theta^1\otimes\hat\theta^1+\hat\theta^2\otimes\hat\theta^2`}</Eq>
          <Tx>{R`其中 $\hat\theta^1=\dd\theta$、$\hat\theta^2=\sin\theta\,\dd\phi$。"二维标架"（zweibein）为`}</Tx>
          <Eq n="7.138" say={R`球面 zweibein 的分量：角向的单位一形式要乘纬圈半径 $\sin\theta$。`}>{R`e^1{}_\theta=1\qquad e^1{}_\phi=0\qquad e^2{}_\theta=0\qquad e^2{}_\phi=\sin\theta.`}</Eq>
          <Tx>{R`$c_{\alpha\beta}{}^\gamma$ 的非零分量为 $c_{12}{}^2=-c_{21}{}^2=-\cot\theta$。［$\hat e_1=\partial_\theta$，$\hat e_2=\sin^{-1}\theta\,\partial_\phi$，$[\hat e_1,\hat e_2]=\partial_\theta(\sin^{-1}\theta)\partial_\phi=-\cot\theta\,\hat e_2$。］`}</Tx>
        </Box>
        <Exercise n="7.19" title="vielbein 恒等式与弯曲时空的 Dirac 矩阵" level="★"
          hint={R`把 \eqref{7.132b} 写成矩阵 $g=E^{\mathrm t}E$（$E_{\alpha\mu}=e^\alpha{}_\mu$），取逆。(b)：$\gamma^\mu$ 是 $\gamma^\alpha$ 的常系数（每点）线性组合。`}
          solution={R`**(a)** 记 $E$ 为矩阵 $(e^\alpha{}_\mu)$，$E^{-1}=(e_\alpha{}^\mu)$。\eqref{7.132b} 即 $g=E^{\mathrm t}\delta E$，取逆 $g^{-1}=E^{-1}\delta^{-1}(E^{-1})^{\mathrm t}$：

$$g^{\mu\nu}=\delta^{\alpha\beta}e_\alpha{}^\mu e_\beta{}^\nu.$$

两边乘 $e^\gamma{}_\mu e^\delta{}_\nu$ 并用 $e^\gamma{}_\mu e_\alpha{}^\mu=\delta^\gamma{}_\alpha$：

$$g^{\mu\nu}e^\gamma{}_\mu e^\delta{}_\nu=\delta^{\alpha\beta}\delta^\gamma{}_\alpha\delta^\delta{}_\beta=\delta^{\gamma\delta}.$$

这正是 \eqref{7.139} 的两式。（Lorentz 情形把 $\delta$ 换成 $\eta$。）

**(b)**
$$\{\gamma^\mu,\gamma^\nu\}=e_\alpha{}^\mu e_\beta{}^\nu\{\gamma^\alpha,\gamma^\beta\}=2\eta^{\alpha\beta}e_\alpha{}^\mu e_\beta{}^\nu=2g^{\mu\nu},$$

最后一步用 (a) 的 Lorentz 版本。所以 $\gamma^\mu(x)$ 满足弯曲时空的 Clifford 代数——这是在 §7.10.3 中构造弯曲时空 Dirac 作用量的第一步。`}>
          {R`(a) 验证恒等式`}
        </Exercise>
        <Eq n="7.139" say={R`vielbein 也把逆度规化成单位矩阵（及其逆关系）。`}>{R`\delta^{\alpha\beta}=g^{\mu\nu}e^\alpha{}_\mu e^\beta{}_\nu\qquad g^{\mu\nu}=\delta^{\alpha\beta}e_\alpha{}^\mu e_\beta{}^\nu.`}</Eq>
        <Tx>{R`(b) 设 $\gamma^\alpha$ 是 Minkowski 时空的 Dirac 矩阵，满足 $\{\gamma^\alpha,\gamma^\beta\}=2\eta^{\alpha\beta}$。定义 Dirac 矩阵在弯曲时空中的对应物 $\gamma^\mu\equiv e_\alpha{}^\mu\gamma^\alpha$。证明`}</Tx>
        <Eq n="7.140" say={R`弯曲时空的 Dirac 矩阵满足以 $g^{\mu\nu}$ 为度规的 Clifford 代数。`}>{R`\{\gamma^\mu,\gamma^\nu\}=2g^{\mu\nu}.`}</Eq>
      </Sub>

      <Sub n="7.8.2" title="Cartan's structure equations" zh="Cartan 结构方程">
        <Tx>{R`§7.3 中曲率张量 $R$ 与挠率张量 $T$ 定义为

$$R(X,Y)Z=\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z,\qquad T(X,Y)=\nabla_XY-\nabla_YX-[X,Y].$$

设 $\{\hat e_\alpha\}$ 是非坐标基，$\{\hat\theta^\alpha\}$ 是对偶基。向量场 $\{\hat e_\alpha\}$ 满足 $[\hat e_\alpha,\hat e_\beta]=c_{\alpha\beta}{}^\gamma\hat e_\gamma$。定义关于基 $\{\hat e_\alpha\}$ 的联络系数`}</Tx>
        <Eq n="7.141" say={R`在非坐标基中定义联络系数：沿 $\hat e_\alpha$ 对 $\hat e_\beta$ 求导。`}>{R`\nabla_\alpha\hat e_\beta\equiv\nabla_{\hat e_\alpha}\hat e_\beta=\Gamma^\gamma{}_{\alpha\beta}\hat e_\gamma.`}</Eq>
        <Tx>{R`令 $\hat e_\alpha=e_\alpha{}^\mu e_\mu$。则 \eqref{7.141} 成为 $e_\alpha{}^\mu(\partial_\mu e_\beta{}^\nu+e_\beta{}^\lambda\Gamma^\nu{}_{\mu\lambda})e_\nu=\Gamma^\gamma{}_{\alpha\beta}e_\gamma{}^\nu e_\nu$，由此得`}</Tx>
        <Eq n="7.142" say={R`非坐标基的联络系数 = 把标架向量的协变导数投影回标架。`}>{R`\Gamma^\gamma{}_{\alpha\beta}=e^\gamma{}_\nu e_\alpha{}^\mu(\partial_\mu e_\beta{}^\nu+e_\beta{}^\lambda\Gamma^\nu{}_{\mu\lambda})=e^\gamma{}_\nu e_\alpha{}^\mu\nabla_\mu e_\beta{}^\nu.`}</Eq>
        <Tx>{R`$T$ 与 $R$ 在这个基中的分量为`}</Tx>
        <Eq n="7.143" say={R`非坐标基中的挠率：$\Gamma$ 的反对称部分还要减去标架的李括号系数。`}>{R`\begin{aligned}T^\alpha{}_{\beta\gamma}&=\langle\hat\theta^\alpha,T(\hat e_\beta,\hat e_\gamma)\rangle=\langle\hat\theta^\alpha,\nabla_\beta\hat e_\gamma-\nabla_\gamma\hat e_\beta-[\hat e_\beta,\hat e_\gamma]\rangle\\&=\Gamma^\alpha{}_{\beta\gamma}-\Gamma^\alpha{}_{\gamma\beta}-c_{\beta\gamma}{}^\alpha.\end{aligned}`}</Eq>
        <Eq n="7.144" say={R`非坐标基中的曲率分量：与 \eqref{7.42} 同构，只多一项标架李括号的修正 $-c\Gamma$。`}>{R`\begin{aligned}R^\alpha{}_{\beta\gamma\delta}&=\langle\hat\theta^\alpha,\nabla_\gamma\nabla_\delta\hat e_\beta-\nabla_\delta\nabla_\gamma\hat e_\beta-\nabla_{[\hat e_\gamma,\hat e_\delta]}\hat e_\beta\rangle\\&=\langle\hat\theta^\alpha,\nabla_\gamma(\Gamma^\varepsilon{}_{\delta\beta}\hat e_\varepsilon)-\nabla_\delta(\Gamma^\varepsilon{}_{\gamma\beta}\hat e_\varepsilon)-c_{\gamma\delta}{}^\varepsilon\nabla_\varepsilon\hat e_\beta\rangle\\&=\hat e_\gamma[\Gamma^\alpha{}_{\delta\beta}]-\hat e_\delta[\Gamma^\alpha{}_{\gamma\beta}]+\Gamma^\varepsilon{}_{\delta\beta}\Gamma^\alpha{}_{\gamma\varepsilon}-\Gamma^\varepsilon{}_{\gamma\beta}\Gamma^\alpha{}_{\delta\varepsilon}-c_{\gamma\delta}{}^\varepsilon\Gamma^\alpha{}_{\varepsilon\beta}.\end{aligned}`}</Eq>
        <Tx>{R`定义一个取值为矩阵的一形式 $\{\omega^\alpha{}_\beta\}$，称为**联络一形式**（connection one-form）：`}</Tx>
        <Eq n="7.145" keyEq title="联络一形式" say={R`联络一形式：把联络系数的"求导方向"指标收进一个一形式里，得到一个 $m\times m$ 的矩阵值一形式——它就是第 10 章规范势的前身。`}>{R`\omega^\alpha{}_\beta\equiv\Gamma^\alpha{}_{\gamma\beta}\hat\theta^\gamma.`}</Eq>
        <Stmt id="T7.3">
          <Proof steps={[
            { claim: R`(7.146a) 的左边作用在基向量 $\hat e_\gamma,\hat e_\delta$ 上：`, tex: R`\dd\hat\theta^\alpha(\hat e_\gamma,\hat e_\delta)+[\langle\omega^\alpha{}_\beta,\hat e_\gamma\rangle\langle\hat\theta^\beta,\hat e_\delta\rangle-\langle\hat\theta^\beta,\hat e_\gamma\rangle\langle\omega^\alpha{}_\beta,\hat e_\delta\rangle]` },
            { claim: R`用 \eqref{5.70}（一形式外微分的无坐标公式）：`, tex: R`=\{\hat e_\gamma[\langle\hat\theta^\alpha,\hat e_\delta\rangle]-\hat e_\delta[\langle\hat\theta^\alpha,\hat e_\gamma\rangle]-\langle\hat\theta^\alpha,[\hat e_\gamma,\hat e_\delta]\rangle\}+\{\langle\omega^\alpha{}_\delta,\hat e_\gamma\rangle-\langle\omega^\alpha{}_\gamma,\hat e_\delta\rangle\}=-c_{\gamma\delta}{}^\alpha+\Gamma^\alpha{}_{\gamma\delta}-\Gamma^\alpha{}_{\delta\gamma}=T^\alpha{}_{\gamma\delta}`, why: R`$\langle\hat\theta^\alpha,\hat e_\delta\rangle=\delta^\alpha{}_\delta$ 是常数，求导为零；最后一步是 \eqref{7.143}。`, uses: ["5.70", "7.143"] },
            { claim: R`右边作用在 $\hat e_\gamma,\hat e_\delta$ 上：$\frac12T^\alpha{}_{\beta\varepsilon}[\langle\hat\theta^\beta,\hat e_\gamma\rangle\langle\hat\theta^\varepsilon,\hat e_\delta\rangle-\langle\hat\theta^\varepsilon,\hat e_\gamma\rangle\langle\hat\theta^\beta,\hat e_\delta\rangle]=T^\alpha{}_{\gamma\delta}$。两边相等，(7.146a) 得证。` },
            { claim: R`**(7.146b)（原书留作习题，本站补全）**：左边的第一项作用在 $\hat e_\gamma,\hat e_\delta$ 上，再用 \eqref{5.70}：`, tex: R`\dd\omega^\alpha{}_\beta(\hat e_\gamma,\hat e_\delta)=\hat e_\gamma[\Gamma^\alpha{}_{\delta\beta}]-\hat e_\delta[\Gamma^\alpha{}_{\gamma\beta}]-c_{\gamma\delta}{}^\varepsilon\Gamma^\alpha{}_{\varepsilon\beta}`, why: R`$\langle\omega^\alpha{}_\beta,\hat e_\delta\rangle=\Gamma^\alpha{}_{\delta\beta}$，$\langle\omega^\alpha{}_\beta,[\hat e_\gamma,\hat e_\delta]\rangle=c_{\gamma\delta}{}^\varepsilon\Gamma^\alpha{}_{\varepsilon\beta}$。`, fill: true, uses: ["5.70"] },
            { claim: R`第二项：`, tex: R`(\omega^\alpha{}_\varepsilon\wedge\omega^\varepsilon{}_\beta)(\hat e_\gamma,\hat e_\delta)=\Gamma^\alpha{}_{\gamma\varepsilon}\Gamma^\varepsilon{}_{\delta\beta}-\Gamma^\alpha{}_{\delta\varepsilon}\Gamma^\varepsilon{}_{\gamma\beta}`, fill: true },
            { claim: R`两项相加正是 \eqref{7.144}，即 $R^\alpha{}_{\beta\gamma\delta}=\frac12R^\alpha{}_{\beta\varepsilon\zeta}(\hat\theta^\varepsilon\wedge\hat\theta^\zeta)(\hat e_\gamma,\hat e_\delta)$。`, uses: ["7.144"], fill: true },
          ]} />
        </Stmt>
        <Eq n="7.146a" keyEq title="第一结构方程" say={R`第一结构方程：标架的外微分加上联络一形式的"旋转"，就是挠率二形式。`}>{R`\dd\hat\theta^\alpha+\omega^\alpha{}_\beta\wedge\hat\theta^\beta=T^\alpha`}</Eq>
        <Eq n="7.146b" keyEq title="第二结构方程" say={R`第二结构方程：曲率二形式 = $\dd\omega+\omega\wedge\omega$——与非 Abel 规范场强 $F=\dd A+A\wedge A$ 一模一样。`}>{R`\dd\omega^\alpha{}_\beta+\omega^\alpha{}_\gamma\wedge\omega^\gamma{}_\beta=R^\alpha{}_\beta`}</Eq>
        <Tx>{R`其中引入了**挠率二形式** $T^\alpha\equiv\frac12T^\alpha{}_{\beta\gamma}\hat\theta^\beta\wedge\hat\theta^\gamma$ 与**曲率二形式** $R^\alpha{}_\beta\equiv\frac12R^\alpha{}_{\beta\gamma\delta}\hat\theta^\gamma\wedge\hat\theta^\delta$。

对 \eqref{7.146a} 与 \eqref{7.146b} 求外微分（用 $\dd^2=0$ 并把 $\dd\hat\theta$、$\dd\omega$ 用结构方程代回），得到 **Bianchi 恒等式**`}</Tx>
        <Eq n="7.147a" say={R`第一 Bianchi 恒等式的形式写法：无挠时化为 $R^\alpha{}_\beta\wedge\hat\theta^\beta=0$，即 \eqref{7.81a}。`}>{R`\dd T^\alpha+\omega^\alpha{}_\beta\wedge T^\beta=R^\alpha{}_\beta\wedge\hat\theta^\beta`}</Eq>
        <Eq n="7.147b" say={R`第二 Bianchi 恒等式的形式写法：曲率的"协变外微分"为零，规范场论里的 $DF=0$。`}>{R`\dd R^\alpha{}_\beta+\omega^\alpha{}_\gamma\wedge R^\gamma{}_\beta-R^\alpha{}_\gamma\wedge\omega^\gamma{}_\beta=0.`}</Eq>
        <Tx>{R`它们是 \eqref{7.81a} 与 \eqref{7.81b} 的非坐标基版本。［例：$\dd$(7.146a) 给出 $\dd\omega^\alpha{}_\beta\wedge\hat\theta^\beta-\omega^\alpha{}_\beta\wedge\dd\hat\theta^\beta=\dd T^\alpha$；代入 $\dd\omega=R-\omega\wedge\omega$、$\dd\hat\theta=T-\omega\wedge\hat\theta$，$\omega\wedge\omega\wedge\hat\theta$ 项相消，即得 \eqref{7.147a}。］`}</Tx>
      </Sub>

      <Sub n="7.8.3" title="The local frame" zh="局部标架">
        <Tx>{R`在 $m$ 维 Riemann 流形中，度规张量 $g_{\mu\nu}$ 有 $m(m+1)/2$ 个自由度，而 vielbein $e^\alpha{}_\mu$ 有 $m^2$ 个自由度。有许多非坐标基给出同一个度规 $g$，它们之间相差一个**局部**正交转动：`}</Tx>
        <Eq n="7.148" say={R`在每点独立地转动正交标架，度规不变——这是一种局部（规范）对称性。`}>{R`\hat\theta^\alpha\longrightarrow\hat\theta'^\alpha(p)=\Lambda^\alpha{}_\beta(p)\hat\theta^\beta(p)`}</Eq>
        <Tx>{R`其中 $p$ 是任一点。vielbein 变换为`}</Tx>
        <Eq n="7.149" say={R`vielbein 的标架指标随局部转动变换。`}>{R`e^\alpha{}_\mu(p)\longrightarrow e'^\alpha{}_\mu(p)=\Lambda^\alpha{}_\beta(p)e^\beta{}_\mu(p).`}</Eq>
        <Tx>{R`与在坐标变换下变换的 $\kappa,\lambda,\mu,\nu,\ldots$ 不同，指标 $\alpha,\beta,\gamma,\ldots$ 在局部正交转动下变换，而在坐标变换下不变。由于度规张量在转动下不变，$\Lambda^\alpha{}_\beta$ 满足`}</Tx>
        <Eq n="7.150a" say={R`Riemann 情形：$\Lambda$ 是正交矩阵。`}>{R`\Lambda^\alpha{}_\beta\delta_{\alpha\delta}\Lambda^\delta{}_\gamma=\delta_{\beta\gamma}\qquad\text{若 }M\text{ 是 Riemann 流形}`}</Eq>
        <Eq n="7.150b" say={R`Lorentz 情形：$\Lambda$ 是局部 Lorentz 变换。`}>{R`\Lambda^\alpha{}_\beta\eta_{\alpha\delta}\Lambda^\delta{}_\gamma=\eta_{\beta\gamma}\qquad\text{若 }M\text{ 是 Lorentz 流形}.`}</Eq>
        <Tx>{R`这意味着：若 $M$ 是 $m$ 维 Riemann 流形，$\{\Lambda^\alpha{}_\beta(p)\}\in\mathrm{SO}(m)$；若 $M$ 是 Lorentz 流形，$\{\Lambda^\alpha{}_\beta(p)\}\in\mathrm{SO}(m-1,1)$（要求保定向）。这些李群的维数是 $m(m-1)/2=m^2-m(m+1)/2$，恰是 $e^\alpha{}_\mu$ 与 $g_{\mu\nu}$ 的自由度之差。在局部标架转动 $\Lambda^\alpha{}_\beta(p)$ 下，指标 $\alpha,\beta,\gamma,\delta,\ldots$ 被转动，而 $\kappa,\lambda,\mu,\nu,\ldots$（世界指标）不受影响。在转动 \eqref{7.148} 下，基向量变换为`}</Tx>
        <Eq n="7.151" say={R`对偶的标架向量用逆矩阵变换，保持 $\langle\hat\theta^\alpha,\hat e_\beta\rangle=\delta^\alpha{}_\beta$。`}>{R`\hat e_\alpha\longrightarrow\hat e'_\alpha=\hat e_\beta(\Lambda^{-1})^\beta{}_\alpha.`}</Eq>
        <Tx>{R`设 $t=t^\mu{}_\nu e_\mu\otimes\dd x^\nu$ 是 $(1,1)$ 型张量场。在基 $\{\hat e_\alpha\}$、$\{\hat\theta^\alpha\}$ 中 $t=t^\alpha{}_\beta\hat e_\alpha\otimes\hat\theta^\beta$，其中 $t^\alpha{}_\beta=e^\alpha{}_\mu e_\beta{}^\nu t^\mu{}_\nu$。若用新标架 $\{\hat e'_\alpha\}=\{\hat e_\beta(\Lambda^{-1})^\beta{}_\alpha\}$ 与 $\{\hat\theta'^\alpha\}=\{\Lambda^\alpha{}_\beta\hat\theta^\beta\}$，张量 $t$ 表示为

$$t=t'^\alpha{}_\beta\hat e'_\alpha\otimes\hat\theta'^\beta=t'^\alpha{}_\beta\hat e_\gamma(\Lambda^{-1})^\gamma{}_\alpha\otimes\Lambda^\beta{}_\delta\hat\theta^\delta$$

由此得变换规则

$$t^\alpha{}_\beta\longrightarrow t'^\alpha{}_\beta=\Lambda^\alpha{}_\gamma t^\gamma{}_\delta(\Lambda^{-1})^\delta{}_\beta.$$

总结：上（下）非坐标指标用 $\Lambda$（$\Lambda^{-1}$）转动；从坐标基换到非坐标基则乘 vielbein。

由这些事实可以求联络一形式 $\omega^\alpha{}_\beta$ 的变换规则。挠率二形式变换为

$$T^\alpha\longrightarrow T'^\alpha=\dd\hat\theta'^\alpha+\omega'^\alpha{}_\beta\wedge\hat\theta'^\beta=\Lambda^\alpha{}_\beta[\dd\hat\theta^\beta+\omega^\beta{}_\gamma\wedge\hat\theta^\gamma].$$

代入 $\hat\theta'^\alpha=\Lambda^\alpha{}_\beta\hat\theta^\beta$（$\dd\hat\theta'^\alpha=\dd\Lambda^\alpha{}_\beta\wedge\hat\theta^\beta+\Lambda^\alpha{}_\beta\dd\hat\theta^\beta$），比较 $\hat\theta^\gamma$ 前的系数，得

$$\omega'^\alpha{}_\beta\Lambda^\beta{}_\gamma=\Lambda^\alpha{}_\delta\omega^\delta{}_\gamma-\dd\Lambda^\alpha{}_\gamma.$$

两边从右边乘 $\Lambda^{-1}$，得`}</Tx>
        <Eq n="7.152" keyEq title="联络一形式的变换" say={R`局部转动下，联络一形式除了"共轭"之外还多一个非齐次项 $\Lambda\,\dd\Lambda^{-1}$——这正是非 Abel 规范势的变换律。`}>{R`\omega'^\alpha{}_\beta=\Lambda^\alpha{}_\gamma\omega^\gamma{}_\delta(\Lambda^{-1})^\delta{}_\beta+\Lambda^\alpha{}_\gamma(\dd\Lambda^{-1})^\gamma{}_\beta`}</Eq>
        <Tx>{R`这里用了恒等式 $\dd\Lambda\,\Lambda^{-1}+\Lambda\,\dd\Lambda^{-1}=0$，它由 $\Lambda\Lambda^{-1}=I_m$ 求外微分得到。曲率二形式**齐次地**变换：`}</Tx>
        <Eq n="7.153" say={R`曲率二形式在局部转动下只是被共轭——非齐次项在 $\dd\omega+\omega\wedge\omega$ 中恰好相消。`}>{R`R^\alpha{}_\beta\longrightarrow R'^\alpha{}_\beta=\Lambda^\alpha{}_\gamma R^\gamma{}_\delta(\Lambda^{-1})^\delta{}_\beta`}</Eq>
        <Tx>{R`（$\Lambda$ 为局部标架转动。）`}</Tx>
      </Sub>

      <Sub n="7.8.4" title="The Levi-Civita connection in a non-coordinate basis" zh="非坐标基中的 Levi-Civita 联络">
        <Tx>{R`设 $\nabla$ 是 $(M,g)$ 上的 Levi-Civita 联络，它由度规相容 $\nabla_Xg=0$ 与挠率为零 $\Gamma^\lambda{}_{\mu\nu}-\Gamma^\lambda{}_{\nu\mu}=0$ 刻画。看看这些条件在现在的处理中怎样表达很有意思。分量 $\Gamma^\lambda{}_{\mu\nu}$ 与 $\Gamma^\alpha{}_{\beta\gamma}$ 由 \eqref{7.142} 联系。设 $(M,g)$ 是 Riemann 流形（若是 Lorentz 流形，把下面所有 $\delta_{\alpha\beta}$ 换成 $\eta_{\alpha\beta}$）。若用 $\delta_{\alpha\delta}\Gamma^\delta{}_{\beta\gamma}$ 定义 **Ricci 转动系数**（Ricci rotation coefficient）$\Gamma_{\alpha\beta\gamma}$，度规相容表示为`}</Tx>
        <Eq n="7.154" say={R`度规相容在正交标架中的含义：Ricci 转动系数关于第一、三个指标反对称——平行移动在正交标架里只是转动。`}>{R`\begin{aligned}\Gamma_{\alpha\beta\gamma}&=\delta_{\alpha\delta}e^\delta{}_\lambda e_\beta{}^\mu\nabla_\mu e_\gamma{}^\lambda=-\delta_{\alpha\delta}e_\gamma{}^\lambda e_\beta{}^\mu\nabla_\mu e^\delta{}_\lambda\\&=-\delta_{\gamma\delta}e^\delta{}_\lambda e_\beta{}^\mu\nabla_\mu e_\alpha{}^\lambda=-\Gamma_{\gamma\beta\alpha}\end{aligned}`}</Eq>
        <Tx>{R`这里用了 $\nabla_\mu g=0$。［第一步对 $e^\delta{}_\lambda e_\gamma{}^\lambda=\delta^\delta{}_\gamma$ 求导；第二步用 $\delta_{\alpha\delta}e^\delta{}_\lambda=g_{\lambda\nu}e_\alpha{}^\nu$（\eqref{7.132b} 与 \eqref{7.139}）把 $g$ 移过 $\nabla$。］用联络一形式 $\omega_{\alpha\beta}\equiv\delta_{\alpha\gamma}\omega^\gamma{}_\beta$ 表示，它成为`}</Tx>
        <Eq n="7.155" keyEq title={R`度规相容：$\omega$ 反对称`} say={R`度规相容 ⇔ 联络一形式（降指标后）是反对称矩阵，取值于 $\mathfrak{so}(m)$。`}>{R`\omega_{\alpha\beta}=-\omega_{\beta\alpha}.`}</Eq>
        <Tx>{R`无挠条件为`}</Tx>
        <Eq n="7.156" keyEq title="无挠条件" say={R`无挠条件：第一结构方程右边为零。它与 \eqref{7.155} 一起唯一决定 $\omega$——这是计算曲率的实用捷径。`}>{R`\dd\hat\theta^\alpha+\omega^\alpha{}_\beta\wedge\hat\theta^\beta=0.`}</Eq>
        <Tx>{R`读者应验证 \eqref{7.156} 意味着坐标基中联络系数的对称性 $\Gamma^\lambda{}_{\mu\nu}=\Gamma^\lambda{}_{\nu\mu}$。［由 \eqref{7.142}，$\omega^\alpha{}_\beta=e^\alpha{}_\nu(\dd e_\beta{}^\nu+e_\beta{}^\lambda\Gamma^\nu{}_{\mu\lambda}\dd x^\mu)$；代入 \eqref{7.156} 并用 $\dd\hat\theta^\alpha=\partial_\mu e^\alpha{}_\nu\,\dd x^\mu\wedge\dd x^\nu$ 与 $e^\alpha{}_\nu\dd e_\beta{}^\nu=-\dd e^\alpha{}_\nu\,e_\beta{}^\nu$，导数项相消，剩下 $e^\alpha{}_\nu\Gamma^\nu{}_{\mu\lambda}\dd x^\mu\wedge\dd x^\lambda=0$，即 $\Gamma^\nu{}_{[\mu\lambda]}=0$。］条件 \eqref{7.156} 使我们能计算基 $\{\hat e_\alpha\}$ 的 $c_{\alpha\beta}{}^\gamma$。看对易关系`}</Tx>
        <Eq n="7.157" say={R`无挠时，标架的李括号等于两个协变导数之差。`}>{R`c_{\alpha\beta}{}^\gamma\hat e_\gamma=[\hat e_\alpha,\hat e_\beta]=\nabla_\alpha\hat e_\beta-\nabla_\beta\hat e_\alpha`}</Eq>
        <Tx>{R`其中最后一个等号由无挠条件得到。由 \eqref{7.141}，`}</Tx>
        <Eq n="7.158" say={R`标架的结构函数完全由 Ricci 转动系数决定。`}>{R`c_{\alpha\beta}{}^\gamma=\Gamma^\gamma{}_{\alpha\beta}-\Gamma^\gamma{}_{\beta\alpha}.`}</Eq>
        <Tx>{R`把 \eqref{7.158} 代入 \eqref{7.144}，可以只用 $\Gamma$ 表示 Riemann 曲率张量：`}</Tx>
        <Eq n="7.159" say={R`Levi-Civita 联络在正交标架中的曲率，只用 Ricci 转动系数写出。`}>{R`\begin{aligned}R^\alpha{}_{\beta\gamma\delta}&=\hat e_\gamma[\Gamma^\alpha{}_{\delta\beta}]-\hat e_\delta[\Gamma^\alpha{}_{\gamma\beta}]+\Gamma^\varepsilon{}_{\delta\beta}\Gamma^\alpha{}_{\gamma\varepsilon}-\Gamma^\varepsilon{}_{\gamma\beta}\Gamma^\alpha{}_{\delta\varepsilon}\\&\quad-(\Gamma^\varepsilon{}_{\gamma\delta}-\Gamma^\varepsilon{}_{\delta\gamma})\Gamma^\alpha{}_{\varepsilon\beta}.\end{aligned}`}</Eq>
        <Box kind="example" n="7.14" title="用 Cartan 方程算球面的曲率">
          <Tx>{R`取例 7.13 的球面 $S^2$。$e^\alpha{}_\mu$ 的分量为`}</Tx>
          <Eq n="7.160" say={R`同 \eqref{7.138}。`}>{R`e^1{}_\theta=1\qquad e^1{}_\phi=0\qquad e^2{}_\theta=0\qquad e^2{}_\phi=\sin\theta.`}</Eq>
          <Tx>{R`首先注意度规条件意味着 $\omega_{11}=\omega_{22}=0$，因而 $\omega^1{}_1=\omega^2{}_2=0$。其他联络一形式由无挠条件求出：`}</Tx>
          <Eq n="7.161a" say={R`第一个标架一形式 $\dd\theta$ 的无挠条件。`}>{R`\dd(\dd\theta)+\omega^1{}_2\wedge(\sin\theta\,\dd\phi)=0`}</Eq>
          <Eq n="7.161b" say={R`第二个标架一形式 $\sin\theta\,\dd\phi$ 的无挠条件，它决定 $\omega^2{}_1$。`}>{R`\dd(\sin\theta\,\dd\phi)+\omega^2{}_1\wedge\dd\theta=0.`}</Eq>
          <Tx>{R`由 \eqref{7.161b}（$\dd(\sin\theta\,\dd\phi)=\cos\theta\,\dd\theta\wedge\dd\phi$）容易看出 $\omega^2{}_1=\cos\theta\,\dd\phi$，度规条件 $\omega_{12}=-\omega_{21}$ 给出 $\omega^1{}_2=-\cos\theta\,\dd\phi$（它满足 \eqref{7.161a}，因为 $\dd\phi\wedge\dd\phi=0$）。Riemann 张量也由 Cartan 结构方程求出：`}</Tx>
          <Eq n="7.162a" say={R`$R^1{}_1$：$\omega\wedge\omega$ 项为零（同一个 $\dd\phi$）。`}>{R`\omega^1{}_2\wedge\omega^2{}_1=\tfrac12R^1{}_{1\alpha\beta}\hat\theta^\alpha\wedge\hat\theta^\beta`}</Eq>
          <Eq n="7.162b" say={R`$R^1{}_2$ 只来自 $\dd\omega^1{}_2$。`}>{R`\dd\omega^1{}_2=\tfrac12R^1{}_{2\alpha\beta}\hat\theta^\alpha\wedge\hat\theta^\beta`}</Eq>
          <Eq n="7.162c" say={R`$R^2{}_1$ 只来自 $\dd\omega^2{}_1$。`}>{R`\dd\omega^2{}_1=\tfrac12R^2{}_{1\alpha\beta}\hat\theta^\alpha\wedge\hat\theta^\beta`}</Eq>
          <Eq n="7.162d" say={R`$R^2{}_2$ 同样为零。`}>{R`\omega^2{}_1\wedge\omega^1{}_2=\tfrac12R^2{}_{2\alpha\beta}\hat\theta^\alpha\wedge\hat\theta^\beta.`}</Eq>
          <Tx>{R`$\dd\omega^1{}_2=\sin\theta\,\dd\theta\wedge\dd\phi=\hat\theta^1\wedge\hat\theta^2$，所以非零分量为 $R^1{}_{212}=-R^1{}_{221}=1$，$R^2{}_{112}=-R^2{}_{121}=-1$。换到坐标基表示要用 $e_\alpha{}^\mu$ 与 $e^\alpha{}_\mu$。例如

$$R^\theta{}_{\phi\theta\phi}=e_\alpha{}^\theta e^\beta{}_\phi e^\gamma{}_\theta e^\delta{}_\phi R^\alpha{}_{\beta\gamma\delta}=\sin^2\theta\,R^1{}_{212}=\sin^2\theta.$$

（与 \eqref{7.42} 直接计算以及习题 7.11 的检验一致；由 \eqref{7.89}，$K=R_{\theta\phi\theta\phi}/\det g=\sin^2\theta/\sin^2\theta=1$。）`}</Tx>
        </Box>
        <Box kind="warning" title={R`勘误：例 7.14 的曲率分量（p.308）`}>{R`原书写 $R^1{}_{212}=-R^1{}_{221}=\sin\theta$、$R^2{}_{112}=-R^2{}_{121}=-\sin\theta$，以及 $R^\theta{}_{\phi\theta\phi}=\frac1{\sin^2\theta}R^1{}_{212}=\frac1{\sin\theta}$。

(1) 正交标架中的分量是相对 $\hat\theta^1\wedge\hat\theta^2=\sin\theta\,\dd\theta\wedge\dd\phi$ 读出的：$\dd\omega^1{}_2=\sin\theta\,\dd\theta\wedge\dd\phi=1\cdot\hat\theta^1\wedge\hat\theta^2$，所以 $R^1{}_{212}=1$（单位球面在正交标架中的曲率分量就是 $K=1$）；原书相对 $\dd\theta\wedge\dd\phi$ 读出了 $\sin\theta$。(2) 换回坐标基时，下指标乘 $e^\beta{}_\phi=\sin\theta$（两次），上指标乘 $e_1{}^\theta=1$，因子是 $\sin^2\theta$ 而非 $1/\sin^2\theta$。改正后 $R^\theta{}_{\phi\theta\phi}=\sin^2\theta$，与例 7.3(b) 的 $\Gamma$ 代入 \eqref{7.42} 所得一致：$\partial_\theta\Gamma^\theta{}_{\phi\phi}-\Gamma^\phi{}_{\theta\phi}\Gamma^\theta{}_{\phi\phi}=-\cos2\theta+\cos^2\theta=\sin^2\theta$。交互图 3 选"单位球面"即可数值核对。正文已改正。`}</Box>
        <Box kind="example" n="7.15" title="Schwarzschild 度规的曲率">
          <Tx>{R`Schwarzschild 度规为`}</Tx>
          <Eq n="7.163" say={R`Schwarzschild 度规写成四个正交一形式的平方（带 Minkowski 符号）。`}>{R`\begin{aligned}\dd s^2&=-\left(1-\frac{2M}{r}\right)\dd t^2+\frac{1}{1-\dfrac{2M}{r}}\dd r^2+r^2(\dd\theta^2+\sin^2\theta\,\dd\phi^2)\\&=-\hat\theta^0\otimes\hat\theta^0+\hat\theta^1\otimes\hat\theta^1+\hat\theta^2\otimes\hat\theta^2+\hat\theta^3\otimes\hat\theta^3\end{aligned}`}</Eq>
          <Tx>{R`其中`}</Tx>
          <Eq n="7.164" say={R`静止观者的正交标架：本征时间、本征径向距离与两个角向本征长度。`}>{R`\hat\theta^0=\left(1-\frac{2M}{r}\right)^{1/2}\dd t\qquad\hat\theta^1=\left(1-\frac{2M}{r}\right)^{-1/2}\dd r\qquad\hat\theta^2=r\,\dd\theta\qquad\hat\theta^3=r\sin\theta\,\dd\phi.`}</Eq>
          <Tx>{R`参数范围为 $0<2M<r$，$0\le\theta\le\pi$，$0\le\phi<2\pi$。度规条件给出 $\omega^0{}_0=\omega^1{}_1=\omega^2{}_2=\omega^3{}_3=0$，无挠条件为`}</Tx>
          <Eq n="7.165a" say={R`$\hat\theta^0$ 的无挠条件。`}>{R`\dd[(1-2M/r)^{1/2}\dd t]+\omega^0{}_\beta\wedge\hat\theta^\beta=0`}</Eq>
          <Eq n="7.165b" say={R`$\hat\theta^1$ 的无挠条件。`}>{R`\dd[(1-2M/r)^{-1/2}\dd r]+\omega^1{}_\beta\wedge\hat\theta^\beta=0`}</Eq>
          <Eq n="7.165c" say={R`$\hat\theta^2$ 的无挠条件。`}>{R`\dd(r\,\dd\theta)+\omega^2{}_\beta\wedge\hat\theta^\beta=0`}</Eq>
          <Eq n="7.165d" say={R`$\hat\theta^3$ 的无挠条件。`}>{R`\dd(r\sin\theta\,\dd\phi)+\omega^3{}_\beta\wedge\hat\theta^\beta=0.`}</Eq>
          <Tx>{R`联络一形式的非零分量为（Lorentz 符号下 $\omega_{\alpha\beta}=-\omega_{\beta\alpha}$ 意味着 $\omega^0{}_i=\omega^i{}_0$、$\omega^i{}_j=-\omega^j{}_i$）`}</Tx>
          <Eq n="7.166" say={R`Schwarzschild 的联络一形式：$\omega^0{}_1$ 是静止观者感受到的"引力加速度" $M/r^2$（乘红移因子）。`}>{R`\begin{aligned}&\omega^0{}_1=\omega^1{}_0=\frac M{r^2}\dd t\qquad\omega^2{}_1=-\omega^1{}_2=\left(1-\frac{2M}r\right)^{1/2}\dd\theta\\&\omega^3{}_1=-\omega^1{}_3=\left(1-\frac{2M}r\right)^{1/2}\sin\theta\,\dd\phi\qquad\omega^3{}_2=-\omega^2{}_3=\cos\theta\,\dd\phi.\end{aligned}`}</Eq>
          <Tx>{R`［验证 $\omega^0{}_1$：记 $A=(1-2M/r)^{1/2}$，$\dd\hat\theta^0=A'\dd r\wedge\dd t=A'\hat\theta^1\wedge\hat\theta^0$，所以 $\omega^0{}_1=A'\hat\theta^0=AA'\dd t=\frac{M}{r^2}\dd t$。］由结构方程求得曲率二形式为`}</Tx>
          <Eq n="7.167" keyEq title="Schwarzschild 的曲率二形式" say={R`潮汐力 $\propto M/r^3$：径向拉伸（$2M/r^3$）、横向挤压（$M/r^3$）——"意大利面化"。`}>{R`\begin{aligned}&R^0{}_1=R^1{}_0=\frac{2M}{r^3}\hat\theta^0\wedge\hat\theta^1\qquad R^0{}_2=R^2{}_0=-\frac{M}{r^3}\hat\theta^0\wedge\hat\theta^2\\&R^0{}_3=R^3{}_0=-\frac M{r^3}\hat\theta^0\wedge\hat\theta^3\qquad R^1{}_2=-R^2{}_1=-\frac M{r^3}\hat\theta^1\wedge\hat\theta^2\\&R^1{}_3=-R^3{}_1=-\frac M{r^3}\hat\theta^1\wedge\hat\theta^3\qquad R^2{}_3=-R^3{}_2=\frac{2M}{r^3}\hat\theta^2\wedge\hat\theta^3.\end{aligned}`}</Eq>
          <Box kind="warning" title={R`勘误：\eqref{7.167} 中 $R^0{}_2$ 的系数（p.309）`}>{R`原书印作 $R^0{}_2=-\frac{2M}{r^3}\hat\theta^0\wedge\hat\theta^2$。由结构方程，$R^0{}_2=\dd\omega^0{}_2+\omega^0{}_1\wedge\omega^1{}_2=\frac M{r^2}\dd t\wedge\big(-A\,\dd\theta\big)=-\frac{M}{r^3}\hat\theta^0\wedge\hat\theta^2$（$\dd t=\hat\theta^0/A$，$\dd\theta=\hat\theta^2/r$）。球对称也要求 $R^0{}_2$ 与原书的 $R^0{}_3=-\frac M{r^3}\hat\theta^0\wedge\hat\theta^3$ 系数相同；只有这样 Ricci 张量才为零：$\sym{Ric}{\mathit{Ric}}_{\hat0\hat0}=-\frac{2M}{r^3}+\frac M{r^3}+\frac M{r^3}=0$（习题 7.10(c)）。正文已改正。`}</Box>
        </Box>
      </Sub>
    </Sec>);
}
