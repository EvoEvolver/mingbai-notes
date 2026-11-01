// §7.4 扩散方程的解析解、§7.5 本征扩散系数——式 (7.10)–(7.28)，图 7.8–7.14，表 7.2
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, Table, Details, C } from "@kit";
import { Fig78, Fig710, Fig711 } from "./_ch07_figs.jsx";
import { EvolutionPlot, ArrheniusPlot, FickCalc } from "./_ch07_plots.jsx";

const R = String.raw;

export function Sec74() {
  return (
    <Sec n="7.4" title="Analytic Solutions of the Diffusion Equation" zh="扩散方程的解析解"
      gist={R`常 $D$ 下按边界条件得到四个经典解：稳态线性解；$\delta$ 尖峰 → 高斯（无限介质与表面，后者剂量恒定、表面浓度 $\propto1/\sqrt t$）；无限源 → erfc（无限介质与恒定表面浓度，后者剂量 $\propto\sqrt t$）。`}
      why={R`这两类解——"推进"的高斯与"预淀积"的 erfc——是工艺设计的基本语言；它们只通过 $Dt$ 依赖温度与时间，扩散长度 $2\sqrt{Dt}$ 由此而来。`}
      gives={["7.14", "7.15", "7.16", "7.25", "7.26", "7.27"]}>
      <p className="muted">本节概念：<C id="gaussian" /> · <C id="erfc" /> · <C id="diff_length" /></p>

      <Sub n="7.4.1" title="Steady-State Solution" zh="稳态解（C 与时间无关）">
        <Tx>{R`最简单的情形：稳态，浓度不随时间变化。于是 \eqref{7.8} 左边为零：`}</Tx>
        <Eq n="7.10" say="稳态时浓度分布没有曲率：任何弯曲都会被扩散抹平，只剩下直线。">{R`D\left(\frac{\partial^2 C}{\partial x^2}\right) = 0`}</Eq>
        <Tx>{R`积分两次，`}</Tx>
        <Eq n="7.11" say="稳态扩散的浓度沿深度线性变化，两个常数由两端的边界浓度决定；通量处处相同。">{R`C = a + bx`}</Eq>
        <Tx>{R`稳态下浓度随距离线性变化，通量 $F=-Db$ 处处相等。第 6 章解氧化剂在氧化层中的扩散时用的正是它（图 6.9 中线性的氧化剂分布）。硅工艺中更有用的是另外两类解，它们的区别全在边界条件。`}</Tx>
      </Sub>

      <Sub n="7.4.2" title="Gaussian Solution in an Infinite Medium" zh="无限介质中的高斯解">
        <Tx>{R`**设定。** 在一片轻掺杂区的中间放一个 $\delta$ 函数般的杂质尖峰（\figref{7.8}）。实际可以这样做：低温外延生长单晶硅，生长时向气氛里短暂通入杂质气体；或者在某一深度注入一个很窄的杂质峰。`}</Tx>
        <Figure n="7.8" caption={R`剂量为 $Q$ 的 $\delta$ 函数杂质被引入无限介质后扩散成高斯分布（横轴以 $2\sqrt{Dt}$ 为单位，纵轴归一到峰值；自绘）。`} illustration={<Fig78 />} />
        <Tx>{R`取尖峰处为原点，初始–边界条件为`}</Tx>
        <Eq n="7.12" say="开始时杂质全部挤在原点：原点以外浓度为零，原点处浓度无穷大——这就是 $\delta$ 函数初值。">{R`\left\{\begin{aligned} &C\to0\ \ \text{as}\ t\to0\ \ \text{for}\ |x|>0\\ &C\to\infty\ \ \text{as}\ t\to0\ \ \text{for}\ |x|=0\end{aligned}\right.`}</Eq>
        <Tx>{R`以及`}</Tx>
        <Eq n="7.13" say="杂质既不产生也不消失：任何时刻把整条分布积分起来，总量都等于最初放进去的剂量 Q。">{R`\int_{-\infty}^{+\infty} C(x,t)\,dx = Q`}</Eq>
        <Tx>{R`$Q$ 是尖峰所含杂质的总量，即**剂量**（dose）。关键在于：初始分布可近似为 $\delta$ 函数，并且引入的剂量固定、始终保持不变。满足这些条件的 Fick 第二定律的解是`}</Tx>
        <Eq n="7.14" keyEq title="无限介质中的高斯解" say="剂量固定的尖峰扩散成高斯：宽度按 $\sqrt{Dt}$ 增长，峰值按 $1/\sqrt t$ 下降，曲线下面积始终等于 Q。">{R`C(x,t) = \frac{Q}{2\sqrt{\pi Dt}}\exp\!\left(-\frac{x^2}{4Dt}\right) = C(0,t)\exp\!\left(-\frac{x^2}{4Dt}\right)`}</Eq>
        <Derivation title="直接验证 (7.14) 满足 (7.8)、(7.12) 与 (7.13)" collapsed steps={[
          { tex: R`\ln C = \ln\frac{Q}{2\sqrt{\pi D}} - \tfrac12\ln t - \frac{x^2}{4Dt}`, why: "取对数便于求导。" },
          { tex: R`\frac{\partial C}{\partial t} = C\left(-\frac{1}{2t}+\frac{x^2}{4Dt^2}\right)`, why: R`对 $t$ 求偏导。` },
          { tex: R`\frac{\partial C}{\partial x} = -\frac{x}{2Dt}\,C,\qquad \frac{\partial^2 C}{\partial x^2} = C\left(\frac{x^2}{4D^2t^2}-\frac{1}{2Dt}\right)`, why: R`对 $x$ 求两次偏导。` },
          { tex: R`D\frac{\partial^2C}{\partial x^2} = C\left(\frac{x^2}{4Dt^2}-\frac{1}{2t}\right) = \frac{\partial C}{\partial t}\ \checkmark`, why: R`满足 \eqref{7.8}。` },
          { tex: R`\int_{-\infty}^{\infty}\frac{Q}{2\sqrt{\pi Dt}}e^{-x^2/4Dt}dx = \frac{Q}{2\sqrt{\pi Dt}}\sqrt{4\pi Dt} = Q\ \checkmark`, why: R`Gauss 积分 $\int e^{-x^2/a}dx=\sqrt{\pi a}$，$a=4Dt$：剂量守恒 \eqref{7.13}。` },
          { tex: R`t\to0:\ \ C(0,t)\propto t^{-1/2}\to\infty,\quad C(x\neq0,t)\to0`, why: R`指数衰减压倒 $t^{-1/2}$，满足 \eqref{7.12}。` },
        ]} />
        <Tx>{R`**几个直接推论。** 分布关于原点对称（相当于在 $x=0$ 处放了一面镜子）。峰值 $C(0,t)$ 按 $1/\sqrt t$ 下降。在 $x=2\sqrt{Dt}$ 处，指数为 $-1$，浓度降到峰值的 $1/e$。所以 $2\sqrt{Dt}$ 是"杂质走了多远"的天然尺度，常称为**扩散长度**（diffusion length）。高斯解还有一个极好用的性质：再加热一段时间，它仍是高斯，只是 $Dt$ 变大——多步热处理的效果因此很容易计算（\secref{7.6}）。离子注入分布一阶近似就是高斯（离子停止过程的统计性），所以 \eqref{7.14} 常用来预测注入分布在后续热处理中的演化（第 8 章）。`}</Tx>
        <Figure n="7.9" caption={R`高斯扩散分布的时间演化（线性与对数坐标），横轴以 $2\sqrt{Dt_0}$ 为单位，纵轴归一到 $C(0,t_0)$。交互版：曲线由式 (7.14) 实时计算；可切换坐标并拖动 $t/t_0$。$t=4t_0$ 时峰值减半、$t=9t_0$ 时降为 1/3，与原图一致。`} illustration={<EvolutionPlot init="g" />} />
        <Box kind="physics" title="为什么宽度按 $\sqrt t$、而不是按 t 增长">{R`每个杂质原子都在做随机行走：每一步向左向右机会均等，$N$ 步后的位移平均为零，但方均位移正比于 $N$（独立随机步的方差可加）。步数正比于时间，于是典型位移 $\propto\sqrt t$——高斯的标准差正是 $\sqrt{2Dt}$。\secref{7.8} 会从平面间的跳跃显式推出 $D=\tfrac{\nu_b}{2}\Delta x^2$。工程含义：要把结深加倍，热预算 $Dt$ 得变成 4 倍。`}</Box>
      </Sub>

      <Sub n="7.4.3" title="Gaussian Solution Near a Surface" zh="表面附近的高斯解">
        <Tx>{R`**设定。** 剂量 $Q$ 引入在表面附近（\figref{7.10}）——实践中通常是低能离子注入，分布浅到与最终扩散后的分布相比可视为 $\delta$ 函数。另一个假设是退火期间没有杂质因蒸发或分凝而损失，剂量仍然固定。`}</Tx>
        <Figure n="7.10" caption={R`表面高斯扩散可以看作剂量 $2Q$ 的高斯在无限介质中扩散：表面 $x=0$ 是一面"镜子"，左侧虚线是镜像（自绘）。`} illustration={<Fig710 />} />
        <Tx>{R`**镜像法。** 杂质不能穿出表面，表面处通量为零，即 $\partial C/\partial x|_{x=0}=0$。\eqref{7.14} 关于原点对称，原点处斜率恰好为零——所以可以把表面当作反射镜：在 $x<0$ 的虚拟介质里放一个镜像尖峰，等价于在无限介质中放入剂量 $2Q$。把 \eqref{7.14} 中的 $Q$ 换成 $2Q$，只取 $x\ge0$ 一侧：`}</Tx>
        <Eq n="7.15" keyEq title="表面高斯（推进，恒定剂量）" say="表面附近的固定剂量扩散成半个高斯：因为表面不让杂质跑出去，相当于剂量加倍，所以前因子比无限介质大一倍。">{R`C(x,t) = \frac{Q}{\sqrt{\pi Dt}}\exp\!\left(-\frac{x^2}{4Dt}\right) = C(0,t)\exp\!\left(-\frac{x^2}{4Dt}\right)`}</Eq>
        <Tx>{R`表面浓度为`}</Tx>
        <Eq n="7.16" keyEq title="推进时的表面浓度" say="剂量固定时，表面浓度随时间按 $1/\sqrt t$ 下降：杂质越推越深，表面就越淡。">{R`C(0,t) = \frac{Q}{\sqrt{\pi Dt}}`}</Eq>
        <Tx>{R`它随时间下降。实际中这些边界条件未必成立：杂质常会分凝进沉积或生长的氧化层（\secref{7.11}），或蒸发到气氛中，那时就要靠数值模拟。不过只要剂量是"近表面"引入（一般靠离子注入），并且退火足够久、使初始分布可近似为 $\delta$ 函数——即初始分布的宽度远小于最终的 $2\sqrt{Dt}$——\eqref{7.15} 就是一个很有用的解析解。`}</Tx>
      </Sub>

      <Sub n="7.4.4" title="Error-Function Solution in an Infinite Medium" zh="无限介质中的误差函数解">
        <Tx>{R`**设定。** 另一类有用的情形是**无限杂质源**的扩散，例如在轻掺杂衬底上外延一层重掺杂层（\figref{7.11}）。问题是：重掺杂区的杂质会向轻掺杂区扩散多远？初始条件为`}</Tx>
        <Eq n="7.17" say="开始时杂质只占据左半空间，浓度为常数 C；右半空间是干净的，交界处是一个陡峭的台阶。">{R`\left\{\begin{aligned} &C(x,t)=0\ \ \text{at}\ t=0\ \ \text{for}\ x>0\\ &C(x,t)=C\ \ \text{at}\ t=0\ \ \text{for}\ x<0\end{aligned}\right.`}</Eq>
        <Figure n="7.11" caption={R`$x<0$ 的无限源可以看作一系列 $\delta$ 函数（宽 $\Delta x$、剂量 $C\Delta x$ 的薄片）之和；扩散后的解是一系列高斯之和，即误差函数解。虚线是位于 $x_i$ 的单个薄片扩散成的高斯（放大显示）；拖动滑块改变 $2\sqrt{Dt}$（自绘）。`} illustration={<Fig711 />} />
        <Tx>{R`**叠加的思路。** 扩散方程是线性的，所以可以把无限源切成一系列宽 $\Delta x$、单位截面的薄片。第 $i$ 片位于 $x_i$，初始含杂质 $C\Delta x$——若其余部分都不存在，它就是一个 $\delta$ 尖峰，按 \eqref{7.14} 扩散。把所有薄片的高斯叠加：`}</Tx>
        <Eq n="7.18" say="无限源等于许多薄片之和：每片按自己的高斯扩散，任一点的浓度就是所有薄片在该点贡献的总和。">{R`C(x,t) = \frac{C}{2\sqrt{\pi Dt}}\sum_{i=1}^{\nosym{n}}\Delta x_i\exp\!\left[-\frac{(x-x_i)^2}{4Dt}\right]`}</Eq>
        <Tx>{R`薄片无限细时，求和变成对源点位置 $\alpha$ 的积分（源占据 $\alpha<0$）：`}</Tx>
        <Eq n="7.19" say="对整个源区（x 小于 0 的一侧）积分所有薄片的高斯贡献，就得到无限源扩散后的分布。">{R`C(x,t) = \frac{C}{2\sqrt{\pi Dt}}\int_{-\infty}^{0}\exp\!\left[-\frac{(x-\alpha)^2}{4Dt}\right]d\alpha`}</Eq>
        <Tx>{R`令`}</Tx>
        <Eq n="7.20" say="把源点到场点的距离用扩散长度来量，得到一个无量纲的积分变量。">{R`\frac{x-\alpha}{2\sqrt{Dt}} = \eta`}</Eq>
        <Tx>{R`代入（$d\alpha=-2\sqrt{Dt}\,d\eta$；$\alpha=-\infty\mapsto\eta=+\infty$，$\alpha=0\mapsto\eta=x/2\sqrt{Dt}$），得`}</Tx>
        <Eq n="7.21" say="换元后，浓度正比于钟形函数 $e^{-\eta^2}$ 从 $x/2\sqrt{Dt}$ 到无穷远的尾部面积：离源越远，能“够到”它的薄片越少。">{R`C(x,t) = \frac{C}{\sqrt\pi}\int_{x/2\sqrt{Dt}}^{\infty}e^{-\eta^2}\,d\eta`}</Eq>
        <Box kind="warning" title={R`勘误：式 (7.19)、(7.21) 的积分限`}>{R`原书 (7.19) 印作 $\int_0^{\infty}\cdots d\alpha$，(7.21) 印作 $\int_{-\infty}^{x/2\sqrt{Dt}}\cdots d\eta$。按 (7.17) 与图 7.11，源占据 $x<0$，应对 $\alpha\in(-\infty,0)$ 积分；换元后积分限为 $\eta\in(x/2\sqrt{Dt},\infty)$。原书的两式彼此一致，但描述的是源在 $x>0$ 一侧，结果会是 $\tfrac C2[1+\mathrm{erf}(x/2\sqrt{Dt})]$，与随后的 (7.23) 相矛盾。按本页的积分限：$\frac{C}{\sqrt\pi}\int_{z}^{\infty}e^{-\eta^2}d\eta=\frac C2[1-\mathrm{erf}(z)]$，正好给出 (7.23)。`}</Box>
        <Tx>{R`这种积分在扩散问题中十分常见、又没有初等原函数，所以被制成函数表——**误差函数**（error function）：`}</Tx>
        <Eq n="7.22" say="误差函数是钟形曲线 $e^{-\eta^2}$ 从 0 到 z 的面积，归一化使 z 趋于无穷时等于 1。">{R`\operatorname{erf}(z) = \frac{2}{\sqrt\pi}\int_0^{z}e^{-\eta^2}\,d\eta`}</Eq>
        <Tx>{R`其图形、数值表与更多性质见附录 A.9。利用 $\int_0^\infty e^{-\eta^2}d\eta=\sqrt\pi/2$，无限源扩散的解为`}</Tx>
        <Eq n="7.23" say="无限源扩散后的分布：远处的源区浓度仍为 C，远处的干净区仍为零，中间由误差函数平滑过渡。">{R`C(x,t) = \frac{C}{2}\left[1-\operatorname{erf}\!\left(\frac{x}{2\sqrt{Dt}}\right)\right]`}</Eq>
        <Tx>{R`为简化记号，定义**余误差函数**（complementary error function）`}</Tx>
        <Eq n="7.24" say="余误差函数等于 1 减去误差函数，也就是钟形曲线从 x 到无穷远的（归一化）尾部面积。">{R`\operatorname{erfc}(x) = 1-\operatorname{erf}(x)`}</Eq>
        <Tx>{R`于是`}</Tx>
        <Eq n="7.25" keyEq title="无限源的 erfc 解" say="台阶状的无限源扩散成余误差函数分布；原来台阶处的浓度恰好停在源浓度的一半，不随时间变化。">{R`C(x,t) = \frac{C}{2}\left[\operatorname{erfc}\!\left(\frac{x}{2\sqrt{Dt}}\right)\right]`}</Eq>
        <Tx>{R`其时间演化见 \figref{7.12} 左（交互版中选"erfc（无限介质）"）。`}</Tx>
      </Sub>

      <Sub n="7.4.5" title="Error-Function Solution Near a Surface" zh="表面附近的误差函数解">
        <Tx>{R`**设定。** 误差函数也描述表面浓度始终恒定的扩散：例如从杂质浓度高于固溶度的气氛中扩散，表面被"钉"在固溶度上。

**对称性论证。** 看 \figref{7.12} 左：由对称性，$x=0$ 处的浓度始终是 $C/2$，在扩散中保持不动；而 $x=0$ 两侧的解彼此等价。所以只看 $x>0$ 一侧，把那个恒定的表面值记作 $C_S$（$=C/2$），就得到恒定表面浓度的解：`}</Tx>
        <Eq n="7.26" keyEq title="恒定表面浓度的 erfc 解（预淀积）" say="表面浓度被源钉在 C_S 时，杂质分布是余误差函数：表面值不变，分布按扩散长度 $2\sqrt{Dt}$ 向深处推进。">{R`C(x,t) = C_S\left[\operatorname{erfc}\!\left(\frac{x}{2\sqrt{Dt}}\right)\right]`}</Eq>
        <Tx>{R`它的时间演化与 \figref{7.12} 中 $x>0$ 的部分完全相同；对数坐标见图右。`}</Tx>
        <Figure n="7.12" caption={R`erfc 扩散分布的时间演化。原书左图为式 (7.25)（线性坐标），右图为式 (7.26)（对数坐标）；横轴以 $2\sqrt{Dt_0}$ 为单位。交互版：切换三种情形与坐标，拖动 $t/t_0$；注意 (7.25) 的所有曲线都通过 $(0,\,0.5)$。`} illustration={<EvolutionPlot init="e" />} />
        <Tx>{R`**引入了多少剂量？** 在线性坐标上 erfc 分布大致是个三角形，高 $C_S$、底约为扩散长度 $2\sqrt{Dt}$，面积约 $C_S\sqrt{Dt}$。精确地说，`}</Tx>
        <Eq n="7.27" keyEq title="预淀积引入的剂量" say="恒定表面浓度扩散进硅的总剂量按 $\sqrt t$ 增长：源源不断补充的杂质让剂量越来越多，比粗估的三角形面积大约 13%。">{R`Q = \int_0^{\infty}C_S\left[\operatorname{erfc}\!\left(\frac{x}{2\sqrt{Dt}}\right)\right]dx = \frac{2C_S}{\sqrt\pi}\sqrt{Dt}`}</Eq>
        <Derivation title="erfc 的积分" collapsed steps={[
          { tex: R`\int_0^\infty\operatorname{erfc}(u)\,du = \Big[u\,\operatorname{erfc}(u)\Big]_0^\infty + \frac{2}{\sqrt\pi}\int_0^\infty u\,e^{-u^2}du`, why: R`分部积分，$\frac{d}{du}\operatorname{erfc}(u)=-\frac{2}{\sqrt\pi}e^{-u^2}$。` },
          { tex: R`= 0 + \frac{2}{\sqrt\pi}\cdot\frac12 = \frac{1}{\sqrt\pi}`, why: R`边界项在两端都为零。` },
          { tex: R`Q = C_S\cdot 2\sqrt{Dt}\int_0^\infty\operatorname{erfc}(u)\,du = \frac{2C_S\sqrt{Dt}}{\sqrt\pi}`, why: R`换元 $x=2\sqrt{Dt}\,u$。$2/\sqrt\pi\approx1.13$，比三角形估计大约 13%。` },
        ]} />
        <Tx>{R`**两种解的根本区别。** 用同一表面浓度归一后，erfc 与高斯的空间形状颇为相似（\figref{7.13}）。区别在于：erfc 对应**无限的杂质供给**——为维持恒定表面浓度，进入衬底的剂量不断增加；高斯对应**固定的初始剂量**——杂质越扩越深，表面浓度必然下降。所以某一时刻的快照可能很像，但两者的时间演化截然不同（比较图 7.9 与 7.12）。`}</Tx>
        <Figure n="7.13" caption={R`归一到相同表面浓度时，高斯 $e^{-u^2}$ 与 $\mathrm{erfc}(u)$ 的空间形状相近（$u=x/2\sqrt{Dt}$）；erfc 下降得更快一些（交互版，可切换坐标）。`} illustration={<EvolutionPlot init="cmp" />} />
        <Tx>{R`除了高斯与 erfc，今天硅工艺中的大多数实际问题都需要数值解，因为解析解所需的简单边界条件通常不成立：现代结构中有浓度依赖扩散、电场效应、杂质分凝以及复杂的点缺陷驱动扩散，都只能数值计算。本章后面会逐一回到这些问题。`}</Tx>
      </Sub>
    </Sec>);
}

export function Sec75() {
  return (
    <Sec n="7.5" title="Intrinsic Diffusion Coefficients of Dopants in Silicon" zh="硅中杂质的本征扩散系数"
      gist={R`扩散系数按 Arrhenius 规律随温度指数增长，$D=D^0\exp(-E_A/kT)$；常见杂质 $E_A\approx3.5$–$4.0$ eV，硅自扩散 4.76 eV。B、In、P 快，As、Sb 慢（表 7.2、图 7.14）。`}
      why={R`解析解只给出 $Dt$ 的组合；要把它变成"多少度、多少分钟"，必须知道 $D(T)$。`}
      gives={["7.28"]}>
      <p className="muted">本节概念：<C id="arrhenius" /></p>
      <Tx>{R`扩散系数衡量杂质在固体中走得多快。实验发现常见杂质的 $D$ 随温度升高而指数增长——这并不意外：如果杂质靠与空位、间隙原子相互作用而移动，而本征点缺陷的数量本身就随温度指数增加。把测得的 $D$ 画在半对数坐标上（对 $1/T$），得到一条直线，斜率由活化能 $E_A$ 决定：`}</Tx>
      <Eq n="7.28" keyEq title="Arrhenius 扩散系数" say="扩散系数随温度指数增长：活化能越高，对温度越敏感；温度每升高约 100˚C，常见杂质的 D 大约增大一个数量级。">{R`D = \sym{ch07-D0}{D}^0\exp\!\left(-\frac{E_A}{kT}\right)`}</Eq>
      <Tx>{R`$k$ 为玻尔兹曼常数，$T$ 为绝对温度。$E_A$ 以 eV 计，硅中杂质扩散一般为 3.5–4.0 eV。常见杂质的本征扩散系数画在 \figref{7.14} 中，对应表 7.2 的指前因子与活化能。这张表是本征条件下扩散系数的 Arrhenius 拟合；后面（\secref{7.10}，表 7.3）还会按高浓度效应把它"拆开"。`}</Tx>
      <Figure n="7.14" caption={R`常见杂质在硅中本征扩散系数的 Arrhenius 图，以及硅的自扩散系数（B 与 In 在这个尺度上几乎重合）。交互版：曲线由表 7.2 直接计算；拖动温度读出各杂质的 $D$。`} illustration={<ArrheniusPlot />} />
      <Table caption={R`表 7.2　硅自扩散及常见杂质在单晶硅中的本征扩散系数（Arrhenius 拟合，单位 $\mathrm{cm^2\,s^{-1}}$）。`}
        head={["", "Si", "B", "In", "As", "Sb", "P", "单位"]}
        rows={[
          [R`$D^0$`, "560", "1.0", "1.2", "9.17", "4.58", "4.70", R`$\mathrm{cm^2/s}$`],
          [R`$E_A$`, "4.76", "3.5", "3.5", "3.99", "3.88", "3.68", "eV"],
        ]} />
      <Tx>{R`**快与慢的谜。** 为什么杂质分成"快"、"慢"两组并不显然。原子尺寸不是原因：As 的离子半径几乎与硅完美匹配，却扩散得慢；Sb 很大，扩散慢；In 也很大，却扩散快。电荷态也不是原因：n 型里既有快的（P）也有慢的（As、Sb），p 型的 B、In 都快。后面讲的微观机制（与间隙原子或空位的相互作用）会提供一些线索。

**另一个有趣的现象**：各杂质的 $E_A$ 都差不多，而硅自扩散的 $E_A$ 却高约 1 eV，尽管硅在自己的晶格里"完美匹配"。一种解释是：带电杂质与带电空位、间隙原子之间可能形成中性硅原子所没有的配对；晶格应变也可能加强杂质与点缺陷的相互作用。这种耦合在高浓度时尤其重要（\secref{7.10}）。`}</Tx>
      <Box kind="key" title="什么时候可以用本征值">{R`扩散温度下本征载流子浓度很高（见附录图 A1.4）：1000˚C 时 $n_i=7.14\times10^{18}\,\mathrm{cm^{-3}}$，所有 $N_D$、$N_A<n_i$ 的区域都表现为本征材料，扩散由图 7.14 描述，前面的解析解也成立（当然还要求边界条件合适）。

随着结越来越浅，"慢"扩散杂质越来越重要：n 型区因此几乎都用 As（$D$ 小、固溶度高）；p 型区可惜只有 B 有足够高的固溶度，而它扩散快，所以浅 p 型区通常比浅 n 型区难做。再加上现代器件既要浅又要浓——浓度很高时，所有杂质的实际 $D$ 都远大于这里的本征值（\secref{7.9}–\secref{7.10}）。`}</Box>
      <Tx>{R`**把前几节合起来：Fick 扩散计算器。** 下面的计算器用表 7.2 的 $D^0$、$E_A$ 由温度算出 $D$ 与 $\sqrt{Dt}$，再按所选边界条件画出对数浓度分布并标出结深 $x_j$（$C=C_B$ 处）。默认参数正是 \secref{7.7} 例题的推进步骤（B，1100˚C，6.8 h，$Q=4.3\times10^{13}\,\mathrm{cm^{-2}}$，$C_B=10^{15}$）：读出 $C(0,t)\approx4\times10^{17}$、$x_j\approx2.9\,\mathrm{\mu m}$，与例题的 3 µm 设计相符。切到"预淀积"并设 950˚C、$C_S=2.5\times10^{20}$、$t\approx5.5$ s，可以验证例题中预淀积引入的剂量。`}</Tx>
      <FickCalc />
      <Details summary="计算器里的公式与近似">{R`推进：$C=\frac{Q}{\sqrt{\pi Dt}}e^{-x^2/4Dt}$，$x_j=2\sqrt{Dt}\sqrt{\ln(C(0,t)/C_B)}$；预淀积：$C=C_S\,\mathrm{erfc}(x/2\sqrt{Dt})$，$x_j=2\sqrt{Dt}\,\mathrm{erfc}^{-1}(C_B/C_S)$，$Q=2C_S\sqrt{Dt/\pi}$。$D$ 一律取表 7.2 的本征值；当表面浓度超过 $n_i(T)$（虚线）时，真实分布会因 \secref{7.9}–\secref{7.10} 的效应扩得更深、更方。$n_i(T)$ 用常用拟合式 $3.9\times10^{16}\,T^{3/2}e^{-0.605\,\mathrm{eV}/kT}$（1000˚C 时 $7.13\times10^{18}$，与原书一致）。`}</Details>
    </Sec>);
}
