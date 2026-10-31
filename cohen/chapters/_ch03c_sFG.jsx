// 补充材料 F_III（演化算符，式 FIII-1 … FIII-24）与 G_III（Schrödinger 绘景与 Heisenberg 绘景，式 GIII-1 … GIII-12）
// 讲法：F_III 把"解 Schrödinger 方程"打包成一个算符，性质全部从"线性 + 组合律 + 保范"读出；G_III 把同一个幺正变换从态挪到算符上。
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { NaiveEvolutionPlot, PicturesLab } from "./_ch03c_plots.jsx";

const R = String.raw;
const VV = R`\sym{Vop}{V}`;       // (FIII-20) 中"错误的"演化算符
const CC = R`\sym{obsC}{C}`;      // 第三个可观测量
const FF = R`\sym{Fop}{F}`;       // 一般的含时算符 F(t)

export function SecF() {
  return (
    <Sec n="FIII" title="The evolution operator" zh="演化算符"
      gist={R`$\ket{\psi(t)}=U(t,t_0)\ket{\psi(t_0)}$。$U$ 满足 $i\hbar\partial_tU=HU$、$U(t_0,t_0)=\mathbb 1$，有组合律 $U(t,t'')=U(t,t')U(t',t'')$，并且是幺正的：$U^\dagger(t,t')=U^{-1}(t,t')=U(t',t)$。保守体系 $U=\mathrm e^{-iH(t-t_0)/\hbar}$；含时体系则**不能**简单地写成 $\mathrm e^{-\frac i\hbar\int H\,\mathrm dt'}$。`}
      why={R`把"给定初态求末态"的整个过程看成一个算符，可以脱离具体初态讨论演化的性质（组合、可逆、保范），也是散射理论、含时微扰论与 Heisenberg 绘景的出发点。`}
      gives={["FIII-1", "FIII-4", "FIII-9", "FIII-16", "FIII-17", "FIII-18"]}>
      <p className="muted">本节概念：<C id="evolution_op" /></p>
      <Tx>{R`**出发点：演化是线性的。**Schrödinger 方程是关于 $\ket\psi$ 的一阶线性方程，所以 $t_0$ 时的态 $\ket{\psi(t_0)}$ 到 $t$ 时的态 $\ket{\psi(t)}$ 是一个线性映射（\mainsec{D-1}）。把这个映射记作一个算符：`}</Tx>
      <Eq n="FIII-1" keyEq title="演化算符的定义" say="任意时刻的态等于演化算符作用在初始态上；演化算符把 $t_0$ 时刻的态映射为 $t$ 时刻的态。">{R`\ket{\psi(t)}=U(t,t_0)\ket{\psi(t_0)}`}</Eq>
      <Tx>{R`$U(t,t_0)$ 称为体系的**演化算符**。下面它的全部性质，都来自三个事实：定义 \eqref{FIII-1}、Schrödinger 方程、以及初态 $\ket{\psi(t_0)}$ 可以任意选取。`}</Tx>

      <Sub n="FIII-1" title="General properties" zh="一般性质">
        <Tx>{R`**初条件与微分方程。**令 $t=t_0$，对任意初态都有 $\ket{\psi(t_0)}=U(t_0,t_0)\ket{\psi(t_0)}$：`}</Tx>
        <Eq n="FIII-2" say="零时间的演化什么也不做：演化算符在 $t=t_0$ 时等于单位算符。">{R`U(t_0,t_0)=\mathbb 1`}</Eq>
        <Tx>{R`把 \eqref{FIII-1} 代入 Schrödinger 方程：`}</Tx>
        <Eq n="FIII-3" say="把演化算符代入 Schrödinger 方程，作用在任意初态上。">{R`i\hbar\frac\partial{\partial t}U(t,t_0)\ket{\psi(t_0)}=H(t)U(t,t_0)\ket{\psi(t_0)}`}</Eq>
        <Tx>{R`$\ket{\psi(t_0)}$ 任意，所以算符本身满足`}</Tx>
        <Eq n="FIII-4" keyEq title="演化算符的运动方程" say="演化算符本身满足 Schrödinger 方程：$i\hbar$ 乘以它对 $t$ 的偏导等于 $H(t)$ 乘以它。">{R`i\hbar\frac\partial{\partial t}U(t,t_0)=H(t)U(t,t_0)`}</Eq>
        <Tx>{R`一阶方程加初条件 \eqref{FIII-2}，唯一确定了 $U(t,t_0)$。两者还可以合并成一个积分方程（对 $t$ 求导即回到 \eqref{FIII-4}，令 $t=t_0$ 即回到 \eqref{FIII-2}）：`}</Tx>
        <Eq n="FIII-5" say="演化算符满足的积分方程，它同时包含了微分方程与初条件。">{R`U(t,t_0)=\mathbb 1-\frac i\hbar\int_{t_0}^tH(t')U(t',t_0)\,\mathrm dt'`}</Eq>
        <Box kind="aside" title="积分方程的用处：迭代">{R`把 \eqref{FIII-5} 右边的 $U$ 再用 \eqref{FIII-5} 本身代入，反复进行，得到按 $H$ 的幂次展开的级数（Dyson 级数）：$U=\mathbb 1-\frac i\hbar\int_{t_0}^t H(t_1)\mathrm dt_1+\left(-\frac i\hbar\right)^2\int_{t_0}^t\mathrm dt_1\int_{t_0}^{t_1}\mathrm dt_2\,H(t_1)H(t_2)+\cdots$。注意第二项中**晚的时刻在左边**——这种"时序"正是含时微扰论（第 XIII 章）的骨架，也是下面注释 (i) 的根源。`}</Box>
        <Tx>{R`**组合律。**初始时刻 $t_0$ 并没有什么特殊之处，可以换成任意 $t'$：`}</Tx>
        <Eq n="FIII-6" say="从任意中间时刻 $t'$ 的态出发，也能用演化算符得到 $t$ 时刻的态。">{R`\ket{\psi(t)}=U(t,t')\ket{\psi(t')}`}</Eq>
        <Tx>{R`而 $\ket{\psi(t')}$ 又可以从更早的 $t''$ 演化而来：`}</Tx>
        <Eq n="FIII-7" say="中间时刻的态又是更早时刻 $t''$ 的态演化而来。">{R`\ket{\psi(t')}=U(t',t'')\ket{\psi(t'')}`}</Eq>
        <Eq n="FIII-8" say="把两步合起来：先从 $t''$ 演化到 $t'$，再从 $t'$ 演化到 $t$。">{R`\ket{\psi(t)}=U(t,t')\,U(t',t'')\ket{\psi(t'')}`}</Eq>
        <Tx>{R`另一方面直接有 $\ket{\psi(t)}=U(t,t'')\ket{\psi(t'')}$；$\ket{\psi(t'')}$ 任意，所以`}</Tx>
        <Eq n="FIII-9" keyEq title="组合律" say="从 $t''$ 到 $t$ 的演化，等于先从 $t''$ 到 $t'$、再从 $t'$ 到 $t$ 的两段演化之积（右边的先作用）。">{R`U(t,t'')=U(t,t')\,U(t',t'')`}</Eq>
        <Tx>{R`反复使用，把任意长的区间切成很多段：`}</Tx>
        <Eq n="FIII-10" say="长时间的演化等于各段短时间演化按时间次序（早的在右）相乘。">{R`U(t_n,t_1)=U(t_n,t_{n-1})\,...\,U(t_3,t_2)\,U(t_2,t_1)`}</Eq>
        <Tx>{R`$t_1,\dots,t_n$ 任意；若 $t_1<t_2<\dots<t_n$，含义一目了然：从 $t_1$ 到 $t_2$，再到 $t_3$……最后到 $t_n$。注意 $t'$ **不必**夹在 $t''$ 与 $t$ 之间——"往回走"同样合法，这引出逆。

**逆。**在 \eqref{FIII-9} 中令 $t''=t$，并用 \eqref{FIII-2}：`}</Tx>
        <Eq n="FIII-11" say="先从 $t$ 演化到 $t'$、再从 $t'$ 演化回 $t$，等于什么也没做。">{R`\mathbb 1=U(t,t')\,U(t',t)`}</Eq>
        <Tx>{R`交换 $t$、$t'$ 的角色：`}</Tx>
        <Eq n="FIII-12" say="交换两个时刻的角色，同样得到单位算符。">{R`\mathbb 1=U(t',t)\,U(t,t')`}</Eq>
        <Eq n="FIII-13" say="反向演化就是正向演化的逆。">{R`U(t',t)=U^{-1}(t,t')`}</Eq>
        <Tx>{R`**幺正性。**最后看相距 $\mathrm dt$ 的两时刻。把 Schrödinger 方程写成增量形式：`}</Tx>
        <Eq n="FIII-14" say="在 $\mathrm dt$ 时间内，态的增量等于 $-\frac i\hbar H(t)$ 作用在态上乘以 $\mathrm dt$。">{R`\begin{aligned}\mathrm d\ket{\psi(t)}&=\ket{\psi(t+\mathrm dt)}-\ket{\psi(t)}\\&=-\frac i\hbar H(t)\ket{\psi(t)}\mathrm dt\end{aligned}`}</Eq>
        <Eq n="FIII-15" say="下一瞬间的态等于一个接近单位算符的算符作用在当前态上。">{R`\ket{\psi(t+\mathrm dt)}=\left[\mathbb 1-\frac i\hbar H(t)\mathrm dt\right]\ket{\psi(t)}`}</Eq>
        <Tx>{R`对照 $U(t+\mathrm dt,t)$ 的定义：`}</Tx>
        <Eq n="FIII-16" keyEq title="无穷小演化算符" say="无穷小时间的演化算符等于单位算符减去 $\frac i\hbar H(t)\,\mathrm dt$。">{R`U(t+\mathrm dt,t)=\mathbb 1-\frac i\hbar H(t)\mathrm dt`}</Eq>
        <Tx>{R`它叫**无穷小演化算符**。$H(t)$ 厄米，所以它到一阶是幺正的：$U^\dagger U=\left(\mathbb 1+\frac i\hbar H\mathrm dt\right)\left(\mathbb 1-\frac i\hbar H\mathrm dt\right)=\mathbb 1+O(\mathrm dt^2)$（\IIc{CII-3}）。任何有限区间都能切成大量无穷小区间，由 \eqref{FIII-10}，$U(t,t')$ 是许多幺正算符之积，因此也是幺正的。于是 \eqref{FIII-13} 可以写成`}</Tx>
        <Eq n="FIII-17" keyEq title="幺正性" say="演化算符是幺正的：它的厄米共轭等于它的逆，也就是反向演化。">{R`U^\dagger(t,t')=U^{-1}(t,t')=U(t',t)`}</Eq>
        <Tx>{R`这并不意外：幺正就是保范，而 \mainsec{D-1} 早就证明了态矢的模不随时间变化。幺正性只是把"对每个初态都保范"提升成了算符的性质。`}</Tx>
      </Sub>

      <Sub n="FIII-2" title="Case of conservative systems" zh="保守体系，以及一个诱人的错误">
        <Tx>{R`**$H$ 不含时**时，\eqref{FIII-4} 就像一个常系数的线性方程，连同初条件 \eqref{FIII-2} 直接积出：`}</Tx>
        <Eq n="FIII-18" keyEq title="保守体系的演化算符" say="Hamilton 算符不含时时，演化算符是 $H$ 乘以经过的时间的指数函数。">{R`U(t,t_0)=\mathrm e^{-iH(t-t_0)/\hbar}`}</Eq>
        <Tx>{R`§1 的所有性质都可以从这个显式表达式直接验证（例如 $\mathrm e^{-iH(t-t')/\hbar}\mathrm e^{-iH(t'-t'')/\hbar}=\mathrm e^{-iH(t-t'')/\hbar}$，因为 $H$ 与自身对易）。

它也把第 III 章从 \mainref{D-52} 到 \mainref{D-54} 的那一步变成一行：把 $U(t,t_0)$ 作用到 \mainref{D-52} 两边，并注意 $\ket{\varphi_{n,\tau}}$ 是 $H$ 的本征矢（本征值 $E_n$），算符的指数作用在本征矢上就是对本征值取指数：`}</Tx>
        <Eq n="FIII-19" say="演化算符作用在能量本征态上，只给它乘上一个相因子 $\mathrm e^{-iE_n(t-t_0)/\hbar}$。">{R`U(t,t_0)\ket{\varphi_{n,\tau}}=\mathrm e^{-iH(t-t_0)/\hbar}\ket{\varphi_{n,\tau}}=\mathrm e^{-iE_n(t-t_0)/\hbar}\ket{\varphi_{n,\tau}}`}</Eq>
        <Tx>{R`**注释 (i)：$H$ 含时时，不能照搬。**看到 \eqref{FIII-18}，很容易以为对含时的 $H$ 只要把 $H(t-t_0)$ 换成积分：`}</Tx>
        <Eq n="FIII-20" say="一个诱人但错误的猜测：把 $H$ 对时间的积分放进指数。">{R`${VV}(t,t_0)=\mathrm e^{-\frac i\hbar\int_{t_0}^tH(t')\mathrm dt'}`}</Eq>
        <Tx>{R`这是错的。对 $\mathrm e^{${FF}(t)}$ 求导，一般**不等于** $${FF}'(t)\mathrm e^{${FF}(t)}$（\IIc{BII-5}）——那条普通函数的求导法则要求 $${FF}(t)$ 与 $${FF}'(t)$ 对易，而这里 $${FF}'(t)\propto H(t)$，$${FF}(t)\propto\int H$，不同时刻的 $H$ 一般不对易。所以`}</Tx>
        <Eq n="FIII-21" say="错误猜测的算符一般不满足演化算符的运动方程。">{R`i\hbar\frac\partial{\partial t}${VV}(t,t_0)\ne H(t)${VV}(t,t_0)`}</Eq>
        <Tx>{R`正确的 $U$ 是 \eqref{FIII-10} 的"按时间排序"的乘积：先作用早时刻的，再作用晚时刻的。只有当所有时刻的 $H(t)$ 两两对易时，次序才无关紧要，$${VV}$ 才等于 $U$。下面的交互图用旋转磁场中的自旋 1/2 演示两者的差别。`}</Tx>
        <NaiveEvolutionPlot />
        <Tx>{R`**注释 (ii)：相继测量之间允许演化。**\mainsec{E-1} 讨论过依次测量 $A$、$B$、$${CC}$ 的实验，并说过三次测量不必挨得很近。若它们分别在 $t_0$、$t_1$、$t_2$ 进行，中间的演化用 $U$ 补上即可。设 $t_0$ 测 $A$ 得 $a$（态为 $\ket{u_a}$），不测 $B$ 时 $t_2$ 测 $${CC}$ 得 $c$ 的概率（替代 \mainref{E-15}）为`}</Tx>
        <Eq n="FIII-22" say="不做中间测量时，末态测得 $c$ 的概率是 $|\braket{v_c|U(t_2,t_0)|u_a}|^2$。">{R`\mathcal P_a(c)=\left|\braket{v_c|U(t_2,t_0)|u_a}\right|^2`}</Eq>
        <Tx>{R`而在 $t_1$ 测 $B$ 得 $b$、再在 $t_2$ 得 $c$ 的概率（替代 \mainref{E-17}）为`}</Tx>
        <Eq n="FIII-23" say="做了中间测量并得到 $b$ 时，两段演化的跃迁概率相乘。">{R`\mathcal P_a(b,c)=\left|\braket{v_c|U(t_2,t_1)|w_b}\right|^2\left|\braket{w_b|U(t_1,t_0)|u_a}\right|^2`}</Eq>
        <Tx>{R`由组合律 \eqref{FIII-9} 并在中间插入 $\{\ket{w_b}\}$ 的封闭关系：`}</Tx>
        <Eq n="FIII-24" say="由组合律，总振幅等于经过各个中间态 $w_b$ 的振幅之和。">{R`\begin{aligned}\braket{v_c|U(t_2,t_0)|u_a}&=\braket{v_c|U(t_2,t_1)\,U(t_1,t_0)|u_a}\\&=\sum_b\braket{v_c|U(t_2,t_1)|w_b}\braket{w_b|U(t_1,t_0)|u_a}\end{aligned}`}</Eq>
        <Tx>{R`代入 \eqref{FIII-22}：不测 $B$ 时是**振幅**先对 $b$ 求和再取模方，测 $B$ 时是**概率**对 $b$ 求和；两者相差干涉项，所以与 \mainref{E-21} 一样，$\mathcal P_a(c)\ne\sum_b\mathcal P_a(b,c)$。演化算符的组合律，正是"对中间态的振幅求和"在时间上的版本。`}</Tx>
        <Box kind="note" title="延伸">{R`演化算符是碰撞理论（第 VIII 章）、含时微扰论（第 XIII 章）以及原子与光子相互作用（第 XX 章）的基本工具。`}</Box>
      </Sub>
    </Sec>);
}

export function SecG() {
  return (
    <Sec n="GIII" title="The Schrödinger and Heisenberg pictures" zh="Schrödinger 绘景与 Heisenberg 绘景"
      gist={R`所有预言都是矩阵元，同一个幺正变换同时作用于右矢与算符时不变。取这个变换为 $U^\dagger(t,t_0)$，态矢便冻结在 $\ket{\psi_H}=\ket{\psi_S(t_0)}$，时间依赖全部转移到算符 $A_H(t)=U^\dagger A_SU$ 上，它满足 Heisenberg 方程 $i\hbar\dot A_H=[A_H,H_H]+i\hbar(\mathrm dA_S/\mathrm dt)_H$。`}
      why={R`Heisenberg 绘景让量子力学的运动方程在形式上与经典 Hamilton 方程一模一样，是算符代数计算（谐振子、角动量）与量子场论的自然语言；它与第 III 章的 Schrödinger 绘景给出完全相同的预言。`}
      gives={["GIII-2", "GIII-3", "GIII-8", "GIII-9", "GIII-12"]}>
      <p className="muted">本节概念：<C id="pictures" /> · <C id="evolution_op" /></p>
      <Tx>{R`**时间附着在哪里？**实验能拿到的只有数：某个结果的概率、某个量的平均值。它们全都是"左矢—算符—右矢"夹出来的矩阵元 $\braket{\psi(t)|A|\psi(t)}$。这个表达式里随时间变化的只是整体的数值，至于"变化"记在右矢上还是记在算符上，并没有物理上的规定。

\IIc{CII} 给了我们一把钥匙：对右矢和算符**同时**做同一个幺正变换，一切矩阵元保持不变。第 III 章选的是一种记法——算符（位置、动量、动能……）固定不动（\mainsec{D-1}），右矢按 Schrödinger 方程演化，称为 **Schrödinger 绘景**。现在用那把钥匙换一种记法：挑一个随时间变化的幺正变换，恰好把右矢的演化"抵消"掉，于是右矢冻结、算符开始随时间演化，称为 **Heisenberg 绘景**。本节用下标 $\nosym{S}$、$\nosym{H}$ 区分两种绘景；其他各章只用 Schrödinger 绘景，下标 $\nosym{S}$ 一律省略。`}</Tx>
      <Tx>{R`**挑选变换。**由 $\mathrm F_{\rm III}$，`}</Tx>
      <Eq n="GIII-1" say="Schrödinger 绘景中，$t$ 时刻的态是演化算符作用于 $t_0$ 时刻的态。">{R`\ket{\psi_S(t)}=U(t,t_0)\ket{\psi_S(t_0)}`}</Eq>
      <Tx>{R`$U$ 幺正，所以只要对态施加 $U^\dagger(t,t_0)$ 就把演化"倒回去"，得到一个不变的右矢：`}</Tx>
      <Eq n="GIII-2" keyEq title="Heisenberg 绘景的态矢" say="用演化算符的厄米共轭把态“倒带”，得到不随时间变化的 Heisenberg 态，它就是 $t_0$ 时刻的 Schrödinger 态。">{R`\begin{aligned}\ket{\psi_H}&=U^\dagger(t,t_0)\ket{\psi_S(t)}=U^\dagger(t,t_0)\,U(t,t_0)\ket{\psi_S(t_0)}\\&=\ket{\psi_S(t_0)}\end{aligned}`}</Eq>
      <Tx>{R`Heisenberg 绘景中的态矢恒定，等于 Schrödinger 态矢在 $t_0$ 时刻的值。为保持矩阵元不变，算符要做同样的变换（\IIc{CII-2}）：`}</Tx>
      <Eq n="GIII-3" keyEq title="Heisenberg 绘景的算符" say="Heisenberg 绘景的算符是 Schrödinger 绘景算符被演化算符“夹住”的结果，一般随时间变化。">{R`A_H(t)=U^\dagger(t,t_0)A_S(t)\,U(t,t_0)`}</Eq>
      <Tx>{R`即使 $A_S$ 不含时，$A_H(t)$ 一般也随时间变化。

**一个特例：运动常量。**若体系保守（$H_S$ 不含时）且 $A_S$ 与 $H_S$ 对易（于是 $A_S$ 是运动常量，\mainsec{D-2}），则`}</Tx>
      <Eq n="GIII-4" say="保守体系的演化算符是 $H_S$ 乘时间的指数。">{R`U(t,t_0)=\mathrm e^{-iH_S(t-t_0)/\hbar}`}</Eq>
      <Tx>{R`$A_S$ 与 $H_S$ 对易，也就与 $H_S$ 的任何函数对易（\IIc{BII-4}），特别是与 $U(t,t_0)$ 对易：`}</Tx>
      <Eq n="GIII-5" say="与 $H$ 对易的不含时可观测量，在两种绘景中是同一个算符。">{R`A_H(t)=U^\dagger(t,t_0)\,U(t,t_0)A_S=A_S`}</Eq>
      <Tx>{R`两种绘景中它是同一个算符，且不含时——"运动常量"在 Heisenberg 绘景里字面意义上就是常量。特别地 $H_S=H_H$，保守体系的 Hamilton 算符不需要区分下标。

**一般情形：Heisenberg 方程。**对 \eqref{GIII-3} 求导，三个因子各贡献一项。用 $\mathrm F_{\rm III}$ 的 \eqref{FIII-4} 及其共轭 $-i\hbar\partial_tU^\dagger=U^\dagger H_S$：`}</Tx>
      <Eq n="GIII-6" say="对 $A_H$ 求导，三项分别来自 $U^\dagger$、$A_S$ 本身与 $U$ 的时间依赖。">{R`\begin{aligned}\frac{\mathrm d}{\mathrm dt}A_H(t)=&-\frac1{i\hbar}U^\dagger(t,t_0)H_S(t)A_S(t)\,U(t,t_0)+U^\dagger(t,t_0)\frac{\mathrm dA_S(t)}{\mathrm dt}U(t,t_0)\\&+\frac1{i\hbar}U^\dagger(t,t_0)A_S(t)H_S(t)U(t,t_0)\end{aligned}`}</Eq>
      <Tx>{R`在第一项与最后一项的 $A_S$、$H_S$ 之间插入 $U(t,t_0)U^\dagger(t,t_0)=\mathbb 1$（$\mathrm F_{\rm III}$ 式 \eqref{FIII-17}）：`}</Tx>
      <Eq n="GIII-7" say="在 $A_S$ 与 $H_S$ 之间插入单位算符 $UU^\dagger$，每一项都变成两个“被夹住”的算符之积。">{R`\begin{aligned}\frac{\mathrm d}{\mathrm dt}A_H(t)=&-\frac1{i\hbar}U^\dagger(t,t_0)H_S(t)U(t,t_0)U^\dagger(t,t_0)A_S(t)U(t,t_0)\\&+U^\dagger(t,t_0)\frac{\mathrm dA_S(t)}{\mathrm dt}U(t,t_0)\\&+\frac1{i\hbar}U^\dagger(t,t_0)A_S(t)U(t,t_0)U^\dagger(t,t_0)H_S(t)U(t,t_0)\end{aligned}`}</Eq>
      <Tx>{R`每一对 $U^\dagger\cdots U$ 都是按 \eqref{GIII-3} 的变换：`}</Tx>
      <Eq n="GIII-8" keyEq title="Heisenberg 运动方程" say="Heisenberg 绘景算符的变化率由它与 Hamilton 算符的对易子给出，若 Schrödinger 算符本身显含时间，再加上一项。">{R`i\hbar\frac{\mathrm d}{\mathrm dt}A_H(t)=[A_H(t),\,H_H(t)]+i\hbar\left(\frac{\mathrm d}{\mathrm dt}A_S(t)\right)_H`}</Eq>
      <Tx>{R`（$H_H=U^\dagger H_SU$。）与 $\mathrm E_{\rm III}$ 的 \eqref{EIII-16} 比较：密度算符的方程是 $i\hbar\dot\rho=[H,\rho]$，这里是 $[A_H,H_H]$，**次序相反**——密度算符是"态"，随 Schrödinger 绘景演化；可观测量随 Heisenberg 绘景演化，两者方向相反才使平均值一致。`}</Tx>
      <Box kind="aside" title="历史">{R`Schrödinger 在第一种绘景中得到了他的方程；Heisenberg 则计算代表各物理量的矩阵 $A_H(t)$ 怎样随时间变化（故名"矩阵力学"）。两种方法的等价性是后来才证明的。`}</Box>
      <Tx>{R`**取平均：回到第 III 章的 (D-27)。**平均值`}</Tx>
      <Tx>{R`$$\langle A\rangle(t)=\braket{\psi_S(t)|A_S(t)|\psi_S(t)}$$`}</Tx>
      <Tx>{R`在 Heisenberg 绘景中写作`}</Tx>
      <Eq n="GIII-9" keyEq title="两种绘景给出同一个平均值" say="同一个平均值在 Heisenberg 绘景中写成：不变的态夹住随时间变化的算符。">{R`\langle A\rangle(t)=\braket{\psi_H|A_H(t)|\psi_H}`}</Eq>
      <Tx>{R`右边只有 $A_H(t)$ 依赖时间，对 \eqref{GIII-8} 取平均立即得到平均值的演化方程 \mainref{D-27}。但 \eqref{GIII-8} 比 (D-27) 更强：(D-27) 是两个平均值（数）相等，\eqref{GIII-8} 是两个**算符**相等——它对任何态的任何矩阵元都成立。

下面的交互图把这件事做成数值实验：同一个含时体系，用 Schrödinger 绘景 $\braket{\psi(t)|A|\psi(t)}$、Heisenberg 绘景 $\braket{\psi(0)|U^\dagger AU|\psi(0)}$，以及独立积分平均值的运动方程三条路线计算 $\langle A\rangle(t)$。`}</Tx>
      <PicturesLab />
      <Tx>{R`**一维粒子：方程与经典力学形式相同。**体系是势场中的质量为 $m$ 的粒子时（只看一维）：`}</Tx>
      <Eq n="GIII-10" say="Schrödinger 绘景中一维粒子的 Hamilton 算符：动能加势能。">{R`H_S(t)=\frac{{P_S}^2}{2m}+V(X_S,t)`}</Eq>
      <Tx>{R`幺正变换保持算符的乘积与函数关系（\IIc{CII}），所以`}</Tx>
      <Eq n="GIII-11" say="Heisenberg 绘景中的 Hamilton 算符形式完全相同，只是 $X$、$P$ 换成了含时的 $X_H$、$P_H$。">{R`H_H(t)=\frac{{P_H}^2}{2m}+V(X_H,t)`}</Eq>
      <Tx>{R`代入 \eqref{GIII-8}，并用 $[X_H,P_H]=[X_S,P_S]=i\hbar$（幺正变换保持对易关系），按 \mainsec{D-1} 中求 Ehrenfest 定理的同样步骤得到`}</Tx>
      <Eq n="GIII-12" keyEq title="Heisenberg 绘景中的“Hamilton 方程”" say="位置算符的变化率等于动量算符除以质量；动量算符的变化率等于势的负梯度——与经典 Hamilton 方程逐字相同，只是变量换成了算符。">{R`\begin{aligned}\frac{\mathrm d}{\mathrm dt}X_H(t)&=\frac1mP_H(t)\\\frac{\mathrm d}{\mathrm dt}P_H(t)&=-\frac{\partial V}{\partial X}(X_H,t)\end{aligned}`}</Eq>
      <Derivation collapsed title="由 (GIII-8) 推出 (GIII-12)" steps={[
        { tex: R`[X_H,P_H^2]=2i\hbar P_H\ \Rightarrow\ i\hbar\dot X_H=[X_H,H_H]=\frac{2i\hbar P_H}{2m}`, why: R`$X_S$ 不显含时，\eqref{GIII-8} 第二项为零；$V(X_H,t)$ 与 $X_H$ 对易。` },
        { tex: R`[P_H,V(X_H,t)]=-i\hbar\,\frac{\partial V}{\partial X}(X_H,t)\ \Rightarrow\ i\hbar\dot P_H=[P_H,H_H]=-i\hbar\frac{\partial V}{\partial X}(X_H,t)`, why: R`用 $[P,f(X)]=-i\hbar f'(X)$（\IIc{BII-5}），它在幺正变换下保持不变。` },
      ]} />
      <Tx>{R`这推广了 Ehrenfest 定理（\mainref{D-34}、\mainref{D-35}）：那里是平均值满足的方程，这里是算符本身满足的方程；它们与经典量 $x$、$p$ 的方程（\mainref{D-36a}、\mainref{D-36b}）形式完全相同。**Heisenberg 绘景的一大好处，正是让量子方程在形式上与经典力学相似。**`}</Tx>
      <Box kind="note" title="第三种绘景">{R`把 $H$ 拆成"可精确求解的部分 + 微扰"，只用前者做上述变换，得到介于两者之间的**相互作用绘景**：态矢只随微扰慢慢演化，算符随可解部分演化。它是含时微扰论的标准工具，见本章补充材料 $\mathrm L_{\rm III}$ 习题 15 与第 XX 章 §A-2。`}</Box>
    </Sec>);
}
