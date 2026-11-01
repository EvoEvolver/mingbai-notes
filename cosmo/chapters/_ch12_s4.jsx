import { PeakBackgroundRedraw } from "./_ch14_redraw.jsx";
// §12.4 Dark matter halos —— 式 (12.61)–(12.73)，图 12.7–12.9
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { NFWPlot, CollapsePlot, MassFunctionPlot } from "./_ch12_plots.jsx";

const R = String.raw;

export function Sec124() {
  return (
    <Sec n="12.4" title="Dark matter halos" zh="暗物质晕"
      gist={R`模拟中的束缚结构——晕——平均性质很简单：质量用平均内部密度为 $\Delta\,\rho_{\rm m}$ 的球定义 \eqref{12.61}，轮廓近似为普适的 NFW 形式 \eqref{12.62}。球坍缩给出与质量无关的坍缩阈值 $\delta_{\rm cr}\simeq1.686$ 与 $\Delta_{\rm vir}\simeq180$；Press–Schechter 论证把它变成晕质量函数 \eqref{12.73}：大质量晕按 $e^{-\nu^2/2}$ 指数稀少。`}
      why={R`晕是星系的宿主、星系团的理论对应物，也是晕模型（\secref{12.7}）的积木。质量函数对 $\sigma(M)$ 指数敏感，这正是星系团计数能约束宇宙学的原因。`}
      gives={["12.61", "12.62", "12.64", "12.67", "12.68", "12.69", "12.70", "12.73"]}>
      <p className="muted">本节概念：<C id="halo" /> · <C id="nfw" /> · <C id="spherical_collapse" /> · <C id="press_schechter" /></p>
      <Tx>{R`**在模拟中找晕。**在 N 体模拟中识别束缚结构相当直接：先找物质分布中密度最高的点，再判断附近哪些粒子是引力束缚的。后一条件在模拟中可以计算：在粒子位置处算出晕的引力势 $\Psi_{\rm h}$，与粒子的动能比较（速度为 $v$ 的粒子若 $v^2/2<|\Psi_{\rm h}|$ 则是束缚的）。至于"附近"，有两种定义：要么粒子位于内部密度高于某阈值的球内（"**球形过密度**"算法，spherical overdensity），要么它与其他晕粒子的最近邻距离小于某阈值（"**朋友的朋友**"算法，friends-of-friends）。关键在于：按定义，任何粒子只能属于**一个**晕。两种算法的结果都是一份晕表，列出各种质量的晕及其他性质，如质心位置与速度。

**为什么叫"晕"？**来自恒星与气体在星系内的动力学、以及星系在星系团内的动力学的暗物质证据可以追溯到 1930 年代。此后几十年间逐渐清楚：提供额外引力势的暗成分必须比恒星和气体**延展得多**。于是形成了这样的图景：星系嵌在一个大得多的暗结构——**晕**——之中。只含引力的 N 体模拟虽然不形成星系，但其中的束缚结构很快就被认同为容纳星系的晕。此后这一范式积累了大量证据，而且有相当坚实的物理基础：在高红移（再电离时期附近），最终形成恒星的气体在致密区域冷却最有效，冷却使它坍缩到足以触发恒星形成的密度。所以**所有星系都寄居在某个质量的暗物质晕中**，反之则未必：很可能存在不含星系的低质量晕。尽管如此，我们相信在某个最小晕质量以上，大多数暗物质晕至少容纳一个星系。因此，只要知道（或假设）星系在不同质量的晕中如何分布，就能基于只含引力的 N 体模拟预言星系的丰度与成团——这比试图模拟星系的真实形成简单得多。

晕的另一个用途基于"任何粒子只能属于一个晕"这一事实。如果再假设**所有**物质都包含在某个质量的晕中，就能由晕的密度场加上其内部结构的模型搭建出整个物质密度场。这称为**晕模型**，\secref{12.7} 再回到它。`}</Tx>

      <Sub n="12.4.1" title="Halo masses and profiles" zh="晕的质量与轮廓">
        <Tx>{R`**单一参数。**上面两种应用都得益于晕的一个幸运性质：单个晕的细节结构非常复杂，但它们的**平均**性质出奇地简单。零阶近似下，晕在某一时刻的性质由一个数决定：它在该时刻的质量。在利用这一点之前，要先想清楚晕的质量如何定义。在模拟中，可以严格地定义为所有引力束缚粒子的质量之和。但这个定义不便与观测联系——观测通常测量以晕为中心的给定区域内所有可见物质或总物质。更实用的定义是：包含晕中心周围、平均内部密度为某个固定值的球内的所有物质，这个值通常写成平均物质密度的 $\Delta$ 倍。也就是找一个半径 $R_\Delta$，使`}</Tx>
        <Eq n="12.61" keyEq title="晕质量的球形过密度定义" say={R`晕的半径定义为：球内平均密度恰好是宇宙平均物质密度的 $\Delta$ 倍；球内质量就是晕质量 $M_\Delta$。`}>{R`\frac{M(<R_\Delta)}{4\pi R_\Delta^3/3} = \Delta\times\rho_{\rm m}(t_0),`}</Eq>
        <Tx>{R`其中 $R_\Delta$ 是球的**共动**半径（模拟用共动坐标跟踪粒子，分析时用同样的坐标很方便）。然后定义 $M_\Delta\equiv M(<R_\Delta)$。$\Delta$ 很大时，球内几乎所有质量都束缚于晕。典型取 $\Delta=200$，这个数来自 \secref{12.4.2} 的近似半解析计算，所以文献中常见 $R_{200}$ 与相应的 $M_{200}$。注意 $\Delta$ 有时是相对于**临界**密度 $\rho_{\rm cr}$ 定义的，在我们的约定下这相当于一个大 $1/\Omega_{\rm m}$ 倍的 $\Delta$。（从现在起恢复 $\Omega_{\rm m}=\Omega_{\rm m}(t_0)$ 的约定。）

**NFW 轮廓。**暗物质晕的球平均密度轮廓近似是普适的，这最早由 Navarro et al. (1997) 证明。他们提出了平均晕密度轮廓的简单拟合公式（**NFW 轮廓**）：`}</Tx>
        <Eq n="12.62" keyEq title="NFW 轮廓" say={R`NFW 轮廓：内部 $\rho\propto r^{-1}$，外部 $\rho\propto r^{-3}$，在标度半径 $r_s$ 处转折；只有 $\rho_s$、$r_s$ 两个参数。`}>{R`\rho_{\rm h}(r) = \frac{\rho_s}{(r/r_s)(1+r/r_s)^2},`}</Eq>
        <Tx>{R`其中 $r_s$ 是**标度半径**（scale radius）。这个轮廓由两个参数描述：$\rho_s$ 与 $r_s$。标度半径常用**浓度**（concentration）$c_\Delta\equiv R_\Delta/r_s$ 参数化。于是可以把参数 $\rho_s$、$r_s$ 换成更实用的 $M_\Delta$ 与 $c_\Delta$（\exref{12.8} 推导）。浓度有用，是因为发现它只微弱地依赖晕质量。利用 \eqref{12.62} 还可以在不同的晕质量定义 $(M_\Delta,R_\Delta)$ 与 $(M_{\Delta'},R_{\Delta'})$ 之间换算。`}</Tx>
        <Derivation title={R`NFW 晕的包含质量与 $\rho_s$（\exref{12.8}）`} collapsed steps={[
          { tex: R`M(<r)=4\pi\int_0^r\rho_{\rm h}r'^2dr'=4\pi\rho_sr_s^3\left[\ln(1+x)-\frac{x}{1+x}\right]\equiv4\pi\rho_sr_s^3\,m(x),\quad x=r/r_s`, why: R`代换 $u=r'/r_s$，$\int_0^x\frac{u\,du}{(1+u)^2}=\ln(1+x)-\frac{x}{1+x}$。` },
          { tex: R`M_\Delta=M(<R_\Delta)=4\pi\rho_s\frac{R_\Delta^3}{c_\Delta^3}m(c_\Delta),\qquad R_\Delta=\left(\frac{3M_\Delta}{4\pi\Delta\rho_{\rm m}(t_0)}\right)^{1/3}`, why: R`用 $r_s=R_\Delta/c_\Delta$ 与 \eqref{12.61}。` },
          { tex: R`\rho_s=\frac{\Delta\,\rho_{\rm m}(t_0)}{3}\,\frac{c_\Delta^3}{\ln(1+c_\Delta)-c_\Delta/(1+c_\Delta)}`, why: R`两式相除消去 $M_\Delta/R_\Delta^3$。` },
        ]} result={R`给定 $(M_\Delta,c_\Delta)$ 就确定了整个轮廓。$r\to\infty$ 时 $m(x)\to\ln x$，所以总质量对数发散。`} />
        <NFWPlot />
        <Box kind="warning" title="NFW 轮廓在大半径处不可信">{R`仔细看 \eqref{12.62} 会发现，这个轮廓在大半径处并不能真正描述束缚的晕：那里 $\rho_{\rm h}\propto r^{-3}$，晕质量**对数发散**。真实的晕轮廓在大半径处比 NFW 形式更陡，这种变陡通常发生在 $r\gtrsim R_{200}$。所以在晕模型等应用中通常把 NFW 轮廓截断在 $R_{200}$（\exref{12.13}）。`}</Box>
      </Sub>

      <Sub n="12.4.2" title="The halo mass function" zh="晕质量函数">
        <Tx>{R`**晕的丰度。**晕最重要的统计性质是它们的丰度，通常表述为无穷小对数质量区间 $d\ln M$ 内的晕数密度 $dn/d\ln M$，称为**晕质量函数**（halo mass function），可以在模拟中直接测量。还可以借助晕的示踪体在观测上间接估计：例如一个大星系团可以认同为一个大质量晕，而它的质量可以估计出来，因为观测发现晕质量与成员星系数彼此相关。星系团——大质量晕的观测对应物——在 \secref{12.5} 讨论。

关于暗物质晕的一切严格结果都必须从完整的 N 体模拟中得到，质量函数也不例外。但解析方法能提供一些漂亮的洞见，尤其是对最重、最稀有的晕——它们正是容纳星系团的晕。由于它们如此稀少，它们的形成基本可以当作**孤立**的来建模（相比之下，低质量晕会并合，并受更重邻居的影响）。

**拉格朗日半径。**最简单的晕形成情景是均匀球形区域的坍缩，设定见 \figref{12.7}。想象早期 $t_{\rm in}$ 时物质密度为 $\rho_{\rm m}(t_{\rm in})$ 的均匀宇宙，从中切出一个质量为 $M$ 的球（左图）。在未扰动的宇宙中，多大的半径包含质量 $M$？**共动**半径为 $R$ 的球形区域内的平均密度为`}</Tx>
        <Eq n="12.63" say={R`在平均密度的宇宙中，质量 $M$ 对应一个确定的共动体积：今天的平均物质密度 $\times$ 体积 = $M$。`}>{R`\rho_{\rm m}(t_0) = \Omega_{\rm m}\rho_{\rm cr} = \frac{M}{4\pi R^3/3}.`}</Eq>
        <Tx>{R`这个关系定义了与质量 $M$ 对应的**拉格朗日半径** $R_L$：`}</Tx>
        <Eq n="12.64" keyEq title="拉格朗日半径" say={R`组装一个银河系量级的晕（$10^{12}\,h^{-1}M_\odot$）需要从共动半径约 $1.4\,h^{-1}\mathrm{Mpc}$ 的区域收集物质；质量每大 1000 倍，半径大 10 倍。`}>{R`R_L(M) = 1.40\,h^{-1}\,\mathrm{Mpc}\left(\frac{M}{10^{12}\,h^{-1}M_\odot}\right)^{1/3},`}</Eq>
        <Tx>{R`其中用了基准宇宙学的 $\Omega_{\rm m}=0.31$。由于使用 $h^{-1}\mathrm{Mpc}$ 与 $h^{-1}M_\odot$ 为单位，Hubble 常数从表达式中消失了。$R_L$ 等价于 $\Delta=1$ 时的 $R_\Delta$。所以若想从均匀物质密度中组装一个 $M\sim10^{12}\,h^{-1}M_\odot$ 的晕（大致是银河系晕的质量），必须从共动半径约 $1\,h^{-1}\mathrm{Mpc}$ 的范围内收集物质；相应地，要形成容纳星系团的 $M\sim10^{15}\,h^{-1}M_\odot$ 大质量晕，就要从半径 $10\,h^{-1}\mathrm{Mpc}$ 的区域取物质。"拉格朗日半径"这个名字正反映了这一点：如果把晕的组成粒子追溯回初条件，$R_L(M)$ 大致就是包含这些粒子的区域的共动尺寸——因为初始时整个物质密度场都接近平均密度。与 \eqref{12.61} 比较可知，以内部密度 $\Delta\times\rho_{\rm m}(t_0)$ 识别的晕满足 $R_L(M_\Delta)=\Delta^{1/3}R_\Delta$。`}</Tx>
        <Derivation title={R`\eqref{12.64} 的数值`} collapsed steps={[
          { tex: R`\rho_{\rm cr}=\frac{3H_0^2}{8\pi G}=2.775\times10^{11}\,h^2M_\odot\,\mathrm{Mpc^{-3}}\ \Rightarrow\ \rho_{\rm m}(t_0)=8.60\times10^{10}\,h^2M_\odot\,\mathrm{Mpc^{-3}}`, why: R`$\Omega_{\rm m}=0.31$。` },
          { tex: R`R_L=\left(\frac{3M}{4\pi\rho_{\rm m}}\right)^{1/3}=\left(\frac{3\times10^{12}}{4\pi\times8.60\times10^{10}}\right)^{1/3}h^{-1}\mathrm{Mpc}=1.405\,h^{-1}\mathrm{Mpc}`, why: R`取 $M=10^{12}\,h^{-1}M_\odot$。一般地 $R_L\propto(M/\Omega_{\rm m})^{1/3}$，见 \eqref{12.100}。` },
        ]} />
        <Tx>{R`**局部的 FLRW 宇宙。**现在回到一个初始时略微过密的均匀球形区域的演化，其共动半径为 $R_L$。第一个关键观察是质量 $M$ 守恒：内部物质逃不出去，外部物质也落不进来——两者都是球对称设定的结果。在过密区域内部做局域测量的观测者看来，这个均匀区域与一个背景密度更高（$\tilde\rho_{\rm m}$）的 FLRW 宇宙无法区分（\figref{12.7} 中标为 $\nosym{\widetilde{\rm FLRW}}$）。于是对这个区域应用第二个 Friedmann 方程 \eqref{3.90}：`}</Tx>
        <Figure n="12.7" illustration={<CollapsePlot />}
          caption={R`原创计算图。拖动参数 $\theta$ 沿摆线解 \eqref{12.68} 前进。上图为 $r/r_{\rm ta}$ 随 $t/t_{\rm ta}$ 的变化；下图为同一时刻的非线性过密度 $\delta_{\rm NL}(\theta)=\frac92\frac{(\theta-\sin\theta)^2}{(1-\cos\theta)^3}-1$ 与按线性增长外推的 $\delta^{(1)}(\theta)=\frac35\left(\frac34\right)^{2/3}(\theta-\sin\theta)^{2/3}$（物质主导、无 $\Lambda$，\exref{12.9}）。核对：转向（$\theta=\pi$）时 $\delta^{(1)}=1.062$、$1+\delta_{\rm NL}=9\pi^2/16=5.55$；坍缩（$\theta=2\pi$）时 $\delta^{(1)}=\delta_{\rm cr}=1.686$，而按位力化半径 $r_{\rm ta}/2$ 计算的密度对比为 $\Delta_{\rm vir}=18\pi^2\approx178$。`} />
        <Eq n="12.65" say={R`过密区域内部像一个独立的 FLRW 宇宙：其“标度因子”的加速度由区域内的密度与压强决定。`}>{R`\frac{\ddot{\tilde a}}{\tilde a} = -\frac{4\pi G}{3}\left[\tilde\rho_{\rm m} + 3\mathcal P\right],`}</Eq>
        <Tx>{R`其中点表示对普通时间的导数，$\tilde\rho_{\rm m}$ 与 $\mathcal P$ 是区域内的均匀密度与压强。压强的唯一来源是宇宙学常数 $\Lambda$，它与背景宇宙中相同。**物理**（而非共动）半径 $r(t)$ 正比于过密区内的局域标度因子，所以得到`}</Tx>
        <Eq n="12.66" say={R`把局部标度因子换成球的物理半径：物质项用球内质量写出；宇宙学常数的密度与压强合起来贡献 $\rho_\Lambda+3\mathcal P_\Lambda=-2\rho_\Lambda$。`}>{R`\frac{\ddot r}{r} = -\frac{4\pi G}{3}\left[\frac{M}{4\pi r^3(t)/3} - 2\rho_\Lambda\right].`}</Eq>
        <Tx>{R`它化为`}</Tx>
        <Eq n="12.67" keyEq title="球坍缩的运动方程" say={R`球壳的牛顿运动方程：内部质量的引力把它往回拉，宇宙学常数产生一个随半径增大的排斥力。`}>{R`\ddot r(t) = -\frac{GM}{r^2(t)} + \frac{8\pi G}{3}\rho_\Lambda r(t).`}</Eq>
        <Tx>{R`这就是半径为 $r(t)$ 的球形质量的牛顿运动方程，再加上宇宙学常数（或暗能量）造成加速膨胀的**排斥力**（注意这个力的符号相反，且随半径增大）。初条件：在早期 $t_{\rm in}$，区域的过密度小到可以忽略，$r(t_{\rm in})=a(t_{\rm in})R_L$（因子 $a$ 来自共动半径到物理半径的换算）；类似地 $\dot r(t_{\rm in})=\dot a(t_{\rm in})R_L=H(t_{\rm in})r(t_{\rm in})$，即区域参与背景的 Hubble 流。

**摆线解。**没有什么能阻止我们数值求解 \eqref{12.67}。但如果丢掉 $\rho_\Lambda$ 项，方程有解析解（\exref{12.9}）。解是**参数式**的：半径与时间都表为参数 $\theta$ 的函数，`}</Tx>
        <Eq n="12.68" keyEq title="球坍缩的摆线解" say={R`无 $\Lambda$ 时球壳沿摆线运动：$\theta=\pi$ 到达最大半径（转向），$\theta=2\pi$ 坍缩到中心，用时恰好是转向时间的两倍。`}>{R`\begin{aligned}r(t) &= \frac{r_{\rm ta}}{2}(1-\cos\theta),\\ t &= \frac{t_{\rm ta}}{\pi}(\theta-\sin\theta).\end{aligned}`}</Eq>
        <Tx>{R`这个解画在 \figref{12.7} 右下图，解释起来很直接。起初 $r(t)$ 很小且在增大，因为区域参与 Hubble 膨胀（回忆 $r$ 是物理半径）。$t$ 接近**转向时间**（turnaround time）$t_{\rm ta}$ 时，$\dot r$ 经过零并变为负：区域开始坍缩。坍缩（$r=0$）恰好发生在 $t=2t_{\rm ta}$。

**坍缩阈值。**参数 $r_{\rm ta}$ 与 $t_{\rm ta}$ 依赖区域的大小与初始过密度。我们能计算早期（线性微扰论适用时）密度场的统计性质，所以想知道：要在给定时刻 $t$ 坍缩，需要多大的初始过密度？结论是（\exref{12.9}）：如果用线性增长因子向前演化的初始过密度 $\delta^{(1)}_{R_L}(t)$ 超过`}</Tx>
        <Eq n="12.69" keyEq title="球坍缩阈值" say={R`只要线性外推的过密度超过 $1.686$，这个区域在真实（非线性）演化中就已经坍缩了——与区域大小和质量无关。`}>{R`\delta^{(1)}_{R_L}(t) > \delta_{\rm cr} = \frac35\left(\frac{3\pi}{2}\right)^{2/3} \simeq 1.686,`}</Eq>
        <Tx>{R`那么区域在时刻 $t$ 之前已经坍缩，即到达了 $r=0$。这称为**球坍缩阈值**（spherical collapse threshold），可以作为指南，判断给定初始（线性）密度场中哪些区域可能坍缩成晕。值得注意的是，坍缩阈值**不依赖**坍缩区域的大小，因而也不依赖其质量。这是欧氏物质主导宇宙**无标度**性质的结果。

**位力过密度。**还可以估计（\exref{12.9}）球形晕**位力化**时 $r(t)$ 内的典型过密度——利用位力化要求动能等于势能的 $-1/2$。结果同样与区域的大小和质量无关：$\Delta_{\rm vir}=18\pi^2\simeq180$。这就是选 $\Delta=200$ 作为定义晕质量与半径的阈值密度的动机（鉴于这个近似很粗糙，标准做法是取最近的整数）。

**加入 $\Lambda$。**计入 $\Lambda$ 时球坍缩没有闭式解，但数值积分很直接，结果是 $\Lambda$ 对 $\delta_{\rm cr}$ 与 $\Delta_{\rm vir}$ 的影响很小。物理原因是：在物质主导期发生的坍缩早期阶段，$\Lambda$ 不重要；而晚期 $\Lambda$ 变得重要时，坍缩区域已经比背景致密得多，基本与 Hubble 流脱耦了。`}</Tx>
        <Derivation title={R`$\delta_{\rm cr}$ 与 $\Delta_{\rm vir}$ 从哪里来（\exref{12.9} 要点）`} collapsed steps={[
          { tex: R`1+\delta_{\rm NL}=\frac{\rho}{\bar\rho}=\frac{M/(4\pi r^3/3)}{1/(6\pi Gt^2)}=\frac92\frac{(\theta-\sin\theta)^2}{(1-\cos\theta)^3}`, why: R`物质主导 $\bar\rho=1/(6\pi Gt^2)$；用 \eqref{12.68} 与 $r_{\rm ta}^3=8GMt_{\rm ta}^2/\pi^2$（由摆线满足 \eqref{12.67} 得出）。` },
          { tex: R`\theta\ll1:\ \delta_{\rm NL}\simeq\frac{3}{20}\theta^2,\qquad t\simeq\frac{t_{\rm ta}}{6\pi}\theta^3\ \Rightarrow\ \delta^{(1)}=\frac{3}{20}\left(\frac{6\pi t}{t_{\rm ta}}\right)^{2/3}`, why: R`展开到领头阶；线性解 $\propto a\propto t^{2/3}$，所以把这个领头项按 $t^{2/3}$ 外推就是线性过密度。` },
          { tex: R`t=2t_{\rm ta}:\ \delta^{(1)}=\frac{3}{20}(12\pi)^{2/3}=\frac35\left(\frac{3\pi}{2}\right)^{2/3}=1.686`, why: R`这就是 \eqref{12.69}。转向时 $\delta^{(1)}=\frac{3}{20}(6\pi)^{2/3}=1.062$。` },
          { tex: R`r_{\rm vir}=\frac{r_{\rm ta}}2,\qquad\Delta_{\rm vir}=\frac{\rho(r_{\rm vir})}{\bar\rho(2t_{\rm ta})}=\frac{9\pi^2}{16}\times2^3\times2^2=18\pi^2\approx178`, why: R`转向时只有势能 $W_{\rm ta}=-\frac35GM^2/r_{\rm ta}$；位力平衡 $K=-W/2$ 且能量守恒给出 $W_{\rm vir}=2W_{\rm ta}$，故 $r_{\rm vir}=r_{\rm ta}/2$。转向时 $\rho/\bar\rho=9\pi^2/16$，半径减半使 $\rho\times8$，背景从 $t_{\rm ta}$ 到 $2t_{\rm ta}$ 稀释 $\times4$。` },
        ]} />
        <Tx>{R`**从坍缩阈值到质量函数。**所以球坍缩近似对很重的晕是合理的。那么如何预言星系团的丰度？问题归结为预言按条件 \eqref{12.69} 坍缩成晕的区域有多少。基本洞见来自 Press & Schechter (1974) 与 Bond et al. (1991)，由此形成的框架称为**扩展 Press–Schechter** 或**偏移集**（excursion-set）理论。为了理解他们的论证，看 \figref{12.8} 中的一维密度场（蓝色波动线）：正、负两个方向都有相对较大的偏离区域。我们关心正方向的大偏离：正是这些稀有的大过密区域坍缩形成大质量晕。`}</Tx>
        <Figure n="12.8" illustration={<PeakBackgroundRedraw />} width="100%" caption={R`确定性多正弦场的峰–背景分离教学模型：正长波背景提高短波跨越坍缩阈值的机会。`} />
        <Tx>{R`**Press–Schechter 论证。**在红移 $z$，（初条件中）有多大比例的空间包含在质量**大于** $M$ 的已坍缩晕中？Press 与 Schechter 论证：在共动尺度 $R_L(M)$ 上平滑的线性密度场服从均值为零、方差为 $\sigma(R_L,z)$ 的 Gauss 分布，所以这个体积比例就是这个 Gauss 分布从坍缩阈值到无穷的积分：`}</Tx>
        <Eq n="12.70" keyEq title="Press–Schechter 坍缩比例" say={R`坍缩比例 = 平滑线性密度超过阈值 $\delta_{\rm cr}$ 的概率（再乘以 PS 的因子 2）；它只依赖比值 $\delta_{\rm cr}/\sigma$。`}>{R`\begin{aligned}F_{\rm coll,PS}(M,z) &= 2\times\frac{1}{\sqrt{2\pi}\,\sigma(R_L[M],z)}\int_{\delta_{\rm cr}}^\infty d\delta\,e^{-\delta^2/2\sigma^2(R_L[M],z)}\\ &= 2\times\frac{1}{\sqrt{2\pi}}\int_{\delta_{\rm cr}/\sigma(R_L[M],z)}^\infty d\nu\,e^{-\nu^2/2}.\end{aligned}`}</Eq>
        <Tx>{R`注意积分只依赖比值 $\delta_{\rm cr}/\sigma(R_L[M],z)$。因子 2 是 Press & Schechter (1974) 为了得到正确归一化而**人为**引入的。特别地，预期 $R\to0$ 时方差发散，因此所有物质都应包含在已坍缩的结构中（尽管球坍缩并不能正确描述这些低质量天体的形成）；也就是预期`}</Tx>
        <Eq n="12.71" say={R`归一化要求：最小尺度上方差发散，所有物质最终都在某个晕里。`}>{R`\lim_{M\to0}F_{\rm coll,PS}(M,z) = 1.`}</Eq>
        <Tx>{R`没有 \eqref{12.70} 中的因子 2，就只会得到 $1/2$。这个"凑数因子"后来由 Bond et al. (1991) 引入偏移集形式严格地解释了（见下框）。

**质量函数。**现在要把坍缩比例转换成晕质量函数。晕质量函数就是物质的平均数密度乘以坍缩进质量为 $M$ 的晕中的物质比例，所以`}</Tx>
        <Eq n="12.72" say={R`质量在 $M$ 附近的晕的数密度 = 落进这些晕的质量密度（平均物质密度 $\times$ 坍缩比例的导数）$\div$ 每个晕的质量。`}>{R`\frac{dn(M,z)}{d\ln M} = \frac{\rho_{\rm m}(t_0)}{M}\left|\frac{dF_{\rm coll,PS}}{d\ln M}\right|.`}</Eq>
        <Tx>{R`前面的因子 $1/M$ 来自把质量为 $M$ 的晕中的**质量密度**（相当于拉格朗日空间中的体积比例）换算为**数密度**。用 \eqref{12.70}，结果是`}</Tx>
        <Eq n="12.73" keyEq title="Press–Schechter 质量函数" say={R`晕的数密度 = 平均密度/质量 $\times$ 一个只依赖峰高 $\nu=\delta_{\rm cr}/\sigma$ 的普适函数 $\times$ $\sigma(M)$ 随质量变化的快慢；大质量端按 $e^{-\nu^2/2}$ 指数截断。`}>{R`\frac{dn(M,z)}{d\ln M} = \frac{\rho_{\rm m}(t_0)}{M}f_{\rm PS}\left(\frac{\delta_{\rm cr}}{\sigma(M,z)}\right)\left|\frac{d\ln\sigma(M,z)}{d\ln M}\right|,\qquad f_{\rm PS}(\nu) = \sqrt{\frac2\pi}\,\nu e^{-\nu^2/2},`}</Eq>
        <Tx>{R`其中按文献惯例简记 $\sigma(M,z)\equiv\sigma(R_L[M],z)$。（文献中 $f_{\rm PS}(\nu)$ 也常定义为外面多一个因子 $\nu$，即 $f_{\rm PS}(\nu)\to\nu f_{\rm PS}(\nu)$。）大质量晕有 $\sigma(M,z)\ll\delta_{\rm cr}$，因为大平滑尺度上方差小（\figref{12.1}）。这对应 $\nu\gg1$，于是这类晕的丰度被**指数**压低。在 N 体模拟中数晕证实了这个结果（\figref{12.9}）。在这个玩具模型中这很容易理解：大质量晕来自初始密度场中稀有的向上涨落，而初始密度场是 Gauss 的，这类涨落被 $e^{-\nu^2/2}$ 因子压低。`}</Tx>
        <Derivation title={R`从 \eqref{12.70} 到 \eqref{12.73}`} collapsed steps={[
          { tex: R`\frac{dF_{\rm coll,PS}}{d\ln M}=\frac{2}{\sqrt{2\pi}}\,e^{-\nu^2/2}\left(-\frac{d\nu}{d\ln M}\right),\qquad\nu=\frac{\delta_{\rm cr}}{\sigma(M,z)}`, why: R`对积分下限求导。` },
          { tex: R`\frac{d\nu}{d\ln M}=-\nu\,\frac{d\ln\sigma}{d\ln M}`, why: R`$\ln\nu=\ln\delta_{\rm cr}-\ln\sigma$。` },
          { tex: R`\left|\frac{dF_{\rm coll,PS}}{d\ln M}\right|=\sqrt{\frac2\pi}\,\nu e^{-\nu^2/2}\left|\frac{d\ln\sigma}{d\ln M}\right|=f_{\rm PS}(\nu)\left|\frac{d\ln\sigma}{d\ln M}\right|`, why: R`代入 \eqref{12.72} 即得 \eqref{12.73}。由 $\int_0^\infty f_{\rm PS}(\nu)d\nu/\nu=1$ 可验证 \eqref{12.96} 的质量归一化。` },
        ]} />
        <Box kind="physics" title="因子 2 与偏移集（云中云问题）">{R`PS 论证漏算了这样的区域：在半径 $R$ 上平滑时 $\delta<\delta_{\rm cr}$，但它被包含在一个更大的、平滑后 $\delta>\delta_{\rm cr}$ 的区域中——它其实属于一个更重的已坍缩晕（"云中云"问题）。Bond et al. (1991) 把平滑尺度从大往小逐步减小，对每一点画出 $\delta_R$ 随 $\sigma^2(R)$ 的"随机游走"（sharp-$k$ 滤波下各步独立）。一个点属于质量 $>M$ 的晕，当且仅当它的游走在 $\sigma^2\le\sigma^2(M)$ 之前**首次穿越**过阈值。由反射原理，首次穿越概率恰好是"终点在阈值之上"概率的两倍——因子 2 自然出现。`}</Box>
        <Figure n="12.9" illustration={<MassFunctionPlot />}
          caption={R`原创计算图。纵轴为 $(M^2/\rho_{\rm m})\,dn/dM=f(\nu)\,|d\ln\sigma/d\ln M|$，$\sigma(M,z)$ 由 \figref{12.1} 同一线性功率谱以 tophat 窗口在 $R_L(M)$ \eqref{12.64} 上计算；三条曲线为 Press–Schechter \eqref{12.73}、Sheth–Tormen (1999) 拟合 $f_{\rm ST}(\nu)=A\sqrt{2a/\pi}\,[1+(a\nu^2)^{-p}]\,\nu e^{-a\nu^2/2}$（$A=0.3222$、$a=0.707$、$p=0.3$）与 Tinker et al. (2008) $\Delta=200$ 拟合（含其红移演化）。核对：$z=0$ 时 Tinker 曲线在 $M\sim10^{13}\,h^{-1}M_\odot$ 附近达到峰值 $\approx10^{-1.2}$，在 $M\gtrsim10^{15}$ 急剧下降，与原图上面一组曲线一致；PS 在大质量端明显偏低、在小质量端偏高。拖动红移滑块：大质量晕的丰度随红移指数下降。`} />
        <Tx>{R`**拟合函数。**\eqref{12.73} 只是模拟中质量函数的一个很粗糙的近似。人们提出了把 $f_{\rm PS}(\nu)$ 换成更一般函数 $f(\nu)$ 的拟合公式。有了这样的函数，\eqref{12.73} 在一系列质量、红移、甚至不同宇宙学下都相当准确（见 \figref{12.9} 中横跨五个数量级晕质量的曲线）。注意用一般的拟合函数时，坍缩阈值 $\delta_{\rm cr}$ 不再直接与球坍缩相联系。尽管如此，球坍缩与偏移集论证为观测到的晕质量函数如何产生提供了合理的物理图像。`}</Tx>
      </Sub>
    </Sec>);
}
