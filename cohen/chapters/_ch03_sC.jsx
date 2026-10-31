// §C 关于可观测量及其测量的假设的物理诠释。式 (C-1)–(C-51)，图 2、图 3
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { Fig, Sub3 } from "./_ch03_kit.jsx";
import { RhoPlot, NonCommuteFig } from "./_ch03_plots.jsx";

const R = String.raw;

export function SecC() {
  return (
    <Sec n="C" title="The physical interpretation of the postulates concerning observables and their measurement" zh="关于可观测量及其测量的假设的物理诠释"
      gist={R`把第三—第五假设用到具体问题上：它们重现了波函数的概率解释；解释了量子化；给出平均值 $\langle A\rangle=\bra\psi A\ket\psi$ 与方均根偏差 $\Delta A=\sqrt{\langle A^2\rangle-\langle A\rangle^2}$；并说明对易的可观测量可以同时测量（次序无关、信息不丢失），不对易的则不能——完全确定测量后态的测量必须针对一个 ECOC。`}
      why={R`假设本身很抽象；只有看到它们如何在熟悉的问题（位置、动量、平均值、不确定度、相继测量）中给出正确而具体的预言，才能真正理解并信任它们。`}
      gives={["C-1", "C-4", "C-17", "C-23", "C-26", "C-28", "C-36", "C-44", "C-49"]}>
      <p className="muted">本节概念：<C id="born_rule" /> · <C id="mean_rms" /> · <C id="compatibility" /> · <C id="reduction" /></p>

      <Sub n="C-1" title="The quantization rules are consistent with the probabilistic interpretation of the wave function" zh="量子化规则与波函数的概率解释相容">
        <Tx>{R`**一致性检验。** 第 I 章的 Born 解释（$|\psi(x)|^2$ 是位置概率密度、$|\overline\psi(p)|^2$ 是动量概率密度）是半启发式地引入的。如果 §B 的假设正确，它们应当作为特例推出来。所需的原料都有了：量子化规则说位置、动量对应 $X$、$P$；它们的谱是整条实轴，正与实验上位置、动量可取任何实数相符；第四假设的连续谱形式 \eqref{B-17} 则告诉我们怎样算概率。以一维为例，把 \eqref{B-17} 用于 $X$（本征矢 $\ket x$）：`}</Tx>
        <Eq n="C-1" keyEq title="位置概率" say="第四假设用于 $X$：在 $x$ 附近 $\dd x$ 内找到粒子的概率等于 $|\psi(x)|^2\dd x$——Born 解释作为推论出现。">{R`\dd\mathcal P(x)=|\braket{x|\psi}|^2\dd x`}</Eq>
        <Tx>{R`$\braket{x|\psi}$ 正是波函数，第一个特例到手。动量这边，先回忆 $P$ 的本征矢在位置表象中长什么样：`}</Tx>
        <Eq n="C-2" say="动量本征态在位置表象中是平面波，波数 $p/\hbar$ 与 de Broglie 关系一致。">{R`\braket{x|p}=\frac1{\sqrt{2\pi\hbar}}e^{\frac{ipx}{\hbar}}`}</Eq>
        <Tx>{R`它是 de Broglie 关系（第 I 章 §C-3）赋予动量 $p$ 的那个平面波——所以把 $P$ 的本征值叫作“动量”名副其实。再用一次 \eqref{B-17}：`}</Tx>
        <Eq n="C-3" say="第四假设用于 $P$：动量概率密度是动量表象波函数（$\psi$ 的 Fourier 变换）的模方。">{R`\dd\mathcal P(p)=|\braket{p|\psi}|^2\dd p=|\overline\psi(p)|^2\dd p`}</Eq>
        <Tx>{R`两条老规则都成了一般假设的推论。`}</Tx>
      </Sub>

      <Sub n="C-2" title="Quantization of certain physical quantities" zh="某些物理量的量子化">
        <Tx>{R`第三假设给了“量子化”一个清楚的出处：某个量取分立值，当且仅当它的可观测量有分立谱。这也说明量子化并不是普遍的——$X$、$P$ 的谱就是连续的——所以哪些量量子化、量子化成哪些值，需要实打实地算出来。这正是它作为物理预言的价值所在。氢原子（第 VII 章）是范例：我们完全照搬经典的 Coulomb 相互作用写出能量，用量子化规则得到 $H$，求解其本征值问题，就得到束缚态能级的具体数值，可与光谱直接比较。值得注意的是，这里**没有**修改任何力的规律；分立能级完全来自“能量是算符的本征值”这条假设。`}</Tx>
      </Sub>

      <Sub n="C-3" title="The measurement process" zh="测量过程">
        <Tx>{R`第四、第五假设把测量当作一个不加分析的“黑箱”：输入态，输出一个随机的本征值和一个约化后的态。黑箱内部发生了什么？这是量子力学基础中至今仍有争论的问题（原书参考文献第 5 部分；又见 F. Laloë, *Do we really understand quantum mechanics?*, Cambridge University Press, 2019）。难点在于：我们把被测体系与仪器分开描述，而测量恰恰是二者相互作用的结果；严格地说应当把二者作为一个整体用量子力学处理，这就引出了关于测量机制的许多微妙问题。

在本书的层次上只需记住两点。其一，约化所代表的“态的突变”就是观测对量子体系不可避免的扰动（第 I 章 §A-2、§A-3）；由于它取决于事先不确定的读数，这种扰动本身是不可预言的——除非读数是确定的（概率为 1），那时测量根本不改变态。其二，本书讨论的都是**理想测量**：仪器本身没有缺陷，它对体系的扰动仅仅是量子力学所要求的那一部分。真实的检偏器会吸收一些本该通过的光子，真实的探测器有噪声；但这些缺陷原则上可以不断减小，理想测量是它们的极限。`}</Tx>
      </Sub>

      <Sub n="C-4" title="Mean value of an observable in a given state" zh="可观测量在给定态中的平均值">
        <Tx>{R`**概率预言怎样与实验比较？** 单次测量证明不了任何概率。必须准备 $N$ 个处于同一态 $\ket\psi$ 的体系，每个测一次，统计各读数出现的比例；$N\to\infty$ 时比例应趋于预言的概率（实际中 $N$ 有限，还要用统计方法评估误差）。这批读数的平均值记为 $\langle A\rangle_\psi$，简记 $\langle A\rangle$（以后“可观测量”一词也兼指物理量本身）。

**结论先行。** 对归一化的 $\ket\psi$，这个平均值有一个不需要解本征值问题的公式：`}</Tx>
        <Eq n="C-4" keyEq title="平均值" say="平均值等于“三明治” $\bra\psi A\ket\psi$：直接由态和算符算出大量测量结果的平均。">{R`\boxed{\langle A\rangle_\psi=\bra\psi A\ket\psi}`}</Eq>
        <Tx>{R`**推导（离散谱）。** 第一步是统计学：记 $N$ 次中读到 $a_n$ 的次数为 $\mathcal N(a_n)$，则频率趋于概率，`}</Tx>
        <Eq n="C-5" say="大数定律：读数 $a_n$ 出现的频率在 $N\to\infty$ 时趋于其概率。">{R`\frac{\mathcal N(a_n)}{N}\ \underset{N\to\infty}{\longrightarrow}\ \mathcal P(a_n)`}</Eq>
        <Tx>{R`且计数之和就是总次数，`}</Tx>
        <Eq n="C-6" say="各读数的出现次数加起来等于总次数。">{R`\sum_n\mathcal N(a_n)=N`}</Eq>
        <Tx>{R`把相同读数合并后，样本平均写成`}</Tx>
        <Eq n="C-7" say="样本平均：每个读数按出现次数加权求和，再除以总次数。">{R`\frac1N\sum_na_n\mathcal N(a_n)`}</Eq>
        <Tx>{R`取极限，得到概率论中熟悉的期望值：`}</Tx>
        <Eq n="C-8" say="平均值的概率论形式：每个可能读数乘以其概率再求和。">{R`\langle A\rangle_\psi=\sum_na_n\,\mathcal P(a_n)`}</Eq>
        <Tx>{R`第二步是量子力学：代入 \eqref{B-7}，把每个模方拆成一个左矢一个右矢，`}</Tx>
        <Eq n="C-9" say="把概率写成 $\braket{\psi|u_n^i}\braket{u_n^i|\psi}$ 后代入。">{R`\langle A\rangle_\psi=\sum_na_n\sum_{i=1}^{g_n}\braket{\psi|u_n^i}\braket{u_n^i|\psi}`}</Eq>
        <Tx>{R`关键的一招是把数 $a_n$ “塞回”算符里——这只需本征方程`}</Tx>
        <Eq n="C-10" say="本征方程：可以用 $A\ket{u_n^i}$ 代替 $a_n\ket{u_n^i}$。">{R`A\ket{u_n^i}=a_n\ket{u_n^i}`}</Eq>
        <Tx>{R`于是两个求和合成一个完整的单位分解：`}</Tx>
        <Eq n="C-11" say="把本征值吸收回 $A$ 后，方括号是封闭关系，等于单位算符。">{R`\begin{aligned}\langle A\rangle_\psi&=\sum_n\sum_{i=1}^{g_n}\bra\psi A\ket{u_n^i}\braket{u_n^i|\psi}\\&=\bra\psi A\left[\sum_n\sum_{i=1}^{g_n}\ket{u_n^i}\bra{u_n^i}\right]\ket\psi\end{aligned}`}</Eq>
        <Tx>{R`方括号是 $\{\ket{u_n^i}\}$ 的封闭关系，等于 $1$，\eqref{C-4} 得证。

**连续谱（非简并）照搬同一步骤**，只是计数换成计数密度、求和换成积分。读数落在 $[\alpha,\alpha+\dd\alpha]$ 的次数 $\dd\mathcal N(\alpha)$ 满足`}</Tx>
        <Eq n="C-12" say="连续谱的大数定律：落在小区间内的频率趋于该区间的概率。">{R`\frac{\dd\mathcal N(\alpha)}{N}\ \underset{N\to\infty}{\longrightarrow}\ \dd\mathcal P(\alpha)`}</Eq>
        <Tx>{R`样本平均 $\frac1N\int\alpha\,\dd\mathcal N(\alpha)$ 的极限是`}</Tx>
        <Eq n="C-13" say="连续谱的平均值：读数 $\alpha$ 按概率元加权积分。">{R`\langle A\rangle_\psi=\int\alpha\ \dd\mathcal P(\alpha)`}</Eq>
        <Tx>{R`代入 \eqref{B-17}：`}</Tx>
        <Eq n="C-14" say="代入概率密度 $|\braket{v_\alpha|\psi}|^2$。">{R`\langle A\rangle_\psi=\int\alpha\ \braket{\psi|v_\alpha}\braket{v_\alpha|\psi}\ \dd\alpha`}</Eq>
        <Tx>{R`同样把 $\alpha$ 换回算符，`}</Tx>
        <Eq n="C-15" say="连续谱的本征方程，用来把 $\alpha$ 换回 $A$。">{R`A\ket{v_\alpha}=\alpha\ket{v_\alpha}`}</Eq>
        <Eq n="C-16" say="方括号是连续基的封闭关系，于是又得到 $\langle A\rangle=\bra\psi A\ket\psi$。">{R`\begin{aligned}\langle A\rangle_\psi&=\int\bra\psi A\ket{v_\alpha}\braket{v_\alpha|\psi}\ \dd\alpha\\&=\bra\psi A\left[\int\dd\alpha\ \ket{v_\alpha}\bra{v_\alpha}\right]\ket\psi\end{aligned}`}</Eq>
        <Tx>{R`方括号又是 $1$。

**使用时的三个注意。**

*这是系综平均。* $\langle A\rangle$ 是对许多全同制备的体系各测一次的平均，与对一个随时间变化的信号做的时间平均是两回事。

*态矢没归一怎么办？* 与 \eqref{B-19} 一样，除以模方即可：`}</Tx>
        <Eq n="C-17" say="态矢未归一时，平均值要除以 $\braket{\psi|\psi}$。">{R`\langle A\rangle_\psi=\frac{\bra\psi A\ket\psi}{\braket{\psi|\psi}}`}</Eq>
        <Tx>{R`*实际计算选一个方便的表象。* 位置的平均值在位置表象中最自然（用到 $X$ 的定义，第 II 章式 (E-22)）：`}</Tx>
        <Eq n="C-18" say="位置平均值在位置表象中就是 $x$ 按 $|\psi(\mathbf r)|^2$ 加权积分。">{R`\begin{aligned}\langle X\rangle_\psi&=\bra\psi X\ket\psi\\&=\int\dd^3r\ \braket{\psi|\mathbf r}\bra{\mathbf r}X\ket\psi\\&=\int\dd^3r\ \psi^*(\mathbf r)\ x\ \psi(\mathbf r)\end{aligned}`}</Eq>
        <Tx>{R`动量的平均值既可以在动量表象中直接加权，`}</Tx>
        <Eq n="C-19" say="动量平均值在动量表象中就是 $p_x$ 按 $|\overline\psi(\mathbf p)|^2$ 加权积分。">{R`\begin{aligned}\langle P_x\rangle_\psi&=\bra\psi P_x\ket\psi\\&=\int\dd^3p\ \overline\psi^*(\mathbf p)\ p_x\ \overline\psi(\mathbf p)\end{aligned}`}</Eq>
        <Tx>{R`也可以留在位置表象，让 $P_x$ 以微分算符 $\frac\hbar i\frac{\partial}{\partial x}$ 的面目出现（第 II 章式 (E-26)）：`}</Tx>
        <Eq n="C-20" say="位置表象中的动量平均值：$P_x$ 化为 $(\hbar/i)\partial_x$ 作用在 $\psi$ 上。">{R`\begin{aligned}\langle P_x\rangle_\psi&=\int\dd^3r\ \braket{\psi|\mathbf r}\bra{\mathbf r}P_x\ket\psi\\&=\int\dd^3r\ \psi^*(\mathbf r)\left[\frac\hbar i\frac{\partial}{\partial x}\psi(\mathbf r)\right]\end{aligned}`}</Eq>
        <Box kind="example" title="两条路算同一个平均值">{R`取 $\psi(x)=(2\pi\sigma^2)^{-1/4}e^{-x^2/4\sigma^2}e^{ip_0x/\hbar}$。位置表象中 $\frac\hbar i\psi'=\left(p_0+\frac{i\hbar x}{2\sigma^2}\right)\psi$，代入 \eqref{C-20}，虚部是 $x$ 的奇函数、积分为零，得 $\langle P\rangle=p_0$。动量表象中 $|\overline\psi(p)|^2$ 是以 $p_0$ 为中心、宽 $\hbar/2\sigma$ 的高斯，\eqref{C-19} 同样给出 $p_0$。本页 §D-1-d 的交互图正是用位置表象的 \eqref{C-20} 数值计算 $\langle P\rangle$ 的。`}</Box>
      </Sub>

      <Sub n="C-5" title="The root mean square deviation" zh="方均根偏差">
        <Tx>{R`**平均值只是故事的一半。** 两个分布可以有相同的平均值，一个尖锐、一个弥散（图 2）。我们需要一个数来度量读数围绕 $\langle A\rangle$ 散开的程度——直观上就是分布曲线的宽度 $\delta A$，越窄说明读数越集中。`}</Tx>
        <Fig n="2" caption={R`概率密度 $\rho(\alpha)$ 随 $\alpha$ 的变化（交互）。平均值 $\langle A\rangle$ 是曲线下面积的“重心”横坐标，一般**不**等于极大值的位置 $\alpha_m$；两者只在分布对称时重合。竖线 $\pm\Delta A$ 标出 \eqref{C-27} 定义的方均根偏差。把“左肩权重”调到 0，分布变成对称高斯，$\langle A\rangle=\alpha_m$。`}><RhoPlot /></Fig>
        <Tx>{R`**第一次尝试会失败。** 最直接的想法是“偏差的平均”，可它恒为零——平均值的定义本身就保证了正负偏差相抵：`}</Tx>
        <Eq n="C-21" say="偏差的平均恒为零，正负偏差恰好抵消，不能用来衡量散布。">{R`\langle A-\langle A\rangle\rangle=\langle A\rangle-\langle A\rangle=0`}</Eq>
        <Tx>{R`**修正：先平方再平均。** 平方后偏差都是正的，不会抵消：`}</Tx>
        <Eq n="C-22" say="方差：偏差平方的平均。">{R`(\Delta A)^2=\langle(A-\langle A\rangle)^2\rangle`}</Eq>
        <Tx>{R`开方恢复原来的量纲，就得到**方均根偏差**：`}</Tx>
        <Eq n="C-23" keyEq title="方均根偏差" say="方均根偏差：偏差平方平均再开方，衡量读数的散布宽度——“不确定度”的精确定义。">{R`\boxed{\Delta A=\sqrt{\langle(A-\langle A\rangle)^2\rangle}}`}</Eq>
        <Tx>{R`$(A-\langle A\rangle)^2$ 也是一个可观测量，把 \eqref{C-4} 用到它身上，`}</Tx>
        <Eq n="C-24" say="方均根偏差等于算符 $(A-\langle A\rangle)^2$ 在 $\ket\psi$ 中的平均值再开方。">{R`\Delta A=\sqrt{\bra\psi(A-\langle A\rangle)^2\ket\psi}`}</Eq>
        <Tx>{R`计算时更方便的形式来自展开平方（$\langle A\rangle$ 只是一个数，可以提出平均号）：`}</Tx>
        <Eq n="C-25" say="展开平方：方差等于平方的平均减去平均的平方。">{R`\begin{aligned}\langle(A-\langle A\rangle)^2\rangle&=\langle(A^2-2\langle A\rangle A+\langle A\rangle^2)\rangle\\&=\langle A^2\rangle-2\langle A\rangle^2+\langle A\rangle^2\\&=\langle A^2\rangle-\langle A\rangle^2\end{aligned}`}</Eq>
        <Eq n="C-26" keyEq title="方均根偏差（实用形式）" say="计算 $\Delta A$ 的实用公式：先算 $\langle A^2\rangle$ 与 $\langle A\rangle$。">{R`\Delta A=\sqrt{\langle A^2\rangle-\langle A\rangle^2}`}</Eq>
        <Tx>{R`对连续谱，两种写法分别是`}</Tx>
        <Eq n="C-27" say="连续谱的方差：$\alpha^2$ 的平均减去 $\alpha$ 平均的平方，都用 $\rho(\alpha)$ 加权。">{R`\begin{aligned}(\Delta A)^2&=\int_{-\infty}^{+\infty}[\alpha-\langle A\rangle]^2\rho(\alpha)\,\dd\alpha\\&=\int_{-\infty}^{+\infty}\alpha^2\rho(\alpha)\,\dd\alpha-\left[\int_{-\infty}^{+\infty}\alpha\,\rho(\alpha)\,\dd\alpha\right]^2\end{aligned}`}</Eq>
        <Box kind="physics" title={R`$\Delta A=0$ 意味着什么`}>{R`由 \eqref{C-24}，$(\Delta A)^2=\|(A-\langle A\rangle)\ket\psi\|^2$。它为零当且仅当 $A\ket\psi=\langle A\rangle\ket\psi$，即 $\ket\psi$ 是 $A$ 的本征态。“$A$ 在 $\ket\psi$ 中有确定值”与“$\ket\psi$ 是 $A$ 的本征态”是同一件事——与第四、第五假设完全一致。`}</Box>
        <Tx>{R`**回报：精确的 Heisenberg 关系。** 第 I 章的不确定关系只是量级估计，因为那里的“宽度”没有精确定义。现在有了 \eqref{C-23}，再加上对易关系 \eqref{B-33}，可以严格证明（补充材料 C$_{\rm III}$，下面的折叠框给出简短版本）：对任意态，`}</Tx>
        <Eq n="C-28" keyEq title="Heisenberg 不确定关系" say="同一方向的位置与动量方均根偏差之积不小于 $\hbar/2$：正则对易关系的直接后果，与仪器好坏无关。">{R`\left\{\begin{aligned}&\Delta X\cdot\Delta P_x\geq\hbar/2\\&\Delta Y\cdot\Delta P_y\geq\hbar/2\\&\Delta Z\cdot\Delta P_z\geq\hbar/2\end{aligned}\right.`}</Eq>
        <Derivation title={R`\eqref{C-28} 的一个简短证明（补充材料 C$_{\rm III}$ 的思路）`} collapsed steps={[
          { tex: R`\ket{\phi(\lambda)}=\left[(X-\langle X\rangle)+i\lambda(P_x-\langle P_x\rangle)\right]\ket\psi,\quad\lambda\in\R`, why: R`构造一个依赖实参数 $\lambda$ 的右矢，它的模方必须 $\geq0$` },
          { tex: R`\braket{\phi|\phi}=(\Delta X)^2+\lambda^2(\Delta P_x)^2+i\lambda\bra\psi[X,P_x]\ket\psi\geq0`, why: R`展开时交叉项给出对易子 $[X,P_x]$（平移不改变对易子）` },
          { tex: R`=(\Delta X)^2+\lambda^2(\Delta P_x)^2-\lambda\hbar\geq0`, why: R`用 \eqref{B-33}：$[X,P_x]=i\hbar$` },
          { tex: R`\hbar^2-4(\Delta X)^2(\Delta P_x)^2\leq0`, why: R`关于 $\lambda$ 的二次式对一切实数 $\lambda$ 非负 $\Leftrightarrow$ 判别式 $\leq0$` },
        ]} result={R`$\Delta X\cdot\Delta P_x\geq\hbar/2$；等号对高斯波包成立。`} />
      </Sub>

      <Sub n="C-6" title="Compatibility of observables" zh="可观测量的相容性">
        <Sub3 n="C-6-a" title="Compatibility and commutation rules" zh="相容性与对易关系">
          <Tx>{R`**问题：两个物理量能不能“同时”有确定值？** 换成可操作的说法：先测 $A$ 再测 $B$，与先测 $B$ 再测 $A$，结果的统计是否相同？测量后的态是否相同？答案取决于 $A$ 与 $B$ 是否对易。先看对易的情形：`}</Tx>
          <Eq n="C-29" say="$A$ 与 $B$ 对易。">{R`[A,B]=0`}</Eq>
          <Tx>{R`（为简单起见设两者的谱都离散。）第 II 章 §D-3-a 的定理保证存在一组**共同本征矢** $\ket{a_n,b_p,i}$ 构成的基：`}</Tx>
          <Eq n="C-30" say="共同本征矢同时是 $A$（本征值 $a_n$）与 $B$（本征值 $b_p$）的本征矢；$i$ 区分同一对本征值下的不同矢量。">{R`\begin{aligned}&A\ket{a_n,b_p,i}=a_n\ket{a_n,b_p,i}\\&B\ket{a_n,b_p,i}=b_p\ket{a_n,b_p,i}\end{aligned}`}</Eq>
          <Tx>{R`于是对谱中任一对 $(a_n,b_p)$，都有态让两个读数同时确定。这样的一对可观测量称为**相容的**。若 $A$、$B$ 不对易，共同本征矢即使有，也凑不成一组基，一般的态不能同时是二者的本征态——它们是**不相容的**。

**在对易情形下算一遍。** 把初态按共同本征基展开，`}</Tx>
          <Eq n="C-31" say="任意态在共同本征基上的展开，系数带三个指标。">{R`\ket\psi=\sum_{n,p,i}c_{n,p,i}\ket{a_n,b_p,i}`}</Eq>
          <Tx>{R`三个指标正好把问题的结构摆出来：$n$ 管 $A$ 的读数，$p$ 管 $B$ 的读数，$i$ 是剩下的简并。**按“先 $A$ 后 $B$”的次序**（中间不留演化时间），复合事件 “$a_n$ 然后 $b_p$” 的概率分两步算。第一步的概率是固定 $n$、对其余指标求和：`}</Tx>
          <Eq n="C-32" say="读到 $a_n$ 的概率：所有指标为 $n$ 的分量模方之和。">{R`\mathcal P(a_n)=\sum_{p,i}|c_{n,p,i}|^2`}</Eq>
          <Tx>{R`第五假设把态换成只含指标 $n$ 的部分：`}</Tx>
          <Eq n="C-33" say="读到 $a_n$ 后的态：只留下指标为 $n$ 的分量并归一。">{R`\ket{\psi'_n}=\frac1{\sqrt{\sum_{p,i}|c_{n,p,i}|^2}}\sum_{p,i}c_{n,p,i}\ket{a_n,b_p,i}`}</Eq>
          <Tx>{R`第二步在这个新态中读 $B$，得到 $b_p$ 的条件概率为`}</Tx>
          <Eq n="C-34" say="条件概率：在 $\ket{\psi'_n}$ 中测 $B$ 得 $b_p$。">{R`\mathcal P_{a_n}(b_p)=\frac1{\sum_{p,i}|c_{n,p,i}|^2}\sum_i|c_{n,p,i}|^2`}</Eq>
          <Tx>{R`复合事件的概率是两者之积，`}</Tx>
          <Eq n="C-35" say="复合事件的概率等于第一步的概率乘第二步的条件概率。">{R`\mathcal P(a_n,b_p)=\mathcal P(a_n)\times\mathcal P_{a_n}(b_p)`}</Eq>
          <Tx>{R`中间的归一化因子恰好约掉，结果非常干净：`}</Tx>
          <Eq n="C-36" keyEq title="相容可观测量的联合概率" say="先 $A$ 后 $B$ 得到 $(a_n,b_p)$ 的概率等于共同本征子空间中分量模方之和。">{R`\mathcal P(a_n,b_p)=\sum_i|c_{n,p,i}|^2`}</Eq>
          <Tx>{R`第二次读数之后，态又被投影一次，只剩指标为 $(n,p)$ 的部分：`}</Tx>
          <Eq n="C-37" say="两次测量后的态：只保留指标为 $(n,p)$ 的分量并归一，它同时是 $A$ 与 $B$ 的本征态。">{R`\ket{\psi''_{n,p}}=\frac1{\sqrt{\sum_i|c_{n,p,i}|^2}}\sum_ic_{n,p,i}\ket{a_n,b_p,i}`}</Eq>
          <Box kind="warning" title="勘误：式 (C-37) 漏了等号">{R`原书印作 $\ket{\psi''_{n,p}}\,\frac1{\sqrt{\cdots}}\sum_i\cdots$，左边与右边之间缺 “$=$”。按上下文（与 \eqref{C-33}、\eqref{C-45} 对照）显然是定义式，此处已补上。`}</Box>
          <Tx>{R`它同时是 $A$、$B$ 的本征矢，所以再测哪一个都会重复已得的读数。

**换成“先 $B$ 后 $A$”。** 现在是 $p$ 先被固定。逐步对照：`}</Tx>
          <Eq n="C-38" say="反序的复合事件：先得 $b_p$ 的概率乘以随后得 $a_n$ 的条件概率。">{R`\mathcal P(b_p,a_n)=\mathcal P(b_p)\times\mathcal P_{b_p}(a_n)`}</Eq>
          <Eq n="C-39" say="读到 $b_p$ 的概率：对 $n$、$i$ 求和。">{R`\mathcal P(b_p)=\sum_{n,i}|c_{n,p,i}|^2`}</Eq>
          <Eq n="C-40" say="读到 $b_p$ 后的态：保留指标为 $p$ 的分量并归一。">{R`\ket{\varphi'_p}=\frac1{\sqrt{\sum_{n,i}|c_{n,p,i}|^2}}\sum_{n,i}c_{n,p,i}\ket{a_n,b_p,i}`}</Eq>
          <Eq n="C-41" say="在已得 $b_p$ 的条件下读到 $a_n$ 的概率。">{R`\mathcal P_{b_p}(a_n)=\frac1{\sum_{n,i}|c_{n,p,i}|^2}\sum_i|c_{n,p,i}|^2`}</Eq>
          <Eq n="C-42" say="反序的联合概率，与正序完全相同。">{R`\mathcal P(b_p,a_n)=\sum_i|c_{n,p,i}|^2`}</Eq>
          <Eq n="C-43" say="反序测量后的态，与正序时相同。">{R`\ket{\varphi''_{p,n}}=\frac1{\sqrt{\sum_i|c_{n,p,i}|^2}}\sum_ic_{n,p,i}\ket{a_n,b_p,i}`}</Eq>
          <Box kind="warning" title={R`勘误：式 (C-43) 的系数`}>{R`原书 \eqref{C-43} 的求和中印作 $|c_{n,p,i}|\ket{a_n,b_p,i}$（系数带了绝对值）。按第五假设，测量后的态保留各分量原有的**复**系数（包括相对相位），应为 $c_{n,p,i}\ket{a_n,b_p,i}$；也只有这样才与 \eqref{C-37} 一致，从而 \eqref{C-45} 成立。此处已改正。`}</Box>
          <Tx>{R`**比较两种次序。** 概率相同，末态也相同：`}</Tx>
          <Eq n="C-44" keyEq title="测量次序无关" say="对易的可观测量：两种次序给出相同的联合概率，等于态在共同本征子空间中投影的模方。">{R`\mathcal P(a_n,b_p)=\mathcal P(b_p,a_n)=\sum_i|c_{n,p,i}|^2=\sum_i|\braket{a_n,b_p,i|\psi}|^2`}</Eq>
          <Eq n="C-45" say="两种次序下测量后的态相同：$\ket\psi$ 在 $(a_n,b_p)$ 共同本征子空间上的归一化投影。">{R`\ket{\psi''_{n,p}}=\ket{\varphi''_{p,n}}=\frac1{\sqrt{\sum_i|c_{n,p,i}|^2}}\sum_ic_{n,p,i}\ket{a_n,b_p,i}`}</Eq>
          <Tx>{R`更好的看法是：两个结果合起来正是把第四、第五假设直接用于“联合读数” $\{a_n,b_p\}$，其本征子空间由 $\ket{a_n,b_p,i}$（$i$ 变动）张成——\eqref{C-44} 是 \eqref{B-7} 的形式，\eqref{C-45} 是 \eqref{B-30} 的形式。次序既然无关，就可以把两次测量合并成一次“同时测量”。从信息的角度说：第二次测量不会抹掉第一次得到的信息，只会在其上**增加**信息。

**不对易时这一切都会崩溃。** 用一个可以画在纸上的模型看：把态空间缩小成二维实平面（图 3）。$A$ 的本征矢 $\ket{u_1},\ket{u_2}$ 与 $B$ 的本征矢 $\ket{v_1},\ket{v_2}$ 是两对互相垂直的单位矢量；$[A,B]\neq0$ 意味着这两对不重合，相差一个转角。初态 $\ket\psi$ 是平面上任意单位矢量。设两种次序都得到同样的读数 $a_1$ 和 $b_2$：`}</Tx>
          <Eq n="C-46" say="先读 $A$ 得 $a_1$、再读 $B$ 得 $b_2$：态依次变为 $\ket{u_1}$、$\ket{v_2}$。">{R`\ket\psi\ \overset{(a_1)}{\Longrightarrow}\ \ket{u_1}\ \overset{(b_2)}{\Longrightarrow}\ \ket{v_2}`}</Eq>
          <Eq n="C-47" say="反序：先 $b_2$ 再 $a_1$，末态是 $\ket{u_1}$ 而不是 $\ket{v_2}$。">{R`\ket\psi\ \overset{(b_2)}{\Longrightarrow}\ \ket{v_2}\ \overset{(a_1)}{\Longrightarrow}\ \ket{u_1}`}</Eq>
          <Tx>{R`末态已经不同了。概率呢？每一步的概率都是一个投影长度的平方，可以直接在图上量：`}</Tx>
          <Eq n="C-48" say="每一步的概率是相应投影长度的平方，两步相乘；图 3 中可以直接量出这些长度。">{R`\begin{aligned}&\mathcal P(a_1,b_2)=|\mathrm{OH}_1|^2\times|\mathrm{OK}_2|^2\\&\mathcal P(b_2,a_1)=|\mathrm{OH}_2|^2\times|\mathrm{OK}_1|^2\end{aligned}`}</Eq>
          <Tx>{R`第二个因子相同（都是 $|\braket{u_1|v_2}|^2$），第一个因子却分别是 $\ket\psi$ 在 $\ket{u_1}$ 与 $\ket{v_2}$ 上的投影，一般不等。所以`}</Tx>
          <Eq n="C-49" keyEq title="不相容可观测量：次序有关" say="不对易的可观测量：两种次序给出不同的概率，因而不能“同时”测量。">{R`\mathcal P(b_2,a_1)\neq\mathcal P(a_1,b_2)`}</Eq>
          <Fig n="3" caption={R`两个不相容可观测量的相继测量（交互）。二维实态空间中，$A$ 的本征矢 $\ket{u_1},\ket{u_2}$ 与 $B$ 的本征矢 $\ket{v_1},\ket{v_2}$ 是两组相差转角 $\beta$ 的正交基。$\mathrm{H}_1$、$\mathrm{H}_2$ 是 $\ket\psi$ 在 $\ket{u_1}$、$\ket{v_2}$ 上的投影点；$\mathrm{K}_2$ 是 $\ket{u_1}$ 端点在 $\ket{v_2}$ 上的投影（$\mathrm{K}_1$ 是 $\ket{v_2}$ 端点在 $\ket{u_1}$ 上的投影，长度相同）。拖动滑块可看到：只有 $\beta=0$（两组基重合、$A$ 与 $B$ 对易）时两种次序的概率才总相等。`}><NonCommuteFig /></Fig>
          <Tx>{R`两个教训。其一，“先测哪个”影响结果的统计，谈不上“同时测量”。其二，第二次测量抹掉了第一次的信息：在 \eqref{C-46} 之后再测 $A$，由于 $\ket{v_2}$ 不是 $A$ 的本征矢，读数又变得随机——第一次读到的 $a_1$ 白测了。`}</Tx>
        </Sub3>

        <Sub3 n="C-6-b" title="Preparation of a state" zh="态的制备">
          <Tx>{R`**反过来用测量：能否靠测量把体系放进一个已知的态？** 只要测量后的态完全由读数决定、与之前的 $\ket\psi$ 无关，就可以。

非简并读数 $a_n$ 正好满足：末态是 $\ket{u_n}$（\eqref{B-32} 的相因子 $c_n/|c_n|$ 无关紧要）。简并读数则不行——末态`}</Tx>
          <Eq n="C-50" say="读到简并本征值后的态：子空间内各分量的系数来自初态，所以末态依赖于初态。">{R`\ket{\psi'_n}=\frac1{\sqrt{\sum_i|c_n^i|^2}}\sum_{i=1}^{g_n}c_n^i\ket{u_n^i}`}</Eq>
          <Tx>{R`的系数 $c_n^i$（它们的模和相对相位都有物理意义）是从 $\ket\psi$ 继承来的，换一个初态就换一个末态。

**办法：再测一个与 $A$ 相容的量。** 由 §C-6-a，可以把 $A$ 和与之对易的 $B$ 一起测。若读数对 $(a_n,b_p)$ 只对应一个共同本征矢 $\ket{a_n,b_p}$，\eqref{C-37} 中对 $i$ 的求和只剩一项：`}</Tx>
          <Eq n="C-51" say="若 $(a_n,b_p)$ 只对应一个共同本征矢，测量后的态与它只差一个相因子：读数唯一地决定了末态。">{R`\ket{\psi''_{n,p}}=\frac{c_{n,p}}{|c_{n,p}|}\ket{a_n,b_p}`}</Eq>
          <Tx>{R`末态与初态无关了。若 $(a_n,b_p)$ 仍有简并，就再加一个与两者都相容的 $C$，如此下去，直到读数组合不再简并——这正是第 II 章 §D-3-b 中**对易可观测量完全集**（ECOC）的定义。所以 ECOC 不只是数学上的方便：**要让测量结果唯一确定测量后的态，测量的必须是一个 ECOC。**

**制备装置。** 实际的做法与起偏器相同：起偏器无论入射光怎样偏振，出射光总沿它自己的方向偏振。类似地，可以造一个“过滤器”，只放行 ECOC 中每个可观测量都取指定本征值的那个态。第 IV 章 §B-1 会用自旋给出具体例子，并说明：虽然测一个 ECOC 只能得到它的某个基矢，但换用不同的 ECOC，就能制备 $\mathcal E$ 中的任意态。`}</Tx>
        </Sub3>
      </Sub>
    </Sec>);
}
