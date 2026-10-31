// §7.6 Summary —— 式 (7.97)–(7.110)，原书 pp. 186–189
import { Sec, Tx, Eq, Box, Derivation, Table, C } from "@kit";
import { PrimordialSpectrumPlot } from "./_ch07_plots.jsx";

const R = String.raw;

export function Sec76() {
  return (
    <Sec n="7.6" title="Summary" zh="小结：原初功率谱的参数化"
      gist={R`暴胀给出均值为零、各模式互不相关、近高斯的原初扰动；标量谱写成 $P_{\mathcal R}=2\pi^2\mathcal A_sk^{-3}(k/k_{\rm p})^{n_s-1}$，张量谱写成 $P_{\rm T}=2\pi^2\mathcal A_{\rm T}k^{-3}(k/k_{\rm p})^{n_{\rm T}}$；慢滚预言 $r=16\epsilon_{\rm sr}$、$n_{\rm T}=-2\epsilon_{\rm sr}$、$n_s=1-4\epsilon_{\rm sr}-2\delta_{\rm sr}$。`}
      why={R`后面各章（CMB、大尺度结构）只需要原初谱的几个参数。本节把暴胀的结果翻译成观测者使用的语言，并指出可检验的预言：红倾斜与一致性关系。`}
      gives={["7.97", "7.98", "7.99", "7.100", "7.102", "7.103", "7.104", "7.108", "7.110"]}>
      <p className="muted">本节概念：<C id="curv_R" /> · <C id="tilt" /> · <C id="tilt" /></p>

      <Tx>{R`**回顾全章的逻辑。**为了解释今天本应毫无关联的天区为何温度几乎相同，我们几乎被**迫**接受暴胀理论。除了消除协和宇宙学中其他恼人的微调问题——例如平直性问题（\exref{7.1}）——暴胀还顺带提供了一个机制，在光滑宇宙之上**产生原初扰动**。

暴胀的图景是：极早期的量子力学涨落产生时，相关尺度还处在因果联系之中；随后暴胀把这些尺度"甩"到视界之外；很久以后它们重新进入视界，成为宇宙结构增长的初始条件。

**统计性质。**扰动最好用 Fourier 模式描述。以引力势为例，任何一个 Fourier 模式的均值都为零：`}</Tx>

      <Eq n="7.97" say={R`原初扰动没有优选的符号：每个 Fourier 模式的系综平均为零，过密与欠密同样可能。`}>{R`\langle\Phi(\boldsymbol k)\rangle = 0.`}</Eq>

      <Tx>{R`而且不同的 Fourier 模式彼此不相关。但每个模式都有非零的方差：`}</Tx>

      <Eq n="7.98" say={R`功率谱的定义：不同波矢的模式互不相关（Dirac $\delta$ 函数），同一模式的方差由 $P_\Phi(k)$ 给出，且只依赖 $k=|\boldsymbol k|$（统计均匀且各向同性）。`}>{R`\langle\Phi(\boldsymbol k)\Phi^*(\boldsymbol k')\rangle = P_\Phi(k)(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k-\boldsymbol k'),`}</Eq>

      <Tx>{R`Dirac $\delta$ 函数保证了不同模式相互独立。**近似高斯性**等价于说：任何更高阶的关联函数（例如含三个 $\Phi$ 的三点函数）都被强烈压低——于是均值与功率谱就是全部统计信息。

**标量与张量。**对我们最重要的标量扰动，功率谱由 \eqref{7.62} 给出。度规的张量部分同样被激发，也是均值为零的高斯场，其功率谱由 \eqref{7.42} 给出。标量谱依赖慢滚参数 $\epsilon_{\rm sr}$（\eqref{7.17}），它正比于哈勃率的导数。由于暴胀期间势能主导、哈勃率几乎不变，$\epsilon_{\rm sr}$ 通常很小——这正是标量扰动远大于张量扰动的原因（$P_\Phi/P_h\sim1/\epsilon_{\rm sr}$）。

**尺度不变与红倾斜。**若 $k^3P_\Phi(k)$ 为常数（不依赖 $k$），这样的谱称为**尺度不变**（scale-invariant）或**无标度**（scale-free）谱：每个对数波数间隔贡献相同的方差。除了慢滚参数编码的微小偏离之外，标量与张量扰动都是无标度的。此外，暴胀期间场沿势能"坡"往下滚，哈勃率缓慢**减小**，所以另一个普遍预言是：原初谱有轻微的**红倾斜**（red tilt）——更大尺度的扰动（更早离开视界、当时 $H$ 更大）振幅略大于小尺度扰动。（原书此处写作"势"是红倾斜的，指的当然是功率谱。）CMB 已经确凿地探测到了这种小的红倾斜。`}</Tx>

      <Tx>{R`**用 $\mathcal R$ 参数化标量谱。**如今暴胀产生的标量扰动最常用规范不变的曲率扰动 $\mathcal R$ 的功率谱来参数化。它的巨大优点是：无论物质还是辐射主导，它在超视界尺度上都**守恒**，因此是一个明确无歧义的"锚点"。由 \eqref{7.78}，`}</Tx>

      <Eq n="7.99" keyEq title="标量原初功率谱" say={R`曲率扰动的功率谱：物理上由视界穿出时的 $H^2/\epsilon_{\rm sr}$ 决定，观测上用枢轴尺度处的振幅 $\mathcal A_s$ 和谱指数 $n_s$ 两个数参数化。`}>{R`P_{\mathcal R}(k) = \frac{2\pi}{k^3}\frac{H^2}{m_{\rm Pl}^2\epsilon_{\rm sr}}\bigg|_{aH=k} \equiv 2\pi^2\mathcal A_sk^{-3}\left(\frac{k}{k_{\rm p}}\right)^{n_s-1},`}</Eq>

      <Tx>{R`其中 $\mathcal A_s$ 是以**枢轴尺度**（pivot scale）$k_{\rm p}$ 为中心、单位对数波数间隔内曲率扰动的方差，$n_s$ 是**标量谱指数**（scalar spectral index）。枢轴尺度纯属约定，通常取给定观测组合（比如 CMB 各向异性）约束得最好的尺度；Planck 团队取 $k_{\rm p}=0.05\,\mathrm{Mpc}^{-1}$，本书也这样取。在本书的基准宇宙学（fiducial cosmology）中`}</Tx>

      <Eq n="7.100" say={R`标量振幅：在枢轴尺度上，曲率扰动每个对数波数间隔内的方差约为 $2.1\times10^{-9}$。`}>{R`\mathcal A_s = \frac{k_{\rm p}^3}{2\pi^2}P_{\mathcal R}(k_{\rm p}) \simeq 2.1\times10^{-9}.`}</Eq>

      <Tx>{R`因此在 $k_{\rm p}$ 尺度上曲率扰动的典型幅度为 $\sqrt{\mathcal A_s}\simeq4.6\times10^{-5}$，与 CMB 温度涨落（$\sim10^{-5}$）同一量级、只是略大一些。第 9 章会看到这并非巧合：在最大的尺度上，观测到的温度涨落 $\Theta_0+\Psi$ 就是复合时引力势的一个固定分数（Sachs–Wolfe 效应），而引力势本身又是 $\mathcal R$ 的一个 $\mathcal O(1)$ 分数（辐射期见 \eqref{7.96}），于是 $\delta T/T$ 与 $\mathcal R$ 只差一个比 1 略小的数值因子。`}</Tx>

      <Box kind="note" title="数字直觉">{R`$\bullet$ $\sqrt{2.1\times10^{-9}}\approx4.58\times10^{-5}$。

$\bullet$ $\mathcal A_s=\Delta^2_{\mathcal R}(k_{\rm p})$，其中 $\Delta^2_{\mathcal R}\equiv\frac{k^3}{2\pi^2}P_{\mathcal R}$ 是无量纲功率谱（与 \eqref{7.36} 的 $\Delta^2_h$ 同一定义）；于是 \eqref{7.99} 即 $\Delta^2_{\mathcal R}(k)=\mathcal A_s(k/k_{\rm p})^{n_s-1}$。

$\bullet$ $k_{\rm p}=0.05\,\mathrm{Mpc}^{-1}$ 对应波长 $2\pi/k_{\rm p}\approx126\,\mathrm{Mpc}$；投影到距离约 $14\,\mathrm{Gpc}$ 的最后散射面上，对应多极矩 $\ell\sim k_{\rm p}\chi_*\approx700$，正处在 Planck 测得最准的声学峰区域。

$\bullet$ 取 $n_s=0.965$，从 $k=10^{-4}\,\mathrm{Mpc}^{-1}$ 到 $1\,\mathrm{Mpc}^{-1}$（四个数量级），$\Delta^2_{\mathcal R}$ 只变化 $(10^4)^{-0.035}\approx0.72$——"几乎"尺度不变。`}</Box>

      <Tx>{R`**张量谱。**对张量模，我们在 \eqref{7.42} 中推出了**单一偏振**的功率谱 $P_h$。习惯上用（视界外的）**总**张量功率谱 $P_{\rm T}(k)$ 来参数化原初张量模，定义为`}</Tx>

      <Eq n="7.101" say={R`总张量功率谱的定义：对横向无迹度规扰动的所有分量求和后的方差，在暴胀结束（$\eta=0$、所有感兴趣的模都在视界外）时取值。`}>{R`\left\langle h^{\rm TT}_{ij}(\boldsymbol k)\left(h^{\rm TT}_{ij}\right)^*(\boldsymbol k')\right\rangle\Big|_{\eta=0} \equiv (2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k-\boldsymbol k')P_{\rm T}(k).`}</Eq>

      <Tx>{R`利用 \eqref{6.49} 完成指标求和：若 $\boldsymbol k$ 沿 $z$ 轴，$h^{\rm TT}_{11}=-h^{\rm TT}_{22}=h_+$，$h^{\rm TT}_{12}=h^{\rm TT}_{21}=h_\times$，其余为零，所以 $\sum_{ij}|h^{\rm TT}_{ij}|^2=2|h_+|^2+2|h_\times|^2$。左边等于 $2\langle h_+h_+^*\rangle+2\langle h_\times h_\times^*\rangle$，两种偏振各贡献一个 $P_h$，于是`}</Tx>

      <Eq n="7.102" title="张量原初功率谱" say={R`总张量谱是单偏振谱的 4 倍，只依赖暴胀时的哈勃率 $H$——测到它就直接测到了暴胀的能标。`}>{R`P_{\rm T}(k) = 4P_h(k) = \frac{32\pi}{k^3}\frac{H^2}{m_{\rm Pl}^2}\bigg|_{aH=k} \equiv 2\pi^2\mathcal A_{\rm T}k^{-3}\left(\frac{k}{k_{\rm p}}\right)^{n_{\rm T}},`}</Eq>

      <Tx>{R`它定义了约定俗成的**张量振幅** $\mathcal A_{\rm T}$ 和**张量谱指数** $n_{\rm T}$（第二个等号中用了 $8\pi G=8\pi/m_{\rm Pl}^2$，即 $P_h=8\pi GH^2/k^3$）。`}</Tx>

      <Box kind="warning" title={R`$n_s-1$ 与 $n_{\rm T}$：不对称的约定`}>{R`注意这个（已成为通用的）约定：标量谱尺度不变对应 $n_s=1$，而张量谱尺度不变对应 $n_{\rm T}=0$。原因是历史上的：$n_s$ 最初是对密度扰动谱 $P_\delta\propto k^{n_s}$ 定义的，"Harrison–Zel'dovich 谱"$n_s=1$ 对应 $k^3P_{\mathcal R}=$ 常数。读文献时要小心：$n_s=0.965$ 意味着倾斜量 $n_s-1=-0.035$。`}</Box>

      <Tx>{R`实践中常用**张标比**（tensor-to-scalar ratio）$r$ 代替 $\mathcal A_{\rm T}$：`}</Tx>

      <Eq n="7.103" say={R`张标比：同一尺度上张量谱与标量谱之比；在枢轴尺度上它就是两个振幅之比。`}>{R`r(k) \equiv \frac{P_{\rm T}(k)}{P_{\mathcal R}(k)} \overset{k=k_{\rm p}}{=} \frac{\mathcal A_{\rm T}}{\mathcal A_s}.`}</Eq>

      <Tx>{R`把 \eqref{7.99} 与 \eqref{7.102} 相除，$H^2$、$m_{\rm Pl}^2$、$k^3$ 全部消去（$32\pi/2\pi=16$），立刻得到`}</Tx>

      <Eq n="7.104" keyEq title="张标比与慢滚参数" say={R`张标比直接测量第一慢滚参数：$r=16\epsilon_{\rm sr}$。$\epsilon_{\rm sr}$ 越小（哈勃率越接近常数），引力波相对越弱。`}>{R`r(k) = 16\,\epsilon_{\rm sr}\Big|_{aH=k}.`}</Eq>

      <Tx>{R`原则上由于标量与张量的谱指数不同，$r$ 依赖 $k$；但在实际应用中这种依赖小到可以忽略（$d\ln r/d\ln k=n_{\rm T}-n_s+1=2\epsilon_{\rm sr}+2\delta_{\rm sr}$ 是慢滚参数量级的小量，而 $r$ 本身目前只有上限）。

**谱指数与慢滚参数。**下面把原初谱指数 $n_s$、$n_{\rm T}$ 与慢滚参数 $\epsilon_{\rm sr}$、$\delta_{\rm sr}$ 联系起来。先看张量谱。由 \eqref{7.102} 的定义（原书此处写作"\eqref{7.99} 的定义"，应为 \eqref{7.102}），`}</Tx>

      <Eq n="7.105" say={R`张量谱的对数斜率：减去平凡的 $k^{-3}$ 部分后剩下的就是 $n_{\rm T}$。`}>{R`\frac{d\ln P_{\rm T}(k)}{d\ln k} = n_{\rm T}-3.`}</Eq>

      <Tx>{R`对数导数有两项：平凡的 $d\ln(k^{-3})/d\ln k=-3$ 正好与右边的 $-3$ 相消，剩下 $n_{\rm T}=2\,d\ln H/d\ln k$（$H$ 取在视界穿出时）。**视界穿出时**哈勃率的对数导数有点微妙：随着 $k$ 变化，变的不只是 $k$，还有"在哪个时刻取值"。用链式法则，`}</Tx>

      <Eq n="7.106" say={R`链式法则：$H$ 随 $k$ 的变化等于 $H$ 随时间的变化乘以视界穿出时刻随 $k$ 的变化。`}>{R`\frac{d\ln H}{d\ln k}\bigg|_{aH=k} = \frac{k}{H}\frac{dH}{d\eta}\times\frac{d\eta}{dk}\bigg|_{aH=k}.`}</Eq>

      <Tx>{R`按定义（\eqref{7.17}）$H'=-aH^2\epsilon_{\rm sr}$；而暴胀中 $\eta\simeq-1/(aH)$，视界穿出时刻满足 $\eta|_{aH=k}=-1/k$，故 $d\eta|_{aH=k}/dk=-d(aH)^{-1}|_{aH=k}/dk=1/k^2$——$k$ 越大，穿出越晚（$\eta$ 越接近 0）。于是`}</Tx>

      <Eq n="7.107" say={R`视界穿出时哈勃率的对数斜率恰为 $-\epsilon_{\rm sr}$：小尺度模式穿出得晚，那时 $H$ 已略为减小。`}>{R`\frac{d\ln H}{d\ln k}\bigg|_{aH=k} = -\frac{k}{H}\frac{aH^2\epsilon_{\rm sr}}{k^2}\bigg|_{aH=k} = -\epsilon_{\rm sr}.`}</Eq>

      <Tx>{R`最后一步用了 $aH=k$。因此暴胀产生的张量扰动的原初谱指数为`}</Tx>

      <Eq n="7.108" title="张量谱指数" say={R`张量谱指数为负（红倾斜）且由同一个 $\epsilon_{\rm sr}$ 决定：$n_{\rm T}=-2\epsilon_{\rm sr}$。`}>{R`n_{\rm T} = -2\epsilon_{\rm sr}.`}</Eq>

      <Tx>{R`**标量谱指数**的推导类似。对 $P_\Phi$（或 $P_{\mathcal R}$，二者只差常数因子 $4/9$）取对数导数，扣掉平凡的 $k^{-3}$：`}</Tx>

      <Eq n="7.109" say={R`标量谱的倾斜来自两处：视界穿出时 $H^2$ 的变化，以及慢滚参数 $\epsilon_{\rm sr}$ 本身的变化。`}>{R`n_s-1 = \frac{d}{d\ln k}\left[\ln(H^2)-\ln(\epsilon_{\rm sr})\right].`}</Eq>

      <Tx>{R`其中 $H$ 的导数同样给出 $-2\epsilon_{\rm sr}$；而 $\epsilon_{\rm sr}$ 的对数导数为 $d\ln\epsilon_{\rm sr}/d\ln k=+2(\epsilon_{\rm sr}+\delta_{\rm sr})$（\exref{7.7}，\eqref{7.116}），所以 $-\ln\epsilon_{\rm sr}$ 一项贡献 $-2(\epsilon_{\rm sr}+\delta_{\rm sr})$。（原书正文此处把"$\epsilon_{\rm sr}$ 的对数导数"写成了 $-2(\epsilon_{\rm sr}+\delta_{\rm sr})$，符号应以 \exref{7.7} 为准；最终结果不受影响。）于是`}</Tx>

      <Eq n="7.110" keyEq title="标量谱指数" say={R`标量谱指数由两个慢滚参数共同决定；只要 $\epsilon_{\rm sr}$、$\delta_{\rm sr}$ 为正的小量，$n_s$ 就略小于 1——红倾斜是慢滚暴胀的普遍预言。`}>{R`n_s = 1-4\epsilon_{\rm sr}-2\delta_{\rm sr}.`}</Eq>

      <Derivation collapsed title={R`补充：$d\ln\epsilon_{\rm sr}/d\ln k=2(\epsilon_{\rm sr}+\delta_{\rm sr})$ 的来历`} steps={[
        { tex: R`\epsilon_{\rm sr}=-\frac{\dot H}{H^2},\qquad \dot H=-4\pi G\dot{\bar\phi}^2`, why: R`\eqref{7.17} 的宇宙时形式；第二式来自两个 Friedmann 方程（\exref{7.7} 的 (b) 问即其共形时间版本）。` },
        { tex: R`\frac{\dot\epsilon_{\rm sr}}{\epsilon_{\rm sr}}=\frac{\ddot H}{\dot H}-2\frac{\dot H}{H}=2\frac{\ddot{\bar\phi}}{\dot{\bar\phi}}+2H\epsilon_{\rm sr}=2H(\delta_{\rm sr}+\epsilon_{\rm sr})`, why: R`对 $\ln\epsilon_{\rm sr}=\ln(-\dot H)-2\ln H$ 求导；$\ddot H/\dot H=2\ddot{\bar\phi}/\dot{\bar\phi}$，再用 \eqref{7.18} 的 $\delta_{\rm sr}=\ddot{\bar\phi}/(H\dot{\bar\phi})$。` },
        { tex: R`d\ln k\big|_{k=aH}=d\ln a+d\ln H=(1-\epsilon_{\rm sr})H\,dt\simeq H\,dt`, why: R`视界穿出条件 $k=aH$；$d\ln H=-\epsilon_{\rm sr}H\,dt$ 是高阶修正。` },
        { tex: R`\frac{d\ln\epsilon_{\rm sr}}{d\ln k}\bigg|_{aH=k}\simeq\frac{1}{H}\frac{\dot\epsilon_{\rm sr}}{\epsilon_{\rm sr}}=2(\epsilon_{\rm sr}+\delta_{\rm sr})`, why: R`于是 $n_s-1=-2\epsilon_{\rm sr}-2(\epsilon_{\rm sr}+\delta_{\rm sr})=-4\epsilon_{\rm sr}-2\delta_{\rm sr}$。` },
        { tex: R`\frac{d\ln H}{d\ln k}\simeq\frac{1}{H}\frac{\dot H}{H}=-\epsilon_{\rm sr}`, why: R`同样的办法也直接重现 \eqref{7.107}，与用共形时间的链式法则结果一致。` },
      ]} />

      <Box kind="physics" title="交互：原初功率谱与慢滚参数">
        <Tx>{R`下图画出无量纲功率谱 $\Delta^2_{\mathcal R}=\mathcal A_s(k/k_{\rm p})^{n_s-1}$ 与 $\Delta^2_{\rm T}=r\mathcal A_s(k/k_{\rm p})^{n_{\rm T}}$。拖动 $\epsilon_{\rm sr}$ 与 $\delta_{\rm sr}$ 的滑块，图中同时显示由 \eqref{7.104}、\eqref{7.108}、\eqref{7.110} 算出的 $n_s$、$r$、$n_{\rm T}$。试试看：$\epsilon_{\rm sr}$ 同时控制张量的**高度**（$r$）与**倾斜**（$n_{\rm T}$），而 $\delta_{\rm sr}$ 只影响标量谱的倾斜。`}</Tx>
        <PrimordialSpectrumPlot />
      </Box>

      <Tx>{R`**一个稳健的预言。**张量谱指数 $n_{\rm T}$ 正比于 $\epsilon_{\rm sr}$，这导出了暴胀最稳健的预言之一（\exref{7.14}）。人们提出过许多暴胀模型，给出各不相同的 $\epsilon_{\rm sr}$ 与 $\delta_{\rm sr}$；但几乎所有模型都保留这样一个特征：张标比（前面看到正比于 $\epsilon_{\rm sr}$）与张量谱指数（这里也正比于 $\epsilon_{\rm sr}$）直接相关——在单场慢滚暴胀中就是**一致性关系**（consistency relation）$r=-8n_{\rm T}$。在本书后面从结构演化走向观测探针的过程中，请始终记住这个关键问题：这个预言能否接受观测检验？（难点在于：$r$ 本身已很小，$n_{\rm T}=-r/8$ 更是小到极难测量。）`}</Tx>

      <Tx>{R`**回到势。**慢滚参数是概括一个暴胀模型预言的便捷方式；但我们真正关心的是物理——这些参数如何联系到最基本的对象：驱动暴胀的标量场的势 $V$。\exref{7.8} 会证明，慢滚参数可以用势及其导数表示（最低阶 $\epsilon_{\rm sr}=\frac{1}{16\pi G}(V_{,\phi}/V)^2$，$\delta_{\rm sr}=\epsilon_{\rm sr}-\frac{1}{8\pi G}V_{,\phi\phi}/V$）。因此从数据中提取 $\epsilon_{\rm sr}$ 与 $\delta_{\rm sr}$，就相当于在探测暴胀场的势。考虑到势的能标可能高达 $10^{15}\,\mathrm{GeV}$ 量级（\exref{7.18}），这是一个相当惊人的探针！`}</Tx>

      <Table head={[R`观测量`, R`慢滚预言`, R`来源`, R`主要依赖`]} rows={[
        [R`$\mathcal A_s$`, R`$\frac{1}{\pi}\frac{H^2}{m_{\rm Pl}^2\epsilon_{\rm sr}}$`, R`\eqref{7.99}、\eqref{7.100}`, R`$H$ 与 $\epsilon_{\rm sr}$`],
        [R`$n_s-1$`, R`$-4\epsilon_{\rm sr}-2\delta_{\rm sr}$`, R`\eqref{7.110}`, R`$\epsilon_{\rm sr}$、$\delta_{\rm sr}$`],
        [R`$\mathcal A_{\rm T}$`, R`$\frac{16}{\pi}\frac{H^2}{m_{\rm Pl}^2}$`, R`\eqref{7.102}`, R`只有 $H$`],
        [R`$r$`, R`$16\epsilon_{\rm sr}$`, R`\eqref{7.104}`, R`$\epsilon_{\rm sr}$`],
        [R`$n_{\rm T}$`, R`$-2\epsilon_{\rm sr}=-r/8$`, R`\eqref{7.108}`, R`$\epsilon_{\rm sr}$（一致性关系）`],
      ]} caption={R`原初谱参数与慢滚参数的对照（各量在 $aH=k_{\rm p}$ 时取值）。`} />

      <Box kind="data" title="书外补充：当前观测值（非原书内容）">{R`以下数字来自原书之后的观测文献，仅供对照：

$\bullet$ **标量振幅：**Planck 2018 给出 $\ln(10^{10}\mathcal A_s)=3.044\pm0.014$，即 $\mathcal A_s\approx2.10\times10^{-9}$，与 \eqref{7.100} 一致。

$\bullet$ **标量谱指数：**Planck 2018 给出 $n_s=0.9649\pm0.0042$，以超过 $8\sigma$ 排除 $n_s=1$——这就是正文说的"确凿探测到的红倾斜"。2025 年 ACT DR6 与 Planck、DESI BAO 联合分析给出略高的 $n_s\approx0.974\pm0.003$。

$\bullet$ **张标比：**BICEP/Keck 2018 数据结合 Planck 给出 $r_{0.05}<0.036$（95% 置信），之后的联合分析在 $r\lesssim0.03$–$0.04$ 之间；尚未探测到原初引力波。

$\bullet$ **推论：**由 \eqref{7.104}，$\epsilon_{\rm sr}<0.036/16\approx0.0023$；再由 \eqref{7.110}，$2\delta_{\rm sr}\approx0.035-4\epsilon_{\rm sr}$，即 $\delta_{\rm sr}\approx0.013$–$0.018$。$|n_{\rm T}|=r/8<0.005$。由 $\mathcal A_{\rm T}=r\mathcal A_s=\frac{16}{\pi}\frac{H^2}{m_{\rm Pl}^2}$ 可得 $H_{\rm inf}\lesssim5\times10^{13}\,\mathrm{GeV}$，对应势能标 $V^{1/4}\lesssim1.4\times10^{16}\,\mathrm{GeV}$。

$\bullet$ 例如二次势 $V=m^2\phi^2/2$（\exref{7.18}）预言 $r\approx0.13$–$0.16$，已被这些上限排除。`}</Box>

      <Tx>{R`**延伸阅读。**暴胀是一个难以一次完全掌握的主题，从不同角度反复体会会很有帮助。本书后面所需的一切都已包含在本节的方程中；这里推荐几份进一步的读物：Guth（1981）的原始论文完全可以读懂，它对促成暴胀的那些问题以及最初的解决尝试（"旧暴胀"）做了尽可能清晰的陈述；该领域开拓者之一 Mukhanov 的教科书 *Physical Foundations of Cosmology*（2005）对暴胀物理与扰动产生给出了清晰的现代综述；对膨胀宇宙中量子涨落产生的基础感兴趣的读者，推荐 Birrell & Davies（1984）。`}</Tx>
    </Sec>);
}
