// §2.3 拓扑空间 —— 式 (2.25)–(2.27)，定义 2.3–2.8，定理 2.3，例 2.7–2.12，习题 2.13–2.17；交互图：用逆像检验连续性
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Erratum, Details, C } from "@kit";
import { ContinuityLab } from "./_ch02_demos.jsx";

const R = String.raw;

export function Sec23() {
  return (
    <Sec n="2.3" title="Topological spaces" zh="拓扑空间"
      gist={R`**拓扑** = 选定哪些子集叫开集（含 $\emptyset$、$X$，对任意并、有限交封闭）。度量给出开球 $U_\varepsilon(x)$ 与度量拓扑；**连续** = 开集的逆像是开集；邻域、Hausdorff、闭集与边界；**紧致** = 每个开覆盖有有限子覆盖（$\mathbb{R}^n$ 中 ⇔ 闭且有界）；连通、弧连通、单连通。`}
      why={R`物理学家习惯以为所有空间都带距离，但许多空间（商空间、规范轨道空间……）并不自然地带度量。拓扑空间是本书所用的最一般结构：度量空间 $\subset$ 流形 $\subset$ 拓扑空间。下一节的同胚与拓扑不变量全部建立在这里的定义之上。`}
      gives={["2.25", "2.26", "2.27"]}>
      <Tx>{R`我们所处理的最一般的结构是**拓扑空间**。物理学家往往以为自己面对的所有空间都配有度量（距离），但并非总是如此。事实上，度量空间只是流形的一部分，流形又只是拓扑空间的一部分。

§2.1 结尾我们看到：商空间改变了"哪些点彼此接近"。拓扑学的出发点就是：**不用距离，而用"开集"来描述接近**。`}</Tx>
      <Sub n="2.3.1" title="Definitions" zh="定义">
        <p className="muted">本小节概念：<C id="topology" /></p>
        <Stmt id="D2.3" />
        <Tx>{R`有时也单独称 $X$ 为拓扑空间。$U_i$ 称为**开集**（open sets），称 $\mathcal{T}$ 给出 $X$ 的一个**拓扑**（topology）。

三条公理的直观：开集是"每一点周围都留有余地"的集合。任意多个这样的集合并起来仍留有余地；但无穷多个交起来，余地可能被挤没——$\bigcap_{n\in\mathbb{N}}(-1/n,1/n)=\{0\}$。所以只要求**有限**交。`}</Tx>
        <Erratum kind="erratum" loc="p.101 定义 2.3 (ii)" title={R`"If $\mathcal{T}$ is any subcollection of $I$" 应为 $J$`}>{R`原书 (ii) 印作 "If $\mathcal{T}$ is any (maybe infinite) subcollection of $I$, the family $\{U_j\mid j\in J\}$ …"。这里要的是指标集 $I$ 的任意子集 $J$，与 (iii) 中的"$K$ 是 $I$ 的有限子族"对应；$\mathcal{T}$ 是开集族本身，不是 $I$ 的子集。本站已改正。`}</Erratum>
        <Box kind="example" n="2.7" title="三种拓扑">{R`**(a) 离散拓扑。**若 $X$ 是集合，$\mathcal{T}$ 是 $X$ 的**全部**子集构成的族，则 (i)–(iii) 自动满足。这个拓扑称为**离散拓扑**（discrete topology）。

**(b) 平凡拓扑。**设 $X$ 是集合，$\mathcal{T}=\{\emptyset,X\}$。显然 $\mathcal{T}$ 满足 (i)–(iii)，这个拓扑称为**平凡拓扑**（trivial topology）。一般而言，离散拓扑太严苛、平凡拓扑太平凡，都无法在 $X$ 上给出有意思的结构。（离散拓扑下任何映射 $X\to Y$ 都连续；平凡拓扑下任何映射 $Y\to X$ 都连续。）

**(c) 通常拓扑。**设 $X$ 是实直线 $\mathbb{R}$。所有开区间 $(a,b)$ 及其并定义了一个拓扑，称为**通常拓扑**（usual topology）；$a$、$b$ 可以分别是 $-\infty$ 与 $\infty$。类似地可以定义 $\mathbb{R}^n$ 的通常拓扑。［取乘积 $(a_1,b_1)\times\cdots\times(a_n,b_n)$ 及其并……］`}</Box>
        <Exercise n="2.13" title="为什么只允许有限交" level="★"
          hint={R`一个单点集 $\{x\}$ 可以写成怎样的开区间的交？`}
          solution={R`对任意 $x\in\mathbb{R}$，$\{x\}=\bigcap_{n\in\mathbb{N}}(x-1/n,\,x+1/n)$。若允许无限交，单点集 $\{x\}$ 就成了开集。于是任意子集 $A=\bigcup_{x\in A}\{x\}$ 作为开集的并也是开集——所有子集都开，这正是离散拓扑。离散拓扑下，例如任何函数 $\mathbb{R}\to\mathbb{R}$ 都连续，"接近"的概念完全消失了，因而没有意思。`}>
          {R`在定义 2.3 中，公理 (ii) 与 (iii) 看上去有些不对称。证明：若在 (iii) 中允许无限交，$\mathbb{R}$ 的通常拓扑就退化为离散拓扑（因而没什么意思）。`}
        </Exercise>
        <Tx>{R`**度量与度量拓扑。**$X$ 上的**度量**（metric）$d:X\times X\to\mathbb{R}$ 是满足下列条件的函数：

(i) $d(x,y)=d(y,x)$；

(ii) $d(x,y)\ge0$，等号当且仅当 $x=y$ 时成立；

(iii) $d(x,y)+d(y,z)\ge d(x,z)$，

对任意 $x,y,z\in X$。若 $X$ 赋有度量 $d$，就可以把 $X$ 做成拓扑空间：其开集由"开圆盘"`}</Tx>
        <Eq n="2.25" keyEq title="开球" say={R`以 $x$ 为中心、半径 $\varepsilon$ 的开球：所有与 $x$ 距离小于 $\varepsilon$ 的点。度量拓扑的开集就是这些开球的并。`}>{R`U_\varepsilon(x)=\{y\in X\mid d(x,y)<\varepsilon\}`}</Eq>
        <Tx>{R`及其所有可能的并给出。这样定义的拓扑 $\mathcal{T}$ 称为由 $d$ 决定的**度量拓扑**（metric topology），拓扑空间 $(X,\mathcal{T})$ 称为**度量空间**（metric space）。［习题：验证度量空间 $(X,\mathcal{T})$ 确实是拓扑空间。］`}</Tx>
        <Erratum kind="erratum" loc="p.101 式 (2.25)" title={R`左边应为 $U_\varepsilon(x)$`}>{R`原书 \eqref{2.25} 左边印作 $U_\varepsilon(X)$。开球以**点** $x$ 为中心（右边的条件 $d(x,y)<\varepsilon$ 中出现的是 $x$），应写 $U_\varepsilon(x)$。本站已改正。`}</Erratum>
        <Details summary="［正文中的习题］度量空间是拓扑空间——解答">{R`令 $\mathcal{T}$ 为所有开球之并的族（空的并是 $\emptyset$）。

(i) $\emptyset\in\mathcal{T}$（空并）；$X=\bigcup_{x\in X}U_1(x)\in\mathcal{T}$。

(ii) 开球之并的任意并仍是开球之并。

(iii) 只需证明两个开集之交在 $\mathcal{T}$ 中（有限交用归纳法）。由分配律 $(\bigcup_iA_i)\cap(\bigcup_jB_j)=\bigcup_{i,j}(A_i\cap B_j)$，又只需证明两个开球之交是开球之并。设 $y\in U_{\varepsilon_1}(x_1)\cap U_{\varepsilon_2}(x_2)$，取 $\delta=\min(\varepsilon_1-d(x_1,y),\,\varepsilon_2-d(x_2,y))>0$。若 $z\in U_\delta(y)$，则由三角不等式 $d(x_1,z)\le d(x_1,y)+d(y,z)<d(x_1,y)+\delta\le\varepsilon_1$，同理 $d(x_2,z)<\varepsilon_2$。所以 $U_\delta(y)\subset U_{\varepsilon_1}(x_1)\cap U_{\varepsilon_2}(x_2)$，交集等于 $\bigcup_yU_{\delta(y)}(y)$，是开球之并。∎

度量的三条公理中，这里真正用到的是三角不等式 (iii)；(ii) 在证明 Hausdorff 性（习题 2.16）时用到。`}</Details>
        <Tx>{R`**相对拓扑。**设 $(X,\mathcal{T})$ 是拓扑空间，$A$ 是 $X$ 的任意子集。$\mathcal{T}=\{U_i\}$ 在 $A$ 上诱导出**相对拓扑**（relative topology）$\mathcal{T}'=\{U_i\cap A\mid U_i\in\mathcal{T}\}$。`}</Tx>
        <Box kind="example" n="2.8" title={R`球面 $S^n$`}>
          <Tx>{R`设 $X=\mathbb{R}^{n+1}$，取 $n$ 维球面 $S^n$：`}</Tx>
          <Eq n="2.26" say={R`$n$ 维球面：$n+1$ 维欧氏空间中到原点距离为 1 的点。注意它本身是 $n$ 维的。`}>{R`(x^0)^2+(x^1)^2+\cdots+(x^n)^2=1.`}</Eq>
          <Tx>{R`$S^n$ 上的拓扑可以取 $\mathbb{R}^{n+1}$ 的通常拓扑诱导的相对拓扑。（于是 $S^n$ 中的"开集"就是 $\mathbb{R}^{n+1}$ 中开集与球面之交，例如球面上的一块"开帽"。）`}</Tx>
        </Box>
      </Sub>

      <Sub n="2.3.2" title="Continuous maps" zh="连续映射">
        <p className="muted">本小节概念：<C id="continuity" /></p>
        <Stmt id="D2.4" />
        <Tx>{R`这个定义与我们对连续性的直观相符。看一个例子：设 $f:\mathbb{R}\to\mathbb{R}$ 定义为`}</Tx>
        <Eq n="2.27" say={R`一个在 $x=0$ 处向下跳 $1/2$ 的函数：用"开集的逆像"来检验，会在跳跃点暴露出一个闭端点。`}>{R`f(x)=\begin{cases}-x+1&x\le0\\-x+\frac12&x>0.\end{cases}`}</Eq>
        <Tx>{R`取 $\mathbb{R}$ 的通常拓扑，于是任何开区间 $(a,b)$ 都是开集。在通常的微积分里，$f$ 在 $x=0$ 处有间断。用新定义来看：对开集 $(3/2,2)\subset Y$，有 $f^{-1}((3/2,2))=(-1,-1/2)$，是 $X$ 中的开集。但若取开集 $(1-1/4,\,1+1/4)\subset Y$，则 $f^{-1}((1-1/4,\,1+1/4))=(-1/4,0]$，在通常拓扑下**不是**开集——所以 $f$ 不连续。`}</Tx>
        <Box kind="note" title="逐步核对这两个逆像">{R`$x\le0$ 的分支 $y=-x+1$ 取值 $y\ge1$，$x>0$ 的分支 $y=-x+\tfrac12$ 取值 $y<\tfrac12$。

◆ $y\in(3/2,2)$：只有第一支能取到，$-x+1\in(3/2,2)\iff x\in(-1,-1/2)$，且确实 $x\le0$。逆像 $(-1,-1/2)$，开。

◆ $y\in(3/4,5/4)$：第一支 $-x+1\in(3/4,5/4)\iff x\in(-1/4,1/4)$，与 $x\le0$ 相交得 $(-1/4,0]$；第二支要求 $-x+\tfrac12\in(3/4,5/4)$，即 $x\in(-3/4,-1/4)$，与 $x>0$ 无交。逆像 $(-1/4,0]$：点 $0$ 属于它，但 $0$ 右边任意近处的点都不属于它——没有任何开区间围住 $0$ 而留在集合内。

**规律**：开区间 $(c-r,c+r)$ 的逆像不是开集，当且仅当它包含 $f(0)=1$（于是 $0$ 在逆像中）却不包含右极限 $\lim_{x\to0^+}f(x)=\tfrac12$ 左侧的一小段。下面的交互图让你任意移动这个开区间来验证。`}</Box>
        <ContinuityLab />
        <Exercise n="2.14" title="“开映射”不是连续性" level="★"
          hint={R`看 $(-\varepsilon,+\varepsilon)$ 被 $f$ 映到哪里；再验证 $f$ 按逆像定义是连续的。`}
          solution={R`$f(x)=x^2$ 把开区间 $(-\varepsilon,\varepsilon)$ 映到 $[0,\varepsilon^2)$，它在 $\mathbb{R}$ 中**不是**开集（$0$ 左边没有余地）。所以"把开集映成开集"这个"反向定义"会判定 $x^2$ 不连续，这与直观矛盾。

而按定义 2.4，$f$ 确实连续：开区间 $(a,b)$ 的逆像为——$b\le0$ 时为 $\emptyset$；$a<0<b$ 时为 $(-\sqrt b,\sqrt b)$；$0\le a<b$ 时为 $(-\sqrt b,-\sqrt a)\cup(\sqrt a,\sqrt b)$。全是开集；一般开集是开区间之并，逆像与并交换，故也是开集。

反过来，把开集映成开集的映射（开映射）也不必连续：恒等映射 $\mathrm{id}:(\mathbb{R},\text{通常拓扑})\to(\mathbb{R},\text{离散拓扑})$ 把每个开集映成（离散拓扑下当然开的）自身，但 $\{0\}$ 在离散拓扑下是开集，其逆像 $\{0\}$ 在通常拓扑下不开。连续性与"开映射"是两个独立的性质。`}>
          {R`以连续函数 $f:\mathbb{R}\to\mathbb{R}$，$f(x)=x^2$ 为例，说明反向的定义——"若映射 $f$ 把 $X$ 中的开集映成 $Y$ 中的开集，则 $f$ 连续"——行不通。［提示：看 $(-\varepsilon,+\varepsilon)$ 在 $f$ 下被映到哪里。］`}
        </Exercise>
      </Sub>

      <Sub n="2.3.3" title="Neighbourhoods and Hausdorff spaces" zh="邻域与 Hausdorff 空间">
        <Stmt id="D2.5" />
        <Box kind="example" n="2.9" title="闭区间作为邻域">{R`取 $X=\mathbb{R}$ 与通常拓扑。区间 $[-1,1]$ 是任意一点 $x\in(-1,1)$ 的邻域（它包含开集 $(-1,1)\ni x$）。但它不是 $x=1$ 的邻域：任何含 $1$ 的开区间都伸出了 $[-1,1]$。`}</Box>
        <Stmt id="D2.6" />
        <Exercise n="2.15" title="Beatles 拓扑" level="★"
          hint={R`四个开集是一条链 $U_0\subset U_1\subset U_2\subset U_3$。再看 Paul 的开集都包含谁。`}
          solution={R`**是拓扑。**(i) $\emptyset=U_0$、$X=U_3$ 都在 $\mathcal{T}$ 中。由于 $U_0\subset U_1\subset U_2\subset U_3$ 是一条链，任意几个的并等于其中最大的一个，交等于其中最小的一个，都仍在 $\mathcal{T}$ 中，(ii)(iii) 成立。

**不是 Hausdorff 空间。**取两点 John 与 Paul。含 Paul 的开集只有 $U_2$ 与 $U_3$，二者都含 John。所以 Paul 的任何邻域都包含一个含 John 的开集，从而包含 John；而 John 的任何邻域当然包含 John。两者的邻域总在 John 处相交，无法分开。（类似地，Ringo 与 George 甚至在拓扑上无法区分：含其一的开集只有 $U_3$。）`}>
          {R`设 $X=\{\text{John},\text{Paul},\text{Ringo},\text{George}\}$，$U_0=\emptyset$，$U_1=\{\text{John}\}$，$U_2=\{\text{John},\text{Paul}\}$，$U_3=\{\text{John},\text{Paul},\text{Ringo},\text{George}\}$。证明 $\mathcal{T}=\{U_0,U_1,U_2,U_3\}$ 给出 $X$ 的拓扑，并证明 $(X,\mathcal{T})$ 不是 Hausdorff 空间。`}
        </Exercise>
        <Tx>{R`与这道习题不同，物理中出现的绝大多数空间都具有 Hausdorff 性质。**本书此后始终假设如此。**`}</Tx>
        <Exercise n="2.16" title="度量空间都是 Hausdorff 的" level="★"
          hint={R`取 $\varepsilon=d(x,x')/2$，用三角不等式。`}
          solution={R`设 $x\neq x'$，由度量公理 (ii)，$\varepsilon\equiv d(x,x')/2>0$。取 $U_\varepsilon(x)$ 与 $U_\varepsilon(x')$。若某个 $y$ 同属两者，则由三角不等式 $d(x,x')\le d(x,y)+d(y,x')<2\varepsilon=d(x,x')$，矛盾。所以两开球不交，度量空间是 Hausdorff 空间。$\mathbb{R}$ 的通常拓扑是 $d(x,y)=|x-y|$ 的度量拓扑（开球就是开区间），因此是特例：$x<x'$ 时取 $(x-\varepsilon,x+\varepsilon)$ 与 $(x'-\varepsilon,x'+\varepsilon)$ 即可。`}>
          {R`证明带通常拓扑的 $\mathbb{R}$ 是 Hausdorff 空间；并证明任何度量空间都是 Hausdorff 空间。`}
        </Exercise>
      </Sub>

      <Sub n="2.3.4" title="Closed set" zh="闭集">
        <Tx>{R`设 $(X,\mathcal{T})$ 是拓扑空间。$X$ 的子集 $A$ 若其在 $X$ 中的补集是开集，即 $X-A\in\mathcal{T}$，就称 $A$ 是**闭集**（closed）。按定义，$X$ 与 $\emptyset$ **既开又闭**。

考虑集合 $A$（开或闭均可）。$A$ 的**闭包**（closure）是包含 $A$ 的最小闭集，记作 $\bar A$。$A$ 的**内部**（interior）是 $A$ 的最大开子集，记作 $A^\circ$。$A$ 的**边界**（boundary）$b(A)$ 是 $A^\circ$ 在 $\bar A$ 中的补集：$b(A)=\bar A-A^\circ$。开集总与其边界不交（$A^\circ=A$），闭集总包含其边界（$\bar A=A$）。`}</Tx>
        <Erratum kind="erratum" loc="p.103 §2.3.4" title={R`边界应为 $b(A)=\bar A-A^\circ$`}>{R`原书写 "the boundary $b(A)$ of $A$ is the complement of $A^\circ$ in $A$; $b(A)=A-A^\circ$"。按这个定义，开集的边界总是空集（$A^\circ=A$），而紧接着的例 2.10 说 $A=(a,b)$ 的边界是 $\{a,b\}$——自相矛盾。正确的定义是**闭包减去内部**：$b(A)=\bar A-A^\circ$。检验：$A=(a,b)$ 时 $\bar A=[a,b]$、$A^\circ=(a,b)$，$b(A)=\{a,b\}$ ✓；"开集与边界不交、闭集包含边界"也随之成立。本站已改正。`}</Erratum>
        <Box kind="example" n="2.10" title="区间的闭包、内部与边界">{R`取 $X=\mathbb{R}$ 与通常拓扑，取一对开区间 $(-\infty,a)$ 与 $(b,\infty)$，$a<b$。由于 $(-\infty,a)\cup(b,\infty)$ 在通常拓扑下是开集，其补集 $[a,b]$ 是闭集。任何闭区间在通常拓扑下都是闭集。令 $A=(a,b)$，则 $\bar A=[a,b]$。边界 $b(A)$ 由两点 $\{a,b\}$ 组成。集合 $(a,b)$、$[a,b]$、$(a,b]$、$[a,b)$ 有相同的边界、闭包与内部。在 $\mathbb{R}^n$ 中，乘积 $[a_1,b_1]\times\cdots\times[a_n,b_n]$ 在通常拓扑下是闭集。

（注意 $(a,b]$ 与 $[a,b)$ **既不开也不闭**：开与闭不是反义词。）`}</Box>
        <Exercise n="2.17" title="开不开取决于所在的空间" level="★"
          hint={R`在平面里，$(1/2,0)$ 周围的小圆盘会伸出 $x$ 轴；$(0,0)$ 不在 $I$ 中，但它任意近处有 $I$ 的点。`}
          solution={R`**在 $x$ 轴 $\mathbb{R}$ 中：**$I=(0,1)$ 是开区间，按通常拓扑是开集。

**在 $xy$ 平面 $\mathbb{R}^2$ 中不开：**任取 $(x_0,0)\in I$，任何开圆盘 $U_\varepsilon((x_0,0))$ 都含有点 $(x_0,\varepsilon/2)\notin I$，所以没有开集能被夹在 $I$ 中围住这一点。

**也不闭：**补集 $\mathbb{R}^2-I$ 包含 $(0,0)$，但任何 $U_\varepsilon((0,0))$ 都含有 $(\min(\varepsilon,1)/2,\,0)\in I$，所以补集在 $(0,0)$ 处不开，$I$ 不是闭集。（$I$ 在 $\mathbb{R}^2$ 中的闭包是 $[0,1]\times\{0\}$，内部是空集，边界是 $[0,1]\times\{0\}$。）

这也说明了相对拓扑的用处：$I$ 在 $x$ 轴（作为 $\mathbb{R}^2$ 的子集，带相对拓扑）中是开的，因为 $I=(0,1)\times(-1,1)\cap(x\text{ 轴})$。`}>
          {R`集合 $A\subset X$ 是开还是闭取决于 $X$。取 $x$ 轴上的区间 $I=(0,1)$。证明 $I$ 在 $x$ 轴 $\mathbb{R}$ 中是开集，而在 $xy$ 平面 $\mathbb{R}^2$ 中既不开也不闭。`}
        </Exercise>
      </Sub>

      <Sub n="2.3.5" title="Compactness" zh="紧致性">
        <p className="muted">本小节概念：<C id="compact" /></p>
        <Tx>{R`设 $(X,\mathcal{T})$ 是拓扑空间。$X$ 的子集族 $\{A_i\}$ 若满足 $\bigcup_{i\in I}A_i=X$，就称为 $X$ 的一个**覆盖**（covering）。若所有 $A_i$ 恰好都是拓扑 $\mathcal{T}$ 的开集，这个覆盖称为**开覆盖**（open covering）。`}</Tx>
        <Stmt id="D2.7" />
        <Tx>{R`一般而言，$\mathbb{R}^n$ 中的紧致集必定有界（用以原点为中心、半径 $1,2,3,\ldots$ 的开球去覆盖它，抽出有限个，它就落在最大的那个球里）。还需要什么？原书不加证明地给出结果；本站补出证明。`}</Tx>
        <Stmt id="T2.3">
          <Proof steps={[
            { claim: R`(⇒，有界) 设 $X$ 紧致。开球族 $\{U_n(0)\mid n\in\mathbb{N}\}$ 覆盖 $\mathbb{R}^n\supset X$，有有限子覆盖，故 $X\subset U_N(0)$，$X$ 有界。`, fill: true },
            { claim: R`(⇒，闭) 任取 $p\notin X$。令 $V_k=\{x\mid|x-p|>1/k\}$（开集），$\bigcup_kV_k=\mathbb{R}^n-\{p\}\supset X$。紧致性给出有限子覆盖，即 $X\subset V_N$。于是开球 $U_{1/N}(p)$ 与 $X$ 不交：补集 $\mathbb{R}^n-X$ 中每一点都有一个开球留在补集内，补集是开集，$X$ 是闭集。`, fill: true },
            { claim: R`(⇐，第一步：闭立方体紧致) 设 $C_0=[-L,L]^n$，反设某开覆盖 $\{U_i\}$ 没有有限子覆盖。把 $C_0$ 每条边二等分成 $2^n$ 个小闭立方体，其中至少一个没有有限子覆盖，记为 $C_1$；如此继续，得到闭立方体套 $C_0\supset C_1\supset C_2\supset\cdots$，`, tex: R`\operatorname{diam}C_k=\frac{2L\sqrt n}{2^k}\to0`, why: R`每个坐标方向上是一串闭区间套，由实数的完备性有公共点；合起来得到 $x^*\in\bigcap_kC_k$。`, fill: true },
            { claim: R`$x^*$ 属于某个开集 $U_{i_0}$，于是存在 $\varepsilon>0$ 使 $U_\varepsilon(x^*)\subset U_{i_0}$。取 $k$ 充分大使 $\operatorname{diam}C_k<\varepsilon$，则 $C_k\subset U_\varepsilon(x^*)\subset U_{i_0}$：$C_k$ 被**一个**开集覆盖——与"$C_k$ 没有有限子覆盖"矛盾。所以 $C_0$ 紧致。`, fill: true },
            { claim: R`(⇐，第二步：紧致集的闭子集紧致) 设 $X$ 闭且有界，取 $L$ 使 $X\subset C_0$。给定 $X$ 的开覆盖 $\{U_i\}$，添上开集 $\mathbb{R}^n-X$ 就得到 $C_0$ 的开覆盖；抽出有限子覆盖，再丢掉 $\mathbb{R}^n-X$，剩下的有限个 $U_i$ 仍覆盖 $X$。所以 $X$ 紧致。`, fill: true },
          ]} />
        </Stmt>
        <Box kind="example" n="2.11" title="紧致与不紧致">{R`**(a)** 一个点是紧致的（任何开覆盖中挑出含该点的一个开集即可）。

**(b)** 取 $\mathbb{R}$ 中的开区间 $(a,b)$，选开覆盖 $U_n=(a,b-1/n)$，$n\in\mathbb{N}$。显然

$$\bigcup_{n\in\mathbb{N}}U_n=(a,b).$$

然而 $\{U_n\}$ 的任何有限子族都覆盖不了 $(a,b)$：有限个中最大的是 $U_N=(a,b-1/N)$，点 $b-1/(2N)$ 不在其中。所以开区间 $(a,b)$ 不紧致，与定理 2.3 一致（它不闭）。

**(c)** 例 2.8 中带相对拓扑的 $S^n$ 是紧致的，因为它在 $\mathbb{R}^{n+1}$ 中闭且有界（\eqref{2.26} 左边是连续函数，$S^n$ 是闭集 $\{1\}$ 的逆像）。`}</Box>
        <Erratum kind="erratum" loc="p.104 例 2.11(b)" title={R`并集的指标应为 $n\in\mathbb{N}$`}>{R`原书正文写 $U_n=(a,b-1/n)$，$n\in\mathbb{N}$，但紧接着的并集写成 $\bigcup_{n\in\mathbb{Z}}U_n$。$n$ 为零或负数时 $b-1/n$ 无意义或大于 $b$，应为 $\bigcup_{n\in\mathbb{N}}U_n=(a,b)$（当 $1/n\ge b-a$ 时 $U_n$ 为空集，无妨）。本站已改正。`}</Erratum>
        <Box kind="physics" title="物理中为什么偏爱紧致空间">{R`只看定义和这几个例子，读者也许体会不到紧致性的意义。但要注意，有些数学分析与物理在紧致空间上会变得简单得多。

◆ **有限体积。**考虑固体中的电子系统。若固体不紧致、体积无限，就要处理无限体积中的量子统计力学——众所周知这在数学上相当复杂，需要高等的 Hilbert 空间理论。通常的做法是把体系关进有限体积 $V$，四周是硬墙使电子波函数在墙上为零；或者在墙上加**周期边界条件**，这相当于把体系放进一个环面（例 2.5(b)）。无论哪种，体系都被放进了紧致空间，于是可以构造激发由离散指标标记的 Fock 空间。

◆ **场论中的边界条件与单点紧化。**研究瞬子、Belavin–Polyakov 单极这类延展物体时（§4.8），紧致性的另一层意义会显现：场论中通常假设场在空间无穷远处趋于对应于真空（或某个真空）的渐近形式；类似地，空间无穷远处取同一个序参量值的序参量分布构成一个从多方面看都值得研究的类。由于无穷远处的所有点都被映到同一点，我们实际上把非紧的 $\mathbb{R}^n$ **紧化**成了紧致空间 $S^n=\mathbb{R}^n\cup\{\infty\}$。这一手续称为**单点紧化**（one-point compactification）。场位形于是成为映射 $S^n\to(\text{真空流形})$，可以用同伦群分类（第 4 章）。`}</Box>
      </Sub>

      <Sub n="2.3.6" title="Connectedness" zh="连通性">
        <p className="muted">本小节概念：<C id="connected" /></p>
        <Stmt id="D2.8" />
        <Box kind="warning" title="连通但不弧连通：拓扑学家的正弦曲线">{R`"少数病态例外"的标准例子是 $X=\{(x,\sin(1/x))\mid0<x\le1\}\cup\{(0,y)\mid-1\le y\le1\}$（带 $\mathbb{R}^2$ 的相对拓扑）。曲线部分无限次振荡、越来越贴近竖直线段，所以无法把 $X$ 分成两个不交的非空开集——$X$ 连通。但从线段上的点 $(0,0)$ 出发，没有任何连续路径能到达曲线上的点 $(1,\sin1)$：路径在离开线段的瞬间必须"穿过"无穷多次振荡。本书遇到的空间（流形）不会有这种现象：对流形，连通与弧连通等价。`}</Box>
        <Box kind="example" n="2.12" title="连通与单连通的例子">
          <Tx>{R`**(a)** 实直线 $\mathbb{R}$ 是弧连通的，而 $\mathbb{R}-\{0\}$ 不是。$\mathbb{R}^n$（$n\ge2$）是弧连通的，$\mathbb{R}^n-\{\boldsymbol{0}\}$ 也是。

**(b)** $S^n$ 是弧连通的。圆周 $S^1$ 不是单连通的。若 $n\ge2$，$S^n$ 是单连通的。$n$ 维环面

$$T^n=\underbrace{S^1\times S^1\times\cdots\times S^1}_{n}\qquad(n\ge2)$$

是弧连通的，但不是单连通的（绕任何一个 $S^1$ 因子一圈的闭路都缩不掉）。

**(c)** $\mathbb{R}^2-\mathbb{R}$（平面去掉一条直线）不是弧连通的。$\mathbb{R}^2-\{\boldsymbol{0}\}$ 是弧连通的，但不单连通（绕原点的闭路）。$\mathbb{R}^3-\{\boldsymbol{0}\}$ 既弧连通又单连通（绕原点的闭路可以从旁边"滑过"原点）。`}</Tx>
        </Box>
      </Sub>
    </Sec>);
}
