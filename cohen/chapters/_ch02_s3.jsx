// §C 态空间中的表象 —— 式 (C-1)–(C-57)，表 (II-7)
import { Sec, Sub, Tx, Eq, Box, Derivation, Table, C } from "@kit";

const R = String.raw;

export function SecC() {
  return (
    <Sec n="C" title="Representations in state space" zh="态空间中的表象"
      gist={R`选一组正交归一基 = 选一个**表象**：右矢变成列矩阵、左矢变成行矩阵、算符变成方阵，矢量运算变成矩阵运算。所有计算只需两条关系：**正交归一** $\braket{u_i|u_j}=\delta_{ij}$ 与**封闭** $\sum_i\ket{u_i}\bra{u_i}=\mathbb 1$——"在任何地方插入 $\mathbb 1$"就是全部技巧。`}
      why={R`抽象矢量便于推理，但真正算出数来，总要选一组基把一切写成数。我们还需要知道：换一组基时，这些数怎样变——这就是表象变换，其矩阵是幺正的。`}
      gives={["C-1", "C-9", "C-10", "C-24", "C-30", "C-37", "C-39", "C-43", "C-49", "C-56"]}>
      <p className="muted">本节概念：<C id="closure" /> · <C id="representation" /></p>

      <Sub n="C-1" title="Introduction" zh="引言：一个口号，两条关系">
        <Tx>{R`**本节的口号：一切表象公式都只是"在合适的地方插入 $\mathbb 1$"。**

§B 给了我们一套不依赖坐标的语言，但要算出数，总得选坐标。在态空间里"选坐标"就是选一组正交归一基，叫选一个**表象**（representation）。选定以后，右矢变成一列数，算符变成一张数表，§B 的抽象运算全部变成矩阵运算。选哪个表象原则上随意，实践中挑让问题最简单的那个。

§A-2、§A-3 已经在 $\mathscr F$ 里对离散基、连续基走过一遍，那里每条公式都要单独推。这一节的打算是：**先把基的两条特征关系写成算符等式，然后只靠它们推出其余一切**——分量、标量积、矩阵乘法、换基规则，都会作为"插入单位算符"的练习掉出来。`}</Tx>
      </Sub>

      <Sub n="C-2" title="Relations characteristic of an orthonormal basis" zh="正交归一基的特征关系">
        <Sub n="C-2-a" title="Orthonormalization relation" zh="正交归一关系">
          <Tx>{R`**第一条关系管"轴与轴互不重叠、各自单位长"。**离散的一组右矢写成`}</Tx>
          <Eq n="C-1" keyEq title="正交归一关系（离散）" say="离散基矢两两正交、各自归一。">{R`\braket{u_i|u_j}=\delta_{ij}`}</Eq>
          <Tx>{R`连续的一组则把 Kronecker 符号换成 Dirac $\delta$：`}</Tx>
          <Eq n="C-2" say="连续基矢在 Dirac 意义下正交归一：自身的'范数'无穷大。">{R`\braket{w_\alpha|w_{\alpha'}}=\delta(\alpha-\alpha')`}</Eq>
          <Tx>{R`**这里容易被忽略的一点：**\eqref{C-2} 在 $\alpha=\alpha'$ 处是无穷大，也就是说 $\ket{w_\alpha}$ 的"长度"不是 1 而是发散的——它们不在 $\mathscr E$ 里。我们仍敢用它们展开 $\mathscr E$ 中的矢量，靠的是 §A-3 与 §B-2-c 建立的"广义右矢"约定。`}</Tx>
        </Sub>

        <Sub n="C-2-b" title="Closure relation" zh="封闭关系">
          <Tx>{R`**第二条关系管"轴够不够用"。**我们的路线是：先把"能展开"写成一个式子，再设法让单位算符从里面**冒出来**——冒出来的那个等式就是封闭关系。

起点是"每个右矢都能唯一展开"：`}</Tx>
          <Eq n="C-3" say="任一右矢是离散基矢的线性组合。">{R`\ket{\psi}=\sum_i c_i\ket{u_i}`}</Eq>
          <Eq n="C-4" say="任一右矢是连续基矢的'积分组合'。">{R`\ket{\psi}=\int\dd\alpha\;c(\alpha)\ket{w_\alpha}`}</Eq>
          <Tx>{R`展开系数要用第一条关系去"读"：拿一个基左矢贴到展开式左边，正交归一性只放过一项（连续时 $\delta$ 函数把积分吃掉）：`}</Tx>
          <Eq n="C-5" say="离散分量就是基矢左矢与该右矢的标量积。">{R`\braket{u_j|\psi}=c_j`}</Eq>
          <Eq n="C-6" say="连续分量同理。">{R`\braket{w_{\alpha'}|\psi}=c(\alpha')`}</Eq>
          <Tx>{R`**单位算符出现的那一步。**把读出的系数代回展开式。系数 $\braket{u_i|\psi}$ 是个数，可以搬到 $\ket{u_i}$ 的**右边**；一旦搬过去，$\ket{u_i}\bra{u_i}$ 就紧挨着出现，$\ket{\psi}$ 被提到括号外：`}</Tx>
          <Eq n="C-7" say="把分量写成标量积并把数挪到右矢后面，一个算符 $\sum|u_i\rangle \langle u_i|$ 浮现出来，作用在 $\psi$ 上又给出 $\psi$。">{R`\begin{aligned}\ket{\psi}&=\sum_i c_i\ket{u_i}=\sum_i\braket{u_i|\psi}\ket{u_i}\\&=\sum_i\ket{u_i}\braket{u_i|\psi}=\Big(\sum_i\ket{u_i}\bra{u_i}\Big)\ket{\psi}\end{aligned}`}</Eq>
          <Eq n="C-8" say="连续基同理，浮现出算符 $\int d\alpha$ $|w_\alpha\rangle \langle w_\alpha|$。">{R`\begin{aligned}\ket{\psi}&=\int\dd\alpha\;c(\alpha)\ket{w_\alpha}=\int\dd\alpha\;\braket{w_\alpha|\psi}\ket{w_\alpha}\\&=\int\dd\alpha\;\ket{w_\alpha}\braket{w_\alpha|\psi}=\Big(\int\dd\alpha\;\ket{w_\alpha}\bra{w_\alpha}\Big)\ket{\psi}\end{aligned}`}</Eq>
          <Tx>{R`括号里的算符把**任意** $\ket\psi$ 都送回 $\ket\psi$——它只能是单位算符：`}</Tx>
          <Eq n="C-9" keyEq title="封闭关系（离散）" say="所有基矢方向上的投影算符之和等于单位算符：基'不缺方向'。">{R`P_{\{u_i\}}=\sum_i\ket{u_i}\bra{u_i}=\mathbb 1`}</Eq>
          <Eq n="C-10" keyEq title="封闭关系（连续）" say="连续基的投影算符积分等于单位算符。">{R`P_{\{w_\alpha\}}=\int\dd\alpha\;\ket{w_\alpha}\bra{w_\alpha}=\mathbb 1`}</Eq>
          <Tx>{R`**反方向同样成立**，这才说明封闭关系与"是一组基"等价。这次直接从 $\mathbb 1$ 出发：任何右矢前面都可以放一个 $\mathbb 1$，再把 $\mathbb 1$ 拆开——展开式就自己出来了，系数公式也顺带给出：`}</Tx>
          <Eq n="C-11" say="在 $\psi$ 前面插入单位算符（写成封闭关系），立刻得到按基矢的展开。">{R`\begin{aligned}\ket{\psi}&=\mathbb 1\ket{\psi}=P_{\{u_i\}}\ket{\psi}=\sum_i\ket{u_i}\braket{u_i|\psi}\\&=\sum_i c_i\ket{u_i}\end{aligned}`}</Eq>
          <Eq n="C-12" say="展开系数由封闭关系自动给出：$c_i$ = $\langle u_i|\psi\rangle$。">{R`c_i=\braket{u_i|\psi}`}</Eq>
          <Tx>{R`连续基走同一条路：`}</Tx>
          <Eq n="C-13" say="连续基同理：插入连续形式的单位算符即得展开。">{R`\begin{aligned}\ket{\psi}&=\mathbb 1\ket{\psi}=P_{\{w_\alpha\}}\ket{\psi}=\int\dd\alpha\;\ket{w_\alpha}\braket{w_\alpha|\psi}\\&=\int\dd\alpha\;c(\alpha)\ket{w_\alpha}\end{aligned}`}</Eq>
          <Eq n="C-14" say="连续分量：$c(\alpha)$ = $\langle w_\alpha|\psi\rangle$。">{R`c(\alpha)=\braket{w_\alpha|\psi}`}</Eq>
          <Tx>{R`**实用的结论：**分量公式 \eqref{C-12}、\eqref{C-14} 不用背。任何时候想要分量，就在右矢前插一个 $\mathbb 1$，再把它写成基的封闭关系。`}</Tx>
          <Box kind="note" title="与 §A 的关系">{R`§E 会看到，把 \eqref{C-9}、\eqref{C-10} 夹在 $\bra{\mathbf r}$ 与 $\ket{\mathbf r'}$ 之间，立即得到 §A 用积分技巧推出的 \eqref{A-32} 与 \eqref{A-57}。`}</Box>
          <Box kind="physics" title="几何上为什么是单位算符">
            <Tx>{R`$\sum_i\ket{u_i}\bra{u_i}$ 是 §B-3-b 的那种投影算符，投影到所有 $\ket{u_i}$ 张成的子空间。基"不缺方向"意味着这个子空间就是 $\mathscr E$ 全体；把 $\mathscr E$ 里的矢量投影到 $\mathscr E$ 上，什么也没变——单位算符。

最直观的检验在普通三维空间：三根正交单位轴 $\mathbf e_1,\mathbf e_2,\mathbf e_3$ 的投影算符满足`}</Tx>
            <Eq n="C-15" say="三维空间中三个坐标轴方向的投影算符之和是单位算符——封闭关系的几何原型。">{R`P_1+P_2+P_3=\mathbb 1`}</Eq>
            <Tx>{R`拿掉一根轴，正交归一性丝毫无损，但 $P_1+P_2$ 只投影到一个平面，$(P_1+P_2)\mathbf e_3=0\neq\mathbf e_3$——封闭关系立刻失败。这说明两条关系互相独立，缺一不可。§D 的交互图里可以看到厄米矩阵各本征子空间投影之和精确等于单位矩阵。`}</Tx>
          </Box>
          <Table caption={R`表 (II-7)：在 $\{\ket{u_i}\}$ 或 $\{\ket{w_\alpha}\}$ 表象中做任何计算所需的全部基本公式`} head={[R`$\{\ket{u_i}\}$ 表象`, R`$\{\ket{w_\alpha}\}$ 表象`]} rows={[
            [R`$\braket{u_i|u_j}=\delta_{ij}$`, R`$\braket{w_\alpha|w_{\alpha'}}=\delta(\alpha-\alpha')$`],
            [R`$P_{\{u_i\}}=\sum_i\ket{u_i}\bra{u_i}=\mathbb 1$`, R`$P_{\{w_\alpha\}}=\int\dd\alpha\,\ket{w_\alpha}\bra{w_\alpha}=\mathbb 1$`],
          ]} />
        </Sub>
      </Sub>

      <Sub n="C-3" title="Representation of kets and bras" zh="右矢与左矢的表示">
        <Sub n="C-3-a" title="Representation of kets" zh="右矢的表示">
          <Tx>{R`**这一小节只做一件事：给数字定一个摆放规矩。**选定 $\{\ket{u_i}\}$ 后，右矢就等价于它的分量 $c_i=\braket{u_i|\psi}$。规矩是：**右矢的分量竖着排**，成一列（一般有可数无穷多行）。`}</Tx>
          <Eq n="C-16" say="右矢在离散基中表示为列矩阵，第 i 行是分量 $\langle u_i|\psi\rangle$。">{R`\begin{pmatrix}\braket{u_1|\psi}\\\braket{u_2|\psi}\\\vdots\\\braket{u_i|\psi}\\\vdots\end{pmatrix}`}</Eq>
          <Tx>{R`连续基下，分量是 $\alpha$ 的函数。可以想象一根竖直的 $\alpha$ 轴，轴上每个位置挂一个数 $\braket{w_\alpha|\psi}$——"连续的一列"：`}</Tx>
          <Eq n="C-17" say="右矢在连续基中表示为'连续的列'：竖轴上每个 $\alpha$ 对应一个分量 $\langle w_\alpha|\psi\rangle$。">{R`\alpha\Big\downarrow\quad\begin{pmatrix}\vdots\\\vdots\\\braket{w_\alpha|\psi}\\\vdots\\\vdots\end{pmatrix}`}</Eq>
        </Sub>

        <Sub n="C-3-b" title="Representations of bras" zh="左矢的表示">
          <Tx>{R`**左矢的展开：把 $\mathbb 1$ 插在右边。**右矢是在左边插 $\mathbb 1$；左矢的"空位"在右边，所以单位算符放在那里：`}</Tx>
          <Eq n="C-18" say="在左矢右边插入封闭关系，得到左矢按基左矢 $\langle u_i|$ 的展开，分量为 $\langle \varphi|u_i\rangle$。">{R`\bra{\varphi}=\bra{\varphi}\mathbb 1=\bra{\varphi}P_{\{u_i\}}=\sum_i\braket{\varphi|u_i}\bra{u_i}`}</Eq>
          <Tx>{R`**易错点：**左矢的分量 $\braket{\varphi|u_i}$ 与对应右矢的分量 $b_i=\braket{u_i|\varphi}$ 差一个复共轭——左右矢的对应是反线性的（§B-2-c），在分量上就体现为这个星号。连续基同理：`}</Tx>
          <Eq n="C-19" say="连续基中左矢的展开。">{R`\bra{\varphi}=\bra{\varphi}\mathbb 1=\bra{\varphi}P_{\{w_\alpha\}}=\int\dd\alpha\;\braket{\varphi|w_\alpha}\bra{w_\alpha}`}</Eq>
          <Tx>{R`这里 $\braket{\varphi|w_\alpha}=b^*(\alpha)$。

**插 $\mathbb 1$ 的第一次回报：标量积。**$\bra{\varphi}$ 与 $\ket{\psi}$ 之间本来就可以放一个 $\mathbb 1$；把它写成封闭关系，标量积立即拆成分量乘积之和——§A 中 \eqref{A-26} 要靠代入、交换求和与积分、筛选才得到，这里一行就够：`}</Tx>
          <Eq n="C-20" say="在左矢与右矢之间插入单位算符，标量积立刻化为分量乘积之和——这就是 §A 的 (A-26)。">{R`\begin{aligned}\braket{\varphi|\psi}&=\bra{\varphi}\mathbb 1\ket{\psi}=\bra{\varphi}P_{\{u_i\}}\ket{\psi}\\&=\sum_i\braket{\varphi|u_i}\braket{u_i|\psi}=\sum_ib_i^*c_i\end{aligned}`}</Eq>
          <Eq n="C-21" say="连续基中同样一步得到 (A-67)。">{R`\begin{aligned}\braket{\varphi|\psi}&=\bra{\varphi}\mathbb 1\ket{\psi}=\bra{\varphi}P_{\{w_\alpha\}}\ket{\psi}\\&=\int\dd\alpha\;\braket{\varphi|w_\alpha}\braket{w_\alpha|\psi}=\int\dd\alpha\;b^*(\alpha)\,c(\alpha)\end{aligned}`}</Eq>
          <Box kind="key" title="对比 §A">{R`同一批结果，§A 是逐条硬推的；这里每条都是"插入 $\mathbb 1$"。这就是 Dirac 记号值得学的原因：它把表象公式变成了机械操作。`}</Box>
          <Tx>{R`**左矢的摆放规矩：横着排**，成一行。这样安排是为了让标量积恰好是"行 $\times$ 列"的矩阵乘法——一行一列的结果，就是一个数：`}</Tx>
          <Eq n="C-22" say="左矢表示为行矩阵，第 i 列是分量 $\langle \varphi|u_i\rangle$。">{R`\begin{pmatrix}\braket{\varphi|u_1}&\braket{\varphi|u_2}&\cdots&\braket{\varphi|u_i}&\cdots\end{pmatrix}`}</Eq>
          <Tx>{R`连续基下，$\alpha$ 轴改成水平方向：`}</Tx>
          <Eq n="C-23" say="连续基中左矢是'连续的行'：横轴上每个 $\alpha$ 对应一个分量 $\langle \varphi|w_\alpha\rangle$。">{R`\overset{\xrightarrow{\qquad\quad\alpha\qquad\quad}}{\begin{pmatrix}\cdots\ \cdots&\braket{\varphi|w_\alpha}&\cdots\ \cdots\end{pmatrix}}`}</Eq>
          <Box kind="note" title="检查一下">{R`同一表象中，$\ket{\psi}$ 的列与 $\bra{\psi}$ 的行互为矩阵意义上的厄米共轭（转置再逐元取共轭）——这正是"右矢 ↔ 左矢反线性对应"的矩阵版本。`}</Box>
        </Sub>
      </Sub>

      <Sub n="C-4" title="Representation of operators" zh="算符的表示">
        <Sub n="C-4-a" title="Representation of A by a “square” matrix" zh="用「方阵」表示 $A$">
          <Tx>{R`**算符需要两个指标。**一个算符的信息，全在它把每个基矢送到哪里、送去后在每个基矢上有多少分量。这需要两个指标，于是定义`}</Tx>
          <Eq n="C-24" keyEq title="算符的矩阵元" say="算符在离散基中的矩阵元：第 i 个基左矢、A、第 j 个基右矢夹起来。">{R`A_{ij}=\bra{u_i}A\ket{u_j}`}</Eq>
          <Eq n="C-25" say="算符在连续基中的'矩阵元'是两个连续指标的函数。">{R`A(\alpha,\alpha')=\bra{w_\alpha}A\ket{w_{\alpha'}}`}</Eq>
          <Tx>{R`约定**第一个指标管行、第二个管列**：`}</Tx>
          <Eq n="C-26" say="算符的矩阵：第 j 列就是 $A|u_j\rangle$ 在基中的各个分量。">{R`\begin{pmatrix}A_{11}&A_{12}&\cdots&A_{1j}&\cdots\\A_{21}&A_{22}&\cdots&A_{2j}&\cdots\\\vdots&\vdots&&\vdots\\A_{i1}&A_{i2}&\cdots&A_{ij}&\cdots\\\vdots&\vdots&&\vdots\end{pmatrix}`}</Eq>
          <Tx>{R`**读法：**第 $j$ 列是 $A\ket{u_j}$ 在各基矢上的分量——"基矢 $j$ 被 $A$ 送到了哪里"。连续基下，横轴 $\alpha'$、纵轴 $\alpha$，平面上每一点挂一个数：`}</Tx>
          <Eq n="C-27" say="连续基中的算符是一张'连续矩阵'：纵轴 $\alpha$ 定行、横轴 $\alpha'$ 定列。">{R`\alpha\Big\downarrow\quad\overset{\xrightarrow{\qquad\quad\alpha'\qquad\quad}}{\begin{pmatrix}&\vdots&\\&\vdots&\\\cdots\ \cdots&A(\alpha,\alpha')&\\&&\end{pmatrix}}`}</Eq>
          <Tx>{R`**这个约定是不是随便定的？**检验方法：看乘积算符 $AB$ 的矩阵是否恰好是两个矩阵按通常规则相乘。在 $A$ 与 $B$ 之间插一个 $\mathbb 1$：`}</Tx>
          <Eq n="C-28" say="在两个算符之间插入单位算符：乘积算符的矩阵元恰好是两个矩阵按矩阵乘法规则相乘。">{R`\begin{aligned}\bra{u_i}AB\ket{u_j}&=\bra{u_i}A\mathbb 1B\ket{u_j}\\&=\bra{u_i}AP_{\{u_k\}}B\ket{u_j}\\&=\sum_k\bra{u_i}A\ket{u_k}\bra{u_k}B\ket{u_j}\end{aligned}`}</Eq>
          <Tx>{R`右边正是"$A$ 的第 $i$ 行点乘 $B$ 的第 $j$ 列"。所以"先行后列"不是任意的：只有这样排，**算符的乘积才对应矩阵的乘积**。`}</Tx>
        </Sub>

        <Sub n="C-4-b" title="Matrix representation of the ket $\ket{\psi'}=A\ket{\psi}$" zh="右矢 $\ket{\psi'}=A\ket{\psi}$ 的矩阵表示">
          <Tx>{R`**目标：**只知道 $\ket\psi$ 的分量和 $A$ 的矩阵元，求 $A\ket\psi$ 的分量。**路线：**先写出要求的东西，再在 $A$ 后面插 $\mathbb 1$，让已知量出现。要求的是`}</Tx>
          <Eq n="C-29" say="新右矢的分量就是 A 夹在基左矢与原右矢之间。">{R`c_i'=\braket{u_i|\psi'}=\bra{u_i}A\ket{\psi}`}</Eq>
          <Tx>{R`插入以后，右边裂成"矩阵元 $\times$ 分量"：`}</Tx>
          <Eq n="C-30" keyEq title="算符作用 = 矩阵乘列矢量" say="新分量 = 矩阵 $A_{ij}$ 乘以旧分量 $c_j$ 并对 j 求和：算符作用就是方阵乘列矩阵。">{R`\begin{aligned}c_i'&=\bra{u_i}A\mathbb 1\ket{\psi}=\bra{u_i}AP_{\{u_j\}}\ket{\psi}\\&=\sum_j\bra{u_i}A\ket{u_j}\braket{u_j|\psi}\\&=\sum_jA_{ij}\,c_j\end{aligned}`}</Eq>
          <Tx>{R`连续基下求和变积分，结构不变：`}</Tx>
          <Eq n="C-31" say="连续基中，求和换成对 $\alpha'$ 的积分。">{R`\begin{aligned}c'(\alpha)&=\braket{w_\alpha|\psi'}=\bra{w_\alpha}A\ket{\psi}\\&=\int\dd\alpha'\;\bra{w_\alpha}A\ket{w_{\alpha'}}\braket{w_{\alpha'}|\psi}\\&=\int\dd\alpha'\;A(\alpha,\alpha')\,c(\alpha')\end{aligned}`}</Eq>
          <Tx>{R`写成矩阵，就是熟悉的"方阵乘列向量"——算符作用 = 矩阵乘法：`}</Tx>
          <Eq n="C-32" say="矩阵形式：新列矩阵 = 方阵 $\times$ 旧列矩阵。">{R`\begin{pmatrix}c_1'\\c_2'\\\vdots\\c_i'\\\vdots\\\vdots\end{pmatrix}=\begin{pmatrix}A_{11}&A_{12}&\cdots&A_{1j}&\cdots\\A_{21}&A_{22}&\cdots&A_{2j}&\cdots\\\vdots&\vdots&&\vdots\\A_{i1}&A_{i2}&\cdots&A_{ij}&\cdots\\\vdots&\vdots&&\vdots\\\vdots&\vdots&&\vdots\end{pmatrix}\begin{pmatrix}c_1\\c_2\\\vdots\\\vdots\\c_j\\\vdots\end{pmatrix}`}</Eq>
        </Sub>

        <Sub n="C-4-c" title="Expression for the number $\bra{\varphi}A\ket{\psi}$" zh="数 $\bra{\varphi}A\ket{\psi}$ 的表达式">
          <Tx>{R`**路线：**三明治 $\bra\varphi A\ket\psi$ 有两个"缝"，各插一个 $\mathbb 1$，就把它拆成"左矢分量 $\times$ 矩阵元 $\times$ 右矢分量"。离散基：`}</Tx>
          <Eq n="C-33" say="插入两次单位算符：矩阵元化为'行 $\times$ 方阵 $\times$ 列'的双重求和。">{R`\begin{aligned}\bra{\varphi}A\ket{\psi}&=\bra{\varphi}P_{\{u_i\}}AP_{\{u_j\}}\ket{\psi}\\&=\sum_{i,j}\braket{\varphi|u_i}\bra{u_i}A\ket{u_j}\braket{u_j|\psi}\\&=\sum_{i,j}b_i^*\,A_{ij}\,c_j\end{aligned}`}</Eq>
          <Tx>{R`连续基：两个缝各插一个积分形式的 $\mathbb 1$，于是是双重积分：`}</Tx>
          <Eq n="C-34" say="连续基中化为双重积分。">{R`\begin{aligned}\bra{\varphi}A\ket{\psi}&=\bra{\varphi}P_{\{w_\alpha\}}AP_{\{w_{\alpha'}\}}\ket{\psi}\\&=\iint\dd\alpha\,\dd\alpha'\;\braket{\varphi|w_\alpha}\bra{w_\alpha}A\ket{w_{\alpha'}}\braket{w_{\alpha'}|\psi}\\&=\iint\dd\alpha\,\dd\alpha'\;b^*(\alpha)\,A(\alpha,\alpha')\,c(\alpha')\end{aligned}`}</Eq>
          <Tx>{R`把指标收拢回去，就是"行 $\times$ 方阵 $\times$ 列"：`}</Tx>
          <Eq n="C-35" say="矩阵元 = 行矩阵 $\times$ 方阵 $\times$ 列矩阵。">{R`\bra{\varphi}A\ket{\psi}=\begin{pmatrix}b_1^*&b_2^*&\cdots&b_i^*&\cdots\end{pmatrix}\begin{pmatrix}A_{11}&A_{12}&\cdots&A_{1j}&\cdots\\A_{21}&A_{22}&\cdots&A_{2j}&\cdots\\\vdots&\vdots&&\vdots\\A_{i1}&A_{i2}&\cdots&A_{ij}&\cdots\\\vdots&\vdots&&\vdots\\\vdots&\vdots&&\vdots\end{pmatrix}\begin{pmatrix}c_1\\c_2\\\vdots\\\vdots\\c_j\\\vdots\end{pmatrix}`}</Eq>
          <Tx>{R`**矩阵语言把 Dirac 记号的语法变成了"形状检查"。**行（$1\times\infty$）乘方阵还是行——所以 $\bra{\varphi}A$ 是左矢；方阵乘行在形状上就不合法——所以 $A\bra{\varphi}$ 没有意义。\eqref{B-41} 中"括号放哪都一样"，在这里不过是三个矩阵相乘的结合律。同样的形状检查也区分了数与算符：列乘行得到方阵，`}</Tx>
          <Eq n="C-36" say="列矩阵 $\times$ 行矩阵 = 方阵：外积 $|\psi\rangle \langle \psi|$ 是算符；反过来行 $\times$ 列 = 数（标量积）。">{R`\begin{pmatrix}c_1\\c_2\\\vdots\\c_i\\\vdots\end{pmatrix}\begin{pmatrix}c_1^*&c_2^*&\cdots&c_j^*&\cdots\end{pmatrix}=\begin{pmatrix}c_1c_1^*&c_1c_2^*&\cdots&c_1c_j^*&\cdots\\c_2c_1^*&c_2c_2^*&\cdots&c_2c_j^*&\cdots\\\vdots&\vdots&&\vdots\\c_ic_1^*&c_ic_2^*&\cdots&c_ic_j^*&\cdots\\\vdots&\vdots&&\vdots\end{pmatrix}`}</Eq>
          <Tx>{R`它确实是算符；而 $\braket{\psi|\psi}$ 是"行 $\times$ 列"，是数。`}</Tx>
        </Sub>

        <Sub n="C-4-d" title="Matrix representation of the adjoint $A^\dagger$ of A" zh="伴随算符 $A^\dagger$ 的矩阵表示">
          <Tx>{R`**要回答的问题：**"取伴随"这个抽象操作，落到矩阵上是什么？只需把 \eqref{B-49} 用在两个基矢上：`}</Tx>
          <Eq n="C-37" keyEq title="伴随 = 转置共轭" say="伴随算符的矩阵 = 原矩阵转置后取复共轭。">{R`(A^\dagger)_{ij}=\bra{u_i}A^\dagger\ket{u_j}=\bra{u_j}A\ket{u_i}^*=A_{ji}^*`}</Eq>
          <Eq n="C-38" say="连续基中同样：交换两个指标再取复共轭。">{R`A^\dagger(\alpha,\alpha')=\bra{w_\alpha}A^\dagger\ket{w_{\alpha'}}=\bra{w_{\alpha'}}A\ket{w_\alpha}^*=A^*(\alpha',\alpha)`}</Eq>
          <Tx>{R`答案：**行列互换，再逐元取共轭**——矩阵意义上的厄米共轭。

**厄米算符在任何正交归一表象中都是厄米矩阵。**令 $A^\dagger=A$，上两式的左边就是 $A$ 自己的矩阵元：`}</Tx>
          <Eq n="C-39" keyEq title="厄米矩阵" say="厄米算符由厄米矩阵表示：关于主对角线对称的两个元素互为复共轭。">{R`A_{ij}=A_{ji}^*`}</Eq>
          <Eq n="C-40" say="连续基中厄米算符的'矩阵'满足同样的对称性。">{R`A(\alpha,\alpha')=A^*(\alpha',\alpha)`}</Eq>
          <Tx>{R`关于主对角线镜像对称的两个元素互为共轭。主对角线上的元素是"自己的镜像"，于是被迫等于自己的共轭：`}</Tx>
          <Eq n="C-41" say="厄米矩阵的对角元等于自己的复共轭，即为实数。">{R`A_{ii}=A_{ii}^*`}</Eq>
          <Eq n="C-42" say="连续情形同样：对角'元'为实数。">{R`A(\alpha,\alpha)=A^*(\alpha,\alpha)`}</Eq>
          <Tx>{R`**厄米矩阵的对角元必为实数**——§D 中"厄米算符的本征值是实数"的先兆（本征表象里，对角元就是本征值）。`}</Tx>
        </Sub>
      </Sub>

      <Sub n="C-5" title="Change of representations" zh="表象变换">
        <Sub n="C-5-a" title="Outline of the problem" zh="问题的提出">
          <Tx>{R`**问题：**同一个对象在两个表象中各有一个矩阵，怎样互相换算？以两组离散正交归一基 $\{\ket{u_i}\}\to\{\ket{t_k}\}$ 为例（连续基之间的例子见 §E，就是 Fourier 变换）。

**唯一需要的输入**是"新基矢在旧基中的分量"。把它们排成矩阵——注意下标顺序：行号属于旧基，列号属于新基，于是第 $k$ 列就是新基矢 $\ket{t_k}$ 的旧坐标：`}</Tx>
          <Eq n="C-43" keyEq title="变换矩阵" say="变换矩阵的第 k 列 = 第 k 个新基矢在旧基中的分量。">{R`S_{ik}=\braket{u_i|t_k}`}</Eq>
          <Tx>{R`它的厄米共轭交换了角色——行号属于新基，给的是旧基矢的新坐标：`}</Tx>
          <Eq n="C-44" say="变换矩阵的厄米共轭：旧基矢在新基中的分量。">{R`(S^\dagger)_{ki}=(S_{ik})^*=\braket{t_k|u_i}`}</Eq>
          <Tx>{R`**工具箱**就是两套基各自的两条关系。封闭关系：`}</Tx>
          <Eq n="C-45" say="旧基的封闭关系。">{R`P_{\{u_i\}}=\sum_i\ket{u_i}\bra{u_i}=\mathbb 1`}</Eq>
          <Eq n="C-46" say="新基的封闭关系。">{R`P_{\{t_k\}}=\sum_k\ket{t_k}\bra{t_k}=\mathbb 1`}</Eq>
          <Tx>{R`正交归一关系：`}</Tx>
          <Eq n="C-47" say="旧基正交归一。">{R`\braket{u_i|u_j}=\delta_{ij}`}</Eq>
          <Eq n="C-48" say="新基正交归一。">{R`\braket{t_k|t_l}=\delta_{kl}`}</Eq>
          <Tx>{R`**第一个推论：$S$ 是幺正的**（参见补充材料 $\mathrm{C_{II}}$）。这是"从一组正交归一基换到另一组"的必然结果——长度与夹角不变：`}</Tx>
          <Eq n="C-49" keyEq title="变换矩阵是幺正的" say="基变换矩阵是幺正的：它的厄米共轭就是它的逆——正交归一基之间的变换保持长度与夹角。">{R`S^\dagger S=SS^\dagger=I`}</Eq>
          <Tx>{R`验证的路线：把矩阵乘积的求和指标认作"缺失的单位算符"。$S^\dagger S$ 的求和跑遍旧基，正好补成旧基的 $\mathbb 1$：`}</Tx>
          <Eq n="C-50" say="插入旧基的封闭关系，$S^\dagger S$ 的矩阵元变成新基矢的标量积，即 $\delta_{kl}$。">{R`\begin{aligned}(S^\dagger S)_{kl}&=\sum_iS_{ki}^\dagger S_{il}=\sum_i\braket{t_k|u_i}\braket{u_i|t_l}\\&=\braket{t_k|t_l}=\delta_{kl}\end{aligned}`}</Eq>
          <Tx>{R`$SS^\dagger$ 的求和跑遍新基，补成新基的 $\mathbb 1$：`}</Tx>
          <Eq n="C-51" say="插入新基的封闭关系，$SS^\dagger$ 的矩阵元变成旧基矢的标量积。">{R`\begin{aligned}(SS^\dagger)_{ij}&=\sum_kS_{ik}S_{kj}^\dagger=\sum_k\braket{u_i|t_k}\braket{t_k|u_j}\\&=\braket{u_i|u_j}=\delta_{ij}\end{aligned}`}</Eq>
          <Tx>{R`**提醒：**无穷维时，$S^\dagger S=I$ 并不能自动推出 $SS^\dagger=I$；这里两式都成立，是因为两组都是**完备**的基（两条封闭关系都用上了）。`}</Tx>
        </Sub>

        <Sub n="C-5-b" title="Transformation of the components of a ket" zh="右矢分量的变换">
          <Tx>{R`**路线：**想要新分量 $\braket{t_k|\psi}$，就在中间插入**旧**基的 $\mathbb 1$，让已知的旧分量出现：`}</Tx>
          <Eq n="C-52" say="新分量 = $S^\dagger$ 乘旧分量。">{R`\begin{aligned}\braket{t_k|\psi}&=\bra{t_k}\mathbb 1\ket{\psi}=\bra{t_k}P_{\{u_i\}}\ket{\psi}\\&=\sum_i\braket{t_k|u_i}\braket{u_i|\psi}\\&=\sum_iS_{ki}^\dagger\braket{u_i|\psi}\end{aligned}`}</Eq>
          <Tx>{R`反方向插入**新**基的 $\mathbb 1$：`}</Tx>
          <Eq n="C-53" say="旧分量 = S 乘新分量。">{R`\begin{aligned}\braket{u_i|\psi}&=\bra{u_i}\mathbb 1\ket{\psi}=\bra{u_i}P_{\{t_k\}}\ket{\psi}\\&=\sum_k\braket{u_i|t_k}\braket{t_k|\psi}\\&=\sum_kS_{ik}\braket{t_k|\psi}\end{aligned}`}</Eq>
          <Tx>{R`**易错点：**新分量用的是 $S^\dagger$ 而不是 $S$。原因见 \eqref{C-43}：$S$ 的列是新基矢的旧坐标——它把"新坐标"翻译成"旧坐标"，所以反方向要用它的逆 $S^\dagger$。`}</Tx>
        </Sub>

        <Sub n="C-5-c" title="Transformation of the components of a bra" zh="左矢分量的变换">
          <Tx>{R`左矢没有新东西：同样插一个旧基的 $\mathbb 1$，只是这次左矢分量是"行"，$S$ 从右边乘上去：`}</Tx>
          <Eq n="C-54" say="左矢的新分量 = 旧分量（行）右乘 S。">{R`\begin{aligned}\braket{\psi|t_k}&=\bra{\psi}\mathbb 1\ket{t_k}=\bra{\psi}P_{\{u_i\}}\ket{t_k}\\&=\sum_i\braket{\psi|u_i}\braket{u_i|t_k}\\&=\sum_i\braket{\psi|u_i}S_{ik}\end{aligned}`}</Eq>
        </Sub>

        <Sub n="C-5-d" title="Transformation of the matrix elements of an operator" zh="算符矩阵元的变换">
          <Tx>{R`**路线：**算符的矩阵元有两个缝，各插一次旧基的 $\mathbb 1$：`}</Tx>
          <Eq n="C-55" say="新基中的矩阵元：两边各插入一次旧基的封闭关系。">{R`\begin{aligned}\bra{t_k}A\ket{t_l}&=\bra{t_k}P_{\{u_i\}}AP_{\{u_j\}}\ket{t_l}\\&=\sum_{i,j}\braket{t_k|u_i}\bra{u_i}A\ket{u_j}\braket{u_j|t_l}\end{aligned}`}</Eq>
          <Tx>{R`两端的标量积认出是 $S^\dagger$ 与 $S$，于是新矩阵 = $S^\dagger\times$ 旧矩阵 $\times S$：`}</Tx>
          <Eq n="C-56" keyEq title="算符矩阵的变换" say="新基中的矩阵 = $S^\dagger$ $\times$ 旧矩阵 $\times$ S：相似变换（幺正变换）。">{R`A_{kl}=\sum_{i,j}S_{ki}^\dagger\,A_{ij}\,S_{jl}`}</Eq>
          <Tx>{R`（这里靠指标字母区分：$A_{kl}$ 是新基中的 $\bra{t_k}A\ket{t_l}$，$A_{ij}$ 是旧基中的 $\bra{u_i}A\ket{u_j}$。）反向插新基的 $\mathbb 1$，得到逆变换：`}</Tx>
          <Eq n="C-57" say="反变换：旧矩阵 = S $\times$ 新矩阵 $\times$ $S^\dagger$。">{R`\begin{aligned}A_{ij}&=\bra{u_i}A\ket{u_j}=\bra{u_i}P_{\{t_k\}}AP_{\{t_l\}}\ket{u_j}\\&=\sum_{k,l}\braket{u_i|t_k}\bra{t_k}A\ket{t_l}\braket{t_l|u_j}\\&=\sum_{k,l}S_{ik}\,A_{kl}\,S_{lj}^\dagger\end{aligned}`}</Eq>
          <Box kind="physics" title="矩阵语言的总结">{R`新分量列 $=S^\dagger\times$ 旧分量列；新算符矩阵 $=S^\dagger AS$。若新基恰好由 $A$ 的本征矢组成，$S^\dagger AS$ 就是**对角矩阵**——这正是 §D 要做的事："对角化一个算符" = "找一个让它变成对角矩阵的幺正变换"。`}</Box>
        </Sub>
      </Sub>
    </Sec>);
}
