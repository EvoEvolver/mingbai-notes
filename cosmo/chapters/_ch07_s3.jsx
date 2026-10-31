// §7.3 Gravitational wave production —— 式 (7.19)–(7.42)（PDF pp. 178–184，书 pp. 167–173）
import { Sec, Sub, Tx, Eq, Box, Derivation, Details, C } from "@kit";
import { ModeFunctionPlot } from "./_ch07_plots.jsx";

const R = String.raw;

export function Sec73() {
  return (
    <Sec n="7.3" title="Gravitational wave production" zh="引力波的产生"
      gist={R`把张量扰动 $h$ 改写成一个"随时间变频率的谐振子" $\mathfrak h=ah/\sqrt{16\pi G}$，按谐振子量子化，真空涨落的方差就是 $|v|^2$；在 de Sitter 背景中模函数在视界内振荡、出视界后冻结，给出原初引力波功率谱 $P_h=8\pi GH^2/k^3|_{k|\eta|=1}$。`}
      why={R`暴胀把背景抹平，但量子涨落无法抹去——它们正是宇宙结构与原初引力波的种子。张量扰动规范不变、不与其他扰动耦合，是演示"真空涨落 $\to$ 经典原初扰动"这一机制最干净的例子；它的振幅直接测量暴胀时的哈勃率 $H_{\rm inf}$。`}
      gives={["7.26", "7.33", "7.37", "7.40", "7.42"]}>
      <p className="muted">本节概念：<C id="vacuum" /> · <C id="vacuum" /> · <C id="freeze" /> · <C id="tensor_gw" /></p>
      <Tx>{R`**暴胀不只是"抹平"。**上一节的零阶图景保证了今天所有感兴趣的尺度上宇宙都接近均匀。暴胀真正的威力在于：它能让那些本来彼此毫无因果联系的尺度**关联起来**。在零阶图景之上还有扰动，而这些扰动是在相应尺度**还处于因果接触时**产生的，并在暴胀结束后长久地保存下来。

我们最关心的是度规的**标量**扰动：它们与物质、辐射的密度耦合，最终造就了我们今天观测到的结构，\secref{7.4} 会详细研究。但暴胀还会产生度规的**张量**涨落，也就是**引力波**（gravitational waves）。第 6 章已经看到，张量扰动不与密度耦合，所以不负责大尺度结构；但它们会在 CMB 中留下各向异性。事实上，这种各向异性是暴胀**独一无二的标志**，也是窥探驱动暴胀的物理的最佳窗口。

**为什么先算张量？**因为它比标量简单得多，有两点：第一，由 \secref{6.2} 我们知道张量扰动是**规范不变**的——无论选哪套坐标，它看起来都一样；第二，张量模与度规、物质中的其他扰动的**耦合可以忽略**。

标量扰动这两个麻烦都有：它的形式依赖坐标选择，而且标量场的扰动与度规扰动彼此混合。为了不让这些技术细节遮蔽"**暴胀期间扰动如何从真空涨落中产生**"这一主线，我们先算张量模。`}</Tx>
      <Box kind="physics" title="我们到底要算什么：方差，而不是某一处的值">{R`暴胀期间，宇宙主要由一个均匀的标量场与一个均匀的背景度规构成。在这个背景上，各种场做**量子涨落**。任一时刻，涨落的平均值为零——有些区域场比平均值略大，有些略小；但涨落平方的平均（**方差** variance）不为零。我们的目标就是算出这个方差，并看它如何随暴胀演化。一旦知道了方差，就可以从具有该方差的分布中抽样，作为结构演化计算的初始条件（\secref{7.5}）。

宇宙学里我们总是用**统计量**（相关函数、功率谱）说话，因为没有任何已知理论能预言天空中某个特定位置的过密度。在暴胀图景中，这种不确定性是**根本性的**：暴胀抹去了它之前的一切痕迹，代之以量子力学的真空涨落——而后者*原则上*就不可预言。所以暴胀所预言的，恰恰是扰动所服从的**统计分布**。`}</Box>
      <Tx>{R`本章是全书**第一次、也是唯一一次**用到量子场论（quantum field theory）的地方。场论以难学著称（这名声并非全无道理），但暴胀所需的那部分与普通量子力学联系紧密，因而相对直接。作为热身，我们先量子化一维谐振子。`}</Tx>

      <Sub n="7.3.1" title="Quantizing the harmonic oscillator" zh="谐振子的量子化">
        <Tx>{R`**策略。**要算度规中的量子涨落，就必须把场量子化。无论张量还是标量扰动，做法都是：**把问题改写成看上去像一个简谐振子的样子**，然后调用我们对这个最简单系统的全部知识。所以先把谐振子量子化的几条基本事实记录下来（本节始终在 Heisenberg 绘景中工作，见下方脚注框）。

**第一条：**频率为 $\omega$ 的谐振子满足`}</Tx>
        <Eq n="7.19" say={R`最简单的振动：回复力正比于位移，解是频率 $\omega$ 的正弦振荡——后面每个 Fourier 模式都会被写成这种形式。`}>{R`\frac{d^2x}{dt^2}+\omega^2x=0.`}</Eq>
        <Box kind="note" title="原书脚注 2：Heisenberg 绘景">{R`回忆量子力学课：我们全程采用 **Heisenberg 绘景**（Heisenberg picture）——**态固定不动，算符随时间演化**。具体到这里：真空态 $|0\rangle$ 只定义一次，此后再不变化；所有时间依赖都放在算符 $\hat x(t)$ 里，而它的时间依赖又完全由 c 数的**模函数** $v(\omega,t)$ 承担（$\hat a$、$\hat a^\dagger$ 本身是常算符）。

这一选择在膨胀宇宙中尤其方便：模函数满足的是**经典**运动方程（\eqref{7.19}、之后的 \eqref{7.33}），于是"量子问题"被化成了"解一个经典常微分方程 + 选对初始条件"。后面说"真空态随膨胀演化、不再空无粒子"，在这个绘景里的含义是：同一个固定的 $|0\rangle$，相对于晚期的"瞬时"湮灭算符而言已经含有粒子了。`}</Box>
        <Tx>{R`**第二条：**量子化之后，$x$ 变成量子算符`}</Tx>
        <Eq n="7.20" say={R`位置算符被拆成"正频模函数 $\times$ 湮灭算符"加上它的 Hermite 共轭：所有时间依赖都在 c 数 $v$ 里，量子性都在 $\hat a$、$\hat a^\dagger$ 里。`}>{R`\hat x=v(\omega,t)\hat a+v^*(\omega,t)\hat a^\dagger`}</Eq>
        <Tx>{R`其中 $\hat a$ 是**湮灭算符**（annihilation operator），$v$ 是 \eqref{7.19} 的**正频解**（positive-frequency solution），$v\propto e^{-i\omega t}$。算符上的 $\dagger$ 表示 Hermite 共轭；第二项正是第一项的 Hermite 共轭，所以 $\hat x^\dagger=\hat x$——位置是可观测量，算符必须是 Hermite 的。

**第三条：**$\hat a$ 湮灭**真空态**（vacuum state）$|0\rangle$（名字由此而来）——那是一个没有任何粒子的态，$\hat a|0\rangle=0$。它还满足对易关系`}</Tx>
        <Eq n="7.21" say={R`湮灭与产生算符的对易子为 1：这是谐振子量子化的全部"量子"内容，也决定了真空涨落不为零。`}>{R`[\hat a,\hat a^\dagger]\equiv\hat a\hat a^\dagger-\hat a^\dagger\hat a=1.`}</Eq>
        <Tx>{R`其余对易子为零：$[\hat a,\hat a]=[\hat a^\dagger,\hat a^\dagger]=0$。$\hat a^\dagger$ 作用在真空上得到含一个粒子的态，所以叫**产生算符**（creation operator）。可以证明（\exref{7.10}）这些对易关系等价于位置与动量算符 $\hat x$、$\hat p$ 之间的正则对易关系`}</Tx>
        <Eq n="7.22" say={R`正则对易关系（取 $\hbar=1$、单位质量）：位置与动量不能同时确定——它与 \eqref{7.21} 等价的前提是模函数按 \eqref{7.23} 归一化。`}>{R`[\hat x,\hat p]=i,`}</Eq>
        <Tx>{R`前提是 $v$ 归一化为`}</Tx>
        <Eq n="7.23" say={R`谐振子的正频模函数：以频率 $\omega$ 振荡、振幅 $1/\sqrt{2\omega}$——频率越高，零点涨落越小。`}>{R`v(\omega,t)=\frac{e^{-i\omega t}}{\sqrt{2\omega}}.`}</Eq>
        <Derivation title={R`为什么归一化必须是 $1/\sqrt{2\omega}$：由 \eqref{7.21} 推出 \eqref{7.22}（\exref{7.10} 的要点）`} collapsed steps={[
          { tex: R`\hat p=\frac{d\hat x}{dt}=\dot v\,\hat a+\dot v^*\hat a^\dagger`, why: R`单位质量的谐振子，动量就是速度；$\hat a$、$\hat a^\dagger$ 不随时间变（Heisenberg 绘景中时间依赖全在 $v$ 里）。` },
          { tex: R`[\hat x,\hat p]=v\dot v^*[\hat a,\hat a^\dagger]+v^*\dot v[\hat a^\dagger,\hat a]=v\dot v^*-v^*\dot v`, why: R`$[\hat a,\hat a]=[\hat a^\dagger,\hat a^\dagger]=0$，$[\hat a^\dagger,\hat a]=-1$。这个组合是 $v$ 与 $v^*$ 的 Wronski 行列式 $W$，对 \eqref{7.19} 的任意两个解都不随时间变。` },
          { tex: R`v=\frac{e^{-i\omega t}}{\sqrt{2\omega}}:\quad v\dot v^*-v^*\dot v=\frac{(i\omega)-(-i\omega)}{2\omega}=i`, why: R`$\dot v=-i\omega v$，$\dot v^*=i\omega v^*$，$|v|^2=1/(2\omega)$。所以 $[\hat x,\hat p]=i$ 恰好要求 $W=i$，从而固定了模函数的模长 $|v|=1/\sqrt{2\omega}$。` },
        ]} />
        <Tx>{R`**算真空涨落。**有了这些事实，就能计算算符 $\hat x$ 在基态 $|0\rangle$ 中的量子涨落：`}</Tx>
        <Eq n="7.24" say={R`位置涨落的方差定义为 $\hat x^\dagger\hat x$ 在真空中的期望值，把 \eqref{7.20} 代入展开成四项。`}>{R`\begin{aligned}\left\langle|\hat x|^2\right\rangle&\equiv\langle0|\hat x^\dagger\hat x|0\rangle\\&=\langle0|(v^*\hat a^\dagger+v\hat a)(v\hat a+v^*\hat a^\dagger)|0\rangle.\end{aligned}`}</Eq>
        <Tx>{R`以后我们会把 $\hat x$ 认同为场 $\phi$（\secref{7.2} 已看到，场的行为就像势阱中一个粒子的位置）。`}</Tx>
        <Box kind="warning" title={R`$\langle\hat X\rangle$ 的两种含义：真空期望值 vs. 系综平均`}>{R`这里 $\langle\hat X\rangle$ 表示算符 $\hat X$ 的**真空期望值**（vacuum expectation value）。后面各章会用**同一个记号**表示可观测量的**系综平均**（ensemble average）——即在无穷大体积上测量该量所得的值。**这两者不是一回事**：前者是量子态的性质，后者是对经典随机场的空间平均。

为什么可以把它们等同起来？如果我们的可观测宇宙只是一大片经历过暴胀的时空中的**一小块**，那么"许多独立的 Fourier 模式 / 许多独立的区域"就充当了系综的各个样本：量子力学给出每个模式振幅的概率分布，而我们的天空是从这个分布中抽出的**一次**实现（视界外模式冻结后，不同模式的相位关系丢失，它们实际上表现为经典随机变量）。这个微妙的认同是**整个现代宇宙学的基础**。它的代价是：在最大尺度上可用的独立样本很少，无法把系综平均测得任意精确——这就是以后会遇到的宇宙方差（cosmic variance）。`}</Box>
        <Tx>{R`**逐项化简。**因为 $\hat a|0\rangle=0$，第二个括号中的第一项 $v\hat a|0\rangle$ 为零。同理 $\langle0|\hat a^\dagger=(\hat a|0\rangle)^\dagger=0$，于是第一个括号中的 $v^*\hat a^\dagger$ 项也贡献为零。只剩交叉项：`}</Tx>
        <Box kind="warning" title={R`勘误：算符 $\hat a$ 上漏印的帽子`}>{R`原书本页两处印作不带帽子的 $a$：\eqref{7.21} 后"Since $a^\dagger$ acting on the vacuum state…"，以及此处的 $\langle0|\hat a^\dagger=(a|0\rangle)^\dagger=0$。正确为 $\hat a^\dagger$ 与 $(\hat a|0\rangle)^\dagger$：这里作用在态上的是湮灭/产生**算符**，而 $a$ 在本书中是标度因子。本页已按正确形式书写。`}</Box>
        <Eq n="7.25" say={R`四项中只有"先产生、再湮灭"的一项存活；把 $\hat a\hat a^\dagger$ 用对易子改写，便于看出它在真空中等于 1。`}>{R`\begin{aligned}\left\langle|\hat x|^2\right\rangle&=|v(\omega,t)|^2\langle0|\hat a\hat a^\dagger|0\rangle\\&=|v(\omega,t)|^2\langle0|[\hat a,\hat a^\dagger]+\hat a^\dagger\hat a|0\rangle.\end{aligned}`}</Eq>
        <Tx>{R`第二项再次为零（$\hat a$ 湮灭真空），第一项等于 1，所以 $\hat x$ 的方差是`}</Tx>
        <Eq n="7.26" keyEq title="真空涨落的方差" say={R`真空中位置涨落的方差就是模函数的模平方：只要解出经典的模函数，量子涨落就算好了（谐振子为 $1/2\omega$）。`}>{R`\left\langle|\hat x|^2\right\rangle=|v(\omega,t)|^2,`}</Eq>
        <Box kind="note" title={R`为什么 $\langle0|\hat a\hat a^\dagger|0\rangle=1$：两种看法`}>{R`**代数看法：**$\hat a\hat a^\dagger=[\hat a,\hat a^\dagger]+\hat a^\dagger\hat a=1+\hat a^\dagger\hat a$，而 $\langle0|\hat a^\dagger\hat a|0\rangle=\|\hat a|0\rangle\|^2=0$，再用 $\langle0|0\rangle=1$。

**物理看法：**$\hat a^\dagger|0\rangle\equiv|1\rangle$ 是单粒子态，$\langle0|\hat a\hat a^\dagger|0\rangle=\|\hat a^\dagger|0\rangle\|^2=\langle1|1\rangle=1$——就是单粒子态的模方。所以真空涨落不为零的根源，正是"可以往真空里加一个粒子"：$\hat x$ 中的 $\hat a^\dagger$ 部分把真空激发到 $|1\rangle$，再由 $\hat a$ 部分拉回来。

代入 \eqref{7.23}，$\langle|\hat x|^2\rangle=1/(2\omega)$。对照一下：基态能量 $\frac12\langle\hat p^2\rangle+\frac12\omega^2\langle\hat x^2\rangle=\frac{\omega}{4}+\frac{\omega}{4}=\frac{\omega}{2}$，正是熟悉的零点能 $\hbar\omega/2$（$\hbar=1$）。`}</Box>
        <Tx>{R`对 $\hat x$ 的这个方差，代入 \eqref{7.23} 得 $1/(2\omega)$。为了计算暴胀在早期宇宙中产生的涨落，我们需要知道的量子涨落知识（几乎）就是这些了。

**从一个振子到无穷多个振子。**动手计算之前，先给一个直观图景。我们要处理的不再是单个谐振子，而是**无穷多个**振子——每个 Fourier 模式 $\boldsymbol k$ 一个。每个模式有自己的产生、湮灭算符 $\hat a^\dagger_{\boldsymbol k}$、$\hat a_{\boldsymbol k}$。这些算符的时间演化由正频与负频的组合描述，在 Minkowski 空间中就是 $v(\boldsymbol k,t),\,v^*(\boldsymbol k,t)\propto\exp(\pm i\omega(\boldsymbol k)t)$。所以在 Minkowski 空间中，真空期望值 \eqref{7.26} 与时间、位置都无关，可以**减掉**（它只是一个常数零点贡献）：**没有真实的粒子产生**。

**膨胀改变了这一切。**在快速膨胀的时空中，我们后面会看到，用来组装模函数 $v(\boldsymbol k,\eta)$ 的两个独立解有着**截然不同**的时间依赖。物理上，真空态随着膨胀而演化，使得暴胀开始时的真空态在后来**不再空无粒子**。我们首先研究的情形中，产生的粒子就是构成引力波的**引力子**（gravitons）。涨落的方差将被认同为引力波的**功率谱**。`}</Tx>
      </Sub>

      <Sub n="7.3.2" title="Tensor perturbations" zh="张量扰动">
        <Tx>{R`**出发点：第 6 章的张量方程。**回忆一下，度规的张量扰动由两个函数 $h_+$ 与 $h_\times$ 描述，每一个都满足 \eqref{6.73}：`}</Tx>
        <Eq n="7.27" say={R`每个引力波偏振满足带"哈勃摩擦"的波动方程：$2(a'/a)h'$ 让视界内的波振幅随膨胀衰减，$k^2h$ 是波的回复力。`}>{R`h''+2\frac{a'}{a}h'+k^2h=0\qquad(h=h_+,\ h_\times).`}</Eq>
        <Tx>{R`下面只考虑一个张量偏振 $\nosym{t}=+,\times$，为简洁起见省去下标 $\nosym{t}$。

**目标：去掉摩擦项。**\eqref{7.27} 比谐振子 \eqref{7.19} 多了一个一阶导数项（摩擦项），我们想把它"揉"成谐振子的形式，以便直接量子化。为此定义`}</Tx>
        <Eq n="7.28" say={R`把张量扰动乘以 $a$ 以吸收摩擦项，再除以 $\sqrt{16\pi G}$ 使其像一个标准归一化的标量场，从而可以照搬谐振子量子化。`}>{R`\mathfrak h\equiv\frac{ah}{\sqrt{16\pi G}}.`}</Eq>
        <Tx>{R`下面会看到，因子 $a$ 让 $\mathfrak h$ 的方程变得类似谐振子。那 $1/\sqrt{16\pi G}$ 从哪来？要得到它，必须写出 Minkowski 空间中张量扰动的**作用量**（action），这需要把扰动展开到**二阶**，却不会带给我们任何以后需要的关键物理。所以我们把 \eqref{7.28} 当作给定的。`}</Tx>
        <Details summary={R`拓展：$1/\sqrt{16\pi G}$ 的来历（一句话版）`}>{R`Einstein–Hilbert 作用量 $\frac{1}{16\pi G}\int d^4x\sqrt{-g}\,R$ 展开到张量扰动的二阶，标准结果是 $S^{(2)}=\frac{1}{64\pi G}\int d\eta\,d^3x\,a^2\left[(h_{ij}')^2-(\partial_lh_{ij})^2\right]$。用 $h_{ij}h_{ij}=2(h_+^2+h_\times^2)$（\eqref{6.49}），每个偏振的作用量是 $\frac{1}{32\pi G}\int d\eta\,d^3x\,a^2\left[(h')^2-(\nabla h)^2\right]$。把它与规范归一化的无质量标量场 $\frac12\int d\eta\,d^3x\,a^2\left[(\varphi')^2-(\nabla\varphi)^2\right]$ 比较，就得 $\varphi=h/\sqrt{16\pi G}$；再乘 $a$（消去摩擦项）就是 $\mathfrak h$。只有这样归一化，$\hat{\mathfrak h}$ 与其共轭动量的对易关系才是标准形式，$|v|^2$ 才是正确的方差。`}</Details>
        <Tx>{R`$h$ 对共形时间的导数可以用 $\mathfrak h$ 改写为`}</Tx>
        <Eq n="7.29" say={R`$h$ 的一阶导数 = $\mathfrak h$ 的导数除以 $a$，再减去因 $a$ 增长而来的修正。`}>{R`\frac{h'}{\sqrt{16\pi G}}=\frac{\mathfrak h'}{a}-\frac{a'}{a^2}\mathfrak h`}</Eq>
        <Tx>{R`以及`}</Tx>
        <Eq n="7.30" say={R`$h$ 的二阶导数用 $\mathfrak h$ 表示：除 $\mathfrak h''/a$ 外，多出的项都来自对 $1/a$ 求导。`}>{R`\frac{h''}{\sqrt{16\pi G}}=\frac{\mathfrak h''}{a}-2\frac{a'}{a^2}\mathfrak h'-\frac{a''}{a^2}\mathfrak h+2\frac{(a')^2}{a^3}\mathfrak h.`}</Eq>
        <Tx>{R`把它们代入 \eqref{7.27} 并约去因子 $\sqrt{16\pi G}$，得到`}</Tx>
        <Eq n="7.31" say={R`代入后摩擦项与 $(a')^2$ 项全部抵消，只剩一个"频率随时间变化"的谐振子方程，有效频率平方为 $k^2-a''/a$。`}>{R`\begin{aligned}&\frac{\mathfrak h''}{a}-2\frac{a'}{a^2}\mathfrak h'-\frac{a''}{a^2}\mathfrak h+2\frac{(a')^2}{a^3}\mathfrak h+2\frac{a'}{a}\left(\frac{\mathfrak h'}{a}-\frac{a'}{a^2}\mathfrak h\right)+k^2\frac{\mathfrak h}{a}\\&\qquad=\frac1a\left[\mathfrak h''+\left(k^2-\frac{a''}{a}\right)\mathfrak h\right]=0.\end{aligned}`}</Eq>
        <Derivation title={R`补全 \eqref{7.29}–\eqref{7.31} 的每一步`} collapsed steps={[
          { tex: R`\frac{h}{\sqrt{16\pi G}}=\frac{\mathfrak h}{a}`, why: R`由定义 \eqref{7.28} 反解。` },
          { tex: R`\frac{h'}{\sqrt{16\pi G}}=\frac{\mathfrak h'}{a}-\frac{a'}{a^2}\mathfrak h`, why: R`乘积求导，$(1/a)'=-a'/a^2$，即 \eqref{7.29}。` },
          { tex: R`\frac{h''}{\sqrt{16\pi G}}=\frac{\mathfrak h''}{a}-\frac{a'}{a^2}\mathfrak h'-\left[\frac{a''}{a^2}-\frac{2(a')^2}{a^3}\right]\mathfrak h-\frac{a'}{a^2}\mathfrak h'`, why: R`再求一次导：第一项给 $\mathfrak h''/a-a'\mathfrak h'/a^2$；第二项 $-(a'/a^2)\mathfrak h$ 给 $-(a'/a^2)'\mathfrak h-(a'/a^2)\mathfrak h'$，其中 $(a'/a^2)'=a''/a^2-2(a')^2/a^3$。合并两个 $\mathfrak h'$ 项即 \eqref{7.30}。` },
          { tex: R`2\frac{a'}{a}\cdot\frac{h'}{\sqrt{16\pi G}}=2\frac{a'}{a^2}\mathfrak h'-2\frac{(a')^2}{a^3}\mathfrak h`, why: R`摩擦项展开。` },
          { tex: R`\Big[-2\frac{a'}{a^2}\mathfrak h'+2\frac{a'}{a^2}\mathfrak h'\Big]+\Big[2\frac{(a')^2}{a^3}\mathfrak h-2\frac{(a')^2}{a^3}\mathfrak h\Big]=0`, why: R`\eqref{7.30} 中的一阶导项与 $(a')^2$ 项，恰好被摩擦项的两部分抵消——这正是乘以 $a$ 的目的。` },
          { tex: R`\frac{\mathfrak h''}{a}-\frac{a''}{a^2}\mathfrak h+k^2\frac{\mathfrak h}{a}=\frac1a\left[\mathfrak h''+\left(k^2-\frac{a''}{a}\right)\mathfrak h\right]`, why: R`剩下的三项提出 $1/a$，即 \eqref{7.31}。` },
        ]} />
        <Tx>{R`**这正是我们会用的形式。**它只含 $\mathfrak h$ 与 $\mathfrak h''$，没有一阶导数项，与 \eqref{7.19} 完全类比——唯一的区别是"频率平方"$k^2-a''/a$ 随时间变化。于是可以立刻写出量子算符：`}</Tx>
        <Eq n="7.32" say={R`每个 Fourier 模式的 $\mathfrak h$ 都像一个谐振子那样被量子化：模函数乘湮灭算符，加上共轭乘产生算符。`}>{R`\hat{\mathfrak h}(\boldsymbol k,\eta)=v(k,\eta)\hat a_{\boldsymbol k}+v^*(k,\eta)\hat a^\dagger_{\boldsymbol k},`}</Eq>
        <Tx>{R`其中产生、湮灭算符的系数满足`}</Tx>
        <Eq n="7.33" keyEq title="模函数方程" say={R`模函数是一个频率随时间变化的谐振子：$k^2$ 项驱动振荡，$a''/a$ 项是膨胀带来的"负质量平方"，二者谁占上风决定模式是振荡还是冻结。`}>{R`v''+\left(k^2-\frac{a''}{a}\right)v=0.`}</Eq>
        <Tx>{R`**先看结果怎么用，再去解方程。**稍后我们会解 \eqref{7.33}；先看它的解如何决定张量扰动涨落的功率谱。借助谐振子类比 \eqref{7.26}，$\mathfrak h$ 场的扰动方差为`}</Tx>
        <Eq n="7.34" say={R`不同波矢的 $\mathfrak h$ 涨落互不相关（Dirac $\delta$），同一波矢的方差就是模函数的模平方 $|v|^2$。`}>{R`\langle\hat{\mathfrak h}^\dagger(\boldsymbol k,\eta)\hat{\mathfrak h}(\boldsymbol k',\eta)\rangle=|v(\boldsymbol k,\eta)|^2(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k-\boldsymbol k').`}</Eq>
        <Tx>{R`同样，这是一个量子算符的**真空期望值**，以后会把它认同为一个**经典**场的系综平均。前面说过，量子场定义在全空间，可以看成无穷多个振子的集合：每个空间位置一个，或者在 Fourier 空间中每个 $\boldsymbol k$ 一个。只要方程是**线性**的，各个振子的量子涨落就彼此独立，所以 $\boldsymbol k\neq\boldsymbol k'$ 时 $\hat{\mathfrak h}(\boldsymbol k)$ 与 $\hat{\mathfrak h}(\boldsymbol k')$ 完全不相关。\eqref{7.34} 中的 Dirac $\delta$ 函数就保证了这种独立性；$(2\pi)^3$ 则来自我们在连续极限下工作。`}</Tx>
        <Details summary={R`细节：$(2\pi)^3\delta_{\rm D}^{(3)}$ 从哪来，以及 $\hat a^\dagger_{\boldsymbol k}$ 还是 $\hat a^\dagger_{-\boldsymbol k}$`}>{R`连续极限下，不同模式的算符满足 $[\hat a_{\boldsymbol k},\hat a^\dagger_{\boldsymbol k'}]=(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k-\boldsymbol k')$（单个振子的 \eqref{7.21} 的推广），这就是 \eqref{7.34} 右边的来源。

严格说，$\mathfrak h(\boldsymbol x)$ 是实场，其 Fourier 分量满足 $\hat{\mathfrak h}^\dagger(\boldsymbol k)=\hat{\mathfrak h}(-\boldsymbol k)$，所以标准写法是 $\hat{\mathfrak h}(\boldsymbol k,\eta)=v\hat a_{\boldsymbol k}+v^*\hat a^\dagger_{-\boldsymbol k}$。按这种写法计算：$\hat{\mathfrak h}^\dagger(\boldsymbol k)\hat{\mathfrak h}(\boldsymbol k')$ 在真空中只有 $v\hat a_{-\boldsymbol k}\cdot v^*\hat a^\dagger_{-\boldsymbol k'}$ 一项存活，给出 $|v|^2(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k-\boldsymbol k')$——与 \eqref{7.34} 相同。原书 \eqref{7.32} 的简写不影响任何结果（$v$ 只依赖 $k=|\boldsymbol k|$）。`}</Details>
        <Tx>{R`**从 $\mathfrak h$ 回到 $h$。**回忆 $\mathfrak h=ah/\sqrt{16\pi G}$，于是`}</Tx>
        <Eq n="7.35" say={R`把 $\mathfrak h$ 换回度规扰动 $h$，方差多出 $16\pi G/a^2$；把 $\delta$ 函数前面的系数定义为单一偏振的原初张量功率谱 $P_h$。`}>{R`\begin{aligned}\langle\hat h^\dagger(\boldsymbol k,\eta)\hat h(\boldsymbol k',\eta)\rangle&=\frac{16\pi G}{a^2}|v(\boldsymbol k,\eta)|^2(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k-\boldsymbol k')\\&\equiv P_h(k,\eta)(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k-\boldsymbol k')\end{aligned}`}</Eq>
        <Tx>{R`其中第二行定义了原初张量扰动的**功率谱**（power spectrum，**单一偏振**）。另一个有用的量是**无量纲功率谱**（dimensionless power spectrum）`}</Tx>
        <Eq n="7.36" say={R`无量纲功率谱：$\ln k$ 每单位间隔内张量涨落贡献的方差，适合直接比较不同尺度上扰动的"大小"。`}>{R`\Delta_h^2(k,\eta)\equiv\frac{k^3}{2\pi^2}P_h(k,\eta),`}</Eq>
        <Tx>{R`它给出张量模在**对数波数间隔**内的方差（实空间方差 $\langle h^2\rangle=\int\frac{d^3k}{(2\pi)^3}P_h=\int d\ln k\,\Delta_h^2$）。按我们的定义，`}</Tx>
        <Eq n="7.37" say={R`张量功率谱 = $16\pi G\times$ 模函数模平方 $\div a^2$：问题被完全化归为求解 $v$。`}>{R`P_h(k,\eta)=16\pi G\frac{|v(k,\eta)|^2}{a^2}.`}</Eq>
        <Tx>{R`**化归完成。**求暴胀产生的张量谱，现在归结为解关于 $v(k,\eta)$ 的二阶常微分方程 \eqref{7.33}。为此先要算出暴胀期间的 $a''/a$。撇号表示对共形时间求导，所以 $a'=a^2H\simeq-a/\eta$——用的是 \eqref{7.16} 最后一个近似等式 $\eta\simeq-1/(aH)$（$H$ 近似为常数，$\eta<0$ 且在暴胀结束时趋于 0）。于是 \eqref{7.33} 中 $a$ 的二阶导数为`}</Tx>
        <Eq n="7.38" say={R`在 de Sitter（$H$ 近似常数）暴胀中，"负质量平方"$a''/a$ 等于 $2/\eta^2$，越接近暴胀结束（$\eta\to0$）就越大。`}>{R`\begin{aligned}\frac{a''}{a}&\simeq-\frac1a\frac{d}{d\eta}\left(\frac a\eta\right)\\&\simeq\frac{2}{\eta^2}.\end{aligned}`}</Eq>
        <Derivation title={R`\eqref{7.38} 的中间步骤`} collapsed steps={[
          { tex: R`a'=\frac{da}{d\eta}=a\frac{da}{dt}=a^2H\simeq-\frac{a}{\eta}`, why: R`$dt=a\,d\eta$；最后一步用 $aH\simeq-1/\eta$ \eqref{7.16}。（等价地，$a=-1/(H\eta)$。）` },
          { tex: R`\frac{a''}{a}=\frac1a\frac{d}{d\eta}\left(-\frac a\eta\right)=-\frac1a\left(\frac{a'}{\eta}-\frac{a}{\eta^2}\right)`, why: R`对 $a'$ 再求导。` },
          { tex: R`=-\frac1a\left(-\frac{a}{\eta^2}-\frac{a}{\eta^2}\right)=\frac{2}{\eta^2}`, why: R`再代入 $a'=-a/\eta$。直接验证：$a=-1/(H\eta)$ 给出 $a''=-2/(H\eta^3)$，$a''/a=2/\eta^2$。` },
        ]} />
        <Tx>{R`所以 $v$ 的方程为`}</Tx>
        <Eq n="7.39" say={R`de Sitter 中的模函数方程：$k|\eta|\gg1$ 时是普通振子，$k|\eta|\ll1$ 时 $2/\eta^2$ 项主导、振荡停止。`}>{R`v''+\left(k^2-\frac{2}{\eta^2}\right)v=0.`}</Eq>
        <Tx>{R`**初始条件：视界内就是 Minkowski 振子。**解这个方程所需的初始条件来自很早的时刻，具体说是 $k|\eta|\gg1$、模式"**深处视界之内**"的时候。这时 $k^2$ 项占主导，方程精确地退化为简谐振子，由 \eqref{7.23}（把 $\omega\to k$、$t\to\eta$）知道正确归一化的解是 $e^{-ik\eta}/\sqrt{2k}$。这一知识让我们能从 \eqref{7.39} 的两个独立解中挑出正确的那个（\exref{7.12}）：`}</Tx>
        <Eq n="7.40" keyEq title="de Sitter 模函数" say={R`暴胀期间张量模的模函数：早期是正确归一化的平面波振荡，晚期 $-i/(k\eta)$ 项随 $a$ 增长而占主导。`}>{R`v=\frac{e^{-ik\eta}}{\sqrt{2k}}\left[1-\frac{i}{k\eta}\right].`}</Eq>
        <Tx>{R`模式深处视界之内（$k|\eta|\gg1$）时，方括号趋于 1，它显然回到正确的振子解。即使不做 \exref{7.12}，你也至少应该验证 \eqref{7.40} 确实是 \eqref{7.39} 的解——下面就是这个验证，外加一个更强的检查：它的归一化也是对的。`}</Tx>
        <Derivation title={R`验证 \eqref{7.40} 满足 \eqref{7.39}，且 Wronski 行列式 $=i$`} collapsed steps={[
          { tex: R`v=\frac{e^{-ik\eta}}{\sqrt{2k}}f(\eta),\qquad f=1-\frac{i}{k\eta},\quad f'=\frac{i}{k\eta^2},\quad f''=-\frac{2i}{k\eta^3}`, why: R`把 $v$ 写成平面波乘以缓变包络。` },
          { tex: R`\sqrt{2k}\,e^{ik\eta}\,v''=f''-2ikf'-k^2f`, why: R`对乘积 $e^{-ik\eta}f$ 求两次导。` },
          { tex: R`\sqrt{2k}\,e^{ik\eta}\left(v''+k^2v\right)=f''-2ikf'=-\frac{2i}{k\eta^3}+\frac{2}{\eta^2}=\frac{2}{\eta^2}\left(1-\frac{i}{k\eta}\right)=\frac{2}{\eta^2}f`, why: R`$-2ik\cdot\frac{i}{k\eta^2}=\frac{2}{\eta^2}$。于是 $v''+k^2v=\frac{2}{\eta^2}v$，即 \eqref{7.39}。` },
          { tex: R`W=vv^{*\prime}-v^*v'=\frac{1}{2k}\left[ff^{*\prime}-f^*f'+2ik|f|^2\right]`, why: R`$v'=\frac{e^{-ik\eta}}{\sqrt{2k}}(f'-ikf)$，代入后整理。` },
          { tex: R`ff^{*\prime}-f^*f'=-\frac{2i}{k\eta^2},\qquad 2ik|f|^2=2ik\left(1+\frac{1}{k^2\eta^2}\right)\ \Rightarrow\ W=\frac{1}{2k}\cdot2ik=i`, why: R`$1/\eta^2$ 项恰好抵消。$W=i$ 在任何时刻都成立，正是 $[\hat{\mathfrak h},\hat{\mathfrak h}']$ 正确归一化的条件（对比 \eqref{7.22}–\eqref{7.23} 的推导）。另一个独立解是 $v^*$；早期要求只含 $e^{-ik\eta}$（正频），排除了 $v^*$ 的混入。` },
        ]} />
        <Box kind="result" title={R`顺手得到：任意时刻的精确张量谱`}>{R`由 \eqref{7.40}，$|v|^2=\frac{1}{2k}\left(1+\frac{1}{k^2\eta^2}\right)$。代入 \eqref{7.37} 并用 $a=-1/(H\eta)$：
$$P_h(k,\eta)=\frac{16\pi GH^2\eta^2}{2k}\left(1+\frac{1}{k^2\eta^2}\right)=\frac{8\pi GH^2}{k^3}\left(1+k^2\eta^2\right).$$
视界内（$k|\eta|\gg1$）第二项主导：$P_h\simeq8\pi GH^2\eta^2/k=8\pi G/(a^2k)$，正是 Minkowski 零点涨落按 $1/a^2$ 被稀释；视界外（$k|\eta|\ll1$）第一项主导，趋于常数——这就是下面的 \eqref{7.42}。`}</Box>
        <Tx>{R`**出视界之后。**暴胀进行足够多个 e 倍之后，$k|\eta|$ 变得非常小：模式已经**穿出视界**（exited the horizon）。取 \eqref{7.40} 的小宗量极限：`}</Tx>
        <Eq n="7.41" say={R`模式出视界后模函数由 $-i/(k\eta)$ 项主导，$|v|\propto1/|\eta|\propto a$，与 $a$ 同步增长，因而 $h\propto v/a$ 冻结为常数。`}>{R`\lim_{-k\eta\to0}v(k,\eta)=\frac{e^{-ik\eta}}{\sqrt{2k}}\frac{-i}{k\eta}.`}</Eq>
        <Tx>{R`回忆这对应于 $\mathfrak h\propto ah$ 的演化，即 $h\propto v/a$。于是分三个阶段看：

（1）**早期（视界内）**：$|v|\simeq1/\sqrt{2k}$ 近似不变，所以 $h\propto v/a$ 按 $1/a$ **衰减**——暴胀在不断压低模式的振幅（这就是 \eqref{7.27} 中哈勃摩擦的作用）。

（2）**一旦 $-k\eta$ 小于 1**，模式离开视界，此后 $|v|\propto1/|\eta|$，而 $1/|\eta|\simeq aH\propto a$，所以 $h$ **保持常数**（冻结 freezing）。

（3）冻结的 $h$ 一直保持到它**重新进入视界**，那时它成为一个可观测的引力波。

引力波的这种产生，归根结底是因为：在指数膨胀的时空中，波动方程的两个解**分裂成一个常数模与一个衰减模**。（对照 \eqref{7.27} 在 $k\to0$ 时的两个解：$h=$ 常数，以及 $h'\propto a^{-2}$，即 $h\propto\int d\eta/a^2\propto\eta^3\to0$。）`}</Tx>
        <Box kind="physics" title="交互：模函数在视界内振荡、出视界后冻结">
          <Tx>{R`下图按 \eqref{7.40} 画出 $\mathrm{Re}\,v$、$|v|$ 与 $|h|\propto|v|/a$ 随 $-k\eta$（对数轴，从右往左即时间前进）的变化。$-k\eta\gg1$ 时 $\mathrm{Re}\,v$ 振荡、$|v|$ 平坦、$|h|$ 按 $1/a$ 下降；越过 $-k\eta=1$ 后振荡停止，$|v|$ 随 $a$ 增长，$|h|$ 变平——这就是"冻结"。`}</Tx>
          <ModeFunctionPlot />
        </Box>
        <Tx>{R`**冻结的振幅就是初始条件。**既然 $v$ 已经归一化，就可以确定超视界引力波振幅的方差了；它按 $|v|^2/a^2$ 变化，在暴胀把模式拉伸到视界之外后**不随时间变化**。这个常数决定了引力波的初始条件——也就是在模式重新入视界之前的某个时刻启动 $h_+$、$h_\times$ 演化时所用的值。由 \eqref{7.37} 与 \eqref{7.41}，这个常数为`}</Tx>
        <Eq n="7.42" keyEq title="原初引力波功率谱" say={R`单一偏振的原初引力波功率谱正比于 $GH^2/k^3$（尺度不变），$H$ 取模式穿出视界（$k|\eta|=1$）时的值——测到它就等于测到暴胀时的哈勃率。`}>{R`\begin{aligned}P_h(k)&=\frac{16\pi G}{a^2}\frac{1}{2k^3\eta^2}\\&=\left.\frac{8\pi GH^2}{k^3}\right|_{k|\eta|=1}.\end{aligned}`}</Eq>
        <Tx>{R`第二行用了 \eqref{7.16}：$a^2\eta^2\simeq1/H^2$。这就是**原初引力波功率谱**的最终表达式。注意 $k^3P_h$ 与 $k$ 无关，即 $\Delta_h^2=4GH^2/\pi$ 是**尺度不变**的。

**两点说明。**（1）推导中假设了 $H$ 是常数。实际上暴胀期间 $H$ 缓慢变化，但只要把 $H$ 取在**所关心的模式离开视界的时刻** $k|\eta|=1$，结果依然准确（模式出视界后就冻结，它"记住"的是那一刻的 $H$；这将在 \secref{7.6} 给出张量谱指数）。

（2）如本节开头所说，\eqref{7.42} 是 $h_+$ 与 $h_\times$ **各自**的功率谱；两者互不相关，所以按 \secref{7.6} 中 \eqref{7.101} 的定义，总张量功率谱要大一个因子 4——我们在 \secref{7.6} 再回到这一点。`}</Tx>
        <Box kind="warning" title={R`勘误：总张量谱大 4 倍而非 2 倍`}>{R`原书印作"the total tensor power spectrum is larger by a factor of 2"。正确为因子 4，与原书自己的 \eqref{7.102} $P_{\rm T}=4P_h$ 一致。依据：\eqref{7.101} 把总张量谱定义为 $\langle h^{\rm TT}_{ij}h^{{\rm TT}*}_{ij}\rangle$（对 $i,j$ 求和），由 \eqref{6.49}，$h^{\rm TT}_{ij}h^{{\rm TT}*}_{ij}=2|h_+|^2+2|h_\times|^2$——两个互不相关的偏振贡献一个因子 2，每个偏振在矩阵中出现两次又贡献一个因子 2。原书的"因子 2"只计入了偏振相加。`}</Box>
        <Tx>{R`**一个了不起的测量。**探测到这些引力波并测出 $P_h(k)$，就等于测出了**暴胀期间的哈勃率**。由于暴胀模型中势能通常远大于动能，测得 $H$ 几乎就等于测得势 $V$（$H^2\simeq8\pi GV/3$）——考虑到暴胀可能由 $10^{15}\,\mathrm{GeV}$ 以上能标的物理产生，比当今加速器的能力高出 11 个数量级，这同样非同寻常。

但**并不保证**暴胀产生的引力波一定可探测。由于 $H^2\propto\rho/m_{\rm Pl}^2$（$m_{\rm Pl}^2=1/G$），功率谱 $\propto GH^2\propto\rho/m_{\rm Pl}^4$，即以 Planck 质量为单位的暴胀时能量密度。如果暴胀发生的能标比 Planck 能标低得足够多，原初引力波就探测不到。本书后面将发展必要的工具来回答：引力波振幅可以小到多少而仍能被探测？`}</Tx>
        <Box kind="data" title="量级：暴胀能标与引力波振幅">{R`取慢滚近似 $\rho\simeq V$，$H^2=\frac{8\pi}{3}\frac{V}{m_{\rm Pl}^2}$，$m_{\rm Pl}\approx1.22\times10^{19}\,\mathrm{GeV}$。

**例 1**：$V^{1/4}=10^{16}\,\mathrm{GeV}$：$H\approx2.4\times10^{13}\,\mathrm{GeV}$，$H/m_{\rm Pl}\approx1.9\times10^{-6}$，单一偏振 $\Delta_h^2=\frac{4}{\pi}\frac{H^2}{m_{\rm Pl}^2}\approx4.8\times10^{-12}$；按 \eqref{7.102} 的总张量谱 $4\times\frac{k^3}{2\pi^2}P_h\approx1.9\times10^{-11}$，与标量振幅 $\mathcal A_s\simeq2.1\times10^{-9}$（\secref{7.6}）相比约为 $0.9\%$。

**例 2**：$V^{1/4}=10^{15}\,\mathrm{GeV}$：$\Delta_h^2\propto V$，振幅再小 $10^4$ 倍（$\sim5\times10^{-16}$），实际上无法探测。

可见张量信号对暴胀能标极其敏感：$\Delta_h^2\propto V\propto(V^{1/4})^4$。`}</Box>
        <Tx>{R`**几乎是 Gaussian 的。**虽然这里没有证明，但 $h$ 的涨落非常接近 **Gaussian**（高斯分布），正如简谐振子的量子涨落那样——更一般地，任何近似自由的量子场的涨落都如此。扰动的近 Gaussian 性是暴胀的一个**稳健预言**，已经在 CMB 与大尺度结构中得到证实：两者对原初非 Gaussian 性（primordial non-Gaussianity）的上限越来越紧。不过，即使在暴胀中也预期存在某种程度的非 Gaussian 性，尤其是标量扰动的；一旦探测到，将打开通向暴胀物理的又一扇窗口。

**过渡。**张量模向我们演示了完整的流程：改写成谐振子 $\to$ 量子化得 $|v|^2$ $\to$ 在 de Sitter 中解模函数 $\to$ 视界外冻结给出原初谱。下一节把同样的流程用于标量场扰动 $\delta\phi$，但还要额外处理两件张量模中不存在的麻烦：规范依赖，以及 $\delta\phi$ 与度规扰动的混合。`}</Tx>
      </Sub>
    </Sec>);
}
