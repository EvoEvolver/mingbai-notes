// §E 两个重要的表象与可观测量：{|r⟩}、{|p⟩} 表象，R 与 P 算符 —— 式 (E-1)–(E-39)
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";

const R = String.raw;

export function SecE() {
  return (
    <Sec n="E" title="Two important examples of representations and observables" zh="两个重要的表象与可观测量"
      gist={R`把 §A 的两组"连续基"升格为广义右矢 $\ket{\mathbf r}$、$\ket{\mathbf p}$：于是**波函数就是分量** $\psi(\mathbf r)=\braket{\mathbf r|\psi}$、$\bar\psi(\mathbf p)=\braket{\mathbf p|\psi}$，Fourier 变换就是表象变换 $\braket{\mathbf r|\mathbf p}=(2\pi\hbar)^{-3/2}e^{i\mathbf p\cdot\mathbf r/\hbar}$。定义位置算符 $\mathbf R$、动量算符 $\mathbf P$：在 $\{\ket{\mathbf r}\}$ 表象中 $\mathbf P=\frac\hbar i\boldsymbol\nabla$，并得到**正则对易关系** $[R_i,P_j]=i\hbar\delta_{ij}$。`}
      why={R`这两个表象与两个算符是第 III 章把"位置""动量"量子化的数学载体；同时它们是前面全部抽象概念（连续基、广义右矢、厄米性、本征值、CSCO）的最好范例。`}
      gives={["E-5", "E-8-a", "E-8-b", "E-16", "E-26", "E-29", "E-30", "E-36", "E-37"]}>
      <p className="muted">本节概念：<C id="continuous_basis" /> · <C id="canonical" /> · <C id="observable" /></p>

      <Tx>{R`**这一节在做什么。**§B 里我们为了"推广"而把波函数换成了抽象右矢，代价是 $\psi(\mathbf r)$ 好像从理论里消失了。本节把它请回来，而且给它一个更准确的身份。舞台是无自旋粒子的态空间 $\mathscr E_{\mathbf r}$：它的右矢与 $\mathscr F$ 中的函数一一（线性地）对应，两右矢的标量积就规定为对应函数的标量积：`}</Tx>
      <Eq n="E-1" say="态空间中两右矢的标量积，定义为对应波函数的标量积。">{R`\braket{\varphi|\psi}=\int\dd^3r\;\varphi^*(\mathbf r)\,\psi(\mathbf r)`}</Eq>
      <Tx>{R`我们要回答三个问题：(1) 在这个空间里，$\psi(\mathbf r)$ 本身是哪一种"分量"？(2) 位置和动量这两个最基本的物理量，对应什么算符、在不同表象中长什么样？(3) 它们之间的对易关系是什么？答案会依次是：位置基中的分量；一个"乘法"、一个"求导"；$i\hbar$。`}</Tx>

      <Sub n="E-1" title="The {|r>} and {|p>} representations" zh="$\{\ket{\mathbf r}\}$ 与 $\{\ket{\mathbf p}\}$ 表象">
        <Sub n="E-1-a" title="Definition" zh="定义">
          <Tx>{R`**核心想法：给两组老朋友发"右矢身份证"。**在 §A-3 我们已经用过两组函数来展开任何波函数——集中在一点的 $\delta$ 函数，和铺满全空间的平面波：`}</Tx>
          <Eq n="E-2-a" say="$\delta$ 函数基：集中在 $r_0$ 点。">{R`\xi_{\mathbf r_0}(\mathbf r)=\delta(\mathbf r-\mathbf r_0)`}</Eq>
          <Eq n="E-2-b" say="平面波基：动量为 $p_0$。">{R`v_{\mathbf p_0}(\mathbf r)=(2\pi\hbar)^{-3/2}\,e^{\frac{i}{\hbar}\mathbf p_0\cdot\mathbf r}`}</Eq>
          <Tx>{R`它们都不在 $\mathscr F$ 中，但 §B-2-c 已经约定：只要与每个物理右矢的标量积有限，就可以配一个"广义右矢"。于是从现在起把它们记作`}</Tx>
          <Eq n="E-3-a" say="$\delta$ 函数 $\xi_{r_0}$ 对应广义右矢 $|r_0\rangle$。">{R`\xi_{\mathbf r_0}(\mathbf r)\iff\ket{\mathbf r_0}`}</Eq>
          <Eq n="E-3-b" say="平面波 $v_{p_0}$ 对应广义右矢 $|p_0\rangle$。">{R`v_{\mathbf p_0}(\mathbf r)\iff\ket{\mathbf p_0}`}</Eq>
          <Tx>{R`这就定义了 $\mathscr E_{\mathbf r}$ 中的两个表象。注意两种标签的含义：$\ket{\mathbf r_0}$ 的三个连续指标是空间一点的坐标 $x_0,y_0,z_0$；$\ket{\mathbf p_0}$ 的三个指标是一个矢量 $\mathbf p_0$ 的分量——到 §E-2 我们会看到，它们恰好分别是位置、动量算符的本征值。`}</Tx>
        </Sub>

        <Sub n="E-1-b" title="Orthonormalization and closure relations" zh="正交归一与封闭关系">
          <Tx>{R`一组右矢要当表象用，先得验明正身：正交归一、封闭。前者不用重新算——§A 已经算过对应函数的标量积（\eqref{A-55}、\eqref{A-47}），按 \eqref{E-1} 直接搬过来：`}</Tx>
          <Eq n="E-4-a" say="位置基矢在 Dirac 意义下正交归一。">{R`\braket{\mathbf r_0|\mathbf r_0'}=\int\dd^3r\;\xi_{\mathbf r_0}^*(\mathbf r)\,\xi_{\mathbf r_0'}(\mathbf r)=\delta(\mathbf r_0-\mathbf r_0')`}</Eq>
          <Eq n="E-4-b" say="动量基矢在 Dirac 意义下正交归一。">{R`\braket{\mathbf p_0|\mathbf p_0'}=\int\dd^3r\;v_{\mathbf p_0}^*(\mathbf r)\,v_{\mathbf p_0'}(\mathbf r)=\delta(\mathbf p_0-\mathbf p_0')`}</Eq>
          <Tx>{R`后者是 §A 中"任何波函数都能用 $\delta$ 函数或平面波展开"这一事实在右矢语言里的说法，写法同 \eqref{C-10}，只是积分变量有三个。把四条关系放在一起，以后在这两个表象里做任何计算，靠的都是这一张表：`}</Tx>
          <Eq n="E-5" keyEq title="r、p 表象的正交归一与封闭关系" say="位置基与动量基各自在 Dirac 意义下正交归一，并各自满足封闭关系：这四条是在两个表象中计算的全部依据。">{R`\begin{aligned}&\braket{\mathbf r_0|\mathbf r_0'}=\delta(\mathbf r_0-\mathbf r_0')\quad\text{(a)}&&\braket{\mathbf p_0|\mathbf p_0'}=\delta(\mathbf p_0-\mathbf p_0')\quad\text{(c)}\\&\int\dd^3r_0\;\ket{\mathbf r_0}\bra{\mathbf r_0}=\mathbb 1\quad\text{(b)}&&\int\dd^3p_0\;\ket{\mathbf p_0}\bra{\mathbf p_0}=\mathbb 1\quad\text{(d)}\end{aligned}`}</Eq>
        </Sub>

        <Sub n="E-1-c" title="Components of a ket" zh="右矢的分量">
          <Tx>{R`**问题 (1) 的答案。**取任一右矢 $\ket{\psi}$（波函数为 $\psi(\mathbf r)$），在它前面插入 (E-5-b) 或 (E-5-d) 形式的单位算符：`}</Tx>
          <Eq n="E-6-a" say="右矢按位置基展开。">{R`\ket{\psi}=\int\dd^3r_0\;\ket{\mathbf r_0}\braket{\mathbf r_0|\psi}`}</Eq>
          <Eq n="E-6-b" say="右矢按动量基展开。">{R`\ket{\psi}=\int\dd^3p_0\;\ket{\mathbf p_0}\braket{\mathbf p_0|\psi}`}</Eq>
          <Tx>{R`展开系数 $\braket{\mathbf r_0|\psi}$、$\braket{\mathbf p_0|\psi}$ 是什么？按 \eqref{E-1}，它们就是基函数与 $\psi$ 的标量积：`}</Tx>
          <Eq n="E-7-a" say="位置分量：$\delta$ 函数与波函数的标量积。">{R`\braket{\mathbf r_0|\psi}=\int\dd^3r\;\xi_{\mathbf r_0}^*(\mathbf r)\,\psi(\mathbf r)`}</Eq>
          <Eq n="E-7-b" say="动量分量：平面波与波函数的标量积。">{R`\braket{\mathbf p_0|\psi}=\int\dd^3r\;v_{\mathbf p_0}^*(\mathbf r)\,\psi(\mathbf r)`}</Eq>
          <Tx>{R`积分一做——$\delta$ 函数筛出函数值，平面波积分给出 Fourier 变换——结论只有两行，却是整章的落脚点：`}</Tx>
          <Eq n="E-8-a" keyEq title="波函数 = 位置分量" say="波函数在 $r_0$ 点的值，正是态矢量在位置基矢 $|r_0\rangle$ 上的分量。">{R`\braket{\mathbf r_0|\psi}=\psi(\mathbf r_0)`}</Eq>
          <Eq n="E-8-b" keyEq title="动量空间波函数 = 动量分量" say="Fourier 变换（动量空间波函数）在 $p_0$ 点的值，正是态矢量在动量基矢 $|p_0\rangle$ 上的分量。">{R`\braket{\mathbf p_0|\psi}=\bar\psi(\mathbf p_0)`}</Eq>
          <Box kind="key" title="波函数的新身份">{R`$\psi(\mathbf r_0)$ 不是"态本身"，而是右矢 $\ket{\psi}$ 在位置基矢 $\ket{\mathbf r_0}$ 上的**分量**；动量空间波函数 $\bar\psi(\mathbf p_0)$ 是同一右矢在 $\ket{\mathbf p_0}$ 上的分量。第 I 章"用波函数描述态"的做法，只是 §C-3-a"用分量描述右矢"的一个特例——我们恰好选了位置表象。`}</Box>
          <Tx>{R`**两个自洽性检验。**把 \eqref{E-8-a} 用到基矢本身上。若 $\ket{\psi}=\ket{\mathbf p_0}$，它在位置表象中的"波函数"应当就是平面波：`}</Tx>
          <Eq n="E-9" say="动量本征态在位置表象中的波函数就是平面波。">{R`\braket{\mathbf r_0|\mathbf p_0}=v_{\mathbf p_0}(\mathbf r_0)=(2\pi\hbar)^{-3/2}\,e^{\frac{i}{\hbar}\mathbf p_0\cdot\mathbf r_0}`}</Eq>
          <Tx>{R`若 $\ket{\psi}=\ket{\mathbf r_0'}$，"波函数"应当是 $\delta$ 函数——这与正交归一关系 (E-5-a) 吻合：`}</Tx>
          <Eq n="E-10" say="位置本征态在位置表象中的波函数就是 $\delta$ 函数，与正交归一关系一致。">{R`\braket{\mathbf r_0|\mathbf r_0'}=\xi_{\mathbf r_0'}(\mathbf r_0)=\delta(\mathbf r_0-\mathbf r_0')`}</Eq>
          <Tx>{R`既然下标 0 只是提醒"这是一个特定点"，以后就省掉它，直接写 $\ket{\mathbf r}$、$\ket{\mathbf p}$。(E-8) 与 (E-5) 于是读作
$$\braket{\mathbf r|\psi}=\psi(\mathbf r),\qquad\braket{\mathbf p|\psi}=\bar\psi(\mathbf p)$$
$$\braket{\mathbf r|\mathbf r'}=\delta(\mathbf r-\mathbf r'),\quad\int\dd^3r\,\ket{\mathbf r}\bra{\mathbf r}=\mathbb 1,\quad\braket{\mathbf p|\mathbf p'}=\delta(\mathbf p-\mathbf p'),\quad\int\dd^3p\,\ket{\mathbf p}\bra{\mathbf p}=\mathbb 1$$
（$\mathbf r$、$\mathbf p$ 在这里仍然只是两组连续指标 $\{x,y,z\}$、$\{p_x,p_y,p_z\}$。）`}</Tx>
          <Tx>{R`**回收 §A 的一个结果。**§A 里我们费了一番功夫才得到函数形式的封闭关系 \eqref{A-32}。现在它只是一句话的推论：从离散基的右矢封闭关系出发，`}</Tx>
          <Eq n="E-11" say="离散基的封闭关系（右矢形式）。">{R`\sum_i\ket{u_i}\bra{u_i}=\mathbb 1`}</Eq>
          <Tx>{R`两边夹在 $\bra{\mathbf r}$ 与 $\ket{\mathbf r'}$ 之间，`}</Tx>
          <Eq n="E-12" say="把单位算符夹在 $\langle r|$ 与 $|r'\rangle$ 之间。">{R`\sum_i\braket{\mathbf r|u_i}\braket{u_i|\mathbf r'}=\bra{\mathbf r}\mathbb 1\ket{\mathbf r'}=\braket{\mathbf r|\mathbf r'}`}</Eq>
          <Tx>{R`再用 (E-8-a) 读出分量、用 (E-5-a) 读出右边：`}</Tx>
          <Eq n="E-13" say="§A 的函数形式封闭关系 (A-32)，原来只是矢量封闭关系在位置表象中的写法。">{R`\sum_iu_i(\mathbf r)\,u_i^*(\mathbf r')=\delta(\mathbf r-\mathbf r')`}</Eq>
          <Tx>{R`即 \eqref{A-32} 只是矢量关系 \eqref{E-11} 的"位置表象投影"。`}</Tx>
        </Sub>

        <Sub n="E-1-d" title="The scalar product of two vectors" zh="两矢量的标量积">
          <Tx>{R`**一个定义变成了定理。**本节开头我们把标量积**规定**为 \eqref{E-1}。有了位置表象，它其实可以**推出**来：在 $\bra{\varphi}$ 与 $\ket{\psi}$ 之间插入 (E-5-b)，`}</Tx>
          <Eq n="E-14" say="在位置表象中算标量积：插入位置基的封闭关系。">{R`\braket{\varphi|\psi}=\int\dd^3r\;\braket{\varphi|\mathbf r}\braket{\mathbf r|\psi}`}</Eq>
          <Tx>{R`再把两个分量换成波函数（(E-8-a)，注意 $\braket{\varphi|\mathbf r}=\varphi^*(\mathbf r)$），就回到 \eqref{E-1}——它是 \eqref{C-21} 的特例。换在动量表象插入单位算符，同样一行得到 Fourier 分析中的 Parseval–Plancherel 等式（附录 I §2-c）：`}</Tx>
          <Eq n="E-15" say="标量积也可在动量表象中计算：两个 Fourier 变换的'标量积'等于原函数的标量积。">{R`\begin{aligned}\braket{\varphi|\psi}&=\int\dd^3p\;\braket{\varphi|\mathbf p}\braket{\mathbf p|\psi}\\&=\int\dd^3p\;\bar\varphi^*(\mathbf p)\,\bar\psi(\mathbf p)\end{aligned}`}</Eq>
        </Sub>

        <Sub n="E-1-e" title="Changing from the {|r>} representation to the {|p>} representation" zh="从 $\{\ket{\mathbf r}\}$ 表象到 $\{\ket{\mathbf p}\}$ 表象">
          <Tx>{R`**Fourier 变换 = 换基。**按 §C-5 的配方，换基只需要知道"新基矢在旧基中的分量"。这里两组基都是连续的，"变换矩阵"就是`}</Tx>
          <Eq n="E-16" keyEq title="r–p 变换矩阵" say="从位置表象到动量表象的'变换矩阵'就是平面波：位置与动量表象之间的变换就是 Fourier 变换。">{R`\braket{\mathbf r|\mathbf p}=\braket{\mathbf p|\mathbf r}^*=(2\pi\hbar)^{-3/2}\,e^{\frac{i}{\hbar}\mathbf p\cdot\mathbf r}`}</Eq>
          <Tx>{R`——它就是 \eqref{E-9}。剩下的全是插入单位算符的练习：$\braket{\mathbf r|\psi}=\int\dd^3p\,\braket{\mathbf r|\mathbf p}\braket{\mathbf p|\psi}$ 给出`}</Tx>
          <Eq n="E-17" say="位置表象的波函数是动量表象波函数的 Fourier 积分。">{R`\psi(\mathbf r)=(2\pi\hbar)^{-3/2}\int\dd^3p\;e^{\frac{i}{\hbar}\mathbf p\cdot\mathbf r}\,\bar\psi(\mathbf p)`}</Eq>
          <Tx>{R`反方向 $\braket{\mathbf p|\psi}=\int\dd^3r\,\braket{\mathbf p|\mathbf r}\braket{\mathbf r|\psi}$ 给出`}</Tx>
          <Eq n="E-18" say="动量表象的波函数是位置表象波函数的 Fourier 积分（指数取负号）。">{R`\bar\psi(\mathbf p)=(2\pi\hbar)^{-3/2}\int\dd^3r\;e^{-\frac{i}{\hbar}\mathbf p\cdot\mathbf r}\,\psi(\mathbf r)`}</Eq>
          <Tx>{R`这正是第 I 章熟悉的 Fourier 变换对。我们没有用任何 Fourier 分析的知识，只用了封闭关系和 \eqref{E-16}——Fourier 变换在这里不是"额外的数学技巧"，而是"同一个右矢在两个坐标系中的分量之间的换算"。算符的矩阵元也一样：套用 \eqref{C-56}（两边各插入一次单位算符），从位置表象的 $A(\mathbf r',\mathbf r)=\bra{\mathbf r'}A\ket{\mathbf r}$ 得到动量表象的 $A(\mathbf p',\mathbf p)=\bra{\mathbf p'}A\ket{\mathbf p}$：`}</Tx>
          <Eq n="E-19" say="算符矩阵元从位置表象到动量表象的变换：两边各做一次 Fourier 变换。">{R`A(\mathbf p',\mathbf p)=(2\pi\hbar)^{-3}\int\dd^3r\int\dd^3r'\;e^{\frac{i}{\hbar}(\mathbf p\cdot\mathbf r-\mathbf p'\cdot\mathbf r')}\,A(\mathbf r',\mathbf r)`}</Eq>
          <Derivation title="由 (C-56) 推 (E-19)" collapsed steps={[
            { tex: R`\bra{\mathbf p'}A\ket{\mathbf p}=\int\dd^3r'\int\dd^3r\;\braket{\mathbf p'|\mathbf r'}\bra{\mathbf r'}A\ket{\mathbf r}\braket{\mathbf r|\mathbf p}`, why: R`在 $A$ 两边各插入一次位置基的封闭关系 (E-5-b)——这就是连续形式的 $S^\dagger AS$。` },
            { tex: R`=(2\pi\hbar)^{-3}\int\dd^3r\int\dd^3r'\;e^{-\frac{i}{\hbar}\mathbf p'\cdot\mathbf r'}A(\mathbf r',\mathbf r)\,e^{\frac{i}{\hbar}\mathbf p\cdot\mathbf r}`, why: R`代入 \eqref{E-16}：$\braket{\mathbf p'|\mathbf r'}=(2\pi\hbar)^{-3/2}e^{-i\mathbf p'\cdot\mathbf r'/\hbar}$，$\braket{\mathbf r|\mathbf p}=(2\pi\hbar)^{-3/2}e^{i\mathbf p\cdot\mathbf r/\hbar}$。` },
          ]} result={R`合并指数即得 \eqref{E-19}。反方向（由 $A(\mathbf p',\mathbf p)$ 求 $A(\mathbf r',\mathbf r)$）的公式与此类似，指数反号。`} />
        </Sub>
      </Sub>

      <Sub n="E-2" title="The R and P operators" zh="$\mathbf R$ 与 $\mathbf P$ 算符">
        <Sub n="E-2-a" title="Definition" zh="定义">
          <Tx>{R`**策略：每个算符先在"自己的家"里定义。**一个算符在某个表象中若只是"乘以指标"，那个表象就是它的本征表象，定义起来最简单。位置算符的家是 $\{\ket{\mathbf r}\}$，动量算符的家是 $\{\ket{\mathbf p}\}$。定义完之后，再问"它在对方家里长什么样"——这一问会给出 $\frac\hbar i\boldsymbol\nabla$ 和正则对易关系。

**位置算符。**§A 的 $X$ 把 $\psi(x,y,z)$ 变成 $x\,\psi(x,y,z)$。把它提升为态空间中的算符：右矢`}</Tx>
          <Eq n="E-20" say="把 X 作用在态矢量上得到新态矢量。">{R`\ket{\psi'}=X\ket{\psi}`}</Eq>
          <Tx>{R`的位置表象分量 $\braket{\mathbf r|\psi'}=\psi'(\mathbf r)$ 满足`}</Tx>
          <Eq n="E-21" say="在位置表象里，X 就是乘以 x。">{R`\psi'(x,y,z)=x\,\psi(x,y,z)`}</Eq>
          <Tx>{R`强调一下：$X$ 作用在 $\mathscr E_{\mathbf r}$ 的右矢上，"乘以 $x$"只是它在位置表象中的表现。对三个方向一视同仁，定义写成矩阵元形式：`}</Tx>
          <Eq n="E-22-a" say="位置算符 X 的定义：在位置表象中乘以坐标 x。">{R`\bra{\mathbf r}X\ket{\psi}=x\braket{\mathbf r|\psi}`}</Eq>
          <Eq n="E-22-b" say="Y 在位置表象中乘以 y。">{R`\bra{\mathbf r}Y\ket{\psi}=y\braket{\mathbf r|\psi}`}</Eq>
          <Eq n="E-22-c" say="Z 在位置表象中乘以 z。">{R`\bra{\mathbf r}Z\ket{\psi}=z\braket{\mathbf r|\psi}`}</Eq>
          <Tx>{R`右边的 $x,y,z$ 就是基矢 $\ket{\mathbf r}$ 的标签。我们把 $X,Y,Z$ 合称"矢量算符" $\mathbf R$（暂时只当缩写）。在自己的家里计算矩阵元毫不费力——插一个 (E-5-b) 就回到熟悉的积分：`}</Tx>
          <Eq n="E-23" say="X 的矩阵元就是 $\varphi^*\cdot x\cdot \psi$ 对全空间积分。">{R`\begin{aligned}\bra{\varphi}X\ket{\psi}&=\int\dd^3r\;\braket{\varphi|\mathbf r}\bra{\mathbf r}X\ket{\psi}\\&=\int\dd^3r\;\varphi^*(\mathbf r)\,x\,\psi(\mathbf r)\end{aligned}`}</Eq>
          <Tx>{R`**动量算符**照样在自己的家里定义——在动量表象中"乘以 $p_x$"：`}</Tx>
          <Eq n="E-24-a" say="动量算符 $P_x$ 的定义：在动量表象中乘以 $p_x$。">{R`\bra{\mathbf p}P_x\ket{\psi}=p_x\braket{\mathbf p|\psi}`}</Eq>
          <Eq n="E-24-b" say="$P_y$ 在动量表象中乘以 $p_y$。">{R`\bra{\mathbf p}P_y\ket{\psi}=p_y\braket{\mathbf p|\psi}`}</Eq>
          <Eq n="E-24-c" say="$P_z$ 在动量表象中乘以 $p_z$。">{R`\bra{\mathbf p}P_z\ket{\psi}=p_z\braket{\mathbf p|\psi}`}</Eq>
          <Tx>{R`**$\mathbf P$ 到了位置表象长什么样？**在 $\bra{\mathbf r}$ 与 $P_x$ 之间插入动量基 (E-5-d)，用定义 (E-24-a) 和变换矩阵 \eqref{E-16}：`}</Tx>
          <Eq n="E-25" say="在 $\langle r|$ 与 $P_x$ 之间插入动量基：$P_x$ 的位置表象作用 = 对 $p_x$ $\bar\psi(p)$ 做逆 Fourier 变换。">{R`\begin{aligned}\bra{\mathbf r}P_x\ket{\psi}&=\int\dd^3p\;\braket{\mathbf r|\mathbf p}\bra{\mathbf p}P_x\ket{\psi}\\&=(2\pi\hbar)^{-3/2}\int\dd^3p\;e^{\frac{i}{\hbar}\mathbf p\cdot\mathbf r}\,p_x\,\bar\psi(\mathbf p)\end{aligned}`}</Eq>
          <Box kind="warning" title="勘误：(E-25) 中指数的符号">{R`原书（第 2 版）\eqref{E-25} 第二行印作 $e^{-\frac{i}{\hbar}\mathbf p\cdot\mathbf r}$。但第一行中的 $\braket{\mathbf r|\mathbf p}$ 由 \eqref{E-16} 给出，是 $(2\pi\hbar)^{-3/2}e^{+\frac{i}{\hbar}\mathbf p\cdot\mathbf r}$；而且只有取正号，这个积分才是 $p_x\bar\psi(\mathbf p)$ 的**逆** Fourier 变换（与 \eqref{E-17} 同号），从而等于 $\frac{\hbar}{i}\frac{\partial}{\partial x}\psi(\mathbf r)$，与下一式 \eqref{E-26} 一致。若用负号，结果将是 $-\frac{\hbar}{i}\partial_x\psi$ 在 $-\mathbf r$ 处的值。上文已改为正号。`}</Box>
          <Tx>{R`怎样认出右边？对 \eqref{E-17} 两边求 $\partial/\partial x$：积分号下每求一次导数，被积函数多出一个因子 $ip_x/\hbar$。所以 \eqref{E-25} 的右边恰是 $\frac{\hbar}{i}\frac{\partial\psi}{\partial x}$（附录 I 式 (38a)）。三个分量合写：`}</Tx>
          <Eq n="E-26" keyEq title="位置表象中的动量算符" say="在位置表象中，动量算符就是 $(\hbar/i)$ 乘以梯度：它作用在波函数上就是求导。">{R`\bra{\mathbf r}\mathbf P\ket{\psi}=\frac{\hbar}{i}\,\boldsymbol\nabla\braket{\mathbf r|\psi}`}</Eq>
          <Tx>{R`在位置表象中，$\mathbf P$ 就是微分算符 $\frac{\hbar}{i}\boldsymbol\nabla$。计算动量矩阵元的实用公式随之而来：`}</Tx>
          <Eq n="E-27" say="动量矩阵元在位置表象中是一个含导数的积分。">{R`\begin{aligned}\bra{\varphi}P_x\ket{\psi}&=\int\dd^3r\;\braket{\varphi|\mathbf r}\bra{\mathbf r}P_x\ket{\psi}\\&=\int\dd^3r\;\varphi^*(\mathbf r)\left[\frac{\hbar}{i}\frac{\partial}{\partial x}\right]\psi(\mathbf r)\end{aligned}`}</Eq>
          <Tx>{R`**问题 (3)：对易关系。**现在两个算符都在位置表象里有了明确的样子——一个乘 $x$、一个求导——计算它们的对易子与 \eqref{A-16} 如出一辙：`}</Tx>
          <Eq n="E-28" say="在位置表象中计算 [X, $P_x]$：与 (A-16) 同样的莱布尼茨法则，多出的一项给出 $i\hbar$。">{R`\begin{aligned}\bra{\mathbf r}[X,P_x]\ket{\psi}&=\bra{\mathbf r}(XP_x-P_xX)\ket{\psi}\\&=x\bra{\mathbf r}P_x\ket{\psi}-\frac{\hbar}{i}\frac{\partial}{\partial x}\bra{\mathbf r}X\ket{\psi}\\&=\frac{\hbar}{i}\,x\frac{\partial}{\partial x}\braket{\mathbf r|\psi}-\frac{\hbar}{i}\frac{\partial}{\partial x}x\braket{\mathbf r|\psi}\\&=i\hbar\braket{\mathbf r|\psi}\end{aligned}`}</Eq>
          <Tx>{R`对一切 $\ket{\psi}$、一切 $\ket{\mathbf r}$ 都成立，所以作为算符等式`}</Tx>
          <Eq n="E-29" keyEq title="[X, $P_x]$ = $i\hbar$" say="位置与同方向动量的对易子等于 $i\hbar$（严格说是 $i\hbar$ 乘以单位算符）。">{R`[X,P_x]=i\hbar`}</Eq>
          <Tx>{R`（严格说右边是 $i\hbar\mathbb 1$；不致混淆时常把 $\mathbb 1$ 写成 1。）这其实就是 \eqref{A-17} 乘上 $\hbar/i$。对其余分量重复同样的计算：同方向的位置和动量差一个 $i\hbar$，不同方向的互不干扰，位置之间、动量之间都对易（各自在自己的家里都是乘法）：`}</Tx>
          <Eq n="E-30" keyEq title="正则对易关系" say="位置分量彼此对易，动量分量彼此对易；位置与动量只有同一方向的分量不对易，对易子为 $i\hbar$。">{R`\left.\begin{aligned}{}[R_i,R_j]&=0\\{}[P_i,P_j]&=0\\{}[R_i,P_j]&=i\hbar\delta_{ij}\end{aligned}\right\}\quad i,j=1,2,3`}</Eq>
          <Tx>{R`其中 $R_1,R_2,R_3$ 与 $\sym{Pmom}{P}_1,\sym{Pmom}{P}_2,\sym{Pmom}{P}_3$ 分别指 $X,Y,Z$ 与 $P_x,P_y,P_z$。这组关系称为**正则对易关系**（canonical commutation relations）。`}</Tx>
        </Sub>

        <Sub n="E-2-b" title="R and P are Hermitian" zh="$\mathbf R$ 与 $\mathbf P$ 是厄米的">
          <Tx>{R`要当可观测量，先要厄米。**位置算符**几乎不用证：在 \eqref{E-23} 的积分里，$x$ 是实数，把整个积分取复共轭只是交换了 $\varphi$、$\psi$ 的角色：`}</Tx>
          <Eq n="E-31" say="x 是实数，把整个积分取共轭就交换了 $\varphi$ 与 $\psi$ 的角色：X 满足厄米条件。">{R`\begin{aligned}\bra{\varphi}X\ket{\psi}&=\int\dd^3r\;\varphi^*(\mathbf r)\,x\,\psi(\mathbf r)=\left[\int\dd^3r\;\varphi(\mathbf r)\,x\,\psi^*(\mathbf r)\right]^*\\&=\bra{\psi}X\ket{\varphi}^*\end{aligned}`}</Eq>
          <Tx>{R`这正是厄米条件 \eqref{B-61}。动量算符在**它自己的家**（动量表象）里同样是乘以实数，证明一模一样。

**但在位置表象里证明 $P_x$ 厄米更有教益**，因为它能告诉我们那个 $i$ 从哪来。对 \eqref{E-27} 关于 $x$ 分部积分：`}</Tx>
          <Eq n="E-32" say="对 x 分部积分：边界项加上把导数挪到 $\varphi^*$ 上的一项。">{R`\begin{aligned}\bra{\varphi}P_x\ket{\psi}&=\frac{\hbar}{i}\int\dd y\;\dd z\int_{-\infty}^{+\infty}\dd x\;\varphi^*(\mathbf r)\frac{\partial}{\partial x}\psi(\mathbf r)\\&=\frac{\hbar}{i}\int\dd y\;\dd z\left\{\Big[\varphi^*(\mathbf r)\psi(\mathbf r)\Big]_{x=-\infty}^{x=+\infty}-\int_{-\infty}^{+\infty}\dd x\;\psi(\mathbf r)\frac{\partial}{\partial x}\varphi^*(\mathbf r)\right\}\end{aligned}`}</Eq>
          <Tx>{R`边界项为什么为零？因为 $\braket{\varphi|\psi}$ 的积分收敛，$\varphi^*\psi$ 在 $x\to\pm\infty$ 时必须趋于零。剩下的一项把导数挪到了 $\varphi^*$ 上，同时带出一个负号：`}</Tx>
          <Eq n="E-33" say="边界项消失后，因子 1/i 取共轭时变号，恰好抵消分部积分带来的负号：$P_x$ 是厄米的。">{R`\begin{aligned}\bra{\varphi}P_x\ket{\psi}&=-\frac{\hbar}{i}\int\dd^3r\;\psi(\mathbf r)\frac{\partial}{\partial x}\varphi^*(\mathbf r)\\&=\left[\frac{\hbar}{i}\int\dd^3r\;\psi^*(\mathbf r)\frac{\partial}{\partial x}\varphi(\mathbf r)\right]^*\\&=\bra{\psi}P_x\ket{\varphi}^*\end{aligned}`}</Eq>
          <Box kind="physics" title="为什么必须有那个 $i$">{R`分部积分产生一个负号；$(1/i)^*=-1/i$ 在取共轭时又产生一个负号——两者抵消，$P_x$ 厄米。若没有 $i$，$D_x=\partial/\partial x$ 只剩第一个负号：$D_x^\dagger=-D_x$，它是**反厄米**的。所以 $i\frac{\partial}{\partial x}$、$\frac{\hbar}{i}\frac{\partial}{\partial x}$ 厄米，而 $\frac{\partial}{\partial x}$ 不是。同样的道理解释了 \eqref{E-29} 右边为什么带 $i$：两个厄米算符的对易子必然是反厄米的（$[A,B]^\dagger=[B^\dagger,A^\dagger]=-[A,B]$），只能是 $i$ 乘以厄米算符。`}</Box>
        </Sub>

        <Sub n="E-2-c" title="Eigenvectors of R and P" zh="$\mathbf R$ 与 $\mathbf P$ 的本征矢">
          <Tx>{R`"自己的家"的另一层意思：基矢就是本征矢。直接验证：用 (E-22-a) 计算 $X\ket{\mathbf r_0}$ 的位置分量，$\delta$ 函数允许把乘因子 $x$ 换成 $x_0$：`}</Tx>
          <Eq n="E-34" say="$X|r_0\rangle$ 的位置分量等于 $|r_0\rangle$ 的分量乘以 $x_0$：因为 $\delta$ 函数只在 $x=x_0$ 处不为零。">{R`\bra{\mathbf r}X\ket{\mathbf r_0}=x\braket{\mathbf r|\mathbf r_0}=x\,\delta(\mathbf r-\mathbf r_0)=x_0\,\delta(\mathbf r-\mathbf r_0)=x_0\braket{\mathbf r|\mathbf r_0}`}</Eq>
          <Tx>{R`$X\ket{\mathbf r_0}$ 与 $x_0\ket{\mathbf r_0}$ 的全部分量相同，所以`}</Tx>
          <Eq n="E-35" say="$|r_0\rangle$ 是 X 的本征矢，本征值为 $x_0$。">{R`X\ket{\mathbf r_0}=x_0\ket{\mathbf r_0}`}</Eq>
          <Tx>{R`$Y$、$Z$ 同理。去掉下标 0：`}</Tx>
          <Eq n="E-36" keyEq title="位置本征态" say="$|r\rangle$ 是 X、Y、Z 的共同本征矢，本征值就是它的三个标签 x、y、z。">{R`\begin{aligned}X\ket{\mathbf r}&=x\ket{\mathbf r}\\Y\ket{\mathbf r}&=y\ket{\mathbf r}\\Z\ket{\mathbf r}&=z\ket{\mathbf r}\end{aligned}`}</Eq>
          <Tx>{R`$\ket{\mathbf r}$ 是 $X,Y,Z$ 的共同本征矢，标签 $x,y,z$ 就是三个本征值——这也事后说明了"$\ket{\mathbf r}$"这个记号为什么起得好。动量完全对称（在动量表象中做同样的论证）：`}</Tx>
          <Eq n="E-37" keyEq title="动量本征态" say="$|p\rangle$ 是 $P_x$、$P_y$、$P_z$ 的共同本征矢，本征值为 $p_x$、$p_y$、$p_z$。">{R`\begin{aligned}P_x\ket{\mathbf p}&=p_x\ket{\mathbf p}\\P_y\ket{\mathbf p}&=p_y\ket{\mathbf p}\\P_z\ket{\mathbf p}&=p_z\ket{\mathbf p}\end{aligned}`}</Eq>
          <Tx>{R`**换一条路验证。**也可以留在位置表象，用 \eqref{E-26} 和平面波 \eqref{E-9}：对 $\braket{\mathbf r|\mathbf p}$ 求导只会拉下一个 $ip_x/\hbar$——平面波正是导数算符的本征函数：`}</Tx>
          <Eq n="E-38" say="对平面波求导只是乘以 $p_x$：平面波是 $P_x$ 的本征函数。">{R`\begin{aligned}\bra{\mathbf r}P_x\ket{\mathbf p}&=\frac{\hbar}{i}\frac{\partial}{\partial x}\braket{\mathbf r|\mathbf p}=\frac{\hbar}{i}\frac{\partial}{\partial x}(2\pi\hbar)^{-3/2}\,e^{\frac{i}{\hbar}\mathbf p\cdot\mathbf r}\\&=p_x\,(2\pi\hbar)^{-3/2}\,e^{\frac{i}{\hbar}\mathbf p\cdot\mathbf r}=p_x\braket{\mathbf r|\mathbf p}\end{aligned}`}</Eq>
          <Tx>{R`$P_x\ket{\mathbf p}$ 的每个位置分量都是 $\ket{\mathbf p}$ 相应分量的 $p_x$ 倍，即 $\ket{\mathbf p}$ 是 $P_x$ 的本征矢、本征值 $p_x$。`}</Tx>
        </Sub>

        <Sub n="E-2-d" title="R and P are observables" zh="$\mathbf R$ 与 $\mathbf P$ 是可观测量">
          <Tx>{R`厄米已证，本征矢已找到；"可观测量"还差最后一条——本征矢完备。这恰好就是封闭关系 (E-5-b)、(E-5-d)。所以 $\mathbf R$ 与 $\mathbf P$ 都是可观测量。

**它们构成 CSCO 吗？**看标签是否唯一：给定三个本征值 $x_0,y_0,z_0$，对应的本征矢只有 $\ket{\mathbf r_0}$（位置表象中的"波函数"是 $\delta(x-x_0)\delta(y-y_0)\delta(z-z_0)$），所以 $\{X,Y,Z\}$ 是 $\mathscr E_{\mathbf r}$ 中的 CSCO；$\{P_x,P_y,P_z\}$ 同理。

但**单独一个 $X$ 不够**：固定 $x_0$ 后 $y_0,z_0$ 仍可任取，每个本征值都无穷重简并。有趣的是，同一个 $X$ 在一维问题的态空间 $\mathscr E_x$ 中却**是** CSCO——$x_0$ 唯一确定 $\ket{x_0}$。"是否完全"取决于你在哪个态空间里提问；§F 会用张量积把这件事说清楚。`}</Tx>
          <Box kind="example" title="CSCO 不唯一">
            <Tx>{R`除了 $\{X,Y,Z\}$、$\{P_x,P_y,P_z\}$，还可以混搭，例如 $\{X,P_y,P_z\}$：由 \eqref{E-30}，不同方向的位置与动量对易，所以三者两两对易；给定 $x_0,p_{0y},p_{0z}$，共同本征函数只有一个——$x$ 方向定域、$y,z$ 方向是平面波：`}</Tx>
            <Eq n="E-39" say="X、$P_y$、$P_z$ 的共同本征函数：x 方向是 $\delta$ 函数（位置确定），y、z 方向是平面波（动量确定）。">{R`\psi_{x_0,p_{0y},p_{0z}}(x,y,z)=\delta(x-x_0)\,\frac{1}{2\pi\hbar}\,e^{\frac{i}{\hbar}(p_{0y}y+p_{0z}z)}`}</Eq>
            <Tx>{R`这印证了 §D-3-b 说明 (iii)：同一系统有许多不同的 CSCO，对应不同的"完全的提问方式"——问三个坐标、问三个动量分量，或者问 $x$ 坐标加上 $y$、$z$ 方向的动量。`}</Tx>
          </Box>
        </Sub>
      </Sub>
    </Sec>);
}
