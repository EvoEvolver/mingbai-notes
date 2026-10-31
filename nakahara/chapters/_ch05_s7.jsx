// §5.7 李群在流形上的作用 —— 式 (5.141a)–(5.163)，定义 5.14–5.17，定理 5.4，例 5.16–5.19，习题 5.24–5.28
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, C } from "@kit";

const R = String.raw;

export function Sec57() {
  return (
    <Sec n="5.7" title="The action of Lie groups on manifolds" zh="李群在流形上的作用"
      gist={R`把"流 = $\R$ 的作用"推广为李群的作用 $\sigma:G\times M\to M$（\sref{D5.14}）→ 例：$\mathrm{SL}(2,\C)$ 通过 $X\mapsto AXA^\dagger$ 作用在 Minkowski 时空上，给出到 $\mathrm{O}^\uparrow_+(1,3)$ 的二对一满同态 → 可迁、自由、有效；轨道与迷向群 $H(p)$（李子群，\sref{T5.4}）→ 齐性空间 $G/H\cong M$：$S^n$、$\RP^n$、$G_{k,n}(\R)$ → 李代数元素诱导 $M$ 上的向量场 $V^\sharp$ → 伴随表示 $\mathrm{Ad}_gV=gVg^{-1}$。`}
      why={R`物理中李群几乎总是以"作用在某个空间上的变换"出现：转动群作用在 $\R^3$ 上，Lorentz 群作用在时空上，规范群作用在场上。轨道与迷向群告诉我们哪些点"本质上相同"，齐性空间则把很多流形一次性造出来。`}
      gives={["5.141a", "5.141b", "5.145", "5.147", "5.148", "5.149", "5.150", "5.157", "5.160", "5.163"]}>
      <p className="muted">本节概念：<C id="group_action" /></p>
      <Tx>{R`在物理中，李群常常作为作用在流形上的变换的集合出现。例如 $\mathrm{SO}(3)$ 是 $\R^3$ 中的转动群，Poincaré 群是作用在 Minkowski 时空上的变换的集合。为了研究更一般的情形，我们把李群 $G$ 在流形 $M$ 上的作用抽象出来。我们其实已经遇到过群与几何的这种相互作用：§5.3 中把 $M$ 中的流定义为映射 $\sigma:\R\times M\to M$，其中 $\R$ 作为加法群作用。我们把这个想法抽象如下。`}</Tx>

      <Sub n="5.7.1" title="Definitions" zh="定义">
        <Stmt id="D5.14">
          <Eq n="5.141a" say="单位元什么也不做。">{R`\text{(i)}\qquad\sigma(e,p)=p\qquad\text{对任意 }p\in M`}</Eq>
          <Eq n="5.141b" title="群作用的复合律" say={R`先用 $g_2$ 变换再用 $g_1$ 变换，等于用乘积 $g_1g_2$ 一次变换：群的乘法表被忠实地复制成变换的复合。`}>{R`\text{(ii)}\qquad\sigma(g_1,\sigma(g_2,p))=\sigma(g_1g_2,p).`}</Eq>
        </Stmt>
        <Tx>{R`［注：我们常用记号 $gp$ 代替 $\sigma(g,p)$。用这个记号，第二个条件是 $g_1(g_2p)=(g_1g_2)p$。］`}</Tx>
        <Box kind="example" n="5.16" title={R`流、矩阵群与 $\mathrm{SL}(2,\C)$ 的作用`}>
          <Tx>{R`**(a)** 流是 $\R$ 在流形 $M$ 上的作用。若流以 $T$ 为周期，可以看作 $\mathrm{U}(1)$ 或 $\mathrm{SO}(2)$ 在 $M$ 上的作用：给定周期为 $T$ 的周期流 $\sigma(t,x)$，构造新的作用 $\bar\sigma(\exp(2\pi\mathrm{i}t/T),x)\equiv\sigma(t,x)$，其群 $G$ 为 $\mathrm{U}(1)$。（周期性保证 $\bar\sigma$ 良定义。）

**(b)** 设 $M\in\mathrm{GL}(n,\R)$，$x\in\R^n$。$\mathrm{GL}(n,\R)$ 在 $\R^n$ 上的作用由通常的矩阵作用在向量上定义：`}</Tx>
          <Eq n="5.142" say={R`矩阵群最基本的作用：矩阵乘列向量。`}>{R`\sigma(M,x)=M\cdot x.`}</Eq>
          <Tx>{R`$\mathrm{GL}(n,\R)$ 的子群的作用类似地定义。它们也可以作用在较小的空间上。例如 $\mathrm{O}(n)$ 作用在半径为 $r$ 的 $(n-1)$ 维球面 $S^{n-1}(r)$ 上（正交矩阵保持长度）：`}</Tx>
          <Eq n="5.143" say={R`正交群把球面映到自身，所以可以只看它在球面上的作用。`}>{R`\sigma:\mathrm{O}(n)\times S^{n-1}(r)\to S^{n-1}(r).`}</Eq>
          <Tx>{R`**(c)** 已知 $\mathrm{SL}(2,\C)$ 以一种特殊方式作用在四维 Minkowski 空间 $M_4$ 上。对 $x=(x^0,x^1,x^2,x^3)\in M_4$，定义 Hermite 矩阵`}</Tx>
          <Eq n="5.144" title="时空点 ↔ Hermite 矩阵" say={R`把一个四维时空点编码成一个 $2\times2$ Hermite 矩阵：单位阵配时间分量，三个 Pauli 矩阵配三个空间分量。`}>{R`X(x)\equiv x^\mu\sigma_\mu=\begin{pmatrix}x^0+x^3&x^1-\mathrm{i}x^2\\ x^1+\mathrm{i}x^2&x^0-x^3\end{pmatrix}`}</Eq>
          <Tx>{R`其中 $\sigma_\mu=(I_2,\sigma_1,\sigma_2,\sigma_3)$，$\sigma_i$（$i=1,2,3$）是 Pauli 矩阵。反过来，给定 Hermite 矩阵 $X$，由

$$x^\mu=\tfrac12\Tr(\sigma_\mu X)$$

（$\Tr$ 对 $2\times2$ 矩阵指标求迹；用了 $\Tr(\sigma_\mu\sigma_\nu)=2\delta_{\mu\nu}$）定义唯一的向量 $(x^\mu)\in M_4$。因此 $M_4$ 与 $2\times2$ Hermite 矩阵的集合之间有同构。有趣的是

$$\det X(x)=(x^0)^2-(x^1)^2-(x^2)^2-(x^3)^2=-x^{\mathrm t}\eta x=-(\text{Minkowski 范数})^2.$$

于是 $x$ 为类时向量时 $\det X(x)>0$，在光锥上时 $\det X(x)=0$，为类空向量时 $\det X(x)<0$。

取 $A\in\mathrm{SL}(2,\C)$，定义 $\mathrm{SL}(2,\C)$ 在 $M_4$ 上的作用为`}</Tx>
          <Eq n="5.145" title={R`$\mathrm{SL}(2,\C)$ 在时空上的作用`} say={R`用一个行列式为 1 的复矩阵两边夹住：Hermite 性与行列式都保持，所以时空间隔不变——这就是 Lorentz 变换的"旋量版本"。`}>{R`\sigma(A,x)\equiv AX(x)A^\dagger.`}</Eq>
          <Tx>{R`读者应验证这个作用确实满足\sref{D5.14} 的公理：$AXA^\dagger$ 仍是 Hermite 的；$\sigma(I_2,x)=X$；$\sigma(A,\sigma(B,x))=A(BXB^\dagger)A^\dagger=(AB)X(AB)^\dagger=\sigma(AB,x)$。

$\mathrm{SL}(2,\C)$ 在 $M_4$ 上的作用表示 Lorentz 变换 $\mathrm{O}(1,3)$。首先注意这个作用保持 Minkowski 范数：

$$\det\sigma(A,x)=\det[AX(x)A^\dagger]=\det X(x),$$

因为 $\det A=\det A^\dagger=1$。而且由于 $A(BXB^\dagger)A^\dagger=(AB)X(AB)^\dagger$，存在同态 $\varphi:\mathrm{SL}(2,\C)\to\mathrm{O}(1,3)$（$\sigma(A,\cdot)$ 是 $M_4$ 上保持范数的线性映射，即 Lorentz 变换 $\varphi(A)$）。但这个同态不可能是一对一的，因为 $A\in\mathrm{SL}(2,\C)$ 与 $-A$ 给出 $\mathrm{O}(1,3)$ 的同一个元素（见 \eqref{5.145}）。我们（在习题 5.24 中）验证，下面的矩阵是绕单位向量 $\hat{\boldsymbol n}$ 转角度 $\theta$ 的转动的显式形式：`}</Tx>
          <Eq n="5.146a" title="旋量转动" say={R`绕 $\hat{\boldsymbol n}$ 转 $\theta$ 的 $\mathrm{SL}(2,\C)$ 矩阵带的是半角 $\theta/2$：转一整圈 $2\pi$ 时它变号——这就是旋量。`}>{R`A=\exp\left[-\mathrm{i}\frac\theta2(\hat{\boldsymbol n}\cdot\boldsymbol{\sigma})\right]=\cos\frac\theta2I_2-\mathrm{i}(\hat{\boldsymbol n}\cdot\boldsymbol{\sigma})\sin\frac\theta2.`}</Eq>
          <Tx>{R`（第二个等号用了 $(\hat{\boldsymbol n}\cdot\boldsymbol\sigma)^2=I_2$，把指数级数分成偶次项与奇次项。）$\theta/2$ 的出现保证了 $\mathrm{SL}(2,\C)$ 与 $\mathrm{O}(1,3)$ 的 $\mathrm{O}(3)$ 子群之间的同态确实是二对一的。事实上，绕 $\hat{\boldsymbol n}$ 转 $\theta$ 与转 $2\pi+\theta$ 应该是同一个 $\mathrm{O}(3)$ 转动，但在 $\mathrm{SL}(2,\C)$ 中 $A(2\pi+\theta)=-A(\theta)$。这导致了旋量的存在。［见 Misner 等 (1973) 与 Wald (1984)。］沿方向 $\hat{\boldsymbol n}$、速度为 $v=\tanh\alpha$ 的 boost 为`}</Tx>
          <Eq n="5.146b" title="旋量 boost" say={R`沿 $\hat{\boldsymbol n}$ 的 boost：指数里没有 $\mathrm{i}$，矩阵是 Hermite 正定的，同样带半个快度 $\alpha/2$。`}>{R`A=\exp\left[\frac\alpha2(\hat{\boldsymbol n}\cdot\boldsymbol{\sigma})\right]=\cosh\frac\alpha2I_2+(\hat{\boldsymbol n}\cdot\boldsymbol{\sigma})\sinh\frac\alpha2.`}</Eq>
          <Tx>{R`**满射到 $\mathrm{O}^\uparrow_+(1,3)$。**我们证明 $\varphi$ 把 $\mathrm{SL}(2,\C)$ 映到**正时向**（proper orthochronous）Lorentz 群 $\mathrm{O}^\uparrow_+(1,3)=\{\Lambda\in\mathrm{O}(1,3)\mid\det\Lambda=+1,\ \Lambda_{00}>0\}$ 上。取任意

$$A=\begin{pmatrix}a&b\\ c&d\end{pmatrix}\in\mathrm{SL}(2,\C),$$

设 $x^\mu=(1,0,0,0)$ 被映到 $x'^\mu$。记 $\varphi(A)=\Lambda$，则

$$x'^0=\tfrac12\Tr(AXA^\dagger)=\tfrac12\Tr\left[\begin{pmatrix}a&b\\ c&d\end{pmatrix}\begin{pmatrix}\bar a&\bar c\\ \bar b&\bar d\end{pmatrix}\right]=\tfrac12(|a|^2+|b|^2+|c|^2+|d|^2)>0,$$

所以 $\Lambda_{00}>0$（$X=I_2$，$x'^0=\Lambda_{00}x^0$）。为证明 $\det\Lambda=+1$，注意 $\mathrm{SL}(2,\C)$ 的任何元素都可以写成（极分解：酉矩阵 × 正定 Hermite 矩阵）

$$\begin{aligned}A&=\begin{pmatrix}\mathrm{e}^{\mathrm{i}\alpha}&0\\ 0&\mathrm{e}^{-\mathrm{i}\alpha}\end{pmatrix}\begin{pmatrix}\cos\beta&\sin\beta\,\mathrm{e}^{\mathrm{i}\gamma}\\ -\sin\beta\,\mathrm{e}^{-\mathrm{i}\gamma}&\cos\beta\end{pmatrix}B\\&=\begin{pmatrix}\mathrm{e}^{\mathrm{i}\alpha/2}&0\\ 0&\mathrm{e}^{-\mathrm{i}\alpha/2}\end{pmatrix}^2\begin{pmatrix}\cos(\beta/2)&\sin(\beta/2)\mathrm{e}^{\mathrm{i}\gamma}\\ -\sin(\beta/2)\mathrm{e}^{-\mathrm{i}\gamma}&\cos(\beta/2)\end{pmatrix}^2B\\&\equiv\mathcal{M}^2\mathcal{N}^2B_0^2\end{aligned}$$

其中 $B\equiv B_0^2$ 是正定矩阵（$B_0$ 取为 $B$ 的正定平方根）。由于 $\varphi$ 是同态，$\det\varphi(\cdot)=\pm1$ 是实数，

$$\det\varphi(A)=(\det\varphi(\mathcal{M}))^2(\det\varphi(\mathcal{N}))^2(\det\varphi(B_0))^2>0,$$

所以 $\det\Lambda=+1$。`}</Tx>
          <Tx>{R`至此我们证明了 $\varphi(\mathrm{SL}(2,\C))\subset\mathrm{O}^\uparrow_+(1,3)$。\eqref{5.146a} 与 \eqref{5.146b} 说明对 $\mathrm{O}^\uparrow_+(1,3)$ 的任何元素都有对应的矩阵 $A\in\mathrm{SL}(2,\C)$（每个正时向 Lorentz 变换都是一个转动与一个 boost 之积），所以 $\varphi$ 是满射。于是确立了`}</Tx>
          <Eq n="5.147" keyEq title={R`$\mathrm{SL}(2,\C)\to\mathrm{O}^\uparrow_+(1,3)$`} say={R`$\mathrm{SL}(2,\C)$ 恰好盖满正时向 Lorentz 群，而且是二对一（$\pm A$ 给出同一个 Lorentz 变换）。`}>{R`\varphi(\mathrm{SL}(2,\C))=\mathrm{O}^\uparrow_+(1,3).`}</Eq>
          <Tx>{R`可以证明 $\mathrm{SL}(2,\C)$ 是单连通的，是 $\mathrm{O}^\uparrow_+(1,3)$ 的万有覆叠群 $\mathrm{SPIN}(1,3)$，见 §4.6。`}</Tx>
        </Box>
        <Box kind="warning" title={R`勘误：例 5.16(c) 中的四处（pp.237–238）`}>{R`**(1) 公式编号。**$x^\mu=\frac12\Tr(\sigma_\mu X)$ 在原书中印作 (5.130)，与前面矩阵指数的 \eqref{5.130} 重号。它是 \eqref{5.144} 的逆，本站把它作为不编号的公式排在 \eqref{5.144} 之后，原编号 (5.130) 保留给矩阵指数。

**(2) 极分解的第二行。**原书第一个平方因子印作 $\mathrm{diag}(\mathrm{e}^{\mathrm{i}\alpha/2},\mathrm{e}^{\mathrm{i}\alpha/2})^2$，应为 $\mathrm{diag}(\mathrm{e}^{\mathrm{i}\alpha/2},\mathrm{e}^{-\mathrm{i}\alpha/2})^2$——否则平方后是 $\mathrm{e}^{\mathrm{i}\alpha}I_2$，不等于第一行的 $\mathrm{diag}(\mathrm{e}^{\mathrm{i}\alpha},\mathrm{e}^{-\mathrm{i}\alpha})$，行列式也不为 1。

**(3)** 原书"To show $\det A=+1$"应为"to show $\det\Lambda=+1$"（$\det A=1$ 是已知条件）；"This shows that $\varphi(A)$ is positive definite"应为"$\det\varphi(A)$ 为正"。

**(4) 记号。**原书把三个平方因子记为 $M^2N^2B_0^2$；为避免与流形 $M,N$ 混淆，本站记作 $\mathcal{M}^2\mathcal{N}^2B_0^2$。`}</Box>
        <Exercise n="5.24" title={R`$\mathrm{SL}(2,\C)$ 中的转动与 boost`} level="★★"
          hint={R`把 \eqref{5.144} 的 $X$ 代入 $AXA^\dagger$，比较矩阵元；用 $x^1\pm\mathrm{i}x^2$ 与 $x^0\pm x^3$ 这样的组合最方便。`}
          solution={R`**(a)** $A=\mathrm{diag}(\mathrm{e}^{-\mathrm{i}\theta/2},\mathrm{e}^{\mathrm{i}\theta/2})$，$A^\dagger=\mathrm{diag}(\mathrm{e}^{\mathrm{i}\theta/2},\mathrm{e}^{-\mathrm{i}\theta/2})$。

$$AXA^\dagger=\begin{pmatrix}x^0+x^3&\mathrm{e}^{-\mathrm{i}\theta}(x^1-\mathrm{i}x^2)\\ \mathrm{e}^{\mathrm{i}\theta}(x^1+\mathrm{i}x^2)&x^0-x^3\end{pmatrix}.$$

于是 $x'^0=x^0$，$x'^3=x^3$，$x'^1+\mathrm{i}x'^2=\mathrm{e}^{\mathrm{i}\theta}(x^1+\mathrm{i}x^2)$，即 $x'^1=x^1\cos\theta-x^2\sin\theta$，$x'^2=x^1\sin\theta+x^2\cos\theta$：绕 $z$ 轴转 $\theta$。这正是 \eqref{5.146a} 取 $\hat{\boldsymbol n}=\hat z$（$\sigma_3$ 对角）。$\theta=2\pi$ 时 $A=-I_2$，却给出恒等变换。

**(b)** $\cosh\frac\alpha2\pm\sinh\frac\alpha2=\mathrm{e}^{\pm\alpha/2}$，所以 $A=\mathrm{diag}(\mathrm{e}^{\alpha/2},\mathrm{e}^{-\alpha/2})=A^\dagger$。

$$AXA^\dagger=\begin{pmatrix}\mathrm{e}^{\alpha}(x^0+x^3)&x^1-\mathrm{i}x^2\\ x^1+\mathrm{i}x^2&\mathrm{e}^{-\alpha}(x^0-x^3)\end{pmatrix}.$$

所以 $x'^1=x^1$，$x'^2=x^2$，$x'^0\pm x'^3=\mathrm{e}^{\pm\alpha}(x^0\pm x^3)$，即

$$x'^0=x^0\cosh\alpha+x^3\sinh\alpha,\qquad x'^3=x^0\sinh\alpha+x^3\cosh\alpha.$$

原点处静止的世界线 $(x^0,0,0,0)$ 被映到 $x'^3/x'^0=\tanh\alpha$：沿 $z$ 轴、速度 $v=\tanh\alpha$ 的 boost（\eqref{5.146b} 取 $\hat{\boldsymbol n}=\hat z$）。`}>
          {R`通过显式计算验证：(a) $A=\begin{pmatrix}\mathrm{e}^{-\mathrm{i}\theta/2}&0\\ 0&\mathrm{e}^{\mathrm{i}\theta/2}\end{pmatrix}$ 表示绕 $z$ 轴转 $\theta$；(b) $A=\begin{pmatrix}\cosh(\alpha/2)+\sinh(\alpha/2)&0\\ 0&\cosh(\alpha/2)-\sinh(\alpha/2)\end{pmatrix}$ 表示沿 $z$ 轴、速度 $v=\tanh\alpha$ 的 boost。`}
        </Exercise>
        <Stmt id="D5.15" />
        <Exercise n="5.25" title="左右平移是自由且可迁的" level="★"
          hint={R`可迁：要把 $g_1$ 送到 $g_2$，取 $a=g_2g_1^{-1}$（左）或 $a=g_1^{-1}g_2$（右）。自由：消去律。`}
          solution={R`**左平移** $L:(a,g)\mapsto L_ag=ag$。它是作用：$L_eg=g$，$L_a(L_bg)=abg=L_{ab}g$；乘法光滑。可迁：对任意 $g_1,g_2$，取 $a=g_2g_1^{-1}$，则 $L_ag_1=g_2$。自由：若 $ag=g$，右乘 $g^{-1}$ 得 $a=e$。

**右平移** $R:(a,g)\mapsto R_ag=ga$。可迁：取 $a=g_1^{-1}g_2$，$R_ag_1=g_2$。自由：$ga=g\Rightarrow a=e$。注意 $R_a(R_bg)=gba=R_{ba}g$，所以按\sref{D5.14} 的约定它是**右**作用；若要得到左作用，可用 $(a,g)\mapsto ga^{-1}$，自由性与可迁性不变。`}>
          {R`证明李群的右平移 $R:(a,g)\mapsto R_ag$ 与左平移 $L:(a,g)\mapsto L_ag$ 是自由且可迁的。`}
        </Exercise>
      </Sub>

      <Sub n="5.7.2" title="Orbits and isotropy groups" zh="轨道与迷向群">
        <Tx>{R`给定点 $p\in M$，$G$ 的作用把 $p$ 带到 $M$ 中的各个点。$p$ 在作用 $\sigma$ 下的**轨道**（orbit）是 $M$ 的子集`}</Tx>
        <Eq n="5.148" title="轨道" say={R`轨道：从 $p$ 出发，用群里所有元素去作用，能到达的点的全体。`}>{R`Gp=\{\sigma(g,p)\mid g\in G\}.`}</Eq>
        <Tx>{R`若 $G$ 在 $M$ 上的作用可迁，任何 $p\in M$ 的轨道都是 $M$ 本身。显然 $G$ 在任何轨道 $Gp$ 上的作用都是可迁的。`}</Tx>
        <Box kind="example" n="5.17" title="转动流与正交群的轨道">{R`**(a)** 向量场 $X=-y\partial/\partial x+x\partial/\partial y$ 生成的流 $\sigma$ 以 $2\pi$ 为周期，见例 5.9。由 $(t,(x,y))\mapsto\sigma(t,(x,y))$ 定义的作用 $\sigma:\R\times\R^2\to\R^2$ 不是有效的，因为对所有 $(x,y)\in\R^2$ 有 $\sigma(2\pi n,(x,y))=(x,y)$。同理这个流也不是自由的。过 $(x,y)\neq(0,0)$ 的轨道是以原点为圆心的圆 $S^1$。（若改看 $\mathrm{SO}(2)=\R/2\pi\Z$ 的作用，它就是有效的；但仍不自由，因为原点被所有元素固定。）

**(b)** $\mathrm{O}(n)$ 在 $\R^n$ 上的作用不可迁，因为若 $|x|\neq|x'|$，$\mathrm{O}(n)$ 中没有元素把 $x$ 带到 $x'$。但 $\mathrm{O}(n)$ 在 $S^{n-1}$ 上的作用显然可迁。过 $x$ 的轨道是半径 $|x|$ 的球面 $S^{n-1}$。因此给定作用 $\sigma:\mathrm{O}(n)\times\R^n\to\R^n$，轨道把 $\R^n$ 分成互不相交的、半径不同的球面。引入关系：$x\sim y$ 当且仅当对某个 $g\in G$ 有 $y=\sigma(g,x)$。容易验证 $\sim$ 是等价关系，等价类 $[x]$ 就是过 $x$ 的轨道。陪集空间 $\R^n/\mathrm{O}(n)$ 是 $[0,\infty)$，因为每个等价类由半径参数化。`}</Box>
        <Stmt id="D5.16">
          <Eq n="5.149" title="迷向群" say={R`迷向群：群中把点 $p$ 留在原地不动的那些元素。`}>{R`H(p)=\{g\in G\mid\sigma(g,p)=p\}.`}</Eq>
        </Stmt>
        <Tx>{R`容易看出 $H(p)$ 确实是子群。设 $g_1,g_2\in H(p)$，则 $g_1g_2\in H(p)$，因为 $\sigma(g_1g_2,p)=\sigma(g_1,\sigma(g_2,p))=\sigma(g_1,p)=p$。由定义 $\sigma(e,p)=p$，显然 $e\in H(p)$。若 $g\in H(p)$，则 $g^{-1}\in H(p)$，因为 $p=\sigma(e,p)=\sigma(g^{-1}g,p)=\sigma(g^{-1},\sigma(g,p))=\sigma(g^{-1},p)$。`}</Tx>
        <Exercise n="5.26" title="自由作用的迷向群" level="★"
          hint={R`直接用\sref{D5.15}(b) 与 \eqref{5.149}。`}
          solution={R`若 $g\in H(p)$，则 $\sigma(g,p)=p$，即 $g$ 有不动点 $p$。作用自由，故 $g=e$。于是 $H(p)\subset\{e\}$；又 $e\in H(p)$，所以 $H(p)=\{e\}$。反过来，若对每个 $p$ 都有 $H(p)=\{e\}$，作用就是自由的——"自由"恰好等价于"所有迷向群平凡"。`}>
          {R`设李群 $G$ 自由地作用在流形 $M$ 上。证明对任意 $p\in M$ 有 $H(p)=\{e\}$。`}
        </Exercise>
        <Stmt id="T5.4">
          <Proof steps={[
            { claim: R`固定 $p\in M$，定义映射 $\varphi_p:G\to M$，$\varphi_p(g)\equiv gp$。它是作用 $\sigma$ 限制在 $G\times\{p\}$ 上，所以连续（甚至光滑）。` },
            { claim: R`$H(p)$ 是单点 $p$ 的原像 $\varphi_p^{-1}(p)$。流形是 Hausdorff 空间，单点是闭集；连续映射下闭集的原像是闭集。所以 $H(p)$ 是 $G$ 的闭子集。`, fill: true },
            { claim: R`群性质上面已经证明（\eqref{5.149} 之后的论证）。` },
            { claim: R`由\sref{T5.2}，闭子群是李子群，所以 $H(p)$ 是李子群。`, uses: ["T5.2"] },
          ]} />
        </Stmt>
        <Tx>{R`例如设 $M=\R^3$，$G=\mathrm{SO}(3)$，取点 $p=(0,0,1)\in\R^3$。迷向群 $H(p)$ 是绕 $z$ 轴的转动的集合，同构于 $\mathrm{SO}(2)$。

**齐性空间。**设 $G$ 是李群，$H$ 是 $G$ 的任意（闭）子群。陪集空间 $G/H$ 容许微分结构而成为流形，称为**齐性空间**（homogeneous space）。注意 $\dim G/H=\dim G-\dim H$。设李群 $G$ 可迁地作用在流形 $M$ 上，$H(p)$ 是 $p\in M$ 的迷向群。$H(p)$ 是李子群，陪集空间 $G/H(p)$ 是齐性空间。事实上，若 $G$、$H(p)$ 与 $M$ 满足某些技术性条件（例如 $G/H(p)$ 紧致），可以证明 $G/H(p)$ 同胚于 $M$（映射 $[g]\mapsto gp$ 是连续双射），见例 5.18。`}</Tx>
        <Box kind="example" n="5.18" title={R`球面、射影空间与 Grassmann 流形都是齐性空间`}>
          <Tx>{R`**(a)** 设 $G=\mathrm{SO}(3)$ 是作用在 $\R^3$ 上的群，$H=\mathrm{SO}(2)$ 是 $x\in\R^3$ 的迷向群。群 $\mathrm{SO}(3)$ 可迁地作用在 $S^2$ 上，我们有 $\mathrm{SO}(3)/\mathrm{SO}(2)\cong S^2$。它的几何图像是什么？设 $g'=gh$，$g,g'\in G$，$h\in H$。由于 $H$ 是一个平面内转动的集合（绕 $x$ 的轴），$g$ 与 $g'$ 作用在 $x$ 上的结果相同——等价类 $[g]$ 只由 $gx$ 决定，即由极角 $(\theta,\phi)$ 确定。于是又得到 $G/H=S^2$。由于 $\mathrm{SO}(2)$ 不是 $\mathrm{SO}(3)$ 的正规子群，$S^2$ 不容许群结构（至少不以这种方式）。

很容易把这个结果推广到更高维的转动群，得到有用的结果`}</Tx>
          <Eq n="5.150" keyEq title="球面是齐性空间" say={R`$n$ 维球面 = 高维转动群模去固定一点的转动：球面上的点与"把北极转到哪里"一一对应。`}>{R`\mathrm{SO}(n+1)/\mathrm{SO}(n)=S^n.`}</Eq>
          <Tx>{R`$\mathrm{O}(n+1)$ 也可迁地作用在 $S^n$ 上，我们有`}</Tx>
          <Eq n="5.151" say={R`换成正交群也一样：多出来的反射在分子分母中相消。`}>{R`\mathrm{O}(n+1)/\mathrm{O}(n)=S^n.`}</Eq>
          <Tx>{R`对 $\mathrm{U}(n)$ 与 $\mathrm{SU}(n)$ 有类似的关系（作用在 $\C^{n+1}$ 的单位球面 $S^{2n+1}$ 上）：`}</Tx>
          <Eq n="5.152" say={R`复的版本：$\C^{n+1}$ 中的单位球面是 $2n+1$ 维实球面。例如 $\mathrm{SU}(2)\cong S^3$。`}>{R`\mathrm{U}(n+1)/\mathrm{U}(n)=\mathrm{SU}(n+1)/\mathrm{SU}(n)=S^{2n+1}.`}</Eq>
          <Tx>{R`**(b)** 群 $\mathrm{O}(n+1)$ 从左边可迁地作用在 $\RP^n$ 上。首先注意 $\mathrm{O}(n+1)$ 以通常方式作用在 $\R^{n+1}$ 上，并保持定义 $\RP^n$ 所用的等价关系（见例 5.4）。事实上，取 $x,x'\in\R^{n+1}$，$g\in\mathrm{O}(n+1)$。若 $x\sim x'$（即对某个 $a\in\R-\{0\}$ 有 $x'=ax$），则 $gx\sim gx'$（$gx'=agx$）。因此 $\mathrm{O}(n+1)$ 在 $\R^{n+1}$ 上的这个作用诱导 $\mathrm{O}(n+1)$ 在 $\RP^n$ 上的自然作用。显然这个作用在 $\RP^n$ 上可迁。（看两个范数相同的代表元。）若取 $\RP^n$ 中对应于点 $(1,0,\ldots,0)\in\R^{n+1}$ 的点 $p$，迷向群 $H(p)$ 为`}</Tx>
          <Eq n="5.153" say={R`固定一条直线的正交变换：沿该直线可以保持或反向（$\pm1$），在正交补空间中任意正交变换。`}>{R`H(p)=\begin{pmatrix}\pm1&0&0&\ldots&0\\ 0&&&&\\ 0&&&&\\ \vdots&&\mathrm{O}(n)&&\\ 0&&&&\end{pmatrix}=\mathrm{O}(1)\times\mathrm{O}(n)`}</Eq>
          <Tx>{R`其中 $\mathrm{O}(1)$ 是集合 $\{-1,+1\}=\Z_2$。于是`}</Tx>
          <Eq n="5.154" say={R`射影空间 = 球面模去对径点，也 = 正交群模去"保持一条直线"的子群。`}>{R`\mathrm{O}(n+1)/[\mathrm{O}(1)\times\mathrm{O}(n)]\cong S^n/\Z_2\cong\RP^n.`}</Eq>
          <Tx>{R`**(c)** 这个结果很容易推广到 Grassmann 流形：$G_{k,n}(\R)=\mathrm{O}(n)/[\mathrm{O}(k)\times\mathrm{O}(n-k)]$。先证明 $\mathrm{O}(n)$ 可迁地作用在 $G_{k,n}(\R)$ 上。设 $A$ 是 $G_{k,n}(\R)$ 的元素，即 $\R^n$ 中的 $k$ 维平面。定义把向量 $v\in\R^n$ 投影到平面 $A$ 上的 $n\times n$ 矩阵 $P_A$。在 $\R^n$ 中引入正交归一基 $\{e_1,\ldots,e_n\}$，在平面 $A$ 中引入另一组正交归一基 $\{f_1,\ldots,f_k\}$，正交归一性都是对 $\R^n$ 的欧氏度规而言。用 $\{e_i\}$ 展开，$f_a=\sum_if_{ai}e_i$，投影后的向量为

$$P_Av=(v\cdot f_1)f_1+\cdots+(v\cdot f_k)f_k=\sum_{i,j}(v_if_{1i}f_{1j}+\cdots+v_if_{ki}f_{kj})e_j=\sum_{i,a,j}v_if_{ai}f_{aj}e_j.$$

于是 $P_A$ 由矩阵`}</Tx>
          <Eq n="5.155" say={R`投影矩阵就是平面内正交归一基向量的外积之和——它只依赖平面本身，不依赖基的选取。`}>{R`(P_A)_{ij}=\sum_af_{ai}f_{aj}`}</Eq>
          <Tx>{R`表示。注意 $P_A^2=P_A$，$P_A^{\mathrm t}=P_A$，$\Tr P_A=k$。［最后一个关系成立是因为总可以选取坐标系使

$$P_A=\mathrm{diag}(\underbrace{1,1,\ldots,1}_{k},\underbrace{0,\ldots,0}_{n-k}).$$

这保证 $A$ 确实是 $k$ 维平面。］反过来，任何满足这三个条件的矩阵 $P$ 决定 $\R^n$ 中唯一的 $k$ 维平面（$P$ 的像），即 $G_{k,n}(\R)$ 的唯一元素。

现在证明 $\mathrm{O}(n)$ 在 $G_{k,n}(\R)$ 上的作用可迁。取 $A\in G_{k,n}(\R)$ 与 $g\in\mathrm{O}(n)$，构造 $P_B\equiv gP_Ag^{-1}$。矩阵 $P_B$ 确定元素 $B\in G_{k,n}(\R)$，因为 $P_B^2=P_B$，$P_B^{\mathrm t}=P_B$（$g^{-1}=g^{\mathrm t}$），且 $\Tr P_B=k$。把这个作用记作 $B=\sigma(g,A)$。显然这个作用可迁：给定 $A$ 的一组标准 $k$ 维基 $\{f_1,\ldots,f_k\}$，任何 $k$ 维正交归一基 $\{\tilde f_1,\ldots,\tilde f_k\}$ 都可以由 $\mathrm{O}(n)$ 作用在这组基上得到（把两组基各自扩充为 $\R^n$ 的正交归一基，取把一组映成另一组的正交矩阵）。

取由标准基 $\{f_1,\ldots,f_k\}$ 张成的特殊平面 $C_0$。迷向群 $H(C_0)$ 的元素具有形式`}</Tx>
          <Eq n="5.156" say={R`保持一个 $k$ 维平面的正交变换：在平面内任意转动，在正交补中也任意转动，两块之间不混合。`}>{R`\mathcal{M}=\begin{pmatrix}g_1&0\\ 0&g_2\end{pmatrix}\qquad(g_1:\ k\times k,\quad g_2:\ (n-k)\times(n-k))`}</Eq>
          <Tx>{R`其中 $g_1\in\mathrm{O}(k)$。（右上块为零是因为 $C_0$ 被映到自身；左下块为零则由正交性推出。）由于 $\mathcal{M}\in\mathrm{O}(n)$，$(n-k)\times(n-k)$ 矩阵 $g_2$ 必是 $\mathrm{O}(n-k)$ 的元素。于是迷向群同构于 $\mathrm{O}(k)\times\mathrm{O}(n-k)$。最终我们验证了`}</Tx>
          <Eq n="5.157" title="Grassmann 流形是齐性空间" say={R`$k$ 维平面的空间 = 全体转动模去"保持一个 $k$ 维平面"的转动。`}>{R`G_{k,n}(\R)\cong\mathrm{O}(n)/[\mathrm{O}(k)\times\mathrm{O}(n-k)].`}</Eq>
          <Tx>{R`$G_{k,n}(\R)$ 的维数由一般公式求得：`}</Tx>
          <Eq n="5.158" say={R`用"群的维数减迷向群的维数"重新算出 $k(n-k)$，与 \eqref{5.14} 一致。`}>{R`\begin{aligned}\dim G_{k,n}(\R)&=\dim\mathrm{O}(n)-\dim[\mathrm{O}(k)\times\mathrm{O}(n-k)]\\&=\tfrac12n(n-1)-\left[\tfrac12k(k-1)+\tfrac12(n-k)(n-k-1)\right]\\&=k(n-k)\end{aligned}`}</Eq>
          <Tx>{R`与例 5.5 的结果一致。\eqref{5.157} 还说明 Grassmann 流形是紧致的（紧群 $\mathrm{O}(n)$ 的连续像）。`}</Tx>
        </Box>
        <Box kind="warning" title={R`勘误：例 5.18(b) 的交叉引用与记号（pp.241–242）`}>{R`(1) 原书说 $\mathrm{O}(n+1)$ 保持"定义 $\RP^n$ 所用的等价关系（见例 5.12）"，例 5.12 是 Hamilton 力学；$\RP^n$ 在**例 5.4** 中定义。(2) 原书把 \eqref{5.156} 的矩阵记作 $M$，本站记作 $\mathcal{M}$，以免与流形混淆。`}</Box>
      </Sub>

      <Sub n="5.7.3" title="Induced vector fields" zh="诱导向量场">
        <Tx>{R`设李群 $G$ 以 $(g,x)\mapsto gx$ 作用在 $M$ 上。由 $V\in T_eG$ 生成的左不变向量场 $X_V$ 自然地在 $M$ 上诱导一个向量场。在 $M$ 中定义流`}</Tx>
        <Eq n="5.159" say={R`用单参数子群 $\exp(tV)$ 去作用 $M$ 中的点，得到 $M$ 上的一个流。`}>{R`\sigma(t,x)=\exp(tV)x,`}</Eq>
        <Tx>{R`$\sigma(t,x)$ 是单参数变换群（由 \eqref{5.128} 与 \eqref{5.141b}：$\exp(tV)\exp(sV)x=\exp((t+s)V)x$），并定义称为**诱导向量场**（induced vector field）的向量场，记作 $V^\sharp$：`}</Tx>
        <Eq n="5.160" title="诱导向量场" say={R`李代数元素 $V$ 在 $M$ 上诱导的向量场：沿 $\exp(tV)$ 的作用移动时，点在 $t=0$ 的速度。`}>{R`V^\sharp|_x=\left.\frac{\dd}{\dd t}\exp(tV)x\right|_{t=0}.`}</Eq>
        <Tx>{R`于是我们得到一个映射 $\sharp:T_eG\to\mathcal{X}(M)$，$V\mapsto V^\sharp$。`}</Tx>
        <Exercise n="5.27" title={R`$\mathrm{SO}(2)$ 在 $\R^2$ 上的诱导向量场`} level="★"
          hint={R`$V^2=-I_2$，把指数级数分成偶次项与奇次项。`}
          solution={R`**(a)** $V^2=\begin{pmatrix}0&-1\\ 1&0\end{pmatrix}^2=-I_2$，所以 $V^{2k}=(-1)^kI_2$，$V^{2k+1}=(-1)^kV$。由 \eqref{5.129}，

$$\exp(tV)=\sum_k\frac{(-1)^kt^{2k}}{(2k)!}I_2+\sum_k\frac{(-1)^kt^{2k+1}}{(2k+1)!}V=\cos t\,I_2+\sin t\,V=\begin{pmatrix}\cos t&-\sin t\\ \sin t&\cos t\end{pmatrix}.$$

过 $\boldsymbol{x}=(x,y)^{\mathrm t}$ 的诱导流为 $\sigma(t,\boldsymbol{x})=\exp(tV)\boldsymbol{x}=(x\cos t-y\sin t,\ x\sin t+y\cos t)$——正是例 5.9 的流。

**(b)** 由 \eqref{5.160}，$V^\sharp|_{\boldsymbol{x}}=\frac{\dd}{\dd t}\exp(tV)\boldsymbol{x}\big|_{t=0}=V\boldsymbol{x}=(-y,x)$，即 $V^\sharp=-y\,\partial/\partial x+x\,\partial/\partial y$。一般地，对线性作用，$V^\sharp|_{\boldsymbol{x}}=V\boldsymbol{x}$。`}>
          {R`李群 $\mathrm{SO}(2)$ 以通常方式作用在 $M=\R^2$ 上。设 $V=\begin{pmatrix}0&-1\\ 1&0\end{pmatrix}$ 是 $\sym{lie}{\mathfrak{so}}(2)$ 的元素。(a) 证明 $\exp(tV)=\begin{pmatrix}\cos t&-\sin t\\ \sin t&\cos t\end{pmatrix}$，并求过 $\boldsymbol{x}=\begin{pmatrix}x\\ y\end{pmatrix}\in\R^2$ 的诱导流。(b) 证明 $V^\sharp|_{\boldsymbol{x}}=-y\,\partial/\partial x+x\,\partial/\partial y$。`}
        </Exercise>
        <Box kind="example" n="5.19" title={R`$\mathrm{SO}(3)$ 在 $\R^3$ 上：角动量向量场`}>{R`取 $G=\mathrm{SO}(3)$，$M=\R^3$。$T_eG$ 的基向量由绕 $x$、$y$、$z$ 轴的转动生成，分别记作 $X_x$、$X_y$、$X_z$（见习题 5.22）：

$$X_x=\begin{pmatrix}0&0&0\\ 0&0&-1\\ 0&1&0\end{pmatrix},\quad X_y=\begin{pmatrix}0&0&1\\ 0&0&0\\ -1&0&0\end{pmatrix},\quad X_z=\begin{pmatrix}0&-1&0\\ 1&0&0\\ 0&0&0\end{pmatrix}.$$

重复与上面类似的分析（$V^\sharp|_{\boldsymbol{x}}=V\boldsymbol{x}$），得到对应的诱导向量

$$X_x^\sharp=-z\frac{\partial}{\partial y}+y\frac{\partial}{\partial z},\qquad X_y^\sharp=-x\frac{\partial}{\partial z}+z\frac{\partial}{\partial x},\qquad X_z^\sharp=-y\frac{\partial}{\partial x}+x\frac{\partial}{\partial y}.$$

（例如 $X_x(x,y,z)^{\mathrm t}=(0,-z,y)^{\mathrm t}$。）它们正是量子力学中的角动量算符（差一个因子 $-\mathrm{i}\hbar$）：$\hat L_x=-\mathrm{i}\hbar(y\partial_z-z\partial_y)=-\mathrm{i}\hbar X_x^\sharp$。`}</Box>
        <Box kind="warning" title={R`易错点：$\sharp$ 把括号变号`}>{R`矩阵对易子 $[X_x,X_y]=X_z$，但直接计算诱导向量场的李括号得 $[X_x^\sharp,X_y^\sharp]=-X_z^\sharp$（例如 $X_x^\sharp=(0,-z,y)$、$X_y^\sharp=(z,0,-x)$ 代入 \eqref{5.49a} 得 $(y,-x,0)=-X_z^\sharp$ 的分量）。一般地，对左作用 $[V^\sharp,W^\sharp]=-[V,W]^\sharp$：$\sharp$ 是李代数的**反**同态。原因与 \eqref{5.132} 相同——左作用的流在群上对应右乘。量子力学里 $\hat L_i=-\mathrm{i}\hbar X_i^\sharp$ 满足 $[\hat L_x,\hat L_y]=\mathrm{i}\hbar\hat L_z$，符号正好由这个负号与 $(-\mathrm{i}\hbar)^2$ 共同决定。`}</Box>
      </Sub>

      <Sub n="5.7.4" title="The adjoint representation" zh="伴随表示">
        <Tx>{R`李群 $G$ 以一种特殊方式作用在 $G$ 自身上。`}</Tx>
        <Stmt id="D5.17">
          <Eq n="5.161" title="共轭作用" say={R`用 $a$ 共轭：$g\mapsto aga^{-1}$。它保持群的乘法，并把单位元留在原地。`}>{R`\mathrm{ad}_a:g\mapsto aga^{-1}.`}</Eq>
        </Stmt>
        <Exercise n="5.28" title={R`$\mathrm{ad}_a$ 是同态，也是 $G$ 在自身上的作用`} level="★"
          hint={R`在 $gh$ 中间插入 $a^{-1}a$。`}
          solution={R`**同态：**$\mathrm{ad}_a(gh)=agha^{-1}=(aga^{-1})(aha^{-1})=\mathrm{ad}_a(g)\,\mathrm{ad}_a(h)$。（它还是双射，逆为 $\mathrm{ad}_{a^{-1}}$，所以是自同构。）

**作用：**$\sigma(a,g)\equiv\mathrm{ad}_ag=aga^{-1}$ 由乘法与求逆复合而成，可微。$\sigma(e,g)=g$；$\sigma(a,\sigma(b,g))=a(bgb^{-1})a^{-1}=(ab)g(ab)^{-1}=\sigma(ab,g)$。满足 \eqref{5.141a}、\eqref{5.141b}。注意这个作用一般不可迁也不自由：$e$ 是所有 $\mathrm{ad}_a$ 的不动点，轨道是共轭类。`}>
          {R`证明 $\mathrm{ad}_a$ 是同态。定义映射 $\sigma:G\times G\to G$，$\sigma(a,g)\equiv\mathrm{ad}_ag$。证明 $\sigma(a,g)$ 是 $G$ 在自身上的作用。`}
        </Exercise>
        <Tx>{R`注意 $\mathrm{ad}_ae=e$，我们把诱导映射 $\mathrm{ad}_{a*}:T_gG\to T_{\mathrm{ad}_ag}G$ 限制在 $g=e$：`}</Tx>
        <Eq n="5.162" say={R`共轭作用固定单位元，所以它的微分把单位元处的切空间（李代数）映到自己。`}>{R`\mathrm{Ad}_a:T_eG\to T_eG`}</Eq>
        <Tx>{R`其中 $\mathrm{Ad}_a\equiv\mathrm{ad}_{a*}|_{T_eG}$。若把 $T_eG$ 等同于李代数 $\sym{lie}{\mathfrak{g}}$，就得到映射 $\mathrm{Ad}:G\times\sym{lie}{\mathfrak{g}}\to\sym{lie}{\mathfrak{g}}$，称为 $G$ 的**伴随映射**（adjoint map）。由于 $\mathrm{ad}_{a*}\mathrm{ad}_{b*}=\mathrm{ad}_{ab*}$（\eqref{5.34}），得到 $\mathrm{Ad}_a\mathrm{Ad}_b=\mathrm{Ad}_{ab}$。类似地，由 $\mathrm{ad}_{a^{-1}*}\mathrm{ad}_{a*}|_{T_eG}=\mathrm{id}_{T_eG}$ 得到 $\mathrm{Ad}_{a^{-1}}=\mathrm{Ad}_a^{-1}$。因此 $a\mapsto\mathrm{Ad}_a$ 是 $G$ 在向量空间 $\sym{lie}{\mathfrak{g}}$ 上的一个**表示**。

**矩阵群。**若 $G$ 是矩阵群，伴随表示就是简单的矩阵运算。设 $g\in G$，$X_V\in\sym{lie}{\mathfrak{g}}$，$\sigma_V(t)=\exp(tV)$ 是 $V\in T_eG$ 生成的单参数子群。则 $\mathrm{ad}_g$ 作用在 $\sigma_V(t)$ 上给出 $g\exp(tV)g^{-1}=\exp(tgVg^{-1})$（在指数级数中逐项用 $gV^kg^{-1}=(gVg^{-1})^k$）。至于 $\mathrm{Ad}_g$，有 $\mathrm{Ad}_g:V\mapsto gVg^{-1}$，因为`}</Tx>
        <Eq n="5.163" keyEq title="矩阵群的伴随表示" say={R`矩阵群中，伴随表示就是用群元对李代数矩阵做相似变换。`}>{R`\begin{aligned}\mathrm{Ad}_gV&=\left.\frac{\dd}{\dd t}[\mathrm{ad}_g\exp(tV)]\right|_{t=0}\\&=\left.\frac{\dd}{\dd t}\exp(tgVg^{-1})\right|_{t=0}=gVg^{-1}.\end{aligned}`}</Eq>
        <Box kind="physics" title="伴随表示在物理中">{R`(1) 对 $\mathrm{SU}(2)$，$\mathrm{Ad}_g$ 把 $\sym{lie}{\mathfrak{su}}(2)\cong\R^3$ 转动，给出 $\mathrm{SU}(2)\to\mathrm{SO}(3)$ 的二对一同态——与例 5.16(c) 的 $\mathrm{SL}(2,\C)\to\mathrm{O}^\uparrow_+(1,3)$ 同一个机制。(2) 规范理论中，场强在规范变换下 $F\mapsto gFg^{-1}$，规范玻色子（胶子）属于规范群的伴随表示，数目 $=\dim\sym{lie}{\mathfrak{g}}$（$\mathrm{SU}(3)$：8 个胶子）。(3) $\mathrm{Ad}$ 在 $e$ 处的微分是 $\mathrm{ad}_V(W)=[V,W]$，Jacobi 恒等式恰好说明它是李代数的表示。`}</Box>
      </Sub>
    </Sec>);
}
