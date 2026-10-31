// §C 粒子的量子描述：波包 —— 式 (C-1)–(C-32)，图 3–6
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { Fig } from "./_ch01_figs.jsx";
import { PacketBuilder, IntegrandDemo, CrestDemo, GaussPacketDemo } from "./_ch01_plots.jsx";

const R = String.raw;

export function SecC() {
  return (
    <Sec n="C" title="Quantum description of a particle. Wave packets" zh="粒子的量子描述：波包"
      gist={R`自由粒子的平面波解不可归一化；物理态是平面波的叠加——波包，$\psi(x,0)$ 与 $g(k)$ 互为 Fourier 变换。稳相论证给出波包中心与宽度 $\Delta x\,\Delta k\gtrsim1$，乘以 $\hbar$ 即 Heisenberg 关系；波包中心以群速度 $\hbar k_0/m$ 运动。`}
      why={R`§B 引入的概念还很抽象。在最简单的自由粒子上动手算一算，可以看清：量子描述怎样既包含"不确定性"，又在适当极限下回到经典的粒子运动。`}
      gives={["C-3", "C-7", "C-9", "C-16", "C-18", "C-23", "C-31", "C-32"]}>
      <p className="muted">本节概念：<C id="wavepacket" /> · <C id="heisenberg" /> · <C id="groupvel" /></p>
      <Tx>{R`§B 的规则写起来抽象，这一节拿最简单的系统——不受力的粒子——把它们算一遍。会得到三件事：一个"像粒子"的波长什么样；为什么位置和动量不能同时尖锐；以及这样的波包为什么会像经典粒子那样以 $p/m$ 运动。`}</Tx>

      <Sub n="C-1" title="Free particle" zh="自由粒子">
        <Tx>{R`**设定。**势能为零（为常数也一样，只差一个可以吸收掉的相位），Schrödinger 方程 \eqref{B-8} 只剩下`}</Tx>
        <Eq n="C-1" say="自由粒子的 Schrödinger 方程：没有势能项，只剩时间导数与拉普拉斯算符的平衡。">{R`i\hbar\frac{\partial}{\partial t}\psi(\mathbf r,t)=-\frac{\hbar^2}{2m}\,\sym{lap}{\Delta}\psi(\mathbf r,t)`}</Eq>
        <Tx>{R`**最简单的猜测：单色平面波。**方程有常系数，试一试指数函数`}</Tx>
        <Eq n="C-2" say="单色平面波：振幅处处相同，相位随位置与时间线性变化。">{R`\psi(\mathbf r,t)=A\,\mathrm e^{i(\mathbf k\cdot\mathbf r-\omega t)}`}</Eq>
        <Tx>{R`代进去：时间导数拉下 $-i\omega$，拉普拉斯算符拉下 $-\mathbf k^2$，两边相等要求`}</Tx>
        <Eq n="C-3" keyEq title="自由粒子的色散关系" say="自由物质波的角频率与波数的平方成正比——这与真空中的光（$\omega$ 与 $k$ 成正比）不同，意味着物质波是“色散”的。">{R`\omega=\frac{\hbar\mathbf k^2}{2m}`}</Eq>
        <Tx>{R`这条"色散关系"如果两边乘以 $\hbar$ 并用 de Broglie 关系 \eqref{B-2} 翻译回粒子语言，就是我们熟悉的自由粒子动能：`}</Tx>
        <Eq n="C-4" say="把色散关系两边乘以 ħ，就是经典的“动能 = 动量平方除以两倍质量”。">{R`E=\frac{\mathbf p^2}{2m}`}</Eq>
        <Tx>{R`方程没有告诉我们任何新物理，这是好消息——它说明 \eqref{B-8} 与经典力学在最基本的地方是相容的。

**平面波的毛病。**看它的概率密度：`}</Tx>
        <Eq n="C-5" say="平面波的模方处处相等：粒子在空间任何地方出现的概率都一样。">{R`|\psi(\mathbf r,t)|^2=|A|^2`}</Eq>
        <Tx>{R`处处相同。粒子"在宇宙中任何地方的可能性都一样"——这当然不能代表一个真实的、在实验室里被制备出来的粒子；更糟的是 $\int|A|^2\mathrm d^3r$ 发散，违反了 \eqref{B-10}。正如严格单色的平面光波在实验中也造不出来，平面波只能作为理想化的"砖块"。

**用砖块砌出可归一化的态。**方程是线性的，满足 \eqref{C-3} 的平面波怎样叠加都还是解，取一个连续的权重 $g(\mathbf k)$：`}</Tx>
        <Eq n="C-6" say="三维波包：把所有波矢的平面波按权重 $g(\mathbf k)$ 加起来，每个分量以自己的角频率 $\omega(k)$ 振荡。">{R`\psi(\mathbf r,t)=\frac{1}{(2\pi)^{3/2}}\int g(\mathbf k)\,\mathrm e^{i[\mathbf k\cdot\mathbf r-\omega(k)t]}\,\mathrm d^3k`}</Eq>
        <Tx>{R`这就是三维**波包**。只要 $g(\mathbf k)$ 足够规矩（能在积分号下求导），它就是解；反过来，可以证明任何平方可积的解都能写成这种形式，所以波包不是特例而是**通解**。

下面为了画图和计算方便，只看沿 $Ox$ 传播的一维波包（二维、三维的情形见补充材料 E_I、F_I）：`}</Tx>
        <Eq n="C-7" keyEq title="一维波包" say="一维波包：沿 x 方向传播的平面波按复振幅 $g(k)$ 的连续叠加，每个分量以自由粒子的色散关系 $\omega(k)$ 随时间演化。">{R`\psi(x,t)=\frac{1}{\sqrt{2\pi}}\int_{-\infty}^{+\infty}g(k)\,\mathrm e^{i[kx-\omega(k)t]}\,\mathrm dk`}</Eq>
        <Tx>{R`**把时间冻结在一个瞬间。**先不管演化，只问"此刻波包长什么样"。取这一刻为 $t=0$：`}</Tx>
        <Eq n="C-8" say="时间原点处的波包：就是平面波 $\mathrm e^{ikx}$ 以 $g(k)$ 为权重的叠加。">{R`\psi(x,0)=\frac{1}{\sqrt{2\pi}}\int g(k)\,\mathrm e^{ikx}\,\mathrm dk`}</Eq>
        <Tx>{R`熟悉 Fourier 分析的读者立刻认出：这是 Fourier 反变换，$g(k)$ 只不过是 $\psi(x,0)$ 的 Fourier 变换（附录 I）：`}</Tx>
        <Eq n="C-9" keyEq title={R`$g(k)$ 是 $\psi(x,0)$ 的 Fourier 变换`} say="反过来，任何时刻的波函数都可以分解成平面波：权重 $g(k)$ 就是它的 Fourier 变换。">{R`g(k)=\frac{1}{\sqrt{2\pi}}\int\psi(x,0)\,\mathrm e^{-ikx}\,\mathrm dx`}</Eq>
        <Tx>{R`这里有一个容易忽略但很重要的逻辑点：\eqref{C-8}–\eqref{C-9} 只是数学恒等式，与粒子是否自由**无关**——任何势中、任何时刻的波函数都可以这样分解。所以 §C-2、§C-3 的结论普遍成立，"自由"二字要到 §C-4 讨论时间演化时才真正用上。`}</Tx>
      </Sub>

      <Sub n="C-2" title="Form of the wave packet at a given time" zh="某一时刻波包的形状">
        <Tx>{R`**问题。**给定一个在 $k_0$ 附近有尖峰、宽度约为 $\Delta k$（半高全宽）的 $|g(k)|$（下面交互图的上半部分），对应的 $\psi(x,0)$ 集中在哪里、有多宽？答案只有一个关键词：**干涉**。各个平面波在哪里同相，哪里就有波包。

**热身：只用三个平面波。**连续积分不好想象，先把 $g(k)$ 换成三根"谱线"：$k_0$ 处振幅 1，$k_0\pm\Delta k/2$ 处各 $1/2$。把两根边线配成余弦：`}</Tx>
        <Eq n="C-10" say="三个平面波之和等于中心波数的载波乘以一个缓变包络 $1+\cos(\Delta k\,x/2)$：两侧两个波的和恰好组成一个余弦调制。">{R`\begin{aligned}\psi(x)&=\frac{g(k_0)}{\sqrt{2\pi}}\left[\mathrm e^{ik_0x}+\frac12\,\mathrm e^{i\left(k_0-\frac{\Delta k}{2}\right)x}+\frac12\,\mathrm e^{i\left(k_0+\frac{\Delta k}{2}\right)x}\right]\\ &=\frac{g(k_0)}{\sqrt{2\pi}}\,\mathrm e^{ik_0x}\left[1+\cos\left(\frac{\Delta k}{2}x\right)\right]\end{aligned}`}</Eq>
        <Tx>{R`结果一目了然：一列波长为 $2\pi/k_0$ 的快速载波，外面套着一个缓慢起伏的包络 $1+\cos(\Delta k\,x/2)$。在 $x=0$ 三列波同相，包络取最大值 2；往两边走，边线与中心线的相位差 $\Delta k\,x/2$ 逐渐累积，达到 $\pi$ 时包络降为零。设两个零点 $x=\pm\Delta x/2$，则 $\frac{\Delta k}{2}\cdot\frac{\Delta x}{2}=\pi$，即`}</Tx>
        <Eq n="C-11" say="三波模型中，包络两个零点之间的距离与波数展宽的乘积恰为 $4\pi$：波数分布越窄，空间上的包络就越宽。">{R`\Delta x\;\Delta k=4\pi`}</Eq>
        <Tx>{R`这已经包含了本节的全部要点：谱线靠得越近（$\Delta k$ 越小），失相得越慢，包络就越宽。在下面的交互图里拖动 $\Delta k$ 看看。`}</Tx>
        <Fig n="3–4" caption={R`交互版（自绘）：用平面波搭建波包。上：$|g(k)|$（三波模型中为三根"谱线"，振幅 $1,\frac12,\frac12$）；下：$\mathrm{Re}\,\psi(x,0)$（蓝）、$|\psi(x,0)|$（黑）。"三个平面波"模式即原书图 4：灰线为三个分量的实部（上移显示），金色虚线为 \eqref{C-10} 的包络 $\frac12[1+\cos(\Delta k\,x/2)]$，竖线标出零点 $\pm\Delta x/2$。切换到"M 个等距平面波"可看到有限叠加的周期重复；"连续叠加"模式下可移动中心 $x_0$、加入二次相位，并读出数值测得的 $\Delta x\,\Delta k$。纵轴已按 $x_0$ 处的 $|\psi|$ 归一。`}><PacketBuilder /></Fig>
        <Tx>{R`三波模型有一个"副作用"：包络是周期的，每隔 $4\pi/\Delta k$ 三列波又会重新同相。这是任何**有限个**等距平面波之和的通病（切换到交互图的"M 个等距平面波"，重复峰随波数增多而被推远）；真正的连续叠加 \eqref{C-8} 没有这种重复，只剩一个峰。

**一般情形：哪里同相？**现在回到连续的 $g(k)$。它一般是复数，把模和相位分开写：`}</Tx>
        <Eq n="C-12" say="把 Fourier 振幅写成模与相位：模 $|g(k)|$ 决定各平面波的“分量”，相位 $\alpha(k)$ 决定它们在哪里同相。">{R`g(k)=|g(k)|\,\mathrm e^{i\alpha(k)}`}</Eq>
        <Tx>{R`$|g|$ 告诉我们每个分量"有多少"，$\alpha(k)$ 则决定它们在 $x$ 轴上的相对位置。只有 $|g|$ 不小的那一段 $k$（宽 $\Delta k$）才要紧；假定 $\alpha$ 在这一段里变化平缓，就可以只保留它的线性部分：`}</Tx>
        <Eq n="C-13" say="在峰附近把相位线性化：$\alpha(k)$ 近似为常数加上斜率乘以 $(k-k_0)$。">{R`\alpha(k)\simeq\alpha(k_0)+(k-k_0)\left[\frac{\mathrm d\alpha}{\mathrm dk}\right]_{k=k_0}`}</Eq>
        <Tx>{R`把这条直线代回 \eqref{C-8}，与 $k$ 无关的相位提到积分号外（细节在推导框里），波包变成"载波乘以一个只含 $|g|$ 的积分"：`}</Tx>
        <Eq n="C-14" say="波包等于中心载波 $\mathrm e^{i k_0x}$ 乘以一个积分；积分里只剩 $|g(k)|$ 乘以一个随 $(k-k_0)(x-x_0)$ 转动的相因子。">{R`\psi(x,0)\simeq\frac{\mathrm e^{i[k_0x+\alpha(k_0)]}}{\sqrt{2\pi}}\int_{-\infty}^{+\infty}|g(k)|\,\mathrm e^{i(k-k_0)(x-x_0)}\,\mathrm dk`}</Eq>
        <Tx>{R`其中出现的长度是相位直线的斜率（取负号）：`}</Tx>
        <Eq n="C-15" say="波包中心由相位对波数的斜率决定（取负号）。">{R`x_0=-\left[\frac{\mathrm d\alpha}{\mathrm dk}\right]_{k=k_0}`}</Eq>
        <Derivation title="从 (C-8) 到 (C-14)：逐步代入" collapsed steps={[
{ tex: R`g(k)\,\mathrm e^{ikx}=|g(k)|\,\mathrm e^{i[kx+\alpha(k)]}`, why: R`用 \eqref{C-12}。` },
{ tex: R`kx+\alpha(k)\simeq kx+\alpha(k_0)-(k-k_0)x_0`, why: R`用 \eqref{C-13} 与 \eqref{C-15} 的记号 $x_0=-[\mathrm d\alpha/\mathrm dk]_{k_0}$。` },
{ tex: R`=\big[k_0x+\alpha(k_0)\big]+(k-k_0)(x-x_0)`, why: R`把 $kx$ 写成 $k_0x+(k-k_0)x$ 并合并。第一项与 $k$ 无关，可提出积分号。` },
]} result={R`即 \eqref{C-14}：积分中只剩 $|g(k)|\,\mathrm e^{i(k-k_0)(x-x_0)}$。`} />
        <Tx>{R`**读积分。**\eqref{C-14} 的积分里，$|g(k)|$ 是一个正的小山包，乘上一个以 $(x-x_0)$ 为"转速"的相因子。

◆ $x$ 靠近 $x_0$：在 $\Delta k$ 那么宽的范围内相因子几乎不转，整座小山的面积都贡献进来，积分大。

◆ $x$ 远离 $x_0$：相因子在山包范围内转了许多圈，正负贡献彼此抵消，积分几乎为零。

拖动下面图 5 的滑块就能看到这种从"不振荡"到"剧烈振荡"的过渡。`}</Tx>
        <Fig n="5" caption={R`交互版（自绘）：求 $\psi(x,0)$ 时对 $k$ 积分的被积函数 $\mathrm{Re}\{|g(k)|\mathrm e^{i(k-k_0)(x-x_0)}\}$。$|x-x_0|<1/\Delta k$ 时几乎不振荡，积分大；$|x-x_0|>1/\Delta k$ 时振荡数次，积分很小。因此波包中心（$|\psi(x,0)|$ 的极大）在 $x=x_0$。`}><IntegrandDemo /></Fig>
        <Tx>{R`于是波包的峰就在 $x_0$：`}</Tx>
        <Eq n="C-16" keyEq title="波包中心：稳相条件" say="波包的中心在使各分量相位对 k 的导数为零的地方：振幅最大的那些波在这里同相叠加。">{R`x_M(0)=x_0=-\left[\frac{\mathrm d\alpha}{\mathrm dk}\right]_{k=k_0}`}</Eq>
        <Tx>{R`**一句话的记法：稳相条件。**同样的结论可以不经计算地写出来。积分最大，要求振幅最大的那些分量（$k\approx k_0$）同相叠加，也就是第 $k$ 个分量的总相位 $kx+\alpha(k)$ 在 $k_0$ 附近**对 $k$ 不变**：$\frac{\mathrm d}{\mathrm dk}[kx+\alpha(k)]_{k_0}=0$，解出来就是 \eqref{C-16}。这个"相位对积分变量取驻点"的技巧下一小节和 §C-4 还会再用。

**宽度。**相因子 $\mathrm e^{i(k-k_0)(x-x_0)}$ 在山包宽度内转满大约一圈时，抵消就开始明显，这发生在`}</Tx>
        <Eq n="C-17" say="当被积函数在整个波数区间内大约转过一圈相位时，波包振幅就明显下降了：这给出波包半宽的量级 $1/\Delta k$。">{R`\Delta k\cdot(x-x_0)\simeq1`}</Eq>
        <Tx>{R`把 $|x-x_0|$ 的这个量级当作波包的半宽，就得到互为 Fourier 变换的两个函数之间普遍的宽度关系：`}</Tx>
        <Eq n="C-18" keyEq title="Fourier 宽度关系" say="空间宽度与波数宽度的乘积不可能小于 1 的量级：这是任何一对 Fourier 变换的共同性质，与量子力学无关。">{R`\Delta k\cdot\Delta x\gtrsim1`}</Eq>
        <Tx>{R`下界具体是几，取决于"宽度"怎么定义：三波模型里零点间距之积是 $4\pi$，交互图中高斯 $|g|$ 的半高全宽之积是 $8\ln2\approx5.55$，均方根宽度之积是 $1/2$。要紧的不是常数，而是**存在一个下界**。

所以 \eqref{C-7} 描述的是这样一个粒子：$t=0$ 时它几乎只可能出现在 $x_0$ 附近宽约 $\Delta x$ 的区间内。`}</Tx>
        <Box kind="warning" title={R`$\gtrsim$ 不是 $\approx$`}>{R`\eqref{C-17} 容易给人一种印象：$\Delta x\,\Delta k$ 总在 1 附近。其实它只是**下限**。小于它的波包造不出来，大于它的却要多大有多大——在交互图"连续叠加"模式中加大二次相位 $\beta$：$|g(k)|$ 一点没变，$\psi(x,0)$ 却越拉越宽（补充材料 G_I §3-c 有解析例子）。所以 \eqref{C-18} 必须写成不等式。`}</Box>
      </Sub>

      <Sub n="C-3" title="Heisenberg relations" zh="Heisenberg 关系">
        <Tx>{R`**从数学到物理只差一步。**\eqref{C-18} 是 Fourier 分析的定理，电工、声学工程师都熟悉它。它之所以在量子力学里变得惊人，是因为 $k$ 有了物理意义：它就是动量除以 $\hbar$。我们要做的是把这件事说准确——$g(k)$ 究竟在量子力学里代表什么。

**两个极端。**先看一个动量完全确定的态。单色平面波 $\mathrm e^{i(k_0x-\omega_0t)}$ 只有一个波数、一个频率，按 de Broglie 关系它的 $p=\hbar k_0$、$E=\hbar\omega_0$ 都是确定的；与此同时它铺满全轴，$\Delta x=\infty$。在 \eqref{C-7} 的语言里，它对应于把全部权重放在一点：`}</Tx>
        <Eq n="C-19" say="单色平面波相当于 Fourier 振幅集中在一个波数上的 $\delta$ 函数：波数（动量）宽度为零。">{R`g(k)=\delta(k-k_0)`}</Eq>
        <Tx>{R`即 $\Delta k=0$（$\delta$ 函数见附录 II）。一头是 $\Delta k=0,\Delta x=\infty$，与 \eqref{C-18} 毫不矛盾。

**$\mathrm e^{ikx}$ 是动量的本征态。**用 §A-3、§B-2 的语言重述上面的话：对 $\psi(x,0)=A\,\mathrm e^{ikx}$ 测动量，结果必定是 $\hbar k$——这正是"本征态"的定义。每个实数 $k$ 都有一个这样的平面波，所以动量可能取的值是**全体实数**，没有量子化，这一点和经典力学一样。

**于是 $|g(k)|^2$ 就是动量分布。**再看 \eqref{C-8}：它恰好是把 $\psi(x,0)$ 按动量本征态 $\mathrm e^{ikx}$ 展开，系数是 $g(k)$。谱分解原理 \eqref{B-6} 当即给出答案：测得 $p=\hbar k$ 的概率正比于 $|g(k)|^2$。由于 $k$ 连续，准确的说法是：测得的值落在 $\hbar k$ 与 $\hbar(k+\mathrm dk)$ 之间的概率 $\sym{dPp}{\overline{\mathrm d\mathscr P}}(k)\propto|g(k)|^2\mathrm dk$。

为了让位置和动量的地位完全对称，把积分变量换成 $p$，定义动量空间的波函数 $\overline\psi(p)$：`}</Tx>
        <Eq n="C-20" say="把积分变量从波数换成动量：位置波函数是动量波函数 $\overline\psi(p)$ 加权的动量本征态之叠加。">{R`\psi(x,0)=\frac{1}{\sqrt{2\pi\hbar}}\int\overline{\psi}(p)\,\mathrm e^{ipx/\hbar}\,\mathrm dp`}</Eq>
        <Derivation title={R`补充：$\overline\psi(p)$ 与 $g(k)$ 的关系`} collapsed steps={[
{ tex: R`k=p/\hbar,\qquad \mathrm dk=\mathrm dp/\hbar`, why: R`在 \eqref{C-8} 中换元。` },
{ tex: R`\psi(x,0)=\frac{1}{\sqrt{2\pi}}\int g(p/\hbar)\,\mathrm e^{ipx/\hbar}\,\frac{\mathrm dp}{\hbar}=\frac{1}{\sqrt{2\pi\hbar}}\int\frac{g(p/\hbar)}{\sqrt\hbar}\,\mathrm e^{ipx/\hbar}\,\mathrm dp`, why: R`把 $1/\hbar$ 拆成 $1/\sqrt\hbar\cdot1/\sqrt\hbar$，使前因子与 \eqref{C-20} 一致。` },
{ tex: R`\overline\psi(p)=\frac{1}{\sqrt\hbar}\,g(p/\hbar),\qquad \int|\overline\psi(p)|^2\mathrm dp=\int|g(k)|^2\mathrm dk`, why: R`对比 \eqref{C-20}。这样选取的前因子使 $\overline\psi$ 与 $g$ 的模方积分相等，Parseval 等式形式不变。` },
]} />
        <Tx>{R`Fourier 变换保持模方积分不变（Parseval–Plancherel 等式，附录 I），所以两种描述的"总概率"一样多：`}</Tx>
        <Eq n="C-21" say="Parseval–Plancherel 等式：位置波函数与动量波函数的模方积分相等——两种描述包含同样多的“总概率”。">{R`\int_{-\infty}^{+\infty}|\psi(x,0)|^2\,\mathrm dx=\int_{-\infty}^{+\infty}|\overline{\psi}(p)|^2\,\mathrm dp`}</Eq>
        <Tx>{R`记这个公共值为 $C$。位置的概率是 $\mathrm d\mathscr P(x)=\frac1C|\psi(x,0)|^2\mathrm dx$；与它对称地，动量测量结果落在 $[p,p+\mathrm dp]$ 的概率是`}</Tx>
        <Eq n="C-22" say="测量动量得到 $[p,p+\mathrm dp]$ 之间某值的概率，正比于动量波函数的模方——与位置概率 $|\psi(x)|^2$ 完全对称。">{R`\sym{dPp}{\overline{\mathrm d\mathscr P}}(p)=\frac1C\,|\overline{\psi}(p)|^2\,\mathrm dp`}</Eq>
        <Tx>{R`\eqref{C-21} 保证它对全体 $p$ 求和为 1。

**结论。**有了这两个分布，$\Delta x$ 和 $\Delta p=\hbar\Delta k$ 都有了明确的物理含义：同一时刻测位置，结果散布在宽约 $\Delta x$ 的范围；测动量，结果散布在 $p_0\pm\Delta p/2$ 的范围（$|\overline\psi(p)|$ 的宽度）。\eqref{C-18} 乘以 $\hbar$：`}</Tx>
        <Eq n="C-23" keyEq title="Heisenberg 关系" say="位置的弥散与动量的弥散之积不可能小于约化 Planck 常数的量级：二者不能同时任意精确。">{R`\Delta x\cdot\Delta p\gtrsim\hbar`}</Eq>
        <Tx>{R`这就是 **Heisenberg 关系**（历史上也叫"测不准关系"）。读法是：位置与动量不可能在同一时刻都被定得任意准；把波包压窄，动量分布必然变宽，反之亦然。

**为什么平时感觉不到？**因为右边是 $\hbar\approx10^{-34}$ J·s。对一粒尘埃（补充材料 B_I 有具体估算），$\Delta x$ 和 $\Delta p$ 都可以同时小到任何仪器都分辨不出来，经典力学照样适用。限制来自 $h\neq0$，而不是来自仪器做得不够好。`}</Tx>
        <Box kind="note" title="哪一半是新的？">{R`\eqref{C-18} 本身是旧物理：一个短促的电磁脉冲不可能有锐利的波长，这在电磁学里早已人所共知。量子力学添上的只有一句话——物质粒子也是波，且 $p=h/\lambda$。正是这句话把一条 Fourier 定理变成了关于粒子的位置与动量的物理限制。`}</Box>
      </Sub>

      <Sub n="C-4" title="Time evolution of a free wave packet" zh="自由波包的时间演化">
        <Tx>{R`**问题：波包以什么速度跑？**直觉的第一个答案是"跟着波跑"。一个平面波 $\mathrm e^{i(kx-\omega t)}$ 只依赖 $x-(\omega/k)t$，所以它的等相位面以**相速度**`}</Tx>
        <Eq n="C-24" say="单个平面波的传播速度（相速度）等于角频率除以波数：等相位面移动的速度。">{R`V_\varphi(k)=\frac{\omega}{k}`}</Eq>
        <Tx>{R`前进。如果所有分量的相速度都一样——真空中的光就是如此，$V_\varphi\equiv c$——整个波包就以这个速度刚性平移。但在**色散**介质里，相速度随波长变化：`}</Tx>
        <Eq n="C-25" say="色散介质中光的相速度等于真空光速除以折射率，而折射率随波长变化——不同波长的分量跑得不一样快。">{R`V_\varphi(k)=\frac{c}{n(k)}`}</Eq>
        <Tx>{R`$n(k)$ 是折射率。物质波正属于这一类：由 \eqref{C-3}，`}</Tx>
        <Eq n="C-26" say="自由物质波的相速度与波数成正比：短波长的分量跑得快——自由空间对物质波来说是“色散介质”。">{R`V_\varphi(k)=\frac{\hbar k}{2m}`}</Eq>
        <Tx>{R`短波长的分量跑得快。各分量步调不一，"波包的速度"就不再显然——下面会看到，它也**不是**中心分量的相速度 $\omega_0/k_0=\hbar k_0/2m$。

**用三波模型看清机制。**让 §C-2 的三根谱线各自随时间转动：频率取 $\omega_0$ 与 $\omega_0\pm\Delta\omega/2$。重复 \eqref{C-10} 的配对，`}</Tx>
        <Eq n="C-27" say="三个波各自以自己的频率演化后，包络变为 $1+\cos(\frac{\Delta k}{2}x-\frac{\Delta\omega}{2}t)$：包络整体平移，平移速度是 $\Delta\omega/\Delta k$，而不是载波的相速度。">{R`\begin{aligned}\psi(x,t)&=\frac{g(k_0)}{\sqrt{2\pi}}\left\{\mathrm e^{i[k_0x-\omega_0t]}+\frac12\,\mathrm e^{i\left[\left(k_0-\frac{\Delta k}{2}\right)x-\left(\omega_0-\frac{\Delta\omega}{2}\right)t\right]}+\frac12\,\mathrm e^{i\left[\left(k_0+\frac{\Delta k}{2}\right)x-\left(\omega_0+\frac{\Delta\omega}{2}\right)t\right]}\right\}\\ &=\frac{g(k_0)}{\sqrt{2\pi}}\,\mathrm e^{i[k_0x-\omega_0t]}\left[1+\cos\left(\frac{\Delta k}{2}x-\frac{\Delta\omega}{2}t\right)\right]\end{aligned}`}</Eq>
        <Tx>{R`载波照旧，包络 $1+\cos(\frac{\Delta k}{2}x-\frac{\Delta\omega}{2}t)$ 整体平移；它的峰在 $\frac{\Delta k}{2}x=\frac{\Delta\omega}{2}t$ 处，即`}</Tx>
        <Eq n="C-28" say="三波模型中包络极大以 $\Delta\omega/\Delta k$ 的速度移动——这就是群速度的离散版本。">{R`x_M(t)=\frac{\Delta\omega}{\Delta k}\,t`}</Eq>
        <Tx>{R`而不是 $x=\frac{\omega_0}{k_0}t$。图 6 把这件事画成了"波峰接力"：$t=0$ 时三列波各有一个峰（记作 (2)）对齐在原点；由于 $k$ 大的跑得快，它们很快错开，过一会儿换成另一组峰 (3) 对齐——相长干涉的位置跳到了下一组峰上。包络就这样一组组地"换人"往前推，速度与任何一列波都不同。`}</Tx>
        <Fig n="6" caption={R`交互版（自绘）：三个分量的波峰与包络极大。金色点是 $t=0$ 时位于 $x=0$ 的波峰 (2)，各以自己的相速度前进而很快错开；包络的极大（相长干涉处）以 $\Delta\omega/\Delta k$ 前进，依次由相继的一组波峰重合而成。`}><CrestDemo /></Fig>
        <Derivation title="补充：(C-27) 的第二行" collapsed steps={[
{ tex: R`\mathrm e^{i[(k_0\mp\frac{\Delta k}2)x-(\omega_0\mp\frac{\Delta\omega}2)t]}=\mathrm e^{i[k_0x-\omega_0t]}\,\mathrm e^{\mp i\left(\frac{\Delta k}2x-\frac{\Delta\omega}2t\right)}`, why: R`把每个指数拆成中心载波乘以一个缓变因子。` },
{ tex: R`\frac12\left(\mathrm e^{-i\nosym{\theta'}}+\mathrm e^{i\nosym{\theta'}}\right)=\cos\nosym{\theta'},\qquad \nosym{\theta'}=\frac{\Delta k}2x-\frac{\Delta\omega}2t`, why: R`两个边带之和合成余弦。` },
{ tex: R`|\psi(x,t)|\propto1+\cos\left(\frac{\Delta k}{2}x-\frac{\Delta\omega}{2}t\right)\ \text{在}\ \frac{\Delta k}2x=\frac{\Delta\omega}2t\ \text{处最大}`, why: R`得 $x_M(t)=\frac{\Delta\omega}{\Delta k}t$，即 \eqref{C-28}。` },
]} />
        <Box kind="aside" title="三波模型里的角频率是近似取的">{R`对自由粒子，三个分量的角频率精确地是 $\omega(k_0\pm\frac{\Delta k}2)=\omega_0\pm\frac{\hbar k_0}{2m}\Delta k+\frac{\hbar\Delta k^2}{8m}$：两侧频率相对 $\omega_0$ 并不严格对称，多出一个公共的二阶小量 $\hbar\Delta k^2/8m$。\eqref{C-27} 取 $\omega_0\pm\frac{\Delta\omega}2$，相当于把色散关系在 $k_0$ 附近线性化，$\Delta\omega\simeq[\mathrm d\omega/\mathrm dk]_{k_0}\Delta k$——这正是下面稳相法所做的近似，所以 \eqref{C-28} 与 \eqref{C-30} 给出同一个速度。被略去的二阶项不影响中心的速度，它造成的是包络形状随时间的变化，即波包的扩散（见下文说明与补充材料 G_I）。`}</Box>
        <Tx>{R`**一般波包：把时间当作额外的相位。**对照 \eqref{C-7} 与 \eqref{C-8}：从 $t=0$ 到 $t$，唯一的变化是每个分量多了一个相因子 $\mathrm e^{-i\omega(k)t}$。也就是说，§C-2 的全部论证可以原样照搬，只需把 $g(k)$ 的辐角换成`}</Tx>
        <Eq n="C-29" say="时间演化只是给每个平面波分量附加一个相位 $-\omega(k)t$：波包在 t 时刻的“有效相位”。">{R`\alpha(k)-\omega(k)t`}</Eq>
        <Tx>{R`对它用稳相条件 \eqref{C-16}，峰的位置立刻写出：`}</Tx>
        <Eq n="C-30" say="t 时刻的$t$ 时刻的波包中心等于初始中心加上群速度乘以 $t$：稳相点随时间匀速移动。">{R`x_M(t)=\left[\frac{\mathrm d\omega}{\mathrm dk}\right]_{k=k_0}t-\left[\frac{\mathrm d\alpha}{\mathrm dk}\right]_{k=k_0}`}</Eq>
        <Tx>{R`第二项是 $t=0$ 时的位置，第一项随时间线性增长，所以峰以如下的**群速度**运动（与三波模型的 $\Delta\omega/\Delta k$ 一致）：`}</Tx>
        <Eq n="C-31" keyEq title="群速度" say="波包中心的运动速度等于色散关系在中心波数处的斜率 $\mathrm d\omega/\mathrm dk$，称为群速度。">{R`V_G(k_0)=\left[\frac{\mathrm d\omega}{\mathrm dk}\right]_{k=k_0}`}</Eq>
        <Tx>{R`对自由粒子的色散关系 \eqref{C-3} 求导：`}</Tx>
        <Eq n="C-32" keyEq title="自由粒子：群速度 = 经典速度" say="自由粒子波包的中心以 $\hbar k_0/m=p_0/m$ 运动——正是经典粒子的速度，恰为相速度的两倍。">{R`V_G(k_0)=\frac{\hbar k_0}{m}=2V_\varphi(k_0)`}</Eq>
        <Tx>{R`**这个"因子 2"是好消息。**$\hbar k_0/m=p_0/m$ 正是经典粒子的速度。设想描述一个宏观的小物体：$\hbar$ 如此之小，我们完全可以选一个 $\Delta x$、$\Delta p$ 都小得不可观测的波包，用经典语言把它的峰位 $x_M(t)$ 叫作"位置"、$p_0$ 叫作"动量"。一致性要求这个"位置"以 $p_0/m$ 运动——\eqref{C-32} 说的恰好就是这件事。相速度 $\hbar k_0/2m$ 只是载波的速度，不对应任何可观测的粒子运动。`}</Tx>
        <Box kind="note" title="形状也会变：波包扩散">{R`上面只追踪了峰。自由运动中 $|g(k)|$ 不变（时间只改相位），所以 $\Delta p$ 守恒；但 $\Delta x$ 不守恒——它随时间增长，足够久之后无限变宽。原因正是三波模型中被线性化掉的那一项：不同分量的群速度本身也略有不同。补充材料 G_I 对高斯波包给出了精确结果，下面的交互图提前展示：初始越窄（$\Delta p$ 越大），扩散越快。`}</Box>
        <Fig n="6b" caption={R`交互版（自绘）：自由高斯波包的运动与扩散。黑：$|\psi(x,t)|^2$；蓝：$\mathrm{Re}\,\psi(x,t)$（缩放显示）；灰点线：$t=0$ 的 $|\psi|^2$。两条竖线分别标出 $V_Gt$ 与 $V_\varphi t$。用的是 \eqref{C-7} 对高斯 $g(k)\propto\mathrm e^{-\sym{aG}{a}^2(k-k_0)^2/4}$ 的解析积分（已与直接数值积分核对）。`}><GaussPacketDemo /></Fig>
      </Sub>
    </Sec>);
}
