// §4 引言与 §4.1 One color per row and column —— 式 (4.1)–(4.4)，原文 pp.6–8
import { Sec, Tx, Eq, Box, Derivation, Table, Erratum } from "@kit";
import { Ell1Demo } from "./_ch04_run.jsx";

const R = String.raw;

export function Sec4Intro() {
  return (
    <Sec n="4" title="A factorization that turns coordinate identities into blocks" zh="把坐标恒等变成分块的分解"
      gist={R`把稀疏输入写成 $A=L\cJ R'$：输入只在 $L$、$R'$ 中，中间是与输入无关的"交叉配线" $\cJ=I_C\otimes X^{\otimes\ell}$；中间矩阵若在第 $i$ 个坐标上是恒等，外层就按第 $i$ 个符号分块。`}
      why={R`\sref{P3.2} 已把算法问题化归为代数问题：构造 $A(t)$，$A(0)=A$，在 $t=1,\dots,\ell$ 处是"小块 + 低秩"，且 $d/\ell$ 小。本节给出"外壳"：把对 $n\times n$ 矩阵的变形，转化为对一个 $2^\ell\times2^\ell$ 小矩阵的变形。`}
      gives={["4.3", "4.4", "4.5", "4.7", "4.8", "4.9"]}>
      <Tx>{R`回顾我们站在哪里。\sref{P3.2} 说：只要能造出一族矩阵多项式 $A(t)$，满足 $A(0)=A$、次数 $\le d$，并且在 $\ell$ 个特殊点 $t=1,\dots,\ell$ 上都是"块大小 $\le s$ 的分块矩阵 + 秩 $\le r$ 的矩阵"，就能以 $\poly(n)\,2^{O(s+r\log n+h\log(n/h))}$ 的时间求出 $\per(A)$，其中 $h\approx nd/\ell$。于是**算法任务已经完成，剩下的是纯构造问题**：怎样让一个稀疏矩阵在许多点上"变容易"，同时变形的次数又远小于点数？

本节回答其中的"外壳"部分。输入是 $n\times n$ 矩阵，每行每列至多 $\Delta$（固定常数）个非零元。我们先用普通的"颜色"讲清全部结构思想（§4.1）——这已经是整个想法最简单的完整形态；然后把颜色换成"词"（§4.2），把中间坐标识别为布尔立方体（§4.3），最后提炼出让外层分块的那个代数性质：$i$-好（§4.4）。`}</Tx>
    </Sec>);
}

export function Sub41() {
  return (
    <Sec n="4.1" title="One color per row and column" zh="每行每列一种颜色"
      gist={R`§4.1 用颜色（$\ell=1$）演示全部想法：$A=LR=LIR=L\cJ R'$，把中间的 $\cJ$ 换成 $I$ 得到块对角的 $B=LIR'$。`}
      why={R`这是整个结构思想最简单的形态；之后的词、立方体、好性都只是把它"按坐标"推广。`}
      gives={["4.1","4.2","4.3","4.4"]}>
      <Tx>{R`**着色的要求。**本小节取 $q=\Theta(\sqrt n)$（常数依赖于 $\Delta$ 且足够大）。一个初等的贪心过程可以用 $[q]$ 中的颜色给行和列着色，使得

◆ 每种颜色在行这一侧、列这一侧各至多出现 $O(n/q)$ 次；

◆ 每个非零元的两个端点（行与列）颜色不同；

◆ 不同的非零元有不同的**有序**端点颜色对。

这正是后面 \sref{L4.1} 在 $\ell=1$ 时的情形（证明见那里）。注意着色只看非零元的**位置**，与元素的数值无关——元素不必是 0 或 1。`}</Tx>
      <Tx>{R`**按颜色排序。**把行、列都按颜色排好，矩阵自然分成 $q\times q$ 个颜色块 $A_{ab}$（行色 $a$、列色 $b$）：`}</Tx>
      <Eq n="4.1" say="按颜色排序后，所有对角块（行色 = 列色）都是零，因为非零元两端颜色不同；每个非对角块至多含一个非零元，因为不同非零元的有序颜色对不同。">{R`A=\begin{pmatrix}0&A_{12}&A_{13}&\cdots&A_{1q}\\A_{21}&0&A_{23}&\cdots&A_{2q}\\A_{31}&A_{32}&0&\cdots&A_{3q}\\\vdots&\vdots&\vdots&\ddots&\vdots\\A_{q1}&A_{q2}&A_{q3}&\cdots&0\end{pmatrix}.`}</Eq>
      <Tx>{R`对角块为零来自"两端异色"；每个块至多一个非零元来自"有序颜色对互异"（块 $(a,b)$ 里的非零元，有序颜色对都是 $(a,b)$）；每个块有 $O(\sqrt n)$ 行、$O(\sqrt n)$ 列来自平衡性（$n/q=O(\sqrt n)$）。

这个 $A$ 本身并不容易——它的对角块是零，非零元散在非对角块里。下面四步把它改写成乘积，再"拨动"中间的一个矩阵，让非零的部分**搬到对角块上**。`}</Tx>

      <Tx>{R`**First：$A=LR$。**为每个非零元 $A_{uv}$ 开一个中间坐标 $e$：把 $A_{uv}$ 放在 $L$ 的 $(u,e)$ 位置，把 $1$ 放在 $R$ 的 $(e,v)$ 位置，这一列、这一行的其余位置都是零。乘积 $(LR)_{uv}=\sum_eL[u,e]R[e,v]$ 中只有经过这个 $e$ 的一项，恰好还原出这个元素，所以 $LR=A$。

现在给中间坐标起名字：用这个非零元的**有序颜色对** $(a,b)$。由于每个颜色块至多一个非零元，名字互不重复。对每个空的块，也补上 $L$ 的一个零列与 $R$ 的一个零行。这样中间坐标恰好是所有 $a\ne b$ 的有序对，中间维数为`}</Tx>
      <Eq say={R`中间坐标 = 所有有序异色对，共 $q(q-1)$ 个；$L$ 是 $n\times M$、$R$ 是 $M\times n$ 的有理矩阵。`}>{R`M=q(q-1),\qquad L\in\Q^{n\times M},\qquad R\in\Q^{M\times n}.`}</Eq>
      <Tx>{R`对块 $(a,b)$ 中的元素 $A_{uv}=w$，定义写成`}</Tx>
      <Eq n="4.2" say={R`块 $(a,b)$ 中的非零元 $w$：$L$ 在第 $u$ 行、中间坐标 $(a,b)$ 处存数值 $w$；$R$ 在中间坐标 $(a,b)$、第 $v$ 列处存 1。`}>{R`L[u,(a,b)]=w,\qquad R[(a,b),v]=1.`}</Eq>
      <Tx>{R`特别地，$L$ 的 $(a,b)$ 列只用到颜色为 $a$ 的行，$R$ 的 $(a,b)$ 行只用到颜色为 $b$ 的列。记住这一点：$L$ 读名字的**第一个**颜色，$R$ 读**第二个**。`}</Tx>

      <Tx>{R`**Next：$A=LIR$。**插入 $M\times M$ 单位阵，并把中间坐标两两配对排列：`}</Tx>
      <Eq say={R`中间坐标的排列顺序：每个无序颜色对 $\{a,b\}$ 的两个方向 $(a,b)$、$(b,a)$ 相邻。`}>{R`(1,2),(2,1);\quad(1,3),(3,1);\quad\dots;\quad(q-1,q),(q,q-1).`}</Eq>
      <Tx>{R`于是 $I$ 由 $\binom q2$ 个 $2\times2$ 单位块组成，每个无序颜色对一块。到这里什么都还没变。`}</Tx>

      <Tx>{R`**Then：$A=L\cJ R'$。**令`}</Tx>
      <Eq say={R`$X$ 交换一对中间坐标的两个方向；$\cJ$ 在每个无序颜色对上放一个 $X$。`}>{R`X=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad \cJ=\diag(X,\dots,X).`}</Eq>
      <Tx>{R`把 $R$ 的每一对相邻行互换，得到 $R'=\cJ R$。由于 $X^2=I_2$，有 $\cJ^2=I$，因此`}</Tx>
      <Eq n="4.3" keyEq title="三种写法" say={R`同一个矩阵的三种写法：直接分解、插入单位阵、插入一对互逆的交换 $\cJ\cJ$ 并把其中一个吸收进 $R'$。所有输入信息都在 $L$ 与 $R'$ 里。`}>{R`\boxed{A=LR=LIR=L\cJ R'.}`}</Eq>
      <Tx>{R`现在 \eqref{4.2} 中那个元素出现在 $R'[(b,a),v]=1$——名字被**反过来**写了；中间的 $\cJ$ 再把名字反回去，乘积依旧还原出 $A$ 的同一个元素。表面上这只是绕了个圈子，但它改变了 $L$ 与 $R'$ "读名字"的方式。`}</Tx>

      <Tx>{R`**Finally：把 $\cJ$ 换成 $I$。**保持 $L$ 与 $R'$ 不动，定义新矩阵 $B=LIR'$。它的支撑集从下表一目了然：`}</Tx>
      <Table head={["中间坐标", "$L$ 的该列：行的颜色", "$R$ 的该行：列的颜色", "$R'$ 的该行：列的颜色"]}
        rows={[["$(a,b)$", "$a$", "$b$", "$a$"], ["$(b,a)$", "$b$", "$a$", "$b$"]]}
        caption="原文 p.7 的表。$R'$ 的 $(a,b)$ 行就是 $R$ 的 $(b,a)$ 行，后者用 $a$ 色的列。" />
      <Tx>{R`逐行读这张表：坐标 $(a,b)$ 处，$L$ 的列用 $a$ 色的行；$R$ 的行用 $b$ 色的列；而 $R'$ 的行是 $R$ 的 $(b,a)$ 行，用的是 $a$ 色的列。**反转之后，$L$ 与 $R'$ 都使用坐标名字里的第一个颜色。**因此`}</Tx>
      <Eq say={R`$B$ 的 $(u,v)$ 元是经过所有中间坐标 $(a,b)$ 的乘积之和；只有当行 $u$ 与列 $v$ 都具有颜色 $a$ 时某一项才可能非零。`}>{R`B_{uv}=\sum_{a\ne b}L[u,(a,b)]\,R'[(a,b),v]`}</Eq>
      <Tx>{R`只有当行 $u$ 与列 $v$ 颜色相同时才可能非零。于是`}</Tx>
      <Eq n="4.4" keyEq title="块对角的 B" say={R`把中间的交叉换成直通后，矩阵变成按颜色排开的块对角阵：第 $a$ 块由 $a$ 色的行与 $a$ 色的列组成，积和式等于各块积和式之积。`}>{R`\boxed{B=LIR'=\begin{pmatrix}B_1&0&\cdots&0\\0&B_2&\cdots&0\\\vdots&\vdots&\ddots&\vdots\\0&0&\cdots&B_q\end{pmatrix}.}`}</Eq>
      <Tx>{R`要强调：这些 $B_a$ 是**新的块**，不是原来 $A$ 的那些零对角块。每块有 $O(\sqrt n)$ 行和列，所以 $\per(B)=\prod_a\per(B_a)$ 可在 $2^{O(\sqrt n)}$ 时间内算出；若某块的行数与列数不等，它的积和式为零（从而 $\per(B)=0$）。`}</Tx>

      <Tx>{R`**用普通矩阵记号看一对颜色。**固定一个无序对 $\{a,b\}$。把块 $(a,b)$ 中那唯一的元素写成 $A_{ab}=u_{ab}v_{ab}^{\mathsf T}$，块 $(b,a)$ 的写成 $A_{ba}=u_{ba}v_{ba}^{\mathsf T}$：$u_{ab}$ 是带权的行指示向量（在该元素所在行处为元素值），$v_{ab}$ 是列指示向量；空块则取零向量。属于 $\{a,b\}$ 的那一小片分解是（$L$ 的两个行块依次是 $a$ 色的行、$b$ 色的行；$R$、$R'$ 的两个列块依次是 $a$ 色的列、$b$ 色的列；中间两个坐标依次是 $(a,b),(b,a)$）`}</Tx>
      <Eq say={R`这对颜色在 $L$、$R$、$R'$ 中占据的部分：$L$ 的两列分别携带块 $(a,b)$ 与块 $(b,a)$ 的行数据；$R$ 的两行携带它们的列数据；$R'$ 是 $R$ 的两行互换。`}>{R`L_{\{a,b\}}=\begin{pmatrix}u_{ab}&0\\0&u_{ba}\end{pmatrix},\qquad R_{\{a,b\}}=\begin{pmatrix}0&v_{ab}^{\mathsf T}\\v_{ba}^{\mathsf T}&0\end{pmatrix},\qquad R'_{\{a,b\}}=\begin{pmatrix}v_{ba}^{\mathsf T}&0\\0&v_{ab}^{\mathsf T}\end{pmatrix}.`}</Eq>
      <Tx>{R`于是`}</Tx>
      <Eq say={R`中间放 $X$：两个非对角块原样还原，正是 $A$ 在这对颜色上的部分。`}>{R`L_{\{a,b\}}XR'_{\{a,b\}}=\begin{pmatrix}0&u_{ab}v_{ab}^{\mathsf T}\\u_{ba}v_{ba}^{\mathsf T}&0\end{pmatrix},`}</Eq>
      <Eq say={R`中间放 $I_2$：行数据与“反向块”的列数据配成对，落到 $(a,a)$ 与 $(b,b)$ 两个对角块上。`}>{R`L_{\{a,b\}}I_2R'_{\{a,b\}}=\begin{pmatrix}u_{ab}v_{ba}^{\mathsf T}&0\\0&u_{ba}v_{ab}^{\mathsf T}\end{pmatrix}.`}</Eq>
      <Derivation title={R`补全：两个 $2\times2$ 分块乘法`} collapsed steps={[
        { tex: R`XR'_{\{a,b\}}=\begin{pmatrix}0&1\\1&0\end{pmatrix}\begin{pmatrix}v_{ba}^{\mathsf T}&0\\0&v_{ab}^{\mathsf T}\end{pmatrix}=\begin{pmatrix}0&v_{ab}^{\mathsf T}\\v_{ba}^{\mathsf T}&0\end{pmatrix}=R_{\{a,b\}}`, why: R`$X$ 交换两行——这就是 $\cJ R'=\cJ^2R=R$ 在这一对颜色上的样子。` },
        { tex: R`L_{\{a,b\}}XR'_{\{a,b\}}=\begin{pmatrix}u_{ab}&0\\0&u_{ba}\end{pmatrix}\begin{pmatrix}0&v_{ab}^{\mathsf T}\\v_{ba}^{\mathsf T}&0\end{pmatrix}=\begin{pmatrix}0&u_{ab}v_{ab}^{\mathsf T}\\u_{ba}v_{ba}^{\mathsf T}&0\end{pmatrix}`, why: R`分块乘法：左上 $=u_{ab}\cdot0+0\cdot v_{ba}^{\mathsf T}=0$，右上 $=u_{ab}v_{ab}^{\mathsf T}+0=A_{ab}$，左下 $=0+u_{ba}v_{ba}^{\mathsf T}=A_{ba}$，右下 $=0$。` },
        { tex: R`L_{\{a,b\}}I_2R'_{\{a,b\}}=\begin{pmatrix}u_{ab}&0\\0&u_{ba}\end{pmatrix}\begin{pmatrix}v_{ba}^{\mathsf T}&0\\0&v_{ab}^{\mathsf T}\end{pmatrix}=\begin{pmatrix}u_{ab}v_{ba}^{\mathsf T}&0\\0&u_{ba}v_{ab}^{\mathsf T}\end{pmatrix}`, why: R`两个分块对角阵相乘仍是分块对角的。左上块的行是 $a$ 色、列也是 $a$ 色（$v_{ba}$ 是块 $(b,a)$ 中元素的列，颜色为 $a$）。` },
        { tex: R`A=\sum_{\{a,b\}}L_{\{a,b\}}XR'_{\{a,b\}},\qquad B=\sum_{\{a,b\}}L_{\{a,b\}}I_2R'_{\{a,b\}},\qquad B_a=\sum_{b\ne a}u_{ab}v_{ba}^{\mathsf T}`, why: R`中间矩阵是分块对角的，乘积按无序对拆成各项之和（嵌入到 $n\times n$）。这就给出 \eqref{4.3} 与 \eqref{4.4}，并给出对角块的显式公式。` },
      ]} />
      <Tx>{R`对所有无序对求和就得到 \eqref{4.3} 与 \eqref{4.4}。最后一行的公式 $B_a=\sum_{b\ne a}u_{ab}v_{ba}^{\mathsf T}$ 很说明问题：单位阵把**相反方向**两个块的行数据与列数据配在一起——块 $(a,b)$ 的行配上块 $(b,a)$ 的列。所以若反向块 $(b,a)$ 是空的，$v_{ba}=0$，块 $(a,b)$ 的元素在 $B$ 里就"消失"了。`}</Tx>

      <Ell1Demo />

      <Box kind="key" title="一个容易的矩阵是不够的"><Tx>{R`$\per(B)$ 与 $\per(A)$ 没有任何必然联系（上面的示例里可以直接对比）。在 $A$ 与 $B$ 之间做线性插值 $A+t(B-A)$，其积和式是 $t$ 的 $n$ 次多项式，一般要 $n+1$ 个函数值才能确定——而我们只有一个容易点，远远不够。

出路是：把每个颜色换成一个**词**。词有 $\ell$ 个坐标，每个坐标都能给出一个容易点（按该坐标的符号分块）。代价是块变大了（不再是 $O(\sqrt n)$，而是 $O(n/q)$），但仍小到算法可以承受。再配合 \sref{P3.2} 的导数（每个点用 $h$ 阶导数），$\ell$ 个点就够了。`}</Tx></Box>
    </Sec>);
}
