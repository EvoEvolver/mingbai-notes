// 引言 + §8.1 复流形 —— 式 (8.1)–(8.7)，定义 8.1，例 8.1–8.5，图 8.1–8.4；交互图 1（模参数 τ 与 SL(2,Z)）、交互图 2（CP¹ 的两张卡）
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Proof, Derivation, C } from "@kit";
import { ModularLab, CP1Lab } from "./_ch08_demos.jsx";

const R = String.raw;

export function Intro() {
  return (
    <Sec n="8.0" title="Introduction" zh="引言：从可微到全纯"
      gist={R`微分流形要求转移函数光滑；复流形更进一步，要求每张卡同胚于 $\C^m$ 的开集、转移函数**全纯**（满足 Cauchy–Riemann 方程）。全纯性比光滑性刚性得多，带来新的结构：殆复结构 $J$、$(r,s)$ 形式、Dolbeault 算子 $\bar\partial$、Hermite 与 Kähler 度规、Hodge 数。`}
      why={R`物理里复几何无处不在：弦论的世界面是 Riemann 面，环面的模参数 $\tau$ 决定其复结构；超弦紧化用 Calabi–Yau 流形（Ricci 平坦的紧 Kähler 流形）与轨形；超对称 $\sigma$ 模型的靶空间必须是 Kähler 流形。`}
      gives={[]}>
      <p className="muted">本节概念：<C id="complex_manifold" /></p>
      <Tx>{R`微分流形是"允许微分结构"的拓扑空间。本章在它上面再加一层结构。初等复分析中，偏导数被要求满足 **Cauchy–Riemann 关系**——此时我们谈论的不只是函数的可微性，而是它的**解析性**。**复流形**带有一种复结构：每个坐标邻域同胚于 $\C^m$（的开集），并且从一个坐标系到另一个坐标系的转换是解析的。

为什么要关心这个看似只是"多了一个条件"的结构？因为全纯函数极其刚性：它由任意小邻域上的值唯一决定（解析延拓），紧复流形上的全纯函数只能是常数（\secref{8.2.1}）。这种刚性在几何上表现为切空间带有一个处处定义的"乘以 $\mathrm{i}$"的操作 $J$，它把实的切空间变成复向量空间；而微分形式按"含几个 $\dd z$、几个 $\dd\bar z$"进一步分级，外微分 $\dd$ 拆成两半 $\partial+\bar\partial$。把度规也纳入进来，就得到 Hermite 流形与 Kähler 流形——后者在弦论紧化中扮演核心角色。

本章的路线：§8.1 定义复流形并给出例子（Riemann 球面、复环面与模参数、$\CP^n$、复 Grassmann 流形、代数簇）；§8.2 在复流形上做微积分——全纯映射、复化、殆复结构；§8.3 复微分形式与 Dolbeault 算子；§8.4 Hermite 度规、Kähler 形式、Hermite 联络、挠率与曲率、Ricci 形式与第一陈类；§8.5 Kähler 流形、Kähler 势、Fubini–Study 度规、Calabi–Yau 流形与和乐群；§8.6 调和形式、$\bar\partial$ 上同调、Hodge 定理与 Hodge 数；§8.7 殆复流形与 Nijenhuis 张量；§8.8 轨形。参考书：Chern (1979)、Goldberg (1962)、Greene (1987)；Griffiths and Harris (1978) 第 0 章是简明的综述；物理应用见 Horowitz (1986) 与 Candelas (1988)。`}</Tx>
    </Sec>);
}

export function Sec81() {
  return (
    <Sec n="8.1" title="Complex manifolds" zh="复流形"
      gist={R`全纯 = Cauchy–Riemann 方程 \eqref{8.1} → 复流形：卡同胚于 $\C^m$、转移函数全纯（\sref{D8.1}）→ 例子：$S^2=\CP^1$（$W=1/Z$）、复环面 $\C/L(\omega_1,\omega_2)$ 与模参数 $\tau\in\mathrm{H}/\mathrm{PSL}(2,\Z)$、$\CP^n$、复 Grassmann 流形、代数簇。`}
      why={R`同一个拓扑空间可以带有许多互不等价的复结构——环面就是最好的例子：它的复结构由一个复数 $\tau$ 刻画，而 $\tau$ 只在模群 $\mathrm{PSL}(2,\Z)$ 作用下有意义。这正是弦论单圈振幅中要对模参数积分、并且只积一个基本区域的原因。`}
      gives={["8.1", "8.2", "8.5", "8.6", "8.7"]}>
      <p className="muted">本节概念：<C id="complex_manifold" /> · <C id="modular" /></p>
      <Tx>{R`先定义 $\C^m$ 上的全纯（解析）映射。复值函数 $f:\C^m\to\C$ 称为**全纯的**（holomorphic），如果 $f=f_1+\mathrm{i}f_2$ 对每个 $z^\mu=x^\mu+\mathrm{i}y^\mu$ 都满足 **Cauchy–Riemann 关系**`}</Tx>
      <Eq n="8.1" keyEq title="Cauchy–Riemann 关系" say={R`实部沿 $x$ 的变化率等于虚部沿 $y$ 的变化率，实部沿 $y$ 的变化率等于虚部沿 $x$ 的变化率的负值——换言之，$f$ 的微分是"乘一个复数"，局部只做旋转加伸缩。`}>{R`\frac{\partial f_1}{\partial x^\mu}=\frac{\partial f_2}{\partial y^\mu}\qquad\frac{\partial f_2}{\partial x^\mu}=-\frac{\partial f_1}{\partial y^\mu}.`}</Eq>
      <Tx>{R`映射 $(f^1,\ldots,f^n):\C^m\to\C^n$ 称为全纯的，如果每个分量函数 $f^\lambda$（$1\le\lambda\le n$）都是全纯的。

**几何图像。**把 $f$ 看作 $\R^{2}\to\R^{2}$ 的映射（固定其他变量），其 Jacobi 矩阵为 $\begin{pmatrix}\partial_xf_1&\partial_yf_1\\ \partial_xf_2&\partial_yf_2\end{pmatrix}$。\eqref{8.1} 说它形如 $\begin{pmatrix}a&-b\\ b&a\end{pmatrix}$——正是复数 $a+\mathrm{i}b$ 的乘法矩阵。所以全纯映射在每点的线性化都是"复线性的"：保持角度与定向的旋转加伸缩。这一观察是 §8.2.3 殆复结构 $J$ 的源头：全纯映射的微分与"乘以 $\mathrm{i}$"（矩阵 $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$）可交换。下面的交互图 3（§8.2）让你输入函数，数值检验 \eqref{8.1}。`}</Tx>

      <Sub n="8.1.1" title="Definitions" zh="定义">
        <Stmt id="D8.1" />
        <Tx>{R`数 $m$ 称为 $M$ 的**复维数**，记为 $\dim_\C M=m$；实维数 $2m$ 记为 $\dim_\R M$ 或简记 $\dim M$。设 $z^\mu=\varphi_i(p)$、$w^\nu=\varphi_j(p)$ 分别是 $p\in U_i\cap U_j$ 在卡 $(U_i,\varphi_i)$、$(U_j,\varphi_j)$ 中的复坐标。公理 (iv) 说函数 $w^\nu=u^\nu+\mathrm{i}v^\nu$（$1\le\nu\le m$）是 $z^\mu=x^\mu+\mathrm{i}y^\mu$ 的全纯函数，即

$$\frac{\partial u^\nu}{\partial x^\mu}=\frac{\partial v^\nu}{\partial y^\mu}\qquad\frac{\partial u^\nu}{\partial y^\mu}=-\frac{\partial v^\nu}{\partial x^\mu}\qquad1\le\mu,\nu\le m.$$

这些公理保证复流形上的微积分可以与所选的具体坐标无关地进行。例如 $\C^m$ 是最简单的复流形：一张卡覆盖全空间，$\varphi$ 是恒等映射。

设 $\{(U_i,\varphi_i)\}$ 与 $\{(V_j,\psi_j)\}$ 是 $M$ 的两个图册。若二者之并仍是满足 \sref{D8.1} 各公理的图册，就说它们定义**同一个复结构**。一个复流形可以带有许多不同的复结构（见例 8.2）。`}</Tx>
        <Box kind="warning" title={R`勘误：上式中求导变量的指标是 $\mu$（p.329）`}>{R`原书写作 $\partial u^\nu/\partial x^\nu=\partial v^\nu/\partial y^\nu$、$\partial u^\nu/\partial y^\nu=-\partial v^\nu/\partial x^\nu$，求导变量误用了与函数相同的指标 $\nu$，但随后又注明 $1\le\mu,\nu\le m$。全纯性要求对**每一个** $z^\mu$ 都满足 Cauchy–Riemann 关系，所以分母应为 $x^\mu$、$y^\mu$。正文已改正。`}</Box>
        <Box kind="physics" title="复结构比微分结构多了什么">{R`同一个光滑流形可以带有许多复结构，也可以一个都没有。实维数必须为偶数只是必要条件：$S^4$ 连殆复结构都不存在（§8.7）。反过来，复结构一旦给定，它比光滑结构"硬"得多——复环面的复结构由一个复参数 $\tau$ 完全决定（例 8.2），而光滑结构则没有任何连续参数。这种"有限维的模空间"正是弦论中模参数、Calabi–Yau 流形的模空间的来源。`}</Box>
      </Sub>

      <Sub n="8.1.2" title="Examples" zh="例子">
        <Box kind="example" n="8.1" title={R`Riemann 球面 $S^2=\C\cup\{\infty\}$`}>
          <Tx>{R`习题 5.1 已经说明：$P(x,y,z)\in S^2-\{\text{北极}\}$ 从北极投影的球极投影坐标是

$$(X,Y)=\left(\frac{x}{1-z},\frac{y}{1-z}\right),$$

而 $P(x,y,z)\in S^2-\{\text{南极}\}$ 从南极投影的坐标是

$$(U,V)=\left(\frac{x}{1+z},\frac{-y}{1+z}\right).$$

［注意图 5.5 中 $(U,V)$ 的定向。］定义复坐标

$$Z=X+\mathrm{i}Y,\qquad\overline Z=X-\mathrm{i}Y,\qquad W=U+\mathrm{i}V,\qquad\overline W=U-\mathrm{i}V.$$

$W$ 是 $Z$ 的全纯函数：

$$W=\frac{x-\mathrm{i}y}{1+z}=\frac{1-z}{1+z}(X-\mathrm{i}Y)=\frac{X-\mathrm{i}Y}{X^2+Y^2}=\frac1Z.$$

（第二个等号用 $x-\mathrm{i}y=(1-z)(X-\mathrm{i}Y)$；第三个等号用球面上 $x^2+y^2=1-z^2$，故 $X^2+Y^2=\frac{1+z}{1-z}$。）因此 $S^2$ 是复流形，并可等同于 **Riemann 球面** $\C\cup\{\infty\}$。`}</Tx>
          <Tx>{R`**为什么要反转 $V$ 的符号。**若取 $V=+y/(1+z)$，则 $U+\mathrm{i}V=(x+\mathrm{i}y)/(1+z)=1/\overline Z$——这是**反全纯**函数，两张卡之间的转移函数不满足 Cauchy–Riemann 方程，也就不构成复图册。翻转一张卡的定向（$V\to-V$）恰好把 $1/\overline Z$ 变成 $1/Z$。这与 §8.4 的结论（复流形总是可定向的，\sref{T8.3}）一致：全纯转移函数的实 Jacobi 行列式 $=|\partial W/\partial Z|^2>0$。`}</Tx>
        </Box>
        <Figure n="8.1" caption={R`两个复数 $\omega_1$、$\omega_2$ 在复平面上定义格 $L(\omega_1,\omega_2)$。$\C/L(\omega_1,\omega_2)$ 同胚于环面（阴影区域）。`} width="55%" />
        <Box kind="example" n="8.2" title={R`复环面与模参数 $\tau$`}>
          <Tx>{R`取复平面 $\C$，定义**格** $L(\omega_1,\omega_2)\equiv\{\omega_1m+\omega_2n\mid m,n\in\Z\}$，其中 $\omega_1$、$\omega_2$ 是两个非零复数，满足 $\omega_2/\omega_1\notin\R$（\figref{8.1}）。不失一般性可取 $\mathrm{Im}(\omega_2/\omega_1)>0$。把 $z_1,z_2\in\C$ 中满足 $z_1-z_2=\omega_1m+\omega_2n$（某 $m,n\in\Z$）的点等同，得到流形 $\C/L(\omega_1,\omega_2)$。由于 \figref{8.1} 中阴影区域的对边被粘合，$\C/L(\omega_1,\omega_2)$ 同胚于环面 $T^2$。$\C$ 的复结构自然诱导 $\C/L(\omega_1,\omega_2)$ 的复结构（平移 $z\mapsto z+\omega$ 是全纯的，所以以 $\C$ 中小圆盘为卡时，转移函数都是平移）。我们说 $(\omega_1,\omega_2)$ 在 $T^2$ 上定义了一个复结构。许多不同的 $(\omega_1,\omega_2)$ 给出 $T^2$ 上同一个复结构。

**问题：**两对 $(\omega_1,\omega_2)$ 与 $(\omega_1',\omega_2')$（$\mathrm{Im}(\omega_2/\omega_1)>0$，$\mathrm{Im}(\omega_2'/\omega_1')>0$）何时定义同一个复结构？

**第一步：两个格何时相同。**两个格 $L(\omega_1,\omega_2)$ 与 $L(\omega_1',\omega_2')$ 重合，当且仅当存在矩阵 $\begin{pmatrix}a&b\\ c&d\end{pmatrix}\in\mathrm{PSL}(2,\Z)\equiv\mathrm{SL}(2,\Z)/\Z_2$ 使得`}</Tx>
          <Eq n="8.2" title="同一个格的两组基" say={R`两组生成元张成同一个格，当且仅当它们相差一个行列式为 $1$ 的整数矩阵（再模去整体符号）——这就是"换基"。`}>{R`\begin{pmatrix}\omega_1'\\ \omega_2'\end{pmatrix}=\begin{pmatrix}a&b\\ c&d\end{pmatrix}\begin{pmatrix}\omega_1\\ \omega_2\end{pmatrix}.`}</Eq>
          <Tx>{R`（$\mathrm{SL}(2,\Z)$ 已在 \eqref{2.4} 定义；在 $\mathrm{PSL}(2,\Z)$ 中，矩阵 $A$ 与 $-A$ 被等同。）证明见下。`}</Tx>
          <Proof title={R`\eqref{8.2} 的证明`} steps={[
            { claim: R`**充分性。**设 \eqref{8.2} 成立且矩阵属于 $\mathrm{SL}(2,\Z)$。由于 $\omega_1',\omega_2'\in L(\omega_1,\omega_2)$（整系数组合），$L(\omega_1',\omega_2')\subset L(\omega_1,\omega_2)$。逆矩阵仍是整数矩阵：`, tex: R`\begin{pmatrix}\omega_1\\ \omega_2\end{pmatrix}=\begin{pmatrix}d&-b\\ -c&a\end{pmatrix}\begin{pmatrix}\omega_1'\\ \omega_2'\end{pmatrix}`, why: R`$ad-bc=1$，所以逆矩阵就是伴随矩阵，元素为整数。由此 $L(\omega_1,\omega_2)\subset L(\omega_1',\omega_2')$，两个格相等。` },
            { claim: R`**必要性。**若 $L(\omega_1,\omega_2)=L(\omega_1',\omega_2')$，则 $\omega_1',\omega_2'$ 是 $L(\omega_1,\omega_2)$ 的格点，可写成 $\omega_1'=a\omega_1+b\omega_2$、$\omega_2'=c\omega_1+d\omega_2$（$a,b,c,d\in\Z$）；反过来 $\omega_1=a'\omega_1'+b'\omega_2'$、$\omega_2=c'\omega_1'+d'\omega_2'$（$a',b',c',d'\in\Z$）。于是`, tex: R`\begin{pmatrix}\omega_1\\ \omega_2\end{pmatrix}=\begin{pmatrix}a'&b'\\ c'&d'\end{pmatrix}\begin{pmatrix}a&b\\ c&d\end{pmatrix}\begin{pmatrix}\omega_1\\ \omega_2\end{pmatrix}\ \Longrightarrow\ \begin{pmatrix}a'&b'\\ c'&d'\end{pmatrix}\begin{pmatrix}a&b\\ c&d\end{pmatrix}=\begin{pmatrix}1&0\\0&1\end{pmatrix}`, why: R`$\omega_1,\omega_2$ 在 $\R$ 上线性无关（$\omega_2/\omega_1\notin\R$），所以整系数表示唯一，矩阵乘积必为单位阵。` },
            { claim: R`取行列式：$(a'd'-b'c')(ad-bc)=1$。两个因子都是整数，只能 $ad-bc=\pm1$。`, fill: true },
            { claim: R`定向条件排除 $-1$。记 $\tau=\omega_2/\omega_1$，则 $\omega_2'/\omega_1'=(c+d\tau)/(a+b\tau)$，`, tex: R`\mathrm{Im}\left(\frac{\omega_2'}{\omega_1'}\right)=\mathrm{Im}\left(\frac{c\omega_1+d\omega_2}{a\omega_1+b\omega_2}\right)=\frac{ad-bc}{|a+b(\omega_2/\omega_1)|^2}\,\mathrm{Im}\left(\frac{\omega_2}{\omega_1}\right)>0`, why: R`分子分母同乘 $\nosym{\overline{a+b\tau}}$：$\mathrm{Im}[(c+d\tau)(a+b\bar\tau)]=(ad-bc)\,\mathrm{Im}\,\tau$。两边的 $\mathrm{Im}$ 都要求为正，所以 $ad-bc>0$，即矩阵属于 $\mathrm{SL}(2,\Z)$。`, fill: true },
            { claim: R`最后，$\begin{pmatrix}a&b\\ c&d\end{pmatrix}$ 与 $-\begin{pmatrix}a&b\\ c&d\end{pmatrix}$ 定义同一个格（$\omega\to-\omega$ 不改变格），所以要把只差整体符号的矩阵等同：两个格相同当且仅当它们由 $\mathrm{PSL}(2,\Z)$ 相联系。` },
          ]} />
          <Box kind="warning" title={R`勘误：\eqref{8.2} 证明中的系数与虚部公式（p.331）`}>{R`原书在必要性部分写 $\omega_1'=d\omega_1+c\omega_2$、$\omega_2'=b\omega_1+a\omega_2$（以及 $\omega_1=d'\omega_1'+c'\omega_2'$ 等），与 \eqref{8.2} 及紧接着的矩阵等式 $\begin{pmatrix}a'&b'\\ c'&d'\end{pmatrix}\begin{pmatrix}a&b\\ c&d\end{pmatrix}=I$ 不一致；按 \eqref{8.2} 应为 $\omega_1'=a\omega_1+b\omega_2$、$\omega_2'=c\omega_1+d\omega_2$。随后的虚部公式原书印作

$$\mathrm{Im}\Big(\frac{\omega_2'}{\omega_1'}\Big)=\mathrm{Im}\Big(\frac{b\omega_1+a\omega_2}{d\omega_1+c\omega_2}\Big)=\frac{ad-bc}{|c(\omega_2/\omega_1)+d|^2}\mathrm{Im}\Big(\frac{\omega_2'}{\omega_1'}\Big),$$

右端的 $\mathrm{Im}(\omega_2'/\omega_1')$ 应为 $\mathrm{Im}(\omega_2/\omega_1)$（否则等式两边是同一个量，推不出任何东西）。正文按 \eqref{8.2} 的约定改写为 $\frac{ad-bc}{|a+b\tau|^2}\mathrm{Im}\,\tau$。两种写法只差矩阵的重新标记 $\begin{pmatrix}a&b\\ c&d\end{pmatrix}\leftrightarrow\begin{pmatrix}d&c\\ b&a\end{pmatrix}$，它是 $\mathrm{SL}(2,\Z)$ 到自身的双射，结论不变。`}</Box>
          <Tx>{R`**第二步：复结构何时相同。**设存在 $\C/L(\omega_1,\omega_2)$ 到 $\C/L(\tilde\omega_1,\tilde\omega_2)$ 上的一一全纯映射 $h$（$\mathrm{Im}(\omega_2/\omega_1)>0$，$\mathrm{Im}(\tilde\omega_2/\tilde\omega_1)>0$）。设 $p:\C\to\C/L(\omega_1,\omega_2)$、$\tilde p:\C\to\C/L(\tilde\omega_1,\tilde\omega_2)$ 是自然投影（例如 $p$ 把 $\C$ 中的点映到它在 $\C/L(\omega_1,\omega_2)$ 中的等价类）。选原点 $0$，并取 $h_*(0)$ 为满足 $\tilde p\circ h_*(0)=h\circ p(0)$ 的一点（\figref{8.2}）：`}</Tx>
          <Eq n="8.3" say={R`交换图：先投影到环面再用 $h$ 映过去，与先在复平面上用 $h_*$ 映过去再投影，结果相同——$h_*$ 是 $h$ 在覆叠空间 $\C$ 上的"提升"。`}>{R`\begin{matrix}\C&\xrightarrow{\ \ h_*\ \ }&\C\\ {\scriptstyle p}\Big\downarrow&&\Big\downarrow{\scriptstyle\tilde p}\\ \C/L(\omega_1,\omega_2)&\xrightarrow{\ \ h\ \ }&\C/L(\tilde\omega_1,\tilde\omega_2).\end{matrix}`}</Eq>
          <Figure n="8.2" caption={R`全纯双射 $h:\C/L(\omega_1,\omega_2)\to\C/L(\tilde\omega_1,\tilde\omega_2)$ 与自然投影 $p:\C\to\C/L(\omega_1,\omega_2)$、$\tilde p:\C\to\C/L(\tilde\omega_1,\tilde\omega_2)$ 定义了全纯双射 $h_*:\C\to\C$。`} width="65%" />
          <Tx>{R`从原点出发作解析延拓，得到 $\C$ 到自身上的一一全纯映射 $h_*$，满足`}</Tx>
          <Eq n="8.4" say={R`提升条件对复平面上每一点都成立，所以图 \eqref{8.3} 交换。`}>{R`\tilde p\circ h_*(z)=h\circ p(z)\qquad\text{对一切 }z\in\C`}</Eq>
          <Tx>{R`于是图 \eqref{8.3} 交换。（严格地说，这是覆叠空间理论中的提升定理：$\C$ 单连通，$h\circ p$ 可以唯一提升到覆叠 $\tilde p$；提升在局部是 $\tilde p$ 的局部逆与 $h\circ p$ 的复合，因而全纯。）已知 $\C$ 到自身的一一全纯映射必形如 $z\mapsto h_*(z)=az+b$，$a,b\in\C$，$a\neq0$。于是 $h_*(\omega_1)-h_*(0)=a\omega_1$、$h_*(\omega_2)-h_*(0)=a\omega_2$。要使 $h$ 作为 $\C/L(\omega_1,\omega_2)\to\C/L(\tilde\omega_1,\tilde\omega_2)$ 的映射是良定义的，必须 $a\omega_1,a\omega_2\in L(\tilde\omega_1,\tilde\omega_2)$（\figref{8.2}）。交换 $(\omega_1,\omega_2)$ 与 $(\tilde\omega_1,\tilde\omega_2)$ 的角色（对 $h^{-1}$ 作同样论证），得到 $\tilde a\tilde\omega_1,\tilde a\tilde\omega_2\in L(\omega_1,\omega_2)$，$\tilde a\neq0$ 为复数（且 $\tilde a=a^{-1}$，因为 $h^{-1}$ 的提升是 $h_*$ 的逆）。所以 $aL(\omega_1,\omega_2)=L(\tilde\omega_1,\tilde\omega_2)$，再由第一步得结论：若 $\C/L(\omega_1,\omega_2)$ 与 $\C/L(\tilde\omega_1,\tilde\omega_2)$ 有相同的复结构，则存在矩阵 $M\in\mathrm{SL}(2,\Z)$ 与复数 $\lambda\ (=\tilde a^{-1})$ 使得`}</Tx>
          <Eq n="8.5" keyEq title="复环面的等价" say={R`两个复环面全纯等价，当且仅当它们的周期对相差一个模群矩阵再乘一个整体复数因子——整体缩放与转动不改变复结构，换格的基也不改变。`}>{R`\begin{pmatrix}\tilde\omega_1\\ \tilde\omega_2\end{pmatrix}=\lambda M\begin{pmatrix}\omega_1\\ \omega_2\end{pmatrix}.`}</Eq>
          <Tx>{R`反过来，由 \eqref{8.5} 相联系的 $(\omega_1,\omega_2)$ 与 $(\tilde\omega_1,\tilde\omega_2)$ 定义同一个复结构。事实上，$\begin{pmatrix}\omega_1\\ \omega_2\end{pmatrix}$ 与 $M\begin{pmatrix}\omega_1\\ \omega_2\end{pmatrix}$ 定义同一个格（模平移），可取 $h_*:z\mapsto z+b$；$L(\omega_1,\omega_2)$ 与 $L(\lambda\omega_1,\lambda\omega_2)$ 也定义同一个复结构，此时取 $h_*:z\mapsto\lambda z+b$。`}</Tx>
          <Box kind="warning" title="勘误：两处角色互换的笔误（p.332）">{R`原书写"交换 $(\omega_1,\omega_2)$ 与 $(\omega_1',\omega_2')$ 的角色，得 $\tilde a\tilde\omega_1,\tilde a\tilde\omega_1\in L(\omega_1,\omega_2)$"，以及"由 \eqref{8.5} 相联系的 $(\omega_1,\omega_2)$ 与 $(\omega_1',\omega_2')$"。此处讨论的是 $(\omega_1,\omega_2)$ 与 $(\tilde\omega_1,\tilde\omega_2)$，而第二个 $\tilde a\tilde\omega_1$ 应为 $\tilde a\tilde\omega_2$。正文已改正。`}</Box>
          <Tx>{R`**模参数。**我们证明了：$T^2$ 上的复结构由一对复数 $(\omega_1,\omega_2)$ 模去常数因子与 $\mathrm{PSL}(2,\Z)$ 确定。为去掉常数因子，引入**模参数**（modular parameter）

$$\tau\equiv\omega_2/\omega_1\in\mathrm{H}\equiv\{z\in\C\mid\mathrm{Im}\,z>0\}$$

来刻画 $T^2$ 的复结构。不失一般性，取 $1$ 与 $\tau$ 为格的生成元。但并非所有 $\tau\in\mathrm{H}$ 都是独立的模参数：如前所示，若 $\begin{pmatrix}a&b\\ c&d\end{pmatrix}\in\mathrm{PSL}(2,\Z)$，则 $\tau$ 与

$$\tau'=\frac{a\tau+b}{c\tau+d}$$

定义同一个复结构（取 $M=\begin{pmatrix}d&c\\ b&a\end{pmatrix}$ 作用在 $(1,\tau)$ 上，得 $(c\tau+d,\ a\tau+b)=(c\tau+d)(1,\tau')$，即 $\lambda=c\tau+d$）。商空间 $\mathrm{H}/\mathrm{PSL}(2,\Z)$ 如 \figref{8.3} 所示（推导见 Koblitz (1984) p 100 与 Gunning (1962) p 4）：**基本区域**是 $|\mathrm{Re}\,\tau|\le\frac12$、$|\tau|\ge1$ 的区域，边界按 $\tau\sim\tau+1$（左右两条竖线）与 $\tau\sim-1/\tau$（单位圆弧左右两半）粘合。`}</Tx>
          <Figure n="8.3" caption={R`商空间 $\mathrm{H}/\mathrm{PSL}(2,\Z)$。`} width="45%" interactive={<ModularLab />} />
          <Tx>{R`变换 $\tau\to\tau'$ 称为**模变换**（modular transformation），由 $\tau\to\tau+1$ 与 $\tau\to-1/\tau$ 生成。$\tau\to\tau+1$ 产生沿经线 $m$ 的 **Dehn 扭转**（\figref{8.4}(a)）：(i) 先沿 $m$ 把环面切开；(ii) 保持切口一侧不动，把另一侧转 $2\pi$；(iii) 再把切口粘回。另一个变换 $\tau\to-1/\tau$ 对应于交换纬线 $l$ 与经线 $m$ 的角色（\figref{8.4}(b)）。`}</Tx>
          <Figure n="8.4" caption={R`(a) Dehn 扭转生成模变换。(b) $\tau\to-1/\tau$ 交换 $l$ 与 $m$ 的角色。`} width="70%" />
          <Derivation title={R`为什么任意 $\tau$ 都能送进基本区域（约化算法）`} collapsed steps={[
            { tex: R`\mathrm{Im}\left(\frac{a\tau+b}{c\tau+d}\right)=\frac{\mathrm{Im}\,\tau}{|c\tau+d|^2}`, why: R`与上面 \eqref{8.2} 证明中的计算相同（$ad-bc=1$）。` },
            { tex: R`T:\tau\mapsto\tau+1\ \text{把 }\mathrm{Re}\,\tau\text{ 移到 }[-\tfrac12,\tfrac12];\qquad S:\tau\mapsto-1/\tau\ \text{满足}\ \mathrm{Im}(S\tau)=\mathrm{Im}\,\tau/|\tau|^2`, why: R`若 $|\tau|<1$，作用 $S$ 严格增大 $\mathrm{Im}\,\tau$。` },
            { tex: R`\text{交替作用 }T^n\text{ 与 }S\text{，直到 }|\mathrm{Re}\,\tau|\le\tfrac12,\ |\tau|\ge1`, why: R`对固定的 $\tau$，$\{|c\tau+d|:c,d\in\Z\}$ 中小于 $1$ 的值只有有限个（格点 $c\tau+d$ 在单位圆盘内只有有限个），所以 $\mathrm{Im}$ 只能严格增大有限次，算法必然终止。` },
          ]} result={R`交互图 1 实现了这一算法，并用 Klein 的 $j$ 不变量独立检验：$j(\tau)=j(\tau')$ 说明两个 $\tau$ 确实给出同一个复环面。`} />
        </Box>

        <Box kind="example" n="8.3" title={R`复射影空间 $\CP^n$`}>
          <Tx>{R`**复射影空间** $\CP^n$ 的定义类似于 $\RP^n$（例 5.4）。$n+1$ 元组 $z=(z^0,\ldots,z^n)\in\C^{n+1}$ 只要 $z\neq0$，就确定一条过原点的复直线。定义等价关系 $z\sim w$：若存在复数 $a\neq0$ 使 $w=az$。则 $\CP^n\equiv(\C^{n+1}-\{0\})/\sim$。$n+1$ 个数 $z^0,z^1,\ldots,z^n$ 称为**齐次坐标**，记作 $[z^0,z^1,\ldots,z^n]$，其中 $(z^0,\ldots,z^n)$ 与 $(\lambda z^0,\ldots,\lambda z^n)$（$\lambda\neq0$）等同。卡 $U_\mu$ 是 $\C^{n+1}-\{0\}$ 中满足 $z^\mu\neq0$ 的子集（的像）。在卡 $U_\mu$ 中定义**非齐次坐标** $\xi^\nu_{(\mu)}=z^\nu/z^\mu$（$\nu\neq\mu$）。在 $U_\mu\cap U_\nu\neq\emptyset$ 上，坐标变换 $\psi_{\mu\nu}:\C^n\to\C^n$ 为`}</Tx>
          <Eq n="8.6" title={R`$\CP^n$ 的转移函数`} say={R`两张卡的非齐次坐标只差一个公共因子 $z^\nu/z^\mu$：从 $\nu$ 卡换到 $\mu$ 卡就是乘这个在重叠区不为零的全纯函数。`}>{R`\xi^\lambda_{(\nu)}\mapsto\xi^\lambda_{(\mu)}=\frac{z^\nu}{z^\mu}\,\xi^\lambda_{(\nu)}.`}</Eq>
          <Tx>{R`因此 $\psi_{\mu\nu}$ 是乘以 $z^\nu/z^\mu$，当然是全纯的。（注意 $z^\nu/z^\mu=1/\xi^\mu_{(\nu)}$ 本身是 $\nu$ 卡坐标的函数，在 $U_\mu\cap U_\nu$ 上 $\xi^\mu_{(\nu)}\neq0$，所以它是 $\nu$ 卡坐标的有理函数、分母不为零——全纯。）$n=1$ 时，$\CP^1$ 有两张卡 $\xi=z^1/z^0$ 与 $\eta=z^0/z^1$，转移函数 $\eta=1/\xi$，与例 8.1 完全相同：$\CP^1\cong S^2$。`}</Tx>
          <CP1Lab />
        </Box>

        <Box kind="example" n="8.4" title={R`复 Grassmann 流形 $G_{k,n}(\C)$`}>{R`**复 Grassmann 流形** $G_{k,n}(\C)$ 的定义类似于实 Grassmann 流形（例 5.5）：$G_{k,n}(\C)$ 是 $\C^n$ 中复 $k$ 维子空间的集合。注意 $\CP^n=G_{1,n+1}(\C)$。

设 $M_{k,n}(\C)$ 是秩为 $k$ 的 $k\times n$ 复矩阵（$k\le n$）的集合。对 $A,B\in M_{k,n}(\C)$ 定义等价关系 $A\sim B$：若存在 $g\in\mathrm{GL}(k,\C)$ 使 $B=gA$。把 $G_{k,n}(\C)$ 等同于 $M_{k,n}(\C)/\mathrm{GL}(k,\C)$（$A$ 的 $k$ 个行向量张成子空间，左乘 $g$ 只换基）。设 $\{A_1,\ldots,A_l\}$ 是 $A\in M_{k,n}(\C)$ 的全部 $k\times k$ 子矩阵（$l=\binom nk$）。定义卡 $U_\alpha$ 为 $G_{k,n}(\C)$ 中满足 $\det A_\alpha\neq0$ 的子集。$U_\alpha$ 上的 $k(n-k)$ 个坐标由矩阵 $A_\alpha^{-1}A$ 的非平凡元素给出（$A_\alpha^{-1}A$ 在第 $\alpha$ 组列上是单位阵，其余 $k(n-k)$ 个元素是坐标）。细节见例 5.5；转移函数是这些元素的有理函数，分母是非零的行列式，因此全纯。所以 $\dim_\C G_{k,n}(\C)=k(n-k)$。`}</Box>

        <Box kind="example" n="8.5" title="代数簇">
          <Tx>{R`一组齐次多项式的公共零点是 $\CP^n$ 的紧子流形（在没有奇点时），称为**代数簇**（algebraic variety）。例如设 $P(z^0,\ldots,z^n)$ 是 $d$ 次齐次多项式。若 $a\neq0$ 是复数，$P$ 满足

$$P(az^0,\ldots,az^n)=a^dP(z^0,\ldots,z^n).$$

这说明 $P$ 的零点在 $\CP^n$ 上有定义：若 $P(z^0,\ldots,z^n)=0$，则 $P([z^0,\ldots,z^n])=0$（$P$ 本身不是 $\CP^n$ 上的函数，但"$P=0$"这一条件与代表元的选取无关）。具体地，考虑

$$P(z^0,z^1,z^2)=(z^0)^2+(z^1)^2+(z^2)^2$$

并定义 $N$ 为`}</Tx>
          <Eq n="8.7" say={R`$\CP^2$ 中由一个二次齐次方程割出的曲线（二次曲线）；方程齐次，所以"是否为零"与齐次坐标的整体缩放无关。`}>{R`N=\{[z^0,z^1,z^2]\in\CP^2\mid P(z^0,z^1,z^2)=0\}.`}</Eq>
          <Tx>{R`$U_\mu$ 的定义同例 8.3。在 $N\cap U_0$ 中，

$$[\xi^1_{(0)}]^2+[\xi^2_{(0)}]^2+1=0,$$

其中 $\xi^\mu_{(0)}=z^\mu/z^0$（注意 $z^0\neq0$）。作全纯坐标变换 $(\xi^1_{(0)},\xi^2_{(0)})\mapsto(\eta^1=\xi^1_{(0)},\ \eta^2=[\xi^1_{(0)}]^2+[\xi^2_{(0)}]^2+1)$。其 Jacobi 行列式 $\partial(\eta^1,\eta^2)/\partial(\xi^1_{(0)},\xi^2_{(0)})=2\xi^2_{(0)}$，除非 $\xi^2_{(0)}=z^2=0$ 否则不为零。于是 $N\cap U_0\cap U_2=\{(\eta^1,\eta^2)\in\C^2\mid\eta^2=0\}$ 显然是 $\C^2$ 的一维子流形，$\eta^1$ 是它的坐标。若 $\xi^2_{(0)}=z^2=0$，改用 $(\xi^1_{(0)},\xi^2_{(0)})\mapsto(\zeta^1=[\xi^1_{(0)}]^2+[\xi^2_{(0)}]^2+1,\ \zeta^2=\xi^2_{(0)})$，其 Jacobi 行列式 $-2\xi^1_{(0)}$ 除非 $\xi^1_{(0)}=z^1=0$ 否则不为零（而 $z^1=z^2=0$ 时方程给出 $1=0$，不在 $N$ 上）。于是 $N\cap U_0\cap U_1=\{(\zeta^1,\zeta^2)\in\C^2\mid\zeta^1=0\}$ 是 $\C^2$ 的一维子流形，$\zeta^2$ 是坐标。在 $N\cap U_0\cap U_1\cap U_2$ 上，坐标变换 $\eta^1\mapsto\zeta^2$ 是乘以 $z^2/z^1$，因而是全纯的。照此办理（对 $U_1$、$U_2$ 作同样的讨论），就在 $\CP^2$ 中定义了一个一维紧复子流形 $N$。`}</Tx>
          <Tx>{R`［补充：这条二次曲线 $N$ 双全纯等价于 $\CP^1$。令 $u=z^1+\mathrm{i}z^2$、$v=z^1-\mathrm{i}z^2$，方程变为 $uv=-(z^0)^2$，参数化 $[s,t]\in\CP^1\mapsto[z^0,u,v]=[\mathrm{i}st,\,s^2,\,t^2]$ 是双射。一般地，$\CP^2$ 中光滑 $d$ 次曲线的亏格为 $(d-1)(d-2)/2$，$d=2$ 给出亏格 $0$，即球面。］`}</Tx>
        </Box>
        <Tx>{R`**复流形是微分流形。**例如通过等同 $z^\mu=x^\mu+\mathrm{i}y^\mu$（$x^\mu,y^\mu\in\R$），$\C^m$ 可看作 $\R^{2m}$。同样，复流形的任一张卡 $U$ 上的坐标 $(z^1,\ldots,z^m)$ 都可以理解为实坐标 $(x^1,y^1,\ldots,x^m,y^m)$。坐标变换函数的解析性保证：把流形看作 $2m$ 维微分流形时，它们是可微的（全纯函数的实部、虚部是实解析的）。所以第 5 章的全部工具都可以用；下一节在其上加上与复结构相容的限制。`}</Tx>
      </Sub>
    </Sec>);
}
