// §7.4 Scalar perturbations —— 式 (7.43)–(7.79)，图 7.6（原书 pp. 173–183）
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { CurvatureFreezePlot } from "./_ch07_plots.jsx";

const R = String.raw;

export function Sec74() {
  return (
    <Sec n="7.4" title="Scalar perturbations" zh="标量扰动"
      gist={R`单场暴胀产生**绝热**扰动，只需算一个量。先在"不计引力"的背景里算出 $P_{\delta\phi}=H^2/2k^3$；再借助视界外守恒的**曲率扰动** $\mathcal R$ 把 $\delta\phi$ 转成暴胀后的引力势：$P_{\mathcal R}=2\pi GH^2/(\epsilon_{\rm sr}k^3)$，$P_\Phi=\frac49P_{\mathcal R}$。`}
      why={R`第 8–10 章的一切计算都要求给出原初引力势 $\Psi$（或 $\Phi$）的功率谱。暴胀直接产生的是暴胀子涨落 $\delta\phi$，必须找到一座可靠的"桥"把它带过暴胀结束与再加热这段我们并不了解的历史。`}
      gives={["7.43", "7.54", "7.55", "7.57", "7.59", "7.62", "7.71", "7.75", "7.78", "7.79"]}>
      <p className="muted">本节概念：<C id="adiabatic" /> · <C id="curv_R" /> · <C id="freeze" /> · <C id="curv_R" /></p>
      <Tx>{R`**目标。**本章最主要的目标之一，就是求出暴胀留下的**标量扰动**谱。原则上，我们得为每一种成分（光子、中微子、暗物质、重子）分别给出初始的密度扰动与速度扰动——这听起来要算很多东西。幸运的是，单场暴胀的一个基本预言是它产生**绝热扰动**（adiabatic perturbations）：宇宙中不同区域的过密度不同，但在同一区域里，**各成分的相对密度扰动都相同**：`}</Tx>
      <Eq n="7.43" keyEq title="绝热条件" say={R`绝热扰动：任何一处，所有成分的密度都按同一比例偏离平均值——就像整个区域在时间上"提前"或"推后"了一点，而成分配比不变。`}>{R`\frac{\delta\rho_s}{\rho_s}=\frac{\delta\rho}{\rho},`}</Eq>
      <Tx>{R`速度也满足类似的关系。根本原因在于：暴胀由**单个**场驱动，这个场的取值决定了暴胀何时结束。因此暴胀期间任何一块区域都完全由场值 $\phi(\boldsymbol x,t)$ 刻画——各区域之间唯一的差别是"走到哪一步了"，而不是"由什么组成"。CMB 已经以很高精度证实了扰动的绝热性：与之相对的、各成分初始扰动互不相同的**等曲率扰动**（isocurvature perturbations），最多只能占绝热扰动的百分之几。

**绝热性大大简化了任务。**既然各成分的相对扰动相同，只要求出总的 $\delta\rho$ 就够了；借助 Einstein 方程，等价地也可以用引力势 $\Psi$ 来给出初始条件——一个场就够（\secref{7.5} 会推出所有成分的密度扰动如何由 $\Psi$ 决定；在我们关心的区间里 $\Phi$ 就等于 $-\Psi$）。

麻烦在于：$\Psi$ 的计算比前面的张量情形复杂。主要的复杂性来自**标量场扰动 $\delta\phi$ 与 $\Psi$ 相互耦合**——张量扰动 $h$ 不与 $\delta\phi$ 在线性阶耦合，而标量扰动会。于是问题最终归结为：**暴胀子的扰动 $\delta\phi$ 是如何转化为 $\Psi$ 的？**`}</Tx>
      <Box kind="key" title="本节路线图：一个起点，两条殊途同归的路">{R`**第一步（\secref{7.4.1}）：先装作没有耦合。**在不受扰动的膨胀背景里计算 $\delta\phi$ 的谱，忽略 $\Psi$。这与上一节的张量计算几乎一模一样，所以很简单。

接下来要回答两个问题：凭什么能忽略 $\Psi$？扰动又是怎样从 $\phi$ 转移到 $\Psi$ 的？后面两小节**从两个不同角度**回答同一个问题：

- **路线 A（\secref{7.4.2}，"蛮力"但所需背景少）：**论证在模式离开视界之前（在那里会说清楚是什么意义下的），$\Psi$ 确实小到可以忽略；一旦远在视界之外，这就不成立了，但我们会找到 $\Psi$ 与 $\delta\phi$ 的一个**线性组合在视界外守恒**——曲率扰动 $\mathcal R$。用它就能把视界穿出时 $\delta\phi$ 的谱换成暴胀后 $\Psi$ 的谱。
- **路线 B（\secref{7.4.3}，更优雅直接）：**换一个**规范**（gauge）——让度规的空间部分不受扰动的**空间平直切片**（spatially flat slicing）。在这个规范里 \secref{7.4.1} 的计算是**精确**的；剩下的只是把结果换回共形牛顿规范。办法是借助 \secref{6.2} 讨论过的**规范不变量**：先找出一个在空间平直切片中正比于 $\delta\phi$ 的规范不变量，再在共形牛顿规范中求它，于是就把牛顿规范中的 $\Psi$ 与平直切片中的 $\delta\phi$ 联系起来。

两条路是解决同一个耦合问题的**替代方案**。如果你熟悉规范变换（读完 \secref{6.2} 及相关习题即可），\secref{7.4.3} 更优雅；\secref{7.4.2} 的蛮力做法给出相同答案，而且需要的形式体系与背景知识更少。`}</Box>

      <Sub n="7.4.1" title="Scalar field perturbations around an unperturbed background" zh="无扰动背景上的标量场扰动">
        <Tx>{R`**设定。**把标量场分解为零阶均匀部分与一阶扰动：`}</Tx>
        <Eq n="7.44" say={R`暴胀子 = 处处相同、只随时间演化的背景场 $\bar\phi(t)$ + 随位置变化的小涨落 $\delta\phi$。`}>{R`\phi(\boldsymbol x,t)=\bar\phi(t)+\delta\phi(\boldsymbol x,t),`}</Eq>
        <Tx>{R`这里起用上横线标记背景场。我们要找 $\delta\phi$ 在一个**光滑膨胀宇宙**中满足的方程，即度规取 $g_{00}=-1$、$g_{ij}=\delta_{ij}a^2(\eta)$——用暴胀研究者的行话说，就是**"忽略引力"**（ignoring gravity）：保留背景膨胀，但不管度规扰动。

**出发点：能动张量守恒。**再次利用 \eqref{7.11} $\nabla_\mu T^\mu{}_\nu=0$，取 $\nu=0$ 分量，只是这次要展开到一阶。由于度规未受扰动，一阶量只存在于能动张量中；所有 Christoffel 符号要么是零阶的（$\Gamma^0{}_{ij}=\delta_{ij}a^2H$ 与 $\Gamma^i{}_{0j}=\Gamma^i{}_{j0}=\delta_{ij}H$），要么为零（其余分量），见 \eqref{2.24}–\eqref{2.25}。把能动张量的扰动部分记作 $\delta T^\mu{}_\nu$，守恒方程的 $\nu=0$ 分量的一阶部分为（Fourier 空间，$\partial_i\to ik_i$）`}</Tx>
        <Eq n="7.45" say={R`扰动能量守恒（无度规扰动）：能量密度扰动的变化，由能流的散度、膨胀稀释（$3H$）和压强做功（$-H\delta T^i{}_i$）决定。`}>{R`0=\frac{\partial}{\partial t}\delta T^0{}_0+ik_i\delta T^i{}_0+3H\delta T^0{}_0-H\delta T^i{}_i.`}</Eq>
        <Derivation title={R`从 \eqref{7.11} 到 \eqref{7.45}`} collapsed steps={[
          { tex: R`\nabla_\mu T^\mu{}_0=\frac{\partial T^\mu{}_0}{\partial x^\mu}+\Gamma^\mu{}_{\alpha\mu}T^\alpha{}_0-\Gamma^\alpha{}_{0\mu}T^\mu{}_\alpha=0`, why: R`\eqref{7.11} 取 $\nu=0$。` },
          { tex: R`\Gamma^\mu{}_{0\mu}=\Gamma^i{}_{0i}=3H,\qquad \Gamma^\mu{}_{i\mu}=0,\qquad \Gamma^\alpha{}_{0\mu}T^\mu{}_\alpha=\Gamma^i{}_{0j}T^j{}_i=H\,T^i{}_i`, why: R`背景 FLRW 中只有 $\Gamma^0{}_{ij}$ 与 $\Gamma^i{}_{0j}$ 非零；$\Gamma^0{}_{00}=\Gamma^0{}_{0i}=0$。这里 $T^i{}_i$ 对 $i$ 求和。` },
          { tex: R`\frac{\partial T^0{}_0}{\partial t}+\frac{\partial T^i{}_0}{\partial x^i}+3H\,T^0{}_0-H\,T^i{}_i=0`, why: R`代回；对零阶部分这就是 $-\dot\rho-3H\rho-3HP=0$，即连续性方程 \eqref{7.12}。` },
          { tex: R`\frac{\partial}{\partial t}\delta T^0{}_0+ik_i\delta T^i{}_0+3H\delta T^0{}_0-H\delta T^i{}_i=0`, why: R`取一阶部分并作 Fourier 变换（$\partial/\partial x^i\to ik_i$）；Christoffel 符号无扰动，所以它们只乘 $\delta T$。` },
        ]} />
        <Tx>{R`下一步就是用标量场扰动 $\delta\phi$ 表示能动张量的各个扰动分量。

**时–空分量 $\delta T^i{}_0$。**由于度规的时–空分量为零，\eqref{7.6} 中第二组项（带 $\delta^\alpha{}_\beta$ 因子的那组）对 $\alpha\neq\beta$ 没有贡献，于是`}</Tx>
        <Eq n="7.46" say={R`能流（动量密度）只来自"空间梯度 $\times$ 时间导数"这一项：场在空间上有起伏、同时又在随时间变化，才会有能量的流动。`}>{R`T^i{}_0=g^{i\nu}\phi_{,\nu}\phi_{,0}`}</Eq>
        <Tx>{R`这里又回到用 $_{,\nu}$ 表示对 $x^\nu$ 求偏导。因为 $g^{i\nu}=a^{-2}\delta_{i\nu}$，指标 $\nu$ 只能等于 $i$。零阶场 $\bar\phi$ 是均匀的，$\bar\phi_{,i}=0$，所以时–空分量**没有零阶部分**。要提取一阶部分，令 $\phi_{,i}\to\delta\phi_{,i}\to ik_i\delta\phi$，其余因子都取零阶值：`}</Tx>
        <Eq n="7.47" say={R`暴胀子的动量密度正比于背景"速度" $\bar\phi'$ 乘以涨落的梯度 $ik_i\delta\phi$。`}>{R`\delta T^i{}_0=\frac{ik_i}{a^3}\bar\phi'\delta\phi.`}</Eq>
        <Tx>{R`分母多出一个 $a$（$a^{-2}$ 来自 $g^{ii}$），是因为 $\bar\phi_{,0}=\bar\phi'/a$——别忘了坐标导数是对宇宙时 $t$ 求的，而撇号是对 $\eta$ 求的。

**时–时分量。**同样不难：`}</Tx>
        <Eq n="7.48" say={R`$T^0{}_0$（$=-$能量密度）的一般表达式：动能项、梯度能项与势能项。`}>{R`T^0{}_0=g^{00}(\phi_{,0})^2-\frac12g^{\alpha\beta}\phi_{,\alpha}\phi_{,\beta}-V.`}</Eq>
        <Tx>{R`代入 $\phi(\boldsymbol x,t)=\bar\phi(t)+\delta\phi(\boldsymbol x,t)$ 得`}</Tx>
        <Eq n="7.49" say={R`能量密度 $=$ 动能 $+$ 梯度能 $+$ 势能（$T^0{}_0$ 取负号），其中场已拆成背景加涨落。`}>{R`T^0{}_0=-\frac12\left(\bar\phi_{,0}+\delta\phi_{,0}\right)^2-\frac1{2a^2}\delta\phi_{,i}\delta\phi_{,i}-V(\bar\phi+\delta\phi).`}</Eq>
        <Tx>{R`空间导数总是**成对**出现，而一对一阶量 $\delta\phi_{,i}$ 给出的是二阶项，可以扔掉。势可以展开为零阶项 $V(\bar\phi)$ 加一阶修正 $V_{,\phi}\delta\phi$（$V_{,\phi}$ 总是在 $\bar\phi$ 处取值）。于是能动张量的一阶修正为`}</Tx>
        <Eq n="7.50" say={R`能量密度扰动 $=$ 动能的变化（背景速度 $\times$ 速度涨落）$+$ 势能的变化（势的斜率 $\times$ 场涨落），整体取负号。`}>{R`\begin{aligned}\delta T^0{}_0&=-\bar\phi_{,0}\delta\phi_{,0}-V_{,\phi}\delta\phi\\&=-\frac{\bar\phi'\delta\phi'}{a^2}-V_{,\phi}\delta\phi.\end{aligned}`}</Eq>
        <Tx>{R`同理（原书留给读者自证），空间–空间分量为`}</Tx>
        <Eq n="7.51" say={R`压强扰动是各向同性的（正比于 $\delta_{ij}$）：动能变化减去势能变化——与 $P=\frac12\dot\phi^2-V$ 的一阶变分一致。`}>{R`\delta T^i{}_j=\delta_{ij}\left(\frac{\bar\phi'\delta\phi'}{a^2}-V_{,\phi}\delta\phi\right).`}</Eq>
        <Derivation title={R`补全：\eqref{7.51} 的推导`} collapsed steps={[
          { tex: R`T^i{}_j=g^{i\nu}\phi_{,\nu}\phi_{,j}-\delta^i{}_j\left[\frac12g^{\mu\nu}\phi_{,\mu}\phi_{,\nu}+V(\phi)\right]`, why: R`\eqref{7.6} 取 $\alpha=i$、$\beta=j$。` },
          { tex: R`g^{i\nu}\phi_{,\nu}\phi_{,j}=a^{-2}\delta\phi_{,i}\delta\phi_{,j}=\mathcal O(\delta\phi^2)`, why: R`第一项需要两个空间导数，而 $\bar\phi_{,i}=0$，故为二阶，扔掉。` },
          { tex: R`\frac12g^{\mu\nu}\phi_{,\mu}\phi_{,\nu}=-\frac12(\phi_{,0})^2+\mathcal O(\delta\phi^2)`, why: R`$g^{00}=-1$；空间梯度项又是二阶。` },
          { tex: R`T^i{}_j=\delta_{ij}\left[\frac12(\bar\phi_{,0}+\delta\phi_{,0})^2-V(\bar\phi)-V_{,\phi}\delta\phi\right]`, why: R`零阶部分正是 $\delta_{ij}P$，与 \eqref{7.9} 一致。` },
          { tex: R`\delta T^i{}_j=\delta_{ij}\left(\bar\phi_{,0}\delta\phi_{,0}-V_{,\phi}\delta\phi\right)=\delta_{ij}\left(\frac{\bar\phi'\delta\phi'}{a^2}-V_{,\phi}\delta\phi\right)`, why: R`取一阶部分，用 $\bar\phi_{,0}=\bar\phi'/a$、$\delta\phi_{,0}=\delta\phi'/a$。` },
        ]} />
        <Tx>{R`**代回守恒方程。**把 \eqref{7.47}、\eqref{7.50}、\eqref{7.51} 代入 \eqref{7.45}，并用 $\partial/\partial t=a^{-1}\partial/\partial\eta$：`}</Tx>
        <Eq n="7.52" say={R`用 $\delta\phi$ 写出的扰动能量守恒：第一项是能量密度扰动的变化与稀释，第二项是能流散度，第三项是压强扰动的做功。`}>{R`\left(\frac1a\frac{\partial}{\partial\eta}+3H\right)\left(\frac{-\bar\phi'\delta\phi'}{a^2}-V_{,\phi}\delta\phi\right)-\frac{k^2}{a^3}\bar\phi'\delta\phi-3H\left(\frac{\bar\phi'\delta\phi'}{a^2}-V_{,\phi}\delta\phi\right)=0.`}</Eq>
        <Tx>{R`完成时间求导（唯一需要小心的是 $\partial V_{,\phi}/\partial\eta=V_{,\phi\phi}\bar\phi'$——$V_{,\phi}$ 在随时间变化的 $\bar\phi$ 处取值），两边乘以 $a^3$，整理得`}</Tx>
        <Eq n="7.53" say={R`$\delta\phi$ 的完整线性方程：二阶导、一阶导（摩擦）与 $\delta\phi$ 本身（含有效质量 $V_{,\phi\phi}$ 与梯度 $k^2$）三类项。`}>{R`-\bar\phi'\delta\phi''+\delta\phi'\left(-\bar\phi''-4aH\bar\phi'-a^2V_{,\phi}\right)+\delta\phi\left(-a^2V_{,\phi\phi}\bar\phi'-k^2\bar\phi'\right)=0.`}</Eq>
        <Derivation title={R`补全：\eqref{7.52} $\to$ \eqref{7.53} 的代数`} collapsed steps={[
          { tex: R`\frac1a\frac{\partial}{\partial\eta}\left(-\frac{\bar\phi'\delta\phi'}{a^2}\right)=-\frac{\bar\phi''\delta\phi'+\bar\phi'\delta\phi''}{a^3}+\frac{2a'}{a^4}\bar\phi'\delta\phi'=-\frac{\bar\phi''\delta\phi'+\bar\phi'\delta\phi''}{a^3}+\frac{2H}{a^2}\bar\phi'\delta\phi'`, why: R`对 $a^{-2}$ 求导给出 $+2a'/a^3$；再用 $a'=a^2H$。` },
          { tex: R`\frac1a\frac{\partial}{\partial\eta}\left(-V_{,\phi}\delta\phi\right)=-\frac1a\left(V_{,\phi\phi}\bar\phi'\delta\phi+V_{,\phi}\delta\phi'\right)`, why: R`链式法则：$\partial V_{,\phi}/\partial\eta=V_{,\phi\phi}\bar\phi'$。` },
          { tex: R`3H\left(-\frac{\bar\phi'\delta\phi'}{a^2}-V_{,\phi}\delta\phi\right)-3H\left(\frac{\bar\phi'\delta\phi'}{a^2}-V_{,\phi}\delta\phi\right)=-\frac{6H}{a^2}\bar\phi'\delta\phi'`, why: R`两个 $3H$ 项中 $V_{,\phi}\delta\phi$ 正好抵消，$\bar\phi'\delta\phi'$ 项相加。` },
          { tex: R`-\frac{\bar\phi'\delta\phi''}{a^3}+\delta\phi'\left(-\frac{\bar\phi''}{a^3}-\frac{4H\bar\phi'}{a^2}-\frac{V_{,\phi}}{a}\right)+\delta\phi\left(-\frac{V_{,\phi\phi}\bar\phi'}{a}-\frac{k^2\bar\phi'}{a^3}\right)=0`, why: R`合并：$\delta\phi'$ 的系数中 $2H-6H=-4H$；再加上能流项 $-k^2\bar\phi'\delta\phi/a^3$。` },
          { tex: R`-\bar\phi'\delta\phi''+\delta\phi'\left(-\bar\phi''-4aH\bar\phi'-a^2V_{,\phi}\right)+\delta\phi\left(-a^2V_{,\phi\phi}\bar\phi'-k^2\bar\phi'\right)=0`, why: R`乘以 $a^3$，即 \eqref{7.53}。` },
        ]} />
        <Tx>{R`**两处化简。**(1) $V_{,\phi\phi}$ 项通常很小——它正比于慢滚参数 $\epsilon_{\rm sr}$ 与 $\delta_{\rm sr}$（\exref{7.8}），可以忽略。(2) 第一组括号（$\delta\phi'$ 的系数）可用零阶方程 \eqref{7.15} $\bar\phi''+2aH\bar\phi'+a^2V_{,\phi}=0$ 化简：$-\bar\phi''-a^2V_{,\phi}=2aH\bar\phi'$，所以系数等于 $2aH\bar\phi'-4aH\bar\phi'=-2aH\bar\phi'$。两边除以 $-\bar\phi'$，剩下`}</Tx>
        <Eq n="7.54" say={R`忽略引力与暴胀子质量后，$\delta\phi$ 就是膨胀宇宙中的无质量自由场：受哈勃摩擦 $2aH\delta\phi'$ 阻尼、以频率 $k$ 振荡——与引力波方程完全相同。`}>{R`\delta\phi''+2aH\delta\phi'+k^2\delta\phi=0.`}</Eq>
        <Box kind="note" title={R`为什么 $V_{,\phi\phi}$ 可以忽略`}>{R`由 \exref{7.8} 的结果（最低阶）$\epsilon_{\rm sr}=\frac1{16\pi G}\left(\frac{V_{,\phi}}{V}\right)^2$，$\delta_{\rm sr}$ 则是 $\epsilon_{\rm sr}$ 与 $V_{,\phi\phi}/(8\pi GV)$ 之差，而 $8\pi GV\simeq3H^2$。所以 $V_{,\phi\phi}/H^2$ 是慢滚参数量级的小量：与 $k^2$ 项（视界内）或 $a''/a\simeq2/\eta^2$（视界穿出时）相比，$a^2V_{,\phi\phi}\sim\epsilon_{\rm sr}a^2H^2$ 都小一个慢滚参数的因子。物理上，这等于说暴胀子的质量远小于 $H$——**轻场**才会在视界穿出时被"冻结"出可观的涨落（对比 \exref{7.6}：$m\gg H$ 的重场只会振荡衰减）。`}</Box>
        <Tx>{R`**直接抄答案。**\eqref{7.54} 与张量扰动方程 \eqref{7.27} 一模一样：忽略 $V_{,\phi\phi}$ 后，我们实际上令暴胀子的质量为零，所以 $\delta\phi$ 与无质量的引力子一样，服从膨胀宇宙中无质量场的方程。因此可以直接照搬 \secref{7.3.2} 的结果，立即写出 $\delta\phi$ 涨落的功率谱：`}</Tx>
        <Eq n="7.55" keyEq title={R`暴胀子涨落谱`} say={R`视界外暴胀子涨落的功率谱只由穿出视界时的哈勃率决定：每个 e 倍膨胀、每个对数 $k$ 间隔内，场获得约 $H/2\pi$ 的随机"踢动"。`}>{R`P_{\delta\phi}=\frac{H^2}{2k^3}.`}</Eq>
        <Tx>{R`与 \eqref{7.42} 比较：两者只差一个因子 $16\pi G$。回忆在张量情形中，我们（带一点手势地，见 \secref{7.3.2}）引入了这个因子，把无量纲的 $h$ 变成具有质量量纲的场 $\mathfrak h=ah/\sqrt{16\pi G}$。$\delta\phi$ 本来就是具有正确量纲的标量场，所以只需把这个因子去掉。和 \eqref{7.42} 一样，$H$ 应取在该模式离开视界（$k|\eta|=1$，即 $aH=k$）时的值。`}</Tx>
        <Derivation title={R`\eqref{7.55} 的来历（照搬 \secref{7.3.2}）`} collapsed steps={[
          { tex: R`v\equiv a\,\delta\phi\quad\Rightarrow\quad v''+\left(k^2-\frac{a''}{a}\right)v=0`, why: R`与 $\mathfrak h=ah/\sqrt{16\pi G}$ 完全相同的代换消去了摩擦项；这里不需要 $\sqrt{16\pi G}$，因为 $\delta\phi$ 已经是质量量纲的场。` },
          { tex: R`v=\frac{e^{-ik\eta}}{\sqrt{2k}}\left(1-\frac{i}{k\eta}\right)\ \xrightarrow{\,k|\eta|\ll1\,}\ |v|^2\to\frac{1}{2k^3\eta^2}`, why: R`de Sitter 中 $a''/a\simeq2/\eta^2$，模函数为 \eqref{7.40}，初值由视界深处的平直时空真空确定。` },
          { tex: R`P_{\delta\phi}=\frac{|v|^2}{a^2}=\frac{1}{2k^3a^2\eta^2}=\frac{H^2}{2k^3}`, why: R`用 \eqref{7.16} $\eta\simeq-1/(aH)$。与 $P_h=16\pi G|v|^2/a^2$ 相比恰好少了 $16\pi G$。` },
        ]} />
        <Box kind="physics" title={R`"每个 e 倍一份 $H/2\pi$"`}>{R`把 \eqref{7.55} 换成无量纲谱：$\Delta^2_{\delta\phi}=\frac{k^3}{2\pi^2}P_{\delta\phi}=\left(\frac{H}{2\pi}\right)^2$。这就是暴胀文献中常说的：在 de Sitter 背景中，任何轻标量场的每个模式在穿出视界时都带着幅度约 $H/2\pi$ 的量子涨落被"冻结"下来，此后保持不变。它只依赖 $H$，与势的形状无关——这一点与张量谱 \eqref{7.42} 完全相同。势的形状会在下一步把 $\delta\phi$ 转成 $\Psi$ 时登场。`}</Box>
        <Tx>{R`**一个附带的收获：没有各向异性应力。**继续之前请注意，空间部分的能动张量 \eqref{7.51} 是对角的，即正比于 $\delta^i{}_j$。由第 6 章（\eqref{6.48}）可知，这意味着**没有各向异性应力**，Einstein 方程给出 $\Phi=-\Psi$。这让日子好过些：只需处理一个引力势。我们选 $\Psi$。`}</Tx>
      </Sub>

      <Sub n="7.4.2" title="Super-horizon perturbations" zh="超视界扰动">
        <Tx>{R`**问题出在哪里。**到目前为止我们忽略了度规扰动。下面很快会看到，当扰动波长远小于视界时，这一近似成立；但同时也会发现，**到暴胀结束时，度规扰动已经变得重要**。所以，暴胀产生的扰动虽然一开始"全是 $\delta\phi$"，最终却变成 $\Psi$ 与 $\delta\phi$ 的线性组合——更一般地，是 $\Psi$ 与能动张量扰动的线性组合。

**窍门**是找到**在视界外守恒**的那个线性组合。它的值由视界穿出时的 $\delta\phi$ 决定（参见 \eqref{7.42} 之后的讨论：$H$ 取在 $k|\eta|=1$ 时）；暴胀结束后，又可以单用 $\Psi$ 来计算它。最后得到的方程形如 $\Psi\propto\delta\phi$：左边是暴胀后的度规扰动，右边是视界穿出时的标量场扰动。由此就能把我们想要的 $P_\Psi$ 与 \eqref{7.55} 的 $P_{\delta\phi}$ 联系起来。

**第一步：把能量守恒推广到有度规扰动的情形。**原书说"不难证明"，\eqref{7.45} 推广为`}</Tx>
        <Eq n="7.56" say={R`含度规扰动的扰动能量守恒：与 \eqref{7.45} 相比只多出最后一项——引力势随时间变化改变了局域膨胀率，从而改变能量密度。`}>{R`\frac{\partial}{\partial t}\delta T^0{}_0+ik_i\delta T^i{}_0+3H\delta T^0{}_0-H\delta T^i{}_i+3(\rho+\mathcal P)\dot\Psi=0`}</Eq>
        <Tx>{R`其中 $\mathcal P$ 与 $\rho$ 是零阶压强与能量密度（原书在本节把压强写成花体 $\mathcal P$，它就是 \eqref{7.9} 中的 $P$），并已把 $\dot\Phi$ 换成了 $-\dot\Psi$。`}</Tx>
        <Derivation title={R`补全：\eqref{7.45} $\to$ \eqref{7.56}（共形牛顿规范）`} collapsed steps={[
          { tex: R`ds^2=-(1+2\Psi)dt^2+a^2(1+2\Phi)\delta_{ij}dx^idx^j`, why: R`共形牛顿规范的度规（第 3、6 章）。现在 Christoffel 符号也有一阶部分。` },
          { tex: R`\Gamma^\mu{}_{0\mu}=\frac{\partial}{\partial t}\ln\sqrt{-g}=3H+\dot\Psi+3\dot\Phi,\qquad \Gamma^0{}_{00}=\dot\Psi,\qquad \Gamma^i{}_{0j}=\delta_{ij}(H+\dot\Phi)`, why: R`$\sqrt{-g}=a^3(1+\Psi)(1+3\Phi)$；后两个是 \eqref{3.56} 一类的标准结果。$\Gamma^\mu{}_{i\mu}$、$\Gamma^0{}_{0i}$、$\Gamma^i{}_{00}$ 是一阶的，但它们只乘一阶的 $T^i{}_0$、$T^0{}_i$，贡献为二阶。` },
          { tex: R`\Gamma^\mu{}_{\alpha\mu}T^\alpha{}_0\supset(\dot\Psi+3\dot\Phi)(-\rho),\qquad -\Gamma^\alpha{}_{0\mu}T^\mu{}_\alpha\supset-\dot\Psi(-\rho)-\dot\Phi\,(3\mathcal P)`, why: R`新出现的一阶项 = 一阶 Christoffel 符号 $\times$ 零阶 $T^0{}_0=-\rho$、$T^i{}_i=3\mathcal P$。` },
          { tex: R`-\rho\dot\Psi-3\rho\dot\Phi+\rho\dot\Psi-3\mathcal P\dot\Phi=-3(\rho+\mathcal P)\dot\Phi`, why: R`$\dot\Psi$ 两项相消，只剩 $\dot\Phi$ 项——空间体元的局域膨胀率 $3(H+\dot\Phi)$。` },
          { tex: R`\frac{\partial}{\partial t}\delta T^0{}_0+ik_i\delta T^i{}_0+3H\delta T^0{}_0-H\delta T^i{}_i-3(\rho+\mathcal P)\dot\Phi=0`, why: R`其余各项与 \eqref{7.45} 相同。最后用 $\Phi=-\Psi$（无各向异性应力，见 \secref{7.4.1} 末尾）得 \eqref{7.56}。` },
        ]} />
        <Tx>{R`**上一小节忽略 $\Psi$ 对吗？**对的——只要最后一项远小于其他各项，而在暴胀期间正是如此。Einstein 方程给出 $\Psi\sim\delta T^0{}_0/\rho$（马上就会验证）。这意味着 \eqref{7.56} 中除最后一项外，其余各项都是 $\rho\Psi$ 量级（乘以 $H$ 或 $k/a$）。而最后一项带着因子 $\rho+\mathcal P$：慢滚暴胀的条件之一正是 $|\rho+\mathcal P|\ll\rho$；用慢滚参数表示，$(\rho+\mathcal P)/\rho\simeq2\epsilon_{\rm sr}/3$。所以 \eqref{7.56} 的最后一项被压低了。`}</Tx>
        <Derivation title={R`补全：$(\rho+\mathcal P)/\rho=2\epsilon_{\rm sr}/3$`} collapsed steps={[
          { tex: R`H^2=\frac{8\pi G}{3}\rho,\qquad \dot\rho=-3H(\rho+\mathcal P)`, why: R`Friedmann 方程与连续性方程 \eqref{2.56}。` },
          { tex: R`2H\dot H=\frac{8\pi G}{3}\dot\rho=-8\pi GH(\rho+\mathcal P)\ \Rightarrow\ \dot H=-4\pi G(\rho+\mathcal P)`, why: R`对 Friedmann 方程求导。` },
          { tex: R`\epsilon_{\rm sr}=\frac{d}{dt}\frac1H=-\frac{\dot H}{H^2}=\frac{4\pi G(\rho+\mathcal P)}{H^2}=\frac32\,\frac{\rho+\mathcal P}{\rho}`, why: R`慢滚参数的定义 \eqref{7.17}，再用 $H^2=8\pi G\rho/3$。这个关系其实是精确的；对标量场 $\rho+\mathcal P=\dot{\bar\phi}^2$。` },
        ]} />
        <Box kind="warning" title="原书此处的引用笔误">{R`原书在这段论证末尾写"\eqref{7.11} 的最后一项被压低"。\eqref{7.11} 是一般的协变守恒式 $\nabla_\mu T^\mu{}_\nu=0$，其最后一项是 Christoffel 项，并不是这里讨论的对象；从上下文看，所指应为 \eqref{7.56} 的最后一项 $3(\rho+\mathcal P)\dot\Psi$。`}</Box>
        <Tx>{R`**但这个论证只在暴胀期间成立。**接下来必须跟踪扰动穿出视界、再在视界外一路演化到暴胀结束之后。在暴胀结束前的某个时刻，$|\rho+\mathcal P|\ll\rho$ 必然失效。更物理地说，我们迟早要把暴胀子场中的扰动转换成引力势中的扰动——暴胀子很可能经过一长串复杂反应衰变为标准模型粒子（再加热）。对绝热扰动，我们已经预期**最终只有引力势是要紧的**。

**曲率扰动 $\mathcal R$。**处理度规扰动与能量密度扰动之间耦合的一种办法，是定义**曲率扰动**（curvature perturbation）$\mathcal R$（名字的由来稍后在 \secref{7.4.3} 说明）：`}</Tx>
        <Eq n="7.57" title={R`曲率扰动 $\mathcal R$ 的定义（共形牛顿规范）`} say={R`曲率扰动 $=$（以能流表示的、按 $\rho+\mathcal P$ 归一的）"速度势"项 $-$ 引力势 $\Psi$；它把物质扰动与度规扰动捆成一个视界外守恒的组合。`}>{R`\mathcal R(\boldsymbol k,\eta)\equiv\frac{ik_i\delta T^i{}_0(\boldsymbol k,\eta)a^2H(\eta)}{k^2[\rho+\mathcal P](\eta)}-\Psi(\boldsymbol k,\eta).`}</Eq>
        <Tx>{R`**暴胀期间。**$\Psi$ 与第一项相比可以忽略。并且由 \eqref{7.8}、\eqref{7.9} 有 $\rho+\mathcal P=(\bar\phi'/a)^2$，而 \eqref{7.47} 给出第一项的分子 $ik_i\delta T^i{}_0=-k^2\bar\phi'\delta\phi/a^3$。剩下`}</Tx>
        <Eq n="7.58" say={R`暴胀中曲率扰动就是暴胀子涨落换算成的"时间延迟"再乘以 $H$：$\delta\phi/\dot{\bar\phi}$ 是该区域场值落后（或超前）的时间。`}>{R`\mathcal R=-\frac{aH}{\bar\phi'}\delta\phi\qquad\text{(during inflation)}.`}</Eq>
        <Tx>{R`**暴胀之后、辐射主导期。**此时（脚注：严格说，我们假设等到暴胀结束足够久，已稳稳处于辐射主导期）$ik_i\delta T^i{}_0=-4k\rho_{\rm r}\Theta_1/a$，正比于辐射的偶极矩（由 \eqref{3.86} 得到；另见 \secref{7.5}）。这里的 $\Theta_1$ 指光子与中微子合起来的辐射偶极矩 $\Theta_{{\rm r},1}$——早期二者相等。由于辐射压强等于能量密度的三分之一，$\rho+\mathcal P=\frac43\rho_{\rm r}$，于是`}</Tx>
        <Eq n="7.59" say={R`辐射主导期的曲率扰动只由引力势决定：$\mathcal R=-\frac32\Psi$（等价地 $=\frac32\Phi$）——暴胀子早已不在，但 $\mathcal R$ 的值被原封不动地交给了引力势。`}>{R`\begin{aligned}\mathcal R&=-\frac{3aH\Theta_1}{k}-\Psi\\&=-\frac32\Psi\qquad\text{(post inflation, radiation domination)}.\end{aligned}`}</Eq>
        <Tx>{R`第二个等号要到 \secref{7.5} 才证明：那里会得到初始偶极矩 $\Theta_1=-\frac{k}{6aH}\Phi$（\eqref{7.95}），于是 $-3aH\Theta_1/k=\Phi/2=-\Psi/2$。$\mathcal R$、$\Psi$ 与 $k_i\delta T^i{}_0$ 在暴胀期间及之后如何演化，见\figref{7.6}。`}</Tx>
        <Figure n="7.6" interactive={<CurvatureFreezePlot />} caption={R`曲率扰动 $\mathcal R$ 在暴胀期间及之后的演化（$H_{\rm inf}$ 为慢滚暴胀期间的哈勃率，$k=10^{-4}H_{\rm inf}$）。**左**：暴胀期间 $\mathcal R$ 在视界内振荡，直到 $k\eta\simeq-1$ 离开视界时冻结；图中同时画出它的两个组成部分（\eqref{7.57} 右边两项）：暴胀期间只有第一项（点划线）重要，从而得到 \eqref{7.58}，$\Psi$（虚线）可以忽略。**右**：暴胀结束、发生再加热（灰色区域；注意左右两图横轴的尺度不同）后情况改变——点划线与虚线在这一时期的演化依赖于具体的微观物理模型，但 $\mathcal R$ 在视界外始终保持常数，而辐射主导一开始，我们就知道它与 $\Psi$ 的关系 \eqref{7.59}。所以完全不必知道灰色区域里发生了什么。交互版：左图以 $\ln a$ 为横轴，画出两个不同波数的模式由 de Sitter 模函数 \eqref{7.40} 给出的 $\mathcal R$（振荡部分与模），各自在 $k|\eta|\sim1$ 处冻结到同一个值（尺度不变）；右图为再加热时期的示意：$\mathcal R$ 保持不变，而 $-\Psi=\Phi$ 升到 $\frac23\mathcal R$。注意：对标准（Bunch–Davies）解，视界内振荡的幅度按 $1/a$ **减小**，原书左图中振幅随时间增大只是示意。`} />
        <Tx>{R`**为什么 $\mathcal R$ 如此重要？**因为扰动移出视界后它**守恒**（在\figref{7.6} 中从 $H_{\rm inf}\eta\gtrsim-10^4$ 起，正是 $k|\eta|=1$ 之处）。守恒性马上就证明；先来体会它的威力。既然已知暴胀后 $\mathcal R=-3\Psi/2$，又知道暴胀期间 $\mathcal R=-aH\delta\phi/\bar\phi'$，并且中间 $\mathcal R$ 不变，就能立刻把**走出暴胀的 $\Psi$** 与**视界穿出时的 $\delta\phi$** 联系起来：`}</Tx>
        <Eq n="7.60" say={R`暴胀后的引力势 $=$ 视界穿出时的暴胀子涨落 $\times\frac23 aH/\bar\phi'$：$\mathcal R$ 守恒架起了跨越再加热的桥。`}>{R`\Psi\Big|_{\text{post inflation}}=\frac23aH\frac{\delta\phi}{\bar\phi'}\Big|_{\text{horizon crossing}}.`}</Eq>
        <Tx>{R`等价地，暴胀后 $\Psi$ 的功率谱与视界穿出时 $\delta\phi$ 的谱有简单关系：`}</Tx>
        <Eq n="7.61" say={R`暴胀后引力势的谱 $=$ 换算因子 $\frac49(aH/\bar\phi')^2$ $\times$ 暴胀子涨落谱，两者都在 $aH=k$ 时取值。`}>{R`\begin{aligned}P_\Psi(k)\Big|_{\text{post inflation}}&=\frac49\left(\frac{aH}{\bar\phi'}\right)^2P_{\delta\phi}(k)\Big|_{aH=k}\\&=\frac{2}{9k^3}\left(\frac{aH^2}{\bar\phi'}\right)^2\Big|_{aH=k},\end{aligned}`}</Eq>
        <Tx>{R`第二行用了 \eqref{7.55}。另一种写法是用慢滚参数 $\epsilon_{\rm sr}$ 消去 $\bar\phi'$：利用恒等式 $(aH/\bar\phi')^2=4\pi G/\epsilon_{\rm sr}$（\exref{7.7}，推导见下），得`}</Tx>
        <Derivation title={R`补全：$(aH/\bar\phi')^2=4\pi G/\epsilon_{\rm sr}$（\exref{7.7}(b)）`} collapsed steps={[
          { tex: R`\bar\phi'=a\dot{\bar\phi}\quad\Rightarrow\quad\left(\frac{aH}{\bar\phi'}\right)^2=\frac{H^2}{\dot{\bar\phi}^2}`, why: R`$d\eta=dt/a$。` },
          { tex: R`\dot H=-4\pi G(\rho+\mathcal P)=-4\pi G\dot{\bar\phi}^2`, why: R`上面已推得 $\dot H=-4\pi G(\rho+\mathcal P)$；对标量场 $\rho+\mathcal P=\dot{\bar\phi}^2$（\eqref{7.8}+\eqref{7.9}）。` },
          { tex: R`\epsilon_{\rm sr}=-\frac{\dot H}{H^2}=\frac{4\pi G\dot{\bar\phi}^2}{H^2}\quad\Rightarrow\quad\frac{H^2}{\dot{\bar\phi}^2}=\frac{4\pi G}{\epsilon_{\rm sr}}`, why: R`等价于 \exref{7.7} 的 $4\pi G(\bar\phi')^2=\epsilon_{\rm sr}a^2H^2$。` },
        ]} />
        <Eq n="7.62" keyEq title={R`暴胀后引力势的功率谱`} say={R`引力势谱 $\propto H^2/\epsilon_{\rm sr}$：除了张量谱也有的 $H^2$，还被 $1/\epsilon_{\rm sr}$ 放大——场滚得越慢，标量扰动越大。`}>{R`P_\Psi(k)=P_\Phi(k)=\frac{8\pi G}{9k^3}\frac{H^2}{\epsilon_{\rm sr}}\Big|_{aH=k}.`}</Eq>
        <Tx>{R`第一个等号来自我们无处不在的假设：各向异性应力很小，$\Psi=-\Phi$。与张量谱 \eqref{7.42} 比较，**标量与张量模式之比为 $1/\epsilon_{\rm sr}$ 量级**——我们预期标量扰动占主导（\secref{7.6} 会精确地得到张标比 $r=16\epsilon_{\rm sr}$）。

最后，还可以用 \exref{7.8} 的结果，把 $\epsilon_{\rm sr}$ 换成暴胀子势及其导数：`}</Tx>
        <Eq n="7.63" say={R`用势表示的引力势谱：正比于 $(HV/V_{,\phi})^2$——势越平（$V_{,\phi}/V$ 越小），标量扰动越大。`}>{R`P_\Phi(k)=P_\Psi(k)=\frac{128\pi^2G^2}{9k^3}\left(\frac{HV}{V_{,\phi}}\right)^2\Big|_{aH=k}.`}</Eq>
        <Derivation title={R`补全：\eqref{7.62} $\to$ \eqref{7.63}`} collapsed steps={[
          { tex: R`\epsilon_{\rm sr}\simeq\frac1{16\pi G}\left(\frac{V_{,\phi}}{V}\right)^2`, why: R`\exref{7.8} 的最低阶结果（来自慢滚近似 $3H\dot{\bar\phi}\simeq-V_{,\phi}$、$H^2\simeq8\pi GV/3$）。` },
          { tex: R`\frac{H^2}{\epsilon_{\rm sr}}=16\pi G\,\frac{H^2V^2}{V_{,\phi}^2}`, why: R`代入。` },
          { tex: R`P_\Phi=\frac{8\pi G}{9k^3}\cdot16\pi G\left(\frac{HV}{V_{,\phi}}\right)^2=\frac{128\pi^2G^2}{9k^3}\left(\frac{HV}{V_{,\phi}}\right)^2`, why: R`即 \eqref{7.63}。若再用 $V\simeq3H^2/(8\pi G)$，它也等于 $2H^6/(k^3V_{,\phi}^2)$。` },
        ]} />
        <Tx>{R`**这个结果说明了什么。**上一小节看到，$\phi$ 的扰动幅度只依赖暴胀期间的哈勃率——张量模式也是如此。但我们最终关心的是引力势，而它的幅度还依赖**标量场势的斜率**。特别是，把 $V_{,\phi}/V$ 取得足够小，就可以在保持 $P_\Phi(k)$ 不变的同时补偿一个更小的暴胀哈勃率；重要的是，这会**降低张量扰动相对于标量扰动的幅度**。这种依赖从何而来？`}</Tx>
        <Box kind="physics" title={R`暴胀子是时钟：$\delta t$ 论证`}>{R`回忆 $\Phi$ 衡量的是标度因子的扰动：$\Phi=\delta a/a$。若某区域在暴胀期间比平均区域膨胀得**更多**，那里的 $\delta a$ 就为正。标度因子的扰动对应宇宙时的一个小改变 $\delta t$：$\delta a=\dot a\,\delta t=aH\delta t$，即 $\Phi=H\delta t$。

另一方面，这个时钟改变量也可以通过标量场值的差来表达：$\delta\phi=\dot\phi\,\delta t$。换句话说，场 $\phi$ 的值（与 $t$ 不同，它是**坐标不变**的物理量）提供了暴胀期间的**物理时钟**：暴胀在 $\phi$ 滚到某个值时结束，涨落 $\delta\phi>0$ 或 $<0$ 只意味着这块区域的时钟"快了"或"慢了" $\delta t=\delta\phi/\dot\phi$。让两种 $\delta t$ 的表达式相等，一个用 $\Phi$、一个用 $\delta\phi$，得到`}</Box>
        <Eq n="7.64" say={R`引力势 $\approx$ 哈勃率 $\times$ 时钟延迟 $\delta\phi/\dot\phi$：场涨落在慢滚的场中造成多大的时间差，就造成多大的额外膨胀。`}>{R`\Phi\sim H\frac{\delta\phi}{\dot\phi}.`}</Eq>
        <Tx>{R`的确，在 1 量级的因子之内，\eqref{7.61} 第一行的换算因子 $\frac49(aH/\bar\phi')^2=\frac49(H/\dot{\bar\phi})^2$ 正是这个结果的平方。因此**引力势的功率谱反比于 $\dot\phi^2$**。而慢滚标量场的运动方程（忽略 \eqref{7.15} 中的第一项，即 $3H\dot\phi\simeq-V_{,\phi}$）表明：势越陡，场跑得越快，$\dot\phi\propto V_{,\phi}$。所以**势越平，$\Phi$ 的功率谱越大**——同样的 $\delta\phi\sim H/2\pi$，在慢腾腾的场里对应更长的时间差。

**证明 $\mathcal R$ 在超视界尺度上守恒。**现在只剩下证明 $\mathcal R$ 在视界外守恒。回到守恒方程 \eqref{7.56}。大尺度上 $k_i\delta T^i{}_0$ 正比于 $k^2$（$\delta T^i{}_0$ 本身就带一个 $k_i$，见 \eqref{7.47}），可以忽略，剩下`}</Tx>
        <Eq n="7.65" say={R`超视界极限的能量守恒：能流散度可略，能量密度扰动只因膨胀、压强做功以及引力势变化而改变。`}>{R`\frac{\partial}{\partial t}\delta T^0{}_0+3H\delta T^0{}_0-H\delta T^i{}_i=-3(\rho+\mathcal P)\dot\Psi\qquad\text{(super-horizon)}.`}</Eq>
        <Tx>{R`大尺度上（\exref{7.13} 请你证明），能动张量满足`}</Tx>
        <Eq n="7.66" say={R`超视界上能流项与能量密度扰动锁定在一起：$\mathcal R$ 定义中的"速度"项等于 $-\delta T^0{}_0/3$ 除以 $\rho+\mathcal P$。`}>{R`\frac{ik_i\delta T^i{}_0a^2H}{k^2}=-\frac{\delta T^0{}_0}{3}.`}</Eq>
        <Derivation title={R`\eqref{7.66} 的证明思路（\exref{7.13}）`} collapsed steps={[
          { tex: R`k^2\Phi+3aH\left(\Phi'-aH\Psi\right)=-4\pi Ga^2\,\delta T^0{}_0`, why: R`Einstein 方程的时–时分量 \eqref{6.41}，右边 $4\pi Ga^2\delta\rho$，而 $\delta\rho=-\delta T^0{}_0$。` },
          { tex: R`\Phi'-aH\Psi=\frac{4\pi Ga^3}{k^2}\,ik_i\delta T^i{}_0`, why: R`时–空分量（\exref{6.6} 的 \eqref{6.83}）。以辐射为例核对：\eqref{6.83} 右边为 $-16\pi Ga^2\rho_{\rm r}\Theta_{{\rm r},1}/k$，而 $ik_i\delta T^i{}_0=-4k\rho_{\rm r}\Theta_{{\rm r},1}/a$，二者一致。` },
          { tex: R`3aH\cdot\frac{4\pi Ga^3}{k^2}\,ik_i\delta T^i{}_0=-4\pi Ga^2\,\delta T^0{}_0\qquad(k^2\Phi\to0)`, why: R`代入第一式，并取大尺度极限 $k\ll aH$：$k^2\Phi$ 比 $3aH(\cdots)$ 项小 $(k/aH)^2$。` },
          { tex: R`\frac{ik_i\delta T^i{}_0a^2H}{k^2}=-\frac{\delta T^0{}_0}{3}`, why: R`两边除以 $12\pi Ga^2$。物理含义：视界外"共动"密度扰动为零。` },
        ]} />
        <Tx>{R`于是在大尺度上，\eqref{7.57} 变为`}</Tx>
        <Eq n="7.67" say={R`超视界时，曲率扰动 $=-\Psi$ 减去按 $3(\rho+\mathcal P)$ 归一的能量密度扰动（$-\delta T^0{}_0=\delta\rho$）。`}>{R`\mathcal R=-\Psi-\frac13\frac{\delta T^0{}_0}{\rho+\mathcal P}.`}</Eq>
        <Tx>{R`在守恒方程中用 $\mathcal R$ 消去 $\Psi$（$\Psi=-\mathcal R-\frac13\delta T^0{}_0/(\rho+\mathcal P)$，求时间导数后乘以 $-3(\rho+\mathcal P)$），得`}</Tx>
        <Eq n="7.68" say={R`把 $\dot\Psi$ 换成 $\dot{\mathcal R}$ 后的超视界能量守恒：右边出现了 $\mathcal R$ 的变化率。`}>{R`\frac{\partial}{\partial t}\delta T^0{}_0+3H\delta T^0{}_0-H\delta T^i{}_i=3(\rho+\mathcal P)\frac{\partial\mathcal R}{\partial t}+(\rho+\mathcal P)\frac{\partial}{\partial t}\left[\frac{\delta T^0{}_0}{\rho+\mathcal P}\right].`}</Eq>
        <Tx>{R`右边作用在 $\delta T^0{}_0$ 上的那部分偏导数，正好抵消左边第一项，剩下`}</Tx>
        <Eq n="7.69" say={R`消去 $\partial_t\delta T^0{}_0$ 后：$\mathcal R$ 的变化率只由 $\delta T^0{}_0$ 与 $\delta T^i{}_i$ 的某种组合驱动。`}>{R`\delta T^0{}_0\left[3H+\frac{1}{\rho+\mathcal P}\left(\frac{d\rho}{dt}+\frac{d\mathcal P}{dt}\right)\right]-H\delta T^i{}_i=3(\rho+\mathcal P)\frac{\partial\mathcal R}{\partial t}.`}</Eq>
        <Tx>{R`由 \eqref{2.56} 有 $d\rho/dt=-3H(\rho+\mathcal P)$，所以方括号中 $3H$ 与 $\dot\rho/(\rho+\mathcal P)$ 相消，只剩 $\dot{\mathcal P}/(\rho+\mathcal P)=-3H\dot{\mathcal P}/\dot\rho$。再注意 $-\delta T^0{}_0$ 是能量密度的扰动 $\delta\rho$，而 $\delta T^i{}_i/3$ 是压强的扰动 $\delta\mathcal P$，左边可以改写为`}</Tx>
        <Eq n="7.70" say={R`$\mathcal R$ 的变化率正比于"非绝热压强"：实际的压强扰动与"沿背景演化应有的"压强扰动 $(\dot{\mathcal P}/\dot\rho)\delta\rho$ 之差。`}>{R`3H\left[\frac{\dot{\mathcal P}}{\dot\rho}\delta\rho-\delta\mathcal P\right]=3(\rho+\mathcal P)\frac{\partial\mathcal R}{\partial t},`}</Eq>
        <Derivation title={R`补全：\eqref{7.67} $\to$ \eqref{7.70} 的每一步`} collapsed steps={[
          { tex: R`-3(\rho+\mathcal P)\dot\Psi=3(\rho+\mathcal P)\dot{\mathcal R}+(\rho+\mathcal P)\frac{\partial}{\partial t}\left[\frac{\delta T^0{}_0}{\rho+\mathcal P}\right]`, why: R`由 \eqref{7.67}，$-\Psi=\mathcal R+\frac13\delta T^0{}_0/(\rho+\mathcal P)$；求导后乘以 $3(\rho+\mathcal P)$。代入 \eqref{7.65} 右边即 \eqref{7.68}。` },
          { tex: R`(\rho+\mathcal P)\frac{\partial}{\partial t}\left[\frac{\delta T^0{}_0}{\rho+\mathcal P}\right]=\frac{\partial\delta T^0{}_0}{\partial t}-\delta T^0{}_0\,\frac{\dot\rho+\dot{\mathcal P}}{\rho+\mathcal P}`, why: R`商的求导。第一项与 \eqref{7.68} 左边第一项相消，第二项移到左边，得 \eqref{7.69}。` },
          { tex: R`3H+\frac{\dot\rho+\dot{\mathcal P}}{\rho+\mathcal P}=3H-3H+\frac{\dot{\mathcal P}}{\rho+\mathcal P}=-3H\frac{\dot{\mathcal P}}{\dot\rho}`, why: R`连续性方程 $\dot\rho=-3H(\rho+\mathcal P)$，即 $\rho+\mathcal P=-\dot\rho/3H$。` },
          { tex: R`\delta T^0{}_0\left(-3H\frac{\dot{\mathcal P}}{\dot\rho}\right)-H\delta T^i{}_i=3H\frac{\dot{\mathcal P}}{\dot\rho}\delta\rho-3H\delta\mathcal P`, why: R`代入 $\delta T^0{}_0=-\delta\rho$、$\delta T^i{}_i=3\delta\mathcal P$，即 \eqref{7.70} 左边。` },
        ]} />
        <Tx>{R`因为 $-\delta T^0{}_0$ 是能量密度的扰动，而 $\delta T^i{}_i/3$ 是压强的扰动。于是，**$\partial\mathcal R/\partial t=0$ 当且仅当**`}</Tx>
        <Eq n="7.71" title={R`$\mathcal R$ 守恒的条件`} say={R`压强扰动与能量密度扰动之比等于背景中二者变化率之比——扰动只是"沿背景历史平移了一点"（绝热），此时视界外 $\mathcal R$ 严格不变。`}>{R`\delta\mathcal P=\frac{\dot{\mathcal P}}{\dot\rho}\delta\rho.`}</Eq>
        <Tx>{R`**单场暴胀中这一条件成立。**在背景层面，可以写 $\dot{\mathcal P}=(d\mathcal P/d\bar\phi)\dot{\bar\phi}$，对 $\dot\rho$ 也一样——因为 $\bar\phi$ 就是我们的时钟，与时间坐标等价。对单个标量场，$\mathcal P$ 与 $\rho$ 都是场 $\phi$ 的**唯一**函数（见 \eqref{7.8}、\eqref{7.9}），所以也可以写 $\delta\mathcal P=(d\mathcal P/d\bar\phi)\delta\phi$，$\delta\rho$ 同理。二者结合：$\delta\mathcal P/\delta\rho=(d\mathcal P/d\bar\phi)/(d\rho/d\bar\phi)=\dot{\mathcal P}/\dot\rho$，即 \eqref{7.71} 成立。因此在单场暴胀中，$\mathcal R$ 在大尺度上确实守恒。在有多个场同时起作用的更复杂的暴胀模型中情况就不同了：那时 $\mathcal R$ 一般会在视界外演化。`}</Tx>
        <Box kind="note" title={R`细节：$\rho$、$\mathcal P$ 是 $\phi$ 的"唯一函数"在什么意义下成立`}>{R`严格说 $\rho=\frac12\dot\phi^2+V$ 还依赖 $\dot\phi$。但在超视界、慢滚的吸引子解上，$\dot\phi$ 本身由 $\phi$ 决定（$3H\dot\phi\simeq-V_{,\phi}$），即整个相空间轨迹是一条一维曲线，每块区域只是在同一条曲线上处于不同位置——这正是"单一时钟"的含义，也是绝热性 \eqref{7.43} 的根源。多场模型中，不同区域可以处在不同的轨迹上，于是会出现**非绝热压强** $\delta\mathcal P-(\dot{\mathcal P}/\dot\rho)\delta\rho\neq0$，它按 \eqref{7.70} 驱动 $\mathcal R$ 演化，并可产生等曲率扰动。`}</Box>
      </Sub>

      <Sub n="7.4.3" title="Spatially flat slicing" zh="空间平直切片">
        <Tx>{R`**换一种更优雅的思路。**上一小节的处理是完整的，但不是理解暴胀中标量扰动最优雅的方式。简单得多的办法是在不同规范之间来回切换，途中利用 \secref{6.2} 引入的**规范不变量**（gauge-invariant variable）概念。这里只勾勒这一方法，部分较细的计算留作习题。

前面看到，共形牛顿规范的一大麻烦是标量场扰动 $\delta\phi$ 与引力势 $\Psi$ 耦合在一起。如果能换到一个让二者**解耦**的规范就好了。考虑**空间平直切片**的规范，即度规的空间部分满足 $g_{ij}=a^2\delta_{ij}$（不受扰动）。此时线元为`}</Tx>
        <Eq n="7.72" title="空间平直切片的度规" say={R`空间平直切片：空间度规完全不受扰动，标量扰动全部放进时–时分量 $A$ 与时–空分量 $B$。`}>{R`ds^2=-[1+2A(\boldsymbol x,t)]dt^2-2a(t)B_{,i}(\boldsymbol x,t)dx^idt+a^2(t)\delta_{ij}dx^idx^j,`}</Eq>
        <Tx>{R`即由两个函数 $A$ 和 $B$ 刻画标量扰动（对照 \eqref{6.11}：这相当于选规范使 $D=E=0$）。在这个规范里，$\delta\phi$ 的方程**精确地**就是 \eqref{7.54}：标量场扰动不与 $A$、$B$ 耦合（在慢滚领头阶、忽略 $V_{,\phi\phi}$ 的意义下）。因此无需忽略任何耦合，就可以认定 $\delta\phi$ 的功率谱由 \eqref{7.55} 给出。`}</Tx>
        <Box kind="physics" title={R`为什么在平直切片中 $\delta\phi$ 不感受度规扰动`}>{R`直观地看：在共形牛顿规范中，$\Phi$ 让空间体元局域地多膨胀或少膨胀，从而通过 \eqref{7.56} 的 $3(\rho+\mathcal P)\dot\Psi$ 项反馈到 $\delta\phi$ 上。在空间平直切片中，我们恰好选取了"空间体元不受扰动"的时间切片，剩下的 $A$、$B$ 是由约束方程（Einstein 方程的 $00$、$0i$ 分量）决定的非动力学量，它们按 $\epsilon_{\rm sr}$ 压低的方式出现在 $\delta\phi$ 的方程中。所以平直切片中的 \eqref{7.54} 不再需要"$\Psi$ 很小"这一前提——它在视界内外都成立，包括 $\mathcal R$ 冻结的阶段。`}</Box>
        <Tx>{R`**下一步：选一个规范不变量。**我们要找一个从一个规范变到另一个规范时保持不变的量。Bardeen（1980）给出了若干这样的变量：两个刻画度规的标量扰动，两个刻画物质的扰动。它们的任意线性组合仍是规范不变的。我们想要的是**在空间平直切片中正比于 $\delta\phi$** 的那个组合。

Bardeen 变量中有一个特别有用，我们记作 $\mathcal V$，定义为`}</Tx>
        <Eq n="7.73" title={R`Bardeen 速度变量 $\mathcal V$`} say={R`$\mathcal V$ 是"物质的速度势"与"度规的时–空扰动 $B$"之和：两者在时间切片改变时以相反的方式变化，和保持不变。`}>{R`\mathcal V(\boldsymbol k,t)\equiv B(\boldsymbol k,t)+\frac{ik_i}{k^2}\frac{a\,\delta T^i{}_0(\boldsymbol k,t)}{\rho+\mathcal P}.`}</Eq>
        <Tx>{R`在共形牛顿规范中，对物质而言，$\mathcal V$ 与速度直接相关：$u_{\rm m}=ik\mathcal V$。对同一规范中的辐射，$ik\mathcal V=-3i\Theta_{{\rm r},1}$，即正比于偶极矩。（核对：$B=0$，$ik_i\delta T^i{}_0=-4k\rho_{\rm r}\Theta_{{\rm r},1}/a$，$\rho+\mathcal P=\frac43\rho_{\rm r}$，于是 $\mathcal V=-3\Theta_{{\rm r},1}/k$。）

在空间平直规范中，用 \eqref{7.47} 计算 $\delta T^i{}_0$，\eqref{7.73} 成为`}</Tx>
        <Eq n="7.74" say={R`在空间平直切片中，$\mathcal V$ 由 $B$ 与暴胀子涨落 $\delta\phi$ 组成（后者以背景"速度" $\bar\phi'$ 加权）。`}>{R`\mathcal V=B-\frac{\bar\phi'\delta\phi}{(\rho+\mathcal P)a^2}\qquad\text{(spatially flat slicing)}`}</Eq>
        <Tx>{R`另一方面，Bardeen 的度规变量 $\mathcal H$（\eqref{6.19}：$\mathcal H\equiv-D+aH(B-E')$；原书在本节把它记作 $\nosym{\Phi_H}$，与共形哈勃率无关）在空间平直规范中等于 $aHB$，因为该规范中 $D=E=0$。既然 $\mathcal H$ 与 $\mathcal V$ 都是规范不变的，组合`}</Tx>
        <Eq n="7.75" keyEq title={R`曲率扰动的规范不变定义`} say={R`曲率扰动是两个 Bardeen 不变量的组合：$-$（空间曲率变量）$+aH\times$（速度变量），因而在任何规范中都取同一个值。`}>{R`\mathcal R\equiv-\mathcal H+aH\mathcal V`}</Eq>
        <Tx>{R`也是规范不变的。在空间平直切片中，$B$ 项相消，它等于`}</Tx>
        <Eq n="7.76" say={R`在空间平直切片中，曲率扰动就是暴胀子涨落乘以 $-aH/\bar\phi'$——与 \eqref{7.58} 相同，但这里没有做任何近似。`}>{R`\mathcal R=-\frac{aH}{\bar\phi'}\delta\phi\qquad\text{(spatially flat slicing)}.`}</Eq>
        <Derivation title={R`补全：规范不变性与 \eqref{7.76}`} collapsed steps={[
          { tex: R`t\to t+\zeta:\quad \hat B=B-a^{-1}\zeta+\xi',\quad \hat D=D-H\zeta,\quad \hat E=E+\xi,\quad \widehat{\delta\phi}=\delta\phi-\dot{\bar\phi}\,\zeta`, why: R`\eqref{6.17}–\eqref{6.18} 与 \eqref{6.10}：$\zeta$ 是时间切片的移动，$\xi$ 是空间坐标的（标量型）移动。` },
          { tex: R`\hat{\mathcal H}=-D+H\zeta+aH\left(B-a^{-1}\zeta+\xi'-\xi'\right)=\mathcal H`, why: R`$D$ 与 $B$ 中的 $\zeta$ 相消，$B$ 与 $E'$ 中的 $\xi'$ 相消。` },
          { tex: R`-\frac{\delta\phi}{a\dot{\bar\phi}}\ \to\ -\frac{\delta\phi}{a\dot{\bar\phi}}+\frac{\zeta}{a},\qquad B\to B-\frac{\zeta}{a}+\xi'`, why: R`在 $E=0$ 的规范之间（$\xi=0$），$\mathcal V=B-\delta\phi/(a\dot{\bar\phi})$ 中的 $\zeta$ 相消，故 $\mathcal V$ 不变。这里用了 $\bar\phi'/[(\rho+\mathcal P)a^2]=a\dot{\bar\phi}/(a^2\dot{\bar\phi}^2)=1/(a\dot{\bar\phi})$。` },
          { tex: R`\mathcal R=-aHB+aH\left(B-\frac{\bar\phi'\delta\phi}{(\rho+\mathcal P)a^2}\right)=-\frac{aH\bar\phi'\delta\phi}{(\bar\phi'/a)^2a^2}=-\frac{aH}{\bar\phi'}\delta\phi`, why: R`空间平直切片中 $\mathcal H=aHB$，代入 \eqref{7.74}，并用 $\rho+\mathcal P=(\bar\phi'/a)^2$。` },
        ]} />
        <Box kind="warning" title={R`\eqref{7.73} 中的 $\delta T^i{}_0$ 该怎么理解`}>{R`若 $B\neq0$，逆度规有 $g^{0i}=-B_{,i}/a$，于是精确的 $\delta T^i{}_0=g^{ij}\phi_{,j}\phi_{,0}+g^{i0}(\phi_{,0})^2$ 会多出一项 $-B_{,i}\dot{\bar\phi}^2/a$。原书在 \eqref{7.74} 中用的是无扰动度规下的 \eqref{7.47}，即把 $\delta T^i{}_0$ 理解为不含这一度规项的动量密度（等价于用 $-\delta T^0{}_i/a^2$ 来定义）。只有这样理解，$\mathcal V$ 才在时间切片变换下不变、并给出正确的 \eqref{7.76}。另外，一般规范中 $\mathcal V$ 还应把 $B$ 换成 $B-E'$；本书只在 $E=0$ 的两个规范（牛顿规范、空间平直切片）之间转换，所以不受影响。`}</Box>
        <Tx>{R`这与 \eqref{7.58} 完全一样——只是现在它是精确的，而 \eqref{7.58} 依赖"暴胀期间 $\Psi$ 可忽略"。于是可以立刻把 $\mathcal R$ 的功率与 $\delta\phi$ 的功率联系起来：`}</Tx>
        <Eq n="7.77" say={R`曲率扰动谱 $=$ 换算因子 $(aH/\bar\phi')^2$（即 $H^2/\dot{\bar\phi}^2$）$\times$ 暴胀子涨落谱。`}>{R`P_{\mathcal R}(k)=\left(\frac{aH}{\bar\phi'}\right)^2P_{\delta\phi}(k).`}</Eq>
        <Tx>{R`$P_{\delta\phi}$ 由 \eqref{7.55} 给出，前置因子是 $4\pi G/\epsilon_{\rm sr}$，所以`}</Tx>
        <Eq n="7.78" keyEq title={R`原初曲率扰动功率谱`} say={R`原初曲率扰动谱：在每个模式穿出视界时，由当时的 $H^2/\epsilon_{\rm sr}$ 决定——这是暴胀对标量扰动最核心的预言，也是观测约束最常用的形式。`}>{R`P_{\mathcal R}(k)=\frac{2\pi GH^2}{\epsilon_{\rm sr}k^3}\Big|_{aH=k}.`}</Eq>
        <Tx>{R`**\eqref{7.78} 非常有用**，因为它表示的是一个**规范不变量**的功率谱。正因如此，对原初标量扰动功率谱的观测约束通常都以 $P_{\mathcal R}(k)$ 表述。虽然我们是在 \eqref{7.72} 的空间平直坐标中算出它的，但一旦有了这个答案，就可以在任何规范中计算 $\mathcal R$，再把该规范中扰动变量的功率与 $P_{\mathcal R}$ 联系起来。

**回到共形牛顿规范。**本书一直使用共形牛顿规范。在这个规范中 $\mathcal H=-\Phi$，并且 $B=0$，所以 \eqref{7.75} 定义的 $\mathcal R$ 正是 \eqref{7.57}（$\mathcal R=\Phi+aH\mathcal V$，再用 $\Phi=-\Psi$）。我们在 \secref{7.4.2} 论证过：暴胀之后，在共形牛顿规范中 $\mathcal R=3\Phi/2$（即 \eqref{7.59} 的 $-\frac32\Psi$），所以 $P_\Phi=4P_{\mathcal R}/9$，或者用 \eqref{7.78}，`}</Tx>
        <Eq n="7.79" say={R`由规范不变的 $P_{\mathcal R}$ 乘以 $\frac49$ 得到牛顿规范中的引力势谱——与 \secref{7.4.2} 的"蛮力"结果 \eqref{7.62} 完全一致。`}>{R`P_\Phi(k)=\frac{8\pi GH^2}{9k^3\epsilon_{\rm sr}}\Big|_{aH=k},`}</Eq>
        <Tx>{R`与先前的计算 \eqref{7.62} 完全一致。两条路线殊途同归。`}</Tx>
        <Box kind="data" title={R`量级：观测到的 $\mathcal A_s$ 告诉我们什么`}>{R`换成无量纲谱：$\Delta^2_{\mathcal R}=\frac{k^3}{2\pi^2}P_{\mathcal R}=\frac{GH^2}{\pi\epsilon_{\rm sr}}=\frac{1}{\pi\epsilon_{\rm sr}}\frac{H^2}{m_{\rm Pl}^2}$。观测给出 $\mathcal A_s\simeq2.1\times10^{-9}$（\secref{7.6}）。若取 $\epsilon_{\rm sr}=0.01$，则 $H/m_{\rm Pl}\simeq\sqrt{\pi\epsilon_{\rm sr}\mathcal A_s}\approx8\times10^{-6}$，即 $H\sim10^{14}\,\mathrm{GeV}$；$\epsilon_{\rm sr}$ 越小，所需的 $H$ 越低。张量谱 \eqref{7.42} 只依赖 $H^2$，所以张标比 $P_{\rm T}/P_{\mathcal R}=4\cdot8\pi G/(2\pi G/\epsilon_{\rm sr})=16\epsilon_{\rm sr}$——这正是 \secref{7.6} 的 $r=16\epsilon_{\rm sr}$。单靠测量 $\mathcal A_s$ 无法把 $H$ 与 $\epsilon_{\rm sr}$ 分开，这就是为什么探测原初引力波如此重要。`}</Box>
        <Tx>{R`**"曲率扰动"这个名字从何而来。**对我们而言，暴胀扰动的计算到此结束，但故事还没完。Bardeen 等人指出，$\mathcal H$ 有一个漂亮的几何解释，而 $\mathcal R$ 在某些规范中也具有这一解释。具体地说，固定时刻三维空间的曲率等于 $4k^2\mathcal H/a^2$（\exref{3.13}）。所以 $\mathcal H$ 的扰动代表**曲率扰动**：尽管零阶空间是欧几里得的，扰动却诱导出逐点变化的空间曲率。

在共形牛顿规范或空间平直切片中，这个解释对 $\mathcal R$ 的扰动似乎无关紧要，因为 $\mathcal R$ 是 $\mathcal H$ 与速度的组合。但如果换到**共动规范**（comoving gauge）——速度为零（$\mathcal V=0$）的规范——那么 $\mathcal R$ 就等于 $\mathcal H$（按 \eqref{7.75} 的符号约定，精确地说是 $-\mathcal H$；整体符号不影响解释）。于是在共动规范中，$\mathcal R$ 显然对应于曲率扰动；暴胀产生的标量扰动也因此常被称为**曲率扰动**。$\mathcal R$ 之所以无处不在，是因为它就是描述暴胀所产生的绝热扰动**最方便**的方式：规范不变、视界外守恒、与暴胀结束后的微观物理无关。`}</Tx>
        <Box kind="key" title="小结与过渡">{R`- 单场暴胀 $\Rightarrow$ 绝热扰动 \eqref{7.43}：只需一个函数（$\mathcal R$ 或 $\Psi$）就能确定所有成分的初始扰动。
- 不计引力（或在空间平直切片中精确地），$\delta\phi$ 服从无质量场方程 \eqref{7.54}，$P_{\delta\phi}=H^2/2k^3$ \eqref{7.55}。
- 曲率扰动 $\mathcal R$ 规范不变 \eqref{7.75}，在单场暴胀中视界外守恒（条件 \eqref{7.71}），从而跨越我们不了解的再加热：暴胀中 $\mathcal R=-aH\delta\phi/\bar\phi'$，辐射期 $\mathcal R=-\frac32\Psi$。
- 结果：$P_{\mathcal R}=\frac{2\pi GH^2}{\epsilon_{\rm sr}k^3}\big|_{aH=k}$ \eqref{7.78}，$P_\Phi=P_\Psi=\frac49P_{\mathcal R}$ \eqref{7.62}/\eqref{7.79}；标量/张量 $\sim1/\epsilon_{\rm sr}$。

还欠一笔账：\eqref{7.59} 的第二个等号（$\Theta_1=-\frac{k}{6aH}\Phi$）以及 $\Psi$、$\Phi$、$\Theta_1$ 之间的其他关系。\secref{7.5} 将在 $k\eta\ll1$ 的早期化简 Einstein–Boltzmann 方程，把 $\Psi$ 与第 5、6 章需要追踪的全部扰动变量联系起来，顺带证明这些关系。`}</Box>
      </Sub>
    </Sec>);
}
