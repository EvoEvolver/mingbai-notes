// §12.4 Dolbeault 复形 + §12.5 符号差复形 —— 式 (12.43a)–(12.69)，习题 12.2–12.3
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, C } from "@kit";
import { RiemannRochLab } from "./_ch12_demos.jsx";

const R = String.raw;
const FD = R`\sym{fD}{\mathfrak{D}}`;     // 𝔇 = d + d†（多字母字体，强制指定符号）
const PI = R`\sym{piop}{\pi}`;           // 式 (12.60) 的算子 π

export function Sec124() {
  return (
    <Sec n="12.4" title="The Dolbeault complex" zh="Dolbeault 复形"
      gist={R`复流形上 $\dd=\partial+\bar\partial$；$(0,q)$ 形式与 $\bar\partial$ 组成 Dolbeault 复形，符号 $\xi^{0,1}\wedge$ 使它椭圆 → 解析指标是算术亏格 $\sum(-1)^rb^{0,r}$ → 拓扑指标化简为 $\int_M\mathrm{Td}(TM^+)$ → 用全纯丛 $V$ 扭曲得 Hirzebruch–Riemann–Roch 定理 $\ind\bar\partial_V=\int_M\mathrm{Td}(TM^+)\mathrm{ch}(V)$；Riemann 面上即 $h^0-h^1=(1-g)\dim V+\deg V$。`}
      why={R`全纯截面的个数是复几何与弦论（模空间维数、零模计数）的核心问题；它们通常极难直接求，而 Riemann–Roch 只用陈类就给出 $h^0-h^1$。`}
      gives={["12.44", "12.45", "12.47", "12.48", "12.50", "12.51"]}>
      <p className="muted">本节概念：<C id="riemann_roch" /> · <C id="elliptic_complex" /></p>
      <Tx>{R`先回顾复流形的一些基本事实（详见第 8 章）。设 $M$ 是复维数 $m$ 的无边紧复流形。$z^\mu=x^\mu+\mathrm{i}y^\mu$ 是局部坐标，$\bar z^\mu=x^\mu-\mathrm{i}y^\mu$ 是其复共轭。$TM^+$ 表示由 $\{\partial/\partial z^\mu\}$ 张成的切丛，$TM^-=\overline{TM^+}$ 是由 $\{\partial/\partial\bar z^\mu\}$ 张成的复共轭丛。$TM^+$ 的对偶记作 $T^*M^+$，由 $\{\dd z^\mu\}$ 张成；$TM^-$ 的对偶是 $T^*M^-=\overline{T^*M^+}$，由 $\{\dd\bar z^\mu\}$ 张成。复化的 $r$ 形式空间 $\Omega^r(M)^{\C}$ 分解为

$$\Omega^r(M)^{\C}=\mathop{\oplus}_{p+q=r}\Omega^{p,q}(M)$$

其中 $\Omega^{p,q}(M)$ 是 $(p,q)$ 形式的空间，由形如 $\dd z^{\mu_1}\wedge\ldots\wedge\dd z^{\mu_p}\wedge\dd\bar z^{\nu_1}\wedge\ldots\wedge\dd\bar z^{\nu_q}$ 的基张成。外微分分解为 $\dd\equiv\partial+\bar\partial$，其中

$$\partial=\dd z^\mu\wedge\partial/\partial z^\mu,\qquad\bar\partial=\dd\bar z^\mu\wedge\partial/\partial\bar z^\mu.$$

它们满足 $\partial\bar\partial+\bar\partial\partial=\partial^2=\bar\partial^2=0$。于是有两个序列`}</Tx>
      <Eq n="12.43a" say={R`$\bar\partial$ 把 $(p,q)$ 形式送到 $(p,q+1)$ 形式，且 $\bar\partial^2=0$。`}>{R`\cdots\xrightarrow{\bar\partial}\Omega^{p,q}(M)\xrightarrow{\bar\partial}\Omega^{p,q+1}(M)\xrightarrow{\bar\partial}\cdots`}</Eq>
      <Eq n="12.43b" say={R`$\partial$ 把 $(p,q)$ 形式送到 $(p+1,q)$ 形式，且 $\partial^2=0$。`}>{R`\cdots\xrightarrow{\partial}\Omega^{p,q}(M)\xrightarrow{\partial}\Omega^{p+1,q}(M)\xrightarrow{\partial}\cdots.`}</Eq>
      <Tx>{R`我们关心第一个序列取 $p=0$ 的情形：`}</Tx>
      <Eq n="12.44" title="Dolbeault 复形" say={R`Dolbeault 复形：反全纯 $(0,q)$ 形式由 $\bar\partial$ 依次连接；它的 0 级上同调就是全纯函数。`}>{R`\cdots\xrightarrow{\bar\partial}\Omega^{0,q}(M)\xrightarrow{\bar\partial}\Omega^{0,q+1}(M)\xrightarrow{\bar\partial}\cdots.`}</Eq>
      <Tx>{R`这个序列称为 **Dolbeault 复形**。

**椭圆性。**为说明 \eqref{12.44} 是椭圆复形，计算 $\bar\partial$ 的符号。设 $\xi=\xi^{0,1}+\xi^{1,0}$ 是 $p\in M$ 处的**实**一形式，其中 $\xi^{0,1}\in\Omega^{0,1}_p(M)$，$\xi^{1,0}=\overline{\xi^{0,1}}\in\Omega^{1,0}_p(M)$。取反全纯 $r$ 形式 $\omega\in\Omega^{0,r}(M)$，有

$$\sigma(\bar\partial,\xi)\omega=\bar\partial(f\tilde s)=\bar\partial f\wedge\tilde s+f\bar\partial\tilde s|_p=\xi^{0,1}\wedge\omega$$

其中 $f(p)=0$，$\bar\partial f(p)=\xi^{0,1}$，$\tilde s\in\Omega^{0,r}(M)$，$\tilde s(p)=\omega$。于是`}</Tx>
      <Eq n="12.45" say={R`$\bar\partial$ 的符号：用实余切向量的 $(0,1)$ 部分楔乘。$\xi\neq0$ 时 $\xi^{0,1}\neq0$，所以符号序列正合。`}>{R`\sigma(\bar\partial,\xi)=\xi^{0,1}\wedge.`}</Eq>
      <Tx>{R`与上一节类似的论证表明，符号 \eqref{12.45} 是椭圆的（$\xi$ 实且非零时 $\xi^{0,1}\neq0$，$\xi^{0,1}\wedge$ 组成的序列正合）。所以 Dolbeault 复形 \eqref{12.44} 是椭圆复形。

AS 指标定理取如下形式（复流形 $M$ 的实维数为 $2m$，\eqref{12.33} 的符号因子为 $(-1)^{2m(2m+1)/2}=(-1)^m$）：`}</Tx>
      <Eq n="12.46" say={R`把 Dolbeault 复形代入 AS 公式：各级丛是 $\wedge^rT^*M^-$。`}>{R`\ind\bar\partial=(-1)^m\int_M\mathrm{ch}\Big(\sum_r(-1)^r\wedge^rT^*M^-\Big)\frac{\mathrm{Td}(TM^{\C})}{e(TM)}\Big|_{\rm vol}.`}</Eq>
      <Box kind="warning" title={R`勘误：\eqref{12.46} 漏了符号因子 $(-1)^m$`}>{R`原书 \eqref{12.46} 没有写出 \eqref{12.33} 中的整体符号 $(-1)^{M(M+1)/2}$（$M=2m$ 为实维数），它等于 $(-1)^m$。下面的推导表明：保留这个因子才能得到 \eqref{12.48}；若省去，复一维时会得到 $\ind\bar\partial=-\int_M\mathrm{Td}(TM^+)=-1$（对 $\CP^1$），而 $\CP^1$ 的算术亏格显然是 $b^{0,0}-b^{0,1}=1-0=1$。`}</Box>
      <Tx>{R`左边计算如下。首先注意

$$\ker\bar\partial_r/\operatorname{im}\bar\partial_{r-1}=H^{0,r}(M)$$

其中 $H^{0,r}(M)$ 是 $\bar\partial$ 上同调群。于是左边为`}</Tx>
      <Eq n="12.47" say={R`Dolbeault 复形的解析指标：Hodge 数 $b^{0,r}$ 的交错和，称为算术亏格。`}>{R`\ind\bar\partial=\sum_{r=0}^m(-1)^rb^{0,r}`}</Eq>
      <Tx>{R`其中 $b^{0,r}\equiv\dim_{\C}H^{0,r}(M)$ 是 Hodge 数。这个指标称为 $M$ 的**算术亏格**（arithmetic genus）。（原书求和上限印作 $n$，应为复维数 $m$。）

拓扑指标可以像 de Rham 复形那样化简。原书把技术细节留给 Shanahan (1978)，结果是`}</Tx>
      <Eq n="12.48" title="算术亏格 = Todd 类的积分" say={R`算术亏格（全纯形式的交错计数）等于全纯切丛 Todd 类的积分。`}>{R`\sum_{r=0}^m(-1)^rb^{0,r}=\int_M\mathrm{Td}(TM^+)`}</Eq>
      <Tx>{R`其中 $\mathrm{Td}(TM^+)$ 是 $TM^+$ 的 Todd 类。（原书求和下限印作 $r=1$，应为 $r=0$，与 \eqref{12.47} 一致。）`}</Tx>
      <Derivation title={R`从 \eqref{12.46} 化简到 \eqref{12.48}（本站补全）`} collapsed steps={[
        { tex: R`x_i\equiv x_i(TM^+),\quad i=1,\ldots,m;\qquad TM^{\C}=TM^+\oplus TM^-,\quad x(TM^-)=\{-x_i\}`, why: R`$TM^-=\overline{TM^+}\cong(TM^+)^*$（用 Hermite 度规），共轭丛的陈根变号（同 §12.3 的论证）。` },
        { tex: R`T^*M^-=(TM^-)^*\ \Rightarrow\ x(T^*M^-)=\{+x_i\},\qquad\mathrm{ch}\Big(\sum_r(-1)^r\wedge^rT^*M^-\Big)=\prod_{i=1}^m(1-\mathrm{e}^{x_i})`, why: R`对偶再变号一次；交错外幂的陈特征同 §12.3。` },
        { tex: R`\mathrm{Td}(TM^{\C})=\prod_{i=1}^m\frac{x_i}{1-\mathrm{e}^{-x_i}}\cdot\frac{-x_i}{1-\mathrm{e}^{x_i}},\qquad e(TM)=c_m(TM^+)=\prod_{i=1}^mx_i`, why: R`复流形的实切丛就是 $TM^+$ 看成实丛，其 Euler 类为顶陈类。` },
        { tex: R`(-1)^m\prod_{i=1}^m(1-\mathrm{e}^{x_i})\frac{x_i}{1-\mathrm{e}^{-x_i}}\frac{-x_i}{1-\mathrm{e}^{x_i}}\frac{1}{x_i}=(-1)^m\prod_{i=1}^m\frac{-x_i}{1-\mathrm{e}^{-x_i}}=\prod_{i=1}^m\frac{x_i}{1-\mathrm{e}^{-x_i}}`, why: R`逐因子约去，两个 $(-1)^m$ 相消。最后一式正是 $\mathrm{Td}(TM^+)$。` },
      ]} />

      <Sub n="12.4.1" title="The twisted Dolbeault complex and the Hirzebruch–Riemann–Roch theorem" zh="扭曲 Dolbeault 复形与 Hirzebruch–Riemann–Roch 定理">
        <Tx>{R`在 Dolbeault 复形中，可以把 $\Omega^{0,r}(M)$ 换成张量积丛 $\Omega^{0,r}(M)\otimes V$，其中 $V$ 是 $M$ 上的全纯向量丛：`}</Tx>
        <Eq n="12.49" say={R`扭曲 Dolbeault 复形：取值于全纯丛 $V$ 的 $(0,r)$ 形式，$\bar\partial$ 在全纯标架下逐分量作用（全纯转移函数与 $\bar\partial$ 对易）。`}>{R`\cdots\xrightarrow{\bar\partial_V}\Omega^{0,r-1}(M)\otimes V\xrightarrow{\bar\partial_V}\Omega^{0,r}(M)\otimes V\xrightarrow{\bar\partial_V}\cdots.`}</Eq>
        <Tx>{R`这个复形的 AS 指标定理化为 **Hirzebruch–Riemann–Roch 定理**：`}</Tx>
        <Stmt id="F:HRR12">
          <Eq n="12.50" keyEq title="Hirzebruch–Riemann–Roch 定理" say={R`取值于全纯丛 $V$ 的 $\bar\partial$ 上同调的交错维数，等于 Todd 类乘以 $V$ 的陈特征的积分。`}>{R`\ind\bar\partial_V=\int_M\mathrm{Td}(TM^+)\mathrm{ch}(V).`}</Eq>
        </Stmt>
        <Tx>{R`（推导与上面相同，只是被积式多一个因子 $\mathrm{ch}(V)$：$\mathrm{ch}(\wedge^rT^*M^-\otimes V)=\mathrm{ch}(\wedge^rT^*M^-)\mathrm{ch}(V)$。）例如，若 $m=\dim_{\C}M=1$，则`}</Tx>
        <Eq n="12.51" keyEq title="Riemann 面上的 Riemann–Roch" say={R`亏格 $g$ 的 Riemann 面上：全纯截面数减去障碍数 = $(1-g)\times$秩 + 度数。对线丛即 $h^0-h^1=d+1-g$。`}>{R`\begin{aligned}\ind\bar\partial_V&=\tfrac12\dim V\int_Mc_1(TM^+)+\int_Mc_1(V)\\&=(1-g)\dim V+\int_M\frac{\mathrm{i}\,\mathrm{tr}\,\mathcal{F}}{2\pi}\end{aligned}`}</Eq>
        <Tx>{R`这是因为可以证明

$$\int_Mc_1(TM^+)=\int_Me(TM)=2-2g,$$

$g$ 是 $M$ 的亏格。（$\mathcal{F}$ 是 $V$ 上联络的曲率；$c_1(V)=\frac{\mathrm{i}}{2\pi}\mathrm{tr}\,\mathcal{F}$。）`}</Tx>
        <Box kind="warning" title={R`勘误：\eqref{12.51} 中的 $2-g$ 应为 $2-2g$，$(2-g)\dim V$ 应为 $(1-g)\dim V$`}>{R`原书写 $\int_Mc_1(TM^+)=\int_Me(TM)=2-g$ 与 $\ind\bar\partial_V=(2-g)\dim V+\int\frac{\mathrm{i}\mathcal{F}}{2\pi}$。亏格 $g$ 的闭曲面 Euler 示性数是 $\chi=2-2g$（球面 2、环面 0），所以正确的是 $\frac12\dim V\cdot(2-2g)=(1-g)\dim V$。验证：$M=\CP^1$（$g=0$）、$V$ 为平凡线丛时，$\ind\bar\partial=h^{0,0}-h^{0,1}=1-0=1=(1-0)\cdot1+0$；按原书会得到 $2$。$g=1$ 的环面上平凡线丛 $h^0=h^1=1$，指标 $0=(1-1)\cdot1$，按原书会得 $1$。对线丛 $V=L$，$\deg L=\int c_1(L)=d$，就是经典的 Riemann–Roch 定理 $h^0(L)-h^1(L)=d+1-g$。交互图 3 逐个核对。`}</Box>
        <Derivation title={R`\eqref{12.51} 的第一行`} collapsed steps={[
          { tex: R`\mathrm{Td}(TM^+)=\frac{x}{1-\mathrm{e}^{-x}}=1+\frac12x+\frac1{12}x^2+\cdots=1+\frac12c_1(TM^+)+\cdots`, why: R`复一维时 $TM^+$ 是线丛，唯一的陈根 $x=c_1(TM^+)$。` },
          { tex: R`\mathrm{ch}(V)=\dim V+c_1(V)+\cdots`, why: R`$\mathrm{ch}(V)=\mathrm{tr}\exp(\mathrm{i}\mathcal{F}/2\pi)$ 的零次、一次项。` },
          { tex: R`\big[\mathrm{Td}(TM^+)\mathrm{ch}(V)\big]_{2\text{形式}}=\frac12\dim V\,c_1(TM^+)+c_1(V)`, why: R`只保留二形式部分积分。` },
        ]} />
        <RiemannRochLab />
      </Sub>
    </Sec>);
}

export function Sec125() {
  return (
    <Sec n="12.5" title="The signature complex" zh="符号差复形"
      gist={R`$4k$ 维流形中间上同调上的相交形式 $\sigma([\omega],[\eta])=\int\omega\wedge\eta$ 的符号差 $\tau=b^+-b^-$ → 用 Hodge $*$ 的 $\pm1$ 本征空间表示 → 构造 $\pi=\mathrm{i}^{r(r-1)+l}*$（$\pi^2=1$，与 $\mathfrak{D}=\dd+\dd^\dagger$ 反对易）→ 符号差复形 $\mathfrak{D}_+:\Omega^+\to\Omega^-$，其指标 $=\tau(M)$ → Hirzebruch 符号差定理 $\tau=\int_ML(TM)$，四维时 $\tau=\frac13\int p_1$。`}
      why={R`de Rham 复形卷起来（习题 12.3）只给出 $\chi$，"没有新东西"。换一种分解——用 Hodge 星而不是形式次数的奇偶——同一个算子 $\dd+\dd^\dagger$ 就给出新的拓扑不变量 $\tau$。这展示了指标定理的灵活性：关键在于选取与算子反对易的"手征"算子。`}
      gives={["12.52", "12.53", "12.55", "12.59", "12.60", "12.62", "12.67", "12.68", "12.69"]}>
      <p className="muted">本节概念：<C id="signature" /></p>
      <Sub n="12.5.1" title="The Hirzebruch signature" zh="Hirzebruch 符号差">
        <Tx>{R`设 $M$ 是偶数维 $m=2l$ 的紧可定向流形。设 $[\omega]$、$[\eta]$ 是"中间"上同调群 $H^l(M;\R)$ 的元素。考虑由下式定义的双线性型 $H^l(M;\R)\times H^l(M;\R)\to\R$：`}</Tx>
        <Eq n="12.52" say={R`中间维数上同调上的相交形式：两个 $l$ 形式楔乘起来正好是体积形式，可以积分。`}>{R`\sym{sigf}{\sigma}([\omega],[\eta])\equiv\int_M\omega\wedge\eta`}</Eq>
        <Tx>{R`（参见例 11.8。）这个定义与 $[\omega]$、$[\eta]$ 的代表元无关（加上恰当形式，由 Stokes 定理积分不变）。$l$ 为偶数（$m\equiv0\bmod4$）时 $\sym{sigf}{\sigma}$ 是对称的，$l$ 为奇数（$m\equiv2\bmod4$）时是反对称的。Poincaré 对偶表明双线性型 $\sym{sigf}{\sigma}$ 有极大秩 $b^l=\dim H^l(M;\R)$，因而非退化。若 $l\equiv2k$ 为偶数，对称型 $\sym{sigf}{\sigma}$ 有实本征值，其中 $b^+$ 个为正、$b^-$ 个为负（$b^++b^-=b^l$）。**Hirzebruch 符号差**定义为`}</Tx>
        <Eq n="12.53" title="符号差" say={R`符号差：相交形式正本征值个数减负本征值个数——与基的选取无关（Sylvester 惯性定律）。`}>{R`\tau(M)\equiv b^+-b^-.`}</Eq>
        <Tx>{R`若 $l$ 为奇数，定义 $\tau(M)=0$（反对称型的本征值是纯虚数）。以下设 $l=2k$。

Hodge $*$ 作用在 $4k$ 维流形的 $2k$ 形式上满足 $*^2=1$，因此 $*$ 的本征值为 $\pm1$。设 $\mathrm{Harm}^{2k}(M)$ 是 $M$ 上调和 $2k$ 形式的集合。注意 $\mathrm{Harm}^{2k}(M)\cong H^{2k}(M;\R)$，$H^{2k}(M;\R)$ 的每个元素都有唯一的调和代表元。按 $*$ 的本征值，$\mathrm{Harm}^{2k}(M)$ 分成两个不交的子空间`}</Tx>
        <Eq n="12.54" say={R`中间维数的调和形式按 Hodge 星的本征值分成自对偶与反自对偶两部分。`}>{R`\mathrm{Harm}^{2k}(M)=\mathrm{Harm}^{2k}_+(M)\oplus\mathrm{Harm}^{2k}_-(M)`}</Eq>
        <Tx>{R`这一分解把双线性型 $\sym{sigf}{\sigma}$ 分块对角化。事实上，对 $\omega^\pm\in\mathrm{Harm}^{2k}_\pm(M)$，

$$\sym{sigf}{\sigma}(\omega^+,\omega^+)=\int_M\omega^+\wedge\omega^+=\int_M\omega^+\wedge*\omega^+=(\omega^+,\omega^+)>0$$

其中 $(\omega^+,\omega^+)$ 是由 \eqref{7.181} 定义的标准正定内积。我们还有

$$\begin{aligned}\sym{sigf}{\sigma}(\omega^-,\omega^-)&=-\int_M\omega^-\wedge*\omega^-=-(\omega^-,\omega^-)<0\\ \sym{sigf}{\sigma}(\omega^+,\omega^-)&=-\int_M\omega^+\wedge*\omega^-=-\int_M\omega^-\wedge*\omega^+=-\sym{sigf}{\sigma}(\omega^+,\omega^-)=0\end{aligned}$$

这里用到了对任意（同次）形式 $\alpha$、$\beta$ 有 $\alpha\wedge*\beta=\beta\wedge*\alpha$。（最后一行：$\sigma(\omega^+,\omega^-)=\int\omega^-\wedge\omega^+=\int\omega^-\wedge*\omega^+$，而由 $*\omega^-=-\omega^-$ 又有 $\sigma(\omega^+,\omega^-)=\int\omega^+\wedge\omega^-=-\int\omega^+\wedge*\omega^-$；两式相等且互为相反数，故为零。）所以 $\sym{sigf}{\sigma}$ 对于 $\mathrm{Harm}^{2k}_+(M)\oplus\mathrm{Harm}^{2k}_-(M)$ 是分块对角的，而且 $b^\pm=\dim_{\R}\mathrm{Harm}^{2k}_\pm(M)$。于是 $\tau(M)$ 表示为`}</Tx>
        <Eq n="12.55" say={R`符号差 = 自对偶调和形式个数 − 反自对偶调和形式个数：一个解析表达式。`}>{R`\tau(M)=\dim\mathrm{Harm}^{2k}_+(M)-\dim\mathrm{Harm}^{2k}_-(M).`}</Eq>
        <Exercise n="12.2" title={R`$\tau\equiv\chi\pmod2$`} level="★"
          hint={R`Poincaré 对偶 $b^r=b^{4k-r}$。把 $\chi=\sum(-1)^rb^r$ 中 $r$ 与 $4k-r$ 的项配对。`}
          solution={R`由 Poincaré 对偶 $b^r=b^{4k-r}$，且 $r$ 与 $4k-r$ 奇偶相同，所以

$$\chi(M)=\sum_{r=0}^{4k}(-1)^rb^r=2\sum_{r=0}^{2k-1}(-1)^rb^r+b^{2k}\equiv b^{2k}\pmod2.$$

另一方面 $\tau=b^+-b^-=b^++b^--2b^-=b^{2k}-2b^-\equiv b^{2k}\pmod2$。所以 $\tau(M)\equiv\chi(M)\pmod2$。

例：$\CP^2$ 的 $b^0=b^2=b^4=1$，$\chi=3$，$\tau=1$；$S^2\times S^2$ 的 $\chi=4$，相交形式 $\begin{pmatrix}0&1\\1&0\end{pmatrix}$，$\tau=0$；二者都满足同余式。`}>
          <><Tx>{R`设 $\dim M=4k$。证明`}</Tx>
          <Eq n="12.56" say={R`符号差与 Euler 示性数奇偶性相同。`}>{R`\tau(M)=\chi(M)\bmod2.`}</Eq>
          <Tx>{R`［提示：用 Poincaré 对偶证明 $\chi(M)=b^{2k}\bmod2$。］`}</Tx></>
        </Exercise>
      </Sub>

      <Sub n="12.5.2" title="The signature complex and the Hirzebruch signature theorem" zh="符号差复形与 Hirzebruch 符号差定理">
        <Tx>{R`**我们要做的事**：找一个椭圆算子，使它的指标正好是 \eqref{12.55}。候选是 $\dd+\dd^\dagger$；关键是用什么把空间劈成"正""负"两半。

设 $M$ 是 $m$ 维无边紧 Riemann 流形，$g$ 是给定的度规。考虑算子`}</Tx>
        <Eq n="12.57" say={R`$\dd+\dd^\dagger$：Laplace 算子的平方根，是一个一阶的 Dirac 型算子。`}>{R`${FD}\equiv\dd+\dd^\dagger.`}</Eq>
        <Tx>{R`$${FD}$ 是 Laplace 算子的平方根：$${FD}^2=\dd\dd^\dagger+\dd^\dagger\dd=\Delta$。要证明 $${FD}$ 椭圆，只需证 $\Delta$ 椭圆，因为算子乘积的符号是符号的乘积。我们来计算 $\Delta$ 的符号。对 $\dd$ 已有 $\sigma(\dd,\xi)\omega=\xi\wedge\omega$。对 $\dd^\dagger$，可以证明（Palais 1965, pp 77–8）`}</Tx>
        <Eq n="12.58" say={R`$\dd^\dagger$ 的符号是与 $\xi$ 的内积（缩并）再取负号——楔乘的伴随就是缩并。`}>{R`\sigma(\dd^\dagger,\xi)=-i_\xi.`}</Eq>
        <Tx>{R`这里 $i_\xi:\Omega^r_p(M)\to\Omega^{r-1}_p(M)$ 是内积（参见 \eqref{5.79}），定义为

$$i_\xi(\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r})\equiv\sum_{j=1}^r(-1)^{j+1}g^{\mu_j\mu}\xi_\mu\,\dd x^{\mu_1}\wedge\ldots\wedge\nosym{\widehat{\dd x^{\mu_j}}}\wedge\ldots\wedge\dd x^{\mu_r}$$

其中带 $\nosym{\hat{\ }}$ 的一形式被省去，$\xi=\xi_\mu\dd x^\mu$。于是由 \eqref{12.58} 得到 Laplace 算子的符号：

$$\begin{aligned}\sigma(\Delta,\xi)\omega&=\sigma(\dd\dd^\dagger+\dd^\dagger\dd,\xi)\omega=-[\xi\wedge i_\xi(\omega)+i_\xi(\xi\wedge\omega)]\\&=-i_\xi(\xi)\wedge\omega=-\|\xi\|^2\omega\end{aligned}$$

其中 $\omega$ 是任意 $r$ 形式，范数 $\|\ \|$ 取自给定的 Riemann 度规。（第二行用了 $i_\xi$ 是反导子：$i_\xi(\xi\wedge\omega)=i_\xi(\xi)\,\omega-\xi\wedge i_\xi\omega$。）最终得到`}</Tx>
        <Eq n="12.59" say={R`Hodge–Laplace 算子的符号是 $-\|\xi\|^2$ 乘以单位矩阵：在 $\xi\neq0$ 时可逆，所以 $\Delta$（从而 $\dd+\dd^\dagger$）是椭圆的。（负号来自 $\Delta=\dd\dd^\dagger+\dd^\dagger\dd$ 在平直空间等于 $-\sum\partial_\mu^2$。）`}>{R`\sigma(\Delta,\xi)=-\|\xi\|^2.`}</Eq>
        <Derivation title={R`为什么 $\sigma(\dd^\dagger,\xi)=-i_\xi$`} collapsed steps={[
          { tex: R`\dd^\dagger\omega=-\nabla^\mu\omega_{\mu\nu_2\cdots\nu_r}\,\frac{\dd x^{\nu_2}\wedge\cdots}{(r-1)!}`, why: R`在平直（或法坐标）中，$\dd^\dagger$ 就是"负散度"：缩并掉第一个指标（第 7 章）。` },
          { tex: R`\sigma(\dd^\dagger,\xi)\omega=\dd^\dagger(f\tilde s)|_p=-(\partial^\mu f)\,\omega_{\mu\cdots}=-i_\xi\omega`, why: R`按 \eqref{12.4}，导数只落在 $f$ 上，$\partial_\mu f(p)=\xi_\mu$，缩并即内积 $i_\xi$。也可以由"楔乘 $\xi\wedge$ 的逐点伴随是 $i_\xi$"直接看出。` },
        ]} />
        <Tx>{R`所以 Laplace 算子 $\Delta$ 是椭圆的，$${FD}=\dd+\dd^\dagger$ 也是。

由于 Laplace 算子 $\Delta=${FD}^2$ 在 $\Omega^*(M)$ 上自伴，$\Delta$ 的指标显然为零。又注意到在 $\Omega^*(M)$ 上 $${FD}=${FD}^\dagger$，因此 $\ind${FD}=0$。要构造非平凡的指标定理，必须找一个使 $${FD}\neq${FD}^\dagger$ 的复形。`}</Tx>
        <Exercise n="12.3" title={R`把 $\mathfrak{D}$ 限制到偶形式`} level="★"
          hint={R`$\mathfrak{D}^{\rm e}$ 与 $\mathfrak{D}^{\rm o}$ 是同一个自伴算子 $\mathfrak{D}$ 的两块：$\mathfrak{D}=\begin{pmatrix}0&\mathfrak{D}^{\rm o}\\ \mathfrak{D}^{\rm e}&0\end{pmatrix}$。用 $\|\mathfrak{D}\omega\|^2=\langle\omega,\Delta\omega\rangle$。`}
          solution={R`$\mathfrak{D}$ 把偶形式送到奇形式、奇形式送到偶形式，因此在 $\Omega^{\rm e}\oplus\Omega^{\rm o}$ 中是非对角的，非对角块就是 $\mathfrak{D}^{\rm e}$ 与 $\mathfrak{D}^{\rm o}=\mathfrak{D}^{{\rm e}\dagger}$（$\mathfrak{D}$ 自伴）。

**$\ker\mathfrak{D}^{\rm e}=\oplus\mathrm{Harm}^{2i}$**：若 $\omega\in\Omega^{\rm e}$ 且 $\mathfrak{D}^{\rm e}\omega=0$，则 $\Delta\omega=\mathfrak{D}^2\omega=0$；反之若 $\Delta\omega=0$，则 $0=\langle\omega,\mathfrak{D}^2\omega\rangle=\|\mathfrak{D}\omega\|^2$。$\Delta$ 保持形式次数，所以偶形式的调和部分是各偶次调和形式之和 $\oplus_i\mathrm{Harm}^{2i}(M)$。同理 $\ker\mathfrak{D}^{\rm o}=\oplus_i\mathrm{Harm}^{2i+1}(M)$。

于是 $\ind\mathfrak{D}^{\rm e}=\sum_ib^{2i}-\sum_ib^{2i+1}=\chi(M)$。这正是 \eqref{12.32}：$\mathfrak{D}^{\rm e}$ 就是 §12.1 中卷起 de Rham 复形得到的 $A$（$\dd_{2r}+\dd^\dagger_{2r-1}$ 恰是 $\dd+\dd^\dagger$ 在 $\Omega^{2r}$ 上的作用）。所以"不给出新东西"。`}>
          {R`考虑 $\mathfrak{D}$ 在偶形式上的限制 $\mathfrak{D}^{\rm e}:\Omega^{\rm e}(M)^{\C}\to\Omega^{\rm o}(M)^{\C}$，其中 $\Omega^{\rm e}(M)^{\C}\equiv\oplus\Omega^{2i}(M)^{\C}$，$\Omega^{\rm o}(M)^{\C}\equiv\oplus\Omega^{2i+1}(M)^{\C}$。$\mathfrak{D}^{\rm e}$ 的伴随是 $\mathfrak{D}^{\rm o}\equiv\mathfrak{D}^{{\rm e}\dagger}:\Omega^{\rm o}(M)^{\C}\to\Omega^{\rm e}(M)^{\C}$。证明

$$\ind\mathfrak{D}^{\rm e}=\dim\ker\mathfrak{D}^{\rm e}-\dim\ker\mathfrak{D}^{\rm o}=\chi(M).$$

［提示：证明 $\ker\mathfrak{D}^{\rm e}=\oplus\mathrm{Harm}^{2i}(M)$、$\ker\mathfrak{D}^{\rm o}=\oplus\mathrm{Harm}^{2i+1}(M)$。这个复形虽然非平凡，却不给出新东西。］`}
        </Exercise>
        <Tx>{R`**新的"手征"算子 $\pi$。**若 $\dim M=m=2l$，对 $\eta\in\Omega^r(M)^{\C}$ 有 $**\eta=(-1)^r\eta$。定义算子 $${PI}:\Omega^r(M)^{\C}\to\Omega^{m-r}(M)^{\C}$ 为`}</Tx>
        <Eq n="12.60" title={R`手征算子 $\pi$`} say={R`给 Hodge 星配上一个与次数有关的相位，使它平方为 1：$\pi$ 是形式空间上的"手征"或"宇称"算子。`}>{R`${PI}\equiv\mathrm{i}^{r(r-1)+l}*.`}</Eq>
        <Tx>{R`注意 $${PI}$ 是 $(-1)^r**=1$ 的"平方根"。事实上，对 $\omega\in\Omega^r(M)^{\C}$，`}</Tx>
        <Eq n="12.61" say={R`验证 $\pi^2=1$：两次相位的指数之和等于 $2r^2$ 加 4 的倍数，而 $\mathrm{i}^{2r^2}=(-1)^r$ 正好抵消 $**=(-1)^r$。`}>{R`\begin{aligned}${PI}^2\omega&=\mathrm{i}^{r(r-1)+l}${PI}(*\omega)=\mathrm{i}^{r(r-1)+l+(2l-r)(2l-r-1)+l}**\omega\\&=\mathrm{i}^{2r^2}**\omega=(-1)^r**\omega=\omega\end{aligned}`}</Eq>
        <Tx>{R`这里用到了 $r\equiv r^2\bmod2$。（指数：$r(r-1)+l+(2l-r)(2l-r-1)+l=2r^2+4l^2-4lr$，而 $\mathrm{i}^{4(l^2-lr)}=1$。）容易验证（习题，下面补全）`}</Tx>
        <Eq n="12.62" say={R`$\pi$ 与 $\dd+\dd^\dagger$ 反对易——这正是"手征算子"应满足的条件，于是 $\mathfrak{D}$ 把 $\pi=+1$ 的子空间送到 $\pi=-1$ 的子空间。`}>{R`\{${PI},${FD}\}=${PI}${FD}+${FD}${PI}=0.`}</Eq>
        <Derivation title={R`验证 \eqref{12.62}（本站补全）`} collapsed steps={[
          { tex: R`\dd^\dagger=-*\dd*\quad(m=2l\text{ 偶数，Riemann 度规})`, why: R`第 7 章：$\dd^\dagger=(-1)^{mr+m+1}*\dd*$ 作用在 $r$ 形式上；$m$ 偶时为 $-*\dd*$。` },
          { tex: R`\pi\dd\omega=\mathrm{i}^{(r+1)r+l}*\dd\omega,\qquad\dd^\dagger\pi\omega=-\mathrm{i}^{r(r-1)+l}*\dd**\omega=-\mathrm{i}^{r(r-1)+l}(-1)^r*\dd\omega`, why: R`$\omega\in\Omega^r$，$\dd\omega\in\Omega^{r+1}$；$\pi\omega\in\Omega^{m-r}$。两式都属于 $\Omega^{m-r-1}$。` },
          { tex: R`\mathrm{i}^{r(r-1)}(-1)^r=\mathrm{i}^{r(r-1)+2r}=\mathrm{i}^{r(r+1)}\ \Rightarrow\ \pi\dd\omega=-\dd^\dagger\pi\omega`, why: R`两者相位相同、符号相反。` },
          { tex: R`\pi\dd^\dagger\omega=-\mathrm{i}^{(r-1)(r-2)+l}**\dd*\omega,\qquad\dd\pi\omega=\mathrm{i}^{r(r-1)+l}\dd*\omega`, why: R`$\dd^\dagger\omega\in\Omega^{r-1}$；$\dd*\omega\in\Omega^{m-r+1}$，$**$ 在其上为 $(-1)^{m-r+1}=(-1)^{r+1}$。` },
          { tex: R`-\mathrm{i}^{(r-1)(r-2)}(-1)^{r+1}=\mathrm{i}^{(r-1)(r-2)}(-1)^r=\mathrm{i}^{r^2-3r+2+2r}=\mathrm{i}^{r(r-1)+2}=-\mathrm{i}^{r(r-1)}`, why: R`所以 $\pi\dd^\dagger\omega=-\dd\pi\omega$。两式相加：$\pi\mathfrak{D}+\mathfrak{D}\pi=0$。` },
        ]} />
        <Tx>{R`让 $${PI}$ 作用在 $\Omega^*(M)^{\C}=\oplus\Omega^r(M)^{\C}$ 上。由于 $${PI}^2=1$，$${PI}$ 的本征值为 $\pm1$。于是 $\Omega^*(M)^{\C}$ 分解为 $${PI}$ 的 $\pm1$ 本征空间 $\Omega^\pm(M)$：`}</Tx>
        <Eq n="12.63" say={R`全体复形式按 $\pi$ 的本征值分成"正手征"与"负手征"两半——不是按次数的奇偶，而是混合了 $r$ 次与 $m-r$ 次形式。`}>{R`\Omega^*(M)^{\C}=\Omega^+(M)\oplus\Omega^-(M).`}</Eq>
        <Tx>{R`由于 $${FD}$ 与 $${PI}$ 反对易，$${FD}$ 在 $\Omega^+(M)$ 上的限制定义了一个椭圆复形，称为**符号差复形**（signature complex）：`}</Tx>
        <Eq n="12.64" title="符号差复形" say={R`符号差复形：$\dd+\dd^\dagger$ 从 $\pi=+1$ 的形式映到 $\pi=-1$ 的形式。`}>{R`${FD}_+:\Omega^+(M)\to\Omega^-(M)`}</Eq>
        <Tx>{R`其中 $${FD}_+\equiv${FD}|_{\Omega^+(M)}$。符号差复形的指标为`}</Tx>
        <Eq n="12.65" say={R`符号差复形的指标：$\pi=+1$ 的调和形式数减 $\pi=-1$ 的调和形式数。`}>{R`\begin{aligned}\ind${FD}_+&=\dim\ker${FD}_+-\dim\ker${FD}_-\\&=\dim\mathrm{Harm}(M)^+-\dim\mathrm{Harm}(M)^-\end{aligned}`}</Eq>
        <Tx>{R`其中 $${FD}_-\equiv${FD}_+^\dagger:\Omega^-(M)\to\Omega^+(M)$，$\mathrm{Harm}(M)^\pm\equiv\{\omega\in\Omega^\pm(M)\mid${FD}_\pm\omega=0\}$。

**只剩中间维数。**\eqref{12.65} 右边除了来自调和 $l$ 形式的贡献外全部相消。为此把 $\ker${FD}_+$ 与 $\ker${FD}_-$ 分解为

$$\ker${FD}_\pm=\mathrm{Harm}^l(M)^\pm\oplus\sum_{0\le r<l}[\mathrm{Harm}^r(M)^\pm\oplus\mathrm{Harm}^{m-r}(M)^\pm]$$

其中 $\mathrm{Harm}^r(M)^\pm\equiv\mathrm{Harm}(M)^\pm\cap\Omega^r(M)$（更准确地说：$\pi$ 与 $\Delta$ 对易，调和形式空间在 $\pi$ 下不变；$\pi$ 互换 $r$ 次与 $m-r$ 次，所以按"$r$ 与 $m-r$ 两个次数合在一起"分块）。若 $\omega\in\mathrm{Harm}^r(M)$，则 $\omega\pm${PI}\omega\in\mathrm{Harm}^r(M)^\pm\oplus\mathrm{Harm}^{m-r}(M)^\pm$。于是映射 $\omega+${PI}\omega\mapsto\omega-${PI}\omega$ 定义了 $\mathrm{Harm}^r(M)^+\oplus\mathrm{Harm}^{m-r}(M)^+$ 与 $\mathrm{Harm}^r(M)^-\oplus\mathrm{Harm}^{m-r}(M)^-$ 之间的同构（$r<l$ 时 $\omega$ 与 $\pi\omega$ 次数不同，线性无关，这个映射是双射）。现在指标化简为`}</Tx>
        <Eq n="12.66" say={R`非中间次数的调和形式在正、负手征中成对出现、互相抵消，只剩中间次数 $2k$ 的贡献。`}>{R`\ind${FD}_+=\dim\mathrm{Harm}^{2k}(M)^+-\dim\mathrm{Harm}^{2k}(M)^-`}</Eq>
        <Tx>{R`这里像之前一样令 $l=2k$（$l$ 为奇数时指标为零）。重要的是，由于在 $\mathrm{Harm}^{2k}(M)$ 上 $${PI}=*$（$r=l=2k$ 时相位 $\mathrm{i}^{2k(2k-1)+2k}=\mathrm{i}^{4k^2}=1$），有 $\mathrm{Harm}^{2k}(M)^\pm=\mathrm{Harm}^{2k}_\pm(M)$，见 \eqref{12.54}。于是指标 \eqref{12.66} 化为 Hirzebruch 符号差：`}</Tx>
        <Eq n="12.67" title="符号差复形的指标" say={R`符号差复形的解析指标正是 Hirzebruch 符号差。`}>{R`\ind${FD}_+=\tau(M).`}</Eq>
        <Tx>{R`**拓扑指标。**拓扑指标的推导相当技术化，我们直接引用 Shanahan (1978) 的结果。设 $\wedge^\pm T^*M^{\C}$ 是 $\wedge T^*M^{\C}$ 的子空间，使 $\Omega^\pm(M)=\Gamma(M,\wedge^\pm T^*M^{\C})$。于是

$$\begin{aligned}\text{拓扑指标}&=(-1)^l\int_M\mathrm{ch}(\wedge^+T^*M^{\C}-\wedge^-T^*M^{\C})\frac{\mathrm{Td}(TM^{\C})}{e(TM)}\Big|_{\rm vol}\\&=2^l\int_M\prod_{i=1}^l\frac{x_i/2}{\tanh x_i/2}\Big|_{\rm vol}=\int_M\prod_{i=1}^l\frac{x_i}{\tanh x_i}\Big|_{\rm vol}\end{aligned}$$

其中最后一个等号只对展开式中的 $2l$ 形式成立，$x_i=x_i(TM^{\C})$。（理由：$2l$ 形式是 $x$ 的 $l$ 次齐次部分，把每个 $x_i$ 换成 $x_i/2$ 使它乘上 $2^{-l}$，正好与前面的 $2^l$ 抵消。）现在得到 **Hirzebruch 符号差定理**`}</Tx>
        <Stmt id="F:sign12">
          <Eq n="12.68" keyEq title="Hirzebruch 符号差定理" say={R`符号差（相交形式的正负本征值数之差）等于 Hirzebruch $L$ 多项式的积分。`}>{R`\tau(M)=\int_ML(TM)|_{\rm vol}`}</Eq>
        </Stmt>
        <Tx>{R`其中 $L$ 是由 (11.91) 定义的 Hirzebruch $L$ 多项式。由于 $L$ 是 $x_i$ 的偶函数，$m\equiv2\bmod4$ 时 $\tau(M)$ 为零。例如 $m=2$ 时 $\tau(M)=0$。若 $m=4$，则`}</Tx>
        <Eq n="12.69" title="四维符号差定理" say={R`四维时符号差是第一 Pontryagin 数的三分之一——推论：紧 4 维流形上 $\int p_1$ 必为 3 的倍数。`}>{R`\tau(M)=\int_M\frac13p_1(TM)=-\frac1{24\pi^2}\int\mathrm{tr}\,\mathcal{R}^2.`}</Eq>
        <Derivation title={R`\eqref{12.69} 的两个等号`} collapsed steps={[
          { tex: R`\frac{x}{\tanh x}=1+\frac{x^2}{3}-\frac{x^4}{45}+\cdots\ \Rightarrow\ L=1+\frac13\sum_ix_i^2+\cdots=1+\frac13p_1+\cdots`, why: R`$p_1=\sum_ix_i^2$（第 11 章）。四维时只取 4 形式部分。` },
          { tex: R`p_1(TM)=-\frac1{8\pi^2}\mathrm{tr}\,\mathcal{R}^2\ \Rightarrow\ \frac13p_1=-\frac1{24\pi^2}\mathrm{tr}\,\mathcal{R}^2`, why: R`$p(\mathcal{R})=\det(1+\mathcal{R}/2\pi)$ 的二阶项，$\mathcal{R}$ 反对称使 $\mathrm{tr}\,\mathcal{R}=0$（第 11 章）。例：$\CP^2$ 的 $p_1=3$，$\tau=1$。` },
        ]} />
        <Tx>{R`与 Dolbeault 复形一样，符号差复形也可以扭曲，例如见 Eguchi 等 (1980)。`}</Tx>
      </Sub>
    </Sec>);
}
