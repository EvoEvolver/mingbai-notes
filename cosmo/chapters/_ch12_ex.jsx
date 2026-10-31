// 习题 12.1–12.13 —— 式 (12.105)–(12.117)。解答：12.4、12.10、12.13 依据原书附录 A；其余为编者给出。
import { Sec, Tx, Eq, Exercise } from "@kit";

const R = String.raw;

export function Exercises() {
  return (
    <Sec n="12.E" title="Exercises" zh="习题">
      <Exercise n="12.1" title="冷分布函数的应力张量为零" level="★"
        hint={R`把 \eqref{12.9} 代入 \eqref{12.10} 计算 $\langle p^ip^j\rangle_{f_{\rm m}}$，$\delta$ 函数把 $\boldsymbol p$ 钉在 $m\boldsymbol u_{\rm m}$。`}
        solution={R`由 \eqref{12.9}，$\langle p^ip^j\rangle_{f_{\rm m}}=\int\frac{d^3p}{(2\pi)^3}p^ip^j\frac{\rho_{\rm m}}{m}(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol p-m\boldsymbol u_{\rm m})=\frac{\rho_{\rm m}}{m}m^2u^i_{\rm m}u^j_{\rm m}=m\rho_{\rm m}u^i_{\rm m}u^j_{\rm m}$。代入 \eqref{12.17}：$\frac1m\langle p^ip^j\rangle=\rho_{\rm m}u^iu^j=\rho_{\rm m}u^iu^j+\sigma^{ij}_{\rm m}$，所以 $\sigma^{ij}_{\rm m}=0$。（同理可验证 \eqref{12.11}–\eqref{12.12} 自洽：$\langle1\rangle=\rho_{\rm m}/m$、$\langle p^i\rangle/\langle m\rangle=u^i_{\rm m}$。）物理上：应力张量是相对平均速度的速度弥散，冷流体每点只有一个速度，弥散为零。`}>
        {R`证明对 \eqref{12.9} 形式的"冷"分布函数，应力张量 $\sigma^{ij}_{\rm m}$ [\eqref{12.17}] 为零。`}
      </Exercise>

      <Exercise n="12.2" title="涡度不会被产生" level="★★"
        hint={R`用恒等式 $(\boldsymbol u\cdot\nabla)\boldsymbol u=\nabla(u^2/2)-\boldsymbol u\times\boldsymbol\omega$，再对 \eqref{12.23} 的 Euler 方程取旋度；梯度的旋度为零。`}
        solution={R`\eqref{12.23} 的 Euler 方程写成 $\boldsymbol u'+\nabla(u^2/2)-\boldsymbol u\times\boldsymbol\omega+aH\boldsymbol u+\nabla\Psi=0$。取旋度，$\nabla\times\nabla(\cdots)=0$，得
$$\boldsymbol\omega'+aH\boldsymbol\omega=\nabla\times(\boldsymbol u\times\boldsymbol\omega).$$
右边每一项都正比于 $\boldsymbol\omega$，所以若初始 $\boldsymbol\omega=0$，则 $\boldsymbol\omega=0$ 始终是解（这是完全非线性的结论——但前提是忽略了应力张量；壳层交叉后 $\sigma^{ij}_{\rm m}$ 会产生涡度）。线性阶丢掉右边：$\boldsymbol\omega'=-aH\boldsymbol\omega=-(a'/a)\boldsymbol\omega$，所以 $\boldsymbol\omega\propto1/a$——原初涡度只会被膨胀稀释，这就是 \secref{12.2} 中可以忽略它的原因。`}>
        {R`用 \eqref{12.23} 推导物质速度涡度 $\boldsymbol\omega=\nabla\times\boldsymbol u_{\rm m}$ 的方程。证明如果初条件中没有涡度，就不会产生涡度。在线性阶，初始的涡度如何随时间演化？`}
      </Exercise>

      <Exercise n="12.3" title="把 Euler–Poisson 方程组变换到 Fourier 空间" level="★★"
        hint={R`约定 $f(\boldsymbol x)=\int\frac{d^3k}{(2\pi)^3}e^{i\boldsymbol k\cdot\boldsymbol x}f(\boldsymbol k)$；乘积 $\to$ 卷积 $\int_{\boldsymbol k_1,\boldsymbol k_2}(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k-\boldsymbol k_1-\boldsymbol k_2)$；$\partial_j\to ik_j$；用 \eqref{12.30} 与 $\theta^{(1)}=-aHf\delta^{(1)}$。`}
        solution={R`**连续性方程**的推导见 \eqref{12.31} 下方的折叠推导：源项 $-\partial_j(\delta^{(1)}u^{(1)j})$ 给出核 $1+\boldsymbol k_1\cdot\boldsymbol k_2/k_1^2$（$\boldsymbol k_1$ 为速度所带的波矢）。

**Euler 方程。**左边：$\theta^{(2)\prime}+aH\theta^{(2)}+\nabla^2\Psi^{(2)}$，由 \eqref{12.28}，$\nabla^2\Psi^{(2)}=\frac32\Omega_{\rm m}(aH)^2\delta^{(2)}$。右边第一项 $-u^{(1)j}\partial_j\theta^{(1)}$：$u^{(1)j}(\boldsymbol k_1)=\frac{ik_1^j}{k_1^2}aHf\delta^{(1)}(\boldsymbol k_1)$，$\partial_j\theta^{(1)}(\boldsymbol k_2)=ik_{2j}(-aHf)\delta^{(1)}(\boldsymbol k_2)$，乘积为 $-\frac{ik_1^j}{k_1^2}ik_{2j}(aHf)^2\delta\delta=\frac{\boldsymbol k_1\cdot\boldsymbol k_2}{k_1^2}(aHf)^2\delta\delta$，加上负号得 $-(aHf)^2\frac{\boldsymbol k_1\cdot\boldsymbol k_2}{k_1^2}\delta\delta$。第二项 $-(\partial_iu^j)(\partial_ju^i)$：$\partial_iu^j(\boldsymbol k_1)=ik_{1i}\frac{ik_1^j}{k_1^2}aHf\delta=-\frac{k_{1i}k_1^j}{k_1^2}aHf\delta$，所以乘积 $=\frac{(\boldsymbol k_1\cdot\boldsymbol k_2)^2}{k_1^2k_2^2}(aHf)^2\delta\delta$，加负号。合起来就是 \eqref{12.31} 第二式右边；$\delta^{(1)}=D_+\delta_0$ 给出 $D_+^2$。`}>
        {R`补全把 Euler–Poisson 方程组变换到 Fourier 空间（\eqref{12.31}）时略去的步骤。`}
      </Exercise>

      <Exercise n="12.4" title={R`证明 \eqref{12.32} 并得到 \eqref{12.33}–\eqref{12.34}`} level="★★" fromBook
        hint={R`以 $x\equiv\ln a$ 为时间，利用 $dD_+/dx=fD_+$；$\Omega_{\rm m}(\eta)=\Omega_{\rm m}(\eta_0)H_0^2/(a^3H^2)$。`}
        solution={R`把增长方程 \eqref{8.75} 换成以 $x\equiv\ln a$ 为时间，用 $dD_+/dx=fD_+$，方程变为
$$\frac{D_+}{a^2}\left[\frac{df}{dx}+f^2+\left(\frac{d\ln aH}{dx}+1\right)f-\frac32\frac{\Omega_{\rm m}(\eta_0)H_0^2}{a^3H^2}\right]=0 .$$
按定义 $\Omega_{\rm m}(\eta)=\rho_{\rm m}(\eta)/\rho_{\rm cr}(\eta)=\Omega_{\rm m}(\eta_0)H_0^2/(a^3H^2)$，最后一项就是 $-\frac32\Omega_{\rm m}(\eta)$。于是 $\frac{d(aHf)}{dx}=aH\big(\frac{df}{dx}+\frac{d\ln aH}{dx}f\big)=aH\big(\frac32\Omega_{\rm m}(\eta)-f-f^2\big)$，再用 $d/dx=(aH)^{-1}d/d\eta$ 即得 \eqref{12.32}。它对任何光滑暗能量模型都成立。

$\delta^{(2)}$ 的方程变换很平凡（$\delta'=aHf\,\partial\delta/\partial\ln D_+$，两边除以 $aHf$）。对 $\theta_{\rm m}$ 方程，用
$$\theta_{\rm m}'=(aHf\hat\theta)'=(aH)^2\Big(\frac32\Omega_{\rm m}(\eta)-f-f^2\Big)\hat\theta+(aHf)^2\frac{d\hat\theta}{d\ln D_+}.$$
这在任何阶都成立。$-f(aH)^2\hat\theta$ 一项恰好与左边第二项 $aH\theta=aH\cdot aHf\hat\theta$ 抵消。两边除以 $(aHf)^2$，右边得到 $\propto D_+^2$ 的源项，左边为 $\frac{d\hat\theta}{d\ln D_+}+\big(\frac32\frac{\Omega_{\rm m}}{f^2}-1\big)\hat\theta+\frac32\frac{\Omega_{\rm m}}{f^2}\delta$，即 \eqref{12.33} 第二行左边。`}>
        {R`用线性增长因子的方程 \eqref{8.75} 证明 \eqref{12.32}。注意这一关系对任何光滑暗能量模型都成立。然后用它把 \eqref{12.31} 变换为 \eqref{12.33}–\eqref{12.34}。`}
      </Exercise>

      <Exercise n="12.5" title="NLO 物质功率谱" level="★★★"
        hint={R`$\langle\delta^{(2)}\delta^{(2)}\rangle$ 有 4 个 $\delta_0$，Wick 定理的三种配对中，"同一个 $\delta^{(2)}$ 内部配对"那种给出 $F_2(\boldsymbol k_1,-\boldsymbol k_1)=0$；$\langle\delta^{(1)}\delta^{(3)}\rangle$ 中外线可以与 $\delta^{(3)}$ 的三个场中任一配对。`}
        solution={R`**(12.105) 的证明。**由 \eqref{12.39}，$\boldsymbol k_2=-\boldsymbol k_1$ 时 $\mu=-1$、$k_1=k_2$：$F_2=\frac57+\frac27-\frac12\cdot2=0$。$F_n$ 只依赖波矢的点积与模，同时翻转所有波矢不变，故 $F_n(\boldsymbol k_i)=F_n(-\boldsymbol k_i)$。

**(22) 项。**$\langle\delta^{(2)}(\boldsymbol k)\delta^{(2)}(\boldsymbol k')\rangle=D_+^4\int F_2(\boldsymbol k_1,\boldsymbol k_2)F_2(\boldsymbol k_3,\boldsymbol k_4)\langle\delta_0^4\rangle$。配对 $(12)(34)$ 给出 $\boldsymbol k=0$ 的贡献，正比于 $F_2(\boldsymbol k_1,-\boldsymbol k_1)=0$；配对 $(13)(24)$ 与 $(14)(23)$ 由对称性相等，各给出 $(2\pi)^3\delta_{\rm D}(\boldsymbol k+\boldsymbol k')\int_{\boldsymbol p}F_2(\boldsymbol p,\boldsymbol k-\boldsymbol p)^2P_{\rm L}(p)P_{\rm L}(|\boldsymbol k-\boldsymbol p|)$（用 $F_2(-\boldsymbol p,\cdots)=F_2(\boldsymbol p,\cdots)$），合计因子 2：即 $P^{(22)}$。

**(13) 项。**$\langle\delta^{(1)}(\boldsymbol k)\delta^{(3)}(\boldsymbol k')\rangle$：外场 $\delta_0(\boldsymbol k)$ 可与 $\delta^{(3)}$ 的三个场中任一配对（$F_3$ 对称，三种相等），其余两个互相配对给出 $\int_{\boldsymbol p}F_3(\boldsymbol p,-\boldsymbol p,\boldsymbol k)P_{\rm L}(p)$：故 $P^{(13)}=3P_{\rm L}(k)\int_{\boldsymbol p}F_3(\boldsymbol p,-\boldsymbol p,\boldsymbol k)P_{\rm L}(p)$。\eqref{12.42} 中 $(13)$ 与 $(31)$ 两项给出 $2P^{(13)}$，即 \eqref{12.48}–\eqref{12.49}。

**数值。**对角度积分后（Makino et al. 1992）$P^{(13)}(k)=\frac{k^3P_{\rm L}(k)}{252(2\pi)^2}\int_0^\infty dr\,P_{\rm L}(kr)\big[\frac{12}{r^2}-158+100r^2-42r^4+\frac{3}{r^3}(r^2-1)^3(7r^2+2)\ln\big|\frac{1+r}{1-r}\big|\big]$。用基准宇宙学的结果见 \figref{12.4}：$z=0$ 时 $P^{\rm NLO}/P_{\rm L}$ 在 $k\approx0.3\,h\,\mathrm{Mpc^{-1}}$ 处接近 1；在 $k\lesssim0.1$ 只有百分之几。（$P^{(22)}$ 在 $\boldsymbol p\to\boldsymbol k$ 处被积函数有可积奇点，可按 Bertschinger & Jain 1994 把积分区域对称化为 $p<|\boldsymbol k-\boldsymbol p|$。）`}>
        <Tx>{R`用 \eqref{12.40} 的解证明 \eqref{12.42} 中的 NLO 贡献由 \eqref{12.48} 给出。推导并使用关系`}</Tx>
        <Eq n="12.105" say={R`两个反向波矢不能合成新的扰动（动量守恒 + 质量守恒），核在所有波矢反号下不变。`}>{R`\begin{aligned}F_2(\boldsymbol k,-\boldsymbol k) &= 0,\\ F_n(\boldsymbol k_1,\cdots,\boldsymbol k_n) &= F_n(-\boldsymbol k_1,\cdots,-\boldsymbol k_n).\end{aligned}`}</Eq>
        <Tx>{R`数值计算各项。对 $P^{(13)}$，Makino et al. (1992) 给出的核表达式很有用。对 $P^{(22)}$，当 $\boldsymbol k-\boldsymbol p$ 接近零时要小心；Bertschinger & Jain (1994) 给出了一种数值稳健的积分分解。`}</Tx>
      </Exercise>

      <Exercise n="12.6" title="树图双谱" level="★★"
        hint={R`取 $\langle\delta^{(1)}\delta^{(1)}\delta^{(2)}\rangle$ 及其置换；$\delta^{(2)}$ 中的两个 $\delta_0$ 分别与两条外线配对。`}
        solution={R`到领头阶，三点函数中必须有一个二阶场（三个线性 Gauss 场的期望为零，\eqref{12.47}）：$\langle\delta_{\rm m}\delta_{\rm m}\delta_{\rm m}\rangle=\langle\delta^{(1)}_1\delta^{(1)}_2\delta^{(2)}_3\rangle+2\ \text{perm.}$。而 $\langle\delta_0(\boldsymbol k_1)\delta_0(\boldsymbol k_2)\delta_0(\boldsymbol q_1)\delta_0(\boldsymbol q_2)\rangle$ 中把 $\boldsymbol k_1$ 与 $\boldsymbol q_1$、$\boldsymbol k_2$ 与 $\boldsymbol q_2$ 配对（或交叉，两种相等，因 $F_2$ 对称）给出 $2F_2(-\boldsymbol k_1,-\boldsymbol k_2)P_{\rm L}(k_1)P_{\rm L}(k_2)=2F_2(\boldsymbol k_1,\boldsymbol k_2)P_{\rm L}(k_1)P_{\rm L}(k_2)$，并带有 $(2\pi)^3\delta_{\rm D}(\boldsymbol k_1+\boldsymbol k_2+\boldsymbol k_3)$；$\delta^{(2)}$ 内部自配对的一项正比于 $F_2(\boldsymbol q,-\boldsymbol q)=0$。其余两种置换来自 $\delta^{(2)}$ 位于 $\boldsymbol k_1$ 或 $\boldsymbol k_2$。图示：一个 $F_2$ 顶点连向两条外线，第三条外线就是顶点的出线——一个**树图**（没有圈，所以没有积分）。`}>
        {R`推导物质双谱的领头贡献 \eqref{12.51}。它在 \figref{12.3} 那样的图示中是什么样子？`}
      </Exercise>

      <Exercise n="12.7" title="Zel'dovich 近似与 N 体初条件" level="★★★"
        hint={R`以 $\eta$ 为时间，\eqref{12.57} 合成 $\boldsymbol s''+aH\boldsymbol s'=-\nabla\Psi(\boldsymbol q+\boldsymbol s)$；线性阶质量守恒给出 $\delta^{(1)}=-\nabla_q\cdot\boldsymbol s^{(1)}$。`}
        solution={R`**位移方程。**由 \eqref{12.57}，$d\boldsymbol x/d\eta=a\,d\boldsymbol x/dt=\boldsymbol p_c/(ma)$，所以 $\frac{d}{d\eta}(a\boldsymbol s')=\frac{a}{m}\frac{d\boldsymbol p_c}{dt}\cdot\frac{1}{a}\cdot a=-a\nabla\Psi$，即 $\boldsymbol s''+aH\boldsymbol s'=-\nabla_x\Psi(\boldsymbol q+\boldsymbol s,\eta)$。

**线性化。**质量守恒 $\bar\rho\,d^3q=\rho\,d^3x$ 给出 $1+\delta=1/\det(\partial x_i/\partial q_j)$，线性阶 $\delta^{(1)}=-\nabla_q\cdot\boldsymbol s^{(1)}$。对方程取散度并用 Poisson 方程 $\nabla^2\Psi=\frac32\Omega_{\rm m}(aH)^2\delta$：$-(\nabla\cdot\boldsymbol s)''-aH(\nabla\cdot\boldsymbol s)'=-\frac32\Omega_{\rm m}(aH)^2(-\nabla\cdot\boldsymbol s)$，正是线性增长方程。所以 $\boldsymbol s^{(1)}\propto D_+$。纵向（无旋）解在 Fourier 空间为
$$\boldsymbol s^{(1)}(\boldsymbol k,\eta)=\frac{i\boldsymbol k}{k^2}\delta^{(1)}(\boldsymbol k,\eta),$$
（验证：$-i\boldsymbol k\cdot\boldsymbol s=\delta$。）这就是 **Zel'dovich 近似**：每个粒子沿直线按 $D_+$ 移动。

**初动量。**$\boldsymbol p_c=ma\,d\boldsymbol x/d\eta=ma\,\boldsymbol s'=ma\cdot aHf\,\boldsymbol s^{(1)}$（因 $\boldsymbol s\propto D_+$，$\boldsymbol s'=aHf\boldsymbol s$）。实践中：在 Fourier 空间按 $P_{\rm L}$ 抽取 Gauss 的 $\delta^{(1)}(\boldsymbol k,\eta_{\rm in})$，算出 $\boldsymbol s^{(1)}$ 变回实空间，把格点上的粒子挪到 $\boldsymbol q+\boldsymbol s$，并赋予动量 $m a^2Hf\,\boldsymbol s$。（这与 \eqref{12.26} 的线性速度 $\boldsymbol u=aHf\,i\boldsymbol k\delta/k^2$ 一致。）`}>
        <Tx>{R`\secref{12.2} 中我们基于密度场发展了微扰论。另一种**拉格朗日**方法基于 N 体"粒子"的运动方程 \eqref{12.57}。本题推导最低阶结果，称为 **Zel'dovich 近似**。\eqref{12.57} 的解是粒子轨迹 $\boldsymbol x(\eta)$，写成`}</Tx>
        <Eq n="12.106" say={R`粒子当前位置 = 初始（拉格朗日）位置 + 位移场。`}>{R`\boldsymbol x(\eta) = \boldsymbol q + \boldsymbol s(\boldsymbol q,\eta),`}</Eq>
        <Tx>{R`其中 $\boldsymbol q$ 是 $\eta=0$（所有扰动都可忽略）时的初始位置，因此 $\boldsymbol s(\boldsymbol q,0)=0$。把 \eqref{12.57} 改写成 $\boldsymbol s$ 的方程，再展开到 $\boldsymbol s$ 的线性阶。利用线性阶 Poisson 方程关于 $\Psi$ 的解求解该方程。结果应把 $\boldsymbol s^{(1)}(\boldsymbol k,\eta)$ 与 $\delta^{(1)}(\boldsymbol k,\eta)$ 联系起来。这个结果可以用来得到启动 N 体模拟所需的粒子初始小位移。我们还需要它们的初始动量 $p_c^i$，也用位移把它们推导出来。`}</Tx>
      </Exercise>

      <Exercise n="12.8" title="NFW 晕的质量与浓度" level="★★"
        hint={R`见 \secref{12.4.1} 中的折叠推导：$M(<r)=4\pi\rho_sr_s^3[\ln(1+x)-x/(1+x)]$。`}
        solution={R`$M(<r)=4\pi\rho_sr_s^3\,m(r/r_s)$，$m(x)=\ln(1+x)-\frac{x}{1+x}$。用 $r_s=R_\Delta/c_\Delta$：$R_\Delta=\big(\frac{3M_\Delta}{4\pi\Delta\rho_{\rm m}(t_0)}\big)^{1/3}$，$\rho_s=\frac{\Delta\rho_{\rm m}(t_0)}{3}\frac{c_\Delta^3}{m(c_\Delta)}$。数值（$\Omega_{\rm m}=0.31$、$h=0.677$，$\rho_{\rm m}=3.94\times10^{10}M_\odot\,\mathrm{Mpc^{-3}}$）：$M_{200}=10^{12}M_\odot$ 给出 $R_{200}=0.312\,\mathrm{Mpc}$（共动，$z=0$）。$c=4,8,16$ 时 $r_s=78,\,39,\,19.5\,\mathrm{kpc}$，$\rho_s/\rho_{\rm m}=5.3\times10^3,\ 2.6\times10^4,\ 1.4\times10^5$（$m(c)=0.809,\ 1.308,\ 1.892$）。所以浓度越高，质量越向中心集中，内部密度越高；$r\ll r_s$ 时 $\rho\propto r^{-1}$，$r\gg r_s$ 时 $\propto r^{-3}$。图见 \secref{12.4.1} 的交互图（可调 $c$ 与 $M$）。`}>
        {R`推导 NFW 轮廓 \eqref{12.62} 的包含质量 $M(<r)$。把 $r_s$ 换成浓度 $c_\Delta$。用它推导给定质量 $M_\Delta$ 与浓度时的 $R_\Delta$，并解出 $\rho_s$。这样你就得到了质量为 $M_\Delta$、浓度为 $c_\Delta$ 的晕的相当准确的密度轮廓表达式。对质量 $M_{200}=10^{12}M_\odot$（$\Delta=200$）、浓度 $c_{200}\in\{4,8,16\}$ 的晕画出轮廓。也就是说，替我们画出 \secref{12.4.1} 里我们懒得画的那张图！`}
      </Exercise>

      <Exercise n="12.9" title={R`球坍缩：推导 $\delta_{\rm cr}$ 与 $\Delta_{\rm vir}$`} level="★★★"
        hint={R`(b) 能量守恒：$\frac12\dot r^2-GM/r=E$，转向时 $\dot r=0$。(c) 摆线：$r=\sym{ch12-cycA}{A}(1-\cos\theta)$、$t=\sym{ch12-cycB}{B}(\theta-\sin\theta)$ 满足 $\ddot r=-GM/r^2$ 当且仅当 $\sym{ch12-cycA}{A}^3=GM\sym{ch12-cycB}{B}^2$。`}
        solution={R`**(a)** 质量守恒 $M=\frac{4\pi}3\bar\rho_i(1+\delta_i)r_i^3$，代入 \eqref{12.67}（去掉 $\rho_\Lambda$）即得 \eqref{12.107}。

**(b)** 能量 $E=\frac12\dot r_i^2-\frac{GM}{r_i}$。用 $H_i^2=\frac{8\pi G}3\bar\rho_i$，$\frac{GM}{r_i}=\frac12H_i^2r_i^2(1+\delta_i)$，$\dot r_i^2\approx H_i^2r_i^2(1-\frac23\delta_i)$，得 $E=-\frac56H_i^2r_i^2\delta_i$（$\delta_i\ll1$）。转向时 $-GM/r_{\rm ta}=E$，所以 $r_{\rm ta}=\frac{GM}{|E|}=\frac35\frac{1+\delta_i}{\delta_i}r_i$。（这里的 $\dot r_i$ 包含了增长模式的速度扰动 $-\frac13\delta_i$；若取 $\dot r_i=H_ir_i$，只有 3/5 的扰动处于增长模式。）

**(c)** $r=\sym{ch12-cycA}{A}(1-\cos\theta)$，$t=\sym{ch12-cycB}{B}(\theta-\sin\theta)$：$\dot r=\frac{\sym{ch12-cycA}{A}\sin\theta}{\sym{ch12-cycB}{B}(1-\cos\theta)}$，$\ddot r=-\frac{\sym{ch12-cycA}{A}}{\sym{ch12-cycB}{B}^2(1-\cos\theta)^2}$，而 $-GM/r^2=-\frac{GM}{\sym{ch12-cycA}{A}^2(1-\cos\theta)^2}$，故需 $\sym{ch12-cycA}{A}^3=GM\sym{ch12-cycB}{B}^2$。与 \eqref{12.68} 比较 $\sym{ch12-cycA}{A}=r_{\rm ta}/2$、$\sym{ch12-cycB}{B}=t_{\rm ta}/\pi$，所以 $t_{\rm ta}=\pi\sqrt{r_{\rm ta}^3/(8GM)}=\frac{\pi}{2H_i}\left(\frac35\right)^{3/2}\frac{1+\delta_i}{\delta_i^{3/2}}$。

**(d)** $1+\delta=\frac{\rho}{\bar\rho}=\frac92\frac{(\theta-\sin\theta)^2}{(1-\cos\theta)^3}$（物质主导 $\bar\rho=1/6\pi Gt^2$）。转向（$\theta=\pi$）：$1+\delta=9\pi^2/16\approx5.55$。线性外推 $\delta^{(1)}=\frac35\big(\frac34\big)^{2/3}(\theta-\sin\theta)^{2/3}$，转向时 $1.062$。展开：$\delta=\delta^{(1)}+\frac{17}{21}(\delta^{(1)})^2+\frac{341}{567}(\delta^{(1)})^3+\cdots$（二阶系数 $17/21$ 正是 $F_2$ 的角度平均）。图见 \figref{12.7} 交互版。

**(e)** 位力 $K=-W/2$，能量守恒 $W_{\rm vir}/2=W_{\rm ta}$，$W\propto1/r$ 给出 $r_{\rm vir}=r_{\rm ta}/2$。在 $t_{\rm vir}=2t_{\rm ta}$：$\Delta_{\rm vir}=\frac{9\pi^2}{16}\cdot8\cdot4=18\pi^2\approx178$。$\theta=2\pi$ 时 $\delta^{(1)}=\frac35\big(\frac34\big)^{2/3}(2\pi)^{2/3}=\frac35\big(\frac{3\pi}2\big)^{2/3}=1.686=\delta_{\rm cr}$。`}>
        <Tx>{R`不考虑 $\Lambda$ 求解 \eqref{12.67}，推导球坍缩阈值 $\delta_{\rm cr}$ 与位力过密度 $\Delta_{\rm vir}$。步骤如下：

(a) 证明 \eqref{12.67} 可以改写为`}</Tx>
        <Eq n="12.107" say={R`球壳的加速度只依赖内部质量，而内部质量由初始半径与初始密度（背景 $\times$ (1+初始过密度)）确定。`}>{R`\frac{\ddot r}{r} = -\frac{4\pi G}{3}\bar\rho_i[1+\delta_i]\left(\frac{r_i}{r}\right)^3`}</Eq>
        <Tx>{R`其中 $r_i$、$\bar\rho_i$ 分别是初始时刻球形区域的半径与背景物质密度，$\delta_i$ 是初始过密度。

(b) 证明：当初始膨胀率为 $\dot r_i=H_ir_i(1-\delta_i/3)$ 时，球形区域能达到的最大半径 $r_{\rm ta}$（转向半径）为`}</Tx>
        <Eq n="12.108" say={R`转向半径约为初始半径的 $\frac35/\delta_i$ 倍：初始过密度越小，膨胀得越远才转向。`}>{R`r_{\rm ta} = \frac35\left(\frac{1+\delta_i}{\delta_i}\right)r_i.`}</Eq>
        <Tx>{R`（原书此式左边重复印了一次 $r_{\rm ta}=r_{\rm ta}$。）

(c) 证明 \eqref{12.68} 的参数解（摆线）是 \eqref{12.107} 的解。用初条件 $r_i$、$\delta_i$、$\bar\rho_i$ 表示 $t_{\rm ta}$。

(d) 求非线性过密度 $\delta(\theta)$ 的表达式。转向时的非线性密度对比是多少？把 $\delta(t)$ 画成 $\delta^{(1)}(t)$（用线性增长因子向前演化的初始过密度）的函数。推导 $\delta(\delta^{(1)})$ 到 $\delta^{(1)}$ 三阶的展开。

(e) 假设天体通过某种"魔法"（我们称之为剧烈弛豫，violent relaxation）位力化。用转向半径表示位力半径，并由此给出位力化后预期的密度对比 $\Delta_{\rm vir}\equiv1+\delta(t_{\rm vir})$。假设坍缩在 $\theta=2\pi$ 完成 [即 $t_{\rm vir}=t(\theta=2\pi)$]，坍缩时 $\delta^{(1)}(t)$ 的值是多少？这就是坍缩阈值 $\delta_{\rm cr}$。`}</Tx>
      </Exercise>

      <Exercise n="12.10" title="阈值区域的关联函数" level="★★★" fromBook
        hint={R`(b) 联合概率的二重积分中，把 $\nu_2$ 换成 $w=(\nu_2-\hat\xi\nu_1)/\sqrt{1-\hat\xi^2}$，$w$ 的积分得到 erfc。(c) 对 $\hat\xi\equiv\xi_{12}/\sigma^2$ 做 Taylor 展开。`}
        solution={R`**(a)** 平滑场的方差为 $\langle[\delta_R^{(1)}]^2\rangle=\sigma^2(R)$，所以 $\nu(\boldsymbol x)$ 是零均值、单位方差的 Gauss 场，分布为 \eqref{12.109}。两点的关联为平滑关联函数：$\langle\nu_1\nu_2\rangle=\hat\xi(r)\equiv\xi_R(r)/\sigma^2(R)$，故 $(\nu_1,\nu_2)$ 是协方差为 \eqref{12.111} 的二元 Gauss 分布 \eqref{12.110}。

**(b)** 换元 $u=\nu/\sqrt2$：$p(\delta_R^{(1)}>\delta_{\rm cr})=\frac{1}{\sqrt{2\pi}}\int_{\nu_{\rm cr}}^\infty d\nu\,e^{-\nu^2/2}=\frac12\mathrm{erfc}(\nu_{\rm cr}/\sqrt2)$。联合概率是 \eqref{12.110} 的二重积分；指数可写成 $-\frac{\nu_1^2+\nu_2^2-2\hat\xi\nu_1\nu_2}{2(1-\hat\xi^2)}=-\frac12(w^2+\nu_1^2)$，$w\equiv(\nu_2-\hat\xi\nu_1)/\sqrt{1-\hat\xi^2}$。对 $w$ 积分：
$$p=\frac1{\sqrt{2\pi}}\int_{\nu_{\rm cr}}^\infty d\nu_1e^{-\nu_1^2/2}\,\frac12\mathrm{erfc}\Big[\frac{\nu_{\rm cr}-\hat\xi\nu_1}{\sqrt{2(1-\hat\xi^2)}}\Big].$$
除以单点概率的平方：$1+\xi_{\rm thr}(r)=\sqrt{\frac2\pi}\,[\mathrm{erfc}(\nu_{\rm cr}/\sqrt2)]^{-2}\int_{\nu_{\rm cr}}^\infty d\nu_1e^{-\nu_1^2/2}\,\mathrm{erfc}\big[\frac{\nu_{\rm cr}-\hat\xi\nu_1}{\sqrt{2(1-\hat\xi^2)}}\big]$——Gauss 场中超阈值区域关联函数的**精确**结果（原书附录 A 此式的前因子印法略有出入，这里按定义整理）。

**(c)** 大间隔处 $|\hat\xi|\ll1$，展开 erfc：$\mathrm{erfc}[\cdots]=\mathrm{erfc}(\nu_{\rm cr}/\sqrt2)+\sqrt{\frac2\pi}\nu_1e^{-\nu_{\rm cr}^2/2}\hat\xi+\cdots$，每多一阶导数多一个 $\nu_1$ 的 Hermite 多项式。零阶项抵消左边的 1，一、二阶项给出 \eqref{12.83}，其中
$$b_1^{\rm thr}=\sqrt{\frac2\pi}\frac{e^{-\nu_{\rm cr}^2/2}}{\mathrm{erfc}[\nu_{\rm cr}/\sqrt2]\,\sigma(R)}\xrightarrow{\nu_{\rm cr}\gg1}\frac{\nu_{\rm cr}}{\sigma(R)},\qquad b_2^{\rm thr}=\sqrt{\frac2\pi}\frac{e^{-\nu_{\rm cr}^2/2}\,\nu_{\rm cr}}{\mathrm{erfc}[\nu_{\rm cr}/\sqrt2]\,\sigma^2(R)}\xrightarrow{\nu_{\rm cr}\gg1}\frac{\nu_{\rm cr}^2}{\sigma^2(R)}.$$
分母中的 $\sigma$ 来自把偏袒定义为 $\xi_R$（而非 $\hat\xi$）的系数。稀有的高密度区偏袒很大，且高阶偏袒增长更快。`}>
        <Tx>{R`推导线性密度场中阈值区域的关联函数 \eqref{12.82}。

(a) 定义换算密度场 $\nu(\boldsymbol x)\equiv\delta^{(1)}_R(\boldsymbol x)/\sigma(R)$（注意这是一个**场**，不要与参数 $\nu=\delta_{\rm cr}/\sigma(R)$ 混淆，本题把后者记为 $\nu_{\rm cr}$）。证明 $\nu(\boldsymbol x)$ 在任一固定位置服从正态分布`}</Tx>
        <Eq n="12.109" say={R`换算后的平滑密度在任一点是标准正态分布。`}>{R`p(\nu) = \frac{1}{\sqrt{2\pi}}e^{-\nu^2/2},`}</Eq>
        <Tx>{R`并且 $\nu_1,\nu_2$（$\nu_i\equiv\nu(\boldsymbol x_i)$）的联合分布是二元 Gauss 分布`}</Tx>
        <Eq n="12.110" say={R`两点的换算密度服从二元 Gauss 分布，相关系数为 $\xi_{12}/\sigma^2$。`}>{R`p(\nu(\boldsymbol x_1),\nu(\boldsymbol x_2)) = \frac{1}{2\pi\sqrt{1-\xi_{12}^2/\sigma^4(R)}}\exp\left[-\frac12(\nu_1,\nu_2)^\top{\rm C}^{-1}(\nu_1,\nu_2)\right]`}</Eq>
        <Eq n="12.111" say={R`协方差矩阵：对角元为 1（单位方差），非对角元是归一化的两点关联。`}>{R`\text{where}\quad{\rm C} = \begin{pmatrix}1 & \xi_{12}/\sigma^2(R)\\ \xi_{12}/\sigma^2(R) & 1\end{pmatrix}`}</Eq>
        <Tx>{R`而 $\xi_{12}=\xi^{(1)}_R(|\boldsymbol x_1-\boldsymbol x_2|)=\langle\delta^{(1)}_R(\boldsymbol x_1)\delta^{(1)}_R(\boldsymbol x_2)\rangle$ 是线性平滑密度场的关联函数。

(b) 用这个结果证明单点概率（即体积比例）为`}</Tx>
        <Eq n="12.112" say={R`超阈值的体积比例 = Gauss 尾部概率，用互补误差函数表示。`}>{R`p(\delta^{(1)}_R > \delta_{\rm cr}) = \frac12\mathrm{erfc}\left(\frac{\nu_{\rm cr}}{\sqrt2}\right).`}</Eq>
        <Tx>{R`这里 $\nu_{\rm cr}\equiv\delta_{\rm cr}/\sigma(R)$，互补误差函数的定义见 \eqref{C.31}。求联合概率`}</Tx>
        <Eq n="12.113" say={R`两点同时超过坍缩阈值的概率。`}>{R`p\left(\delta^{(1)}_R(\boldsymbol x_1) > \delta_{\rm cr},\ \delta^{(1)}_R(\boldsymbol x_2) > \delta_{\rm cr}\right),`}</Eq>
        <Tx>{R`的相应表达式，以及由 \eqref{12.82} 得到的 $\xi_{\rm thr}(r)$。注意两个积分中有一个可以解析完成。

(c) 利用物质关联函数在大 $r$ 处趋于零，把结果按小量 $\xi(r)$ 展开。证明前两项可以写成 \eqref{12.83} 的形式，推导 $b_1$ 与 $b_2$ 的表达式，以及对非常稀有的晕（$\nu_{\rm cr}\gg1$）的极限形式。`}</Tx>
      </Exercise>

      <Exercise n="12.11" title="二阶偏袒 b₂" level="★★"
        hint={R`把 $f\big((\delta_{\rm cr}-\delta_\ell)/\sigma\big)$ 展开到 $\delta_\ell^2$：$f-f'\delta_\ell/\sigma+\frac12f''\delta_\ell^2/\sigma^2$。`}
        solution={R`由 \eqref{12.78} 展开到二阶：$\delta_{{\rm h},\ell}=-\frac{f'}{f\sigma}\delta_\ell+\frac12\frac{f''}{f\sigma^2}\delta_\ell^2+\cdots$，与 \eqref{12.114} 比较：
$$b_1=-\frac{1}{\sigma}\frac{f'(\nu)}{f(\nu)},\qquad b_2=\frac{1}{\sigma^2}\frac{f''(\nu)}{f(\nu)}\Big|_{\nu=\delta_{\rm cr}/\sigma}.$$
对 PS：$f'/f=1/\nu-\nu$，$f''/f=(f'/f)'+(f'/f)^2=-\frac1{\nu^2}-1+\big(\frac1\nu-\nu\big)^2=\nu^2-3$。所以
$$b_2^{\rm PS}=\frac{\nu^2-3}{\sigma^2}=\frac{\nu^2(\nu^2-3)}{\delta_{\rm cr}^2}.$$
$\nu\gg1$ 时 $b_2\approx\nu^4/\delta_{\rm cr}^2\approx(b_1^{\rm PS})^2$，与 \exref{12.10} 中 $b_2^{\rm thr}\to\nu_{\rm cr}^2/\sigma^2$ 的标度一致。（同样是拉格朗日偏袒；转换成欧拉偏袒还需加上来自引力演化的项，如 $b_2^{\rm E}=b_2+\frac{8}{21}b_1$。）`}>
        <Tx>{R`把 \eqref{12.80} 中的展开继续到 $\delta_\ell$ 的二阶。二阶偏袒定义为`}</Tx>
        <Eq n="12.114" say={R`晕过密度对大尺度物质过密度的非线性响应：线性项系数 $b_1$，二次项系数 $\frac12b_2$。`}>{R`\delta_{{\rm h},\ell} = b_1\delta_\ell + \frac12b_2\delta_\ell^2 + \cdots.`}</Eq>
        <Tx>{R`用 $\sigma(M,z)$ 与 $f(\nu)$ 表示的 $b_2$ 是什么？对 Press–Schechter 质量函数 \eqref{12.73} 推导 $b_2(\nu)$。`}</Tx>
      </Exercise>

      <Exercise n="12.12" title="星系密度的二阶核" level="★★★"
        hint={R`(a) Fourier 空间 $\partial_i\partial_j\to-k_ik_j$，用 Poisson 方程 \eqref{12.5}。(b) 潮汐张量无迹；由旋转不变性，一阶能出现的标量只有其迹（为零）。`}
        solution={R`**(a)** 由 \eqref{12.5}，$\Psi(\boldsymbol k)=-4\pi Ga^2\rho_{\rm m}\delta_{\rm m}(\boldsymbol k)/k^2$，于是
$$K_{ij}(\boldsymbol k)=\frac{1}{4\pi Ga^2}\Big[-k_ik_j+\frac13\delta_{ij}k^2\Big]\Psi=\rho_{\rm m}\Big(\frac{k_ik_j}{k^2}-\frac13\delta_{ij}\Big)\delta_{\rm m}(\boldsymbol k).$$
实空间 $K_{ij}=\rho_{\rm m}\big(\partial_i\partial_j\nabla^{-2}-\frac13\delta_{ij}\big)\delta_{\rm m}$。（编者注：要使 $K_{ij}$ 是无量纲的、并与 \eqref{12.87} 的系数一致，\eqref{12.115} 的前因子应理解为 $1/[4\pi Ga^2\rho_{\rm m}]$，下面按此处理。）

**(b)** 偏袒展开中只能出现**标量**（星系数密度是标量）。由 $K_{ij}$ 构造的线性标量只有其迹 $K^i{}_i=0$，所以潮汐场在一阶不出现；二阶的唯一新标量是 $K_{ij}K^{ij}$（另一个 $(K^i{}_i)^2=0$；而 $\delta^2$ 已由 $b_2$ 计入）。

代入 $\delta^{(1)}=D_+\delta_0$、$\delta^{(2)}=D_+^2\int F_2\delta_0\delta_0$：$(\delta^{(1)})^2\to D_+^2\int\delta_0\delta_0$（核为 1）；$K^{(1)}_{ij}K^{(1)ij}\to D_+^2\int\big(\hat k_{1i}\hat k_{1j}-\frac13\delta_{ij}\big)\big(\hat k_2^i\hat k_2^j-\frac13\delta^{ij}\big)\delta_0\delta_0=D_+^2\int\Big[\frac{(\boldsymbol k_1\cdot\boldsymbol k_2)^2}{k_1^2k_2^2}-\frac13\Big]\delta_0\delta_0$。三项合起来，与 \eqref{12.86} 比较即得 \eqref{12.87}：$F_{{\rm g},2}=b_1F_2+\frac12b_2+b_{K^2}\big[\mu_{12}^2-\frac13\big]$。`}>
        <Tx>{R`推导星系密度 $\delta^{(2)}_{\rm g}$ 的二阶微扰论核。

(a) 用下式定义换算潮汐场：`}</Tx>
        <Eq n="12.115" say={R`潮汐张量：势的二阶导数去掉迹（各向同性部分）后的部分，描述引力场的拉伸与压缩。`}>{R`K_{ij}(\boldsymbol x,\eta) = \frac{1}{4\pi Ga^2(\eta)}\left[\partial_i\partial_j - \frac13\delta_{ij}\nabla^2\right]\Psi(\boldsymbol x,\eta).`}</Eq>
        <Tx>{R`用这个定义把 $K_{ij}$ 与物质密度在实空间与 Fourier 空间中联系起来。

(b) 从二阶星系密度的实空间表达式出发，`}</Tx>
        <Eq n="12.116" say={R`二阶星系密度 = $b_1\times$ 二阶物质密度 + 对密度平方的响应 + 对潮汐场平方的响应。`}>{R`\delta^{(2)}_{\rm g}(\boldsymbol x,\eta) = b_1\delta^{(2)} + \frac12b_2(\delta^{(1)})^2 + b_{K^2}K^{(1)}_{ij}K^{(1)ij},`}</Eq>
        <Tx>{R`其中右边所有场都在 $(\boldsymbol x,\eta)$ 处取值，偏袒参数 $b_1$、$b_2$、$b_{K^2}$ 定义在 $\eta$。为什么潮汐场只在二阶、且只以这种特定组合出现？然后提出增长因子中的时间依赖，对 \eqref{12.116} 做 Fourier 变换，得到 \eqref{12.87}。`}</Tx>
      </Exercise>

      <Exercise n="12.13" title="晕模型功率谱" level="★★★" fromBook
        hint={R`(a) 实空间卷积 → Fourier 空间乘积。(b) 两项分别给出二晕与一晕项。(c) 截断 NFW 的 Fourier 变换含正弦、余弦积分 Si、Ci。`}
        solution={R`**(a)** 定义 $\langle\delta_{\rm h}(\boldsymbol k,M)\delta_{\rm h}(\boldsymbol k',M')\rangle=(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k+\boldsymbol k')P_{\rm h}(k,M,M')$。\eqref{12.97} 的卷积变成乘积，
$$P^{\rm HM}(k)=\frac1{\rho_{\rm m}^2}\int d\ln M\frac{dn}{d\ln M}M\int d\ln M'\frac{dn}{d\ln M'}M'\,y(k,M)y(k,M')P_{\rm h}(k,M,M').$$

**(b)** 用 \eqref{12.117}：$P^{\rm HM}=P_{2{\rm h}}+P_{1{\rm h}}$，
$$P_{2{\rm h}}=[B_1(k)]^2P_{\rm L}(k),\quad B_1(k)=\frac1{\rho_{\rm m}}\int d\ln M\frac{dn}{d\ln M}Mb_1(M)y(k,M),\quad P_{1{\rm h}}=\frac1{\rho_{\rm m}^2}\int d\ln M\frac{dn}{d\ln M}M^2[y(k,M)]^2 .$$
$1/\rho_{\rm m}$ 因子（取 $t_0$ 时的值）来自 $P$ 是相对过密度 $\delta_{\rm m}$ 的功率谱。必要条件 $\lim_{k\to0}B_1=1$，即偏袒一致性关系 $\int d\ln M\frac{dn}{d\ln M}\frac{M}{\rho_{\rm m}}b_1(M)=1$；若质量函数归一化使全部质量都在晕中、且 $b_1$ 由峰–背景分离 \eqref{12.80} 导出，它就满足（编者注：对相对于演化后物质场的欧拉偏袒 $1+b_1^{\rm L}$）。这个积分在低质量端收敛很慢，但低质量晕的贡献在所关心的尺度上是平凡的，可以截断质量积分并给 $B_1$ 加一个常数使 $\lim_{k\to0}B_1=1$；$P_{1{\rm h}}$ 的质量积分同样可以截断。

**(c)** $y(k,M)=\frac{4\pi}{M}\int_0^{R_{200}}r^2dr\frac{\sin kr}{kr}\rho_{\rm h}(r,M)$（截断在 $R_{200}$ 使总质量 $M=M_{200}$ 有限）。结果（$x=kr_s$，$c=R_{200}/r_s$）：
$$y=\frac1N\Big\{\cos x\,[{\rm Ci}((c+1)x)-{\rm Ci}(x)]+\sin x\,[{\rm Si}((c+1)x)-{\rm Si}(x)]-\frac{\sin cx}{(c+1)x}\Big\},\quad N=\frac{1}{c+1}+\ln(c+1)-1 .$$
（$N=m(c)$；Ci、Si 见 \eqref{C.32}–\eqref{C.33}。）

**(d)** 结果见 \figref{12.12}。一个结尾说明：$k\to0$ 时一晕项趋于常数 $\rho_{\rm m}^{-2}\int d\ln M\frac{dn}{d\ln M}M^2$，这是非物理的——物质功率谱不可能有常数噪声。根源是 \eqref{12.117} 假设不同质量的晕噪声独立，与"总质量固定"的晕模型基本假设矛盾：一个宇宙学体积中的总质量接近平均值，若涨落使大质量晕多了，小质量晕就必须相应减少。幸运的是在晕模型适用的尺度上它数值很小（\figref{12.12}）。`}>
        <Tx>{R`基于 \eqref{12.97} 计算晕模型中的物质功率谱。

(a) 对 \eqref{12.97} 做 Fourier 变换，把 $\delta^{\rm HM}_{\rm m}(\boldsymbol k)$ 的功率谱用晕过密度 $\delta_{\rm h}(\boldsymbol k,M)$ 的功率谱、晕质量函数以及晕轮廓的 Fourier 变换 $y(k,M)$ 表示。

(b) 对晕假设线性偏袒关系与常数噪声：`}</Tx>
        <Eq n="12.117" say={R`晕的功率谱 = 线性偏袒乘线性物质谱 + 只在同一质量处非零的 Poisson 噪声（$1/\bar n$）。`}>{R`\left\langle\delta_{\rm h}(\boldsymbol k,M)\delta_{\rm h}(\boldsymbol k',M')\right\rangle = (2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k+\boldsymbol k')\left[b_1(M)b_1(M')P_{\rm L}(k) + P_N(M,M')\right],\qquad\text{where}\quad P_N(M,M') = \frac{1}{dn/d\ln M}\delta^{(1)}_{\rm D}(\ln M-\ln M').`}</Eq>
        <Tx>{R`这里假设不同质量的晕噪声相互独立。用它化简晕模型物质功率谱的表达式。

(c) 假设截断在 $R_{200}$、浓度为 $c(M)$ 的 NFW 轮廓 \eqref{12.62}，推导轮廓的 Fourier 变换 $y(k,M)$。

(d) 数值计算 $P^{\rm HM}(k)$，并与线性功率谱画在一起。`}</Tx>
      </Exercise>
    </Sec>);
}
