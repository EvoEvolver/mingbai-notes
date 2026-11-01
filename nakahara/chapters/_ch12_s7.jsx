import { EtaJumpRedraw } from "./_redraw_ch12_14.jsx";
// §12.7 热核与广义 $\zeta$ 函数 + §12.8 Atiyah–Patodi–Singer 指标定理 —— 式 (12.91)–(12.129)，例 12.7–12.8，习题 12.4–12.7，定理 12.3，图 12.1–12.2
import { Sec, Sub, Tx, Eq, Box, Stmt, Exercise, Derivation, Figure, C } from "@kit";
import { HeatKernelS1, SpectralFlowLab } from "./_ch12_demos.jsx";

const R = String.raw;
const NB = R`\sym{slnab}{\not\nabla}`;
const GF = R`\sym{Gam}{\Gamma}`;          // Γ 函数

export function Sec127() {
  return (
    <Sec n="12.7" title="The heat kernel and generalized ζ-functions" zh="热核与广义 $\zeta$ 函数"
      gist={R`热核 $h(t)=\mathrm{e}^{-t\Delta}$：$t\to\infty$ 投影到零模，$t\to0$ 有局部渐近展开 $\sum a_i(x)t^i$ → $\Delta_E=D^\dagger D$ 与 $\Delta_F=DD^\dagger$ 的非零谱相同（"超对称"），所以 $\tilde h_E(t)-\tilde h_F(t)$ 与 $t$ 无关，等于 $\ind D$ → 取 $t\to0$：$\ind D=\int[a_0^E(x)-a_0^F(x)]\dd x$，指标由**局部**曲率不变量给出 → $\zeta$ 函数通过 Mellin 变换与热核相连；$S^1$ 上的例子显示 $\tilde h(t)\sim\sqrt{\pi}\,t^{-1/2}$。`}
      why={R`这是 AS 定理"为什么右边是积分"的分析学解释：指标可以在任意 $t$ 计算，大 $t$ 时它是零模数（整体、解析），小 $t$ 时它是局部量的积分（局部、几何）。这也是第 13 章计算反常的工具。`}
      gives={["12.93", "12.96", "12.98", "12.99", "12.102", "12.105", "12.108", "12.109", "12.112"]}>
      <p className="muted">本节概念：<C id="heat_kernel" /> · <C id="susy_pairing" /></p>
      <Tx>{R`如 §12.2 所述，AS 指标定理有几种证明方法。热核对物理学家来说比较容易接受，而且在物理的其他问题中也有很多应用。广义 $\zeta$ 函数与热核相关，也与物理有关。`}</Tx>

      <Sub n="12.7.1" title="The heat kernel and index theorem" zh="热核与指标定理">
        <Tx>{R`设 $E$ 是 $m$ 维紧流形 $M$ 上的复向量丛。设 $\Delta:\Gamma(M,E)\to\Gamma(M,E)$ 是椭圆算子，其本征向量 $|n\rangle$ 满足`}</Tx>
        <Eq n="12.91" say={R`$\Delta$ 的本征值问题；椭圆性保证谱离散、每个本征空间有限维。`}>{R`\Delta|n\rangle=\lambda_n|n\rangle.`}</Eq>
        <Tx>{R`把 $\Delta$ 的本征值集合记作 $\mathrm{Spec}\,\Delta$。假设 $\Delta$ 非负，即所有本征值非负。设有 $n_0$ 个本征值为零的模式 $|0,i\rangle$，$1\le i\le n_0$。换言之，`}</Tx>
        <Eq n="12.92" say={R`零模的个数。`}>{R`\dim\ker\Delta=n_0.`}</Eq>
        <Tx>{R`这些模式称为**零模**（zero modes）。定义**热核**（heat kernel）$h(t)$ 为`}</Tx>
        <Eq n="12.93" title="热核" say={R`热核：让"温度分布"按 $\Delta$ 扩散时间 $t$ 的演化算符。高本征值的模式衰减得快。`}>{R`h(t)\equiv\mathrm{e}^{-t\Delta}.`}</Eq>
        <Tx>{R`在坐标基中表示 $h(t)$ 比较方便：`}</Tx>
        <Eq n="12.94" say={R`热核的谱表示：每个本征模按 $\mathrm{e}^{-t\lambda_n}$ 衰减，再乘以本征函数的乘积。`}>{R`\begin{aligned}h(x,y;t)\equiv\langle x|h(t)|y\rangle&=\langle x|\sum_n\mathrm{e}^{-t\Delta}|n\rangle\langle n|y\rangle\\&=\sum_n\mathrm{e}^{-t\lambda_n}\langle x|n\rangle\langle n|y\rangle.\end{aligned}`}</Eq>
        <Tx>{R`重根要按重数计算。假设 $\langle x|n\rangle$ 正交归一：$\int\langle n|x\rangle\langle x|m\rangle\dd x=\delta_{mn}$。由于 $\Delta$ 非负，$t>0$ 时 \eqref{12.93} 收敛。取 $t\to\infty$ 的极限，得到`}</Tx>
        <Eq n="12.95" say={R`长时间后只有零模存活：热核变成零模的投影核。`}>{R`\lim_{t\to\infty}h(x,y;t)=\sum_{i=1}^{n_0}\langle x|0,i\rangle\langle0,i|y\rangle`}</Eq>
        <Tx>{R`其中求和只对零模 $|0,i\rangle$ 进行。于是 $h=\mathrm{e}^{-t\Delta}$ 趋于零模空间上的投影算子：`}</Tx>
        <Eq n="12.96" say={R`$t\to\infty$ 时热核是到零模空间的投影。`}>{R`\mathrm{e}^{-t\Delta}\xrightarrow{t\to\infty}\sum_{i=1}^{n_0}|0,i\rangle\langle0,i|.`}</Eq>
        <Tx>{R`定义`}</Tx>
        <Eq n="12.97" say={R`热核的迹：对角元的积分 = 所有 $\mathrm{e}^{-t\lambda_n}$ 之和（"配分函数"）。`}>{R`\tilde h(t)\equiv\int h(x,x;t)\dd x=\sum_n\mathrm{e}^{-t\lambda_n}.`}</Eq>
        <Tx>{R`于是由 \eqref{12.95} 得`}</Tx>
        <Eq n="12.98" say={R`零模个数 = 热核迹的长时间极限。`}>{R`n_0=\lim_{t\to\infty}\tilde h(t).`}</Eq>
        <Tx>{R`容易验证 $h$ 满足**热方程**（heat equation）`}</Tx>
        <Eq n="12.99" say={R`热核满足热方程：对 $t$ 求导等于 $-\Delta$ 作用。`}>{R`\Big(\frac{\partial}{\partial t}+\Delta_x\Big)h(x,y;t)=0.`}</Eq>
        <Tx>{R`若 $\Delta$ 是通常的 Laplace 算子（取正号约定 $\Delta=-\nabla^2$），\eqref{12.99} 化为通常的热方程。初始条件为`}</Tx>
        <Eq n="12.100" say={R`$t=0$ 时热核是 $\delta$ 函数：所有热量集中在一点。`}>{R`h(x,y;0)=\sum_n\langle x|n\rangle\langle n|y\rangle=\delta(x-y)`}</Eq>
        <Tx>{R`最后一个等号来自本征向量的完备性。`}</Tx>
        <Exercise n="12.4" title="热核是热方程的 Green 函数" level="★"
          hint={R`先验证初始条件（用 \eqref{12.100}），再把 $\partial_t+\Delta_x$ 作用到积分号内（用 \eqref{12.99}）。唯一性可以用能量 $\int|u|^2$ 单调不增来说明。`}
          solution={R`令 $v(x,t)\equiv\int h(x,y;t)u(y)\dd y$。

**初始条件**：$v(x,0)=\int\delta(x-y)u(y)\dd y=u(x)$，由 \eqref{12.100}。

**满足热方程**：$(\partial_t+\Delta_x)v=\int[(\partial_t+\Delta_x)h(x,y;t)]u(y)\dd y=0$，由 \eqref{12.99}（$\Delta_x$ 只作用于 $x$，可以移入积分号内）。

**唯一性**：若 $u$ 也满足同样的初值问题，则 $w=u-v$ 满足热方程且 $w(x,0)=0$。$\frac{\dd}{\dd t}\int|w|^2=-2\langle w,\Delta w\rangle\le0$（$\Delta$ 非负），而初值为零，故 $w\equiv0$，即 $u=v$。

也可以用谱展开：$u(x,0)=\sum_nc_n\langle x|n\rangle$ 的解是 $u(x,t)=\sum_nc_n\mathrm{e}^{-t\lambda_n}\langle x|n\rangle$，代入 $c_n=\int\langle n|y\rangle u(y)\dd y$ 并与 \eqref{12.94} 比较即得 \eqref{12.101}。`}>
          <><Tx>{R`设 $u(x,t)$ 是 \eqref{12.99} 的解，满足 $u(x,0)=u(x)$。证明`}</Tx>
          <Eq n="12.101" say={R`热方程的解 = 热核对初值的积分：热核是热方程的 Green 函数。`}>{R`u(x,t)=\int h(x,y;t)u(y)\dd y.`}</Eq>
          <Tx>{R`［提示：先验证 \eqref{12.101} 满足初始条件，再验证它是热方程的解。］`}</Tx></>
        </Exercise>
        <Tx>{R`**小 $t$ 渐近展开。**已知 \eqref{12.99} 的解在 $t=\varepsilon\to0$ 时有渐近展开（见 Gilkey (1984)）`}</Tx>
        <Eq n="12.102" title="热核的渐近展开" say={R`短时间内热量只来得及扩散到很小的邻域，所以对角热核由 $x$ 点附近的局部几何（曲率）决定，按 $t$ 的幂展开。`}>{R`h(x,x;\varepsilon)=\sum_ia_i(x)\varepsilon^i`}</Eq>
        <Tx>{R`同样，$\tilde h(t)$ 有展开`}</Tx>
        <Eq n="12.103" say={R`热核迹的渐近展开，系数是局部系数的积分。`}>{R`\tilde h(\varepsilon)\equiv\sum_ia_i\varepsilon^i`}</Eq>
        <Tx>{R`其中 $a_i=\int a_i(x)\dd x$。（对二阶 Laplace 型算子，求和从 $i=-m/2$ 开始，以 $\frac12$ 为步长；例 12.7 中 $m=1$，展开从 $t^{-1/2}$ 开始。）`}</Tx>
        <Box kind="physics" title="为什么系数是局部的">{R`平直空间 $\R^m$ 上 $h(x,y;t)=(4\pi t)^{-m/2}\mathrm{e}^{-|x-y|^2/4t}$：热量在时间 $t$ 内只扩散 $\sim\sqrt t$ 的距离。在弯曲空间中，$h(x,x;t)=(4\pi t)^{-m/2}[1+\frac{t}{6}R(x)+O(t^2)]$——每一阶修正都是 $x$ 点曲率及其导数的多项式。所以 $a_i(x)$ 是局部不变量。`}</Box>
        <Tx>{R`**指标的热核表示。**设 $E$、$F$ 是 $M$ 上的复向量丛，$D:\Gamma(M,E)\to\Gamma(M,F)$ 是椭圆算子。定义两个 Laplace 算子`}</Tx>
        <Eq n="12.104a" say={R`$E$ 上的 Laplace 型算子 $D^\dagger D$：非负，零模恰为 $\ker D$。`}>{R`\Delta_E\equiv D^\dagger D:\Gamma(M,E)\to\Gamma(M,E)`}</Eq>
        <Eq n="12.104b" say={R`$F$ 上的 Laplace 型算子 $DD^\dagger$：非负，零模恰为 $\ker D^\dagger$。`}>{R`\Delta_F\equiv DD^\dagger:\Gamma(M,F)\to\Gamma(M,F).`}</Eq>
        <Tx>{R`重要的是，它们有**相同的非零本征值**，包括简并度。为看清这一点，设 $\Delta_E|\lambda\rangle=\lambda|\lambda\rangle$。则有向量 $D|\lambda\rangle\in\Gamma(M,F)$ 满足

$$\Delta_F(D|\lambda\rangle)=DD^\dagger D|\lambda\rangle=D\Delta_E|\lambda\rangle=\lambda(D|\lambda\rangle).$$

注意 $D|\lambda\rangle\neq0$，因为 $\ker\Delta_E=\ker D$（而 $\lambda\neq0$）。反之，若 $|\mu)\in\Gamma(M,F)$ 满足 $\Delta_F|\mu)=\mu|\mu)$，则 $D^\dagger|\mu)\in\Gamma(M,E)$ 是 $\Delta_E$ 的本征值为 $\mu$ 的本征向量。于是我们得到对称性（这是一种"超对称"，见 §12.10）`}</Tx>
        <Eq n="12.105" keyEq title="非零谱的配对" say={R`$D^\dagger D$ 与 $DD^\dagger$ 的非零本征值一一配对（$D$ 与 $D^\dagger$ 把对应的本征向量互相映射）——唯有零模不必配对。`}>{R`\mathrm{Spec}'\Delta_E=\mathrm{Spec}'\Delta_F`}</Eq>
        <Tx>{R`其中撇号表示去掉零本征模。（简并度相同：$D$ 把 $\Delta_E$ 的 $\lambda$ 本征空间单射地送到 $\Delta_F$ 的 $\lambda$ 本征空间，$D^\dagger$ 反过来也是单射，所以维数相等。）

定义两个热核 $h_E$ 与 $h_F$：`}</Tx>
        <Eq n="12.106a" say={R`$E$ 上的热核。`}>{R`h_E(x,y;t)=\sum\mathrm{e}^{-t\lambda_n}\langle x|n\rangle\langle n|y\rangle`}</Eq>
        <Eq n="12.106b" say={R`$F$ 上的热核（本征向量记作 $|m)$）。`}>{R`h_F(x,y;t)=\sum\mathrm{e}^{-t\mu_m}\langle x|m)(m|y\rangle.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{12.106a}、\eqref{12.106b} 漏了 $t$`}>{R`原书印作 $\mathrm{e}^{-\lambda_n}$、$\mathrm{e}^{-\mu_m}$，指数中漏了时间 $t$。按定义 \eqref{12.94} 应为 $\mathrm{e}^{-t\lambda_n}$、$\mathrm{e}^{-t\mu_m}$（左边的 $h_E(x,y,t)$ 也依赖于 $t$）。`}</Box>
        <Tx>{R`我们有`}</Tx>
        <Eq n="12.107a" say={R`$E$ 上热核迹的长时间极限 = $D$ 的零模数。`}>{R`\lim_{t\to\infty}\tilde h_E(t)=\dim\ker\Delta_E=\dim\ker D`}</Eq>
        <Eq n="12.107b" say={R`$F$ 上热核迹的长时间极限 = $D^\dagger$ 的零模数。`}>{R`\lim_{t\to\infty}\tilde h_F(t)=\dim\ker\Delta_F=\dim\ker D^\dagger.`}</Eq>
        <Tx>{R`更有意思的是 $D$ 的指标。由于 $\ker D=\ker\Delta_E$、$\ker D^\dagger=\ker\Delta_F$，`}</Tx>
        <Eq n="12.108" title="指标的热核公式" say={R`两个热核迹之差在任何时刻 $t$ 都等于指标：非零模的贡献因配对 \eqref{12.105} 逐项抵消，只剩零模数之差。`}>{R`\begin{aligned}\ind D&=\dim\ker D-\dim\ker D^\dagger=\dim\ker\Delta_E-\dim\ker\Delta_F\\&=\lim_{t\to\infty}[\tilde h_E(t)-\tilde h_F(t)]=\tilde h_E(t)-\tilde h_F(t).\end{aligned}`}</Eq>
        <Tx>{R`最后一个等号成立，是因为由对称性 \eqref{12.105}，$\tilde h_E(t)-\tilde h_F(t)$ 中依赖于 $t$ 的部分相互抵消。把 $\tilde h_E(t)$、$\tilde h_F(t)$ 展开为

$$\tilde h_E(t)=\sum a_i^Et^i\qquad\tilde h_F(t)=\sum a_i^Ft^i.$$

挑出与 $t$ 无关的项，得到`}</Tx>
        <Eq n="12.109" keyEq title="指标 = 局部不变量的积分" say={R`指标等于两个热核展开中常数项之差的积分：一个整体的整数被写成了局部曲率不变量的积分。`}>{R`\ind D=a_0^E-a_0^F=\int\dd x\,[a_0^E(x)-a_0^F(x)]`}</Eq>
        <Tx>{R`其中 $a_0^{E,F}(x)$ 由 \eqref{12.102} 定义。（原书右边多写了一个 $\dd x$。由于左边与 $t$ 无关，展开中所有 $i\neq0$ 的系数都必须满足 $a_i^E=a_i^F$。）

一般而言，$a_0^{E,F}(x)$ 是用曲率二形式写出的局部不变量。§13.2 将用热核证明在 $\hat A(TM)=1$ 的流形上扭曲自旋复形的指标定理

$$\ind D=\nu_+-\nu_-=\int_M\mathrm{ch}(\mathcal{F})|_{\rm vol}.$$`}</Tx>
        <Exercise n="12.5" title="预解式形式的指标" level="★"
          hint={R`在本征基中，$\frac{s}{\Delta+s}$ 的本征值是 $\frac{s}{\lambda+s}$。用 \eqref{12.105} 配对非零本征值；零模贡献 $s/s=1$。`}
          solution={R`取 $\Delta_E$、$\Delta_F$ 的本征基。由 \eqref{12.105}，非零本征值（含重数）在两边相同，所以

$$I(s)=\sum_{\lambda_n\in\mathrm{Spec}\,\Delta_E}\frac{s}{\lambda_n+s}-\sum_{\mu_m\in\mathrm{Spec}\,\Delta_F}\frac{s}{\mu_m+s}=\sum_{\text{零模}}\frac{s}{0+s}-\sum_{\text{零模}}\frac{s}{0+s}+\sum{}'\Big(\frac{s}{\lambda+s}-\frac{s}{\lambda+s}\Big).$$

非零部分逐项为零，零模部分每个贡献 $1$，所以 $I(s)=\dim\ker\Delta_E-\dim\ker\Delta_F=\dim\ker D-\dim\ker D^\dagger=\ind D$，与 $s$ 无关。$\mathrm{Re}\,s>0$ 保证 $\lambda+s\neq0$。（与 \eqref{12.108} 的关系：$\frac{s}{\Delta+s}=\int_0^\infty s\,\mathrm{e}^{-st}\mathrm{e}^{-t\Delta}\dd t$，$I(s)$ 是热核差的 Laplace 变换，乘以 $s$ 后对常数函数得原常数。）`}>
          <><Tx>{R`设 $D$、$D^\dagger$、$\Delta_E$、$\Delta_F$ 同上。证明`}</Tx>
          <Eq n="12.110" say={R`预解式之差的迹：每个零模贡献 $1$，非零模成对抵消。`}>{R`I(s)\equiv\mathrm{tr}\Big[\frac{s}{\Delta_E+s}-\frac{s}{\Delta_F+s}\Big]\qquad\mathrm{Re}\,s>0`}</Eq>
          <Tx>{R`与 $s$ 无关。再证明 $I(s)=\ind D$。`}</Tx></>
        </Exercise>
      </Sub>

      <Sub n="12.7.2" title="Spectral ζ-functions" zh="谱 $\zeta$ 函数">
        <Tx>{R`设 $E$、$F$ 是 $M$ 上的向量丛。定义新函数`}</Tx>
        <Eq n="12.111" say={R`局部 $\zeta$ 函数：非零本征值取 $-s$ 次幂加权的谱和，即算子 $\Delta^{-s}$ 的积分核。`}>{R`\zeta_E(x,y;s)\equiv\sum{}'\langle x|n\rangle\langle n|y\rangle\lambda_n^{-s}\qquad\mathrm{Re}\,s>0`}</Eq>
        <Tx>{R`其中 $\Delta_E|n\rangle=\lambda_n|n\rangle$，撇号表示略去零模（$\lambda_n=0$）。（严格地说，收敛需要 $\mathrm{Re}\,s>m/2$；其余 $s$ 由解析延拓定义。）对 $\Delta_F$ 可以类似地定义 $\zeta_F(x,y;s)$。函数 $h_E$ 与 $\zeta_E$ 通过 **Mellin 变换**联系。为看清这一点，回忆 $${GF}$ 函数的定义

$$${GF}(s)\equiv\int_0^\infty t^{s-1}\mathrm{e}^{-t}\dd t=\lambda^s\int_0^\infty t^{s-1}\mathrm{e}^{-\lambda t}\dd t$$

其中 $\lambda$ 严格为正。由此得`}</Tx>
        <Eq n="12.112" title="Mellin 变换：$\zeta$ 函数 与 热核" say={R`$\zeta$ 函数是（去掉零模的）热核的 Mellin 变换：把 $\lambda^{-s}$ 写成 $\mathrm{e}^{-\lambda t}$ 对 $t^{s-1}$ 的积分。`}>{R`\begin{aligned}${GF}(s)\zeta(x,y;s)&=\sum_n{}'\int_0^\infty t^{s-1}\mathrm{e}^{-\lambda_nt}\langle x|n\rangle\langle n|y\rangle\dd t\\&=\int_0^\infty t^{s-1}\Big[h(x,y;t)-\sum_i\langle x|0,i\rangle\langle0,i|y\rangle\Big]\dd t.\end{aligned}`}</Eq>
        <Tx>{R`我们还注意到`}</Tx>
        <Eq n="12.113" say={R`谱 $\zeta$ 函数：所有非零本征值 $\lambda_n^{-s}$ 之和，用来正规化 $\log\det\Delta=-\zeta'(0)$。`}>{R`\zeta_\Delta(s)\equiv\int_M\zeta(x,x;s)\dd x=\sum_n{}'\lambda_n^{-s}`}</Eq>
        <Tx>{R`就是 (1.158) 中定义的谱 $\zeta$ 函数。`}</Tx>
        <Exercise n="12.6" title={R`$\Delta^{-s}$ 的积分核`} level="★"
          hint={R`把 $f$ 按本征向量展开，用完备性 $\sum_n|n\rangle\langle n|=1$。注意零模上 $\Delta^{-s}$ 无定义。`}
          solution={R`设 $f(x)=\sum_nc_n\langle x|n\rangle$，$c_n=\int\langle n|y\rangle f(y)\dd y$。按定义 $\Delta^{-s}|n\rangle=\lambda_n^{-s}|n\rangle$（只对 $\lambda_n\neq0$），所以

$$\Delta^{-s}f(x)=\sum_n{}'c_n\lambda_n^{-s}\langle x|n\rangle=\int\Big[\sum_n{}'\langle x|n\rangle\lambda_n^{-s}\langle n|y\rangle\Big]f(y)\dd y=\int\zeta(x,y;s)f(y)\dd y.$$

交换求和与积分需要级数收敛，这就是要求 $\mathrm{Re}\,s$ 足够大的原因（对 $m$ 维二阶算子，$\lambda_n\sim n^{2/m}$，$\mathrm{Re}\,s>m/2$ 即可）。这里默认 $f$ 与零模正交（或把 $\Delta^{-s}$ 在零模上定义为 $0$）。`}>
          <><Tx>{R`验证`}</Tx>
          <Eq n="12.114" say={R`算子的复数次幂 $\Delta^{-s}$ 的积分核就是局部 $\zeta$ 函数。`}>{R`\Delta^{-s}f(x)=\int\zeta(x,y;s)f(y)\dd y`}</Eq>
          <Tx>{R`其中算子的一般幂按本征值意义定义，即令 $\Delta^{-s}|n\rangle=\lambda_n^{-s}|n\rangle$。假设 $\mathrm{Re}\,s$ 足够大，使 \eqref{12.114} 良定义。［提示：用本征向量的完备性。］`}</Tx></>
        </Exercise>
        <Box kind="example" n="12.7" title={R`$S^1$ 上的热核与 $\zeta$ 函数`}>
          <Tx>{R`下面的例子取自 Kulkarni (1975)。设 $M=S^1=\{\mathrm{e}^{\mathrm{i}\theta}\}$，$E=F=S^1$ 上的平凡线丛（圆柱）。取算子 $\Delta\equiv-\partial^2/\partial\theta^2$。由本征值方程

$$-\frac{\partial^2\mathrm{e}^{\mathrm{i}n\theta}}{\partial\theta^2}=n^2\mathrm{e}^{\mathrm{i}n\theta}\qquad n\in\Z$$

得到

$$\lambda_n=n^2\qquad\langle\theta|n\rangle=(2\pi)^{-1/2}\mathrm{e}^{\mathrm{i}n\theta}.$$

热核为`}</Tx>
          <Eq n="12.115" say={R`圆周上的热核：零模（常数）贡献 $1/2\pi$，其余 Fourier 模按 $\mathrm{e}^{-n^2t}$ 衰减。`}>{R`\begin{aligned}h(\theta_1,\theta_2;t)&=\sum\mathrm{e}^{-n^2t}\langle\theta_1|n\rangle\langle n|\theta_2\rangle\\&=\frac1{2\pi}\Big(1+\sum{}'\mathrm{e}^{-n^2t}\mathrm{e}^{\mathrm{i}n(\theta_1-\theta_2)}\Big)\end{aligned}`}</Eq>
          <Tx>{R`而`}</Tx>
          <Eq n="12.116" say={R`圆周上的局部 $\zeta$ 函数；对角线上积分得 $\zeta_\Delta(s)=2\zeta_{\rm R}(2s)$。`}>{R`\begin{aligned}\zeta(\theta_1,\theta_2;s)&=\sum{}'n^{-2s}\langle\theta_1|n\rangle\langle n|\theta_2\rangle\\&=\frac1{2\pi}\sum{}'n^{-2s}\mathrm{e}^{\mathrm{i}n(\theta_1-\theta_2)}.\end{aligned}`}</Eq>
          <Tx>{R`容易验证 $\tilde h(t)=1+\sum'\mathrm{e}^{-n^2t}$ 满足

$$1+2\int_1^\infty\mathrm{e}^{-x^2t}\dd x<\tilde h(t)<1+2\int_0^\infty\mathrm{e}^{-x^2t}\dd x.$$

（$\mathrm{e}^{-x^2t}$ 在 $x>0$ 上递减，所以 $\int_n^{n+1}<\mathrm{e}^{-n^2t}<\int_{n-1}^n$，对 $n\ge1$ 求和；$\sum'$ 包含 $\pm n$ 两项，故系数为 2。）由这些不等式得

$$\int_{-\infty}^{+\infty}\mathrm{e}^{-x^2t}\dd x-1<\tilde h(t)<\int_{-\infty}^{+\infty}\mathrm{e}^{-x^2t}\dd x+1$$

（左边：$2\int_1^\infty=\int_{-\infty}^\infty-2\int_0^1$，而 $2\int_0^1\mathrm{e}^{-x^2t}\dd x\le2$。）代入 $\int\mathrm{e}^{-x^2t}\dd x=\sqrt{\pi}\,t^{-1/2}$，得

$$\sqrt\pi\,t^{-1/2}-1<\tilde h(t)<\sqrt\pi\,t^{-1/2}+1.$$

这说明`}</Tx>
          <Eq n="12.117" say={R`圆周上热核迹的短时间行为是 $\sqrt{\pi/t}$：渐近展开从 $t^{-\dim M/2}$ 开始，系数 $\sqrt\pi=2\pi/\sqrt{4\pi}$ 正是"周长/$\sqrt{4\pi}$"。`}>{R`\lim_{t\to0^+}\tilde h(t)\sim\sqrt\pi\,t^{-1/2}.`}</Eq>
          <Tx>{R`一般地，渐近级数从 $t^{-\dim M/2}$ 开始。（事实上由 Poisson 求和公式，$\tilde h(t)=\sqrt{\pi/t}\sum_k\mathrm{e}^{-\pi^2k^2/t}=\sqrt{\pi/t}\,[1+O(\mathrm{e}^{-\pi^2/t})]$：除首项外所有幂次系数都为零，因为 $S^1$ 是平坦的。下图数值核对这一点。）`}</Tx>
          <HeatKernelS1 />
        </Box>
      </Sub>
    </Sec>);
}

export function Sec128() {
  return (
    <Sec n="12.8" title="The Atiyah–Patodi–Singer index theorem" zh="Atiyah–Patodi–Singer 指标定理"
      gist={R`奇数维流形上 Hermite Dirac 算子的谱不对称 $\eta=\sum_{\lambda>0}1-\sum_{\lambda<0}1$（$\zeta$ 正规化）→ 外场随 $t$ 变化时，本征值穿过零使 $\eta$ 跳 $\pm2$（谱流），另有连续变化 $\eta_c$ → 在 $M\times I$ 上构造 $(2l+2)$ 维 Dirac 算子，APS 定理：$\ind D=\int_{M\times I}\hat A\,\mathrm{ch}-\frac12[\eta(1)-\eta(0)]$ → 连续部分被体积分抵消，$\ind=-$谱流 → 例：$S^1$ 上 $\mathrm{i}\partial_\theta+t$ 的谱流为 1，二维算子的核由 $\theta$ 函数张成，指标 $=-1$。`}
      why={R`物理中常常遇到带边界的底空间（如有限时间区间、有限空间区域）。这时指标不再只是局部积分：边界上的谱不对称（$\eta$ 不变量）也有贡献。第 13 章的奇数维宇称反常要用到它。`}
      gives={["12.118", "12.119", "12.121", "12.123", "12.124", "12.125", "12.129"]}>
      <p className="muted">本节概念：<C id="eta_spectral_flow" /></p>
      <Tx>{R`到目前为止，我们讨论的都是无边紧流形上的指标定理。在物理的实际情形中，常常需要求定义在**有边界**的底空间 $M$ 上的算子的指标。这里讨论 AS 指标定理向这些情形的推广。我们只讨论 $M$ 上的自旋丛，因为这是第 13 章唯一用到的情形。`}</Tx>

      <Sub n="12.8.1" title="eta-invariant and spectral flow" zh="$\eta$ 不变量与谱流">
        <Tx>{R`设 $\mathrm{i}${NB}$ 是定义在奇数维流形 $M$（$\dim M=2l+1$）上的 Hermite Dirac 算子。由于 $\mathrm{i}${NB}$ 是 Hermite 的，本征值 $\lambda_k$ 是实数。（奇数维没有手征矩阵与之反对易，所以谱不必关于零对称。）用 $\mathrm{i}${NB}$ 的**谱不对称**定义它的 **$\eta$ 不变量**：`}</Tx>
        <Eq n="12.118" title="$\eta$ 不变量（形式定义）" say={R`$\eta$ 不变量：正本征值个数减负本征值个数——谱关于零的不对称程度。`}>{R`\eta\equiv\sum_{\lambda_k>0}1-\sum_{\lambda_k<0}1.`}</Eq>
        <Tx>{R`这个式子本身没有良定义（两个和都发散），需要适当的正规化。例如可以定义 $\eta=\lim_{s\to0}\eta(s)$，其中`}</Tx>
        <Eq n="12.119" say={R`$\eta$ 函数：用 $|\lambda|^{-s}$ 压低大本征值，在 $s\to0$ 时得到正规化的谱不对称。`}>{R`\eta(s)\equiv\sum_k{}'\mathrm{sgn}(\lambda_k)|\lambda_k|^{-s}\qquad\mathrm{Re}\,s>0.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{12.119} 的指数应为 $-s$`}>{R`原书 \eqref{12.119} 印作 $|\lambda_k|^{-2s}$，但紧接着的习题 12.7 的公式 \eqref{12.120} 用 Mellin 变换算出的是 $\sum\mathrm{sgn}(\lambda_k)|\lambda_k|^{-s}$（见习题解答）：二者在 $s\neq0$ 时不一致。这里按 Atiyah–Patodi–Singer 的标准定义写成 $|\lambda_k|^{-s}$，使 \eqref{12.119} 与 \eqref{12.120} 相容；$s\to0$ 的极限（即 $\eta$ 本身）不受影响。收敛条件严格说是 $\mathrm{Re}\,s>\dim M$，其余由解析延拓定义。`}</Box>
        <Tx>{R`可以证明，在适当的边界条件下 $\eta(s)$ 在 $s=0$ 处没有极点。`}</Tx>
        <Exercise n="12.7" title="η 函数的热核表示" level="★★"
          hint={R`在给定的 Mellin 公式中令 $a=\lambda_k^2$，两边乘以 $\lambda_k$。对 $k$ 求和并与迹交换。`}
          solution={R`在 $\frac12\Gamma\big(\frac{s+1}2\big)a^{-(s+1)/2}=\int_0^\infty x^s\mathrm{e}^{-ax^2}\dd x$ 中取 $a=\lambda_k^2>0$：

$$|\lambda_k|^{-(s+1)}=\frac{2}{\Gamma(\frac12(s+1))}\int_0^\infty x^s\mathrm{e}^{-x^2\lambda_k^2}\dd x.$$

两边乘以 $\lambda_k$，并用 $\lambda_k|\lambda_k|^{-(s+1)}=\mathrm{sgn}(\lambda_k)|\lambda_k|^{-s}$：

$$\mathrm{sgn}(\lambda_k)|\lambda_k|^{-s}=\frac{2}{\Gamma(\frac12(s+1))}\int_0^\infty x^s\lambda_k\mathrm{e}^{-x^2\lambda_k^2}\dd x.$$

对所有非零本征值求和（零本征值在右边贡献 $\lambda_k=0$，自动略去），把 $\sum_k\lambda_k\mathrm{e}^{-x^2\lambda_k^2}$ 写成 $\mathrm{tr}\,\mathrm{i}\not\nabla\,\mathrm{e}^{-x^2(\mathrm{i}\not\nabla)^2}$（在本征基中计算迹），即得 \eqref{12.120}，左边是 $\sum'\mathrm{sgn}(\lambda_k)|\lambda_k|^{-s}$——这正是 \eqref{12.119}（改正后）的 $\eta(s)$。

**$s=0$**：$\eta=\frac{2}{\sqrt\pi}\int_0^\infty\mathrm{tr}\,(\mathrm{i}\not\nabla\,\mathrm{e}^{-x^2(\mathrm{i}\not\nabla)^2})\dd x$。交互图 5 对例 12.8 的算子用这个积分数值计算 $\eta(t)$，得到 $1-2t$（$0<t<1$），与 Hurwitz ζ 函数的解析结果 $\eta=\zeta_{\rm H}(0,t)-\zeta_{\rm H}(0,1-t)=1-2t$ 一致。`}>
          <><Tx>{R`用 Mellin 变换

$$\frac12${GF}\Big(\frac{s+1}{2}\Big)a^{-(s+1)/2}=\int_0^\infty\dd x\,x^s\mathrm{e}^{-ax^2}\qquad a>0$$

验证`}</Tx>
          <Eq n="12.120" say={R`$\eta$ 函数可以由"Dirac 算子乘以它自己的高斯热核"的迹做 Mellin 变换得到。`}>{R`\eta(s)=\frac{2}{${GF}(\frac12(s+1))}\int_0^\infty\dd x\,x^s\,\mathrm{tr}\,\mathrm{i}${NB}\mathrm{e}^{-x^2(\mathrm{i}${NB})^2}.`}</Eq></>
        </Exercise>
        <Tx>{R`**谱流。**设 Dirac 场与外规范势 $\mathcal{A}_t$（$t\in[0,1]$）相互作用。Dirac 算子 $\mathrm{i}${NB}(\mathcal{A}_t)$ 的本征值问题依赖于 $t$。若 $\mathrm{i}${NB}(\mathcal{A}_t)$ 的某个本征值穿过零，$\eta$ 不变量就跳变 $\pm2$。这一跳变标志着从 $\lambda\gtrless0$ 模式到 $\lambda\lessgtr0$ 模式的**谱流**（spectral flow）：若 $\eta$ 跳 $+2$（$-2$），就有一个态从 $\lambda<0$ 流到 $\lambda>0$（从 $\lambda>0$ 流到 $\lambda<0$），见图 12.1。除了与谱流相关的不连续变化外，$\mathrm{i}${NB}$ 还有连续变化 $\eta_c$。我们有`}</Tx>
        <Figure illustration={<EtaJumpRedraw />} n="12.1" caption={R`自绘谱穿零：连续本征值从正到负、从负到正时，其对 $\eta$ 的贡献分别跳变 $-2$、$+2$。`} width="100%" />
        <Eq n="12.121" title="$\eta$ 的变化 = 连续部分 + 2 $\times$ 谱流" say={R`$\eta$ 不变量的总变化分成两部分：随本征值连续移动的部分，以及每次有本征值从负穿到正时的 $+2$ 跳变。`}>{R`\eta(t=1)-\eta(t=0)=\int_0^1\dd t\frac{\dd\eta_c}{\dd t}+2\times(\text{谱流}).`}</Eq>
      </Sub>

      <Sub n="12.8.2" title="The Atiyah–Patodi–Singer (APS) index theorem" zh="Atiyah–Patodi–Singer（APS）指标定理">
        <Tx>{R`考虑 $(2l+2)$ 维 Dirac 算子（把参数 $t$ 当作额外的一维）`}</Tx>
        <Eq n="12.122a" say={R`在柱体 $M\times I$ 上构造的高一维 Dirac 算子：$t$ 方向配 $\sigma_1$，$M$ 方向配 $\sigma_2$。`}>{R`\mathrm{i}\hat D_{2l+2}=\mathrm{i}\sigma_1\frac{\partial}{\partial t}+\sigma_2\otimes\mathrm{i}${NB}(\mathcal{A}_t)=\begin{pmatrix}0&D\\D^\dagger&0\end{pmatrix}`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="12.122b" say={R`非对角块：$t$ 方向的导数加上（或减去）$M$ 上的 Dirac 算子；$D$ 的零模是沿 $t$ 方向按本征值指数衰减或增长的"隧穿"解。`}>{R`D=\mathrm{i}\partial_t+${NB}(\mathcal{A}_t)\qquad D^\dagger=\mathrm{i}\partial_t-${NB}(\mathcal{A}_t).`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{12.122b} 中 $D$ 与 $D^\dagger$ 的 $\pm$ 号`}>{R`原书印作 $D=\mathrm{i}\partial_t-\not\nabla(\mathcal{A}_t)$、$D^\dagger=\mathrm{i}\partial_t+\not\nabla(\mathcal{A}_t)$。直接相乘：$\sigma_2\otimes X=\begin{pmatrix}0&-\mathrm{i}X\\ \mathrm{i}X&0\end{pmatrix}$，取 $X=\mathrm{i}\not\nabla$ 得右上块 $\mathrm{i}\partial_t+\not\nabla$、左下块 $\mathrm{i}\partial_t-\not\nabla$。这也与例 12.8 中原书自己的 \eqref{12.127b}（$D=\mathrm{i}\partial_t+\partial_\theta-\mathrm{i}t$，其中 $\partial_\theta-\mathrm{i}t$ 正是 $\nabla_t$）一致。因 $\not\nabla$ 反 Hermite，$(\mathrm{i}\partial_t+\not\nabla)^\dagger=\mathrm{i}\partial_t-\not\nabla$，伴随关系也成立。`}</Box>
        <Tx>{R`［注：$D$ 与 $D^\dagger$ 的位置与 \eqref{12.79} 相反，因为在我们的 $\gamma$ 矩阵选取下

$$\gamma^{2l+3}=\begin{pmatrix}-\mathbf{1}&0\\0&\mathbf{1}\end{pmatrix}.\text{］}$$`}</Tx>
        <Stmt id="T12.3">
          <Eq n="12.123" keyEq title="APS 指标定理" say={R`带边流形的指标 = 体积分（局部）− 两端边界上 $\eta$ 不变量之差的一半（整体、谱的）。`}>{R`\begin{aligned}\ind D&=\dim\ker D-\dim\ker D^\dagger\\&=\int_{M\times I}\hat A(\mathcal{R})\mathrm{ch}(\mathcal{F})|_{\rm vol}-\frac12[\eta(\mathrm{i}${NB}(\mathcal{A}_1))-\eta(\mathrm{i}${NB}(\mathcal{A}_0))].\end{aligned}`}</Eq>
        </Stmt>
        <Tx>{R`一般论证表明，$\eta$ 不变量的连续部分 $\eta_c$ 满足`}</Tx>
        <Eq n="12.124" say={R`$\eta$ 的连续变化正好是体积分的两倍（体积分是 $\eta$ 连续部分的"导数的积分"）。`}>{R`\int_0^1\dd t\frac{\dd\eta_c}{\dd t}=2\int_{M\times I}\hat A(\mathcal{R})\mathrm{ch}(\mathcal{F})|_{\rm vol}.`}</Eq>
        <Tx>{R`于是 \eqref{12.123} 的右边就是谱流：

$$-\frac12[\eta(t=1)-\eta(t=0)]+\frac12\int_0^1\dd t\frac{\dd\eta_c}{\dd t}=-\text{谱流}.$$

（代入 \eqref{12.121} 即可：$-\frac12[\int\dot\eta_c+2\,\text{谱流}]+\frac12\int\dot\eta_c=-\text{谱流}$。）这样我们得到 APS 指标定理的另一种表达：`}</Tx>
        <Eq n="12.125" keyEq title="指标 = −谱流" say={R`柱体上高一维 Dirac 算子的指标等于负的谱流：沿 $t$ 有几个本征值从负穿到正，就少几个零模。`}>{R`\ind\mathrm{i}\hat D_{2l+2}=-\text{谱流}.`}</Eq>
        <Tx>{R`APS 指标定理最一般形式的证明见 Atiyah 等 (1975a, b, 1976)。物理学家的证明见 Alvarez-Gaumé 等 (1985)。§13.6 将用 APS 指标定理研究奇数维的宇称反常。`}</Tx>
        <Box kind="example" n="12.8" title="谱流为什么出现在指标定理中">
          <Tx>{R`为了看清谱流为什么出现在指标定理中，考虑一个取自 Atiyah (1985) 的例子。设 $M=S^1$，$\theta$ 是它的坐标。考虑 Hermite 算子`}</Tx>
          <Eq n="12.126" say={R`圆周上带常数 $\mathrm{U}(1)$ 规范势 $-\mathrm{i}t$ 的一维 Dirac 算子，$t$ 是可调的"磁通"。`}>{R`\mathrm{i}\nabla_t\equiv\mathrm{i}\Big(\frac{\partial}{\partial\theta}-\mathrm{i}t\Big)=\mathrm{i}\partial_\theta+t\qquad t\in\R.`}</Eq>
          <Tx>{R`$-\mathrm{i}t$ 项可以看作 $\mathrm{U}(1)$ 规范势。$\mathrm{i}\nabla_t$ 的本征向量与本征值为

$$\psi_{n,t}(\theta)=\frac1{\sqrt{2\pi}}\mathrm{e}^{-\mathrm{i}n\theta}\ (n\in\Z)\qquad\lambda_n(t)=n+t.$$

由于 $\mathrm{Spec}\,\mathrm{i}\nabla_t=\mathrm{Spec}\,\mathrm{i}\nabla_{t+1}$，算子族 $\mathrm{i}\nabla_t$ 关于 $t$ 以 1 为周期，见图 12.2。这一周期性体现为 $\mathrm{i}\nabla_t$ 与 $\mathrm{i}\nabla_{t+1}$ 的规范等价：

$$\mathrm{i}\nabla_{t+1}=\mathrm{e}^{\mathrm{i}\theta}\,\mathrm{i}\nabla_t\,\mathrm{e}^{-\mathrm{i}\theta}.$$

（直接验证：$\mathrm{e}^{\mathrm{i}\theta}\mathrm{i}\partial_\theta(\mathrm{e}^{-\mathrm{i}\theta}\psi)=\mathrm{i}\partial_\theta\psi+\psi$。）当 $t$ 从 $-\varepsilon$ 变到 $1-\varepsilon$（$\varepsilon$ 为小正数）时，在 $t=0$ 处恰好有一个单位的谱流从 $\lambda<0$ 流到 $\lambda>0$（$n=0$ 的本征值 $\lambda_0=t$ 穿过零）。由 $\mathrm{i}\nabla_t$ 构造二维 Dirac 算子`}</Tx>
          <Eq n="12.127a" say={R`把 $t$ 当作第二个坐标，得到环面 $(\theta,t)$ 上的二维 Dirac 算子。`}>{R`\mathrm{i}\sym{slD}{\not D}_2\equiv\mathrm{i}\sigma_1\otimes\frac{\partial}{\partial t}+\sigma_2\otimes\mathrm{i}\nabla_t=\begin{pmatrix}0&D\\D^\dagger&0\end{pmatrix}`}</Eq>
          <Tx>{R`其中`}</Tx>
          <Eq n="12.127b" say={R`二维 Dirac 算子的两个非对角块。`}>{R`D\equiv\mathrm{i}\partial_t+\partial_\theta-\mathrm{i}t\qquad D^\dagger\equiv\mathrm{i}\partial_t-\partial_\theta+\mathrm{i}t.`}</Eq>
          <Tx>{R`这些算子作用在满足下列边界条件的函数上：`}</Tx>
          <Eq n="12.128" say={R`$\theta$ 方向周期；$t$ 方向走一个周期后差一个规范变换 $\mathrm{e}^{\mathrm{i}\theta}$——这使 $(\theta,t)$ 环面上的线丛具有单位陈数。`}>{R`\phi(\theta+2\pi,t)=\phi(\theta,t)\qquad\phi(\theta,t+1)=\mathrm{e}^{\mathrm{i}\theta}\phi(\theta,t).`}</Eq>
          <Figure illustration={<SpectralFlowLab />} n="12.2" caption={R`$\mathrm{i}\nabla_t$ 本征值随时间的演化。$\mathrm{Spec}\,\mathrm{i}\nabla_t$ 以 1 为周期。第 $i$ 个本征值在 $t=0$ 处穿过零，因此有一个单位的谱流。交互版：拖动 $t$，看本征值 $n+t$ 的运动、$\eta$ 不变量的锯齿（用 \eqref{12.120} 数值积分）以及 $\ker D^\dagger$ 中的 $\theta$ 函数零模。`} width="100%" />
          <Tx>{R`**$\ker D^\dagger$。**设 $\phi_0\in\ker D^\dagger$，作 Fourier 展开

$$\phi_0(\theta,t)=\sum a_n(t)\mathrm{e}^{-\mathrm{i}n\theta}.$$

由 $D^\dagger\phi_0=0$ 得（$D^\dagger$ 作用在 $a_n\mathrm{e}^{-\mathrm{i}n\theta}$ 上给出 $\mathrm{i}a_n'+\mathrm{i}na_n+\mathrm{i}ta_n$）

$$a_n'(t)+(n+t)a_n(t)=0$$

它很容易解出：

$$a_n(t)=c_n\exp\Big(-\frac{(n+t)^2}{2}\Big).$$

边界条件 \eqref{12.128} 要求

$$\sum_nc_n\exp\Big(-\frac{(n+t+1)^2}{2}\Big)\mathrm{e}^{-\mathrm{i}n\theta}=\sum_nc_n\exp\Big(-\frac{(n+t)^2}{2}\Big)\mathrm{e}^{-\mathrm{i}(n-1)\theta}$$

（右边把 $n$ 换成 $n+1$ 后与左边逐项比较）由此得 $c_n=c_{n+1}$，即 $c_n$ 与 $n$ 无关。所以 $\ker D^\dagger$ 是一维的，由 **θ 函数**张成：`}</Tx>
          <Eq n="12.129" title="零模是 $\theta$ 函数" say={R`$D^\dagger$ 唯一的零模是 Jacobi $\theta$ 函数：每个 Fourier 分量都是以 $t=-n$ 为中心的高斯包，规范边界条件把它们串成一个整体。`}>{R`\phi_0(\theta,t)=\sum\exp\Big(-\frac{(n+t)^2}{2}-\mathrm{i}n\theta\Big).`}</Eq>
          <Tx>{R`**$\ker D$。**设 $\tilde\phi_0(\theta,t)\in\ker D$。令 $\tilde\phi_0(\theta,t)=\sum b_n(t)\mathrm{e}^{-\mathrm{i}n\theta}$，则 $b_n(t)$ 满足

$$b_n'(t)-(n+t)b_n(t)=0.$$

其解为

$$b_n(t)=d_n\exp\frac{(n+t)^2}{2}\qquad\Big(\text{即 }b_n(t)=b_n(0)\exp\frac{(n+t)^2-n^2}{2}\Big)$$

（原书写作 $b_n(0)\exp\frac{(n+t)^2}{2}$，在 $t=0$ 处不自洽，差一个常数因子。）边界条件同样迫使 $d_n$ 与 $n$ 无关，于是 $\sum_nd\,\mathrm{e}^{(n+t)^2/2}$ 发散——$\tilde\phi_0$ 不能归一化（只能为零）。这说明

$$\ind D=\dim\ker D-\dim\ker D^\dagger=-1$$

与 $-$（谱流）一致。`}</Tx>
          <Box kind="physics" title="零模与谱流的直观联系">{R`$D^\dagger\phi=0$ 即 $\partial_ta_n=-\lambda_n(t)a_n$：每个 Fourier 模沿 $t$ "以本征值为速率"衰减或增长。只有当 $\lambda_n(t)$ 从负变正（$t$ 增大时 $n+t$ 穿过零）时，$a_n\propto\mathrm{e}^{-\int\lambda_n\dd t}$ 才先增后减、可以归一化——每有一个本征值从负流向正，$D^\dagger$ 就多一个零模，所以 $\ind D=-\text{谱流}$。这就是"$\mathrm{i}\partial_t$ 与 $M$ 上 Dirac 算子耦合"的隧穿图像，也是第 13 章中 Callan–Rubakov 效应、手征反常的谱流解释的原型。`}</Box>
        </Box>
      </Sub>
    </Sec>);
}
