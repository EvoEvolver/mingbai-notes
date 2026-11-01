// §5.2 Collision terms: Compton scattering —— 式 (5.10)–(5.22)，图 5.2
import { Sec, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { PlaneWaveSky } from "./_ch05_plots.jsx";

const R = String.raw;

export function Sec52() {
  return (
    <Sec n="5.2" title="Collision terms: Compton scattering" zh="碰撞项：Compton 散射"
      gist={R`非相对论 Compton 散射几乎弹性：$|p'-p|/p\lesssim2\sqrt{2T/m_e}\ll1$。把碰撞积分按能量转移展开到一阶，对电子动量与出射光子积分，得到 $C[f]=-p\,\partial_pf^{(0)}\,n_e\sigma_{\rm T}[\Theta_0-\Theta(\hat{\boldsymbol p})+\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}]$。`}
      why={R`第 4 章的碰撞项只处理"偏离化学平衡"，总能依赖动力学平衡；要追踪光子穿过复合时期直到形成 CMB 各向异性，必须处理**动力学平衡也被破坏**的情形——分布依赖方向。`}
      gives={["5.10", "5.12", "5.14", "5.17", "5.18", "5.20", "5.22"]}>
      <p className="muted">本节概念：<C id="compton" /> · <C id="tight" /></p>
      <Tx>{R`**我们要算什么。**本节确定 Compton 散射对光子分布函数的影响。思路与 §3.2.3 的一般碰撞项、以及第 4 章的应用相同，只是现在分布函数带有扰动。回忆第 4 章：那里的过程偏离**化学**平衡，但我们总可以依赖**动力学**平衡（kinetic equilibrium）。现在连动力学平衡也不再成立——这对准确追踪光子穿过复合时期、直至形成观测到的 CMB 各向异性至关重要。

我们关心的散射过程是`}</Tx>
      <Eq n="5.10" say={R`电子与光子的弹性（Compton/Thomson）散射：动量为 $\boldsymbol q$ 的电子与动量为 $\boldsymbol p$ 的光子散射成 $\boldsymbol q'$ 与 $\boldsymbol p'$，正反过程都要计入。`}>{R`e^-(\boldsymbol q) + \gamma(\boldsymbol p) \leftrightarrow e^-(\boldsymbol q') + \gamma(\boldsymbol p'),`}</Eq>
      <Tx>{R`括号中标出了每个粒子的动量。我们要的是动量为 $\boldsymbol p$（大小 $p$、方向 $\hat{\boldsymbol p}$）处的光子分布，所以必须像 §3.2.3 那样对其余所有影响 $f(\boldsymbol p)$ 的动量（$\boldsymbol q,\boldsymbol q',\boldsymbol p'$）积分。由 \eqref{3.48}，碰撞项为`}</Tx>
      <Eq n="5.11" title="Compton 碰撞积分" say={R`动量为 $\boldsymbol p$ 的光子数的变化率 = 对所有可能的散射伙伴与末态积分：散射进来（$\boldsymbol q',\boldsymbol p'\to\boldsymbol q,\boldsymbol p$）减去散射出去（$\boldsymbol q,\boldsymbol p\to\boldsymbol q',\boldsymbol p'$），由振幅平方加权，并受动量、能量守恒约束。`}>{R`\begin{aligned}C[f(\boldsymbol p)] =& \frac{1}{2E(p)}\int\frac{d^3q}{(2\pi)^32E_e(q)}\int\frac{d^3q'}{(2\pi)^32E_e(q')}\int\frac{d^3p'}{(2\pi)^32E(p')}\sum_{3\ \rm spins}|\mathcal M|^2\\ &\times(2\pi)^4\delta_{\rm D}^{(3)}[\boldsymbol p+\boldsymbol q-\boldsymbol p'-\boldsymbol q']\,\delta_{\rm D}^{(1)}[E(p)+E_e(q)-E(p')-E_e(q')]\\ &\times\{f_e(\boldsymbol q')f(\boldsymbol p')-f_e(\boldsymbol q)f(\boldsymbol p)\}.\end{aligned}`}</Eq>
      <Tx>{R`这里显式写出了对三个自旋的求和：出射电子与出射光子（各两态），以及与动量 $\boldsymbol p$ 的光子散射的那个入射电子。注意与 §4.1 不同，我们**没有**对光子动量 $\boldsymbol p$ 积分——因为我们需要知道沿不同方向传播的光子各自如何相互作用：碰撞项将依赖 $\hat{\boldsymbol p}$。

**两个被忽略的量子统计因子。**\eqref{5.11} 忽略了受激辐射与 Pauli 阻塞，它们会带来因子 $1+f$（光子）与 $1-f_e$（电子）。Pauli 阻塞在正负电子湮灭之后从来不重要，因为电子占有数 $f_e$ 极小（§4.2 已用过这一点，并见 \exref{5.3}）；受激辐射因子为什么会消掉，下面很快就会看到。

**运动学尺度。**光子能量就是 $E(p)=p$、$E(p')=p'$；电子则取**非相对论**极限——这在复合时期完全足够，因为电子的典型动能 $\sim T$ 远小于其质量。于是`}</Tx>
      <Eq n="5.12" say={R`接近平衡时，光子能量和电子动能都约为 $T$；但电子很重，所以同样的能量对应大得多的动量：$q\sim T\sqrt{2m_e/T}\gg p$。`}>{R`\begin{aligned}&E(p) = p\sim T\,,\qquad\text{while}\\ &E_e(q)-m_e = q^2/(2m_e)\sim T\quad\Rightarrow\quad q\sim T\sqrt{\frac{2m_e}{T}}\,.\end{aligned}`}</Eq>
      <Tx>{R`由于 $m_e/T\gg1$（复合时 $T\approx0.3\,\mathrm{eV}$，$m_e/T\sim2\times10^6$），**电子动量远大于光子动量**。这个尺度分离是本节一切近似的基础。

**消去 $\boldsymbol q'$。**用三维动量 $\delta$ 函数做掉 \eqref{5.11} 中的 $\boldsymbol q'$ 积分（$\boldsymbol q'=\boldsymbol q+\boldsymbol p-\boldsymbol p'$），并在非相对论极限下令 $E_e\to m_e$（只在归一化因子中）：`}</Tx>
      <Eq n="5.13" say={R`用动量守恒消去出射电子动量后的碰撞项：剩下对入射电子动量 $\boldsymbol q$ 与出射光子动量 $\boldsymbol p'$ 的积分，能量守恒仍由一维 $\delta$ 函数保证。`}>{R`\begin{aligned}C[f(\boldsymbol p)] =& \frac{\pi}{2m_ep}\int\frac{d^3q}{(2\pi)^32m_e}\int\frac{d^3p'}{(2\pi)^32p'}\delta_{\rm D}^{(1)}\left[p+E_e(q)-p'-E_e(|\boldsymbol q+\boldsymbol p-\boldsymbol p'|)\right]\\ &\times\sum_{3\ \rm spins}|\mathcal M|^2\{f_e(\boldsymbol q+\boldsymbol p-\boldsymbol p')f(\boldsymbol p')-f_e(\boldsymbol q)f(\boldsymbol p)\}.\end{aligned}`}</Eq>
      <Derivation title={R`前置因子 $\pi/(2m_ep)$ 从何而来`} collapsed steps={[
        { tex: R`\frac{1}{2E(p)}\cdot\frac{1}{2E_e(q')}\cdot\frac{(2\pi)^4}{(2\pi)^3}=\frac{1}{2p}\cdot\frac{1}{2m_e}\cdot2\pi=\frac{\pi}{2m_ep}`, why: R`$\int d^3q'\,\delta_{\rm D}^{(3)}$ 吃掉一个 $(2\pi)^3$，剩下 $(2\pi)^4/(2\pi)^3=2\pi$；非相对论电子 $E_e(q')\simeq m_e$。剩下的 $d^3q/[(2\pi)^32m_e]$ 与 $d^3p'/[(2\pi)^32p']$ 保留在积分中。` },
      ]} />
      <Tx>{R`**Compton 散射几乎是弹性的。**要继续，需要理解非相对论 Compton 散射的运动学。对我们最重要的特征是：**能量转移非常小**。具体地，由能量守恒`}</Tx>
      <Eq n="5.14" title="能量转移很小" say={R`光子获得的能量等于电子损失的动能；由于电子动量 $q$ 远大于光子动量，这个能量差近似为 $(\boldsymbol p'-\boldsymbol p)\cdot\boldsymbol q/m_e$，只是光子能量的一个小分数。`}>{R`p'-p = E_e(q)-E_e(\boldsymbol q+\boldsymbol p-\boldsymbol p') = \frac{q^2}{2m_e}-\frac{(\boldsymbol q+\boldsymbol p-\boldsymbol p')^2}{2m_e}\simeq\frac{(\boldsymbol p'-\boldsymbol p)\cdot\boldsymbol q}{m_e},`}</Eq>
      <Tx>{R`最后的近似等号成立，是因为由 \eqref{5.12}，$q$ 远大于 $p$ 和 $p'$（展开平方后丢掉 $(\boldsymbol p-\boldsymbol p')^2$ 项）。由于 $p$ 与 $p'$ 同量级，右边至多为 $2pq/m_e$ 量级（当 $\boldsymbol p'\simeq-\boldsymbol p$，即背向散射时）。再用 \eqref{5.12}，光子能量的分数变化至多为
$$\frac{|p'-p|}{p}\lesssim\frac{2q}{m_e}\sim2\sqrt{\frac{2T}{m_e}}\ll1.$$
所以非相对论 Compton 散射**几乎是弹性的**，$p'\simeq p$。这最终证明了为什么 \eqref{5.2} 中可以把 $\Theta$ 写成 $\hat{\boldsymbol p}$ 的函数而与 $p$ 无关。`}</Tx>
      <Box kind="data" title="数量级">{R`复合时 $T\approx0.26\,\mathrm{eV}$（$z\approx1100$），$m_e=511\,\mathrm{keV}$，所以 $2\sqrt{2T/m_e}\approx2\sqrt{1.0\times10^{-6}}\approx2\times10^{-3}$：每次散射光子能量的改变不超过千分之二，而且正负随机，平均起来更小。这就是"Compton 散射只改变光子方向、不改变能量"的定量含义。`}</Box>
      <Tx>{R`**展开能量 $\delta$ 函数。**既然能量转移很小，就可以把末态电子动能 $(\boldsymbol q+\boldsymbol p-\boldsymbol p')^2/(2m_e)$ 围绕零阶值 $q^2/(2m_e)$ 展开。$\delta$ 函数展开为`}</Tx>
      <Eq n="5.15" say={R`能量守恒 $\delta$ 函数 = 弹性散射的 $\delta(p-p')$ + 一个正比于能量转移 $(\boldsymbol p-\boldsymbol p')\cdot\boldsymbol q/m_e$ 的修正项（$\delta$ 函数的导数）。`}>{R`\begin{aligned}&\delta_{\rm D}^{(1)}\left[p-p'+E_e(q)-E_e(|\boldsymbol q+\boldsymbol p-\boldsymbol p'|)\right]\\ &\simeq\delta_{\rm D}^{(1)}(p-p')+\frac{(\boldsymbol p'-\boldsymbol p)\cdot\boldsymbol q}{m_e}\frac{\partial}{\partial p}\delta_{\rm D}^{(1)}(p-p')\\ &=\delta_{\rm D}^{(1)}(p-p')+\frac{(\boldsymbol p-\boldsymbol p')\cdot\boldsymbol q}{m_e}\frac{\partial}{\partial p'}\delta_{\rm D}^{(1)}(p-p')\end{aligned}`}</Eq>
      <Tx>{R`第二个等号用了：对两变量之差的任意函数，$\partial f(x-y)/\partial x=-\partial f(x-y)/\partial y$。这个形式展开要理解为对 $p'$ 积分的被积函数的一部分；积分时 $\delta$ 函数的导数用分部积分处理。

有了这个展开，再利用 $f_e(\boldsymbol q+\boldsymbol p-\boldsymbol p')\simeq f_e(\boldsymbol q)$（因为 $p,p'\ll q$，电子分布几乎感觉不到这点动量差），碰撞项变为`}</Tx>
      <Eq n="5.16" say={R`近弹性展开后的碰撞项：电子分布只作为权重出现；光子部分是“散射进来减散射出去” $f(\boldsymbol p')-f(\boldsymbol p)$，乘以弹性 $\delta$ 函数及其一阶修正。`}>{R`\begin{aligned}C[f(\boldsymbol p)] =& \frac{\pi}{8m_e^2p}\int\frac{d^3q}{(2\pi)^3}f_e(\boldsymbol q)\int\frac{d^3p'}{(2\pi)^3p'}\sum_{3\ \rm spins}|\mathcal M|^2\\ &\times\left\{\delta_{\rm D}^{(1)}(p-p')+\frac{(\boldsymbol p-\boldsymbol p')\cdot\boldsymbol q}{m_e}\frac{\partial\delta_{\rm D}^{(1)}(p-p')}{\partial p'}\right\}\{f(\boldsymbol p')-f(\boldsymbol p)\}.\end{aligned}`}</Eq>
      <Box kind="note" title="受激辐射为什么可以忽略">{R`若计入受激辐射，最后的花括号变为 $\{f(\boldsymbol p')[1+f(\boldsymbol p)]-f(\boldsymbol p)[1+f(\boldsymbol p')]\}$。展开后多出的 $f(\boldsymbol p')f(\boldsymbol p)-f(\boldsymbol p)f(\boldsymbol p')$ 恰好**相消**。这一点依赖于我们已用 $f_e(\boldsymbol q+\boldsymbol p-\boldsymbol p')\simeq f_e(\boldsymbol q)$ 把正反过程中的电子因子写成同一个。`}</Box>
      <Tx>{R`**振幅平方。**还需要 Compton 散射振幅的平方。在我们关心的低能极限下，教科书结果（如 Srednicki 2007 习题 11.2）为`}</Tx>
      <Eq n="5.17" say={R`低能 Compton（Thomson）散射振幅平方：大小由 Thomson 截面 $\sigma_{\rm T}$ 决定，角依赖为 $1+\cos^2$(散射角)。`}>{R`\frac12\sum_{4\ \rm spins}|\mathcal M|^2 = 24\pi\sigma_{\rm T}m_e^2\left(1+[\hat{\boldsymbol p}\cdot\hat{\boldsymbol p}']^2\right)`}</Eq>
      <Tx>{R`其中 $\sigma_{\rm T}$ 是 **Thomson 截面**。如果我们满足于再对动量为 $\boldsymbol p$ 的光子的偏振态取平均（因此有前置因子 $1/2$），就可以把这个表达式用作 $\sum_{3\ \rm spins}|\mathcal M|^2$。我们再做一步简化：对 \eqref{5.17} 做**角平均**。由于 $\langle(\hat{\boldsymbol p}\cdot\hat{\boldsymbol p}')^2\rangle=1/3$，括号变成 $4/3$，得到`}</Tx>
      <Eq n="5.18" say={R`对自旋和散射角都取平均后，振幅平方变成与动量无关的常数 $32\pi\sigma_{\rm T}m_e^2$。`}>{R`\sum_{3\ \rm spins}|\mathcal M|^2 = 32\pi\sigma_{\rm T}m_e^2\qquad(\text{spin- and angle-average}).`}</Eq>
      <Box kind="warning" title="这里丢掉了什么">{R`**角依赖。**忽略 $|\mathcal M|^2$ 的角依赖只使最终碰撞项改变一个数值上次要的贡献；为了不分散注意力，这里先忽略，\exref{5.4} 中补回（它给出 \eqref{5.67} 中的 $-\frac12\mathcal P_2(\mu)\Theta_2$ 项）。

**偏振。**对入射和出射光子的自旋都取平均，等于忽略了辐射场的偏振。实际上 Compton 散射振幅依赖偏振，这会使 CMB 产生微小的偏振（Bond & Efstathiou 1984；Polnarev 1985）。CMB 偏振携带的信息极有价值，第 10 章将专门讨论。Compton 散射也耦合了偏振与温度扰动，所以精确计算后者需要同时处理前者；这里同样先忽略这个小效应。`}</Box>
      <Tx>{R`**对电子动量积分。**既然 $\sum|\mathcal M|^2$ 与所涉及的动量无关，就可以把 \eqref{5.16} 方括号中的项乘开，只保留能量转移的一阶项。对 $\boldsymbol q$ 的积分：与 $\boldsymbol q$ 无关的项给出 $n_e/2$（2 来自电子的两个自旋态，$g_e=2$）；含 $\boldsymbol q/m_e$ 的项则给出 $n_e\boldsymbol u_{\rm b}/2$，其中 $\boldsymbol u_{\rm b}$ 是电子的整体（bulk）速度——下标 b 表示它与重子速度相同（\secref{5.5}）。于是`}</Tx>
      <Eq n="5.19" say={R`对电子积分后：弹性部分只剩“周围各方向散射进来的光子”减去“本方向散射出去的光子”；电子整体速度通过 $\delta$ 函数的导数带来一个多普勒修正。`}>{R`\begin{aligned}C[f(\boldsymbol p)] =& \frac{2\pi^2n_e\sigma_{\rm T}}{p}\int\frac{d^3p'}{(2\pi)^3p'}\left\{\delta_{\rm D}^{(1)}(p-p')+(\boldsymbol p-\boldsymbol p')\cdot\boldsymbol u_{\rm b}\frac{\partial\delta_{\rm D}^{(1)}(p-p')}{\partial p'}\right\}\\ &\times\left\{f^{(0)}(p')-f^{(0)}(p)-p'\frac{\partial f^{(0)}}{\partial p'}\Theta(\hat{\boldsymbol p}')+p\frac{\partial f^{(0)}}{\partial p}\Theta(\hat{\boldsymbol p})\right\}\\ =& \frac{n_e\sigma_{\rm T}}{4\pi p}\int_0^\infty dp'\,p'\int d\Omega'\left[\delta_{\rm D}^{(1)}(p-p')\left(-p'\frac{\partial f^{(0)}}{\partial p'}\Theta(\hat{\boldsymbol p}')+p\frac{\partial f^{(0)}}{\partial p}\Theta(\hat{\boldsymbol p})\right)\right.\\ &\left.+(\boldsymbol p-\boldsymbol p')\cdot\boldsymbol u_{\rm b}\frac{\partial\delta_{\rm D}^{(1)}(p-p')}{\partial p'}\left(f^{(0)}(p')-f^{(0)}(p)\right)\right],\end{aligned}`}</Eq>
      <Derivation title={R`\eqref{5.16} → \eqref{5.19} 的系数与取舍`} collapsed steps={[
        { tex: R`\frac{\pi}{8m_e^2p}\times32\pi\sigma_{\rm T}m_e^2\times\frac{n_e}{2}=\frac{2\pi^2n_e\sigma_{\rm T}}{p}`, why: R`代入 \eqref{5.18}，并用 $\int\frac{d^3q}{(2\pi)^3}f_e(\boldsymbol q)=n_e/2$（$f_e$ 只计一个自旋态，$n_e$ 计两态）。` },
        { tex: R`\int\frac{d^3q}{(2\pi)^3}f_e(\boldsymbol q)\frac{\boldsymbol q}{m_e}=\frac{n_e}{2}\boldsymbol u_{\rm b}`, why: R`非相对论电子的速度 $\boldsymbol q/m_e$ 按分布加权平均就是整体速度——流体速度的定义（参见 \eqref{5.39}）。` },
        { tex: R`f(\boldsymbol p')-f(\boldsymbol p)=\underbrace{f^{(0)}(p')-f^{(0)}(p)}_{\text{零阶}}\underbrace{-p'\partial_{p'}f^{(0)}\Theta(\hat{\boldsymbol p}')+p\,\partial_pf^{(0)}\Theta(\hat{\boldsymbol p})}_{\text{一阶}}`, why: R`由 \eqref{5.3}。我们同时按两个小量展开：扰动的大小与能量转移的大小。` },
        { tex: R`\delta_{\rm D}^{(1)}(p-p')[f^{(0)}(p')-f^{(0)}(p)]=0,\qquad(\boldsymbol p-\boldsymbol p')\cdot\boldsymbol u_{\rm b}\times[\text{一阶}]=\text{二阶}`, why: R`零阶部分乘弹性 $\delta$ 函数恰好相消（"平衡时碰撞项为零"）；$\boldsymbol u_{\rm b}$ 本身是一阶量，乘以一阶部分是二阶，丢掉。` },
        { tex: R`\frac{d^3p'}{(2\pi)^3p'}=\frac{p'\,dp'\,d\Omega'}{8\pi^3}\ \Rightarrow\ \frac{2\pi^2}{8\pi^3}=\frac1{4\pi}`, why: R`改用球坐标，$\Omega'$ 为单位矢量 $\hat{\boldsymbol p}'$ 张成的立体角，得到 \eqref{5.19} 第二个等号。` },
      ]} />
      <Tx>{R`其中 $\Omega'$ 是单位矢量 $\hat{\boldsymbol p}'$ 张成的立体角。这里只标出了 $\Theta$ 对 $\hat{\boldsymbol p}$、$\hat{\boldsymbol p}'$ 的依赖：对 $\boldsymbol x$、$t$ 的依赖在推导碰撞项时无关紧要——碰撞是**局域**的，始终在同一个 $\boldsymbol x$、$t$。

**对立体角积分：单极矩登场。**\eqref{5.19} 中只有两项依赖 $\hat{\boldsymbol p}'$，因而在对 $\Omega'$ 积分时需要处理。第一项是分布函数的扰动 $\Theta(\hat{\boldsymbol p}')$。此时引入**单极矩**（monopole）很方便：`}</Tx>
      <Eq n="5.20" title="单极矩" say="单极矩是某一点处所有方向的温度扰动的平均：该点光子的“平均温度”偏离背景多少。">{R`\Theta_0(\boldsymbol x,t) \equiv \frac{1}{4\pi}\int d\Omega'\,\Theta(\hat{\boldsymbol p}',\boldsymbol x,t).`}</Eq>
      <Tx>{R`单极 $\Theta_0$ 是给定点处光子扰动对所有光子方向的积分。换句话说，它对应给定位置 $\boldsymbol x$、时刻 $t$ 的**角平均光子通量**的分数扰动（只是借玻色–爱因斯坦分布表述为温度扰动）。之后我们会把它推广为一整串**多极矩**——以方向 $\hat p$ 的函数为权重对分布函数的积分（\eqref{5.66}）。注意，如图 5.2 所示，**单极矩不能被吸收进零阶温度的定义**，因为后者在全空间都是常数，而 $\Theta_0$ 随位置变化。

第二个依赖 $\hat{\boldsymbol p}'$ 的是显式因子 $\hat{\boldsymbol p}'\cdot\boldsymbol u_{\rm b}$：$\boldsymbol u_{\rm b}$ 是与 $\boldsymbol p$、$\boldsymbol p'$ 无关的矢量，对所有方向积分为零。于是对立体角积分后剩下`}</Tx>
      <Eq n="5.21" say={R`立体角积分后：散射进来的光子带着单极 $\Theta_0$，散射出去的光子带着本方向的 $\Theta(\hat{\boldsymbol p})$；速度项只剩 $\boldsymbol p\cdot\boldsymbol u_{\rm b}$。`}>{R`\begin{aligned}C[f(\boldsymbol p)] =& \frac{n_e\sigma_{\rm T}}{p}\int_0^\infty dp'\,p'\left[\delta_{\rm D}^{(1)}(p-p')\left(-p'\frac{\partial f^{(0)}}{\partial p'}\Theta_0+p\frac{\partial f^{(0)}}{\partial p}\Theta(\hat{\boldsymbol p})\right)\right.\\ &\left.+\,\boldsymbol p\cdot\boldsymbol u_{\rm b}\frac{\partial\delta_{\rm D}^{(1)}(p-p')}{\partial p'}\left(f^{(0)}(p')-f^{(0)}(p)\right)\right].\end{aligned}`}</Eq>
      <Tx>{R`现在 $p'$ 积分可以做了：第一行平凡地对 $\delta$ 函数积分，第二行分部积分。最终剩下`}</Tx>
      <Eq n="5.22" keyEq title="Compton 碰撞项" say={R`Compton 散射把每一点的温度扰动 $\Theta(\hat{\boldsymbol p})$ 拉向该点的单极 $\Theta_0$，同时叠加电子整体运动造成的多普勒项 $\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}$；速率是 $n_e\sigma_{\rm T}$。`}>{R`C[f(\boldsymbol p)] = -p\frac{\partial f^{(0)}}{\partial p}n_e\sigma_{\rm T}\left[\Theta_0-\Theta(\hat{\boldsymbol p})+\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}\right]`}</Eq>
      <Derivation title={R`\eqref{5.21} → \eqref{5.22}：两个 $p'$ 积分`} collapsed steps={[
        { tex: R`\int_0^\infty dp'\,p'\,\delta_{\rm D}^{(1)}(p-p')\left(-p'\frac{\partial f^{(0)}}{\partial p'}\Theta_0+p\frac{\partial f^{(0)}}{\partial p}\Theta\right)=-p^2\frac{\partial f^{(0)}}{\partial p}\left(\Theta_0-\Theta\right)`, why: R`第一行：$\delta$ 函数令 $p'=p$。` },
        { tex: R`\int_0^\infty dp'\,p'\frac{\partial\delta_{\rm D}^{(1)}(p-p')}{\partial p'}\left(f^{(0)}(p')-f^{(0)}(p)\right)=-\int_0^\infty dp'\,\delta_{\rm D}^{(1)}(p-p')\frac{\partial}{\partial p'}\left[p'\left(f^{(0)}(p')-f^{(0)}(p)\right)\right]`, why: R`第二行分部积分（边界项为零）。` },
        { tex: R`=-\left[\left(f^{(0)}(p)-f^{(0)}(p)\right)+p\frac{\partial f^{(0)}}{\partial p}\right]=-p\frac{\partial f^{(0)}}{\partial p}`, why: R`导数作用在 $p'$ 上得两项，第一项在 $p'=p$ 处为零。` },
        { tex: R`C=\frac{n_e\sigma_{\rm T}}{p}\left[-p^2\frac{\partial f^{(0)}}{\partial p}(\Theta_0-\Theta)-(\boldsymbol p\cdot\boldsymbol u_{\rm b})\,p\frac{\partial f^{(0)}}{\partial p}\right]=-p\frac{\partial f^{(0)}}{\partial p}n_e\sigma_{\rm T}\left[\Theta_0-\Theta+\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}\right]`, why: R`合并，并用 $\boldsymbol p\cdot\boldsymbol u_{\rm b}/p=\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}$。` },
      ]} />
      <Tx>{R`**读出物理：散射把光子"搅匀"。**我们已经可以预见 Compton 散射对光子分布的作用。在电子没有整体速度（$\boldsymbol u_{\rm b}=0$）时，碰撞项驱使 $\Theta$ 趋向 $\Theta_0$。也就是说，当 Compton 散射非常有效时，只有单极扰动能存活下来，**每一点上的各向异性都被抹平**（图 5.2）。直观地说，强散射意味着光子的平均自由程很短。于是到达空间某点的光子，都是在附近最后一次被电子散射；而附近电子的温度与本地非常接近。因此所有方向来的光子温度都相同，任何方向的通量都等于角平均通量：$\Theta(\boldsymbol x,\hat{\boldsymbol p},t)=\Theta_0(\boldsymbol x,t)$。`}</Tx>
      <Figure n="5.2" illustration={<PlaneWaveSky />}
        caption={R`平面波温度扰动（$\boldsymbol k$ 水平）及其对紧耦合光子的影响。深色（白色）区域表示电子温度的热（冷）斑。若 Compton 散射非常有效，在给定点观测到的光子都在很近处最后一次被散射——即以观测点（黑点）为中心的圆内，这些圆就是对应观测点的最后散射面。圆上的温度非常接近均匀，所以分布几乎完全由单极描述；但不同的圆（对应不同观测者）因扰动而温度不同——**单极随空间变化**。自绘交互：拖动 $k\lambda_{\rm mfp}$ 看平均自由程变长时，偶极、四极如何出现；单极 $|\Theta_0|=|\cos kx_{\rm obs}|\,j_0(k\lambda)$。`} />
      <Tx>{R`**电子在运动时。**若电子有整体速度，情况略有改变：光子分布中会产生一个**偶极矩**，其大小与方向由电子速度决定（多普勒效应）。但四极及更高阶矩仍然为零。因此 Compton 散射产生的光子分布极其简单：**只有非零的单极和偶极**。这等价于说光子的行为像一种**流体**。事实上，强散射——**紧耦合**（tight coupling）——使光子与电子像**单一流体**一样运动。

光子–重子退耦后 Compton 散射不再有效，复合之后光子也就不再像流体。但 Boltzmann 方法在退耦后依然有效，并且抓住了**自由流**的本质物理：那正是光子从退耦到我们探测器的漫长旅程。`}</Tx>
      <Box kind="physics" title="交互图里的数值说明了什么">{R`在交互版图 5.2 中，到达观测点、沿 $\hat{\boldsymbol p}$ 传播的光子来自距离一个平均自由程 $\lambda$ 处的 $\boldsymbol x_{\rm obs}-\lambda\hat{\boldsymbol p}$，所以它看到的是 $\Theta(\mu)=\cos(kx_{\rm obs}-k\lambda\mu)$。按 \eqref{5.66} 展开，第 $l$ 阶多极矩的大小 $\propto j_l(k\lambda)$。当 $k\lambda\ll1$（紧耦合）时 $j_0\to1$，而 $j_l\sim(k\lambda)^l/(2l+1)!!\to0$：例如 $k\lambda=0.1$ 时 $|\Theta_1|/|\Theta_0|\sim k\lambda/3\approx0.03$，四极矩更是 $\sim(k\lambda)^2/15\approx7\times10^{-4}$。散射越频繁，高阶矩被压得越低——这就是"光子流体"的定量含义。`}</Box>
    </Sec>);
}
