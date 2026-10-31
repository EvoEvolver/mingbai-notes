// 补充材料 E_II：对易子为 iħ 的两个可观测量 Q、P 的一般性质 —— 式 (EII-1)–(EII-28)
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import "./_ch02c_kit.jsx";
import { Fig } from "./_ch02c_kit.jsx";
import { TranslationDemo } from "./_ch02c_plots.jsx";

const R = String.raw;

export function SecE() {
  return (
    <Sec n="EII" title="Some general properties of two observables, Q and P, whose commutator is equal to iħ" zh={R`对易子为 $i\hbar$ 的两个可观测量 $Q$、$P$ 的一般性质`}
      gist={R`只从 $[Q,P]=i\hbar$ 出发：平移算符 $S(\lambda)=\mathrm e^{-i\lambda P/\hbar}$ 把 $Q$ 的本征值整体平移 $\lambda$，于是 $Q$ 的谱是整条实轴、各本征值简并度相同；在 $\{\ket q\}$ 表象中 $Q$ 是乘法、$S(\lambda)$ 把波函数平移 $\lambda$、$P$ 作用为 $\frac\hbar i\frac{\dd}{\dd q}$；$\{\ket p\}$ 表象中的波函数是 Fourier 变换，$P$、$Q$ 完全对称。有限维空间中不存在这样一对算符。`}
      why={R`正文对 $X$、$P_x$ 是借助波函数具体验证的。这里换一个更"结构化"的视角：所有这些性质——连续谱、平面波、$\frac\hbar i\frac{\dd}{\dd q}$、Fourier 变换——都只是对易关系的推论；同时引入以后常用的平移算符。`}
      gives={["EII-2", "EII-3", "EII-6", "EII-9", "EII-18", "EII-23", "EII-24", "EII-27"]}>
      <p className="muted">本节概念：<C id="translation" /> · <C id="generator" /></p>
      <Tx>{R`**起点只有一行。**经典力学中广义坐标 $q_i$ 与共轭动量 $p_i=\partial\mathcal L/\partial\dot q_i$（附录 III §3-a）在量子力学中对应可观测量 $Q_i$、$P_i$，满足`}</Tx>
      <Eq n="EII-1" say="正则共轭的一对可观测量满足的对易关系：对易子是常数 $i$ħ。">{R`[Q_i,P_i]=i\hbar`}</Eq>
      <Tx>{R`$X$ 与 $P_x$ 是我们见过的例子。本补充材料的做法与正文相反：**不**假定任何波函数的具体形式，只用对易关系，看看能推出多少东西。下面去掉下标，记`}</Tx>
      <Eq n="EII-2" keyEq title="正则对易关系" say="本补充材料唯一的假设：两个可观测量 $Q$、$P$ 的对易子等于 $i$ħ。">{R`[Q,P]=i\hbar`}</Eq>

      <Sub n="EII-1" title="The operator S(lambda): definition, properties" zh={R`算符 $S(\lambda)$：定义与性质`}>
        <Tx>{R`**关键工具：用 $P$ 造一个幺正算符。**对实参数 $\lambda$，令`}</Tx>
        <Eq n="EII-3" keyEq title="平移算符" say="平移算符：以 $P/\hbar$ 为生成元、参数为 $\lambda$ 的幺正算符。">{R`S(\lambda)=\mathrm e^{-i\lambda P/\hbar}`}</Eq>
        <Tx>{R`$P$ 厄米，所以 $S$ 是"$i\times$厄米"的指数，由 \eqref{CII-4}–\eqref{CII-5} 它幺正；而且参数反号就是求逆：`}</Tx>
        <Eq n="EII-4" say="平移算符的伴随等于它的逆，也等于反方向的平移。">{R`S^\dagger(\lambda)=S^{-1}(\lambda)=S(-\lambda)`}</Eq>
        <Tx>{R`**$S$ 对 $Q$ 做了什么？**看对易子。$[Q,P]=i\hbar$ 是数，自然与 $Q$、$P$ 都对易，所以可以套用 \eqref{BII-51}（以 $F(P)=\mathrm e^{-i\lambda P/\hbar}$，$F'(P)=-\frac{i\lambda}\hbar F(P)$）：`}</Tx>
        <Eq n="EII-5" say="$Q$ 与平移算符的对易子恰好等于 $\lambda$ 倍的平移算符本身。">{R`[Q,S(\lambda)]=i\hbar\left(-\frac{i\lambda}\hbar\right)\mathrm e^{-i\lambda P/\hbar}=\lambda\ S(\lambda)`}</Eq>
        <Tx>{R`把对易子拆开、移项：`}</Tx>
        <Eq n="EII-6" keyEq title={R`$QS(\lambda)=S(\lambda)(Q+\lambda)$`} say="把 $Q$ 从平移算符的左边移到右边，$Q$ 变成了 $Q+\lambda$：平移算符把“位置”整体挪了 $\lambda$。">{R`Q\,S(\lambda)=S(\lambda)[Q+\lambda]`}</Eq>
        <Tx>{R`这一行是本补充材料的引擎。再记下一条显然的性质：两次平移叠加（$P$ 与自身对易，指数可以合并，\eqref{BII-33}），`}</Tx>
        <Eq n="EII-7" say="先平移 $\mu$ 再平移 $\lambda$，等于一次平移 $\lambda+\mu$：平移算符构成一个加法群。">{R`S(\lambda)\,S(\mu)=S(\lambda+\mu)`}</Eq>
      </Sub>

      <Sub n="EII-2" title="Eigenvalues and eigenvectors of Q" zh={R`$Q$ 的本征值与本征矢`}>
        <Sub n="EII-2-a" title="Spectrum of Q" zh={R`$Q$ 的谱：整条实轴`}>
          <Tx>{R`假设 $Q$ 至少有一个非零本征矢：`}</Tx>
          <Eq n="EII-8" say="假设 $Q$ 有一个非零本征矢 $\ket q$，本征值为 $q$。">{R`Q\ket q=q\ket q`}</Eq>
          <Tx>{R`把 \eqref{EII-6} 作用在 $\ket q$ 上：`}</Tx>
          <Eq n="EII-9" keyEq title={R`$S(\lambda)\ket q$ 是本征值 $q+\lambda$ 的本征矢`} say="平移后的本征矢仍是 $Q$ 的本征矢，本征值增加了 $\lambda$。">{R`\begin{aligned}Q\,S(\lambda)\ket q&=S(\lambda)(Q+\lambda)\ket q\\&=S(\lambda)(q+\lambda)\ket q=(q+\lambda)S(\lambda)\ket q\end{aligned}`}</Eq>
          <Tx>{R`$S(\lambda)$ 幺正，不会把非零矢量变成零，所以 $S(\lambda)\ket q$ 是 $Q$ 的本征矢，本征值 $q+\lambda$。而 $\lambda$ 可以是**任意**实数——从一个本征值出发，可以"滑"到实轴上任何一点。结论：**$Q$ 的谱是连续的，充满整条实轴。**（对 $P$ 用 $\mathrm e^{i\lambda'Q/\hbar}$ 做同样的论证，见 §4。）`}</Tx>
          <Box kind="warning" title="勘误：§2-a 正文的一处笔误">{R`原书此处写"construct another eigenvector of $\lambda$"，应为"another eigenvector of $Q$"（$\lambda$ 是实参数，不是算符）。本页已按正确意思讲述。`}</Box>
          <Box kind="key" title="有限维空间中不存在这样的一对算符">{R`两条独立的理由：

◆ **谱的论证。**$N$ 维空间中 $Q$ 最多有 $N$ 个本征值，不可能是整条实轴。

◆ **迹的论证。**对 \eqref{EII-2} 取迹：$\Tr(QP)-\Tr(PQ)=\Tr(i\hbar\mathbb 1)$。有限维时两个迹都存在且相等（\eqref{BII-7a}），左边为零；右边却是 $Ni\hbar\neq0$。矛盾。无穷维时迹不一定存在（$\Tr\mathbb 1$ 发散），矛盾就消失了。

所以正则对易关系**强迫**态空间是无穷维的——量子化一个连续自由度不可能在有限维矩阵里完成。`}</Box>
        </Sub>
        <Sub n="EII-2-b" title="Degree of degeneracy" zh="各本征值简并度相同">
          <Tx>{R`设本征值 $q$ 不简并（一般情形可以类似推广）。论证"其余本征值也不简并"：用反证法，假设 $q+\lambda$ 二重简并，有两个正交的本征矢`}</Tx>
          <Eq n="EII-10" say="假设：本征值 $q+\lambda$ 有两个相互正交的本征矢（以 $\alpha$、$\beta$ 区分）。">{R`\braket{q+\lambda,\beta|q+\lambda,\alpha}=0`}</Eq>
          <Tx>{R`用 $S(-\lambda)$ 把它们"平移回去"：由 \eqref{EII-9}，二者都是本征值 $q$ 的本征矢；又因 $S$ 保持标积，它们仍正交，因而线性无关：`}</Tx>
          <Eq n="EII-11" say="把两个正交本征矢反向平移后，标积仍为零（平移算符幺正），因此在本征值 $q$ 处得到两个独立本征矢。">{R`\braket{q+\lambda,\beta|S^\dagger(-\lambda)S(-\lambda)|q+\lambda,\alpha}=\braket{q+\lambda,\beta|q+\lambda,\alpha}=0`}</Eq>
          <Tx>{R`于是 $q$ 至少二重简并，与假设矛盾。同样的论证双向成立，所以：**$Q$ 的所有本征值简并度都相同**——$S(\lambda)$ 在不同本征子空间之间建立了保持标积的一一对应。`}</Tx>
        </Sub>
        <Sub n="EII-2-c" title="Eigenvectors" zh="本征矢的相位约定">
          <Tx>{R`连续谱的每个本征矢只确定到一个相位。$S(\lambda)$ 提供了一个自然的"统一定相"办法：取定本征值 0 的本征矢 $\ket0$，**定义**`}</Tx>
          <Eq n="EII-12" say="用平移算符从 $\ket0$ 出发定义所有本征矢，从而固定它们之间的相对相位。">{R`\ket q=S(q)\ket0`}</Eq>
          <Tx>{R`这样，平移算符作用在任何本征矢上都不会多出相位：由 \eqref{EII-7}，`}</Tx>
          <Eq n="EII-13" say="平移算符把 $\ket q$ 精确地变成 $\ket{q+\lambda}$，不带额外相位。">{R`S(\lambda)\ket q=S(\lambda)S(q)\ket0=S(\lambda+q)\ket0=\ket{q+\lambda}`}</Eq>
          <Tx>{R`取伴随：`}</Tx>
          <Eq n="EII-14" say="上式的伴随：左矢 $\bra q$ 右乘 $S^\dagger(\lambda)$ 得到 $\bra{q+\lambda}$。">{R`\bra qS^\dagger(\lambda)=\bra{q+\lambda}`}</Eq>
          <Tx>{R`再用 \eqref{EII-4}（$S^\dagger(\lambda)=S(-\lambda)$）并把 $\lambda$ 换成 $-\lambda$：`}</Tx>
          <Eq n="EII-15" keyEq title="左矢的平移" say="平移算符从右边作用在左矢 $\bra q$ 上，把它变成 $\bra{q-\lambda}$：方向与右矢相反。">{R`\bra qS(\lambda)=\bra{q-\lambda}`}</Eq>
        </Sub>
      </Sub>

      <Sub n="EII-3" title="The q representation" zh={R`$\{\ket q\}$ 表象`}>
        <Tx>{R`$Q$ 是可观测量，$\{\ket q\}$ 构成基。任何态由它的"$\{\ket q\}$ 表象波函数"刻画：`}</Tx>
        <Eq n="EII-16" say="态在 $\{\ket q\}$ 表象中的波函数：在 $Q$ 的本征矢上的分量。">{R`\psi(q)=\braket{q|\psi}`}</Eq>
        <Tx>{R`现在逐个看三个算符在这个表象中的作用。`}</Tx>
        <Sub n="EII-3-a" title="The action of Q in the q representation" zh={R`$Q$ 的作用：乘以 $q$`}>
          <Tx>{R`$Q$ 厄米，$\bra qQ=q\bra q$：`}</Tx>
          <Eq n="EII-17" say="$Q$ 在自己的表象里就是乘以 $q$。">{R`\braket{q|Q|\psi}=q\braket{q|\psi}=q\psi(q)`}</Eq>
        </Sub>
        <Sub n="EII-3-b" title="The action of S(lambda) in the q representation; the translation operator" zh={R`$S(\lambda)$ 的作用：平移算符`}>
          <Tx>{R`用 \eqref{EII-15}：`}</Tx>
          <Eq n="EII-18" keyEq title={R`$S(\lambda)$ 把波函数平移 $\lambda$`} say="平移算符作用后的新波函数在 $q$ 处的值，等于原波函数在 $q-\lambda$ 处的值：整个波形沿 $q$ 轴向右移了 $\lambda$。">{R`\braket{q|S(\lambda)|\psi}=\braket{q-\lambda|\psi}=\psi(q-\lambda)`}</Eq>
          <Tx>{R`$\psi(q-\lambda)$ 是把 $\psi$ 的图形整体向 $+q$ 方向移动 $\lambda$ 后的函数：原来在 $q_0$ 的峰现在出现在 $q_0+\lambda$（新函数在 $q_0+\lambda$ 处取原函数在 $q_0$ 处的值）。所以 $S(\lambda)$ 名副其实叫**平移算符**。`}</Tx>
          <Box kind="warning" title="符号容易弄反">{R`$S(\lambda)=\mathrm e^{-i\lambda P/\hbar}$ 把波形向**正**方向移 $\lambda$，但新波函数的宗量是 $q-\lambda$。同样，右矢 $S(\lambda)\ket q=\ket{q+\lambda}$ 向右移，左矢 $\bra qS(\lambda)=\bra{q-\lambda}$ 向左移。记住一个就够了：$\langle Q\rangle$ 在 $S(\lambda)$ 作用后增加 $\lambda$（由 \eqref{EII-6}：$S^\dagger QS=Q+\lambda$）。`}</Box>
        </Sub>
        <Sub n="EII-3-c" title="The action of P in the q representation" zh={R`$P$ 的作用：$\frac\hbar i\frac{\dd}{\dd q}$`}>
          <Tx>{R`**思路：比较无穷小平移的两种写法。**一方面按指数展开，取 $\lambda=-\varepsilon$：`}</Tx>
          <Eq n="EII-19" say="反向无穷小平移算符的一阶展开：单位算符加上 $i\varepsilon P/\hbar$。">{R`S(-\varepsilon)=\mathrm e^{i\varepsilon P/\hbar}=\mathbb 1+i\frac\varepsilon\hbar P+O(\varepsilon^2)`}</Eq>
          <Tx>{R`于是在 $\{\ket q\}$ 表象中`}</Tx>
          <Eq n="EII-20" say="反向无穷小平移作用后的波函数，一阶修正正比于 $P$ 作用后的波函数。">{R`\braket{q|S(-\varepsilon)|\psi}=\psi(q)+i\frac\varepsilon\hbar\braket{q|P|\psi}+O(\varepsilon^2)`}</Eq>
          <Tx>{R`另一方面，由 \eqref{EII-18}，它就是平移后的波函数：`}</Tx>
          <Eq n="EII-21" say="反向平移 $\varepsilon$ 的波函数就是原波函数在 $q+\varepsilon$ 处的值。">{R`\braket{q|S(-\varepsilon)|\psi}=\psi(q+\varepsilon)`}</Eq>
          <Tx>{R`两式对比：`}</Tx>
          <Eq n="EII-22" say="波函数在 $q+\varepsilon$ 处的值等于 $q$ 处的值加上一阶项，一阶项由 $P$ 作用后的波函数给出。">{R`\psi(q+\varepsilon)=\psi(q)+i\frac\varepsilon\hbar\braket{q|P|\psi}+O(\varepsilon^2)`}</Eq>
          <Tx>{R`这就是 Taylor 展开的一阶项，所以`}</Tx>
          <Eq n="EII-23" keyEq title={R`$P$ 在 $\{\ket q\}$ 表象中作用为 $\frac\hbar i\frac{\dd}{\dd q}$`} say="$P$ 在 $\{\ket q\}$ 表象中的作用是对波函数求导再乘以 $\hbar/i$：动量是平移的生成元，生成无穷小平移的就是导数。">{R`\begin{aligned}\braket{q|P|\psi}&=\frac\hbar i\ \mathrm{Lim}_{\varepsilon\to0}\frac{\psi(q+\varepsilon)-\psi(q)}\varepsilon\\&=\frac\hbar i\frac{\dd}{\dd q}\psi(q)\end{aligned}`}</Eq>
          <Tx>{R`这就把 \IIeq{E-26} 推广到了任何一对正则共轭可观测量。反过来看也很有启发：有限平移 $\psi(q-\lambda)=\sum_n\frac{(-\lambda)^n}{n!}\psi^{(n)}(q)$ 就是 Taylor 级数，而它恰好等于 $\sum_n\frac1{n!}\left(-\frac{i\lambda P}\hbar\right)^n\psi$——**$\mathrm e^{-i\lambda P/\hbar}$ 不过是 Taylor 定理的算符写法**。`}</Tx>
          <Fig n="E-1" caption={R`交互（自绘）：平移算符的数值实现。把 $\psi(q)$ 做离散 Fourier 变换，在动量空间乘以 $\mathrm e^{-i\lambda p/\hbar}$（$\hbar=1$），再变回来，与直接计算的 $\psi(q-\lambda)$ 比较（红色虚线）。"Taylor 截断"模式（切换时自动选高斯波包、$\lambda=1$）改用 $\sum_{n\le N}(-i\lambda p/\hbar)^n/n!$，看级数如何逐阶逼近——它就是 $\psi(q-\lambda)$ 的 Taylor 展开。下方读数：最大偏差、模长平方与 $\langle Q\rangle$ 的变化。`}><TranslationDemo /></Fig>
        </Sub>
      </Sub>

      <Sub n="EII-4" title="The p representation. The symmetric nature of the P and Q observables" zh={R`$\{\ket p\}$ 表象；$P$ 与 $Q$ 的对称性`}>
        <Tx>{R`**$P$ 的本征函数。**在 $\{\ket q\}$ 表象中解 $\frac\hbar i v_p'(q)=p\,v_p(q)$，得到平面波（归一化到 $\delta(p-p')$）：`}</Tx>
        <Eq n="EII-24" keyEq title={R`$P$ 的本征函数是平面波`} say="动量本征矢在 $\{\ket q\}$ 表象中的波函数是平面波，振幅处处相同。">{R`v_p(q)=\braket{q|p}=(2\pi\hbar)^{-1/2}\ \mathrm e^{\frac i\hbar pq}`}</Eq>
        <Tx>{R`即`}</Tx>
        <Eq n="EII-25" say="动量本征矢是所有 $\ket q$ 以平面波为系数的叠加。">{R`\ket p=(2\pi\hbar)^{-1/2}\int_{-\infty}^{+\infty}\dd q\ \mathrm e^{\frac i\hbar pq}\ket q`}</Eq>
        <Tx>{R`**动量表象波函数。**`}</Tx>
        <Eq n="EII-26" say="态在 $\{\ket p\}$ 表象中的波函数：在 $P$ 的本征矢上的分量。">{R`\overline\psi(p)=\braket{p|\psi}`}</Eq>
        <Tx>{R`取 \eqref{EII-25} 的伴随（指数变号）并插入 $\int\dd q\ket q\bra q$：`}</Tx>
        <Eq n="EII-27" keyEq title="两个表象由 Fourier 变换联系" say="动量表象波函数是 $\{\ket q\}$ 表象波函数的 Fourier 变换。">{R`\overline\psi(p)=(2\pi\hbar)^{-1/2}\int_{-\infty}^{+\infty}\dd q\ \mathrm e^{-\frac i\hbar pq}\psi(q)`}</Eq>
        <Tx>{R`在这个表象中，$P$ 是乘以 $p$；$Q$ 由 \eqref{EII-27} 对 $p$ 求导可见作用为 $i\hbar\frac{\dd}{\dd p}$（与 \eqref{DII-22} 一致）。

**为什么一切都对称。**把 $Q$、$P$ 互换，对易关系只是变号：$[P,Q]=-i\hbar$。所以完全可以从另一个平移算符出发——平移**动量**的`}</Tx>
        <Eq n="EII-28" say="动量空间中的平移算符：以 $Q$ 为生成元，把 $P$ 的本征值平移 $\lambda'$。">{R`T(\lambda')=\mathrm e^{i\lambda'Q/\hbar}`}</Eq>
        <Tx>{R`——把上面所有论证中的 $P$ 换成 $Q$、$i$ 换成 $-i$，重复一遍，就得到 $P$ 的谱是整条实轴、$\{\ket p\}$ 表象中 $Q$ 作用为 $i\hbar\frac{\dd}{\dd p}$ 等等。**位置与动量在量子力学里没有谁更基本**；某个具体系统里哪个"看起来简单"，只取决于哈密顿量的形式。`}</Tx>
        <Box kind="aside" title="与第 I 章的联系">{R`\eqref{EII-27} 正是第 I 章中波包 $\psi(x)$ 与振幅 $g(k)$ 之间的 Fourier 关系（$p=\hbar k$）。第 I 章是从实验与 de Broglie 关系"读出"的；这里它成了 $[Q,P]=i\hbar$ 的数学推论。`}</Box>
      </Sub>
    </Sec>);
}
