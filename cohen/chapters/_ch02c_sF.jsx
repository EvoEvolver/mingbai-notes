// 补充材料 F_II：宇称算符 —— 式 (FII-1)–(FII-43)（含 8a、8b）
import { Sec, Sub, Tx, Eq, Box, Derivation, C, Table } from "@kit";
import "./_ch02c_kit.jsx";
import { Fig } from "./_ch02c_kit.jsx";
import { ParityDemo } from "./_ch02c_plots.jsx";

const R = String.raw;

export function SecF() {
  return (
    <Sec n="FII" title="The parity operator" zh="宇称算符"
      gist={R`宇称 $\Pi\ket{\mathbf r}=\ket{-\mathbf r}$ 把波函数 $\psi(\mathbf r)$ 变成 $\psi(-\mathbf r)$。它满足 $\Pi^2=\mathbb 1$，既厄米又幺正，本征值只有 $\pm1$；任何态都能唯一地拆成偶部与奇部。与 $\Pi$ 对易的算符叫偶算符、反对易的叫奇算符（$\mathbf R$、$\mathbf P$ 是奇的）；由此得到选择定则。哈密顿量为偶时，可以只在偶态或奇态中找本征态。`}
      why={R`宇称是最简单的分立对称，也是第 II 章全部概念（本征子空间、投影算符、可观测量、幺正变换、对易与公共本征矢）的一个完整小练习；它在原子物理（选择定则）和一维问题（对称势阱只需解一半）中都极其有用。`}
      gives={["FII-1", "FII-6", "FII-8a", "FII-12", "FII-15", "FII-19", "FII-28", "FII-29", "FII-32", "FII-33", "FII-43"]}>
      <p className="muted">本节概念：<C id="parity" /></p>

      <Sub n="FII-1" title="The parity operator" zh="宇称算符">
        <Sub n="FII-1-a" title="Definition" zh="定义：关于原点的反射">
          <Tx>{R`**物理图像先行。**把一个系统关于坐标原点做"点反射"：每个点 $\mathbf r$ 搬到 $-\mathbf r$。在 $\mathcal E_{\mathbf r}$ 里实现这一操作的线性算符就是宇称 $\Pi$。最省事的定义方式是规定它对基矢的作用：`}</Tx>
          <Eq n="FII-1" keyEq title="宇称算符" say="宇称算符把位于 $r$ 的位置本征矢变成位于 −$r$ 的位置本征矢。">{R`\Pi\ket{\mathbf r}=\ket{-\mathbf r}`}</Eq>
          <Box kind="warning" title={R`$\ket{-\mathbf r_0}$ 与 $-\ket{\mathbf r_0}$ 不是一回事`}>{R`$\ket{-\mathbf r_0}$ 是 $\mathbf R$ 的本征矢，本征值 $-\mathbf r_0$，波函数 $\delta(\mathbf r+\mathbf r_0)$——粒子在**另一个位置**。$-\ket{\mathbf r_0}$ 仍是本征值 $\mathbf r_0$ 的本征矢，波函数 $-\delta(\mathbf r-\mathbf r_0)$——同一个位置，只差一个整体负号（物理上是同一个态）。`}</Box>
          <Tx>{R`于是它在 $\{\ket{\mathbf r}\}$ 表象中的矩阵元是`}</Tx>
          <Eq n="FII-2" say="宇称的矩阵元只在 $\mathbf r=-\mathbf r'$ 时不为零：它把每个点与它的对径点联系起来。">{R`\braket{\mathbf r|\Pi|\mathbf r'}=\braket{\mathbf r|-\mathbf r'}=\delta(\mathbf r+\mathbf r')`}</Eq>
          <Tx>{R`**它对波函数做了什么？**把任意态在位置基上展开：`}</Tx>
          <Eq n="FII-3" say="任意态按位置本征矢展开，系数是波函数 $\psi(\mathbf r)$。">{R`\ket\psi=\int\dd^3r\,\psi(\mathbf r)\ket{\mathbf r}`}</Eq>
          <Tx>{R`积分变量随便叫什么都行；换元 $\mathbf r'=-\mathbf r$（积分区域是全空间，不变）：`}</Tx>
          <Eq n="FII-4" say="换元 $\mathbf r'=-\mathbf r$ 后同一个态的另一种写法。">{R`\ket\psi=\int\dd^3r'\,\psi(-\mathbf r')\ket{-\mathbf r'}`}</Eq>
          <Tx>{R`这一步看似多余，好处是基矢里已经带着负号。现在让 $\Pi$ 作用在 \eqref{FII-4} 上，每个 $\ket{-\mathbf r'}$ 被翻回 $\ket{\mathbf r'}$，系数原封不动：`}</Tx>
          <Eq n="FII-5" say="$\Pi$ 作用后的态：系数变成 $\psi(-\mathbf r')$，基矢变回 $\ket{\mathbf r'}$。">{R`\Pi\ket\psi=\int\dd^3r'\,\psi(-\mathbf r')\ket{\mathbf r'}`}</Eq>
          <Tx>{R`与 \eqref{FII-3} 对比，读出新波函数：`}</Tx>
          <Eq n="FII-6" keyEq title="宇称对波函数的作用" say="宇称在位置表象中的作用：新波函数在 $r$ 处的值等于旧波函数在 −$r$ 处的值。">{R`\braket{\mathbf r|\Pi|\psi}=\psi(-\mathbf r)`}</Eq>
          <Tx>{R`若系统 $\mathscr S$ 的态是 $\ket\psi$，那么 $\Pi\ket\psi$ 描写的是把 $\mathscr S$ 关于原点反射后得到的系统。`}</Tx>
        </Sub>

        <Sub n="FII-1-b" title="Simple properties of Π" zh={R`$\Pi$ 的简单性质`}>
          <Tx>{R`**做两次等于没做。**`}</Tx>
          <Eq n="FII-7" say="宇称作用两次，位置本征矢回到原处。">{R`\Pi^2\ket{\mathbf r}=\Pi(\Pi\ket{\mathbf r})=\Pi\ket{-\mathbf r}=\ket{\mathbf r}`}</Eq>
          <Tx>{R`对一组基成立，所以作为算符`}</Tx>
          <Eq n="FII-8a" keyEq title={R`$\Pi^2=\mathbb 1$`} say="宇称算符的平方是单位算符。">{R`\Pi^2=\mathbb 1`}</Eq>
          <Tx>{R`或者说它是自己的逆：`}</Tx>
          <Eq n="FII-8b" say="宇称算符等于它自己的逆。">{R`\Pi=\Pi^{-1}`}</Eq>
          <Tx>{R`归纳可知：$n$ 为偶数时 $\Pi^n=\mathbb 1$，$n$ 为奇数时 $\Pi^n=\Pi$。

**厄米性。**把 \eqref{FII-6} 改写成"左矢"形式：`}</Tx>
          <Eq n="FII-9" say="把宇称作用的结果写成标积：在 $\mathbf r$ 处读 $\Pi\ket\psi$，等于在 $-\mathbf r$ 处读 $\ket\psi$。">{R`\braket{\mathbf r|\Pi|\psi}=\braket{-\mathbf r|\psi}`}</Eq>
          <Tx>{R`对一切 $\ket\psi$ 成立，所以作为左矢的等式：`}</Tx>
          <Eq n="FII-10" say="位置左矢右乘宇称，得到对径点的位置左矢。">{R`\bra{\mathbf r}\Pi=\bra{-\mathbf r}`}</Eq>
          <Tx>{R`另一方面，直接对定义 \eqref{FII-1} 取伴随：`}</Tx>
          <Eq n="FII-11" say="对定义式取伴随：位置左矢右乘 $\Pi^\dagger$，同样得到对径点的左矢。">{R`\bra{\mathbf r}\Pi^\dagger=\bra{-\mathbf r}`}</Eq>
          <Tx>{R`$\Pi$ 与 $\Pi^\dagger$ 在一组完备的左矢上作用相同，所以`}</Tx>
          <Eq n="FII-12" keyEq title="宇称是厄米的" say="宇称算符是厄米的。">{R`\Pi^\dagger=\Pi`}</Eq>
          <Tx>{R`再与 \eqref{FII-8b} 合起来：`}</Tx>
          <Eq n="FII-13" say="宇称算符的逆等于它的伴随：它同时也是幺正的。">{R`\Pi^{-1}=\Pi^\dagger`}</Eq>
          <Tx>{R`**$\Pi$ 既厄米又幺正**——这在算符里很少见。两个性质加在一起正等价于 $\Pi^2=\mathbb 1$：厄米保证本征值是实数，幺正保证本征值模为 1，交集只剩 $\pm1$。`}</Tx>
        </Sub>

        <Sub n="FII-1-c" title="Eigensubspaces of Π" zh={R`$\Pi$ 的本征子空间：偶与奇`}>
          <Tx>{R`**本征值。**设 $\Pi\ket{\varphi_\pi}=p_\pi\ket{\varphi_\pi}$，用 \eqref{FII-8a}：`}</Tx>
          <Eq n="FII-14" say="宇称的本征值平方等于 1：本征矢经过两次宇称回到自身。">{R`\ket{\varphi_\pi}=\Pi^2\ket{\varphi_\pi}=p_\pi^2\ket{\varphi_\pi}`}</Eq>
          <Tx>{R`$p_\pi^2=1$，本征值只能是 $+1$（称为**偶**）或 $-1$（称为**奇**）。$\mathcal E_{\mathbf r}$ 是无穷维的，两个本征值必然都高度（无穷）简并。

**构造两个投影算符。**$\Pi^2=\mathbb 1$ 这种"平方等于一"的算符，总可以用 $\frac12(\mathbb 1\pm\Pi)$ 把空间劈成两半：`}</Tx>
          <Eq n="FII-15" keyEq title="偶、奇投影算符" say="偶投影算符取“原函数加反射”的一半，奇投影算符取“原函数减反射”的一半。">{R`\begin{aligned}P_+&=\frac12(\mathbb 1+\Pi)\\P_-&=\frac12(\mathbb 1-\Pi)\end{aligned}`}</Eq>
          <Tx>{R`它们厄米（$\Pi$ 厄米），并且是投影算符——平方等于自身（展开用 $\Pi^2=\mathbb 1$：$\frac14(\mathbb 1\pm2\Pi+\mathbb 1)=\frac12(\mathbb 1\pm\Pi)$）：`}</Tx>
          <Eq n="FII-16" say="两个算符都等于自己的平方：它们是投影算符。">{R`\begin{aligned}P_+^2&=P_+\\P_-^2&=P_-\end{aligned}`}</Eq>
          <Tx>{R`记它们投影到的子空间为 $\mathcal E_+$、$\mathcal E_-$。**互相正交：**`}</Tx>
          <Eq n="FII-17" say="偶投影与奇投影的乘积为零：两个子空间互相正交。">{R`\begin{aligned}P_+P_-&=\frac14(\mathbb 1+\Pi-\Pi-\Pi^2)=0\\P_-P_+&=\frac14(\mathbb 1-\Pi+\Pi-\Pi^2)=0\end{aligned}`}</Eq>
          <Tx>{R`**合起来是全部：**`}</Tx>
          <Eq n="FII-18" say="偶投影与奇投影之和为单位算符：两个子空间合起来就是整个空间。">{R`P_++P_-=\mathbb 1`}</Eq>
          <Tx>{R`于是每个态都能分解，`}</Tx>
          <Eq n="FII-19" keyEq title="偶奇分解" say="任何态都能唯一地写成一个偶部与一个奇部之和。">{R`\ket\psi=(P_++P_-)\ket\psi=\ket{\psi_+}+\ket{\psi_-}`}</Eq>
          <Tx>{R`其中`}</Tx>
          <Eq n="FII-20" say="偶部与奇部分别是态在两个子空间上的投影。">{R`\begin{aligned}\ket{\psi_+}&=P_+\ket\psi\\\ket{\psi_-}&=P_-\ket\psi\end{aligned}`}</Eq>
          <Tx>{R`**它们确实是 $\Pi$ 的本征矢。**先看 $\Pi$ 乘以投影算符：`}</Tx>
          <Eq n="FII-21" say="$\Pi$ 作用在偶投影上不变，作用在奇投影上变号。">{R`\begin{aligned}\Pi P_+&=\frac12\Pi(\mathbb 1+\Pi)=\frac12(\Pi+\mathbb 1)=P_+\\\Pi P_-&=\frac12\Pi(\mathbb 1-\Pi)=\frac12(\Pi-\mathbb 1)=-P_-\end{aligned}`}</Eq>
          <Tx>{R`作用到 $\ket\psi$ 上：`}</Tx>
          <Eq n="FII-22" say="偶部是宇称本征值 +1 的本征矢，奇部是本征值 −1 的本征矢。">{R`\begin{aligned}\Pi\ket{\psi_+}&=\Pi P_+\ket\psi=P_+\ket\psi=\ket{\psi_+}\\\Pi\ket{\psi_-}&=\Pi P_-\ket\psi=-P_-\ket\psi=-\ket{\psi_-}\end{aligned}`}</Eq>
          <Tx>{R`所以 $\mathcal E_\pm$ 就是 $\Pi$ 的本征值 $\pm1$ 的本征子空间。翻译成波函数（用 \eqref{FII-6}）：`}</Tx>
          <Eq n="FII-23" say="偶部的波函数是偶函数，奇部的波函数是奇函数。">{R`\begin{aligned}\braket{\mathbf r|\psi_+}&=\psi_+(\mathbf r)=\braket{\mathbf r|\Pi|\psi_+}=\psi_+(-\mathbf r)\\\braket{\mathbf r|\psi_-}&=\psi_-(\mathbf r)=-\braket{\mathbf r|\Pi|\psi_-}=-\psi_-(-\mathbf r)\end{aligned}`}</Eq>
          <Tx>{R`具体公式就是熟悉的 $\psi_\pm(\mathbf r)=\frac12[\psi(\mathbf r)\pm\psi(-\mathbf r)]$。每个态都能分解成 $\Pi$ 的本征矢之和，所以 **$\Pi$ 是一个可观测量**。`}</Tx>
          <Fig n="F-1" caption={R`交互（自绘）：偶奇分解 \eqref{FII-19}。任选一个实函数 $\psi(x)$（黑），程序按 $\psi_\pm=\frac12[\psi(x)\pm\psi(-x)]$ 算出偶部（蓝）与奇部（红）。读数验证：$\braket{\psi_+|\psi_-}=0$（正交）、$\|\psi_+\|^2+\|\psi_-\|^2=\|\psi\|^2$（勾股）、$\langle\Pi\rangle=(\|\psi_+\|^2-\|\psi_-\|^2)/\|\psi\|^2$；并检验选择定则：$\langle\psi_\pm|X|\psi_\pm\rangle=0$，$\langle X\rangle$ 全部来自偶奇交叉项。`}><ParityDemo /></Fig>
        </Sub>
      </Sub>

      <Sub n="FII-2" title="Even and odd operators" zh="偶算符与奇算符">
        <Sub n="FII-2-a" title="Definitions" zh="定义">
          <Tx>{R`态有奇偶，算符也有。$\Pi$ 幺正，可以按 \eqref{CII-30} 对任意算符 $B$ 做宇称变换（$\Pi^\dagger=\Pi$）：`}</Tx>
          <Eq n="FII-24" say="算符 $B$ 的宇称变换：两边各乘一个 $\Pi$。">{R`\tilde B=\Pi B\Pi`}</Eq>
          <Tx>{R`按 \eqref{CII-27}，它的矩阵元就是"在对径点上读 $B$"：`}</Tx>
          <Eq n="FII-25" say="宇称变换后的算符在 $\mathbf r$、$\mathbf r'$ 之间的矩阵元，等于原算符在 $-\mathbf r$、$-\mathbf r'$ 之间的矩阵元。">{R`\braket{\mathbf r|\tilde B|\mathbf r'}=\braket{-\mathbf r|B|-\mathbf r'}`}</Eq>
          <Tx>{R`若 $\tilde B=+B$，称 $B$ 为**偶**算符；若 $\tilde B=-B$，称为**奇**算符。偶算符 $B_+$ 满足`}</Tx>
          <Eq n="FII-26" say="偶算符在宇称变换下不变。">{R`B_+=\Pi B_+\Pi`}</Eq>
          <Tx>{R`左乘 $\Pi$，用 $\Pi^2=\mathbb 1$：`}</Tx>
          <Eq n="FII-27" say="偶算符与宇称可以交换次序。">{R`\Pi B_+=B_+\Pi`}</Eq>
          <Eq n="FII-28" keyEq title={R`偶算符 = 与 $\Pi$ 对易`} say="偶算符就是与宇称对易的算符。">{R`[\Pi,B_+]=0`}</Eq>
          <Tx>{R`同理，奇算符与 $\Pi$ **反对易**：`}</Tx>
          <Eq n="FII-29" keyEq title={R`奇算符 = 与 $\Pi$ 反对易`} say="奇算符与宇称反对易：交换次序时变号。">{R`\Pi B_-+B_-\Pi=0`}</Eq>
          <Box kind="warning" title="大多数算符既不偶也不奇">{R`和函数一样，一般算符没有确定的宇称。不过任何算符都能拆成偶部和奇部：$B=\frac12(B+\Pi B\Pi)+\frac12(B-\Pi B\Pi)$。例如 $X+X^2$ 的偶部是 $X^2$，奇部是 $X$。`}</Box>
        </Sub>

        <Sub n="FII-2-b" title="Selection rules" zh="选择定则">
          <Tx>{R`**问题：**哪些矩阵元一定为零？窍门是在矩阵元里插入 $\Pi^2=\mathbb 1$——或者说，用偶算符的定义把 $B_+$ 换成 $\Pi B_+\Pi$，让两个 $\Pi$ 分别作用到左右两个态上：`}</Tx>
          <Eq n="FII-30" say="偶算符的矩阵元等于两个态都做宇称变换之后的矩阵元。">{R`\braket{\varphi|B_+|\psi}=\braket{\varphi|\Pi B_+\Pi|\psi}=\braket{\varphi'|B_+|\psi'}`}</Eq>
          <Tx>{R`其中`}</Tx>
          <Eq n="FII-31" say="两个态经宇称变换后的像。">{R`\begin{aligned}\ket{\varphi'}&=\Pi\ket\varphi\\\ket{\psi'}&=\Pi\ket\psi\end{aligned}`}</Eq>
          <Tx>{R`若一个态偶、另一个态奇（$\ket{\varphi'}=\pm\ket\varphi$，$\ket{\psi'}=\mp\ket\psi$），右边多出一个负号：`}</Tx>
          <Eq n="FII-32" keyEq title="偶算符的选择定则" say="偶算符在宇称相反的两个态之间的矩阵元为零：一个数等于它的相反数，只能是零。">{R`\braket{\varphi|B_+|\psi}=-\braket{\varphi|B_+|\psi}=0`}</Eq>
          <Tx>{R`**偶算符不连接宇称相反的态。**对奇算符，\eqref{FII-30} 右边自带一个负号：`}</Tx>
          <Eq n="FII-33" keyEq title="奇算符的选择定则" say="奇算符的矩阵元等于宇称变换后矩阵元的相反数：两个态宇称相同时它必为零。">{R`\braket{\varphi|B_-|\psi}=-\braket{\varphi'|B_-|\psi'}`}</Eq>
          <Tx>{R`两个态宇称相同时右边就是 $-\braket{\varphi|B_-|\psi}$，于是为零：**奇算符只连接宇称相反的态。**特别地，有确定宇称的态中，奇算符的平均值 $\braket{\psi|B_-|\psi}$ 为零。`}</Tx>
          <Box kind="physics" title="原子的电偶极跃迁">{R`电偶极算符 $q\mathbf R$ 是奇的（见下面 §2-c）。原子的能级有确定宇称时，电偶极跃迁只能在宇称**相反**的能级之间发生——这就是光谱学里 Laporte 选择定则的来源；也因此，宇称确定的定态没有永久电偶极矩。`}</Box>
        </Sub>

        <Sub n="FII-2-c" title="Examples" zh="例子">
          <Tx>{R`**$\alpha$．$X,Y,Z$ 是奇的。**在基矢上检验 \eqref{FII-29}。$X$ 先作用拉出 $x$，再反射：`}</Tx>
          <Eq n="FII-34" say="先用 $X$ 再用 $\Pi$：拉出 $x$，然后基矢反射到 $-\mathbf r$。">{R`\begin{aligned}\Pi X\ket{\mathbf r}&=\Pi X\ket{x,y,z}=x\Pi\ket{x,y,z}\\&=x\ket{-x,-y,-z}=x\ket{-\mathbf r}\end{aligned}`}</Eq>
          <Tx>{R`先反射再用 $X$，拉出的是反射后的坐标 $-x$：`}</Tx>
          <Eq n="FII-35" say="先用 $\Pi$ 再用 $X$：基矢先反射到 $-\mathbf r$，$X$ 拉出的本征值是 $-x$。">{R`\begin{aligned}X\Pi\ket{\mathbf r}&=X\ket{-\mathbf r}=X\ket{-x,-y,-z}\\&=-x\ket{-x,-y,-z}=-x\ket{-\mathbf r}\end{aligned}`}</Eq>
          <Tx>{R`相加：`}</Tx>
          <Eq n="FII-36" say="两种次序之和作用在任意位置基矢上为零。">{R`(\Pi X+X\Pi)\ket{\mathbf r}=0`}</Eq>
          <Tx>{R`对一组基成立，所以`}</Tx>
          <Eq n="FII-37" say="位置算符 $X$ 与宇称反对易：$X$ 是奇算符。">{R`\Pi X+X\Pi=0`}</Eq>
          <Tx>{R`$Y$、$Z$ 同理：$\mathbf R$ 是奇算符。

**$\beta$．$P_x,P_y,P_z$ 也是奇的。**先看宇称对动量本征矢的作用。把 $\ket{\mathbf p}$ 写成位置基矢的叠加，$\Pi$ 作用在每个 $\ket{\mathbf r}$ 上，再换元 $\mathbf r'=-\mathbf r$：`}</Tx>
          <Eq n="FII-38" say="宇称把动量本征矢 $\ket{\mathbf p}$ 变成 $\ket{-\mathbf p}$：反射后粒子朝相反方向运动。">{R`\begin{aligned}\Pi\ket{\mathbf p}&=(2\pi\hbar)^{-3/2}\int\dd^3r\,\mathrm e^{i\mathbf p\cdot\mathbf r/\hbar}\Pi\ket{\mathbf r}\\&=(2\pi\hbar)^{-3/2}\int\dd^3r\,\mathrm e^{i\mathbf p\cdot\mathbf r/\hbar}\ket{-\mathbf r}\\&=(2\pi\hbar)^{-3/2}\int\dd^3r'\,\mathrm e^{-i\mathbf p\cdot\mathbf r'/\hbar}\ket{\mathbf r'}\\&=\ket{-\mathbf p}\end{aligned}`}</Eq>
          <Tx>{R`于是和 $\alpha$ 一模一样：`}</Tx>
          <Eq n="FII-39" say="两种次序作用在动量本征矢上，结果只差一个符号。">{R`\begin{aligned}\Pi P_x\ket{\mathbf p}&=p_x\ket{-\mathbf p}\\P_x\Pi\ket{\mathbf p}&=-p_x\ket{-\mathbf p}\end{aligned}`}</Eq>
          <Tx>{R`相加为零：`}</Tx>
          <Eq n="FII-40" say="动量算符与宇称反对易：$P$ 也是奇算符。">{R`\Pi P_x+P_x\Pi=0`}</Eq>
          <Tx>{R`**$\gamma$．$\Pi$ 本身是偶的**——它当然与自己对易。`}</Tx>
          <Table head={[R`算符`, R`宇称`, R`理由`]} rows={[
            [R`$\mathbf R$、$\mathbf P$`, R`奇`, R`\eqref{FII-37}、\eqref{FII-40}`],
            [R`$\mathbf R^2$、$\mathbf P^2$、$\mathbf L=\mathbf R\times\mathbf P$`, R`偶`, R`两个奇算符之积（下面 §2-d）`],
            [R`$\Pi$`, R`偶`, R`与自身对易`],
            [R`$V(\mathbf R)$`, R`$V(\mathbf r)$ 偶则偶、奇则奇`, R`§2-d`],
          ]} caption={R`常见算符的宇称（角动量 $\mathbf L$ 为偶算符，这是它与 $\mathbf R$、$\mathbf P$ 的重要区别）。`} />
        </Sub>

        <Sub n="FII-2-d" title="Functions of operators" zh="算符函数的宇称">
          <Tx>{R`偶算符的幂：在每个因子之间插入 $\Pi^2=\mathbb 1$，每对 $\Pi\cdots\Pi$ 把一个 $B_+$ 变回自己：`}</Tx>
          <Eq n="FII-41" say="偶算符的 $n$ 次幂仍是偶算符：每个因子单独做宇称变换都不变。">{R`\Pi B_+^n\Pi=\underbrace{(\Pi B_+\Pi)(\Pi B_+\Pi)\,...\,(\Pi B_+\Pi)}_{n\ \text{factors}}=B_+^n`}</Eq>
          <Tx>{R`所以偶算符的任何函数 $F(B_+)$ 都是偶的。奇算符的幂则每个因子贡献一个负号：`}</Tx>
          <Eq n="FII-42" say="奇算符的 $n$ 次幂做宇称变换得到 $(-1)^n$ 倍：偶次幂为偶算符，奇次幂为奇算符。">{R`\Pi B_-^n\Pi=\underbrace{(\Pi B_-\Pi)(\Pi B_-\Pi)\,...\,(\Pi B_-\Pi)}_{n\ \text{factors}}=(-1)^n(B_-)^n`}</Eq>
          <Tx>{R`于是 $F(B_-)$ 的宇称跟着函数 $F(z)$ 走：$F$ 偶则偶，$F$ 奇则奇，一般没有确定宇称。例如 $V(\mathbf R)$ 的宇称就是函数 $V(\mathbf r)$ 的宇称。`}</Tx>
        </Sub>
      </Sub>

      <Sub n="FII-3" title="Eigenstates of an even observable B+" zh={R`偶可观测量 $B_+$ 的本征态`}>
        <Tx>{R`偶可观测量 $B_+$ 与 $\Pi$ 对易，于是可以直接调用正文关于对易可观测量的定理（\IIsec{D-3-a}）。设 $B_+\ket{\varphi_b}=b\ket{\varphi_b}$：

**α．$b$ 不简并。**$\Pi\ket{\varphi_b}$ 也是 $B_+$ 本征值 $b$ 的本征矢（$B_+\Pi\ket{\varphi_b}=\Pi B_+\ket{\varphi_b}=b\Pi\ket{\varphi_b}$），不简并意味着它与 $\ket{\varphi_b}$ 成比例：$\ket{\varphi_b}$ 必是 $\Pi$ 的本征矢，非偶即奇。由选择定则，其中任何奇可观测量（$\mathbf R$、$\mathbf P$……）的平均值为零。

**β．$b$ 简并（本征子空间 $\mathcal E_b$）。**$\mathcal E_b$ 中的矢量不一定有确定宇称：$\Pi\ket{\varphi_b}$ 可以与 $\ket{\varphi_b}$ 不共线，但它仍在 $\mathcal E_b$ 中。总可以在每个 $\mathcal E_b$ 里选出 $\Pi$ 与 $B_+$ 的公共本征基——也就是说，总能**选**一组宇称确定的本征矢，只是不一定**必须**这样选。`}</Tx>
      </Sub>

      <Sub n="FII-4" title="Application to an important special case" zh="应用：偶势中的哈密顿量">
        <Tx>{R`最常见的情形是`}</Tx>
        <Eq n="FII-43" keyEq title="偶势中的哈密顿量" say="一维或三维中粒子的哈密顿量：动能项总是偶的；只要势能是偶函数，整个哈密顿量就是偶算符。">{R`H=\frac{\mathbf P^2}{2m}+V(\mathbf R)`}</Eq>
        <Tx>{R`$\mathbf P$ 奇，$\mathbf P^2$ 偶；若 $V(\mathbf r)=V(-\mathbf r)$，$V(\mathbf R)$ 也偶，$H$ 就是偶算符。按 §3，可以**只在偶态和奇态中分别寻找**本征态——在一维问题里，这意味着只需在 $x>0$ 上解方程，再用 $\varphi'(0)=0$（偶）或 $\varphi(0)=0$（奇）作边界条件，计算量减半。方势阱、无限深势阱（\Ic{HI}）都是例子；以后的谐振子、氢原子也是。

**一个反向推论。**若 $H$ 为偶，而你找到一个**没有**确定宇称的本征态 $\ket{\varphi}$（$\Pi\ket\varphi$ 与 $\ket\varphi$ 不共线），那么 $\Pi\ket\varphi$ 是同一本征值的另一个独立本征矢——该能级必然简并。一维束缚态不简并，所以偶势中的一维束缚态一定有确定宇称。`}</Tx>
        <Box kind="aside" title="宇称守恒与破缺">{R`宇称变换下的不变性曾被认为是一切物理定律的性质。1956 年李政道、杨振宁指出弱相互作用中宇称可能不守恒，次年吴健雄的 $^{60}\mathrm{Co}$ $\beta$ 衰变实验证实了这一点。电磁相互作用保持宇称，所以原子物理中 \eqref{FII-32}、\eqref{FII-33} 的选择定则依然成立（只受弱相互作用造成的极小修正）。`}</Box>
      </Sub>
    </Sec>);
}
