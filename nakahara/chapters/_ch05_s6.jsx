// §5.6 李群与李代数 —— 式 (5.103)–(5.140)，定义 5.8–5.13，定理 5.2–5.3，命题 5.2，例 5.14–5.15，习题 5.19–5.23
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, C } from "@kit";

const R = String.raw;

export function Sec56() {
  return (
    <Sec n="5.6" title="Lie groups and Lie algebras" zh="李群与李代数"
      gist={R`李群 = 群运算光滑的流形（\sref{D5.8}）；矩阵群 $\mathrm{O}(n),\mathrm{SL}(n),\mathrm{U}(n),\ldots$ 由闭子群定理（\sref{T5.2}）都是李群 → 左平移 → 左不变向量场 $X_V|_g=L_{g*}V$，与 $T_eG$ 一一对应 → 它们在李括号下封闭，构成李代数 $\sym{lie}{\mathfrak{g}}$；对矩阵群 $L_{g*}V=gV$、括号就是矩阵对易子 → 单参数子群与指数映射 $\exp(tV)$ → 结构常数与 Maurer–Cartan 方程 $\dd\theta+\frac12[\theta\wedge\theta]=0$。`}
      why={R`物理中的对称性（转动、Lorentz、规范变换）是连续群；群的几何（流形结构）与代数（乘法）相互制约，使得整个群几乎完全由单位元附近的"无穷小生成元"及其对易关系决定。`}
      gives={["5.103", "5.111", "5.112", "5.115", "5.116", "5.117", "5.128", "5.129", "5.133", "5.136", "5.139"]}>
      <p className="muted">本节概念：<C id="lie_group" /> · <C id="lie_algebra" /></p>
      <Tx>{R`**李群**是定义了群运算——**乘法**与**求逆**——的流形。李群在纤维丛理论中起极其重要的作用，在物理中也有大量应用。这里我们研究李群与李代数的几何方面。`}</Tx>

      <Sub n="5.6.1" title="Lie groups" zh="李群">
        <Stmt id="D5.8" />
        <Tx>{R`李群的单位元记作 $e$。李群 $G$ 的维数定义为 $G$ 作为流形的维数。乘号可以省略，$g_1\cdot g_2$ 通常写作 $g_1g_2$。例如令 $\R^*\equiv\R-\{0\}$。取三个元素 $x,y,z\in\R^*$ 使 $xy=z$。显然把接近 $x$ 的数乘以接近 $y$ 的数，得到接近 $z$ 的数；同样，接近 $x$ 的数的逆接近 $1/x$。事实上这些映射可以对相关的变量求导，$\R^*$ 在这些群运算下成为李群。若乘法可交换，即 $g_1g_2=g_2g_1$，我们常用加号 $+$ 代替乘号。`}</Tx>
        <Exercise n="5.19" title="几个最简单的李群" level="★"
          hint={R`三个都是 $\R^n$ 的开子集，用一张卡；只需检查乘法、求逆在坐标中光滑，并且集合对它们封闭。`}
          solution={R`**(a)** $\R^+$ 是 $\R$ 的开子集，用恒等映射作一张卡，是一维流形。两个正数之积为正、正数的逆为正，所以对群运算封闭；单位元 $1\in\R^+$。乘法 $(x,y)\mapsto xy$ 是多项式，求逆 $x\mapsto1/x$ 在 $x>0$ 上 $C^\infty$。故 $\R^+$ 是李群。（$\log:\R^+\to\R$ 是从乘法群到加法群的同构，也是微分同胚。）

**(b)** $\R$ 是流形（一张卡）。加法 $(x,y)\mapsto x+y$ 与求逆 $x\mapsto-x$ 都是线性函数，$C^\infty$。

**(c)** 同理：$\R^2$ 用一张卡，$((x_1,y_1),(x_2,y_2))\mapsto(x_1+x_2,y_1+y_2)$ 与 $(x,y)\mapsto(-x,-y)$ 是线性映射，$C^\infty$。`}>
          {R`(a) 证明 $\R^+=\{x\in\R\mid x>0\}$ 在乘法下是李群。(b) 证明 $\R$ 在加法下是李群。(c) 证明 $\R^2$ 在加法 $(x_1,y_1)+(x_2,y_2)=(x_1+x_2,y_1+y_2)$ 下是李群。`}
        </Exercise>
        <Box kind="example" n="5.14" title={R`$\mathrm{U}(1)$`}>{R`设 $S^1$ 是复平面上的单位圆，

$$S^1=\{\mathrm{e}^{\mathrm{i}\theta}\mid\theta\in\R\ (\bmod2\pi)\}.$$

由 $\mathrm{e}^{\mathrm{i}\theta}\mathrm{e}^{\mathrm{i}\varphi}=\mathrm{e}^{\mathrm{i}(\theta+\varphi)}$ 与 $(\mathrm{e}^{\mathrm{i}\theta})^{-1}=\mathrm{e}^{-\mathrm{i}\theta}$ 定义的群运算可微，$S^1$ 成为李群，称为 $\mathrm{U}(1)$。容易看出，这些群运算就是习题 5.19(b) 中的运算模 $2\pi$。（在例 5.2 的卡中，乘法就是角度相加，转移函数的 $2\pi$ 平移不影响光滑性。）`}</Box>
        <Tx>{R`**矩阵群。**物理应用中特别重要的是**矩阵群**，即一般线性群 $\mathrm{GL}(n,\R)$ 或 $\mathrm{GL}(n,\C)$ 的子群。元素之积就是矩阵乘法，逆就是逆矩阵。$\mathrm{GL}(n,\R)$ 的坐标由矩阵 $M=\{x_{ij}\}$ 的 $n^2$ 个元素给出（$\mathrm{GL}(n,\R)=\det^{-1}(\R-\{0\})$ 是 $\R^{n^2}$ 的开子集）。$\mathrm{GL}(n,\R)$ 是实维数 $n^2$ 的非紧流形。

$\mathrm{GL}(n,\R)$ 的有趣子群有**正交群** $\mathrm{O}(n)$、**特殊线性群** $\mathrm{SL}(n,\R)$ 与**特殊正交群** $\mathrm{SO}(n)$：`}</Tx>
        <Eq n="5.103" title="正交群" say={R`正交群：保持欧氏长度的线性变换（转动加反射），条件是矩阵的转置就是它的逆。`}>{R`\mathrm{O}(n)=\{M\in\mathrm{GL}(n,\R)\mid MM^{\mathrm t}=M^{\mathrm t}M=I_n\}`}</Eq>
        <Eq n="5.104" say={R`特殊线性群：保持体积（行列式为 1）的线性变换。`}>{R`\mathrm{SL}(n,\R)=\{M\in\mathrm{GL}(n,\R)\mid\det M=1\}`}</Eq>
        <Eq n="5.105" say={R`特殊正交群：只保留转动，去掉反射。`}>{R`\mathrm{SO}(n)=\mathrm{O}(n)\cap\mathrm{SL}(n,\R)`}</Eq>
        <Tx>{R`其中 $(\cdot)^{\mathrm t}$ 表示矩阵的转置。在狭义相对论中我们熟悉 **Lorentz 群**

$$\mathrm{O}(1,3)=\{M\in\mathrm{GL}(4,\R)\mid M\eta M^{\mathrm t}=\eta\},$$

其中 $\eta$ 是 Minkowski 度规，$\eta=\mathrm{diag}(-1,1,1,1)$。推广到更高维时空是平凡的。`}</Tx>
        <Exercise n="5.20" title={R`$\mathrm{O}(1,3)$ 的四个连通分支`} level="★★"
          hint={R`取 $M\eta M^{\mathrm t}=\eta$ 的行列式与 $(0,0)$ 元。非紧性：看 boost 的矩阵元。`}
          solution={R`**非紧。**沿 $x^1$ 方向的 boost $\Lambda(\alpha)$（左上 $2\times2$ 块为 $\begin{pmatrix}\cosh\alpha&\sinh\alpha\\ \sinh\alpha&\cosh\alpha\end{pmatrix}$，其余为单位阵）满足 $\Lambda\eta\Lambda^{\mathrm t}=\eta$（因 $\cosh^2\alpha-\sinh^2\alpha=1$），属于 $\mathrm{O}(1,3)$，而矩阵元 $\cosh\alpha$ 无界。$\mathrm{O}(1,3)$ 作为 $\R^{16}$ 的子集无界，所以不紧（紧致 $\iff$ 有界闭集）。

**两个离散不变量。**(1) 取 $M\eta M^{\mathrm t}=\eta$ 的行列式：$(\det M)^2\det\eta=\det\eta$，故 $\det M=\pm1$。(2) 取 $(0,0)$ 元：$-1=\eta_{00}=\sum_aM_{0a}\eta_{aa}M_{0a}=-M_{00}^2+\sum_{i=1}^3M_{0i}^2$，故 $M_{00}^2=1+\sum_iM_{0i}^2\ge1$，即 $M_{00}\ge1$ 或 $M_{00}\le-1$。

$\det M$ 与 $\operatorname{sgn}M_{00}$ 是 $\mathrm{O}(1,3)$ 上的连续函数，只取值 $\pm1$，所以在每个连通分支上为常数。四种组合都出现：$I$（$+,+$），空间反射 $P=\mathrm{diag}(1,-1,-1,-1)$（$\det=-1$，$M_{00}=+1$），时间反演 $T=\mathrm{diag}(-1,1,1,1)$（$\det=-1$，$M_{00}=-1$），$PT=-I$（$\det=+1$，$M_{00}=-1$）。所以至少有四个分支。

**恰好四个。**含 $I$ 的集合 $\mathrm{O}^\uparrow_+(1,3)=\{\det=1,M_{00}\ge1\}$ 是连通的：§5.7 例 5.16(c) 证明它是连通群 $\mathrm{SL}(2,\C)$ 的连续像（\eqref{5.147}），或者直接用"每个元素 = 转动 × boost"连续地收缩到 $I$。其他三类分别是陪集 $P\,\mathrm{O}^\uparrow_+$、$T\,\mathrm{O}^\uparrow_+$、$PT\,\mathrm{O}^\uparrow_+$（因为左乘 $P,T,PT$ 恰好翻转相应的不变量，且 $\operatorname{sgn}M_{00}$ 在 Lorentz 矩阵相乘时可乘，这是 Cauchy–Schwarz 不等式的推论），各自同胚于 $\mathrm{O}^\uparrow_+$，也是连通的。故 $\mathrm{O}(1,3)$ 恰有四个连通分支。`}>
          {R`证明群 $\mathrm{O}(1,3)$ 非紧，并按行列式的符号与 $(0,0)$ 元的符号分为四个连通分支。含单位矩阵的分支记作 $\mathrm{O}^\uparrow_+(1,3)$。`}
        </Exercise>
        <Tx>{R`群 $\mathrm{GL}(n,\C)$ 是 $\C^n$ 中非奇异线性变换的集合，由复元素的 $n\times n$ 非奇异矩阵表示。**酉群** $\mathrm{U}(n)$、**特殊线性群** $\mathrm{SL}(n,\C)$ 与**特殊酉群** $\mathrm{SU}(n)$ 定义为`}</Tx>
        <Eq n="5.106" say={R`酉群：保持复内积（量子力学中的概率）的线性变换。`}>{R`\mathrm{U}(n)=\{M\in\mathrm{GL}(n,\C)\mid MM^\dagger=M^\dagger M=\boldsymbol{1}\}`}</Eq>
        <Eq n="5.107" say={R`复特殊线性群：行列式为 1 的复矩阵。$\mathrm{SL}(2,\C)$ 将在 §5.7 中给出 Lorentz 群的双重覆盖。`}>{R`\mathrm{SL}(n,\C)=\{M\in\mathrm{GL}(n,\C)\mid\det M=1\}`}</Eq>
        <Eq n="5.108" say={R`特殊酉群：行列式为 1 的酉矩阵，如强相互作用的色群 $\mathrm{SU}(3)$。`}>{R`\mathrm{SU}(n)=\mathrm{U}(n)\cap\mathrm{SL}(n,\C)`}</Eq>
        <Tx>{R`其中 $\dagger$ 是 Hermite 共轭。

到目前为止我们只说了这些矩阵群是李群 $\mathrm{GL}(n,\R)$（或 $\mathrm{GL}(n,\C)$）的子群。下面的定理保证它们是**李子群**，即它们本身是李群。我们不加证明地接受这个重要的（且难以证明的）定理。`}</Tx>
        <Stmt id="T5.2" />
        <Tx>{R`例如 $\mathrm{O}(n)$、$\mathrm{SL}(n,\R)$ 与 $\mathrm{SO}(n)$ 都是 $\mathrm{GL}(n,\R)$ 的李子群。要看出 $\mathrm{SL}(n,\R)$ 为什么是闭子群，考虑映射 $f:\mathrm{GL}(n,\R)\to\R$，$A\mapsto\det A$。显然 $f$ 是连续映射，且 $f^{-1}(1)=\mathrm{SL}(n,\R)$。单点 $\{1\}$ 是 $\R$ 的闭子集，所以 $f^{-1}(1)$ 在 $\mathrm{GL}(n,\R)$ 中是闭的。于是\sref{T5.2} 说明 $\mathrm{SL}(n,\R)$ 是李子群。

读者应验证 $\mathrm{O}(n)$ 与 $\mathrm{SO}(n)$ 也是 $\mathrm{GL}(n,\R)$ 的李子群：映射 $A\mapsto AA^{\mathrm t}$ 连续，$\mathrm{O}(n)$ 是闭集 $\{I_n\}$ 的原像，所以闭；$\mathrm{SO}(n)=\mathrm{O}(n)\cap\mathrm{SL}(n,\R)$ 是两个闭集之交，也闭；它们显然对乘法与求逆封闭。同理，$\mathrm{U}(n)$、$\mathrm{SL}(n,\C)$、$\mathrm{SU}(n)$ 是 $\mathrm{GL}(n,\C)$ 的李子群，$\mathrm{O}(1,3)$ 是 $\mathrm{GL}(4,\R)$ 的李子群。

**陪集空间。**设 $G$ 是李群，$H$ 是 $G$ 的李子群。定义等价关系：$g\sim g'$ 当且仅当存在 $h\in H$ 使 $g'=gh$。等价类 $[g]$ 是集合 $\{gh\mid h\in H\}$。陪集空间 $G/H$ 是一个流形（不一定是李群），$\dim G/H=\dim G-\dim H$。若 $H$ 是 $G$ 的**正规子群**，即对任意 $g\in G$、$h\in H$ 有 $ghg^{-1}\in H$，则 $G/H$ 是李群。事实上，取等价类 $[g],[g']\in G/H$，构造乘积 $[g][g']$。若 $G/H$ 上的群结构良定义，乘积必须与代表元的选取无关。设 $gh$ 与 $g'h'$ 分别是 $[g]$ 与 $[g']$ 的代表元，则 $ghg'h'=gg'h''h'\in[gg']$，其中的等号成立是因为存在 $h''\in H$ 使 $hg'=g'h''$（正规性：$h''=g'^{-1}hg'\in H$）。`}</Tx>
        <Derivation title={R`$[g]^{-1}=[g^{-1}]$ 也良定义（原书留给读者）`} collapsed steps={[
          { tex: R`(gh)^{-1}=h^{-1}g^{-1}`, why: R`取 $[g]$ 的另一个代表元 $gh$。` },
          { tex: R`h^{-1}g^{-1}=g^{-1}\,(gh^{-1}g^{-1})=g^{-1}h'''`, why: R`$h'''\equiv gh^{-1}g^{-1}\in H$，由 $H$ 正规。` },
          { tex: R`(gh)^{-1}\in[g^{-1}]`, why: R`所以逆的等价类与代表元无关，$[g]^{-1}=[g^{-1}]$；它确实是逆：$[g][g^{-1}]=[e]$。` },
        ]} />
      </Sub>

      <Sub n="5.6.2" title="Lie algebras" zh="李代数">
        <Stmt id="D5.9">
          <Eq n="5.109a" say={R`右平移：从右边乘上 $a$。`}>{R`R_ag=ga`}</Eq>
          <Eq n="5.109b" say={R`左平移：从左边乘上 $a$。`}>{R`L_ag=ag.`}</Eq>
        </Stmt>
        <Tx>{R`由定义，$R_a$ 与 $L_a$ 是 $G$ 到 $G$ 的微分同胚（光滑，且逆为 $R_{a^{-1}}$、$L_{a^{-1}}$）。因此映射 $L_a:G\to G$ 与 $R_a:G\to G$ 诱导 $L_{a*}:T_gG\to T_{ag}G$ 与 $R_{a*}:T_gG\to T_{ga}G$（见 §5.2）。由于这两种平移给出等价的理论，下面我们主要讨论左平移；基于右平移的分析可以类似地进行。

给定李群 $G$，存在一类以"在群作用下不变"为特征的特殊向量场。［在一般流形上，没有典范的方式把某些向量场与其他的区别开来。］`}</Tx>
        <Stmt id="D5.10" />
        <Exercise n="5.21" title="左不变性的分量形式" level="★"
          hint={R`把 \eqref{5.33} 用于映射 $L_a$，其坐标表示为 $x^\mu(g)\mapsto x^\nu(ag)$。`}
          solution={R`$L_a$ 的坐标表示是 $x^\mu(g)\mapsto x^\nu(ag)$，Jacobi 矩阵为 $\partial x^\nu(ag)/\partial x^\mu(g)$。由 \eqref{5.33}，$X|_g=X^\mu(g)\,\partial/\partial x^\mu|_g$ 被推前为

$$L_{a*}X|_g=X^\mu(g)\frac{\partial x^\nu(ag)}{\partial x^\mu(g)}\left.\frac{\partial}{\partial x^\nu}\right|_{ag}.$$

而 $X$ 在 $ag$ 处的值是 $X^\nu(ag)\,\partial/\partial x^\nu|_{ag}$。左不变性 $L_{a*}X|_g=X|_{ag}$ 就是两式相等，即 \eqref{5.110}：分量满足 $X^\nu(ag)=X^\mu(g)\,\partial x^\nu(ag)/\partial x^\mu(g)$。`}>
          <>
            <Tx>{R`验证左不变向量场 $X$ 满足`}</Tx>
            <Eq n="5.110" say={R`左不变性的坐标写法：在 $g$ 点的向量被左平移的 Jacobi 矩阵推到 $ag$ 后，恰好等于向量场在 $ag$ 点本来的值。`}>{R`L_{a*}X|_g=X^\mu(g)\frac{\partial x^\nu(ag)}{\partial x^\mu(g)}\left.\frac{\partial}{\partial x^\nu}\right|_{ag}=X^\nu(ag)\left.\frac{\partial}{\partial x^\nu}\right|_{ag}`}</Eq>
            <Tx>{R`其中 $x^\mu(g)$ 与 $x^\mu(ag)$ 分别是 $g$ 与 $ag$ 的坐标。`}</Tx>
          </>
        </Exercise>
        <Tx>{R`**左不变场由单位元处的值决定。**向量 $V\in T_eG$ 通过`}</Tx>
        <Eq n="5.111" title="由 V 生成的左不变场" say={R`把单位元处的一个切向量用左平移"搬"到群的每一点，就得到一个左不变向量场。`}>{R`X_V|_g=L_{g*}V\qquad g\in G`}</Eq>
        <Tx>{R`在整个 $G$ 上定义唯一的左不变向量场 $X_V$。事实上，由 \eqref{5.34}，$X_V|_{ag}=L_{ag*}V=(L_aL_g)_*V=L_{a*}L_{g*}V=L_{a*}X_V|_g$。反过来，左不变向量场 $X$ 定义唯一的向量 $V=X|_e\in T_eG$。把 $G$ 上左不变向量场的集合记作 $\sym{lie}{\mathfrak{g}}$。由 $V\mapsto X_V$ 定义的映射 $T_eG\to\sym{lie}{\mathfrak{g}}$ 是同构，所以左不变向量场的集合是同构于 $T_eG$ 的向量空间。特别地，$\dim\sym{lie}{\mathfrak{g}}=\dim G$。

**李括号下封闭。**由于 $\sym{lie}{\mathfrak{g}}$ 是向量场的集合，它是 $\mathcal{X}(G)$ 的子集，§5.3 中定义的李括号在 $\sym{lie}{\mathfrak{g}}$ 上也有定义。我们来证明 $\sym{lie}{\mathfrak{g}}$ 在李括号下封闭。取 $G$ 中两点 $g$ 与 $ag=L_ag$。把 $L_{a*}$ 作用在 $X,Y\in\sym{lie}{\mathfrak{g}}$ 的李括号 $[X,Y]$ 上，得到`}</Tx>
        <Eq n="5.112" title="左不变场的括号仍左不变" say={R`左平移保持李括号，而左不变场在左平移下不变，所以它们的括号也在左平移下不变。`}>{R`L_{a*}[X,Y]|_g=[L_{a*}X|_g,L_{a*}Y|_g]=[X,Y]|_{ag}`}</Eq>
        <Tx>{R`这里用了 $X$、$Y$ 的左不变性与 \eqref{5.52}（$L_a$ 是微分同胚，所以 \eqref{5.52} 适用）。因此 $[X,Y]\in\sym{lie}{\mathfrak{g}}$，即 $\sym{lie}{\mathfrak{g}}$ 在李括号下封闭。

**$\mathrm{GL}(n,\R)$ 的左不变向量场。**具体算出 $\mathrm{GL}(n,\R)$ 的左不变向量场很有启发。$\mathrm{GL}(n,\R)$ 的坐标是矩阵的 $n^2$ 个元素 $x^{ij}$；单位元为 $e=I_n=(\delta^{ij})$。设 $g=\{x^{ij}(g)\}$ 与 $a=\{x^{ij}(a)\}$ 是 $\mathrm{GL}(n,\R)$ 的元素。左平移为

$$L_ag=ag=\sum x^{ik}(a)x^{kj}(g).$$

取向量 $V=\sum V^{ij}\,\partial/\partial x^{ij}|_e\in T_eG$，其中 $V^{ij}$ 是 $V$ 的矩阵元。$V$ 生成的左不变向量场为`}</Tx>
        <Eq n="5.113" title={R`$\mathrm{GL}(n,\R)$ 的左不变场`} say={R`对矩阵群，左平移是线性的，它的 Jacobi 矩阵就是左乘 $g$；所以左不变场在 $g$ 点的分量就是矩阵乘积 $gV$。`}>{R`\begin{aligned}X_V|_g=L_{g*}V&=\sum_{ijklm}V^{ij}\left.\frac{\partial}{\partial x^{ij}}\right|_ex^{kl}(g)x^{lm}(e)\left.\frac{\partial}{\partial x^{km}}\right|_g\\&=\sum V^{ij}x^{kl}(g)\delta^l_i\delta^m_j\left.\frac{\partial}{\partial x^{km}}\right|_g\\&=\sum x^{ki}(g)V^{ij}\left.\frac{\partial}{\partial x^{kj}}\right|_g=\sum(gV)^{kj}\left.\frac{\partial}{\partial x^{kj}}\right|_g\end{aligned}`}</Eq>
        <Tx>{R`其中 $gV$ 是 $g$ 与 $V$ 的通常矩阵乘法。（第一行是 \eqref{5.33}：$L_g$ 把 $x^{lm}$ 映成 $x^{kl}(g)x^{lm}$，对 $x^{ij}$ 求导得 $x^{ki}(g)\delta^m_j$。）向量 $X_V|_g$ 常简写为 $gV$，因为它给出向量的分量。

由 $V=V^{ij}\partial/\partial x^{ij}|_e$ 与 $W=W^{ij}\partial/\partial x^{ij}|_e$ 生成的 $X_V$ 与 $X_W$ 的李括号为`}</Tx>
        <Eq n="5.114" say={R`两个左不变场的李括号在 $g$ 点的分量是 $g$ 乘矩阵对易子 $[V,W]$：向量场的括号化为了矩阵的对易子。`}>{R`\begin{aligned}[X_V,X_W]|_g&=\sum x^{ki}(g)V^{ij}\left.\frac{\partial}{\partial x^{kj}}\right|_g\,x^{ca}(g)W^{ab}\left.\frac{\partial}{\partial x^{cb}}\right|_g-(V\leftrightarrow W)\\&=\sum x^{ij}(g)[V^{jk}W^{kl}-W^{jk}V^{kl}]\left.\frac{\partial}{\partial x^{il}}\right|_g\\&=\sum(g[V,W])^{ij}\left.\frac{\partial}{\partial x^{ij}}\right|_g.\end{aligned}`}</Eq>
        <Tx>{R`（第一行到第二行：$\partial/\partial x^{kj}$ 作用在 $x^{ca}(g)$ 上给出 $\delta^c_k\delta^a_j$；二阶导数项在 $V\leftrightarrow W$ 反对称化后抵消，见习题 5.9。）显然 \eqref{5.113} 与 \eqref{5.114} 对任何矩阵群都成立，于是我们确立了`}</Tx>
        <Eq n="5.115" title="矩阵群：左平移的微分" say={R`矩阵群中，把单位元处的切向量（一个矩阵）左平移到 $g$，就是左乘 $g$。`}>{R`L_{g*}V=gV`}</Eq>
        <Eq n="5.116" keyEq title="矩阵群：李括号 = 对易子" say={R`矩阵群中，左不变场的李括号对应于生成矩阵的对易子 $[V,W]=VW-WV$。`}>{R`[X_V,X_W]|_g=L_{g*}[V,W]=g[V,W].`}</Eq>
        <Tx>{R`现在把李代数定义为左不变向量场的集合 $\sym{lie}{\mathfrak{g}}$ 连同李括号。`}</Tx>
        <Stmt id="D5.11" />
        <Tx>{R`我们用对应的小写德文花体字母表示李群的李代数。例如 $\sym{lie}{\mathfrak{so}}(n)$ 是 $\mathrm{SO}(n)$ 的李代数。`}</Tx>
        <Box kind="example" n="5.15" title="典型李群的李代数">
          <Tx>{R`**(a)** 取习题 5.19(b) 中的 $G=\R$。若把左平移 $L_a$ 定义为 $x\mapsto x+a$，左不变向量场为 $X=\partial/\partial x$。事实上，

$$L_{a*}X\Big|_x=\frac{\partial(a+x)}{\partial x}\frac{\partial}{\partial(a+x)}=\frac{\partial}{\partial(x+a)}=X\Big|_{x+a}.$$

显然这是 $\R$ 上唯一的左不变向量场（不计常数倍）。同样 $X=\partial/\partial\theta$ 是 $G=\mathrm{SO}(2)=\{\mathrm{e}^{\mathrm{i}\theta}\mid0\le\theta\le2\pi\}$ 上唯一的左不变向量场。于是李群 $\R$ 与 $\mathrm{SO}(2)$ 有共同的李代数。

**(b)** 设 $\sym{lie}{\mathfrak{gl}}(n,\R)$ 是 $\mathrm{GL}(n,\R)$ 的李代数，$c:(-\varepsilon,\varepsilon)\to\mathrm{GL}(n,\R)$ 是满足 $c(0)=I_n$ 的曲线。在 $s=0$ 附近曲线近似为 $c(s)=I_n+sA+O(s^2)$，其中 $A$ 是 $n\times n$ 实矩阵。注意对足够小的 $s$，$\det c(s)$ 不会为零，$c(s)$ 确实在 $\mathrm{GL}(n,\R)$ 中。$c(s)$ 在 $I_n$ 处的切向量是 $c'(s)|_{s=0}=A$。这说明 $\sym{lie}{\mathfrak{gl}}(n,\R)$ 是全体 $n\times n$ 矩阵的集合。显然 $\dim\sym{lie}{\mathfrak{gl}}(n,\R)=n^2=\dim\mathrm{GL}(n,\R)$。$\mathrm{GL}(n,\R)$ 的子群更有意思。

**(c)** 求 $\mathrm{SL}(n,\R)$ 的李代数 $\sym{lie}{\mathfrak{sl}}(n,\R)$。按上面的做法，把过 $I_n$ 的曲线近似为 $c(s)=I_n+sA+O(s^2)$，$c(s)$ 在 $I_n$ 处的切向量是 $c'(s)|_{s=0}=A$。曲线 $c(s)$ 要在 $\mathrm{SL}(n,\R)$ 中，须满足 $\det c(s)=1+s\Tr A+O(s^2)=1$，即 $\Tr A=0$。因此 $\sym{lie}{\mathfrak{sl}}(n,\R)$ 是 $n\times n$ 无迹矩阵的集合，$\dim\sym{lie}{\mathfrak{sl}}(n,\R)=n^2-1$。

**(d)** 设 $c(s)=I_n+sA+O(s^2)$ 是 $\mathrm{SO}(n)$ 中过 $I_n$ 的曲线。由于 $c(s)$ 在 $\mathrm{SO}(n)$ 中，它满足 $c(s)^{\mathrm t}c(s)=I_n$。对这个恒等式求导得 $c'(s)^{\mathrm t}c(s)+c(s)^{\mathrm t}c'(s)=0$，在 $s=0$ 处变成 $A^{\mathrm t}+A=0$。因此 $\sym{lie}{\mathfrak{so}}(n)$ 是反对称矩阵的集合。由于我们只关心单位元附近，$\mathrm{O}(n)$ 的李代数与 $\mathrm{SO}(n)$ 的相同：$\sym{lie}{\mathfrak{o}}(n)=\sym{lie}{\mathfrak{so}}(n)$。容易看出 $\dim\sym{lie}{\mathfrak{o}}(n)=\dim\sym{lie}{\mathfrak{so}}(n)=n(n-1)/2$（对角线以上的元素自由）。

**(e)** 对 $\mathrm{GL}(n,\C)$ 的矩阵群可作类似分析。$\sym{lie}{\mathfrak{gl}}(n,\C)$ 是复元素的 $n\times n$ 矩阵的集合，$\dim\sym{lie}{\mathfrak{gl}}(n,\C)=2n^2$（这里的维数是实维数）。$\sym{lie}{\mathfrak{sl}}(n,\C)$ 是无迹矩阵的集合，实维数为 $2(n^2-1)$。为求 $\sym{lie}{\mathfrak{u}}(n)$，考虑 $\mathrm{U}(n)$ 中的曲线 $c(s)=I_n+sA+O(s^2)$。由于 $c(s)^\dagger c(s)=I_n$，有 $c'(s)^\dagger c(s)+c(s)^\dagger c'(s)=0$，在 $s=0$ 处 $A^\dagger+A=0$。因此 $\sym{lie}{\mathfrak{u}}(n)$ 是反 Hermite 矩阵的集合，$\dim\sym{lie}{\mathfrak{u}}(n)=n^2$（对角元纯虚：$n$ 个实参数；对角线以上复数自由：$n(n-1)$ 个）。$\sym{lie}{\mathfrak{su}}(n)=\sym{lie}{\mathfrak{u}}(n)\cap\sym{lie}{\mathfrak{sl}}(n)$ 是无迹反 Hermite 矩阵的集合，$\dim\sym{lie}{\mathfrak{su}}(n)=n^2-1$。`}</Tx>
        </Box>
        <Box kind="aside" title={R`为什么 $\det(I+sA)=1+s\Tr A+O(s^2)$`}>{R`把行列式按定义展开，$\det(I+sA)=\sum_P\operatorname{sgn}(P)\prod_i(\delta_{iP(i)}+sA_{iP(i)})$。$s$ 的一阶项只能来自恒等置换（其他置换至少有两个非对角因子，每个都带一个 $s$），即 $\sum_iA_{ii}=\Tr A$。更一般地有 $\det\mathrm{e}^A=\mathrm{e}^{\Tr A}$。`}</Box>
        <Exercise n="5.22" title={R`$\mathrm{SO}(3)$ 中曲线的切向量`} level="★"
          hint={R`逐元素对 $s$ 求导，令 $s=0$。`}
          solution={R`逐元素求导：

$$c'(0)=\left.\begin{pmatrix}-\sin s&-\cos s&0\\ \cos s&-\sin s&0\\ 0&0&0\end{pmatrix}\right|_{s=0}=\begin{pmatrix}0&-1&0\\ 1&0&0\\ 0&0&0\end{pmatrix}.$$

它是反对称矩阵，属于 $\sym{lie}{\mathfrak{so}}(3)$（例 5.15(d)），正是绕 $z$ 轴转动的生成元，即例 5.19 中的 $X_z$。反过来 $\exp(sX_z)=c(s)$（\eqref{5.129}，用 $X_z^3=-X_z$ 求和）。`}>
          {R`设 $c(s)=\begin{pmatrix}\cos s&-\sin s&0\\ \sin s&\cos s&0\\ 0&0&1\end{pmatrix}$ 是 $\mathrm{SO}(3)$ 中的曲线。求这条曲线在 $I_3$ 处的切向量。`}
        </Exercise>
      </Sub>

      <Sub n="5.6.3" title="The one-parameter subgroup" zh="单参数子群">
        <Tx>{R`向量场 $X\in\mathcal{X}(M)$ 在 $M$ 中生成流（§5.3）。这里我们关心由左不变向量场生成的流。`}</Tx>
        <Stmt id="D5.12">
          <Eq n="5.117" title="单参数子群" say={R`单参数子群是从加法群 $\R$ 到 $G$ 的同态：参数相加对应群元相乘。`}>{R`\phi(t)\phi(s)=\phi(t+s).`}</Eq>
        </Stmt>
        <Tx>{R`容易看出 $\phi(0)=e$（令 $s=0$：$\phi(t)\phi(0)=\phi(t)$），$\phi^{-1}(t)=\phi(-t)$（令 $s=-t$）。注意这样定义的曲线 $\phi$ 是从 $\R$ 到 $G$ 的同态。尽管 $G$ 可能是非 Abel 群，单参数子群却是 Abel 子群：$\phi(t)\phi(s)=\phi(t+s)=\phi(s+t)=\phi(s)\phi(t)$。

**从单参数子群到左不变场。**给定单参数子群 $\phi:\R\to G$，存在向量场 $X$ 使得`}</Tx>
        <Eq n="5.118" say={R`单参数子群是某个向量场的积分曲线。`}>{R`\frac{\dd\phi^\mu(t)}{\dd t}=X^\mu(\phi(t)).`}</Eq>
        <Tx>{R`我们来证明向量场 $X$ 是左不变的。首先注意向量场 $\dd/\dd t$ 在 $\R$ 上是左不变的（见例 5.15(a)）。于是`}</Tx>
        <Eq n="5.119" say={R`在 $\R$ 上，把 $0$ 处的单位切向量平移到 $t$，仍是单位切向量。`}>{R`(L_t)_*\left.\frac{\dd}{\dd t}\right|_0=\left.\frac{\dd}{\dd t}\right|_t.`}</Eq>
        <Tx>{R`接着把诱导映射 $\phi_*:T_t\R\to T_{\phi(t)}G$ 作用在向量 $\dd/\dd t|_0$ 与 $\dd/\dd t|_t$ 上：`}</Tx>
        <Eq n="5.120a" say={R`$\phi$ 把 $\R$ 在 0 处的单位切向量推成曲线在 $e$ 处的速度。`}>{R`\phi_*\left.\frac{\dd}{\dd t}\right|_0=\left.\frac{\dd\phi^\mu(t)}{\dd t}\right|_0\left.\frac{\partial}{\partial g^\mu}\right|_e=X|_e`}</Eq>
        <Eq n="5.120b" say={R`在 $t$ 处同理，得到曲线在 $g=\phi(t)$ 处的速度。`}>{R`\phi_*\left.\frac{\dd}{\dd t}\right|_t=\left.\frac{\dd\phi^\mu(t)}{\dd t}\right|_t\left.\frac{\partial}{\partial g^\mu}\right|_g=X|_g`}</Eq>
        <Tx>{R`其中令 $\phi(t)=g$。由 \eqref{5.119} 与 \eqref{5.120b}，`}</Tx>
        <Eq n="5.121a" say={R`先在 $\R$ 上平移再用 $\phi$ 推前，得到 $g$ 点的切向量。`}>{R`(\phi L_t)_*\left.\frac{\dd}{\dd t}\right|_0=\phi_*L_{t*}\left.\frac{\dd}{\dd t}\right|_0=X|_g.`}</Eq>
        <Tx>{R`由交换性 $\phi L_t=L_g\phi$（因为 $\phi(t+s)=\phi(t)\phi(s)=g\phi(s)$）得到 $\phi_*L_{t*}=L_{g*}\phi_*$。于是 \eqref{5.121a} 变成`}</Tx>
        <Eq n="5.121b" say={R`换个次序：先推前到 $e$ 再在 $G$ 中左平移到 $g$。`}>{R`\phi_*L_{t*}\left.\frac{\dd}{\dd t}\right|_0=L_{g*}\phi_*\left.\frac{\dd}{\dd t}\right|_0=L_{g*}X|_e.`}</Eq>
        <Tx>{R`由 \eqref{5.121a}、\eqref{5.121b} 得到`}</Tx>
        <Eq n="5.122" title="单参数子群的切场是左不变的" say={R`单参数子群在 $g$ 点的速度，等于它在单位元处速度的左平移：生成它的向量场是左不变的。`}>{R`L_{g*}X|_e=X|_g.`}</Eq>
        <Tx>{R`于是给定流 $\phi(t)$，存在相伴的左不变向量场 $X\in\sym{lie}{\mathfrak{g}}$。（严格说，\eqref{5.122} 只在曲线上的点 $g=\phi(t)$ 处得到；把 $X$ 定义为 $X|_e$ 生成的左不变场，它在曲线上与 $\phi$ 的切向量一致。）

**从左不变场到单参数子群。**反过来，左不变向量场 $X$ 定义一个单参数变换群 $\sigma(t,g)$，满足 $\dd\sigma(t,g)/\dd t=X$ 与 $\sigma(0,g)=g$。若定义 $\phi:\R\to G$ 为 $\phi(t)\equiv\sigma(t,e)$，曲线 $\phi(t)$ 就是 $G$ 的单参数子群。为证明这一点，要证 $\phi(s+t)=\phi(s)\phi(t)$。按定义，$\sigma$ 满足`}</Tx>
        <Eq n="5.123" say={R`从 $\phi(s)$ 出发的积分曲线满足的方程。`}>{R`\frac{\dd}{\dd t}\sigma(t,\sigma(s,e))=X(\sigma(t,\sigma(s,e))).`}</Eq>
        <Tx>{R`［为简洁省去了坐标指标；读者若感到不安，可像 \eqref{5.118} 那样补上。］固定参数 $s$，$\bar\sigma(t,\phi(s))\equiv\phi(s)\phi(t)$ 是一条在 $t=0$ 时经过 $\phi(s)\phi(0)=\phi(s)$ 的曲线 $\R\to G$。显然 $\sigma$ 与 $\bar\sigma$ 满足相同的初始条件：`}</Tx>
        <Eq n="5.124" say={R`两条曲线从同一点 $\phi(s)$ 出发。`}>{R`\sigma(0,\sigma(s,e))=\bar\sigma(0,\phi(s))=\phi(s).`}</Eq>
        <Tx>{R`$\bar\sigma$ 也满足与 $\sigma$ 相同的微分方程：`}</Tx>
        <Eq n="5.125" say={R`把单参数子群左平移 $\phi(s)$，由左不变性它仍是 $X$ 的积分曲线。`}>{R`\begin{aligned}\frac{\dd}{\dd t}\bar\sigma(t,\phi(s))&=\frac{\dd}{\dd t}\phi(s)\phi(t)=(L_{\phi(s)})_*\frac{\dd}{\dd t}\phi(t)\\&=(L_{\phi(s)})_*X(\phi(t))\\&=X(\phi(s)\phi(t))\qquad(\text{左不变性})\\&=X(\bar\sigma(t,\phi(s))).\end{aligned}`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{5.125} 左边应为 $\bar\sigma(t,\phi(s))$（p.233）`}>{R`原书 \eqref{5.125} 第一项印作 $\frac{\dd}{\dd t}\bar\sigma(t,\phi(t))$。按 $\bar\sigma$ 的定义，第二个变量是固定的起点 $\phi(s)$，应为 $\bar\sigma(t,\phi(s))$（右边各行也都是 $\phi(s)$）。正文已改正。`}</Box>
        <Tx>{R`由 ODE 的唯一性定理（\sref{X:ODE-uniq}）得出`}</Tx>
        <Eq n="5.126" say={R`左不变场从 $e$ 出发的积分曲线满足群同态性质，所以就是单参数子群。`}>{R`\phi(s+t)=\phi(s)\phi(t).`}</Eq>
        <Tx>{R`我们发现单参数子群与左不变向量场之间有一一对应。如下定义指数映射后，这一对应就一目了然。`}</Tx>
        <Stmt id="D5.13">
          <Eq n="5.127" title="指数映射" say={R`指数映射：沿生成元 $V$ 的单参数子群走单位参数长度，得到的群元记作 $\exp V$。`}>{R`\exp V\equiv\phi_V(1)`}</Eq>
        </Stmt>
        <Stmt id="P5.2">
          <Eq n="5.128" keyEq title={R`$\exp(tV)=\phi_V(t)$`} say={R`沿 $V$ 方向走 $t$ 的单参数子群，就是 $tV$ 的指数——指数映射把直线 $tV$ 映成单参数子群。`}>{R`\exp(tV)=\phi_V(t)`}</Eq>
          <Proof steps={[
            { claim: R`设 $a\neq0$ 为常数。曲线 $t\mapsto\phi_V(at)$ 仍满足 \eqref{5.117}：$\phi_V(at)\phi_V(as)=\phi_V(a(t+s))$，所以是单参数子群。`, uses: ["5.117"], fill: true },
            { claim: R`它在 $t=0$ 处的切向量是 $aV$：`, tex: R`\left.\frac{\dd}{\dd t}\phi_V(at)\right|_{t=0}=a\left.\frac{\dd}{\dd t}\phi_V(t)\right|_{t=0}=aV` },
            { claim: R`更强地，它在每一点的切向量都是 $aX_V$：由链式法则 $\frac{\dd}{\dd t}\phi_V(at)=aX_V|_{\phi_V(at)}$。而 $aX_V=X_{aV}$（$L_{g*}$ 线性）。所以 $\phi_V(at)$ 是 $L_{g*}aV$ 的积分曲线，且 $t=0$ 时在 $e$。`, fill: true },
            { claim: R`左不变场 $L_{g*}aV$ 也生成 $\phi_{aV}(t)$（同一方程、同一初值 $e$）。由唯一性：`, tex: R`\phi_V(at)=\phi_{aV}(t)`, uses: ["X:ODE-uniq", "5.126"] },
            { claim: R`由定义 5.13，取 $t=1$：`, tex: R`\exp(aV)=\phi_{aV}(1)=\phi_V(a)`, uses: ["D5.13"] },
            { claim: R`把 $a$ 换成 $t$ 即得证。$t=0$ 时两边都是 $e$（$\exp0=\phi_0(1)=e$，因为零向量场的积分曲线是常值），所以对一切 $t\in\R$ 成立。`, fill: true },
          ]} />
        </Stmt>
        <Tx>{R`**矩阵群的指数映射。**对矩阵群，指数映射就是矩阵的指数函数。取 $G=\mathrm{GL}(n,\R)$，$A\in\sym{lie}{\mathfrak{gl}}(n,\R)$。定义单参数子群 $\phi_A:\R\to\mathrm{GL}(n,\R)$ 为`}</Tx>
        <Eq n="5.129" title="矩阵指数" say={R`矩阵的指数级数对任何矩阵都绝对收敛；它给出由 $A$ 生成的单参数子群。`}>{R`\phi_A(t)=\exp(tA)=I_n+tA+\frac{t^2}{2!}A^2+\cdots+\frac{t^n}{n!}A^n+\cdots.`}</Eq>
        <Tx>{R`事实上 $\phi_A(t)\in\mathrm{GL}(n,\R)$，因为 $[\phi_A(t)]^{-1}=\phi_A(-t)$ 存在。也容易看出 $\phi_A(t)\phi_A(s)=\phi_A(t+s)$（$tA$ 与 $sA$ 可交换，指数级数的乘法法则成立）。于是指数映射为`}</Tx>
        <Eq n="5.130" say={R`矩阵群的指数映射就是矩阵指数在 $t=1$ 处的值。`}>{R`\phi_A(1)=\exp(A)=I_n+A+\frac{1}{2!}A^2+\cdots+\frac{1}{n!}A^n+\cdots.`}</Eq>
        <Tx>{R`曲线 $g\exp(tA)$ 是过 $g\in G$ 的流。我们有

$$\left.\frac{\dd}{\dd t}g\exp(tA)\right|_{t=0}=L_{g*}A=X_A|_g$$

其中 $X_A$ 是 $A$ 生成的左不变向量场。由 \eqref{5.115}，对矩阵群 $G$ 有`}</Tx>
        <Eq n="5.131" say={R`矩阵群中，左不变场 $X_A$ 在 $g$ 点就是矩阵 $gA$。`}>{R`L_{g*}A=X_A|_g=gA.`}</Eq>
        <Tx>{R`曲线 $g\exp(tA)$ 定义映射 $\sigma_t:G\to G$，$\sigma_t(g)\equiv g\exp(tA)$，它也可以表示为右平移：`}</Tx>
        <Eq n="5.132" say={R`左不变场的流是右平移：沿 $X_A$ 流动 $t$，就是从右边乘上 $\exp(tA)$。`}>{R`\sigma_t=R_{\exp(tA)}.`}</Eq>
        <Box kind="key" title="左不变场 ↔ 右平移流">{R`这里有一个容易混淆的"左右互换"：**左不变**向量场生成的流是**右平移**。原因是左平移与右平移可交换（$L_aR_b g=agb=R_bL_ag$），所以右平移的流把左不变场映成自己。物理上：刚体的"体坐标系"角速度对应左不变场，"空间系"角速度对应右不变场。`}</Box>
      </Sub>

      <Sub n="5.6.4" title="Frames and structure equation" zh="标架与结构方程">
        <Tx>{R`设 $n$ 个向量 $\{V_1,V_2,\ldots,V_n\}$ 是 $T_eG$ 的基，$n=\dim G$。［本书始终假定 $n$ 有限。］这组基在 $G$ 的每一点 $g$ 定义 $n$ 个线性无关的左不变向量场 $\{X_1,X_2,\ldots,X_n\}$：$X_\mu|_g=L_{g*}V_\mu$。注意 $\{X_\mu\}$ 是在整个 $G$ 上都有定义的基标架（所以李群总是**可平行化**的，$TG\cong G\times\R^n$）。由于 $[X_\mu,X_\nu]|_g$ 仍是 $g$ 处 $\sym{lie}{\mathfrak{g}}$ 的元素，可以用 $\{X_\mu\}$ 展开：`}</Tx>
        <Eq n="5.133" title="结构常数" say={R`两个基生成元的李括号仍是生成元的线性组合，组合系数就是结构常数——它们完全刻画了李代数。`}>{R`[X_\mu,X_\nu]=c_{\mu\nu}{}^\lambda X_\lambda`}</Eq>
        <Tx>{R`其中 $c_{\mu\nu}{}^\lambda$ 称为李群 $G$ 的**结构常数**（structure constants）。若 $G$ 是矩阵群，\eqref{5.133} 的左边在 $g=e$ 处恰是矩阵 $V_\mu$ 与 $V_\nu$ 的对易子，见 \eqref{5.116}。我们来证明 $c_{\mu\nu}{}^\lambda$ 确实是与 $g$ 无关的常数。设 $c_{\mu\nu}{}^\lambda(e)$ 是单位元处的结构常数。把 $L_{g*}$ 作用在李括号上（\eqref{5.112}），得到

$$[X_\mu,X_\nu]|_g=c_{\mu\nu}{}^\lambda(e)X_\lambda|_g,$$

这就说明结构常数与 $g$ 无关。在某种意义上，结构常数完全决定了李群（Lie 定理）——准确地说，决定了单位元附近的群，以及唯一的单连通李群。`}</Tx>
        <Exercise n="5.23" title="结构常数的反对称性与 Jacobi 恒等式" level="★"
          hint={R`(a) 由 $[X_\mu,X_\nu]=-[X_\nu,X_\mu]$ 与 $\{X_\lambda\}$ 线性无关。(b) 把 Jacobi 恒等式（习题 5.10）用于 $X_\mu,X_\nu,X_\rho$，两次使用 \eqref{5.133}。`}
          solution={R`**(a)** $c_{\mu\nu}{}^\lambda X_\lambda=[X_\mu,X_\nu]=-[X_\nu,X_\mu]=-c_{\nu\mu}{}^\lambda X_\lambda$；$\{X_\lambda\}$ 线性无关，系数相等：$c_{\mu\nu}{}^\lambda=-c_{\nu\mu}{}^\lambda$。

**(b)** $[[X_\mu,X_\nu],X_\rho]=c_{\mu\nu}{}^\tau[X_\tau,X_\rho]=c_{\mu\nu}{}^\tau c_{\tau\rho}{}^\lambda X_\lambda$。Jacobi 恒等式 $[[X_\mu,X_\nu],X_\rho]+[[X_\rho,X_\mu],X_\nu]+[[X_\nu,X_\rho],X_\mu]=0$ 给出

$$\big(c_{\mu\nu}{}^\tau c_{\tau\rho}{}^\lambda+c_{\rho\mu}{}^\tau c_{\tau\nu}{}^\lambda+c_{\nu\rho}{}^\tau c_{\tau\mu}{}^\lambda\big)X_\lambda=0,$$

由线性无关即得 (5.135)。例：$\sym{lie}{\mathfrak{so}}(3)$ 中 $c_{\mu\nu}{}^\lambda=\varepsilon_{\mu\nu\lambda}$（例 5.19 的 $[X_x,X_y]=X_z$ 等），(5.135) 化为 $\varepsilon$ 记号的熟知恒等式。`}>
          <>
            <Tx>{R`证明结构常数满足 (a) **反对称性**`}</Tx>
            <Eq n="5.134" say="结构常数对下面两个指标反对称（因为李括号反对称）。">{R`c_{\mu\nu}{}^\lambda=-c_{\nu\mu}{}^\lambda`}</Eq>
            <Tx>{R`(b) **Jacobi 恒等式**`}</Tx>
            <Eq n="5.135" say={R`结构常数的 Jacobi 恒等式：李括号 Jacobi 恒等式的分量形式。`}>{R`c_{\mu\nu}{}^\tau c_{\tau\rho}{}^\lambda+c_{\rho\mu}{}^\tau c_{\tau\nu}{}^\lambda+c_{\nu\rho}{}^\tau c_{\tau\mu}{}^\lambda=0.`}</Eq>
          </>
        </Exercise>
        <Tx>{R`**Maurer–Cartan 结构方程。**引入 $\{X_\mu\}$ 的对偶基 $\{\theta^\mu\}$：$\langle\theta^\mu,X_\nu\rangle=\delta^\mu_\nu$。$\{\theta^\mu\}$ 是左不变一形式的基。我们将证明对偶基满足 **Maurer–Cartan 结构方程**`}</Tx>
        <Eq n="5.136" keyEq title="Maurer–Cartan 结构方程" say={R`左不变一形式的外微分由结构常数决定：群的代数结构（对易关系）直接变成了形式的微分关系。`}>{R`\dd\theta^\mu=-\tfrac12c_{\nu\lambda}{}^\mu\theta^\nu\wedge\theta^\lambda.`}</Eq>
        <Tx>{R`这可以用 \eqref{5.70} 看出：

$$\begin{aligned}\dd\theta^\mu(X_\nu,X_\lambda)&=X_\nu[\theta^\mu(X_\lambda)]-X_\lambda[\theta^\mu(X_\nu)]-\theta^\mu([X_\nu,X_\lambda])\\&=X_\nu[\delta^\mu_\lambda]-X_\lambda[\delta^\mu_\nu]-\theta^\mu(c_{\nu\lambda}{}^\kappa X_\kappa)=-c_{\nu\lambda}{}^\mu,\end{aligned}$$

（常数的导数为零），而 \eqref{5.136} 右边在 $(X_\nu,X_\lambda)$ 上的值是 $-\frac12(c_{\nu\lambda}{}^\mu-c_{\lambda\nu}{}^\mu)=-c_{\nu\lambda}{}^\mu$（用了 \eqref{5.62} 与 \eqref{5.134}）。这就证明了 \eqref{5.136}。

**典范一形式。**定义取值于李代数的一形式 $\theta:T_gG\to T_eG$：`}</Tx>
        <Eq n="5.137" title="Maurer–Cartan 形式" say={R`典范一形式把任意一点的切向量左平移回单位元：它告诉你"这个速度对应李代数里哪个生成元"。对矩阵群就是 $g^{-1}\dd g$。`}>{R`\theta:X\mapsto(L_{g^{-1}})_*X=(L_g)_*^{-1}X\qquad X\in T_gG.`}</Eq>
        <Tx>{R`$\theta$ 称为 $G$ 上的**典范一形式**（canonical one-form）或 **Maurer–Cartan 形式**。（对矩阵群，由 \eqref{5.115}，$\theta=g^{-1}\dd g$。）`}</Tx>
        <Stmt id="T5.3">
          <Eq n="5.138" say={R`典范一形式在基下展开：李代数的基向量乘以对应的左不变对偶一形式。`}>{R`\theta=V_\mu\otimes\theta^\mu`}</Eq>
          <Eq n="5.139" title="Maurer–Cartan 方程" say={R`典范一形式满足"零曲率"方程：外微分加上自己与自己的括号为零。规范理论里纯规范的场强为零就是它。`}>{R`\dd\theta+\tfrac12[\theta\wedge\theta]=0`}</Eq>
          <Eq n="5.140" say={R`李代数值形式的"括号楔积"：李代数部分取对易子，形式部分取楔积。`}>{R`[\theta\wedge\theta]\equiv[V_\mu,V_\nu]\otimes\theta^\mu\wedge\theta^\nu.`}</Eq>
          <Proof steps={[
            { claim: R`(a) 任取 $Y=Y^\mu X_\mu\in T_gG$，$\{X_\mu\}$ 是由 $\{V_\mu\}$ 生成的标架，$X_\mu|_g=L_{g*}V_\mu$。由 \eqref{5.137}：`, tex: R`\theta(Y)=Y^\mu\theta(X_\mu)=Y^\mu(L_{g*})^{-1}[L_{g*}V_\mu]=Y^\mu V_\mu.`, uses: ["5.137"] },
            { claim: R`另一方面：`, tex: R`(V_\mu\otimes\theta^\mu)(Y)=Y^\nu V_\mu\theta^\mu(X_\nu)=Y^\nu V_\mu\delta^\mu_\nu=Y^\mu V_\mu.` },
            { claim: R`$Y$ 任意，故 $\theta=V_\mu\otimes\theta^\mu$。` },
            { claim: R`(b) 由 \eqref{5.140} 与 \eqref{5.133}（在 $e$ 处，$[V_\mu,V_\nu]=c_{\mu\nu}{}^\lambda V_\lambda$）：`, tex: R`\tfrac12[\theta\wedge\theta]=\tfrac12c_{\nu\lambda}{}^\mu V_\mu\otimes\theta^\nu\wedge\theta^\lambda`, why: R`把哑指标改名 $\mu\to\nu$、$\nu\to\lambda$、$\lambda\to\mu$。`, uses: ["5.133"], fill: true },
            { claim: R`用 Maurer–Cartan 结构方程 \eqref{5.136}：`, tex: R`\dd\theta+\tfrac12[\theta\wedge\theta]=-\tfrac12V_\mu\otimes c_{\nu\lambda}{}^\mu\theta^\nu\wedge\theta^\lambda+\tfrac12c_{\nu\lambda}{}^\mu V_\mu\otimes\theta^\nu\wedge\theta^\lambda=0`, why: R`其中 $c_{\nu\lambda}{}^\mu$ 是 $G$ 的结构常数。`, uses: ["5.136"] },
          ]} />
        </Stmt>
        <Box kind="physics" title="Maurer–Cartan 方程与规范场">{R`对矩阵群 $\theta=g^{-1}\dd g$，\eqref{5.139} 就是 $\dd(g^{-1}\dd g)+g^{-1}\dd g\wedge g^{-1}\dd g=0$（直接用 $\dd(g^{-1})=-g^{-1}\dd g\,g^{-1}$ 验证）。在第 10 章，规范势 $A$ 的场强为 $F=\dd A+A\wedge A$；纯规范 $A=g^{-1}\dd g$ 的场强为零，正是这条方程。`}</Box>
      </Sub>
    </Sec>);
}
