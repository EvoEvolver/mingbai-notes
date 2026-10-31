// 引言 + §7.1 Riemann 流形与伪 Riemann 流形 —— 式 (7.1a)–(7.7)，定义 7.1，习题 7.1–7.2
import { Sec, Sub, Tx, Eq, Box, Stmt, Exercise, C } from "@kit";

const R = String.raw;

export function Intro() {
  return (
    <Tx>{R`**本章在做什么。**第 5 章的流形只告诉我们"哪些点挨着哪些点、怎样光滑地换坐标"，却不能回答最朴素的几何问题：一条曲线有多长？两个向量夹角多大？在 $p$ 点的向量与 $p'$ 点的向量是否"平行"？要回答前两个问题，需要在每个切空间 $T_pM$ 上放一个内积——**度规张量**（metric tensor），它是 $\R^m$ 中内积的自然推广。要回答第三个问题，需要一种把向量从一点"搬运"到另一点的规则——**联络**（connection）。

本章的主线是：度规 → 联络（平行移动、协变导数、测地线）→ 联络的两个张量性"缺陷"：挠率与曲率 → 度规唯一地决定一个无挠联络（Levi-Civita 联络，\sref{T7.1}）→ 曲率的整体效应（和乐）、对称性（等距、Killing 向量）→ 非坐标基与 Cartan 结构方程 → 有了度规之后的微分形式（Hodge 星、Laplace 算子、Hodge 定理）→ 物理应用：广义相对论的 Einstein–Hilbert 作用量、弯曲时空中的旋量、弦的 Polyakov 作用量。

原书推荐的参考书：面向物理学者的 Choquet-Bruhat 等（1982）、Dodson 与 Poston（1977）、Hicks（1965），以及 Lightman 等（1975）与 Wald（1984）第 3 章。`}</Tx>);
}

export function Sec71() {
  return (
    <Sec n="7.1" title="Riemannian manifolds and pseudo-Riemannian manifolds" zh="Riemann 流形与伪 Riemann 流形"
      gist={R`在每个切空间上放一个对称、非退化的双线性型 $g_p$（\sref{D7.1}）→ 分量 $g_{\mu\nu}$、逆矩阵 $g^{\mu\nu}$，升降指标 \eqref{7.2} → 线元 $\dd s^2=g_{\mu\nu}\dd x^\mu\dd x^\nu$ → 指标与 Lorentz 度规、类空/类光/类时 → 子流形上的诱导度规 $f^*g_N$。`}
      why={R`流形本身没有长度与角度。度规是本章一切构造（联络、曲率、体积元、Hodge 星、作用量）的唯一原料。`}
      gives={["7.1a", "7.1b", "7.2", "7.3", "7.4", "7.5", "7.6", "7.7"]}>
      <p className="muted">本节概念：<C id="metric" /></p>
      <Sub n="7.1.1" title="Metric tensors" zh="度规张量">
        <Tx>{R`初等几何中，两个向量 $U$、$V$ 的内积定义为 $U\cdot V=\sum_{i=1}^mU_iV_i$，$U_i,V_i$ 是它们在 $\R^m$ 中的分量。在流形上，内积要在**每个切空间** $T_pM$ 上分别定义——不同点的切空间互不相同，没有一个"全局的 $\R^m$"可用。`}</Tx>
        <Stmt id="D7.1" />
        <Tx>{R`**度规给出 $T_pM\cong T_p^*M$。**第 5 章中，向量 $V\in T_pM$ 与对偶向量 $\omega\in T^*_pM$ 的内积是映射 $\langle\ ,\ \rangle:T^*_pM\times T_pM\to\R$——没有度规时，两个**向量**之间没有内积。有了度规 $g$，就用 $g_p(U,V)$ 定义 $U,V\in T_pM$ 的内积。由于 $g_p$ 是映射 $T_pM\otimes T_pM\to\R$，把第一个槽位填上 $U$，得到线性映射 $g_p(U,\ ):T_pM\to\R$，$V\mapsto g_p(U,V)$——它就是一个一形式 $\omega_U\in T_p^*M$。反过来，$\omega\in T^*_pM$ 通过 $\langle\omega,U\rangle=g(V_\omega,U)$ 诱导出向量 $V_\omega\in T_pM$（非退化性保证 $V_\omega$ 存在唯一）。于是度规 $g_p$ 给出 $T_pM$ 与 $T_p^*M$ 之间的同构。

**坐标分量。**设 $(U,\varphi)$ 是 $M$ 的卡，坐标为 $\{x^\mu\}$。由于 $g\in\mathcal{T}^0_2(M)$，可以按 $\dd x^\mu\otimes\dd x^\nu$ 展开：`}</Tx>
        <Eq n="7.1a" say={R`度规在坐标中就是一个对称矩阵 $g_{\mu\nu}(p)$，每点一个，作为两个坐标一形式张量积的系数。`}>{R`g_p=g_{\mu\nu}(p)\,\dd x^\mu\otimes\dd x^\nu.`}</Eq>
        <Tx>{R`容易验证（把两个坐标基向量喂给 $g_p$，用 $\langle\dd x^\mu,\partial_\nu\rangle=\delta^\mu_\nu$）`}</Tx>
        <Eq n="7.1b" say={R`度规分量就是坐标基向量两两之间的内积，因而关于两个指标对称。`}>{R`g_{\mu\nu}(p)=g_p\left(\frac{\partial}{\partial x^\mu},\frac{\partial}{\partial x^\nu}\right)=g_{\nu\mu}(p)\qquad(p\in M).`}</Eq>
        <Tx>{R`不会引起混淆时，$g_{\mu\nu}$ 中的 $p$ 通常省略。习惯上把 $(g_{\mu\nu})$ 看作第 $(\mu,\nu)$ 个元素为 $g_{\mu\nu}$ 的矩阵。非退化性意味着 $(g_{\mu\nu})$ 满秩，所以有逆矩阵，按传统记作 $(g^{\mu\nu})$：$g_{\mu\nu}g^{\nu\lambda}=g^{\lambda\nu}g_{\nu\mu}=\delta^\lambda_\mu$。行列式 $\det(g_{\mu\nu})$ 记作 $g$，显然 $\det(g^{\mu\nu})=g^{-1}$。于是 $T_pM$ 与 $T^*_pM$ 之间的同构写作`}</Tx>
        <Eq n="7.2" keyEq title="升降指标" say={R`度规把向量的上指标"降"成一形式的下指标，逆度规再把它"升"回来：这就是物理书里随手升降指标的数学含义。`}>{R`\omega_\mu=g_{\mu\nu}U^\nu,\qquad U^\mu=g^{\mu\nu}\omega_\nu.`}</Eq>
        <Tx>{R`**"老式"定义：线元。**由 \eqref{7.1a}、\eqref{7.1b} 可以回到把度规看作"无穷小距离平方"的旧定义。取无穷小位移 $\dd x^\mu\,\partial/\partial x^\mu\in T_pM$，代入 $g$：`}</Tx>
        <Eq n="7.3" keyEq title="线元" say={R`把一小段位移喂给度规两次，得到这段位移长度的平方：$\dd s^2=g_{\mu\nu}\dd x^\mu\dd x^\nu$，弯曲空间里的勾股定理。`}>{R`\begin{aligned}\dd s^2&=g\left(\dd x^\mu\frac{\partial}{\partial x^\mu},\dd x^\nu\frac{\partial}{\partial x^\nu}\right)=\dd x^\mu\dd x^\nu\,g\left(\frac{\partial}{\partial x^\mu},\frac{\partial}{\partial x^\nu}\right)\\&=g_{\mu\nu}\,\dd x^\mu\,\dd x^\nu.\end{aligned}`}</Eq>
        <Tx>{R`我们也把 $\dd s^2=g_{\mu\nu}\dd x^\mu\dd x^\nu$ 称作度规，尽管严格说来度规是**张量** $g=g_{\mu\nu}\dd x^\mu\otimes\dd x^\nu$。

**指标。**$(g_{\mu\nu})$ 是实对称矩阵，特征值都是实数。若 $g$ 是 Riemann 度规，所有特征值严格为正；若是伪 Riemann 度规，有些可以为负。若有 $i$ 个正特征值、$j$ 个负特征值，数对 $(i,j)$ 称为度规的**指标**（index）。$j=1$ 时称为 **Lorentz 度规**。用适当的正交矩阵把度规对角化后，再用正数重新标度基向量，就能把对角元都化成 $\pm1$：从 Riemann 度规出发得到**欧氏度规** $\delta=\mathrm{diag}(1,\ldots,1)$，从 Lorentz 度规出发得到 **Minkowski 度规** $\eta=\mathrm{diag}(-1,1,\ldots,1)$。（指标不随点变化：$g$ 光滑且处处非退化，特征值不能连续地穿过零。）

若 $(M,g)$ 是 Lorentz 流形，$T_pM$ 的元素分成三类：`}</Tx>
        <Eq n="7.4" say={R`在 Lorentz 度规下，向量的"长度平方"可正可负可零：正的是类空（空间方向），零的是类光（光走的方向），负的是类时（有质量粒子的世界线方向）。`}>{R`\begin{aligned}&\text{(i)}\quad g(U,U)>0\longrightarrow U\text{ 是类空的（spacelike）},\\&\text{(ii)}\quad g(U,U)=0\longrightarrow U\text{ 是类光的（lightlike，或零向量 null）},\\&\text{(iii)}\quad g(U,U)<0\longrightarrow U\text{ 是类时的（timelike）}.\end{aligned}`}</Eq>
        <Exercise n="7.1" title="光锥标架" level="★"
          hint={R`矩阵左上角的 $2\times2$ 块 $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ 的特征值是 $\pm1$。直接计算 $g(e_\pm,e_\pm)$ 与 $g(e_+,e_-)$。一形式分量用 \eqref{7.2}：$V_\mu=g_{\mu\nu}V^\nu$。`}
          solution={R`**对角化。**左上角块 $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ 的特征值为 $+1$、$-1$，归一化特征向量分别为 $(1,1)/\sqrt2$、$(1,-1)/\sqrt2$。用正交矩阵 $O=\begin{pmatrix}1/\sqrt2&1/\sqrt2\\1/\sqrt2&-1/\sqrt2\end{pmatrix}\oplus I_2$ 作合同变换 $O^{\mathrm t}gO=\mathrm{diag}(1,-1,1,1)$，交换前两个基向量即得 $\eta=\mathrm{diag}(-1,1,1,1)$。指标为 $(3,1)$，是 Lorentz 度规。

**光锥标架。**在 Minkowski 标架中 $g(e_\mu,e_\nu)=\eta_{\mu\nu}$。令 $e_\pm=(e_1\pm e_0)/\sqrt2$：

$$g(e_+,e_+)=\tfrac12(\eta_{11}+2\eta_{10}+\eta_{00})=\tfrac12(1+0-1)=0,\qquad g(e_-,e_-)=0,$$

$$g(e_+,e_-)=\tfrac12(\eta_{11}-\eta_{00})=\tfrac12(1+1)=1,$$

而 $e_\pm$ 与 $e_2,e_3$ 正交、$g(e_2,e_2)=g(e_3,e_3)=1$。所以在基 $\{e_+,e_-,e_2,e_3\}$ 中度规矩阵恰为题中的矩阵；$e_\pm$ 本身是类光向量（"光锥坐标"之名由此而来）。

**对应的一形式。**由 \eqref{7.2}，$V_\mu=g_{\mu\nu}V^\nu$：

$$V_+=g_{+-}V^-=V^-,\qquad V_-=g_{-+}V^+=V^+,\qquad V_2=V^2,\qquad V_3=V^3.$$

即一形式的分量为 $(V_+,V_-,V_2,V_3)=(V^-,V^+,V^2,V^3)$：降指标时 $+$ 与 $-$ 互换。由此 $g(V,V)=V_\mu V^\mu=2V^+V^-+(V^2)^2+(V^3)^2$。`}>
          {R`把度规

$$(g_{\mu\nu})=\begin{pmatrix}0&1&0&0\\1&0&0&0\\0&0&1&0\\0&0&0&1\end{pmatrix}$$

对角化，说明它可以化为 Minkowski 度规。使度规取这种形式的标架称为**光锥标架**（light cone frame）。设 $\{e_0,e_1,e_2,e_3\}$ 是 Minkowski 标架的基，其中 $g_{\mu\nu}=\eta_{\mu\nu}$。证明 $\{e_+,e_-,e_2,e_3\}$ 是光锥标架的基向量，其中 $e_\pm\equiv(e_1\pm e_0)/\sqrt2$。设 $V=(V^+,V^-,V^2,V^3)$ 是向量 $V$ 的分量，求对应一形式的分量。`}
        </Exercise>
        <Tx>{R`若光滑流形 $M$ 带有 Riemann 度规 $g$，数对 $(M,g)$ 称为 **Riemann 流形**；若 $g$ 是伪 Riemann 度规，称为**伪 Riemann 流形**；若 $g$ 是 Lorentz 度规，称为 **Lorentz 流形**。Lorentz 流形是相对论特别关心的对象。例如 $m$ 维欧氏空间 $(\R^m,\delta)$ 是 Riemann 流形，$m$ 维 Minkowski 空间 $(\R^m,\eta)$ 是 Lorentz 流形。`}</Tx>
      </Sub>

      <Sub n="7.1.2" title="Induced metric" zh="诱导度规">
        <Tx>{R`**问题：**$\R^3$ 中的球面、环面为什么"天然"有度规？答案是从外面继承来的。设 $M$ 是 $n$ 维 Riemann 流形 $N$（度规 $g_N$）的 $m$ 维子流形。若 $f:M\to N$ 是诱导出 $M$ 的子流形结构的嵌入（\sref{D5.3}），拉回 $f^*$ 在 $M$ 上诱导出自然的度规 $g_M=f^*g_N$。$g_M$ 的分量为`}</Tx>
        <Eq n="7.5" keyEq title="诱导度规" say={R`子流形上两点的距离按外面的空间来量：把外部度规用嵌入映射的 Jacobi 矩阵拉回来。`}>{R`g_{M\mu\nu}(x)=g_{N\alpha\beta}(f(x))\frac{\partial f^\alpha}{\partial x^\mu}\frac{\partial f^\beta}{\partial x^\nu}`}</Eq>
        <Tx>{R`其中 $f^\alpha$ 是 $f(x)$ 的坐标——这就是拉回的分量公式 \eqref{5.37} 作用在 $(0,2)$ 型张量上。例如考虑嵌入 $(\R^3,\delta)$ 的单位球面。令 $(\theta,\phi)$ 为 $S^2$ 的极坐标，$f$ 为通常的包含映射

$$f:(\theta,\phi)\mapsto(\sin\theta\cos\phi,\sin\theta\sin\phi,\cos\theta),$$

于是 $\partial_\theta f=(\cos\theta\cos\phi,\cos\theta\sin\phi,-\sin\theta)$，$\partial_\phi f=(-\sin\theta\sin\phi,\sin\theta\cos\phi,0)$，两者正交，长度平方分别为 $1$ 与 $\sin^2\theta$。由此得**诱导度规**（induced metric）`}</Tx>
        <Eq n="7.6" keyEq title="球面的度规" say={R`单位球面从 $\R^3$ 继承的度规：沿经线走 $\dd\theta$ 的长度就是 $\dd\theta$，沿纬线走 $\dd\phi$ 的长度要乘纬圈半径 $\sin\theta$。`}>{R`\begin{aligned}g_{\mu\nu}\,\dd x^\mu\otimes\dd x^\nu&=\delta_{\alpha\beta}\frac{\partial f^\alpha}{\partial x^\mu}\frac{\partial f^\beta}{\partial x^\nu}\dd x^\mu\otimes\dd x^\nu\\&=\dd\theta\otimes\dd\theta+\sin^2\theta\,\dd\phi\otimes\dd\phi.\end{aligned}`}</Eq>
        <Exercise n="7.2" title="环面的诱导度规" level="★"
          hint={R`计算 $\partial_\theta f$ 与 $\partial_\phi f$，再代入 \eqref{7.5}：$g_{\theta\theta}=|\partial_\theta f|^2$，$g_{\theta\phi}=\partial_\theta f\cdot\partial_\phi f$，$g_{\phi\phi}=|\partial_\phi f|^2$。`}
          solution={R`$$\partial_\theta f=(-r\sin\theta\cos\phi,\ -r\sin\theta\sin\phi,\ r\cos\theta),\qquad\partial_\phi f=(-(R+r\cos\theta)\sin\phi,\ (R+r\cos\theta)\cos\phi,\ 0).$$

于是

$$g_{\theta\theta}=r^2\sin^2\theta(\cos^2\phi+\sin^2\phi)+r^2\cos^2\theta=r^2,$$

$$g_{\theta\phi}=r\sin\theta(R+r\cos\theta)(\cos\phi\sin\phi-\sin\phi\cos\phi)+0=0,$$

$$g_{\phi\phi}=(R+r\cos\theta)^2(\sin^2\phi+\cos^2\phi)=(R+r\cos\theta)^2,$$

即 \eqref{7.7}。条件 $R>r$ 保证 $R+r\cos\theta>0$，$f$ 是嵌入（没有自交）且度规处处非退化。几何意义：$\theta$ 绕管子走一圈（半径 $r$），$\phi$ 绕对称轴走一圈（半径 $R+r\cos\theta$，外侧大、内侧小）。交互图 3 可以用这个度规算出 Gauss 曲率 $K=\cos\theta/[r(R+r\cos\theta)]$：外侧为正（像球面），内侧为负（像马鞍）。`}>
          {R`设 $f:T^2\to\R^3$ 是环面到 $(\R^3,\delta)$ 的嵌入：

$$f:(\theta,\phi)\mapsto((R+r\cos\theta)\cos\phi,\ (R+r\cos\theta)\sin\phi,\ r\sin\theta),$$

其中 $R>r$。证明 $T^2$ 上的诱导度规为`}
        </Exercise>
        <Eq n="7.7" say={R`环面的诱导度规：绕管子方向的周长处处是 $2\pi r$，绕大圈方向的周长随 $\theta$ 变——外圈长、内圈短。`}>{R`g=r^2\,\dd\theta\otimes\dd\theta+(R+r\cos\theta)^2\,\dd\phi\otimes\dd\phi.`}</Eq>
        <Tx>{R`若 $N$ 是伪 Riemann 流形，它的子流形 $f:M\to N$ 上的 $f^*g_N$ 不一定是度规：$f^*g_N$ 只有在 $M$ 上具有**固定指标**（特别地处处非退化）时才是度规。例如 Minkowski 平面中一条曲线，若它在某处由类时变为类空，中间必经过类光点，那里诱导的"度规" $f^*\eta$ 为零。`}</Tx>
      </Sub>
    </Sec>);
}
