// §E 叠加原理与物理预言。式 (E-1)–(E-40)，图 5–9
import { Sec, Sub, Tx, Eq, Box, C } from "@kit";
import { Fig, Sub3, Para, Rule, Postulate } from "./_ch03_kit.jsx";
import { Fig5, Fig6, Fig7, Fig8 } from "./_ch03_figs.jsx";
import { MixturePlot, PathSumPlot, TruncPlot } from "./_ch03_plots.jsx";

const R = String.raw;

export function SecE() {
  return (
    <Sec n="E" title="The superposition principle and physical predictions" zh="叠加原理与物理预言"
      gist={R`第一假设（态可叠加）与其余假设结合，产生干涉：叠加态 $\lambda_1\ket{\psi_1}+\lambda_2\ket{\psi_2}$ 不是统计混合，概率中多出依赖相对相位的交叉项；不测量中间态时要对**概率幅**求和。另一方面，当同一测量结果对应若干正交末态（简并、仪器分辨率有限、连续谱）时，要对**概率**求和。一句话：**同一末态，振幅相加；正交末态，概率相加。**`}
      why={R`第一假设到目前为止只被当作数学性质使用。正是它造成了第 I 章那些“波动性”现象；而要正确使用前几条假设，又必须分清何时加振幅、何时加概率。§E-2 还把第四、第五假设补全到仪器分辨率有限和连续谱的情形。`}
      gives={["E-5", "E-9", "E-18", "E-21", "E-25", "E-27", "E-29", "E-39", "E-40"]}>
      <p className="muted">本节概念：<C id="amplitude" /> · <C id="reduction" /> · <C id="born_rule" /></p>
      <Tx>{R`回到起点。第一假设说态构成矢量空间，到目前为止我们只把这当作数学上的方便。本节要说明它是量子力学最“反直觉”现象的源头：干涉。核心概念是**概率幅**——概率是由它取模方得到的，而叠加作用在振幅上，不作用在概率上。下面用两个简单的情境把这句话变成可计算的规则，再说明它的“反面”：什么时候应当把概率直接相加。`}</Tx>

      <Sub n="E-1" title="Probability amplitudes and interference effects" zh="概率幅与干涉效应">
        <Sub3 n="E-1-a" title="The physical meaning of a linear superposition of states" zh="态的线性叠加的物理意义">
          <Para g="alpha">线性叠加与统计混合的区别</Para>
          <Tx>{R`**一个常见的口头说法。** 设 $\ket{\psi_1},\ket{\psi_2}$ 正交归一，`}</Tx>
          <Eq n="E-1" say="两个态各自归一，并且彼此正交。">{R`\begin{aligned}\braket{\psi_1|\psi_1}=\braket{\psi_2|\psi_2}&=1\\\braket{\psi_1|\psi_2}&=0\end{aligned}`}</Eq>
          <Tx>{R`（比如它们是某个可观测量 $B$ 的两个本征态，本征值 $b_1\neq b_2$），并考虑归一化的叠加`}</Tx>
          <Eq n="E-4" say="两个正交归一态的叠加；归一化条件是两个系数模方之和为 1。">{R`\begin{aligned}&\ket\psi=\lambda_1\ket{\psi_1}+\lambda_2\ket{\psi_2}\\&|\lambda_1|^2+|\lambda_2|^2=1\end{aligned}`}</Eq>
          <Tx>{R`人们常说：“体系以概率 $|\lambda_1|^2$ 处于 $\ket{\psi_1}$，以概率 $|\lambda_2|^2$ 处于 $\ket{\psi_2}$。”这句话有一个正确的读法：**测 $B$** 时读到 $b_1$、$b_2$ 的概率分别是 $|\lambda_1|^2$、$|\lambda_2|^2$。但它很容易被误读成另一件事：$N$ 个处于 $\ket\psi$ 的体系，等价于 $N|\lambda_1|^2$ 个处于 $\ket{\psi_1}$ 的体系加上 $N|\lambda_2|^2$ 个处于 $\ket{\psi_2}$ 的体系——一个**统计混合**。下面用一个**不同于 $B$** 的可观测量 $A$ 来检验这个误读。

**两种算法。** 设 $\ket{u_n}$ 是 $A$ 属于非简并本征值 $a_n$ 的本征矢。若体系确定地处于 $\ket{\psi_1}$ 或 $\ket{\psi_2}$，读到 $a_n$ 的概率分别为`}</Tx>
          <Eq n="E-2" say="态 $\ket{\psi_1}$ 中测 $A$ 得 $a_n$ 的概率。">{R`\mathcal P_1(a_n)=|\braket{u_n|\psi_1}|^2`}</Eq>
          <Eq n="E-3" say="态 $\ket{\psi_2}$ 中测 $A$ 得 $a_n$ 的概率。">{R`\mathcal P_2(a_n)=|\braket{u_n|\psi_2}|^2`}</Eq>
          <Tx>{R`统计混合的图景会把它们按权重平均：`}</Tx>
          <Eq n="E-5" keyEq title="统计混合的（错误）预言" say="把叠加态当作统计混合：概率按权重相加——对真正的叠加态这是错的（问号表示存疑）。">{R`\mathcal P(a_n)\overset{?}{=}|\lambda_1|^2\mathcal P_1(a_n)+|\lambda_2|^2\mathcal P_2(a_n)`}</Eq>
          <Tx>{R`而第四假设不给任何选择余地：概率是**一个**概率幅的模方，`}</Tx>
          <Eq n="E-6" say="正确的规则：概率是概率幅 $\braket{u_n|\psi}$ 的模方。">{R`\mathcal P(a_n)=|\braket{u_n|\psi}|^2`}</Eq>
          <Tx>{R`而叠加是在振幅这一层发生的——内积对右矢线性，`}</Tx>
          <Eq n="E-7" say="叠加态的概率幅是两个分量概率幅的加权和。">{R`\braket{u_n|\psi}=\lambda_1\braket{u_n|\psi_1}+\lambda_2\braket{u_n|\psi_2}`}</Eq>
          <Tx>{R`先加后平方，与先平方后加，差一个交叉项：`}</Tx>
          <Eq n="E-8" say="和的模方等于各项模方之和加上交叉项，交叉项依赖于两个振幅的相对相位。">{R`\begin{aligned}\mathcal P(a_n)&=|\lambda_1\braket{u_n|\psi_1}+\lambda_2\braket{u_n|\psi_2}|^2\\&=|\lambda_1|^2|\braket{u_n|\psi_1}|^2+|\lambda_2|^2|\braket{u_n|\psi_2}|^2\\&\quad+2\,\mathrm{Re}\{\lambda_1\lambda_2^*\braket{u_n|\psi_1}\braket{u_n|\psi_2}^*\}\end{aligned}`}</Eq>
          <Tx>{R`用 \eqref{E-2}、\eqref{E-3} 改写，正确结果与 \eqref{E-5} 的区别一目了然：`}</Tx>
          <Eq n="E-9" keyEq title="叠加态的概率：多出干涉项" say="叠加态的正确概率等于统计混合的结果加干涉项；干涉项依赖于 $\lambda_1\lambda_2^*$，即系数的相对相位。">{R`\mathcal P(a_n)=|\lambda_1|^2\mathcal P_1(a_n)+|\lambda_2|^2\mathcal P_2(a_n)+2\,\mathrm{Re}\{\lambda_1\lambda_2^*\braket{u_n|\psi_1}\braket{u_n|\psi_2}^*\}`}</Eq>
          <Tx>{R`统计混合的误读恰好丢掉了最后一项——**干涉项**。它带来两个教训。第一，叠加态携带混合所没有的信息，就是系数的**相对相位**：它通过 $\lambda_1\lambda_2^*$ 进入预言。第二，整体相位仍然无关紧要：把 $\lambda_1,\lambda_2$ 同时乘以 $e^{i\theta}$，$|\lambda_1|^2$、$|\lambda_2|^2$、$\lambda_1\lambda_2^*$ 都不变（与 §B-3-b-$\gamma$ 一致）。`}</Tx>

          <Para g="beta">一个具体例子</Para>
          <Tx>{R`取沿 $Oz$ 传播的光子，偏振态为与 $\mathbf e_x$、$\mathbf e_y$ 都成 $45^\circ$ 的线偏振（图 5）：`}</Tx>
          <Eq n="E-10" say="与 $x$、$y$ 轴都成 $45^\circ$ 的线偏振：两个正交偏振的等权、同相叠加。">{R`\mathbf e=\frac1{\sqrt2}(\mathbf e_x+\mathbf e_y)`}</Eq>
          <Tx>{R`统计混合的误读会说：$N$ 个这样的光子等于 $N/2$ 个 $x$ 偏振的加 $N/2$ 个 $y$ 偏振的——这正是自然光（非偏振光）。用一个透振方向 $\mathbf e'\perp\mathbf e$ 的检偏器一试：$45^\circ$ 偏振光**一个光子也通不过**（$\mathbf e$ 与 $\mathbf e'$ 正交）；自然光却通过一半（$x$、$y$ 偏振的光子各有 $\cos^2 45^\circ=\frac12$ 的透过率）。两者在物理上截然不同；差别正是 \eqref{E-9} 的干涉项，在这个方向上它等于 $-\frac12$，把 $\frac12$ 抵消成零。`}</Tx>
          <Fig n="5" caption={R`说明线性叠加与统计混合之差别的简单实验。若所有入射光子都处于偏振态 $\mathbf e=(\mathbf e_x+\mathbf e_y)/\sqrt2$，没有一个能通过透振方向 $\mathbf e'\perp\mathbf e$ 的检偏器；若入射的是沿 $\mathbf e_x$ 或 $\mathbf e_y$ 偏振（各占一半）的光子的统计混合（即自然光），则有一半会通过。`}><Fig5 /></Fig>
          <Fig n="E1" caption={R`**叠加 vs 统计混合**（交互）。光子态 $\cos\theta\,\mathbf e_x+e^{i\varphi}\sin\theta\,\mathbf e_y$（即 \eqref{E-4} 中 $\lambda_1=\cos\theta$，$\lambda_2=e^{i\varphi}\sin\theta$，$\ket{\psi_1}=\mathbf e_x$，$\ket{\psi_2}=\mathbf e_y$），检偏器透振方向与 $\mathbf e_x$ 成角 $\chi$（即 $\ket{u_n}$）。蓝线为正确的 \eqref{E-9}；红虚线为把它当成统计混合时的 \eqref{E-5}；绿点线是两者之差，即干涉项。默认 $\theta=45^\circ,\varphi=0$ 就是图 5：$\chi=135^\circ$（$\mathbf e'$）处叠加态的透过率为 0，混合为 $1/2$。把 $\varphi$ 调到 $90^\circ$（圆偏振 $\mathbf e_3$）：干涉项消失，透过率处处为 $1/2$，与混合相同——但这不意味着二者是同一个态（换用圆偏振检偏器就能区分）。`}><MixturePlot /></Fig>
          <Tx>{R`**相对相位的分量有多重？** 下面四个态的系数模完全相同，只差相对相位（$0$、$\pi$、$+\frac\pi2$、$-\frac\pi2$）：`}</Tx>
          <Eq n="E-11" say="相对相位 $0$：沿 $+45^\circ$ 方向的线偏振。">{R`\mathbf e_1=\frac1{\sqrt2}(\mathbf e_x+\mathbf e_y)`}</Eq>
          <Eq n="E-12" say="相对相位 $\pi$：沿 $-45^\circ$ 方向的线偏振。">{R`\mathbf e_2=\frac1{\sqrt2}(\mathbf e_x-\mathbf e_y)`}</Eq>
          <Eq n="E-13" say="相对相位 $+\pi/2$：圆偏振。">{R`\mathbf e_3=\frac1{\sqrt2}(\mathbf e_x+i\mathbf e_y)`}</Eq>
          <Eq n="E-14" say="相对相位 $-\pi/2$：反方向的圆偏振。">{R`\mathbf e_4=\frac1{\sqrt2}(\mathbf e_x-i\mathbf e_y)`}</Eq>
          <Tx>{R`它们在物理上却是四种不同的光：前两个是沿两条对角线的线偏振，后两个是右旋和左旋圆偏振。若只看 $x$、$y$ 方向检偏器的透过率，四者无法区分；换个检偏器，差别就暴露无遗。`}</Tx>
        </Sub3>

        <Sub3 n="E-1-b" title="Summation over the intermediate states" zh="对中间态求和">
          <Para g="alpha">两个简单实验中测量结果的预言</Para>
          <Tx>{R`第二个情境把同样的道理放到“路径”的语言里。设有三个两两不对易的可观测量 $A$、$B$、$C$（都设为非简并），三次测量之间间隔极短，体系来不及演化。

**实验 1：只测 $A$ 和 $C$。** 先测 $A$ 读到 $a$，体系被制备到 $\ket{u_a}$；紧接着测 $C$，读到 $\sym{ceig}{c}$（本征矢 $\ket{v_c}$）的概率是`}</Tx>
          <Eq n="E-15" say="实验 1：从 $\ket{u_a}$ 直接测 $C$ 得 $c$ 的概率是两态内积的模方。">{R`\mathcal P_a(\sym{ceig}{c})=|\braket{v_c|u_a}|^2`}</Eq>
          <Tx>{R`**实验 2：在中间插入一次 $B$ 的测量。** 读数链 $a\to b\to\sym{ceig}{c}$ 的概率是两段条件概率之积（$\ket{w_b}$ 为 $B$ 的本征矢）：`}</Tx>
          <Eq n="E-16" say="三次相继测量：条件概率逐段相乘。">{R`\mathcal P_a(b,\sym{ceig}{c})=\mathcal P_a(b)\ \mathcal P_b(\sym{ceig}{c})`}</Eq>
          <Eq n="E-17" say="经过中间态 $\ket{w_b}$ 的那条路径的概率等于两段概率幅模方之积。">{R`\mathcal P_a(b,\sym{ceig}{c})=|\braket{v_c|w_b}|^2\,|\braket{w_b|u_a}|^2`}</Eq>
          <Box kind="warning" title={R`勘误：式 (E-17)、(E-20) 中的绝对值号`}>{R`原书 \eqref{E-17} 与 \eqref{E-20} 第二行印作 $|\braket{v_c|w_b}|^2\ \braket{w_b|u_a}|^2$，第二个因子缺左边的绝对值竖线。两个因子都是概率（模方），应为 $|\braket{v_c|w_b}|^2\,|\braket{w_b|u_a}|^2$，此处已改正。`}</Box>

          <Para g="beta">两个实验的根本区别</Para>
          <Tx>{R`**“路径”图像。** 两个实验的起点（$\ket{u_a}$）和终点（$\ket{v_c}$）相同。在两者中都可以把 $C$ 之前的态按 $B$ 的本征矢分解，把每个 $\ket{w_b}$ 看作一条从 $\ket{u_a}$ 通往 $\ket{v_c}$ 的“路径”（图 6）。不同之处在于：实验 2 通过测 $B$ **确定了**走的是哪条路；实验 1 没有。

**诱人的推理。** 在实验 1 里体系“可以走任何一条路”，那么总概率似乎应当是各条路概率之和：`}</Tx>
          <Eq n="E-18" keyEq title="对路径的概率求和（错误）" say="把各条路径的概率相加——这是错的：不测中间态时路径之间会干涉。">{R`\mathcal P_a(\sym{ceig}{c})\overset{?}{=}\sum_b\mathcal P_a(b,\sym{ceig}{c})`}</Eq>
          <Tx>{R`**检验。** 从精确的 \eqref{E-15} 出发，在振幅里插入 $B$ 的封闭关系 $\sum_b\ket{w_b}\bra{w_b}=1$：`}</Tx>
          <Eq n="E-19" keyEq title="对中间态的振幅求和" say="插入中间态的封闭关系：总振幅等于各路径振幅之和，每条路径的振幅是两段振幅之积。">{R`\braket{v_c|u_a}=\sum_b\braket{v_c|w_b}\braket{w_b|u_a}`}</Eq>
          <Tx>{R`被加起来的是**振幅**。平方之后分成对角项和交叉项：`}</Tx>
          <Eq n="E-20" say="和的模方展开：对角项是各路径的概率，非对角项是不同路径之间的干涉。">{R`\begin{aligned}\mathcal P_a(\sym{ceig}{c})&=\left|\sum_b\braket{v_c|w_b}\braket{w_b|u_a}\right|^2\\&=\sum_b|\braket{v_c|w_b}|^2\,|\braket{w_b|u_a}|^2\\&\quad+\sum_b\sum_{b'\neq b}\braket{v_c|w_b}\braket{w_b|u_a}\braket{v_c|w_{b'}}^*\braket{w_{b'}|u_a}^*\end{aligned}`}</Eq>
          <Tx>{R`对角项正是 \eqref{E-17}，于是`}</Tx>
          <Eq n="E-21" keyEq title="概率 = 路径概率之和 + 路径间干涉" say="直接测量的概率等于各路径概率之和加上所有路径对之间的交叉项；(E-18) 恰好漏掉了这些干涉项。">{R`\mathcal P_a(\sym{ceig}{c})=\sum_b\ \mathcal P_a(b,\sym{ceig}{c})+\sum_b\sum_{b'\neq b}\braket{v_c|w_b}\braket{w_b|u_a}\braket{v_c|w_{b'}}^*\braket{w_{b'}|u_a}^*`}</Eq>
          <Fig n="6" caption={R`体系在初态 $\ket{u_a}$ 与末态 $\ket{v_c}$ 之间自由演化（不经历任何测量）时，态矢可能走的几条“路径”（经过 $B$ 的不同本征态 $\ket{w_b}$）。这种情况下，必须把与不同路径相联系的**概率幅**相加，而不是把它们的概率相加。每条路径的振幅是图中两段振幅之积。`}><Fig6 /></Fig>
          <Tx>{R`**诊断。** \eqref{E-18} 错在漏掉了路径之间的全部干涉项。为什么实验 2 里这些项真的消失了？因为测量 $B$ 按第五假设把态**投影**到某一个 $\ket{w_b}$ 上，这个不可避免的扰动摧毁了各路径之间的相位关系。而在实验 1 里，说体系“走了某一条路”根本没有根据——更恰当的说法是它同时“走了所有的路”。规则于是是：**中间阶段没有被测量时，要对振幅求和，而不是对概率求和。**`}</Tx>
          <Fig n="E2" caption={R`**对中间态求和：振幅 vs 概率**（交互）。自旋 1/2 粒子：$A$ 沿 $z$ 测得 $+$（初态 $\ket{u_a}=\ket{+z}$）；中间可观测量 $B$ 是沿 $xz$ 平面内方向 $\beta$ 的自旋分量（两个中间态 $\ket{w_\pm}$）；最后测沿方向 $\gamma$ 的自旋分量 $C$，结果为 $+$。蓝线是实验 1 的 \eqref{E-15}：$\cos^2(\gamma/2)$，与 $\beta$ 无关（不测 $B$ 时 $B$ 的方向毫无意义）。红虚线是实验 2 对两条路径概率的求和 $\cos^2\frac\beta2\cos^2\frac{\gamma-\beta}2+\sin^2\frac\beta2\sin^2\frac{\gamma-\beta}2$。默认 $\gamma=180^\circ$：不测 $B$ 时**从不**得到 $+$（两条路径的振幅完全相消），测 $B$ 后却可以有高达 $1/2$ 的概率——中间测量破坏了相消干涉。两者之差（绿点线）正是 \eqref{E-21} 的交叉项，它等于 $-\frac12\sin\beta\sin(\gamma-\beta)$，只有 $\beta$ 为 $0$、$\gamma$（或再加 $180^\circ$）——中间测量与初态或末态“对齐”、实际只剩一条路径——时为零。`}><PathSumPlot /></Fig>
          <Box kind="note" title="两点说明">{R`（i）这与第 I 章 §A-2-a 的杨氏双缝完全同构：两条缝是两条“路径”，每条缝在屏上某点产生的电场扮演概率幅的角色。只要不去探测光子走哪条缝，就要先把两缝的场相加再平方。

（ii）“测量间隔极短”的假设并不是本质的。若两次测量之间体系有时间演化，只需用 Schrödinger 方程（演化算符，见补充材料 F$_{\rm III}$ §2 说明 (ii)）把那一段的态的变化算进去，论证不变。`}</Box>
        </Sub3>

        <Sub3 n="E-1-c" title="Conclusion: the importance of the concept of probability amplitudes" zh="结论：概率幅概念的重要性">
          <Tx>{R`把两个情境放在一起看：\eqref{E-5} 与 \eqref{E-18} 犯的是同一个错误——跳过振幅，直接拿概率去做加法，得到的是“平方的和”；正确的 \eqref{E-8} 与 \eqref{E-20} 则是“和的平方”（和的模方），多出来的交叉项就是干涉。由此提炼出三条工作规则：

（i）量子力学的概率预言，永远是某个**概率幅**的模方。

（ii）若实验的某个中间阶段没有被测量，就不能用“假如在那里测量会得到各结果的概率”来推理，而必须用那些结果的**概率幅**。

（iii）由于态可以叠加，一个概率幅常常是若干部分振幅之和；概率是这个和的模方，**部分振幅之间相互干涉**。`}</Tx>
        </Sub3>
      </Sub>

      <Sub n="E-2" title="Case in which several states can be associated with the same measurement result" zh="同一测量结果对应若干个态的情形">
        <Tx>{R`**一个表面上的矛盾。** §E-1 一再强调“先加振幅再平方”。可第四假设的简并形式 \eqref{B-7} 恰恰是“平方的和”——对简并子空间的各基矢分别取模方再相加。两者并不冲突：\eqref{B-7} 中的每一项本身就可以是一个“和的平方”。弄清这一点，就能处理三类实际问题：简并本征值、分辨率有限的仪器、以及连续谱上的测量（顺带把第五假设推广到连续谱）。`}</Tx>
        <Sub3 n="E-2-a" title="Degenerate eigenvalues" zh="简并本征值">
          <Tx>{R`§E-1 特意只用了非简并本征值，好让干涉的来源最干净。现在让 $a_n$ 是 $g_n$ 重简并的，本征子空间中取正交归一基 $\{\ket{u_n^i};\ i=1,\dots,g_n\}$。

由 §C-6-b，读到 $a_n$ 并不唯一决定末态：末态是这 $g_n$ 个基矢的某种线性组合，具体是哪一个取决于初态。也就是说，**同一个读数 $a_n$ 对应着若干个彼此正交的可能末态**。这些末态是可以（原则上，靠加测相容量）区分的，所以它们的概率要相加——这就是 \eqref{B-7}。但每个末态 $\ket{u_n^i}$ 的概率仍按 §E-1 的规则计算。以 §E-1-a 的叠加态为例，\eqref{E-6} 换成`}</Tx>
          <Eq n="E-22" say="简并本征值的概率：对子空间中各正交末态的概率求和（平方的和）。">{R`\mathcal P(a_n)=\sum_{i=1}^{g_n}\ |\braket{u_n^i|\psi}|^2`}</Eq>
          <Tx>{R`其中每个振幅都是两个分量振幅的叠加：`}</Tx>
          <Eq n="E-23" say="每个正交末态的概率幅本身是两个分量振幅之和，所以每一项都会干涉。">{R`\braket{u_n^i|\psi}=\lambda_1\braket{u_n^i|\psi_1}+\lambda_2\braket{u_n^i|\psi_2}`}</Eq>
          <Tx>{R`于是 $\mathcal P(a_n)$ 是“和的平方”的和：外层对正交末态加概率，内层对同一末态加振幅。§E-1-b 的路径论证也可以照此推广到简并的情形。`}</Tx>
        </Sub3>

        <Sub3 n="E-2-b" title="Insufficiently selective measurement devices" zh="选择性不足的测量装置">
          <Para g="alpha">定义</Para>
          <Tx>{R`真实的仪器分辨率有限。为了把这件事纳入假设，考虑一个理想化的“粗糙”仪器，它只回答 yes 或 no（推广到多个回答是直接的）：

（a）体系若处于 $A$ 的某个本征态、其本征值落在实轴上的区间 $\Delta$ 内（或处于这类本征态的任意叠加），回答必定是 yes；

（b）体系若处于本征值在 $\Delta$ 之外的本征态（或其任意叠加），回答必定是 no；

（c）并且仪器对 $\Delta$ 内的态是“透明的”：让它们**原样**通过，而把 $\Delta$ 外的态挡掉——像一个理想滤波器。

$\Delta$ 就是仪器的分辨本领。若 $\Delta$ 中只有 $A$ 的一个本征值 $a_n$，仪器等价于完美的 $A$ 测量：$\mathcal P(\text{yes})=\mathcal P(a_n)$，$\mathcal P(\text{no})=1-\mathcal P(\text{yes})$。若 $\Delta$ 中有好几个本征值，仪器区分不了它们，我们说它**选择性不足**。问题是：这时怎样计算 $\mathcal P(\text{yes})$，测量后的态又是什么？`}</Tx>
          <Para g="beta">例子</Para>
          <Tx>{R`实际仪器大多如此。测量沿 $Oz$ 飞行的电子的横坐标 $x$，可以在 $xOy$ 平面放一块开缝的板（图 7），缝平行于 $Oy$，两缘在 $x_1$、$x_2$。完全落在两缘之间的波包（$X$ 的本征值在 $[x_1,x_2]$ 内的本征态之叠加）原样穿过缝——yes；完全在缝外的被挡住——no。缝总有宽度，所以这台仪器永远是选择性不足的。`}</Tx>
          <Fig n="7" caption={R`测量粒子横坐标 $x$ 的装置示意图。由于区间 $[x_1,x_2]$ 必然有非零宽度，这样的装置总是选择性不足的。`}><Fig7 /></Fig>
          <Para g="gamma">量子描述</Para>
          <Tx>{R`真正有意思的是那些既不完全在缝内、也不完全在缝外的波包。**关键的一步：换一个角度看仪器测的是什么。** 把本征值落在 $\Delta$ 内的所有本征态张成的子空间记为 $\mathcal E_\Delta$，它的投影算符是（第 II 章 §B-3-b-$\gamma$）`}</Tx>
          <Eq n="E-24" say="到“区间 $\Delta$ 内本征态”所张子空间的投影算符：把区间内各本征值的投影算符加起来。">{R`P_\Delta=\sum_{a_n\in\Delta}\ \sum_{i=1}^{g_n}\ket{u_n^i}\bra{u_n^i}`}</Eq>
          <Tx>{R`（指标 $i$ 照顾到区间内的本征值可能简并。）$P_\Delta$ 是一个可观测量，本征值只有 $1$（$\mathcal E_\Delta$ 中的态）和 $0$（其正交补中的态）。对照仪器的定义：yes 对应 $P_\Delta=1$，no 对应 $P_\Delta=0$。所以**这台仪器实际上是一台完美测量 $P_\Delta$ 的仪器**——只不过 $P_\Delta$ 的本征值 $1$ 高度简并。一切就都回到已有的假设框架里了。把 \eqref{B-7} 用于 $P_\Delta$ 的本征值 $1$，其本征子空间的正交归一基就是 $\Delta$ 内的那些 $\ket{u_n^i}$：`}</Tx>
          <Eq n="E-25" keyEq title="选择性不足的装置回答 yes 的概率" say="回答 yes 的概率等于区间 $\Delta$ 内所有本征态（含简并）上的概率之和。">{R`\mathcal P(\text{yes})=\sum_{a_n\in\Delta}\ \sum_{i=1}^{g_n}\ |\braket{u_n^i|\psi}|^2`}</Eq>
          <Eq n="E-26" say="回答 no 的概率是 1 减去 yes 的概率。">{R`\mathcal P(\text{no})=1-\mathcal P(\text{yes})`}</Eq>
          <Tx>{R`本征值 $1$ 的本征子空间的投影算符就是 $P_\Delta$ 自己，所以按 \eqref{B-14} 有等价的紧凑写法：`}</Tx>
          <Eq n="E-27" keyEq title="yes 的概率（投影算符形式）" say="回答 yes 的概率等于投影算符 $P_\Delta$ 的平均值。">{R`\mathcal P(\text{yes})=\bra\psi P_\Delta\ket\psi`}</Eq>
          <Tx>{R`测量后的态同样由第五假设给出（这与“仪器原样放行 $\mathcal E_\Delta$ 中的部分、挡掉其余部分”的物理图像完全吻合）：`}</Tx>
          <Eq n="E-28" say="得到 yes 之后的态：保留区间 $\Delta$ 内的全部分量（相对系数不变）并归一。">{R`\ket{\psi'}=\frac1{\sqrt{\sum_{a_n\in\Delta}\sum_{i=1}^{g_n}|\braket{u_n^i|\psi}|^2}}\ \sum_{a_n\in\Delta}\ \sum_{i=1}^{g_n}\ket{u_n^i}\braket{u_n^i|\psi}`}</Eq>
          <Eq n="E-29" keyEq title="yes 之后的态" say="得到 yes 之后的态是 $\ket\psi$ 在 $\mathcal E_\Delta$ 上的归一化投影：第五假设用于 $P_\Delta$。">{R`\ket{\psi'}=\frac1{\sqrt{\bra\psi P_\Delta\ket\psi}}P_\Delta\ket\psi`}</Eq>
          <Tx>{R`$\Delta$ 只含一个本征值时 $P_\Delta=P_n$，\eqref{E-27}、\eqref{E-29} 退回到 \eqref{B-14}、\eqref{B-31}。`}</Tx>
        </Sub3>

        <Sub3 n="E-2-c" title="Recapitulation: must one sum the amplitudes or the probabilities?" zh="小结：该对振幅求和，还是对概率求和？">
          <Tx>{R`现在两类加法各有了位置：§E-1 中因为要合并通往**同一末态**的几种途径，所以加振幅（和的平方）；§E-2 中因为同一读数包含几个**相互正交的末态**，所以加概率（平方的和）。实际问题中常常两者都有，需要一层一层地分辨。

**杨氏双缝是最好的演练**（图 8）。问：光子落在屏上 $x_1$ 到 $x_2$ 之间（点 $M_1$ 到 $M_2$）的概率是多少？外层：屏上不同的点是不同的（正交的）末态，所以要把这一段上各点的强度 $I(x)$ 积分起来——平方的和。内层：到达同一点 $M$ 有两条途径 SAM、SBM，我们不去分辨光子走哪条缝，所以 $M$ 处的振幅是两缝电场之和，$I(x)\propto|\mathscr E_{\rm A}(x)+\mathscr E_{\rm B}(x)|^2$——和的平方。`}</Tx>
          <Fig n="8" caption={R`杨氏双缝实验。为计算在点 $M$ 探测到光子的概率密度，必须把缝 A、B 辐射的电场相加，再把所得的场平方（“和的平方”）。在区间 $[x_1,x_2]$ 中找到光子的概率，则是把这个概率密度从 $x_1$ 到 $x_2$ 积分（“平方的和”）。（原书图中 $M_1$ 旁的坐标误标为 $x_2$，应为 $x_1$，这里已画对。）`}><Fig8 /></Fig>
          <Rule id="rule-amplitudes" title="振幅与概率的加法规则">{R`**通往同一末态的各途径，振幅相加；彼此正交的不同末态，概率相加。**`}</Rule>
        </Sub3>

        <Sub3 n="E-2-d" title="Application to the treatment of continuous spectra" zh="应用于连续谱的处理">
          <Tx>{R`对连续谱，选择性不足不是缺陷而是必然：没有任何仪器能从连续统中挑出单独一个本征值。所以 §E-2-b 的处理正是连续谱测量的**正确**描述，它比 §B-3-b-$\beta$ 的概率密度更完整——它还告诉我们测量后的态。`}</Tx>
          <Para g="alpha">例：测量粒子的位置</Para>
          <Tx>{R`用图 7 的狭缝测无自旋粒子（波函数 $\psi(\mathbf r)=\braket{\mathbf r|\psi}$）的横坐标。yes 对应的子空间 $\mathcal E_\Delta$ 由 $x_1\leq x\leq x_2$ 的所有 $\ket{\mathbf r}=\ket{x,y,z}$ 张成——注意 $y$、$z$ 不受限制，这是简并。按“正交末态加概率”，`}</Tx>
          <Eq n="E-30" say="在区间 $[x_1,x_2]$ 内找到粒子的概率：对 $x$ 在区间内积分，对 $y$、$z$ 在全空间积分（对简并指标求和）。">{R`\begin{aligned}\mathcal P(x_1\leq x\leq x_2)&=\int_{x_1}^{x_2}\dd x\int_{-\infty}^{+\infty}\dd y\int_{-\infty}^{+\infty}\dd z\ |\braket{x,y,z|\psi}|^2\\&=\int_{x_1}^{x_2}\dd x\int_{-\infty}^{+\infty}\dd y\int_{-\infty}^{+\infty}\dd z\ |\psi(\mathbf r)|^2\end{aligned}`}</Eq>
          <Tx>{R`用投影算符的语言，`}</Tx>
          <Eq n="E-31" say="“横坐标在 $[x_1,x_2]$ 内”对应的投影算符。">{R`P_\Delta=\int_{x_1}^{x_2}\dd x\int_{-\infty}^{+\infty}\dd y\int_{-\infty}^{+\infty}\dd z\ \ket{x,y,z}\bra{x,y,z}`}</Eq>
          <Tx>{R`代入 \eqref{E-27}，得到同一结果：`}</Tx>
          <Eq n="E-32" say="用投影算符算同一个概率，结果与 (E-30) 相同。">{R`\begin{aligned}\mathcal P(x_1\leq x\leq x_2)&=\bra\psi P_\Delta\ket\psi\\&=\int_{x_1}^{x_2}\dd x\int_{-\infty}^{+\infty}\dd y\int_{-\infty}^{+\infty}\dd z\ \braket{\psi|x,y,z}\braket{x,y,z|\psi}\end{aligned}`}</Eq>
          <Tx>{R`**测量后的波函数长什么样？** 由 \eqref{E-29}，`}</Tx>
          <Eq n="E-33" say="yes 之后的态：把投影算符作用在 $\ket\psi$ 上并归一。">{R`\begin{aligned}\ket{\psi'}&=\frac1{\sym{Nnorm}{N}}\ P_\Delta\ket\psi\\&=\frac1{\sym{Nnorm}{N}}\int_{x_1}^{x_2}\dd x'\int_{-\infty}^{+\infty}\dd y'\int_{-\infty}^{+\infty}\dd z'\ \ket{x',y',z'}\braket{x',y',z'|\psi}\end{aligned}`}</Eq>
          <Tx>{R`归一化因子 $\sym{Nnorm}{N}=\sqrt{\bra\psi P_\Delta\ket\psi}$ 就是 \eqref{E-32} 的平方根。`}</Tx>
          <Box kind="warning" title="勘误：归一化因子中的投影算符">{R`原书在 \eqref{E-33} 之后把归一化因子写作 $\sqrt{\bra\psi P\ket\psi}$，漏了下标 $\Delta$。按 \eqref{E-29}，应为 $\sym{Nnorm}{N}=\sqrt{\bra\psi P_\Delta\ket\psi}$，即 \eqref{E-32} 给出的概率的平方根。`}</Box>
          <Tx>{R`投影到位置表象：`}</Tx>
          <Eq n="E-34" say="在位置表象中写出测量后的波函数。">{R`\braket{\mathbf r|\psi'}=\frac1{\sym{Nnorm}{N}}\int_{x_1}^{x_2}\dd x'\int_{-\infty}^{+\infty}\dd y'\int_{-\infty}^{+\infty}\dd z'\ \braket{\mathbf r|\mathbf r'}\psi(\mathbf r')`}</Eq>
          <Tx>{R`$\braket{\mathbf r|\mathbf r'}=\delta(x-x')\,\delta(y-y')\,\delta(z-z')$；$y'$、$z'$ 的积分范围是全直线，两个 $\delta$ 直接把它们换成 $y$、$z$：`}</Tx>
          <Eq n="E-35" say="只剩对 $x'$ 的积分，$\delta$ 函数把 $x'$ 钉在 $x$ 上——前提是 $x$ 在区间内。">{R`\psi'(x,y,z)=\frac1{\sym{Nnorm}{N}}\int_{x_1}^{x_2}\dd x'\ \delta(x-x')\ \psi(x',y,z)`}</Eq>
          <Tx>{R`$x'$ 的积分范围却是有限的。$\delta(x-x')$ 的“尖”落在积分区间内还是外，决定了结果：`}</Tx>
          <Eq n="E-36" say="狭缝之内：测量后的波函数与原波函数形状完全相同，只放大了 $1/N$ 倍。">{R`\psi'(x,y,z)=\frac1{\sym{Nnorm}{N}}\ \psi(x,y,z)\qquad\text{for}\quad x_1\leq x\leq x_2`}</Eq>
          <Eq n="E-37" say="狭缝之外：测量后的波函数为零——波包被缝的边缘切掉了。">{R`\psi'(x,y,z)=0\qquad\text{for}\quad x>x_2\ \ \text{and}\ \ x<x_1`}</Eq>
          <Tx>{R`这就是“波包约化”最直观的样子：缝内的部分原封不动（因子 $1/\sym{Nnorm}{N}$ 只为保持归一），缝外的部分被剪掉。若让许多处于同一 $\ket\psi$ 的粒子依次射向缝，它们以概率 $\mathcal P(\text{yes})$ 穿过、并带着被“剪裁”过的波函数 $\psi'$ 继续前进，其余的被屏吸收。

**窄缝极限：回到 \eqref{B-17}。** 缝再窄，区间里仍有无穷多个本征值，所以完美的位置测量是不可能的。但可以看极限：取以 $x_0$ 为中心、宽 $\Delta x$ 的缝，并设 $\psi$ 在 $\Delta x$ 内变化很小，\eqref{E-30} 中的 $|\psi|^2$ 可以取 $x=x_0$ 处的值，$x$ 积分只贡献一个因子 $\Delta x$：`}</Tx>
          <Eq n="E-38" say="窄缝极限：概率约等于缝宽乘一个起概率密度作用的正量；对 $y$、$z$ 的积分是对简并指标的求和。">{R`\mathcal P\left(x_0-\frac{\Delta x}2\leq x\leq x_0+\frac{\Delta x}2\right)\simeq\Delta x\int_{-\infty}^{+\infty}\dd y\int_{-\infty}^{+\infty}\dd z\ |\psi(x_0,y,z)|^2`}</Eq>
          <Tx>{R`概率正比于 $\Delta x$，比例系数就是 $x_0$ 处的概率密度——\eqref{B-17} 的形式。多出来的 $y$、$z$ 积分正是因为在三维中 $X$ 的本征值 $x_0$ 是无穷重简并的（对 $y$、$z$ 的每个取值各有一个本征态），\eqref{B-17} 只处理了非简并情形。`}</Tx>

          <Para g="beta">连续谱情形下的波包约化假设</Para>
          <Tx>{R`§B-3-c 只对离散谱陈述了第五假设。上面的例子显示了连续谱的正确推广：把“投到一个本征值”换成“投到仪器分辨率所对应的一小段本征值”。设 $A$ 的谱连续、非简并（记号同 §B-3-b-$\beta$）：`}</Tx>
          <Postulate k={5} id="5c" case="推广到连续谱" title="精度有限的测量之后的态">
            <Tx>{R`若对处于 $\ket\psi$ 的体系测量 $A$，读数为 $\alpha_0$、分辨率为 $\Delta\alpha$，则测量刚结束时的态是 $\ket\psi$ 在本征值窗口 $[\alpha_0-\frac{\Delta\alpha}2,\alpha_0+\frac{\Delta\alpha}2]$ 上的归一化投影：`}</Tx>
            <Eq n="E-39" keyEq title="连续谱的约化" say="连续谱的约化：把 $\ket\psi$ 投影到以 $\alpha_0$ 为中心、宽 $\Delta\alpha$ 的本征值窗口上，再归一。">{R`\ket{\psi'}=\frac1{\sqrt{\bra\psi P_{\Delta\alpha}(\alpha_0)\ket\psi}}\ P_{\Delta\alpha}(\alpha_0)\ket\psi`}</Eq>
            <Tx>{R`窗口的投影算符为`}</Tx>
            <Eq n="E-40" keyEq title="窗口投影算符" say="窗口投影算符：把 $\alpha_0$ 附近宽 $\Delta\alpha$ 内的本征右矢与左矢之积积分起来。">{R`P_{\Delta\alpha}(\alpha_0)=\int_{\alpha_0-\frac{\Delta\alpha}2}^{\alpha_0+\frac{\Delta\alpha}2}\dd\alpha\ \ket{v_\alpha}\bra{v_\alpha}`}</Eq>
          </Postulate>
          <Tx>{R`在 $\{\ket{v_\alpha}\}$ 表象中，效果与狭缝完全一样（计算同 \eqref{E-33}→\eqref{E-36}、\eqref{E-37}）：函数 $\braket{v_\alpha|\psi}$ 在窗口内保留、窗口外置零，再整体放大以恢复归一（图 9）。`}</Tx>
          <Fig n="9" caption={R`连续谱情形下波包约化假设的图示（交互）。测量可观测量 $A$（本征矢 $\ket{v_\alpha}$，本征值 $\alpha$），装置的选择性为 $\Delta\alpha$。若所得值为 $\alpha_0$（误差 $\Delta\alpha$），测量对函数 $\braket{v_\alpha|\psi}$ 的作用就是把它在 $\alpha_0$ 附近“截断”（为使新波函数归一，要乘以一个大于 1 的因子 $1/\sqrt{\mathcal P(\text{yes})}$）。图例给出 $\mathcal P(\text{yes})$；把 $\Delta\alpha$ 调小，$\mathcal P/\Delta\alpha$ 趋于 $\rho(\alpha_0)=|\braket{v_{\alpha_0}|\psi}|^2$，即 \eqref{B-17}。`}><TruncPlot /></Fig>
          <Tx>{R`**一个推论：理想的本征态永远制备不出来。** 无论 $\Delta\alpha$ 多小，得到的都只是 $\alpha_0$ 附近的一个窄函数，而不是 $\braket{v_\alpha|v_{\alpha_0}}=\delta(\alpha-\alpha_0)$。这与 $\ket{v_{\alpha_0}}$ 不可归一、本来就不是物理态的事实相互印证。`}</Tx>
        </Sub3>
      </Sub>
    </Sec>);
}
