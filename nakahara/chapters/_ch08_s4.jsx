// §8.4 Hermite 流形与 Hermite 微分几何 —— 式 (8.47)–(8.79)，定理 8.2–8.4，引理 8.1，命题 8.2，习题 8.7
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, C } from "@kit";

const R = String.raw;

export function Sec84() {
  return (
    <Sec n="8.4" title="Hermitian manifolds and Hermitian differential geometry" zh="Hermite 流形与 Hermite 微分几何"
      gist={R`度规复线性延拓，按复基取分量 \eqref{8.48a}–\eqref{8.48d} → Hermite 度规 $g(JX,JY)=g(X,Y)$（总存在，\sref{T8.2}），只剩混合分量 $g_{\mu\bar\nu}$ → Kähler 形式 $\Omega=\mathrm{i}g_{\mu\bar\nu}\dd z^\mu\wedge\dd\bar z^\nu$，实的 $(1,1)$ 形式，$\Omega^m$ 处处非零 ⇒ 复流形可定向（\sref{L8.1}、\sref{T8.3}）→ Hermite 联络 $\Gamma^\lambda{}_{\kappa\mu}=g^{\bar\nu\lambda}\partial_\kappa g_{\mu\bar\nu}$，$\nabla J=0$（\sref{T8.4}）→ 挠率与曲率：只剩 $R^\kappa{}_{\lambda\bar\mu\nu}=\partial_{\bar\mu}(g^{\bar\xi\kappa}\partial_\nu g_{\lambda\bar\xi})$ → Ricci 形式 $\sym{ricf}{\mathfrak{R}}=\mathrm{i}\bar\partial\partial\log G$ 与第一陈类，后者与度规无关（\sref{P8.2}）。`}
      why={R`要在复流形上做 Riemann 几何，度规必须与复结构相容（$J$ 是等距），联络必须保持全纯与反全纯向量不混合。这样得到的几何量自动按 $(r,s)$ 分级，曲率只剩一类分量，Ricci 曲率变成一个闭二形式——它的上同调类是拓扑不变量（第一陈类），这是 Calabi–Yau 条件的出发点。`}
      gives={["8.47", "8.50", "8.52", "8.53", "8.55", "8.57", "8.58", "8.62a", "8.69", "8.70", "8.73a", "8.75a", "8.78", "8.79"]}>
      <p className="muted">本节概念：<C id="hermitian" /> · <C id="kahler_form" /> · <C id="chern1" /></p>
      <Tx>{R`设 $M$ 是复流形，$\dim_\C M=m$，$g$ 是把 $M$ 看作微分流形时的 Riemann 度规。取 $Z=X+\mathrm{i}Y$、$W=U+\mathrm{i}V\in T_pM^\C$，把 $g$ 延拓为`}</Tx>
      <Eq n="8.47" say={R`把度规 $\C$ 双线性地（不是共轭线性地）延拓到复向量上：按复数乘法展开实部与虚部。`}>{R`g_p(Z,W)=g_p(X,U)-g_p(Y,V)+\mathrm{i}[g_p(X,V)+g_p(Y,U)].`}</Eq>
      <Tx>{R`$g$ 在基 \eqref{8.13a}、\eqref{8.13b} 下的分量为`}</Tx>
      <Eq n="8.48a" say={R`两个全纯基向量之间的度规分量。`}>{R`g_{\mu\nu}(p)=g_p(\partial/\partial z^\mu,\partial/\partial z^\nu)`}</Eq>
      <Eq n="8.48b" say={R`全纯与反全纯基向量之间的度规分量——Hermite 度规唯一的非零分量。`}>{R`g_{\mu\bar\nu}(p)=g_p(\partial/\partial z^\mu,\partial/\partial\bar z^\nu)`}</Eq>
      <Eq n="8.48c" say={R`反全纯与全纯基向量之间的分量。`}>{R`g_{\bar\mu\nu}(p)=g_p(\partial/\partial\bar z^\mu,\partial/\partial z^\nu)`}</Eq>
      <Eq n="8.48d" say={R`两个反全纯基向量之间的分量。`}>{R`g_{\bar\mu\bar\nu}(p)=g_p(\partial/\partial\bar z^\mu,\partial/\partial\bar z^\nu).`}</Eq>
      <Tx>{R`容易验证（由 $g$ 对称、实，以及 \eqref{8.30} 型的共轭关系 $\nosym{\overline{g(Z,W)}}=g(\overline Z,\overline W)$）`}</Tx>
      <Eq n="8.49" say={R`度规分量的对称性与共轭关系：交换两个参数不变；取复共轭等于把所有指标的"有杠/无杠"互换。`}>{R`g_{\mu\nu}=g_{\nu\mu},\quad g_{\bar\mu\bar\nu}=g_{\bar\nu\bar\mu},\quad g_{\bar\mu\nu}=g_{\nu\bar\mu},\quad\overline{g}_{\mu\bar\nu}=g_{\bar\mu\nu},\quad\overline{g}_{\mu\nu}=g_{\bar\mu\bar\nu}.`}</Eq>

      <Sub n="8.4.1" title="The Hermitian metric" zh="Hermite 度规">
        <Tx>{R`若复流形 $M$ 的 Riemann 度规 $g$ 满足`}</Tx>
        <Eq n="8.50" keyEq title="Hermite 度规" say={R`殆复结构 $J$ 是度规的等距：在每个复平面里转 $90^\circ$ 不改变长度与夹角。`}>{R`g_p(J_pX,J_pY)=g_p(X,Y)`}</Eq>
        <Tx>{R`（对每点 $p\in M$ 与任意 $X,Y\in T_pM$），则称 $g$ 为 **Hermite 度规**，$(M,g)$ 称为 **Hermite 流形**。关于 Hermite 度规，向量 $J_pX$ 与 $X$ 正交：`}</Tx>
        <Eq n="8.51" say={R`把向量转 $90^\circ$ 后与原向量正交——正如复平面上 $\mathrm{i}z$ 与 $z$ 垂直。`}>{R`g_p(J_pX,X)=g_p(J_p^2X,J_pX)=-g_p(J_pX,X)=0.`}</Eq>
        <Stmt id="T8.2">
          <Proof steps={[
            { claim: R`设 $g$ 是复流形 $M$ 的任一 Riemann 度规（复流形是微分流形，Riemann 度规总存在——用单位分解把各卡上的欧氏度规拼起来）。定义新度规`, tex: R`\hat g_p(X,Y)\equiv\tfrac12[g_p(X,Y)+g_p(J_pX,J_pY)]`, uses: ["8.52"] },
            { claim: R`显然 $\hat g_p(J_pX,J_pY)=\frac12[g_p(JX,JY)+g_p(J^2X,J^2Y)]=\frac12[g_p(JX,JY)+g_p(X,Y)]=\hat g_p(X,Y)$。`, uses: ["8.17"], why: R`$J^2X=-X$，两个负号相消。`, fill: true },
            { claim: R`若 $g$ 正定，$\hat g$ 也正定：$\hat g(X,X)=\frac12[g(X,X)+g(JX,JX)]>0$（$X\neq0$）。$\hat g$ 显然对称、光滑。所以 $\hat g$ 是 $M$ 上的 Hermite 度规。` },
          ]} />
        </Stmt>
        <Eq n="8.52" say={R`对 $J$ 求平均：把任意度规与它被 $J$ 转过之后的版本取平均，就得到 $J$ 不变的度规。`}>{R`\hat g_p(X,Y)\equiv\tfrac12[g_p(X,Y)+g_p(J_pX,J_pY)].`}</Eq>
        <Tx>{R`设 $g$ 是复流形 $M$ 上的 Hermite 度规。由 \eqref{8.50} 与 \eqref{8.20}，

$$g_{\mu\nu}=g\left(\frac{\partial}{\partial z^\mu},\frac{\partial}{\partial z^\nu}\right)=g\left(J\frac{\partial}{\partial z^\mu},J\frac{\partial}{\partial z^\nu}\right)=\mathrm{i}^2g\left(\frac{\partial}{\partial z^\mu},\frac{\partial}{\partial z^\nu}\right)=-g_{\mu\nu},$$

所以 $g_{\mu\nu}=0$。（\eqref{8.50} 对实向量成立，复线性延拓后对复向量也成立。）同样 $g_{\bar\mu\bar\nu}=0$。于是 Hermite 度规取形式`}</Tx>
        <Eq n="8.53" keyEq title="Hermite 度规的复形式" say={R`Hermite 度规只把全纯方向与反全纯方向配对：$\dd z\otimes\dd\bar z$ 型的项，没有 $\dd z\otimes\dd z$ 型的项。`}>{R`g=g_{\mu\bar\nu}\dd z^\mu\otimes\dd\bar z^\nu+g_{\bar\mu\nu}\dd\bar z^\mu\otimes\dd z^\nu.`}</Eq>
        <Tx>{R`［**注：**取 $X,Y\in T_pM^+$，在 $T_pM^+$ 中定义内积 $h_p$：`}</Tx>
        <Eq n="8.54" say={R`在全纯切空间上，用度规与"第二个向量取共轭"定义的内积是正定 Hermite 型——这就是"Hermite 度规"名称的由来。`}>{R`h_p(X,Y)\equiv g_p(X,\overline Y).`}</Eq>
        <Tx>{R`容易看出 $h_p$ 是 $T_pM^+$ 上的正定 Hermite 型。事实上，

$$\nosym{\overline{h(X,Y)}}=\nosym{\overline{g(X,\overline Y)}}=g(\overline X,Y)=h(Y,X),$$

且对 $X=X_1+\mathrm{i}X_2$，$h(X,X)=g(X,\overline X)=g(X_1,X_1)+g(X_2,X_2)\ge0$（交叉项 $\mathrm{i}[g(X_2,X_1)-g(X_1,X_2)]$ 因对称性相消）。这就是满足 \eqref{8.50} 的度规被称为 *Hermite* 度规的原因。］在分量中 $h(X,Y)=g_{\mu\bar\nu}X^\mu\overline{Y}^\nu$：矩阵 $(g_{\mu\bar\nu})$ 是正定 Hermite 矩阵。例如 $\C^m$ 的欧氏度规给出 $g_{\mu\bar\nu}=\frac12\delta_{\mu\nu}$（例 8.6）。`}</Tx>
      </Sub>

      <Sub n="8.4.2" title="Kähler form" zh="Kähler 形式">
        <Tx>{R`设 $(M,g)$ 是 Hermite 流形。定义张量场 $\Omega$，其在 $X,Y\in T_pM$ 上的作用为`}</Tx>
        <Eq n="8.55" keyEq title="Kähler 形式" say={R`Kähler 形式 = 先把第一个向量转 $90^\circ$ 再与第二个向量求内积：它把度规与复结构合成一个反对称的二形式。`}>{R`\Omega_p(X,Y)=g_p(J_pX,Y)\qquad X,Y\in T_pM.`}</Eq>
        <Tx>{R`注意 $\Omega$ 是反对称的：$\Omega(X,Y)=g(JX,Y)=g(J^2X,JY)=-g(JY,X)=-\Omega(Y,X)$。因此 $\Omega$ 定义了一个二形式，称为 Hermite 度规 $g$ 的 **Kähler 形式**。$\Omega$ 在 $J$ 的作用下不变：`}</Tx>
        <Eq n="8.56" say={R`同时转动两个参数，Kähler 形式不变——这等价于它是 $(1,1)$ 型的。`}>{R`\Omega(JX,JY)=g(J^2X,JY)=g(J^3X,J^2Y)=\Omega(X,Y).`}</Eq>
        <Tx>{R`把定义域从 $T_pM$ 延拓到 $T_pM^\C$，$\Omega$ 是双次为 $(1,1)$ 的二形式。事实上，对度规 \eqref{8.53}，

$$\Omega\left(\frac{\partial}{\partial z^\mu},\frac{\partial}{\partial z^\nu}\right)=g\left(J\frac{\partial}{\partial z^\mu},\frac{\partial}{\partial z^\nu}\right)=\mathrm{i}g_{\mu\nu}=0.$$

又有

$$\Omega\left(\frac{\partial}{\partial\bar z^\mu},\frac{\partial}{\partial\bar z^\nu}\right)=0,\qquad\Omega\left(\frac{\partial}{\partial z^\mu},\frac{\partial}{\partial\bar z^\nu}\right)=\mathrm{i}g_{\mu\bar\nu}=-\Omega\left(\frac{\partial}{\partial\bar z^\nu},\frac{\partial}{\partial z^\mu}\right).$$

所以 $\Omega$ 的分量为`}</Tx>
        <Eq n="8.57" say={R`Kähler 形式只有混合分量，等于度规的混合分量乘以 $\mathrm{i}$。`}>{R`\Omega_{\mu\nu}=\Omega_{\bar\mu\bar\nu}=0\qquad\Omega_{\mu\bar\nu}=-\Omega_{\bar\nu\mu}=\mathrm{i}g_{\mu\bar\nu}.`}</Eq>
        <Tx>{R`可以写成`}</Tx>
        <Eq n="8.58" keyEq title="Kähler 形式的坐标表达" say={R`Kähler 形式 = $\mathrm{i}$ 乘度规矩阵，夹在 $\dd z$ 与 $\dd\bar z$ 的楔积之间。`}>{R`\Omega=\mathrm{i}g_{\mu\bar\nu}\,\dd z^\mu\otimes\dd\bar z^\nu-\mathrm{i}g_{\bar\nu\mu}\,\dd\bar z^\nu\otimes\dd z^\mu=\mathrm{i}g_{\mu\bar\nu}\,\dd z^\mu\wedge\dd\bar z^\nu.`}</Eq>
        <Tx>{R`$\Omega$ 也可以写成`}</Tx>
        <Eq n="8.59" say={R`用降了指标的殆复结构 $J_{\mu\bar\nu}=-\mathrm{i}g_{\mu\bar\nu}$ 表示 Kähler 形式。`}>{R`\Omega=-J_{\mu\bar\nu}\,\dd z^\mu\wedge\dd\bar z^\nu`}</Eq>
        <Tx>{R`其中 $J_{\mu\bar\nu}=g_{\mu\bar\lambda}J^{\bar\lambda}{}_{\bar\nu}=-\mathrm{i}g_{\mu\bar\nu}$（由 \eqref{8.22}，$J^{\bar\lambda}{}_{\bar\nu}=-\mathrm{i}\delta^{\bar\lambda}{}_{\bar\nu}$）。$\Omega$ 是实形式：`}</Tx>
        <Eq n="8.60" say={R`Kähler 形式等于自己的复共轭：它是一个实二形式。`}>{R`\overline\Omega=-\mathrm{i}\,\overline{g}_{\mu\bar\nu}\,\dd\bar z^\mu\wedge\dd z^\nu=\mathrm{i}g_{\nu\bar\mu}\,\dd z^\nu\wedge\dd\bar z^\mu=\Omega.`}</Eq>
        <Tx>{R`（第二个等号用 \eqref{8.49} 的 $\overline{g}_{\mu\bar\nu}=g_{\bar\mu\nu}=g_{\nu\bar\mu}$ 并交换楔积因子。）

**可定向性。**利用 Kähler 形式，证明任何 Hermite 流形——从而任何复流形（\sref{T8.2}）——都是可定向的。首先注意可以选取正交归一基 $\{\hat e_1,J\hat e_1,\ldots,\hat e_m,J\hat e_m\}$。事实上，若 $g(\hat e_1,\hat e_1)=1$，则 $g(J\hat e_1,J\hat e_1)=g(\hat e_1,\hat e_1)=1$，$g(\hat e_1,J\hat e_1)=-g(J\hat e_1,\hat e_1)=0$。于是 $\hat e_1$ 与 $J\hat e_1$ 构成一个二维子空间的正交归一基。再取与 $\hat e_1$、$J\hat e_1$ 正交的单位向量 $\hat e_2$，构成子空间 $\{\hat e_2,J\hat e_2\}$（$J\hat e_2$ 也与 $\hat e_1,J\hat e_1$ 正交：$g(J\hat e_2,\hat e_1)=-g(\hat e_2,J\hat e_1)=0$，$g(J\hat e_2,J\hat e_1)=g(\hat e_2,\hat e_1)=0$）。重复这一过程，得到正交归一基 $\{\hat e_1,J\hat e_1,\ldots,\hat e_m,J\hat e_m\}$。`}</Tx>
        <Stmt id="L8.1">
          <Proof steps={[
            { claim: R`对上面的正交归一基，`, tex: R`\Omega(\hat e_i,J\hat e_j)=g(J\hat e_i,J\hat e_j)=\delta_{ij}\qquad\Omega(\hat e_i,\hat e_j)=\Omega(J\hat e_i,J\hat e_j)=0`, uses: ["8.55", "8.56"], why: R`$\Omega(\hat e_i,\hat e_j)=g(J\hat e_i,\hat e_j)=0$ 由基的构造；第二个等号用 \eqref{8.56}。` },
            { claim: R`于是在 $2m$ 个基向量上求值时，按 \eqref{5.65} 展开 $m$ 重外积，只有把每个 $\Omega$ 喂给一对 $(\hat e_i,J\hat e_i)$ 的项不为零：`, tex: R`\begin{aligned}\underbrace{\Omega\wedge\ldots\wedge\Omega}_{m}(\hat e_1,J\hat e_1,\ldots,\hat e_m,J\hat e_m)&=\sum_P\Omega(\hat e_{P(1)},J\hat e_{P(1)})\ldots\Omega(\hat e_{P(m)},J\hat e_{P(m)})\\&=m!\,\Omega(\hat e_1,J\hat e_1)\ldots\Omega(\hat e_m,J\hat e_m)=m!\end{aligned}`, why: R`$P$ 是 $m$ 个对象的置换群的元素。按 \eqref{5.65}，$\Omega^{\wedge m}$ 在 $2m$ 个向量上的值是对 $S_{2m}$ 带符号求和再除以 $(2!)^m$。非零项必须把每对 $(\hat e_i,J\hat e_i)$ 整体喂给同一个 $\Omega$：先把 $m$ 对整体排列（$m!$ 种，整对移动是偶置换），再在每对内部决定次序（$2^m$ 种，交换一次置换号变号、$\Omega$ 也变号，乘积不变）。共 $m!\,2^m$ 项，每项为 $+1$，除以 $2^m$ 得 $m!$。` },
            { claim: R`所以 $\Omega^m$ 在任何点都不为零。` },
          ]} />
        </Stmt>
        <Tx>{R`由于实 $2m$ 形式 $\Omega\wedge\ldots\wedge\Omega$ 处处不为零，它可以作为体积元（§5.5）。于是得到下面的定理。`}</Tx>
        <Stmt id="T8.3" />
        <Box kind="note" title="另一个证明：全纯 Jacobi 行列式总是正的">{R`不用度规也能看出 \sref{T8.3}：全纯坐标变换 $w=w(z)$ 的实 Jacobi 矩阵是复 Jacobi 矩阵 $A=\partial w/\partial z$ 的"实化"，其行列式 $=|\det A|^2>0$（$m=1$ 时 $\det\begin{pmatrix}a&-b\\ b&a\end{pmatrix}=a^2+b^2$）。所以以 $(x^1,y^1,\ldots,x^m,y^m)$ 为正向的全纯图册是定向图册（定义见 §5.5）。这也解释了例 8.1 中为什么必须翻转南极卡的 $V$ 轴。`}</Box>
      </Sub>

      <Sub n="8.4.3" title="Covariant derivatives" zh="协变导数">
        <Tx>{R`设 $(M,g)$ 是 Hermite 流形。我们定义一个与复结构相容的联络。自然的要求是：全纯向量 $V\in T_pM^+$ 平行移动到另一点 $q$ 后仍是全纯向量 $\tilde V(q)\in T_qM^+$。后面将证明，在这一要求下殆复结构是协变守恒的（\sref{T8.4}）。设 $\{z^\mu\}$ 与 $\{z^\mu+\Delta z^\mu\}$ 分别是 $p$、$q$ 的坐标，$V=V^\mu\partial/\partial z^\mu|_p$，$\tilde V(q)=\tilde V^\mu(z+\Delta z)\partial/\partial z^\mu|_q$。仿照 \eqref{7.9} 假设`}</Tx>
        <Eq n="8.61" say={R`平行移动一小步：全纯分量的改变只由全纯分量与全纯位移决定，不引入反全纯分量。`}>{R`\tilde V^\mu(z+\Delta z)=V^\mu(z)-V^\lambda(z)\Gamma^\mu{}_{\nu\lambda}(z)\Delta z^\nu.`}</Eq>
        <Tx>{R`于是基向量满足（参看 \eqref{7.14}）`}</Tx>
        <Eq n="8.62a" keyEq title="全纯基向量的协变导数" say={R`沿全纯方向对全纯基向量求协变导数，结果仍是全纯基向量的组合。`}>{R`\nabla_\mu\frac{\partial}{\partial z^\nu}=\Gamma^\lambda{}_{\mu\nu}(z)\frac{\partial}{\partial z^\lambda}.`}</Eq>
        <Tx>{R`由于 $\partial/\partial\bar z^\mu$ 是 $\partial/\partial z^\mu$ 的共轭向量场，有`}</Tx>
        <Eq n="8.62b" say={R`取上式的复共轭：反全纯基向量沿反全纯方向的导数，由共轭的联络系数给出。`}>{R`\nabla_{\bar\mu}\frac{\partial}{\partial\bar z^\nu}=\Gamma^{\bar\lambda}{}_{\bar\mu\bar\nu}\frac{\partial}{\partial\bar z^\lambda}`}</Eq>
        <Tx>{R`其中 $\Gamma^{\bar\lambda}{}_{\bar\mu\bar\nu}=\overline{\Gamma}^\lambda{}_{\mu\nu}$。$\Gamma^\lambda{}_{\mu\nu}$ 与 $\Gamma^{\bar\lambda}{}_{\bar\mu\bar\nu}$ 是联络系数中仅有的非零分量。注意 $\nabla_\mu\partial/\partial\bar z^\nu=\nabla_{\bar\mu}\partial/\partial z^\nu=0$。对对偶基，非零的协变导数为`}</Tx>
        <Eq n="8.63" say={R`对偶基的协变导数带负号的联络系数，同样不混合全纯与反全纯。`}>{R`\nabla_\mu\dd z^\nu=-\Gamma^\nu{}_{\mu\lambda}\dd z^\lambda\qquad\nabla_{\bar\mu}\dd\bar z^\nu=-\Gamma^{\bar\nu}{}_{\bar\mu\bar\lambda}\dd\bar z^\lambda.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{8.63} 第二式末尾是 $\dd\bar z^\lambda$（p.347）`}>{R`原书第二式右端印作 $-\Gamma^{\bar\nu}{}_{\bar\mu\bar\lambda}\bar z^\lambda$，漏了微分号：一形式的协变导数仍是一形式，应为 $\dd\bar z^\lambda$（与第一式对称，也是第一式的复共轭）。正文已改正。`}</Box>
        <Tx>{R`$X^+=X^\mu\partial/\partial z^\mu\in\mathcal{X}(M)^+$ 的协变导数为`}</Tx>
        <Eq n="8.64" say={R`全纯向量沿全纯方向的协变导数 = 普通导数 + 联络修正。`}>{R`\nabla_\mu X^+=(\partial_\mu X^\lambda+X^\nu\Gamma^\lambda{}_{\mu\nu})\frac{\partial}{\partial z^\lambda}`}</Eq>
        <Tx>{R`其中 $\partial_\mu\equiv\partial/\partial z^\mu$。对 $X^-=X^{\bar\mu}\partial/\partial\bar z^\mu\in\mathcal{X}(M)^-$，`}</Tx>
        <Eq n="8.65" say={R`反全纯向量沿全纯方向求导：联络修正为零，就是普通偏导。`}>{R`\nabla_\mu X^-=\partial_\mu X^{\bar\lambda}\frac{\partial}{\partial\bar z^\lambda}`}</Eq>
        <Tx>{R`因为 $\Gamma^{\bar\lambda}{}_{\mu\nu}=\Gamma^{\bar\lambda}{}_{\mu\bar\nu}=0$。就反全纯向量而言，$\nabla_\mu$ 的作用就是普通导数 $\partial_\mu$。类似地，`}</Tx>
        <Eq n="8.66" say={R`全纯向量沿反全纯方向求导：同样没有联络修正。`}>{R`\nabla_{\bar\mu}X^+=\partial_{\bar\mu}X^\lambda\frac{\partial}{\partial z^\lambda}`}</Eq>
        <Eq n="8.67" say={R`反全纯向量沿反全纯方向的协变导数：普通导数加上共轭联络的修正。`}>{R`\nabla_{\bar\mu}X^-=(\partial_{\bar\mu}X^{\bar\lambda}+X^{\bar\nu}\Gamma^{\bar\lambda}{}_{\bar\mu\bar\nu})\frac{\partial}{\partial\bar z^\lambda}.`}</Eq>
        <Tx>{R`这很容易推广到任意张量场。例如若 $t=t_{\mu\nu}{}^{\bar\lambda}\dd z^\mu\otimes\dd z^\nu\otimes\partial/\partial\bar z^\lambda$，则

$$(\nabla_\kappa t)_{\mu\nu}{}^{\bar\lambda}=\partial_\kappa t_{\mu\nu}{}^{\bar\lambda}-t_{\xi\nu}{}^{\bar\lambda}\Gamma^\xi{}_{\kappa\mu}-t_{\mu\xi}{}^{\bar\lambda}\Gamma^\xi{}_{\kappa\nu},$$

$$(\nabla_{\bar\kappa}t)_{\mu\nu}{}^{\bar\lambda}=\partial_{\bar\kappa}t_{\mu\nu}{}^{\bar\lambda}+t_{\mu\nu}{}^{\bar\xi}\Gamma^{\bar\lambda}{}_{\bar\kappa\bar\xi}.$$

（原书此处 $t$ 的第二个因子印作 $\dd x^\nu$，按上下文应为 $\dd z^\nu$。）

**度规相容性。**像 §7.2 那样要求度规相容：$\nabla_\kappa g_{\mu\bar\nu}=\nabla_{\bar\kappa}g_{\mu\bar\nu}=0$。写成分量：`}</Tx>
        <Eq n="8.68" say={R`度规相容条件的分量形式：因为联络不混合指标类型，每个条件里只出现一个联络项。`}>{R`\partial_\kappa g_{\mu\bar\nu}-g_{\lambda\bar\nu}\Gamma^\lambda{}_{\kappa\mu}=0\qquad\partial_{\bar\kappa}g_{\mu\bar\nu}-g_{\mu\bar\lambda}\Gamma^{\bar\lambda}{}_{\bar\kappa\bar\nu}=0.`}</Eq>
        <Tx>{R`联络系数立即读出：`}</Tx>
        <Eq n="8.69" keyEq title="Hermite 联络" say={R`Hermite 联络的系数只用度规的一阶导数与逆度规写出——比 Levi-Civita 联络简单得多：只对全纯指标求导，不需要对称化。`}>{R`\Gamma^\lambda{}_{\kappa\mu}=g^{\bar\nu\lambda}\partial_\kappa g_{\mu\bar\nu}\qquad\Gamma^{\bar\lambda}{}_{\bar\kappa\bar\nu}=g^{\bar\lambda\mu}\partial_{\bar\kappa}g_{\mu\bar\nu}`}</Eq>
        <Tx>{R`其中 $\{g^{\bar\nu\lambda}\}$ 是 $g_{\mu\bar\nu}$ 的逆矩阵：$g_{\mu\bar\lambda}g^{\bar\lambda\nu}=\delta_\mu{}^\nu$，$g^{\bar\nu\lambda}g_{\lambda\bar\mu}=\delta^{\bar\nu}{}_{\bar\mu}$。（逆度规对两个指标对称，$g^{\lambda\bar\nu}=g^{\bar\nu\lambda}$。）度规相容且 $\Gamma$（混合指标）$=0$ 的联络称为 **Hermite 联络**。由构造，它唯一，由 \eqref{8.69} 给出。`}</Tx>
        <Box kind="note" title="Hermite 联络一般不是 Levi-Civita 联络">{R`Levi-Civita 联络（\sref{T7.1}）由"度规相容 + 无挠"唯一决定；Hermite 联络由"度规相容 + 不混合全纯与反全纯指标"唯一决定。两者一般不同：Hermite 联络通常有挠率（\eqref{8.73a}）。§8.5 将证明，二者重合当且仅当度规是 Kähler 的——Kähler 条件 \eqref{8.82} 正好让挠率为零（\eqref{8.96a}）。`}</Box>
        <Stmt id="T8.4">
          <Proof steps={[
            { claim: R`证明第一个等式。由 \eqref{8.22}，$J_\nu{}^\mu=\mathrm{i}\delta_\nu{}^\mu$（全纯块），按 $(1,1)$ 张量的协变导数公式：`, tex: R`(\nabla_\kappa J)_\nu{}^\mu=\partial_\kappa(\mathrm{i}\delta_\nu{}^\mu)-\mathrm{i}\delta_\xi{}^\mu\Gamma^\xi{}_{\kappa\nu}+\mathrm{i}\delta_\nu{}^\xi\Gamma^\mu{}_{\kappa\xi}=0`, uses: ["8.22", "8.62a"], why: R`常数的导数为零；两个联络项都等于 $\mathrm{i}\Gamma^\mu{}_{\kappa\nu}$，相消。` },
            { claim: R`第二个：$(\nabla_{\bar\kappa}J)_\nu{}^\mu=\partial_{\bar\kappa}(\mathrm{i}\delta_\nu{}^\mu)-\mathrm{i}\Gamma^\mu{}_{\bar\kappa\nu}+\mathrm{i}\Gamma^\mu{}_{\bar\kappa\nu}=0$；事实上两项各自为零，因为混合联络系数为零。`, fill: true },
            { claim: R`第三、四个：$J_{\bar\nu}{}^{\bar\mu}=-\mathrm{i}\delta$，同样的计算（或对前两式取复共轭）。混合分量 $J_\nu{}^{\bar\mu}=J_{\bar\nu}{}^\mu=0$，而联络不把全纯指标变成反全纯指标，所以它们的协变导数也为零。`, fill: true },
          ]} />
        </Stmt>
        <Eq n="8.70" keyEq title="殆复结构协变常数" say={R`在 Hermite 联络下，"乘以 $\mathrm{i}$"这个操作与平行移动可交换：平行移动保持全纯向量为全纯向量。`}>{R`(\nabla_\kappa J)_\nu{}^\mu=(\nabla_{\bar\kappa}J)_\nu{}^\mu=(\nabla_\kappa J)_{\bar\nu}{}^{\bar\mu}=(\nabla_{\bar\kappa}J)_{\bar\nu}{}^{\bar\mu}=0.`}</Eq>
      </Sub>

      <Sub n="8.4.4" title="Torsion and curvature" zh="挠率与曲率">
        <Tx>{R`挠率张量 $T$ 与 Riemann 曲率张量 $R$ 照常定义（§7.2–7.3）：`}</Tx>
        <Eq n="8.71" say={R`挠率：沿 $X$ 推 $Y$ 与沿 $Y$ 推 $X$ 之差，再减去李括号——度量"无穷小平行四边形"是否闭合。`}>{R`T(X,Y)=\nabla_XY-\nabla_YX-[X,Y]`}</Eq>
        <Eq n="8.72" say={R`曲率：两个方向的协变导数的对易子（减去括号修正）——平行移动绕小回路一圈后向量的变化。`}>{R`R(X,Y)Z=\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z.`}</Eq>
        <Tx>{R`计算得

$$T\left(\frac{\partial}{\partial z^\mu},\frac{\partial}{\partial z^\nu}\right)=(\Gamma^\lambda{}_{\mu\nu}-\Gamma^\lambda{}_{\nu\mu})\frac{\partial}{\partial z^\lambda},\qquad T\left(\frac{\partial}{\partial z^\mu},\frac{\partial}{\partial\bar z^\nu}\right)=T\left(\frac{\partial}{\partial\bar z^\mu},\frac{\partial}{\partial z^\nu}\right)=0,$$

$$T\left(\frac{\partial}{\partial\bar z^\mu},\frac{\partial}{\partial\bar z^\nu}\right)=(\Gamma^{\bar\lambda}{}_{\bar\mu\bar\nu}-\Gamma^{\bar\lambda}{}_{\bar\nu\bar\mu})\frac{\partial}{\partial\bar z^\lambda}.$$

（坐标基向量的括号为零；混合情形两个协变导数都为零。）非零分量为`}</Tx>
        <Eq n="8.73a" keyEq title="Hermite 联络的挠率" say={R`挠率 = 度规混合分量的"旋度"：$\partial_\mu g_{\nu\bar\xi}-\partial_\nu g_{\mu\bar\xi}$。Kähler 条件正是让它为零。`}>{R`T^\lambda{}_{\mu\nu}=\Gamma^\lambda{}_{\mu\nu}-\Gamma^\lambda{}_{\nu\mu}=g^{\bar\xi\lambda}(\partial_\mu g_{\nu\bar\xi}-\partial_\nu g_{\mu\bar\xi})`}</Eq>
        <Eq n="8.73b" say={R`反全纯分量的挠率，是上式的复共轭。`}>{R`T^{\bar\lambda}{}_{\bar\mu\bar\nu}=\Gamma^{\bar\lambda}{}_{\bar\mu\bar\nu}-\Gamma^{\bar\lambda}{}_{\bar\nu\bar\mu}=g^{\bar\lambda\xi}\left(\partial_{\bar\mu}g_{\bar\nu\xi}-\partial_{\bar\nu}g_{\bar\mu\xi}\right).`}</Eq>
        <Tx>{R`至于 Riemann 张量，例如（\eqref{7.42} 的分量形式）

$$R^\kappa{}_{\lambda\mu\nu}=\partial_\mu\Gamma^\kappa{}_{\nu\lambda}-\partial_\nu\Gamma^\kappa{}_{\mu\lambda}+\Gamma^\eta{}_{\nu\lambda}\Gamma^\kappa{}_{\mu\eta}-\Gamma^\eta{}_{\mu\lambda}\Gamma^\kappa{}_{\nu\eta}.$$

代入 \eqref{8.69}，得到

$$\begin{aligned}R^\kappa{}_{\lambda\mu\nu}=&\ \partial_\mu g^{\bar\xi\kappa}\partial_\nu g_{\lambda\bar\xi}+g^{\bar\xi\kappa}\partial_\mu\partial_\nu g_{\lambda\bar\xi}-\partial_\nu g^{\bar\xi\kappa}\partial_\mu g_{\lambda\bar\xi}-g^{\bar\xi\kappa}\partial_\mu\partial_\nu g_{\lambda\bar\xi}\\&+g^{\bar\xi\eta}\partial_\nu g_{\lambda\bar\xi}g^{\bar\zeta\kappa}\partial_\mu g_{\eta\bar\zeta}-g^{\bar\xi\eta}\partial_\mu g_{\lambda\bar\xi}g^{\bar\zeta\kappa}\partial_\nu g_{\eta\bar\zeta}=0,\end{aligned}$$

其中用了恒等式 $g^{\bar\zeta\kappa}\partial_\mu g_{\eta\bar\zeta}=-g_{\eta\bar\zeta}\partial_\mu g^{\bar\zeta\kappa}$ 等（对 $g^{\bar\zeta\kappa}g_{\eta\bar\zeta}=\delta_\eta{}^\kappa$ 求导）。第二、四项直接相消；用这个恒等式，第一项 $=-g^{\bar\xi\eta}\partial_\mu g_{\eta\bar\zeta}g^{\bar\zeta\kappa}\partial_\nu g_{\lambda\bar\xi}$ 与第五项相消，第三项与第六项相消。一般地，`}</Tx>
        <Eq n="8.74" say={R`Hermite 联络的曲率不混合指标类型：前两个指标必须同为全纯或同为反全纯，后两个（求导方向）必须一个全纯、一个反全纯。`}>{R`R^\kappa{}_{\bar\lambda AB}=R^{\bar\kappa}{}_{\lambda AB}=R^A{}_{B\kappa\lambda}=R^A{}_{B\bar\kappa\bar\lambda}=0`}</Eq>
        <Tx>{R`其中 $A$、$B$ 是任意（全纯或反全纯）指标。（前两个为零是因为联络不混合类型；$R^A{}_{B\kappa\lambda}$ 为零由上面的计算；$R^A{}_{B\bar\kappa\bar\lambda}$ 是它的共轭。）于是只剩下分量 $R^\kappa{}_{\lambda\bar\mu\nu}$、$R^\kappa{}_{\lambda\mu\bar\nu}$、$R^{\bar\kappa}{}_{\bar\lambda\bar\mu\nu}$ 与 $R^{\bar\kappa}{}_{\bar\lambda\mu\bar\nu}$。注意平凡的对称性 $R^\kappa{}_{\lambda\bar\mu\nu}=-R^\kappa{}_{\lambda\nu\bar\mu}$。所以独立分量化为 $R^\kappa{}_{\lambda\bar\mu\nu}$ 与 $R^{\bar\kappa}{}_{\bar\lambda\mu\bar\nu}=\overline{R}^\kappa{}_{\lambda\bar\mu\nu}$。计算得`}</Tx>
        <Eq n="8.75a" keyEq title="Hermite 联络的曲率" say={R`唯一独立的曲率分量 = 联络系数对反全纯坐标的导数；因为混合联络为零，二次项全部消失。`}>{R`R^\kappa{}_{\lambda\bar\mu\nu}=\partial_{\bar\mu}\Gamma^\kappa{}_{\nu\lambda}=\partial_{\bar\mu}(g^{\bar\xi\kappa}\partial_\nu g_{\lambda\bar\xi})`}</Eq>
        <Eq n="8.75b" say={R`上式的复共轭。`}>{R`R^{\bar\kappa}{}_{\bar\lambda\mu\bar\nu}=\partial_\mu\Gamma^{\bar\kappa}{}_{\bar\nu\bar\lambda}=\partial_\mu(g^{\bar\kappa\xi}\partial_{\bar\nu}g_{\xi\bar\lambda}).`}</Eq>
        <Derivation title={R`推导 \eqref{8.75a}`} collapsed steps={[
          { tex: R`R^\kappa{}_{\lambda\bar\mu\nu}=\partial_{\bar\mu}\Gamma^\kappa{}_{\nu\lambda}-\partial_\nu\Gamma^\kappa{}_{\bar\mu\lambda}+\Gamma^\eta{}_{\nu\lambda}\Gamma^\kappa{}_{\bar\mu\eta}-\Gamma^\eta{}_{\bar\mu\lambda}\Gamma^\kappa{}_{\nu\eta}`, why: R`把上面 $R^\kappa{}_{\lambda\mu\nu}$ 的公式中第三个指标换成 $\bar\mu$。` },
          { tex: R`\Gamma^\kappa{}_{\bar\mu\lambda}=\Gamma^\kappa{}_{\bar\mu\eta}=\Gamma^\eta{}_{\bar\mu\lambda}=0`, why: R`Hermite 联络的混合系数为零。` },
          { tex: R`R^\kappa{}_{\lambda\bar\mu\nu}=\partial_{\bar\mu}\Gamma^\kappa{}_{\nu\lambda}=\partial_{\bar\mu}(g^{\bar\xi\kappa}\partial_\nu g_{\lambda\bar\xi})`, why: R`代入 \eqref{8.69}。` },
        ]} />
        <Exercise n="8.7" title="Hermite 曲率的降指标形式与对称性" level="★★"
          hint={R`对 \eqref{8.75a} 乘 $g_{\bar\kappa\xi}$ 后用乘积法则，并把 $g_{\bar\kappa\xi}\partial_{\bar\mu}g^{\bar\eta\xi}$ 换成 $-g^{\bar\eta\xi}\partial_{\bar\mu}g_{\bar\kappa\xi}$。对称性 \eqref{8.77}：比较 \eqref{8.76a} 与 \eqref{8.76b}（交换哑指标名）。`}
          solution={R`**\eqref{8.76a}。**由 \eqref{8.75a}，

$$g_{\bar\kappa\xi}R^\xi{}_{\lambda\bar\mu\nu}=g_{\bar\kappa\xi}\partial_{\bar\mu}g^{\bar\eta\xi}\,\partial_\nu g_{\lambda\bar\eta}+g_{\bar\kappa\xi}g^{\bar\eta\xi}\partial_{\bar\mu}\partial_\nu g_{\lambda\bar\eta}.$$

第二项 $=\delta_{\bar\kappa}{}^{\bar\eta}\partial_{\bar\mu}\partial_\nu g_{\lambda\bar\eta}=\partial_{\bar\mu}\partial_\nu g_{\lambda\bar\kappa}$。第一项用 $\partial_{\bar\mu}(g_{\bar\kappa\xi}g^{\bar\eta\xi})=0$ 得 $g_{\bar\kappa\xi}\partial_{\bar\mu}g^{\bar\eta\xi}=-g^{\bar\eta\xi}\partial_{\bar\mu}g_{\bar\kappa\xi}$，于是第一项 $=-g^{\bar\eta\xi}\partial_{\bar\mu}g_{\bar\kappa\xi}\partial_\nu g_{\lambda\bar\eta}$。合起来就是 \eqref{8.76a}。

**\eqref{8.76b}** 是 \eqref{8.76a} 的复共轭（用 \eqref{8.75b} 作同样的计算）。**\eqref{8.76c}、\eqref{8.76d}** 来自后两个指标的反对称性 $R^\xi{}_{\lambda\mu\bar\nu}=-R^\xi{}_{\lambda\bar\nu\mu}$（\eqref{8.72} 对 $X,Y$ 反对称），降指标不影响。

**\eqref{8.77}。**由 \eqref{8.76d} 再由 \eqref{8.76b}（把其中的 $\kappa,\bar\lambda,\mu,\bar\nu$ 依次换成 $\lambda,\bar\kappa,\nu,\bar\mu$），

$$R_{\lambda\bar\kappa\bar\mu\nu}=-R_{\lambda\bar\kappa\nu\bar\mu}=-\big(\partial_\nu\partial_{\bar\mu}g_{\bar\kappa\lambda}-g^{\eta\bar\xi}\partial_\nu g_{\lambda\bar\xi}\partial_{\bar\mu}g_{\bar\kappa\eta}\big).$$

而 \eqref{8.76a} 中把哑指标 $(\bar\eta,\xi)$ 改名为 $(\bar\xi,\eta)$：$R_{\bar\kappa\lambda\bar\mu\nu}=\partial_{\bar\mu}\partial_\nu g_{\lambda\bar\kappa}-g^{\bar\xi\eta}\partial_{\bar\mu}g_{\bar\kappa\eta}\partial_\nu g_{\lambda\bar\xi}$。两括号相同（$g^{\eta\bar\xi}=g^{\bar\xi\eta}$，偏导可交换），所以 $R_{\bar\kappa\lambda\bar\mu\nu}=-R_{\lambda\bar\kappa\bar\mu\nu}$。第二个对称性是它的复共轭。这正是 Riemann 张量 $R_{abcd}=-R_{bacd}$（度规相容的推论）在复指标下的形式。`}>
          <>
            <Tx>{R`证明`}</Tx>
            <Eq n="8.76a" say={R`降指标后的曲率：度规的混合二阶导数，减去一阶导数的二次项。`}>{R`R_{\bar\kappa\lambda\bar\mu\nu}\equiv g_{\bar\kappa\xi}R^\xi{}_{\lambda\bar\mu\nu}=\partial_{\bar\mu}\partial_\nu g_{\lambda\bar\kappa}-g^{\bar\eta\xi}\partial_{\bar\mu}g_{\bar\kappa\xi}\partial_\nu g_{\lambda\bar\eta}`}</Eq>
            <Eq n="8.76b" say={R`上式的复共轭版本。`}>{R`R_{\kappa\bar\lambda\mu\bar\nu}\equiv g_{\kappa\bar\xi}R^{\bar\xi}{}_{\bar\lambda\mu\bar\nu}=\partial_\mu\partial_{\bar\nu}g_{\bar\lambda\kappa}-g^{\eta\bar\xi}\partial_\mu g_{\kappa\bar\xi}\partial_{\bar\nu}g_{\bar\lambda\eta}`}</Eq>
            <Eq n="8.76c" say={R`曲率对后两个指标反对称。`}>{R`R_{\bar\kappa\lambda\mu\bar\nu}\equiv g_{\bar\kappa\xi}R^\xi{}_{\lambda\mu\bar\nu}=-R_{\bar\kappa\lambda\bar\nu\mu}`}</Eq>
            <Eq n="8.76d" say={R`同上，共轭类型的分量。`}>{R`R_{\kappa\bar\lambda\bar\mu\nu}\equiv g_{\kappa\bar\xi}R^{\bar\xi}{}_{\bar\lambda\bar\mu\nu}=-R_{\kappa\bar\lambda\nu\bar\mu}.`}</Eq>
            <Tx>{R`验证对称性`}</Tx>
            <Eq n="8.77" say={R`降指标后的曲率对前两个指标也反对称——与实 Riemann 张量 $R_{abcd}=-R_{bacd}$ 相同。`}>{R`R_{\bar\kappa\lambda\bar\mu\nu}=-R_{\lambda\bar\kappa\bar\mu\nu}\qquad R_{\kappa\bar\lambda\mu\bar\nu}=-R_{\bar\lambda\kappa\mu\bar\nu}.`}</Eq>
          </>
        </Exercise>
        <Tx>{R`**Ricci 形式。**把 Riemann 张量的指标缩并为`}</Tx>
        <Eq n="8.78" keyEq title="Ricci 形式的分量" say={R`曲率的迹只依赖于度规行列式的对数：对 $\log G$ 先求全纯导数再求反全纯导数。`}>{R`\sym{ricf}{\mathfrak{R}}_{\mu\bar\nu}\equiv R^\kappa{}_{\kappa\mu\bar\nu}=-\partial_{\bar\nu}(g^{\kappa\bar\xi}\partial_\mu g_{\kappa\bar\xi})=-\partial_{\bar\nu}\partial_\mu\log G`}</Eq>
        <Tx>{R`其中 $G\equiv\det(g_{\mu\bar\nu})$。（第二个等号：$R^\kappa{}_{\kappa\mu\bar\nu}=-R^\kappa{}_{\kappa\bar\nu\mu}$ 再用 \eqref{8.75a}。）最后一个等号用了恒等式 $\delta G=Gg^{\mu\bar\nu}\delta g_{\mu\bar\nu}$（见 \eqref{7.204}），于是 $g^{\kappa\bar\xi}\partial_\mu g_{\kappa\bar\xi}=\partial_\mu\log G$。定义 **Ricci 形式**`}</Tx>
        <Eq n="8.79" keyEq title="Ricci 形式" say={R`Ricci 形式是一个实的闭 $(1,1)$ 形式，局部写成 $\mathrm{i}\bar\partial\partial\log G$；它的上同调类除以 $2\pi$ 就是第一陈类。`}>{R`\sym{ricf}{\mathfrak{R}}\equiv\mathrm{i}\sym{ricf}{\mathfrak{R}}_{\mu\bar\nu}\,\dd z^\mu\wedge\dd\bar z^\nu=\mathrm{i}\bar\partial\partial\log G.`}</Eq>
        <Box kind="warning" title={R`注记（勘误）：$G=\det(g_{\mu\bar\nu})$ 与 $\sqrt g$ 相差常数因子（p.350）`}>{R`原书写 $G\equiv\det(g_{\mu\bar\nu})=\sqrt g$。直接计算：$m=1$ 时实度规 $g_{xx}=g_{yy}=a$ 给出 $g_{z\bar z}=\frac14(g_{xx}+g_{yy})=\frac a2$，而 $\sqrt{\det g_{\rm real}}=a$；一般地 $\det(g_{\mu\bar\nu})=2^{-m}\sqrt{g}$（复基与实基之间的变换矩阵是常数）。常数因子在 $\log G$ 的导数中消失，所以 \eqref{8.78}、\eqref{8.79} 及之后的一切结论不受影响；正文写作 $G\equiv\det(g_{\mu\bar\nu})\propto\sqrt g$。`}</Box>
        <Tx>{R`验证 \eqref{8.79} 的最后一个等号：$\bar\partial\partial\log G=\bar\partial(\partial_\mu\log G\,\dd z^\mu)=\partial_{\bar\nu}\partial_\mu\log G\,\dd\bar z^\nu\wedge\dd z^\mu=-\partial_{\bar\nu}\partial_\mu\log G\,\dd z^\mu\wedge\dd\bar z^\nu=\sym{ricf}{\mathfrak{R}}_{\mu\bar\nu}\dd z^\mu\wedge\dd\bar z^\nu$。

$\sym{ricf}{\mathfrak{R}}$ 是*实*形式：$\nosym{\overline{\sym{ricf}{\mathfrak{R}}}}=-\mathrm{i}\,\nosym{\overline{\bar\partial\partial}}\log G=-\mathrm{i}\partial\bar\partial\log G=\sym{ricf}{\mathfrak{R}}$（$G$ 是正实数；用 \eqref{8.42b} 与 $\partial\bar\partial=-\bar\partial\partial$）。由恒等式

$$\partial\bar\partial=-\tfrac12\dd(\partial-\bar\partial)$$

（右边 $=-\frac12(\partial+\bar\partial)(\partial-\bar\partial)=-\frac12(-\partial\bar\partial+\bar\partial\partial)=\partial\bar\partial$），可知 $\sym{ricf}{\mathfrak{R}}$ 是闭的：$\dd\sym{ricf}{\mathfrak{R}}\propto\dd^2(\partial-\bar\partial)\log G=0$。但这并不意味着 $\sym{ricf}{\mathfrak{R}}$ 是恰当的。事实上，$G$ 不是标量（换卡时 $G\to|\det(\partial z/\partial w)|^2G$），$(\partial-\bar\partial)\log G$ 不是整体定义的。$\sym{ricf}{\mathfrak{R}}$ 定义了 $H^2(M;\R)$ 中一个非平凡元素

$$c_1(M)\equiv[\sym{ricf}{\mathfrak{R}}/2\pi]\in H^2(M;\R),$$

称为**第一陈类**（first Chern class）。§11.2 将进一步讨论。（换卡时 $\log G$ 改变 $\log|\det|^2=\log\det+\nosym{\overline{\log\det}}$，是全纯函数加反全纯函数，被 $\bar\partial\partial$ 消灭——所以 $\sym{ricf}{\mathfrak{R}}$ 本身是整体定义的，只是它的"势"不是。）`}</Tx>
        <Stmt id="P8.2">
          <Proof steps={[
            { claim: R`由 \eqref{7.204}，$\delta\log G=g^{\mu\bar\nu}\delta g_{\mu\bar\nu}$。于是`, tex: R`\delta\sym{ricf}{\mathfrak{R}}=\delta\,\mathrm{i}\bar\partial\partial\log G=\mathrm{i}\bar\partial\partial\,g^{\mu\bar\nu}\delta g_{\mu\bar\nu}=\tfrac12\dd(\partial-\bar\partial)\,\mathrm{i}g^{\mu\bar\nu}\delta g_{\mu\bar\nu}`, uses: ["7.204", "8.79", "8.42a"], why: R`$\bar\partial\partial=-\partial\bar\partial=\frac12\dd(\partial-\bar\partial)$。` },
            { claim: R`$g^{\mu\bar\nu}\delta g_{\mu\bar\nu}$ 是标量（两个张量的完全缩并，与卡无关），所以`, tex: R`\omega\equiv\tfrac{\mathrm{i}}{2}(\partial-\bar\partial)\,g^{\mu\bar\nu}\delta g_{\mu\bar\nu}`, why: R`是 $M$ 上整体定义的一形式；它是实的：对实函数 $f$，$\nosym{\overline{(\partial-\bar\partial)f}}=-(\partial-\bar\partial)f$，再乘 $\mathrm{i}$ 变实。` },
            { claim: R`因此 $\delta\sym{ricf}{\mathfrak{R}}=\dd\omega$ 是恰当二形式，$[\sym{ricf}{\mathfrak{R}}]=[\sym{ricf}{\mathfrak{R}}+\delta\sym{ricf}{\mathfrak{R}}]$：$c_1(M)$ 在 $g\to g+\delta g$ 下不变。` },
          ]} />
        </Stmt>
        <Box kind="warning" title={R`勘误：命题 8.2 证明中的符号与因子 $\mathrm{i}$（p.350）`}>{R`原书写 $\delta\sym{ricf}{\mathfrak{R}}=\mathrm{i}\bar\partial\partial g^{\mu\bar\nu}\delta g_{\mu\bar\nu}=-\frac12\dd(\partial-\bar\partial)\mathrm{i}g^{\mu\bar\nu}\delta g_{\mu\bar\nu}$，并取 $\omega\equiv-\frac12(\partial-\bar\partial)g^{\mu\bar\nu}\delta g_{\mu\bar\nu}$。但原书自己给出的恒等式是 $\partial\bar\partial=-\frac12\dd(\partial-\bar\partial)$，而这里出现的是 $\bar\partial\partial=-\partial\bar\partial=+\frac12\dd(\partial-\bar\partial)$，所以符号应为正；并且 $\omega$ 漏了因子 $\mathrm{i}$（没有它，$\omega$ 是纯虚的，$\dd\omega\neq\delta\sym{ricf}{\mathfrak{R}}$）。正确的是 $\omega=\frac{\mathrm{i}}{2}(\partial-\bar\partial)g^{\mu\bar\nu}\delta g_{\mu\bar\nu}$。结论（$\delta\sym{ricf}{\mathfrak{R}}$ 恰当）不受影响。`}</Box>
      </Sub>
    </Sec>);
}
