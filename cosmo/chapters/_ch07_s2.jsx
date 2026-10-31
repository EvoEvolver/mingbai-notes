// §7.2 Inflation —— 式 (7.6)–(7.18)，图 7.5
import { Sec, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { SlowRollPlot } from "./_ch07_plots.jsx";

const R = String.raw;

export function Sec72() {
  return (
    <Sec n="7.2" title="Inflation" zh="暴胀"
      gist={R`加速膨胀需要 $\rho+3\mathcal P<0$ 的负压物质，最简单的实现是一个在势 $V(\phi)$ 上**缓慢滚动**的标量场：势能主导时 $w\simeq-1$。由能动量守恒得到场方程 $\ddot\phi+3H\dot\phi+V_{,\phi}=0$；慢滚时 $\eta\simeq-1/(aH)$，并用两个慢滚参数 $\epsilon_{\rm sr}$、$\delta_{\rm sr}$ 刻画偏离 de Sitter 的程度。场滚到势的极小值后振荡、衰变，即"再加热"。`}
      why={R`\secref{7.1} 只说明了"需要一段加速膨胀"，没有说明什么东西能做到这一点。宇宙学常数不行（它永不结束），普通物质与辐射也不行（压强为正）。要计算暴胀中产生的扰动，必须先有一个具体的、能开始也能结束的动力学模型。`}
      gives={["7.8", "7.9", "7.10", "7.14", "7.15", "7.16", "7.17", "7.18"]}>
      <p className="muted">本节概念：<C id="inflation" /> · <C id="scalar_field" /> · <C id="slow_roll" /></p>
      <Tx>{R`**需要什么样的物质？**在 \secref{2.4.6} 研究暗能量时我们已经知道：要得到加速膨胀，有效压强必须为**负**。暴胀看来也是由类似的能量形式驱动的，其压强 $\mathcal P<0$（本书用 $\mathcal P$ 表示压强）。再强调一次第 2 章的观点：负压不是我们熟悉的东西。非相对论物质的压强为很小的正值，相对论气体的压强 $\mathcal P=\rho/3$，同样为正。所以，无论驱动暴胀（或者晚近宇宙加速）的是什么，它都**不是**普通物质或辐射。

它也不能是**宇宙学常数**：宇宙学常数会导致永无休止的快速暴胀，而我们需要暴胀**结束**，并过渡到我们观测到的辐射主导、然后物质主导的阶段。`}</Tx>
      <Box kind="physics" title={R`为什么是 $\rho+3\mathcal P<0$`}>{R`由第二 Friedmann 方程（加速方程）$\ddot a/a=-\frac{4\pi G}{3}(\rho+3\mathcal P)$，加速膨胀 $\ddot a>0$ 等价于 $\rho+3\mathcal P<0$，即物态方程 $w=\mathcal P/\rho<-1/3$。下面我们就要问：一个标量场能否做到这一点？`}</Box>
      <Tx>{R`**最简单的候选：标量场。**产生这样一段**暂时的**加速膨胀，最简单的可能是借助一个**标量场**（scalar field）的势能。（顺带一提，一类被称为**精质**（quintessence）的暗能量模型恰好也是基于同样的想法。）值得指出的是，目前**并没有已知的标量场能驱动暴胀**。自然界中我们确实知道一个标量场——Higgs 玻色子（Box 1.1）——但用它来驱动暴胀相当困难：它的相互作用与性质已被约束得足够好，我们知道它无法充当暴胀的源。另一方面，大多数被提出的基本粒子物理理论（例如弦论的各种实现）都含有额外的标量场。事实上，当前绝大多数暴胀研究都基于一个（有时是几个）标量场。

因此我们也这样做，并且**不再假装**要把这个用来驱动暴胀的一般标量场与已知物理联系起来。`}</Tx>
      <Box kind="aside" title="原书脚注 1">{R`作者在这里幽默地写道：建立这种联系，就留作一位未来诺贝尔奖得主的家庭作业吧。`}</Box>
      <Tx>{R`不过请记住：完全有可能**暴胀的想法是对的**，但驱动它的并不是标量场。`}</Tx>
      <Box kind="note" title="更激进的替代方案：火劫（ekpyrosis）">{R`有一种更激进的替代方案叫做**火劫**（ekpyrosis）宇宙：它假设宇宙经历的是一段**缓慢收缩**的时期，而不是暴胀所设想的快速加速膨胀。为了过渡到今天看到的膨胀宇宙，必须经历一次"反弹"（bounce），其间哈勃率改变符号；而这种反弹被证明很难控制。本书不讨论火劫方案，但要指出：计算火劫中扰动所用的技术，与暴胀计算中所用的相当相似。`}</Box>
      <Tx>{R`**标量场的能动张量。**我们想知道一个标量场——记作 $\phi(\boldsymbol x,t)$，**不要**与度规扰动 $\Phi(\boldsymbol x,t)$ 混淆——能否具有负的 $\rho+3\mathcal P$。所以第一步是写出 $\phi$ 的能动张量。它可以从带势能的正则标量场的拉氏量推出（见 \exref{7.4}），结果是`}</Tx>
      <Eq n="7.6" title="标量场的能动张量" say={R`标量场的能动张量由两部分组成：场梯度的乘积（动能与梯度能的"流"），减去一个正比于度规的项（拉氏量：动能项加势能 $V$）。`}>{R`T^\alpha{}_\beta=g^{\alpha\nu}\frac{\partial\phi}{\partial x^\nu}\frac{\partial\phi}{\partial x^\beta}-\delta^\alpha{}_\beta\left[\frac12g^{\mu\nu}\frac{\partial\phi}{\partial x^\mu}\frac{\partial\phi}{\partial x^\nu}+V(\phi)\right].`}</Eq>
      <Tx>{R`其中 $V(\phi)$ 是场的**势**（potential）。例如，质量为 $m$ 的自由场的势是 $V(\phi)=m^2\phi^2/2$。`}</Tx>
      <Box kind="warning" title="符号约定">{R`如果去翻文献，你**一定**会看到与 \eqref{7.6} 符号不同的写法。这些符号由度规的约定决定。本书的度规号差 $(-,+,+,+)$ 是宇宙学中最常用的约定，但在粒子物理中并不那么常见——那里更流行"大部分为负"（mostly negative）的约定 $(+,-,-,-)$。在后一种约定下，$g^{\mu\nu}$ 整体反号，于是 \eqref{7.6} 方括号中的动能项以及第一项的符号都会相应改变。核对公式时，先确认作者用的是哪种号差。`}</Box>
      <Box kind="physics" title={R`\eqref{7.6} 从哪里来（\exref{7.4} 的思路）`}>{R`正则标量场的拉氏量密度为 $\mathcal L=-\frac12g^{\mu\nu}\partial_\mu\phi\,\partial_\nu\phi-V(\phi)$（号差 $(-,+,+,+)$ 下，动能项 $\frac12\dot\phi^2$ 为正）。对度规变分得到的能动张量是 $T_{\mu\nu}=\partial_\mu\phi\,\partial_\nu\phi+g_{\mu\nu}\mathcal L$；用 $g^{\alpha\mu}$ 升一个指标，就是 \eqref{7.6}。对场 $\phi$ 本身变分则得到 Klein–Gordon 方程——下面我们换一条路，用能动量守恒得到同一个方程。`}</Box>
      <Tx>{R`**零阶与一阶。**我们假设场在零阶是均匀的：$\phi$ 由一个零阶均匀部分加上一个一阶扰动 $\delta\phi(\boldsymbol x,t)$ 组成。本节只讨论零阶均匀部分 $\phi(t)$——它的能量密度、压强与时间演化；扰动 $\delta\phi$ 及其如何产生留到后面几节。

对均匀场，只有 $\phi$ 的**时间**导数有贡献，所以 \eqref{7.6} 第一项中的指标 $\nosym{\nu},\nosym{\beta}$ 与第二项中的 $\mu,\nosym{\nu}$ 都必须为 0。能动张量化为`}</Tx>
      <Eq n="7.7" say={R`均匀场的能动张量是对角的：时间–时间分量多出一个 $-\dot\phi^2$，空间分量都等于 $\frac12\dot\phi^2-V$。`}>{R`T^\alpha{}_\beta=-\delta^\alpha{}_0\delta^0{}_\beta\dot\phi^2+\delta^\alpha{}_\beta\left[\frac12\dot\phi^2-V(\phi)\right].`}</Eq>
      <Derivation title={R`\eqref{7.6} → \eqref{7.7}`} collapsed steps={[
        { tex: R`\frac{\partial\phi}{\partial x^\nu}=\dot\phi\,\delta^0{}_\nu,\qquad g^{00}=-1`, why: R`均匀场只依赖时间；零阶 FLRW 度规 $g_{00}=-1$，且 $g^{\alpha\nu}$ 对角。` },
        { tex: R`g^{\alpha\nu}\frac{\partial\phi}{\partial x^\nu}\frac{\partial\phi}{\partial x^\beta}=g^{\alpha0}\dot\phi^2\delta^0{}_\beta=-\delta^\alpha{}_0\delta^0{}_\beta\dot\phi^2`, why: R`第一项：只有 $\nosym{\nu}=\nosym{\beta}=0$ 存活，而 $g^{\alpha0}=-\delta^\alpha{}_0$。` },
        { tex: R`\frac12g^{\mu\nu}\frac{\partial\phi}{\partial x^\mu}\frac{\partial\phi}{\partial x^\nu}=\frac12g^{00}\dot\phi^2=-\frac12\dot\phi^2`, why: R`第二项：只有 $\mu=\nosym{\nu}=0$ 存活。` },
        { tex: R`T^\alpha{}_\beta=-\delta^\alpha{}_0\delta^0{}_\beta\dot\phi^2-\delta^\alpha{}_\beta\left[-\frac12\dot\phi^2+V\right]`, why: R`合并即 \eqref{7.7}。` },
      ]} />
      <Tx>{R`**能量密度与压强。**时间–时间分量 $T^0{}_0$ 等于 $-\rho$，由 \eqref{7.7}，$T^0{}_0=-\dot\phi^2+\frac12\dot\phi^2-V$，所以能量密度为`}</Tx>
      <Eq n="7.8" say={R`均匀标量场的能量密度 = 动能密度 $\frac12\dot\phi^2$ + 势能密度 $V$，就像一个在势中运动的粒子的总能量。`}>{R`\rho=\frac12\dot\phi^2+V(\phi).`}</Eq>
      <Tx>{R`第一项是场的动能密度，第二项是势能密度。所以均匀标量场的动力学与**在势中运动的单个粒子**非常相似：把 $\phi(t)$ 想成粒子的位置 $x(t)$，$\dot\phi$ 就是它的速度 $\dot x$。这个类比甚至渗透到描述暴胀的语言中（"滚动""慢滚""摩擦"）。

均匀场的压强为 $\mathcal P=T^i{}_i$（对空间指标 $i$ **不求和**；$i=1,2,3$ 结果都一样），所以`}</Tx>
      <Eq n="7.9" say={R`标量场的压强 = 动能 减去 势能：势能主导时压强为负。`}>{R`\mathcal P=\frac12\dot\phi^2-V(\phi).`}</Eq>
      <Tx>{R`于是，**势能多于动能**的场位形就具有负压。等价地，可以用物态方程表述：`}</Tx>
      <Eq n="7.10" say={R`标量场的物态方程参数：势能主导（$\dot\phi^2\ll V$）时 $w\to-1$，像宇宙学常数；动能主导时 $w\to+1$。`}>{R`w=\frac{\mathcal P}{\rho}=\frac{\dot\phi^2-V(\phi)}{\dot\phi^2+V(\phi)}`}</Eq>
      <Tx>{R`它接近 $-1$。`}</Tx>
      <Box kind="warning" title={R`疑似勘误：\eqref{7.10} 中少了因子 $1/2$`}>{R`直接用 \eqref{7.8}、\eqref{7.9} 相除得到的是
$$w=\frac{\frac12\dot\phi^2-V(\phi)}{\frac12\dot\phi^2+V(\phi)},$$
原书 \eqref{7.10} 的分子分母中动能项都漏掉了 $\frac12$。这不影响定性结论（$\dot\phi^2\ll V$ 时 $w\simeq-1$），但定量使用时请以上式为准。例如 $w<-1/3$（加速）对应 $\dot\phi^2<V$，而不是按原式得出的 $\dot\phi^2<V/2$。`}</Box>
      <Tx>{R`**慢滚图像。**最流行的暴胀方案假设标量场正**缓慢地滚向**它真正的基态（Linde 1982；Albrecht & Steinhardt 1982）。只要势不太陡，这样的场的势能非常接近常数，很快就压倒动能（以及其他所有粒子的能量）而占据主导。图 7.5 是一个例子：当场到达势的极小值时暴胀结束，场将在那里振荡，并衰变为更轻的粒子（最终变成标准模型的粒子）。

文献中提出过各种各样形式的势，Martin 等（2014）给出了一份详尽的清单。不知是幸还是不幸，许多不同的模型都可以被调得与观测相符。因此这里不详细讨论具体的方案。`}</Tx>
      <Figure n="7.5" interactive={<SlowRollPlot />}
        caption={R`标量场沿势 $V(\phi)$ 缓慢滚下。由于滚得很慢，它的动能很小；但势能不为零，所以压强为负。场到达势的极小值时，暴胀时期结束。交互版：可选 $m^2\phi^2$ 势或 Starobinsky 势，拖动滑块改变场值 $\phi$，实时显示该处的慢滚参数 $\epsilon_{\rm sr}$、$\delta_{\rm sr}$ 以及对应的谱指数 $n_s$ 与张标比 $r$（后两者的公式见 \secref{7.6}）。`} />
      <Tx>{R`**场的运动方程。**要确定 $\phi$ 在任意势中的演化，考虑能动张量的守恒：`}</Tx>
      <Eq n="7.11" say={R`能动张量的协变散度为零：在膨胀时空中，能量与动量守恒除了普通偏导外还要计入 Christoffel 符号带来的"膨胀修正"。`}>{R`\nabla_\mu T^\mu{}_\nu=\frac{\partial T^\mu{}_\nu}{\partial x^\mu}+\Gamma^\mu{}_{\alpha\mu}T^\alpha{}_\nu-\Gamma^\alpha{}_{\nu\mu}T^\mu{}_\alpha=0.`}</Eq>
      <Tx>{R`均匀背景场 $\phi(t)$ 的能动张量与 \eqref{2.44} 的理想流体形式相同（对角，$T^0{}_0=-\rho$，$T^i{}_j=\mathcal P\delta^i{}_j$），所以可以直接借用第 2 章的结果 \eqref{2.56}：`}</Tx>
      <Eq n="7.12" say={R`膨胀宇宙中的能量守恒（连续性方程）：能量密度的下降率等于 $3H(\rho+\mathcal P)$，压强越负，能量密度掉得越慢。`}>{R`\frac{\partial\rho}{\partial t}+3H[\rho+\mathcal P]=0.`}</Eq>
      <Tx>{R`把上面得到的密度 \eqref{7.8} 与压强 \eqref{7.9} 代入，得到`}</Tx>
      <Eq n="7.13" say={R`连续性方程用场写出来：动能的变化率 + 势能的变化率 + 哈勃摩擦耗散的功率 = 0。`}>{R`\dot\phi\ddot\phi+V_{,\phi}\dot\phi+3H\dot\phi^2=0,`}</Eq>
      <Derivation title={R`\eqref{7.12} → \eqref{7.13}`} collapsed steps={[
        { tex: R`\frac{\partial\rho}{\partial t}=\dot\phi\ddot\phi+\frac{dV}{d\phi}\dot\phi=\dot\phi\ddot\phi+V_{,\phi}\dot\phi`, why: R`对 \eqref{7.8} 求时间导数，势能项用链式法则。` },
        { tex: R`\rho+\mathcal P=\dot\phi^2`, why: R`\eqref{7.8} 与 \eqref{7.9} 相加，势能项相消。` },
      ]} />
      <Tx>{R`这里以及此后都记 $V_{,\phi}\equiv dV/d\phi$。两边除以 $\dot\phi$，得到`}</Tx>
      <Eq n="7.14" keyEq title="标量场运动方程（宇宙时）" say={R`均匀标量场像一个在势 $V$ 中滚动、并受到"哈勃摩擦" $3H\dot\phi$ 阻尼的粒子：加速度 + 摩擦 + 势的坡度 = 0。`}>{R`\ddot\phi+3H\dot\phi+V_{,\phi}(\phi)=0.`}</Eq>
      <Box kind="physics" title="哈勃摩擦">{R`\eqref{7.14} 就是"在势中运动的粒子"的牛顿方程 $\ddot x=-V'(x)$，外加一个摩擦项 $3H\dot\phi$。这个摩擦来自宇宙膨胀：场的动能被膨胀稀释。如果 $H$ 足够大、势足够平，摩擦会让场达到"终端速度" $\dot\phi\simeq-V_{,\phi}/(3H)$，像在蜂蜜中下落的小球——这就是**慢滚**（slow roll）的力学本质。`}</Box>
      <Tx>{R`**换成共形时间。**改用共形时间 $\eta$ 作为时间变量，不难证明（\exref{7.5}）`}</Tx>
      <Eq n="7.15" say={R`同一个场方程用共形时间写出：摩擦系数变为 $2aH$，势的坡度项多了因子 $a^2$。`}>{R`\phi''+2aH\phi'+a^2V_{,\phi}=0.`}</Eq>
      <Derivation title={R`\eqref{7.14} → \eqref{7.15}（\exref{7.5}）`} collapsed steps={[
        { tex: R`\frac{d}{dt}=\frac1a\frac{d}{d\eta}\quad\Rightarrow\quad\dot\phi=\frac{\phi'}{a}`, why: R`由 $d\eta=dt/a$；撇号表示对 $\eta$ 求导。` },
        { tex: R`\ddot\phi=\frac1a\frac{d}{d\eta}\left(\frac{\phi'}{a}\right)=\frac{\phi''}{a^2}-\frac{a'\phi'}{a^3}=\frac{\phi''-aH\phi'}{a^2}`, why: R`用 $a'=a\dot a=a^2H$。` },
        { tex: R`\frac{\phi''-aH\phi'}{a^2}+3H\frac{\phi'}{a}+V_{,\phi}=0`, why: R`代入 \eqref{7.14}。` },
        { tex: R`\phi''+2aH\phi'+a^2V_{,\phi}=0`, why: R`乘以 $a^2$：$-aH\phi'+3aH\phi'=2aH\phi'$。` },
      ]} />
      <Tx>{R`值得强调：到目前为止的**所有**结果，几乎一字不改地适用于由正则标量场描述的暗能量（精质）模型。

**慢滚与共形时间。**大多数暴胀模型都是**慢滚**（slow-roll）模型：零阶场以及随之而来的哈勃率都变化得很慢。于是共形时间 $\eta$（按 \eqref{7.5} 以暴胀结束为零点）与膨胀率之间有一个简单的关系。具体来说，暴胀期间`}</Tx>
      <Eq n="7.16" keyEq title={R`暴胀期间 $\eta\simeq-1/(aH)$`} say={R`暴胀期间共形时间为负，其绝对值就是当时的共动哈勃半径：越接近暴胀结束，$|\eta|$ 越小。`}>{R`\eta\equiv\int_{a_e}^a\frac{da}{Ha^2}\simeq\frac1H\int_{a_e}^a\frac{da}{a^2}\simeq-\frac{1}{aH}`}</Eq>
      <Derivation title={R`\eqref{7.16} 的每一步`} collapsed steps={[
        { tex: R`d\eta=\frac{dt}{a}=\frac{da}{a\dot a}=\frac{da}{Ha^2}`, why: R`把 \eqref{7.5} 的积分变量从 $t$ 换成 $a$，下限 $t_e$ 对应 $a_e$。` },
        { tex: R`\int_{a_e}^a\frac{da}{Ha^2}\simeq\frac1H\int_{a_e}^a\frac{da}{a^2}`, why: R`第一个近似：慢滚中 $H$ 几乎是常数，可以提到积分号外。` },
        { tex: R`\frac1H\left[-\frac1{a}\right]_{a_e}^{a}=-\frac{1}{aH}+\frac{1}{a_eH}\simeq-\frac{1}{aH}`, why: R`第二个近似：暴胀中期的 $a$ 远小于暴胀结束时的 $a_e$（$a_e\gg a$），所以 $1/a_e$ 可忽略。` },
      ]} />
      <Tx>{R`第一个近似等号成立是因为 $H$ 几乎不变；第二个是因为暴胀结束时的标度因子远大于暴胀中期的值（$a_e\gg a$）。由此，一个波数为 $k$ 的模式穿出视界的条件 $k=aH$ 就可以简洁地写成 $k|\eta|=1$——这在 \secref{7.3}、\secref{7.4} 中会反复用到。

**慢滚参数。**为了量化"慢滚"，宇宙学家通常定义两个在 $\phi$ 保持不变的极限下趋于零的变量。存在好几种不同的选择与约定；我们采用与观测量联系最直接的一种（与其他选择的关系可在 \exref{7.7} 和 \exref{7.8} 中推导）。第一个是`}</Tx>
      <Eq n="7.17" keyEq title="第一慢滚参数" say={R`$\epsilon_{\rm sr}$ 是哈勃率在一个 e 倍膨胀中的相对变化：它为零时是精确的 de Sitter 指数膨胀，小于 1 时宇宙在加速。`}>{R`\epsilon_{\rm sr}\equiv\frac{d}{dt}\left(\frac1H\right)=-\frac{H'}{aH^2},`}</Eq>
      <Derivation title={R`\eqref{7.17} 的含义与几个等价形式`} collapsed steps={[
        { tex: R`\epsilon_{\rm sr}=-\frac{\dot H}{H^2}=-\frac{H'}{aH^2}`, why: R`$\frac{d}{dt}(1/H)=-\dot H/H^2$，且 $\dot H=H'/a$。这给出 \eqref{7.17} 的第二个等号。` },
        { tex: R`\epsilon_{\rm sr}=-\frac{1}{H}\frac{dH}{dt}\frac{1}{H}=-\frac{d\ln H}{d\ln a}`, why: R`因为 $d\ln a=H\,dt$：$\epsilon_{\rm sr}$ 就是每个 e 倍膨胀中 $H$ 的相对减小量。` },
        { tex: R`\frac{\ddot a}{a}=\dot H+H^2=H^2\left(1-\epsilon_{\rm sr}\right)`, why: R`所以 $\ddot a>0\Leftrightarrow\epsilon_{\rm sr}<1$：这就是"暴胀 $\Leftrightarrow\epsilon_{\rm sr}<1$"这一定义的来源。` },
        { tex: R`\dot H=-4\pi G(\rho+\mathcal P)\ \Rightarrow\ \epsilon_{\rm sr}=\frac32\frac{\rho+\mathcal P}{\rho}=\frac32(1+w)`, why: R`对 Friedmann 方程 $H^2=8\pi G\rho/3$ 求导并用 \eqref{7.12}：$2H\dot H=\frac{8\pi G}{3}\dot\rho=-8\pi GH(\rho+\mathcal P)$。辐射 $w=1/3$ 给出 $\epsilon_{\rm sr}=2$，物质给出 $3/2$。` },
        { tex: R`\epsilon_{\rm sr}=\frac{4\pi G\dot\phi^2}{H^2}=\frac{4\pi}{m_{\rm Pl}^2}\frac{\dot\phi^2}{H^2}`, why: R`对标量场 $\rho+\mathcal P=\dot\phi^2$：$\epsilon_{\rm sr}$ 度量的是场的"速度"（动能）相对于哈勃率有多小。` },
      ]} />
      <Tx>{R`它给出**一个 e 倍膨胀期间哈勃率的相对变化**。由于 $H$ 总在减小，$\epsilon_{\rm sr}$ 总是正的。暴胀期间它通常很小，而在辐射时期它等于 2。事实上，暴胀时期的一种定义就是 $\epsilon_{\rm sr}<1$ 的时期。从技术上讲，$\epsilon_{\rm sr}$ 量化的是时空偏离**精确 de Sitter 空间**——一个只含正宇宙学常数的空宇宙——的程度。

第二个量化场滚得有多慢的变量是`}</Tx>
      <Eq n="7.18" title="第二慢滚参数" say={R`$\delta_{\rm sr}$ 比较场的"加速度"与哈勃摩擦：它小意味着场几乎以终端速度匀速滚动，$\ddot\phi$ 可以忽略。`}>{R`\begin{aligned}\delta_{\rm sr}\equiv\frac1H\frac{\ddot\phi}{\dot\phi}&=-\frac{1}{aH\phi'}\left[aH\phi'-\phi''\right]\\&=-\frac{1}{aH\phi'}\left[3aH\phi'+a^2V_{,\phi}\right].\end{aligned}`}</Eq>
      <Derivation title={R`\eqref{7.18} 的两个等号`} collapsed steps={[
        { tex: R`\frac1H\frac{\ddot\phi}{\dot\phi}=\frac1H\,\frac{(\phi''-aH\phi')/a^2}{\phi'/a}=\frac{\phi''-aH\phi'}{aH\phi'}=-\frac{1}{aH\phi'}\left[aH\phi'-\phi''\right]`, why: R`用上面推 \eqref{7.15} 时得到的 $\dot\phi=\phi'/a$、$\ddot\phi=(\phi''-aH\phi')/a^2$。` },
        { tex: R`\phi''=-2aH\phi'-a^2V_{,\phi}\ \Rightarrow\ aH\phi'-\phi''=3aH\phi'+a^2V_{,\phi}`, why: R`第二行来自运动方程 \eqref{7.15}。` },
      ]} />
      <Tx>{R`第二行由 \eqref{7.15} 得到。文献中慢滚参数通常简单地记作 $\nosym{\epsilon}$、$\nosym{\delta}$；但希腊字母实在不够用，我们加上下标"sr"（slow roll）以免歧义。同样，在大多数暴胀模型中 $\delta_{\rm sr}$ 也很小。后面会看到，为什么慢滚暴胀模型的"版图"恰好由**两个**参数描述：它们刻画了暴胀预言的关键特征——扰动谱对最简单形式（严格尺度不变）的偏离，以及引力波的产生。`}</Tx>
      <Box kind="example" title={R`算例：$V=m^2\phi^2/2$ 的慢滚参数`}>{R`在慢滚近似下（$\dot\phi^2\ll V$，$|\ddot\phi|\ll|3H\dot\phi|$），$H^2\simeq\frac{8\pi V}{3m_{\rm Pl}^2}$，$3H\dot\phi\simeq-V_{,\phi}$。代入上面的 $\epsilon_{\rm sr}=4\pi\dot\phi^2/(m_{\rm Pl}^2H^2)$，并对 $\dot\phi\simeq-V_{,\phi}/(3H)$ 求导，可得
$$\epsilon_{\rm sr}\simeq\frac{m_{\rm Pl}^2}{16\pi}\left(\frac{V_{,\phi}}{V}\right)^2,\qquad\delta_{\rm sr}\simeq\epsilon_{\rm sr}-\frac{m_{\rm Pl}^2}{8\pi}\frac{V_{,\phi\phi}}{V}.$$
对 $V=m^2\phi^2/2$：$\epsilon_{\rm sr}\simeq m_{\rm Pl}^2/(4\pi\phi^2)$，而 $\delta_{\rm sr}\simeq0$（两项恰好相消）。$\epsilon_{\rm sr}=1$ 时暴胀结束，即 $\phi^2\simeq m_{\rm Pl}^2/(4\pi)$。从场值 $\phi$ 到暴胀结束还剩的 e 倍数为 $N=\int H\,dt\simeq\frac{2\pi\phi^2}{m_{\rm Pl}^2}-\frac12$，所以 $\epsilon_{\rm sr}\simeq1/(2N)$。

取 CMB 尺度穿出视界时 $N\approx60$：$\epsilon_{\rm sr}\approx0.008$，由 \eqref{7.110} 得 $n_s=1-4\epsilon_{\rm sr}-2\delta_{\rm sr}\approx0.967$，与观测相符；但张标比 $r=16\epsilon_{\rm sr}\approx0.13$，已被今天 $r\lesssim0.04$ 的上限排除。这正说明了两个慢滚参数为何是检验暴胀的关键。场值 $\phi\approx3\,m_{\rm Pl}$ 远超 Planck 质量，这类模型称为"大场"模型。`}</Box>
      <Tx>{R`**暴胀如何结束：再加热。**慢滚阶段不可能无限持续，因为暴胀总要在某一刻结束。当势变陡、场到达图 7.5 中的势极小值时，这一刻就到了。此时场不再缓慢滚动，而是具有相当大的动能，于是在极小值附近**振荡**。这时物态方程 \eqref{7.10} 不再接近 $-1$，而是接近 **0**（振荡中动能与势能周期平均相等，像非相对论物质），宇宙由此过渡到**减速**膨胀。随后，$\phi$ 最终衰变为更轻的粒子；也许经过一长串衰变之后，结果就是一个几乎完全均匀、由辐射主导的宇宙。

这段从暴胀到减速膨胀的过渡称为**再加热**（reheating），其细节极不确定。幸运的是，它们**不影响**我们关心的扰动：在暴胀结束时，这些扰动都远在视界之外（图 7.2 中深色阴影带下方的 $k\ll aH$ 区域），在整个过渡期间保持**冻结**。`}</Tx>
      <Box kind="note" title="小结与过渡">{R`到此我们有了一个完整的零阶图景：一个标量场在平坦的势上慢滚，$w\simeq-1$，$H\simeq H_{\rm inf}$，$\eta\simeq-1/(aH)$；两个慢滚参数 $\epsilon_{\rm sr}$、$\delta_{\rm sr}$ 刻画它偏离精确 de Sitter 膨胀的程度；场滚到极小值后振荡、衰变，再加热出热大爆炸。下一步是在这个背景上加入**量子涨落**：先从最简单的张量扰动（引力波）开始（\secref{7.3}），再处理标量扰动（\secref{7.4}）。`}</Box>
    </Sec>);
}
