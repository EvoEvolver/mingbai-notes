// 补充材料 C_II：幺正算符 —— 式 (CII-1)–(CII-44)
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import "./_ch02c_kit.jsx";
import { Fig } from "./_ch02c_kit.jsx";
import { BasisRotationDemo } from "./_ch02c_plots.jsx";

const R = String.raw;

export function SecC() {
  return (
    <Sec n="CII" title="Unitary operators" zh="幺正算符"
      gist={R`幺正算符 $U^\dagger U=UU^\dagger=\mathbb 1$ 保持标积，等价于"把一组正交归一基变成另一组正交归一基"；它的矩阵各列正交归一，本征值是模为 1 的复数。用它可以变换算符 $\tilde A=UAU^\dagger$（本征值不变、本征矢跟着转）；无穷小幺正算符写成 $\mathbb 1-i\varepsilon F$，$F$ 厄米，算符的一阶变化为 $-i\varepsilon[F,A]$。`}
      why={R`换基、对称操作（转动、平移、宇称）、时间演化，在量子力学里都由幺正算符实现。认清"幺正 = 复空间里的转动"，再知道无穷小幺正算符由厄米"生成元"决定，后面的平移算符 $\mathrm e^{-i\lambda P/\hbar}$（$\mathrm E_{\rm II}$）、宇称（$\mathrm F_{\rm II}$）、演化算符都是同一个模式。`}
      gives={["CII-1", "CII-3", "CII-20", "CII-25", "CII-30", "CII-32", "CII-42", "CII-44"]}>
      <p className="muted">本节概念：<C id="unitary" /> · <C id="unitary_tf" /> · <C id="generator" /></p>

      <Sub n="CII-1" title="General properties of unitary operators" zh="幺正算符的一般性质">
        <Sub n="CII-1-a" title="Definition and simple properties" zh="定义与简单性质">
          <Tx>{R`**问题。**实三维空间里，转动和反射是"不改变长度和夹角"的线性变换，矩阵满足 $O^TO=\mathbb 1$。复的态空间里对应的是什么？把"转置"换成"伴随"即可。定义：$U$ 的逆就是它的伴随，`}</Tx>
          <Eq n="CII-1" keyEq title="幺正算符" say="幺正算符的伴随就是它的逆：先作用 $U$ 再作用 $U^\dagger$（或反过来）什么也没做。">{R`U^\dagger U=UU^\dagger=\mathbb 1`}</Eq>
          <Tx>{R`**它为什么"不改变几何"。**把任意两个矢量都用 $U$ 变换，`}</Tx>
          <Eq n="CII-2" say="用同一个幺正算符变换两个任意矢量。">{R`\begin{aligned}\ket{\tilde\psi_1}&=U\ket{\psi_1}\\\ket{\tilde\psi_2}&=U\ket{\psi_2}\end{aligned}`}</Eq>
          <Tx>{R`新的标积里，左矢 $\bra{\tilde\psi_1}=\bra{\psi_1}U^\dagger$，于是 $U^\dagger U$ 碰在一起消掉：`}</Tx>
          <Eq n="CII-3" keyEq title="幺正变换保持标积" say="幺正变换后两个矢量的标积与变换前相同——长度、夹角、概率幅都不变。">{R`\braket{\tilde\psi_1|\tilde\psi_2}=\braket{\psi_1|U^\dagger U|\psi_2}=\braket{\psi_1|\psi_2}`}</Eq>
          <Tx>{R`特别地，模长不变。有限维时反过来也成立：保持所有标积的线性算符一定幺正（无穷维时还需要 $U$ 是满射——"保持标积"只给出 $U^\dagger U=\mathbb 1$，例如把基矢整体右移一位的算符就不满足 $UU^\dagger=\mathbb 1$）。

**三个随手可得的结论。**

① **厄米算符的指数是幺正的。**若 $A^\dagger=A$，令 $T=\mathrm e^{iA}$。逐项取伴随（$i$ 变 $-i$），`}</Tx>
          <Eq n="CII-4" say="厄米算符 $A$ 的指数 $\mathrm e^{iA}$ 的伴随是 $\mathrm e^{-iA}$：取伴随时 $i$ 变号，而 $A$ 不变。">{R`T^\dagger=\mathrm e^{-iA^\dagger}=\mathrm e^{-iA}`}</Eq>
          <Tx>{R`$iA$ 与 $-iA$ 对易，由 \eqref{BII-33} 指数可以合并：`}</Tx>
          <Eq n="CII-5" say="$\mathrm e^{-iA}$ 与 $\mathrm e^{iA}$ 相乘得单位算符（两者对易，指数相加为零），所以 $\mathrm e^{iA}$ 幺正。">{R`\begin{aligned}T^\dagger T&=\mathrm e^{-iA}\mathrm e^{iA}=\mathbb 1\\TT^\dagger&=\mathrm e^{iA}\mathrm e^{-iA}=\mathbb 1\end{aligned}`}</Eq>
          <Tx>{R`这条将来会反复出现：时间演化 $\mathrm e^{-iHt/\hbar}$、平移 $\mathrm e^{-i\lambda P/\hbar}$、转动 $\mathrm e^{-i\theta J_z/\hbar}$ 都是"$i\times$厄米"的指数。

② **幺正算符的乘积还是幺正的。**设`}</Tx>
          <Eq n="CII-6" say="两个幺正算符 $U$ 和 $V$ 各自满足幺正条件。">{R`\begin{aligned}U^\dagger U&=UU^\dagger=\mathbb 1\\\sym{Vu}{V}^\dagger\sym{Vu}{V}&=\sym{Vu}{V}\sym{Vu}{V}^\dagger=\mathbb 1\end{aligned}`}</Eq>
          <Tx>{R`用 $(UV)^\dagger=V^\dagger U^\dagger$，从里往外一层层消：`}</Tx>
          <Eq n="CII-7" say="乘积 $UV$ 的伴随是 $V^\dagger U^\dagger$，与 $UV$ 相乘时从中间开始逐层抵消，得到单位算符：$UV$ 也幺正。">{R`\begin{aligned}(U\sym{Vu}{V})^\dagger(U\sym{Vu}{V})&=\sym{Vu}{V}^\dagger U^\dagger U\sym{Vu}{V}=\sym{Vu}{V}^\dagger \sym{Vu}{V}=\mathbb 1\\(U\sym{Vu}{V})(U\sym{Vu}{V})^\dagger&=U\sym{Vu}{V}\sym{Vu}{V}^\dagger U^\dagger=UU^\dagger=\mathbb 1\end{aligned}`}</Eq>
          <Tx>{R`几何上这毫不意外：两次"不改变几何"的操作接连做，仍不改变几何。

③ **与正交变换的关系。**实空间里保持标积的变换（转动、关于点或平面的反射）叫正交变换；幺正变换就是它们向复空间、任意维数的推广。`}</Tx>
        </Sub>

        <Sub n="CII-1-b" title="Unitary operators and change of bases" zh="幺正算符与换基">
          <Tx>{R`**核心命题：$U$ 幺正 $\iff$ $U$ 把一组正交归一基变成另一组正交归一基。**这给了幺正算符一个具体可感的图像：它就是"转动坐标架"。

**α．必要性。**设 $\{\ket{v_i}\}$ 是正交归一基，定义`}</Tx>
          <Eq n="CII-8" say="把原基的每个矢量用 $U$ 变换，得到一组新矢量。">{R`\ket{\tilde v_i}=U\ket{v_i}`}</Eq>
          <Tx>{R`由 \eqref{CII-3}，标积保持，所以新矢量仍正交归一：`}</Tx>
          <Eq n="CII-9" say="变换后的矢量两两正交、各自归一：标积与变换前完全相同。">{R`\braket{\tilde v_i|\tilde v_j}=\braket{v_i|v_j}=\delta_{ij}`}</Eq>
          <Tx>{R`还要说明它们**完备**——任何 $\ket\psi$ 都能用它们展开。窍门是先用 $U^\dagger$ 把 $\ket\psi$ "转回去"，在旧基里展开：`}</Tx>
          <Eq n="CII-10" say="把 $U^\dagger\ket\psi$ 在旧基上展开，系数记为 $c_i$。">{R`U^\dagger\ket\psi=\sum_ic_i\ket{v_i}`}</Eq>
          <Tx>{R`两边再作用 $U$：`}</Tx>
          <Eq n="CII-11" say="两边作用 $U$：左边出现 $UU^\dagger$，右边每个旧基矢被换成新基矢。">{R`UU^\dagger\ket\psi=\sum_ic_iU\ket{v_i}`}</Eq>
          <Tx>{R`左边 $UU^\dagger=\mathbb 1$（这里用到了幺正的**两个**条件之一），于是`}</Tx>
          <Eq n="CII-12" say="任意矢量都可以用新基矢展开，系数与 $U^\dagger\ket\psi$ 在旧基中的分量相同：新矢量组是完备的。">{R`\ket\psi=\sum_ic_i\ket{\tilde v_i}`}</Eq>
          <Tx>{R`顺便读出一个实用公式：$\ket\psi$ 在新基中的分量 $c_i=\braket{\tilde v_i|\psi}=\braket{v_i|U^\dagger|\psi}$。下面的交互图就用它算"新坐标"。

**β．充分性。**反过来，设 $\ket{\tilde v_i}=U\ket{v_i}$ 构成正交归一基，即`}</Tx>
          <Eq n="CII-13" say="假设：新矢量组由 $U$ 作用于旧基得到，两两正交归一，并满足封闭关系。">{R`\begin{aligned}&\ket{\tilde v_i}=U\ket{v_i}\\&\braket{\tilde v_i|\tilde v_j}=\delta_{ij}\\&\sum_i\ket{\tilde v_i}\bra{\tilde v_i}=\mathbb 1\end{aligned}`}</Eq>
          <Tx>{R`第一式取伴随，再换个指标：`}</Tx>
          <Eq n="CII-14" say="新基矢的左矢等于旧基矢的左矢右乘 $U^\dagger$（右矢关系取伴随）。">{R`\bra{v_j}U^\dagger=\bra{\tilde v_j}`}</Eq>
          <Box kind="warning" title={R`勘误：\eqref{CII-14} 左边应为旧基矢`}>{R`原书 (14) 印作 $\bra{\tilde v_j}U^\dagger=\bra{\tilde v_j}$。它不是 (13) 第一式的伴随：$\ket{\tilde v_j}=U\ket{v_j}$ 取伴随得 $\bra{\tilde v_j}=\bra{v_j}U^\dagger$，左边是**旧**基矢。若照印法理解，就会推出 $U^\dagger$ 让每个新基矢不变、从而 $U^\dagger=\mathbb 1$，显然不对。本页 \eqref{CII-14} 已写成正确形式；下面 \eqref{CII-15} 第二步 $\braket{v_j|U^\dagger|\tilde v_i}=\braket{\tilde v_j|\tilde v_i}$ 用的正是它。`}</Box>
          <Tx>{R`**先证 $U^\dagger U=\mathbb 1$。**作用在旧基矢上，插入旧基的封闭关系：`}</Tx>
          <Eq n="CII-15" say="$U^\dagger U$ 作用在每个旧基矢上都把它还原：先用 $U$ 变成新基矢，再插入封闭关系，利用新基的正交归一性。">{R`\begin{aligned}U^\dagger U\ket{v_i}&=U^\dagger\ket{\tilde v_i}=\sum_j\ket{v_j}\,\braket{v_j|U^\dagger|\tilde v_i}\\&=\sum_j\ket{v_j}\,\braket{\tilde v_j|\tilde v_i}=\sum_j\ket{v_j}\delta_{ij}\\&=\ket{v_i}\end{aligned}`}</Eq>
          <Tx>{R`对所有基矢成立，所以 $U^\dagger U=\mathbb 1$。

**再证 $UU^\dagger=\mathbb 1$。**这一半要用到新基的**完备性**（\eqref{CII-13} 第三式）。先写出 $U^\dagger$ 作用在旧基矢上：`}</Tx>
          <Eq n="CII-16" say="$U^\dagger$ 作用在旧基矢上，按旧基展开，系数是新基矢与旧基矢的标积。">{R`\begin{aligned}U^\dagger\ket{v_i}&=\sum_j\ket{v_j}\,\braket{v_j|U^\dagger|v_i}\\&=\sum_j\ket{v_j}\,\braket{\tilde v_j|v_i}\end{aligned}`}</Eq>
          <Tx>{R`再作用 $U$，旧基矢变成新基矢，剩下的恰是新基的封闭关系：`}</Tx>
          <Eq n="CII-17" say="$UU^\dagger$ 作用在旧基矢上也把它还原：中间出现新基的封闭关系。">{R`\begin{aligned}UU^\dagger\ket{v_i}&=\sum_jU\ket{v_j}\,\braket{\tilde v_j|v_i}\\&=\sum_j\ket{\tilde v_j}\,\braket{\tilde v_j|v_i}\\&=\ket{v_i}\end{aligned}`}</Eq>
          <Tx>{R`故 $UU^\dagger=\mathbb 1$，$U$ 幺正。`}</Tx>
          <Box kind="key" title="为什么两半要分开证">{R`只知道"新矢量正交归一"，只能推出 $U^\dagger U=\mathbb 1$（$U$ 是等距的）；"$UU^\dagger=\mathbb 1$"还需要新矢量**完备**。有限维时正交归一的 $N$ 个矢量自动完备，两条件等价；无穷维时不然——这也是为什么定义 \eqref{CII-1} 要把两个条件都写出来。`}</Box>
        </Sub>

        <Sub n="CII-1-c" title="Unitary matrices" zh="幺正矩阵">
          <Tx>{R`**怎样一眼认出幺正矩阵？**设矩阵元`}</Tx>
          <Eq n="CII-18" say="幺正算符在正交归一基中的矩阵元。">{R`U_{ij}=\braket{v_i|U|v_j}`}</Eq>
          <Tx>{R`把 $U^\dagger U=\mathbb 1$ 写成矩阵元，中间插入封闭关系：`}</Tx>
          <Eq n="CII-19" say="$U^\dagger U$ 的矩阵元写成两个矩阵相乘的形式。">{R`\braket{v_i|U^\dagger U|v_j}=\sum_k\braket{v_i|U^\dagger|v_k}\,\braket{v_k|U|v_j}`}</Eq>
          <Tx>{R`而 $\braket{v_i|U^\dagger|v_k}=U_{ki}^*$，所以`}</Tx>
          <Eq n="CII-20" keyEq title="幺正矩阵的列正交归一" say="幺正矩阵的任意两列：一列的复共轭与另一列对应相乘求和，不同列得 0，同一列得 1。">{R`\sum_kU^*_{ki}U_{kj}=\delta_{ij}`}</Eq>
          <Tx>{R`读法：**各列构成 $\mathbb C^N$ 中的正交归一组**（第 $j$ 列正是 $U\ket{v_j}=\ket{\tilde v_j}$ 在旧基中的分量——这就是 §1-b 的命题在矩阵语言中的翻版）。由 $UU^\dagger=\mathbb 1$ 同样得到各行正交归一。

**例 1：**实三维空间中绕 $Oz$ 转 $\theta$：`}</Tx>
          <Eq n="CII-21" say="绕 $z$ 轴转角 $\theta$ 的转动矩阵：实的正交矩阵，是幺正矩阵的特例。">{R`R(\theta)=\begin{pmatrix}\cos\theta&-\sin\theta&0\\\sin\theta&\cos\theta&0\\0&0&1\end{pmatrix}`}</Eq>
          <Tx>{R`三列分别是 $(\cos\theta,\sin\theta,0)$、$(-\sin\theta,\cos\theta,0)$、$(0,0,1)$，两两正交、长度为 1，一眼可见。

**例 2：**自旋 1/2 粒子态空间中的转动（第 IX 章；$\alpha,\beta,\gamma$ 为 Euler 角）：`}</Tx>
          <Eq n="CII-22" say="自旋 $1/2$ 的转动矩阵：由三个 Euler 角给出的 $2\times2$ 复幺正矩阵，矩阵元带有半角的相位因子。">{R`R^{(1/2)}(\alpha,\beta,\gamma)=\begin{pmatrix}\mathrm e^{-\frac i2(\alpha+\gamma)}\cos\frac\beta2&-\mathrm e^{\frac i2(\gamma-\alpha)}\sin\frac\beta2\\\mathrm e^{\frac i2(\alpha-\gamma)}\sin\frac\beta2&\mathrm e^{\frac i2(\alpha+\gamma)}\cos\frac\beta2\end{pmatrix}`}</Eq>
          <Box kind="warning" title={R`勘误：\eqref{CII-22} 左下角的相位`}>{R`原书 (22) 左下角印作 $\mathrm e^{\frac i2(\gamma-\alpha)}\sin\frac\beta2$（与右上角同一个相位）。这样的矩阵**不是幺正的**：按 \eqref{CII-20} 计算两列的"内积"，得 $\cos\frac\beta2\sin\frac\beta2\,(\mathrm e^{i\alpha}-\mathrm e^{i\gamma})$，只有 $\alpha=\gamma$ 时才为零。

正确的矩阵元是 $\mathrm e^{\frac i2(\alpha-\gamma)}\sin\frac\beta2$，本页已改正。依据：$R^{(1/2)}=\mathrm e^{-i\alpha\sigma_z/2}\,\mathrm e^{-i\beta\sigma_y/2}\,\mathrm e^{-i\gamma\sigma_z/2}$，中间因子是 $\begin{pmatrix}\cos\frac\beta2&-\sin\frac\beta2\\\sin\frac\beta2&\cos\frac\beta2\end{pmatrix}$，左右两个对角因子分别给左下角乘上 $\mathrm e^{i\alpha/2}$ 与 $\mathrm e^{-i\gamma/2}$。数值上，改正后的矩阵与三个指数之积在 50 组随机 Euler 角下吻合到 $10^{-15}$，$U^\dagger U-\mathbb 1$ 也为 $10^{-16}$ 量级（下面交互图的"自旋 1/2"模式实时显示这一检验）；原印法的 $\|U^\dagger U-\mathbb 1\|$ 最大可达 1.4。`}</Box>
          <Fig n="C-1" caption={R`交互（自绘）：幺正变换 = 换一组正交归一基。选两个态 $\ket{\psi_1},\ket{\psi_2}$，用 $U$ 生成新基 $\ket{\tilde v_i}=U\ket{v_i}$，表中并列它们在旧基、新基中的分量（新分量 $=\braket{\tilde v_i|\psi}=(U^\dagger\psi)_i$）。分量全变了，但模长平方与标积 $\braket{\psi_1|\psi_2}$ 两边逐位相同；最后一行用 \eqref{CII-20} 检验列正交归一。`}><BasisRotationDemo /></Fig>
        </Sub>

        <Sub n="CII-1-d" title="Eigenvalues and eigenvectors of a unitary operator" zh="幺正算符的本征值与本征矢">
          <Tx>{R`**本征值落在单位圆上。**设 $\ket{\psi_u}$ 归一，`}</Tx>
          <Eq n="CII-23" say="$\ket{\psi_u}$ 是幺正算符 $U$ 的本征矢，本征值记为 $u$（一般是复数）。">{R`U\ket{\psi_u}=u\ket{\psi_u}`}</Eq>
          <Tx>{R`算 $U\ket{\psi_u}$ 的模方两种方式：一方面它等于 $u^*u$，`}</Tx>
          <Eq n="CII-24" say="本征矢经 $U$ 变换后的模方等于本征值模的平方。">{R`\braket{\psi_u|U^\dagger U|\psi_u}=u^*u\braket{\psi_u|\psi_u}=u^*u`}</Eq>
          <Tx>{R`另一方面幺正算符保持模长，它等于 1。所以 $|u|=1$：`}</Tx>
          <Eq n="CII-25" keyEq title="幺正算符的本征值" say="幺正算符的本征值都是模为 1 的复数，只是一个相位因子。">{R`u=\mathrm e^{i\varphi_u}\quad\text{where}\quad\varphi_u\quad\text{is real}`}</Eq>
          <Tx>{R`对比：厄米算符的本征值在实轴上，幺正算符的本征值在单位圆上——$U=\mathrm e^{iA}$ 正是把实轴"卷"到单位圆上。

**不同本征值的本征矢正交。**取两个本征矢，在标积中间插入 $U^\dagger U=\mathbb 1$，$U$ 向右作用给出 $u'$，$U^\dagger$ 向左作用给出 $u^*$：`}</Tx>
          <Eq n="CII-26" say="两个本征矢的标积等于它乘以相位差因子 $\mathrm e^{i(\varphi_{u'}-\varphi_u)}$：相位不同时标积只能为零。">{R`\begin{aligned}\braket{\psi_u|\psi_{u'}}&=\braket{\psi_u|U^\dagger U|\psi_{u'}}=u^*u'\braket{\psi_u|\psi_{u'}}\\&=\mathrm e^{i(\varphi_{u'}-\varphi_u)}\braket{\psi_u|\psi_{u'}}\end{aligned}`}</Eq>
          <Tx>{R`$u\ne u'$ 时相位因子不等于 1，标积只能为零。（这里用了 $\bra{\psi_u}U^\dagger=u^*\bra{\psi_u}$，它由 $U^\dagger=U^{-1}$ 推出：$U\ket{\psi_u}=u\ket{\psi_u}\Rightarrow U^\dagger\ket{\psi_u}=u^{-1}\ket{\psi_u}=u^*\ket{\psi_u}$。）`}</Tx>
        </Sub>
      </Sub>

      <Sub n="CII-2" title="Unitary transformations of operators" zh="算符的幺正变换">
        <Tx>{R`**从变矢量到变算符。**§1-b 中 $U$ 把基 $\{\ket{v_i}\}$ 转成 $\{\ket{\tilde v_i}\}$。设想整个物理装置也一起"转过去"：转动后的算符 $\tilde A$ 在新基里的样子，应当和原来的 $A$ 在旧基里一模一样。把这句话当作定义：`}</Tx>
        <Eq n="CII-27" say="变换后的算符在新基中的矩阵元，与原算符在旧基中的矩阵元逐一相等。">{R`\braket{\tilde v_i|\tilde A|\tilde v_j}=\braket{v_i|A|v_j}`}</Eq>
        <Tx>{R`用 \eqref{CII-8} 把新基矢换成 $U\ket{v_j}$：`}</Tx>
        <Eq n="CII-28" say="把新基矢写成 $U$ 作用于旧基矢，左边变成 $U^\dagger\tilde AU$ 在旧基中的矩阵元。">{R`\braket{v_i|U^\dagger\tilde AU|v_j}=\braket{v_i|A|v_j}`}</Eq>
        <Tx>{R`对所有 $i,j$ 成立，所以两个算符相等：`}</Tx>
        <Eq n="CII-29" say="两个算符在一组基中的全部矩阵元相等，因此算符相等。">{R`U^\dagger\tilde AU=A`}</Eq>
        <Tx>{R`左乘 $U$、右乘 $U^\dagger$：`}</Tx>
        <Eq n="CII-30" keyEq title="算符的幺正变换" say="算符的幺正变换：两边各夹一个 $U$ 和 $U^\dagger$，$\tilde A$ 就是“随系统一起转过去”的 $A$。">{R`\tilde A=UAU^\dagger`}</Eq>
        <Tx>{R`这可以作为幺正变换算符的定义。补充材料 $\mathrm F_{\rm II}$ 中宇称变换 $\Pi B\Pi$ 就是第一个例子。

**本征问题怎样跟着变？**设`}</Tx>
        <Eq n="CII-31" say="$\varphi_a$ 是 $A$ 的本征矢，本征值为 $a$。">{R`A\ket{\varphi_a}=a\ket{\varphi_a}`}</Eq>
        <Tx>{R`令 $\ket{\tilde\varphi_a}=U\ket{\varphi_a}$。直接算，$U^\dagger U$ 在中间消掉：`}</Tx>
        <Eq n="CII-32" keyEq title="幺正变换不改变本征值" say="转过去的本征矢是转过去的算符的本征矢，本征值完全不变。">{R`\begin{aligned}\tilde A\ket{\tilde\varphi_a}&=(UAU^\dagger)U\ket{\varphi_a}=UA(U^\dagger U)\ket{\varphi_a}\\&=UA\ket{\varphi_a}=aU\ket{\varphi_a}\\&=a\ket{\tilde\varphi_a}\end{aligned}`}</Eq>
        <Tx>{R`结论：**谱不变，本征矢跟着转。**这和直觉相符——把整套装置连同态一起转动，测量结果的可能值当然不变。

**变换与代数运算可交换。**① 伴随：`}</Tx>
        <Eq n="CII-33" say="变换后取伴随，等于先取伴随再变换；所以厄米算符变换后仍厄米。">{R`(\tilde A)^\dagger=(UAU^\dagger)^\dagger=UA^\dagger U^\dagger=\widetilde{A^\dagger}`}</Eq>
        <Tx>{R`于是 $A$ 厄米 $\Rightarrow$ $\tilde A$ 厄米：幺正变换把可观测量变成可观测量。② 乘方：$(\tilde A)^2=UAU^\dagger UAU^\dagger=UAAU^\dagger=\widetilde{A^2}$，一般地`}</Tx>
        <Eq n="CII-34" say="变换后的 $n$ 次幂等于 $n$ 次幂的变换：中间的 $U^\dagger U$ 都两两消掉。">{R`(\tilde A)^n=\widetilde{A^n}`}</Eq>
        <Tx>{R`③ 由幂级数定义 \eqref{BII-23}，对任意算符函数`}</Tx>
        <Eq n="CII-35" say="先求函数再变换，与先变换再求函数结果相同。">{R`\widetilde{F(A)}=F(\tilde A)`}</Eq>
        <Tx>{R`其中 $\widetilde{F(A)}$ 表示 $UF(A)U^\dagger$。乘积也一样：$\widetilde{AB}=\tilde A\tilde B$——幺正变换保持全部算符代数，所以 $[X,P]=i\hbar$ 这样的关系在变换后仍然成立。`}</Tx>
      </Sub>

      <Sub n="CII-3" title="The infinitesimal unitary operator" zh="无穷小幺正算符">
        <Tx>{R`**动机。**连续对称（平移、转动、时间演化）都由一族依赖连续参数的幺正算符描写。离恒等元无穷近的那一个，决定了整族的性质；它由什么刻画？

设 $U(\varepsilon)$ 幺正，$\varepsilon$ 为无穷小实数，$\varepsilon\to0$ 时 $U\to\mathbb 1$。按 $\varepsilon$ 展开到一阶：`}</Tx>
        <Eq n="CII-36" say="无穷小幺正算符在恒等算符附近的一阶展开，$G$ 是一阶系数。">{R`U(\varepsilon)=\mathbb 1+\varepsilon\,G+...`}</Eq>
        <Tx>{R`$\varepsilon$ 是实数，取伴随只作用在 $G$ 上：`}</Tx>
        <Eq n="CII-37" say="伴随算符的一阶展开：$\varepsilon$ 为实数，伴随只落在 $G$ 上。">{R`U^\dagger(\varepsilon)=\mathbb 1+\varepsilon\,G^\dagger+......`}</Eq>
        <Tx>{R`代入幺正条件，零阶项自动满足，一阶项给出约束：`}</Tx>
        <Eq n="CII-38" say="把两个展开式相乘：零阶为单位算符，一阶项为 $\varepsilon(G+G^\dagger)$。">{R`U(\varepsilon)\,U^\dagger(\varepsilon)=U^\dagger(\varepsilon)U(\varepsilon)=\mathbb 1+\varepsilon(G+G^\dagger)+...`}</Eq>
        <Tx>{R`幺正要求一阶项为零：`}</Tx>
        <Eq n="CII-39" say="幺正性的一阶条件：$G$ 与其伴随之和为零，即 $G$ 是反厄米的。">{R`G+G^\dagger=0`}</Eq>
        <Tx>{R`$G$ 反厄米。反厄米算符乘 $i$ 就是厄米的，习惯上令`}</Tx>
        <Eq n="CII-40" say="定义 $F=iG$，把反厄米的 $G$ 换成厄米的 $F$。">{R`F=iG`}</Eq>
        <Tx>{R`则`}</Tx>
        <Eq n="CII-41" say="$F$ 与其伴随相等：$F$ 是厄米算符。">{R`F-F^\dagger=0`}</Eq>
        <Tx>{R`于是无穷小幺正算符总可以写成`}</Tx>
        <Eq n="CII-42" keyEq title="无穷小幺正算符" say="离恒等算符无穷近的幺正算符，由一个厄米算符 $F$（“生成元”）完全确定。">{R`U(\varepsilon)=\mathbb 1-i\varepsilon F`}</Eq>
        <Tx>{R`$F$ 叫做这族变换的**生成元**。把 $\varepsilon$ 换成有限的 $\lambda=N\varepsilon$ 并连续作用 $N$ 次，$N\to\infty$ 就得到 $\mathrm e^{-i\lambda F}$——与 ① 中"厄米算符的指数是幺正的"首尾呼应。补充材料 $\mathrm E_{\rm II}$ 会看到：平移的生成元是 $P/\hbar$。

**算符怎样变化。**把 \eqref{CII-42} 代入 \eqref{CII-30}，用 $F^\dagger=F$：`}</Tx>
        <Eq n="CII-43" say="把无穷小幺正算符代入算符的幺正变换，$F^\dagger$ 换成 $F$。">{R`\tilde A=(\mathbb 1-i\varepsilon F)A(\mathbb 1+i\varepsilon F^\dagger)=(\mathbb 1-i\varepsilon F)A(\mathbb 1+i\varepsilon F)`}</Eq>
        <Tx>{R`展开保留到 $\varepsilon$ 的一阶：$A+i\varepsilon AF-i\varepsilon FA$，即`}</Tx>
        <Eq n="CII-44" keyEq title="算符的无穷小变化" say="在无穷小幺正变换下，算符的一阶变化正比于它与生成元的对易子；与生成元对易的算符不变。">{R`\tilde A-A=-i\varepsilon[F,A]`}</Eq>
        <Box kind="physics" title="对称性与守恒量的伏笔">{R`\eqref{CII-44} 说：**算符在变换下不变 $\iff$ 它与生成元对易**。若哈密顿量在平移下不变，就有 $[P,H]=0$；第 III 章会看到这意味着动量守恒。对称性、与生成元对易、守恒量，这条链从这里开始。`}</Box>
      </Sub>
    </Sec>);
}
