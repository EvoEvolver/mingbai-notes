// §7.5 和乐 + §7.6 等距与共形变换 —— 式 (7.90)–(7.119)，定义 7.3–7.5，命题 7.1，例 7.7–7.9，习题 7.14–7.16；交互图 1（球面上的和乐）
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, C } from "@kit";
import { HolonomyLab, HolonomyPlot } from "./_ch07_demos.jsx";

const R = String.raw;

export function Sec75() {
  return (
    <Sec n="7.5" title="Holonomy" zh="和乐"
      gist={R`沿 $p$ 处的闭合回路平行移动，得到线性变换 $P_c:T_pM\to T_pM$；它们组成和乐群 $H(p)$（\sref{D7.3}）→ 连通流形上各点的和乐群共轭 → 度规联络的和乐群 $\subset\mathrm{SO}(m)$ → $S^2$ 上沿纬圈 $\theta_0$ 一圈，向量转过 $2\pi\cos\theta_0$（等价于所围面积），$H(p)=\mathrm{SO}(2)$。`}
      why={R`曲率 \eqref{7.44} 是无穷小回路的效应；和乐是它的整体、有限版本。它在物理中就是 Aharonov–Bohm 相位、Berry 相位与 Foucault 摆的进动（第 10 章把它推广到纤维丛）。`}
      gives={["7.90", "7.92", "7.93a", "7.94", "7.95"]}>
      <p className="muted">本节概念：<C id="holonomy" /></p>
      <Tx>{R`设 $(M,g)$ 是带仿射联络 $\nabla$ 的 $m$ 维 Riemann 流形。联络在每个切空间 $T_pM$ 上自然地定义一个变换群，如下。`}</Tx>
      <Stmt id="D7.3" />
      <Eq n="7.90" title="和乐变换" say={R`沿一个闭合回路把切向量平行移动一圈，回到起点时得到的向量与原向量线性相关：回路给出切空间上的一个线性变换。`}>{R`P_c:T_pM\to T_pM.`}</Eq>
      <Tx>{R`我们约定 $H(p)$ 从右边作用在 $T_pM$ 上：$P_cX=Xh$（$h\in H(p)$），分量形式为 $P_cX=X^\mu h_\mu{}^\nu e_\nu$，$\{e_\nu\}$ 是 $T_pM$ 的基。容易看出 $H(p)$ 是群。乘积 $P_{c'}P_c$ 对应先沿 $c$、再沿 $c'$ 平行移动。若写 $P_d=P_{c'}P_c$，回路 $d$ 为`}</Tx>
      <Eq n="7.91" say={R`两个回路首尾相接、各用一半时间走完，就是和乐群中的乘积。`}>{R`d(t)=\begin{cases}c(2t)&0\le t\le\frac12\\c'(2t-1)&\frac12\le t\le1.\end{cases}`}</Eq>
      <Tx>{R`单位元对应常值映射 $c_p(t)=p$（$0\le t\le1$），$P_c$ 的逆为 $P_{c^{-1}}$，其中 $c^{-1}(t)=c(1-t)$。（平行移动方程 \eqref{7.18b} 是线性 ODE，反向积分恰好撤销正向积分。）注意 $H(p)$ 是 $\mathrm{GL}(m,\R)$ 的子群，$\mathrm{GL}(m,\R)$ 是可能的最大和乐群。若 $M$ 单连通，$H(p)$ 平凡当且仅当 Riemann 张量为零。特别地，若 $(M,g)$ 可平行化（见例 7.2），可以让 $H(p)$ 平凡。`}</Tx>
      <Box kind="warning" title={R`存疑/补充：$H(p)$ 平凡 $\iff R=0$ 需要单连通（p.292）`}>{R`原书写"$H(p)$ 平凡当且仅当 Riemann 张量为零"，未加条件。"$H(p)$ 平凡 $\Rightarrow R=0$"总成立（由 \eqref{7.44}，无穷小回路的和乐就是曲率）。反方向只对**单连通**流形（或只考虑可缩回路的"限制和乐群"）成立：平坦的锥面（去掉顶点）上，绕顶点一圈的回路把向量转过"亏角"，和乐群是非平凡的离散群。章末习题 7.3 的宇宙弦时空正是这样的例子。`}</Box>
      <Tx>{R`若 $M$（道路）连通，任意两点 $p,q\in M$ 都可由曲线 $a$ 连接。曲线 $a$ 定义映射 $\tau_a:T_pM\to T_qM$（沿 $a$ 把 $T_pM$ 中的向量平行移动到 $T_qM$）。于是和乐群 $H(p)$ 与 $H(q)$ 的关系为（$q$ 处的回路 $a^{-1}\cdot c\cdot a$ 与 $p$ 处的回路 $c$ 一一对应）`}</Tx>
      <Eq n="7.92" say={R`换一个基点，和乐群只是被"平移的平行移动"共轭了一下，作为抽象群不变。`}>{R`H(q)=\tau_a^{-1}H(p)\tau_a`}</Eq>
      <Tx>{R`所以 $H(q)$ 与 $H(p)$ 同构。

一般地，和乐群是 $\mathrm{GL}(m,\R)$ 的子群。若 $\nabla$ 是度规联络，$\nabla$ 保持向量长度：对 $X\in T_pM$，$g_p(P_c(X),P_c(X))=g_p(X,X)$。于是若 $(M,g)$ 可定向且为 Riemann 流形，和乐群必是 $\mathrm{SO}(m)$ 的子群；若可定向且为 Lorentz 流形，则是 $\mathrm{SO}(m-1,1)$ 的子群。`}</Tx>
      <Box kind="example" n="7.7" title={R`$S^2$ 的和乐群`}>
        <Tx>{R`我们来求 $S^2$ 上（度规 $g=\dd\theta\otimes\dd\theta+\sin^2\theta\,\dd\phi\otimes\dd\phi$）Levi-Civita 联络的和乐群。非零的联络系数为 $\Gamma^\theta{}_{\phi\phi}=-\sin\theta\cos\theta$ 与 $\Gamma^\phi{}_{\phi\theta}=\Gamma^\phi{}_{\theta\phi}=\cot\theta$。为简单起见，取点 $(\theta_0,0)$ 处的向量 $e_\theta=\partial/\partial\theta$，沿圆周 $\theta=\theta_0$，$0\le\phi\le2\pi$ 平行移动。设 $X$ 为 $e_\theta$ 沿圆周平行移动所得的向量。以 $\phi$ 为曲线参数（$\dd\theta/\dd\phi=0$、$\dd\phi/\dd\phi=1$），由 \eqref{7.18b}，$X=X^\theta e_\theta+X^\phi e_\phi$ 满足`}</Tx>
        <Eq n="7.93a" say={R`沿纬圈搬运时，$\theta$ 分量的变化由 $\phi$ 分量驱动。`}>{R`\partial_\phi X^\theta-\sin\theta_0\cos\theta_0X^\phi=0`}</Eq>
        <Eq n="7.93b" say={R`$\phi$ 分量的变化由 $\theta$ 分量驱动——两式合起来是一个"转动"方程。`}>{R`\partial_\phi X^\phi+\cot\theta_0X^\theta=0.`}</Eq>
        <Tx>{R`\eqref{7.93a} 与 \eqref{7.93b} 描述简谐振动。事实上，对 \eqref{7.93a} 关于 $\phi$ 求导并用 \eqref{7.93b}，得`}</Tx>
        <Eq n="7.94" say={R`向量的 $\theta$ 分量随 $\phi$ 做简谐振动，角频率 $\cos\theta_0$：在赤道上（$\cos\theta_0=0$）完全不转。`}>{R`\frac{\dd^2X^\theta}{\dd\phi^2}-\sin\theta_0\cos\theta_0\frac{\dd X^\phi}{\dd\phi}=\frac{\dd^2X^\theta}{\dd\phi^2}+\cos^2\theta_0X^\theta=0.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{7.94} 中的符号（p.292）`}>{R`原书第二个等号后印作 $\frac{\dd^2X^\theta}{\dd\phi^2}-\cos^2\theta_0X^\theta=0$。代入 \eqref{7.93b}：$-\sin\theta_0\cos\theta_0\cdot(-\cot\theta_0X^\theta)=+\cos^2\theta_0X^\theta$，所以是**加**号——只有这样才是原书紧接着说的"简谐振动"，其通解才是 $A\cos(C_0\phi)+B\sin(C_0\phi)$（减号给出双曲函数）。正文已改正。`}</Box>
        <Tx>{R`通解为 $X^\theta=A\cos(C_0\phi)+B\sin(C_0\phi)$，其中 $C_0\equiv\cos\theta_0$。由 $\phi=0$ 时 $X^\theta=1$、$X^\phi=0$（由 \eqref{7.93a}，$\partial_\phi X^\theta|_0=0$，故 $B=0$），得

$$X^\theta=\cos(C_0\phi)\qquad X^\phi=-\frac{\sin(C_0\phi)}{\sin\theta_0}.$$

沿圆周平行移动一圈后，得到`}</Tx>
        <Eq n="7.95" title="纬圈的和乐" say={R`走完一圈纬圈，向量相对于坐标标架转过 $2\pi\cos\theta_0$；模 $2\pi$ 等价于所围极冠的面积 $2\pi(1-\cos\theta_0)$——Gauss–Bonnet 的雏形。`}>{R`X(\phi=2\pi)=\cos(2\pi C_0)e_\theta-\frac{\sin(2\pi C_0)}{\sin\theta_0}e_\phi.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{7.95} 中 $\sin(2\pi C_0)$（p.293）`}>{R`原书第二项印作 $\sin(2\pi C_0\phi)/\sin\theta_0$，多了一个 $\phi$：这里已代入 $\phi=2\pi$，应为 $\sin(2\pi C_0)$。正文已改正；交互图 1 的"纬圈"模式逐位核对了这两个分量。`}</Box>
        <Tx>{R`现在向量转过了 $\Theta=2\pi\cos\theta_0$，长度不变（$e_\theta$ 的长度为 1，$e_\phi$ 的长度为 $\sin\theta_0$，$|X|^2=\cos^2+\sin^2=1$）。［$\Theta$ 是相对于标架 $e_\theta,e_\phi$ 的转角，方向从 $e_\theta$ 转向 $-e_\phi$。$(e_\theta,e_\phi)$（向南、向东）从球外看是逆时针定向的（$\hat e_\theta\times\hat e_\phi=\hat r$），所以按这个定向，转角是 $-2\pi\cos\theta_0\equiv2\pi(1-\cos\theta_0)\pmod{2\pi}$——恰是回路（沿 $\phi$ 增加方向，从外看绕北极逆时针）左侧所围北极冠的面积，与 \eqref{7.44} 积分后的结论"转角 $=\iint K\,\dd A$"一致。］若取 $p\in S^2$ 与过 $p$ 的圆，总能选坐标使该圆为 $\theta=\theta_0$（$0\le\theta<\pi$），并套用上面的计算。转角范围为 $-2\pi\le\Theta<2\pi$，所以 $p\in S^2$ 处的和乐群是 $\mathrm{SO}(2)$。`}</Tx>
      </Box>
      <HolonomyLab />
      <HolonomyPlot />
      <Tx>{R`一般地，$S^m$（$m\ge2$）的和乐群是 $\mathrm{SO}(m)$。乘积流形的和乐群更受限制。下面的例子取自 Horowitz（1986）。考虑由带标准度规的球面构成的六维流形，例如 $S^6$、$S^3\times S^3$、$S^2\times S^2\times S^2$、$T^6=S^1\times\cdots\times S^1$。它们的和乐群为：

(i) $S^6$：$H(p)=\mathrm{SO}(6)$。
(ii) $S^3\times S^3$：$H(p)=\mathrm{SO}(3)\times\mathrm{SO}(3)$。
(iii) $S^2\times S^2\times S^2$：$H(p)=\mathrm{SO}(2)\times\mathrm{SO}(2)\times\mathrm{SO}(2)$。
(iv) $T^6$：$H(p)$ 平凡，因为 Riemann 张量为零（且平坦环面的平行移动与路径无关）。

（乘积流形上，各因子方向的平行移动互不混合，所以和乐群是各因子和乐群的直积。弦论紧化中著名的 Calabi–Yau 流形就是和乐群为 $\mathrm{SU}(3)\subsetneq\mathrm{SO}(6)$ 的六维流形。）`}</Tx>
      <Exercise n="7.14" title="Poincaré 度规的和乐群" level="★★"
        hint={R`上半平面可定向，Levi-Civita 联络是度规联络，所以 $H(p)\subset\mathrm{SO}(2)$。再说明任意转角都能实现：利用"转角 = $\iint K\,\dd A$（模 $2\pi$）"与 $K=-1$，并找到所围面积可以任意大的回路。`}
        solution={R`**$H(p)\subset\mathrm{SO}(2)$。**上半平面 $U$ 可定向，Levi-Civita 联络保持长度与定向（平行移动是连续依赖于回路的保长线性映射，在 $t=0$ 时为恒等），所以每个 $P_c\in\mathrm{SO}(2)$。

**转角公式。**对二维 Riemann 流形中围成单连通区域 $D$ 的逆时针简单闭曲线，把 \eqref{7.44} 积分（把 $D$ 剖分成无穷小四边形，相邻四边形的公共边上的贡献抵消），平行移动一圈的转角为

$$\Theta=\iint_DK\,\Omega_M\pmod{2\pi}.$$

（交互图 1 在球面上数值验证了这一点：$K=1$，转角 = 面积。）Poincaré 度规的 $K=-1$（交互图 3），所以 $\Theta=-\mathrm{Area}(D)$。

**任意转角都能实现。**以 $p=(x_0,y_0)$ 为一点、圆心在 $(x_0,y_0\cosh\rho)$、"双曲半径" $\rho$ 的圆 $\{(x-x_0)^2+(y-y_0\cosh\rho)^2=y_0^2\sinh^2\rho\}$ 是双曲圆（与 $p$ 的双曲距离处处为 $\rho$ 的点集，平移到经过所需基点即可），其双曲面积为 $2\pi(\cosh\rho-1)$，随 $\rho$ 从 $0$ 连续增长到 $\infty$。所以转角 $-2\pi(\cosh\rho-1)$ 取遍所有实数，模 $2\pi$ 取遍 $\mathrm{SO}(2)$。于是 $H(p)=\mathrm{SO}(2)$。

（与球面对比：$S^2$ 上所围面积不超过 $4\pi$，但模 $2\pi$ 已足以覆盖 $\mathrm{SO}(2)$；上半平面单连通且 $K\neq0$，与"$R\neq0\Rightarrow H$ 非平凡"一致。）`}>
        {R`证明例 7.6 中 Poincaré 度规的 Levi-Civita 联络的和乐群是 $\mathrm{SO}(2)$。`}
      </Exercise>
    </Sec>);
}

export function Sec76() {
  return (
    <Sec n="7.6" title="Isometries and conformal transformations" zh="等距与共形变换"
      gist={R`等距 $f^*g=g$（\sref{D7.4}）是刚体运动；共形变换 $f^*g=\mathrm{e}^{2\sigma}g$（\sref{D7.5}）保角不保长；Weyl 重标度 $g\to\mathrm{e}^{2\sigma}g$ → 全纯函数是共形映射 → 共形相关度规的联络之差（\sref{P7.1}）与曲率之差 \eqref{7.110} → 与 $\sigma$ 无关的 Weyl 张量；二维流形总是共形平坦（等温坐标）。`}
      why={R`对称性（等距）是 Killing 向量与守恒量的来源；共形结构则是弦论、二维共形场论与光锥（因果）结构的核心——光锥只依赖于度规的共形类。`}
      gives={["7.96a", "7.97a", "7.98", "7.99", "7.103", "7.106", "7.110", "7.115", "7.117a", "7.119"]}>
      <p className="muted">本节概念：<C id="isometry" /></p>
      <Sub n="7.6.1" title="Isometries" zh="等距">
        <Stmt id="D7.4" />
        <Eq n="7.96a" say={R`等距：把度规从 $f(p)$ 拉回到 $p$，与 $p$ 点原有的度规相同——映射前后所有长度、角度不变。`}>{R`f^*g_{f(p)}=g_p`}</Eq>
        <Tx>{R`用分量写，条件 \eqref{7.96a} 成为`}</Tx>
        <Eq n="7.96b" say={R`等距的分量条件：新点的度规分量经 Jacobi 矩阵变换后，等于旧点的度规分量。`}>{R`\frac{\partial y^\alpha}{\partial x^\mu}\frac{\partial y^\beta}{\partial x^\nu}g_{\alpha\beta}(f(p))=g_{\mu\nu}(p)`}</Eq>
        <Tx>{R`其中 $x$、$y$ 分别是 $p$ 与 $f(p)$ 的坐标。恒等映射、等距的复合、等距的逆都是等距；全体等距构成一个群。由于等距保持向量（特别是无穷小位移向量）的**长度**，可以把它看作刚体运动。例如在 $\R^n$ 中，Euclid 群 $E^n$，即映射 $f:x\mapsto Ax+T$（$A\in\mathrm{SO}(n)$，$T\in\R^n$）的集合，是等距群。（若允许反射，$A\in\mathrm{O}(n)$ 给出完整的等距群；$A\in\mathrm{SO}(n)$ 对应保定向的部分。）`}</Tx>
      </Sub>

      <Sub n="7.6.2" title="Conformal transformations" zh="共形变换">
        <Stmt id="D7.5" />
        <Eq n="7.97a" say={R`共形变换：拉回的度规只差一个逐点的正因子 $\mathrm{e}^{2\sigma}$——局部是"放大镜"，各方向等比例缩放。`}>{R`f^*g_{f(p)}=\mathrm{e}^{2\sigma}g_p\qquad\sigma\in\mathcal{F}(M)`}</Eq>
        <Tx>{R`用分量写，条件 \eqref{7.97a} 成为`}</Tx>
        <Eq n="7.97b" say={R`共形变换的分量条件。`}>{R`\frac{\partial y^\alpha}{\partial x^\mu}\frac{\partial y^\beta}{\partial x^\nu}g_{\alpha\beta}(f(p))=\mathrm{e}^{2\sigma(p)}g_{\mu\nu}(p).`}</Eq>
        <Tx>{R`$M$ 上共形变换的集合是一个群，称为**共形群**，记作 $\mathrm{Conf}(M)$。定义两个向量 $X=X^\mu\partial_\mu$、$Y=Y^\mu\partial_\mu\in T_pM$ 之间的夹角 $\theta$：`}</Tx>
        <Eq n="7.98" say={R`用度规定义夹角：内积除以两个长度。`}>{R`\cos\theta=\frac{g_p(X,Y)}{\sqrt{g_p(X,X)g_p(Y,Y)}}=\frac{g_{\mu\nu}X^\mu Y^\nu}{\sqrt{g_{\zeta\eta}X^\zeta X^\eta g_{\kappa\lambda}Y^\kappa Y^\lambda}}.`}</Eq>
        <Tx>{R`若 $f$ 是共形变换，$f_*X$ 与 $f_*Y$ 的夹角 $\theta'$ 为

$$\cos\theta'=\frac{\mathrm{e}^{2\sigma}g_{\mu\nu}X^\mu Y^\nu}{\sqrt{\mathrm{e}^{2\sigma}g_{\zeta\eta}X^\zeta X^\eta\cdot\mathrm{e}^{2\sigma}g_{\kappa\lambda}Y^\kappa Y^\lambda}}=\cos\theta$$

所以 $f$ 保持角度。换言之，$f$ 改变**尺度**而不改变**形状**。

与共形变换相关的概念是 Weyl 重标度。设 $g$ 与 $\bar g$ 是 $M$ 上的度规。若`}</Tx>
        <Eq n="7.99" say={R`共形相关：两个度规在每点只差一个正的标度因子。`}>{R`\bar g_p=\mathrm{e}^{2\sigma(p)}g_p`}</Eq>
        <Tx>{R`就说 $\bar g$ 与 $g$ **共形相关**（conformally related）。这显然是度规集合上的等价关系，其等价类称为**共形结构**（conformal structure）。变换 $g\to\mathrm{e}^{2\sigma}g$ 称为 **Weyl 重标度**（Weyl rescaling），$M$ 上 Weyl 重标度的集合是一个群，记作 $\mathrm{Weyl}(M)$。`}</Tx>
        <Box kind="example" n="7.8" title="全纯函数是共形映射">
          <Tx>{R`设 $w=f(z)$ 是复平面 $\C$ 上的全纯函数。［把 $C^\infty$ 函数看作 $z=x+\mathrm{i}y$ 与 $\bar z=x-\mathrm{i}y$ 的函数，若 $\partial_{\bar z}f(z,\bar z)=0$，就称它是全纯的。］把两个变量的实部与虚部写作 $z=x+\mathrm{i}y$、$w=u+\mathrm{i}v$。映射 $f:(x,y)\mapsto(u,v)$ 是共形的，因为`}</Tx>
          <Eq n="7.100" say={R`全纯映射把平面度规乘一个因子 $|f'(z)|^2$：无穷小圆仍是圆，只是被放大了。`}>{R`\begin{aligned}\dd u^2+\dd v^2&=\left(\frac{\partial u}{\partial x}\dd x+\frac{\partial u}{\partial y}\dd y\right)^2+\left(\frac{\partial v}{\partial x}\dd x+\frac{\partial v}{\partial y}\dd y\right)^2\\&=\left[\left(\frac{\partial u}{\partial x}\right)^2+\left(\frac{\partial u}{\partial y}\right)^2\right](\dd x^2+\dd y^2)\end{aligned}`}</Eq>
          <Tx>{R`这里用了 Cauchy–Riemann 关系

$$\frac{\partial u}{\partial x}=\frac{\partial v}{\partial y}\qquad\frac{\partial u}{\partial y}=-\frac{\partial v}{\partial x}.$$

（展开后交叉项 $2(u_xu_y+v_xv_y)\dd x\dd y=2(u_xu_y-u_yu_x)\dd x\dd y=0$，$\dd y^2$ 的系数 $u_y^2+v_y^2=u_y^2+u_x^2$。）因子 $u_x^2+u_y^2=|f'(z)|^2$，在 $f'(z)=0$ 的点退化，那里 $f$ 不是局部微分同胚。`}</Tx>
        </Box>
        <Exercise n="7.15" title="共形变换保持光锥" level="★"
          hint={R`$g(f_*X,f_*X)=\mathrm{e}^{2\sigma}g(X,X)$，而 $\mathrm{e}^{2\sigma}>0$。`}
          solution={R`由 \eqref{7.97a}，对 $X\in T_pM$：$g_{f(p)}(f_*X,f_*X)=\mathrm{e}^{2\sigma(p)}g_p(X,X)$。由于 $\mathrm{e}^{2\sigma}>0$，两边同号：$g(X,X)<0\Rightarrow g(f_*X,f_*X)<0$（类时 → 类时），$=0\Rightarrow=0$（类光 → 类光），$>0\Rightarrow>0$（类空 → 类空），即 \eqref{7.101}（\eqref{7.4} 的分类被保持）。又因 $f$ 是微分同胚，$f_*$ 可逆，逆映射 $(f^{-1})_*$ 也是共形的，所以 $f_*$ 把 $p$ 处的光锥**一一地**映到 $f(p)$ 处的光锥上。

物理意义：因果结构（哪些事件能用光信号联系）只依赖度规的共形类。共形平坦的时空（如 Robertson–Walker 宇宙在共形时间下）与 Minkowski 时空有相同的局部光锥结构。`}>
          {R`设 $f:M\to M$ 是 Lorentz 流形 $(M,g)$ 上的共形变换。证明 $f_*:T_pM\to T_{f(p)}M$ 保持局部光锥结构，即`}
        </Exercise>
        <Eq n="7.101" say={R`共形变换不改变向量的因果类型：光锥被映到光锥。`}>{R`f_*:\begin{cases}\text{类时向量}\mapsto\text{类时向量}\\\text{类光向量}\mapsto\text{类光向量}\\\text{类空向量}\mapsto\text{类空向量}.\end{cases}`}</Eq>
        <Tx>{R`**共形相关度规的曲率。**设 $\bar g$ 是 $M$ 上与 $g$ 共形相关的度规 $\bar g=\mathrm{e}^{2\sigma(p)}g$。我们来求 $\bar g$ 的 Riemann 张量。可以直接把 $\bar g$ 代入定义式 \eqref{7.42}，但我们采用 Nomizu（1981）的优雅的无坐标推导。设 $K$ 是关于 $\bar g$ 的协变导数 $\bar\nabla$ 与关于 $g$ 的 $\nabla$ 之差，`}</Tx>
        <Eq n="7.102" say={R`两个 Levi-Civita 联络之差：它是一个 $(1,2)$ 型张量（习题 7.5）。`}>{R`K(X,Y)\equiv\bar\nabla_XY-\nabla_XY.`}</Eq>
        <Stmt id="P7.1">
          <Proof steps={[
            { claim: R`由无挠条件，$K(X,Y)=K(Y,X)$。由于 $\bar\nabla_X\bar g=\nabla_Xg=0$，`, tex: R`X[\bar g(Y,Z)]=\bar\nabla_X[\bar g(Y,Z)]=\bar g(\bar\nabla_XY,Z)+\bar g(Y,\bar\nabla_XZ)`, why: R`原书印作 $\bar g(\bar\nabla_X,Z)$，漏了 $Y$。` },
            { claim: R`另一方面，`, tex: R`X[\bar g(Y,Z)]=\nabla_X[\mathrm{e}^{2\sigma}g(Y,Z)]=2X[\sigma]\mathrm{e}^{2\sigma}g(Y,Z)+\mathrm{e}^{2\sigma}[g(\nabla_XY,Z)+g(Y,\nabla_XZ)]` },
            { claim: R`两式相减（再除以 $\mathrm{e}^{2\sigma}$）得 \eqref{7.104a}；轮换 $(X,Y,Z)$ 得 \eqref{7.104b}、\eqref{7.104c}。`, uses: ["7.104a", "7.104b", "7.104c"] },
            { claim: R`组合 (7.104a)+(7.104b)−(7.104c)，用 $K$ 的对称性，得 \eqref{7.105}。` , uses: ["7.105"], why: R`$g(Y,K(X,Z))$ 与 $-g(K(Z,X),Y)$ 相消，$g(X,K(Y,Z))$ 与 $-g(X,K(Z,Y))$ 相消，剩下 $2g(K(X,Y),Z)$。` },
            { claim: R`最后一项改写为 $Z[\sigma]g(X,Y)=g(U,Z)g(X,Y)=g(g(Y,X)U,Z)$。代入 \eqref{7.105}：`, tex: R`g\big(K(X,Y)-X[\sigma]Y-Y[\sigma]X+g(X,Y)U,\ Z\big)=0` },
            { claim: R`由于这对任意 $Z$ 成立（$g$ 非退化），得 \eqref{7.103}。` },
          ]} />
        </Stmt>
        <Eq n="7.103" title="共形变换下联络之差" say={R`Weyl 重标度后联络的改变量只由 $\sigma$ 的梯度决定：两项"沿 $X$、$Y$ 方向的伸缩"减去一项"沿梯度方向的修正"。`}>{R`K(X,Y)=X[\sigma]Y+Y[\sigma]X-g(X,Y)U.`}</Eq>
        <Eq n="7.104a" say={R`度规相容条件在 Weyl 重标度下的差：$K$ 的"对称化"等于 $\sigma$ 的梯度乘度规。`}>{R`g(K(X,Y),Z)+g(Y,K(X,Z))=2X[\sigma]g(Y,Z).`}</Eq>
        <Eq n="7.104b" say={R`同一式，$(X,Y,Z)$ 轮换一次。`}>{R`g(K(Y,X),Z)+g(X,K(Y,Z))=2Y[\sigma]g(X,Z)`}</Eq>
        <Eq n="7.104c" say={R`同一式，再轮换一次。`}>{R`g(K(Z,X),Y)+g(X,K(Z,Y))=2Z[\sigma]g(X,Y).`}</Eq>
        <Eq n="7.105" say={R`与 Christoffel 符号的推导同一个"两加一减"技巧，解出 $K$ 与任意向量的内积。`}>{R`g(K(X,Y),Z)=X[\sigma]g(Y,Z)+Y[\sigma]g(X,Z)-Z[\sigma]g(X,Y).`}</Eq>
        <Tx>{R`$K$ 的分量表示为

$$\begin{aligned}K(e_\mu,e_\nu)&=\bar\nabla_\mu e_\nu-\nabla_\mu e_\nu=(\bar\Gamma^\lambda{}_{\mu\nu}-\Gamma^\lambda{}_{\mu\nu})e_\lambda\\&=e_\mu[\sigma]e_\nu+e_\nu[\sigma]e_\mu-g(e_\mu,e_\nu)g^{\kappa\lambda}\partial_\kappa\sigma\,e_\lambda\end{aligned}$$

由此立即看出`}</Tx>
        <Eq n="7.106" say={R`共形相关度规的 Christoffel 符号：原来的加上三项 $\partial\sigma$。`}>{R`\bar\Gamma^\lambda{}_{\mu\nu}=\Gamma^\lambda{}_{\mu\nu}+\delta^\lambda{}_\nu\partial_\mu\sigma+\delta^\lambda{}_\mu\partial_\nu\sigma-g_{\mu\nu}g^{\kappa\lambda}\partial_\kappa\sigma.`}</Eq>
        <Tx>{R`为求 Riemann 曲率张量，从定义出发：`}</Tx>
        <Eq n="7.107" say={R`把 $\bar\nabla=\nabla+K$ 代入曲率定义，逐项展开。`}>{R`\begin{aligned}\bar R(X,Y)Z&=\bar\nabla_X\bar\nabla_YZ-\bar\nabla_Y\bar\nabla_XZ-\bar\nabla_{[X,Y]}Z\\&=\bar\nabla_X[\nabla_YZ+K(Y,Z)]-\bar\nabla_Y[\nabla_XZ+K(X,Z)]-\{\nabla_{[X,Y]}Z+K([X,Y],Z)\}\\&=\nabla_X\{\nabla_YZ+K(Y,Z)\}+K(X,\nabla_YZ+K(Y,Z))\\&\quad-\nabla_Y\{\nabla_XZ+K(X,Z)\}-K(Y,\nabla_XZ+K(X,Z))\\&\quad-\{\nabla_{[X,Y]}Z+K([X,Y],Z)\}.\end{aligned}`}</Eq>
        <Tx>{R`经过直接但冗长的计算（下面的推导框补全），得到`}</Tx>
        <Eq n="7.108" say={R`共形变换后的曲率 = 原曲率 + $\sigma$ 的二阶导数项（Hessian）+ $\sigma$ 的一阶导数的平方项。`}>{R`\begin{aligned}\bar R(X,Y)Z&=R(X,Y)Z+\langle\nabla_X\dd\sigma,Z\rangle Y-\langle\nabla_Y\dd\sigma,Z\rangle X\\&\quad-g(Y,Z)\nabla_XU+Y[\sigma]Z[\sigma]X\\&\quad-g(Y,Z)U[\sigma]X+X[\sigma]g(Y,Z)U\\&\quad+g(X,Z)\nabla_YU-X[\sigma]Z[\sigma]Y\\&\quad+g(X,Z)U[\sigma]Y-Y[\sigma]g(X,Z)U.\end{aligned}`}</Eq>
        <Derivation title={R`从 \eqref{7.107} 到 \eqref{7.108}（原书"直接但冗长"，本站补全）`} collapsed steps={[
          { tex: R`\bar R(X,Y)Z-R(X,Y)Z=(\nabla_XK)(Y,Z)-(\nabla_YK)(X,Z)+K(X,K(Y,Z))-K(Y,K(X,Z))`, why: R`展开 $\nabla_X\{K(Y,Z)\}=(\nabla_XK)(Y,Z)+K(\nabla_XY,Z)+K(Y,\nabla_XZ)$；$K(Y,\nabla_XZ)$ 与 \eqref{7.107} 中的 $-K(Y,\nabla_XZ)$ 相消；剩下的 $K(\nabla_XY-\nabla_YX-[X,Y],Z)=0$（无挠）。` },
          { tex: R`(\nabla_XK)(Y,Z)=\langle\nabla_X\dd\sigma,Y\rangle Z+\langle\nabla_X\dd\sigma,Z\rangle Y-g(Y,Z)\nabla_XU`, why: R`对 \eqref{7.103} 求协变导数，$\nabla_Xg=0$。对 $X\leftrightarrow Y$ 反对称化后，第一项因 Hessian $\langle\nabla_X\dd\sigma,Y\rangle=\nabla_X\nabla_Y\sigma$ 对称（\eqref{7.54}）而消去，给出 \eqref{7.108} 的第一行与 $-g(Y,Z)\nabla_XU+g(X,Z)\nabla_YU$。` },
          { tex: R`K(X,K(Y,Z))=X[\sigma]Y[\sigma]Z+X[\sigma]Z[\sigma]Y+2Y[\sigma]Z[\sigma]X-g(Y,Z)U[\sigma]X-Y[\sigma]g(X,Z)U-Z[\sigma]g(X,Y)U`, why: R`把 \eqref{7.103} 用两次：$K(Y,Z)[\sigma]=2Y[\sigma]Z[\sigma]-g(Y,Z)U[\sigma]$，$g(X,K(Y,Z))=Y[\sigma]g(X,Z)+Z[\sigma]g(X,Y)-g(Y,Z)X[\sigma]$；两处 $X[\sigma]g(Y,Z)U$ 相消。` },
          { tex: R`K(X,K(Y,Z))-K(Y,K(X,Z))=Y[\sigma]Z[\sigma]X-X[\sigma]Z[\sigma]Y-g(Y,Z)U[\sigma]X+g(X,Z)U[\sigma]Y+X[\sigma]g(Y,Z)U-Y[\sigma]g(X,Z)U`, why: R`对 $X\leftrightarrow Y$ 反对称化；$X[\sigma]Y[\sigma]Z$ 与 $Z[\sigma]g(X,Y)U$ 对称而消去。这正是 \eqref{7.108} 中所有平方项。` },
        ]} result={R`\eqref{7.108} 逐项成立。`} />
        <Tx>{R`定义 $(1,1)$ 型张量场 $B$：`}</Tx>
        <Eq n="7.109" say={R`把 $\sigma$ 的二阶与一阶导数打包成一个 $(1,1)$ 张量 $B$，曲率的变化就只通过 $B$ 出现。`}>{R`BX\equiv-X[\sigma]U+\nabla_XU+\tfrac12U[\sigma]X.`}</Eq>
        <Tx>{R`由于 $g(\nabla_YU,Z)=\langle\nabla_Y\dd\sigma,Z\rangle$（习题 7.8(c)），\eqref{7.108} 成为`}</Tx>
        <Eq n="7.110" title="共形变换下的曲率" say={R`Weyl 重标度下，曲率的改变量只是度规与 $B$ 的"楔积"：$g$ 与 $B$ 两两搭配的四项组合。`}>{R`\bar R(X,Y)Z=R(X,Y)Z-[g(Y,Z)BX-g(BX,Z)Y+g(BY,Z)X-g(X,Z)BY].`}</Eq>
        <Tx>{R`（展开验证：$-g(Y,Z)BX=X[\sigma]g(Y,Z)U-g(Y,Z)\nabla_XU-\frac12U[\sigma]g(Y,Z)X$，$g(BX,Z)Y=-X[\sigma]Z[\sigma]Y+\langle\nabla_X\dd\sigma,Z\rangle Y+\frac12U[\sigma]g(X,Z)Y$，另两项同理；相加正是 \eqref{7.108} 的十项。）用分量写，`}</Tx>
        <Eq n="7.111" say={R`\eqref{7.110} 的分量形式。`}>{R`\bar R^\kappa{}_{\lambda\mu\nu}=R^\kappa{}_{\lambda\mu\nu}-g_{\nu\lambda}B_\mu{}^\kappa+g_{\xi\lambda}B_\mu{}^\xi\delta^\kappa{}_\nu-g_{\xi\lambda}B_\nu{}^\xi\delta^\kappa{}_\mu+g_{\mu\lambda}B_\nu{}^\kappa`}</Eq>
        <Tx>{R`其中张量 $B$ 的分量为`}</Tx>
        <Eq n="7.112" say={R`$B$ 的分量：$\sigma$ 的协变 Hessian，减去梯度的外积，再加梯度平方的一半乘单位矩阵。`}>{R`\begin{aligned}B_\mu{}^\kappa&=-\partial_\mu\sigma U^\kappa+(\nabla_\mu U)^\kappa+\tfrac12U[\sigma]\delta_\mu{}^\kappa\\&=-\partial_\mu\sigma g^{\kappa\lambda}\partial_\lambda\sigma+g^{\kappa\lambda}(\partial_\mu\partial_\lambda\sigma-\Gamma^\xi{}_{\mu\lambda}\partial_\xi\sigma)+\tfrac12g^{\lambda\xi}\partial_\lambda\sigma\partial_\xi\sigma\,\delta_\mu{}^\kappa.\end{aligned}`}</Eq>
        <Tx>{R`注意 $B_{\mu\nu}\equiv g_{\nu\lambda}B_\mu{}^\lambda=B_{\nu\mu}$。缩并 \eqref{7.111} 的指标（$\kappa$ 与 $\mu$），得`}</Tx>
        <Eq n="7.113" say={R`Ricci 张量在 Weyl 重标度下的变化。`}>{R`\overline{\sym{Ric}{\mathit{Ric}}}_{\mu\nu}=\sym{Ric}{\mathit{Ric}}_{\mu\nu}-g_{\mu\nu}B_\lambda{}^\lambda-(m-2)B_{\nu\mu}`}</Eq>
        <Eq n="7.114a" say={R`标量曲率的变化：再用 $\bar g^{\mu\nu}=\mathrm{e}^{-2\sigma}g^{\mu\nu}$ 取迹。`}>{R`\mathrm{e}^{2\sigma}\bar{\mathcal{R}}=\mathcal{R}-2(m-1)B_\lambda{}^\lambda`}</Eq>
        <Tx>{R`其中 $m=\dim M$。\eqref{7.114a} 也写作`}</Tx>
        <Eq n="7.114b" say={R`同一关系的另一写法。`}>{R`\bar g_{\mu\nu}\bar{\mathcal R}=[\mathcal R-2(m-1)B_\lambda{}^\lambda]g_{\mu\nu}.`}</Eq>
        <Tx>{R`（检验：$m=2$、$g=\delta$、$\mathrm{e}^{2\sigma}=4/(1+r^2)^2$ 给出单位球面的球极投影度规；$B_\lambda{}^\lambda=\nabla^2\sigma=-4/(1+r^2)^2$，于是 $\bar{\mathcal R}=-2\mathrm{e}^{-2\sigma}B_\lambda{}^\lambda=2$，正是单位球面的标量曲率。）若用 $\overline{\sym{Ric}{\mathit{Ric}}}$ 与 $\bar{\mathcal R}$ 消去 $\bar R^\kappa{}_{\lambda\mu\nu}$ 中的 $g_{\mu\nu}B_\lambda{}^\lambda$ 与 $B_{\mu\nu}$，并把带横线与不带横线的项分开，就得到一个与 $\sigma$ 无关的组合：`}</Tx>
        <Eq n="7.115" title="Weyl 张量" say={R`Weyl 张量：从 Riemann 张量中减去 Ricci 部分后剩下的"无迹"部分，它在 Weyl 重标度下不变，度量的是潮汐形变中与体积无关的那一块（引力波就在这里）。`}>{R`\begin{aligned}C_{\kappa\lambda\mu\nu}&=R_{\kappa\lambda\mu\nu}-\frac{1}{m-2}(\sym{Ric}{\mathit{Ric}}_{\kappa\mu}g_{\lambda\nu}-\sym{Ric}{\mathit{Ric}}_{\lambda\mu}g_{\kappa\nu}+\sym{Ric}{\mathit{Ric}}_{\lambda\nu}g_{\kappa\mu}-\sym{Ric}{\mathit{Ric}}_{\kappa\nu}g_{\lambda\mu})\\&\quad+\frac{\mathcal R}{(m-2)(m-1)}(g_{\kappa\mu}g_{\lambda\nu}-g_{\kappa\nu}g_{\lambda\mu})\end{aligned}`}</Eq>
        <Box kind="warning" title={R`勘误：Weyl 张量 \eqref{7.115} 中 Ricci 项的符号（p.297）`}>{R`原书 Ricci 项前印作 $+\frac{1}{m-2}$。按本书的曲率约定（单位球面 $R_{\kappa\lambda\mu\nu}=g_{\kappa\mu}g_{\lambda\nu}-g_{\kappa\nu}g_{\lambda\mu}$，\eqref{7.89}），应为 $-\frac1{m-2}$。

**判据：**常曲率空间 $R_{\kappa\lambda\mu\nu}=K(g_{\kappa\mu}g_{\lambda\nu}-g_{\kappa\nu}g_{\lambda\mu})$ 共形平坦（球极投影），Weyl 张量必须为零。此时 $\sym{Ric}{\mathit{Ric}}=(m-1)Kg$，$\mathcal R=m(m-1)K$，括号中的 Ricci 组合 $=2(m-1)K(g_{\kappa\mu}g_{\lambda\nu}-g_{\kappa\nu}g_{\lambda\mu})$。取 $-$ 号：$K[1-\frac{2(m-1)}{m-2}+\frac{m}{m-2}]=0$ ✓；取原书的 $+$ 号得 $K\frac{4(m-1)}{m-2}\neq0$。也可直接从 \eqref{7.111}、\eqref{7.113}、\eqref{7.114a} 消去 $B$ 推出 $-$ 号。正文已改正。

另注："$C_{\kappa\lambda\mu\nu}=\bar C_{\kappa\lambda\mu\nu}$"应理解为一个指标在上的 $C^\kappa{}_{\lambda\mu\nu}=\bar C^\kappa{}_{\lambda\mu\nu}$；全协变的分量满足 $\bar C_{\kappa\lambda\mu\nu}=\mathrm{e}^{2\sigma}C_{\kappa\lambda\mu\nu}$（降指标用了 $\bar g=\mathrm{e}^{2\sigma}g$）。`}</Box>
        <Tx>{R`其中 $m\ge4$（$m=3$ 见章末习题 7.2）。张量 $C$ 称为 **Weyl 张量**。读者应验证 $C^\kappa{}_{\lambda\mu\nu}=\bar C^\kappa{}_{\lambda\mu\nu}$。

若 $(M,g)$ 的每点 $p$ 都有包含 $p$ 的卡 $(U,\varphi)$，使 $g_{\mu\nu}=\mathrm{e}^{2\sigma}\delta_{\mu\nu}$，就说（伪）Riemann 流形 $(M,g)$ 是**共形平坦的**（conformally flat）。由于平坦度规的 Weyl 张量为零，共形平坦度规的 Weyl 张量也为零。若 $\dim M\ge4$，$C=0$ 是共形平坦的充要条件（Weyl–Schouten）。若 $\dim M=3$，Weyl 张量恒为零，见章末习题 7.2。若 $\dim M=2$，$M$ 总是共形平坦的，见下例。`}</Tx>
        <Box kind="example" n="7.9" title="二维流形总是共形平坦：等温坐标">
          <Tx>{R`任何二维 Riemann 流形 $(M,g)$ 都是共形平坦的。设 $(x,y)$ 是原来的局部坐标，度规取形式`}</Tx>
          <Eq n="7.116" say={R`二维度规的一般形式：三个函数 $g_{xx},g_{xy},g_{yy}$。`}>{R`\dd s^2=g_{xx}\dd x^2+2g_{xy}\dd x\dd y+g_{yy}\dd y^2.`}</Eq>
          <Tx>{R`令 $g\equiv g_{xx}g_{yy}-g_{xy}^2$，把 \eqref{7.116} 写成（在复数域上因式分解这个正定二次型）

$$\dd s^2=\left(\sqrt{g_{xx}}\,\dd x+\frac{g_{xy}+\mathrm{i}\sqrt g}{\sqrt{g_{xx}}}\dd y\right)\left(\sqrt{g_{xx}}\,\dd x+\frac{g_{xy}-\mathrm{i}\sqrt g}{\sqrt{g_{xx}}}\dd y\right).$$

（展开：$\dd y^2$ 的系数是 $(g_{xy}^2+g)/g_{xx}=g_{yy}$ ✓。）由微分方程理论，存在积分因子 $\lambda(x,y)=\lambda_1(x,y)+\mathrm{i}\lambda_2(x,y)$ 使得`}</Tx>
          <Eq n="7.117a" say={R`复一形式乘以适当的积分因子后成为恰当形式 $\dd u+\mathrm{i}\dd v$。`}>{R`\lambda\left(\sqrt{g_{xx}}\,\dd x+\frac{g_{xy}+\mathrm{i}\sqrt g}{\sqrt{g_{xx}}}\dd y\right)=\dd u+\mathrm{i}\,\dd v`}</Eq>
          <Eq n="7.117b" say={R`取复共轭。`}>{R`\bar\lambda\left(\sqrt{g_{xx}}\,\dd x+\frac{g_{xy}-\mathrm{i}\sqrt g}{\sqrt{g_{xx}}}\dd y\right)=\dd u-\mathrm{i}\,\dd v.`}</Eq>
          <Box kind="warning" title={R`勘误：第二个因子中的 $\sqrt{g_{xx}}$（p.298）`}>{R`原书在 $\dd s^2$ 的因式分解的第二个因子与 \eqref{7.117b} 中都印作 $\sqrt{g_{yy}}\,\dd x$。两个因子必须互为复共轭（\eqref{7.117b} 正是 \eqref{7.117a} 的共轭），所以应为 $\sqrt{g_{xx}}\,\dd x$；否则展开后 $\dd x^2$ 的系数是 $\sqrt{g_{xx}g_{yy}}$ 而不是 $g_{xx}$。正文已改正。`}</Box>
          <Tx>{R`于是 $\dd s^2=(\dd u^2+\dd v^2)/|\lambda|^2$，令 $|\lambda|^{-2}=\mathrm{e}^{2\sigma}$，就得到所要的坐标系。坐标 $(u,v)$ 称为**等温坐标**（isothermal coordinates）。［注：若把 $u=$ 常数的曲线看作等温线，$v=$ 常数就对应热流线。］

例如，设 $\dd s^2=\dd\theta^2+\sin^2\theta\,\dd\phi^2$ 是 $S^2$ 的标准度规。注意到

$$\frac{\dd}{\dd\theta}\log\left|\tan\frac\theta2\right|=\frac1{\sin\theta}$$

可知由 $u=\log|\tan\frac12\theta|$、$v=\phi$ 定义的 $f:(\theta,\phi)\mapsto(u,v)$ 给出共形平坦的度规。事实上

$$\dd s^2=\sin^2\theta\left(\frac{\dd\theta^2}{\sin^2\theta}+\dd\phi^2\right)=\sin^2\theta(\dd u^2+\dd v^2).$$

（这正是 Mercator 投影：$(u,v)$ 平面上的直线是保持与经线夹角不变的航线——例 7.2 的"测地线"。）

若 $(M,g)$ 是 Lorentz 流形（$g<0$），存在积分因子 $\lambda(x,y)$ 与 $\mu(x,y)$ 使得`}</Tx>
          <Eq n="7.118a" say={R`Lorentz 情形：二次型在实数域上分解为两个实一形式之积（两族类光线）。`}>{R`\lambda\left(\sqrt{g_{xx}}\,\dd x+\frac{g_{xy}+\sqrt{-g}}{\sqrt{g_{xx}}}\dd y\right)=\dd u+\dd v`}</Eq>
          <Eq n="7.118b" say={R`另一族类光方向。`}>{R`\mu\left(\sqrt{g_{xx}}\,\dd x+\frac{g_{xy}-\sqrt{-g}}{\sqrt{g_{xx}}}\dd y\right)=\dd u-\dd v.`}</Eq>
          <Tx>{R`（这里设 $g_{xx}>0$；否则交换 $x,y$ 的角色或把整体乘 $-1$。）用坐标 $(u,v)$，度规取形式 $\dd s^2=\lambda^{-1}\mu^{-1}(\dd u^2-\dd v^2)$。乘积 $\lambda\mu$ 或恒正或恒负，令 $1/|\lambda\mu|=\mathrm{e}^{2\sigma}$，得`}</Tx>
          <Eq n="7.119" say={R`二维 Lorentz 度规局部总是 Minkowski 度规乘一个共形因子。`}>{R`\dd s^2=\pm\mathrm{e}^{2\sigma}(\dd u^2-\dd v^2).`}</Eq>
        </Box>
        <Exercise n="7.16" title="Milne 宇宙" level="★★"
          hint={R`令 $t=\mathrm{e}^\eta$（$t>0$），则 $\dd t=\mathrm{e}^\eta\dd\eta$。第二步计算 $\dd u^2-\dd v^2$。`}
          solution={R`取 $t>0$ 并令 $t=\mathrm{e}^\eta$（$t<0$ 时令 $-t=\mathrm{e}^\eta$，结果相同）。$\dd t=\mathrm{e}^\eta\dd\eta$，

$$g=-\mathrm{e}^{2\eta}\dd\eta\otimes\dd\eta+\mathrm{e}^{2\eta}\dd x\otimes\dd x=\mathrm{e}^{2\eta}(-\dd\eta\otimes\dd\eta+\dd x\otimes\dd x),$$

是 \eqref{7.119} 的形式（$\sigma=\eta$），所以共形平坦。再令 $u=\mathrm{e}^\eta\sinh x$、$v=\mathrm{e}^\eta\cosh x$：

$$\dd u=\mathrm{e}^\eta(\sinh x\,\dd\eta+\cosh x\,\dd x),\qquad\dd v=\mathrm{e}^\eta(\cosh x\,\dd\eta+\sinh x\,\dd x),$$

$$\dd u^2-\dd v^2=\mathrm{e}^{2\eta}\big[(\sinh^2x-\cosh^2x)\dd\eta^2+(\cosh^2x-\sinh^2x)\dd x^2\big]=\mathrm{e}^{2\eta}(\dd x^2-\dd\eta^2)$$

（交叉项 $2\sinh x\cosh x\,\dd\eta\,\dd x$ 相消）。所以

$$g=-\dd v\otimes\dd v+\dd u\otimes\dd u,$$

就是二维 **Minkowski 度规**本身（$v$ 是时间、$u$ 是空间）。$v=t\cosh x>|u|=|t\sinh x|$：Milne 宇宙只是 Minkowski 时空中原点未来光锥的内部，用"随时间膨胀"的双曲坐标描写而已——它的曲率为零（与习题 7.12 一致：取 $R(t)=t$，$\ddot R=0$）。`}>
          {R`设 $(M,g)$ 是二维 Lorentz 流形，$g=-\dd t\otimes\dd t+t^2\dd x\otimes\dd x$（**Milne 宇宙**）。用变换 $|t|\mapsto\mathrm{e}^\eta$ 证明 $g$ 共形平坦。事实上它可以用 $(\eta,x)\mapsto(u=\mathrm{e}^\eta\sinh x,v=\mathrm{e}^\eta\cosh x)$ 进一步化简。所得的度规是什么？`}
        </Exercise>
      </Sub>
    </Sec>);
}
