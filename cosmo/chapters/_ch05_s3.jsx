// §5.3 The Boltzmann equation for photons —— 式 (5.23)–(5.35)，Box 5.1
import { Sec, Tx, Eq, Box, Derivation, C } from "@kit";

const R = String.raw;

export function Sec53() {
  return (
    <Sec n="5.3" title="The Boltzmann equation for photons" zh="光子的 Boltzmann 方程"
      gist={R`左边 \eqref{5.9} = 右边 \eqref{5.22}；换成共形时间 $\eta$、转到 Fourier 空间、用方向余弦 $\mu$ 与光深 $\tau$，得到对每个 $k$ 独立的光子方程 $\Theta'+ik\mu\Theta+\Phi'+ik\mu\Psi=-\tau'[\Theta_0-\Theta+\mu u_{\rm b}]$。`}
      why={R`实空间的偏微分方程耦合了无穷多个空间点；只有借助"线性 + 背景均匀"把它拆成一个个独立的 Fourier 模式，方程才变得可解。`}
      gives={["5.23", "5.24", "5.26", "5.28", "5.31", "5.32", "5.33", "5.34", "5.35"]}>
      <p className="muted">本节概念：<C id="fourier" /> · <C id="tau" /></p>
      <Tx>{R`**拼起左右两边。**现在把前两节的左边和右边合起来，再做几个定义，就完成了本章的第一个目标——光子分布扰动的线性方程。令 \eqref{5.9} 等于 \eqref{5.22}（两边公共因子 $-p\,\partial f^{(0)}/\partial p$ 约去）：`}</Tx>
      <Eq n="5.23" say={R`温度扰动的完整方程（宇宙时、实空间）：左边是自由流与引力红移，右边是 Compton 散射把 $\Theta$ 拉向 $\Theta_0$ 并加上多普勒项。`}>{R`\dot\Theta + \frac{\hat p^i}{a}\frac{\partial\Theta}{\partial x^i} + \dot\Phi + \frac{\hat p^i}{a}\frac{\partial\Psi}{\partial x^i} = n_e\sigma_{\rm T}\left[\Theta_0-\Theta+\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}\right].`}</Eq>
      <Tx>{R`**换用共形时间。**此时引入 \eqref{2.35} 定义的共形时间 $\eta$（$d\eta=dt/a$）作为时间变量很方便：$\partial/\partial t=a^{-1}\partial/\partial\eta$，于是把整个方程乘以 $a$，所有 $1/a$ 都消失了：`}</Tx>
      <Eq n="5.24" say={R`同一个方程改用共形时间：空间导数前不再有 $1/a$（光在共动坐标中每单位共形时间走一个单位距离），散射率变成 $n_e\sigma_{\rm T}a$。`}>{R`\Theta' + \hat p^i\frac{\partial\Theta}{\partial x^i} + \Phi' + \hat p^i\frac{\partial\Psi}{\partial x^i} = n_e\sigma_{\rm T}a\left[\Theta_0-\Theta+\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}\right].`}</Eq>
      <Box kind="warning" title="记号约定：撇号与点">{R`从这里开始，**撇号**表示对共形时间 $\eta$ 的导数（$\Theta'=\partial\Theta/\partial\eta$），**点**仍表示对物理时间 $t$ 的导数。两者的关系是 $X'=a\dot X$；特别地 $a'/a=a\dot a/a=aH\equiv\mathcal H$。`}</Box>

      <Box kind="aside" title="Box 5.1　Fourier 空间的好处（The virtues of Fourier space）">
        <Tx>{R`考虑一个场 $\delta(\boldsymbol x,t)$，满足某个线性偏微分方程，例如`}</Tx>
        <Eq n="5.25" say={R`一个典型的宇宙学线性方程：场 $\delta$ 的二阶时间导数、阻尼项与另一个场 $\Psi$ 的拉普拉斯项；关键是系数只依赖时间。`}>{R`\frac{\partial^2}{\partial t^2}\delta + \sym{ch05-ffun}{f}(t)\frac{\partial}{\partial t}\delta + \sym{ch05-gfun}{g}(t)\nabla^2\Psi = 0,`}</Eq>
        <Tx>{R`其中 $\Psi(\boldsymbol x,t)$ 是另一个场。这个方程除了线性之外，值得注意的是**系数只是时间 $t$ 的函数**。在宇宙学中这一性质直接来自研究光滑宇宙周围的小扰动：唯一的 $\boldsymbol x$ 依赖只能来自扰动，而我们只做到扰动的线性阶。形如 \eqref{5.25} 的偏微分方程特别适合在 Fourier 空间求解。定义空间 Fourier 变换：`}</Tx>
        <Eq n="5.26" say={R`任何场都可以写成平面波 $e^{i\boldsymbol k\cdot\boldsymbol x}$ 的叠加，每个波矢 $\boldsymbol k$ 的权重是 $\tilde\delta(\boldsymbol k)$。`}>{R`\delta(\boldsymbol x) = \int\frac{d^3k}{(2\pi)^3}e^{i\boldsymbol k\cdot\boldsymbol x}\tilde\delta(\boldsymbol k),`}</Eq>
        <Tx>{R`由此得逆变换`}</Tx>
        <Eq n="5.27" say={R`反过来，$\tilde\delta(\boldsymbol k)$ 是场 $\delta(\boldsymbol x)$ 在平面波 $e^{i\boldsymbol k\cdot\boldsymbol x}$ 上的投影。`}>{R`\tilde\delta(\boldsymbol k) = \int d^3x\,e^{-i\boldsymbol k\cdot\boldsymbol x}\delta(\boldsymbol x).`}</Eq>
        <Tx>{R`作用在 $\delta(\boldsymbol x)$ 上的 $\boldsymbol x$ 导数在 Fourier 空间变成**代数**关系：`}</Tx>
        <Eq n="5.28" say="在 Fourier 空间，对空间坐标求导就是乘以 i 乘波矢分量。">{R`\frac{\partial\delta(\boldsymbol x,t)}{\partial x^i}\to ik_i\tilde\delta(\boldsymbol k,t).`}</Eq>
        <Tx>{R`注意 $k^i$ 是欧氏空间中的三维矢量，所以 $k_i=k^i$，来回升降指标**不需要** $g_{ij}$ 因子——与导数 $\partial_i$ 一样。速度 $u^i_{\rm b}$ 等其他三维矢量也是如此。我们常用波矢的大小 $k=|\boldsymbol k|$ 来刻画一个模式。

**约定：**本书除少数例外，**省略** Fourier 变换量上的波浪号，例如`}</Tx>
        <Eq n="5.29" say="本书约定：Fourier 变换后的场不再加波浪号，只靠自变量 k 区分。">{R`\tilde\delta(\boldsymbol k)\to\delta(\boldsymbol k).`}</Eq>
        <Tx>{R`许多文献都用这个约定。看起来容易混淆，实际上很少出问题：Fourier 空间的场可以由自变量区分（如上式），而且 Fourier 空间的方程通常带有 $k$ 的因子、没有空间导数。

有了这些关系，\eqref{5.25} 在 Fourier 空间变为`}</Tx>
        <Eq n="5.30" say={R`偏微分方程变成了常微分方程：$\nabla^2$ 变成 $-k^2$，每个 $\boldsymbol k$ 都有自己的一个方程，互不相干。`}>{R`\frac{\partial^2}{\partial t^2}\delta + \sym{ch05-ffun}{f}(t)\frac{\partial}{\partial t}\delta - \sym{ch05-gfun}{g}(t)k^2\Psi = 0.`}</Eq>
        <Tx>{R`偏微分方程神奇地变成了一组**常微分方程**，而且彼此**解耦**：对每个 $\boldsymbol k$ 可以独立求解，无需知道其他 $\boldsymbol k'$ 的解。换句话说，**每个 Fourier 模式独立演化**。\eqref{5.25} 实际上代表无穷多个耦合方程；现在我们可以一次只解一个 $\boldsymbol k$ 模式。在线性阶上，这个技巧在宇宙学中每次都管用。`}</Tx>
      </Box>

      <Tx>{R`**为什么这里能用 Fourier 方法。**\eqref{5.24} 是一个线性偏微分方程，把 $\Theta$ 与其他变量 $\Phi$、$\Psi$、$\boldsymbol u_{\rm b}$ 耦合在一起，而后者也都满足线性方程。这种简化之所以成立，是因为扰动很小。CMB 的扰动在一切宇宙学时期都保持很小；物质的扰动只在早期宇宙中很小，后来会增长到非线性并形成星系等坍缩天体——那需要第 12 章的新工具。

按 Box 5.1 的思路，我们在 Fourier 空间求解 \eqref{5.24}。变换之前再做两个定义。**第一**，把波矢 $\boldsymbol k$ 与光子方向 $\hat{\boldsymbol p}$ 夹角的余弦记为 $\mu$：`}</Tx>
      <Eq n="5.31" keyEq title={R`方向余弦 $\mu$`} say={R`$\mu$ 是光子传播方向与扰动波矢夹角的余弦：$\mu=\pm1$ 沿温度梯度传播，$\mu=0$ 沿等温线传播。`}>{R`\mu \equiv \frac{\boldsymbol k\cdot\hat{\boldsymbol p}}{k}.`}</Eq>
      <Tx>{R`从此 $\mu$ 就是描述光子传播方向的变量（注意：从本章起不再用 $\mu$ 表示化学势）。理解 $\mu$ 的好办法是回到图 5.2：波矢 $\boldsymbol k$ 指向温度变化的方向，与梯度平行（图中 $\boldsymbol k$ 水平）。所以 $\Theta(k,\mu=1)$ 描述沿梯度 $\boldsymbol k$ 传播的光子——沿这个方向温度在变；反之 $\Theta(k,\mu=0)$ 描述垂直于梯度传播的光子——沿这个方向温度不变（图中竖直方向）。虽然我们在记号上不区分 Fourier 空间的场（Box 5.1），但**方程中一出现 $\mu$，就自动表示它写在 Fourier 空间**。

**为什么 $\Theta$ 只依赖 $\mu$ 而不依赖整个 $\hat{\boldsymbol p}$？**对单个 Fourier 模式，唯一的特殊方向就是 $\boldsymbol k$；方程中 $\hat{\boldsymbol p}$ 只通过 $\hat{\boldsymbol p}\cdot\boldsymbol k$ 与 $\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}$ 出现。只要速度也平行于 $\boldsymbol k$（见下），绕 $\boldsymbol k$ 的转动就是对称性，$\Theta$ 只能依赖 $\mu$。

在宇宙学中，速度一般是**纵向**的（longitudinal），即指向与 $\boldsymbol k$ 相同：`}</Tx>
      <Eq n="5.32" say="宇宙学中的速度是纵向的：Fourier 空间里速度矢量平行于波矢，只需一个标量 u_b 描述。">{R`\boldsymbol u_{\rm b}(\boldsymbol k,\eta) = \frac{\boldsymbol k}{k}u_{\rm b}(\boldsymbol k,\eta).`}</Eq>
      <Tx>{R`这等价于说速度是**无旋**的（实空间中 $\nabla\times\boldsymbol u=0$）。于是 $\boldsymbol u_{\rm b}\cdot\hat{\boldsymbol p}=u_{\rm b}\mu$。（这一假设的部分理由见 \secref{5.4} 中 Euler 方程 \eqref{5.52} 后的讨论。）

**第二**，定义**光深**（optical depth）：`}</Tx>
      <Eq n="5.33" keyEq title="光深" say={R`光深 = 从时刻 $\eta$ 到今天，一个光子被自由电子散射的平均次数：沿路积分 散射率 $\times$ 共形时间。`}>{R`\tau(\eta) \equiv \int_\eta^{\eta_0}d\eta'\,n_e\sigma_{\rm T}a.`}</Eq>
      <Tx>{R`晚期自由电子密度很小，所以 $\tau\ll1$；早期则非常大。注意积分限的取法使得`}</Tx>
      <Eq n="5.34" say={R`光深对共形时间的导数是负的散射率：$\tau$ 从今天往过去累积，所以随 $\eta$ 增加而减小。`}>{R`\tau' \equiv \frac{d\tau}{d\eta} = -n_e\sigma_{\rm T}a.`}</Eq>
      <Tx>{R`有了这些定义，我们终于得到**光子的 Boltzmann 方程**：`}</Tx>
      <Eq n="5.35" keyEq title="光子 Boltzmann 方程" say={R`每个 Fourier 模式、每个方向 $\mu$ 的温度扰动演化：自由流 $ik\mu\Theta$ 与引力项 $\Phi'$、$ik\mu\Psi$ 在左，Compton 散射（以 $-\tau'$ 为速率）把 $\Theta$ 拉向 $\Theta_0+\mu u_{\rm b}$。`}>{R`\Theta' + ik\mu\Theta + \Phi' + ik\mu\Psi = -\tau'\left[\Theta_0-\Theta+\mu u_{\rm b}\right].`}</Eq>
      <Derivation title={R`\eqref{5.24} → \eqref{5.35}：逐项变换`} collapsed steps={[
        { tex: R`\hat p^i\frac{\partial\Theta}{\partial x^i}\to i\hat p^ik_i\Theta=ik\mu\Theta,\qquad \hat p^i\frac{\partial\Psi}{\partial x^i}\to ik\mu\Psi`, why: R`由 \eqref{5.28} 与 $\hat p^ik_i=\boldsymbol k\cdot\hat{\boldsymbol p}=k\mu$。` },
        { tex: R`\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}\to\hat{\boldsymbol p}\cdot\frac{\boldsymbol k}{k}u_{\rm b}=\mu u_{\rm b}`, why: R`纵向速度 \eqref{5.32}。` },
        { tex: R`n_e\sigma_{\rm T}a=-\tau'`, why: R`\eqref{5.34}。` },
      ]} result={R`$\Theta'+ik\mu\Theta+\Phi'+ik\mu\Psi=-\tau'[\Theta_0-\Theta+\mu u_{\rm b}]$。`} />
      <Tx>{R`注意不同的 Fourier 模式 $\boldsymbol k$ 是解耦的：可以对每个 $k$ 和 $\mu$ 独立求解（$\mu$ 之间通过 $\Theta_0$ 耦合，但不同 $k$ 之间毫无联系）。`}</Tx>
      <Box kind="physics" title="(5.35) 的两个极限">{R`**无碰撞（$\tau'\to0$，复合之后）**：$\Theta'+ik\mu\Theta=-\Phi'-ik\mu\Psi$。忽略引力项时解为 $\Theta\propto e^{-ik\mu(\eta-\eta_*)}$：沿光线温度守恒，空间上的波纹被"投影"到方向上。这个平面波的多极矩恰是球 Bessel 函数 $j_l(k(\eta-\eta_*))$——见 \secref{5.7} 的交互图。

**强碰撞（$|\tau'|\gg k$，复合之前）**：右边的大系数迫使方括号近似为零：$\Theta\approx\Theta_0+\mu u_{\rm b}$——只有单极与偶极，光子是流体。`}</Box>
    </Sec>);
}
