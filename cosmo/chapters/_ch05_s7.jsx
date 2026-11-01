// §5.7 Summary —— 式 (5.66)–(5.74)，图 5.3
import { Sec, Tx, Eq, Box, Derivation, Figure, Table, C } from "@kit";
import { LegendrePlot, MultipolePlot, MultipoleBars, AcousticPlot } from "./_ch05_plots.jsx";

const R = String.raw;

export function Sec57() {
  return (
    <Sec n="5.7" title="Summary" zh="小结：全部扰动方程"
      gist={R`非相对论成分（暗物质、重子）只需密度与速度两个矩；相对论成分（光子、中微子）需要整个角分布——用 Legendre 多极矩 $\Theta_l$ 描述。最后列出含 Compton 角依赖与偏振 $\Pi$ 项的全套方程 \eqref{5.67}–\eqref{5.73}。`}
      why={R`把散落在各节的结果统一成一张"方程清单"，并引入以后计算 CMB 角功率谱必需的多极矩语言。`}
      gives={["5.66", "5.67", "5.68", "5.69", "5.70", "5.71", "5.72", "5.73", "5.74"]}>
      <p className="muted">本节概念：<C id="multipoles" /> · <C id="tight" /> · <C id="drag" /></p>
      <Tx>{R`**回顾。**宇宙的各种成分在空间上并非完全均匀分布——唯一的例外是宇宙学常数，因此本章忽略了它。要描述扰动的演化，必须求解本章推导的扰动 Boltzmann 方程。对暗物质、重子这类**非相对论**成分，可以对粒子动量取矩、只保留最低阶的矩，从而大大简化 Boltzmann 方程：暗物质（重子）的过密度 $\delta_{\rm c}(\boldsymbol x,t)$（$\delta_{\rm b}(\boldsymbol x,t)$）与速度 $\boldsymbol u_{\rm c}(\boldsymbol x,t)$（$\boldsymbol u_{\rm b}(\boldsymbol x,t)$）。如 Box 5.1 所述，把线性演化方程变换到 Fourier 空间很方便：与波矢 $\boldsymbol k$ 相联系的模式独立于其他一切 Fourier 模式演化。我们还发现用共形时间 $\eta$ 作为演化变量很方便。总之，我们得到了 $\delta_{\rm c}(\boldsymbol k,\eta)$、$\delta_{\rm b}(\boldsymbol k,\eta)$、$u_{\rm c}(\boldsymbol k,\eta)$、$u_{\rm b}(\boldsymbol k,\eta)$ 的方程。这里的标量速度是平行于 $\boldsymbol k$ 的分量——宇宙学上只有它们重要。

**相对论粒子需要更多信息。**光子、中微子这样的相对论粒子不仅有单极扰动（相当于 $\delta_{\rm c}$）和偶极（相当于速度），还有四极、八极以及更高阶矩。换言之，光子分布不仅依赖 $\boldsymbol x$ 和时间，还依赖光子的传播方向 $\hat{\boldsymbol p}$。因此在 Fourier 空间中，光子扰动不仅依赖 $k$ 与 $\eta$，还依赖 $\hat{\boldsymbol p}\cdot\hat{\boldsymbol k}$——我们定义它为 $\mu$。于是光子扰动变量是 $\Theta(k,\mu,\eta)$。中微子扰动需要另一个变量 $\mathcal N(k,p,\mu,\eta)$（实际上每个质量本征态一个），并因中微子有质量而额外依赖 $p$。幸运的是，至少直到复合时期，可以忽略中微子质量以及 $\mathcal N$ 对 $p$ 的依赖。

**多极矩。**我们发现定义光子分布的单极 \eqref{5.20} 与偶极 \eqref{5.59} 很有用。但这两个矩 $\Theta_0(k,\eta)$、$\Theta_1(k,\eta)$ 并不能完全刻画光子分布。我们需要温度场的一般第 $l$ 阶**多极矩**：`}</Tx>
      <Eq n="5.66" keyEq title="多极矩" say="第 l 阶多极矩：温度扰动在 l 阶 Legendre 多项式上的投影（前置的 1/(−i)^l 是约定）。l 越大，描述的角度结构越精细。">{R`\Theta_l(k,\eta) \equiv \frac{1}{(-i)^l}\int_{-1}^1\frac{d\mu}{2}\mathcal P_l(\mu)\Theta(\mu,k,\eta),`}</Eq>
      <Tx>{R`其中 $\mathcal P_l$ 是 $l$ 阶 Legendre 多项式（\eqref{C.2}）。四极对应 $l=2$，八极对应 $l=3$，依此类推。高阶 Legendre 多项式在更小的尺度上有结构（图 5.3），所以高阶矩捕捉辐射场在小尺度上的各向异性信息。光子扰动既可以用 $\Theta(k,\mu,\eta)$ 描述，也可以用一串矩 $\Theta_l(k,\eta)$ 描述。同样的多极展开也适用于中微子分布。`}</Tx>
      <Figure n="5.3" illustration={<LegendrePlot />}
        caption={R`若干 Legendre 多项式（原书：$l=0,1,3,40$）。高阶多项式比低阶的在更小的尺度上变化。一般地，$\mathcal P_l$ 在 $-1$ 与 $1$ 之间穿过零点 $l$ 次。自绘交互：拖动 $l$，图例中的"零点数"是数值计数的结果，始终等于 $l$。`} />
      <Box kind="key" title="多极矩的两个常用性质">{R`**正交性与反演。**Legendre 多项式满足 $\int_{-1}^1\frac{d\mu}{2}\mathcal P_l(\mu)\mathcal P_{l'}(\mu)=\frac{\delta_{ll'}}{2l+1}$，所以 \eqref{5.66} 可以反演为
$$\Theta(\mu)=\sum_{l=0}^\infty(-i)^l(2l+1)\Theta_l\mathcal P_l(\mu).$$
$l=0$ 时 \eqref{5.66} 就是 \eqref{5.20}（$\mathcal P_0=1$，Fourier 空间中方向平均只需对 $\mu$ 积分）；$l=1$ 时 $\mathcal P_1=\mu$、$1/(-i)=i$，就是 \eqref{5.59}。

**自由流的多极矩是球 Bessel 函数。**无碰撞、无引力时 \eqref{5.35} 的解为 $\Theta=\Theta(\eta_*)e^{-ik\mu(\eta-\eta_*)}$。代入 \eqref{5.66} 并利用 $\int_{-1}^1\frac{d\mu}{2}\mathcal P_l(\mu)e^{-ix\mu}=(-i)^lj_l(x)$，得 $\Theta_l=\Theta(\eta_*)\,j_l(k(\eta-\eta_*))$——那个 $1/(-i)^l$ 约定正好让它是实数。$j_l(x)$ 在 $l\approx x$ 附近最大，所以随着时间推移，自由流把一个空间波长 $2\pi/k$ 的扰动"投影"到越来越高的多极 $l\sim k(\eta-\eta_*)$ 上。`}</Box>
      <Tx>{R`下面两张交互图验证上面的说法：第一张对 $\cos(x\mu)=\mathrm{Re}\,e^{-ix\mu}$ 按 \eqref{5.66} 数值求多极矩、再截断到 $l_{\max}$ 重建；$x$ 越大，需要越多的多极矩才能重现这条曲线。第二张把数值积分得到的 $\Theta_l$ 与 $j_l(x)$ 逐项比较（两者在 $10^{-6}$ 精度内一致），并标出 $l=x$。`}</Tx>
      <MultipolePlot />
      <MultipoleBars />
      <Tx>{R`**偏振。**偏振的讨论推迟到第 10 章；但 \secref{5.2} 提到过，要完全精确地处理温度各向异性，必须计入偏振效应。同样等到第 10 章再给正式定义，这里先把光子偏振场记为 $\Theta_P$。Fourier 变换后它同样依赖 $k$、$\mu$ 与 $\eta$，其 Legendre 多极分解记为 $\Theta_{P,l}$。

**全部方程。**现在汇总我们为光子、暗物质、重子和中微子推出的方程：`}</Tx>
      <Eq n="5.67" keyEq title="完整的光子 Boltzmann 方程" say={R`光子温度扰动的完整方程：在 (5.35) 基础上，Compton 散射的角依赖与偏振通过 $-\frac12\mathcal P_2(\mu)\Pi$ 项进入碰撞项。`}>{R`\Theta' + ik\mu\Theta = -\Phi' - ik\mu\Psi - \tau'\left[\Theta_0-\Theta+\mu u_{\rm b}-\frac12\mathcal P_2(\mu)\Pi\right]`}</Eq>
      <Tx>{R`其中`}</Tx>
      <Eq n="5.68" say={R`$\Pi$ 收集了只与四极结构有关的源：温度四极矩，以及偏振的四极与单极。`}>{R`\Pi = \Theta_2 + \Theta_{P,2} + \Theta_{P,0}.`}</Eq>
      <Tx>{R`\eqref{5.67} 就是我们推出的光子 Boltzmann 方程，只有一处改动：最后一项 $\mathcal P_2\Pi/2$，需要解释一下。首先，它正比于二阶 Legendre 多项式 $\mathcal P_2(\mu)=(3\mu^2-1)/2$。由 \eqref{5.68}，其中一个新项是 $\mathcal P_2\Theta_2/2$：它计入了 \secref{5.2} 中忽略的 **Compton 散射角依赖**（推导见 \exref{5.4}）。$\Pi$ 的其他部分则表示温度场还与**偏振场** $\Theta_P$ 耦合。虽然 $\Theta_P$ 的方程留到以后，但值得一提的是：$\Theta_P$ **只**由温度分布的四极矩 $\Theta_2$ 激发，与其他温度矩无关。

其余方程为`}</Tx>
      <Eq n="5.69" keyEq title="CDM 连续性方程" say={R`暗物质过密度的变化：速度汇聚（$-iku_{\rm c}$）与局域体积变化（$-3\Phi'$）。`}>{R`{\delta_{\rm c}}' + iku_{\rm c} = -3\Phi',`}</Eq>
      <Eq n="5.70" keyEq title="CDM Euler 方程" say="暗物质速度：哈勃摩擦使其衰减，引力势梯度驱动它。">{R`{u_{\rm c}}' + \frac{a'}{a}u_{\rm c} = -ik\Psi,`}</Eq>
      <Eq n="5.71" say="重子连续性方程：与暗物质相同。">{R`\delta_{\rm b}' + iku_{\rm b} = -3\Phi',`}</Eq>
      <Eq n="5.72" title="重子 Euler 方程" say={R`重子速度：与暗物质相同的哈勃摩擦与引力，加上 Compton 拖曳——强度为 $\tau'/R$，把 $u_{\rm b}$ 拉向光子速度 $-3i\Theta_1$。`}>{R`{u_{\rm b}}' + \frac{a'}{a}u_{\rm b} = -ik\Psi + \frac{\tau'}{R}\left[u_{\rm b}+3i\Theta_1\right],`}</Eq>
      <Eq n="5.73" say={R`中微子温度扰动：无碰撞的“光子方程”，带有质量带来的 $p/E_\nu$ 因子和 $p$ 依赖。`}>{R`\mathcal N' + ik\mu\frac{p}{E_\nu(p)}\mathcal N - aHp\frac{\partial}{\partial p}\mathcal N = -\Phi' - ik\mu\frac{E_\nu(p)}{p}\Psi.`}</Eq>
      <Tx>{R`在重子速度方程 \eqref{5.72} 中，光子与重子密度之比被替换为 $R$，定义为`}</Tx>
      <Eq n="5.74" keyEq title="重子–光子比 R" say={R`$R$ 的倒数 = $4\rho_\gamma/3\rho_{\rm b}$：光子与重子“惯性”（动量密度）之比；$R\propto a$，复合时约 0.6。`}>{R`\frac{1}{R(\eta)} \equiv \frac{4\rho_\gamma(\eta)}{3\rho_{\rm b}(\eta)}.`}</Eq>
      <Box kind="warning" title="R 不是重子–光子数密度比">{R`不要把 $R$ 与光子–重子**数**密度之比 $\eta_{\rm b}$ 混淆：$\eta_{\rm b}\approx6\times10^{-10}$ 不随时间变化，而且小得多！$R=3\rho_{\rm b}/4\rho_\gamma$ 是**能量**密度之比，$\propto a$。（\eqref{5.72} 中 $\frac{\tau'}{R}$ 与 \eqref{5.61} 中 $\tau'\frac{4\rho_\gamma}{3\rho_{\rm b}}$ 相同。）`}</Box>
      <Table head={[R`成分`, R`变量`, R`方程`, R`耦合`, R`层级`]} rows={[
        [R`光子 $\gamma$`, R`$\Theta(k,\mu,\eta)$ 或 $\Theta_l$`, R`\eqref{5.67}、\eqref{5.68}`, R`引力 + Compton（$\tau'$）`, R`无穷层级（$l=0,1,2,\ldots$）`],
        [R`冷暗物质 c`, R`$\delta_{\rm c}$、$u_{\rm c}$`, R`\eqref{5.69}、\eqref{5.70}`, R`只有引力`, R`截断于 $l=1$`],
        [R`重子 b`, R`$\delta_{\rm b}$、$u_{\rm b}$`, R`\eqref{5.71}、\eqref{5.72}`, R`引力 + Compton 拖曳（$\tau'/R$）`, R`截断于 $l=1$`],
        [R`中微子 $\nu$`, R`$\mathcal N(k,p,\mu,\eta)$`, R`\eqref{5.73}`, R`只有引力`, R`无穷层级（且依赖 $p$）`],
        [R`引力`, R`$\Phi$、$\Psi$`, R`第 6 章 Einstein 方程`, R`由全部成分决定`, R`—`],
      ]} caption={R`本章的方程清单。所有方程都对每个 $\boldsymbol k$ 独立，以共形时间 $\eta$ 为自变量。`} />
      <p className="muted">（各成分之间的耦合关系见本章开头的图 5.1 交互版。）</p>
      <Tx>{R`**延伸阅读。**本章的推导基于 Ma & Bertschinger（1995）的经典论文。该文略去了这里给出的许多步骤，但强烈推荐作为进一步阅读——它还有一个额外的好处：同时给出了共形牛顿规范与同步规范中的方程（见 \exref{5.1}）。`}</Tx>
      <Box kind="aside" title="预告：紧耦合下的声学振荡（第 9 章的玩具模型）">
        <Tx>{R`本章方程已经足以看到 CMB 物理的核心。对 \eqref{5.35} 分别取单极矩（乘 $d\mu/2$ 积分）和偶极矩（乘 $i\mu\,d\mu/2$ 积分），利用 $\int\frac{d\mu}2\mu^2\Theta=\frac13(\Theta_0-2\Theta_2)$，得到`}</Tx>
        <Derivation title="从 (5.35) 与 (5.72) 到声学振荡" collapsed steps={[
          { tex: R`\Theta_0'+k\Theta_1=-\Phi'`, why: R`单极：$ik\int\frac{d\mu}2\mu\Theta=ik\cdot(-i\Theta_1)=k\Theta_1$；右边 $\Theta_0-\Theta_0+0=0$。` },
          { tex: R`\Theta_1'-\frac k3\Theta_0+\frac{2k}3\Theta_2-\frac k3\Psi=\tau'\left[\Theta_1-\frac{iu_{\rm b}}3\right]`, why: R`偶极：乘 $i\mu$ 后积分，$i\cdot ik\int\frac{d\mu}2\mu^2\Theta=-\frac k3(\Theta_0-2\Theta_2)$。` },
          { tex: R`u_{\rm b}\simeq-3i\Theta_1+\mathcal O(1/\tau'),\qquad \Theta_2\simeq0`, why: R`紧耦合 $|\tau'|\gg k,\mathcal H$：\eqref{5.72} 右边的大系数迫使方括号近似为零；四极被散射抹掉。` },
          { tex: R`3i(1+R)\Theta_1'=ik\Theta_0+ik(1+R)\Psi-3iR\frac{a'}a\Theta_1`, why: R`把偶极方程乘 $3i$，与 $R\times$\eqref{5.72} 相减消去 $\tau'$ 项，再代入 $u_{\rm b}=-3i\Theta_1$。` },
          { tex: R`\Theta_0''+k^2c_s^2\Theta_0=-\frac{k^2}{3}\Psi,\qquad c_s^2\equiv\frac{1}{3(1+R)}`, why: R`玩具模型：取 $R$、$\Psi$、$\Phi$ 为常数并忽略 $\frac{a'}{a}R$ 项，联立 $\Theta_0'=-k\Theta_1$。` },
          { tex: R`\Theta_0(\eta)=\left[\Theta_0(0)+(1+R)\Psi\right]\cos(kc_s\eta)-(1+R)\Psi`, why: R`初始 $\Theta_1(0)=0$ 的解：围绕平衡点 $-(1+R)\Psi$ 的简谐振动，声视界 $r_s=c_s\eta$。` },
        ]} />
        <Tx>{R`这就是**光子–重子流体的声学振荡**：Compton 散射把光子与重子锁成一种流体，光子压力提供回复力，重子提供惯性（使声速从 $1/\sqrt3$ 降到 $1/\sqrt{3(1+R)}$）并把平衡点移到 $-(1+R)\Psi$。观测到的有效温度是 $\Theta_0+\Psi$（光子还要爬出势阱）。下图中实线是解析解、红点是对一阶方程组 $\Theta_0'=-k\Theta_1$、$\Theta_1'=k\Theta_0/[3(1+R)]+k\Psi/3$ 的 RK4 数值积分，两者重合（最大偏差约 $10^{-11}$）。拖动 $R$：重子越多，振荡越慢、平衡点越偏，压缩相（$kr_s=\pi,3\pi,\ldots$）与稀疏相的幅度不再对称——这正是 CMB 奇偶峰高度差的来源（第 9 章）。`}</Tx>
        <AcousticPlot />
      </Box>
    </Sec>);
}
