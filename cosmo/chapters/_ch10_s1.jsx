// §10.0 引言 + §10.1 Polarization —— 式 (10.1)–(10.12)，图 10.1–10.4
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { StokesWidget, EBWidget } from "./_ch10_plots.jsx";

const R = String.raw;

export function Intro() {
  return (
    <Sec n="10.0" title="Introduction" zh="引言：偏振打开的新维度"
      gist={R`复合前的 Compton 散射不仅留下温度各向异性，还产生偏振。偏振原则上把标量扰动的信息量翻倍，更重要的是：引力波产生一种标量扰动在大尺度上无法模仿的偏振图样。`}
      why={R`物理大多已知，难点在技术：偏振是天空上的"无头矢量"而非标量；偏振光的 Compton 散射几何要仔细追踪。本章用平直天空近似回避前者，分两步（\secref{10.2}、\secref{10.3}）处理后者。`}>
      <Tx>{R`**为什么还要研究偏振。**到目前为止，我们对 CMB 的讨论集中在温度各向异性上。然而，退耦之前的 Compton 散射同样会产生**偏振各向异性**。偏振为 CMB 研究打开了一个新维度：一方面，它原则上把 CMB 中关于标量扰动的信息量**翻倍**；另一方面——这也是本章真正的重点——引力波（张量扰动）会产生一种特殊的偏振图样，而标量扰动在大尺度上**无法模仿**它。因此，偏振提供了搜寻暴胀期产生的引力波的独特途径。

**难在哪里。**CMB 偏振涉及的物理大多我们已经熟悉，但技术上有两个难点。第一，如何描述天空上的偏振图样：它不再像温度那样是天空位置的简单函数，而是一个"**无头矢量**"（headless vector）。我们采用**平直天空近似**（flat-sky approximation，\secref{10.1}）来化解：结果只在小角尺度上成立，但推导大为简化，而且不会漏掉任何本质的物理。第二，要追踪偏振辐射 Compton 散射的几何。我们分两步做（\secref{10.2}、\secref{10.3}）；正是这一几何，决定了偏振为什么是张量模的强大探针。

**预告。**\secref{10.1} 的结果在第 13 章处理星系椭率与引力透镜时还会派上大用场——那里几乎可以一字不改地照搬。`}</Tx>
    </Sec>);
}

export function Sec101() {
  return (
    <Sec n="10.1" title="Polarization" zh="偏振：Stokes 参数与 E/B 分解"
      gist={R`偏振由 $2\times2$ 对称张量 $I_{ij}$ 描述：迹为强度 $I$，无迹部分含 $Q$、$U$（\eqref{10.2}）。$Q$、$U$ 依赖坐标；在平直天空近似下，按每个 Fourier 模式自己的方向 $\boldsymbol l$ 把无迹部分分解为标量 $E$ 与赝标量 $B$（\eqref{10.7}、\eqref{10.9}、\eqref{10.11}）。`}
      why={R`温度是坐标不变量，可以直接算功率谱；偏振不是。要像温度那样做统计，先要找到坐标无关的偏振变量——这就是 E 与 B。而且 E/B 的划分恰好对应"标量能产生的"与"只有张量能产生的"。`}
      gives={["10.1", "10.2", "10.3", "10.4", "10.5", "10.6", "10.7", "10.8", "10.9", "10.10", "10.11", "10.12"]}>
      <p className="muted">本节概念：<C id="stokes" /> · <C id="headless" /> · <C id="flatsky" /> · <C id="eb" /> · <C id="parity" /></p>

      <Sub n="10.1.1" title="Stokes parameters" zh="偏振张量与 Stokes 参数">
        <Tx>{R`**怎样测偏振。**最简单的办法是在探测器前插一块**偏振片**，它只让在某个特定方向（位于垂直于传播方向的平面内）振荡的波通过（\figref{10.1}）。把探测到的强度画成偏振片取向的函数，就测出了偏振。偏振片转 $180^\circ$ 得到同样的结果：**偏振是一个无头矢量**。

**由此推出的形式。**记偏振片方向为单位矢量 $\hat{\boldsymbol m}$（$\hat{\boldsymbol m}\cdot\hat{\boldsymbol p}=0$，$\hat{\boldsymbol p}$ 是辐射的波矢方向）。探测到的通量不能依赖 $\hat{\boldsymbol m}$ 的符号，所以它必须是 $\hat{\boldsymbol m}$ 的**二次**函数：`}</Tx>
        <Eq n="10.1" title="偏振片后的探测强度" say={R`偏振片转 $180^\circ$ 读数不变，所以探测强度只能是偏振片方向的二次型；系数矩阵 $I_{ij}$ 就完整地刻画了偏振。`}>{R`I_{\rm det}(\hat{\boldsymbol m}) = I_{ij}\hat{\boldsymbol m}^i\hat{\boldsymbol m}^j,`}</Eq>
        <Figure n="10.1" interactive={<StokesWidget />}
          caption={R`测量偏振光。沿 $\hat{\boldsymbol p}$（此处 $\hat{\boldsymbol p}=\hat{\boldsymbol e}_z$）传来的光子在垂直于 $\hat{\boldsymbol p}$ 的平面内偏振；让光通过只透过某一线偏振的偏振片，并绕 $\hat{\boldsymbol p}$ 轴旋转偏振片，就能测出偏振的程度与方向。偏振是无头矢量，可用它在 $x$–$y$ 平面内相对 $x$ 轴的方位角 $\phi$ 描述。**交互版**（同时对应 \figref{10.2} 与 \exref{10.1}）：调偏振方向 $\psi$、偏振度 $p$，右图实时画出 $I_{\rm det}(\phi)=I+Q\cos2\phi+U\sin2\phi$（由 \eqref{10.1}–\eqref{10.2}，$\hat{\boldsymbol m}=(\cos\phi,\sin\phi)$）；再转动坐标轴 $\alpha$，看 $Q$、$U$ 如何按 $2\alpha$ 混合而探测强度不变。核对：$\psi=0$ 给 $Q=p$、$U=0$（椭圆沿 $x$，即图 10.2 的"$Q>0,U=0$"）；$\psi=45^\circ$ 给 $Q=0$、$U=p$。`} />
        <Tx>{R`其中 $I_{ij}$ 描述辐射的偏振，称为**偏振张量**（polarization tensor）。注意它是 $2\times2$ 矩阵，因为 $\hat{\boldsymbol m}$ 被限制在垂直于 $\hat{\boldsymbol p}$ 的平面内。显然可以取 $I_{ij}$ 对称（一般地 $I_{ij}$ 是 Hermite 矩阵，其虚部描述圆偏振；宇宙学扰动不产生圆偏振，所以本书始终取它为实对称矩阵）。此外，对非偏振光，沿 $\hat{\boldsymbol m}_x$ 与 $\hat{\boldsymbol m}_y$ 方向测到的强度相同，所以 $I_{ij}\propto\delta_{ij}$。于是写成`}</Tx>
        <Eq n="10.2" keyEq title="偏振张量与 Stokes 参数" say={R`偏振张量的对角平均是强度 $I$；$Q$ 衡量"$x$ 方向比 $y$ 方向亮多少"，$U$ 衡量"$45^\circ$ 方向比 $-45^\circ$ 方向亮多少"。非偏振光 $Q=U=0$。`}>{R`I_{ij} = \begin{pmatrix} I+Q & U\\ U & I-Q\end{pmatrix}.`}</Eq>
        <Figure n="10.2" caption={R`偏振分量 $Q$ 与 $U$ 的定义（在垂直于入射光的平面内）：$Q>0,U=0$ 沿 $x$；$Q<0,U=0$ 沿 $y$；$Q=0,U>0$ 沿 $45^\circ$；$Q=0,U<0$ 沿 $-45^\circ$。非偏振光 $Q=U=0$。（交互演示见 \figref{10.1}。）`} />
        <Tx>{R`**三个 Stokes 参数。**对角元的平均 $I$ 就是强度，即第 9 章研究的对象（以温度 $T$ 表示：一个均匀部分加扰动 $\Theta$）。两个新变量 $Q$、$U$ 描述偏振，如 \figref{10.2} 所示。学过电磁学的读者会认出 $I$、$Q$、$U$ 是描述偏振的四个 **Stokes 参数**中的三个；第四个 $V$ 描述圆偏振，这里忽略。所以，除了单一的分布函数 $f(\boldsymbol x,\hat{\boldsymbol p},\eta)$，我们现在还要考虑另外两个分布函数 $f_Q$ 与 $f_U$。事实上我们马上会看到，比 $Q$、$U$ 更有用的是另一种参数化。

**本章目标与障碍。**我们的目标是推出 CMB 中 $Q$、$U$ 应有的统计性质。为此要再次借助第 9 章推出的 Boltzmann 方程的解。但在那之前，要先处理与偏振本性有关的一些微妙之处。温度的统计很容易推出，因为温度是**坐标不变量**。偏振不是：若沿 $x$ 轴测偏振（对应 $I_{xx}$），再转动坐标系，$I_{xx}$ 的值就变了，$Q$、$U$ 也随之改变（\figref{10.1} 的交互图中转动 $\alpha$ 即可看到）。幸运的是，我们在 \secref{6.1} 已经发展了处理这类问题的工具，现在只需从三维空间换到二维。`}</Tx>
        <Box kind="physics" title={R`为什么是 $2\alpha$：自旋 2`}>{R`偏振片方向 $\hat{\boldsymbol m}=(\cos\phi,\sin\phi)$ 代入 \eqref{10.1}–\eqref{10.2}：
$$I_{\rm det}=(I+Q)\cos^2\phi+2U\sin\phi\cos\phi+(I-Q)\sin^2\phi=I+Q\cos2\phi+U\sin2\phi .$$
探测强度只依赖 $2\phi$——这是"无头"的代数表达。于是坐标轴转 $\alpha$（$\phi\to\phi-\alpha$）时，$(Q,U)$ 像一个转角为 $2\alpha$ 的二维矢量那样变换：$Q'=Q\cos2\alpha+U\sin2\alpha$，$U'=-Q\sin2\alpha+U\cos2\alpha$。物理学中称这样的量为**自旋 2** 量（温度是自旋 0，普通矢量是自旋 1）。线偏振强度 $P=\sqrt{Q^2+U^2}$ 与偏振方向（相对物理空间）不变，但分量的读数变了。`}</Box>
      </Sub>

      <Sub n="10.1.2" title="Flat sky and the E/B decomposition" zh="平直天空近似与 E/B 分解">
        <Tx>{R`**平直天空。**本章在平直天空近似下工作：推导大为简化，而物理完全不变。于是把天空上的位置 $\boldsymbol\theta$ 当作 $x$–$y$ 平面中的二维矢量；相应地，不再考虑多极矩 $l,m$，而是定义二维矢量 $\boldsymbol l$ 作为 $\boldsymbol\theta$ 的 Fourier 共轭。例如，与强度 $I$ 成正比的温度在 Fourier 空间中为`}</Tx>
        <Eq n="10.3" title="平直天空的 Fourier 变换" say={R`平直天空下，温度图的"多极展开"就是普通的二维 Fourier 变换；$\boldsymbol l$ 的模是多极数，方向是新的信息。`}>{R`T(\boldsymbol l) = \int d^2\theta\, T(\boldsymbol\theta)e^{i\boldsymbol l\cdot\boldsymbol\theta}.`}</Eq>
        <Tx>{R`**分出迹。**现在把 \eqref{10.2} 写成`}</Tx>
        <Eq n="10.4" title="迹与无迹部分" say={R`偏振张量 = 强度乘单位矩阵 + 一个无迹部分；全部偏振信息都在无迹部分里，它只有两个自由度。`}>{R`I_{ij} = I\,\delta_{ij} + \sym{IT}{I}^{\rm T}_{ij},`}</Eq>
        <Tx>{R`其中 $\sym{IT}{I}^{\rm T}_{ij}$ 无迹，含有描述两个偏振态所需的全部信息。不过，我们不想用 $Q$、$U$ 来刻画这两个态，而是用它们在**转动**下的行为。正如 \secref{6.1} 把度规扰动 $h_{ij}$ 的分量分解为标量、矢量、张量扰动，这里我们对 $\sym{IT}{I}^{\rm T}_{ij}$ 做同样的事。在二维中这其实更简单：$I_{ij}$ 有三个独立分量，所以无迹部分只有两个。

- 其中一个是**标量**，用组合 $l^il^j\sym{IT}{I}^{\rm T}_{ij}/l^2$ 提取，记为 $E(\boldsymbol l)$；
- 另一个记为 $\sym{ITT}{I}^{\rm TT}_{ij}(\boldsymbol l)$，是**横向无迹**张量（$l^i\sym{ITT}{I}^{\rm TT}_{ij}(\boldsymbol l)=0$）。

可以验证下面的分解与上述描述一致：`}</Tx>
        <Eq n="10.5" keyEq title="无迹偏振张量的 E / TT 分解" say={R`无迹偏振 = 由 $\boldsymbol l$ 构造的"沿 $\boldsymbol l$ 减各向同性"张量乘标量 $E$ + 一个与 $\boldsymbol l$ 正交的横向无迹部分；后者稍后会被一个数 $B$ 完全确定。`}>{R`\sym{IT}{I}^{\rm T}_{ij}(\boldsymbol l) = 2\left(\frac{l_il_j}{l^2}-\frac12\delta_{ij}\right)E(\boldsymbol l) + \sym{ITT}{I}^{\rm TT}_{ij}(\boldsymbol l).`}</Eq>
        <Box kind="note" title="验证 (10.5) 的自洽性">{R`(i) 两项都无迹：$\delta^{ij}(l_il_j/l^2-\frac12\delta_{ij})=1-1=0$。(ii) 用 $l^il^j/l^2$ 缩并：第一项给 $2(1-\frac12)E=E$，第二项因横向性 $l^i\sym{ITT}{I}^{\rm TT}_{ij}=0$ 给零——所以确实 $E=l^il^j\sym{IT}{I}^{\rm T}_{ij}/l^2$。(iii) 计数：$\sym{IT}{I}^{\rm T}$ 有 2 个自由度，$E$ 占 1 个；二维中横向无迹对称张量只有 1 个自由度（它必须正比于把 $\boldsymbol l$ 转 $45^\circ$ 构造出的张量），正好剩下 1 个。`}</Box>
        <Tx>{R`我们很快会看到：标量分量 $E$ 与标量和张量度规扰动都耦合，而横向无迹分量**只**与张量度规扰动耦合。这正是这个分解威力所在的又一个原因。

**与 $Q$、$U$ 的关系。**先把这两部分与原来的 $Q/U$ 分解联系起来。用 $l^il^j/l^2$ 缩并 $\sym{IT}{I}^{\rm T}_{ij}$ 提取标量分量：`}</Tx>
        <Eq n="10.6" title="提取 E" say={R`把无迹偏振张量投影到 $\boldsymbol l$ 方向上读数，得到 $E$：它就是在"以 $\boldsymbol l$ 为 $x$ 轴"的坐标中测到的 $Q$。`}>{R`\begin{aligned}E(\boldsymbol l) &= \frac{l^il^j}{l^2}\sym{IT}{I}^{\rm T}_{ij}\\ &= (\cos^2\phi_l-\sin^2\phi_l)\,Q(\boldsymbol l) + 2\sin\phi_l\cos\phi_l\,U(\boldsymbol l),\end{aligned}`}</Eq>
        <Tx>{R`第二行引入了二维波矢的方位角 $\phi_l$：$\boldsymbol l=(l_x,l_y)=(\cos\phi_l,\sin\phi_l)\,l$，并利用 $\sym{IT}{I}^{\rm T}_{11}=Q$、$\sym{IT}{I}^{\rm T}_{12}=U$、$\sym{IT}{I}^{\rm T}_{22}=-Q$ 写出了分量。由三角倍角公式化简为`}</Tx>
        <Eq n="10.7" keyEq title="E 模" say={R`$E$ 是把 $(Q,U)$ 转过 $2\phi_l$ 后的第一个分量——"在 $\boldsymbol l$ 自己的坐标系中读到的 $Q$"，因此与外部坐标的选取无关。`}>{R`E(\boldsymbol l) = \cos2\phi_l\,Q(\boldsymbol l) + \sin2\phi_l\,U(\boldsymbol l).`}</Eq>
        <Tx>{R`**提取 B。**接着用 \eqref{10.5} 求 $\sym{ITT}{I}^{\rm TT}$。先看 $12$ 分量：`}</Tx>
        <Eq n="10.8" title={R`$I^{\rm TT}_{12}$ 的计算`} say={R`从无迹张量的非对角元减去 $E$ 的贡献，剩下的恰好正比于一个新组合 $B$：横向无迹部分只有一个自由度。`}>{R`\begin{aligned}\sym{ITT}{I}^{\rm TT}_{12}(\boldsymbol l) &= \sym{IT}{I}^{\rm T}_{12}-2\frac{l_1l_2}{l^2}E(\boldsymbol l)\\ &= U(\boldsymbol l)-\sin2\phi_l\left(\cos2\phi_l\,Q(\boldsymbol l)+\sin2\phi_l\,U(\boldsymbol l)\right)\\ &= (1-\sin^22\phi_l)U(\boldsymbol l)-\sin2\phi_l\cos2\phi_l\,Q(\boldsymbol l)\\ &= \cos2\phi_l\,B(\boldsymbol l),\end{aligned}`}</Eq>
        <Tx>{R`这里再次用了三角公式（$2l_1l_2/l^2=2\sin\phi_l\cos\phi_l=\sin2\phi_l$，$1-\sin^22\phi_l=\cos^22\phi_l$），并定义了`}</Tx>
        <Eq n="10.9" keyEq title="B 模" say={R`$B$ 是把 $(Q,U)$ 转过 $2\phi_l$ 后的第二个分量——"在 $\boldsymbol l$ 自己的坐标系中读到的 $U$"：偏振方向与 $\boldsymbol l$ 成 $45^\circ$ 的部分。`}>{R`B(\boldsymbol l) = -\sin2\phi_l\,Q(\boldsymbol l) + \cos2\phi_l\,U(\boldsymbol l).`}</Eq>
        <Tx>{R`用非常类似的计算可以证明，$\sym{ITT}{I}^{\rm TT}_{ij}$ 的其余分量也只由 $B$ 给出：`}</Tx>
        <Eq n="10.10" title="TT 部分的对角组合" say={R`横向无迹部分的对角差也正比于同一个 $B$：它确实只有 $B$ 这一个自由度。`}>{R`\frac12(\sym{ITT}{I}^{\rm TT}_{11}-\sym{ITT}{I}^{\rm TT}_{22})(\boldsymbol l) = -\sin2\phi_l\,B(\boldsymbol l).`}</Eq>
        <Derivation title={R`验证 \eqref{10.10}`} collapsed steps={[
          { tex: R`\tfrac12(\sym{IT}{I}^{\rm T}_{11}-\sym{IT}{I}^{\rm T}_{22})=Q,\qquad \tfrac12\cdot2\Big(\frac{l_1^2-l_2^2}{l^2}\Big)E=\cos2\phi_l\,E`, why: R`由 \eqref{10.5}，$E$ 部分的 $11$ 与 $22$ 分量之差的一半为 $\cos2\phi_l\,E$。` },
          { tex: R`\tfrac12(\sym{ITT}{I}^{\rm TT}_{11}-\sym{ITT}{I}^{\rm TT}_{22})=Q-\cos2\phi_l(\cos2\phi_l Q+\sin2\phi_l U)`, why: R`代入 \eqref{10.7}。` },
          { tex: R`=\sin^22\phi_l\,Q-\sin2\phi_l\cos2\phi_l\,U=-\sin2\phi_l\,(-\sin2\phi_l Q+\cos2\phi_l U)=-\sin2\phi_l\,B`, why: R`$1-\cos^22\phi_l=\sin^22\phi_l$，再提出 $-\sin2\phi_l$，括号内即 \eqref{10.9}。` },
        ]} />
        <Tx>{R`**最终的分解。**于是，有两个独立分量 $Q$、$U$ 的偏振张量 $\sym{IT}{I}^{\rm T}_{ij}$ 被分解成了标量部分 $E(\boldsymbol l)$ 与描述张量部分的 $B(\boldsymbol l)$：`}</Tx>
        <Eq n="10.11" keyEq title="偏振张量的 E/B 分解" say={R`任意无迹偏振张量 = $E$ 乘"以 $\boldsymbol l$ 为轴的 $Q$ 型图样" + $B$ 乘"转了 $45^\circ$ 的 $U$ 型图样"。两个矩阵只依赖 $\boldsymbol l$ 的方向。`}>{R`\sym{IT}{I}^{\rm T}_{ij}(\boldsymbol l) = \begin{pmatrix}\cos2\phi_l & \sin2\phi_l\\ \sin2\phi_l & -\cos2\phi_l\end{pmatrix}E(\boldsymbol l) + \begin{pmatrix}-\sin2\phi_l & \cos2\phi_l\\ \cos2\phi_l & \sin2\phi_l\end{pmatrix}B(\boldsymbol l).`}</Eq>
        <Tx>{R`对照 \eqref{10.2}，第一个矩阵的 $(Q,U)=(\cos2\phi_l,\sin2\phi_l)$，第二个的 $(Q,U)=(-\sin2\phi_l,\cos2\phi_l)$——正是 \eqref{10.7}、\eqref{10.9} 的逆变换。

**一个例子。**取单个模式，波矢沿 $x$ 轴：$\boldsymbol l=l_0\hat{\boldsymbol e}_x$（$\phi_l=0$）。实空间中的偏振图样为`}</Tx>
        <Eq n="10.12" title="沿 x 轴的单个模式" say={R`波矢沿 $x$ 时：只有 $Q$（对角）的模式是纯 E，只有 $U$（非对角）的模式是纯 B。这给了一个判别 E/B 的便捷坐标系。`}>{R`\sym{IT}{I}^{\rm T}_{ij}(\boldsymbol\theta) = \begin{pmatrix}1&0\\0&-1\end{pmatrix}e^{il_0\theta_x}E_0 + \begin{pmatrix}0&1\\1&0\end{pmatrix}e^{il_0\theta_x}B_0.`}</Eq>
        <Figure n="10.3" interactive={<EBWidget />}
          caption={R`沿 $x$ 轴的单个平面波扰动（$\boldsymbol k=k\hat{\boldsymbol e}_x$）产生的偏振：E 模（上）与 B 模（下）。每根无头箭头的长度表示偏振强度。两种图样可以由偏振角与模式波矢（偏振强度变化的方向）的对齐方式区分。这里与 \figref{10.4} 中画的都是朝纸面外（沿 $z$ 轴）传播的光子的偏振。**交互版**（也对应 \figref{10.4}）：在浏览器中按 \eqref{10.11} 计算每点的 $Q$、$U$ 并画偏振棒；可改变波矢方向 $\phi_l$、相位、E/B 混合，或切换到径向波（各方向平面波叠加）。核对：$\phi_l=0$ 的纯 E 在波峰为水平棒、波谷为竖直棒、零点处消失；纯 B 在波峰为 $45^\circ$（"/"）、波谷为 $-45^\circ$（"\"），与原图一致。`} />
        <Tx>{R`**E 像电场，B 像磁场。**结果见 \figref{10.3}。E 模的强度变化方向与其取向相同或垂直，令人联想到电场：点电荷的场 $\boldsymbol E=q\hat{\boldsymbol r}/\nosym{r}^2$ 随离开源的距离改变强度，却始终指向同一方向——径向向外；沿场的方向移动，场强减小。B 模则在与其指向不同（相差 $45^\circ$）的方向上改变强度，就像磁场。注意：把 E 模图样中的每个偏振方向转 $45^\circ$，就得到 B 模图样（交互图中把 $\chi_{EB}$ 拨到 $90^\circ$ 即可看到）。

**径向波。**受这个类比启发，考虑 $x$–$y$ 平面内一组平面波的叠加：它们波长相同、在原点同相、振幅相同，只是方位角 $\phi_l$ 不同。E 与 B 模的偏振图样（不妨自己推一推！）如 \figref{10.4} 所示。两者截然不同，B 模呈现特征性的"**旋涡**"状。从图中还能看出 E 与 B 的**宇称**不同：E 是宇称偶的（设想把纸面翻过来，它保持不变），B 是宇称奇的（变号）。所以我们能在观测的偏振图中区分 E 与 B 分量，也就不奇怪了。`}</Tx>
        <Figure n="10.4" caption={R`与 \figref{10.3} 类似，但这里画的是 $x$–$y$ 平面中径向波（左图，即各方位角 $\phi_l$ 的等相位、等振幅平面波之和）产生的偏振。这一配置把 E 与 B 图样的差别展示得非常清楚（中图与右图；仍是朝纸面外传播的光）。各图分别画出径向波的一个波峰（红色，内圈）与一个波谷（蓝色，外圈）。（交互版见 \figref{10.3}，切换到"径向波"。）`} />
        <Tx>{R`**这一步的收获。**除了好看的图，我们完成了一个重要目标：$E(\boldsymbol l)$ 现在像温度一样是天空上的**标量**（而 $B(\boldsymbol l)$ 是**赝标量**；这一点以及 $Q$、$U$ 不具备这一性质，可在 \exref{10.1} 中证明）。这意味着可以直接计算功率谱。\eqref{10.11} 的另一层意义是：我们可以用一个方便的坐标系来判断某个物理过程产生的是 E 还是 B。由 \eqref{10.12}，波矢 $\boldsymbol l$ 沿 $x$ 轴、只有 $Q$ 而没有 $U$ 的模式对应纯 E 模——由于 E、B 坐标无关，这个结论对任何波矢方向都成立。`}</Tx>
        <Box kind="warning" title="E/B 是非局域的">{R`单独一根偏振棒无所谓 E 或 B——同一根"沿 $x$"的棒，若周围强度沿 $x$ 变化就是 E，若沿 $45^\circ$ 变化就是 B。E/B 的定义依赖于 Fourier 模式的方向 $\boldsymbol l$，因此在实空间中是**非局域**的；在有边界、有遮挡的真实天图上分离 E 与 B 会出现"E→B 泄漏"，这是实际 B 模实验的一个技术难点。`}</Box>
      </Sub>
    </Sec>);
}
