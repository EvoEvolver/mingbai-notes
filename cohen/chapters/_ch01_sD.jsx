// §D 不含时标量势中的粒子 —— 式 (D-1)–(D-25)，图 7–10；结论
import { Sec, Sub, Tx, Eq, Box, Derivation, C, Block } from "@kit";
import { Fig, SquareVsReal, SquareShapes } from "./_ch01_figs.jsx";
import { ScatterDemo } from "./_ch01_plots.jsx";

const R = String.raw;

export function SecD() {
  return (
    <Sec n="D" title="Particle in a time-independent scalar potential" zh="不含时标量势中的粒子"
      gist={R`$V$ 不含时 $\Rightarrow$ 存在定态 $\varphi(\mathbf r)\mathrm e^{-iEt/\hbar}$，$H\varphi=E\varphi$，允许的能量是 $H$ 的本征值；一般解是定态叠加。在分段常数的"方势"中，定态方程与光在分层介质中的波动方程同形，由光学直接读出量子反射、隧道效应、束缚能级量子化与共振透射。`}
      why={R`§C 表明 $h\to0$（波长远小于运动的特征长度）时量子描述回到经典。所以典型的量子（波动）效应应当出现在势**在比波长还短的距离上剧烈变化**的地方——方势是最极端、最简单的例子。`}
      gives={["D-7", "D-9", "D-10", "D-14", "D-17", "D-20", "D-21"]}>
      <p className="muted">本节概念：<C id="stationary" /> · <C id="optical" /> · <C id="tunnel" /></p>
      <Tx>{R`**量子效应藏在哪里？**§C 的结论可以换个角度说：当 de Broglie 波长 $\lambda=h/p$ 比运动涉及的所有长度都短得多时，波包就像经典粒子一样走。光学里有完全相同的层级关系——波长可忽略时用几何光学（光线），否则必须用波动光学。经典力学之于量子力学，正如几何光学之于波动光学。

反过来推：要看到纯粹的量子现象，就得找一个在**一个波长之内**就变化剧烈的势。最极端的例子是台阶式的"方势"：在跃变点，无论波长多短，变化都比它更快。这一节先建立处理不含时势的通用工具（定态），再用它和一个光学类比，定性地看方势会带来什么。`}</Tx>

      <Sub n="D-1" title="Separation of variables. Stationary states" zh="分离变量：定态">
        <Tx>{R`本节的出发点是 $V$ 只依赖位置的 Schrödinger 方程：`}</Tx>
        <Eq n="D-1" say="势能不随时间变化时的 Schrödinger 方程：与 (B-8) 相同，只是 V 只依赖位置。">{R`i\hbar\frac{\partial}{\partial t}\psi(\mathbf r,t)=-\frac{\hbar^2}{2m}\,\sym{lap}{\Delta}\psi(\mathbf r,t)+V(\mathbf r)\,\psi(\mathbf r,t)`}</Eq>

        <Sub n="D-1-a" title="Existence of stationary states" zh="定态的存在">
          <Tx>{R`**想找的是什么。**经典力学里，势不含时意味着能量守恒。量子力学里对应的应当是一类"最安静"的态：概率分布 $|\psi|^2$ 完全不随时间变化，只有一个不可观测的整体相位在转。什么样的 $\psi$ 能做到这一点？最自然的候选是让时间和空间"各管各的"——写成乘积：`}</Tx>
          <Eq n="D-2" say="试探解：波函数等于一个只依赖位置的函数乘以一个只依赖时间的函数。">{R`\psi(\mathbf r,t)=\varphi(\mathbf r)\,\chi(t)`}</Eq>
          <Tx>{R`**把变量拆开。**代入 \eqref{D-1} 时，$\partial_t$ 只碰到 $\chi$，$\sym{lap}{\Delta}$ 和 $V(\mathbf r)$ 只碰到 $\varphi$：`}</Tx>
          <Eq n="D-3" say="代入后，时间导数只作用在 $\chi$ 上，拉普拉斯算符只作用在 $\varphi$ 上。">{R`i\hbar\,\varphi(\mathbf r)\frac{\mathrm d\chi(t)}{\mathrm dt}=\chi(t)\left[-\frac{\hbar^2}{2m}\sym{lap}{\Delta}\varphi(\mathbf r)\right]+\chi(t)\,V(\mathbf r)\,\varphi(\mathbf r)`}</Eq>
          <Tx>{R`在 $\varphi\chi\neq0$ 的地方两边同除以 $\varphi\chi$，把含 $t$ 的东西全部赶到左边、含 $\mathbf r$ 的全部赶到右边：`}</Tx>
          <Eq n="D-4" say="左边只依赖时间，右边只依赖位置；两者处处相等，只能都等于同一个常数。">{R`\frac{i\hbar}{\chi(t)}\,\frac{\mathrm d\chi(t)}{\mathrm dt}=\frac{1}{\varphi(\mathbf r)}\left[-\frac{\hbar^2}{2m}\sym{lap}{\Delta}\varphi(\mathbf r)\right]+V(\mathbf r)`}</Eq>
          <Tx>{R`现在用一个在黑板上常用的论证：固定 $\mathbf r$、让 $t$ 变，右边不动，所以左边不能随 $t$ 变；固定 $t$、让 $\mathbf r$ 变，同理右边不能随 $\mathbf r$ 变。两边只能等于同一个常数。它的量纲是能量，我们预先把它写成 $\hbar\omega$。

**时间部分**于是满足 $\mathrm d\chi/\mathrm dt=-i\omega\chi$，一行积分：`}</Tx>
          <Eq n="D-5" say="时间因子是一个以角频率 $\omega$ 匀速转动的相因子。">{R`\chi(t)=A\,\mathrm e^{-i\omega t}`}</Eq>
          <Tx>{R`**空间部分**满足一个不再含时间的方程：`}</Tx>
          <Eq n="D-6" say="空间部分满足的方程：动能项加势能项作用在 $\varphi$ 上，等于常数 $\hbar\omega$ 乘以 $\varphi$。">{R`-\frac{\hbar^2}{2m}\,\sym{lap}{\Delta}\varphi(\mathbf r)+V(\mathbf r)\,\varphi(\mathbf r)=\hbar\omega\,\varphi(\mathbf r)`}</Eq>
          <Tx>{R`常数 $A$ 可以并进 $\varphi$ 里，取 $A=1$。合起来：只要 $\varphi$ 解出了 \eqref{D-6}，`}</Tx>
          <Eq n="D-7" keyEq title="定态" say="定态：空间形状固定，只整体乘上一个随时间转动的相因子；所以概率密度 $|\psi|^2=|\varphi|^2$ 不随时间变化。">{R`\psi(\mathbf r,t)=\varphi(\mathbf r)\,\mathrm e^{-i\omega t}`}</Eq>
          <Tx>{R`就是 \eqref{D-1} 的一个解。验证我们想要的性质：$|\psi|^2=|\varphi|^2$，确实不随时间变化——这类解称为**定态**。

**定态的物理身份。**定态里只出现一个频率 $\omega$；按 Planck–Einstein 关系，这意味着它的能量是确定的，$E=\hbar\omega$。所以定态就是**能量本征态**——经典的"能量守恒"在量子力学里变成了"存在能量完全确定的态"。用 $E$ 改写 \eqref{D-6}：`}</Tx>
          <Eq n="D-8" say="用能量 $E$ 代替 $\hbar\omega$：方括号里的算符作用在 $\varphi$ 上，得到的只是 $\varphi$ 乘以 $E$。">{R`\left[-\frac{\hbar^2}{2m}\,\sym{lap}{\Delta}+V(\mathbf r)\right]\varphi(\mathbf r)=E\,\varphi(\mathbf r)`}</Eq>
          <Tx>{R`把方括号里的东西起个名字 $H$，方程就有了一个很紧凑的形式：`}</Tx>
          <Eq n="D-9" keyEq title="定态 Schrödinger 方程（H 的本征值方程）" say="哈密顿算符作用在本征函数上，只把它乘以一个数——这个数就是能量；允许的能量是 H 的本征值。">{R`H\,\varphi(\mathbf r)=E\,\varphi(\mathbf r)`}</Eq>
          <Eq n="D-10" keyEq title="哈密顿算符" say="哈密顿算符 = 动能算符（拉普拉斯项）+ 势能：它对应于经典的总能量。">{R`H=-\frac{\hbar^2}{2m}\,\sym{lap}{\Delta}+V(\mathbf r)`}</Eq>
          <Tx>{R`**为什么叫"本征值方程"。**$H$ 是一个把函数变成函数的操作，而且是**线性**的：`}</Tx>
          <Eq n="D-11" say="线性：作用于两个函数的线性组合，等于分别作用后的同一线性组合。">{R`H\left[\lambda_1\varphi_1(\mathbf r)+\lambda_2\,\varphi_2(\mathbf r)\right]=\lambda_1H\varphi_1(\mathbf r)+\lambda_2H\varphi_2(\mathbf r)`}</Eq>
          <Tx>{R`\eqref{D-9} 问的是：哪些函数被 $H$ 作用后只被乘了一个数？这些函数叫 $H$ 的本征函数，那个数叫本征值。于是一条重要结论自动出现：**允许的能量就是 $H$ 的本征值**。后面（§D-2-c、补充材料 H_I §2-c）会看到，平方可积的要求只在某些 $E$ 处才能满足——能量量子化就是从这里来的。`}</Tx>
          <Box kind="warning" title="易混：含时方程与“不含时方程”">{R`\eqref{D-9}（或 \eqref{D-8}）常被叫作"不含时 Schrödinger 方程"，但它并不是 \eqref{D-1} 的替代品。\eqref{D-1} 管一切态的演化；\eqref{D-9} 只是一个**筛子**，从所有可能的态里筛出那些定态。一个一般的态并不满足 \eqref{D-9}，它的演化要看下一小节。`}</Box>
        </Sub>

        <Sub n="D-1-b" title="Superposition of stationary states" zh="定态的叠加">
          <Tx>{R`**问题：知道了所有定态，能否写出任意态的演化？**能，而且方法很机械。先给本征值编号：`}</Tx>
          <Eq n="D-12" say="第 n 个能量本征值 $E_n$ 及其本征函数 $\varphi_n$。">{R`H\,\varphi_n(\mathbf r)=E_n\,\varphi_n(\mathbf r)`}</Eq>
          <Tx>{R`每个本征函数配上自己的时间因子就是一个定态：`}</Tx>
          <Eq n="D-13" say="第 n 个定态：本征函数乘以以 $E_n/\hbar$ 为角频率转动的相因子。">{R`\psi_n(\mathbf r,t)=\varphi_n(\mathbf r)\,\mathrm e^{-iE_nt/\hbar}`}</Eq>
          <Tx>{R`\eqref{D-1} 是线性的，这些定态以任意复系数 $c_n$ 叠加仍是解：`}</Tx>
          <Eq n="D-14" keyEq title="一般解：定态的叠加" say="势不含时时的一般解：各定态以任意复系数叠加，每一项按自己的能量转动相位。">{R`\psi(\mathbf r,t)=\sum_nc_n\,\varphi_n(\mathbf r)\,\mathrm e^{-iE_nt/\hbar}`}</Eq>
          <Tx>{R`令 $t=0$，就是初始波函数按本征函数的展开：`}</Tx>
          <Eq n="D-15" say="令 t = 0：初始波函数就是各本征函数以 $c_n$ 为系数的叠加。">{R`\psi(\mathbf r,0)=\sum_nc_n\,\varphi_n(\mathbf r)`}</Eq>
          <Tx>{R`**求解初值问题的三步配方。**(1) 已知 $\psi(\mathbf r,0)$，按 \eqref{D-15} 把它展开成 $\varphi_n$ 的叠加（以后会证明这总是可以做到的），读出 $c_n$；(2) 给第 $n$ 项乘上 $\mathrm e^{-iE_nt/\hbar}$；(3) 加起来，就是 \eqref{D-14}。

关键在第 (2) 步：各项的相因子**转速不同**。只有当叠加里只剩一项时，整个波函数才共享一个相位，那就是定态；只要有两项以上，相对相位就随时间变化，概率分布跟着改变——见下面的框。`}</Tx>
          <Box kind="physics" title="为什么非定态会“动”">{R`取两项：$\psi=c_1\varphi_1\mathrm e^{-iE_1t/\hbar}+c_2\varphi_2\mathrm e^{-iE_2t/\hbar}$。展开模方，除了两个不随时间变化的 $|c_1\varphi_1|^2$、$|c_2\varphi_2|^2$，还有交叉项 $2\,\mathrm{Re}[c_1^*c_2\varphi_1^*\varphi_2\,\mathrm e^{-i(E_2-E_1)t/\hbar}]$，它以角频率 $(E_2-E_1)/\hbar$ 振荡。这和 \eqref{B-1} 遥相呼应：处在两能级叠加中的原子，其电荷分布正以跃迁频率振荡。`}</Box>
        </Sub>
      </Sub>

      <Sub n="D-2" title="One-dimensional “square” potentials. Qualitative study" zh="一维方势：定性研究">
        <Tx>{R`这一小节只做定性讨论，目的是让物理图像先立起来；完整的计算放在补充材料 H_I。我们只考虑一维问题，$V=V(x)$（为什么一维模型有意义，见补充材料 F_I）。`}</Tx>

        <Sub n="D-2-a" title="Physical meaning of a square potential" zh="方势的物理意义">
          <Tx>{R`**方势是一种理想化。**真实的势总是连续的；所谓方势（图 7a），是把一个"大部分地方平坦、少数地方陡变"的真实势（图 7b）中的陡坡压成竖直台阶。什么时候可以这样压？判据是长度比较：只要陡坡的宽度远小于问题中其他一切长度——尤其是粒子的波长——波就"看不出"坡有多宽。反之，能量很高、波长很短的粒子能分辨出坡的细节，这个近似就失效了。

**经典粒子在方势上会怎样？**把 $V(x)$ 想成一条山路的高度，图 7b 就是平台与陡坡交替的地形。力 $F=-\mathrm dV/\mathrm dx$（图 7c）只在陡坡上不为零：在平台上粒子匀速前进，经过陡坡时被加速或减速。另一个经典结论是：给定总能量 $E$，粒子永远到不了 $V>E$ 的地方，因为那里动能 $E_c=E-V$ 会是负的。下面要看的，就是量子力学在哪些地方推翻这些结论。`}</Tx>
          <Fig n="7" caption={R`(a) 方势，它示意地代表 (b) 中的真实势；(c) 后者对应的力 $F=-\mathrm dV/\mathrm dx$（自绘：(b) 用 $\tanh$ 型台阶构造，(c) 为其解析导数）。`}><SquareVsReal /></Fig>
        </Sub>

        <Sub n="D-2-b" title="Optical analogy" zh="光学类比">
          <Tx>{R`**策略：把陌生问题翻译成熟悉问题。**我们要找方势中的定态。在每一段平台上 $V$ 是常数，本征值方程 \eqref{D-9} 成为常系数的二阶方程：`}</Tx>
          <Eq n="D-16" say="一维、势为常数时的定态方程：动能算符变成对 x 的二阶导数。">{R`\left[-\frac{\hbar^2}{2m}\frac{\mathrm d^2}{\mathrm dx^2}+V\right]\varphi(x)=E\varphi(x)`}</Eq>
          <Tx>{R`整理成"二阶导数加上系数乘函数等于零"的标准形式：`}</Tx>
          <Eq n="D-17" say="移项后：$\varphi$ 的曲率与 $(E-V)\varphi$ 成正比；$E>V$ 时解是振荡的，$E<V$ 时解是指数的。">{R`\left[\frac{\mathrm d^2}{\mathrm dx^2}+\frac{2m}{\hbar^2}(E-V)\right]\varphi(x)=0`}</Eq>
          <Tx>{R`这个形状在光学里天天见。设想一束单色光沿 $x$ 方向射入一个分层介质，每层的折射率 $n$ 是常数；电场写成偏振方向乘空间部分乘时间因子：`}</Tx>
          <Eq n="D-18" say="沿 x 方向的单色光波：偏振方向固定、角频率为 $\Omega$，空间部分为 $\sym{Ef}{E}(x)$。">{R`\mathbf E(\mathbf r,t)=\mathbf e\;\sym{Ef}{E}(x)\,\mathrm e^{-i\Omega t}`}</Eq>
          <Tx>{R`（$\mathbf e\perp Ox$。）代入波动方程 $\nabla^2\mathbf E=\frac{n^2}{c^2}\partial_t^2\mathbf E$，空间部分满足`}</Tx>
          <Eq n="D-19" say="折射率为 n 的介质中光波空间部分的方程：曲率与 $n^2\Omega^2/c^2$ 成正比。">{R`\left[\frac{\mathrm d^2}{\mathrm dx^2}+\frac{n^2\Omega^2}{c^2}\right]\sym{Ef}{E}(x)=0`}</Eq>
          <Tx>{R`两式逐项对比，只要做如下的"字典替换"，它们就是同一个方程：`}</Tx>
          <Eq n="D-20" keyEq title="量子–光学对应" say="把 $2m(E-V)/\hbar^2$ 认作 $n^2\Omega^2/c^2$，定态方程就变成光波方程：势越低（动能越大），等效折射率越大。">{R`\frac{2m}{\hbar^2}(E-V)=\frac{n^2\Omega^2}{c^2}`}</Eq>
          <Tx>{R`还需要检查交界处的规则是否也一样。光学里，$\sym{Ef}{E}(x)$ 及其导数在两种介质的界面上连续；对 $\varphi$，在跃变点附近对 \eqref{D-17} 积分一个小区间，$(E-V)\varphi$ 有界，其积分随区间缩小而趋于零，所以 $\varphi'$ 不跳变，$\varphi$ 自然也连续（补充材料 H_I §1-b）。方程一样、接头条件一样——量子问题与光学问题**数学上完全等价**。

**字典。**由 \eqref{D-20} 解出每个平台对应的等效折射率（光的频率 $\Omega$ 可以任取，它只是一个比例尺）：`}</Tx>
          <Eq n="D-21" keyEq title="等效折射率" say="与势能 V 区域对应的等效折射率正比于 $\sqrt{E-V}$：E>V 时为实数（透明介质），E<V 时为纯虚数（倏逝波）。">{R`n(\Omega)=\frac{1}{\hbar\Omega}\sqrt{2mc^2(E-V)}`}</Eq>
          <Tx>{R`字典里最有用的两个条目：

◆ $E>V$：$n$ 为实数，相当于**透明介质**，解是传播的波 $\mathrm e^{ikx}$，$k=\sqrt{2m(E-V)}/\hbar$。

◆ $E<V$：$n$ 为纯虚数，$n^2<0$，解是 $\mathrm e^{-\rho x}$，$\rho=\sqrt{2m(V-E)}/\hbar$——光学里叫**倏逝波**。它有点像光在金属里的衰减，但不完全一样：金属的折射率有实部，光波一边衰减一边还在振荡。

有了这本字典，波动光学的现成结论可以直接搬过来。但要记住这只是**数学**类比：量子力学对 $\varphi$ 的诠释（概率幅）与经典光学对电场的诠释完全不同。`}</Tx>
        </Sub>

        <Sub n="D-2-c" title="Examples" zh="例子">
          <Fig n="8–10" caption={R`三种方势（自绘示意）：势阶、势垒、势阱。阱底在 $-V_0$。`}><SquareShapes /></Fig>
          <Tx>{R`下面每个例子都按同一个套路走：先写出经典粒子的行为，再查字典把势翻译成介质，用光学结论读出量子预言，最后指出两者的差别。

**α. 势阶与势垒**

**势阶，能量高于台阶（$E>V_0$）。**经典粒子从左边来，爬上台阶后减速，继续向右，绝不回头。翻译成光学：光从折射率`}</Tx>
          <Eq n="D-22" say="势阶左侧（V = 0）对应的等效折射率，由粒子的总能量决定。">{R`n_1=\frac{c}{\hbar\Omega}\sqrt{2mE}`}</Eq>
          <Tx>{R`的介质，在 $x=x_1$ 进入折射率`}</Tx>
          <Eq n="D-23" say="势阶右侧（$V=V_0$）对应的等效折射率，由动能 $E-V_0$ 决定；$E<V_0$ 时它是纯虚数。">{R`n_2=\frac{c}{\hbar\Omega}\sqrt{2m(E-V_0)}`}</Eq>
          <Tx>{R`的介质。任何学过光学的人都知道，光在折射率突变的界面上总有一部分被反射。所以量子预言是：粒子以某个概率 $\mathscr P$ 被**弹回**，只有 $1-\mathscr P$ 的概率继续前进——经典力学里不可能发生。定量结果见本小节末的推导框（光学中的 Fresnel 公式原样适用）。

**势阶，能量低于台阶（$E<V_0$）。**$n_2$ 变为纯虚数，光被**全反射**。这一次量子与经典的结论一致：粒子必定回头。但字典还说了一件经典力学不会说的事：右侧有一段倏逝波，粒子在经典禁区 $x>x_1$ 里被找到的概率不为零。

**势垒（$E<V_0$）：隧道效应。**把禁区截成有限厚度 $x_2-x_1$，倏逝波的意义就变得戏剧化：光学上这是夹在两块透明介质之间的一薄层"虚折射率"介质。只要层厚不比穿透深度 $1/\rho$ 大太多，衰减到对面的波还有可观的振幅，会在另一侧重新变成传播的波——即受抑全反射。量子语言：即使 $E<V_0$，粒子也有一定概率**穿过**势垒。这就是隧道效应；交互图中可以看到透射率随势垒变厚（$\sym{gL}{\gamma}$ 增大）近似指数地下降。`}</Tx>
          <Fig n="8–10b" caption={R`交互版（自绘）：方势阶、方势垒、方势阱的定态散射。上：透射率 $T$（蓝）、反射率 $1-T$（红）随 $E/V_0$ 的变化，灰虚线为经典粒子；下：所选能量下的 $|\varphi(x)|^2$（入射波振幅取 1）与 $\mathrm{Re}\,\varphi$，金线为势的示意。无量纲参数 $\sym{gL}{\gamma}=\sqrt{2mV_0}\,\sym{Lw}{L}/\hbar$（$\sym{Lw}{L}$ 为势垒宽度或阱宽，势阶时只作长度单位），它衡量势垒/势阱"容纳多少波长"。数值用传递矩阵法逐界面匹配 $\varphi$ 与 $\varphi'$，已与补充材料 H_I 的解析公式逐点核对。`}><ScatterDemo /></Fig>
          <Tx>{R`**β. 势阱**

经典图景（图 10）：$-V_0<E<0$ 的粒子被困在 $[x_1,x_2]$ 内来回运动，动能 $E_c=E+V_0$，任何介于 $-V_0$ 与 0 之间的能量都可以；$E>0$ 的粒子从左边进来，在 $x_1$ 处突然加速、在 $x_2$ 处等量减速，然后离开。

**$-V_0<E<0$：能量量子化。**查字典：两侧 $n_1$、$n_3$ 为虚数（反射层），中间 $n_2$ 为实数——一层"空气"夹在两面反射镜之间。波在两壁之间来回反射，一般会自相抵消，只有在某些特定频率（简正模）上才能建立稳定的驻波。量子语言：**束缚态的能量是分立的**。

一个常见的偷懒是直接套用"阱宽等于半波长 $\sym{lam}{\lambda}_2/2$ 的整数倍"——这是两端固定的弦的条件。它并不对：倏逝波意味着波在 $x_1$、$x_2$ 处的反射带有相移，波其实"渗进"了壁里（原书脚注 8；补充材料 H_I §2-c）。交互图的势阱模式给出了真实能级与这个天真条件的对比。

**$E>0$：共振透射。**三个区域的等效折射率都是实数：`}</Tx>
          <Eq n="D-24" say="势阱两侧（V = 0）的等效折射率相同，由总能量 E 决定。">{R`n_1=n_3=\frac{c}{\Omega}\frac{1}{\hbar}\sqrt{2mE}`}</Eq>
          <Eq n="D-25" say="阱内（$V=-V_0$）的等效折射率由 $E+V_0$ 决定，比两侧大——像空气中的一片玻璃。">{R`n_2=\frac{c}{\Omega}\frac{1}{\hbar}\sqrt{2m(E+V_0)}`}</Eq>
          <Tx>{R`中间大、两边小，好比空气中的一片玻璃。要算出反射和透射，必须把在两个界面之间来回反射的无穷多束波全部加起来——这正是 Fabry–Perot 干涉仪的原理。结论也照搬过来：一般情形下总有部分反射，但对某些特定能量，各次反射恰好相消，透射率为 1、反射率为 0。这些能量称为**共振能量**（交互图中出现在 $\sym{gL}{\gamma}\sqrt{E/V_0+1}$ 为 $\pi$ 的整数倍处，即阱内恰好容纳整数个半波长）。

**回顾。**三个例子里，经典与量子的分歧全都发生在势的跃变处——它们是"快速变化"的示意。正是在这些地方，波长不再能忽略，波动性才显露出来。`}</Tx>
          <Derivation title="补充：势阶的反射与透射概率（定量版本）" collapsed steps={[
{ tex: R`\varphi(x)=\mathrm e^{ik_1x}+\sym{ramp}{r}\,\mathrm e^{-ik_1x}\ (x<x_1),\qquad \varphi(x)=\tau\,\mathrm e^{ik_2x}\ (x>x_1)`, why: R`取 $x_1=0$。$k_1=\sqrt{2mE}/\hbar$，$k_2=\sqrt{2m(E-V_0)}/\hbar$（$E>V_0$）。左边是入射加反射，右边只有透射。` },
{ tex: R`1+\sym{ramp}{r}=\tau,\qquad k_1(1-\sym{ramp}{r})=k_2\,\tau`, why: R`$\varphi$ 与 $\varphi'$ 在 $x=0$ 连续（§D-2-b）。` },
{ tex: R`\sym{ramp}{r}=\frac{k_1-k_2}{k_1+k_2},\qquad \tau=\frac{2k_1}{k_1+k_2}`, why: R`解这两个线性方程。与光学中正入射的 Fresnel 公式 $\sym{ramp}{r}=(n_1-n_2)/(n_1+n_2)$ 完全一样——因为 $k\propto n$。` },
{ tex: R`R=|\sym{ramp}{r}|^2=\left(\frac{k_1-k_2}{k_1+k_2}\right)^2,\qquad T=\frac{k_2}{k_1}|\tau|^2=\frac{4k_1k_2}{(k_1+k_2)^2}`, why: R`反射、透射概率按概率流计算（流 $\propto k|\text{振幅}|^2$），$R+T=1$。即使 $E>V_0$，$R\neq0$——原书所说的"粒子有一定概率 $\mathscr P=R$ 被反射"。$E<V_0$ 时 $k_2$ 为纯虚，$|\sym{ramp}{r}|=1$：全反射。` },
]} result={R`例如 $E=2V_0$：$k_2/k_1=1/\sqrt2$，$R=\left(\frac{\sqrt2-1}{\sqrt2+1}\right)^2\approx0.029$。交互图中的曲线由同样的匹配条件逐界面计算得到。`} />
        </Sub>
      </Sub>
    </Sec>);
}

export function Conclusion() {
  return (
    <Block id="conclusion" toc="结论" kicker="Conclusion" title="结论：量子描述与经典描述">
      <Tx>{R`**本章做成了什么。**我们没有给出任何严格的公理（那是第 III 章的任务），而是让一系列实验逼出了量子力学的基本语言。现在可以把它与经典描述并排比较——就用引言里那张对照表的几行。

**态。**一个经典粒子在某一时刻由 $\mathbf r(t)$ 与 $\mathbf v(t)$ 六个数完全确定，能量、动量、角动量都由它们算出。量子粒子则需要整个函数 $\psi(\mathbf r,t)$，即空间每一点一个复数。

**演化。**Newton 方程对时间二阶，所以初始时刻要给出 $\mathbf r$ 和 $\mathbf v$；Schrödinger 方程对时间一阶，给出 $\psi(\mathbf r,0)$ 就够了。后者是线性的，叠加原理带来了一切波动效应。

**预言。**经典力学预言测量的确定结果；量子力学只预言各种结果的**概率**。

**为什么要接受这些。**这不是哲学偏好，而是实验的要求：原子尺度上物质的结构与行为在经典框架里根本无法理解。我们付出了简单性的代价，换来了一种统一——物质与辐射服从同一套波粒二象性的规则。这套规则与宏观直觉格格不入，却是**自洽**的：迄今没有人设计出能绕过不确定关系的实验（补充材料 D_I 讨论了一个著名的尝试），也没有任何观测与量子力学的基本原理相矛盾。不过故事并没有完结：引力（广义相对论）至今尚未与量子理论融为一体，新的剧变并非不可能。`}</Tx>
    </Block>);
}
