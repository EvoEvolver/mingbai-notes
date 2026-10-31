// §D Schrödinger 方程的物理含义。式 (D-1)–(D-81)，图 4
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { Fig, Sub3, Para, Rule } from "./_ch03_kit.jsx";
import { Fig4 } from "./_ch03_figs.jsx";
import { CurrentPlot, EhrenfestPlot, BohrPlot } from "./_ch03_plots.jsx";

const R = String.raw;

export function SecD() {
  return (
    <Sec n="D" title="The physical implications of the Schrödinger equation" zh="Schrödinger 方程的物理含义"
      gist={R`Schrödinger 方程一阶、线性、齐次、$H$ 厄米，由此依次得到：演化是确定的；解可以叠加；范数守恒，且概率满足局域守恒 $\partial_t\rho+\nabla\cdot\mathbf J=0$；平均值满足 $\frac{d}{dt}\langle A\rangle=\frac1{i\hbar}\langle[A,H]\rangle+\langle\partial_tA\rangle$（Ehrenfest 定理与经典极限）。$H$ 不显含时间时，按本征态展开即可解出演化：定态、运动常量、Bohr 频率与选择定则、时间–能量不确定关系。`}
      why={R`第六假设只是一行方程；它的物理内容要靠推论来展开。这些推论既保证了前五条假设的自洽（概率总和保持为 1），也说明了经典力学如何作为极限出现，并给出光谱学的基本概念（Bohr 频率、选择定则）。`}
      gives={["D-1", "D-6", "D-11", "D-17", "D-27", "D-34", "D-35", "D-51", "D-54", "D-58", "D-68", "D-69"]}>
      <p className="muted">本节概念：<C id="schrodinger" /> · <C id="current" /> · <C id="ehrenfest" /> · <C id="stationary" /> · <C id="bohr" /></p>
      <Tx>{R`第六假设只有一行，但这一行方程的每个数学特征——对时间一阶、线性齐次、$H$ 厄米、（在保守体系中）$H$ 不含时间——都对应一条物理结论。本节就按这些特征逐一“读出”方程的物理内容。`}</Tx>

      <Sub n="D-1" title="General properties of the Schrödinger equation" zh="Schrödinger 方程的一般性质">
        <Sub3 n="D-1-a" title="Determinism in the evolution of physical systems" zh="物理体系演化的决定论性">
          <Eq n="D-1" keyEq title="Schrödinger 方程" say="态矢量的时间变化率由哈密顿算符决定；方程对时间一阶，初态给定后以后的态唯一确定。">{R`i\hbar\frac{\dd}{\dd t}\ket{\psi(t)}=H(t)\ket{\psi(t)}`}</Eq>
          <Tx>{R`**特征一：对 $t$ 一阶。** 和 Hamilton 方程一样，只需一个初值 $\ket{\psi(t_0)}$ 就能唯一地推出以后所有的 $\ket{\psi(t)}$。这一点常被误解，值得说重一点：量子力学的随机性**全部**来自测量（第五假设的突变），而不是来自演化。两次测量之间，态的变化与经典轨道一样是决定论的。`}</Tx>
        </Sub3>
        <Sub3 n="D-1-b" title="The superposition principle" zh="叠加原理">
          <Tx>{R`**特征二：线性齐次。** 若 $\ket{\psi_1(t)}$、$\ket{\psi_2(t)}$ 都是解，则对任意复常数 $\lambda_1,\lambda_2$，$\lambda_1\ket{\psi_1(t)}+\lambda_2\ket{\psi_2(t)}$ 也是解，并且它恰好对应初值 $\lambda_1\ket{\psi_1(t_0)}+\lambda_2\ket{\psi_2(t_0)}$。换句话说，“初态 $\mapsto$ $t$ 时刻的态”这个映射本身是线性的，可以用一个线性算符表示（其性质见补充材料 F$_{\rm III}$）：`}</Tx>
          <Eq n="D-2" say="演化算符把初态线性地映射到 $t$ 时刻的态。">{R`\ket{\psi(t)}=\sym{Uev}{U}(t,t_0)\ket{\psi(t_0)}`}</Eq>
          <Tx>{R`第一假设说态可以叠加；这里说叠加关系在演化中保持。二者合起来，才使得“把初态拆成简单部分、分别演化、再加起来”的做法（§D-2 正是这样求解保守体系的）成为可能。`}</Tx>
        </Sub3>
        <Sub3 n="D-1-c" title="Conservation of probability" zh="概率守恒">
          <Para g="alpha">态矢量的模保持不变</Para>
          <Tx>{R`**特征三：$H$ 厄米。** 为什么这很重要？第四假设的概率之和等于 $\braket{\psi|\psi}$。若演化让模变了，今天归一的态明天就不归一，“总概率为 1”就会悄悄失效。我们来证明这不会发生。对模方求导，用乘积法则：`}</Tx>
          <Eq n="D-3" say="内积的导数等于左矢的导数配右矢，加上左矢配右矢的导数。">{R`\frac{\dd}{\dd t}\braket{\psi(t)|\psi(t)}=\left[\frac{\dd}{\dd t}\bra{\psi(t)}\right]\ket{\psi(t)}+\bra{\psi(t)}\left[\frac{\dd}{\dd t}\ket{\psi(t)}\right]`}</Eq>
          <Tx>{R`右矢的导数直接由 \eqref{D-1} 读出，`}</Tx>
          <Eq n="D-4" say="Schrödinger 方程两边除以 $i\hbar$：右矢的时间导数。">{R`\frac{\dd}{\dd t}\ket{\psi(t)}=\frac1{i\hbar}H(t)\ket{\psi(t)}`}</Eq>
          <Tx>{R`左矢的导数取它的厄米共轭——这一步正是 $H^\dagger=H$ 起作用的地方：`}</Tx>
          <Eq n="D-5" say="左矢的时间导数：$1/i\hbar$ 变号，$H^\dagger$ 换成 $H$。">{R`\frac{\dd}{\dd t}\bra{\psi(t)}=-\frac1{i\hbar}\bra{\psi(t)}H^\dagger(t)=-\frac1{i\hbar}\bra{\psi(t)}H(t)`}</Eq>
          <Tx>{R`代回 \eqref{D-3}，两项正好抵消：`}</Tx>
          <Eq n="D-6" keyEq title="范数守恒" say="两项大小相等、符号相反：态矢的模不随时间变化，关键在于 $H$ 厄米。">{R`\begin{aligned}\frac{\dd}{\dd t}\braket{\psi(t)|\psi(t)}&=-\frac1{i\hbar}\bra{\psi(t)}H(t)\ket{\psi(t)}+\frac1{i\hbar}\bra{\psi(t)}H(t)\ket{\psi(t)}\\&=0\end{aligned}`}</Eq>
          <Tx>{R`（反过来，若人为地给 $H$ 加上非厄米部分——例如唯象描述吸收的“光学势”——模就会衰减，这正是描写粒子“消失”的手段。）对单个粒子，翻译成波函数的语言：在 $t_0$ 归一，`}</Tx>
          <Eq n="D-7" say="$t_0$ 时刻在全空间找到粒子的总概率为 1。">{R`\braket{\psi(t_0)|\psi(t_0)}=\int\dd^3r\ |\psi(\mathbf r,t_0)|^2=1`}</Eq>
          <Tx>{R`就永远归一：`}</Tx>
          <Eq n="D-8" say="之后任何时刻，在全空间找到粒子的总概率仍为 1。">{R`\braket{\psi(t)|\psi(t)}=\int\dd^3r\ |\psi(\mathbf r,t)|^2=\braket{\psi(t_0)|\psi(t_0)}=1`}</Eq>
          <Tx>{R`于是把 $|\psi(\mathbf r,t)|^2$ 一直当作概率密度来用是安全的。`}</Tx>

          <Para g="beta">概率的局域守恒：概率密度与概率流</Para>
          <Tx>{R`**更强的问题：概率是“流”过去的吗？** 总量守恒只说明全空间的概率之和不变，不排除这样一种荒谬情形：粒子在此处的概率突然减少，同时在远处凭空增加。电荷守恒在物理上是**局域**的——一个区域里的电荷减少，必定有电流从它的边界流出；我们希望概率也是如此。下面对一个无自旋粒子证明这一点。用概率密度`}</Tx>
          <Eq n="D-9" say="位置概率密度就是波函数的模方。">{R`\rho(\mathbf r,t)=|\psi(\mathbf r,t)|^2`}</Eq>
          <Tx>{R`描述“在 $\mathbf r$ 处体积元中”的概率，`}</Tx>
          <Eq n="D-10" say="在小体积元中找到粒子的概率等于概率密度乘体积。">{R`\dd\mathcal P(\mathbf r,t)=\rho(\mathbf r,t)\ \dd^3r`}</Eq>
          <Tx>{R`目标是找一个矢量场 $\mathbf J$，使它与 $\rho$ 满足和电荷守恒同样的方程（$\mathbf J$ 流出闭曲面的通量等于曲面内 $\rho$ 积分的减少率，用 Gauss 定理写成微分形式）：`}</Tx>
          <Eq n="D-11" keyEq title="连续性方程" say="局域守恒：某处密度的减少率等于该处流的散度——东西不会凭空消失，只会流走。">{R`\frac{\partial}{\partial t}\rho(\mathbf r,t)+\operatorname{div}\mathbf J(\mathbf r,t)=0`}</Eq>
          <Tx>{R`有了这样的 $\mathbf J$，就可以把概率想象成一种流体：$\rho$ 是它的密度，$\mathbf J$ 是它的流。

**推导思路：** 算 $\partial_t\rho=\psi^*\partial_t\psi+\psi\,\partial_t\psi^*$，用 Schrödinger 方程及其复共轭替换时间导数，然后设法把结果凑成一个散度。取标量势中的粒子，`}</Tx>
          <Eq n="D-12" say="标量势中粒子的哈密顿算符。">{R`H=\frac{\mathbf P^2}{2m}+V(\mathbf R,t)`}</Eq>
          <Tx>{R`在位置表象中（补充材料 D$_{\rm II}$）方程为`}</Tx>
          <Eq n="D-13" say="位置表象中的 Schrödinger 方程：动能项是拉普拉斯算符，势能项是乘法。">{R`i\hbar\frac{\partial}{\partial t}\psi(\mathbf r,t)=-\frac{\hbar^2}{2m}\sym{lap}{\Delta}\psi(\mathbf r,t)+V(\mathbf r,t)\,\psi(\mathbf r,t)`}</Eq>
          <Tx>{R`$H$ 厄米要求 $V$ 为实数，所以复共轭方程中 $V$ 不变，只有 $i$ 变号：`}</Tx>
          <Eq n="D-14" say="复共轭方程：$i$ 变号，实的 $V$ 不变。">{R`-i\hbar\frac{\partial}{\partial t}\psi^*(\mathbf r,t)=-\frac{\hbar^2}{2m}\sym{lap}{\Delta}\psi^*(\mathbf r,t)+V(\mathbf r,t)\,\psi^*(\mathbf r,t)`}</Eq>
          <Tx>{R`用 $\psi^*$ 乘 \eqref{D-13}、用 $-\psi$ 乘 \eqref{D-14} 再相加，左边合成 $\partial_t(\psi^*\psi)$，右边的势能项 $V\psi^*\psi$ 两次出现、符号相反，抵消了（这里 $V$ 为实数是关键）：`}</Tx>
          <Eq n="D-15" say="势能项相消；左边是 $\rho$ 的时间导数，右边只剩动能项。">{R`i\hbar\frac{\partial}{\partial t}\left[\psi^*(\mathbf r,t)\psi(\mathbf r,t)\right]=-\frac{\hbar^2}{2m}\left[\psi^*\sym{lap}{\Delta}\psi-\psi\,\sym{lap}{\Delta}\psi^*\right]`}</Eq>
          <Tx>{R`除以 $i\hbar$ 移项：`}</Tx>
          <Eq n="D-16" say="$\rho$ 的时间导数只与 $\psi^*\Delta\psi-\psi\Delta\psi^*$ 有关，下一步把它写成散度。">{R`\frac{\partial}{\partial t}\rho(\mathbf r,t)+\frac{\hbar}{2mi}\left[\psi^*(\mathbf r,t)\sym{lap}{\Delta}\psi(\mathbf r,t)-\psi(\mathbf r,t)\,\sym{lap}{\Delta}\psi^*(\mathbf r,t)\right]=0`}</Eq>
          <Tx>{R`方括号能不能写成某个矢量的散度？试 $\psi^*\nabla\psi-\psi\nabla\psi^*$：它的散度中“梯度点乘梯度”的两项相消，恰好只剩方括号。于是定义`}</Tx>
          <Eq n="D-17" keyEq title="概率流" say="概率流等于 $\frac1m\mathrm{Re}[\psi^*\frac\hbar i\nabla\psi]$：直观上是“概率密度乘速度”，方向由波函数的相位梯度决定。">{R`\begin{aligned}\mathbf J(\mathbf r,t)&=\frac{\hbar}{2mi}\left[\psi^*\nabla\psi-\psi\,\nabla\psi^*\right]\\&=\frac1m\mathrm{Re}\left[\psi^*\left(\frac\hbar i\nabla\psi\right)\right]\end{aligned}`}</Eq>
          <Tx>{R`验证散度：`}</Tx>
          <Eq n="D-18" say="$\mathbf J$ 的散度：两个“梯度点乘梯度”项相消，只剩拉普拉斯项，正是 (D-16) 中的组合。">{R`\begin{aligned}\operatorname{div}\mathbf J(\mathbf r,t)&=\nabla\cdot\mathbf J\\&=\frac{\hbar}{2mi}\left[(\nabla\psi^*)\cdot(\nabla\psi)+\psi^*\left(\nabla^2\psi\right)-(\nabla\psi)\cdot(\nabla\psi^*)-\psi\left(\nabla^2\psi^*\right)\right]\\&=\frac{\hbar}{2mi}\left[\psi^*\sym{lap}{\Delta}\psi-\psi\,\sym{lap}{\Delta}\psi^*\right]\end{aligned}`}</Eq>
          <Tx>{R`\eqref{D-16} 因此正是连续性方程 \eqref{D-11}：概率是局域守恒的。`}</Tx>
          <Fig n="D1" caption={R`**概率流与连续性方程的数值核验**（交互）。一维高斯波包（中心动量 $p_0=1.5$，平均能量约 $1.25$）撞向高斯势垒 $V_0e^{-2x^2}$，用 Crank–Nicolson 格式数值求解 \eqref{D-13}（$\hbar=m=1$）。黑线 $\rho$、蓝线 $J$ 由 \eqref{D-9}、\eqref{D-17} 计算；红色粗线是相邻两个时间步的差分 $-\partial\rho/\partial t$，金色虚线是空间差分 $\partial J/\partial x$——两者在整个波包上重合（残差约为峰值的 $10^{-3}$，来自有限差分），这就是 \eqref{D-11}。拖动 $t$ 观察：波包到达势垒时一部分透射、一部分反射，$J$ 在势垒左侧出现正负交替的结构（入射波与反射波干涉），但 $\int\rho\,dx$ 始终为 1。`}><CurrentPlot /></Fig>
          <Tx>{R`**$\mathbf J$ 为什么长这个样子？** 经典流体的流密度是“密度乘速度”。量子力学中，密度对应投影算符 $\ket{\mathbf r}\bra{\mathbf r}$（其平均值就是 $|\psi(\mathbf r)|^2$），速度对应 $\mathbf P/m$；二者不对易，按量子化规则取对称化乘积：`}</Tx>
          <Eq n="D-19" say="概率流算符：位置投影 $\ket{\mathbf r}\bra{\mathbf r}$ 与速度 $\mathbf P/m$ 的对称化乘积。">{R`\mathbf K(\mathbf r)=\frac1{2m}\left[\ket{\mathbf r}\bra{\mathbf r}\mathbf P+\mathbf P\ket{\mathbf r}\bra{\mathbf r}\right]`}</Eq>
          <Tx>{R`可以验证 $\bra{\psi}\mathbf K(\mathbf r)\ket\psi$ 正是 \eqref{D-17}——概率流就是这个“密度乘速度”算符的平均值。

**有磁场时**，速度算符是 $(\mathbf P-q\mathbf A)/m$ 而不是 $\mathbf P/m$（式 B-49），于是从 \eqref{B-46} 出发重做一遍，或直接在 \eqref{D-17} 中作同样的替换，得到`}</Tx>
          <Eq n="D-20" say="有矢势时，概率流中的 $\frac\hbar i\nabla$ 换成 $\frac\hbar i\nabla-q\mathbf A$，与哈密顿量中 $\mathbf P\to\mathbf P-q\mathbf A$ 的规则一致。">{R`\mathbf J(\mathbf r,t)=\frac1m\mathrm{Re}\left\{\psi^*\left[\frac\hbar i\nabla-q\mathbf A\right]\psi\right\}`}</Eq>
          <Tx>{R`**最简单的检验：平面波。** 取`}</Tx>
          <Eq n="D-21" say="平面波：振幅处处相同，相位沿 $\mathbf k$ 线性变化。">{R`\psi(\mathbf r,t)=\sym{Aamp}{A}\,e^{i(\mathbf k\cdot\mathbf r-\omega t)}`}</Eq>
          <Tx>{R`（$\hbar\omega=\hbar^2\mathbf k^2/2m$）。密度处处相同、不随时间变化，`}</Tx>
          <Eq n="D-22" say="平面波的概率密度处处相同且不随时间变化。">{R`\rho(\mathbf r,t)=|\psi(\mathbf r,t)|^2=|\sym{Aamp}{A}|^2`}</Eq>
          <Tx>{R`而 $\frac\hbar i\nabla\psi=\hbar\mathbf k\,\psi$，代入 \eqref{D-17} 立得`}</Tx>
          <Eq n="D-23" say="平面波的概率流等于概率密度乘群速度 $\hbar\mathbf k/m$。">{R`\mathbf J(\mathbf r,t)=|\sym{Aamp}{A}|^2\frac{\hbar\mathbf k}m=\rho(\mathbf r,t)\,\mathbf v_G`}</Eq>
          <Tx>{R`$\mathbf v_G=\hbar\mathbf k/m$ 是第 I 章 §C-4 的群速度，结果正是“密度乘速度”。这是一种均匀的定常流：处处在流，但哪里的密度都不变——与 \eqref{D-11} 相容，因为 $\operatorname{div}\mathbf J=0$。`}</Tx>
        </Sub3>

        <Sub3 n="D-1-d" title="Evolution of the mean value of an observable; relationship with classical mechanics" zh="可观测量平均值的演化；与经典力学的关系">
          <Tx>{R`**问题：实验可比较的量——平均值——怎样随时间变？** 能回答这个问题，就能把量子力学与经典力学直接对照，因为宏观上看到的正是平均值。时刻 $t$ 的平均值（记号 $\langle A\rangle(t)$ 强调它是 $t$ 的普通函数）为`}</Tx>
          <Eq n="D-24" say="$t$ 时刻的平均值：一个随时间变化的数。">{R`\langle A\rangle(t)=\bra{\psi(t)}A\ket{\psi(t)}`}</Eq>
          <Para g="alpha">一般公式</Para>
          <Tx>{R`$\langle A\rangle$ 的变化有三个来源：右矢在变，左矢在变，算符 $A$ 也可能显含时间。逐一写出：`}</Tx>
          <Eq n="D-25" say="平均值的变化有三个来源：左矢在变、右矢在变、算符本身显含时间。">{R`\begin{aligned}\frac{\dd}{\dd t}\bra{\psi(t)}A(t)\ket{\psi(t)}=&\left[\frac{\dd}{\dd t}\bra{\psi(t)}\right]A(t)\ket{\psi(t)}+\bra{\psi(t)}A(t)\left[\frac{\dd}{\dd t}\ket{\psi(t)}\right]\\&+\bra{\psi(t)}\frac{\partial A}{\partial t}\ket{\psi(t)}\end{aligned}`}</Eq>
          <Tx>{R`前两项用 \eqref{D-4}、\eqref{D-5} 替换，它们合成一个对易子：`}</Tx>
          <Eq n="D-26" say="前两项合并成 $A$ 与 $H$ 的对易子：态的演化对平均值的影响全由对易子表达。">{R`\begin{aligned}\frac{\dd}{\dd t}\bra{\psi(t)}A(t)\ket{\psi(t)}=&\frac1{i\hbar}\bra{\psi(t)}\left[A(t)\,H(t)-H(t)\,A(t)\right]\ket{\psi(t)}\\&+\bra{\psi(t)}\frac{\partial A}{\partial t}\ket{\psi(t)}\end{aligned}`}</Eq>
          <Tx>{R`紧凑地写：`}</Tx>
          <Eq n="D-27" keyEq title="平均值的演化方程" say="平均值的变化率等于 $[A,H]$ 的平均值除以 $i\hbar$，再加 $A$ 显含时间部分的平均值。">{R`\boxed{\frac{\dd}{\dd t}\langle A\rangle=\frac1{i\hbar}\langle[A,H(t)]\rangle+\left\langle\frac{\partial A}{\partial t}\right\rangle}`}</Eq>
          <Tx>{R`这个公式是后面一切的出发点：代入 $A=\mathbf R,\mathbf P$ 得到 Ehrenfest 定理；令 $[A,H]=0$ 得到运动常量。`}</Tx>
          <Box kind="physics" title="时间依赖住在哪里？">{R`经典量 $\mathcal A(\mathbf r,\mathbf p,t)$ 随时间变化，一部分是显含的 $t$，一部分因为 $\mathbf r(t)$、$\mathbf p(t)$ 沿轨道在变。量子化以后，$\mathbf R$ 和 $\mathbf P$ 是**固定的**算符（它们的本征态和本征值都与时间无关）；原来“沿轨道变化”的那部分时间依赖，全部转移到了态矢量 $\ket{\psi(t)}$——在位置表象中就是波函数 $\psi(\mathbf r,t)$。于是平均值写成下面的积分，积掉 $\mathbf r$ 以后只剩一个 $t$ 的函数：`}</Box>
          <Eq n="D-28" say="位置表象中的平均值：把经典表达式中的 $\mathbf p$ 换成 $\frac\hbar i\nabla$ 作用在 $\psi$ 上，再与 $\psi^*$ 积分，结果只依赖于 $t$。">{R`\langle A\rangle=\int\dd^3r\ \psi^*(\mathbf r,t)\,\mathcal A\left(\mathbf r,\frac\hbar i\nabla,t\right)\psi(\mathbf r,t)`}</Eq>
          <Tx>{R`与经典力学比较时，拿来对照经典值 $\mathcal A(\mathbf r(t),\mathbf p(t),t)$ 的应当是**这个数**，而不是微分算符 $\mathcal A(\mathbf r,\frac\hbar i\nabla,t)$ 本身。`}</Tx>

          <Para g="beta">{R`应用于可观测量 $\mathbf R$ 与 $\mathbf P$（Ehrenfest 定理）`}</Para>
          <Tx>{R`取定态势中的无自旋粒子，`}</Tx>
          <Eq n="D-29" say="定态标量势中粒子的哈密顿量。">{R`H=\frac{\mathbf P^2}{2m}+V(\mathbf R)`}</Eq>
          <Tx>{R`$\mathbf R$、$\mathbf P$ 不显含时间，\eqref{D-27} 只剩对易子。$\mathbf R$ 与势能对易，$\mathbf P$ 与动能对易，所以各自只有一项存活：`}</Tx>
          <Eq n="D-30" say="位置平均值的变化：只有动能项贡献。">{R`\frac{\dd}{\dd t}\langle\mathbf R\rangle=\frac1{i\hbar}\langle[\mathbf R,H]\rangle=\frac1{i\hbar}\left\langle\left[\mathbf R,\frac{\mathbf P^2}{2m}\right]\right\rangle`}</Eq>
          <Eq n="D-31" say="动量平均值的变化：只有势能项贡献。">{R`\frac{\dd}{\dd t}\langle\mathbf P\rangle=\frac1{i\hbar}\langle[\mathbf P,H]\rangle=\frac1{i\hbar}\langle[\mathbf P,V(\mathbf R)]\rangle`}</Eq>
          <Tx>{R`两个对易子都可以从 \eqref{B-33} 算出。第一个：`}</Tx>
          <Eq n="D-32" say="位置与动能的对易子正比于动量。">{R`\left[\mathbf R,\frac{\mathbf P^2}{2m}\right]=\frac{i\hbar}m\mathbf P`}</Eq>
          <Derivation title={R`算出 \eqref{D-32}（以 $x$ 分量为例）`} collapsed steps={[
            { tex: R`[X,P_x^2]=[X,P_x]P_x+P_x[X,P_x]=2i\hbar P_x`, why: R`对易子的乘积法则 $[A,BC]=[A,B]C+B[A,C]$，再用 $[X,P_x]=i\hbar$` },
            { tex: R`[X,P_y^2]=[X,P_z^2]=0`, why: R`不同方向的位置与动量对易 \eqref{B-33}` },
            { tex: R`\left[X,\frac{\mathbf P^2}{2m}\right]=\frac{2i\hbar P_x}{2m}=\frac{i\hbar}mP_x`, why: "合起来" },
          ]} />
          <Tx>{R`第二个需要“动量与位置函数的对易子”（补充材料 B$_{\rm II}$ 式 (48)）；在位置表象中一眼可见：$[\frac\hbar i\partial_x,V]\psi=\frac\hbar i(\partial_xV)\psi$。于是`}</Tx>
          <Eq n="D-33" say="动量与势能的对易子等于 $-i\hbar$ 乘势能梯度（在 $\mathbf R$ 处取值）。">{R`[\mathbf P,V(\mathbf R)]=-i\hbar\nabla V(\mathbf R)`}</Eq>
          <Tx>{R`（$\nabla V(\mathbf R)$ 是把 $\nabla V(\mathbf r)$ 各分量中的 $\mathbf r$ 换成 $\mathbf R$ 得到的算符。）代回去，得到 **Ehrenfest 定理**：`}</Tx>
          <Eq n="D-34" keyEq title="Ehrenfest 定理（一）" say="波包中心的速度等于平均动量除以 $m$，与经典的 $\dd\mathbf r/\dd t=\mathbf p/m$ 同形。">{R`\frac{\dd}{\dd t}\langle\mathbf R\rangle=\frac1m\langle\mathbf P\rangle`}</Eq>
          <Eq n="D-35" keyEq title="Ehrenfest 定理（二）" say="平均动量的变化率等于力在整个波包上的平均值（不是波包中心处的力）。">{R`\frac{\dd}{\dd t}\langle\mathbf P\rangle=-\langle\nabla V(\mathbf R)\rangle`}</Eq>
          <Tx>{R`把它们与经典 Hamilton 方程（附录 III §3）并排放：`}</Tx>
          <Eq n="D-36a" say="经典：速度等于动量除以 $m$。">{R`\frac{\dd}{\dd t}\mathbf r=\frac1m\mathbf p`}</Eq>
          <Eq n="D-36b" say="经典：动量的变化率等于力。">{R`\frac{\dd}{\dd t}\mathbf p=-\nabla V(\mathbf r)`}</Eq>
          <Tx>{R`合起来就是牛顿方程：`}</Tx>
          <Eq n="D-37" say="牛顿第二定律。">{R`\frac{\dd\mathbf p}{\dd t}=m\frac{\dd^2\mathbf r}{\dd t^2}=-\nabla V(\mathbf r)`}</Eq>

          <Para g="gamma">Ehrenfest 定理的讨论；经典极限</Para>
          <Tx>{R`**两组方程只差在哪？** 把 $\langle\mathbf R\rangle(t)$ 称为波包的**中心**（一般不同于波包的最高点；对称波包两者重合，参见图 2），它画出的曲线是“中心的轨道”。注意：严格说粒子本身没有轨道，它的态是整个有展布的波包；但若这个展布远小于问题中其他的长度，用中心代替整个波包几乎没有损失，量子描述就与经典描述无从区分。

由 \eqref{D-34}，\eqref{D-35} 的左边就是 $m\frac{\dd^2}{\dd t^2}\langle\mathbf R\rangle$。要让中心严格走经典轨道，右边必须等于中心处的经典力`}</Tx>
          <Eq n="D-38" say="在波包中心处计算的经典力。">{R`\mathbf F_{cl}=\left[-\nabla V(\mathbf r)\right]_{\mathbf r=\langle\mathbf R\rangle}`}</Eq>
          <Tx>{R`可右边实际上是力在整个波包上的平均，而“函数的平均”一般不等于“平均处的函数值”：`}</Tx>
          <Eq n="D-39" say="力的平均值一般不等于平均位置处的力。">{R`\langle\nabla V(\mathbf R)\rangle\neq\left[\nabla V(\mathbf r)\right]_{\mathbf r=\langle\mathbf R\rangle}`}</Eq>
          <Tx>{R`所以一般情况下，中心并**不**严格走经典轨道。

**用幂次势看清差别。** 一维中取`}</Tx>
          <Eq n="D-40" say="一维幂次势（$\lambda$ 实常数，$n$ 正整数）。">{R`V(x)=\lambda x^n`}</Eq>
          <Eq n="D-41" say="把 $x$ 换成算符 $X$。">{R`V(X)=\lambda X^n`}</Eq>
          <Tx>{R`\eqref{D-39} 左边是 $\lambda n\langle X^{n-1}\rangle$，右边是`}</Tx>
          <Eq n="D-42" say="在平均位置处计算的力，只涉及 $\langle X\rangle$ 的 $n-1$ 次方。">{R`\left[\frac{\dd V}{\dd x}\right]_{x=\langle X\rangle}=\left[\lambda n\,x^{n-1}\right]_{x=\langle X\rangle}=\lambda n\langle X\rangle^{n-1}`}</Eq>
          <Tx>{R`问题归结为 $\langle X^{n-1}\rangle$ 与 $\langle X\rangle^{n-1}$ 是否相等。$n=0$ 时力恒为零，$n=1$ 时力是常数，$n=2$ 时力是 $X$ 的线性函数，两边都显然相等：**自由粒子、均匀力场中的粒子、谐振子**的波包中心严格走经典轨道（自由粒子第 I 章 §C-4 已见过）。$n=3$ 时左边是 $\langle X^2\rangle$，右边是 $\langle X\rangle^2$，差恰为 $(\Delta X)^2$——只要波包有宽度就不等。

**何时近似相等？** 在位置表象中写出平均力：`}</Tx>
          <Eq n="D-43" say="力的平均值：$\nabla V(\mathbf r)$ 按 $|\psi(\mathbf r,t)|^2$ 加权积分。">{R`\begin{aligned}\langle\nabla V(\mathbf R)\rangle&=\int\dd^3r\ \psi^*(\mathbf r,t)\ \left[\nabla V(\mathbf r)\right]\ \psi(\mathbf r,t)\\&=\int\dd^3r\ |\psi(\mathbf r,t)|^2\nabla V(\mathbf r)\end{aligned}`}</Eq>
          <Tx>{R`若 $|\psi|^2$ 只集中在 $\langle\mathbf R\rangle$ 附近一个小区域，而 $V$ 在这个区域内几乎不变（变化尺度远大于波包尺寸），就可以把 $\nabla V$ 取在中心处提出积分，剩下 $\int|\psi|^2=1$：`}</Tx>
          <Eq n="D-44" say="波包足够窄时，平均力近似等于中心处的力，波包中心沿经典轨道运动。">{R`\langle\nabla V(\mathbf R)\rangle\simeq\left[\nabla V(\mathbf r)\right]_{\mathbf r=\langle\mathbf R\rangle}`}</Eq>
          <Derivation title="修正项有多大？（把力在波包中心展开）" collapsed steps={[
            { tex: R`V'(x)=V'(\langle X\rangle)+V''(\langle X\rangle)(x-\langle X\rangle)+\tfrac12V'''(\langle X\rangle)(x-\langle X\rangle)^2+\cdots`, why: R`一维情形，在波包中心作 Taylor 展开` },
            { tex: R`\langle V'(X)\rangle=V'(\langle X\rangle)+\tfrac12V'''(\langle X\rangle)(\Delta X)^2+\cdots`, why: R`一次项的平均为零 \eqref{C-21}；二次项的平均就是 $(\Delta X)^2$ \eqref{C-22}` },
          ]} result={R`偏离经典的主导修正 $\propto V'''(\Delta X)^2$：$V$ 至多二次时严格为零；波包宽度远小于 $V$ 变化的尺度时可以忽略——这就是 \eqref{D-44} 的条件。`} />
          <Tx>{R`宏观物体的 de Broglie 波长极短（补充材料 A$_{\rm I}$），可以把波包做得远小于势变化的尺度，同时动量仍然相当确定（不确定关系不构成障碍）。这时波包中心的运动与质量为 $m$ 的经典粒子无法区分。经典力学就是这样作为 Schrödinger 方程的一个极限出现的。`}</Tx>
          <Fig n="D2" caption={R`**Ehrenfest 定理的数值检验**（交互）。势 $V=\frac12x^2+\frac14\kappa x^4$，初态为静止的高斯波包（中心 $x_0$、宽度 $\sigma$），数值求解 Schrödinger 方程（$\hbar=m=1$）。蓝线：波包中心 $\langle X\rangle(t)$；红虚线：同初值的经典轨道。绿线与金色点线分别是 \eqref{D-35} 右边的“平均力” $\langle-V'(X)\rangle$ 与 \eqref{D-38} 的“中心处的力” $-V'(\langle X\rangle)$。图例末行给出 \eqref{D-34}、\eqref{D-35} 的数值残差（应接近零：Ehrenfest 定理总是精确成立）。$\kappa=0$（谐振子，$n=2$）时 \eqref{D-39} 两边相等，$\langle X\rangle$ 与经典轨道重合；$\kappa>0$ 时二者逐渐分离，$\sigma$ 越大分离越快，符合 $\propto V'''(\Delta X)^2$ 的修正。`}><EhrenfestPlot /></Fig>
        </Sub3>
      </Sub>

      <Sub n="D-2" title="The case of conservative systems" zh="保守体系">
        <Tx>{R`**特征四（只在一部分体系中成立）：$H$ 不显含时间。** 这样的体系叫**保守的**。经典力学中它的标志是能量守恒；下面会看到，量子力学中它还意味着方程可以“一劳永逸”地解出来，并由此得到定态、运动常量、Bohr 频率等一连串概念。`}</Tx>
        <Sub3 n="D-2-a" title="Solution of the Schrödinger equation" zh="Schrödinger 方程的解">
          <Tx>{R`**策略：换到让 $H$ 对角的基。** 在任意基中，Schrödinger 方程是一组耦合的一阶方程；在 $H$ 的本征基中，它们完全解耦。所以先解定态本征值问题`}</Tx>
          <Eq n="D-45" say="哈密顿量的本征方程：$E_n$ 是可能的能量，$\ket{\varphi_{n,\tau}}$ 是能量确定的态。">{R`H\ket{\varphi_{n,\tau}}=E_n\ket{\varphi_{n,\tau}}`}</Eq>
          <Tx>{R`（设谱离散；$\tau$ 收集区分简并所需的其余量子数，通常是与 $H$ 组成 ECOC 的那些可观测量的本征值。）$H$ 不含 $t$，$E_n$ 与 $\ket{\varphi_{n,\tau}}$ 也就不含 $t$。把任意时刻的态按这组固定的基展开，时间依赖全部落在系数上：`}</Tx>
          <Eq n="D-46" say="在 $H$ 的本征基上展开，时间依赖全在系数里。">{R`\ket{\psi(t)}=\sum_{n,\tau}c_{n,\tau}(t)\ket{\varphi_{n,\tau}}`}</Eq>
          <Eq n="D-47" say="系数等于态在各能量本征态上的投影。">{R`c_{n,\tau}(t)=\braket{\varphi_{n,\tau}|\psi(t)}`}</Eq>
          <Tx>{R`用 $\bra{\varphi_{n,\tau}}$ 去“读出”方程的一个分量（它不含 $t$，可以与 $\frac{\dd}{\dd t}$ 交换次序）：`}</Tx>
          <Eq n="D-48" say="把 Schrödinger 方程投影到一个能量本征态上。">{R`i\hbar\frac{\dd}{\dd t}\braket{\varphi_{n,\tau}|\psi(t)}=\bra{\varphi_{n,\tau}}H\ket{\psi(t)}`}</Eq>
          <Tx>{R`$H$ 厄米，所以它从右边作用在本征左矢上同样给出本征值：`}</Tx>
          <Eq n="D-49" say="厄米算符的本征左矢方程：$H$ 作用在左矢上同样给出 $E_n$。">{R`\bra{\varphi_{n,\tau}}H=E_n\bra{\varphi_{n,\tau}}`}</Eq>
          <Tx>{R`于是每个分量只与自己耦合：`}</Tx>
          <Eq n="D-50" say="每个系数单独满足最简单的一阶方程，各能量分量互不耦合。">{R`i\hbar\frac{\dd}{\dd t}c_{n,\tau}(t)=E_n\,c_{n,\tau}(t)`}</Eq>
          <Tx>{R`解是一个转动的相位：`}</Tx>
          <Eq n="D-51" keyEq title="能量本征分量的演化" say="每个能量分量的系数以角频率 $E_n/\hbar$ 转动相位，模保持不变。">{R`c_{n,\tau}(t)=c_{n,\tau}(t_0)\,e^{-iE_n(t-t_0)/\hbar}`}</Eq>
          <Rule id="rule-conservative" title={R`保守体系的解题步骤（已知 $\ket{\psi(t_0)}$，求 $\ket{\psi(t)}$）`}>
            <Tx>{R`**第一步：分解。** 把初态写成能量本征态的叠加，`}</Tx>
            <Eq n="D-52" say="第一步：把初态按能量本征态展开。">{R`\ket{\psi(t_0)}=\sum_n\sum_\tau c_{n,\tau}(t_0)\ket{\varphi_{n,\tau}}`}</Eq>
            <Tx>{R`系数用内积算：`}</Tx>
            <Eq n="D-53" say="展开系数用内积计算。">{R`c_{n,\tau}(t_0)=\braket{\varphi_{n,\tau}|\psi(t_0)}`}</Eq>
            <Tx>{R`**第二步：各自转相位。** 每一项乘上由自己的能量决定的 $e^{-iE_n(t-t_0)/\hbar}$：`}</Tx>
            <Eq n="D-54" keyEq title="保守体系的通解" say="第二步：每个能量分量乘上自己的相因子 $e^{-iE_n(t-t_0)/\hbar}$，这就是保守体系的通解。">{R`\ket{\psi(t)}=\sum_n\sum_\tau c_{n,\tau}(t_0)\,e^{-iE_n(t-t_0)/\hbar}\ket{\varphi_{n,\tau}}`}</Eq>
          </Rule>
          <Tx>{R`谱连续时，求和换成对能量的积分，步骤不变：`}</Tx>
          <Eq n="D-55" say="连续谱版本：对能量积分代替求和，每个分量仍乘自己的相因子。">{R`\ket{\psi(t)}=\sum_\tau\int\dd E\ c_\tau(E,t_0)\ e^{-iE(t-t_0)/\hbar}\ \ket{\varphi_{E,\tau}}`}</Eq>
          <Tx>{R`本页 §D-2-d 的交互图就是按这两步计算三能级体系的，并用直接数值积分做了对照。`}</Tx>
        </Sub3>

        <Sub3 n="D-2-b" title="Stationary states" zh="定态">
          <Tx>{R`**特例：初态只含一个能量。** 例如`}</Tx>
          <Eq n="D-56" say="初态是 $H$ 的本征态：展开中只有一个能量 $E_n$。">{R`\ket{\psi(t_0)}=\sum_\tau c_{n,\tau}(t_0)\ \ket{\varphi_{n,\tau}}`}</Eq>
          <Tx>{R`这时所有分量转相位的速率相同，公共相因子可以整个提出来：`}</Tx>
          <Eq n="D-57" keyEq title="定态" say="能量本征态的演化只是乘一个整体相因子，物理上完全不变，所以叫定态。">{R`\begin{aligned}\ket{\psi(t)}&=\sum_\tau c_{n,\tau}(t_0)\ e^{-iE_n(t-t_0)/\hbar}\ \ket{\varphi_{n,\tau}}\\&=e^{-iE_n(t-t_0)/\hbar}\sum_\tau c_{n,\tau}(t_0)\ \ket{\varphi_{n,\tau}}\\&=e^{-iE_n(t-t_0)/\hbar}\ \ket{\psi(t_0)}\end{aligned}`}</Eq>
          <Tx>{R`整体相因子不可观测（§B-3-b-$\gamma$），所以这样的态的一切测量统计都与时间无关——这就是**定态**名称的由来。

**能量守恒的量子版本。** 在 $t_0$ 测一次能量，读到 $E_k$；第五假设把体系放进本征值为 $E_k$ 的子空间；那是定态，不再变化；所以此后任何时刻再测能量，必然还是 $E_k$。`}</Tx>
          <Box kind="warning" title="相因子不一定是“整体”的">{R`\eqref{D-54} 里每一项都只乘了一个相因子，容易让人以为 $\ket{\psi(t)}$ 与 $\ket{\psi(t_0)}$ 总是同一个物理态。但当初态含有**不同的能量**时，不同项的相因子转得不一样快，系数之间的**相对**相位随时间改变，得到的是物理上不同的态。只有初态只含一个能量时，相因子才是整体的。换句话说：**体系能真正随时间变化，前提是它的能量不确定**。这一观察将在 §D-2-e 定量化。`}</Box>
        </Sub3>

        <Sub3 n="D-2-c" title="Constants of the motion" zh="运动常量">
          <Tx>{R`**问题：除了能量，还有什么是守恒的？** 看一般公式 \eqref{D-27}：只要右边两项都为零，平均值就不变。这启发了如下定义——**运动常量**是满足`}</Tx>
          <Eq n="D-58" keyEq title="运动常量的定义" say="运动常量：不显含时间，且与哈密顿量对易。">{R`\left\{\begin{aligned}&\frac{\partial A}{\partial t}=0\\&[A,H]=0\end{aligned}\right.`}</Eq>
          <Tx>{R`的可观测量。保守体系的 $H$ 本身就是一个。它有三层守恒性质，一层比一层强。

**（i）平均值守恒。** 直接由 \eqref{D-27}，对任何态都有`}</Tx>
          <Eq n="D-59" say="运动常量的平均值在任何态中都不随时间变化。">{R`\frac{\dd}{\dd t}\langle A\rangle=\frac{\dd}{\dd t}\bra{\psi(t)}A\ket{\psi(t)}=0`}</Eq>
          <Tx>{R`**（ii）本征值是好量子数。** $A$ 与 $H$ 对易，存在共同本征基（设谱离散，$\tau$ 补足 ECOC）：`}</Tx>
          <Eq n="D-60" say="$H$ 与运动常量 $A$ 的共同本征态：能量 $E_n$ 与 $A$ 的本征值 $a_p$ 同时确定。">{R`\begin{aligned}&H\ket{\varphi_{n,p,\tau}}=E_n\ \ket{\varphi_{n,p,\tau}}\\&A\ket{\varphi_{n,p,\tau}}=a_p\ \ket{\varphi_{n,p,\tau}}\end{aligned}`}</Eq>
          <Tx>{R`这些态是定态，所以一个初始处于 $\ket{\varphi_{n,p,\tau}}$ 的体系永远停在那里（差整体相因子），也就永远是 $A$ 的本征值为 $a_p$ 的本征态。可以放心地用 $a_p$ 给态贴标签——这就是“好量子数”一词的含义。

**（iii）整个概率分布守恒。** 对**任意**初态，测 $A$ 读到 $a_p$ 的概率都不随时间变。按共同本征基展开初态，`}</Tx>
          <Eq n="D-61" say="初态在 $H$ 与 $A$ 的共同本征基上展开。">{R`\ket{\psi(t_0)}=\sum_n\sum_p\sum_\tau c_{n,p,\tau}(t_0)\ \ket{\varphi_{n,p,\tau}}`}</Eq>
          <Tx>{R`由 §D-2-a 的步骤，`}</Tx>
          <Eq n="D-62" say="$t$ 时刻在同一基上的展开。">{R`\ket{\psi(t)}=\sum_n\sum_p\sum_\tau c_{n,p,\tau}(t)\ \ket{\varphi_{n,p,\tau}}`}</Eq>
          <Eq n="D-63" say="每个系数只转动相位，模不变。">{R`c_{n,p,\tau}(t)=c_{n,p,\tau}(t_0)\ e^{-iE_n(t-t_0)/\hbar}`}</Eq>
          <Tx>{R`读到 $a_p$ 的概率是固定 $p$、对其余指标求模方之和，在两个时刻分别为`}</Tx>
          <Eq n="D-64" say="$t_0$ 时测运动常量得 $a_p$ 的概率。">{R`\mathcal P(a_p,t_0)=\sum_n\sum_\tau|c_{n,p,\tau}(t_0)|^2`}</Eq>
          <Eq n="D-65" say="$t$ 时测得 $a_p$ 的概率；系数的模不变，故与 $t_0$ 时相同。">{R`\mathcal P(a_p,t)=\sum_n\sum_\tau|c_{n,p,\tau}(t)|^2`}</Eq>
          <Tx>{R`\eqref{D-63} 表明每个系数只转相位、模不变，所以两者相等。特别地，若初态是 $A$ 的本征态（某个 $\mathcal P(a_k,t_0)=1$），它就一直是。`}</Tx>
        </Sub3>

        <Sub3 n="D-2-d" title="Bohr frequencies of a system. Selection rules" zh="体系的 Bohr 频率；选择定则">
          <Tx>{R`**问题：不守恒的量的平均值怎样变？** 对任意可观测量 $B$，一般公式只给出导数，`}</Tx>
          <Eq n="D-66" say="一般公式用于任意可观测量 $B$。">{R`\frac{\dd}{\dd t}\langle B\rangle=\frac1{i\hbar}\langle[B,H]\rangle+\left\langle\frac{\partial B}{\partial t}\right\rangle`}</Eq>
          <Tx>{R`但对保守体系我们手里有完整的解 \eqref{D-54}，可以直接把 $\langle B\rangle(t)$ 算出来。需要的另一半是 \eqref{D-54} 的厄米共轭（换用带撇的求和指标以免混淆）：`}</Tx>
          <Eq n="D-67" say="通解的厄米共轭：系数取复共轭，相因子变号。">{R`\bra{\psi(t)}=\sum_{n'}\sum_{\tau'}c^*_{n',\tau'}(t_0)\,e^{iE_{n'}(t-t_0)/\hbar}\,\bra{\varphi_{n',\tau'}}`}</Eq>
          <Tx>{R`把两边夹住 $B$：`}</Tx>
          <Eq n="D-68" keyEq title="平均值的 Bohr 频率展开" say="平均值是一系列振荡项之和，频率只由能级差决定（Bohr 频率），振幅由矩阵元与初态决定。">{R`\begin{aligned}\bra{\psi(t)}B\ket{\psi(t)}&=\langle B\rangle(t)\\&=\sum_n\sum_\tau\sum_{n'}\sum_{\tau'}c^*_{n',\tau'}(t_0)\,c_{n,\tau}(t_0)\braket{\varphi_{n',\tau'}|B|\varphi_{n,\tau}}\,e^{i(E_{n'}-E_n)(t-t_0)/\hbar}\end{aligned}`}</Eq>
          <Tx>{R`（以下设 $B$ 不显含时间，矩阵元为常数。）这个式子可以拆成三个因素来读。

**频率——只属于体系。** 每一项以 $\nu_{n'n}=\left|\frac{E_{n'}-E_n}h\right|=\frac1{2\pi}\frac{|E_{n'}-E_n|}\hbar$ 振荡。这些 **Bohr 频率**由能级决定，与观测哪个量 $B$ 无关，也与初态无关。原子中电偶极矩、磁偶极矩等一切量的平均值都以同一组频率振荡；把振荡的偶极矩想成天线，就直观地理解了为什么原子发射、吸收的光谱频率恰好是能级差除以 $h$——Bohr 的频率条件。

**权重——取决于 $B$ 的矩阵元。** 频率 $\nu_{n'n}$ 在 $\langle B\rangle(t)$ 中的分量正比于 $\braket{\varphi_{n',\tau'}|B|\varphi_{n,\tau}}$。若某对能级之间这个非对角矩阵元为零，那个频率就**无论初态如何**都不会出现。这就是**选择定则**的来源：要知道原子能发射、吸收哪些谱线，就去计算偶极算符在各能级之间的矩阵元。

**权重——还取决于初态。** 系数 $c^*_{n',\tau'}(t_0)c_{n,\tau}(t_0)$ 只有当初态同时含有能级 $n$ 和 $n'$ 时才不为零。若初态是定态（只有 $n=k$），只剩 $n=n'=k$ 的项，$\langle B\rangle$ 不随时间变化——与 §D-2-b 一致。`}</Tx>
          <Fig n="D3" caption={R`**三能级保守体系中 $\langle B\rangle(t)$ 的 Bohr 频率振荡**（交互，$\hbar=1$，$E_1=0$，初态 $|c_n|^2=(0.5,0.3,0.2)$，相位 $(0,0.4,1.1)$）。黑线按 \eqref{D-68} 解析计算；红点是直接用 RK4 积分 Schrödinger 方程的结果（两者相差 $<10^{-6}$）。绿虚线是 \eqref{D-27} 的右边 $\frac1{i\hbar}\langle[B,H]\rangle$，青点是 RK4 结果的数值导数——两者重合，验证了平均值的演化方程。图例最后一行列出每个 Bohr 角频率 $\omega_{n'n}=|E_{n'}-E_n|/\hbar$ 的振幅 $2|c_nc_{n'}B_{n'n}|$。三种 $B$：(1) $B_{13}=0$（矩阵与自旋 1 的 $L_x/\hbar$ 相同）——频率 $\omega_{31}$ 的振幅为零，**选择定则**；(2) 全部非零——三个频率都出现，$\langle B\rangle$ 不再是简单的拍；(3) $B$ 与 $H$ 都是对角的（$[B,H]=0$）——$B$ 是运动常量，$\langle B\rangle$ 为常数（见下面的补充）。`}><BohrPlot /></Fig>
          <Box kind="note" title="补充：从 (D-68) 再看运动常量">{R`若 $[B,H]=0$，$B$ 在能量不同的两个本征态之间的矩阵元为零（第 II 章 §D-3-a）。于是 \eqref{D-68} 中所有 $n'\neq n$ 的振荡项消失，只剩常数项——与 \eqref{D-59} 殊途同归。`}</Box>
        </Sub3>

        <Sub3 n="D-2-e" title="The time-energy uncertainty relation" zh="时间–能量不确定关系">
          <Tx>{R`**把 §D-2-b 的观察定量化。** 那里看到：能量完全确定的态不演化；能量不确定的态才演化。很自然地猜想：能量越不确定，演化越快。设 $\Delta t$ 是体系发生“显著”变化所需的时间，$\Delta E$ 是能量的不确定度，结论是`}</Tx>
          <Eq n="D-69" keyEq title="时间–能量不确定关系" say="体系显著演化所需的时间与能量不确定度之积至少是 $h$ 的量级：能量越不确定，变化越快。">{R`\boxed{\Delta t\cdot\Delta E\gtrsim h}`}</Eq>
          <Tx>{R`$\Delta E=0$（定态）对应 $\Delta t=\infty$，与 §D-2-b 一致。下面用三个由简到繁的例子支持它。

**例一：两个能级。** 初态是两个能量本征态的叠加，`}</Tx>
          <Eq n="D-70" say="两个能量本征态的叠加。">{R`\ket{\psi(t_0)}=c_1\ket{\varphi_1}+c_2\ket{\varphi_2}`}</Eq>
          <Tx>{R`按两步法，`}</Tx>
          <Eq n="D-71" say="两个分量以不同频率转动相位，相对相位随时间变化。">{R`\ket{\psi(t)}=c_1\,e^{-iE_1(t-t_0)/\hbar}\ket{\varphi_1}+c_2\,e^{-iE_2(t-t_0)/\hbar}\ket{\varphi_2}`}</Eq>
          <Tx>{R`测能量只会读到 $E_1$ 或 $E_2$，所以能量不确定度的量级是`}</Tx>
          <Eq n="D-72" say="能量不确定度约为两能级之差。">{R`\Delta E\simeq|E_2-E_1|`}</Eq>
          <Tx>{R`什么叫“显著变化”？找一个与 $H$ 不对易的量 $B$，看它的某个读数 $b_m$（本征矢 $\ket{u_m}$，设非简并）的概率怎样随时间变：`}</Tx>
          <Eq n="D-73" say="测 $B$ 得 $b_m$ 的概率：两个不变的项加一个以 Bohr 频率振荡的干涉项。">{R`\begin{aligned}\mathcal P(b_m,t)&=|\braket{u_m|\psi(t)}|^2=|c_1|^2|\braket{u_m|\varphi_1}|^2+|c_2|^2|\braket{u_m|\varphi_2}|^2\\&\quad+2\,\mathrm{Re}\left[c_2^*c_1\,e^{i(E_2-E_1)(t-t_0)/\hbar}\,\braket{u_m|\varphi_2}^*\braket{u_m|\varphi_1}\right]\end{aligned}`}</Eq>
          <Tx>{R`它以 Bohr 频率 $\nu_{21}=|E_2-E_1|/h$ 在两个极值之间来回振荡，一个周期之后才完成一轮显著变化：`}</Tx>
          <Eq n="D-74" say="特征演化时间约为一个 Bohr 周期。">{R`\Delta t\simeq\frac{h}{|E_2-E_1|}`}</Eq>
          <Tx>{R`与 \eqref{D-72} 相乘，$\Delta E\cdot\Delta t\simeq h$。

**例二：连续的能量分布。** 设 $H$ 的谱连续（非简并），初态是`}</Tx>
          <Eq n="D-75" say="连续能谱上的一般态：用能量分布函数 $c(E)$ 叠加本征态。">{R`\ket{\psi(t_0)}=\int\dd E\ c(E)\ \ket{\varphi_E}`}</Eq>
          <Tx>{R`其中 $|c(E)|^2$ 是集中在 $E_0$ 附近、宽为 $\Delta E$ 的鼓包（图 4）。按两步法，`}</Tx>
          <Eq n="D-76" say="每个能量分量乘自己的相因子。">{R`\ket{\psi(t)}=\int\dd E\ c(E)\ e^{-iE(t-t_0)/\hbar}\,\ket{\varphi_E}`}</Eq>
          <Tx>{R`于是同一个探测概率为`}</Tx>
          <Eq n="D-77" say="测 $B$ 得 $b_m$ 的概率：各能量分量的贡献先带相因子相加，再取模方。">{R`\mathcal P(b_m,t)=|\braket{u_m|\psi(t)}|^2=\left|\int\dd E\ c(E)\ e^{-iE(t-t_0)/\hbar}\ \braket{u_m|\varphi_E}\right|^2`}</Eq>
          <Tx>{R`$\braket{u_m|\varphi_E}$ 通常是 $E$ 的平缓函数；$\Delta E$ 足够小时，在鼓包范围内可以把它当作常数 $\braket{u_m|\varphi_{E_0}}$ 提出来：`}</Tx>
          <Eq n="D-78" say="概率近似正比于 $c(E)$ 的 Fourier 变换的模方；变换的宽度与 $c(E)$ 的宽度成反比。">{R`\mathcal P(b_m,t)\simeq|\braket{u_m|\varphi_{E_0}}|^2\left|\int\dd E\ c(E)\ e^{-iE(t-t_0)/\hbar}\right|^2`}</Eq>
          <Tx>{R`剩下的积分是 $c(E)$ 的 Fourier 变换。Fourier 分析的一般结论（附录 I §2-b）是：一个函数越窄，其变换越宽，两个宽度之积有一个与具体形状无关的下限量级——这就是 \eqref{D-69}。`}</Tx>
          <Fig n="4" caption={R`用系数 $c(E)$ 叠加定态 $\ket{\varphi_E}$，得到能量不完全确定的态 $\ket\psi$，其能量不确定度 $\Delta E$ 由 $|c(E)|^2$ 曲线的宽度给出。按第四个不确定关系，$\ket{\psi(t)}$ 将在 $\Delta E\cdot\Delta t\gtrsim\hbar$ 的时间 $\Delta t$ 之后发生显著演化。`}><Fig4 /></Fig>
          <Box kind="example" title="高斯能量分布：把 (D-78) 算到底">{R`取 $c(E)\propto\exp[-(E-E_0)^2/4\sigma_E^2]$（$|c|^2$ 的标准差 $\sigma_E$），则 $\int\dd E\,c(E)e^{-iE\tau/\hbar}\propto e^{-iE_0\tau/\hbar}\exp(-\sigma_E^2\tau^2/\hbar^2)$，于是 $\mathcal P(b_m,t)\propto\exp[-2\sigma_E^2(t-t_0)^2/\hbar^2]$：一个在 $t$ 上宽度（标准差）为 $\hbar/2\sigma_E$ 的高斯。两个宽度之积恰为 $\hbar/2$——\eqref{D-69} 中写 $h$ 还是 $\hbar$，只取决于怎样约定“显著演化”与“宽度”，这是一个量级关系。`}</Box>
          <Tx>{R`**例三：自由波包，换一个角度。** 一维自由波包的动量宽度为 $\Delta p$。能量是动量的函数，二者的宽度由导数联系：$\Delta E=\frac{\dd E}{\dd p}\Delta p$。由 $E=\hbar\omega$、$p=\hbar k$，$\frac{\dd E}{\dd p}=\frac{\dd\omega}{\dd k}$ 正是群速度 $v_G$（第 I 章 §C-4），于是`}</Tx>
          <Eq n="D-79" say="能量不确定度等于群速度乘动量不确定度。">{R`\Delta E=v_G\,\Delta p`}</Eq>
          <Tx>{R`对一个站在某处的观察者来说，“显著变化”就是波包从他身边经过；长为 $\Delta x$ 的波包以 $v_G$ 运动，经过需要`}</Tx>
          <Eq n="D-80" say="波包经过一点所需的时间等于波包长度除以群速度。">{R`\Delta t\simeq\frac{\Delta x}{v_G}`}</Eq>
          <Tx>{R`相乘时群速度消去，时间–能量关系变成了位置–动量关系：`}</Tx>
          <Eq n="D-81" say="时间–能量关系化为位置–动量不确定关系，群速度在乘积中相消。">{R`\Delta E\cdot\Delta t\ \simeq\ \Delta x\cdot\Delta p\gtrsim\hbar`}</Eq>
          <Box kind="warning" title={R`$t$ 不是可观测量`}>{R`\eqref{D-69} 常被称为“第四个 Heisenberg 关系”，但它与位置–动量的三个关系（补充材料 F$_{\rm I}$ 式 (14)）性质不同：后者涉及两个可观测量的方均根偏差；而在 \eqref{D-69} 中只有能量是可观测量，$t$ **只是一个参数**，没有算符与之对应。$\Delta t$ 不是某次“时间测量”的误差，而是体系显著变化所需的时间。`}</Box>
        </Sub3>
      </Sub>
    </Sec>);
}
