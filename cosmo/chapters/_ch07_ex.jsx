// 习题 7.1–7.18 —— 式 (7.111)–(7.124)。
// 解答：7.2、7.12、7.13 依据原书附录 A（fromBook）；其余 15 题为编者给出（editor-provided），
// 数值（7.1、7.2、7.3、7.15、7.18）均用 python 复核：基准宇宙学取附录 B 的 h=0.677、Ω_m=0.3106、n_s=0.9682、ln(10^10 A_s)=3.048。
// 勘误：原书 (7.113) 缺少因子 −2；习题 7.15 中 f_ν 的定义式应为 ρ_ν/ρ_r（正文已改正，见各题勘误框）。
import { Sec, Tx, Eq, Box, Exercise } from "@kit";

const R = String.raw;

export function Exercises() {
  return (
    <Sec n="7.E" title="Exercises" zh="习题">
      {/* ---------------- 7.1 ---------------- */}
      <Exercise n="7.1" title="暴胀与平坦性问题" level="★★"
        hint={R`由含曲率的 Friedmann 方程得 $\Omega-1=K/(aH)^2$：$|\Omega-1|$ 正比于共动哈勃半径的平方。辐射期它 $\propto a^2$，物质期 $\propto a$，而暴胀期（$H$ 近似不变）$\propto a^{-2}$。`}
        solution={R`**一般关系。**含曲率的 Friedmann 方程为 $H^2=\frac{8\pi G\rho}{3}-\frac{K}{a^2}$。两边除以 $H^2$ 并用 \eqref{7.111}：
$$\Omega(t)-1=\frac{K}{a^2H^2}=\frac{K}{(aH)^2}.$$
所以 $|\Omega-1|$ 与共动哈勃半径 $(aH)^{-1}$ 的平方成正比——这正是把平坦性问题与视界问题联系起来的关键。取 $a_0=1$，$K=-H_0^2\Omega_K$，$\Omega_K=1-0.3=0.7$。由 \eqref{3.14}（不含暗能量）$H^2/H_0^2=\Omega_{\rm m}a^{-3}+\Omega_{\rm r}a^{-4}+\Omega_Ka^{-2}$，得
$$1-\Omega(a)=\frac{\Omega_Ka^2}{\Omega_{\rm m}a+\Omega_{\rm r}+\Omega_Ka^2},$$
其中 $\Omega_{\rm r}=4.15\times10^{-5}\sym{ch07-hred}{h}^{-2}\approx9.1\times10^{-5}$（$\sym{ch07-hred}{h}=0.677$），$\Omega_{\rm m}=0.3-\Omega_{\rm r}$。

**(a)** 早期 $1-\Omega\simeq\Omega_Ka^2/\Omega_{\rm r}\propto a^2$（辐射期）；$a\gtrsim a_{\rm eq}\sim3\times10^{-4}$ 之后变为 $\simeq\Omega_Ka/\Omega_{\rm m}\propto a$（物质期）；直到 $a\gtrsim0.1$ 才成为 $\mathcal O(1)$，今天等于 0.7。在双对数图上，$1-\Omega$ 是一条先以斜率 2、后以斜率 1 上升的折线。几个数值：$a=10^{-10}$ 时 $1-\Omega\approx8\times10^{-17}$，$a=10^{-4}$ 时 $\approx6\times10^{-5}$。在 Planck 时期 $a\sim10^{-32}$：
$$1-\Omega\simeq\frac{0.7\times10^{-64}}{9.1\times10^{-5}}\approx8\times10^{-61}.$$
也就是说，若没有暴胀，$\Omega$ 在 Planck 时期必须与 1 相差不超过约 $10^{-60}$。哪怕初始偏离大到 $10^{-58}$，今天的开放宇宙就已是 $\Omega\approx0$，闭合宇宙则早已重新坍缩。

**(b)** 按正文取暴胀结束时 $T_e=10^{14}\,\mathrm{GeV}$，$a_e\simeq T_0/T_e\approx2.3\times10^{-27}$，仍处在辐射期，所以
$$1-\Omega(a_e)\simeq\frac{\Omega_Ka_e^2}{\Omega_{\rm r}}\approx4\times10^{-50}.$$
暴胀期间 $H\simeq H_{\rm inf}$ 几乎不变（这时 $\rho$ 由暴胀子主导），$|\Omega-1|=|K|/(aH)^2\propto a^{-2}$。往回推 60 个 e 倍，$a$ 缩小 $e^{60}$，$|\Omega-1|$ 增大 $e^{120}\approx1.3\times10^{52}$ 倍：
$$|\Omega-1|_{\text{60 个 e 倍之前}}\approx4\times10^{-50}\times1.3\times10^{52}\approx6\times10^{2}.$$
这个数远大于 1。也就是说，即使暴胀开始时曲率完全主导（$|\Omega-1|$ 为 $\mathcal O(1)$ 乃至 $\mathcal O(10^2)$），60 个 e 倍的加速膨胀也足以把它压到今天观测所允许的水平：$\Omega=1$ 不再是精细调节，而是暴胀的"吸引子"——就像 \figref{7.4} 中被吹平的气球。反过来，若暴胀只有约 57 个 e 倍，初始就需要 $|\Omega-1|\lesssim1$；这与 \exref{7.3} 中解决视界问题所需的 e 倍数相同，并非巧合：两者都由共动哈勃半径 $1/(aH)$ 缩小了多少决定。`}>
        <Tx>{R`暴胀也解决了*平坦性问题*（flatness problem）：为什么今天的能量密度如此接近临界密度？

(a) 设`}</Tx>
        <Eq n="7.111" say={R`$\Omega$ 是实际能量密度与同一时刻临界密度之比：$\Omega=1$ 对应空间平直，$\Omega$ 偏离 1 的程度衡量了空间曲率在膨胀中的相对分量。`}>{R`\Omega(t)\equiv\frac{8\pi G\rho(t)}{3H^2(t)}`}</Eq>
        <Tx>{R`今天等于 0.3，其中 $\rho$ 只计物质与辐射的能量密度（忽略宇宙学常数）。利用 \eqref{3.14}，画出 $\Omega(t)-1$ 作为标度因子的函数。如果没有发生暴胀，Planck 时期的标度因子约为 $10^{-32}$，那时 $\Omega(t)$ 必须多么接近 1？这种对初始条件的精细调节就是平坦性问题。若不是如此精细地调节，开放宇宙今天会"一眼看出"是开放的（$\Omega$ 几乎恰好为零），而闭合宇宙则会在极早期就重新坍缩。

(b) 现在说明暴胀如何解决平坦性问题。把 $\Omega(t)-1$ 外推回暴胀结束时，再往前经过 60 个 e 倍的暴胀。在这 60 个 e 倍开始之前，$\Omega(t)-1$ 等于多少？这显示了暴胀如何把空间"抹平"（见 \figref{7.4}）。`}</Tx>
      </Exercise>

      {/* ---------------- 7.2 ---------------- */}
      <Exercise n="7.2" title="哈勃体积内的熵" level="★" fromBook
        hint={R`今天光子数密度为 $411\,\mathrm{cm^{-3}}$；哈勃体积取半径 $c/H_0=3000\,\sym{ch07-hred}{h}^{-1}\,\mathrm{Mpc}$ 的球。想一想：绝热膨胀中共动体积内的熵守恒，那么熵是在什么时候、以什么方式产生的？`}
        solution={R`**光子数。**今天光子数密度为 $411\,\mathrm{cm^{-3}}$；哈勃体积为 $(4\pi/3)[3000\,\sym{ch07-hred}{h}^{-1}\,\mathrm{Mpc}]^3=3.3\times10^{84}\,\sym{ch07-hred}{h}^{-3}\,\mathrm{cm^3}$。所以光子总数为
$$N_\gamma\simeq1.4\times10^{87}\,\sym{ch07-hred}{h}^{-3}$$
（$\sym{ch07-hred}{h}=0.677$ 时约 $4.5\times10^{87}$）。这个数在辐射期与物质期大致保持不变，因为数密度 $\propto T^3$、物理体积 $\propto a^3$，而温度 $\propto a^{-1}$。中微子贡献同量级的熵。于是经典宇宙学又多了一个问题：为什么宇宙的熵这么大？

**暴胀如何产生熵。**熵实际上是在暴胀结束时的再加热（reheating）过程中产生的。暴胀结束时，温度其实极低——任何原有的辐射都已被极度稀释（见 \figref{7.4}）——但能量密度（完全储存在标量场中）却极大。当标量场的能量转化为辐射时，辐射温度从基本为零跃升到 $T\sim\rho^{1/4}$，正如我们看到的，它可以高达 $10^{14}\,\mathrm{GeV}$。因此，正是再加热过程产生了我们今天看到的巨大的熵。

换一种说法：暴胀期间宇宙处于一个高度有序的状态——场远离它的真真空（势的极小值），宇宙处于"过冷"状态；向真真空的过渡，就是向高度无序的平衡态的过渡。`}>
        {R`看待暴胀所解决问题的另一个角度，是考虑我们哈勃体积内的熵。熵正比于该体积内粒子的总数，比例系数为 1 的量级。今天我们的哈勃体积内有多少个光子？解释暴胀如何产生如此大的熵。`}
      </Exercise>

      {/* ---------------- 7.3 ---------------- */}
      <Exercise n="7.3" title={R`暴胀结束时的共动哈勃半径：计入物质–辐射转变`} level="★★"
        hint={R`在 $a_e$ 时物质与暗能量完全可以忽略：由 \eqref{3.14}，$H_e^2=H_0^2\Omega_{\rm r}a_e^{-4}$（$a_0=1$）。正文的粗估等价于令 $\Omega_{\rm r}=1$。`}
        solution={R`**正文的粗估。**若把整个历史都当成辐射主导，$H\propto a^{-2}$，则 $a_0H_0/(a_eH_e)=a_e/a_0\simeq T_0/T_e$。取 $T_0=2.35\times10^{-4}\,\mathrm{eV}$，$T_e=10^{14}\,\mathrm{GeV}$，得 $2.3\times10^{-27}\simeq e^{-61}$。这等于假设今天的 $H_0$ 全由辐射提供。

**计入物质–辐射转变。**在 $a_e$ 处，物质与暗能量项完全可忽略，由 \eqref{3.14}，$H_e^2=H_0^2\Omega_{\rm r}a_e^{-4}$（$a_0=1$）。于是
$$\frac{a_0H_0}{a_eH_e}=\frac{a_e}{\sqrt{\Omega_{\rm r}}}=\frac{a_e}{\sqrt{\Omega_{\rm m}a_{\rm eq}}},$$
后一步用了 $a_{\rm eq}=\Omega_{\rm r}/\Omega_{\rm m}$。结果只依赖于今天的辐射密度参数，与暗能量是否存在无关。物理上：$a_{\rm eq}$ 之后 $H$ 只按 $a^{-3/2}$ 下降（而不是 $a^{-2}$），所以今天真实的 $H_0$ 比纯辐射外推值大 $1/\sqrt{\Omega_{\rm r}}$ 倍，今天的共动哈勃半径相应更小。

**数值。**$\Omega_{\rm r}=4.15\times10^{-5}/\sym{ch07-hred}{h}^2\approx9.1\times10^{-5}$（$\sym{ch07-hred}{h}=0.677$），$\sqrt{\Omega_{\rm r}}\approx9.5\times10^{-3}$，所以
$$\frac{a_0H_0}{a_eH_e}\approx\frac{2.3\times10^{-27}}{9.5\times10^{-3}}\approx2.5\times10^{-25}\simeq e^{-56.7}.$$
因此解决视界问题所需的 e 倍数从正文的约 61 降到约 **57**。

**进一步修正（可选）。**若再考虑相对论性自由度的变化：$T\propto g_{*s}^{-1/3}a^{-1}$ 使 $a_e$ 小 $(3.91/106.75)^{1/3}\approx0.33$ 倍；而 $H_e=1.66\sqrt{g_*}\,T_e^2/m_{\rm Pl}\approx1.4\times10^{10}\,\mathrm{GeV}$。直接计算得 $H_0/(a_eH_e)\approx1.3\times10^{-25}\simeq e^{-57.3}$——结论不变：约需 57 个 e 倍。`}>
        {R`我们已经证明：如果早期宇宙一直由普通物质或辐射主导，那么标度因子为 $a_e$ 时的共动视界等于今天共动哈勃半径的 $a_0H_0/a_eH_e$ 倍。假设 $a_e$ 时的温度为 $10^{14}\,\mathrm{GeV}$，计算这个比值。要计入在 $a=a_{\rm eq}$ 处由辐射主导到物质主导的转变。`}
      </Exercise>

      {/* ---------------- 7.4 ---------------- */}
      <Exercise n="7.4" title="正则标量场的能动张量" level="★★"
        hint={R`$V$ 不含度规，所以只有动能项对 $g^{\mu\nu}$ 求导有贡献。注意 \eqref{7.113} 中 $\delta\mathcal L_\phi/\delta g^{\mu\nu}$ 前的因子 $-2$（来自 $\sqrt{-g}$ 的变分与能动张量的标准归一化）。`}
        solution={R`**变分。**作用量为 $S=\int d^4x\sqrt{-g}\,\mathcal L_\phi$。利用 $\delta\sqrt{-g}=-\frac12\sqrt{-g}\,g_{\mu\nu}\delta g^{\mu\nu}$，
$$\delta S=\int d^4x\sqrt{-g}\left[\frac{\partial\mathcal L_\phi}{\partial g^{\mu\nu}}-\frac12g_{\mu\nu}\mathcal L_\phi\right]\delta g^{\mu\nu}.$$
能动张量的标准定义 $T_{\mu\nu}\equiv-\frac{2}{\sqrt{-g}}\frac{\delta S}{\delta g^{\mu\nu}}$ 给出
$$T_{\mu\nu}=-2\frac{\partial\mathcal L_\phi}{\partial g^{\mu\nu}}+g_{\mu\nu}\mathcal L_\phi.$$
这就是题面 \eqref{7.113}（已按勘误改正）。

**代入。**由 \eqref{7.112}，势不含度规，$\frac{\partial\mathcal L_\phi}{\partial g^{\mu\nu}}=-\frac12\frac{\partial\phi}{\partial x^\mu}\frac{\partial\phi}{\partial x^\nu}$，所以
$$T_{\mu\nu}=\frac{\partial\phi}{\partial x^\mu}\frac{\partial\phi}{\partial x^\nu}-g_{\mu\nu}\left[\frac12g^{\rho\sigma}\frac{\partial\phi}{\partial x^\rho}\frac{\partial\phi}{\partial x^\sigma}+V(\phi)\right].$$
用 $g^{\alpha\mu}$ 升第一个指标（$g^{\alpha\mu}g_{\mu\beta}=\delta^\alpha{}_\beta$），并把哑指标改名：
$$T^\alpha{}_\beta=g^{\alpha\nu}\frac{\partial\phi}{\partial x^\nu}\frac{\partial\phi}{\partial x^\beta}-\delta^\alpha{}_\beta\left[\frac12g^{\mu\nu}\frac{\partial\phi}{\partial x^\mu}\frac{\partial\phi}{\partial x^\nu}+V(\phi)\right],$$
这正是 \eqref{7.6}。

**检验。**均匀场、$g^{00}=-1$：$T^0{}_0=-\dot\phi^2-\left[-\frac12\dot\phi^2+V\right]=-\left(\frac12\dot\phi^2+V\right)=-\rho$，与 \eqref{7.8} 一致。`}>
        <Tx>{R`推导正则标量场的能动张量。其拉氏量为`}</Tx>
        <Eq n="7.112" say={R`标量场的拉氏量是动能减势能；由于 $g^{00}<0$，动能项前要加负号，才能使时间导数项以正号出现。`}>{R`\mathcal L_\phi=-\frac12g^{\mu\nu}\frac{\partial\phi}{\partial x^\mu}\frac{\partial\phi}{\partial x^\nu}-V(\phi).`}</Eq>
        <Tx>{R`回忆：拉氏量是动能与势能之差；又因 $g^{00}<0$，动能项需要一个负号。能动张量由作用量对度规变分得到：`}</Tx>
        <Eq n="7.113" say={R`能动张量是物质作用量对度规的响应：度规变化时拉氏量怎样变，就决定了这种物质的能量、动量与应力。`}>{R`T_{\mu\nu}=-2\frac{\delta\mathcal L_\phi}{\delta g^{\mu\nu}}+g_{\mu\nu}\mathcal L_\phi.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{7.113} 漏了因子 $-2$`}>{R`原书印作 $T_{\mu\nu}=\frac{\delta\mathcal L_\phi}{\delta g^{\mu\nu}}+g_{\mu\nu}\mathcal L_\phi$。正确为 $T_{\mu\nu}=-2\frac{\delta\mathcal L_\phi}{\delta g^{\mu\nu}}+g_{\mu\nu}\mathcal L_\phi$。依据：能动张量的标准定义是作用量对 $g^{\mu\nu}$ 的变分乘以 $-2/\sqrt{-g}$（见解答），配合 $\delta\sqrt{-g}=-\frac12\sqrt{-g}\,g_{\mu\nu}\delta g^{\mu\nu}$ 即得上式；它对 \eqref{7.112} 给出 \eqref{7.6}、$\rho=\frac12\dot\phi^2+V$。若按原书字面计算，会得到 $T^0{}_0=\dot\phi^2-V$，即 $\rho=V-\dot\phi^2$，动能符号与系数都错。`}</Box>
        <Tx>{R`用它推导 \eqref{7.6}。`}</Tx>
      </Exercise>

      {/* ---------------- 7.5 ---------------- */}
      <Exercise n="7.5" title={R`从宇宙时 $t$ 换到共形时间 $\eta$`} level="★"
        hint={R`$d\eta=dt/a$，所以 $\dot\phi=\phi'/a$，且 $a'=a^2H$。`}
        solution={R`由 $d/dt=a^{-1}d/d\eta$：
$$\dot\phi=\frac{\phi'}{a},\qquad\ddot\phi=\frac1a\frac{d}{d\eta}\left(\frac{\phi'}{a}\right)=\frac{\phi''}{a^2}-\frac{a'\phi'}{a^3}=\frac{\phi''}{a^2}-\frac{H\phi'}{a},$$
最后一步用了 $a'=a^2H$。代入 \eqref{7.14}：
$$\frac{\phi''}{a^2}-\frac{H\phi'}{a}+\frac{3H\phi'}{a}+V_{,\phi}=\frac{\phi''}{a^2}+\frac{2H\phi'}{a}+V_{,\phi}=0.$$
乘以 $a^2$ 即得 \eqref{7.15}：$\phi''+2aH\phi'+a^2V_{,\phi}=0$。哈勃摩擦的系数从 3 变成 2，是因为把 $\ddot\phi$ 改写为 $\phi''$ 时"吸收"了一份 $aH\phi'$。`}>
        {R`证明：把时间变量从 $t$ 换成 $\eta$，\eqref{7.15} 即可由 \eqref{7.14} 得到。`}
      </Exercise>

      {/* ---------------- 7.6 ---------------- */}
      <Exercise n="7.6" title={R`重标量场的行为像非相对论物质`} level="★★"
        hint={R`试探解 $\phi=A_\phi(t)\cos(mt+\alpha)$，其中振幅缓变：$\dot A_\phi/A_\phi\sim H\ll m$。保留 $H/m$ 的领头阶。也可以直接对一个振荡周期平均压强。`}
        solution={R`**振荡频率。**均匀场满足 \eqref{7.14}：$\ddot\phi+3H\dot\phi+m^2\phi=0$。当 $m\gg H$ 时，哈勃摩擦在一个振荡周期内只是微扰。取 $\phi=A_\phi(t)\cos(mt+\alpha)$，振幅缓变（$\dot A_\phi\sim HA_\phi$）。代入后：
$$\left[\ddot A_\phi+3H\dot A_\phi\right]\cos(mt+\alpha)-m\left[2\dot A_\phi+3HA_\phi\right]\sin(mt+\alpha)=0,$$
其中 $-m^2A_\phi\cos$ 与 $m^2\phi$ 恰好抵消。$\sin$ 项是 $\mathcal O(mHA_\phi)$，而 $\cos$ 项只有 $\mathcal O(H^2A_\phi)$，比它小 $H/m$ 倍。令领头阶的 $\sin$ 项为零：
$$2\dot A_\phi+3HA_\phi=0\ \Rightarrow\ A_\phi\propto a^{-3/2}.$$
因此场以频率 $m$（即它的质量）振荡，振幅缓慢衰减。

**能量密度。**$\rho=\frac12\dot\phi^2+\frac12m^2\phi^2\simeq\frac12m^2A_\phi^2\left[\sin^2+\cos^2\right]=\frac12m^2A_\phi^2\propto a^{-3}$，与非相对论物质完全相同。另一种看法：对一个周期平均，$\langle\mathcal P\rangle=\frac12m^2A_\phi^2\langle\sin^2-\cos^2\rangle=0$，即 $w=0$；再由 \eqref{7.12} 得 $\rho\propto a^{-3}$。

**为什么暴胀中可以忽略重场。**质量 $m\gg H_{\rm inf}$ 的场即便初始偏离了极小值，也只会振荡，其能量按 $a^{-3}\propto e^{-3H_{\rm inf}t}$ 指数稀释，几个 e 倍之后与几乎恒定的暴胀子能量相比就微不足道了（\figref{7.4}）。它的量子涨落也不会被"冻结"：模式方程中的有效频率 $\sqrt{k^2/a^2+m^2}\ge m\gg H$，即使在 $k<aH$ 之后仍然绝热振荡，振幅继续按 $a^{-3/2}$ 衰减，不会留下视界外的扰动。只有轻场（$m\lesssim H$）才会在穿出视界时冻结。暴胀子本身正是这样的轻场：由 \exref{7.8}，$V_{,\phi\phi}=3H^2(\epsilon_{\rm sr}-\delta_{\rm sr})\ll H^2$。`}>
        {R`考虑一个质量为 $m$ 的自由、均匀标量场，其势为 $V=m^2\phi^2/2$。证明：若 $m\gg H$，标量场以等于其质量的频率振荡。再证明其能量密度按 $a^{-3}$ 下降，因此它的行为与普通的非相对论物质完全一样。用这一点说明：为什么在暴胀期间可以忽略那些比 $H$ 重得多的场。`}
      </Exercise>

      {/* ---------------- 7.7 ---------------- */}
      <Exercise n="7.7" title="慢滚参数的几个有用恒等式" level="★★"
        hint={R`(a) 用 $a'=a^2H$ 与 \eqref{7.17}。(b) 由 Friedmann 方程与 \eqref{7.12} 得 $\dot H=-4\pi G\dot{\bar\phi}^2$。(c) 对 \eqref{7.114} 取对数导数，并用 \eqref{7.18} 的第一行；再用 $d\eta|_{aH=k}/dk=1/k^2$。`}
        solution={R`**(a)** 由 $a'=a^2H$ 与 \eqref{7.17} 的 $H'=-aH^2\epsilon_{\rm sr}$：
$$\frac{d}{d\eta}\left(\frac1{aH}\right)=-\frac{a'H+aH'}{(aH)^2}=-\frac{a'}{a^2H}-\frac{H'}{aH^2}=-1+\epsilon_{\rm sr}.$$
第一项因 $a'=a^2H$ 等于 $-1$，第二项按定义就是 $\epsilon_{\rm sr}$。这说明 $\epsilon_{\rm sr}<1$ 时共动哈勃半径随时间减小——正是暴胀的定义。

**(b)** 平直宇宙中 $H^2=\frac{8\pi G}{3}\left(\frac12\dot{\bar\phi}^2+V\right)$。对 $t$ 求导，并用 \eqref{7.13}（即 $\dot\rho=-3H\dot{\bar\phi}^2$）：
$$2H\dot H=\frac{8\pi G}{3}\left(-3H\dot{\bar\phi}^2\right)\ \Rightarrow\ \dot H=-4\pi G\dot{\bar\phi}^2.$$
于是 $\epsilon_{\rm sr}=\frac{d}{dt}\frac1H=-\frac{\dot H}{H^2}=\frac{4\pi G\dot{\bar\phi}^2}{H^2}$。再用 $\dot{\bar\phi}=\bar\phi'/a$，即得 \eqref{7.114}。这是精确关系，不需要慢滚近似。

**(c)** 对 \eqref{7.114} 取对数并对 $\eta$ 求导：
$$\frac{\epsilon_{\rm sr}'}{\epsilon_{\rm sr}}=2\frac{\bar\phi''}{\bar\phi'}-2\frac{a'}{a}-2\frac{H'}{H}=2\left[\frac{\bar\phi''}{\bar\phi'}-aH\right]+2aH\epsilon_{\rm sr}.$$
由 \eqref{7.18} 第一行，$\delta_{\rm sr}=\frac{\bar\phi''-aH\bar\phi'}{aH\bar\phi'}$，即 $\frac{\bar\phi''}{\bar\phi'}-aH=aH\delta_{\rm sr}$。代入即得 \eqref{7.115}。

对 $\ln k$ 的导数沿"视界穿出时刻"$aH=k$ 计算。与 \eqref{7.106}–\eqref{7.107} 相同，$d\eta|_{aH=k}/dk=-d(aH)^{-1}|_{aH=k}/dk=1/k^2$，所以
$$\left.\frac{d\ln\epsilon_{\rm sr}}{d\ln k}\right|_{aH=k}=k\,\frac{1}{\epsilon_{\rm sr}}\frac{d\epsilon_{\rm sr}}{d\eta}\,\frac{d\eta}{dk}=\frac{2aH(\epsilon_{\rm sr}+\delta_{\rm sr})}{k}=2(\epsilon_{\rm sr}+\delta_{\rm sr}),$$
即 \eqref{7.116}。（若严格利用 (a)，$d\ln(aH)/d\eta=aH(1-\epsilon_{\rm sr})$，会多出一个因子 $(1-\epsilon_{\rm sr})^{-1}$，那是高一阶的慢滚修正。）`}>
        <Tx>{R`推导暴胀期间慢滚参数满足的几个有用恒等式。

(a) 证明
$$\frac{d}{d\eta}\left(\frac{1}{aH}\right)=\epsilon_{\rm sr}-1.$$

(b) 证明`}</Tx>
        <Eq n="7.114" say={R`第一慢滚参数就是场的动能与哈勃率平方之比（以 $4\pi G$ 为单位）：场滚得越快，$H$ 下降得越快。`}>{R`4\pi G(\bar\phi')^2=\epsilon_{\rm sr}a^2H^2.`}</Eq>
        <Tx>{R`(c) 利用 $\epsilon_{\rm sr}$ 与 $\delta_{\rm sr}$ 的定义，证明`}</Tx>
        <Eq n="7.115" say={R`$\epsilon_{\rm sr}$ 本身在一个哈勃时间内的相对变化是慢滚二阶小量，由 $\epsilon_{\rm sr}+\delta_{\rm sr}$ 控制。`}>{R`\frac{d\epsilon_{\rm sr}}{d\eta}=2aH\epsilon_{\rm sr}(\epsilon_{\rm sr}+\delta_{\rm sr}).`}</Eq>
        <Tx>{R`并由此证明`}</Tx>
        <Eq n="7.116" say={R`不同波数在不同时刻穿出视界，所以 $\epsilon_{\rm sr}$ 随时间的缓慢变化转化为它随波数的缓慢变化——这就是标量谱指数中 $\delta_{\rm sr}$ 的来源。`}>{R`\left.\frac{d\ln\epsilon_{\rm sr}}{d\ln k}\right|_{aH=k}=2(\epsilon_{\rm sr}+\delta_{\rm sr}).`}</Eq>
      </Exercise>

      {/* ---------------- 7.8 ---------------- */}
      <Exercise n="7.8" title="用势函数表示慢滚参数" level="★★"
        hint={R`最低阶慢滚近似：$H^2\simeq\frac{8\pi G}{3}V$，$3H\dot{\bar\phi}\simeq-V_{,\phi}$。对后者求时间导数得到 $\ddot{\bar\phi}$，再用 $\dot H=-\epsilon_{\rm sr}H^2$。`}
        solution={R`**慢滚近似。**势能主导（$\dot{\bar\phi}^2\ll V$）且加速度可忽略（$|\ddot{\bar\phi}|\ll|3H\dot{\bar\phi}|$）时，Friedmann 方程与 \eqref{7.14} 化为
$$H^2\simeq\frac{8\pi G}{3}V,\qquad3H\dot{\bar\phi}\simeq-V_{,\phi}.$$

**$\epsilon_{\rm sr}$。**由 \exref{7.7}(b)，$\epsilon_{\rm sr}=4\pi G\dot{\bar\phi}^2/H^2$。代入 $\dot{\bar\phi}=-V_{,\phi}/(3H)$：
$$\epsilon_{\rm sr}=\frac{4\pi G V_{,\phi}^2}{9H^4}=\frac{4\pi GV_{,\phi}^2}{9}\cdot\frac{9}{64\pi^2G^2V^2}=\frac{1}{16\pi G}\left(\frac{V_{,\phi}}{V}\right)^2.$$

**$\delta_{\rm sr}$。**对 $\dot{\bar\phi}=-V_{,\phi}/(3H)$ 求时间导数：
$$\ddot{\bar\phi}=-\frac{V_{,\phi\phi}\dot{\bar\phi}}{3H}+\frac{V_{,\phi}\dot H}{3H^2}=-\frac{V_{,\phi\phi}\dot{\bar\phi}}{3H}-\dot{\bar\phi}\frac{\dot H}{H},$$
其中用了 $V_{,\phi}/(3H)=-\dot{\bar\phi}$。于是
$$\delta_{\rm sr}=\frac{\ddot{\bar\phi}}{H\dot{\bar\phi}}=-\frac{V_{,\phi\phi}}{3H^2}-\frac{\dot H}{H^2}=\epsilon_{\rm sr}-\frac{V_{,\phi\phi}}{3H^2}=\epsilon_{\rm sr}-\frac{1}{8\pi G}\frac{V_{,\phi\phi}}{V},$$
最后一步用了 $3H^2=8\pi GV$。所有导数都在 $\bar\phi$ 处取值。

**说明。**文献中常用的"势慢滚参数" $\epsilon_V\equiv\frac{1}{16\pi G}(V_{,\phi}/V)^2$、$\eta_V\equiv\frac{1}{8\pi G}V_{,\phi\phi}/V$ 与本书参数的关系是 $\epsilon_{\rm sr}\simeq\epsilon_V$、$\delta_{\rm sr}\simeq\epsilon_V-\eta_V$。于是 \eqref{7.110} 写成熟悉的 $n_s=1-6\epsilon_V+2\eta_V$。`}>
        <Tx>{R`把慢滚参数 $\epsilon_{\rm sr}$ 与 $\delta_{\rm sr}$ 用势 $V$ 及其对 $\phi$ 的导数表示出来。证明在最低阶下
$$\epsilon_{\rm sr}=\frac{1}{16\pi G}\left(\frac{V_{,\phi}}{V}\right)^2$$
以及
$$\delta_{\rm sr}=\epsilon_{\rm sr}-\frac{1}{8\pi G}\frac{V_{,\phi\phi}}{V},$$
其中势的导数都在 $\bar\phi$ 处取值。`}</Tx>
      </Exercise>

      {/* ---------------- 7.9 ---------------- */}
      <Exercise n="7.9" title={R`物态方程、声速与压强扰动：$\delta\mathcal P/\delta\rho=c_s^2$`} level="★★★"
        hint={R`物质与辐射都有确定的 $\mathcal P(\rho)$。对标量场，由 \eqref{7.6} 在牛顿规范中写出 $\delta\rho$ 与 $\delta\mathcal P$（注意 $g^{00}=-(1-2\Psi)$），再用 $V_{,\phi}=-H\dot{\bar\phi}(3+\delta_{\rm sr})$。视界外 $\delta\phi\propto\dot{\bar\phi}$，所以 $\delta\dot\phi/(H\delta\phi)$ 是慢滚小量；$\Psi$ 由 Einstein 方程的时–空分量给出。`}
        solution={R`**物质。**$\mathcal P=0$，所以 $\delta\mathcal P=0$，$c_s^2=\dot{\mathcal P}/\dot\rho=0$：两者相等。

**辐射。**$\mathcal P=\rho/3$ 对任意扰动都成立，故 $\delta\mathcal P/\delta\rho=1/3=c_s^2$。

**标量场：背景声速。**$\dot\rho=-3H\dot{\bar\phi}^2$；$\dot{\mathcal P}=\dot{\bar\phi}(\ddot{\bar\phi}-V_{,\phi})=\dot{\bar\phi}(2\ddot{\bar\phi}+3H\dot{\bar\phi})$（用 \eqref{7.14} 消去 $V_{,\phi}$）。于是
$$c_s^2=\frac{\dot{\mathcal P}}{\dot\rho}=-1-\frac{2\ddot{\bar\phi}}{3H\dot{\bar\phi}}=-1-\frac23\delta_{\rm sr}.$$

**标量场：扰动。**由 \eqref{7.6}，均匀背景上只有时间导数，$T^0{}_0=\frac12g^{00}\dot\phi^2-V$，$T^i{}_i=-\frac12g^{00}\dot\phi^2-V$（不求和，$g^{ij}\partial_i\phi\partial_j\phi$ 是二阶小量）。牛顿规范中 $g^{00}=-(1-2\Psi)$，取一阶：
$$\delta\rho=-\delta T^0{}_0=\dot{\bar\phi}(\delta\dot\phi-\dot{\bar\phi}\Psi)+V_{,\phi}\delta\phi,\qquad\delta\mathcal P=\dot{\bar\phi}(\delta\dot\phi-\dot{\bar\phi}\Psi)-V_{,\phi}\delta\phi.$$
记 $Y\equiv(\delta\dot\phi-\dot{\bar\phi}\Psi)/(H\delta\phi)$，并用 $V_{,\phi}=-\ddot{\bar\phi}-3H\dot{\bar\phi}=-H\dot{\bar\phi}(3+\delta_{\rm sr})$：
$$\frac{\delta\mathcal P}{\delta\rho}=\frac{Y+3+\delta_{\rm sr}}{Y-3-\delta_{\rm sr}}\simeq-1-\frac23Y\quad(|Y|\ll1),$$
所以
$$\frac{\delta\mathcal P}{\delta\rho}-c_s^2\simeq\frac23(\delta_{\rm sr}-Y).$$

**$Y$ 是慢滚小量。**(i) $\Psi$ 项：Einstein 方程的时–空分量（附录 A 式 (A.98)，\exref{7.13}）中，标量场的 $\delta T^0{}_i=-ik_i\dot{\bar\phi}\delta\phi$，给出 $\Psi'+aH\Psi=4\pi G\bar\phi'\delta\phi$。视界外 $\Psi$ 缓变，$\Psi\simeq4\pi G\bar\phi'\delta\phi/(aH)$，于是 $\dot{\bar\phi}\Psi/(H\delta\phi)=4\pi G(\bar\phi')^2/(aH)^2=\epsilon_{\rm sr}$（\eqref{7.114}）。(ii) $\delta\dot\phi$ 项：用 de Sitter 模函数 \eqref{7.40}，$\delta\phi=v/a\propto(1+ik\eta)e^{-ik\eta}$，得
$$\frac{\delta\dot\phi}{H\delta\phi}=-\frac{(k\eta)^2}{1+ik\eta},$$
它在视界外按 $(k/aH)^2\propto e^{-2\Delta N}$ 迅速消失（$\Delta N$ 为穿出视界后的 e 倍数）；计入慢滚修正后，视界外 $\delta\phi\propto\dot{\bar\phi}$（$\mathcal R$ 守恒），剩下 $\delta\dot\phi/(H\delta\phi)\to\ddot{\bar\phi}/(H\dot{\bar\phi})=\delta_{\rm sr}$。

所以在模式穿出视界之时及之后，$Y=\mathcal O(\epsilon_{\rm sr},\delta_{\rm sr})$，
$$\frac{\delta\mathcal P}{\delta\rho}-c_s^2=\mathcal O(\epsilon_{\rm sr},\delta_{\rm sr}),$$
即单场暴胀产生的扰动在超视界尺度上是绝热的。（严格在 $k|\eta|=1$ 那一刻，梯度项 $|(k\eta)^2/(1+ik\eta)|=1/\sqrt2$ 尚未衰减；它与慢滚无关，而是有限 $k/aH$ 的效应，穿出视界后一两个 e 倍内即降到百分之几以下。注意比值 $\delta\mathcal P/\delta\rho$ 依赖规范，而 $\delta\mathcal P-c_s^2\delta\rho$ 是规范不变的。）`}>
        <Tx>{R`描述宇宙中的压强、以及把压强与能量密度联系起来的方式有好几种。第一种在第 2 章引入，即*物态方程*`}</Tx>
        <Eq n="7.117" say={R`物态方程参数是压强与能量密度之比：物质为 0，辐射为 1/3，慢滚标量场接近 $-1$。`}>{R`w\equiv\frac{\mathcal P}{\rho}.`}</Eq>
        <Tx>{R`第二种是*声速*的平方，`}</Tx>
        <Eq n="7.118" say={R`声速平方是压强随能量密度的变化率，决定了压强扰动如何响应密度扰动。`}>{R`c_s^2\equiv\frac{d\mathcal P}{d\rho}.`}</Eq>
        <Tx>{R`在均匀宇宙中，计算 $c_s^2$ 的方法是把 $\mathcal P$ 与 $\rho$ 都对时间求导再取比值：$c_s^2=\dot{\mathcal P}/\dot\rho$。最后，还有压强扰动与能量密度扰动之比，`}</Tx>
        <Eq n="7.119" say={R`压强扰动与能量密度扰动之比可直接从能动张量扰动读出：时–时分量是负的能量密度，三个对角空间分量之和是三倍压强。`}>{R`\frac{\delta\mathcal P}{\delta\rho}=-\frac{\delta T^i{}_i}{3\delta T^0{}_0},`}</Eq>
        <Tx>{R`其中负号是因为能动张量的时–时分量等于负的能量密度，因子 3 抵消了对三个空间指标的求和。对绝热扰动，$\delta\mathcal P/\delta\rho=c_s^2$。证明这一关系在以下三种情形中成立：物质、辐射，以及暴胀期间视界穿越时刻的单个标量场。对最后一种情形，只需证明差值 $\delta\mathcal P/\delta\rho-c_s^2$ 是慢滚参数 $\epsilon_{\rm sr}$、$\delta_{\rm sr}$ 的量级。`}</Tx>
      </Exercise>

      {/* ---------------- 7.10 ---------------- */}
      <Exercise n="7.10" title="量子谐振子的基本性质" level="★"
        hint={R`$\hat p=\dot v\,\hat a+\dot v^*\hat a^\dagger$，对易子只剩 Wronskian $v\dot v^*-v^*\dot v$。零点能：$\hat a|0\rangle=0$，所以 $\langle0|\hat a^\dagger\cdots|0\rangle$ 与 $\langle0|\cdots\hat a|0\rangle$ 都为零，只剩 $\langle0|\hat a\hat a^\dagger|0\rangle=1$。`}
        solution={R`**(a)** 由 \eqref{7.20}，$\hat x=v\hat a+v^*\hat a^\dagger$，对时间求导得 $\hat p=\dot v\hat a+\dot v^*\hat a^\dagger$。利用 $[\hat a,\hat a^\dagger]=1$、$[\hat a,\hat a]=[\hat a^\dagger,\hat a^\dagger]=0$：
$$[\hat x,\hat p]=v\dot v^*[\hat a,\hat a^\dagger]+v^*\dot v[\hat a^\dagger,\hat a]=v\dot v^*-v^*\dot v.$$
对 \eqref{7.23}，$v=e^{-i\omega t}/\sqrt{2\omega}$，$\dot v=-i\omega v$，所以
$$[\hat x,\hat p]=i\omega|v|^2+i\omega|v|^2=2i\omega\cdot\frac{1}{2\omega}=i.$$
这也说明了 \eqref{7.23} 中归一化 $1/\sqrt{2\omega}$ 的来历：它正是使 Wronskian 等于 $i$ 的选择。

**(b)** $\hat{\sym{ch07-pho}{p}}=-i\omega(v\hat a-v^*\hat a^\dagger)$。在基态中，只有先产生后湮灭的 $\hat a\hat a^\dagger$ 项有非零期望值：
$$\langle0|\hat{\sym{ch07-pho}{p}}^2|0\rangle=-\omega^2\langle0|(v\hat a-v^*\hat a^\dagger)(v\hat a-v^*\hat a^\dagger)|0\rangle=-\omega^2(-vv^*)\langle0|\hat a\hat a^\dagger|0\rangle=\omega^2|v|^2,$$
$$\langle0|\hat x^2|0\rangle=|v|^2,$$
后者即 \eqref{7.26}。
所以零点能为
$$\langle0|\hat E|0\rangle=\frac12\omega^2|v|^2+\frac{\omega^2}{2}|v|^2=\omega^2|v|^2=\frac{\omega}{2}.$$
（恢复单位即 $\hbar\omega/2$。）更一般地，把 $\hat x$、$\hat{\sym{ch07-pho}{p}}$ 代入可得 $\hat E=\omega\left(\hat a^\dagger\hat a+\frac12\right)$，激发态能量为 $\omega(n+\frac12)$。`}>
        <Tx>{R`计算量子化谐振子的几个熟知性质。

(a) 单位质量谐振子的动量为 $\sym{ch07-pho}{p}=dx/dt$。计算
$$[\hat x,\hat p]$$
并证明它等于 $i$。算符 $\hat p$ 可以通过把 $\hat x$（\eqref{7.20}）对时间求导得到。

(b) 计算单位质量谐振子的零点能。方法是把能量
$$\sym{ch07-Eho}{E}=\frac{\sym{ch07-pho}{p}^2}{2}+\frac{\omega^2x^2}{2}$$
量子化，然后计算它在基态中的期望值 $\langle0|\hat E|0\rangle$。`}</Tx>
      </Exercise>

      {/* ---------------- 7.11 ---------------- */}
      <Exercise n="7.11" title="暴胀期间标量场不产生引力波" level="★"
        hint={R`看 \eqref{7.6} 中 $T^i{}_j$ 的两项：$g^{i\nu}\partial_\nu\phi\,\partial_j\phi$ 中两个因子各自至少是一阶小量；另一项正比于 $\delta^i{}_j$。`}
        solution={R`由 \eqref{7.6}，
$$T^i{}_j=g^{i\nu}\frac{\partial\phi}{\partial x^\nu}\frac{\partial\phi}{\partial x^j}-\delta^i{}_j\left[\frac12g^{\mu\nu}\frac{\partial\phi}{\partial x^\mu}\frac{\partial\phi}{\partial x^\nu}+V(\phi)\right].$$
**第一项是二阶小量。**零阶场 $\bar\phi(t)$ 是均匀的，所以 $\partial_j\phi=\partial_j\delta\phi$ 是一阶量。另一个因子 $g^{i\nu}\partial_\nu\phi$：$\nu=k$ 时 $g^{ik}\partial_k\delta\phi$ 是一阶量；$\nu=0$ 时 $g^{i0}$ 在背景中为零，至多一阶，乘以 $\dot{\bar\phi}$ 仍是一阶。两者相乘是二阶，线性理论中可以丢掉。

**第二项正比于 $\delta^i{}_j$。**它的一阶扰动为 $-\delta^i{}_j\,\delta[\cdots]$，对 $i=1,2$ 给出完全相同的值。所以
$$\delta T^1{}_1-\delta T^2{}_2=0.$$
同理，$\times$ 偏振的源 $\delta T^1{}_2\propto\delta^1{}_2=0$。因此在线性阶，标量场只有各向同性的压强扰动，没有横向无迹的各向异性应力：\eqref{7.27} 右边为零，引力波只能来自度规本身的量子涨落（§7.3），而不是由暴胀子"辐射"出来的。这正是标量–矢量–张量分解在线性阶彼此退耦的一个具体例子。`}>
        {R`证明暴胀期间标量场不会激发引力波。为此回忆：设 $h=h_+$，\eqref{7.27} 的右边为
$$\delta T^1{}_1-\delta T^2{}_2,$$
其中 $\delta T$ 是能动张量的扰动（假设由 $\phi$ 主导），并且与推导 \eqref{6.73} 时一样，我们取 $\boldsymbol k$ 沿 $z$ 方向。证明对标量场，这个右边确实为零。`}
      </Exercise>

      {/* ---------------- 7.12 ---------------- */}
      <Exercise n="7.12" title={R`de Sitter 模函数 \eqref{7.40} 的推导`} level="★★" fromBook
        hint={R`$v=\eta\tilde v$ 给出 $v''=\eta\tilde v''+2\tilde v'$。令 $\sym{ch07-xke}{x}\equiv k\eta$，得到一阶球 Bessel 方程（式 (C.13)），解为 $j_1$ 与 $y_1$。在 $k\eta\to-\infty$ 时只保留 $e^{-ik\eta}$。`}
        solution={<>
          <Tx>{R`**(a)** 由 $v=\eta\tilde v$，$v'=\tilde v+\eta\tilde v'$，$v''=2\tilde v'+\eta\tilde v''$。代入 \eqref{7.39} 并除以 $\eta$，方程变为
$$\frac{d^2\tilde v}{d\eta^2}+\frac2\eta\frac{d\tilde v}{d\eta}+\left(k^2-\frac{2}{\eta^2}\right)\tilde v=0.$$
（原书附录此式漏印"$=0$"，见下方勘误。）定义 $\sym{ch07-xke}{x}\equiv k\eta$，可见 $\tilde v$ 满足一阶球 Bessel 方程（式 (C.13)）。

**(b)** 式 (C.13) 的两个解是 $j_1(\sym{ch07-xke}{x})$ 与 $y_1(\sym{ch07-xke}{x})$，所以通解为 $\sym{ch07-cA}{A}j_1+\sym{ch07-cB}{B}y_1$。把它们显式写出：
$$\begin{aligned}v=\eta\tilde v&=\eta\left(\sym{ch07-cA}{A}\frac{\sin\sym{ch07-xke}{x}-\sym{ch07-xke}{x}\cos\sym{ch07-xke}{x}}{\sym{ch07-xke}{x}^2}-\sym{ch07-cB}{B}\frac{\cos\sym{ch07-xke}{x}+\sym{ch07-xke}{x}\sin\sym{ch07-xke}{x}}{\sym{ch07-xke}{x}^2}\right)\\&=\frac{1}{2k^2\eta}\Big(e^{ik\eta}[-i\sym{ch07-cA}{A}-\sym{ch07-cA}{A}k\eta-\sym{ch07-cB}{B}+i\sym{ch07-cB}{B}k\eta]\\&\qquad\qquad+e^{-ik\eta}[i\sym{ch07-cA}{A}-\sym{ch07-cA}{A}k\eta-\sym{ch07-cB}{B}-i\sym{ch07-cB}{B}k\eta]\Big).\end{aligned}$$

**(c)** 当 $k\eta$ 很大且为负（模式深在视界内）时，我们要求 $v\to e^{-ik\eta}/\sqrt{2k}$（\eqref{7.23} 中 $\omega=k$、$t\to\eta$）。所以 $e^{+ik\eta}$ 的系数在这一极限下必须为零；它的主导部分正比于 $-\sym{ch07-cA}{A}+i\sym{ch07-cB}{B}$，因此 $\sym{ch07-cA}{A}=i\sym{ch07-cB}{B}$。（此时 $e^{+ik\eta}$ 系数中的常数部分 $-i\sym{ch07-cA}{A}-\sym{ch07-cB}{B}$ 也恰好为零。）$e^{-ik\eta}$ 的系数在大 $|k\eta|$ 时为
$$\frac{1}{2k^2\eta}\left[-2\sym{ch07-cA}{A}k\eta\right]=-\frac{\sym{ch07-cA}{A}}{k}.$$
它必须等于 $(2k)^{-1/2}$，所以 $\sym{ch07-cA}{A}=-(k/2)^{1/2}$。于是正确的解为
$$v=\frac{e^{-ik\eta}}{\sqrt{2k}}\left[1-\frac{i}{k\eta}\right],$$
与 \eqref{7.40} 一致。（编者补充：代回完整的 $e^{-ik\eta}$ 系数 $\frac{1}{2k^2\eta}[2i\sym{ch07-cA}{A}-2\sym{ch07-cA}{A}k\eta]=-\frac{\sym{ch07-cA}{A}}{k}\left(1-\frac{i}{k\eta}\right)$，可直接看出方括号的来历。）`}</Tx>
          <Box kind="warning" title={R`勘误：附录 A 式 (A.94) 漏印"$=0$"`}>{R`原书附录 A 习题 7.12 解答中的 (A.94) 印作 $\frac{d^2\tilde v}{d\eta^2}+\frac2\eta\frac{d\tilde v}{d\eta}+\left(k^2-\frac{2}{\eta^2}\right)\tilde v$，没有等号右边。正确为 $\cdots=0$：它是由 \eqref{7.39} 代入 $v=\eta\tilde v$ 后除以 $\eta$ 得到的齐次方程，也正是一阶球 Bessel 方程 (C.13) 的形式。`}</Box>
        </>}>
        <Tx>{R`证明 \eqref{7.40} 是 \eqref{7.39} 的恰当解。

(a) 定义 $\tilde v=v/\eta$，把 \eqref{7.39} 改写成关于 $\tilde v$ 的方程。

(b) 所得方程是球 Bessel 方程。把它的通解写成两个以 $k\eta$ 为自变量的函数的线性组合。

(c) 用 $k|\eta|\gg1$ 时谐振子的 Minkowski 空间解作为初条件，定出 (b) 中的系数，并证明这样得到的正是 \eqref{7.40}。`}</Tx>
      </Exercise>

      {/* ---------------- 7.13 ---------------- */}
      <Exercise n="7.13" title={R`大尺度上的 \eqref{7.66}`} level="★★" fromBook
        hint={R`把 \eqref{6.41} 与 \exref{6.6} 的时–空分量方程中的 $\Phi$ 换成 $-\Psi$；把第二个方程乘以 $3iaHk_i/k^2$ 后与第一个相加，左边的时间导数项正好抵消。`}
        solution={R`Einstein 方程的两个分量为
$$\begin{aligned}k^2\Psi+3aH\left(\Psi'+aH\Psi\right)&=4\pi Ga^2\delta T^0{}_0\\ik_i(\Psi'+aH\Psi)&=-4\pi Ga\,\delta T^0{}_i.\end{aligned}$$
这里只是把第 6 章的结果照搬过来，并把 $\Phi$ 换成 $-\Psi$。由于 $\delta T^0{}_i$ 是一阶量，可以用背景度规升降指标：$\delta T^i{}_0=-\delta T^0{}_i/a^2$。然后把第二个方程乘以 $3iaHk_i/k^2$ 并与第一个方程相加，得到
$$k^2\Psi=4\pi Ga^2\left[\delta T^0{}_0+\frac{3a^2Hik_i\delta T^i{}_0}{k^2}\right].$$
在大尺度上，左边可以忽略，所以右边方括号中的两项之和必须为零，这就给出 \eqref{7.66}。

（编者补充：左边可以忽略，是因为与右边每一项单独相比，$k^2\Psi$ 小了 $(k/aH)^2$ 倍——由 Friedmann 方程，$4\pi Ga^2\delta T^0{}_0\sim(aH)^2\Psi$。）`}>
        {R`证明在大尺度上 \eqref{7.66} 成立。一种做法是把 Einstein 方程的时–时分量（\eqref{6.41}）与时–空分量（\exref{6.6}）结合起来，再取大尺度极限。`}
      </Exercise>

      {/* ---------------- 7.14 ---------------- */}
      <Exercise n="7.14" title={R`单场暴胀的一致性关系：$r=-8n_{\rm T}$`} level="★"
        hint={R`比较 \eqref{7.104} 与 \eqref{7.108}。`}
        solution={R`由 \eqref{7.104}，$r=16\epsilon_{\rm sr}$；由 \eqref{7.108}，$n_{\rm T}=-2\epsilon_{\rm sr}$。消去 $\epsilon_{\rm sr}$：
$$r=-8n_{\rm T}.$$
**为什么稳健。**两者都只依赖于 $\epsilon_{\rm sr}$，即 $H$ 的变化率：张量谱只测量 $H$（\eqref{7.102}），它的倾斜来自 $H$ 在暴胀中的缓慢下降；而标量谱比张量谱多一个 $1/\epsilon_{\rm sr}$ 因子（\eqref{7.99}）。所以这个关系与势的具体形状无关，对任何单场、正则动能、从 Bunch–Davies 真空出发的慢滚模型都成立（在慢滚最低阶）。

**观测意义。**$r$ 与 $n_{\rm T}$ 同号相反、且 $n_{\rm T}$ 必为红倾斜（$n_{\rm T}<0$）。一旦测到原初引力波，同时测量 $r$ 和 $n_{\rm T}$ 就能检验单场暴胀；若违反这一关系，则说明暴胀由多场、非正则动能等更复杂的物理驱动。实际困难在于：若 $r\lesssim0.04$，则 $|n_{\rm T}|\lesssim0.005$，极难测量。`}>
        {R`利用 \secref{7.6} 的结果，推导两个可观测量 $n_{\rm T}$ 与 $r$ 之间的*一致性关系*（consistency relation）——这是单场暴胀的一个稳健预言。`}
      </Exercise>

      {/* ---------------- 7.15 ---------------- */}
      <Exercise n="7.15" title={R`中微子的能量占比 $f_\nu$`} level="★"
        hint={R`正负电子湮灭后 $T_\nu=(4/11)^{1/3}T$；每种中微子（连同反中微子）有 2 个自由度，费米子再乘 $7/8$；共 3 种。`}
        solution={R`**比值 $\rho_\nu/\rho_\gamma$。**光子 $\rho_\gamma=\frac{\pi^2}{15}T^4$（2 个偏振）。三种无质量中微子，每种连同反中微子共 2 个自由度，费米子因子 $7/8$：$\rho_\nu=3\times\frac78\times\frac{\pi^2}{15}T_\nu^4$。正负电子湮灭后 $T_\nu/T=(4/11)^{1/3}$（§2.4.4），所以
$$\frac{\rho_\nu}{\rho_\gamma}=3\times\frac78\left(\frac{4}{11}\right)^{4/3}=\frac{21}{8}\left(\frac{4}{11}\right)^{4/3}\approx0.681.$$

**中微子在辐射中的占比。**习题 7.16 中真正出现的量是中微子占*全部辐射*的比例（见 \eqref{7.122} 的推导：由 Friedmann 方程 $32\pi Ga^2\rho_{\rm r}=12/\eta^2$，出现的是 $\rho_\nu/\rho_{\rm r}$）：
$$f_\nu=\frac{\rho_\nu}{\rho_\gamma+\rho_\nu}=\frac{0.681}{1.681}\approx0.405.$$
若取标准的 $N_{\rm eff}=3.046$（计入中微子退耦时的部分加热），$\rho_\nu/\rho_\gamma\approx0.692$，$f_\nu\approx0.409$。两个比值从 $e^\pm$ 湮灭之后一直保持不变（两者都 $\propto a^{-4}$），直到中微子质量变得重要（$T_\nu\sim m_\nu$，远在复合之后）。`}>
        <Tx>{R`计算中微子与辐射能量密度之比 $f_\nu\equiv\rho_\nu/\rho_{\rm r}=\rho_\nu/(\rho_\gamma+\rho_\nu)$，时间取在正负电子湮灭之后（见 §2.4.4）、但在中微子质量变得重要之前。`}</Tx>
        <Box kind="warning" title={R`勘误：$f_\nu$ 的定义应为 $\rho_\nu/\rho_{\rm r}$`}>{R`原书题面印作 $f_\nu\equiv\rho_\nu/\rho_\gamma$。正确为 $f_\nu\equiv\rho_\nu/\rho_{\rm r}\approx0.41$（文献中的 $R_\nu$）。依据：题面文字本身说的是"中微子与**辐射**的能量密度之比"；而习题 7.16 中 $f_\nu$ 出现的方式（\eqref{7.122} 由 $32\pi Ga^2\rho_{\rm r}=12/\eta^2$ 引入 $\rho_\nu/\rho_{\rm r}$）只与这一定义自洽。若按 $\rho_\nu/\rho_\gamma\approx0.68$ 代入 \eqref{7.123}，修正会被高估约 1.7 倍。`}</Box>
      </Exercise>

      {/* ---------------- 7.16 ---------------- */}
      <Exercise n="7.16" title={R`中微子四极矩对初始条件的修正：$\Phi=-\Psi(1+2f_\nu/5)$`} level="★★★"
        hint={R`多极矩定义 $\mathcal N_l=\frac{1}{(-i)^l}\int_{-1}^1\frac{d\mu}{2}\mathcal P_l(\mu)\mathcal N(\mu)$；用递推 $(2l+1)\mu\mathcal P_l=(l+1)\mathcal P_{l+1}+l\mathcal P_{l-1}$。(c) 中用辐射期 $8\pi G\rho_{\rm r}a^2/3=(a'/a)^2=1/\eta^2$。(e) 中 \eqref{7.85} 在 $\Phi'=0$ 时化为 $-\Psi=2\Theta_{{\rm r},0}$。`}
        solution={R`**(a) 多极矩方程组。**令 $E_\nu(\sym{ch07-pnu}{p})=\sym{ch07-pnu}{p}$，$\mathcal N$ 与 $\sym{ch07-pnu}{p}$ 无关（$\partial\mathcal N/\partial \sym{ch07-pnu}{p}=0$），\eqref{5.73} 化为
$$\mathcal N'+ik\mu\mathcal N=-\Phi'-ik\mu\Psi.$$
乘以 $\mathcal P_l(\mu)$ 并作 $\int_{-1}^1\frac{d\mu}{2}$。由正交性 $\int\frac{d\mu}{2}\mathcal P_l\mathcal P_{l'}=\frac{\delta_{ll'}}{2l+1}$ 与递推关系，$\int\frac{d\mu}{2}\mathcal P_l\,\mu\mathcal N=\frac{(-i)^{l+1}(l+1)\mathcal N_{l+1}+(-i)^{l-1}l\mathcal N_{l-1}}{2l+1}$。

$l=0$：$\mathcal N_0'+ik(-i)\mathcal N_1=-\Phi'$，即 $\mathcal N_0'+k\mathcal N_1=-\Phi'$。

$l=1$：$-i\mathcal N_1'+ik\left[\frac13\mathcal N_0-\frac23\mathcal N_2\right]=-\frac{ik}{3}\Psi$；乘以 $i$ 得 $\mathcal N_1'-\frac k3(\mathcal N_0-2\mathcal N_2)=\frac k3\Psi$。

$l=2$：$-\mathcal N_2'+ik\left[\frac35(-i)^3\mathcal N_3+\frac25(-i)\mathcal N_1\right]=0$，即 $\mathcal N_2'-\frac25k\mathcal N_1+\frac35k\mathcal N_3=0$。

一般地，$l\ge2$ 时 $\mathcal N_l'=\frac{k}{2l+1}[l\mathcal N_{l-1}-(l+1)\mathcal N_{l+1}]$。取 $l=3$：$\mathcal N_3'\simeq\frac{3k}{7}\mathcal N_2$。由于 $\mathcal N_2\propto\eta^2$（见下），积分得 $\mathcal N_3\simeq\frac{k\eta}{7}\mathcal N_2\ll\mathcal N_2$（$k\eta\ll1$）。所以第三个方程中可以丢掉 $\mathcal N_3$，得到 \eqref{7.120}。

**(b)** 对第三式求导并用第二式：
$$\mathcal N_2''=\frac25k\mathcal N_1'=\frac25k\cdot\frac k3\left(\Psi+\mathcal N_0-2\mathcal N_2\right)=\frac{2k^2}{15}(\Psi+\mathcal N_0-2\mathcal N_2),$$
即 \eqref{7.121}。

**(c)** 忽略光子四极矩，\eqref{6.48} 为 $k^2(\Phi+\Psi)=-32\pi Ga^2\rho_\nu\mathcal N_2$。辐射主导时 $\frac{8\pi G\rho_{\rm r}a^2}{3}=\left(\frac{a'}{a}\right)^2=\frac1{\eta^2}$，所以 $32\pi Ga^2=\frac{12}{\eta^2\rho_{\rm r}}$：
$$k^2(\Phi+\Psi)=-\frac{12}{\eta^2}\frac{\rho_\nu}{\rho_{\rm r}}\mathcal N_2\ \Rightarrow\ \mathcal N_2=-(k\eta)^2\frac{\Phi+\Psi}{12f_\nu},$$
其中 $f_\nu=\rho_\nu/\rho_{\rm r}$（\exref{7.15}）。

**(d)** 对常数模（$p=0$），$\Phi$、$\Psi$ 与 $f_\nu$ 都不随时间变化，所以
$$\mathcal N_2''=-\frac{2k^2(\Phi+\Psi)}{12f_\nu}=-\frac{k^2(\Phi+\Psi)}{6f_\nu}.$$
令它等于 (b) 的结果（右边丢掉 $\mathcal N_2$）：$\frac{2k^2}{15}(\Psi+\mathcal N_0)=-\frac{k^2(\Phi+\Psi)}{6f_\nu}$，得
$$\mathcal N_0=-\Psi-\frac{5(\Phi+\Psi)}{4f_\nu}.$$

**(e)** 取 $\Theta_0=\mathcal N_0$，则 $\Theta_{{\rm r},0}=\mathcal N_0$（\eqref{6.79}）。常数模 $\Phi'=0$ 时，\eqref{7.85} 化为 $-\Psi=2\Theta_{{\rm r},0}=2\mathcal N_0$：
$$-\Psi=-2\Psi-\frac{5(\Phi+\Psi)}{2f_\nu}\ \Rightarrow\ 2f_\nu\Psi=-5\Phi-5\Psi\ \Rightarrow\ \Phi=-\Psi\left(1+\frac{2f_\nu}{5}\right),$$
即 \eqref{7.123}。

**解读与自洽检验。**取 $f_\nu\approx0.41$，$\Phi\simeq-1.16\Psi$：两个势相差约 16%，这是自由流动的中微子在视界外就已产生的各向异性应力。代回可验证自洽：$\Phi+\Psi=-\frac{2f_\nu}{5}\Psi$，故 $\mathcal N_2=\frac{(k\eta)^2}{30}\Psi$；而 $\Psi+\mathcal N_0=\Psi/2$，由 (b) $\mathcal N_2''=\frac{k^2}{15}\Psi$，积分同样给出 $\frac{(k\eta)^2}{30}\Psi$。同时 $\Theta_0=\mathcal N_0=-\Psi/2$，比 \eqref{7.91} 的 $\Phi/2$ 小一个因子 $(1+2f_\nu/5)$。`}>
        <Tx>{R`在辐射主导时期设定初始条件时，计入中微子的四极矩（忽略中微子质量）。

(a) 从 \eqref{5.73} 出发，令 $E_\nu(\sym{ch07-pnu}{p})=\sym{ch07-pnu}{p}$。这样 $\sym{ch07-pnu}{p}$ 就从方程中消失，可以令 $\mathcal N=\mathcal N(k,\eta,\mu)$。把方程化为中微子多极矩 $\mathcal N_l(k,\eta)$ 的方程组，并截断到 $\mathcal N_2$：`}</Tx>
        <Eq n="7.120" say={R`无质量中微子的多极矩方程组：单极矩由 $\Phi'$ 驱动，偶极矩由单极矩与 $\Psi$ 的梯度驱动，四极矩则由偶极矩"自由流动"产生——没有碰撞来抹平它。`}>{R`\begin{aligned}\mathcal N_0'+k\mathcal N_1&=-\Phi'\\\mathcal N_1'-\frac k3(\mathcal N_0-2\mathcal N_2)&=\frac k3\Psi\\\mathcal N_2'-\frac25k\mathcal N_1&=0.\end{aligned}`}</Eq>
        <Tx>{R`为此需要回忆这些多极矩的定义，它与光子的定义 \eqref{5.66} 相同。把 \eqref{5.73} 化为这一方程组的一个好办法是：先乘以 $\mathcal P_0$ 再对 $\mu$ 积分，这给出上面的第一个方程；然后把 \eqref{5.73} 乘以 $\mathcal P_1$ 得到第二个，乘以 $\mathcal P_2$ 得到第三个。更多细节见 §9.3，那里对光子多极矩做了同样的推导。在第三个方程中可以忽略 $\mathcal N_3$，因为它比 $\mathcal N_2$ 小一个 $k\eta$ 量级的因子（请证明这一点！）。

(b) 从这些方程中消去 $\mathcal N_1$，证明`}</Tx>
        <Eq n="7.121" say={R`四极矩的"加速度"由 $\Psi+\mathcal N_0$ 驱动、正比于 $k^2$：视界外中微子四极矩以 $(k\eta)^2$ 的方式缓慢长出。`}>{R`\mathcal N_2''=\frac{2k^2}{15}(\Psi+\mathcal N_0-2\mathcal N_2).`}</Eq>
        <Tx>{R`右边的 $\mathcal N_2$ 可以丢掉，因为它比 $\Psi+\mathcal N_0$ 小得多。

(c) 把 Einstein 方程 \eqref{6.48} 改写为`}</Tx>
        <Eq n="7.122" say={R`两个引力势之和只由中微子四极矩（各向异性应力）决定；视界外它被 $(k\eta)^2$ 压低，但与四极矩本身同阶。`}>{R`\mathcal N_2=-(k\eta)^2\frac{\Phi+\Psi}{12f_\nu},`}</Eq>
        <Tx>{R`其中 $f_\nu$ 的定义见 \exref{7.15}。这里忽略了光子四极矩；这是合理的，因为 Compton 散射使 $\Theta_2\ll\mathcal N_2$。

(d) 现在对这一形式的 Einstein 方程求两次导数，得到 $\mathcal N_2''$ 的表达式，并令它等于 (b) 中得到的 $\mathcal N_2''$。（这样做时可以丢掉 $\Phi$ 与 $\Psi$ 的所有时间导数，因为我们关心的是 $p=0$ 的常数模。）用这个方程把 $\mathcal N_0$ 用 $\Phi$ 和 $\Psi$ 表示出来。

(e) 最后，假设 $\Theta_0=\mathcal N_0$，用你得到的 $\mathcal N_0$ 的表达式把 \eqref{7.85} 改写成两个引力势之间的关系。证明这一关系为`}</Tx>
        <Eq n="7.123" say={R`由于自由流动的中微子在视界外就带有四极矩，早期两个引力势并不严格大小相等：$\Phi$ 比 $-\Psi$ 大约 16%。`}>{R`\Phi=-\Psi\left(1+\frac{2f_\nu}{5}\right).`}</Eq>
      </Exercise>

      {/* ---------------- 7.17 ---------------- */}
      <Exercise n="7.17" title={R`速度与偶极矩的初始条件 \eqref{7.95}`} level="★★"
        hint={R`取 $k\eta\ll1$、辐射主导（$aH=1/\eta$）、$\Psi=-\Phi$ 为常数，$\Theta_0=\mathcal N_0=\Phi/2$。中微子用 \eqref{7.120} 第二式；光子–重子在紧耦合下 $u_{\rm b}=-3i\Theta_1$，且早期 $R\to0$；暗物质用 \eqref{5.70}。`}
        solution={R`取辐射主导早期：$a\propto\eta$，$a'/a=aH=1/\eta$；常数模 $\Psi=-\Phi$；由 \eqref{7.90}–\eqref{7.91}，$\Theta_0=\mathcal N_0=\Phi/2$。偶极矩与速度都是 $\mathcal O(k\eta)$ 的小量，四极矩是 $\mathcal O((k\eta)^2)$，可以忽略。

**中微子。**由 \eqref{7.120} 第二式（丢掉 $\mathcal N_2$）：
$$\mathcal N_1'=\frac k3(\mathcal N_0+\Psi)=\frac k3\left(\frac\Phi2-\Phi\right)=-\frac{k\Phi}{6}\ \Rightarrow\ \mathcal N_1=-\frac{k\eta}{6}\Phi=-\frac{k}{6aH}\Phi,$$
其中积分常数取零（$\eta\to0$ 时偶极矩不应发散，也不应有与势无关的额外速度）。

**光子与重子。**对 \eqref{5.67} 取 $\mathcal P_1$ 矩（与上面相同的步骤），并忽略 $\Theta_2$：
$$\Theta_1'-\frac k3\Theta_0=\frac k3\Psi+\tau'\left(\Theta_1-\frac{iu_{\rm b}}{3}\right).$$
重子方程 \eqref{5.72} 可写成 $\tau'(u_{\rm b}+3i\Theta_1)=R[u_{\rm b}'+\frac{a'}{a}u_{\rm b}+ik\Psi]$。由于 $|\tau'|\gg aH$（紧耦合），方括号中的组合 $u_{\rm b}+3i\Theta_1$ 被压到零：$u_{\rm b}=-3i\Theta_1$，即 $iu_{\rm b}/3=\Theta_1$。而光子方程中的碰撞项 $\tau'(\Theta_1-iu_{\rm b}/3)=-\frac{i}{3}\tau'(u_{\rm b}+3i\Theta_1)=-\frac{iR}{3}[\cdots]$ 正比于 $R\propto a$，早期可以忽略。于是光子偶极矩满足与中微子完全相同的方程，$\Theta_1=-\frac{k}{6aH}\Phi$。

**暗物质。**\eqref{5.70}：$u_{\rm c}'+\frac1\eta u_{\rm c}=-ik\Psi$，即 $(\eta u_{\rm c})'=-ik\Psi\eta$。积分得 $u_{\rm c}=-\frac{ik\eta}{2}\Psi=\frac{ik\eta}{2}\Phi$，所以
$$\frac{iu_{\rm c}}{3}=-\frac{k\eta}{6}\Phi=-\frac{k}{6aH}\Phi.$$
（若不计紧耦合，重子满足与暗物质相同的方程，也得到同样的 $u_{\rm b}$——两种做法一致。）

合起来就是 \eqref{7.95}：$\Theta_1=\mathcal N_1=\frac{iu_{\rm b}}3=\frac{iu_{\rm c}}3=-\frac{k}{6aH}\Phi$。

**用 Einstein 方程交叉检验。**时–空分量（\exref{6.6}）为 $\Phi'-aH\Psi=\frac{4\pi Ga^2}{ik}\left[\rho_{\rm c}u_{\rm c}+\rho_{\rm b}u_{\rm b}-4i\rho_\gamma\Theta_1-4i\rho_\nu\mathcal N_1\right]$。早期物质项可忽略，$\Phi'=0$：左边 $=aH\Phi$；右边 $=-\frac{16\pi Ga^2\rho_{\rm r}}{k}\Theta_{{\rm r},1}=-\frac{6(aH)^2}{k}\Theta_{{\rm r},1}$。于是 $\Theta_{{\rm r},1}=-\frac{k}{6aH}\Phi$，完全一致。（若计入 \exref{7.16} 中的中微子四极矩，一般结果为 $\Theta_1=\mathcal N_1=\frac{k\eta}{3}(\Theta_0+\Psi)$。）`}>
        {R`证明物质与辐射的速度和偶极矩的初始条件如 \eqref{7.95} 所示。`}
      </Exercise>

      {/* ---------------- 7.18 ---------------- */}
      <Exercise n="7.18" title={R`二次势暴胀 $V=\frac12m^2\phi^2$ 的预言`} level="★★★"
        hint={R`用 \exref{7.8} 的势慢滚公式（$G=m_{\rm Pl}^{-2}$）。e 倍数 $N=\int H\,dt\simeq8\pi G\int_{\phi_e}^{\phi}\frac{V}{V_{,\phi}}d\phi$。$\mathcal A_s=\frac{k_{\rm p}^3}{2\pi^2}P_{\mathcal R}(k_{\rm p})=\frac{H^2}{\pi m_{\rm Pl}^2\epsilon_{\rm sr}}$（由 \eqref{7.99}）。辐射期 $H=H_0\sqrt{\Omega_{\rm r}}\,a^{-2}$。`}
        solution={R`取 $G=m_{\rm Pl}^{-2}$，$m_{\rm Pl}=1.22\times10^{19}\,\mathrm{GeV}$。

**(a) 慢滚参数。**$V_{,\phi}/V=2/\phi$，$V_{,\phi\phi}/V=2/\phi^2$。由 \exref{7.8}：
$$\epsilon_{\rm sr}=\frac{m_{\rm Pl}^2}{16\pi}\frac{4}{\phi^2}=\frac{m_{\rm Pl}^2}{4\pi\phi^2},\qquad\delta_{\rm sr}=\epsilon_{\rm sr}-\frac{m_{\rm Pl}^2}{8\pi}\frac{2}{\phi^2}=0.$$
所以在最低阶，$n_s=1-4\epsilon_{\rm sr}$，$r=16\epsilon_{\rm sr}$，两者不独立：
$$r=4(1-n_s).$$
观测到的 $1-n_s\approx0.03$ 立即意味着 $r\approx0.13$——这是一个很大的张量振幅。

**(b) 暴胀结束。**令 $\epsilon_{\rm sr}=1$：$\phi_e=m_{\rm Pl}/\sqrt{4\pi}\approx0.28\,m_{\rm Pl}$。

**(c) $k_{\rm p}$ 穿出视界时的场值。**慢滚时 $dN=H\,dt=\frac{H}{\dot\phi}d\phi=-\frac{3H^2}{V_{,\phi}}d\phi=-8\pi G\frac{V}{V_{,\phi}}d\phi$，所以从 $\phi_{\rm p}$ 到 $\phi_e$ 的 e 倍数为
$$N=\frac{4\pi}{m_{\rm Pl}^2}\int_{\phi_e}^{\phi_{\rm p}}\frac{\phi}{2}\,d\phi=\frac{\pi}{m_{\rm Pl}^2}(\phi_{\rm p}^2-\phi_e^2)\ \Rightarrow\ \phi_{\rm p}^2=\frac{m_{\rm Pl}^2}{4\pi}(1+2N).$$
于是在 $-k_{\rm p}\eta=1$ 时
$$\epsilon_{\rm sr}=\frac{1}{1+2N},\qquad\delta_{\rm sr}=0,\qquad n_s=1-\frac{4}{1+2N},\qquad r=\frac{16}{1+2N}.$$
$N$ 本身由视界匹配决定。$H$ 在暴胀中不变时，$k_{\rm p}=a_{\rm p}H=a_eH_ee^{-N}$。暴胀后一直是辐射主导，$H=H_0\sqrt{\Omega_{\rm r}}\,a^{-2}$，所以 $a_e=(H_0\sqrt{\Omega_{\rm r}}/H_e)^{1/2}$，
$$a_eH_e=\left(H_0\sqrt{\Omega_{\rm r}}\,H_e\right)^{1/2},\qquad N=\ln\frac{\left(H_0\sqrt{\Omega_{\rm r}}\,H_e\right)^{1/2}}{k_{\rm p}}.$$
辐射期 $aH\propto a^{-1}$，所以该模式在 $a_{\rm re}=a_ee^{N}$ 时重新进入视界：穿出与进入关于暴胀结束对称。数值上（$k_{\rm p}=0.05\,\mathrm{Mpc^{-1}}=3.2\times10^{-40}\,\mathrm{GeV}$，$H_0=1.44\times10^{-42}\,\mathrm{GeV}$，$\sqrt{\Omega_{\rm r}}=9.5\times10^{-3}$）：
$$N\simeq56.5+\frac12\ln\frac{H_e}{9\times10^{13}\,\mathrm{GeV}}.$$

**(d) 与基准宇宙学匹配。**由 \eqref{7.99}，$\mathcal A_s=\frac{H^2}{\pi m_{\rm Pl}^2\epsilon_{\rm sr}}$。慢滚中 $H^2=\frac{8\pi V}{3m_{\rm Pl}^2}=\frac{4\pi m^2\phi_{\rm p}^2}{3m_{\rm Pl}^2}=\frac{m^2(1+2N)}{3}$，所以
$$\frac{m}{H_e}=\sqrt{\frac{3}{1+2N}},\qquad\mathcal A_s=\frac{m^2(1+2N)^2}{3\pi m_{\rm Pl}^2}\ \Rightarrow\ \frac{m}{m_{\rm Pl}}=\frac{\sqrt{3\pi\mathcal A_s}}{1+2N}.$$

用 $n_s=0.9682$（附录 B）：$1+2N=4/(1-n_s)=126$，$N\approx62$；$m/H_e\approx0.15$。

用 $\mathcal A_s=2.1\times10^{-9}$：$m\approx1.1\times10^{-6}\,m_{\rm Pl}\approx1.4\times10^{13}\,\mathrm{GeV}$，$H_e\approx7.3\times10^{-6}\,m_{\rm Pl}\approx9\times10^{13}\,\mathrm{GeV}$。

场值：$\phi_{\rm p}=m_{\rm Pl}\sqrt{(1+2N)/4\pi}\approx3.2\,m_{\rm Pl}$，而 $\phi_e\approx0.28\,m_{\rm Pl}$。

能标：$V^{1/4}=(\frac12m^2\phi_{\rm p}^2)^{1/4}\approx1.9\times10^{16}\,\mathrm{GeV}$，即 $V\approx6\times10^{-12}\,m_{\rm Pl}^4$。

**自洽检验。**把这个 $H_e$ 代入 (c) 的视界匹配，得到 $N\approx56.5$，而不是 62。若反过来把 $\mathcal A_s$ 与视界匹配联立求解，则 $N\approx56.5$，$n_s=1-4/(1+2N)\approx0.965$，$m\approx1.5\times10^{13}\,\mathrm{GeV}$，$\phi_{\rm p}\approx3.0\,m_{\rm Pl}$。这仍在基准值 $0.9682^{+0.0076}_{-0.0073}$ 的 95% 区间内，所以两种做法在当前精度下一致；e 倍数的约 6 的差别反映了再加热历史的不确定性。

**张量振幅。**$r=16\epsilon_{\rm sr}=16/(1+2N)\approx0.13$（取 $N\approx56$ 则为 $0.14$），$\mathcal A_{\rm T}=r\mathcal A_s\approx2.7\times10^{-10}$；张量谱指数 $n_{\rm T}=-2\epsilon_{\rm sr}\approx-0.016$。与 \figref{10.11} 比较：B 模功率 $\propto r$，预言的信号比图中 $r=0.05$ 的曲线还高约 2.5 倍，远超当前观测上限（$r\lesssim0.04$–$0.06$）。所以最简单的二次势暴胀已被 CMB 偏振数据排除。

**大场模型的特征。**场的变化 $\Delta\phi\approx3\,m_{\rm Pl}$ 超过 Planck 质量，但能标 $V^{1/4}\sim2\times10^{16}\,\mathrm{GeV}$ 远低于 $m_{\rm Pl}$，即 $V\ll m_{\rm Pl}^4$，所以经典场论描述仍可信。`}>
        <Tx>{R`确定一个二次势暴胀模型的预言：`}</Tx>
        <Eq n="7.124" say={R`最简单的"大场"暴胀模型：一个自由的有质量标量场，势能随场值平方增长。`}>{R`V(\phi)=\frac12m^2\phi^2.`}</Eq>
        <Tx>{R`(a) 把慢滚参数 $\epsilon_{\rm sr}$ 与 $\delta_{\rm sr}$ 表示为 $\phi$ 的函数。关于张标比 $r$ 与谱指数 $n_s$，你已经能说些什么？

(b) 令暴胀结束时 $\epsilon_{\rm sr}=1$，求暴胀结束时的场值 $\phi_e$。

(c) 为了确定扰动谱，需要在 $-k\eta=1$ 时计算 $\epsilon_{\rm sr}$ 与 $\delta_{\rm sr}$，因而需要知道那时的 $\phi$。取波数 $k=k_{\rm p}$，把 $k_{\rm p}$ 穿出（以及后来重新进入）视界时的 $aH$ 与暴胀结束时的值 $a_eH_e$ 联系起来，以此定出 $\phi$。为此，假设从穿出视界到暴胀结束共有 $N$ 个 e 倍。还可以进一步假设暴胀期间 $H$ 保持不变，且暴胀之后宇宙一直是辐射主导的。

(d) 把这个模型预言的 $n_s$ 和 $\mathcal A_s$ 与我们的基准宇宙学数值相匹配，由此定出 $m/H_e$ 与 $N$。最后，以 Planck 质量为单位，计算 $m$ 以及 $k_{\rm p}$ 穿出视界时的 $\phi$。这种情形下预言的张量模振幅是多少？与 \figref{10.11} 比较。

这个模型体现了*大场*（large-field）暴胀模型的特征：场值达到甚至超过 $m_{\rm Pl}$，但能标 $V$ 远小于 $m_{\rm Pl}^4$。`}</Tx>
      </Exercise>
    </Sec>
  );
}
