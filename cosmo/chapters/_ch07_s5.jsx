// §7.5 The Einstein–Boltzmann equations at early times —— 式 (7.80)–(7.96)，原书 pp. 183–186
import { Sec, Tx, Eq, Box, Derivation, Table, C } from "@kit";

const R = String.raw;

export function Sec75() {
  return (
    <Sec n="7.5" title="The Einstein–Boltzmann equations at early times" zh="早期的 Einstein–Boltzmann 方程"
      gist={R`在 $k\eta\ll1$ 的超视界极限下，第 5、6 章的方程组大大简化：$\Phi$ 只有常数模与衰减模 $\eta^{-3}$；对常数模和绝热扰动，所有变量都由 $\Phi$ 决定——$\Theta_0=\mathcal N_0=\Phi/2$，$\delta_{\rm c}=\delta_{\rm b}=3\Theta_0$，偶极与速度 $\propto k/(aH)$，并且 $\mathcal R=-\frac32\Psi$。`}
      why={R`暴胀给出的是 $\mathcal R$（或 $\Phi$）的功率谱；而后面各章要数值积分的是光子、中微子、暗物质、重子与度规的九个扰动变量。必须把前者"翻译"成后者在某个早期时刻 $\eta_i$ 的初值。`}
      gives={["7.89", "7.91", "7.94", "7.95", "7.96"]}>
      <p className="muted">本节概念：<C id="superhorizon_ic" /> · <C id="adiabatic" /> · <C id="curv_R" /></p>

      <Tx>{R`**我们还差最后一步。**前几节把暴胀的预言归结为一个量：曲率扰动 $\mathcal R$ 的功率谱（等价地，暴胀结束后引力势 $\Psi$ 的功率谱）。但第 5、6 章建立的演化方程要追踪的是**九个**扰动变量：$\Theta$、$\mathcal N$、$\delta_{\rm c}$、$u_{\rm c}$、$\delta_{\rm b}$、$u_{\rm b}$、$\Phi$、$\Psi$，以及（与 $\Theta$ 一起的）偏振。原则上每个变量都需要初始条件。

好在我们已经知道：单场暴胀产生的扰动是**绝热**的（adiabatic，\eqref{7.43}）——所有成分的相对扰动都一样。于是所有变量都只由一个量（$\Psi$，或等价地 $\Phi$）决定，我们只需弄清这层关系在**早期**长什么样。顺带，前几节里我们"借用"过 $\Psi$、$\Phi$ 与 $\Theta_1$ 之间的几个关系（例如 \eqref{7.59} 的第二个等号），这里也会一并证明。

**"早期"的确切含义。**考虑暴胀刚结束后不久（新约定下 $\eta>0$ 但很小）。我们要求时间早到对**每一个**感兴趣的模式都有
$$k\eta\ll1\qquad\Longleftrightarrow\qquad \frac{k}{aH}\ll1 ,$$
即所有模式都还远在视界之外（辐射期 $aH=1/\eta$，见下文）。这一个不等式就带来一连串简化。先看光子的 Boltzmann 方程 \eqref{5.67}：`}</Tx>

      <Eq n="7.80" say={R`完整的光子温度扰动方程：左边是自由流，右边是引力（$\Phi'$、$\Psi$）与 Compton 散射；早期我们要判断其中哪些项可以扔掉。`}>{R`\Theta' + ik\mu\Theta = -\Phi' - ik\mu\Psi - \tau'\left[\Theta_0-\Theta+\mu u_{\rm b}-\frac12\mathcal P_2(\mu)\Pi\right].`}</Eq>

      <Tx>{R`**数量级比较。**第一项 $\Theta'$ 的量级是 $\Theta/\eta$（变量在一个哈勃时间里变化 $\mathcal O(1)$ 倍），第二项 $ik\mu\Theta$ 的量级是 $k\Theta$。两者之比为 $1/(k\eta)$——按假设远大于 1。同理，Boltzmann 方程中**凡是乘了 $k$ 的项**在早期都可略去；后面还会说明，$u_{\rm b}$ 与 $\Pi$ 本身也是小量。

**物理图像。**早期所有感兴趣的扰动，其波长 $\sim k^{-1}$ 都远大于因果过程能起作用的距离（视界）。设想一位只能看到自己因果视界之内光子的观测者：她看到的天空是**均匀**的。所以高阶多极矩 $\Theta_1,\Theta_2,\ldots$ 都远小于单极矩 $\Theta_0$。对 \eqref{7.80} 取单极矩（$\int d\mu/2$），碰撞项的单极部分恒为零，$ik\mu\Theta$ 给出 $k\Theta_1$——可以忽略；中微子同理。于是光子与中微子的温度扰动满足`}</Tx>

      <Eq n="7.81" say={R`超视界时，光子与中微子的温度单极矩只随空间曲率扰动变化：$\Phi$ 增加多少，$\Theta_0$、$\mathcal N_0$ 就减少多少（局域"膨胀"带来的红移）。`}>{R`\begin{aligned}\Theta_0' + \Phi' &= 0,\\ \mathcal N_0' + \Phi' &= 0.\end{aligned}`}</Eq>

      <Tx>{R`同样的道理用于物质。暗物质与重子的连续性方程（\eqref{5.69}、\eqref{5.71}）中，$iku$ 一项被 $k\eta$ 压低，于是`}</Tx>

      <Eq n="7.82" say={R`视界外暗物质与重子的过密度服从同一个方程：只有引力（通过 $\Phi'$）在起作用，它不区分暗物质粒子和质子。`}>{R`\begin{aligned}{\delta_{\rm c}}' &= -3\Phi',\\ {\delta_{\rm b}}' &= -3\Phi'.\end{aligned}`}</Eq>

      <Tx>{R`在共动视界之外，**引力是唯一起作用的力**——这正是暗物质与重子满足同一方程的原因：引力不在乎它作用在暗物质粒子还是质子上（Compton 拖曳只影响速度，而速度此时无关紧要）。速度比过密度小一个 $k\eta$ 量级的因子，所以初始时可以先把它们置零（下面 \eqref{7.95} 会给出它们的领头阶）。`}</Tx>

      <Box kind="note" title={R`为什么速度是 $\mathcal O(k\eta)$ 的小量`}>{R`看暗物质的 Euler 方程 \eqref{5.70}：$u_{\rm c}'+\frac{a'}{a}u_{\rm c}=-ik\Psi$。源项本身带一个 $k$，而左边的特征量级是 $u_{\rm c}/\eta$，所以 $u_{\rm c}\sim k\eta\,\Psi$。再由连续性方程，$iku_{\rm c}\sim(k\eta)^2\Psi/\eta$，比 $\delta_{\rm c}'$ 中的其他项小 $(k\eta)^2$——这就是 \eqref{7.82} 可以丢掉速度项的定量理由。光子的偶极 $\Theta_1$ 也一样：它由 $k(\Theta_0+\Psi)/3$ 驱动，故 $\Theta_1\sim k\eta\,\Theta_0$。四极矩 $\Theta_2$ 又要再乘一个 $k\eta$，还被 Compton 散射压制，所以 $\Pi$ 也可忽略。`}</Box>

      <Tx>{R`**Einstein 方程。**接下来处理引力一侧。先看时–时分量 \eqref{6.41}。其中第一项含 $k^2\Phi$，与其他项相比被 $(k\eta)^2$ 压低，可以略去——注意这与第 6 章"牛顿近似、忽略膨胀"的极限恰好**相反**，那里用的是 $k\gg aH$。此外，右边两项物质项（$\rho_{\rm c}\delta_{\rm c}$、$\rho_{\rm b}\delta_{\rm b}$）在早期也可忽略，因为辐射主导。于是`}</Tx>

      <Eq n="7.83" say={R`超视界、辐射主导时的时–时 Einstein 方程：度规扰动的时间变化完全由辐射的总密度扰动 $\Theta_{{\rm r},0}$ 决定。`}>{R`3\frac{a'}{a}\left(\Phi' - \frac{a'}{a}\Psi\right) = 16\pi Ga^2\rho_{\rm r}\Theta_{{\rm r},0},`}</Eq>

      <Tx>{R`其中辐射总单极矩 $\Theta_{{\rm r},0}$ 由 \eqref{6.79} 定义（光子与中微子单极矩按能量密度加权，$\rho_{\rm r}\Theta_{{\rm r},0}=\rho_\gamma\Theta_0+\rho_\nu\mathcal N_0$）；因子 16 来自 $\delta\rho/\rho=4\Theta$。辐射主导时 $a\propto\eta$（回忆 \eqref{2.95} 及其后的讨论），所以 $a'/a=aH=1/\eta$。代入得`}</Tx>

      <Eq n="7.84" say={R`把 $a'/a=1/\eta$ 和 Friedmann 方程代入后，Einstein 方程变成只含 $\eta$ 的简单形式，右边系数恰为 $2/\eta^2$。`}>{R`\begin{aligned}\frac{\Phi'}{\eta} - \frac{\Psi}{\eta^2} &= \frac{16\pi G\rho a^2}{3}\Theta_{{\rm r},0}\\ &= \frac{2}{\eta^2}\Theta_{{\rm r},0}\end{aligned}`}</Eq>

      <Derivation title={R`从 (7.83) 到 (7.84)：Friedmann 方程给出 $16\pi G\rho a^2/3=2/\eta^2$`} steps={[
        { tex: R`a\propto\eta\;\Rightarrow\;\frac{a'}{a}=\frac1\eta,\qquad aH=\frac{a'}{a}=\frac1\eta`, why: R`辐射期 $a\propto t^{1/2}$，而 $d\eta=dt/a\propto t^{-1/2}dt$，故 $\eta\propto t^{1/2}\propto a$（\eqref{2.95}）。` },
        { tex: R`\frac{3}{\eta}\left(\Phi'-\frac{\Psi}{\eta}\right)=16\pi Ga^2\rho\,\Theta_{{\rm r},0}\;\Rightarrow\;\frac{\Phi'}{\eta}-\frac{\Psi}{\eta^2}=\frac{16\pi G\rho a^2}{3}\Theta_{{\rm r},0}`, why: R`代入 \eqref{7.83} 并两边除以 3；辐射主导，$\rho_{\rm r}\simeq\rho$（总密度）。` },
        { tex: R`H^2=\frac{8\pi G}{3}\rho\;\Rightarrow\;\left(\frac{a'}{a}\right)^2=a^2H^2=\frac{8\pi G\rho a^2}{3}=\frac{1}{\eta^2}`, why: R`零阶 Einstein 方程（Friedmann 方程），平直宇宙。` },
        { tex: R`\frac{16\pi G\rho a^2}{3}=2\cdot\frac{8\pi G\rho a^2}{3}=\frac{2}{\eta^2}`, why: R`于是右边系数正好是 $2/\eta^2$：$G$ 和 $\rho$ 都从方程中消失了。` },
      ]} />

      <Tx>{R`两边乘以 $\eta^2$：`}</Tx>

      <Eq n="7.85" say={R`超视界辐射期的"约束方程"：$\Phi'\eta-\Psi$ 等于辐射总单极矩的两倍；对常数模它就是 $\Phi$ 与 $\Theta_{{\rm r},0}$ 之间的代数关系。`}>{R`\Phi'\eta - \Psi = 2\Theta_{{\rm r},0}.`}</Eq>

      <Tx>{R`**消去单极矩。**\eqref{7.81} 告诉我们单极矩的时间导数就是 $-\Phi'$。因此把 \eqref{7.85} 两边对 $\eta$ 求导，就能把 $\Theta_0$、$\mathcal N_0$ 都消掉：`}</Tx>

      <Eq n="7.86" say={R`对约束方程求导后，辐射单极矩的导数被 $-\Phi'$ 取代，得到只含两个引力势的方程。`}>{R`\Phi''\eta + \Phi' - \Psi' = -2\Phi'`}</Eq>

      <Tx>{R`右边成立是因为对这些大尺度模式，$\Theta_0'$ 与 $\mathcal N_0'$ 都等于 $-\Phi'$，所以它们的加权平均 $\Theta_{{\rm r},0}'$ 也等于 $-\Phi'$。

**第二个 Einstein 方程。**到目前为止只用了一个 Einstein 方程。另一个，\eqref{6.48}，描述光子与中微子分布的**高阶矩**（四极矩）如何作为源产生 $\Psi+\Phi$。这里我们先忽略这些高阶矩——它们只会让两个引力势之和略微偏离零。在这一近似下，处处令 $\Psi=-\Phi$ 即可消去 $\Psi$：`}</Tx>

      <Eq n="7.87" say={R`忽略各向异性应力（$\Psi=-\Phi$）后，超视界辐射期的 $\Phi$ 满足一个只有一个变量的二阶常微分方程。`}>{R`\Phi''\eta + 4\Phi' = 0.`}</Eq>

      <Box kind="note" title="原书脚注 4：中微子四极矩">{R`更仔细地计入**中微子四极矩**的效应见 \exref{7.16}。**光子**的四极矩则被 Compton 散射压得极小，因此它确实对 \eqref{6.48} 没有贡献。

（补充说明，\exref{7.16} 的结论：自由流的中微子在视界外仍会建立起 $\mathcal N_2\propto(k\eta)^2$ 的四极矩，它产生各向异性应力，最终使 $\Phi=-\left(1+\frac{2f_\nu}{5}\right)\Psi$，其中 $f_\nu$ 是中微子在辐射中的能量占比。取 $f_\nu\approx0.41$，$|\Phi|$ 比 $|\Psi|$ 大约 16%。本书正文为简洁起见使用 $\Psi=-\Phi$；精确的数值程序（如 CLASS、CAMB）会计入这一修正。）`}</Box>

      <Tx>{R`**求解。**\eqref{7.87} 是 Euler 型方程（每求一次导，$\eta$ 的幂次降一），所以试探幂律解 $\Phi=\eta^p$：$\Phi''\eta=p(p-1)\eta^{p-1}$，$4\Phi'=4p\eta^{p-1}$，得到代数方程`}</Tx>

      <Eq n="7.88" say={R`幂律试探解 $\Phi=\eta^p$ 的特征方程：两个根 $p=0$（常数模）与 $p=-3$（衰减模）。`}>{R`p(p-1)+4p = 0,`}</Eq>

      <Tx>{R`即 $p(p+3)=0$，两个解：$p=0$ 与 $p=-3$。`}</Tx>

      <Box kind="physics" title="衰减模与常数模">{R`**衰减模** $p=-3$：辐射期 $a\propto\eta$，所以 $\Phi\propto\eta^{-3}\propto a^{-3}$。若它在很早的时刻 $\eta_1$ 被激发，到 $\eta=10\eta_1$ 时已衰减为原来的千分之一；暴胀之后 $\eta$ 要增长许多个数量级才到我们关心的时代，因此它对宇宙**毫无影响**。（这与暴胀中模函数视界外"冻结"、另一个解迅速衰减是同一个故事。）

**常数模** $p=0$：一旦激发就不衰减——这正是我们关心的模式。它是 \eqref{7.87} 的通解中唯一能活到今天的部分。

注意 \eqref{7.87} 只对 $\Phi'$ 有约束（$\eta\Phi''=-4\Phi'$），常数 $\Phi$ 自动满足；常数的数值则由 \eqref{7.85} 与暴胀给出的 $\mathcal R$ 决定。`}</Box>

      <Tx>{R`只保留 $p=0$ 的模式，$\Phi'=0$，$\Psi=-\Phi$，于是 \eqref{7.85} 把引力势与辐射总过密度直接联系起来：`}</Tx>

      <Eq n="7.89" say={R`超视界辐射期常数模：引力势等于辐射总温度单极矩的两倍（$\Phi>0$ 对应辐射过密，$\Psi=-\Phi<0$ 即势阱）。`}>{R`\Phi = 2\Theta_{{\rm r},0}.`}</Eq>

      <Tx>{R`因此 $\Theta_{{\rm r},0}$ 以及它的组成部分 $\Theta_0$、$\mathcal N_0$ 都**不随时间变化**（这也与 \eqref{7.81} 加上 $\Phi'=0$ 一致）。对绝热扰动，\eqref{7.43} 要求各成分的 $\delta\rho_s/\rho_s$ 相同；光子与中微子都有 $\delta\rho/\rho=4\times$温度扰动，故`}</Tx>

      <Eq n="7.90" say={R`绝热条件用于两种辐射：光子与中微子的温度扰动在初始时刻相等。`}>{R`\Theta_0(\boldsymbol k,\eta_i) = \mathcal N_0(\boldsymbol k,\eta_i),`}</Eq>

      <Tx>{R`于是加权平均 $\Theta_{{\rm r},0}$ 就等于 $\Theta_0$，\eqref{7.89} 变为`}</Tx>

      <Eq n="7.91" keyEq title="光子初始单极矩" say={R`绝热初始条件的核心：初始时光子温度单极矩是引力势的一半，$\Theta_0=\Phi/2$。`}>{R`\Phi(\boldsymbol k,\eta_i) = 2\Theta_0(\boldsymbol k,\eta_i)`}</Eq>

      <Tx>{R`这里明确写出了所有变量对 $\boldsymbol k$ 的依赖，以及我们是在某个很早的时刻 $\eta_i$ 设定初始条件。

**物质的初始条件。**限定为绝热扰动之后，$\delta_{\rm c}$ 与 $\delta_{\rm b}$ 的初值也变得简单。把 \eqref{7.81} 的第一式与 \eqref{7.82} 组合：二者右边都正比于 $\Phi'$，故 $\delta_{\rm c}'=3\Theta_0'$，积分得`}</Tx>

      <Eq n="7.92" say={R`视界外暗物质过密度与光子单极矩同步变化，二者只差一个与时间无关的常数——绝热条件将要把这个常数定为零。`}>{R`\delta_{\rm c}(\boldsymbol k,\eta) = 3\Theta_0(\boldsymbol k,\eta) + \mathrm{constant}(\boldsymbol k)`}</Eq>

      <Tx>{R`重子过密度满足完全相同的方程。显然，绝热扰动要求暗物质与重子的常数相同。下面证明这个常数实际上为**零**。绝热扰动意味着物质与辐射的（数密度）比在空间中处处相同。这个比值为`}</Tx>

      <Eq n="7.93" say={R`暗物质与光子数密度之比等于零阶比值（时空常数）乘以扰动修正因子；绝热要求这个修正因子在空间上均匀。`}>{R`\frac{n_{\rm c}}{n_\gamma} = \frac{\bar n_{\rm c}}{\bar n_\gamma}\left[\frac{1+\delta_{\rm c}}{1+3\Theta_0}\right].`}</Eq>

      <Derivation title={R`(7.93) 的来源与线性化`} steps={[
        { tex: R`n_{\rm c}=\bar n_{\rm c}(1+\delta_{\rm c})`, why: R`暗物质过密度的定义。` },
        { tex: R`n_\gamma\propto T^3=\bar T^3(1+\Theta_0)^3\simeq\bar n_\gamma(1+3\Theta_0)`, why: R`光子数密度 $\propto T^3$，而 $\Theta_0=\delta T/T$；保留到一阶。` },
        { tex: R`\frac{1+\delta_{\rm c}}{1+3\Theta_0}\simeq(1+\delta_{\rm c})(1-3\Theta_0)\simeq1+\delta_{\rm c}-3\Theta_0`, why: R`$1/(1+x)\simeq1-x$，并丢掉二阶小量 $\delta_{\rm c}\Theta_0$。` },
        { tex: R`\frac{\bar n_{\rm c}}{\bar n_\gamma}=\text{const}\quad(\text{时间与空间})`, why: R`零阶量都 $\propto a^{-3}$，比值既不随时间也不随空间变。` },
        { tex: R`\delta_{\rm c}-3\Theta_0=0`, why: R`比值要在空间上均匀，扰动部分就不能依赖 $\boldsymbol x$；一个处处相同的扰动可以吸收进零阶量，于是取它为零。` },
      ]} />

      <Tx>{R`前置因子——零阶数密度之比——在时间与空间上都是常数。要让物质与辐射的数密度比在空间上均匀，方括号里的组合（线性化为 $1+\delta_{\rm c}-3\Theta_0$）就必须与位置无关。于是扰动部分必须相消，得到`}</Tx>

      <Eq n="7.94" keyEq title="物质初始过密度" say={R`绝热初始条件：暗物质与重子的过密度相等，都是光子温度单极矩的 3 倍（即 $\frac32\Phi$），等价于每个光子分到的物质粒子数处处相同。`}>{R`\delta_{\rm c} = \delta_{\rm b} = 3\Theta_0.`}</Eq>

      <Box kind="physics" title="为什么是 3 倍：用能量密度看绝热">{R`另一种说法：绝热意味着各成分的 $\delta\rho_s/(\rho_s+\mathcal P_s)$ 相同（或等价地，$\delta n_s/n_s$ 相同）。光子 $\delta\rho_\gamma/\rho_\gamma=4\Theta_0$、$\mathcal P_\gamma=\rho_\gamma/3$，故 $\delta\rho_\gamma/(\rho_\gamma+\mathcal P_\gamma)=3\Theta_0$；暗物质 $\mathcal P=0$，$\delta\rho_{\rm c}/\rho_{\rm c}=\delta_{\rm c}$。两者相等即 $\delta_{\rm c}=3\Theta_0$——和"数密度比均匀"是同一件事。直观上：绝热扰动就好比把整块均匀宇宙在某些地方"时间提前"一点、某些地方"推迟"一点；提前的地方辐射温度和物质密度都高一些，并且 $\rho_{\rm m}\propto T^3$，$\rho_{\rm r}\propto T^4$。`}</Box>

      <Tx>{R`**速度与偶极矩。**最后还需要物质速度与辐射偶极矩的初值。\exref{7.17} 要求你证明合适的初始条件是`}</Tx>

      <Eq n="7.95" title="初始偶极与速度" say={R`初始偶极矩与速度都是领头阶小量 $\propto k/(aH)=k\eta$：所有成分以同一速度沿引力势梯度"下落"。`}>{R`\Theta_1(\boldsymbol k,\eta) = \mathcal N_1(\boldsymbol k,\eta) = \frac{iu_{\rm b}(\boldsymbol k,\eta)}{3} = \frac{iu_{\rm c}(\boldsymbol k,\eta)}{3} = -\frac{k}{6aH}\Phi(\boldsymbol k,\eta).`}</Eq>

      <Derivation collapsed title={R`(7.95) 的推导要点（\exref{7.17} 的思路）`} steps={[
        { tex: R`\Theta_1' - \frac k3\Theta_0 = \frac k3\Psi + \tau'\left[\Theta_1-\frac{iu_{\rm b}}{3}\right]`, why: R`对 \eqref{7.80} 取偶极矩（乘 $i\mu$、对 $d\mu/2$ 积分），并丢掉 $\Theta_2$（多一个 $k\eta$ 因子）。` },
        { tex: R`\Theta_1=\frac{iu_{\rm b}}{3}`, why: R`早期 $|\tau'|$ 极大，紧耦合迫使光子与重子以同一速度运动。把上式与 $R\times$ 重子 Euler 方程 \eqref{5.72} 相加可消去 $\tau'$ 项；辐射期 $R\to0$，结果就是去掉 $\tau'$ 项的光子方程。` },
        { tex: R`\Theta_1' = \frac k3\left(\Theta_0+\Psi\right)=\frac k3\left(\frac\Phi2-\Phi\right)=-\frac{k}{6}\Phi`, why: R`代入 \eqref{7.91} 与 $\Psi=-\Phi$；右边是常数。` },
        { tex: R`\Theta_1 = -\frac{k\eta}{6}\Phi = -\frac{k}{6aH}\Phi`, why: R`从 $\Theta_1(0)=0$ 积分（选择增长解），并用 $\eta=1/(aH)$。` },
        { tex: R`\mathcal N_1' - \frac k3\left(\mathcal N_0-2\mathcal N_2\right) = \frac k3\Psi\;\Rightarrow\;\mathcal N_1=\Theta_1`, why: R`中微子无碰撞，但 $\mathcal N_2$ 是高阶小量，$\mathcal N_0=\Theta_0$，所以方程与光子的相同。` },
        { tex: R`u_{\rm c}' + \frac1\eta u_{\rm c} = -ik\Psi = ik\Phi\;\Rightarrow\;(\eta u_{\rm c})'=ik\Phi\eta\;\Rightarrow\;u_{\rm c}=\frac{ik\eta}{2}\Phi`, why: R`暗物质 Euler 方程 \eqref{5.70}，$a'/a=1/\eta$。` },
        { tex: R`\frac{iu_{\rm c}}{3}=-\frac{k\eta}{6}\Phi=\Theta_1`, why: R`暗物质与光子–重子流体速度一致——视界外只有引力，所有成分同样下落。` },
      ]} />

      <Tx>{R`有了这些，\eqref{7.59} 中辐射主导期超视界尺度上 $\mathcal R$ 的表达式 $\mathcal R=-3aH\Theta_1/k-\Psi$ 就化为（代入 \eqref{7.95}：$-3aH\Theta_1/k=\Phi/2=-\Psi/2$）`}</Tx>

      <Eq n="7.96" title={R`辐射期的 $\mathcal R$`} say={R`辐射主导期视界外，守恒的曲率扰动 $\mathcal R$ 与牛顿势只差一个固定因子 $-3/2$：知道暴胀给出的 $\mathcal R$，就知道了 $\Psi$，进而知道全部初始条件。`}>{R`\mathcal R = -\frac32\Psi.`}</Eq>

      <Tx>{R`这就证明了 \secref{7.4.2} 中借用的结果。整个链条现在闭合了：暴胀 → $\mathcal R$（视界外守恒）→ \eqref{7.96} 给出 $\Psi=-\frac23\mathcal R$、$\Phi=\frac23\mathcal R$ → \eqref{7.91}、\eqref{7.94}、\eqref{7.95} 给出全部九个变量的初值。`}</Tx>

      <Table head={[R`变量`, R`绝热初值（用 $\Phi$ 表示）`, R`用 $\mathcal R$ 表示`, R`来源`]} rows={[
        [R`$\Phi$`, R`$\Phi$（常数模）`, R`$\frac23\mathcal R$`, R`\eqref{7.96}`],
        [R`$\Psi$`, R`$-\Phi$（忽略中微子四极矩）`, R`$-\frac23\mathcal R$`, R`\eqref{6.48}`],
        [R`$\Theta_0$、$\mathcal N_0$`, R`$\frac12\Phi$`, R`$\frac13\mathcal R$`, R`\eqref{7.90}、\eqref{7.91}`],
        [R`$\delta_{\rm c}$、$\delta_{\rm b}$`, R`$\frac32\Phi$`, R`$\mathcal R$`, R`\eqref{7.94}`],
        [R`$\Theta_1$、$\mathcal N_1$`, R`$-\frac{k}{6aH}\Phi$`, R`$-\frac{k}{9aH}\mathcal R$`, R`\eqref{7.95}`],
        [R`$u_{\rm b}$、$u_{\rm c}$`, R`$\frac{ik}{2aH}\Phi$`, R`$\frac{ik}{3aH}\mathcal R$`, R`\eqref{7.95}`],
        [R`$\Theta_l,\ \mathcal N_l\ (l\geq2)$`, R`$\simeq0$（高阶 $k\eta$ 小量）`, R`—`, R`本节论证`],
      ]} caption={R`绝热、超视界（$k\eta_i\ll1$）、辐射主导时的全套初始条件。数值程序就是从这张表出发，把每个 $\boldsymbol k$ 模式积分到今天。`} />

      <Box kind="warning" title="易错点">{R`1. **$\Phi$ 与 $\Psi$ 的符号。**本书约定 $\Psi=-\Phi$，常数模中 $\Phi=2\Theta_0>0$ 对应辐射**过密**区域，此时牛顿势 $\Psi<0$——是势阱，与直觉一致。

2. **$\mathcal R$ 与 $\Phi$ 的关系。**由 \eqref{7.96}，$\mathcal R=-\frac32\Psi=+\frac32\Phi$，因此 $P_\Phi=\frac49P_{\mathcal R}$。

3. **"常数"只在超视界成立。**$\Phi$ 为常数、$\Theta_0=\Phi/2$ 等关系只对 $k\eta\ll1$ 成立；模式进入视界后，压强会让 $\Phi$ 衰减、$\Theta_0$ 开始声学振荡（第 8、9 章）。初始时刻 $\eta_i$ 必须选得足够早，使得所有要计算的 $k$ 都满足 $k\eta_i\ll1$。`}</Box>

      <Tx>{R`**小结与过渡。**到这里，暴胀的预言（\eqref{7.78} 的 $P_{\mathcal R}$）和第 5、6 章的演化方程之间的桥梁就搭好了：只需给出一个高斯随机场 $\mathcal R(\boldsymbol k)$，就能写出所有扰动变量的初值。下一节把全章的结论收拢起来，并把功率谱写成观测上通用的参数化形式（$\mathcal A_s$、$n_s$、$r$、$n_{\rm T}$）。`}</Tx>
    </Sec>);
}
