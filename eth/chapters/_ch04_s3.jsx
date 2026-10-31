// §4.3 中间坐标是布尔立方体的拷贝（式 4.6–4.7）与 §4.4 i-好性（定义 4.2、引理 4.3、式 4.8–4.9），原文 pp.9–10
import { Sec, Tx, Eq, Box, Stmt, Proof, Erratum } from "@kit";
import { NiceChecker, WordsDemo } from "./_ch04_run.jsx";

const R = String.raw;

export function Sub43() {
  return (
    <Sec n="4.3" title="The intermediate coordinates are copies of a Boolean cube" zh="中间坐标是布尔立方体的拷贝"
      gist={R`逐坐标不同的词对恰为 $|C|$ 个布尔立方体的并，交换两个词 = 翻转全部方向位 = $X^{\otimes\ell}$，故 $A=L(I_C\otimes X^{\otimes\ell})R'$。`}
      why={R`把对 $n\times n$ 矩阵的变形，化归为对一个与输入无关的 $2^\ell\times2^\ell$ 矩阵的变形。`}
      gives={["4.6","4.7"]}>
      <Tx>{R`**中间坐标集合。**照搬 §4.1 的做法，只是把"颜色对"换成"词对"。由性质 (iii)，非零元的标号对总是逐坐标不同的，所以中间坐标取为所有**逐坐标不同**的词对：`}</Tx>
      <Eq say={R`中间坐标集 $\Omega$：所有在每个位置上两个符号都不同的有序词对；每个位置有 $q(q-1)$ 种选择，共 $(q(q-1))^\ell$ 个。`}>{R`\Omega=\{(a,b)\in[q]^\ell\times[q]^\ell:\ a_i\ne b_i\ \text{for every } i\},\qquad M=|\Omega|=(q(q-1))^\ell.`}</Eq>
      <Tx>{R`和以前一样，**每个可能的**标号对都占一个中间坐标（包括没被任何非零元用到的），并令`}</Tx>
      <Eq say={R`非零元 $A_{uv}$ 在中间坐标 $(\alpha(u),\beta(v))$ 处：$L$ 存数值，$R$ 存列指示 1。其余元素都为零。`}>{R`L[u,(\alpha(u),\beta(v))]=A_{uv},\qquad R[(\alpha(u),\beta(v)),v]=1\qquad(A_{uv}\ne0).`}</Eq>
      <Tx>{R`其余元素都是零。由性质 (ii)，有序标号对互不相同，每个中间坐标至多承载一个非零元，所以 $A=LR$（同 §4.1 的 First 一步）。`}</Tx>

      <Tx>{R`**无序对 + 方向位。**$\Omega$ 中的一个元素 $(a,b)$ 确定了 $\ell$ 个无序对`}</Tx>
      <Eq say={R`把词对 $(a,b)$ 在每个位置上“忘掉顺序”，得到 $\ell$ 个无序符号对。`}>{R`\{a_1,b_1\},\ \dots,\ \{a_\ell,b_\ell\}`}</Eq>
      <Tx>{R`以及每个位置上的一个**方向位**（orientation bit）：把每个无序对按递增顺序写，方向位 0 表示 $(a_i,b_i)$ 就是递增顺序，1 表示反过来。于是`}</Tx>
      <Eq n="4.6" keyEq title="中间坐标是立方体的并" say={R`中间坐标 = 选定每个位置的无序对（$C$ 中的一个元素，确定一个立方体）+ 选定 $\ell$ 个方向位（立方体中的一个顶点）；共有 $\binom q2^\ell$ 个立方体，每个 $2^\ell$ 个顶点。`}>{R`\Omega\cong C\times\{0,1\}^\ell,\qquad C=\binom{[q]}{2}^{\ell},\qquad |C|=\binom q2^{\ell}.`}</Eq>
      <Tx>{R`检验计数：$|C|\cdot2^\ell=\big(\tfrac{q(q-1)}2\big)^\ell2^\ell=(q(q-1))^\ell=M$。固定无序对就固定了一个布尔立方体 $\{0,1\}^\ell$。**交换两个词** $(a,b)\mapsto(b,a)$ 不改变任何无序对——留在同一个立方体里——只把每个方向位取反：$x\mapsto\bar x$。`}</Tx>
      <Box kind="example" title={R`$\ell=2$、$q=3$ 的一个立方体`}>{R`取无序对 $\{1,2\}$（位置 1）与 $\{1,3\}$（位置 2）。这个立方体的四个顶点是：$x=00\leftrightarrow(a,b)=(11,23)$，$x=01\leftrightarrow(13,21)$，$x=10\leftrightarrow(21,13)$，$x=11\leftrightarrow(23,11)$。交换两个词：$(11,23)\leftrightarrow(23,11)$，即 $00\leftrightarrow11$；$(13,21)\leftrightarrow(21,13)$，即 $01\leftrightarrow10$。正是 $X\otimes X$ 的作用。`}</Box>

      <Tx>{R`**中间的交叉矩阵。**于是"把名字反过来"在每个立方体上都是同一个矩阵 $X^{\otimes\ell}$（它把 $x$ 送到 $\bar x$）。令`}</Tx>
      <Eq say={R`$\cJ$：在每个立方体上放一份 $X^{\otimes\ell}$（翻转全部方向位 = 交换两个词）；$R'=\cJ R$ 把 $R$ 的每一行搬到“反向词对”的位置。`}>{R`\cJ=I_C\otimes X^{\otimes\ell},\qquad R'=\cJ R.`}</Eq>
      <Tx>{R`记号 $I_C\otimes K$ 的意思就是分块对角阵：每个立方体一份**相同**的 $K$。由于 $(X^{\otimes\ell})^2=(X^2)^{\otimes\ell}=I$，有 $\cJ^2=I$，与 §4.1 完全相同的一串等式给出`}</Tx>
      <Stmt id="F:factor">
        <Eq n="4.7" keyEq title="经由布尔立方体的分解" say={R`稀疏矩阵 $A$ 被写成“输入相关的 $L$、$R'$ 夹着与输入无关的 $I_C\otimes X^{\otimes\ell}$”。之后只需变形中间的 $2^\ell\times2^\ell$ 矩阵 $X^{\otimes\ell}$。`}>{R`\boxed{A=LR=LIR=L\cJ R'.}`}</Eq>
        <Proof title="逐步核对" steps={[
          { claim: R`$LR=A$。`, why: R`$(LR)_{uv}=\sum_\omega L[u,\omega]R[\omega,v]$；$R[\omega,v]\ne0$ 要求 $\omega=(\alpha(u'),\beta(v))$，$L[u,\omega]\ne0$ 要求 $\omega=(\alpha(u),\beta(v'))$；由 (ii) 两者是同一个非零元，即 $u'=u,v'=v$，得 $A_{uv}$。`, uses: ["L4.1"], fill: true },
          { claim: R`$\cJ^2=I$，所以 $L\cJ R'=L\cJ^2R=LR$。`, why: R`$X^2=I_2$，张量积与分块对角都保持乘法。`, fill: true },
          { claim: R`$R'[(\beta(v),\alpha(u)),v]=1$：$R'$ 在**反向**词对处存列指示。`, tex: R`(\cJ R)[(a,b),v]=\sum_{\omega}\cJ[(a,b),\omega]R[\omega,v]=R[(b,a),v]`, why: R`在立方体内 $X^{\otimes\ell}[x,y]=\one\{y=\bar x\}$，而 $\bar x$ 对应交换两个词。`, fill: true },
        ]} />
      </Stmt>
      <Tx>{R`换句话说：$L$ 在有序词对 $(\alpha(u),\beta(v))$ 处存元素值，$R'$ 在反向词对 $(\beta(v),\alpha(u))$ 处存列指示。**所有对输入的依赖都在 $L,R'$ 里；中间的各个块完全相同。**这正是我们想要的分离：接下来只需研究一个 $2^\ell\times2^\ell$ 的中间矩阵，它应当满足什么性质才能让外层分块。`}</Tx>
    </Sec>);
}

export function Sub44() {
  return (
    <Sec n="4.4" title="The useful notion of i-niceness" zh="有用的概念：i-好"
      gist={R`中间矩阵在第 $i$ 个坐标上恒等（$i$-好）⇒ 外层按第 $i$ 个符号分块，块 $\le3n/q$（\sref{L4.3}）；再加秩 $\le\varepsilon2^\ell$ 的误差，外层只多出秩 $\le\varepsilon M$ 的修正。`}
      why={R`这把 §5 的任务精确地表述出来：$J(0)=X^{\otimes\ell}$，$J(i)$ = $i$-好 + 公共低秩误差。`}
      gives={["4.8","4.9"]}>
      <Tx>{R`§4.1 里，把中间的 $X$ 换成 $I_2$ 让外层按颜色分块。现在有 $\ell$ 个坐标，我们希望有 $\ell$ 个不同的容易点：在第 $i$ 个点，只要求中间矩阵在**第 $i$ 个坐标**上像单位阵，其余坐标随它去。这就是下面的定义。`}</Tx>
      <Stmt id="D4.2">
        <Eq n="4.8" keyEq title="i-好的逐元素形式" say={R`$K$ 是 $i$-好的：两个指标在第 $i$ 位不同时元素为零（保持第 $i$ 位），否则元素只取决于其余各位（与第 $i$ 位的取值无关）。`}>{R`K[x,y]=\one\{x_i=y_i\}\,\sym{Bs}{B}[x_{-i},y_{-i}].`}</Eq>
        <Tx>{R`也就是说：$K$ 保持第 $i$ 位，并且它对其余各位的作用与第 $i$ 位的取值无关。把指标按第 $i$ 位分组，得到两个**相同**的对角块：`}</Tx>
        <Eq say={R`按第 $i$ 位分组（先 $x_i=0$ 再 $x_i=1$）后，$i$-好矩阵是两个相同的对角块。`}>{R`K=\begin{pmatrix}\sym{Bs}{B}&0\\0&\sym{Bs}{B}\end{pmatrix}.`}</Eq>
        <Proof title="等价性与几个例子" steps={[
          { claim: R`**"$I_2\otimes\sym{Bs}{B}$" 与 \eqref{4.8} 等价。**把第 $i$ 个张量因子移到最前，即把指标 $x$ 重排为 $(x_i,x_{-i})$；按张量积的定义`, tex: R`(I_2\otimes \sym{Bs}{B})[(x_i,x_{-i}),(y_i,y_{-i})]=I_2[x_i,y_i]\,\sym{Bs}{B}[x_{-i},y_{-i}]=\one\{x_i=y_i\}\,\sym{Bs}{B}[x_{-i},y_{-i}].`, why: R`$(P\otimes Q)[(x,x'),(y,y')]=P[x,y]Q[x',y']$。`, fill: true },
          { claim: R`**$I$ 对每个 $i$ 都是 $i$-好的**：$I_{2^\ell}=I_2\otimes I_{2^{\ell-1}}$（对任意因子顺序）。`, fill: true },
          { claim: R`**$X^{\otimes\ell}$ 对任何 $i$ 都不是**：它的非零元 $X^{\otimes\ell}[x,\bar x]=1$ 都满足 $x_i\ne\bar x_i$，而 \eqref{4.8} 要求这些位置为零。`, fill: true },
          { claim: R`**$\ell=1$ 时 $i$-好矩阵恰为 $I_2$ 的数量倍**：此时 $x_{-i}$ 是空串，$\sym{Bs}{B}$ 是 $1\times1$ 的数 $c$，$K=cI_2$。所以 §4.1 只能有一个容易点——再次说明为什么要用词。`, fill: true },
          { claim: R`**一个有启发的例子**：只翻转第 $j$ 位的 $X_j=I_2^{\otimes(j-1)}\otimes X\otimes I_2^{\otimes(\ell-j)}$ 对每个 $i\ne j$ 都是 $i$-好的，于是只由 $X_j$（$j\ne i$）组成的任意矩阵多项式也是 $i$-好的（$i$-好矩阵对加法、乘法封闭）。§5 正是利用"在 $t=i$ 时让 $X_i$ 的系数消失"。`, fill: true },
        ]} />
        <Erratum kind="note" loc="p.9 定义 4.2" title={R`字母 $B$ 的两种用法`}>{R`定义 4.2 中的 $\sym{Bs}{B}$ 是 $2^{\ell-1}\times2^{\ell-1}$ 的"其余坐标上的矩阵"，与 \eqref{4.4} 中的分块矩阵 $B=LIR'$、以及 \sref{L4.3} 之后的 $B_i=L(I_C\otimes K_i)R'$ 无关。本页公式中点击符号可看到两种含义（前者在符号表中记为"$i$-好矩阵的因子"）。`}</Erratum>
      </Stmt>

      <NiceChecker />

      <Tx>{R`现在把好性与外层矩阵联系起来。这是本节的中心结论。`}</Tx>
      <Stmt id="L4.3">
        <Proof source="原文 p.10；第 1、4 步的展开为本站补全" steps={[
          { claim: R`**展开 $(u,v)$ 元。**`, tex: R`\big(L(I_C\otimes K)R'\big)_{uv}=\sum_{\omega,\omega'\in\Omega}L[u,\omega]\,(I_C\otimes K)[\omega,\omega']\,R'[\omega',v].`, why: R`$L[u,\omega]\ne0$ 要求 $\omega=(\alpha(u),\beta(v'))$ 且 $A_{uv'}\ne0$；$R'[\omega',v]\ne0$ 要求 $\omega'=(\beta(v),\alpha(u'))$ 且 $A_{u'v}\ne0$（\eqref{4.7} 后的"反向词对"）。`, fill: true },
          { claim: R`**一项可能非零的贡献**用到 $L$ 中的非零元 $A_{uv'}$ 与 $R'$ 中的非零元 $A_{u'v}$，它们的中间标号是`, tex: R`(\alpha(u),\beta(v'))\qquad\text{and}\qquad(\beta(v),\alpha(u')).` },
          { claim: R`**不出立方体 ⇒ 无序对相同。**$I_C\otimes K$ 是分块对角的，每块是一个立方体，所以 $\omega,\omega'$ 在同一个立方体中：在第 $i$ 个位置上，无序对 $\{\alpha(u)_i,\beta(v')_i\}=\{\beta(v)_i,\alpha(u')_i\}$。` },
          { claim: R`**保持方向位 $i$ ⇒ 有序对相同。**$K[x,y]\ne0$ 且 $K$ 是 $i$-好的，故 $x_i=y_i$：两者在第 $i$ 位方向相同，于是有序对也相同：`, tex: R`(\alpha(u)_i,\beta(v')_i)=(\beta(v)_i,\alpha(u')_i).`, why: R`同一个无序对、同一个方向位，只能是同一个有序对。`, uses: ["D4.2"] },
          { claim: R`**比较第一个分量：**`, tex: R`\alpha(u)_i=\beta(v)_i.`, why: R`所以除非行 $u$ 与列 $v$ 的第 $i$ 个符号相同，$(u,v)$ 元为零：行组 $I_{i,a}$ 只与列组 $J_{i,a}$ 相连，即"对应的对角块"。` },
          { claim: R`**块的大小**由 \eqref{4.5}：每块至多 $3n/q$ 行、$3n/q$ 列。`, uses: ["F:balance"] },
        ]} />
      </Stmt>
      <Box kind="note" title={R`证明只用到“保持第 $i$ 位”`}>{R`上面第 4 步只用了"$x_i\ne y_i$ 时 $K[x,y]=0$"，没有用"两个对角块相同"。原文指出：采用更强的"在一个因子上是恒等"的定义，是因为它恰好是 §5 的多项式构造自然产生的形式。在上面的检查器与下面的示例里选"只保持第 $i$ 位"，可以看到它不是 $i$-好的，却照样让外层分块。`}</Box>

      <WordsDemo />

      <Tx>{R`**低秩在分解中保持。**§5 造不出精确 $i$-好的低次多项式（精确好性要求次数 $\ge\ell$）；它造出的是"$i$-好 + 一个公共的低秩误差"。好在误差穿过分解后仍是低秩的：`}</Tx>
      <Stmt id="F:survive">
        <Eq n="4.9" keyEq title="低秩在分解中保持" say={R`中间矩阵 = $i$-好部分 + 秩 $\le\varepsilon2^\ell$ 的误差 ⇒ 外层 = 按第 $i$ 个符号分块的 $B_i$ + 秩 $\le\varepsilon M$ 的修正；有用的结构全在 $B_i$，修正只是低秩。`}>{R`L(I_C\otimes K)R'=B_i+E_{\rm out},\qquad E_{\rm out}=L(I_C\otimes E)R',\qquad \rank(E_{\rm out})\le\varepsilon M.`}</Eq>
        <Proof steps={[
          { claim: R`**线性拆分**：$I_C\otimes(K_i+E)=I_C\otimes K_i+I_C\otimes E$，故外层 $=B_i+E_{\rm out}$，其中 $B_i:=L(I_C\otimes K_i)R'$ 由 \sref{L4.3} 按第 $i$ 个符号分块。`, uses: ["L4.3"], fill: true },
          { claim: R`**误差块的秩相加**：$I_C\otimes E$ 是 $|C|$ 份 $E$ 的分块对角阵，`, tex: R`\rank(I_C\otimes E)=|C|\,\rank(E)\le|C|\,\varepsilon2^\ell=\varepsilon M.`, why: R`分块对角阵的秩是各块秩之和；$|C|2^\ell=M$ 由 \eqref{4.6}。`, uses: ["4.6"], fill: true },
          { claim: R`**左右乘不增秩**：$\rank(LYR')\le\rank(Y)$，取 $Y=I_C\otimes E$ 即得 $\rank(E_{\rm out})\le\varepsilon M$。` },
        ]} />
      </Stmt>
      <Tx>{R`有用的结构属于 $B_i$；只有修正项是低秩的。在 §6 中，\sref{T5.1} 给出 $J(i)=K_i+E$，$E$ 对所有 $i$ 相同、$\rank(E)\le2^\ell/\ell^{100}$；于是 $\varepsilon=\ell^{-100}$，每个特殊点 $A(i)$ 都是"块 $\le3n/q$ + 秩 $\le M/\ell^{100}$"，正好喂给 \sref{P3.2}（见 \sref{F:At}）。`}</Tx>
    </Sec>);
}
