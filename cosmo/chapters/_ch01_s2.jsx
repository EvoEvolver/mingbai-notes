// §1.2 The Hubble diagram、§1.3 Big Bang nucleosynthesis、§1.4 The cosmic microwave background —— 式 (1.8)–(1.9)，图 1.5–1.7
import { Sec, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { HubblePlot, BlackbodyPlot } from "./_ch01_plots.jsx";

const R = String.raw;

export function Sec12() {
  return (
    <Sec n="1.2" title="The Hubble diagram" zh="哈勃图"
      gist={R`物理距离 $d=ax$；对没有本动速度的星系求时间导数，得到哈勃–勒梅特定律 $v=H_0d$（$v\ll c$）：退行速度正比于距离，斜率即哈勃常数。`}
      why={R`这是膨胀最直接的观测检验，也是测量 $H_0$ 的方法；它在高红移处的推广（第 2 章）最终揭示了暗能量。`}
      gives={["1.8"]}>
      <p className="muted">本节概念：<C id="hubble_law" /> · <C id="scale_factor" /></p>
      <Tx>{R`**预言。**如果宇宙像图 1.1 那样膨胀，星系就应当彼此远离，我们应该看到星系在退离我们。Hubble（1929）首先发现遥远星系确实都在（表观地）退离我们——即都发生了红移；他还注意到一个趋势：速度随距离增加。这正是膨胀宇宙中所预期的，因为两个星系之间的物理距离是 $\sym{ch01-dist}{d}=ax$，其中 $x$ 是共动距离。（严格说这只对小 $z$、即退行速度远小于光速 $c$ 时成立；膨胀宇宙中正确定义距离的微妙之处在 \secref{2.2} 讨论。）

**推导。**若星系没有任何共动运动，即 $\dot x\equiv dx/dt=0$（没有**本动**速度，peculiar velocity），则相对速度为`}</Tx>
      <Eq n="1.8" keyEq title="哈勃–勒梅特定律" say={R`在膨胀宇宙中，静止于网格上的星系的退行速度正比于它的距离，比例系数就是今天的膨胀率 $H_0$——越远的星系退得越快。`}>{R`v = \frac{d}{dt}(ax) = \dot a x = H_0\,\sym{ch01-dist}{d} \qquad (v \ll c),`}</Eq>
      <Tx>{R`字母上的点表示对时间 $t$ 求导。第二个等号用了 $\dot x=0$；第三个等号写成 $\dot ax=(\dot a/a)(ax)=H\sym{ch01-dist}{d}$，并在今天取值。所以表观速度应随距离**线性**增加（至少在低红移处），斜率就是哈勃常数 $H_0$。\eqref{1.8} 称为**哈勃–勒梅特定律**（Hubble–Lemaître law）；常数的值只需测量**哈勃图**（Hubble diagram，图 1.5）中直线的斜率。`}</Tx>
      <Figure n="1.5" caption={R`哈勃图的现代版本，来自哈勃空间望远镜 Key Project（Freedman et al., 2001）。每个点是一个星系，其距离用称为造父变星的脉动恒星估计；每个星系的退行速度再用银河系邻域的本动速度场模型修正。直线是不同 $H_0$（单位 $\mathrm{km\,s^{-1}\,Mpc^{-1}}$）下哈勃–勒梅特定律的预言，如图所标（67、75、83）。交互版：拖动 $H_0$ 改变直线斜率，并读出对应的哈勃时间与哈勃距离。`} interactive={<HubblePlot />} />
      <Box kind="warning" title="为什么近处的点那么散？">{R`\eqref{1.8} 假设 $\dot x=0$。真实星系还有几百 $\mathrm{km\,s^{-1}}$ 量级的本动速度（被周围物质的引力拉动）。在 $\sym{ch01-dist}{d}=3\,\mathrm{Mpc}$ 处，哈勃流只有约 $200\,\mathrm{km\,s^{-1}}$，与本动速度相当，所以图 1.5 左下角的点误差很大、散布明显；距离越大，哈勃流越占优。这就是测 $H_0$ 要用尽量远的距离指示器、并做"流修正"（flow-corrected）的原因。`}</Box>
      <Tx>{R`**展望。**下一章会把距离–红移关系推广到更大的距离，那里 \eqref{1.8} 不再成立。那个更严格的推导不再基于退行速度，而是基于 \eqref{1.1} 所表达的光波长的拉伸。这里只先指出一点：**距离–红移关系依赖于宇宙的能量成分**。来自多种途径的数据指向当前的最佳拟合图景：宇宙是欧氏的，约 70% 的能量以宇宙学常数或其他形式的暗能量存在。这构成了**协调宇宙学**（concordance cosmology），也是全书的工作模型。`}</Tx>
      <Box kind="example" title={R`低红移时 $v\approx cz$`}>{R`对近邻星系，由 \eqref{1.1}：光在距离 $\sym{ch01-dist}{d}$ 上走了 $\Delta t\approx \sym{ch01-dist}{d}/c$，期间 $a$ 增加了 $\Delta a\approx\dot a\Delta t$，故 $z\approx\Delta a/a=H_0\sym{ch01-dist}{d}/c$。与 \eqref{1.8} 比较得 $v\approx cz$——这就是天文学家把红移"换算成速度"的依据，也说明了脚注中的限制：只有 $z\ll1$ 时这种换算才有意义。图 1.5 中最远的点 $v\approx1500\,\mathrm{km\,s^{-1}}$，$z\approx0.005$，完全在这一范围内。`}</Box>
    </Sec>);
}

export function Sec13() {
  return (
    <Sec n="1.3" title="Big Bang nucleosynthesis" zh="大爆炸核合成"
      gist={R`温度降到远低于核结合能（$\lesssim\mathrm{MeV}$）后轻元素形成；预言的丰度（尤其是氘）依赖重子密度 $\omega_{\rm b}=\Omega_{\rm b}h^2$，与观测比较得重子至多约占临界密度的 5%——大部分物质必须是非重子的暗物质。`}
      why={R`核合成是我们能用已知物理检验的最早时刻（约几分钟），它给出了宇宙中普通物质的总量，并由此给出暗物质存在的第一个"宇宙学"论据。`}
      gives={[]}>
      <p className="muted">本节概念：<C id="bbn" /> · <C id="equilibrium" /></p>
      <Tx>{R`**往回外推。**掌握了标度因子以及各成分密度的演化，就可以往回外推，探索早期的现象。当宇宙热得多、密得多，温度达到 $1\,\mathrm{MeV}/k_{\rm B}$ 量级时，既没有中性原子，甚至也没有束缚的原子核：如此炽热的环境中高能辐射数量巨大，任何刚产生的原子或原子核都会立刻被高能光子打碎。随着宇宙冷却到远低于典型的核结合能，轻元素开始形成——这一过程称为**大爆炸核合成**（Big Bang Nucleosynthesis, BBN）。只要知道早期宇宙的条件与相关的核反应截面，就能算出所有元素的预期**原初丰度**（第 4 章）。`}</Tx>
      <Figure n="1.6" caption={R`氦（上）与氘（下）原初丰度的预言（曲线）随物理重子密度的变化，横轴以 $\rho_{\rm cr}$ 为单位：$\omega_{\rm b}=\Omega_{\rm b}h^2$。纵轴下标 P 表示原初丰度；$Y_{\rm P}$ 是氦的质量密度与质子加中子总质量密度之比，$y_{\rm D}$ 定义为氘与氢之比的 $10^5$ 倍。水平带为天体物理对丰度的限制，竖带为 Planck 卫星测得的 CMB 各向异性给出的限制。对于氘，由于某些核反应率知之不精，预言存在不确定性（两条预言曲线分别采用 Adelberger et al. 2011 与 Marcucci et al. 2016 的反应率）。尽管如此，BBN（结合天体物理测量）与 CMB 之间的符合令人瞩目。取自 Planck Collaboration（2018b）。`} width="72%" />
      <Tx>{R`**丰度称出重子。**图 1.6 给出 BBN 对氦和氘丰度的预言，它们是平均**重子密度**（baryon density）——基本上就是宇宙中普通物质的密度（\secref{2.4}）——的函数，以临界密度为单位。预言的丰度，特别是氘的丰度（第 4 章会详细研究），取决于核合成时质子与中子的密度。质子加中子的密度就等于重子密度，因为两者的重子数都是 1，而且它们是那时仅有的重子。

图 1.6 中的水平带是轻元素丰度的当前测量。氘丰度是在高红移的星系际介质中测得的：在遥远类星体的光谱中寻找一个微弱的吸收特征（见 Burles and Tytler, 1998；Cooke et al., 2018，以及 \exref{1.3}）。这些丰度测量与 BBN 计算相结合，给出了测量宇宙重子密度的方法：普通物质**至多贡献临界密度的约 5%**（注意图 1.6 的横轴是重子密度除以临界密度、再乘以 $h^2\simeq0.5$）。`}</Tx>
      <Box kind="example" title={R`从 $\omega_{\rm b}$ 读出 $\Omega_{\rm b}$`}>{R`图 1.6 中 CMB 竖带与氘测量都落在 $\omega_{\rm b}\approx0.0224$。取 $h=0.7$（$h^2=0.49$）：$\Omega_{\rm b}=0.0224/0.49\approx0.046$，即约 5%。而总物质 $\Omega_{\rm m}\approx0.3$（\secref{2.4.3}），所以重子只占物质的约六分之一。`}</Box>
      <Tx>{R`**暗物质的论据。**由于今天的总物质密度明显比这大——全书我们会反复看到——核合成为一种**既不由质子也不由中子构成**的物质提供了有力论据。这种新型物质因为显然不发光而被称为**暗物质**（dark matter）。"暗物质是什么？"是当今物理学的核心问题之一。`}</Tx>
      <Box kind="physics" title="为什么氘对重子密度最敏感？">{R`氘是通往氦的"中间站"：几乎所有中子都先与质子结合成氘，再经过一系列反应变成氦-4。重子密度越高，反应进行得越彻底，残留的氘就越少——所以 $y_{\rm D}$ 随 $\omega_{\rm b}$ 陡降（图 1.6 下图）。相反，氦的产量主要由那时还剩多少中子决定，对 $\omega_{\rm b}$ 只是对数式地依赖（上图几乎是平线）。定量的计算见 \secref{4.2}。`}</Box>
    </Sec>);
}

export function Sec14() {
  return (
    <Sec n="1.4" title="The cosmic microwave background" zh="宇宙微波背景"
      gist={R`温度降到 $\sim10^4\,\mathrm K$ 量级（$\sim\mathrm{eV}$）时电子与质子复合，$z\simeq1100$ 之后光子自由飞行；复合前光子处于平衡，因此是黑体谱 \eqref{1.9}，FIRAS 证实了这一点。COBE 在 1992 年发现 $10^{-5}$ 量级的各向异性——光滑背景之上的"结构"。`}
      why={R`CMB 是来自早期宇宙的信使，是最有力的早期宇宙探针；本书大量篇幅（第 4、9、10 章）都在计算它。`}
      gives={["1.9"]}>
      <p className="muted">本节概念：<C id="cmb" /> · <C id="equilibrium" /> · <C id="redshift" /></p>
      <Tx>{R`**CMB 的起源。**另一个可以从能量学和对宇宙演化的定性理解中"自然得出"的现象，是 CMB 的起源。当辐射温度在 $10^4\,\mathrm K$ 量级（对应 eV 量级的能量）时，自由电子与质子结合成中性氢。在此之前，任何生成的氢都很快被高能光子电离。在那个时期之后，即 $z\simeq1100$ 以后，组成 CMB 的光子不再与任何粒子相互作用，在空间中自由传播。今天我们观测到它们，就是在看来自宇宙历史早期某一时刻的信使——因此它们是早期宇宙**最有力的探针**。

本书会花"过多"的篇幅来研究光子在最后一次被自由电子散射之前发生了什么，并发展此后**自由流**（free-streaming）过程的数学。在许多方面中，我们会理解 CMB 怎样**独立地**约束重子密度，并与 BBN 一致（图 1.6），为协调模型提供响亮的确认。`}</Tx>
      <Box kind="warning" title="复合温度：不是 13.6 eV">{R`氢的电离能是 $13.6\,\mathrm{eV}$（约 $1.6\times10^5\,\mathrm K$），但复合实际发生在 $T\approx3000\,\mathrm K$（$k_{\rm B}T\approx0.26\,\mathrm{eV}$，$z\approx1100$；由 \eqref{1.5}：$2.726\,\mathrm K\times1101=3001\,\mathrm K$）。原因是每个重子对应约 $10^9$ 个光子：即使 $k_{\rm B}T$ 远低于 $13.6\,\mathrm{eV}$，黑体谱高能尾巴上的光子仍足以把刚形成的氢打散。原文所说的"$10^4\,\mathrm K$ 量级、eV 量级"是数量级描述；精确处理见 \secref{4.3}。`}</Box>
      <Tx>{R`**黑体谱。**此刻我们只关心一个关键事实：最后散射之前光子与电子的相互作用保证了光子处于**平衡**，也就是说它们应当具有**黑体谱**。黑体光子气体的**比强度**（specific intensity）为`}</Tx>
      <Eq n="1.9" keyEq title="黑体比强度" say={R`处于热平衡的光子气体在每个频率上的强度只由温度决定（普朗克定律）：低频随 $\nu^2$ 上升，高频被指数因子压低。`}>{R`I_\nu = \frac{4\pi\hbar\nu^3/c^2}{\exp[2\pi\hbar\nu/k_{\rm B}T]-1}.`}</Eq>
      <Tx>{R`这就是熟悉的普朗克公式 $I_\nu=\dfrac{2h_{\rm P}\nu^3/c^2}{e^{h_{\rm P}\nu/k_{\rm B}T}-1}$，只是把普朗克常数写成了 $h_{\rm P}=2\pi\hbar$（以免与哈勃参数 $h$ 混淆）。分子中的 $\nu^3$ 来自"单位频率的模式数 $\propto\nu^2$"乘"每个光子能量 $\propto\nu$"，分母是玻色–爱因斯坦占据数。`}</Tx>
      <Derivation title={R`峰值位置：$2\pi\hbar\nu_{\max}\simeq2.82\,k_{\rm B}T$`} collapsed steps={[
        { tex: R`\sym{ch01-xbb}{x}\equiv\frac{2\pi\hbar\nu}{k_{\rm B}T}\ \Rightarrow\ I_\nu\propto\frac{\sym{ch01-xbb}{x}^3}{e^{\sym{ch01-xbb}{x}}-1}`, why: R`温度固定时，$I_\nu$ 作为频率的函数只依赖无量纲组合 $\sym{ch01-xbb}{x}$。` },
        { tex: R`\frac{d}{d\sym{ch01-xbb}{x}}\frac{\sym{ch01-xbb}{x}^3}{e^{\sym{ch01-xbb}{x}}-1}=0\ \Rightarrow\ 3(1-e^{-\sym{ch01-xbb}{x}})=\sym{ch01-xbb}{x}`, why: R`求导令其为零并整理。` },
        { tex: R`\sym{ch01-xbb}{x}\simeq2.821\ \Rightarrow\ \nu_{\max}=58.8\,\mathrm{GHz}\times\frac{T}{1\,\mathrm K}`, why: R`超越方程数值解（迭代 $\sym{ch01-xbb}{x}\to3(1-e^{-x})$ 很快收敛）。峰值频率正比于温度——**维恩位移律**的频率形式。$T=2.728\,\mathrm K$ 时 $\nu_{\max}=160\,\mathrm{GHz}$，即 $1/\lambda=5.35\,\mathrm{cm^{-1}}$（\exref{1.4}）。` },
      ]} />
      <Tx>{R`**FIRAS：史上最好的黑体。**图 1.7 显示大爆炸宇宙学的这一预言（见 \exref{1.4}）与 COBE 卫星上 FIRAS 仪器的观测之间惊人的符合。事实上，CMB 是**有史以来测得的最好的黑体谱**。据说 Penzias 和 Wilson 在 1960 年代中期探测到 3 K 背景，就足以在"大爆炸"与"稳恒态宇宙"（一种没有膨胀的替代图景）的争论中判定大爆炸胜出（关于 CMB 发现史的精彩亲历记述，见 Partridge 2007 的第 1 章）。可是 Penzias 和 Wilson 只在**一个**波长上测量了这一辐射。如果连他们的单波长结果都足以扭转局面，那么图 1.7 中的现代数据应当足以把怀疑者从物理期刊的版面送到最偏激的网络聊天群的角落里去。`}</Tx>
      <Figure n="1.7" caption={R`宇宙微波辐射的强度随频率（以波数 $\mathrm{cm^{-1}}$ 表示）的变化，来自 COBE 卫星上的远红外绝对分光光度计（FIRAS）。曲线为 $T_0=2.728\,\mathrm K$ 的黑体谱。测量的误差棒比曲线的线宽还小！取自 Fixsen et al.（1996）。交互版：由 \eqref{1.9} 直接计算（纵轴 $\mathrm{MJy\,sr^{-1}}$ $=10^{20}\times$ SI 单位），可改变温度并与 Rayleigh–Jeans 低频极限比较；$T=2.728\,\mathrm K$ 时峰值在 $5.35\,\mathrm{cm^{-1}}$、$385\,\mathrm{MJy\,sr^{-1}}$，与原图一致。`} interactive={<BlackbodyPlot />} />
      <Tx>{R`**从光滑到不光滑。**CMB 前 25 年的巡测让我们学到的最重要的事实是：**早期宇宙非常光滑**——CMB 中没有探测到任何各向异性。这段时期对寻找各向异性的观测者无疑令人沮丧，却巩固了"光滑大爆炸"的图景。1992 年 COBE 卫星发现了 CMB 中的各向异性，表明早期宇宙并非完全光滑：宇宙等离子体中存在微小的扰动，相对温度涨落为 $10^{-5}$ 量级。如今这些微小涨落已被极其精确地测绘，前沿是寻找更细微的效应，如 **CMB 偏振**以及沿途物质分布造成的**引力透镜**效应。

要理解所有这些效应，显然必须超越光滑的背景宇宙，去研究对光滑性的偏离，即**不均匀性**（inhomogeneities）。宇宙中的不均匀性常常就简称为**结构**（structure）。`}</Tx>
    </Sec>);
}
