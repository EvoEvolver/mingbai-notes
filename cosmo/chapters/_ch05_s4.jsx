// §5.4 The Boltzmann equation for cold dark matter —— 式 (5.36)–(5.52)
import { Sec, Tx, Eq, Box, Derivation, C } from "@kit";

const R = String.raw;

export function Sec54() {
  return (
    <Sec n="5.4" title="The Boltzmann equation for cold dark matter" zh="冷暗物质的 Boltzmann 方程"
      gist={R`暗物质无碰撞、非相对论：不必知道分布函数的形状，只需对无碰撞 Boltzmann 方程取**零阶矩**（得连续性方程）和**一阶矩**（得 Euler 方程），丢掉 $(p/E)^2$ 项使层级封闭。`}
      why={R`暗物质通过引力主导结构增长；它的密度扰动 $\delta_{\rm c}$ 和速度 $u_{\rm c}$ 是 Einstein 方程的主要源项，也是今天星系分布的骨架。`}
      gives={["5.36", "5.38", "5.39", "5.41", "5.43", "5.44", "5.45", "5.49", "5.50", "5.51", "5.52"]}>
      <p className="muted">本节概念：<C id="moments" /> · <C id="cdm" /> · <C id="grav_terms" /></p>
      <Tx>{R`**同一套路，不同的成分。**推导宇宙中其他成分的 Boltzmann 方程，就是重复我们对光子做过的步骤。其中尤为重要的是暗物质的演化：在所有可行的结构形成模型中，暗物质都通过其引力效应在结构增长中扮演重要角色。和光子一样，Boltzmann 方程是描述暗物质演化的正确起点。

暗物质与光子有几点不同。**第一**，在产生之后很久的时期，暗物质按定义不与宇宙中任何其他成分相互作用，所以**没有碰撞项**（除非暗物质有很强的自相互作用——近年颇受关注的情形，见 Tulin & Yu 2018；这里不考虑）。**第二**，冷暗物质是**非相对论**的：暗物质粒子的典型速度远小于光速。

因此合适的方程是有质量粒子的无碰撞 Boltzmann 方程——§3.3.4 推出的 \eqref{3.76}：`}</Tx>
      <Eq n="5.36" title="CDM 无碰撞 Boltzmann 方程" say="暗物质分布函数的无碰撞演化：与光子方程相比，自由流项多了速度因子 p/E（暗物质跑得慢），引力项多了 E/p（慢粒子受势梯度影响更大）。">{R`\frac{\partial f_{\rm c}}{\partial t} + \frac{p}{E}\frac{\hat p^i}{a}\frac{\partial f_{\rm c}}{\partial x^i} - \left[H + \dot\Phi + \frac{E}{ap}\hat p^i\Psi_{,i}\right]p\frac{\partial f_{\rm c}}{\partial p} = 0.`}</Eq>
      <Tx>{R`与辐射方程的主要区别是出现了 $p/E$ 因子，即**速度**。对暗物质粒子，这些速度因子会压制自由流，下面很快就会看到。

**不必知道分布函数的形状。**无质量情形下，我们利用了对分布函数的知识：零阶是玻色–爱因斯坦分布，再围绕它展开。对冷暗物质则不需要这么详细的信息，只需知道这些粒子**非常非相对论**。因此 $p$ 的越来越高次幂都可以忽略：只需保留 $(p/m)^0$ 与 $(p/m)^1$ 的项，即**忽略 $(p/m)^2$ 量级的项**。这意味着我们保留了暗物质的整体运动，但不保留其**速度弥散**，因而把暗物质当作一种等效**流体**。这一近似更细致的论证及其局限，要到第 12 章再回顾。

于是，我们不去假设 $f_{\rm c}$ 的形式，而是对 \eqref{3.76} **取矩**（参见习题 3.8）。**零阶矩**：两边乘以相空间体积 $d^3p/(2\pi)^3$ 再积分：`}</Tx>
      <Eq n="5.37" say={R`对动量积分后的零阶矩方程：依次是数密度的时间变化、粒子流的散度、膨胀（含 $\dot\Phi$）造成的稀释、以及引力势梯度项（它将积分为零）。`}>{R`\begin{aligned}&\frac{\partial}{\partial t}\int\frac{d^3p}{(2\pi)^3}f_{\rm c} + \frac1a\frac{\partial}{\partial x^i}\int\frac{d^3p}{(2\pi)^3}f_{\rm c}\frac{p\hat p^i}{E(p)} - \left[H+\dot\Phi\right]\int\frac{d^3p}{(2\pi)^3}p\frac{\partial f_{\rm c}}{\partial p}\\ &-\frac1a\frac{\partial\Psi}{\partial x^i}\int\frac{d^3p}{(2\pi)^3}\frac{\partial f_{\rm c}}{\partial p}E(p)\hat p^i = 0.\end{aligned}`}</Eq>
      <Tx>{R`由于 $p$ 与 $x^i$、$t$ 是相互独立的变量，对 $p$ 的积分可以穿过对 $x^i$ 和 $t$ 的偏导数。分部积分表明最后一项为零（见下方推导）。其余各项都有贡献。为化简，回忆暗物质数密度为（这里把自旋简并度 $g_{\rm c}$ 吸收进了 $f_{\rm c}$，免得推导中到处出现无关紧要的 $g_{\rm c}$）`}</Tx>
      <Eq n="5.38" say="暗物质数密度 = 分布函数对全部动量的积分（零阶矩）。">{R`n_{\rm c} = \int\frac{d^3p}{(2\pi)^3}f_{\rm c},`}</Eq>
      <Tx>{R`而**流体速度**定义为`}</Tx>
      <Eq n="5.39" title="流体速度" say={R`流体速度 = 粒子速度 $p\hat{\boldsymbol p}/E$ 按分布函数加权的平均（一阶矩除以数密度）。`}>{R`u^i_{\rm c} \equiv \frac{1}{n_{\rm c}}\int\frac{d^3p}{(2\pi)^3}f_{\rm c}\frac{p\hat p^i}{E(p)}.`}</Eq>
      <Box kind="warning" title={R`流体速度 $\neq$ 粒子速度`}>{R`我们用 $\boldsymbol u$ 表示**流体**速度，以区别于单个**粒子**的速度。务必记住两者的物理区别：前者描述大量粒子平均后的整体运动，可以远小于单个粒子的速度（想想静止容器中的气体：$\boldsymbol u=0$，但分子速度很大）——不过对冷暗物质两者相差不大。`}</Box>
      <Tx>{R`于是 \eqref{5.37} 的前两项可以简单地用密度与速度表示。第三项可以分部积分：`}</Tx>
      <Eq n="5.40" say={R`膨胀项中的动量积分：分部积分把 $p\,\partial f/\partial p$ 变成 $-3f$，结果正是 $-3$ 倍数密度（三维中 $d^3p\propto p^2dp$ 带来因子 3）。`}>{R`\begin{aligned}\int\frac{d^3p}{(2\pi)^3}p\frac{\partial f_{\rm c}}{\partial p} &= \frac{1}{(2\pi)^3}\int_0^\infty dp\,p^3\frac{\partial}{\partial p}\int d\Omega\,f_{\rm c}\\ &= -3\frac{1}{(2\pi)^3}\int_0^\infty dp\,p^2\int d\Omega\,f_{\rm c}\\ &= -3n_{\rm c}.\end{aligned}`}</Eq>
      <Tx>{R`所以 Boltzmann 方程的零阶矩给出**连续性方程**的宇宙学推广：`}</Tx>
      <Eq n="5.41" title="连续性方程（零阶矩）" say={R`暗物质粒子数守恒：数密度的变化 = −流的散度 − 3 $\times$（局域哈勃率 $H+\dot\Phi$）$\times$ 数密度（空间膨胀带来的稀释）。`}>{R`\frac{\partial n_{\rm c}}{\partial t} + \frac1a\frac{\partial(n_{\rm c}u^i_{\rm c})}{\partial x^i} + 3\left[H+\dot\Phi\right]n_{\rm c} = 0.`}</Eq>
      <Derivation title={R`\eqref{5.37} 最后一项为何为零`} collapsed steps={[
        { tex: R`\int\frac{d^3p}{(2\pi)^3}\frac{\partial f_{\rm c}}{\partial p}E(p)\hat p^i=\frac1{(2\pi)^3}\int d\Omega\,\hat p^i\int_0^\infty dp\,p^2E\frac{\partial f_{\rm c}}{\partial p}`, why: R`改用球坐标。` },
        { tex: R`=-\frac1{(2\pi)^3}\int d\Omega\,\hat p^i\int_0^\infty dp\,f_{\rm c}\left(2pE+\frac{p^3}{E}\right)`, why: R`对 $p$ 分部积分，$d(p^2E)/dp=2pE+p^3/E$。` },
        { tex: R`\approx-\frac{2m}{(2\pi)^3}\int d\Omega\,\hat p^i\int_0^\infty dp\,p\,f_{\rm c}\ \propto\ \text{零阶下各向同性}\Rightarrow\int d\Omega\,\hat p^i=0`, why: R`非相对论 $E\approx m$。积分要乘以已是一阶的 $\partial_i\Psi$，所以 $f_{\rm c}$ 只需取零阶（各向同性）部分，此时对方向积分 $\int d\Omega\,\hat p^i=0$。` },
      ]} />
      <Tx>{R`前两项是流体力学中标准的连续性方程。最后一项来自 FLRW 度规及其扰动，特别是空间膨胀造成的稀释（回忆 $H+\dot\Phi$ 对应**局域扰动后的哈勃率**）。

**零阶与一阶分离。**进一步，把 \eqref{5.41} 中的零阶项与一阶项分开。速度是一阶量，$\Phi$ 也是，所以零阶项只有`}</Tx>
      <Eq n="5.42" say="均匀背景中的暗物质数密度只因膨胀而稀释。">{R`\frac{\partial\bar n_{\rm c}}{\partial t} + 3H\bar n_{\rm c} = 0`}</Eq>
      <Tx>{R`其中 $\bar n_{\rm c}$ 是密度的零阶（均匀）部分。等价地，`}</Tx>
      <Eq n="5.43" say={R`共动体积内的暗物质粒子数守恒：平均数密度按 $a^{-3}$ 下降。`}>{R`\frac{d(\bar n_{\rm c}a^3)}{dt} = 0\Rightarrow\bar n_{\rm c}\propto a^{-3},`}</Eq>
      <Tx>{R`这个关系在第 2 章已用能动张量守恒证明过。

现在提取 \eqref{5.41} 的一阶部分。凡是 $n_{\rm c}$ 乘以一阶量 $u_{\rm c}$ 与 $\dot\Phi$ 的地方，都可以把 $n_{\rm c}$ 换成 $\bar n_{\rm c}$；其他地方则要把 $n_{\rm c}$ 展开到包含一阶扰动。具体地令`}</Tx>
      <Eq n="5.44" say={R`把暗物质数密度写成平均值乘以 $(1+\delta_{\rm c})$：$\delta_{\rm c}$ 是分数过密度，也等于 $\delta\rho_{\rm c}/\rho_{\rm c}$。`}>{R`n_{\rm c}(\boldsymbol x,t) = \bar n_{\rm c}(t)\left[1+\delta_{\rm c}(\boldsymbol x,t)\right]`}</Eq>
      <Tx>{R`这定义了一阶部分 $\bar n_{\rm c}\delta_{\rm c}$。由于物质的能量密度等于质量乘以 $n_{\rm c}$，$\delta_{\rm c}$ 也就是暗物质的分数过密度 $\delta\rho_{\rm c}/\rho_{\rm c}$。除以 $\bar n_{\rm c}$ 后，一阶方程为`}</Tx>
      <Eq n="5.45" say={R`暗物质过密度的变化来自两部分：速度场的汇聚（$-\nabla\cdot\boldsymbol u/a$）与局域空间体积的变化（$-3\dot\Phi$）。`}>{R`\frac{\partial\delta_{\rm c}}{\partial t} + \frac1a\frac{\partial u^i_{\rm c}}{\partial x^i} + 3\dot\Phi = 0.`}</Eq>
      <Derivation title={R`\eqref{5.41} 的一阶部分`} collapsed steps={[
        { tex: R`\frac{\partial}{\partial t}[\bar n_{\rm c}(1+\delta_{\rm c})]=\frac{\partial\bar n_{\rm c}}{\partial t}(1+\delta_{\rm c})+\bar n_{\rm c}\frac{\partial\delta_{\rm c}}{\partial t}`, why: R`代入 \eqref{5.44}。` },
        { tex: R`3H\bar n_{\rm c}(1+\delta_{\rm c})+3\dot\Phi\bar n_{\rm c}+\frac{\bar n_{\rm c}}a\partial_iu^i_{\rm c}`, why: R`其余各项保留到一阶（$\dot\Phi\delta_{\rm c}$、$\delta_{\rm c}u_{\rm c}$ 为二阶）。` },
        { tex: R`\underbrace{\left[\partial_t\bar n_{\rm c}+3H\bar n_{\rm c}\right]}_{=0\ \eqref{5.42}}(1+\delta_{\rm c})+\bar n_{\rm c}\left[\partial_t\delta_{\rm c}+\frac1a\partial_iu^i_{\rm c}+3\dot\Phi\right]=0`, why: R`零阶方程消掉前一组，除以 $\bar n_{\rm c}$ 即得 \eqref{5.45}。` },
      ]} />
      <Tx>{R`**还需要第二个方程：一阶矩。**到目前为止我们为暗物质引入了两个新的扰动变量：密度扰动 $\delta_{\rm c}$ 与速度 $\boldsymbol u_{\rm c}$。但 \eqref{5.45} 只是一个方程。要得到另一个，回到未积分的 Boltzmann 方程 \eqref{5.36}：刚才取了零阶矩，现在取**一阶矩**——乘以 $(d^3p/(2\pi)^3)\,p\hat p^j/E$ 再积分：`}</Tx>
      <Eq n="5.46" say="一阶矩方程：动量流（粒子流）的时间变化、动量流的通量（二阶矩，可忽略）、膨胀项与引力项。">{R`\begin{aligned}&\frac{\partial}{\partial t}\int\frac{d^3p}{(2\pi)^3}f_{\rm c}\frac{p\hat p^j}{E} + \frac1a\frac{\partial}{\partial x^i}\int\frac{d^3p}{(2\pi)^3}f_{\rm c}\frac{p^2}{E^2(p)}\hat p^i\hat p^j - \left[H+\dot\Phi\right]\int\frac{d^3p}{(2\pi)^3}\frac{\partial f_{\rm c}}{\partial p}\frac{p^2\hat p^j}{E}\\ &-\frac1a\frac{\partial\Psi}{\partial x^i}\int\frac{d^3p}{(2\pi)^3}\frac{\partial f_{\rm c}}{\partial p}p\hat p^i\hat p^j = 0.\end{aligned}`}</Eq>
      <Tx>{R`前两项很直接：第一项是 $n_{\rm c}u^j_{\rm c}$ 的时间导数；第二项是 $(p/E)^2$ 量级，可以放心地忽略——**这就是"冷"的含义**。后两个积分要更小心，因为导数作用在 $f_{\rm c}$ 上。我们显式地对第三项分部积分：`}</Tx>
      <Eq n="5.47" say={R`膨胀项的动量积分：分部积分得到 $4p^3/E$（给出 $-4n_{\rm c}u_{\rm c}$）与 $p^5/E^3$（速度平方压低，可忽略）两项。`}>{R`\begin{aligned}\int\frac{d^3p}{(2\pi)^3}\frac{\partial f_{\rm c}}{\partial p}\frac{p^2\hat p^j}{E} &= \int\frac{d\Omega}{(2\pi)^3}\hat p^j\int_0^\infty dp\frac{p^4}{E}\frac{\partial f_{\rm c}}{\partial p}\\ &= -\int\frac{d\Omega}{(2\pi)^3}\hat p^j\int_0^\infty dp\,f_{\rm c}\left(\frac{4p^3}{E}-\frac{p^5}{E^3}\right).\end{aligned}`}</Eq>
      <Tx>{R`第一项 $\propto-4p^3/E$，积分后给出 $-4n_{\rm c}u^j_{\rm c}$；涉及 $p^5/E^3=(p^2/E^2)(p^3/E)$ 的项按我们的计数可以忽略。对 \eqref{5.46} 的最后一项同样处理，唯一额外需要的事实是`}</Tx>
      <Eq n="5.48" say={R`单位矢量两个分量之积对全部方向的平均是 $\sym{ch05-kron}{\delta}^{ij}/3$：各向同性下不同分量不相关，每个分量的平方平均为 $1/3$。`}>{R`\int d\Omega\,\hat p^i\hat p^j = \sym{ch05-kron}{\delta}^{ij}\frac{4\pi}{3}.`}</Eq>
      <Derivation title={R`\eqref{5.46} 最后一项给出 $-\frac{n_{\rm c}}a\partial_j\Psi$`} collapsed steps={[
        { tex: R`\int\frac{d^3p}{(2\pi)^3}\frac{\partial f_{\rm c}}{\partial p}p\hat p^i\hat p^j=\frac1{(2\pi)^3}\int d\Omega\,\hat p^i\hat p^j\int_0^\infty dp\,p^3\frac{\partial f_{\rm c}}{\partial p}`, why: R`球坐标。` },
        { tex: R`=-\frac3{(2\pi)^3}\int d\Omega\,\hat p^i\hat p^j\int_0^\infty dp\,p^2f_{\rm c}=-\frac{3}{4\pi}\cdot\frac{4\pi}{3}\delta^{ij}\,n_{\rm c}=-\delta^{ij}n_{\rm c}`, why: R`分部积分；乘 $\partial_i\Psi$（已是一阶）时 $f_{\rm c}$ 取各向同性的零阶部分，于是角向积分用 \eqref{5.48}，径向积分给出 $n_{\rm c}/4\pi\cdot(2\pi)^3$。` },
        { tex: R`-\frac1a\frac{\partial\Psi}{\partial x^i}\times(-\delta^{ij}n_{\rm c})=+\frac{n_{\rm c}}a\frac{\partial\Psi}{\partial x^j}`, why: R`代回 \eqref{5.46}。第三项给出 $-[H+\dot\Phi](-4n_{\rm c}u^j_{\rm c})\to4Hn_{\rm c}u^j_{\rm c}$（$\dot\Phi u$ 为二阶）。` },
      ]} />
      <Tx>{R`所以 Boltzmann 方程的一阶矩为`}</Tx>
      <Eq n="5.49" title="一阶矩（动量守恒）" say="暗物质动量密度的演化：随膨胀衰减（4H 项：数密度稀释 3H + 动量红移 H），并被引力势梯度驱动。">{R`\frac{\partial(n_{\rm c}u^j_{\rm c})}{\partial t} + 4Hn_{\rm c}u^j_{\rm c} + \frac{n_{\rm c}}a\frac{\partial\Psi}{\partial x^j} = 0.`}</Eq>
      <Tx>{R`这个方程没有零阶部分，因为速度是一阶量。所以只需提取一阶项，这允许我们处处令 $n_{\rm c}\to\bar n_{\rm c}$。利用 \eqref{5.43} 得到的时间依赖（$\partial_t\bar n_{\rm c}=-3H\bar n_{\rm c}$），得到`}</Tx>
      <Eq n="5.50" say="暗物质的 Euler 方程：速度因膨胀而衰减（哈勃摩擦 H u），并被引力势梯度加速。">{R`\frac{\partial u^j_{\rm c}}{\partial t} + Hu^j_{\rm c} + \frac1a\frac{\partial\Psi}{\partial x^j} = 0.`}</Eq>
      <Box kind="physics" title="层级与截断：什么叫“冷”">{R`\eqref{5.45} 与 \eqref{5.50} 是支配冷暗物质密度与速度演化的两个方程。动量守恒（**Euler 方程**）\eqref{5.50} 中没有标准的 $(\boldsymbol u\cdot\nabla)\boldsymbol u$ 项，因为任何含两个 $\boldsymbol u$ 因子的项都显然是二阶的（第 12 章研究超越线性扰动的暗物质时它会出现）。

这两个方程有一个普遍特征，来自"积分 Boltzmann 方程得到流体方程"这一过程本身：**第 $l$ 阶矩的积分方程依赖于第 $l+1$ 阶矩**。例如密度（零阶矩）的方程依赖速度（一阶矩）。这样积分下去就得到分布函数各阶矩的**无穷层级**方程。事实上，这正是求解光子 Boltzmann 方程 \eqref{5.35} 的一种方法。对 CDM，我们按"暗物质是**冷**的"这一假设，令下一阶（二阶）矩为零，从而截断了层级——具体说，丢掉了 $(p/E)^2$ 及更高阶的全部项。于是 \eqref{5.45} 与 \eqref{5.50} 是关于冷暗物质分布的**封闭**方程组（当然还需要引力势 $\Phi$、$\Psi$ 的方程——它们来自 Einstein 方程，是下一章的主题）。对速度较大的粒子，如有质量中微子，层级不能这样简单地截断，必须保留更高阶的矩。`}</Box>
      <Tx>{R`**换成 $\eta$ 与 Fourier 空间。**最后用共形时间 $\eta$ 并在 Fourier 空间改写 \eqref{5.45} 与 \eqref{5.50}。连续性方程变为`}</Tx>
      <Eq n="5.51" say={R`Fourier 空间的暗物质连续性方程：过密度的变化 = $-ik\times$ 速度（汇聚）$-3\Phi'$（局域体积变化）。`}>{R`{\delta_{\rm c}}' + iku_{\rm c} + 3\Phi' = 0.`}</Eq>
      <Tx>{R`这里同样假设速度无旋，$u^i_{\rm c}=(k^i/k)u_{\rm c}$。Euler 方程为`}</Tx>
      <Eq n="5.52" say={R`Fourier 空间的暗物质 Euler 方程：速度因膨胀以 $a'/a$ 的速率衰减，并被引力势（梯度 $ik\Psi$）驱动。`}>{R`{u_{\rm c}}' + \frac{a'}{a}u_{\rm c} + ik\Psi = 0.`}</Eq>
      <Derivation title={R`从 \eqref{5.45}、\eqref{5.50} 到 \eqref{5.51}、\eqref{5.52}`} collapsed steps={[
        { tex: R`\partial_t=\frac1a\partial_\eta,\qquad \frac1a\partial_iu^i_{\rm c}\to\frac1a ik_i\frac{k^i}{k}u_{\rm c}=\frac{ik}{a}u_{\rm c}`, why: R`共形时间与 Fourier 变换；无旋速度。` },
        { tex: R`\frac1a\left[\delta_{\rm c}'+iku_{\rm c}+3\Phi'\right]=0`, why: R`\eqref{5.45} 每一项都有 $1/a$，约去即 \eqref{5.51}。` },
        { tex: R`\frac1a\left[u_{\rm c}'+aHu_{\rm c}+ik\Psi\right]=0,\qquad aH=\frac{a'}{a}`, why: R`\eqref{5.50} 乘以 $k^j/k$ 并换变量；$aH=\dot a=a'/a$，即 \eqref{5.52}。` },
      ]} />
      <Tx>{R`这个方程至少部分地证明了"$\boldsymbol u_{\rm c}$ 无旋"的假设是合理的：它表明 $\boldsymbol u_{\rm c}$ 由一个标量势 $\Psi$ 的梯度驱动。任何旋度分量都只能来自速度的初始条件（而且由 $a'/a$ 项可知它会按 $1/a$ 衰减）。`}</Tx>
    </Sec>);
}
