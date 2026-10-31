// 习题 4.1–4.10 —— 式 (4.58)–(4.63)。解答：4.1、4.6、4.9 依据原书附录 A；其余为编者给出（数值均用 _ch04_phys.jsx 复核）。
import { Sec, Tx, Eq, Exercise, Table, Box } from "@kit";
import { S } from "./_ch04_notation.jsx";
import { EpmPlot } from "./_ch04_plots.jsx";

const R = String.raw;
const N0 = S.n0, xe = S.xe, xi = S.xi, b2 = S.b2, A2 = S.a2, m = S.mN;

export function Exercises() {
  return (
    <Sec n="4.E" title="Exercises" zh="习题">
      <Exercise n="4.1" title="平衡数密度的高温与低温极限" level="★" fromBook
        hint={R`$n=\frac{g}{2\pi^2}\int_0^\infty dp\,p^2f(p)$。低温时三种分布都退化为玻尔兹曼分布；高温时用 $\int_0^\infty\frac{x^2dx}{e^x\mp1}$ 的 $\zeta$ 函数公式（式 (C.29)、(C.30)）。`}
        solution={R`取 $g=2$：$n=2\int\frac{d^3p}{(2\pi)^3}f(p)=\frac1{\pi^2}\int_0^\infty dp\,p^2f(p)$。

**低温 $m/T\gg1$。**此时 $E\simeq m\gg T$，分母中的指数远大于 1，所以 FD 与 BE 分布都退化为玻尔兹曼分布：$1/(e^{E/T}\pm1)\to e^{-E/T}$，且 $E\simeq m+p^2/2m$。于是
$$n^{\rm low\,T}=\frac{e^{-m/T}}{\pi^2}\int_0^\infty dp\,p^2e^{-p^2/2mT}.$$
令 $${xi}=p/\sqrt{2mT}$，积分化为 $[2mT]^{3/2}\int_0^\infty d${xi}\,${xi}^2e^{-${xi}^2}=[2mT]^{3/2}\sqrt\pi/4$，所以对玻色子和费米子都有
$$n^{\rm low\,T}=2e^{-m/T}\left(\frac{mT}{2\pi}\right)^{3/2}.$$

**高温 $m/T\ll1$。**玻尔兹曼分布：令 $${xi}=p/T$，$n^{\rm Hi\,T,\,Boltz}=\frac{T^3}{\pi^2}\int_0^\infty d${xi}\,${xi}^2e^{-${xi}}=\frac{2T^3}{\pi^2}$。BE/FD：$n=\frac{T^3}{\pi^2}\int_0^\infty\frac{d${xi}\,${xi}^2}{e^{${xi}}\mp1}$；BE 积分为 $\zeta(3)\Gamma(3)=2\zeta(3)$，FD 积分为 $\frac34\zeta(3)\Gamma(3)=\frac32\zeta(3)$，所以
$$n^{\rm Hi\,T}=\frac{\zeta(3)T^3}{\pi^2}\times\begin{cases}2&\text{玻色–爱因斯坦}\\3/2&\text{费米–狄拉克.}\end{cases}$$
同温度下玻色子比费米子多；由于 $\zeta(3)\simeq1.202$，两者把玻尔兹曼结果（系数 2）夹在中间（2.40 与 1.80）。三者都 $\propto T^3$。`}>
        {R`计算质量为 $m$、简并度 $g=2$ 的物种的平衡数密度（即化学势为零），分别在 $m/T$ 大与小的两种极限下，对玻色子和费米子都求出。式 (C.29) 与 (C.30) 对高温下的玻色–爱因斯坦与费米–狄拉克极限会有帮助。`}
      </Exercise>

      <Exercise n="4.2" title="追踪正负电子湮灭" level="★★"
        hint={R`$\rho_{e^\pm}=\frac{4}{2\pi^2}\int_0^\infty dp\,p^2\frac{E}{e^{E/T}+1}$（$g=4$），与 $\rho_\gamma=\pi^2T^4/15$ 比较。$n_{e^-}$ 不可能低于由电中性要求的 $n_p\simeq\eta_{\rm b}n_\gamma$。`}
        solution={<>
          <Tx>{R`**能量密度。**设 $n_{e^\pm}=${N0}_{e^\pm}^{(0)}$（化学势为零），则 $\rho_{e^\pm}/\rho_\gamma=\frac{30}{\pi^4}\cdot2\int_0^\infty dq\,\frac{q^2\sqrt{q^2+y^2}}{e^{\sqrt{q^2+y^2}}+1}$，$y=m_e/T$。高温极限为 $2\times\frac78=1.75$；低温时按 $(m_e/T)^{5/2}e^{-m_e/T}$ 指数下降（非相对论：$\rho_{e^\pm}\simeq4m_e(m_eT/2\pi)^{3/2}e^{-m_e/T}$）。数值积分（下图红线）：$T=0.2\,\mathrm{MeV}$ 时比值为 1.02，$T=0.1\,\mathrm{MeV}$ 时 0.26，$T=0.06\,\mathrm{MeV}$ 时 0.024；比值降到 **1%** 发生在 $T\approx0.053\,\mathrm{MeV}$（$m_e/T\approx9.7$），由 \eqref{4.27} 约在 $t\approx470\,\mathrm s$。`}</Tx>
          <EpmPlot />
          <Tx>{R`**何时偏离平衡值？**电中性要求 $n_{e^-}-n_{e^+}=n_p\simeq\eta_{\rm b}n_\gamma$（忽略氦）。只要 $${N0}_{e^-}^{(0)}\gg\eta_{\rm b}n_\gamma$，这个微小的过剩无关紧要，$n_{e^-}\simeq${N0}_{e^-}^{(0)}$。但当平衡值降到 $\eta_{\rm b}n_\gamma$ 以下时，电子数就不可能继续跟随它——多余的电子没有正电子可湮灭（电荷守恒）。令
$$2\left(\frac{m_eT}{2\pi}\right)^{3/2}e^{-m_e/T}=\eta_{\rm b}\frac{2\zeta(3)}{\pi^2}T^3,\qquad \eta_{\rm b}=6\times10^{-10},$$
解得 $m_e/T\approx25$，即 **$T\approx20\,\mathrm{keV}$**（上图蓝色虚线与灰色点线的交点）。此后 $n_{e^-}\simeq\eta_{\rm b}n_\gamma$ 冻结为一个化学势非零的分布，而正电子继续以 $n_{e^+}\simeq(${N0}_{e}^{(0)})^2/n_{e^-}$ 被指数地耗尽。`}</Tx>
        </>}>
        {R`假设 $n_{e^\pm}=${N0}_{e^\pm}^{(0)}$，追踪 e$^\pm$ 密度在湮灭过程中的变化。在 BBN 时期这一假设成立，因为电磁相互作用（如 $e^++e^-\leftrightarrow\gamma+\gamma$）使它们保持平衡。密度何时降到光子能量密度的 1%？若 $\eta_{\rm b}\simeq6\times10^{-10}$，你预期 $n_{e^-}$ 在什么温度开始偏离 $${N0}_{e^-}^{(0)}$？`}
      </Exercise>

      <Exercise n="4.3" title="没有重子不对称的宇宙" level="★★"
        hint={R`这正是 §4.4 的冻结问题：$X=$ 核子，$\psi=$ 介子/光子。核子–反核子湮灭截面是强相互作用量级，$\langle\sigma v\rangle\sim m_\pi^{-2}$。用 \eqref{4.50} 算 $\lambda$，再用 \eqref{4.53} 与习题 4.8 的 $x_f$。`}
        solution={R`把核子（质子、中子，$g=4$）当作 §4.4 中的 $X$，反核子同理，湮灭 $\mathrm{N\bar N}\to\pi$'s，截面取强作用量级 $\langle\sigma v\rangle\sim1/m_\pi^2\approx51\,\mathrm{GeV^{-2}}\approx6\times10^{-16}\,\mathrm{cm^3\,s^{-1}}$。取 $m=0.94\,\mathrm{GeV}$、$g_*\approx10.75$–$17$：
$$\lambda=\frac{m^3\langle\sigma v\rangle}{H(m)}=\frac{m\,m_{\rm Pl}\langle\sigma v\rangle}{1.66\sqrt{g_*}}\approx1\times10^{20}.$$
习题 4.8 的近似给出 $x_f\approx\ln[g\lambda/(2\pi)^{3/2}]+\frac12\ln x_f\approx45$；数值解 \eqref{4.49}（$g=4$）给出 $x_f\approx44$，即冻结温度 **$T_f\approx m/44\approx21\,\mathrm{MeV}$**，$Y_\infty\approx4\times10^{-19}$。由于 $\lambda$ 极大，冻结后 $Y$ 几乎立刻（$T$ 再降低百分之几十，约 $T\sim15$–$20\,\mathrm{MeV}$）达到渐近值。

对应的（重子 + 反重子）与光子数之比，在冻结时为 $2Y_\infty/(2\zeta(3)/\pi^2)\approx3\times10^{-18}$；之后 e$^\pm$ 湮灭又把光子数提高 11/4 倍，今天约为 $\sim10^{-18}$。这比观测到的 $\eta_{\rm b}=6\times10^{-10}$ 小 8–9 个数量级——**对称的初始条件无法解释我们周围的重子**，必须有一个 $\sim10^{-9}$ 的原初重子不对称（重子生成）。`}>
        {R`假设不存在重子不对称，即重子数密度恰好等于反重子数密度。求（重子 + 反重子）的最终遗迹密度。在什么温度达到这个渐近值？`}
      </Exercise>

      <Exercise n="4.4" title={R`中子→质子转化率`} level="★★★"
        hint={R`(a) 对重粒子（$n$、$p$）的动量积分：$\delta_{\rm D}^{(3)}$ 吃掉 $\boldsymbol p_p$；$\int\frac{d^3p_n}{(2\pi)^32E_n}e^{-E_n/T}\simeq\frac{1}{2m}\frac{${N0}_n^{(0)}}{g_n}$，$g_n=2$；忽略核子反冲，$E_n-E_p=\mathcal Q$。(b) 角度积分后剩 $\int_0^\infty dp\,p^2(p+\mathcal Q)^2e^{-p/T}$。`}
        solution={R`**(a)** 由 \eqref{4.7}，$\lambda_{np}=${N0}_{\nu_e}^{(0)}\langle\sigma v\rangle=\frac{1}{${N0}_n^{(0)}}\int_n\int_\nu\int_p\int_e e^{-(E_n+E_\nu)/T}(2\pi)^4\delta_{\rm D}^{(3)}\delta_{\rm D}^{(1)}|\mathcal M|^2$，其中 $\int_i\equiv\int d^3p_i/[(2\pi)^32E_i]$。

① 质子动量积分被 $\delta_{\rm D}^{(3)}$ 吃掉：$\int_p(2\pi)^3\delta_{\rm D}^{(3)}=1/2E_p\simeq1/2${m}$。

② 中子非相对论，$E_n\simeq${m}$，$\int_ne^{-E_n/T}\simeq\frac1{2${m}}\int\frac{d^3p_n}{(2\pi)^3}e^{-E_n/T}=\frac{1}{2${m}}\frac{${N0}_n^{(0)}}{2}$（$g_n=2$），与前面的 $1/${N0}_n^{(0)}$ 相消。

③ 核子反冲动能 $\sim T^2/m$ 可忽略，所以 $E_n+E_\nu-E_p-E_e=\mathcal Q+p_\nu-p_e$（电子质量忽略）。

合起来：$\frac{1}{2${m}}\cdot\frac1{4${m}}\cdot2\pi=\frac{\pi}{4${m}^2}$，即 \eqref{4.58}。

**(b)** 代入 $|\mathcal M|^2=32G_{\rm F}^2(1+3g_A^2)m_p^2p_\nu p_e$（$${m}\simeq m_p$），两个角度积分各给出 $4\pi/[2(2\pi)^3]=1/4\pi^2$：
$$\lambda^{(1)}=\frac{\pi}{4m_p^2}\cdot32G_{\rm F}^2(1+3g_A^2)m_p^2\cdot\frac{1}{16\pi^4}\int_0^\infty dp_\nu\,p_\nu^2(p_\nu+\mathcal Q)^2e^{-p_\nu/T}=\frac{G_{\rm F}^2(1+3g_A^2)}{2\pi^3}\int_0^\infty dp\,p^2(p+\mathcal Q)^2e^{-p/T}.$$
积分 $=2T^3\mathcal Q^2+12\mathcal QT^4+24T^5=2T^5(12+6x+x^2)$，$x=\mathcal Q/T$。乘 2（两个反应），并用中子寿命 $G_{\rm F}^2(1+3g_A^2)=2\pi^3/(\lambda_0\tau_nm_e^5)$ 消去耦合常数：
$$\lambda_{np}=\frac{2G_{\rm F}^2(1+3g_A^2)\mathcal Q^5}{\pi^3}\frac{12+6x+x^2}{x^5}=\frac{4}{\lambda_0}\left(\frac{\mathcal Q}{m_e}\right)^5\frac{12+6x+x^2}{\tau_nx^5}.$$
数值：$\mathcal Q/m_e=2.531$，$(\mathcal Q/m_e)^5=103.9$，$4\times103.9/1.636=254$——即 \eqref{4.60} 的 255（差别来自常数的舍入）。$x=1$ 时 $\lambda_{np}=255\times19/886\,\mathrm s^{-1}=5.5\,\mathrm s^{-1}$，与正文一致；低温 $x\gg1$ 时 $\lambda_{np}\to255/(\tau_nx^3)\propto T^3$。`}>
        <Tx>{R`按以下步骤计算中子→质子转化率 $\lambda_{np}$。对 $\lambda_{np}$ 有贡献的过程有两个：$\mathrm n+\nu_e\to\mathrm p+e^-$ 与 $\mathrm n+e^+\to\mathrm p+\bar\nu_e$。假设所有粒子都可用玻尔兹曼统计描述，并忽略电子质量。在这些近似下两个反应的速率相同。

(a) 用 \eqref{4.7} 写出 $\mathrm n+\nu_e\to\mathrm p+e^-$ 的速率。完成对重粒子动量的积分，得到`}</Tx>
        <Eq n="4.58" say={R`中子→质子转化率：对重的核子积分后，只剩对中微子和电子动量的积分；能量守恒 $\delta_{\rm D}$ 函数要求出射电子比入射中微子多带走 $\mathcal Q$ 的能量。`}>{R`\begin{aligned}\lambda_{np}=${N0}_{\nu_e}^{(0)}\langle\sigma v\rangle={}&\frac{\pi}{4${m}^2}\int\frac{d^3p_\nu}{(2\pi)^32p_\nu}e^{-p_\nu/T}\\&\times\int\frac{d^3p_e}{(2\pi)^32p_e}\delta_{\rm D}^{(1)}(\mathcal Q+p_\nu-p_e)|\mathcal M|^2.\end{aligned}`}</Eq>
        <Tx>{R`(b) 振幅平方为 $|\mathcal M|^2=32G_{\rm F}^2(1+3g_A^2)m_p^2p_\nu p_e$，其中 $g_A$ 是核子的轴矢耦合。它可以通过 $\tau_n^{-1}=\lambda_0G_{\rm F}^2(1+3g_A^2)m_e^5/(2\pi^3)$ 与中子寿命联系起来，其中相空间积分`}</Tx>
        <Eq n="4.59" say={R`中子 $\beta$ 衰变的相空间积分：对衰变电子能量（以 $m_e$ 为单位，从 1 到 $\mathcal Q/m_e$）积分，是一个纯数 1.636。`}>{R`\lambda_0\equiv\int_1^{\mathcal Q/m_e}d${xi}\,${xi}(${xi}-\mathcal Q/m_e)^2(${xi}^2-1)^{1/2}=1.636.`}</Eq>
        <Tx>{R`完成 \eqref{4.58} 中的积分，用 $\tau_n$ 表示 $\lambda_{np}$。别忘了对两个不同的反应乘以 2。你应当得到（Bernstein, 2004）`}</Tx>
        <Eq n="4.60" keyEq title={R`中子→质子转化率`} say={R`转化率以中子寿命为单位：$x=1$（$T=1.293\,\mathrm{MeV}$）时约 5.5 次/秒；低温时 $\propto x^{-3}\propto T^3$，比膨胀率 $\propto T^2$ 下降得快。`}>{R`\lambda_{np}=\frac{255}{\tau_nx^5}(12+6x+x^2).`}</Eq>
      </Exercise>

      <Exercise n="4.5" title="数值求解中子丰度" level="★★"
        hint={R`$H(x=1)=\sqrt{4\pi^3G\mathcal Q^4/45}\times\sqrt{10.75}$，$G=m_{\rm Pl}^{-2}$；换算 $\hbar=6.58\times10^{-22}\,\mathrm{MeV\,s}$。方程在小 $x$ 处是刚性的（转化率极大），用隐式格式或从 $X_n=X_{n,\rm EQ}$ 的小 $x$ 处起步。`}
        solution={<>
          <Tx>{R`**$H(x=1)$。**$\mathcal Q^2/m_{\rm Pl}=(1.293\times10^{-3}\,\mathrm{GeV})^2/1.221\times10^{19}\,\mathrm{GeV}=1.369\times10^{-25}\,\mathrm{GeV}$；$\sqrt{4\pi^3\times10.75/45}=5.443$；所以 $H(x=1)=7.45\times10^{-25}\,\mathrm{GeV}/\hbar=7.45\times10^{-25}/6.582\times10^{-25}\,\mathrm s^{-1}=1.13\,\mathrm s^{-1}$，即 \eqref{4.61}。

**数值解。**\eqref{4.26} 对 $X_n$ 是线性的，用后向 Euler 格式 $X_n^{(k+1)}=\dfrac{X_n^{(k)}+\Delta x\,\nosym{K}e^{-x}}{1+\Delta x\,\nosym{K}(1+e^{-x})}$（$\nosym{K}\equiv x\lambda_{np}/H(x=1)$，$\Delta x$ 为步长）在对数网格上从 $x=0.02$（$X_n=X_{n,\rm EQ}$）积到 $x=200$，结果（\figref{4.2} 交互版灰线）：`}</Tx>
          <Table head={[R`$x$`, R`1`, R`2`, R`3`, R`5`, R`10`, R`20`, R`$\infty$`]} rows={[
            [R`$X_n$`, R`0.290`, R`0.207`, R`0.179`, R`0.162`, R`0.153`, R`0.150`, R`**0.148**`],
            [R`$X_{n,\rm EQ}$`, R`0.269`, R`0.119`, R`0.047`, R`0.0067`, R`$4.5\times10^{-5}$`, R`$2\times10^{-9}$`, R`0`],
          ]} />
          <Tx>{R`$X_n$ 在 $x\approx1$–2 开始明显高于平衡值，$x\gtrsim5$（$T\lesssim0.26\,\mathrm{MeV}$）后基本冻结，渐近值 $X_n(\infty)=0.148$，与正文的 0.15 一致（对应 $n/p=0.174$，即图 4.2 中约 0.18 的平台）。原题说"与图 4.3 比较"，实际上应对照的是给出 $n/p$ 演化的图 4.2（图 4.3 中标 N 的曲线也给出同样的冻结）。`}</Tx>
        </>}>
        <Tx>{R`数值求解速率方程 \eqref{4.26}，确定中子比例随温度的变化。忽略衰变。为此使用上题得到的转化率 $\lambda_{np}$，即 \eqref{4.60}。代入数值证明 $x=1$ 时的哈勃率为`}</Tx>
        <Eq n="4.61" say={R`$x=1$（$T=\mathcal Q$）时的哈勃率：由 Friedmann 方程与 $g_*=10.75$ 的辐射能量密度给出，约 1.13 次/秒——比此时的转化率 5.5/s 小。`}>{R`H(x=1)=\sqrt{\frac{4\pi^3G\mathcal Q^4}{45}}\times\sqrt{10.75}=1.13\,\mathrm s^{-1}.`}</Eq>
        <Tx>{R`数值求解常微分方程 \eqref{4.26}。也可以采用 Bernstein et al. (1989) 给出的半解析方法。把你的结果（任一方法）与图 4.3 比较，并把 $x=\infty$ 处的渐近结果与正文结果 $X_n(x=\infty)=0.15$ 比较。`}</Tx>
      </Exercise>

      <Exercise n="4.6" title={R`$\eta_{\rm b}$ 与 $\Omega_{\rm b}h^2$`} level="★" fromBook
        hint={R`今天光子数密度 $n_\gamma=411\,\mathrm{cm^{-3}}$；$n_{\rm b}=\rho_{\rm cr}\Omega_{\rm b}/m_p$。`}
        solution={R`光子数密度为 $411\,\mathrm{cm^{-3}}$，重子数密度为 $n_{\rm b}=\rho_{\rm b}/m_p=\rho_{\rm cr}\Omega_{\rm b}/m_p$。代入数值：
$$n_{\rm b}=\Omega_{\rm b}\frac{1.879h^2\times10^{-29}\,\mathrm{g\,cm^{-3}}}{1.673\times10^{-24}\,\mathrm g}=1.12\times10^{-5}\,\Omega_{\rm b}h^2\,\mathrm{cm^{-3}}.$$
所以 $\eta_{\rm b}=n_{\rm b}/n_\gamma=1.12\times10^{-5}\Omega_{\rm b}h^2/411=2.73\times10^{-8}\,\Omega_{\rm b}h^2=6.0\times10^{-10}(\Omega_{\rm b}h^2/0.022)$，正是 \eqref{4.10}。`}>
        {R`用 $\Omega_{\rm b}h^2$ 表示 $\eta_{\rm b}$。证明它由 \eqref{4.10} 给出。`}
      </Exercise>

      <Exercise n="4.7" title="复合期间的自由电子比例" level="★★★"
        hint={R`(a) $d${xe}/dt=H${xe}$；复合期物质主导，$H\simeq\tilde H\,${xe}^{-3/2}$。(b) 冻结后 $\beta\to0$，$n_{\rm b}${A2}^{(2)}\propto${xe}^{-5/2}\ln${xe}$，仿照 \eqref{4.51}–\eqref{4.52} 积分。(c)(d) 方程在早期刚性，用隐式格式。`}
        solution={R`**(a)** 由 $T\propto a^{-1}$，$d${xe}/dt=H${xe}$。复合发生在 $z\sim1000$，物质主导（辐射修正 $\lesssim15\%$），$H\simeq H_0\Omega_{\rm m}^{1/2}(1+z)^{3/2}=\tilde H\,${xe}^{-3/2}$，其中 $\tilde H\equiv H_0\Omega_{\rm m}^{1/2}(\epsilon_0/T_0)^{3/2}$ 是外推到 $T=\epsilon_0$ 的物质主导哈勃率（$\Omega_{\rm m}h^2=0.14$ 时 $1.69\times10^{-11}\,\mathrm s^{-1}$）。于是
$$\frac{dX_e}{d${xe}}=\frac{${xe}^{1/2}}{\tilde H}\left\{(1-X_e)\beta-X_e^2n_{\rm b}${A2}^{(2)}\right\},$$
其中 $n_{\rm b}=n_{\rm b}(\epsilon_0)\,${xe}^{-3}$，$n_{\rm b}(\epsilon_0)=4.8\times10^7\,(\Omega_{\rm b}h^2/0.022)\,\mathrm{cm^{-3}}$；$${A2}^{(2)}=\alpha_0${xe}^{1/2}\ln${xe}$，$\alpha_0\equiv9.78\alpha^2/m_e^2=2.33\times10^{-14}\,\mathrm{cm^3\,s^{-1}}$；$\beta=${A2}^{(2)}(m_e\epsilon_0/2\pi${xe})^{3/2}e^{-${xe}}$。

**(b)** 冻结后电离项 $\propto e^{-${xe}}$ 可略：$\dfrac{dX_e}{d${xe}}\simeq-\lambda_e\dfrac{\ln${xe}}{${xe}^2}X_e^2$，$\lambda_e\equiv n_{\rm b}(\epsilon_0)\alpha_0/\tilde H\approx6.6\times10^4$。从 $x_f$ 积到 $\infty$：$\dfrac1{X_e(\infty)}-\dfrac1{X_{e,f}}=\lambda_e\dfrac{1+\ln x_f}{x_f}$，所以
$$X_e(\infty)\simeq\frac{x_f}{\lambda_e(1+\ln x_f)}\approx1.5\times10^{-4}\quad(x_f\approx50,\ T_f\approx0.27\,\mathrm{eV}),$$
对 $x_f$ 只有微弱依赖，并 $\propto(\Omega_{\rm b}h^2)^{-1}$。

**(c)** 数值积分（\figref{4.4} 交互版的蓝色虚线；隐式格式，从 Saha 解出发）：$X_e$ 在 $z=1200$ 降到 0.036，$z=1000$ 时 $2\times10^{-3}$，$${xe}=1000$（$z\approx57$）时冻结在 $X_e\approx1.9\times10^{-4}$，与 (b) 的解析估计相符。

**(d)** 乘以 Peebles 因子后（红线），复合明显变慢：$z=1200$ 时 $X_e=0.29$，$z=1000$ 时 0.04，$${xe}=1000$ 时 $X_e\approx2.3\times10^{-4}$——冻结值增大约 25%，而演化形状大为不同。这时的曲线与图 4.4 中 CLASS 的完整解（含氦与更精细的原子物理）非常接近（$z=100$ 处约 $2.5\times10^{-4}$），而 (c) 中不含 $C$ 的解在 $z\sim1000$–1200 处低了一个数量级以上。`}>
        <Tx>{R`求解复合期间自由电子比例的演化。在完成 (d) 之前不要与图 4.4 比较。假设基准的欧氏 $\Lambda$CDM 宇宙学。

(a) 在 \eqref{4.36} 中用 $${xe}\equiv\epsilon_0/T$ 代替时间作为演化变量。用 $${xe}$ 和 $T=\epsilon_0$ 时的哈勃率重写方程。

(b) 用 §4.4 的方法求自由电子比例的最终冻结丰度 $X_e(${xe}=\infty)$。

(c) 把 (a) 中的方程从 $${xe}=1$ 数值积分到 $${xe}=1000$。最终冻结的 $X_e$ 是多少？

(d) Peebles (1968) 论证：即使俘获到氢原子的激发态也不重要，除非 $n=2$ 态衰变为两个光子，或者膨胀把 Lyman $\alpha$ 光子（$n=2\to1$）红移到无法再把基态原子激发上去。定量地，他把 \eqref{4.36} 的右边乘以修正因子`}</Tx>
        <Eq n="4.62" say={R`Peebles 因子：处于 $n=2$ 的原子“成功落到基态”（经 Ly$\alpha$ 光子红移逃逸或双光子衰变）而不是被再次电离的概率。`}>{R`C=\frac{\Lambda_\alpha+\Lambda_{2\gamma}}{\Lambda_\alpha+\Lambda_{2\gamma}+${b2}^{(2)}}`}</Eq>
        <Tx>{R`其中双光子衰变率 $\Lambda_{2\gamma}=8.227\,\mathrm s^{-1}$；Lyman $\alpha$ 产生率 $${b2}^{(2)}=\beta e^{3\epsilon_0/4T}$；以及`}</Tx>
        <Eq n="4.63" say={R`Ly$\alpha$ 逃逸率：膨胀越快、中性氢越少，Ly$\alpha$ 光子越容易被红移出共振线而不被再吸收。`}>{R`\Lambda_\alpha=\frac{H(3\epsilon_0)^3}{n_{\rm H}(8\pi)^2}`}</Eq>
        <Tx>{R`其中 $H$ 是膨胀率，$n_{\rm H}$ 是氢原子数密度（可取 $n_{\rm b}(1-X_e)$）。照此计算，并说明它如何改变你的最终答案。然后把冻结丰度与 (c) 的结果比较，把演化与图 4.4 比较。`}</Tx>
      </Exercise>

      <Exercise n="4.8" title="冻结温度的近似" level="★★"
        hint={R`$n^{(0)}(x)=g\,m_X^3(2\pi x)^{-3/2}e^{-x}$，$H(x)=H(m_X)/x^2$。`}
        solution={R`设 $n^{(0)}(x_f)\langle\sigma v\rangle=H(x_f)$：
$$g\frac{m_X^3}{(2\pi x_f)^{3/2}}e^{-x_f}\langle\sigma v\rangle=\frac{H(m_X)}{x_f^2}\ \Longrightarrow\ \frac{g\lambda}{(2\pi)^{3/2}}x_f^{1/2}e^{-x_f}=1,$$
即
$$x_f=\ln\left[\frac{g\lambda}{(2\pi)^{3/2}}\right]+\frac12\ln x_f,$$
迭代即可（收敛很快）。$x_f$ 只**对数地**依赖 $\lambda$。数值（$g=1$）：$\lambda=10^5\Rightarrow x_f\approx9.9$；$\lambda=10^9\Rightarrow x_f\approx19.4$；$m_X=100\,\mathrm{GeV}$、$\langle\sigma v\rangle=2\times10^{-26}\,\mathrm{cm^3s^{-1}}$（$\lambda=1.26\times10^{11}$）$\Rightarrow x_f\approx24.4$。与 \eqref{4.49} 的数值解（$Y=2Y_{\rm EQ}$ 处：9.0、17.7、22.3）相差约 10%，也印证了正文 $x_f\simeq20$ 的估计。`}>
        {R`令 $x_f$ 满足 $n^{(0)}(x_f)\langle\sigma v\rangle=H(x_f)$，求湮灭重粒子冻结温度的一个近似。`}
      </Exercise>

      <Exercise n="4.9" title="粒子湮灭对光子的加热" level="★★" fromBook
        hint={R`熵密度 $s=(\rho+\mathcal P)/T\propto g_{*}T^3$（相对论粒子），$sa^3$ 守恒。数出 $T=10\,\mathrm{GeV}$ 时的相对论自由度。`}
        solution={<>
          <Tx>{R`计算两个时刻的熵密度 $(\mathcal P+\rho)/T$。两种情况下只有相对论粒子显著贡献熵。高温时贡献能量密度的有：夸克（$g_q=5\times3\times2$，五种最轻的夸克——u、d、s、c、b——各有三种颜色、两个自旋态）；反夸克（$g_{\bar q}=30$）；轻子（$g_l=3\times2$ 对三种有质量的 $e,\sym{ch04-muon}{\mu},\tau$，各两个自旋态，再加 3 对相应的中微子，它们只有一个螺旋度，见 §2.4.4）；反轻子（$g_{\bar l}=9$）；光子（2）；胶子（$g_g=8\times2$）。总计
$$g_*=2+16+\frac78(30+30+9+9)=86.25.$$
第六种夸克——顶夸克——太重（$m_t\simeq175\,\mathrm{GeV}$），在这样的温度下不存在；$W$、$\nosym{Z}$ 与 Higgs 玻色子同理。

今天熵只来自光子和中微子。光子贡献 2；中微子温度 $T_\nu=(4/11)^{1/3}T$，熵密度 $\propto T_\nu^3$，所以三代中微子贡献 $(7/8)\times3\times2\times(4/11)=1.91$，今天 $g_{*s}=3.91$（见下方勘误）。由 $sa^3$ 守恒，$[g_{*s}(aT)^3]_{T=10\,\rm GeV}=[g_{*s}(aT)^3]_{T_0}$，所以
$$\frac{(aT)^3|_{T=10\,\rm GeV}}{(a_0T_0)^3}=\frac{3.91}{86.25}=\frac1{22}.$$
若在 $\sim200\,\mathrm{GeV}$ 以上（所有标准模型粒子都贡献）重复计算：再加上顶夸克（$\frac78\times12=10.5$）、$W^\pm$（6）、$\nosym{Z}$（3）与 Higgs（1），$g_*=106.75$，比值为 $3.91/106.75=1/27$，差别不大。正文 \eqref{4.54} 取的 $\simeq1/30$ 是这一比值的粗略取整。`}</Tx>
          <Box kind="warning" title={R`勘误：附录 A 习题 4.9 解答中的 $g_*$`}>{R`原书附录 A 印作：今天中微子贡献 $(7/8)\times3\times2\times(4/11)^{4/3}=1.36$，$g_*=3.36$，比值 $3.36/86.25=1/26$（A.78）；全标准模型时 $g_*=103.75$，比值 1/31。正确为：今天 $g_{*s}=2+\frac78\times6\times\frac4{11}=3.91$，比值 1/22；全标准模型 $g_*=106.75$，比值 1/27。依据：(i) 守恒的是熵 $s\propto g_{*s}T^3$，退耦中微子的权重是 $(T_\nu/T)^3=4/11$，$(4/11)^{4/3}$ 是**能量密度**的权重（\eqref{4.27} 用的 $g_*=3.36$ 正是能量密度的值，此处不能套用）；(ii) 全标准模型自由度为 $86.25+\frac78\times12+6+3+1=106.75$（标准值），原书 103.75 少了 3。`}</Box>
        </>}>
        {R`通常宇宙等离子体的温度随膨胀按 $a^{-1}$ 冷却。但当粒子湮灭时，它们把能量注入等离子体，从而减缓冷却。利用熵密度（\eqref{2.70}）按 $a^{-3}$ 标度这一事实，计算 $T=10\,\mathrm{GeV}$ 时（WIMP 可能脱耦的时刻）$(aT)^3$ 与其今天值之比。`}
      </Exercise>

      <Exercise n="4.10" title="冷暗物质有多冷？" level="★"
        hint={R`$T_{\rm dm}=T^2/m$（$T=m$ 时两者相等）；热速度 $v\sim\sqrt{3T_{\rm dm}/m}$。`}
        solution={R`由 $T_{\rm dm}\propto T^2$ 且 $T=m$ 时 $T_{\rm dm}=T$，得 $T_{\rm dm}=T^2/m$。热速度 $v\simeq\sqrt{3T_{\rm dm}/m}=\sqrt3\,T/m$。取 $m=100\,\mathrm{GeV}=10^{11}\,\mathrm{eV}$：

◆ $T=1\,\mathrm{eV}$（约复合前）：$T_{\rm dm}=10^{-11}\,\mathrm{eV}$，$v\simeq1.7\times10^{-11}c\approx0.5\,\mathrm{cm\,s^{-1}}$；

◆ $T=2.7\,\mathrm K=2.3\times10^{-4}\,\mathrm{eV}$（今天）：$T_{\rm dm}\approx5\times10^{-19}\,\mathrm{eV}$，$v\simeq4\times10^{-15}c\approx1\times10^{-4}\,\mathrm{cm\,s^{-1}}$。

与星系中 $\sim200\,\mathrm{km\,s^{-1}}$ 的速度相比完全可以忽略：WIMP 是名副其实的**冷**暗物质，热运动不会抹平任何天体物理尺度上的结构。（实际上 WIMP 与等离子体的**动力学**脱耦比化学冻结更晚，约在 MeV 量级，所以真实的 $T_{\rm dm}$ 会更高几个量级，但结论不变。）`}>
        {R`在习题 3.11 中你证明了：一团不相互作用的非相对论粒子的热分布，其温度按 $a^{-2}$ 标度，而不是我们所见相对论粒子的 $a^{-1}$。所以 $T_{\rm dm}\propto T^2$。要求两者都等于暗物质质量时 $T_{\rm dm}=T$，以此固定归一化。估计质量为 100 GeV 的暗物质粒子在光子温度为 1 eV 时、以及为 2.7 K 时的典型热速度。`}
      </Exercise>
    </Sec>);
}
