// §11.4 Pontrjagin 类与 Euler 类 —— 式 (11.69)–(11.99)，例 11.5–11.8，习题 11.3；交互图 3（Gauss–Bonnet）
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Derivation, Exercise, C } from "@kit";
import { GaussBonnetLab } from "./_ch11_demos.jsx";

const R = String.raw;

export function Sec114() {
  return (
    <Sec n="11.4" title="Pontrjagin and Euler classes" zh="Pontrjagin 类与 Euler 类"
      gist={R`实丛有纤维度规时曲率反对称，只能化为 $2\times2$ 块 → $p(\mathcal{F})=\det(I+\mathcal{F}/2\pi)=\prod(1+x_i^2)$，只含偶次幂；$p_j$ 的迹表达 \eqref{11.75a}–\eqref{11.75d}；$p_j(E)=(-1)^jc_{2j}(E^{\C})$ → Euler 类：$p_l$ 的平方根 $e=\mathrm{Pf}(\mathcal{R}/2\pi)=\prod x_i$；$\int_{S^2}e=2$，Gauss–Bonnet $\int_Me=\chi(M)$ → Hirzebruch $L=\prod\frac{x}{\tanh x}$、$\hat A=\prod\frac{x/2}{\sinh(x/2)}$；符号差定理 $\tau=\frac13\int p_1$。`}
      why={R`切丛等实向量丛的曲率是实反对称矩阵，陈类的 $\det(I+\mathrm{i}\mathcal{F}/2\pi)$ 在这里退化（奇数阶部分为零）。我们需要适合 $\mathrm{O}(k)$ 与 $\mathrm{SO}(k)$ 的不变多项式：$\det$ 给出 Pontrjagin 类，而 $\mathrm{SO}(2l)$ 独有的 Pfaffian 给出 Euler 类——它把曲率与 Euler 示性数联系起来。`}
      gives={["11.70", "11.73", "11.75a", "11.75b", "11.77", "11.79b", "11.80", "11.81", "11.83", "11.84", "11.85", "11.88", "11.89", "11.90", "11.92", "11.96", "11.99"]}>
      <p className="muted">本节概念：<C id="pontrjagin" /> · <C id="euler_class" /> · <C id="L_Ahat" /></p>
      <Tx>{R`本节讨论与**实**向量丛相伴的示性类。`}</Tx>

      <Sub n="11.4.1" title="Pontrjagin classes" zh="Pontrjagin 类">
        <Tx>{R`设 $E$ 是 $m$ 维流形 $M$ 上的实向量丛，$\dim_{\R}E=k$。若 $E$ 带有纤维度规，可以在每根纤维上引入正交归一标架，结构群从 $\mathrm{GL}(k,\R)$ 约化到 $\mathrm{O}(k)$。由于 $\mathfrak{o}(k)$ 的生成元是反对称的，$E$ 的场强 $\mathcal{F}$ 也是反对称的。反对称矩阵 $A$ 不能用 $\mathrm{GL}(k,\R)$ 的子群的元素对角化，但可以化为块对角形：`}</Tx>
        <Eq n="11.69" say={R`实反对称矩阵：用实正交变换只能化成 $2\times2$ 转动块；要真正对角化必须用复矩阵，本征值成对出现为 $\pm\mathrm{i}\lambda$。`}>{R`A\to\begin{pmatrix}0&\lambda_1&&&\\-\lambda_1&0&&&\\&&0&\lambda_2&\\&&-\lambda_2&0&\\&&&&\ddots\end{pmatrix}\to\begin{pmatrix}\mathrm{i}\lambda_1&&&&\\&-\mathrm{i}\lambda_1&&&\\&&\mathrm{i}\lambda_2&&\\&&&-\mathrm{i}\lambda_2&\\&&&&\ddots\end{pmatrix}`}</Eq>
        <Tx>{R`其中第二步对角化只能用 $\mathrm{GL}(k,\C)$ 的元素实现。若 $k$ 是奇数，最后一个对角元取为零。例如，$\mathfrak{o}(3)=\mathfrak{so}(3)$ 中生成绕 $z$ 轴转动的生成元是

$$T_z=\begin{pmatrix}0&1&0\\-1&0&0\\0&0&0\end{pmatrix}.$$

**全 Pontrjagin 类**（total Pontrjagin class）定义为`}</Tx>
        <Eq n="11.70" keyEq title="全 Pontrjagin 类" say={R`实丛的"陈类"：没有 $\mathrm{i}$，因为实反对称的曲率不需要变成 Hermite 的。`}>{R`p(\mathcal{F})\equiv\det\Big(I+\frac{\mathcal{F}}{2\pi}\Big).`}</Eq>
        <Tx>{R`由反对称性 $\mathcal{F}^{\rm t}=-\mathcal{F}$，

$$\det\Big(I+\frac{\mathcal{F}}{2\pi}\Big)=\det\Big(I+\frac{\mathcal{F}^{\rm t}}{2\pi}\Big)=\det\Big(I-\frac{\mathcal{F}}{2\pi}\Big).$$

因此 $p(\mathcal{F})$ 是 $\mathcal{F}$ 的*偶*函数。$p(\mathcal{F})$ 的展开为`}</Tx>
        <Eq n="11.71" say={R`按形式次数展开：只出现 $4j$ 形式。`}>{R`p(\mathcal{F})=1+p_1(\mathcal{F})+p_2(\mathcal{F})+\cdots`}</Eq>
        <Tx>{R`其中 $p_j(\mathcal{F})$ 是 $\mathcal{F}$ 的 $2j$ 次多项式，是 $H^{4j}(M;\R)$ 的元素。注意 $2j>k=\dim E$ 或 $4j>\dim M$ 时 $p_j(\mathcal{F})=0$。［原书脚注：虽然 $p_m(\mathcal{F})=0$，作为矩阵 $B$ 的多项式 $p_m(B)$ 不一定为零；后面将用 $p_m$ 定义 Euler 类。］

把 $\mathcal{F}/2\pi$ 对角化为`}</Tx>
        <Eq n="11.72" say={R`实丛的"陈根"：$\mathcal{F}/2\pi$ 的每个 $2\times2$ 块贡献一对本征值 $\pm\mathrm{i}x_k$，$x_k$ 是块元除以 $2\pi$。`}>{R`\frac{\mathcal{F}}{2\pi}\to A\equiv\begin{pmatrix}\mathrm{i}x_1&&&&\\&-\mathrm{i}x_1&&&\\&&\mathrm{i}x_2&&\\&&&-\mathrm{i}x_2&\\&&&&\ddots\end{pmatrix}`}</Eq>
        <Tx>{R`其中 $x_k\equiv\lambda_k/2\pi$，$\lambda_k$ 是 $\mathcal{F}$ 化为块对角形 \eqref{11.69} 后的块元（$\mathcal{F}$ 的本征值为 $\pm\mathrm{i}\lambda_k$）。这个符号的选择是为了简化下文定义的 Euler 类（见下面的勘误）。$p(\mathcal{F})$ 的生成函数为`}</Tx>
        <Eq n="11.73" title="Pontrjagin 类的生成函数" say={R`每对本征值 $\pm\mathrm{i}x$ 贡献 $(1+\mathrm{i}x)(1-\mathrm{i}x)=1+x^2$：Pontrjagin 类只记得 $x^2$。`}>{R`p(\mathcal{F})=\det(I+A)=\prod_{i=1}^{[k/2]}(1+x_i^2)`}</Eq>
        <Tx>{R`其中 $[k/2]=k/2$（$k$ 为偶数）或 $(k-1)/2$（$k$ 为奇数）。\eqref{11.73} 中只出现*偶*次幂，反映了反对称性。每个 **Pontrjagin 类**由 \eqref{11.73} 算出：`}</Tx>
        <Eq n="11.74" say={R`第 $j$ 个 Pontrjagin 类是 $x_i^2$ 的第 $j$ 个初等对称函数。`}>{R`p_j(\mathcal{F})=\sum_{i_1<i_2<\ldots<i_j}^{[k/2]}x_{i_1}^2x_{i_2}^2\cdots x_{i_j}^2.`}</Eq>
        <Tx>{R`为了用曲率二形式 $\mathcal{F}/2\pi$ 表示 $p_j(\mathcal{F})$，先注意

$$\Tr\Big(\frac{\mathcal{F}}{2\pi}\Big)^{2j}=\Tr A^{2j}=2(-1)^j\sum_{i=1}^{[k/2]}x_i^{2j}$$

（$(\mathrm{i}x)^{2j}+(-\mathrm{i}x)^{2j}=2(-1)^jx^{2j}$；奇数次幂的迹为零。）于是`}</Tx>
        <Eq n="11.75a" title={R`$p_1$ 的迹表达`} say={R`第一 Pontrjagin 类：$x_i^2$ 之和，即 $-\frac12\Tr(\mathcal{F}/2\pi)^2$——反对称矩阵平方的迹是负的，负号使 $p_1$ 成为"正"的量。`}>{R`p_1(\mathcal{F})=\sum_ix_i^2=-\frac12\Big(\frac1{2\pi}\Big)^2\Tr\mathcal{F}^2`}</Eq>
        <Eq n="11.75b" say={R`第二 Pontrjagin 类：由幂和 $\sum x^2$、$\sum x^4$ 用 Newton 恒等式得到。`}>{R`p_2(\mathcal{F})=\sum_{i<j}x_i^2x_j^2=\frac12\Big[\Big(\sum_ix_i^2\Big)^2-\sum_ix_i^4\Big]=\frac18\Big(\frac1{2\pi}\Big)^4[(\Tr\mathcal{F}^2)^2-2\Tr\mathcal{F}^4]`}</Eq>
        <Eq n="11.75c" say={R`第三 Pontrjagin 类：三个迹单项式，公分母 48。`}>{R`p_3(\mathcal{F})=\sum_{i<j<k}x_i^2x_j^2x_k^2=\frac1{48}\Big(\frac1{2\pi}\Big)^6[-(\Tr\mathcal{F}^2)^3+6\Tr\mathcal{F}^2\Tr\mathcal{F}^4-8\Tr\mathcal{F}^6]`}</Eq>
        <Eq n="11.75d" say={R`第四 Pontrjagin 类：五个迹单项式，公分母 384。`}>{R`\begin{aligned}p_4(\mathcal{F})&=\sum_{i<j<k<l}x_i^2x_j^2x_k^2x_l^2\\&=\frac1{384}\Big(\frac1{2\pi}\Big)^8[(\Tr\mathcal{F}^2)^4-12(\Tr\mathcal{F}^2)^2\Tr\mathcal{F}^4+32\Tr\mathcal{F}^2\Tr\mathcal{F}^6+12(\Tr\mathcal{F}^4)^2-48\Tr\mathcal{F}^8]\end{aligned}`}</Eq>
        <Eq n="11.75e" say={R`最高的 Pontrjagin 类是全部 $x_i^2$ 的乘积；$k$ 为偶数时它就是 $\mathcal{F}/2\pi$ 的行列式。`}>{R`p_{[k/2]}(\mathcal{F})=x_1^2x_2^2\cdots x_{[k/2]}^2=\Big(\frac1{2\pi}\Big)^k\det\mathcal{F}.`}</Eq>
        <Tx>{R`（\eqref{11.75e} 的最后一个等号只对偶数 $k$ 成立；$k$ 为奇数时奇数阶反对称矩阵的 $\det\mathcal{F}=0$，见习题 11.3，而 $x_1^2\cdots x_{[k/2]}^2$ 一般不为零。）`}</Tx>
        <Derivation title={R`\eqref{11.75c} 的推导（补充；\eqref{11.75d} 同理）`} collapsed steps={[
          { tex: R`T_n\equiv\Tr\Big(\frac{\mathcal{F}}{2\pi}\Big)^{2n},\qquad s_n\equiv\sum_ix_i^{2n}=\frac{(-1)^n}{2}T_n`, why: R`由上面的迹公式。$p_j$ 是 $y_i=x_i^2$ 的初等对称函数，$s_n$ 是 $y_i$ 的幂和。` },
          { tex: R`p_3=\frac16(s_1^3-3s_1s_2+2s_3)`, why: R`Newton 恒等式。` },
          { tex: R`=\frac16\Big(-\frac{T_1^3}{8}+\frac{3T_1T_2}{4}-T_3\Big)=\frac1{48}(-T_1^3+6T_1T_2-8T_3)`, why: R`$s_1=-T_1/2$，$s_2=T_2/2$，$s_3=-T_3/2$。同法：$p_4=\frac1{24}(s_1^4-6s_1^2s_2+3s_2^2+8s_1s_3-6s_4)=\frac1{384}(T_1^4-12T_1^2T_2+12T_2^2+32T_1T_3-48T_4)$。交互图 2 的"实向量丛"模式对一个一般位置的反对称矩阵数值核对 \eqref{11.75a}–\eqref{11.75d}。` },
        ]} />
        <Tx>{R`读者应验证`}</Tx>
        <Eq n="11.76" say={R`Pontrjagin 类对 Whitney 和是乘性的：分块对角矩阵的行列式等于各块行列式之积。`}>{R`p(E\oplus F)=p(E)\wedge p(F).`}</Eq>
        <Tx>{R`（证明与\sref{T11.3}(b) 完全相同：$\mathcal{F}_{E\oplus F}=\mathrm{diag}(\mathcal{F}_E,\mathcal{F}_F)$，$\det$ 分块相乘。）

**与陈类的关系。**不难猜到 Pontrjagin 类可以用陈类表示。由于陈类只对复向量丛定义，必须把 $E$ 的纤维复化，复数才有意义。所得的向量丛记作 $E^{\C}$。设 $A$ 是实反对称矩阵（化为 \eqref{11.72} 的形式），则 $\mathrm{i}A=\mathrm{diag}(-x_1,x_1,-x_2,x_2,\ldots)$，

$$\det(I+\mathrm{i}A)=\det\begin{pmatrix}1-x_1&&&&\\&1+x_1&&&\\&&1-x_2&&\\&&&1+x_2&\\&&&&\ddots\end{pmatrix}=\prod_{i=1}^{[k/2]}(1-x_i^2)=1-p_1(A)+p_2(A)-\cdots$$

由此得到`}</Tx>
        <Eq n="11.77" title="Pontrjagin 类与陈类" say={R`实丛的 Pontrjagin 类就是其复化丛的偶数阶陈类（带交错符号）；复化丛的奇数阶陈类为零。`}>{R`p_j(E)=(-1)^jc_{2j}(E^{\C}).`}</Eq>

        <Box kind="example" n="11.5" title="四维 Riemann 流形的 Pontrjagin 类">
          <Tx>{R`设 $M$ 是四维 Riemann 流形。采用正交归一标架 $\{\hat e_\alpha\}$ 时，切丛 $TM$ 的结构群可以约化为 $\mathrm{O}(4)$。设 $\mathcal{R}=(\mathcal{R}_{\alpha\beta})$ 是曲率二形式，$\mathcal{R}_{\alpha\beta}=\frac12R_{\alpha\beta\gamma\delta}\theta^\gamma\wedge\theta^\delta$（$\mathcal{R}$ 不要与标量曲率混淆；原书简写为 $\mathcal{R}=\frac12\mathcal{R}_{\alpha\beta}\theta^\alpha\wedge\theta^\beta$）。对切丛，通常写 $p(M)$ 而不是 $p(\mathcal{R})$。我们有`}</Tx>
          <Eq n="11.78" say={R`四维时 Pontrjagin 多项式只有三项：常数 1、四形式 $p_1$ 与（作为矩阵多项式的）八次项 $p_2$。`}>{R`\det\Big(I+\frac{\mathcal{R}}{2\pi}\Big)=1-\frac1{8\pi^2}\Tr\mathcal{R}^2+\frac1{128\pi^4}[(\Tr\mathcal{R}^2)^2-2\Tr\mathcal{R}^4].`}</Eq>
          <Tx>{R`各 **Pontrjagin 类**为`}</Tx>
          <Eq n="11.79a" say={R`零阶 Pontrjagin 类是 1。`}>{R`p_0(M)=1`}</Eq>
          <Eq n="11.79b" title={R`$p_1(M)$`} say={R`四维流形的第一 Pontrjagin 类：Riemann 曲率二形式的"平方的迹"，它的积分是符号差的 3 倍。`}>{R`p_1(M)=-\frac1{8\pi^2}\Tr\mathcal{R}^2=-\frac1{8\pi^2}\mathcal{R}_{\alpha\beta}\wedge\mathcal{R}_{\beta\alpha}`}</Eq>
          <Eq n="11.79c" say={R`第二 Pontrjagin 类：作为四维流形上的八形式恒为零，但作为矩阵多项式它是行列式，下面用来定义 Euler 类。`}>{R`p_2(M)=\frac1{128\pi^4}[(\Tr\mathcal{R}^2)^2-2\Tr\mathcal{R}^4]=\Big(\frac1{2\pi}\Big)^4\det\mathcal{R}.`}</Eq>
          <Tx>{R`虽然 $p_2(M)$ 作为微分形式为零，下一小节计算 Euler 类时需要它。`}</Tx>
        </Box>
      </Sub>

      <Sub n="11.4.2" title="Euler classes" zh="Euler 类">
        <Tx>{R`**我们要找什么。**$\mathrm{SO}(2l)$ 比 $\mathrm{O}(2l)$ 多一个不变多项式：反对称矩阵的行列式恰好是另一个多项式的平方。这个"平方根"给出一个 $2l$ 形式——恰好是流形维数的形式，可以直接积分。

设 $M$ 是 $2l$ 维可定向 Riemann 流形，$TM$ 是其切丛，曲率记为 $\mathcal{R}$。采用正交归一标架总可以把 $TM$ 的结构群约化到 $\mathrm{SO}(2l)$。$M$ 的 **Euler 类** $e$ 定义为 $4l$ 形式 $p_l$ 的平方根：`}</Tx>
        <Eq n="11.80" title={R`$e^2=p_l$`} say={R`Euler 类是最高 Pontrjagin 多项式的平方根——作为矩阵 $A$ 的多项式理解。`}>{R`e(A)e(A)=p_l(A).`}</Eq>
        <Tx>{R`两边都应理解为 $2l\times2l$ 矩阵 $A$ 的函数，而不是曲率 $\mathcal{R}$ 的函数，因为 $p_l(\mathcal{R})$（$4l$ 形式，$4l>2l$）恒为零。［原书此处印作"$p_1(\mathcal{R})$ 恒为零"，应为 $p_l$。］但这样定义的 $e(M)\equiv e(\mathcal{R})$ 是 $2l$ 形式，而且确实给出 $M$ 的一个体积元。若 $M$ 是奇数维流形，定义 $e(M)=0$（见下文）。`}</Tx>

        <Box kind="example" n="11.6" title={R`$S^2$ 的 Euler 类`}>
          <Tx>{R`设 $M=S^2$，考虑切丛 $TS^2$。由例 7.14（正交标架 $\hat\theta^1=\dd\theta$、$\hat\theta^2=\sin\theta\,\dd\phi$），曲率二形式为

$$\mathcal{R}_{\theta\phi}=-\mathcal{R}_{\phi\theta}=\dd\omega^1{}_2=\sin\theta\,\dd\theta\wedge\dd\phi$$

（原书写作 $\sin^2\theta\frac{\dd\theta\wedge\dd\phi}{\sin\theta}$ 并说"注意 $g_{\theta\theta}=\sin^2\theta$"，应为 $g_{\phi\phi}=\sin^2\theta$：坐标分量 $R^\theta{}_{\phi\theta\phi}=\sin^2\theta$ 换到正交标架要除以 $\sqrt{g_{\phi\phi}}$ 两次再乘一次，结果相同。）虽然 $p_1(S^2)$ 作为微分形式为零，为了求 Euler 形式我们仍计算它：

$$p_1(S^2)=-\frac1{8\pi^2}\Tr\mathcal{R}^2=-\frac1{8\pi^2}[\mathcal{R}_{\theta\phi}\mathcal{R}_{\phi\theta}+\mathcal{R}_{\phi\theta}\mathcal{R}_{\theta\phi}]=\Big(\frac1{2\pi}\sin\theta\,\dd\theta\wedge\dd\phi\Big)^2$$

由此读出`}</Tx>
          <Eq n="11.81" title={R`$e(S^2)$`} say={R`单位球面的 Euler 形式就是面积元除以 $2\pi$（Gauss 曲率 $K=1$）。`}>{R`e(S^2)=\frac1{2\pi}\sin\theta\,\dd\theta\wedge\dd\phi.`}</Eq>
          <Tx>{R`有趣的是`}</Tx>
          <Eq n="11.82" say={R`把 Euler 形式在球面上积分得到 2——恰好是球面的 Euler 示性数。`}>{R`\int_{S^2}e(S^2)=\frac1{2\pi}\int_0^{2\pi}\dd\phi\int_0^\pi\dd\theta\sin\theta=2`}</Eq>
          <Tx>{R`它是 $S^2$ 的 Euler 示性数（§2.4）。这不仅仅是巧合。再看另一个有说服力的例子：环面 $T^2$。由于 $T^2$ 容许平坦联络，曲率恒为零，于是 $e(T^2)\equiv0$，而 $\chi(T^2)=0$。这些是 **Gauss–Bonnet 定理**的特例：`}</Tx>
        </Box>
        <Eq n="11.83" keyEq title="Gauss–Bonnet 定理" say={R`Euler 形式在闭可定向流形上的积分等于 Euler 示性数：一个局部的曲率积分算出一个整数拓扑量。`}>{R`\int_Me(M)=\chi(M)`}</Eq>
        <Tx>{R`对紧致可定向流形 $M$ 成立。若 $M$ 是奇数维的，$e$ 与 $\chi$ 都为零（见 \eqref{6.39}）。一般证明见第 12 章。`}</Tx>
        <Stmt id="X:gauss-bonnet" toc={false} />
        <GaussBonnetLab />

        <Tx>{R`**Pfaffian。**一般地，$2l\times2l$ 反对称矩阵 $A$ 的行列式是一个多项式——**Pfaffian** $\mathrm{Pf}(A)$——的平方（命题 1.3）：`}</Tx>
        <Eq n="11.84" title={R`$\det=\mathrm{Pf}^2$`} say={R`反对称矩阵的行列式是一个多项式的完全平方：Pfaffian 是"带符号的平方根"。`}>{R`\det A=\mathrm{Pf}(A)^2.`}</Eq>
        <Tx>{R`我们证明 Pfaffian 由下式给出：`}</Tx>
        <Eq n="11.85" title="Pfaffian" say={R`Pfaffian：把 $2l$ 个指标两两配对，带置换的符号求和；$2^ll!$ 消去每对内部交换与各对之间重排带来的重复。`}>{R`\mathrm{Pf}(A)=\frac{1}{2^ll!}\sum_P\mathrm{sgn}(P)A_{P(1)P(2)}A_{P(3)P(4)}\cdots A_{P(2l-1)P(2l)}`}</Eq>
        <Tx>{R`首先注意反对称矩阵 $A$ 可以用 $\mathrm{O}(2l)$ 的元素块对角化：`}</Tx>
        <Eq n="11.86" say={R`实反对称矩阵的正交标准形：$l$ 个 $2\times2$ 转动块。`}>{R`S^{\rm t}AS=\Lambda=\begin{pmatrix}0&\lambda_1&&&&&&\\-\lambda_1&0&&&&&&\\&&0&\lambda_2&&&&\\&&-\lambda_2&0&&&&\\&&&&\ddots&&&\\&&&&&\ddots&&\\&&&&&&0&\lambda_l\\&&&&&&-\lambda_l&0\end{pmatrix}.`}</Eq>
        <Tx>{R`容易看出

$$\det A=\det\Lambda=\prod_{i=1}^l\lambda_i^2.$$

为计算 $\mathrm{Pf}(\Lambda)$，注意 \eqref{11.85} 中不为零的项都形如 $A_{12}A_{34}\cdots A_{2l-1,2l}$。而且有 $2^l$ 种方式交换下标 $A_{ij}\to A_{ji}$，例如

$$A_{12}A_{34}\cdots A_{2l-1,2l}\to A_{21}A_{34}\cdots A_{2l-1,2l}$$

（交换下标改变置换的符号，也改变矩阵元的符号，二者抵消），以及 $l!$ 种指标对的置换，例如

$$A_{12}A_{34}\cdots A_{2l-1,2l}\to A_{34}A_{12}\cdots A_{2l-1,2l}$$

（交换两对相当于偶置换）。因此

$$\mathrm{Pf}(\Lambda)=A_{12}A_{34}\cdots A_{2l-1,2l}=\prod_{i=1}^l\lambda_i.$$

于是块对角矩阵 $\Lambda$ 满足 $\det\Lambda=\mathrm{Pf}(\Lambda)^2$。为了证明 \eqref{11.84} 对任何（不一定块对角的）反对称矩阵成立，我们用下面的引理：`}</Tx>
        <Eq n="11.87" title="Pfaffian 的变换律" say={R`Pfaffian 在 $A\to X^{\rm t}AX$ 下乘以 $\det X$：在正常转动下不变，在反射下变号。`}>{R`\mathrm{Pf}(X^{\rm t}AX)=\mathrm{Pf}(A)\det X.`}</Eq>
        <Stmt id="F:pfaffian">
          <Proof steps={[
            { claim: R`用全反对称符号改写定义 \eqref{11.85}：对 $(1,\ldots,2l)$ 的置换 $P$ 求和就是对指标 $i_1,\ldots,i_{2l}$ 带 $\epsilon^{i_1\cdots i_{2l}}$ 求和。`, tex: R`\mathrm{Pf}(A)=\frac1{2^ll!}\epsilon^{i_1i_2\cdots i_{2l}}A_{i_1i_2}\cdots A_{i_{2l-1}i_{2l}}`, fill: true },
            { claim: R`代入 $(X^{\rm t}AX)_{i_1i_2}=X_{j_1i_1}A_{j_1j_2}X_{j_2i_2}$：`, tex: R`\mathrm{Pf}(X^{\rm t}AX)=\frac1{2^ll!}\big(\epsilon^{i_1\cdots i_{2l}}X_{j_1i_1}\cdots X_{j_{2l}i_{2l}}\big)A_{j_1j_2}\cdots A_{j_{2l-1}j_{2l}}=\frac{\det X}{2^ll!}\epsilon^{j_1\cdots j_{2l}}A_{j_1j_2}\cdots A_{j_{2l-1}j_{2l}}`, why: R`行列式的定义：$\epsilon^{i_1\cdots i_{2l}}X_{j_1i_1}\cdots X_{j_{2l}i_{2l}}=\det X\,\epsilon^{j_1\cdots j_{2l}}$。`, fill: true },
            { claim: R`所以 $\mathrm{Pf}(X^{\rm t}AX)=\mathrm{Pf}(A)\det X$ 对任意 $X$ 成立。原书脚注 3 先由 $\det(X^{\rm t}AX)=(\det X)^2\det A$ 得"$\pm$"，再用 $\mathrm{Pf}(I^{\rm t}AI)=\mathrm{Pf}(A)$ 定号——这只对与 $I$ 连通的 $X$（$\det X>0$）有效；上面的直接计算没有这个缺口。`, fill: true },
            { claim: R`取 $X=S^{\rm t}$（$S\in\mathrm{O}(2l)$ 把 $A$ 化为 $\Lambda$）：$\mathrm{Pf}(A)=\mathrm{Pf}(\Lambda)\det S=\pm\prod\lambda_i$，于是 $\mathrm{Pf}(A)^2=\prod\lambda_i^2=\det\Lambda=\det A$。`, uses: ["11.86"] },
          ]} />
        </Stmt>
        <Tx>{R`若 $S^{\rm t}AS=\Lambda$，$S\in\mathrm{O}(2l)$，则 $A=S\Lambda S^{\rm t}$，从而

$$\mathrm{Pf}(S\Lambda S^{\rm t})=\mathrm{Pf}(\Lambda)\det S=\prod_{i=1}^l\lambda_i\det S.$$

最后得到：对任何反对称矩阵 $A$，$\det A=\mathrm{Pf}(A)^2$。注意 $\mathrm{Pf}(A)$ 是 $\mathrm{SO}(2l)$ 不变的，但在 $\mathrm{O}(2l)$ 的非正常转动 $S$（$\det S=-1$）下变号——这就是为什么 Euler 类要求 $M$ 可定向。`}</Tx>
        <Exercise n="11.3" title="奇数阶反对称矩阵的行列式" level="★"
          hint={R`比较 $\det A^{\rm t}$ 与 $\det(-A)$。`}
          solution={R`设 $A$ 是 $n\times n$ 反对称矩阵，$A^{\rm t}=-A$。则

$$\det A=\det A^{\rm t}=\det(-A)=(-1)^n\det A.$$

$n$ 为奇数时得 $\det A=-\det A$，即 $\det A=0$。（几何上：实反对称矩阵的本征值成对出现为 $\pm\mathrm{i}\lambda$，奇数阶时至少有一个本征值为零，见 \eqref{11.69} 后"最后一个对角元取为零"。）因此奇数维流形上 $p_l$ 型的"最高 Pontrjagin 多项式"的平方根无从谈起，自然定义 $e(M)=0$；这与 $\chi(M)=0$（奇数维闭流形，Poincaré 对偶）相容。`}>
          {R`证明奇数阶反对称矩阵的行列式为零。这就是为什么对奇数维流形令 $e(M)=0$。`}
        </Exercise>
        <Tx>{R`**Euler 类**用曲率 $\mathcal{R}$ 定义为`}</Tx>
        <Eq n="11.88" keyEq title="Euler 类" say={R`Euler 类是曲率（除以 $2\pi$）的 Pfaffian：一个 $2l$ 形式，在 $\mathrm{SO}(2l)$ 规范变换下不变。`}>{R`e(M)=\mathrm{Pf}(\mathcal{R}/2\pi)=\frac{1}{(4\pi)^ll!}\sum_P\mathrm{sgn}(P)\mathcal{R}_{P(1)P(2)}\cdots\mathcal{R}_{P(2l-1)P(2l)}.`}</Eq>
        <Tx>{R`取 $x_j=\lambda_j/2\pi$ 得到生成函数`}</Tx>
        <Eq n="11.89" title="Euler 类的生成函数" say={R`用实丛的"陈根"表示，Euler 类就是它们的乘积；平方后正是 $p_l=\prod x_i^2$。`}>{R`e(x)=x_1x_2\cdots x_l=\prod_{i=1}^lx_i.`}</Eq>
        <Box kind="warning" title={R`勘误：Pfaffian 的相位与 $x_j$ 的符号（pp.457、460–462）`}>{R`**原书写法。**\eqref{11.85} 与 \eqref{11.88} 带有相位 $(-1)^l$：$\mathrm{Pf}(A)=\frac{(-1)^l}{2^ll!}\sum_P\ldots$，$e(M)=\frac{(-1)^l}{(4\pi)^ll!}\sum_P\ldots$；相应地 $\mathrm{Pf}(\Lambda)=(-1)^l\prod\lambda_i$，并在 \eqref{11.72}、\eqref{11.89} 中取 $x_j\equiv-\lambda_j/2\pi$，\eqref{11.72} 的对角元排为 $(-\mathrm{i}x_1,\mathrm{i}x_1,\ldots)$。

**问题。**这一组约定内部自洽（$e=\prod x_j$），但与例 11.6 和 Gauss–Bonnet 矛盾：$S^2$ 上 $l=1$，$\mathcal{R}_{12}=\mathcal{R}_{\theta\phi}=\sin\theta\,\dd\theta\wedge\dd\phi$，按原书 \eqref{11.88}，

$$e(S^2)=\frac{-1}{4\pi}(\mathcal{R}_{12}-\mathcal{R}_{21})=-\frac1{2\pi}\sin\theta\,\dd\theta\wedge\dd\phi,\qquad\int_{S^2}e=-2,$$

与原书自己的 \eqref{11.81}、\eqref{11.82} 和 $\chi(S^2)=2$ 相反。（原书在例 11.6 中是由 $p_1=e^2$ "读出"平方根，手动取了正号。）$l$ 为偶数时（如例 11.7 的四维情形）相位为 $+1$，不受影响。

**改正。**本站采用第 1 章 \eqref{1.188} 的标准 Pfaffian（无相位），并取 $x_j\equiv+\lambda_j/2\pi$（\eqref{11.72} 的对角元相应排为 $(\mathrm{i}x_1,-\mathrm{i}x_1,\ldots)$）。于是 $\mathrm{Pf}(\Lambda)=\prod\lambda_i$，$e=\mathrm{Pf}(\mathcal{R}/2\pi)=\prod x_j$ 仍成立，且 $e(S^2)=+\frac1{2\pi}\sin\theta\,\dd\theta\wedge\dd\phi=\frac{K}{2\pi}\dd A$，与 Gauss–Bonnet 一致。Pontrjagin 类只含 $x_j^2$，不受影响。交互图 2（实丛模式）对一般位置的反对称矩阵数值核对 $\mathrm{Pf}(A)=\prod x_i$、$\mathrm{Pf}^2=\det A=p_l$；交互图 3 核对 $\int e=\chi$ 的符号。原书脚注 2 所说"本章的相位与 §1.5 不同"一句，按本站约定不再成立（两处一致）。`}</Box>

        <Box kind="example" n="11.7" title="四维流形的 Euler 类">
          <Tx>{R`设 $M$ 是四维可定向流形，$TM$ 的结构群为 $\mathrm{SO}(4)$（见例 11.5）。由 \eqref{11.88} 得 Euler 类`}</Tx>
          <Eq n="11.90" title="四维 Euler 形式" say={R`四维 Euler 形式：两个曲率二形式用 Levi-Civita 符号全缩并——它的积分是四维流形的 Euler 示性数（Chern–Gauss–Bonnet）。`}>{R`e(M)=\frac1{2(4\pi)^2}\epsilon^{ijkl}\mathcal{R}_{ij}\wedge\mathcal{R}_{kl}.`}</Eq>
          <Tx>{R`这与例 11.5 的结果一致。相关的 Pontrjagin 类为

$$p_2(M)=\frac1{128\pi^4}[(\Tr\mathcal{R}^2)^2-2\Tr\mathcal{R}^4]=x_1^2x_2^2.$$

由于 $e(M)=x_1x_2$，有 $p_2(M)=e(M)\wedge e(M)$。写成矩阵恒等式就是

$$\frac1{128\pi^4}[(\Tr A^2)^2-2\Tr A^4]=\Big(\frac1{2(4\pi)^2}\epsilon^{ijkl}A_{ij}A_{kl}\Big)^2.$$`}</Tx>
          <Derivation title={R`\eqref{11.90} 与矩阵恒等式的核对（补充）`} collapsed steps={[
            { tex: R`\frac1{2^2\,2!}\sum_P\mathrm{sgn}(P)A_{P(1)P(2)}A_{P(3)P(4)}=\frac18\epsilon^{ijkl}A_{ij}A_{kl}=A_{12}A_{34}-A_{13}A_{24}+A_{14}A_{23}`, why: R`\eqref{11.85} 在 $l=2$ 时；24 个置换中每个单项式出现 8 次。` },
            { tex: R`e=\mathrm{Pf}\Big(\frac{\mathcal{R}}{2\pi}\Big)=\frac1{8(2\pi)^2}\epsilon^{ijkl}\mathcal{R}_{ij}\mathcal{R}_{kl}=\frac1{2(4\pi)^2}\epsilon^{ijkl}\mathcal{R}_{ij}\wedge\mathcal{R}_{kl}`, why: R`$8\cdot4\pi^2=32\pi^2=2\cdot16\pi^2$。即 \eqref{11.90}。` },
            { tex: R`\mathrm{Pf}\Big(\frac{A}{2\pi}\Big)^2=\det\frac{A}{2\pi}=p_2(A)=\frac1{128\pi^4}[(\Tr A^2)^2-2\Tr A^4]`, why: R`由 \eqref{11.84} 与 \eqref{11.79c}。所以右边的系数应是 $\frac1{2(4\pi)^2}$。` },
          ]} />
          <Box kind="warning" title={R`勘误：例 11.7 矩阵恒等式的系数（p.462）`}>{R`原书右边印作 $\big(\frac1{2(4\pi)^4}\epsilon^{ijkl}A_{ij}A_{kl}\big)^2$。由 \eqref{11.90}（$e=\frac1{2(4\pi)^2}\epsilon\mathcal{R}\mathcal{R}$）与 $p_2=e\wedge e$，应为 $\frac1{2(4\pi)^2}$；量纲（$A$ 的次数）检验：左边 $\propto A^4/\pi^4$，右边 $\propto A^4/\pi^4$ 才相符，而 $(4\pi)^{-8}$ 给出 $\pi^{-8}$。交互图 2（实丛模式，$k=4$）对随机反对称矩阵数值验证：改正后的等式成立，原书的写法不成立。本站已改正。`}</Box>
        </Box>
      </Sub>

      <Sub n="11.4.3" title="Hirzebruch L-polynomial and Â-genus" zh={R`Hirzebruch $L$ 多项式与 $\hat A$ 亏格`}>
        <Tx>{R`**Hirzebruch $L$ 多项式**定义为`}</Tx>
        <Eq n="11.91" title={R`$L$ 多项式`} say={R`$L$ 多项式：对每个根取 $x/\tanh x$ 再连乘；它是偶函数，所以能用 Pontrjagin 类表达。`}>{R`L(x)=\prod_{j=1}^k\frac{x_j}{\tanh x_j}=\prod_{j=1}^k\Big(1+\sum_{n\ge1}(-1)^{n-1}\frac{2^{2n}}{(2n)!}B_nx_j^{2n}\Big)`}</Eq>
        <Tx>{R`其中 $B_n$ 是 Bernoulli 数（见 \eqref{11.66}）。（这里的乘积对实丛的 $[k/2]$ 个根 $x_j$ 取。）函数 $L(x)$ 是 $x_j$ 的偶函数，可以用 Pontrjagin 类写出：`}</Tx>
        <Eq n="11.92" title={R`$L$ 用 $p_j$ 表达`} say={R`$L$ 多项式的前几阶：一阶 $\frac13p_1$，二阶 $\frac1{45}(7p_2-p_1^2)$——四维的符号差、八维的符号差公式。`}>{R`L(\mathcal{F})=1+\tfrac13p_1+\tfrac1{45}(-p_1^2+7p_2)+\tfrac1{945}(2p_1^3-13p_1p_2+62p_3)+\cdots`}</Eq>
        <Tx>{R`其中 $p_j$ 代表 $p_j(\mathcal{F})$。由分裂原理得`}</Tx>
        <Eq n="11.93" say={R`$L$ 多项式对 Whitney 和是乘性的。`}>{R`L(E\oplus F)=L(E)\wedge L(F).`}</Eq>
        <Tx>{R`**$\hat A$（A-roof）亏格** $\hat A(\mathcal{F})$ 定义为`}</Tx>
        <Eq n="11.94" keyEq title={R`$\hat A$ 亏格`} say={R`$\hat A$ 亏格：对每个根取 $(x/2)/\sinh(x/2)$ 再连乘；它的积分是 Dirac 算子的指标。`}>{R`\hat A(\mathcal{F})=\prod_{j=1}^k\frac{x_j/2}{\sinh(x_j/2)}=\prod_{j=1}^k\Big(1+\sum_{n\ge1}(-1)^n\frac{(2^{2n}-2)}{(2n)!}B_n\Big(\frac{x_j}{2}\Big)^{2n}\Big).`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{11.94} 的通项（p.462）`}>{R`原书通项印作 $(-1)^n\frac{(2^{2n}-2)}{(2n)!}B_nx_j^{2n}$，这是 $\frac{x}{\sinh x}$ 的展开（$=1-\frac16x^2+\frac7{360}x^4-\cdots$），不是 $\frac{x/2}{\sinh(x/2)}$ 的；后者要把 $x$ 换成 $x/2$，即每项乘 $2^{-2n}$：$\frac{x/2}{\sinh(x/2)}=1-\frac1{24}x^2+\frac7{5760}x^4-\cdots$。检验：$n=1$ 时原书写法给 $-\frac16$，与 \eqref{11.96} 的 $-\frac1{24}p_1$ 矛盾；改正后为 $-\frac{2}{2}\cdot\frac16\cdot\frac14=-\frac1{24}$，一致。\eqref{11.96} 本身正确。交互图 2 的最后一张表对 $n=1,2,3$ 逐项核对。本站已改正。`}</Box>
        <Tx>{R`它是 $x_j$ 的偶函数，可以按 $p_j$ 展开。$\hat A$ 也被物理学家称为 **Dirac 亏格**。它满足`}</Tx>
        <Eq n="11.95" say={R`$\hat A$ 亏格对 Whitney 和是乘性的。`}>{R`\hat A(E\oplus F)=\hat A(E)\wedge\hat A(F).`}</Eq>
        <Tx>{R`$\hat A$ 用 Pontrjagin 类写出为`}</Tx>
        <Eq n="11.96" title={R`$\hat A$ 用 $p_j$ 表达`} say={R`$\hat A$ 的前几阶：一阶 $-\frac1{24}p_1$——四维自旋流形上 $\int p_1$ 必须被 24 整除的根源（Rokhlin 定理进一步给出 48）。`}>{R`\hat A(\mathcal{F})=1-\tfrac1{24}p_1+\tfrac1{5760}(7p_1^2-4p_2)+\tfrac1{967\,680}(-31p_1^3+44p_1p_2-16p_3)+\cdots.`}</Eq>
        <Tx>{R`交互图 2 的"实向量丛"模式由生成函数 $\frac{x}{\tanh x}$、$\frac{x/2}{\sinh(x/2)}$ 出发，符号地导出 \eqref{11.92}、\eqref{11.96} 的全部系数，并对数值根逐阶核对。`}</Tx>

        <Box kind="example" n="11.8" title="符号差与 Hirzebruch 符号差定理">
          <Tx>{R`设 $M$ 是紧致连通可定向的四维流形。考虑对称双线性型 $\sigma:H^2(M;\R)\times H^2(M;\R)\to\R$，`}</Tx>
          <Eq n="11.97" say={R`相交形式：两个二阶上同调类的外积在整个四维流形上的积分。`}>{R`\sigma([\alpha],[\beta])=\int_M\alpha\wedge\beta.`}</Eq>
          <Tx>{R`$\sigma$ 是 $b^2\times b^2$ 对称矩阵，$b^2=\dim H^2(M;\R)$ 是 Betti 数。$\sigma$ 显然是非退化的：若对任意 $[\alpha]\in H^2(M;\R)$ 都有 $\sigma([\alpha],[\beta])=0$，则 $[\beta]=0$（Poincaré 对偶）。设 $p$（$q$）是 $\sigma$ 的正（负）本征值的个数。$M$ 的 **Hirzebruch 符号差**（signature）为`}</Tx>
          <Eq n="11.98" say={R`符号差：相交形式的正本征值个数减负本征值个数，是一个拓扑整数。`}>{R`\tau(M)\equiv p-q.`}</Eq>
          <Tx>{R`按照 **Hirzebruch 符号差定理**（见 §12.5），这个数也可以用 $L$ 多项式给出：`}</Tx>
          <Eq n="11.99" keyEq title="Hirzebruch 符号差定理" say={R`符号差等于第一 Pontrjagin 类积分的三分之一：一个由曲率算出的数，必须是整数。`}>{R`\tau(M)=\int_ML_1(M)=\tfrac13\int_Mp_1(M).`}</Eq>
          <Tx>{R`例如 $\CP^2$ 的 $H^2$ 一维，相交形式为 $(1)$，$\tau=1$，故 $\int_{\CP^2}p_1=3$；$S^4$ 的 $H^2=0$，$\tau=0$。`}</Tx>
        </Box>
        <Stmt id="X:signature" toc={false} />
      </Sub>
    </Sec>);
}
