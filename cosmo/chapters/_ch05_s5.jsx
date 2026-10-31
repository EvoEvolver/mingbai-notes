// §5.5 The Boltzmann equation for baryons —— 式 (5.53)–(5.61)
import { Sec, Tx, Eq, Box, Derivation, C } from "@kit";

const R = String.raw;

export function Sec55() {
  return (
    <Sec n="5.5" title="The Boltzmann equation for baryons" zh="重子的 Boltzmann 方程"
      gist={R`电子与原子核被库仑散射锁成一种非相对论流体（"重子"）。连续性方程与暗物质完全相同；Euler 方程多出 Compton 拖曳力——用动量守恒，从光子碰撞项的一阶矩（偶极矩 $\Theta_1$）直接得到 \eqref{5.61}。`}
      why={R`重子是唯一同时感受引力与光子压力的物质成分：正是它把光子与暗物质的世界连起来，并在复合前与光子一起做声学振荡。`}
      gives={["5.53", "5.54", "5.55", "5.56", "5.57", "5.58", "5.59", "5.60", "5.61"]}>
      <p className="muted">本节概念：<C id="drag" /> · <C id="moments" /> · <C id="tau" /></p>
      <Tx>{R`**"重子"这个误称。**下一个需要 Boltzmann 方程的成分是电子与质子。它们常被合称为**重子**（baryons）。这显然是个误称（电子是轻子），之所以这样叫，是因为这一对耦合粒子的能量密度由组成氢核与氦核的质子和中子的静质量主导。下面我们简单地说"质子"，但要记住其中包括氦以及微量更重的原子核。

**库仑散射把电子和原子核锁在一起。**电子与质子通过库仑散射（$e+p\leftrightarrow e+p$）耦合，在所有我们关心的时期，库仑散射率都远大于膨胀率（\exref{5.6}）。这种紧耦合迫使电子与质子的过密度取同一个值：`}</Tx>
      <Eq n="5.53" say={R`紧耦合使电子与质子的分数密度扰动相同，统一记为重子过密度 $\delta_{\rm b}$。`}>{R`\frac{\rho_e-\bar\rho_e}{\bar\rho_e} = \frac{\rho_p-\bar\rho_p}{\bar\rho_p} \equiv \delta_{\rm b}`}</Eq>
      <Tx>{R`这里遵从惯例用下标 b。同样，两种粒子的速度也被迫取同一个值：`}</Tx>
      <Eq n="5.54" say="紧耦合使电子与质子以同一个整体速度运动，记为 u_b。">{R`\boldsymbol u_e = \boldsymbol u_p \equiv \boldsymbol u_{\rm b}.`}</Eq>
      <Tx>{R`复合之后，电子与原子核第一次结合成原子，这种紧耦合依然保持，而中性原子此时已与光子退耦。由于它们之间的紧密耦合与相应很短的平均自由程，加上它们是非相对论的（$T\ll m_e$），电子与原子核可以当作非相对论流体处理：像暗物质那样，只需取其 Boltzmann 方程的**前两阶矩**。不过，我们要追踪它们通过 Compton 散射与光子的耦合。

**连续性方程：与暗物质一样。**对 $\delta_{\rm b}$ 与 $u_{\rm b}$ 取矩的过程，至少就左边而言，与 CDM 完全相同。让我们得到 CDM 方程 \eqref{5.51} 的零阶矩，在转到 Fourier 空间和共形时间之后，相应地给出`}</Tx>
      <Eq n="5.55" say="重子连续性方程：与暗物质完全相同——碰撞保持电子与原子核的数目，所以右边没有碰撞源项。">{R`\delta_{\rm b}' + iku_{\rm b} + 3\Phi' = 0,`}</Eq>
      <Tx>{R`尽管有碰撞，这里仍令右边为零，因为**碰撞保持电子与质子的数目不变**。这对库仑散射 $e^-+\mathrm N\leftrightarrow e^-+\mathrm N$ 成立，对 Compton 散射 $e^-+\gamma\leftrightarrow e^-+\gamma$ 也成立。在我们关心的复合前后，改变电子与核子数目的反应（对产生、湮灭、核反应）都无关紧要。源项为零的连续性方程恰好表达了这种数守恒。

**Euler 方程：多了一个力。**重子的第二个方程，由分别对电子和原子核的 Boltzmann 方程取一阶矩、再相加得到。对暗物质我们做过类似的事：先乘以 $\boldsymbol p/E$ 再对所有动量积分。这里做同样的事但不带 $1/E$ 因子。由于所涉及的粒子都是非相对论的（$E\approx m$），只要把暗物质的结果乘以质量因子 $m$ 即可沿用。例如，积分后的电子方程左边与 \eqref{5.49} 的左边完全一样，只是乘以 $m_e$；质子方程乘以 $m_p$。由于质子质量远大于电子质量，两个左边之和由质子主导。于是仿照 \eqref{5.49}：`}</Tx>
      <Eq n="5.56" say={R`重子动量密度的演化：左边与暗物质一样（惯性由质子提供），右边是光子通过 Compton 散射施加的力密度 $F_{e\gamma}$。`}>{R`m_p\frac{\partial(n_{\rm b}u^j_{\rm b})}{\partial t} + 4Hm_pn_{\rm b}u^j_{\rm b} + \frac{m_pn_{\rm b}}{a}\frac{\partial\Psi}{\partial x^j} = F^j_{e\gamma}(\boldsymbol x,t).`}</Eq>
      <Tx>{R`这一次碰撞项 $\boldsymbol F_{e\gamma}$ **不为零**。Boltzmann 方程的一阶矩描述动量守恒：电子和原子核的**数目**守恒，但它们的**动量**不守恒，因为 Compton 散射在光子与电子之间转移动量——这由力密度 $\boldsymbol F_{e\gamma}$ 描述。电子又立刻把动量转交给原子核。（原则上光子也会被原子核散射，但这个作用被 $m_e^2/m_p^2<10^{-6}$ 强烈压低，只计入电子散射项完全足够。）两边除以 $\rho_{\rm b}=m_p\bar n_{\rm b}$，得到`}</Tx>
      <Eq n="5.57" say="重子 Euler 方程（宇宙时、实空间）：与暗物质相同的哈勃摩擦与引力项，外加 Compton 力 / 重子密度。">{R`\frac{\partial u^j_{\rm b}}{\partial t} + Hu^j_{\rm b} + \frac1a\frac{\partial\Psi}{\partial x^j} = \frac{1}{\rho_{\rm b}}F^j_{e\gamma}(\boldsymbol x,t).`}</Eq>
      <Tx>{R`到这里为止，我们仍是照搬暗物质一阶矩的推导。

**捷径：用动量守恒算力。**最后一步是计算右边的积分碰撞项。我们用一个方便的捷径：$\boldsymbol F_{e\gamma}$ 描述光子与电子之间的动量转移；由于**每次散射中动量守恒**，这个力项必须与光子版"Euler 方程"中出现的力项**大小相等、方向相反**。而要得到那个方程，只需对光子 Boltzmann 方程——具体说是光子碰撞项 \eqref{5.22}——取一阶矩。

先转到 Fourier 空间。预期力 $\boldsymbol F_{e\gamma}$ 的方向与波矢 $\boldsymbol k$ 一致，所以在取一阶矩之前把 \eqref{5.22} 的 Fourier 版乘以 $\hat k^j$。此外，电子动量 $n_eu^i_e$ 计入了两个自旋态，即它是分布函数一阶矩的**两倍**，所以碰撞项还要乘以因子 2。连同动量守恒带来的负号，这意味着把 \eqref{5.22} 乘以 $-2p\mu$ 并对光子动量 $\boldsymbol p$ 积分：`}</Tx>
      <Eq n="5.58" say={R`电子获得的动量 = 光子因 Compton 散射失去的动量：把光子碰撞项乘以光子沿 $\boldsymbol k$ 方向的动量 $p\mu$（$\times2$ 自旋，取负号）再对全部光子动量积分。`}>{R`\begin{aligned}\frac1{\rho_{\rm b}}\hat k_iF^i_{e\gamma}(\boldsymbol x,t) &= -\frac{2n_e\sigma_{\rm T}}{\rho_{\rm b}}\int\frac{d^3p}{(2\pi)^3}p\mu\left[-p\frac{\partial f^{(0)}}{\partial p}\right]\left[\Theta_0-\Theta(\mu)+\mu u_{\rm b}\right]\\ &= \frac{2n_e\sigma_{\rm T}}{\rho_{\rm b}}\int_0^\infty\frac{dp}{2\pi^2}p^4\frac{\partial f^{(0)}}{\partial p}\int_{-1}^1\frac{d\mu}{2}\mu\left[\Theta_0-\Theta(\mu)+\mu u_{\rm b}\right].\end{aligned}`}</Eq>
      <Tx>{R`对 $p$ 的积分可以分部积分完成：结果是 $-2\rho_\gamma$，因为光子背景能量密度 $\rho_\gamma$ 是 $pf^{(0)}(p)$ 动量积分的两倍。$\mu$ 积分中，第一项和第三项很直接——第一项为零，第三项给出 $u_{\rm b}/3$。第二项的积分给出扰动 $\Theta$ 的一阶矩。回忆光子分布零阶矩 $\Theta_0$ 的定义 \eqref{5.20}，自然地定义一阶矩——**偶极矩**（dipole）：`}</Tx>
      <Eq n="5.59" keyEq title="偶极矩" say={R`偶极矩：温度扰动按 $\mu$ 加权的方向平均，衡量光子朝 $\boldsymbol k$ 方向的净流动（因子 $i$ 是约定）。`}>{R`\Theta_1(k,\eta) \equiv i\int_{-1}^1\frac{d\mu}{2}\mu\,\Theta(\mu,k,\eta)`}</Eq>
      <Tx>{R`其中因子 $i$ 是约定俗成。于是 \eqref{5.58} 变为`}</Tx>
      <Eq n="5.60" title="Compton 拖曳力" say={R`光子作用在重子上的力：正比于散射率 $n_e\sigma_{\rm T}$、光子与重子密度之比，以及光子偶极与重子速度之差（$i\Theta_1+u_{\rm b}/3$）。`}>{R`\frac{1}{\rho_{\rm b}}\hat k_iF^i_{e\gamma}(\boldsymbol x,t) = -n_e\sigma_{\rm T}\frac{4\rho_\gamma}{\rho_{\rm b}}\left[i\Theta_1+\frac13u_{\rm b}\right].`}</Eq>
      <Derivation title={R`\eqref{5.58} 中的两个积分`} collapsed steps={[
        { tex: R`\frac{d^3p}{(2\pi)^3}=\frac{p^2dp\,d\Omega}{8\pi^3},\quad \int d\Omega\to2\pi\int_{-1}^1d\mu\ \Rightarrow\ \int\frac{d^3p}{(2\pi)^3}=\int_0^\infty\frac{p^2dp}{2\pi^2}\int_{-1}^1\frac{d\mu}2`, why: R`以 $\hat{\boldsymbol k}$ 为极轴；被积函数只依赖 $\mu$，方位角积分给出 $2\pi$。两个负号相乘得 \eqref{5.58} 第二行。` },
        { tex: R`\int_0^\infty\frac{dp}{2\pi^2}p^4\frac{\partial f^{(0)}}{\partial p}=-4\int_0^\infty\frac{dp}{2\pi^2}p^3f^{(0)}=-2\rho_\gamma`, why: R`分部积分；而 $\rho_\gamma=2\int\frac{d^3p}{(2\pi)^3}pf^{(0)}=\frac1{\pi^2}\int_0^\infty dp\,p^3f^{(0)}$，所以 $\int\frac{dp}{2\pi^2}p^3f^{(0)}=\rho_\gamma/2$。` },
        { tex: R`\int_{-1}^1\frac{d\mu}2\mu\left[\Theta_0-\Theta(\mu)+\mu u_{\rm b}\right]=0-\frac{\Theta_1}{i}+\frac{u_{\rm b}}3=i\Theta_1+\frac{u_{\rm b}}3`, why: R`$\Theta_0$ 与 $\mu$ 无关，乘 $\mu$ 积分为零；$\int\frac{d\mu}2\mu\Theta=\Theta_1/i=-i\Theta_1$（\eqref{5.59}）；$\int\frac{d\mu}2\mu^2=\frac13$。` },
        { tex: R`\frac{2n_e\sigma_{\rm T}}{\rho_{\rm b}}\times(-2\rho_\gamma)\times\left(i\Theta_1+\frac{u_{\rm b}}3\right)=-n_e\sigma_{\rm T}\frac{4\rho_\gamma}{\rho_{\rm b}}\left[i\Theta_1+\frac13u_{\rm b}\right]`, why: R`即 \eqref{5.60}。` },
      ]} />
      <Box kind="physics" title="Compton 拖曳：迎着热风走">{R`为什么辐射场的**偶极**会出现在重子的 Euler 方程里？关键在于光子与电子之间的**净动量转移**。在各向同性的辐射场中不会有净动量转移。但若存在偶极，就有更多高能光子从某一方向而来；朝温度较高方向运动的电子会迎面遇到"顶风"，受到指向相反方向的拖曳力。这称为 **Compton 拖曳**（Compton drag）。

更精确地，$F^i_{e\gamma}$ 是光子散射电子所施加的**力密度**（类似压强梯度）。力密度 = 碰撞率（$n_e\sigma_{\rm T}$）$\times$ 每次碰撞的平均动量转移，后者约为光子密度乘以光子分布的偶极。方括号 $i\Theta_1+u_{\rm b}/3$ 是光子流体与重子流体之间的**速度差**：若重子与光子同速（$u_{\rm b}=-3i\Theta_1$），力为零。`}</Box>
      <Tx>{R`**重子 Euler 方程。**现在有了碰撞项的表达式，代入 \eqref{5.57}，转到共形时间（乘以 $a$，$-n_e\sigma_{\rm T}a=\tau'$）后得到`}</Tx>
      <Eq n="5.61" keyEq title="重子 Euler 方程" say={R`重子速度的演化：哈勃摩擦、引力加速，以及光子的 Compton 拖曳（$\tau'$ 为负，拖曳使 $u_{\rm b}$ 趋向光子速度 $-3i\Theta_1$），拖曳强度 $\propto$ 光子与重子密度之比。`}>{R`{u_{\rm b}}' + \frac{a'}{a}u_{\rm b} + ik\Psi = \tau'\frac{4\rho_\gamma}{3\rho_{\rm b}}\left[3i\Theta_1+u_{\rm b}\right].`}</Eq>
      <Box kind="warning" title="为什么分母是全部重子的密度">{R`光子主要与电子散射，为什么在这个速度方程中出现的是**全部**重子密度（由质子主导）？物理上，推动电子很难，因为电子通过库仑散射与质子紧耦合。若质子无限重（$\rho_{\rm b}\to\infty$），Compton 散射根本无法改变电子速度，对电子–质子组合流体也就毫无影响。

我们推导 \eqref{5.61} 时令 $n_e=n_p=n_{\rm b}$，即假设氢完全电离。但即使有相当多的中性氢（$n_e<n_{\rm b}$），结果仍然成立：复合之后大多数质子束缚在中性氢原子中；即使在复合之前，也有一小部分在氦原子或离子中。然而中性的氢与氦同样与电子和质子紧耦合（\exref{5.6}），所以 \eqref{5.61} 确实描述了**全部**重子（此时 $\tau'$ 中的 $n_e$ 是**自由**电子密度）。`}</Box>
      <Box kind="data" title="R 的量级">{R`由 \eqref{5.74}，$R\equiv3\rho_{\rm b}/4\rho_\gamma$。用 $\Omega_{\rm b}h^2=0.0224$、$\Omega_\gamma h^2=2.47\times10^{-5}$：今天 $3\Omega_{\rm b}/4\Omega_\gamma\approx680$，而 $R\propto a$，所以复合时（$a\approx1/1100$）$R\approx0.62$——光子与重子的惯性同量级，这正是 CMB 声学峰高度交替的根源（第 9 章）。`}</Box>
    </Sec>);
}
