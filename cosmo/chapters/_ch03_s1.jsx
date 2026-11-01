import { EinsteinStructureRedraw } from "./_redraw_early.jsx";
// §3.1 Einstein equations —— 式 (3.1)–(3.14)，图 3.1
import { Sec, Tx, Eq, Box, Derivation, Figure, Details, C } from "@kit";
import { FriedmannPlot, FractionPlot } from "./_ch03_plots.jsx";

const R = String.raw;

export function Sec31() {
  return (
    <Sec n="3.1" title="Einstein equations" zh="Einstein 方程"
      gist={R`Einstein 方程把几何（Einstein 张量）与内容（能动张量）等同起来；代入欧氏 FLRW 度规，时–时分量就是第一 Friedmann 方程 $H^2=8\pi G\rho/3$。`}
      why={R`第 2 章只用了广义相对论的"几何"一半：知道 $a(t)$ 就能算红移和距离。但 $a(t)$ 本身由什么决定？这要靠"动力学"一半——Einstein 方程。`}
      gives={["3.1", "3.2", "3.3", "3.6", "3.7", "3.9", "3.10", "3.12", "3.14"]}>
      <p className="muted">本节概念：<C id="einstein_eq" /> · <C id="ricci" /> · <C id="lambda_fluid" /> · <C id="friedmann" /> · <C id="acceleration" /></p>
      <Tx>{R`**我们要解决的问题。**上一章我们只用度规描述引力：度规告诉我们"距离"是什么、"直线"（测地线）是什么，这些都只依赖**广义协变性**这一条原则。现在转向广义相对论的另一半：时空的几何**由什么决定**？答案浓缩在 **Einstein 方程**（Einstein equations）里——它把描述几何的 **Einstein 张量**和描述物质的**能动张量**（energy-momentum tensor）等同起来：`}</Tx>
      <Eq n="3.1" keyEq title="Einstein 方程" say="时空怎样弯曲（左边，只由度规决定）等于其中装了多少能量和动量（右边）：物质告诉时空如何弯曲。宇宙学常数 $\Lambda$ 作为一个与度规成正比的项也可以放在左边。">{R`G_{\mu\nu} + \Lambda g_{\mu\nu} = 8\pi G\,T_{\mu\nu}.`}</Eq>
      <Box kind="note" title="术语提醒：相对论者口中的“物质”">{R`研究相对论的人常把 Einstein 方程右边出现的**任何东西**都叫作"物质"（matter），尽管它一般也包括辐射等其他成分。本书偶尔也沿用这种说法——要留心上下文：在 Friedmann 方程里，"物质"（$\Omega_{\rm m}$）则专指非相对论成分。`}</Box>
      <Figure n="3.1" caption={R`原创方程结构图：物质的能动张量与时空曲率相联系，度规进一步决定粒子与光的测地线。替代原书 Einstein 方程墙画照片，以概念关系引入本章计算，不复刻墙画。`} illustration={<EinsteinStructureRedraw />} />
      <Tx>{R`式中 $G_{\mu\nu}$ 是 **Einstein 张量**，定义为`}</Tx>
      <Eq n="3.2" keyEq title="Einstein 张量" say="Einstein 张量 = Ricci 张量减去一半的“度规 $\times$ Ricci 标量”：这是由曲率构造出的、天然满足守恒律的组合。">{R`G_{\mu\nu} \equiv R_{\mu\nu} - \frac12 g_{\mu\nu}R.`}</Eq>
      <Tx>{R`逐项认识一下：

◆ $R_{\mu\nu}$ 是 **Ricci 张量**，只依赖度规及其导数；

◆ $R$ 是 **Ricci 标量**，即 Ricci 张量的缩并 $R\equiv g^{\mu\nu}R_{\mu\nu}$；

◆ $\Lambda$ 是著名的**宇宙学常数**，$G$ 是牛顿引力常数；

◆ $T_{\mu\nu}$ 是**能动张量**，我们已在 §2.3 见过它在背景宇宙中的形式。

所以 \eqref{3.1} 左边是度规的函数，右边是宇宙成分的函数：Einstein 方程把两者联系起来。

这个式子看上去简洁，却蕴含极其丰富的物理：它支配光滑宇宙的膨胀，也支配其中结构的增长；在小尺度上它包含牛顿引力（§3.3 会看到），也包含黑洞（本书不涉及）。之后我们还会遇到它所包含的另一个纯广义相对论效应——**引力波**。`}</Tx>
      <Box kind="physics" title="为什么左边是这个组合？">{R`右边的能动张量满足守恒律 $\nabla_\mu T^\mu{}_\nu=0$（§2.3）。所以左边也必须"自动守恒"——无论度规是什么。Ricci 张量本身做不到这一点，而 $R_{\mu\nu}-\frac12g_{\mu\nu}R$ 恰好满足（Bianchi 恒等式），再加上 $\Lambda g_{\mu\nu}$ 也不破坏守恒（$\nabla g=0$）。在弱场、慢速的极限下，这个方程的 00 分量还必须回到泊松方程 $\nabla^2\Psi=4\pi G\rho$，这固定了右边的系数 $8\pi G$。`}</Box>

      <Tx>{R`**第一步：用 Christoffel 符号写出 Ricci 张量。**Ricci 张量最方便的表达式是用 Christoffel 符号（第 2 章式 (2.21)）写的：`}</Tx>
      <Eq n="3.3" keyEq title="Ricci 张量" say="Ricci 张量由 Christoffel 符号的导数（两项）与 Christoffel 符号的乘积（两项）组成——曲率就是“联络的变化 + 联络的自相互作用”。">{R`R_{\mu\nu} = \Gamma^\alpha{}_{\mu\nu,\alpha} - \Gamma^\alpha{}_{\mu\alpha,\nu} + \Gamma^\alpha{}_{\beta\alpha}\Gamma^\beta{}_{\mu\nu} - \Gamma^\alpha{}_{\beta\nu}\Gamma^\beta{}_{\mu\alpha}.`}</Eq>
      <Tx>{R`这里逗号表示对坐标 $x$ 求导，例如 $\Gamma^\alpha{}_{\mu\nu,\alpha}\equiv\partial\Gamma^\alpha{}_{\mu\nu}/\partial x^\alpha$。

现在采用 FLRW 度规作为**拟设**（ansatz），推导此形式度规下的 Einstein 方程。（弯曲的）FLRW 度规其实是空间均匀的度规中最一般的形式，所以它正是均匀宇宙的恰当拟设。一般的 FLRW 度规的空间截面可以弯曲，但为了突出要点，下面的推导全程假设**欧氏**宇宙；弯曲情形留作 \exref{3.5}。\eqref{3.3} 看着吓人，但大部分工作我们已经做过了——§2.1.2 已经算出了 FLRW 宇宙的 Christoffel 符号。`}</Tx>
      <Box kind="key" title="动手之前先猜答案：对称性论证">{R`Christoffel 符号正比于度规对坐标的**一阶导数**。从 \eqref{3.3} 的结构看，Ricci 张量包含两类项：(i) 正比于度规**二阶导数**的项；(ii) 一阶导数的**平方**项。欧氏 FLRW 度规只含一个时间函数 $a(t)$，所以 $R_{\mu\nu}$ 的每个分量要么 $\propto\ddot a$，要么 $\propto\dot a^2$。

关于 Ricci 标量 $R$ 还能说得更多：它是**标量**，不能依赖坐标的选取。而 $a(t)$ 的绝对大小总可以通过把空间坐标乘一个常数来改变（我们只是约定了 $a(t_0)=1$）。因此 $R$ 不能依赖 $\ddot a$ 本身，只能依赖 $\ddot a/a$；同理只能依赖 $(\dot a/a)^2=H^2$。于是整个计算归结为**求出这两项前面的系数**。这种对称性考虑非常适合用来检查计算结果是否合理。`}</Box>

      <Tx>{R`**第二步：时–时分量 $R_{00}$。**算下来会发现，Ricci 张量只有两组非零分量：一组 $\mu=\nu=0$，另一组 $\mu=\nu=i$。先看`}</Tx>
      <Eq n="3.4" say="把 Ricci 张量的一般公式取 $\mu=\nu=0$：四项分别是两个导数项和两个乘积项。">{R`R_{00} = \Gamma^\alpha{}_{00,\alpha} - \Gamma^\alpha{}_{0\alpha,0} + \Gamma^\alpha{}_{\beta\alpha}\Gamma^\beta{}_{00} - \Gamma^\alpha{}_{\beta0}\Gamma^\beta{}_{0\alpha}.`}</Eq>
      <Tx>{R`回忆：在 FLRW 中，两个下指标都为 0 的 Christoffel 符号为零（$\Gamma^\alpha{}_{00}=0$），所以右边第一、三项消失。同理，第二、四项中的 $\alpha$、$\beta$ 必须是空间指标（$\Gamma^0{}_{00}=\Gamma^0{}_{0i}=0$）。剩下`}</Tx>
      <Eq n="3.5" say="FLRW 中 $R_{00}$ 只剩两项：$\Gamma^i{}_{0i}$ 的时间导数和两个“一时一空” Christoffel 符号的乘积。">{R`R_{00} = -\Gamma^i{}_{0i,0} - \Gamma^i{}_{j0}\Gamma^j{}_{0i}.`}</Eq>
      <Tx>{R`代入 (2.25) 的 $\Gamma^i{}_{0j}=\delta_{ij}\dot a/a$，直接得到`}</Tx>
      <Eq n="3.6" keyEq title={R`$R_{00}$`} say="Ricci 张量的时–时分量只取决于减速度：$R_{00}=-3\ddot a/a$——导数项与乘积项里的 $\dot a^2$ 恰好抵消。">{R`\begin{aligned}R_{00} &= -\delta_{ii}\frac{\partial}{\partial t}\left(\frac{\dot a}{a}\right) - \left(\frac{\dot a}{a}\right)^2\delta_{ij}\delta_{ij}\\ &= -3\left[\frac{\ddot a}{a} - \frac{\dot a^2}{a^2}\right] - 3\left(\frac{\dot a}{a}\right)^2\\ &= -3\frac{\ddot a}{a}.\end{aligned}`}</Eq>
      <Tx>{R`第二行的因子 3 来自 $\delta_{ij}\delta_{ij}=\delta_{ii}$：它表示对三个空间指标求和，每个计 1。空–空分量的推导留作练习（\exref{3.3}），结果是`}</Tx>
      <Eq n="3.7" keyEq title={R`$R_{ij}$`} say="Ricci 张量的空–空分量正比于 $\delta_{ij}$（各向同性），系数同时含 $\dot a^2$ 与 $a\ddot a$。">{R`R_{ij} = \delta_{ij}\left[2\dot a^2 + a\ddot a\right].`}</Eq>
      <Derivation title={R`补全：$R_{ij}$ 与 $R_{i0}$（习题 3.3 的核心步骤）`} steps={[
        { tex: R`R_{ij}=\Gamma^\alpha{}_{ij,\alpha}-\Gamma^\alpha{}_{i\alpha,j}+\Gamma^\alpha{}_{\beta\alpha}\Gamma^\beta{}_{ij}-\Gamma^\alpha{}_{\beta j}\Gamma^\beta{}_{i\alpha}`, why: R`在 \eqref{3.3} 中取 $\mu=i$、$\nu=j$。` },
        { tex: R`\Gamma^\alpha{}_{ij,\alpha}=\partial_t\Gamma^0{}_{ij}=\delta_{ij}\,\partial_t(a\dot a)=\delta_{ij}(\dot a^2+a\ddot a)`, why: R`$\Gamma^\alpha{}_{ij}$ 只有 $\alpha=0$ 非零（$\Gamma^0{}_{ij}=\delta_{ij}a\dot a$），且只依赖时间。` },
        { tex: R`\Gamma^\alpha{}_{i\alpha,j}=0`, why: R`所有 Christoffel 符号只依赖时间，对空间坐标 $x^j$ 的导数为零。` },
        { tex: R`\Gamma^\alpha{}_{\beta\alpha}\Gamma^\beta{}_{ij}=\Gamma^\alpha{}_{0\alpha}\Gamma^0{}_{ij}=3\frac{\dot a}{a}\cdot\delta_{ij}a\dot a=3\dot a^2\delta_{ij}`, why: R`$\Gamma^\beta{}_{ij}$ 只在 $\beta=0$ 时非零；$\Gamma^\alpha{}_{0\alpha}=\Gamma^k{}_{0k}=3\dot a/a$。` },
        { tex: R`\Gamma^\alpha{}_{\beta j}\Gamma^\beta{}_{i\alpha}=\Gamma^0{}_{kj}\Gamma^k{}_{i0}+\Gamma^k{}_{0j}\Gamma^0{}_{ik}=2\dot a^2\delta_{ij}`, why: R`非零组合只有 $(\alpha,\beta)=(0,k)$ 与 $(k,0)$ 两种，每种贡献 $a\dot a\cdot\dot a/a=\dot a^2$。` },
        { tex: R`R_{ij}=\delta_{ij}\left[\dot a^2+a\ddot a+3\dot a^2-2\dot a^2\right]=\delta_{ij}\left[2\dot a^2+a\ddot a\right]`, why: R`四项相加即 \eqref{3.7}。` },
        { tex: R`R_{i0}=\Gamma^\alpha{}_{i0,\alpha}-\Gamma^\alpha{}_{i\alpha,0}+\Gamma^\alpha{}_{\beta\alpha}\Gamma^\beta{}_{i0}-\Gamma^\alpha{}_{\beta0}\Gamma^\beta{}_{i\alpha}=0`, why: R`逐项：① $\Gamma^\alpha{}_{i0}$ 只有 $\alpha=j$ 非零，而它只依赖时间，对 $x^j$ 求导为零；② $\Gamma^\alpha{}_{i\alpha}=\Gamma^0{}_{i0}+\Gamma^j{}_{ij}=0$；③ $\Gamma^\beta{}_{i0}$ 只有 $\beta=j$ 非零，配上 $\Gamma^\alpha{}_{j\alpha}=0$；④ $\Gamma^\alpha{}_{\beta0}$ 只有 $\alpha=k,\beta=l$ 非零，配上 $\Gamma^l{}_{ik}=0$。物理上：各向同性不允许存在特殊的空间方向，$R_{i0}$ 只能为零。` },
      ]} result={R`$R_{ij}=\delta_{ij}(2\dot a^2+a\ddot a)$，$R_{i0}=0$。`} collapsed />

      <Tx>{R`**第三步：Ricci 标量。**有了 $R_{00}$ 和 $R_{ij}$ 就能算 Ricci 标量：`}</Tx>
      <Eq n="3.8" say="Ricci 标量是用逆度规对 Ricci 张量求迹：时间分量带负号，空间分量除以 $a^2$。">{R`\begin{aligned}R &\equiv g^{\mu\nu}R_{\mu\nu}\\ &= -R_{00} + \frac{1}{a^2}R_{ii}.\end{aligned}`}</Eq>
      <Tx>{R`对 $i$ 求和又给出一个因子 3：$-R_{00}=3\ddot a/a$，$R_{ii}/a^2=3(2\dot a^2+a\ddot a)/a^2$，于是`}</Tx>
      <Eq n="3.9" keyEq title="FLRW 的 Ricci 标量" say="欧氏 FLRW 时空的曲率标量只由 $\ddot a/a$ 和 $H^2$ 构成，系数都是 6——与对称性论证的预期完全一致。">{R`R = 6\left[\frac{\ddot a}{a} + \left(\frac{\dot a}{a}\right)^2\right].`}</Eq>
      <Tx>{R`正如所料，它只含 $\ddot a/a$ 和 $(\dot a/a)^2$。注意：虽然空间截面是平直的，**时空**却是弯曲的（$R\neq0$）——膨胀本身就是时空曲率。在宇宙学之外，Ricci 标量也可以用来判断一个度规描述的是真正弯曲的空间，还是"用奇怪坐标写出的欧氏空间"（\exref{3.1}）。不过要小心：也有著名的弯曲空间恰好 $R=0$，例如 Schwarzschild 黑洞解在奇点以外处处 $R=0$。`}</Tx>

      <Tx>{R`**第四步：把宇宙学常数搬到右边。**写出 Einstein 方程之前，再做最后一个处理。$\Lambda$ 项只涉及度规张量，没有什么能阻止我们把它移到 \eqref{3.1} 的右边。这样就可以形式上定义宇宙学常数对能动张量的贡献：`}</Tx>
      <Eq n="3.10" keyEq title="宇宙学常数的能动张量" say="把 $\Lambda$ 看成一种成分：它的能动张量正比于单位矩阵，能量密度 $\rho_\Lambda=\Lambda/8\pi G$，压强 $=-\rho_\Lambda$。">{R`T_{(\Lambda)}{}^\mu{}_\nu = -\frac{\Lambda}{8\pi G}\delta^\mu_\nu = \begin{pmatrix}-\rho_\Lambda&0&0&0\\0&-\rho_\Lambda&0&0\\0&0&-\rho_\Lambda&0\\0&0&0&-\rho_\Lambda\end{pmatrix},\quad\text{where}\quad \rho_\Lambda \equiv \frac{\Lambda}{8\pi G}`}</Eq>
      <Tx>{R`就是宇宙学常数的等效能量密度。与 (2.44) 的 $T^\mu{}_\nu=\mathrm{diag}(-\rho,\mathcal P,\mathcal P,\mathcal P)$ 对比，立刻读出 $\mathcal P_\Lambda=-\rho_\Lambda$，即 $w_\Lambda=-1$。我们由此**证明**了宇宙学常数的物态方程恰为 $-1$。由能量密度的演化律 (2.61) 也知道必须如此：若 $w_\Lambda$ 取别的值，宇宙学常数的等效能量密度就不会是**常数**了。

把 $\Lambda$ 放在 Einstein 方程右边的最大好处是：所有结果都可以很容易地推广到**非 $\Lambda$ 的、动力学的暗能量**——只需把 $\rho_\Lambda$ 换成 $\rho_{\rm DE}(t)$。`}</Tx>

      <Tx>{R`**第五步：00 分量 = Friedmann 方程。**现在推导均匀宇宙中标度因子满足的方程。事实上只需要 Einstein 方程的时–时分量：`}</Tx>
      <Eq n="3.11" say="Einstein 方程的时–时分量：几何一侧是 $R_{00}-\frac12g_{00}R$，物质一侧是能量密度。">{R`R_{00} - \frac12 g_{00}R = 8\pi G\,T_{00}.`}</Eq>
      <Tx>{R`左边：$-3\ddot a/a+\frac12\cdot6[\ddot a/a+\dot a^2/a^2]=3\dot a^2/a^2$——$\ddot a$ 项**恰好抵消**（这正是 Einstein 张量的妙处）。右边：能动张量的分量 $T_{00}$ 就是能量密度 $\rho$。于是我们最终得到`}</Tx>
      <Eq n="3.12" keyEq title="第一 Friedmann 方程" say="宇宙膨胀率的平方正比于总能量密度：装的东西越多，膨胀得越快（或减速得越厉害）。这里的 $\rho$ 已包括宇宙学常数/暗能量。">{R`\left(\frac{\dot a}{a}\right)^2 = \frac{8\pi G}{3}\rho,`}</Eq>
      <Tx>{R`注意这里的 $\rho$ 已包括 $\rho_\Lambda$（一般地，$\rho_{\rm DE}$）。这就是**第一 Friedmann 方程**（\exref{3.4} 中你会推出第二 Friedmann 方程）。如果这是你第一次亲手从 Einstein 方程推出一个明确的结果——恭喜！一般来说这并不容易。

**换成观测者熟悉的形式。**为了更接近第 1 章的 (1.3)，回忆 $(\dot a/a)^2$ 就是哈勃率的平方，而临界密度定义为 $\rho_{\rm cr}\equiv3H_0^2/8\pi G$。两边同除以 $H_0^2$：`}</Tx>
      <Eq n="3.13" keyEq title="Friedmann 方程（欧氏宇宙）" say="今天以 $H_0$ 为单位的膨胀率平方，等于各成分以临界密度为单位、按各自物态方程标度后的总和。">{R`\frac{H^2(t)}{H_0^2} = \frac{\rho(t)}{\rho_{\rm cr}} = \sum_{s={\rm r,m},\nu,{\rm DE}}\Omega_s\,[a(t)]^{-3(1+w_s)}.`}</Eq>
      <Tx>{R`这里 $\rho$ 计入**所有**成分的能量密度：物质、辐射、中微子、暗能量。第二个等号用了 (2.71)，并假设各成分的物态方程为常数（至少对中微子这并不准确——它们从相对论性变为非相对论性——但推广很简单：把 $\Omega_sa^{-3(1+w_s)}$ 换成 $\rho_s(a)/\rho_{\rm cr}$ 即可）。

推导中我们假设了宇宙是欧氏的，所以 \eqref{3.13} 没有曲率项。仿照 (1.3) 补上它也很简单：定义 $\Omega_{\rm K}\equiv1-\Omega_0\equiv1-\sum_s\Omega_s$，就有`}</Tx>
      <Eq n="3.14" keyEq title="Friedmann 方程（含曲率）" say="完整的 Friedmann 方程：各成分之外再加一个按 $a^{-2}$ 变化的曲率项；只要知道今天的 $\Omega_s$ 和 $w_s$，就能算出整个膨胀历史。">{R`\frac{H^2(t)}{H_0^2} = \sum_{s={\rm r,m},\nu,{\rm DE}}\Omega_s\,[a(t)]^{-3(1+w_s)} + \Omega_{\rm K}\,[a(t)]^{-2}.`}</Eq>
      <Tx>{R`（\exref{3.5} 会从开放宇宙的度规出发，用 Einstein 方程**推出**这个曲率项。）这一个方程就是计算**均匀宇宙演化**所需要的全部。下面的交互图对 \eqref{3.14} 直接积分 $t(a)=\int da/\dot a$ 并反解出 $a(t)$。`}</Tx>
      <FriedmannPlot />
      <Box kind="data" title="读图与数值核对">{R`默认参数 $\Omega_{\rm m}=0.3$、$\Omega_\Lambda=0.7$、$h=0.7$ 给出宇宙年龄 $t_0=13.47\,\mathrm{Gyr}$，与平直 $\Lambda$CDM 的解析解 $t_0=\frac{2}{3\sqrt{\Omega_\Lambda}H_0}\mathrm{arsinh}\sqrt{\Omega_\Lambda/\Omega_{\rm m}}=13.467\,\mathrm{Gyr}$ 一致；把 $\Omega_\Lambda$ 拉到 0、$\Omega_{\rm m}$ 拉到 1（Einstein–de Sitter），得 $t_0=2/(3H_0)=9.31\,\mathrm{Gyr}$，$a\propto t^{2/3}$；$\Omega_{\rm m}=2$、$\Omega_\Lambda=0$ 的闭合宇宙在 $t=\pi\Omega_{\rm m}/[H_0(\Omega_{\rm m}-1)^{3/2}]=87.8\,\mathrm{Gyr}$ 时坍缩（大挤压）。若 $\Omega_\Lambda$ 大到使 $\dot a^2$ 在 $a<1$ 处变负，就不存在从 $a=0$ 出发的大爆炸解（"反弹"宇宙），图中会提示。`}</Box>
      <Tx>{R`**各成分在 $H^2$ 中的份额。**\eqref{3.14} 右边是一个"预算表"：每一项除以总和，就是该成分在那个时刻的密度参数 $\Omega_s(a)=\Omega_sa^{-3(1+w_s)}/(H/H_0)^2$。下图显示宇宙依次经历辐射主导、物质主导、暗能量主导三个时代；竖线标出物质–辐射相等时刻，以及由第二 Friedmann 方程（\exref{3.4}、\exref{3.6}）给出的**开始加速**的时刻（$\ddot a=0$）。`}</Tx>
      <FractionPlot />
      <Box kind="warning" title="常见误解：H 大不等于“加速”">{R`\eqref{3.12} 只给出 $\dot a^2$，决定不了 $\ddot a$ 的符号。加速与否看第二 Friedmann 方程 $\ddot a/a=-\frac{4\pi G}{3}(\rho+3\mathcal P)$（\eqref{3.90}）：只有 $\rho+3\mathcal P<0$，也就是（单一成分时）$w<-1/3$ 的成分占优时，宇宙才加速。平直 $\Lambda$CDM 中加速始于 $\rho_{\rm m}=2\rho_\Lambda$，即 $a_{\rm acc}=(\Omega_{\rm m}/2\Omega_\Lambda)^{1/3}=0.598$（$z\approx0.67$），**早于**暗能量与物质密度相等（$a=0.754$）。`}</Box>
      <Tx>{R`**小结与过渡。**引力一侧到此为止：Einstein 方程的 00 分量 + FLRW 度规 = Friedmann 方程，它决定了 $a(t)$。§3.3.1 会超越背景宇宙、加入扰动，届时将遇到大量额外的引力物理，包括牛顿引力在膨胀宇宙中的推广。但在那之前，先转向方程的另一边——描述物质和辐射的 Boltzmann 方程。`}</Tx>
    </Sec>);
}
