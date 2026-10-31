// §10.4 相伴矢量丛上的协变导数 —— 式 (10.48)–(10.80)，定理 10.6，定义 10.6，例 10.4–10.6，习题 10.8–10.11
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, C } from "@kit";

const R = String.raw;
const LG = R`\sym{lie}{\mathfrak{g}}`;
const OM = R`\sym{forms}{\Omega}`;
const VF = R`\sym{vf}{\mathfrak{X}}`;
const GIN = R`\sym{gin}{g}`;

export function Sec104() {
  return (
    <Sec n="10.4" title="The covariant derivative on associated vector bundles" zh="相伴矢量丛上的协变导数"
      gist={R`相伴丛 $E=P\times_\rho V$ 的截面"平行"，当且仅当它相对于某条水平提升的分量不变；由此定义 $\nabla_Xs$，局部为 $X^\mu(\partial_\mu\xi^\alpha+\mathcal{A}_\mu{}^\alpha{}_\beta\xi^\beta)e_\alpha$，与水平提升和截面都无关。曲率重现为 $\nabla\nabla e_\alpha=e_\beta\otimes\mathcal{F}^\beta{}_\alpha$；保持内积 ⇔ 正交标架下联络反对称；Hermite 联络的曲率是 $(1,1)$ 形式。`}
      why={R`物理中的物质场（带电标量、夸克二重态……）不是主丛的点，而是相伴矢量丛的截面。要写出规范不变的作用量，必须对它们"协变地"求导。`}
      gives={["10.49", "10.50", "10.55", "10.56b", "10.58", "10.59", "10.61", "10.63", "10.67", "10.68b", "10.70", "10.73", "10.74", "10.75", "10.80"]}>
      <Tx>{R`主丛 $P(M,G)$ 上的联络一形式 $\omega$ 使我们能够以自然的方式在 $P$ 的相伴丛中定义协变导数。`}</Tx>
      <Sub1041 />
      <Sub1042 />
      <Sub1043 />
      <Sub1044 />
      <Sub1045 />
    </Sec>);
}

function Sub1041() {
  return (
    <Sub n="10.4.1" title="The covariant derivative on associated bundles" zh="相伴丛上的协变导数">
      <p className="muted">本小节概念：<C id="assoc_cov" /></p>
      <Tx>{R`**动机。**物理中常常需要对与某个主丛相伴的矢量丛的截面求导。例如 QED 中的带电标量场被视为与 U(1) 丛 $P(M,\mathrm{U}(1))$ 相伴的复线丛的截面。协变地对截面求导，对构造规范不变的作用量极其重要。

**设定。**设 $P(M,G)$ 是 $G$ 丛，投影为 $\pi_P$。取 $M$ 的坐标卡 $U_i$ 与其上的截面 $\sigma_i$，采用典范平凡化 $\phi_i(p,e)=\sigma_i(p)$。设 $\tilde\gamma$ 是曲线 $\gamma:[0,1]\to U_i$ 的水平提升，记 $\gamma(0)=p_0$、$\tilde\gamma(0)=u_0$。与 $P$ 相伴的矢量丛 $E=P\times_\rho V$ 投影为 $\pi_E$（见 §9.4）。设 $X\in T_pM$ 是 $\gamma(t)$ 在 $p_0$ 处的切向量，$s\in\Gamma(M,E)$ 是 $M$ 上的截面（或"向量场"）。把 $E$ 的元素写成 $[(u,v)]=\{(ug,\rho(g)^{-1}v)\mid u\in P,v\in V,g\in G\}$。取等价类的一个代表相当于**固定规范**。我们选取如下代表：`}</Tx>
      <Eq n="10.48" say={R`用局部截面作为"参照系"，相伴丛的截面就由一个 $V$ 值函数 $\xi(p)$ 表示——这就是物理学家写下的场。`}>{R`s(p)=[(\sigma_i(p),\xi(p))]`}</Eq>
      <Tx>{R`**什么叫"平行"。**现在定义 $E$ 中向量沿 $M$ 中曲线 $\gamma$ 的平行移动。天真的猜测"若 $\xi(\gamma(t))$ 沿 $\gamma(t)$ 为常数，则 $\xi$ 被平行移动"没有意义，因为这一陈述依赖于截面 $\sigma_i(p)$ 的选取。我们定义：一个向量被平行移动，如果它相对于 $\gamma$ 在 $P$ 中的**水平提升** $\tilde\gamma$ 为常数。换言之，截面 $s(\gamma(t))=[(\tilde\gamma(t),\eta(\gamma(t)))]$ 被平行移动，如果 $\eta$ 沿 $\gamma(t)$ 为常数。

这个定义是内禀的：若 $\tilde\gamma'(t)$ 是 $\gamma$ 的另一条水平提升，则可写成 $\tilde\gamma'(t)=\tilde\gamma(t)a$（$a\in G$，推论 10.1），于是（省去 $\rho$ 以简化记号）

$$[(\tilde\gamma(t),\eta(t))]=[(\tilde\gamma'(t)a^{-1},\eta(t))]=[(\tilde\gamma'(t),a^{-1}\eta(t))],$$

其中 $\eta(t)$ 表示 $\eta(\gamma(t))$。因此若 $\eta(t)$ 沿 $\gamma(t)$ 为常数，它的常数倍 $a^{-1}\eta(t)$ 也是。

**协变导数的定义。**设 $s(p)$ 是 $E$ 的截面。沿曲线 $\gamma:[0,1]\to M$，$s(t)=[(\tilde\gamma(t),\eta(t))]$，其中 $\tilde\gamma(t)$ 是 $\gamma(t)$ 的任意水平提升。$s(t)$ 沿 $\gamma(t)$ 在 $p_0=\gamma(0)$ 处的协变导数定义为`}</Tx>
      <Eq n="10.49" keyEq title="相伴丛上的协变导数" say={R`协变导数：用水平提升作为"不转动的参照系"，在这个参照系中对场的分量求普通导数。`}>{R`\nabla_Xs\equiv\Big[\Big(\tilde\gamma(0),\frac{\dd}{\dd t}\eta(\gamma(t))\Big|_{t=0}\Big)\Big]`}</Eq>
      <Tx>{R`其中 $X$ 是 $\gamma(t)$ 在 $p_0$ 处的切向量。要使协变导数真正内禀，它不应依赖额外的信息，即特定的水平提升。设 $\tilde\gamma'(t)=\tilde\gamma(t)a$（$a\in G$）是 $\gamma$ 的另一条水平提升。若选 $\tilde\gamma'(t)$ 作为水平提升，代表为 $[(\tilde\gamma'(t),a^{-1}\eta(t))]$，协变导数成为

$$\Big[\Big(\tilde\gamma'(0),\frac{\dd}{\dd t}\{a^{-1}\eta(t)\}\Big|_{t=0}\Big)\Big]=\Big[\Big(\tilde\gamma'(0)a^{-1},\frac{\dd}{\dd t}\eta(t)\Big|_{t=0}\Big)\Big],$$

与 \eqref{10.49} 一致（$a$ 是常元素，可以移进导数里再移到第一个分量上）。因此 $\nabla_Xs$ 只依赖于切向量 $X$ 与截面 $s\in\Gamma(M,E)$，而不依赖于水平提升 $\tilde\gamma(t)$。我们的定义只依赖于曲线 $\gamma$ 与联络，而不依赖于局部平凡化。（"只依赖于 $X$ 而不依赖于曲线的其余部分"由下面的局部公式 \eqref{10.58} 看得最清楚。）协变导数的局部形式便于实际计算，稍后给出。

**作为算子。**以上在一点 $p_0=\gamma(0)$ 处定义了协变导数。若 $X$ 是向量场，$\nabla_X$ 把截面 $s$ 映为新的截面 $\nabla_Xs$，所以 $\nabla_X$ 可视为映射 $\Gamma(M,E)\to\Gamma(M,E)$。更准确地，取 $X\in${VF}(M)$，它在 $p$ 处的值为 $X_p\in T_pM$。存在曲线 $\gamma(t)$，$\gamma(0)=p$，在 $p$ 处的切向量为 $X_p$；于是 $\gamma$ 的任意水平提升 $\tilde\gamma(t)$ 都可以用来计算协变导数 $\nabla_Xs|_p\equiv\nabla_{X_p}s$。我们还定义映射 $\nabla:\Gamma(M,E)\to\Gamma(M,E)\otimes${OM}^1(M)$：`}</Tx>
      <Eq n="10.50" say={R`把协变导数看成一个"向量值一形式"：喂给它一个方向 $X$，吐出沿该方向的协变导数。`}>{R`\nabla s(X)\equiv\nabla_Xs\qquad X\in${VF}(M)\qquad s\in\Gamma(M,E).`}</Eq>
      <Exercise n="10.8" title="协变导数的代数性质" level="★★"
        hint={R`先写出代表：$s=[(\sigma_i,\xi)]=[(\tilde\gamma g_i^{-1},\xi)]=[(\tilde\gamma,g_i^{-1}\xi)]$，所以 $\eta(t)=g_i(t)^{-1}\xi(\gamma(t))$。对 $t$ 求导并用 \eqref{10.13b}，得到一个显式依赖于 $X$ 的公式；六条性质都由它读出。`}
        solution={R`**关键公式。**取 $\sigma_i$ 使 $\sigma_i(p_0)=\tilde\gamma(0)$（$g_i(0)=e$）。沿 $\gamma$，$\tilde\gamma(t)=\sigma_i(t)g_i(t)$，故

$$s(t)=[(\sigma_i(t),\xi(t))]=[(\tilde\gamma(t)g_i(t)^{-1},\xi(t))]=[(\tilde\gamma(t),g_i(t)^{-1}\xi(t))],\qquad\eta(t)=g_i(t)^{-1}\xi(t).$$

由 \eqref{10.13b}，$\frac{\dd}{\dd t}g_i^{-1}=-g_i^{-1}\dot g_ig_i^{-1}=g_i^{-1}\mathcal{A}_i(X)$，在 $t=0$：

$$\frac{\dd\eta}{\dd t}\Big|_0=X[\xi]+\mathcal{A}_i(X)\xi,\qquad\nabla_Xs=[(\sigma_i(p_0),X[\xi]+\mathcal{A}_i(X)\xi)].\qquad(\ast)$$

（这同时就是习题 10.9 的 \eqref{10.58}。）右边只依赖于 $X$（而不依赖于曲线的其余部分），并且对 $X$ 线性。

**(10.51a)** 两个截面用同一个 $\sigma_i$ 表示：$a_1s_1+a_2s_2=[(\sigma_i,a_1\xi_1+a_2\xi_2)]$；$(\ast)$ 对 $\xi$ 线性。**(10.51b)** 对每个 $X$ 用 (a)。**(10.51c)** $(\ast)$ 中 $X[\xi]$ 与 $\mathcal{A}_i(X)$ 都对 $X$ 线性。**(10.51d)** $fs=[(\sigma_i,f\xi)]$，$X[f\xi]=X[f]\xi+fX[\xi]$，故 $\nabla_X(fs)=X[f]s+f\nabla_Xs$。**(10.51e)** 由 (d)：$\nabla(fs)(X)=X[f]s+f\nabla s(X)=(\dd f(X))s+f\nabla s(X)$。**(10.51f)** $(\ast)$ 对 $X$ 是 $\mathcal{F}(M)$-线性的：$(fX)[\xi]=fX[\xi]$、$\mathcal{A}_i(fX)=f\mathcal{A}_i(X)$。

也可以不用局部公式证明 (a)(d)：$\eta_{fs}(t)=f(\gamma(t))\eta_s(t)$，求导即得 $X[f]\eta+f\dot\eta$。`}>
        <Tx>{R`证明`}</Tx>
        <Eq n="10.51a" say={R`协变导数对截面是线性的。`}>{R`\nabla_X(a_1s_1+a_2s_2)=a_1\nabla_Xs_1+a_2\nabla_Xs_2`}</Eq>
        <Eq n="10.51b" say={R`作为一形式值的算子，$\nabla$ 对截面也是线性的。`}>{R`\nabla(a_1s_1+a_2s_2)=a_1\nabla s_1+a_2\nabla s_2`}</Eq>
        <Eq n="10.51c" say={R`协变导数对方向 $X$ 是线性的。`}>{R`\nabla_{(a_1X_1+a_2X_2)}s=a_1\nabla_{X_1}s+a_2\nabla_{X_2}s`}</Eq>
        <Eq n="10.51d" say={R`对函数乘以截面满足 Leibniz 律：函数部分求普通方向导数。`}>{R`\nabla_X(fs)=X[f]s+f\nabla_Xs`}</Eq>
        <Eq n="10.51e" say={R`Leibniz 律的一形式写法：函数的外微分乘截面，加上函数乘截面的协变导数。`}>{R`\nabla(fs)=(\dd f)s+f\nabla s`}</Eq>
        <Eq n="10.51f" say={R`协变导数对方向是"函数线性"的（张量性）：它只依赖于一点处的方向向量。`}>{R`\nabla_{fX}s=f\nabla_Xs`}</Eq>
        <Tx>{R`其中 $a_i\in\mathbb{R}$，$s,s'\in\Gamma(M,E)$，$f\in\mathcal{F}(M)$。`}</Tx>
      </Exercise>
    </Sub>);
}

function Sub1042() {
  return (
    <Sub n="10.4.2" title="A local expression for the covariant derivative" zh="协变导数的局部表达式">
      <Tx>{R`实际计算中，协变导数的局部坐标表示很方便。设 $P(M,G)$ 是 $G$ 丛，$E=P\times_\rho V$ 是相伴矢量丛。取局部截面 $\sigma_i\in\Gamma(U_i,P)$，采用典范平凡化 $\sigma_i(p)=\phi_i(p,e)$。设 $\gamma:[0,1]\to M$ 是 $U_i$ 中的曲线，$\tilde\gamma$ 是它的水平提升，写成`}</Tx>
      <Box kind="warning" title={R`勘误：相伴矢量丛的典型纤维（p.413）`}>{R`原书本小节开头写 "$E=P\times_\rho G$ 是相伴矢量丛"。相伴**矢量**丛的典型纤维是表示空间 $V$，应为 $E=P\times_\rho V$（与 \secref{10.4.1} 一致）。正文已改正。`}</Box>
      <Eq n="10.52" say={R`水平提升在典范平凡化下写成"截面乘以一个随时间变化的群元"。`}>{R`\tilde\gamma(t)=\sigma_i(t)g_i(t)`}</Eq>
      <Tx>{R`其中 $g_i(t)\equiv g_i(\gamma(t))\in G$。取 $E$ 的截面 $e_\alpha(p)\equiv[(\sigma_i(p),e_\alpha{}^0)]$，$e_\alpha{}^0$ 是 $V$ 的第 $\alpha$ 个基向量：$(e_\alpha{}^0)^\beta=(\delta_\alpha)^\beta$。则`}</Tx>
      <Eq n="10.53" say={R`以截面为参照系是常数的基矢量，换到水平提升这个"不转动的参照系"中看，就被 $g_i^{-1}$ 转动了。`}>{R`e_\alpha(t)=[(\tilde\gamma(t)g_i(t)^{-1},e_\alpha{}^0)]=[(\tilde\gamma(t),g_i(t)^{-1}e_\alpha{}^0)].`}</Eq>
      <Tx>{R`注意 $g_i(t)^{-1}$ 作用在 $e_\alpha{}^0$ 上，补偿了沿 $\gamma$ 的基的变化。$e_\alpha$ 的协变导数为`}</Tx>
      <Eq n="10.54" say={R`对基截面求协变导数：在水平参照系中对 $g_i^{-1}e_\alpha^0$ 求导，水平提升方程把 $\dot g_i$ 换成规范势，结果就是规范势作用在基矢量上。`}>{R`\begin{aligned}\nabla_Xe_\alpha&=\Big[\Big(\tilde\gamma(0),\frac{\dd}{\dd t}\{g_i(t)^{-1}e_\alpha{}^0\}\Big|_{t=0}\Big)\Big]=\Big[\Big(\tilde\gamma(0),-g_i(t)^{-1}\Big\{\frac{\dd}{\dd t}g_i(t)\Big\}g_i(t)^{-1}e_\alpha{}^0\Big|_{t=0}\Big)\Big]\\&=[(\tilde\gamma(0)g_i(0)^{-1},\mathcal{A}_i(X)e_\alpha{}^0)]\end{aligned}`}</Eq>
      <Tx>{R`其中用了 \eqref{10.13b}。由 \eqref{10.54} 得到局部表达式`}</Tx>
      <Eq n="10.55" say={R`基截面的协变导数在截面参照系中的分量，就是规范势（在表示 $\rho$ 中）作用于基矢量。`}>{R`\nabla_Xe_\alpha=[(\sigma_i(0),\mathcal{A}_i(X)e_\alpha{}^0)].`}</Eq>
      <Tx>{R`令 $\mathcal{A}_i=\mathcal{A}_{i\mu}\dd x^\mu=\mathcal{A}_{i\mu}{}^\alpha{}_\beta\dd x^\mu$，其中 $\mathcal{A}_{i\mu}{}^\alpha{}_\beta\equiv\mathcal{A}_{i\mu}{}^\gamma(T_\gamma)^\alpha{}_\beta$（这里 $T_\gamma$ 取表示 $\rho$ 中的矩阵）。\eqref{10.55} 的第二个分量为

$$\mathcal{A}_i(X)e_\alpha{}^0=\frac{\dd x^\mu}{\dd t}e_\beta{}^0\mathcal{A}_{i\mu}{}^\beta{}_\gamma\delta_\alpha{}^\gamma=\frac{\dd x^\mu}{\dd t}\mathcal{A}_{i\mu}{}^\beta{}_\alpha e_\beta{}^0.$$

代入 \eqref{10.55}，最后得到`}</Tx>
      <Eq n="10.56a" say={R`基截面沿曲线的协变导数：规范势矩阵的第 $\alpha$ 列，按切向量的分量加权。`}>{R`\nabla_Xe_\alpha=\Big[\Big(\sigma_i(0),\frac{\dd x^\mu}{\dd t}\mathcal{A}_{i\mu}{}^\beta{}_\alpha e_\beta{}^0\Big)\Big]=\frac{\dd x^\mu}{\dd t}\mathcal{A}_{i\mu}{}^\beta{}_\alpha e_\beta`}</Eq>
      <Tx>{R`或`}</Tx>
      <Eq n="10.56b" keyEq title="基截面的协变导数" say={R`基截面的协变导数是规范势矩阵（一形式）乘以基截面：联络在相伴丛上就是一个矩阵值一形式。`}>{R`\nabla e_\alpha=\mathcal{A}_i{}^\beta{}_\alpha e_\beta.`}</Eq>
      <Tx>{R`特别地，沿坐标曲线 $x^\mu$，`}</Tx>
      <Eq n="10.57" say={R`沿坐标方向的协变导数：规范势的 $\mu$ 分量作为矩阵作用在基截面上。`}>{R`\nabla_{\partial/\partial x^\mu}e_\alpha=\mathcal{A}_{i\mu}{}^\beta{}_\alpha e_\beta.`}</Eq>
      <Tx>{R`值得注意：主丛 $P$ 上的联络 $\mathcal{A}$ 完全确定了相伴丛 $E$ 上的协变导数（相差表示的选取）。`}</Tx>
      <Exercise n="10.9" title="一般截面的协变导数与它的规范无关性" level="★"
        hint={R`$s=\xi_i{}^\alpha e_\alpha$，用 \eqref{10.51d} 与 \eqref{10.56a}。`}
        solution={R`由 \eqref{10.51a}、\eqref{10.51d} 与 \eqref{10.56a}：

$$\nabla_Xs=\nabla_X(\xi_i{}^\alpha e_\alpha)=X[\xi_i{}^\alpha]e_\alpha+\xi_i{}^\beta\nabla_Xe_\beta=\frac{\dd x^\mu}{\dd t}\Big(\frac{\partial\xi_i{}^\alpha}{\partial x^\mu}+\mathcal{A}_{i\mu}{}^\alpha{}_\beta\xi_i{}^\beta\Big)e_\alpha,$$

这里第二项中把哑指标重新命名（$\nabla_Xe_\beta=\frac{\dd x^\mu}{\dd t}\mathcal{A}_{i\mu}{}^\alpha{}_\beta e_\alpha$）。写成 $(\sigma_i,\cdot)$ 的形式，就是 $[(\sigma_i(0),\frac{\dd\xi_i}{\dd t}+\mathcal{A}_i(X)\xi_i)]$。（习题 10.8 的解中由定义直接得到了同一公式 $(\ast)$。）`}>
        <Tx>{R`设 $s(p)=[(\sigma_i(p),\xi_i(p))]=\xi_i{}^\alpha(p)e_\alpha$ 是 $E$ 的一般截面，$\xi_i(p)=\xi_i{}^\alpha(p)e_\alpha{}^0$。用习题 10.8 的结果验证`}</Tx>
        <Eq n="10.58" keyEq title="协变导数的分量形式" say={R`物质场的协变导数 = 普通导数 + 规范势作用于场：这正是物理中的"最小耦合" $\partial_\mu\to\partial_\mu+\mathcal{A}_\mu$。`}>{R`\nabla_Xs=\Big[\Big(\sigma_i(0),\frac{\dd\xi_i}{\dd t}+\mathcal{A}_i(X)\xi_i\Big|_{t=0}\Big)\Big]=\frac{\dd x^\mu}{\dd t}\Big\{\frac{\partial\xi_i{}^\alpha}{\partial x^\mu}+\mathcal{A}_{i\mu}{}^\alpha{}_\beta\xi_i{}^\beta\Big\}e_\alpha.`}</Eq>
      </Exercise>
      <Tx>{R`**与局部平凡化无关。**按构造，协变导数与局部平凡化无关；这从 $\nabla_Xs$ 的局部形式也能看出。设 $\sigma_i(p)$、$\sigma_j(p)$ 是相交坐标卡 $U_i$、$U_j$ 上的局部截面，在 $U_i\cap U_j$ 上 $\sigma_j(p)=\sigma_i(p)t_{ij}(p)$。（同一截面在两种平凡化下的分量满足 $[(\sigma_i,\xi_i)]=[(\sigma_jt_{ij}^{-1},\xi_i)]=[(\sigma_j,t_{ij}^{-1}\xi_i)]$，即 $\xi_i=t_{ij}\xi_j$。）在 $i$ 平凡化下，协变导数为`}</Tx>
      <Eq n="10.59" say={R`同一个协变导数在两个规范下计算：规范势的变换律恰好抵消了场分量的变换，结果是同一个截面——协变导数是"协变"的。`}>{R`\begin{aligned}\nabla_Xs&=\Big[\Big(\sigma_i(0),\frac{\dd\xi_i}{\dd t}+\mathcal{A}_i(X)\xi_i\Big|_{t=0}\Big)\Big]=\Big[\Big(\sigma_j(0)\cdot t_{ij}^{-1},\frac{\dd}{\dd t}(t_{ij}\xi_j)+\mathcal{A}_i(X)t_{ij}\xi_j\Big|_{t=0}\Big)\Big]\\&=\Big[\Big(\sigma_j(0),\frac{\dd\xi_j}{\dd t}+\mathcal{A}_j(X)\xi_j\Big|_{t=0}\Big)\Big]\end{aligned}`}</Eq>
      <Derivation title="补全 (10.59) 的最后一步" collapsed steps={[
        { tex: R`[(\sigma_jt_{ij}^{-1},w)]=[(\sigma_j,t_{ij}^{-1}w)],\quad w=\dot t_{ij}\xi_j+t_{ij}\dot\xi_j+\mathcal{A}_i(X)t_{ij}\xi_j`, why: "把 $t_{ij}^{-1}$ 移到第二个分量。" },
        { tex: R`t_{ij}^{-1}w=\dot\xi_j+\big(t_{ij}^{-1}\mathcal{A}_i(X)t_{ij}+t_{ij}^{-1}\dd t_{ij}(X)\big)\xi_j=\dot\xi_j+\mathcal{A}_j(X)\xi_j`, why: R`$\dot t_{ij}=\dd t_{ij}(X)$，括号里正是相容条件 \eqref{10.9}。` },
      ]} />
      <Tx>{R`其中用了条件 \eqref{10.9}。\eqref{10.59} 的最后一行就是用 $j$ 平凡化表示的 $\nabla_Xs$。

我们已经发现，由 \eqref{10.49} 定义的协变导数既与水平提升无关，也与局部截面无关。规范势 $\mathcal{A}_i$ 在局部平凡化改变时恰好这样变换，使 $\nabla_Xs$ 是 $E$ 的良定义截面。在这个意义上，$\nabla_X$ 是相伴矢量丛上最自然的导数，与主丛 $P$ 上的联络相容。`}</Tx>
      <Box kind="example" n="10.4" title={R`切丛：重现 §7.2 的协变导数`}>
        <Tx>{R`我们来重现 §7.2 的结果。设 $FM$ 是 $M$ 上的标架丛，$TM$ 是它的相伴丛。注意 $FM=P(M,\mathrm{GL}(m,\mathbb{R}))$、$TM=FM\times_\rho\mathbb{R}^m$，其中 $m=\dim M$，$\rho$ 是 $\mathrm{GL}(m,\mathbb{R})$ 的 $m\times m$ 矩阵表示。$\sym{lie}{\mathfrak{gl}}(m,\mathbb{R})$ 的元素是 $m\times m$ 矩阵。把局部联络形式 $\mathcal{A}_i$ 改写为 $\Gamma^\alpha{}_{\mu\beta}\dd x^\mu$，即 $\mathcal{A}_{i\mu}{}^\alpha{}_\beta=\Gamma^\alpha{}_{\mu\beta}$。于是`}</Tx>
        <Eq n="10.60" say={R`标架丛上的联络在切丛上给出的协变导数：Christoffel 记号就是规范势矩阵的分量。`}>{R`\nabla_{\partial/\partial x^\mu}e_\alpha=[(\sigma_i(0),\Gamma_\mu e_\alpha{}^0)]=\Gamma^\beta{}_{\mu\alpha}e_\beta`}</Eq>
        <Tx>{R`这应与 \eqref{7.14} 比较（$\Gamma_\mu$ 表示矩阵 $(\Gamma^\alpha{}_{\mu\beta})$）。对一般截面（向量场）$s(p)=[(\sigma_i(p),X_i(p))]=X_i{}^\alpha(p)e_\alpha$，得到`}</Tx>
        <Eq n="10.61" say={R`向量场的协变导数：分量的偏导数加上 Christoffel 项——第 7 章的公式作为规范理论的特例重新出现。`}>{R`\nabla_{\partial/\partial x^\mu}s=\Big(\frac{\partial}{\partial x^\mu}X_i{}^\alpha+\Gamma^\alpha{}_{\mu\beta}X_i{}^\beta\Big)e_\alpha`}</Eq>
        <Tx>{R`这重现了 §7.2 的结果。显然 $\Gamma^\alpha{}_{\mu\beta}$ 中指标 $\alpha$、$\beta$ 与 $\mu$ 的角色截然不同：$\mu$ 是 $${OM}^1(M)$ 的指标（"形式指标"），而 $\alpha$、$\beta$ 是 $\sym{lie}{\mathfrak{gl}}(m,\mathbb{R})$ 的指标（"纤维指标"）。在一般的规范理论中，纤维指标与时空指标毫无关系；切丛的特殊之处在于两者恰好都取 $1,\ldots,m$，所以才能谈论挠率 $\Gamma^\alpha{}_{\mu\beta}-\Gamma^\alpha{}_{\beta\mu}$。`}</Tx>
      </Box>
      <Box kind="example" n="10.5" title="U(1) 规范场与复标量场">
        <Tx>{R`考虑与复标量场 $\phi$ 耦合的 U(1) 规范场。相关的纤维丛是 U(1) 丛 $P(M,\mathrm{U}(1))$ 与相伴丛 $E=P\times_\rho\mathbb{C}$，$\rho$ 是把 U(1) 元素自然地认同为复数。$\omega$ 的局部表达式为 $\mathcal{A}_i=\mathcal{A}_{i\mu}\dd x^\mu$，其中 $\mathcal{A}_{i\mu}=\mathcal{A}_i(\partial/\partial x^\mu)$ 是 Maxwell 理论的矢势（乘以 $\mathrm{i}$）。设 $\gamma$ 是 $M$ 中在 $\gamma(0)$ 处切向量为 $X$ 的曲线。取局部截面 $\sigma_i$，把 $\gamma$ 的水平提升写成 $\tilde\gamma(t)=\sigma_i(t)e^{\mathrm{i}\varphi(t)}$。若取 $1\in\mathbb{C}$ 为基向量，基截面为 $e=[(\sigma_i(p),1)]$。

设 $\phi(p)=[(\sigma_i(p),\Phi(p))]=\Phi(p)e$（$\Phi:M\to\mathbb{C}$）是 $E$ 的截面，它被认同为复标量场。相对于 $\tilde\gamma(t)$，截面为`}</Tx>
        <Eq n="10.62" say={R`在水平参照系中，复标量场的分量是 $\Phi$ 再乘上抵消截面"转动"的相位因子 $U^{-1}$。`}>{R`\phi(t)=\Phi(t)[(\tilde\gamma(t),U(t)^{-1})]`}</Eq>
        <Tx>{R`其中 $U(t)=e^{\mathrm{i}\varphi(t)}$。$\phi$ 沿 $\gamma$ 的协变导数为`}</Tx>
        <Eq n="10.63" say={R`U(1) 规范协变导数：标量场的方向导数加上矢势乘场——量子电动力学里的最小耦合。`}>{R`\begin{aligned}\nabla_X\phi&=\frac{\dd\Phi}{\dd t}[(\tilde\gamma(0),U(0)^{-1})]+\Phi(0)[(\tilde\gamma(0),U(0)^{-1}\mathcal{A}_i(X)\cdot1)]\\&=\Big(\frac{\dd\Phi}{\dd t}+\mathcal{A}_{i\mu}\Phi\frac{\dd x^\mu}{\dd t}\Big)e=X^\mu\Big(\frac{\partial\Phi}{\partial x^\mu}+\mathcal{A}_{i\mu}\Phi\Big)e.\end{aligned}`}</Eq>
        <Tx>{R`（第二项来自 $\frac{\dd}{\dd t}U^{-1}=U^{-1}\mathcal{A}_i(X)$，即 \eqref{10.13b}；$t=0$ 时 $U=1$，$\tilde\gamma(0)=\sigma_i(0)$。）用实矢势写，$\mathcal{A}_\mu=\mathrm{i}A_\mu$，就是 $(\partial_\mu+\mathrm{i}A_\mu)\Phi$；电荷为 $e$ 的场把 $A_\mu$ 换成 $\pm eA_\mu$（符号取决于约定，见 \secref{10.5.3} 的注记）。`}</Tx>
      </Box>
      <Box kind="example" n="10.6" title="SU(2) Yang–Mills 理论与二重态">
        <Tx>{R`考虑 $M$ 上的 SU(2) Yang–Mills 理论。相关的丛是 SU(2) 丛 $P(M,\mathrm{SU}(2))$ 与相伴丛 $E=P\times_\rho\mathbb{C}^2$，这里取二维表示。坐标卡 $U_i$ 上的规范势为`}</Tx>
        <Eq n="10.64" say={R`SU(2) 规范势：三个实分量乘以生成元 $\sigma_\alpha/2\mathrm{i}$（反 Hermite 的 Pauli 矩阵）。`}>{R`\mathcal{A}_i=\mathcal{A}_{i\mu}\dd x^\mu=A_{i\mu}{}^\alpha\Big(\frac{\sym{pauli}{\sigma}_\alpha}{2\mathrm{i}}\Big)\dd x^\mu`}</Eq>
        <Tx>{R`其中 $\sym{pauli}{\sigma}_\alpha/2\mathrm{i}$ 是 SU(2) 的生成元，$\sym{pauli}{\sigma}_\alpha$ 为 Pauli 矩阵。设 $e_\alpha{}^0$（$\alpha=1,2$）是 $\mathbb{C}^2$ 的基向量，考虑截面`}</Tx>
        <Eq n="10.65" say={R`二重态的基截面：在规范 $\sigma_i$ 下取 $\mathbb{C}^2$ 的标准基。`}>{R`e_\alpha(p)\equiv[(\sigma_i(p),e_\alpha{}^0)]`}</Eq>
        <Tx>{R`其中 $\sigma_i(p)$ 定义了 $P$ 在 $U_i$ 上的典范平凡化。设 $\phi(p)=[(\sigma_i(p),\Phi^\alpha(p)e_\alpha{}^0)]$ 是 $E$ 在 $M$ 上的截面。沿水平提升 $\tilde\gamma(t)=\sigma_i(p)U(t)$（$U(t)\in\mathrm{SU}(2)$），`}</Tx>
        <Eq n="10.66" say={R`在水平参照系中，二重态的分量被 $U(t)^{-1}$ 转动。`}>{R`\phi(t)=[(\tilde\gamma(t),U(t)^{-1}\Phi^\alpha(t)e_\alpha{}^0)].`}</Eq>
        <Tx>{R`$\phi$ 沿 $X=\dd/\dd t$ 的协变导数为`}</Tx>
        <Eq n="10.67" say={R`SU(2) 二重态的协变导数：分量的偏导数加上 $2\times2$ 规范势矩阵作用于二重态。`}>{R`\begin{aligned}\nabla_X\phi&=\Big[\Big(\tilde\gamma(0),U(0)^{-1}\frac{\dd\Phi^\alpha(0)}{\dd t}e_\alpha{}^0\Big)\Big]+[(\tilde\gamma(0),U(0)^{-1}\mathcal{A}_i(X)^\alpha{}_\beta\Phi^\beta(0)e_\alpha{}^0)]\\&=X^\mu\Big(\frac{\partial\Phi^\alpha}{\partial x^\mu}+\mathcal{A}_{i\mu}{}^\alpha{}_\beta\Phi^\beta\Big)e_\alpha\end{aligned}`}</Eq>
        <Tx>{R`最后一个等号用了 \eqref{10.13b}。`}</Tx>
      </Box>
      <Exercise n="10.10" title="伴随丛上的协变导数" level="★★"
        hint={R`$s=[(\sigma_i,V)]=[(\tilde\gamma g^{-1},V)]=[(\tilde\gamma,g^{-1}Vg)]$。对 $g^{-1}Vg$ 求导，用 $\dot g=-\mathcal{A}_i(X)g$ 与 $g(0)=e$。`}
        solution={R`**代表。**伴随丛中 $[(u,V)]=[(ug,\mathrm{Ad}_{g^{-1}}V)]=[(ug,g^{-1}Vg)]$。沿 $\gamma$，$\sigma_i(t)=\tilde\gamma(t)g(t)^{-1}$，所以

$$s(t)=[(\tilde\gamma(t)g(t)^{-1},V(t))]=[(\tilde\gamma(t),g(t)^{-1}V(t)g(t))]=[(\tilde\gamma(t),\mathrm{Ad}_{g(t)^{-1}}V(t))],$$

这正是 \eqref{10.68a} 的被导函数。

**求导。**$\frac{\dd}{\dd t}(g^{-1}Vg)=-g^{-1}\dot gg^{-1}Vg+g^{-1}\dot Vg+g^{-1}V\dot g$。在 $t=0$：$g=e$、$\dot g=-\mathcal{A}_i(X)$，得

$$\frac{\dd}{\dd t}\{\mathrm{Ad}_{g^{-1}}V\}\Big|_0=\mathcal{A}_i(X)V+\dot V-V\mathcal{A}_i(X)=\frac{\dd V}{\dd t}+[\mathcal{A}_i(X),V],$$

又 $\tilde\gamma(0)=\sigma_i(0)$，这就是 \eqref{10.68b} 的第一行。**分量：**$[\mathcal{A}_i(X),V]=X^\mu\mathcal{A}_{i\mu}{}^\beta V^\gamma[T_\beta,T_\gamma]=X^\mu f_{\beta\gamma}{}^\alpha\mathcal{A}_{i\mu}{}^\beta V^\gamma T_\alpha$，$\frac{\dd V}{\dd t}=X^\mu\partial_\mu V^\alpha T_\alpha$；而 $[(\sigma_i(0),T_\alpha)]$ 是伴随丛的基截面。

**解读：**这就是 Yang–Mills 理论中伴随表示场（如 Higgs 三重态、胶子场强本身）的协变导数 $\partial_\mu V+[\mathcal{A}_\mu,V]$，也与 \eqref{10.47} 的 $\mathcal{D}$ 一致。`}>
        <Tx>{R`考虑相伴伴随丛 $E_{${LG}}=P\times_{\mathrm{Ad}}${LG}$，其中 $G$ 在 $${LG}$ 上的作用是伴随作用 $V\mapsto\mathrm{Ad}_gV=gVg^{-1}$（$V\in${LG}$，$g\in G$）。取局部截面 $\sigma_i\in\Gamma(U_i,P)$，使 $\tilde\gamma(t)=\sigma_i(t)g(t)$。取 $E_{${LG}}$ 上的截面 $s(p)=[(\sigma_i(p),V(p))]$，$V(p)=V^\alpha(p)T_\alpha$，$\{T_\alpha\}$ 是 $${LG}$ 的基。定义协变导数 $\mathcal{D}_Xs$：`}</Tx>
        <Eq n="10.68a" say={R`伴随丛上的协变导数：把李代数值的场用水平参照系的群元共轭回来，再对时间求导。`}>{R`\mathcal{D}_Xs\equiv\Big[\Big(\tilde\gamma(0),\frac{\dd}{\dd t}\{\mathrm{Ad}_{g(t)^{-1}}V(t)\}\Big|_{t=0}\Big)\Big].`}</Eq>
        <Tx>{R`证明`}</Tx>
        <Eq n="10.68b" say={R`伴随表示场的协变导数：普通导数加上与规范势的对易子，分量上由结构常数给出。`}>{R`\mathcal{D}_Xs=\Big[\Big(\sigma_i(0),\frac{\dd V(t)}{\dd t}+[\mathcal{A}_i(X),V(t)]\Big|_{t=0}\Big)\Big]=X^\mu\Big(\frac{\partial V^\alpha}{\partial x^\mu}+f_{\beta\gamma}{}^\alpha\mathcal{A}_{i\mu}{}^\beta V^\gamma\Big)[(\sigma_i(0),T_\alpha)].`}</Eq>
      </Exercise>
      <Box kind="warning" title={R`勘误：习题 10.10 中伴随作用的写法（p.416）`}>{R`原书写"$G$ 在 $${LG}$ 上的作用是伴随作用 $V\to\mathrm{Ad}_gV=g^{-1}Vg$"。按本章开头的定义 $\mathrm{Ad}_gA=gAg^{-1}$；而且只有 $\rho(g)=\mathrm{Ad}_g:V\mapsto gVg^{-1}$ 才满足 $\rho(gh)=\rho(g)\rho(h)$，使 $[(u,V)]=\{(ug,\rho(g)^{-1}V)\}$ 成为等价关系。若按原书的 $\mathrm{Ad}_g V=g^{-1}Vg$ 去理解 \eqref{10.68a} 中的 $\mathrm{Ad}_{g(t)^{-1}}V=gVg^{-1}$，求导会得到 $\dot V-[\mathcal{A}_i(X),V]$，与 \eqref{10.68b} 的符号相反。采用 $\mathrm{Ad}_gV=gVg^{-1}$ 时，\eqref{10.68a} 与 \eqref{10.68b} 完全一致（见习题解答）。正文已改正。`}</Box>
    </Sub>);
}

function Sub1043() {
  return (
    <Sub n="10.4.3" title="Curvature rederived" zh="曲率的再推导">
      <Tx>{R`**我们要做的事：**只用相伴丛上的 $\nabla$，不回到主丛，重新得到曲率。协变导数 $\nabla_Xs$ 由 \eqref{10.50} 定义了算子 $\nabla:\Gamma(M,E)\to\Gamma(M,E\otimes${OM}^1(M))$。更一般地，$\nabla$ 作用于向量值 $p$ 形式 $s\otimes\eta$（$\eta\in${OM}^p(M)$）的定义为`}</Tx>
      <Eq n="10.69" say={R`协变导数对"截面与形式之积"的 Leibniz 律：截面部分求协变导数，形式部分求外微分。`}>{R`\nabla(s\otimes\eta)\equiv(\nabla s)\wedge\eta+s\otimes\dd\eta.`}</Eq>
      <Tx>{R`设 $U_i$ 是 $M$ 的坐标卡，$\sigma_i$ 是 $P$ 在 $U_i$ 上的截面，采用典范局部平凡化。我们证明`}</Tx>
      <Eq n="10.70" keyEq title="曲率 = 协变导数的平方" say={R`对基截面连续做两次协变导数，得到的不是零，而是场强矩阵：曲率就是 $\nabla^2$。`}>{R`\nabla\nabla e_\alpha=e_\beta\otimes\mathcal{F}_i{}^\beta{}_\alpha`}</Eq>
      <Tx>{R`其中 $e_\alpha=[(\sigma_i,e_\alpha{}^0)]\in\Gamma(U_i,E)$。事实上，直接计算得

$$\nabla\nabla e_\alpha=\nabla(e_\beta\otimes\mathcal{A}_i{}^\beta{}_\alpha)=\nabla e_\beta\wedge\mathcal{A}_i{}^\beta{}_\alpha+e_\beta\otimes\dd\mathcal{A}_i{}^\beta{}_\alpha=e_\beta\otimes(\dd\mathcal{A}_i{}^\beta{}_\alpha+\mathcal{A}_i{}^\beta{}_\gamma\wedge\mathcal{A}_i{}^\gamma{}_\alpha)=e_\beta\otimes\mathcal{F}_i{}^\beta{}_\alpha.$$

（第三个等号：$\nabla e_\beta\wedge\mathcal{A}^\beta{}_\alpha=e_\gamma\otimes\mathcal{A}^\gamma{}_\beta\wedge\mathcal{A}^\beta{}_\alpha$，再重命名哑指标。）这与 \eqref{10.38a} 完全一致：$\mathcal{F}=\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}$ 的矩阵元。`}</Tx>
      <Exercise n="10.11" title={R`一般截面的 $\nabla\nabla$`} level="★"
        hint={R`先算 $\nabla s=e_\alpha\otimes(\dd\xi^\alpha+\mathcal{A}^\alpha{}_\beta\xi^\beta)$，再用 \eqref{10.69}；注意 $\dd(\mathcal{A}^\alpha{}_\beta\xi^\beta)=\dd\mathcal{A}^\alpha{}_\beta\,\xi^\beta-\mathcal{A}^\alpha{}_\beta\wedge\dd\xi^\beta$。`}
        solution={R`由 \eqref{10.51e}、\eqref{10.56b}：$\nabla s=e_\alpha\otimes\dd\xi^\alpha+\xi^\beta e_\alpha\otimes\mathcal{A}^\alpha{}_\beta=e_\alpha\otimes(\dd\xi^\alpha+\mathcal{A}^\alpha{}_\beta\xi^\beta)$。再由 \eqref{10.69}：

$$\begin{aligned}\nabla\nabla s&=\nabla e_\alpha\wedge(\dd\xi^\alpha+\mathcal{A}^\alpha{}_\beta\xi^\beta)+e_\alpha\otimes\dd(\dd\xi^\alpha+\mathcal{A}^\alpha{}_\beta\xi^\beta)\\&=e_\alpha\otimes\big[\mathcal{A}^\alpha{}_\gamma\wedge\dd\xi^\gamma+\mathcal{A}^\alpha{}_\gamma\wedge\mathcal{A}^\gamma{}_\beta\xi^\beta+\dd\mathcal{A}^\alpha{}_\beta\,\xi^\beta-\mathcal{A}^\alpha{}_\beta\wedge\dd\xi^\beta\big]\\&=e_\alpha\otimes(\dd\mathcal{A}^\alpha{}_\beta+\mathcal{A}^\alpha{}_\gamma\wedge\mathcal{A}^\gamma{}_\beta)\xi^\beta=e_\alpha\otimes\mathcal{F}^\alpha{}_\beta\xi^\beta.\end{aligned}$$

含 $\dd\xi$ 的两项相消（$\dd^2\xi=0$）。**意义：**$\nabla\nabla$ 不含 $\xi$ 的导数——它是一个"代数"算子（$\mathcal{F}(M)$-线性），由曲率矩阵逐点作用。这是曲率的张量性的又一种表现。`}>
        <Tx>{R`设 $s(p)=\xi^\alpha(p)e_\alpha(p)$ 是 $E$ 的截面。证明`}</Tx>
        <Eq n="10.71" say={R`协变导数的平方作用在任意截面上，只是场强矩阵逐点乘以分量：不含任何导数。`}>{R`\nabla\nabla s=e_\alpha\otimes\mathcal{F}_i{}^\alpha{}_\beta\xi^\beta.`}</Eq>
      </Exercise>
    </Sub>);
}

function Sub1044() {
  return (
    <Sub n="10.4.4" title="A connection which preserves the inner product" zh="保持内积的联络">
      <p className="muted">本小节概念：<C id="metric_conn" /></p>
      <Tx>{R`设 $E\xrightarrow{\pi}M$ 是带正定对称内积的矢量丛，内积在每点 $p\in M$ 的作用为`}</Tx>
      <Eq n="10.72" say={R`矢量丛上的内积：在每根纤维上给出一个正定对称双线性型。`}>{R`${GIN}_p:\pi^{-1}(p)\otimes\pi^{-1}(p)\to\mathbb{R}.`}</Eq>
      <Tx>{R`称 $${GIN}$ 在 $E$ 上定义了一个 **Riemann 结构**（Riemannian structure）。联络 $\nabla$ 称为**度规联络**（metric connection），如果它保持内积：`}</Tx>
      <Eq n="10.73" keyEq title="度规联络" say={R`度规联络：内积的变化完全来自两个截面各自的协变变化——平行移动保持长度与夹角。`}>{R`\dd[${GIN}(s,s')]=${GIN}(\nabla s,s')+${GIN}(s,\nabla s').`}</Eq>
      <Tx>{R`特别地，取 $s=e_\alpha$、$s'=e_\beta$，令 $${GIN}(e_\alpha,e_\beta)=g_{\alpha\beta}$，得到`}</Tx>
      <Eq n="10.74" say={R`度规联络在一般标架下的条件：度规分量的外微分等于联络矩阵从两侧作用于度规。`}>{R`\dd g_{\alpha\beta}=\mathcal{A}_i{}^\gamma{}_\alpha g_{\gamma\beta}+\mathcal{A}_i{}^\gamma{}_\beta g_{\alpha\gamma}.`}</Eq>
      <Tx>{R`这应与 \eqref{7.30b} 比较。若 $E=TM$，再加上无挠条件，我们的联络就化为 Riemann 几何中的 Levi-Civita 联络（\sref{T7.1}）。

**正交归一标架。**给定内积，可以取**正交归一标架**（orthonormal frame）$\{\hat e_\alpha\}$，使 $${GIN}(\hat e_\alpha,\hat e_\beta)=\delta_{\alpha\beta}$。结构群取为 $\mathrm{O}(k)$，$k$ 是纤维维数。李代数 $\sym{lie}{\mathfrak{o}}(k)$ 是反对称矩阵构成的向量空间，联络一形式 $\omega$ 满足`}</Tx>
      <Eq n="10.75" say={R`正交归一标架下，联络矩阵是反对称的：无穷小的平行移动是一个无穷小转动。`}>{R`\omega^\alpha{}_\beta=-\omega^\beta{}_\alpha.`}</Eq>
      <Stmt id="T10.6">
        <Proof steps={[
          { claim: R`由于 $${GIN}$ 是双线性的，只需对 $s=f\hat e_\alpha$、$s'=f'\hat e_\beta$（$f,f'\in\mathcal{F}(M)$）证明 $\dd[${GIN}(s,s')]=${GIN}(\nabla s,s')+${GIN}(s,\nabla s')$。左边为 $\dd[${GIN}(f\hat e_\alpha,f'\hat e_\beta)]=\dd[ff'\delta_{\alpha\beta}]=\dd(ff')\delta_{\alpha\beta}$。`, fill: true, why: R`一般截面是 $\sum_\alpha f_\alpha\hat e_\alpha$，两边都对 $s$、$s'$ 双线性（$\nabla$ 对截面线性），所以单项情形足够。` },
          { claim: R`右边（用 \eqref{10.51e} 与 $\nabla\hat e_\alpha=\hat e_\gamma\omega^\gamma{}_\alpha$）：`, tex: R`\begin{aligned}&${GIN}(\nabla f\hat e_\alpha,f'\hat e_\beta)+${GIN}(f\hat e_\alpha,\nabla f'\hat e_\beta)\\&=${GIN}(\dd f\,\hat e_\alpha+f\hat e_\gamma\omega^\gamma{}_\alpha,f'\hat e_\beta)+${GIN}(f\hat e_\alpha,\dd f'\,\hat e_\beta+f'\hat e_\gamma\omega^\gamma{}_\beta)\\&=\dd f\,f'\delta_{\alpha\beta}+ff'\omega^\gamma{}_\alpha\delta_{\gamma\beta}+f\,\dd f'\,\delta_{\alpha\beta}+ff'\omega^\gamma{}_\beta\delta_{\alpha\gamma}\\&=\dd(ff')\delta_{\alpha\beta}\end{aligned}`, uses: ["10.51e", "10.56b"] },
          { claim: R`最后一个等号用了 \eqref{10.75}：$\omega^\beta{}_\alpha+\omega^\alpha{}_\beta=0$。`, uses: ["10.75"] },
        ]} />
      </Stmt>
    </Sub>);
}

function Sub1045() {
  return (
    <Sub n="10.4.5" title="Holomorphic vector bundles and Hermitian inner products" zh="全纯矢量丛与 Hermite 内积">
      <Stmt id="D10.6" />
      <Tx>{R`例如，设 $M$ 是复流形，$\dim_{\mathbb{C}}M=m$。**全纯切丛** $TM^+\equiv\bigcup_{p\in M}T_pM^+$ 是全纯矢量丛，典型纤维为 $\mathbb{C}^m$，局部基为 $\{\partial/\partial z^\mu\}$。

**Hermite 结构。**设 $h$ 是全纯矢量丛上的内积，在 $p\in M$ 处的作用为 $h_p:\pi^{-1}(p)\times\pi^{-1}(p)\to\mathbb{C}$。最自然的内积是满足下列条件的 **Hermite 结构**（Hermitian structure）：

(i) $h_p(u,av+bw)=ah_p(u,v)+bh_p(u,w)$，$u,v,w\in\pi^{-1}(p)$，$a,b\in\mathbb{C}$；
(ii) $h_p(u,v)=\nosym{\overline{h_p(v,u)}}$，$u,v\in\pi^{-1}(p)$；
(iii) $h_p(u,u)\ge0$，且 $h_p(u,u)=0$ 当且仅当 $u=\phi_i(p,0)$；
(iv) $h(s_1,s_2)\in\mathcal{F}(M)^{\mathbb{C}}$，对 $s_1,s_2\in\Gamma(M,E)$。

（由 (i)(ii)，$h$ 对第一个变量是共轭线性的。）一组截面 $\{\hat e_1,\ldots,\hat e_k\}$ 称为**酉标架**（unitary frame），如果`}</Tx>
      <Eq n="10.76" say={R`酉标架：在 Hermite 内积下彼此正交归一的一组截面。`}>{R`h(\hat e_i,\hat e_j)=\delta_{ij}.`}</Eq>
      <Tx>{R`酉标架丛 $LM$ 不是全纯矢量丛，因为结构群 $\mathrm{U}(m)$ 不是复流形。

**Hermite 联络。**给定 Hermite 结构 $h$，定义一个与 $h$ 相容的联络。**Hermite 联络**（Hermitian connection）$\nabla$ 是线性映射 $\Gamma(M,E)\to\Gamma(M,E\otimes T^*M^{\mathbb{C}})$，满足：

(i) $\nabla(fs)=(\dd f)s+f\nabla s$，$f\in\mathcal{F}(M)^{\mathbb{C}}$，$s\in\Gamma(M,E)$；
(ii) $\dd[h(s_1,s_2)]=h(\nabla s_1,s_2)+h(s_1,\nabla s_2)$；
(iii) 按"去向"把 $\nabla$ 的作用分开：$\nabla s=\mathrm{D}s+\bar{\mathrm{D}}s$，$\mathrm{D}s$（$\bar{\mathrm{D}}s$）是 $(1,0)$ 形式（$(0,1)$ 形式）值的截面。要求 $\bar{\mathrm{D}}=\bar\partial$。

可以证明：给定 $E$ 与 Hermite 度规 $h$，存在**唯一**的 Hermite 联络 $\nabla$。`}</Tx>
      <Derivation title="补全：Hermite 联络的存在唯一性（全纯标架下的显式公式）" collapsed steps={[
        { tex: R`\nabla e_\alpha=e_\beta\mathcal{A}^\beta{}_\alpha,\qquad\bar{\mathrm{D}}e_\alpha=\bar\partial e_\alpha=0`, why: R`取**全纯**标架 $\{e_\alpha\}$（全纯截面，转移函数全纯保证 $\bar\partial$ 有意义）。条件 (iii) 说 $\nabla e_\alpha$ 没有 $(0,1)$ 部分，即 $\mathcal{A}$ 是 $(1,0)$ 形式。` },
        { tex: R`\dd H_{\alpha\beta}=h(\nabla e_\alpha,e_\beta)+h(e_\alpha,\nabla e_\beta)=\bar{\mathcal{A}}^\gamma{}_\alpha H_{\gamma\beta}+H_{\alpha\gamma}\mathcal{A}^\gamma{}_\beta,\quad H_{\alpha\beta}\equiv h(e_\alpha,e_\beta)`, why: R`条件 (ii)；$h$ 对第一个变量共轭线性。` },
        { tex: R`\partial H=H\mathcal{A}\quad\Longrightarrow\quad\mathcal{A}=H^{-1}\partial H`, why: R`取 $(1,0)$ 部分：$\bar{\mathcal{A}}$ 是 $(0,1)$ 形式，不贡献。这就证明了**唯一性**；反过来，用此式定义 $\mathcal{A}$，$(0,1)$ 部分 $\bar\partial H=\mathcal{A}^\dagger H$ 由 $H^\dagger=H$ 自动成立，故**存在**。` },
        { tex: R`\mathcal{F}=\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}=\bar\partial(H^{-1}\partial H)`, why: R`$\partial(H^{-1}\partial H)=-H^{-1}\partial H\wedge H^{-1}\partial H$ 恰与 $\mathcal{A}\wedge\mathcal{A}$ 相消。曲率显然是 $(1,1)$ 形式——与下面用酉标架的论证一致。` },
      ]} />
      <Tx>{R`**曲率。**曲率由 Hermite 联络定义。设 $\{\hat e_1,\ldots,\hat e_k\}$ 是酉标架，定义局部联络形式 $\mathcal{A}^\beta{}_\alpha$：`}</Tx>
      <Eq n="10.77" say={R`酉标架下的联络矩阵：协变导数把每个标架向量展开成标架的组合。`}>{R`\nabla\hat e_\alpha=\hat e_\beta\mathcal{A}^\beta{}_\alpha.`}</Eq>
      <Tx>{R`场强定义为`}</Tx>
      <Eq n="10.78" say={R`Hermite 联络的场强：仍是"外微分 + 自身外积"。`}>{R`\mathcal{F}\equiv\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}.`}</Eq>
      <Tx>{R`验证`}</Tx>
      <Eq n="10.79" say={R`与 \eqref{10.70} 相同：协变导数的平方作用于标架给出场强矩阵。`}>{R`\nabla\nabla\hat e_\alpha=\nabla(\hat e_\beta\mathcal{A}^\beta{}_\alpha)=\hat e_\beta\mathcal{F}^\beta{}_\alpha.`}</Eq>
      <Tx>{R`**$\mathcal{A}$ 与 $\mathcal{F}$ 都是反 Hermite 的。**由条件 (ii) 与 $h$ 的共轭线性：

$$\bar{\mathcal{A}}^\beta{}_\alpha+\mathcal{A}^\alpha{}_\beta=h(\nabla\hat e_\alpha,\hat e_\beta)+h(\hat e_\alpha,\nabla\hat e_\beta)=\dd h(\hat e_\alpha,\hat e_\beta)=\dd\delta_{\alpha\beta}=0,$$

$$\begin{aligned}\mathcal{F}^\beta{}_\alpha+\bar{\mathcal{F}}^\alpha{}_\beta&=\dd\mathcal{A}^\beta{}_\alpha+\mathcal{A}^\beta{}_\gamma\wedge\mathcal{A}^\gamma{}_\alpha+\dd\bar{\mathcal{A}}^\alpha{}_\beta+\bar{\mathcal{A}}^\alpha{}_\gamma\wedge\bar{\mathcal{A}}^\gamma{}_\beta\\&=\dd(\mathcal{A}^\beta{}_\alpha-\mathcal{A}^\beta{}_\alpha)+\mathcal{A}^\beta{}_\gamma\wedge\mathcal{A}^\gamma{}_\alpha+\mathcal{A}^\gamma{}_\alpha\wedge\mathcal{A}^\beta{}_\gamma=0.\end{aligned}$$

（第二行用 $\bar{\mathcal{A}}^\alpha{}_\gamma=-\mathcal{A}^\gamma{}_\alpha$、$\bar{\mathcal{A}}^\gamma{}_\beta=-\mathcal{A}^\beta{}_\gamma$；最后两项因一形式反交换而相消。）于是`}</Tx>
      <Box kind="warning" title={R`勘误：反 Hermite 性证明中的指标（p.418）`}>{R`原书第二行最后一项印作 $\bar{\mathcal{A}}^\alpha{}_\gamma\wedge\bar{\mathcal{A}}^\gamma{}_\alpha$，应为 $\bar{\mathcal{A}}^\alpha{}_\gamma\wedge\bar{\mathcal{A}}^\gamma{}_\beta$（$\bar{\mathcal{F}}^\alpha{}_\beta$ 的二次项）；第三行最后一项印作 $\mathcal{A}^\gamma{}_\alpha\wedge\mathcal{A}^\alpha{}_\gamma$，应为 $\mathcal{A}^\gamma{}_\alpha\wedge\mathcal{A}^\beta{}_\gamma$。按原书的指标，这一项甚至不与其他项的自由指标 $(\beta,\alpha)$ 匹配。改正后 $\mathcal{A}^\beta{}_\gamma\wedge\mathcal{A}^\gamma{}_\alpha+\mathcal{A}^\gamma{}_\alpha\wedge\mathcal{A}^\beta{}_\gamma=0$ 正是一形式的反交换性。正文已改正。`}</Box>
      <Eq n="10.80" say={R`在酉标架下，联络矩阵与场强矩阵都是反 Hermite 矩阵：它们取值于 $\sym{lie}{\mathfrak{u}}(k)$。`}>{R`\mathcal{A}^\alpha{}_\beta=-\bar{\mathcal{A}}^\beta{}_\alpha\qquad\mathcal{F}^\beta{}_\alpha=-\bar{\mathcal{F}}^\alpha{}_\beta.`}</Eq>
      <Tx>{R`**$\mathcal{F}$ 是 $(1,1)$ 形式。**设 $\{\hat e_\alpha\}$ 是酉标架。$\mathcal{F}$ 不可能有 $(0,2)$ 型分量，因为

$$\hat e_\beta\mathcal{F}^\beta{}_\alpha=\nabla\nabla\hat e_\alpha=(\mathrm{D}+\bar\partial)(\mathrm{D}+\bar\partial)\hat e_\alpha=\mathrm{D}\mathrm{D}\hat e_\alpha+(\mathrm{D}\bar\partial+\bar\partial\mathrm{D})\hat e_\alpha,$$

其中用了 $\bar\partial^2=0$；右边只有 $(2,0)$ 与 $(1,1)$ 型。由 $\mathcal{F}^\beta{}_\alpha=-\bar{\mathcal{F}}^\alpha{}_\beta$ 知 $\bar{\mathcal{F}}$ 也没有 $(0,2)$ 型分量，从而 $\mathcal{F}$ 也没有 $(2,0)$ 型分量（复共轭交换 $(p,q)$ 与 $(q,p)$）。因此 $\mathcal{F}^\beta{}_\alpha$ 是 $(1,1)$ 型二形式。第 11 章将用它构造复矢量丛的陈类。`}</Tx>
    </Sub>);
}
