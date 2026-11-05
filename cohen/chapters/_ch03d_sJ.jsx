// 补充材料 J_III：Schrödinger 方程的传播子（式 JIII-1 … JIII-30）
import { Sec, Sub, Tx, Eq, FormulaMap, Box, Derivation, C } from "@kit";
import { FM_JIII_21, FM_JIII_22, FM_JIII_27 } from "./_ch03d_fmaps.jsx";
import { PropagatorPlot, CornuPlot } from "./_ch03d_plots.jsx";
import { HuygensFig, PathFig } from "./_ch03d_figs.jsx";

const R = String.raw;
const TH = R`\sym{heav}{\theta}`;     // 阶跃函数
const DL = R`\sym{dirac}{\delta}`;    // Dirac δ
const NN = R`\sym{Nnorm}{N}`;         // (30) 的归一化常数

export function SecJ() {
  return (
    <Sec n="JIII" title="Propagator for the Schrödinger equation" zh="Schrödinger 方程的传播子"
      gist={R`把 Schrödinger 方程"积分"一次：$t_2$ 时刻的波函数等于 $t_1$ 时刻波函数与传播子 $K(2,1)$ 的卷积。$K$ 就是演化算符的位置矩阵元（乘上阶跃函数），可以用定态展开，满足以 $\delta$ 函数为源的方程（Green 函数）；再把时间切成许多小段，$K$ 变成对一切时空路径的振幅求和——Feynman 的表述，经典极限下退化为最小作用量原理。`}
      why={R`正文的演化规律是微分形式的（"下一瞬间怎样变"）。很多问题更需要整体形式："从这里出发，过一段有限时间到那里的振幅是多少"。传播子就是这个振幅，它也是第 XI 章微扰论与路径积分表述的起点。`}
      gives={["JIII-1", "JIII-6", "JIII-18", "JIII-22", "JIII-27", "JIII-30"]}>
      <p className="muted">本节概念：<C id="propagator" /> · <C id="path_sum" /></p>

      <Sub n="JIII-1" title="Introduction" zh="引言：从“下一瞬间”到“有限时间之后”">
        <Tx>{R`**两种描述演化的方式。**Schrödinger 方程告诉我们 $\partial\psi/\partial t$——也就是说，只要知道此刻的 $\psi(\mathbf r,t)$，就知道它在无限短时间之后怎样变化。要得到有限时间后的波函数，就得一步一步地积分下去。能不能跳过中间过程，直接写出"$t$ 时刻在 $\mathbf r_0$ 点的值"与"更早的 $t'$ 时刻整个波函数"之间的关系？

电磁学里这两种写法早就并存：一边是 Maxwell 方程，告诉你场在每一点"怎么变"；另一边是 Huygens–Fresnel 原理，直接告诉你"结果是什么"——只要知道某个曲面 $\Sigma$ 上的单色场，就能把 $\Sigma$ 上的每一点 $N_1,N_2,\dots$ 当作一个虚构的点波源（它的强弱和相位照抄该点的场值），观察点 $M$ 的场就是这些点波源的贡献之和。后者并不是新的物理，只是把前者积分了一次。

本补充材料要说明量子力学里也有一条"Huygens 原理"：当 $t_2>t_1$ 时`}</Tx>
        <Eq n="JIII-1" keyEq title="传播子的定义式" say={R`$t_2$ 时刻在 $\mathbf r_2$ 处的振幅，是 $t_1$ 时刻所有位置 $\mathbf r_1$ 上的振幅各自乘以“从 $\mathbf r_1$ 传到 $\mathbf r_2$”的传播子后的总和。`}>{R`\psi(\mathbf r_2,t_2)=\int\mathrm d^3r_1\,K(\mathbf r_2,t_2;\mathbf r_1,t_1)\,\psi(\mathbf r_1,t_1)`}</Eq>
        <Tx>{R`**怎样读这个式子。**把 $t=t_1$ 时刻的整个空间看成"次级波源"所在的曲面：每一点 $(\mathbf r_1,t_1)$ 都向后来的时刻"辐射"，强度与相位正比于该点的振幅 $\psi(\mathbf r_1,t_1)$；从 $(\mathbf r_1,t_1)$ 到 $(\mathbf r_2,t_2)$ 的这一份贡献由权重 $K$ 决定。$\mathbf r_2$ 处最终的振幅是所有这些贡献的相干叠加。权重函数 $K$ 叫做 Schrödinger 方程的**传播子**（propagator）。

接下来要做三件事：证明 \eqref{JIII-1} 成立并找出 $K$ 的表达式（§2）；看它满足什么方程；最后非常定性地说明，整个量子力学可以反过来以 $K$ 为出发点来表述——这就是 Feynman 的 Lagrange 表述（§3）。`}</Tx>
        <HuygensFig />
      </Sub>

      <Sub n="JIII-2" title={R`Existence and properties of a propagator $K(2,1)$`} zh={R`传播子 $K(2,1)$ 的存在与性质`}>
        <h4 id="sec-JIII-2-a">2-a 先找到它：演化算符的位置矩阵元</h4>
        <Tx>{R`我们要的是两个不同时刻的态之间的直接联系，而这正是 \IIIc{FIII} 引入的演化算符 $U(t_2,t_1)$ 的定义：`}</Tx>
        <Eq n="JIII-2" say={R`演化算符把 $t_1$ 时刻的态直接送到 $t_2$ 时刻的态。`}>{R`|\psi(t_2)\rangle=U(t_2,t_1)|\psi(t_1)\rangle`}</Eq>
        <Tx>{R`波函数不过是态矢量在位置表象中的分量：`}</Tx>
        <Eq n="JIII-3" say={R`$t_2$ 时刻的波函数就是 $|\psi(t_2)\rangle$ 在 $|\mathbf r_2\rangle$ 上的投影。`}>{R`\psi(\mathbf r_2,t_2)=\langle\mathbf r_2|\psi(t_2)\rangle`}</Eq>
        <Tx>{R`于是只剩一个技巧：把 \eqref{JIII-2} 代入 \eqref{JIII-3}，在 $U$ 与 $|\psi(t_1)\rangle$ 之间插入位置表象的封闭关系`}</Tx>
        <Eq n="JIII-4" say={R`位置本征态构成完备基：对所有 $|\mathbf r_1\rangle\langle\mathbf r_1|$ 积分得到单位算符。`}>{R`\int\mathrm d^3r_1\,|\mathbf r_1\rangle\langle\mathbf r_1|=\mathbb 1`}</Eq>
        <Tx>{R`就得到`}</Tx>
        <Eq n="JIII-5" say={R`插入完备基后，$t_2$ 时刻的波函数写成了 $t_1$ 时刻波函数的积分，积分核是 $U$ 的位置矩阵元。`}>{R`\begin{aligned}\psi(\mathbf r_2,t_2)&=\int\mathrm d^3r_1\,\langle\mathbf r_2|U(t_2,t_1)|\mathbf r_1\rangle\,\langle\mathbf r_1|\psi(t_1)\rangle\\&=\int\mathrm d^3r_1\,\langle\mathbf r_2|U(t_2,t_1)|\mathbf r_1\rangle\,\psi(\mathbf r_1,t_1)\end{aligned}`}</Eq>
        <Tx>{R`和 \eqref{JIII-1} 一比，传播子原来就是 $\langle\mathbf r_2|U(t_2,t_1)|\mathbf r_1\rangle=K(\mathbf r_2,t_2;\mathbf r_1,t_1)$。还剩一个约定：\eqref{JIII-1} 只打算用于 $t_2>t_1$，我们干脆规定 $t_2<t_1$ 时 $K=0$。精确的定义于是是`}</Tx>
        <Eq n="JIII-6" keyEq title="推迟传播子" say={R`传播子 = 演化算符在两个位置本征态之间的矩阵元，再乘上只在 $t_2>t_1$ 时为 1 的阶跃函数（因此称“推迟”传播子）。`}>{R`K(\mathbf r_2,t_2;\mathbf r_1,t_1)=\langle\mathbf r_2|U(t_2,t_1)|\mathbf r_1\rangle\,${TH}(t_2-t_1)`}</Eq>
        <Tx>{R`其中 $${TH}$ 是阶跃函数（step function）：`}</Tx>
        <Eq n="JIII-7" say={R`阶跃函数：时间差为正时取 1，为负时取 0。`}>{R`\begin{aligned}&${TH}(t_2-t_1)=1\quad\text{若}\ t_2>t_1\\&${TH}(t_2-t_1)=0\quad\text{若}\ t_2<t_1\end{aligned}`}</Eq>
        <Tx>{R`**为什么要多此一举乘上 $${TH}$？**物理上，它让 $t=t_1$ 面上的次级波源只向未来"辐射"——因果性被写进了 $K$ 的定义，所以这样定义的 $K$ 称为**推迟传播子**（retarded propagator）。数学上，正是这个因子使 $K$ 满足一个右边为 $\delta$ 函数的偏微分方程（下面 2-d），也就是 Green 函数的定义方程。`}</Tx>
        <Box kind="note" title="两点附注">{R`(i) 式 \eqref{JIII-5} 本身对 $t_2<t_1$ 也成立（$U$ 可以向过去演化）；数学上也可以定义一个只在 $t_2<t_1$ 时非零的"超前"传播子，它同样满足 Green 函数的方程。但在现阶段它没有清楚的物理意义，这里不讨论。(ii) 不致混淆时，把 $K(\mathbf r_2,t_2;\mathbf r_1,t_1)$ 简写为 $K(2,1)$。`}</Box>

        <h4 id="sec-JIII-2-b">2-b K(2,1) 是什么振幅</h4>
        <Tx>{R`从定义 \eqref{JIII-6} 直接读出含义：设 $t_1$ 时粒子处在定域于 $\mathbf r_1$ 的态，`}</Tx>
        <Eq n="JIII-8" say={R`初态取为位置本征态：粒子在 $t_1$ 时刻“恰好”在 $\mathbf r_1$。`}>{R`|\psi(t_1)\rangle=|\mathbf r_1\rangle`}</Eq>
        <Tx>{R`则 $t_2$ 时刻`}</Tx>
        <Eq n="JIII-9" say={R`这个定域初态经演化算符作用后的 $t_2$ 时刻的态。`}>{R`|\psi(t_2)\rangle=U(t_2,t_1)|\psi(t_1)\rangle=U(t_2,t_1)|\mathbf r_1\rangle`}</Eq>
        <Tx>{R`在 $\mathbf r_2$ 找到粒子的概率振幅是`}</Tx>
        <Eq n="JIII-10" say={R`从 $\mathbf r_1$ 出发、$t_2$ 时刻在 $\mathbf r_2$ 被找到的振幅，恰好就是 $U$ 的矩阵元，即 $t_2>t_1$ 时的传播子。`}>{R`\langle\mathbf r_2|\psi(t_2)\rangle=\langle\mathbf r_2|U(t_2,t_1)|\mathbf r_1\rangle`}</Eq>
        <Tx>{R`所以 $K(2,1)$ 是"$t_1$ 时从 $\mathbf r_1$ 出发的粒子，在更晚的 $t_2$ 时到达 $\mathbf r_2$"的概率振幅。\eqref{JIII-1} 于是有了一目了然的读法：一般的初态是定域态的叠加，每一项各自传播，最后按振幅叠加。`}</Tx>

        <h4 id="sec-JIII-2-c">2-c 用 H 的本征态把 K 写出来</h4>
        <Tx>{R`对时间无关的 Hamilton 量，演化算符是已知的，于是 $K$ 可以显式写出。设`}</Tx>
        <Eq n="JIII-11" say={R`$|\varphi_n\rangle$ 是 Hamilton 量的本征态（定态），本征值为能量 $E_n$。`}>{R`H|\varphi_n\rangle=E_n|\varphi_n\rangle`}</Eq>
        <Tx>{R`由 \IIIcref{FIII-18}，`}</Tx>
        <Eq n="JIII-12" say={R`Hamilton 量不显含时间时，演化算符是 $H$ 的指数函数。`}>{R`U(t_2,t_1)=\mathrm e^{-iH(t_2-t_1)/\hbar}`}</Eq>
        <Tx>{R`指数函数作用在 $H$ 的本征态上只是乘一个数，所以最自然的做法是在右边插入 $\{|\varphi_n\rangle\}$ 的封闭关系`}</Tx>
        <Eq n="JIII-13" say={R`定态构成完备基：所有投影算符之和是单位算符。`}>{R`\sum_n|\varphi_n\rangle\langle\varphi_n|=\mathbb 1`}</Eq>
        <Eq n="JIII-14" say={R`在演化算符右边乘上单位算符，为下一步让指数函数作用到本征态上做准备。`}>{R`U(t_2,t_1)=\mathrm e^{-iH(t_2-t_1)/\hbar}\sum_n|\varphi_n\rangle\langle\varphi_n|`}</Eq>
        <Eq n="JIII-15" say={R`演化算符的谱分解：每个定态只获得自己的相位因子 $\mathrm e^{-iE_n(t_2-t_1)/\hbar}$。`}>{R`U(t_2,t_1)=\sum_n\mathrm e^{-iE_n(t_2-t_1)/\hbar}|\varphi_n\rangle\langle\varphi_n|`}</Eq>
        <Tx>{R`取 $\langle\mathbf r_2|\cdots|\mathbf r_1\rangle$ 矩阵元并乘上 $${TH}(t_2-t_1)$。用到`}</Tx>
        <Eq n="JIII-16" say={R`定态在 $\mathbf r_2$ 处的波函数。`}>{R`\langle\mathbf r_2|\varphi_n\rangle=\varphi_n(\mathbf r_2)`}</Eq>
        <Eq n="JIII-17" say={R`把左右颠倒得到复共轭的波函数。`}>{R`\langle\varphi_n|\mathbf r_1\rangle=\varphi_n^*(\mathbf r_1)`}</Eq>
        <Tx>{R`得到传播子的**谱表示**：`}</Tx>
        <Eq n="JIII-18" keyEq title="传播子的定态展开" say={R`传播子是所有定态的叠加：在 $\mathbf r_1$ 处取共轭波函数、在 $\mathbf r_2$ 处取波函数，再乘以各自的能量相位因子；阶跃函数保证只向未来传播。`}>{R`K(\mathbf r_2,t_2;\mathbf r_1,t_1)=${TH}(t_2-t_1)\sum_n\varphi_n^*(\mathbf r_1)\varphi_n(\mathbf r_2)\,\mathrm e^{-iE_n(t_2-t_1)/\hbar}`}</Eq>
        <Tx>{R`**例：自由粒子。**下面这个具体例子原书没有算，但它把上面的公式变成了能看见的东西。一维自由粒子的"定态"是平面波 $\mathrm e^{ikx}/\sqrt{2\pi}$，能量 $\hbar^2k^2/2m$，\eqref{JIII-18} 中的求和换成对 $k$ 的积分，是一个 Gauss 型积分：`}</Tx>
        <Derivation title="自由粒子传播子（一维）" collapsed steps={[
          { tex: R`K(x_2,t_2;x_1,t_1)=\frac{${TH}(t)}{2\pi}\int\mathrm dk\,\mathrm e^{ik(x_2-x_1)}\,\mathrm e^{-i\hbar k^2t/2m},\qquad t\equiv t_2-t_1`, why: R`在 \eqref{JIII-18} 中取 $\varphi_k(x)=\mathrm e^{ikx}/\sqrt{2\pi}$，$\sum_n\to\int\mathrm dk$。` },
          { tex: R`-\frac{i\hbar t}{2m}\Big(k-\frac{m(x_2-x_1)}{\hbar t}\Big)^2+\frac{im(x_2-x_1)^2}{2\hbar t}`, why: "对指数配方。" },
          { tex: R`\int\mathrm dk\,\mathrm e^{-i\hbar tk^2/2m}=\sqrt{\frac{2\pi m}{i\hbar t}}`, why: R`复 Gauss 积分（把 $i$ 理解为 $i+0^+$ 的极限，与 \Ic{GI} 的处理相同）。` },
          { tex: R`K=${TH}(t)\sqrt{\frac{m}{2\pi i\hbar t}}\;\exp\Big[\frac{im(x_2-x_1)^2}{2\hbar t}\Big]`, why: "合起来。注意指数里正好是经典作用量 $S_{cl}=m(x_2-x_1)^2/2t$ 除以 $\\hbar$——§3 会回到这一点。" },
        ]} />
        <Tx>{R`把它代回 \eqref{JIII-1}，对一个初始高斯波包做数值卷积，就应当得到 \Ic{GI} 中解析算出的结果——包括群速度运动与扩散。下面的交互图就是这样一次核对：曲线是用 $K$ 一格一格地积分出来的，圆点是解析解。`}</Tx>
        <PropagatorPlot />

        <h4 id="sec-JIII-2-d">2-d K 满足的方程：Green 函数</h4>
        <Tx>{R`**思路。**每一项 $\varphi_n(\mathbf r_2)\mathrm e^{-iE_nt_2/\hbar}$ 都是 Schrödinger 方程的解；\eqref{JIII-18} 是它们的叠加，若没有阶跃函数，$K$ 也会是 Schrödinger 方程的解。所以把 Schrödinger 算符作用到 $K$ 上，唯一"漏网"的就是对 $${TH}$ 求导产生的项。具体地，在 $\{|\mathbf r\rangle\}$ 表象中`}</Tx>
        <Eq n="JIII-19" say={R`每个定态乘上自己的时间相位因子，都精确满足 Schrödinger 方程（$\boldsymbol\nabla_2$ 只作用于 $\mathbf r_2$）。`}>{R`\Big[i\hbar\frac{\partial}{\partial t_2}-H\Big(\mathbf r_2,\frac{\hbar}{i}\boldsymbol\nabla_2\Big)\Big]\varphi_n(\mathbf r_2)\mathrm e^{-iE_nt_2/\hbar}=0`}</Eq>
        <Tx>{R`这里 $\boldsymbol\nabla_2$ 是 $\partial/\partial x_2,\partial/\partial y_2,\partial/\partial z_2$ 三个算符的简写。把同一个算符（只作用于 $\mathbf r_2$ 与 $t_2$）作用到 \eqref{JIII-18} 两边。对时间求导时，阶跃函数的导数是 $\delta$ 函数（附录 II 式 (44)）：`}</Tx>
        <Eq n="JIII-20" say={R`阶跃函数的导数是 Dirac $\delta$ 函数：它只在跳变的那一瞬间有贡献。`}>{R`\frac{\partial}{\partial t_2}\,${TH}(t_2-t_1)=${DL}(t_2-t_1)`}</Eq>
        <Tx>{R`其余部分按 \eqref{JIII-19} 全部消去，只剩`}</Tx>
        <FormulaMap n="JIII-21" say={R`Schrödinger 算符作用到传播子上，只剩阶跃函数求导产生的那一项。`} tree={FM_JIII_21} start="delta" />
        <Tx>{R`有了 $${DL}(t_2-t_1)$，求和中的 $t_2-t_1$ 可以直接换成 0，指数因子变成 1；剩下的 $\sum_n\varphi_n(\mathbf r_2)\varphi_n^*(\mathbf r_1)$ 正是封闭关系 \eqref{JIII-13} 夹在 $\langle\mathbf r_2|$ 与 $|\mathbf r_1\rangle$ 之间（配合 \eqref{JIII-16}、\eqref{JIII-17}），等于 $${DL}(\mathbf r_2-\mathbf r_1)$。最终`}</Tx>
        <FormulaMap n="JIII-22" keyEq title="传播子是 Green 函数" say={R`传播子满足右边为四维 $\delta$ 函数（时间 $\delta$ 乘空间 $\delta$）的 Schrödinger 方程：它就是 Schrödinger 算符的 Green 函数。`} tree={FM_JIII_22} start="K" />
        <Tx>{R`右边正比于一个四维"$\delta$ 函数"的方程，其解称为 **Green 函数**。光有 \eqref{JIII-22} 还不能唯一确定 $K$（可以加上任意一个齐次解）；可以证明，补上边界条件`}</Tx>
        <Eq n="JIII-23" say={R`因果条件：$t_2$ 早于 $t_1$ 时传播子为零。它挑出 \eqref{JIII-22} 的唯一解——推迟 Green 函数。`}>{R`K(\mathbf r_2,t_2;\mathbf r_1,t_1)=0\qquad\text{若}\ t_2<t_1`}</Eq>
        <Tx>{R`就把 $K(2,1)$ 完全确定了。\eqref{JIII-22}–\eqref{JIII-23} 在第 XI 章的微扰论中会派上大用场。`}</Tx>
        <Box kind="physics" title="对照电磁学">{R`静电学里点电荷的势 $1/4\pi\varepsilon_0|\mathbf r-\mathbf r'|$ 是 Poisson 方程的 Green 函数：任意电荷分布的势是它与电荷密度的卷积。\eqref{JIII-1} 与 \eqref{JIII-22} 是完全相同的结构——"源"换成了初始时刻的波函数，"点源"换成了在 $(\mathbf r_1,t_1)$ 处突然出现的粒子。`}</Box>
      </Sub>

      <Sub n="JIII-3" title="Lagrangian formulation of quantum mechanics" zh="量子力学的 Lagrange 表述">
        <h4 id="sec-JIII-3-a">3-a 时空路径</h4>
        <Tx>{R`在"时间–空间"图上（横轴为 $t$，纵轴代表三个空间坐标）标出两点 $(\mathbf r_1,t_1)$、$(\mathbf r_2,t_2)$。在两者之间等间隔地插入 $N$ 个中间时刻 $t_{\alpha_i}$（$i=1,2,\dots,N$）：`}</Tx>
        <Eq n="JIII-24" say={R`把时间区间 $[t_1,t_2]$ 等分，插入 $N$ 个中间时刻。`}>{R`t_1<t_{\alpha_1}<t_{\alpha_2}<\dots<t_{\alpha_{N-1}}<t_{\alpha_N}<t_2`}</Eq>
        <Tx>{R`并在每个中间时刻任意指定一个位置 $\mathbf r_{\alpha_i}$。$N\to\infty$ 时，这串点连成一个函数 $\mathbf r(t)$（假定连续），两端固定：`}</Tx>
        <Eq n="JIII-25a" say={R`路径从 $t_1$ 时刻的 $\mathbf r_1$ 出发。`}>{R`\mathbf r(t_1)=\mathbf r_1`}</Eq>
        <Eq n="JIII-25b" say={R`路径在 $t_2$ 时刻到达 $\mathbf r_2$。`}>{R`\mathbf r(t_2)=\mathbf r_2`}</Eq>
        <Tx>{R`这样的 $\mathbf r(t)$ 叫做 $(\mathbf r_1,t_1)$ 与 $(\mathbf r_2,t_2)$ 之间的一条**时空路径**——可以想象成一个"质点"的轨迹，只是它完全不必满足任何运动方程。`}</Tx>
        <PathFig />

        <h4 id="sec-JIII-3-b">3-b K(2,1) 分解为部分振幅之和</h4>
        <Tx>{R`先让 $N$ 有限。演化算符有"分段"性质（\IIIcref{FIII-10}）：从 $t_1$ 到 $t_2$ 的演化等于依次经过各中间时刻的演化之积，`}</Tx>
        <Eq n="JIII-26" say={R`整段演化 = 各小段演化的乘积（从右往左按时间先后排列）。`}>{R`U(t_2,t_1)=U(t_2,t_{\alpha_N})\,U(t_{\alpha_N},t_{\alpha_{N-1}})\dots U(t_{\alpha_2},t_{\alpha_1})\,U(t_{\alpha_1},t_1)`}</Eq>
        <Tx>{R`两边取 $\langle\mathbf r_2|\cdots|\mathbf r_1\rangle$，并在每个中间时刻插入位置表象的封闭关系。由 \eqref{JIII-6} 与 \eqref{JIII-24}（各段时间差都为正，阶跃函数都等于 1）得到`}</Tx>
        <FormulaMap n="JIII-27" keyEq title="传播子的复合律" say={R`从 1 到 2 的传播子，等于先传到每个中间时刻的每一个可能位置、再一段段接下去，并对所有中间位置积分。`} tree={FM_JIII_27} start="ints" />
        <Tx>{R`被积函数中的乘积`}</Tx>
        <Eq n="JIII-28" say={R`沿一串指定的中间点依次传播的振幅：粒子从 1 出发，依次经过各个 $(\mathbf r_{\alpha_i},t_{\alpha_i})$，最后到达 2。`}>{R`K(2,\alpha_N)\,K(\alpha_N,\alpha_{N-1})\dots K(\alpha_2,\alpha_1)\,K(\alpha_1,1)`}</Eq>
        <Tx>{R`把 2-b 的解释推广一步：\eqref{JIII-28} 是粒子从点 1 出发、依次经过图上所有点 $\alpha_i(\mathbf r_{\alpha_i},t_{\alpha_i})$、最后到达点 2 的概率振幅；\eqref{JIII-27} 则对每个中间时刻的一切可能位置求和。

现在（不追求数学严格）令 $N\to\infty$：一串点 $\alpha_i$ 就是一条时空路径，乘积 \eqref{JIII-28} 就是"粒子沿这条路径走"的振幅；对每个时刻所有位置的积分，就变成了对**所有路径**的求和（实际上是一个无穷维积分）。结论：$K(2,1)$ 是从 1 到 2 的一切时空路径上的振幅的**相干叠加**。`}</Tx>
        <Box kind="warning" title="“经过所有中间点”不等于“沿某条路径走”">{R`\eqref{JIII-27} 并不是说粒子"真的"沿某条路径运动、只是我们不知道是哪一条——那样应当把**概率**相加。这里相加的是**振幅**，不同路径之间会干涉；这与双缝实验中不能说光子"走了哪条缝"是同一回事。`}</Box>

        <h4 id="sec-JIII-3-c">3-c Feynman 的假设</h4>
        <Tx>{R`传播子与时空路径的概念允许我们换一种方式陈述"物理系统怎样随时间演化"这条假设。以无自旋粒子为例：直接把 $K(2,1)$ **定义**为粒子 $t_1$ 时从 $\mathbf r_1$ 出发、$t_2$ 时到达 $\mathbf r_2$ 的概率振幅，然后假设：

(i) $K(2,1)$ 是无穷多个部分振幅之和，连接 $(\mathbf r_1,t_1)$ 与 $(\mathbf r_2,t_2)$ 的每一条时空路径贡献一个；

(ii) 路径 $\Gamma$ 的部分振幅 $K_\Gamma(2,1)$ 这样确定：先沿 $\Gamma$ 计算**经典作用量**（classical action）`}</Tx>
        <Eq n="JIII-29" say={R`一条路径的作用量：沿这条路径对粒子的 Lagrange 量积分。`}>{R`S_\Gamma=\int_{(\Gamma)}\mathcal L(\mathbf r,\dot{\mathbf r},t)\,\mathrm dt`}</Eq>
        <Box kind="warning" title={R`勘误：Lagrange 量的自变量`}>{R`原书 (29) 把 Lagrange 量写成 $\mathcal L(\mathbf r,\mathbf p,t)$。Lagrange 量是坐标、**速度**与时间的函数（附录 III），沿路径计算作用量时用的是 $\dot{\mathbf r}=\mathrm d\mathbf r/\mathrm dt$；对质量为 $m$、势能为 $V$ 的粒子，$\mathcal L=\frac12m\dot{\mathbf r}^2-V(\mathbf r,t)$。这里改写为 $\mathcal L(\mathbf r,\dot{\mathbf r},t)$。`}</Box>
        <Tx>{R`$\mathcal L$ 是粒子的 Lagrange 量（附录 III）。部分振幅是`}</Tx>
        <Eq n="JIII-30" keyEq title="Feynman 的路径振幅" say={R`每条路径贡献一个模相同的振幅，相位等于这条路径的作用量除以 $\hbar$。`}>{R`K_\Gamma(2,1)=${NN}\,\mathrm e^{\frac i\hbar S_\Gamma}`}</Eq>
        <Tx>{R`$${NN}$ 是归一化常数（可以显式定出）。可以证明，从这两条假设出发能推出 Schrödinger 方程，也能推出 $\mathbf R$ 与 $\mathbf P$ 各分量之间的正则对易关系。因此它们构成与第 III 章**等价**而形式不同的量子力学表述。

一个小小的自洽检验：上面算出的自由粒子传播子正比于 $\mathrm e^{iS_{cl}/\hbar}$，$S_{cl}=m(x_2-x_1)^2/2(t_2-t_1)$ 恰是经典直线运动的作用量。自由粒子的作用量是路径偏离量的二次函数，路径求和是 Gauss 积分，结果"刚好"只留下经典路径的相位。`}</Tx>

        <h4 id="sec-JIII-3-d">3-d 经典极限与 Hamilton 原理</h4>
        <Tx>{R`**问题：**既然每条路径的振幅模都一样，粒子为什么在宏观上"只走一条路"？答案全在相位 $S_\Gamma/\hbar$ 上。

**宏观情形意味着什么。**对宏观粒子，作用量是 $\hbar$ 的天文数字倍。把路径稍微扭一下，作用量的**相对**变化 $\Delta S_\Gamma/S_\Gamma$ 也许微不足道，但**绝对**变化 $\Delta S_\Gamma$ 仍然比 $\hbar$ 大得多——相位已经转了很多圈。一般位置上的一束相邻路径因此相位杂乱，叠加起来几乎为零。

**哪里不抵消。**例外只发生在 $S$ 对路径的一阶变分为零的地方——作用量**稳定**的路径 $\Gamma_0$。在它附近，路径变形只引起二阶的作用量变化，一整束路径的相位几乎一致，于是相长叠加。所以 $S\gg\hbar$ 时计算 $K(2,1)$，只需保留 $\Gamma_0$ 和紧挨着它的路径（"准经典"近似），说"粒子沿 $\Gamma_0$ 从 1 走到 2"也就有了意义。对照经典力学：Hamilton 原理恰好把真实轨道定义为作用量取极值（通常为极小）的路径——两者是同一条。

**结论与图像。**最小作用量原理不必作为经典力学的公理，它是 Feynman 假设在 $\hbar\to0$ 下的推论；与粒子相联系的波"同时试探"所有路径，干涉替它挑出了作用量稳定的那一条。下面的交互图让你亲手调 $\hbar$，看这个筛选怎样发生。`}</Tx>
        <CornuPlot />
        <Tx>{R`**这种表述的得失。**它天然地在时空中推理，所以很容易推广到相对论；它也适用于任何由变分原理支配的经典系统（不限于力学，例如场）。代价是数学上的困难：对无穷多条路径求和、$N\to\infty$ 的极限都需要小心定义。`}</Tx>
      </Sub>
    </Sec>);
}
