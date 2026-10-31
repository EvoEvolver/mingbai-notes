// §12.10 指标定理的超对称证明 —— 式 (12.161)–(12.194)，定理 12.4–12.6，习题 12.10–12.11
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, C } from "@kit";

const R = String.raw;
const CD = R`\mathcal{D}`;
const RT = R`\tilde{\mathcal{R}}`;
const GC = R`\sym{Gch}{\Gamma}`;          // 分级矩阵 Γ = (−1)^F
const CHI = R`\sym{chi0}{\chi}`;          // Grassmann 换元变量 χ

export function Sec1210() {
  return (
    <Sec n="12.10" title="Supersymmetric proof of index theorem" zh="指标定理的超对称证明"
      gist={R`非零谱的配对使指标在小形变下不变（定理 12.4），且 $\ind\mathcal{D}=\mathrm{Tr}\,\Gamma\mathrm{e}^{-\beta H}$ 与 $\beta$ 无关（定理 12.5）→ 自旋流形上 $\Gamma=\gamma_{2n+1}=(-1)^F$，$H=(\mathrm{i}Q)^2$，指标 = 费米子取**周期**边界的 SUSYQM 路径积分 → $\beta\to0$ 时路径积分局域到常值圈，在 Riemann 法坐标中展开到二阶 → 高斯积分给出 $\prod_j\frac{y_j/2}{\sin(\beta y_j/2)}$，归一化 $\mathcal{N}=\mathrm{i}^n$ → 费米零模积分挑出体积形式：$\ind Q=\int_M\det^{1/2}\frac{\mathcal{R}/4\pi}{\sinh(\mathcal{R}/4\pi)}=\int_M\hat A(M)$。`}
      why={R`这是本章唯一完整给出的指标定理证明。它用物理学家熟悉的工具（路径积分、鞍点近似、$\zeta$ 正规化）把"零模个数之差"变成"曲率的积分"，而关键的一步——$\beta$ 无关性允许取 $\beta\to0$——正是 Witten 指标的思想。`}
      gives={["12.162", "12.164", "12.165", "12.168", "12.171", "12.175", "12.179", "12.186", "12.188", "12.191", "12.193", "12.194"]}>
      <p className="muted">本节概念：<C id="witten_index" /> · <C id="dirac_index" /></p>
      <Tx>{R`本节利用上一节建立的超对称量子力学，在最简单的情形下证明指标定理。`}</Tx>

      <Sub n="12.10.1" title="The index" zh="指标">
        <Tx>{R`考虑向量丛 $E_\pm\xrightarrow{\pi}M$，$E=E_+\oplus E_-$，设 $${CD}$ 是椭圆微分算子，作用为

$$${CD}:\Gamma(M,E^+)\to\Gamma(M,E^-).$$

利用纤维范数，可以定义 $${CD}$ 的伴随

$$${CD}^\dagger:\Gamma(M,E^-)\to\Gamma(M,E^+).$$

假设 $${CD}$ 是 Fredholm 算子，则指标`}</Tx>
        <Eq n="12.161" say={R`仍是零模之差。`}>{R`\ind${CD}=\dim\ker${CD}-\dim\ker${CD}^\dagger`}</Eq>
        <Tx>{R`是良定义的（原书此处写作 $\mathrm{Ind}$，与 $\ind$ 同义）。`}</Tx>
        <Stmt id="T12.4">
          <Proof steps={[
            { claim: R`首先注意 $${CD}${CD}^\dagger$ 与 $${CD}^\dagger${CD}$ 是非负的，由此可知`, tex: R`\ker${CD}=\ker${CD}^\dagger${CD}\qquad\ker${CD}^\dagger=\ker${CD}${CD}^\dagger.`, why: R`若 $${CD}^\dagger${CD}\phi=0$，则 $0=\langle\phi,${CD}^\dagger${CD}\phi\rangle=\|${CD}\phi\|^2$；反之显然。`, fill: true },
            { claim: R`设 $\{\phi_n\}$ 是 $${CD}^\dagger${CD}:\Gamma(M,E^+)\to\Gamma(M,E^+)$ 的正交归一本征截面：`, tex: R`(${CD}^\dagger${CD})\phi_n=\lambda_n\phi_n.` },
            { claim: R`对 $\lambda_n>0$（即 $\phi_n\in(\ker${CD})^\perp$）定义 $\psi_n\equiv${CD}\phi_n/\sqrt{\lambda_n}$。则 $\psi_n$ 是本征值同为 $\lambda_n$ 的本征截面，即 $\psi_n\in(\ker${CD}^\dagger)^\perp$：`, tex: R`(${CD}${CD}^\dagger)\psi_n=${CD}(${CD}^\dagger${CD}\phi_n)/\sqrt{\lambda_n}=\lambda_n${CD}\phi_n/\sqrt{\lambda_n}=\lambda_n\psi_n.` },
            { claim: R`而且 $\{\psi_n\}$ 是正交归一的本征截面：`, tex: R`\langle\psi_n|\psi_m\rangle=\frac{1}{\sqrt{\lambda_n\lambda_m}}\langle\phi_n|${CD}^\dagger${CD}|\phi_m\rangle=\frac{\lambda_m}{\sqrt{\lambda_n\lambda_m}}\delta_{nm}=\delta_{nm}.` },
            { claim: R`于是 $(\ker${CD})^\perp$ 与 $(\ker${CD}^\dagger)^\perp$ 之间有自然的同构（反方向由 $\phi_n=${CD}^\dagger\psi_n/\sqrt{\lambda_n}$ 给出）。但注意 $\ker${CD}$ 与 $\ker${CD}^\dagger$ 之间**没有**这样的同构。` },
            { claim: R`设由于 $${CD}$ 的小扰动，$\ker${CD}$ 中有 $N$ 个态获得了非零本征值，$\dim\ker${CD}$ 减少 $N$。由上面的观察，必须有同样数目的态离开 $\ker${CD}^\dagger$，否则 $(\ker${CD})^\perp$ 就不再与 $(\ker${CD}^\dagger)^\perp$ 同构。类似地，若 $\dim\ker${CD}$ 增加 $N$，$\dim\ker${CD}^\dagger$ 也必须增加 $N$，以保持 $(\ker${CD})^\perp$ 与 $(\ker${CD}^\dagger)^\perp$ 的配对。所以 $\ind${CD}$ 在 $${CD}$ 的小扰动下不变。`, why: R`"小"的含义：扰动后的算子仍是 Fredholm 的，且本征值连续变化（零附近的本征值只能从附近的小本征值中产生或回到其中）。本征值从零离开时必然以 $\lambda>0$ 的一对 $(\phi,\psi)$ 形式出现；交互图 1 中随意加扰动可以看到这一点。`, fill: true },
          ]} />
        </Stmt>
        <Stmt id="T12.5">
          <Eq n="12.162" title="指标 = 两个热核迹之差" say={R`指标等于两个 Laplace 型算子热核迹之差，对任何"逆温度" $\beta>0$ 都成立。`}>{R`\ind${CD}=\mathrm{Tr}\,\mathrm{e}^{-\beta${CD}^\dagger${CD}}-\mathrm{Tr}\,\mathrm{e}^{-\beta${CD}${CD}^\dagger}`}</Eq>
          <Proof steps={[
            { claim: R`\eqref{12.162} 中的迹分别对 $\{\phi_n\}$ 与 $\{\psi_n\}$ 取。设 $\{\phi^0_i\}$ 与 $\{\psi^0_j\}$ 分别是 $\ker${CD}$ 与 $\ker${CD}^\dagger$ 的正交归一本征截面，$1\le i\le\dim\ker${CD}$，$1\le j\le\dim\ker${CD}^\dagger$。则` },
            { tex: R`\begin{aligned}&\mathrm{Tr}\,\mathrm{e}^{-\beta${CD}^\dagger${CD}}-\mathrm{Tr}\,\mathrm{e}^{-\beta${CD}${CD}^\dagger}\\&=\sum_{\lambda_n\neq0}\langle\phi_n|\mathrm{e}^{-\beta${CD}^\dagger${CD}}|\phi_n\rangle-\sum_{\lambda_n\neq0}\langle\psi_n|\mathrm{e}^{-\beta${CD}${CD}^\dagger}|\psi_n\rangle+\sum_i\langle\phi^0_i|\phi^0_i\rangle-\sum_j\langle\psi^0_j|\psi^0_j\rangle\\&=\sum_{\lambda_n\neq0}\mathrm{e}^{-\beta\lambda_n}(\langle\phi_n|\phi_n\rangle-\langle\psi_n|\psi_n\rangle)+\sum_i1-\sum_j1\\&=\dim\ker${CD}-\dim\ker${CD}^\dagger=\ind${CD}.\end{aligned}`, uses: ["T12.4"] },
            { claim: R`由于对 $i$、$j$ 的求和与 $\beta$ 无关，这样定义的 $\ind${CD}$ 与 $\beta$ 无关。` },
          ]} />
        </Stmt>
        <Tx>{R`其中 $\beta>0$ 是实常数。事实上，指标与 $\beta$ 无关。

**分级算子。**定理 12.5 中出现的迹就是热核（\eqref{12.108}）。令 $E=E_+\oplus E_-$，定义作用在 $E$ 上的微分算子（参见 \eqref{12.79}；算子 $Q$ 稍后将被认定为超荷）`}</Tx>
        <Eq n="12.163" say={R`把 $\mathcal{D}$ 与 $\mathcal{D}^\dagger$ 拼成一个自伴算子 $\mathrm{i}Q$——它就是 Dirac 算子的抽象形式。`}>{R`\mathrm{i}Q\equiv\begin{pmatrix}0&${CD}^\dagger\\${CD}&0\end{pmatrix}:E\to E.`}</Eq>
        <Tx>{R`再定义"Hamilton 量"与矩阵 $${GC}$：`}</Tx>
        <Eq n="12.164" title={R`Hamilton 量与分级算子 $\Gamma$`} say={R`$H=(\mathrm{i}Q)^2$ 在两个分块上分别是 $\mathcal{D}^\dagger\mathcal{D}$ 与 $\mathcal{D}\mathcal{D}^\dagger$；$\Gamma$ 给两块分别配上 $\pm1$。`}>{R`H=(\mathrm{i}Q)^2=\begin{pmatrix}${CD}^\dagger${CD}&0\\0&${CD}${CD}^\dagger\end{pmatrix}\qquad${GC}=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.`}</Eq>
        <Tx>{R`由于这样定义的 $Q$ 是反 Hermite 的，算子 $H$ 是 Hermite 且非负的。利用 $${GC}$，$${CD}$ 的指标可以紧凑地写成`}</Tx>
        <Eq n="12.165" keyEq title="Witten 指标" say={R`指标 = 带分级 $\Gamma$ 的配分函数（Witten 指标）：玻色态与费米态的非零能级两两抵消，只剩零能态之差。`}>{R`\ind${CD}=\mathrm{Tr}\,${GC}\mathrm{e}^{-\beta H}.`}</Eq>
        <Tx>{R`**自旋流形。**设 $M$ 是自旋流形，即第二 Stiefel–Whitney 类 $w_2(M)$ 平凡的流形（定理 11.7）。于是 $M$ 上的 $\mathrm{SO}(k)$ 主丛可以提升为 $\mathrm{SPIN}(k)$ 主丛：

$$\begin{matrix}\mathrm{SO}(k)&\leftarrow&\mathrm{SPIN}(k)\\ \downarrow\pi&&\\ M&&\end{matrix}$$

设 $E=\Delta(M)$ 是这个自旋丛。与 $\Delta(M)$ 相伴的是 Clifford 代数 $\{\gamma^\mu,\gamma^\nu\}=2\delta^{\mu\nu}$。定义**手征算子**`}</Tx>
        <Eq n="12.166" say={R`$2n$ 维的手征算子：所有 $\gamma$ 的乘积乘以 $\mathrm{i}^n$。`}>{R`\gamma_{2n+1}\equiv\mathrm{i}^n\gamma_1\gamma_2\ldots\gamma_{2n}.`}</Eq>
        <Tx>{R`由 $\gamma_{2n+1}^2=1$ 可知 $\gamma_{2n+1}$ 的本征值只能是 $\pm1$，称为**手征**。`}</Tx>
        <Exercise n="12.10" title="手征算子的性质" level="★"
          hint={R`把 $\gamma_1\cdots\gamma_{2n}$ 倒序需要 $n(2n-1)$ 次对换。$\gamma_\mu$ 与乘积中 $2n-1$ 个其他 $\gamma$ 反对易、与自身对易。`}
          solution={R`**平方。**$(\gamma_1\cdots\gamma_{2n})(\gamma_1\cdots\gamma_{2n})$：把第二组倒序成 $\gamma_{2n}\cdots\gamma_1$ 需要 $\binom{2n}{2}=n(2n-1)$ 次相邻对换，每次一个负号，然后逐对消去（$\gamma_\mu^2=1$）。所以 $(\gamma_1\cdots\gamma_{2n})^2=(-1)^{n(2n-1)}=(-1)^n$，再乘 $(\mathrm{i}^n)^2=(-1)^n$，得 $\gamma_{2n+1}^2=1$。

**反对易。**取定 $\mu$。$\gamma_\mu\gamma_1\cdots\gamma_{2n}$：把 $\gamma_\mu$ 往右移过整个乘积，经过 $2n$ 个因子，其中 $2n-1$ 个与它反对易（每次一个负号）、1 个就是它自己（对易）。所以 $\gamma_\mu(\gamma_1\cdots\gamma_{2n})=(-1)^{2n-1}(\gamma_1\cdots\gamma_{2n})\gamma_\mu$，即 $\{\gamma_\mu,\gamma_{2n+1}\}=0$。

（Hermite 性：$\gamma_{2n+1}^\dagger=(-\mathrm{i})^n\gamma_{2n}\cdots\gamma_1=(-\mathrm{i})^n(-1)^{n(2n-1)}\gamma_1\cdots\gamma_{2n}=\mathrm{i}^n\gamma_1\cdots\gamma_{2n}$。）`}>
          {R`用 Clifford 代数证明

$$\gamma_{2n+1}^2=1\qquad\{\gamma_\mu,\gamma_{2n+1}\}=0.$$`}
        </Exercise>
        <Tx>{R`对偶数 $k$，截面集合 $\Gamma(M,\Delta)$ 不是 $\mathrm{SPIN}(k)$ 的不可约表示，而可以按手征分解为两个子空间：`}</Tx>
        <Eq n="12.167" say={R`旋量场按手征分解。`}>{R`\Gamma(M,\Delta)=\Gamma(M,\Delta^+)\oplus\Gamma(M,\Delta^-)`}</Eq>
        <Tx>{R`其中 $\psi_\pm\in\Gamma(M,\Delta^\pm)$ 满足 $\gamma_{2n+1}\psi_\pm=\pm\psi_\pm$。给 $\Gamma(M,\Delta^+)$ 中的截面指定**费米子数** $F=0$，给 $\Gamma(M,\Delta^-)$ 中的截面指定 $F=1$。于是 \eqref{12.164} 中定义的 $${GC}$ 可以写成`}</Tx>
        <Eq n="12.168" title={R`手征 = $(-1)^F$`} say={R`手征就是费米子数的宇称：正手征算"玻色态"，负手征算"费米态"。`}>{R`${GC}=(-1)^F.`}</Eq>
        <Tx>{R`显然算子 $Q$ 翻转手征，因此 $\{Q,${GC}\}=0$。

设 $Q$ 是 $M$ 上的 Dirac 算子，$${GC}=\gamma_{2n+1}$。事实上，由习题 12.10（原书误作 12.11）可知 $\{Q,\gamma_{2n+1}\}=0$，$\gamma_{2n+1}$ 可以认定为 $(-1)^F$。当 $${GC}$ 像 \eqref{12.164} 那样对角化时，手征本征截面表示为（记号略有滥用：$\psi_\pm$ 既表示 $\Gamma(M,S)$ 中的截面，也表示 $\Gamma(M,\Delta^\pm)$ 中的分量）`}</Tx>
        <Eq n="12.169" say={R`手征基中，正手征旋量只有上半块，负手征旋量只有下半块。`}>{R`\psi_+=\begin{pmatrix}\psi_+\\0\end{pmatrix}\qquad\psi_-=\begin{pmatrix}0\\ \psi_-\end{pmatrix}.`}</Eq>
        <Tx>{R`于是显然，$${CD}:\Gamma(M,\Delta^+)\to\Gamma(M,\Delta^-)$ 与 $${CD}^\dagger:\Gamma(M,\Delta^-)\to\Gamma(M,\Delta^+)$ 分别等同于 \eqref{12.79} 中的 $D$ 与 $D^\dagger$。因此 Dirac 算子的指标定义为`}</Tx>
        <Eq n="12.170" say={R`Dirac 算子的指标：正手征零模数减负手征零模数。`}>{R`\ind Q=\dim\ker D-\dim\ker D^\dagger.`}</Eq>
        <Tx>{R`物理学家常把 $\ker D$ 与 $\ker D^\dagger$ 中的截面称为**零模**。于是 Dirac 算子的指标就是正、负手征零模个数之差。下一小节将看到，这个指标有路径积分表示。`}</Tx>
      </Sub>

      <Sub n="12.10.2" title="Path integral and index theorem" zh="路径积分与指标定理">
        <Tx>{R`考虑 $2n$ 维自旋流形 $M$ 上的 Dirac 算子 $Q$。从现在起采用 Euclid 时间（$t\to-\mathrm{i}t$）。

设 $H=(\mathrm{i}Q)^2=\frac12g_{\mu\nu}p^\mu p^\nu$ 是与 $Q$ 相应的 Hamilton 量（平直时由 \eqref{12.150}；弯曲时差一个曲率项 $\frac18R$，它是 $O(\beta)$ 的，不影响结果）。于是 Dirac 算子的指标有路径积分表示`}</Tx>
        <Eq n="12.171" title="指标的路径积分表示" say={R`Dirac 指标 = 超对称量子力学在周期边界条件下的欧氏路径积分：插入 $(-1)^F$ 等于把费米子的反周期边界条件改成周期的。`}>{R`\begin{aligned}\ind Q&=\mathrm{Tr}\,${GC}\mathrm{e}^{-\beta H}=\mathrm{Tr}(-1)^F\mathrm{e}^{-\beta H}\\&=\int_{\rm PBC}\mathcal{D}x\,\mathcal{D}\psi\,\mathrm{e}^{-\int_0^\beta\dd t\,L}\end{aligned}`}</Eq>
        <Tx>{R`其中 Lagrange 量 $L$ 由 \eqref{12.154} 引入（Euclid 化后）：`}</Tx>
        <Eq n="12.172" say={R`欧氏 SUSY Lagrange 量：测地动能 + 费米坐标的协变"Berry 项"。`}>{R`L=\frac12g_{\mu\nu}(x)\dot x^\mu\dot x^\nu+\frac12g_{\mu\nu}(x)\psi^\mu\frac{D\psi^\nu}{Dt}`}</Eq>
        <Tx>{R`PBC 表示路径积分是对在 $[0,\beta]$ 上满足周期边界条件的函数进行的。**如果把费米变量的反周期边界条件换成周期的，因子 $(-1)^F$ 就消失了。**这可以从下面的观察看出。在路径积分形式中，带 $(-1)^F$ 的迹为（见 §1.5）`}</Tx>
        <Eq n="12.173" say={R`费米迹的相干态表示：通常的迹在 $\langle-\theta|$ 与 $|\theta\rangle$ 之间取（反周期）。`}>{R`\begin{aligned}\mathrm{tr}(-1)^F\mathrm{e}^{-\beta H}&=\sum_n\langle n|(-1)^F\mathrm{e}^{-\beta H}|n\rangle\\&=\int\dd\theta^*\dd\theta\,\langle-\theta|(-1)^F\mathrm{e}^{-\beta H}|\theta\rangle\mathrm{e}^{-\theta^*\theta}\end{aligned}`}</Eq>
        <Tx>{R`其中 $F=c^\dagger c$ 是费米子数算符。注意到

$$|\theta\rangle=|0\rangle+|1\rangle\theta\qquad(-1)^F|\theta\rangle=|0\rangle-|1\rangle\theta=|-\theta\rangle$$

这个积分化为`}</Tx>
        <Eq n="12.174" say={R`插入 $(-1)^F$ 把 $\langle-\theta|$ 变回 $\langle\theta|$：边界条件变为周期的。`}>{R`\int\dd\theta^*\dd\theta\,\langle\theta|\mathrm{e}^{-\beta H}|\theta\rangle\mathrm{e}^{-\theta^*\theta}.`}</Eq>
        <Tx>{R`所以去掉 $(-1)^F$ 时，必须把边界条件换成周期的。

本节余下部分计算这个路径积分，证明它化为由 Dirac $\hat A$ 亏格给出的拓扑指标。

**$\beta\to0$ 的局域化。**把 \eqref{12.140} 中的 $t\to-\mathrm{i}t$，得到 Euclid 时间中的 SUSY 变换

$$\delta x^\mu=\mathrm{i}\epsilon\psi^\mu\qquad\delta\psi^\mu=-\mathrm{i}\epsilon\dot x^\mu.$$

上一小节已证明指标与 $\beta$ 无关，因此计算迹时可以取 $\beta\downarrow0$ 的极限。把时间参数重新标度为 $t=\beta s$，作用量化为`}</Tx>
        <Eq n="12.175" title="$\beta\to0$ 的标度" say={R`换成无量纲时间后，动能项前面出现 $1/\beta$：$\beta\to0$ 时任何非常值的路径都被指数压低——路径积分局域到常值圈。`}>{R`\begin{aligned}&\int_0^\beta\dd t\Big[\frac12g_{\mu\nu}(x)\dot x^\mu\dot x^\nu+\frac12g_{\mu\nu}(x)\psi^\mu\frac{D\psi^\nu}{Dt}\Big]\\&=\int_0^1\dd s\Big[\frac1\beta\frac12g_{\mu\nu}(x)\frac{\dd x^\mu}{\dd s}\frac{\dd x^\nu}{\dd s}+\frac12g_{\mu\nu}(x)\psi^\mu\frac{D\psi^\nu}{Ds}\Big].\end{aligned}`}</Eq>
        <Tx>{R`于是任何 $\dot x\neq0$ 的路径在 $\beta\downarrow0$ 时对路径积分的贡献都是指数小的。因此在这个极限下，只有 $x(t)=$ 常数的路径有贡献。这些路径显然满足周期边界条件。（费米项没有 $1/\beta$：$\psi$ 的一阶作用量在标度下不变。）

周期边界条件迫使我们取 $M$ 中的圈的集合——记作 $L(M)$——作为玻色坐标的位形空间。为了对路径积分应用鞍点法，必须求出作用量的极值集合 $\mathcal{M}$，即经典 Euler–Lagrange 方程的解：`}</Tx>
        <Eq n="12.176" say={R`玻色坐标的运动方程：测地方程加上一个费米双线性的"自旋–曲率力"（类似带自旋粒子的 Papapetrou 力）。`}>{R`-g_{\lambda\mu}(x)\frac{D\dot x^\mu}{Dt}+\frac12R_{\mu\nu\lambda\rho}\psi^\mu\psi^\nu\dot x^\rho=0`}</Eq>
        <Eq n="12.177" say={R`费米坐标的运动方程：$\psi$ 沿路径平行移动。`}>{R`\frac{D\psi^\mu}{Dt}=\frac{\dd\psi^\mu}{\dd t}+\dot x^\lambda\Gamma^\mu{}_{\lambda\nu}\psi^\nu=0.`}</Eq>
        <Tx>{R`概述这些方程的推导是有益的，因为其中充分利用了 Grassmann 数的反交换性与 Riemann 张量的对称性。`}</Tx>
        <Derivation title={R`推导 \eqref{12.177}（$\psi$ 的 Euler–Lagrange 方程）`} collapsed steps={[
          { tex: R`0=\frac{\partial L}{\partial\psi^\rho}-\frac{\dd}{\dd t}\Big(\frac{\partial L}{\partial\dot\psi^\rho}\Big)=\frac12g_{\rho\nu}\frac{D\psi^\nu}{Dt}-\frac12g_{\kappa\nu}\psi^\kappa\dot x^\lambda\Gamma^\nu{}_{\lambda\rho}+\frac12\frac{\dd}{\dd t}(g_{\rho\nu}\psi^\nu)`, why: R`$L$ 中的费米部分 $\frac12g_{\kappa\nu}\psi^\kappa(\dot\psi^\nu+\dot x^\lambda\Gamma^\nu{}_{\lambda\sigma}\psi^\sigma)$；对 $\psi^\rho$ 求导时它出现在两处（Grassmann 导数要注意次序与符号）。` },
          { tex: R`=\frac12\Big[g_{\rho\nu}\frac{D\psi^\nu}{Dt}-g_{\kappa\nu}\dot x^\lambda\Gamma^\nu{}_{\lambda\rho}\psi^\kappa+(\partial_\lambda g_{\rho\nu})\dot x^\lambda\psi^\nu+g_{\rho\nu}\dot\psi^\nu\Big]`, why: R`展开时间导数。` },
          { tex: R`0=\frac{D\psi^\mu}{Dt}+\dot\psi^\mu+\dot x^\lambda\Big[g^{\mu\rho}(\partial_\lambda g_{\rho\nu})-g^{\mu\rho}g_{\nu\kappa}\Gamma^\kappa{}_{\lambda\rho}\Big]\psi^\nu=2\frac{D\psi^\mu}{Dt}`, why: R`乘以 $g^{\mu\rho}$ 并对 $\rho$ 求和。方括号用到恒等式 $g^{\mu\rho}[(\partial_\lambda g_{\rho\nu})-\frac12(\partial_\lambda g_{\nu\rho}+\partial_\rho g_{\nu\lambda}-\partial_\nu g_{\lambda\rho})]=g^{\mu\rho}\frac12(\partial_\lambda g_{\rho\nu}+\partial_\nu g_{\lambda\rho}-\partial_\rho g_{\nu\lambda})=\Gamma^\mu{}_{\nu\lambda}$，于是 $\dot\psi^\mu+\dot x^\lambda\Gamma^\mu{}_{\lambda\nu}\psi^\nu=D\psi^\mu/Dt$。这就证明了 \eqref{12.177}。` },
        ]} />
        <Derivation title={R`推导 \eqref{12.176}（$x$ 的 Euler–Lagrange 方程；在 Riemann 法坐标中计算）`} collapsed steps={[
          { tex: R`\frac{\partial L}{\partial x^\mu}-\frac{\dd}{\dd t}\Big(\frac{\partial L}{\partial\dot x^\mu}\Big)=\frac12(\partial_\mu g_{\alpha\beta})\dot x^\alpha\dot x^\beta+\frac12(\partial_\mu g_{\alpha\beta})\psi^\alpha\frac{D\psi^\beta}{Dt}+\frac12g_{\alpha\beta}\psi^\alpha\dot x^\lambda\partial_\mu\Gamma^\beta{}_{\lambda\kappa}\psi^\kappa-\frac{\dd}{\dd t}\Big(g_{\mu\nu}\dot x^\nu+\frac12g_{\alpha\beta}\psi^\alpha\Gamma^\beta{}_{\mu\kappa}\psi^\kappa\Big)`, why: R`原书的完整推导在一般坐标中进行，中间几行有若干指标笔误（如 $\Gamma^\beta{}_{\mu\kappa}\Gamma^\gamma{}_{\lambda\kappa}$、$g_{\alpha\beta}\Gamma^\beta{}_{\lambda\beta}$），结果 \eqref{12.176} 是对的。这里改用更干净的法坐标论证：两边都是张量，在任一点的法坐标中验证即可。` },
          { tex: R`\text{在 }x\text{ 点的法坐标中：}\ g_{\mu\nu}=\delta_{\mu\nu},\ \partial_\lambda g_{\mu\nu}=0,\ \Gamma^\mu{}_{\nu\lambda}=0\ (\text{但 }\partial\Gamma\neq0)`, why: R`于是含 $\partial g$ 或不带导数的 $\Gamma$ 的项都为零。` },
          { tex: R`-\frac{\dd}{\dd t}(g_{\mu\nu}\dot x^\nu)+\frac12(\partial_\mu g_{\alpha\beta})\dot x^\alpha\dot x^\beta=-\Big[g_{\mu\nu}\ddot x^\nu+\frac12(\partial_\lambda g_{\mu\nu}+\partial_\nu g_{\mu\lambda}-\partial_\mu g_{\nu\lambda})\dot x^\nu\dot x^\lambda\Big]=-g_{\mu\nu}\frac{D\dot x^\nu}{Dt}`, why: R`这一步在任意坐标中都成立。` },
          { tex: R`\frac12\psi^\alpha\dot x^\lambda\partial_\mu\Gamma_{\alpha\lambda\kappa}\psi^\kappa-\frac12\psi^\alpha\dot x^\lambda\partial_\lambda\Gamma_{\alpha\mu\kappa}\psi^\kappa=\frac12(\partial_\mu\Gamma_{\alpha\lambda\kappa}-\partial_\lambda\Gamma_{\alpha\mu\kappa})\psi^\alpha\psi^\kappa\dot x^\lambda`, why: R`第二项来自 $\frac{\dd}{\dd t}\Gamma=\dot x^\lambda\partial_\lambda\Gamma$；$\dot\psi$ 项乘的是 $\Gamma=0$。记 $\Gamma_{\alpha\lambda\kappa}\equiv g_{\alpha\beta}\Gamma^\beta{}_{\lambda\kappa}$。` },
          { tex: R`R_{\alpha\kappa\mu\lambda}=\partial_\mu\Gamma_{\alpha\lambda\kappa}-\partial_\lambda\Gamma_{\alpha\mu\kappa}\quad(\text{法坐标})\ \Rightarrow\ 0=-g_{\mu\nu}\frac{D\dot x^\nu}{Dt}+\frac12R_{\alpha\kappa\mu\lambda}\psi^\alpha\psi^\kappa\dot x^\lambda`, why: R`由 \eqref{12.160}，$\Gamma=0$ 处 $R^\alpha{}_{\kappa\mu\lambda}=\partial_\mu\Gamma^\alpha{}_{\lambda\kappa}-\partial_\lambda\Gamma^\alpha{}_{\mu\kappa}$。重新命名哑指标（$\alpha\kappa\mu\lambda\to\mu\nu\lambda\rho$）即得 \eqref{12.176}。两边都是协变的，所以对一般坐标也成立。` },
        ]} />
        <Tx>{R`**经典解。**回到运动方程 \eqref{12.176} 与 \eqref{12.177} 的解。显然，$x=$ 常数、$\psi=$ 常数是一组解。因此 $x_p:t\mapsto p\in M$ 总包含在解中，可以写成 $M\subset\mathcal{M}$。$\psi=0$ 时 \eqref{12.176} 化为测地方程，但一般不是。当基本群 $\pi_1(M)$ 非平凡时，一般存在不可缩的闭测地线。但它们对路径积分的贡献在 $\beta\downarrow0$ 时像 $\exp(-c/\beta)$ 那样指数地消失（$c$ 是测地线长度平方的一半），因而可以忽略。

**鞍点法。**在证明指标定理之前，需要说明鞍点法（saddle point method）。从一个简单的例子开始。考虑积分

$$Z=\int_{-\infty}^\infty\frac{\dd x}{\sqrt{2\pi\hbar}}\mathrm{e}^{-f(x)/\hbar}.$$

设函数 $f(x)$ 只在 $x=x_0$ 处有一个极小值，且 $x\to\pm\infty$ 时 $f(x)\to\infty$。考虑取 $\hbar\to0$ 时积分 $Z$ 的渐近展开。令 $x=x_0+\sqrt\hbar\,y$，把 $f(x)$ 在 $x_0$ 处展开。考虑到 $f'(x_0)=0$，得到

$$f(x)=f(x_0)+\frac1{2!}\hbar y^2f''(x_0)+\frac1{3!}\hbar^{3/2}y^3f^{(3)}(x_0)+\frac1{4!}\hbar^2y^4f^{(4)}(x_0)+\cdots.$$

代入 $Z$，得到

$$Z=\mathrm{e}^{-f(x_0)/\hbar}\int_{-\infty}^\infty\frac{\dd y}{\sqrt{2\pi}}\times\exp\Big[-\frac12y^2f''(x_0)-\Big(\frac1{3!}\hbar^{1/2}y^3f^{(3)}(x_0)+\frac1{4!}\hbar y^4f^{(4)}(x_0)+\cdots\Big)\Big].$$

定义 $y$ 的矩

$$\langle y^n\rangle=\frac{\int\frac{\dd y}{\sqrt{2\pi}}y^n\mathrm{e}^{-y^2f''(x_0)/2}}{\int\frac{\dd y}{\sqrt{2\pi}}\mathrm{e}^{-y^2f''(x_0)/2}}.$$

最终得到 $Z$ 的展开

$$Z=\frac{\mathrm{e}^{-f(x_0)/\hbar}}{\sqrt{f''(x_0)}}\Big\langle\exp\Big[-\frac1{3!}\hbar^{1/2}y^3f^{(3)}(x_0)-\frac1{4!}\hbar y^4f^{(4)}(x_0)\cdots\Big]\Big\rangle.$$

有人也许以为展开 $\langle\cdots\rangle$ 会得到 $O(\hbar^{1/2})$ 的项。但实际并非如此，因为 $\langle y^3\rangle=0$，事实上 $\langle\cdots\rangle=1+O(\hbar)$。在下面指标定理的证明中，参数 $\hbar$ 换成 $\beta$。但指标与 $\beta$ 无关，所以 $O(\beta)$ 的项必须为零，从而**只需考虑作用量的极值及其二阶涨落**。`}</Tx>
        <Exercise n="12.11" title="Stirling 公式" level="★"
          hint={R`$n!=\Gamma(n+1)=\int_0^\infty x^n\mathrm{e}^{-x}\dd x$。令 $x=ny$，把被积函数写成 $\mathrm{e}^{-nf(y)}$，$\hbar\leftrightarrow1/n$。`}
          solution={R`$n!=\int_0^\infty x^n\mathrm{e}^{-x}\dd x$。令 $x=ny$：

$$n!=n^{n+1}\int_0^\infty\mathrm{e}^{-n(y-\ln y)}\dd y.$$

令 $\hbar=1/n$，$f(y)=y-\ln y$。$f'(y)=1-1/y=0$ 给出唯一极小 $y_0=1$，$f(1)=1$，$f''(1)=1$。由鞍点展开，$\int\frac{\dd y}{\sqrt{2\pi\hbar}}\mathrm{e}^{-f/\hbar}\simeq\frac{\mathrm{e}^{-f(y_0)/\hbar}}{\sqrt{f''(y_0)}}$，即

$$\int_0^\infty\mathrm{e}^{-n(y-\ln y)}\dd y\simeq\sqrt{\frac{2\pi}{n}}\,\mathrm{e}^{-n}.$$

于是 $n!\simeq n^{n+1}\sqrt{2\pi/n}\,\mathrm{e}^{-n}=\sqrt{2\pi n}\,\mathrm{e}^{-n}n^n$。（积分下限 $y=0$ 处被积函数 $\to0$，延伸到 $-\infty$ 的误差是指数小的。）下一阶修正：$f^{(3)}(1)=-2$、$f^{(4)}(1)=6$，$\langle y^4\rangle=3$、$\langle y^6\rangle=15$，展开到 $O(\hbar)$：$\langle\cdots\rangle=1+\hbar\big[-\frac{f^{(4)}}{24}\langle y^4\rangle+\frac{(f^{(3)})^2}{72}\langle y^6\rangle\big]=1+\frac1n\big(-\frac{18}{24}+\frac{60}{72}\big)=1+\frac1{12n}$，即著名的 $n!\simeq\sqrt{2\pi n}\,n^n\mathrm{e}^{-n}(1+\frac1{12n}+\cdots)$。数值：$n=10$ 时 $\sqrt{2\pi\cdot10}\,10^{10}\mathrm{e}^{-10}=3598696$，精确值 $3628800$，相对误差 $0.83\%\approx1/120$。`}>
          <><Tx>{R`用上面的展开证明 **Stirling 公式**（原书误作"Staring"）`}</Tx>
          <Eq n="12.178" say={R`阶乘的鞍点近似：$\Gamma$ 函数积分在 $x=n$ 处有尖锐的极大。`}>{R`n!\simeq\sqrt{2\pi n}\,\mathrm{e}^{-n}n^n`}</Eq>
          <Tx>{R`对 $n\gg1$ 成立。`}</Tx></>
        </Exercise>
        <Tx>{R`**二阶涨落。**回到 SUSYQM。计算 $Z$ 时考虑经典解周围的二阶涨落。路径积分的主要贡献来自解 $x=x_0$、$\psi=\psi_0$。为方便起见，采用以 $x=x_0$ 为原点的 **Riemann 法坐标**（Riemann normal coordinate），即度规张量满足条件（当然，这一选取一般并不意味着 Riemann 张量为零）

$$g_{\mu\nu}(x_0)=\delta_{\mu\nu}\qquad\frac{\partial}{\partial x^\lambda}g_{\mu\nu}(x_0)=0$$

的坐标系。于是 $g\equiv\det g=1$。在这个坐标系中定义涨落

$$x^\mu(t)=x_0^\mu+\xi^\mu(t)\qquad\psi^\mu(t)=\psi_0^\mu+\eta^\mu(t).$$

注意 $\dd x^\mu=\dd\xi^\mu$、$\dd\psi^\mu=\dd\eta^\mu$。作用量的二阶展开写成`}</Tx>
        <Eq n="12.179" title="二阶涨落作用量" say={R`常值解周围的二阶作用量：自由的玻色与费米涨落，外加一个由费米零模和曲率组成的"磁场" $\tilde{\mathcal{R}}_{\mu\nu}$ 耦合到玻色涨落上。`}>{R`S_2=\int_0^\beta\dd t\Big[\frac12\frac{\dd\xi^\mu}{\dd t}\frac{\dd\xi^\mu}{\dd t}+\frac12\eta^\mu\frac{\dd\eta^\mu}{\dd t}+\frac12${RT}_{\mu\nu}(x_0)\xi^\mu\frac{\dd\xi^\nu}{\dd t}\Big]`}</Eq>
        <Tx>{R`其中

$$${RT}_{\mu\nu}(x_0)=\tfrac12R_{\mu\nu\rho\sigma}(x_0)\psi_0^\rho\psi_0^\sigma.$$

（来源：法坐标中 $\Gamma^\mu{}_{\lambda\nu}(x_0+\xi)\approx-\frac13(R^\mu{}_{\nu\lambda\sigma}+R^\mu{}_{\lambda\nu\sigma})\xi^\sigma$，代入 $\frac12\psi_0^\mu\dot x^\lambda\Gamma_{\mu\lambda\nu}\psi_0^\nu$，用 Bianchi 恒等式整理即得 $\frac12\tilde{\mathcal{R}}_{\mu\nu}\xi^\mu\dot\xi^\nu$ 加一个全导数。）不必说，零阶作用量 $S_0=S(x_0,\psi_0)$ 恒为零。

用二阶作用量 $S_2$ 计算指标：`}</Tx>
        <Eq n="12.180" say={R`在鞍点近似下，指标是二阶涨落作用量的高斯路径积分。`}>{R`\ind Q=\int\mathcal{D}\xi\,\mathcal{D}\eta\,\mathrm{e}^{-S_2}`}</Eq>
        <Tx>{R`这里用到了路径积分测度的平移不变性 $\mathcal{D}x\mathcal{D}\psi=\mathcal{D}\xi\mathcal{D}\eta$。考虑到 $\xi$、$\eta$ 的周期边界条件，它们的 Fourier 展开为

$$\xi^\mu=\frac1{\sqrt\beta}\sum_{n=-\infty}^\infty\xi^\mu_n\mathrm{e}^{2\pi\mathrm{i}nt/\beta}\qquad\eta^\mu=\frac1{\sqrt\beta}\sum_{n=-\infty}^\infty\eta^\mu_n\mathrm{e}^{2\pi\mathrm{i}nt/\beta}.$$

$S_2$ 中 $\xi$ 的涨落算子为 $-\delta_{\mu\nu}\frac{\dd^2}{\dd t^2}+${RT}_{\mu\nu}\frac{\dd}{\dd t}$，$\eta$ 的涨落算子为 $\delta_{\mu\nu}\frac{\dd}{\dd t}$。必须把零模 $\xi^\mu_0$ 与 $\eta^\mu_0$（$n=0$）在下面的高斯积分中单独考虑（对 $\xi_0$、$\eta_0$ 的积分等价于对 $x_0$、$\psi_0$ 的积分）。考虑到这些，写成`}</Tx>
        <Eq n="12.181" say={R`玻色涨落给出行列式的 $-1/2$ 次幂，费米涨落给出 $+1/2$ 次幂；二者合并成一个一阶算子的行列式。零模单独积分。`}>{R`\begin{aligned}\ind Q&=\mathcal{N}\int\prod_{\mu=1}^d\frac{\dd\xi^\mu_0}{\sqrt{2\pi}}\dd\eta^\mu_0\Big[\mathrm{Det}'_{\rm PBC}\Big(\delta_{\mu\nu}\frac{\dd}{\dd t}\Big)\Big]^{1/2}\times\Big[\mathrm{Det}'_{\rm PBC}\Big(-\delta_{\mu\nu}\frac{\dd^2}{\dd t^2}+${RT}_{\mu\nu}(x_0)\frac{\dd}{\dd t}\Big)\Big]^{-1/2}\\&=\mathcal{N}\int\prod_{\mu=1}^d\frac{\dd\xi^\mu_0}{\sqrt{2\pi}}\dd\eta^\mu_0\Big[\mathrm{Det}'_{\rm PBC}\Big(-\delta_{\mu\nu}\frac{\dd}{\dd t}+${RT}_{\mu\nu}(x_0)\Big)\Big]^{-1/2}\end{aligned}`}</Eq>
        <Tx>{R`其中撇号表示略去零模，$\mathcal{N}$ 是归一化因子，它处理与 Grassmann 数排序有关的含糊之处。（第二个等号：$-\frac{\dd^2}{\dd t^2}+\tilde{\mathcal{R}}\frac{\dd}{\dd t}=\frac{\dd}{\dd t}\big(-\frac{\dd}{\dd t}+\tilde{\mathcal{R}}\big)$，行列式可以分解，$\mathrm{Det}'(\frac{\dd}{\dd t})$ 的幂次相消。）下面计算这个因子。

**费米部分的归一化 $\mathcal{N}_f$。**由于 $\ind Q$ 与 $\beta$ 无关，为简单起见令 $\beta=1$。再取度规为 $g_{\mu\nu}=\delta_{\mu\nu}$ 以简化计算，这时费米部分与玻色部分完全分离。注意到 $H_{\rm fermion}=0$，费米部分给出

$$\mathrm{Tr}\,\gamma_{2n+1}=\int_{\rm PBC}\mathcal{D}\psi\,\mathrm{e}^{-\frac12\int_0^1\psi\cdot\dot\psi\,\dd t}=\mathcal{N}_f\mathrm{Det}'_{\rm PBC}(\delta_{\mu\nu}\partial_t)^{1/2}\int\dd\psi^1_0\cdots\dd\psi^{2n}_0$$

其中 $\psi^\mu_0$ 是零模。行列式计算如下。首先，§1.5 的论证表明，这个行列式实际上是

$$\mathrm{Det}_{\rm PBC}(\partial_t+\omega)=\lim_{\varepsilon\to0}\mathrm{Det}((1-\varepsilon\omega)\partial_t+\omega)$$

这里引入了谐振子频率 $\omega$，计算最后令它为零。"配分函数"为`}</Tx>
        <Eq n="12.182" say={R`费米谐振子的 Witten 指标：两个能级 $\mp\omega/2$ 的贡献相减，等于周期边界下（含零模的）行列式。`}>{R`\mathrm{tr}(-1)^F\mathrm{e}^{-\beta H}=2\sinh(\beta\omega/2)=\mathrm{e}^{\beta\omega/2}\mathrm{Det}_{\rm PBC}((1-\varepsilon\omega)\partial_t+\omega).`}</Eq>
        <Tx>{R`所以 $\omega\to0$ 时，去掉零模本征值 $\omega$ 后的行列式为`}</Tx>
        <Eq n="12.183" say={R`去掉零模的一阶算子行列式：$\zeta$ 正规化下等于 $\beta$，$\beta=1$ 时为 1。`}>{R`\mathrm{Det}'_{\rm PBC}(\partial_t)=\lim_{\omega\to0}\mathrm{e}^{-\beta\omega/2}\frac{2\sinh(\beta\omega/2)}{\omega}=\beta\ \ (=1\ \text{当}\ \beta=1).`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{12.182}–\eqref{12.183} 中零模的处理`}>{R`原书在 \eqref{12.182} 右边写 $\mathrm{Det}'_{\rm PBC}$，并在 \eqref{12.183} 写 $\mathrm{Det}'_{\rm PBC}(\partial_t)=\lim_{\omega\to0}\mathrm{e}^{-\beta\omega/2}2\sinh(\beta\omega/2)=1$。但 $\omega\to0$ 时 $2\sinh(\beta\omega/2)\to0$，不是 1。问题在于 $2\sinh(\beta\omega/2)$ 是**包含**零模本征值 $\omega$ 的完整行列式：周期边界下 $\partial_t+\omega$ 的本征值为 $2\pi\mathrm{i}n/\beta+\omega$，$\zeta$ 正规化给出 $\prod_n(2\pi\mathrm{i}n/\beta+\omega)=\omega\cdot\beta\prod_{n\ge1}\big(1+\frac{\omega^2\beta^2}{4\pi^2n^2}\big)=2\sinh(\beta\omega/2)$（用 \eqref{12.185} 的结果 $\prod_{n\ge1}(2\pi n/\beta)^2=\beta$）。去掉零模要除以 $\omega$，得 $\mathrm{Det}'_{\rm PBC}(\partial_t)=\beta$，$\beta=1$ 时为 1——所以原书的结论 $\mathrm{Det}'=1$（在 $\beta=1$ 时）以及后面的 $\mathcal{N}_f=\mathrm{i}^n$ 不受影响。`}</Box>
        <Tx>{R`于是最终得到`}</Tx>
        <Eq n="12.184" say={R`费米路径积分只剩零模的 Grassmann 积分（乘以归一化因子）。`}>{R`\mathrm{Tr}\,\gamma_{2n+1}=\mathcal{N}_f\int\dd\psi^1_0\ldots\dd\psi^{2n}_0.`}</Eq>
        <Tx>{R`进一步在迹中插入

$$\gamma_{2n+1}=\mathrm{i}^n\gamma^1_0\ldots\gamma^{2n}_0=(2\mathrm{i})^n\psi^1_0\ldots\psi^{2n}_0$$

（$\gamma=\sqrt2\psi$）。由于 $\mathrm{Tr}\,\gamma_{2n+1}^2=\mathrm{Tr}\,I=2^n$，得到

$$\mathrm{Tr}\,\gamma_{2n+1}^2=2^n=\mathcal{N}_f\int\dd\psi^1_0\ldots\dd\psi^{2n}_0(2\mathrm{i})^n\psi^1_0\ldots\psi^{2n}_0=\mathcal{N}_f(-2\mathrm{i})^n$$

（$\int\dd\psi^1\cdots\dd\psi^{2n}\psi^1\cdots\psi^{2n}=(-1)^{n(2n-1)}=(-1)^n$），由此

$$\mathcal{N}_f=\mathrm{i}^n.$$

**玻色部分的归一化 $\mathcal{N}_b$。**若在 (1.101) 中采用虚时间得到 $\langle x,1|x,0\rangle=(2\pi)^{-1/2}$，则

$$\int\mathcal{D}x^\mu\mathrm{e}^{-\frac12\int_0^1\dot x^{\mu\,2}}=\mathcal{N}_b\frac1{\mathrm{Det}'^{1/2}(-\delta_{\mu\nu}\partial_t^2)}\int\prod_{\mu=1}^{2n}\frac{\dd x^\mu}{\sqrt{2\pi}}=(2\pi)^{-n}\int\prod_{\mu=1}^{2n}\dd x^\mu.$$

行列式像 §1.4 那样用 $\zeta$ 函数正规化计算。周期边界条件下 $-\dd^2/\dd t^2$ 的本征值为 $\lambda_n=(2n\pi/\beta)^2$，于是

$$\mathrm{Det}'_{\rm PBC}\Big(-\frac{\dd^2}{\dd t^2}\Big)=\prod_{n\in\Z,n\neq0}\Big(\frac{2\pi n}{\beta}\Big)^2.$$

谱 $\zeta$ 函数为

$$\zeta_{-\dd^2/\dd t^2}(s)=\sum_{n\in\Z,n\neq0}\Big[\Big(\frac{2n\pi}{\beta}\Big)^2\Big]^{-s}=2\Big(\frac{\beta}{2\pi}\Big)^{2s}\zeta(2s)$$

由此得

$$\begin{aligned}\zeta'_{-\dd^2/\dd t^2}(0)&=4\log(\beta/2\pi)\mathrm{e}^{2s\log(\beta/2\pi)}\zeta(2s)+4\mathrm{e}^{2s\log(\beta/2\pi)}\zeta'(2s)|_{s=0}\\&=4[\log(\beta/2\pi)\zeta(0)+\zeta'(0)]=-2\log\beta\end{aligned}$$

（用 $\zeta(0)=-\frac12$、$\zeta'(0)=-\frac12\log2\pi$。）因此行列式为`}</Tx>
        <Eq n="12.185" say={R`$\zeta$ 正规化的周期边界二阶算子行列式：$\prod_{n\neq0}(2\pi n/\beta)^2=\beta^2$。`}>{R`\mathrm{Det}'_{\rm PBC}\Big(-\frac{\dd^2}{\dd t^2}\Big)=\exp[-\zeta'_{-\dd^2/\dd t^2}(0)]=\beta^2.`}</Eq>
        <Tx>{R`令 $\beta=1$，得 $\mathrm{Det}'_{\rm PBC}(-\dd^2/\dd t^2)=1$。这样得到归一化因子

$$\mathcal{N}_b=1.$$

把这些结果合起来，我们证明了 $\mathcal{N}=\mathcal{N}_f\mathcal{N}_b=\mathrm{i}^n$。因此指标表示为`}</Tx>
        <Eq n="12.186" say={R`指标 = $\mathrm{i}^n$ $\times$ 零模积分 $\times$ 一阶涨落算子行列式的 $-1/2$ 次幂。`}>{R`\ind Q=\mathrm{i}^n\int\prod_{\mu=1}^d\frac{\dd\xi^\mu_0}{\sqrt{2\pi}}\dd\eta^\mu_0\Big[\mathrm{Det}'_{\rm PBC}\Big(-\delta_{\mu\nu}\frac{\dd}{\dd t}+${RT}_{\mu\nu}(x_0)\Big)\Big]^{-1/2}.`}</Eq>
        <Tx>{R`**计算泛函行列式。**由于费米变量只出现在 $${RT}_{\mu\nu}(x_0)$ 中，而它是 Grassmann 偶的，暂时把它当作普通数。Riemann 张量的反对称性意味着 $${RT}_{\mu\nu}=-${RT}_{\nu\mu}$。因此在偶数维流形 $M$ 中，可以把 $${RT}_{\mu\nu}$ 分块对角化为`}</Tx>
        <Eq n="12.187" say={R`反对称矩阵 $\tilde{\mathcal{R}}$ 的标准形：$n$ 个 $2\times2$ 转动生成元块。`}>{R`${RT}_{\mu\nu}=\begin{pmatrix}0&y_1&&&\\-y_1&0&&&\\&&\ddots&&\\&&&0&y_n\\&&&-y_n&0\end{pmatrix}.`}</Eq>
        <Tx>{R`集中看第一块。算子 $-\delta_{\mu\nu}\frac{\dd}{\dd t}+${RT}_{\mu\nu}(x_0)$ 是实的，所以本征值成复共轭对出现。用这些复本征值之积表示这一块的行列式（Fourier 模 $\mathrm{e}^{2\pi\mathrm{i}nt/\beta}$ 上，$2\times2$ 矩阵 $\begin{pmatrix}-\mathrm{i}\omega_n&y_1\\-y_1&-\mathrm{i}\omega_n\end{pmatrix}$ 的行列式为 $y_1^2-\omega_n^2$，$\omega_n=2\pi n/\beta$）：`}</Tx>
        <Eq n="12.188" title="一个 $2\times2$ 块的 $\zeta$ 正规化行列式" say={R`每个曲率块贡献 $(\sin(\beta y/2)/(y/2))^2$：无穷乘积 $\prod(1-z^2/n^2)$ 正是 $\sin$ 的 Euler 乘积公式。`}>{R`\begin{aligned}\det{}'\begin{pmatrix}-\frac{\dd}{\dd t}&y_1\\-y_1&-\frac{\dd}{\dd t}\end{pmatrix}&=\mathrm{Det}'\Big(\frac{\dd^2}{\dd t^2}+y_1^2\Big)=\prod_{n\neq0}\big(y_1^2-(2\pi n/\beta)^2\big)\\&=\Big[\prod_{n\ge1}\Big(\frac{2\pi n}{\beta}\Big)^2\prod_{n\ge1}\Big[1-\Big(\frac{y_1\beta}{2\pi n}\Big)^2\Big]\Big]^2\\&=\Big(\frac{\sin\beta y_1/2}{y_1/2}\Big)^2.\end{aligned}`}</Eq>
        <Derivation title={R`\eqref{12.188} 的最后一步`} collapsed steps={[
          { tex: R`\prod_{n\neq0}(y^2-\omega_n^2)=\prod_{n\ge1}(y^2-\omega_n^2)^2=\Big[\prod_{n\ge1}\omega_n^2\Big(1-\frac{y^2}{\omega_n^2}\Big)\Big]^2`, why: R`$\pm n$ 两项相同，配成平方；每一项的负号成对抵消。` },
          { tex: R`\prod_{n\ge1}\omega_n^2=\beta`, why: R`由 \eqref{12.185}：$\prod_{n\neq0}\omega_n^2=\big(\prod_{n\ge1}\omega_n^2\big)^2=\beta^2$（$\zeta$ 正规化）。` },
          { tex: R`\prod_{n\ge1}\Big(1-\frac{z^2}{n^2}\Big)=\frac{\sin\pi z}{\pi z},\qquad z=\frac{y\beta}{2\pi}`, why: R`Euler 乘积公式。于是方括号 $=\beta\cdot\frac{\sin(\beta y/2)}{\beta y/2}=\frac{\sin(\beta y/2)}{y/2}$。` },
        ]} />
        <Tx>{R`现在指标表示为`}</Tx>
        <Eq n="12.189" say={R`每个 $2\times2$ 曲率块给出因子 $\frac{y_j/2}{\sin(\beta y_j/2)}$。`}>{R`\ind Q=\mathrm{i}^n\int\prod_{\mu=1}^{2n}\frac{\dd\xi^\mu_0}{\sqrt{2\pi}}\dd\eta^\mu_0\prod_{j=1}^n\frac{y_j/2}{\sin\beta y_j/2}.`}</Eq>
        <Tx>{R`对 $j$ 的乘积写成

$$\frac1{\beta^{d/2}}\det\Big(\frac{\beta${RT}/2}{\sin\beta${RT}/2}\Big)^{1/2}.$$

注意关于 $${RT}$ 的任何 Taylor 展开都在有限阶截断，因为 $p>d/2$ 时 $${RT}^p=0$（$${RT}$ 含两个 Grassmann 零模，而独立的零模只有 $d$ 个）。`}</Tx>
        <Box kind="note" title={R`注：这里的 "$\det$" 与 $\sin\to\sinh$ 的替换`}>{R`把 $\prod_j\frac{y_j/2}{\sin(\beta y_j/2)}$ 写成 $\det(\cdots)^{1/2}$ 时，应理解为"按分块的元 $y_j$ 计算"：若把 $\tilde{\mathcal{R}}$ 当作矩阵、用其本征值 $\pm\mathrm{i}y_j$ 计算矩阵函数，得到的将是 $\prod_j\frac{\beta y_j/2}{\sinh(\beta y_j/2)}$。两种读法只差每个 $2k$ 次项的一个 $(-1)^k$：因为 $\frac{z}{\sin z}$ 的 $z^{2k}$ 系数等于 $\frac{z}{\sinh z}$ 的 $z^{2k}$ 系数乘以 $(-1)^k$。下面 Grassmann 积分只挑出总次数为 $n$（$y$ 的 $n$ 次齐次部分，$n$ 为偶数）的项，这一项上的相对因子是 $(-1)^{n/2}=\mathrm{i}^n$——这正是原书最后"$\mathrm{i}^n\frac{\mathcal{R}}{\sin\mathcal{R}}\to\frac{\mathcal{R}}{\sinh\mathcal{R}}$"这一替换精确成立的原因。`}</Box>
        <Tx>{R`**收集所有经典解。**到目前为止，我们计算了一对特定的 $x_0$、$\psi_0$ 周围二阶涨落的贡献。现在需要计入所有经典运动方程的解的贡献。前面已指出，解的集合 $\mathcal{M}$ 包含常值解 $(x_0,\psi_0)$ 作为子集，非常值解的贡献在 $\beta\downarrow0$ 时指数地小。因此忽略除常值解之外的所有周期解。注意到展开

$$x^\mu=x^\mu_0+\frac1{\sqrt\beta}\xi^\mu_0+\cdots$$

可知对 $x_0$ 的积分等价于对 $\xi_0/\sqrt\beta$ 的积分，即 $\dd x^\mu_0=\dd\xi^\mu_0/\sqrt\beta$。这一论证也适用于 Grassmann 零模，得到 $\dd\psi^\mu_0=\sqrt\beta\,\dd\eta^\mu_0$（Grassmann 变量换元时 Jacobi 因子取倒数）。总之，指标现在写成`}</Tx>
        <Eq n="12.190" say={R`把零模积分换回 $x_0$、$\psi_0$：玻色与费米的 $\sqrt\beta$ 因子相消，只剩 $\beta^{-d/2}$。`}>{R`\ind Q=\mathrm{i}^n\int\prod_{\mu=1}^{2n}\frac{\dd x^\mu_0}{\sqrt{2\pi}}\dd\psi^\mu_0\frac1{\beta^{d/2}}\det\Big(\frac{\beta${RT}/2}{\sin\beta${RT}/2}\Big)^{1/2}.`}</Eq>
        <Tx>{R`作如下变量替换，消去指标中表面上的 $\beta$ 依赖：

$$\psi^\mu_0=\frac{${CHI}^\mu_0}{\sqrt{2\pi\beta}},\qquad\dd\psi^\mu_0=\sqrt{2\pi\beta}\,\dd${CHI}^\mu_0.$$

把

$$\beta${RT}_{\mu\nu}=\frac1{2\pi}\frac12\mathcal{R}_{\mu\nu\rho\sigma}${CHI}^\rho_0${CHI}^\sigma_0$$

代入被积函数（测度：$\prod\frac{\dd x_0}{\sqrt{2\pi}}\sqrt{2\pi\beta}\,\dd${CHI}_0=\beta^{n}\prod\dd x_0\dd${CHI}_0$，恰好抵消 $\beta^{-d/2}$），得到`}</Tx>
        <Eq n="12.191" title="Dirac 算子的 AS 指标定理（Grassmann 形式）" say={R`$\beta$ 完全消失：指标是 $M$ 上（玻色零模）与 Grassmann 变量 $\chi$（费米零模）的积分，被积函数只依赖于曲率。`}>{R`\ind Q=\mathrm{i}^n\int\prod_{\mu=1}^{2n}\dd x^\mu_0\dd${CHI}^\mu_0\det\left(\frac{\frac12\frac1{2\pi}\frac12\mathcal{R}_{\mu\nu\rho\sigma}(x_0)${CHI}^\rho_0${CHI}^\sigma_0}{\sin\frac12\frac1{2\pi}\frac12\mathcal{R}_{\mu\nu\rho\sigma}(x_0)${CHI}^\rho_0${CHI}^\sigma_0}\right)^{1/2}.`}</Eq>
        <Tx>{R`这就是 Dirac 算子的 Atiyah–Singer 指标定理。

**改写成熟悉的形式。**注意被积函数中只有 $${CHI}$ 的 $2n$ 次项在对 $\prod\dd${CHI}^\mu_0$ 积分后不为零。还注意 $\prod\dd x^\mu_0$ 就是通常的体积元。于是定义曲率二形式`}</Tx>
        <Eq n="12.192" say={R`曲率二形式：Grassmann 双线性 $\chi^\rho\chi^\sigma$ 换成 $\dd x^\rho\wedge\dd x^\sigma$，Grassmann 积分换成流形上的积分。`}>{R`\mathcal{R}_{\mu\nu}=\tfrac12R_{\mu\nu\rho\sigma}\dd x^\rho\wedge\dd x^\sigma.`}</Eq>
        <Tx>{R`（$${CHI}^\rho${CHI}^\sigma\leftrightarrow\dd x^\rho\wedge\dd x^\sigma$，$\int\prod\dd x\,\dd${CHI}\,f(${CHI})\leftrightarrow\int_Mf(\dd x)$：Grassmann 代数就是微分形式的代数。）然后注意 $\mathcal{R}/\sin\mathcal{R}$ 是 $\mathcal{R}$ 的偶函数，因此只有 $n$ 为偶数，即 $d$ 是 4 的倍数时积分才不为零。在这种情形下因子 $\mathrm{i}^n$ 只取 $\pm1$，可以把被积函数形式地替换为

$$\mathrm{i}^n\frac{\mathcal{R}}{\sin\mathcal{R}}\to\frac{\mathcal{R}}{\sinh\mathcal{R}}.$$

（理由见上面的注；读者可以验证前几项，例如 $n=2$：$\frac{z}{\sin z}$ 的 $z^2$ 项系数 $+\frac16$，乘以 $\mathrm{i}^2=-1$ 得 $-\frac16$，正是 $\frac{z}{\sinh z}$ 的 $z^2$ 项系数。）于是指标写成熟知的形式

$$\ind Q=\int_M\det\left(\frac{\frac12\frac1{2\pi}\mathcal{R}}{\sinh\frac12\frac1{2\pi}\mathcal{R}}\right)^{1/2}.$$

**$\hat A$ 亏格。**进一步定义 $\hat A$ 亏格。由于 $\mathcal{R}$ 反对称，它可以分块对角化为

$$\frac1{2\pi}\mathcal{R}_{\mu\nu}=\begin{pmatrix}0&x_1&&&\\-x_1&0&&&\\&&\ddots&&\\&&&0&x_n\\&&&-x_n&0\end{pmatrix}.$$

然后定义 $M$ 的 **$\hat A$ 亏格**为`}</Tx>
        <Eq n="12.193" title={R`$\hat A$ 亏格`} say={R`$\hat A$ 亏格：每个曲率块贡献 $\frac{x/2}{\sinh(x/2)}=1-\frac{x^2}{24}+\cdots$；四维时 $\hat A=-p_1/24$。`}>{R`\hat A(M)=\prod_{j=1}^n\frac{x_j/2}{\sinh x_j/2}`}</Eq>
        <Tx>{R`右边由它关于 $x_j$ 的形式展开定义。

总之，我们在最简单的情形（自旋复形）下证明了 Atiyah–Singer 指标定理。`}</Tx>
        <Stmt id="T12.6">
          <Eq n="12.194" keyEq title="自旋复形的指标定理" say={R`Dirac 算子的指标等于 $\hat A$ 亏格的积分：零模的手征不对称完全由时空的曲率决定。`}>{R`\ind Q=\int_M\hat A(M).`}</Eq>
        </Stmt>
        <Box kind="physics" title="证明的骨架（回顾）">{R`(1) $\ind Q=\mathrm{Tr}(-1)^F\mathrm{e}^{-\beta H}$，与 $\beta$ 无关（超对称配对）；(2) 写成费米子**周期**边界的路径积分；(3) $\beta\to0$，动能项 $\frac1\beta\int\dot x^2$ 把路径积分局域到常值圈 $x(t)=x_0$——"位形空间"从圈空间 $L(M)$ 缩成 $M$ 本身；(4) 二阶涨落：玻色行列式 $\prod(\sin/y)^{-1}$ 与费米行列式在非零模上部分相消，留下 $\frac{y/2}{\sin(\beta y/2)}$；(5) 费米零模 $\psi_0$ 变成微分形式 $\dd x$，Grassmann 积分变成 $\int_M$。整个证明中真正的"拓扑"输入只有一条：$\beta$ 无关性。`}</Box>
      </Sub>
    </Sec>);
}
