// §9.4 Diffusion damping —— 式 (9.29)–(9.44)，图 9.8
import { Sec, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { DampingPlot } from "./_ch09_plots.jsx";

const R = String.raw;

export function Sec94() {
  return (
    <Sec n="9.4" title="Diffusion damping" zh="扩散阻尼"
      gist={R`小尺度上势可忽略；保留四极矩 $\Theta_2\simeq-\frac{4k}{9\tau'}\Theta_1$，把重子速度展开到 $1/\tau'^2$，得到色散关系 \eqref{9.39}。频率的一阶修正 $\delta\omega$ 是纯虚数，扰动 $\propto e^{-k^2/k_D^2}$，$k_D$ 由 \eqref{9.42} 给出；全电离近似下 \eqref{9.44}。`}
      why={R`\secref{9.3} 的紧耦合解在 $k\to\infty$ 时振幅不衰减，与观测到的小尺度衰减不符。要描述 $l\gtrsim1000$ 的谱，必须把"紧耦合不是无限紧"这一修正算出来。`}
      gives={["9.29", "9.30", "9.31", "9.32", "9.33", "9.34", "9.35", "9.36", "9.37", "9.38", "9.39", "9.40", "9.41", "9.42", "9.43", "9.44"]}>
      <p className="muted">本节概念：<C id="silk" /> · <C id="tight" /></p>
      <Tx>{R`**第二个要素。**要准确描述 CMB 谱，第二个需要的要素是扩散阻尼。定量分析扩散，必须回到光子分布各阶矩的方程 \eqref{9.11}、\eqref{9.13}、\eqref{9.14}。到现在为止我们忽略了 $\Theta_2$ 及所有更高阶矩，而扩散正是由一个**小但不可忽略的四极矩**刻画的。

**近似方案。**因此要在上一节的方程组中补充四极矩 $\Theta_2$ 的方程。由于只关心小尺度上的现象，任务有所简化：在这些尺度上，引力势 $\Phi$、$\Psi$ 远小于辐射扰动，具体地小 $(aH/k)^2$ 倍（例如见 \eqref{6.80}；第 8 章处理小尺度时已经用过这个结果）。紧耦合下各阶矩的层级——每升高一阶多压低一个 $1/\tau'$——依然成立。所以只需保留 $l=2$ 的矩，更高的都可忽略。在这些近似下`}</Tx>
      <Eq n="9.29" say={R`小尺度上忽略势后的单极方程：密度变化只来自速度散度。`}>{R`\Theta_0' + k\Theta_1 = 0,`}</Eq>
      <Eq n="9.30" say={R`偶极方程：压强梯度 $\frac k3\Theta_0$ 之外，四极矩 $\frac{2k}3\Theta_2$ 提供"黏滞"，散射项把光子拖向重子速度。`}>{R`\Theta_1' + k\left(\frac23\Theta_2 - \frac13\Theta_0\right) = \tau'\left(\Theta_1 - \frac{iu_{\rm b}}{3}\right),`}</Eq>
      <Eq n="9.31" say={R`四极方程：偶极通过自由流产生四极，散射以 $\frac9{10}\tau'$ 的速率把它抹去（$\frac9{10}$ 来自不计偏振的角分布）。`}>{R`\Theta_2' - \frac{2k}{5}\Theta_1 = \frac{9}{10}\tau'\Theta_2.`}</Eq>
      <Tx>{R`这里再次忽略了偏振（计入偏振的效果见 \exref{9.7}）。这三个方程还需补充 $u_{\rm b}$ 的方程，最好写成 \eqref{9.15} 的略微改写：`}</Tx>
      <Eq n="9.32" say={R`重子与光子速度之差由重子惯性（$R/\tau'$ 乘以重子的"加速度"）决定；小尺度上忽略了引力势。`}>{R`3i\Theta_1 + u_{\rm b} = \frac{R}{\tau'}\left[u_{\rm b}{}' + \frac{a'}{a}u_{\rm b}\right],`}</Eq>
      <Tx>{R`其中同样丢掉了引力势。

**WKB 型的时间依赖。**把速度的时间依赖写成`}</Tx>
      <Eq n="9.33" say={R`把扰动写成局域平面波：相位的变化率就是（可能为复数的）频率 $\omega$，其虚部代表阻尼。`}>{R`u_{\rm b} \propto e^{i\int\omega d\tilde\eta}`}</Eq>
      <Tx>{R`其他变量也一样。我们已经知道紧耦合极限下 $\omega\simeq kc_s$。现在要找的是阻尼，即 $\omega$ 的虚部。由于阻尼发生在小尺度，有 $k\gg1/\eta\sim a'/a$，这意味着频率的实部也满足 $\omega\gg a'/a$。于是`}</Tx>
      <Eq n="9.34" say={R`小尺度上振荡远快于膨胀：速度的时间导数远大于哈勃拖曳项。`}>{R`|u_{\rm b}{}'| = |i\omega u_{\rm b}| \gg \frac{a'}{a}|u_{\rm b}|.`}</Eq>
      <Tx>{R`所以可以丢掉 \eqref{9.32} 右边第二项，速度方程变为`}</Tx>
      <Eq n="9.35" say={R`重子速度跟随光子速度，但带一个相位滞后（$i\omega R/\tau'$）和振幅修正（$(\omega R/\tau')^2$）；展开到 $\tau'^{-2}$ 是因为它在 \eqref{9.30} 中还要乘以 $\tau'$。`}>{R`\begin{aligned}u_{\rm b} &= -3i\Theta_1\left[1 - \frac{i\omega R}{\tau'}\right]^{-1}\\ &\simeq -3i\Theta_1\left[1 + \frac{i\omega R}{\tau'} - \left(\frac{\omega R}{\tau'}\right)^2\right]\end{aligned}`}</Eq>
      <Tx>{R`这里展开到 $\tau'^{-2}$，因为 $u_{\rm b}+3i\Theta_1$ 在 \eqref{9.30} 中要乘以 $\tau'$。

**四极与单极。**光子场二阶矩的方程 \eqref{9.31} 可以类似地化简。首先可以丢掉 $\Theta_2'$ 项，因为它远小于 $\tau'\Theta_2$。剩下的简单地是`}</Tx>
      <Eq n="9.36" say={R`四极矩由偶极产生、被散射压低：$\Theta_2/\Theta_1\sim k/\tau'$——光子在一个平均自由程内"看到"的速度梯度。`}>{R`\Theta_2 = -\frac{4k}{9\tau'}\Theta_1,`}</Eq>
      <Tx>{R`这表明我们的近似方案是可控的：更高的矩被额外的 $k/\tau'$ 因子压低。零阶矩的方程变为`}</Tx>
      <Eq n="9.37" say={R`单极方程在平面波形式下：$i\omega\Theta_0=-k\Theta_1$。`}>{R`i\omega\Theta_0 = -k\Theta_1.`}</Eq>
      <Tx>{R`**色散关系。**把这些全部代入 \eqref{9.30}，得到色散关系`}</Tx>
      <Eq n="9.38" say={R`偶极方程化为代数关系：左边是惯性、四极黏滞（$-8k^2/27\tau'$）与压强回复力，右边是光子与重子速度差带来的拖曳。`}>{R`i\omega - \frac{8k^2}{27\tau'} + \frac{k^2}{3i\omega} = \tau'\left(1 - \left[1 + \frac{i\omega R}{\tau'} - \left(\frac{\omega R}{\tau'}\right)^2\right]\right).`}</Eq>
      <Tx>{R`合并各项得`}</Tx>
      <Eq n="9.39" keyEq={false} title="色散关系" say={R`前两项是无阻尼的声波（$\omega^2=k^2c_s^2$）；正比于 $i/\tau'$ 的项来自重子–光子相对滑动（$R^2$）与光子黏滞（$8k^2/27$），给出耗散。`}>{R`\omega^2(1+R) - \frac{k^2}{3} + \frac{i\omega}{\tau'}\left[\omega^2R^2 + \frac{8k^2}{27}\right] = 0.`}</Eq>
      <Derivation title={R`\eqref{9.30} + \eqref{9.35}–\eqref{9.37} ⇒ \eqref{9.38} ⇒ \eqref{9.39}`} collapsed steps={[
        { tex: R`\Theta_1'=i\omega\Theta_1,\quad \tfrac{2k}{3}\Theta_2=-\frac{8k^2}{27\tau'}\Theta_1,\quad -\tfrac k3\Theta_0=\frac{k^2}{3i\omega}\Theta_1`, why: R`分别用 \eqref{9.33}、\eqref{9.36}、\eqref{9.37}。` },
        { tex: R`\Theta_1-\frac{iu_{\rm b}}{3}=\Theta_1\Big(1-\Big[1+\frac{i\omega R}{\tau'}-\Big(\frac{\omega R}{\tau'}\Big)^2\Big]\Big)`, why: R`$-\frac i3(-3i)=-1$。代入 \eqref{9.30} 并约去 $\Theta_1$，得 \eqref{9.38}。` },
        { tex: R`i\omega(1+R)-\frac{ik^2}{3\omega}-\frac{8k^2}{27\tau'}-\frac{\omega^2R^2}{\tau'}=0`, why: R`右边 $=-i\omega R+\omega^2R^2/\tau'$，移到左边；$\frac{1}{3i\omega}=-\frac{i}{3\omega}$。` },
        { tex: R`\omega^2(1+R)-\frac{k^2}3+\frac{i\omega}{\tau'}\Big[\omega^2R^2+\frac{8k^2}{27}\Big]=0`, why: R`整式乘以 $-i\omega$，即 \eqref{9.39}。` },
      ]} />
      <Tx>{R`**微扰求解。**左边前两项——按 $1/\tau'$ 展开的领头项——重现了上一节的结果：频率等于波数乘以声速（这里没有驱动项，因为小尺度上忽略了势）。把频率写成这一零阶部分加一阶修正 $\delta\omega$，再把零阶部分代入反比于 $\tau'$ 的项，得到`}</Tx>
      <Eq n="9.40" say={R`频率的一阶修正是纯虚数：振荡获得一个阻尼率 $\propto k^2/|\tau'|$——平均自由程越长、尺度越小，阻尼越快。`}>{R`\delta\omega = -\frac{ik^2}{2(1+R)\tau'}\left[c_s^2R^2 + \frac{8}{27}\right].`}</Eq>
      <Derivation title={R`\eqref{9.39} ⇒ \eqref{9.40}`} collapsed steps={[
        { tex: R`\omega=\omega_0+\delta\omega,\quad \omega_0^2(1+R)=\frac{k^2}3\ \Rightarrow\ \omega_0=kc_s`, why: R`零阶：$\tau'\to\infty$。` },
        { tex: R`2\omega_0(1+R)\,\delta\omega+\frac{i\omega_0}{\tau'}\Big[\omega_0^2R^2+\frac{8k^2}{27}\Big]=0`, why: R`对 $\delta\omega$ 线性化；方括号里取零阶值。` },
        { tex: R`\delta\omega=-\frac{i}{2(1+R)\tau'}\Big[k^2c_s^2R^2+\frac{8k^2}{27}\Big]`, why: R`即 \eqref{9.40}。` },
      ]} />
      <Tx>{R`因此扰动的时间依赖为`}</Tx>
      <Eq n="9.41" say={R`单极与偶极 = 以声视界为相位的振荡乘以随时间累积的高斯型阻尼 $e^{-k^2/k_D^2}$。`}>{R`\Theta_0,\Theta_1 \sim \exp\left\{ik\int d\tilde\eta\,c_s(\tilde\eta)\right\}\exp\left\{-\frac{k^2}{k_D^2}\right\}`}</Eq>
      <Tx>{R`其中阻尼波数定义为`}</Tx>
      <Eq n="9.42" keyEq title="扩散阻尼尺度" say={R`阻尼长度的平方 = 平均自由程 $1/(n_e\sigma_{\rm T}a)$ 对时间的累积，乘以由重子滑动（$R^2/(1+R)$）与光子黏滞（$8/9$）决定的系数——即随机行走 $\lambda_D^2\sim\lambda_{\rm MFP}\times\eta$。`}>{R`\frac{1}{k_D^2(\eta)} \equiv \int_0^\eta\frac{d\tilde\eta}{6(1+R)n_e\sigma_{\rm T}a(\tilde\eta)}\left[\frac{R^2}{1+R} + \frac89\right].`}</Eq>
      <Derivation title={R`\eqref{9.40} ⇒ \eqref{9.41}–\eqref{9.42}`} collapsed steps={[
        { tex: R`e^{i\int\omega\,d\eta}=e^{ik\int c_s\,d\eta}\,e^{i\int\delta\omega\,d\eta}`, why: R`代入 $\omega=kc_s+\delta\omega$。` },
        { tex: R`i\,\delta\omega=\frac{k^2}{2(1+R)\tau'}\Big[c_s^2R^2+\frac8{27}\Big]=-\frac{k^2}{2(1+R)n_e\sigma_{\rm T}a}\cdot\frac13\Big[\frac{R^2}{1+R}+\frac89\Big]`, why: R`$\tau'=-n_e\sigma_{\rm T}a$；$c_s^2R^2+\frac8{27}=\frac13[\frac{R^2}{1+R}+\frac89]$。` },
        { tex: R`\exp\Big\{i\int\delta\omega\,d\eta\Big\}=\exp\Big\{-k^2\int\frac{d\eta}{6(1+R)n_e\sigma_{\rm T}a}\Big[\frac{R^2}{1+R}+\frac89\Big]\Big\}\equiv e^{-k^2/k_D^2}`, why: R`即 \eqref{9.42}。` },
      ]} />
      <Tx>{R`**与启发式估计一致。**撇开 1 量级的因子，这个方程说的是 $\lambda_D\sim1/k_D\sim[\eta/n_e\sigma_{\rm T}a]^{1/2}$，与本章开头的启发式估计 \eqref{9.4} 一致（因为 $\eta\simeq1/aH$）。

**全电离近似。**作为阻尼尺度的第一个估计，可以在复合前的区间计算：那时所有电子（氦中的除外）都是自由的。第 4 章在这一极限下估计过光深，但忽略了氦。氦的质量分数记为 $Y_P$，约为 0.24。每个氦核含四个核子，所以氦核占全部原子核的比例为 $Y_P/4$；每个氦核吸收两个电子（每个质子一个），所以在氢复合之前计算自由电子数时，要把 \eqref{4.43} 的估计乘以 $1-Y_P/2$。利用 $H_0=3.33\times10^{-4}\,h\,\mathrm{Mpc^{-1}}$，远在复合之前有`}</Tx>
      <Eq n="9.43" say={R`复合前的散射率：正比于重子密度 $\Omega_{\rm b}h^2$，随 $a^{-2}$ 下降（$n_e\propto a^{-3}$，再乘以一个 $a$ 换成共形时间）。`}>{R`n_e\sigma_{\rm T}a = 2.3\times10^{-5}\,\mathrm{Mpc^{-1}}(\Omega_{\rm b}h^2)a^{-2}\left(1 - \frac{Y_P}{2}\right).`}</Eq>
      <Tx>{R`用它可以证明（\exref{9.8}）阻尼尺度的一个近似为`}</Tx>
      <Eq n="9.44" say={R`全电离、忽略 $R$ 时的阻尼长度：$k_D^{-1}\propto a^{5/4}$，并按 $(\Omega_{\rm b}h^2)^{-1/2}$ 依赖重子密度——重子越多、电子越多，扩散越弱。`}>{R`k_D^{-2} = 7.7\times10^6\,\mathrm{Mpc^2}\,a^{5/2}f_D(a/a_{\rm eq})\left(\Omega_{\rm b}h^2\right)^{-1}\left(1 - \frac{Y_P}{2}\right)^{-1}\left(\Omega_{\rm m}h^2\right)^{-1/2}`}</Eq>
      <Tx>{R`其中 $f_D$ 由 \eqref{9.89} 定义，$a/a_{\rm eq}$ 变大时趋于 1。`}</Tx>
      <Box kind="warning" title={R`勘误：\eqref{9.44} 的数值系数`}>
        <Tx>{R`原书系数印作 $3.1\times10^6\,\mathrm{Mpc^2}$；正确为 $7.7\times10^6\,\mathrm{Mpc^2}$（上式已改）。依据：由 \eqref{9.42}（取 $R=0$）与 \eqref{9.43} 直接积分：$d\eta=da/(a^2H)$，$H=H_0\sqrt{\Omega_{\rm m}}a^{-3/2}\sqrt{1+a_{\rm eq}/a}$，得
$$k_D^{-2}=\frac{4}{27}\,\frac{1}{2.3\times10^{-5}\,\Omega_{\rm b}h^2(1-Y_P/2)}\int_0^a\frac{da'}{H(a')}=\frac{4}{27}\cdot\frac25\cdot\frac{a^{5/2}f_D(a/a_{\rm eq})}{2.3\times10^{-5}\times3.33\times10^{-4}\,\Omega_{\rm b}h^2(1-Y_P/2)\sqrt{\Omega_{\rm m}h^2}}\,\mathrm{Mpc^2},$$
系数为 $\frac{4}{27}\cdot\frac{2}{5}/(7.66\times10^{-9})\approx7.7\times10^6\,\mathrm{Mpc^2}$；原书的 $3.1\times10^6$ 恰为它的 $2/5$，像是 $\int da/H$ 中的 $\frac25$ 被多乘了一次。（$\int_0^a da'/H=\frac{2}{5}\frac{a^{5/2}}{H_0\sqrt{\Omega_{\rm m}}}f_D$ 正是 $f_D$ 的定义方式，见 \exref{9.8} 的解答。）原书 \figref{9.8} 的虚线在 $a=10^{-4}$ 处约为 $0.13\,h^{-1}\mathrm{Mpc}$、在 $a=10^{-3}$ 处约为 $3.3\,h^{-1}\mathrm{Mpc}$，与系数 $7.7\times10^6$（$0.144$、$3.5$）或直接数值积分 \eqref{9.42}（$0.141$、$3.2$）相符，而 $3.1\times10^6$ 只给出 $0.091$、$2.2$。交互图中两种系数都画出，以作对比。`}</Tx>
      </Box>
      <Tx>{R`**复合的影响。**\figref{9.8} 给出复合前阻尼尺度的演化。忽略复合在早期是很好的近似，但正如预期，用 \eqref{9.43} 在 $\eta_*$ 附近会导致定量误差：此时自由电子密度没有正确计入被中性氢"扫走"的电子。忽略复合时 $k_D$ 按 $\Omega_{\rm b}^{1/2}$ 标度；复合的细节改变了这一简单标度。`}</Tx>
      <Figure n="9.8" interactive={<DampingPlot />}
        caption={R`阻尼尺度随标度因子的变化。实线由标准复合历史数值积分得到，虚线用 \eqref{9.44} 的近似（假设电子保持电离）。右轴为相应的 $k_D\eta_0$；阻尼发生在 $l>k_D\eta_0$ 的角尺度上。**交互版**：黑线为 \eqref{9.42} 配合 tanh 型电离分数 $x_e(z)$（可见度峰 $z\approx1090$、宽 $\Delta z\approx200$）的数值积分，复合时 $k_D^{-1}$ 迅速上翘；红虚线为全电离、含 $R$ 的数值积分；绿线为改正后的 \eqref{9.44}（系数 $7.7\times10^6$），紫点线为原书误印的系数 $3.1\times10^6$（见上方勘误框）。图注读数给出复合（可见度峰）时的 $k_D$；按 Planck 2018，$k_D(z_*)\approx0.14\,\mathrm{Mpc^{-1}}$（含偏振的 16/15 因子）。`} />
      <Box kind="physics" title="阻尼在天空上的位置">
        <Tx>{R`基准宇宙学中复合时 $k_D\approx0.15\,\mathrm{Mpc^{-1}}$，乘以 $\eta_0\approx1.4\times10^4\,\mathrm{Mpc}$ 得 $k_D\eta_0\approx2200$。由于 $e^{-k^2/k_D^2}$ 进入的是振幅、$C(l)$ 中是它的平方，功率在 $l\approx k_D\eta_0/\sqrt2\approx1500$ 处已被压低到 $1/e$。这正是 $C(l)$ 在第五、六峰处迅速衰减的原因（\figref{9.17}）。`}</Tx>
      </Box>
    </Sec>);
}
