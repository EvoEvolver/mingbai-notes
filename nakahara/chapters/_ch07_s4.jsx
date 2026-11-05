import { TangentProjectionRedraw, TorsionRedraw } from "./_redraw_ch06_08.jsx";
// §7.4 Levi-Civita 联络 —— 式 (7.52)–(7.89)，定理 7.1–7.2，例 7.3–7.6，习题 7.8–7.13，图 7.6–7.8；交互图 2（测地线）、交互图 3（曲率计算器）
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Proof, Exercise, Derivation, C, FormulaMap } from "@kit";
import { FM_7_60 } from "./_ch07_fmaps.jsx";
import { GeodesicLab, CurvatureLab } from "./_ch07_demos.jsx";

const R = String.raw;

export function Sec74() {
  return (
    <Sec n="7.4" title="Levi-Civita connections" zh="Levi-Civita 联络"
      gist={R`度规相容 + 无挠 ⇒ 联络唯一，$\Gamma$ = Christoffel 符号（\sref{T7.1}）→ 经典曲面论中的平行性 → 测地线 = 最直 = 弧长的极值（Euler–Lagrange 方程 \eqref{7.61}）；球面的大圆、Poincaré 上半平面的半圆 → 正规坐标中 $\Gamma(p)=0$ → Riemann 张量的对称性、Bianchi 恒等式（\sref{T7.2}）、$\nabla_\mu G^{\mu\nu}=0$、独立分量数 $m^2(m^2-1)/12$。`}
      why={R`这是物理（广义相对论）真正使用的联络：只要给出度规，一切都能算出来。"最直"与"最短"在它这里合二为一，使自由粒子的运动成为时空几何的一部分。`}
      gives={["7.53", "7.57", "7.61", "7.62a", "7.66", "7.70", "7.75", "7.77", "7.80c", "7.81a", "7.81b", "7.85", "7.86", "7.88", "7.89"]}>
      <p className="muted">本节概念：<C id="levi_civita" /> · <C id="geodesic" /> · <C id="curvature" /></p>
      <Sub n="7.4.1" title="The fundamental theorem" zh="基本定理">
        <Tx>{R`在所有仿射联络中，有一个特殊的联络称为 **Levi-Civita 联络**，它是经典曲面微分几何中联络的自然推广。若挠率张量为零，联络 $\nabla$ 就称为**对称联络**（symmetric connection）。在坐标基中，对称联络的系数满足`}</Tx>
        <Eq n="7.52" say={R`对称联络：联络系数关于两个下指标对称，等价于挠率为零（\eqref{7.41}）。`}>{R`\Gamma^\lambda{}_{\mu\nu}=\Gamma^\lambda{}_{\nu\mu}.`}</Eq>
        <Stmt id="T7.1">
          <Proof steps={[
            { claim: R`**存在性的思路（原书）：**由 \eqref{7.34}，任一度规联络可写成 $\widetilde\Gamma^\kappa{}_{\mu\nu}=\left\{{\kappa\atop\mu\nu}\right\}+K^\kappa{}_{\mu\nu}$，$K$ 是切扭张量。`, uses: ["7.34", "7.35"] },
            { claim: R`由习题 7.5，若 $t$ 是 $(1,2)$ 型张量场，$\Gamma^\kappa{}_{\mu\nu}\equiv\widetilde\Gamma^\kappa{}_{\mu\nu}+t^\kappa{}_{\mu\nu}$ 仍是联络系数。取 $t^\kappa{}_{\mu\nu}=-K^\kappa{}_{\mu\nu}$，得 \eqref{7.53}。`, uses: ["7.53"] },
            { claim: R`**它确实对称且度规相容（本站补全）：**\eqref{7.33} 关于 $\mu,\nu$ 显然对称；代入 \eqref{7.30b}：`, tex: R`\Gamma^\kappa{}_{\lambda\mu}g_{\kappa\nu}+\Gamma^\kappa{}_{\lambda\nu}g_{\kappa\mu}=\tfrac12(\partial_\lambda g_{\mu\nu}+\partial_\mu g_{\lambda\nu}-\partial_\nu g_{\lambda\mu})+\tfrac12(\partial_\lambda g_{\nu\mu}+\partial_\nu g_{\lambda\mu}-\partial_\mu g_{\lambda\nu})=\partial_\lambda g_{\mu\nu}`, why: R`两组括号中 $\partial_\mu g_{\lambda\nu}$ 与 $\partial_\nu g_{\lambda\mu}$ 各自正负相消，只剩 $\partial_\lambda g_{\mu\nu}$。`, fill: true },
            { claim: R`**唯一性（本站补全）：**设 $\Gamma$ 度规相容且对称。则 \eqref{7.31} 中 $T=0$，$\Gamma^\kappa{}_{(\mu\nu)}=\Gamma^\kappa{}_{\mu\nu}$，从而 $\Gamma^\kappa{}_{\mu\nu}=\frac12g^{\kappa\lambda}(\partial_\mu g_{\nu\lambda}+\partial_\nu g_{\mu\lambda}-\partial_\lambda g_{\mu\nu})$——被度规唯一确定。`, uses: ["7.31", "7.32"], fill: true },
          ]} />
        </Stmt>
        <Eq n="7.53" keyEq title="Levi-Civita 联络" say={R`Levi-Civita 联络的系数就是 Christoffel 符号：度规一给定，平行移动、测地线、曲率就全部确定了。`}>{R`\Gamma^\kappa{}_{\mu\nu}=\left\{{\kappa\atop\mu\nu}\right\}=\frac12g^{\kappa\lambda}(\partial_\mu g_{\lambda\nu}+\partial_\nu g_{\lambda\mu}-\partial_\lambda g_{\mu\nu}).`}</Eq>
        <Tx>{R`由构造，它是对称的，而且给定度规后显然唯一。`}</Tx>
        <Exercise n="7.8" title="Levi-Civita 联络的三个性质" level="★★"
          hint={R`(a)(b)：用 \eqref{7.24} 与 $\Gamma$ 的对称性；对称量与反对称的 $\dd x^\mu\wedge\dd x^\nu$ 缩并为零。(c)：用度规相容 $\nabla_Xg=0$ 与 Leibniz 律 \eqref{7.22}（$\nabla$ 与缩并交换）。`}
          solution={R`**(a)** $\nabla_\nu f=\partial_\nu f$ 是一形式 $\dd f$ 的分量。由 \eqref{7.24}，

$$\nabla_\mu\nabla_\nu f=\partial_\mu\partial_\nu f-\Gamma^\lambda{}_{\mu\nu}\partial_\lambda f.$$

第一项对 $\mu,\nu$ 对称（混合偏导数可交换），第二项因 \eqref{7.52} 对称，所以 $\nabla_\mu\nabla_\nu f=\nabla_\nu\nabla_\mu f$。（有挠率时差 $-T^\lambda{}_{\mu\nu}\partial_\lambda f$。）

**(b)** $\omega=\omega_\nu\dd x^\nu$ 的外微分为 $\dd\omega=\partial_\mu\omega_\nu\,\dd x^\mu\wedge\dd x^\nu$（\eqref{5.68}）。由 \eqref{7.24}，

$$(\nabla_\mu\omega)_\nu\,\dd x^\mu\wedge\dd x^\nu=\partial_\mu\omega_\nu\,\dd x^\mu\wedge\dd x^\nu-\Gamma^\lambda{}_{\mu\nu}\omega_\lambda\,\dd x^\mu\wedge\dd x^\nu,$$

第二项中 $\Gamma^\lambda{}_{\mu\nu}$ 对 $\mu\nu$ 对称而楔积反对称，为零，即 \eqref{7.55}。所以外微分中的偏导数可以换成任意无挠联络的协变导数。

**(c)** $g(U,V)=g_{\mu\nu}U^\mu V^\nu=\omega_\nu V^\nu=\langle\omega,V\rangle$。对它求 $\nabla_X$，左边用度规相容 $\nabla_Xg=0$ 与 \eqref{7.22}，右边用 \eqref{7.22}：

$$g(\nabla_XU,V)+g(U,\nabla_XV)=\langle\nabla_X\omega,V\rangle+\langle\omega,\nabla_XV\rangle.$$

而 $g(U,\nabla_XV)=\langle\omega,\nabla_XV\rangle$（$\omega$ 就是 $U$ 降指标），两边相消得 \eqref{7.56}。换言之，对度规联络，"先降指标再求导"等于"先求导再降指标"：$\nabla_\mu(g_{\nu\lambda}U^\lambda)=g_{\nu\lambda}\nabla_\mu U^\lambda$。`}>
          {R`设 $\nabla$ 是 Levi-Civita 联络。(a) 设 $f\in\mathcal{F}(M)$，证明 \eqref{7.54}。(b) 设 $\omega\in\Omega^1(M)$，证明 \eqref{7.55}。(c) 设 $\omega\in\Omega^1(M)$，$U\in\mathcal{X}(M)$ 是对应的向量场：$U^\mu=g^{\mu\nu}\omega_\nu$。证明对任意 $V\in\mathcal{X}(M)$ 有 \eqref{7.56}。`}
        </Exercise>
        <Eq n="7.54" say={R`无挠时，函数的二阶协变导数可交换：标量没有"转动"的余地。`}>{R`\nabla_\mu\nabla_\nu f=\nabla_\nu\nabla_\mu f.`}</Eq>
        <Eq n="7.55" say={R`外微分可以用协变导数代替偏导数来算：联络的对称部分在反对称化时消失。`}>{R`\dd\omega=(\nabla_\mu\omega)_\nu\,\dd x^\mu\wedge\dd x^\nu.`}</Eq>
        <Eq n="7.56" say={R`度规联络与升降指标交换：向量的导数降指标，等于一形式的导数。`}>{R`g(\nabla_XU,V)=\langle\nabla_X\omega,V\rangle.`}</Eq>
        <Box kind="example" n="7.3" title="平面与球面的 Levi-Civita 联络">
          <Tx>{R`(a) $\R^2$ 在极坐标中的度规为 $g=\dd r\otimes\dd r+r^2\dd\phi\otimes\dd\phi$。由 \eqref{7.53}，唯一非零的导数是 $\partial_rg_{\phi\phi}=2r$，Levi-Civita 联络系数的非零分量为 $\Gamma^\phi{}_{r\phi}=\Gamma^\phi{}_{\phi r}=\frac12g^{\phi\phi}\partial_rg_{\phi\phi}=r^{-1}$，$\Gamma^r{}_{\phi\phi}=-\frac12g^{rr}\partial_rg_{\phi\phi}=-r$。与例 7.1 的结果一致。

(b) $S^2$ 上的诱导度规为 $g=\dd\theta\otimes\dd\theta+\sin^2\theta\,\dd\phi\otimes\dd\phi$。唯一非零导数 $\partial_\theta g_{\phi\phi}=2\sin\theta\cos\theta$，Levi-Civita 联络的非零分量为`}</Tx>
          <Eq n="7.57" title="球面的 Christoffel 符号" say={R`单位球面的联络系数：沿纬圈走时，向量会被"拉向赤道"（$\Gamma^\theta{}_{\phi\phi}$），而角向分量按纬圈半径的变化率修正（$\cot\theta$）。`}>{R`\Gamma^\theta{}_{\phi\phi}=-\cos\theta\sin\theta\qquad\Gamma^\phi{}_{\theta\phi}=\Gamma^\phi{}_{\phi\theta}=\cot\theta.`}</Eq>
        </Box>
      </Sub>

      <Sub n="7.4.2" title="The Levi-Civita connection in the classical geometry of surfaces" zh="经典曲面几何中的 Levi-Civita 联络">
        <Tx>{R`在嵌入 $\R^3$ 的曲面的经典微分几何中，Levi-Civita 这样定义相邻两点 $p$、$q$ 处向量的平行性（\figref{7.6}）：先取 $p$ 点的切平面与其中的向量 $V_p$；若 $q$ 点的向量 $V_q$ 投影到 $p$ 点切平面后与 $V_p$ 按通常意义平行，就说 $V_q$ 平行于 $V_p$。

再取 $p$ 附近的两点 $q$、$s$（\figref{7.7}），把位移向量 $pq$ 沿 $ps$ 平行移动、把 $ps$ 沿 $pq$ 平行移动。若平行性按 Levi-Civita 的意义定义，投影到 $p$ 点切平面上的位移向量组成一个闭合的平行四边形，所以这种平行性的挠率为零。\sref{T7.1} 已证明存在唯一的无挠（度规）联络，它把这里定义的平行性推广到任意流形。（交互图 1 中的"外在法"正是这样实现平行移动的：每走一小步，把向量"不打转地"转到新的切平面上。）`}</Tx>
        <Figure illustration={<TangentProjectionRedraw />} n="7.6" caption={R`在曲面 $M$ 上，若 $V_q$ 在 $T_pM$ 上的投影按 $\R^3$ 中通常意义与 $V_p$ 平行，就定义 $V_p\in T_pM$ 平行于 $V_q\in T_qM$。`} width="100%" />
        <Figure illustration={<TorsionRedraw levi />} n="7.7" caption={R`若平行性按 Levi-Civita 的意义定义，挠率恒为零。`} width="100%" />
      </Sub>

      <Sub n="7.4.3" title="Geodesics" zh="测地线">
        <Tx>{R`使用 Levi-Civita 联络时，联络系数、Riemann 张量以及许多相关关系都能按固定程序简单地算出。除了这种简便，Levi-Civita 联络还给测地线（定义为尽可能直的曲线）另一幅图像：连接两点的**尽可能短**的曲线。在 Newton 力学中，自由粒子的轨迹既是最直的又是最短的曲线，即直线。Einstein 提出，在广义相对论中也应如此：若把引力理解为时空几何的一部分，自由下落的粒子应当沿既最直又最短的曲线运动。［注：严格说"最短"这一条件太强。下面将看到，Levi-Civita 联络的测地线给出的是连接两点的曲线长度的**局部极值**。］`}</Tx>
        <Box kind="example" n="7.4" title="平直空间的测地线">{R`在平直流形 $(\R^m,\delta)$ 或 $(\R^m,\eta)$ 中，Levi-Civita 联络系数 $\Gamma$ 恒为零。于是测地线方程 \eqref{7.19b} 立即解得 $x^\mu=A^\mu t+B^\mu$，$A^\mu$、$B^\mu$ 为常数——直线。`}</Box>
        <Exercise n="7.9" title="柱面上的测地线是螺旋线" level="★"
          hint={R`在坐标 $(\phi,z)$ 中度规分量是常数。`}
          solution={R`度规分量 $g_{\phi\phi}=g_{zz}=1$、$g_{\phi z}=0$ 都是常数，由 \eqref{7.53} 所有 $\Gamma$ 为零，测地线方程为 $\ddot\phi=0$、$\ddot z=0$，解为

$$\phi(t)=at+b,\qquad z(t)=ct+d.$$

嵌入 $\R^3$ 后为 $(\cos(at+b),\sin(at+b),ct+d)$：$a\neq0$、$c\neq0$ 时是螺旋线（helix），螺距 $2\pi c/a$；$c=0$ 是水平圆，$a=0$ 是竖直母线（螺旋线的退化情形）。直观地：把柱面沿母线剪开摊平成平面（这是**等距**的，柱面内禀平坦），测地线是平面上的直线，卷回去就是螺旋线。注意柱面上连接两点的测地线有无穷多条（绕不同圈数），其中只有一条最短——测地线只是长度的局部极值。`}>
          {R`柱面 $S^1\times\R$ 上的度规为 $g=\dd\phi\otimes\dd\phi+\dd z\otimes\dd z$，$\phi$ 是 $S^1$ 的极角，$z$ 是 $\R$ 的坐标。证明 Levi-Civita 联络给出的测地线是螺旋线。`}
        </Exercise>
        <Tx>{R`**最直 = 弧长的极值。**下面证明二者等价。先用曲线上的弧长 $s$ 作参数，$x^\mu=x^\mu(s)$。连接 $p$ 与 $q$ 的路径 $c$ 的长度为`}</Tx>
        <Eq n="7.58" say={R`曲线长度是线元 $\dd s$ 沿曲线的积分；被积函数是速度的"度规长度"。`}>{R`I(c)=\int_c\dd s=\int_c\sqrt{g_{\mu\nu}x'^\mu x'^\nu}\,\dd s`}</Eq>
        <Tx>{R`其中 $x'^\mu=\dd x^\mu/\dd s$。我们不直接从 \eqref{7.58} 推 Euler–Lagrange 方程，而是解一个稍容易的问题。令 $F\equiv\frac12g_{\mu\nu}x'^\mu x'^\nu$，把 \eqref{7.58} 写成 $I(c)=\int_cL(F)\dd s$，$L=\sqrt{2F}$。原问题的 Euler–Lagrange 方程为`}</Tx>
        <Eq n="7.59" say={R`长度泛函取极值的条件：标准的 Euler–Lagrange 方程。`}>{R`\frac{\dd}{\dd s}\left(\frac{\partial L}{\partial x'^\lambda}\right)-\frac{\partial L}{\partial x^\lambda}=0.`}</Eq>
        <Tx>{R`于是 $F=L^2/2$ 满足`}</Tx>
        <FormulaMap n="7.60" say={R`把拉氏量换成它的平方：Euler–Lagrange 表达式只多出一项 $\frac{\partial L}{\partial x'}\frac{\dd L}{\dd s}$，而按弧长参数化时 $L\equiv1$，这一项为零。`} tree={FM_7_60} start="dL" />
        <Tx>{R`沿曲线 $L\equiv1$，$\dd L/\dd s=0$，最后的表达式为零。这就证明了：只要 $L$ 满足 Euler–Lagrange 方程，$F$ 也满足。于是`}</Tx>
        <Eq n="7.61" title="测地线 = 长度的极值" say={R`"能量"$F=\frac12g_{\mu\nu}x'^\mu x'^\nu$ 的 Euler–Lagrange 方程恰好是 Levi-Civita 联络的测地线方程：最短（极值）与最直是同一件事。`}>{R`\begin{aligned}&\frac{\dd}{\dd s}(g_{\lambda\mu}x'^\mu)-\frac12\frac{\partial g_{\mu\nu}}{\partial x^\lambda}x'^\mu x'^\nu\\&\quad=\frac{\partial g_{\lambda\mu}}{\partial x^\nu}x'^\mu x'^\nu+g_{\lambda\mu}\frac{\dd^2x^\mu}{\dd s^2}-\frac12\frac{\partial g_{\mu\nu}}{\partial x^\lambda}x'^\mu x'^\nu\\&\quad=g_{\lambda\mu}\frac{\dd^2x^\mu}{\dd s^2}+\frac12\left(\frac{\partial g_{\lambda\mu}}{\partial x^\nu}+\frac{\partial g_{\lambda\nu}}{\partial x^\mu}-\frac{\partial g_{\mu\nu}}{\partial x^\lambda}\right)\frac{\dd x^\mu}{\dd s}\frac{\dd x^\nu}{\dd s}=0.\end{aligned}`}</Eq>
        <Tx>{R`（第二个等号把 $\partial_\nu g_{\lambda\mu}x'^\mu x'^\nu$ 写成对 $\mu\nu$ 对称化的一半加一半。）把 \eqref{7.61} 乘以 $g^{\kappa\lambda}$，就得到测地线方程 \eqref{7.19b}（$\Gamma$ 取 \eqref{7.53}）。

既然 $L$ 与 $F$ 满足同一个变分问题，就可以利用它来**计算 Christoffel 符号**——这往往比直接套 \eqref{7.53} 快。以 $S^2$ 为例，$F=\frac12(\theta'^2+\sin^2\theta\,\phi'^2)$，Euler–Lagrange 方程为`}</Tx>
        <Eq n="7.62a" say={R`球面测地线的 $\theta$ 方程：沿纬向的转动会产生把曲线推离极点的"离心"项。`}>{R`\frac{\dd^2\theta}{\dd s^2}-\sin\theta\cos\theta\left(\frac{\dd\phi}{\dd s}\right)^2=0`}</Eq>
        <Eq n="7.62b" say={R`$\phi$ 方程，等价于角动量 $\sin^2\theta\,\phi'$ 守恒（Clairaut 关系）。`}>{R`\frac{\dd^2\phi}{\dd s^2}+2\cot\theta\frac{\dd\phi}{\dd s}\frac{\dd\theta}{\dd s}=0.`}</Eq>
        <Tx>{R`与 \eqref{7.19b} 对比，立即读出 $\Gamma^\theta{}_{\phi\phi}=-\sin\theta\cos\theta$ 与 $\Gamma^\phi{}_{\phi\theta}=\Gamma^\phi{}_{\theta\phi}=\cot\theta$（交叉项 $2\cot\theta\,\phi'\theta'$ 是 $\Gamma^\phi{}_{\theta\phi}+\Gamma^\phi{}_{\phi\theta}$ 之和），见 \eqref{7.57}。`}</Tx>
        <Box kind="example" n="7.5" title={R`$S^2$ 的测地线是大圆`}>
          <Tx>{R`不解测地线方程 \eqref{7.62a}–\eqref{7.62b}，而是直接求连接两点的最短曲线。不失一般性，可以把两点的坐标取为 $(\theta_1,\phi_0)$ 与 $(\theta_2,\phi_0)$（转动球面使两点在同一经线上）。设 $\phi=\phi(\theta)$ 是连接它们的曲线，则曲线长度为`}</Tx>
          <Eq n="7.63" say={R`以 $\theta$ 为参数的曲线长度：经向分量贡献 1，纬向分量贡献 $\sin^2\theta(\dd\phi/\dd\theta)^2$——后者非负，所以不偏离经线最短。`}>{R`I(c)=\int_{\theta_1}^{\theta_2}\sqrt{1+\sin^2\theta\left(\frac{\dd\phi}{\dd\theta}\right)^2}\,\dd\theta`}</Eq>
          <Box kind="warning" title={R`勘误：\eqref{7.63} 漏了 $\theta$（p.284）`}>{R`原书根号内印作 $1+\sin^2\left(\frac{\dd\phi}{\dd\theta}\right)^2$，漏了 $\sin^2$ 的宗量 $\theta$。由度规 \eqref{7.6}，$\dd s^2=\dd\theta^2+\sin^2\theta\,\dd\phi^2$，应为 $\sin^2\theta$。正文已改正。`}</Box>
          <Tx>{R`它在 $\dd\phi/\dd\theta\equiv0$，即 $\phi\equiv\phi_0$ 时取最小值。所以测地线是大圆 $(\theta,\phi_0)$，$\theta_1\le\theta\le\theta_2$。

［注：解 \eqref{7.62a}–\eqref{7.62b} 也不太难。设测地线方程为 $\theta=\theta(\phi)$，则

$$\frac{\dd\theta}{\dd s}=\frac{\dd\theta}{\dd\phi}\frac{\dd\phi}{\dd s}\qquad\frac{\dd^2\theta}{\dd s^2}=\frac{\dd^2\theta}{\dd\phi^2}\left(\frac{\dd\phi}{\dd s}\right)^2+\frac{\dd\theta}{\dd\phi}\frac{\dd^2\phi}{\dd s^2}.$$

代入 \eqref{7.62a}，得`}</Tx>
          <Eq n="7.64" say={R`把 $\theta$ 方程改用 $\phi$ 作参数。`}>{R`\frac{\dd^2\theta}{\dd\phi^2}\left(\frac{\dd\phi}{\dd s}\right)^2+\frac{\dd\theta}{\dd\phi}\frac{\dd^2\phi}{\dd s^2}-\sin\theta\cos\theta\left(\frac{\dd\phi}{\dd s}\right)^2=0.`}</Eq>
          <Tx>{R`用 \eqref{7.62b}消去 $\dd^2\phi/\dd s^2=-2\cot\theta\,(\dd\theta/\dd\phi)(\dd\phi/\dd s)^2$，再除以 $(\dd\phi/\dd s)^2$，与 \eqref{7.64} 一起给出`}</Tx>
          <Eq n="7.65" say={R`测地线的"轨道方程"：只含 $\theta(\phi)$ 的二阶方程。`}>{R`\frac{\dd^2\theta}{\dd\phi^2}-2\cot\theta\left(\frac{\dd\theta}{\dd\phi}\right)^2-\sin\theta\cos\theta=0.`}</Eq>
          <Tx>{R`若定义 $f(\theta)\equiv\cot\theta$，则 $\dd f/\dd\phi=-\csc^2\theta\,\theta'$，$\dd^2f/\dd\phi^2=-\csc^2\theta(\theta''-2\cot\theta\,\theta'^2)=-\cot\theta$，即 \eqref{7.65} 化为

$$\frac{\dd^2f}{\dd\phi^2}+f=0,$$

通解为 $f(\theta)=\cot\theta=A\cos\phi+B\sin\phi$，或（乘 $\sin\theta$）`}</Tx>
          <Eq n="7.66" say={R`测地线落在一个过球心的平面上：$Ax+By-z=0$，法向量 $(A,B,-1)$——大圆。`}>{R`A\sin\theta\cos\phi+B\sin\theta\sin\phi-\cos\theta=0.`}</Eq>
          <Tx>{R`\eqref{7.66} 是平面 $Ax+By-z=0$ 与球面的交线：位于法向量为 $(A,B,-1)$ 的过原点平面内的大圆。］`}</Tx>
        </Box>
        <Box kind="example" n="7.6" title={R`Poincaré 上半平面的测地线`}>
          <Tx>{R`设 $U$ 为上半平面 $U\equiv\{(x,y)\mid y>0\}$，引入 **Poincaré 度规**`}</Tx>
          <Eq n="7.67" title="Poincaré 度规" say={R`Poincaré 度规：越靠近实轴，同样的坐标长度代表越长的实际距离；它的 Gauss 曲率处处为 $-1$。`}>{R`g=\frac{\dd x\otimes\dd x+\dd y\otimes\dd y}{y^2}.`}</Eq>
          <Tx>{R`由 \eqref{7.53}（或由 $F=\frac12(x'^2+y'^2)/y^2$ 的 Euler–Lagrange 方程），非零的 Christoffel 符号为 $\Gamma^x{}_{xy}=\Gamma^x{}_{yx}=-1/y$，$\Gamma^y{}_{xx}=1/y$，$\Gamma^y{}_{yy}=-1/y$。测地线方程为`}</Tx>
          <Eq n="7.68a" say={R`$x$ 方程：等价于 $x'/y^2$ 守恒（$x$ 方向平移对称对应的守恒量）。`}>{R`x''-\frac2yx'y'=0`}</Eq>
          <Eq n="7.68b" say={R`$y$ 方程：$x$ 方向的速度把曲线"往上推"，$y$ 方向的速度则相反。`}>{R`y''+\frac1y\left[x'^2-y'^2\right]=0`}</Eq>
          <Box kind="warning" title={R`勘误：\eqref{7.68b}（p.285）`}>{R`原书印作 $y''-\frac1y[x'^2+3y'^2]=0$。由 $\Gamma^y{}_{xx}=1/y$、$\Gamma^y{}_{yy}=-1/y$，测地线方程的 $y$ 分量是 $y''+\Gamma^y{}_{xx}x'^2+\Gamma^y{}_{yy}y'^2=y''+(x'^2-y'^2)/y=0$。

**三重核对：**(i) 原书自己的解 \eqref{7.70} $x=-R\cos t+x_0$、$y=R\sin t$（$\dd s=\dd t/\sin t$）满足改正后的方程而不满足原式：此时 $y'=y\cos t$、$x'=y\sin t$、$y''=y(\cos^2t-\sin^2t)$，代入得 $y''+(x'^2-y'^2)/y=0$ ✓，而 $y''-(x'^2+3y'^2)/y=-4y\cos^2t\neq0$。(ii) 原式不保持单位速度 $(x'^2+y'^2)/y^2=1$。(iii) 交互图 2 中可以切换到"原书 (7.68b)"：数值积分出的曲线立刻偏离半圆、速度范数发散。正文已改正。`}</Box>
          <Tx>{R`\eqref{7.68a} 除以 $x'$ 后容易积分：$x''/x'=2y'/y$，即 $\ln x'=2\ln y+$ 常数，`}</Tx>
          <Eq n="7.69" say={R`守恒量：$x'/y^2$ 沿测地线不变（$g_{xx}x'$，即与 Killing 向量 $\partial_x$ 相伴的"动量"）。`}>{R`\frac{x'}{y^2}=\frac1R`}</Eq>
          <Tx>{R`其中 $R$ 为常数。由于参数 $s$ 取得使向量 $(x',y')$ 为单位长度，它满足 $(x'^2+y'^2)/y^2=1$。由 \eqref{7.69}，这变为 $y^2/R^2+(y'/y)^2=1$，或

$$\dd s=\frac{\dd y}{y\sqrt{1-y^2/R^2}}=\frac{\dd t}{\sin t}$$

这里令 $y=R\sin t$。于是 \eqref{7.69} 成为

$$x'=\frac{y^2}{R}=R\sin^2t.$$

对 $t$ 解出 $x$：

$$x=\int x'\,\dd s=\int\frac{\dd x}{\dd s}\frac{\dd s}{\dd t}\dd t=\int R\sin t\,\dd t=-R\cos t+x_0.$$

最后得到解`}</Tx>
          <Eq n="7.70" title="双曲平面的测地线" say={R`Poincaré 上半平面的测地线是圆心在实轴上的半圆（以及竖直的半直线，$R\to\infty$ 的极限）。`}>{R`x=-R\cos t+x_0\qquad y=R\sin t\qquad(y>0)`}</Eq>
          <Tx>{R`这是以 $(x_0,0)$ 为圆心、半径为 $R$ 的圆。最大延拓的测地线由 $0<t<\pi$ 给出（\figref{7.8}），其长度是无穷大：

$$I=\int\dd s=\int_{0+\varepsilon}^{\pi-\varepsilon}\frac{\dd s}{\dd t}\dd t=\int_{0+\varepsilon}^{\pi-\varepsilon}\frac{1}{\sin t}\dd t=-\frac12\log\frac{1+\cos t}{1-\cos t}\bigg|_{0+\varepsilon}^{\pi-\varepsilon}\xrightarrow[\varepsilon\to0]{}\infty.$$

实轴 $y=0$ 因而在"无穷远"：沿测地线永远走不到。`}</Tx>
        </Box>
        <Figure illustration={<GeodesicLab />} n="7.8" caption={R`Poincaré 度规在上半平面中定义的测地线。测地线的长度为无穷大。`} width="100%" />
      </Sub>

      <Sub n="7.4.4" title="The normal coordinate system" zh="正规坐标系">
        <Tx>{R`这里的内容不限于 Levi-Civita 联络，但对它取特别简单的形式。设 $c(t)$ 是 $(M,g)$ 中关于联络 $\nabla$ 的测地线，满足`}</Tx>
        <Eq n="7.71" say={R`测地线由起点与初速度唯一决定（二阶常微分方程的初值问题）。`}>{R`c(0)=p,\qquad\frac{\dd}{\dd t}\Big|_p=X=X^\mu e_\mu\in T_pM`}</Eq>
        <Tx>{R`其中 $\{e_\mu\}$ 是 $p$ 点的坐标基。从 $p$ 出发的任一测地线由 $X\in T_pM$ 确定。取 $p$ 附近的点 $q$。连接 $p$ 与 $q$ 的测地线有许多（参数可以重标），但存在**唯一**的测地线 $c_q$ 使 $c_q(1)=q$。设 $X_q\in T_pM$ 是这条测地线在 $p$ 的切向量。只要 $q$ 离 $p$ 不远，$q$ 就唯一确定 $X_q=X_q^\mu e_\mu\in T_pM$，而 $\varphi:q\mapsto X_q^\mu$ 在 $p$ 的邻域里是一个好的坐标系。这个坐标系称为以 $p$ 为基点、以 $\{e_\mu\}$ 为基的**正规坐标系**（normal coordinate system）。显然 $\varphi(p)=0$。定义映射 $\mathrm{EXP}:T_pM\to M$，$\mathrm{EXP}:X_q\mapsto q$。按定义，`}</Tx>
        <Eq n="7.72" say={R`正规坐标就是"沿测地线走多远、朝哪个方向"：$q$ 的坐标就是把它送到 $q$ 的那个初速度的分量。`}>{R`\varphi(\mathrm{EXP}\,X_q^\mu e_\mu)=X_q^\mu.`}</Eq>
        <Tx>{R`在这个坐标系中，满足 $c(0)=p$、$c(1)=q$ 的测地线 $c(t)$ 的坐标表示为`}</Tx>
        <Eq n="7.73" say={R`在正规坐标中，过基点的测地线都是"直线"：坐标随参数线性变化。`}>{R`\varphi(c(t))=X^\mu=X_q^\mu t`}</Eq>
        <Tx>{R`其中 $X_q^\mu$ 是 $q$ 的正规坐标。（$t\mapsto c(t)$ 也是以 $X_q t$ 为初速度、在参数 1 处到达 $c(t)$ 的测地线，因为仿射重参数化保持测地线，习题 7.3。）

现在证明：在正规坐标系中，Levi-Civita 联络系数在基点为零。在正规坐标中写出测地线方程：`}</Tx>
        <Eq n="7.74" say={R`把直线 $X^\mu=X_q^\mu t$ 代入测地线方程，二阶导数为零，只剩 $\Gamma$ 与速度的二次项。`}>{R`0=\frac{\dd^2X^\mu}{\dd t^2}+\Gamma^\mu{}_{\nu\lambda}(X_q^\kappa t)\frac{\dd X^\nu}{\dd t}\frac{\dd X^\lambda}{\dd t}=\Gamma^\mu{}_{\nu\lambda}(X_q^\kappa t)X_q^\nu X_q^\lambda.`}</Eq>
        <Tx>{R`取 $t=0$，对 $p$ 点的**任意** $X_q^\nu$ 都有 $\Gamma^\mu{}_{\nu\lambda}(p)X_q^\nu X_q^\lambda=0$，所以 $\Gamma^\mu{}_{\nu\lambda}(p)+\Gamma^\mu{}_{\lambda\nu}(p)=0$（二次型恒为零 ⇒ 对称部分为零）。由于我们的联络对称，必有`}</Tx>
        <Eq n="7.75" title={R`正规坐标中 $\Gamma(p)=0$`} say={R`在基点的正规坐标里，Levi-Civita 联络系数全部为零：局部上总能"消去引力"——这就是等效原理的数学形式。`}>{R`\Gamma^\mu{}_{\nu\lambda}(p)=0.`}</Eq>
        <Tx>{R`于是，在这个坐标系中任意张量 $t$ 的协变导数在 $p$ 点取极简单的形式：`}</Tx>
        <Eq n="7.76" say={R`在正规坐标的基点，协变导数就是普通偏导数——许多张量恒等式可以在这里用偏导数证明，再因"两边都是张量"推广到任意坐标。`}>{R`\nabla_Xt^{\ldots}{}_{\ldots}=X[t^{\ldots}{}_{\ldots}].`}</Eq>
        <Tx>{R`\eqref{7.75} 并不意味着 $\Gamma^\mu{}_{\nu\lambda}$ 在 $q\,(\neq p)$ 处也为零。事实上由 \eqref{7.42}，`}</Tx>
        <Eq n="7.77" say={R`正规坐标可以把 $\Gamma$ 在一点消去，却消不掉它的导数：曲率是去不掉的"潮汐力"。`}>{R`R^\kappa{}_{\lambda\mu\nu}(p)=\partial_\mu\Gamma^\kappa{}_{\nu\lambda}(p)-\partial_\nu\Gamma^\kappa{}_{\mu\lambda}(p)`}</Eq>
        <Tx>{R`所以若 $R^\kappa{}_{\lambda\mu\nu}(p)\neq0$，则 $\partial_\mu\Gamma^\kappa{}_{\nu\lambda}(p)\neq0$。`}</Tx>
      </Sub>

      <Sub n="7.4.5" title="Riemann curvature tensor with Levi-Civita connection" zh="Levi-Civita 联络的 Riemann 曲率张量">
        <Tx>{R`设 $\nabla$ 是 Levi-Civita 联络。Riemann 曲率张量的分量由 \eqref{7.42} 给出，其中

$$\Gamma^\kappa{}_{\mu\nu}=\left\{{\kappa\atop\mu\nu}\right\}$$

而挠率按定义为零。使用 Levi-Civita 联络时许多公式会简化。`}</Tx>
        <Exercise n="7.10" title="三个度规的曲率" level="★★★"
          hint={R`(a) 可以逐个分量算，也可以用 §7.8 的正交标架与 Cartan 结构方程（更快）。(b) 用正交标架 $\hat\theta^0=\dd t$、$\hat\theta^1=a\,\dd r/\sqrt{1-kr^2}$、$\hat\theta^2=ar\,\dd\theta$、$\hat\theta^3=ar\sin\theta\,\dd\phi$。(c) 见例 7.15。`}
          solution={R`**(a)** 非零 Christoffel 符号（由 $F=\frac12(r'^2+r^2\theta'^2+r^2\sin^2\theta\,\phi'^2)$ 的 Euler–Lagrange 方程读出）：

$$\Gamma^r{}_{\theta\theta}=-r,\quad\Gamma^r{}_{\phi\phi}=-r\sin^2\theta,\quad\Gamma^\theta{}_{r\theta}=\Gamma^\phi{}_{r\phi}=\frac1r,\quad\Gamma^\theta{}_{\phi\phi}=-\sin\theta\cos\theta,\quad\Gamma^\phi{}_{\theta\phi}=\cot\theta.$$

用 \eqref{7.42}：

$$R^r{}_{\theta r\theta}=\partial_r\Gamma^r{}_{\theta\theta}-\Gamma^\theta{}_{r\theta}\Gamma^r{}_{\theta\theta}=-1-\tfrac1r(-r)=0,$$

$$R^r{}_{\phi r\phi}=\partial_r\Gamma^r{}_{\phi\phi}-\Gamma^\phi{}_{r\phi}\Gamma^r{}_{\phi\phi}=-\sin^2\theta+\sin^2\theta=0,$$

$$R^\theta{}_{\phi\theta\phi}=\partial_\theta\Gamma^\theta{}_{\phi\phi}+\Gamma^r{}_{\phi\phi}\Gamma^\theta{}_{\theta r}-\Gamma^\phi{}_{\theta\phi}\Gamma^\theta{}_{\phi\phi}=-\cos2\theta-\sin^2\theta+\cos^2\theta=0.$$

三维中 $F(3)=6$（\eqref{7.88}），其余三个独立分量（如 $R^r{}_{\theta r\phi}$、$R^\theta{}_{r\theta\phi}$、$R^r{}_{\theta\theta\phi}$）同理逐项为零。更快的验证：正交标架 $\hat\theta^1=\dd r$、$\hat\theta^2=r\dd\theta$、$\hat\theta^3=r\sin\theta\dd\phi$ 的联络一形式为 $\omega^2{}_1=\dd\theta$、$\omega^3{}_1=\sin\theta\dd\phi$、$\omega^3{}_2=\cos\theta\dd\phi$，由 \eqref{7.146b}：$R^2{}_1=\dd\omega^2{}_1+\omega^2{}_3\wedge\omega^3{}_1=-\cos\theta\sin\theta\,\dd\phi\wedge\dd\phi=0$，$R^3{}_1=\cos\theta\,\dd\theta\wedge\dd\phi+\cos\theta\,\dd\phi\wedge\dd\theta=0$，$R^3{}_2=-\sin\theta\,\dd\theta\wedge\dd\phi+\sin\theta\,\dd\theta\wedge\dd\phi=0$。当然这在意料之中：Cartesian 坐标中 $\Gamma=0$、$R=0$，而 $R$ 是张量。

**(b)** 正交标架如提示。由 \eqref{7.156}（$\omega_{\alpha\beta}=-\omega_{\beta\alpha}$，Lorentz 符号下 $\omega^0{}_i=\omega^i{}_0$）解得

$$\omega^i{}_0=\frac{\dot a}{a}\hat\theta^i,\quad\omega^2{}_1=\frac{\sqrt{1-kr^2}}{ar}\hat\theta^2,\quad\omega^3{}_1=\frac{\sqrt{1-kr^2}}{ar}\hat\theta^3,\quad\omega^3{}_2=\frac{\cot\theta}{ar}\hat\theta^3.$$

结构方程给出（$i,j=1,2,3$）

$$R^0{}_i=\frac{\ddot a}{a}\hat\theta^0\wedge\hat\theta^i,\qquad R^i{}_j=\frac{\dot a^2+k}{a^2}\hat\theta^i\wedge\hat\theta^j,$$

即正交分量 $R_{\hat0\hat i\hat0\hat j}=-\frac{\ddot a}{a}\delta_{ij}$，$R_{\hat i\hat j\hat k\hat l}=\frac{\dot a^2+k}{a^2}(\delta_{ik}\delta_{jl}-\delta_{il}\delta_{jk})$。缩并：

$$\sym{Ric}{\mathit{Ric}}_{\hat0\hat0}=-3\frac{\ddot a}{a},\qquad \sym{Ric}{\mathit{Ric}}_{\hat i\hat j}=\left(\frac{\ddot a}{a}+2\frac{\dot a^2+k}{a^2}\right)\delta_{ij},\qquad\mathcal R=6\left(\frac{\ddot a}{a}+\frac{\dot a^2+k}{a^2}\right).$$

坐标分量：$\sym{Ric}{\mathit{Ric}}_{tt}=-3\ddot a/a$，$\sym{Ric}{\mathit{Ric}}_{ij}=(a\ddot a+2\dot a^2+2k)\,g_{ij}/a^2$。检验：de Sitter（$a=\mathrm{e}^{Ht}$，$k=0$）给出 $\mathcal R=12H^2$，$R_{\kappa\lambda\mu\nu}=H^2(g_{\kappa\mu}g_{\lambda\nu}-g_{\kappa\nu}g_{\lambda\mu})$，最大对称 ✓。

**(c)** 由例 7.15 的曲率二形式 \eqref{7.167}（含本站的改正），正交分量为

$$R_{\hat0\hat1\hat0\hat1}=-\frac{2M}{r^3},\quad R_{\hat0\hat2\hat0\hat2}=R_{\hat0\hat3\hat0\hat3}=\frac{M}{r^3},\quad R_{\hat1\hat2\hat1\hat2}=R_{\hat1\hat3\hat1\hat3}=-\frac{M}{r^3},\quad R_{\hat2\hat3\hat2\hat3}=\frac{2M}{r^3}.$$

缩并：$\sym{Ric}{\mathit{Ric}}_{\hat0\hat0}=\sum_iR_{\hat0\hat i\hat0\hat i}=-\frac{2M}{r^3}+\frac{M}{r^3}+\frac{M}{r^3}=0$；$\sym{Ric}{\mathit{Ric}}_{\hat1\hat1}=\eta^{00}R_{\hat0\hat1\hat0\hat1}+R_{\hat2\hat1\hat2\hat1}+R_{\hat3\hat1\hat3\hat1}=\frac{2M}{r^3}-\frac{M}{r^3}-\frac{M}{r^3}=0$；同理 $\sym{Ric}{\mathit{Ric}}_{\hat2\hat2}=-\frac{M}{r^3}-\frac{M}{r^3}+\frac{2M}{r^3}=0$。所以 $\sym{Ric}{\mathit{Ric}}_{\mu\nu}=0$、$\mathcal R=0$：Schwarzschild 度规是真空 Einstein 方程的解，而 Riemann 张量不为零（潮汐力 $\propto M/r^3$）。Kretschmann 标量 $R_{\kappa\lambda\mu\nu}R^{\kappa\lambda\mu\nu}=48M^2/r^6$ 在 $r=2M$ 处有限——视界不是曲率奇点。`}>
          {R`(a) 设 $g=\dd r\otimes\dd r+r^2(\dd\theta\otimes\dd\theta+\sin^2\theta\,\dd\phi\otimes\dd\phi)$ 是 $(\R^3,\delta)$ 的度规，$0\le\theta\le\pi$，$0\le\phi<2\pi$。直接计算证明 Levi-Civita 联络的 Riemann 曲率张量的所有分量为零。

(b) 空间均匀各向同性的宇宙由 **Robertson–Walker 度规**描述：`}
        </Exercise>
        <Eq n="7.78" say={R`Robertson–Walker 度规：空间截面是常曲率空间（$k=+1,0,-1$ 分别为球、平、双曲），整体按标度因子 $a(t)$ 伸缩。`}>{R`g=-\dd t\otimes\dd t+a^2(t)\left(\frac{\dd r\otimes\dd r}{1-kr^2}+r^2(\dd\theta\otimes\dd\theta+\sin^2\theta\,\dd\phi\otimes\dd\phi)\right)`}</Eq>
        <Tx>{R`其中 $k$ 是常数，适当重标 $r$ 后可取 $-1$、$0$ 或 $+1$，$0\le\theta\le\pi$，$0\le\phi<2\pi$。若 $k=+1$，$r$ 限制在 $0\le r<1$。计算 Riemann 张量、Ricci 张量与标量曲率。

(c) **Schwarzschild 度规**为`}</Tx>
        <Eq n="7.79" say={R`Schwarzschild 度规：质量为 $M$ 的球对称天体外部的真空时空；$r=2M$ 是视界。`}>{R`g=-\left(1-\frac{2M}{r}\right)\dd t\otimes\dd t+\frac{1}{1-\dfrac{2M}{r}}\dd r\otimes\dd r+r^2(\dd\theta\otimes\dd\theta+\sin^2\theta\,\dd\phi\otimes\dd\phi)`}</Eq>
        <Tx>{R`其中 $0<2M<r$，$0\le\theta\le\pi$，$0\le\phi<2\pi$。计算 Riemann 张量、Ricci 张量与标量曲率。［注：度规 \eqref{7.79} 描述质量为 $M$ 的球对称天体的时空。］（以上三问的解答见习题 7.10 的"解答"按钮。）`}</Tx>
        <Exercise n="7.11" title="全协变 Riemann 张量与它的对称性" level="★★★"
          hint={R`在正规坐标（$\Gamma(p)=0$）中先算二阶导数项，再在一般坐标中补上 $\Gamma\Gamma$ 项：用 $\partial_\mu g_{\kappa\sigma}=\Gamma_{\kappa\mu\sigma}+\Gamma_{\sigma\mu\kappa}$（$\Gamma_{\kappa\mu\nu}\equiv g_{\kappa\lambda}\Gamma^\lambda{}_{\mu\nu}$）。对称性 (b)：$R(X,Y)$ 作为对 $g$ 的"导子"把 $g$ 映为零。(c)：用 (a)(b) 与第一 Bianchi 恒等式。`}
          solution={R`**公式。**由 \eqref{7.42}，$R_{\kappa\lambda\mu\nu}=g_{\kappa\sigma}(\partial_\mu\Gamma^\sigma{}_{\nu\lambda}-\partial_\nu\Gamma^\sigma{}_{\mu\lambda})+g_{\kappa\sigma}(\Gamma^\eta{}_{\nu\lambda}\Gamma^\sigma{}_{\mu\eta}-\Gamma^\eta{}_{\mu\lambda}\Gamma^\sigma{}_{\nu\eta})$。用 $g_{\kappa\sigma}\partial_\mu\Gamma^\sigma{}_{\nu\lambda}=\partial_\mu\Gamma_{\kappa\nu\lambda}-(\Gamma_{\kappa\mu\sigma}+\Gamma_{\sigma\mu\kappa})\Gamma^\sigma{}_{\nu\lambda}$（度规相容），含 $\Gamma_{\kappa\mu\sigma}\Gamma^\sigma{}_{\nu\lambda}$ 的项与第二组括号相消，剩下

$$R_{\kappa\lambda\mu\nu}=\partial_\mu\Gamma_{\kappa\nu\lambda}-\partial_\nu\Gamma_{\kappa\mu\lambda}+g_{\zeta\eta}\big(\Gamma^\zeta{}_{\nu\kappa}\Gamma^\eta{}_{\mu\lambda}-\Gamma^\zeta{}_{\mu\kappa}\Gamma^\eta{}_{\nu\lambda}\big).$$

再代入 $\Gamma_{\kappa\nu\lambda}=\frac12(\partial_\nu g_{\kappa\lambda}+\partial_\lambda g_{\kappa\nu}-\partial_\kappa g_{\nu\lambda})$，$\partial_\mu\partial_\nu g_{\kappa\lambda}$ 项相消，得

$$R_{\kappa\lambda\mu\nu}=\frac12\left(\frac{\partial^2g_{\kappa\nu}}{\partial x^\lambda\partial x^\mu}-\frac{\partial^2g_{\lambda\nu}}{\partial x^\kappa\partial x^\mu}-\frac{\partial^2g_{\kappa\mu}}{\partial x^\lambda\partial x^\nu}+\frac{\partial^2g_{\lambda\mu}}{\partial x^\kappa\partial x^\nu}\right)+g_{\zeta\eta}\big(\Gamma^\zeta{}_{\kappa\nu}\Gamma^\eta{}_{\lambda\mu}-\Gamma^\zeta{}_{\kappa\mu}\Gamma^\eta{}_{\lambda\nu}\big).$$

检验（单位球面，$\theta=\pi/2$）：$R_{\theta\phi\theta\phi}=-\frac12\partial_\theta^2(\sin^2\theta)+\sin^2\theta\cot^2\theta=-\cos2\theta+\cos^2\theta=\sin^2\theta$，与 \eqref{7.42} 直接计算的 $R^\theta{}_{\phi\theta\phi}=\sin^2\theta$ 一致（$K=1$）。

**(7.80a)** 由 \eqref{7.43}。**(7.80b)** 由度规相容，$\nabla_X$ 与 $g$ 交换，$[\nabla_X,\nabla_Y]-\nabla_{[X,Y]}$ 作用在 $g(Z,W)$（函数）上为零：

$$0=g(R(X,Y)Z,W)+g(Z,R(X,Y)W),$$

即 $R_{\kappa\lambda\mu\nu}=-R_{\lambda\kappa\mu\nu}$。**(7.80c)** 记 $R_{\kappa\lambda\mu\nu}$ 的第一 Bianchi 恒等式 \eqref{7.87}：$R_{\kappa\lambda\mu\nu}+R_{\kappa\mu\nu\lambda}+R_{\kappa\nu\lambda\mu}=0$。把它对 $(\kappa\lambda\mu\nu)$、$(\lambda\mu\nu\kappa)$、$(\mu\nu\kappa\lambda)$、$(\nu\kappa\lambda\mu)$ 四种轮换各写一次，用 (a)(b) 化简后，第一、二式相加减去第三、四式，得 $2R_{\kappa\lambda\mu\nu}-2R_{\mu\nu\kappa\lambda}=0$。**(7.80d)** $\sym{Ric}{\mathit{Ric}}_{\mu\nu}=g^{\kappa\lambda}R_{\kappa\mu\lambda\nu}=g^{\kappa\lambda}R_{\lambda\nu\kappa\mu}=\sym{Ric}{\mathit{Ric}}_{\nu\mu}$（用 (c)）。`}>
          {R`设 $R$ 是关于 Levi-Civita 联络定义的 Riemann 张量，$R_{\kappa\lambda\mu\nu}\equiv g_{\kappa\zeta}R^\zeta{}_{\lambda\mu\nu}$。证明

$$R_{\kappa\lambda\mu\nu}=\frac12\left(\frac{\partial^2g_{\kappa\nu}}{\partial x^\lambda\partial x^\mu}-\frac{\partial^2g_{\lambda\nu}}{\partial x^\kappa\partial x^\mu}-\frac{\partial^2g_{\kappa\mu}}{\partial x^\lambda\partial x^\nu}+\frac{\partial^2g_{\lambda\mu}}{\partial x^\kappa\partial x^\nu}\right)+g_{\zeta\eta}\big(\Gamma^\zeta{}_{\kappa\nu}\Gamma^\eta{}_{\lambda\mu}-\Gamma^\zeta{}_{\kappa\mu}\Gamma^\eta{}_{\lambda\nu}\big).$$

并验证下列对称性：`}
        </Exercise>
        <Box kind="warning" title={R`勘误：习题 7.11 的公式整体差一个符号（p.288）`}>{R`原书给出

$$R_{\kappa\lambda\mu\nu}=\tfrac12\Big(\partial_\lambda\partial_\nu g_{\kappa\mu}-\partial_\kappa\partial_\nu g_{\lambda\mu}-\partial_\lambda\partial_\mu g_{\kappa\nu}+\partial_\kappa\partial_\mu g_{\mu\nu}\Big)+g_{\zeta\eta}(\Gamma^\zeta{}_{\kappa\mu}\Gamma^\eta{}_{\lambda\nu}-\Gamma^\zeta{}_{\kappa\nu}\Gamma^\eta{}_{\lambda\mu}).$$

两个问题：(1) 最后一个二阶导数项 $\partial_\kappa\partial_\mu g_{\mu\nu}$ 的指标重复，应为 $g_{\lambda\nu}$；(2) 即便改正 (1)，整个表达式也恰为本书约定 \eqref{7.42} 下 $R_{\kappa\lambda\mu\nu}$ 的**负值**（它等于 $R_{\kappa\lambda\nu\mu}$）。判据：单位球面赤道上原书公式给出 $R_{\theta\phi\theta\phi}=-1$，而 \eqref{7.42} 直接计算（以及 \eqref{7.89} 中 $K=+1$、例 7.14）都给出 $+1$。题面已按 \eqref{7.42} 的约定改正；交互图 3 也按 \eqref{7.42} 计算，并用独立的 Brioschi 公式核对 $K$。`}</Box>
        <Eq n="7.80a" say={R`对最后两个指标反对称（来自 $R(X,Y)=-R(Y,X)$）。`}>{R`R_{\kappa\lambda\mu\nu}=-R_{\kappa\lambda\nu\mu}\qquad(\text{参看 }(7.43))`}</Eq>
        <Eq n="7.80b" say={R`对前两个指标反对称：度规联络的曲率是"无穷小转动"，在每个切空间里是反对称矩阵。`}>{R`R_{\kappa\lambda\mu\nu}=-R_{\lambda\kappa\mu\nu}`}</Eq>
        <Eq n="7.80c" title="成对对称" say={R`交换前后两对指标不变：曲率是"二形式空间上的对称矩阵"。`}>{R`R_{\kappa\lambda\mu\nu}=R_{\mu\nu\kappa\lambda}`}</Eq>
        <Eq n="7.80d" say={R`Levi-Civita 联络的 Ricci 张量是对称的。`}>{R`\sym{Ric}{\mathit{Ric}}_{\mu\nu}=\sym{Ric}{\mathit{Ric}}_{\nu\mu}.`}</Eq>
        <Stmt id="T7.2">
          <Proof steps={[
            { claim: R`定义轮换和 $\mathfrak{S}\{f(X,Y,Z)\}=f(X,Y,Z)+f(Z,X,Y)+f(Y,Z,X)$。对恒等式 $T(X,Y)=\nabla_XY-\nabla_YX-[X,Y]=0$ 关于 $Z$ 求协变导数：`, tex: R`0=\nabla_Z\{\nabla_XY-\nabla_YX-[X,Y]\}=\nabla_Z\nabla_XY-\nabla_Z\nabla_YX-\{\nabla_{[X,Y]}Z+[Z,[X,Y]]\}`, why: R`第二个等号再次用无挠条件：$\nabla_Z[X,Y]=\nabla_{[X,Y]}Z+[Z,[X,Y]]$。` },
            { claim: R`作轮换和：`, tex: R`0=\mathfrak{S}\{\nabla_Z\nabla_XY-\nabla_Z\nabla_YX-\nabla_{[X,Y]}Z-[Z,[X,Y]]\}=\mathfrak{S}\{\nabla_Z\nabla_XY-\nabla_Z\nabla_YX-\nabla_{[X,Y]}Z\}=\mathfrak{S}\{R(X,Y)Z\}`, why: R`第二个等号用李括号的 Jacobi 恒等式 $\mathfrak{S}\{[X,[Y,Z]]\}=0$；第三个等号是在轮换和内重新排列：$\mathfrak S\{\nabla_Z\nabla_XY\}=\mathfrak S\{\nabla_X\nabla_YZ\}$，$\mathfrak S\{\nabla_Z\nabla_YX\}=\mathfrak S\{\nabla_Y\nabla_XZ\}$。`, uses: ["X:Jacobi"] },
            { claim: R`**第二式。**$\mathfrak{S}$ 只轮换 $(X,Y,Z)$。把恒等式 $R(T(X,Y),Z)V=R(\nabla_XY-\nabla_YX-[X,Y],Z)V=0$ 作轮换和：`, tex: R`0=\mathfrak{S}\{R(\nabla_XY,Z)-R(\nabla_YX,Z)-R([X,Y],Z)\}V=\mathfrak{S}\{R(\nabla_ZX,Y)+R(X,\nabla_ZY)-R([X,Y],Z)\}V`, why: R`即 \eqref{7.82}。第二个等号在轮换和内循环重命名：$\mathfrak S\{R(\nabla_XY,Z)\}=\mathfrak S\{R(\nabla_ZX,Y)\}$，$\mathfrak S\{R(\nabla_YX,Z)\}=\mathfrak S\{R(\nabla_ZY,X)\}=-\mathfrak S\{R(X,\nabla_ZY)\}$。`, uses: ["7.82"] },
            { claim: R`由 Leibniz 律 $\nabla_Z\{R(X,Y)V\}=(\nabla_ZR)(X,Y)V+R(X,Y)\nabla_ZV+R(\nabla_ZX,Y)V+R(X,\nabla_ZY)V$，上式成为`, tex: R`0=\mathfrak{S}\{-(\nabla_ZR)(X,Y)+[\nabla_Z,R(X,Y)]-R([X,Y],Z)\}V` },
            { claim: R`后两项代入 $R(X,Y)=[\nabla_X,\nabla_Y]-\nabla_{[X,Y]}$ 后为零：`, tex: R`\mathfrak{S}\{[\nabla_Z,R(X,Y)]-R([X,Y],Z)\}=\mathfrak{S}\{[\nabla_Z,[\nabla_X,\nabla_Y]]-[\nabla_Z,\nabla_{[X,Y]}]-[\nabla_{[X,Y]},\nabla_Z]+\nabla_{[[X,Y],Z]}\}=0`, why: R`第二、三项互相抵消；第一项是算子对易子的 Jacobi 恒等式，第四项是向量场的 Jacobi 恒等式（$\nabla$ 对下标线性），轮换和都为零。`, uses: ["X:Jacobi"] },
            { claim: R`于是 $\mathfrak{S}\{(\nabla_XR)(Y,Z)\}V=0$（把 $\mathfrak S\{(\nabla_ZR)(X,Y)\}$ 轮换重排）。` },
          ]} />
        </Stmt>
        <Eq n="7.82" say={R`第二 Bianchi 恒等式证明的中间式：把恒等式 $R(T(X,Y),Z)V=0$ 轮换求和并重排，协变导数被移到 $R$ 的宗量上。`}>{R`0=\mathfrak{S}\{R(\nabla_XY,Z)-R(\nabla_YX,Z)-R([X,Y],Z)\}V=\mathfrak{S}\{R(\nabla_ZX,Y)+R(X,\nabla_ZY)-R([X,Y],Z)\}V.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{7.82} 第二行中 $R(X,\nabla_ZY)$ 前的符号（p.289）`}>{R`原书第二行印作 $\mathfrak S\{R(\nabla_ZX,Y)-R(X,\nabla_ZY)-R([X,Y],Z)\}V$。由循环重命名，$-\mathfrak S\{R(\nabla_YX,Z)\}=-\mathfrak S\{R(\nabla_ZY,X)\}=+\mathfrak S\{R(X,\nabla_ZY)\}$，应为加号。也只有加号才能与紧接着的 Leibniz 律 $\nabla_Z\{R(X,Y)V\}=(\nabla_ZR)(X,Y)V+R(X,Y)\nabla_ZV+R(\nabla_ZX,Y)V+R(X,\nabla_ZY)V$ 合并成原书下一行的 $\mathfrak S\{-(\nabla_ZR)(X,Y)+[\nabla_Z,R(X,Y)]-R([X,Y],Z)\}V$（原书这一行是对的）。正文已改正。`}</Box>
        <Eq n="7.81a" keyEq title="第一 Bianchi 恒等式" say={R`第一 Bianchi 恒等式：曲率算子对三个向量轮换求和为零——无挠的代价。`}>{R`R(X,Y)Z+R(Z,X)Y+R(Y,Z)X=0\qquad(\text{第一 Bianchi 恒等式})`}</Eq>
        <Eq n="7.81b" title="第二 Bianchi 恒等式" say={R`第二 Bianchi 恒等式：曲率的协变导数轮换求和为零，类比 $\dd F=0$（"曲率的边界为零"）。`}>{R`(\nabla_XR)(Y,Z)V+(\nabla_ZR)(X,Y)V+(\nabla_YR)(Z,X)V=0\qquad(\text{第二 Bianchi 恒等式})`}</Eq>
        <Tx>{R`（证明按 Nomizu 1981。）用分量写，Bianchi 恒等式为`}</Tx>
        <Eq n="7.83a" say={R`第一 Bianchi 恒等式的分量形式：后三个指标轮换求和为零。`}>{R`R^\kappa{}_{\lambda\mu\nu}+R^\kappa{}_{\mu\nu\lambda}+R^\kappa{}_{\nu\lambda\mu}=0\qquad(\text{第一 Bianchi 恒等式})`}</Eq>
        <Eq n="7.83b" say={R`第二 Bianchi 恒等式的分量形式：求导指标与最后两个指标轮换求和为零。`}>{R`(\nabla_\kappa R)^\xi{}_{\lambda\mu\nu}+(\nabla_\mu R)^\xi{}_{\lambda\nu\kappa}+(\nabla_\nu R)^\xi{}_{\lambda\kappa\mu}=0\qquad(\text{第二 Bianchi 恒等式}).`}</Eq>
        <Tx>{R`把第二 Bianchi 恒等式的指标 $\xi$ 与 $\mu$ 缩并（$R^\mu{}_{\lambda\mu\nu}=\sym{Ric}{\mathit{Ric}}_{\lambda\nu}$，$R^\mu{}_{\lambda\kappa\mu}=-\sym{Ric}{\mathit{Ric}}_{\lambda\kappa}$），得到一个重要关系：`}</Tx>
        <Eq n="7.84" say={R`缩并一次的 Bianchi 恒等式：Ricci 张量的旋度与 Riemann 张量的散度联系起来。`}>{R`(\nabla_\kappa \sym{Ric}{\mathit{Ric}})_{\lambda\nu}+(\nabla_\mu R)^\mu{}_{\lambda\nu\kappa}-(\nabla_\nu \sym{Ric}{\mathit{Ric}})_{\lambda\kappa}=0.`}</Eq>
        <Tx>{R`再缩并 $\lambda$ 与 $\nu$（乘 $g^{\lambda\nu}$；$g^{\lambda\nu}R^\mu{}_{\lambda\nu\kappa}=-\sym{Ric}{\mathit{Ric}}^\mu{}_\kappa$ 由 \eqref{7.80b}），得 $\nabla_\mu(\mathcal R\delta-2\sym{Ric}{\mathit{Ric}})^\mu{}_\kappa=0$，或`}</Tx>
        <Eq n="7.85" keyEq title="Einstein 张量无散" say={R`Einstein 张量的散度恒为零——这是几何恒等式，与物质无关；它要求物质的能动张量也守恒。`}>{R`\nabla_\mu G^{\mu\nu}=0`}</Eq>
        <Tx>{R`其中 $G^{\mu\nu}$ 是 **Einstein 张量**，定义为`}</Tx>
        <Eq n="7.86" title="Einstein 张量" say={R`Einstein 张量：Ricci 张量减去半个标量曲率乘度规，是曲率中唯一"自动守恒"的二阶对称张量。`}>{R`G^{\mu\nu}=\sym{Ric}{\mathit{Ric}}^{\mu\nu}-\tfrac12g^{\mu\nu}\mathcal{R}.`}</Eq>
        <Tx>{R`历史上，Einstein 建立广义相对论时，起初让 Ricci 张量 $\sym{Ric}{\mathit{Ric}}^{\mu\nu}$ 等于能动张量 $T^{\mu\nu}$。后来他意识到 $T^{\mu\nu}$ 满足协变守恒方程 $\nabla_\mu T^{\mu\nu}=0$，而 $\sym{Ric}{\mathit{Ric}}^{\mu\nu}$ 不满足。为避开这个困难，他提出让 $G^{\mu\nu}$ 等于 $T^{\mu\nu}$。这个新方程是自然的：它可以由一个标量作用量变分得到，见 §7.10。`}</Tx>
        <Exercise n="7.12" title={R`二维时空的 Einstein 张量`} level="★★"
          hint={R`非零 Christoffel 符号：$\Gamma^t{}_{xx}=R\dot R$，$\Gamma^x{}_{tx}=\Gamma^x{}_{xt}=\dot R/R$。或者直接用习题 7.13 的一般结论。`}
          solution={R`**直接计算。**由 $F=\frac12(-\dot t^2+R^2\dot x^2)$ 的 Euler–Lagrange 方程读出 $\Gamma^t{}_{xx}=R\dot R$、$\Gamma^x{}_{tx}=\dot R/R$。由 \eqref{7.42}：

$$R^t{}_{xtx}=\partial_t\Gamma^t{}_{xx}-\Gamma^x{}_{tx}\Gamma^t{}_{xx}=(\dot R^2+R\ddot R)-\dot R^2=R\ddot R,$$

$$R^x{}_{txt}=-\partial_t\Gamma^x{}_{xt}-\Gamma^x{}_{xt}\Gamma^x{}_{tx}=-\Big(\frac{\ddot R}{R}-\frac{\dot R^2}{R^2}\Big)-\frac{\dot R^2}{R^2}=-\frac{\ddot R}{R}.$$

于是 $\sym{Ric}{\mathit{Ric}}_{xx}=R^t{}_{xtx}=R\ddot R$，$\sym{Ric}{\mathit{Ric}}_{tt}=R^x{}_{txt}=-\ddot R/R$，$\sym{Ric}{\mathit{Ric}}_{tx}=0$，标量曲率 $\mathcal R=g^{tt}\sym{Ric}{\mathit{Ric}}_{tt}+g^{xx}\sym{Ric}{\mathit{Ric}}_{xx}=\ddot R/R+\ddot R/R=2\ddot R/R$。

$$G_{tt}=-\frac{\ddot R}{R}-\frac12(-1)\frac{2\ddot R}{R}=0,\qquad G_{xx}=R\ddot R-\frac12R^2\frac{2\ddot R}{R}=0.$$

**一般原因：**二维中 $\sym{Ric}{\mathit{Ric}}_{\mu\nu}=\frac12\mathcal Rg_{\mu\nu}$（习题 7.13），所以 $G_{\mu\nu}\equiv0$ 对**任何**二维度规成立。因此二维中 Einstein 方程没有动力学内容，Einstein–Hilbert 作用量 $\int\mathcal R\sqrt{|g|}$ 是拓扑不变量（Gauss–Bonnet），这正是弦论世界面上可以随意选度规的原因之一（§7.11）。`}>
          {R`设 $(M,g)$ 是二维流形，$g=-\dd t\otimes\dd t+R^2(t)\dd x\otimes\dd x$，$R(t)$ 是 $t$ 的任意函数。证明 Einstein 张量为零。`}
        </Exercise>
        <Tx>{R`**独立分量的个数。**对称性 \eqref{7.80a}–\eqref{7.80c} 限制了 Riemann 张量的独立分量数。设 $m$ 是流形 $(M,g)$ 的维数。反对称性 $R_{\kappa\lambda\mu\nu}=-R_{\kappa\lambda\nu\mu}$ 意味着数对 $(\mu,\nu)$ 有 $N\equiv\binom m2$ 种独立选择。同理由 $R_{\kappa\lambda\mu\nu}=-R_{\lambda\kappa\mu\nu}$，数对 $(\kappa,\lambda)$ 有 $N$ 种。由于 $R_{\kappa\lambda\mu\nu}$ 关于两对 $(\kappa,\lambda)$ 与 $(\mu,\nu)$ 的交换对称，独立的选择数从 $N^2$ 减为 $\binom{N+1}2=\frac12N(N+1)$。第一 Bianchi 恒等式`}</Tx>
        <Box kind="warning" title={R`勘误：反对称性的写法（p.290）`}>{R`原书写"反对称性 $R_{\kappa\lambda\mu\nu}=-R_{\lambda\kappa\nu\mu}$ 意味着 $(\mu,\nu)$ 有 $N$ 种选择"。这里应是 \eqref{7.80a} $R_{\kappa\lambda\mu\nu}=-R_{\kappa\lambda\nu\mu}$；而 $R_{\lambda\kappa\nu\mu}$ 由两次反对称恰等于 $+R_{\kappa\lambda\mu\nu}$。正文已改正。`}</Box>
        <Eq n="7.87" say={R`全协变形式的第一 Bianchi 恒等式；与成对对称结合后，它只在四个指标全不同时才是新约束。`}>{R`R_{\kappa\lambda\mu\nu}+R_{\kappa\mu\nu\lambda}+R_{\kappa\nu\lambda\mu}=0`}</Eq>
        <Tx>{R`进一步减少独立分量数。\eqref{7.87} 的左边关于 $(\lambda,\mu,\nu)$ 的交换全反对称；再加上反对称性 \eqref{7.80b}（以及 \eqref{7.80c}），它关于全部指标全反对称。若 $m<4$，\eqref{7.87} 自动满足，不带来额外限制。若 $m\ge4$，\eqref{7.87} 只在所有指标互不相同时给出非平凡约束，约束的个数等于从 $m$ 个指标中选出四个不同指标的方式数，即 $\binom m4$。注意 $\binom m4=m(m-1)(m-2)(m-3)/4!$ 在 $m<4$ 时为零，于是 Riemann 张量的独立分量数为`}</Tx>
        <Eq n="7.88" title="独立分量数" say={R`Riemann 张量的独立分量数：一维 0、二维 1、三维 6、四维 20。`}>{R`F(m)=\frac12\binom m2\left[\binom m2+1\right]-\binom m4=\frac1{12}m^2(m^2-1).`}</Eq>
        <Tx>{R`$F(1)=0$ 说明一维流形是平坦的（一条曲线没有内禀曲率）。由于 $F(2)=1$，二维流形上只有一个独立分量 $R_{1212}$，其余分量为 $0$ 或 $\pm R_{1212}$。$F(4)=20$ 是广义相对论中众所周知的事实。（三维 $F(3)=6$，恰等于 Ricci 张量的分量数：三维中 Riemann 张量完全由 Ricci 张量决定，所以 Weyl 张量恒为零，见章末习题 7.2。）`}</Tx>
        <Exercise n="7.13" title="二维流形的曲率" level="★★"
          hint={R`$K(g_{\kappa\mu}g_{\lambda\nu}-g_{\kappa\nu}g_{\lambda\mu})$ 与 $R_{\kappa\lambda\mu\nu}$ 有相同的对称性；二维中这样的张量只有一个独立分量。`}
          solution={R`令 $G_{\kappa\lambda\mu\nu}\equiv g_{\kappa\mu}g_{\lambda\nu}-g_{\kappa\nu}g_{\lambda\mu}$。它满足 \eqref{7.80a}–\eqref{7.80c} 与 \eqref{7.87}，且 $G_{1212}=g_{11}g_{22}-g_{12}^2=\det g\neq0$。由 \eqref{7.88}，二维中满足这些对称性的张量只有一个独立分量，所以 $R_{\kappa\lambda\mu\nu}=KG_{\kappa\lambda\mu\nu}$，$K=R_{1212}/\det g\in\mathcal{F}(M)$，即 \eqref{7.89}。

**Ricci 张量：**$\sym{Ric}{\mathit{Ric}}_{\lambda\nu}=g^{\kappa\mu}R_{\kappa\lambda\mu\nu}=K(g^{\kappa\mu}g_{\kappa\mu}g_{\lambda\nu}-g^{\kappa\mu}g_{\kappa\nu}g_{\lambda\mu})=K(2g_{\lambda\nu}-g_{\lambda\nu})=Kg_{\lambda\nu}\propto g_{\lambda\nu}$。

**标量曲率：**$\mathcal R=g^{\lambda\nu}\sym{Ric}{\mathit{Ric}}_{\lambda\nu}=2K$，即 $K=\mathcal R/2$。$K$ 就是曲面的 **Gauss 曲率**：半径 $a$ 的球面 $K=1/a^2$，Poincaré 上半平面 $K=-1$，环面 \eqref{7.7} 上 $K=\cos\theta/[r(R+r\cos\theta)]$。交互图 3 让你输入任意二维度规，按 \eqref{7.53}、\eqref{7.42} 数值地算出 $\Gamma$、$R_{1212}$、$K$，并用 Brioschi 公式独立核对。`}>
          {R`设 $(M,g)$ 是二维流形。证明 Riemann 张量可写成`}
        </Exercise>
        <Eq n="7.89" title="二维曲率与 Gauss 曲率" say={R`二维中整个 Riemann 张量只由一个函数——Gauss 曲率 $K$——决定，$K=\mathcal R/2$。`}>{R`R_{\kappa\lambda\mu\nu}=K(g_{\kappa\mu}g_{\lambda\nu}-g_{\kappa\nu}g_{\lambda\mu})`}</Eq>
        <Tx>{R`其中 $K\in\mathcal{F}(M)$。计算 Ricci 张量，证明 $\sym{Ric}{\mathit{Ric}}_{\mu\nu}\propto g_{\mu\nu}$；计算标量曲率，证明 $K=\mathcal R/2$。`}</Tx>
        <CurvatureLab />
      </Sub>
    </Sec>);
}
