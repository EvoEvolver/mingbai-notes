// §11.2 陈类 —— 式 (11.25)–(11.46d)，定理 11.3–11.4，例 11.1，习题 11.1
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Derivation, Exercise, C } from "@kit";

const R = String.raw;

export function Sec112() {
  return (
    <Sec n="11.2" title="Chern classes" zh="陈类"
      gist={R`全陈类 $c(\mathcal{F})=\det(I+\mathrm{i}\mathcal{F}/2\pi)=1+c_1+c_2+\cdots$，$c_j$ 是 $2j$ 形式 → 对角化：$c_j$ 是陈根 $x_j$ 的初等对称函数，$c_1=\frac{\mathrm{i}}{2\pi}\Tr\mathcal{F}$，$c_2=\frac12(\frac{\mathrm{i}}{2\pi})^2[\Tr\mathcal{F}\wedge\Tr\mathcal{F}-\Tr\mathcal{F}\wedge\mathcal{F}]$ → 自然性与 Whitney 和 $c(E\oplus F)=c(E)c(F)$ → 分裂原理 $c(E)=\prod(1+x_i)$ → Grassmann 流形上的万有丛与公理化定义。`}
      why={R`行列式是最自然的不变多项式：$\det(I+tA)$ 的系数恰好是 $A$ 的特征值的全部初等对称函数，任何不变多项式都能由它们表达。所以陈类是复向量丛的"基本"示性类，其余的类（陈特征、Todd 类）都可以写成陈类的多项式。`}
      gives={["11.25", "11.26", "11.28", "11.29", "11.31", "11.32", "11.33", "11.39", "11.41", "11.46c"]}>
      <p className="muted">本节概念：<C id="chern_class" /> · <C id="splitting" /> · <C id="characteristic_class" /></p>

      <Sub n="11.2.1" title="Definitions" zh="定义">
        <Tx>{R`设 $E\xrightarrow{\pi}M$ 是纤维为 $\C^k$ 的复向量丛。结构群 $G$ 是 $\mathrm{GL}(k,\C)$ 的子群，规范势 $\mathcal{A}$ 与场强 $\mathcal{F}$ 取值于 $\mathfrak{g}$。定义**全陈类**（total Chern class）`}</Tx>
        <Eq n="11.25" keyEq title="全陈类" say={R`全陈类：把场强乘以 $\mathrm{i}/2\pi$（使之成为 Hermite 的、并恰好归一化为整数类）后加上单位阵取行列式。`}>{R`c(\mathcal{F})\equiv\det\Big(I+\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big).`}</Eq>
        <Tx>{R`由于 $\mathcal{F}$ 是二形式，$c(\mathcal{F})$ 是偶数次形式的直和：`}</Tx>
        <Eq n="11.26" say={R`按形式的次数展开：第 $j$ 项是 $2j$ 形式，称为第 $j$ 陈类。`}>{R`c(\mathcal{F})=1+c_1(\mathcal{F})+c_2(\mathcal{F})+\cdots`}</Eq>
        <Tx>{R`其中 $c_j(\mathcal{F})\in\Omega^{2j}(M)$ 称为第 $j$ **陈类**（Chern class）。在 $m$ 维流形 $M$ 上，$2j>m$ 的陈类 $c_j(\mathcal{F})$ 平凡地为零。不论 $\dim M$ 是多少，级数都终止于 $c_k(\mathcal{F})=\det(\mathrm{i}\mathcal{F}/2\pi)$，$j>k$ 时 $c_j(\mathcal{F})=0$（$k\times k$ 矩阵的行列式至多是 $k$ 次的）。由于 $c_j(\mathcal{F})$ 是闭的（\sref{T11.1}），它定义 $H^{2j}(M)$ 的元素 $[c_j(\mathcal{F})]$。`}</Tx>
        <Box kind="physics" title={R`为什么是 $\mathrm{i}/2\pi$`}>{R`本书取李代数生成元为反 Hermite 的（$\mathfrak{u}(k)$），所以 $\mathcal{F}$ 是反 Hermite 矩阵值形式，$\mathrm{i}\mathcal{F}$ 才是 Hermite 的，$\det(I+\mathrm{i}\mathcal{F}/2\pi)$ 是实形式。$2\pi$ 是让积分成为整数的归一化：例 11.4 中 $\CP^1$ 上典范线丛 $\int c_1=-1$，交互图 1 中单极子丛 $\int c_1=-2g\in\Z$。`}</Box>

        <Box kind="example" n="11.1" title={R`$\mathrm{SU}(2)$ 丛的陈类`}>
          <Tx>{R`设 $F$ 是 $M$ 上纤维为 $\C^2$ 的复向量丛，$G=\mathrm{SU}(2)$，$\dim M=4$。写场强 $\mathcal{F}=\mathcal{F}^\alpha(\sigma_\alpha/2\mathrm{i})$，$\mathcal{F}^\alpha=\frac12\mathcal{F}^\alpha{}_{\mu\nu}\dd x^\mu\wedge\dd x^\nu$，则`}</Tx>
          <Eq n="11.27" say={R`代入 Pauli 矩阵直接算 $2\times2$ 行列式：对角元的乘积与非对角元的乘积合起来，只剩三个分量的"平方和"——一阶项因无迹而消失。`}>{R`\begin{aligned}c(\mathcal{F})&=\det\Big(I+\frac{\mathrm{i}}{2\pi}\mathcal{F}^\alpha(\sigma_\alpha/2\mathrm{i})\Big)\\&=\det\begin{pmatrix}1+(\mathrm{i}/2\pi)(\mathcal{F}^3/2\mathrm{i})&(\mathrm{i}/2\pi)(\mathcal{F}^1-\mathrm{i}\mathcal{F}^2)/2\mathrm{i}\\(\mathrm{i}/2\pi)(\mathcal{F}^1+\mathrm{i}\mathcal{F}^2)/2\mathrm{i}&1-(\mathrm{i}/2\pi)(\mathcal{F}^3/2\mathrm{i})\end{pmatrix}\\&=1+\frac14\Big(\frac{\mathrm{i}}{2\pi}\Big)^2\big(\mathcal{F}^3\wedge\mathcal{F}^3+\mathcal{F}^1\wedge\mathcal{F}^1+\mathcal{F}^2\wedge\mathcal{F}^2\big).\end{aligned}`}</Eq>
          <Derivation title="行列式的展开（补充）" collapsed steps={[
            { tex: R`a\equiv\frac{\mathrm{i}}{2\pi}\frac{\mathcal{F}^3}{2\mathrm{i}}=\frac{\mathcal{F}^3}{4\pi},\quad b\equiv\frac{\mathcal{F}^1-\mathrm{i}\mathcal{F}^2}{4\pi},\quad c\equiv\frac{\mathcal{F}^1+\mathrm{i}\mathcal{F}^2}{4\pi}`, why: R`矩阵为 $\begin{pmatrix}1+a&b\\c&1-a\end{pmatrix}$。` },
            { tex: R`\det=(1+a)(1-a)-bc=1-a\wedge a-b\wedge c`, why: R`二形式彼此交换，所以 $2\times2$ 行列式照常展开。` },
            { tex: R`b\wedge c=\frac{(\mathcal{F}^1)^2+(\mathcal{F}^2)^2}{16\pi^2}\ \Rightarrow\ \det=1-\frac{1}{16\pi^2}\sum_\alpha\mathcal{F}^\alpha\wedge\mathcal{F}^\alpha=1+\frac14\Big(\frac{\mathrm{i}}{2\pi}\Big)^2\sum_\alpha\mathcal{F}^\alpha\wedge\mathcal{F}^\alpha`, why: R`$(\mathcal{F}^1-\mathrm{i}\mathcal{F}^2)(\mathcal{F}^1+\mathrm{i}\mathcal{F}^2)=(\mathcal{F}^1)^2+(\mathcal{F}^2)^2$（交叉项因交换而相消）；$\frac14(\frac{\mathrm{i}}{2\pi})^2=-\frac1{16\pi^2}$。` },
          ]} />
          <Tx>{R`各陈类为`}</Tx>
          <Eq n="11.28" title={R`$\mathrm{SU}(2)$：$c_1=0$，$c_2=\det$`} say={R`$\mathrm{SU}(2)$ 丛没有第一陈类（无迹），第二陈类就是 $\mathrm{i}\mathcal{F}/2\pi$ 的行列式——它的积分（差一个符号）就是瞬子数。`}>{R`c_0(\mathcal{F})=1\qquad c_1(\mathcal{F})=0\qquad c_2(\mathcal{F})=\Big(\frac{\mathrm{i}}{2\pi}\Big)^2\sum\frac{\mathcal{F}^\alpha\wedge\mathcal{F}^\alpha}{4}=\det\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big).`}</Eq>
          <Tx>{R`更高的陈类恒为零。`}</Tx>
        </Box>

        <Tx>{R`**对角化：陈根。**对一般的纤维丛，展开行列式来计算陈类相当麻烦，我们希望找到更简便的公式。办法是把曲率形式对角化。用适当的矩阵 $g\in\mathrm{GL}(k,\C)$ 把 $\mathcal{F}$ 对角化：$g^{-1}(\mathrm{i}\mathcal{F}/2\pi)g=\mathrm{diag}(x_1,\ldots,x_k)$，其中 $x_i$ 是二形式。这个对角矩阵记作 $A$。例如若 $G=\mathrm{SU}(k)$，生成元取为反 Hermite 的，Hermite 矩阵 $\mathrm{i}\mathcal{F}/2\pi$ 可以用 $g\in\mathrm{SU}(k)$ 对角化。我们有`}</Tx>
        <Eq n="11.29" title="陈根展开" say={R`行列式对角化后变成 $\prod(1+x_j)$；展开后第 $j$ 阶就是陈根的第 $j$ 个初等对称函数，也可以用迹表示。`}>{R`\begin{aligned}\det(I+A)&=\det[\mathrm{diag}(1+x_1,1+x_2,\ldots,1+x_k)]=\prod_{j=1}^k(1+x_j)\\&=1+(x_1+\cdots+x_k)+(x_1x_2+\cdots+x_{k-1}x_k)+\cdots+(x_1x_2\cdots x_k)\\&=1+\Tr A+\tfrac12\{(\Tr A)^2-\Tr A^2\}+\cdots+\det A.\end{aligned}`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{11.29} 的最后一项（p.447）`}>{R`原书第三行的最后一项印作 $(x_1x_2+\cdots+x_k)$，应为乘积 $(x_1x_2\cdots x_k)=\det A$（第 $k$ 个初等对称函数只有一项）。本站已改正。`}</Box>
        <Tx>{R`可以看到 \eqref{11.29} 的每一项都是 $\{x_j\}$ 的初等对称函数：`}</Tx>
        <Eq n="11.30" say={R`初等对称函数：从 $k$ 个根中取 $r$ 个相乘再求和——它们恰好是多项式 $\prod(1+x_jt)$ 的系数。`}>{R`S_0(x_j)\equiv1,\quad S_1(x_j)\equiv\sum_{j=1}^kx_j,\quad S_2(x_j)\equiv\sum_{i<j}x_ix_j,\quad\ldots,\quad S_k(x_j)\equiv x_1x_2\cdots x_k.`}</Eq>
        <Tx>{R`由于 $\det(I+A)$ 是不变多项式，由 \eqref{11.7} 有 $P(\mathcal{F})=P(g\mathcal{F}g^{-1})=P(2\pi A/\mathrm{i})$——不管是否真能对角化，不变多项式在 $\mathcal{F}$ 与 $A$ 上取同样的值。因此对一般的 $\mathcal{F}$，`}</Tx>
        <Eq n="11.31" keyEq title="陈类的迹表达" say={R`前几个陈类用场强的迹写出：$c_1$ 是迹，$c_2$ 是"迹的平方减平方的迹"的一半，最高的 $c_k$ 是行列式。`}>{R`\begin{aligned}c_0(\mathcal{F})&=1\\c_1(\mathcal{F})&=\Tr A=\Tr\Big(g\frac{\mathrm{i}\mathcal{F}}{2\pi}g^{-1}\Big)=\frac{\mathrm{i}}{2\pi}\Tr\mathcal{F}\\c_2(\mathcal{F})&=\tfrac12[(\Tr A)^2-\Tr A^2]=\tfrac12(\mathrm{i}/2\pi)^2[\Tr\mathcal{F}\wedge\Tr\mathcal{F}-\Tr(\mathcal{F}\wedge\mathcal{F})]\\&\ \,\vdots\\c_k(\mathcal{F})&=\det A=(\mathrm{i}/2\pi)^k\det\mathcal{F}.\end{aligned}`}</Eq>
        <Tx>{R`（原书 $c_2$ 一行把对角矩阵 $A$ 印成了花体 $\mathcal{A}$；这里的 $A$ 是对角化的 $\mathrm{i}\mathcal{F}/2\pi$，不是规范势。）由 \eqref{11.31} 容易验证例 11.1。［注意 Pauli 矩阵（一般地，$\mathrm{SU}(n)$ 的李代数 $\mathfrak{su}(n)$ 的任何元素）无迹：$\Tr\sigma_\alpha=0$。］`}</Tx>
        <Derivation title={R`$c_2$ 与 $c_3$ 的迹公式从哪里来（Newton 恒等式，补充）`} collapsed steps={[
          { tex: R`s_n\equiv\Tr A^n=\sum_jx_j^n`, why: R`幂和。` },
          { tex: R`S_1=s_1,\qquad S_2=\tfrac12(s_1^2-s_2),\qquad S_3=\tfrac16(s_1^3-3s_1s_2+2s_3)`, why: R`Newton 恒等式 $nS_n=\sum_{i=1}^n(-1)^{i-1}S_{n-i}s_i$。例：$(\sum x)^2=\sum x^2+2\sum_{i<j}x_ix_j$。` },
          { tex: R`c_3(\mathcal{F})=\frac16\Big(\frac{\mathrm{i}}{2\pi}\Big)^3\big[(\Tr\mathcal{F})^3-3\Tr\mathcal{F}\Tr\mathcal{F}^2+2\Tr\mathcal{F}^3\big]`, why: R`代入 $A\to\frac{\mathrm{i}}{2\pi}\mathcal{F}$；形式的乘积均为 $\wedge$。交互图 2 对任意 $k$ 用同一方法符号地展开。` },
        ]} />
      </Sub>

      <Sub n="11.2.2" title="Properties of Chern classes" zh="陈类的性质">
        <Tx>{R`下面要同时处理几个向量丛。我们常把向量丛 $E$ 的陈类记作 $c(E)$；需要指明曲率时写 $c(\mathcal{F}_E)$。`}</Tx>
        <Stmt id="T11.3">
          <Proof steps={[
            { claim: R`(a) 自然性由\sref{T11.2}(b) 直接得到（原书误写为 11.2(a)）。具体地，$f^*E$ 的曲率是 $\mathcal{F}_{f^*E}=f^*\mathcal{F}_E$，所以`, tex: R`c(f^*E)=\det\Big(I+\frac{\mathrm{i}}{2\pi}\mathcal{F}_{f^*E}\Big)=\det\Big(I+\frac{\mathrm{i}}{2\pi}f^*\mathcal{F}_E\Big)=f^*\det\Big(I+\frac{\mathrm{i}}{2\pi}\mathcal{F}_E\Big)=f^*c(E).`, uses: ["T11.2"] },
            { claim: R`(b) 考虑分块矩阵 $A=\begin{pmatrix}B&0\\0&C\end{pmatrix}$ 的陈多项式。［Whitney 和丛的曲率是分块对角的：$\mathcal{F}_{E\oplus F}=\mathrm{diag}(\mathcal{F}_E,\mathcal{F}_F)$，因为 \eqref{9.37} 的转移函数分块对角，可以取分块对角的联络。］`, tex: R`\det\Big(I+\frac{\mathrm{i}A}{2\pi}\Big)=\det\begin{pmatrix}I+\frac{\mathrm{i}B}{2\pi}&0\\0&I+\frac{\mathrm{i}C}{2\pi}\end{pmatrix}=\det\Big(I+\frac{\mathrm{i}B}{2\pi}\Big)\det\Big(I+\frac{\mathrm{i}C}{2\pi}\Big)=c(B)c(C).`, uses: ["9.37"] },
            { claim: R`把 $B$、$C$ 换成 $\mathcal{F}_E$、$\mathcal{F}_F$ 这个关系仍成立（矩阵元是交换的二形式），即 $c(\mathcal{F}_{E\oplus F})=c(\mathcal{F}_E)\wedge c(\mathcal{F}_F)$，这就证明了 \eqref{11.33}。由\sref{T11.1}(b)，用分块对角联络算得的结果就是 $E\oplus F$ 的陈类。`, fill: true },
          ]} />
        </Stmt>
        <Eq n="11.32" title="陈类的自然性" say={R`拉回丛的陈类等于陈类的拉回。`}>{R`c(f^*E)=f^*c(E).`}</Eq>
        <Eq n="11.33" keyEq title="Whitney 和公式" say={R`直和丛的全陈类是两个全陈类的（外）积：分块对角矩阵的行列式等于各块行列式之积。`}>{R`c(E\oplus F)=c(E)\wedge c(F).`}</Eq>
        <Exercise n="11.1" title="平凡丛与平凡因子" level="★"
          hint={R`(a) 推论 11.1：平凡丛的示性类平凡；注意 $c_0=1$ 是常数项。(b) 用 Whitney 和公式 \eqref{11.33} 与 (a)。`}
          solution={R`**(a)** 由\sref{C11.1}，$E$ 的一切示性类在正次数上平凡：$[c_j(E)]=0\in H^{2j}(M)$（$j\ge1$）。而 $c_0=1$。所以作为上同调类 $c(E)=1$。更直接地：平凡丛上可取整体平凡化下的联络 $\mathcal{A}=0$，$\mathcal{F}=0$，$c(\mathcal{F})=\det I=1$ 作为形式就成立；换联络只改变恰当形式。

**(b)** 由 \eqref{11.33} 与 (a)，$c(E)=c(E_1)\wedge c(E_2)=c(E_1)\wedge1=c(E_1)$。而 $E_1$ 的纤维维数为 $k_1$，$c(E_1)=\det(I+\mathrm{i}\mathcal{F}_{E_1}/2\pi)$ 是 $k_1\times k_1$ 矩阵的行列式，展开后最高到 $c_{k_1}(E_1)$。所以 $c_i(E)=c_i(E_1)=0$ 对 $k_1+1\le i\le k_1+k_2$。

**意义。**若一个 $k$ 维复向量丛的 $c_k\neq0$，它就不能分出一个平凡线丛——等价地，它没有处处非零的截面。这是"陈类是障碍"的一个具体形式（最高陈类是 Euler 类，见 §11.4.2）。`}>
          {R`(a) 设 $E$ 是平凡丛，用推论 11.1 证明 $c(E)=1$（下面的 \eqref{11.34}）。

(b) 设 $E=E_1\oplus E_2$，其中 $E_1$ 是 $k_1$ 维向量丛，$E_2$ 是 $k_2$ 维平凡向量丛。证明 $c_i(E)=0$，$k_1+1\le i\le k_1+k_2$（下面的 \eqref{11.35}）。`}
        </Exercise>
        <Eq n="11.34" say={R`平凡丛的全陈类就是 1：没有任何扭曲。`}>{R`c(E)=1.`}</Eq>
        <Eq n="11.35" say={R`分出一个 $k_2$ 维平凡因子后，高于 $k_1$ 阶的陈类都消失：陈类的"最高非零阶"衡量丛有多少维是真正扭曲的。`}>{R`c_i(E)=0\qquad k_1+1\le i\le k_1+k_2.`}</Eq>
      </Sub>

      <Sub n="11.2.3" title="Splitting principle" zh="分裂原理">
        <Tx>{R`**动机。**\eqref{11.29} 中的陈根 $x_j$ 看起来只是一个计算技巧。这一小节给它一个几何解释：$x_j$ 就是 $k$ 个复线丛的第一陈类。设 $E$ 是 $n$ 个复线丛的 Whitney 和：`}</Tx>
        <Eq n="11.36" say={R`最简单的高维丛：$n$ 个线丛并排放在一起。`}>{R`E=L_1\oplus L_2\oplus\cdots\oplus L_n.`}</Eq>
        <Tx>{R`由 \eqref{11.33}，`}</Tx>
        <Eq n="11.37" say={R`线丛之和的全陈类是各线丛全陈类之积。`}>{R`c(E)=c(L_1)c(L_2)\cdots c(L_n)`}</Eq>
        <Tx>{R`这里的乘积是微分形式的外积。由于 $r\ge2$ 时 $c_r(L)=0$（$1\times1$ 矩阵），记`}</Tx>
        <Eq n="11.38" say={R`线丛的全陈类只有两项：1 加它的第一陈类，记为 $x_i$。`}>{R`c(L_i)=1+c_1(L_i)\equiv1+x_i.`}</Eq>
        <Tx>{R`于是 \eqref{11.37} 成为`}</Tx>
        <Eq n="11.39" title="分裂原理" say={R`线丛之和的全陈类恰好是 $\prod(1+x_i)$——与把曲率对角化得到的式子 \eqref{11.29} 一模一样。`}>{R`c(E)=\prod_{i=1}^n(1+x_i).`}</Eq>
        <Tx>{R`与 \eqref{11.29} 比较可见，$n$ 维向量丛 $E$ 的陈类与 $n$ 个复线丛的 Whitney 和的陈类完全相同。虽然 $E$ 一般不是复线丛的 Whitney 和，但就陈类而言，我们可以假装它是。这称为**分裂原理**（splitting principle），我们不加证明地接受它；一般证明见 Shanahan (1978)、Hirzebruch (1966) 等。`}</Tx>
        <Stmt id="X:splitting" toc={false} />
        <Tx>{R`直观地说，若曲率 $\mathcal{F}$ 被对角化，$g$ 作用的复向量空间就分裂成 $k$ 个独立的部分：$\C^k\to\C\oplus\cdots\oplus\C$。本征值 $x_i$ 是每个复线丛中的曲率。由于可对角化矩阵在 $M(n,\C)$ 中稠密，任何矩阵都能被对角矩阵任意逼近，而不变多项式是连续的。因此分裂原理适用于任何矩阵。作为练习，读者可以用分裂原理证明 \eqref{11.33}：`}</Tx>
        <Derivation title={R`用分裂原理证明 Whitney 和公式 \eqref{11.33}（补充）`} collapsed steps={[
          { tex: R`E\sim L_1\oplus\cdots\oplus L_k,\qquad F\sim L'_1\oplus\cdots\oplus L'_l`, why: R`对 $E$、$F$ 各自用分裂原理，陈根分别为 $x_1,\ldots,x_k$ 与 $y_1,\ldots,y_l$。` },
          { tex: R`E\oplus F\sim L_1\oplus\cdots\oplus L_k\oplus L'_1\oplus\cdots\oplus L'_l`, why: R`$E\oplus F$ 的曲率是 $\mathrm{diag}(\mathcal{F}_E,\mathcal{F}_F)$，它的本征值就是两组陈根合在一起。` },
          { tex: R`c(E\oplus F)=\prod_{i=1}^k(1+x_i)\prod_{a=1}^l(1+y_a)=c(E)\wedge c(F)`, why: R`乘积按因子分组。` },
        ]} />
        <Box kind="aside" title="分裂原理的拓扑版本（补充）">{R`代数论证（"对角矩阵稠密"）说明了公式为什么成立，但真正的分裂原理是拓扑命题：对任何复向量丛 $E\to M$，存在一个"旗丛" $\sigma:F(E)\to M$，使得 (1) 拉回丛 $\sigma^*E$ 确实同构于线丛之和 $L_1\oplus\cdots\oplus L_k$；(2) $\sigma^*:H^*(M)\to H^*(F(E))$ 是单射。于是要验证 $M$ 上关于 $c(E)$ 的恒等式，只需在 $F(E)$ 上对 $\sigma^*E$ 验证——而那里 $c(\sigma^*E)=\prod(1+x_i)$ 是真正的线丛陈类之积。交互图 2 就是把这个原理变成一个计算器。`}</Box>
      </Sub>

      <Sub n="11.2.4" title="Universal bundles and classifying spaces" zh="万有丛与分类空间">
        <Tx>{R`**换一个视角。**到此为止读者应已熟悉示性类。结束本节之前，我们换一个稍有不同的视角来审视它们，强调它们在纤维丛分类中的作用。设 $E\xrightarrow{\pi}M$ 是纤维为 $\C^k$ 的向量丛。已知总能找到丛 $\bar E\xrightarrow{\pi'}M$，使`}</Tx>
        <Eq n="11.40" say={R`任何向量丛都能"补"成一个平凡丛：把它看成一个大的平凡丛 $M\times\C^n$ 的子丛。`}>{R`E\oplus\bar E\cong M\times\C^n`}</Eq>
        <Tx>{R`对某个 $n\ge k$ 成立。于是 $E$ 在 $p\in M$ 处的纤维 $F_p$ 是位于 $\C^n$ 中的一个 $k$ 维平面。设 $G_{k,n}(\C)$ 是例 8.4 定义的 Grassmann 流形，即 $\C^n$ 中 $k$ 维平面的集合。仿照典范线丛，在 $G_{k,n}(\C)$ 上定义纤维为 $\C^k$ 的**典范 $k$ 平面丛** $L_{k,n}(\C)$（在每个 $k$ 平面上方放这个平面本身）。考虑映射 $f:M\to G_{k,n}(\C)$，它把点 $p$ 送到 $\C^n$ 中的 $k$ 平面 $F_p$。`}</Tx>
        <Stmt id="T11.4" />
        <Eq n="11.41" title="分类映射" say={R`每个向量丛都是 Grassmann 流形上典范丛沿某个映射的拉回：丛的信息全在这个"高斯映射"里。`}>{R`E\cong f^*L_{k,n}(\C)`}</Eq>
        <Tx>{R`证明见 Chern (1979)。例如，若 $E\xrightarrow{\pi}M$ 是复线丛，则存在丛 $\bar E\xrightarrow{\pi'}M$ 使 $E\oplus\bar E\cong M\times\C^n$，以及映射 $f:M\to G_{1,n}(\C)\cong\CP^{n-1}$ 使 $E=f^*L$，$L$ 是 $\CP^{n-1}$ 上的典范线丛。此外若 $f\sim g$，则 $f^*L$ 与 $g^*L$ 等价。定理 11.4 表明，向量丛的分类归结为映射 $M\to G_{k,n}(\C)$ 的同伦类的分类。

定义**分类空间** $G_k(\C)$ 会很方便。把 $\C^n$ 中的 $k$ 平面看作 $\C^{n+1}$ 中的 $k$ 平面，得到自然的包含`}</Tx>
        <Eq n="11.42" say={R`把小空间里的 $k$ 平面看作大空间里的 $k$ 平面：一串 Grassmann 流形逐个嵌入。`}>{R`G_{k,k}(\C)\hookrightarrow G_{k,k+1}(\C)\hookrightarrow\cdots\hookrightarrow G_k(\C)`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="11.43" say={R`分类空间：所有 Grassmann 流形的并，相当于无穷维空间中 $k$ 平面的全体。`}>{R`G_k(\C)\equiv\bigcup_{n=k}^\infty G_{k,n}(\C).`}</Eq>
        <Tx>{R`相应地有纤维为 $\C^k$ 的**万有丛**（universal bundle）$L_k\to G_k(\C)$。对任何纤维为 $\C^k$ 的复向量丛 $E\xrightarrow{\pi}M$，存在映射 $f:M\to G_k(\C)$ 使 $E=f^*L_k(\C)$。

**公理化的示性类。**设 $E\xrightarrow{\pi}M$ 是向量丛。示性类 $\chi$ 定义为映射 $\chi:E\to\chi(E)\in H^*(M)$，满足`}</Tx>
        <Eq n="11.44a" say={R`自然性：示性类与拉回交换。`}>{R`\chi(f^*E)=f^*\chi(E)\qquad\text{（自然性）}`}</Eq>
        <Eq n="11.44b" say={R`示性类只依赖于丛的等价类。`}>{R`\chi(E)=\chi(E')\qquad\text{若 }E\text{ 与 }E'\text{ 等价.}`}</Eq>
        <Tx>{R`\eqref{11.44a} 左边的 $f^*$ 是丛的拉回，右边的 $f^*$ 是上同调类的拉回。由于 $f:M\to G_k(\C)$ 的同伦类 $[f]$ 唯一确定拉回`}</Tx>
        <Eq n="11.45" say={R`分类映射诱导上同调的拉回：万有丛上的每个上同调类都给出所有丛的一个示性类。`}>{R`f^*:H^*(G_k)\to H^*(M)`}</Eq>
        <Tx>{R`元素 $\chi(E)=f^*\chi(G_k)$ 在对 $\dim E=k$ 的复向量丛分类时很有用。对 $\chi(G_k)$ 的每一个选择，$E$ 中就有一个示性类。（这就是"示性类 = 分类空间的上同调"的含义。）

陈类 $c(E)$ 也可以用公理定义：`}</Tx>
        <Eq n="11.46a" say={R`公理一：自然性。`}>{R`\text{(i)}\quad c(f^*E)=f^*c(E)\qquad\text{（自然性）}`}</Eq>
        <Eq n="11.46b" say={R`公理二：分次与终止——$c_i$ 在 $H^{2i}$ 中，超过纤维维数就为零。`}>{R`\text{(ii)}\quad c(E)=c_0(E)\oplus c_1(E)\oplus\cdots\oplus c_k(E),\qquad c_i(E)\in H^{2i}(M);\ c_i(E)=0\quad i>k`}</Eq>
        <Eq n="11.46c" title="Whitney 和公理" say={R`公理三：Whitney 和的全陈类是两个全陈类之积。`}>{R`\text{(iii)}\quad c(E\oplus F)=c(E)c(F)\qquad\text{（Whitney 和）}`}</Eq>
        <Eq n="11.46d" say={R`公理四：归一化——$\CP^n$ 上典范线丛的全陈类是 $1+x$，$x$ 是 $H^2(\CP^n)$ 的生成元（符号约定见例 11.4）。`}>{R`\text{(iv)}\quad c(L)=1+x\qquad\text{（归一化）}`}</Eq>
        <Tx>{R`其中 $L$ 是 $\CP^n$ 上的典范线丛。可以证明这些公理唯一地把陈类定义为 \eqref{11.25}。`}</Tx>
        <Box kind="warning" title={R`勘误：\eqref{11.46c}（p.451）`}>{R`原书印作 $c(E\oplus F)=c(E)c(E)$，第二个因子应为 $c(F)$（与 \eqref{11.33} 一致）。本站已改正。`}</Box>
        <Stmt id="F:chern-axioms" toc={false} />
      </Sub>
    </Sec>);
}
