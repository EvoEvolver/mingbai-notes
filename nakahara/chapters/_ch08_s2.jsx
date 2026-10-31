// §8.2 复流形上的微积分 —— 式 (8.8)–(8.29)，习题 8.1–8.3；交互图 3（Cauchy–Riemann / ∂f/∂z̄ 的数值检验）
import { Sec, Sub, Tx, Eq, Box, Exercise, Derivation, C } from "@kit";
import { CRLab } from "./_ch08_demos.jsx";

const R = String.raw;

export function Sec82() {
  return (
    <Sec n="8.2" title="Calculus on complex manifolds" zh="复流形上的微积分"
      gist={R`全纯映射与卡无关；紧复流形上的全纯函数是常数 → 复化：$V^\C$、$T_pM^\C$、复向量场与括号 \eqref{8.10} → 复基 $\partial/\partial z^\mu$、$\partial/\partial\bar z^\mu$ 与对偶基 $\dd z^\mu$、$\dd\bar z^\mu$（\eqref{8.13a}–\eqref{8.15b}）→ 殆复结构 $J$：$J^2=-1$，与卡无关，在复基下是 $\mathrm{diag}(\mathrm{i},-\mathrm{i})$ → $T_pM^\C=T_pM^+\oplus T_pM^-$（全纯 / 反全纯向量）。`}
      why={R`要在复流形上谈论"全纯的向量""$(r,s)$ 形式"，先要把实的切空间复化，并找到一个与坐标无关的方式把它一分为二。这个方式就是 $J$——全纯坐标变换与"乘以 $\mathrm{i}$"可交换，所以 $J$ 在整个流形上有定义。`}
      gives={["8.9", "8.10", "8.13a", "8.13b", "8.14", "8.15b", "8.16", "8.17", "8.18", "8.20", "8.22", "8.23", "8.25"]}>
      <p className="muted">本节概念：<C id="almost_complex" /></p>

      <Sub n="8.2.1" title="Holomorphic maps" zh="全纯映射">
        <Tx>{R`设 $f:M\to N$，$M$、$N$ 是复流形，$\dim_\C M=m$，$\dim_\C N=n$。取 $M$ 的卡 $(U,\varphi)$ 中的点 $p$，以及 $N$ 的卡 $(V,\psi)$ 使 $f(p)\in V$。记 $\{z^\mu\}=\varphi(p)$、$\{w^\nu\}=\psi(f(p))$，得到映射 $\psi\circ f\circ\varphi^{-1}:\C^m\to\C^n$。若每个函数 $w^\nu$（$1\le\nu\le n$）都是 $z^\mu$ 的全纯函数，就称 $f$ 为**全纯映射**（holomorphic map）。

这个定义与所选坐标无关。事实上，设 $(U',\varphi')$ 是另一张卡，$U\cap U'\neq\emptyset$，坐标为 $z'^\lambda=x'^\lambda+\mathrm{i}y'^\lambda$。取 $p\in U\cap U'$。若 $w^\nu=u^\nu+\mathrm{i}v^\nu$ 是 $z$ 的全纯函数，则由链式法则，

$$\frac{\partial u^\nu}{\partial x'^\lambda}=\frac{\partial u^\nu}{\partial x^\mu}\frac{\partial x^\mu}{\partial x'^\lambda}+\frac{\partial u^\nu}{\partial y^\mu}\frac{\partial y^\mu}{\partial x'^\lambda}=\frac{\partial v^\nu}{\partial y^\mu}\frac{\partial y^\mu}{\partial y'^\lambda}+\frac{\partial v^\nu}{\partial x^\mu}\frac{\partial x^\mu}{\partial y'^\lambda}=\frac{\partial v^\nu}{\partial y'^\lambda}.$$

（第二个等号对 $u,v$ 关于 $(x,y)$ 用 Cauchy–Riemann 关系，同时对坐标变换 $z(z')$ 用 $\partial x^\mu/\partial x'^\lambda=\partial y^\mu/\partial y'^\lambda$、$\partial y^\mu/\partial x'^\lambda=-\partial x^\mu/\partial y'^\lambda$——后者正是复流形公理 (iv)。）同理 $\partial u^\nu/\partial y'^\lambda=-\partial v^\nu/\partial x'^\lambda$。所以 $w^\nu$ 关于 $z'$ 也是全纯的。可以证明，全纯性同样不依赖于 $N$ 中卡的选取（全纯函数的全纯函数仍全纯）。`}</Tx>
        <Box kind="warning" title="勘误：链式法则第一行的偏导数（p.336）">{R`原书第一个等号右边第二项印作 $\dfrac{\partial u^\nu}{\partial y^\mu}\dfrac{\partial y^\mu}{\partial y'^\lambda}$。链式法则要求对 $x'^\lambda$ 求导，应为 $\dfrac{\partial y^\mu}{\partial x'^\lambda}$；改正后用坐标变换自身的 Cauchy–Riemann 关系 $\partial y^\mu/\partial x'^\lambda=-\partial x^\mu/\partial y'^\lambda$，配合 $\partial u^\nu/\partial y^\mu=-\partial v^\nu/\partial x^\mu$，两个负号相消，才得到第二行的 $+\dfrac{\partial v^\nu}{\partial x^\mu}\dfrac{\partial x^\mu}{\partial y'^\lambda}$。正文已改正。`}</Box>
        <Tx>{R`设 $M$、$N$ 是复流形。若存在微分同胚 $f:M\to N$ 并且它是全纯的（此时 $f^{-1}:N\to M$ 自动全纯），就说 $M$ 与 $N$ **双全纯**（biholomorphic），$f$ 称为**双全纯映射**（biholomorphism）。复流形按双全纯分类，正如微分流形按微分同胚分类；例 8.2 说明同一个 $T^2$ 上有连续一族互不双全纯的复结构。

**全纯函数**是全纯映射 $f:M\to\C$。有一个惊人的定理：*紧*复流形上的任何全纯函数都是*常数*。这是初等复分析中最大模原理的推广，见 Wells (1980)。（证明思路：$|f|$ 在紧流形上取到最大值；由最大模原理，$f$ 在该点的一个邻域内为常数；由解析延拓，$f$ 在整个连通分支上为常数。）$M$ 上全纯函数的集合记为 $\mathcal{O}(M)$；类似地，$\mathcal{O}(U)$ 是 $U\subset M$ 上全纯函数的集合。

这个定理说明：在紧复流形上不能像在微分流形上那样用"全纯坐标函数"把流形嵌入 $\C^N$——只能嵌入射影空间 $\CP^N$（如例 8.5 的代数簇）。`}</Tx>
      </Sub>

      <Sub n="8.2.2" title="Complexifications" zh="复化">
        <Tx>{R`设 $M$ 是微分流形，$\dim_\R M=m$。若 $f:M\to\C$ 分解为 $f=g+\mathrm{i}h$，$g,h\in\mathcal{F}(M)$，则 $f$ 是复值光滑函数。复值光滑函数的集合称为 $\mathcal{F}(M)$ 的**复化**（complexification），记作 $\mathcal{F}(M)^\C$。复化的函数一般不满足 Cauchy–Riemann 关系。对 $f=g+\mathrm{i}h\in\mathcal{F}(M)^\C$，其复共轭为 $\overline f\equiv g-\mathrm{i}h$。$f$ 为实函数当且仅当 $f=\overline f$。

**向量空间的复化。**复化 $T_pM$ 之前，先定义一般向量空间 $V$（$\dim_\R V=m$）的复化 $V^\C$。$V^\C$ 的元素形如 $X+\mathrm{i}Y$，$X,Y\in V$。若加法与复数 $a+\mathrm{i}b$ 的数乘定义为

$$(X_1+\mathrm{i}Y_1)+(X_2+\mathrm{i}Y_2)=(X_1+X_2)+\mathrm{i}(Y_1+Y_2),\qquad(a+\mathrm{i}b)(X+\mathrm{i}Y)=(aX-bY)+\mathrm{i}(bX+aY),$$

则 $V^\C$ 成为复维数 $m$ 的复向量空间。由于 $X\in V$ 可与 $X+\mathrm{i}0\in V^\C$ 等同，$V$ 是 $V^\C$ 的（实）子空间。$V$ 中的向量称为**实的**。$Z=X+\mathrm{i}Y$ 的复共轭为 $\overline Z=X-\mathrm{i}Y$；$Z$ 为实向量当且仅当 $Z=\overline Z$。$V$ 上的线性算子 $A$ **延拓**为 $V^\C$ 上的算子：`}</Tx>
        <Eq n="8.8" say={R`把实线性算子 $\C$ 线性地延拓到复化空间：分别作用在实部与虚部上。`}>{R`A(X+\mathrm{i}Y)=A(X)+\mathrm{i}A(Y).`}</Eq>
        <Tx>{R`若 $A:V\to\R$ 是线性函数（$A\in V^*$），其延拓是 $V^\C$ 上的复值线性函数 $A:V^\C\to\C$。一般地，定义在 $V$ 与 $V^*$ 上的任何张量都延拓到 $V^\C$ 与 $(V^*)^\C$ 上。延拓后的张量可以复化为 $t=t_1+\mathrm{i}t_2$，$t_1$、$t_2$ 是同类型的（实）张量；$t$ 的共轭为 $\overline t\equiv t_1-\mathrm{i}t_2$。若 $t=\overline t$，称张量为实的。例如 $A:V^\C\to\C$ 为实的，如果 $\nosym{\overline{A(X+\mathrm{i}Y)}}=A(X-\mathrm{i}Y)$。

**基。**设 $\{e_k\}$ 是 $V$ 的基。把基向量看作复向量，*同一组*基 $\{e_k\}$ 就成为 $V^\C$ 的基：若 $X=X^ke_k$、$Y=Y^ke_k\in V$，则 $Z=X+\mathrm{i}Y$ 可以*唯一地*写成 $(X^k+\mathrm{i}Y^k)e_k$。所以 $\dim_\R V=\dim_\C V^\C$。

**切空间的复化。**把 $V$ 换成 $T_pM$，得到 $T_pM$ 的复化 $T_pM^\C$，其元素为 $Z=X+\mathrm{i}Y$（$X,Y\in T_pM$）。$Z$ 作用在函数 $f=f_1+\mathrm{i}f_2\in\mathcal{F}(M)^\C$ 上为`}</Tx>
        <Eq n="8.9" say={R`复向量对复函数求方向导数：把实部、虚部都展开，按 $\mathrm{i}^2=-1$ 合并。它仍满足 Leibniz 律，所以复向量仍是"复函数上的导子"。`}>{R`\begin{aligned}Z[f]&=X[f_1+\mathrm{i}f_2]+\mathrm{i}Y[f_1+\mathrm{i}f_2]\\&=X[f_1]-Y[f_2]+\mathrm{i}\{X[f_2]+Y[f_1]\}.\end{aligned}`}</Eq>
        <Tx>{R`对偶空间 $T_p^*M$ 也复化：$\omega,\eta\in T_p^*M$ 组合成 $\zeta=\omega+\mathrm{i}\eta$，复化对偶向量的集合记为 $(T^*_pM)^\C$。任何张量 $t$ 都延拓到 $T_pM^\C$ 与 $(T^*_pM)^\C$ 上，然后复化。`}</Tx>
        <Exercise n="8.1" title={R`$(T_p^*M)^\C=(T_pM^\C)^*$`} level="★"
          hint={R`给 $\zeta=\omega+\mathrm{i}\eta\in(T_p^*M)^\C$ 指定 $T_pM^\C$ 上的 $\C$ 线性函数 $\zeta(X+\mathrm{i}Y)\equiv\omega(X)-\eta(Y)+\mathrm{i}[\omega(Y)+\eta(X)]$。证明这是单射，再比较维数。`}
          solution={R`**映射。**对 $\zeta=\omega+\mathrm{i}\eta$，按 \eqref{8.8} 的规则把 $\omega$、$\eta$ 都 $\C$ 线性地延拓到 $T_pM^\C$ 上，定义

$$\Phi(\zeta)(X+\mathrm{i}Y)=\omega(X+\mathrm{i}Y)+\mathrm{i}\,\eta(X+\mathrm{i}Y)=\omega(X)-\eta(Y)+\mathrm{i}[\omega(Y)+\eta(X)].$$

直接验证 $\Phi(\zeta)((a+\mathrm{i}b)Z)=(a+\mathrm{i}b)\Phi(\zeta)(Z)$，所以 $\Phi(\zeta)\in(T_pM^\C)^*$（复线性函数）。$\Phi$ 本身对 $\zeta$ 也是 $\C$ 线性的（$\mathrm{i}\zeta=-\eta+\mathrm{i}\omega$ 映到 $\mathrm{i}\Phi(\zeta)$）。

**单射。**若 $\Phi(\zeta)=0$，取 $Y=0$：$\omega(X)+\mathrm{i}\eta(X)=0$ 对一切实 $X$ 成立，实部、虚部分别为零，故 $\omega=\eta=0$。

**满射。**$\dim_\C(T_p^*M)^\C=\dim_\R T_p^*M=m$，$\dim_\C(T_pM^\C)^*=\dim_\C T_pM^\C=m$。单射且维数相等，所以 $\Phi$ 是同构。（也可直接构造逆：给定复线性 $\Lambda$，令 $\omega(X)=\mathrm{Re}\,\Lambda(X)$、$\eta(X)=\mathrm{Im}\,\Lambda(X)$，$X$ 为实向量。）

由此以后把复化的对偶空间简记为 $T^*_pM^\C$：先对偶再复化，与先复化再对偶，是同一个东西。`}>
          {R`证明 $(T_p^*M)^\C=(T_pM^\C)^*$。从此以后，复化的对偶向量空间简记为 $T^*_pM^\C$。`}
        </Exercise>
        <Tx>{R`**复向量场。**给定光滑向量场 $X,Y\in\mathcal{X}(M)$，定义复向量场 $Z=X+\mathrm{i}Y$。显然 $Z|_p\in T_pM^\C$。复向量场的集合是 $\mathcal{X}(M)$ 的复化，记为 $\mathcal{X}(M)^\C$。$Z=X+\mathrm{i}Y$ 的共轭向量场为 $\overline Z=X-\mathrm{i}Y$。若 $Z\in\mathcal{X}(M)$ 则 $Z=\overline Z$，所以 $\mathcal{X}(M)^\C\supset\mathcal{X}(M)$。$Z=X+\mathrm{i}Y$ 与 $W=U+\mathrm{i}V\in\mathcal{X}(M)^\C$ 的李括号为`}</Tx>
        <Eq n="8.10" say={R`复向量场的李括号按双线性展开：实部是 $[X,U]-[Y,V]$，虚部是 $[X,V]+[Y,U]$，与复数乘法的规则一样。`}>{R`[X+\mathrm{i}Y,U+\mathrm{i}V]=\{[X,U]-[Y,V]\}+\mathrm{i}\{[X,V]+[Y,U]\}.`}</Eq>
        <Tx>{R`$(p,q)$ 型张量场的复化以显然的方式定义。若 $\omega,\eta\in\Omega^1(M)$，则 $\xi\equiv\omega+\mathrm{i}\eta\in\Omega^1(M)^\C$ 是复化的一形式。`}</Tx>
      </Sub>

      <Sub n="8.2.3" title="Almost complex structure" zh="殆复结构">
        <Tx>{R`复流形也是微分流形，所以可以用第 5 章发展的框架，再对结果加上适当的*限制*。看复流形 $M$（$\dim_\C M=m$）的切空间。$T_pM$ 由 $2m$ 个向量张成：`}</Tx>
        <Eq n="8.11" say={R`复流形的实切空间以 $2m$ 个实坐标方向为基：前 $m$ 个沿实部 $x^\mu$，后 $m$ 个沿虚部 $y^\mu$。`}>{R`\left\{\frac{\partial}{\partial x^1},\ldots,\frac{\partial}{\partial x^m};\frac{\partial}{\partial y^1},\ldots,\frac{\partial}{\partial y^m}\right\}`}</Eq>
        <Tx>{R`其中 $z^\mu=x^\mu+\mathrm{i}y^\mu$ 是 $p$ 在卡 $(U,\varphi)$ 中的坐标。用同一组坐标，$T_p^*M$ 由下列一形式张成：`}</Tx>
        <Eq n="8.12" say={R`对偶的实余切基：$2m$ 个实坐标的微分。`}>{R`\left\{\dd x^1,\ldots,\dd x^m;\dd y^1,\ldots,\dd y^m\right\}.`}</Eq>
        <Tx>{R`定义 $2m$ 个向量`}</Tx>
        <Eq n="8.13a" keyEq title="全纯基向量" say={R`沿 $z$ 的"复偏导"：实部方向减去 $\mathrm{i}$ 倍虚部方向再除以 2。它作用在 $z$ 上得 1、作用在 $\bar z$ 上得 0。`}>{R`\frac{\partial}{\partial z^\mu}\equiv\frac12\left\{\frac{\partial}{\partial x^\mu}-\mathrm{i}\frac{\partial}{\partial y^\mu}\right\}`}</Eq>
        <Eq n="8.13b" title="反全纯基向量" say={R`沿 $\bar z$ 的"复偏导"：它作用在 $\bar z$ 上得 1、作用在 $z$ 上得 0；一个函数被它消灭，正是 Cauchy–Riemann 方程。`}>{R`\frac{\partial}{\partial\bar z^\mu}\equiv\frac12\left\{\frac{\partial}{\partial x^\mu}+\mathrm{i}\frac{\partial}{\partial y^\mu}\right\}`}</Eq>
        <Tx>{R`其中 $1\le\mu\le m$。它们显然构成 $2m$ 维（复）向量空间 $T_pM^\C$ 的基（与 \eqref{8.11} 只差一个可逆的常数矩阵）。注意 $\nosym{\overline{\partial/\partial z^\mu}}=\partial/\partial\bar z^\mu$。相应地，$2m$ 个一形式`}</Tx>
        <Eq n="8.14" title={R`$\dd z$ 与 $\dd\bar z$`} say={R`复坐标及其共轭的微分：它们构成复化余切空间的基。`}>{R`\dd z^\mu\equiv\dd x^\mu+\mathrm{i}\,\dd y^\mu\qquad\dd\bar z^\mu\equiv\dd x^\mu-\mathrm{i}\,\dd y^\mu`}</Eq>
        <Tx>{R`构成 $T^*_pM^\C$ 的基。它们与 \eqref{8.13a}、\eqref{8.13b} 对偶：`}</Tx>
        <Eq n="8.15a" say={R`$\dd z$ 看不见反全纯方向，$\dd\bar z$ 看不见全纯方向。`}>{R`\langle\dd z^\mu,\partial/\partial\bar z^\nu\rangle=\langle\dd\bar z^\mu,\partial/\partial z^\nu\rangle=0`}</Eq>
        <Eq n="8.15b" title="复对偶基" say={R`$\dd z^\mu$ 与 $\partial/\partial z^\nu$、$\dd\bar z^\mu$ 与 $\partial/\partial\bar z^\nu$ 各自配成对偶基——与实情形的 $\langle\dd x^\mu,\partial_\nu\rangle=\delta^\mu{}_\nu$ 完全平行。`}>{R`\langle\dd z^\mu,\partial/\partial z^\nu\rangle=\langle\dd\bar z^\mu,\partial/\partial\bar z^\nu\rangle=\delta^\mu{}_\nu.`}</Eq>
        <Derivation title={R`验证 \eqref{8.15a}、\eqref{8.15b}，并把 Cauchy–Riemann 方程写成 $\partial f/\partial\bar z=0$`} collapsed steps={[
          { tex: R`\langle\dd z^\mu,\partial/\partial z^\nu\rangle=\tfrac12\langle\dd x^\mu+\mathrm{i}\dd y^\mu,\ \partial_{x^\nu}-\mathrm{i}\partial_{y^\nu}\rangle=\tfrac12(\delta^\mu{}_\nu+\delta^\mu{}_\nu)=\delta^\mu{}_\nu`, why: R`$\langle\dd x^\mu,\partial_{y^\nu}\rangle=0$，$\mathrm{i}\cdot(-\mathrm{i})=1$。` },
          { tex: R`\langle\dd z^\mu,\partial/\partial\bar z^\nu\rangle=\tfrac12\langle\dd x^\mu+\mathrm{i}\dd y^\mu,\ \partial_{x^\nu}+\mathrm{i}\partial_{y^\nu}\rangle=\tfrac12(\delta^\mu{}_\nu-\delta^\mu{}_\nu)=0`, why: R`$\mathrm{i}\cdot\mathrm{i}=-1$。另两个等式取复共轭即得。` },
          { tex: R`\frac{\partial f}{\partial\bar z^\mu}=\tfrac12\left[\Big(\frac{\partial f_1}{\partial x^\mu}-\frac{\partial f_2}{\partial y^\mu}\Big)+\mathrm{i}\Big(\frac{\partial f_2}{\partial x^\mu}+\frac{\partial f_1}{\partial y^\mu}\Big)\right]`, why: R`把 \eqref{8.13b} 作用在 $f=f_1+\mathrm{i}f_2$ 上。` },
        ]} result={R`实部、虚部同时为零正是 \eqref{8.1}：**$f$ 全纯 $\iff\partial f/\partial\bar z^\mu=0$**。于是 $\partial z/\partial\bar z=0$、$\partial\bar z/\partial z=0$——在全纯基下，$z$ 与 $\bar z$ 可以当作两个"独立变量"求偏导。交互图 3 把这件事做成了可以亲手检验的数值实验。`} />
        <CRLab />
        <Tx>{R`**殆复结构。**设 $M$ 是复流形，定义线性映射 $J_p:T_pM\to T_pM$：`}</Tx>
        <Eq n="8.16" keyEq title="殆复结构" say={R`$J$ 把实部方向转成虚部方向、虚部方向转成实部方向的负值——在每个复坐标平面里转 $90^\circ$，就是"乘以 $\mathrm{i}$"。`}>{R`J_p\left(\frac{\partial}{\partial x^\mu}\right)=\frac{\partial}{\partial y^\mu}\qquad J_p\left(\frac{\partial}{\partial y^\mu}\right)=-\frac{\partial}{\partial x^\mu}`}</Eq>
        <Tx>{R`$J_p$ 是*实*的 $(1,1)$ 型张量。注意`}</Tx>
        <Eq n="8.17" say={R`转两次 $90^\circ$ 就是反向：$J$ 的平方是负的恒等映射，正如 $\mathrm{i}^2=-1$。`}>{R`J_p^2=-\mathrm{id}_{T_pM}.`}</Eq>
        <Tx>{R`粗略地说，$J_p$ 对应于乘以 $\pm\mathrm{i}$。$J_p$ 的作用与卡无关。事实上，设 $(U,\varphi)$ 与 $(V,\psi)$ 是重叠的卡，$\varphi(p)=z^\mu=x^\mu+\mathrm{i}y^\mu$，$\psi(p)=w^\mu=u^\mu+\mathrm{i}v^\mu$。在 $U\cap V$ 上，函数 $z^\mu=z^\mu(w)$ 满足 Cauchy–Riemann 关系 $\partial x^\nu/\partial u^\mu=\partial y^\nu/\partial v^\mu$、$\partial y^\nu/\partial u^\mu=-\partial x^\nu/\partial v^\mu$。于是

$$J_p\left(\frac{\partial}{\partial u^\mu}\right)=J_p\left(\frac{\partial x^\nu}{\partial u^\mu}\frac{\partial}{\partial x^\nu}+\frac{\partial y^\nu}{\partial u^\mu}\frac{\partial}{\partial y^\nu}\right)=\frac{\partial y^\nu}{\partial v^\mu}\frac{\partial}{\partial y^\nu}+\frac{\partial x^\nu}{\partial v^\mu}\frac{\partial}{\partial x^\nu}=\frac{\partial}{\partial v^\mu}.$$

（第二个等号：$J$ 作用后 $\frac{\partial x^\nu}{\partial u^\mu}\partial_{y^\nu}-\frac{\partial y^\nu}{\partial u^\mu}\partial_{x^\nu}$，再代入 Cauchy–Riemann 关系。）同理 $J_p\,\partial/\partial v^\mu=-\partial/\partial u^\mu$。因此对基 \eqref{8.11}，$J_p$ 取形式`}</Tx>
        <Eq n="8.18" title="殆复结构的矩阵" say={R`在实基 $(\partial_x;\partial_y)$ 下，$J$ 是标准的辛型分块矩阵：在每一对 $(x^\mu,y^\mu)$ 平面里是转 $90^\circ$ 的矩阵。它的分量是常数，并且在任何全纯坐标下都相同。`}>{R`J_p=\begin{pmatrix}0&-I_m\\ I_m&0\end{pmatrix}`}</Eq>
        <Tx>{R`其中 $I_m$ 是 $m\times m$ 单位矩阵。由于 $J_p$ 的分量在每点都是常数（并且在所有全纯卡中相同），可以定义光滑张量场 $J$，使其在 $p$ 点的分量为 \eqref{8.18}。张量场 $J$ 称为复流形 $M$ 的**殆复结构**（almost complex structure）。注意任何 $2m$ 维流形*局部*都有平方为 $-I_{2m}$ 的张量场 $J$；但只有在复流形上，$J$ 才能跨卡拼接、在*整体*上定义。张量 $J$ 完全确定复结构（§8.7 的 Newlander–Nirenberg 定理）。

把殆复结构 $J_p$ 延拓到 $T_pM^\C$ 上：`}</Tx>
        <Eq n="8.19" say={R`把 $J$ 复线性地延拓到复化切空间。`}>{R`J_p(X+\mathrm{i}Y)\equiv J_pX+\mathrm{i}J_pY.`}</Eq>
        <Tx>{R`由 \eqref{8.16} 得`}</Tx>
        <Eq n="8.20" title={R`$J$ 的本征向量`} say={R`全纯基向量是 $J$ 的本征值 $+\mathrm{i}$ 的本征向量，反全纯基向量对应 $-\mathrm{i}$：$J$ 在复基下对角化。`}>{R`J_p\,\partial/\partial z^\mu=\mathrm{i}\,\partial/\partial z^\mu\qquad J_p\,\partial/\partial\bar z^\mu=-\mathrm{i}\,\partial/\partial\bar z^\mu.`}</Eq>
        <Tx>{R`（例如 $J_p\partial_{z^\mu}=\frac12(\partial_{y^\mu}+\mathrm{i}\partial_{x^\mu})=\mathrm{i}\cdot\frac12(\partial_{x^\mu}-\mathrm{i}\partial_{y^\mu})$。）于是得到 $J_p$ 在（反）全纯基下的表达式`}</Tx>
        <Eq n="8.21" say={R`$J$ 在复基下的张量写法：在全纯方向上乘 $\mathrm{i}$，在反全纯方向上乘 $-\mathrm{i}$。`}>{R`J_p=\mathrm{i}\,\dd z^\mu\otimes\frac{\partial}{\partial z^\mu}-\mathrm{i}\,\dd\bar z^\mu\otimes\frac{\partial}{\partial\bar z^\mu}`}</Eq>
        <Tx>{R`其分量为`}</Tx>
        <Eq n="8.22" title="复基下的殆复结构" say={R`在 $(\partial_z;\partial_{\bar z})$ 基下 $J$ 是对角矩阵 $\mathrm{diag}(\mathrm{i},-\mathrm{i})$——这就是"$J$ 把复化切空间一分为二"的矩阵表述。`}>{R`J_p=\begin{pmatrix}\mathrm{i}I_m&0\\ 0&-\mathrm{i}I_m\end{pmatrix}.`}</Eq>
        <Tx>{R`设 $Z\in T_pM^\C$ 形如 $Z=Z^\mu\partial/\partial z^\mu$，则 $Z$ 是 $J_p$ 的本征向量，$J_pZ=\mathrm{i}Z$。类似地，$Z=Z^\mu\partial/\partial\bar z^\mu$ 满足 $J_pZ=-\mathrm{i}Z$。这样，复流形的 $T_pM^\C$ 被分成两个*不相交*（交为 $\{0\}$）的向量空间：`}</Tx>
        <Eq n="8.23" keyEq title="复化切空间的分解" say={R`复化切空间等于全纯向量空间与反全纯向量空间的直和，二者各占一半维数。`}>{R`T_pM^\C=T_pM^+\oplus T_pM^-`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="8.24" say={R`按 $J$ 的本征值 $\pm\mathrm{i}$ 分类向量。`}>{R`T_pM^\pm=\{Z\in T_pM^\C\mid J_pZ=\pm\mathrm{i}Z\}.`}</Eq>
        <Tx>{R`定义投影算子 $\mathcal{P}^\pm:T_pM^\C\to T_pM^\pm$：`}</Tx>
        <Eq n="8.25" title="全纯 / 反全纯投影" say={R`投影算子：$\frac12(1\mp\mathrm{i}J)$ 在 $+\mathrm{i}$ 本征空间上分别是 $1$ 与 $0$，在 $-\mathrm{i}$ 本征空间上分别是 $0$ 与 $1$。`}>{R`\mathcal{P}^\pm\equiv\tfrac12(I_{2m}\mp\mathrm{i}J_p).`}</Eq>
        <Tx>{R`事实上，对任意 $Z\in T_pM^\C$，$J_p\mathcal{P}^\pm Z=\frac12(J_p\mp\mathrm{i}J_p^2)Z=\pm\mathrm{i}\mathcal{P}^\pm Z$。因此`}</Tx>
        <Eq n="8.26" say={R`任何复向量投影后的两部分分别是全纯向量与反全纯向量。`}>{R`Z^\pm\equiv\mathcal{P}^\pm Z\in T_pM^\pm.`}</Eq>
        <Tx>{R`于是 $Z\in T_pM^\C$ 唯一地分解为 $Z=Z^++Z^-$（$Z^\pm\in T_pM^\pm$；$\mathcal{P}^++\mathcal{P}^-=I_{2m}$）。$T_pM^+$ 由 $\{\partial/\partial z^\mu\}$ 张成，$T_pM^-$ 由 $\{\partial/\partial\bar z^\mu\}$ 张成。$Z\in T_pM^+$ 称为**全纯向量**（holomorphic vector），$Z\in T_pM^-$ 称为**反全纯向量**（anti-holomorphic vector）。容易验证`}</Tx>
        <Eq n="8.27" say={R`反全纯向量恰好是全纯向量的复共轭：$J$ 是实的，所以共轭把 $+\mathrm{i}$ 本征空间映到 $-\mathrm{i}$ 本征空间。`}>{R`T_pM^-=\nosym{\overline{T_pM^+}}=\{\overline Z\mid Z\in T_pM^+\}.`}</Eq>
        <Tx>{R`（若 $J_pZ=\mathrm{i}Z$，取共轭并用 $J_p$ 为实算子：$J_p\overline Z=\nosym{\overline{J_pZ}}=-\mathrm{i}\overline Z$。）注意

$$\dim_\C T_pM^+=\dim_\C T_pM^-=\tfrac12\dim_\C T_pM^\C=\dim_\C M.$$`}</Tx>
        <Box kind="warning" title={R`勘误：$\dim_\C T_pM^\pm=\dim_\C M$（p.339）`}>{R`原书最后一个等号写作 $\frac12\dim_\C M$。$\dim_\C T_pM^\C=\dim_\R M=2m$，所以 $\frac12\dim_\C T_pM^\C=m=\dim_\C M$（或写成 $\frac12\dim_\R M$）；$\frac12\dim_\C M=m/2$ 显然不对（$T_pM^+$ 由 $m$ 个向量 $\partial/\partial z^\mu$ 张成）。正文已改正。`}</Box>
        <Exercise n="8.2" title={R`$T_pM^\pm$ 的分解与卡无关`} level="★"
          hint={R`对 $w=w(z)$ 用复链式法则：$\dfrac{\partial}{\partial z^\mu}=\dfrac{\partial w^\nu}{\partial z^\mu}\dfrac{\partial}{\partial w^\nu}+\dfrac{\partial\bar w^\nu}{\partial z^\mu}\dfrac{\partial}{\partial\bar w^\nu}$，再说明第二项系数为零。`}
          solution={R`**复链式法则。**把 $\partial/\partial z^\mu=\frac12(\partial_{x^\mu}-\mathrm{i}\partial_{y^\mu})$ 用实链式法则展开到 $(u,v)$ 上，再把 $\partial_u,\partial_v$ 用 $\partial_w=\frac12(\partial_u-\mathrm{i}\partial_v)$、$\partial_{\bar w}=\frac12(\partial_u+\mathrm{i}\partial_v)$ 表示（即 $\partial_u=\partial_w+\partial_{\bar w}$，$\partial_v=\mathrm{i}(\partial_w-\partial_{\bar w})$），整理后得到

$$\frac{\partial}{\partial z^\mu}=\frac{\partial w^\nu}{\partial z^\mu}\frac{\partial}{\partial w^\nu}+\frac{\partial\bar w^\nu}{\partial z^\mu}\frac{\partial}{\partial\bar w^\nu},$$

其中 $\partial w^\nu/\partial z^\mu$ 等按 \eqref{8.13a} 计算。（这对任意光滑的 $w(z)$ 都成立：把两边作用在 $w^\lambda$ 与 $\bar w^\lambda$ 上，用 \eqref{8.15b} 型的关系 $\partial w^\lambda/\partial w^\nu=\delta$、$\partial\bar w^\lambda/\partial w^\nu=0$ 即可核对。）

**全纯性。**$w^\nu$ 是 $z$ 的全纯函数，所以 $\partial w^\nu/\partial\bar z^\mu=0$；取共轭，$\partial\bar w^\nu/\partial z^\mu=\nosym{\overline{\partial w^\nu/\partial\bar z^\mu}}=0$。于是

$$X=X^\mu\frac{\partial}{\partial z^\mu}=X^\mu\frac{\partial w^\nu}{\partial z^\mu}\frac{\partial}{\partial w^\nu},$$

只含全纯基 $\{\partial/\partial w^\nu\}$，分量按全纯 Jacobi 矩阵变换：$X'^\nu=X^\mu\partial w^\nu/\partial z^\mu$。所以"全纯向量"的概念不依赖于卡；$T_pM^\C$ 到 $T_pM^\pm$ 的分解与卡无关——这也与 $J$ 与卡无关（因而其本征空间与卡无关）相吻合。`}>
          {R`设 $(U,\varphi)$、$(V,\psi)$ 是复流形 $M$ 上重叠的卡，$z^\mu=\varphi(p)$，$w^\mu=\psi(p)$。验证 $X=X^\mu\partial/\partial z^\mu$ 用坐标 $w^\mu$ 表示时只含全纯基 $\{\partial/\partial w^\mu\}$。从而 $T_pM^\C$ 到 $T_pM^\pm$ 的分解与卡无关（注意 $J$ 的定义与卡无关）。`}
        </Exercise>
        <Tx>{R`给定复化向量场 $Z\in\mathcal{X}(M)^\C$，在每点定义 $JZ|_p=J_p\cdot Z|_p$，得到新的向量场 $JZ\in\mathcal{X}(M)^\C$。向量场 $Z$ 自然地分解为`}</Tx>
        <Eq n="8.28" say={R`逐点投影，把复向量场分成全纯部分与反全纯部分。`}>{R`Z=Z^++Z^-\qquad Z^\pm=\mathcal{P}^\pm Z`}</Eq>
        <Tx>{R`向量场 $Z^+$（$Z^-$）称为**全纯**（**反全纯**）**向量场**。因此一旦给定 $J$，$\mathcal{X}(M)^\C$ 就唯一地分解为`}</Tx>
        <Eq n="8.29" say={R`复向量场的空间等于全纯向量场与反全纯向量场的直和。`}>{R`\mathcal{X}(M)^\C=\mathcal{X}(M)^+\oplus\mathcal{X}(M)^-.`}</Eq>
        <Tx>{R`$Z=Z^++Z^-\in\mathcal{X}(M)^\C$ 为实向量场，当且仅当 $Z^+=\overline{Z}^-$。

［注意术语：这里"全纯向量场"只指 $Z\in\mathcal{X}(M)^+$，即只含 $\partial/\partial z^\mu$ 分量，其系数 $Z^\mu$ 可以是任意光滑复函数；系数本身也全纯的向量场，在复几何文献里有时另称"全纯切向量场"。］`}</Tx>
        <Exercise n="8.3" title="全纯向量场的括号仍全纯" level="★"
          hint={R`在一张卡里写 $X=X^\mu\partial_\mu$、$Y=Y^\nu\partial_\nu$（$\partial_\mu=\partial/\partial z^\mu$），用 $[\partial_\mu,\partial_\nu]=0$。`}
          solution={R`取 $X=X^\mu\partial/\partial z^\mu$，$Y=Y^\nu\partial/\partial z^\nu$，$X^\mu,Y^\nu\in\mathcal{F}(U)^\C$。由于 $\partial/\partial z^\mu$ 是 $\partial/\partial x$、$\partial/\partial y$ 的**常系数**组合，它们彼此可交换：$[\partial_\mu,\partial_\nu]=0$。于是（李括号对复系数照常满足 $[fA,gB]=fA[g]B-gB[f]A+fg[A,B]$）

$$[X,Y]=X^\mu\frac{\partial Y^\nu}{\partial z^\mu}\frac{\partial}{\partial z^\nu}-Y^\nu\frac{\partial X^\mu}{\partial z^\nu}\frac{\partial}{\partial z^\mu}=\left(X^\mu\frac{\partial Y^\lambda}{\partial z^\mu}-Y^\mu\frac{\partial X^\lambda}{\partial z^\mu}\right)\frac{\partial}{\partial z^\lambda}\in\mathcal{X}(M)^+.$$

注意 $X[Y^\nu]=X^\mu\partial_\mu Y^\nu$ 中只出现 $\partial/\partial z$ 方向的导数，不会产生 $\partial/\partial\bar z$ 分量。取复共轭（括号与共轭可交换，见 \eqref{8.10}）得到反全纯情形：$X,Y\in\mathcal{X}(M)^-\Rightarrow[X,Y]\in\mathcal{X}(M)^-$。

**评注：**这里用到了"存在全纯坐标，使 $T_pM^+$ 由交换的坐标向量场张成"。在一般的殆复流形上没有这样的坐标，括号的封闭性不再自动成立——它正是 §8.7 的**可积性**条件（\sref{D8.6}），由 Nijenhuis 张量刻画（\sref{T8.12}）。`}>
          {R`设 $X,Y\in\mathcal{X}(M)^+$。证明 $[X,Y]\in\mathcal{X}(M)^+$。［若 $X,Y\in\mathcal{X}(M)^-$，则 $[X,Y]\in\mathcal{X}(M)^-$。］`}
        </Exercise>
      </Sub>
    </Sec>);
}
