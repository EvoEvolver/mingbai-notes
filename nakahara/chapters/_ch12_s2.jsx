// §12.2 Atiyah–Singer 指标定理 + §12.3 de Rham 复形 —— 式 (12.33)–(12.42b)，定理 12.2，推论 12.1，例 12.3
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Derivation, C } from "@kit";
import { GaussBonnetLab } from "./_ch12_demos.jsx";

const R = String.raw;

export function Sec122() {
  return (
    <Sec n="12.2" title="The Atiyah–Singer index theorem" zh="Atiyah–Singer 指标定理"
      gist={R`椭圆复形的解析指标等于 $(-1)^{m(m+1)/2}\int_M\mathrm{ch}(\oplus(-1)^rE_r)\,\mathrm{Td}(TM^{\C})/e(TM)$；两项复形时被积式是 $(\mathrm{ch}E-\mathrm{ch}F)\mathrm{Td}/e$。`}
      why={R`§12.1 只是定义了指标并说明它是有限的整数；AS 定理给出一个**通用公式**，把它算出来——不需要解任何微分方程，只需要知道各丛的示性类。后面四节都是"把具体复形代进这个公式"。`}
      gives={["12.33", "12.34"]}>
      <p className="muted">本节概念：<C id="as_theorem" /></p>
      <Sub n="12.2.1" title="Statement of the theorem" zh="定理的陈述">
        <Stmt id="T12.2">
          <Eq n="12.33" keyEq title="Atiyah–Singer 指标定理" say={R`椭圆复形的解析指标 = 各级丛的交错陈特征乘以 Todd 类再除以 Euler 类，在 $M$ 上积分（只取 $m$ 形式部分）。左边数零模，右边量曲率。`}>{R`\ind(E,D)=(-1)^{m(m+1)/2}\int_M\mathrm{ch}\Big(\mathop{\oplus}_r(-1)^rE_r\Big)\frac{\mathrm{Td}(TM^{\C})}{e(TM)}\Big|_{\rm vol}.`}</Eq>
        </Stmt>
        <Tx>{R`右边被积式中只挑出 $m$ 形式，积分才有意义。［**注**：除以 $e(TM)$ 在形式上确实可以做到——在分裂原理下（第 11 章），分子总是含有因子 $\prod_ix_i$，可以与分母约去。若 $m$ 为奇数，指标恒为零，见下文。原始文献为 Atiyah–Singer (1968a, b) 与 Atiyah–Segal (1968)。］

**符号的含义。**$\mathrm{ch}(\oplus_r(-1)^rE_r)\equiv\sum_r(-1)^r\mathrm{ch}(E_r)$ 是各丛陈特征的交错和；$TM^{\C}=TM\otimes\C$ 是复化切丛，$\mathrm{Td}$ 是它的 Todd 类；$e(TM)$ 是 Euler 类；"$|_{\rm vol}$"表示取 $m$ 形式（体积形式）部分。

定理 12.2 的证明见 Shanahan (1978)、Palais (1965)、Gilkey (1984)，所用方法是 K 理论或热核形式。§13.2 将用热核证明自旋复形情形下最简单的 Atiyah–Singer（AS）指标定理。近来物理学家利用**超对称**给出了另一个证明，§12.9 与 §12.10 将概述这一证明；细节见 Alvarez-Gaumé (1983) 与 Friedan–Windey (1984, 1985)。

下面的推论是定理 12.2 的直接结果。`}</Tx>
        <Stmt id="C12.1">
          <Eq n="12.34" keyEq title="两项复形的指标定理" say={R`两项复形的特例：$\dim\ker D-\dim\ker D^\dagger$ 等于 $(\mathrm{ch}E-\mathrm{ch}F)\mathrm{Td}/e$ 的积分——自旋复形、扭曲自旋复形都套用这一形式。`}>{R`\begin{aligned}\ind D&=\dim\ker D-\dim\ker D^\dagger\\&=(-1)^{m(m+1)/2}\int_M(\mathrm{ch}E-\mathrm{ch}F)\frac{\mathrm{Td}(TM^{\C})}{e(TM)}\Big|_{\rm vol}.\end{aligned}`}</Eq>
          <Proof steps={[
            { claim: R`两项复形 $0\to\Gamma(M,E)\xrightarrow{D}\Gamma(M,F)\to0$ 即 $E_0=E$、$E_1=F$。由 \eqref{12.20} 与 \sref{T12.1}，复形指标 \eqref{12.19} 等于 $\dim\ker D-\dim\operatorname{coker}D=\dim\ker D-\dim\ker D^\dagger$。`, uses: ["12.20", "T12.1"], fill: true },
            { claim: R`陈特征对直和可加（定理 11.5），形式差 $E_0-E_1$ 的陈特征为 $\mathrm{ch}E-\mathrm{ch}F$。代入 \eqref{12.33} 即得。`, uses: ["T12.2", "T11.5"], fill: true },
          ]} />
        </Stmt>
        <Box kind="physics" title="为什么右边必然是拓扑的">{R`AS 定理的"魔术"可以这样理解：(i) 由 \sref{T12.4}，指标在算子的连续形变下不变；(ii) 因此可以把度规、联络任意连续地改动，指标都不变；(iii) 但任何**局部**公式（曲率多项式的积分）在这种改动下只能改变一个恰当形式——这正是示性类的性质（定理 11.1）。热核证明（§12.7）把这一想法变成计算：$\ind D=\int_M[a_0^E(x)-a_0^F(x)]\dd x$，而 $a_0(x)$ 是曲率的局部多项式。`}</Box>
      </Sub>
    </Sec>);
}

export function Sec123() {
  return (
    <Sec n="12.3" title="The de Rham complex" zh="de Rham 复形"
      gist={R`$\dd$ 的符号是 $\xi\wedge$，de Rham 复形椭圆 → 解析指标 $=\chi(M)$ → 用分裂原理算拓扑指标：$\mathrm{ch}(\oplus(-1)^r\wedge^rT^*M^{\C})=\prod(1-\mathrm{e}^{-x_i})$，与 Todd 类相乘得 $\prod x_i$，除以 $e$ 后正好是 $e(TM)$ → Gauss–Bonnet–陈定理 $\chi(M)=\int_Me(TM)$。`}
      why={R`这是 AS 定理最古老的特例，也是检验公式中各个符号约定的试金石：左边可以数三角形，右边可以积曲率——两个完全不同的计算必须给出同一个整数。`}
      gives={["12.36", "12.37", "12.39", "12.41", "12.42a", "12.42b"]}>
      <p className="muted">本节概念：<C id="gauss_bonnet" /> · <C id="symbol_ellipticity" /></p>
      <Tx>{R`设 $M$ 是 $m$ 维无边紧可定向流形。我们已经熟悉 de Rham 复形`}</Tx>
      <Eq n="12.35" say={R`复化的 de Rham 复形：复系数 $r$ 形式由外微分依次连接。`}>{R`\cdots\xrightarrow{\dd}\Omega^{r-1}(M)^{\C}\xrightarrow{\dd}\Omega^r(M)^{\C}\xrightarrow{\dd}\Omega^{r+1}(M)^{\C}\xrightarrow{\dd}\cdots`}</Eq>
      <Tx>{R`其中 $\Omega^r(M)^{\C}=\Gamma(M,\wedge^rT^*M^{\C})$。我们把形式复化，以便应用 AS 指标定理（定理中的丛都是复向量丛）。外微分满足 $\dd^2=0$。

**$\dd$ 是椭圆的。**要说明 \eqref{12.35} 是椭圆复形，需要证明 $\dd$ 是椭圆的。为求 $\dd$ 的符号，注意到

$$\sigma(\dd,\xi)\omega=\dd(f\tilde s)|_p=\dd f\wedge\tilde s+f\dd\tilde s|_p=\xi\wedge\omega$$

其中 $p\in M$，$\omega\in\Omega^r_p(M)^{\C}$，$f(p)=0$，$\dd f(p)=\xi$，$\tilde s\in\Omega^r(M)^{\C}$ 且 $\tilde s(p)=\omega$；见 \eqref{12.4}。于是`}</Tx>
      <Eq n="12.36" title={R`外微分的符号`} say={R`外微分的符号就是"用余切向量 $\xi$ 楔乘"——$\dd$ 在高频平面波上的作用。`}>{R`\sigma(\dd,\xi)=\xi\wedge.`}</Eq>
      <Tx>{R`它定义了映射 $\Omega^r(M)^{\C}\to\Omega^{r+1}(M)^{\C}$，在 $\xi\neq0$ 时是非退化的（准确地说：符号序列是**正合**的，见下框）。于是 $\dd:\Omega^r(M)^{\C}\to\Omega^{r+1}(M)^{\C}$ 是椭圆的，\eqref{12.35} 是椭圆复形。但要注意，算子 $\dd:\Omega^k(M)\to\Omega^{k+1}(M)$ **不是** Fredholm 算子，因为 $\ker\dd$ 是无穷维的（所有恰当形式都在其中）。要对这个复形应用指标定理，必须改用 de Rham 上同调群 $H^r(M)$；在这个空间上 $\dd$ 确实是"Fredholm 的"（上同调有限维）。`}</Tx>
      <Box kind="note" title={R`$\xi\wedge$ 的符号序列是正合的`}>{R`单个映射 $\xi\wedge:\wedge^r\to\wedge^{r+1}$ 当然不是可逆的（维数一般不同），"非退化"的准确含义是序列 $0\to\wedge^0\xrightarrow{\xi\wedge}\wedge^1\xrightarrow{\xi\wedge}\cdots\xrightarrow{\xi\wedge}\wedge^m\to0$ 在 $\xi\neq0$ 时正合：若 $\xi\wedge\omega=0$，则 $\omega=\xi\wedge\alpha$。证明：取基使 $\xi=|\xi|\,e^1$，则 $\xi\wedge\omega=0$ 说明 $\omega$ 的每一项都含 $e^1$。等价地，$\sigma(\Delta,\xi)=-\|\xi\|^2$（\eqref{12.59}）可逆。`}</Box>
      <Tx>{R`**解析指标。**我们来求这个复形的指标定理。注意到 $\dim_{\C}H^r(M;\C)=\dim_{\R}H^r(M;\R)$，所以解析指标为`}</Tx>
      <Eq n="12.37" say={R`复化不改变维数：de Rham 复形的解析指标就是 Euler 示性数。`}>{R`\begin{aligned}\ind\dd&=\sum_{r=0}^m(-1)^r\dim_{\C}H^r(M;\C)\\&=\sum(-1)^r\dim_{\R}H^r(M;\R)=\chi(M)\end{aligned}`}</Eq>
      <Tx>{R`其中 $\chi(M)$ 是 $M$ 的 Euler 示性数。

**拓扑指标。**设 $M$ 是偶数维的，$m=2l$。\eqref{12.33} 的右边给出拓扑指标`}</Tx>
      <Eq n="12.38" say={R`把 de Rham 复形代入 AS 公式：各级丛是 $\wedge^rT^*M^{\C}$，符号 $(-1)^{m(m+1)/2}$ 在 $m=2l$ 时为 $(-1)^{l(2l+1)}$。`}>{R`(-1)^{l(2l+1)}\int_M\mathrm{ch}\Big(\mathop{\oplus}_{r=0}^m(-1)^r\wedge^rT^*M^{\C}\Big)\frac{\mathrm{Td}(TM^{\C})}{e(TM)}\Big|_{\rm vol}.`}</Eq>
      <Tx>{R`由分裂原理，

$$\begin{aligned}\mathrm{ch}\Big(\mathop{\oplus}_{r=0}^m(-1)^r\wedge^rT^*M^{\C}\Big)&=1-\mathrm{ch}(T^*M^{\C})+\mathrm{ch}(\wedge^2T^*M^{\C})+\cdots+(-1)^m\mathrm{ch}(\wedge^mT^*M^{\C})\\&=1-\sum_{i=1}^m\mathrm{e}^{-x_i}(TM^{\C})+\sum_{i<j}\mathrm{e}^{-x_i}\mathrm{e}^{-x_j}(TM^{\C})+\cdots\\&\qquad+(-1)^m\mathrm{e}^{-x_1}\mathrm{e}^{-x_2}\ldots\mathrm{e}^{-x_m}(TM^{\C})\\&=\prod_{i=1}^m(1-\mathrm{e}^{-x_i})(TM^{\C})\end{aligned}$$

这里用到了 $x_i(T^*M^{\C})=-x_i(TM^{\C})$。［设 $L$ 是复线丛，$L^*$ 是它的对偶丛。$L\otimes L^*$ 是这样一个丛：它在每根纤维上的截面是映射 $\C\to\C$。$L\otimes L^*$ 有处处不为零的整体截面（例如恒等映射），由此可证 $L\otimes L^*$ 是平凡丛。于是 $c_1(L\otimes L^*)=c_1(L)+c_1(L^*)=0$，从而 $x(L^*)=-x(L)$。由分裂原理得 $x_i(T^*M^{\C})=-x_i(TM^{\C})$。］我们还有

$$\mathrm{Td}(TM^{\C})=\prod_{i=1}^m\frac{x_i}{1-\mathrm{e}^{-x_i}}(TM^{\C}),\qquad e(TM)=\prod_{i=1}^lx_i(TM^{\C}).$$

代入 \eqref{12.38} 得到`}</Tx>
      <Eq n="12.39" say={R`分子分母约去后只剩 $\prod_{i\le l}x_i$，正好是 Euler 类：de Rham 复形的拓扑指标是 Euler 类的积分。`}>{R`\ind\dd=\int_M(-1)^{l(2l+1)}(-1)^l\Big(\prod_{i=1}^lx_i(TM^{\C})\Big)=\int_Me(TM).`}</Eq>
      <Derivation title={R`从 \eqref{12.38} 到 \eqref{12.39}：符号 $(-1)^l$ 从哪里来`} collapsed steps={[
        { tex: R`\mathrm{ch}\Big(\mathop{\oplus}(-1)^r\wedge^rT^*M^{\C}\Big)\mathrm{Td}(TM^{\C})=\prod_{i=1}^m(1-\mathrm{e}^{-x_i})\frac{x_i}{1-\mathrm{e}^{-x_i}}=\prod_{i=1}^mx_i`, why: R`逐因子相消。注意这是 $TM^{\C}$（复秩 $m=2l$）的全部 $m$ 个陈根之积，即 $c_m(TM^{\C})$。` },
        { tex: R`\{x_1,\ldots,x_m\}=\{x_1,\ldots,x_l,-x_1,\ldots,-x_l\}`, why: R`$TM^{\C}=TM\otimes\C$ 是实丛的复化，与其共轭（对偶）同构，所以陈根成对出现。用 $\mathrm{SO}(2l)$ 的分块对角化：每个 $2\times2$ 块 $\begin{pmatrix}0&x\\-x&0\end{pmatrix}$ 的本征值为 $\pm\mathrm{i}x$，对应陈根 $\pm x$（第 11 章）。原书在这里沿用了"$i=1,\ldots,m$"与"$i=1,\ldots,l$"两种范围，读者应按此理解。`, },
        { tex: R`\prod_{i=1}^mx_i=\prod_{j=1}^lx_j(-x_j)=(-1)^l\Big(\prod_{j=1}^lx_j\Big)^2=(-1)^l\,e(TM)^2`, why: R`这正是 $c_{2l}(TM^{\C})=(-1)^lp_l(TM)$ 与 $p_l=e^2$ 的关系。` },
        { tex: R`(-1)^{l(2l+1)}\frac{(-1)^le(TM)^2}{e(TM)}=(-1)^{2l^2+2l}e(TM)=e(TM)`, why: R`$l(2l+1)+l=2l^2+2l$ 是偶数。除以 $e$ 的"形式运算"在这里一目了然：分子里正好有一个因子 $e$。` },
      ]} />
      <Tx>{R`若 $m$ 是奇数，可以证明（Shanahan (1978), p 22）`}</Tx>
      <Eq n="12.40" say={R`奇数维无边紧流形的 Euler 示性数为零（Poincaré 对偶使 Betti 数两两抵消）。`}>{R`\ind\dd=0`}</Eq>
      <Tx>{R`这与 $\dim M$ 为奇数时 $e(TM)=0$ 的事实相符。（直接的理由：奇数维时 Poincaré 对偶给出 $b^r=b^{m-r}$，而 $r$ 与 $m-r$ 奇偶相反，交错和两两相消。）总之，de Rham 复形的指标定理是`}</Tx>
      <Stmt id="F:deRham12">
        <Eq n="12.41" keyEq title="Gauss–Bonnet–陈定理" say={R`Euler 示性数（拓扑）等于 Euler 类即曲率 Pfaff 式的积分（几何）。`}>{R`\chi(M)=\int_Me(TM).`}</Eq>
      </Stmt>
      <Box kind="example" n="12.3" title="Gauss–Bonnet 定理">
        <Tx>{R`设 $M$ 是二维无边可定向流形。\eqref{12.41} 写成`}</Tx>
        <Eq n="12.42a" keyEq title="Gauss–Bonnet 定理" say={R`二维时 Euler 类是曲率二形式 $\mathcal{R}_{12}=K\,\dd A$ 除以 $2\pi$：总 Gauss 曲率等于 $2\pi\chi$，无论曲面怎样变形。`}>{R`\chi(M)=\frac1{4\pi}\int_M\epsilon^{\alpha\beta}\mathcal{R}_{\alpha\beta}=\frac1{2\pi}\int_M\mathcal{R}_{12}`}</Eq>
        <Tx>{R`这就是著名的 **Gauss–Bonnet 定理**。在正交标架下 $\mathcal{R}_{12}=K\,\hat\theta^1\wedge\hat\theta^2=K\,\dd A$（$K$ 为 Gauss 曲率），所以 \eqref{12.42a} 就是 $\frac1{2\pi}\int_MK\,\dd A=\chi(M)=2-2g$。$\dim M=4$ 时它写成`}</Tx>
        <Eq n="12.42b" say={R`四维的 Gauss–Bonnet–陈公式：Euler 示性数等于曲率二形式 Pfaff 式的积分。`}>{R`\chi(M)=\frac1{32\pi^2}\int_M\epsilon^{\alpha\beta\gamma\delta}\mathcal{R}_{\alpha\beta}\wedge\mathcal{R}_{\gamma\delta}.`}</Eq>
        <Derivation title={R`系数 $1/4\pi$ 与 $1/32\pi^2$ 从哪里来`} collapsed steps={[
          { tex: R`e(TM)=\mathrm{Pf}\Big(\frac{\mathcal{R}}{2\pi}\Big),\qquad\mathrm{Pf}(A)=\frac{1}{2^ll!}\epsilon^{\alpha_1\cdots\alpha_{2l}}A_{\alpha_1\alpha_2}\cdots A_{\alpha_{2l-1}\alpha_{2l}}`, why: R`Euler 类是曲率二形式（正交标架）的 Pfaff 式（第 11 章，\sref{F:pfaffian}）。` },
          { tex: R`l=1:\ \frac{1}{2}\cdot\frac1{2\pi}\epsilon^{\alpha\beta}\mathcal{R}_{\alpha\beta}=\frac1{4\pi}(\mathcal{R}_{12}-\mathcal{R}_{21})=\frac1{2\pi}\mathcal{R}_{12}`, why: R`$\mathcal{R}_{\alpha\beta}$ 反对称。` },
          { tex: R`l=2:\ \frac{1}{2^2\cdot2!}\cdot\frac{1}{(2\pi)^2}\epsilon^{\alpha\beta\gamma\delta}\mathcal{R}_{\alpha\beta}\wedge\mathcal{R}_{\gamma\delta}=\frac1{32\pi^2}\epsilon^{\alpha\beta\gamma\delta}\mathcal{R}_{\alpha\beta}\wedge\mathcal{R}_{\gamma\delta}`, why: R`$8\times4\pi^2=32\pi^2$。` },
        ]} />
        <GaussBonnetLab />
      </Box>
    </Sec>);
}
