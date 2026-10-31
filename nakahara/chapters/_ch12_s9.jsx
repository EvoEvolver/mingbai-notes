// §12.9 超对称量子力学 —— 式 (12.130)–(12.160)，习题 12.8–12.9
import { Sec, Sub, Tx, Eq, Box, Exercise, Derivation, C } from "@kit";

const R = String.raw;
const SP = R`\sym{slpar}{\not\partial}`;   // ∂̸ = γ^j ∂_j

export function Sec129() {
  return (
    <Sec n="12.9" title="Supersymmetric quantum mechanics" zh="超对称量子力学"
      gist={R`实 Grassmann 变量 $\psi_i$ 量子化后满足 Clifford 代数 $\{\psi_j,\psi_k\}=\delta_{jk}$，表示为 $\gamma_j/\sqrt2$ → 加上动能项得平直空间的超对称量子力学 $L=\frac12\dot x^2+\frac{\mathrm{i}}2\psi\dot\psi$，超对称变换 $\delta x=\mathrm{i}\epsilon\psi$、$\delta\psi=-\epsilon\dot x$，超荷 $Q=\mathrm{i}\psi_jp_j=\frac1{\sqrt2}\not\partial$ 就是 Dirac 算子，$Q^2=-H$ → 推广到 Riemann 流形：$Q=\mathrm{i}\langle\dot x,\psi\rangle$，由 $\delta Q=-2\mathrm{i}\epsilon L$ 读出 $L=\frac12\langle\dot x,\dot x\rangle+\frac{\mathrm{i}}2\langle\psi,D\psi/Dt\rangle$。`}
      why={R`§12.10 要把指标写成路径积分。为此需要一个量子力学系统，它的 Hilbert 空间是旋量场、它的超荷是 Dirac 算子、它的 Hamilton 量是 Dirac 算子的平方——超对称量子力学正好提供这一切。$(-1)^F$ 就是手征 $\gamma_{2n+1}$。`}
      gives={["12.130", "12.135", "12.137", "12.140", "12.142", "12.146", "12.150", "12.151", "12.153", "12.154"]}>
      <p className="muted">本节概念：<C id="susy_pairing" /> · <C id="witten_index" /></p>
      <Tx>{R`下一节将给出指标定理在最简单情形下的**物理学家的**证明。这一证明在很大程度上依赖于超对称量子力学（SUSYQM）的路径积分表述，本节先概述 SUSYQM。

我们已经学过玻色子与费米子的路径积分量子化（第 1 章）。如果把这两种粒子组合起来，就会出现一种新的对称性，称为**超对称**（supersymmetry）。下面我们将引入一类特殊的 SUSYQM，它在指标定理的证明中是关键。

本节与下一节可以独立于前面各节阅读，所需工具都在这里给出。讲述依照 Alvarez (1995) 与 Nakahara (1998)，原始文献是 Alvarez-Gaumé (1983) 与 Friedan–Windey (1984, 1985)。`}</Tx>

      <Sub n="12.9.1" title="Clifford algebra and fermions" zh="Clifford 代数与费米子">
        <Tx>{R`先只考虑在 $\R^3$ 中运动的粒子，更一般的情形稍后研究。设 $\{\psi_i\}=\{\psi_1,\psi_2,\psi_3\}$ 是**实** Grassmann 变量，$i=1,2,3$ 是坐标指标。它们满足代数

$$\{\psi_i,\psi_j\}=0.$$

考虑 Lagrange 量`}</Tx>
        <Eq n="12.130" say={R`实 Grassmann 变量的一阶 Lagrange 量：动能项只含一阶时间导数，外加与常数"磁场" $B_i$ 的耦合。`}>{R`L=\frac{\mathrm{i}}{2}\psi_i\dot\psi_i-\frac{\mathrm{i}}{2}\epsilon_{ijk}B_i\psi_j\psi_k`}</Eq>
        <Tx>{R`其中 $B_i$ 是实数。$\psi_i$ 的正则共轭动量为

$$\pi_i\equiv\frac{\partial L}{\partial\dot\psi_i}=-\frac{\mathrm{i}}{2}\psi_i.$$

（Grassmann 变量的左导数：$\dot\psi_i$ 要先移到最左边，$\psi_i\dot\psi_i=-\dot\psi_i\psi_i$。）于是 Hamilton 量为`}</Tx>
        <Eq n="12.131" say={R`动能项对 Hamilton 量没有贡献（一阶系统），Hamilton 量只剩与 $B$ 的耦合。`}>{R`H=-\dot\psi_i\frac{\mathrm{i}}{2}\psi_i-L=\frac{\mathrm{i}}{2}\epsilon_{ijk}B_i\psi_j\psi_k.`}</Eq>
        <Tx>{R`（$-\frac{\mathrm{i}}2\dot\psi_i\psi_i-\frac{\mathrm{i}}2\psi_i\dot\psi_i=0$，因为二者互为相反数。）该系统的 Poincaré 一形式为`}</Tx>
        <Eq n="12.132" say={R`Poincaré（辛势）一形式：$p\,\dd q$ 的 Grassmann 版本。`}>{R`\theta=\frac{\mathrm{i}}{2}\psi_i\dd\psi_i.`}</Eq>
        <Tx>{R`相应的辛二形式为`}</Tx>
        <Eq n="12.133" say={R`辛二形式。对 Grassmann 变量，$\dd\psi_i\wedge\dd\psi_i$ 不为零（对称而非反对称）。`}>{R`\omega=\dd\theta=\frac{\mathrm{i}}{2}\dd\psi_i\wedge\dd\psi_i`}</Eq>
        <Tx>{R`由此得到 Poisson 括号`}</Tx>
        <Eq n="12.134" say={R`Grassmann 变量的 Poisson 括号：$\psi_j$ 与 $\mathrm{i}\psi_k$ 互为共轭。`}>{R`[\psi_j,\mathrm{i}\psi_k]_{\rm PB}=\mathrm{i}\delta_{jk}.`}</Eq>
        <Tx>{R`系统的量子化通过把这个 Poisson 括号换成反对易关系实现：`}</Tx>
        <Eq n="12.135" title="量子化：Clifford 代数" say={R`量子化后，实 Grassmann 变量变成满足 Clifford 代数的算符——它们就是（除以 $\sqrt2$ 的）$\gamma$ 矩阵。`}>{R`\{\psi_j,\psi_k\}=\delta_{jk}.`}</Eq>
        <Tx>{R`这个反对易关系称为 $\R^3$ 中的 **Clifford 代数**。设 $\sigma_i$ 是第 $i$ 个 Pauli 矩阵。由 $\{\sigma_j,\sigma_k\}=2\delta_{jk}$ 容易验证 $\psi_i=\sigma_i/\sqrt2$ 是 Clifford 代数的二维表示。已知 Clifford 代数的有限维不可约表示是唯一的（在相似变换的意义下）。于是这个系统的 Hilbert 空间是 $\mathcal{H}=\C^2$。用 Pauli 矩阵改写 Hamilton 量：`}</Tx>
        <Eq n="12.136" say={R`Grassmann 系统量子化后就是磁场中的自旋：Pauli Hamilton 量。`}>{R`H=-\tfrac12\boldsymbol{B}\cdot\boldsymbol{\sigma}.`}</Eq>
        <Derivation title={R`从 \eqref{12.131} 到 \eqref{12.136}`} collapsed steps={[
          { tex: R`H=\frac{\mathrm{i}}{2}\epsilon_{ijk}B_i\frac{\sigma_j\sigma_k}{2}=\frac{\mathrm{i}}{4}\epsilon_{ijk}B_i\,\mathrm{i}\epsilon_{jkl}\sigma_l`, why: R`$j\neq k$ 时 $\sigma_j\sigma_k=\mathrm{i}\epsilon_{jkl}\sigma_l$（$\epsilon_{ijk}$ 使 $j=k$ 项为零）。` },
          { tex: R`=-\frac14B_i(2\delta_{il})\sigma_l=-\frac12\boldsymbol{B}\cdot\boldsymbol{\sigma}`, why: R`$\epsilon_{ijk}\epsilon_{jkl}=\epsilon_{ijk}\epsilon_{ljk}=2\delta_{il}$。` },
        ]} />
        <Tx>{R`这个 Hamilton 量称为 **Pauli Hamilton 量**，描述磁场中的自旋。类似地，$\R^{2n}$ 与 $\R^{2n+1}$ 中定义的 Clifford 代数作用在 Hilbert 空间 $\mathcal{H}=\C^{2^n}$ 上。`}</Tx>
      </Sub>

      <Sub n="12.9.2" title="Supersymmetric quantum mechanics in flat space" zh="平直空间中的超对称量子力学">
        <Tx>{R`Pauli Hamilton 量只由自旋坐标 $\psi_i$ 组成，与空间坐标 $x_k$ 无关，所以它不能描述运动的自旋。现在修改 Hamilton 量，使自旋可以在空间中运动——加上动能项即可。考虑 $\R^d$ 中的自旋，令 $\boldsymbol{B}=0$，得到 Lagrange 量（原书误作"Hamilton 量"）`}</Tx>
        <Eq n="12.137" title="平直空间的 SUSYQM" say={R`自由粒子 + 自由 Grassmann"自旋"：这样搭配系数，系统就有一个把 $x$ 与 $\psi$ 互换的对称性。`}>{R`L=\frac12\dot x_k\dot x_k+\frac{\mathrm{i}}{2}\psi_k\dot\psi_k.`}</Eq>
        <Tx>{R`这个 Lagrange 量的系数是为了使系统具有后面定义的超对称而选的。正则共轭动量为 $p_k=\dot x_k$ 与 $\pi_k=-\mathrm{i}\psi_k/2$，由此得到系统的 Poisson 括号

$$[x_j,x_k]_{\rm PB}=[p_j,p_k]_{\rm PB}=0\qquad[x_j,p_k]_{\rm PB}=[\psi_j,\psi_k]_{\rm PB}=\delta_{jk}.$$

由这些 Poisson 括号容易得到（反）对易关系。正则（反）对易关系为`}</Tx>
        <Eq n="12.138" say={R`正则（反）对易关系（原书吸收了 $\hbar$ 与因子 $\mathrm{i}$ 的约定，见习题 12.8 的注）。`}>{R`[x_j,x_k]=[p_j,p_k]=0\qquad[x_j,p_k]=\{\psi_j,\psi_k\}=\delta_{jk}.`}</Eq>
        <Tx>{R`Hamilton 量为`}</Tx>
        <Eq n="12.139" say={R`Hamilton 量就是自由粒子的动能：Grassmann 部分不贡献能量。`}>{R`H=\dot x_jp_j-\dot\psi_j\frac{\mathrm{i}}{2}\psi_j-L=\frac12p^2=-\frac12\Delta`}</Eq>
        <Tx>{R`其中 $\Delta=\sum_{k=1}^d\partial_k^2$ 是 $d$ 维 Laplace 算子。$H$ 作用的 Hilbert 空间是 $L^2(\R^d)\otimes\C^{2^n}$，$L^2(\R^d)$ 表示 $\R^d$ 上平方可积函数的集合，$n\equiv[d/2]$ 是 $d/2$ 的整数部分。

**超对称变换。**Lagrange 量的变分为

$$\delta L=\dot x_j\frac{\dd}{\dd t}\delta x_j+\frac{\mathrm{i}}{2}\delta\psi_j\dot\psi_j+\frac{\mathrm{i}}{2}\psi_j\frac{\dd}{\dd t}\delta\psi_j.$$

我们来验证 Lagrange 量在下面的**超对称变换**下不变：`}</Tx>
        <Eq n="12.140" title="超对称变换" say={R`超对称把玻色坐标 $x$ 变成费米坐标 $\psi$，又把 $\psi$ 变回 $x$ 的速度：参数 $\epsilon$ 是 Grassmann 数。`}>{R`\delta x_j=\mathrm{i}\epsilon\psi_j\qquad\delta\psi_j=-\epsilon\dot x_j`}</Eq>
        <Tx>{R`其中 $\epsilon$ 是"无穷小"的实 Grassmann 常数。事实上，`}</Tx>
        <Eq n="12.141" say={R`超对称变换下 Lagrange 量只改变一个全导数，作用量不变。`}>{R`\begin{aligned}\delta L&=\mathrm{i}\dot x_j\epsilon\dot\psi_j-\frac{\mathrm{i}}{2}\epsilon\dot x_j\dot\psi_j-\frac{\mathrm{i}}{2}\psi_j\epsilon\ddot x_j\\&=\mathrm{i}\dot x_j\epsilon\dot\psi_j-\frac{\mathrm{i}}{2}\epsilon\dot x_j\dot\psi_j-\frac{\mathrm{i}}{2}\frac{\dd}{\dd t}(\psi_j\epsilon\dot x_j)+\frac{\mathrm{i}}{2}\dot\psi_j\epsilon\dot x_j\\&=-\frac{\mathrm{i}}{2}\frac{\dd}{\dd t}(\psi_j\epsilon\dot x_j)\end{aligned}`}</Eq>
        <Tx>{R`（最后一步：$\dot x$ 是玻色量，$\mathrm{i}\dot x_j\epsilon\dot\psi_j=\mathrm{i}\epsilon\dot x_j\dot\psi_j$；而 $\dot\psi_j\epsilon=-\epsilon\dot\psi_j$，所以 $\frac{\mathrm{i}}2\dot\psi_j\epsilon\dot x_j=-\frac{\mathrm{i}}2\epsilon\dot x_j\dot\psi_j$。三项相加为零。）所以作用量 $S=\int L\dd t$ 不变。相应的荷（生成元）称为**超荷**（supercharge），由 Noether 定理定义为（粒子质量取为 1，所以 $p_j=\dot x_j$）`}</Tx>
        <Eq n="12.142" title="超荷" say={R`超荷：动量与费米坐标的"内积"——它将是 Dirac 算子。`}>{R`\epsilon Q\equiv\mathrm{i}\epsilon p_j\psi_j=\mathrm{i}\epsilon\psi_jp_j=\mathrm{i}\epsilon\psi_j\dot x_j.`}</Eq>
        <Exercise n="12.8" title="超荷生成超对称变换" level="★★"
          hint={R`$\epsilon Q$ 是 Grassmann 偶的，所以对 $x_j$ 与 $\psi_j$ 都应取对易子（原书对 $\psi$ 写成反对易子，应理解为"分次括号"）。用 \eqref{12.138}，并把 $\epsilon$ 移到最左边。`}
          solution={R`**对 $x_j$。**$[x_j,\epsilon Q]=\mathrm{i}\epsilon\psi_k[x_j,p_k]=\mathrm{i}\epsilon\psi_k\delta_{jk}=\mathrm{i}\epsilon\psi_j=\delta x_j$ ✓（$x_j$ 与 $\epsilon$、$\psi_k$ 对易）。

**对 $\psi_j$。**$\epsilon Q$ 是 Grassmann 偶的，分次括号就是对易子：

$$[\psi_j,\epsilon Q]=\psi_j\epsilon Q-\epsilon Q\psi_j=-\epsilon(\psi_jQ+Q\psi_j)=-\epsilon\{\psi_j,Q\}=-\mathrm{i}\epsilon\{\psi_j,\psi_k\}p_k=-\mathrm{i}\epsilon p_j=-\mathrm{i}\epsilon\dot x_j.$$

与 \eqref{12.140} 的 $\delta\psi_j=-\epsilon\dot x_j$ 相比多了一个因子 $\mathrm{i}$。

**注（存疑：原书的约定不完全自洽）。**\eqref{12.138} 把 $[x_j,p_k]$ 写成 $\delta_{jk}$，相当于把正则量子化规则 $[\ ,\ \}=\mathrm{i}[\ ,\ ]_{\rm PB}$ 中的 $\mathrm{i}$ 吸收掉了，但对 $\psi$ 的反对易子又没有这样做。若统一采用标准量子化 $[x_j,p_k]=\mathrm{i}\delta_{jk}$、$\{\psi_j,\psi_k\}=\delta_{jk}$，则同样的计算给出

$$[x_j,\epsilon Q]=-\epsilon\psi_j=\mathrm{i}\,\delta x_j,\qquad[\psi_j,\epsilon Q]=-\mathrm{i}\epsilon\dot x_j=\mathrm{i}\,\delta\psi_j,$$

即对两种变量统一地有 $\delta\mathcal{O}=-\mathrm{i}[\mathcal{O},\epsilon Q]$——这正是"$Q$ 生成超对称变换"的标准形式（Heisenberg 绘景中 $\delta\mathcal{O}=-\mathrm{i}[\mathcal{O},G]$）。结论不变：$Q$ 是超对称变换的生成元，差别只在 $\mathrm{i}$ 的约定。`}>
          <><Tx>{R`证明`}</Tx>
          <Eq n="12.143" say={R`超荷通过对易子生成坐标的超对称变换。`}>{R`\delta x_j=[x_j,\epsilon Q]`}</Eq>
          <Eq n="12.144" say={R`超荷通过（分次）括号生成费米坐标的超对称变换。`}>{R`\delta\psi_j=\{\psi_j,\epsilon Q\}.`}</Eq></>
        </Exercise>
        <Tx>{R`这些式子表明 $Q$ 是 SUSY 变换的生成元。

**超荷就是 Dirac 算子。**取 $d=2n$ 为偶数，下面把系统量子化。引入矩阵表示 $\psi_j=\gamma_j/\sqrt2$，它是上一小节二维表示的推广。这里 $\gamma_j$ 是 $d$ 维 Dirac 矩阵，满足 Clifford 代数`}</Tx>
        <Eq n="12.145" say={R`$d$ 维 Euclid Clifford 代数。`}>{R`\{\gamma_j,\gamma_k\}=2\delta_{jk}.`}</Eq>
        <Tx>{R`（原书右边的下标印作 $\delta_{ij}$。）Hamilton 量作用在 Hilbert 空间

$$\mathcal{H}=L_2(\R^{2n})\otimes\C^{2^n}$$

上。在坐标对角化的表示中（$p_j=-\mathrm{i}\partial/\partial x_j$），超荷的形式为`}</Tx>
        <Eq n="12.146" title="超荷 = Dirac 算子" say={R`量子化后的超荷正比于 Euclid 空间的 Dirac 算子 $\gamma_j\partial_j$。`}>{R`Q=\mathrm{i}\psi_jp_j=\frac1{\sqrt2}\gamma_j\frac{\partial}{\partial x_j}.`}</Eq>
        <Tx>{R`算子`}</Tx>
        <Eq n="12.147" say={R`Euclid 空间 $\R^{2n}$ 上的 Dirac 算子。`}>{R`${SP}\equiv\gamma_j\frac{\partial}{\partial x_j}`}</Eq>
        <Tx>{R`正是 Euclid 空间 $\R^{2n}$ 中的 Dirac 算子，它在指标定理的证明中起重要作用。

**超荷的超对称变分是 Lagrange 量。**超荷 $Q$ 在 SUSY 变换 \eqref{12.140} 下的变换方式很有意思（原书此处误作"hypercharge"）：`}</Tx>
        <Eq n="12.148" say={R`超荷的超对称变分正比于 Lagrange 量本身：$Q$ 是 $L$ 的"超对称伙伴"。`}>{R`\begin{aligned}\delta Q&=\mathrm{i}(\delta\psi_j)\dot x_j+\mathrm{i}\psi_j\frac{\dd}{\dd t}\delta x_j=\mathrm{i}(-\epsilon\dot x_j)\dot x_j+\mathrm{i}\psi_j(\mathrm{i}\epsilon\dot\psi_j)\\&=-\mathrm{i}\epsilon\dot x_j\dot x_j+\epsilon\psi_j\dot\psi_j=-2\mathrm{i}\epsilon\Big(\frac12\dot x_j\dot x_j+\frac{\mathrm{i}}{2}\psi_j\dot\psi_j\Big)\\&=-2\mathrm{i}\epsilon L.\end{aligned}`}</Eq>
        <Tx>{R`也就是说，超荷在无穷小 SUSY 变换下的变分就是 Lagrange 量！（第一行到第二行：$\mathrm{i}\psi_j\mathrm{i}\epsilon\dot\psi_j=-\psi_j\epsilon\dot\psi_j=\epsilon\psi_j\dot\psi_j$。）

**超对称代数。**下面考虑超荷与 Hamilton 量的关系。考虑以 Grassmann 参数 $\epsilon_1$、$\epsilon_2$ 先后进行的 SUSY 变换。先作 $\epsilon_1$ 变换再作 $\epsilon_2$ 变换，得到

$$x_j\xrightarrow{\epsilon_1}x_j+\mathrm{i}\epsilon_1\psi_j\xrightarrow{\epsilon_2}x_j+\mathrm{i}(\epsilon_1+\epsilon_2)\psi_j-\mathrm{i}\epsilon_1\epsilon_2\dot x_j$$
$$\psi_j\xrightarrow{\epsilon_1}\psi_j-\epsilon_1\dot x_j\xrightarrow{\epsilon_2}\psi_j-(\epsilon_1+\epsilon_2)\dot x_j-\mathrm{i}\epsilon_1\epsilon_2\dot\psi_j$$

而次序颠倒时，

$$x_j\to x_j+\mathrm{i}(\epsilon_1+\epsilon_2)\psi_j-\mathrm{i}\epsilon_2\epsilon_1\dot x_j$$
$$\psi_j\to\psi_j-(\epsilon_1+\epsilon_2)\dot x_j-\mathrm{i}\epsilon_2\epsilon_1\dot\psi_j.$$

由这些结果得到 SUSY 变分的对易关系：`}</Tx>
        <Eq n="12.149" title="两次超对称变换的对易子 = 时间平移" say={R`两次超对称变换的对易子是时间平移：超对称是"时间平移的平方根"。`}>{R`[\delta_{\epsilon_2},\delta_{\epsilon_1}]=\delta_{\epsilon_2}\delta_{\epsilon_1}-\delta_{\epsilon_1}\delta_{\epsilon_2}=-2\mathrm{i}\epsilon_1\epsilon_2\frac{\partial}{\partial t}.`}</Eq>
        <Tx>{R`两个 SUSY 变换的对易子是时间导数，即 Hamilton 量。这暗示 SUSY 变换的生成元——超荷——的反对易子也给出 Hamilton 量。事实上，

$$\begin{aligned}\{Q,Q\}=2Q^2&=2(\mathrm{i}p_j\psi_j)(\mathrm{i}p_k\psi_k)\\&=-p_jp_k(\psi_j\psi_k+\psi_k\psi_j)=-p_jp_k\delta_{jk}\\&=-2H.\end{aligned}$$

（第二行：$p_jp_k$ 关于 $j,k$ 对称，可以把 $\psi_j\psi_k$ 对称化。）最终 SUSY 代数化为`}</Tx>
        <Eq n="12.150" title="超对称代数" say={R`超荷的平方是负的 Hamilton 量：$H=(\mathrm{i}Q)^2\ge0$，所以 Dirac 算子的平方是 Laplace 型算子。`}>{R`Q^2=-H.`}</Eq>
        <Tx>{R`由于 $Q$ 是反 Hermite 的，Hamilton 量是谱非负的 Hermite 算子（$H=(\mathrm{i}Q)^\dagger(\mathrm{i}Q)$）。

总之，我们在 \eqref{12.148} 与 \eqref{12.141} 中证明了`}</Tx>
        <Eq n="12.151" title="超荷与 Lagrange 量互为超对称伙伴" say={R`$Q$ 的变分是 $L$，$L$ 的变分是 $Q$ 的时间导数——玻色量与费米量的角色互换。`}>{R`\delta Q=-2\mathrm{i}\epsilon L\qquad\delta L=\frac12\epsilon\frac{\dd Q}{\dd t}.`}</Eq>
        <Tx>{R`（第二式：由 \eqref{12.141}，$\delta L=-\frac{\mathrm{i}}2\frac{\dd}{\dd t}(\psi_j\epsilon\dot x_j)=\frac{\mathrm{i}}2\epsilon\frac{\dd}{\dd t}(\psi_j\dot x_j)=\frac12\epsilon\frac{\dd Q}{\dd t}$。）把它们与坐标 $x_j$、$\psi_j$ 的 SUSY 变换 \eqref{12.140} 相比较，容易看出玻色量（$x_j$ 与 $L$）与费米量（$\psi_j$ 与 $Q$）的角色互换了。注意 \eqref{12.151} 中 Lagrange 量 $L$ 的变分总是超荷 $Q$ 的时间导数。这一观察是由超荷 $Q$ 构造 SUSY 不变 Lagrange 量的关键：只要能写出 $Q$，令 $L\propto\delta Q$，$L$ 就自动（在差一个全导数的意义下）超对称。`}</Tx>
      </Sub>

      <Sub n="12.9.3" title="Supersymmetric quantum mechanics in a general manifold" zh="一般流形上的超对称量子力学">
        <Tx>{R`设 $M$ 是 $\dim M=2n$ 的 Riemann 流形，Riemann 度规为

$$\dd s^2=g_{\mu\nu}\dd x^\mu\dd x^\nu$$

两个向量 $X$、$Y$ 关于这个度规的内积记作 $\langle X,Y\rangle=g_{\mu\nu}X^\mu Y^\nu$。

向量 $\psi^\mu(t)$ 在每个时刻 $t$ 属于 $T_{x(t)}M$。因此在坐标变换 $x^\mu\to x'^\mu=x'^\mu(x^\nu)$ 下，$\psi^\mu(t)$ 服从通常的向量变换规则：`}</Tx>
        <Eq n="12.152" say={R`费米坐标 $\psi^\mu$ 像切向量一样变换：它是"Grassmann 值的切向量"。`}>{R`\psi^\mu\to\psi'^\mu=\frac{\partial x'^\mu}{\partial x^\nu}\psi^\nu.`}</Eq>
        <Tx>{R`于是在 SUSY 变换 $\delta\equiv\delta_\epsilon$ 下，坐标变换为

$$\delta x'^\mu=\frac{\partial x'^\mu}{\partial x^\nu}\delta x^\nu=\frac{\partial x'^\mu}{\partial x^\nu}\mathrm{i}\epsilon\psi^\nu=\mathrm{i}\epsilon\psi'^\mu$$

以及

$$\begin{aligned}\delta\psi'^\mu&=\frac{\partial^2x'^\mu}{\partial x^\nu\partial x^\lambda}\delta x^\lambda\psi^\nu+\frac{\partial x'^\mu}{\partial x^\nu}\delta\psi^\nu\\&=\frac{\partial^2x'^\mu}{\partial x^\nu\partial x^\lambda}\mathrm{i}\epsilon\psi^\lambda\psi^\nu+\frac{\partial x'^\mu}{\partial x^\nu}(-\epsilon\dot x^\nu)=-\epsilon\dot x'^\mu\end{aligned}$$

其中最后一个等号用到了 Grassmann 数的反交换性：$\psi^\lambda\psi^\nu$ 关于 $\lambda\nu$ 反对称，而二阶导数对称，缩并为零。（原书第二行误印为 $(-\mathrm{i}\epsilon\dot x^\nu)$，应为 $(-\epsilon\dot x^\nu)$，与 \eqref{12.140} 一致。）这些变换规则表明 SUSY 变换在坐标变换 $x^\mu\to x'^\mu$ 下是协变的。

上一小节引入的超荷 $Q$ 应在流形 $M$ 上推广为`}</Tx>
        <Eq n="12.153" say={R`弯曲流形上的超荷：速度与费米坐标用度规做内积。`}>{R`Q=\mathrm{i}\langle\dot x,\psi\rangle=\mathrm{i}g_{\mu\nu}(x)\dot x^\mu\psi^\nu.`}</Eq>
        <Tx>{R`$M$ 上的 SUSY 不变 Lagrange 量由这个 $Q$ 的 SUSY 变分构造：

$$\begin{aligned}\delta Q&=\mathrm{i}\partial_\lambda g_{\mu\nu}\delta x^\lambda\dot x^\mu\psi^\nu+\mathrm{i}g_{\mu\nu}\delta\dot x^\mu\psi^\nu+\mathrm{i}g_{\mu\nu}\dot x^\mu\delta\psi^\nu\\&=\mathrm{i}\partial_\lambda g_{\mu\nu}\mathrm{i}\epsilon\psi^\lambda\dot x^\mu\psi^\nu+\mathrm{i}g_{\mu\nu}(\mathrm{i}\epsilon\dot\psi^\mu)\psi^\nu+\mathrm{i}g_{\mu\nu}\dot x^\mu(-\epsilon\dot x^\nu)\\&=-2\mathrm{i}\epsilon\Big[\frac12g_{\mu\nu}\dot x^\mu\dot x^\nu+\frac{\mathrm{i}}{2}g_{\mu\nu}\psi^\nu\dot\psi^\mu-\frac{\mathrm{i}}{2}\dot x^\mu\frac12(\partial_\lambda g_{\mu\nu}-\partial_\nu g_{\mu\lambda}-\partial_\mu g_{\lambda\nu})\psi^\lambda\psi^\nu\Big]\\&=-2\mathrm{i}\epsilon\Big(\frac12g_{\mu\nu}\dot x^\mu\dot x^\nu+\frac{\mathrm{i}}{2}g_{\mu\nu}\psi^\nu\dot\psi^\mu+\frac{\mathrm{i}}{2}\dot x^\mu g_{\lambda\rho}\Gamma^\rho{}_{\mu\nu}\psi^\lambda\psi^\nu\Big)\end{aligned}$$

其中

$$\Gamma^\nu{}_{\lambda\mu}=\tfrac12g^{\nu\rho}(\partial_\lambda g_{\rho\mu}+\partial_\mu g_{\lambda\rho}-\partial_\rho g_{\lambda\mu})$$

是 Levi-Civita 联络的 Christoffel 符号（原书最后一项误印为 $\partial_\rho g_{\lambda\nu}$）。注意对称性 $\Gamma^\lambda{}_{\mu\nu}=\Gamma^\lambda{}_{\nu\mu}$。`}</Tx>
        <Derivation title="上式第三、四行的细节（本站补全）" collapsed steps={[
          { tex: R`\mathrm{i}\partial_\lambda g_{\mu\nu}\,\mathrm{i}\epsilon\psi^\lambda\dot x^\mu\psi^\nu=-\epsilon\,\dot x^\mu\partial_\lambda g_{\mu\nu}\psi^\lambda\psi^\nu=-\epsilon\,\dot x^\mu\tfrac12(\partial_\lambda g_{\mu\nu}-\partial_\nu g_{\mu\lambda})\psi^\lambda\psi^\nu`, why: R`$\psi^\lambda\psi^\nu$ 反对称，只有系数的反对称部分存活。再加上关于 $\lambda\nu$ 对称的 $-\partial_\mu g_{\lambda\nu}$ 不改变结果（与 $\psi^\lambda\psi^\nu$ 缩并为零），这样做是为了凑出 Christoffel 符号。写成 $-2\mathrm{i}\epsilon\times[\cdots]$ 时系数为 $-\frac{\mathrm{i}}2\cdot\frac12(\cdots)$。` },
          { tex: R`-\tfrac12(\partial_\lambda g_{\mu\nu}-\partial_\nu g_{\mu\lambda}-\partial_\mu g_{\lambda\nu})=\tfrac12(\partial_\mu g_{\lambda\nu}+\partial_\nu g_{\mu\lambda}-\partial_\lambda g_{\mu\nu})=g_{\lambda\rho}\Gamma^\rho{}_{\mu\nu}`, why: R`由（改正后的）Christoffel 符号定义，$g_{\lambda\rho}\Gamma^\rho{}_{\mu\nu}=\frac12(\partial_\mu g_{\lambda\nu}+\partial_\nu g_{\mu\lambda}-\partial_\lambda g_{\mu\nu})$。` },
          { tex: R`\mathrm{i}g_{\mu\nu}(\mathrm{i}\epsilon\dot\psi^\mu)\psi^\nu=-\epsilon g_{\mu\nu}\dot\psi^\mu\psi^\nu=\epsilon g_{\mu\nu}\psi^\nu\dot\psi^\mu=-2\mathrm{i}\epsilon\cdot\tfrac{\mathrm{i}}{2}g_{\mu\nu}\psi^\nu\dot\psi^\mu`, why: R`交换两个 Grassmann 量 $\dot\psi^\mu$、$\psi^\nu$ 得一个负号。` },
        ]} />
        <Tx>{R`把这个 $\delta Q$ 与 \eqref{12.151} 比较，读出 Lagrange 量`}</Tx>
        <Eq n="12.154" title="弯曲流形上的 SUSY Lagrange 量" say={R`弯曲流形上的超对称 Lagrange 量：测地运动的动能 + 费米坐标沿路径的协变"动能"——$\psi$ 被平行移动。`}>{R`\begin{aligned}L&=\frac12g_{\mu\nu}(x)\dot x^\mu\dot x^\nu+\frac{\mathrm{i}}{2}g_{\mu\nu}(x)\psi^\mu\Big(\frac{\dd\psi^\nu}{\dd t}+\dot x^\lambda\Gamma^\nu{}_{\lambda\kappa}(x)\psi^\kappa\Big)\\&=\frac12\langle\dot x,\dot x\rangle+\frac{\mathrm{i}}{2}\Big\langle\psi,\frac{D\psi}{Dt}\Big\rangle.\end{aligned}`}</Eq>
        <Tx>{R`这里 $D\psi/Dt$ 是 $\psi$ 沿曲线 $x(t)$ 的协变导数。`}</Tx>
        <Exercise n="12.9" title="弯曲流形上 $\delta L\propto\dot Q$" level="★★★"
          hint={R`用协变变分：令 $\Delta\psi\equiv\delta\psi+\Gamma\,\delta x\,\psi$，它等于 $\delta\psi$（$\Gamma\psi\psi=0$）。$\delta\langle\dot x,\dot x\rangle/2=\langle\dot x,D(\delta x)/Dt\rangle$；$\delta$ 与 $D/Dt$ 交换时多出曲率项 $R(\delta x,\dot x)\psi$，而 $R_{\mu\nu\rho\sigma}\psi^\mu\psi^\nu\psi^\rho=0$（第一 Bianchi 恒等式）。`}
          solution={R`把 $L=\frac12\langle\dot x,\dot x\rangle+\frac{\mathrm{i}}2\langle\psi,D\psi/Dt\rangle$ 写成协变形式后逐项变分（$\delta x=\mathrm{i}\epsilon\psi$，$\delta\psi=-\epsilon\dot x$）。

**协变变分。**$\psi$ 的协变变分 $\Delta\psi^\mu=\delta\psi^\mu+\Gamma^\mu{}_{\nu\lambda}\delta x^\nu\psi^\lambda=\delta\psi^\mu+\mathrm{i}\epsilon\Gamma^\mu{}_{\nu\lambda}\psi^\nu\psi^\lambda=\delta\psi^\mu$（$\Gamma$ 对称、$\psi\psi$ 反对称）。度规相容，所以 $\delta\langle A,B\rangle=\langle\Delta A,B\rangle+\langle A,\Delta B\rangle$。

**动能项。**$\delta(\frac12\langle\dot x,\dot x\rangle)=\langle\dot x,\frac{D}{Dt}\delta x\rangle=\mathrm{i}\epsilon\langle\dot x,\frac{D\psi}{Dt}\rangle$。

**费米项。**$\delta\big(\frac{\mathrm{i}}2\langle\psi,\frac{D\psi}{Dt}\rangle\big)=\frac{\mathrm{i}}2\langle\Delta\psi,\frac{D\psi}{Dt}\rangle+\frac{\mathrm{i}}2\langle\psi,\Delta\frac{D\psi}{Dt}\rangle$，而 $\Delta\frac{D\psi}{Dt}=\frac{D}{Dt}\Delta\psi+R(\delta x,\dot x)\psi$。于是
- 第一部分：$\frac{\mathrm{i}}2\langle-\epsilon\dot x,\frac{D\psi}{Dt}\rangle=-\frac{\mathrm{i}}2\epsilon\langle\dot x,\frac{D\psi}{Dt}\rangle$；
- 第二部分：$\frac{\mathrm{i}}2\langle\psi,-\epsilon\frac{D\dot x}{Dt}\rangle=\frac{\mathrm{i}}2\epsilon\langle\psi,\frac{D\dot x}{Dt}\rangle$（把 $\epsilon$ 移过 $\psi$ 得一个负号）；
- 曲率部分：$\frac{\mathrm{i}}2\psi^\mu R_{\mu\nu\rho\sigma}\psi^\nu(\mathrm{i}\epsilon\psi^\rho)\dot x^\sigma\propto\epsilon\,R_{\mu\nu\rho\sigma}\psi^\mu\psi^\nu\psi^\rho\dot x^\sigma=0$，因为 $\psi^\mu\psi^\nu\psi^\rho$ 全反对称，而 $R_{\mu[\nu\rho\sigma]}=0$ 等价于 $R_{[\mu\nu\rho]\sigma}=0$（第一 Bianchi 恒等式）。

**相加。**$\delta L=\mathrm{i}\epsilon\langle\dot x,\frac{D\psi}{Dt}\rangle-\frac{\mathrm{i}}2\epsilon\langle\dot x,\frac{D\psi}{Dt}\rangle+\frac{\mathrm{i}}2\epsilon\langle\psi,\frac{D\dot x}{Dt}\rangle=\frac{\mathrm{i}}2\epsilon\Big(\langle\frac{D\dot x}{Dt},\psi\rangle+\langle\dot x,\frac{D\psi}{Dt}\rangle\Big)=\frac{\mathrm{i}}2\epsilon\frac{\dd}{\dd t}\langle\dot x,\psi\rangle=\frac12\epsilon\frac{\dd Q}{\dd t}.$

平直空间中曲率项不存在，此即 \eqref{12.151} 的第二式。`}>
          <><Tx>{R`证明 SUSY 变分下 Lagrange 量正比于超荷的时间导数：`}</Tx>
          <Eq n="12.155" say={R`弯曲流形上 Lagrange 量的超对称变分仍是全导数，作用量超对称不变。`}>{R`\delta L=\frac12\epsilon\frac{\dd Q}{\dd t}.`}</Eq></>
        </Exercise>
        <Tx>{R`超荷的量子版本为`}</Tx>
        <Eq n="12.156" say={R`量子化后，弯曲流形上的超荷就是 $M$ 上的 Dirac 算子。`}>{R`Q\sim g_{\mu\nu}p^\mu\gamma^\nu`}</Eq>
        <Tx>{R`即 $M$ 上的 Dirac 算子 $${SP}$（$p_\mu\to-\mathrm{i}\nabla_\mu$，含自旋联络）。

下面定义一些下一节要用的记号。联络一形式为`}</Tx>
        <Eq n="12.157" say={R`Levi-Civita 联络一形式。`}>{R`\Gamma^\mu{}_\nu=\dd x^\lambda\,\Gamma^\mu{}_{\lambda\nu}`}</Eq>
        <Tx>{R`而 Riemann 曲率二形式为`}</Tx>
        <Eq n="12.158" say={R`曲率二形式 = 联络的外微分 + 联络的平方（第二结构方程）。`}>{R`\mathcal{R}^\mu{}_\nu=\dd\Gamma^\mu{}_\nu+\Gamma^\mu{}_\sigma\wedge\Gamma^\sigma{}_\nu.`}</Eq>
        <Tx>{R`把 Riemann 曲率二形式按 $\dd x^\rho\wedge\dd x^\sigma$ 展开，得到`}</Tx>
        <Eq n="12.159" say={R`曲率二形式的分量就是通常的 Riemann 张量。`}>{R`\mathcal{R}^\mu{}_\nu=\tfrac12R^\mu{}_{\nu\rho\sigma}\dd x^\rho\wedge\dd x^\sigma`}</Eq>
        <Tx>{R`其分量就是通常的 Riemann 曲率张量。这个分量也可以用联络 $\nabla_\mu$ 写成`}</Tx>
        <Eq n="12.160" say={R`Riemann 张量 = 协变导数的对易子作用在坐标基上；第二行是用 Christoffel 符号的显式表达。`}>{R`\begin{aligned}R^\kappa{}_{\lambda\mu\nu}&=\Big\langle\dd x^\kappa,\nabla_\mu\nabla_\nu\frac{\partial}{\partial x^\lambda}-\nabla_\nu\nabla_\mu\frac{\partial}{\partial x^\lambda}\Big\rangle\\&=\partial_\mu\Gamma^\kappa{}_{\nu\lambda}-\partial_\nu\Gamma^\kappa{}_{\mu\lambda}+\Gamma^\eta{}_{\nu\lambda}\Gamma^\kappa{}_{\mu\eta}-\Gamma^\eta{}_{\mu\lambda}\Gamma^\kappa{}_{\nu\eta}.\end{aligned}`}</Eq>
      </Sub>
    </Sec>);
}
