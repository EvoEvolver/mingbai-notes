// 补充材料 B_III：几种特殊情形下的概率流（式 BIII-1 … BIII-26）
// 讲法：先给"常势区里的流"两条规则（行波：各自贡献、无交叉项；倏逝波：只有交叉项），再用它们读一维势阶，最后用二维斜入射把倏逝波里"藏起来"的流显露出来。
import { Sec, Sub, Tx, TxI, Eq, Box, C } from "@kit";
import { StepCurrentPlot, ObliqueCurrentPlot } from "./_ch03c_plots.jsx";
import { StepFig, WaveVectorFig, LateralShiftFig } from "./_ch03c_figs.jsx";

const R = String.raw;
const AA = R`\sym{Bamp}{A}`;           // B_III 的平面波振幅 A、A'
const E1 = R`\sym{Ex}{E}_1`, E2 = R`\sym{Ey}{E}_2`;   // 斜入射问题中 x、y 方向的分离能量
const P1 = R`\sym{phx}{\varphi}_1`, P2 = R`\sym{phy}{\varphi}_2`;
const RB = R`\sym{rhoB}{\rho}`;        // 一维倏逝波的衰减常数

export function SecB() {
  return (
    <Sec n="BIII" title="Study of the probability current in some special cases" zh="几种特殊情形下的概率流"
      gist={R`常势区中：反向行波的流各算各的、没有交叉项；倏逝波恰好相反，单独一支没有流，只有增长支与衰减支的交叉项才带流。由此读出势阶的 $R$、$T$ 与流守恒；全反射时禁区内的流在一维被"抵消掉"，在二维斜入射中则以沿界面流动、指数衰减的形式显露出来。`}
      why={R`概率流是"粒子往哪里走"的局域描述。$\mathrm H_{\rm I}$ 中直接从振幅比定义了反射、透射系数，这里用流把它们放到坚实的基础上，并回答一个令人不安的问题：全反射时禁区里明明有概率，为什么流为零？`}
      gives={["BIII-4", "BIII-7", "BIII-12", "BIII-25", "BIII-26"]}>
      <p className="muted">本节概念：<C id="current" /></p>
      <Tx>{R`回顾第 III 章 \mainref{D-17} 引入的概率流：`}</Tx>
      <Eq n="BIII-1" keyEq title="概率流" say="概率流由波函数与其梯度构成，等价于 $\frac\hbar m\mathrm{Im}(\psi^*\boldsymbol\nabla\psi)$；实波函数的流处处为零。">{R`\mathbf J(\mathbf r,t)=\frac\hbar{2mi}\left[\psi^*(\mathbf r,t)\boldsymbol\nabla\psi(\mathbf r,t)-\text{c.c.}\right]`}</Eq>
      <Tx>{R`（c.c. 表示前一项的复共轭。）等价地 $\mathbf J=\frac\hbar m\mathrm{Im}(\psi^*\boldsymbol\nabla\psi)$。两个推论值得先记住：**实函数（或整体相位乘实函数）不带流**；**流对波函数是二次的**，两个分量叠加时可能出现交叉项。本节要看的正是交叉项在什么时候出现。`}</Tx>

      <Sub n="BIII-1" title="Expression for the current in constant potential regions" zh="常势区中的流：两条规则">
        <Tx>{R`一维、势恒为 $V_0$ 的区域里，定态只可能是两种样子（$\mathrm H_{\rm I}$）。

**(i) $E>V_0$：两列反向行波。**`}</Tx>
        <Eq n="BIII-2" say="能量高于势时，常势区的波函数是向右、向左两列平面波的叠加。">{R`\psi(x)=${AA}\,\mathrm e^{ikx}+${AA}'\,\mathrm e^{-ikx}`}</Eq>
        <Eq n="BIII-3" say="波数由超出势的那部分能量（动能）决定。">{R`E-V_0=\frac{\hbar^2k^2}{2m}`}</Eq>
        <Tx>{R`代入 \eqref{BIII-1}，$\psi^*\psi'$ 中的交叉项是 $ik(z-z^*)$，其中 $z=(${AA}')^*${AA}\,\mathrm e^{2ikx}$；它等于 $-2k\,\mathrm{Im}\,z$，是实数，所以取虚部后只剩：`}</Tx>
        <Eq n="BIII-4" keyEq title="行波的流" say="两列反向行波的流各自等于速度 $\hbar k/m$ 乘以各自的强度，彼此相减，没有交叉项。">{R`J_x=\frac{\hbar k}m\left[|${AA}|^2-|${AA}'|^2\right]`}</Eq>
        <Tx>{R`解读很朴素：$\hbar k/m$ 是速度，$|${AA}|^2$、$|${AA}'|^2$ 是两列波的概率密度，流 = 密度 × 速度，两列各算各的。概率**密度**里有驻波式的干涉条纹，**流**里却没有——这是行波的一个重要特点。

**(ii) $E<V_0$：两支实指数（倏逝波）。**`}</Tx>
        <Eq n="BIII-5" say="能量低于势时，常势区的波函数是增长与衰减两支实指数的叠加。">{R`\psi(x)=B\,\mathrm e^{${RB}x}+B'\,\mathrm e^{-${RB}x}`}</Eq>
        <Eq n="BIII-6" say="衰减常数由势比能量高出的部分决定。">{R`V_0-E=\frac{\hbar^2${RB}^2}{2m}`}</Eq>
        <Tx>{R`这回情况反过来：每一支单独都是"常数乘实函数"，不带流；$|B|^2\mathrm e^{2${RB}x}$、$|B'|^2\mathrm e^{-2${RB}x}$ 这些项在取虚部时全部消失，**只剩交叉项**：`}</Tx>
        <Eq n="BIII-7" keyEq title="倏逝波的流" say="倏逝区的流只来自增长支与衰减支的交叉项，与 $x$ 无关；两支中任一系数为零，流就为零。">{R`J_x=\frac{\hbar${RB}}m\left[iB^*B'+\text{c.c.}\right]`}</Eq>
        <Tx>{R`即 $J_x=-\frac{2\hbar${RB}}m\mathrm{Im}(B^*B')$。它与 $x$ 无关（流在定态中必须守恒），而且**两支系数都不为零才有流**。这正是隧穿的机制：势垒内部同时有增长支与衰减支，它们的交叉项把流"运"过禁区。

两条规则对照着记：`}</Tx>
        <div className="tb-table-wrap"><table className="tb-table"><thead><tr><th></th><th><TxI>{R`行波区 $E>V_0$`}</TxI></th><th><TxI>{R`倏逝区 $E<V_0$`}</TxI></th></tr></thead><tbody>
          <tr><td>单个分量</td><td><TxI>{R`带流 $\pm\hbar k|${AA}|^2/m$`}</TxI></td><td>不带流</td></tr>
          <tr><td>两分量的交叉项</td><td>对流无贡献（只进入密度）</td><td>流的唯一来源</td></tr>
        </tbody></table></div>
      </Sub>

      <Sub n="BIII-2" title="Application to potential step problems" zh="应用到势阶">
        <Tx>{R`现在把两条规则用到 $\mathrm H_{\rm I}$、$\mathrm J_{\rm I}$ 研究过的势阶上：质量 $m$、能量 $E$ 的粒子沿 $Ox$ 从左方射来，在 $x=0$ 遇到高 $V_0$ 的台阶。`}</Tx>
        <StepFig />
        <Tx>{R`**$E>V_0$：反射与透射都是流的比值。**沿用 $\mathrm H_{\rm I}$ 式 (11)、(12) 的记号（区域 I 中波数 $k_1$、振幅 $A_1$、$A_1'$；区域 II 中波数 $k_2$、振幅 $A_2$、$A_2'$），只让粒子从左边来：`}</Tx>
        <Eq n="BIII-8" say="区域 II 中没有从右边射来的波。">{R`A_2'=0`}</Eq>
        <Tx>{R`由规则 (i)，两个区域的流分别是`}</Tx>
        <Eq n="BIII-9" say="区域 I 的流是入射流减去反射流。">{R`J_{\rm I}=\frac{\hbar k_1}m\left[|A_1|^2-|A_1'|^2\right]`}</Eq>
        <Eq n="BIII-10" say="区域 II 只有透射波，流等于透射波的速度乘强度。">{R`J_{\rm II}=\frac{\hbar k_2}m|A_2|^2`}</Eq>
        <Tx>{R`$J_{\rm I}$ 天然分成"入射流"与"反射流"两部分。反射系数就是反射流与入射流之比：`}</Tx>
        <Eq n="BIII-11" say="反射系数等于反射振幅与入射振幅之比的模方（两者速度相同，比值里抵消）。">{R`R=\left|\frac{A_1'}{A_1}\right|^2`}</Eq>
        <Tx>{R`透射系数是透射流与入射流之比——这里两侧速度**不同**，比值里留下速度比 $k_2/k_1$：`}</Tx>
        <Eq n="BIII-12" keyEq title="透射系数" say="透射系数是透射流与入射流之比，比振幅模方之比多一个速度比 $k_2/k_1$。">{R`T=\frac{k_2}{k_1}\left|\frac{A_2}{A_1}\right|^2`}</Eq>
        <Tx>{R`这正是 $\mathrm H_{\rm I}$ 的式 (15)、(16)。流的观点让两件事变得显然：(a) 定态中流处处相等，$J_{\rm I}=J_{\rm II}$ 就是 $R+T=1$；(b) $T$ 中的 $k_2/k_1$ 不是"修正"，而是"流 = 密度乘速度"的直接结果（$\mathrm J_{\rm I}$ 用波包解释过同一个因子：透射波包被压窄）。下图把这一切摆在一起：$|\psi|^2$ 在区域 I 有驻波条纹，$J$ 却在两区是同一条水平线。`}</Tx>
        <StepCurrentPlot />
        <Tx>{R`**$E<V_0$：禁区里有概率，却没有流。**区域 I 的 \eqref{BIII-9} 照旧成立；区域 II 中只能留下衰减支（$\mathrm H_{\rm I}$ 式 (20) 中 $B_2=0$，否则波函数在 $x\to+\infty$ 发散）：`}</Tx>
        <Eq n="BIII-13" say="禁区中只剩随距离指数衰减的一支。">{R`\varphi_{\rm II}(x)=B_2'\,\mathrm e^{-\rho_2x}`}</Eq>
        <Tx>{R`按规则 (ii)，只有一支就没有流：`}</Tx>
        <Eq n="BIII-14" say="禁区中只有一支实指数，所以概率流为零，透射流为零。">{R`J_{\rm II}=0`}</Eq>
        <Tx>{R`于是透射流为零、$R=1$，与 $\mathrm H_{\rm I}$ 的式 (24) 吻合。这里藏着一个表面上的矛盾：禁区里 $|\varphi_{\rm II}|^2\ne0$，粒子**可以**在那里被找到，可流却是零。

**先说为什么流必须是零。**定态的密度不随时间变化，连续性方程 $\partial_t\rho+\partial_xJ=0$ 迫使 $J$ 与 $x$ 无关；而在 $x\to+\infty$ 处波函数已衰减为零，那里的流为零，所以禁区里处处为零。这是一个关于**净**流的结论，它并不说禁区里"什么也没发生"。

**再说发生了什么。**定态是无穷长时间的平均，要看过程得回到波包（$\mathrm J_{\rm I}$ §1）：入射波包的前沿钻进禁区一小段，逗留一会儿（全反射延迟就来源于此）再退出来。进入时流为正，退出时流为负，定态把这两段历史叠在一起，正好抵消。换句话说，一维几何里"进"和"出"走的是同一条路、方向恰好相反，流的内部结构被完全遮住了。要让它露出来，就得让粒子在禁区里除了"进、出"之外还有别的运动方向——给它一个平行于界面的速度，也就是斜入射。`}</Tx>
      </Sub>

      <Sub n="BIII-3" title="Probability current of incident and evanescent waves, in the case of reflection from a two-dimensional potential step" zh="二维势阶上的斜入射：倏逝波里的流显形">
        <Tx>{R`**设置。**粒子在 $xOy$ 平面内运动，势能与 $y$ 无关：`}</Tx>
        <Eq n="BIII-15" say="二维势阶：左半平面势为零，右半平面势为 $V_0$，与 $y$ 无关。">{R`\begin{aligned}V(x,y)&=0\quad\text{if}\ \ x<0\\V(x,y)&=V_0\quad\text{if}\ \ x>0\end{aligned}`}</Eq>
        <Tx>{R`**化为一维。**这是 \Ic{FI-2} 讨论过的可分离情形：$V=V_1(x)+V_2(y)$，其中 $V_1$ 是一维台阶、$V_2\equiv0$。于是可以找乘积形式的本征函数：`}</Tx>
        <Eq n="BIII-16" say="势可分离时，二维定态可以取为 $x$ 方向与 $y$ 方向两个一维函数的乘积。">{R`\varphi(x,y)=${P1}(x)\,${P2}(y)`}</Eq>
        <Eq n="BIII-17" say="两个方向的分离能量相加等于粒子的总能量。">{R`${E1}+${E2}=E\quad\text{(total energy of the particle)}`}</Eq>
        <Tx>{R`$${P1}$ 满足一维台阶的本征方程（能量 $${E1}$），$${P2}$ 满足自由粒子方程（能量 $${E2}$），后者就是平面波 $\mathrm e^{ik_yy}$。关键假设是 **$${E1}<V_0$**：总能量可以比 $V_0$ 大，但"打向台阶"的那部分能量不够，于是沿 $x$ 方向发生全反射——这就是光学里的全内反射。用 $\mathrm H_{\rm I}$ 式 (11)、(20) 的形式，区域 I（$x<0$）为`}</Tx>
        <Eq n="BIII-18" say="区域 I 中是入射波与反射波的叠加，两者 $y$ 方向波数相同，$x$ 方向波数相反。">{R`\varphi_{\rm I}(x,y)=${AA}\,\mathrm e^{i(k_xx+k_yy)}+${AA}'\,\mathrm e^{i(-k_xx+k_yy)}`}</Eq>
        <Eq n="BIII-19" say="$x$、$y$ 两个方向的波数分别由各自的分离能量决定。">{R`k_x=\sqrt{\frac{2m${E1}}{\hbar^2}}\qquad\qquad k_y=\sqrt{\frac{2m${E2}}{\hbar^2}}`}</Eq>
        <Tx>{R`区域 II（$x>0$）中沿 $x$ 衰减、沿 $y$ 仍是行波：`}</Tx>
        <Eq n="BIII-20" say="区域 II 中波沿 $x$ 指数衰减，沿 $y$ 方向照样传播。">{R`\varphi_{\rm II}(x,y)=B\,\mathrm e^{-\rho_xx}\,\mathrm e^{ik_yy}`}</Eq>
        <Eq n="BIII-21" say="$x$ 方向的衰减常数由势与 $x$ 方向分离能量之差决定。">{R`\rho_x=\sqrt{\frac{2m(V_0-${E1})}{\hbar^2}}`}</Eq>
        <Tx>{R`**拼接给出振幅比。**在 $x=0$ 处要求 $\varphi$ 与 $\partial_x\varphi$ 连续（$\mathrm e^{ik_yy}$ 因子两边相同，直接约掉），得到 $\mathrm H_{\rm I}$ 式 (22)、(23)。引入一个角度把结果写得最紧凑：`}</Tx>
        <Eq n="BIII-22" say="定义角 $\theta$：其正切等于衰减常数与入射波数之比；能量越接近势顶，$\theta$ 越小。">{R`\tan\theta=\frac{\rho_x}{k_x}=\sqrt{\frac{V_0-${E1}}{${E1}}};\qquad0\le\theta\le\frac\pi2`}</Eq>
        <Eq n="BIII-23" say="反射振幅与入射振幅模相同，只差一个相位 $-2\theta$：全反射。">{R`\frac{${AA}'}{${AA}}=\frac{k_x-i\rho_x}{k_x+i\rho_x}=\mathrm e^{-2i\theta}`}</Eq>
        <Eq n="BIII-24" say="禁区中的振幅为入射振幅的 $2\cos\theta$ 倍，并带相位 $-\theta$。">{R`\frac B{${AA}}=\frac{2k_x}{k_x+i\rho_x}=2\cos\theta\,\mathrm e^{-i\theta}`}</Eq>
        <Tx>{R`**算流。**把 \eqref{BIII-18}、\eqref{BIII-20} 代入 \eqref{BIII-1}，分别取 $x$、$y$ 分量。区域 I：`}</Tx>
        <Eq n="BIII-25" keyEq title="入射区的流" say="入射区中垂直于界面的流为零（全反射）；平行于界面的流是两列波的流之和再加一个沿 $x$ 振荡的干涉项。">{R`\mathbf J_{\rm I}\begin{cases}(J_{\rm I})_x=\dfrac{\hbar k_x}m\left[|${AA}|^2-|${AA}'|^2\right]=0\\(J_{\rm I})_y=\dfrac{\hbar k_y}m\left|${AA}\,\mathrm e^{ik_xx}+${AA}'\,\mathrm e^{-ik_xx}\right|^2=\dfrac{\hbar k_y}m\,|${AA}|^2\,\left[2+2\cos(2k_xx+2\theta)\right]\end{cases}`}</Eq>
        <Tx>{R`区域 II：`}</Tx>
        <Eq n="BIII-26" keyEq title="倏逝区的流" say="倏逝区中流平行于界面，大小随离界面的距离按 $\mathrm e^{-2\rho_xx}$ 衰减。">{R`\mathbf J_{\rm II}\begin{cases}(J_{\rm II})_x=0\\(J_{\rm II})_y=\dfrac{\hbar k_y}m\,|B|^2\,\mathrm e^{-2\rho_xx}=\dfrac{\hbar k_y}m\,4|${AA}|^2\,\cos^2\theta\,\mathrm e^{-2\rho_xx}\end{cases}`}</Eq>
        <Tx>{R`**怎么读。**两个区域里 $J_x$ 都为零——垂直于界面的净流仍被抵消，这一点与一维相同。但现在有了**平行于界面**的分量：

• 区域 I 的 $(J_{\rm I})_y$ 由两部分组成。常数部分 $2|${AA}|^2$ 是入射流与反射流的矢量和：两者的 $x$ 分量相反、$y$ 分量相同，合成后只剩 $y$ 方向，大小加倍（下图左）。振荡部分 $2\cos(2k_xx+2\theta)$ 是两列波的干涉，使 $y$ 方向的流在离界面不同距离处一会儿强、一会儿弱。

• 区域 II 的 $(J_{\rm II})_y$ 在禁区里**沿界面流动**，随深入按 $\mathrm e^{-2\rho_xx}$ 衰减。在 $x=0$ 处两式相等（$2+2\cos2\theta=4\cos^2\theta$），流是连续的。`}</Tx>
        <WaveVectorFig />
        <ObliqueCurrentPlot />
        <Tx>{R`**倏逝区里沿界面的流意味着什么？**用波包来想：入射波包有一部分钻进禁区，停留一段与反射延迟 $\sym{tauD}{\tau}$（$\mathrm J_{\rm I}$ 式 (10)）同量级的时间再出来。斜入射时它在禁区里并非静止——它带着 $y$ 方向的动量 $\hbar k_y$，在这段时间里沿界面前进了一段距离。结果是反射波包相对于"几何反射点"**沿界面平移**了一段（下图），光学中称为 Goos–Hänchen 位移。一维情形看不到这一点，只因为 $k_y=0$。`}</Tx>
        <LateralShiftFig />
        <Box kind="warning" title="常见误解">{R`"全反射时粒子一点都没进入禁区"是错的：禁区里既有概率也有（平行于界面的）流。被抵消的只是**垂直**于界面的净流。反过来，"禁区里有概率，所以粒子一定穿过去了一部分"也是错的：只要禁区无限宽，透射流严格为零，$R=1$。`}</Box>
      </Sub>
    </Sec>);
}
