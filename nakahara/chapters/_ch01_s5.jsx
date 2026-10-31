// §1.5 费米粒子的路径积分量子化 —— 式 (1.166)–(1.206)，命题 1.3，引理 1.3–1.4，习题 1.6–1.10
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Derivation, Exercise, C } from "@kit";
import { GrassmannLab } from "./_ch01_demos.jsx";

const R = String.raw;

export function Sec15() {
  return (
    <Sec n="1.5" title="Path integral quantization of a Fermi particle" zh="费米粒子的路径积分量子化"
      gist={R`费米子的算符满足**反**对易关系，其经典对应是反对易的 **Grassmann 数**（$\theta^2=0$）。Grassmann 积分就是求导（Berezin 积分），换元时测度乘 $\det a$ 而不是除；Gauss 积分给出 $\det M$（不是 $(\det M)^{-1/2}$），实反对称型给出 Pfaffian，并推出 $\det a=\operatorname{Pf}(a)^2$。用相干态写出费米振子的配分函数：迹对应**反周期**路径，$Z=2\cosh(\beta\omega/2)$，并"证明"了 $\cosh$ 的无穷乘积。`}
      why={R`自然界的物质粒子（电子、夸克）是费米子；Dirac 场（§1.7）、反常（第 13 章）与指标定理（第 12 章）中的 $\det$ 都来自 Grassmann 积分。费米子行列式在分子上、玻色子行列式在分母上——这一对比是超对称与指标定理"玻色–费米相消"的根源。`}
      gives={["1.167", "1.168", "1.169", "1.179", "1.181", "1.187", "1.189", "1.197", "1.199", "1.201", "1.205"]}>
      <Tx>{R`自然界中观测到的粒子不一定是玻色粒子（其位置与动量算符满足对易关系 $[p,x]=-\mathrm{i}$）。还有一类称为**费米子**（fermion）的粒子，其算符满足**反对易**关系。费米子的经典描述需要反对易的数，称为 **Grassmann 数**（Grassmann numbers）。`}</Tx>

      <Sub n="1.5.1" title="Fermionic harmonic oscillator" zh="费米谐振子">
        <p className="muted">本小节概念：<C id="fermion_det" /></p>
        <Tx>{R`上一节的玻色谐振子由 Hamilton 量 $H=\tfrac12(a^\dagger a+aa^\dagger)$ 描述（从现在起，除非引起混淆，算符上的 $\hat{}$ 一律省略），其中 $a$、$a^\dagger$ 满足对易关系 $[a,a^\dagger]=1$、$[a,a]=[a^\dagger,a^\dagger]=0$。Hamilton 量的本征值为 $(n+1/2)\omega$（$n\in\mathbb{N}$），本征矢 $|n\rangle$：$H|n\rangle=(n+\tfrac12)\omega|n\rangle$。（这里 $H$ 按 \eqref{1.74} 应理解为乘了 $\omega$。）

现在设有 Hamilton 量`}</Tx>
        <Eq n="1.166" say={R`费米谐振子的 Hamilton 量：与玻色振子形式相同，只是两项之间是减号（反对称化）。`}>{R`H=\tfrac12(c^\dagger c-cc^\dagger)\omega.`}</Eq>
        <Tx>{R`它称为**费米谐振子**（fermionic harmonic oscillator），可以看作描述相对论性费米子的 Dirac Hamilton 量的一个 Fourier 分量。如果算符 $c$、$c^\dagger$ 满足与玻色子相同的对易关系，Hamilton 量就是常数 $H=-\omega/2$。反之，设它们满足**反**对易关系`}</Tx>
        <Eq n="1.167" title="正则反对易关系" say={R`费米子的正则反对易关系：$c$ 与 $c^\dagger$ 的反对易子为 1，$c^2=(c^\dagger)^2=0$。`}>{R`\{c,c^\dagger\}\equiv cc^\dagger+c^\dagger c=1\qquad\{c,c\}=\{c^\dagger,c^\dagger\}=0.`}</Eq>
        <Tx>{R`Hamilton 量变成`}</Tx>
        <Eq n="1.168" title="费米振子的能量" say={R`费米振子的能量 = (粒子数 $-\tfrac12$)$\times\omega$：零点能是 $-\tfrac12\omega$，与玻色振子符号相反。`}>{R`H=\tfrac12[c^\dagger c-(1-c^\dagger c)]\omega=(N-\tfrac12)\omega`}</Eq>
        <Tx>{R`其中 $N=c^\dagger c$。容易看出 $N$ 的本征值只能是 0 或 1：$N^2=c^\dagger cc^\dagger c=c^\dagger(1-c^\dagger c)c=N$（因为 $(c^\dagger)^2=0$），即 $N(N-1)=0$。这正是 **Pauli 原理**。

研究 $H$ 的 Hilbert 空间。设 $|n\rangle$ 是 $N$ 的本征值为 $n$（$n=0,1$）的本征矢。容易验证

$$H|0\rangle=-\frac\omega2|0\rangle\qquad H|1\rangle=\frac\omega2|1\rangle,$$
$$c^\dagger|0\rangle=|1\rangle\qquad c|0\rangle=0\qquad c^\dagger|1\rangle=0\qquad c|1\rangle=|0\rangle.$$

引入分量表示很方便：

$$|0\rangle=\begin{pmatrix}0\\1\end{pmatrix}\qquad|1\rangle=\begin{pmatrix}1\\0\end{pmatrix}.$$`}</Tx>
        <Exercise n="1.6" title="费米振子的矩阵表示" level="★"
          hint={R`矩阵的第 $j$ 列是算符作用在第 $j$ 个基矢上的结果；本题的基顺序是 $(|1\rangle,|0\rangle)$。`}
          solution={R`按约定 $|1\rangle=(1,0)^{\rm t}$、$|0\rangle=(0,1)^{\rm t}$。

$c$：$c|1\rangle=|0\rangle=(0,1)^{\rm t}$（第一列），$c|0\rangle=0$（第二列），故 $c=\begin{pmatrix}0&0\\1&0\end{pmatrix}$。

$c^\dagger$：$c^\dagger|1\rangle=0$，$c^\dagger|0\rangle=|1\rangle=(1,0)^{\rm t}$，故 $c^\dagger=\begin{pmatrix}0&1\\0&0\end{pmatrix}$（确为 $c$ 的转置共轭）。

$N=c^\dagger c=\begin{pmatrix}0&1\\0&0\end{pmatrix}\begin{pmatrix}0&0\\1&0\end{pmatrix}=\begin{pmatrix}1&0\\0&0\end{pmatrix}$，$H=(N-\tfrac12)\omega=\dfrac\omega2\begin{pmatrix}1&0\\0&-1\end{pmatrix}$。

检验：$cc^\dagger=\begin{pmatrix}0&0\\0&1\end{pmatrix}$，$\{c,c^\dagger\}=I$；$c^2=0$。这就是 Pauli 矩阵的组合：$c=\sigma_-$，$c^\dagger=\sigma_+$，$H=\tfrac\omega2\sigma_3$。`}>
          {R`设基矢取上述形式。证明算符的矩阵表示为

$$c=\begin{pmatrix}0&0\\1&0\end{pmatrix},\qquad c^\dagger=\begin{pmatrix}0&1\\0&0\end{pmatrix},\qquad N=\begin{pmatrix}1&0\\0&0\end{pmatrix},\qquad H=\frac\omega2\begin{pmatrix}1&0\\0&-1\end{pmatrix}.$$`}
        </Exercise>
        <Tx>{R`**经典对应。**在玻色子的路径积分表述中，对易关系 $[x,p]=\mathrm{i}$ 被换成了 $[x,p]=0$（路径积分里的 $x(t)$ 是普通数）。对费米子，反对易关系 $\{c,c^\dagger\}=1$ 应当换成 $\{\theta,\theta^*\}=0$，其中 $\theta$、$\theta^*$ 是反对易的"经典"数，称为 Grassmann 数。`}</Tx>
      </Sub>

      <Sub n="1.5.2" title="Calculus of Grassmann numbers" zh="Grassmann 数的运算">
        <p className="muted">本小节概念：<C id="grassmann" /></p>
        <Tx>{R`为了区分反对易的 Grassmann 数与对易的实数、复数，后者称为 **c 数**（c 表示 commuting）。设 $n$ 个生成元 $\{\theta_1,\ldots,\theta_n\}$ 满足反对易关系`}</Tx>
        <Eq n="1.169" title="Grassmann 生成元" say={R`Grassmann 生成元两两反对易；特别地每个生成元的平方为零。`}>{R`\{\theta_i,\theta_j\}=0\qquad\forall i,j.`}</Eq>
        <Tx>{R`以 c 数为系数的 $\{\theta_i\}$ 的线性组合称为 **Grassmann 数**，由 $\{\theta_i\}$ 生成的代数称为 **Grassmann 代数**，记作 $\Lambda^n$。$\Lambda^n$ 的任意元素 $f$ 展开为`}</Tx>
        <Eq n="1.170" say={R`Grassmann 代数的一般元素：按生成元的单项式展开，最多到 $n$ 次，系数对指标反对称。`}>{R`\begin{aligned}f(\theta)&=f_0+\sum_{i=1}^nf_i\theta_i+\sum_{i<j}f_{ij}\theta_i\theta_j+\cdots\\&=\sum_{0\le k\le n}\frac{1}{k!}\sum_{\{i\}}f_{i_1,\ldots,i_k}\theta_{i_1}\ldots\theta_{i_k},\end{aligned}`}</Eq>
        <Tx>{R`其中 $f_0,f_i,f_{ij},\ldots$ 与 $f_{i_1,\ldots,i_k}$ 是 c 数，对任意两个指标的交换反对称。$f$ 也写成`}</Tx>
        <Eq n="1.171" say={R`同一个展开的另一种写法：每个生成元的幂次只能是 0 或 1。`}>{R`f(\theta)=\sum_{k_i=0,1}\tilde f_{k_1,\ldots,k_n}\theta_1^{k_1}\ldots\theta_n^{k_n}.`}</Eq>
        <Tx>{R`例如 $n=2$：

$$f(\theta)=f_0+f_1\theta_1+f_2\theta_2+f_{12}\theta_1\theta_2=\tilde f_{00}+\tilde f_{10}\theta_1+\tilde f_{01}\theta_2+\tilde f_{11}\theta_1\theta_2.$$

由 $\theta_k$ 的偶（奇）次单项式生成的子空间记作 $\Lambda^n_+$（$\Lambda^n_-$）：`}</Tx>
        <Eq n="1.172" say={R`Grassmann 代数分解为偶部与奇部的直和（$\mathbb{Z}_2$ 分次）。`}>{R`\Lambda^n=\Lambda^n_+\oplus\Lambda^n_-.`}</Eq>
        <Tx>{R`$\Lambda^n$ 的这种分解称为 **$\mathbb{Z}_2$ 分次**（$\mathbb{Z}_2$-grading）；$\Lambda^n_+$（$\Lambda^n_-$）的元素称为 G 偶（G 奇）。注意 $\dim\Lambda^n=2^n$，而 $\dim\Lambda^n_+=\dim\Lambda^n_-=2^{n-1}$。

生成元 $\theta_k$ 没有"大小"，所以 Grassmann 数的集合不是有序集。零是唯一一个既是 c 数又是 Grassmann 数的数。Grassmann 数与 c 数对易。生成元显然满足`}</Tx>
        <Eq n="1.173" say={R`生成元的乘法规则：平方为零；$n$ 个生成元的乘积只差一个置换符号；多于 $n$ 个生成元的乘积必为零。`}>{R`\begin{aligned}&\theta_k^2=0\\&\theta_{k_1}\theta_{k_2}\ldots\theta_{k_n}=\varepsilon_{k_1k_2\ldots k_n}\theta_1\theta_2\ldots\theta_n\\&\theta_{k_1}\theta_{k_2}\ldots\theta_{k_m}=0\qquad(m>n),\end{aligned}`}</Eq>
        <Tx>{R`其中 $\varepsilon_{k_1\ldots k_n}$ 当 $\{k_1\ldots k_n\}$ 是 $\{1\ldots n\}$ 的偶置换时为 $+1$，奇置换时为 $-1$，否则为 $0$。

Grassmann 数的函数由其 Taylor 展开定义。例如 $n=1$ 时 $\mathrm{e}^\theta=1+\theta$，因为 $\theta$ 的高次项恒为零。`}</Tx>
        <Box kind="physics" title="Grassmann 代数 = 外代数">{R`$\Lambda^n$ 就是 $n$ 维向量空间上的**外代数**：把 $\theta_i$ 看成 $\dd x^i$，乘法就是楔积 $\wedge$。第 5 章的微分形式 $\dd x^i\wedge\dd x^j=-\dd x^j\wedge\dd x^i$ 正是同一个结构，而下面的"积分换元乘 $\det a$"与 $\dd x^1\wedge\cdots\wedge\dd x^n$ 在线性变换下乘 $\det$ 也是同一件事（只是方向相反）。`}</Box>
      </Sub>

      <Sub n="1.5.3" title="Differentiation" zh="求导">
        <Tx>{R`约定求导算符从**左边**作用于函数：`}</Tx>
        <Eq n="1.174" say={R`对 Grassmann 变量的左导数：$\partial/\partial\theta_i$ 作用于 $\theta_j$ 给出 $\delta_{ij}$。`}>{R`\frac{\partial\theta_j}{\partial\theta_i}=\frac{\partial}{\partial\theta_i}\theta_j=\delta_{ij}.`}</Eq>
        <Tx>{R`还约定求导算符与 $\theta_k$ **反对易**。于是 Leibniz 法则取如下形式：`}</Tx>
        <Eq n="1.175" say={R`Grassmann 版的 Leibniz 法则：求导越过一个奇元素时要多一个负号。`}>{R`\frac{\partial}{\partial\theta_i}(\theta_j\theta_k)=\frac{\partial\theta_j}{\partial\theta_i}\theta_k-\theta_j\frac{\partial\theta_k}{\partial\theta_i}=\delta_{ij}\theta_k-\delta_{ik}\theta_j.`}</Eq>
        <Exercise n="1.7" title="导数反对易" level="★"
          hint={R`只需对单项式验证。若单项式不同时含 $\theta_i$ 与 $\theta_j$，两边都为零；否则把 $\theta_i$、$\theta_j$ 移到最左边。`}
          solution={R`两边都是线性的，只需对单项式 $m$ 验证。$i=j$ 时就是 \eqref{1.177}：$\partial_i$ 作用一次后结果中不再含 $\theta_i$，再作用得零，所以 $2\partial_i^2=0$。

设 $i\neq j$。若 $m$ 不含 $\theta_i$ 或不含 $\theta_j$，$\partial_i\partial_jm$ 与 $\partial_j\partial_im$ 都为零。否则（每次移动只产生一个整体符号，左右两边相同）可以写 $m=\pm\theta_i\theta_jm'$，$m'$ 既不含 $\theta_i$ 也不含 $\theta_j$。则

$$\partial_j(\theta_i\theta_jm')=-\theta_i\partial_j(\theta_jm')=-\theta_im',\qquad\partial_i\partial_j(\theta_i\theta_jm')=-m',$$
$$\partial_i(\theta_i\theta_jm')=\theta_jm',\qquad\partial_j\partial_i(\theta_i\theta_jm')=m'.$$

相加为零，即 $\partial_i\partial_j+\partial_j\partial_i=0$。`}>
          <Tx>{R`证明`}</Tx>
          <Eq n="1.176" say={R`对不同 Grassmann 变量的偏导数互相反对易。`}>{R`\frac{\partial}{\partial\theta_i}\frac{\partial}{\partial\theta_j}+\frac{\partial}{\partial\theta_j}\frac{\partial}{\partial\theta_i}=0.`}</Eq>
        </Exercise>
        <Tx>{R`由这个习题容易证明求导算符是**幂零**的（nilpotent）：`}</Tx>
        <Eq n="1.177" say={R`对同一个 Grassmann 变量求两次导数恒为零。`}>{R`\frac{\partial^2}{\partial\theta_i^2}=0.`}</Eq>
        <Exercise n="1.8" title="导数与生成元的反对易子" level="★"
          hint={R`把 $\tfrac{\partial}{\partial\theta_i}\theta_j$ 理解为作用在任意函数 $f$ 上的算符：$\tfrac{\partial}{\partial\theta_i}(\theta_jf)$，用 Leibniz 法则 \eqref{1.175} 的推广。`}
          solution={R`对任意 $f$，由（推广的）Leibniz 法则——求导越过奇元素 $\theta_j$ 时变号：

$$\frac{\partial}{\partial\theta_i}(\theta_jf)=\frac{\partial\theta_j}{\partial\theta_i}f-\theta_j\frac{\partial f}{\partial\theta_i}=\delta_{ij}f-\theta_j\frac{\partial f}{\partial\theta_i}.$$

移项得 $\left(\dfrac{\partial}{\partial\theta_i}\theta_j+\theta_j\dfrac{\partial}{\partial\theta_i}\right)f=\delta_{ij}f$，对所有 $f$ 成立，即 \eqref{1.178}。

（这与费米算符的 $\{c,c^\dagger\}=1$ 形式完全相同：$\theta_j$ 与 $\partial/\partial\theta_j$ 构成 Grassmann 代数上 $c^\dagger$、$c$ 的一个表示，正如 \eqref{1.48} 中 $x$ 与 $-\mathrm{i}\,\dd/\dd x$ 给出 $[x,p]=\mathrm{i}$。）`}>
          <Tx>{R`证明`}</Tx>
          <Eq n="1.178" say={R`求导算符与生成元的反对易子是 $\delta_{ij}$——费米子正则反对易关系的经典版本。`}>{R`\frac{\partial}{\partial\theta_i}\theta_j+\theta_j\frac{\partial}{\partial\theta_i}=\delta_{ij}.`}</Eq>
        </Exercise>
      </Sub>

      <Sub n="1.5.4" title="Integration" zh="积分">
        <p className="muted">本小节概念：<C id="grassmann" /></p>
        <Tx>{R`说来令人惊讶：对 Grassmann 变量的**积分等价于求导**。令 $D$ 表示对 Grassmann 变量求导，$I$ 表示积分（理解为定积分），并要求它们满足

(1) $ID=0$；(2) $DI=0$；(3) $D(A)=0\Rightarrow I(BA)=I(B)A$，

其中 $A$、$B$ 是 Grassmann 变量的任意函数。第一条说：导数的积分只给出边界项，而边界项被设为零。第二条说：定积分的导数为零。第三条说：若 $D(A)=0$，$A$ 就是常数，可以提到积分外面。取 $I\propto D$ 就满足这些关系（$D^2=0$ 给出 (1)(2)）。这里采用归一化 $I=D$，令`}</Tx>
        <Eq n="1.179" title="Berezin 积分" say={R`Grassmann 积分就是求导：$\int\dd\theta\,1=0$，$\int\dd\theta\,\theta=1$。`}>{R`\int\dd\theta\,f(\theta)=\frac{\partial f(\theta)}{\partial\theta}.`}</Eq>
        <Tx>{R`由这个定义得

$$\int\dd\theta=\frac{\partial1}{\partial\theta}=0\qquad\int\dd\theta\,\theta=\frac{\partial\theta}{\partial\theta}=1.$$

有 $n$ 个生成元 $\{\theta_k\}$ 时，\eqref{1.179} 推广为`}</Tx>
        <Eq n="1.180" say={R`多变量 Grassmann 积分：依次求导，最右边的 $\dd\theta_n$ 对应最先作用的 $\partial/\partial\theta_n$。`}>{R`\int\dd\theta_1\dd\theta_2\ldots\dd\theta_n\,f(\theta_1,\theta_2,\ldots,\theta_n)=\frac{\partial}{\partial\theta_1}\frac{\partial}{\partial\theta_2}\cdots\frac{\partial}{\partial\theta_n}f(\theta_1,\theta_2,\ldots,\theta_n).`}</Eq>
        <Tx>{R`注意 $\dd\theta_k$ 与 $\partial/\partial\theta_k$ 的顺序。例如 $\int\dd\theta_1\dd\theta_2\,\theta_2\theta_1=\partial_1\partial_2(\theta_2\theta_1)=\partial_1\theta_1=1$，而 $\int\dd\theta_1\dd\theta_2\,\theta_1\theta_2=-1$。

**换元。**积分与求导的等价导致积分在变量替换下的"怪异"行为。先看 $n=1$。在替换 $\theta'=a\theta$（$a\in\mathbb{C}$）下，

$$\int\dd\theta\,f(\theta)=\frac{\partial f(\theta)}{\partial\theta}=\frac{\partial f(\theta'/a)}{\partial\theta'/a}=a\int\dd\theta'\,f(\theta'/a),$$

所以 $\dd\theta'=(1/a)\dd\theta$——与普通积分 $\dd x'=a\,\dd x$ **恰好相反**。这很容易推广到 $n$ 个变量。令 $\theta_i\to\theta'_i=a_{ij}\theta_j$，则

$$\begin{aligned}\int\dd\theta_1\ldots\dd\theta_n\,f(\theta)&=\frac{\partial}{\partial\theta_1}\cdots\frac{\partial}{\partial\theta_n}f(\theta)=\sum_{k_i=1}^n\frac{\partial\theta'_{k_1}}{\partial\theta_1}\cdots\frac{\partial\theta'_{k_n}}{\partial\theta_n}\frac{\partial}{\partial\theta'_{k_1}}\cdots\frac{\partial}{\partial\theta'_{k_n}}f(a^{-1}\theta')\\&=\sum_{k_i=1}^n\varepsilon_{k_1\ldots k_n}a_{k_11}\ldots a_{k_nn}\frac{\partial}{\partial\theta'_1}\cdots\frac{\partial}{\partial\theta'_n}f(a^{-1}\theta')=\det a\int\dd\theta'_1\ldots\dd\theta'_nf(a^{-1}\theta').\end{aligned}$$

（第二行用了 \eqref{1.176}：把 $\partial/\partial\theta'_{k_1}\cdots\partial/\partial\theta'_{k_n}$ 排成标准顺序时产生置换符号 $\varepsilon$，重复指标的项为零。）因此积分测度的变换为`}</Tx>
        <Eq n="1.181" title="Grassmann 测度的换元" say={R`Grassmann 测度在线性换元下乘 $\det a$——与普通积分的 Jacobi 行列式恰好互为倒数。`}>{R`\dd\theta_1\dd\theta_2\ldots\dd\theta_n=\det a\,\dd\theta'_1\dd\theta'_2\ldots\dd\theta'_n.`}</Eq>
      </Sub>

      <Sub n="1.5.5" title="Delta-function" zh="δ 函数">
        <Tx>{R`单个 Grassmann 变量的 $\delta$ 函数由下式引入：`}</Tx>
        <Eq n="1.182" say={R`Grassmann $\delta$ 函数的定义：与任意函数相乘再积分，取出函数在 $\alpha$ 处的值。`}>{R`\int\dd\theta\,\delta(\theta-\alpha)f(\theta)=f(\alpha)`}</Eq>
        <Tx>{R`把展开式 $f(\theta)=a+b\theta$ 代入定义，得

$$\int\dd\theta\,\delta(\theta-\alpha)(a+b\theta)=a+b\alpha,$$

由此得到 $\delta$ 函数的显式形式`}</Tx>
        <Eq n="1.183" say={R`Grassmann $\delta$ 函数就是 $\theta-\alpha$ 本身：一个线性函数。`}>{R`\delta(\theta-\alpha)=\theta-\alpha.`}</Eq>
        <Derivation title={R`验证 $\int\dd\theta\,(\theta-\alpha)(a+b\theta)=a+b\alpha$（$\alpha$ 为 Grassmann 数，$a,b$ 为 c 数）`} collapsed steps={[
          { tex: R`(\theta-\alpha)(a+b\theta)=a\theta+b\theta^2-a\alpha-b\alpha\theta=a\theta-a\alpha-b\alpha\theta`, why: R`$\theta^2=0$。` },
          { tex: R`\int\dd\theta\,a\theta=a,\qquad\int\dd\theta\,a\alpha=0,\qquad\int\dd\theta\,(-b\alpha\theta)=b\alpha\int\dd\theta\,\theta=b\alpha`, why: R`$\partial_\theta(\alpha\theta)=-\alpha$：求导越过奇元素 $\alpha$ 变号；所以 $-b\,\partial_\theta(\alpha\theta)=b\alpha$。` },
        ]} result={R`$a+b\alpha=f(\alpha)$ ✓`} />
        <Tx>{R`推广到 $n$ 个变量容易验证为（注意变量的顺序）`}</Tx>
        <Eq n="1.184" say={R`多变量的 Grassmann $\delta$ 函数：各分量 $\theta_k-\alpha_k$ 的乘积，按与测度相反的顺序排列。`}>{R`\delta^n(\theta-\alpha)=(\theta_n-\alpha_n)\ldots(\theta_2-\alpha_2)(\theta_1-\alpha_1).`}</Eq>
        <Tx>{R`$\delta$ 函数的积分形式由

$$\int\dd\xi\,\mathrm{e}^{\mathrm{i}\xi\theta}=\int\dd\xi\,(1+\mathrm{i}\xi\theta)=\mathrm{i}\theta$$

得到：`}</Tx>
        <Eq n="1.185" say={R`Grassmann $\delta$ 函数的 Fourier 表示：与普通 $\delta$ 函数的 $\int\dd k\,\mathrm{e}^{\mathrm{i}kx}/2\pi$ 相对应。`}>{R`\delta(\theta)=\theta=-\mathrm{i}\int\dd\xi\,\mathrm{e}^{\mathrm{i}\xi\theta}.`}</Eq>
      </Sub>

      <Sub n="1.5.6" title="Gaussian integral" zh="Gauss 积分">
        <p className="muted">本小节概念：<C id="grassmann" /> · <C id="fermion_det" /></p>
        <Tx>{R`考虑积分`}</Tx>
        <Eq n="1.186" say={R`Grassmann 的 Gauss 积分：两组独立的 Grassmann 变量 $\theta$、$\theta^*$，二次型由 c 数矩阵 $M$ 给出。`}>{R`I=\int\dd\theta_1^*\dd\theta_1\ldots\dd\theta_n^*\dd\theta_n\,\mathrm{e}^{-\sum_{ij}\theta_i^*M_{ij}\theta_j}`}</Eq>
        <Tx>{R`其中 $\{\theta_i\}$ 与 $\{\theta_i^*\}$ 是两组独立的 Grassmann 变量，$n\times n$ 的 c 数矩阵 $M$ 是任意的（原书说"取为反对称，因为 $\theta_i$ 与 $\theta_i^*$ 反对易"；实际上 $\theta^*$ 与 $\theta$ 是独立变量，$M$ 不需要任何对称性——下面的交互图用随机矩阵验证了这一点）。用换元 $\theta'_i=\sum_jM_{ij}\theta_j$ 计算：由 \eqref{1.181}，$\dd\theta_1\ldots\dd\theta_n=\det M\,\dd\theta'_1\ldots\dd\theta'_n$，`}</Tx>
        <Eq n="1.187" keyEq title="Grassmann Gauss 积分 = det" say={R`Grassmann Gauss 积分等于矩阵的行列式本身——与普通 Gauss 积分给出 $(\det)^{-1}$ 恰好相反。`}>{R`\begin{aligned}I&=\det M\int\dd\theta_1^*\dd\theta_1'\ldots\dd\theta_n^*\dd\theta_n'\,\mathrm{e}^{-\sum_i\theta_i^*\theta_i'}\\&=\det M\left[\int\dd\theta^*\dd\theta\,(1+\theta'\theta^*)\right]^n\\&=\det M.\end{aligned}`}</Eq>
        <Tx>{R`（第二行：$\mathrm{e}^{-\theta^*\theta'}=1-\theta^*\theta'=1+\theta'\theta^*$，各对 $(\theta_i^*,\theta_i')$ 是偶元素，积分因子化；$\int\dd\theta^*\dd\theta'\,\theta'\theta^*=\partial_{\theta^*}\partial_{\theta'}(\theta'\theta^*)=\partial_{\theta^*}\theta^*=1$。）

作为 Gauss 积分的一个应用，我们证明一个有趣的公式。`}</Tx>
        <Stmt id="P1.3">
          <Eq n="1.188" title="Pfaffian" say={R`Pfaffian：反对称矩阵元素的"一半行列式"——把 $2n$ 个指标两两配对，带置换符号求和。`}>{R`\operatorname{Pf}(a)=\frac{1}{2^nn!}\sum_{\substack{\text{Permutations of}\\\{i_1,\ldots,i_{2n}\}}}\operatorname{sgn}(P)a_{i_1i_2}\ldots a_{i_{2n-1}i_{2n}}.`}</Eq>
          <Eq n="1.189" keyEq title={R`$\det=\operatorname{Pf}^2$`} say={R`反对称矩阵的行列式是其 Pfaffian 的平方——用两份 Grassmann 积分相乘再换元即可证明。`}>{R`\det a=\operatorname{Pf}(a)^2.`}</Eq>
          <Proof steps={[
            { claim: R`观察到`, tex: R`I=\int\dd\theta_{2n}\ldots\dd\theta_1\exp\left[\frac12\sum_{ij}\theta_ia_{ij}\theta_j\right]=\frac{1}{2^nn!}\int\dd\theta_{2n}\ldots\dd\theta_1\left(\sum_{ij}\theta_ia_{ij}\theta_j\right)^n=\operatorname{Pf}(a).`, why: R`指数展开中只有恰含全部 $2n$ 个生成元的第 $n$ 项对积分有贡献；$\int\dd\theta_{2n}\ldots\dd\theta_1\,\theta_{i_1}\ldots\theta_{i_{2n}}=\varepsilon_{i_1\ldots i_{2n}}$（由 \eqref{1.173} 与 \eqref{1.180}）。` },
            { claim: R`再注意`, tex: R`I^2=\int\dd\theta_{2n}\ldots\dd\theta_1\dd\theta'_{2n}\ldots\dd\theta'_1\exp\left[\frac12\sum_{ij}(\theta_ia_{ij}\theta_j+\theta'_ia_{ij}\theta'_j)\right].`, why: R`两个相同的积分，变量换个名字；被积函数都是偶元素，可以合并。` },
            { claim: R`作换元 $\eta_k=\tfrac{1}{\sqrt2}(\theta_k+\mathrm{i}\theta'_k)$，$\eta_k^*=\tfrac{1}{\sqrt2}(\theta_k-\mathrm{i}\theta'_k)$。对反对称的 $a$，`, tex: R`\frac12\sum_{ij}a_{ij}(\theta_i\theta_j+\theta'_i\theta'_j)=\frac12\sum_{ij}a_{ij}(\eta_i\eta_j^*-\eta_j^*\eta_i)=\sum_{ij}\eta_i^*a_{ij}\eta_j,`, fill: true, why: R`展开 $\eta_i\eta_j^*=\tfrac12(\theta_i\theta_j+\theta'_i\theta'_j)+\tfrac{\mathrm{i}}2(\theta'_i\theta_j-\theta_i\theta'_j)$；与反对称的 $a_{ij}$ 缩并时交叉项相消（交换哑指标 $i\leftrightarrow j$ 可得 $\sum a_{ij}\theta'_i\theta_j=\sum a_{ij}\theta_i\theta'_j$）。最后一步：$\sum a_{ij}\eta_i\eta_j^*=-\sum a_{ij}\eta_j^*\eta_i=\sum a_{ji}\eta_j^*\eta_i$，再交换哑指标。原书写成 $\eta_k^*=(\theta_k-\theta'_k)/\sqrt2\mathrm{i}$，那样交叉项不相消、平方项变成 $\theta\theta-\theta'\theta'$；见下方勘误。` },
            { claim: R`换元的 Jacobi 因子与测度的重新排序只产生一个与 $a$ **无关**的常数 $c_n$（\eqref{1.181}），所以由 \eqref{1.187}：`, tex: R`\operatorname{Pf}(a)^2=I^2=c_n\int\dd\eta_1\dd\eta_1^*\ldots\dd\eta_{2n}\dd\eta_{2n}^*\exp\left[\sum_{ij}\eta_i^*a_{ij}\eta_j\right]=c_n'\det a.`, uses: ["1.181", "1.187"], fill: true, why: R`把 $a$ 换成 $-a$ 只在 $\det$ 上乘 $(-1)^{2n}=1$。` },
            { claim: R`定常数：取标准形 $a_0=\mathrm{diag}(J,\ldots,J)$，$J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$。由 \eqref{1.188} 直接得 $\operatorname{Pf}(a_0)=1$，而 $\det a_0=1$，所以 $c_n'=1$。`, fill: true, why: R`这样就避开了逐项追踪 Jacobi 因子与 $\mathrm{i}$ 的幂（原书声称 Jacobi 因子为 $(-1)^n$，测度重排给出 $(-1)^{n^2}$）。` },
          ]} />
        </Stmt>
        <Box kind="warning" title={R`勘误：命题 1.3 证明中的换元`}>{R`原书 p.64 取 $\eta_k=(\theta_k+\theta'_k)/\sqrt2$、$\eta_k^*=(\theta_k-\theta'_k)/\sqrt2\mathrm{i}$，并断言 $\theta_i\theta_j+\theta'_i\theta'_j=\eta_i\eta_j^*-\eta_j^*\eta_i$。直接展开可知右边等于 $-\mathrm{i}(\theta_i\theta_j-\theta'_i\theta'_j)+$（与反对称 $a$ 缩并后消失的交叉项），与左边不符。正确的换元是 $\eta_k=(\theta_k+\mathrm{i}\theta'_k)/\sqrt2$、$\eta_k^*=(\theta_k-\mathrm{i}\theta'_k)/\sqrt2$。本站在证明中改用它，并用"标准形定常数"的办法代替原书对 Jacobi 因子与符号的逐项追踪。结论 $\det a=\operatorname{Pf}(a)^2$ 不变，交互图 3 对随机整数矩阵逐个验证。`}</Box>
        <Exercise n="1.9" title="带源的 Grassmann Gauss 积分" level="★★"
          hint={R`配方：令 $\theta=\phi+$（常数 Grassmann 平移）消去线性项。Grassmann 平移不改变测度（$\int\dd\theta\,f(\theta+\alpha)=\int\dd\theta\,f(\theta)$，因为平移不改变最高次项的系数）。注意 $K_i$ 与 $\theta_j$ 反对易。`}
          solution={R`**(1)** 记 $Q(\theta)=-\theta^{\rm t}M\theta+K^{\rm t}\theta$（$M^{\rm t}=-M$ 为 c 数矩阵，$n$ 为偶数，$K_i$ 为奇元素）。作平移 $\theta=\phi+c$，$c=\alpha M^{-1}K$（$c_i$ 也是奇元素），$\alpha$ 待定。

*交叉项。*$\sum_{ij}c_iM_{ij}\phi_j=-\sum_{ij}\phi_jM_{ij}c_i=\sum_{ij}\phi_jM_{ji}c_i=\phi^{\rm t}Mc$（奇元素交换变号，再用 $M$ 反对称）。所以 $-\theta^{\rm t}M\theta=-\phi^{\rm t}M\phi-2\phi^{\rm t}Mc-c^{\rm t}Mc=-\phi^{\rm t}M\phi-2\alpha\,\phi^{\rm t}K-c^{\rm t}Mc$。

*线性项。*$K^{\rm t}\theta=K^{\rm t}\phi+K^{\rm t}c$，而 $K^{\rm t}\phi=\sum K_i\phi_i=-\phi^{\rm t}K$。$\phi$ 的线性项合计 $-(2\alpha+1)\phi^{\rm t}K$，取 $\alpha=-\tfrac12$ 即消去。

*常数项。*$c^{\rm t}K=\alpha\sum(M^{-1})_{ij}K_jK_i=-\alpha K^{\rm t}M^{-1}K$，所以 $c^{\rm t}Mc=\alpha\,c^{\rm t}K=-\alpha^2K^{\rm t}M^{-1}K$；$K^{\rm t}c=\alpha K^{\rm t}M^{-1}K$。常数项 $=-c^{\rm t}Mc+K^{\rm t}c=(\alpha^2+\alpha)K^{\rm t}M^{-1}K=-\tfrac14K^{\rm t}M^{-1}K$。

平移 $\theta\to\phi$ 不改变 Grassmann 测度（只影响低次项，积分只取最高次项的系数）。于是

$$\int\dd\theta_1\ldots\dd\theta_n\,\mathrm{e}^{Q}=\mathrm{e}^{-K^{\rm t}M^{-1}K/4}\int\dd\phi_1\ldots\dd\phi_n\,\mathrm{e}^{-\phi^{\rm t}M\phi}.$$

最后一个积分：$-\phi^{\rm t}M\phi=-\tfrac12\phi^{\rm t}(2M)\phi$，展开到第 $n/2$ 项，与命题 1.3 的证明同理（测度反序与 $(-1)^{n/2}$ 的两个符号相消）得 $\operatorname{Pf}(2M)=2^{n/2}\operatorname{Pf}(M)$。所以

$$\int\dd\theta_1\ldots\dd\theta_n\,\mathrm{e}^{-\theta^{\rm t}M\theta+K^{\rm t}\theta}=2^{n/2}\operatorname{Pf}(M)\,\mathrm{e}^{-K^{\rm t}M^{-1}K/4},$$

而 $\operatorname{Pf}(M)=\pm\sqrt{\det M}$（\eqref{1.189}）。例：$n=2$，$M=\begin{pmatrix}0&m\\-m&0\end{pmatrix}$：直接展开得 $\int\dd\theta_1\dd\theta_2\,\mathrm{e}^{-2m\theta_1\theta_2+K_1\theta_1+K_2\theta_2}=2m+K_1K_2$；右边 $2m\,\mathrm{e}^{-K^{\rm t}M^{-1}K/4}=2m\,\mathrm{e}^{K_1K_2/2m}=2m+K_1K_2$ ✓。

**(2)** 令 $\theta=\phi+M^{-1}K$，$\theta^\dagger=\phi^\dagger+K^\dagger M^{-1}$：

$$-\theta^\dagger M\theta+K^\dagger\theta+\theta^\dagger K=-\phi^\dagger M\phi+K^\dagger M^{-1}K,$$

（交叉项：$-\phi^\dagger K-K^\dagger\phi+K^\dagger\phi+\phi^\dagger K=0$；常数项：$-K^\dagger M^{-1}K+K^\dagger M^{-1}K+K^\dagger M^{-1}K$。）平移不改变测度，再用 \eqref{1.187} 得 $\det M\,\mathrm{e}^{K^\dagger M^{-1}K}$。这里 $M$ 只需可逆（"反 Hermite"并不需要）。$n=1$ 的直接核对：$\int\dd\theta^*\dd\theta\,\mathrm{e}^{-m\theta^*\theta+K^*\theta+\theta^*K}=m+K^*K=m\,\mathrm{e}^{K^*K/m}$ ✓。`}>
          <Tx>{R`(1) 设 $M$ 是反对称矩阵，$K_i$ 是 Grassmann 数。证明`}</Tx>
          <Eq n="1.190" say={R`带线性源的实 Grassmann Gauss 积分：Pfaffian 乘以源的二次型的指数（配方的结果）。`}>{R`\int\dd\theta_1\ldots\dd\theta_n\,\mathrm{e}^{-{}^{\rm t}\theta\cdot M\cdot\theta+{}^{\rm t}K\cdot\theta}=2^{n/2}\operatorname{Pf}(M)\,\mathrm{e}^{-{}^{\rm t}K\cdot M^{-1}\cdot K/4}.`}</Eq>
          <Tx>{R`(2) 设 $M$ 是反 Hermite 矩阵，$K_i$、$K_i^*$ 是 Grassmann 数。证明`}</Tx>
          <Eq n="1.191" title="带源的复 Grassmann Gauss 积分" say={R`带源的复 Grassmann Gauss 积分：$\det M$ 乘以 $\mathrm{e}^{K^\dagger M^{-1}K}$；费米子的生成泛函与传播子 $M^{-1}$ 就从这里来。`}>{R`\int\dd\theta_1^*\dd\theta_1\ldots\dd\theta_n^*\dd\theta_n\,\mathrm{e}^{-\theta^\dagger\cdot M\cdot\theta+K^\dagger\cdot\theta+\theta^\dagger\cdot K}=\det M\,\mathrm{e}^{K^\dagger\cdot M^{-1}\cdot K}.`}</Eq>
        </Exercise>
        <Box kind="warning" title={R`勘误：\eqref{1.190}`}>{R`原书 \eqref{1.190} 左边的指数印作 $-\tfrac12{}^{\rm t}\theta M\theta+{}^{\rm t}K\theta$，右边为 $2^{n/2}\sqrt{\det M}\,\mathrm{e}^{-{}^{\rm t}KM^{-1}K/4}$。两边不符：若保留 $\tfrac12$，正确结果是 $\operatorname{Pf}(M)\,\mathrm{e}^{-{}^{\rm t}KM^{-1}K/2}$（$n=2$ 时左边 $=m+K_1K_2$，而原书右边 $=2m+K_1K_2$）。去掉 $\tfrac12$（与 \eqref{1.191} 的写法一致）则原书右边正确。本站采用后者，并把 $\sqrt{\det M}$ 写成 $\operatorname{Pf}(M)$——$\sqrt{\det M}$ 只确定到符号，$\operatorname{Pf}(M)$ 才是积分的真正值。两种写法都已在交互图 3 中用显式 Grassmann 代数核对。`}</Box>
        <GrassmannLab />
      </Sub>

      <Sub n="1.5.7" title="Functional derivative" zh="泛函导数">
        <Tx>{R`对 Grassmann 变量的泛函导数可以仿照对易变量来定义。设 $\psi(t)$ 是依赖于 c 数参数 $t$ 的 Grassmann 变量，$F[\psi(t)]$ 是 $\psi$ 的泛函。定义`}</Tx>
        <Eq n="1.192" say={R`Grassmann 泛函导数：在 $s$ 处给 $\psi$ 一个 Grassmann 参数 $\varepsilon$ 的扰动，取出泛函变化中 $\varepsilon$ 的系数。`}>{R`\frac{\delta F[\psi(t)]}{\delta\psi(s)}=\frac1\varepsilon\{F[\psi(t)+\varepsilon\delta(t-s)]-F[\psi(t)]\},`}</Eq>
        <Tx>{R`其中 $\varepsilon$ 是 Grassmann 参数。$F[\psi(t)+\varepsilon\delta(t-s)]$ 对 $\varepsilon$ 的 Taylor 展开是 $\varepsilon$ 的线性函数，因为 $\varepsilon^2=0$；所以不需要取极限 $\varepsilon\to0$。提醒一句：一般而言除以 Grassmann 数没有定义。不过这里分子正比于 $\varepsilon$（约定把 $\varepsilon$ 移到最左边），"除以 $\varepsilon$" 只是取出分子中 $\varepsilon$ 的系数。`}</Tx>
      </Sub>

      <Sub n="1.5.8" title="Complex conjugation" zh="复共轭">
        <Tx>{R`设 $\{\theta_i\}$ 与 $\{\theta_i^*\}$ 是两组 Grassmann 数的生成元。定义 $\theta_i$ 的复共轭为 $(\theta_i)^*=\theta_i^*$，$(\theta_i^*)^*=\theta_i$，并定义`}</Tx>
        <Eq n="1.193" say={R`乘积的复共轭要颠倒次序（像矩阵的 Hermite 共轭一样）。`}>{R`(\theta_i\theta_j)^*=\theta_j^*\theta_i^*.`}</Eq>
        <Tx>{R`否则*实的* c 数 $\theta_i\theta_i^*$ 就不满足实性条件 $(\theta_i\theta_i^*)^*=\theta_i\theta_i^*$。（按 \eqref{1.193}，$(\theta_i\theta_i^*)^*=\theta_i^{**}\theta_i^*=\theta_i\theta_i^*$ ✓；若不颠倒次序，会得到 $\theta_i^*\theta_i=-\theta_i\theta_i^*$。）`}</Tx>
      </Sub>

      <Sub n="1.5.9" title="Coherent states and completeness relation" zh="相干态与完备性关系">
        <p className="muted">本小节概念：<C id="grassmann" /></p>
        <Tx>{R`费米子的湮灭、产生算符 $c$、$c^\dagger$ 满足反对易关系 $\{c,c\}=\{c^\dagger,c^\dagger\}=0$、$\{c,c^\dagger\}=1$，粒子数算符 $N=c^\dagger c$ 有本征矢 $|0\rangle$ 与 $|1\rangle$。考虑这两个矢量张成的 Hilbert 空间 $\mathcal{H}=\operatorname{Span}\{|0\rangle,|1\rangle\}$。$\mathcal{H}$ 中任意矢量 $|f\rangle$ 可写成 $|f\rangle=|0\rangle f_0+|1\rangle f_1$，$f_0,f_1\in\mathbb{C}$。

现在考虑态`}</Tx>
        <Eq n="1.194" title="费米相干态" say={R`费米子相干态：真空加上 Grassmann 数倍的单粒子态；它是湮灭算符 $c$ 的本征态，本征值为 Grassmann 数 $\theta$。`}>{R`|\theta\rangle=|0\rangle+|1\rangle\theta`}</Eq>
        <Eq n="1.195" say={R`相干态的左矢：用 $\theta^*$ 作系数。`}>{R`\langle\theta|=\langle0|+\theta^*\langle1|`}</Eq>
        <Tx>{R`其中 $\theta$、$\theta^*$ 是 Grassmann 数。这些态称为**相干态**（coherent states），分别是 $c$ 与 $c^\dagger$ 的本征态：

$$c|\theta\rangle=|0\rangle\theta=|\theta\rangle\theta,\qquad\langle\theta|c^\dagger=\theta^*\langle0|=\theta^*\langle\theta|.$$

（$c|\theta\rangle=c|1\rangle\theta=|0\rangle\theta$；而 $|\theta\rangle\theta=|0\rangle\theta+|1\rangle\theta^2=|0\rangle\theta$。）`}</Tx>
        <Exercise n="1.10" title="相干态的恒等式" level="★"
          hint={R`直接按 \eqref{1.194}–\eqref{1.195} 展开，用 $\langle m|n\rangle=\delta_{mn}$、$\theta^2=0$，以及 $c^\dagger|0\rangle=|1\rangle$、$c|1\rangle=|0\rangle$。约定 Grassmann 数与左矢、右矢对易。`}
          solution={R`(i) $\langle\theta'|\theta\rangle=(\langle0|+\theta'^*\langle1|)(|0\rangle+|1\rangle\theta)=\langle0|0\rangle+\theta'^*\langle1|1\rangle\theta=1+\theta'^*\theta=\mathrm{e}^{\theta'^*\theta}$（$(\theta'^*\theta)^2=0$）。

(ii) $\langle\theta|f\rangle=(\langle0|+\theta^*\langle1|)(|0\rangle f_0+|1\rangle f_1)=f_0+\theta^*f_1$。

(iii) $c^\dagger|f\rangle=c^\dagger|0\rangle f_0=|1\rangle f_0$，所以 $\langle\theta|c^\dagger|f\rangle=\langle\theta|1\rangle f_0=\theta^*f_0$；又 $\theta^*\langle\theta|f\rangle=\theta^*f_0+(\theta^*)^2f_1=\theta^*f_0$。

(iv) $c|f\rangle=c|1\rangle f_1=|0\rangle f_1$，所以 $\langle\theta|c|f\rangle=\langle\theta|0\rangle f_1=f_1$；而 $\dfrac{\partial}{\partial\theta^*}(f_0+\theta^*f_1)=f_1$。

所以在相干态表象中 $c^\dagger$ 作用为"乘以 $\theta^*$"，$c$ 作用为 $\partial/\partial\theta^*$——正是习题 1.8 中的表示，与玻色子的 $x\leftrightarrow\hat x$、$-\mathrm{i}\,\dd/\dd x\leftrightarrow\hat p$ 平行。`}>
          {R`验证下列恒等式：

$$\begin{aligned}\langle\theta'|\theta\rangle&=1+\theta'^*\theta=\mathrm{e}^{\theta'^*\theta},\\\langle\theta|f\rangle&=f_0+\theta^*f_1,\\\langle\theta|c^\dagger|f\rangle&=\langle\theta|1\rangle f_0=\theta^*f_0=\theta^*\langle\theta|f\rangle,\\\langle\theta|c|f\rangle&=\langle\theta|0\rangle f_1=\frac{\partial}{\partial\theta^*}\langle\theta|f\rangle.\end{aligned}$$`}
        </Exercise>
        <Tx>{R`设 $h(c,c^\dagger)=h_{00}+h_{10}c^\dagger+h_{01}c+h_{11}c^\dagger c$（$h_{ij}\in\mathbb{C}$）是 $c$、$c^\dagger$ 的任意函数（由于 $c^2=(c^\dagger)^2=0$，这就是最一般的形式）。$h$ 的矩阵元为

$$\langle0|h|0\rangle=h_{00}\qquad\langle0|h|1\rangle=h_{01}\qquad\langle1|h|0\rangle=h_{10}\qquad\langle1|h|1\rangle=h_{00}+h_{11}.$$

由这些矩阵元容易得到`}</Tx>
        <Eq n="1.196" title="相干态矩阵元" say={R`算符在相干态之间的矩阵元：把 $c^\dagger$ 换成 $\theta^*$、$c$ 换成 $\theta'$（正规序），再乘以重叠 $\mathrm{e}^{\theta^*\theta'}$。`}>{R`\langle\theta|h|\theta'\rangle=(h_{00}+\theta^*h_{10}+h_{01}\theta'+\theta^*\theta'h_{11})\mathrm{e}^{\theta^*\theta'}.`}</Eq>
        <Derivation title={R`验证 \eqref{1.196}`} collapsed steps={[
          { tex: R`\langle\theta|h|\theta'\rangle=h_{00}+h_{01}\theta'+\theta^*h_{10}+\theta^*\theta'(h_{00}+h_{11})`, why: R`按 \eqref{1.194}–\eqref{1.195} 展开四项，代入上面的矩阵元。` },
          { tex: R`(h_{00}+\theta^*h_{10}+h_{01}\theta'+\theta^*\theta'h_{11})(1+\theta^*\theta')=h_{00}+\theta^*h_{10}+h_{01}\theta'+\theta^*\theta'(h_{11}+h_{00})`, why: R`$\mathrm{e}^{\theta^*\theta'}=1+\theta^*\theta'$；$\theta^*\cdot\theta^*\theta'=0$，$\theta'\cdot\theta^*\theta'=0$。两行相等。` },
        ]} />
        <Stmt id="L1.3">
          <Eq n="1.197" title="相干态完备性" say={R`费米相干态的完备性关系：对 $\theta,\theta^*$ 做 Grassmann 积分，权重 $\mathrm{e}^{-\theta^*\theta}$ 补偿了相干态的非正交。`}>{R`\int\dd\theta^*\dd\theta\,|\theta\rangle\langle\theta|\mathrm{e}^{-\theta^*\theta}=I.`}</Eq>
          <Proof steps={[
            { claim: R`直接计算：`, tex: R`\begin{aligned}&\int\dd\theta^*\dd\theta\,|\theta\rangle\langle\theta|\mathrm{e}^{-\theta^*\theta}=\int\dd\theta^*\dd\theta\,(|0\rangle+|1\rangle\theta)(\langle0|+\theta^*\langle1|)(1-\theta^*\theta)\\&=\int\dd\theta^*\dd\theta\,\big(|0\rangle\langle0|+|1\rangle\theta\langle0|+|0\rangle\theta^*\langle1|+|1\rangle\theta\theta^*\langle1|\big)(1-\theta^*\theta)\\&=|0\rangle\langle0|+|1\rangle\langle1|=I.\end{aligned}` },
            { claim: R`逐项：只有同时含 $\theta^*$ 与 $\theta$ 的项对积分有贡献。`, tex: R`\int\dd\theta^*\dd\theta\,(-\theta^*\theta)=-\partial_{\theta^*}\partial_\theta(\theta^*\theta)=-\partial_{\theta^*}(-\theta^*)=1,\qquad\int\dd\theta^*\dd\theta\,\theta\theta^*=\partial_{\theta^*}\partial_\theta(\theta\theta^*)=1`, fill: true, why: R`第一项给 $|0\rangle\langle0|$，第四项给 $|1\rangle\langle1|$；$|1\rangle\theta\langle0|$ 与 $|0\rangle\theta^*\langle1|$ 乘 $(1-\theta^*\theta)$ 后只含一个或三个（为零）生成元，积分为零。` },
          ]} />
        </Stmt>
      </Sub>

      <Sub n="1.5.10" title="Partition function of a fermionic oscillator" zh="费米振子的配分函数">
        <p className="muted">本小节概念：<C id="fermion_det" /> · <C id="zeta_reg" /></p>
        <Tx>{R`作为费米子路径积分表述的应用，求费米谐振子的配分函数。Hamilton 量为 $H=(c^\dagger c-1/2)\omega$，本征值为 $\pm\omega/2$。配分函数为`}</Tx>
        <Eq n="1.198" title="费米振子配分函数" say={R`费米振子只有两个能级 $\pm\omega/2$，配分函数是两个 Boltzmann 因子之和 $2\cosh(\beta\omega/2)$。`}>{R`Z(\beta)=\Tr\,\mathrm{e}^{-\beta H}=\sum_{n=0}^1\langle n|\mathrm{e}^{-\beta H}|n\rangle=\mathrm{e}^{\beta\omega/2}+\mathrm{e}^{-\beta\omega/2}=2\cosh(\beta\omega/2).`}</Eq>
        <Tx>{R`下面用路径积分以两种方式计算 $Z(\beta)$。从下面的引理开始。`}</Tx>
        <Stmt id="L1.4">
          <Eq n="1.199" title="费米子的迹 = 反周期" say={R`在相干态中取迹时，末态必须取 $\langle-\theta|$：费米子的迹对应虚时间上的**反周期**边界条件。`}>{R`\Tr\,\mathrm{e}^{-\beta H}=\int\dd\theta^*\dd\theta\,\langle-\theta|\mathrm{e}^{-\beta H}|\theta\rangle\mathrm{e}^{-\theta^*\theta}.`}</Eq>
          <Proof steps={[
            { claim: R`把完备性关系 \eqref{1.197} 插入配分函数的定义：`, tex: R`\begin{aligned}Z(\beta)&=\sum_{n=0,1}\langle n|\mathrm{e}^{-\beta H}|n\rangle=\sum_n\int\dd\theta^*\dd\theta\,\mathrm{e}^{-\theta^*\theta}\langle n|\theta\rangle\langle\theta|\mathrm{e}^{-\beta H}|n\rangle\\&=\sum_n\int\dd\theta^*\dd\theta\,(1-\theta^*\theta)(\langle n|0\rangle+\langle n|1\rangle\theta)(\langle0|\mathrm{e}^{-\beta H}|n\rangle+\theta^*\langle1|\mathrm{e}^{-\beta H}|n\rangle)\\&=\sum_n\int\dd\theta^*\dd\theta\,(1-\theta^*\theta)[\langle0|\mathrm{e}^{-\beta H}|n\rangle\langle n|0\rangle-\theta^*\theta\langle1|\mathrm{e}^{-\beta H}|n\rangle\langle n|1\rangle\\&\qquad+\theta\langle0|\mathrm{e}^{-\beta H}|n\rangle\langle n|1\rangle+\theta^*\langle1|\mathrm{e}^{-\beta H}|n\rangle\langle n|0\rangle]\end{aligned}`, uses: ["L1.3"], why: R`第三行把 c 数 $\langle n|\cdot\rangle$ 挪到右边；$\theta\theta^*=-\theta^*\theta$ 产生第二项的负号。` },
            { claim: R`最后一项（只含一个 $\theta^*$，乘 $(1-\theta^*\theta)$ 后仍只含奇数个生成元）对积分没有贡献，所以可以把它的 $\theta^*$ 换成 $-\theta^*$：`, tex: R`\begin{aligned}Z(\beta)&=\sum_n\int\dd\theta^*\dd\theta\,(1-\theta^*\theta)[\langle0|\mathrm{e}^{-\beta H}|n\rangle\langle n|0\rangle-\theta^*\theta\langle1|\mathrm{e}^{-\beta H}|n\rangle\langle n|1\rangle\\&\qquad+\theta\langle0|\mathrm{e}^{-\beta H}|n\rangle\langle n|1\rangle-\theta^*\langle1|\mathrm{e}^{-\beta H}|n\rangle\langle n|0\rangle]\\&=\int\dd\theta^*\dd\theta\,\mathrm{e}^{-\theta^*\theta}\langle-\theta|\mathrm{e}^{-\beta H}|\theta\rangle.\end{aligned}` },
            { claim: R`最后一步：对 $n$ 求和用 $\sum_n|n\rangle\langle n|=I$，并对照 $\langle-\theta|\mathrm{e}^{-\beta H}|\theta\rangle=(\langle0|-\theta^*\langle1|)\mathrm{e}^{-\beta H}(|0\rangle+|1\rangle\theta)$ 逐项展开。`, fill: true, why: R`记 $X=\mathrm{e}^{-\beta H}$、$X_{ab}=\langle a|X|b\rangle$。对 $n$ 求和后方括号为 $X_{00}-X_{11}\theta^*\theta+X_{01}\theta-X_{10}\theta^*$。另一方面 $\langle-\theta|X|\theta\rangle=(\langle0|-\theta^*\langle1|)X(|0\rangle+|1\rangle\theta)=X_{00}+X_{01}\theta-\theta^*X_{10}-X_{11}\theta^*\theta$，逐项相同。若用 $\langle\theta|$ 代替 $\langle-\theta|$，第二、四项的符号都会翻转，积分给出 $X_{00}-X_{11}$，即 $\Tr[(-1)^FX]$。` },
          ]} />
        </Stmt>
        <Tx>{R`因此，迹中的坐标取遍**反周期**轨道：Grassmann 变量在 $\tau=0$ 处是 $\theta$，在 $\tau=\beta$ 处是 $-\theta$，我们必须在 $[0,\beta]$ 上加反周期边界条件。（对比玻色子 \eqref{1.113} 的周期边界条件。）

**方法 1：时间切片。**利用 $\mathrm{e}^{-\beta H}=\lim_{N\to\infty}(1-\beta H/N)^N$，并在每个时间步插入完备性关系：

$$\begin{aligned}Z(\beta)&=\lim_{N\to\infty}\int\dd\theta^*\dd\theta\,\mathrm{e}^{-\theta^*\theta}\langle-\theta|(1-\beta H/N)^N|\theta\rangle\\&=\lim_{N\to\infty}\int\dd\theta^*\dd\theta\prod_{k=1}^{N-1}\int\dd\theta_k^*\dd\theta_k\,\mathrm{e}^{-\sum_{n=1}^{N-1}\theta_n^*\theta_n}\times\langle-\theta|(1-\varepsilon H)|\theta_{N-1}\rangle\langle\theta_{N-1}|\ldots|\theta_1\rangle\langle\theta_1|(1-\varepsilon H)|\theta\rangle\\&=\lim_{N\to\infty}\int\prod_{k=1}^N\dd\theta_k^*\dd\theta_k\,\mathrm{e}^{-\sum_{n=1}^N\theta_n^*\theta_n}\times\langle\theta_N|(1-\varepsilon H)|\theta_{N-1}\rangle\langle\theta_{N-1}|\ldots|\theta_1\rangle\langle\theta_1|(1-\varepsilon H)|-\theta_N\rangle\end{aligned}$$

其中 $\varepsilon=\beta/N$，并令 $\theta=-\theta_N=\theta_0$、$\theta^*=-\theta_N^*=\theta_0^*$。每个矩阵元由 \eqref{1.196}（$h_{00}=-\omega/2$，$h_{11}=\omega$）算得：

$$\begin{aligned}\langle\theta_k|(1-\varepsilon H)|\theta_{k-1}\rangle&=\langle\theta_k|\theta_{k-1}\rangle\left[1-\varepsilon\frac{\langle\theta_k|H|\theta_{k-1}\rangle}{\langle\theta_k|\theta_{k-1}\rangle}\right]\simeq\langle\theta_k|\theta_{k-1}\rangle\mathrm{e}^{-\varepsilon\langle\theta_k|H|\theta_{k-1}\rangle/\langle\theta_k|\theta_{k-1}\rangle}\\&=\mathrm{e}^{\theta_k^*\theta_{k-1}}\mathrm{e}^{-\varepsilon\omega(\theta_k^*\theta_{k-1}-1/2)}=\mathrm{e}^{\varepsilon\omega/2}\mathrm{e}^{(1-\varepsilon\omega)\theta_k^*\theta_{k-1}}.\end{aligned}$$

于是配分函数用路径积分表示为`}</Tx>
        <Eq n="1.200" title="费米振子的离散路径积分" say={R`费米振子的配分函数写成 $N$ 对 Grassmann 变量上的 Gauss 积分，二次型矩阵 $B_N$ 的右上角带反周期边界条件带来的符号。`}>{R`\begin{aligned}Z(\beta)&=\lim_{N\to\infty}\mathrm{e}^{\beta\omega/2}\prod_{k=1}^N\int\dd\theta_k^*\dd\theta_k\,\mathrm{e}^{-\sum_{n=1}^N\theta_n^*\theta_n}\mathrm{e}^{(1-\varepsilon\omega)\sum_{n=1}^N\theta_n^*\theta_{n-1}}\\&=\mathrm{e}^{\beta\omega/2}\lim_{N\to\infty}\prod_{k=1}^N\int\dd\theta_k^*\dd\theta_k\,\mathrm{e}^{-\sum_{n=1}^N[\theta_n^*(\theta_n-\theta_{n-1})+\varepsilon\omega\theta_n^*\theta_{n-1}]}\\&=\mathrm{e}^{\beta\omega/2}\lim_{N\to\infty}\prod_{k=1}^N\int\dd\theta_k^*\dd\theta_k\,\mathrm{e}^{-\theta^\dagger\cdot B\cdot\theta},\end{aligned}`}</Eq>
        <Tx>{R`其中 $\theta=(\theta_1,\theta_2,\ldots,\theta_N)^{\rm t}$，$\theta^\dagger=(\theta_1^*,\theta_2^*,\ldots,\theta_N^*)$，

$$B_N=\begin{pmatrix}1&0&\ldots&0&-y\\y&1&0&\ldots&0\\0&y&1&\ldots&0\\\vdots&&\ddots&&\vdots\\0&0&\ldots&y&1\end{pmatrix},$$

$y=-1+\varepsilon\omega$（右上角的 $-y$ 来自 $\theta_0=-\theta_N$）。由 Grassmann Gauss 积分的定义 \eqref{1.187}，最终得到`}</Tx>
        <Eq n="1.201" keyEq title={R`费米振子：$Z=2\cosh(\beta\omega/2)$`} say={R`时间切片的费米子行列式 $\det B_N=1+(1-\beta\omega/N)^N$ 收敛到 $1+\mathrm{e}^{-\beta\omega}$，给出 $2\cosh(\beta\omega/2)$，与 \eqref{1.198} 一致。`}>{R`\begin{aligned}Z(\beta)&=\mathrm{e}^{\beta\omega/2}\lim_{N\to\infty}\det B_N=\mathrm{e}^{\beta\omega/2}\lim_{N\to\infty}[1+(1-\beta\omega/N)^N]\\&=\mathrm{e}^{\beta\omega/2}(1+\mathrm{e}^{-\beta\omega})=2\cosh\tfrac12\beta\omega.\end{aligned}`}</Eq>
        <Derivation title={R`$\det B_N=1+(-1)^Ny^N=1+(1-\varepsilon\omega)^N$`} collapsed steps={[
          { tex: R`\det B_N=\det(I+yS)+(-1)^{N+1}(-y)\cdot\det(\text{划去第 1 行第 }N\text{ 列的子式})`, why: R`沿第一行展开：$(1,1)$ 元的余子式是下三角矩阵（对角线全为 1），行列式为 1；$(1,N)$ 元 $-y$ 的余子式是上三角矩阵，对角线全为 $y$，行列式为 $y^{N-1}$。` },
          { tex: R`\det B_N=1+(-1)^{N+1}(-y)\,y^{N-1}=1+(-1)^Ny^N=1+(1-\varepsilon\omega)^N`, why: R`$-y=1-\varepsilon\omega$。若边界条件是**周期**的（右上角为 $+y$），就会得到 $1-(1-\varepsilon\omega)^N\to1-\mathrm{e}^{-\beta\omega}$，那是 $\Tr(-1)^F\mathrm{e}^{-\beta H}$ 而不是配分函数。` },
        ]} />
        <Tx>{R`这应当与玻色谐振子的配分函数 \eqref{1.151} 比较：玻色子给出 $[2\sinh(\beta\omega/2)]^{-1}$（行列式在分母），费米子给出 $2\cosh(\beta\omega/2)$（行列式在分子）。交互图 3 的第三个模式用显式 Grassmann 代数对 $N\le5$ 直接做了这个积分。

**方法 2：$\zeta$ 函数正规化。**由 \eqref{1.200} 第二行，

$$\begin{aligned}Z(\beta)&=\mathrm{e}^{\beta\omega/2}\lim_{N\to\infty}\prod_{k=1}^N\int\dd\theta_k^*\dd\theta_k\,\mathrm{e}^{-\sum_n[(1-\varepsilon\omega)\theta_n^*(\theta_n-\theta_{n-1})/\varepsilon+\omega\theta_n^*\theta_n]\varepsilon}\\&=\mathrm{e}^{\beta\omega/2}\int\mathcal{D}\theta^*\mathcal{D}\theta\exp\left[-\int_0^\beta\dd\tau\,\theta^*\left((1-\varepsilon\omega)\frac{\dd}{\dd\tau}+\omega\right)\theta\right]\\&=\mathrm{e}^{\beta\omega/2}\operatorname{Det}_{\rm APBC}\left((1-\varepsilon\omega)\frac{\dd}{\dd\tau}+\omega\right).\end{aligned}$$

（第一行把指数改写为 $(1-\varepsilon\omega)\theta_n^*(\theta_n-\theta_{n-1})+\varepsilon\omega\theta_n^*\theta_n$，与 \eqref{1.200} 第二行的被积函数相等。）下标 APBC 表示本征值要对满足反周期边界条件 $\theta(\beta)=-\theta(0)$ 的解求得。微分算符中含有 $\varepsilon$ 似乎很奇怪，但后面会看到它对本征值的无穷乘积给出有限的贡献。把轨道 $\theta(\tau)$ 按 Fourier 模式展开，本征模式与对应本征值为

$$\exp\left(\frac{\pi\mathrm{i}(2n+1)\tau}{\beta}\right),\qquad(1-\varepsilon\omega)\frac{\pi\mathrm{i}(2n+1)}{\beta}+\omega,\qquad n=0,\pm1,\pm2,\ldots$$

（反周期：$\mathrm{e}^{\pi\mathrm{i}(2n+1)}=-1$。）注意相干态是**超完备**的，实际的自由度数是 $N$，与 $\varepsilon$ 的关系为 $\varepsilon=\beta/N$。由于一个复变量有两个实自由度，乘积必须截断在 $-N/4\le k\le N/4$。于是配分函数取如下形式：

$$\begin{aligned}Z(\beta)&=\mathrm{e}^{\beta\omega/2}\lim_{N\to\infty}\prod_{k=-N/4}^{N/4}\left[\mathrm{i}(1-\varepsilon\omega)\frac{\pi(2k-1)}{\beta}+\omega\right]\\&=\mathrm{e}^{\beta\omega/2}\mathrm{e}^{-\beta\omega/2}\prod_{k=1}^{\infty}\left[\left(\frac{2\pi(k-1/2)}{\beta}\right)^2+\omega^2\right]\\&=\prod_{k=1}^{\infty}\left[\frac{\pi(2k-1)}{\beta}\right]^2\prod_{n=1}^{\infty}\left[1+\left(\frac{\beta\omega}{\pi(2n-1)}\right)^2\right].\end{aligned}$$

（第二行：$k$ 与 $1-k$ 的两个因子配成 $|\cdot|^2$；约 $N/2$ 个因子 $(1-\varepsilon\omega)$ 的乘积 $(1-\beta\omega/N)^{N/2}\to\mathrm{e}^{-\beta\omega/2}$——这就是 $\varepsilon$ 给出的"有限贡献"，它恰好抵消前面的 $\mathrm{e}^{\beta\omega/2}$。）

第一个无穷乘积记作 $P$，它发散，需要正规化。先注意

$$\log P=\sum_{k=1}^\infty2\log\left[\frac{2\pi(k-1/2)}{\beta}\right].$$

定义相应的 $\zeta$ 函数

$$\tilde\zeta(s)=\sum_{k=1}^\infty\left[\frac{2\pi(k-1/2)}{\beta}\right]^{-s}=\left(\frac{\beta}{2\pi}\right)^s\zeta(s,1/2),$$

于是 $P=\mathrm{e}^{-2\tilde\zeta'(0)}$。这里`}</Tx>
        <Eq n="1.202" say={R`Hurwitz（广义）$\zeta$ 函数：Riemann $\zeta$ 函数的求和起点平移 $a$。`}>{R`\zeta(s,a)=\sum_{k=0}^\infty\frac{1}{(k+a)^s}\qquad(0<a<1)`}</Eq>
        <Tx>{R`是**广义 $\zeta$ 函数**（**Hurwitz $\zeta$ 函数**）。$\tilde\zeta(s)$ 在 $s=0$ 处的导数为

$$\tilde\zeta'(0)=\log\left(\frac{\beta}{2\pi}\right)\zeta(0,1/2)+\zeta'(0,1/2)=-\frac12\log2,$$

这里用了

$$\zeta(0,1/2)=0\qquad\zeta'(0,1/2)=-\tfrac12\log2.$$

（第一式由关系 $\zeta(s,1/2)=(2^s-1)\zeta(s)$ 得到，而这个关系来自恒等式 $\zeta(s,1/2)+\zeta(s)=2^s\sum_{n=1}^\infty[1/(2n-1)^s+1/(2n)^s]=2^s\zeta(s)$；第二式由对 $\zeta(s,1/2)=(2^s-1)\zeta(s)$ 求导并用 $\zeta(0)=-1/2$ 得到：$\zeta'(0,1/2)=\log2\cdot\zeta(0)+0\cdot\zeta'(0)=-\tfrac12\log2$。）最终得到`}</Tx>
        <Eq n="1.203" say={R`$\zeta$ 正规化后反周期模式的"自由部分"乘积等于 2，与 $\beta$ 无关。`}>{R`P=\mathrm{e}^{-2\tilde\zeta'(0)}=\mathrm{e}^{\log2}=2.`}</Eq>
        <Tx>{R`注意正规化后 $P$ 与 $\beta$ 无关（对比玻色子 Dirichlet 情形的 $2\beta$，\eqref{1.162}）。合在一起，得到配分函数`}</Tx>
        <Eq n="1.204" say={R`费米振子配分函数 = 2 乘以反周期模式的收敛无穷乘积。`}>{R`Z(\beta)=2\prod_{n=1}^\infty\left[1+\left(\frac{\beta\omega}{\pi(2n-1)}\right)^2\right].`}</Eq>
        <Tx>{R`利用熟知的公式`}</Tx>
        <Eq n="1.205" title="cosh 的无穷乘积" say={R`$\cosh$ 的无穷乘积：零点在 $x=\pm\mathrm{i}\pi(2n-1)$，对应费米子的反周期频率。`}>{R`\cosh\frac x2=\prod_{n=1}^\infty\left[1+\frac{x^2}{\pi^2(2n-1)^2}\right]`}</Eq>
        <Tx>{R`得到`}</Tx>
        <Eq n="1.206" say={R`两种路径积分算法给出同一个费米振子配分函数。`}>{R`Z(\beta)=2\cosh\frac{\beta\omega}{2}.`}</Eq>
        <Box kind="key" title="用物理证明数学">{R`反过来，假设我们不知道公式 \eqref{1.205}。把 \eqref{1.201} 与 \eqref{1.204} 等同起来，我们就借助路径积分**证明**了 \eqref{1.205}——正如 §1.4 由玻色振子证明了 $\sinh$ 的乘积 \eqref{1.165}。这是物理应用于数学的典型方式：用两种不同的方法计算同一个物理量，令结果相等，往往得到一个非平凡且有用的数学关系。第 12 章的指标定理就是这一思想最深刻的例子。`}</Box>
      </Sub>
    </Sec>);
}
