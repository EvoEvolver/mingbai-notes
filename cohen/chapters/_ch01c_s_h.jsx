// 补充材料 H_I：一维方势中的定态（式 HI-1 … HI-58）
import { Sec, Sub, Tx, Eq, Box, Derivation, C, FormulaMap } from "@kit";
import { FM_HI_7 } from "./_ch01c_fmaps.jsx";
import { BarrierPlot, StepRTPlot, WellGraphic } from "./_ch01c_plots.jsx";
import { PotentialSketch } from "./_ch01c_figs.jsx";

const R = String.raw;
const K0W = R`\sym{k0w}{k_0}`;      // H_I 式 (45) 的 k_0
const V1W = R`\sym{V1w}{V_1}`;      // H_I 式 (50) 的 V_1
const AA = R`A_1'`, A2P = R`A_2'`;

export function SecH() {
  return (
    <Sec n="HI" title="Stationary states of a particle in one-dimensional square potentials" zh="一维方势中的定态"
      gist={R`方势中每一段 $V$ 为常数，解是 $\mathrm e^{\pm ikx}$ 或 $\mathrm e^{\pm\rho x}$；在跳变点要求 $\varphi$ 与 $\varphi'$ 连续，就能"拼"出全部定态：势阶的部分 / 全反射、势垒的共振与隧穿、方势阱的能级量子化。`}
      why={R`方势是量子力学里最常用的"玩具模型"：数学最简单，却把反射、隧穿、共振、量子化这些纯量子效应全部展示出来；后面许多补充材料与习题都直接使用这里的结果。`}
      gives={["HI-8", "HI-17", "HI-18", "HI-22", "HI-29", "HI-30", "HI-31", "HI-42", "HI-47a", "HI-58"]}>
      <p className="muted">本节概念：<C id="matching" /> · <C id="tunnel" /> · <C id="quantization" /></p>
      <Tx>{R`**这一节要做什么。**方势（square potential）是"把势能做成台阶"的理想化：在大部分地方 $V$ 是常数，只在几个点突然跳变。它的价值在于，最有代表性的量子效应——能量够却被弹回、能量不够却穿过去、束缚粒子只能取分立能量——在这里都能用初等函数精确算出来。正文 \mainsec{D-2} 曾借光学类比猜出过解的样子，这里把账算清楚。

整节只有一个方法，下面先把它讲透（§1），然后把它用在势阶、势垒、势阱上（§2）。所有模型都是一维的——按 $\mathrm{F}_{\rm I}$，这意味着粒子在只依赖 $x$ 的势中运动，严格成立。`}</Tx>

      <Sub n="HI-1" title={R`Behavior of a stationary wave function $\varphi(x)$`} zh="定态波函数的行为">
        <Tx>{R`**1-a 势能为常数的区域。**方势在某些区域里 $V(x)=V$ 为常数。在这样的区域中，正文的本征方程 \mainref{D-8} 变为`}</Tx>
        <Eq n="HI-1" title="常数势区中的本征方程" say={R`在势能为常数 $V$ 的区域里，定态方程是常系数二阶方程：$E>V$ 时解振荡，$E<V$ 时解指数增长或衰减。`}>{R`\frac{\mathrm d^2}{\mathrm dx^2}\varphi(x)+\frac{2m}{\hbar^2}(E-V)\,\varphi(x)=0`}</Eq>
        <Tx>{R`按 $E$ 与 $V$ 的大小分三种情形。

**(i) $E>V$（经典允许区）。**引入正常数 $k$：`}</Tx>
        <Eq n="HI-2" say={R`经典允许区里，超出势能的那部分能量就是动能 $\hbar^2k^2/2m$，由此定义波数 $k$。`}>{R`E-V=\frac{\hbar^2k^2}{2m}`}</Eq>
        <Tx>{R`方程 \eqref{HI-1} 的解为`}</Tx>
        <Eq n="HI-3" say={R`允许区的解是向右（$\mathrm e^{ikx}$）与向左（$\mathrm e^{-ikx}$）传播的两列平面波的叠加。`}>{R`\varphi(x)=A\,\mathrm e^{ikx}+A'\,\mathrm e^{-ikx}`}</Eq>
        <Tx>{R`$A,A'$ 为复常数。

**(ii) $E<V$（经典禁区）。**按经典力学粒子根本到不了这里。引入正常数 $\rho$：`}</Tx>
        <Eq n="HI-4" say={R`禁区里能量“不够”，差额 $V-E$ 定义衰减常数 $\rho$。`}>{R`V-E=\frac{\hbar^2\rho^2}{2m}`}</Eq>
        <Eq n="HI-5" say={R`禁区的解是实指数函数：一个随 $x$ 增长，一个随 $x$ 衰减。`}>{R`\varphi(x)=B\,\mathrm e^{\rho x}+B'\,\mathrm e^{-\rho x}`}</Eq>
        <Tx>{R`$B,B'$ 为复常数。

**(iii) $E=V$。**此时 $\varphi''=0$，$\varphi(x)$ 是 $x$ 的线性函数。`}</Tx>

        <Tx>{R`**1-b 跳变点上会发生什么？**每一段的解都有了，剩下的问题是如何把它们接起来。直觉上，势能突然跳变，波函数也许会跟着出"尖角"甚至断开。事实并非如此：**只要跳变是有限的，$\varphi$ 和 $\varphi'$ 都连续，不连续的只有 $\varphi''$。**

理由可以这样看出来。真实世界没有严格的阶跃，方势应当理解为一个光滑势 $V_\varepsilon(x)$ 的极限：它在 $[x_1-\varepsilon,x_1+\varepsilon]$ 之外与 $V(x)$ 相同，在区间内连续地从一个值过渡到另一个值（正文 \mainsec{D-2-a}）。对这个光滑势，方程是`}</Tx>
        <Eq n="HI-6" say={R`把方势换成光滑的近似势 $V_\varepsilon$ 后写出的定态方程；方势的解应理解为 $\varepsilon\to0$ 时它的解的极限。`}>{R`\frac{\mathrm d^2}{\mathrm dx^2}\varphi_\varepsilon(x)+\frac{2m}{\hbar^2}[E-V_\varepsilon(x)]\varphi_\varepsilon(x)=0`}</Eq>
        <Tx>{R`这里要求 $V_\varepsilon$ 在过渡区内有界，且界不随 $\varepsilon$ 变化。从左侧某个给定解出发向右积分，得到 $\varphi_\varepsilon$；我们想知道 $\varepsilon\to0$ 时它趋于什么。假定 $\varphi_\varepsilon$ 在 $x_1$ 附近保持有界（物理上：概率密度不会在一点爆掉；数学上可以从方程本身证明）。把方程在跳变点周围宽 $2\eta$ 的小区间上积分，二阶导数积成了一阶导数之差：`}</Tx>
        <FormulaMap n="HI-7" say={R`导数在一个小区间两端的差，等于“势能减能量”乘波函数在该区间上的积分。`} tree={FM_HI_7} start="V" />
        <Tx>{R`$\varepsilon\to0$ 时右边的被积函数仍有界，所以 $\eta\to0$ 时积分趋于零：`}</Tx>
        <Eq n="HI-8" keyEq title="导数连续" say={R`只要势能有界，跨过跳变点时波函数的斜率没有跃变：$\varphi'$ 连续，从而 $\varphi$ 也连续。`}>{R`\frac{\mathrm d\varphi}{\mathrm dx}(x_1+\eta)-\frac{\mathrm d\varphi}{\mathrm dx}(x_1-\eta)\underset{\eta\to0}{\longrightarrow}0`}</Eq>
        <Tx>{R`一阶导数不跳，$\varphi$ 作为它的积分当然也不跳。跳的只是二阶导数：从 \eqref{HI-1} 直接读出，跨过 $x_1$ 时 $\varphi''$ 跃变 $\frac{2m}{\hbar^2}\varphi(x_1)\,\sigma_V$（$\sigma_V$ 为势的跳变量）。所以波函数在跳变点处是光滑接上的，只是"弯曲程度"突然改变。`}</Tx>
        <Box kind="warning" title="前提：势必须有界">{R`上面的论证离不开"$V_\varepsilon(x)$ 有界"。例如 $\mathrm{K}_{\rm I}$ 的几道习题考虑 $V(x)=\alpha\,\delta(x)$：它无界但积分有限，这时 $\varphi(x)$ 仍连续，$\mathrm d\varphi/\mathrm dx$ 却**不连续**——\eqref{HI-7} 右边的积分趋于 $\frac{2m}{\hbar^2}\alpha\varphi(0)$ 而不是零。无限高的势壁（见 \eqref{HI-25} 后的评注）同理。`}</Box>
        <Tx>{R`**1-c 计算步骤。**于是求方势定态的办法是：在每个 $V$ 为常数的区域，按情形写成 \eqref{HI-3} 或 \eqref{HI-5}；然后在 $V(x)$ 的每个间断点处要求 $\varphi$ 与 $\mathrm d\varphi/\mathrm dx$ 连续，把各段"拼接"起来。`}</Tx>
      </Sub>

      <Sub n="HI-2" title="Some simple cases" zh="几种简单情形">
        <Tx>{R`**清单。**下面依次处理正文 \mainsec{D-2-c} 提到过的三种势：势阶、势垒、势阱。每种情形都是同一个套路——分区写解、在跳变点拼接、读出物理——但会读出完全不同的物理：反射、隧穿、共振、量子化。顺便也检验光学类比的预言是否准确。`}</Tx>

        <h4 id="sec-HI-2-a">2-a 势阶</h4>
        <PotentialSketch kind="step" />
        <Tx>{R`**$\alpha$. $E>V_0$：部分反射。**令`}</Tx>
        <Eq n="HI-9" say={R`区域 I（$x<0$，势为零）的波数，由总能量 $E$ 决定。`}>{R`\sqrt{\frac{2mE}{\hbar^2}}=k_1`}</Eq>
        <Eq n="HI-10" say={R`区域 II（$x>0$，势为 $V_0$）的波数，由剩余动能 $E-V_0$ 决定，比 $k_1$ 小。`}>{R`\sqrt{\frac{2m(E-V_0)}{\hbar^2}}=k_2`}</Eq>
        <Tx>{R`两个区域 I（$x<0$）、II（$x>0$）中解都具有 \eqref{HI-3} 的形式：`}</Tx>
        <Eq n="HI-11" say={R`左侧区域：向右的入射波加向左的反射波。`}>{R`\varphi_{\rm I}(x)=A_1\,\mathrm e^{ik_1x}+A_1'\,\mathrm e^{-ik_1x}`}</Eq>
        <Eq n="HI-12" say={R`右侧区域：一般也是两列波；后面取 $A_2'=0$，只留向右的透射波。`}>{R`\varphi_{\rm II}(x)=A_2\,\mathrm e^{ik_2x}+A_2'\,\mathrm e^{-ik_2x}`}</Eq>
        <Tx>{R`**少了一个条件？**未知的比值有三个（$${AA}/A_1$、$A_2/A_1$、$${A2P}/A_1$），$x=0$ 处的拼接条件却只有两个。这并非方程不够，而是物理上还没说清"粒子从哪边来"。指定粒子从左方入射，右侧就不该有向左跑的波，即 $${A2P}=0$。剩下两个未知数、两个方程：`}</Tx>
        <Derivation title="x = 0 处的拼接" steps={[
          { tex: R`A_1+A_1'=A_2`, why: R`$\varphi$ 连续。` },
          { tex: R`k_1(A_1-A_1')=k_2A_2`, why: R`$\varphi'$ 连续（两边约去 $i$）。` },
          { tex: R`A_1-A_1'=\frac{k_2}{k_1}(A_1+A_1')\ \Rightarrow\ \frac{A_1'}{A_1}=\frac{k_1-k_2}{k_1+k_2},\quad \frac{A_2}{A_1}=1+\frac{A_1'}{A_1}=\frac{2k_1}{k_1+k_2}`, why: R`消去 $A_2$ 后解出两个比值。` },
        ]} />
        <Eq n="HI-13" title="势阶的反射振幅" say={R`反射波与入射波的振幅比为实数 $(k_1-k_2)/(k_1+k_2)$：反射时没有相位延迟。`}>{R`\frac{A_1'}{A_1}=\frac{k_1-k_2}{k_1+k_2}`}</Eq>
        <Eq n="HI-14" say={R`透射波与入射波的振幅比，同样是实数，且大于 1。`}>{R`\frac{A_2}{A_1}=\frac{2k_1}{k_1+k_2}`}</Eq>
        <Tx>{R`**怎样把振幅变成概率？**左侧的 $\mathrm e^{ik_1x}$ 是动量 $+\hbar k_1$ 的入射粒子，$\mathrm e^{-ik_1x}$ 是动量 $-\hbar k_1$ 的反射粒子；右侧只剩透射粒子。反射、透射的概率要用概率流来定义（第 III 章 §D-1-c-$\beta$，另见 $\mathrm{B}_{\rm III}$ §2）：流 $=$ 密度 $\times$ 速度。左右两侧粒子速度不同，所以透射系数要带上速度比：`}</Tx>
        <Eq n="HI-15" say={R`反射系数就是反射振幅比的模平方。`}>{R`R=\left|\frac{A_1'}{A_1}\right|^2`}</Eq>
        <Eq n="HI-16" say={R`透射系数除了振幅比的模平方，还要乘速度比 $k_2/k_1$：透射一侧粒子走得慢，同样的通量对应更大的振幅。`}>{R`T=\frac{k_2}{k_1}\left|\frac{A_2}{A_1}\right|^2`}</Eq>
        <Tx>{R`（$T$ 中因子 $k_2/k_1$ 的物理来源在 $\mathrm{J}_{\rm I}$ §2 中用波包讨论：透射波包被"压窄"了。）代入 \eqref{HI-13}、\eqref{HI-14}：`}</Tx>
        <Eq n="HI-17" say={R`势阶的反射系数：两侧波数差别越大，反射越强。`}>{R`R=1-\frac{4k_1k_2}{(k_1+k_2)^2}`}</Eq>
        <Eq n="HI-18" keyEq title="势阶的透射系数" say={R`势阶的透射系数 $4k_1k_2/(k_1+k_2)^2$：能量远高于台阶时趋于 1，能量刚过台阶时趋于 0。`}>{R`T=\frac{4k_1k_2}{(k_1+k_2)^2}`}</Eq>
        <Tx>{R`**读出物理。**$R+T=1$，概率守恒。最反直觉的一点是 $R\neq0$：能量明明足以越过台阶，粒子却有一定概率被弹回——光从光密介质射向光疏介质时界面也会部分反射，这正是正文光学类比的内容。另外，\eqref{HI-13}、\eqref{HI-14} 都是**实数**：反射与透射都不引入相位延迟，$\mathrm{J}_{\rm I}$ 会看到这意味着波包反射、透射时都"不耽搁"。最后看极限：$E\gg V_0$ 时 $k_2\to k_1$，$T\to1$，台阶仿佛不存在；$E\to V_0^+$ 时 $k_2\to0$，$T\to0$。`}</Tx>
        <StepRTPlot />

        <Tx>{R`**$\beta$. $E<V_0$：全反射。**把 \eqref{HI-10}、\eqref{HI-12} 换成`}</Tx>
        <Eq n="HI-19" say={R`台阶右侧是禁区，用衰减常数 $\rho_2$ 代替波数。`}>{R`\sqrt{\frac{2m(V_0-E)}{\hbar^2}}=\rho_2`}</Eq>
        <Eq n="HI-20" say={R`台阶右侧的解是增长与衰减两个实指数之和。`}>{R`\varphi_{\rm II}(x)=B_2\,\mathrm e^{\rho_2x}+B_2'\,\mathrm e^{-\rho_2x}`}</Eq>
        <Tx>{R`$x\to+\infty$ 时解必须有界，所以`}</Tx>
        <Eq n="HI-21" say={R`为使波函数在右方无穷远处不发散，增长的指数项必须去掉。`}>{R`B_2=0`}</Eq>
        <Tx>{R`$x=0$ 处的拼接条件（与 $\alpha$ 中完全相同，只是把 $ik_2$ 换成 $-\rho_2$）给出`}</Tx>
        <Eq n="HI-22" title="全反射的反射振幅" say={R`反射振幅比变成模为 1 的复数：全部反射，但带一个相移。`}>{R`\frac{A_1'}{A_1}=\frac{k_1-i\rho_2}{k_1+i\rho_2}`}</Eq>
        <Eq n="HI-23" say={R`禁区中衰减波（倏逝波）的振幅。`}>{R`\frac{B_2'}{A_1}=\frac{2k_1}{k_1+i\rho_2}`}</Eq>
        <Tx>{R`反射系数为`}</Tx>
        <Eq n="HI-24" say={R`分子分母互为共轭，模相等：反射系数恰为 1，全反射。`}>{R`R=\left|\frac{A_1'}{A_1}\right|^2=\left|\frac{k_1-i\rho_2}{k_1+i\rho_2}\right|^2=1`}</Eq>
        <Tx>{R`**和经典的同与不同。**$R=1$：与经典一样，粒子全数折返。但有两处经典力学里没有的东西。第一，禁区里的波函数不为零，而是衰减的**倏逝波** $\mathrm e^{-\rho_2x}$——粒子有一定概率出现在台阶内深约 $1/\rho_2$ 的一层里。第二，反射振幅 \eqref{HI-22} 是模为 1 的**复数**，反射带一个相移。光在金属表面反射时也有类似相移，但经典粒子没有对应物。$\mathrm{J}_{\rm I}$ 将说明，这个相移随能量的变化意味着粒子在禁区里"逗留"了一会儿才折返（另见 $\mathrm{B}_{\rm III}$ §3）。`}</Tx>
        <Box kind="note" title="评注：无限高的台阶">{R`当 $V_0\to+\infty$，$\rho_2\to+\infty$，\eqref{HI-22}、\eqref{HI-23} 给出`}</Box>
        <Eq n="HI-25" say={R`台阶无限高时，反射波与入射波反相，禁区中的波消失。`}>{R`\begin{cases}A_1'\longrightarrow-A_1\\ B_2'\longrightarrow0\end{cases}`}</Eq>
        <Tx>{R`倏逝层的厚度 $1/\rho_2\to0$，禁区里什么也没有了。注意 $A_1+A_1'\to0$：波函数在壁上为零，所以 $\varphi$ 依然连续；但斜率从左侧的 $2ik_1A_1$ 一下跳到零——**导数不再连续**。这不与 §1-b 矛盾：那里的论证需要势有界，而无限高的壁让 \eqref{HI-7} 右边的积分不再趋于零。由此得到一条实用规则：**无限高的壁上 $\varphi=0$**，无限深势阱马上要用到。`}</Tx>

        <h4 id="sec-HI-2-b">2-b 方势垒</h4>
        <PotentialSketch kind="barrier" />
        <Tx>{R`**$\alpha$. $E>V_0$：共振。**现在有两个跳变点，三个区域。（$V_0$ 取负值时就是一个有限宽的势阱，下面的公式照用。）每个区域都是振荡解：`}</Tx>
        <Eq n="HI-26a" say={R`势垒左侧：入射波加反射波。`}>{R`\varphi_{\rm I}(x)=A_1\,\mathrm e^{ik_1x}+A_1'\,\mathrm e^{-ik_1x}`}</Eq>
        <Eq n="HI-26b" say={R`势垒内部：两列波数为 $k_2$ 的波来回反射。`}>{R`\varphi_{\rm II}(x)=A_2\,\mathrm e^{ik_2x}+A_2'\,\mathrm e^{-ik_2x}`}</Eq>
        <Eq n="HI-26c" say={R`势垒右侧：一般解；取 $A_3'=0$ 后只剩透射波。`}>{R`\varphi_{\rm III}(x)=A_3\,\mathrm e^{ik_1x}+A_3'\,\mathrm e^{-ik_1x}`}</Eq>
        <Tx>{R`仍设粒子从左方入射，$A_3'=0$。拼接时有个省事的顺序：**从右往左**。在 $x=l$ 处用 $A_3$ 表出 $A_2,${A2P}$；再在 $x=0$ 处用它们表出 $A_1,${AA}$。整理后：`}</Tx>
        <Eq n="HI-27" say={R`入射波与反射波的振幅都正比于透射振幅 $A_3$；括号里的三角函数反映了势垒内两列波的干涉。`}>{R`\begin{aligned}A_1&=\left[\cos k_2l-i\frac{k_1^2+k_2^2}{2k_1k_2}\sin k_2l\right]\mathrm e^{ik_1l}A_3\\ A_1'&=i\frac{k_2^2-k_1^2}{2k_1k_2}\sin k_2l\ \mathrm e^{ik_1l}A_3\end{aligned}`}</Eq>
        <Tx>{R`（这两个式子已用逐点数值拼接核对。）由 $${AA}/A_1$ 与 $A_3/A_1$ 算出势垒的反射系数与透射系数：`}</Tx>
        <Eq n="HI-28a" say={R`势垒的反射系数：$\sin k_2l=0$ 时为零。`}>{R`R=\left|\frac{A_1'}{A_1}\right|^2=\frac{(k_1^2-k_2^2)^2\sin^2k_2l}{4k_1^2k_2^2+(k_1^2-k_2^2)^2\sin^2k_2l}`}</Eq>
        <Eq n="HI-28b" say={R`势垒的透射系数：两侧波数相同，所以不需要速度比因子。`}>{R`T=\left|\frac{A_3}{A_1}\right|^2=\frac{4k_1^2k_2^2}{4k_1^2k_2^2+(k_1^2-k_2^2)^2\sin^2k_2l}`}</Eq>
        <Tx>{R`容易验证 $R+T=1$。用 \eqref{HI-9}、\eqref{HI-10} 改写为能量：`}</Tx>
        <Eq n="HI-29" title="越垒透射系数" say={R`能量高于势垒时，透射系数随势垒宽度振荡：势垒宽度是半波长的整数倍时 $T=1$（共振），其余时候部分反射。`}>{R`T=\frac{4E(E-V_0)}{4E(E-V_0)+V_0^2\sin^2\left[\sqrt{2m(E-V_0)}\,l/\hbar\right]}`}</Eq>
        <Tx>{R`**共振。**固定能量、改变宽度 $l$：$\sin^2(k_2l)$ 让 $T$ 在 $\left[1+\frac{V_0^2}{4E(E-V_0)}\right]^{-1}$ 与 1 之间周期往返。每当 $k_2l=n\pi$——势垒宽度是区域 II 中半波长的整数倍——$T=1$，势垒变得完全透明。

为什么是半波长？$E>V_0$ 时在两个界面上的反射都不带相移（§2-a-$\alpha$），在 $x=0$ 与 $x=l$ 反射回来的两列波的相位差只由往返程 $2k_2l$ 决定；$k_2l=n\pi$ 时它们相消，总反射为零——也就是区域 II 能容纳驻波的条件。这与光学中 Fabry–Perot 标准具的透射峰完全同理。远离共振时，区域 II 中来回反射的波彼此抵消，波函数在势垒内很小。若用波包来看（仿照 $\mathrm{J}_{\rm I}$），共振时波包会在势垒内滞留较长时间，这在量子力学里叫做**共振散射**（resonance scattering）。`}</Tx>

        <Tx>{R`**$\beta$. $E<V_0$：隧道效应。**把 \eqref{HI-26b} 换成 \eqref{HI-20}，$\rho_2$ 仍由 \eqref{HI-19} 给出。无需重算：只要在 $\alpha$ 的结果中把 $k_2$ 换成 $-i\rho_2$（$\sin k_2l\to-i\sinh\rho_2l$，$k_2^2\to-\rho_2^2$）：`}</Tx>
        <Eq n="HI-30" keyEq title="隧穿透射系数" say={R`能量低于势垒时透射系数不为零：粒子以隧道效应穿过经典上不可逾越的势垒，概率由 $\sinh^2(\rho_2l)$ 控制。`}>{R`T=\left|\frac{A_3}{A_1}\right|^2=\frac{4E(V_0-E)}{4E(V_0-E)+V_0^2\sinh^2\left[\sqrt{2m(V_0-E)}\,l/\hbar\right]}`}</Eq>
        <Tx>{R`当然 $R=1-T$。当 $\rho_2l\gg1$（宽而高的势垒），$\sinh\rho_2l\simeq\frac12\mathrm e^{\rho_2l}$：`}</Tx>
        <Eq n="HI-31" title="厚势垒的隧穿概率" say={R`厚势垒的隧穿概率按 $\mathrm e^{-2\rho_2l}$ 指数衰减：宽度或质量稍大一点，概率就锐减。`}>{R`T\simeq\frac{16E(V_0-E)}{V_0^2}\,\mathrm e^{-2\rho_2l}`}</Eq>
        <Tx>{R`**为什么能穿过去？**区域 II 中的解不是零，而是射程 $1/\rho_2$ 的倏逝波；只要势垒宽度 $l$ 不比射程大太多，它到达另一侧时还剩可观的振幅，并在那里重新变成行波。$l\lesssim1/\rho_2$ 时隧穿概率可以接近 1，厚势垒时则按 \eqref{HI-31} 指数地小。这种"指数敏感"正是隧道效应应用广泛的原因：氨分子的翻转（补充材料 $\mathrm{G}_{\rm IV}$）、隧道二极管、Josephson 结、核的 $\alpha$ 衰变、扫描隧道显微镜……

**估个数。**对电子，射程为`}</Tx>
        <Eq n="HI-32" say={R`电子的倏逝波射程约为 1.96 埃除以 $\sqrt{V_0-E}$（能量以电子伏计）。`}>{R`\left(\frac1{\rho_2}\right)_{el}\simeq\frac{1.96}{\sqrt{V_0-E}}\ \mathrm{\mathring A}`}</Eq>
        <Tx>{R`其中 $E$、$V_0$ 以电子伏计（只要在 $\mathrm{A}_{\rm I}$ 式 \eqref{AI-8} 里把 $\lambda=2\pi/k$ 换成 $2\pi/\rho_2$ 即得：$12.3/2\pi\simeq1.96$）。设能量 1 eV 的电子遇到 $V_0=2\,\mathrm{eV}$、$l=1\,\mathrm{\mathring A}$ 的势垒：射程 1.96 Å，与 $l$ 同量级，电子应当有相当大的概率穿过。\eqref{HI-30} 给出`}</Tx>
        <Eq n="HI-33" say={R`1 eV 电子穿过 2 eV、1 埃宽的势垒，透射概率约 0.78。`}>{R`T\simeq0.78`}</Eq>
        <Tx>{R`经典答案是 0，量子答案约 0.8：这不是小修正，而是质的不同。

**换成质子**（质量约为电子的 1840 倍），射程缩短 $\sqrt{1840}\approx43$ 倍：`}</Tx>
        <Eq n="HI-34" say={R`质子的射程缩短为电子的 $1/\sqrt{1840}$，约 0.046 埃（对 $V_0-E=1$ eV）。`}>{R`\left(\frac1{\rho_2}\right)_{pr}\simeq\frac{1.96}{\sqrt{1\,840(V_0-E)}}\ \mathrm{\mathring A}\simeq\frac{4.6}{\sqrt{V_0-E}}\ 10^{-2}\ \mathrm{\mathring A}`}</Eq>
        <Tx>{R`同样取 $E=1\,\mathrm{eV}$、$V_0=2\,\mathrm{eV}$、$l=1\,\mathrm{\mathring A}$，射程 $1/\rho_2$ 远小于 $l$，\eqref{HI-31} 给出`}</Tx>
        <Eq n="HI-35" say={R`同样条件下质子的隧穿概率只有约 $10^{-19}$ 量级，完全可以忽略。`}>{R`T\simeq4\times10^{-19}`}</Eq>
        <Box kind="note" title="数值核对">{R`按 \eqref{HI-30} 精确计算：电子 $T=0.7775$；质子（取 $m_p=1840\,m_e$）$T\simeq3.3\times10^{-19}$，与 \eqref{HI-31} 的近似值一致。原书的 "$4\times10^{-19}$" 是量级取整的结果，结论不变：质子穿过这个势垒的概率可以忽略。把 \eqref{HI-31} 用到宏观物体上，得到的概率小到在任何物理现象中都不可能起作用。`}</Box>
        <BarrierPlot />

        <h4 id="sec-HI-2-c">2-c 束缚态：方势阱</h4>
        <Tx>{R`**$\alpha$. 有限深势阱。**`}</Tx>
        <PotentialSketch kind="well" />
        <Tx>{R`只研究 $-V_0<E<0$（$E>0$ 的情形已包含在 §2-b-$\alpha$ 中，取 $V_0<0$ 即可）。在区域 I $\left(x<-\frac a2\right)$、II $\left(-\frac a2\leqslant x\leqslant\frac a2\right)$、III $\left(x>\frac a2\right)$ 中分别有`}</Tx>
        <Eq n="HI-36a" say={R`阱左侧（禁区）：增长与衰减的指数。`}>{R`\varphi_{\rm I}(x)=B_1\,\mathrm e^{\rho x}+B_1'\,\mathrm e^{-\rho x}`}</Eq>
        <Eq n="HI-36b" say={R`阱内（允许区）：两列相向的平面波。`}>{R`\varphi_{\rm II}(x)=A_2\,\mathrm e^{ikx}+A_2'\,\mathrm e^{-ikx}`}</Eq>
        <Eq n="HI-36c" say={R`阱右侧（禁区）：增长与衰减的指数。`}>{R`\varphi_{\rm III}(x)=B_3\,\mathrm e^{\rho x}+B_3'\,\mathrm e^{-\rho x}`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="HI-37" say={R`阱外禁区的衰减常数，由束缚能 $-E$ 决定。`}>{R`\rho=\sqrt{-\frac{2mE}{\hbar^2}}`}</Eq>
        <Eq n="HI-38" say={R`阱内的波数，由在阱底之上的动能 $E+V_0$ 决定。`}>{R`k=\sqrt{\frac{2m(E+V_0)}{\hbar^2}}`}</Eq>
        <Tx>{R`$\varphi$ 在区域 I（$x\to-\infty$）必须有界：`}</Tx>
        <Eq n="HI-39" say={R`左方无穷远处有界，去掉 $\mathrm e^{-\rho x}$ 项。`}>{R`B_1'=0`}</Eq>
        <Tx>{R`$x=-a/2$ 处的拼接条件给出`}</Tx>
        <Eq n="HI-40" say={R`由左边界的拼接，阱内两列波的振幅都用 $B_1$ 表出。`}>{R`\begin{aligned}A_2&=\mathrm e^{(-\rho+ik)a/2}\ \frac{\rho+ik}{2ik}\ B_1\\ A_2'&=-\,\mathrm e^{-(\rho+ik)a/2}\ \frac{\rho-ik}{2ik}\ B_1\end{aligned}`}</Eq>
        <Tx>{R`$x=a/2$ 处的拼接条件给出`}</Tx>
        <Eq n="HI-41" say={R`再由右边界的拼接，右侧的增长项系数 $B_3$ 与衰减项系数 $B_3'$ 也用 $B_1$ 表出。`}>{R`\begin{aligned}\frac{B_3}{B_1}&=\frac{\mathrm e^{-\rho a}}{4ik\rho}\left[(\rho+ik)^2\,\mathrm e^{ika}-(\rho-ik)^2\,\mathrm e^{-ika}\right]\\ \frac{B_3'}{B_1}&=\frac{\rho^2+k^2}{2k\rho}\sin ka\end{aligned}`}</Eq>
        <Tx>{R`（\eqref{HI-40}、\eqref{HI-41} 已用数值逐点验证两端的 $\varphi$、$\varphi'$ 连续。）但 $\varphi$ 在区域 III（$x\to+\infty$）也必须有界，所以必须 $B_3=0$，即`}</Tx>
        <Eq n="HI-42" keyEq title="束缚态量子化条件" say={R`两侧同时有界的要求只能在特定能量下满足：这就是能量量子化的来源。`}>{R`\left(\frac{\rho-ik}{\rho+ik}\right)^2=\mathrm e^{2ika}`}</Eq>
        <Tx>{R`**量子化从哪里来。**左边的有界性已经用掉了一个自由度，拼到右边时一般会冒出增长项 $B_3\mathrm e^{\rho x}$。它能否恰好为零，取决于 $\rho$ 与 $k$——也就是取决于 $E$。所以 \eqref{HI-42} 是一个关于 $E$ 的超越方程，只在分立的值上成立：**束缚态的能量量子化，不是额外假设，而是"两侧都有界"这个要求的后果。**

把 \eqref{HI-42} 开平方，有正负两种情形，分别对应偶态与奇态。

**(i) 偶态。**取`}</Tx>
        <Eq n="HI-43" say={R`量子化条件开平方的第一种取法（负号），对应偶宇称的束缚态。`}>{R`\frac{\rho-ik}{\rho+ik}=-\,\mathrm e^{ika}`}</Eq>
        <Tx>{R`则有`}</Tx>
        <Eq n="HI-44" say={R`偶态条件：阱外衰减常数与阱内波数之比等于 $\tan(ka/2)$。`}>{R`\frac\rho k=\tan\left(\frac{ka}{2}\right)`}</Eq>
        <Derivation collapsed title="由 (HI-43) 推出 (HI-44)" steps={[
          { tex: R`\rho-ik=-\mathrm e^{ika}(\rho+ik)\ \Rightarrow\ \rho\,(1+\mathrm e^{ika})=ik\,(1-\mathrm e^{ika})`, why: R`去分母、整理。` },
          { tex: R`\frac{\rho}{k}=i\,\frac{1-\mathrm e^{ika}}{1+\mathrm e^{ika}}=i\,\frac{-2i\sin(ka/2)}{2\cos(ka/2)}=\tan\frac{ka}{2}`, why: R`分子分母同提 $\mathrm e^{ika/2}$。` },
        ]} />
        <Tx>{R`令`}</Tx>
        <Eq n="HI-45" say={R`把势阱深度换算成一个波数 $k_0$；$k$ 与 $\rho$ 恰好落在半径为 $k_0$ 的圆上。`}>{R`${K0W}=\sqrt{\frac{2mV_0}{\hbar^2}}=\sqrt{k^2+\rho^2}`}</Eq>
        <Tx>{R`于是`}</Tx>
        <Eq n="HI-46" say={R`用 $\tan(ka/2)=\rho/k$ 和 $k^2+\rho^2=k_0^2$，把条件化成只含 $k$ 的形式。`}>{R`\frac1{\cos^2\left(\dfrac{ka}{2}\right)}=1+\tan^2\frac{ka}{2}=\frac{k^2+\rho^2}{k^2}=\left(\frac{${K0W}}{k}\right)^2`}</Eq>
        <Tx>{R`因此 \eqref{HI-43} 等价于方程组`}</Tx>
        <Eq n="HI-47a" title="偶态能级（图解条件）" say={R`偶态能级由直线 $k/k_0$ 与 $|\cos(ka/2)|$ 曲线的交点给出。`}>{R`\left|\cos\left(\frac{ka}{2}\right)\right|=\frac{k}{${K0W}}`}</Eq>
        <Eq n="HI-47b" say={R`只取 $\tan(ka/2)$ 为正的那些弧段，以保证 $\rho>0$。`}>{R`\tan\left(\frac{ka}{2}\right)>0`}</Eq>
        <Tx>{R`**图解。**横轴取 $k$，画一条斜率 $1/${K0W}$、在 $k=${K0W}$ 处到达 1 的直线，再画 $|\cos(ka/2)|$ 中 $\tan(ka/2)>0$ 的那些弧段（下图蓝色）；交点就是偶态能级。"偶"可以直接验证：把 \eqref{HI-43} 代入 \eqref{HI-40}、\eqref{HI-41}，得到 $B_3'=B_1$、$A_2=${A2P}$，于是 $\varphi(-x)=\varphi(x)$。

**(ii) 奇态。**取另一个符号，`}</Tx>
        <Eq n="HI-48" say={R`量子化条件开平方的另一种取法（正号），对应奇宇称的束缚态。`}>{R`\frac{\rho-ik}{\rho+ik}=\mathrm e^{ika}`}</Eq>
        <Tx>{R`同类计算给出`}</Tx>
        <Eq n="HI-49a" say={R`奇态能级由直线 $k/k_0$ 与 $|\sin(ka/2)|$ 曲线的交点给出。`}>{R`\left|\sin\left(\frac{ka}{2}\right)\right|=\frac{k}{${K0W}}`}</Eq>
        <Eq n="HI-49b" say={R`只取 $\tan(ka/2)$ 为负的弧段。`}>{R`\tan\left(\frac{ka}{2}\right)<0`}</Eq>
        <Tx>{R`能级由同一条直线与另一组弧线（下图红色弧段）的交点决定，介于 (i) 的能级之间；对应的波函数是**奇**的。`}</Tx>
        <WellGraphic />
        <Box kind="note" title="评注：束缚态的数目">
          <Tx>{R`若 $${K0W}\leqslant\pi/a$，即`}</Tx>
          <Eq n="HI-50" say={R`阱深不超过 $V_1=\pi^2\hbar^2/2ma^2$ 时只有一个（偶）束缚态；但无论多浅，至少总有一个。`}>{R`V_0\leqslant${V1W}=\frac{\pi^2\hbar^2}{2ma^2}`}</Eq>
          <Tx>{R`直线只与第一段蓝色弧相交，所以只有一个偶束缚态——但**无论阱多浅，这一个总是存在**（直线从原点出发，弧段从 1 开始下降，必然相交）。$k_0a$ 越过 $\pi$（$V_0\geqslant${V1W}$）出现第一个奇态，越过 $2\pi$（$V_0\geqslant4${V1W}$）出现第二个偶态，偶奇交替。深阱 $V_0\gg${V1W}$ 时直线几乎贴着横轴，低能级的交点几乎落在弧段的零点上：`}</Tx>
          <Eq n="HI-51" say={R`深阱的低能级：阱宽几乎容纳整数个半波长。`}>{R`k=\frac{n\pi}{a}`}</Eq>
          <Tx>{R`其中 $n$ 为整数，从而`}</Tx>
          <Eq n="HI-52" say={R`深阱低能级的能量：无限深阱的能级再减去阱深 $V_0$。`}>{R`E=\frac{n^2\pi^2\hbar^2}{2ma^2}-V_0`}</Eq>
        </Box>

        <Tx>{R`**$\beta$. 无限深势阱。**设 $V(x)$ 在 $0<x<a$ 内为零，其余处为无穷大。令`}</Tx>
        <Eq n="HI-53" say={R`阱内的波数，由能量 $E$ 决定。`}>{R`k=\sqrt{\frac{2mE}{\hbar^2}}`}</Eq>
        <Tx>{R`按 §2-a-$\beta$ 末的评注，$\varphi(x)$ 在 $[0,a]$ 之外为零，并在 $x=0$、$x=a$ 处连续。在 $0\leqslant x\leqslant a$ 内：`}</Tx>
        <Eq n="HI-54" say={R`阱内是两列相向平面波的叠加。`}>{R`\varphi(x)=A\,\mathrm e^{ikx}+A'\,\mathrm e^{-ikx}`}</Eq>
        <Tx>{R`由 $\varphi(0)=0$ 得 $A'=-A$，于是`}</Tx>
        <Eq n="HI-55" say={R`左壁处为零的条件把解变成纯正弦驻波。`}>{R`\varphi(x)=2iA\sin kx`}</Eq>
        <Tx>{R`再由 $\varphi(a)=0$：`}</Tx>
        <Eq n="HI-56" say={R`右壁处也为零：阱宽必须恰好容纳整数个半波长。`}>{R`k=\frac{n\pi}{a}`}</Eq>
        <Tx>{R`$n$ 为任意正整数。把 \eqref{HI-55} 归一化并代入 \eqref{HI-56}，得到定态波函数`}</Tx>
        <Eq n="HI-57" title="无限深阱的本征函数" say={R`无限深阱的第 $n$ 个定态是有 $n-1$ 个节点的正弦驻波，前面的常数使其归一。`}>{R`\varphi_n(x)=\sqrt{\frac2a}\sin\left(\frac{n\pi x}{a}\right)`}</Eq>
        <Tx>{R`能量为`}</Tx>
        <Eq n="HI-58" keyEq title="无限深阱的能级" say={R`无限深阱的能级与 $n^2$ 成正比、与阱宽平方成反比：阱越窄，能级越高、间距越大。`}>{R`E_n=\frac{n^2\pi^2\hbar^2}{2ma^2}`}</Eq>
        <Tx>{R`这里能量量子化格外简单。`}</Tx>
        <Box kind="physics" title="两个评注">{R`**(i) 半波长条件只对无限深阱严格成立。**\eqref{HI-56} 说的就是阱宽 $a$ 必须容纳整数个半波长 $\pi/k$。有限深阱（§2-c-$\alpha$）则不然：差别来自波函数在势阶上反射时的相移（§2-a-$\beta$）——有限深阱的波会"漏"进壁里一段，等效阱宽比 $a$ 大，所以能级比 \eqref{HI-52} 略低（见上图中有限阱能级与无限阱能级的比较）。

**(ii) 极限的一致性。**由 \eqref{HI-51}、\eqref{HI-52} 容易验证：有限深阱的深度 $V_0\to\infty$ 时（能量从阱底算起），回到无限深阱的能级。`}</Box>
      </Sub>
    </Sec>);
}
