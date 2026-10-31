// §2 开头（Conventions）与 §2.1 一般积和式与加法公式 —— 原文 p.3
import { Sec, Tx, Eq, Box, Derivation, C, Stmt, Proof, Erratum } from "@kit";
import { PermLab, AdditionLab } from "./_ch02_run.jsx";

const R = String.raw;

export function Sec2Intro() {
  return (
    <Sec n="2" title="Computing structured permanents" zh="计算结构化积和式：约定"
      gist={R`本节的算法是在**插值点**上使用的；它们**不用稀疏性**。全文约定：$\log$ 以 2 为底；运算量只数有理数算术运算、略去多项式因子；数的位长保持多项式。`}
      why={R`整篇论文的算法分两层：外层（§3–§6）构造一条曲线 $A(t)$ 并插值；内层在曲线上的特殊点真正"算积和式"。本节先把内层引擎造好，外层只把它当黑盒调用。`}
      gives={[]}>
      <Tx>{R`先交代本节在整体中的位置。论文最终要算一个**稀疏**矩阵（每行每列 $O(1)$ 个非零元）的积和式。它不直接算 $\per(A)$，而是把 $A$ 放进一条矩阵多项式曲线 $A(t)$（$A(0)=A$），在曲线上 $\ell$ 个特殊点 $t=1,\dots,\ell$ 处求 $P(t)=\per(A(t))$ 的若干阶导数，再插值回 $t=0$。本节回答的是最底层的问题：**在一个特殊点上，矩阵长成什么样才好算？**答案是"小块 + 低秩"，即 \sref{L2.1}。

一个容易忽略的事实：本节的算法**完全不用稀疏性**。稀疏性只在 §4 构造分解时起作用；到了特殊点，矩阵 $A(i)=B_i+E_{\rm out}$ 的低秩部分一般是稠密的。`}</Tx>
      <Box kind="key" title="约定（Conventions）">{R`**(1) 对数。**除 $\ln$ 外，所有对数以 2 为底。

**(2) 指数的非正式写法。**在非正式描述里，运行时间的指数说成 $n/\sqrt{\log n}$，略去 $\log\log n$ 的幂次；而凡是**正式写出的**运行时间界都保留这些因子（最终界是 $2^{O(n(\log\log n)^2/\sqrt{\log n})}$）。

**(3) 有理数。**算法中出现的所有矩阵都是有理矩阵。

**(4) 算术运算计数。**运算量的界只数算术运算（加、减、乘、除），并**略去多项式因子**；当输入的位长是多项式时，下面用到的所有数的位长也是多项式的——所以"算术运算数"与真实运行时间只差多项式因子。

**(5) 充分大的 $n$。**只对充分大的 $n$ 做论证；有界规模的输入可以直接（用任何算法）处理。`}</Box>
      <Erratum kind="note" title="为什么数的位长保持多项式">{R`以本节为例：低秩公式 \eqref{2.5} 里出现 $\nu!\le n!$，其位长 $O(n\log n)$；$D_L(n,\nu)$ 是至多 $r^n$ 个乘积之和，每个乘积是 $n$ 个输入数之积——位长都是输入位长的多项式倍。这就是约定 (4) 说"数的位长保持多项式"的含义：我们可以放心地只数算术运算。`}</Erratum>
    </Sec>);
}

export function Sec21() {
  return (
    <Sec n="2.1" title="Ordinary permanent and the addition formula" zh="一般积和式与加法公式"
      gist={R`积和式是二部图完美匹配的加权和；子集 DP 与 Ryser 公式 \eqref{2.1} 给出 $O(n2^n)$ 的基线；加法公式 \eqref{2.2} 按每条匹配边的"来源"把 $\per(B+C)$ 拆成子矩阵积和式的乘积之和。`}
      why={R`基线告诉我们要打败什么（指数里的 $n$）；加法公式是 §3 求导数、以及本节 \sref{L2.1} 证明的共同思想原型。`}
      gives={["2.1", "2.2"]}>
      <p className="muted">本节概念：<C id="permanent" /> · <C id="baseline" /> · <C id="addition" /></p>
      <Tx>{R`**定义。**$n\times n$ 矩阵 $A$ 的**积和式**（permanent）是`}</Tx>
      <Eq title="积和式的定义">{R`\per(A)=\sum_{\pi\in S_n}\prod_{u=1}^{n}A_{u,\pi(u)}.`}</Eq>
      <Tx>{R`它和行列式只差一个符号 $\operatorname{sgn}(\pi)$，但这一差别是本质的。最好的理解方式是图论的：把 $A$ 看成一个二部图，左侧 $n$ 个顶点是行、右侧 $n$ 个顶点是列，$A_{uv}$ 是边 $(u,v)$ 的权重。一个排列 $\pi$ 恰好是一个**完美匹配**（perfect matching）——左顶点 $u$ 连到右顶点 $\pi(u)$——它的权重是所有边权之积。于是

$$\per(A)=\text{二部图中所有完美匹配的权重之和}.$$

整节都会用这个图像：后面的"边来自 $B$ 还是 $C$""端点着什么颜色"，都是对匹配中每一条边的分类。`}</Tx>

      <Tx>{R`**基线一：子集动态规划。**按行 $u=1,2,\dots,n$ 依次为每一行选一列，状态记录"已经用过的列的集合" $X\subseteq[n]$：令 $f_u(X)$ 为前 $u$ 行恰好用掉列集 $X$（$|X|=u$）的所有部分匹配的权重和，则 $f_u(X)=\sum_{v\in X}A_{uv}f_{u-1}(X\setminus\{v\})$，最后 $\per(A)=f_n([n])$。状态共 $2^n$ 个，每个状态转移至多 $n$ 次，合计 $O(n2^n)$ 次算术运算。`}</Tx>
      <Tx>{R`**基线二：Ryser 公式**（Ryser's inclusion–exclusion formula，[Rys63]）给出同样的量级：`}</Tx>
      <Eq n="2.1" keyEq title="Ryser 公式" say={R`对每个列子集 $S$，先让每一行“在 $S$ 里任选一列”（行和的乘积），再用容斥符号把“没有用满所有列”的选法抵消掉，剩下的恰好是排列。`}>{R`\per(A)=\sum_{S\subseteq[n]}(-1)^{n-|S|}\prod_{u=1}^{n}\sum_{v\in S}A_{uv}.`}</Eq>
      <Derivation title="补全：为什么 Ryser 公式成立" collapsed steps={[
        { tex: R`\prod_{u=1}^{n}\sum_{v\in S}A_{uv}=\sum_{f:[n]\to S}\ \prod_{u=1}^{n}A_{u,f(u)}`, why: R`把乘积展开：每行 $u$ 在 $S$ 中独立地选一列 $f(u)$。这里 $f$ 是任意函数，不必是双射。` },
        { tex: R`\sum_{S\subseteq[n]}(-1)^{n-|S|}\prod_{u}\sum_{v\in S}A_{uv}=\sum_{f:[n]\to[n]}\Big(\prod_{u}A_{u,f(u)}\Big)\sum_{S\supseteq f([n])}(-1)^{n-|S|}`, why: R`交换求和次序：函数 $f$ 出现在所有包含其像 $f([n])$ 的 $S$ 中。` },
        { tex: R`\sum_{S\supseteq f([n])}(-1)^{n-|S|}=\begin{cases}1,& f([n])=[n]\\0,& \text{否则}\end{cases}`, why: R`设像的大小为 $m$，则 $S$ 在其余 $n-m$ 列中任取，内层和为 $(1-1)^{n-m}$；它只在 $m=n$ 时不为零。` },
        { tex: R`f([n])=[n]\iff f\in S_n`, why: R`$[n]\to[n]$ 的满射就是排列。于是只剩排列项，正是 $\per(A)$。` },
      ]} result={R`\eqref{2.1} 成立，且它对任意（含负数的）有理矩阵都成立。`} />
      <Erratum kind="note" loc="p.3 §2.1" title="Ryser 公式的 $O(n2^n)$ 需要 Gray 码顺序">{R`按 \eqref{2.1} 逐项直接计算，每个 $S$ 要算 $n$ 个长度 $\le n$ 的行和，共 $O(n^2 2^n)$。要达到正文说的"同样的界" $O(n2^n)$，需按 **Gray 码**顺序枚举 $S$：相邻两个 $S$ 只差一列 $v$，每个行和 $\sum_{v\in S}A_{uv}$ 只需加上或减去一个 $A_{uv}$，更新 $n$ 个行和、再乘起来都是 $O(n)$。下面的"积和式实验室"同时运行了朴素版与 Gray 码版，可以直接比较运算次数。对整篇论文而言这一因子 $n$ 无关紧要（多项式因子被略去）。`}</Erratum>
      <Tx>{R`这两种基线都付出 $2^n$。在子集 DP 里看得最清楚：$2^n$ 来自**必须记住哪些列已被占用**。接下来的全部改进，都是在想办法"少记一点"。`}</Tx>

      <PermLab />

      <Tx>{R`**加法公式。**为了后面使用，再准备一个拆分工具。设 $A=B+C$。积和式中的每一项选出 $n$ 个元素，每个元素 $A_{u\pi(u)}=B_{u\pi(u)}+C_{u\pi(u)}$ 都可以按**来源**展开——它要么取自 $B$，要么取自 $C$。把"取自 $C$"的那些行记作 $S$、它们匹配到的列记作 $T$，就得到`}</Tx>
      <Eq n="2.2" keyEq title="积和式加法公式" say={R`$\per(B+C)$ 等于：对所有大小相同的行集 $S$、列集 $T$，用 $C$ 匹配 $S$ 与 $T$、用 $B$ 匹配其余行列，两部分积和式的乘积再求和。`}>{R`\per(B+C)=\sum_{\substack{S,T\subseteq[n]\\|S|=|T|}}\per(B[S^c,T^c])\ \per(C[S,T]).`}</Eq>
      <Tx>{R`这里 $S,T$ 是**用 $C$ 匹配的**行与列，剩下的端点（$S^c$ 与 $T^c$）用 $B$ 匹配；$M[S,T]$ 表示由行 $S$、列 $T$ 构成的子矩阵。约定**空矩阵的积和式为 1**——这样 $S=T=\varnothing$ 一项就是 $\per(B)$，$S=T=[n]$ 一项就是 $\per(C)$。`}</Tx>
      <Stmt id="F:add">
        <Proof title={R`加法公式 \eqref{2.2}`} steps={[
          { claim: R`展开每个乘积因子。`, tex: R`\per(B+C)=\sum_{\pi\in S_n}\prod_{u=1}^n\big(B_{u\pi(u)}+C_{u\pi(u)}\big)=\sum_{\pi\in S_n}\sum_{S\subseteq[n]}\prod_{u\notin S}B_{u\pi(u)}\prod_{u\in S}C_{u\pi(u)}`, why: R`$n$ 个二项式之积：每行独立决定取 $B$ 还是 $C$；$S$ 是取 $C$ 的行。`, fill: true },
          { claim: R`按 $T=\pi(S)$ 分组：对固定的 $S,T$（$|S|=|T|$），满足 $\pi(S)=T$ 的排列与"双射对" $(\sigma,\tau)$ 一一对应，其中 $\sigma:S\to T$，$\tau:S^c\to T^c$。`, why: R`$\pi$ 把 $S$ 映满 $T$，必然把 $S^c$ 映满 $T^c$；反之任给两个双射可拼成一个排列。`, fill: true },
          { claim: R`在每组内，求和对 $\sigma$ 与 $\tau$ 分离（因式分解）。`, tex: R`\sum_{\sigma,\tau}\prod_{u\notin S}B_{u\tau(u)}\prod_{u\in S}C_{u\sigma(u)}=\per(B[S^c,T^c])\,\per(C[S,T])`, why: R`一个乘积只依赖 $\tau$，另一个只依赖 $\sigma$；双射 $S\to T$ 的加权和就是子矩阵 $C[S,T]$ 的积和式。`, fill: true },
          { claim: R`对所有 $|S|=|T|$ 的 $(S,T)$ 求和即得 \eqref{2.2}。`, why: R`每个 $(\pi,S)$ 恰好落入一组 $(S,\pi(S))$，不重不漏；$S=\varnothing$ 时 $C$ 部分是空矩阵，积和式取 1。` },
        ]} />
      </Stmt>
      <Box kind="warning" title="哪一边是补集">{R`$\per(B[S^c,T^c])$ 中 $B$ 作用在**补集**上：$S,T$ 是交给 $C$ 的那部分。§3 中 $C=\Delta(z)$ 的每个元素都含因子 $z$，所以 $\per(\Delta(z)[S,T])$ 被 $z^{|S|}$ 整除——只有 $|S|$ 小的项影响低阶导数，而大的积和式 $\per(A_0[S^c,T^c])$ 都是 $A_0$ 的**子矩阵**积和式。这就是本节结论必须对"每个方子矩阵"成立的原因。`}</Box>

      <AdditionLab />

      <Tx>{R`**小结。**一般积和式的代价是 $2^n$，根源在于"记住用过的列"。加法公式告诉我们，把矩阵拆成两部分时，可以按每条边的来源分组、让两部分各自形成子矩阵积和式。下一小节先看一种特殊结构——低秩——在那里"记住用过的列"可以换成"记住每种颜色用了几次"。`}</Tx>
    </Sec>);
}
