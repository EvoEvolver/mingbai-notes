import { BBNNetworkRedraw, BindingEnergyRedraw } from "./_redraw_early.jsx";
// §4.2 Big Bang nucleosynthesis —— 式 (4.10)–(4.31)，Box 4.1，图 4.1–4.3
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { S } from "./_ch04_notation.jsx";
import { NeutronPlot, DeuteriumPlot } from "./_ch04_plots.jsx";

const R = String.raw;
const N0 = S.n0, P = S.pr, Nn = S.ne, E = S.el;

export function Sec42() {
  return (
    <Sec n="4.2" title="Big Bang nucleosynthesis" zh="大爆炸核合成"
      gist={R`$T\sim1\,\mathrm{MeV}$ 时宇宙中每个重子对应约 $1.7\times10^9$ 个光子（$\eta_{\rm b}=6\times10^{-10}$）；Saha 方程 \eqref{4.16} 表明这么多光子会把新生的氘核不断打碎，于是 $T\gtrsim0.1\,\mathrm{MeV}$ 时只有自由的中子与质子——问题拆成"先算中子比例，再算它们装进哪些核"两步。`}
      why={R`BBN 产生了我们今天看到的轻元素，是检验早期宇宙物理、测量重子密度的最古老"化石"。`}
      gives={["4.10", "4.11", "4.15", "4.16"]}>
      <p className="muted">本节概念：<C id="saha" /> · <C id="np_ratio" /> · <C id="helium" /> · <C id="g_star" /></p>
      <Tx>{R`**舞台：1 MeV 时的宇宙等离子体。**第 1 章已经说过，在早期宇宙的各个时期中，**大爆炸核合成**（Big Bang Nucleosynthesis, BBN）尤为重要：我们今天看到的轻元素由它产生，它也能用来约束宇宙学。BBN 发生在宇宙冷却到约 1 MeV 时。那一刻的宇宙等离子体由三类成员组成：

◆ **处于平衡的相对论粒子：光子、电子与正电子。**它们靠 $e^+e^-\leftrightarrow\gamma\gamma$ 之类的电磁相互作用紧密联系；除了费米子/玻色子统计带来的小差别，它们的丰度都相同。

◆ **已脱耦的相对论粒子：中微子。**在略高于 1 MeV 时，维持中微子与等离子体其余部分耦合的过程（如 $\nu e\leftrightarrow\nu e$）的速率已降到膨胀率以下。因此中微子与其他相对论粒子温度相同（但见 §2.4.4），数目也大致相同，只是不再与它们相互作用。

◆ **非相对论粒子：重子。**如果初始时重子与反重子数目完全对称，到 1 MeV 时两者都会湮灭殆尽（见习题 4.3）。可我们看到的宇宙并非空无一物，所以这种不对称**必须存在**。比较重子与光子的丰度，今天 $n_{\rm b}/s\sim10^{-10}$（$s$ 为熵密度，按 $a^{-3}$ 标度，见第 2 章）。只要重子数守恒，这个比值在膨胀中保持不变，所以它也量化了早期宇宙的重子–反重子不对称。由习题 4.6 可算出`}</Tx>
      <Eq n="4.10" keyEq title="重子–光子比" say={R`每 17 亿个光子才有一个重子：重子数与光子数之比约 $6\times10^{-10}$，正比于今天的重子密度 $\Omega_{\rm b}h^2$。`}>{R`\eta_{\rm b}\equiv\frac{n_{\rm b}}{n_\gamma}=6.0\times10^{-10}\left(\frac{\Omega_{\rm b}h^2}{0.022}\right).`}</Eq>
      <Tx>{R`所以宇宙中重子比相对论粒子少得多。这个小数字将贯穿整章。`}</Tx>

      <Tx>{R`**任务与两个化简。**本节要确定质子和中子最终进入了哪些原子核、各有多少。如果系统始终保持平衡，终态只由能量决定：所有重子都会弛豫到每重子能量最低的核——铁（\figref{4.1}）。但核反应速率与密度的二次方（甚至更高次方）成正比，随着宇宙膨胀，它们太慢而无法维持平衡。原则上，我们需要对所有原子核写出 \eqref{4.8} 的对应方程——一组耦合微分方程。实际上，至少为了定性理解结果，有两个化简让我们不必解整组方程：

**化简一**：比氦重的元素基本没有显著产生。所以只需追踪氢、氦及其同位素：氘、氚和 $^3$He。

**化简二**：即便在这组缩减的元素中，物理也干净地一分为二——$T\gtrsim0.1\,\mathrm{MeV}$ 时**没有任何轻核形成**，只有自由的质子和中子。因此我们先求中子/质子比，再把这个丰度作为输入，去算氦和氘等同位素的合成（核物理速成见 Box 4.1）。`}</Tx>

      <Box kind="aside" title="Box 4.1　核物理速成（Lightning Introduction to Nuclear Physics）">
        <Tx>{R`原子核由两个数刻画：**原子序数** $Z$ 给出核内质子数（因而也是核电荷），每种元素各不相同；**质量数** $A$ 是核内中子和质子的总数。$A$ 不同而 $Z$ 相同的核互为**同位素**（isotopes）。质量数写在元素名左上角。于是单个质子 $${P}$ 也可以写成氢核 $^1$H；氘核由一个质子和一个中子组成，写作 $^2$H 或 D；一个质子加两个中子是氚 $^3$H。$Z=2$ 的核是氦，可以有一个中子（$^3$He）或两个（$^4$He）。

$Z$ 个质子和 $A-Z$ 个中子组成的核，其总质量与各质子、中子质量之和略有差别，这个差就是**结合能**（binding energy）：`}</Tx>
        <Eq n="4.11" say="原子核比组成它的自由质子和中子轻；轻掉的那部分质量（能量）就是把它拆散所需的结合能。">{R`B_{\rm N}\equiv Zm_p+(A-Z)m_n-m_{\rm N}`}</Eq>
        <Tx>{R`其中 $m_{\rm N}$ 是原子核的质量。例如氘核质量为 1875.62 MeV，而中子与质子质量之和为 1877.84 MeV，所以氘的结合能 $B_{\rm D}=2.22\,\mathrm{MeV}$。核结合能通常在 MeV 量级——这解释了为什么 BBN 发生在略低于 1 MeV 的温度，尽管核子质量在 GeV 量级。

中子和质子可以通过弱相互作用相互转化：`}</Tx>
        <Eq n="4.12" say={R`弱相互作用让中子和质子互相转化：吸收或放出电子、正电子、中微子；最后一个是自由中子的 $\beta$ 衰变。所有反应都可以双向进行。`}>{R`${P}+\bar\nu\leftrightarrow${Nn}+${E}^+;\quad ${P}+${E}^-\leftrightarrow${Nn}+\nu;\quad ${Nn}\leftrightarrow${P}+${E}^-+\bar\nu`}</Eq>
        <Tx>{R`这些反应都可以双向进行。轻元素通过核反应逐步搭建。例如氘由 $\mathrm p+\mathrm n\to\mathrm D$ 形成；然后 $\mathrm{D+D}\to\mathrm n+{}^3\mathrm{He}$，再由 $^3\mathrm{He}+\mathrm D\to\mathrm p+{}^4\mathrm{He}$ 产生 $^4$He。末态核通常处于激发态，随后放出一个或多个光子弛豫到基态。`}</Tx>
      </Box>

      <Figure n="4.1" caption={R`独立绘制的代表核素结合能：采用若干舍入的每核子结合能，连线仅引导阅读。突出氘、氦-3、氦-4，以及铁镍附近的峰值；未重建原书 Audi 等（2003）的完整核质量表曲线。`} illustration={<BindingEnergyRedraw />} />

      <Tx>{R`**为什么 0.1 MeV 以上没有核？**两个化简——完全没有重元素、0.1 MeV 以上只有 $n/p$——都基于同一个物理事实：在与核结合能相当的高温下，**任何时候一个核在反应中被产生，就会被一个高能光子摧毁**。这一事实体现在基本平衡方程 \eqref{4.9} 中。看看它如何作用于氘的产生 $\mathrm n+\mathrm p\leftrightarrow\mathrm D+\gamma$：由于光子的化学势 $\mu_\gamma$ 极小，$n_\gamma=${N0}_\gamma^{(0)}$，平衡条件变为`}</Tx>
      <Eq n="4.13" say="氘、中子、质子处于化学平衡时，实际数密度的组合等于零化学势平衡值的同一组合（光子的因子相消）。">{R`\frac{n_{\rm D}}{n_nn_p}=\frac{${N0}_{\rm D}^{(0)}}{${N0}_n^{(0)}${N0}_p^{(0)}}.`}</Eq>
      <Tx>{R`对右边各量用 \eqref{4.5}（三者都非相对论）得到`}</Tx>
      <Eq n="4.14" say="代入非相对论平衡密度：前因子来自自旋态数（3/4）和相空间（质量与温度的 3/2 次方），指数里是结合前后的质量差除以温度。">{R`\frac{n_{\rm D}}{n_nn_p}=\frac34\left(\frac{2\pi m_{\rm D}}{m_nm_pT}\right)^{3/2}e^{[m_n+m_p-m_{\rm D}]/T},`}</Eq>
      <Tx>{R`其中 3/4 来自自旋态数（D 为 3，$p$、$n$ 各为 2：$3/(2\cdot2)$）。前因子中可令 $m_{\rm D}=2m_n=2m_p$；但指数中 $m_n+m_p$ 与 $m_{\rm D}$ 的微小差别至关重要——指数的宗量正是氘的结合能 $B_{\rm D}=2.22\,\mathrm{MeV}$（Box 4.1）除以温度。因此只要平衡成立，`}</Tx>
      <Eq n="4.15" title="氘的 Saha 方程" say={R`平衡时，氘相对中子 $\times$ 质子的丰度由结合能的玻尔兹曼因子 $e^{B_{\rm D}/T}$ 决定，但被一个随 $(m_pT)^{-3/2}$ 的相空间因子压低。`}>{R`\frac{n_{\rm D}}{n_nn_p}=\frac34\left(\frac{4\pi}{m_pT}\right)^{3/2}e^{B_{\rm D}/T}.`}</Eq>
      <Tx>{R`中子和质子的密度都正比于重子密度。用 $n_n\simeq n_p\simeq n_{\rm b}=\eta_{\rm b}${N0}_\gamma^{(0)}$，粗略地有`}</Tx>
      <Eq n="4.16" keyEq title="氘丰度估计" say={R`氘占重子的比例 $\approx$ 重子–光子比 $\times$ 相空间压低 $\times$ 结合能指数：小系数 $\eta_{\rm b}$ 必须被很大的 $e^{B_{\rm D}/T}$ 补偿，氘才可能多起来。`}>{R`\frac{n_{\rm D}}{n_{\rm b}}\sim\eta_{\rm b}\left(\frac{T}{m_p}\right)^{3/2}e^{B_{\rm D}/T}.`}</Eq>
      <Derivation title={R`从 \eqref{4.15} 到 \eqref{4.16}（只保留量级）`} collapsed steps={[
        { tex: R`\frac{n_{\rm D}}{n_{\rm b}}=n_{\rm b}\cdot\frac{n_{\rm D}}{n_nn_p}\cdot\frac{n_nn_p}{n_{\rm b}^2}\sim\eta_{\rm b}\frac{2T^3}{\pi^2}\cdot\frac34\left(\frac{4\pi}{m_pT}\right)^{3/2}e^{B_{\rm D}/T}`, why: R`$n_nn_p/n_{\rm b}^2=X_n(1-X_n)=\mathcal O(1)$，略去。` },
        { tex: R`=\eta_{\rm b}\left(\frac{T}{m_p}\right)^{3/2}e^{B_{\rm D}/T}\times\underbrace{\frac{3}{2\pi^2}(4\pi)^{3/2}}_{\approx6.8}`, why: R`$T^3\cdot(m_pT)^{-3/2}=(T/m_p)^{3/2}$；数值因子 $\mathcal O(1)$ 在量级估计中略去。` },
      ]} />
      <Tx>{R`**解读：氘瓶颈。**只要 $B_{\rm D}/T$ 不太大，这个式子就被很小的前因子主宰——回忆 \eqref{4.10} 中重子–光子比 $\eta_{\rm b}$ 有多小。所以**小的重子–光子比抑制了核的产生，直到温度降到远低于核结合能**。物理上：光子实在太多了。尽管能量达到核结合能量级的光子处在玻色–爱因斯坦分布被指数压低的尾部（因为 $T\ll B_{\rm D}$），任何一个核在一个哈勃时间内仍至少会遇到一个这样的光子，直到温度进一步下降。因此在 0.1 MeV 以上，几乎所有重子都以中子和质子的形式存在。温度降到约 0.1 MeV 时，氘和氦被产生，但此时反应率已太低，造不出更重的元素。`}</Tx>
      <Box kind="example" title="交互：氘瓶颈与 $T_{\rm nuc}$">
        <Tx>{R`下图画出氘的平衡丰度估计 \eqref{4.16}。红线为 $\eta_{\rm b}$ 取滑块值时的 $n_{\rm D}/n_{\rm b}$，灰色虚线为假想的 $\eta_{\rm b}=1$。竖线标出由 \eqref{4.29} 解出的 $T_{\rm nuc}$（右边 = 1 的温度）与 $B_{\rm D}=2.22\,\mathrm{MeV}$。默认 $\eta_{\rm b}=6\times10^{-10}$ 时 $T_{\rm nuc}\approx0.062\,\mathrm{MeV}$，即 $B_{\rm D}/T_{\rm nuc}\approx36$；若光子与重子一样多，氘在 $T\approx0.17\,\mathrm{MeV}$ 就能存活。把 $\eta_{\rm b}$ 改变 10 倍，$T_{\rm nuc}$ 只变约 10%——这就是 BBN 预言对 $\eta_{\rm b}$ 只有对数依赖的根源。`}</Tx>
        <DeuteriumPlot />
      </Box>
      <Tx>{R`\figref{4.1} 解释了为什么停在氦：质量数 5 没有稳定同位素，所以重元素无法通过 $^4\mathrm{He}+\mathrm p\to X$ 产生。恒星中，三 $\alpha$ 过程 $^4\mathrm{He}+{}^4\mathrm{He}+{}^4\mathrm{He}\to{}^{12}\mathrm C$ 能造出重元素；但在早期宇宙，等到 $^4$He 能够形成时，密度已经低到三个核无法在一个哈勃时间内彼此相遇。`}</Tx>

      <Sub n="4.2.1" title="Neutron abundance" zh="中子丰度">
        <Tx>{R`**我们要做的。**先求中子–质子比。质子可以通过弱相互作用转化为中子，例如 $\mathrm p+e^-\to\mathrm n+\nu_e$。我们将看到，这类反应使中子和质子保持平衡，直到 $T\sim\mathrm{MeV}$；此后必须解 \eqref{4.8} 来追踪中子丰度。

**第一步：平衡值。**由 \eqref{4.5}，在非相对论极限（$E_i(p)=m_i+p^2/2m_i$）下质子/中子的平衡比为`}</Tx>
        <Eq n="4.17" say={R`平衡时质子与中子之比 = 静质量的玻尔兹曼因子之比 $\times$ 各自动能分布积分之比。`}>{R`\frac{${N0}_p^{(0)}}{${N0}_n^{(0)}}=\frac{e^{-m_p/T}\int dp\,p^2e^{-p^2/2m_pT}}{e^{-m_n/T}\int dp\,p^2e^{-p^2/2m_nT}}.`}</Eq>
        <Tx>{R`这里的积分正比于 $m^{3/2}$。由此产生的比值 $(m_p/m_n)^{3/2}$ 与 1 足够接近（差 0.2%），可以忽略质量差。但在指数中质量差非常重要，于是剩下`}</Tx>
        <Eq n="4.18" say={R`平衡时质子比中子多一个因子 $e^{\mathcal Q/T}$：温度远高于 1.293 MeV 时两者一样多，温度降低后中子按玻尔兹曼因子迅速减少。`}>{R`\frac{${N0}_p^{(0)}}{${N0}_n^{(0)}}=e^{\mathcal Q/T}`}</Eq>
        <Tx>{R`其中 $\mathcal Q\equiv m_n-m_p=1.293\,\mathrm{MeV}$。所以高温时中子和质子一样多；温度降到 1 MeV 以下，中子比例下降。如果弱相互作用足够高效、能**无限期**维持平衡，中子比例将降到零（即使自由中子是稳定的）。本节的主要任务是弄清：在弱相互作用并没有那么高效的真实世界里会发生什么。定义`}</Tx>
        <Eq n="4.19" say="中子丰度：所有核子中中子所占的比例。">{R`X_n\equiv\frac{n_n}{n_n+n_p},`}</Eq>
        <Tx>{R`即中子占全部核子的比例。平衡时`}</Tx>
        <Eq n="4.20" say={R`若始终处于平衡，中子丰度就是 $1/(1+e^{\mathcal Q/T})$：高温趋于 1/2，低温指数地趋于零。`}>{R`X_n\to X_{n,\rm EQ}\equiv\frac{1}{1+${N0}_p^{(0)}/${N0}_n^{(0)}}.`}</Eq>

        <Tx>{R`**第二步：写出速率方程。**从 \eqref{4.8} 出发，取 1 = 中子、3 = 质子，2、4 = 处于完全平衡的轻子（$n_l=${N0}_l^{(0)}$）。于是`}</Tx>
        <Eq n="4.21" say="中子的共动数目变化 = 由质子转化来的（按平衡比例折算）减去转化成质子的；轻子始终处于平衡，只作为“催化剂”出现。">{R`a^{-3}\frac{d(n_na^3)}{dt}=${N0}_l^{(0)}\langle\sigma v\rangle\left\{\frac{n_p${N0}_n^{(0)}}{${N0}_p^{(0)}}-n_n\right\}.`}</Eq>
        <Tx>{R`我们已求出 $${N0}_n^{(0)}/${N0}_p^{(0)}=e^{-\mathcal Q/T}$；而 $${N0}_l^{(0)}\langle\sigma v\rangle$ 乘的是损失项中的 $n_n$，所以可以把它认作中子→质子的转化率 $\lambda_{np}$。再把左边的 $n_n$ 写成 $(n_n+n_p)X_n$，总密度乘 $a^3$ 是常数，可以提到导数外面，得到`}</Tx>
        <Eq n="4.22" keyEq title="中子丰度方程" say={R`中子比例的变化 = 转化率 $\times$（质子按玻尔兹曼因子变成中子的部分 − 中子变成质子的部分）：转化率很大时 $X_n$ 被钉在平衡值，很小时 $X_n$ 冻结。`}>{R`\frac{dX_n}{dt}=\lambda_{np}\left\{(1-X_n)e^{-\mathcal Q/T}-X_n\right\}.`}</Eq>
        <Derivation title={R`从 \eqref{4.21} 到 \eqref{4.22}`} collapsed steps={[
          { tex: R`n_n=(n_n+n_p)X_n,\qquad (n_n+n_p)a^3=\text{const}`, why: R`核子总数守恒（此时还没有核，衰变暂不计）。` },
          { tex: R`a^{-3}\frac{d(n_na^3)}{dt}=(n_n+n_p)\frac{dX_n}{dt}`, why: R`常数提到导数外。` },
          { tex: R`(n_n+n_p)\frac{dX_n}{dt}=\lambda_{np}\left\{n_pe^{-\mathcal Q/T}-n_n\right\}`, why: R`$\lambda_{np}\equiv${N0}_l^{(0)}\langle\sigma v\rangle$，$${N0}_n^{(0)}/${N0}_p^{(0)}=e^{-\mathcal Q/T}$。` },
          { tex: R`\frac{dX_n}{dt}=\lambda_{np}\left\{(1-X_n)e^{-\mathcal Q/T}-X_n\right\}`, why: R`两边除以 $n_n+n_p$，用 $n_p/(n_n+n_p)=1-X_n$。注意 $\lambda_{np}e^{-\mathcal Q/T}$ 就是质子→中子的率 $\lambda_{pn}$——细致平衡。` },
        ]} />
        <Tx>{R`**第三步：换成温度做时钟。**\eqref{4.22} 是 $X_n$ 关于时间的微分方程。用新的演化变量 $x$ 改写后更容易求解：`}</Tx>
        <Eq n="4.23" say={R`以 $\mathcal Q$ 为单位的“逆温度”：$x$ 随时间单调增大，$x=1$ 对应 $T=1.293\,\mathrm{MeV}$。`}>{R`x\equiv\frac{\mathcal Q}{T}.`}</Eq>
        <Tx>{R`于是 \eqref{4.22} 的左边变成 $\dot x\,dX_n/dx$，我们需要 $\dot x=-x\dot T/T$ 的表达式。因为 $T\propto a^{-1}$，`}</Tx>
        <Eq n="4.24" say="温度按 1/a 下降，所以温度的相对下降率就是哈勃率，而哈勃率由 Friedmann 方程从能量密度得到。">{R`\frac1T\frac{dT}{dt}=-H=-\sqrt{\frac{8\pi G\rho}{3}},`}</Eq>
        <Tx>{R`第二个等号来自 \eqref{3.12}。核合成发生在辐射主导时期，所以能量密度 $\rho$ 主要来自相对论粒子。回忆第 2 章，相对论粒子对能量密度的贡献是`}</Tx>
        <Eq n="4.25" keyEq title={R`有效自由度 $g_*$`} say={R`辐射时代的能量密度 = $\pi^2T^4/30$ $\times$ 有效自由度数：每个相对论玻色自由度算 1，费米自由度打 7/8 折。`}>{R`\begin{aligned}\rho&=\frac{\pi^2}{30}T^4\left[\sum_{s=\rm bosons}g_s+\frac78\sum_{s=\rm fermions}g_s\right]\qquad(s\ \text{relativistic})\\&\equiv g_*\frac{\pi^2}{30}T^4.\end{aligned}`}</Eq>
        <Tx>{R`**有效相对论自由度数** $g_*$（effective number of relativistic degrees of freedom）是温度的函数。在 1 MeV 量级的温度，参与贡献的有：光子（$g_\gamma=2$）、中微子（$g_\nu=6$）、电子和正电子（$g_{e^+}=g_{e^-}=2$）。加起来得 $g_*\simeq2+\frac78(6+4)=10.75$，在我们关心的温度范围内大致不变。于是 \eqref{4.22} 变为`}</Tx>
        <Eq n="4.26" keyEq title="以 x 为变量的中子丰度方程" say={R`以逆温度 $x$ 为时钟：右边的系数 $x\lambda_{np}/H(x=1)$ 是“转化率/膨胀率”，它随 $x$ 增大而迅速变小，使 $X_n$ 最终脱离平衡值 $e^{-x}/(1+e^{-x})$。`}>{R`\frac{dX_n}{dx}=\frac{x\lambda_{np}}{H(x=1)}\left\{e^{-x}-X_n(1+e^{-x})\right\}.`}</Eq>
        <Derivation title={R`从 \eqref{4.22} 到 \eqref{4.26}`} collapsed steps={[
          { tex: R`H=\sqrt{\frac{8\pi G}{3}g_*\frac{\pi^2}{30}}\,T^2=\sqrt{\frac{4\pi^3Gg_*}{45}}\,\frac{\mathcal Q^2}{x^2}\equiv\frac{H(x=1)}{x^2}`, why: R`辐射主导，$g_*$ 为常数；$H(x=1)$ 的数值见 \eqref{4.61}：1.13 s$^{-1}$。` },
          { tex: R`\dot x=-x\frac{\dot T}{T}=xH=\frac{H(x=1)}{x}`, why: R`由 \eqref{4.24}。` },
          { tex: R`\frac{dX_n}{dx}=\frac{1}{\dot x}\frac{dX_n}{dt}=\frac{x\lambda_{np}}{H(x=1)}\left\{(1-X_n)e^{-x}-X_n\right\}`, why: R`代入 \eqref{4.22}，$\mathcal Q/T=x$。` },
          { tex: R`(1-X_n)e^{-x}-X_n=e^{-x}-X_n(1+e^{-x})`, why: R`整理即得 \eqref{4.26}。` },
        ]} />

        <Tx>{R`**第四步：解读与数值解。**在习题 4.5 中你将数值积分这个方程来追踪中子丰度。结论是：$T=\mathcal Q$（$x=1$）时，转化率为 5.5 s$^{-1}$，比膨胀率（1.13 s$^{-1}$）大一些。但温度降到 1 MeV 以下后，**反应率按 $T^3$ 下降，而膨胀率只按 $T^2$ 下降**，转化变得低效，我们预期 $X_n$ 会偏离平衡值。`}</Tx>
        <Figure n="4.2" caption={R`独立数值模型：以 $x=\mathcal Q/T$ 为时钟，比较平衡中质比与式 (4.26) 的解，并加入自由中子衰变，截止于核合成温度。可调 $g_*,\tau_n,T_{\rm nuc}$，图例读出氦质量分数估计。该近似没有模拟核合成开始后中子迅速被锁入核的阶段，也不重现 Steigman（2007）的完整丰度史。`} illustration={<NeutronPlot />} />
        <Tx>{R`\figref{4.2} 给出了 $X_n$ 的演化（实际上是一个更精确的计算，包括正确的量子统计、非零电子质量和随温度变化的 $g_*$）。中子比例确实在温度降到 1 MeV 以下后脱离平衡：一旦温度降到 0.5 MeV 以下，它**冻结**在约 0.15（对应纵轴 $n/p$ 比值 0.18）。这里"冻结"（freezing out / freeze-out）指的是湮灭（此处为转化）反应无力把粒子丰度维持在平衡值。

在 0.1 MeV 以下，两个尚未计入的反应变得重要：**中子衰变**（$\mathrm n\to\mathrm p+e^-+\bar\nu$）和**氘的产生**（$\mathrm n+\mathrm p\to\mathrm D+\gamma$），即 BBN 的开始。氘的产生——下一小节的主题——导致了 $T\simeq0.1\,\mathrm{MeV}$ 处的陡降。`}</Tx>
        <Box kind="physics" title="冻结值为什么约是 0.15？">{R`一个粗略但有用的判据：转化率等于膨胀率时冻结。由 \eqref{4.60} 与 $H=H(x=1)/x^2$，$\lambda_{np}/H=0.255\,(12+6x+x^2)/x^3$：$x=1$ 时为 4.8，$x\approx1.9$（$T\approx0.7\,\mathrm{MeV}$）时降到 1。此时平衡值 $X_{n,\rm EQ}=1/(1+e^{1.9})\approx0.13$，已与冻结值 0.15 相当接近；实际冻结值略大，是因为在 $\lambda_{np}\sim H$ 之前 $X_n$ 就已开始落后于平衡值，而之后转化仍以减弱的速率持续一段时间。精确值只能靠数值积分。`}</Box>
        <Tx>{R`**第五步：加上中子衰变。**衰变可以平凡地加进来：把中子丰度乘上因子 $e^{-t/\tau_n}$，中子寿命 $\tau_n=(885.7\pm0.8)\,\mathrm s$。到衰变变得重要时，电子和正电子已经湮灭，所以 \eqref{4.25} 中的 $g_*$ 变为 3.36，时间–温度关系为（习题 2.5）`}</Tx>
        <Eq n="4.27" say={R`e$^\pm$ 湮灭之后，宇宙年龄与温度平方成反比：温度降到 0.1 MeV 时宇宙约 132 秒大。`}>{R`t=132\,\mathrm s\left(\frac{0.1\,\mathrm{MeV}}{T}\right)^2.`}</Eq>
        <Derivation title={R`验证 \eqref{4.27} 的系数 132 s`} collapsed steps={[
          { tex: R`t=\frac{1}{2H},\qquad H=\sqrt{\frac{4\pi^3Gg_*}{45}}\,T^2`, why: R`辐射主导时 $a\propto t^{1/2}$，$H=1/2t$。` },
          { tex: R`H(0.1\,\mathrm{MeV})=1.13\,\mathrm s^{-1}\times\sqrt{\frac{3.36}{10.75}}\times\left(\frac{0.1}{1.293}\right)^2=3.79\times10^{-3}\,\mathrm s^{-1}`, why: R`以 \eqref{4.61} 的 $H(x=1)$ 按 $\sqrt{g_*}T^2$ 标度。` },
          { tex: R`t=\frac{1}{2\times3.79\times10^{-3}\,\mathrm s^{-1}}=132\,\mathrm s`, why: R`严格说 e$^\pm$ 湮灭后 $T\propto a^{-1}$ 才成立，所以这一关系只适用于 $T\ll m_e$。` },
        ]} />
        <Tx>{R`我们很快会看到，氘及其他轻元素的产生在 $T_{\rm nuc}\sim0.07\,\mathrm{MeV}$ 才真正开始。到那时，衰变已使中子比例减少了一个因子 $\exp[-(132/886)(0.1/0.07)^2]=0.74$。所以核合成开始时的中子丰度是 $0.15\times0.74$，即`}</Tx>
        <Eq n="4.28" keyEq title="核合成开始时的中子丰度" say="冻结值 0.15 再被中子衰变打 0.74 折：核合成开始时，每 9 个核子中约有 1 个是中子。">{R`X_n(T_{\rm nuc})=0.11.`}</Eq>
        <Tx>{R`接下来转向轻元素的形成，看看这个数字意味着什么。`}</Tx>
      </Sub>

      <Sub n="4.2.2" title="Light element abundances" zh="轻元素丰度">
        <Tx>{R`**瞬时核合成近似。**近似描述轻元素产生的一个有效办法是：假设它在某个温度 $T_{\rm nuc}$ **瞬时**发生——在这一温度，能量上的优势恰好补偿了很小的重子–光子比。以氘为例，以 \eqref{4.16} 为指导：当 \eqref{4.16} 右边达到 1 的量级时，平衡氘丰度与重子丰度同量级（也就是说，如果宇宙维持平衡，所有中子和质子都会结成氘），即`}</Tx>
        <Eq n="4.29" title="核合成温度" say={R`核合成开始的条件：重子–光子比的对数加上相空间因子的对数，恰好被 $-B_{\rm D}/T$ 抵消——$\eta_{\rm b}$ 越小，$T_{\rm nuc}$ 越低，但只是对数地降低。`}>{R`\ln(\eta_{\rm b})+\frac32\ln(T_{\rm nuc}/m_p)\sim-\frac{B_{\rm D}}{T_{\rm nuc}}.`}</Eq>
        <Tx>{R`\eqref{4.29} 表明氘的产生发生在 $T_{\rm nuc}\sim0.07\,\mathrm{MeV}$。`}</Tx>
        <Box kind="example" title="解 \eqref{4.29}">{R`取 $\eta_{\rm b}=6\times10^{-10}$：$\ln\eta_{\rm b}=-21.2$。试 $T=0.065\,\mathrm{MeV}$：$\frac32\ln(0.065/938)=-14.4$，左边 $=-35.6$；右边 $-2.22/0.065=-34.2$。左边略小，需要稍低的温度；迭代收敛于 $T_{\rm nuc}\approx0.062\,\mathrm{MeV}$，即 $B_{\rm D}/T_{\rm nuc}\approx36$。原书取整为 $\sim0.07\,\mathrm{MeV}$——这个估计本来就只到量级（忽略了 \eqref{4.16} 中约 7 的数值因子，也没有考虑氘被迅速消耗）；用 0.062 MeV 计算的衰变因子是 0.68，$Y_P$ 约 0.20。`}</Box>
        <Tx>{R`**几乎所有中子都进了氦-4。**由于氦的结合能比氘大，指数因子 $e^{B/T}$ 偏向氦而非氘。确实，\figref{4.3} 显示氦几乎紧接着氘产生。在 $T\sim T_{\rm nuc}$ 时剩余的中子几乎全部被加工成 $^4$He。因为每个 $^4$He 含两个中子，最终 $^4$He 的（数）丰度等于 $T_{\rm nuc}$ 时中子丰度的一半。结果常以**质量分数**给出：`}</Tx>
        <Eq n="4.30" keyEq title="原初氦质量分数" say="每个氦-4 核含 2 个中子、质量为 4 个核子：氦的质量分数等于核合成时中子比例的两倍。">{R`Y_P\equiv\frac{4n({}^4{\rm He})}{n_{\rm b}}=2X_n(T_{\rm nuc}),`}</Eq>
        <Tx>{R`由此得最终的氦质量分数 0.22。这个仅靠解一个微分方程得到的粗略估计，与完整数值计算惊人地一致，后者可拟合为（Olive, 2000）`}</Tx>
        <Eq n="4.31" say={R`完整 BBN 计算的拟合：氦质量分数只随重子–光子比的对数缓慢增加，$\eta_{\rm b}$ 增大 $e$ 倍，$Y_P$ 只增加 0.0135。`}>{R`Y_P=0.2262+0.0135\ln(\eta_{\rm b}/10^{-10}).`}</Eq>
        <Tx>{R`取 $\eta_{\rm b}=6\times10^{-10}$，\eqref{4.31} 给出 $Y_P=0.250$。

**只有对数依赖。**这个结果的一个重要特征是它只**对数地**依赖重子比例（通过 $\eta_{\rm b}$），这一点继承自 \eqref{4.29}。你也许会想：衰变因子对 $T_{\rm nuc}$ 的指数敏感性会把它变成线性依赖。但 $T_{\rm nuc}$ 足够早，此时只有一小部分中子衰变——在这一区间指数函数对时间是线性的。所以最终氦丰度对重子密度只保持对数依赖。这种对 $\Omega_{\rm b}h^2$ 的微弱依赖在图 1.6 中清晰可见；原书该图还比较预言与观测带，二者吻合良好；本页图 1.6 仅画丰度的教学近似，没有观测带。原初氦丰度的最佳指标来自加工最少的气体——其元素组成最接近原初组成，即几乎不含比氦更重的元素。`}</Tx>
        <Figure n="4.3" caption={R`原创核合成路线图：按弱冻结、氘瓶颈开启、加工为氦与反应冻结切换讲解；主结果是氢、氦-4 与微量残余元素。原书 Pospelov 与 Pradler（2010）展示各核素的数值丰度史；此图保留其物理顺序，未把路线图当作丰度计算。`} illustration={<BBNNetworkRedraw />} />
        <Tx>{R`**残余的氘：重子密度的探针。**\figref{4.3} 显示，并非所有氘都被加工成氦。一小部分没有烧掉，只是因为消耗它的反应 $\mathrm D+\mathrm p\to{}^3\mathrm{He}+\gamma$ 并非完全高效。$T_{\rm nuc}$ 之后氘通过这些反应被消耗，但最终冻结在 $3\times10^{-5}$ 量级的质量分数。如果重子密度低，反应进行得更慢，消耗就不那么彻底。所以**低重子密度必然导致更多的氘**；这种敏感性相当显著，如图 1.6 所示。再加上可以通过遥远类星体光谱中的吸收线测量高红移气体云中的氘（见 §1.3），氘丰度成为重子密度的重要探针。`}</Tx>
        <Box kind="data" title="BBN 的两个角色">{R`◆ **氦（$Y_P$）**——对 $\eta_{\rm b}$ 不敏感，主要检验 BBN 本身的物理：膨胀率（$g_*$，从而额外的相对论粒子）、中子寿命、弱相互作用。

◆ **氘（D/H）**——对 $\eta_{\rm b}$ 极敏感（约 $\propto\eta_{\rm b}^{-1.6}$），给出 $\Omega_{\rm b}h^2\simeq0.022$，与 CMB 独立测得的值一致——这是标准宇宙学模型最漂亮的交叉检验之一（第 1 章图 1.6）。`}</Box>
      </Sub>
    </Sec>);
}
