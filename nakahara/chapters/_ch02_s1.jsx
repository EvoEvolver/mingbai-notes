// 引言 + §2.1 映射 —— 式 (2.1)–(2.5)，例 2.1–2.6，定义 2.1–2.2，习题 2.1–2.7，图 2.1–2.8；交互图：正方形粘合
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Exercise, Erratum, Derivation, C } from "@kit";
import { GluingLab } from "./_ch02_demos.jsx";

const R = String.raw;

export function Intro() {
  return (
    <Sec n="2.0" title="Introduction" zh="引言：向量空间与拓扑——流形的两个极端视角"
      gist={R`流形"局部像 $\mathbb{R}^n$、整体未必"。局部用向量空间描述（切平面近似），整体用拓扑描述（分类与"度量"）。本章把这两套语言的基础打好。`}
      why={R`本书的主线是把流形理论用到物理上。在谈流形之前，必须先会说"映射""商空间""开集""连续""同胚"，也必须熟悉对偶空间与张量这些线性代数对象。`}
      gives={[]}>
      <Tx>{R`本章介绍映射理论、向量空间与拓扑学中的基本概念。我们假定读者具备本科数学的一般知识：集合论、微积分、复分析与线性代数。

为什么一开头就讲这两样看起来毫不相干的东西？因为**向量空间与拓扑，在某种意义上是看流形的两个极端视角**。流形（manifold）是"局部看起来像 $\mathbb{R}^n$（或 $\mathbb{C}^n$）、整体上却未必如此"的空间。

◆ **局部视角——向量空间。**流形上一小块区域可以用欧氏空间 $\mathbb{R}^n$ 来近似，就像曲面上一点附近的一小片可以用该点的切平面来近似。这一视角的语言是线性代数：向量、对偶向量、内积、张量（§2.2）。

◆ **整体视角——拓扑。**拓扑学把流形当作一个整体来研究：用某种"度量尺"去刻画、分类流形。拓扑学通常带一个形容词——代数拓扑、微分拓扑、组合拓扑、一般拓扑……这些形容词指的正是分类时所用的"尺子"（§2.3–2.4）。

§2.1 先准备两样通用工具：**映射**，以及把点"认作相同"的**等价关系**——后者能把一张正方形纸粘成环面、Klein 瓶和射影平面。`}</Tx>
    </Sec>);
}

export function Sec21() {
  return (
    <Sec n="2.1" title="Maps" zh="映射"
      gist={R`映射由定义域、值域、对应规则三者共同确定；单射/满射/双射，复合与逆映射。**等价关系**把集合划分为互不相交的等价类，等价类的集合就是**商空间** $X/\sim$——"粘合"的精确说法。`}
      why={R`后面每一个概念——同胚、连续、拉回、陪集空间、粘合曲面——都是某种映射或某种商。尤其是商空间，它是从简单图形（线段、正方形、圆盘）构造复杂空间（圆周、环面、$\sym{RP}{\RP^2}$、$S^n$）的基本手法。`}
      gives={["2.3", "2.5"]}>
      <Sub n="2.1.1" title="Definitions" zh="定义">
        <p className="muted">本小节概念：<C id="map" /></p>
        <Tx>{R`设 $X$、$Y$ 是集合。**映射**（map 或 mapping）$f$ 是一条规则：对每个 $x\in X$ 指定一个 $y\in Y$。记作`}</Tx>
        <Eq n="2.1" say={R`$f$ 是从集合 $X$ 到集合 $Y$ 的映射：$X$ 的每个元素都被送到 $Y$ 中唯一的一个元素。`}>{R`f:X\to Y.`}</Eq>
        <Tx>{R`若 $f$ 由某个明确的公式给出，也可以写`}</Tx>
        <Eq n="2.2" say={R`同一个映射的"逐点写法"：带竖杠的箭头说明单个元素 $x$ 被送到哪里。`}>{R`f:x\mapsto f(x).`}</Eq>
        <Tx>{R`注意两种箭头的分工：$\to$ 连接的是**集合**（从哪里到哪里），$\mapsto$ 连接的是**元素**（谁变成谁）。

$X$ 中可能有不止一个元素对应同一个 $y\in Y$。所有被 $f$ 送到 $y$ 的元素构成 $X$ 的子集，称为 $y$ 的**逆像**（inverse image）：$f^{-1}(y)=\{x\in X\mid f(x)=y\}$。$X$ 称为映射的**定义域**（domain），$Y$ 称为**值域**（range）。映射的**像**（image）是 $f(X)=\{y\in Y\mid y=f(x)\text{ 对某个 }x\in X\}\subset Y$，也记作 $\operatorname{im}f$。

**不指定定义域与值域，映射就没有定义。**以 $f(x)=\exp x$ 为例：若定义域与值域都是 $\mathbb{R}$，那么 $f(x)=-1$ 没有逆像；若两者都是复平面 $\mathbb{C}$，则 $f^{-1}(-1)=\{(2n+1)\pi\mathrm{i}\mid n\in\mathbb{Z}\}$。定义域 $X$ 与值域 $Y$ 和对应规则 $f$ 本身一样重要。`}</Tx>
        <Box kind="example" n="2.1" title={R`同一个 $\sin$，两种映射`}>{R`设 $f:\mathbb{R}\to\mathbb{R}$，$f(x)=\sin x$，也写作 $f:x\mapsto\sin x$。定义域与值域都是 $\mathbb{R}$，像 $f(\mathbb{R})=[-1,1]$。$0$ 的逆像是 $f^{-1}(0)=\{n\pi\mid n\in\mathbb{Z}\}$。

再取同一个函数 $f(x)=\sin x=(\mathrm{e}^{\mathrm{i}x}-\mathrm{e}^{-\mathrm{i}x})/2\mathrm{i}$，但这次 $f:\mathbb{C}\to\mathbb{C}$。此时像 $f(\mathbb{C})$ 是**整个**复平面 $\mathbb{C}$。（例如 $\sin(\pi/2+\mathrm{i}y)=\cosh y$ 可以取任意 $\ge1$ 的实数——在复平面上 $\sin$ 并不有界。）`}</Box>
        <Stmt id="D2.1" />
        <Box kind="example" n="2.2" title="三个典型">{R`$f:\mathbb{R}\to\mathbb{R}$，$f:x\mapsto ax$（$a\in\mathbb{R}-\{0\}$）是双射，逆映射为 $x\mapsto x/a$。

$f:\mathbb{R}\to\mathbb{R}$，$f:x\mapsto x^2$ 既不是单射（$f(1)=f(-1)$）也不是满射（$-1$ 没有原像）。

$f:\mathbb{R}\to\mathbb{R}$，$f:x\mapsto\exp x$ 是单射（严格单调）但不是满射（取不到 $y\le0$）。`}</Box>
        <Exercise n="2.1" title={R`让 $\sin$ 成为双射`} level="★"
          hint={R`单射要求删去"重复取值"的部分，满射要求把值域缩到像上。`}
          solution={R`$\sin:\mathbb{R}\to\mathbb{R}$ 不是单射（$\sin0=\sin\pi$），也不是满射（$2$ 不在像中）。把定义域限制为 $[-\pi/2,\pi/2]$：$\sin$ 在其上严格递增（导数 $\cos x\ge0$，且只在端点为零），所以是单射；再把值域取成像 $[-1,1]$，就是满射。于是

$$\sin:[-\pi/2,\pi/2]\to[-1,1]$$

是双射，逆映射就是 $\sin^{-1}$（例 2.4）。任何长度为 $\pi$ 的单调区间 $[k\pi-\pi/2,\,k\pi+\pi/2]$ 也可以。`}>
          {R`映射 $f:\mathbb{R}\to\mathbb{R}$，$f:x\mapsto\sin x$ 既非单射也非满射。限制定义域与值域，使 $f$ 成为双射。`}
        </Exercise>
        <Box kind="example" n="2.3" title={R`$\mathrm{GL}(n,\mathbb{R})$ 中的矩阵`}>{R`设 $M$ 是一般线性群 $\mathrm{GL}(n,\mathbb{R})$ 的元素，其矩阵表示为行列式不为零的 $n\times n$ 矩阵。则 $M:\mathbb{R}^n\to\mathbb{R}^n$，$x\mapsto Mx$ 是双射（逆映射为 $x\mapsto M^{-1}x$）。若 $\det M=0$，它既非单射也非满射：存在非零 $x$ 使 $Mx=0=M0$，而像是一个真子空间。`}</Box>
        <Tx>{R`**几类特殊映射与复合。**

◆ **常值映射**（constant map）$c:X\to Y$：$c(x)=y_0$，$y_0$ 是 $Y$ 中固定的元素，$x$ 是 $X$ 中任意元素。

◆ **限制**（restriction）：给定 $f:X\to Y$ 与 $A\subset X$，把 $f$ 只用在 $A$ 上，记作 $f|_A:A\to Y$。

◆ **复合映射**（composite map）：给定 $f:X\to Y$ 与 $g:Y\to Z$，复合 $g\circ f:X\to Z$ 定义为 $g\circ f(x)=g(f(x))$。注意书写顺序："先做的写在右边"。

◆ **交换图**（commutative diagram）：若一张映射图中，任意两个集合之间的复合映射都不依赖于走哪条路径，就称这张图是交换的。例如在 \figref{2.1} 中，$f\circ g=h\circ j$，且 $f\circ g=k$，等等。`}</Tx>
        <Figure n="2.1" caption="映射的交换图：从 $X$ 到 $W$ 的三条路径给出同一个映射。" width="45%" />
        <Exercise n="2.2" title="复合的顺序" level="★"
          hint={R`$g\circ f$ 先做 $f$；$f\circ g$ 先做 $g$。`}
          solution={R`$g\circ f(x)=g(f(x))=g(x^2)=\exp(x^2)$；

$f\circ g(x)=f(g(x))=f(\exp x)=(\exp x)^2=\exp(2x)$。

两者不同：一般 $g\circ f\neq f\circ g$，复合不满足交换律。顺带看一下性质：$\exp(x^2)$ 的像是 $[1,\infty)$，是偶函数，既非单射也非满射；$\exp(2x)$ 是单射，像为 $(0,\infty)$。`}>
          {R`设 $f:\mathbb{R}\to\mathbb{R}$ 由 $f:x\mapsto x^2$ 定义，$g:\mathbb{R}\to\mathbb{R}$ 由 $g:x\mapsto\exp x$ 定义。$g\circ f:\mathbb{R}\to\mathbb{R}$ 与 $f\circ g:\mathbb{R}\to\mathbb{R}$ 各是什么？`}
        </Exercise>
        <Tx>{R`若 $A\subset X$，**包含映射**（inclusion map）$i:A\to X$ 定义为对任意 $a\in A$，$i(a)=a$，常写作 $i:A\hookrightarrow X$。**恒等映射** $\mathrm{id}_X:X\to X$ 是 $A=X$ 时的包含映射。

若 $f:X\to Y$（$f:x\mapsto f(x)$）是双射，就存在**逆映射**（inverse map）$f^{-1}:Y\to X$，$f^{-1}:f(x)\mapsto x$，它也是双射。$f$ 与 $f^{-1}$ 满足 $f\circ f^{-1}=\mathrm{id}_Y$、$f^{-1}\circ f=\mathrm{id}_X$。**反过来**，若 $f:X\to Y$ 与 $g:Y\to X$ 满足 $f\circ g=\mathrm{id}_Y$ 且 $g\circ f=\mathrm{id}_X$，则 $f$、$g$ 都是双射。这可以由下面的习题得到——它后来在同胚的定义中直接用到（\sref{D2.9}）。`}</Tx>
        <Exercise n="2.3" title="单边逆" level="★"
          hint={R`单射：从 $f(x)=f(x')$ 两边作用 $g$。满射：任给 $x\in X$，它是谁的像？`}
          solution={R`设 $g\circ f=\mathrm{id}_X$。

**$f$ 是单射。**若 $f(x)=f(x')$，两边作用 $g$：$x=g(f(x))=g(f(x'))=x'$。

**$g$ 是满射。**任给 $x\in X$，令 $y=f(x)\in Y$，则 $g(y)=g(f(x))=x$，即 $x$ 有原像。

把同样的论证用于 $f\circ g=\mathrm{id}_Y$（交换 $f$ 与 $g$ 的角色），得 $g$ 是单射、$f$ 是满射。合起来，$f$、$g$ 都是双射；并且 $g=g\circ(f\circ f^{-1})=(g\circ f)\circ f^{-1}=f^{-1}$。

注意只有一边不够：$f:\mathbb{R}\to\mathbb{R}^2$，$f(x)=(x,0)$ 与 $g(x,y)=x$ 满足 $g\circ f=\mathrm{id}_{\mathbb{R}}$，但 $f$ 不满、$g$ 不单。`}>
          {R`证明：若 $f:X\to Y$ 与 $g:Y\to X$ 满足 $g\circ f=\mathrm{id}_X$，则 $f$ 是单射、$g$ 是满射。把它也用于 $f\circ g=\mathrm{id}_Y$，就得到上面的结论。`}
        </Exercise>
        <Box kind="example" n="2.4" title="逆映射">{R`$f:\mathbb{R}\to(0,\infty)$，$f:x\mapsto\exp x$ 是双射，逆映射为 $f^{-1}:(0,\infty)\to\mathbb{R}$，$f^{-1}:x\mapsto\ln x$。（对比例 2.2：值域从 $\mathbb{R}$ 换成 $(0,\infty)$ 后，$\exp$ 就成了满射。）

$g:(-\pi/2,\pi/2)\to(-1,1)$，$g:x\mapsto\sin x$ 是双射，逆映射为 $g^{-1}:x\mapsto\sin^{-1}x$。`}</Box>
        <Exercise n="2.4" title={R`$n$ 维欧氏群 $E^n$`} level="★★"
          hint={R`给出双边逆映射即可（用习题 2.3）。对 $(R,a)$，猜 $(R,a)^{-1}=(R^{-1},b)$，用乘法规则定出 $b$。`}
          solution={R`由习题 2.3，只需对每个映射找出一个两边都成立的逆。

**平移** $a:x\mapsto x+a$：逆为 $x\mapsto x-a$，即 $-a$ 的平移。

**转动** $R:x\mapsto Rx$（$R\in\mathrm{O}(n)$，$R^{\rm t}R=1$）：逆为 $x\mapsto R^{-1}x=R^{\rm t}x$，仍是 $\mathrm{O}(n)$ 中的转动。

**一般元素** $(R,a):x\mapsto Rx+a$：解 $y=Rx+a$ 得 $x=R^{-1}y-R^{-1}a$，所以

$$(R,a)^{-1}=(R^{-1},\,-R^{-1}a).$$

用乘法规则验证两边：$(R,a)\circ(R^{-1},-R^{-1}a)=(RR^{-1},\,R(-R^{-1}a)+a)=(1,0)$；$(R^{-1},-R^{-1}a)\circ(R,a)=(R^{-1}R,\,R^{-1}a-R^{-1}a)=(1,0)$。$(1,0)$ 正是恒等映射，故三类映射都是双射。

（顺便注意：$E^n$ 的乘法 $(R_2,a_2)\circ(R_1,a_1)=(R_2R_1,R_2a_1+a_2)$ 不交换——先转再平移与先平移再转不同。）`}>
          {R`$n$ 维欧氏群 $E^n$ 由 $n$ 维平移 $a:x\mapsto x+a$（$x,a\in\mathbb{R}^n$）与 $\mathrm{O}(n)$ 转动 $R:x\mapsto Rx$（$R\in\mathrm{O}(n)$）构成。$E^n$ 的一般元素 $(R,a)$ 作用在 $x$ 上为 $(R,a):x\mapsto Rx+a$。乘积定义为 $(R_2,a_2)\times(R_1,a_1):x\mapsto R_2(R_1x+a_1)+a_2$，即 $(R_2,a_2)\circ(R_1,a_1)=(R_2R_1,\,R_2a_1+a_2)$。证明映射 $a$、$R$ 与 $(R,a)$ 都是双射，并求出它们的逆映射。`}
        </Exercise>
        <Tx>{R`**同态与同构。**设集合 $X$、$Y$ 上赋予了某些代数结构（比如乘法或加法）。若 $f:X\to Y$ 保持这些代数结构，就称 $f$ 为**同态**（homomorphism）。例如 $X$ 上有乘法，同态就保持乘法：$f(ab)=f(a)f(b)$——左边的 $ab$ 用 $X$ 的乘法规则计算，右边的 $f(a)f(b)$ 用 $Y$ 的乘法规则计算。双射的同态称为**同构**（isomorphism），此时称 $X$ 与 $Y$ **同构**，记作 $X\cong Y$。`}</Tx>
        <Erratum kind="erratum" loc="p.89 末行" title={R`"denoted $x\cong y$" 应为 $X\cong Y$`}>{R`原书写"$X$ is said to be isomorphic to $Y$, denoted $x\cong y$"。同构是两个**集合**（代数结构）之间的关系，应写大写的 $X\cong Y$。本站已改正。`}</Erratum>
      </Sub>

      <Sub n="2.1.2" title="Equivalence relation and equivalence class" zh="等价关系与等价类">
        <p className="muted">本小节概念：<C id="quotient" /></p>
        <Tx>{R`数学中最重要的概念之一是**等价关系**与**等价类**。它们本身与映射没有直接关系，但在继续之前先在这里定义它们最合适。

集合 $X$ 上的**关系** $R$ 是 $X^2=X\times X$ 的一个子集。若 $(a,b)\in X^2$ 属于 $R$，就写 $aRb$。例如关系 $>$ 是 $\mathbb{R}^2$ 的子集（直线 $y=x$ 下方的半平面）：$(a,b)\in{>}$ 意味着 $a>b$。

我们要的是一种特殊的关系：它像"等于"一样好用，但比"等于"宽松——它允许把不同的东西**认作相同**。`}</Tx>
        <Stmt id="D2.2" />
        <Exercise n="2.5" title="奇偶性" level="★"
          hint={R`$m\sim n$ 当且仅当 $m-n$ 是偶数。`}
          solution={R`"余数相同"等价于"$m-n$ 被 2 整除"。(i) 自反：$n-n=0$ 是偶数。(ii) 对称：$m-n$ 偶 ⇒ $n-m=-(m-n)$ 偶。(iii) 传递：$m-n$、$n-l$ 都偶 ⇒ $m-l=(m-n)+(n-l)$ 偶。所以 $\sim$ 是等价关系。（直接用"余数相同"也行："相同"这个关系本身自反、对称、传递。）`}>
          {R`整数除以 2，余数为 0 或 1。若两个整数 $n$ 与 $m$ 的余数相同，就记作 $m\sim n$。证明 $\sim$ 是 $\mathbb{Z}$ 上的等价关系。`}
        </Exercise>
        <Tx>{R`**等价类把集合切成互不相交的块。**给定集合 $X$ 与等价关系 $\sim$，$X$ 被划分成**互不相交**的子集，称为**等价类**（equivalence class）。类 $[a]$ 由 $X$ 中所有满足 $x\sim a$ 的元素 $x$ 组成：`}</Tx>
        <Eq n="2.3" keyEq title="等价类" say={R`$a$ 的等价类就是所有"被认作与 $a$ 相同"的元素；商空间把这一整类当作一个点。`}>{R`[a]=\{x\in X\mid x\sim a\}`}</Eq>
        <Tx>{R`由于 $a\sim a$，$[a]$ 不会是空集。关键事实是：**两个类要么相等，要么不交。**`}</Tx>
        <Derivation title={R`证明：若 $[a]\cap[b]\neq\emptyset$，则 $[a]=[b]$`} steps={[
          { tex: R`c\in[a]\cap[b]\ \Rightarrow\ c\sim a,\ c\sim b\ \Rightarrow\ a\sim b`, why: R`由 $c\sim a$ 用对称性得 $a\sim c$，再与 $c\sim b$ 用传递性。` },
          { tex: R`a'\in[a]\ \Rightarrow\ a'\sim a,\ a\sim b\ \Rightarrow\ a'\sim b\ \Rightarrow\ a'\in[b]`, why: R`传递性。于是 $[a]\subset[b]$。` },
          { tex: R`[b]\subset[a]`, why: R`同理（由对称性 $b\sim a$）。` },
        ]} result={R`$[a]=[b]$。所以任意两类满足 $[a]=[b]$ 或 $[a]\cap[b]=\emptyset$。`} />
        <Tx>{R`这样，集合 $X$ 被分解为互不相交的等价类。所有类组成的集合称为**商空间**（quotient space），记作 $X/\sim$。元素 $a$（或 $[a]$ 中的任何元素）称为类 $[a]$ 的**代表元**（representative）。

在习题 2.5 中，等价关系把整数分成两类：偶数与奇数。偶数类的代表元可取 0，奇数类取 1。这个商空间记作 $\mathbb{Z}/\sim$，它同构于 2 阶**循环群** $\mathbb{Z}_2$，其运算为 $0+0=0$、$0+1=1+0=1$、$1+1=0$。若按除以 $n$ 的余数把整数分类，商空间同构于 $n$ 阶循环群 $\mathbb{Z}_n$。（第 3 章 \eqref{3.5} 把它写成 $\mathbb{Z}/n\mathbb{Z}\cong\mathbb{Z}_n$。）

**商空间可以是几何图形。**设 $X$ 是通常意义下的"空间"。（严格地说，这里需要 §2.3 定义的拓扑空间；暂时依靠直观。）此时商空间可以实现为几何图形。设 $x,y\in\mathbb{R}$，规定：若存在 $n\in\mathbb{Z}$ 使 $y=x+2\pi n$，则 $x\sim y$。容易验证这是等价关系。类 $[x]$ 是集合 $\{\ldots,x-2\pi,x,x+2\pi,\ldots\}$，可以用 $x\in[0,2\pi)$ 作为代表元，见 \figref{2.2}(a)。`}</Tx>
        <Figure n="2.2" caption={R`(a) 所有点 $x+2n\pi$（$n\in\mathbb{Z}$）属于同一个等价类 $[x]$，可取 $x\in[0,2\pi)$ 为代表元。(b) 商空间 $\mathbb{R}/\sim$ 是圆周 $S^1$。`} width="55%" />
        <Tx>{R`注意 $0$ 与 $2\pi$ 在 $\mathbb{R}$ 中是不同的点，但按照这个等价关系，它们在 $\mathbb{R}/\sim$ 中被视为同一元素。于是商空间 $\mathbb{R}/\sim$ 就是圆周 $S^1=\{\mathrm{e}^{\mathrm{i}\theta}\mid0\le\theta<2\pi\}$，见 \figref{2.2}(b)。

请特别注意一件事：对无穷小的 $\varepsilon$，点 $\varepsilon$ 与点 $2\pi-\varepsilon$ **在 $S^1$ 上很接近**——角度 $\varepsilon$ 与角度 $2\pi-\varepsilon$ 确实很近——但在 $\mathbb{R}$ 中它们相距将近 $2\pi$。**商空间改变了"哪些点彼此接近"**。"点与点之间的接近"正是拓扑学的核心要素之一，§2.3 会把它精确化为"开集"。`}</Tx>
        <Box kind="example" n="2.5" title="用粘合构造曲面">
          <Tx>{R`**(a) 柱面与 Möbius 带。**设 $X$ 是正方形 $\{(x,y)\in\mathbb{R}^2\mid|x|\le1,\ |y|\le1\}$。把一对相对的边上的点粘合，例如 $(-1,y)\sim(1,y)$，就得到柱面，见 \figref{2.3}(a)。若粘合 $(-1,-y)\sim(1,y)$，得到的是 **Möbius 带**，见 \figref{2.3}(b)。

[注：不熟悉 Möbius 带的读者可以取一条纸带，扭转 $\pi$ 后把两端粘起来。由于扭转，纸带的一面与另一面连在了一起，曲面只有一侧。Möbius 带是**不可定向**（non-orientable）曲面的例子，而柱面有确定的两侧，称为**可定向**（orientable）的。可定向性将在 §5.5 用微分形式讨论。]`}</Tx>
          <Figure n="2.3" caption={R`(a) 把边 $|x|=1$ 沿箭头方向粘合，得到柱面。(b) 若按相反方向粘合，得到 Möbius 带。`} width="62%" />
          <Tx>{R`**(b) 环面。**设 $(x_1,y_1)$、$(x_2,y_2)$ 是 $\mathbb{R}^2$ 中两点，规定：若 $x_2=x_1+2\pi n_x$ 且 $y_2=y_1+2\pi n_y$（$n_x,n_y\in\mathbb{Z}$），则 $(x_1,y_1)\sim(x_2,y_2)$。这是等价关系，商空间 $\mathbb{R}^2/\sim$ 就是**环面** $T^2$（甜甜圈的表面），见 \figref{2.4}(a)。等价地，$T^2$ 可以表示为一个对边按 \figref{2.4}(b) 粘合的矩形。`}</Tx>
          <Figure n="2.4" caption={R`若把所有点 $(x+2\pi n_x,\,y+2\pi n_y)$（$n_x,n_y\in\mathbb{Z}$）如 (a) 那样认作相同，商空间可取为阴影区域，其边按 (b) 粘合。这样得到的商空间就是环面 $T^2$。`} width="90%" />
          <Tx>{R`**(c) Klein 瓶与射影平面。**如果用其他方式粘合矩形的边呢？\figref{2.5} 给出两种可能。所得空间分别称为 **Klein 瓶**（\figref{2.5}(a)）与**射影平面**（\figref{2.5}(b)）。两者都无法在不自交的情况下实现（**嵌入**）到欧氏空间 $\mathbb{R}^3$ 中，且都是不可定向的。`}</Tx>
          <Figure n="2.5" caption="Klein 瓶 (a) 与射影平面 (b)。" width="90%" />
          <Tx>{R`我们把射影平面记作 $\sym{RP}{\RP^2}$，可以这样想象它。考虑单位向量 $\boldsymbol{n}$，并把 $\boldsymbol{n}$ 与 $-\boldsymbol{n}$ 认作相同，见 \figref{2.6}。描述一根没有头尾之分的棒（例如向列相液晶分子）时，正需要这种认同。我们很想用 $S^2$ 上的一点来标记"向量" $\boldsymbol{n}$，但这差了一点：两个对径点 $\boldsymbol{n}=(\theta,\phi)$ 与 $-\boldsymbol{n}=(\pi-\theta,\pi+\phi)$ 代表同一个状态。于是可以取北半球作为陪集空间 $S^2/\sim$，因为只需要 $S^2$ 的一半。然而这个陪集空间并不只是普通的半球面：**赤道上的对径点被粘在一起**。把这个半球面连续地变形成正方形，就得到 \figref{2.5}(b) 中的正方形。`}</Tx>
          <Figure n="2.6" caption={R`若 $\boldsymbol{n}$ 没有头尾，就无法区分 $\boldsymbol{n}$ 与 $-\boldsymbol{n}$，必须把它们粘合。由粘合 $\boldsymbol{n}\sim-\boldsymbol{n}$ 得到射影平面：$\sym{RP}{\RP^2}\simeq S^2/\sim$。只需取半个球面来描述这个陪集空间，但要注意赤道上的对径点被粘合。`} width="60%" />
          <Tx>{R`**(d) 亏格 $g$ 的曲面。**把 \figref{2.7}(a) 中八边形的边成对粘合，商空间是带两个环柄的环面，记作 $\Sigma_2$，见 \figref{2.7}(b)。用类似的粘合可以得到带 $g$ 个环柄的环面 $\Sigma_g$，见章末习题 2.1。整数 $g$ 称为这个环面的**亏格**（genus）。`}</Tx>
          <Figure n="2.7" caption="把 (a) 的边粘合，得到带两个洞（亏格为二）的环面。" width="80%" />
          <Tx>{R`**(e) 把圆盘边界粘成一点：球面。**设 $D^2=\{(x,y)\in\mathbb{R}^2\mid x^2+y^2\le1\}$ 是闭圆盘。把边界 $\{(x,y)\in\mathbb{R}^2\mid x^2+y^2=1\}$ 上的点全部粘合：若 $x_1^2+y_1^2=x_2^2+y_2^2=1$，则 $(x_1,y_1)\sim(x_2,y_2)$。商空间 $D^2/\sim$ 就是球面 $S^2$，也写作 $D^2/S^1$，见 \figref{2.8}。一般地，取 $n$ 维圆盘 $D^n=\{(x^1,\ldots,x^n)\in\mathbb{R}^n\mid(x^1)^2+\cdots+(x^n)^2\le1\}$，并把其边界 $S^{n-1}$ 上的点全部粘合，就得到 $n$ 维球面 $S^n$，即 $D^n/S^{n-1}=S^n$。`}</Tx>
          <Figure n="2.8" caption={R`边界 $S^1$ 被粘成一点的圆盘 $D^2$ 就是球面 $S^2$。`} width="80%" />
        </Box>
        <Erratum kind="erratum" loc="p.91–93 例 2.5" title="三处笔误">{R`**(1)** (a) 中原书把正方形写成 $\{(x,y)\in\mathbb{R}^2\mid|x|\ge1,\ |y|\ge1\}$——那是去掉一个"十字"后的四个无界角区，不是正方形。应为 $|x|\le1,\ |y|\le1$，与 \figref{2.3} 一致。

**(2)** (b) 中商空间印作 "$\mathbb{R}_2/\sim$"，应为 $\mathbb{R}^2/\sim$。

**(3)** (e) 中原书写 $D^n=\{(x^0,\ldots,x^n)\in\mathbb{R}^{n+1}\mid(x^0)^2+\cdots+(x^n)^2\le1\}$，这是 $n+1$ 维圆盘 $D^{n+1}$，它的边界是 $S^n$ 而不是 $S^{n-1}$，与紧接着的 $D^n/S^{n-1}=S^n$ 矛盾。正确写法是 $D^n=\{(x^1,\ldots,x^n)\in\mathbb{R}^n\mid\sum_i(x^i)^2\le1\}$，其边界为 $S^{n-1}$。检验 $n=2$：$D^2$ 是平面圆盘，边界 $S^1$，$D^2/S^1=S^2$，与上文一致。`}</Erratum>
        <Tx>{R`下面的交互图把例 2.5 的全部构造（以及更多）放在一起。规则只有一条：多边形的边按字母配对粘合，箭头方向决定"怎样对齐"。粘合后，数一数剩下多少个不同的顶点 $V$、多少条不同的棱 $E$，多边形本身是 1 个面，于是 Euler 示性数 $\chi=V-E+1$（§2.4.4）；若某个字母的两条边在绕多边形一周时**同向**出现，曲面就不可定向。`}</Tx>
        <GluingLab />
        <Box kind="physics" title="物理中的商空间">{R`◆ **周期边界条件**：把晶体放进边长 $L$ 的盒子并要求波函数周期，相当于把 $\mathbb{R}^3$ 按 $\boldsymbol{x}\sim\boldsymbol{x}+L\boldsymbol{n}$ 粘成 $T^3$（§2.3.5 还会再提到）。

◆ **规范等价**：两个矢势若只差一个梯度，就描述同一个磁场；物理的组态空间是"矢势模去规范变换"的商空间。

◆ **序参量空间**：向列相液晶的 $\sym{RP}{\RP^2}$（\figref{2.6}）；以后第 4 章会用同伦群对这类空间中的拓扑缺陷分类。`}</Box>
        <Exercise n="2.6" title={R`模群 $\mathrm{SL}(2,\mathbb{Z})$ 给出的等价关系`} level="★★"
          hint={R`自反取单位矩阵，对称取逆矩阵（注意它仍是整数矩阵、行列式为 1），传递把两个分式线性变换复合，对应于矩阵相乘。还要检查 $\tau'$ 仍在上半平面：算 $\operatorname{Im}\tau'$。`}
          solution={R`记 $A\cdot\tau\equiv(a\tau+b)/(c\tau+d)$。

**$A\cdot\tau$ 落在上半平面。**把分母实化：

$$\frac{a\tau+b}{c\tau+d}=\frac{(a\tau+b)(c\bar\tau+d)}{|c\tau+d|^2}=\frac{ac|\tau|^2+ad\tau+bc\bar\tau+bd}{|c\tau+d|^2},$$

取虚部：$\operatorname{Im}(A\cdot\tau)=(ad-bc)\operatorname{Im}\tau/|c\tau+d|^2=\operatorname{Im}\tau/|c\tau+d|^2>0$。这里要求 $\operatorname{Im}\tau>0$：此时 $c\tau+d\neq0$（$c,d$ 不全为零，因为 $ad-bc=1$），分式有意义（见下方勘误）。

**复合 = 矩阵乘积。**直接代入可得 $B\cdot(A\cdot\tau)=(BA)\cdot\tau$：设 $B=\begin{pmatrix}a'&b'\\c'&d'\end{pmatrix}$，分子分母同乘 $c\tau+d$，

$$B\cdot(A\cdot\tau)=\frac{a'(a\tau+b)+b'(c\tau+d)}{c'(a\tau+b)+d'(c\tau+d)}=\frac{(a'a+b'c)\tau+(a'b+b'd)}{(c'a+d'c)\tau+(c'b+d'd)}=(BA)\cdot\tau.$$

**三条公理。**(i) 自反：单位矩阵 $1\in\mathrm{SL}(2,\mathbb{Z})$，$1\cdot\tau=\tau$。(ii) 对称：若 $\tau'=A\cdot\tau$，则 $\tau=A^{-1}\cdot\tau'$，而 $A^{-1}=\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$ 仍是行列式为 1 的整数矩阵。(iii) 传递：$\tau'=A\cdot\tau$、$\tau''=B\cdot\tau'$ ⇒ $\tau''=(BA)\cdot\tau$，$BA\in\mathrm{SL}(2,\mathbb{Z})$（$\det(BA)=\det B\det A=1$）。

所以 $\sim$ 是等价关系。商空间 $\mathrm{H}/\mathrm{SL}(2,\mathbb{Z})$ 是环面复结构的模空间（图 8.3）。`}>
          <Tx>{R`设 $\mathrm{H}$ 为复上半平面 $\{\tau\in\mathbb{C}\mid\operatorname{Im}\tau>0\}$。定义群`}</Tx>
          <Eq n="2.4" say="模群：行列式为 1 的二阶整数矩阵。它作用在上半平面上，把“看起来不同、实则等价”的环面形状粘在一起。">{R`\mathrm{SL}(2,\mathbb{Z})\equiv\left\{\begin{pmatrix}a&b\\c&d\end{pmatrix}\ \middle|\ a,b,c,d\in\mathbb{Z},\ ad-bc=1\right\}.`}</Eq>
          <Tx>{R`对 $\tau,\tau'\in\mathrm{H}$，规定 $\tau\sim\tau'$，若存在矩阵 $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in\mathrm{SL}(2,\mathbb{Z})$ 使`}</Tx>
          <Eq n="2.5" say={R`分式线性（模）变换：两个复参数只差一个模群元素的作用时被认作等价。`}>{R`\tau'=(a\tau+b)/(c\tau+d).`}</Eq>
          <Tx>{R`证明这是等价关系。（商空间 $\mathrm{H}/\mathrm{SL}(2,\mathbb{Z})$ 见图 8.3。）`}</Tx>
        </Exercise>
        <Erratum kind="erratum" loc="p.93 习题 2.6" title={R`上半平面应取 $\operatorname{Im}\tau>0$`}>{R`原书写 $\mathrm{H}=\{\tau\in\mathbb{C}\mid\operatorname{Im}\tau\ge0\}$。若允许实轴上的点，分式 \eqref{2.5} 可能没有定义：取 $\tau=0$、$A=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$，则 $c\tau+d=0$。而当 $\operatorname{Im}\tau>0$ 时，$\operatorname{Im}\tau'=\operatorname{Im}\tau/|c\tau+d|^2>0$，$\mathrm{SL}(2,\mathbb{Z})$ 把上半平面映到自身。上半平面的标准定义是 $\operatorname{Im}\tau>0$，本站已改正。`}</Erratum>
        <Box kind="example" n="2.6" title="陪集与商群">{R`设 $G$ 是群，$H$ 是 $G$ 的子群。对 $g,g'\in G$，规定：若存在 $h\in H$ 使 $g'=gh$，则 $g\sim g'$。（这是等价关系：$g=ge$；$g'=gh\Rightarrow g=g'h^{-1}$；$g''=g'h'=g(hh')$。）等价类 $[g]=\{gh\mid h\in H\}$ 记作 $gH$，称为（左）**陪集**（coset）。$gH$ 满足 $gH\cap g'H=\emptyset$ 或 $gH=g'H$。商空间记作 $G/H$。

一般地 $G/H$ 不是群，除非 $H$ 是 $G$ 的**正规子群**（normal subgroup），即对任意 $g\in G$、$h\in H$ 都有 $ghg^{-1}\in H$。若 $H$ 是正规子群，$G/H$ 称为**商群**（quotient group），其运算为 $[g]*[g']=[gg']$，$*$ 是 $G/H$ 中的乘积。

**良定义的检验。**取 $gh\in[g]$ 与 $g'h'\in[g']$。由正规性，存在 $h''\in H$ 使 $hg'=g'h''$（即 $h''=g'^{-1}hg'\in H$），从而

$$ghg'h'=gg'h''h'\in[gg'],$$

所以 $[gg']$ 与代表元的选取无关。$G/H$ 的单位元是等价类 $[e]$，$[g]$ 的逆元是 $[g^{-1}]$。

对 Abel 群，$ghg^{-1}=h\in H$ 自动成立，**每个子群都是正规子群**——第 3 章的同调群 $H_r=Z_r/B_r$ 就是这样的商群。`}</Box>
        <Exercise n="2.7" title="共轭类" level="★"
          hint={R`自反取 $g=e$；对称取 $g^{-1}$；传递把两个共轭复合。`}
          solution={R`(i) 自反：$a=eae^{-1}$。(ii) 对称：若 $b=gag^{-1}$，则 $a=g^{-1}bg=(g^{-1})b(g^{-1})^{-1}$，故 $b\simeq a$。(iii) 传递：若 $b=gag^{-1}$、$c=hbh^{-1}$，则 $c=hgag^{-1}h^{-1}=(hg)a(hg)^{-1}$，故 $a\simeq c$。所以 $\simeq$ 是等价关系，$G$ 被分成互不相交的共轭类。对 Abel 群，$gag^{-1}=a$，每个共轭类只有一个元素。`}>
          {R`设 $G$ 是群。若存在 $g\in G$ 使 $b=gag^{-1}$，则称 $a,b\in G$ 彼此**共轭**，记作 $a\simeq b$。证明 $\simeq$ 是等价关系。等价类 $[a]=\{gag^{-1}\mid g\in G\}$ 称为**共轭类**（conjugacy class）。`}
        </Exercise>
      </Sub>
    </Sec>);
}
