import { LensingRedraw } from "./_redraw_early.jsx";
// §3.3 Beyond the homogeneous universe —— 式 (3.49)–(3.76)，图 3.4
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, Details, C } from "@kit";
import { PhotonPlot, DeflectionPlot } from "./_ch03_plots.jsx";

const R = String.raw;

export function Sec33() {
  return (
    <Sec n="3.3" title="Beyond the homogeneous universe" zh="超越均匀宇宙"
      gist={R`在 FLRW 度规上加两个小势 $\Psi$、$\Phi$（共形牛顿规范），解线性阶的测地线方程，得到动量的变化 $dp/dt=-(H+\dot\Phi)p-\frac Ea\hat p^i\Psi_{,i}$ 与方向的偏折；由此写出辐射与有质量粒子的线性 Boltzmann 方程。`}
      why={R`宇宙中的一切结构——CMB 各向异性、星系、引力透镜——都是对光滑宇宙的偏离。要预言它们，必须知道粒子在**不均匀**时空中怎样运动，并把这写进 Boltzmann 方程。`}
      gives={["3.49", "3.56", "3.60", "3.62", "3.69", "3.71", "3.72", "3.74", "3.76"]}>
      <p className="muted">本节概念：<C id="perturbed_metric" /> · <C id="geodesic_pert" /> · <C id="linear_boltzmann" /></p>
      <Tx>{R`**换一个难度级别。**光滑宇宙非常简单，我们得以不做任何近似就推出精确的 Einstein 方程与 Boltzmann 方程。有结构的宇宙则复杂（也丰富）得多，所以不得不依赖一些近似，其中最重要的一条是：**时空对 FLRW 形式的偏离很小**。幸运的是，在宇宙学的范围内这个近似非常精确。`}</Tx>

      <Sub n="3.3.1" title="Perturbed spacetime" zh="扰动时空">
        <Tx>{R`**扰动度规。**首先必须写出度规的形式，计入围绕 (2.12) 所描述的光滑宇宙的扰动。光滑宇宙只由一个**只依赖时间**的函数 $a(t)$ 刻画；扰动宇宙还需要另外两个函数 $\Psi$ 和 $\Phi$，它们都**同时依赖空间和时间**。用它们，度规可以写成`}</Tx>
        <Eq n="3.49" keyEq title="扰动度规（共形牛顿规范）" say="在 FLRW 度规上加两个小势：$\Psi$ 扰动时间的流逝（牛顿势），$\Phi$ 扰动空间的尺度（局域标度因子）。两者都依赖位置和时间。">{R`\begin{aligned}g_{00}(\vx,t) &= -1 - 2\Psi(\vx,t),\\ g_{0i}(\vx,t) &= 0,\\ g_{ij}(\vx,t) &= a^2(t)\delta_{ij}\left[1 + 2\Phi(\vx,t)\right].\end{aligned}`}</Eq>
        <Tx>{R`**怎样读这个度规？**

◆ 没有 $\Psi$、$\Phi$ 时，\eqref{3.49} 就是零阶均匀欧氏宇宙的 FLRW 度规；

◆ 反过来，没有膨胀（$a(t)=1$）时，这个度规描述的是**弱引力场**；

◆ $\Psi$ 对应**牛顿势**，支配慢速（非相对论）物体的运动；

◆ $\Phi$ 是**空间曲率的扰动**。由 \eqref{3.49} 也可以把它理解为标度因子的局域扰动：$a(t)\to a(\boldsymbol x,t)=a(t)\sqrt{1+2\Phi(\boldsymbol x,t)}$。

一般地，$\Phi$ 与 $\Psi$ 之间有紧密的联系，后面几章会看到（无各向异性应力时 $\Phi=-\Psi$）。

**线性阶近似。**我们宇宙中度规扰动 $\Psi$、$\Phi$ 的典型大小**小于 $10^{-4}$**。因此在这些量的**线性阶**上工作是极好的近似——也就是忽略所有二次及更高次的项。本书全程都在这个近似下工作，它大大简化了计算。`}</Tx>
        <Box kind="aside" title="两个技术要点（第 6 章详谈）">{R`**(1) 标量、矢量、张量。**按空间坐标变换下的行为，扰动可以分解为标量、矢量和张量三类。\eqref{3.49} 只包含**标量扰动**。张量扰动对应**引力波**——我们知道引力波存在——要计入它们，$g_{\mu\nu}$ 需要 $\Psi$、$\Phi$ 之外的其他函数。眼下只关注标量扰动：对宇宙中结构的起源和演化而言，它们是迄今最重要的。

**(2) 规范。**\eqref{3.49} 的形式对应一种特定的坐标选择，即**规范**（gauge）。最简单的理解方式是回想电磁学：矢势 $A_\mu$ 及其导数包含了电场和磁场的全部信息；由于给 $A_\mu$ 加上一个标量场的导数 $\partial_\mu\varphi$ 不改变物理的 $\boldsymbol E$ 和 $\boldsymbol B$，选择势时存在剩余自由度（例如常取 $A_0=0$ 或 $\partial_\mu A^\mu=0$）。度规扰动也有类似的自由：即便只考虑标量扰动，描述涨落的变量仍有相当大的选择余地。任何物理结果都必须与规范选择无关，但完全可以采用一个看起来与 \eqref{3.49} 很不一样的规范来描述同样的物理。记录在案：\eqref{3.49} 中的规范称为**共形牛顿规范**（conformal Newtonian gauge）。`}</Box>

        <Tx>{R`**一阶 Christoffel 符号。**研究 FLRW 度规 (2.12) 时，我们做的第一件事是计算 Christoffel 符号 [(2.24)–(2.25)]。现在要对一阶项——对 $\Phi$、$\Psi$ 线性的项——做同样的事。先看 $\Gamma^0{}_{\mu\nu}$，用度规写出：`}</Tx>
        <Eq n="3.50" say="Christoffel 符号的一般公式，取上指标为 0。">{R`\Gamma^0{}_{\mu\nu} = \frac12g^{0\alpha}\left[g_{\alpha\mu,\nu} + g_{\alpha\nu,\mu} - g_{\mu\nu,\alpha}\right]`}</Eq>
        <Tx>{R`同样，$_{,\alpha}$ 表示对 $x^\alpha$ 求导。$g^{0\alpha}$ 唯一的非零分量是时间分量，它是 $g_{00}=-1-2\Psi$ 的倒数。所以精确到扰动的一阶，$g^{00}=-1+2\Psi$，并且`}</Tx>
        <Eq n="3.51" say="度规对角且 $g^{00}=-1+2\Psi$（线性阶），所以 $\Gamma^0{}_{\mu\nu}$ 只需 $\alpha=0$ 一项。">{R`\Gamma^0{}_{\mu\nu} = \frac{-1+2\Psi}{2}\left[g_{0\mu,\nu} + g_{0\nu,\mu} - g_{\mu\nu,0}\right].`}</Eq>
        <Tx>{R`逐个分量处理。**先取 $\mu=\nu=0$。**方括号内三项相同，合起来是 $g_{00,0}=-2\dot\Psi$。由于只关心一阶项，前面的 $2\Psi$ 可以丢掉（它乘上一阶量就是二阶），剩下`}</Tx>
        <Eq n="3.52" say="$\Gamma^0{}_{00}$ 等于牛顿势的时间变化率：零阶时它为零，现在出现了一阶修正。">{R`\Gamma^0{}_{00} = \dot\Psi.`}</Eq>
        <Tx>{R`**一个时间、一个空间指标。**哪个是哪个无关紧要，因为 Christoffel 符号对两个下指标对称。此时 \eqref{3.51} 方括号中只有一项非零：$g_{00,i}=-2\Psi_{,i}$。同样因为这是一阶量，前面的 $2\Psi$ 可以丢掉：`}</Tx>
        <Eq n="3.53" say="$\Gamma^0{}_{0i}$ 是牛顿势的空间梯度——引力“力”的雏形。">{R`\Gamma^0{}_{0i} = \Gamma^0{}_{i0} = \Psi_{,i}.`}</Eq>
        <Tx>{R`**两个空间指标。**前两项因 $g_{0i}=0$ 而为零，只剩最后一项：`}</Tx>
        <Eq n="3.54" say="纯空间分量来自空间度规 $a^2(1+2\Phi)$ 对时间的导数，再乘上 $g^{00}$ 的修正因子。">{R`\Gamma^0{}_{ij} = \frac{1-2\Psi}{2}\frac{\partial}{\partial t}\left[\delta_{ij}a^2(1+2\Phi)\right].`}</Eq>
        <Tx>{R`其中有一个零阶项（(2.24) 算过的那个）和三个一阶项：$\frac{1-2\Psi}{2}\delta_{ij}[2a\dot a(1+2\Phi)+2a^2\dot\Phi]=\delta_{ij}a^2[H(1+2\Phi)(1-2\Psi)+\dot\Phi]$，展开到一阶：`}</Tx>
        <Eq n="3.55" say="零阶的 $a^2H$ 之外，多出由 $\Phi-\Psi$ 修正的膨胀项和 $\Phi$ 的时间变化。">{R`\Gamma^0{}_{ij} = \delta_{ij}a^2\left[H + 2H(\Phi-\Psi) + \dot\Phi\right]`}</Eq>
        <Tx>{R`其中 $H=\dot a/a$。Christoffel 符号 $\Gamma^i{}_{\mu\nu}$ 的计算留作练习，结果是`}</Tx>
        <Eq n="3.56" keyEq title={R`扰动时空的 $\Gamma^i{}_{\mu\nu}$`} say="三类空间上指标的 Christoffel 符号：$\Gamma^i{}_{00}$ 是牛顿引力（$\Psi$ 的梯度），$\Gamma^i{}_{j0}$ 是局域膨胀率 $H+\dot\Phi$，$\Gamma^i{}_{jk}$ 是空间弯曲（$\Phi$ 的梯度）。">{R`\begin{aligned}\Gamma^i{}_{00} &= \frac{1}{a^2}\Psi_{,i},\\ \Gamma^i{}_{j0} &= \Gamma^i{}_{0j} = \delta_{ij}\left(H + \dot\Phi\right),\\ \Gamma^i{}_{jk} &= \left[\delta_{ij}\partial_k + \delta_{ik}\partial_j - \delta_{jk}\partial_i\right]\Phi.\end{aligned}`}</Eq>
        <Derivation title={R`补全：$\Gamma^i{}_{\mu\nu}$ 的计算`} steps={[
          { tex: R`g^{ij}=\frac{\delta_{ij}}{a^2}(1-2\Phi),\qquad \Gamma^i{}_{\mu\nu}=\frac{g^{ii}}{2}\left[g_{i\mu,\nu}+g_{i\nu,\mu}-g_{\mu\nu,i}\right]`, why: R`度规对角，线性阶 $g^{ij}$ 是 $g_{ij}$ 的倒数。` },
          { tex: R`\Gamma^i{}_{00}=\frac{1}{2a^2}\left[-g_{00,i}\right]=\frac{1}{2a^2}\,2\Psi_{,i}=\frac{1}{a^2}\Psi_{,i}`, why: R`$g_{i0}=0$，只剩 $-g_{00,i}=2\Psi_{,i}$；前因子中的 $-2\Phi$ 乘一阶量是二阶，丢掉。` },
          { tex: R`\Gamma^i{}_{j0}=\frac{1-2\Phi}{2a^2}\,g_{ij,0}=\frac{1-2\Phi}{2a^2}\delta_{ij}\left[2a\dot a(1+2\Phi)+2a^2\dot\Phi\right]=\delta_{ij}\left(H+\dot\Phi\right)`, why: R`只有 $g_{ij,0}$ 非零（$g_{i0}=0$，$g_{j0,i}=0$）；$(1-2\Phi)(1+2\Phi)=1$ 到一阶。` },
          { tex: R`\Gamma^i{}_{jk}=\frac{1}{2a^2}\left[g_{ij,k}+g_{ik,j}-g_{jk,i}\right]=\left[\delta_{ij}\partial_k+\delta_{ik}\partial_j-\delta_{jk}\partial_i\right]\Phi`, why: R`$g_{ij,k}=2a^2\delta_{ij}\Phi_{,k}$ 已是一阶，前因子取零阶 $1/(2a^2)$。` },
        ]} result={R`即 \eqref{3.56}。零阶时只有 $\Gamma^i{}_{j0}=\delta_{ij}H$ 非零，与 (2.25) 一致。`} collapsed />
        <Tx>{R`注意零阶时唯一非零的分量是 $\Gamma^i{}_{j0}$，与 (2.25) 一致。按惯例，$\delta_{ij}$ 和空间导数 $\partial_k$ 都"生活"在欧氏空间里，所以可以随意升降它们的指标——这是宇宙学文献在欧氏背景宇宙中工作时的标准约定。

**下一步本该是什么？**你已经能猜到：为了得到引力的 Einstein 方程，要对扰动度规计算 Ricci 张量 \eqref{3.3} 和 Ricci 标量得到左边，再计算扰动的能动张量得到右边。确实没什么能阻止我们立刻去做。但我们把它推迟到第 6 章，原因有二：第一，值得更仔细地想一想在扰动宇宙中如何参数化 $G_{\mu\nu}$ 和 $T_{\mu\nu}$；第二，仅在膨胀背景上用 Boltzmann 方程就能走得相当远。所以继续后者。`}</Tx>
      </Sub>

      <Sub n="3.3.2" title="The geodesic equation" zh="测地线方程">
        <Tx>{R`**目标。**要推导 Boltzmann 方程，需要知道粒子在扰动时空中如何运动。这仍由测地线方程决定（§2.1.2），现在把它推广到包含时空扰动 $\Phi$、$\Psi$。具体地说，目标是算出 $dx^i/dt$、$dp/dt$ 和 $d\hat p^i/dt$，代入 \eqref{3.33}。

**第一步：用 $E$、$p$、$\hat p^i$ 表示四动量。**质量为 $m$ 的粒子的质壳约束现在是`}</Tx>
        <Eq n="3.57" say="扰动时空中的质壳条件：时间分量多了一个 $(1+2\Psi)$ 因子。">{R`g_{\mu\nu}P^\mu P^\nu = -(1+2\Psi)(P^0)^2 + p^2 = -m^2,`}</Eq>
        <Tx>{R`其中仍然`}</Tx>
        <Eq n="3.58" say="物理动量的大小仍由空间度规定义（现在空间度规含 $\Phi$）。">{R`p^2 \equiv g_{ij}P^iP^j.`}</Eq>
        <Tx>{R`我们继续把能量定义为 $E(p)\equiv\sqrt{p^2+m^2}$，无质量时显然 $E=p$。于是可以消去 $P^\mu$ 的时间分量：`}</Tx>
        <Eq n="3.59" say="四动量的时间分量不再等于能量，而要乘上 $1-\Psi$：在势阱中（$\Psi<0$）坐标时流逝得慢，$P^0=dt/d\lambda$ 相应变大。">{R`P^0 = \frac{E}{\sqrt{1+2\Psi}} = E(1-\Psi).`}</Eq>
        <Tx>{R`最后一个等号成立是因为我们在小量 $\Psi$ 上做一阶微扰论。同理用 \eqref{3.58} 推出 $P^i$：$g_{ij}P^iP^j=a^2(1+2\Phi)\delta_{ij}P^iP^j=p^2$，所以 $P^i\propto p^i(1-\Phi)/a$。这给出扰动 FLRW 时空中有质量粒子的四动量（包括无质量情形）：`}</Tx>
        <Eq n="3.60" keyEq title="扰动时空中的四动量" say="用能量 $E$、物理动量 $p^i$ 表示的四动量：时间分量被 $\Psi$ 修正，空间分量被 $\Phi$ 修正，并照旧除以 $a$。">{R`P^\mu = \left[E(1-\Psi),\; p^i\frac{1-\Phi}{a}\right].`}</Eq>
        <Tx>{R`这里通过下式定义 $p^i$：`}</Tx>
        <Eq n="3.61" say="动量矢量 = 大小 $\times$ 方向；方向矢量的上下指标不加区分。">{R`p^i = p\,\hat p^i\quad\text{where}\quad\hat p^i = \hat p_i`}</Eq>
        <Tx>{R`是满足 $\delta_{ij}\hat p^i\hat p^j=1$ 的单位矢量。\eqref{3.60} 让我们总能用 $E(p)$、动量大小 $p$ 与 $\hat p^i$ 消去 $P^0$、$P^i$。此外，把它们代入 \eqref{3.20}，就得到存在度规扰动时用分布函数表示的能动张量（\exref{3.12}），后面会用到。

**第二步：$dx^i/dt$。**回忆 \eqref{3.26}：$P^i\equiv dx^i/d\lambda$，$P^0\equiv dt/d\lambda$。所以在线性阶上`}</Tx>
        <Eq n="3.62" keyEq title="坐标速度" say="粒子在共动坐标中的速度：照旧是 $(p/E)\hat p^i/a$，但被 $1-\Phi+\Psi$ 修正——势阱里光看起来走得慢（Shapiro 延迟）。">{R`\begin{aligned}\frac{dx^i}{dt} &= \frac{dx^i}{d\lambda}\frac{d\lambda}{dt}\\ &= \frac{P^i}{P^0} = \frac{\hat p^i}{a}\frac pE(1-\Phi+\Psi).\end{aligned}`}</Eq>
        <Tx>{R`**第三步：$dp^i/dt$。**剩下要算的是 $dp^i/dt$，由它可以推出 $dp/dt$ 和 $d\hat p^i/dt$。做法与 §3.2.2 的均匀情形完全一样，靠测地线方程；唯一的区别是扰动让更多的 Christoffel 符号出场。计算看着繁琐，但很直接，而且结果会在好几个不同的应用中用到。无论如何，**只需要做一次**！全程限于扰动的线性阶。先沿测地线求 $p^i$ 的导数（由 \eqref{3.60}，$p^i=(1+\Phi)aP^i$）：`}</Tx>
        <Eq n="3.63" say="物理动量 = $(1+\Phi)a\times$ 共动动量；对 $\lambda$ 求导分成两部分：局域标度因子的变化，和共动动量本身的变化。">{R`\begin{aligned}\frac{dp^i}{d\lambda} &= \frac{d}{d\lambda}\left[(1+\Phi)aP^i\right]\\ &= P^i\frac{d}{d\lambda}\left[(1+\Phi)a\right] + (1+\Phi)a\frac{dP^i}{d\lambda}.\end{aligned}`}</Eq>
        <Tx>{R`第一项用 $d/d\lambda=P^\mu\partial/\partial x^\mu$ 计算：`}</Tx>
        <Eq n="3.64" say="局域标度因子 $(1+\Phi)a$ 沿路径的变化：时间方向上以局域膨胀率 $(1+\Phi)H+\dot\Phi$ 变化，空间方向上沿 $\Phi$ 的梯度变化。">{R`\frac{d}{d\lambda}\left[(1+\Phi)a\right] = P^0a\left[(1+\Phi)H + \dot\Phi\right] + aP^k\Phi_{,k}.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{3.64} 中 $H$ 前的因子 $(1+\Phi)$`}>{R`原书印作 $P^0a\left[H+\dot\Phi\right]+aP^k\Phi_{,k}$，漏了一阶项 $P^0aH\Phi$；上式已改正。依据：$d/d\lambda=P^\mu\partial_\mu$，时间部分 $P^0\partial_t[(1+\Phi)a]=P^0[(1+\Phi)\dot a+a\dot\Phi]=P^0a[(1+\Phi)H+\dot\Phi]$。这一修正不影响后文：\eqref{3.63} 第一项是 $P^i=p^i(1-\Phi)/a$ 乘上它，$(1-\Phi)(1+\Phi)=1+\nosym{O}(\Phi^2)$，恰好给出 \eqref{3.67} 第一项的 $E(1-\Psi)[H+\dot\Phi]p^i$——\eqref{3.67} 本身正确，原书只是在 \eqref{3.64} 中提前把这对相消的因子省掉了；最终的 \eqref{3.69} 也正确。`}</Box>
        <Tx>{R`第二项用测地线方程计算：`}</Tx>
        <Eq n="3.65" say="测地线方程的空间分量：共动动量的变化由三类 Christoffel 符号与四动量分量的乘积给出（中间一项因下指标对称而乘 2）。">{R`\begin{aligned}\frac{dP^i}{d\lambda} &= -\Gamma^i{}_{\alpha\beta}P^\alpha P^\beta\\ &= -\left[\Gamma^i{}_{00}P^0P^0 + 2\Gamma^i{}_{0j}P^0P^j + \Gamma^i{}_{jk}P^jP^k\right].\end{aligned}`}</Eq>
        <Tx>{R`幸运的是，第一项和最后一项中的 Christoffel 符号已经是一阶的，所以可以代入 $P^0$、$P^i$ 的零阶表达式（$P^0=E$，$P^i=p^i/a$）。$2\Gamma^i{}_{0j}P^0P^j$ 一项包含零阶贡献，需要用完整的 \eqref{3.60}。利用 \eqref{3.56} 得到`}</Tx>
        <Eq n="3.66" say="代入扰动的 Christoffel 符号：第一项是牛顿引力，第二项是（局域）膨胀，后两项来自空间弯曲 $\Phi$ 的梯度。">{R`\frac{dP^i}{d\lambda} = -E\left\{\frac{E}{a^2}\Psi_{,i} + 2\left(H+\dot\Phi\right)\frac{p^i}{a}(1-\Psi-\Phi) + \frac{2}{a^2}\frac{p^i}{E}p^k\Phi_{,k} - \frac{p^2}{a^2E}\Phi_{,i}\right\}.`}</Eq>
        <Derivation title={R`逐项核对 (3.66)`} steps={[
          { tex: R`\Gamma^i{}_{00}P^0P^0=\frac{1}{a^2}\Psi_{,i}E^2`, why: R`一阶 $\Gamma^i{}_{00}$ 乘零阶 $(P^0)^2=E^2$。` },
          { tex: R`2\Gamma^i{}_{0j}P^0P^j=2\delta_{ij}(H+\dot\Phi)\,E(1-\Psi)\,p^j\frac{1-\Phi}{a}=2E(H+\dot\Phi)\frac{p^i}{a}(1-\Psi-\Phi)`, why: R`含零阶项 $2EHp^i/a$，必须保留 $P^0$、$P^j$ 的一阶修正。` },
          { tex: R`\Gamma^i{}_{jk}P^jP^k=\left[\delta_{ij}\Phi_{,k}+\delta_{ik}\Phi_{,j}-\delta_{jk}\Phi_{,i}\right]\frac{p^jp^k}{a^2}=\frac{2p^ip^k\Phi_{,k}-p^2\Phi_{,i}}{a^2}`, why: R`一阶 $\Gamma^i{}_{jk}$ 乘零阶 $P^jP^k=p^jp^k/a^2$；$\delta_{jk}p^jp^k=p^2$。` },
          { tex: R`\frac{dP^i}{d\lambda}=-E\left\{\frac{E}{a^2}\Psi_{,i}+2(H+\dot\Phi)\frac{p^i}{a}(1-\Psi-\Phi)+\frac{2}{a^2}\frac{p^i}{E}p^k\Phi_{,k}-\frac{p^2}{a^2E}\Phi_{,i}\right\}`, why: R`三项求和并提出 $-E$。` },
        ]} collapsed />
        <Tx>{R`于是借助 \eqref{3.60}，\eqref{3.63} 成为`}</Tx>
        <Eq n="3.67" say="把两部分合起来：第一行来自局域标度因子的变化，第二行来自测地线方程（共动动量的变化乘 $(1+\Phi)a$）。">{R`\begin{aligned}\frac{dp^i}{d\lambda} = \;&E(1-\Psi)\left\{\left[H+\dot\Phi\right]p^i + p^k\Phi_{,k}\frac{p^i}{aE}\right\}\\ &- E\left\{\frac{E}{a}\Psi_{,i} + 2\left(H+\dot\Phi\right)p^i(1-\Psi) + \frac{2}{a}\frac{p^i}{E}p^k\Phi_{,k} - \frac{p^2}{aE}\Phi_{,i}\right\}.\end{aligned}`}</Eq>
        <Tx>{R`最后，利用 $dp^i/dt=(P^0)^{-1}dp^i/d\lambda$，把对 $\lambda$ 的全导数换成对 $t$ 的导数（$1/P^0=(1+\Psi)/E$，正好消掉两处 $E(1-\Psi)$）：`}</Tx>
        <Eq n="3.68" say="除以 $P^0=E(1-\Psi)$ 后，换成对时间的导数。">{R`\begin{aligned}\frac{dp^i}{dt} = \;&\left[H+\dot\Phi\right]p^i + p^k\Phi_{,k}\frac{p^i}{aE}\\ &- \left\{\frac{E}{a}\Psi_{,i} + 2\left(H+\dot\Phi\right)p^i + \frac{2}{a}\frac{p^i}{E}p^k\Phi_{,k} - \frac{p^2}{aE}\Phi_{,i}\right\},\end{aligned}`}</Eq>
        <Tx>{R`合并同类项化简为`}</Tx>
        <Eq n="3.69" keyEq title="扰动时空中动量的演化" say="粒子动量的完整变化：局域膨胀使之红移（第一项），牛顿势的梯度推动它（第二项），空间弯曲改变它的方向（后两项）。它同时包含牛顿动力学和引力透镜。">{R`\frac{dp^i}{dt} = -\left(H+\dot\Phi\right)p^i - \frac{E}{a}\Psi_{,i} - \frac1a\frac{p^i}{E}p^k\Phi_{,k} + \frac{p^2}{aE}\Phi_{,i}.`}</Eq>
        <Tx>{R`这就是所要的结果：动量 $p^i$ 沿测地线的时间演化。从现在起，我们总可以使用 $\{E,p,\hat p^i=\hat p_i\}$——即能量和物理动量——而不是共动动量 $P^\mu$。

**第四步：动量的大小。**利用`}</Tx>
        <Eq n="3.70" say="动量大小的变化率 = 动量矢量变化率在动量方向上的投影。">{R`\frac{dp}{dt} = \frac{d}{dt}\sqrt{\delta_{ij}p^ip^j} = \delta_{ij}\frac{p^i}{p}\frac{dp^j}{dt},`}</Eq>
        <Tx>{R`对动量的大小，得到推论`}</Tx>
        <Eq n="3.71" keyEq title="扰动时空中的能量变化" say="动量大小的变化只有两个来源：局域膨胀率 $H+\dot\Phi$（宇宙学红移及其局域扰动）和沿运动方向的牛顿势梯度（掉进势阱获得能量、爬出势阱失去能量）。">{R`\begin{aligned}\frac{dp}{dt} &= -\left[H+\dot\Phi\right]p - \frac Ea\hat p^i\Psi_{,i} - \frac1a\frac{p^2}{E}\hat p^k\Phi_{,k} + \frac{p^2}{aE}\hat p^i\Phi_{,i}\\ &= -\left[H+\dot\Phi\right]p - \frac Ea\hat p^i\Psi_{,i}.\end{aligned}`}</Eq>
        <Tx>{R`**解读。**\eqref{3.71} 描述了粒子穿过扰动 FLRW 宇宙时动量大小的变化。虽然花了不少力气，但它的形式其实几乎**不用计算就能猜到**：

◆ 第一项描述哈勃膨胀造成的动量损失（等价于宇宙学红移和本动速度的衰减）。回忆 $\Phi$ 可以理解为局域标度因子的相对扰动，而 $H=\dot a/a$，所以 $H+\dot\Phi$ 就是**局域膨胀率**。于是前两部分包含了宇宙学红移及其局域扰动。

◆ 最后一项描述：粒子进入势阱（$\hat p^i\partial\Psi/\partial x^i<0$）时获得能量；反之离开势阱时失去能量。对非相对论粒子，这是牛顿物理中熟悉的事；它对光子同样成立，此时对应**引力红移**效应——它可以在地球上用精密原子物理实验观测到（Pound–Rebka 实验）。`}</Tx>
        <Figure n="3.4" caption={R`原创薄透镜弱场模型：平行光线经过点质量时向中心偏折，偏折角与质量成正比、与冲量参数成反比。滑块改变透镜强度。示意折线不是星系团照片或强场光线追迹；同一引力场也影响星系运动。`} illustration={<LensingRedraw />} />
        <Tx>{R`下面的玩具模型直接对 \eqref{3.71}（取 $m=0$，局域 $a=1$）沿光子路径积分，展示两个关键物理：静态势阱里光子"进去得到的能量，出来时如数还回去"；而如果光子穿越期间势阱在**变化**，就会留下净的能量变化——这就是 CMB 中的**积分 Sachs–Wolfe 效应**的雏形。`}</Tx>
        <PhotonPlot />
        <Box kind="data" title="读图与数值核对">{R`把 $\Phi=-\Psi$ 代入 \eqref{3.71}（$a=1$，$E=p$）：$d\ln p/dt=\dot\Psi-\partial_x\Psi$。沿光线 $d\Psi/dt|_{\rm path}=\dot\Psi+\partial_x\Psi$，所以 $\Delta\ln p=-[\Psi_{\rm end}-\Psi_{\rm start}]+2\int\dot\Psi\,dt$。**静态**势阱（$\varepsilon=0$）：井心处 $\delta\ln p=+\Psi_0$（掉进深度为 $\Psi_0$ 的势阱获得的蓝移），出来后精确回到 0——数值积分给出 1.0000 和 0.0000。**变浅的**势阱（$\varepsilon=0.3$，$\tau=3\sigma$）：最终 $\delta\ln p=2\int\dot\Psi\,dt=+0.455\,\Psi_0$，与解析积分 0.4552 一致；若只保留 $\Psi$（$\Phi=0$），净效应减半为 0.228——因子 2 来自 $\dot\Phi$ 项。`}</Box>

        <Tx>{R`**第五步：动量的方向——引力偏折。**注意 \eqref{3.69} 中含 $\Phi_{,i}$ 和 $p^k\Phi_{,k}$ 的项在 \eqref{3.71} 中**相消了**。它们在线性阶不改变粒子动量的大小，却改变动量的**方向**。为了看清这一点，由 \eqref{3.69} 推出 $\hat p^i$ 的时间导数：`}</Tx>
        <Eq n="3.72" keyEq title="动量方向的偏折" say="动量方向的变化只来自势的**横向**梯度（方括号是垂直于运动方向的投影）；对光子 $\Phi$、$\Psi$ 贡献相同，对慢速粒子 $E/p$ 因子使偏折大得多。">{R`\begin{aligned}\frac{d\hat p^i}{dt} &= \frac1p\frac{dp^i}{dt} - \frac{p^i}{p^2}\frac{dp}{dt}\\ &= \frac{E}{ap}\left[\delta^{ik} - \hat p^i\hat p^k\right]\left(\frac{p^2}{E^2}\Phi - \Psi\right)_{,k}.\end{aligned}`}</Eq>
        <Derivation title={R`补全 (3.72) 的代数`} steps={[
          { tex: R`\frac1p\frac{dp^i}{dt}=-(H+\dot\Phi)\hat p^i-\frac{E}{ap}\Psi_{,i}-\frac{p}{aE}\hat p^i\hat p^k\Phi_{,k}+\frac{p}{aE}\Phi_{,i}`, why: R`\eqref{3.69} 除以 $p$，$p^i=p\hat p^i$。` },
          { tex: R`\frac{p^i}{p^2}\frac{dp}{dt}=-(H+\dot\Phi)\hat p^i-\frac{E}{ap}\hat p^i\hat p^k\Psi_{,k}`, why: R`\eqref{3.71} 乘 $\hat p^i/p$。` },
          { tex: R`\frac{d\hat p^i}{dt}=\frac{E}{ap}\left[\frac{p^2}{E^2}\Phi_{,i}-\Psi_{,i}-\hat p^i\hat p^k\left(\frac{p^2}{E^2}\Phi_{,k}-\Psi_{,k}\right)\right]`, why: R`相减：膨胀项抵消；提出 $E/(ap)$。` },
        ]} result={R`$[\delta^{ik}-\hat p^i\hat p^k]$ 是投影到垂直于 $\hat{\boldsymbol p}$ 的平面上的算符，保证 $\hat p^i\,d\hat p^i/dt=0$——单位矢量只能转向，不能变长。`} collapsed />
        <Tx>{R`**解读。**势的空间梯度改变有质量和无质量粒子的轨迹。数学背后的图像是：测地线方程定义了弯曲空间中"直线"的概念，而 $\Phi$、$\Psi$ 刻画了宇宙中结构带来的额外弯曲。\figref{3.4} 展示了这种几何内涵：一个星系团扭曲时空，使经过的光线偏折；它也使团内星系的运动偏折——星系与光线运动在同一个弯曲时空中。

◆ **非相对论粒子**（$p\ll E$）：含 $\Phi$ 的项被 $p^2/E^2$ 强烈压低，只有 $\Psi$（$g_{00}$ 的扰动）重要。牛顿物理说 $d\boldsymbol p/dt=-m\nabla\Psi$，你可以验证 \eqref{3.69} 对非相对论粒子正好回到它，只多一个因子 $1/a$。这个因子也很好理解：我们求梯度是对**共动**坐标 $x^k$，而牛顿力学中的力是对**物理**坐标 $a\boldsymbol x$ 求梯度。

◆ **光子**：$p/E=1$，$\Phi$ 与 $\Psi$ 对偏折的贡献**相同**。对很多情形成立的 $\Phi=-\Psi$，这就导致著名的**因子 2**：Einstein 理论预言的光线偏折是牛顿的两倍，并在 1919 年日全食时得到证实。

◆ 非相对论粒子的偏折远强于光：光子并不被 \figref{3.4} 中的星系团束缚，而物质和星系被束缚。数学上，这来自前面的因子 $E/p$——非相对论物体的它很大；物理上，弯曲时空有**更多时间**去偏折慢速物体的轨迹，而无质量粒子以光速一闪而过。

\eqref{3.72} 描述的效应在研究大尺度结构和引力透镜时将变得重要。`}</Tx>
        <DeflectionPlot />
        <Box kind="data" title="读图与数值核对：日食实验">{R`对点质量，沿直线积分 \eqref{3.72}（$\Phi=-\Psi=GM/r$）得偏折角 $\sym{ch03-defl}{\alpha}=(1+1/v^2)\,2GM/(bc^2)$，其中 $v=p/E$；牛顿力学只有 $1/v^2$ 项。以太阳掠射（$b=R_\odot$）为例，$2GM_\odot/(R_\odot c^2)=0.876''$：光子（$v=1$）$\sym{ch03-defl}{\alpha}=1.75''$，正是 1919 年日食观测检验的预言值，为牛顿值 $0.875''$ 的两倍；$v\to0$ 时两者趋于一致，且都 $\propto1/v^2$ 迅速增大。`}</Box>
        <Tx>{R`有了测地线方程，写出扰动宇宙中 Boltzmann 方程所需的一切都已齐备。`}</Tx>
      </Sub>

      <Sub n="3.3.3" title="The collisionless Boltzmann equation for radiation" zh="辐射的无碰撞 Boltzmann 方程">
        <Tx>{R`**直接推广。**扰动宇宙中辐射（即极端相对论粒子）的 Boltzmann 方程，是 §3.2.2 推出 \eqref{3.39} 那套处理的直接推广。而且难的部分已经完成：$dx^i/dt$ [\eqref{3.62}] 与 $dp^i/dt$ [\eqref{3.69}]。只需把它们特化到 $m=0$，即 $E=p$。于是 \eqref{3.33} 可以写成`}</Tx>
        <Eq n="3.73" say="辐射的完整线性阶左边：四项分别对应显式时间变化、带 Shapiro 修正的流动、（局域）红移加引力红移、以及方向偏折。">{R`\begin{aligned}\frac{df}{dt} = \;&\frac{\partial f}{\partial t} + \frac{\partial f}{\partial x^i}\frac{\hat p^i}{a}(1-\Phi+\Psi) - \frac{\partial f}{\partial p}\left\{\left[H+\dot\Phi\right]p + \frac1ap^i\Psi_{,i}\right\}\\ &+ \frac{\partial f}{\partial\hat p^i}\frac1a\left[(\Phi-\Psi)_{,i} - \hat p^i\hat p^k(\Phi-\Psi)_{,k}\right].\end{aligned}`}</Eq>
        <Tx>{R`这是辐射 Boltzmann 方程完整的线性阶左边。不过，利用零阶分布函数的知识还能进一步化简。在均匀宇宙中，这个分布是 (2.65) 的玻色–爱因斯坦形式。这个平衡分布显然不依赖位置 $\boldsymbol x$；由于它**各向同性**，也不依赖动量的方向 $\hat{\boldsymbol p}$。

**关键假设。**我们现在做如下拟设：在非均匀宇宙中，辐射分布对平衡分布的偏离与时空扰动 $\Phi$、$\Psi$ **同阶**。后续各章会看到，这个拟设不但让生活轻松得多，而且确实成立。

有了这个工作假设，可以立刻扔掉 \eqref{3.73} 的最后一项（$\propto\partial f/\partial\hat p^i$）：回忆 $\partial f/\partial\hat p^i$ 只有在考虑零阶 $f$ 的扰动时才非零，即它是一阶项；而乘在它前面的那一项也是一阶的——两者之积是二阶，可以忽略。

同样容易看出，第二项（$\propto\partial f/\partial x^i$）中的势也是高阶的：它们乘的是 $\partial f/\partial x^i$，这是一阶项（再说一次，零阶分布函数不依赖位置）。最终我们得到一致展开到线性阶的辐射 Boltzmann 方程：`}</Tx>
        <Eq n="3.74" keyEq title="辐射的线性 Boltzmann 方程" say="光子分布的演化：自由流动（第二项）+ 动量变化（方括号）。方括号把宇宙学红移 H、局域膨胀 $\dot\Phi$ 和沿视线的势梯度合在一起——这就是 CMB 各向异性方程的左边。">{R`\frac{df}{dt} = \frac{\partial f}{\partial t} + \frac{\hat p^i}{a}\frac{\partial f}{\partial x^i} - \left[H + \dot\Phi + \frac1a\hat p^i\frac{\partial\Psi}{\partial x^i}\right]p\frac{\partial f}{\partial p}.`}</Eq>
        <Tx>{R`\eqref{3.74} 将直接把我们引向支配 CMB 各向异性的方程（第 5 章、第 9 章）。`}</Tx>
        <Box kind="key" title="“同阶”规则：哪些项能扔">{R`把 $f=f^{(0)}(p,t)+\delta f$ 代入，$f^{(0)}$ 既不依赖 $\boldsymbol x$ 也不依赖 $\hat{\boldsymbol p}$。于是 $\partial f/\partial x^i$、$\partial f/\partial\hat p^i$ 都只含 $\delta f$，是一阶量；它们只能乘**零阶**系数。$\partial f/\partial p$ 则含零阶部分，所以它的系数必须保留到一阶——方括号中的 $\dot\Phi$ 与 $\Psi_{,i}$ 正是这样留下的。`}</Box>
      </Sub>

      <Sub n="3.3.4" title="The collisionless Boltzmann equation for massive particles" zh="有质量粒子的无碰撞 Boltzmann 方程">
        <Tx>{R`**对不是极端相对论的粒子做同样的推导。**这几乎不需要额外工作。再次从 \eqref{3.33} 出发，代入 \eqref{3.62}、\eqref{3.71} 和 \eqref{3.72}：`}</Tx>
        <Eq n="3.75" say="有质量粒子的完整线性阶左边：与辐射相比，各处多了速度 p/E 或其倒数的因子。">{R`\begin{aligned}\frac{df}{dt} = \;&\frac{\partial f}{\partial t} + \frac{\partial f}{\partial x^i}\frac{\hat p^i}{a}\frac pE(1-\Phi+\Psi) - p\frac{\partial f}{\partial p}\left[H + \dot\Phi + \frac{E}{ap}\hat p^i\Psi_{,i}\right]\\ &+ \frac{\partial f}{\partial\hat p^i}\frac{E}{ap}\left[\left(\frac{p^2}{E^2}\Phi - \Psi\right)_{,i} - \hat p^i\hat p^k\left(\frac{p^2}{E^2}\Phi - \Psi\right)_{,k}\right].\end{aligned}`}</Eq>
        <Tx>{R`现在对有质量粒子的零阶分布函数做与光子相同的假设：它与位置 $\boldsymbol x$ 和动量方向 $\hat{\boldsymbol p}$ 无关。由此得到有质量粒子的线性阶 Boltzmann 方程（细节见 \exref{3.10}）：`}</Tx>
        <Eq n="3.76" keyEq title="有质量粒子的线性 Boltzmann 方程" say="与辐射方程同构，只是流动项多了速度 p/E，势梯度项多了 E/p：慢粒子流动得慢，却更强烈地感受引力。">{R`\frac{df}{dt} = \frac{\partial f}{\partial t} + \frac pE\frac{\hat p^i}{a}\frac{\partial f}{\partial x^i} - \left[H + \dot\Phi + \frac{E}{ap}\hat p^i\Psi_{,i}\right]p\frac{\partial f}{\partial p}.`}</Eq>
        <Tx>{R`**解读。**无质量极限下 \eqref{3.76} 回到 \eqref{3.74}，理应如此。两者的主要区别在于 $p/E$——即速度——的因子，按定义它对极端相对论粒子等于 1。另一方面，对非相对论物质，这里假设的线性拟设在**晚期宇宙**中会失效（星系、星系团中密度扰动远大于 1）。这将引导我们在第 12 章把 Boltzmann 方程推广到非线性阶。`}</Tx>
      </Sub>
    </Sec>);
}
