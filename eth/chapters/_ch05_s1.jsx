// 第 5 页：§5 引言、§5.1（精确变形的次数障碍）与定理 5.1 的陈述。
import { Sec, Tx, Eq, Box, Stmt, Proof, Erratum } from "@kit";
import { ExactVsApprox } from "./_ch05_demos.jsx";
const R = String.raw;

export function Sec5() {
  return (
    <Sec n="5" title="The matrix polynomial" zh="矩阵多项式"
      gist={R`在单个布尔立方体 $\{0,1\}^\ell$ 上构造局部矩阵多项式 $J(t)$：$J(0)=X^{\otimes\ell}$，每个特殊点处"$i$-好 + 公共低秩"，次数 $O(\sqrt{\ell\log\ell})$。`}
      why={R`§4 把整个问题化归为这个 $2^\ell\times2^\ell$ 的局部构造：只要有了 $J(t)$，$A(t)=L(I_C\otimes J(t))R'$ 就自动满足 §3 的全部要求。`}
      gives={["5.7", "5.8"]}>
      <Tx>{R`从这一节开始，输入矩阵 $A$ 完全退场。我们只在**一份**布尔立方体 $\{0,1\}^\ell$ 上工作：行和列都以 $\{0,1\}^\ell$ 为指标，矩阵是 $2^\ell\times2^\ell$ 的。回忆 §4 的结论：$A=L\cJ R'$，$\cJ=I_C\otimes X^{\otimes\ell}$；若把中间的 $X^{\otimes\ell}$ 换成一个 $i$-好的矩阵（\sref{D4.2}），外层矩阵就按第 $i$ 个符号分块（\sref{L4.3}）；若换成"$i$-好 + 低秩"，低秩部分在外层仍是低秩的（\sref{F:survive}）。

所以本节要回答的问题完全是局部的、纯代数的：**能否用一个低次的矩阵多项式 $J(t)$，从 $X^{\otimes\ell}$ 出发，在每个 $t=i$ 处都变成"$i$-好 + 同一个低秩矩阵"？** 次数 $d$ 越小，§3 中每个特殊点所需的导数阶数 $h=\lfloor nd/\ell\rfloor+1$ 就越小；全文的节省全靠 $d/\ell\ll1$。`}</Tx>
    </Sec>);
}

export function Sec51() {
  return (
    <Sec n="5.1" title="Why an exact low-degree deformation is impossible" zh="为什么精确的低次变形不可能"
      gist={R`精确构造 $\bigotimes_j((1-t/j)X+(t/j)I_2)$ 是 $\ell$ 次的；而任何精确的 $i$-好变形都至少 $\ell$ 次。允许一个低秩修正才能降次——这就是 \sref{T5.1}。`}
      why={R`先弄清障碍在哪里，才知道"低秩修正"要承担什么：它恰好要吸收那些 $(x,\bar x)$ 元素。`}
      gives={[]}>
      <Tx>{R`**先看一个能用、但太贵的构造。** 我们想要一族矩阵：$t=0$ 时每个坐标都被翻转，$t=i$ 时第 $i$ 个坐标不动。最直接的办法是逐坐标地在"翻转" $X$ 与"不动" $I_2$ 之间线性过渡，并让第 $j$ 个坐标恰好在 $t=j$ 时到达 $I_2$：`}</Tx>
      <Eq say={R`精确构造：第 $j$ 个张量因子从 $X$（$t=0$）线性滑向 $I_2$（$t=j$）；$t=i$ 时第 $i$ 个因子恰为 $I_2$，所以整体是 $i$-好的，但它是 $\ell$ 个一次因子的张量积，次数为 $\ell$。`}>{R`\bigotimes_{j=1}^{\ell}\big((1-t/j)X+(t/j)I_2\big).`}</Eq>
      <Tx>{R`$t=0$ 时它就是 $X^{\otimes\ell}$；$t=i$ 时第 $i$ 个因子 $(1-i/i)X+(i/i)I_2=I_2$，所以它在第 $i$ 个坐标上是恒等，正是 $i$-好的。可惜它的每个元素都是 $\ell$ 个一次式的乘积，次数为 $\ell$。代入 §3：$d=\ell$ 时 $h=\lfloor nd/\ell\rfloor+1=n+1$——每个插值点要求约 $n$ 阶导数，和直接算积和式没有区别。

**问题不在于这个构造笨，而在于"精确"本身。**`}</Tx>
      <Proof title={R`精确的 $i$-好变形必须至少 $\ell$ 次`} source="原文 p.10，§5.1 第二段" steps={[
        { claim: R`设 $J(t)$ 是任意矩阵多项式，满足 $J(0)=X^{\otimes\ell}$，且对每个 $i=1,\dots,\ell$，$J(i)$ **精确地**是 $i$-好的（不允许误差）。固定一个 $x\in\{0,1\}^\ell$，记 $\bar x$ 为逐位取反，考察单个元素 $f(t):=J(t)[x,\bar x]$——它是 $t$ 的一元多项式，次数 $\le\deg J$。`, why: R`矩阵多项式的每个元素都是普通多项式。` },
        { claim: R`$f(0)=X^{\otimes\ell}[x,\bar x]=1$。`, tex: R`X^{\otimes\ell}[x,\bar x]=\prod_{j=1}^{\ell}X[x_j,1-x_j]=1.`, why: R`$X^{\otimes\ell}$ 的元素是各因子元素之积；$X$ 的非对角元为 1。`, fill: true },
        { claim: R`对每个 $i\in[\ell]$，$f(i)=0$。`, why: R`$x$ 与 $\bar x$ 的第 $i$ 位不同；由 \eqref{4.8}，$i$-好矩阵满足 $K[x,y]=\one\{x_i=y_i\}B[x_{-i},y_{-i}]$，所以该元素为 0。`, uses: ["D4.2", "4.8"] },
        { claim: R`$f$ 不恒为零（$f(0)=1$）却有 $\ell$ 个不同的根 $1,\dots,\ell$，所以 $\deg f\ge\ell$，从而 $\deg J\ge\ell$。`, why: R`非零的一元多项式根的个数不超过其次数。` },
        { claim: R`这个下界是紧的：对上面的精确构造，$f(t)=\prod_{j=1}^\ell(1-t/j)$，恰好 $\ell$ 次，根正是 $1,\dots,\ell$。`, tex: R`\Big[\bigotimes_{j}\big((1-t/j)X+(t/j)I_2\big)\Big][x,\bar x]=\prod_{j=1}^{\ell}(1-t/j).`, why: R`每个因子的非对角元是 $1-t/j$。`, fill: true },
      ]} />
      <Box kind="key" title="低秩修正要承担什么">{R`障碍集中在 $2^\ell$ 个 $(x,\bar x)$ 元素上（每行一个）。如果允许在每个特殊点加上**同一个**矩阵 $E$，那么这些元素在 $t=i$ 处只需等于 $E[x,\bar x]$ 而不必为 0。\sref{T5.1} 的构造里，当 $d<\ell$ 时 $\widetilde J(t)$ 的这些元素恒为零，$E[x,\bar x]=1$——$E$ 把障碍整个接了过去（见 §5.4 的注记与下方示例）。代价是 $E$ 必须是低秩的；本节的全部技巧都在于让它的秩只有 $2^\ell/\ell^{100}$。`}</Box>
      <Tx>{R`下面的定理是全文的代数核心。它说：只要允许一个公共的低秩修正，次数就能从 $\ell$ 降到 $O(\sqrt{\ell\log\ell})$。`}</Tx>
      <Stmt id="T5.1">
        <Eq say={R`次数界：$J(t)$ 的次数只是 $\sqrt{\ell\log\ell}$ 量级，远小于精确构造所需的 $\ell$。`}>{R`d=O(\sqrt{\ell\log\ell})`}</Eq>
        <Eq say={R`两组插值条件：$t=0$ 时恰为全翻转 $X^{\otimes\ell}$；每个特殊点 $t=i$ 处是 $i$-好矩阵 $K_i$ 加上与 $i$ 无关的同一个 $E$。`}>{R`J(0)=X^{\otimes\ell},\qquad J(i)=K_i+E\quad(i=1,\dots,\ell),`}</Eq>
        <Eq say={R`公共修正 $E$ 的秩只占全维数 $2^\ell$ 的 $\ell^{-100}$。`}>{R`\rank(E)\le\frac{2^\ell}{\ell^{100}}.`}</Eq>
        <Tx>{R`构造在 $2^\ell$ 的多项式时间内完成，所用有理系数的比特长度是多项式的。指数 100 可以换成任意固定常数，只改变次数界里的常数。`}</Tx>
        <Proof title="证明路线（细节分布在 §5.2–§5.4）" collapsed steps={[
          { claim: R`取次数 $\le d$ 的有理多项式 $p$，使 $p(\sum_jx_j)$ 在除 $\ell^{-100}$ 比例之外的全部 $x\in\{-1,1\}^\ell$ 上**精确**等于奇偶 $x_1\cdots x_\ell$。`, uses: ["F:parity", "5.5", "5.6"] },
          { claim: R`令 $J(t)=p\big(\sum_j(1-t/j)X_j\big)+E$，$E=X^{\otimes\ell}-p(\sum_jX_j)$。则 $\deg J\le d$、$J(0)=X^{\otimes\ell}$。`, uses: ["5.7"] },
          { claim: R`$t=i$ 时 $X_i$ 的系数为零，$K_i=I_2\otimes p(S_i)$ 是 $i$-好的。`, uses: ["D4.2"] },
          { claim: R`Hadamard 换基把 $E$ 变成对角阵 $Z^{\otimes\ell}-p(\sum_jZ_j)$，其秩 = $p(\sum x_j)\ne\chi(x)$ 的输入个数 $\le2^\ell/\ell^{100}$。`, uses: ["F:hadamard", "5.8"] },
        ]} />
      </Stmt>
      <Erratum kind="note" title={R`"充分大的 $\ell$"具体指什么`} loc="p.10 定理 5.1；p.11 (5.5)">{R`"充分大"只用在一处：要在 $\{0,1,\dots,\ell\}$ 内取 $d+1$ 个连续整数 $k$ 作插值点，需要 $d\le\ell$。按 $d=\lceil100\sqrt{\ell\log_2\ell}\rceil$，这要求 $\ell\ge174096$（数值求得）；若把常数 100 换成 24（见 §5.3 注记，已足够得到 $\ell^{-100}$），门槛降为 $\ell\ge7404$。

另一方面，当 $d\ge\ell$ 时定理同样成立而且更容易：直接在全部 $\ell+1$ 个 $k$ 上插值，$p(\sum x_j)$ 处处等于奇偶，$E=0$，次数 $\le\ell\le d$。所以"充分大"只是为了让 $d=O(\sqrt{\ell\log\ell})$ 这个界有实际意义，不影响结论本身。`}</Erratum>
      <ExactVsApprox />
    </Sec>);
}
