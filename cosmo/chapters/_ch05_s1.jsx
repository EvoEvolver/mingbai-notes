// §5.1 The collisionless Boltzmann equation for photons —— 式 (5.1)–(5.9)
import { Sec, Tx, Eq, FormulaMap, Box, Derivation, C } from "@kit";
import { FM_5_9 } from "./_ch05_fmaps.jsx";

const R = String.raw;

export function Sec51() {
  return (
    <Sec n="5.1" title="The collisionless Boltzmann equation for photons" zh="光子的无碰撞 Boltzmann 方程"
      gist={R`把光子分布写成"温度被扰动的玻色–爱因斯坦分布" \eqref{5.2}，对 $\Theta$ 一阶展开 \eqref{5.3}；零阶方程给出 $T\propto1/a$，一阶方程给出 $\Theta$ 的左边 \eqref{5.9}：自由流 + 引力。`}
      why={R`第 3 章已经推出扰动时空中光子 Boltzmann 方程的左边 \eqref{3.74}，但它是关于整个分布函数 $f$ 的；我们真正关心、也真正观测到的是温度扰动 $\Theta$，必须把方程改写成 $\Theta$ 的方程。`}
      gives={["5.1", "5.2", "5.3", "5.4", "5.6", "5.9"]}>
      <p className="muted">本节概念：<C id="theta" /> · <C id="free_stream" /> · <C id="grav_terms" /></p>
      <Tx>{R`**起点。**第 3 章 §3.3.3 已经替我们完成了最难的一步：在共形牛顿规范的扰动度规 \eqref{3.79} 中求解测地线方程，得到光子 Boltzmann 方程左边在线性阶的形式 \eqref{3.74}：`}</Tx>
      <Eq n="5.1" say={R`扰动宇宙中光子分布函数沿路径的全变化：时间变化 + 沿传播方向的空间变化 − 动量的变化率；后者由局域膨胀率 $H+\dot\Phi$ 与引力势梯度共同决定。`}>{R`\frac{df}{dt} = \frac{\partial f}{\partial t} + \frac{\hat p^i}{a}\frac{\partial f}{\partial x^i} - p\frac{\partial f}{\partial p}\left[H + \dot\Phi + \frac{\hat p^i}{a}\frac{\partial\Psi}{\partial x^i}\right].`}</Eq>
      <Tx>{R`方括号里正是光子动量的相对变化率 $-\frac1p\frac{dp}{dt}$：$H$ 是背景膨胀造成的红移，$\dot\Phi$ 是空间度规扰动随时间变化带来的"额外膨胀"，$\hat p^i\partial_i\Psi/a$ 是光子沿势梯度运动时的引力红移。

**一个看似奇怪、实则聪明的写法。**下一步要把 $f$ 围绕零阶的玻色–爱因斯坦分布展开。最直接的做法是写 $f=f^{(0)}+\delta f$，但这里换一种方式：保留玻色–爱因斯坦的**形状**，只让其中的**温度**依赖于位置和方向：`}</Tx>
      <Eq n="5.2" keyEq title="温度扰动的定义" say={R`光子仍按黑体分布，只是温度被扰动：在位置 $\boldsymbol x$、沿方向 $\hat{\boldsymbol p}$ 运动的光子，其温度是 $T(t)[1+\Theta]$。$\Theta$ 就是 $\delta T/T$。`}>{R`f(\boldsymbol x, p, \hat{\boldsymbol p}, t) = \left[\exp\left\{\frac{p}{T(t)[1+\Theta(\boldsymbol x,\hat{\boldsymbol p},t)]}\right\} - 1\right]^{-1}.`}</Eq>
      <Tx>{R`这里的零阶温度 $T$ **只是时间的函数**：光滑宇宙中光子均匀分布（$T$ 不依赖 $\boldsymbol x$）且各向同性（$T$ 不依赖传播方向 $\hat{\boldsymbol p}$）。扰动全部装进**分数温度扰动** $\Theta$（也可记作 $\delta T/T$）中：它依赖 $\boldsymbol x$——描述**非均匀性**；也依赖 $\hat{\boldsymbol p}$——描述**各向异性**。

回想 §1.5：我们最终在"CMB 天空"上观测到的就是温度扰动。也就是说，测到的是在固定位置 $\boldsymbol x_{\rm Earth}$、固定时刻 $t_0$，$\Theta$ 作为光子到达方向 $\hat{\boldsymbol p}$ 的函数：$\delta T/T(\hat{\boldsymbol p})=\Theta(\boldsymbol x_{\rm Earth},\hat{\boldsymbol p},t_0)$。`}</Tx>
      <Box kind="warning" title={R`一个需要被证明的假设：$\Theta$ 不依赖 $p$`}>{R`\eqref{5.2} 中 $\Theta$ **不依赖动量大小** $p$——即扰动后每个方向上仍是一条完整的黑体谱，只是温度不同。这不是随便假设的：它在我们工作的阶上成立，因为主导的相互作用 Compton 散射几乎不改变光子动量的大小（\secref{5.2} 中的 \eqref{5.14} 将证明 $|p'-p|/p\ll1$）。

术语说明：严格说，光子与电子的弹性散射叫 **Thomson 散射**；本书沿用更一般的"Compton"一词。非弹性散射要到 §11.3 才会遇到。`}</Box>
      <Tx>{R`**线性化。**$\Theta$ 很小——与推导 \eqref{5.1} 时假设 $\Phi$、$\Psi$ 很小一致——所以把 \eqref{5.2} 展开到 $\Theta$ 的一阶。注意 $T(1+\Theta)=T+T\Theta$，相当于温度有一个小增量 $T\Theta$，于是一阶项就是 $f$ 对 $T$ 的导数乘以 $T\Theta$：`}</Tx>
      <Eq n="5.3" keyEq title="分布函数的一阶展开" say={R`扰动后的分布 = 零阶黑体分布 + 一个修正项；修正项正比于温度扰动 $\Theta$，比例系数是 $-p\,\partial f^{(0)}/\partial p$（黑体谱对温度的灵敏度）。`}>{R`\begin{aligned}f(\boldsymbol x,\boldsymbol p,t) &\simeq \frac{1}{e^{p/T(t)}-1} + \left(\frac{\partial}{\partial T}\left[\exp\left\{\frac{p}{T(t)}\right\}-1\right]^{-1}\right)T(t)\Theta(\boldsymbol x,\hat{\boldsymbol p},t)\\ &= f^{(0)}(p,t) - p\frac{\partial f^{(0)}(p,t)}{\partial p}\Theta(\boldsymbol x,\hat{\boldsymbol p},t).\end{aligned}`}</Eq>
      <Tx>{R`最后一行中我们把零阶分布函数认作化学势为零的玻色–爱因斯坦分布`}</Tx>
      <Eq n="5.4" say="零阶光子分布：化学势为零的玻色–爱因斯坦（黑体）分布，只依赖 p/T 这个组合。">{R`f^{(0)} \equiv \left[\exp\left\{\frac{p}{T}\right\} - 1\right]^{-1},`}</Eq>
      <Tx>{R`并用到了它的一个性质：因为 $f^{(0)}$ 只依赖组合 $p/T$，所以对 $T$ 求导与对 $p$ 求导只差一个因子，$T\,\partial f^{(0)}/\partial T=-p\,\partial f^{(0)}/\partial p$。这个恒等式在本节会反复使用。

**零阶方程：平衡由"碰撞项为零"决定。**现在可以把 Boltzmann 方程 \eqref{5.1} 拆成关于 $f^{(0)}$ 的零阶方程和关于 $\Theta$ 的一阶方程。零阶部分正是第 3 章的 \eqref{3.39}（$\hat p^i\partial f/\partial x^i$ 项在背景中为零）：`}</Tx>
      <Eq n="5.5" say="零阶（均匀）光子分布的演化：时间变化恰好被宇宙膨胀造成的动量红移抵消，零阶碰撞项为零。">{R`\left.\frac{df}{dt}\right|_{\text{zero order}} = \frac{\partial f^{(0)}}{\partial t} - Hp\frac{\partial f^{(0)}}{\partial p} = 0.`}</Eq>
      <Tx>{R`我们让右边（\eqref{3.39} 的碰撞项）为零，也就是断言：**碰撞项正比于 $\Theta$ 等扰动量**，零阶时为零。背后有一个深刻的原因——零阶分布函数恰恰是由"碰撞项为零"这一要求决定的。换个更熟悉的说法：任何碰撞项都同时包含正反应与逆反应的速率；当分布函数取平衡值时，两者恰好抵消。如果某成分偏离平衡，碰撞就会把它推回平衡。这正是我们一开始就预期光子取玻色–爱因斯坦分布的原因。

回到 \eqref{5.5}，利用 $f^{(0)}$ 只依赖 $p/T$，时间导数可改写为`}</Tx>
      <Eq say="零阶分布的时间变化全部来自温度的变化，并可借助恒等式换成动量导数。">{R`\frac{\partial f^{(0)}}{\partial t} = \frac{\partial f^{(0)}}{\partial T}\frac{dT}{dt} = -\frac{dT/dt}{T}\,p\frac{\partial f^{(0)}}{\partial p},`}</Eq>
      <Tx>{R`于是零阶方程变为`}</Tx>
      <Eq n="5.6" say={R`零阶方程只有一种解法：方括号为零，即温度的相对下降率等于膨胀率——$T\propto1/a$。`}>{R`\left[-\frac{dT/dt}{T} - \frac{\dot a}{a}\right]\frac{\partial f^{(0)}}{\partial p} = 0.`}</Eq>
      <Tx>{R`因此 $dT/T=-da/a$，即 $T\propto1/a$——我们已在 §2.4.1 熟悉的关系，这里第三次（继测地线方程和熵守恒之后）由 Boltzmann 方程得到。`}</Tx>
      <Tx>{R`**一阶方程。**现在提取温度偏离零阶值的方程，即 $\Theta$ 的方程。把展开式 \eqref{5.3} 代入 \eqref{5.1} 中每一个出现 $f$ 的地方，只保留一阶项（$\Theta$ 与 $\Phi$、$\Psi$ 的乘积是二阶，丢掉；乘 $\Phi$、$\Psi$ 的 $f$ 只需取 $f^{(0)}$）：`}</Tx>
      <Eq n="5.7" say="一阶部分：分别来自扰动项的时间变化、空间变化、背景红移作用在扰动项上，以及度规扰动作用在零阶分布上。">{R`\begin{aligned}\left.\frac{df}{dt}\right|_{\text{first order}} =& -p\frac{\partial}{\partial t}\left[\frac{\partial f^{(0)}}{\partial p}\Theta\right] - p\frac{\hat p^i}{a}\frac{\partial\Theta}{\partial x^i}\frac{\partial f^{(0)}}{\partial p} + H\Theta p\frac{\partial}{\partial p}\left[p\frac{\partial f^{(0)}}{\partial p}\right]\\ &- p\frac{\partial f^{(0)}}{\partial p}\left[\dot\Phi + \frac{\hat p^i}{a}\frac{\partial\Psi}{\partial x^i}\right].\end{aligned}`}</Eq>
      <Tx>{R`第三项来自 $-Hp\,\partial_p$ 作用在一阶项 $-p\,\partial_pf^{(0)}\Theta$ 上（$\Theta$ 与 $p$ 无关，可以提出）。再看右边第一项：$f^{(0)}$ 的时间导数可以改写成温度导数，`}</Tx>
      <Eq n="5.8" say={R`扰动项的时间导数拆成两部分：$\Theta$ 自身的变化，以及背景温度下降导致的零阶谱形变化；后者恰好与背景红移项抵消。`}>{R`\begin{aligned}-p\frac{\partial}{\partial t}\left[\frac{\partial f^{(0)}}{\partial p}\Theta\right] &= -p\frac{\partial f^{(0)}}{\partial p}\frac{\partial\Theta}{\partial t} - p\Theta\frac{dT}{dt}\frac{\partial^2f^{(0)}}{\partial T\,\partial p}\\ &= -p\frac{\partial f^{(0)}}{\partial p}\frac{\partial\Theta}{\partial t} + p\Theta\frac{dT/dt}{T}\frac{\partial}{\partial p}\left[p\frac{\partial f^{(0)}}{\partial p}\right].\end{aligned}`}</Eq>
      <Derivation title={R`\eqref{5.8} 第二行与"抵消"的细节`} collapsed steps={[
        { tex: R`\frac{\partial^2f^{(0)}}{\partial T\,\partial p}=\frac{\partial}{\partial p}\frac{\partial f^{(0)}}{\partial T}=\frac{\partial}{\partial p}\left[-\frac pT\frac{\partial f^{(0)}}{\partial p}\right]=-\frac1T\frac{\partial}{\partial p}\left[p\frac{\partial f^{(0)}}{\partial p}\right]`, why: R`交换求导次序，再用 $\partial f^{(0)}/\partial T=-(p/T)\partial f^{(0)}/\partial p$。` },
        { tex: R`-p\Theta\frac{dT}{dt}\frac{\partial^2f^{(0)}}{\partial T\partial p}=+p\Theta\frac{dT/dt}{T}\frac{\partial}{\partial p}\left[p\frac{\partial f^{(0)}}{\partial p}\right]`, why: R`代入上一行即得 \eqref{5.8} 第二行。` },
        { tex: R`p\Theta\frac{dT/dt}{T}\frac{\partial}{\partial p}\left[p\frac{\partial f^{(0)}}{\partial p}\right]+H\Theta p\frac{\partial}{\partial p}\left[p\frac{\partial f^{(0)}}{\partial p}\right]=p\Theta\left[\frac{dT/dt}{T}+H\right]\frac{\partial}{\partial p}\left[p\frac{\partial f^{(0)}}{\partial p}\right]=0`, why: R`与 \eqref{5.7} 的第三项相加：由零阶结果 \eqref{5.6}，$\frac{dT/dt}{T}=-H$，两者恰好相消。物理上：背景红移让整条黑体谱一起平移，不改变"温度扰动"。` },
      ]} result={R`\eqref{5.7} 中只剩 $\partial\Theta/\partial t$、自由流项和两个引力项，即 \eqref{5.9}。`} />
      <Tx>{R`第二行的第二项与 \eqref{5.7} 右边的第三项抵消。于是我们终于写出了 $\Theta$ 的 Boltzmann 方程的**左边**：`}</Tx>
      <FormulaMap n="5.9" keyEq title={R`$\Theta$ 方程的左边`} say={R`温度扰动沿光线的变化：前两项是光子带着温度沿直线自由流动，后两项是度规扰动造成的红移——局域膨胀（$\dot\Phi$）与引力势梯度（$\Psi$）。`} tree={FM_5_9} start="adv" />
      <Box kind="physics" title="读懂 (5.9) 的四项">{R`**前两项**是沿（均匀宇宙中的）光线——零测地线——的全导数 $d\Theta/dt$：它们描述无碰撞时分布函数如何演化，称为**自由流**（free streaming）。若只有这两项，$\Theta$ 沿光线守恒：光子带着出发处的温度一路传播。

**后两项**是扰动的引力效应。$\dot\Phi$：空间度规扰动的变化就像局域多了一点膨胀，使光子额外红移；$\hat p^i\partial_i\Psi/a$：光子沿 $\Psi$ 的梯度运动，爬出势阱损失能量、落入势阱获得能量。

注意：凡是 $x$ 出现的地方都乘着 $1/a$——这是必然的，因为**物理**距离是 $a x$。`}</Box>
      <Tx>{R`**还缺右边。**这个方程还不完整：在扰动的一阶上，碰撞项不为零。正是这个碰撞项决定了光子在复合之前如何被电子"搅匀"，下一节就来计算它。`}</Tx>
    </Sec>);
}
