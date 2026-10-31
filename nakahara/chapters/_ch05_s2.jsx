// §5.2 流形上的微积分 —— 式 (5.16)–(5.38)，定义 5.2–5.3，例 5.7–5.8，习题 5.2–5.6，图 5.6–5.11
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Exercise, Derivation, C } from "@kit";

const R = String.raw;

export function Sec52() {
  return (
    <Sec n="5.2" title="The calculus on manifolds" zh="流形上的微积分"
      gist={R`映射的坐标表示 $\psi\circ f\circ\varphi^{-1}$ → 可微映射与微分同胚 → **切向量 = 沿曲线的方向导数** $X=X^\mu\partial/\partial x^\mu$，构成 $T_pM$ → 对偶的一形式 $\dd x^\mu$ 构成 $T_p^*M$ → $(q,r)$ 型张量与张量场 → 映射诱导的推前 $f_*$ 与拉回 $f^*$（分量都是 Jacobi 矩阵）→ 浸入、嵌入、子流形。`}
      why={R`在流形上没有"原点"和"直箭头"，向量不能再是"从原点出发的箭头"。把向量定义成"对函数求方向导数的算子"，它就自动与坐标无关；分量的变换律只是这一事实的推论。`}
      gives={["5.16", "5.20", "5.21", "5.23", "5.25", "5.28", "5.29", "5.31", "5.33", "5.36", "5.37"]}>
      <p className="muted">本节概念：<C id="tangent_vector" /> · <C id="one_form" /> · <C id="push_pull" /></p>
      <Tx>{R`可微流形的意义在于：我们可以使用 $\R^n$ 中发展起来的通常微积分。坐标变换的光滑性保证了微积分与所选坐标无关。`}</Tx>

      <Sub n="5.2.1" title="Differentiable maps" zh="可微映射">
        <Tx>{R`设 $f:M\to N$ 是从 $m$ 维流形 $M$ 到 $n$ 维流形 $N$ 的映射，点 $p\in M$ 被映到 $f(p)\in N$，即 $f:p\mapsto f(p)$（\figref{5.6}）。取 $M$ 上的卡 $(U,\varphi)$ 与 $N$ 上的卡 $(V,\psi)$，使 $p\in U$、$f(p)\in V$。则 $f$ 有如下**坐标表示**：`}</Tx>
        <Eq n="5.16" title="映射的坐标表示" say={R`流形之间的映射本身没法求导；先用坐标把两头都"翻译"成欧氏空间，得到一个普通的多元向量值函数，再对它求导。`}>{R`\psi\circ f\circ\varphi^{-1}:\R^m\to\R^n.`}</Eq>
        <Figure n="5.6" caption={R`映射 $f:M\to N$ 的坐标表示 $\psi\circ f\circ\varphi^{-1}:\R^m\to\R^n$。`} width="70%" />
        <Tx>{R`若记 $\varphi(p)=\{x^\mu\}$、$\psi(f(p))=\{y^\alpha\}$，则 $\psi\circ f\circ\varphi^{-1}$ 就是通常的 $m$ 元向量值函数 $y=\psi\circ f\circ\varphi^{-1}(x)$。在清楚用的是哪套坐标时，我们有时用（其实是滥用！）记号 $y=f(x)$ 或 $y^\alpha=f^\alpha(x^\mu)$。若 $y=\psi\circ f\circ\varphi^{-1}(x)$，或简写的 $y^\alpha=f^\alpha(x^\mu)$，对每个 $x^\mu$ 都是 $C^\infty$ 的，就称 $f$ 在 $p$（或在 $x=\varphi(p)$）**可微**。可微映射也称为**光滑映射**。注意我们要求无穷次（$C^\infty$）可微，与转移函数 $\psi_{ij}$ 的光滑性相协调。

**可微性与坐标无关。**考虑两张重叠的卡 $(U_1,\varphi_1)$、$(U_2,\varphi_2)$，取 $p\in U_1\cap U_2$，它在 $\varphi_1$ 下的坐标为 $\{x_1^\mu\}$，在 $\varphi_2$ 下为 $\{x_2^\nu\}$。用 $\{x_1^\mu\}$ 表示时 $f$ 的形式是 $\psi\circ f\circ\varphi_1^{-1}$，用 $\{x_2^\nu\}$ 表示时是

$$\psi\circ f\circ\varphi_2^{-1}=\psi\circ f\circ\varphi_1^{-1}\circ(\varphi_1\circ\varphi_2^{-1}).$$

按定义 $\psi_{12}=\varphi_1\circ\varphi_2^{-1}$ 是 $C^\infty$ 的。用简写，二者对应 $y=f(x_1)$ 与 $y=f(x_1(x_2))$。若 $f(x_1)$ 对 $x_1^\mu$ 是 $C^\infty$、$x_1(x_2)$ 对 $x_2^\nu$ 是 $C^\infty$，由链式法则 $y=f(x_1(x_2))$ 对 $x_2^\nu$ 也是 $C^\infty$。`}</Tx>
        <Exercise n="5.2" title={R`可微性与 $N$ 上卡的选取无关`} level="★"
          hint={R`在 $f(p)$ 附近取 $N$ 的两张卡 $(V_1,\psi_1)$、$(V_2,\psi_2)$，把 $\psi_2\circ f\circ\varphi^{-1}$ 写成 $\psi_1\circ f\circ\varphi^{-1}$ 与 $N$ 的转移函数的复合。`}
          solution={R`设 $f(p)\in V_1\cap V_2$。在 $f^{-1}(V_1\cap V_2)\cap U$ 上（由 $f$ 的连续性它是 $p$ 的开邻域），

$$\psi_2\circ f\circ\varphi^{-1}=(\psi_2\circ\psi_1^{-1})\circ(\psi_1\circ f\circ\varphi^{-1}).$$

右边第一个因子是 $N$ 的转移函数，按\sref{D5.1}(iv) 是 $C^\infty$；第二个因子按假设是 $C^\infty$。用坐标写：$y_2^\beta=y_2^\beta(y_1(x))$，由链式法则任意阶偏导数都存在且连续，所以复合映射 $C^\infty$。因此"在 $p$ 可微"既不依赖 $M$ 上卡的选取（正文），也不依赖 $N$ 上卡的选取。`}>
          {R`证明 $f$ 的可微性也与 $N$ 上卡的选取无关。`}
        </Exercise>
        <Stmt id="D5.2" />
        <Tx>{R`显然 $M\equiv N$ 时 $\dim M=\dim N$。第 2 章中我们说过，同胚按"能否把一个空间连续地形变成另一个"给空间分类；微分同胚则按"能否**光滑地**形变"分类。两个微分同胚的空间被看作同一个流形。

显然微分同胚是同胚。反过来呢？同胚一定是微分同胚吗？上一节把微分结构定义为图册的等价类；一个拓扑空间能否带有多个微分结构？"同胚但不微分同胚"的例子很难给出，因为已知这只可能出现在高维空间（$\dim M\ge4$）。1956 年以前人们相信拓扑空间只容许一种微分结构；但 Milnor (1956) 指出 $S^7$ 容许 28 种微分结构。数学上一个近来引人注目的发现是 $\R^4$ 容许**无穷多**种微分结构，有兴趣的读者可参考 Donaldson (1983) 与 Freed and Uhlenbeck (1984)。为简单起见，这里假定流形只有唯一的微分结构。

**主动与被动观点。**微分同胚 $f:M\to M$ 的集合构成一个群，记作 $\mathrm{Diff}(M)$。在卡 $(U,\varphi)$ 中取一点 $p$，$\varphi(p)=x^\mu(p)$。在 $f\in\mathrm{Diff}(M)$ 下 $p$ 被映到 $f(p)$，坐标为 $\varphi(f(p))=y^\mu(f(p))$（假定 $f(p)\in U$）。$y$ 显然是 $x$ 的可微函数——这是坐标变换的**主动观点**（点在动）。另一方面，若 $(U,\varphi)$ 与 $(V,\psi)$ 是重叠的卡，同一点 $p\in U\cap V$ 有两套坐标值 $x^\mu=\varphi(p)$ 与 $y^\mu=\psi(p)$，映射 $x\mapsto y$ 由流形的光滑性假设而可微——这种重新参数化是坐标变换的**被动观点**（点不动，标签在变）。重新参数化构成的群也记作 $\mathrm{Diff}(M)$。

**曲线与函数。**下面看两类特殊的映射。$m$ 维流形 $M$ 中的**开曲线**是映射 $c:(a,b)\to M$，其中 $(a,b)$ 是满足 $a<0<b$ 的开区间；我们假定曲线不自交（\figref{5.7}）。$a$（$b$）可以是 $-\infty$（$+\infty$）；把 $0$ 包含在区间里是为了后面方便。若曲线是闭的，就看作映射 $c:S^1\to M$。两种情形下 $c$ 在局部都是从开区间到 $M$ 的映射。在卡 $(U,\varphi)$ 上，曲线 $c(t)$ 的坐标表示为 $x=\varphi\circ c:\R\to\R^m$。

$M$ 上的**函数** $f$ 是光滑映射 $f:M\to\R$（\figref{5.8}）。在卡 $(U,\varphi)$ 上，$f$ 的坐标表示为 $f\circ\varphi^{-1}:\R^m\to\R$，即 $m$ 元实值函数。$M$ 上光滑函数的集合记作 $\mathcal{F}(M)$。`}</Tx>
        <Figure n="5.7" caption={R`$M$ 中的曲线 $c$ 及其坐标表示 $\varphi\circ c$。`} width="50%" />
        <Figure n="5.8" caption={R`函数 $f:M\to\R$ 及其坐标表示 $f\circ\varphi^{-1}$。`} width="60%" />
      </Sub>

      <Sub n="5.2.2" title="Vectors" zh="向量">
        <Tx>{R`有了流形上的映射，就可以定义其他几何对象：向量、对偶向量与张量。一般地，"连接原点与一点的箭头"这个初等图像在流形上行不通。［原点在哪？什么是直的箭头？怎样在地球表面上画一支连接伦敦与洛杉矶的"直"箭头？］**在流形上，向量被定义为 $M$ 中曲线的切向量。**

先看 $xy$ 平面中一条曲线的切线。若曲线可微，在 $x_0$ 附近可以把它近似为`}</Tx>
        <Eq n="5.17" say={R`平面曲线在 $x_0$ 附近的线性近似：切线的斜率就是导数。流形上的切向量要推广的正是这件事。`}>{R`y-y(x_0)=a(x-x_0)`}</Eq>
        <Tx>{R`其中 $a=\dd y/\dd x|_{x=x_0}$。流形 $M$ 上的切向量推广了这条切线。要定义切向量，需要一条曲线 $c:(a,b)\to M$ 与一个函数 $f:M\to\R$，其中 $(a,b)$ 是包含 $t=0$ 的开区间（\figref{5.9}）。我们把 $c(0)$ 处的切向量定义为函数 $f(c(t))$ 沿曲线 $c(t)$ 在 $t=0$ 处的**方向导数**。$f(c(t))$ 在 $t=0$ 处沿曲线的变化率是`}</Tx>
        <Eq n="5.18" say="沿曲线走的时候，函数值变化得有多快——这个数与坐标无关。">{R`\left.\frac{\dd f(c(t))}{\dd t}\right|_{t=0}.`}</Eq>
        <Tx>{R`用局部坐标写，它变成（链式法则）`}</Tx>
        <Eq n="5.19" say={R`同一个变化率在坐标中拆成两部分：函数沿各坐标方向的偏导数，乘以曲线在各坐标方向上的速度。`}>{R`\frac{\partial f}{\partial x^\mu}\left.\frac{\dd x^\mu(c(t))}{\dd t}\right|_{t=0}.`}</Eq>
        <Tx>{R`［注意记号的滥用！导数 $\partial f/\partial x^\mu$ 实际上是 $\partial(f\circ\varphi^{-1}(x))/\partial x^\mu$。］换句话说，$t=0$ 处的 $\dd f(c(t))/\dd t$ 可以通过把微分算子 $X$ 作用在 $f$ 上得到，其中`}</Tx>
        <Eq n="5.20" keyEq title="切向量" say={R`切向量就是一个一阶微分算子：系数是曲线的坐标速度，作用对象是函数。`}>{R`X=X^\mu\left(\frac{\partial}{\partial x^\mu}\right)\qquad\left(X^\mu=\left.\frac{\dd x^\mu(c(t))}{\dd t}\right|_{t=0}\right)`}</Eq>
        <Tx>{R`即`}</Tx>
        <Eq n="5.21" title="向量作用在函数上" say={R`向量 $X$ 作用在函数 $f$ 上，得到 $f$ 沿 $X$ 方向的变化率 $X[f]$——左边与坐标无关，右边是它在某个坐标中的写法。`}>{R`\left.\frac{\dd f(c(t))}{\dd t}\right|_{t=0}=X^\mu\left(\frac{\partial f}{\partial x^\mu}\right)\equiv X[f].`}</Eq>
        <Tx>{R`最后一个等号定义了 $X[f]$。我们就把 $X=X^\mu\partial/\partial x^\mu$ 定义为 $M$ 在 $p=c(0)$ 处、沿曲线 $c(t)$ 所给方向的**切向量**。`}</Tx>
        <Figure n="5.9" caption={R`曲线 $c$ 与函数 $f$ 通过方向导数确定沿曲线的切向量。`} width="70%" />
        <Box kind="example" n="5.7" title="作用在坐标函数上">{R`若把 $X$ 作用在坐标函数 $\varphi(c(t))=x^\mu(t)$ 上，得到

$$X[x^\mu]=\left(\frac{\dd x^\nu}{\dd t}\right)\left(\frac{\partial x^\mu}{\partial x^\nu}\right)=\left.\frac{\dd x^\mu(t)}{\dd t}\right|_{t=0}$$

（用了 $\partial x^\mu/\partial x^\nu=\delta^\mu_\nu$）。若把 $t$ 理解为时间，这就是速度向量的第 $\mu$ 个分量。所以**切向量的分量就是它作用在坐标函数上的值**，$X^\mu=X[x^\mu]$。`}</Box>
        <Tx>{R`**更数学化的定义：曲线的等价类。**若两条曲线 $c_1(t)$、$c_2(t)$ 满足

(i) $c_1(0)=c_2(0)=p$；
(ii) $\left.\dfrac{\dd x^\mu(c_1(t))}{\dd t}\right|_{t=0}=\left.\dfrac{\dd x^\mu(c_2(t))}{\dd t}\right|_{t=0}$，

则 $c_1(t)$ 与 $c_2(t)$ 在 $p$ 给出同一个微分算子 $X$，此时规定 $c_1(t)\sim c_2(t)$。显然 $\sim$ 是等价关系。我们把切向量 $X$ 等同于**曲线的等价类**`}</Tx>
        <Eq n="5.22" say={R`切向量不是某一条曲线，而是"在 $p$ 点相切"的所有曲线组成的一整类：经过同一点、坐标速度相同的曲线都代表同一个切向量。`}>{R`[c(t)]=\left\{\tilde c(t)\,\middle|\,\tilde c(0)=c(0)\ \text{且}\ \left.\frac{\dd x^\mu(\tilde c(t))}{\dd t}\right|_{t=0}=\left.\frac{\dd x^\mu(c(t))}{\dd t}\right|_{t=0}\right\}`}</Eq>
        <Tx>{R`而不是曲线本身。条件 (ii) 看似依赖坐标，其实不然：换一套坐标 $y=y(x)$，$\dd y^\nu/\dd t=(\partial y^\nu/\partial x^\mu)\,\dd x^\mu/\dd t$，在一套坐标中速度相等就在所有坐标中速度相等。

**切空间。**$p\in M$ 处曲线的全体等价类——即 $p$ 处的全体切向量——构成一个向量空间，称为 $M$ 在 $p$ 处的**切空间**（tangent space），记作 $T_pM$。分析 $T_pM$ 可以用第 2.2 节的向量空间理论。由 \eqref{5.20} 显然 $e_\mu=\partial/\partial x^\mu$（$1\le\mu\le m$）是 $T_pM$ 的基向量，且 $\dim T_pM=\dim M$。基 $\{e_\mu\}$ 称为**坐标基**（coordinate basis）。若向量 $V\in T_pM$ 写成 $V=V^\mu e_\mu$，数 $V^\mu$ 称为 $V$ 关于 $e_\mu$ 的**分量**。由构造可知，向量 $X$ 的存在**不需要指定坐标**（见 \eqref{5.21}）；指定坐标只是为了方便。

**分量的变换律。**向量的这种坐标无关性让我们能求出其**分量**的变换性质。设 $p\in U_i\cap U_j$，$x=\varphi_i(p)$，$y=\varphi_j(p)$。$X\in T_pM$ 有两种表示：

$$X=X^\mu\frac{\partial}{\partial x^\mu}=\widetilde{X}^\mu\frac{\partial}{\partial y^\mu}.$$

把两边作用在 $y^\mu$ 上（例 5.7 的做法）即得 $X^\mu$ 与 $\widetilde{X}^\mu$ 的关系`}</Tx>
        <Eq n="5.23" keyEq title="向量分量的变换律" say={R`换坐标时向量的分量按 Jacobi 矩阵 $\partial y/\partial x$ 变换（"逆变"），恰好抵消基向量的变化，使向量本身不变。`}>{R`\widetilde{X}^\mu=X^\nu\frac{\partial y^\mu}{\partial x^\nu}.`}</Eq>
        <Tx>{R`再次注意：向量分量的变换方式恰好使**向量本身保持不变**。

$T_pM$ 的基不必是 $\{e_\mu\}$；也可以考虑线性组合 $\hat e_i\equiv A_i{}^\mu e_\mu$，其中 $A=(A_i{}^\mu)\in\mathrm{GL}(m,\R)$。基 $\{\hat e_i\}$ 称为**非坐标基**（non-coordinate basis）。（第 7 章的标架 $\{\hat e_\alpha\}$ 就是这样的基；一般找不到坐标 $z$ 使 $\hat e_i=\partial/\partial z^i$——判据是它们的李括号是否为零，见 §5.3。）`}</Tx>
      </Sub>

      <Sub n="5.2.3" title="One-forms" zh="一形式">
        <Tx>{R`$T_pM$ 是向量空间，所以存在它的对偶空间，其元素是从 $T_pM$ 到 $\R$ 的线性函数（见 §2.2）。这个对偶空间称为 $p$ 处的**余切空间**（cotangent space），记作 $T_p^*M$。$T_p^*M$ 的元素 $\omega:T_pM\to\R$ 称为**对偶向量**、**余切向量**，在微分形式的语境中称为**一形式**（one-form）。一形式最简单的例子是函数 $f\in\mathcal{F}(M)$ 的微分 $\dd f$。向量 $V$ 对 $f$ 的作用是 $V[f]=V^\mu\partial f/\partial x^\mu\in\R$。于是定义 $\dd f\in T_p^*M$ 对 $V\in T_pM$ 的作用为`}</Tx>
        <Eq n="5.24" title="函数的微分" say={R`函数的微分 $\dd f$ 是一个"吃进向量、吐出数"的机器：吃进 $V$，吐出 $f$ 沿 $V$ 的变化率。`}>{R`\langle\dd f,V\rangle\equiv V[f]=V^\mu\frac{\partial f}{\partial x^\mu}\in\R.`}</Eq>
        <Tx>{R`显然 $\langle\dd f,V\rangle$ 对 $V$ 与 $f$ 都是 $\R$ 线性的。

用坐标 $x=\varphi(p)$ 表示，$\dd f=(\partial f/\partial x^\mu)\dd x^\mu$，所以自然把 $\{\dd x^\mu\}$ 看成 $T_p^*M$ 的基。而且它是**对偶基**，因为`}</Tx>
        <Eq n="5.25" title="对偶基" say={R`坐标微分 $\dd x^\mu$ 恰好"挑出"向量的第 $\mu$ 个分量：它们与坐标基 $\partial/\partial x^\nu$ 互为对偶。`}>{R`\left\langle\dd x^\nu,\frac{\partial}{\partial x^\mu}\right\rangle=\frac{\partial x^\nu}{\partial x^\mu}=\delta^\nu_\mu.`}</Eq>
        <Tx>{R`（这是 \eqref{5.24} 取 $f=x^\nu$、$V=\partial/\partial x^\mu$。）任意一形式 $\omega$ 写成`}</Tx>
        <Eq n="5.26" say={R`一形式在对偶基下展开，系数 $\omega_\mu$ 称为它的分量（下指标）。`}>{R`\omega=\omega_\mu\,\dd x^\mu`}</Eq>
        <Tx>{R`其中 $\omega_\mu$ 是 $\omega$ 的分量。取向量 $V=V^\mu\partial/\partial x^\mu$ 与一形式 $\omega=\omega_\mu\dd x^\mu$，**内积** $\langle\ ,\ \rangle:T_p^*M\times T_pM\to\R$ 定义为`}</Tx>
        <Eq n="5.27" title="一形式与向量的配对" say={R`一形式作用在向量上就是分量对应相乘再求和——上下指标配对，结果是与坐标无关的数。`}>{R`\langle\omega,V\rangle=\omega_\mu V^\nu\left\langle\dd x^\mu,\frac{\partial}{\partial x^\nu}\right\rangle=\omega_\mu V^\nu\delta^\mu_\nu=\omega_\mu V^\mu.`}</Eq>
        <Tx>{R`注意：内积定义在**一个向量与一个对偶向量之间**，而不是两个向量或两个对偶向量之间（后者需要度规，第 7 章）。

由于 $\omega$ 的定义不依赖任何坐标系，对 $p\in U_i\cap U_j$ 有

$$\omega=\omega_\mu\dd x^\mu=\widetilde{\omega}_\nu\dd y^\nu,$$

其中 $x=\varphi_i(p)$，$y=\varphi_j(p)$。由 $\dd x^\mu=(\partial x^\mu/\partial y^\nu)\dd y^\nu$（原书写作由 $\dd y^\nu=(\partial y^\nu/\partial x^\mu)\dd x^\mu$，二者等价）得到`}</Tx>
        <Eq n="5.28" title="一形式分量的变换律" say={R`一形式的分量按逆 Jacobi 矩阵 $\partial x/\partial y$ 变换（"协变"），与向量分量的变换恰好相反，所以配对 $\omega_\mu V^\mu$ 不变。`}>{R`\widetilde{\omega}_\nu=\omega_\mu\frac{\partial x^\mu}{\partial y^\nu}.`}</Eq>
        <Box kind="key" title="为什么上下指标要这样放">{R`由 \eqref{5.23} 与 \eqref{5.28}，

$$\widetilde{\omega}_\mu\widetilde{X}^\mu=\omega_\lambda\frac{\partial x^\lambda}{\partial y^\mu}X^\nu\frac{\partial y^\mu}{\partial x^\nu}=\omega_\lambda X^\nu\delta^\lambda_\nu=\omega_\nu X^\nu.$$

上指标（向量分量）与下指标（一形式分量）以相反的 Jacobi 矩阵变换，配对后二者相消。这就是 Einstein 求和约定总是"一上一下"求和的原因：只有这样得到的才是与坐标无关的量。`}</Box>
      </Sub>

      <Sub n="5.2.4" title="Tensors" zh="张量">
        <Tx>{R`$(q,r)$ 型**张量**（tensor）是把 $q$ 个 $T_p^*M$ 元素与 $r$ 个 $T_pM$ 元素映成实数的多重线性对象。$\mathcal{T}^q_{r,p}(M)$ 表示 $p\in M$ 处 $(q,r)$ 型张量的集合。用前面的基，$\mathcal{T}^q_{r,p}(M)$ 的元素写成`}</Tx>
        <Eq n="5.29" title="(q,r) 型张量" say={R`一般张量是 $q$ 个坐标基向量与 $r$ 个对偶基的张量积的线性组合；系数有 $q$ 个上指标、$r$ 个下指标。`}>{R`T=T^{\mu_1\ldots\mu_q}{}_{\nu_1\ldots\nu_r}\frac{\partial}{\partial x^{\mu_1}}\ldots\frac{\partial}{\partial x^{\mu_q}}\dd x^{\nu_1}\ldots\dd x^{\nu_r}.`}</Eq>
        <Tx>{R`（基之间省略了张量积符号 $\otimes$。）显然这是从 $\bigotimes^qT_p^*M\otimes^rT_pM$ 到 $\R$ 的线性函数。设 $V_i=V_i^\mu\partial/\partial x^\mu$（$1\le i\le r$），$\omega_i=\omega_{i\mu}\dd x^\mu$（$1\le i\le q$），$T$ 作用在它们上面得到一个数：

$$T(\omega_1,\ldots,\omega_q;V_1,\ldots,V_r)=T^{\mu_1\ldots\mu_q}{}_{\nu_1\ldots\nu_r}\,\omega_{1\mu_1}\ldots\omega_{q\mu_q}V_1^{\nu_1}\ldots V_r^{\nu_r}.$$

在这个记号下，内积就是 $\langle\omega,X\rangle=\omega(X)$。

**张量分量的变换律**（由 \eqref{5.23}、\eqref{5.28} 推出）：每个上指标乘一个 $\partial y/\partial x$，每个下指标乘一个 $\partial x/\partial y$，

$$\widetilde{T}^{\alpha_1\ldots\alpha_q}{}_{\beta_1\ldots\beta_r}=\frac{\partial y^{\alpha_1}}{\partial x^{\mu_1}}\cdots\frac{\partial y^{\alpha_q}}{\partial x^{\mu_q}}\frac{\partial x^{\nu_1}}{\partial y^{\beta_1}}\cdots\frac{\partial x^{\nu_r}}{\partial y^{\beta_r}}\,T^{\mu_1\ldots\mu_q}{}_{\nu_1\ldots\nu_r}.$$

物理书常把这条变换律当作张量的**定义**；这里它是"张量是与坐标无关的多重线性映射"这一定义的推论。`}</Tx>
      </Sub>

      <Sub n="5.2.5" title="Tensor fields" zh="张量场">
        <Tx>{R`若在 $M$ 的每一点**光滑地**指定一个向量，就称之为 $M$ 上的**向量场**（vector field）。换句话说，若对任意 $f\in\mathcal{F}(M)$ 都有 $V[f]\in\mathcal{F}(M)$，则 $V$ 是向量场。显然向量场的每个分量都是从 $M$ 到 $\R$ 的光滑函数。$M$ 上向量场的集合记作 $\mathcal{X}(M)$。向量场 $X$ 在 $p\in M$ 处的值记作 $X|_p$，它是 $T_pM$ 的元素。类似地，在每点 $p\in M$ 光滑地指定 $\mathcal{T}^q_{r,p}(M)$ 的一个元素，就定义了 $(q,r)$ 型**张量场**（tensor field）；$M$ 上 $(q,r)$ 型张量场的集合记作 $\mathcal{T}^q_r(M)$。例如 $\mathcal{T}^0_1(M)$ 是对偶向量场的集合，在微分形式的语境中也记作 $\Omega^1(M)$（见 §5.4）；同样 $\mathcal{T}^0_0(M)=\mathcal{F}(M)$ 在那里记作 $\Omega^0(M)$。`}</Tx>
      </Sub>

      <Sub n="5.2.6" title="Induced maps" zh="诱导映射">
        <Tx>{R`**推前。**光滑映射 $f:M\to N$ 自然诱导一个映射 $f_*$，称为**微分映射**（differential map）（\figref{5.10}）：`}</Tx>
        <Eq n="5.30" say={R`映射把点送到点，它的微分就把该点的切向量送到像点的切向量。`}>{R`f_*:T_pM\to T_{f(p)}N.`}</Eq>
        <Figure n="5.10" caption={R`映射 $f:M\to N$ 诱导微分映射 $f_*:T_pM\to T_{f(p)}N$。`} width="75%" />
        <Tx>{R`$f_*$ 的显式形式由"切向量是沿曲线的方向导数"这一定义得到。若 $g\in\mathcal{F}(N)$，则 $g\circ f\in\mathcal{F}(M)$。向量 $V\in T_pM$ 作用在 $g\circ f$ 上给出一个数 $V[g\circ f]$。于是定义 $f_*V\in T_{f(p)}N$ 为`}</Tx>
        <Eq n="5.31" title="推前的定义" say={R`推前后的向量怎样对 $N$ 上的函数求导？把函数先拉回到 $M$（复合上 $f$），再让原向量去求导。`}>{R`(f_*V)[g]\equiv V[g\circ f]`}</Eq>
        <Tx>{R`或用 $M$ 上的卡 $(U,\varphi)$ 与 $N$ 上的卡 $(V,\psi)$ 写成`}</Tx>
        <Eq n="5.32" say={R`同一定义的坐标版本：两边的函数都换成坐标表示。`}>{R`(f_*V)[g\circ\psi^{-1}(y)]\equiv V[g\circ f\circ\varphi^{-1}(x)]`}</Eq>
        <Tx>{R`其中 $x=\varphi(p)$，$y=\psi(f(p))$。令 $V=V^\mu\partial/\partial x^\mu$，$f_*V=W^\alpha\partial/\partial y^\alpha$，\eqref{5.32} 给出

$$W^\alpha\frac{\partial}{\partial y^\alpha}[g\circ\psi^{-1}(y)]=V^\mu\frac{\partial}{\partial x^\mu}[g\circ f\circ\varphi^{-1}(x)].$$

取 $g=y^\alpha$（第 $\alpha$ 个坐标函数），得到 $W^\alpha$ 与 $V^\mu$ 的关系`}</Tx>
        <Eq n="5.33" keyEq title="推前的分量" say={R`推前就是乘以映射的 Jacobi 矩阵：$f$ 在 $p$ 点的线性化把 $M$ 的切向量映成 $N$ 的切向量。`}>{R`W^\alpha=V^\mu\frac{\partial}{\partial x^\mu}y^\alpha(x).`}</Eq>
        <Tx>{R`注意矩阵 $(\partial y^\alpha/\partial x^\mu)$ 正是映射 $f:M\to N$ 的 Jacobi 矩阵。（当 $M=N$、$f$ 为恒等映射而只换坐标时，\eqref{5.33} 退化为 \eqref{5.23}。）微分映射自然推广到 $(q,0)$ 型张量：$f_*:\mathcal{T}^q_{0,p}(M)\to\mathcal{T}^q_{0,f(p)}(N)$——每个向量因子各自推前。`}</Tx>
        <Box kind="example" n="5.8" title="把平面推前到半球面上">{R`设 $(x^1,x^2)$ 与 $(y^1,y^2,y^3)$ 分别是 $M$ 与 $N$ 的坐标，$V=a\,\partial/\partial x^1+b\,\partial/\partial x^2$ 是 $(x^1,x^2)$ 处的切向量。设 $f:M\to N$ 的坐标表示为 $y=(x^1,x^2,\sqrt{1-(x^1)^2-(x^2)^2})$（单位圆盘被映到上半球面）。由 $\partial y^3/\partial x^1=-x^1/\sqrt{1-(x^1)^2-(x^2)^2}=-y^1/y^3$，$\partial y^3/\partial x^2=-y^2/y^3$，

$$f_*V=V^\mu\frac{\partial y^\alpha}{\partial x^\mu}\frac{\partial}{\partial y^\alpha}=a\frac{\partial}{\partial y^1}+b\frac{\partial}{\partial y^2}-\left(a\frac{y^1}{y^3}+b\frac{y^2}{y^3}\right)\frac{\partial}{\partial y^3}.$$

检验：$f_*V$ 与位置向量 $(y^1,y^2,y^3)$ 的点积为 $ay^1+by^2-(ay^1+by^2)=0$——推前的向量确实切于球面。`}</Box>
        <Exercise n="5.3" title="推前的链式法则" level="★"
          hint={R`把两边作用在 $P$ 上任意函数 $h$ 上，反复用 \eqref{5.31}。`}
          solution={R`对 $V\in T_pM$、$h\in\mathcal{F}(P)$，由 \eqref{5.31}，

$$((g\circ f)_*V)[h]=V[h\circ g\circ f]=V[(h\circ g)\circ f]=(f_*V)[h\circ g]=(g_*(f_*V))[h].$$

$h$ 任意，故 $(g\circ f)_*V=g_*f_*V$，即 $(g\circ f)_*=g_*\circ f_*$。

**分量形式。**设 $M,N,P$ 的坐标为 $x^\mu,y^\alpha,z^\kappa$，由 \eqref{5.33}，$(g\circ f)_*$ 的矩阵是 $\partial z^\kappa/\partial x^\mu$，$g_*\circ f_*$ 的矩阵是 $(\partial z^\kappa/\partial y^\alpha)(\partial y^\alpha/\partial x^\mu)$。二者相等就是多元链式法则——推前的复合律是"Jacobi 矩阵相乘"的坐标无关版本。`}>
          <>
          <Tx>{R`设 $f:M\to N$，$g:N\to P$。证明复合映射 $g\circ f:M\to P$ 的微分映射为`}</Tx>
          <Eq n="5.34" title="推前的复合律" say={R`先映 $f$ 再映 $g$ 的推前，等于先推前 $f_*$ 再推前 $g_*$——这就是链式法则：Jacobi 矩阵相乘。`}>{R`(g\circ f)_*=g_*\circ f_*.`}</Eq>
        </>
        </Exercise>
        <Tx>{R`**拉回。**映射 $f:M\to N$ 还诱导一个映射`}</Tx>
        <Eq n="5.35" say={R`一形式的诱导映射方向与 $f$ 相反：从像点的余切空间回到原点的余切空间。`}>{R`f^*:T^*_{f(p)}N\to T^*_pM.`}</Eq>
        <Tx>{R`注意 $f_*$ 与 $f$ 同向，$f^*$ 却反向，因此称为**拉回**（pullback），见 §2.2。取 $V\in T_pM$ 与 $\omega\in T^*_{f(p)}N$，$\omega$ 被 $f^*$ 的拉回定义为`}</Tx>
        <Eq n="5.36" keyEq title="拉回的定义" say={R`拉回后的一形式怎样吃 $M$ 上的向量？先把向量推前到 $N$，再让原来的一形式去吃。`}>{R`\langle f^*\omega,V\rangle=\langle\omega,f_*V\rangle.`}</Eq>
        <Tx>{R`拉回 $f^*$ 自然推广到 $(0,r)$ 型张量，$f^*:\mathcal{T}^0_{r,f(p)}(N)\to\mathcal{T}^0_{r,p}(M)$。$f^*$ 的分量表示也由 Jacobi 矩阵 $(\partial y^\alpha/\partial x^\mu)$ 给出，见习题 5.4。

**为什么拉回比推前"更好用"：**即使 $f$ 不是单射（两个点映到同一点）或不是满射，$N$ 上的**场** $\omega$ 总能拉回成 $M$ 上的场——$f^*\omega$ 在 $p$ 点的值只用到 $\omega$ 在 $f(p)$ 点的值。而 $M$ 上的向量场一般不能推前成 $N$ 上的向量场：若 $f(p_1)=f(p_2)$，两个推前向量可能不同；不在像里的点则根本没有向量。`}</Tx>
        <Exercise n="5.4" title="拉回的分量" level="★"
          hint={R`把 $f^*\omega$ 作用在基向量 $\partial/\partial x^\mu$ 上，用 \eqref{5.36} 与 \eqref{5.33}。`}
          solution={R`一形式的分量就是它在坐标基上的值：$\xi_\mu=\langle f^*\omega,\partial/\partial x^\mu\rangle$。由 \eqref{5.36}，

$$\xi_\mu=\left\langle\omega,f_*\frac{\partial}{\partial x^\mu}\right\rangle.$$

由 \eqref{5.33}（取 $V^\nu=\delta^\nu_\mu$），$f_*(\partial/\partial x^\mu)=(\partial y^\alpha/\partial x^\mu)\,\partial/\partial y^\alpha$。于是

$$\xi_\mu=\frac{\partial y^\alpha}{\partial x^\mu}\left\langle\omega_\beta\dd y^\beta,\frac{\partial}{\partial y^\alpha}\right\rangle=\frac{\partial y^\alpha}{\partial x^\mu}\omega_\beta\delta^\beta_\alpha=\omega_\alpha\frac{\partial y^\alpha}{\partial x^\mu}.$$

等价地说：$f^*(\dd y^\alpha)=\dd(y^\alpha\circ f)=(\partial y^\alpha/\partial x^\mu)\dd x^\mu$——拉回就是"把 $y$ 当成 $x$ 的函数代进去"。`}>
          <>
          <Tx>{R`设 $f:M\to N$ 是光滑映射。证明：对 $\omega=\omega_\alpha\dd y^\alpha\in T^*_{f(p)}N$，诱导的一形式 $f^*\omega=\xi_\mu\dd x^\mu\in T^*_pM$ 的分量为`}</Tx>
          <Eq n="5.37" title="拉回的分量" say={R`拉回的分量也是乘 Jacobi 矩阵，但这次从左边乘到一形式的下指标上——方向与推前相反。`}>{R`\xi_\mu=\omega_\alpha\frac{\partial y^\alpha}{\partial x^\mu}.`}</Eq>
        </>
        </Exercise>
        <Exercise n="5.5" title="拉回的复合律" level="★"
          hint={R`把两边作用在任意 $V\in T_pM$ 上，用 \eqref{5.36} 与 \eqref{5.34}。`}
          solution={R`对 $\omega\in T^*_{g(f(p))}P$、$V\in T_pM$，

$$\langle(g\circ f)^*\omega,V\rangle=\langle\omega,(g\circ f)_*V\rangle=\langle\omega,g_*f_*V\rangle=\langle g^*\omega,f_*V\rangle=\langle f^*g^*\omega,V\rangle,$$

第二个等号用了 \eqref{5.34}，第三、四个等号各用一次 \eqref{5.36}。$V$ 任意，故 $(g\circ f)^*=f^*\circ g^*$。次序颠倒是因为拉回"往回走"：先从 $P$ 拉到 $N$，再从 $N$ 拉到 $M$。`}>
          <>
          <Tx>{R`设 $f$、$g$ 如习题 5.3。证明复合映射 $g\circ f$ 的拉回为`}</Tx>
          <Eq n="5.38" say={R`拉回的复合次序与映射相反：先用 $g^*$ 从 $P$ 拉到 $N$，再用 $f^*$ 拉到 $M$。`}>{R`(g\circ f)^*=f^*\circ g^*.`}</Eq>
        </>
        </Exercise>
        <Tx>{R`**混合型张量没有自然的诱导映射。**向量要用 $f_*$ 往前推，一形式要用 $f^*$ 往回拉，二者方向相反，对 $(q,r)$ 型（$q,r$ 都不为零）张量无法同时进行。只有当 $f:M\to N$ 是**微分同胚**时才能推广：此时 $f^{-1}$ 的 Jacobi 矩阵也有定义，可以用 $(f^{-1})^*$ 把一形式"往前推"。`}</Tx>
        <Exercise n="5.6" title={R`$(1,1)$ 型张量的推前`} level="★★"
          hint={R`对微分同胚，向量因子用 $f_*$，一形式因子用 $(f^{-1})^*$ 推到 $N$ 上。`}
          solution={R`对微分同胚 $f$，定义 $(1,1)$ 张量的推前为：向量因子用 $f_*$，一形式因子用 $(f^{-1})^*:T^*_pM\to T^*_{f(p)}N$，即

$$f_*\left(T^\mu{}_\nu\frac{\partial}{\partial x^\mu}\otimes\dd x^\nu\right)\equiv T^\mu{}_\nu\,f_*\!\left(\frac{\partial}{\partial x^\mu}\right)\otimes(f^{-1})^*(\dd x^\nu).$$

第一个因子由 \eqref{5.33}：$f_*(\partial/\partial x^\mu)=(\partial y^\alpha/\partial x^\mu)\,\partial/\partial y^\alpha$。第二个因子由 \eqref{5.37}，把 $f^{-1}:N\to M$ 的 Jacobi 矩阵 $\partial x^\nu/\partial y^\beta$ 代入：$(f^{-1})^*(\dd x^\nu)=(\partial x^\nu/\partial y^\beta)\dd y^\beta$。合起来

$$f_*\left(T^\mu{}_\nu\frac{\partial}{\partial x^\mu}\otimes\dd x^\nu\right)=T^\mu{}_\nu\left(\frac{\partial y^\alpha}{\partial x^\mu}\right)\left(\frac{\partial x^\nu}{\partial y^\beta}\right)\frac{\partial}{\partial y^\alpha}\otimes\dd y^\beta.$$

这与张量分量的变换律形式完全相同：被动的坐标变换就是恒等映射 $M\to M$ 在两套坐标中的推前。`}>
          {R`设 $T^\mu{}_\nu\,\frac{\partial}{\partial x^\mu}\otimes\dd x^\nu$ 是 $M$ 上的 $(1,1)$ 型张量场，$f:M\to N$ 是微分同胚。证明 $N$ 上的诱导张量为 $f_*\left(T^\mu{}_\nu\frac{\partial}{\partial x^\mu}\otimes\dd x^\nu\right)=T^\mu{}_\nu\left(\frac{\partial y^\alpha}{\partial x^\mu}\right)\left(\frac{\partial x^\nu}{\partial y^\beta}\right)\frac{\partial}{\partial y^\alpha}\otimes\dd y^\beta$，其中 $x^\mu$、$y^\alpha$ 分别是 $M$、$N$ 的局部坐标。`}
        </Exercise>
      </Sub>

      <Sub n="5.2.7" title="Submanifolds" zh="子流形">
        <Tx>{R`本节最后定义流形的子流形，同时澄清"嵌入"的含义。`}</Tx>
        <Stmt id="D5.3" />
        <Tx>{R`若 $f$ 是浸入，由于 $\operatorname{rank}f_*=\dim M$，$f_*$ 把 $T_pM$ 同构地映到 $T_{f(p)}N$ 的一个 $m$ 维向量子空间。由第 2 章定理 2.1（秩–零化度定理，\sref{X:T2.1}）还得到 $\ker f_*=\{0\}$。若 $f$ 是嵌入，$M$ 与 $f(M)$ 微分同胚。

例子能澄清这些相当技术性的要点。考虑\figref{5.11}(a) 中的映射 $f:S^1\to\R^2$。它是浸入，因为 $S^1$ 的一维切空间被 $f_*$ 映到 $T_{f(p)}\R^2$ 的子空间（曲线处处有非零的速度）。但像 $f(S^1)$ 不是 $\R^2$ 的子流形，因为 $f$ 不是单射（交叉点有两个原像）。\figref{5.11}(b) 中的映射 $g:S^1\to\R^2$ 是嵌入，$g(S^1)$ 是 $\R^2$ 的子流形。显然嵌入是浸入，但反过来不一定成立。前一节我们偶尔提到 $S^n$ 嵌入 $\R^{n+1}$，现在它的含义清楚了：若 $S^n$ 由 $f:S^n\to\R^{n+1}$ 嵌入，则 $S^n$ 与 $f(S^n)$ 微分同胚。`}</Tx>
        <Box kind="warning" title={R`勘误：$f_*$ 而非 $f^*$（p.208）`}>{R`原书在\sref{D5.3} 之后写 "If $f$ is an immersion, $f^*$ maps $T_pM$ isomorphically to an $m$-dimensional vector subspace of $T_{f(p)}N$"。作用在 $T_pM$ 上、映到 $T_{f(p)}N$ 的是微分映射 $f_*$；拉回 $f^*$ 作用在余切空间上且方向相反。正文已改为 $f_*$。`}</Box>
        <Figure n="5.11" caption={R`(a) 不是嵌入的浸入 $f$；(b) 嵌入 $g$ 与子流形 $g(S^1)$。`} width="75%" />
        <Box kind="aside" title="浸入但不是嵌入的另一类例子">{R`单射的浸入也未必是嵌入（在严格的意义下）：把 $\R$ 映成"6 字形"，让 $t\to+\infty$ 时曲线趋向自身上的一点，这个映射是单射浸入，但像上的拓扑与 $\R$ 不同（像不是 $\R$ 的同胚像）。$T^2$ 上斜率为无理数的直线 $t\mapsto(t,\alpha t)\bmod2\pi$ 也是单射浸入，像在 $T^2$ 中稠密。严格的定义要求嵌入是到像的同胚，原书"实际上 $f(M)$ 与 $M$ 微分同胚"一句正是这个要求。`}</Box>
      </Sub>
    </Sec>);
}
