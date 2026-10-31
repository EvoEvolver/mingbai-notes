// §4.3 Recombination —— 式 (4.32)–(4.44)，图 4.4
import { Sec, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { S } from "./_ch04_notation.jsx";
import { RecombPlot } from "./_ch04_plots.jsx";

const R = String.raw;
const N0 = S.n0, A2 = S.a2;

export function Sec43() {
  return (
    <Sec n="4.3" title="Recombination" zh="复合"
      gist={R`电子与质子结合成中性氢：Saha 方程 \eqref{4.34} 给出复合发生在 $T\approx0.3\,\mathrm{eV}\ll\epsilon_0=13.6\,\mathrm{eV}$；但要正确追踪偏离平衡的 $X_e$ 必须解 \eqref{4.36}；比较汤姆孙散射率与膨胀率 \eqref{4.43}，光子在复合期间（$X_e\lesssim10^{-2}$）退耦。`}
      why={R`复合与退耦的时刻和细节直接决定我们今天看到的 CMB 各向异性图样（第 9 章）；它也是"光子太多 → 结合被推迟"在原子尺度上的重演。`}
      gives={["4.33", "4.34", "4.36", "4.39", "4.43", "4.44"]}>
      <p className="muted">本节概念：<C id="saha" /> · <C id="recombination" /> · <C id="decoupling" /> · <C id="freeze_out" /></p>
      <Tx>{R`**BBN 之后的宇宙。**BBN 完成后，宇宙中的普通物质由质子、电子、光子、氦核和微量更重的核组成（中微子早已脱耦，不再起作用）。下一个重要时期是：光子与电子之间的康普顿散射不再足以让光子与重子紧密耦合（电子与重子之间则始终通过库仑散射紧密耦合）。这一**退耦**（decoupling）时期发生在温度降到约 1 eV 以下、自由电子数急剧减少之时。

**又一次"光子太多"。**$T\ge1\,\mathrm{eV}$ 时中性氢仍然很少。能量上当然偏向形成中性氢（结合能 $\epsilon_0=13.6\,\mathrm{eV}$），但极高的光子/重子比——以及相应地处于玻色–爱因斯坦分布高能尾部的大量光子——保证了任何新形成的氢原子都会立刻被电离。这一现象与前面看到的轻核产生被推迟**完全相同**，只是在原子尺度上重演。最终，能量高于 $\epsilon_0$ 的光子数被红移得足够少，中性氢才得以形成。这一时期称为**复合**（recombination），尽管这显然是个误称：电子和质子是**结合**，而不是**再**结合——这是宇宙中第一次形成中性原子。`}</Tx>
      <Box kind="note" title="氦先复合，但可以先忽略">{R`氦是上面定性叙述（以及下面定量叙述）的又一个附注。氦原子俘获第一个电子比氢原子早得多，因为结合能为 $Z^2\epsilon_0=54.4\,\mathrm{eV}$；第二个电子（使氦变为中性的那个）的结合能 24 eV 也大于 13.6 eV，所以氦完全复合成中性也早于氢。但氦原子相对较少，绝大多数电子仍是自由的。就退耦而言，氦的复合只起很小的作用，所以下面我们忽略氦。（要对 CMB 各向异性做百分之一精度的预言，则必须计入氦。）`}</Box>

      <Tx>{R`**第一步：平衡（Saha）近似。**只要反应 $e^-+\mathrm p\leftrightarrow\mathrm H+\gamma$ 保持平衡（下文 $p$ 代表自由质子，H 代表中性氢，即一个结合了电子的质子），\eqref{4.9}（取 1 = $e$、2 = $p$、3 = H）就保证`}</Tx>
      <Eq n="4.32" say={R`复合反应处于化学平衡：自由电子 $\times$ 自由质子 / 中性氢，等于它们零化学势平衡密度的同一组合（光子因子相消）。`}>{R`\frac{n_en_p}{n_{\rm H}}=\frac{${N0}_e^{(0)}${N0}_p^{(0)}}{${N0}_{\rm H}^{(0)}}.`}</Eq>
      <Tx>{R`这就是 **Saha 方程**。还可以更进一步：宇宙电中性保证 $n_e=n_p$。定义**自由电子比例**（free electron fraction）`}</Tx>
      <Eq n="4.33" keyEq title="自由电子比例" say="自由电子占全部氢核（自由质子 + 中性氢）的比例：1 表示完全电离，0 表示完全中性。">{R`X_e\equiv\frac{n_e}{n_e+n_{\rm H}}=\frac{n_p}{n_p+n_{\rm H}},`}</Eq>
      <Tx>{R`分母等于质子总数（仍忽略氦）。对 \eqref{4.32} 右边各量用 \eqref{4.5}，得到`}</Tx>
      <Eq n="4.34" keyEq title="Saha 方程的解" say={R`平衡电离度：左边 $X_e^2/(1-X_e)$ 等于“电子相空间密度 $\times$ 电离能的玻尔兹曼压低”除以氢核总密度；因为重子极稀（$\propto\eta_{\rm b}$），右边在 $T\sim\epsilon_0$ 时大得惊人，只能 $X_e\approx1$。`}>{R`\frac{X_e^2}{1-X_e}=\frac{1}{n_e+n_{\rm H}}\left[\left(\frac{m_eT}{2\pi}\right)^{3/2}e^{-[m_e+m_p-m_{\rm H}]/T}\right]`}</Eq>
      <Derivation title={R`从 \eqref{4.32} 到 \eqref{4.34}`} collapsed steps={[
        { tex: R`\frac{${N0}_e^{(0)}${N0}_p^{(0)}}{${N0}_{\rm H}^{(0)}}=\frac{g_eg_p}{g_{\rm H}}\left(\frac{m_em_p}{m_{\rm H}}\frac{T}{2\pi}\right)^{3/2}e^{-[m_e+m_p-m_{\rm H}]/T}`, why: R`三者都非相对论，用 \eqref{4.5}。` },
        { tex: R`\frac{g_eg_p}{g_{\rm H}}=\frac{2\cdot2}{4}=1,\qquad \frac{m_p}{m_{\rm H}}\simeq1`, why: R`H 基态有 4 个自旋态；前因子中忽略 H 与 $p$ 的微小质量差（指数中则保留：$m_e+m_p-m_{\rm H}=\epsilon_0$）。` },
        { tex: R`\frac{n_en_p}{n_{\rm H}}=\frac{X_e^2(n_e+n_{\rm H})^2}{(1-X_e)(n_e+n_{\rm H})}=\frac{X_e^2}{1-X_e}(n_e+n_{\rm H})`, why: R`$n_e=n_p=X_e(n_e+n_{\rm H})$，$n_{\rm H}=(1-X_e)(n_e+n_{\rm H})$。两边相等即得 \eqref{4.34}。` },
      ]} />
      <Tx>{R`这里用了熟悉的近似：前因子中忽略 H 与 $p$ 的微小质量差。指数的宗量是 $-\epsilon_0/T$。

**为什么复合远晚于 $T\sim\epsilon_0$？**分母 $n_e+n_{\rm H}$（或 $n_p+n_{\rm H}$）等于重子密度 $\eta_{\rm b}n_\gamma\sim10^{-9}T^3$。所以当温度在 $\epsilon_0$ 量级时，右边约为 $10^9(m_e/T)^{3/2}\simeq10^{15}$。这时 \eqref{4.34} 只有在左边分母极小、即 $X_e$ 非常接近 1 时才能满足：**所有氢都是电离的**。只有当温度降到远低于 $\epsilon_0$，才会发生可观的复合。（交互图中可读出：Saha 解的 $X_e=1/2$ 发生在 $z\approx1380$，$T\approx0.32\,\mathrm{eV}\approx\epsilon_0/42$。）`}</Tx>

      <Tx>{R`**第二步：为什么 Saha 不够？**随着 $X_e$ 下降，复合率（$\propto X_e^2$）也下降，平衡越来越难维持。所以要准确追踪自由电子比例，必须像处理中子–质子比那样解 Boltzmann 方程。此时 \eqref{4.8} 对电子密度变为`}</Tx>
      <Eq n="4.35" say={R`电子的速率方程：右边第一项是中性氢被电离（产生自由电子），第二项是电子与质子复合（消耗自由电子）；第二行把它写成电离比例 $X_e$ 的形式。`}>{R`\begin{aligned}a^{-3}\frac{d(n_ea^3)}{dt}&=${N0}_e^{(0)}${N0}_p^{(0)}\langle\sigma v\rangle\left\{\frac{n_{\rm H}}{${N0}_{\rm H}^{(0)}}-\frac{n_e^2}{${N0}_e^{(0)}${N0}_p^{(0)}}\right\}\\&=n_{\rm b}\langle\sigma v\rangle\left\{(1-X_e)\left(\frac{m_eT}{2\pi}\right)^{3/2}e^{-\epsilon_0/T}-X_e^2n_{\rm b}\right\}\end{aligned}`}</Eq>
      <Tx>{R`最后一行成立，是因为比值 $${N0}_e^{(0)}${N0}_p^{(0)}/${N0}_{\rm H}^{(0)}$ 等于 \eqref{4.34} 方括号中的项。同时，$n_{\rm b}a^3$ 为常数，把 $n_e$ 写成 $n_{\rm b}X_e$ 后可以穿过左边的导数，于是`}</Tx>
      <Eq n="4.36" keyEq title="自由电子比例的演化方程" say={R`电离比例的变化 = 中性原子被电离的速率 $(1-X_e)\beta$ − 电子–质子复合的速率 $X_e^2n_{\rm b}${A2}^{(2)}$：前者随温度指数下降，后者随 $X_e^2$ 下降。`}>{R`\frac{dX_e}{dt}=\left\{(1-X_e)\beta-X_e^2n_{\rm b}${A2}^{(2)}\right\}`}</Eq>
      <Tx>{R`其中**电离率**通常记为`}</Tx>
      <Eq n="4.37" say={R`电离率：一个中性氢原子单位时间被光子电离的概率，含有电离能的玻尔兹曼压低 $e^{-\epsilon_0/T}$；它与复合率通过细致平衡相联系。`}>{R`\beta\equiv\langle\sigma v\rangle\left(\frac{m_eT}{2\pi}\right)^{3/2}e^{-\epsilon_0/T}`}</Eq>
      <Tx>{R`而**复合率**（复合系数）为`}</Tx>
      <Eq n="4.38" say={R`复合系数就是电子–质子复合的热平均截面 $\times$ 速度；上标 (2) 提醒：只计复合到 $n\ge2$ 激发态的那部分。`}>{R`${A2}^{(2)}\equiv\langle\sigma v\rangle.`}</Eq>
      <Tx>{R`**为什么上标是 (2)？**因为**复合到基态（$n=1$）不起作用**。复合到基态会产生一个电离光子，这个光子立刻电离另一个中性原子。这种复合的净效果为零：不会因此形成新的中性原子。复合唯一能推进的途径是**俘获到氢的某个激发态**；在很好的近似下（见习题 4.7），这一速率为`}</Tx>
      <Eq n="4.39" title="复合系数" say={R`到激发态的复合系数 $\propto\alpha^2/m_e^2$（汤姆孙截面量级），并随温度降低而缓慢增大（$\propto(\epsilon_0/T)^{1/2}\ln(\epsilon_0/T)$）——慢电子更容易被俘获。`}>{R`${A2}^{(2)}=9.78\frac{\alpha^2}{m_e^2}\left(\frac{\epsilon_0}{T}\right)^{1/2}\ln\left(\frac{\epsilon_0}{T}\right).`}</Eq>
      <Box kind="example" title="量级">{R`$T=0.3\,\mathrm{eV}$ 时 $\epsilon_0/T=45$：$${A2}^{(2)}=9.78\times\frac{(1/137)^2}{(0.511\,\mathrm{MeV})^2}\times6.7\times3.8=5.1\times10^{-14}\,\mathrm{eV}^{-2}$。乘以 $(\hbar c)^2c=11.7\,\mathrm{cm^3\,s^{-1}\,eV^2}$ 得 $${A2}^{(2)}\approx6\times10^{-13}\,\mathrm{cm^3\,s^{-1}}$。此时 $n_{\rm b}\approx2.5\times10^{-7}\,(1+z)^3\,\mathrm{cm^{-3}}\approx500\,\mathrm{cm^{-3}}$（$z\approx1300$），所以完全电离时单个电子的复合率 $n_{\rm b}${A2}^{(2)}\approx3\times10^{-10}\,\mathrm s^{-1}$，而 $H\approx7\times10^{-14}\,\mathrm s^{-1}$——起初复合率比膨胀率大数千倍，平衡是好近似；但 $X_e$ 降到 $10^{-3}$–$10^{-4}$ 时（$z\sim800$–$500$）有效复合率 $X_en_{\rm b}${A2}^{(2)}$ 就与 $H$ 相当了，$X_e$ 因而冻结。`}</Box>

      <Tx>{R`**第三步：数值解与 Peebles 修正。**Saha 近似 \eqref{4.34} 能很好地预言复合的**红移**，但当电子比例下降、系统偏离平衡后就失效了。因此 $X_e$ 的详细演化必须通过数值积分 \eqref{4.36} 得到（习题 4.7）。计入复合率中额外的复杂因素（见习题 4.7 中的 Peebles 因子 $C$）以及氦之后的数值结果见 \figref{4.4}。`}</Tx>
      <Figure n="4.4" caption={R`自由电子比例随红移的变化。（原书图）实线为基准宇宙学中的完整数值解（由 CLASS 程序给出），点线为平衡结果（Saha 近似 \eqref{4.34}）。复合发生在 $z\sim1000$，对应 $T\simeq0.23\,\mathrm{eV}$。平衡结果正确地给出了复合的红移，但没有给出 $X_e$ 的演化，而后者对精确预言 CMB 各向异性很重要。**交互版**（不含氦，$h=0.7$，$\Omega_\Lambda=1-\Omega_{\rm m}$）：点线为 Saha 解；红线为 \eqref{4.36} 乘以 Peebles 因子 \eqref{4.62}–\eqref{4.63} 的数值解；蓝色虚线为不乘 $C$ 的 \eqref{4.36}（即习题 4.7(c)）。图例给出 Saha 解与 Peebles 解过半（$X_e=1/2$）的红移 $z_{1/2}$ 及冻结值 $X_e(z=100)$；竖线标出由 Peebles 解算出 $n_e\sigma_{\rm T}/H=1$ 的退耦红移 $z_{\rm dec}$。默认参数下：Saha 在 $z\approx1380$ 过半，Peebles 解在 $z\approx1270$ 过半、在 $z=1000$ 时 $X_e\approx0.04$（原书 CLASS 曲线约 0.05），冻结值 $X_e(z=100)\approx2.5\times10^{-4}$（原书约 $2.6\times10^{-4}$），退耦在 $z\approx900$、$X_e\approx10^{-2}$。不乘 $C$ 时复合进行得过快（"瓶颈"被忽略），$z=1000$ 时 $X_e$ 已降到 $2\times10^{-3}$。`} interactive={<RecombPlot />} />
      <Box kind="physics" title="Peebles 瓶颈：为什么真实的复合比 Saha 慢">{R`复合到激发态之后，原子还得落到基态才算真正"中性"。从 $n=2$ 到 $n=1$ 有两条路：(i) 放出一个 Lyman $\alpha$ 光子——但这个光子会被周围大量基态原子共振吸收，把另一个原子激发到 $n=2$，净效果为零，除非膨胀把它红移出共振线（速率 $\Lambda_\alpha$）；(ii) $2s\to1s$ 双光子衰变（$\Lambda_{2\gamma}=8.227\,\mathrm{s^{-1}}$），两个光子都不足以再激发。与此同时，处于 $n=2$ 的原子（结合能只有 $\epsilon_0/4=3.4\,\mathrm{eV}$）很容易被 CMB 光子再电离（速率 $\beta^{(2)}=\beta e^{3\epsilon_0/4T}$）。Peebles 因子 $C=(\Lambda_\alpha+\Lambda_{2\gamma})/(\Lambda_\alpha+\Lambda_{2\gamma}+\beta^{(2)})$ 就是"成功落到基态"的概率；复合早期 $\beta^{(2)}$ 很大、$C\ll1$，复合被大大拖慢。这正是图 4.4 中实线远比点线平缓的原因。`}</Box>
      <Tx>{R`**为什么这很重要。**我们已经看到中子/质子比影响今天的轻元素丰度。类似地，自由电子丰度的演化对观测宇宙学有重大影响。$z_*\sim1000$ 的复合与光子从物质中**退耦**联系在一起。（由图 1.4 可以注意到：尽管光子在 $z\sim1000$ 就停止被电子散射，电子却在此后很久仍被光子散射很多次。这并不矛盾——光子比电子多得多。）这种退耦反过来直接影响我们今天观测到的 CMB 各向异性图样。如今，CMB 各向异性的数值计算采用对 $X_e(t)$ 时间演化的精细计算，精度达到百分之一以下。`}</Tx>

      <Tx>{R`**第四步：光子何时退耦？**有了对 $X_e$ 演化的清楚理解，就可以确定退耦时期。粗略地说，当光子被电子康普顿散射的速率小于膨胀率时，退耦发生。（第 9 章将借助**可见度函数**——光子在给定红移最后一次被散射的概率——给出更精确的退耦量度，并说明今天的 CMB 光子最可能在比这里的简单估计略高的红移处最后散射。）散射率为`}</Tx>
      <Eq n="4.40" say={R`一个光子单位时间被自由电子散射的次数 = 自由电子数密度 $\times$ 汤姆孙截面（$\times c$）；自由电子数又等于电离比例 $\times$ 重子数。`}>{R`n_e\sigma_{\rm T}=X_en_{\rm b}\sigma_{\rm T}`}</Eq>
      <Tx>{R`其中 $\sigma_{\rm T}=0.665\times10^{-24}\,\mathrm{cm^2}$ 是**汤姆孙截面**（Thomson cross section）；我们继续忽略氦，即假设氢核总数（自由质子 + 氢原子）等于总重子数。由于重子密度与临界密度之比为 $m_pn_{\rm b}/\rho_{\rm cr}=\Omega_{\rm b}a^{-3}$，可以在 \eqref{4.40} 中用 $\Omega_{\rm b}$ 消去 $n_{\rm b}$：`}</Tx>
      <Eq n="4.41" say={R`把重子数密度用 $\Omega_{\rm b}h^2$ 表示：光子散射率（以每厘米计）随宇宙收缩按 $a^{-3}$ 增长。`}>{R`n_e\sigma_{\rm T}=7.477\times10^{-30}\,\mathrm{cm^{-1}}\,X_e\,\Omega_{\rm b}h^2\,a^{-3}.`}</Eq>
      <Tx>{R`除以膨胀率得`}</Tx>
      <Eq n="4.42" say={R`散射率与膨胀率之比：先用今天的哈勃率归一（得到数值 0.0692），再乘以 $H_0/H$ 的演化因子。`}>{R`\frac{n_e\sigma_{\rm T}}{H}=\frac{n_e\sigma_{\rm T}}{H_0}\frac{H_0}{H}=0.0692\,a^{-3}X_e\,\Omega_{\rm b}h\frac{H_0}{H}.`}</Eq>
      <Derivation title={R`\eqref{4.41}、\eqref{4.42} 中的数值`} collapsed steps={[
        { tex: R`n_{\rm b}=\frac{\rho_{\rm cr}\Omega_{\rm b}}{m_p}a^{-3}=\frac{1.879\times10^{-29}h^2\,\mathrm{g\,cm^{-3}}}{1.673\times10^{-24}\,\mathrm g}\Omega_{\rm b}a^{-3}=1.12\times10^{-5}\,\Omega_{\rm b}h^2a^{-3}\,\mathrm{cm^{-3}}`, why: R`同习题 4.6。` },
        { tex: R`n_e\sigma_{\rm T}=1.12\times10^{-5}\times0.665\times10^{-24}\,X_e\Omega_{\rm b}h^2a^{-3}\,\mathrm{cm^{-1}}=7.47\times10^{-30}\,\mathrm{cm^{-1}}X_e\Omega_{\rm b}h^2a^{-3}`, why: R`与 \eqref{4.41} 一致（原书 7.477 用了略不同的常数）。` },
        { tex: R`\frac{H_0}{c}=\frac{100h\,\mathrm{km\,s^{-1}}}{2.998\times10^5\,\mathrm{km\,s^{-1}}\times3.086\times10^{24}\,\mathrm{cm}}=1.081\times10^{-28}h\,\mathrm{cm^{-1}}`, why: R`散射率除以 $H_0/c$（两者都以 cm$^{-1}$ 计）。` },
        { tex: R`\frac{7.477\times10^{-30}}{1.081\times10^{-28}}=0.0692`, why: R`$\Omega_{\rm b}h^2/h=\Omega_{\rm b}h$，即得 \eqref{4.42}。` },
      ]} />
      <Tx>{R`右边的比值依赖于哈勃率，它由式 (1.3) 给出。从该式或图 1.3 可以看出，早期的主要贡献来自物质或辐射，所以 $H/H_0=\Omega_{\rm m}^{1/2}a^{-3/2}[1+a_{\rm eq}/a]^{1/2}$。因此`}</Tx>
      <Eq n="4.43" keyEq title="散射率/膨胀率" say={R`$z\approx1000$ 时，完全电离的等离子体中光子每个哈勃时间被散射上百次；这个比值 $\propto X_e(1+z)^{3/2}$，所以只要 $X_e$ 降到约 $10^{-2}$，光子就退耦了。`}>{R`\frac{n_e\sigma_{\rm T}}{H}=123X_e\left(\frac{\Omega_{\rm b}h^2}{0.022}\right)\left(\frac{0.14}{\Omega_{\rm m}h^2}\right)^{1/2}\left(\frac{1+z}{1000}\right)^{3/2}\left[1+\frac{1+z}{3360}\frac{0.14}{\Omega_{\rm m}h^2}\right]^{-1/2}.`}</Eq>
      <Box kind="warning" title="疑似数值勘误：123 应约为 129">{R`由 \eqref{4.42} 直接计算：$0.0692\times\dfrac{0.022}{\sqrt{0.14}}\times1000^{3/2}=0.0692\times0.0588\times31623=128.7$。而且原书随后的 \eqref{4.44} 中的 39 正是用 $\approx129$ 得到的：$1000\times128.7^{-2/3}=39.2$（若用 123 则为 40.4）。交互图中的退耦红移直接由 \eqref{4.40} 与完整的 $H(z)$ 计算，不受此影响。这一 4% 的差别对本节的定性结论没有任何影响。`}</Box>
      <Tx>{R`**解读。**在大红移 $z\gg10^3$ 处 $X_e=1$，所以散射率远大于膨胀率。当 $z$ 降到 $10^3$，$X_e$ 开始陡降；\eqref{4.43} 表明，当 $X_e$ 降到约 $10^{-2}$ 以下时，散射率降到膨胀率以下——这就是光子退耦的时期。由 \figref{4.4} 可见，$X_e$ 很快从 1 降到 $10^{-3}$。因此，**退耦发生在复合期间**。

**思想实验：如果宇宙始终电离呢？**让我们忘掉刚才学到的一切，问一问：假如宇宙在整个历史中都保持电离，会发生什么？在这一假想情形中 $X_e=1$，\eqref{4.43} 可以轻易解出退耦红移。令右边等于 1 得`}</Tx>
      <Eq n="4.44" title="无复合时的退耦红移" say={R`即使电子从不与质子结合，膨胀对电子的稀释也会让光子在 $z\approx38$ 左右退耦：散射率 $\propto(1+z)^3$ 下降得比膨胀率 $\propto(1+z)^{3/2}$ 快。`}>{R`1+z_{\rm decouple}=39\left(\frac{0.022}{\Omega_{\rm b}h^2}\right)^{2/3}\left(\frac{\Omega_{\rm m}h^2}{0.14}\right)^{1/3}\qquad(\text{no recombination}).`}</Eq>
      <Tx>{R`\eqref{4.44} 告诉我们：即使气体在宇宙历史中始终电离，光子最终也会退耦，仅仅因为膨胀使得越来越稀薄的电子越来越难被找到。（$z\approx38$ 时 $(1+z)/3360\approx0.01$，\eqref{4.43} 方括号中的辐射修正可以忽略，所以 \eqref{4.44} 只是 $(1+z)^{3/2}\propto(\Omega_{\rm b}h^2)^{-1}(\Omega_{\rm m}h^2)^{1/2}$ 的直接解。）

**再电离。**今天宇宙中弥散气体的大部分是**电离**的。所以在宇宙历史的某个时刻，氢必定发生了**再电离**（reionization）。对最遥远类星体的观测表明再电离发生在 $z>6$（Bouwens et al., 2015）。我们将在第 9、10 章看到，再电离后重新开启的光子康普顿散射会在 CMB 中留下印记，可以用来约束再电离发生的时间；目前最好的测量（Planck Collaboration, 2018b）指向 $z<10$。不过，宇宙最后这次相变的细节仍是一个很大程度上悬而未决的问题。`}</Tx>
    </Sec>);
}
