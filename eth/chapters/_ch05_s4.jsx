// 第 5 页：§5.4 让一个系数在每个特殊点消失——定理 5.1 的证明。
import { Sec, Tx, Eq, Box, Proof, Erratum } from "@kit";
import { VerifyT51 } from "./_ch05_demos.jsx";
const R = String.raw;

export function Sec54() {
  return (
    <Sec n="5.4" title="Make one coefficient disappear at each special point" zh="让一个系数在每个特殊点消失"
      gist={R`$\widetilde J(t)=p(\sum_j(1-t/j)X_j)$，$E=X^{\otimes\ell}-\widetilde J(0)$，$J=\widetilde J+E$。$t=i$ 时 $X_i$ 的系数为零 ⇒ $K_i=I_2\otimes p(S_i)$ 为 $i$-好；$H_\ell EH_\ell$ 为对角阵，秩 $\le2^\ell/\ell^{100}$。`}
      why={R`把 §5.3 的单变量多项式"提升"成矩阵多项式，并借 §5.1 精确构造里的系数 $1-t/j$ 让第 $i$ 个坐标在 $t=i$ 处退出。`}
      gives={["5.7", "5.8"]}>
      <Tx>{R`现在把三件工具拼起来。定义`}</Tx>
      <Eq n="5.7" keyEq title="$J(t)$ 的定义" say={R`多项式部分 $\widetilde J(t)$ 是把 $p$ 代入 $X_j$ 的加权和，第 $j$ 个权重 $1-t/j$ 在 $t=j$ 时归零；$E$ 是 $t=0$ 处与目标 $X^{\otimes\ell}$ 的差，与 $t$ 无关；$J(t)$ 把它加回来，使 $J(0)$ 恰为 $X^{\otimes\ell}$。`}>{R`\widetilde J(t)=p\Big(\sum_{j=1}^{\ell}(1-t/j)X_j\Big),\qquad E=X^{\otimes\ell}-\widetilde J(0),\qquad J(t)=\widetilde J(t)+E.`}</Eq>
      <Tx>{R`这正是 §1 的公式 \eqref{1.3}：$J(t)=X^{\otimes\ell}+p\big(\sum_j(1-t/j)X_j\big)-p\big(\sum_jX_j\big)$。由定义立即得 $\deg J(t)\le d$ 与 $J(0)=X^{\otimes\ell}$。

**特殊点。** 在 $t=i$ 处，$X_i$ 的系数 $1-i/i$ 消失。其余每个 $X_j$ 在第 $i$ 个张量因子上都是恒等，它们的任何多项式也是。因此`}</Tx>
      <Eq say={R`特殊点 $t=i$ 处的多项式部分：和式里不再有 $X_i$，只剩其余坐标的加权翻转（$j<i$ 时权重为负，$j>i$ 时在 0 与 1 之间）。`}>{R`K_i=\widetilde J(i)=p\Big(\sum_{j\ne i}(1-i/j)X_j\Big)`}</Eq>
      <Tx>{R`是 $i$-好的。更明确地说，把第 $i$ 个张量因子移到最前之后，$p$ 里面的矩阵是 $I_2\otimes S_i$（$S_i=\sum_{j\ne i}(1-i/j)X'_j$，$X'_j$ 是 $X_j$ 去掉第 $i$ 个因子后在 $\ell-1$ 位上的版本），所以`}</Tx>
      <Eq say={R`把第 $i$ 个因子放在最前，$K_i$ 是“第 $i$ 位恒等”与“其余位上的 $p(S_i)$”的张量积——正是 \sref{D4.2} 的 $I_2\otimes B$ 形式。`}>{R`K_i=I_2\otimes p(S_i).`}</Eq>
      <Tx>{R`**$E$ 的秩。** 用 $H_\ell$ 共轭：由 \eqref{5.1}、\eqref{5.2}（$H_\ell^2=I$，两式可以反过来读），`}</Tx>
      <Eq n="5.8" keyEq title="E 换基后是对角阵" say={R`经 Hadamard 换基，修正矩阵 $E$ 变成奇偶函数的对角阵减去 $p(\sum_jx_j)$ 的对角阵：每个输入 $x$ 上的对角元就是 $\chi(x)$ 与 $p(\sum_jx_j)$ 的差。`}>{R`H_\ell EH_\ell=Z^{\otimes\ell}-p\Big(\sum_jZ_j\Big).`}</Eq>
      <Tx>{R`这是一个对角阵，对每个 $x\in\{-1,1\}^\ell$ 有一个对角元`}</Tx>
      <Eq say={R`对角元 = 奇偶 $-$ $p$(坐标和)：在插值窗口内为 0，只有极端层上的输入可能非零。`}>{R`x_1\cdots x_\ell-p(x_1+\cdots+x_\ell)`}</Eq>
      <Tx>{R`由 \eqref{5.6}，其中至多`}</Tx>
      <Eq say={R`非零对角元个数的上界，即 $E$ 的秩的上界：全部 $2^\ell$ 个输入中只有 $\ell^{-100}$ 的比例。`}>{R`2^\ell/\ell^{100}`}</Eq>
      <Tx>{R`个非零。这就证明了 \sref{T5.1}。多项式矩阵可以直接按 \eqref{5.7} 用有理矩阵运算得到；因子 $1/\sqrt2$ 只出现在秩界的证明里，不出现在算法里。`}</Tx>
      <Proof title="定理 5.1 的完整证明" source="原文 p.12 §5.4；第 1、4、7、9、10 步为本站补全" steps={[
        { claim: R`$\deg J(t)\le d$：矩阵 $\sum_j(1-t/j)X_j=\big(\sum_jX_j\big)-t\big(\sum_jX_j/j\big)$ 的每个元素是 $t$ 的一次式；$p$ 的次数 $\le d$，所以 $\widetilde J(t)$ 的每个元素是次数 $\le d$ 的多项式；$E$ 是常数矩阵。`, uses: ["5.7"], fill: true },
        { claim: R`$J(0)=\widetilde J(0)+E=X^{\otimes\ell}$。`, uses: ["5.7"] },
        { claim: R`$t=i$ 时 $X_i$ 的系数 $1-i/i=0$，故 $K_i:=\widetilde J(i)=p\big(\sum_{j\ne i}(1-i/j)X_j\big)$，且 $J(i)=K_i+E$——$E$ 与 $i$ 无关。` },
        { claim: R`$K_i$ 是 $i$-好的：把第 $i$ 个因子移到最前，每个 $X_j$（$j\ne i$）变成 $I_2\otimes X'_j$；线性组合给出 $I_2\otimes S_i$；由混合乘积律 $(I_2\otimes S)^m=I_2\otimes S^m$，于是 $p(I_2\otimes S_i)=I_2\otimes p(S_i)$。`, why: R`这正是 \eqref{4.8} 的形式，$B=p(S_i)$。`, uses: ["D4.2", "4.8"], fill: true },
        { claim: R`$H_\ell EH_\ell=H_\ell X^{\otimes\ell}H_\ell-H_\ell\,p\big(\sum_jX_j\big)H_\ell=Z^{\otimes\ell}-p\big(\sum_jZ_j\big)$，即 \eqref{5.8}。`, why: R`在 \eqref{5.1}、\eqref{5.2} 两边再用 $H_\ell$ 共轭（$H_\ell^2=I$）得 $H_\ell X^{\otimes\ell}H_\ell=Z^{\otimes\ell}$、$H_\ell p(\sum X_j)H_\ell=p(\sum Z_j)$。`, uses: ["5.1", "5.2"] },
        { claim: R`它是对角阵 $D_\chi-D_h$，其中 $h(x)=p(x_1+\cdots+x_\ell)$：$Z^{\otimes\ell}[b,b]=\prod_j(-1)^{b_j}=\chi(x)$，$p(\sum_jZ_j)[b,b]=p(\sum_jx_j)$（$x_j=(-1)^{b_j}$）。`, uses: ["F:hadamard"] },
        { claim: R`由 \eqref{5.4}，$\rank E=\rank(H_\ell EH_\ell)=|\{x:p(\sum_jx_j)\ne\chi(x)\}|$——**等号**，不只是上界。`, uses: ["5.4"], fill: true },
        { claim: R`由 \eqref{5.6}，这个集合至多占 $\{-1,1\}^\ell$ 的 $\ell^{-100}$，故 $\rank E\le2^\ell/\ell^{100}$。`, uses: ["F:parity", "5.6"] },
        { claim: R`构造的代价：$\widetilde J(t)$ 用 Horner 法 $P\leftarrow P\cdot M(t)+a_kI$ 计算，$M(t)$ 的元素是 $t$ 的一次式，共 $d$ 次 $2^\ell\times2^\ell$ 的多项式矩阵乘法，系数是有理数、比特长度多项式（来自 $p$ 的系数与 $1/j$）。总计 $\poly(2^\ell)$。`, fill: true },
        { claim: R`把指数 100 换成任意常数 $A$：只需把 $d$ 中的常数改成 $c_A=\sqrt{8(A+1)\ln2}$（或任何更大的数），\eqref{5.6} 的右端变为 $\ell^{-A}$，其余步骤不变。`, why: R`见 §5.3 的注记。`, fill: true },
      ]} />
      <Box kind="note" title={R`$E$ 承担了 §5.1 的障碍：$E[x,\bar x]=1$`}>{R`当 $d<\ell$ 时，$\widetilde J(t)$ 的 $(x,\bar x)$ 元素**恒为零**：$p(\sum_jc_jX_j)$ 展开后（利用 $X_j^2=I$）是单项式 $\prod_{j\in S}X_j$ 的线性组合，而 $(x,\bar x)$ 元素只来自 $S=[\ell]$ 这一项，它需要至少 $\ell$ 次乘法，$\deg p\le d<\ell$ 时不会出现。于是 $E[x,\bar x]=X^{\otimes\ell}[x,\bar x]-0=1$：§5.1 中迫使次数 $\ge\ell$ 的那 $2^\ell$ 个元素，全部被同一个低秩矩阵 $E$ 吸收了。（类似地，若 $x,y$ 恰在集合 $S$ 上不同，则 $\widetilde J(t)[x,y]$ 含因子 $\prod_{j\in S}(1-t/j)$，自动在 $t\in S$ 处为零——这是 $K_i$ 为 $i$-好的逐元素版本。）`}</Box>
      <Box kind="warning" title={R`各 $K_i$ 互不相同，只有 $E$ 是公共的`}>{R`$K_i=I_2\otimes p(S_i)$ 随 $i$ 变化：$S_i$ 中 $j<i$ 的系数 $1-i/j$ 为负，$j>i$ 的系数在 $(0,1)$ 之间。定理只要求**每个** $K_i$ 各自是 $i$-好的（不同的 $i$ 对应外层不同的分块方式），而把"非 $i$-好"的部分统一放进与 $i$ 无关的 $E$。这一点使 §6 的 $E_{\rm out}=L(I_C\otimes E)R'$ 在所有特殊点相同。另外，$E$ 只是**秩**小，它的元素并不小。`}</Box>
      <Erratum kind="note" title="核对结论：§5 未发现笔误" loc="pp.10–12">{R`本站逐式核对了 \eqref{5.1}–\eqref{5.8} 及 §5.1、\sref{T5.1}、§5.4 中的全部不编号公式（与页面图像逐字符对照），并在下方示例中用精确有理数对 $\ell\le6$ 的全部 $(\ell,d)$ 组合验证了：$J(0)=X^{\otimes\ell}$、每个 $K_i$ 满足 \eqref{4.8}、$H_\ell EH_\ell$ 为对角阵且对角元为 $\chi(x)-p(\sum x_j)$、$\rank E$ **恰好**等于不一致的输入数。原文略写之处（Hoeffding 常数、窗口覆盖 $|k-\ell/2|\le d/4$、"充分大 $\ell$" 的含义、\eqref{5.3} 中移动因子与 $H_\ell$ 的可交换性）均已在上面补全，没有发现需要修改的指标或常数。`}</Erratum>
      <VerifyT51 />
    </Sec>);
}
