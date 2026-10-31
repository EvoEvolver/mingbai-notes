// 习题 3.1–3.13 —— 式 (3.87)–(3.95)。解答：3.2、3.6、3.7、3.8、3.12 依据原书附录 A；其余为编者给出。
import { Sec, Tx, Eq, Exercise, Box } from "@kit";
import { NeutrinoFPlot } from "./_ch03_plots.jsx";

const R = String.raw;

export function Exercises() {
  return (
    <Sec n="3.E" title="Exercises" zh="习题">
      <Exercise n="3.1" title="极坐标下平面的曲率标量" level="★"
        hint={R`用习题 2.2 的结果：唯一非零的 Christoffel 符号是 $\Gamma^r{}_{\theta\theta}=-r$、$\Gamma^\theta{}_{r\theta}=\Gamma^\theta{}_{\theta r}=1/r$。再用 \eqref{3.3}（指标只取 $r,\theta$）。`}
        solution={R`**$R_{rr}$：**$\Gamma^\alpha{}_{rr}=0$，所以第一、三项为零；$\Gamma^\alpha{}_{r\alpha}=\Gamma^\theta{}_{r\theta}=1/r$，第二项 $-\partial_r(1/r)=1/r^2$；第四项 $-\Gamma^\alpha{}_{\beta r}\Gamma^\beta{}_{r\alpha}=-\Gamma^\theta{}_{\theta r}\Gamma^\theta{}_{r\theta}=-1/r^2$。合计 $R_{rr}=0$。

**$R_{\theta\theta}$：**第一项 $\partial_r\Gamma^r{}_{\theta\theta}=-1$；第二项 $\partial_\theta\Gamma^\alpha{}_{\theta\alpha}=0$（不依赖 $\theta$）；第三项 $\Gamma^\alpha{}_{r\alpha}\Gamma^r{}_{\theta\theta}=\frac1r(-r)=-1$；第四项 $-[\Gamma^r{}_{\theta\theta}\Gamma^\theta{}_{\theta r}+\Gamma^\theta{}_{r\theta}\Gamma^r{}_{\theta\theta}]=-[(-r)\frac1r+\frac1r(-r)]=+2$。合计 $R_{\theta\theta}=-1-1+2=0$。

$R_{r\theta}$ 同理为零。于是 $R=g^{rr}R_{rr}+g^{\theta\theta}R_{\theta\theta}=0$：极坐标只是"用奇怪坐标写出的欧氏空间"，曲率标量为零——与球面（\exref{3.2}，$R=2/r^2$）形成对比。`}>
        {R`计算二维欧氏空间在极坐标下的度规的曲率标量，即 Ricci 张量的二维迹。利用习题 2.2 的结果。`}
      </Exercise>

      <Exercise n="3.2" title="球面上的 2+1 维时空" level="★★" fromBook
        hint={R`度规对角且只有 $g_{\phi\phi}=r^2\sin^2\theta$ 依赖坐标（$\theta$）。$g^{\theta\theta}=1/r^2$，$g^{\phi\phi}=1/(r^2\sin^2\theta)$。`}
        solution={<>
          <Tx>{R`**(a)** 由 $\Gamma^0{}_{\mu\nu}=\frac{g^{0\alpha}}2[\ldots]$，度规对角，$g^{00}=-1$，得 $\Gamma^0{}_{\mu\nu}=-\frac12[\partial_\nu g_{0\mu}+\partial_\mu g_{0\nu}-\partial_tg_{\mu\nu}]$。各项都为零：前两项因 $g_{00}$ 为常数，最后一项因度规不依赖 $x^0=t$。所以 $\Gamma^0{}_{\mu\nu}=0$。

上指标为 $\theta$：$\Gamma^\theta{}_{\mu\nu}=\frac1{2r^2}[\partial_\nu g_{\theta\mu}+\partial_\mu g_{\theta\nu}-\partial_\theta g_{\mu\nu}]$。只有 $g_{\phi\phi}$ 依赖变量，所以前两项为零，最后一项只在 $\mu=\nu=\phi$ 时非零：
$$\Gamma^\theta{}_{\phi\phi}=\frac1{2r^2}\left(-r^2\frac{\partial\sin^2\theta}{\partial\theta}\right)=-\sin\theta\cos\theta.$$
上指标为 $\phi$：$\Gamma^\phi{}_{\mu\nu}=\frac{1}{2r^2\sin^2\theta}[\ldots]$。最后一项为零（度规不依赖 $\phi$）；前两项只在 $\mu,\nu$ 一个是 $\phi$、一个是 $\theta$ 时非零：
$$\Gamma^\phi{}_{\phi\theta}=\Gamma^\phi{}_{\theta\phi}=\frac{\cos\theta}{\sin\theta}.$$

**(b)** 测地线方程 $d^2x^\mu/d\lambda^2=-\Gamma^\mu{}_{\alpha\beta}P^\alpha P^\beta$。由于 $\Gamma^0{}_{\mu\nu}=0$，$E=dt/d\lambda$ 为常数，$d^2\theta/d\lambda^2=E^2\ddot\theta$（点表示对 $t$ 求导）。$\theta$ 分量：
$$\ddot\theta-\sin\theta\cos\theta\,\dot\phi^2=0.$$
$\phi$ 分量：右边 $(\alpha,\beta)=(\theta,\phi)$ 与 $(\phi,\theta)$ 两项相同，
$$\ddot\phi+2\frac{\cos\theta}{\sin\theta}\dot\theta\dot\phi=0,$$
它等价于 $\frac{d}{dt}(\dot\phi\sin^2\theta)=0$——括号中的守恒量是角动量。

**(c)** 所有带时间指标的 $\Gamma^\mu{}_{\alpha\beta}$ 为零，故 $R_{00}=0$。
$$R_{\theta\theta}=-\frac{\partial\Gamma^\phi{}_{\theta\phi}}{\partial\theta}-\Gamma^\phi{}_{\theta\phi}\Gamma^\phi{}_{\theta\phi}=\left[1+\frac{\cos^2\theta}{\sin^2\theta}\right]-\left(\frac{\cos\theta}{\sin\theta}\right)^2=1,$$
$$R_{\phi\phi}=\frac{\partial\Gamma^\theta{}_{\phi\phi}}{\partial\theta}-\Gamma^\theta{}_{\phi\phi}\Gamma^\phi{}_{\phi\theta}=-(\cos^2\theta-\sin^2\theta)+\sin\theta\cos\theta\frac{\cos\theta}{\sin\theta}=\sin^2\theta.$$
（$R_{\phi\phi}$ 的展开中 $\Gamma^\phi{}_{\theta\phi}\Gamma^\theta{}_{\phi\phi}$ 与 $-\Gamma^\phi{}_{\theta\phi}\Gamma^\theta{}_{\phi\phi}$ 两项相消。）最后
$$R=g^{\mu\nu}R_{\mu\nu}=-R_{00}+\frac{1}{r^2}R_{\theta\theta}+\frac{1}{r^2\sin^2\theta}R_{\phi\phi}=\frac1{r^2}+\frac1{r^2}=\frac{2}{r^2},$$
即 \eqref{3.88}。Ricci 标量因而度量了空间的弯曲：半径越小，弯得越厉害。`}</Tx>
          <Box kind="warning" title={R`勘误：附录 A 式 (A.52) 的 Ricci 标量`}>{R`原书附录 A 的式 (A.52) 印作 $R=\dfrac{1}{2r^2}$。正确为 $R=\dfrac{2}{r^2}$（上式）。依据：把 (A.49)–(A.50) 的 $R_{\theta\theta}=1$、$R_{\phi\phi}=\sin^2\theta$ 代入 (A.51) $R=-R_{00}+r^{-2}R_{\theta\theta}+(r^2\sin^2\theta)^{-1}R_{\phi\phi}$，得 $1/r^2+1/r^2=2/r^2$；这也正是题目 \eqref{3.88} 要求证明的结果（半径 $r$ 的二维球面 Gauss 曲率为 $1/r^2$，$R=2K$）。另：同一附录 (A.35) 的前因子印作 $\frac{1}{2r^2\sin^{\theta}}$（排版错位），应为 $\frac{1}{2r^2\sin^2\theta}=\frac{g^{\phi\phi}}2$，上面已按正确形式书写。`}</Box>
        </>}>
        <Tx>{R`对由半径为 $r$ 的球面构成的 $2+1$ 维时空，求度规、Christoffel 符号、测地线方程和 Ricci 标量。

(a) 用坐标 $t,\theta,\phi$，度规为`}</Tx>
        <Eq n="3.87" say={R`球面（半径 $r$）乘上时间的 2+1 维时空：纬线方向的距离元要乘 $\sin\theta$。`}>{R`g_{\mu\nu} = \begin{pmatrix}-1&0&0\\0&r^2&0\\0&0&r^2\sin^2\theta\end{pmatrix}.`}</Eq>
        <Tx>{R`证明唯一不为零的 Christoffel 符号是 $\Gamma^\theta{}_{\phi\phi}$、$\Gamma^\phi{}_{\phi\theta}$ 和 $\Gamma^\phi{}_{\theta\phi}$，并用 $\theta$ 表示它们。

(b) 用它们和测地线方程求出这个时空中有质量粒子的运动方程。

(c) 求 Ricci 张量。证明对它缩并得到`}</Tx>
        <Eq n="3.88" say={R`半径为 $r$ 的球面的曲率标量是 $2/r^2$：常数且为正，球越小越弯。`}>{R`R \equiv g^{\mu\nu}R_{\mu\nu} = \frac{2}{r^2}.`}</Eq>
      </Exercise>

      <Exercise n="3.3" title="补全 Einstein 方程推导中的空白" level="★★"
        hint={R`(a) 仿照 §2.1.2 中 $\Gamma^0{}_{\alpha\beta}$ 的算法；(b) 见 §3.1 正文中折叠的推导框。`}
        solution={R`**(a)** $\Gamma^i{}_{\alpha\beta}=\frac{g^{i\nu}}2[\partial_\beta g_{\alpha\nu}+\partial_\alpha g_{\beta\nu}-\partial_\nu g_{\alpha\beta}]=\frac1{2a^2}[\partial_\beta g_{\alpha i}+\partial_\alpha g_{\beta i}-\partial_ig_{\alpha\beta}]$。度规只依赖时间，最后一项为零；$g_{\alpha i}$ 只在 $\alpha$ 为空间指标时非零，且只能对时间求导。于是唯一非零的是 $\Gamma^i{}_{0j}=\Gamma^i{}_{j0}=\frac1{2a^2}\partial_t(a^2)\delta_{ij}=\delta_{ij}\dot a/a$，$\Gamma^i{}_{00}=\Gamma^i{}_{jk}=0$——即 (2.25)。

**(b)** 在 \eqref{3.3} 中取 $\mu=i,\nu=j$，四项分别为：$\partial_t\Gamma^0{}_{ij}=\delta_{ij}(\dot a^2+a\ddot a)$；$0$；$\Gamma^k{}_{0k}\Gamma^0{}_{ij}=3\dot a^2\delta_{ij}$；$-(\Gamma^0{}_{kj}\Gamma^k{}_{i0}+\Gamma^k{}_{0j}\Gamma^0{}_{ik})=-2\dot a^2\delta_{ij}$。合计 $R_{ij}=\delta_{ij}(2\dot a^2+a\ddot a)$，即 \eqref{3.7}。$R_{i0}$ 的四项都含"对空间求导"或"$\Gamma^\alpha{}_{j\alpha}=0$""$\Gamma^l{}_{ik}=0$"之一，故全为零——各向同性不允许存在特殊方向。`}>
        {R`补全我们推导 Einstein 方程时留下的一些空白。

(a) 计算欧氏 FLRW 度规的 Christoffel 符号 $\Gamma^i{}_{\alpha\beta}$。

(b) 计算欧氏 FLRW 宇宙中 Ricci 张量的空间分量 $R_{ij}$。证明时空分量 $R_{i0}$ 为零。`}
      </Exercise>

      <Exercise n="3.4" title="第二 Friedmann 方程" level="★★"
        hint={R`$G_{ij}=R_{ij}-\frac12g_{ij}R$，$g_{ij}=a^2\delta_{ij}$；$T_{ij}=g_{ik}T^k{}_j=a^2\mathcal P\delta_{ij}$。`}
        solution={R`由 \eqref{3.7}、\eqref{3.9}：
$$G_{ij}=\delta_{ij}(2\dot a^2+a\ddot a)-\frac12a^2\delta_{ij}\cdot6\left[\frac{\ddot a}a+\frac{\dot a^2}{a^2}\right]=-\delta_{ij}(2a\ddot a+\dot a^2).$$
右边 $8\pi GT_{ij}=8\pi Ga^2\mathcal P\delta_{ij}$（宇宙学常数已计入 $\mathcal P$）。两边除以 $-2a^2\delta_{ij}$：
$$\frac{\ddot a}a+\frac12\left(\frac{\dot a}a\right)^2=-4\pi G\mathcal P,$$
即 \eqref{3.89}。再减去 \eqref{3.12} 的一半 $\frac12(\dot a/a)^2=\frac{4\pi G}{3}\rho$：
$$\frac{\ddot a}a=-4\pi G\mathcal P-\frac{4\pi G}3\rho=-\frac{4\pi G}3(\rho+3\mathcal P),$$
即 \eqref{3.90}。（另一条路：对 \eqref{3.12} 求时间导数并用连续性方程 $\dot\rho=-3H(\rho+\mathcal P)$，结果相同——这说明空–空分量并不独立于 00 分量与能量守恒。）`}>
        <Tx>{R`证明欧氏宇宙中 Einstein 方程的空–空分量为`}</Tx>
        <Eq n="3.89" say="Einstein 方程的空–空分量：减速度与膨胀率的组合由压强决定。">{R`\frac{\ddot a}{a} + \frac12\left(\frac{\dot a}{a}\right)^2 = -4\pi G\mathcal P`}</Eq>
        <Tx>{R`其中 $\mathcal P=\delta^j{}_iT^i{}_j/3$ 是总压强。把它与 \eqref{3.12} 联立，推出**第二 Friedmann 方程**：`}</Tx>
        <Eq n="3.90" keyEq title="第二 Friedmann 方程" say={R`宇宙的加速度由 $\rho+3\mathcal P$ 决定：普通物质和辐射使膨胀减速；只有足够负的压强（$\rho+3\mathcal P<0$）才能让宇宙加速。`}>{R`\frac{\ddot a}{a} = -\frac{4\pi G}{3}\left[\rho + 3\mathcal P\right].`}</Eq>
      </Exercise>

      <Exercise n="3.5" title="开放宇宙中的 Einstein 方程" level="★★★"
        hint={R`令 $g_{ij}=a^2(t)\gamma_{ij}$，$\gamma_{ij}$ 是常曲率三维空间的度规。$\Gamma^i{}_{jk}$ 就是 $\gamma_{ij}$ 的 Christoffel 符号；常曲率空间 $dr^2/(1-\kappa r^2)+\ldots$ 的三维 Ricci 张量为 $^{(3)}R_{ij}=2\kappa\gamma_{ij}$，这里 $\kappa=-\Omega_{\rm K}H_0^2$。`}
        solution={R`**(a)** $g_{00}=-1$、$g_{0i}=0$、$g_{ij}=a^2\gamma_{ij}(\boldsymbol x)$。$\Gamma^0{}_{ij}=\frac12\partial_tg_{ij}=a\dot a\gamma_{ij}=Hg_{ij}$；$\Gamma^i{}_{0j}=\frac12g^{il}\partial_tg_{lj}=\frac{\dot a}a\delta^i{}_j$；$\Gamma^i{}_{jk}=\frac{g^{il}}2[g_{lj,k}+g_{lk,j}-g_{jk,l}]$（$a^2$ 相消，即 $\gamma$ 的三维 Christoffel 符号）；其余（$\Gamma^0{}_{00}$、$\Gamma^0{}_{0i}$、$\Gamma^i{}_{00}$）为零。这就是 \eqref{3.92}。

**(b)** $R_{00}=-\partial_t\Gamma^i{}_{0i}-\Gamma^i{}_{j0}\Gamma^j{}_{0i}=-3\dot H-3H^2=-3\ddot a/a$，与平直情形相同。$R_{ij}$ 分成"时间部分"与"纯空间部分"：含时间指标的项与欧氏情形完全相同，给出 $g_{ij}(\ddot a/a+2H^2)$（把 $\delta_{ij}a^2$ 换成 $g_{ij}$）；只含 $\Gamma^i{}_{jk}$ 的项恰是三维度规 $\gamma_{ij}$ 的 Ricci 张量。对 $\gamma$：$dr^2/(1-\kappa r^2)+r^2d\Omega^2$，$\kappa=-\Omega_{\rm K}H_0^2$，有 $^{(3)}R_{ij}=2\kappa\gamma_{ij}=-2\Omega_{\rm K}H_0^2\,g_{ij}/a^2$。合起来就是 \eqref{3.93}。

**(c)** $R=-R_{00}+g^{ij}R_{ij}=3\frac{\ddot a}a+3\left[\frac{\ddot a}a+2H^2-\frac{2\Omega_{\rm K}H_0^2}{a^2}\right]=6\left[\frac{\ddot a}a+H^2-\frac{\Omega_{\rm K}H_0^2}{a^2}\right]$。时–时分量：$R_{00}+\frac12R=3H^2-3\Omega_{\rm K}H_0^2/a^2=8\pi G\rho$，即
$$\frac{H^2}{H_0^2}=\frac{\rho}{\rho_{\rm cr}}+\Omega_{\rm K}a^{-2},$$
与 \eqref{3.14} 完全一致：曲率项 $\Omega_{\rm K}a^{-2}$ 现在是**推出来**的，而不是"加上去"的。`}>
        <Tx>{R`把 Einstein 方程应用于开放宇宙。开放宇宙中的时空间隔为`}</Tx>
        <Eq n="3.91" say="开放（$\Omega_{\rm K}>0$）FLRW 宇宙的线元：径向距离元被 $1/\sqrt{1+\Omega_{\rm K}H_0^2r^2}$ 修正，角向部分是普通的球坐标。">{R`d\sym{ch02-interval}{s}^2 = -dt^2 + a^2(t)\left\{\frac{dr^2}{1+\Omega_{\rm K}H_0^2r^2} + r^2\left(d\theta^2 + \sin^2\theta\,d\phi^2\right)\right\}`}</Eq>
        <Tx>{R`其中 $r,\theta,\phi$ 是三维球坐标，$\Omega_{\rm K}$ 是曲率参数。（这个线元也描述 $\Omega_{\rm K}<0$ 的闭合宇宙，但所选坐标那时无法覆盖整个宇宙，所以这里假设宇宙是开放的。）

(a) 先计算 Christoffel 符号。证明唯一非零的那些等于`}</Tx>
        <Eq n="3.92" say="弯曲 FLRW 的 Christoffel 符号：两个“膨胀”分量与平直情形形式相同，另加纯空间的、由三维弯曲度规算出的部分。">{R`\Gamma^i{}_{0j} = H\delta^i{}_j;\quad \Gamma^0{}_{ij} = g_{ij}H;\quad \Gamma^i{}_{jk} = \frac{g^{il}}{2}\left[g_{lj,k} + g_{lk,j} - g_{jk,l}\right].`}</Eq>
        <Tx>{R`(b) 证明 Ricci 张量的分量为`}</Tx>
        <Eq n="3.93" say="弯曲宇宙的 Ricci 张量：$R_{00}$ 与平直时相同；$R_{ij}$ 多出一项由空间曲率给出的 $-2\Omega_{\rm K}H_0^2/a^2$。">{R`\begin{aligned}R_{00} &= -3\frac{\ddot a}{a},\\ R_{ij} &= g_{ij}\left[\frac{\ddot a}{a} + 2H^2 - \frac{2\Omega_{\rm K}H_0^2}{a^2}\right].\end{aligned}`}</Eq>
        <Tx>{R`(c) 由此计算 Ricci 标量，再推出 Einstein 方程的时–时分量。与 \eqref{3.14} 比较。`}</Tx>
      </Exercise>

      <Exercise n="3.6" title="加速膨胀的条件" level="★" fromBook
        hint={R`把 $\mathcal P_s=w_s\rho_s$ 代入 \eqref{3.90}。`}
        solution={R`联立 (2.60) 与 \eqref{3.90}：
$$\frac{\ddot a}a=-\frac{4\pi G}3\sum_s(1+3w_s)\rho_s,$$
求和遍及所有成分。对单一成分，由于 $\rho_s>0$ 总成立，加速条件简单地变成
$$\frac{\ddot a}a>0\quad\Leftrightarrow\quad w<-\frac13.$$
没有任何普通形式的物质（相对论或非相对论）具有这样的物态方程；曲率（等效 $w=-1/3$）也不行。若有多种成分，条件为
$$\frac{\sum_sw_s\rho_s}{\sum_s\rho_s}<-\frac13,$$
即**密度加权的平均物态方程**必须小于 $-1/3$。（例：$\Omega_{\rm m}=0.3$、$\Omega_\Lambda=0.7$ 今天的平均 $w=-0.7$，宇宙正在加速。）`}>
        {R`把 (2.60) 代入 \eqref{3.90}，推出在只有单一成分的假设下，宇宙膨胀加速的条件。若有多种物态方程为 $w_s$ 的成分 $s$，加速的要求是什么？`}
      </Exercise>

      <Exercise n="3.7" title={R`由分布函数回到 $\rho$ 与 $\mathcal P$`} level="★★" fromBook
        hint={R`均匀 FLRW：$P^0=E$，$P^i=p^i/a$，$-\det[g_{\alpha\beta}]=a^6$。注意积分变量是协变分量 $P_i$。`}
        solution={R`**(a)** 用均匀 FLRW 度规：$P_0=g_{00}P^0=-P^0=-E$；$P_i=a^2P^i=ap^i$。由于 $p^i\propto1/a$，$P_i$ 在均匀宇宙中为**常数**（它其实就是 N 体模拟中使用的"超共形动量"，见 §12.3）。

**(b)** 仍在均匀宇宙中，$\sqrt{-\det[g_{\alpha\beta}]}=a^3$，且 $dP_1dP_2dP_3=a^3d^3p$，于是
$$T^0{}_0=\frac{g}{a^3}\int\frac{dP_1dP_2dP_3}{(2\pi)^3}P_0f(\boldsymbol p,t)=-g\int\frac{d^3p}{(2\pi)^3}E(p)f(\boldsymbol p,t)=-\rho,$$
其中 $\rho$ 正是由分布函数得到的能量密度 (2.62)。

**(c)** 空间对角分量之和的三分之一：
$$\frac13T^k{}_k=\frac13\frac{g}{a^3}\int\frac{dP_1dP_2dP_3}{(2\pi)^3}\frac{P^kP_k}{P^0}f(\boldsymbol p,t)=\frac13g\int\frac{d^3p}{(2\pi)^3}\frac{p^2}{E(p)}f(\boldsymbol p,t)=\mathcal P,$$
因为 $P^kP_k=p^kp^k=p^2$。正如预期，回到了 (2.64)。`}>
        {R`\eqref{3.20} 给出用分布函数表示的能动张量的广义相对论表达式。把它与均匀宇宙中能动张量的表达式 (2.44)（分量由 (2.62) 和 (2.64) 给出）联系起来。

(a) 利用我们关于 $P^\mu$ 的结果，推出 $P_\mu$，并证明空间分量 $P_i$ 为常数。

(b) 证明 \eqref{3.20} 的时–时分量与 (2.62) 给出的能量密度表达式一致。

(c) 对 (2.64) 给出的压强证明同样的事。`}
      </Exercise>

      <Exercise n="3.8" title="谐振势中的流体方程（矩方法）" level="★★" fromBook
        hint={R`对 \eqref{3.23} 积分 $\int dp/2\pi$，含 $\partial f/\partial p$ 的项分部积分后为零（$p\to\pm\infty$ 处 $f=0$）。一阶矩：先乘 $p/m$ 再积分。`}
        solution={R`**零阶矩。**对 \eqref{3.23} 做动量积分：
$$\frac{\partial n}{\partial t}+\frac{\partial(nu)}{\partial x}=0,$$
$\partial f/\partial p$ 项在分部积分后为零（$p=\pm\infty$ 处没有粒子，$f=0$）。这就是**连续性方程**。

**一阶矩。**先乘 $p/m$ 再对所有动量积分：
$$\frac{\partial(nu)}{\partial t}+\frac{\partial}{\partial x}\int_{-\infty}^\infty\frac{dp}{2\pi}\frac{p^2}{m^2}f(x,p,t)+\frac{kx}{m}n=0,$$
最后一项来自分部积分（$-kx\int\frac{dp}{2\pi}\frac pm\partial_pf=+\frac{kx}{m}n$）。第二项的积分包含两部分：
$$\int_{-\infty}^\infty\frac{dp}{2\pi}\frac{p^2}{m^2}f(x,p,t)=nu^2(x,t)+\sigma(x,t),$$
前者是整体速度项，后者是**速度弥散**（二阶矩）$\sigma$。利用连续性方程，上式化为（Euler 方程）
$$\dot u+u\frac{\partial u}{\partial x}+\frac1n\frac{\partial\sigma}{\partial x}+\frac{kx}{m}=0.$$
二阶矩的作用像压强项（$\sigma/n$ 相当于 $\mathcal P/\rho$）。要使方程组封闭，要么令 $\sigma=0$（冷流体），要么把它与 $n$、$u$ 联系起来（物态方程）。这正是"矩的层级"问题：每个矩的演化依赖更高一阶的矩——后面的光子多极矩层级（第 5 章）与此完全同构。`}>
        <Tx>{R`对一维谐振势中的一群无碰撞粒子，通过取 \eqref{3.23} 的**矩**来推导流体方程。也就是说，把方程对 $dp/(2\pi)$ 积分取零阶矩，得到联系数密度 $n$ 与流体速度 $u$ 的方程，其中`}</Tx>
        <Eq n="3.94" say="数密度是分布函数的零阶矩，流体速度是一阶矩除以数密度。">{R`n(x,t) \equiv \int_{-\infty}^\infty\frac{dp}{2\pi}f(x,p,t);\qquad u(x,t) \equiv \frac{1}{n(x,t)}\int_{-\infty}^\infty\frac{dp}{2\pi}\frac pmf(x,p,t).`}</Eq>
        <Tx>{R`然后把 Boltzmann 方程乘以 $p$ 再积分，取一阶矩。注意这个方程支配流体速度 $u$ 的演化，并依赖包含速度弥散的二阶矩。忽略速度弥散以封闭方程组，并记住这一点相当普遍：取 Boltzmann 方程的矩时，每个矩的时间演化都依赖于更高一阶的矩，所以必须做某种近似才能封闭方程组。`}</Tx>
      </Exercise>

      <Exercise n="3.9" title="有质量中微子的零阶分布函数" level="★★★"
        hint={R`(a) 直接代入 \eqref{3.38}（$C=0$，均匀）。(b) 在 $a_{\rm dec}$ 处要求 $f=f_{\rm FD}(E_\nu(p)/T_{\rm dec})$。`}
        solution={<>
          <Tx>{R`**(a)** 均匀、无碰撞时 \eqref{3.38} 为 $\partial_tf-Hp\,\partial_pf=0$。设 $f(p,t)=F(p\,a(t))$（$F$ 任意，例如 $F(y)=f(E_\nu[y\cdot\mathrm{const}])$），则 $\partial_tf=F'\,p\dot a$，$Hp\,\partial_pf=\frac{\dot a}ap\,aF'=F'\,p\dot a$，两者相消。所以任何只通过组合 $p\,a(t)$ 依赖动量和时间的分布函数都是解——物理上，每个粒子的 $pa$ 守恒，分布只是沿动量轴整体平移。（原题写作 $f(E_\nu[p_0a(t)])$：其中的自变量应理解为与 $p\,a(t)$ 成正比的守恒组合；见 (b)。）

**(b)** 退耦时中微子处于平衡：$f(p,t_{\rm dec})=f_{\rm FD}[E_\nu(p)/T_{\rm dec}]$（化学势可略）。由 (a)，$f(p,t)=F(pa)$，匹配要求 $F(p\,a_{\rm dec})=f_{\rm FD}[E_\nu(p)/T_{\rm dec}]$，即 $F(y)=f_{\rm FD}[E_\nu(y/a_{\rm dec})/T_{\rm dec}]$。于是
$$f_\nu^{(0)}(p,t)=f_{\rm FD}\left[E_\nu\!\left(\frac{a(t)\,p}{a_{\rm dec}}\right)\Big/T_{\rm dec}\right],$$
其中 $p_0\equiv p\,a(t)/a_{\rm dec}$ 正是"这个粒子在退耦时的动量"——题中 $p_0=p/a_{\rm dec}$ 的写法是在 $a=1$（今天）取值。这就是 \eqref{3.95}。

**(c)** 见下图。取 $a_{\rm dec}=10^{-9}$，$T_{\rm dec}=T_{\nu,0}/a_{\rm dec}=1.68\times10^{5}\,\mathrm{eV}\approx0.17\,\mathrm{MeV}$。

**(d)** $m_\nu/T_{\rm dec}=0.06/1.68\times10^5=3.6\times10^{-7}\ll1$，所以 $E_\nu(ap/a_{\rm dec})\simeq ap/a_{\rm dec}$，于是
$$f_\nu^{(0)}\simeq\frac{1}{e^{ap/(a_{\rm dec}T_{\rm dec})}+1}=\frac{1}{e^{p/T_\nu}+1},\qquad T_\nu\equiv\frac{T_{\nu,0}}{a},$$
即 (2.83) 中的分布：形状是费米–狄拉克型，但指数里是**动量** $p$ 而非能量 $E$——即使今天 $m_\nu\gg T_\nu$ 也是如此。数值上：以 $p=3.15\,T_\nu(z)$ 为例，$m_\nu=0.06\,\mathrm{eV}$ 与 $m_\nu=0$ 在 $z=100,10,1,0$ 都给出 $f=0.0411$（相对差 $<10^{-12}$）；而若错误地用 $1/(e^{E/T_\nu}+1)$，$z=0$ 时 $m_\nu/T_\nu=358$，$f\sim e^{-358}$，几乎为零。`}</Tx>
          <NeutrinoFPlot />
        </>}>
        <Tx>{R`利用零阶 Boltzmann 方程 \eqref{3.38}，并假设早期宇宙（中微子退耦时）的初始条件为费米–狄拉克分布，推导有质量中微子零阶分布函数的时间演化。

(a) 证明任何形如 $f(p,t)=f(E_\nu[p_0a(t)])$ 的分布函数都是 Boltzmann 方程的解。

(b) 在某个早期标度因子 $a_{\rm dec}$ 处与初始条件匹配，证明 $p_0=p/a_{\rm dec}$，且分布函数变为`}</Tx>
        <Eq n="3.95" say="退耦后中微子的分布：把今天的动量 p 按 a/a_dec 换算回退耦时的动量，代入当时的费米–狄拉克分布——每个粒子的 pa 守恒，分布只是被整体红移。">{R`f_\nu^{(0)}(p,t) = f_{\rm FD}\left[E_\nu(a(t)p/a_{\rm dec})/T_{\rm dec}\right],`}</Eq>
        <Tx>{R`其中 $T_{\rm dec}$ 是 $a_{\rm dec}$ 时热中微子的温度。

(c) 对 $m_\nu=0.06\,\mathrm{eV}$ 和 $m_\nu=0$ 两种情形，画出 $z=100$、10、1 和 0 时的中微子分布函数（可用后一情形验证你得到了无质量中微子的正确结果）。取 $a_{\rm dec}=10^{-9}$，$T_{\rm dec}=T_{\nu,0}/a_{\rm dec}$，$T_{\nu,0}$ 是外推到今天的中微子温度（见 (2.81)）。

(d) 证明对这个 $a_{\rm dec}$ 取值，对现实的中微子质量有 $T_{\rm dec}\gg m_\nu$，并证明在此情形下分布函数与 (2.83) 一致。这里忽略了中微子的化学势，只要 $\mu_\nu\ll T_{\rm dec}$ 这就是准确的。`}</Tx>
      </Exercise>

      <Exercise n="3.10" title="有质量粒子的线性 Boltzmann 方程" level="★"
        hint={R`零阶分布 $f^{(0)}(p,t)$ 不依赖 $\boldsymbol x$ 和 $\hat{\boldsymbol p}$；见 §3.3.3 末尾的"同阶"规则。`}
        solution={R`在 \eqref{3.75} 中：(i) 最后一项 $\frac{\partial f}{\partial\hat p^i}\times(\ldots)$：$\partial f/\partial\hat p^i$ 只含一阶的 $\delta f$，方括号也是一阶（势的梯度），乘积为二阶，丢掉；(ii) 第二项中 $\partial f/\partial x^i$ 是一阶量，所以它的系数只保留零阶部分 $\frac{\hat p^i}a\frac pE$，$(-\Phi+\Psi)$ 的修正为二阶，丢掉；(iii) $\partial f/\partial p$ 含零阶部分，系数 $[H+\dot\Phi+\frac E{ap}\hat p^i\Psi_{,i}]$ 必须完整保留。剩下的正是 \eqref{3.76}。取 $m\to0$（$E=p$）即回到 \eqref{3.74}。`}>
        {R`从 \eqref{3.75} 推导 \eqref{3.76}——有质量粒子在线性阶的 Boltzmann 方程。`}
      </Exercise>

      <Exercise n="3.11" title={R`非相对论物质的温度按 $a^{-2}$ 下降`} level="★★"
        hint={R`由习题 3.9(a)，无碰撞的均匀解只依赖组合 $p\,a(t)$。`}
        solution={R`无相互作用时，均匀的 \eqref{3.38} 为 $\partial_tf=Hp\,\partial_pf$，其通解是 $f=F(p\,a(t))$（习题 3.9(a)）。

**拟设的合理性。**粒子在退耦前与热浴平衡，非相对论时 $E\simeq m+p^2/2m$，且 $T\ll m$ 使量子统计的 $\pm1$ 可以忽略，所以玻色、费米分布都趋于 Maxwell–Boltzmann 形式 $f_{\rm c}\propto e^{-(E-\mu)/\sym{ch03-temp}{T}}=e^{-(m-\mu)/\sym{ch03-temp}{T}}e^{-p^2/2m\sym{ch03-temp}{T}}$。退耦后这个形状由无碰撞演化保持。

**结论。**要使 $e^{-p^2/2m\sym{ch03-temp}{T}}$ 只依赖 $p\,a$，必须 $p^2/\sym{ch03-temp}{T}\propto(pa)^2$，即 $\sym{ch03-temp}{T}a^2=$ 常数：
$$\sym{ch03-temp}{T}\propto a^{-2}.$$
（前因子 $e^{-(m-\mu)/\sym{ch03-temp}{T}}$ 同时随数密度 $n\propto a^{-3}$ 调整；可以验证 $n\propto\sym{ch03-temp}{T}^{3/2}e^{-(m-\mu)/\sym{ch03-temp}{T}}\propto a^{-3}$ 要求 $(m-\mu)/\sym{ch03-temp}{T}$ 为常数。）直观上：动量 $p\propto1/a$，所以动能 $p^2/2m\propto a^{-2}$。

**有相互作用时不成立。**例如电子和质子在与光子紧密耦合期间，温度跟随光子按 $a^{-1}$ 下降（第 4 章复合之后很久才逐渐偏离）。`}>
        {R`证明在没有相互作用时，非相对论物质的温度按 $a^{-2}$ 标度。从 \eqref{3.38} 出发，假设形式 $f_{\rm c}\propto e^{-(E-\mu)/\sym{ch03-temp}{T}}\propto e^{-p^2/2m\sym{ch03-temp}{T}}$，并说明这个拟设的合理性。注意这个论证在有相互作用时**不**适用：例如只要电子和质子与光子紧密耦合，它们的温度就按 $a^{-1}$ 标度。`}
      </Exercise>

      <Exercise n="3.12" title="扰动宇宙中的能动张量" level="★★" fromBook
        hint={R`先由 \eqref{3.60} 与 \eqref{3.49} 求 $P_\mu$；再算 $1/\sqrt{-\det g}$ 与 $dP_1dP_2dP_3$ 的一阶展开。`}
        solution={R`\eqref{3.60} 与 \eqref{3.49} 给出
$$P_\mu=\left[-E(1+\Psi),\;p^ia(1+\Phi)\right],$$
（$P_0=g_{00}P^0=-(1+2\Psi)E(1-\Psi)$，$P_i=a^2(1+2\Phi)p^i(1-\Phi)/a$。）而 $1/\sqrt{-\det[g_{\alpha\beta}]}=a^{-3}(1-\Psi-3\Phi)$；积分测度 $dP_1dP_2dP_3=a^3(1+3\Phi)d^3p$。于是 \eqref{3.20} 成为
$$T^\mu{}_\nu=\sym{ch03-gdeg}{g}(1-\Psi)\int\frac{d^3p}{(2\pi)^3}\frac{P^\mu P_\nu}{P^0}f(\boldsymbol x,\boldsymbol p,t).$$
代入 \eqref{3.60}、上面的 $P_\mu$ 并展开到 $\Phi$、$\Psi$ 的一阶：$T^0{}_0$：$(1-\Psi)P_0=-(1-\Psi)(1+\Psi)E=-E$；$T^0{}_i$：$(1-\Psi)P_i=(1-\Psi)(1+\Phi)ap_i=a(1+\Phi-\Psi)p_i$；$T^i{}_j$：$(1-\Psi)\frac{P^iP_j}{P^0}=(1-\Psi)\frac{p^i(1-\Phi)a^{-1}\cdot ap_j(1+\Phi)}{E(1-\Psi)}=\frac{p^ip_j}{E}$。这就是 \eqref{3.86}。`}>
        {R`利用扰动度规 \eqref{3.49}，并把 \eqref{3.60} 代入 \eqref{3.20}，推导 \eqref{3.86}。`}
      </Exercise>

      <Exercise n="3.13" title="共形牛顿规范中的空间曲率" level="★★"
        hint={R`空间度规 $\gamma_{ij}=a^2(1+2\Phi)\delta_{ij}$；其 Christoffel 符号就是 \eqref{3.56} 中的 $\Gamma^i{}_{jk}$。线性阶 $R_{jk}\simeq\partial_i\Gamma^i{}_{jk}-\partial_k\Gamma^i{}_{ji}$。`}
        solution={R`三维 Christoffel 符号 $\Gamma^i{}_{jk}=\delta_{ij}\partial_k\Phi+\delta_{ik}\partial_j\Phi-\delta_{jk}\partial_i\Phi$ 已是一阶，所以 Ricci 张量中的 $\Gamma\Gamma$ 项是二阶，可以丢掉：
$$^{(3)}R_{jk}=\partial_i\Gamma^i{}_{jk}-\partial_k\Gamma^i{}_{ji}.$$
第一项：$\partial_i\Gamma^i{}_{jk}=\partial_j\partial_k\Phi+\partial_k\partial_j\Phi-\delta_{jk}\nabla^2\Phi$。第二项：$\Gamma^i{}_{ji}=\partial_j\Phi+3\partial_j\Phi-\partial_j\Phi=3\partial_j\Phi$，故 $\partial_k\Gamma^i{}_{ji}=3\partial_j\partial_k\Phi$。于是
$$^{(3)}R_{jk}=-\partial_j\partial_k\Phi-\delta_{jk}\nabla^2\Phi.$$
缩并（零阶 $\gamma^{jk}=\delta_{jk}/a^2$ 即可）：
$$^{(3)}R=\frac{1}{a^2}\left(-\nabla^2\Phi-3\nabla^2\Phi\right)=-\frac{4}{a^2}\nabla^2\Phi.$$
对 Fourier 模 $\Phi\propto e^{i\boldsymbol k\cdot\boldsymbol x}$，$\nabla^2\to-\sym{ch03-kwave}{k}^2$，所以空间曲率为 $4\sym{ch03-kwave}{k}^2\Phi/a^2$。（这就是为什么 $\Phi$ 被称为"曲率扰动"：$\Phi>0$ 的地方，空间像球面一样正弯曲。）`}>
        {R`证明共形牛顿规范中的空间曲率等于 $4\sym{ch03-kwave}{k}^2\Phi/a^2$。为此，计算由 \eqref{3.49} 中度规的空间部分 $g_{ij}$ 得到的三维 Ricci 标量。`}
      </Exercise>
    </Sec>);
}
