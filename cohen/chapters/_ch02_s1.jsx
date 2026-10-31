// §A 单粒子波函数空间 —— 式 (A-1)–(A-68)，表 (II-1)–(II-4)
import { Sec, Sub, Tx, Eq, Box, Derivation, Table, C } from "@kit";
import { BoxBasisPlot, IFig } from "./_ch02_plots.jsx";

const R = String.raw;

export function SecA() {
  return (
    <Sec n="A" title="Space of the one-particle wave function" zh="单粒子波函数空间"
      gist={R`把波函数看成一个**矢量空间** $\mathscr F$ 的元素：定义标量积、线性算符，再用**正交归一基**把每个波函数换成一组"分量"——离散基给出数列 $\{c_i\}$，平面波与 $\delta$ 函数这类"连续基"给出 $\bar\psi(\mathbf p)$ 与 $\psi(\mathbf r_0)$ 本身。`}
      why={R`第 I 章把粒子的态写成一个函数 $\psi(\mathbf r)$。要把量子力学变成可计算的理论，必须先看清：这个函数其实是一个矢量，而"选坐标轴"（选基）的自由，正是后面一切表象理论的起点。`}
      gives={["A-4", "A-15", "A-17", "A-18", "A-19", "A-21", "A-26", "A-32", "A-35", "A-41", "A-48", "A-56", "A-57"]}>
      <p className="muted">本节概念：<C id="hilbert" /> · <C id="basis" /> · <C id="closure" /> · <C id="continuous_basis" /></p>

      <Tx>{R`**本章是"工具章"。**它不引入新的物理假设，只做一件事：把后面每一页都要用到的数学语言一次备齐。作者在章首坦言追求的是实用而非严格（原书语："We make no attempt to be mathematically complete or rigorous."）——无穷维空间常被当成有限维来推理，"平方可积""基"等词也按物理学家的习惯使用。我们照此办理，但在真正需要小心的地方（算符可能把函数带出空间、连续基不可归一）会专门停下来提醒。

**讲法上的路线**：先在已经熟悉的波函数上把"矢量空间"的全套概念走一遍（§A），再把它抽象成与具体函数无关的 Dirac 记号（§B），学会"选坐标"即表象（§C），然后进入物理上最核心的本征值问题与可观测量（§D），用位置和动量这两个最重要的例子把一切串起来（§E），最后学习把几个子系统组装成一个整体的张量积（§F）。`}</Tx>

      <Tx>{R`**起点：概率要加起来等于 1。**第 I 章给 $|\psi(\mathbf r,t)|^2$ 的解释是概率密度——乘上体积元 $\dd^3r=\dd x\,\dd y\,\dd z$ 就是在那一小块里找到粒子的概率。粒子总得在某处，于是对全空间求和必须是 1：`}</Tx>
      <Eq n="A-1" say="粒子在全空间某处被找到的概率为 1：这要求波函数模方的积分收敛——波函数必须平方可积。">{R`\int \dd^3r\,|\psi(\mathbf r,t)|^2=1`}</Eq>
      <Tx>{R`所以第一个问题是：**哪些函数有资格当波函数？**至少得让 \eqref{A-1} 的积分有限——即平方可积。数学上这类函数组成 Hilbert 空间 $L^2$。

但物理学家并不需要 $L^2$ 的全部。$L^2$ 里充满病态的成员：处处不连续、导数不存在……而"波函数在某点真的有个跳变"这种说法本身就没有可检验的内容——我们永远无法以 $10^{-30}\,\mathrm m$ 的精度去看。于是我们心安理得地只保留足够光滑（处处有定义、连续、无穷次可微）的函数，必要时还可以只要求在有限区域（比如实验室）外为零。这个"足够正规"的子集记作 $\mathscr F$，叫**波函数空间**；它的精确边界，本书有意不去划定。`}</Tx>
      <Box kind="note" title="为什么不直接用 $L^2$？">{R`这是物理学家的实用主义：$L^2$ 中有许多"病态"函数（处处不连续、导数不存在……），对它们作用 $\partial/\partial x$ 之类的算符毫无意义。限制到 $\mathscr F$ 可以让后面的算符运算畅通无阻，而又不丢掉任何物理上可以实现的态。代价是 $\mathscr F$ 的边界说不清楚——本书有意不追究这一点。`}</Box>

      <Sub n="A-1" title="Structure of the wave function space F" zh="波函数空间 $\mathscr F$ 的结构">
        <Sub n="A-1-a" title="F is a vector space" zh="$\mathscr F$ 是矢量空间">
          <Tx>{R`**本小节要检查的只有一件事：叠加不会"溢出"空间。**矢量空间的其余公理（交换律、零元、数乘……）对函数显然成立；唯一不显然的是，两个平方可积函数的线性组合是否仍平方可积——这正是叠加原理能在数学上站住的前提。要证的命题是：`}</Tx>
          <Eq n="A-2" say="平方可积函数的任意复线性组合仍平方可积：叠加原理在数学上能成立的前提。">{R`\psi(\mathbf r)=\lambda_1\psi_1(\mathbf r)+\lambda_2\psi_2(\mathbf r)\in\mathscr F`}</Eq>
          <Tx>{R`（$\lambda_1,\lambda_2$ 为任意复数。）策略是把组合的模方展开，看每一项能否被可积的东西压住：`}</Tx>
          <Eq n="A-3" say="叠加态的模方 = 两个分量各自的模方 + 两个干涉项；干涉项互为复共轭，其和为实数。">{R`|\psi(\mathbf r)|^2=|\lambda_1|^2|\psi_1(\mathbf r)|^2+|\lambda_2|^2|\psi_2(\mathbf r)|^2+\lambda_1^*\lambda_2\,\psi_1^*(\mathbf r)\psi_2(\mathbf r)+\lambda_1\lambda_2^*\,\psi_1(\mathbf r)\psi_2^*(\mathbf r)`}</Eq>
          <Tx>{R`前两项本来就可积；麻烦只在交叉项（干涉项），它可正可负，需要一个上界：`}</Tx>
          <Derivation title="干涉项的上界" steps={[
            { tex: R`0\le\big|\,|\psi_1(\mathbf r)|-|\psi_2(\mathbf r)|\,\big|^2=|\psi_1|^2+|\psi_2|^2-2|\psi_1||\psi_2|`, why: R`任何实数的平方非负。（原书写法是：对任意实数 $\alpha$，$|\psi_1+e^{i\alpha}\psi_2|^2\ge0$，取适当的 $\alpha$ 即得同一结论。）` },
            { tex: R`\big|\lambda_1^*\lambda_2\psi_1^*\psi_2+\lambda_1\lambda_2^*\psi_1\psi_2^*\big|\le 2|\lambda_1||\lambda_2||\psi_1||\psi_2|\le|\lambda_1||\lambda_2|\left[|\psi_1|^2+|\psi_2|^2\right]`, why: R`两项互为复共轭，模都等于 $|\lambda_1||\lambda_2||\psi_1||\psi_2|$；再用上一行的不等式。` },
          ]} result={R`$|\psi(\mathbf r)|^2$ 被一组积分收敛的函数之和从上方控制，所以 $\int|\psi|^2$ 也收敛：$\psi\in\mathscr F$。`} />
        </Sub>

        <Sub n="A-1-b" title="The scalar product" zh="标量积">
          <Tx>{R`**为什么还需要标量积。**光有加法与数乘，只能谈"方向"，不能谈"多长""多正交"。我们想把三维空间的点积搬到函数上——对每一对**有序**的函数指定一个复数：`}</Tx>
          <Eq n="A-4" keyEq title="波函数的标量积" say="两个波函数的标量积：把左边的函数取复共轭，与右边的函数逐点相乘再对全空间积分；结果一般是复数。">{R`(\varphi,\psi)=\int\dd^3r\;\varphi^*(\mathbf r)\,\psi(\mathbf r)`}</Eq>
          <Tx>{R`叫作 $\psi$ 与 $\varphi$ 的**标量积**。（它一定收敛：$|\varphi^*\psi|\le\frac12(|\varphi|^2+|\psi|^2)$，与 A-1-a 是同一个技巧。）

**它不是对称的——这是第一个要记住的地方。**从定义直接读出三条性质：`}</Tx>
          <Eq n="A-5" say="交换标量积的两个因子，结果变成原来的复共轭——标量积不对称，但'厄米对称'。">{R`(\varphi,\psi)=(\psi,\varphi)^*`}</Eq>
          <Eq n="A-6" say="标量积对右边的函数是线性的：系数原样提出来。">{R`(\varphi,\lambda_1\psi_1+\lambda_2\psi_2)=\lambda_1(\varphi,\psi_1)+\lambda_2(\varphi,\psi_2)`}</Eq>
          <Eq n="A-7" say="标量积对左边的函数是反线性的：系数提出来时要取复共轭。">{R`(\lambda_1\varphi_1+\lambda_2\varphi_2,\psi)=\lambda_1^*(\varphi_1,\psi)+\lambda_2^*(\varphi_2,\psi)`}</Eq>
          <Tx>{R`口诀：**右边线性，左边反线性**（antilinear）——系数从左边提出来要带星号。这是物理学的约定，许多数学书恰好相反，查公式时要留意。标量积为零就说两函数**正交**。

把同一个函数放在两边，就得到"长度"的平方：`}</Tx>
          <Eq n="A-8" say="函数与自身的标量积就是模方的积分：一个非负实数，且只有恒为零的函数才给出零。">{R`(\psi,\psi)=\int\dd^3r\;|\psi(\mathbf r)|^2`}</Eq>
          <Tx>{R`被积函数非负，所以它是**正实数**，且只有 $\psi\equiv0$ 时为零。于是 $\sqrt{(\psi,\psi)}$ 可以当范数用（范数的其余公理也都满足）。最后记一个以后反复用到的不等式——**Schwarz 不等式**（证明见补充材料 $\mathrm{A_{II}}$）：`}</Tx>
          <Eq n="A-9" say="两个函数标量积的模不超过它们范数之积；当且仅当两函数成比例时取等号——这是'夹角余弦的绝对值不超过 1'的推广。">{R`|(\psi_1,\psi_2)|\leqslant\sqrt{(\psi_1,\psi_1)}\,\sqrt{(\psi_2,\psi_2)}`}</Eq>
          <Box kind="physics" title="几何直觉">{R`在普通三维空间里 $|\mathbf a\cdot\mathbf b|\le|\mathbf a||\mathbf b|$，等号在两矢量共线时成立。\eqref{A-9} 就是同一件事搬到函数空间：$|(\psi_1,\psi_2)|/\sqrt{(\psi_1,\psi_1)(\psi_2,\psi_2)}$ 扮演"夹角余弦的模"。到了第 III 章，它的平方将成为"在态 $\psi_1$ 中测得态 $\psi_2$ 的概率"，Schwarz 不等式保证这个概率不超过 1。`}</Box>
        </Sub>

        <Sub n="A-1-c" title="Linear operators" zh="线性算符">
          <Tx>{R`**算符：把函数变成函数的线性规则。**量子力学里，物理操作（反射、乘以坐标、求导……）都表现为作用在波函数上的线性映射：`}</Tx>
          <Eq n="A-10-a" say="算符作用在一个函数上，得到另一个函数。">{R`\psi'(\mathbf r)=A\psi(\mathbf r)`}</Eq>
          <Eq n="A-10-b" say="线性：作用在叠加上等于分别作用后再叠加。">{R`A[\lambda_1\psi_1(\mathbf r)+\lambda_2\psi_2(\mathbf r)]=\lambda_1A\psi_1(\mathbf r)+\lambda_2A\psi_2(\mathbf r)`}</Eq>
          <Tx>{R`下面三个例子会在全书反复出现。

◆ **宇称算符** $\Pi$：把函数关于原点翻转。`}</Tx>
          <Eq n="A-11" say="宇称算符把波函数在原点处做空间反演：新函数在 r 点的值等于旧函数在 $-r$ 点的值。">{R`\Pi\psi(x,y,z)=\psi(-x,-y,-z)`}</Eq>
          <Tx>{R`◆ **乘以坐标的算符** $X$：逐点乘上 $x$。`}</Tx>
          <Eq n="A-12" say="X 算符就是把波函数逐点乘以坐标 x。">{R`X\psi(x,y,z)=x\,\psi(x,y,z)`}</Eq>
          <Tx>{R`◆ **求导算符** $D_x$：对 $x$ 求偏导。`}</Tx>
          <Eq n="A-13" say="$D_x$ 算符就是对 x 求偏导。">{R`D_x\psi(x,y,z)=\frac{\partial\psi(x,y,z)}{\partial x}`}</Eq>
          <Box kind="warning" title="算符可能把你带出 $\mathscr F$">{R`$X$ 与 $D_x$ 作用在 $\psi\in\mathscr F$ 上，结果**不一定**仍平方可积。例如 $\psi(x)\propto 1/(1+x^2)^{1/2}$ 在一维是平方可积的（$\int\dd x/(1+x^2)$ 收敛），但 $x\psi$ 在大 $|x|$ 处趋于常数，不再平方可积。这是无穷维空间与有限维空间的本质差别之一；本书照例不深究，但读者应知道它的存在。`}</Box>
          <Tx>{R`**两个算符连用。**乘积 $AB$ 的意思是"先做 $B$，再做 $A$"：`}</Tx>
          <Eq n="A-14" say="算符乘积 AB 作用在函数上：先让 B 作用，再让 A 作用在结果上（从右往左读）。">{R`(AB)\psi(\mathbf r)=A\left[B\psi(\mathbf r)\right]`}</Eq>
          <Tx>{R`读法是从右往左：$B$ 先把 $\psi$ 变成 $\varphi=B\psi$，$A$ 再作用在 $\varphi$ 上。和矩阵乘法一样，**次序一般不能交换**。衡量两个算符"有多不对易"的量是**对易子**（commutator）：`}</Tx>
          <Eq n="A-15" keyEq title="对易子" say="对易子衡量两个算符交换顺序后的差别；它为零当且仅当两算符可交换。">{R`[A,B]=AB-BA`}</Eq>
          <Tx>{R`**例：$[X,D_x]$。**算符之间的等式意味着"对任意函数作用结果相等"，所以计算对易子的标准办法是：让它作用在一个任意的 $\psi(\mathbf r)$ 上。`}</Tx>
          <Eq n="A-16" say="把对易子作用在任意波函数上：乘以 x 与求导交换顺序时，莱布尼茨法则多出一项 $-\psi$。">{R`\begin{aligned}[X,D_x]\,\psi(\mathbf r)&=\left(x\frac{\partial}{\partial x}-\frac{\partial}{\partial x}x\right)\psi(\mathbf r)\\&=x\frac{\partial}{\partial x}\psi(\mathbf r)-\frac{\partial}{\partial x}\left[x\psi(\mathbf r)\right]\\&=x\frac{\partial}{\partial x}\psi(\mathbf r)-\psi(\mathbf r)-x\frac{\partial}{\partial x}\psi(\mathbf r)=-\psi(\mathbf r)\end{aligned}`}</Eq>
          <Tx>{R`两边对**任意** $\psi$ 都相等，才有资格去掉 $\psi$ 写成算符等式：`}</Tx>
          <Eq n="A-17" keyEq title="[X, $D_x]$ = $-1$" say="'乘以 x'与'对 x 求导'不对易，差一个常数 $-1$；乘上 $-i\hbar$ 之后，这就是 §E 中位置与动量的正则对易关系。">{R`[X,D_x]=-1`}</Eq>
          <Box kind="physics" title="伏笔：正则对易关系">{R`只要把 $D_x$ 乘上 $\hbar/i$——这正是 §E 中动量算符在位置表象中的样子，$P_x=\frac{\hbar}{i}D_x$——\eqref{A-17} 就变成 $[X,P_x]=i\hbar$。量子力学中位置与动量"测不准"的全部数学根源，就藏在这一行微积分里。`}</Box>
        </Sub>
      </Sub>

      <Sub n="A-2" title="Discrete orthonormal bases in F: ${u_i(r)}$" zh="$\mathscr F$ 中的离散正交归一基 $\{u_i(\mathbf r)\}$">
        <Sub n="A-2-a" title="Definition" zh="定义">
          <Tx>{R`**我们要做的事。**在三维空间里，选定三根正交的单位坐标轴后，一个矢量就等价于三个数。对函数空间，我们想做同样的事：选一组"坐标轴函数"，把每个波函数换成一串数。

考虑 $\mathscr F$ 中一组可数的函数 $u_1(\mathbf r),u_2(\mathbf r),\dots,u_i(\mathbf r),\dots$，用离散指标 $i=1,2,\dots,n,\dots$ 编号。

◆ 若满足下式，就称它们**正交归一**（orthonormal）：`}</Tx>
          <Eq n="A-18" keyEq title="正交归一关系" say="基函数两两正交、各自长度为 1：不同指标的标量积为零，相同指标的标量积为 1。">{R`(u_i,u_j)=\int\dd^3r\;u_i^*(\mathbf r)\,u_j(\mathbf r)=\delta_{ij}`}</Eq>
          <Tx>{R`（$\delta_{ij}$ 是 Kronecker 符号：$i=j$ 时为 1，否则为 0。）

◆ **基（够用）：**每个 $\psi\in\mathscr F$ 都能而且只能以一种方式写成它们的组合：`}</Tx>
          <Eq n="A-19" keyEq title="按离散基展开" say="任一波函数都能唯一地写成基函数的线性组合；系数 $c_i$ 就是它在这组基下的'坐标'。">{R`\psi(\mathbf r)=\sum_i c_i\,u_i(\mathbf r)`}</Eq>
          <Box kind="note" title="术语">{R`物理文献里常说构成基的函数组是"完备的"（complete set of functions）。注意这里的"完备"与数学中"完备空间"（Cauchy 序列收敛）是两回事。`}</Box>
        </Sub>

        <Sub n="A-2-b" title="Components of a wave function in the ${u_i(r)}$ basis" zh="波函数在 $\{u_i(\mathbf r)\}$ 基下的分量">
          <Tx>{R`**怎样读出 $c_i$？**拿 $u_j$ 去和展开式作标量积：右边对第二个函数线性（\eqref{A-6}），可以逐项算；正交归一 \eqref{A-18} 让除 $i=j$ 外的项全部为零。（中间交换了求和与积分，本书一律不追究这种操作的合法性。）`}</Tx>
          <Eq n="A-20" say="用 $u_j$ 和展开式作标量积，正交归一性把求和'筛'得只剩第 j 项。">{R`\begin{aligned}(u_j,\psi)&=\Big(u_j,\sum_i c_i\,u_i\Big)=\sum_i c_i\,(u_j,u_i)\\&=\sum_i c_i\,\delta_{ij}=c_j\end{aligned}`}</Eq>
          <Tx>{R`也就是`}</Tx>
          <Eq n="A-21" keyEq title="分量 = 标量积" say="波函数在第 i 个基函数上的分量，等于该基函数与波函数的标量积——就像矢量在某轴上的分量等于它与该轴单位矢的点积。">{R`c_i=(u_i,\psi)=\int\dd^3r\;u_i^*(\mathbf r)\,\psi(\mathbf r)`}</Eq>
          <Tx>{R`**这一步的意义：**选定基以后，函数和它的一串分量是**同一信息的两种写法**——我们说数列 $\{c_i\}$ 在这组基中**表示**（represent）$\psi$。`}</Tx>
          <Box kind="physics" title="与三维矢量的类比">
            <Tx>{R`这些公式的原型就是三维实空间 $R^3$ 中的正交归一基 $\{\mathbf e_1,\mathbf e_2,\mathbf e_3\}$。"正交且是单位长度"写成`}</Tx>
            <Eq n="A-22" say="三维空间的三个坐标单位矢两两垂直、长度为 1。">{R`\mathbf e_i\cdot\mathbf e_j=\delta_{ij}\qquad(i,j=1,2,3)`}</Eq>
            <Tx>{R`任一 $\mathbf V$ 展开为`}</Tx>
            <Eq n="A-23" say="任一三维矢量是三个坐标单位矢的线性组合。">{R`\mathbf V=\sum_{i=1}^{3}v_i\,\mathbf e_i`}</Eq>
            <Tx>{R`分量靠点积读出：`}</Tx>
            <Eq n="A-24" say="矢量在某轴上的分量等于它与该轴单位矢的点积。">{R`v_i=\mathbf e_i\cdot\mathbf V`}</Eq>
            <Tx>{R`三对公式逐一对应：\eqref{A-18}↔\eqref{A-22}、\eqref{A-19}↔\eqref{A-23}、\eqref{A-21}↔\eqref{A-24}。**两处差别要记住：**$c_i$ 是复数，所以 \eqref{A-21} 里多了一个共轭；坐标轴从 3 根变成了无穷多根。`}</Tx>
          </Box>
          <Tx>{R`顺带预告两件事：换一组基，同一函数的分量会变（§C-5 讲怎样换算）；在 $\{u_i\}$ 基中，算符也会变成一张数表——矩阵（§C-4，有了 Dirac 记号再讲）。`}</Tx>
        </Sub>

        <Sub n="A-2-c" title="Expression for the scalar product in terms of the components" zh="用分量表示标量积">
          <Tx>{R`**目标：**用分量算标量积，不再做积分。把两个函数都放到同一组基上：`}</Tx>
          <Eq n="A-25" say="把两个波函数都在同一组离散基上展开，系数分别记为 $b_i$ 与 $c_j$。">{R`\begin{aligned}\varphi(\mathbf r)&=\sum_i b_i\,u_i(\mathbf r)\\\psi(\mathbf r)&=\sum_j c_j\,u_j(\mathbf r)\end{aligned}`}</Eq>
          <Tx>{R`代进标量积，左边的系数提出来要带共轭（\eqref{A-7}），右边的不带（\eqref{A-6}），剩下的基函数标量积由 \eqref{A-18} 筛选：
$$(\varphi,\psi)=\Big(\sum_i b_iu_i,\sum_j c_ju_j\Big)=\sum_{i,j}b_i^*c_j\,(u_i,u_j)=\sum_{i,j}b_i^*c_j\,\delta_{ij}$$
结果：`}</Tx>
          <Eq n="A-26" keyEq title="分量形式的标量积" say="标量积等于对应分量'左取共轭、右不取'后逐项相乘再求和：函数空间里的'点积'。">{R`(\varphi,\psi)=\sum_i b_i^*c_i`}</Eq>
          <Tx>{R`两边放同一个函数，长度平方就是分量模方之和：`}</Tx>
          <Eq n="A-27" say="波函数的模方积分等于它所有分量模方之和（Parseval 型等式）：归一化的波函数，其分量模方之和为 1。">{R`(\psi,\psi)=\sum_i|c_i|^2`}</Eq>
          <Tx>{R`拿三维的点积来对照：`}</Tx>
          <Eq n="A-28" say="三维矢量的点积等于对应分量乘积之和。">{R`\mathbf V\cdot\mathbf W=\sum_{i=1}^{3}v_i\,w_i`}</Eq>
          <Tx>{R`\eqref{A-26} 正是它的推广（多了一个复共轭）。这意味着：**积分 $\int\dd^3r\,\varphi^*\psi$ 可以完全换成一个数列的求和**——求积分变成了做"点积"。`}</Tx>
          <IFig id="box" title="离散基展开与 Parseval 等式" caption={R`交互图：在盒中正弦基 $u_n(x)=\sqrt{2}\sin(n\pi x)$（$0<x<1$）上展开一个归一化波函数。左图是前 $N$ 项的部分和与原函数，右图是分量 $|c_n|^2$；底部给出 $\sum_{n\le N}|c_n|^2$ ——按 \eqref{A-27} 它随 $N$ 增大趋于 1。有跳变或在边界不为零的函数收敛得慢（Gibbs 振荡），但"缺失的范数"照样趋于零。`}
><BoxBasisPlot /></IFig>
        </Sub>

        <Sub n="A-2-d" title="Closure relation" zh="封闭关系">
          <Tx>{R`**两条关系各管一件事。**\eqref{A-18} 叫**正交归一关系**，说的是基函数"各自长度为 1、彼此垂直"。但它不能保证"轴够用"：从三根坐标轴中拿掉一根，剩下两根依然正交归一，却不再能展开所有矢量。我们需要第二条关系来刻画"$\{u_i\}$ 确实是一组**基**"，这就是**封闭关系**（closure relation）。

推导很直接：把分量公式 \eqref{A-21} 代回展开式 \eqref{A-19}（积分变量改名为 $\mathbf r'$，因为 $\mathbf r$ 已被占用）：`}</Tx>
          <Eq n="A-29" say="把分量公式代回展开式：波函数在 r 点的值，用它在所有 r' 点的值通过基函数'重新拼出来'。">{R`\begin{aligned}\psi(\mathbf r)&=\sum_i c_i\,u_i(\mathbf r)=\sum_i(u_i,\psi)\,u_i(\mathbf r)\\&=\sum_i\left[\int\dd^3r'\;u_i^*(\mathbf r')\,\psi(\mathbf r')\right]u_i(\mathbf r)\end{aligned}`}</Eq>
          <Tx>{R`**让它冒出来的一步：**把求和移进积分里面：`}</Tx>
          <Eq n="A-30" say="交换求和与积分后，方括号里出现一个只依赖于基、不依赖于 $\psi$ 的双变量函数。">{R`\psi(\mathbf r)=\int\dd^3r'\;\psi(\mathbf r')\left[\sum_i u_i(\mathbf r)\,u_i^*(\mathbf r')\right]`}</Eq>
          <Tx>{R`**观察方括号：**它只依赖于基，与 $\psi$ 无关；记它为 $F(\mathbf r,\mathbf r')$。上式说的是：$F$ 与**任何** $\psi$ 作积分，都把 $\psi$ 原样还回来——`}</Tx>
          <Eq n="A-31" say="一个函数 F(r,r') 与任意 $\psi(r')$ 作积分都还原出 $\psi(r)$：这恰是 $\delta(r-r')$ 的定义性质。">{R`\psi(\mathbf r)=\int\dd^3r'\;\psi(\mathbf r')\,F(\mathbf r,\mathbf r')`}</Eq>
          <Tx>{R`具有这种"原样还回"性质的只有 $\delta(\mathbf r-\mathbf r')$（附录 II）。于是得到**封闭关系**：`}</Tx>
          <Eq n="A-32" keyEq title="封闭关系（离散基）" say="基函数的'外积之和'等于 $\delta$ 函数：这表示基是完备的——把每个方向上的分量加起来，能原封不动地还原任何函数。">{R`\sum_i u_i(\mathbf r)\,u_i^*(\mathbf r')=\delta(\mathbf r-\mathbf r')`}</Eq>
          <Tx>{R`**它确实刻画了"是基"——反向也通。**若一组正交归一函数满足 \eqref{A-32}，从 $\delta$ 函数的筛选性质出发：`}</Tx>
          <Eq n="A-33" say="$\delta$ 函数的筛选性质：任何函数都等于它与 $\delta(r-r')$ 的积分。">{R`\psi(\mathbf r)=\int\dd^3r'\;\psi(\mathbf r')\,\delta(\mathbf r-\mathbf r')`}</Eq>
          <Tx>{R`把 \eqref{A-32} 代给 $\delta$，就回到 \eqref{A-30}；再把求和挪出积分，便得到 \eqref{A-29}——这正好是"$\psi$ 能按 $u_i$ 展开"并且给出了系数。所以：**正交归一关系 + 封闭关系 = 正交归一基**，前者管"不重叠"，后者管"不遗漏"。§C 会给封闭关系一个更干净的几何读法：所有基矢方向的投影加起来等于单位算符。`}</Tx>
        </Sub>
      </Sub>

      <Sub n="A-3" title="Introduction of “bases” not belonging to F" zh="引入不属于 $\mathscr F$ 的「基」">
        <Tx>{R`**为什么要越出 $\mathscr F$。**目前的基函数都平方可积。可物理上最顺手的两组"坐标轴"——**平面波**（动量确定）与 **$\delta$ 函数**（位置确定）——都不平方可积。本小节要说明：任何波函数仍能按它们展开，而且离散基的全部公式只需做两处替换就能照搬：求和换积分，Kronecker $\delta$ 换 Dirac $\delta$。`}</Tx>

        <Sub n="A-3-a" title="Plane waves" zh="平面波">
          <Tx>{R`**先看一维。**第 I 章用过的 Fourier 变换对，本身就是一次"按平面波展开"：`}</Tx>
          <Eq n="A-34-a" say="一维波函数是不同动量平面波的叠加，叠加系数为其 Fourier 变换。">{R`\psi(x)=\frac{1}{\sqrt{2\pi\hbar}}\int_{-\infty}^{+\infty}\dd p\;\bar\psi(p)\,e^{ipx/\hbar}`}</Eq>
          <Eq n="A-34-b" say="逆变换：动量空间波函数由位置空间波函数乘以 $e^{-ipx/\hbar}$ 积分得到。">{R`\bar\psi(p)=\frac{1}{\sqrt{2\pi\hbar}}\int_{-\infty}^{+\infty}\dd x\;\psi(x)\,e^{-ipx/\hbar}`}</Eq>
          <Tx>{R`把被积函数里的平面波单独起个名字：`}</Tx>
          <Eq n="A-35" keyEq title="平面波基" say="动量为 p 的归一化平面波：在整个 x 轴上模方处处相同，因而不可归一，但可以当作'连续基'使用。">{R`v_p(x)=\frac{1}{\sqrt{2\pi\hbar}}\,e^{ipx/\hbar}`}</Eq>
          <Tx>{R`**它为什么不在 $\mathscr F$ 里？**$|v_p(x)|^2=\frac{1}{2\pi\hbar}$ 在整个 $x$ 轴上都一样大——一个铺满全空间、永不衰减的波，积分必然发散：$v_p\notin\mathscr F_x$（一维波函数空间）。可它仍然好用。把 $p$ 看作在 $(-\infty,+\infty)$ 上**连续取值的指标**（对比 $u_i$ 的离散指标 $i$），全体平面波 $\{v_p(x)\}$ 就扮演"基"的角色。用它重写 Fourier 变换对：`}</Tx>
          <Eq n="A-36" say="任一一维波函数可唯一地展开为平面波的'连续叠加'：对离散基的求和换成对 p 的积分。">{R`\psi(x)=\int_{-\infty}^{+\infty}\dd p\;\bar\psi(p)\,v_p(x)`}</Eq>
          <Eq n="A-37" say="Fourier 变换就是波函数在平面波 $v_p$ 上的分量，即它们的标量积。">{R`\bar\psi(p)=(v_p,\psi)=\int_{-\infty}^{+\infty}\dd x\;v_p^*(x)\,\psi(x)`}</Eq>
          <Tx>{R`**和离散基逐条对照。**\eqref{A-36} 是展开式 \eqref{A-19} 的翻版——求和 $\sum_i$ 换成了对连续指标的积分 $\int\dd p$；\eqref{A-37} 是分量公式 \eqref{A-21} 的翻版——分量仍是"基函数与 $\psi$ 的标量积"（$v_p$ 虽不平方可积，只要积分收敛，标量积照样能定义）。所以：

**Fourier 变换 $\bar\psi(p)$ 不过是 $\psi$ 在平面波基下的分量**，与 $c_i$ 是同一类东西，只是坐标轴换了。

范数也应该能用分量算出来——果然，Parseval 等式（附录 I）正是 \eqref{A-27} 的连续版本：`}</Tx>
          <Eq n="A-38" say="波函数在位置空间与动量空间的模方积分相等：把 $c_i$ 换成 $\bar\psi(p)$、把求和换成对 p 的积分，就是 (A-27)。">{R`(\psi,\psi)=\int_{-\infty}^{+\infty}\dd p\;|\bar\psi(p)|^2`}</Eq>
          <Tx>{R`**还缺封闭关系与正交归一关系。**两者都来自同一个工具——$\delta$ 函数的 Fourier 表示（附录 II）：`}</Tx>
          <Eq n="A-39" say="$\delta$ 函数的 Fourier 表示：所有波数的平面波等权叠加，只在 u=0 处不相消。">{R`\frac{1}{2\pi}\int_{-\infty}^{+\infty}\dd k\;e^{ik\sym{uvar}{u}}=\delta(\sym{uvar}{u})`}</Eq>
          <Tx>{R`（取 $k=p/\hbar$，注意 $\delta$ 函数在变量缩放下的因子。）先算"外积对 $p$ 的积分"，得到封闭关系：`}</Tx>
          <Eq n="A-40" keyEq title="平面波的封闭关系" say="平面波对所有动量的'外积积分'给出 $\delta(x-x')$：平面波构成完备的连续基。">{R`\int_{-\infty}^{+\infty}\dd p\;v_p(x)\,v_p^*(x')=\frac{1}{2\pi}\int\frac{\dd p}{\hbar}\,e^{i\frac{p}{\hbar}(x-x')}=\delta(x-x')`}</Eq>
          <Tx>{R`这就是 \eqref{A-32} 的连续版本。再算两个平面波之间的标量积 $(v_p,v_{p'})=\int\dd x\,v_p^*(x)v_{p'}(x)$，用的仍是 \eqref{A-39}：`}</Tx>
          <Eq n="A-41" keyEq title="Dirac 意义下的正交归一" say="不同动量的平面波正交；相同动量时标量积发散，用 $\delta(p-p')$ 代替 Kronecker $\delta$——'在 Dirac 意义下正交归一'。">{R`(v_p,v_{p'})=\frac{1}{2\pi}\int\frac{\dd x}{\hbar}\,e^{i\frac{x}{\hbar}(p'-p)}=\delta(p-p')`}</Eq>
          <Tx>{R`**Kronecker 换成 Dirac。**与 \eqref{A-18} 相比，两个离散指标 $i,j$ 换成了连续指标 $p,p'$，Kronecker $\delta_{ij}$ 换成了 $\delta(p-p')$。$p=p'$ 时右边无穷大——这正是 $v_p$ 不可归一的另一种说法。虽然有点滥用名词，我们仍称 \eqref{A-41} 为"正交归一关系"，并说平面波"在 Dirac 意义下正交归一"。

**三维**不过是三个方向各做一次。取三维平面波`}</Tx>
          <Eq n="A-42" say="三维平面波：三个方向一维平面波的乘积，归一化因子变为 $(2\pi\hbar)^{-3/2}$。">{R`v_{\mathbf p}(\mathbf r)=\left(\frac{1}{2\pi\hbar}\right)^{3/2}e^{i\mathbf p\cdot\mathbf r/\hbar}`}</Eq>
          <Tx>{R`三个连续指标 $p_x,p_y,p_z$ 合记为 $\mathbf p$。一维的五条结果在每个方向上各用一次，直接给出：`}</Tx>
          <Eq n="A-43" say="三维波函数按平面波展开，系数是三维 Fourier 变换。">{R`\psi(\mathbf r)=\int\dd^3p\;\bar\psi(\mathbf p)\,v_{\mathbf p}(\mathbf r)`}</Eq>
          <Eq n="A-44" say="三维 Fourier 变换就是 $\psi$ 在平面波 $v_p$ 上的分量。">{R`\bar\psi(\mathbf p)=(v_{\mathbf p},\psi)=\int\dd^3r\;v_{\mathbf p}^*(\mathbf r)\,\psi(\mathbf r)`}</Eq>
          <Eq n="A-45" say="标量积可以完全在动量空间中计算。">{R`(\varphi,\psi)=\int\dd^3p\;\bar\varphi^*(\mathbf p)\,\bar\psi(\mathbf p)`}</Eq>
          <Eq n="A-46" say="三维平面波的封闭关系。">{R`\int\dd^3p\;v_{\mathbf p}(\mathbf r)\,v_{\mathbf p}^*(\mathbf r')=\delta(\mathbf r-\mathbf r')`}</Eq>
          <Eq n="A-47" say="三维平面波在 Dirac 意义下正交归一。">{R`(v_{\mathbf p},v_{\mathbf p'})=\delta(\mathbf p-\mathbf p')`}</Eq>
          <Tx>{R`也就是 \eqref{A-36}、\eqref{A-37}、\eqref{A-38}、\eqref{A-40}、\eqref{A-41} 的三维版本。把替换规则列成表：`}</Tx>
          <Table head={[R`表 (II-1)：离散基 $\{u_i\}$`, R`平面波基 $\{v_{\mathbf p}\}$`]} rows={[
            [R`指标 $i$`, R`连续指标 $\mathbf p$`],
            [R`$\sum_i$`, R`$\int\dd^3p$`],
            [R`$\delta_{ij}$`, R`$\delta(\mathbf p-\mathbf p')$`],
          ]} />
        </Sub>

        <Sub n="A-3-b" title="“Delta functions”" zh="「$\delta$ 函数」基">
          <Tx>{R`**第二组连续基：把"位置"本身当作指标。**以空间一点 $\mathbf r_0$（即 $x_0,y_0,z_0$）为连续指标，定义`}</Tx>
          <Eq n="A-48" keyEq title="$\delta$ 函数基" say="以 $r_0$ 为指标的'基函数'就是集中在 $r_0$ 点的 $\delta$ 函数：一个完全定域在一点的'态'。">{R`\xi_{\mathbf r_0}(\mathbf r)=\delta(\mathbf r-\mathbf r_0)`}</Eq>
          <Tx>{R`它们集中在一点，显然不平方可积。但它们恰好能把任何 $\psi$ "拆成各点的贡献"——这只是 $\delta$ 函数的筛选性质写两遍：`}</Tx>
          <Eq n="A-49" say="任何函数都是'各点函数值 $\times$ 该点的 $\delta$ 函数'的连续叠加。">{R`\psi(\mathbf r)=\int\dd^3r_0\;\psi(\mathbf r_0)\,\delta(\mathbf r-\mathbf r_0)`}</Eq>
          <Eq n="A-50" say="$\delta$ 函数把被积函数在 $r_0$ 点的值'筛'出来。">{R`\psi(\mathbf r_0)=\int\dd^3r\;\delta(\mathbf r_0-\mathbf r)\,\psi(\mathbf r)`}</Eq>
          <Tx>{R`换上 $\xi$ 的名字，就是展开式与分量公式：`}</Tx>
          <Eq n="A-51" say="波函数按 $\delta$ 函数基展开，展开系数就是波函数在各点的值。">{R`\psi(\mathbf r)=\int\dd^3r_0\;\psi(\mathbf r_0)\,\xi_{\mathbf r_0}(\mathbf r)`}</Eq>
          <Eq n="A-52" say="波函数在 $\delta$ 函数基上的分量 = 它在该点的取值。">{R`\psi(\mathbf r_0)=(\xi_{\mathbf r_0},\psi)=\int\dd^3r\;\xi_{\mathbf r_0}^*(\mathbf r)\,\psi(\mathbf r)`}</Eq>
          <Tx>{R`**换一个角度看"函数值"。**\eqref{A-51} 说任何 $\psi$ 都能按 $\xi_{\mathbf r_0}$ 唯一展开；\eqref{A-52} 说展开系数（基函数是实的，共轭不起作用）**恰好就是函数值 $\psi(\mathbf r_0)$**。换成离散基的语言：指标 $i\to\mathbf r_0$，$\sum_i\to\int\dd^3r_0$。

这里藏着本章最重要的视角转换：我们一直把波函数理解为"空间每一点的一个值"，现在看来，这些值只是 $\psi$ 在一组特殊基（$\delta$ 函数基）下的分量——与 $c_i$、与 $\bar\psi(\mathbf p)$ 地位完全平等。没有哪一组分量比别的更"真"。

用分量算标量积的公式 \eqref{A-26} 搬到这组基上，得到`}</Tx>
          <Eq n="A-53" say="在 $\delta$ 函数基中用分量算标量积，恰好回到标量积的原始定义 (A-4)。">{R`(\varphi,\psi)=\int\dd^3r_0\;\varphi^*(\mathbf r_0)\,\psi(\mathbf r_0)`}</Eq>
          <Tx>{R`——正是我们最初的**定义** \eqref{A-4}！一个意外的收获："逐点相乘再积分"这个定义，本来就是"在 $\delta$ 函数基中按分量做点积"。

$\xi_{\mathbf r_0}$ 同样满足 Dirac 意义下的正交归一与封闭关系（附录 II 式 (28)）：`}</Tx>
          <Eq n="A-54" say="$\delta$ 函数基的封闭关系：对所有中心点积分两 $\delta$ 函数之积，得到 $\delta(r-r')$。">{R`\int\dd^3r_0\;\xi_{\mathbf r_0}(\mathbf r)\,\xi_{\mathbf r_0}^*(\mathbf r')=\int\dd^3r_0\;\delta(\mathbf r-\mathbf r_0)\,\delta(\mathbf r'-\mathbf r_0)=\delta(\mathbf r-\mathbf r')`}</Eq>
          <Eq n="A-55" say="$\delta$ 函数基在 Dirac 意义下正交归一。">{R`(\xi_{\mathbf r_0},\xi_{\mathbf r_0'})=\int\dd^3r\;\delta(\mathbf r-\mathbf r_0)\,\delta(\mathbf r-\mathbf r_0')=\delta(\mathbf r_0-\mathbf r_0')`}</Eq>
          <Table head={[R`表 (II-2)：离散基 $\{u_i\}$`, R`$\delta$ 函数基 $\{\xi_{\mathbf r_0}\}$`]} rows={[
            [R`指标 $i$`, R`连续指标 $\mathbf r_0$`],
            [R`$\sum_i$`, R`$\int\dd^3r_0$`],
            [R`$\delta_{ij}$`, R`$\delta(\mathbf r_0-\mathbf r_0')$`],
          ]} />
          <Box kind="warning" title="重要提醒：连续基不是物理态">{R`连续基的威力在后面会越来越明显，但切记：**物理态永远对应平方可积的波函数。**$v_{\mathbf p}(\mathbf r)$ 和 $\xi_{\mathbf r_0}(\mathbf r)$ 在任何情况下都不能代表粒子的态，它们只是计算中极有用的中介。

经典光学里有完全相同的情形：单色平面波在数学上极其好用，物理上却无法实现——再好的滤光片也总会放过一个频带 $\Delta\nu$，它可以很窄但不为零。$\xi_{\mathbf r_0}$ 也一样：我们可以设想一个集中在 $\mathbf r_0$ 附近的平方可积函数，例如
$$\xi^{(\varepsilon)}_{\mathbf r_0}(\mathbf r)=\delta^{(\varepsilon)}(\mathbf r-\mathbf r_0)=\delta^{(\varepsilon)}(x-x_0)\,\delta^{(\varepsilon)}(y-y_0)\,\delta^{(\varepsilon)}(z-z_0),$$
其中 $\delta^{(\varepsilon)}$ 是宽度为 $\varepsilon$、高度为 $1/\varepsilon$、以 $x_0$（或 $y_0,z_0$）为中心且 $\int_{-\infty}^{+\infty}\delta^{(\varepsilon)}(x-x_0)\,\dd x=1$ 的尖峰函数（附录 II §1-b 有例子）。当 $\varepsilon\to0$ 时 $\xi^{(\varepsilon)}_{\mathbf r_0}\to\xi_{\mathbf r_0}$，不再平方可积。但物理态不可能对应这个极限：无论粒子定域得多好，$\varepsilon$ 永远不会严格为零。`}</Box>
        </Sub>

        <Sub n="A-3-c" title="Generalization: continuous “orthonormal” bases" zh="推广：连续「正交归一」基">
          <Tx>{R`**把两个例子抽象出来。**一组以连续指标 $\alpha$ 标记的函数 $\{w_\alpha(\mathbf r)\}$，只要满足下面两条——**正交归一**与**封闭**——就称为连续"正交归一"基：`}</Tx>
          <Eq n="A-56" keyEq title="连续基的正交归一关系" say="连续基的正交归一：Kronecker $\delta$ 换成 Dirac $\delta(\alpha-\alpha')$。">{R`(w_\alpha,w_{\alpha'})=\int\dd^3r\;w_\alpha^*(\mathbf r)\,w_{\alpha'}(\mathbf r)=\delta(\alpha-\alpha')`}</Eq>
          <Eq n="A-57" keyEq title="连续基的封闭关系" say="连续基的封闭关系：对指标 $\alpha$ 的积分代替对 i 的求和，结果仍是 $\delta(r-r')$。">{R`\int\dd\alpha\;w_\alpha(\mathbf r)\,w_\alpha^*(\mathbf r')=\delta(\mathbf r-\mathbf r')`}</Eq>
          <Tx>{R`三点补充。(i) $\alpha=\alpha'$ 时 $(w_\alpha,w_\alpha)$ 发散，所以 $w_\alpha\notin\mathscr F$——连续基一律不可归一。(ii) "$\alpha$"可以是一串指标，就像 $\mathbf r_0$、$\mathbf p$ 各含三个。(iii) 基也可以是**离散 + 连续**的混合：此时离散部分 $\{u_i\}$ 单独不够用，必须连同连续部分 $\{w_\alpha\}$ 才构成基。

**混合基不是数学游戏，它在第一个势阱问题里就出现了**（第 I 章 §D-2-c 的有限深方势阱，亦见补充材料 $\mathrm{H_I}$）。以后会知道，定态的全体构成一组基：$E<0$ 的束缚态能级分立，波函数平方可积，用离散指标编号；但还有 $E>0$ 的散射态——第 I 章定态方程 (D-17) 对每个正能量都有有界解，却延伸到无穷远而不可归一。少了任何一部分，基都不完整。混合基的正交归一关系是：`}</Tx>
          <Eq n="A-58" say="混合基：离散部分之间 Kronecker 正交归一、连续部分之间 Dirac 正交归一，且离散部分与连续部分互相正交。">{R`\begin{aligned}(u_i,u_j)&=\delta_{ij}\\(w_\alpha,w_{\alpha'})&=\delta(\alpha-\alpha')\\(u_i,w_\alpha)&=0\end{aligned}`}</Eq>
          <Tx>{R`封闭关系里两部分都要出现：`}</Tx>
          <Eq n="A-59" say="混合基的封闭关系：束缚态部分求和 + 散射态部分积分 = $\delta(r-r')$；两部分缺一不可。">{R`\sum_i u_i(\mathbf r)\,u_i^*(\mathbf r')+\int\dd\alpha\;w_\alpha(\mathbf r)\,w_\alpha^*(\mathbf r')=\delta(\mathbf r-\mathbf r')`}</Eq>

          <Tx>{R`**展开式从哪里来？**路线与 §A-2-d 倒过来走：从 $\delta$ 函数的平凡恒等式出发，`}</Tx>
          <Eq n="A-60" say="$\delta$ 函数的筛选性质（与 A-33 相同）。">{R`\psi(\mathbf r)=\int\dd^3r'\;\psi(\mathbf r')\,\delta(\mathbf r-\mathbf r')`}</Eq>
          <Tx>{R`把 $\delta$ 换成封闭关系 \eqref{A-57}，并交换 $\int\dd^3r'$ 与 $\int\dd\alpha$ 的次序，方括号里自然出现"$w_\alpha$ 与 $\psi$ 的标量积"：`}</Tx>
          <Eq n="A-61" say="代入连续基的封闭关系，方括号中正是 $\psi$ 在 $w_\alpha$ 上的分量。">{R`\psi(\mathbf r)=\int\dd\alpha\left[\int\dd^3r'\;w_\alpha^*(\mathbf r')\,\psi(\mathbf r')\right]w_\alpha(\mathbf r)`}</Eq>
          <Tx>{R`给它起名叫连续分量，展开式就是`}</Tx>
          <Eq n="A-62" keyEq title="按连续基展开" say="任一波函数是连续基函数的'积分叠加'，权重 $c(\alpha)$ 是它的连续分量。">{R`\psi(\mathbf r)=\int\dd\alpha\;c(\alpha)\,w_\alpha(\mathbf r)`}</Eq>
          <Tx>{R`分量公式为`}</Tx>
          <Eq n="A-63" say="连续分量 $c(\alpha)$ 仍是基函数与波函数的标量积。">{R`c(\alpha)=(w_\alpha,\psi)=\int\dd^3r'\;w_\alpha^*(\mathbf r')\,\psi(\mathbf r')`}</Eq>
          <Tx>{R`两式与离散情形的 \eqref{A-19}、\eqref{A-21} 一一对应。

**标量积与范数。**目标仍是"不做空间积分，只用分量"。设`}</Tx>
          <Eq n="A-64" say="$\varphi$ 按连续基展开，分量记为 $b(\alpha)$。">{R`\varphi(\mathbf r)=\int\dd\alpha\;b(\alpha)\,w_\alpha(\mathbf r)`}</Eq>
          <Eq n="A-65" say="$\psi$ 按连续基展开（积分变量记为 $\alpha'$），分量记为 $c(\alpha')$。">{R`\psi(\mathbf r)=\int\dd\alpha'\;c(\alpha')\,w_{\alpha'}(\mathbf r)`}</Eq>
          <Tx>{R`代入定义，空间积分被推到最里面，正好是基函数的标量积：`}</Tx>
          <Eq n="A-66" say="把两个展开式代入标量积定义，三重积分中最里面的空间积分正是基函数的标量积。">{R`\begin{aligned}(\varphi,\psi)&=\int\dd^3r\;\varphi^*(\mathbf r)\,\psi(\mathbf r)\\&=\int\dd\alpha\int\dd\alpha'\;b^*(\alpha)\,c(\alpha')\int\dd^3r\;w_\alpha^*(\mathbf r)\,w_{\alpha'}(\mathbf r)\end{aligned}`}</Eq>
          <Tx>{R`最里层积分由 \eqref{A-56} 给出 $\delta(\alpha-\alpha')$：
$$(\varphi,\psi)=\int\dd\alpha\int\dd\alpha'\;b^*(\alpha)\,c(\alpha')\,\delta(\alpha-\alpha')$$
$\delta$ 函数把 $\alpha'$ 积分吃掉：`}</Tx>
          <Eq n="A-67" say="连续基中的标量积：分量逐点'左共轭右不变'相乘后对 $\alpha$ 积分。">{R`(\varphi,\psi)=\int\dd\alpha\;b^*(\alpha)\,c(\alpha)`}</Eq>
          <Tx>{R`范数是它的特例：`}</Tx>
          <Eq n="A-68" say="连续基中的范数平方：分量模方对连续指标的积分。">{R`(\psi,\psi)=\int\dd\alpha\;|c(\alpha)|^2`}</Eq>
          <Tx>{R`到这里，§A-2 的每条公式都按表 (II-3) 的规则有了连续版。表 (II-4) 把它们并排放在一起——不必背，§C 会用 Dirac 记号一行一条地重新推出。`}</Tx>
          <Table head={[R`表 (II-3)：离散基 $\{u_i\}$`, R`连续基 $\{w_\alpha\}$`]} rows={[
            [R`指标 $i$`, R`连续指标 $\alpha$`],
            [R`$\sum_i$`, R`$\int\dd\alpha$`],
            [R`$\delta_{ij}$`, R`$\delta(\alpha-\alpha')$`],
          ]} />
          <Table caption={R`表 (II-4)：离散基与连续基的主要公式对照`} head={["", R`离散基 $\{u_i(\mathbf r)\}$`, R`连续基 $\{w_\alpha(\mathbf r)\}$`]} rows={[
            [R`正交归一关系`, R`$(u_i,u_j)=\delta_{ij}$`, R`$(w_\alpha,w_{\alpha'})=\delta(\alpha-\alpha')$`],
            [R`封闭关系`, R`$\sum_iu_i(\mathbf r)u_i^*(\mathbf r')=\delta(\mathbf r-\mathbf r')$`, R`$\int\dd\alpha\,w_\alpha(\mathbf r)w_\alpha^*(\mathbf r')=\delta(\mathbf r-\mathbf r')$`],
            [R`波函数的展开`, R`$\psi(\mathbf r)=\sum_ic_iu_i(\mathbf r)$`, R`$\psi(\mathbf r)=\int\dd\alpha\,c(\alpha)w_\alpha(\mathbf r)$`],
            [R`分量`, R`$c_i=(u_i,\psi)=\int\dd^3r\,u_i^*(\mathbf r)\psi(\mathbf r)$`, R`$c(\alpha)=(w_\alpha,\psi)=\int\dd^3r\,w_\alpha^*(\mathbf r)\psi(\mathbf r)$`],
            [R`标量积`, R`$(\varphi,\psi)=\sum_ib_i^*c_i$`, R`$(\varphi,\psi)=\int\dd\alpha\,b^*(\alpha)c(\alpha)$`],
            [R`范数平方`, R`$(\psi,\psi)=\sum_i|c_i|^2$`, R`$(\psi,\psi)=\int\dd\alpha\,|c(\alpha)|^2$`],
          ]} />
        </Sub>
      </Sub>
    </Sec>);
}
