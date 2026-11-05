// §2.3 Evolution of energy —— 式 (2.44)–(2.70)，Box 2.2，图 2.4
// 注：能动张量 T^μ_ν 与温度 T 同字母，公式中用 \sym{ch02-Tmn}{T} 指定前者。
import { Sec, Tx, Eq, FormulaMap, Box, Derivation, Figure, Table, C } from "@kit";
import { FM_2_45, FM_2_52 } from "./_ch02_fmaps.jsx";

import { PhaseCellsRedraw } from "./_redraw_cosmo_basics.jsx";

const R = String.raw;

export function Sec23() {
  return (
    <Sec n="2.3" title="Evolution of energy" zh="能量的演化"
      gist={R`能动张量守恒 $\nabla_\mu \sym{ch02-Tmn}{T}^\mu{}_\nu=0$ 在 FLRW 中化为**连续性方程** $\dot\rho+3H(\rho+\mathcal P)=0$，于是 $\rho_s\propto a^{-3(1+w_s)}$；再用**分布函数**把 $\rho$、$\mathcal P$ 写成动量积分，并证明**熵密度** $s\propto a^{-3}$。`}
      why={R`知道了时空怎样膨胀，还要知道其中的"东西"怎样随之稀释——这决定了宇宙在不同时期由谁主导，也是 §2.4 清点各成分的前提。`}
      gives={["2.45", "2.56", "2.61", "2.62", "2.64", "2.67", "2.70"]}>
      <p className="muted">本节概念：<C id="stress_energy" /> · <C id="eos" /> · <C id="distribution" /> · <C id="entropy_nu" /></p>
      <Tx>{R`**从几何转向内容。**熟悉了膨胀时空之后，我们来描述宇宙的**组分**：物质、辐射以及其他"东西"。本节分两半：前半用**宏观**量（密度、压强）和守恒律得到它们的演化规律；后半深入到**微观**，用分布函数把这些宏观量算出来。

**光滑宇宙只需要两个数。**目前我们只关心光滑的背景宇宙，所以只有平均量有意义。平均的净动量或速度不能存在——否则就有了特殊方向，破坏各向同性。于是对每种成分，剩下的只有平均**能量密度**和**压强**。正如能量和动量合成四动量，能量密度和压强也合成一个相对论性张量——**能量–动量张量**（energy-momentum tensor）。在各向同性的光滑宇宙中它极其简单：`}</Tx>
      <Eq n="2.44" say="光滑宇宙中一种成分的全部信息：时间分量是（负的）能量密度，三个空间对角分量是压强，没有任何动量流。">{R`\sym{ch02-Tmn}{T}^\mu{}_\nu = \begin{pmatrix}-\rho&0&0&0\\0&\mathcal P&0&0\\0&0&\mathcal P&0\\0&0&0&\mathcal P\end{pmatrix}`}</Eq>
      <Tx>{R`其中 $\mathcal P$ 是压强。这个形式**纯粹是 FLRW 对称性的结果**：各向同性要求 $\sym{ch02-Tmn}{T}^0{}_i=0$（没有偏好方向的动量流），空间部分必须正比于 $\delta^i{}_j$。它看起来恰好像静止理想流体的能动张量，但别被误导——宇宙中好几种成分（如自由流动的光子和中微子）其实**并不**像流体。能动张量正是爱因斯坦方程右边的量，所以以后推导它会是我们的例行功课。`}</Tx>

      <Tx>{R`**守恒律该怎么写？**先建立直觉：无引力、速度可忽略的流体服从**连续性方程** $\partial\rho/\partial t=0$ 和**欧拉方程** $\partial\mathcal P/\partial x^i=0$。能否把它们合并成 $\partial \sym{ch02-Tmn}{T}^\mu{}_\nu/\partial x^\mu=0$？差一点——在广义相对论中，张量的普通坐标导数没有意义，因为它依赖于坐标（原因见下方 Box 2.2）。必须换成**协变**导数：`}</Tx>
      <FormulaMap n="2.45" title="能动张量守恒" say="局域能量与动量守恒的广义相对论形式：普通散度之外，还要加上两个由 Christoffel 符号带来的修正项。" tree={FM_2_45} start="gama" />
      <Tx>{R`这就是连续性方程与欧拉方程的广义相对论版本，更一般地说，是**局域能量与动量守恒**。在应用它之前，先用一个方框把"为什么要协变导数"讲清楚（初读可跳过，直接看 \eqref{2.54}）。`}</Tx>

      <Box kind="aside" title="Box 2.2　张量与导数（Tensors and derivatives）">
        <Tx>{R`在弯曲空间中，度规不仅用来算距离，也用来求导。出发点照旧：物理结论应与坐标无关。

**标量。**弯曲空间上的一个函数 $\phi(x)$ 称为**标量**。坐标变换 $x^\mu\to\hat x^\mu$ 下，它几乎平凡地变换：`}</Tx>
        <Eq n="2.46" say="标量在坐标变换下只是换了标签：新坐标下的函数值等于同一物理点在旧坐标下的函数值。">{R`\hat\phi(\hat x) = \phi(x[\hat x]).`}</Eq>
        <Tx>{R`即 $\phi$ 只取决于坐标指向哪个**物理点**。

**矢量。**对坐标求偏导，可以从标量生成一个协变矢量：`}</Tx>
        <Eq n="2.47" say="标量的梯度是一个协变（下指标）矢量，指向标量变化最快的方向。">{R`A_\mu = \frac{\partial}{\partial x^\mu}\phi\,.`}</Eq>
        <Tx>{R`它指向 $\phi$ 变化最快的方向，可以想象成一支箭头。换坐标后，由链式法则（参见 \eqref{2.14}）`}</Tx>
        <Eq n="2.48" say="协变矢量的变换律：新分量 = 变换矩阵乘以旧分量（由链式法则直接得到）。">{R`\hat A_\mu = \frac{\partial}{\partial\hat x^\mu}\hat\phi = \frac{\partial x^\alpha}{\partial\hat x^\mu}\frac{\partial}{\partial x^\alpha}\phi = \frac{\partial x^\alpha}{\partial\hat x^\mu}A_\alpha\,.`}</Eq>
        <Tx>{R`这一变换律适用于**所有**协变矢量，无论它们是否来自标量的梯度。二指标张量（如度规）则每个指标各乘一个变换矩阵：`}</Tx>
        <Eq n="2.49" say="二阶协变张量（如度规）的变换律：每个下指标各配一个变换矩阵。">{R`\hat g_{\mu\nu} = \frac{\partial x^\alpha}{\partial\hat x^\mu}\frac{\partial x^\beta}{\partial\hat x^\nu}g_{\alpha\beta}\,.`}</Eq>
        <Tx>{R`**问题来了。**对矢量求导能得到张量吗，比如 $M_{\mu\nu}=\partial_\mu A_\nu$？**不能**：对 \eqref{2.48} 再求一次导，会多出一项 $\partial^2x^\alpha/\partial\hat x^\mu\partial\hat x^\nu$——正是 §2.1.2 测地线方程里迫使我们引入 Christoffel 符号的那一项。所以解决办法也一样：用 Christoffel 符号把它抵消掉，构造**协变导数** $\nabla_\mu$。可以验证`}</Tx>
        <Eq n="2.50" say="协变矢量的协变导数：普通导数减去 Christoffel 修正项，结果按张量变换。">{R`\nabla_\mu A_\nu \equiv \partial_\mu A_\nu - \Gamma^\alpha{}_{\mu\nu}A_\alpha`}</Eq>
        <Tx>{R`满足正确的张量变换律 \eqref{2.49}（验证时用 \eqref{2.19} 方括号形式的 Christoffel 定义最方便，见下方折叠推导）。对逆变矢量则是（注意符号相反）`}</Tx>
        <Eq n="2.51" say="逆变矢量的协变导数：修正项取加号。">{R`\nabla_\mu A^\nu \equiv \partial_\mu A^\nu + \Gamma^\nu{}_{\mu\alpha}A^\alpha.`}</Eq>
        <Tx>{R`对于张量，规则是**每个指标配一个 Christoffel 项**（上指标取正、下指标取负）。例如`}</Tx>
        <FormulaMap n="2.52" say={R`混合张量的协变导数：下指标贡献一个负的 $\Gamma^\mu{}_{\alpha\beta}$ 项，上指标贡献一个正的 $\Gamma^\mu{}_{\alpha\beta}$ 项。`} tree={FM_2_52} start="gaml" />
        <Tx>{R`一个漂亮的应用：利用 \eqref{2.26}，测地线方程 \eqref{2.20} 可以写成紧凑、明显协变的形式`}</Tx>
        <Eq n="2.53" say="测地线方程的协变形式：四动量沿自身方向的协变导数为零——自由粒子的四动量被“平行移动”。">{R`P^\alpha\nabla_\alpha P^\mu = 0.`}</Eq>
        <Tx>{R`证明：$P^\alpha\nabla_\alpha P^\mu=P^\alpha\partial_\alpha P^\mu+\Gamma^\mu{}_{\alpha\beta}P^\alpha P^\beta$。而 $P^\alpha\partial_\alpha=\frac{dx^\alpha}{d\lambda}\frac{\partial}{\partial x^\alpha}=\frac{d}{d\lambda}$（沿路径的导数），所以第一项就是 $dP^\mu/d\lambda=d^2x^\mu/d\lambda^2$，整个式子正是 \eqref{2.20} 的左边。`}</Tx>
      </Box>
      <Derivation title={R`验证 $\nabla_\mu A_\nu$ 是张量（Box 2.2 中"可以验证"的一步）`} collapsed steps={[
        { tex: R`\hat\partial_\mu\hat A_\nu=\frac{\partial}{\partial\hat x^\mu}\left(\frac{\partial x^\beta}{\partial\hat x^\nu}A_\beta\right)=\frac{\partial x^\alpha}{\partial\hat x^\mu}\frac{\partial x^\beta}{\partial\hat x^\nu}\partial_\alpha A_\beta+\frac{\partial^2x^\beta}{\partial\hat x^\mu\partial\hat x^\nu}A_\beta`, why: R`对 \eqref{2.48} 求导。第一项是张量变换律，第二项是"多余"的非张量项。` },
        { tex: R`\hat\Gamma^\lambda{}_{\mu\nu}=\frac{\partial\hat x^\lambda}{\partial x^\rho}\frac{\partial x^\alpha}{\partial\hat x^\mu}\frac{\partial x^\beta}{\partial\hat x^\nu}\Gamma^\rho{}_{\alpha\beta}+\frac{\partial\hat x^\lambda}{\partial x^\beta}\frac{\partial^2x^\beta}{\partial\hat x^\mu\partial\hat x^\nu}`, why: R`Christoffel 符号的变换律：前一项像张量，后一项正是 \eqref{2.19} 方括号中的非齐次项（在原坐标笛卡尔时即全部）。` },
        { tex: R`\hat\Gamma^\lambda{}_{\mu\nu}\hat A_\lambda=\frac{\partial x^\alpha}{\partial\hat x^\mu}\frac{\partial x^\beta}{\partial\hat x^\nu}\Gamma^\rho{}_{\alpha\beta}A_\rho+\frac{\partial^2x^\beta}{\partial\hat x^\mu\partial\hat x^\nu}A_\beta`, why: R`用 $\hat A_\lambda=\frac{\partial x^\sigma}{\partial\hat x^\lambda}A_\sigma$ 及 $\frac{\partial\hat x^\lambda}{\partial x^\rho}\frac{\partial x^\sigma}{\partial\hat x^\lambda}=\delta^\sigma_\rho$。` },
        { tex: R`\hat\nabla_\mu\hat A_\nu=\hat\partial_\mu\hat A_\nu-\hat\Gamma^\lambda{}_{\mu\nu}\hat A_\lambda=\frac{\partial x^\alpha}{\partial\hat x^\mu}\frac{\partial x^\beta}{\partial\hat x^\nu}\left(\partial_\alpha A_\beta-\Gamma^\rho{}_{\alpha\beta}A_\rho\right)`, why: R`两个非张量项恰好相消。` },
      ]} result={R`$\nabla_\mu A_\nu$ 按 \eqref{2.49} 变换，是一个 (0,2) 型张量。`} />

      <Tx>{R`**把守恒律用在膨胀宇宙上。**\eqref{2.45} 包含四个方程（$\nosym{\nu}=0,1,2,3$）。代入 FLRW 度规和 \eqref{2.44} 形式的能动张量，先看最重要的 $\nosym{\nu}=0$ 分量——能量守恒：`}</Tx>
      <Eq n="2.54" say="守恒律的时间分量（能量方程），尚未代入 FLRW 的具体 Christoffel 符号。">{R`\frac{\partial \sym{ch02-Tmn}{T}^\mu{}_0}{\partial x^\mu} + \Gamma^\mu{}_{\alpha\mu}\sym{ch02-Tmn}{T}^\alpha{}_0 - \Gamma^\alpha{}_{0\mu}\sym{ch02-Tmn}{T}^\mu{}_\alpha = 0\,.`}</Eq>
      <Tx>{R`各向同性使 $\sym{ch02-Tmn}{T}^i{}_0=0$，所以第一项中的 $\nosym{\mu}$ 和第二项中的 $\nosym{\alpha}$ 都只能取 0（$\sym{ch02-Tmn}{T}^0{}_0=-\rho$）：`}</Tx>
      <Eq n="2.55" say="利用各向同性（没有动量流）后，能量方程只剩密度的时间导数和两项 Christoffel 修正。">{R`-\frac{\partial\rho}{\partial t} - \Gamma^\mu{}_{0\mu}\,\rho - \Gamma^\alpha{}_{0\mu}\sym{ch02-Tmn}{T}^\mu{}_\alpha = 0.`}</Eq>
      <Tx>{R`现在用上 §2.1 的成果 \eqref{2.24}–\eqref{2.25}：$\Gamma^\alpha{}_{0\mu}$ 只有 $\nosym{\alpha=\mu}$ 为空间指标时非零，等于 $\dot a/a$。于是 $\Gamma^\mu{}_{0\mu}=3\dot a/a$，$\Gamma^\alpha{}_{0\mu}\sym{ch02-Tmn}{T}^\mu{}_\alpha=\frac{\dot a}{a}\sum_i\sym{ch02-Tmn}{T}^i{}_i=3\frac{\dot a}{a}\mathcal P$。膨胀宇宙中的能量守恒因此是`}</Tx>
      <Eq n="2.56" keyEq title="连续性方程" say={R`膨胀宇宙中的能量守恒：能量密度的下降率等于 $3H$ 乘以 $(\rho+\mathcal P)$——一份来自体积稀释，一份来自压强做功。`}>{R`\frac{\partial\rho}{\partial t} + \frac{\dot a}{a}\left[3\rho + 3\mathcal P\right] = 0.`}</Eq>
      <Tx>{R`稍作整理，得到一个更有物理味道的形式：`}</Tx>
      <Eq n="2.57" say={R`共动体积内能量（$\rho a^3$）的变化率，等于压强对膨胀所做的功（负号）。`}>{R`a^{-3}\frac{\partial[\rho a^3]}{\partial t} = -3\frac{\dot a}{a}\mathcal P.`}</Eq>
      <Box kind="physics" title="连续性方程 = 绝热膨胀的热力学第一定律">{R`把 \eqref{2.57} 乘以 $a^3$：$d(\rho a^3)=-\mathcal P\,d(a^3)$。取一个共动体积 $V\propto a^3$，$E=\rho V$ 为其中的能量，这正是 $dE=-\mathcal P\,dV$——均匀宇宙中没有热流（各处相同，无处可流），每个共动体积都在做**绝热膨胀**，对"外界"（相邻体积）做功 $\mathcal P\,dV$。`}</Box>

      <Tx>{R`**解读：物质与辐射。**这个守恒律立刻告诉我们物质和辐射怎样随膨胀稀释。

**物质。**非相对论性物质的压强实际上为零（$c=1$ 时我们其实是在比较 $\mathcal P$ 与 $\rho c^2$），所以`}</Tx>
      <Eq n="2.58" say="无压物质：共动体积内的能量不变，所以能量密度按体积 $a^{-3}$ 稀释。">{R`\frac{\partial[\rho_{\rm m}a^3]}{\partial t} = 0,`}</Eq>
      <Tx>{R`即 $\rho_{\rm m}\propto a^{-3}$。第 1 章已经用简单的想法预料到了：粒子质量不变，数密度反比于体积。

**辐射。**辐射有 $\mathcal P_{\rm r}=\rho_{\rm r}/3$（\exref{2.9}），代入 \eqref{2.56}：`}</Tx>
      <Eq n="2.59" say="辐射：压强做功使共动能量额外下降，能量密度按 $a^{-4}$ 稀释。">{R`\begin{aligned}\frac{\partial\rho_{\rm r}}{\partial t} + \frac{\dot a}{a}4\rho_{\rm r} &= a^{-4}\frac{\partial[\rho_{\rm r}a^4]}{\partial t}\\ &= 0.\end{aligned}`}</Eq>
      <Tx>{R`所以 $\rho_{\rm r}\propto a^{-4}$：数密度随体积稀释贡献 $a^{-3}$，每个粒子的能量随膨胀红移再贡献 $a^{-1}$（\eqref{2.31}）。两种完全不同的论证——守恒律与测地线——给出了一致的结果。

**推广：物态方程参数。**把两种情形统一起来，并推广到任意成分。定义**物态方程参数**（equation of state parameter）`}</Tx>
      <Eq n="2.60" say="物态方程参数：压强与能量密度之比，一个数刻画一种成分的“软硬”。">{R`w_s \equiv \frac{\mathcal P_s}{\rho_s},`}</Eq>
      <Tx>{R`其中下标 $\nosym{s}$ 代表任意成分：物质 $w=0$，辐射 $w=1/3$，后面会看到宇宙学常数 $w=-1$。$w$ 一般可以随时间变化。对任意 $w_s(a)$，积分 \eqref{2.56} 得`}</Tx>
      <Eq n="2.61" keyEq title="能量密度随 a 的演化" say="知道物态方程 w 就知道一种成分如何随膨胀稀释；w 为常数时就是 a 的 −3(1+w) 次幂。">{R`\rho_s(a) \propto \exp\left\{-3\int^a\frac{da'}{a'}\left[1+w_s(a')\right]\right\} \ \overset{w_s=\text{const}}{\propto}\ a^{-3(1+w_s)}.`}</Eq>
      <Tx>{R`第二个正比关系在 $w_s$ 为常数时成立。积分过程如下。`}</Tx>
      <Derivation title={R`由 (2.56) 积分得到 (2.61)`} steps={[
        { tex: R`\frac{d\rho_s}{dt}=-3\frac{\dot a}{a}(1+w_s)\rho_s`, why: R`在 \eqref{2.56} 中代入 $\mathcal P_s=w_s\rho_s$（对单一成分，若各成分之间无能量交换，每种成分各自守恒）。` },
        { tex: R`\frac{d\ln\rho_s}{d\ln a}=-3\left[1+w_s(a)\right]`, why: R`两边除以 $\rho_s\,\dot a/a=\rho_s\,d\ln a/dt$，把时间导数换成对 $\ln a$ 的导数。` },
        { tex: R`\ln\rho_s(a)=\text{const}-3\int^a\frac{da'}{a'}\left[1+w_s(a')\right]`, why: R`积分。` },
        { tex: R`w_s=\text{const}:\quad \rho_s\propto\exp\left[-3(1+w_s)\ln a\right]=a^{-3(1+w_s)}`, why: R`物质 $a^{-3}$，辐射 $a^{-4}$，宇宙学常数 $a^0$（常数）。` },
      ]} />
      <Table head={[R`成分`, R`$w$`, R`$\rho\propto$`, R`主导时 $a(t)\propto$（欧氏，第 3 章）`]} rows={[
        [R`非相对论物质（重子、冷暗物质）`, R`$0$`, R`$a^{-3}$`, R`$t^{2/3}$`],
        [R`辐射（光子、无质量中微子）`, R`$1/3$`, R`$a^{-4}$`, R`$t^{1/2}$`],
        [R`宇宙学常数 $\Lambda$`, R`$-1$`, R`$a^0$`, R`$e^{Ht}$`],
        [R`曲率（等效）`, R`$-1/3$`, R`$a^{-2}$`, R`$t$`],
        [R`一般常数 $w>-1$`, R`$w$`, R`$a^{-3(1+w)}$`, R`$t^{2/[3(1+w)]}$`],
      ]} caption={R`常见成分的物态方程与标度行为。曲率项一行来自 Friedmann 方程 (1.3) 中的 $1/a^2$ 项，并非真实物质。`} />
      <Tx>{R`顺带交代 \eqref{2.45} 的空间分量（$\nosym{\nu}=i$）：在光滑背景中它**平凡地为零**。度规空间部分各向同性（各方向等同膨胀），光滑宇宙中物质又没有本动——速度为零，欧拉方程自然是空话。一旦允许结构出现，情况就会改变（第 5 章）。`}</Tx>

      <Tx>{R`**后半：从微观算出 $\rho$ 和 $\mathcal P$。**到此为止我们用的是平均密度和压强这类**宏观**量。从微观看，任一点附近的体积里，物质和辐射是大量（相互作用或不相互作用的）粒子，可以用**分布函数**（distribution function）统计地描述。我们现在要做的，是把 $\rho$、$\mathcal P$ 写成分布函数的积分——这样，一旦知道粒子处于什么分布（例如热平衡），就能直接算出它们。

**分布函数的含义。**在以 $\boldsymbol x$ 为中心、时刻 $t$ 的体积元 $d^3x$ 中，$f_s(\boldsymbol x,\boldsymbol p,t)$ 计数粒子 $\nosym{s}$ 落在动量体元 $d^3p$ 中的数目（$p$ 是 \eqref{2.32} 的**物理动量**，不是 \eqref{2.26} 的 $P$）。总能量密度就是把每个相空间单元中的能量按粒子数加权求和：$\sum f_s(\boldsymbol x,\boldsymbol p,t)E_s(p)$，其中 $E_s(p)=\sqrt{p^2+m_s^2}$。

**相空间单元有多大？**半经典态计数中，每个内部态占据的相空间体积按 $(2\pi\hbar)^3$ 计数；这是量子态密度的归一化约定，不能直接等同于位置和动量标准差的不确定度下界。所以 $d^3x\,d^3p$ 中的单元数是 $d^3x\,d^3p/(2\pi\hbar)^3$（\figref{2.4}）。除以体积 $d^3x$，得到粒子 $\nosym{s}$ 的能量密度：`}</Tx>
      <Eq n="2.62" keyEq title="能量密度 = 分布函数的能量矩" say="能量密度 = 每个动量态的占据数乘以该态的能量，对所有动量态求和（再乘以内部自由度数）。">{R`\rho_s(\boldsymbol x,t) = g_s\int\frac{d^3p}{(2\pi)^3}f_s(\boldsymbol x,\boldsymbol p,t)E_s(p)`}</Eq>
      <Figure n="2.4" caption={R`自绘交互：一维相空间的半经典态计数网格。单元面积为 $h=2\pi\hbar$；改变宽高比不改变面积。该计数约定须与标准差不确定度下界 $\sigma_x\sigma_p\geq\hbar/2$ 区分。`} illustration={<PhaseCellsRedraw />} />
      <Tx>{R`其中 $g_s$ 是**简并度**（例如光子有两个自旋态，$g_s=2$），并且已回到 $\hbar=1$。

**压强的微观来源。**宏观压强是粒子与一面假想墙做弹性碰撞时、单位面积受到的力。先看简单情形：体积 $V$ 中 $N$ 个非相对论性粒子，$x$ 方向的压强为`}</Tx>
      <Eq n="2.63" say="理想气体的压强：粒子数密度、质量与速度平方之积，各向同性时取三分之一——即单位体积动能的 2/3。">{R`\mathcal P = \frac{N}{V}mv_x^2 = \frac13\frac{N}{V}m|\boldsymbol v|^2,`}</Eq>
      <Tx>{R`$v_x$ 是 $x$ 方向的方均根速度；第二个等号用了速度弥散各向同性。所以压强等于单位体积动能的 $2/3$。把 $m|\boldsymbol v|^2$ 推广为 $p^2/E_s(p)$（对相对论粒子同样成立，因为 $\boldsymbol v=\boldsymbol p/E$，$\boldsymbol p\cdot\boldsymbol v=p^2/E$），得到压强的相空间积分：`}</Tx>
      <Eq n="2.64" say={R`压强 = 每个动量态的占据数乘以 $p^2/(3E)$，对所有动量态求和；相对论粒子 $p^2/3E\to E/3$，非相对论粒子 $\to0$。`}>{R`\mathcal P_s(\boldsymbol x,t) = g_s\int\frac{d^3p}{(2\pi)^3}f_s(\boldsymbol x,\boldsymbol p,t)\frac{p^2}{3E_s(p)}.`}</Eq>
      <Box kind="note" title={R`由 (2.64) 立刻读出 $w$ 的取值范围`}>{R`由于 $p^2/(3E)=\frac{E}{3}\frac{p^2}{p^2+m^2}$ 介于 0 与 $E/3$ 之间，任何由（正的）分布函数描述的粒子气体都满足 $0\le\mathcal P\le\rho/3$，即 $0\le w\le1/3$：极端相对论时 $w\to1/3$，非相对论时 $\mathcal P/\rho\sim\langle v^2\rangle/3\to0$。**负压**（$w<0$）的暗能量因此不可能是一团普通粒子气体——它必须是场的势能、真空能或者修改引力的效应。`}</Box>

      <Tx>{R`**热平衡分布。**早期宇宙的大部分时间里，反应速率足够快，粒子保持平衡，不同种类共享同一温度。这时分布函数有确定的形式，我们可以把 $\rho$、$\mathcal P$ 直接写成温度的函数。温度 $T$ 下的平衡**玻色子**（如光子）服从玻色–爱因斯坦分布 $f_s(\boldsymbol x,\boldsymbol p,t)=f_{\rm BE}(E_s(p))$：`}</Tx>
      <Eq n="2.65" say="平衡玻色子的占据数：能量越高于化学势，占据越少；分母中的 −1 允许大量玻色子挤在同一低能态。">{R`f_{\rm BE}(E) = \frac{1}{e^{(E-\mu)/T}-1},`}</Eq>
      <Tx>{R`平衡**费米子**（如电子）服从费米–狄拉克分布：`}</Tx>
      <Eq n="2.66" say="平衡费米子的占据数：分母中的 +1 体现泡利不相容，每个态至多占据一个粒子。">{R`f_{\rm FD}(E) = \frac{1}{e^{(E-\mu)/T}+1},`}</Eq>
      <Tx>{R`$\mu$ 是**化学势**（chemical potential）。注意平衡分布既不依赖位置 $\boldsymbol x$，也不依赖动量方向 $\hat{\boldsymbol p}$，只通过 $E_s(p)$ 依赖动量大小。

对光子和中微子，化学势远小于温度：光子数不守恒（例如早期宇宙中非常有效的双康普顿散射可以产生和湮灭光子）；中微子与反中微子之间很可能只有极小的不对称。于是分布函数只依赖 $E/T$，压强满足一个很有用的关系（\exref{2.9}）：`}</Tx>
      <Eq n="2.67" say="化学势可忽略时，压强对温度的导数等于（能量密度 + 压强）/温度——这正是热力学中熵密度的表达式。">{R`\frac{\partial\mathcal P_s}{\partial T} = \frac{\rho_s+\mathcal P_s}{T}.`}</Eq>
      <Derivation title={R`证明 (2.67)（即习题 2.9(b)）`} collapsed steps={[
        { tex: R`\frac{\partial\mathcal P}{\partial T}=\sym{ch02-gdeg}{g}\int\frac{d^3p}{(2\pi)^3}\frac{p^2}{3E}\frac{\partial f}{\partial T},\qquad \frac{\partial f(E/T)}{\partial T}=-\frac{E}{T}\frac{df}{dE}`, why: R`$f$ 只依赖于 $E/T$。` },
        { tex: R`\frac{df}{dE}=\frac{E}{p}\frac{df}{dp}\ \Rightarrow\ \frac{\partial\mathcal P}{\partial T}=-\frac{\sym{ch02-gdeg}{g}}{2\pi^2T}\int_0^\infty dp\,\frac{p^3E}{3}\frac{df}{dp}`, why: R`$dE/dp=p/E$；角度积分给出 $4\pi/(2\pi)^3=1/(2\pi^2)$。` },
        { tex: R`=\frac{\sym{ch02-gdeg}{g}}{2\pi^2T}\int_0^\infty dp\,f\,\frac{d}{dp}\left(\frac{p^3E}{3}\right)=\frac{\sym{ch02-gdeg}{g}}{2\pi^2T}\int_0^\infty dp\,f\left(p^2E+\frac{p^4}{3E}\right)`, why: R`分部积分；边界项在 $p=0$ 与 $p\to\infty$ 处为零。$\frac{d}{dp}(p^3E)=3p^2E+p^4/E$。` },
        { tex: R`=\frac{1}{T}\left[\sym{ch02-gdeg}{g}\int\frac{d^3p}{(2\pi)^3}fE+\sym{ch02-gdeg}{g}\int\frac{d^3p}{(2\pi)^3}f\frac{p^2}{3E}\right]=\frac{\rho+\mathcal P}{T}`, why: R`两项分别是 \eqref{2.62} 与 \eqref{2.64}。注意此式对任意质量都成立，只要求 $\mu=0$。` },
      ]} />

      <Tx>{R`**熵守恒。**\eqref{2.67} 有一个重要推论：宇宙的**熵密度按 $a^{-3}$ 标度**。为看清这一点，把连续性方程 \eqref{2.57} 改写为`}</Tx>
      <Eq n="2.68" say={R`连续性方程的等价改写：把压强项拆成“$(\rho+\mathcal P)a^3$ 的变化”与“压强的变化”两部分。`}>{R`a^{-3}\frac{\partial\left[(\rho+\mathcal P)a^3\right]}{\partial t} - \frac{\partial\mathcal P}{\partial t} = 0.`}</Eq>
      <Tx>{R`在背景宇宙中，压强的时间导数可以通过温度写成 $(dT/dt)(\partial\mathcal P/\partial T)$——对多种成分同样成立。用 \eqref{2.67}：`}</Tx>
      <Eq n="2.69" say={R`代入 $\partial\mathcal P/\partial T=(\rho+\mathcal P)/T$ 后，连续性方程变成“$(\rho+\mathcal P)a^3/T$ 不随时间变化”。`}>{R`\begin{aligned}a^{-3}\frac{\partial[(\rho+\mathcal P)a^3]}{\partial t} - \frac{dT}{dt}\frac{\rho+\mathcal P}{T} &= a^{-3}T\frac{\partial}{\partial t}\left[\frac{(\rho+\mathcal P)a^3}{T}\right]\\ &= 0.\end{aligned}`}</Eq>
      <Tx>{R`（第一个等号：$a^{-3}T\,\partial_t[X/T]=a^{-3}\partial_tX-a^{-3}X\,\dot T/T$，其中 $X=(\rho+\mathcal P)a^3$。）所以**熵密度**`}</Tx>
      <Eq n="2.70" keyEq title="熵密度" say="熵密度 =（能量密度 + 压强）/温度；它按 $a^{-3}$ 稀释，即每个共动体积中的熵守恒。">{R`s \equiv \frac{\rho+\mathcal P}{T}`}</Eq>
      <Tx>{R`按 $a^{-3}$ 标度。几点说明：严格说熵密度还有一项正比于化学势，但它在宇宙学中通常无关紧要；即使化学势不为零，熵密度仍按 $a^{-3}$ 标度。这一标度律对处于平衡（同温）的所有粒子的**总**熵成立，一般对各个单独成分也成立；甚至两种成分温度不同时，它们熵密度之和仍按 $a^{-3}$ 标度。§2.4.4 计算中微子温度时，用的正是最后这一点。`}</Tx>
      <Box kind="physics" title="熵守恒的物理含义">{R`$s\,a^3=$ 常数说明每个共动体积中的熵守恒——均匀宇宙的膨胀是**可逆绝热**过程。对无质量粒子，$s=\frac43\rho/T\propto T^3$，所以 $s\propto a^{-3}$ 等价于 $T\propto1/a$。但当某种粒子（如 $e^\pm$）变成非相对论并湮灭时，它的熵被转移给仍处于平衡的其他粒子，使后者的 $T$ 暂时下降得比 $1/a$ 慢——这正是 §2.4.4 中光子比中微子"更热"的原因。`}</Box>
      <Tx>{R`**本节小结。**宏观：$\nabla_\mu \sym{ch02-Tmn}{T}^\mu{}_\nu=0$ → 连续性方程 → $\rho_s\propto a^{-3(1+w_s)}$。微观：分布函数 → $\rho$、$\mathcal P$ 的积分 → 平衡时 $\partial_T\mathcal P=(\rho+\mathcal P)/T$ → $s\propto a^{-3}$。手里有了"每种成分有多少"（积分）与"如何演化"（守恒律），下一节就可以给宇宙做清点了。`}</Tx>
    </Sec>);
}
