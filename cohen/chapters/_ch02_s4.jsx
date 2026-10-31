// §D 本征值方程与可观测量 —— 式 (D-1)–(D-61)
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { HermitianPlot, CommutingPlot, IFig } from "./_ch02_plots.jsx";

const R = String.raw;

export function SecD() {
  return (
    <Sec n="D" title="Eigenvalue equations. Observables" zh="本征值方程与可观测量"
      gist={R`解 $A\ket{\psi}=\lambda\ket{\psi}$：有限维时化为久期方程 $\mathrm{Det}[\mathscr A-\lambda I]=0$。**厄米算符**的本征值是实数、不同本征值的本征矢正交；若其正交归一本征矢构成基（封闭关系 \eqref{D-35}），就称为**可观测量**。对易的可观测量有**共同本征基**；当本征值组 $\{a_n,b_p,\dots\}$ 唯一确定基矢时，它们构成**对易可观测量完全集**（CSCO）。`}
      why={R`第 III 章的测量假设要求：测量结果是某个算符的本征值，测量后态落在相应本征子空间中，而且各结果的概率加起来为 1。这需要实的本征值、正交的本征矢和完备的本征基——正是"可观测量"的定义；而"用哪些量子数给态贴标签"就是 CSCO 的问题。`}
      gives={["D-1", "D-14", "D-22", "D-30", "D-34", "D-35", "D-36-b", "D-46", "D-48", "D-58"]}>
      <p className="muted">本节概念：<C id="eigen" /> · <C id="observable" /> · <C id="csco" /></p>
      <Tx>{R`**本节的三段路线。**(1) 对一般算符：本征值方程是什么、怎样把它变成可以手算的行列式问题（§D-1）。(2) 对厄米算符：本征值为什么是实的、本征矢为什么正交；再加上"完备"这一条，得到**可观测量**和它的谱分解（§D-2）。(3) 对几个对易的可观测量：怎样找到一组同时让它们都对角的基，以及要几个可观测量才能给每个基矢贴上不重复的标签（§D-3）。`}</Tx>

      <Sub n="D-1" title="Eigenvalues and eigenvectors of an operator" zh="算符的本征值与本征矢">
        <Sub n="D-1-a" title="Definitions" zh="定义">
          <Tx>{R`**为什么要关心这类特殊矢量？**一般的算符会把矢量既拉伸又转向；但总有一些方向只被拉伸、不被转向。沿这些方向，算符的作用简单到只是乘一个数。我们要找的就是这样的非零右矢：`}</Tx>
          <Eq n="D-1" keyEq title="本征值方程" say="算符作用在本征矢上，只把它乘上一个数（本征值），不改变它的'方向'。">{R`A\ket{\psi}=\lambda\ket{\psi}`}</Eq>
          <Tx>{R`$\ket\psi$ 叫**本征矢**（eigenvector / eigenket），复数 $\lambda$ 叫**本征值**，全体本征值叫 $A$ 的**谱**（spectrum）。方程只对特定的 $\lambda$ 有非零解——找出这些 $\lambda$ 是 §D-1-b 的任务。

**先弄清解有多大的任意性。**方程是线性齐次的，所以解乘上任何复数 $\sym{cnum}{\alpha}$ 还是解：`}</Tx>
          <Eq n="D-2" say="本征矢乘以任意常数仍是同一本征值的本征矢：本征矢只确定到一个常数因子。">{R`A(\sym{cnum}{\alpha}\ket{\psi})=\sym{cnum}{\alpha}A\ket{\psi}=\sym{cnum}{\alpha}\lambda\ket{\psi}=\lambda(\sym{cnum}{\alpha}\ket{\psi})`}</Eq>
          <Tx>{R`常用的约定是把本征矢归一化，`}</Tx>
          <Eq n="D-3" say="约定本征矢归一化。">{R`\braket{\psi|\psi}=1`}</Eq>
          <Tx>{R`但这只压掉了"长度"，相位 $e^{i\theta}$ 仍然自由。好在第 III 章会说明**整体相位不影响任何物理预言**，这点任意性无害。

**更实质的任意性：简并。**一个本征值可能不止对应一个方向。若能找到 $g$ 个线性无关的右矢都属于 $\lambda$，`}</Tx>
          <Eq n="D-4" say="g 重简并：有 g 个线性无关的右矢属于同一本征值。">{R`A\ket{\psi^i}=\lambda\ket{\psi^i}`}</Eq>
          <Tx>{R`那么它们的任何组合`}</Tx>
          <Eq n="D-5" say="这 g 个本征矢的任意线性组合。">{R`\ket{\psi}=\sum_{i=1}^{g}c_i\ket{\psi^i}`}</Eq>
          <Tx>{R`也属于 $\lambda$——这一点只用到线性：`}</Tx>
          <Eq n="D-6" say="线性组合仍是同一本征值的本征矢：本征矢的集合构成一个子空间。">{R`A\ket{\psi}=\sum_{i=1}^{g}c_i\,A\ket{\psi^i}=\lambda\sum_{i=1}^{g}c_i\ket{\psi^i}=\lambda\ket{\psi}`}</Eq>
          <Tx>{R`所以属于 $\lambda$ 的本征矢合起来是一个子空间，叫**本征子空间**，维数 $g$ 叫**简并度**（可以是无穷）。$g=1$ 叫**非简并**（单重）。**这里的要点：**简并时，本征子空间里的"本征矢"不再有优先的方向——任何一组基都同样合格。§D-3 会利用这份自由。

**一个可以先猜答案的例子：投影算符 $P_\psi=\ket{\psi}\bra{\psi}$**（$\braket{\psi|\psi}=1$）。投影只保留沿 $\ket\psi$ 的分量、消灭垂直的分量，所以本征值应当只有 1 和 0。写出方程 $P_\psi\ket\varphi=\lambda\ket\varphi$，即`}</Tx>
          <Eq n="D-7" say="投影算符的本征值方程：左边总与 $\psi$ 共线或为零，所以本征值只能是 1 或 0。">{R`\ket{\psi}\braket{\psi|\varphi}=\lambda\ket{\varphi}`}</Eq>
          <Tx>{R`验证猜测：左边要么沿 $\ket\psi$、要么为零。沿 $\ket\psi$ 时只能 $\ket\varphi\propto\ket\psi$、$\lambda=1$；为零时 $\ket\varphi\perp\ket\psi$、$\lambda=0$。于是谱是 $\{1,0\}$：1 非简并，0 的本征子空间是 $\ket\psi$ 的整个正交补（无穷维时无穷重简并）。`}</Tx>
          <Box kind="note" title="补空间">{R`若 $\mathscr E$ 中每个矢量都能唯一地拆成 $\mathscr E_1$ 与 $\mathscr E_2$ 中各一个矢量之和（两者只共有零矢量），称二者互为**补空间**。给定 $\mathscr E_1$，补空间有无穷多种选法（三维中给定平面 $P$，任何不在 $P$ 内的过原点直线都行）；本书总是取**正交**的那个（垂直于 $P$ 的直线），即使不特意写出"正交"二字。`}</Box>
          <Tx>{R`**一个容易想当然的地方：左矢是不是也自动是"本征左矢"？**对 \eqref{D-1} 取厄米共轭，得到的是关于 $A^\dagger$ 的结论：`}</Tx>
          <Eq n="D-8" say="对本征值方程取厄米共轭：$\langle \psi|$ 是 $A^\dagger$ 的本征左矢，本征值为 $\lambda^*$。">{R`\bra{\psi}A^\dagger=\lambda^*\bra{\psi}`}</Eq>
          <Tx>{R`所以 $\bra\psi$ 是 $A^\dagger$ 的本征左矢（本征值 $\lambda^*$），而关于 $\bra\psi A$ 本身，一般什么也说不出。只有 $A$ 厄米时，这两件事才合二为一（§D-2-a）。

**关于"解在哪里找"的约定：**严格地说应只接受范数有限的本征矢，但 §E 中 $X$、$P$ 的本征矢偏偏都是广义右矢。所以我们允许 \eqref{D-1} 的解是广义右矢。`}</Tx>
        </Sub>

        <Sub n="D-1-b" title="Finding the eigenvalues and eigenvectors of an operator" zh="怎样求算符的本征值与本征矢">
          <Tx>{R`**路线：把矢量方程变成数的方程，再用线性代数。**设空间维数 $N$ 有限（结果承认可推广）。选一个表象，用每个基左矢去"读"方程两边：`}</Tx>
          <Eq n="D-9" say="把本征值方程投影到每个基矢上。">{R`\bra{u_i}A\ket{\psi}=\lambda\braket{u_i|\psi}`}</Eq>
          <Tx>{R`左边的 $A\ket\psi$ 还不是已知量的组合，于是按 §C 的老办法在 $A$ 后面插 $\mathbb 1$：`}</Tx>
          <Eq n="D-10" say="插入封闭关系，把算符方程化为分量方程。">{R`\sum_j\bra{u_i}A\ket{u_j}\braket{u_j|\psi}=\lambda\braket{u_i|\psi}`}</Eq>
          <Tx>{R`换上分量与矩阵元的名字，`}</Tx>
          <Eq n="D-11" say="分量与矩阵元的记号。">{R`\begin{aligned}\braket{u_i|\psi}&=c_i\\\bra{u_i}A\ket{u_j}&=A_{ij}\end{aligned}`}</Eq>
          <Tx>{R`它就是一个矩阵的本征值问题，`}</Tx>
          <Eq n="D-12" say="矩阵形式的本征值问题：矩阵乘列矢量等于 $\lambda$ 乘列矢量。">{R`\sum_jA_{ij}\,c_j=\lambda\,c_i`}</Eq>
          <Tx>{R`把右边移过来，看清它是**关于 $c_j$ 的线性齐次方程组**：`}</Tx>
          <Eq n="D-13" say="未知数为分量 $c_j$ 的线性齐次方程组。">{R`\sum_j\left[A_{ij}-\lambda\delta_{ij}\right]c_j=0`}</Eq>
          <Tx>{R`**本征值从哪来。**齐次方程组总有零解；我们要的是非零解，这要求系数矩阵奇异：`}</Tx>
          <Eq n="D-14" keyEq title="特征方程（久期方程）" say="本征值是使 $A-\lambda I$ 的行列式为零的那些 $\lambda$：这样方程组才有非零解。">{R`\mathrm{Det}\left[\mathscr A-\lambda I\right]=0`}</Eq>
          <Tx>{R`$\mathscr A$ 是由 $A_{ij}$ 组成的 $N\times N$ 矩阵。展开就是熟悉的"对角元减 $\lambda$"的行列式：`}</Tx>
          <Eq n="D-15" say="久期方程的展开形式：对角元各减去 $\lambda$ 后的行列式为零——关于 $\lambda$ 的 N 次方程。">{R`\begin{vmatrix}A_{11}-\lambda&A_{12}&A_{13}&\cdots&A_{1N}\\A_{21}&A_{22}-\lambda&A_{23}&\cdots&A_{2N}\\\vdots&\vdots&\vdots&&\vdots\\A_{N1}&A_{N2}&A_{N3}&\cdots&A_{NN}-\lambda\end{vmatrix}=0`}</Eq>
          <Tx>{R`左边是 $\lambda$ 的 $N$ 次多项式，计重数恰有 $N$ 个根（可实可复、可相同）。**一个需要检查的问题：**换一个表象会不会得到不同的本征值？不会——$\mathrm{Det}[S^\dagger\mathscr AS-\lambda I]=\mathrm{Det}\,S^\dagger\,\mathrm{Det}[\mathscr A-\lambda I]\,\mathrm{Det}\,S=\mathrm{Det}[\mathscr A-\lambda I]$。所以**本征值就是特征方程的根**，与表象无关。

**本征矢从哪来。**把一个根 $\lambda_0$ 代回 \eqref{D-13}。方程组变得奇异，独立方程少于 $N$ 个；**少了几个，解里就有几个自由参数**。这句话把下面两种情形统一了起来。

(i) **$\lambda_0$ 是单根：**恰好少一个方程。留一个分量（比如 $c_1$）自由，其余被它线性地决定：`}</Tx>
          <Eq n="D-16" say="单根时，所有分量都正比于 $c_1$，比例系数由矩阵元和 $\lambda_0$ 决定。">{R`c_j=\sym{alj}{\alpha}_j^0\,c_1`}</Eq>
          <Tx>{R`（$\sym{alj}{\alpha}_1^0=1$，其余系数由 $A_{ij}$ 与 $\lambda_0$ 算出。）于是所有解都是同一个矢量的倍数：`}</Tx>
          <Eq n="D-17" say="属于单根的本征矢彼此只差一个常数因子 $c_1$。">{R`\ket{\psi_0(c_1)}=\sum_j\sym{alj}{\alpha}_j^0\,c_1\ket{u_j}=c_1\ket{\psi_0}`}</Eq>
          <Tx>{R`那个矢量是`}</Tx>
          <Eq n="D-18" say="单根对应的那个本征矢（确定到常数因子）。">{R`\ket{\psi_0}=\sum_j\sym{alj}{\alpha}_j^0\ket{u_j}`}</Eq>
          <Tx>{R`单根只给出一条"本征直线"：非简并。

(ii) **$\lambda_0$ 是 $q>1$ 重根：**这时要问方程组到底少了几个方程。

◆ **只少一个**（一般算符的典型情形）：重根却只有一个本征方向，本征矢不够组成基——算符**不能对角化**。最小的例子是 $\begin{pmatrix}0&1\\0&0\end{pmatrix}$：$\lambda=0$ 是二重根，本征矢却只有 $\begin{pmatrix}1\\0\end{pmatrix}$ 一个方向。

◆ **少了 $p$ 个**（$1<p\le q$）：本征子空间是 $p$ 维的。以 $p=2$ 为例，留两个自由分量：`}</Tx>
          <Eq n="D-19" say="二重简并时，所有分量由两个自由参数 $c_1$、$c_2$ 线性决定。">{R`c_j=\sym{bej}{\beta}_j^0\,c_1+\sym{gaj}{\gamma}_j^0\,c_2`}</Eq>
          <Tx>{R`（系数的初值 $\sym{bej}{\beta}_1^0=\sym{gaj}{\gamma}_2^0=1$，$\sym{gaj}{\gamma}_1^0=\sym{bej}{\beta}_2^0=0$ 只是"自由分量就是它自己"的记账。）解是两个固定矢量的任意组合，`}</Tx>
          <Eq n="D-20" say="二重简并本征值的本征矢是两个独立本征矢的任意线性组合。">{R`\ket{\psi_0(c_1,c_2)}=c_1\ket{\psi_0^1}+c_2\ket{\psi_0^2}`}</Eq>
          <Eq n="D-21" say="张成二维本征子空间的两个独立本征矢。">{R`\begin{aligned}\ket{\psi_0^1}&=\sum_j\sym{bej}{\beta}_j^0\ket{u_j}\\\ket{\psi_0^2}&=\sum_j\sym{gaj}{\gamma}_j^0\ket{u_j}\end{aligned}`}</Eq>
          <Tx>{R`构成一个二维空间——二重简并的标志。

**厄米算符不会出第一种毛病**（证明从略）：它的每个本征值的简并度都等于根的重数。所以对厄米算符，数一数特征方程各根的重数，就知道每个本征子空间多大；在 $N$ 维空间里它总有 $N$ 个线性无关的本征矢（下面会看到可以取成正交归一的），总能对角化。量子力学几乎只和厄米算符打交道，这是一件幸运的事。`}</Tx>
        </Sub>
      </Sub>

      <Sub n="D-2" title="Observables" zh="可观测量">
        <Sub n="D-2-a" title="Properties of the eigenvalues and eigenvectors of a Hermitian operator" zh="厄米算符本征值与本征矢的性质">
          <Tx>{R`**这一小节要证两件事，用的是同一个技巧：同一个矩阵元，用两种方式算，再比较。**前提是`}</Tx>
          <Eq n="D-22" keyEq title="厄米条件" say="算符等于自己的伴随。">{R`A^\dagger=A`}</Eq>
          <Tx>{R`**(i) 本征值是实数。**用 $\bra\psi$ 去读本征值方程：`}</Tx>
          <Eq n="D-23" say="本征值方程两边与 $\psi$ 作标量积。">{R`\bra{\psi}A\ket{\psi}=\lambda\braket{\psi|\psi}`}</Eq>
          <Tx>{R`现在检查左边是不是实数——对它取共轭，用伴随的定义再用厄米性：`}</Tx>
          <Eq n="D-24" say="厄米算符的对角矩阵元等于自身的复共轭，所以是实数。">{R`\bra{\psi}A\ket{\psi}^*=\bra{\psi}A^\dagger\ket{\psi}=\bra{\psi}A\ket{\psi}`}</Eq>
          <Tx>{R`左边是实数，$\braket{\psi|\psi}$ 是正实数，所以 $\lambda$ 只能是实数。

**一个直接的回报：**既然 $\lambda^*=\lambda$、$A^\dagger=A$，\eqref{D-8} 就变成关于 $A$ 本身的命题——本征右矢对应的左矢也是本征左矢：`}</Tx>
          <Eq n="D-25" say="厄米算符的本征右矢对应的左矢，也是同一实本征值的本征左矢。">{R`\bra{\psi}A=\lambda\bra{\psi}`}</Eq>
          <Tx>{R`于是在任何矩阵元里，厄米算符都可以**向左**作用到本征左矢上，直接吐出本征值：`}</Tx>
          <Eq n="D-26" say="厄米算符可以'向左作用'在本征左矢上，直接吐出本征值。">{R`\bra{\psi}A\ket{\varphi}=\lambda\braket{\psi|\varphi}`}</Eq>
          <Tx>{R`**(ii) 不同本征值的本征矢正交。**取两个本征矢，`}</Tx>
          <Eq n="D-27-a" say="$\psi$ 是本征值 $\lambda$ 的本征矢。">{R`A\ket{\psi}=\lambda\ket{\psi}`}</Eq>
          <Eq n="D-27-b" say="$\varphi$ 是本征值 $\mu$ 的本征矢。">{R`A\ket{\varphi}=\mu\ket{\varphi}`}</Eq>
          <Tx>{R`把第二个改写成左矢形式（这一步用到了厄米性，即上面的 (i)）：`}</Tx>
          <Eq n="D-28" say="厄米性使 $\varphi$ 的左矢也是本征左矢。">{R`\bra{\varphi}A=\mu\bra{\varphi}`}</Eq>
          <Tx>{R`现在对**同一个**矩阵元 $\bra\varphi A\ket\psi$ 算两次——让 $A$ 向右作用：`}</Tx>
          <Eq n="D-29-a" say="让 A 向右作用于 $\psi$。">{R`\bra{\varphi}A\ket{\psi}=\lambda\braket{\varphi|\psi}`}</Eq>
          <Tx>{R`让 $A$ 向左作用：`}</Tx>
          <Eq n="D-29-b" say="让 A 向左作用于 $\langle \varphi|$：同一个矩阵元，算出另一个结果。">{R`\bra{\varphi}A\ket{\psi}=\mu\braket{\varphi|\psi}`}</Eq>
          <Tx>{R`两个结果必须相等：`}</Tx>
          <Eq n="D-30" keyEq title="不同本征值的本征矢正交" say="同一个矩阵元两种算法之差：本征值不同，就只能是标量积为零——两本征矢正交。">{R`(\lambda-\mu)\braket{\varphi|\psi}=0`}</Eq>
          <Tx>{R`$\lambda\neq\mu$ 就只能 $\braket{\varphi|\psi}=0$。**易错点：**这个论证对**同一个**本征值的两个本征矢不给出任何结论——简并子空间内部的本征矢未必正交，需要我们自己去选（下一小节）。`}</Tx>
        </Sub>

        <Sub n="D-2-b" title="Definition of an observable" zh="可观测量的定义">
          <Tx>{R`**为什么需要一个新名词。**有限维时，厄米算符的本征矢总能凑成一组基（§D-1-b）。无穷维时这不再自动成立——而物理上我们恰恰需要"本征矢完备"（第 III 章：测量各结果的概率要加起来等于 1）。所以要把它作为额外要求写进定义。

**先搭一个正交归一的本征矢组。**记本征值为 $\{a_n\}$（先设谱离散），$a_n$ 的简并度为 $g_n$，在本征子空间 $\mathscr E_n$ 中取 $g_n$ 个线性无关的本征矢：`}</Tx>
          <Eq n="D-31" say="第 n 个本征值有 $g_n$ 个线性无关的本征矢，用上标 i 区分。">{R`A\ket{\psi_n^i}=a_n\ket{\psi_n^i}\ ;\quad i=1,2,\dots,g_n`}</Eq>
          <Tx>{R`跨子空间的正交性是白送的——上一小节的 (ii)：`}</Tx>
          <Eq n="D-32" say="不同本征子空间之间互相正交。">{R`\braket{\psi_n^i|\psi_{n'}^j}=0\quad\text{对}\ n\neq n'\ \text{及任意}\ i,j`}</Eq>
          <Tx>{R`子空间内部的正交性要自己挑（比如 Gram–Schmidt）：`}</Tx>
          <Eq n="D-33" say="同一本征子空间内选正交归一的基。">{R`\braket{\psi_n^i|\psi_n^j}=\delta_{ij}`}</Eq>
          <Tx>{R`两部分合并成一条：`}</Tx>
          <Eq n="D-34" keyEq title="正交归一本征矢组" say="厄米算符的本征矢可以选成整体正交归一：不同本征值之间自动正交，简并子空间内部人为选正交。">{R`\braket{\psi_n^i|\psi_{n'}^{i'}}=\delta_{nn'}\delta_{ii'}`}</Eq>
          <Box kind="definition" title="可观测量">
            <Tx>{R`若厄米算符 $A$ 的这个正交归一本征矢组**构成态空间的一组基**，就称 $A$ 为**可观测量**（observable）。"构成基"用封闭关系表达：`}</Tx>
            <Eq n="D-35" keyEq title="可观测量的封闭关系" say="可观测量的全部本征矢构成基：所有本征子空间投影算符之和等于单位算符。">{R`\sum_{n=1}^{\infty}\sum_{i=1}^{g_n}\ket{\psi_n^i}\bra{\psi_n^i}=\mathbb 1`}</Eq>
          </Box>
          <Tx>{R`**谱分解：算符可以由它的谱"重建"。**把一个本征子空间里的投影收集起来，`}</Tx>
          <Eq n="D-36-a" say="向第 n 个本征子空间的投影算符。">{R`P_n=\sum_{i=1}^{g_n}\ket{\psi_n^i}\bra{\psi_n^i}`}</Eq>
          <Tx>{R`那么`}</Tx>
          <Eq n="D-36-b" keyEq title="谱分解" say="可观测量 = 各本征值 $\times$ 相应本征子空间投影算符之和：知道了谱和本征子空间，就完全知道了算符。">{R`A=\sum_na_n\,P_n`}</Eq>
          <Tx>{R`**为什么成立：**两边是线性算符，只需比较它们在一组基上的作用；在基矢 $\ket{\psi_n^i}$ 上两边都给出 $a_n\ket{\psi_n^i}$。封闭关系 \eqref{D-35} 则改写为 $\sum_nP_n=\mathbb 1$。下面的交互图让你亲手核对这三条等式。`}</Tx>
          <IFig id="herm" title="厄米矩阵的谱分解与封闭关系" caption={R`编辑一个 $2\times2$ 或 $3\times3$ 厄米矩阵（对角元为实数；非对角元输入上三角，下三角自动取复共轭，保证 $A_{ij}=A_{ji}^*$，即 \eqref{C-39}）。图中给出用 Jacobi 方法数值求得的本征值与正交归一本征矢，检查 \eqref{D-34}（$V^\dagger V=I$），并验证**谱分解** $\sum_na_nP_n=A$（\eqref{D-36-b}）与**封闭关系** $\sum_nP_n=\mathbb 1$（\eqref{D-35}）的残差。试试"简并"预设：本征值重合时，$P_n$ 是投影到二维本征子空间的算符（$\Tr P_n=g_n$），子空间内本征矢的选取任意，但 $P_n$ 唯一。`}><HermitianPlot /></IFig>
          <Tx>{R`**连续谱怎么办？**按表 (II-3) 的规则把求和换成积分即可。举一个离散 + 连续的混合谱（连续部分设为非简并）：`}</Tx>
          <Eq n="D-37-a" say="离散谱部分：本征值 $a_n$，简并度 $g_n$。">{R`A\ket{\psi_n^i}=a_n\ket{\psi_n^i}\ ;\quad n=1,2,\dots;\ \ i=1,2,\dots,g_n`}</Eq>
          <Eq n="D-37-b" say="连续谱部分：本征值随连续参数 $\nu$ 变化。">{R`A\ket{\psi_\nu}=a(\nu)\ket{\psi_\nu}\ ;\quad\nu_1<\nu<\nu_2`}</Eq>
          <Tx>{R`正交归一关系三条——离散对离散用 Kronecker、连续对连续用 Dirac、离散对连续为零：`}</Tx>
          <Eq n="D-38" say="混合谱的正交归一关系：离散部分 Kronecker $\delta$，连续部分 Dirac $\delta$，二者互相正交。">{R`\begin{aligned}\braket{\psi_n^i|\psi_{n'}^{i'}}&=\delta_{nn'}\delta_{ii'}\\\braket{\psi_\nu|\psi_{\nu'}}&=\delta(\nu-\nu')\\\braket{\psi_n^i|\psi_\nu}&=0\end{aligned}`}</Eq>
          <Tx>{R`可观测量的条件仍是"完备"，封闭关系里离散部分求和、连续部分积分：`}</Tx>
          <Eq n="D-39" say="混合谱可观测量的封闭关系：离散部分求和加连续部分积分。">{R`\sum_n\sum_{i=1}^{g_n}\ket{\psi_n^i}\bra{\psi_n^i}+\int_{\nu_1}^{\nu_2}\dd\nu\;\ket{\psi_\nu}\bra{\psi_\nu}=\mathbb 1`}</Eq>
          <Tx>{R`（这正是 \eqref{A-59} 那种情形：有限深势阱的束缚态加散射态。）`}</Tx>
        </Sub>

        <Sub n="D-2-c" title="Example: the projector $P_\psi$" zh="例：投影算符 $P_\psi$">
          <Tx>{R`**要检查的是什么：**$P_\psi$ 厄米（§B-4-e）、本征值 1 与 0（§D-1-a）都已知道，还缺"本征矢完备"。**办法：**直接把任意右矢拆成两个本征矢之和：`}</Tx>
          <Eq n="D-40" say="任何右矢都能拆成'沿 $\psi$ 的部分'加'垂直于 $\psi$ 的部分'。">{R`\ket{\varphi}=P_\psi\ket{\varphi}+(\mathbb 1-P_\psi)\ket{\varphi}`}</Eq>
          <Tx>{R`第一块是本征值 1 的本征矢——检查只用到 $P_\psi^2=P_\psi$：`}</Tx>
          <Eq n="D-41" say="第一部分是投影算符本征值 1 的本征矢。">{R`P_\psi(P_\psi\ket{\varphi})=P_\psi^2\ket{\varphi}=P_\psi\ket{\varphi}`}</Eq>
          <Tx>{R`第二块是本征值 0 的本征矢——同样一行：`}</Tx>
          <Eq n="D-42" say="第二部分是本征值 0 的本征矢。">{R`P_\psi(\mathbb 1-P_\psi)\ket{\varphi}=(P_\psi-P_\psi^2)\ket{\varphi}=0`}</Eq>
          <Tx>{R`任意右矢都能这样拆，所以本征矢完备，$P_\psi$ 是可观测量。§E-2 将给出两个更重要的例子：位置与动量。`}</Tx>
        </Sub>
      </Sub>

      <Sub n="D-3" title="Sets of commuting observables" zh="对易可观测量组">
        <Sub n="D-3-a" title="Important theorems" zh="几条重要定理">
          <Tx>{R`**本小节的目标是定理 III**：两个对易的可观测量能被同一组基同时对角化。定理 I、II 是通往它的两块垫脚石——定理 I 说"$B$ 不会把矢量踢出 $A$ 的本征子空间"，定理 II 是它的矩阵版本。`}</Tx>
          <Box kind="result" title="定理 I">{R`若两个算符 $A$ 与 $B$ 对易，且 $\ket{\psi}$ 是 $A$ 的本征矢，则 $B\ket{\psi}$ 也是 $A$ 的本征矢，且本征值相同。`}</Box>
          <Tx>{R`**思路：**想知道 $B\ket\psi$ 是不是 $A$ 的本征矢，就让 $A$ 作用在它上面，再用对易性把 $A$ 换到右边去碰 $\ket\psi$。出发点：`}</Tx>
          <Eq n="D-43" say="$\psi$ 是 A 的本征矢，本征值 a。">{R`A\ket{\psi}=a\ket{\psi}`}</Eq>
          <Tx>{R`两边先作用 $B$：`}</Tx>
          <Eq n="D-44" say="两边作用 B。">{R`BA\ket{\psi}=a\,B\ket{\psi}`}</Eq>
          <Tx>{R`左边的 $BA$ 换成 $AB$（这里用掉了对易性），读出结论：`}</Tx>
          <Eq n="D-45" say="$B|\psi\rangle$ 同样满足 A 的本征值方程，本征值仍为 a。">{R`A(B\ket{\psi})=a(B\ket{\psi})`}</Eq>
          <Tx>{R`所以 $B\ket\psi$ 留在 $A$ 的同一个本征子空间里。这对 $\ket\psi$ 自己意味着什么，取决于子空间的大小：(i) **$a$ 非简并**：子空间是一条直线，$B\ket\psi$ 只能是 $\ket\psi$ 的倍数——**$\ket\psi$ 自动也是 $B$ 的本征矢**。(ii) **$a$ 简并**：只能说 $B$ 不会把矢量"踢出"这个子空间：对任意 $\ket{\psi}\in\mathscr E_a$，`}</Tx>
          <Eq n="D-46" keyEq title="本征子空间在 B 下不变" say="对易时，B 不会把 A 的本征子空间中的矢量'踢出去'：子空间在 B 的作用下整体不变。">{R`B\ket{\psi}\in\mathscr E_a`}</Eq>
          <Tx>{R`这叫 $\mathscr E_a$ 在 $B$ 作用下**整体不变**（稳定）。换个说法——**定理 I'**：若 $A$、$B$ 对易，$A$ 的每个本征子空间在 $B$ 作用下整体不变。`}</Tx>

          <Box kind="result" title="定理 II">{R`若两个可观测量 $A$ 与 $B$ 对易，且 $\ket{\psi_1}$、$\ket{\psi_2}$ 是 $A$ 的属于不同本征值的本征矢，则矩阵元 $\bra{\psi_1}B\ket{\psi_2}=0$。`}</Box>
          <Tx>{R`**证法一：直接用定理 I。**设`}</Tx>
          <Eq n="D-47" say="两个属于 A 的不同本征值的本征矢。">{R`\begin{aligned}A\ket{\psi_1}&=a_1\ket{\psi_1}\\A\ket{\psi_2}&=a_2\ket{\psi_2}\end{aligned}`}</Eq>
          <Tx>{R`定理 I 说 $B\ket{\psi_2}$ 仍在 $a_2$ 的子空间里；§D-2-a 说不同本征值的子空间互相正交；而 $\ket{\psi_1}$ 在 $a_1$ 的子空间里。正交即矩阵元为零：`}</Tx>
          <Eq n="D-48" keyEq title="对易算符的矩阵在 A 的本征基中分块对角" say="对易的 B 不连接 A 的不同本征子空间：其矩阵元为零。">{R`\bra{\psi_1}B\ket{\psi_2}=0`}</Eq>
          <Tx>{R`**证法二：不用定理 I，用"同一个矩阵元算两次"。**对易子为零，它的矩阵元当然也为零：`}</Tx>
          <Eq n="D-49" say="对易子为零，它的任何矩阵元也为零。">{R`\bra{\psi_1}(AB-BA)\ket{\psi_2}=0`}</Eq>
          <Tx>{R`把 $AB$、$BA$ 中的 $A$ 分别向左、向右作用到本征矢上（向左那一下用到厄米性 \eqref{D-25}）：`}</Tx>
          <Eq n="D-50" say="A 向左作用给出 $a_1$，向右作用给出 $a_2$。">{R`\begin{aligned}\bra{\psi_1}AB\ket{\psi_2}&=a_1\bra{\psi_1}B\ket{\psi_2}\\\bra{\psi_1}BA\ket{\psi_2}&=a_2\bra{\psi_1}B\ket{\psi_2}\end{aligned}`}</Eq>
          <Tx>{R`代回去，矩阵元前面多出一个本征值之差：`}</Tx>
          <Eq n="D-51" say="本征值之差乘以 B 的矩阵元为零；本征值不同，矩阵元只能为零。">{R`(a_1-a_2)\bra{\psi_1}B\ket{\psi_2}=0`}</Eq>
          <Tx>{R`差不为零，矩阵元只能为零。`}</Tx>

          <Box kind="result" title="定理 III（基本定理）">{R`若两个可观测量 $A$ 与 $B$ 对易，则可以用 $A$ 与 $B$ 的**共同本征矢**构造态空间的一组正交归一基。`}</Box>
          <Tx>{R`**证明的路线：**先拿 $A$ 的本征基，看 $B$ 在其中的矩阵——它是分块对角的；然后只需在每一块（每个简并子空间）里单独把 $B$ 对角化，而这样做不会破坏 $A$ 的对角性。为简化记号设谱离散。取 $A$ 的正交归一本征基：`}</Tx>
          <Eq n="D-52" say="A 的正交归一本征基：本征值 $a_n$，简并度 $g_n$。">{R`A\ket{u_n^i}=a_n\ket{u_n^i}\ ;\quad n=1,2,\dots;\ \ i=1,2,\dots,g_n`}</Eq>
          <Eq n="D-53" say="A 的本征基正交归一。">{R`\braket{u_n^i|u_{n'}^{i'}}=\delta_{nn'}\,\delta_{ii'}`}</Eq>
          <Tx>{R`**第一步：$B$ 的矩阵分块对角。**这正是定理 II：属于不同 $a_n$ 的基矢之间矩阵元为零；同一个 $a_n$ 内部则不受约束。把基矢按本征值分组排列（先 $a_1$ 的 $g_1$ 个，再 $a_2$ 的 $g_2$ 个……），矩阵长成这样：`}</Tx>
          <Eq n="D-54" say="在 A 的本征基中，与 A 对易的 B 的矩阵分块对角：每块对应 A 的一个本征子空间，块与块之间全为零。">{R`\nosym{\begin{array}{c|c|c|c|c}&\mathscr E_1&\mathscr E_2&\mathscr E_3&\cdots\\\hline\mathscr E_1&\blacksquare_{g_1\times g_1}&0&0&0\\\hline\mathscr E_2&0&\blacksquare_{g_2\times g_2}&0&0\\\hline\mathscr E_3&0&0&\blacksquare_{g_3\times g_3}&0\\\hline\cdots&0&0&0&\ddots\end{array}}`}</Eq>
          <Tx>{R`（只有标 $\blacksquare$ 的方块内可能有非零元。）这张图就是定理 I' 的矩阵版：$B$ 不连接不同的 $\mathscr E_n$。

**第二步：逐块处理。**$g_n=1$ 的块是 $1\times1$ 的，那个基矢已经是共同本征矢。麻烦在 $g_n>1$ 的块：其中的 $\ket{u_n^i}$ 一般不是 $B$ 的本征矢。

**关键观察：**在 $\mathscr E_n$ 内部，$A$ 的矩阵是 $a_nI$——对 $A$ 来说子空间里所有方向都一样好。所以**在 $\mathscr E_n$ 内随便换基都不会破坏 $A$ 的对角性**；我们就用这份自由去对角化 $B$。$B$ 在 $\mathscr E_n$ 内的 $g_n\times g_n$ 块是`}</Tx>
          <Eq n="D-55" say="B 限制在 A 的第 n 个本征子空间内的矩阵（$g_n$ $\times$ $g_n$）。">{R`\sym{beta}{\beta}_{ij}^{(n)}=\bra{u_n^i}B\ket{u_n^j}`}</Eq>
          <Tx>{R`它是厄米矩阵（$\sym{beta}{\beta}_{ji}^{(n)*}=\sym{beta}{\beta}_{ij}^{(n)}$，因为 $B$ 厄米），所以能被一个幺正变换对角化。换到新基 $\{\ket{v_n^i}\}$ 后：`}</Tx>
          <Eq n="D-56" say="在新选的子空间基中，B 的块是对角的。">{R`\bra{v_n^i}B\ket{v_n^j}=\sym{beta}{\beta}_i^{(n)}\delta_{ij}`}</Eq>
          <Tx>{R`即新基矢是 $B$ 的本征矢，`}</Tx>
          <Eq n="D-57" say="新基矢是 B 的本征矢；它们又在 $E_n$ 中，自动是 A 的本征矢——于是是共同本征矢。">{R`B\ket{v_n^i}=\sym{beta}{\beta}_i^{(n)}\ket{v_n^i}`}</Eq>
          <Tx>{R`而它们仍在 $\mathscr E_n$ 里，对 $A$ 仍是本征值 $a_n$——**共同本征矢**到手。对每个 $\mathscr E_n$ 都这样做，拼起来就是整个空间的共同本征基。证毕。

**证明里藏着一个提醒：$A$ 的简并本征矢不一定是 $B$ 的本征矢**（交互图里"单独对角化 $A$"那一行会演示）；定理保证的只是"总**可以选出**"共同的那一组。`}</Tx>
          <Tx>{R`**说明 (i)：记号。**此后用三个指标记共同本征矢——$n$ 给 $A$ 的本征值，$p$ 给 $B$ 的本征值，$i$ 留给剩下还区分不开的简并（§D-3-b 会讨论它何时可以去掉）：`}</Tx>
          <Eq n="D-58" keyEq title="共同本征矢" say="共同本征矢同时被 A 和 B 的本征值标记：指标 n、p 分别给出 A、B 的本征值，i 区分剩余的简并。">{R`\begin{aligned}A\ket{u_{n,p}^i}&=a_n\ket{u_{n,p}^i}\\B\ket{u_{n,p}^i}&=b_p\ket{u_{n,p}^i}\end{aligned}`}</Eq>
          <Tx>{R`**说明 (ii)：逆命题。**有共同本征基，就一定对易。检查方法：让 $AB$ 与 $BA$ 作用在共同本征矢上——两种次序都只是乘上两个数：`}</Tx>
          <Eq n="D-59" say="作用在共同本征矢上，AB 与 BA 给出相同的数 $a_n$ $b_p$。">{R`\begin{aligned}AB\ket{u_{n,p}^i}&=b_p\,A\ket{u_{n,p}^i}=b_p\,a_n\ket{u_{n,p}^i}\\BA\ket{u_{n,p}^i}&=a_n\,B\ket{u_{n,p}^i}=a_n\,b_p\ket{u_{n,p}^i}\end{aligned}`}</Eq>
          <Tx>{R`于是对易子在每个基矢上都为零，`}</Tx>
          <Eq n="D-60" say="对易子作用在每个基矢上都为零，所以对易子本身为零。">{R`[A,B]\ket{u_{n,p}^i}=0`}</Eq>
          <Tx>{R`而这些基矢构成基，所以 $[A,B]=0$。

**说明 (iii)：一个常用的推论。**若要解`}</Tx>
          <Eq n="D-61" say="C 是两个互相对易的可观测量之和。">{R`C=A+B\quad\text{且}\quad[A,B]=0`}</Eq>
          <Tx>{R`的本征值问题（$A$、$B$ 都是可观测量），根本不必再去对角化 $C$：共同本征基 $\{\ket{u_{n,p}^i}\}$ 自动是 $C$ 的本征基，本征值 $a_n+b_p$。**注意"构成基"这一条不可省**：正是它保证了 $C$ 没有别的本征值，**全部**本征值都具有 $a_n+b_p$ 的形式。（§F-3 中张量积空间里的 $A(1)+B(2)$ 是典型应用。）`}</Tx>
          <Box kind="warning" title="勘误（排印）：(D-61) 中的 avec">{R`原书第 2 版英文本在 \eqref{D-61} 中印作 "$C=A+B$ avec $[A,B]=0$"，"avec" 是法文原版残留，意为 "with"（且）。上文已改写为"且"。`}</Box>
        </Sub>

        <Sub n="D-3-b" title="Complete sets of commuting observables (C.S.C.O.)" zh="对易可观测量完全集（CSCO）">
          <Tx>{R`**问题：用什么给基矢贴标签？**希望每个基矢都能由一组测量结果唯一地点名。

◆ **只用一个无简并的 $A$**：本征值 $a_n$ 就足以点名，每个本征子空间是一维的，$A$ 的本征基唯一（成比例的矢量视为同一个）。这时说 $A$ **单独构成 CSCO**。

◆ **$A$ 有简并**：同一个 $a_n$ 对应一整个子空间，标签不够用；而且 $A$ 的本征基在这些子空间里可以任意旋转，不唯一。

补救就是定理 III：再找一个与 $A$ 对易的 $B$，构造共同本征基。**若每一对本征值 $\{a_n,b_p\}$ 只对应一个基矢（共同本征基除相位外唯一），就说 $\{A,B\}$ 构成 CSCO。**`}</Tx>
          <Box kind="note" title="判别的捷径">{R`回到定理 III 的证明：在每个 $\mathscr E_n$ 里对角化 $B$ 的那一块。$\{A,B\}$ 完全的充要条件是：**每一块里 $B$ 的 $g_n$ 个本征值互不相同**——这样同一个 $a_n$ 下的基矢可以靠 $B$ 的值区分。不要求 $B$ 整体无简并：不同块里出现相同的 $B$ 本征值完全无妨。反过来，若 $B$ 整体无简并，它单独就是 CSCO。`}</Box>
          <Tx>{R`**若还有重复的标签对，就继续加。**某对 $\{a_n,b_p\}$ 仍对应一个多维子空间 $\mathscr E_{n,p}$ 时，再找一个与 $A$、$B$ 都对易的 $C$，在 $\mathscr E_{n,p}$ 内部按定理 III 的办法再对角化一次……直到每组本征值 $\{a_n,b_p,c_r,\dots\}$ 恰好点名一个基矢。这一过程总结成定义：`}</Tx>
          <Box kind="definition" title="对易可观测量完全集（CSCO）">{R`一组可观测量 $A,B,C,\dots$ 称为**对易可观测量完全集**（complete set of commuting observables），如果

(i) 它们两两对易；

(ii) 给定所有算符 $A,B,C,\dots$ 的本征值，就唯一确定（差一个乘法因子）一个共同本征矢。

**等价说法：**存在唯一的（差相位因子）由它们共同本征矢组成的正交归一基。

（这里的"完全"与 §A-2-a 中"完备函数组"的"完备"毫无关系，只是量子力学中的习惯用语。）`}</Box>
          <Box kind="note" title="关于 CSCO 的三点说明">{R`(i) 若 $\{A,B\}$ 是 CSCO，再加上任何一个与 $A$、$B$ 都对易的可观测量 $C$，得到的仍是 CSCO。但通常只考虑"**最小**"的集合——去掉其中任何一个就不再完全。

(ii) 若 $\{A,B,C,\dots\}$ 是 CSCO，给定本征值 $a_n,b_p,c_r,\dots$ 就唯一确定（差常数因子）相应基中的一个右矢，于是有时把它记作 $\ket{a_n,b_p,c_r,\dots}$。

(iii) 对同一个物理系统，存在若干个不同的 CSCO（§E-2-d 有具体例子）。`}</Box>
          <Tx>{R`CSCO 是量子力学给态"起名字"的方式（§E-2-d 有大量例子）。原书建议用补充材料 $\mathrm{H_{II}}$ 的习题 11、12 练手；下面的交互图提供了一个可以拨弄的三维例子：试着让 $A$、$B$ 各自都有简并，却合起来完全。`}</Tx>
          <IFig id="csco" title="对易可观测量：共同本征基与 CSCO" caption={R`$A$、$B$ 是两个 $3\times3$ 实对称矩阵，由同一组正交归一基（可由两个转角调节）与各自的本征值构造，因而 $[A,B]=0$（图中给出数值残差）。左边列出 $A$、$B$ 各自的谱及简并度；右边是数值求得的共同本征基（对角化 $A+\kappa B$，$\kappa$ 取无理数以避免偶然简并），每个基矢标上它的本征值对 $(a_n,b_p)$。当所有本征值对都互不相同时，$\{A,B\}$ 构成 CSCO——即使 $A$、$B$ 各自都有简并。`}><CommutingPlot /></IFig>
        </Sub>
      </Sub>
    </Sec>);
}
