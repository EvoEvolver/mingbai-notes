// 补充材料 M_III：任意形状"势阱"中的束缚态（式 MIII-1 … MIII-18）
import { Sec, Sub, Tx, Eq, FormulaMap, Box, Derivation, C } from "@kit";
import { FM_MIII_9, FM_MIII_11 } from "./_ch03d_fmaps.jsx";
import { ShootingPlot } from "./_ch03d_plots.jsx";
import { BarrierWellFig } from "./_ch03d_figs.jsx";

const R = String.raw;
const BT = R`\tilde B`, BTP = R`\tilde B'`;

export function Revisit() {
  return (
    <Tx>{R`**插曲：回到一维问题。**有了第 II、III 章的数学工具与物理诠释，可以回过头更深入地讨论第 I 章的一些结果。接下来三个补充材料研究粒子在**任意形状**的标量势中的量子性质（矢势 $\mathbf A$ 的效应留到 $\mathrm E_{\rm VI}$），为简单起见只讨论一维：$\mathrm M_{\rm III}$ 讲束缚定态——能量构成分立谱；$\mathrm N_{\rm III}$ 讲非束缚态——能量构成连续谱；$\mathrm O_{\rm III}$ 讲一个因应用（尤其固体物理）而格外重要的特例：周期势。三者共用同一套思路——在势为零的区域写出指数解，用"左边的系数"表出"右边的系数"，再让边界条件说话。`}</Tx>);
}

export function SecM() {
  return (
    <Sec n="MIII" title={R`Bound states in a “potential well” of arbitrary shape`} zh="任意形状“势阱”中的束缚态"
      gist={R`阱外 $V=0$，束缚态只能是衰减指数：左边只保留 $\mathrm e^{\rho x}$，向右积分穿过阱，右边一般会冒出增长项 $\tilde B(E)\mathrm e^{\rho x}$；只有 $\tilde B(E)=0$ 的分立能量才平方可积——量子化来自边界条件。再由 $E=\langle T\rangle+\langle V\rangle$ 与 $\langle T\rangle>0$ 得 $-V_0<E<0$，且基态必高于阱底。`}
      why={R`方势阱里得到的"能谱分立、基态高于阱底"是否只是方势的巧合？这里证明它们对任意形状的阱都成立，并给出一个可以直接上机的求能级办法（打靶法）。`}
      gives={["MIII-1", "MIII-7", "MIII-8", "MIII-10", "MIII-17", "MIII-18"]}>
      <p className="muted">本节概念：<C id="bound_quant" /> · <C id="zero_point_well" /></p>
      <Revisit />

      <Tx>{R`**从方势阱到任意势阱。**\Ic{HI} 在方势阱（有限深与无限深）的特例里看到了束缚态的两个特征：能谱分立；基态能量高于经典的最低能量。这两点其实是普遍的，而且有许多物理后果。

先看经典粒子作为对照。约定无穷远处势为零（势能本来只确定到一个常数），势能曲线有一个"坑"，最深处 $-V_0$ 在 $x_0$（点 $M_0$）。经典粒子的命运只取决于能量 $E_{cl}$：恰好 $-V_0$ 时静止在坑底；在 $-V_0$ 与 $0$ 之间时在坑里来回振荡，能量越高振幅越大；大于 $0$ 时翻出坑去，一去不回。

所以经典"束缚态"占据整段区间 $[-V_0,0)$，没有任何间隙。

量子粒子的能量确定的态是定态，波函数满足 $H$ 的本征方程`}</Tx>
      <Eq n="MIII-1" keyEq title="一维定态方程" say={R`一维定态方程：动能算符加势能作用在 $\varphi$ 上，等于能量乘 $\varphi$。`}>{R`\Big[-\frac{\hbar^2}{2m}\frac{\mathrm d^2}{\mathrm dx^2}+V(x)\Big]\varphi(x)=E\,\varphi(x)`}</Eq>
      <Tx>{R`**方程本身不挑能量。**这是二阶常微分方程：任给一个 $E$，在任一点随意指定 $\varphi$ 与 $\varphi'$，就能把解延拓到所有 $x$。所以单靠 \eqref{MIII-1} 不会限制能量。限制来自对 $\varphi$ 附加的边界条件——下面会看到，只有一部分 $E$ 能满足它们，这就是能级的量子化。`}</Tx>

      <Sub n="MIII-1" title="Quantization of the bound state energies" zh="束缚态能量的量子化">
        <Tx>{R`**定义。**所谓粒子的**束缚态**，是满足 \eqref{MIII-1} 且**平方可积**（square-integrable）的解——要描述粒子的真实物理态，这是必需的。它们是定态，而且概率密度 $|\varphi(x)|^2$ 只在有限区域内不可忽略：要让 $\int_{-\infty}^{+\infty}\mathrm dx\,|\varphi(x)|^2$ 收敛，$|\varphi|^2$ 在 $x\to\pm\infty$ 时必须足够快地趋于零。这对应经典粒子在阱里振荡、永远出不来的运动（$-V_0<E_{cl}<0$）。

我们要证明：平方可积这一条，就迫使可能的能量成为一组**分立**的值，而且也在 $-V_0$ 与 $0$ 之间。为了简单，设 $V(x)$ 在区间 $[x_1,x_2]$ 之外恒为零。

**第一步：阱的左边（区域 I，$x<x_1$）。**这里 $V=0$，解可以直接写出。若 $E>0$：`}</Tx>
        <Eq n="MIII-2" say={R`能量为正时，阱外的解是向左、向右传播的平面波的叠加。`}>{R`\varphi_{\rm I}(x)=A\,\mathrm e^{ikx}+A'\,\mathrm e^{-ikx}`}</Eq>
        <Eq n="MIII-3" say={R`阱外（$V=0$）的波数由能量决定。`}>{R`k=\sqrt{\frac{2mE}{\hbar^2}}`}</Eq>
        <Tx>{R`若 $E<0$：`}</Tx>
        <Eq n="MIII-4" say={R`能量为负时，阱外的解是增长与衰减两个实指数的叠加。`}>{R`\varphi_{\rm I}(x)=B\,\mathrm e^{\rho x}+B'\,\mathrm e^{-\rho x}`}</Eq>
        <Eq n="MIII-5" say={R`负能量对应的衰减常数：能量越负，波函数在阱外衰减得越快。`}>{R`\rho=\sqrt{-\frac{2mE}{\hbar^2}}`}</Eq>
        <Tx>{R`**$E>0$ 被排除。**\eqref{MIII-2} 是模不衰减的平面波叠加，积分`}</Tx>
        <Eq n="MIII-6" say={R`阱左侧对归一化积分的贡献；对平面波它发散。`}>{R`\int_{-\infty}^{x_1}\mathrm dx\,|\varphi_{\rm I}(x)|^2`}</Eq>
        <Tx>{R`发散（除非 $A=A'=0$，那样 $\varphi$ 处处为零）。只剩 \eqref{MIII-4}，于是得到第一个结论：**束缚态的能量都是负的**。再者，\eqref{MIII-4} 中的 $\mathrm e^{-\rho x}$ 在 $x\to-\infty$ 时发散，也必须去掉：`}</Tx>
        <Eq n="MIII-7" keyEq title="左侧只留衰减解" say={R`在阱的左边只保留朝左衰减的指数（系数可以取 1，因为方程是齐次的）。`}>{R`\varphi_{\rm I}(x)=\mathrm e^{\rho x}\qquad\text{若}\ x<x_1`}</Eq>
        <Tx>{R`（方程是齐次的，$\varphi$ 只确定到一个常数因子，所以把系数 $B$ 取为 1。）

**第二步：穿过势阱（区域 II，$x_1\le x\le x_2$）。**把 $\varphi_{\rm I}$ 向右延拓：在 $x=x_1$ 处取 $\varphi=\mathrm e^{\rho x_1}$、$\varphi'=\rho\,\mathrm e^{\rho x_1}$，以此为初值积分 \eqref{MIII-1}。二阶方程的解由这两个初值唯一确定，得到的 $\varphi_{\rm II}(x)$ 依赖于 $\rho$（即 $E$）与 $V(x)$ 的具体形状；它还是**实函数**（方程与初值都是实的）——这让我们可以把它画成普通曲线。

**第三步：阱的右边（区域 III，$x>x_2$）。**这里又是 $V=0$，解必然是`}</Tx>
        <Eq n="MIII-8" keyEq title="右侧的一般解" say={R`穿过势阱之后，右边一般同时含有增长项 $\tilde B\mathrm e^{\rho x}$ 与衰减项；两个实系数由 $x_2$ 处的拼接决定，并依赖于能量。`}>{R`\varphi_{\rm III}(x)=${BT}\mathrm e^{\rho x}+${BTP}\mathrm e^{-\rho x}`}</Eq>
        <Tx>{R`实常数 $${BT}$、$${BTP}$ 由 $x=x_2$ 处 $\varphi$ 与 $\mathrm d\varphi/\mathrm dx$ 的连续性决定，依赖于 $\rho$ 与 $V(x)$。

**量子化。**这样构造出的解平方可积吗？由 \eqref{MIII-8}，一般**不**可积——除非恰好 $${BT}=0$。对给定的 $V(x)$，$${BT}$ 通过 $\rho$ 成为 $E$ 的函数 $${BT}(E)$，所以束缚态能量是方程`}</Tx>
        <Box kind="key" title="量子化条件">{R`$$${BT}(E)=0$$ 的根 $E_1,E_2,\dots$。它们构成一个依赖于 $V(x)$ 的**分立谱**（§2 还将证明它们都大于 $-V_0$）。`}</Box>
        <Tx>{R`**数一数条件就明白了。**二阶方程的解有两个任意常数，扣掉整体倍数只剩一个比值。左边要求"只有衰减项"用掉了它；右边又要求"只有衰减项"——又一个条件。两个条件、一个自由参数，一般无解，只有能量这个"旋钮"恰好合适时才有解。所以量子化不是额外的假设，而是"两头都要收住"的结果。

这就是数值计算中的**打靶法**（shooting method）：从左边的衰减尾巴出发"射"向右边，调能量直到右边的增长项消失。下面的交互图就是这样做的——拖动能量可以看到 $\varphi$ 在右边向上或向下发散，恰好在本征值处收住；$${BT}(E)$ 的零点即能级。`}</Tx>
        <ShootingPlot />
        <Tx>{R`**读出结论。**任意形状势阱中，束缚态的可能能量构成一个分立集合（常说束缚态能量是**量子化**的）。这可以与谐振腔中电磁模式的量子化相比；经典力学里没有对应物——那里 $-V_0$ 到 $0$ 之间的所有能量都允许。最低能级 $E_1$ 叫**基态**，其上的 $E_2$ 叫**第一激发态**，再上 $E_3$ 叫第二激发态，依此类推。

**能级示意图。**习惯上在代表 $V(x)$ 的阱里，为每个态画一条水平线：纵坐标等于能量，两端落在与 $V(x)$ 的交点——即同能量经典粒子能到达的区域——线长大致表示波函数的空间范围。交互图中能级线就是这样画的。

第 I 章已经说过，能量量子化是导致量子力学诞生的事实之一。分立能级出现在大量物理系统中：原子（第 VII 章，氢原子）、谐振子（第 V 章）、原子核……`}</Tx>
        <Box kind="physics" title="补充：节点定理（振荡定理）">{R`交互图里还能看到一条原书此处没有展开的规律：按能量从低到高排列，第 $n$ 个束缚态的波函数恰有 $n-1$ 个节点（基态无节点）。直观理由：$E$ 增大时，阱内 $\varphi''/\varphi=(2m/\hbar^2)(V-E)$ 更负，$\varphi$ 振荡得更快，节点从右边一个一个"挤"进来；每多挤进一个，$\tilde B(E)$ 就过一次零。图中同时列出了每个能级的节点数，以及 Pöschl–Teller 阱 $V=-V_0/\cosh^2x$ 的精确能级 $E_n=-(s-n)^2$（$s(s+1)=V_0$，单位见图注）作为数值核对。`}</Box>
      </Sub>

      <Sub n="MIII-2" title="Minimum value of the ground state energy" zh="基态能量的下限">
        <Tx>{R`**要证明的事。**能级 $E_1,E_2,\dots$ 都高于势能的最小值 $-V_0$；并且用不确定关系理解它。

**把方程变成能量的平均值。**用 $\varphi^*(x)$ 乘 \eqref{MIII-1} 两边再积分：`}</Tx>
        <FormulaMap n="MIII-9" say={R`本征方程两边乘以 $\varphi^*$ 并积分：左边是动能项与势能项的积分，右边是能量乘归一化积分。`} tree={FM_MIII_9} start="E" />
        <Tx>{R`束缚态可以归一化，于是 \eqref{MIII-9} 简单地写成`}</Tx>
        <Eq n="MIII-10" keyEq title="能量 = 动能 + 势能的平均" say={R`束缚态的能量等于平均动能与平均势能之和。`}>{R`E=\langle T\rangle+\langle V\rangle`}</Eq>
        <Tx>{R`其中（第二个等号是分部积分，并利用 $|x|\to\infty$ 时 $\varphi\to0$）`}</Tx>
        <FormulaMap n="MIII-11" say={R`平均动能可以写成波函数斜率平方的积分，所以它永远不小于零。`} tree={FM_MIII_11} start="sq" />
        <Eq n="MIII-12" say={R`平均势能是势能按概率密度加权的平均。`}>{R`\langle V\rangle=\int_{-\infty}^{+\infty}\mathrm dx\,V(x)|\varphi(x)|^2`}</Eq>
        <Tx>{R`\eqref{MIII-10} 无非是说 $E$ 是动能与势能平均值之和：`}</Tx>
        <Eq n="MIII-13" say={R`平均动能就是 $P^2/2m$ 在该态中的平均值。`}>{R`\langle T\rangle=\langle\varphi|\frac{P^2}{2m}|\varphi\rangle`}</Eq>
        <Eq n="MIII-14" say={R`平均势能就是势能算符在该态中的平均值。`}>{R`\langle V\rangle=\langle\varphi|V(x)|\varphi\rangle`}</Eq>
        <Tx>{R`**两个不等式。**由 \eqref{MIII-11}，被积函数非负，且不能处处为零（否则 $\varphi$ 为常数，又要趋于零，只能恒为零）；由 \eqref{MIII-12}，$V(x)\ge-V_0$ 处处成立：`}</Tx>
        <Eq n="MIII-15" say={R`平均动能严格为正。`}>{R`\langle T\rangle>0`}</Eq>
        <Eq n="MIII-16" say={R`势能处处不低于 $-V_0$，所以它的平均也不低于 $-V_0$。`}>{R`\langle V\rangle\ge\int_{-\infty}^{+\infty}\mathrm dx\,(-V_0)\,|\varphi(x)|^2=-V_0`}</Eq>
        <Tx>{R`合起来：`}</Tx>
        <Eq n="MIII-17" keyEq title="束缚能级高于阱底" say={R`能量等于平均动能加平均势能；前者严格为正、后者不低于阱底，所以每个束缚能级都严格高于阱底。`}>{R`E=\langle T\rangle+\langle V\rangle>\langle V\rangle\ge-V_0`}</Eq>
        <Tx>{R`再加上 §1 的 $E<0$：**与经典力学一样，束缚态能量都在 $-V_0$ 与 $0$ 之间。**

**但有一处关键不同。**经典粒子可以恰好具有 $-V_0$（静止在 $M_0$），也可以只比 $-V_0$ 高一点点（小振动）；量子粒子的最低能量是基态 $E_1$，严格高于 $-V_0$。原因可以用 Heisenberg 关系看清：想让平均势能尽量小，由 \eqref{MIII-12}，波函数就得几乎完全集中在 $x_0$ 附近；于是 $\Delta X$ 很小，$\Delta P$ 必然很大。又因为`}</Tx>
        <Eq n="MIII-18" keyEq title="动能下界来自动量弥散" say={R`动量平方的平均至少等于动量的方差：动量弥散越大，平均动能就越大。`}>{R`\langle P^2\rangle=(\Delta P)^2+\langle P\rangle^2\ge(\Delta P)^2`}</Eq>
        <Tx>{R`动能 $\langle T\rangle=\langle P^2\rangle/2m$ 也就很大。势能越接近最小值，动能越是无限增长。基态波函数是两者的折中：两种能量之和取最小值。所以基态波函数有一定的空间范围，能量必然高于 $-V_0$——在量子力学中，不存在粒子"静止在阱底"的能量确定态。（交互图在基态旁列出了 $\langle T\rangle$ 与 $\langle V\rangle$，可以看到 $\langle T\rangle$ 并不小。）`}</Tx>
        <Box kind="note" title="评注：阱外可以有正的势垒">{R`束缚态能量在 $-V_0$ 与 $0$ 之间，所以只有当 $V(x)$ 在某些区域取负值时才可能有束缚态——这就是本补充材料选"阱"的原因（下一个补充材料不受此限）。不过并不排斥 $V(x)$ 在某些地方为正，例如阱被两侧的势垒包围（见下图；仍约定无穷远处 $V=0$）。这时经典上有一些**正能量**的运动也是有界的——被困在两个势垒之间；量子力学中同样的论证仍给出束缚态能量全在 $-V_0$ 与 $0$ 之间。物理上的差别在于：有限高的势垒永远不能把量子粒子完全挡回去，它总有一定概率靠隧道效应（\Ic{HI-2}）穿过去。`}</Box>
        <BarrierWellFig />
      </Sub>
    </Sec>);
}
