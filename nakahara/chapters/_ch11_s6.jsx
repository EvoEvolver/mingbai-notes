// §11.6 Stiefel–Whitney 类 —— 式 (11.129)–(11.142)，定理 11.6–11.7，习题 11.5
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Derivation, Exercise, C } from "@kit";

const R = String.raw;

export function Sec116() {
  return (
    <Sec n="11.6" title="Stiefel–Whitney classes" zh="Stiefel–Whitney 类"
      gist={R`自旋结构 = 把 $\mathrm{SO}(m)$ 转移函数提升到 $\mathrm{SPIN}(m)$ 且保持余循环条件 → $\Z_2$ 系数的 Čech 上同调：上链、上边缘 $\delta$、$\delta^2=1$ → $w_1=[\det t_{ij}]\in H^1(M;\Z_2)$，平凡 ⇔ 可定向 → $w_2=[\tilde t_{ij}\tilde t_{jk}\tilde t_{ki}]\in H^2(M;\Z_2)$，平凡 ⇔ 有自旋结构 → $\CP^m$、$S^m$、$\Sigma_g$ 的例子。`}
      why={R`陈类、Pontrjagin 类、Euler 类都由曲率给出，取实系数，看不见"符号"这类离散信息。而物理中最基本的拓扑问题之一——流形上能否定义费米子（旋量场）——恰恰是一个 $\pm1$ 的问题：$\mathrm{SPIN}(m)\to\mathrm{SO}(m)$ 是二重覆叠。Stiefel–Whitney 类用 Čech 上同调回答它。`}
      gives={["11.129", "11.130", "11.131", "11.134", "11.135", "11.136", "11.137", "11.139", "11.140", "11.141", "11.142"]}>
      <p className="muted">本节概念：<C id="stiefel_whitney" /></p>
      <Tx>{R`示性类的最后一个例子是 **Stiefel–Whitney 类**。与其余的示性类不同，Stiefel–Whitney 类不能用丛的曲率表达。它在物理中很重要，因为它告诉我们一个流形是否容许自旋结构。我们先简要回顾自旋丛。`}</Tx>

      <Sub n="11.6.1" title="Spin bundles" zh="自旋丛">
        <Tx>{R`设 $TM\xrightarrow{\pi}M$ 是切丛，$\dim M=m$。假设 $TM$ 带有纤维度规，结构群 $G$ 取为 $\mathrm{O}(m)$。若 $M$ 还可定向，$G$ 可以约化到 $\mathrm{SO}(m)$。设 $LM$ 是与 $TM$ 相伴的标架丛，$t_{ij}$ 是 $LM$ 的转移函数，满足相容条件（\eqref{9.6a}–\eqref{9.6c}）

$$t_{ij}t_{jk}t_{ki}=I\qquad t_{ii}=I.$$

$M$ 上的**自旋结构**（spin structure）由满足下式的转移函数 $\tilde t_{ij}\in\mathrm{SPIN}(m)$ 定义：`}</Tx>
        <Eq n="11.129" keyEq title="自旋结构" say={R`自旋结构：给每个 $\mathrm{SO}(m)$ 转移函数挑一个 $\mathrm{SPIN}(m)$ 中的"平方根"，使挑出来的那组仍然满足余循环条件。`}>{R`\varphi(\tilde t_{ij})=t_{ij}\qquad\tilde t_{ij}\tilde t_{jk}\tilde t_{ki}=I\qquad\tilde t_{ii}=I`}</Eq>
        <Tx>{R`其中 $\varphi$ 是二重覆叠 $\mathrm{SPIN}(m)\to\mathrm{SO}(m)$。$\tilde t_{ij}$ 的集合定义 $M$ 上的**自旋丛** $PS(M)$，称 $M$ 容许自旋结构（当然，按 $\tilde t_{ij}$ 的选择不同，$M$ 可能容许多个自旋结构）。

有趣的是，并非所有流形都容许自旋结构。不容许自旋结构的程度由第二 Stiefel–Whitney 类度量，它取值于 Čech 上同调群 $H^2(M;\Z_2)$。`}</Tx>
        <Box kind="physics" title="为什么这是一个问题">{R`$\mathrm{SPIN}(m)$ 中的 $\pm\tilde t$ 映到同一个转动 $t$——旋量转 $2\pi$ 变号。局部地，每个 $t_{ij}$ 都能提升（两种选择），但三张卡相交处提升出来的乘积 $\tilde t_{ij}\tilde t_{jk}\tilde t_{ki}$ 只被确定到 $\pm I$。如果无论怎样选符号都有某处等于 $-I$，旋量场就无法在整个流形上一致地粘合：流形上不存在费米子。$\CP^2$ 就是这样的例子。`}</Box>
      </Sub>

      <Sub n="11.6.2" title="Čech cohomology groups" zh="Čech 上同调群">
        <Tx>{R`**动机。**de Rham 上同调由微分形式构成，系数是实数，看不见 $\pm1$。我们需要一种直接用开覆盖的组合数据（哪些卡相交）构造的上同调，系数可以取 $\Z_2$。

令 $\Z_2$ 为*乘法*群 $\{-1,+1\}$。**Čech $r$ 上链**（Čech $r$-cochain）是定义在 $U_{i_0}\cap U_{i_1}\cap\ldots\cap U_{i_r}\neq\emptyset$ 上的函数 $f(i_0,i_1,\ldots,i_r)\in\Z_2$，它在任意置换 $P$ 下全对称：

$$f(i_{P(0)},\ldots,i_{P(r)})=f(i_0,\ldots,i_r).$$

令 $C^r(M,\Z_2)$ 为 Čech $r$ 上链的乘法群。定义上边缘算子 $\delta:C^r(M;\Z_2)\to C^{r+1}(M;\Z_2)$：`}</Tx>
        <Eq n="11.130" keyEq title="Čech 上边缘" say={R`上边缘：在 $r+2$ 重交上，把"去掉一个指标"得到的 $r+2$ 个值全部乘起来（乘法记号下的交错和）。`}>{R`(\delta f)(i_0,\ldots,i_{r+1})=\prod_{j=0}^{r+1}f(i_0,\ldots,\hat i_j,\ldots,i_{r+1})`}</Eq>
        <Tx>{R`其中带 $\hat{}$ 的变量被略去。例如

$$(\delta f_0)(i_0,i_1)=f_0(i_1)f_0(i_0)\qquad f_0\in C^0(M;\Z_2)$$
$$(\delta f_1)(i_0,i_1,i_2)=f_1(i_1,i_2)f_1(i_0,i_2)f_1(i_0,i_1)\qquad f_1\in C^1(M;\Z_2).$$

由于采用乘法记号，$C^r(M;\Z_2)$ 的单位元记为 1。（在 $\Z_2$ 中 $-1$ 的逆是它自己，所以交错和里的符号 $(-1)^j$ 不必出现。）我们验证 $\delta$ 是幂零的：

$$(\delta^2f)(i_0,\ldots,i_{r+2})=\prod_{j\neq k}f(i_0,\ldots,\hat i_j,\ldots,\hat i_k,\ldots,i_{r+2})=1$$

因为在中间的表达式中 $-1$ 总是出现偶数次（例如若 $f(i_0,\ldots,\hat i_j,\ldots,\hat i_k,\ldots,i_{r+2})=-1$，由 $f$ 的对称性，先去掉 $i_k$ 再去掉 $i_j$ 得到的同一个因子也是 $-1$：每个"去掉两个指标"的因子恰好出现两次）。于是对任意 Čech $r$ 上链 $f$ 证明了`}</Tx>
        <Eq n="11.131" say={R`上边缘的上边缘是平凡的：这是能定义上同调的前提，相当于 $\dd^2=0$。`}>{R`\delta^2f=1.`}</Eq>
        <Tx>{R`（原书把乘积的指标范围写作 $j,k=1,\ldots,r+1$；应理解为 $j\neq k$ 取遍 $0,\ldots,r+2$。）**上闭链群** $Z^r(M;\Z_2)$ 与**上边缘群** $B^r(M;\Z_2)$ 定义为`}</Tx>
        <Eq n="11.132" say={R`上闭链：上边缘为平凡的上链。`}>{R`Z^r(M;\Z_2)=\{f\in C^r(M;\Z_2)\mid\delta f=1\}`}</Eq>
        <Eq n="11.133" say={R`上边缘：本身是某个低一阶上链的上边缘的上链。`}>{R`B^r(M;\Z_2)=\{f\in C^r(M;\Z_2)\mid f=\delta f',\ f'\in C^{r-1}(M;\Z_2)\}.`}</Eq>
        <Tx>{R`于是第 $r$ 个 **Čech 上同调群** $H^r(M;\Z_2)$ 定义为`}</Tx>
        <Eq n="11.134" keyEq title="Čech 上同调" say={R`Čech 上同调：上闭链模去上边缘——"局部可以消掉、整体消不掉"的 $\pm1$ 数据。`}>{R`H^r(M;\Z_2)=\ker\delta_r/\mathrm{im}\,\delta_{r-1}=Z^r(M;\Z_2)/B^r(M;\Z_2).`}</Eq>
        <Box kind="example" title={R`小例子：$S^1$ 的 $H^1(S^1;\Z_2)=\Z_2$（补充）`}>{R`用三段弧 $U_1,U_2,U_3$ 覆盖 $S^1$，两两相交（三段两两交于一小段），三者无公共交（所以没有 2 上链，每个 1 上链都是闭的）。1 上链是三个符号 $(f(1,2),f(2,3),f(3,1))$；上边缘 $\delta f_0(i,j)=f_0(i)f_0(j)$ 的三个值之积总是 $f_0(1)^2f_0(2)^2f_0(3)^2=1$。所以"三个符号之积"是 $H^1$ 的不变量，取 $\pm1$：$H^1(S^1;\Z_2)\cong\Z_2$。Möbius 带（一个交上 $\det t=-1$）对应非平凡类，正是下面的 $w_1\neq1$：Möbius 带作为 $S^1$ 上的线丛不可定向。`}</Box>
      </Sub>

      <Sub n="11.6.3" title="Stiefel–Whitney classes" zh="Stiefel–Whitney 类">
        <Tx>{R`Stiefel–Whitney 类 $w_r$ 是取值于 $H^r(M;\Z_2)$ 的示性类。设 $TM\xrightarrow{\pi}M$ 是带 Riemann 度规的切丛，结构群为 $\mathrm{O}(m)$，$m=\dim M$。假设 $\{U_i\}$ 是 $M$ 的*简单*开覆盖：任意多个卡的交要么是空集、要么可缩。设 $\{e_{i\alpha}\}$（$1\le\alpha\le m$）是 $U_i$ 上 $TM$ 的局部正交归一标架。有 $e_{i\alpha}=t_{ij}e_{j\alpha}$，其中 $t_{ij}:U_i\cap U_j\to\mathrm{O}(m)$ 是转移函数。定义 Čech 1 上链 $f(i,j)$：`}</Tx>
        <Eq n="11.135" keyEq title={R`$w_1$ 的代表`} say={R`第一 Stiefel–Whitney 类的代表：每个重叠区上转移函数的行列式——$+1$ 表示两张卡的定向一致，$-1$ 表示相反。`}>{R`f(i,j)\equiv\det(t_{ij})=\pm1.`}</Eq>
        <Tx>{R`由于 $f(i,j)=f(j,i)$（$t_{ji}=t_{ij}^{-1}$，$\det t_{ij}^{-1}=\det t_{ij}$ 对 $\pm1$ 成立），它确实是 $C^1(M;\Z_2)$ 的元素。由余循环条件 $t_{ij}t_{jk}t_{ki}=I$，我们验证`}</Tx>
        <Eq n="11.136" say={R`行列式的乘积等于乘积的行列式：余循环条件直接给出 $f$ 是上闭链。`}>{R`\delta f(i,j,k)=\det(t_{ij})\det(t_{jk})\det(t_{ki})=\det(t_{ij}t_{jk}t_{ki})=1.`}</Eq>
        <Tx>{R`于是 $f\in Z^1(M,\Z_2)$，它定义 $H^1(M;\Z_2)$ 的一个元素 $[f]$。现在证明这个元素与所选的局部标架无关。设 $\{\bar e_{i\alpha}\}$ 是 $U_i$ 上的另一个标架，$\bar e_{i\alpha}=h_ie_{i\alpha}$，$h_i\in\mathrm{O}(m)$。由 $\bar e_{i\alpha}=\bar t_{ij}\bar e_{j\alpha}$ 得 $\bar t_{ij}=h_it_{ij}h_j^{-1}$。若定义 0 上链 $f_0(i)\equiv\det h_i$，则

$$\tilde f(i,j)=\det(h_it_{ij}h_j^{-1})=\det(h_i)\det(h_j)\det(t_{ij})=\delta f_0(i,j)f(i,j)$$

这里用了 $h_j\in\mathrm{O}(m)$ 时 $\det h_j^{-1}=\det h_j$ 的恒等式。所以 $f$ 只改变一个恰当的量（乘法记号下），仍定义同一个上同调类 $[f]$。这个特殊元素 $w_1(M)\equiv[f]\in H^1(M;\Z_2)$ 称为**第一 Stiefel–Whitney 类**。`}</Tx>
        <Stmt id="T11.6">
          <Proof steps={[
            { claim: R`(⇒) 若 $M$ 可定向，结构群可约化到 $\mathrm{SO}(m)$，$f(i,j)=\det(t_{ij})=1$，于是 $w_1(M)=1$，即 $\Z_2$ 的单位元。`, uses: ["11.135"] },
            { claim: R`(⇐) 若 $w_1(M)$ 平凡，$f$ 是上边缘：$f=\delta f_0$，即 $f(i,j)=f_0(i)f_0(j)$。由于 $f_0(i)=\pm1$，总能对每个 $i$ 选 $h_i\in\mathrm{O}(m)$ 使 $\det(h_i)=f_0(i)$（例如 $h_i=\mathrm{diag}(f_0(i),1,\ldots,1)$）。`, uses: ["11.133"] },
            { claim: R`定义新标架 $\bar e_{i\alpha}=h_ie_{i\alpha}$，新转移函数 $\bar t_{ij}=h_it_{ij}h_j^{-1}$ 满足`, tex: R`\det\bar t_{ij}=f_0(i)f_0(j)\det t_{ij}=f(i,j)\,f(i,j)=1`, why: R`对**所有**重叠的 $(i,j)$ 同时成立，所以 $\{\bar e_{i\alpha}\}$ 是一组定向一致的标架，$M$ 可定向。原书方括号中只演示了单个重叠区：若某对 $(i,j)$ 有 $\det t_{ij}=-1$，可取 $f_0(i)=-1$、$f_0(j)=+1$，则 $\det\bar t_{ij}=-\det t_{ij}=+1$；一般情形正是上面这一行。`, fill: true },
          ]} />
        </Stmt>
        <Tx>{R`定理 11.6 表明第一 Stiefel–Whitney 类是可定向性的障碍。

**第二 Stiefel–Whitney 类。**设 $M$ 是 $m$ 维可定向流形，$TM$ 是其切丛。对转移函数 $t_{ij}\in\mathrm{SO}(m)$，考虑"提升" $\tilde t_{ij}\in\mathrm{SPIN}(m)$，使`}</Tx>
        <Eq n="11.137" say={R`局部提升：每个转移函数都有两个原像 $\pm\tilde t_{ij}$，任选一个，并让反方向取逆。`}>{R`\varphi(\tilde t_{ij})=t_{ij}\qquad\tilde t_{ji}=\tilde t_{ij}^{-1}`}</Eq>
        <Tx>{R`其中 $\varphi:\mathrm{SPIN}(m)\to\mathrm{SO}(m)$ 是 $2:1$ 同态（注意 $t_{ij}$ 可以对应 $\tilde t_{ij}$ 或 $-\tilde t_{ij}$）。这种提升局部总存在（$U_i\cap U_j$ 可缩，覆叠映射的提升存在）。由于

$$\varphi(\tilde t_{ij}\tilde t_{jk}\tilde t_{ki})=t_{ij}t_{jk}t_{ki}=I$$

有 $\tilde t_{ij}\tilde t_{jk}\tilde t_{ki}\in\ker\varphi=\{\pm I\}$。要使 $\tilde t_{ij}$ 定义 $M$ 上的自旋丛，它们必须满足余循环条件`}</Tx>
        <Eq n="11.138" say={R`自旋丛的余循环条件：提升出来的三重乘积必须恰好是 $+I$。`}>{R`\tilde t_{ij}\tilde t_{jk}\tilde t_{ki}=I.`}</Eq>
        <Tx>{R`定义 Čech 2 上链 $f:U_i\cap U_j\cap U_k\to\Z_2$：`}</Tx>
        <Eq n="11.139" keyEq title={R`$w_2$ 的代表`} say={R`第二 Stiefel–Whitney 类的代表：三重重叠上提升的乘积偏离 $+I$ 的符号。`}>{R`\tilde t_{ij}\tilde t_{jk}\tilde t_{ki}=f(i,j,k)I.`}</Eq>
        <Tx>{R`容易看出 $f$ 是对称且闭的。因此 $f$ 定义 $H^2(M,\Z_2)$ 的元素 $w_2(M)$，称为**第二 Stiefel–Whitney 类**。可以证明 $w_2(M)$ 与所选局部标架无关。`}</Tx>
        <Derivation title={R`$f$ 的对称性与闭性（补充）`} collapsed steps={[
          { tex: R`f(j,i,k)I=\tilde t_{ji}\tilde t_{ik}\tilde t_{kj}=(\tilde t_{kj}^{-1}\tilde t_{ik}^{-1}\tilde t_{ji}^{-1})^{-1}=(\tilde t_{jk}\tilde t_{ki}\tilde t_{ij})^{-1}`, why: R`用 $\tilde t_{ji}=\tilde t_{ij}^{-1}$。` },
          { tex: R`\tilde t_{jk}\tilde t_{ki}\tilde t_{ij}=\tilde t_{ij}^{-1}(\tilde t_{ij}\tilde t_{jk}\tilde t_{ki})\tilde t_{ij}=f(i,j,k)I`, why: R`$\pm I$ 在中心里，共轭不变。所以 $f(j,i,k)=f(i,j,k)^{-1}=f(i,j,k)$；循环置换同理，$f$ 全对称。` },
          { tex: R`(\delta f)(i,j,k,l)=f(j,k,l)f(i,k,l)f(i,j,l)f(i,j,k)=1`, why: R`在四重交上把四个三重乘积 $\tilde t\tilde t\tilde t$ 按适当顺序相乘，每个 $\tilde t_{ab}$ 与它的逆 $\tilde t_{ba}$ 恰好各出现一次而相消（$\pm I$ 是中心元，可以随意移动），得 $I$。` },
        ]} />
        <Exercise n="11.5" title={R`$w_2$ 与提升的选择无关`} level="★★"
          hint={R`设新提升为 $\tilde t'_{ij}=f_1(i,j)\tilde t_{ij}$，$f_1(i,j)=\pm1$ 记录是否改号；$f_1(i,j)=f_1(j,i)$（为保持 $\tilde t'_{ji}=\tilde t'^{-1}_{ij}$）。证明 $f(i,j,k)\to f(i,j,k)\,\delta f_1(i,j,k)$。`}
          solution={R`设在某些重叠区把提升换成 $-\tilde t_{ij}$。统一记新提升为 $\tilde t'_{ij}=f_1(i,j)\tilde t_{ij}$，其中 $f_1(i,j)\in\{\pm1\}$。为了仍满足 \eqref{11.137} 的 $\tilde t'_{ji}=\tilde t'^{-1}_{ij}$，需 $f_1(j,i)\tilde t_{ji}=f_1(i,j)^{-1}\tilde t_{ij}^{-1}$，即 $f_1(j,i)=f_1(i,j)$：$f_1$ 是 Čech 1 上链。新的 2 上链为

$$f'(i,j,k)I=\tilde t'_{ij}\tilde t'_{jk}\tilde t'_{ki}=f_1(i,j)f_1(j,k)f_1(k,i)\,\tilde t_{ij}\tilde t_{jk}\tilde t_{ki}=f_1(j,k)f_1(i,k)f_1(i,j)\,f(i,j,k)I$$

（$\pm1$ 是数，可以提到前面；$f_1(k,i)=f_1(i,k)$。）由 \eqref{11.130}，$f_1(j,k)f_1(i,k)f_1(i,j)=(\delta f_1)(i,j,k)$。所以 $f'=f\cdot\delta f_1$，二者只差一个上边缘，$[f']=[f]\in H^2(M;\Z_2)$：$w_2$ 与提升的选择无关。（原书提示中的"$f(i,j.k)$"是 $f(i,j,k)$ 的笔误。）`}>
          {R`设对 $t_{ij}$ 改取另一个提升 $-\tilde t_{ij}$。证明 $f$ 在这一改变下只改变一个恰当的量，因此 $[f]$ 与提升的选择无关。［提示：证明 $f(i,j,k)\to f(i,j,k)\delta f_1(i,j,k)$，其中 $f_1(i,j)$ 记 $\pm\tilde t_{ij}$ 的符号。］`}
        </Exercise>
        <Stmt id="T11.7">
          <Proof steps={[
            { claim: R`(⇒) 若 $M$ 上存在自旋丛，就有一组转移函数 $\tilde t_{ij}$，在任何重叠的 $U_i,U_j,U_k$ 上满足 $\tilde t_{ij}\tilde t_{jk}\tilde t_{ki}=I$，即 $f\equiv1$，所以 $w_2(M)$ 平凡。`, uses: ["11.138", "11.139"] },
            { claim: R`(⇐) 若 $w_2(M)$ 平凡，即 $f$ 是上边缘：`, tex: R`f(i,j,k)=\delta f_1(i,j,k)=f_1(j,k)f_1(i,k)f_1(i,j)`, why: R`$f_1$ 是某个 1 上链。原书此处把第三个因子印作 $f_1(k,i)$，应为 $f_1(i,j)$（按 \eqref{11.130}；原写法由对称性 $f_1(k,i)=f_1(i,k)$ 给出 $f_1(j,k)$，不是上边缘）。`, uses: ["11.130"] },
            { claim: R`取习题 11.5 那样的改号提升 $\tilde t'_{ij}\equiv\tilde t_{ij}f_1(i,j)$（它仍满足 $\varphi(\tilde t'_{ij})=t_{ij}$、$\tilde t'_{ji}=\tilde t'^{-1}_{ij}$），则`, tex: R`\tilde t'_{ij}\tilde t'_{jk}\tilde t'_{ki}=f(i,j,k)\,\delta f_1(i,j,k)\,I=[\delta f_1(i,j,k)]^2I=I`, why: R`由习题 11.5 的计算；$(\pm1)^2=1$。`, fill: true },
            { claim: R`所以 $\{\tilde t'_{ij}\}$ 满足 \eqref{11.129}，定义 $M$ 上的自旋丛。`, uses: ["11.129"] },
          ]} />
        </Stmt>
        <Tx>{R`我们列出一些有用的结果：`}</Tx>
        <Eq n="11.140" keyEq title={R`$\CP^m$ 的 Stiefel–Whitney 类`} say={R`复射影空间都可定向；$m$ 为奇数时是自旋流形，$m$ 为偶数时 $w_2$ 是生成元——$\CP^2$ 上没有自旋结构。`}>{R`\text{(a)}\qquad w_1(\CP^m)=1\qquad w_2(\CP^m)=\begin{cases}1&m\text{ 奇数}\\x&m\text{ 偶数}\end{cases}`}</Eq>
        <Tx>{R`$x$ 是 $H^2(\CP^m;\Z_2)$ 的生成元。（复流形都可定向，所以 $w_1=1$；$w_2(\CP^m)=(m+1)x\bmod2$，因为 $T\CP^m\oplus\C\cong(m+1)L^*$，$c_1(T\CP^m)=(m+1)$ 倍生成元，而 $w_2$ 是 $c_1$ 模 2 的约化。）`}</Tx>
        <Eq n="11.141" say={R`所有球面都可定向、都有自旋结构。`}>{R`\text{(b)}\qquad w_1(S^m)=w_2(S^m)=1`}</Eq>
        <Eq n="11.142" say={R`所有可定向闭曲面（亏格 $g$ 的 Riemann 面）都可定向、都有自旋结构。`}>{R`\text{(c)}\qquad w_1(\Sigma_g)=w_2(\Sigma_g)=1`}</Eq>
        <Tx>{R`$\Sigma_g$ 是亏格 $g$ 的 Riemann 面。（(b)：$m\ge3$ 时 $H^1(S^m;\Z_2)=H^2(S^m;\Z_2)=0$，自动平凡；$S^2=\CP^1$ 由 (a) 的 $m=1$ 得出；$S^1$ 可定向且 $H^2=0$。(c)：二维可定向流形的 $w_2$ 等于 Euler 示性数模 2，$\chi(\Sigma_g)=2-2g$ 为偶数。）`}</Tx>
        <Box kind="physics" title="与陈类、Euler 类的联系">{R`对复向量丛，$w_{2j}$ 是 $c_j$ 的模 2 约化、$w_{\rm odd}=0$；对定向的 $2l$ 维实丛，最高的 $w_{2l}$ 是 Euler 类的模 2 约化。所以 Stiefel–Whitney 类是"离散版"的陈类与 Euler 类：曲率给出的实系数类看不见的 $\pm1$ 信息，由它们记录。第 12 章将看到，$w_2=0$ 正是在 $M$ 上定义 Dirac 算子、从而谈论 $\int\hat A$ 的前提。`}</Box>
      </Sub>
    </Sec>);
}
