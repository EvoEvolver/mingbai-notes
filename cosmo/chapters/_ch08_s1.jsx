// §8.1 Prelude —— 式 (8.1)–(8.15)，图 8.1–8.4
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { PhiPlot, DeltaPlot, PowerPlot, RegimeDiagram } from "./_ch08_plots.jsx";

const R = String.raw;

export function Sec81() {
  return (
    <Sec n="8.1" title="Prelude" zh="序曲：三个阶段与要解的方程"
      gist={R`先"作弊"看数值解：每个模式都经历视界外 → 进入视界并穿越物质–辐射相等 → 晚期一致演化三个阶段。据此把势分解为 $\frac35\mathcal R\,T(k)\,D_+(a)/a$，得到线性功率谱 \eqref{8.8}；然后把第 5–6 章的方程截断成 5 个变量的方程组 \eqref{8.10}–\eqref{8.15}。`}
      why={R`结构增长由三股力量角力：引力（聚集）、膨胀（拉开）、压强（抵抗）。先建立全局图景与记号，后面各节的解析近似才知道各自负责哪一块。`}
      gives={["8.1", "8.2", "8.3", "8.4", "8.6", "8.7", "8.8", "8.9", "8.10", "8.11", "8.12", "8.13", "8.14", "8.15"]}>
      <p className="muted">本节概念：<C id="three_stages" /> · <C id="transfer" /> · <C id="growth" /> · <C id="pk" /> · <C id="horizon" /></p>
      <Tx>{R`**引力不稳定性。**宇宙中的结构从根本上来自引力不稳定性：随着时间推移，物质在起初略微过密的区域中不断堆积。尽管初始过密度的幅度非常小（约 $10^{-4}$ 量级），在宇宙年龄的时间里，终究堆积了足够的物质，形成今天看到的显著结构。

**两种反作用。**除了引力的吸引，还有两种相抗衡的效应。第一是**背景膨胀**，它倾向于把所有种类的粒子拉开：膨胀越快，结构增长越慢。在不膨胀的空间中，一个小过密区在引力下会**指数**增长（若没有压强扰动）；在膨胀宇宙里，这种指数增长被减缓为时间的**幂律**甚至**对数**增长。我们将看到：辐射主导期的结构增长比之后的物质主导期慢，而当暗能量开始主导时又再次放缓。

第二种效应是重子与光子特有的：它们有**压强**。压强随密度增加而增加，气体倾向于向压强低的方向（压强梯度的反方向）运动。因此重子中的过密区不会像暗物质中的那样迅速吸积物质——比周围更高的压强会减慢甚至阻止气体流入。

本章既处理**视界外**（$k\eta\ll1$）的引力增长，也处理更熟悉的**视界内**（$k\eta\gg1$）情形，并分别考虑辐射扰动存在与否。推导时请时刻记住这场三方角力：**引力、膨胀、压强扰动**。`}</Tx>

      <Sub n="8.1.1" title="Three stages of evolution" zh="演化的三个阶段">
        <Tx>{R`**先看答案。**宇宙学扰动的演化天然分为三个阶段。为了看清这一点，我们不妨"作弊"，先看几个不同模式的数值解。\figref{8.1} 给出长、中、短三种波长模式的引力势随标度因子的变化。

- **早期**：所有模式都在视界外（$k\eta\ll1$；回忆暴胀之后 $\eta>0$），势是常数。
- **中间阶段**：同时发生两件事——波长**进入视界**，宇宙从辐射主导（$a\ll a_{\rm eq}$）过渡到物质主导（$a\gg a_{\rm eq}$）。\figref{8.1} 表明，这两个时刻（$a_{\rm eq}$ 与进入视界的时刻）的**先后顺序**极大地影响势：在 $a_{\rm eq}$ 之后很久才进入视界的大尺度模式，与在相等之前就进入视界的小尺度模式演化得很不一样。
- **晚期**：所有模式再次以**相同方式**演化——物质主导期保持不变，暗能量变得重要后一起衰减。`}</Tx>
        <Figure n="8.1" interactive={<PhiPlot k0={0.03} />}
          caption={R`基准 $\Lambda$CDM 宇宙学中不同波数模式引力势 $\Phi$ 的线性演化，各自以早期的势归一化。**交互版**：在浏览器中用自适应 RK45 数值求解 \eqref{8.10}–\eqref{8.15} 的五方程组（$\Psi=-\Phi$、无重子、光子与中微子合成单一辐射流体、背景含 $\Lambda$），初条件取第 7 章的绝热初条件。细线为原书四个模式 $k=0.001,0.01,0.1,2\,\mathrm{Mpc^{-1}}$，粗橙线为滑块所选模式；紫色点线为视界外解析解 \eqref{8.31}，青色虚线为辐射期解析解 \eqref{8.46}。核对：$k=0.001$ 的势在 $a=0.1$ 时为 $0.889$（理论 $0.9$；原书 CLASS 曲线约 $0.85$，差别来自被忽略的中微子各向异性应力，见 \secref{8.4}），$a=1$ 时降为 $0.70$（暗能量）；$k=2\,\mathrm{Mpc^{-1}}$ 降到 $10^{-3}$ 量级，与原图一致。`} />
        <Tx>{R`**分解式。**我们能观测到的物质分布主要来自晚期，即所有模式一致演化的第三阶段。若想把这一时期的势与暴胀产生的**原初曲率扰动** $\mathcal R$ 联系起来，可以示意地写成`}</Tx>
        <Eq n="8.1" title="势的三段分解（示意）" say={R`今天的引力势 = $\frac35\times$ 原初曲率扰动 $\times$ 一个只依赖尺度的“转移函数” $\times$ 一个只依赖时间的“增长因子”：早期物理与晚期物理被干净地分开。`}>{R`\Phi(\boldsymbol k,a) = \frac35\mathcal R(\boldsymbol k)\times\Big\{\text{Transfer Function}(k)\Big\}\times\Big\{\text{Growth factor}(a)\Big\}.`}</Eq>
        <Tx>{R`$3/5$ 这个因子稍后就会弄明白。**转移函数**描述扰动穿越"进入视界"与"辐射/物质转变"这两个时期的演化；**增长因子**描述晚期与波长无关的增长。这个示意式确实就是增长因子与转移函数的定义方式，只是要向惯例"鞠两个躬"。

**第一个约定：转移函数的归一化。**由 \figref{8.1} 可见，即使波长最长的扰动，在穿越相等时期时也会略有下降。惯例上把这一下降去掉，使大尺度上转移函数等于 1。因此转移函数定义为`}</Tx>
        <Eq n="8.2" keyEq title="转移函数的定义" say={R`转移函数 = 晚期的势除以“大尺度解”（原初势乘以 $9/10$）：大尺度上它等于 1，只记录与尺度有关的那部分压低。`}>{R`T(k) \equiv \frac{\Phi(\boldsymbol k,a_{\rm late})}{\Phi_{\text{large-scale}}(\boldsymbol k,a_{\rm late})}`}</Eq>
        <Tx>{R`其中 $a_{\rm late}$ 指物质主导深处的某个时刻，而**大尺度**解是原初的 $\Phi$ 减小一点点之后的值；严格说，它是在物质主导期很晚才进入视界的模式的势。我们将在 \secref{8.2} 中推出——忽略各向异性应力时——这个因子等于 $9/10$。

**第二个约定：增长因子。**势与它在"转移函数阶段刚刚结束"时的值之比定义为`}</Tx>
        <Eq n="8.3" keyEq title="增长因子的定义" say={R`晚期势相对于 $a_{\rm late}$ 时的变化记为 $D_+(a)/a$；物质主导时势不变，所以 $D_+=a$。`}>{R`\frac{\Phi(\boldsymbol k,a)}{\Phi(\boldsymbol k,a_{\rm late})} \equiv \frac{D_+(a)}{a}\qquad(a>a_{\rm late}),`}</Eq>
        <Tx>{R`$D_+$ 称为**增长因子**（growth factor）。物质主导期势为常数，所以 $D_+(a)=a$。有了这两个约定，`}</Tx>
        <Eq n="8.4" keyEq title="势的分解" say={R`晚期任一时刻、任一尺度的势 $=\frac35\mathcal R\times T(k)\times D_+/a$。`}>{R`\Phi(\boldsymbol k,a) = \frac35\mathcal R(\boldsymbol k)T(k)\frac{D_+(a)}{a}\qquad(a>a_{\rm late}).`}</Eq>
        <Tx>{R`**为什么叫"增长"因子？**冷暗物质过密度的演化由 $\Phi$ 的演化决定，\figref{8.2} 给出四个模式的结果。注意晚期——势为常数且所有模式都在视界内时——过密度随时间**增长**：$\delta_{\rm c}(\boldsymbol k,a)\propto D_+(a)$。这就解释了上面看似古怪的命名（势不变，为什么叫增长因子？）：$D_+$ 描述的是晚期**物质扰动**的增长。这与直觉完全一致：随着时间推移，过密区吸引越来越多的物质，从而变得更加过密。`}</Tx>
        <Figure n="8.2" interactive={<DeltaPlot k0={2} />}
          caption={R`基准 $\Lambda$CDM 宇宙学中暗物质密度扰动的演化，与图 8.1 一样以早期势归一化。各模式的振幅在进入视界时开始增长；$a_{\rm eq}$ 之后很久，所有视界内模式以相同方式演化，按增长因子 $D_+(a)$ 标度。物质主导期、$\Lambda$ 变得重要之前 $D_+(a)=a$；最晚期可以看到加速膨胀带来的轻微压低。**交互版**：同一五方程组数值解（细线为原书四个模式），叠加对数解 \eqref{8.52} 与 Meszaros 匹配解 \eqref{8.64}–\eqref{8.65}（$y_m=3y_H$，常数 $A$、$B$ 可调）。核对：$k=0.001$ 在 $a=1$ 时 $|\delta_{\rm c}|/\Phi(0)=32$、$k=0.01$ 时 $2.1\times10^3$，与原图一致；$k\ge0.1$ 的数值解比原图（CLASS，含重子）高约 1.5–2 倍，这正是 \secref{8.6.1} 讨论的重子压低——这里把全部物质都当作冷暗物质。`} />
        <Tx>{R`**从势到密度。**晚期宇宙中重子紧跟暗物质，所以通常把二者一起用**总物质过密度** $\delta_{\rm m}$ 描述。下面用原初功率谱、转移函数与增长因子来表示物质分布的功率谱。把晚期的物质过密度与势联系起来，最简单的办法是在大 $k$、无辐射极限下使用 Poisson 方程 \eqref{6.80}：`}</Tx>
        <Eq n="8.5" title="Poisson 方程（晚期、视界内）" say={R`视界内、辐射可忽略时，$k^2\Phi=4\pi Ga^2\rho_{\rm m}\delta_{\rm m}$——就是牛顿 Poisson 方程在共动 Fourier 空间中的写法。`}>{R`k^2\Phi(\boldsymbol k,a) = 4\pi G\rho_{\rm m}(a)a^2\delta_{\rm m}(\boldsymbol k,a)\qquad(a>a_{\rm late},\ k\gg aH).`}</Eq>
        <Tx>{R`当 $k$ 与 $aH$ 同量级或更小时这个方程不再正确。对大尺度结构的应用来说这不是大问题，因为最精确的测量都来自满足 $k\gg aH$ 的模式。（另外，若右边的 $\delta_{\rm m}$ 定义在**同步–共动规范**中，\eqref{8.5} 在所有尺度上都成立，见 \exref{5.1}；在许多情况下，这个规范中的密度与观测量和数值模拟的联系比共形牛顿规范中的 $\delta_{\rm m}$ 更直接。）

背景物质密度（含重子）为 $\rho_{\rm m}=\Omega_{\rm m}\rho_{\rm cr}/a^3$，且 $4\pi G\rho_{\rm cr}=(3/2)H_0^2$，于是`}</Tx>
        <Eq n="8.6" say={R`$\delta_{\rm m}\propto k^2a\Phi$：势不变时密度对比仍随 $a$ 线性增长；固定势时 $\delta_{\rm m}\propto1/\Omega_{\rm m}$。`}>{R`\delta_{\rm m}(\boldsymbol k,a) = \frac{2k^2a}{3\Omega_{\rm m}H_0^2}\Phi(\boldsymbol k,a)\qquad(a>a_{\rm late},\ k\gg aH).`}</Eq>
        <Tx>{R`它与 \eqref{8.4} 一起，把晚期宇宙的过密度与原初扰动联系起来：`}</Tx>
        <Eq n="8.7" keyEq title="晚期物质过密度" say={R`晚期物质过密度 $=\frac25\frac{k^2}{\Omega_{\rm m}H_0^2}\mathcal R\,T(k)D_+(a)$：$k^2$ 来自 Poisson 方程，$T(k)$ 来自早期，$D_+(a)$ 来自晚期。`}>{R`\delta_{\rm m}(\boldsymbol k,a) = \frac25\frac{k^2}{\Omega_{\rm m}H_0^2}\mathcal R(\boldsymbol k)T(k)D_+(a)\qquad(a>a_{\rm late},\ k\gg aH).`}</Eq>
        <Tx>{R`\eqref{8.7} 与初始扰动 $\mathcal R$ 的产生方式无关，只要它是**绝热**扰动。在暴胀的框架下，上一章看到 $\mathcal R(\boldsymbol k)$ 取自均值为零的 Gauss 分布，功率谱为 $P_{\mathcal R}(k)=(2\pi^2/k^3)\mathcal A_s(k/k_{\rm p})^{n_s-1}$（\eqref{7.99}）。于是晚期物质的**线性功率谱**为`}</Tx>
        <Eq n="8.8" keyEq title="线性物质功率谱" say={R`线性功率谱 $\propto\mathcal A_s\Omega_{\rm m}^{-2}D_+^2T^2k^{n_s}$：大尺度 $T=1$ 时 $P\propto k^{n_s}$，小尺度被 $T^2$ 压低而转折下降。`}>{R`P_{\rm L}(k,a) = \frac{8\pi^2}{25}\frac{\mathcal A_s}{\Omega_{\rm m}^2}D_+^2(a)T^2(k)\frac{k^{n_s}}{H_0^4k_{\rm p}^{n_s-1}}.`}</Eq>
        <Derivation title={R`由 \eqref{8.7} 推出 \eqref{8.8}`} collapsed steps={[
          { tex: R`\langle\delta_{\rm m}(\boldsymbol k)\delta^*_{\rm m}(\boldsymbol k')\rangle=\left[\frac25\frac{k^2}{\Omega_{\rm m}H_0^2}T(k)D_+\right]^2\langle\mathcal R(\boldsymbol k)\mathcal R^*(\boldsymbol k')\rangle`, why: R`\eqref{8.7} 对 $\mathcal R$ 是线性的，系数只依赖 $k=|\boldsymbol k|$。` },
          { tex: R`P_{\rm L}(k)=\frac{4}{25}\frac{k^4}{\Omega_{\rm m}^2H_0^4}T^2D_+^2\,P_{\mathcal R}(k)`, why: R`两边都写成 $(2\pi)^3\delta_{\rm D}(\boldsymbol k-\boldsymbol k')\times$ 功率谱。` },
          { tex: R`=\frac{4}{25}\frac{k^4}{\Omega_{\rm m}^2H_0^4}T^2D_+^2\cdot\frac{2\pi^2}{k^3}\mathcal A_s\left(\frac{k}{k_{\rm p}}\right)^{n_s-1}=\frac{8\pi^2}{25}\frac{\mathcal A_s}{\Omega_{\rm m}^2}D_+^2T^2\frac{k^{n_s}}{H_0^4k_{\rm p}^{n_s-1}}`, why: R`代入 \eqref{7.99}，$k^4\cdot k^{-3}\cdot k^{n_s-1}=k^{n_s}$。` },
        ]} />
        <Tx>{R`注意：(i) 功率谱的量纲是（长度）$^3$；(ii) \eqref{8.8} 表明在 $T(k)=1$ 的大尺度上 $P_{\rm L}(k)\propto k^{n_s}$。

**转折。**\figref{8.3} 给出基准 $\Lambda$CDM 宇宙学今天和更高红移的物质功率谱。大尺度上行为符合预期；小尺度上功率谱**转折**下降。要理解这一点，回看 \figref{8.1}：其中的小尺度模式（原书正文写作 $k=2h\,\mathrm{Mpc^{-1}}$，图中标注为 $2\,\mathrm{Mpc^{-1}}$）在物质/辐射相等之前很久就进入视界。辐射期势会衰减，所以转移函数远小于 1。这对物质扰动的影响见 \figref{8.2}：模式进入视界后，$\delta$ 的增长从 $a\simeq10^{-5}$ 起被拖慢，直到 $a\simeq10^{-4}$ 宇宙变为物质主导才结束。越早进入视界的模式被压低得越多，所以小尺度上功率谱是 $k$ 的减函数。由此可知功率谱将在**相等时进入视界**的尺度 $k_{\rm eq}$ 处转折；测量这个尺度，就能约束宇宙中物质的总量。`}</Tx>
        <Figure n="8.3" interactive={<PowerPlot />}
          caption={R`基准 $\Lambda$CDM 宇宙学在不同红移的线性物质功率谱。竖线标出各红移的 $k_{\rm NL}(z)$，其左侧的尺度在该红移仍近似线性演化。**交互版**：按 \eqref{8.8} 计算，转移函数用 Eisenstein & Hu (1998) 拟合公式（含重子与 BAO；本书不讲此公式，这里只作为对 CLASS 的快速替代），$D_+$ 由 \eqref{8.75} 数值解得到，$\mathcal A_s$、$k_{\rm p}$、$h$ 取附录 B 基准值，平直 $\Omega_\Lambda=1-\Omega_{\rm m}$。图例给出由 \eqref{8.9} 解 $\Delta^2_{\rm L}(k_{\rm NL})=1$ 得到的 $k_{\rm NL}(z)$ 与（\exref{8.13} 的）$\sigma_8$。核对：基准参数下峰位 $k\approx0.017\,h\,\mathrm{Mpc^{-1}}$、峰值 $\approx2.5\times10^4\,(h^{-1}\mathrm{Mpc})^3$；$k_{\rm NL}=0.24,\ 0.40,\ 0.69,\ 2.0\,h\,\mathrm{Mpc^{-1}}$（$z=0,0.5,1,2$；原图约 $0.28,0.45,0.76,2.1$）；$\sigma_8=0.83$（原书 $0.811$，差别主要来自本图忽略的中微子质量）。`} />
        <Tx>{R`**非线性尺度。**另一个需要记住的尺度是 $k_{\rm NL}$：大于它的波数上非线性不能忽略。为了估计它，我们用以 $k$ 为中心、对数宽度 $d\ln k$ 的区间内的模式所产生的（线性）密度扰动方差 $\Delta^2_{\rm L}(k)$：`}</Tx>
        <Eq n="8.9" keyEq title="无量纲功率谱" say={R`$\Delta^2_{\rm L}$ 是“每个对数波数区间贡献的密度方差” $k^3P/2\pi^2$；它约等于 1 的地方扰动已不再是小量。`}>{R`\begin{aligned}\Delta^2_{\rm L}(k,a) &= \frac1\epsilon\int_{|\ln k'-\ln k|<\epsilon}\frac{d^3k'}{(2\pi)^3}P_{\rm L}(k',a) = \int_{|\ln k'-\ln k|<\epsilon}k'^3\frac{dk'}{k'}\int\frac{d\sym{ch08-solid}{\Omega}'}{(2\pi)^3}P_{\rm L}(k',a)\\ &= \frac{k^3P_{\rm L}(k,a)}{2\pi^2},\end{aligned}`}</Eq>
        <Box kind="warning" title={R`\eqref{8.9} 中的归一化因子`}>{R`条件 $|\ln k'-\ln k|<\epsilon$ 给出的对数区间宽度是 $2\epsilon$，所以第一项的前因子应为 $1/(2\epsilon)$ 才能得到最后的 $k^3P_{\rm L}/2\pi^2$；中间一项则漏写了前因子。按"单位 $\ln k$ 的方差"理解：$\sigma^2=\int d\ln k\,\Delta^2_{\rm L}(k)$，\eqref{8.9} 的最终结果 $\Delta^2_{\rm L}=k^3P_{\rm L}/2\pi^2$ 是正确的（\eqref{A.112} 也给出同样的结论：$\sigma_R^2=\int d\ln k\,\Delta^2_{\rm L}|W_R|^2$）。`}</Box>
        <Tx>{R`这里对 $d\Omega'$ 的积分给出 $4\pi$；第二行用到了区间为无穷小这一事实。$\Delta^2_{\rm L}\ll1$ 对应小的非均匀性，$\Delta^2_{\rm L}\gtrsim1$ 则表示非线性扰动。把 $\Delta^2_{\rm L}(k)$ 对 $\ln k$ 作图，就能直接看出预期在哪些尺度上有显著的密度涨落（图 12.1 给出类似的密度场方差图）。解 $\Delta^2_{\rm L}(k_{\rm NL},a)\simeq1$ 得今天 $k_{\rm NL}(a=1)\simeq0.25\,h\,\mathrm{Mpc^{-1}}$。更早时结构演化得不充分，非线性尺度更小，即 $k_{\rm NL}(a)$ 在过去更大（\figref{8.3} 中的竖线）。\figref{8.3} 画的是**线性**功率谱；在接近 $k_{\rm NL}$ 的尺度上，它只是一个假想量，不能直接与物质分布比较。第 12 章将回到这个问题。`}</Tx>
      </Sub>

      <Sub n="8.1.2" title="Closing the Boltzmann hierarchy" zh="截断 Boltzmann 层级">
        <Tx>{R`**需要哪些方程？**暗物质过密度满足什么演化方程？既然所有成分都通过引力耦合，原则上就是第 5 章的整套 Boltzmann 方程加上第 6 章的两个 Einstein 方程。但要定性地理解，并不需要全套方程。

**光子只需单极与偶极。**回忆早期（复合 $a=a_*$ 之前），光子分布只需两个矩就能刻画：单极 $\Theta_0$ 与偶极 $\Theta_1$。其他矩都被压低，因为光子与电子/质子等离子体**紧耦合**。退耦后不再如此，要完整描述光子分布就得跟踪更高阶矩。但就**物质分布**而言，$a_*$ 之后光子在做什么无关紧要：那时已深入物质期，势由暗物质自己主导。总之，考虑物质分布的演化时，可以忽略除单极和偶极之外的所有光子矩。

**中微子也只保留单极与偶极。**下面我们也忽略中微子的高阶多极矩，因为它们难以解析处理。不过中微子是自由流动而非紧耦合的，所以这同样不准确；但忽略高阶中微子矩仍比完全忽略中微子准确。于是我们使用**总辐射**的单极 $\Theta_{{\rm r},0}$ 与偶极 $\Theta_{{\rm r},1}$（\eqref{6.79} 定义），不要与光子分布的 $\Theta_0$、$\Theta_1$ 混淆。忽略高阶辐射矩后，中微子与光子的 Boltzmann 方程变得完全相同；而且二者从同样的绝热初条件出发，所以可以合并。再补上暗物质的方程，就得到想要的方程组（基于 \secref{5.7}）：`}</Tx>
        <Eq n="8.10" keyEq title="辐射单极" say={R`辐射密度扰动的变化：偶极（流动）把能量搬走，局域膨胀率的扰动 $-\Phi'$ 改变温度。`}>{R`\Theta'_{{\rm r},0} + k\Theta_{{\rm r},1} = -\Phi',`}</Eq>
        <Eq n="8.11" title="辐射偶极" say={R`辐射速度的变化：压强梯度 $k\Theta_{{\rm r},0}/3$ 推动流动、引力 $-k\Phi/3$ 拉回；$1/3$ 是辐射声速的平方。`}>{R`\Theta'_{{\rm r},1} - \frac k3\Theta_{{\rm r},0} = -\frac k3\Phi,`}</Eq>
        <Eq n="8.12" keyEq title="CDM 连续性方程" say={R`暗物质过密度的变化 = 速度场的汇聚 $-iku_{\rm c}$ + 局域体积变化 $-3\Phi'$。`}>{R`\delta_{\rm c}{}' + iku_{\rm c} = -3\Phi',`}</Eq>
        <Eq n="8.13" keyEq title="CDM Euler 方程" say={R`暗物质速度：哈勃摩擦 $-\frac{a'}au_{\rm c}$ 使之衰减，势梯度 $ik\Phi$ 使之加速。`}>{R`u_{\rm c}{}' + \frac{a'}{a}u_{\rm c} = ik\Phi.`}</Eq>
        <Tx>{R`即使假设只保留单极与偶极，从 \eqref{5.67} 得到 \eqref{8.10}–\eqref{8.11} 也要费些功夫。特别是我们用了**紧耦合近似**，从而消去重子扰动。这是相当好的近似，因为早期重子通过与光子的紧耦合而保持接近均匀（重子的效应在 \secref{8.6} 讨论）。\exref{8.1} 中可以详细推导。注意，这些简化只因为本章只关心 CDM 扰动；下一章会研究完整的光子演化方程。`}</Tx>
        <Box kind="note" title="把复数变成实数">{R`在 Fourier 空间中暗物质速度 $u_{\rm c}$ 是**纯虚数**（初条件 \eqref{7.95}：$iu_{\rm c}=3\Theta_1=-k\Phi/(2aH)$），所以数值求解时用实变量 $U\equiv iu_{\rm c}$ 更方便：\eqref{8.12} 变为 $\delta_{\rm c}'+kU=-3\Phi'$，\eqref{8.13} 变为 $U'+\frac{a'}aU=-k\Phi$。偶极 $\Theta_{{\rm r},1}$ 则本身是实的（$\Theta_1$ 的定义已吸收了因子 $i$，见 \eqref{5.66}）。`}</Box>
        <Tx>{R`**再要一个引力方程。**为封闭暗物质密度的方程组，还需要一个关于引力势 $\Phi$ 的方程。你也许注意到，从 \eqref{8.10} 起我们令 $\Psi\to-\Phi$，这在没有四极矩的极限下成立（\eqref{6.48}）。由于部分 Einstein 方程是冗余的，有多种选择把 $\Phi$ 与辐射和物质的过密度联系起来。可以用时–时分量 \eqref{6.41}：`}</Tx>
        <Eq n="8.14" keyEq title="Einstein 方程（00 分量）" say={R`00 分量 Einstein 方程：$k^2\Phi$ 加上与膨胀有关的项，由暗物质与辐射的密度扰动提供源；辐射能量密度扰动是 $4\rho_{\rm r}\Theta_{{\rm r},0}$。`}>{R`k^2\Phi + 3\frac{a'}{a}\left(\Phi'+\frac{a'}{a}\Phi\right) = 4\pi Ga^2\left[\rho_{\rm c}\delta_{\rm c}+4\rho_{\rm r}\Theta_{{\rm r},0}\right].`}</Eq>
        <Tx>{R`这里同样令 $\Psi=-\Phi$，按上面的论证忽略重子，并把中微子与光子对势的贡献合并。另一选择是用不含时间导数的**代数**方程 \eqref{6.80}：`}</Tx>
        <Eq n="8.15" keyEq title="Einstein 方程（代数形式）" say={R`代数形式的 Einstein 方程：势由“共动”密度扰动（密度 $+\frac{3aH}{k}\times$ 速度）决定，没有时间导数；$k\gg aH$ 时退化为 Poisson 方程。`}>{R`k^2\Phi = 4\pi Ga^2\left[\rho_{\rm c}\delta_{\rm c}+4\rho_{\rm r}\Theta_{{\rm r},0}+\frac{3aH}{k}\left(i\rho_{\rm c}u_{\rm c}+4\rho_{\rm r}\Theta_{{\rm r},1}\right)\right].`}</Eq>
        <Tx>{R`两个方程在不同时候都有用，但要封闭五个变量 $\delta_{\rm c}$、$u_{\rm c}$、$\Theta_{{\rm r},0}$、$\Theta_{{\rm r},1}$、$\Phi$ 的方程组，只需其中一个。

**数值解很容易。**此时最直接的做法是数值求解这五个耦合方程（\exref{8.2}）。若用 \eqref{8.14}，没有数值困难，只需很少的工作，就能写出一个在一秒内算出（无重子时）转移函数的程序。`}</Tx>
        <Box kind="aside" title="本页交互图用的数值方案">{R`\figref{8.1}、\figref{8.2} 的交互版正是这个"一秒程序"。细节：以 $\ln a$ 为自变量、自适应 RK45 积分。$k\eta<1$ 时用 \eqref{8.14} 演化 $\Phi$；之后改用代数式 \eqref{8.15} 给出 $\Phi$，而 $\Phi'$ 由 \eqref{8.14} 减 \eqref{8.15} 得到的 0i 分量 $\Phi'+\frac{a'}a\Phi=-\frac{4\pi Ga^2}{k}(i\rho_{\rm c}u_{\rm c}+4\rho_{\rm r}\Theta_{{\rm r},1})$ 给出——这样避免了 \eqref{8.14} 在 $k\eta\gg1$ 时的刚性。当 $k\eta>200$ 且 $a>10a_{\rm eq}$ 时按 \exref{8.2} 的建议停止跟踪辐射矩。注意早期反过来：代数式 \eqref{8.15} 在 $k\eta\ll1$ 时是两个几乎相消的大数之差，所以早期必须用 \eqref{8.14}。`}</Box>
        <Tx>{R`**解析解更难。**暗物质密度的解析解则不那么容易得到：不存在对所有尺度、所有时刻都成立的解析解。为取得进展，我们必须取一些极限，把五个方程化成更容易处理的两三个。代价是这些极限只对特定尺度、特定时刻成立，所以得把各段解析解拼起来，才能得到对所有 $k$ 都合理的转移函数。如前所述，几秒内算出极精确转移函数的程序可以免费获得、易于使用。因此本章的目标不是得到精确的数值结果，而是理解不同区域中相关的物理，看看这些理解能在多大程度上重现数值结果。

**路线图：图 8.4。**作为 \secref{8.2}–\secref{8.3} 解析工作的向导，请看 \figref{8.4}。实线是共动视界（即共形时间 $\eta$），随时间增长；原书说它在相等时约为 $110\,h^{-1}\mathrm{Mpc}$（按基准宇宙学计算 $\eta_{\rm eq}=112\,\mathrm{Mpc}\approx76\,h^{-1}\mathrm{Mpc}$，见下方易错点）。给定的共动尺度不随时间变化（图中的水平线）。有几个区域可以借助物理近似取得进展：

- **视界外区域**（$k\eta\ll1$）允许对整个时间演化求精确解（\secref{8.2.1}）。
- **进入视界**（$\eta$ 长大到 $k\eta>1$）：如果发生在晚期——即大尺度模式——可以处理（此时 $\Phi$ 保持常数，\secref{8.2.2}）；如果发生在辐射主导的极早期——即小尺度模式——也可以处理（忽略 $\delta$，\secref{8.3.1}）。
- **视界内演化**：大尺度模式由 \secref{8.2.2} 的 $\Phi$ 恒定解覆盖；小尺度模式则用另一种近似——忽略辐射扰动——在 \secref{8.3.2} 处理。

这些近似解都无法描述在物质–辐射相等**附近**进入视界的模式（\figref{8.4} 中央的空白）。这仅仅是因为缺乏可用的简化极限；描述这些模式演化的物理与更大、更小尺度的模式完全相同。事实上，\secref{8.4} 给出的最终转移函数是尺度的光滑函数。`}</Tx>
        <Figure n="8.4" interactive={<RegimeDiagram lk0={-1.5} reg0="all" />}
          caption={R`转移函数的物理区域。阴影表示 \secref{8.2}–\secref{8.3} 将推导出解析表达式的不同区域；中央的空白表示没有解析解能刻画中间尺度模式的完整演化。从左下到右上单调上升的曲线是共动视界 $\eta(a)$（左轴）；右轴是对应的穿越视界的波数 $k=1/\eta$。**交互版**：拖动滑块选择一个模式（橙色水平线），橙点为 $k\eta=1$ 的时刻，下方文字判断它走哪条解析路线；按钮可单独显示图 8.5、8.7、8.8、8.12 的区域。$\eta(a)$ 由背景（含 $\Lambda$）数值积分得到。`} />
        <Box kind="warning" title={R`原书中 $h^{-1}\mathrm{Mpc}$ 与 $\mathrm{Mpc}$ 的混用`}>{R`按基准宇宙学（$\Omega_{\rm m}=0.3106$、$h=0.677$）计算，$\eta(a_{\rm eq})=2(\sqrt2-1)\sqrt{a_{\rm eq}}/(H_0\sqrt{\Omega_{\rm m}})=112\,\mathrm{Mpc}=76\,h^{-1}\mathrm{Mpc}$。原书正文"约 $110\,h^{-1}\mathrm{Mpc}$"与 \secref{8.2.2} 中"$k=10^{-3}h\,\mathrm{Mpc^{-1}}$ 在 $\eta\sim1000h^{-1}\mathrm{Mpc}$、$a\sim0.006$ 进入视界"都只有把单位读作 $\mathrm{Mpc}$ 才成立（$\eta=1000\,\mathrm{Mpc}$ 对应 $a=0.0061$，而 $1000\,h^{-1}\mathrm{Mpc}$ 对应 $a=0.012$）。图 8.4–8.8、8.12 的纵轴虽标 $h^{-1}\mathrm{Mpc}$，曲线数值也与 $\mathrm{Mpc}$ 相符。本页交互图按真正的 $h^{-1}\mathrm{Mpc}$ 作图，因此曲线比原图低约 $0.17$ dex。`}</Box>
      </Sub>
    </Sec>);
}
