// §11.3 The Sunyaev–Zel'dovich effect 与 §11.4 Summary —— 式 (11.50)–(11.63)，图 11.10–11.11
import { Sec, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { SZPlot } from "./_ch11_plots.jsx";

const R = String.raw;
const f = R`\sym{ch11-fdist}{f}`;          // 光子分布函数（区别于增长率 f）
const xx = R`\sym{ch11-xsz}{x}`;           // x = p/T（区别于径向距离 x）

export function Sec113() {
  return (
    <Sec n="11.3" title="The Sunyaev–Zel'dovich effect" zh="Sunyaev–Zel'dovich 效应"
      gist={R`再电离后的热电子（$T_e\gg T$）通过逆 Compton 散射把 CMB 光子推向高能。把碰撞项展开到能量转移的二阶，得到动量空间的扩散方程 \eqref{11.56}；小 $y$ 解 \eqref{11.58} 是保光子数的 $y$ 型谱畸变，零点在 $x=3.83$（217 GHz）。$y$ 是视线方向电子压强的积分 \eqref{11.59}，其角功率谱由 Limber 公式给出 \eqref{11.62}。`}
      why={R`以 CMB 为背光可以探测高红移的大尺度结构；由于 SZ 改变的是谱的**形状**，可以用多频观测把它与原初温度涨落分开，从而测量电离气体的压强并搜寻大质量星系团。`}
      gives={["11.50", "11.54", "11.55", "11.56", "11.58", "11.59", "11.61", "11.62"]}>
      <p className="muted">本节概念：<C id="sz" /> · <C id="compton_y" /> · <C id="limber" /></p>
      <Tx>{R`**以 CMB 为背光。**最直观的大尺度结构示踪体是低红移的天体，如星系。但大尺度结构也会在 CMB 上留下特征印记——CMB 光子要穿过整个可观测宇宙才到达我们。用 CMB 作背光，可以探测相当高红移处的大尺度结构，在那里直接观测发光示踪体越来越困难。我们已在 \secref{9.6} 遇到一种印记：积分 Sachs–Wolfe 效应，它只在很大尺度上重要。另一种是 **CMB 透镜**，即大尺度结构的引力势使 CMB 光子轨迹偏折，第 13 章讨论。本节研究另一个重要效应：CMB 光子被晚期宇宙中的电离气体散射。

**又能散射了。**第 4 章与第 9 章讲过，红移 $z\sim6$ 以下宇宙中的气体大部分是电离的。这意味着 CMB 光子不再与气体完全退耦，而是能够被散射（\figref{11.10}；注意与上面两种效应不同，这里 CMB 光子的方向可以剧烈改变）。幸运的是，由于气体密度低得多，这种散射远不如复合前有效，光深远小于 1。第 9 章看到散射使 CMB 各向异性衰减，第 10 章看到它在很大角尺度上产生偏振。

**这次电子更热。**除了气体密度低得多，这里的散射与复合前还有一个显著不同：气体现在比 CMB 光子**热得多**。$z\le6$ 时 CMB 温度为 20 K 且仍在下降，而气体温度从 $10^4\,\mathrm{K}$ 到大质量星系团中超过 $10^7\,\mathrm{K}$。这意味着电子的能量远高于 CMB 光子，于是在散射中倾向于**增加** CMB 光子的能量（称为**逆 Compton 散射**）。因此一部分光子被散射而获得能量后，CMB 谱就畸变了，不再是完美的黑体。在不同频率上观测 CMB，就能把这种谱畸变与本书至今研究的 CMB 温度扰动区分开。这种上散射的 **SZ 效应**最早由 Zel'dovich 与 Sunyaev (1969) 指出。`}</Tx>
      <Figure n="11.10" caption={R`CMB 光子（红色细箭头）在热电离气体云（圆）中的 Compton 散射。一部分 CMB 光子被云中的电子（黑点）散射，到达观测者时通常获得一小份能量（蓝色粗箭头）。注意等离子体中电子的典型动量 $q\sim\sqrt{m_eT_e}$ 远大于 CMB 光子的动量 $p\sim T$。`} />
      <Tx>{R`**出发点：Boltzmann 方程。**不出所料，出发点是光子的 Boltzmann 方程，碰撞项来自 Compton 散射：`}</Tx>
      <Eq n="11.50" say={R`均匀膨胀宇宙中光子的 Boltzmann 方程：左边是分布函数随时间的变化加上宇宙学红移（$-Hp\,\partial_p$），右边是 Compton 散射。`}>{R`\left[\frac{\partial}{\partial t}-Hp\frac{\partial}{\partial p}\right]${f}(p,t)=C[${f}(p)],`}</Eq>
      <Tx>{R`碰撞项由 \eqref{5.13} 给出：`}</Tx>
      <Eq n="11.51" say={R`Compton 碰撞项：对入射电子动量与出射光子动量积分，能量守恒由一维 $\delta$ 函数保证，花括号是"散射进 − 散射出"。`}>{R`\begin{aligned}C[${f}(\boldsymbol p)]=&\frac{\pi}{2m_ep}\int\frac{d^3q}{(2\pi)^32m_e}\int\frac{d^3p'}{(2\pi)^32p'}\delta_{\rm D}^{(1)}\left[p+\frac{q^2}{2m_e}-p'-\frac{(\boldsymbol q+\boldsymbol p-\boldsymbol p')^2}{2m_e}\right]\\ &\times\sum_{3\ \rm spins}|\mathcal M|^2\{f_e(\boldsymbol q+\boldsymbol p-\boldsymbol p')${f}(\boldsymbol p')-f_e(\boldsymbol q)${f}(\boldsymbol p)\}.\end{aligned}`}</Eq>
      <Tx>{R`**沿用的假设。**这里继续采用第 5 章的几个假设：非相对论区域 $T,T_e\ll m_e$，其中 $T$ 是散射发生的红移处的 CMB 温度，$T_e$ 是电子温度；各向同性散射，即取 $|\mathcal M|^2$ 与分布函数都与 $\hat{\boldsymbol p}$、$\hat{\boldsymbol q}$ 无关；量子效应（如受激辐射）可以忽略。在本应用中这些假设与复合前同样精确或更精确——除了 $T_e\ll m_e$：在非常大质量的星系团中这一假设不再精确，导致所得光子能谱有小的修正（相对论性 SZ 修正）。我们还忽略 \eqref{11.50} 左边的引力势项，因为它不影响我们关心的谱畸变。

**展开到二阶。**第 5 章中我们把 Dirac $\delta$ 函数展开到光子能量转移 $p-p'$ 的线性阶（\eqref{5.15}）。这导致光子与重子速度耦合，但**不改变光子能谱**：我们仍可以把效应写成光子温度的扰动 $\Theta(\hat{\boldsymbol p})$。现在来看这个展开中的**二阶**项：`}</Tx>
      <Eq n="11.52" say={R`能量守恒 $\delta$ 函数展开到动量转移的二阶：一阶项给出多普勒效应（第 5 章），二阶项给出热电子造成的能量扩散。`}>{R`\begin{aligned}\delta_{\rm D}^{(1)}\left[p+\frac{q^2}{2m_e}-p'-\frac{(\boldsymbol q+\boldsymbol p-\boldsymbol p')^2}{2m_e}\right]=&\ (\text{Eq. (5.15)})\\ &+\frac12\left[\frac{(\boldsymbol p-\boldsymbol p')\cdot\boldsymbol q}{m_e}\right]^2\frac{\partial^2}{\partial p'^2}\delta_{\rm D}^{(1)}(p-p').\end{aligned}`}</Eq>
      <Tx>{R`现在考虑这个（动量转移的）二阶项对碰撞积分的贡献。这与导出 \eqref{5.19} 的步骤类似，你将在 \exref{11.9} 中完成。取 $z$ 方向沿电子动量方向，得到碰撞项的如下贡献：`}</Tx>
      <Eq n="11.53" say={R`二阶项的贡献：对电子分布的积分给出 $q^2$ 的平均（电子动能），对光子则是 $\delta$ 函数二阶导数作用在"散射进 − 散射出"上。`}>{R`\begin{aligned}C[${f}(p)]\Big|_{\rm SZ}=&\ 2\pi^2\frac{\sigma_{\rm T}}{m_e}\int\frac{d^3q}{(2\pi)^3}f_e(q)\frac{q^2}{m_e}\\ &\times\int\frac{d\Omega'}{(2\pi)^3}\int dp'\,\delta_{\rm D}^{(1)}(p-p')\frac{\partial^2}{\partial p'^2}\Big[p'(p_z-p'_z)^2\big(${f}(p)-${f}(p')\big)\Big].\end{aligned}`}</Eq>
      <Tx>{R`**电子动能。**我们认出对电子分布函数的积分就是动能密度（计入电子的简并因子 $g_e=2$），对温度为 $T_e$ 的气体（更确切地说，等离子体）为 $3n_eT_e/2$。剩下的步骤很直接（\exref{11.9}）。对 $\mu=p_z/p$ 求平均，即计算 $\int_{-1}^1d\mu/2$ 后，最终得到`}</Tx>
      <Eq n="11.54" keyEq title="SZ 碰撞项" say={R`热电子的净效应是光子在动量空间中的"扩散"：速率 $n_eT_e\sigma_{\rm T}/m_e$ 正比于电子压强，算符写成全导数形式，保证光子数守恒。`}>{R`\begin{aligned}C[${f}(p)]\Big|_{\rm SZ}&=\frac{n_eT_e\sigma_{\rm T}}{m_e}\left[4p\frac{\partial ${f}}{\partial p}+p^2\frac{\partial^2${f}}{\partial p^2}\right]\\ &=\frac{n_eT_e\sigma_{\rm T}}{m_e}\frac{1}{p^2}\frac{\partial}{\partial p}\left[p^4\frac{\partial ${f}}{\partial p}\right].\end{aligned}`}</Eq>
      <Derivation title={R`从 \eqref{11.51} 到 \eqref{11.54}（\exref{11.9}）`} collapsed steps={[
        { tex: R`\frac{\pi}{2m_ep}\cdot\frac{1}{2m_e}\cdot\frac{1}{2p'}\sum|\mathcal M|^2=\frac{\pi\cdot32\pi\sigma_{\rm T}m_e^2}{8m_e^2pp'}=\frac{4\pi^2\sigma_{\rm T}}{pp'}`, why: R`代入自旋与角度平均后的 $\sum|\mathcal M|^2=32\pi\sigma_{\rm T}m_e^2$（\eqref{5.18}）；并取 $f_e(\boldsymbol q+\boldsymbol p-\boldsymbol p')\simeq f_e(\boldsymbol q)$，花括号化为 $f_e(q)[f(p')-f(p)]$。` },
        { tex: R`C\big|_{\rm SZ}=\frac{4\pi^2\sigma_{\rm T}}{p}\int\frac{d^3q}{(2\pi)^3}f_e(q)\int\frac{p'dp'\,d\Omega'}{(2\pi)^3}\,\frac12\frac{[(\boldsymbol p-\boldsymbol p')\cdot\boldsymbol q]^2}{m_e^2}\frac{\partial^2\delta_{\rm D}^{(1)}(p-p')}{\partial p'^2}\big[f(p')-f(p)\big]`, why: R`只保留 \eqref{11.52} 的二阶项；$d^3p'/p'=p'dp'\,d\Omega'$。` },
        { tex: R`=\frac{2\pi^2\sigma_{\rm T}}{m_ep}\int\frac{d^3q}{(2\pi)^3}f_e\frac{q^2}{m_e}\int\frac{d\Omega'}{(2\pi)^3}\int dp'\,\delta_{\rm D}^{(1)}(p-p')\frac{\partial^2}{\partial p'^2}\Big[p'(p_z-p'_z)^2\big(f(p')-f(p)\big)\Big]`, why: R`$z$ 轴取沿 $\boldsymbol q$，$[(\boldsymbol p-\boldsymbol p')\cdot\boldsymbol q]^2=q^2(p_z-p'_z)^2$；对 $p'$ 分部积分两次（边界项为零）。与原书 \eqref{11.53} 对照：这里多一个 $1/p$，且末因子为 $f(p')-f(p)$——见下方说明。` },
        { tex: R`g(p')\equiv p'(p\mu-p'\mu')^2,\quad\frac{\partial^2}{\partial p'^2}\big[g(f(p')-f(p))\big]_{p'=p}=2g'(p)f'(p)+g(p)f''(p)`, why: R`$f(p')-f(p)$ 在 $p'=p$ 处为零，所以 $g''$ 项不出现。$\mu=p_z/p$，$\mu'=p'_z/p'$。` },
        { tex: R`g(p)=p^3(\mu-\mu')^2,\qquad g'(p)=p^2(\mu-\mu')(\mu-3\mu')`, why: R`直接求导。` },
        { tex: R`\Big\langle\int d\Omega'(\mu-\mu')^2\Big\rangle_\mu=2\pi\cdot\frac43,\qquad\Big\langle\int d\Omega'(\mu-\mu')(\mu-3\mu')\Big\rangle_\mu=2\pi\cdot\frac83`, why: R`$\int d\Omega'=2\pi\int d\mu'$，再按原书对 $\mu$ 取 $\int_{-1}^1d\mu/2$（等价于对电子方向平均）。` },
        { tex: R`\int\frac{d^3q}{(2\pi)^3}f_e(q)\,q^2=m_e\cdot2\cdot\frac{3n_eT_e}{4}=\frac32m_en_eT_e`, why: R`$f_e$ 只计一个自旋态：$\int\frac{d^3q}{(2\pi)^3}f_e\frac{q^2}{2m_e}=\frac12\cdot\frac32n_eT_e$。` },
        { tex: R`C\big|_{\rm SZ}=\frac{2\pi^2\sigma_{\rm T}}{m_e^2p}\cdot\frac32m_en_eT_e\cdot\frac{2\pi}{8\pi^3}\left[2\cdot\frac83p^2f'+\frac43p^3f''\right]=\frac{n_eT_e\sigma_{\rm T}}{m_e}\left[4pf'+p^2f''\right]`, why: R`系数：$2\pi^2\cdot\frac32\cdot\frac{2\pi}{8\pi^3}\cdot\frac43=1$。即 \eqref{11.54}。` },
      ]} />
      <Box kind="warning" title={R`疑似排印：\eqref{11.53} 的前置因子与符号`}>{R`按上面的推导，\eqref{11.53} 的前置因子应为 $2\pi^2\sigma_{\rm T}/(m_ep)$（多一个 $1/p$，量纲才与 \eqref{11.54} 一致），方括号末因子应为 $f(p')-f(p)$（"散射进 − 散射出"，与 \eqref{11.51} 的花括号同号）。照原书 \eqref{11.53} 字面计算，会得到 $-\frac{n_eT_e\sigma_{\rm T}}{m_e}[4p^2f'+p^3f'']$，与 \eqref{11.54} 差一个 $-p$。\eqref{11.54} 本身是正确的（它就是 Kompaneets 方程在 $T_e\gg T$ 时的扩散项）。`}</Box>
      <Tx>{R`**光子数守恒。**\exref{11.10} 中你将证明这个碰撞项对所有 $p$ 的积分为零（$\int d^3p\,C=4\pi\int dp\,\partial_p[p^4\partial_pf]=0$）。也就是说光子数守恒。这不奇怪：Compton 散射本来就守恒光子数。

**换成无量纲变量。**现在把动量 $p$ 换成 $${xx}\equiv p/T$。由于 $T(t)=T_0/a$，Boltzmann 方程 \eqref{11.50} 的左边就变成 $\partial ${f}(${xx},t)/\partial t$（宇宙学红移项被吸收了：$p\propto1/a$ 的光子 $${xx}$ 不变）。进一步引入新的时间变量：`}</Tx>
      <Eq n="11.55" keyEq title="Compton y 的微分" say={R`$y$ 是以 $n_eT_e\sigma_{\rm T}/m_e$（电子压强乘 Thomson 截面除以电子质量）为速率的累积时间：它数的是光子经历的有效能量交换次数。`}>{R`dy=\frac{n_eT_e\sigma_{\rm T}}{m_e}dt.`}</Eq>
      <Tx>{R`于是 Boltzmann 方程变得特别简单：`}</Tx>
      <Eq n="11.56" keyEq title="SZ 扩散方程" say={R`光子分布在 $x$ 空间中扩散（Kompaneets 方程在 $T_e\gg T$ 极限下的形式）：$y$ 扮演时间，热电子不断把光子推向高能。`}>{R`\frac{\partial}{\partial y}${f}(${xx},y)=\frac{1}{${xx}^2}\frac{\partial}{\partial ${xx}}\left[${xx}^4\frac{\partial}{\partial ${xx}}${f}(${xx},y)\right].`}</Eq>
      <Tx>{R`**初条件。**考虑 \figref{11.10} 的情形：一团电离气体云。在遇到气体之前，CMB 光子服从温度为 $T=T_0/a$ 的平衡分布（这里忽略小的原初各向异性），所以 Boltzmann 方程的初条件为`}</Tx>
      <Eq n="11.57" say={R`进入气体云之前，光子是温度 $T$ 的黑体（Bose–Einstein，零化学势）；用 $x=p/T$ 写，它不再显含时间。`}>{R`${f}(${xx},y=0)=${f}^{(0)}(p=${xx}T(t),t)=\frac{1}{e^{${xx}}-1}.`}</Eq>
      <Tx>{R`**小 $y$ 解。**穿过气体云后的光子分布可通过求解 \eqref{11.56} 得到。考虑实际中最相关的情形 $y\ll1$，即云内 Compton 散射光深很小的区域。结果为`}</Tx>
      <Eq n="11.58" keyEq title="y 型谱畸变" say={R`穿过热气体后的光子分布等于黑体加上 $y$ 乘以"扩散算符作用在黑体上"：一阶 Euler 步进，畸变振幅正比于 $y$，形状普适。`}>{R`${f}(${xx},y)\overset{y\ll1}{=}\left\{1+y\frac{1}{${xx}^2}\frac{\partial}{\partial ${xx}}\left[${xx}^4\frac{\partial}{\partial ${xx}}\right]\right\}\frac{1}{e^{${xx}}-1},`}</Eq>
      <Tx>{R`其中利用光子的 $a\,d\chi=dt$，`}</Tx>
      <Eq n="11.59" keyEq title="Compton y 参数" say={R`$y$ 是电子压强 $n_eT_e$ 沿视线的积分（乘 $\sigma_{\rm T}/m_e$）：SZ 信号直接量出热气体的总压强。`}>{R`y=\frac{\sigma_{\rm T}}{m_e}\int a\,n_eT_e\,d\chi.`}</Eq>
      <Box kind="example" title={R`把 \eqref{11.58} 显式算出来（\exref{11.10}(b)）`}>{R`记 $f^{(0)}=1/(e^x-1)$，有 $\partial_xf^{(0)}=-\dfrac{e^x}{(e^x-1)^2}$，$\partial_x^2f^{(0)}=\dfrac{e^x(e^x+1)}{(e^x-1)^3}$。于是
$$\frac{1}{x^2}\frac{\partial}{\partial x}\Big[x^4\frac{\partial f^{(0)}}{\partial x}\Big]=4x\,\partial_xf^{(0)}+x^2\partial_x^2f^{(0)}=\frac{x\,e^x}{(e^x-1)^2}\left[x\coth\frac x2-4\right].$$
Rayleigh–Jeans 区（$x\ll1$）：方括号 $\to2-4=-2$，前因子 $\to1/x$，所以 $\Delta f/f^{(0)}\to-2y$，即亮温度降低 $\Delta T/T=-2y$。Wien 区（$x\gg1$）：$\Delta f\simeq y\,x(x-4)e^{-x}>0$。零点在 $x\coth(x/2)=4$，即 $(4-x)e^x=4+x$，$x_0=3.830$（\exref{11.11}）。`}</Box>
      <Tx>{R`**解读。**也就是说，$y$ 是电离气体中动能密度（即压强）沿视线的积分。\eqref{11.58} 第二项所描述的散射畸变不同于化学势造成的畸变。事实上，这是本书第一次遇到**非黑体**的光子分布；它之所以出现，是因为气体温度 $T_e$ 与光子温度 $T$ 相差悬殊。这种"**$y$ 型谱畸变**"见 \figref{11.11}。穿过电离云之后，光子分布在高能（Wien）尾部的光子比平衡分布多，在低能（Rayleigh–Jeans）区的少。这正是预料之中的：CMB 光子被高能电子上散射，从分布的低能侧搬到高能侧。`}</Tx>
      <Figure n="11.11" interactive={<SZPlot />}
        caption={R`有与没有（$y=0$）SZ 谱畸变时观测到的 CMB 辐射强度谱 $I_\nu\propto\nu^3f(\nu)$。$y>0$ 时，观测到的 CMB 与未畸变的黑体谱相比，高能尾部的光子更多、低能尾部的光子更少。**交互版**：直接画 \eqref{11.58}，$I\propto x^3f$。$y=0$ 时峰在 $x=2.82$、高 $1.421$；$y=0.02$、$0.05$ 时峰高分别为 $1.354$、$1.271$，$x=10$ 处分别为 $0.100$、$0.182$——与原图三条曲线一致。绿色虚线是畸变本身 $\Delta I$，它在 $x_0=3.830$ 处变号，对应 $T_0=2.726\,\mathrm{K}$ 时 $\nu=217.5\,\mathrm{GHz}$（"SZ 零点"）。`} />
      <Tx>{R`**大 $y$ 时呢？**如果走一条更仔细、更长的路推导 \eqref{11.54}（不做"光子动量相对电子动量可忽略"的近似），会发现 \eqref{11.54} 中出现的是 $T_e-T$ 而不是 $T_e$。于是在多次散射（大 $y$）的极限下，光子分布趋于一个平衡分布，其温度由能量守恒决定：初始能量密度为 $\rho_\gamma(T_0/a)+\rho_e(T_e)$，它必须等于 $\rho_\gamma(T_f)+\rho_e(T_f)$，由此定出末温度 $T_f$。所以我们的结果 \eqref{11.58} 对应于趋向新温度 $T_f$ 的平衡过程（也称"**Compton 化**"，Comptonization）的第一步。

**$y$ 图。**\eqref{11.58}–\eqref{11.59} 表明，观测穿过电离气体的 CMB 光子的谱畸变，就能测出压强沿视线的积分。设想画出整个天空的谱畸变图。这张 $y(\hat{\boldsymbol n})$ 图对应于再电离以来宇宙中电离气体积分压强的图。把宇宙中的气体压强写成随时间变化的背景加扰动：`}</Tx>
      <Eq n="11.60" say={R`气体压强等于平均压强 $\overline{n_eT_e}(\eta)$ 乘以 $1+\delta_{\mathcal P}$（$\delta_{\mathcal P}$ 为相对压强扰动）。`}>{R`\mathcal P_{\rm gas}(\boldsymbol x,\eta)=\overline{n_eT_e}(\eta)\left[1+\delta_{\mathcal P}(\boldsymbol x,\eta)\right].`}</Eq>
      <Tx>{R`于是观测到的 $y$（\eqref{11.59}）是对 $\mathcal P_{\rm gas}$ 的积分，与 \eqref{11.39} 中的投影星系密度场类似：`}</Tx>
      <Eq n="11.61" say={R`天球上每个方向的 $y$ 是沿视线（一直到最后散射面 $\chi_*$）的压强投影，权重为 $\sigma_{\rm T}\overline{n_eT_e}a/m_e$——角色相当于星系投影中的 $W(\chi)$。`}>{R`y(\hat{\boldsymbol n})=\frac{\sigma_{\rm T}}{m_e}\int_0^{\chi_*}d\chi\,\overline{n_eT_e}\,a\left[1+\delta_{\mathcal P}\big(\boldsymbol x=\hat{\boldsymbol n}\chi,\ \eta=\eta_0-\chi\big)\right].`}</Eq>
      <Tx>{R`**$y$ 的角功率谱。**接着就可以用上一节导出角功率谱 \eqref{11.47} 的结果，得到 CMB 的 SZ $y$ 畸变的角功率谱：`}</Tx>
      <Eq n="11.62" keyEq title="SZ 角功率谱" say={R`$y$ 图的角功率谱：Limber 公式中把 $W(\chi)$ 换成 $\sigma_{\rm T}\overline{n_eT_e}a/m_e$，把星系功率谱换成相对压强扰动的功率谱。`}>{R`C_y(l)=\left(\frac{\sigma_{\rm T}}{m_e}\right)^2\int\frac{d\chi}{\chi^2}\left[\overline{n_eT_e}\,a\right]^2P_{\mathcal P}\left(k=\frac{l+1/2}{\chi},\eta(\chi)\right).`}</Eq>
      <Tx>{R`其中 $P_{\mathcal P}$ 是电离气体中相对压强扰动的功率谱。测量谱畸变的各向异性，就能测出宇宙中电离气体压强涨落的振幅——这个量能深刻揭示重子的热状态，而理论上很难预言它。

**寻找星系团。**SZ 效应另一个更突出的用途是寻找 $y$ 特别大的离群点，它们对应稀有的大质量星系团（\secref{12.5} 的主题）。与其他寻找星系团的方法相比，SZ 的一大优势是信号随距离只微弱地减小，这得益于以无处不在的 CMB 作背光。（不过从 \figref{11.10} 看，"背光"一词也许有误导性：被散射向我们的不仅有来自星系团后方的 CMB 光子，还有来自所有方向的。）大型实验正致力于测量 SZ 效应。

**动力学 SZ。**本节讨论的是热电子的**热运动**造成的 CMB 光子上散射（"热 SZ"）。气体的**整体运动**也会造成类似效应，它更接近第 5 章讨论的气体速度对 CMB 光子的效应。这一效应称为"**动力学 SZ**"（kinetic SZ），探测的是气体沿视线的整体动量而不是压强。它比热 SZ 难探测得多：一是振幅更小，二是视向速度可正可负，除非借助独立的气体速度估计仔细提取，否则通常相互抵消。`}</Tx>
    </Sec>);
}

export function Sec114() {
  return (
    <Sec n="11.4" title="Summary" zh="小结"
      gist={R`示踪体统计量的三层含义：三维功率谱 \eqref{11.63}（RSD → $f\sigma_8$；AP + BAO → $d_A$、$H$），投影统计量（$w_{\rm g}$、$C_{\rm g}$），以及 SZ（压强图与星系团）。全部建立在"大尺度上 $b_1$ 与 $P_N$ 足矣"这一假设上。`}
      why={R`把本章的结果放到一起，看清每种观测量测什么、依赖什么假设，以及下一章要补上的论证。`}
      gives={["11.63"]}>
      <Tx>{R`**示踪体。**星系成团是宇宙大尺度结构的主要探针之一。为具体起见我们一直说"星系"，但许多示踪体都可以用于这一目的，我们的结果对任何示踪体普遍适用。描绘示踪体分布的巡天要么是**测光**的——天体多但距离不确定；要么是**光谱**的——天体少但定位精确。光谱巡天使我们能测量示踪体的三维统计量，特别是功率谱。它们是丰富的信息源，但解释时要小心：

**红移空间畸变**来自星系的本动速度，使功率谱对波矢与视线夹角 $\mu$ 产生特征性的依赖。这些畸变使我们能测量速度的振幅，进而测量结构形成的速率 $f\sigma_8$，其中 $f=d\ln D_+/d\ln a$。

**Alcock–Paczyński 畸变。**分析星系巡天时，需要假设一个距离–红移关系，才能把天球上的观测位置与红移变成三维位置。假设的距离–红移关系不正确会导致 Alcock–Paczyński 畸变，它同样是各向异性的，但使我们能推出到给定红移的距离以及该红移处的哈勃率。如果功率谱完全平滑，这会相当困难；但复合后印在物质中的 **BAO 特征**提供了一把标准尺，可以非常精确地测量距离–红移关系。与超新星这类标准烛光不同，BAO 特征不需要用近邻宇宙中测得的距离阶梯来定标。

**投影统计。**测光星系数据集仍能让我们测量投影成团：角关联函数 $w_{\rm g}(\theta)$ 及其 Fourier 对应物——多极矩 $C_{\rm g}(l)$。虽然 BAO 特征与 RSD 被抹平了，形状与振幅仍含有宇宙学信息，与弱引力透镜（第 13 章）结合时尤其如此。

**关键假设。**本节的结果基于关于星系成团的一个非常重要的假设：我们假定（除去上述畸变）大尺度上星系功率谱就是物质功率谱乘以常数，再加一个噪声项。这使我们能继续使用线性微扰论，得到观测星系功率谱的最终表达式：`}</Tx>
      <Eq n="11.63" keyEq title="观测星系功率谱（总结）" say={R`本章的总结式：线性物质功率谱乘以 Kaiser 因子，在 AP 缩放后的真实波矢处取值，再加白噪声。`}>{R`P_{\rm g,obs}(\boldsymbol k_{\rm obs},\bar z)=P_{\rm L}(k,\bar z)\left[b_1+f\mu_k^2\right]^2\Big|_{\boldsymbol k=\left([1+\alpha_\perp]k^1_{\rm obs},\ [1+\alpha_\perp]k^2_{\rm obs},\ [1+\alpha_\parallel]k^3_{\rm obs}\right)}+P_N.`}</Eq>
      <Tx>{R`我们没有论证为什么线性理论中只需要 $b_1$ 与 $P_N$——考虑到真实星系形成的复杂性，这看起来过于简单；但下一章思考非线性结构形成的效应时，会看到它确实成立。

**SZ。**最后，我们回到第 5 章的光子 Boltzmann 方程，研究了另一个重要的结构探针：热电离气体散射造成的 CMB 谱畸变，即 **Sunyaev–Zel'dovich（SZ）效应**。它改变了 CMB 谱的黑体形式，因而可以与原初 CMB 各向异性区分。我们看到观测到的畸变振幅正比于电离气体压强的积分，这使我们能画出积分压强图，并识别遥远的大质量星系团。用星系团能做的科学是下一章的主题之一。`}</Tx>
    </Sec>);
}
