// §3.2 Boltzmann equation —— 式 (3.15)–(3.48)，图 3.2–3.3
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { PhaseSpacePlot } from "./_ch03_plots.jsx";

import { CollisionRedraw } from "./_redraw_cosmo_basics.jsx";

const R = String.raw;

export function Sec32() {
  return (
    <Sec n="3.2" title="Boltzmann equation" zh="Boltzmann 方程"
      gist={R`用分布函数 $f(\boldsymbol x,\boldsymbol p,t)$ 统计地描述粒子；无碰撞时 $f$ 沿粒子轨迹守恒（$df/dt=0$），有碰撞时 $df/dt=C[f]$。在膨胀宇宙中这化为 $\partial_tf+\frac pE\frac{\hat p^i}a\partial_if-Hp\,\partial_pf=C[f]$。`}
      why={R`宇宙学不关心单个粒子的命运，只关心大量粒子的**集体**行为；而 Einstein 方程右边的能动张量正是由分布函数给出的。要知道物质和辐射如何演化，就需要分布函数的运动方程。`}
      gives={["3.15", "3.19", "3.20", "3.23", "3.24", "3.38", "3.43", "3.48"]}>
      <p className="muted">本节概念：<C id="phase_space" /> · <C id="boltzmann" /> · <C id="equilibrium" /> · <C id="number_density" /> · <C id="collision" /></p>
      <Tx>{R`**我们要解决的问题。**处理完均匀宇宙中的引力，转向支配物质和辐射的方程。在宇宙学里，我们关心的不是单个粒子，而是粒子在**统计**意义上的行为。所以像 §2.3 那样，考虑占据某个空间区域的一群粒子。在经典物理中，这群粒子由其位置和动量的集合 $\{\boldsymbol x_i,\boldsymbol p_i\}$ 完全描述。像 §2.3 那样，可以通过 $(\boldsymbol x,\boldsymbol p)$ 附近一个小相空间元中的粒子数来定义**分布函数**：`}</Tx>
      <Eq n="3.15" say="相空间小格子里的粒子数 = 分布函数 $\times$ 小格子的体积（以 $(2\pi)^3$ 为单位）：分布函数就是“每个量子态上平均有几个粒子”。">{R`N(\vx,\vp,t) = f(\vx,\vp,t)\,(\Delta x)^3\frac{(\Delta p)^3}{(2\pi)^3}.`}</Eq>
      <Tx>{R`当所考虑的体积元内粒子数很大时，$f(\boldsymbol x,\boldsymbol p,t)$ 趋于一个描述整群粒子状态的**连续函数**，我们不再需要追踪单个粒子。前面已经看到，（自然单位下）恰当的积分测度是 $d^3x\,d^3p/(2\pi)^3$。注意不必把能量作为独立变量：相空间中每一点上，$E$ 完全由 $(\boldsymbol x,\boldsymbol p)$ 决定。

**从粒子的运动方程到 $f$ 的运动方程。**我们希望得到支配分布函数的方程，它应当唯一地由单个粒子所服从的运动方程推出。先忽略粒子间的相互作用。这时作用在粒子上的只有**长程力**，可以用一个力场（更准确地说是加速度场）$\boldsymbol a(\boldsymbol x,\boldsymbol p,t)$ 描述。它可以是引力——此时 $\boldsymbol a=-\nabla\Psi(\boldsymbol x,t)$，引力势 $\Psi$（定义见下文 \eqref{3.49}）与粒子动量无关——也可以是电磁场的洛伦兹力。利用动量 $\boldsymbol p$ 的定义，非相对论粒子的运动方程为`}</Tx>
      <Eq n="3.16" say="非相对论粒子的运动方程：位置的变化率是速度 p/m，动量的变化率是质量乘加速度（牛顿第二定律）。">{R`\dot{\vx} = \frac{\vp}{m};\qquad \dot{\vp} = m\,\boldsymbol a(\vx,\vp,t).`}</Eq>
      <Tx>{R`粒子数守恒，可以形式化地表述为 $f$ 的**全**时间导数为零：`}</Tx>
      <Eq n="3.17" keyEq title="无碰撞 Boltzmann 方程（Liouville 定理）" say="跟着一小团粒子在相空间中走，分布函数的值不变：粒子数守恒，相空间体积守恒。全导数 = 偏导 + 位置流动项 + 动量流动项。">{R`\frac{df(\vx,\vp,t)}{dt} = 0\quad\text{where}\quad \frac{d}{dt} = \frac{\partial}{\partial t} + \dot{\vx}\cdot\nabla_x + \dot{\vp}\cdot\nabla_p`}</Eq>
      <Tx>{R`是全（而非偏）时间导数，$\nabla_x$、$\nabla_p$ 分别表示对自变量 $\boldsymbol x$ 和 $\boldsymbol p$ 的梯度。代入运动方程，这成为`}</Tx>
      <Eq n="3.18" say="固定相空间中的一点看：f 的变化率等于“从邻近位置流进来的”减去“流出去的”，再加上力把粒子在动量方向上推进推出的效果。">{R`\begin{aligned}\frac{\partial f(\vx,\vp,t)}{\partial t} &= -\dot{\vx}\cdot\nabla_xf(\vx,\vp,t) - \dot{\vp}\cdot\nabla_pf(\vx,\vp,t)\\ &= -\frac{\vp}{m}\cdot\nabla_xf(\vx,\vp,t) - m\,\boldsymbol a(\vx,\vp,t)\cdot\nabla_pf(\vx,\vp,t).\end{aligned}`}</Eq>
      <Tx>{R`**解读。**分布函数的变化率 $\partial f/\partial t$ 取决于有多少粒子流入、流出所考虑的相空间体积元；等价地说，一群粒子在相空间中所占据的**体积守恒**（\figref{3.2}）。难处在于：这些粒子本身一般以很复杂的方式在相空间中运动——这使问题比 \eqref{3.17} 看上去要难。

**加入碰撞。**若粒子间相互作用重要，方程右边就要加一个源项——**碰撞项**（collision term），描述粒子如何从一个相空间元被搬到另一个（通常在同一位置 $\boldsymbol x$）：`}</Tx>
      <Eq n="3.19" keyEq title="Boltzmann 方程" say="沿轨迹看，分布函数的变化完全来自碰撞：左边是“自由流动 + 引力”，右边是粒子间的相互作用。宇宙学中物质与辐射的一切演化都写成这个形式。">{R`\frac{df}{dt} = C[f].`}</Eq>
      <Tx>{R`如何推导碰撞项留到 §3.2.3。

**回报：能动张量。**做这些工作的回报是：由分布函数可以推出这群粒子的一切宏观性质，比如密度和压强（§2.3 已见）。其中特别重要的是能动张量 $T_{\mu\nu}$，因为它出现在 Einstein 方程 \eqref{3.1} 的右边。给定分布函数，能动张量的相对论表达式为`}</Tx>
      <Eq n="3.20" keyEq title="由分布函数构造能动张量" say="能动张量 = 对所有动量求和的“四动量密度 $\times$ 速度”：$P_\nu$ 加权给出四动量密度，乘以 $P^\mu/P^0$ 变成流；根号里的度规行列式保证它满足正确的守恒律。">{R`T^\mu{}_\nu(\vx,t) = \frac{\sym{ch03-gdeg}{g}}{\sqrt{-\det[g_{\alpha\beta}]}}\int\frac{dP_1dP_2dP_3}{(2\pi)^3}\frac{P^\mu P_\nu}{P^0}f(\vx,\vp,t),`}</Eq>
      <Tx>{R`其中简并度 $\sym{ch03-gdeg}{g}$ 计算分布函数 $f$ 实际描述了多少种不同的粒子态。$P^\mu=dx^\mu/d\lambda$ 是 (2.26) 定义的**共动动量**，$P_\mu=g_{\mu\nu}P^\nu$；而**物理动量** $\boldsymbol p$ 与 $P^i$ 的关系见 (2.32)。用度规作用在 $P^\mu P_\nu$ 上就能升降这个张量的指标。

\eqref{3.20} 的推导相当微妙（Ma & Bertschinger 1995），这里只简要说明各个因子的含义：

◆ 能动张量本质上给出分布函数 $f$ 的粒子所携带的**四动量的流密度**；

◆ 对 $f$ 的动量积分给出粒子数密度，再以 $P_\nu$ 加权就得到四动量密度；

◆ 要得到"流"，还需乘以速度 $P^\mu/P^0$——正如电荷流 $\boldsymbol j=n\boldsymbol v$；

◆ 含度规行列式的前因子本质上是一个几何因子，保证 $T^\mu{}_\nu$ 服从正确的守恒律 $\nabla_\mu T^\mu{}_\nu=0$。

在 \exref{3.7} 中你将证明：在均匀宇宙中，\eqref{3.20} 回到 §2.3 引入的能量密度和压强表达式（$T^0{}_0=-\rho$，$T^i{}_i/3=\mathcal P$）。`}</Tx>

      <Sub n="3.2.1" title="Boltzmann equation for particles in a harmonic potential" zh="谐振势中粒子的 Boltzmann 方程">
        <Tx>{R`**为什么先做一个玩具模型？**我们先从最简单的情形起步：一维中受 $x^2$ 势支配的非相对论粒子。这个 Boltzmann 方程展示了下一节将遇到的完整广义相对论版本的**全部本质特征**，但代数要简单得多，物理一目了然。当后面几章的代数快要遮住物理时，记住这个例子会很有帮助。

考虑生活在一维谐振势阱中的自由粒子，它们的能量为`}</Tx>
        <Eq n="3.21" say="一维谐振子的能量 = 动能 + 弹簧势能。">{R`E = \frac{p^2}{2m} + \frac12kx^2,`}</Eq>
        <Tx>{R`其中 $k$ 是弹簧常数。分布函数现在是三个标量自变量的函数 $f=f(x,p,t)$。\figref{3.2} 画出了这样一群粒子在相空间中的移动（全节只考虑无碰撞情形 $C[f]=0$）。全导数 $df/dt$ 为零，因为 $t_1$ 时那一团中的粒子数等于 $t_2$ 时的粒子数；随时间变化的是粒子在相空间中的**位置**。

换个角度：也可以把 $x$ 和 $p$ 看作独立变量（不依赖于 $t$），对 $f$ 分别求 $t$、$x$、$p$ 的偏导。这三个偏导都不为零，但它们的恰当加权和 [\eqref{3.17}] 为零。`}</Tx>
        <Figure n="3.2" caption={R`谐振势中一群无碰撞粒子的相空间。$t_1$ 时的初始分布在相空间中移动，于 $t_2$ 时到达另一位置。粒子所占的相空间体积在演化中守恒。对谐振势，连相空间体积的**形状**都保持不变；一般情况下形状会随时间演化而扭曲。（自绘交互：拖动时间滑块观察云团绕原点转动；把非谐系数 $\sym{ch03-lamanh}{\lambda}$ 调大，云团会被拉成细丝，但其相空间体积仍守恒。）`} illustration={<PhaseSpacePlot />} />
        <Tx>{R`要确定 \eqref{3.17} 中的系数 $\dot x$ 和 $\dot p$，必须用运动方程——即 \eqref{3.16} 的一维版本。由牛顿力学，`}</Tx>
        <Eq n="3.22" say="谐振子的运动方程：速度是 p/m，弹簧力 −kx 改变动量。">{R`\dot x = \frac{p}{m}\quad\text{and}\quad \dot p = -kx.`}</Eq>
        <Tx>{R`推广到相对论情形时，这些熟悉的方程将被 §2.1.2 推出的测地线方程取代。眼下的无碰撞 Boltzmann 方程为`}</Tx>
        <Eq n="3.23" keyEq title="谐振势中的无碰撞 Boltzmann 方程" say="三项依次是：f 的显式时间变化、粒子以速度 p/m 在空间中流动、弹簧力使粒子获得或失去动量。">{R`\frac{\partial f}{\partial t} + \frac{p}{m}\frac{\partial f}{\partial x} - kx\frac{\partial f}{\partial p} = 0.`}</Eq>
        <Tx>{R`第二项支配粒子在真实空间中移动得多快，前面的系数就是速度 $v=p/m$；最后一项支配粒子失去或获得动量的快慢。`}</Tx>
        <Box kind="example" title="解出来看看：相空间中的刚性转动">{R`取 $m=k=1$（图 3.2 用的正是这组单位），特征线 $\dot x=p$、$\dot p=-x$ 的解是 $x(t)=x_0\cos t+p_0\sin t$，$p(t)=p_0\cos t-x_0\sin t$——相空间中**绕原点的顺时针刚性转动**，周期 $2\pi\sqrt{m/k}$。由于 $f$ 沿特征线不变，$f(x,p,t)=f_{\rm init}(x\cos t-p\sin t,\;p\cos t+x\sin t)$ 就是 \eqref{3.23} 的通解。图 3.2 中 $t_1=0$ 时云团中心约在 $(1.0,\,0.2)$，代入 $t_2=3.0$：$x=\cos3+0.2\sin3=-0.96$，$p=0.2\cos3-\sin3=-0.34$，正是图中 $t_2$ 处云团的位置。`}</Box>
        <Tx>{R`**平衡分布。**要解 Boltzmann 方程这个关于 $(x,p,t)$ 的偏微分方程，需要知道分布函数的初始条件。不过即便不知道初始条件，Boltzmann 方程也能给出有用的洞见。考虑**静态**分布，定义为 $\partial f/\partial t=0$（区别于总是成立的 $df/dt=0$）。这样的分布也称为**平衡分布**（equilibrium distribution）：在每个空间点 $x$ 处，具有给定动量 $p$ 的粒子数在统计意义上保持不变。当然，这并不意味着粒子本身不动。平衡分布的一个一般解是`}</Tx>
        <Eq n="3.24" keyEq title="平衡分布" say="只依赖于能量的任何分布都是平衡分布：粒子沿等能线运动，等能线上处处 f 相同，流进流出相抵。">{R`f(p,x) = f_{\rm EQ}(E[p,x]);`}</Eq>
        <Tx>{R`即 $f$ 只是能量 $E$ 的函数。要验证这确实是解，考虑`}</Tx>
        <Eq n="3.25" say="对只依赖 E 的 f，流动项与力项合起来正比于“沿轨迹的能量变化率”，而这恰为零——能量守恒保证了平衡。">{R`\begin{aligned}\frac pm\frac{\partial f(E)}{\partial x} - kx\frac{\partial f(E)}{\partial p} &= \frac{df}{dE}\left[\frac pm\frac{\partial E}{\partial x} - kx\frac{\partial E}{\partial p}\right]\\ &= 0,\end{aligned}`}</Eq>
        <Tx>{R`第二个等号由 \eqref{3.21} 得到：$\partial E/\partial x=kx$，$\partial E/\partial p=p/m$，方括号为 $\frac pm kx-kx\frac pm=0$。所以**任何只依赖能量的函数**都是平衡分布。

在无碰撞（如此处所假设）的情况下，哪个平衡分布是正确的，完全取决于初始条件。但若存在相互作用，平衡分布还必须使碰撞项为零：$C[f_{\rm EQ}]=0$。一般来说这会把 $f$ 驱向 §2.3 介绍过的那些熟悉的平衡分布（玻色–爱因斯坦、费米–狄拉克）。`}</Tx>
        <Box kind="physics" title="“静态”不等于“不动”">{R`在交互图中把初始云团换成一个沿等能椭圆均匀铺开的环：每个粒子都在转，但环作为整体看起来静止——这就是 $\partial f/\partial t=0$ 而粒子仍在运动。图 3.2 中的偏心小云团则不是平衡分布：它不是 $E$ 的函数，所以 $\partial f/\partial t\neq0$。`}</Box>
      </Sub>

      <Sub n="3.2.2" title="Boltzmann equation in an expanding universe" zh="膨胀宇宙中的 Boltzmann 方程">
        <Tx>{R`**我们要做的事。**到目前为止，我们在 Minkowski 空间（参见 \eqref{3.16}）——即适合地球上实验室实验的背景——中研究了 Boltzmann 方程。现在推广到膨胀时空。由 §2.1.2 知道，运动方程 \eqref{3.16} 推广为测地线方程，三维动量 $\boldsymbol p$ 相应提升为四矢量`}</Tx>
        <Eq n="3.26" say="四动量是坐标对仿射参数的导数（与第 2 章的定义相同）。">{R`P^\mu \equiv \frac{dx^\mu}{d\lambda}`}</Eq>
        <Tx>{R`其中 $\lambda$ 仍是参数化粒子路径的参数，同 (2.20)（同样不需要明确给出 $\lambda$）。然而，一群粒子的分布函数**仍然**定义在**六维**相空间上：首先，时间仍像以前一样单独记录；其次，每个粒子的四动量服从**质壳约束**（mass-shell constraint）`}</Tx>
        <Eq n="3.27" say="四动量的“长度平方”等于负的静质量平方：四个分量中只有三个是独立的。">{R`P^2 \equiv g_{\mu\nu}P^\mu P^\nu = -m^2,`}</Eq>
        <Tx>{R`其中 $m$ 是粒子的静质量（可以为零，例如光子）。把 (2.32) 推广为三维动量模长的定义`}</Tx>
        <Eq n="3.28" say="物理动量的平方由空间度规与四动量的空间分量构成——这是局域观测者真正测到的动量。">{R`p^2 \equiv g_{ij}P^iP^j,`}</Eq>
        <Tx>{R`对 FLRW 度规（$g_{00}=-1$），\eqref{3.27} 成为`}</Tx>
        <Eq n="3.29" say="FLRW 中质壳条件就是熟悉的相对论能量–动量关系：$E^2=p^2+m^2$。">{R`E^2 \equiv (P^0)^2 = p^2 + m^2.`}</Eq>
        <Tx>{R`这样我们就用 $\boldsymbol p$ 消去了 $P^0$，可以像以前一样为分布函数 $f(\boldsymbol x,\boldsymbol p,t)$ 写出相对论性的 Boltzmann 方程。

**把动量拆成大小与方向。**把对 $\boldsymbol p$ 的依赖拆成对其大小 $p\equiv\sqrt{p^2}$ 与单位矢量 $\hat p^i=\hat p_i$ 的依赖会更方便，后者按定义满足 $\delta_{ij}\hat p^i\hat p^j=1$。我们预期 $\hat p^i$ 正比于共动动量 $P^i$，把比例常数记为 $\sym{ch03-Ccoef}{C}$：`}</Tx>
        <Eq n="3.30" say="共动动量的空间分量与动量方向单位矢量同向，只差一个待定的比例系数 C。">{R`P^i \equiv \sym{ch03-Ccoef}{C}\hat p^i.`}</Eq>
        <Tx>{R`用 \eqref{3.28} 确定系数 $\sym{ch03-Ccoef}{C}$：`}</Tx>
        <Eq n="3.31" say="把 $P^i=C\hat p^i$ 代回物理动量的定义，FLRW 的空间度规 $a^2\delta_{ij}$ 给出 $p=aC$。">{R`\begin{aligned}p^2 &= g_{ij}\hat p^i\hat p^j\sym{ch03-Ccoef}{C}^2\\ &= a^2\delta_{ij}\hat p^i\hat p^j\sym{ch03-Ccoef}{C}^2\\ &= a^2\sym{ch03-Ccoef}{C}^2.\end{aligned}`}</Eq>
        <Tx>{R`\eqref{3.31} 告诉我们 $\sym{ch03-Ccoef}{C}=p/a$，所以凡遇到 $P^i$，总可以用 $p$、$\hat p^i$ 消去它：`}</Tx>
        <Eq n="3.32" say="共动动量 = 物理动量 / $a$ $\times$ 方向：同样的物理动量，在越早（$a$ 越小）时对应越大的“坐标速度”。">{R`P^i = \frac pa\hat p^i.`}</Eq>
        <Tx>{R`于是 \eqref{3.17} 可以写成`}</Tx>
        <Eq n="3.33" keyEq title="全导数的四项" say="分布函数沿轨迹的全变化 = 显式时间变化 + 位置变化引起的 + 动量大小变化引起的 + 动量方向变化引起的。接下来的任务就是从测地线方程求出 $dx^i/dt$、$dp/dt$、$d\hat p^i/dt$。">{R`\frac{df}{dt} = \frac{\partial f}{\partial t} + \frac{\partial f}{\partial x^i}\cdot\frac{dx^i}{dt} + \frac{\partial f}{\partial p}\frac{dp}{dt} + \frac{\partial f}{\partial\hat p^i}\cdot\frac{d\hat p^i}{dt}.`}</Eq>
        <Tx>{R`**逐项处理。**再强调一次：本节只推导**光滑**膨胀宇宙中的 Boltzmann 方程。由 §2.1.2 已知，在膨胀宇宙中粒子动量的**方向**不变（尽管大小会变）。所以可以立刻扔掉最后一项（$\propto d\hat p^i/dt$）。

接着改写右边第二项（$\propto dx^i/dt$）。回忆 $P^i\equiv dx^i/d\lambda$、$P^0\equiv dt/d\lambda$，于是`}</Tx>
        <Eq n="3.34" say="粒子的坐标速度 = 物理速度 p/E 除以 a：同样的物理速度，在共动坐标里走得更慢，因为每个共动单位对应 a 倍的物理长度。">{R`\begin{aligned}\frac{dx^i}{dt} &= \frac{dx^i}{d\lambda}\frac{d\lambda}{dt}\\ &= \frac{P^i}{P^0} = \frac pE\frac{\hat p^i}{a},\end{aligned}`}</Eq>
        <Tx>{R`这里用了 \eqref{3.29} 和 \eqref{3.32}。下面求 $dp/dt$。回忆测地线方程 (2.20) 的时间分量可写为`}</Tx>
        <Eq n="3.35" say="测地线方程的时间分量：能量沿路径的变化由 $\Gamma^0{}_{\alpha\beta}$ 与动量的乘积决定。">{R`\frac{dP^0}{d\lambda} = -\Gamma^0{}_{\alpha\beta}P^\alpha P^\beta.`}</Eq>
        <Tx>{R`把对 $\lambda$ 的导数写成对时间的导数乘以 $dt/d\lambda=P^0$。用 FLRW 度规的 Christoffel 符号（只有 $\Gamma^0{}_{ij}$ 非零），得到`}</Tx>
        <Eq n="3.36" say="FLRW 中只有纯空间的 $\Gamma^0{}_{ij}$ 有贡献：能量的变化完全来自膨胀对空间动量的“拖拽”。">{R`P^0\frac{dP^0}{dt} = -\Gamma^0{}_{ij}P^iP^j.`}</Eq>
        <Tx>{R`把质壳关系 \eqref{3.29} 写成 $P^0dP^0/dt=\frac12d(E^2)/dt=\frac12d(p^2)/dt$（$m$ 为常数），右边用 (2.24) 的 $\Gamma^0{}_{ij}=\delta_{ij}a\dot a$ 与 \eqref{3.32}：$-\delta_{ij}a\dot a\,(p/a)^2\hat p^i\hat p^j=-Hp^2$。于是`}</Tx>
        <Eq n="3.37" keyEq title="动量红移" say="在未扰动的膨胀宇宙中，任何粒子的物理动量都以哈勃率衰减：$p\propto1/a$——这是第三次推出这个结论。">{R`p\frac{dp}{dt} = -Hp^2\quad\Rightarrow\quad\frac{dp}{dt} = -Hp.`}</Eq>
        <Tx>{R`这个方程说：在未扰动的膨胀宇宙中，**任何**粒子的物理动量都按 $1/a$ 衰减——上一章已经知道了这个事实（第 1 章是手势论证，第 2 章是测地线，这里是第三次）。最终我们得到均匀膨胀宇宙中的 Boltzmann 方程：`}</Tx>
        <Eq n="3.38" keyEq title="膨胀宇宙中的 Boltzmann 方程" say="膨胀宇宙中分布函数的演化：第二项是粒子以速度 $p/E$ 在共动网格上流动，第三项是膨胀使所有动量红移；右边是碰撞。">{R`\frac{\partial f}{\partial t} + \frac pE\frac{\hat p^i}{a}\frac{\partial f}{\partial x^i} - Hp\frac{\partial f}{\partial p} = C[f].`}</Eq>
        <Tx>{R`也许你会奇怪：既然假设了宇宙均匀，为什么还保留 $\partial f/\partial x^i$ 那一项？答案很简单：保留它很容易，而且后面处理扰动时需要它的推广。

**两个极限。**\eqref{3.38} 对**所有**粒子都成立。但我们会经常遇到它的两个极限。在**相对论**极限 $p\gg m$ 下，$E\simeq p$，得到`}</Tx>
        <Eq n="3.39" say="相对论粒子（光子、早期的中微子）以光速流动，流动项系数就是 $\hat p^i/a$。">{R`\frac{\partial f}{\partial t} + \frac{\hat p^i}{a}\frac{\partial f}{\partial x^i} - Hp\frac{\partial f}{\partial p} = C[f].`}</Eq>
        <Tx>{R`它适用于光子，也适用于仍处于相对论性阶段的中微子。在相反的**非相对论**极限下，$p\ll m$，$E\simeq m$，\eqref{3.38} 成为`}</Tx>
        <Eq n="3.40" say="非相对论粒子的流动项被速度 $p/m\ll1$ 压低：冷物质几乎不在空间中“流动”。">{R`\frac{\partial f}{\partial t} + \frac pm\frac{\hat p^i}{a}\frac{\partial f}{\partial x^i} - Hp\frac{\partial f}{\partial p} = C[f].`}</Eq>
        <Tx>{R`特别注意：第二项前面的系数现在很小，被速率 $|\boldsymbol v|=p/m$ 压低了。`}</Tx>
        <Box kind="aside" title="检验：自由流动的分布函数（习题 3.9 的核心）">{R`无碰撞时 $C[f]=0$，均匀宇宙中 \eqref{3.38} 化为 $\partial f/\partial t=Hp\,\partial f/\partial p$。任何形如 $f(p,t)=F(p\,a(t))$ 的函数都是解：$\partial_tf=F'\,p\dot a$，$Hp\,\partial_pf=\frac{\dot a}{a}p\,F'a=F'\,p\dot a$。也就是说，分布函数只是被"整体平移"到更低的动量，**形状**不变——这正是退耦后的中微子保持 $1/(e^{p/T_\nu}+1)$ 形状、且 $T_\nu\propto1/a$ 的原因。`}</Box>

        <Tx>{R`**积分出数密度方程。**现在推导 Boltzmann 方程如何帮助我们计算所考虑成分的数密度演化。数密度 $n(\boldsymbol x,t)$ 就是 $f(\boldsymbol x,\boldsymbol p,t)$ 对所有动量的积分。所以把 \eqref{3.38} 对 $\boldsymbol p$ 积分，并利用均匀宇宙中 $\partial f/\partial x^i=0$：`}</Tx>
        <Eq n="3.41" say="把 Boltzmann 方程对所有动量积分：第一项给出数密度的时间导数，第二项是膨胀项，右边是碰撞的净效果。">{R`\int\frac{d^3p}{(2\pi)^3}\frac{\partial f}{\partial t} - H\int\frac{d^3p}{(2\pi)^3}p\frac{\partial f}{\partial p} = \int\frac{d^3p}{(2\pi)^3}C[f].`}</Eq>
        <Tx>{R`左边第二项可以分部积分：`}</Tx>
        <Eq n="3.42" say="分部积分：$p^3\partial_pf$ 的积分等于 −3 乘 $p^2f$ 的积分（边界项为零），所以膨胀项正比于 −3n。">{R`\int\frac{d^2\hat p}{(2\pi)^3}\int_0^\infty p^2dp\,p\frac{\partial f}{\partial p} = -3\int\frac{d^2\hat p}{(2\pi)^3}\int_0^\infty p^2dp\,f(\vp),`}</Eq>
        <Tx>{R`这里用了：对任何正常的分布函数，$p^3f(\boldsymbol p)$ 在 $p=0$ 和 $p\to\infty$ 处都为零。于是 \eqref{3.41} 成为`}</Tx>
        <Eq n="3.43" keyEq title="数密度方程" say="粒子数密度因膨胀以 3H 的速率稀释；只有碰撞（产生、湮灭）能改变共动体积内的粒子数 $na^3$。">{R`\frac{dn(t)}{dt} + 3Hn(t) = \int\frac{d^3p}{(2\pi)^3}C[f].`}</Eq>
        <Tx>{R`**解读。**无碰撞时，左边为零，等价于 $d(na^3)/dt=0$：粒子数按 $a^{-3}$ 衰减——这我们早已知道：共动网格膨胀时，包含固定粒子数的区域体积按 $a^3$ 增长，所以这些粒子的物理数密度按 $a^{-3}$ 下降。但如果碰撞项的动量积分不为零，碰撞就能改变这一行为。第 4 章的暗物质冻结、核合成、复合，都是这个方程右边的故事。下面就来讨论碰撞。`}</Tx>
      </Sub>

      <Sub n="3.2.3" title="Collision terms" zh="碰撞项">
        <Tx>{R`**碰撞是什么。**在 Boltzmann 方程的语境里，粒子之间的直接相互作用统称为"碰撞"。碰撞既包括散射，也包括对产生、湮灭和粒子衰变。一种常见的过程是：类型 1 和 2 的粒子相互作用，生成类型 3 和 4 的粒子：`}</Tx>
        <Eq n="3.44" say="一般的两体反应：粒子 1（动量 $\boldsymbol p$）与粒子 2（动量 $\boldsymbol q$）变成粒子 3（$\boldsymbol p'$）与粒子 4（$\boldsymbol q'$），也可以反向进行。">{R`(1)_{\vp} + (2)_{\boldsymbol q} \longleftrightarrow (3)_{\vp'} + (4)_{\boldsymbol q'},`}</Eq>
        <Tx>{R`下标表示动量。注意这包括电子与光子的散射——取 $(1)=(3)=(e^-)$、$(2)=(4)=(\gamma)$（Compton 散射）；也包括湮灭——取 $(1)=(e^-)$、$(2)=(e^+)$、$(3)=(4)=(\gamma)$。此外，一切微观物理过程都守恒动量和能量：`}</Tx>
        <Eq n="3.45" say="反应前后总动量、总能量都守恒。">{R`\vp + \boldsymbol q = \vp' + \boldsymbol q';\qquad E_1(\vp) + E_2(\boldsymbol q) = E_3(\vp') + E_4(\boldsymbol q'),`}</Eq>
        <Tx>{R`其中 $E_s(p)=\sqrt{p^2+m_s^2}$ 是粒子 $s$ 的能量–动量关系 [\eqref{3.29}]。每类粒子有各自的分布函数 $f_s(\boldsymbol x,\boldsymbol p,t)$，$s=1,2,3,4$。宇宙学中，不同的态（如自旋）常常具有相同的分布函数；所以不必用不同的函数分别追踪，而是赋予恰当的统计权重 $g_s$。

**反应怎样改变 $f_1$？**首先，我们处理的是空间和时间上的**局域**相互作用，所以所有分布函数都在同一 $(\boldsymbol x,t)$ 处取值，只需确定动量自变量。以 $f_1(\boldsymbol x,\boldsymbol p,t)$ 为例，\eqref{3.44} 意味着：要**减去**被正向反应从动量 $\boldsymbol p$ 散射走的类型 1 粒子，并**加上**被逆向反应散射到动量 $\boldsymbol p$ 的类型 1 粒子（\figref{3.3}）。因此必须对所有影响 $f_1(\boldsymbol p)$ 的其他动量 $(\boldsymbol q,\boldsymbol q',\boldsymbol p')$ 求和。示意地，碰撞项为`}</Tx>
        <Figure n="3.3" caption={R`自绘交互：固定位置的一组允许运动学态中，正向 $1+2\to3+4$ 反应减少粒子 1，逆向反应增加粒子 1。点击按钮按一次反应更新四种计数，比较增益和损失权重。这个 $2\leftrightarrow2$ 示例守恒总粒子数，不要求各物种数守恒；忽略量子统计因子。`} illustration={<CollisionRedraw />} />
        <Eq n="3.46" say="碰撞项的骨架：对所有满足守恒律的动量组合求和，权重是振幅平方；逆反应（3+4→1+2）加粒子，正反应（1+2→3+4）减粒子。">{R`\begin{aligned}C[f_1(\vp)] = \sum_{\boldsymbol q,\boldsymbol q',\vp'}^{\vp+\boldsymbol q=\vp'+\boldsymbol q'}&\delta_{\rm D}^{(1)}(E_1(p)+E_2(q)-E_3(p')-E_4(q'))\,|\mathcal M|^2\\ &\times\{f_3(\vp')f_4(\boldsymbol q') - f_1(\vp)f_2(\boldsymbol q)\},\end{aligned}`}</Eq>
        <Tx>{R`其中 Dirac $\delta_{\rm D}$ 函数强制能量守恒。散射振幅的平方 $|\mathcal M|^2$ 取决于相互作用的微观细节，可以用 Feynman 图计算。由于是两粒子相互作用，散射率取决于分布函数的乘积：正向反应 $\propto f_1f_2$，逆向反应 $\propto f_3f_4$。而且正、逆反应的振幅**相同**。此后我们不再写出分布函数的自变量 $\boldsymbol x$、$t$，因为它们都在同一 $\boldsymbol x$ 和 $t$ 处取值。

**量子修正：受激发射与泡利阻塞。**\eqref{3.46} 忽略了一样东西：量子效应，例如受激发射（或称玻色增强）与泡利不相容原理（或称泡利阻塞）。它们依**末态**的占据情况增强或抑制反应率。计入它们相当于给正向反应乘上 $(1\pm f_3)(1\pm f_4)$，给逆向反应乘上 $(1\pm f_1)(1\pm f_2)$；对应粒子是玻色子取加号，费米子取减号。泡利阻塞尤其直观：若费米子 1 对应动量 $\boldsymbol p$ 的态已被占据，因子 $(1-f_1(\boldsymbol p))$ 为零，以此为末态的逆反应就不会发生——正如所需。反之，若粒子 1 是玻色子，相应反应率会被增强，因为玻色子喜欢挤在同一个态。

**补上相空间测度。**最后，在 \eqref{3.46} 中放入恰当的因子，以正确地对相空间求和。第一，如图 2.4，相空间体积元是 $d^3p/(2\pi)^3$［实为 $d^3p/(2\pi\hbar)^3$］。第二，在相对论情形下，相空间积分是**四维**的：动量的三个分量加上能量。但能量受到在壳条件 \eqref{3.29} 的约束，要求 $E_s=(p^2+m_s^2)^{1/2}$。于是能量积分可以这样做掉：`}</Tx>
        <Eq n="3.47" say="四维动量积分配上在壳 $\delta_{\rm D}$ 函数，做掉能量积分后留下一个 $1/2E$ 的因子——这就是洛伦兹不变的相空间测度。">{R`\int d^3p\int_0^\infty dE\,\delta_{\rm D}^{(1)}(E^2-p^2-m^2) = \int d^3p\int_0^\infty dE\frac{\delta_{\rm D}^{(1)}\left(E-\sqrt{p^2+m^2}\right)}{2E}.`}</Eq>
        <Tx>{R`（这里用了 $\delta(g(E))=\delta(E-E_0)/|g'(E_0)|$，$g'=2E$；负能根被积分下限排除。）用 $\delta_{\rm D}$ 函数完成对 $E$ 的积分，得到因子 $1/2E$。总之，每个粒子 $i$ 要积分的无穷小相空间体积元是 $d^3p_i/[(2\pi)^32E_i(p_i)]$。于是碰撞项成为`}</Tx>
        <Eq n="3.48" keyEq title="两体碰撞项" say="完整的两体碰撞项：对另外三个粒子的洛伦兹不变相空间积分，$\delta_{\rm D}$ 函数保证能量动量守恒，振幅平方描述微观物理；花括号里是“得到 − 失去”，各带玻色增强或泡利阻塞因子。">{R`\begin{aligned}C[f_1(\vp)] = \frac{1}{2E_1(p)}&\int\frac{d^3q}{(2\pi)^32E_2(q)}\int\frac{d^3p'}{(2\pi)^32E_3(p')}\int\frac{d^3q'}{(2\pi)^32E_4(q')}|\mathcal M|^2\\ &\times(2\pi)^4\delta_{\rm D}^{(3)}[\vp+\boldsymbol q-\vp'-\boldsymbol q']\\ &\qquad\times\delta_{\rm D}^{(1)}[E_1(p)+E_2(q)-E_3(p')-E_4(q')]\\ &\times\Big\{f_3(\vp')f_4(\boldsymbol q')\left[1\pm f_1(\vp)\right]\left[1\pm f_2(\boldsymbol q)\right]\\ &\qquad - f_1(\vp)f_2(\boldsymbol q)\left[1\pm f_3(\vp')\right]\left[1\pm f_4(\boldsymbol q')\right]\Big\}.\end{aligned}`}</Eq>
        <Tx>{R`同样，$\delta_{\rm D}$ 函数强制能量和动量守恒。这个结果对 \eqref{3.44} 类型的**任何**两粒子相互作用都成立，其中 1、2、3、4 中的几个可以是同一种粒子。相互作用的全部微观细节都编码在振幅平方 $|\mathcal M(\boldsymbol p,\boldsymbol q,\boldsymbol p',\boldsymbol q')|^2$ 中，它一般依赖于所涉粒子的动量。\eqref{3.48} 可以直接推广到涉及更少粒子的过程（如粒子衰变）：由振幅、恰当的分布函数乘积与对动量的积分拼装碰撞项即可。后两章会遇到具体例子。`}</Tx>
        <Box kind="physics" title="细致平衡：为什么碰撞把 f 推向 BE / FD 分布">{R`当花括号为零时 $C[f_1]=0$。对能量守恒的反应，若所有粒子都取 $f_s=1/(e^{(E_s-\mu_s)/T}\mp1)$（玻色取 $-$，费米取 $+$），利用恒等式 $f/(1\pm f)=e^{-(E-\mu)/T}$，花括号正比于 $e^{-(E_3+E_4-\mu_3-\mu_4)/T}-e^{-(E_1+E_2-\mu_1-\mu_2)/T}$。能量守恒使指数中的 $E$ 相同，只要化学势满足 $\mu_1+\mu_2=\mu_3+\mu_4$，两项就抵消——正、逆反应在每一对动量上都精确平衡（**细致平衡**，detailed balance）。这就是第 2 章那些平衡分布的动力学来源，也是第 4 章 Saha 方程的出发点。`}</Box>
        <Tx>{R`**小结与过渡。**到此，我们已在均匀宇宙中推导出 Einstein 方程与 Boltzmann 方程。这已经足以计算宇宙的热历史（第 4 章的主题），包括暗物质的产生、大爆炸核合成和第一批原子的形成。下一节将走出光滑宇宙，考虑非均匀性——它将占据本书余下的大部分篇幅。读者可以先跳到第 4 章，以后再回来读 §3.3。`}</Tx>
      </Sub>
    </Sec>);
}
