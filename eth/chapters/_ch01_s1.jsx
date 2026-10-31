// 第 1 节正文：目标与纲要九步（原文 pp.1–2）。每一步：原文的断言（公式逐字符对照 p-001/p-002）+ 讲解 + 去哪里证明。
import { Sec, Sub, Eq, Tx, Box, SRef, Stmt } from "@kit";

const R = String.raw;

export function Sec1() {
  return (
    <Sec n="1" title="Goal and outline of the proof" zh="目标与证明纲要"
      gist={R`主结果：每行每列 $O(1)$ 个非零元的 $n\times n$ 有理矩阵，积和式可在 \eqref{1.1} 时间内确定性精确算出；办法是插值 $P(t)=\per(A(t))$，分九步完成。`}
      why={R`先看清全局：哪些步骤是"算法"（§2–§3），哪些是"代数构造"（§4–§5），参数在哪里汇合（§6）。`}
      gives={["1.1", "1.2", "1.3"]}>
      <Tx>{R`本文解释的是 [OAI26] 手稿中的"稀疏积和式"路线。主要结果是一个**精确、确定性**的算法：对每行每列至多 $O(1)$ 个非零元的 $n\times n$ 有理矩阵，计算积和式的时间为`}</Tx>
      <Eq n="1.1" keyEq title="主定理的时间界" say={R`运行时间是 2 的幂，指数是 $n$ 乘以一个趋于 0 的因子 $(\log\log n)^2/\sqrt{\log n}$——比 $2^{\varepsilon n}$（任何固定 $\varepsilon>0$）都小，即 $2^{o(n)}$。`}>{R`2^{O\left(\frac{n(\log\log n)^2}{\sqrt{\log n}}\right)}.`}</Eq>
      <Tx>{R`经典的线性规模归约把这个界原样搬到"计数 $n$ 变量、$O(n)$ 个子句的 3-CNF 的满足赋值"上（第 6 节）。正文证明稀疏情形；多项式空间版本与任意 3-CNF 的推广分别在附录 A、B。

算法通过插值单变量多项式 $P(t)=\per(A(t))$ 来恢复 $\per(A)=P(0)$。**怎样构造 $A(t)$** 与**怎样计算它的积和式**是论证中两块独立的部分——前者是代数，后者是算法。下面九步就是整篇论文的骨架；每一步后面注明在哪里证明。`}</Tx>

      <Sub n="1(1)" title="Compute structured permanents" zh="第 1 步：计算结构化积和式">
        <Tx>{R`Ryser 公式或子集 DP 计算任意积和式需 $2^{O(n)}$ 时间。对秩 $r$ 的矩阵，记录 $r$ 个"类型计数"的 DP 只需`}</Tx>
        <Eq say="秩 r 的积和式：状态数是从 n 个端点里数出 r 种颜色各用多少次的方式数，即 C(n+r, r)，对固定 r 是 n 的多项式。">{R`\poly(n,r)\binom{n+r}{r}=n^{O(r)}`}</Eq>
        <Tx>{R`时间。两个想法可以结合：若 $B$ 的对角块至多 $s$ 行 $s$ 列、$\rank(E)\le r$，则 $\per(B+E)$ 代价 $2^{O(s)}n^{O(r)}$（不计多项式因子），**而且对每个方子矩阵都成立**。→ 证明见 §2，\sref{L2.1}。`}</Tx>
      </Sub>

      <Sub n="1(2)" title="Compute derivatives from submatrix permanents" zh="第 2 步：由子矩阵积和式求导数">
        <Tx>{R`设 $A(t_0)$ 的每个方子矩阵积和式至多花时间 $T$。对 $1\le h\le n/2$，可以计算`}</Tx>
        <Eq say={R`在一点 $t_0$ 处求 $P$ 的前 $h$ 个导数值，代价是子矩阵积和式的时间 $T$ 乘以 $(n/h)^{O(h)}$——$h\ll n$ 时这远小于 $2^n$。`}>{R`P(t_0),P'(t_0),\dots,P^{(h-1)}(t_0)\quad\text{in time}\quad T\,\poly(n)(n/h)^{O(h)}.`}</Eq>
        <Tx>{R`导数矩阵本身不需要任何结构：积和式加法公式把大积和式都留在 $A(t_0)$ 的子矩阵里。→ §3，\sref{L3.1}。`}</Tx>
      </Sub>

      <Sub n="1(3)" title="Construct a family with many easy points" zh="第 3 步：构造一个有很多好点的族">
        <Tx>{R`对稀疏的 $A$，构造矩阵多项式满足`}</Tx>
        <Eq n="1.2" keyEq title="变形族的两个要求" say={R`变形族在 $t=0$ 处就是原矩阵，而且每个元素都是 $t$ 的低次多项式，次数只有 $\sqrt{\log n}$ 量级。`}>{R`A(0)=A,\qquad \deg A(t)\le d=O(\sqrt{\log n}).`}</Eq>
        <Tx>{R`在 $\ell=\Theta(\log n/\log\log n)$ 个点 $i=1,\dots,\ell$ 上，$A(i)$ 的**每个方子矩阵**的积和式都应能在 $T_0=2^{O(n/\log^{10}n)}$ 时间内算出。这里矩阵多项式的次数指元素次数的最大值。特殊点算法来自分解 $A(i)=B_i+E_{\rm out}$：$B_i$ 是小块，$E_{\rm out}$ 是低秩。→ §4–§6，\sref{F:At}。`}</Tx>
      </Sub>

      <Sub n="1(4)" title="Interpolate using derivatives" zh="第 4 步：用导数插值">
        <Tx>{R`因为 $\deg P\le nd$，在 $\ell$ 个不同点处的 $0,\dots,h-1$ 阶导数在 $\ell h>nd$ 时就确定 $P$。取`}</Tx>
        <Eq say={R`每个特殊点要求的导数阶数：$nd/\ell$ 再加一，量级是 $n\log\log n/\sqrt{\log n}$，远小于 $n$。`}>{R`h=\left\lfloor\frac{nd}{\ell}\right\rfloor+1=O\!\left(\frac{n\log\log n}{\sqrt{\log n}}\right)`}</Eq>
        <Tx>{R`得到总时间`}</Tx>
        <Eq say={R`总时间 = 特殊点上的子矩阵积和式（指数 $n/\log^{10}n$）+ 导数的组合数（指数 $h\log(n/h)$）；后者占主导，正好给出主定理的界。`}>{R`2^{O(n/\log^{10}n+h\log(n/h))}=2^{O\left(\frac{n(\log\log n)^2}{\sqrt{\log n}}\right)}.`}</Eq>
        <Tx>{R`插值本身只有多项式代价。所以节省完全来自 $d/\ell\ll1$：它让所需的导数阶数远低于 $n$。→ §3.1，\sref{P3.2}；参数见 §6。`}</Tx>
        <Box kind="key" title="$(\log\log n)^2$ 是怎么来的">{R`$h\approx nd/\ell$，其中 $d=\Theta(\sqrt{\log n})$、$\ell=\Theta(\log n/\log\log n)$，故 $h=\Theta(n\log\log n/\sqrt{\log n})$——第一个 $\log\log n$。再乘 $\log(n/h)=\log\big(\sqrt{\log n}/\log\log n\big)=\Theta(\log\log n)$——第二个 $\log\log n$。`}</Box>
      </Sub>

      <Sub n="1(5)" title="Give rows and columns word labels" zh="第 5 步：给行列贴词标号">
        <Tx>{R`标号取自 $[q]^\ell$，其中 $q=\lceil(\log n)^{10}\rceil$，$Q=q^\ell$ 大约是 $\sqrt n$（相差至多 $q$ 倍）。平衡的贪心标号保证：每对有序标号至多含一个非零元，且每个非零元的两个标号**在每个坐标上都不同**。→ §4.2，\sref{L4.1}。`}</Tx>
      </Sub>

      <Sub n="1(6)" title="Factor through copies of the Boolean cube" zh="第 6 步：经由布尔立方体的拷贝分解">
        <Tx>{R`中间坐标是逐位都不同的有序词对，个数为`}</Tx>
        <Eq say={R`中间坐标的个数：每个位置选一个有序的不同符号对，共 $(q(q-1))^\ell$ 个，至多 $Q^2$，即 $n$ 乘一个 polylog。`}>{R`M=(q(q-1))^\ell\le Q^2=O(n\log^{20}n).`}</Eq>
        <Tx>{R`固定每个位置的无序符号对，剩下 $\ell$ 个方向位；于是坐标分成若干份 $\{0,1\}^\ell$ 的拷贝，并且`}</Tx>
        <Eq say={R`输入矩阵分解为 $L\cdot\cJ\cdot R'$；中间矩阵 $\cJ$ 在每个布尔立方体上是同一个 $X^{\otimes\ell}$（翻转所有方向位）。`}>{R`A=L\cJ R',\qquad \cJ=I_C\otimes X^{\otimes\ell},\qquad X=\begin{pmatrix}0&1\\1&0\end{pmatrix}.`}</Eq>
        <Tx>{R`集合 $C$ 标记各个拷贝。§4 先在 $\ell=1$ 时讲完整的分解：从 $A=LR$ 出发，插入 $I$，最后才翻转 $R$ 中的标号。→ \sref{F:factor}。`}</Tx>
      </Sub>

      <Sub n="1(7)" title="Leave one coordinate alone" zh="第 7 步：放过一个坐标">
        <Tx>{R`若 $K$ 在把第 $i$ 个坐标移到第一个张量因子后形如 $I_2\otimes B$，称 $K$ 为 *$i$-好的*。把 $X^{\otimes\ell}$ 换成这样的 $K$ 后，`}</Tx>
        <Eq say="把中间矩阵换成在第 i 坐标上是恒等的 K 后得到的外层矩阵。">{R`L(I_C\otimes K)R'`}</Eq>
        <Tx>{R`在按第 $i$ 个标号符号分别重排行与列之后是分块对角的：共 $q$ 块，每块 $O(n/q)$ 行列。→ \sref{D4.2}、\sref{L4.3}。`}</Tx>
      </Sub>

      <Sub n="1(8)" title="Allow a low-rank correction" zh="第 8 步：允许低秩修正">
        <Tx>{R`只需构造一个局部矩阵多项式 $J(t)$ 满足`}</Tx>
        <Eq say="局部多项式在 0 处是全翻转，在每个特殊点 i 处是一个 i-好矩阵加上同一个低秩误差 E。">{R`J(0)=X^{\otimes\ell},\qquad J(i)=K_i+E,\qquad K_i\ i\text{-nice},\qquad \rank(E)\le2^\ell/\ell^{100}.`}</Eq>
        <Tx>{R`事实上，令 $A(t)=L(I_C\otimes J(t))R'$ 就得到秩至多 $M/\ell^{100}$ 的输出修正。同一个 $E$ 在每个特殊点都适用，而且修正是**精确计算**的，并没有被丢弃。→ \sref{F:survive}。`}</Tx>
      </Sub>

      <Sub n="1(9)" title="Obtain the polynomial from parity" zh="第 9 步：由奇偶性得到多项式">
        <Tx>{R`存在次数 $d=O(\sqrt{\ell\log\ell})$ 的有理多项式 $p$，使 $p(x_1+\dots+x_\ell)$ 在 $\{-1,1\}^\ell$ 中除 $\ell^{-100}$ 比例外的所有点上都等于 $x_1\cdots x_\ell$。令 $X_j$ 翻转第 $j$ 位。所需的族是`}</Tx>
        <Eq n="1.3" keyEq title="局部矩阵多项式 $J(t)$" say={R`$J(t)$ 由三项组成：全翻转 $X^{\otimes\ell}$，加上 $p$ 作用在"第 $j$ 位按 $(1-t/j)$ 加权的翻转之和"上，再减去 $p$ 作用在"不加权翻转之和"上。$t=0$ 时后两项抵消；$t=i$ 时第 $i$ 位的权重变成 0。`}>{R`\boxed{J(t)=X^{\otimes\ell}+p\!\left(\sum_{j=1}^{\ell}(1-t/j)X_j\right)-p\!\left(\sum_{j=1}^{\ell}X_j\right).}`}</Eq>
        <Tx>{R`在 $t=i$ 处，中间一项不含 $X_i$，所以是 $i$-好的。Hadamard 换基把剩余误差的秩等同于 $p$ 不等于奇偶性的输入个数。→ §5，\sref{T5.1}。`}</Tx>
      </Sub>

      <Stmt id="C:ETH">
        <Tx>{R`**为什么标题说 ETH 为假。** 计数算法自然是判定算法（计数 $>0$ ⇔ 可满足）。第 6 节把 $n$ 变量、$O(n)$ 子句的 3-CNF 线性规模地归约为最大度 3 的稀疏积和式（\sref{F:reduce}），于是 3SAT（子句数线性）可在 \eqref{1.1} 时间内判定；由稀疏化引理，ETH 对子句数线性的 3-CNF 已等价。附录 B 更进一步，不经稀疏化损失地对任意 3-CNF 给出同样的界（\sref{TB.5}）。`}</Tx>
      </Stmt>
    </Sec>);
}
