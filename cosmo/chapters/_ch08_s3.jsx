import { RadiationCoupling } from "./_ch14_redraw.jsx";
// §8.3 Small scales —— 式 (8.40)–(8.65)，图 8.8–8.13
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { PhiPlot, DeltaPlot, RegimeDiagram } from "./_ch08_plots.jsx";

const R = String.raw;

export function Sec83() {
  return (
    <Sec n="8.3" title="Small scales" zh="小尺度"
      gist={R`小尺度模式在辐射期深处进入视界。第一步：势由辐射决定，满足带阻尼的波动方程 \eqref{8.44}，解为衰减振荡 \eqref{8.46}；暗物质被它驱动，进入视界后锁定到对数增长 $\delta_{\rm c}=A\mathcal R\ln(Bk\eta)$。第二步：视界内、辐射扰动可忽略后，暗物质满足 Meszaros 方程 \eqref{8.59}，其解 $D_\pm$ 与对数解匹配，带它穿过相等。`}
      why={R`功率谱在 $k>k_{\rm eq}$ 的下降正来自这里：辐射压强让势衰减，暗物质失去了"推力"，只能缓慢增长。要定量地写出 $T(k)$ 的小尺度形式，必须把这两步都解出来。`}
      gives={["8.40", "8.44", "8.46", "8.47", "8.49", "8.50", "8.51", "8.52", "8.54", "8.59", "8.60", "8.63", "8.64", "8.65"]}>
      <p className="muted">本节概念：<C id="rad_decay" /> · <C id="log_growth" /> · <C id="meszaros" /></p>
      <Tx>{R`**问题的另一种拆分。**上一节能求解大尺度扰动，是因为它们在相等**之后**很久才穿越视界，问题干净地分成 (i) 视界外模式穿越相等，(ii) 物质期模式穿越视界。本节的小尺度模式恰好相反：它们在辐射期深处穿越视界。所以问题分成 (i) 辐射期模式穿越视界（\figref{8.8}），(ii) 视界内模式穿越相等（\figref{8.12}）。第 (i) 步在 \secref{8.3.1} 处理，第 (ii) 步在 \secref{8.3.2}。注意，我们无法解析处理在相等**附近**进入视界的模式；但这些模式在物理上并无不同，只是不适用我们所取的数学极限。`}</Tx>
      <Figure n="8.8" illustration={<RegimeDiagram lk0={0} reg0="nd" />}
        caption={R`\secref{8.3.1} 研究的区域：辐射主导深处模式的演化，此时 CDM 密度扰动（对势的贡献）可以忽略。`} />

      <Sub n="8.3.1" title="Horizon crossing" zh="穿越视界">
        <Tx>{R`**单向耦合。**宇宙由辐射主导时，势由**辐射**的扰动决定。暗物质扰动——本章关注的对象——由引力势决定，自身却不影响势。情形如 \figref{8.9} 所示。因此求解这一时期的物质扰动是**两步**问题：先解 $\Theta_{{\rm r},0}$、$\Theta_{{\rm r},1}$ 与 $\Phi$ 的耦合方程，再把势当作外部驱动力去解物质的演化方程。`}</Tx>
        <Figure n="8.9" illustration={<RadiationCoupling />} width="100%" caption={R`辐射期近似中的扰动耦合：辐射与势相互驱动，冷暗物质只被驱动。`} />
        <Tx>{R`**辐射期的 Poisson 方程。**为解辐射期的势，选用 \eqref{8.15}。丢掉物质源项，`}</Tx>
        <Eq n="8.40" title="辐射期的代数 Einstein 方程" say={R`辐射期的势 $=\frac{6a^2H^2}{k^2}\times$（辐射单极 + $\frac{3aH}k\times$ 偶极）：视界内（$k\gg aH$）势被 $(aH/k)^2$ 压低。`}>{R`\Phi = \frac{6a^2H^2}{k^2}\left[\Theta_{{\rm r},0}+\frac{3aH}{k}\Theta_{{\rm r},1}\right]`}</Eq>
        <Tx>{R`这里用了辐射期 $H^2=8\pi G\rho_{\rm r}/3$（所以 $4\pi Ga^2\cdot4\rho_{\rm r}=6a^2H^2$）。辐射期还有 $aH=1/\eta$。有了这一点，就可以用 Einstein 方程 \eqref{8.40} 消去两个辐射方程 \eqref{8.10}–\eqref{8.11} 中的 $\Theta_{{\rm r},0}$。它们变为`}</Tx>
        <Eq n="8.41" say={R`消去 $\Theta_{{\rm r},0}$ 后的辐射单极方程：一个联系 $\Theta_{{\rm r},1}$、$\Theta'_{{\rm r},1}$、$\Phi$、$\Phi'$ 的一阶方程。`}>{R`-\frac{3}{k\eta}\Theta'_{{\rm r},1} + k\Theta_{{\rm r},1}\left[1+\frac{3}{k^2\eta^2}\right] = -\Phi'\left[1+\frac{k^2\eta^2}{6}\right] - \Phi\frac{k^2\eta}{3},`}</Eq>
        <Eq n="8.42" say={R`消去 $\Theta_{{\rm r},0}$ 后的辐射偶极方程：偶极被 $1/\eta$ 项阻尼，由势驱动。`}>{R`\Theta'_{{\rm r},1} + \frac1\eta\Theta_{{\rm r},1} = -\frac k3\Phi\left[1-\frac{k^2\eta^2}{6}\right].`}</Eq>
        <Derivation title={R`\eqref{8.40} 代入 \eqref{8.10}–\eqref{8.11}`} collapsed steps={[
          { tex: R`\Theta_{{\rm r},0}=\frac{k^2\eta^2}{6}\Phi-\frac{3}{k\eta}\Theta_{{\rm r},1}`, why: R`由 \eqref{8.40}，$aH=1/\eta$。` },
          { tex: R`\Theta'_{{\rm r},0}=\frac{k^2\eta}{3}\Phi+\frac{k^2\eta^2}{6}\Phi'-\frac{3}{k\eta}\Theta'_{{\rm r},1}+\frac{3}{k\eta^2}\Theta_{{\rm r},1}`, why: R`对 $\eta$ 求导。` },
          { tex: R`-\frac3{k\eta}\Theta'_{{\rm r},1}+k\Theta_{{\rm r},1}\Big[1+\frac{3}{k^2\eta^2}\Big]=-\Phi'\Big[1+\frac{k^2\eta^2}6\Big]-\Phi\frac{k^2\eta}3`, why: R`代入 \eqref{8.10}：$\Theta'_{{\rm r},0}+k\Theta_{{\rm r},1}=-\Phi'$，整理即 \eqref{8.41}。` },
          { tex: R`\Theta'_{{\rm r},1}-\frac k3\Big[\frac{k^2\eta^2}6\Phi-\frac3{k\eta}\Theta_{{\rm r},1}\Big]=-\frac k3\Phi\ \Rightarrow\ \Theta'_{{\rm r},1}+\frac1\eta\Theta_{{\rm r},1}=-\frac k3\Phi\Big[1-\frac{k^2\eta^2}6\Big]`, why: R`代入 \eqref{8.11}，即 \eqref{8.42}。` },
        ]} />
        <Tx>{R`**化成一个二阶方程。**这是关于 $\Phi$ 与 $\Theta_{{\rm r},1}$ 的两个一阶方程，可以化为势的一个二阶方程。用 \eqref{8.42} 消去第一个方程中的 $\Theta'_{{\rm r},1}$，它变为`}</Tx>
        <Eq n="8.43" say={R`辐射偶极完全由势及其导数确定：$\Theta_{{\rm r},1}=-\frac{k\eta^2}{6}\left(\Phi'+\frac\Phi\eta\right)$。`}>{R`\Phi' + \frac1\eta\Phi = -\frac{6}{k\eta^2}\Theta_{{\rm r},1}.`}</Eq>
        <Derivation title={R`\eqref{8.41} + \eqref{8.42} ⇒ \eqref{8.43}`} collapsed steps={[
          { tex: R`-\frac3{k\eta}\Theta'_{{\rm r},1}=\frac{3}{k\eta^2}\Theta_{{\rm r},1}+\frac{\Phi}{\eta}-\frac{k^2\eta}{6}\Phi`, why: R`把 \eqref{8.42} 乘以 $-3/(k\eta)$。` },
          { tex: R`\Theta_{{\rm r},1}\Big[\frac{6}{k\eta^2}+k\Big]+\frac\Phi\eta\Big[1+\frac{k^2\eta^2}{6}\Big]=-\Phi'\Big[1+\frac{k^2\eta^2}6\Big]`, why: R`代入 \eqref{8.41}，把 $-\frac{k^2\eta}6\Phi$ 与右边 $-\frac{k^2\eta}3\Phi$ 合并为 $-\frac{k^2\eta}{6}\Phi$ 移到左边。` },
          { tex: R`\frac{6}{k\eta^2}+k=\frac{6}{k\eta^2}\Big[1+\frac{k^2\eta^2}6\Big]\ \Rightarrow\ \Phi'+\frac\Phi\eta=-\frac6{k\eta^2}\Theta_{{\rm r},1}`, why: R`公因子 $1+k^2\eta^2/6$ 约去。` },
        ]} />
        <Tx>{R`现在得到 $\Theta_{{\rm r},1}$ 只用势及其一阶导数表示的式子。为得到 $\Phi$ 的二阶方程，再求一次导。求导时会遇到正比于 $\Theta_{{\rm r},1}$ 及其导数的项，每一个都可以用 \eqref{8.42} 与 \eqref{8.43} 消去。结果是`}</Tx>
        <Eq n="8.44" keyEq title="辐射期势的波动方程" say={R`辐射期势满足带阻尼的波动方程：$\frac{k^2}3\Phi$ 是声速 $1/\sqrt3$ 的“回复力”，$\frac4\eta\Phi'$ 是膨胀造成的阻尼。`}>{R`\Phi'' + \frac4\eta\Phi' + \frac{k^2}{3}\Phi = 0.`}</Eq>
        <Derivation title={R`从 \eqref{8.43} 到 \eqref{8.44}`} collapsed steps={[
          { tex: R`\Theta_{{\rm r},1}=-\frac{k}{6}\left(\eta^2\Phi'+\eta\Phi\right)`, why: R`改写 \eqref{8.43}。` },
          { tex: R`\Theta'_{{\rm r},1}=-\frac k6\left(\eta^2\Phi''+3\eta\Phi'+\Phi\right)`, why: R`求导。` },
          { tex: R`-\frac k6\left(\eta^2\Phi''+3\eta\Phi'+\Phi\right)-\frac k6\left(\eta\Phi'+\Phi\right)=-\frac k3\Phi+\frac{k^3\eta^2}{18}\Phi`, why: R`代入 \eqref{8.42}。` },
          { tex: R`\eta^2\Phi''+4\eta\Phi'+2\Phi=2\Phi-\frac{k^2\eta^2}{3}\Phi\ \Rightarrow\ \Phi''+\frac4\eta\Phi'+\frac{k^2}3\Phi=0`, why: R`两边乘以 $-6/k$ 再除以 $\eta^2$。` },
        ]} />
        <Tx>{R`这是 Fourier 空间中的**波动方程**，带一个由膨胀造成的阻尼项。因此可以预期振荡解。

**求解。**要确定辐射期势的行为，就要在"$\Phi$ 为常数"的初条件下求解 \eqref{8.44}。定义 $u\equiv\Phi\eta$ 就能解析求解，\eqref{8.44} 变为`}</Tx>
        <Eq n="8.45" say={R`$u=\Phi\eta$ 满足 1 阶球 Bessel 方程（变量 $k\eta/\sqrt3$）。`}>{R`u'' + \frac2\eta u' + \left(\frac{k^2}{3}-\frac{2}{\eta^2}\right)u = 0.`}</Eq>
        <Tx>{R`这是 1 阶**球 Bessel 方程**（\eqref{C.13}），解为 $j_1(k\eta/\sqrt3)$（球 Bessel 函数）与 $n_1(k\eta/\sqrt3)$（球 Neumann 函数）。后者在 $\eta\to0$ 时发散，按初条件舍去。1 阶球 Bessel 函数可用三角函数表示（\eqref{C.14}），于是`}</Tx>
        <Eq n="8.46" keyEq title="辐射期的势" say={R`辐射期进入视界的势：早期等于 $\frac23\mathcal R$，$k\eta\gtrsim\sqrt3$ 后以 $\cos(k\eta/\sqrt3)/\eta^2$ 的形式振荡衰减。`}>{R`\Phi(\boldsymbol k,\eta) = 2\left(\frac{\sin x-x\cos x}{x^3}\right)\bigg|_{x=k\eta/\sqrt3}\mathcal R(\boldsymbol k).`}</Eq>
        <Tx>{R`前面的因子 2 是因为括号里的表达式在 $\eta\to0$ 时的极限为 $1/3$，而辐射期视界外 $\Phi$ 与 $\mathcal R$ 的关系是 $\Phi(\eta\to0)=2\mathcal R/3$（\secref{7.5}）。

**解读：声波。**\eqref{8.46} 告诉我们，模式一旦在辐射期进入视界，势就开始**振荡并衰减**（\figref{8.10}），光子–重子流体中的密度扰动也一样。这与本章开头的定性论证一致：压强能对抗引力。物理上，这些振荡是势扰动进入视界时所驱动的**声波**。回忆我们考虑的是单个 Fourier 模式，它对 $\boldsymbol x$ 的依赖为 $e^{i\boldsymbol k\cdot\boldsymbol x}$；所以 \eqref{8.46} 中单个平面波扰动产生的势，在 $k\eta\gg1$ 时大致为`}</Tx>
        <Eq n="8.47" say={R`视界深处的势是一个振幅按 $1/(k\eta)^2$ 衰减的驻波：时间上以声学相位 $k\eta/\sqrt3$ 振荡，空间上是 $\cos(\boldsymbol k\cdot\boldsymbol x)$。`}>{R`\Phi(\boldsymbol x,\eta) \simeq 6\frac{\mathcal R(\boldsymbol k)}{k^2\eta^2}\cos\left(k\eta/\sqrt3\right)\cos(\boldsymbol k\cdot\boldsymbol x).`}</Eq>
        <Tx>{R`这就是**阻尼驻波**的解。（$x\gg1$ 时 $(\sin x-x\cos x)/x^3\to-\cos x/x^2$，所以 $2\mathcal R\cdot(-3\cos x)/(k\eta)^2$；\eqref{8.47} 省略了整体的负号，它只相当于相位移 $\pi$。）

**为什么势会衰减。**压强阻止过密度增长。如果主导成分（此处为辐射）的扰动不增长，膨胀宇宙中的势就会开始衰减。这从 \eqref{8.40} 显而易见：（在视界深处忽略偶极）它表明 $\Phi\sim\Theta_0/\eta^2$。由于 $\Theta_0$ 以固定振幅振荡，势也振荡，但振幅按 $\eta^{-2}$ 下降——这正是 \eqref{8.47} 给出的大 $k\eta$ 极限。

\figref{8.10} 给出势的衰减与振荡，包括解析式 \eqref{8.46} 与计入物质扰动的数值解。我们的近似忽略了暗物质对势的影响，这导致的偏差在大尺度模式上清晰可见：数值解相对解析结果略微偏向正值。\secref{9.1} 会看到，这一偏移来自暗物质的引力效应。\figref{8.10} 的数值解把中微子数设为零；真实宇宙中自由流中微子会使进入视界后的振荡受到额外阻尼。`}</Tx>
        <Figure n="8.10" illustration={<PhiPlot k0={1} />}
          caption={R`原创计算图。把 $k$ 调到 $1$ 或 $10\,\mathrm{Mpc^{-1}}$ 对照原图；青色虚线为 \eqref{8.46}。本页数值解把中微子与光子合为单一紧耦合辐射流体（同样没有中微子自由流阻尼），并含暗物质对势的反作用——可以看到 $k=1$ 时数值解在第一个零点之后同样略偏正值。`} />
        <Tx>{R`**第二步：被驱动的暗物质。**知道了辐射期的势，就可以确定物质扰动的演化——\figref{8.9} 的右半部分。为此把两个物质演化方程 \eqref{8.12}–\eqref{8.13} 化为一个以势为外源的二阶方程。对 \eqref{8.12} 求导，并用 \eqref{8.13} 消去 $u_{\rm c}{}'$：`}</Tx>
        <Eq n="8.48" say={R`对连续性方程求导后代入 Euler 方程：暗物质的“加速度”由哈勃摩擦与势梯度决定。`}>{R`\delta_{\rm c}{}'' + ik\left(-\frac{a'}{a}u_{\rm c}+ik\Phi\right) = -3\Phi''.`}</Eq>
        <Tx>{R`再用 \eqref{8.12} 消去 $u_{\rm c}$（$iku_{\rm c}=-\delta_{\rm c}'-3\Phi'$，辐射期 $a'/a=1/\eta$），得`}</Tx>
        <Eq n="8.49" keyEq title="被驱动的暗物质" say={R`辐射期暗物质的方程：左边是带 $1/\eta$ 哈勃摩擦的“自由”演化，右边是引力势提供的外力；暗物质自身的引力被忽略。`}>{R`\delta_{\rm c}{}'' + \frac1\eta\delta_{\rm c}{}' = S(k,\eta)`}</Eq>
        <Tx>{R`其中源项为`}</Tx>
        <Eq n="8.50" say={R`源项完全由势构成：$k^2\Phi$ 是势梯度的“推力”，另两项来自局域体积变化 $-3\Phi'$ 的时间导数与摩擦。`}>{R`S(k,\eta) = -3\Phi'' + k^2\Phi - \frac3\eta\Phi'.`}</Eq>
        <Tx>{R`**齐次解：常数与对数。**与 \eqref{8.49} 对应的齐次方程（$S=0$）的两个解是 $\delta_{\rm c}=$ 常数与 $\delta_{\rm c}=\ln(a)$（或在辐射期等价地 $\ln(\eta)$）。因此可以预期辐射期 $\delta_{\rm c}$ **对数增长**。

**Green 函数。**一般地，二阶方程的解是两个齐次解与一个特解的线性组合。在没有"灵光一现"猜出特解时，可以用两个齐次解（记为 $s_1$、$s_2$）和源项构造它：它是源项乘以 Green 函数 $[s_1(\eta)s_2(\tilde\eta)-s_1(\tilde\eta)s_2(\eta)]/[s_1'(\tilde\eta)s_2(\tilde\eta)-s_1(\tilde\eta)s_2'(\tilde\eta)]$ 的积分。所以这里`}</Tx>
        <Eq n="8.51" say={R`暗物质密度 = 两个齐次解（常数、$\ln k\eta$）+ 源项对 Green 函数的积分。`}>{R`\delta_{\rm c}(k,\eta) = C_1 + C_2\ln(k\eta) - \int_0^\eta d\tilde\eta\,S(k,\tilde\eta)\tilde\eta\left(\ln[k\tilde\eta]-\ln[k\eta]\right),`}</Eq>
        <Derivation title="Green 函数的具体形式" collapsed steps={[
          { tex: R`s_1=1,\quad s_2=\ln(k\eta),\quad s_1's_2-s_1s_2'=-\frac1{\tilde\eta}`, why: R`两个齐次解及其 Wronski 组合（在 $\tilde\eta$ 处取值）。` },
          { tex: R`G(\eta,\tilde\eta)=\frac{\ln(k\tilde\eta)-\ln(k\eta)}{-1/\tilde\eta}=-\tilde\eta\left(\ln[k\tilde\eta]-\ln[k\eta]\right)`, why: R`代入 Green 函数公式。` },
          { tex: R`\delta_{\rm c}^{\rm part}=\int_0^\eta d\tilde\eta\,G(\eta,\tilde\eta)S(\tilde\eta)`, why: R`检验：$G(\eta,\eta)=0$、$\partial_\eta G|_{\tilde\eta=\eta}=1$，正是方程 $\delta''+\delta'/\eta=S$ 所需的跳跃条件。` },
        ]} />
        <Tx>{R`其中在对数宗量里补上了 $k$，后面会方便。早期积分很小，所以初条件（$\delta_{\rm c}$ 为常数）要求 $\ln(k\eta)$ 的系数 $C_2=0$，且 $C_1=\delta_{\rm c}(k,\eta=0)=\mathcal R$。

**积分的渐近行为。**现在考虑 \eqref{8.51} 中的积分。模式进入视界时源函数随势一起衰减到零，所以积分的主要贡献来自 $k\eta\sim1$ 的时期。$S(\tilde\eta)\ln(k\tilde\eta)$ 的积分因此会趋于某个常数，而 $S(\tilde\eta)\ln(k\eta)$ 的积分给出一个正比于 $\ln(k\eta)$ 的项，比例系数正是一个常数。于是预期模式进入视界之后`}</Tx>
        <Eq n="8.52" keyEq title="辐射期的对数增长" say={R`辐射期进入视界后，暗物质过密度按 $\ln(k\eta)$ 增长：一个常数 $A\mathcal R\ln B$ 加上对数增长模式 $A\mathcal R\ln(k\eta)$。`}>{R`\delta_{\rm c}(k,\eta) = A\mathcal R\ln(Bk\eta),`}</Eq>
        <Tx>{R`即一个常数（$A\mathcal R\ln[B]$）加一个**对数增长模式**（$A\mathcal R\ln[k\eta]$）。

**定出 $A$、$B$。**参照 \eqref{8.51} 的相应部分可以确定 \eqref{8.52} 中的常数 $A$ 与 $B$。常数项 $A\mathcal R\ln(B)$ 等于 $C_1$ 加上 $\ln(\tilde\eta)$ 那部分积分：`}</Tx>
        <Eq n="8.53" say={R`对数解中的常数部分：初值 $\mathcal R$ 减去源项乘 $\tilde\eta\ln(k\tilde\eta)$ 的全积分。`}>{R`A\mathcal R\ln(B) = \mathcal R - \int_0^\infty d\tilde\eta\,S(k,\tilde\eta)\tilde\eta\ln(k\tilde\eta),`}</Eq>
        <Tx>{R`而 $\ln(k\eta)$ 项的系数由剩下的积分给出：`}</Tx>
        <Eq n="8.54" say={R`对数增长的振幅 = 源项乘 $\tilde\eta$ 的全积分：势在进入视界时给暗物质的“一推”。`}>{R`A\mathcal R = \int_0^\infty d\tilde\eta\,S(k,\tilde\eta)\tilde\eta.`}</Eq>
        <Tx>{R`两个积分的上限都取为无穷，因为预期它们在大 $\eta$ 处趋于常数。用源项表达式 \eqref{8.50} 与势的解析近似 \eqref{8.46} 计算这两个积分，得 $A=6.0$、$B=0.62$。Hu & Sugiyama (1996) 引入了这种追踪早期暗物质演化的方法，他们发现用更精确的势（而不是 \eqref{8.46} 的近似）积分，得到略有不同的值：$A=6.4$、$B=0.44$。`}</Tx>
        <Box kind="example" title={R`数值验证 $A=6.0$、$B=0.62$`}>{R`取 $\mathcal R=1$、以 $u=k\tilde\eta$ 为积分变量（$k$ 从结果中消掉）：$\Phi(u)=2(\sin x-x\cos x)/x^3$，$x=u/\sqrt3$；$S=-3\Phi_{uu}+\Phi-3\Phi_u/u$（以 $k^2$ 为单位）。在 $0<u<4000$ 上数值积分得 $\int Su\,du=6.002$、$\int Su\ln u\,du=3.847$，于是 $A=6.00$，$\ln B=(1-3.847)/6.00=-0.474$ ⇒ $B=0.622$，与原书一致。（被积函数在 $u\gg1$ 时按 $\cos(u/\sqrt3)/u$ 振荡衰减，积分收敛。）`}</Box>
        <Tx>{R`**与数值解比较。**\figref{8.11} 给出辐射期 $\delta_{\rm c}$ 的数值解与 \eqref{8.52} 的近似。先不管细节，可以看到物质扰动在辐射期确实**增长**，与辐射（以及重子）分量中衰减、振荡的扰动形成对照。原因是 CDM 没有任何压强对抗引力。由于辐射主导时膨胀更快，增长不如物质期（\secref{8.2} 的常数势意味着 $\delta_{\rm c}\propto a$）那么显著，但它确实存在。`}</Tx>
        <Figure n="8.11" illustration={<DeltaPlot k0={10} />}
          caption={R`原创计算图。默认 $k=10\,\mathrm{Mpc^{-1}}$；对数解按 $|\delta_{\rm c}|/\Phi(0)=\frac32A\ln(Bk\eta)$ 画出（$\mathcal R=\frac32\Phi(0)$）。核对：$k=10\,\mathrm{Mpc^{-1}}$ 在 $a=10^{-5}$ 时数值解 $31.2$，对数解（$A=6.4$、$B=0.44$）$29.2$；$a=10^{-4}$ 时 $66$ 对 $50.5$——此时 $y\approx0.34$，相等前的加速增长（Meszaros 解）已经开始。`} />
        <Tx>{R`对 \figref{8.11} 中的两个模式，扰动在进入视界后确实迅速进入对数增长模式。随着宇宙接近物质主导，膨胀放慢，扰动开始更快增长。你也许担心对 $k=1\,h\,\mathrm{Mpc^{-1}}$ 的模式这个近似用处不大，因为它开始增长后不久宇宙就进入物质主导。幸运的是，我们只用这些解来为视界内时期的增长（下一小节）设定**初条件**，所以近似只需在有限的时间范围内成立。只要匹配时刻选得恰当，对数近似就相当好。`}</Tx>
      </Sub>

      <Sub n="8.3.2" title="Sub-horizon evolution" zh="视界内演化">
        <Tx>{R`**物质最终接管势。**上一小节看到，模式在辐射期进入视界时，辐射压强使引力势衰减。虽然我们没有关注辐射扰动本身（下一章再做），你也许预期压强会压制 $\Theta_{{\rm r},0}$ 的任何增长。这是对的，与刚才看到的对数增长的物质扰动形成鲜明对照。虽然起初势由辐射决定（宇宙由辐射主导），但物质扰动的增长终将**超过**更高的平均辐射密度的作用：即使 $\rho_{\rm c}$ 小于 $\rho_{\rm r}$，$\rho_{\rm c}\delta_{\rm c}$ 最终也会大于 $\rho_{\rm r}\Theta_{{\rm r},0}$。一旦如此，引力势与暗物质扰动就一起演化，而不再理会辐射（\figref{8.12}）。本小节要解物质扰动与势的方程组，再与势衰减时期建立的对数解 \eqref{8.52} 匹配。`}</Tx>
        <Figure n="8.12" illustration={<RegimeDiagram lk0={0} reg0="sub" />}
          caption={R`\secref{8.3.2} 研究的区域：视界深处模式的演化，此时辐射扰动的影响可以忽略。`} />
        <Tx>{R`**以 $y$ 为自变量。**出发点仍是暗物质的方程 \eqref{8.12}–\eqref{8.13} 与引力势的代数方程 \eqref{8.15}。我们要再一次把这三个方程（其中两个是一阶微分方程）化成一个二阶方程。由于要跟随视界内的暗物质扰动穿越相等，再次用 $y$（\eqref{8.20}）——标度因子与其相等时之比——作演化变量会更方便。用 $y$ 表示，三个方程变为`}</Tx>
        <Eq n="8.55" say={R`用 $y$ 写的连续性方程；$aHy=dy/d\eta$ 出现在分母中。`}>{R`\frac{d\delta_{\rm c}}{dy} + \frac{iku_{\rm c}}{aHy} = -3\frac{d\Phi}{dy},`}</Eq>
        <Eq n="8.56" say={R`用 $y$ 写的 Euler 方程：$a'/a\to1/y$ 的哈勃摩擦加上势梯度。`}>{R`\frac{du_{\rm c}}{dy} + \frac{u_{\rm c}}{y} = \frac{ik\Phi}{aHy},`}</Eq>
        <Eq n="8.57" say={R`视界内、忽略辐射扰动的 Poisson 方程：$4\pi Ga^2\rho_{\rm c}=\frac32a^2H^2\frac{y}{y+1}$。`}>{R`k^2\Phi = \frac{3y}{2(y+1)}a^2H^2\delta_{\rm c}.`}</Eq>
        <Tx>{R`**三点说明。**第一，前两个方程中的时间导数换成了对 $y$ 的导数，这使其他项的分母中出现 $y'=aHy$。第二，引力势现在只用 $\delta_{\rm c}$ 表示：按上面的论证辐射扰动是次要的，所以不依赖辐射扰动；又因为扰动深在视界内、$aH/k\ll1$，所以也不依赖 $aHu_{\rm c}/k$。最后，$\delta_{\rm c}$ 源项的系数为 $4\pi G\rho_{\rm c}a^2\to(3/2)a^2H^2y/(y+1)$。这里忽略了重子与暗能量。后者是好的假设，因为我们关心的时期足够早、暗能量的影响可以忽略；前者会造成与正确数值结果的一些差别。

**熟悉的套路。**把 \eqref{8.55} 与 \eqref{8.56} 化成 $\delta_{\rm c}$ 的二阶方程：对第一个关于 $y$ 求导，得`}</Tx>
        <Eq n="8.58" say={R`对连续性方程求导后的形式：左边速度项来自摩擦，右边 $k^2\Phi/(a^2H^2y^2)$ 是被 $(k/aH)^2$ 放大的引力项。`}>{R`\frac{d^2\delta_{\rm c}}{dy^2} - \frac{ik(2+3y)u_{\rm c}}{2aHy^2(1+y)} = -3\frac{d^2\Phi}{dy^2} + \frac{k^2\Phi}{a^2H^2y^2}`}</Eq>
        <Tx>{R`其中用速度方程消去了 $du_{\rm c}/dy$，并用了 $d(1/aHy)/dy=-(1+y)^{-1}(2aHy)^{-1}$（因为 $aHy\propto\sqrt{1+y}$）。右边第一项比第二项小得多（后者乘了 $(k/aH)^2$），可以丢掉。由 \eqref{8.57}，第二项就是 $3\delta_{\rm c}/[2y(y+1)]$。左边的速度用 \eqref{8.55} 改写，但忽略势（视界内势远小于 $\delta_{\rm c}$）：组合 $iku_{\rm c}/(aHy)$ 简单地换成 $-d\delta_{\rm c}/dy$。于是`}</Tx>
        <Eq n="8.59" keyEq title="Meszaros 方程" say={R`视界内、辐射扰动已可忽略时暗物质的增长方程：摩擦项随 $y$ 从 $1/y$ 变为 $\frac3{2y}$，引力项 $\frac{3}{2y(y+1)}$ 在辐射期很弱、物质期变强。`}>{R`\frac{d^2\delta_{\rm c}}{dy^2} + \frac{2+3y}{2y(y+1)}\frac{d\delta_{\rm c}}{dy} - \frac{3}{2y(y+1)}\delta_{\rm c} = 0.`}</Eq>
        <Tx>{R`这就是 **Meszaros 方程**（Meszaros, 1974），描述辐射扰动可以忽略之后视界内冷暗物质扰动的演化。

**增长解。**要理解暗物质扰动的增长，需要求出 Meszaros 方程的两个独立解，再与上一小节建立的对数模式匹配。可以借助物质期深处解的知识：物质期视界内扰动随标度因子增长（\secref{8.5} 中证明），所以 \eqref{8.59} 的一个解是 $y$ 的一次多项式。因此至少对一个模式 $d^2\delta_{\rm c}/dy^2=0$。这个**增长模式**满足 $\delta'_{{\rm c},+}/\delta_{{\rm c},+}=3/(2+3y)$，解为 $\delta_{{\rm c},+}\propto y+2/3$，即`}</Tx>
        <Eq n="8.60" keyEq title="Meszaros 增长解" say={R`Meszaros 方程的增长解：相等之前几乎不变，相等之后 $\propto a$。`}>{R`D_+(a) = a + \frac{2a_{\rm eq}}{3}.`}</Eq>
        <Tx>{R`这样归一化后，它描述与尺度无关的增长，且 $a\gg a_{\rm eq}$ 时 $D_+\to a$。因此把它认同为 \secref{8.1} 引入的**增长因子** $D_+$。但注意，本节假设只有物质是重要的，忽略了曲率与暗能量，所以这个增长因子的表达式只在 $a\lesssim0.1$ 时成立。推广到更晚时期见 \secref{8.5}。

**衰减解。**为求第二个解，注意 Meszaros 方程表明 $u\equiv\delta_{\rm c}/(y+2/3)$ 满足`}</Tx>
        <Eq n="8.61" say={R`代换 $u=\delta_{\rm c}/(y+2/3)$ 后不含 $u$ 本身的项（因为 $y+2/3$ 已是一个解），可降阶。`}>{R`(1+3y/2)\frac{d^2u}{dy^2} + \frac{(21/4)y^2+6y+1}{y(y+1)}\frac{du}{dy} = 0.`}</Eq>
        <Tx>{R`由于没有正比于 $u$ 的项，\eqref{8.61} 实际上是 $du/dy$ 的一阶方程。积分一次得 $du/dy$，再积分一次就得到第二个 Meszaros 解。第一次积分给出`}</Tx>
        <Eq n="8.62" say={R`第一次积分：$du/dy$ 是三个幂次的乘积。`}>{R`\frac{du}{dy} \propto (y+2/3)^{-2}y^{-1}(y+1)^{-1/2}.`}</Eq>
        <Tx>{R`（检验：$\frac{d}{dy}\ln\frac{du}{dy}=-\frac{2}{y+2/3}-\frac1y-\frac1{2(y+1)}=-\frac{(7/2)y^2+4y+2/3}{y(y+1)(y+2/3)}$，恰与 \eqref{8.61} 一致。）再积分一次得到第二个 Meszaros 解`}</Tx>
        <Eq n="8.63" keyEq title="Meszaros 衰减解" say={R`第二个解：早期 $\propto\ln y$（对应辐射期的对数增长），晚期 $\propto y^{-3/2}$ 衰减。`}>{R`D_-(y) = (y+2/3)\ln\left[\frac{\sqrt{1+y}+1}{\sqrt{1+y}-1}\right] - 2\sqrt{1+y}.`}</Eq>
        <Tx>{R`早期（$y\ll1$）$D_+=$ 常数，而 $D_-\propto\ln y$。晚期（$y\gg1$）增长解 $D_+$ 按 $y$ 标度，衰减模 $D_-$ 按 $y^{-3/2}$ 下降（数值上 $D_-\to\frac{8}{45}y^{-3/2}$）。

**通解与匹配。**Meszaros 方程的通解为`}</Tx>
        <Eq n="8.64" say={R`视界深处暗物质过密度是增长解与衰减解的线性组合，系数由与早期对数解的匹配决定。`}>{R`\delta_{\rm c}(k,y) = C_1D_+(y) + C_2D_-(y)\qquad(y\gg y_H)`}</Eq>
        <Tx>{R`其中 $y_H\equiv a_H/a_{\rm eq}$ 是模式进入视界时的标度因子除以相等时的标度因子（\exref{8.6}）。（这里 $D_+(y)$ 应理解为 $y+2/3$，即 \eqref{8.60} 除以 $a_{\rm eq}$。）为定出常数 $C_1$、$C_2$，可以与 \eqref{8.52} 的对数解匹配。那个解在视界内、相等之前成立：$y_H\ll y\ll1$。所以只有对**在相等之前进入视界**的模式，才能期望得到暗物质扰动演化的合理近似。对这些模式，让两个解及其一阶导数相等：`}</Tx>
        <Eq n="8.65" keyEq title="匹配条件" say={R`在匹配时刻 $y_m$ 让对数解与 Meszaros 解的函数值和导数分别相等，从而定出 $C_1$、$C_2$。`}>{R`\begin{aligned}A\mathcal R\ln(By_m/y_H) &= C_1D_+(y_m) + C_2D_-(y_m),\\ \frac{A\mathcal R}{y_m} &= C_1D'_+(y_m) + C_2D'_-(y_m),\end{aligned}`}</Eq>
        <Tx>{R`其中匹配时刻 $y_m$ 必须满足 $y_H\ll y_m\ll1$。注意我们把 \eqref{8.52} 中对数的宗量 $k\eta$ 换成了 $y/y_H$——只要匹配时刻深在辐射期就成立（辐射期 $k\eta=k/aH=a/a_H$）。

\figref{8.13} 给出两个模式的演化，以及用 \eqref{8.65} 的匹配条件定系数的 Meszaros 方程解析解。$a>a_{\rm eq}$ 时的偏离来自这里忽略的**重子**。相等之后，重子对引力势的贡献不可忽略，但由于直到复合前都与光子耦合，它们的成团弱于暗物质。由于计算中假设全部物质都是 CDM，解析解**高估**了 CDM 分量的增长。`}</Tx>
        <Figure n="8.13" illustration={<DeltaPlot k0={1} />}
          caption={R`原创计算图。本页数值解同样不含重子，所以紫色点线（Meszaros 匹配解）与橙色数值解在相等之后仍紧贴——这正说明原图中的偏离来自重子。核对：$k=1\,\mathrm{Mpc^{-1}}$ 在 $a=10^{-3}$ 时数值 $162.5$、匹配解 $157.2$；$k=10\,\mathrm{Mpc^{-1}}$ 时 $289.4$ 对 $288.4$。`} />
      </Sub>
    </Sec>);
}
