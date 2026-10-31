// §6.2 From gauge to gauge —— 式 (6.7)–(6.19)
import { Sec, Tx, Eq, Box, Derivation, C } from "@kit";
import { hT } from "./_ch06_notation.jsx";
import { GaugeBars } from "./_ch06_plots.jsx";

const R = String.raw;

export function Sec62() {
  return (
    <Sec n="6.2" title="From gauge to gauge" zh="从一个规范到另一个规范"
      gist={R`小坐标变换 $t\to t+\zeta$、$x^i\to x^i+\xi^{,i}$ 使标量度规扰动按 $\hat A=A-\zeta'/a$、$\hat B=B-\zeta/a+\xi'$、$\hat D=D-H\zeta$、$\hat E=E+\xi$ 变化。两个坐标函数可以消去两个标量函数，只剩 2 个物理标量自由度；Bardeen 组合 $\Phi_A$、$\Phi_H$ 规范不变。`}
      why={R`它解释了共形牛顿规范为何只需 $\Psi$、$\Phi$；也给出在不同规范之间换算的工具——有的计算在某个规范中最简单（如暴胀扰动用空间平坦规范，§7.4.3），观测量又在另一个规范中最自然。`}
      gives={["6.7", "6.8", "6.10", "6.11", "6.12", "6.13", "6.17", "6.18", "6.19"]}>
      <p className="muted">本节概念：<C id="gauge" /> · <C id="bardeen" /> · <C id="dof" /></p>
      <Tx>{R`**规范 = 坐标的选择。**坐标变换对时空标量、矢量、张量的作用已在 Box 2.2 中给出。在相对论扰动论里，一种坐标选择常被称为一个**规范**（gauge），我们也将频繁使用这个词。能在不同规范之间来回切换，对处理宇宙学扰动很有用：方程往往在某个规范中大大简化（例如计算暴胀期间产生的扰动时用的**空间平坦切片**，§7.4.3），而我们实际观测到的量在另一个规范中计算更自然。不同的规范对"宇宙学扰动"问题的不同部分各有优势。

**热身：一个标量场。**先看一个标量场 $\phi(x)$——本节中 $x$ 代表时空点 $(t,\boldsymbol x)$。下一章研究暴胀时会遇到这样的场。我们关心均匀宇宙附近的小扰动，所以把 $\phi$ 拆成背景与扰动：`}</Tx>
      <Eq n="6.7" say="标量场 = 只依赖时间的背景值 + 依赖时空位置的小扰动；背景只能依赖 $t$，因为背景宇宙是均匀的。">{R`\phi(x)=\bar\phi(t)+\delta\phi(t,\boldsymbol x),`}</Eq>
      <Tx>{R`背景场只依赖 $t$，因为背景宇宙均匀。现在要推导：当坐标变换 $x\to\hat x(x)$ 时，\eqref{6.7} 怎样改变。既然关心扰动，只需考虑**小**坐标变换即可；否则变换后的场一般会带上大的（非物理的）扰动。因此把 $\hat x(x)$ 对 $x$ 做 Taylor 展开，只保留零阶部分，即坐标的**平移**：`}</Tx>
      <Eq n="6.8" keyEq title="小坐标变换（标量型）" say="新坐标 = 旧坐标 + 一阶小平移：时间平移 $\zeta$，空间平移写成另一个标量 $\xi$ 的梯度（只考虑标量型变换）。">{R`\begin{aligned}t\to\hat t &= t+\zeta(t,\boldsymbol x),\\ x^i\to\hat x^i &= x^i+\xi^{,i}(t,\boldsymbol x),\end{aligned}`}</Eq>
      <Tx>{R`其中时间平移为 $\zeta$，空间坐标的平移写成另一个标量函数 $\xi$ 的梯度——因为目前只考虑标量扰动（稍后回到这一点）。把 $\delta\phi$、$\xi$、$\zeta$ 都当作一阶小量，标量的变换律（Box 2.2）`}</Tx>
      <Eq n="6.9" say="标量场在同一个时空点上的取值与坐标无关：新坐标下的函数在新坐标值处，等于旧函数在对应旧坐标值处的值。">{R`\hat\phi(\hat x)=\phi(x[\hat x])=\phi(\hat t-\zeta,\hat{\boldsymbol x}-\nabla\xi)`}</Eq>
      <Tx>{R`化为（见习题 6.3）`}</Tx>
      <Eq n="6.10" keyEq title="标量场扰动的规范变换" say="场本身不变，但扰动会变：时间坐标平移 $\zeta$ 后，与同一时空点相比较的背景值变了 $\dot{\bar\phi}\zeta$，所以扰动要减去这一项。">{R`\widehat{\delta\phi}(t,\boldsymbol x)=\delta\phi(t,\boldsymbol x)-\frac{d\bar\phi(t)}{dt}\zeta(t,\boldsymbol x),`}</Eq>
      <Tx>{R`为清楚起见，这里去掉了坐标上的帽子。换句话说：标量场 $\phi(x)$ 本身的变换是平凡的，$\hat\phi(\hat x)=\phi(x)$，但它的**扰动** $\delta\phi$ 不是。原因在于定义扰动必须先假设一个背景值；若场在背景层面随时间演化，这个背景值就依赖于时间坐标的选择。`}</Tx>
      <Box kind="physics" title="为什么扰动依赖规范">{R`设想背景场随时间单调减小（例如暴胀子沿势能下滑）。换一种时间切片——让不同位置的"同一时刻"错开 $\zeta(\boldsymbol x)$——那么在新切片上看，场在不同位置的值就不同了：原本均匀的场"看起来"有了扰动 $-\dot{\bar\phi}\zeta$。反之，适当选择 $\zeta=\delta\phi/\dot{\bar\phi}$ 可以让 $\widehat{\delta\phi}=0$（"场均匀的切片"）。这正是第 7 章处理暴胀扰动时要用的自由。`}</Box>
      <Tx>{R`**度规的变换。**热身之后，把小坐标变换 \eqref{6.8} 用到**只含标量扰动**的一般扰动度规上。利用上一节的分解，它可以写成`}</Tx>
      <Eq n="6.11" say="只含标量扰动的最一般度规：$A$ 扰动时间流逝，$B$ 产生时–空交叉项，$D$ 是各向同性的空间伸缩，$E$ 是无迹的空间形变。">{R`\begin{aligned}g_{00} &= -(1+2A),\\ g_{0i} &= -aB_{,i},\\ g_{ij} &= a^2(\delta_{ij}[1+2D]-2E_{,ij}).\end{aligned}`}</Eq>
      <Tx>{R`按 Box 2.2 推出的 \eqref{2.49}，坐标变换 $x\to\hat x(x)$ 下度规的变化为`}</Tx>
      <Eq n="6.12" say="度规是 (0,2) 型张量：新坐标中的分量 = 旧分量乘以两个 Jacobi 矩阵 $\partial x/\partial\hat x$。">{R`\hat g_{\mu\nu}(\hat x)=\frac{\partial x^\alpha}{\partial\hat x^\mu}\frac{\partial x^\beta}{\partial\hat x^\nu}g_{\alpha\beta}(x),`}</Eq>
      <Tx>{R`或者等价地（任何良定义的坐标变换都有非零的 Jacobi 行列式 $|\partial x/\partial\hat x|$，因而矩阵可逆）`}</Tx>
      <Eq n="6.13" say="把 \eqref{6.12} 的 Jacobi 矩阵移到另一边：新度规配上 $\partial\hat x/\partial x$ 两次，就还原为旧度规。">{R`\hat g_{\alpha\beta}(\hat x)\frac{\partial\hat x^\alpha}{\partial x^\mu}\frac{\partial\hat x^\beta}{\partial x^\nu}=g_{\mu\nu}(x).`}</Eq>
      <Tx>{R`现在可以显式算出度规的变换了。我们只做一个分量，其余留作习题。取 \eqref{6.13} 的 $00$ 分量：`}</Tx>
      <Eq n="6.14" say="\eqref{6.13} 的时–时分量：右边是旧度规的 $g_{00}=-(1+2A)$。">{R`\hat g_{\alpha\beta}(\hat x)\frac{\partial\hat x^\alpha}{\partial t}\frac{\partial\hat x^\beta}{\partial t}=-[1+2A].`}</Eq>
      <Tx>{R`注意，由于 $A$ 是扰动，它的宗量写 $x$ 还是 $\hat x(x)$ 无关紧要——两者之差本身就是一阶量。我们断言：左边只有 $\alpha=\beta=0$ 的项有贡献。例如 $\alpha=0$、$\beta=i$：度规的非对角分量 $\hat g_{0i}$ 正比于一阶扰动 $\hat B_{,i}$，而 $\partial\hat x^i/\partial t$ 正比于一阶量 $\xi$，乘积是二阶的，可以忽略。$\alpha=i$、$\beta=j$ 的项同理（$\partial\hat x^i/\partial t\cdot\partial\hat x^j/\partial t$ 是二阶）。所以左边就是`}</Tx>
      <Eq n="6.15" say="只剩时–时项：新的 $\hat g_{00}$ 乘以 $(\partial\hat t/\partial t)^2=(1+\dot\zeta)^2$，展开到一阶。">{R`\begin{aligned}-[1+2\hat A]\left(\frac{\partial\hat t}{\partial t}\right)^2 &= -[1+2\hat A]\left(1+\dot\zeta\right)^2\\ &\simeq-1-2\hat A-2\dot\zeta.\end{aligned}`}</Eq>
      <Tx>{R`令它等于 $g_{00}$：`}</Tx>
      <Eq n="6.16" say="比较一阶项：新旧 $A$ 之差恰好是时间平移的变化率。">{R`-2\hat A-2\dot\zeta=-2A,`}</Eq>
      <Tx>{R`所以在 \eqref{6.8} 给出的坐标变换下`}</Tx>
      <Eq n="6.17" keyEq title={R`$A$ 的规范变换`} say="时–时扰动的变化等于时间平移对共形时间的导数除以 $a$（即 $\dot\zeta$）：若不同时刻的平移量不同，“钟走得快慢”的读数就变了。">{R`A\to\hat A=A-\frac1a\zeta'.`}</Eq>
      <Tx>{R`类似地，度规的其他分量变为`}</Tx>
      <Eq n="6.18" keyEq title={R`$B$、$D$、$E$ 的规范变换`} say="时间平移改变 $B$（通过 $-\zeta/a$）和 $D$（不同位置的“同一时刻”对应不同的 $a$，差 $H\zeta$）；空间平移改变 $B$（通过 $\xi'$）和 $E$（直接加 $\xi$）。">{R`\begin{aligned}\hat B &= B-a^{-1}\zeta+\xi',\\ \hat D &= D-H\zeta,\\ \hat E &= E+\xi.\end{aligned}`}</Eq>
      <Derivation title={R`\eqref{6.18} 的推导（习题 6.2 前半）`} collapsed steps={[
        { tex: R`\underbrace{\hat g_{00}\frac{\partial\hat t}{\partial t}\frac{\partial\hat t}{\partial x^i}}_{-\zeta_{,i}}+\underbrace{\hat g_{0i}}_{-a\hat B_{,i}}+\underbrace{\hat g_{jl}\frac{\partial\hat x^j}{\partial t}\frac{\partial\hat x^l}{\partial x^i}}_{a^2\dot\xi_{,i}}=g_{0i}=-aB_{,i}`, why: R`\eqref{6.13} 的 $0i$ 分量，只保留一阶项：$\partial\hat t/\partial x^i=\zeta_{,i}$，$\partial\hat x^j/\partial t=\dot\xi^{,j}$；第二项中 $\partial\hat t/\partial t\simeq1$、$\partial\hat x^l/\partial x^i\simeq\delta_{li}$。` },
        { tex: R`\hat B=B-\frac{\zeta}{a}+a\dot\xi=B-a^{-1}\zeta+\xi'`, why: R`除以 $-a$ 并去掉梯度；$a\dot\xi=\xi'$。` },
        { tex: R`\hat g_{lm}(\hat x)\left(\delta_{li}+\xi_{,li}\right)\left(\delta_{mj}+\xi_{,mj}\right)=\hat g_{ij}(\hat x)+2a^2\xi_{,ij}=g_{ij}(x)`, why: R`$ij$ 分量：$\alpha$ 或 $\beta$ 为 0 的项都是二阶。` },
        { tex: R`\hat g_{ij}(\hat x)=a^2(\hat t)\left(\delta_{ij}[1+2\hat D]-2\hat E_{,ij}\right),\qquad a^2(\hat t)=a^2(t)\left(1+2H\zeta\right)`, why: R`关键一步：新度规的**背景部分**要在新时间 $\hat t=t+\zeta$ 处取值。` },
        { tex: R`a^2\left(\delta_{ij}[1+2\hat D+2H\zeta]-2\hat E_{,ij}+2\xi_{,ij}\right)=a^2\left(\delta_{ij}[1+2D]-2E_{,ij}\right)`, why: R`比较 $\delta_{ij}$ 项与 $_{,ij}$ 项，即得 $\hat D=D-H\zeta$、$\hat E=E+\xi$。` },
      ]} />
      <Tx>{R`你可以在习题 6.2 中证明这些关系。\eqref{6.17}–\eqref{6.18} 描述了带小标量扰动的度规在小的标量坐标变换下怎样变化。正如分解定理所预期的，这种坐标变换**没有**产生任何非标量的度规扰动，结果仍可用 $A$、$B$、$D$、$E$ 表示。

**只剩两个物理自由度。**总结一下：描述标量度规扰动有 4 个函数，但它们可以被另外两个刻画标量坐标变换的函数（$\zeta$、$\xi$）操纵。例如从一个 $E\neq0$ 的度规出发，很容易通过变换消去 $E$：只要取 $\xi=-E$，新度规就有 $\hat E=0$。因此描述标量度规扰动的物理自由度其实只有 $4-2=2$ 个。这正是我们在共形牛顿规范中能消去 $B$ 和 $E$ 的原因。

也可以取度规扰动的特定线性组合，使它们在 \eqref{6.17}–\eqref{6.18} 下不变；独立的这种组合恰好也是两个。最常用的是 **Bardeen（1980）**的选择：`}</Tx>
      <Eq n="6.19" keyEq title="Bardeen 规范不变势" say="两个对任意小坐标变换都不变的组合：$\Phi_A$ 是“规范修正后的时间扰动”，$\Phi_H$ 是“规范修正后的空间曲率扰动”；共形牛顿规范中它们就是 $\Psi$ 与 $-\Phi$。">{R`\begin{aligned}\Phi_A &\equiv A+\frac1a\frac{\partial}{\partial\eta}[a(E'-B)],\\ \Phi_H &\equiv-D+aH(B-E').\end{aligned}`}</Eq>
      <Derivation title={R`验证 $\Phi_A$、$\Phi_H$ 规范不变（习题 6.2 后半）`} collapsed steps={[
        { tex: R`\hat E'-\hat B=E'+\xi'-B+\frac{\zeta}{a}-\xi'=E'-B+\frac{\zeta}{a}`, why: R`由 \eqref{6.18}：$\xi'$ 恰好抵消。` },
        { tex: R`\hat\Phi_A=A-\frac{\zeta'}{a}+\frac1a\frac{\partial}{\partial\eta}\left[a(E'-B)+\zeta\right]=A+\frac1a\frac{\partial}{\partial\eta}[a(E'-B)]=\Phi_A`, why: R`$\frac1a\partial_\eta\zeta=\zeta'/a$ 抵消 \eqref{6.17} 中的 $-\zeta'/a$。` },
        { tex: R`\hat\Phi_H=-D+H\zeta+aH\left(B-E'-\frac{\zeta}{a}\right)=-D+aH(B-E')=\Phi_H`, why: R`$\hat D=D-H\zeta$ 带来的 $+H\zeta$ 与 $aH\cdot(-\zeta/a)$ 抵消。` },
      ]} />
      <Tx>{R`在 $E=B=0$ 的共形牛顿规范中，$\Phi_A=\Psi$，$\Phi_H=-\Phi$。这些不变量非常有用：如果方程在某个特定规范中简化，就可以在那个规范中计算，组成规范不变量，再把它们换算成任何其他规范中的扰动。我们将在 §7.4.3 正是这样做。换句话说，$\Phi_A$ 和 $\Phi_H$ 是在规范之间转换的便捷"捷径"。`}</Tx>
      <Box kind="example" title="交互：同一个模式，三种规范（编者补充）">
        <Tx>{R`下图取物质主导宇宙中的一个标量模式，它在共形牛顿规范中 $\Psi=-\Phi=$ 常数。拖动坐标变换参数，看 $A,B,D,E$ 怎样随规范变化，而 Bardeen 不变量始终不变。三个按钮分别跳到共形牛顿、空间平坦（$D=E=0$）与同步（$A=B=0$）规范。`}</Tx>
        <GaugeBars />
      </Box>
      <Tx>{R`**能动张量也一样。**以上数学推导并不专属于度规：\eqref{6.13} 同样适用于两个下指标的能动张量 $T_{\mu\nu}$。对共形牛顿规范中的物质，$T_{\mu\nu}$ 的扰动被归结为每种成分 $s$ 的两个标量自由度：密度扰动 $\delta_s$ 与纵向速度 $u_s$。

**超越标量。**最后，跳出标量扰动，我们已经能猜到会发生什么：坐标变换现在多了一个自由度——空间坐标变换中的一个**横向矢量** $\xi^i$。它允许我们把两个矢量度规扰动 $B_i$ 或 $V_i$ 之一设为零，从而把矢量自由度从 4 个减到 2 个。我们还可以（正确地）猜到：标量型或矢量型的小坐标变换都不改变张量扰动 $${hT}_{ij}$——**它在线性阶上是规范不变的**。数自由度也说得通：扰动度规起初有 10 个自由度，坐标变换 \eqref{6.8}（推广到含横向 $\xi^i$ 后共 4 个函数）可去掉其中 4 个，剩下 6 个——标量、矢量、张量各 2 个。`}</Tx>
    </Sec>);
}
