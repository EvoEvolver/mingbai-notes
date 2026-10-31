// §4.4 Dark matter —— 式 (4.45)–(4.57)，图 4.5–4.8；§4.5 Summary
import { Sec, Tx, Eq, Box, Derivation, Figure, Table, C } from "@kit";
import { S } from "./_ch04_notation.jsx";
import { WimpPlot } from "./_ch04_plots.jsx";

const R = String.raw;
const N0 = S.n0, x = S.xm;

export function Sec44() {
  return (
    <Sec n="4.4" title="Dark matter" zh="暗物质"
      gist={R`把速率方程用于假想的重粒子 $X$（WIMP）：对 $Y=n_X/T^3$ 得 Riccati 方程 \eqref{4.49}，冻结后 $Y_\infty\simeq x_f/\lambda$；由此 $\Omega_X\propto1/\langle\sigma v\rangle$ 而与 $m_X$ 显式无关，弱作用量级的截面 $\sim2\times10^{-26}\,\mathrm{cm^3\,s^{-1}}$ 恰好给出 $\Omega_Xh^2\simeq0.1$（\eqref{4.57}）。`}
      why={R`暗物质的证据全是引力性的，对它"是什么"几乎毫无提示；热冻结图景把可观测的遗迹丰度与微观的湮灭截面联系起来，给实验指出了目标。`}
      gives={["4.47", "4.49", "4.50", "4.53", "4.55", "4.56", "4.57"]}>
      <p className="muted">本节概念：<C id="wimp" /> · <C id="freeze_out" /> · <C id="g_star" /> · <C id="detection" /></p>
      <Tx>{R`**问题。**第 1 章已经看到，宇宙中存在非重子暗物质的有力证据，$\Omega_{\rm c}\simeq0.26$。证据很有说服力，但纯粹是引力性的，所以对暗物质的身份几乎没有提供线索。这一事实加上理论家的创造力，使得已提出的暗物质候选者在质量上跨越了约 **90 个数量级**！相应地也有一大批实验在搜寻可能构成暗物质的粒子（或其他实体）。不可能逐一介绍所有候选者的物理动机，所以本节主体只聚焦一种：**弱相互作用大质量粒子**（weakly interacting massive particle, WIMP）。几十年来 WIMP 一直是暗物质的头号热门，也许至今仍是；但在相关质量范围内迟迟找不到新粒子的证据，大大降低了它的胜算，并促使学界寻找其他候选者。尽管如此，用本章发展的工具，很容易理解 WIMP 为何曾享有如此地位。

**故事梗概。**一般的 WIMP "$X$" 的故事始于很早的时期（很高的温度）：那时 $X$ 与宇宙等离子体的其余部分处于平衡；随后，当湮灭反应率降到膨胀率以下时，它经历了**冻结**（freeze-out）。事实上，如果这种粒子无限期保持平衡，它的丰度将被 $e^{-m_X/T}$ 压低——可观测宇宙中将一个 $X$ 粒子都没有。所以本节的目的是：为这样的粒子解 Boltzmann 方程，确定冻结时期及其**遗迹丰度**（relic abundance）。希望是：通过要求遗迹丰度给出 $\Omega_X\simeq0.26$，我们能了解这种粒子的一些基本性质，例如质量 $m_X$ 和湮灭截面；进而也许能在实验室中探测到它。`}</Tx>

      <Tx>{R`**写出速率方程。**在一般的 WIMP 图景中，两个重粒子 $X$ 可以湮灭成两个属于标准模型的轻粒子（基本无质量）$\psi$（例如光子、中微子或夸克）。假设轻粒子与宇宙等离子体耦合得非常紧密，处于完全平衡（化学平衡和动力学平衡），$n_\psi=${N0}_\psi^{(0)}$。于是只剩一个未知量：重粒子的丰度 $n_X$。用 \eqref{4.8} 求解：`}</Tx>
      <Eq n="4.45" say={R`$X$ 的共动数目变化 = 热平均截面 $\times$（平衡时的产生率 $(${N0}_X^{(0)})^2$ − 实际的湮灭率 $n_X^2$）：$X$ 多于平衡值时净湮灭，少于时净产生。`}>{R`a^{-3}\frac{d(n_Xa^3)}{dt}=\langle\sigma v\rangle\left\{\left(${N0}_X^{(0)}\right)^2-(n_X)^2\right\}.`}</Eq>
      <Tx>{R`进一步，回忆温度通常按 $a^{-1}$ 标度；把左边括号里的 $n_Xa^3$ 乘、除以 $T^3$，就可以把 $(aT)^3$ 移到导数外面，剩下 $T^3d(n_X/T^3)/dt$。于是定义`}</Tx>
      <Eq n="4.46" say={R`把 $X$ 的数密度用 $T^3$ 归一：只要 $T\propto1/a$，$Y$ 就正比于一个共动体积中的 $X$ 粒子数，没有反应时保持不变。`}>{R`Y\equiv\frac{n_X}{T^3}.`}</Eq>
      <Tx>{R`$Y$ 的微分方程为`}</Tx>
      <Eq n="4.47" say={R`$Y$ 的变化率 = $T^3\langle\sigma v\rangle$ $\times$（$Y_{\rm EQ}^2-Y^2$）。`}>{R`\frac{dY}{dt}=T^3\langle\sigma v\rangle\{Y_{\rm EQ}^2-Y^2\},`}</Eq>
      <Tx>{R`其中 $Y_{\rm EQ}\equiv${N0}_X^{(0)}/T^3$。与 §4.2 一样，引入一个新的时间变量较方便：`}</Tx>
      <Eq n="4.48" say={R`以 $X$ 的质量为单位的逆温度：$${x}\ll1$ 时 $X$ 是相对论的，$${x}\gg1$ 时非相对论、平衡丰度被 $e^{-${x}}$ 压低。`}>{R`${x}\equiv m_X/T`}</Eq>
      <Tx>{R`因为 $m_X$ 大致设定了我们感兴趣时期的温度尺度。极高温对应 $${x}\ll1$，此时反应进行得很快，$Y\simeq Y_{\rm EQ}$；由于 $X$ 在这些时期是相对论的，\eqref{4.5} 的 $m\ll T$ 极限意味着 $Y\simeq1$（量级）。$${x}$ 大时，平衡丰度 $Y_{\rm EQ}$ 被指数压低（$e^{-${x}}$）。最终 $X$ 粒子会变得稀少，因为能量足够产生一对 $X$（需要质心能量 $2m_X$）的标准模型粒子已经不够多了。

**换到 $x$ 为时钟。**从 $t$ 换到 $${x}$ 需要雅可比因子 $d${x}/dt=H${x}$。对质量为 GeV 或更大的 WIMP，暗物质的产生发生在辐射时代深处，能量密度按 $T^4$ 标度，所以 $H=H(m_X)/${x}^2$。于是演化方程变成`}</Tx>
      <Eq n="4.49" keyEq title="WIMP 的 Riccati 方程" say={R`以 $${x}$ 为时钟，$Y$ 向平衡值弛豫的“速率”是 $\lambda/${x}^2$：$\lambda$ 很大时 $Y$ 紧贴 $Y_{\rm EQ}$，但 $Y_{\rm EQ}$ 指数下降后湮灭跟不上，$Y$ 停下来。`}>{R`\frac{dY}{d${x}}=-\frac{\lambda}{${x}^2}\left\{Y^2-Y_{\rm EQ}^2\right\},`}</Eq>
      <Tx>{R`其中湮灭率与膨胀率之比用下式参数化：`}</Tx>
      <Eq n="4.50" keyEq title="湮灭率/膨胀率" say={R`$\lambda$ 衡量“在 $T=m_X$ 时，一个 $X$ 粒子（若数密度 $\sim m_X^3$）一个哈勃时间内湮灭多少次”：典型 WIMP 的 $\lambda$ 高达 $10^{11}$ 量级。`}>{R`\lambda\equiv\frac{m_X^3\langle\sigma v\rangle}{H(m_X)}.`}</Eq>
      <Derivation title={R`从 \eqref{4.45} 到 \eqref{4.49}`} collapsed steps={[
        { tex: R`a^{-3}\frac{d(n_Xa^3)}{dt}=a^{-3}\frac{d}{dt}\left[\frac{n_X}{T^3}(aT)^3\right]=T^3\frac{dY}{dt}`, why: R`$aT$ 为常数（忽略粒子湮灭对光子的加热）。` },
        { tex: R`\frac{dY}{dt}=T^3\langle\sigma v\rangle\{Y_{\rm EQ}^2-Y^2\}`, why: R`两边除以 $T^3$，$${N0}_X^{(0)}=T^3Y_{\rm EQ}$，$n_X=T^3Y$：即 \eqref{4.47}。` },
        { tex: R`\frac{d${x}}{dt}=-\frac{${x}}{T}\frac{dT}{dt}=H${x},\qquad H=\frac{H(m_X)}{${x}^2}`, why: R`$T\propto a^{-1}$；辐射主导 $H\propto T^2$。` },
        { tex: R`\frac{dY}{d${x}}=\frac{T^3\langle\sigma v\rangle}{H${x}}\{Y_{\rm EQ}^2-Y^2\}=\frac{m_X^3\langle\sigma v\rangle}{${x}^3}\frac{${x}^2}{H(m_X)${x}}\{\cdots\}=-\frac{\lambda}{${x}^2}\{Y^2-Y_{\rm EQ}^2\}`, why: R`$T^3=m_X^3/${x}^3$。` },
      ]} />
      <Tx>{R`在许多理论中 $\lambda$ 是常数；但在另一些理论中，热平均截面依赖温度，这会使下面的数值略有变化，定性解不变。`}</Tx>

      <Tx>{R`**冻结的解析处理。**\eqref{4.49} 是 **Riccati 方程**的一种形式，一般没有解析解。但这里我们可以利用对冻结过程的理解，得到最终冻结丰度 $Y_\infty\equiv Y(${x}=\infty)$ 的解析表达式。用 \eqref{4.49} 的语言重温一下这种理解：$${x}\sim1$ 时左边量级为 $Y$，右边为 $Y^2\lambda$。我们将看到 $\lambda$ 通常很大，所以只要 $Y$ 不太小，右边必须靠 $Y=Y_{\rm EQ}$ 让自己为零。到后期，随着 $Y_{\rm EQ}$ 急剧下降，右边各项不再远大于左边。事实上冻结之后很久，$Y$ 将远大于 $Y_{\rm EQ}$：$X$ 粒子无法足够快地湮灭以维持平衡。所以后期`}</Tx>
      <Eq n="4.51" say={R`冻结后平衡丰度已可忽略，只剩湮灭项：$Y$ 的减少 $\propto Y^2$，而且由于 $1/${x}^2$ 因子越来越慢。`}>{R`\frac{dY}{d${x}}\simeq-\frac{\lambda Y^2}{${x}^2}\qquad(${x}\gg1).`}</Eq>
      <Tx>{R`从冻结时期 $x_f$ 积分到很晚的时刻 $${x}=\infty$，得到`}</Tx>
      <Eq n="4.52" say={R`冻结后 $1/Y$ 线性增加：从冻结时刻到无穷远，$1/Y$ 一共只增加 $\lambda/x_f$——湮灭在冻结后仍持续，但总量有限。`}>{R`\frac1{Y_\infty}-\frac1{Y_f}=\frac{\lambda}{x_f}.`}</Eq>
      <Derivation title={R`积分 \eqref{4.51}`} collapsed steps={[
        { tex: R`-\frac{dY}{Y^2}=\lambda\frac{d${x}}{${x}^2}\ \Rightarrow\ d\left(\frac1Y\right)=-\lambda\,d\left(\frac1{${x}}\right)`, why: R`分离变量。` },
        { tex: R`\frac1{Y_\infty}-\frac1{Y_f}=-\lambda\left[\frac1{${x}}\right]_{x_f}^{\infty}=\frac{\lambda}{x_f}`, why: R`从 $x_f$ 积到 $\infty$。` },
      ]} />
      <Tx>{R`通常冻结时的 $Y$（记为 $Y_f$）明显大于 $Y_\infty$，所以一个简单的近似是`}</Tx>
      <Eq n="4.53" keyEq title="遗迹丰度" say={R`最终的共动丰度 $\approx$ 冻结时刻 $x_f$ 除以湮灭强度 $\lambda$：截面越大，留下的越少。`}>{R`Y_\infty\simeq\frac{x_f}{\lambda}.`}</Eq>
      <Tx>{R`这用冻结温度表示了 $X$ 的标度丰度，而冻结温度我们还没有确定。虽然可以做更精确的确定（习题 4.8），对暗物质问题的简单量级估计是 $x_f\simeq20$。`}</Tx>
      <Figure n="4.5" caption={R`重的稳定粒子 $X$ 的丰度随逆温度 $m_X/T$ 的变化。（原书图）点线为平衡丰度；两条实线分别对应 $\lambda$（湮灭率与哈勃率之比）的两个不同取值（$10^5$ 与 $10^9$）。**交互版**用后向 Euler 法数值解 \eqref{4.49}（与原书图一致，取 $Y_{\rm EQ}=(${x}/2\pi)^{3/2}e^{-${x}}$，即 \eqref{4.5} 非相对论极限、$g=1$）。灰色实线/虚线为原书的 $\lambda=10^5$ 与 $10^9$；红线为滑块选定的 $\lambda$（默认 $1.26\times10^{11}$，即 $m_X=100\,\mathrm{GeV}$、$\langle\sigma v\rangle=2\times10^{-26}\,\mathrm{cm^3s^{-1}}$ 的典型 WIMP），绿色虚线为解析估计 $x_f/\lambda$（$x_f=20$）；第二个滑块 $m_X$ 只用于把 $\lambda$ 换算成 $\langle\sigma v\rangle$（取 $g_*=100$，\eqref{4.50}）并由 \eqref{4.54}–\eqref{4.55} 给出 $\Omega_Xh^2$。图例给出数值解的 $Y_\infty$ 与冻结点 $x_f$（定义为 $Y=2Y_{\rm EQ}$ 处）。核对：$\lambda=10^5$ 时 $Y(100)=8\times10^{-5}$，$\lambda=10^9$ 时 $Y(100)=2.0\times10^{-8}$、$Y_\infty=1.7\times10^{-8}$，与原图读数（$\approx10^{-4}$、$\approx2\times10^{-8}$）一致；$m_X=100\,\mathrm{GeV}$、$\langle\sigma v\rangle=2\times10^{-26}\,\mathrm{cm^3s^{-1}}$ 对应 $\lambda=1.26\times10^{11}$，数值解给出 $x_f\approx22$、$\Omega_Xh^2\approx0.09$，与 \eqref{4.57} 的 0.1 相符。`} interactive={<WimpPlot />} />
      <Tx>{R`\figref{4.5} 给出 \eqref{4.49} 对两个不同 $\lambda$ 值的数值解。丰度确实追随平衡丰度直到 $m_X/T\sim10$，之后趋于常数。粗略估计 $Y_\infty\sim x_f/\lambda$ 是遗迹丰度的合理近似。注意**截面越大的粒子（如图中 $\lambda=10^9$）冻结越晚，而更晚的冻结意味着更低的遗迹丰度**。`}</Tx>
      <Box kind="physics" title="为什么截面越大，遗迹越少？">{R`冻结发生在湮灭率 $n_X\langle\sigma v\rangle$ 降到 $H$ 时。截面大，就需要 $n_X$ 更小才能让湮灭率降到 $H$——而在平衡中 $n_X$ 随 $e^{-${x}}$ 下降，所以必须等到更晚（$x_f$ 更大）。$x_f$ 只对数地依赖 $\lambda$（习题 4.8：$x_f\approx\ln[\lambda/(2\pi)^{3/2}]+\frac12\ln x_f$），而冻结时的数密度 $\propto H/\langle\sigma v\rangle$ 却反比于截面——这就是 $Y_\infty\simeq x_f/\lambda$ 的含义。`}</Box>

      <Tx>{R`**从 $Y_\infty$ 到今天的密度。**还需要一点物理才能确定这些重粒子遗迹今天的丰度。冻结之后，重粒子密度只是按 $a^{-3}$ 下降。所以它今天（$a_0=1$）的能量密度等于 $m_X(a_1/a_0)^3$ 乘以它在 $a_1$ 时的数密度，其中 $a_1$ 对应一个足够晚、$Y$ 已达到渐近值 $Y_\infty$ 的时刻。那时的数密度是 $Y_\infty T_1^3$，所以`}</Tx>
      <Eq n="4.54" say={R`今天的 $X$ 能量密度 = 质量 $\times$ 冻结丰度 $\times$ $T_0^3$，再乘以 $(a_1T_1/a_0T_0)^3\approx1/30$：后者计入了冻结后其他粒子湮灭对光子的加热。`}>{R`\rho_{X,0}=m_XY_\infty T_0^3\left(\frac{a_1T_1}{a_0T_0}\right)^3\simeq\frac{m_XY_\infty T_0^3}{30}.`}</Eq>
      <Tx>{R`**第二个等号并不平凡。**你可能以为 $aT$ 在宇宙演化中保持常数，比值 $a_1T_1/a_0T_0$ 应为 1。并非如此，原因与 CMB 和中微子温度不同完全一样。第 2 章看到，光子被 e$^\pm$ 湮灭加热，而已经脱耦的中微子没有。类似地，随着宇宙膨胀，光子会被质量介于 1 MeV 与 $m_X$ 之间的"粒子动物园"的湮灭加热（我们假设 $m_X$ 大于 $\sim100\,\mathrm{GeV}$），所以 $T$ 并不简单地按 $a^{-1}$ 下降。在习题 4.9 中你可以证明，结果是 $(a_1T_1/a_0T_0)^3\simeq1/30$。最后，代入 $Y_\infty$ 的表达式并除以 $\rho_{\rm cr}$，得到 $X$ 在今天贡献的临界密度比例：`}</Tx>
      <Eq n="4.55" say={R`WIMP 的密度参数：用 $Y_\infty\approx x_f/\lambda$ 和 $\lambda$ 的定义代入后，质量的一次方与 $\lambda$ 中的 $m_X^3$ 相约，只剩 $H(m_X)/m_X^2$。`}>{R`\begin{aligned}\Omega_X&=\frac{x_f}{\lambda}\frac{m_XT_0^3}{30\rho_{\rm cr}}\\&=\frac{H(m_X)x_fT_0^3}{30m_X^2\langle\sigma v\rangle\rho_{\rm cr}}.\end{aligned}`}</Eq>
      <Tx>{R`要求出重粒子今天的密度，就需要计算温度等于 $X$ 质量时的哈勃率 $H(m_X)$，为此需要 $T=m_X$ 时的能量密度。辐射时代的能量密度由 \eqref{4.25} 给出，$g_*$ 是温度的函数。因此`}</Tx>
      <Eq n="4.56" keyEq title="WIMP 遗迹密度" say={R`因为 $H(m_X)\propto\sqrt{g_*}\,m_X^2$，质量完全消掉：遗迹密度只取决于湮灭截面（以及对数依赖的 $x_f$ 和 $g_*$）。`}>{R`\Omega_X=\left[\frac{4\pi^3Gg_*(m_X)}{45}\right]^{1/2}\frac{x_fT_0^3}{30\langle\sigma v\rangle\rho_{\rm cr}}.`}</Eq>
      <Tx>{R`我们看到 $\Omega_X$ **不显式依赖 $X$ 粒子的质量**。（通过冻结温度 $x_f$ 和 $g_*$——后者在 $T=m_X$ 处取值——有微弱的隐式质量依赖。）所以决定遗迹丰度的主要是**截面**。

**WIMP 奇迹。**现在看看要得到今天的暗物质、即 $\Omega_Xh^2\simeq0.1$，需要什么量级。在暗物质产生的温度 $T\sim100\,\mathrm{GeV}$，$g_*(m_X)$ 包括标准模型所有粒子（三代夸克与轻子、光子、胶子、弱规范玻色子和 Higgs 玻色子）的贡献，量级为 100。用 $g_*(m_X)$ 和 $x_f$ 的标称值归一化，得到`}</Tx>
      <Eq n="4.57" keyEq title="WIMP 奇迹" say={R`要让 WIMP 恰好构成全部暗物质，热平均湮灭截面需约 $2\times10^{-26}\,\mathrm{cm^3/s}$——正好是弱相互作用量级：这一“巧合”就是 WIMP 奇迹。`}>{R`\Omega_Xh^2=0.1\left(\frac{x_f}{20}\right)\left(\frac{g_*(m_X)}{100}\right)^{1/2}\frac{2\times10^{-26}\,\mathrm{cm^3\,sec^{-1}}}{\langle\sigma v\rangle}`}</Eq>
      <Derivation title={R`把 \eqref{4.56} 化成 \eqref{4.57}`} collapsed steps={[
        { tex: R`\left[\frac{4\pi^3g_*}{45}\right]^{1/2}G^{1/2}=\frac{1.66\sqrt{g_*}}{m_{\rm Pl}}=\frac{16.6}{1.22\times10^{19}\,\mathrm{GeV}}=1.36\times10^{-18}\,\mathrm{GeV^{-1}}`, why: R`$G=m_{\rm Pl}^{-2}$，$g_*=100$。` },
        { tex: R`T_0^3=\left(\frac{2.35\times10^{-4}\,\mathrm{eV}}{1.973\times10^{-5}\,\mathrm{eV\,cm}}\right)^3=1.69\times10^3\,\mathrm{cm^{-3}},\qquad \rho_{\rm cr}=1.05\times10^{-5}h^2\,\mathrm{GeV\,cm^{-3}}`, why: R`自然单位下 $T^3$ 是数密度量纲。` },
        { tex: R`\Omega_Xh^2=\frac{1.36\times10^{-18}\times20\times1.69\times10^3}{30\times1.05\times10^{-5}}\,\frac{\mathrm{GeV^{-2}}}{\langle\sigma v\rangle}=1.45\times10^{-10}\,\frac{\mathrm{GeV^{-2}}}{\langle\sigma v\rangle}`, why: R`$x_f=20$。` },
        { tex: R`1\,\mathrm{GeV^{-2}}=(\hbar c)^2c=(1.973\times10^{-14}\,\mathrm{cm})^2\times3\times10^{10}\,\mathrm{cm\,s^{-1}}=1.17\times10^{-17}\,\mathrm{cm^3\,s^{-1}}`, why: R`恢复 $\hbar$、$c$，使 $\langle\sigma v\rangle$ 有 $\mathrm{cm^3\,s^{-1}}$ 的量纲。` },
        { tex: R`\Omega_Xh^2=\frac{1.69\times10^{-27}\,\mathrm{cm^3\,s^{-1}}}{\langle\sigma v\rangle}=0.085\times\frac{2\times10^{-26}\,\mathrm{cm^3\,s^{-1}}}{\langle\sigma v\rangle}`, why: R`与 \eqref{4.57} 的 0.1 在本估算精度内一致（$x_f$、$1/30$ 等因子本就只到 10%–20%；交互图的完整数值解给出 0.09）。` },
      ]} />
      <Tx>{R`这里我们恢复了光速，使 $\langle\sigma v\rangle$ 的量纲正确。这个估计在 $\langle\sigma v\rangle\sim10^{-26}\,\mathrm{cm^3/s}$ 时给出正确的遗迹丰度，这被视为一个好兆头：有几种理论预言了截面在这一范围的粒子。

**暗物质的温度。**除了暗物质的丰度，我们还能算出另一个重要性质：今天暗物质的温度。习题 4.10 中你会发现它非常低：WIMP 是**冷暗物质**（cold dark matter）的一个例子，而这正是解释今天宇宙中结构所需要的。`}</Tx>

      <Tx>{R`**三种探测途径。**决定 WIMP 遗迹密度的那个相互作用——湮灭成标准模型粒子——同时打开了三条探测途径，如\figref{4.6} 所示。`}</Tx>
      <Figure n="4.6" caption={R`WIMP（$X$）在早期宇宙中可以湮灭成标准模型（SM）粒子，从而得到一个可计算的遗迹丰度（本节所述）。同类过程使**间接探测**成为可能：观测太空中两个暗物质粒子湮灭的产物。湮灭由某种未知的基本相互作用传递（中央阴影区域）。它也使逆过程成为可能：两个标准模型粒子产生两个 WIMP——对撞机上正在进行这类搜寻。最后，第三种方法是把相互作用"侧过来"：寻找被 WIMP 撞击的原子核的反冲，即**直接探测**。`} width="60%" />
      <Tx>{R`**(1) 间接探测。**第一种途径利用湮灭过程本身：太空中两个暗物质粒子湮灭，产生会在探测器中留下信号的标准模型粒子。信号的具体性质取决于模型细节；例如湮灭成夸克–反夸克的暗物质粒子最终会产生包括光子在内的一串较轻粒子。Fermi 大面积望远镜（Fermi-LAT）等对高能（$\gamma$ 射线）光子敏感的望远镜可以探测这种信号，称为**间接探测**（indirect detection，相对于下面更"直接"的测量）。\figref{4.7} 给出了 Fermi 数据对 6 种湮灭道的限制。这些限制来自对邻近小星系的观测——由恒星速度弥散推断，这些矮星系的暗物质含量相对很高。注意，间接探测更善于排除**低质量**暗物质粒子（因为在暗物质质量密度固定时，相互作用率按 $n_X^2\propto1/m_X^2$ 标度）；对许多湮灭道，它确实已排除了 $m_X\sim10\,\mathrm{GeV}$ 以下的区域。`}</Tx>
      <Figure n="4.7" caption={R`Fermi $\gamma$ 射线观测对暗物质湮灭截面的限制，作为质量的函数，分别对应不同湮灭道（各面板标出末态：$\nosym{e^+e^-}$、$\nosym{\mu^+\mu^-}$、$\nosym{\tau^+\tau^-}$、$\nosym{u\bar u}$、$\nosym{b\bar b}$、$\nosym{W^+W^-}$）。实线以上的区域被排除；水平虚线是"目标值"，即产生正确遗迹丰度所需的截面（\eqref{4.57}）。绿/黄带为期望限制的 68%/95% 范围。引自 Ackermann et al. (2014)。`} width="72%" />
      <Tx>{R`**(2) 对撞机产生与 (3) 直接探测。**\figref{4.6} 显示另外两种探测可能：一是对撞机中的逆过程——高能质子对撞可以产生成对的大质量暗物质粒子。二是把相互作用"侧过来"：银河系中入射的暗物质粒子把部分动能传给大型探测器中的原子核。**直接探测**（direct detection）实验利用的就是这一过程。由于事件率极低，探测这类反应极具挑战；但过去几十年取得了巨大进展：引入从背景中分离信号的新技术、建造更大的探测器、并把它们放在地下以进一步降低背景。\figref{4.8} 从几个方面显示了这种进步。首先，本书第一版（约比图 4.8 早十年出版）中的类似图给出的截面限制在 $10^{-41}\,\mathrm{cm^2}$ 以上。（注意：直接探测约束的暗物质–核子截面不同于决定遗迹丰度的湮灭截面，尽管在给定模型中两者都可以算出。）仅十年间限制就改进了近三个数量级。虚线等值线表示 Schumann (2012) 预测的 LUX、XENON 等实验投入运行后限制将达到的位置；而到 2019 年，实验确实已接近这些预期，又收紧了三个数量级。图底部的阴影区域尚未达到，但很可能会达到。再往下，宇宙中微子的背景为直接探测所能探测的 WIMP 截面设下了天然的实验极限。`}</Tx>
      <Figure n="4.8" caption={R`各种低本底实验室实验对暗物质–核子散射截面的限制（实线以上的截面被排除），作为 WIMP 质量的函数。等值线为一类具有天然 WIMP 候选者的超对称模型中预期的参数空间（Buchmueller et al., 2012）。虚线为作图时的预期灵敏度，此后这些限制已基本达到，显示出该领域的快速进展。引自 Schumann (2012)。`} width="68%" />
      <Tx>{R`**WIMP 之外。**鉴于 WIMP 模型正被直接探测实验迅速排除、对撞机上也没有新重粒子的证据，学界正在研究 WIMP 之外的各种暗物质。热冻结图景对暗物质粒子的质量和截面给出了很紧的约束；但也有**非热**的暗物质产生机制。一个例子是**轴子**（axion）：一种出于独立理由而假设的基本粒子；如果存在，它会在夸克凝聚成重子的相变中产生。作为玻色子，轴子产生于基态，形成玻色–爱因斯坦凝聚。轴子的一个有趣特点是：尽管非常轻（$\ll1\,\mathrm{eV}$），它们仍可充当冷暗物质；寻找轴子暗物质证据的实验正在进行。与此同时，宇宙学家已开始研究轻至 $10^{-21}\,\mathrm{eV}$、重至数个太阳质量（以黑洞形式）的暗物质候选者！WIMP 遭遇的困境打开了大量新的暗物质候选者和创新探测方法的可能性。`}</Tx>
    </Sec>);
}

export function Sec45() {
  return (
    <Sec n="4.5" title="Summary" zh="小结"
      gist={R`三段"失衡"的历史：$T\sim0.1\,\mathrm{MeV}$ 的核合成（约 1/4 的重子质量成为 $^4$He）、$z_*\sim1100$ 的复合与退耦、以及（可能的）WIMP 冻结（$\langle\sigma v\rangle\sim2\times10^{-26}\,\mathrm{cm^3s^{-1}}$）。`}
      why={R`把本章三个应用并列，看清它们共同的结构：反应率掉到膨胀率之下 → 丰度冻结。`}
      gives={["4.30", "4.57"]}>
      <Table head={[R`时期`, R`反应（表 4.1）`, R`温度 / 红移`, R`冻结的量`, R`今天的遗迹`]} rows={[
        [R`中子冻结`, R`$\mathrm n+\nu_e\leftrightarrow\mathrm p+e^-$ 等`, R`$T\lesssim0.5\,\mathrm{MeV}$，$t\sim1\,\mathrm s$`, R`$X_n\approx0.15$`, R`—`],
        [R`核合成`, R`$\mathrm{n+p}\to{\rm D}+\gamma\to\cdots\to{}^4{\rm He}$`, R`$T_{\rm nuc}\approx0.07\,\mathrm{MeV}$，$t\approx270\,\mathrm s$`, R`$X_n(T_{\rm nuc})=0.11$`, R`$Y_P\approx0.25$，D/H$\sim3\times10^{-5}$`],
        [R`复合 / 退耦`, R`$e+\mathrm p\leftrightarrow{\rm H}+\gamma$`, R`$T_*\approx0.25\,\mathrm{eV}$，$z_*\sim1100$`, R`$X_e\sim10^{-4}$–$10^{-3}$`, R`CMB`],
        [R`WIMP 冻结`, R`$X+X\leftrightarrow\psi+\psi$`, R`$T\approx m_X/20$`, R`$Y_\infty\simeq x_f/\lambda$`, R`$\Omega_{\rm c}\approx0.26$`],
      ]} />
      <Tx>{R`**核合成。**宇宙中的轻元素形成于宇宙等离子体温度约 0.1 MeV 之时。BBN 完成后，大约四分之一的重子质量以 $^4$He 的形式存在，其余为自由质子，只有微量的氘、$^3$He 和锂。

**复合。**宇宙一直保持电离，直到温度降到远低于氢的电离能。复合时期——电子与质子结合成中性氢——位于红移 $z_*\sim1100$，对应温度 $T_*\sim0.25\,\mathrm{eV}$。复合之前，光子、电子和质子因康普顿散射和库仑散射紧密耦合；此后光子在宇宙中自由穿行、不再相互作用，所以我们今天观测到的 CMB 光子提供了 $z_*$ 时宇宙的一张绝佳快照。

**共同的主题。**核合成与复合的细节都深受这样一个事实影响：所涉反应最终变得太慢，跟不上膨胀率。这一特征也可能是宇宙中暗物质产生的原因。我们探讨了一个流行的图景：一种大质量、中性、稳定的粒子在温度降到远低于其质量时停止湮灭。这种粒子今天的丰度可以用其湮灭截面表示，如 \eqref{4.57}。截面越大，湮灭越有效，今天的丰度越低。粗略地说，需要热平均截面 $\langle\sigma v\rangle\sim2\times10^{-26}\,\mathrm{cm^3\,sec^{-1}}$ 才能与今天观测到的暗物质丰度相符。这样的截面以及所需的稳定、中性粒子，在超对称等标准模型的扩展中相当自然地出现；但迄今为止，无论在实验室、天体物理对象还是加速器中，都没有找到它们的（非引力）证据（\figref{4.7}–\figref{4.8}）。因此也不应忽视其他有充分动机的、暗物质以非热方式产生的图景，例如轴子。

**对后续各章意味着什么。**尽管存在大量可行的暗物质模型，我们在后续各章推导的宇宙学可观测量的预言**完全不依赖暗物质的微观本质**。它们只依赖暗物质的两个性质：它是**冷**的、它是**弱相互作用**的。除此之外，所有预言只依赖一个已被很好约束的数——暗物质的总量，用 $\Omega_{\rm c}$ 参数化。`}</Tx>
    </Sec>);
}
