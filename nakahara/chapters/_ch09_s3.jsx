// §9.3 向量丛 —— 式 (9.20)–(9.40)，例 9.3–9.6，习题 9.1
import { Sec, Sub, Tx, Eq, Box, Exercise, Derivation, C } from "@kit";
import { cd } from "./_ch09_s1.jsx";

const R = String.raw;

export function Sec93() {
  return (
    <Sec n="9.3" title="Vector bundles" zh="向量丛"
      gist={R`纤维是向量空间 $\R^k$（$\C^k$）、结构群 $\mathrm{GL}(k,\R)$（$\mathrm{GL}(k,\C)$）的丛 → 例：切丛与 $TS^2$ 的转移函数 \eqref{9.23}、法丛、线丛、$\CP^n$ 上的典范线丛、单极子周围的波函数 → 标架 ↔ 局部平凡化，换标架时分量用逆矩阵（\eqref{9.29}）→ 余切丛与对偶丛 → 截面的线性结构、零截面、纤维度规 → 乘积丛、Whitney 和（\eqref{9.37}）、张量积丛与 $\Lambda^r$。`}
      why={R`物理中的场大多取值于向量空间：向量场、一形式、多分量波函数、Dirac 旋量。向量丛让我们在每一点做线性代数，同时把"不同点的向量空间怎样粘起来"这一拓扑信息保留在转移函数里。`}
      gives={["9.21", "9.23", "9.25", "9.27", "9.29", "9.31", "9.33a", "9.37", "9.39"]}>
      <p className="muted">本节概念：<C id="vector_bundle" /> · <C id="frame" /> · <C id="bundle_algebra" /></p>

      <Sub n="9.3.1" title="Definitions and examples" zh="定义与例子">
        <Tx>{R`**向量丛**（vector bundle）$E\xrightarrow{\pi}M$ 是纤维为向量空间的纤维丛。设 $F=\R^k$，$M$ 是 $m$ 维流形。通常称 $k$ 为**纤维维数**（fibre dimension），记作 $\dim E$，尽管全空间 $E$ 是 $m+k$ 维的。转移函数属于 $\mathrm{GL}(k,\R)$，因为它把一个向量空间同构地映到同维数的另一个向量空间上。若 $F$ 是复向量空间 $\C^k$，结构群就是 $\mathrm{GL}(k,\C)$。`}</Tx>
        <Box kind="example" n="9.3" title={R`切丛 $TM$ 与 $TS^2$`}>
          <Tx>{R`$m$ 维流形 $M$ 上的切丛 $TM$ 是典型纤维为 $\R^m$ 的向量丛，见 §9.1。设 $u\in TM$，$\pi(u)=p\in U_i\cap U_j$，$\{U_i\}$ 覆盖 $M$。设 $x^\mu=\varphi_i(p)$（$y^\mu=\varphi_j(p)$）是 $U_i$（$U_j$）上的坐标系。与 $u$ 对应的向量 $V$ 写成 $V=V^\mu\partial/\partial x^\mu|_p=\tilde V^\mu\partial/\partial y^\mu|_p$。局部平凡化为`}</Tx>
          <Eq n="9.20" say={R`切丛的局部平凡化：把向量读成它在该卡坐标基下的分量。`}>{R`\phi_i^{-1}(u)=(p,\{V^\mu\})\qquad\phi_j^{-1}(u)=(p,\{\tilde V^\mu\}).`}</Eq>
          <Tx>{R`纤维坐标 $\{V^\mu\}$ 与 $\{\tilde V^\mu\}$ 的关系是`}</Tx>
          <Eq n="9.21" title="切丛的转移函数" say={R`切丛的转移函数 $t_{ij}$ 就是坐标变换的 Jacobi 矩阵 $\partial x^\mu/\partial y^\nu$：把 $j$ 卡的分量换算成 $i$ 卡的分量。`}>{R`V^\mu=\sym{Gmat}{G}^\mu{}_\nu(p)\tilde V^\nu`}</Eq>
          <Tx>{R`其中 $\{\sym{Gmat}{G}^\mu{}_\nu(p)\}=\{(\partial x^\mu/\partial y^\nu)_p\}\in\mathrm{GL}(m,\R)$。因此切丛是 $(TM,\pi,M,\R^m,\mathrm{GL}(m,\R))$。$TM$ 的截面就是 $M$ 上的向量场：$\mathcal{X}(M)=\Gamma(M,TM)$。

为具体起见，我们来算 $TS^2$。取开覆盖 $U_{\rm N}\equiv S^2-\{\text{南极}\}$、$U_{\rm S}\equiv S^2-\{\text{北极}\}$。设 $(X,Y)$ 与 $(U,V)$ 分别是相应的球极投影坐标（例 8.1）。它们的关系是`}</Tx>
          <Eq n="9.22" say={R`北极投影坐标与南极投影坐标互为单位圆的反演（$V$ 轴反向）：$U+\mathrm{i}V=1/(X+\mathrm{i}Y)$。`}>{R`U=X/(X^2+Y^2)\qquad V=-Y/(X^2+Y^2).`}</Eq>
          <Tx>{R`取 $u\in TS^2$，$\pi(u)=p\in U_{\rm N}\cap U_{\rm S}$。设 $\phi_{\rm N}$、$\phi_{\rm S}$ 是相应的局部平凡化，$\phi_{\rm N}^{-1}(u)=(p,V^\mu_{\rm N})$，$\phi_{\rm S}^{-1}(u)=(p,V^\mu_{\rm S})$。转移函数是`}</Tx>
          <Eq n="9.23" keyEq title={R`$TS^2$ 的转移函数`} say={R`在两极投影卡的重叠处，切向量分量被转动一个依赖于 $2\theta$ 的角度再缩放 $1/r^2$：绕赤道一圈，这个转动转了两整圈——$TS^2$ 扭曲的来源。`}>{R`t_{\rm SN}(p)=\frac{\partial(U,V)}{\partial(X,Y)}=\frac{1}{r^2}\begin{pmatrix}-\cos2\theta&-\sin2\theta\\ \sin2\theta&-\cos2\theta\end{pmatrix}`}</Eq>
          <Tx>{R`这里令 $X=r\cos\theta$、$Y=r\sin\theta$。切向量分量的变换由 $\{V^\mu_i\}$ 的一个角度为 $2\theta$ 的转动和随后的缩放组成。读者应验证 $t_{\rm NS}(p)=t_{\rm SN}(p)^{-1}$。`}</Tx>
          <Derivation title={R`计算 \eqref{9.23} 并验证 $t_{\rm NS}=t_{\rm SN}^{-1}$`} collapsed steps={[
            { tex: R`\frac{\partial U}{\partial X}=\frac{Y^2-X^2}{r^4}=-\frac{\cos2\theta}{r^2},\quad\frac{\partial U}{\partial Y}=-\frac{2XY}{r^4}=-\frac{\sin2\theta}{r^2}`, why: R`对 $U=X/r^2$ 求导，$r^2=X^2+Y^2$；$X^2-Y^2=r^2\cos2\theta$，$2XY=r^2\sin2\theta$。` },
            { tex: R`\frac{\partial V}{\partial X}=\frac{2XY}{r^4}=\frac{\sin2\theta}{r^2},\quad\frac{\partial V}{\partial Y}=-\frac{X^2-Y^2}{r^4}=-\frac{\cos2\theta}{r^2}`, why: R`对 $V=-Y/r^2$ 求导。这就给出 \eqref{9.23}。` },
            { tex: R`t_{\rm SN}=\frac1{r^2}\begin{pmatrix}\cos(\pi-2\theta)&-\sin(\pi-2\theta)\\ \sin(\pi-2\theta)&\cos(\pi-2\theta)\end{pmatrix},\qquad\det t_{\rm SN}=\frac1{r^4}>0`, why: R`精确地说，它是转角 $\pi-2\theta$ 的转动乘以 $1/r^2$（原书"转动角度 $2\theta$"指转角随 $2\theta$ 变化）。行列式为正：两张卡定向一致。` },
            { tex: R`X=\frac{U}{U^2+V^2},\quad Y=\frac{-V}{U^2+V^2}`, why: R`\eqref{9.22} 的逆变换形式完全对称（反演是对合），只是 $(U,V)=\rho(\cos\theta',\sin\theta')$ 中 $\rho=1/r$、$\theta'=-\theta$。` },
            { tex: R`t_{\rm NS}=\frac{\partial(X,Y)}{\partial(U,V)}=r^2\begin{pmatrix}-\cos2\theta&\sin2\theta\\ -\sin2\theta&-\cos2\theta\end{pmatrix}`, why: R`把 \eqref{9.23} 中的 $r\to1/r$、$\theta\to-\theta$。` },
            { tex: R`t_{\rm NS}\,t_{\rm SN}=\begin{pmatrix}\cos^22\theta+\sin^22\theta&\cos2\theta\sin2\theta-\sin2\theta\cos2\theta\\ \sin2\theta\cos2\theta-\cos2\theta\sin2\theta&\sin^22\theta+\cos^22\theta\end{pmatrix}=I_2`, why: R`直接相乘，$r^2\cdot r^{-2}=1$。交互图 3 用数值 Jacobi 矩阵独立核对这一结果，并用第三张卡验证余循环条件。` },
          ]} />
          <Box kind="physics" title={R`$TS^2$ 为什么不平凡：转移函数的卷绕数是 2`}>{R`在赤道 $r=1$ 上，$t_{\rm SN}$ 是转角 $\pi-2\theta$ 的转动，当 $\theta$ 绕赤道一圈（$0\to2\pi$）时，它在 $\mathrm{SO}(2)$ 中绕了 $-2$ 圈。若 $TS^2$ 平凡，由 \eqref{9.10} 应有 $t_{\rm SN}=g_{\rm S}^{-1}g_{\rm N}$，而 $g_{\rm N}$、$g_{\rm S}$ 定义在可缩的半球上，限制到赤道时卷绕数为零（取值于 $\mathrm{GL}^+(2,\R)\simeq\mathrm{SO}(2)$），于是 $t_{\rm SN}$ 的卷绕数也应为零——矛盾。卷绕数的绝对值 $2$ 恰好是 $S^2$ 的 Euler 示性数 $\chi(S^2)=2$，这是第 11 章的主题。`}</Box>
        </Box>
        <Box kind="example" n="9.4" title={R`法丛与线丛`}>
          <Tx>{R`设 $M$ 是嵌入在 $\R^{m+k}$ 中的 $m$ 维流形。令 $N_pM$ 是 $\R^{m+k}$ 中与 $T_pM$ 正交的向量空间：对任意 $U\in N_pM$、$V\in T_pM$，在 $\R^{m+k}$ 的欧氏度规下 $U\cdot V=0$。向量空间 $N_pM$ 同构于 $\R^k$。**法丛**（normal bundle）

$$NM\equiv\bigcup_{p\in M}N_pM$$

是典型纤维为 $\R^k$ 的向量丛。

考虑嵌入在 $\R^3$ 中的球面 $S^2$。法丛 $NS^2$ 可以想象成表面被直线垂直刺穿的 $S^2$。$NS^2$ 是平凡丛 $S^2\times\R$（单位外法向量 $\boldsymbol{n}(p)=p$ 就是处处非零的整体截面）。

纤维是一维的（$F=\R$ 或 $\C$）向量丛称为**线丛**（line bundle）。圆柱 $S^1\times\R$ 是平凡的 $\R$ 线丛；Möbius 带也是实线丛。结构群 $\mathrm{GL}(1,\R)=\R-\{0\}$ 或 $\mathrm{GL}(1,\C)=\C-\{0\}$ 是交换群。`}</Tx>
        </Box>
        <Tx>{R`下面常常要用到**典范线丛**（canonical line bundle）$L$。回忆 $\CP^n$ 的元素 $p$ 是 $\C^{n+1}$ 中过原点的一条复直线（例 8.3）。$L$ 的纤维 $\pi^{-1}(p)$ 就定义为属于 $p$ 的那条直线。更形式地，设 $I^{n+1}\equiv\CP^n\times\C^{n+1}$ 是 $\CP^n$ 上的平凡丛。把 $I^{n+1}$ 的元素写成 $(p,v)$，$p\in\CP^n$，$v\in\C^{n+1}$，则 $L$ 定义为

$$L\equiv\{(p,v)\in I^{n+1}\mid v=ap,\ a\in\C\}.$$

（这里 $p$ 也表示这条直线的一个代表向量。）投影是 $(p,v)\xrightarrow{\pi}p$。`}</Tx>
        <Box kind="example" n="9.5" title="量子力学波函数是线丛的截面">
          <Tx>{R`（平凡的）复线丛 $L=\R^3\times\C$ 与 $\R^3$ 上的非相对论量子力学相伴：波函数 $\psi(x)$ 不过是 $L$ 的截面。

考虑 §1.9 研究过的磁单极场中的波函数 $\psi(\boldsymbol{x})$。单极位于原点时，$\psi(\boldsymbol{x})$ 定义在 $\R^3-\{\boldsymbol{0}\}$ 上，我们得到 $\R^3-\{\boldsymbol{0}\}$ 上的复线丛。如果只关心包围单极的 $S^2$ 上的波函数，就得到 $S^2$ 上的复线丛。注意 $S^2$ 是 $\R^3-\{\boldsymbol{0}\}$ 的形变收缩核（所以由同伦公理，两种看法给出本质上相同的丛分类）。`}</Tx>
        </Box>
      </Sub>

      <Sub n="9.3.2" title="Frames" zh="标架">
        <Tx>{R`在切丛 $TM$ 上，卡 $U_i$ 上的坐标系 $x^\mu$ 给每根纤维一个自然的基 $\{\partial/\partial x^\mu\}$。若 $M$ 有度规，也可以用正交归一基 $\{\hat e_\alpha\}$。$\partial/\partial x^\mu$ 或 $\hat e_\alpha$ 是 $U_i$ 上的向量场，集合 $\{\partial/\partial x^\mu\}$ 或 $\{\hat e_\alpha\}$ 在 $U_i$ 上构成线性无关的向量场。在 $U_i$ 上总能选出 $m$ 个线性无关的切向量场，但在整个 $M$ 上未必能做到。按定义，基向量的分量是

$$\partial/\partial x^\mu=(0,\ldots,0,\underset{\mu}{1},0,\ldots,0)\qquad\text{或}\qquad\hat e_\alpha=(0,\ldots,0,\underset{\alpha}{1},0,\ldots,0).$$

这些向量在 $U_i$ 上定义了一个（局部）**标架**（frame），见下文。

设 $E\xrightarrow{\pi}M$ 是纤维为 $\R^k$（或 $\C^k$）的向量丛。在卡 $U_i$ 上，$\pi^{-1}(U_i)$ 是平凡的，$\pi^{-1}(U_i)\cong U_i\times\R^k$，我们可以在 $U_i$ 上选 $k$ 个线性无关的截面 $\{e_1(p),\ldots,e_k(p)\}$。称这些截面在 $U_i$ 上定义了一个**标架**。给定 $U_i$ 上的标架，就有自然的映射 $F_p\to F$（$=\R^k$ 或 $\C^k$）：`}</Tx>
        <Eq n="9.24" say={R`有了一组局部基（标架），纤维中的向量就能读成一组数——它在这组基下的分量。`}>{R`V=V^\alpha e_\alpha(p)\longmapsto\{V^\alpha\}\in F.`}</Eq>
        <Tx>{R`局部平凡化是`}</Tx>
        <Eq n="9.25" say={R`标架给出的局部平凡化：把纤维中的向量写成"底空间点 + 分量"。`}>{R`\phi_i^{-1}(V)=(p,\{V^\alpha(p)\}).`}</Eq>
        <Tx>{R`按定义有`}</Tx>
        <Eq n="9.26" say={R`反过来，局部平凡化把第 $\alpha$ 个标准基向量送到第 $\alpha$ 个标架向量：标架 = 局部平凡化下"常值的标准基截面"。`}>{R`\phi_i(p,\{0,\ldots,0,\underset{\alpha}{1},0,\ldots,0\})=e_\alpha(p).`}</Eq>
        <Tx>{R`设 $U_i\cap U_j\neq\emptyset$，考虑标架的变换。$U_i$ 上有标架 $\{e_1(p),\ldots,e_k(p)\}$，$U_j$ 上有标架 $\{\tilde e_1(p),\ldots,\tilde e_k(p)\}$，$p\in U_i\cap U_j$。向量 $\tilde e_\beta(p)$ 可以表示为`}</Tx>
        <Eq n="9.27" title="换标架" say={R`新标架的每个向量是旧标架的线性组合，组合系数排成可逆矩阵 $G(p)$。`}>{R`\tilde e_\beta(p)=e_\alpha(p)\sym{Gmat}{G}(p)^\alpha{}_\beta`}</Eq>
        <Tx>{R`其中 $\sym{Gmat}{G}(p)^\alpha{}_\beta\in\mathrm{GL}(k,\R)$ 或 $\mathrm{GL}(k,\C)$。任意向量 $V\in\pi^{-1}(p)$ 可以写成`}</Tx>
        <Eq n="9.28" say={R`同一个纤维向量在两组标架下的展开。`}>{R`V=V^\alpha e_\alpha(p)=\tilde V^\alpha\tilde e_\alpha(p).`}</Eq>
        <Tx>{R`由 \eqref{9.27} 与 \eqref{9.28} 得到`}</Tx>
        <Eq n="9.29" title="分量反变" say={R`基向量用 $G$ 变换，分量就用 $G^{-1}$ 变换，二者抵消使向量本身不变——"反变"的由来。`}>{R`\tilde V^\beta=\sym{Gmat}{G}^{-1}(p)^\beta{}_\alpha V^\alpha`}</Eq>
        <Derivation title={R`由 \eqref{9.27}、\eqref{9.28} 推出 \eqref{9.29}`} collapsed steps={[
          { tex: R`V=\tilde V^\beta\tilde e_\beta=\tilde V^\beta e_\alpha G^\alpha{}_\beta`, why: R`把 \eqref{9.27} 代入 \eqref{9.28} 的右边。` },
          { tex: R`V^\alpha=G^\alpha{}_\beta\tilde V^\beta`, why: R`$\{e_\alpha\}$ 线性无关，比较 $e_\alpha$ 的系数。` },
          { tex: R`\tilde V^\beta=(G^{-1})^\beta{}_\alpha V^\alpha`, why: R`两边左乘 $G^{-1}$。所以从 $U_i$ 的纤维坐标到 $U_j$ 的纤维坐标的转移函数 $t_{ji}=G^{-1}$，反方向 $t_{ij}=G$。` },
        ]} />
        <Tx>{R`其中 $\sym{Gmat}{G}^{-1}(p)^\beta{}_\alpha\sym{Gmat}{G}(p)^\alpha{}_\gamma=\sym{Gmat}{G}(p)^\beta{}_\alpha\sym{Gmat}{G}^{-1}(p)^\alpha{}_\gamma=\delta^\beta{}_\gamma$。于是转移函数 $t_{ji}(p)$ 由矩阵 $\sym{Gmat}{G}^{-1}(p)$ 给出。`}</Tx>
      </Sub>

      <Sub n="9.3.3" title="Cotangent bundles and dual bundles" zh="余切丛与对偶丛">
        <Tx>{R`**余切丛**（cotangent bundle）$T^*M\equiv\bigcup_{p\in M}T^*_pM$ 的定义与切丛类似。在坐标为 $x^\mu$ 的卡 $U_i$ 上，$T^*_pM$ 的基取为与 $\{\partial/\partial x^\mu\}$ 对偶的 $\{\dd x^1,\ldots,\dd x^m\}$。设 $y^\mu$ 是 $U_j$ 的坐标，$U_i\cap U_j\neq\emptyset$。对 $p\in U_i\cap U_j$ 有变换`}</Tx>
        <Eq n="9.30" say={R`坐标微分的链式法则：新坐标的微分是旧坐标微分的线性组合。`}>{R`\dd y^\mu=\dd x^\nu\left(\frac{\partial y^\mu}{\partial x^\nu}\right)_p.`}</Eq>
        <Tx>{R`一形式 $\omega$ 在两个坐标系中分别写成

$$\omega=\omega_\mu\,\dd x^\mu=\tilde\omega_\mu\,\dd y^\mu,$$

由此得到`}</Tx>
        <Eq n="9.31" title="余切丛的转移函数" say={R`一形式的分量用 $\partial x/\partial y$ 变换——与向量分量的变换矩阵互为逆转置，所以 $\omega_\mu V^\mu$ 与坐标无关。`}>{R`\tilde\omega_\mu=\sym{Gmat}{G}_\mu{}^\nu(p)\omega_\nu`}</Eq>
        <Tx>{R`其中 $\sym{Gmat}{G}_\mu{}^\nu(p)\equiv(\partial x^\nu/\partial y^\mu)_p$ 对应于转移函数 $t_{ji}(p)$。注意 $\Gamma(M,T^*M)=\Omega^1(M)$。

这个余切丛很容易推广到更一般的情形。给定纤维为 $F$ 的向量丛 $E\xrightarrow{\pi}M$，可以定义它的**对偶丛**（dual bundle）$E^*\xrightarrow{\pi}M$。$E^*$ 的纤维 $F^*$ 是从 $F$ 到 $\R$（或 $\C$）的线性映射的集合。给定 $F_p$ 的一般基 $\{e_\alpha(p)\}$，由 $\langle\theta^\alpha(p),e_\beta(p)\rangle=\delta^\alpha{}_\beta$ 定义 $F^*_p$ 的对偶基 $\{\theta^\alpha(p)\}$。（若 $E$ 的转移函数是矩阵 $t_{ij}$，则 $E^*$ 的转移函数是逆转置 $(t_{ij}^{\mathrm t})^{-1}$，这正是 \eqref{9.31} 与 \eqref{9.21} 的关系。）`}</Tx>
      </Sub>

      <Sub n="9.3.4" title="Sections of vector bundles" zh="向量丛的截面">
        <Tx>{R`设 $s$ 与 $s'$ 是向量丛 $E\xrightarrow{\pi}M$ 的截面。向量加法与数乘逐点定义为`}</Tx>
        <Eq n="9.32a" say={R`两个截面逐点相加仍是截面。`}>{R`(s+s')(p)=s(p)+s'(p)`}</Eq>
        <Eq n="9.32b" say={R`截面可以乘以函数（不只是常数）：截面全体构成函数环上的模。`}>{R`(fs)(p)=f(p)s(p)`}</Eq>
        <Tx>{R`其中 $p\in M$，$f\in\mathcal{F}(M)$。每根纤维的零向量 $0$ 在 $\mathrm{GL}(k,\R)$（或 $\mathrm{GL}(k,\C)$）下不变，扮演特殊的角色。任何向量丛 $E$ 都容许一个整体截面，称为**零截面**（null section）$s_0\in\Gamma(M,E)$，在任何局部平凡化下都有 $\phi_i^{-1}(s_0(p))=(p,0)$。

**典范线丛的截面。**例如考虑 $\CP^n$ 上典范线丛 $L$ 的截面。设 $\xi^\nu_{(\mu)}$ 是 $U_\mu$ 上的非齐次坐标，$\{z^\nu\}$ 是齐次坐标。$U_\mu$ 上的局部截面 $s_\mu$ 形如

$$s_\mu=\{\xi^0_{(\mu)},\ldots,1,\ldots,\xi^n_{(\mu)}\}\in\C^{n+1}.$$

从一个坐标系到另一个的变换是数乘：$s_\nu=(z^\mu/z^\nu)s_\mu$。设 $L^*$ 是 $L$ 的对偶丛。与 $s_\mu$ 对应，可以选对偶截面 $s^*_\mu$，使 $s^*_\mu(s_\mu)=1$。由此求得 $s^*_\mu$ 的转移函数是乘以 $z^\nu/z^\mu$：$s^*_\nu=(z^\nu/z^\mu)s^*_\mu$。`}</Tx>
        <Derivation title="典范线丛截面的变换律" collapsed steps={[
          { tex: R`\xi^\lambda_{(\mu)}=z^\lambda/z^\mu,\qquad s_\mu=\frac{1}{z^\mu}(z^0,\ldots,z^n)`, why: R`非齐次坐标的定义（第 8 章）；$s_\mu$ 的第 $\mu$ 个分量为 1。它确实在直线 $p$ 上，所以是 $L$ 的截面。` },
          { tex: R`s_\nu=\frac1{z^\nu}(z^0,\ldots,z^n)=\frac{z^\mu}{z^\nu}s_\mu`, why: R`在 $U_\mu\cap U_\nu$ 上（$z^\mu,z^\nu\neq0$）比较。比值 $z^\mu/z^\nu$ 只依赖于 $p$（齐次坐标同乘一个数不变）。` },
          { tex: R`1=s^*_\nu(s_\nu)=s^*_\nu\!\left(\frac{z^\mu}{z^\nu}s_\mu\right)\ \Rightarrow\ s^*_\nu=\frac{z^\nu}{z^\mu}s^*_\mu`, why: R`$s^*_\nu$ 是线性的；与 $s^*_\mu(s_\mu)=1$ 比较。对偶丛的转移函数是原丛的倒数。` },
        ]} />
        <Tx>{R`**纤维度规。****纤维度规**（fibre metric）$h_{\mu\nu}(p)$ 也是逐点定义的。设 $s$、$s'$ 是 $U_i$ 上的截面。若纤维是 $\R^k$，$s$ 与 $s'$ 在 $p$ 点的内积定义为`}</Tx>
        <Eq n="9.33a" say={R`实向量丛上逐点给出的内积：每根纤维各有一个对称正定矩阵 $h_{\mu\nu}(p)$。`}>{R`(s,s')_p=h_{\mu\nu}(p)s^\mu(p)s'^\nu(p)`}</Eq>
        <Tx>{R`若纤维是 $\C^k$，则定义`}</Tx>
        <Eq n="9.33b" say={R`复向量丛的纤维度规是 Hermite 内积：第一个截面取复共轭。`}>{R`(s,s')_p=h_{\mu\nu}(p)\overline{s^\mu(p)}s'^\nu(p).`}</Eq>
        <Tx>{R`关于这个主题在 §10.4 中还有更多讨论。`}</Tx>
      </Sub>

      <Sub n="9.3.5" title="The product bundle and Whitney sum bundle" zh="乘积丛与 Whitney 和丛">
        <Tx>{R`设 $E\xrightarrow{\pi}M$ 与 $E'\xrightarrow{\pi'}M'$ 是向量丛，纤维分别为 $F$ 与 $F'$。**乘积丛**（product bundle）`}</Tx>
        <Eq n="9.34" say={R`两个丛的直积是乘积底空间 $M\times M'$ 上的丛，纤维是两根纤维的直和。`}>{R`E\times E'\xrightarrow{\pi\times\pi'}M\times M'`}</Eq>
        <Tx>{R`是典型纤维为 $F\oplus F'$ 的纤维丛。［$F\oplus F'$ 中的向量写成 $\begin{pmatrix}V\\ W\end{pmatrix}$，$V\in F$，$W\in F'$。向量加法与数乘定义为

$$\begin{pmatrix}V\\ W\end{pmatrix}+\begin{pmatrix}V'\\ W'\end{pmatrix}=\begin{pmatrix}V+V'\\ W+W'\end{pmatrix}\qquad\text{与}\qquad\lambda\begin{pmatrix}V\\ W\end{pmatrix}=\begin{pmatrix}\lambda V\\ \lambda W\end{pmatrix}.$$

设 $\{e_\alpha\}$ 与 $\{f_\beta\}$ 分别是 $F$ 与 $F'$ 的基，则 $\{e_\alpha\}\cup\{f_\beta\}$ 是 $F\oplus F'$ 的基，$\dim(F\oplus F')=\dim F+\dim F'$。］若 $\pi(u)=p$、$\pi'(u')=p'$，投影 $\pi\times\pi'$ 对 $(u,u')\in E\times E'$ 的作用是`}</Tx>
        <Eq n="9.35" say={R`乘积丛的投影：分别投影两个分量。`}>{R`\pi\times\pi'(u,u')=(p,p').`}</Eq>
        <Tx>{R`$(p,p')$ 处的纤维是 $F_p\oplus F'_{p'}$。例如若 $M=M_1\times M_2$，则 $TM=TM_1\times TM_2$。

设 $E\xrightarrow{\pi}M$ 与 $E'\xrightarrow{\pi'}M$ 是**同一个**底空间上的向量丛，纤维分别为 $F$、$F'$。**Whitney 和丛**（Whitney sum bundle）$E\oplus E'$ 是 $E\times E'$ 被 $f:M\to M\times M$，$f(p)=(p,p)$ 拉回所得的丛：`}</Tx>
        <Eq n="9.36" say={R`Whitney 和：把乘积丛沿对角映射 $p\mapsto(p,p)$ 拉回，于是只保留"两根纤维在同一点上"的那些配对。`}>{cd(R`E\oplus E'`, R`\pi_2`, R`E\times E'`, R`\pi_1`, R`\pi\times\pi'`, R`M`, R`f`, R`M\times M.`)}</Eq>
        <Tx>{R`因此 $E\oplus E'=\{(u,u')\in E\times E'\mid\pi\times\pi'(u,u')=(p,p)\}$。Whitney 和丛的纤维是 $F\oplus F'$：$(\pi\times\pi')^{-1}(p)$ 同构于 $\pi^{-1}(p)\oplus\pi'^{-1}(p)=F_p\oplus F'_p$。简言之，$E\oplus E'$ 是 $M$ 上在 $p$ 处纤维为 $F_p\oplus F'_p$ 的丛。设 $\{U_i\}$ 是 $M$ 的开覆盖，$\{t^E_{ij}\}$ 与 $\{t^{E'}_{ij}\}$ 分别是 $E$ 与 $E'$ 的转移函数。则 $E\oplus E'$ 的转移函数 $T_{ij}$ 是 $(\dim F+\dim F')\times(\dim F+\dim F')$ 矩阵`}</Tx>
        <Eq n="9.37" keyEq title="Whitney 和的转移函数" say={R`直和丛的粘合规则是分块对角的：两部分各按各的转移函数换算，互不混合。`}>{R`T_{ij}(p)=\begin{pmatrix}t^E_{ij}(p)&0\\ 0&t^{E'}_{ij}(p)\end{pmatrix}`}</Eq>
        <Tx>{R`它从左边作用在 $F\oplus F'$ 上。（这与 \eqref{9.18} 一致：乘积丛在 $U_i\times U_j$ 上的转移函数是 $\mathrm{diag}(t^E,t^{E'})$，沿对角映射拉回就是 \eqref{9.37}。）`}</Tx>
        <Box kind="example" n="9.6" title={R`$TS^2\oplus NS^2=S^2\times\R^3$`}>
          <Tx>{R`设 $E=TS^2$，$E'=NS^2$（$S^2$ 嵌入在 $\R^3$ 中）。取 $u\in TS^2$、$v\in NS^2$，局部平凡化分别为 $\phi_i^{-1}(u)=(p,V)$、$\psi_i^{-1}(v)=(q,W)$，其中 $p,q\in S^2$，$V\in\R^2$，$W\in\R$。若 $(u,v)$ 是乘积丛 $E\times E'$ 的点，就有平凡化 $\Phi_{i,j}=\phi_i\times\psi_j$，使`}</Tx>
          <Eq n="9.38a" say={R`乘积丛的点：两个底空间点 $p,q$ 可以不同，纤维坐标共 3 个分量。`}>{R`\Phi_{i,j}^{-1}(u,v)=(p,q;V,W).`}</Eq>
          <Tx>{R`但若 $(u,v)\in E\oplus E'$，$u$ 与 $v$ 满足更强的条件 $\pi(u)=\pi'(v)$（$=p$）。于是`}</Tx>
          <Eq n="9.38b" say={R`Whitney 和的点：切向量与法向量必须长在同一点 $p$ 上。`}>{R`\Phi_i^{-1}(u,v)=(p;V,W).`}</Eq>
          <Tx>{R`$S^2$ 嵌入在 $\R^3$ 中时，Whitney 和 $TS^2\oplus NS^2$ 是 $S^2$ 上的平凡丛，纤维同构于 $\R^3$。（原因：$T_pS^2\oplus N_pS^2=T_p\R^3=\R^3$，$\R^3$ 的标准基 $\boldsymbol{e}_x,\boldsymbol{e}_y,\boldsymbol{e}_z$ 在每一点分解为切向与法向部分之和，给出 $TS^2\oplus NS^2$ 的整体标架；由\sref{C9.2} 它平凡。可见两个丛的和平凡，不意味着各自平凡：$TS^2$ 并不平凡。）`}</Tx>
        </Box>
      </Sub>

      <Sub n="9.3.6" title="Tensor product bundles" zh="张量积丛">
        <Tx>{R`设 $E\xrightarrow{\pi}M$ 与 $E'\xrightarrow{\pi'}M$ 是 $M$ 上的向量丛。**张量积丛**（tensor product bundle）$E\otimes E'$ 是在每一点 $p\in M$ 放上纤维的张量积 $F_p\otimes F'_p$ 所得的丛。若 $\{e_\alpha\}$ 与 $\{f_\beta\}$ 是 $F$ 与 $F'$ 的基，$F\otimes F'$ 由 $\{e_\alpha\otimes f_\beta\}$ 张成，因此 $\dim(E\otimes E')=\dim E\times\dim E'$。（其转移函数是 Kronecker 积 $t^E_{ij}\otimes t^{E'}_{ij}$，矩阵元为 $(t^E_{ij})^\alpha{}_\gamma(t^{E'}_{ij})^\beta{}_\delta$。）

设 $\bigotimes^rE\equiv E\otimes\cdots\otimes E$ 是 $r$ 个 $E$ 的张量积丛。若 $\{e_\alpha\}$ 是 $E$ 的纤维 $F$ 的基，$\bigotimes^rE$ 的纤维由 $\{e_{\alpha_1}\otimes\cdots\otimes e_{\alpha_r}\}$ 张成。若定义 $\wedge$ 为`}</Tx>
        <Eq n="9.39" say={R`楔积是张量积的反对称部分：交换两个因子变号。`}>{R`e_\alpha\wedge e_\beta\equiv e_\alpha\otimes e_\beta-e_\beta\otimes e_\alpha`}</Eq>
        <Tx>{R`就得到由 $\{e_{\alpha_1}\wedge\ldots\wedge e_{\alpha_r}\}$ 张成的全反对称张量丛 $\wedge^r(E)$。特别地，$M$ 上 $r$ 形式的空间 $\Omega^r(M)$ 等同于 $\Gamma(M,\Lambda^r(T^*M))$。`}</Tx>
        <Tx>{R`**张量积对 Whitney 和的分配律**（习题 9.1）：`}</Tx>
        <Eq n="9.40" say={R`张量积对直和分配：逐点就是线性代数里的 $A\otimes(B\oplus C)=(A\otimes B)\oplus(A\otimes C)$。`}>{R`E_1\otimes(E_2\oplus E_3)=(E_1\otimes E_2)\oplus(E_1\otimes E_3).`}</Eq>
        <Exercise n="9.1" title="张量积对 Whitney 和的分配律" level="★"
          hint={R`先在一点上证明纤维的典范同构 $F_1\otimes(F_2\oplus F_3)\cong(F_1\otimes F_2)\oplus(F_1\otimes F_3)$；再说明它与转移函数相容。转移函数用 \eqref{9.37} 与 Kronecker 积表示。`}
          solution={R`**纤维。**在每一点 $p$，映射 $e\otimes(f,g)\mapsto(e\otimes f,\,e\otimes g)$ 是 $F_{1p}\otimes(F_{2p}\oplus F_{3p})\to(F_{1p}\otimes F_{2p})\oplus(F_{1p}\otimes F_{3p})$ 的线性同构：取基 $\{e_\alpha\}$、$\{f_\beta\}$、$\{g_\gamma\}$，左边的基 $\{e_\alpha\otimes(f_\beta,0),\,e_\alpha\otimes(0,g_\gamma)\}$ 被一一映到右边的基 $\{(e_\alpha\otimes f_\beta,0),\,(0,e_\alpha\otimes g_\gamma)\}$；两边维数都是 $k_1(k_2+k_3)$。这个同构不依赖于基的选取（它由张量积的双线性唯一确定），所以逐点拼起来是光滑的丛同构（覆盖 $\mathrm{id}_M$），即 \eqref{9.40} 意义下的等价（\eqref{9.16}）。

**转移函数。**设 $E_1,E_2,E_3$ 在公共覆盖 $\{U_i\}$ 上的转移函数为 $t^{(1)}_{ij},t^{(2)}_{ij},t^{(3)}_{ij}$。由 \eqref{9.37}，$E_2\oplus E_3$ 的转移函数是 $\mathrm{diag}(t^{(2)}_{ij},t^{(3)}_{ij})$；张量积丛的转移函数是 Kronecker 积，所以

$$t^{E_1\otimes(E_2\oplus E_3)}_{ij}=t^{(1)}_{ij}\otimes\begin{pmatrix}t^{(2)}_{ij}&0\\ 0&t^{(3)}_{ij}\end{pmatrix}\cong\begin{pmatrix}t^{(1)}_{ij}\otimes t^{(2)}_{ij}&0\\ 0&t^{(1)}_{ij}\otimes t^{(3)}_{ij}\end{pmatrix},$$

这是 $k_1(k_2+k_3)$ 阶方阵；"$\cong$" 表示按上面的基重新排序（一个与 $p$ 无关的置换矩阵 $Q$ 的共轭）。右边恰是 $(E_1\otimes E_2)\oplus(E_1\otimes E_3)$ 的转移函数，再次验证了 \eqref{9.40}。

**例：**$k_1=k_2=k_3=1$（三个线丛，转移函数为数 $a,b,c$）时，左边是 $a\cdot\mathrm{diag}(b,c)=\mathrm{diag}(ab,ac)$，右边也是 $\mathrm{diag}(ab,ac)$。`}>
          {R`设 $E_1$、$E_2$、$E_3$ 是 $M$ 上的向量丛。证明 $\otimes$ 满足分配律 \eqref{9.40}。用 $E_1$、$E_2$、$E_3$ 的转移函数表示 $E_1\otimes(E_2\oplus E_3)$ 的转移函数。`}
        </Exercise>
        <Box kind="warning" title="勘误：习题 9.1 中的笔误（p.383）">{R`原书习题第二句写作"$E_1\otimes(E_2\oplus F_3)$ 的转移函数"，$F_3$ 应为 $E_3$（题中只有三个丛 $E_1,E_2,E_3$），本站已改正。`}</Box>
      </Sub>
    </Sec>);
}
