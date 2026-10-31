// §F 态空间的张量积 —— 式 (F-1)–(F-55)
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { SchmidtPlot, IFig } from "./_ch02_plots.jsx";

const R = String.raw;

export function SecF() {
  return (
    <Sec n="F" title="Tensor product of state spaces" zh="态空间的张量积"
      gist={R`由两个空间 $\mathscr E_1$、$\mathscr E_2$ 造出 $\mathscr E=\mathscr E_1\otimes\mathscr E_2$：基为 $\ket{u_i(1)}\ket{v_l(2)}$，维数 $N_1N_2$；一般矢量 $\sum c_{i,l}\ket{u_i(1)}\ket{v_l(2)}$ **不一定**是乘积。算符可以"延拓"到 $\mathscr E$；$A(1)+B(2)$ 的本征值是 $a_n+b_p$，两个 CSCO 合起来是 $\mathscr E$ 的 CSCO。应用：三维粒子 $\mathscr E_{\mathbf r}=\mathscr E_x\otimes\mathscr E_y\otimes\mathscr E_z$，两粒子系统 $\mathscr E_{\mathbf r_1\mathbf r_2}=\mathscr E_{\mathbf r_1}\otimes\mathscr E_{\mathbf r_2}$。`}
      why={R`一旦系统由几部分组成（三维运动的三个方向、粒子的轨道与自旋、两个粒子），就需要一条把"部分的态空间"组装成"整体的态空间"的规则。张量积就是这条规则，而"不是乘积的态"正是量子关联（纠缠）的数学根源。`}
      gives={["F-1", "F-6", "F-7", "F-8", "F-12", "F-15", "F-30", "F-38", "F-49", "F-55"]}>
      <p className="muted">本节概念：<C id="tensor" /> · <C id="csco" /></p>
      <Tx className="muted">{R`（原书提示本节对第 III 章并非必需，可以等到真正用到张量积——补充材料 $\mathrm{D_{IV}}$ 或第 IX 章——时再读。）`}</Tx>

      <Sub n="F-1" title="Introduction" zh="引言：三个问题，一个答案">
        <Tx>{R`先看三个表面上毫不相干的困惑。

**一维与三维的关系。**前面一会儿用 $\psi(x)$、一会儿用 $\psi(\mathbf r)$。单变量与三变量的平方可积函数显然组成不同的空间，所以 $\mathscr E_x\neq\mathscr E_{\mathbf r}$；可直觉上三维"就是三个一维拼起来"。怎么拼？

**自旋。**第 IV、IX 章会遇到带内禀角动量的粒子：位置、动量这些"外部"自由度住在 $\mathscr E_{\mathbf r}$ 里，自旋这个"内部"自由度住在另一个空间 $\mathscr E_s$ 里。粒子的完整态空间该是什么？

**两个系统。**$(S_1)$、$(S_2)$ 原本相距很远、各有各的态空间 $\mathscr E_1$、$\mathscr E_2$；一旦让它们靠近、发生相互作用，就必须当作一个整体系统 $(S)$ 来描述。$(S)$ 的态空间是什么？

三个问题的答案是同一个运算——**张量积**（也叫 Kronecker 积）。下面先给出定义，再看本征值问题怎样"拆开"，最后回到这三个问题中的前一个和最后一个。`}</Tx>
      </Sub>

      <Sub n="F-2" title="Definition and properties of the tensor product" zh="张量积的定义与性质">
        <Tx>{R`记两个空间的维数为 $N_1$、$N_2$（有限或无穷均可；推广到有限个空间没有困难），属于它们的矢量和算符分别带标号 (1)、(2)。`}</Tx>
        <Sub n="F-2-a" title="Tensor product space E" zh="张量积空间 $\mathscr E$">
          <Tx>{R`**定义的思路。**我们想要一个空间，它的每个元素都能回答"系统 1 处在什么态、系统 2 处在什么态"——至少对最简单的元素是如此。于是要求：每对 $\ket{\varphi(1)}\in\mathscr E_1$、$\ket{\chi(2)}\in\mathscr E_2$ 都对应新空间中的一个"乘积"矢量，而且这个乘法和线性运算相容。满足这些要求的空间称为张量积，记作`}</Tx>
          <Eq n="F-1" keyEq title="张量积空间" say="复合系统的态空间是各部分态空间的张量积。">{R`\mathscr E=\mathscr E_1\otimes\mathscr E_2`}</Eq>
          <Tx>{R`乘积矢量记作`}</Tx>
          <Eq n="F-2" say="两个部分的矢量配对，给出整体空间中的一个'乘积矢量'。">{R`\ket{\varphi(1)}\otimes\ket{\chi(2)}`}</Eq>
          <Tx>{R`（两个因子谁写在前无关紧要）。"与线性运算相容"具体是三条：数可以从任一个因子里提出来，`}</Tx>
          <Eq n="F-3" say="数可以从张量积的任一因子中提出来。">{R`\begin{aligned}\big[\lambda\ket{\varphi(1)}\big]\otimes\ket{\chi(2)}&=\lambda\big[\ket{\varphi(1)}\otimes\ket{\chi(2)}\big]\\\ket{\varphi(1)}\otimes\big[\mu\ket{\chi(2)}\big]&=\mu\big[\ket{\varphi(1)}\otimes\ket{\chi(2)}\big]\end{aligned}`}</Eq>
          <Tx>{R`对每个因子的加法都能分配，`}</Tx>
          <Eq n="F-4" say="张量积对每个因子的加法分配。">{R`\begin{aligned}\ket{\varphi(1)}\otimes\big[\ket{\chi_1(2)}+\ket{\chi_2(2)}\big]&=\ket{\varphi(1)}\otimes\ket{\chi_1(2)}+\ket{\varphi(1)}\otimes\ket{\chi_2(2)}\\\big[\ket{\varphi_1(1)}+\ket{\varphi_2(1)}\big]\otimes\ket{\chi(2)}&=\ket{\varphi_1(1)}\otimes\ket{\chi(2)}+\ket{\varphi_2(1)}\otimes\ket{\chi(2)}\end{aligned}`}</Eq>
          <Tx>{R`以及最关键的一条——**两组基的所有两两乘积 $\ket{u_i(1)}\otimes\ket{v_l(2)}$ 构成 $\mathscr E$ 的基**。由此 $\dim\mathscr E=N_1N_2$：维数是**相乘**而不是相加。两个二能级系统合起来是 4 维，$n$ 个就是 $2^n$ 维——量子计算的"指数优势"就来自这里。

**乘积矢量的分量。**把两个因子各自展开，`}</Tx>
          <Eq n="F-5" say="两个因子各自在自己的基中展开。">{R`\begin{aligned}\ket{\varphi(1)}&=\sum_ia_i\ket{u_i(1)}\\\ket{\chi(2)}&=\sum_lb_l\ket{v_l(2)}\end{aligned}`}</Eq>
          <Tx>{R`用分配律把乘积乘开：`}</Tx>
          <Eq n="F-6" keyEq title="乘积矢量的分量" say="张量积矢量的分量是两个因子分量的乘积 $a_i$ $b_l$。">{R`\ket{\varphi(1)}\otimes\ket{\chi(2)}=\sum_{i,l}a_ib_l\,\ket{u_i(1)}\otimes\ket{v_l(2)}`}</Eq>
          <Tx>{R`乘积矢量在乘积基下的分量就是 $a_ib_l$——两组分量的"外积"。

**但多数矢量不是乘积。**$\mathscr E$ 中最一般的矢量是乘积基的任意线性组合：`}</Tx>
          <Eq n="F-7" keyEq title="张量积空间中的一般矢量" say="整体空间的一般矢量是乘积基矢的任意线性组合；系数 $c_{i,l}$ 一般不能写成 $a_i$ $b_l$ 的形式。">{R`\ket{\psi}=\sum_{i,l}c_{i,l}\,\ket{u_i(1)}\otimes\ket{v_l(2)}`}</Eq>
          <Tx>{R`$N_1N_2$ 个任意复数 $c_{i,l}$，一般不可能写成 $N_1$ 个数与 $N_2$ 个数的两两乘积 $a_ib_l$（自由参数个数都对不上：$N_1N_2$ 对 $N_1+N_2$）。所以一般不存在 $\ket{\varphi(1)}$、$\ket{\chi(2)}$ 使 $\ket{\psi}$ 等于它们的张量积。我们能保证的只有：**每个矢量都是乘积矢量的线性组合**。`}</Tx>
          <Box kind="physics" title="判别：系数矩阵的秩">{R`把 $c_{i,l}$ 排成 $N_1\times N_2$ 的矩阵 $\mathsf C$。$\ket{\psi}$ 是乘积矢量 $\iff c_{i,l}=a_ib_l\iff\mathsf C=\boldsymbol a\,\boldsymbol b^{\mathsf T}$ 是秩为 1 的矩阵。对两个二维空间（两个"比特"），这就是 $\det\mathsf C=c_{11}c_{22}-c_{12}c_{21}=0$。更一般地，把 $\mathsf C$ 做奇异值分解 $\mathsf C=\sum_k s_k\,\boldsymbol a_k\boldsymbol b_k^{\mathsf T}$，就得到 **Schmidt 分解** $\ket{\psi}=\sum_ks_k\ket{a_k(1)}\ket{b_k(2)}$（$\{\ket{a_k}\}$、$\{\ket{b_k}\}$ 各自正交归一，$s_k\ge0$）：非零 $s_k$ 的个数（Schmidt 秩）为 1 当且仅当 $\ket{\psi}$ 是乘积态。不是乘积的态在今天称为**纠缠态**（entangled state），其物理后果见补充材料 $\mathrm{D_{III}}$ 及第 XXI 章。`}</Box>
          <IFig id="schmidt" title="两比特态：Schmidt 分解与可分性" caption={R`取 $\mathscr E_1$、$\mathscr E_2$ 都是二维（基 $\ket{0},\ket{1}$），态 $\ket{\psi}=\sum_{i,l}c_{i,l}\ket{i(1)}\ket{l(2)}$ 由四个系数给出（自动归一化，可给 $c_{11}$ 加一个相位）。图中显示系数矩阵 $\mathsf C$、$\det\mathsf C$、Schmidt 系数 $s_1\ge s_2$（$\mathsf C$ 的奇异值，满足 $s_1^2+s_2^2=1$）、纠缠熵 $S=-\sum_k s_k^2\log_2s_k^2$ 与 concurrence $2|\det\mathsf C|=2s_1s_2$，并验证 $\sum_ks_k\ket{a_k}\ket{b_k}$ 还原原态。$\det\mathsf C=0\iff s_2=0\iff$ 态可写成 \eqref{F-6} 那样的乘积。`}><SchmidtPlot /></IFig>
          <Tx>{R`**标量积。**$\mathscr E$ 需要一个标量积，最自然的选择是"各管各的再相乘"——对乘积矢量规定`}</Tx>
          <Eq n="F-8" keyEq title="乘积矢量的标量积" say="两个乘积矢量的标量积等于各部分标量积之积。">{R`\braket{\varphi'(1)\chi'(2)|\varphi(1)\chi(2)}=\braket{\varphi'(1)|\varphi(1)}\braket{\chi'(2)|\chi(2)}`}</Eq>
          <Tx>{R`对一般矢量，按 \eqref{B-9}–\eqref{B-11} 的线性/反线性规则展开即可（每个矢量都是乘积矢量的组合）。一个立即的好处：两组正交归一基的乘积基自动正交归一，`}</Tx>
          <Eq n="F-9" say="两组正交归一基的乘积基也正交归一。">{R`\begin{aligned}\braket{u_{i'}(1)v_{l'}(2)|u_i(1)v_l(2)}&=\braket{u_{i'}(1)|u_i(1)}\braket{v_{l'}(2)|v_l(2)}\\&=\delta_{ii'}\,\delta_{ll'}\end{aligned}`}</Eq>
        </Sub>

        <Sub n="F-2-b" title="Tensor product of operators" zh="算符的张量积">
          <Tx>{R`**问题：**$\mathscr E_1$ 里的算符 $A(1)$ 只认识 $\mathscr E_1$ 的矢量，怎样让它作用在整体空间上？**答案：**让它只碰"属于自己的那一半"，另一半原样放过。这叫 $A(1)$ 在 $\mathscr E$ 中的**延拓**（extension）$\tilde A(1)$：`}</Tx>
          <Eq n="F-10" say="延拓算符只作用在属于空间 1 的那个因子上，空间 2 的因子原样保留。">{R`\tilde A(1)\big[\ket{\varphi(1)}\otimes\ket{\chi(2)}\big]=\big[A(1)\ket{\varphi(1)}\big]\otimes\ket{\chi(2)}`}</Eq>
          <Tx>{R`因为任意矢量都是乘积基的组合 \eqref{F-7}，再要求 $\tilde A(1)$ 线性，它就完全确定了：`}</Tx>
          <Eq n="F-11" say="延拓算符对一般矢量的作用：逐项作用在空间 1 的基矢上。">{R`\tilde A(1)\ket{\psi}=\sum_{i,l}c_{i,l}\big[A(1)\ket{u_i(1)}\big]\otimes\ket{v_l(2)}`}</Eq>
          <Tx>{R`$B(2)$ 的延拓 $\tilde B(2)$ 同理。更一般地，"两边同时各作用一个算符"就是**张量积算符**：`}</Tx>
          <Eq n="F-12" keyEq title="张量积算符" say="张量积算符各管各的：A 作用在第一个因子上，B 作用在第二个因子上。">{R`\big[A(1)\otimes B(2)\big]\big[\ket{\varphi(1)}\otimes\ket{\chi(2)}\big]=\big[A(1)\ket{\varphi(1)}\big]\otimes\big[B(2)\ket{\chi(2)}\big]`}</Eq>
          <Tx>{R`延拓不过是"另一边作用单位算符"的特殊情形：`}</Tx>
          <Eq n="F-13" say="延拓 = 与另一空间的单位算符作张量积。">{R`\begin{aligned}\tilde A(1)&=A(1)\otimes\mathbb 1(2)\\\tilde B(2)&=\mathbb 1(1)\otimes B(2)\end{aligned}`}</Eq>
          <Tx>{R`反过来，张量积算符就是两个延拓的普通乘积：`}</Tx>
          <Eq n="F-14" say="张量积算符等于两个延拓算符的普通乘积。">{R`A(1)\otimes B(2)=\tilde A(1)\tilde B(2)`}</Eq>
          <Tx>{R`**分属两个子系统的算符总是对易的**——直觉上，各管各的一半，先后无所谓：`}</Tx>
          <Eq n="F-15" keyEq title="不同子系统的算符对易" say="分别作用在两个子系统上的算符总是对易的：它们'互不干扰'。">{R`\big[\tilde A(1),\tilde B(2)\big]=0`}</Eq>
          <Tx>{R`验证只需看它们作用在乘积基上：两种次序都让每个因子被自己的算符作用一次，结果相同。`}</Tx>
          <Eq n="F-16" say="先 B 后 A：两个因子各被自己的算符作用。">{R`\begin{aligned}\tilde A(1)\tilde B(2)\ket{u_i(1)}\otimes\ket{v_l(2)}&=\tilde A(1)\Big[\ket{u_i(1)}\otimes\big[B(2)\ket{v_l(2)}\big]\Big]\\&=\big[A(1)\ket{u_i(1)}\big]\otimes\big[B(2)\ket{v_l(2)}\big]\end{aligned}`}</Eq>
          <Eq n="F-17" say="先 A 后 B：结果完全相同。">{R`\begin{aligned}\tilde B(2)\tilde A(1)\ket{u_i(1)}\otimes\ket{v_l(2)}&=\tilde B(2)\Big[\big[A(1)\ket{u_i(1)}\big]\otimes\ket{v_l(2)}\Big]\\&=\big[A(1)\ket{u_i(1)}\big]\otimes\big[B(2)\ket{v_l(2)}\big]\end{aligned}`}</Eq>
          <Tx>{R`同样的"各管各的"也适用于投影：向乘积矢量的投影算符，是两个投影算符的张量积（两边作用于任一乘积矢量 $\ket{\varphi'(1)\chi'(2)}$，用 \eqref{F-8} 即可核对）：`}</Tx>
          <Eq n="F-18" say="向乘积矢量的投影 = 两个部分投影算符的张量积。">{R`\ket{\varphi(1)\chi(2)}\bra{\varphi(1)\chi(2)}=\ket{\varphi(1)}\bra{\varphi(1)}\otimes\ket{\chi(2)}\bra{\chi(2)}`}</Eq>
          <Box kind="note" title="并非所有算符都是乘积">{R`与矢量一样，$\mathscr E$ 中也有不能写成 $A(1)\otimes B(2)$ 的算符——最典型的是两粒子相互作用 $V(|\mathbf R_1-\mathbf R_2|)$。正是这类算符让原本独立的两个系统产生关联。`}</Box>
        </Sub>

        <Sub n="F-2-c" title="Notations" zh="记号">
          <Tx>{R`实际书写时，$\otimes$ 和波浪号都太累赘。通行的简写（本书也用）是：并排即张量积，`}</Tx>
          <Eq n="F-19" say="两个属于不同空间的右矢并排，表示它们的张量积。">{R`\ket{\varphi(1)}\ket{\chi(2)}\quad\text{表示}\quad\ket{\varphi(1)}\otimes\ket{\chi(2)}`}</Eq>
          <Eq n="F-20" say="两个属于不同空间的算符并排，表示它们的张量积。">{R`A(1)B(2)\quad\text{表示}\quad A(1)\otimes B(2)`}</Eq>
          <Tx>{R`延拓算符与原算符用同一个符号：`}</Tx>
          <Eq n="F-21" say="同一个符号 A(1) 既表示原算符，也表示它在张量积空间中的延拓，靠作用对象区分。">{R`A(1)\quad\text{表示}\quad\tilde A(1)\quad\text{或}\quad A(1)`}</Eq>
          <Tx>{R`这些简写安全吗？\eqref{F-19} 安全：此前从没有把两个右矢挨着写过。但要小心：两个**同一空间**的右矢 $\ket{\psi}\ket{\varphi}$ 在 $\mathscr E$ 里没有意义，它属于 $\mathscr E\otimes\mathscr E$。\eqref{F-21} 确实有歧义（一个符号两个算符），实践中靠作用对象分辨：作用在 $\mathscr E$ 的矢量上就是延拓，作用在 $\mathscr E_1$ 的矢量上就是原算符。\eqref{F-20} 只要 $\mathscr E_1\neq\mathscr E_2$ 就无歧义，而且由 \eqref{F-14}，把 $A(1)$、$B(2)$ 理解为延拓后它就是普通的算符乘积。`}</Tx>
        </Sub>
      </Sub>

      <Sub n="F-3" title="Eigenvalue equations in the product space" zh="积空间中的本征值方程">
        <Tx>{R`张量积的实用价值在于：大空间里的本征值问题，常常可以拆成小空间里的问题。`}</Tx>
        <Sub n="F-3-a" title="Eigenvalues and eigenvectors of extended operators" zh="延拓算符的本征值与本征矢">
          <Tx>{R`**单个延拓算符。**设 $A(1)$ 在 $\mathscr E_1$ 中的本征问题已经解出（设谱离散）：`}</Tx>
          <Eq n="F-22" say="A(1) 在自己的空间 $E_1$ 中的本征值方程（本征值 $a_n$，简并度 $g_n$）。">{R`A(1)\ket{\varphi_n^i(1)}=a_n\ket{\varphi_n^i(1)}\ ;\quad i=1,2,\dots,g_n`}</Eq>
          <Tx>{R`要解的是它的延拓在整个 $\mathscr E$ 中的方程：`}</Tx>
          <Eq n="F-23" say="延拓算符在整个张量积空间中的本征值方程。">{R`A(1)\ket{\psi}=\lambda\ket{\psi}\ ;\quad\ket{\psi}\in\mathscr E`}</Eq>
          <Tx>{R`猜一个解：既然 $A(1)$ 根本不碰第二个因子，那第二个因子随便放什么都行——`}</Tx>
          <Eq n="F-24" say="空间 1 的本征矢乘上空间 2 的任意矢量，仍是延拓算符的本征矢，本征值不变。">{R`\begin{aligned}A(1)\ket{\varphi_n^i(1)}\ket{\chi(2)}&=\big[A(1)\ket{\varphi_n^i(1)}\big]\ket{\chi(2)}\\&=a_n\ket{\varphi_n^i(1)}\ket{\chi(2)}\end{aligned}`}</Eq>
          <Tx>{R`猜得对不对、全不全？若 $A(1)$ 是 $\mathscr E_1$ 中的可观测量，$\{\ket{\varphi_n^i(1)}\}$ 是 $\mathscr E_1$ 的基，再配上 $\mathscr E_2$ 的任意一组基，`}</Tx>
          <Eq n="F-25" say="A(1) 在张量积空间中的本征基：空间 1 的本征矢乘以空间 2 的任一基矢。">{R`\ket{\psi_n^{i,l}}=\ket{\varphi_n^i(1)}\ket{v_l(2)}`}</Eq>
          <Tx>{R`就构成 $\mathscr E$ 的正交归一基，而且每个都是本征矢——本征问题全部解完。三个推论值得记住：

◆ $A(1)$ 在 $\mathscr E_1$ 中是可观测量，在 $\mathscr E$ 中仍是（延拓保持厄米，且上面的本征矢完备）。

◆ **谱不变**：本征值还是那些 $a_n$。

◆ **简并度乘以 $N_2$**：$a_n$ 的本征子空间由 $\ket{\varphi_n^i(1)}\ket{v_l(2)}$（$i\le g_n$，$l\le N_2$）张成，维数 $N_2g_n$。哪怕 $a_n$ 在 $\mathscr E_1$ 中单重，在 $\mathscr E$ 中也是 $N_2$ 重简并——因为"另一半"处于什么态，$A(1)$ 根本看不见。

相应的投影算符也印证了这一点：在 $\mathscr E_2$ 中用掉一次封闭关系，它就是 $\mathscr E_1$ 中投影算符 $P_n(1)=\sum_i\ket{\varphi_n^i(1)}\bra{\varphi_n^i(1)}$ 的延拓：`}</Tx>
          <Eq n="F-26" say="张量积空间中 $a_n$ 本征子空间的投影算符 = 空间 1 的投影算符 $\otimes$ 空间 2 的单位算符：它就是 $P_n(1)$ 的延拓。">{R`\begin{aligned}\sum_{i,l}\ket{\psi_n^{i,l}}\bra{\psi_n^{i,l}}&=\sum_{i,l}\ket{\varphi_n^i(1)}\bra{\varphi_n^i(1)}\otimes\ket{v_l(2)}\bra{v_l(2)}\\&=\sum_i\ket{\varphi_n^i(1)}\bra{\varphi_n^i(1)}\otimes\mathbb 1(2)\end{aligned}`}</Eq>
          <Tx>{R`**两个子系统之和。**更常见的情形是"两部分各自的量加起来"，比如无相互作用的两个系统的总能量：`}</Tx>
          <Eq n="F-27" say="两个分属不同子系统的可观测量之和——例如无相互作用的两个系统的总能量。">{R`C=A(1)+B(2)`}</Eq>
          <Tx>{R`设两部分的本征问题已解（为记号简单，设谱离散且不简并）：`}</Tx>
          <Eq n="F-28" say="两个子系统各自的本征值方程。">{R`\begin{aligned}A(1)\ket{\varphi_n(1)}&=a_n\ket{\varphi_n(1)}\\B(2)\ket{\chi_p(2)}&=b_p\ket{\chi_p(2)}\end{aligned}`}</Eq>
          <Tx>{R`这正是 \eqref{D-61} 的情形：$A(1)$、$B(2)$ 对易（\eqref{F-15}），乘积基 $\ket{\varphi_n(1)}\ket{\chi_p(2)}$ 是它们的共同本征基，`}</Tx>
          <Eq n="F-29" say="乘积基矢同时是 A(1) 和 B(2) 的本征矢。">{R`\begin{aligned}A(1)\ket{\varphi_n(1)}\ket{\chi_p(2)}&=a_n\ket{\varphi_n(1)}\ket{\chi_p(2)}\\B(2)\ket{\varphi_n(1)}\ket{\chi_p(2)}&=b_p\ket{\varphi_n(1)}\ket{\chi_p(2)}\end{aligned}`}</Eq>
          <Tx>{R`把两行相加，$C$ 的本征问题立刻解完：`}</Tx>
          <Eq n="F-30" keyEq title="A(1)+B(2) 的本征值" say="两个子系统算符之和的本征值，就是各自本征值之和；本征矢是乘积矢量。">{R`C\ket{\varphi_n(1)}\ket{\chi_p(2)}=(a_n+b_p)\ket{\varphi_n(1)}\ket{\chi_p(2)}`}</Eq>
          <Tx>{R`**本征值相加、本征矢相乘**——这句口诀是本节最常用的结论。

**陷阱：偶然简并。**口诀说"可以选"乘积本征矢，没说"本征矢必然是乘积"。只要不同的 $(n,p)$ 给出不同的 $c_{np}=a_n+b_p$，每个本征值非简并，本征矢当然只能是那个乘积。但若两个组合恰好相等，$c_{mq}=c_{np}$，这个本征值的本征子空间是二维的，其中任意叠加`}</Tx>
          <Eq n="F-31" say="C 的本征值偶然二重简并时，两个乘积本征矢的任意叠加都是本征矢——它一般不再是乘积矢量。">{R`\lambda\ket{\varphi_n(1)}\ket{\chi_p(2)}+\mu\ket{\varphi_m(1)}\ket{\chi_q(2)}`}</Eq>
          <Tx>{R`（$\lambda,\mu$ 任意）都是 $C$ 的本征矢——一般**不是**张量积。`}</Tx>
          <Box kind="warning" title="勘误：(F-31) 第二项的下标">{R`原书（第 2 版）\eqref{F-31} 印作 $\lambda\ket{\varphi_n(1)}\ket{\chi_p(2)}+\mu\ket{\varphi_n(1)}\ket{\chi_p(2)}$，两项完全相同（那样就只是 $(\lambda+\mu)$ 乘一个乘积矢量，与下一句"存在不是张量积的本征矢"矛盾）。按上文"存在 $m,q$ 使 $c_{mq}=c_{np}$"，第二项应为 $\ket{\varphi_m(1)}\ket{\chi_q(2)}$。上文已改正。例：两个相同的谐振子 $a_n=n$、$b_p=p$，则 $c_{10}=c_{01}=1$，$\frac{1}{\sqrt2}(\ket{\varphi_1}\ket{\chi_0}+\ket{\varphi_0}\ket{\chi_1})$ 是 $C$ 的本征矢，其系数矩阵行列式 $-\frac12\neq0$，不是乘积态（可在上面的交互图中用"(F-31) 的例子"验证）。`}</Box>
        </Sub>

        <Sub n="F-3-b" title="Complete sets of commuting observables in E" zh="$\mathscr E$ 中的对易可观测量完全集">
          <Tx>{R`**结论先行：两边的 CSCO 拼在一起，就是整体的 CSCO。**用一个具体配置来看为什么。设 $\mathscr E_1$ 中 $A(1)$ 单独是 CSCO（本征值全不简并）：`}</Tx>
          <Eq n="F-32" say="A(1) 在 $E_1$ 中的本征值都不简并：它单独构成 CSCO。">{R`A(1)\ket{\varphi_n(1)}=a_n\ket{\varphi_n(1)}`}</Eq>
          <Tx>{R`$\mathscr E_2$ 中则需要两个可观测量 $B(2)$、$C(2)$——各自都有简并，但本征值对 $(b_p,c_r)$ 唯一确定一个右矢：`}</Tx>
          <Eq n="F-33" say="B(2)、C(2) 在 $E_2$ 中构成 CSCO：本征值对 $(b_p$, $c_r)$ 唯一确定一个右矢。">{R`\left\{\begin{aligned}&B(2)\ket{\chi_{pr}(2)}=b_p\ket{\chi_{pr}(2)}\\&C(2)\ket{\chi_{pr}(2)}=c_r\ket{\chi_{pr}(2)}\\&\ket{\chi_{pr}(2)}\ \text{唯一（差一个常数因子）}\end{aligned}\right.`}</Eq>
          <Tx>{R`到了 $\mathscr E$ 里，单看哪一边都不够：$A(1)$ 的每个本征值变成 $N_2$ 重简并（上一小节），$\{B(2),C(2)\}$ 的每组本征值也对应 $N_1$ 个独立矢量。但三者合起来，乘积矢量 $\ket{\varphi_n(1)\chi_{pr}(2)}$ 同时是它们的本征矢，`}</Tx>
          <Eq n="F-34" say="乘积右矢是三个可观测量的共同本征矢，由三元组 $(a_n$, $b_p$, $c_r)$ 唯一标记。">{R`\begin{aligned}A(1)\ket{\varphi_n(1)\chi_{pr}(2)}&=a_n\ket{\varphi_n(1)\chi_{pr}(2)}\\B(2)\ket{\varphi_n(1)\chi_{pr}(2)}&=b_p\ket{\varphi_n(1)\chi_{pr}(2)}\\C(2)\ket{\varphi_n(1)\chi_{pr}(2)}&=c_r\ket{\varphi_n(1)\chi_{pr}(2)}\end{aligned}`}</Eq>
          <Tx>{R`这些乘积矢量构成 $\mathscr E$ 的基（两边各是基），而一组 $(a_n,b_p,c_r)$ 恰好挑出其中一个。所以 $\{A(1),B(2),C(2)\}$ 是 $\mathscr E$ 中的 CSCO。论证显然不依赖具体配置：**把 $\mathscr E_1$ 与 $\mathscr E_2$ 中各自完全的对易可观测量组并起来，就得到 $\mathscr E$ 中的完全组。**`}</Tx>
        </Sub>
      </Sub>

      <Sub n="F-4" title="Applications" zh="应用">
        <Sub n="F-4-a" title="One- and three-dimensional particle states" zh="一维与三维粒子态">
          <Tx>{R`**回答第一个问题。**准备三个一维态空间：$\mathscr E_x$（波函数 $\varphi(x)=\braket{x|\varphi}$，$X$ 单独是 CSCO，基矢 $\ket{x_0}$ 的波函数是 $\delta(x-x_0)$），以及同样构造的 $\mathscr E_y$（$\chi(y)=\braket{y|\chi}$，CSCO 为 $Y$）、$\mathscr E_z$（$\omega(z)=\braket{z|\omega}$，CSCO 为 $Z$）。作它们的张量积：`}</Tx>
          <Eq n="F-35" say="三个一维态空间的张量积。">{R`\mathscr E_{xyz}=\mathscr E_x\otimes\mathscr E_y\otimes\mathscr E_z`}</Eq>
          <Tx>{R`三组位置基的乘积给出它的基：`}</Tx>
          <Eq n="F-36" say="三维位置基矢是三个一维位置基矢的张量积。">{R`\ket{x,y,z}=\ket{x}\ket{y}\ket{z}`}</Eq>
          <Tx>{R`由 §F-3-a，这些基矢是三个延拓算符的共同本征矢：`}</Tx>
          <Eq n="F-37" say="$|x,y,z\rangle$ 是延拓后的 X、Y、Z 的共同本征矢。">{R`\begin{aligned}X\ket{x,y,z}&=x\ket{x,y,z}\\Y\ket{x,y,z}&=y\ket{x,y,z}\\Z\ket{x,y,z}&=z\ket{x,y,z}\end{aligned}`}</Eq>
          <Tx>{R`和 \eqref{E-36} 对比——这恰好就是三维粒子的位置基所满足的方程。所以 $\mathscr E_{xyz}$ 就是 $\mathscr E_{\mathbf r}$，并且`}</Tx>
          <Eq n="F-38" keyEq title="三维 = 三个一维的张量积" say="三维位置本征态就是三个一维位置本征态的张量积；x、y、z 是 r 的笛卡尔坐标。">{R`\ket{x,y,z}\equiv\ket{\mathbf r}=\ket{x}\ket{y}\ket{z}`}</Eq>
          <Tx>{R`$x,y,z$ 就是 $\mathbf r$ 的笛卡尔坐标。**三维 = 三个一维的张量积**，这就是直觉"拼起来"的精确含义。

**可分离 vs 一般态。**乘积右矢 $\ket{\varphi\chi\omega}=\ket{\varphi}\ket{\chi}\ket{\omega}$ 的波函数按 \eqref{F-8} 分解：`}</Tx>
          <Eq n="F-39" say="乘积态的三维波函数可以分离变量：$\varphi(x)\chi(y)\omega(z)$。">{R`\braket{\mathbf r|\varphi\chi\omega}=\braket{x|\varphi}\braket{y|\chi}\braket{z|\omega}`}</Eq>
          <Tx>{R`即 $\varphi(x)\chi(y)\omega(z)$。位置基矢本身就属于这一类：`}</Tx>
          <Eq n="F-40" say="三维 $\delta$ 函数是三个一维 $\delta$ 函数的乘积。">{R`\braket{\mathbf r|\mathbf r_0}=\delta(\mathbf r-\mathbf r_0)=\delta(x-x_0)\,\delta(y-y_0)\,\delta(z-z_0)`}</Eq>
          <Tx>{R`但 $\mathscr E_{\mathbf r}$ 中的一般态是位置基的任意叠加，`}</Tx>
          <Eq n="F-41" say="一般的三维态是位置基矢的连续叠加，叠加系数 $\psi(x,y,z)$ 一般不能分离变量。">{R`\ket{\psi}=\int\dd x\,\dd y\,\dd z\;\psi(x,y,z)\ket{x,y,z}`}</Eq>
          <Tx>{R`其中 $\psi(x,y,z)=\braket{x,y,z|\psi}$ 一般**不能**分离变量——这正是 \eqref{F-7} 的三维版本。

张量积还解释了 §E-2-d 留下的悬念：$X$ 在 $\mathscr E_x$ 中是 CSCO，到了 $\mathscr E_{\mathbf r}$ 却不是——谱没变，但 $\mathscr E_y$、$\mathscr E_z$ 无穷维，于是每个 $x_0$ 都变成无穷重简并。按 §F-3-b，从三个一维空间各取一个 CSCO 拼起来，就得到 $\mathscr E_{\mathbf r}$ 的 CSCO：$\{X,Y,Z\}$，也可以 $\{P_x,Y,Z\}$、$\{P_x,P_y,Z\}$ 等等。`}</Tx>
          <Tx>{R`**一个重要应用：可分离的哈密顿量。**若哈密顿量是三个方向各自的部分之和，`}</Tx>
          <Eq n="F-42" say="哈密顿量是三个分别只涉及 x、y、z 方向的部分之和。">{R`H=H_x+H_y+H_z`}</Eq>
          <Tx>{R`（实践中，只由 $X$ 和 $P_x$ 构成的 $H_x$ 就是 $\mathscr E_x$ 中可观测量的延拓），那么三维问题拆成三个一维问题：`}</Tx>
          <Eq n="F-43" say="三个一维问题各自的本征值方程。">{R`\begin{aligned}H_x\ket{\varphi_n}&=E_x^n\ket{\varphi_n}\\H_y\ket{\chi_p}&=E_y^p\ket{\chi_p}\\H_z\ket{\omega_r}&=E_z^r\ket{\omega_r}\end{aligned}`}</Eq>
          <Tx>{R`由"本征值相加、本征矢相乘"，能级为`}</Tx>
          <Eq n="F-44" keyEq title="可分离哈密顿量的能级" say="可分离哈密顿量的能级是三个一维能级之和。">{R`E^{n,p,r}=E_x^n+E_y^p+E_z^r`}</Eq>
          <Tx>{R`本征矢为 $\ket{\varphi_n}\ket{\chi_p}\ket{\omega_r}$，波函数是乘积
$$\varphi_n(x)\,\chi_p(y)\,\omega_r(z)=\braket{x|\varphi_n}\braket{y|\chi_p}\braket{z|\omega_r}$$
补充材料 $\mathrm{F_I}$（§2）为研究一维模型辩护时用的正是这个机制。那里的哈密顿量是微分算符`}</Tx>
          <Eq n="F-45" say="粒子在势场中的哈密顿量：动能项（拉普拉斯算符）加势能项。">{R`H=-\frac{\hbar^2}{2m}\Delta+V(\mathbf r)`}</Eq>
          <Tx>{R`拉普拉斯算符本来就是三项之和，所以只要势也能分开，`}</Tx>
          <Eq n="F-46" say="可分离的势：三个方向各自的一维势之和。">{R`V(\mathbf r)=V_1(x)+V_2(y)+V_3(z)`}</Eq>
          <Tx>{R`$H$ 就是 \eqref{F-42} 的形式。例：各向异性谐振子 $V=\frac12m(\omega_1^2x^2+\omega_2^2y^2+\omega_3^2z^2)$ 的能级是 $\hbar\omega_1(n+\frac12)+\hbar\omega_2(p+\frac12)+\hbar\omega_3(r+\frac12)$；三个频率相等时出现大量偶然简并，正是 \eqref{F-31} 所说"本征矢不必是乘积"的情形。`}</Tx>
        </Sub>

        <Sub n="F-4-b" title="States of a two-particle system" zh="两粒子系统的态">
          <Tx>{R`**回答第三个问题。**先用波函数语言描述两个（无自旋）粒子：系统的态是六个变量的函数 $\psi(\mathbf r_1,\mathbf r_2)$，其模方给出联合概率——"粒子 1 在 $\mathbf r_1$ 附近的 $\dd^3r_1$ 内、**并且**粒子 2 在 $\mathbf r_2$ 附近的 $\dd^3r_2$ 内"：`}</Tx>
          <Eq n="F-47" say="两粒子波函数的模方给出两个粒子分别出现在两处的联合概率密度。">{R`\dd\mathscr P(\mathbf r_1,\mathbf r_2)=\sym{Cnorm}{C}\,|\psi(\mathbf r_1,\mathbf r_2)|^2\,\dd^3r_1\,\dd^3r_2`}</Eq>
          <Tx>{R`常数 $\sym{Cnorm}{C}$ 由总概率为 1（粒子数守恒，参见第 I 章 §B-2）确定：`}</Tx>
          <Eq n="F-48" say="归一化常数是两粒子波函数模方在六维空间积分的倒数。">{R`\frac{1}{\sym{Cnorm}{C}}=\int\dd^3r_1\,\dd^3r_2\;|\psi(\mathbf r_1,\mathbf r_2)|^2`}</Eq>
          <Tx>{R`现在换成态空间的语言，看张量积能否复现这一切。每个粒子单独有自己的态空间 $\mathscr E_{\mathbf r_1}$、$\mathscr E_{\mathbf r_2}$，各带位置表象与 $X_k,Y_k,Z_k$。猜测整体空间是`}</Tx>
          <Eq n="F-49" keyEq title="两粒子态空间" say="两粒子系统的态空间是两个单粒子态空间的张量积。">{R`\mathscr E_{\mathbf r_1\mathbf r_2}=\mathscr E_{\mathbf r_1}\otimes\mathscr E_{\mathbf r_2}`}</Eq>
          <Tx>{R`它的基是`}</Tx>
          <Eq n="F-50" say="两粒子位置基矢：两个单粒子位置基矢的张量积。">{R`\ket{\mathbf r_1,\mathbf r_2}=\ket{\mathbf r_1}\ket{\mathbf r_2}`}</Eq>
          <Tx>{R`任意右矢按这组基展开，`}</Tx>
          <Eq n="F-51" say="两粒子态按两粒子位置基展开。">{R`\ket{\psi}=\int\dd^3r_1\,\dd^3r_2\;\psi(\mathbf r_1,\mathbf r_2)\ket{\mathbf r_1,\mathbf r_2}`}</Eq>
          <Tx>{R`展开系数正是一个两粒子波函数，`}</Tx>
          <Eq n="F-52" say="两粒子波函数就是态矢量在两粒子位置基中的分量。">{R`\psi(\mathbf r_1,\mathbf r_2)=\braket{\mathbf r_1,\mathbf r_2|\psi}`}</Eq>
          <Tx>{R`而范数平方是它的模方积分：`}</Tx>
          <Eq n="F-53" say="两粒子态的范数平方 = 波函数模方在六维位形空间上的积分。">{R`\braket{\psi|\psi}=\int\dd^3r_1\,\dd^3r_2\;|\psi(\mathbf r_1,\mathbf r_2)|^2`}</Eq>
          <Tx>{R`范数有限 ⟺ $\psi(\mathbf r_1,\mathbf r_2)$ 平方可积。于是张量积空间的右矢与两粒子波函数一一对应——猜测成立：**两粒子系统的态空间是两个单粒子态空间的张量积**，把两粒子的位置分量 $X_1,\dots,Z_2$ 合起来就是它的一个 CSCO。

**乘积态 = 无关联。**若整体处于乘积态，`}</Tx>
          <Eq n="F-54" say="两粒子态是两个单粒子态的乘积。">{R`\ket{\psi}=\ket{\psi_1}\ket{\psi_2}`}</Eq>
          <Tx>{R`波函数就分解为`}</Tx>
          <Eq n="F-55" keyEq title="无关联的两粒子态" say="乘积态的两粒子波函数可以分解成两个单粒子波函数之积：两个粒子之间没有关联。">{R`\psi(\mathbf r_1,\mathbf r_2)=\braket{\mathbf r_1,\mathbf r_2|\psi}=\braket{\mathbf r_1|\psi_1}\braket{\mathbf r_2|\psi_2}=\psi_1(\mathbf r_1)\,\psi_2(\mathbf r_2)`}</Eq>
          <Tx>{R`联合概率密度 $|\psi_1(\mathbf r_1)|^2|\psi_2(\mathbf r_2)|^2$ 是两个独立概率之积：对粒子 1 的任何测量都不影响对粒子 2 的预言，称两粒子**没有关联**（物理后果见补充材料 $\mathrm{D_{III}}$）。反过来，上面交互图中那些 Schmidt 秩为 2 的态，就是有关联的情形。

**一般原则：**由若干较简单系统组成的物理系统，其态空间是各组成部分态空间的张量积。`}</Tx>
          <Box kind="aside" title="延伸阅读（原书建议）">{R`原书参考文献第 10 部分按主题、大致按难度递增列出了数学书；第 1、2 部分的量子力学教材也在不同层次上讨论这些数学问题。入门可读 Arfken (10.4) 第 4 章、Bak 与 Lichtenberg (10.3) 第 I 章、Bass (10.1) 卷 I 第 II–V 章；更贴近量子力学的有 Jackson (10.5)（特别是第 5 章）、Butkov (10.8) 第 10、11 章；另见 Meijer 与 Bauer (2.18) 第 1 章末的表格。`}</Box>
        </Sub>
      </Sub>
    </Sec>);
}
