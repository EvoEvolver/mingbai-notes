import { HaloPairsRedraw, HaloPowerRedraw } from "./_ch14_redraw.jsx";
// §12.7 The halo model —— 式 (12.90)–(12.97)，图 12.11–12.12；§12.8 Summary —— 式 (12.98)–(12.104)
import { Sec, Tx, Eq, Box, Derivation, Figure, C } from "@kit";

const R = String.raw;

export function Sec127() {
  return (
    <Sec n="12.7" title="The halo model" zh="晕模型"
      gist={R`假设每个暗物质粒子属于且仅属于一个晕，物质密度就是所有晕轮廓的叠加 \eqref{12.90}。去掉平均部分后，物质过密度是"晕过密度 $\times$ 归一化轮廓"按质量函数加权的卷积 \eqref{12.97}；功率谱自然分成大尺度的二晕项与小尺度的一晕项。`}
      why={R`把 \secref{12.4} 的三样东西——轮廓、质量函数、晕的成团（偏袒）——组装起来，就得到一个能直观理解、在很宽尺度范围内精确到约 25% 的非线性功率谱模型。`}
      gives={["12.90", "12.93", "12.96", "12.97"]}>
      <p className="muted">本节概念：<C id="halo_model" /> · <C id="nfw" /> · <C id="bias" /></p>
      <Tx>{R`**基本假设。**晕模型以暗物质晕为结构的积木，构造非线性物质密度的一个有用的经验模型（综述见 Cooray & Sheth, 2002）。基本假设是：**每个暗物质粒子属于且仅属于一个晕**。由此可以把三样东西——晕的密度轮廓、质量函数与成团——组合起来，对非线性物质密度的统计量建模。这里只做简要介绍，更细的推导放在习题中。

晕模型的根本假设是物质密度场由位于 $\boldsymbol x_i$、质量为 $M_i$ 的晕叠加而成：`}</Tx>
      <Eq n="12.90" keyEq title="晕模型的物质密度" say={R`物质密度 = 所有晕各自密度轮廓之和；没有任何物质在晕之外。`}>{R`\rho^{\rm HM}_{\rm m}(\boldsymbol x) = \sum_{\text{halos }i}\rho_{\rm h}(|\boldsymbol x-\boldsymbol x_i|,M_i),`}</Eq>
      <Tx>{R`其中 $\rho_{\rm h}(x,M)$ 是 \secref{12.4.1} 引入的晕密度轮廓，为简单起见假设它球对称、只依赖质量 $M$。全程略去时间自变量，它们在推导中不起作用。先把 \eqref{12.90} 中对晕的求和改写成对晕数密度的积分，而后者又是局域质量函数的积分：$n_{\rm h}(\boldsymbol x)=\int d\ln M\,dn(\boldsymbol x)/d\ln M$。\eqref{12.90} 变为`}</Tx>
      <Eq n="12.91" say={R`把对晕的求和换成对晕中心位置与质量的积分，权重是局域质量函数。`}>{R`\rho^{\rm HM}_{\rm m}(\boldsymbol x) = \int d^3x'\int d\ln M\,\frac{dn(\boldsymbol x')}{d\ln M}\,\rho_{\rm h}(|\boldsymbol x-\boldsymbol x'|,M),`}</Eq>
      <Tx>{R`其中 $\boldsymbol x'$ 是对 $\rho^{\rm HM}_{\rm m}(\boldsymbol x)$ 有贡献的晕的质心位置。\eqref{12.91} 是一个空间卷积，让人想起 \eqref{12.2} 的平滑操作；确实，我们是在把晕所含的质量 $M$ 按其密度轮廓摊开到一片区域上。于是定义**归一化轮廓** $y(x,M)\equiv\rho_{\rm h}(x,M)/M$，按轮廓与晕总质量 $M$ 的定义，它满足`}</Tx>
      <Eq n="12.92" say={R`归一化轮廓积分为 1，就像一个平滑窗口。`}>{R`\int d^3x\,y(x,M) = 1,`}</Eq>
      <Tx>{R`这正是平滑滤波器通常所要求的。这样得到`}</Tx>
      <Eq n="12.93" say={R`物质密度 = 晕数密度 $\times$ 晕质量 $\times$ 归一化轮廓的卷积，再对质量积分。`}>{R`\rho^{\rm HM}_{\rm m}(\boldsymbol x) = \int d^3x'\int d\ln M\,\frac{dn(\boldsymbol x')}{d\ln M}M\,y(|\boldsymbol x-\boldsymbol x'|,M).`}</Eq>
      <Tx>{R`**分离平均与扰动。**把 $\rho_{\rm m}$ 与 $dn/d\ln M$ 都分成均匀部分与扰动：`}</Tx>
      <Eq n="12.94" say={R`物质密度与局域质量函数都写成“平均值 $\times$（1 + 过密度）”。`}>{R`\begin{aligned}\rho^{\rm HM}_{\rm m}(\boldsymbol x) &= [1+\delta^{\rm HM}_{\rm m}(\boldsymbol x)]\rho_{\rm m},\\ \frac{dn(\boldsymbol x)}{d\ln M} &= [1+\delta_{\rm h}(\boldsymbol x,M)]\frac{dn}{d\ln M}.\end{aligned}`}</Eq>
      <Tx>{R`得到`}</Tx>
      <Eq n="12.95" say={R`代入后左边的“1”对应右边“1”那部分——它要求质量函数的质量加权积分恰好是平均密度。`}>{R`1+\delta^{\rm HM}_{\rm m}(\boldsymbol x) = \int d\ln M\,\frac{M}{\rho_{\rm m}}\frac{dn}{d\ln M}\int d^3x'[1+\delta_{\rm h}(\boldsymbol x',M)]\,y(|\boldsymbol x-\boldsymbol x'|,M).`}</Eq>
      <Tx>{R`**质量函数的归一化。**现在利用晕质量函数的归一化。回忆晕模型的基本假设：所有物质粒子都在晕中。这意味着质量加权的质量函数积分必须给出平均物质密度：`}</Tx>
      <Eq n="12.96" keyEq title="质量函数的归一化" say={R`所有物质都在晕里：把每个晕的质量乘以晕的数密度，对所有质量求和，得到平均物质密度。`}>{R`\int d\ln M\,M\frac{dn}{d\ln M} = \rho_{\rm m}.`}</Eq>
      <Tx>{R`这对应于坍缩比例的条件 \eqref{12.71}（并对 \eqref{12.73} 中的函数 $f(\nu)$ 施加了额外约束：$\int_0^\infty f(\nu)\,d\nu/\nu=1$）。利用这一结果，\eqref{12.95} 变为`}</Tx>
      <Eq n="12.97" keyEq title="晕模型的物质过密度" say={R`物质过密度 = 晕的过密度用晕轮廓“涂开”，再按每个质量的晕所占的质量比例加权求和。`}>{R`\delta^{\rm HM}_{\rm m}(\boldsymbol x) = \int d\ln M\,\frac{M}{\rho_{\rm m}}\frac{dn}{d\ln M}\int d^3x'\,\delta_{\rm h}(\boldsymbol x',M)\,y(|\boldsymbol x-\boldsymbol x'|,M).`}</Eq>
      <Tx>{R`这个方程表明，晕模型中的非线性物质功率谱可以由晕的质量函数（$dn/d\ln M$）、晕轮廓（$y(x,M)$）与晕的成团（通过 $\delta_{\rm h}$ 的功率谱）算出。细节可以在 \exref{12.13} 中完成。

**一晕项与二晕项。**结果是，晕模型中的物质功率谱自然分解为两部分：$P^{\rm HM}(k)=P_{2{\rm h}}(k)+P_{1{\rm h}}(k)$。第一部分"**二晕项**"来自晕本身的大尺度成团，涉及**不同**晕中的两个质量元（\figref{12.11}）。第二部分"**一晕项**" $P_{1{\rm h}}$ 本质上是晕的散粒噪声与其轮廓的卷积；即使晕完全不成团它也存在，只涉及**同一个**晕内的质量元。由 \figref{12.11} 可以猜到，它在小尺度上占主导。`}</Tx>
      <Figure n="12.11" illustration={<HaloPairsRedraw />} width="100%" caption={R`晕内点对贡献一晕项，不同晕中的点对贡献二晕项；点击切换两种点对。`} />
      <Derivation title={R`\exref{12.13} 的结果：$P_{2{\rm h}}$ 与 $P_{1{\rm h}}$（依据附录 A）`} collapsed steps={[
        { tex: R`P^{\rm HM}(k)=\frac1{\rho_{\rm m}^2}\int d\ln M\frac{dn}{d\ln M}M\int d\ln M'\frac{dn}{d\ln M'}M'\,y(k,M)y(k,M')P_{\rm h}(k,M,M')`, why: R`对 \eqref{12.97} 做 Fourier 变换：卷积变乘积；$\langle\delta_{\rm h}(\boldsymbol k,M)\delta_{\rm h}(\boldsymbol k',M')\rangle=(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k+\boldsymbol k')P_{\rm h}(k,M,M')$。` },
        { tex: R`P_{\rm h}(k,M,M')=b_1(M)b_1(M')P_{\rm L}(k)+\frac{\delta_{\rm D}^{(1)}(\ln M-\ln M')}{dn/d\ln M}`, why: R`线性偏袒 + 不同质量独立的 Poisson 噪声（\eqref{12.117}）。` },
        { tex: R`P_{2{\rm h}}(k)=\Big[\frac1{\rho_{\rm m}}\int d\ln M\frac{dn}{d\ln M}Mb_1(M)y(k,M)\Big]^2P_{\rm L}(k),\qquad P_{1{\rm h}}(k)=\frac1{\rho_{\rm m}^2}\int d\ln M\frac{dn}{d\ln M}M^2[y(k,M)]^2`, why: R`两项分别来自偏袒项与噪声项。$k\to0$ 时 $y\to1$，二晕项要回到 $P_{\rm L}$ 就要求偏袒一致性条件 $\int d\ln M\frac{dn}{d\ln M}\frac{M}{\rho_{\rm m}}b_1=1$。` },
      ]} result={R`一晕项在 $k\to0$ 时趋于常数 $\rho_{\rm m}^{-2}\int d\ln M\,\frac{dn}{d\ln M}M^2$——这是非物理的（物质功率谱不可能有常数噪声），根源是 \eqref{12.117} 假设的不相关 Poisson 噪声与"总质量固定"相矛盾；在晕模型适用的尺度上它在数值上很小。`} />
      <Tx>{R`**与模拟比较。**\figref{12.12} 给出所得功率谱的数值计算。大尺度上它与线性功率谱一致，正如所要求的；那里二晕项占主导。小尺度上一晕项占主导：这时我们探测的是晕的内部，功率谱由晕轮廓的形状与质量函数共同决定。\figref{12.12} 下图把这个简单计算与完整 N 体模拟测得的非线性物质功率谱作比较。考虑到它如此简单，晕模型表现得相当好：在很宽的尺度范围内预言功率谱的误差在 25% 以内，最显著的偏离是在小尺度上低估功率（可以通过调整假设的晕浓度–质量关系来改进）。对于精密应用这不够，但它能近似描述如此宽的尺度范围，说明晕模型可以是一个有用的唯象框架。在与物质功率谱相同的假设下，还可以算出其他统计量，例如物质与晕的互关联、或物质双谱。`}</Tx>
      <Figure n="12.12" illustration={<HaloPowerRedraw />} width="100%" caption={R`原创简化晕模型计算：一晕项、二晕项、总谱与线性谱。未使用 CosmicEmu，不绘制模拟比值。`} />
    </Sec>);
}

export function Sec128() {
  return (
    <Sec n="12.8" title="Summary" zh="小结"
      gist={R`非线性结构形成之所以可解：度规仍是 FLRW 加小扰动，只有物质密度与速度需非线性处理；$k\lesssim1\,h\,\mathrm{Mpc^{-1}}$ 上重子与暗物质可合为单一冷无碰撞成分。核心方程是 Vlasov–Poisson \eqref{12.98}；两条路线：N 体模拟（晕、质量函数 \eqref{12.101}、晕模型）与微扰论（有效无压流体 \eqref{12.103}、NLO 功率谱 \eqref{12.104}、偏袒展开）。`}
      why={R`把本章看似分散的话题归拢到同一个方程组与两种求解策略之下，并点明它们各自的适用范围。`}
      gives={["12.98", "12.99", "12.100", "12.101", "12.102", "12.103", "12.104"]}>
      <Tx>{R`**本书第一次超越线性扰动。**在本章中，我们第一次在宇宙学中超越了小的线性扰动，研究非线性结构的演化。几乎所有大尺度结构观测量——星系成团、星系团丰度、弱引力透镜（第 13 章）——都显著受到非线性演化的影响，因此理解非线性结构形成已成为现代宇宙学不可分割的一部分。幸运的是，这个问题仍然可解：第一，度规仍可以很好地用 FLRW 加小扰动描述，只有物质的密度与速度需要非线性处理；第二，重子物理的复杂性（压强、冷却、恒星形成等）只在非常小的尺度上（$k\gtrsim1\,h\,\mathrm{Mpc^{-1}}$）显著影响物质分布，所以只要满足于更大的、但仍是非线性的尺度，就可以把重子与暗物质当作单一的冷无碰撞物质成分。

**基本方程组。**支配物质非线性增长的基本方程组是无碰撞、非相对论性的 Boltzmann（Vlasov）方程，经 Poisson 方程与引力耦合：`}</Tx>
      <Eq n="12.98" keyEq title="Vlasov–Poisson 方程组（小结）" say={R`本章的全部物理：相空间分布沿粒子轨道守恒，引力势由密度涨落产生。`}>{R`\begin{aligned}\frac{\partial f_{\rm m}}{\partial t} + \frac{\partial f_{\rm m}}{\partial x^j}\frac{p^j}{ma} - \frac{\partial f_{\rm m}}{\partial p^j}\left[Hp^j + \frac ma\frac{\partial\Psi}{\partial x^j}\right] &= 0,\\ \nabla^2\Psi &= 4\pi Ga^2\left[m\int\frac{d^3p}{(2\pi)^3}f_{\rm m}(\boldsymbol x,\boldsymbol p,t) - \rho_{\rm m}(t)\right].\end{aligned}`}</Eq>
      <Tx>{R`（第二行的因子 $m$ 原书同样漏印，见 \eqref{12.54} 下方的说明。）这组概念上简单、数学上复杂的方程导出了丰富的预言。本章只触及皮毛；想深入的读者可参阅 Bernardeau et al. (2002) 的出色综述，它涵盖数值与微扰两种方法。

**N 体模拟与晕。**求解 Vlasov–Poisson 方程组的一种强有力的方法是 N 体数值模拟，它把物质所占据的相空间体积离散化（由于暗物质是冷的，这个体积呈薄片状）。因此模拟中的"粒子"并不是真正的暗物质粒子，而代表相空间的小块。N 体模拟的输出让我们能识别大质量束缚结构——暗物质晕，它们是星系与星系团的宿主。晕的质量 $M_\Delta$ 定义为共动半径 $R_\Delta$ 内的质量，该球内平均密度为平均物质密度的 $\Delta$ 倍：`}</Tx>
      <Eq n="12.99" say={R`晕质量 = 平均密度为 $\Delta$ 倍宇宙平均物质密度的球内的质量。`}>{R`M_\Delta = M(<R_\Delta) = \frac{4\pi}{3}R_\Delta^3\,\rho_{\rm m}(t_0)\,\Delta.`}</Eq>
      <Tx>{R`另一个重要尺度是**拉格朗日半径** $R_L$——在平均物质密度下包含晕质量的半径：`}</Tx>
      <Eq n="12.100" say={R`拉格朗日半径：晕的物质在初始时刻所来自的共动区域的大小；对 $\Omega_{\rm m}$ 的依赖为 $-1/3$ 次方。`}>{R`R_L(M) = 1.40\,h^{-1}\,\mathrm{Mpc}\left(\frac{M}{10^{12}\,h^{-1}M_\odot}\right)^{1/3}\left(\frac{\Omega_{\rm m}}{0.31}\right)^{-1/3}.`}</Eq>
      <Tx>{R`拉格朗日半径给出物质汇聚成晕之前所在区域的共动尺寸，在描述晕的半解析方法中起重要作用。例如，每个对数质量区间的晕数密度——晕质量函数——通常参数化为`}</Tx>
      <Eq n="12.101" keyEq title="普适质量函数" say={R`质量函数的普适形式：所有宇宙学与红移依赖都通过 $\sigma(M,z)$ 进入，剩下一个只依赖峰高的函数 $f(\nu)$ 由模拟拟合。`}>{R`\frac{dn(M,z)}{d\ln M} = \frac{\rho_{\rm m}(t_0)}{M}f\left(\frac{\delta_{\rm cr}}{\sigma(M,z)}\right)\left|\frac{d\ln\sigma(M,z)}{d\ln M}\right|,`}</Eq>
      <Tx>{R`其中 $\sigma(M,z)\equiv\sigma(R_L[M],z)$ 是在拉格朗日半径 $R_L(M)$ 尺度上用实空间 tophat 滤波平滑的线性密度场的方差（标准差），$f(\nu)$ 是拟合函数。只需调节一个函数 $f(\nu)$，\eqref{12.101} 就能在一系列红移与宇宙学下把晕质量函数描述到 $\sim5\%$ 的精度（\figref{12.9}）。

**星系团与晕模型。**晕与可观测天体之间的关系对星系团尤为清楚——它们是宇宙中最重、最稀有的束缚结构。测量晕的丰度，再加上星系团观测量（如 X 射线温度或 SZ 畸变参数 $y$）与晕质量之间的关系，就能从星系团得到宇宙学约束；这种关系尤其可以由下一章的主题——引力透镜——得到。晕及其近似普适的密度轮廓还让我们能为非线性物质密度场建立一幅经验图景，即**晕模型**：假定每个暗物质粒子属于一个（且仅一个）晕。我们只简要介绍了这个想法，感兴趣的读者可参阅 Cooray & Sheth (2002) 的综述以及 \exref{12.13}。这类玩具模型以及晕形成的球坍缩图像都不很精确，但能提供物理直觉，并让我们探索非线性结构如何响应新物理（如有质量中微子或对广义相对论的修改）。

**模拟的边界。**只含引力的 N 体模拟如今已是常规工作，但它们不产生星系，事实上不产生任何光源，因为它们不模拟重子的电磁及其他相互作用。真实地模拟重子必然需要为未分辨尺度建模的处方，如何准确地做到这一点仍是大量研究的课题。想更深入了解非线性结构与星系形成的这些及其他方面的读者，可参阅 Mo et al. (2010) 一书。

**微扰论路线。**所以一个关键信息是：既然要解释星系成团的测量就必须理解星系的行为，我们就不能完全依赖模拟。另一条途径是沿着本书迄今的大部分解析路线，对非线性物质密度场做微扰展开：`}</Tx>
      <Eq n="12.102" say={R`非线性密度与速度散度按线性场的幂次逐阶展开（同 \eqref{12.29}）。`}>{R`\begin{aligned}\delta_{\rm m}(\boldsymbol x,\eta) &= \delta^{(1)}(\boldsymbol x,\eta) + \delta^{(2)}(\boldsymbol x,\eta) + \cdots + \delta^{(n)}(\boldsymbol x,\eta),\\ \theta_{\rm m}(\boldsymbol x,\eta) &= \theta^{(1)}(\boldsymbol x,\eta) + \theta^{(2)}(\boldsymbol x,\eta) + \cdots + \theta^{(n)}(\boldsymbol x,\eta).\end{aligned}`}</Eq>
      <Tx>{R`$\delta^{(n)}_{\rm m}$ 与 $\theta^{(n)}_{\rm m}$ 的方程通过对 Vlasov 方程取矩、并在二阶矩处截断层级得到。结果是一组描述**有效无压流体**的方程：`}</Tx>
      <Eq n="12.103" say={R`有效无压流体的方程组（同 \eqref{12.24} 加 Poisson 方程）：左边线性、右边二次非线性。`}>{R`\begin{aligned}\delta_{\rm m}{}' + \theta_{\rm m} &= -\delta_{\rm m}\theta_{\rm m} - u^j_{\rm m}\frac{\partial}{\partial x^j}\delta_{\rm m},\\ \theta_{\rm m}{}' + aH\theta_{\rm m} + \nabla^2\Psi &= -u^j_{\rm m}\frac{\partial}{\partial x^j}\theta_{\rm m} - (\partial_iu^j_{\rm m})(\partial_ju^i_{\rm m}),\\ \nabla^2\Psi &= \frac32\Omega_{\rm m}(\eta)(aH)^2\delta_{\rm m}.\end{aligned}`}</Eq>
      <Tx>{R`把低阶解代入右边的非线性源项，就能逐阶算出物质的演化。我们用它算出了物质功率谱的非线性修正 \eqref{12.48}：`}</Tx>
      <Eq n="12.104" say={R`非线性功率谱 $\approx$ 线性谱 + 单圈修正；后者小于前者的范围就是微扰论的适用范围。`}>{R`P(k,\eta) = P_{\rm L}(k,\eta) + P^{\rm NLO}(k,\eta).`}</Eq>
      <Tx>{R`微扰方法的主要缺点是适用范围局限于大尺度，即 \eqref{12.104} 第二项小于第一项的尺度（$z=0$ 时 $k\lesssim0.2\,h\,\mathrm{Mpc^{-1}}$，在更高红移延伸到越来越大的波数）。主要优点是能以对小尺度重子效应最少的假设稳健地计算物质与星系的成团，这些效应被偏袒系数吸收。如前所述，这种稳健性对星系尤其重要，因为要推断宇宙学必须依赖偏袒关系。在 \secref{12.6} 中我们用它为上一章关于星系成团的假设提供了依据，并把它们推广到微扰论的更高阶。`}</Tx>
    </Sec>);
}
