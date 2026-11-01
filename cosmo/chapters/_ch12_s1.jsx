// §12.1 Prelude —— 式 (12.1)–(12.9)，图 12.1
import { Sec, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { SigmaPlot } from "./_ch12_plots.jsx";

const R = String.raw;

export function Sec121() {
  return (
    <Sec n="12.1" title="Prelude" zh="序曲：哪些尺度是非线性的，我们可以保留什么"
      gist={R`平滑后的线性密度场方差 $\sigma_W^2$ 在小尺度上超过 1，线性理论失效；但势的涨落处处只有 $\lesssim10^{-4}$。所以可以对度规保持线性、用牛顿 Poisson 方程 \eqref{12.5}，而对物质完全非线性——得到 Vlasov–Poisson 方程组 \eqref{12.8}+\eqref{12.5}。`}
      why={R`第 8 章的线性解在 $k\gtrsim k_{\rm NL}$ 失效，而星系、星系团都生活在那里。要走出线性理论，先得弄清"哪里非线性、哪里仍然可以近似"，才能把完整的 Einstein–Boltzmann 方程化简成可解的问题。`}
      gives={["12.1", "12.4", "12.5", "12.8", "12.9"]}>
      <p className="muted">本节概念：<C id="sigma_w" /> · <C id="vlasov" /> · <C id="halo" /></p>
      <Tx>{R`**本章的出发点。**到目前为止，本书只研究对均匀宇宙的**小**扰动：辐射、物质与时空的扰动都只保留到线性阶。这对 CMB 已经足够精确，但显然描述不了满是恒星、星系、星系团的晚期宇宙。完整的 Einstein 与 Boltzmann 方程（第 3 章）在一般情形下极其复杂；幸运的是，即使在充满非线性结构的晚期宇宙中，引力在某种意义上依然是**弱**的：度规几乎处处接近 FLRW。于是可以继续把度规扰动保留到线性阶，而对物质密度做**完全非线性**的处理。

成团的成分以暗物质为主；气体（重子）在复合后迅速冷却，压强只在很小的尺度上起作用。因此本章把重子也近似为无碰撞的，专心求解**冷、无碰撞物质在引力下的演化**——一个概念上简单而优美的问题。我们有两件工具：**微扰论**（\secref{12.2}）与**数值模拟**（\secref{12.3}）。

**一个不用计算就能得到的定性结论。**线性物质功率谱的形状（图 8.3，以及更合适的表示 \figref{12.1}）说明：大尺度上的密度扰动小，小尺度上的大。所以结构**先在小尺度上**变为非线性（坍缩），这些小结构再逐步"层级式地"（hierarchically）并合成更大的结构。非线性的物质分布可以看成由束缚的暗物质结构——**晕**（halo）——搭成，它们是理解复杂非线性物质分布的有用积木（\secref{12.4}）。

**星系与星系团。**星系的形成不能"简单地"用无碰撞 Boltzmann 方程加 Einstein 方程描述：它们通过气体的辐射与碰撞冷却、最终坍缩成恒星而形成。尽管如此，我们会看到微扰方法依然能描述大尺度上的**星系成团**（\secref{12.6}）——这正是第 11 章把星系成团当作宇宙学探针（BAO 标准尺、AP 检验、红移空间畸变）所需要的。另一条途径是**星系团**（\secref{12.5}）：它们相当忠实地示踪最重的暗物质晕，而后者的丰度对结构形成极其敏感，所以"数星系团"能给出有意思的宇宙学约束。`}</Tx>
      <Box kind="aside" title="本章阅读指南">{R`本章内容多、话题看似分散。**两大基本方法**：微扰论（\secref{12.2}）与数值模拟（\secref{12.3}）。想理解第 11 章关于大尺度星系成团的假设，读 \secref{12.2} 与 \secref{12.6}——它们不依赖模拟一节。主要关心星系团，就读暗物质晕（\secref{12.4}）与星系团（\secref{12.5}）。半解析的晕模型（\secref{12.7}）只依赖 \secref{12.4} 与第 11 章的成团假设。本章不是后面各章的前提，但第 13 章会看到：要从引力透镜推断宇宙学，可靠的非线性物质分布预言是关键。`}</Box>

      <Tx>{R`**"物质" = 暗物质 + 重子。**晚期宇宙中成团的主要成分是物质：约 80% 是暗物质，其余是重子（中性与电离的气体、恒星）。本章大部分地方把两者合称"物质"。重子当然与暗物质不同，它们感受电磁力；但与光子完全脱耦之后，重子迅速冷却（温度按动能标度，$\propto a^{-2}$），电磁相互作用产生的压强只在非常小的尺度上才重要。所以一个好而实用的近似是：把全部物质当作**单一成分**，忽略一切非引力的力。（第 8.6.1 节中暗物质与重子不同的初条件在本章忽略；它们可以用同样的技术处理，晚期只带来百分之一量级的修正。）

**回到线性方程。**第 5.4 与 6.3.2 节推出的暗物质线性方程是连续性方程、Euler 方程与 Poisson 方程：`}</Tx>
      <Eq n="12.1" title="线性物质方程组" say={R`线性理论的全部内容：密度随速度散度与势的变化而变（连续性），速度被膨胀拖慢、被势梯度加速（Euler），势由物质过密度决定（Poisson）。本章要做的就是把它推广到非线性。`}>{R`\begin{aligned}\delta_{\rm m}{}' + iku_{\rm m} + 3\Phi' &= 0,\\ u_{\rm m}{}' + \frac{a'}{a}u_{\rm m} + ik\Psi &= 0,\\ k^2\Phi + 3\frac{a'}{a}\left(\Phi' - \Psi\frac{a'}{a}\right) &= 4\pi Ga^2\rho_{\rm m}\delta_{\rm m},\end{aligned}`}</Eq>
      <Tx>{R`Poisson 方程右边只计入了物质。这是合理的：在结构开始变为非线性的红移 $z\lesssim10$，辐射的贡献可以忽略。中微子并不完全如此——它们有质量、变为非相对论性后贡献百分之一量级——但计入中微子不改变下面的主要论证。晚期宇宙的各向异性应力可以忽略，所以还可以令 $\Phi=-\Psi$。下面我们选择用 $\Psi$ 来工作，因为支配非相对论性物质运动的正是度规时间–时间分量的扰动。（与文献比较时要小心：符号约定五花八门，例如有人用 $\Phi$ 表示这里的 $\Psi$，正负号也不统一。）

**先问：我们要处理的是哪些尺度？**第 8 章解出线性演化后，已经可以计算给定尺度上线性密度涨落的典型幅度。定义**平滑（滤波）后的密度场**`}</Tx>
      <Eq n="12.2" say={R`平滑密度场 = 用窗函数 $W$ 对真实密度场做加权平均：只保留比窗口大的结构。`}>{R`\delta_W(\boldsymbol x) = \int d^3y\,W(|\boldsymbol x-\boldsymbol y|)\,\delta_{\rm m}(\boldsymbol y),`}</Eq>
      <Tx>{R`其中 $W(x)$ 是滤波核，取为各向同性的，只依赖 $|\boldsymbol x-\boldsymbol y|$。实空间的卷积对应 Fourier 空间的乘积：`}</Tx>
      <Eq n="12.3" say={R`在 Fourier 空间里，平滑就是给每个模式乘上一个窗函数 $W(k)$：小于窗口的波长（大 $k$）被压掉。`}>{R`\delta_W(\boldsymbol k) = W(k)\,\delta_{\rm m}(\boldsymbol k),`}</Eq>
      <Tx>{R`$W(k)$ 是各向同性滤波核的 Fourier 变换。（本章会在实空间与 Fourier 空间之间来回切换；函数的自变量或显式出现的 $\boldsymbol k$ 因子会消除歧义。）在实空间归一化 $\int d^3x\,W(\boldsymbol x)=1$ 的滤波器在 Fourier 空间满足 $W(k=0)=1$。例如它可以是宽度为 $\Delta k$ 的 Gauss 函数，对应实空间宽度 $R=1/\Delta k$ 的 Gauss 函数。平滑场的方差与物质功率谱直接相关（推导见 \exref{8.13}）：`}</Tx>
      <Eq n="12.4" keyEq title="平滑场的方差" say={R`平滑场的方差 = 线性功率谱乘以窗函数平方后对所有模式求和；最后一行说明它就是每个对数 $k$ 区间的无量纲功率 $\Delta^2_{\rm L}$ 被窗函数截断后的积分。`}>{R`\begin{aligned}\sigma_W^2 \equiv \left\langle(\delta_W)^2(\boldsymbol x)\right\rangle &= \int\frac{d^3k}{(2\pi)^3}\int\frac{d^3k'}{(2\pi)^3}\left\langle\delta_W(\boldsymbol k)\delta_W^*(\boldsymbol k')\right\rangle e^{i(\boldsymbol k-\boldsymbol k')\cdot\boldsymbol x}\\ &= \int\frac{d^3k}{(2\pi)^3}P_{\rm L}(k)|W(k)|^2\\ &= \frac{1}{2\pi^2}\int d\ln k\,k^3P_{\rm L}(k)|W(k)|^2.\end{aligned}`}</Eq>
      <Derivation title={R`\eqref{12.4} 的三步`} collapsed steps={[
        { tex: R`\langle\delta_W(\boldsymbol k)\delta_W^*(\boldsymbol k')\rangle=W(k)W(k')\,(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k-\boldsymbol k')P_{\rm L}(k)`, why: R`由 \eqref{12.3} 与功率谱的定义（第 8 章 \eqref{8.8} 上方）；统计均匀性使不同 $\boldsymbol k$ 不相关。` },
        { tex: R`\sigma_W^2=\int\frac{d^3k}{(2\pi)^3}P_{\rm L}(k)|W(k)|^2`, why: R`$\delta_{\rm D}$ 吃掉 $\int d^3k'$，相位因子变为 1——方差与位置 $\boldsymbol x$ 无关。` },
        { tex: R`\int\frac{d^3k}{(2\pi)^3}=\frac{4\pi}{(2\pi)^3}\int k^2dk=\frac{1}{2\pi^2}\int d\ln k\,k^3`, why: R`被积函数各向同性，做角度积分并用 $dk=k\,d\ln k$。` },
      ]} />
      <Figure n="12.1" illustration={<SigmaPlot />}
        caption={R`原创计算图。在浏览器中用 \eqref{12.4} 积分线性功率谱 \eqref{8.8}（附录 B 基准宇宙学 $\Omega_{\rm m}=0.311$、$h=0.677$、$n_s=0.968$、$\mathcal A_s=2.1\times10^{-9}$；转移函数用与第 8 章交互图相同的 Eisenstein–Hu (1998) 含重子拟合，增长因子由 \eqref{8.75} 数值求解；纯线性，不含任何非线性修正），势由 \eqref{12.5} 换算并取 $k_{\min}=10^{-4}\,h\,\mathrm{Mpc^{-1}}$。滑块可改变红移（乘 $D_+^2$）与 $\Omega_{\rm m}$。核对：$z=0$ 时 tophat 曲线给出 $\sigma_8=0.83$（原书基准 $0.811$；差 2.6% 来自 EH 拟合与 CLASS 的差别），$\sigma_W=1$ 出现在 $R\approx6\,h^{-1}\mathrm{Mpc}$；$R=0.3$ 与 $300\,h^{-1}\mathrm{Mpc}$ 处分别为 $3.9$ 与 $0.013$；势的 RMS $\times10^4\approx0.51$（$R\lesssim30$）并在 $R=300$ 降到 $0.45$，与原图红虚线一致。`} />
      <Tx>{R`**线性理论在哪里失效。**\figref{12.1} 显示：在大尺度上平滑，密度涨落很小；在小尺度上平滑，涨落变大。平滑尺度足够小时 $\sigma_W^2$ 超过 1。这意味着用足够高的分辨率看宇宙，任何一点的密度都很可能与宇宙平均值相差甚远——基于 \eqref{12.1} 的线性处理在大多数地方给出错误的密度场。显然我们必须做得更好。注意这个结论不依赖滤波器的具体形状：任何合理的滤波器都给出同样的趋势。

**势却一直很小。**同样可以计算度规扰动 $\Psi$ 的方差随尺度的变化（\figref{12.1} 红线）。有趣的是，典型的势涨落在**所有尺度**上都保持很小，$\lesssim10^{-4}$。（严格说，计入 $k\to0$ 的模式时 $\langle\Phi_W^2\rangle$ 对数发散；只有当前视界内的势扰动可观测，所以取截断 $k_{\min}=10^{-4}\,h\,\mathrm{Mpc^{-1}}$，其精确值对结果影响很小。）原因很容易理解：\eqref{12.4} 的积分由高波数主导，峰值在滤波器选出的尺度附近。小尺度上积分由 $k\gg aH\sim3\times10^{-4}\,h\,\mathrm{Mpc^{-1}}$ 的贡献主导，即远小于哈勃半径的空间尺度。这时 \eqref{12.1} 中 Poisson 方程的第一项远远占优（注意 $\Phi'$ 至多是 $(a'/a)\Phi$ 的量级），它简化为`}</Tx>
      <Eq n="12.5" keyEq title="牛顿 Poisson 方程" say={R`视界内的 Poisson 方程就是牛顿引力：势 $\propto\delta_{\rm m}/k^2$，所以小尺度上密度可以很大而势仍然很小。多出来的 $a^2$ 只是因为 $k$ 是共动波数。`}>{R`-k^2\Psi = 4\pi Ga^2\rho_{\rm m}\delta_{\rm m}.`}</Eq>
      <Tx>{R`这是众所周知的牛顿引力 Poisson 方程，多出的 $a$ 因子是因为波数 $k$ 用的是共动单位。于是 $|\Psi(\boldsymbol k)|\propto\delta_{\rm m}(\boldsymbol k)/k^2$，在小尺度上相对于密度被强烈压低——这就解释了为什么密度涨落变大时势的涨落仍然很小。另一种看法：物质主导期势保持常数，而密度扰动随线性增长因子 $D_+(\eta)\propto a(\eta)$ 增长。

**两条简化。**可以充分利用这个结果。第一，时空扰动很小，所以可以继续对势 $\Psi$ 保持线性阶，第 6 章推出的线性 Einstein 方程就够了。第二，非线性演化只在（相对于哈勃半径的）小尺度上才重要，所以可以用相关 Einstein 方程的**牛顿极限**，即 \eqref{12.5}。这极大地简化了问题的引力部分，我们可以把注意力全部放在物质动力学上。`}</Tx>
      <Box kind="physics" title="牛顿近似比看上去更好">{R`如果把 $\delta_{\rm m}$ 理解为**同步–共动规范**（synchronous-comoving gauge）中的密度扰动，那么在物质主导期 \eqref{12.5} 在**所有尺度**上都成立。这组坐标的定义是：$g_{00}=-1$（没有时间–时间扰动，时间坐标就是固有时，即"同步"；见 \exref{5.1}），并且物质速度 $\boldsymbol u_{\rm m}=0$（"共动"）。只要在下文中记住 $\delta_{\rm m}$ 的这种解释，我们得到的微扰论与模拟结果就在所有尺度上成立，包括与视界可比的尺度。`}</Box>
      <Tx>{R`**非线性的 Boltzmann 方程。**现在要把 \eqref{12.1} 推广到非线性阶。回到这些方程的出发点——它们是对 Boltzmann 方程取矩得到的。所以我们需要一个**不限于小扰动**、但适用于视界内非相对论性物质的 Boltzmann 方程。从直角坐标形式的一般无碰撞 Boltzmann 方程出发：`}</Tx>
      <Eq n="12.6" say={R`无碰撞 Boltzmann 方程：沿粒子轨道，相空间分布函数 $f_{\rm m}$ 保持不变。`}>{R`\frac{df_{\rm m}}{dt} = \frac{\partial f_{\rm m}}{\partial t} + \frac{\partial f_{\rm m}}{\partial x^i}\frac{dx^i}{dt} + \frac{\partial f_{\rm m}}{\partial p^i}\frac{dp^i}{dt} = 0,`}</Eq>
      <Tx>{R`其中 $f_{\rm m}$ 是物质的分布函数。利用物质运动缓慢，展开 $E(p)=m+p^2/2m$ 并只保留 $p/m$ 的领头项。由测地线方程得 $dx^i/dt=p^i/am$。$dp^i/dt$ 一项也很直接，从 \eqref{3.69} 出发：`}</Tx>
      <Eq n="12.7" say={R`动量的变化：一般表达式中，非相对论、视界内极限只剩下两项——膨胀造成的红移 $-Hp^i$ 与势梯度的牛顿力 $-(m/a)\Psi_{,i}$。`}>{R`\begin{aligned}\frac{dp^i}{dt} &= -\left(H+\dot\Phi\right)p^i - \frac{E}{a}\Psi_{,i} - \frac1a\frac{p^i}{E}p^k\Phi_{,k} + \frac{p^2}{aE}\Phi_{,i}\\ &\to -Hp^i - \frac ma\Psi_{,i}\qquad\text{(non-relativistic, sub-horizon)}.\end{aligned}`}</Eq>
      <Tx>{R`其余各项要么在小尺度上被压低（$\dot\Phi$），要么因速度小而可以忽略（$p^2/E$ 量级的项）。代入 Boltzmann 方程，得到`}</Tx>
      <Eq n="12.8" keyEq title="Vlasov 方程" say={R`非相对论物质的完全非线性无碰撞 Boltzmann（Vlasov）方程：粒子以速度 $p/ma$ 漂移，动量被膨胀阻尼并受势梯度推动。它不要求 $f_{\rm m}$ 接近均匀，只要求时空扰动小。`}>{R`\frac{df_{\rm m}}{dt} = \frac{\partial f_{\rm m}}{\partial t} + \frac{\partial f_{\rm m}}{\partial x^j}\frac{p^j}{ma} - \frac{\partial f_{\rm m}}{\partial p^j}\left[Hp^j + \frac ma\frac{\partial\Psi}{\partial x^j}\right] = 0.`}</Eq>
      <Tx>{R`**这个结果的意义。**\eqref{12.8} **不**假设分布函数接近它在均匀宇宙中的值；它**确实**假设时空扰动小——我们已经看到这在所有尺度上都是极好的近似。把 Einstein 方程 00 分量简化为 \eqref{12.5} 的同一推理也允许丢掉 $\dot\Phi$ 项：它至多是 $aH\Psi$ 量级，远小于 $\partial\Psi/\partial x^j$ 的贡献（$k\Psi$ 量级）。

**Vlasov–Poisson 方程组。**\eqref{12.8} 与 \eqref{12.5} 合在一起，构成物质非线性演化的出发点，称为 **Vlasov–Poisson 方程组**。它是非线性的（通过 $\Psi$ 与 $f_{\rm m}$ 的耦合），是积分–微分方程（因为 $\delta_{\rm m}$ 是分布函数 $f_{\rm m}$ 的积分），又定义在 $6+1$ 维中——出了名地难解。下面几节分别用微扰与数值方法来处理它。

**零速度弥散的假设。**微扰方法与前几章一样：对 Boltzmann 方程取矩。在迄今研究的线性区，分布函数完全由零阶矩（密度）与一阶矩（速度）描述。物理上，这意味着二阶矩——速度弥散——小到可以忽略。这时分布函数可以写成`}</Tx>
      <Eq n="12.9" keyEq title="冷流体的分布函数" say={R`零速度弥散的“冷流体”：每一点所有粒子的动量都等于当地的流体动量 $m\boldsymbol u_{\rm m}$，分布函数在动量空间是一根 $\delta$ 函数。`}>{R`f_{\rm m}(\boldsymbol x,\boldsymbol p,t) = \frac{\rho_{\rm m}(\boldsymbol x,t)}{m}(2\pi)^3\delta_{\rm D}^{(3)}\left(\boldsymbol p - m\boldsymbol u_{\rm m}(\boldsymbol x,t)\right)\qquad\text{(no velocity dispersion)},`}</Eq>
      <Tx>{R`其中把 CDM 与重子各物种无关紧要的简并因子吸收进了 $f_{\rm m}$。可以把它理解为：每一点有一个以 $\boldsymbol u_{\rm m}(\boldsymbol x,t)$ 为中心的热速度分布，取温度趋于零的极限。但必须意识到，**一旦结构变为非线性，\eqref{12.9} 的形式就不再成立**——\secref{12.3} 会仔细看它如何失效。不过，先看看零速度弥散的假设能把我们带多远。`}</Tx>
    </Sec>);
}
