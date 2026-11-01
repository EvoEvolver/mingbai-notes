import { FilledLoopFigure } from "./_redraw_ch03_simplices.jsx";
// 引言 + §3.1 Abel 群 —— 式 (3.1)–(3.10)，例 3.1–3.3，引理 3.1–3.2，定理 3.1–3.2，定义 3.1，图 3.1
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Proof, Erratum, Details, Derivation, C } from "@kit";

const R = String.raw;

export function Intro() {
  return (
    <Sec n="3.0" title="Introduction" zh="引言：没有边界、却又不是边界"
      gist={R`同调群是 Euler 示性数的"精细化"。指导原则：**找一个没有边界的区域，而它本身又不是任何区域的边界**——这样的东西围住了一个洞。`}
      why={R`Euler 示性数只是一个整数，把很多信息压扁了；同调群把"洞"分维数、分类型地记录下来，还能顺手读出 Euler 示性数。`}
      gives={[]}>
      <p className="muted">本节概念：<C id="cycle_boundary" /> · <C id="homology" /></p>
      <Tx>{R`在第 2 章里我们已经见过一个拓扑不变量：Euler 示性数。把空间"多面体化"（polyhedronization），数一数顶点、棱、面，交错相加即可（第 2 章 \eqref{2.31}）。它好算，但信息太少——一个整数而已。本章的**同调群**（homology groups）可以看作 Euler 示性数的*加细*：它把"空间里有哪些洞、各是几维的"记录成一组 Abel 群，并且 Euler 示性数可以直接从同调群里读出来（\sref{T3.7}）。

先看 \figref{3.1} 的两幅图。(a) 是**实心**三角形，内部包括在内；(b) 只是三角形的三条边，没有内部。怎样用数学语言刻画两者的差别？

一个显然的观察：(a) 的三条边围成了内部区域的**边界**；(b) 的三条边则不是任何东西的边界——因为内部根本不属于 (b)。另一方面，两种情形下三条边都构成一条**闭路**（loop），它本身**没有边界**。换句话说：`}</Tx>
      <Figure n="3.1" illustration={<FilledLoopFigure />} caption={R`自绘对照：实心三角形与仅含三边的空间；切换右图的内部。`} width="100%" />
      <Box kind="key" title="本章的指导原则">{R`**存在一条不是任何区域边界的闭路，就意味着闭路之内有一个洞。**

于是我们这样给空间分类：*寻找没有边界的区域，而它本身又不是某个区域的边界*。把这条原则精确化，就是同调群的理论。`}</Box>
      <Tx>{R`要把这条原则变成能计算的数学，需要三样东西，正好对应本章前三节：

◆ **代数语言**（§3.1）：同调群是**有限生成 Abel 群**，我们需要商群、同态基本定理和有限生成 Abel 群的结构定理；

◆ **几何积木**（§3.2）：把空间剖分成三角形及其高维类比——**单形**——拼成的**单纯复形**；

◆ **边界算子**（§3.3）：给单形定向，定义 $\partial$，证明"边界的边界为零"，再把"没有边界"（闭链）与"是边界"（边缘）做商。

§3.4 则讨论同调群的一般性质：$H_0$ 数连通分支、挠子群探测"扭转"、Betti 数与 Euler–Poincaré 定理。本章的讲法主要依据 Armstrong (1983)、Croom (1978) 与 Nash and Sen (1983)；群论入门可参考 Fraleigh (1976)。`}</Tx>
    </Sec>);
}

export function Sec31() {
  return (
    <Sec n="3.1" title="Abelian groups" zh="Abel 群"
      gist={R`同态、核与像、商群 $G/H$；**同态基本定理** $G_1/\ker f\cong\operatorname{im}f$；自由 Abel 群与循环群；**有限生成 Abel 群 = 若干个 $\mathbb{Z}$ 的直和再 $\oplus$ 若干个 $\mathbb{Z}_k$**。`}
      why={R`同调群定义为商群 $Z_r/B_r$。要算商群、要知道算出来的结果"长什么样"，就需要这一节的两大定理。`}
      gives={["3.3", "3.6", "3.9", "3.10"]}>
      <p className="muted">本节概念：<C id="quotient" /> · <C id="fund_hom" /> · <C id="fg_abelian" /></p>
      <Tx>{R`同调群背后的代数结构是**有限生成 Abel 群**（finitely generated Abelian groups）。本章所有的群都是交换群，所以群运算一律写作 $+$，单位元写作 $0$，$x$ 的逆元写作 $-x$。`}</Tx>

      <Sub n="3.1.1" title="Elementary group theory" zh="初等群论">
        <Tx>{R`**同态与同构。**设 $G_1$、$G_2$ 是 Abel 群。映射 $f:G_1\to G_2$ 若对任意 $x,y\in G_1$ 满足`}</Tx>
        <Eq n="3.1" say="同态就是“保持加法”的映射：先加后映与先映后加结果相同。">{R`f(x+y)=f(x)+f(y)`}</Eq>
        <Tx>{R`则称为**同态**（homomorphism）。若 $f$ 还是双射，则称为**同构**（isomorphism）；存在同构 $f:G_1\to G_2$ 时称 $G_1$ 与 $G_2$ **同构**，记作 $G_1\cong G_2$——同构的群在代数上没有区别。

例：$f:\mathbb{Z}\to\mathbb{Z}_2=\{0,1\}$，$f(2n)=0$，$f(2n+1)=1$（"取奇偶性"）是同态。逐类验证（右边在 $\mathbb{Z}_2$ 中计算，$1+1=0$）：

$$\begin{aligned}f(2m+2n)&=f(2(m+n))=0=0+0=f(2m)+f(2n)\\ f(2m+1+2n+1)&=f(2(m+n+1))=0=1+1=f(2m+1)+f(2n+1)\\ f(2m+1+2n)&=f(2(m+n)+1)=1=1+0=f(2m+1)+f(2n).\end{aligned}$$

**子群。**子集 $H\subset G$ 若在 $G$ 的运算下自身构成群，就称为 $G$ 的**子群**（subgroup）。例如 $k\mathbb{Z}\equiv\{kn\mid n\in\mathbb{Z}\}$（$k\in\mathbb{N}$）是 $\mathbb{Z}$ 的子群；而 $\mathbb{Z}_2=\{0,1\}$ 虽然是 $\mathbb{Z}$ 的子集，却**不是**子群——它的运算 $1+1=0$ 和 $\mathbb{Z}$ 的加法不一致。`}</Tx>
        <Tx>{R`**商群：把子群"看成零"。**这是本章最重要的构造，因为同调群就是一个商群。设 $H$ 是 $G$ 的子群，规定 $x,y\in G$ **等价**当且仅当`}</Tx>
        <Eq n="3.2" say={R`两个元素等价，当且仅当它们的差落在子群 $H$ 里——也就是说，把 $H$ 中的元素都当作零。`}>{R`x-y\in H`}</Eq>
        <Tx>{R`记作 $x\sim y$。这显然是等价关系（自反：$0\in H$；对称：$H$ 对取逆封闭；传递：$H$ 对加法封闭）。$x$ 所在的等价类记作 $[x]$，等价类的全体记作 $G/H$。$G$ 的加法自然诱导出 $G/H$ 上的加法：`}</Tx>
        <Eq n="3.3" title="商群的加法" say="等价类相加，就是任取代表元相加再取等价类；左边的加号是商群中的运算，右边的是原群中的运算。">{R`[x]+[y]=[x+y].`}</Eq>
        <Tx>{R`左边的 $+$ 是 $G/H$ 中的运算，右边的 $+$ 是 $G$ 中的运算。必须检查它**与代表元的选取无关**：若 $[x']=[x]$、$[y']=[y]$，则 $x-x'=h$、$y-y'=g$，$h,g\in H$，于是

$$x'+y'=x+y-(h+g)\in[x+y].$$

由于 Abel 群的子群总是正规子群（第 2 章例 2.6），$G/H$ 在这个运算下成为群，称为**商群**（quotient group）。单位元是 $[0]=[h]$（$h\in H$）——**子群里的所有元素都变成了零**。两个极端：$H=G$ 时任何 $x$ 都与 $0$ 等价，$G/G$ 只有一个元素 $[0]$；$H=\{0\}$ 时 $x\sim y\Leftrightarrow x=y$，$G/H$ 就是 $G$ 本身。`}</Tx>
        <Box kind="physics" title="商群的直觉：规范等价">{R`物理学家对商群其实很熟悉：两个矢势 $\nosym{A}$ 与 $\nosym{A}+\nabla\nosym{\Lambda}$ 描述同一个磁场——"相差一个梯度"就是一个等价关系，物理上可区分的只是等价类。同调群做的是同一件事：两个闭链若只相差一个**边界**，就认为它们"拓扑上相同"。`}</Box>
        <Box kind="example" n="3.1" title={R`商群 $\mathbb{Z}/2\mathbb{Z}$`}><Tx>{R`偶数之间：$2n-2m=2(n-m)\in2\mathbb{Z}$，故 $[2m]=[2n]$。奇数之间：$(2n+1)-(2m+1)=2(n-m)\in2\mathbb{Z}$，故 $[2m+1]=[2n+1]$。偶数与奇数永远不等价，因为 $2n-(2m+1)\notin2\mathbb{Z}$。于是`}</Tx>
          <Eq n="3.4" say="整数模去偶数，只剩下两个等价类：偶数类与奇数类。">{R`\mathbb{Z}/2\mathbb{Z}=\{[0],[1]\}.`}</Eq>
          <Tx>{R`定义 $\varphi:\mathbb{Z}/2\mathbb{Z}\to\mathbb{Z}_2$，$\varphi([0])=0$，$\varphi([1])=1$，它是同构，所以 $\mathbb{Z}/2\mathbb{Z}\cong\mathbb{Z}_2$。一般地，对 $k\in\mathbb{N}$，`}</Tx>
          <Eq n="3.5" say={R`整数模去 $k$ 的倍数，就是“钟面算术”：$k$ 阶循环群。`}>{R`\mathbb{Z}/k\mathbb{Z}\cong\mathbb{Z}_k.`}</Eq>
        </Box>
        <Tx>{R`**核与像。**同态 $f$ 带来两个天然的子群：被送到零的元素构成的**核**，以及所有像构成的**像**。`}</Tx>
        <Stmt id="L3.1">
          <Proof steps={[
            { claim: R`(a) 封闭性：若 $x,y\in\ker f$，则 $x+y\in\ker f$。`, tex: R`f(x+y)=f(x)+f(y)=0+0=0`, uses: ["3.1"] },
            { claim: R`(a) 含单位元：$0\in\ker f$。`, tex: R`f(0)=f(0+0)=f(0)+f(0)\ \Rightarrow\ f(0)=0`, why: R`两边同减 $f(0)$。` },
            { claim: R`(a) 对取逆封闭：$x\in\ker f\Rightarrow-x\in\ker f$。`, tex: R`0=f(0)=f(x-x)=f(x)+f(-x)=f(-x)` },
            { claim: R`(b) 封闭性：$y_1=f(x_1)$、$y_2=f(x_2)\in\operatorname{im}f$ 时，$y_1+y_2\in\operatorname{im}f$。`, tex: R`y_1+y_2=f(x_1)+f(x_2)=f(x_1+x_2)\in\operatorname{im}f` },
            { claim: R`(b) 含单位元且对取逆封闭：$0=f(0)\in\operatorname{im}f$；若 $y=f(x)$，则 $f(-x)=-y$，故 $-y\in\operatorname{im}f$。`, why: R`由 $0=f(x-x)=f(x)+f(-x)$。` },
          ]} />
        </Stmt>
        <Stmt id="T3.1">
          <Eq n="3.6" keyEq title="同态基本定理" say="把同态的核“看成零”之后，定义域就和像一模一样：同态丢掉的信息恰好是它的核。">{R`G_1/\ker f\cong\operatorname{im}f.`}</Eq>
          <Proof steps={[
            { claim: R`两边都是群。`, uses: ["L3.1"], why: R`$\ker f$ 是子群，故 $G_1/\ker f$ 是商群；$\operatorname{im}f$ 是子群。` },
            { claim: R`定义 $\varphi:G_1/\ker f\to\operatorname{im}f$，$\varphi([x])=f(x)$；它**良定义**。`, tex: R`x'\in[x]\Rightarrow x'=x+h\ (h\in\ker f)\Rightarrow f(x')=f(x)+f(h)=f(x)`, why: "同一等价类的不同代表元给出相同的值。" },
            { claim: R`$\varphi$ 是同态。`, tex: R`\varphi([x]+[y])=\varphi([x+y])=f(x+y)=f(x)+f(y)=\varphi([x])+\varphi([y])`, uses: ["3.3"] },
            { claim: R`$\varphi$ 是单射。`, tex: R`\varphi([x])=\varphi([y])\Rightarrow f(x-y)=0\Rightarrow x-y\in\ker f\Rightarrow[x]=[y]` },
            { claim: R`$\varphi$ 是满射：任给 $y\in\operatorname{im}f$，存在 $x\in G_1$ 使 $f(x)=y=\varphi([x])$。` },
          ]} />
        </Stmt>
        <Box kind="example" n="3.2" title="用同态基本定理重做例 3.1">{R`取上面的奇偶同态 $f:\mathbb{Z}\to\mathbb{Z}_2$。它的核 $\ker f=2\mathbb{Z}$，像 $\operatorname{im}f=\mathbb{Z}_2$。\sref{T3.1} 立即给出 $\mathbb{Z}/2\mathbb{Z}\cong\mathbb{Z}_2$，与例 3.1 一致——而且不需要逐个列举等价类。

**这就是本章计算同调群的标准套路**：要算商群 $Z/B$，就去找一个满同态 $f:Z\to G$，使 $\ker f=B$。例 3.7、3.8 和 \sref{T3.5} 都是这样做的。`}</Box>
      </Sub>

      <Sub n="3.1.2" title="Finitely generated Abelian groups and free Abelian groups" zh="有限生成 Abel 群与自由 Abel 群">
        <Tx>{R`对 $x\in G$ 与 $n\in\mathbb{Z}$，记 $nx$ 为 $n$ 个 $x$ 相加（$n>0$），或 $|n|$ 个 $(-x)$ 相加（$n<0$），并规定 $0x=0$。取 $G$ 中 $r$ 个元素 $x_1,\ldots,x_r$，形如`}</Tx>
        <Eq n="3.7" say={R`生成元的所有整系数组合：这就是由 $x_1,\ldots,x_r$ 生成的子群里的一般元素。`}>{R`n_1x_1+\cdots+n_rx_r\qquad(n_i\in\mathbb{Z},\ 1\le i\le r)`}</Eq>
        <Tx>{R`的元素构成 $G$ 的子群 $H$，称为由**生成元**（generators）$x_1,\ldots,x_r$ **生成**的子群。若 $G$ 本身由有限个元素生成，称 $G$ **有限生成**（finitely generated）。若 $n_1x_1+\cdots+n_rx_r=0$ 只在 $n_1=\cdots=n_r=0$ 时成立，称 $x_1,\ldots,x_r$ **线性无关**（linearly independent）。

这和线性代数几乎一模一样，唯一的区别是**系数只能取整数**。这一点区别后面会产生"挠"：在整数里不能做除法。`}</Tx>
        <Stmt id="D3.1" />
        <Box kind="example" n="3.3" title="自由与不自由">{R`$\mathbb{Z}$ 是秩 1 的自由 Abel 群，由 $1$（或 $-1$）生成。$\mathbb{Z}\oplus\mathbb{Z}=\{(i,j)\mid i,j\in\mathbb{Z}\}$ 是秩 2 的自由 Abel 群，生成元为 $(1,0)$、$(0,1)$。一般地，$r$ 个 $\mathbb{Z}$ 的直和 $\mathbb{Z}\oplus\mathbb{Z}\oplus\cdots\oplus\mathbb{Z}$ 是秩 $r$ 的自由 Abel 群。

反例：$\mathbb{Z}_2=\{0,1\}$ 由 $1$ 有限生成，但**不是**自由的——$1$ 不是线性无关的，因为 $1+1=0$ 是一个系数不全为零的关系。`}</Box>
      </Sub>

      <Sub n="3.1.3" title="Cyclic groups" zh="循环群">
        <Tx>{R`由一个元素 $x$ 生成的群 $G=\{0,\pm x,\pm2x,\ldots\}$ 称为**循环群**（cyclic group）。若对任何 $n\in\mathbb{Z}-\{0\}$ 都有 $nx\neq0$，称为**无限循环群**；若某个 $n\neq0$ 使 $nx=0$，称为**有限循环群**。

用同态基本定理可以一次性把循环群分类。定义 $f:\mathbb{Z}\to G$，$f(n)=nx$。它是满射（但不一定单射），所以 $G=\operatorname{im}f\cong\mathbb{Z}/\ker f$。设 $N$ 是使 $Nx=0$ 的最小正整数，则`}</Tx>
        <Eq n="3.8" say={R`把整数 $n$ 送到 $nx$ 的同态，其核恰好是 $N$ 的全体倍数。`}>{R`\ker f=\{0,\pm N,\pm2N,\ldots\}=N\mathbb{Z}`}</Eq>
        <Derivation title={R`为什么核恰好是 $N\mathbb{Z}$（原书说"显然"）`} collapsed steps={[
          { tex: R`N\mathbb{Z}\subset\ker f`, why: R`$(kN)x=k(Nx)=0$。` },
          { tex: R`n\in\ker f,\ n=qN+s\ (0\le s<N)\ \Rightarrow\ sx=nx-q(Nx)=0`, why: "带余除法。" },
          { tex: R`s=0`, why: R`$N$ 是使 $Nx=0$ 的**最小**正整数，而 $0\le s<N$。` },
        ]} result={R`$\ker f=N\mathbb{Z}$`} />
        <Tx>{R`于是`}</Tx>
        <Eq n="3.9" keyEq title="有限循环群的分类" say={R`任何有限循环群都只是“模 $N$ 的整数”：它由阶数 $N$ 唯一决定。`}>{R`G\cong\mathbb{Z}/N\mathbb{Z}\cong\mathbb{Z}_N.`}</Eq>
        <Tx>{R`若 $G$ 是无限循环群，则 $\ker f=\{0\}$，$G\cong\mathbb{Z}$。**结论：任何无限循环群都同构于 $\mathbb{Z}$，任何有限循环群都同构于某个 $\mathbb{Z}_N$。**

下面的引理和定理在后面会用到。先不加证明地陈述引理（原书如此；本站在后面给出证明概要）。`}</Tx>
        <Stmt id="L3.2">
          <Details summary={R`证明概要（本站补充）：Smith 标准形`}>{R`设 $G=\mathbb{Z}^r$，$H$ 由有限个元素 $h_1,\ldots,h_s$ 生成（$\mathbb{Z}^r$ 的子群总是有限生成的，可对 $r$ 归纳证明）。把 $h_j$ 的坐标排成 $r\times s$ 整数矩阵（记作 $\nosym{A}$）。对 $\nosym{A}$ 做**整数初等变换**——交换两行（列）、把一行（列）的整数倍加到另一行（列）、把一行（列）乘 $-1$。行变换相当于更换 $G$ 的基，列变换相当于更换 $H$ 的生成元组，都不改变 $H$ 本身。

反复用带余除法把某个元素的绝对值降到最小、再用它消去同行同列的其他元素，最终可化为 $\mathrm{diag}(k_1,\ldots,k_p,0,\ldots,0)$，且 $k_1\mid k_2\mid\cdots\mid k_p$。这就是 **Smith 标准形**。新的基 $x_1,\ldots,x_r$ 下，$H$ 由 $k_1x_1,\ldots,k_px_p$ 生成，因而 $H\cong k_1\mathbb{Z}\oplus\cdots\oplus k_p\mathbb{Z}$，秩为 $p$（$k_i\mathbb{Z}\cong\mathbb{Z}$）。

本章 \secref{3.4.2} 的交互计算器正是用这个算法从边界矩阵求出同调群的。`}</Details>
        </Stmt>
        <Stmt id="T3.2">
          <Eq n="3.10" keyEq title="有限生成 Abel 群的结构" say={R`任何有限生成 Abel 群都拆成两部分：$r$ 个整数群（自由部分，$r$ 称为秩）加上若干个有限循环群（挠部分）。`}>{R`G\cong\underbrace{\mathbb{Z}\oplus\cdots\oplus\mathbb{Z}}_{r}\oplus\mathbb{Z}_{k_1}\oplus\cdots\oplus\mathbb{Z}_{k_p}`}</Eq>
          <Proof steps={[
            { claim: R`设 $G$ 由 $x_1,\ldots,x_m$ 生成，定义满同态 $f:\underbrace{\mathbb{Z}\oplus\cdots\oplus\mathbb{Z}}_m\to G$。`, tex: R`f(n_1,\ldots,n_m)=n_1x_1+\cdots+n_mx_m`, why: R`满射因为 $x_i$ 生成 $G$；同态性由 Abel 群的交换律。` },
            { claim: R`由同态基本定理：`, tex: R`\underbrace{\mathbb{Z}\oplus\cdots\oplus\mathbb{Z}}_{m}/\ker f\cong G`, uses: ["T3.1"] },
            { claim: R`$\ker f$ 是 $\mathbb{Z}^m$ 的子群；适当选取 $\mathbb{Z}^m$ 的基 $e_1,\ldots,e_m$ 后，`, tex: R`\ker f\cong k_1\mathbb{Z}\oplus\cdots\oplus k_p\mathbb{Z}\quad(\text{由 }k_1e_1,\ldots,k_pe_p\text{ 生成})`, uses: ["L3.2"] },
            { claim: R`在这组基下商群可以逐个坐标地计算：第 $i\le p$ 个坐标贡献 $\mathbb{Z}/k_i\mathbb{Z}\cong\mathbb{Z}_{k_i}$，其余 $m-p$ 个坐标各贡献一个 $\mathbb{Z}$。`, tex: R`G\cong\underbrace{\mathbb{Z}\oplus\cdots\oplus\mathbb{Z}}_{m}/(k_1\mathbb{Z}\oplus\cdots\oplus k_p\mathbb{Z})\cong\underbrace{\mathbb{Z}\oplus\cdots\oplus\mathbb{Z}}_{m-p}\oplus\mathbb{Z}_{k_1}\oplus\cdots\oplus\mathbb{Z}_{k_p}`, why: R`同态 $(n_1,\ldots,n_m)\mapsto([n_1]_{k_1},\ldots,[n_p]_{k_p},n_{p+1},\ldots,n_m)$ 是满射，核恰为 $k_1\mathbb{Z}\oplus\cdots\oplus k_p\mathbb{Z}$，再用一次同态基本定理与 \eqref{3.5}。`, uses: ["3.5", "T3.1"], fill: true },
            { claim: R`令 $r=m-p$ 即得 \eqref{3.10}。` },
          ]} />
        </Stmt>
        <Erratum kind="note" loc="p.117 定理 3.2" title={R`关于 "$m=r+p$"`}>{R`证明中 $\ker f$ 的生成元 $k_ie_i$ 可能有 $k_i=1$，此时 $\mathbb{Z}_{k_i}=\mathbb{Z}_1=\{0\}$ 是平凡因子。原书的等式 $m=r+p$ 是把这些平凡因子也计入时才成立的。通常的写法会删去平凡因子并要求 $k_i>1$（还可进一步要求 $k_1\mid k_2\mid\cdots\mid k_p$，这时分解唯一），于是只有 $r+p\le m$。例如 $\mathbb{Z}$ 也可以用 $m=2$ 个生成元 $\{2,3\}$ 生成，但 $\mathbb{Z}$ 的 $r=1$、$p=0$。`}</Erratum>
        <Box kind="key" title="为什么本章离不开这条定理">{R`同调群 $H_r(K)=Z_r(K)/B_r(K)$ 是有限生成 Abel 群（$Z_r$ 是有限秩自由群 $C_r$ 的子群）。\sref{T3.2} 告诉我们：**算同调群，就是算出一个秩 $r$ 与一串挠因子 $k_1,\ldots,k_p$**。前者在 §3.4.3 成为 Betti 数，后者在 §3.4.2 成为挠子群。`}</Box>
      </Sub>
    </Sec>);
}
