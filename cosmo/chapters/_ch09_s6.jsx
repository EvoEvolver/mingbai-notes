// §9.6 The CMB power spectrum（式 9.76–9.81，图 9.11–9.13）、§9.7 Cosmological parameters（式 9.82，图 9.14–9.18）、§9.8 Summary
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { SWPlot, ClContribPlot, BesselPlot, ClParamPlot, CurvatureGeometry } from "./_ch09_plots.jsx";

const R = String.raw;
const MODEL = R`**交互版是近似模型，不是完整的 Boltzmann 解**：复合时的单极、偶极由本页的简化 Boltzmann 方程组（紧耦合流体 + CDM + 截断中微子层级）数值求出；阻尼按 \eqref{9.60} 用 tanh 型复合历史的可见度函数加权；早期 ISW 由复合后继续求解的势给出；投影用 \eqref{9.59} 并对 $j_l^2$、$j_l'^2$ 在振荡上取平均（见 \secref{9.6.2} 的说明框）；再电离只取 $l\gtrsim10$ 处乘以 $e^{-2\tau_{\rm rei}}$；不含晚期 ISW、透镜与偏振。基准参数下峰的位置与原书相符（220、540、810、1130、1420、1730），高度偏差约 10–20%。`;

export function Sec96() {
  return (
    <Sec n="9.6" title="The CMB power spectrum" zh="CMB 功率谱"
      gist={R`大角度：只留单极、代入 $-\mathcal R/5$，得 Sachs–Wolfe 积分 \eqref{9.76}，可用 $\Gamma$ 函数算出 \eqref{9.79}；$n_s=1$ 时 $l(l+1)C(l)$ 为常数。小角度：单极给出峰谷（零点被多 $k$ 叠加抹平，峰位因 $j_l$ 的形状下移到 $\simeq0.75\pi\eta_0/r_s$）；偶极不相干地填平谷底；早期 ISW 与单极相干，主要抬高第一峰；晚期 ISW 只影响 $l\lesssim30$。`}
      why={R`\eqref{9.59} 与 \eqref{9.74} 已经给出完整的计算框架。这一节把各部分代进去，看清 $C(l)$ 每个特征的来源。`}
      gives={["9.76", "9.77", "9.78", "9.79", "9.80", "9.81"]}>
      <p className="muted">本节概念：<C id="sw" /> · <C id="freestream" /> · <C id="doppler" /> · <C id="isw" /></p>
      <Sub n="9.6.1" title="Large angular scales" zh="大角尺度">
        <Tx>{R`**最直接的初条件探针。**大角度 CMB 各向异性由尺度极大、直到最近才进入我们视界的模式决定。因此它们提供了一种特别直接的测量初条件的方式。在这些最大尺度上，可以忽略 \eqref{9.59} 中的偶极。于是大角度各向异性由复合时的 $\Theta_0+\Psi$ 决定，外加 \eqref{9.59} 的最后一项（下面再谈）。\eqref{9.6} 求得的大尺度解是 $\Theta_0+\Psi=-\mathcal R/5$。这正是我们需要的：复合时 $\Theta_0+\Psi$ 的表达式，可以代入 \eqref{9.59} 的单极项。然后按 \eqref{9.74} 积分得到今天的各向异性谱：`}</Tx>
        <Eq n="9.76" say={R`Sachs–Wolfe 谱：每个模式贡献 $(\mathcal R/5)^2$ 乘以 $j_l^2$（把距离 $\eta_0-\eta_*$ 处的平面波投影到角尺度 $l$），对所有 $k$ 积分。`}>{R`C(l)^{\rm SW} \simeq \frac{2}{25\pi}\int_0^\infty dk\,k^2P_{\mathcal R}(k)\left|j_l\left[k(\eta_0-\eta_*)\right]\right|^2`}</Eq>
        <Tx>{R`上标表示 Sachs–Wolfe，纪念第一篇计算大角度各向异性的论文作者（Sachs 与 Wolfe 1967）。曲率扰动的功率谱由 \eqref{7.99} 给出，即 $k^3P_{\mathcal R}/2\pi^2=\mathcal A_s(k/k_{\rm p})^{n_s-1}$。因此`}</Tx>
        <Eq n="9.77" say={R`代入幂律原初谱：被积函数只剩 $k^{n_s-2}j_l^2$；尺度不变谱 $n_s=1$ 时为 $j_l^2/k$——每个对数 $k$ 区间贡献相同。`}>{R`C(l)^{\rm SW} \simeq \frac{4\pi}{25}\mathcal A_sk_{\rm p}^{1-n_s}\int_0^\infty dk\,k^{n_s-2}j_l^2\left[k(\eta_0-\eta_*)\right].`}</Eq>
        <Tx>{R`**解析积分。**这个积分可以解析算出。先利用 $\eta_*\ll\eta_0$，定义积分变量 $x\equiv k\eta_0$，\eqref{9.77} 改写为`}</Tx>
        <Eq n="9.78" say={R`换成无量纲变量 $x=k\eta_0$：距离只通过 $(\eta_0k_{\rm p})^{1-n_s}$ 进入，剩下一个纯数学积分。`}>{R`C(l)^{\rm SW} \simeq \frac{4\pi}{25}\mathcal A_s(\eta_0k_{\rm p})^{1-n_s}\int_0^\infty dx\,x^{n_s-2}j_l^2(x).`}</Eq>
        <Tx>{R`球 Bessel 函数的积分可以用 $\Gamma$ 函数解析表示（\eqref{C.18}），于是`}</Tx>
        <Eq n="9.79" say={R`SW 谱的闭式解：$l$ 依赖全在第一个 $\Gamma$ 函数比值里，大 $l$ 时 $\approx l^{n_s-3}$，即 $l(l+1)C(l)\propto l^{n_s-1}$。`}>{R`C(l)^{\rm SW} \simeq 2^{n_s-2}\frac{\pi^2}{25}\mathcal A_s(\eta_0k_{\rm p})^{1-n_s}\frac{\Gamma\left(l+\frac{n_s}{2}-\frac12\right)}{\Gamma\left(l+\frac52-\frac{n_s}{2}\right)}\frac{\Gamma(3-n_s)}{\Gamma^2\left(2-\frac{n_s}{2}\right)}.`}</Eq>
        <Tx>{R`**尺度不变情形。**若谱是尺度不变的，$n_s=1$，则第一个 $\Gamma$ 函数比值 $\Gamma(l)/\Gamma(l+2)$ 由 \eqref{C.27} 等于 $[l(l+1)]^{-1}$。剩下的比值由 \eqref{C.28} 为 $\Gamma(2)/\Gamma^2(3/2)=4/\pi$，所以`}</Tx>
        <Eq n="9.80" keyEq title="Sachs–Wolfe 高原" say={R`尺度不变谱下 $l(l+1)C(l)$ 在大角度上是常数——SW 高原，其高度直接量出原初振幅 $\mathcal A_s$（正确系数见下方勘误框）。`}>{R`l(l+1)C(l)^{\rm SW} = \frac{8}{25}\mathcal A_s`}</Eq>
        <Box kind="warning" title={R`疑似勘误：(9.80) 的系数应为 $2\pi/25$`}>
          <Tx>{R`按正文的两步：$n_s=1$ 时 \eqref{9.79} 的前因子为 $2^{-1}\pi^2/25$，乘以 $[l(l+1)]^{-1}$ 与 $\Gamma(2)/\Gamma^2(3/2)=4/\pi$，得
$$l(l+1)C(l)^{\rm SW}=\frac{\pi^2}{50}\cdot\frac4\pi\,\mathcal A_s=\frac{2\pi}{25}\mathcal A_s\approx0.251\,\mathcal A_s ,$$
即 $\frac{l(l+1)}{2\pi}C(l)=\mathcal A_s/25$。直接由 \eqref{9.78} 与标准积分 $\int_0^\infty dx\,j_l^2(x)/x=\frac{1}{2l(l+1)}$ 也得到同样结果。原书的 $8/25=0.32$ 恰好是把 $\Gamma^2(3/2)$ 错算成 $\pi^2/16$ 的结果（比值变为 $16/\pi^2$），偏大 $4/\pi\approx1.27$ 倍。原书 \figref{9.11} 中的点线（约 $1.07\times10^{-10}$）按 $8/25$ 画出；按 $2\pi/25$ 应为 $\mathcal A_s/25\approx0.84\times10^{-10}$。附录 A 中习题 9.17 的 $C(l=2)=4\mathcal A_s/75$ 与 $r_2=0.68r$ 也继承了这一系数（见 \exref{9.17}）。交互图同时画出两者。`}</Tx>
        </Box>
        <Tx>{R`是常数。事实上，$l(l+1)C(l)$ 是温度各向异性**每个对数 $l$ 区间的方差**，类似于三维功率谱的 $k^3P_{\mathcal R}(k)$。后者在 $n_s=1$ 时是常数，所以 $l(l+1)C(l)$ 在此情形下也成为常数并不意外。习惯上把 $l(l+1)C(l)$ 对 $l$ 画在对数坐标上，于是它在低 $l$ 处近似为常数。

**与数据比较。**\figref{9.11} 给出 Planck 对大角度各向异性的测量，以及基准平直 $\Lambda$CDM 模型的 Boltzmann 解。偏离常数是由于 ISW 效应和在较高 $l$ 处变得不可忽略的偶极贡献（\eqref{9.79} 忽略了它）。尽管如此，\eqref{9.80} 仍是一个合理的近似。由于纵轴给出给定尺度 $l$ 贡献的方差，可以读出大角度涨落的振幅：粗略地 $\langle(\Delta T/T_0)^2\rangle\sim10^{-10}$，所以均方根涨落是其平方根，量级为 $10^{-5}T_0=27\,\mu\mathrm K$。`}</Tx>
        <Figure n="9.11" interactive={<SWPlot />}
          caption={R`Planck 测得的大角度 CMB 功率谱（Planck Collaboration 2018b）与基准 $\Lambda$CDM 预言（实线）。点线为 \eqref{9.80} 预言的尺度不变 Sachs–Wolfe 高原。**交互版**（无数据点）：黑线为 \eqref{9.78} 用精确球 Bessel 函数数值积分的 SW 谱；红线再加上晚期 ISW（$\Lambda$ 使物质期之后的势按 $D_+/a$ 衰减，计入 \eqref{9.59} 的积分项）；绿虚线为 \eqref{9.79}；蓝点线 $\mathcal A_s/25$ 是 \eqref{9.80} 的正确系数，紫点划线为原书系数 $8/25$。$\mathcal A_s=2.1\times10^{-9}$。把 $\Omega_\Lambda$ 调到 0 可见晚期 ISW 的上翘消失；调 $n_s$ 可见 SW 谱按 $l^{n_s-1}$ 倾斜。`} />
        <Tx>{R`**超越尺度不变。**按我们的解析结果，乘以 $l(l+1)$ 的功率谱应按 $(l/l_{\rm p})^{n_s-1}$ 标度，$l_{\rm p}$ 是大致对应于枢轴尺度 $k_{\rm p}$ 的角波数。这一标度可以从 \eqref{9.79} 看出，或更直接地从 \eqref{9.78} 的积分看出：被积函数在 $x\sim l$ 处取峰，所以粗略地说，那里每个 $x$ 都可以换成 $l$；被积函数从 $x^{-1}$ 推广到 $x^{n_s-2}$，于是谱的变化按 $l^{n_s-1}$ 标度。但由于 $n_s-1$ 很小，这一标度被上面提到的其他贡献掩盖了。要同时约束谱指数和振幅，数据必须覆盖更大的 $l$ 范围，也就是要包括更小尺度上的各向异性。`}</Tx>
      </Sub>

      <Sub n="9.6.2" title="Acoustic peaks" zh="声学峰">
        <Tx>{R`**三种贡献。**在更小的尺度上——即复合时已在视界内的尺度——各向异性谱依赖 \eqref{9.59} 的全部各项：单极 $\Theta_0$、偶极 $\Theta_1$，以及积分 Sachs–Wolfe 效应 $\propto\int d\eta\,(\Psi-\Phi)'$。\figref{9.12} 给出所有这些对角功率谱的贡献。我们逐一考察。

**单极：零点变成谷。**复合时的单极 $(\Theta_0+\Psi)(k,\eta_*)$ 自由流向我们，在 $l\sim k\eta_0$ 的角尺度上产生各向异性。这是我们早在 \figref{9.5} 就预期的，\eqref{9.59} 证明了它，现在在 \figref{9.12} 中直接看到。自由流过程的定量方面有两个有趣的特征。第一，单极谱中的"零点"（这里在 $l\sim70$、400、650 和 1000）被抹平了，因为许多 Fourier 模式贡献到同一个角尺度上。如果只有 $k=400/\eta_0$ 的模式贡献到 $l=400$ 的各向异性，$C(400)$ 就真的为零；但许多波数不同于 $400/\eta_0$ 的非零模式也有贡献，它们把零点变成了 $C(l)$ 谱中的谷。`}</Tx>
        <Figure n="9.12" interactive={<ClContribPlot />}
          caption={R`中小尺度的 CMB 功率谱。黑色实线为只有复合时的单极 $(\Theta_0+\Psi)(k=l/\eta_0,\eta_*)$ 时的结果，它包含最终各向异性谱的大部分结构。加入偶极（红虚线）抬高了各向异性谱；由于偶极与单极反相，谷变得不那么明显。再加上积分 Sachs–Wolfe 效应（绿点划线）主要增强与复合时视界相当或更大尺度上的各向异性，因此第一峰得到了大部分额外的功率。**交互版**：本页近似模型（不含再电离与晚期 ISW）。$l=220$ 处三条曲线为 4.7、5.9、8.3（原书约 4.6、5.6、7.7）；紫色点线按 \eqref{9.81} 把复合后的全部势变化都当作与单极同相，第一峰被高估到约 10。 ${MODEL}`} />
        <Tx>{R`**峰位的移动。**自由流值得注意的第二个特征是：我们最初对峰位的估计并不完全正确。尺度 $k$ 上的非均匀性并**不**精确地出现在角尺度 $l=k\eta_0$ 上；而是有明显的移动，表明一个给定的 $k$ 模式贡献到比预期稍小的 $l$ 上。这种移动部分来自 \eqref{9.59} 中的球 Bessel 函数。如 \figref{9.13} 所示，Bessel 函数的峰不在 $l=k\eta_0$ 处，而在稍小的 $l$ 处。第一峰位置的一个更好的近似是 $l_{\rm pk}\simeq0.75\pi\eta_0/r_s$。`}</Tx>
        <Figure n="9.13" interactive={<BesselPlot />}
          caption={R`$x=50$ 与 $x=100$ 时球 Bessel 函数的平方随 $l$ 的变化。注意峰出现在 $l$ 略小于 $x$ 处。**交互版**：用 Miller 向下递推精确计算 $j_l(x)$；可调 $x$。峰位与 Airy 型渐近式 $l_{\rm pk}\approx x-0.81x^{1/3}-\frac12$ 吻合（$x=100$ 时 $l_{\rm pk}=96$）；其后 $j_l^2$ 在 $l<x$ 一侧振荡、在 $l>x$ 一侧指数衰减。`} />
        <Box kind="physics" title="为什么是 0.75？">
          <Tx>{R`本页数值解中，复合时单极的第一峰在 $k_{\rm pk}r_s\approx0.88\pi$（势的衰减给余弦加了相移），投影后 $C(l)$ 的第一峰又落在 $l\approx0.83\,k_{\rm pk}\chi_*$ 左右（Bessel 函数峰在 $l<x$，加上 $C(l)$ 是对 $k\ge l/\chi_*$ 的加权积分）。两者相乘约 $0.73\pi\chi_*/r_s\approx220$，与原书的 $0.75\pi\eta_0/r_s$ 一致（$r_s=144\,\mathrm{Mpc}$，$\chi_*=13\,900\,\mathrm{Mpc}$）。`}</Tx>
        </Box>
        <Tx>{R`**偶极：反相、不相干。**复合时的偶极比单极小，并与它反相。\figref{9.12} 中的虚线表明，加上偶极的效果是抬高整体各向异性水平，尤其是在谷的区域，从而降低峰的突出程度。这是偶极与单极反相的直接体现：在单极贡献最少的地方（谷），偶极贡献最多。单极与偶极贡献的另一个特点是它们**不相干地相加**：单极给出的 $\Theta_l$ 与偶极给出的 $\Theta_l$ 的交叉项，在对所有 $k$ 模式积分得到 $C(l)$ 时消失。这可以从球 Bessel 函数的性质在数学上看出（\exref{9.11}）。不相干意味着偶极在功率谱中并不像人们天真地以为的那么重要：若复合时偶极的振幅是单极的 30%，偶极对 $C(l)$ 的贡献只有约 10%。`}</Tx>
        <Box kind="aside" title="本页 C(l) 近似模型：对 Bessel 振荡取平均">
          <Tx>{R`对大 $l$，在 $x>\nu\equiv l+\frac12$ 处 $j_l(x)\approx\frac{\sin\varphi(x)}{\sqrt{x}\,(x^2-\nu^2)^{1/4}}$，$\varphi'(x)=\sqrt{1-\nu^2/x^2}$；在 $x<\nu$ 处指数小。对一个振荡周期取平均（记作 $\langle\cdot\rangle$）：
$$\langle j_l^2\rangle=\frac{1}{2x\sqrt{x^2-\nu^2}},\qquad \langle j_l'^2\rangle=\Big(1-\frac{\nu^2}{x^2}\Big)\langle j_l^2\rangle,\qquad \langle j_lj_l'\rangle=0 .$$
最后一式就是"单极与偶极不相干"（\exref{9.11}）。代入 \eqref{9.59}、\eqref{9.74}，令 $k=\nu\cosh u/D_A$（$x=kD_A$，$D_A$ 为到最后散射面的共动角直径距离）：
$$C(l)\approx\frac{2\pi}{\nu^2}\int_0^\infty\frac{du}{\cosh^2u}\,\Delta^2_{\mathcal R}(k)\Big\{\big[S(k)+I_c\big]^2+\big[V(k)\tanh u-I_s\big]^2\Big\},$$
其中 $S=(\Theta_0+\Psi)/\mathcal R$、$V=3\Theta_1/\mathcal R$（都乘以 \eqref{9.60} 的阻尼因子），$I_{c,s}=\int d\eta\,(\Psi-\Phi)'\{\cos,\sin\}[k(\eta-\eta_*)\tanh u]$ 是早期 ISW 与单极同相、与偶极同相的部分（把 $j_l[k(\eta_0-\eta)]$ 在 $\eta_*$ 附近按相位展开）。权重 $1/\cosh^2u$ 只取 $k\ge\nu/D_A$：这就是"一个 $k$ 模式贡献到 $l\lesssim kD_A$"与"零点被抹成谷"的数学形式。取 $S=-1/5$、$V=0$、$n_s=1$ 时，$\int du/\cosh^2u=1$，给出 $l(l+1)C(l)\approx2\pi\mathcal A_s/25$。`}</Tx>
        </Box>
        <Tx>{R`**早期 ISW：相干。**第三种贡献来自复合后势的时间演化造成的积分 Sachs–Wolfe 效应，这主要是因为复合时辐射的能量密度并非完全可以忽略。如果宇宙完全由物质主导，就不会有这种效应。但向纯物质主导的过渡并不突然；即使 $a_{\rm eq}\sim10^{-4}$，复合刚过时也会发生 ISW 效应。要看哪些尺度受影响，考虑 \eqref{9.59} 中的积分。设势在 $\eta_c$ 时刻演化，所有视界内尺度（$k\eta_c>1$）都受影响。Bessel 函数在 $l\sim k(\eta_0-\eta_c)$ 处取峰，所以 $l>(\eta_0-\eta_c)/\eta_c$ 的所有角尺度都受影响。最大的效应通常出现在 $\eta_c$ 时刻视界的尺度上。

这一**早期 ISW 效应**特别重要，因为它与单极**相干地**相加。为看清这一点，对 \eqref{9.59} 最后一项分部积分。主要贡献来自 $\eta\simeq\eta_*$，所以 Bessel 函数可以在那里取值，剩下的平凡积分给出`}</Tx>
        <Eq n="9.81" keyEq title="早期 ISW" say={R`若复合后势的变化发生在 $\eta_*$ 附近，ISW 贡献就是势的净变化乘以与单极相同的 $j_l$——它与单极同相，相干叠加。`}>{R`\Theta_l(k,\eta_0)^{\text{early ISW}} = \left[\Psi(k,\eta_0) - \Psi(k,\eta_*) - \Phi(k,\eta_0) + \Phi(k,\eta_*)\right]j_l\left[k(\eta_0-\eta_*)\right].`}</Eq>
        <Tx>{R`它与单极（正比于同一个 Bessel 函数）完全同相，所以即使它对 $\Theta_l$ 的影响远小于偶极，对各向异性谱的影响却相当：30% 的偶极导致 $C(l)$ 10% 的变化，而 5% 的 ISW 效应就导致同样 10% 的变化（$1.05^2\approx1.10$，而 $1+0.3^2=1.09$）。\figref{9.12} 中的点划线表明，大尺度上——$l\lesssim\eta_0/\eta_*$ 的那些——各向异性从早期 ISW 效应得到很大的提升。

**晚期 ISW。**晚期 ISW 效应发生在暗能量时代（$z\lesssim1$，\secref{8.5}）势衰减时。因此这一晚期效应局限于极大的尺度，$l\lesssim30$；在线性 $l$ 坐标上画 $C(l)$ 时它几乎看不出来，而在 \figref{9.11} 中最低 $l$ 处的上翘就明显得多。探测这一效应最直接的方法是把大角度 CMB 各向异性与低红移的大尺度结构做互相关，如星系角关联（\secref{11.2}）。`}</Tx>
      </Sub>
    </Sec>);
}

export function Sec97() {
  return (
    <Sec n="9.7" title="Cosmological parameters" zh="宇宙学参数"
      gist={R`选 7 个 $\Lambda$CDM 参数：$\Omega_K$、$\Omega_\Lambda$、$\mathcal A_s$、$n_s$、$\tau_{\rm rei}$、$\Omega_{\rm b}h^2$、$\Omega_{\rm c}h^2$。曲率与 $\Lambda$ 通过角直径距离平移峰位；$\mathcal A_s$、$n_s$ 改变整体与倾斜，与再电离（$e^{-2\tau_{\rm rei}}$，\eqref{9.82}）简并；$\Omega_{\rm b}h^2$、$\Omega_{\rm c}h^2$ 以各自独特的方式改变峰的相对位置与高度。`}
      why={R`CMB 的价值在于用测得的 $C(l)$ 反推参数。要知道哪些参数能被直接约束、哪些之间存在简并，就要理解每个参数怎样改变谱的形状。`}
      gives={["9.82"]}>
      <p className="muted">本节概念：<C id="params" /> · <C id="soundhorizon" /> · <C id="cosmicvar" /></p>
      <Tx>{R`**丰富的结构，多维的参数。**CMB 各向异性功率谱结构丰富，其形状依赖于宇宙学参数。精确测量它，就能约束描述计算中各种成分的参数。多维参数空间的代价是存在**部分简并**：改变一个参数的效果，一般可以通过以特定方式改变几个其他参数来模仿。本节试图建立直觉：哪些参数能被直接约束，存在哪些重要的简并，它们如何起作用。

**选择参数。**必须作出的一个非常重要的决定是：让哪些参数变化。我们考虑以下七个 $\Lambda$CDM 参数：

• 曲率参数 $\Omega_K\equiv1-\Omega_{\rm m}-\Omega_\Lambda$，在协调模型中常设为零；

• 宇宙学常数，用 $\Omega_\Lambda$ 参数化；

• 原初谱的归一化 $\mathcal A_s$；

• 标量谱指数 $n_s$；

• 再电离，用到复合完成之后某一红移的光深 $\tau_{\rm rei}$ 参数化；

• 重子密度 $\Omega_{\rm b}h^2$；

• 冷暗物质密度 $\Omega_{\rm c}h^2$。

这份清单有两点值得强调。第一，它显然没有包括所有可能的宇宙学参数。一些热门参数缺席了：中微子质量（我们把中微子质量之和设为实验允许的最小值 $\sum m_\nu=0.06\,\mathrm{eV}$）、暗能量物态方程 $w$（固定为 $-1$，对应宇宙学常数）、张量模（振幅 $r$ 固定为零）。主要原因是这些参数不能被 CMB 温度功率谱直接约束：中微子质量的效应在早期太小，暗能量的细节也是如此（它主要通过到最后散射面的距离影响 CMB）。暗能量与中微子质量最好通过把 CMB 与大尺度结构探针（第 11 章的主题）结合来约束。另一方面，张量模现在主要由 CMB 偏振约束，所以留到第 10 章讨论。

第二个要点是，我们刻意选择了某些参数的特定组合，例如 $\Omega_{\rm b}h^2$，而不是分别取 $\Omega_{\rm b}$ 与 $h$。注意，在 $\Omega_{\rm m}h^2=(\Omega_{\rm b}+\Omega_{\rm c})h^2$ 之外再允许 $\Omega_K$ 与 $\Omega_\Lambda$ 变化，实际上就已经计入了哈勃参数，因为 $\Omega_{\rm m}$ 由约束 $\Omega_{\rm m}=1-\Omega_\Lambda-\Omega_K$ 确定。考虑这种组合有充分的理由：例如 $\Omega_{\rm m}h^2$ 参数化的是今天宇宙中真实的**物理**物质密度（以涉及 $8\pi G$ 与 $100\,\mathrm{km/s/Mpc}$ 的奇怪单位写出）。决定 CMB 各向异性的物理关心的是物理物质密度，而不是密度参数 $\Omega_{\rm m}$；重子同理。最后，光子的物理能量密度 $\Omega_\gamma h^2$ 由 CMB 温度极其精确地确定。因此相等时刻 $a_{\rm eq}$ 本质上只是 $\Omega_{\rm m}h^2$ 的函数。

下面逐一考察每个参数的效应。`}</Tx>

      <Sub n="9.7.1" title="Curvature and Λ" zh="曲率与 Λ">
        <Tx>{R`**几何投影。**如果宇宙不是平直的，\figref{9.5} 的简单图像就不再准确，因为起初平行的光子测地线会会聚或发散。考虑这一效应对各向异性的含义。假设平直宇宙和开放宇宙中复合时有完全相同的非均匀性图样（$\Omega_K$ 很小时这是很好的近似）。如 \figref{9.14} 所示，一个固定的物理尺度——比如第一峰的尺度——在开放宇宙中被投影到小得多的角尺度上。于是峰移向更高的 $l$；闭合宇宙中情况相反。如 \figref{9.15} 所示，数值计算中正是如此。`}</Tx>
        <Figure n="9.14" interactive={<CurvatureGeometry />}
          caption={R`在共动坐标 $(\eta,\boldsymbol x)$ 中，平直宇宙里的光子轨迹是直线（实线），开放宇宙中则发散（虚线）。最后散射面上的扰动在开放宇宙中显得比在平直宇宙中更小（$\theta_{\rm open}<\theta_{\rm Eucl}$）。**交互版**：拖动 $\Omega_K$（固定 $h$ 与物理密度，用 $\Omega_\Lambda$ 补偿），读出角直径距离与第一峰位置的变化；角度为示意性放大。`} />
        <Figure n="9.15" interactive={<ClParamPlot focus={["OK"]} lmax={1000} />}
          caption={R`平直宇宙与开放、闭合宇宙的各向异性谱比较。峰谷的模式在弯曲宇宙中依然存在，但开放宇宙（$\Omega_K>0$）中移向更小尺度，闭合宇宙（$\Omega_K<0$）中则相反。图中只改变 $\Omega_K$ 与 $\Omega_\Lambda$，其他参数都固定在基准宇宙学的值。**交互版**：$\Omega_K=\pm0.07$ 时第一峰移到 $l\approx250$ 与 $200$（原书图中约 245 与 200），峰高不变——在本模型中曲率只通过 $D_A$ 起作用。 ${MODEL}`} />
        <Tx>{R`**灵敏度。**这一效应的大小由到最后散射面的角直径距离决定：在平直宇宙中它就是 $\eta_0-\eta_*$，在有曲率的宇宙中由 \eqref{2.39} 给出。由于到最后散射面的距离很大，CMB 峰对曲率的响应非常灵敏，从而给出相应的紧约束。目前结合 CMB 与大尺度结构探针得到的对 $\Omega_K$ 的最好约束为 $|\Omega_K|<0.002$（Planck Collaboration 2018b）。$\Omega_K=1-\Omega_{\rm m}\simeq0.7$ 的开放 CDM 模型还被视为可行方案的时代，我们已经走出很远了！

**暴胀预言的"曲率"。**一个严格平直的宇宙只是参数空间中的一个点——各成分能量密度之和恰好等于临界密度的那个点——而任何数据都不可能排除除这一点之外的所有值。事实上，即使在暴胀范式中，我们也预期观测到非常小但非零的曲率。暴胀在所有尺度上都产生扰动，包括恰好在我们当前视界尺度上的扰动。这种视界尺度扰动的各向同性部分在我们看来恰恰就是曲率，$\Omega_K\sim(k/a_0H_0)^2\mathcal R(k)|_{k=H_0}$（这为"曲率扰动"这一名称提供了又一个理由，参见 \secref{7.4.3} 末尾的讨论）。鉴于 $\mathcal R(k)$ 的谱近似尺度不变，暴胀因此预言 $\Omega_K$ 是一个均方根量级为 $\sqrt{\mathcal A_s}\sim10^{-4}$ 的随机数。若有证据表明其值远大于此，对暴胀情景来说就成了问题。

**$\Lambda$ 的效应。**改变宇宙学常数的效果与曲率类似：它通过改变到最后散射面的角直径距离而移动峰位（回忆：保持 $\Omega_{\rm m}h^2$ 不变而改变 $\Omega_\Lambda$ 时，$H_0$ 也在变）。毕竟两者都是在复合时不起作用的晚期现象。在 \exref{9.12} 中你会证明 $\Lambda$ 的效应可以用这种方式解释。这也说明了为什么在不纳入大尺度结构探针来打破简并时，CMB 对 $\Omega_K$ 的约束与对 $\Omega_\Lambda$ 的约束部分简并。此外，改变 $\Omega_\Lambda$ 还会影响 $l\lesssim30$ 的晚期 ISW 贡献，$\Omega_\Lambda$ 增大使这些尺度上的 $C(l)$ 升高（见 \figref{9.11}），不过由于宇宙方差误差很大，这一效应的约束力很有限。`}</Tx>
      </Sub>

      <Sub n="9.7.2" title="Amplitude, spectral index, and optical depth" zh="振幅、谱指数与光深">
        <Tx>{R`**$\mathcal A_s$ 与 $n_s$。**改变原初扰动的振幅 $\mathcal A_s$ 与谱指数 $n_s$ 的效果很容易理解：把 $\mathcal A_s$ 乘以某个因子，就是把所有 $C(l)$ 乘以同一因子。把 $n_s\to n_s+\alpha$，小尺度 $C(l)$ 乘以因子 $(l/l_{\rm p})^\alpha$，$l_{\rm p}$ 是对应于枢轴尺度 $k_{\rm p}$ 的角波数。由于低 $l$ 时 $j_l$ 的支撑很宽，这在大尺度上并不完全正确。

**再电离。**但我们还需要考虑再电离造成的光深。复合之后宇宙中的气体是中性的。另一方面，我们在晚期宇宙中观测到的大部分气体是电离的；例如在高红移类星体的吸收光谱中，直到 $z\sim6$ 都看不到中性气体的证据（Bouwens 等 2015）。所以某个时候气体必须被再电离（脚注：与"复合"不同，这个名称倒是准确的）。目前认为这发生在红移 15 到 6 之间。再电离之后，CMB 光子又可以被自由电子散射。如果散射足够多——即回溯到复合结束之后某一时刻 $\eta_{\rm late}$ 的光深 $\tau_{\rm rei}\equiv\tau(\eta_{\rm late})$ 足够大——各向同性就会恢复；等价地，原初各向异性被抹掉。

为定量研究，设想一个朝我们方向传播的光子，温度为 $T(1+\Theta)$，$T$ 是背景温度，$\Theta$ 是扰动。若这些光子撞上光深为 $\tau_{\rm rei}$ 的区域，只有比例 $e^{-\tau_{\rm rei}}$ 能逃逸并继续向我们传播。除此之外，在穿过电离区域时还有比例 $1-e^{-\tau_{\rm rei}}$ 的光子被散射进视线（因为散射保持光子总数）。这些散射进来的光子来自各个方向，可以假设它们具有平均温度 $T$。所以今天看到的温度为`}</Tx>
        <Eq n="9.82" title="再电离对各向异性的压低" say={R`再电离时：未被散射的光子保留原初各向异性，被散射进视线的光子只带平均温度——观测到的各向异性被乘以 $e^{-\tau_{\rm rei}}$（功率乘以 $e^{-2\tau_{\rm rei}}$）。`}>{R`T(1+\Theta)e^{-\tau_{\rm rei}} + T(1-e^{-\tau_{\rm rei}}) = T(1+\Theta e^{-\tau_{\rm rei}}).`}</Eq>
        <Tx>{R`从中减去平均温度 $T$，可知分数各向异性将是 $z\simeq1100$ 时建立的原初各向异性乘以 $e^{-\tau_{\rm rei}}$。不过这种散射只影响再电离时已在视界内的扰动，所以只有 $l$ 大于 $\eta_0/\eta_{\rm rei}$ 的多极矩被 $e^{-\tau_{\rm rei}}$ 压低；小 $l$ 不受影响。这在 \figref{9.16} 中可以看到，它给出改变 $\tau_{\rm rei}$ 的效果。显然，增大 $\tau_{\rm rei}$ 压低小尺度的各向异性，而 $l\lesssim100$ 处基本不变。（严格地说，再电离还会在 $l\lesssim10$ 处产生新的各向异性，主要在偏振中——见下一章。）`}</Tx>
        <Figure n="9.16" interactive={<ClParamPlot focus={["tau", "lnAs"]} lmax={1000} />}
          caption={R`改变再电离光深对 CMB 功率谱的影响。在 $l\gtrsim150$ 的尺度上效果本质上是一个整体乘法因子，而 CMB 在极大尺度上对 $\tau_{\rm rei}$ 不敏感。**交互版**：同时增大 $\tau_{\rm rei}$ 与 $\ln(10^{10}\mathcal A_s)$（$\Delta\ln\mathcal A_s=2\Delta\tau_{\rm rei}$）可以使 $l>100$ 的谱几乎复原——这就是 $\mathcal A_s$–$\tau_{\rm rei}$ 简并。本模型把再电离简化为在 $l\approx10$ 附近平滑过渡的 $e^{-2\tau_{\rm rei}}$ 因子。 ${MODEL}`} />
        <Tx>{R`**简并。**这解释了为什么我们把再电离与振幅、谱指数放在一起考虑：$\mathcal A_s$ 的改变（配合 $n_s$）可以在很大程度上模仿 $\tau_{\rm rei}$ 的效果，尤其考虑到 $C(l)$ 的宇宙方差误差在低 $l$ 处最大。反过来，$\tau_{\rm rei}$ 的不确定值是 $\mathcal A_s$ 不确定度中最主要的来源。`}</Tx>
      </Sub>

      <Sub n="9.7.3" title="Baryon and CDM densities" zh="重子与冷暗物质密度">
        <Tx>{R`**超越平移与倾斜。**最后考虑改变重子密度 $\Omega_{\rm b}h^2$ 与冷暗物质密度 $\Omega_{\rm c}h^2$。每种情形中都保持平直宇宙，用 $\Omega_\Lambda$ 补偿密度参数的变化。正如本章开头的考虑所预期的，这些改变造成的变化比单纯的平移和倾斜更丰富：它们使峰谷的位置发生小的相对移动，并改变峰的高度。要理解这些效应，重要的是回忆：在平直宇宙中尺度 $k$ 上的非均匀性出现在 $l=k\eta_0$ 处，所以平直宇宙中的峰将出现在 $l_{\rm pk}\simeq k_{\rm pk}\eta_0\simeq n\pi\eta_0/r_s(\eta_*)$（\eqref{9.27}，但参见 \secref{9.6.2} 的讨论：实际的 $l_{\rm pk}$ 要低约 25%）。

**重子。**改变重子密度的效应（\figref{9.17}）是：声视界 $r_s(\eta_*)$ 的改变使峰位移动，峰的高度也发生变化。我们已经接触过各向异性谱依赖重子密度的方式。首要的一点、在 \figref{9.17} 中清晰可见的是：重子密度大时，奇数峰与偶数峰的高度比更高。$\Omega_{\rm b}h^2$ 带来的第二个变化是：重子密度增大会减小扩散长度（增大 $k_D$）。因此重子密度越大，阻尼移向越小的角尺度，所以高 $\Omega_{\rm b}h^2$ 模型中 $l>1000$ 尺度上的各向异性谱更大。这种特征性的效应组合使得 $\Omega_{\rm b}h^2$ 能被非常紧地约束；\figref{9.17} 中围绕基准值所示的参数变化都被数据以高显著性排除。`}</Tx>
        <Figure n="9.17" interactive={<ClParamPlot focus={["obh2"]} lmax={2000} />}
          caption={R`重子密度 $\Omega_{\rm b}h^2$ 变化时各向异性谱的变化（原书取 0.018、0.020、0.022、0.025、0.027）。**交互版**：$\Omega_{\rm b}h^2$ 从 0.018 增到 0.027 时，本模型第一峰从 7.05 升到 7.84（原书约 7.2→8.2），第二峰从 3.25 降到 2.71，第三峰几乎不变——奇偶峰比随重子增大；$l\gtrsim1500$ 的阻尼尾略升。 ${MODEL}`} />
        <Tx>{R`**冷暗物质。**接下来考虑改变冷暗物质密度 $\Omega_{\rm c}h^2$ 的效果（\figref{9.18}）。部分效应是改变声学振荡的驱动项（因为引力势由 CDM 主导），这与改变重子密度的效果类似。此外，CDM 在很大程度上决定了相等时刻，既影响扰动的演化（$\Omega_{\rm c}h^2$ 增大则增长更多），也影响早期 ISW 效应（$\Omega_{\rm c}h^2$ 增大则 ISW 更少，因为复合后势衰减得更少）。$C(l)$ 对 $\Omega_{\rm c}h^2$ 的给定相对变化的敏感程度与对 $\Omega_{\rm b}h^2$ 的相近。图中还给出 Planck 团队的分格功率谱测量——为展示起见把一段 $l$ 范围的测量合并为一个数据点。它们正好落在基准平直 $\Lambda$CDM 预言之上。鉴于误差棒几乎看不见，数据精确地约束了 $\Omega_{\rm c}h^2$，以高显著性排除了图中为演示而取的其他参数值。`}</Tx>
        <Figure n="9.18" interactive={<ClParamPlot focus={["och2"]} lmax={1000} />}
          caption={R`冷暗物质密度 $\Omega_{\rm c}h^2$ 变化时各向异性谱的变化（原书取 0.095、0.107、0.119、0.131、0.143）。图中还给出 Planck 的分格测量（Planck Collaboration 2018b）；误差棒小到只在第一峰附近及以下的 $l$ 才能分辨。显然 $\Omega_{\rm c}h^2$ 与 $\Omega_{\rm b}h^2$ 都能被非常精确地确定。**交互版**（无数据点）：$\Omega_{\rm c}h^2$ 从 0.095 增到 0.143 时本模型第一峰从 8.25 降到 6.83（原书约 8.6→7.0），峰位略向小 $l$ 移动——更多 CDM 意味着更早的相等、更弱的辐射驱动与早期 ISW。 ${MODEL}`} />
      </Sub>
    </Sec>);
}

export function Sec98() {
  return (
    <Sec n="9.8" title="Summary" zh="小结"
      gist={R`观测到的 CMB 各向异性 = 单极 $\Theta_0+\Psi$（声学振荡）+ Doppler $3\Theta_1$（反相振荡）+ ISW（沿视线积分、随尺度平滑）；$C(l)$ 精确地携带 $\Omega_{\rm c}h^2$、$\Omega_{\rm b}h^2$、曲率、$\mathcal A_s$、$n_s$ 的信息。`}
      why={R`把全章收拢成一张清单，并指出进一步阅读与当前的观测基准。`}>
      <Tx>{R`观测到的 CMB 各向异性是三种贡献的组合（\eqref{9.59}）：

• **$\Theta_0+\Psi$**：包括光子的本征温度扰动与引力红移，我们笼统地称之为"单极"。这一贡献展示声学振荡，其行为在一阶近似下由半解析的紧耦合解描述。

• **Doppler 贡献 $3\Theta_1$**：展示同样的声学振荡，但相位错开（振子的速度与位置一般都是如此）。

• **ISW 贡献**：来自复合前后与晚期引力势的时间演化。与前两者不同，它是沿视线的积分贡献，随尺度变化平滑。

这三种贡献（以及相关的交叉关联）之和，构成了 CMB 特征性的角功率谱。$C(l)$ 包含丰富的信息，尤其是关于 $\Omega_{\rm c}h^2$ 与 $\Omega_{\rm b}h^2$，也包括曲率、原初扰动振幅 $\mathcal A_s$ 与谱指数 $n_s$（尽管对 $\mathcal A_s$ 的约束受限于与光深 $\tau_{\rm rei}$ 的简并）。与第 11 章讨论的大尺度结构探针结合时，CMB 变得更加强大；这种结合已经给出了曲率与宇宙学常数参数 $\Omega_K$、$\Omega_\Lambda$ 的百分之一水平的约束。

**延伸阅读。**我们对 CMB 各向异性的半解析处理遵循 Hu 与 Sugiyama（1995），推荐阅读其极为清晰的表述。CMB 温度各向异性测量的基准现由 Planck 卫星确立，至少在 $l\lesssim2000$ 处，Planck 的误差棒已达到基本的宇宙方差极限。最新数据发布见 Planck Collaboration（2018a），参数约束以及对其他数据集的出色简述见 Planck Collaboration（2018b）。`}</Tx>
    </Sec>);
}
