// 补充材料 B_II：线性算符的一些有用性质 —— 式 (BII-1)–(BII-70)（含 7a、7b）
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import "./_ch02c_kit.jsx";
import { Fig } from "./_ch02c_kit.jsx";
import { GlauberDemo } from "./_ch02c_plots.jsx";

const R = String.raw;

export function SecB() {
  return (
    <Sec n="BII" title="Review of some useful properties of linear operators" zh="线性算符的一些有用性质"
      gist={R`一份"算符工具箱"：迹与它的基无关性和循环性；对易子代数；算符在子空间上的限制；用幂级数（或在本征基中逐个作用）定义算符函数，以及 $[X,F(P)]=i\hbar F'(P)$；算符的导数与"顺序不能乱换"；最后是 Glauber 公式 $\mathrm e^A\mathrm e^B=\mathrm e^{A+B}\mathrm e^{\frac12[A,B]}$。`}
      why={R`量子力学处处要对算符做普通函数会做的事——求迹、取指数、求导、交换次序。数在这些运算下毫无顾忌，算符却因为不对易而处处设限。把这些规则一次说清，后面的章节就可以直接引用。`}
      gives={["BII-1", "BII-7a", "BII-23", "BII-27", "BII-33", "BII-36", "BII-47", "BII-48", "BII-51", "BII-61", "BII-63"]}>
      <p className="muted">本节概念：<C id="trace" /> · <C id="opfunc" /> · <C id="glauber" /></p>
      <Tx>{R`本补充材料没有一条"主线"，它是第 II 章正文里反复用到、又不值得在正文中展开的几件工具。读的时候可以抓住一个统一的问题：**对数成立的运算规则，哪些对算符仍然成立、哪些需要附加条件？**答案几乎总是同一个：凡是需要交换两个因子次序的地方，就要问它们是否对易。`}</Tx>

      <Sub n="BII-1" title="Trace of an operator" zh="算符的迹">
        <Tx>{R`**为什么需要迹。**一个算符在不同的基里有不同的矩阵；物理量不应依赖我们选哪组基。所以要找那些"换基不变"的数——迹就是最简单的一个。以后密度算符、平均值 $\langle A\rangle=\Tr(\rho A)$ 都靠它。`}</Tx>
        <Sub n="BII-1-a" title="Definition" zh="定义">
          <Tx>{R`取一组离散正交归一基 $\{\ket{u_i}\}$，把对角元加起来：`}</Tx>
          <Eq n="BII-1" keyEq title="迹的定义（离散基）" say="算符的迹：在一组正交归一基中，把它的全部对角矩阵元相加。">{R`\Tr A=\sum_i\braket{u_i|A|u_i}`}</Eq>
          <Tx>{R`连续基 $\{\ket{w_\alpha}\}$ 则把求和换成积分：`}</Tx>
          <Eq n="BII-2" say="连续基中的迹：对角元关于连续指标 $\alpha$ 积分。">{R`\Tr A=\int\dd\alpha\ \braket{w_\alpha|A|w_\alpha}`}</Eq>
          <Tx>{R`有限维时这总是一个有限的数；无穷维时求和或积分可能发散，此时说"迹不存在"。例如单位算符在无穷维空间里就没有迹——这一点在补充材料 $\mathrm E_{\rm II}$ 末尾会派上用场。`}</Tx>
        </Sub>
        <Sub n="BII-1-b" title="The trace is invariant" zh="迹与基无关">
          <Tx>{R`**要证明的事。**换一组正交归一基 $\{\ket{t_k}\}$，对角元之和不变。办法是两次插入封闭关系：先插 $t$ 基，再交换两个"数"的次序，最后把 $u$ 基的封闭关系收回去。第一步，在 $A$ 左边插入 $\sum_k\ket{t_k}\bra{t_k}=\mathbb 1$：`}</Tx>
          <Eq n="BII-3" say="在原来的对角元中插入新基的封闭关系，把单位算符写成 $\ket{t_k}\bra{t_k}$ 之和。">{R`\sum_i\braket{u_i|A|u_i}=\sum_i\bra{u_i}\left[\sum_k\ket{t_k}\bra{t_k}\right]A\ket{u_i}`}</Eq>
          <Tx>{R`现在每一项都是两个**数**的乘积，数可以随意交换次序：`}</Tx>
          <Eq n="BII-4" say="右边每一项是两个复数之积，交换它们的先后顺序，把 $\braket{u_i|t_k}$ 移到最后。">{R`\sum_{i,k}\braket{u_i|t_k}\braket{t_k|A|u_i}=\sum_{i,k}\braket{t_k|A|u_i}\braket{u_i|t_k}`}</Eq>
          <Tx>{R`此时 $\sum_i\ket{u_i}\bra{u_i}$ 恰好夹在中间，按 $u$ 基的封闭关系换成 $\mathbb 1$：`}</Tx>
          <Eq n="BII-5" keyEq title="迹与基无关" say="同一个算符在两组不同正交归一基中的对角元之和相等：迹是算符本身的性质。">{R`\sum_i\braket{u_i|A|u_i}=\sum_k\braket{t_k|A|t_k}`}</Eq>
          <Tx>{R`**一个直接推论。**若 $A$ 是可观测量，就可以在它自己的本征基里算迹：对角元是本征值 $a_n$，每个出现 $g_n$ 次（简并度），于是`}</Tx>
          <Eq n="BII-6" say="可观测量的迹等于全部本征值之和，简并的本征值按简并度重复计数。">{R`\Tr A=\sum_n g_n\,a_n`}</Eq>
        </Sub>
        <Sub n="BII-1-c" title="Important properties" zh="循环性">
          <Tx>{R`乘积的次序对算符很要紧，但在迹号下，**循环**换位是允许的：`}</Tx>
          <Eq n="BII-7a" keyEq title="迹的循环性" say="两个算符乘积的迹与相乘次序无关，尽管 $AB$ 与 $BA$ 本身一般不相等。">{R`\Tr AB=\Tr BA`}</Eq>
          <Eq n="BII-7b" say="三个或更多算符：轮换（循环置换）次序不改变迹；但任意打乱次序一般会改变。">{R`\Tr ABC=\Tr BCA=\Tr CAB`}</Eq>
          <Tx>{R`证明 (7a) 只需在 $AB$ 中间插一次封闭关系，再交换两个矩阵元（它们是数），然后在 $BA$ 中间把封闭关系收回：`}</Tx>
          <Eq n="BII-8" say="把 $AB$ 的对角元拆成两个矩阵元之积的求和，交换两个数的次序后重新组合，就得到 $BA$ 的对角元之和。">{R`\begin{aligned}\Tr AB&=\sum_i\braket{u_i|AB|u_i}=\sum_{i,j}\braket{u_i|A|u_j}\,\braket{u_j|B|u_i}\\&=\sum_{i,j}\braket{u_j|B|u_i}\,\braket{u_i|A|u_j}=\sum_j\braket{u_j|BA|u_j}=\Tr BA\end{aligned}`}</Eq>
          <Tx>{R`(7b) 只是把 $BC$ 看成一个算符再用一次 (7a)。`}</Tx>
          <Box kind="warning" title="循环 $\neq$ 任意置换">{R`$\Tr ABC=\Tr BCA$，但一般 $\Tr ABC\neq\Tr ACB$。反例：取 Pauli 矩阵，$\Tr(\sigma_x\sigma_y\sigma_z)=2i$，而 $\Tr(\sigma_x\sigma_z\sigma_y)=-2i$。`}</Box>
        </Sub>
      </Sub>

      <Sub n="BII-2" title="Commutator algebra" zh="对易子代数">
        <Sub n="BII-2-a" title="Definition" zh="定义">
          <Eq n="BII-9" keyEq title="对易子" say="对易子衡量两个算符“先后次序”造成的差别：先 $B$ 后 $A$，减去先 $A$ 后 $B$。">{R`[A,B]=AB-BA`}</Eq>
        </Sub>
        <Sub n="BII-2-b" title="Properties" zh="运算规则">
          <Tx>{R`下面五条都只要把两边按 \eqref{BII-9} 展开就能核对，但它们是以后算对易子时最常用的"语法"：反对称、线性、乘积法则（类似 Leibniz 求导法则）、Jacobi 恒等式、取伴随。`}</Tx>
          <Eq n="BII-10" say="对易子反对称：交换两个算符的位置，对易子变号。">{R`[A,B]=-[B,A]`}</Eq>
          <Eq n="BII-11" say="对易子对每个变量都是线性的：可以对和逐项求对易子。">{R`[A,(B+C)]=[A,B]+[A,C]`}</Eq>
          <Eq n="BII-12" keyEq title="对易子的乘积法则" say="与乘积求对易子，像对乘积求导一样：先对 $B$ 求，$C$ 留在右边；再对 $C$ 求，$B$ 留在左边——次序不能颠倒。">{R`[A,BC]=[A,B]C+B[A,C]`}</Eq>
          <Eq n="BII-13" say="Jacobi 恒等式：三个算符的嵌套对易子轮换求和恒为零。">{R`[A,[B,C]]+[B,[C,A]]+[C,[A,B]]=0`}</Eq>
          <Eq n="BII-14" say="对易子的伴随等于两个伴随算符按相反次序的对易子。">{R`[A,B]^\dagger=[B^\dagger,A^\dagger]`}</Eq>
          <Derivation title="核对 (BII-12) 与 (BII-14)" collapsed steps={[
            { tex: R`[A,B]C+B[A,C]=ABC-BAC+BAC-BCA=ABC-BCA=[A,BC]`, why: R`中间两项 $\mp BAC$ 抵消。这就是"插入再抵消"的套路，它把对乘积的对易子化为对因子的对易子。` },
            { tex: R`[A,B]^\dagger=(AB)^\dagger-(BA)^\dagger=B^\dagger A^\dagger-A^\dagger B^\dagger=[B^\dagger,A^\dagger]`, why: R`用 $(AB)^\dagger=B^\dagger A^\dagger$。特别地，两个厄米算符的对易子是**反厄米**的：$[A,B]^\dagger=-[A,B]$，所以 $i[A,B]$ 是厄米的——这就是 $[X,P]=i\hbar$ 右边出现 $i$ 的原因。` },
          ]} />
        </Sub>
      </Sub>

      <Sub n="BII-3" title="Restriction of an operator to a subspace" zh="算符在子空间上的限制">
        <Tx>{R`**动机。**做简并微扰论、讨论对易可观测量的公共本征矢时，我们经常只关心算符在某个子空间（比如一个本征子空间）里的行为。怎样把一个作用在整个 $\mathcal E$ 上的算符"裁剪"成只作用在子空间里的算符？

设 $\mathcal E_q$ 由 $q$ 个正交归一矢量 $\ket{\varphi_i}$ 张成，它的投影算符是`}</Tx>
        <Eq n="BII-15" say="$q$ 维子空间的投影算符：把张成该子空间的 $q$ 个正交归一矢量的“右矢-左矢”加起来。">{R`P_q=\sum_{i=1}^q\ket{\varphi_i}\bra{\varphi_i}`}</Eq>
        <Tx>{R`裁剪的办法是两边各夹一个投影：`}</Tx>
        <Eq n="BII-16" keyEq title="算符在子空间上的限制" say="把 $A$ 限制到子空间：先投影进子空间，让 $A$ 作用，再把结果投影回子空间。">{R`\hat A_q=P_qAP_q`}</Eq>
        <Tx>{R`作用在任意 $\ket\psi$ 上，读法就是三个步骤：`}</Tx>
        <Eq n="BII-17" say="限制后的算符作用于任意矢量，等于 $A$ 作用于该矢量在子空间中的投影，再取投影。">{R`\hat A_q\ket\psi=P_qA\ket{\hat\psi_q}`}</Eq>
        <Eq n="BII-18" say="矢量在子空间上的正交投影。">{R`\ket{\hat\psi_q}=P_q\ket\psi`}</Eq>
        <Tx>{R`$\hat A_q$ 把 $\mathcal E_q$ 映回 $\mathcal E_q$，把正交补空间整个映成零。

**矩阵长什么样。**选一组基 $\{\ket{u_k}\}$，让前 $q$ 个就是 $\ket{\varphi_i}$，其余属于正交补：`}</Tx>
        <Eq n="BII-19" say="限制算符的矩阵元：在原矩阵元两侧各加一个投影算符。">{R`\braket{u_i|\hat A_q|u_j}=\braket{u_i|P_qAP_q|u_j}`}</Eq>
        <Tx>{R`$P_q\ket{u_j}$ 对前 $q$ 个基矢是它自己，对其余是零，所以`}</Tx>
        <Eq n="BII-20" say="限制算符的矩阵就是从 $A$ 的矩阵中“剪下”左上角 $q\times q$ 的方块，其余元素全部置零。">{R`\braket{u_i|\hat A_q|u_j}=\begin{cases}\braket{u_i|A|u_j}&\text{if}\ \ i,\,j\leq q\\0&\text{if one of the two indices } i \text{ or } j \text{ is greater than } q\end{cases}`}</Eq>
        <Tx>{R`一句话：在适配的基中，$\hat A_q$ 的矩阵就是 $A$ 的矩阵的左上角 $q\times q$ 块，其余补零。`}</Tx>
        <Box kind="warning" title="限制 $\neq$ 原算符的本征问题">{R`若 $\mathcal E_q$ 不是 $A$ 的不变子空间（$A$ 会把 $\mathcal E_q$ 中的矢量送到外面），$\hat A_q$ 的本征值一般**不是** $A$ 的本征值——被丢掉的那部分矩阵元（非对角块）也影响 $A$ 的本征值。只有当非对角块为零（$\mathcal E_q$ 在 $A$ 下不变）时，$\hat A_q$ 的本征值才是 $A$ 本征值的一部分。`}</Box>
      </Sub>

      <Sub n="BII-4" title="Functions of operators" zh="算符的函数">
        <Sub n="BII-4-a" title="Definition and simple properties" zh="定义与简单性质">
          <Tx>{R`**从最简单的开始。**$A^n$ 就是连续作用 $n$ 次；逆算符（若存在）由`}</Tx>
          <Eq n="BII-21" say="逆算符的定义：与 $A$ 无论左乘还是右乘都给出单位算符。">{R`A^{-1}A=AA^{-1}=\mathbb 1`}</Eq>
          <Tx>{R`定义。有了幂，就能把任何**多项式**推广到算符。更一般的函数怎么办？两条路，它们在可对角化的情形下等价。

**路一：幂级数。**若 $F$ 在某个区域可以展开`}</Tx>
          <Eq n="BII-22" say="普通函数 $F$ 在某个区域内的幂级数展开。">{R`F(z)=\sum_{n=0}^\infty f_nz^n`}</Eq>
          <Tx>{R`就**用同样的系数**定义算符函数：`}</Tx>
          <Eq n="BII-23" keyEq title="算符函数（幂级数定义）" say="算符的函数：把普通函数幂级数中的变量 $z$ 换成算符 $A$，系数保持不变。">{R`F(A)=\sum_{n=0}^\infty f_nA^n`}</Eq>
          <Tx>{R`最重要的例子是指数：`}</Tx>
          <Eq n="BII-24" keyEq title="算符指数" say="算符的指数函数：由指数的 Taylor 级数逐项定义。">{R`\mathrm e^A=\sum_{n=0}^\infty\frac{A^n}{n!}=\mathbb 1+A+A^2/2!+...+A^n/n!+...`}</Eq>
          <Tx>{R`级数是否收敛取决于 $A$ 的本征值与 $F$ 展开式的收敛半径，这里不深究。顺带一个常用事实：$F$ 是实函数（$f_n$ 实）而 $A$ 厄米时，$F(A)$ 也厄米——每一项 $f_nA^n$ 都是厄米的。

**这个定义在本征矢上做了什么？**设`}</Tx>
          <Eq n="BII-25" say="$\varphi_a$ 是 $A$ 的本征矢，本征值为 $a$。">{R`A\ket{\varphi_a}=a\ket{\varphi_a}`}</Eq>
          <Tx>{R`连续作用 $n$ 次，每次拉出一个 $a$：`}</Tx>
          <Eq n="BII-26" say="$A$ 的 $n$ 次幂作用在本征矢上，相当于乘以本征值的 $n$ 次方。">{R`A^n\ket{\varphi_a}=a^n\ket{\varphi_a}`}</Eq>
          <Tx>{R`逐项代入级数 \eqref{BII-23}：`}</Tx>
          <Eq n="BII-27" keyEq title="算符函数作用于本征矢" say="算符函数作用在 $A$ 的本征矢上，只需把普通函数作用在本征值上：本征矢不变，本征值 $a$ 变成 $F(a)$。">{R`F(A)\ket{\varphi_a}=\sum_{n=0}^\infty f_na^n\ket{\varphi_a}=F(a)\ket{\varphi_a}`}</Eq>
          <Tx>{R`**路二：在本征基里逐个作用。**上式提示了另一种定义，适用于可对角化的 $A$（可观测量总是如此）：在使 $A$ 对角的基里（对角元为本征值 $a_i$），**定义** $F(A)$ 为对角元为 $F(a_i)$ 的对角矩阵。这条路不需要幂级数收敛，像 $\sqrt A$、$\ln A$、$|A|$ 都可以这样定义。例：`}</Tx>
          <Eq n="BII-28" say="Pauli 矩阵 $\sigma_z$：一个已经对角的 $2\times2$ 矩阵，本征值为 $+1$ 和 $-1$。">{R`\sigma_z=\begin{pmatrix}1&0\\0&-1\end{pmatrix}`}</Eq>
          <Tx>{R`直接对对角元取指数：`}</Tx>
          <Eq n="BII-29" say="对角矩阵的指数：把每个对角元分别取指数，得 $\mathrm e$ 与 $\mathrm e^{-1}$。">{R`\mathrm e^{\sigma_z}=\begin{pmatrix}\mathrm e&0\\0&1/\mathrm e\end{pmatrix}`}</Eq>
          <Tx>{R`（用级数 \eqref{BII-24} 验证：$\sigma_z^2=\mathbb 1$，偶次项给出 $\cosh1$，奇次项给出 $\sigma_z\sinh1$，合起来正是上面的对角阵。）

**次序陷阱。**数满足 $\mathrm e^a\mathrm e^b=\mathrm e^{a+b}$；算符一般不满足。把三个量都按级数写出：`}</Tx>
          <Eq n="BII-30" say="$\mathrm e^A\mathrm e^B$ 展开后，每一项都是“$A$ 的幂在左、$B$ 的幂在右”。">{R`\mathrm e^A\mathrm e^B=\sum_p\frac{A^p}{p!}\sum_q\frac{B^q}{q!}=\sum_{p,q}\frac{A^p\,B^q}{p!\,q!}`}</Eq>
          <Eq n="BII-31" say="$\mathrm e^B\mathrm e^A$ 展开后，每一项都是“$B$ 的幂在左、$A$ 的幂在右”，与上式次序相反。">{R`\mathrm e^B\mathrm e^A=\sum_q\frac{B^q}{q!}\sum_p\frac{A^p}{p!}=\sum_{p,q}\frac{B^q\,A^p}{p!\,q!}`}</Eq>
          <Eq n="BII-32" say="$\mathrm e^{A+B}$ 展开后，$(A+B)^p$ 中 $A$、$B$ 以所有可能的次序交错出现。">{R`\mathrm e^{A+B}=\sum_p\frac{(A+B)^p}{p!}`}</Eq>
          <Tx>{R`以二阶项为例：\eqref{BII-30} 给出 $\frac12A^2+AB+\frac12B^2$，\eqref{BII-31} 给出 $\frac12A^2+BA+\frac12B^2$，\eqref{BII-32} 给出 $\frac12(A^2+AB+BA+B^2)$。三者相差的正是 $\pm\frac12[A,B]$。所以只要 $A$、$B$ 对易，三者就一样：`}</Tx>
          <Eq n="BII-33" keyEq title="对易时指数可以合并" say="$A$、$B$ 对易时，指数的乘积与普通数一样：次序无关，并且可以把指数相加。">{R`[A,B]=0\Longrightarrow\mathrm e^A\mathrm e^B=\mathrm e^B\mathrm e^A=\mathrm e^{A+B}`}</Eq>
          <Tx>{R`（最清楚的看法：对易的可观测量有公共本征基，在那里两个指数都是对角阵，对角阵之间的乘法就是数的乘法。）不对易时差多少？§5-d 的 Glauber 公式会给出答案（对易子本身与 $A$、$B$ 对易的情形），习题 7 则给出一个"完全不对易"的具体反例。`}</Tx>
        </Sub>
        <Sub n="BII-4-b" title="An important example: the potential operator" zh="重要例子：势能算符">
          <Tx>{R`一维问题中的势能 $V(x)$ 变成算符 $V(X)$：它是位置算符的函数。由 \eqref{BII-27}，$X$ 的本征矢 $\ket x$ 也是 $V(X)$ 的本征矢：`}</Tx>
          <Eq n="BII-34" say="势能算符作用在位置本征矢上：本征值就是经典势能函数在该点的值。">{R`V(X)\ket x=V(x)\ket x`}</Eq>
          <Tx>{R`于是它在 $\{\ket x\}$ 表象中是"对角"的（$\delta$ 函数意义下）：`}</Tx>
          <Eq n="BII-35" say="势能算符在位置表象中是对角的：只有 $x=x'$ 时矩阵元不为零。">{R`\braket{x|V(X)|x'}=V(x)\delta(x-x')`}</Eq>
          <Tx>{R`作用在一般态上：取 \eqref{BII-34} 的伴随（$V$ 是实函数，故 $V(X)$ 厄米），得 $\bra xV(X)=V(x)\bra x$，所以`}</Tx>
          <Eq n="BII-36" keyEq title="势能算符在位置表象中的作用" say="在位置表象里，势能算符的作用只是把波函数逐点乘以 $V(x)$。">{R`\braket{x|V(X)|\psi}=V(x)\braket{x|\psi}=V(x)\psi(x)`}</Eq>
          <Tx>{R`三维完全照搬：`}</Tx>
          <Eq n="BII-37" say="三维势能算符作用在位置本征矢上，给出该点的势能值。">{R`V(\mathbf R)\ket{\mathbf r}=V(\mathbf r)\ket{\mathbf r}`}</Eq>
          <Eq n="BII-38" say="三维势能算符在位置表象中的矩阵元：对角，系数为势能函数。">{R`\braket{\mathbf r|V(\mathbf R)|\mathbf r'}=V(\mathbf r)\delta(\mathbf r-\mathbf r')`}</Eq>
          <Eq n="BII-39" say="三维情形：势能算符在位置表象中就是乘以 $V(\mathbf r)$。">{R`\braket{\mathbf r|V(\mathbf R)|\psi}=V(\mathbf r)\psi(\mathbf r)`}</Eq>
        </Sub>
        <Sub n="BII-4-c" title="Commutators involving functions of operators" zh="含算符函数的对易子">
          <Tx>{R`**容易的两条。**$F(A)$ 是 $A$ 的幂的组合，每个幂都与 $A$ 对易：`}</Tx>
          <Eq n="BII-40" say="任何算符都与它自己的函数对易。">{R`[A,F(A)]=0`}</Eq>
          <Tx>{R`同理，与 $A$ 对易的 $B$ 也与 $A$ 的每个幂、从而与 $F(A)$ 对易：`}</Tx>
          <Eq n="BII-41" say="若 $B$ 与 $A$ 对易，则 $B$ 也与 $A$ 的任何函数对易。">{R`[B,A]=0\Longrightarrow[B,F(A)]=0`}</Eq>
          <Tx>{R`**真正有用的一条：$X$ 与 $P$ 的函数。**出发点是`}</Tx>
          <Eq n="BII-42" say="位置与动量的正则对易关系。">{R`[X,P]=i\hbar`}</Eq>
          <Tx>{R`用乘积法则 \eqref{BII-12} 先算 $P^2$：`}</Tx>
          <Eq n="BII-43" say="$X$ 与 $P^2$ 的对易子：用乘积法则拆开，两项各贡献一个 $i\hbar P$。">{R`[X,P^2]=[X,PP]=[X,P]P+P[X,P]=2i\hbar\,P`}</Eq>
          <Tx>{R`它看起来像"对 $P^2$ 求导再乘 $i\hbar$"。猜测一般地`}</Tx>
          <Eq n="BII-44" say="$X$ 与 $P^n$ 的对易子等于 $i\hbar\,nP^{n-1}$，就像对 $P^n$ 求导。">{R`[X,P^n]=i\hbar\ n\ P^{n-1}`}</Eq>
          <Tx>{R`用归纳法：设它对 $n$ 成立，把 $P^{n+1}$ 拆成 $PP^n$，再用一次乘积法则：`}</Tx>
          <Eq n="BII-45" say="归纳步骤：$X$ 与 $P^{n+1}$ 的对易子等于 $i\hbar(n+1)P^n$，与“求导”规则一致。">{R`\begin{aligned}[X,P^{n+1}]&=[X,PP^n]=[X,P]P^n+P[X,P^n]\\&=i\hbar\,P^n+i\hbar n\,PP^{n-1}=i\hbar(n+1)P^n\end{aligned}`}</Eq>
          <Tx>{R`对幂级数逐项使用：`}</Tx>
          <Eq n="BII-46" say="对 $F(P)$ 的幂级数逐项求与 $X$ 的对易子。">{R`[X,F(P)]=\sum_n[X,f_nP^n]=\sum_ni\hbar nf_nP^{n-1}`}</Eq>
          <Tx>{R`右边的级数正是导函数 $F'(z)=\sum_nnf_nz^{n-1}$ 换成 $P$：`}</Tx>
          <Eq n="BII-47" keyEq title={R`$[X,F(P)]=i\hbar F'(P)$`} say="位置算符与动量的任意函数的对易子，等于 $i\hbar$ 乘以该函数的导函数：在与 $X$ 的对易子中，$P$ 的函数表现得像被求了导。">{R`[X,F(P)]=i\hbar\,F'(P)`}</Eq>
          <Tx>{R`把 $X$ 与 $P$ 的角色对调（对易子变号）：`}</Tx>
          <Eq n="BII-48" keyEq title={R`$[P,G(X)]=-i\hbar G'(X)$`} say="动量算符与位置的任意函数的对易子，等于 $-i\hbar$ 乘以导函数；例如与势能的对易子给出力。">{R`[P,G(X)]=-i\hbar\,G'(X)`}</Eq>
          <Box kind="physics" title="对易子里的导数就是力">{R`取 $G=V$：$[P,V(X)]=-i\hbar V'(X)$。第 III 章会看到 $\frac{\dd}{\dd t}\langle P\rangle=\frac1{i\hbar}\langle[P,H]\rangle=-\langle V'(X)\rangle$——这就是 Ehrenfest 定理里"平均动量的变化率等于平均力"，\eqref{BII-48} 是它的代数核心。`}</Box>
          <Tx>{R`**两点补充。**

① 上面的论证依赖于 $F$ 只含 $P$（或 $G$ 只含 $X$）。像 $[X,\Phi(X,P)]$ 这样两者都含的情形要难得多：$\Phi$ 中 $X$、$P$ 的排列次序本身就有歧义。

② 推导里真正用到的只是"对易子是个与 $X$、$P$ 都对易的数"。所以对任意两个与自身对易子对易的算符，结论照样成立：若`}</Tx>
          <Eq n="BII-49" say="条件：$A$ 和 $B$ 都与它们的对易子 $C$ 对易。">{R`[A,C]=[B,C]=0`}</Eq>
          <Tx>{R`其中`}</Tx>
          <Eq n="BII-50" say="$C$ 是 $A$ 与 $B$ 的对易子。">{R`C=[A,B]`}</Eq>
          <Tx>{R`则`}</Tx>
          <Eq n="BII-51" keyEq title={R`推广：$[A,F(B)]=[A,B]F'(B)$`} say="若 $A$、$B$ 都与它们的对易子对易，则 $A$ 与 $F(B)$ 的对易子等于 $[A,B]$ 乘以导函数 $F'(B)$。">{R`[A,F(B)]=[A,B]F'(B)`}</Eq>
          <Derivation title="(BII-51) 的归纳证明" collapsed steps={[
            { tex: R`[A,B^{n+1}]=[A,B]B^n+B[A,B^n]`, why: R`乘积法则 \eqref{BII-12}。` },
            { tex: R`=CB^n+B\,nCB^{n-1}=CB^n+nCB^n=(n+1)CB^n`, why: R`归纳假设 $[A,B^n]=nCB^{n-1}$，并用 $[B,C]=0$ 把 $C$ 移到 $B$ 的左边。没有 $[B,C]=0$ 这一步就做不下去。` },
            { tex: R`[A,F(B)]=\sum_nf_n\,nCB^{n-1}=C\,F'(B)`, why: R`对级数逐项求和。条件 $[A,C]=0$ 在这里没直接出现，但它保证 $C$ 与 $A$ 的函数也对易，下面 §5-d 要用。` },
          ]} />
        </Sub>
      </Sub>

      <Sub n="BII-5" title="Derivative of an operator" zh="算符的导数">
        <Sub n="BII-5-a" title="Definition" zh="定义">
          <Tx>{R`含参数的算符 $A(t)$（例如时间演化算符 $U(t)$）需要求导。定义与普通函数一样，用差商的极限：`}</Tx>
          <Eq n="BII-52" say="算符对参数的导数：差商的极限，与普通函数完全一样。">{R`\frac{\dd A}{\dd t}=\lim_{\Delta t\to0}\frac{A(t+\Delta t)-A(t)}{\Delta t}`}</Eq>
          <Tx>{R`**实际怎么算。**取一组不依赖 $t$ 的基 $\{\ket{u_i}\}$，矩阵元是 $t$ 的普通函数：`}</Tx>
          <Eq n="BII-53" say="在不随 $t$ 变化的基中，$A(t)$ 的矩阵元是 $t$ 的普通函数。">{R`\braket{u_i|A|u_j}=A_{ij}(t)`}</Eq>
          <Tx>{R`记导数算符的矩阵元为 $\left(\frac{\dd A}{\dd t}\right)_{ij}=\left\langle u_i\left|\frac{\dd A}{\dd t}\right|u_j\right\rangle$。因为基不动，取矩阵元和取极限可以交换：`}</Tx>
          <Eq n="BII-54" say="导数算符的矩阵就是把原矩阵逐个元素求导，位置不变。">{R`\left(\frac{\dd A}{\dd t}\right)_{ij}=\frac{\dd}{\dd t}A_{ij}`}</Eq>
          <Tx>{R`规则：**逐元素求导，不挪位置**。（基若随 $t$ 变，就不能这样做——那时还要加上基矢本身变化的贡献。）`}</Tx>
        </Sub>
        <Sub n="BII-5-b" title="Differentiation rules" zh="求导法则">
          <Eq n="BII-55" say="和的导数等于导数之和。">{R`\frac{\dd}{\dd t}(F+G)=\frac{\dd F}{\dd t}+\frac{\dd G}{\dd t}`}</Eq>
          <Eq n="BII-56" keyEq title="乘积求导：保持次序" say="乘积的导数：先对 $F$ 求导、$G$ 留在右边，再对 $G$ 求导、$F$ 留在左边——两个因子的先后次序必须保持。">{R`\frac{\dd}{\dd t}(FG)=\frac{\dd F}{\dd t}G+F\frac{\dd G}{\dd t}`}</Eq>
          <Tx>{R`和普通 Leibniz 法则唯一的区别：不许把 $\frac{\dd F}{\dd t}G$ 写成 $G\frac{\dd F}{\dd t}$。证明就用上面的"逐元素求导"：先把乘积的矩阵元写成矩阵乘法`}</Tx>
          <Eq n="BII-57" say="乘积 $FG$ 的矩阵元等于两个矩阵元乘积对中间指标求和（插入封闭关系）。">{R`\braket{u_i|FG|u_j}=\sum_k\braket{u_i|F|u_k}\,\braket{u_k|G|u_j}`}</Eq>
          <Tx>{R`右边每一项是两个普通函数之积，用普通的乘积法则，再把封闭关系收回：`}</Tx>
          <Eq n="BII-58" say="对矩阵元逐项用普通的乘积求导法则，再收回封闭关系，得到保持次序的算符乘积法则。">{R`\begin{aligned}\left\langle u_i\left|\frac{\dd}{\dd t}(FG)\right|u_j\right\rangle&=\sum_k\left[\left\langle u_i\left|\frac{\dd F}{\dd t}\right|u_k\right\rangle\braket{u_k|G|u_j}+\braket{u_i|F|u_k}\left\langle u_k\left|\frac{\dd G}{\dd t}\right|u_j\right\rangle\right]\\&=\left\langle u_i\left|\frac{\dd F}{\dd t}G+F\frac{\dd G}{\dd t}\right|u_j\right\rangle\end{aligned}`}</Eq>
        </Sub>
        <Sub n="BII-5-c" title="Examples" zh="例子：指数的导数">
          <Tx>{R`$A$ 不依赖 $t$，看 $\mathrm e^{At}$：`}</Tx>
          <Eq n="BII-59" say="算符指数 $\mathrm e^{At}$ 的幂级数定义。">{R`\mathrm e^{At}=\sum_{n=0}^\infty\frac{(At)^n}{n!}`}</Eq>
          <Tx>{R`逐项对 $t$ 求导（$t$ 是数，$A$ 是常算符），$n=0$ 项消失，提出一个 $A$——可以提到左边，也可以提到右边，因为它和 $A$ 的幂对易：`}</Tx>
          <Eq n="BII-60" say="对级数逐项求导：每一项拉下一个 $A$，剩下的级数（指标平移一位）仍是 $\mathrm e^{At}$。">{R`\begin{aligned}\frac{\dd}{\dd t}\mathrm e^{At}&=\sum_{n=0}^\infty n\frac{t^{n-1}A^n}{n!}\\&=A\sum_{n=1}^\infty\frac{(At)^{n-1}}{(n-1)!}\\&=\left[\sum_{n=1}^\infty\frac{(At)^{n-1}}{(n-1)!}\right]A\end{aligned}`}</Eq>
          <Tx>{R`令 $p=n-1$，方括号里就是 $\mathrm e^{At}$：`}</Tx>
          <Eq n="BII-61" keyEq title="算符指数的导数" say="$\mathrm e^{At}$ 的导数是 $A$ 乘以它自己；$A$ 写在左边还是右边都可以，因为 $A$ 与 $\mathrm e^{At}$ 对易。">{R`\frac{\dd}{\dd t}\mathrm e^{At}=A\,\mathrm e^{At}=\mathrm e^{At}A`}</Eq>
          <Tx>{R`**两个算符时次序就要紧了。**对 $\mathrm e^{At}\mathrm e^{Bt}$ 用乘积法则 \eqref{BII-56} 与 \eqref{BII-61}：`}</Tx>
          <Eq n="BII-62" say="两个指数之积的导数：$A$ 可以写在最左边，$B$ 必须夹在两个指数之间（或写在最右边），不能合并成 ($A$+$B$)。">{R`\frac{\dd}{\dd t}(\mathrm e^{At}\mathrm e^{Bt})=A\mathrm e^{At}\mathrm e^{Bt}+\mathrm e^{At}\,B\mathrm e^{Bt}`}</Eq>
          <Tx>{R`$A$ 可以在 $\mathrm e^{At}$ 两侧移动，$B$ 可以在 $\mathrm e^{Bt}$ 两侧移动，所以右边也可写成 $\mathrm e^{At}A\mathrm e^{Bt}+\mathrm e^{At}B\mathrm e^{Bt}$ 或 $\mathrm e^{At}A\mathrm e^{Bt}+\mathrm e^{At}\mathrm e^{Bt}B$；但 $B$ 无法越过 $\mathrm e^{At}$，因此除非 $[A,B]=0$，永远写不成 $(A+B)\mathrm e^{At}\mathrm e^{Bt}$。`}</Tx>
          <Box kind="warning" title="即使只有一个算符，链式法则也可能失效">{R`若 $A(t)$ 本身随 $t$ 变，一般 $\frac{\dd}{\dd t}\mathrm e^{A(t)}\neq\frac{\dd A}{\dd t}\mathrm e^{A(t)}$。看二阶项：$\frac{\dd}{\dd t}\frac{A^2}{2}=\frac12\left(\frac{\dd A}{\dd t}A+A\frac{\dd A}{\dd t}\right)$，只有 $A$ 与 $\frac{\dd A}{\dd t}$ 对易时才等于 $\frac{\dd A}{\dd t}A$。含时哈密顿量的演化算符不能简单写成 $\exp\!\left(-\frac i\hbar\int H\,\dd t\right)$，根源就在这里。`}</Box>
        </Sub>
        <Sub n="BII-5-d" title="An application: a useful formula" zh="应用：Glauber 公式">
          <Tx>{R`**目标。**§4-a 说过 $\mathrm e^A\mathrm e^B\neq\mathrm e^{A+B}$。在一个常见的特殊情形——$A$、$B$ 都与 $[A,B]$ 对易——可以精确算出差了什么：`}</Tx>
          <Eq n="BII-63" keyEq title="Glauber 公式" say="若 $A$、$B$ 都与它们的对易子对易，则两个指数之积等于和的指数再乘以“半个对易子”的指数修正因子。">{R`\mathrm e^A\mathrm e^B=\mathrm e^{A+B}\,\mathrm e^{\frac12[A,B]}`}</Eq>
          <Tx>{R`**策略：引入参数，化为微分方程。**直接展开级数很繁；把 $A$、$B$ 都乘一个参数 $t$，研究`}</Tx>
          <Eq n="BII-64" say="引入一个实参数 $t$，研究算符函数 $F(t)$：$t=1$ 时即为要求的乘积。">{R`F(t)=\mathrm e^{At}\,\mathrm e^{Bt}`}</Eq>
          <Tx>{R`由 \eqref{BII-62}，并在第二项里人为插入 $\mathrm e^{-At}\mathrm e^{At}=\mathbb 1$，使两项都以 $F(t)$ 结尾：`}</Tx>
          <Eq n="BII-65" say="$F$ 的导数写成“某个算符乘以 $F(t)$”的形式，那个算符是 $A$ 加上被 $\mathrm e^{At}$ 夹住的 $B$。">{R`\frac{\dd F}{\dd t}=A\mathrm e^{At}\,\mathrm e^{Bt}+\mathrm e^{At}\,B\mathrm e^{Bt}=(A+\mathrm e^{At}\,B\mathrm e^{-At})F(t)`}</Eq>
          <Tx>{R`剩下的问题是"$B$ 被 $\mathrm e^{At}$ 夹住后变成什么"。用 \eqref{BII-51}（以 $\mathrm e^{At}$ 为 $A$ 的函数，导函数是 $t\mathrm e^{At}$；条件正是 $A$、$B$ 与 $[A,B]$ 对易）：`}</Tx>
          <Eq n="BII-66" say="$\mathrm e^{At}$ 与 $B$ 的对易子：等于 $t[A,B]$ 乘以 $\mathrm e^{At}$，这是推广公式 (BII-51) 的直接应用。">{R`[\mathrm e^{At},B]=t[A,B]\mathrm e^{At}`}</Eq>
          <Tx>{R`即`}</Tx>
          <Eq n="BII-67" say="把 $B$ 从 $\mathrm e^{At}$ 的右边移到左边，要付出一项 $t[A,B]\mathrm e^{At}$。">{R`\mathrm e^{At}\,B=B\,\mathrm e^{At}+t[A,B]\mathrm e^{At}`}</Eq>
          <Tx>{R`右乘 $\mathrm e^{-At}$ 得 $\mathrm e^{At}B\mathrm e^{-At}=B+t[A,B]$，代回 \eqref{BII-65}：`}</Tx>
          <Eq n="BII-68" say="$F(t)$ 满足一阶线性微分方程，系数是 $A+B+t[A,B]$。">{R`\frac{\dd F}{\dd t}=\Big(A+B+t[A,B]\Big)F(t)`}</Eq>
          <Tx>{R`系数里的 $A+B$ 与 $[A,B]$ 互相对易（假设如此），所以这个方程可以当作数的方程来积分——对数的情形，$\dd F/\dd t=(\alpha+\beta t)F$ 的解是 $F(0)\mathrm e^{\alpha t+\beta t^2/2}$：`}</Tx>
          <Eq n="BII-69" say="积分微分方程：指数上是系数对 $t$ 的积分，即 $(A+B)t+\frac12[A,B]t^2$。">{R`F(t)=F(0)\mathrm e^{(A+B)t+\frac12[A,B]t^2}`}</Eq>
          <Tx>{R`由 \eqref{BII-64}，$F(0)=\mathbb 1$：`}</Tx>
          <Eq n="BII-70" say="对任意 $t$ 成立的 Glauber 公式；令 $t=1$ 即得 (BII-63)。">{R`F(t)=\mathrm e^{(A+B)t+\frac12[A,B]t^2}`}</Eq>
          <Tx>{R`令 $t=1$，再用 \eqref{BII-33} 把对易的 $A+B$ 与 $\frac12[A,B]$ 的指数拆开，就是 \eqref{BII-63}。`}</Tx>
          <Derivation title={R`为什么 \eqref{BII-69} 可以"当作数来积分"`} collapsed steps={[
            { tex: R`K(t)\equiv(A+B)t+\tfrac12[A,B]t^2,\qquad \frac{\dd K}{\dd t}=A+B+t[A,B]`, why: R`构造指数上的算符。` },
            { tex: R`\Big[K(t),\frac{\dd K}{\dd t}\Big]=0`, why: R`$K$ 与 $\dd K/\dd t$ 都只含 $A+B$ 与 $[A,B]$，二者对易。` },
            { tex: R`\frac{\dd}{\dd t}\mathrm e^{K(t)}=\frac{\dd K}{\dd t}\,\mathrm e^{K(t)}`, why: R`正因为上一行，§5-c 末尾警告的链式法则失效不会发生（展开级数逐项检验）。所以 $\mathrm e^{K(t)}$ 满足 \eqref{BII-68}，且 $t=0$ 时为 $\mathbb 1$；一阶线性方程的解唯一，故 $F(t)=\mathrm e^{K(t)}$。` },
          ]} />
          <Box kind="key" title="什么时候能用 Glauber 公式">{R`条件"$A$、$B$ 都与 $[A,B]$ 对易"看起来苛刻，但量子力学里最常见的一对恰好满足：$[X,P]=i\hbar$ 是个数；谐振子的 $a$、$a^\dagger$ 满足 $[a,a^\dagger]=1$（第 V 章）。相干态、平移算符的乘法规则都由它而来。对角动量分量 $[J_x,J_y]=i\hbar J_z$ 就**不能**用。下图让你亲手比较两种情形。`}</Box>
          <Fig n="B-1" caption={R`交互（自绘）：用矩阵数值检验 Glauber 公式。"Heisenberg 型"取 $3\times3$ 矩阵 $A=a\,E_{12}$、$B=b\,E_{23}$（$E_{ij}$ 为 $(i,j)$ 元为 1 的矩阵），$[A,B]=ab\,E_{13}$ 与 $A$、$B$ 都对易；"Pauli 型"取 $A=i\alpha\sigma_x$、$B=i\alpha\sigma_y$，对易子 $\propto\sigma_z$ 不与它们对易。表中列出 Frobenius 范数下的偏差。`}><GlauberDemo /></Fig>
        </Sub>
      </Sub>
    </Sec>);
}
