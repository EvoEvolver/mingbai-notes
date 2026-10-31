// §2.1 Expanding space —— 式 (2.2)–(2.33)，Box 2.1，图 2.1–2.2
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, Details, C } from "@kit";

const R = String.raw;

export function Sec21() {
  return (
    <Sec n="2.1" title="Expanding space" zh="膨胀的空间"
      gist={R`用**度规**描述膨胀的空间（FLRW 度规 $g_{\mu\nu}=\mathrm{diag}(-1,a^2,a^2,a^2)$），再用**测地线方程**追踪自由粒子，严格证明光子能量 $E\propto1/a$。`}
      why={R`第 1 章的"网格被拉大""波长被拉长"只是图像；要做定量预言（距离、密度、扰动），必须有一个在任何坐标下都成立的计算框架。`}
      gives={["2.4", "2.12", "2.20", "2.21", "2.24", "2.25", "2.31"]}>
      <p className="muted">本节概念：<C id="metric" /> · <C id="flrw" /> · <C id="geodesic" /> · <C id="redshift" /></p>
      <Tx>{R`先说清楚我们需要多少广义相对论。宇宙的膨胀、以及让宇宙变得有趣的那些扰动，最终都由广义相对论支配；但学宇宙学的大部分内容，只需要对这门理论有"路过式"的了解。粗略地说，广义相对论可以拆成两半：

**前一半是几何。**它的核心是**广义协变性**（general covariance）：任何物理现象都可以在任意参考系中描述，并给出相同的结果。爱因斯坦意识到，这个原则要求（被狭义相对论统一起来的）时空是**弯曲的**；而描述弯曲时空的工具，就是告诉我们"两点之间有多远"的**度规**。

**后一半是动力学。**它通过度规把时空和其中的"东西"（物质、辐射……）联系起来，浓缩为**爱因斯坦方程**——那是第 3 章的事。

本章只用前一半：我们承认宇宙在膨胀，用度规把这件事写下来，然后看粒子在其中怎样运动。爱因斯坦方程暂时用不到。`}</Tx>

      <Sub n="2.1.1" title="The metric" zh="度规">
        <Tx>{R`**我们要解决的问题。**回到第 1 章图 1.1 的共动网格。即使知道两个格点之间分离矢量的各个分量，你仍然不知道它们实际相距多远——还缺一条信息：那一时刻的标度因子 $a(t)$。这说明"坐标"和"物理距离"是两回事，中间需要一张"换算表"。这张换算表就是**度规**（metric）：它给出任意坐标系下两个无限接近的时空点之间的**真实物理距离**，是膨胀宇宙中一切定量预言的起点。

其实牛顿和麦克斯韦早就在用度规，只是用得不自觉——他们没有把"空间本身"和"描述空间的坐标"区分开。我们从一个最熟悉的例子把这种区分讲清楚。`}</Tx>
        <Tx>{R`**热身：同一个平面，两种坐标。**在二维平面的笛卡尔坐标 $(x,y)$ 中，相距 $dx$、$dy$ 的两点之间距离的平方是 $(dx)^2+(dy)^2$。换成极坐标 $(r,\theta)$，距离平方就不再是坐标差的平方和，而是（$dr$、$d\theta$ 很小时）$(dr)^2+r^2(d\theta)^2$。两位观测者，一位用笛卡尔坐标、一位用极坐标，算出的距离却完全相同——距离是**不变量**（invariant）。所以度规的作用可以一句话概括：**它把依赖于观测者的坐标差，变成与观测者无关的不变量。**

写成公式：二维平面中的不变距离平方为 $dl^2=\sum_{i,j=1,2}g_{ij}dx^idx^j$，度规 $g_{ij}$ 是一个 $2\times2$ 对称矩阵。在笛卡尔坐标（$x_1=x$，$x_2=y$）中它就是单位矩阵：`}</Tx>
        <Eq n="2.2" say="在笛卡尔坐标中，平面的度规是单位矩阵：距离平方就是坐标差的平方和（勾股定理）。">{R`g_{ij}\ \overset{\text{Cartesian}}{=}\ \begin{pmatrix}1&0\\0&1\end{pmatrix},`}</Eq>
        <Tx>{R`而在极坐标（$x_1=r$，$x_2=\theta$）中变为`}</Tx>
        <Eq n="2.3" say={R`同一个平面换用极坐标后，度规的角向分量变成 $r^2$：沿角度方向走 $d\theta$，真实走过的弧长是 $r\,d\theta$。`}>{R`g_{ij}\ \overset{\text{polar}}{=}\ \begin{pmatrix}1&0\\0&r^2\end{pmatrix}.`}</Eq>
        <Tx>{R`这里有两个值得记住的要点：度规的分量可以**随位置变化**（这里通过 $r$）；而两种形式描述的是**同一个空间**。度规"长什么样"取决于你选的坐标，它所描述的几何却不取决于坐标。`}</Tx>

        <Tx>{R`**真正用得上度规的场合：弯曲空间。**地球表面近似是一个球面。给地表上的点赋坐标、再把坐标画在一张平纸上，就得到一幅**地图**。有没有一种坐标，能让地图像笛卡尔坐标之于平面那样，同时如实反映距离、面积和角度？没有——地表是弯曲的，这样的坐标根本不存在。\figref{2.1} 展示了两种妥协：墨卡托（Mercator）坐标保持角度（地图上两条线的夹角与实地测量相同），便于航海，却严重扭曲了两极附近的**表观**距离和面积；温克尔三重（Winkel–Tripel）投影减小了距离和面积的畸变，代价是角度失真。

对物理学家来说，这个制图"难题"并不构成真正的问题：我们知道距离、面积、角度要**用度规来算**。度规在不同坐标中样子不同，算出来的结果与坐标无关。`}</Tx>
        <Figure n="2.1" caption={R`用两种不同坐标系表示的地球表面：墨卡托坐标（上）与温克尔三重坐标（下）。墨卡托坐标保持角度，但在视觉上严重扭曲面积：格陵兰岛看上去比澳大利亚还大，而实际面积不到澳大利亚的三分之一。温克尔三重坐标改善了这一点，代价是角度失真。由于地表是弯曲的，任何平面表示都不可能同时忠实于面积和角度；但度规使我们无论选择何种坐标都能正确计算距离、面积与角度。图片来源：Daniel R. Strebe (2011)，CC BY-SA 3.0。`} width="70%" />

        <Tx>{R`**度规还顺带装下了引力。**我们不必再说"粒子在引力场中受力运动"，而可以把引力写进度规，说"粒子在弯曲的时空中**自由**运动"。背后的原理还是广义协变性：爱因斯坦认识到，处在均匀引力场中的观测者，与处在加速参考系中的观测者做出的测量完全相同。

**推广到四维时空。**现在不变量还要包括时间间隔：`}</Tx>
        <Eq n="2.4" say="时空间隔：把任意坐标下的坐标差 $dx^\mu$ 通过度规组合成一个所有观测者都同意的不变量 $d\sym{ch02-interval}{s}^2$。">{R`d\sym{ch02-interval}{s}^2 = \sum_{\mu,\nu=0}^{3} g_{\mu\nu}\,dx^\mu dx^\nu`}</Eq>
        <Tx>{R`几条约定一次说清：指标 $\nosym{\mu,\nu}$ 取 0 到 3（指标的用法见下方 Box 2.1），0 留给类时坐标（如 $x^0=t$），1–3 为空间坐标。与狭义相对论一样，度规的时–时分量与空间分量符号相反；我们采用宇宙学的标准约定——"**大部分为正**"（mostly positive），即空间分量为正。\eqref{2.4} 里明写了求和号，**此后一律采用重复指标求和约定**。$g_{\mu\nu}$ 是对称的，所以有 4 个对角分量和 6 个独立的非对角分量。

**$d\sym{ch02-interval}{s}^2$ 的物理意义：手表上的时间。**$d\sym{ch02-interval}{s}^2$ 常称为**固有时间隔**（proper-time interval）。为什么？设想一位戴着手表静坐的观测者。她最自然的坐标系 $\{t,\boldsymbol x\}$ 是：自己始终在原点，时间坐标就是手表读数。把手表显示 12:00:00 和 12:00:01 定为两个事件。她相对 $x^i$ 不动，$dx^i=0$，于是 $d\sym{ch02-interval}{s}^2=g_{00}dt^2=-(1\,\mathrm s)^2$。除了一个负号，固有时间隔就是她手表上流逝的时间。另一位相对她运动的观测者会给出不同的 $dt$ 和 $dx^i$，但对同一对事件算出**相同**的 $d\sym{ch02-interval}{s}$。

符号也有含义：$d\sym{ch02-interval}{s}^2<0$ 的两个事件被**类时**（time-like）间隔隔开；$d\sym{ch02-interval}{s}^2>0$ 为**类空**（space-like）；$d\sym{ch02-interval}{s}^2=0$ 的两个事件可以用一束光连接。`}</Tx>

        <Box kind="aside" title="Box 2.1　指标（Indices）">
          <Tx>{R`三维空间中，矢量 $\boldsymbol A$ 有三个分量 $A^i$，上标 $i$ 取 1、2、3。两个矢量的点积为`}</Tx>
          <Eq n="2.5" say="点积就是对应分量相乘再求和；爱因斯坦约定：重复出现的指标自动求和，省掉 $\sum$。">{R`\boldsymbol A\cdot\boldsymbol B = \sum_{i=1}^{3} A^iB^i \equiv A^iB^i`}</Eq>
          <Tx>{R`这就是**爱因斯坦求和约定**：某指标出现两次就省略 $\sum$ 号。矩阵也可以用分量写，例如矩阵乘积`}</Tx>
          <Eq n="2.6" say="矩阵乘法的分量写法：第 i 行与第 j 列逐项相乘，对中间指标 k 求和。">{R`(\sym{ch02-matM}{M}\sym{ch02-matN}{N})_{ij} = M_{ik}N_{kj}`}</Eq>
          <Tx>{R`同样隐含对 $\nosym{k}$ 求和。

到了相对论需要两点推广。其一，矢量多出第 0 个分量——时间分量；用希腊字母表示全部四个分量，$A^\mu=(A^0,A^i)$。其二，更微妙的是**上指标与下指标的区别**：上指标对应**逆变**（contravariant）矢量，下指标对应**协变**（covariant）矢量，两者用度规互相转换：`}</Tx>
          <Eq n="2.7" say="度规负责升降指标：协变分量 = 度规乘以逆变分量；逆度规把它变回来。">{R`A_\mu = g_{\mu\nu}A^\nu;\qquad A^\mu = g^{\mu\nu}A_\nu.`}</Eq>
          <Tx>{R`一个上指标与一个下指标可以**缩并**（contract）成一个标量。例如"无质量粒子的四动量平方为零"写成`}</Tx>
          <Eq n="2.8" say="无质量粒子的四动量是“零长度”矢量：用度规缩并后的平方为零。">{R`P^2 \equiv P_\mu P^\mu = g_{\mu\nu}P^\mu P^\nu = 0.`}</Eq>
          <Tx>{R`度规能升降任意多个指标的张量。例如把度规自身的指标升起来：`}</Tx>
          <Eq n="2.9" say="用逆度规把度规自身的两个下指标升起来，得到的正是逆度规本身。">{R`g^{\mu\nu} = g^{\mu\alpha}g^{\nu\beta}g_{\alpha\beta}.`}</Eq>
          <Tx>{R`如果 $\alpha=\nu$，右边第一个因子就等于左边；所以只要后两个因子的组合"迫使" $\alpha$ 等于 $\nu$，等式就成立。也就是`}</Tx>
          <Eq n="2.10" say="逆度规与度规相乘得到单位矩阵（克罗内克 $\delta$）：$g^{\mu\nu}$ 就是 $g_{\mu\nu}$ 的逆矩阵。">{R`g^{\nu\beta}g_{\beta\alpha} = \delta^\nu{}_\alpha,`}</Eq>
          <Tx>{R`其中 $\delta^\nu{}_\alpha$ 是克罗内克 $\delta$（单位矩阵：$\nu=\alpha$ 时为 1，否则为 0）。结论：**$g^{\mu\nu}$ 是 $g_{\mu\nu}$ 的逆矩阵。**`}</Tx>
        </Box>

        <Tx>{R`**从 Minkowski 到膨胀宇宙。**狭义相对论的时空——**Minkowski 时空**——的度规是 $g_{\mu\nu}=\eta_{\mu\nu}$：`}</Tx>
        <Eq n="2.11" say="Minkowski 度规：狭义相对论中不弯曲的平直时空，时间分量取 −1，三个空间分量取 +1。">{R`\eta_{\mu\nu} = \begin{pmatrix}-1&0&0&0\\0&1&0&0\\0&0&1&0\\0&0&0&1\end{pmatrix}.`}</Eq>
        <Tx>{R`这正是麦克斯韦推导电磁学时隐含使用的度规，描述的是**不弯曲**的时空。

膨胀宇宙的度规该怎么写？我们可以直接"猜"出来。回到图 1.1 的网格：两个格点彼此远离，它们之间的距离始终正比于 $a(t)$。若两点今天的共动距离是 $x_0$，那么在更早的时刻 $t$，它们的物理距离就是 $a(t)x_0$（今天取 $a_0=1$）。所以至少在**欧几里得**（"平直"，相对于"开放""闭合"而言）的宇宙中，度规**几乎**就是 Minkowski 度规——只是每个空间坐标都要乘上标度因子：`}</Tx>
        <Eq n="2.12" keyEq title="欧氏 FLRW 度规" say="膨胀的平直宇宙 = Minkowski 时空把空间部分乘上 $a^2(t)$：同一对共动点，物理距离随 $a(t)$ 一起增长，时间部分不变。">{R`g_{\mu\nu} = \begin{pmatrix}-1&0&0&0\\0&a^2(t)&0&0\\0&0&a^2(t)&0\\0&0&0&a^2(t)\end{pmatrix}.`}</Eq>
        <Tx>{R`这就是欧氏宇宙的 **Friedmann–Lemaître–Robertson–Walker（FLRW）度规**，线元形式是 $d\sym{ch02-interval}{s}^2=-dt^2+a^2(t)\,\delta_{ij}dx^idx^j$。

**怎样读这个度规？**它只有一个自由函数 $a(t)$，而且只依赖时间——这正是"空间均匀、各向同性"的数学表达。$a(t)$ 本身如何演化，要由宇宙的成分通过爱因斯坦方程决定（参见第 1 章式 (1.3)），留到 §3.1。等到引入扰动后，\eqref{2.12} 会被推广为还依赖空间位置的形式，多出的那些函数刻画偏离均匀的程度，并由物质和辐射的不均匀性决定。`}</Tx>
        <Box kind="physics" title="共动坐标、物理距离与宇宙时">{R`FLRW 度规中的 $x^i$ 是**共动坐标**：随哈勃流运动的观测者（"共动观测者"）的 $x^i$ 保持不变。某一时刻 $t$ 两个共动点之间的**物理**距离是 $a(t)\,|\Delta\boldsymbol x|$。所以"宇宙膨胀"不是星系在一个固定的空间里飞散，而是度规的空间部分整体乘上了一个随时间增长的因子 $a^2(t)$。又因为 $g_{00}=-1$，坐标 $t$ 恰是共动观测者手表测得的固有时，称为**宇宙时**（cosmic time）。`}</Box>
        <Tx>{R`**小结与过渡。**舞台已经搭好：一个由 $a(t)$ 刻画的膨胀时空。接下来要问的是演员怎么走位——物质和辐射在这个时空里如何运动？以及，如何从无穷小的间隔 $d\sym{ch02-interval}{s}^2$ 走到实际的有限距离（那是 §2.2 的事）。`}</Tx>
      </Sub>

      <Sub n="2.1.2" title="The geodesic equation" zh="测地线方程">
        <Tx>{R`**我们要解决的问题。**在 Minkowski 空间中，不受力的粒子走直线：$d^2\boldsymbol x/dt^2=0$。在弯曲时空里，"直线"被推广为**测地线**（geodesic）——两点间最短（一般而言是**极值**）的路径。广义相对论的一个美妙之处是：除引力外不受任何力的粒子，走的恰好就是测地线。我们想把 $d^2\boldsymbol x/dt^2=0$ 推广到任意坐标和任意时空，然后把它用在膨胀宇宙上，回答一个具体问题：**光子的能量如何随宇宙膨胀而变化？**

**路线**：(i) 先在二维平面上换坐标，看清"附加项"从哪里来，从而认识 Christoffel 符号；(ii) 推广到四维时空；(iii) 学会直接从度规算 Christoffel 符号；(iv) 算出 FLRW 度规的 Christoffel 符号；(v) 应用于一个光子。`}</Tx>

        <Tx>{R`**(i) 一个平面上的自由粒子。**在笛卡尔坐标 $x^i=(x,y)$ 中，运动方程最简单：`}</Tx>
        <Eq n="2.13" say="笛卡尔坐标中自由粒子不加速：每个坐标都随时间线性变化。">{R`\frac{d^2x^i}{dt^2} = 0.`}</Eq>
        <Tx>{R`改用极坐标 $x'^i=(r,\theta)$，方程就变样了：极坐标的基矢 $\hat{\boldsymbol r}$、$\hat{\boldsymbol\theta}$ 在平面上**逐点转向**，所以 $r$、$\theta$ **不**满足 $d^2x'^i/dt^2=0$。为了找到正确的方程，从笛卡尔方程出发做变换。由链式法则，`}</Tx>
        <Eq n="2.14" say="链式法则：旧坐标的速度 = 变换矩阵乘以新坐标的速度。">{R`\frac{dx^i}{dt} = \frac{\partial x^i}{\partial x'^j}\frac{dx'^j}{dt}.`}</Eq>
        <Tx>{R`$\partial x^i/\partial x'^j$ 称为**变换矩阵**（transformation matrix）。对笛卡尔–极坐标变换，$x^1=x'^1\cos x'^2$，$x^2=x'^1\sin x'^2$，于是`}</Tx>
        <Eq n="2.15" say="笛卡尔–极坐标的变换矩阵；它的元素依赖位置（$r$ 和 $\theta$），这就是麻烦的根源。">{R`\frac{\partial x^i}{\partial x'^j} = \begin{pmatrix}\cos x'^2 & -x'^1\sin x'^2\\ \sin x'^2 & x'^1\cos x'^2\end{pmatrix}.`}</Eq>
        <Tx>{R`把 \eqref{2.14} 代回 \eqref{2.13}，测地线方程成为`}</Tx>
        <Eq n="2.16" say="把笛卡尔方程改用新坐标的速度表示：对“变换矩阵乘以新速度”整体求时间导数为零。">{R`\frac{d}{dt}\left[\frac{dx^i}{dt}\right] = \frac{d}{dt}\left[\frac{\partial x^i}{\partial x'^j}\frac{dx'^j}{dt}\right] = 0.`}</Eq>
        <Tx>{R`关键就在这里：时间导数要同时作用在方括号里的两个因子上。如果变换矩阵是常数，新坐标里的方程仍是 $d^2x'^i/dt^2=0$；但极坐标的变换矩阵随位置变，而粒子在移动，所以它的时间导数不为零：`}</Tx>
        <Eq n="2.17" say="变换矩阵随粒子位置而变，它的时间导数等于二阶偏导乘以新坐标的速度。">{R`\frac{d}{dt}\left(\frac{\partial x^i}{\partial x'^j}\right) = \frac{\partial^2x^i}{\partial x'^j\partial x'^k}\frac{dx'^k}{dt}.`}</Eq>
        <Eq n="2.18" say="新坐标中的自由粒子方程：除了加速度项，还多出一项由坐标“弯曲”带来的速度平方项。">{R`\frac{d}{dt}\left[\frac{\partial x^i}{\partial x'^j}\frac{dx'^j}{dt}\right] = \frac{\partial x^i}{\partial x'^j}\frac{d^2x'^j}{dt^2} + \frac{\partial^2x^i}{\partial x'^j\partial x'^k}\frac{dx'^k}{dt}\frac{dx'^j}{dt} = 0.`}</Eq>
        <Tx>{R`二阶导数 $d^2x'^j/dt^2$ 前面乘的正是变换矩阵。把整个方程左乘它的逆，加速度项就单独出来了：`}</Tx>
        <Eq n="2.19" say="非笛卡尔坐标中的测地线方程：加速度 + （方括号系数）乘以两个速度 = 0；方括号就是 Christoffel 符号。">{R`\frac{d^2x'^l}{dt^2} + \left[\left(\left\{\frac{\partial x}{\partial x'}\right\}^{-1}\right)^{l}{}_{i}\,\frac{\partial^2x^i}{\partial x'^j\partial x'^k}\right]\frac{dx'^k}{dt}\frac{dx'^j}{dt} = 0.`}</Eq>
        <Tx>{R`**解读。**这个略显笨重的式子就是**非笛卡尔坐标中的测地线方程**（你可以在 \exref{2.2} 中验证它给出极坐标中正确的运动方程）。方括号里的系数值得起个名字：**Christoffel 符号** $\Gamma^l{}_{jk}$。由于偏导数可交换，它对两个下指标 $\nosym{j,k}$ **对称**。在欧氏空间的笛卡尔坐标中它为零，方程回到 $d^2x^i/dt^2=0$；换了坐标它就出现——它记录的是"坐标本身在弯"所造成的表观加速度。

更重要的一点：在像膨胀宇宙这样的非平凡**时空**中，**不存在**能让 Christoffel 符号处处为零的坐标系。所以测地线方程不是可有可无的花样，而是必需的。`}</Tx>
        <Box kind="example" title="极坐标中的 Christoffel 符号（由 (2.19) 直接计算）">{R`变换矩阵 \eqref{2.15} 的逆为 $\left(\frac{\partial x}{\partial x'}\right)^{-1}=\begin{pmatrix}\cos\theta&\sin\theta\\-\sin\theta/r&\cos\theta/r\end{pmatrix}$（行列式为 $r$）。二阶导数：$\partial^2x^1/\partial r\partial\theta=-\sin\theta$，$\partial^2x^1/\partial\theta^2=-r\cos\theta$，$\partial^2x^2/\partial r\partial\theta=\cos\theta$，$\partial^2x^2/\partial\theta^2=-r\sin\theta$，$\partial^2x^i/\partial r^2=0$。代入得

$$\Gamma^r{}_{\theta\theta}=\cos\theta(-r\cos\theta)+\sin\theta(-r\sin\theta)=-r,\qquad \Gamma^\theta{}_{r\theta}=\Gamma^\theta{}_{\theta r}=-\tfrac{\sin\theta}{r}(-\sin\theta)+\tfrac{\cos\theta}{r}\cos\theta=\tfrac{1}{r},$$

其余分量为零。这正是习题 2.2 的式 (2.93)。测地线方程于是给出 $\ddot r-r\dot\theta^2=0$ 与 $\ddot\theta+\frac{2}{r}\dot r\dot\theta=0$——前者说径向加速度只是"离心项"，后者即角动量守恒 $\frac{d}{dt}(r^2\dot\theta)=0$。`}</Box>

        <Tx>{R`**(ii) 推广到相对论。**只需两处改动。第一处平凡：让指标取 0 到 3，包括时间。第二处也不意外：时间已经是坐标之一，再用它当演化参数并不总是合适（尽管很多时候可以这样选）。我们改用一个沿粒子路径单调增加的参数 $\lambda$（\figref{2.2}）。测地线方程于是成为`}</Tx>
        <Figure n="2.2" caption={R`粒子的路径 $x^\mu(\lambda)$ 由参数 $\lambda$ 参数化，$\lambda$ 从初值 $\lambda_1$ 单调增加到终值 $\lambda_2$。路径的切矢量为 $dx^\mu/d\lambda$（箭头）。`} width="70%" />
        <Eq n="2.20" keyEq title="测地线方程" say="自由下落粒子的运动方程：沿路径的“加速度”被 Christoffel 符号与速度的乘积抵消——引力全部藏在 $\Gamma^\mu{}_{\alpha\beta}$ 里。">{R`\frac{d^2x^\mu}{d\lambda^2} + \Gamma^\mu{}_{\alpha\beta}\frac{dx^\alpha}{d\lambda}\frac{dx^\beta}{d\lambda} = 0.`}</Eq>
        <Tx>{R`**(iii) 直接从度规算 Christoffel 符号。**我们是从笛卡尔基变换得到 \eqref{2.20} 的，所以 $\Gamma^\mu{}_{\alpha\beta}$ 原则上由 \eqref{2.19} 的方括号给出。但实际计算几乎总是直接用度规更方便：`}</Tx>
        <Eq n="2.21" keyEq title="Christoffel 符号" say="Christoffel 符号由度规的一阶导数组合而成：只要知道度规，就能算出自由粒子会怎样“拐弯”。">{R`\Gamma^\mu{}_{\alpha\beta} = \frac{g^{\mu\nu}}{2}\left[\frac{\partial g_{\alpha\nu}}{\partial x^\beta} + \frac{\partial g_{\beta\nu}}{\partial x^\alpha} - \frac{\partial g_{\alpha\beta}}{\partial x^\nu}\right].`}</Eq>
        <Tx>{R`注意 $g^{\mu\nu}$ 是**上**指标——它是 $g_{\mu\nu}$ 的逆（Box 2.1）。对欧氏 FLRW 度规，$g^{\mu\nu}$ 与 $g_{\mu\nu}$ 的区别仅在于空间元素是 $1/a^2$ 而不是 $a^2$。`}</Tx>
        <Details summary={R`补充：为什么 (2.21) 与 (2.19) 方括号中的定义一致？`}>{R`在笛卡尔坐标 $x^i$ 中 $g_{ij}=\delta_{ij}$，任意坐标 $x'$ 中的度规由张量变换律给出（见 Box 2.2 的 (2.49)）：$g'_{jk}=\frac{\partial x^i}{\partial x'^j}\frac{\partial x^i}{\partial x'^k}$。对 $x'^l$ 求导并按 (2.21) 组合三项，交叉项两两抵消，剩下

$$\frac12\left[\partial_k g'_{jl}+\partial_j g'_{kl}-\partial_l g'_{jk}\right]=\frac{\partial x^i}{\partial x'^l}\frac{\partial^2 x^i}{\partial x'^j\partial x'^k}.$$

再乘以 $g'^{ml}=\frac{\partial x'^m}{\partial x^n}\frac{\partial x'^l}{\partial x^n}$，利用 $\frac{\partial x'^l}{\partial x^n}\frac{\partial x^i}{\partial x'^l}=\delta^i_n$，得到 $\frac{\partial x'^m}{\partial x^i}\frac{\partial^2x^i}{\partial x'^j\partial x'^k}$——这正是 (2.19) 方括号中的量（$\partial x'/\partial x$ 即变换矩阵的逆）。`}</Details>

        <Tx>{R`**(iv) FLRW 度规的 Christoffel 符号。**把 \eqref{2.12} 代入 \eqref{2.21}。先算上指标为 0 的分量。度规是对角的，$g^{0\nu}$ 只有 $\nu=0$ 时非零（等于 $-1$），所以`}</Tx>
        <Eq n="2.22" say="上指标取 0 时，只有 $g^{00}=-1$ 有贡献，Christoffel 符号化为度规时间分量相关导数的组合。">{R`\Gamma^0{}_{\alpha\beta} = -\frac12\left[\frac{\partial g_{\alpha0}}{\partial x^\beta} + \frac{\partial g_{\beta0}}{\partial x^\alpha} - \frac{\partial g_{\alpha\beta}}{\partial x^0}\right].`}</Eq>
        <Tx>{R`前两项要么为零（$g_{i0}=0$），要么是 $g_{00}$ 的导数；而 FLRW 中 $g_{00}=-1$ 是常数，所以它们都消失，只剩`}</Tx>
        <Eq n="2.23" say="在 FLRW 中，$\Gamma^0{}_{\alpha\beta}$ 只来自度规对时间的导数——也就是来自膨胀本身。">{R`\Gamma^0{}_{\alpha\beta} = \frac12\frac{\partial g_{\alpha\beta}}{\partial x^0}.`}</Eq>
        <Tx>{R`只有 $\alpha$、$\beta$ 都是空间指标（我们用拉丁字母 $\nosym{i,j}$ 表示，取 1 到 3）时导数才非零。由 $g_{ij}=a^2\delta_{ij}$，$\partial_t(a^2)=2a\dot a$：`}</Tx>
        <Eq n="2.24" say="FLRW 中上指标为 0 的 Christoffel 符号只有纯空间分量非零，大小为 a·ȧ：膨胀把空间动量“拖”进能量方程。">{R`\begin{aligned}\Gamma^0{}_{00} &= 0,\\ \Gamma^0{}_{0i} &= \Gamma^0{}_{i0} = 0,\\ \Gamma^0{}_{ij} &= \delta_{ij}\,\dot a\,a.\end{aligned}`}</Eq>
        <Tx>{R`同理可以证明，$\Gamma^i{}_{\alpha\beta}$ 只有在两个下指标一个为 0、一个为空间指标时才非零：`}</Tx>
        <Eq n="2.25" say="上指标为空间的 Christoffel 符号只有“一时一空”分量非零，等于哈勃率 ȧ/a：动量随膨胀以 H 的速率衰减。">{R`\Gamma^i{}_{0j} = \Gamma^i{}_{j0} = \delta_{ij}\frac{\dot a}{a}`}</Eq>
        <Tx>{R`其余 $\Gamma^i{}_{\alpha\beta}$ 都为零。这个"简单的练习"的完整过程放在下面（点开查看）。`}</Tx>
        <Derivation title={R`推导 $\Gamma^i{}_{\alpha\beta}$（式 (2.25)）`} steps={[
          { tex: R`\Gamma^i{}_{\alpha\beta}=\frac{g^{i\nu}}{2}\left[\partial_\beta g_{\alpha\nu}+\partial_\alpha g_{\beta\nu}-\partial_\nu g_{\alpha\beta}\right]=\frac{1}{2a^2}\left[\partial_\beta g_{\alpha i}+\partial_\alpha g_{\beta i}-\partial_i g_{\alpha\beta}\right]`, why: R`度规对角，$g^{i\nu}=\delta^{i\nu}/a^2$（只有 $\nu=i$ 一项）。` },
          { tex: R`\partial_i g_{\alpha\beta}=0`, why: R`均匀宇宙中度规只依赖于时间，第三项消失。` },
          { tex: R`\partial_\beta g_{\alpha i}\neq0\ \Longleftrightarrow\ \alpha=j\ (\text{空间}),\ \beta=0:\quad \partial_0 g_{ji}=2a\dot a\,\delta_{ij}`, why: R`$g_{\alpha i}$ 只在 $\alpha$ 为空间指标时非零（$g_{0i}=0$），且只有对时间的导数非零。第二项同理要求 $\beta=j$、$\alpha=0$。` },
          { tex: R`\Gamma^i{}_{00}=0,\qquad \Gamma^i{}_{jk}=0`, why: R`$\alpha=\beta=0$ 时 $g_{0i}=0$；$\alpha,\beta$ 都是空间指标时只剩对空间坐标的导数，为零。` },
          { tex: R`\Gamma^i{}_{j0}=\frac{1}{2a^2}\,\partial_0 g_{ji}=\frac{1}{2a^2}\,2a\dot a\,\delta_{ij}=\delta_{ij}\frac{\dot a}{a}=\Gamma^i{}_{0j}`, why: R`三项中只有一项非零；对称性由 Christoffel 符号下指标对称保证。` },
        ]} result={R`$\Gamma^i{}_{0j}=\Gamma^i{}_{j0}=\delta_{ij}\,\dot a/a$，即 \eqref{2.25}。`} collapsed />

        <Tx>{R`**(v) 收获：光子的能量怎样变化。**前面的形式推导有些冗长，现在享受成果。我们对无质量粒子做计算（几乎相同的有质量情形留作 \exref{2.3}）。

从四维能量–动量矢量 $P^\alpha=(E,\boldsymbol P)$ 出发，时间分量就是能量。用它来**定义**参数 $\lambda$：`}</Tx>
        <Eq n="2.26" say={R`四动量就是坐标对仿射参数 $\lambda$ 的导数——这句话同时（隐式地）定义了 $\lambda$。`}>{R`P^\alpha = \frac{dx^\alpha}{d\lambda}.`}</Eq>
        <Tx>{R`我们从来不需要显式求出 $\lambda$，因为可以把它换成对时间的导数：`}</Tx>
        <Eq n="2.27" say={R`沿路径对 $\lambda$ 求导，等于能量乘以对时间求导：$\lambda$ 可以在方程里被时间完全替换掉。`}>{R`\begin{aligned}\frac{d}{d\lambda} &= \frac{dx^0}{d\lambda}\frac{d}{dx^0}\\ &= E\frac{d}{dt}.\end{aligned}`}</Eq>
        <Tx>{R`为什么要这样定义**仿射参数**（affine parameter）$\lambda$？因为它对有质量和无质量粒子一视同仁。有质量粒子可以用固有时（随粒子运动的手表读数）当参数，但无质量粒子不行——它们沿 $d\sym{ch02-interval}{s}=0$ 的测地线运动，固有时根本不流逝。至于粒子轨迹本身，与选哪个仿射参数无关。

现在取测地线方程 \eqref{2.20} 的 0 分量。左边 $d^2x^0/d\lambda^2=dP^0/d\lambda=E\,dE/dt$；右边由于 $\Gamma^0{}_{\alpha\beta}$ 只有空间分量非零，只剩一项：`}</Tx>
        <Eq n="2.28" say="测地线方程的时间分量：能量的变化率由 $\Gamma^0{}_{ij}$ 与空间动量决定——膨胀在“抽走”粒子的能量。">{R`E\frac{dE}{dt} = -\Gamma^0{}_{ij}P^iP^j`}</Eq>
        <Tx>{R`代入 \eqref{2.24}，右边是 $-\delta_{ij}a\dot aP^iP^j$。要把 $P^iP^j$ 换成 $E$，利用无质量粒子四动量的模为零：`}</Tx>
        <Eq n="2.29" say="无质量粒子的质壳条件：在 FLRW 度规下 $E^2$ 等于 $a^2$ 乘以共动动量的平方。">{R`g_{\mu\nu}P^\mu P^\nu = -E^2 + \delta_{ij}a^2P^iP^j = 0,`}</Eq>
        <Tx>{R`于是 $\delta_{ij}P^iP^j=E^2/a^2$，右边变成 $-(\dot a/a)E^2$。测地线方程给出`}</Tx>
        <Eq n="2.30" say="光子能量的相对减小速率恰好等于宇宙的相对膨胀速率 H。">{R`\frac{dE}{dt} + \frac{\dot a}{a}E = 0,`}</Eq>
        <Tx>{R`即 $d\ln E/dt=-d\ln a/dt$，解为`}</Tx>
        <Eq n="2.31" keyEq title="无质量粒子的能量红移" say="光子能量与标度因子成反比：宇宙膨胀一倍，光子能量减半。">{R`E = \frac{E_0}{a}.`}</Eq>
        <Box kind="result" title="解读：红移的严格来源">{R`这证实了第 1 章的手势论证：无质量粒子的能量反比于波长，而波长随膨胀被拉长（第 3 章还会用玻尔兹曼方程第三次得到同一结果）。结合 $1+z=1/a$，它正是红移的定义：$E_{\rm obs}/E_{\rm emit}=a_{\rm emit}=1/(1+z)$。注意推导里用到的只是度规随时间变化（$\Gamma^0{}_{ij}\propto a\dot a$），没有任何"光源在退行"的假设——宇宙学红移不是多普勒效应。`}</Box>
        <Tx>{R`**最后一点：哪个"动量"？**\eqref{2.29} 中的 $P^i$ 是相对共动网格定义的动量。如果定义`}</Tx>
        <Eq n="2.32" say="物理动量 = 标度因子乘以共动坐标下的动量分量，是局域观测者真正测到的动量。">{R`p^i = aP^i,`}</Eq>
        <Tx>{R`就有 $E^2=\delta_{ij}p^ip^j$，因此 $\boldsymbol p$ 才是**物理动量**。用它表示，熟悉的关系`}</Tx>
        <Eq n="2.33" say="用物理动量表示时，无质量粒子的能量等于动量大小，与狭义相对论完全相同。">{R`E = p\qquad\text{where}\qquad p\equiv|\boldsymbol p|`}</Eq>
        <Tx>{R`依然成立。这就是为什么后文主要使用物理动量 $p$。`}</Tx>
        <Box kind="warning" title="三种'动量'不要混淆">{R`$P^i=dx^i/d\lambda$ 是相对共动坐标的四动量空间分量；$p^i=aP^i$ 是局域观测者测得的**物理动量**（后文的分布函数 $f(\boldsymbol x,\boldsymbol p,t)$ 用的正是它）；另有文献使用"共动动量" $q=ap$（它在自由传播时守恒，第 3、5 章会用到）。由 \eqref{2.31}，无质量粒子的 $p\propto1/a$，因此 $P^i\propto a^{-2}$。`}</Box>
        <Tx>{R`**本节小结。**度规 → Christoffel 符号 → 测地线方程 → $E\propto1/a$：这条链是本章几何线的主干（见上方推导图）。下一节我们沿着光子的路径积分，把"光走了多远"变成可以和观测比较的距离。`}</Tx>
      </Sub>
    </Sec>);
}
