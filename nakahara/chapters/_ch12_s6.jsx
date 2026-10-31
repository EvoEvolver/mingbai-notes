// §12.6 自旋复形 —— 式 (12.70a)–(12.90)，例 12.4–12.6
import { Sec, Sub, Tx, Eq, Box, Stmt, Derivation, C } from "@kit";
import { MonopoleDiracLab } from "./_ch12_demos.jsx";

const R = String.raw;
const NB = R`\sym{slnab}{\not\nabla}`;    // Dirac 算子 ∇̸
const SX = R`\sym{slxi}{\not\xi}`;        // ξ̸ = γ^μ ξ_μ
const PP = R`\mathcal{P}`;

export function Sec126() {
  return (
    <Sec n="12.6" title="Spin complexes" zh="自旋复形"
      gist={R`偶数维 Euclid 号差下的 Clifford 代数与手征矩阵 $\gamma^{m+1}$ → Dirac 旋量按手征分成 $\Delta^\pm(M)$ → Dirac 算子 $\mathrm{i}\not\nabla$ 的符号 $\mathrm{i}\not\xi$ 可逆，椭圆 → 在手征基中 $\mathrm{i}\not\nabla=\begin{pmatrix}0&D^\dagger\\D&0\end{pmatrix}$，自旋复形 $D:\Delta^+\to\Delta^-$，指标 $\nu_+-\nu_-=\int\hat A(TM)$ → 用规范场扭曲：$\nu_+-\nu_-=\int\hat A(TM)\mathrm{ch}(E)$；二维 $=\frac{\mathrm{i}}{2\pi}\int\mathrm{tr}\,\mathcal{F}$（单极子），四维 $=-\frac1{8\pi^2}\int\mathrm{tr}\,\mathcal{F}^2+\frac{\dim E}{192\pi^2}\int\mathrm{tr}\,\mathcal{R}^2$（瞬子）。`}
      why={R`物理上最重要的复形：它描述与规范场、引力场相互作用的 Dirac 场。指标 $\nu_+-\nu_-$ 是费米子零模的手征不对称，第 13 章的手征反常（$\partial_\mu j^\mu_5\propto\mathrm{tr}\,\mathcal{F}\wedge\mathcal{F}$）正是它的局部版本。`}
      gives={["12.70b", "12.71", "12.77", "12.79", "12.81", "12.82", "12.83", "12.85", "12.86", "12.87", "12.89", "12.90"]}>
      <p className="muted">本节概念：<C id="dirac_index" /></p>
      <Tx>{R`最后一个经典复形是**自旋复形**。它在物理中非常重要，因为它描述与规范场和/或引力场相互作用的 Dirac 场。`}</Tx>

      <Sub n="12.6.1" title="Dirac operator" zh="Dirac 算子">
        <Tx>{R`考虑 $m$ 维可定向流形 $M$ 上的自旋丛 $S(M)$。把这个丛的截面集合记作 $\Delta(M)=\Gamma(M,S(M))$。设 $m=2l$ 为偶数。自旋群 $\mathrm{SPIN}(m)$ 由 $m$ 个 Dirac 矩阵 $\{\gamma^\alpha\}$ 生成，它们满足`}</Tx>
        <Eq n="12.70a" say={R`Euclid 号差下 Dirac 矩阵都是 Hermite 的。`}>{R`\gamma^{\alpha\dagger}=\gamma^\alpha`}</Eq>
        <Eq n="12.70b" title="Clifford 代数" say={R`Clifford 代数：不同的 $\gamma$ 反对易，每个 $\gamma$ 的平方为 1——"$\gamma$ 是向量的平方根"，$\not\xi^2=\xi^2$。`}>{R`\{\gamma^\alpha,\gamma^\beta\}=2\delta^{\alpha\beta}.`}</Eq>
        <Tx>{R`本章始终假设度规为 Euclid 号差。Clifford 代数由

$$1;\ \gamma^\alpha;\ \gamma^{\alpha_1}\gamma^{\alpha_2}\ (\alpha_1<\alpha_2);\ \ldots;\ \gamma^{\alpha_1}\ldots\gamma^{\alpha_k}\ (\alpha_1<\ldots<\alpha_k);\ \ldots;\ \gamma^1\ldots\gamma^{2l}$$

生成（共 $2^{2l}$ 个元素）。最后一个生成元特别重要，定义`}</Tx>
        <Eq n="12.71" title="手征矩阵" say={R`所有 $\gamma$ 的乘积（配上相位 $\mathrm{i}^l$ 使其平方为 1）与每个 $\gamma^\alpha$ 反对易：它就是手征算子，四维时即 $\gamma^5$。`}>{R`\gamma^{m+1}\equiv\mathrm{i}^l\gamma^1\ldots\gamma^m.`}</Eq>
        <Tx>{R`我们的约定使 $(\gamma^{m+1})^2=I$、$(\gamma^{m+1})^\dagger=\gamma^{m+1}$。［验证：把 $\gamma^1\cdots\gamma^m$ 倒序需要 $m(m-1)/2$ 次对换，故 $(\gamma^1\cdots\gamma^m)^2=(-1)^{m(m-1)/2}=(-1)^{l(2l-1)}=(-1)^l$，再乘 $\mathrm{i}^{2l}=(-1)^l$ 得 $1$。］由 Clifford 代数的一般理论可以证明，$\gamma$ 矩阵由 $2^l\times2^l$ 复矩阵表示。方便的做法是取使 $\gamma^{m+1}$ 对角的表示：`}</Tx>
        <Eq n="12.72" say={R`在手征基中，手征矩阵是 $\pm1$ 的分块对角阵：上半块是正手征，下半块是负手征。`}>{R`\gamma^{m+1}=\begin{pmatrix}\mathbf{1}&0\\0&-\mathbf{1}\end{pmatrix}`}</Eq>
        <Tx>{R`其中 $\mathbf{1}$ 是 $2^{l-1}\times2^{l-1}$ 单位矩阵。`}</Tx>
        <Box kind="example" n="12.4" title={R`$m=2$ 与 $m=4$ 的 $\gamma$ 矩阵`}>
          <Tx>{R`$m=2$ 时取

$$\gamma^0=\sigma_2\qquad\gamma^1=\sigma_1\qquad\gamma^3=\mathrm{i}\gamma^0\gamma^1=\sigma_3$$

$\sigma_\alpha$ 是 Pauli 矩阵：

$$\sigma_1=\begin{pmatrix}0&1\\1&0\end{pmatrix}\qquad\sigma_2=\begin{pmatrix}0&-\mathrm{i}\\ \mathrm{i}&0\end{pmatrix}\qquad\sigma_3=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.$$

（这里两个 $\gamma$ 标为 $\gamma^0,\gamma^1$，手征矩阵 $\gamma^{m+1}=\gamma^3$；$\mathrm{i}\sigma_2\sigma_1=\mathrm{i}(-\mathrm{i}\sigma_3)=\sigma_3$。）$m=4$ 时可取

$$\gamma^\beta=\begin{pmatrix}0&\mathrm{i}\alpha^\beta\\-\mathrm{i}\bar\alpha^\beta&0\end{pmatrix}\qquad\alpha^\beta=(I_2,-\mathrm{i}\boldsymbol{\sigma}),\ \bar\alpha^\beta=(I_2,\mathrm{i}\boldsymbol{\sigma})$$

$$\gamma^5=-\gamma^0\gamma^1\gamma^2\gamma^3=\begin{pmatrix}I_2&0\\0&-I_2\end{pmatrix}.$$

（本站用数值矩阵核对了这组 $\gamma^\beta$ 满足 \eqref{12.70a}、\eqref{12.70b}，且 $-\gamma^0\gamma^1\gamma^2\gamma^3=\mathrm{diag}(I_2,-I_2)$。关键是 $\alpha^\mu\bar\alpha^\nu+\alpha^\nu\bar\alpha^\mu=\bar\alpha^\mu\alpha^\nu+\bar\alpha^\nu\alpha^\mu=2\delta^{\mu\nu}I_2$。）`}</Tx>
        </Box>
        <Tx>{R`**手征分解。**Dirac 旋量 $\psi\in\Delta(M)$ 是 Clifford 代数的不可约表示，却**不是** $\mathrm{SPIN}(2l)$ 的不可约表示。按 $\gamma^{m+1}$ 的本征值分解 $\Delta(M)$，就得到 $\mathrm{SPIN}(2l)$ 的不可约表示（$\gamma^{m+1}$ 与生成元 $\gamma^\alpha\gamma^\beta$ 对易）。由于 $(\gamma^{m+1})^2=I$，$\gamma^{m+1}$ 的本征值——称为**手征**（chirality）——必为 $\pm1$。于是 $\Delta(M)$ 分成两个本征空间`}</Tx>
        <Eq n="12.73" say={R`旋量按手征分成正、负两半。`}>{R`\Delta(M)=\Delta^+(M)\oplus\Delta^-(M)`}</Eq>
        <Tx>{R`其中对 $\psi^\pm\in\Delta^\pm(M)$ 有 $\gamma^{m+1}\psi^\pm=\pm\psi^\pm$。到 $\Delta^\pm$ 上的投影算子 $${PP}^\pm$ 为`}</Tx>
        <Eq n="12.74a" say={R`正手征投影：把旋量的下半块置零。`}>{R`${PP}^+\equiv\frac12(I+\gamma^{m+1})=\begin{pmatrix}\mathbf{1}&0\\0&0\end{pmatrix}`}</Eq>
        <Eq n="12.74b" say={R`负手征投影：把旋量的上半块置零。`}>{R`${PP}^-\equiv\frac12(I-\gamma^{m+1})=\begin{pmatrix}0&0\\0&\mathbf{1}\end{pmatrix}.`}</Eq>
        <Tx>{R`于是可以写（记号略有滥用：左边的 $\psi^\pm$ 是 $2^l$ 分量的旋量，右边的是 $2^{l-1}$ 分量的块）`}</Tx>
        <Eq n="12.75" say={R`正手征旋量只有上半块，负手征旋量只有下半块。`}>{R`\psi^+=\begin{pmatrix}\psi^+\\0\end{pmatrix}\in\Delta^+(M),\qquad\psi^-=\begin{pmatrix}0\\ \psi^-\end{pmatrix}\in\Delta^-(M).`}</Eq>
        <Tx>{R`读者应验证 $${PP}^++${PP}^-=\mathbf{1}$、$(${PP}^\pm)^2=${PP}^\pm$、$${PP}^+${PP}^-=0$、$${PP}^\pm\psi^\pm=\psi^\pm$ 以及 $${PP}^\pm\psi^\mp=0$（由 $(\gamma^{m+1})^2=I$ 直接得到）。

**Dirac 算子。**弯曲空间中的 **Dirac 算子**为（§7.10）`}</Tx>
        <Eq n="12.76" title="弯曲空间的 Dirac 算子" say={R`弯曲空间的 Dirac 算子：$\gamma$ 矩阵用 vielbein 转到坐标指标，导数换成含自旋联络 $\omega_\mu$ 的协变导数。`}>{R`\mathrm{i}${NB}\psi\equiv\mathrm{i}\gamma^\mu\nabla_{\partial/\partial x^\mu}\psi=\mathrm{i}\gamma^\mu(\partial_\mu+\omega_\mu)\psi`}</Eq>
        <Tx>{R`其中 $\omega_\mu=\frac12\mathrm{i}\omega_\mu{}^{\alpha\beta}\Sigma_{\alpha\beta}$ 是自旋联络，$\gamma^\mu=\gamma^\alpha e_\alpha{}^\mu$。

**椭圆性。**我们来证明 $\mathrm{i}${NB}$ 是椭圆的。设 $f$ 是 $p\in M$ 附近的函数，$f(p)=0$，$\mathrm{i}\gamma^\mu\partial_\mu f(p)=\mathrm{i}\gamma^\mu\xi_\mu\equiv\mathrm{i}${SX}$（对向量 $A=A^\mu e_\mu$，$\not A$ 表示 $\gamma^\mu A_\mu$）。取截面 $\tilde\psi\in\Delta(M)$ 使 $\tilde\psi(p)=\psi$。由 \eqref{12.4}，

$$\sigma(\mathrm{i}${NB},\xi)\psi=\mathrm{i}${NB}(f\tilde\psi)|_p=(\mathrm{i}${NB}f)\tilde\psi|_p=\mathrm{i}${SX}\psi$$

这说明`}</Tx>
        <Eq n="12.77" say={R`Dirac 算子的符号是 $\mathrm{i}\not\xi$；因为 $\not\xi^2=\xi^2$，它在 $\xi\neq0$ 时可逆，逆为 $-\mathrm{i}\not\xi/\xi^2$。`}>{R`\sigma(\mathrm{i}${NB},${SX})=\mathrm{i}${SX}.`}</Eq>
        <Tx>{R`注意到 $${SX}${SX}=\xi_\alpha\xi_\beta\gamma^\alpha\gamma^\beta=\xi^\mu\xi_\mu$，可知 \eqref{12.77} 在 $\mathrm{i}${SX}\neq0$ 时可逆，所以 $\mathrm{i}${NB}$ 是椭圆算子。（与 \eqref{12.59} 对照：$\sigma((\mathrm{i}${NB})^2)=-${SX}^2=-\|\xi\|^2$，Dirac 算子是 Laplace 型算子的平方根。）

**手征基中的分块形式。**可以证明 $\{\gamma^\alpha\}$ 可以取成`}</Tx>
        <Eq n="12.78" say={R`在手征基中每个 $\gamma$ 都是非对角块：$\gamma$ 改变手征。`}>{R`\gamma^\beta=\begin{pmatrix}0&\mathrm{i}\alpha_\beta\\-\mathrm{i}\bar\alpha_\beta&0\end{pmatrix}\qquad\alpha^\dagger{}_\beta=\bar\alpha_\beta`}</Eq>
        <Tx>{R`的形式，见例 12.4 中 $m=2$ 与 $m=4$ 的情形。于是 \eqref{12.76} 变成`}</Tx>
        <Eq n="12.79" title="Dirac 算子的分块形式" say={R`Dirac 算子把正手征送到负手征（$D$）、负手征送到正手征（$D^\dagger$）：它是非对角的。`}>{R`\mathrm{i}${NB}=\begin{pmatrix}0&D^\dagger\\D&0\end{pmatrix}`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="12.80" say={R`$D$ 与 $D^\dagger$ 的显式形式：分别用 $\bar\alpha$ 与 $-\alpha$ 缩并协变导数。`}>{R`D\equiv\bar\alpha^\beta e_\beta{}^\mu(\partial_\mu+\omega_\mu)\qquad D^\dagger\equiv-\alpha^\beta e_\beta{}^\mu(\partial_\mu+\omega_\mu).`}</Eq>
        <Tx>{R`所以 $D^\dagger$ 确实是 $D$ 的伴随（注意 $\partial_\mu+\omega_\mu$ 是反 Hermite 的，而 $\bar\alpha^{\beta\dagger}=\alpha^\beta$）。［由 $\mathrm{i}\gamma^\beta=\begin{pmatrix}0&-\alpha^\beta\\ \bar\alpha^\beta&0\end{pmatrix}$ 直接读出。］对 $\begin{pmatrix}\psi^+\\0\end{pmatrix}\in\Delta^+(M)$，

$$\mathrm{i}${NB}\begin{pmatrix}\psi^+\\0\end{pmatrix}=\begin{pmatrix}0&D^\dagger\\D&0\end{pmatrix}\begin{pmatrix}\psi^+\\0\end{pmatrix}=\begin{pmatrix}0\\D\psi^+\end{pmatrix}$$

而对 $\begin{pmatrix}0\\ \psi^-\end{pmatrix}\in\Delta^-(M)$，

$$\mathrm{i}${NB}\begin{pmatrix}0\\ \psi^-\end{pmatrix}=\begin{pmatrix}D^\dagger\psi^-\\0\end{pmatrix}.$$

因此 $D=\mathrm{i}${NB}${PP}^+:\Delta^+(M)\to\Delta^-(M)$，$D^\dagger=\mathrm{i}${NB}${PP}^-:\Delta^-(M)\to\Delta^+(M)$。现在得到一个两项复形`}</Tx>
        <Eq n="12.81" title="自旋复形" say={R`自旋复形：$D$ 从正手征旋量到负手征旋量，$D^\dagger$ 反向。`}>{R`\Delta^+(M)\ \underset{D^\dagger}{\overset{D}{\rightleftarrows}}\ \Delta^-(M)`}</Eq>
        <Tx>{R`称为**自旋复形**（spin complex）。这个复形的解析指标是`}</Tx>
        <Eq n="12.82" title="Dirac 算子的指标" say={R`Dirac 指标 = 正手征零能模数 − 负手征零能模数。`}>{R`\ind D=\dim\ker D-\dim\ker D^\dagger=\nu_+-\nu_-`}</Eq>
        <Tx>{R`其中 $\nu_+$（$\nu_-$）是手征为 $+$（$-$）的零能模个数。（$\ker D$ 中的元素正是 $\mathrm{i}${NB}$ 的正手征零模；反之 $\mathrm{i}${NB}\psi=0$ 的解可以按手征分开，因为 $\mathrm{i}${NB}$ 与 $\gamma^{m+1}$ 反对易。）

把 AS 指标定理用到这里。不深入 Clifford 代数与自旋复形的细节，直接写出结果：自旋复形 \eqref{12.81} 的 AS 指标定理为`}</Tx>
        <Eq n="12.83" keyEq title={R`Dirac 指标定理（$\hat A$ 亏格）`} say={R`手征零模之差等于 Dirac 亏格 $\hat A$ 的积分——只与时空的几何（曲率）有关。`}>{R`\begin{aligned}\nu_+-\nu_-&=\int_M\mathrm{ch}(\Delta^+(M)-\Delta^-(M))\frac{\mathrm{Td}(TM^{\C})}{e(TM)}\Big|_{\rm vol}\\&=\int_M\hat A(TM)|_{\rm vol}\end{aligned}`}</Eq>
        <Tx>{R`其中 $\hat A$ 是由 (11.94) 定义的 **Dirac 亏格**。由于 $\hat A$ 只含 $4j$ 形式，除非 $m\equiv0\bmod4$，否则 $\nu_+-\nu_-$ 为零。当然，这并不意味着 $\nu_+=\nu_-=0$。\eqref{12.83} 的证明将在 §12.9 与 §12.10 给出。`}</Tx>
        <Derivation title={R`为什么 $\mathrm{ch}(\Delta^+-\Delta^-)\mathrm{Td}/e$ 化为 $\hat A$（思路）`} collapsed steps={[
          { tex: R`\mathrm{ch}(\Delta^+-\Delta^-)=\prod_{j=1}^l(\mathrm{e}^{x_j/2}-\mathrm{e}^{-x_j/2})`, why: R`由分裂原理，旋表示的权为 $\frac12(\pm x_1\pm\cdots\pm x_l)$，正、负手征分别对应偶数、奇数个负号；交错和恰好分解为乘积。` },
          { tex: R`\frac{\mathrm{Td}(TM^{\C})}{e(TM)}=\prod_{j=1}^l\frac{x_j}{1-\mathrm{e}^{-x_j}}\frac{-x_j}{1-\mathrm{e}^{x_j}}\frac1{x_j}=\prod_{j=1}^l\frac{-x_j}{(1-\mathrm{e}^{-x_j})(1-\mathrm{e}^{x_j})}`, why: R`$TM^{\C}$ 的陈根为 $\pm x_j$（§12.3）。` },
          { tex: R`(\mathrm{e}^{x/2}-\mathrm{e}^{-x/2})\cdot\frac{-x}{(1-\mathrm{e}^{-x})(1-\mathrm{e}^{x})}=\frac{x}{\mathrm{e}^{x/2}-\mathrm{e}^{-x/2}}=\frac{x/2}{\sinh(x/2)}`, why: R`$(1-\mathrm{e}^{-x})(1-\mathrm{e}^x)=-(\mathrm{e}^{x/2}-\mathrm{e}^{-x/2})^2$。与整体符号 $(-1)^{m(m+1)/2}=(-1)^l$ 及旋表示定向约定的符号合并后得到 $\prod_j\frac{x_j/2}{\sinh(x_j/2)}=\hat A(TM)$。各符号约定的完整核对见 Shanahan (1978)；§12.10 的路径积分独立地给出了这一结果（\eqref{12.193}）。` },
        ]} />
        <Stmt id="F:spinAS12" />
      </Sub>

      <Sub n="12.6.2" title="Twisted spin complexes" zh="扭曲自旋复形">
        <Tx>{R`在物理中，旋量场可能属于某个群 $G$ 的表示。例如 QCD 中的夸克场属于 $\mathrm{SU}(3)$ 的 $\mathbf{3}$ 表示。属于 $G$ 的表示的旋量是乘积丛 $S(M)\otimes E$ 的截面，其中 $E$ 是 $P(M,G)$ 在适当表示下的相伴向量丛。这时 Dirac 算子 $D_E:\Delta^+(M)\otimes E\to\Delta^-(M)\otimes E$ 为`}</Tx>
        <Eq n="12.84" say={R`扭曲 Dirac 算子：协变导数中再加上规范势 $\mathcal{A}_\mu$，作用在正手征部分上。`}>{R`D_E=\mathrm{i}\gamma^\alpha e_\alpha{}^\mu(\partial_\mu+\omega_\mu+\mathcal{A}_\mu)${PP}_+`}</Eq>
        <Tx>{R`其中 $\mathcal{A}_\mu$ 是 $E$ 上的规范势。（$${PP}_+$ 即 \eqref{12.74a} 的 $${PP}^+$。）这个**扭曲自旋复形**的 AS 指标定理为`}</Tx>
        <Eq n="12.85" keyEq title="扭曲自旋复形的指标定理" say={R`规范场中的 Dirac 零模之差 = $\hat A$ 亏格乘以规范丛的陈特征的积分：引力与规范场的拓扑荷共同决定零模。`}>{R`\nu_+-\nu_-=\int_M\hat A(TM)\mathrm{ch}(E)|_{\rm vol}.`}</Eq>
        <Tx>{R`$\dim M=2$ 时（$\hat A=1+\cdots$ 的二形式部分为零），`}</Tx>
        <Eq n="12.86" title="二维：零模数 = 磁通量子数" say={R`二维时零模之差就是第一陈数——穿过曲面的磁通量子数。`}>{R`\nu_+-\nu_-=\int_M\mathrm{ch}_1(E)=\frac{\mathrm{i}}{2\pi}\int_M\mathrm{tr}\,\mathcal{F}`}</Eq>
        <Tx>{R`而 $\dim M=4$ 时，`}</Tx>
        <Eq n="12.87" title="四维：瞬子数 + 引力修正" say={R`四维时零模之差 = 规范场的第二陈特征（瞬子数）+ 维数 $\times$ 引力的 $\hat A$ 修正。`}>{R`\begin{aligned}\nu_+-\nu_-&=\int_M[\mathrm{ch}_2(E)+\hat A_1(TM)\mathrm{ch}_0(E)]\\&=\frac{-1}{8\pi^2}\int_M\mathrm{tr}\,\mathcal{F}^2+\frac{\dim E}{192\pi^2}\int_M\mathrm{tr}\,\mathcal{R}^2.\end{aligned}`}</Eq>
        <Derivation title={R`\eqref{12.87} 中的系数`} collapsed steps={[
          { tex: R`\mathrm{ch}(E)=\mathrm{tr}\exp\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big)\ \Rightarrow\ \mathrm{ch}_0=\dim E,\quad\mathrm{ch}_2=\frac12\Big(\frac{\mathrm{i}}{2\pi}\Big)^2\mathrm{tr}\,\mathcal{F}^2=-\frac1{8\pi^2}\mathrm{tr}\,\mathcal{F}^2`, why: R`第 11 章陈特征的定义。` },
          { tex: R`\hat A=\prod_j\frac{x_j/2}{\sinh(x_j/2)}=1-\frac1{24}\sum_jx_j^2+\cdots=1-\frac{p_1}{24}+\cdots`, why: R`$\frac{y}{\sinh y}=1-\frac{y^2}{6}+\cdots$，$y=x/2$。` },
          { tex: R`\hat A_1=-\frac{p_1}{24}=-\frac1{24}\Big(-\frac1{8\pi^2}\mathrm{tr}\,\mathcal{R}^2\Big)=\frac1{192\pi^2}\mathrm{tr}\,\mathcal{R}^2`, why: R`$p_1=-\frac{1}{8\pi^2}\mathrm{tr}\,\mathcal{R}^2$（第 11 章）。` },
        ]} />
        <Box kind="example" n="12.5" title={R`环面 $T^{2l}$ 与球面 $S^{2l}$：$\hat A=1$`}>
          <Tx>{R`设

$$M=T^{2l}=\underbrace{S^1\times\cdots\times S^1}_{2l\ \text{个}}.$$

则

$$\hat A(TM)=\hat A\Big(\mathop{\oplus}_1^{2l}TS^1\Big)=\prod_1^{2l}\hat A(TS^1)=1.$$

（$TS^1$ 是平凡丛，$\hat A$ 对 Whitney 和是乘性的。）我们也有 $\hat A(TS^{2l})=1$（$TS^{2l}\oplus N S^{2l}=S^{2l}\times\R^{2l+1}$ 平凡，法丛 $NS^{2l}$ 平凡，所以 $TS^{2l}$ 的 Pontryagin 类全为零）。因此这些流形上的指标为`}</Tx>
          <Eq n="12.88" say={R`在 $\hat A=1$ 的流形（环面、球面）上，零模之差只由规范场的陈特征决定。`}>{R`\nu_+-\nu_-=\int_M\mathrm{ch}(E)|_{\rm vol}.`}</Eq>
        </Box>
        <Box kind="example" n="12.6" title="单极子与瞬子背景中的零模">
          <Tx>{R`考虑单极子丛 $P(S^2,\mathrm{U}(1))$。若 $\mathcal{A}$ 是局部规范势，场强为 $\mathcal{F}=\dd\mathcal{A}$。指标定理给出`}</Tx>
          <Eq n="12.89" title="单极子背景中的 Dirac 零模" say={R`$S^2$ 上的 Dirac 零模之差 = 单极子的磁荷（第一陈数）$n$：每一个磁通量子带来一个零模。`}>{R`\nu_+-\nu_-=\frac{\mathrm{i}}{2\pi}\int_{S^2}\mathcal{F}=-\frac1{2\pi}\int_{S^2}F`}</Eq>
          <Tx>{R`其中 $\mathcal{F}=\mathrm{i}F$。§10.5 已说明右边表示卷绕数 $\pi_1(\mathrm{U}(1))=\Z$，于是解析信息（左边）现在以拓扑方式（右边）表达出来。记 $n\equiv\frac{\mathrm{i}}{2\pi}\int_{S^2}\mathcal{F}\in\Z$（单极子数）。实际上更强的结论成立：$n>0$ 时 $\nu_-=0$、$\nu_+=n$，$n<0$ 时反之——交互图 4 用数值本征值计算展示了这一点。`}</Tx>
          <MonopoleDiracLab />
          <Tx>{R`再设 $P(S^4,\mathrm{SU}(2))$ 是瞬子丛。\eqref{12.88} 写成`}</Tx>
          <Eq n="12.90" title="瞬子背景中的 Dirac 零模" say={R`$S^4$ 上的 Dirac 零模之差 = 瞬子数 $k$（第二陈数）。`}>{R`\nu_+-\nu_-=\int_{S^4}\mathrm{ch}_2(\mathcal{F})=\frac{-1}{8\pi^2}\int_{S^4}\mathrm{tr}\,\mathcal{F}^2.`}</Eq>
          <Tx>{R`右边表示瞬子数 $k\in\pi_3(\mathrm{SU}(2))=\Z$。注意 $\mathcal{F}=*\mathcal{F}$ 时 $k>0$，$\mathcal{F}=-*\mathcal{F}$ 时 $k<0$。可以证明，$k>0$（$k<0$）时 $\nu_-=0$（$\nu_+=0$），见 Jackiw–Rebbi (1977)。例如设 $\mathcal{F}$ 自对偶，假设 $\psi^-\in\ker D^\dagger=\ker DD^\dagger$。由 \eqref{12.80}（在局部平直近似下略去自旋联络），

$$DD^\dagger\psi^-=-[(\partial_\mu+\mathcal{A}_\mu)^2+\mathrm{i}\bar\sigma_{\mu\nu}\mathcal{F}_{\mu\nu}]\psi^-=0$$

其中 $\bar\sigma_{\mu\nu}\equiv(1/4\mathrm{i})(\bar\alpha_\mu\alpha_\nu-\bar\alpha_\nu\alpha_\mu)$。容易验证 $\bar\sigma_{\mu\nu}$ 是反自对偶的（$\bar\sigma_{\mu\nu}=-\frac12\epsilon_{\mu\nu\rho\sigma}\bar\sigma_{\rho\sigma}$），因此 $\bar\sigma_{\mu\nu}\mathcal{F}_{\mu\nu}=0$（自对偶与反自对偶张量的缩并为零）。由于 $-(\partial_\mu+\mathcal{A}_\mu)^2$ 是正定算子，它没有可归一化的零模。这就验证了 $\ker D^\dagger=\{0\}$。`}</Tx>
          <Box kind="warning" title={R`勘误：$DD^\dagger$ 的表达式与 $\bar\sigma_{\mu\nu}$ 的定义`}>{R`原书写 $DD^\dagger\psi^-=[(\partial_\mu+\mathcal{A}_\mu)^2+2\mathrm{i}\bar\sigma_{\mu\nu}\mathcal{F}^{\mu\nu}]\psi^-$，$\bar\sigma_{\mu\nu}\equiv(1/4\mathrm{i})(\alpha^\mu\bar\alpha^\nu-\alpha^\nu\bar\sigma^\mu)$，并称 $(\partial_\mu+\mathcal{A}_\mu)^2$ 正定。有三处需要改正：

(1) 由 \eqref{12.80}，$DD^\dagger=\bar\alpha^\mu\nabla_\mu(-\alpha^\nu\nabla_\nu)=-\bar\alpha^\mu\alpha^\nu\nabla_\mu\nabla_\nu$，所以出现的是 $\bar\alpha\alpha$ 的次序（原书的 $\bar\sigma^\mu$ 显然是 $\bar\alpha^\mu$ 的笔误，且次序应为 $\bar\alpha_\mu\alpha_\nu$）。把 $\bar\alpha^\mu\alpha^\nu$ 拆成对称部分 $\delta^{\mu\nu}$ 与反对称部分，并用 $[\nabla_\mu,\nabla_\nu]=\mathcal{F}_{\mu\nu}$，得 $\bar\alpha^\mu\alpha^\nu\nabla_\mu\nabla_\nu=\nabla^2+\frac14(\bar\alpha^\mu\alpha^\nu-\bar\alpha^\nu\alpha^\mu)\mathcal{F}_{\mu\nu}=\nabla^2+\mathrm{i}\bar\sigma_{\mu\nu}\mathcal{F}_{\mu\nu}$（对 $\mu,\nu$ 全部求和，系数是 $\mathrm{i}$ 而不是 $2\mathrm{i}$）。

(2) 次序要紧：本站用数值矩阵验证了 $\frac1{4\mathrm{i}}(\bar\alpha_\mu\alpha_\nu-\bar\alpha_\nu\alpha_\mu)$ 是**反**自对偶的，而原书次序 $\frac1{4\mathrm{i}}(\alpha_\mu\bar\alpha_\nu-\alpha_\nu\bar\alpha_\mu)$ 是**自**对偶的——后者与自对偶 $\mathcal{F}$ 的缩并不为零，论证就失效了。

(3) $\nabla_\mu$ 是反 Hermite 的，所以正（非负）定的是 $-(\partial_\mu+\mathcal{A}_\mu)^2$；原书漏了负号。在 $S^4$ 上计入自旋联络后，Lichnerowicz 公式还多出 $+\frac{R}{4}>0$（$R$ 为标量曲率），结论只会更强。另：原书"$\ker D^\dagger=\emptyset$"应为 $\{0\}$。`}</Box>
        </Box>
      </Sub>
    </Sec>);
}
