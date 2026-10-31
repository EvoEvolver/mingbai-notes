// §9.4 主丛 —— 式 (9.41)–(9.73)，定理 9.2，推论 9.2，例 9.7–9.12，图 9.8–9.9；交互图 2（Hopf 纤维化）
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Proof, Derivation, C } from "@kit";
import { HopfLab } from "./_ch09_demos.jsx";

const R = String.raw;

export function Sec94() {
  return (
    <Sec n="9.4" title="Principal bundles" zh="主丛"
      gist={R`纤维 = 结构群 $G$ 的丛 $P(M,G)$；右作用 $ua=\phi_i(p,g_ia)$ 与平凡化无关、自由且可迁（\eqref{9.41}）→ 截面 ↔ 典范局部平凡化，$s_i=s_jt_{ji}$（\eqref{9.43}）→ 例：单极子丛 $t_{\rm NS}=\mathrm{e}^{\mathrm{i}n\phi}$、瞬子丛（$\pi_3(\mathrm{SU}(2))$）、Hopf 映射 $S^3\to S^2$（$n=1$）与 $S^7\to S^4$、$G\to G/H$ → 相伴丛 $P\times_\rho V$，转移函数 $\rho(t_{ij})$；标架丛 $LM$ 与自旋丛 → 主丛平凡 ⇔ 有整体截面（\sref{T9.2}），向量丛平凡 ⇔ $P(E)$ 有整体截面（\sref{C9.2}）。`}
      why={R`规范场论的基本对象是主丛：规范群 $G$ 就是纤维，规范变换是右作用，规范势（第 10 章的联络）住在主丛上；物质场是相伴丛的截面。主丛也是检验平凡性最干净的场所：只需问"有没有整体截面"。`}
      gives={["9.41", "9.42", "9.43", "9.45", "9.48", "9.51", "9.53a", "9.57", "9.62", "9.63", "9.66", "9.70", "9.71", "9.73"]}>
      <p className="muted">本节概念：<C id="principal_bundle" /> · <C id="monopole_bundle" /> · <C id="hopf" /> · <C id="associated_bundle" /></p>

      <Sub n="9.4.1" title="Definitions" zh="定义">
        <Tx>{R`**主丛**（principal bundle）的纤维 $F$ 与结构群 $G$ 相同。主丛 $P\xrightarrow{\pi}M$ 也记作 $P(M,G)$，常称为 $M$ 上的 **$G$ 丛**（$G$ bundle）。

转移函数照旧从左边作用在纤维上。此外，还可以定义 $G$ 在 $F$ 上**从右边**的作用。设 $\phi_i:U_i\times G\to\pi^{-1}(U_i)$ 是局部平凡化，$\phi_i^{-1}(u)=(p,g_i)$，$u\in\pi^{-1}(U_i)$，$p=\pi(u)$。$G$ 在 $\pi^{-1}(U_i)$ 上的右作用定义为 $\phi_i^{-1}(ua)=(p,g_ia)$，即（\figref{9.8}）`}</Tx>
        <Eq n="9.41" keyEq title="主丛的右作用" say={R`主丛的右作用：在任一局部平凡化里把纤维坐标从右边乘上 $a$；因为转移函数从左边乘，这个操作与选哪张卡无关。`}>{R`ua=\phi_i(p,g_ia)`}</Eq>
        <Tx>{R`对任意 $a\in G$、$u\in\pi^{-1}(p)$ 成立。**右作用与左作用交换**，所以这个定义与局部平凡化无关。事实上，若 $p\in U_i\cap U_j$，

$$ua=\phi_j(p,g_ja)=\phi_j(p,t_{ji}(p)g_ia)=\phi_i(p,g_ia).$$

（第二个等号用 $g_j=t_{ji}(p)g_i$；第三个等号用 \eqref{9.4} 与 \eqref{9.6b}：$\phi_j(p,f)=\phi_i(p,t_{ij}f)$，$t_{ij}t_{ji}=e$。）因此右乘无需借助局部平凡化即有定义，记作 $P\times G\to P$ 或 $(u,a)\mapsto ua$。注意 $\pi(ua)=\pi(u)$。`}</Tx>
        <Figure n="9.8" caption={R`$G$ 在 $P$ 上的右作用。`} width="45%" />
        <Tx>{R`**可迁与自由。**$G$ 在 $\pi^{-1}(p)$ 上的右作用是*可迁的*，因为 $G$ 从右边可迁地作用在 $G$ 上，而 $F_p=\pi^{-1}(p)$ 微分同胚于 $G$。所以对任意 $u_1,u_2\in\pi^{-1}(p)$，存在 $a\in G$ 使 $u_1=u_2a$。于是若 $\pi(u)=p$，整根纤维可以写成 $\pi^{-1}(p)=\{ua\mid a\in G\}$。这个作用还是*自由的*：若对某个 $u\in P$ 有 $ua=u$，则 $a$ 必是 $G$ 的单位元 $e$。事实上，若 $u=\phi_i(p,g_i)$，就有 $\phi_i(p,g_ia)=\phi_i(p,g_i)a=ua=u=\phi_i(p,g_i)$。由于 $\phi_i$ 是双射，必有 $g_ia=g_i$，即 $a=e$。（参见\sref{D5.15}。）

**典范局部平凡化。**给定 $U_i$ 上的截面 $s_i(p)$，按如下方式定义一个优选的局部平凡化 $\phi_i:U_i\times G\to\pi^{-1}(U_i)$：对 $u\in\pi^{-1}(p)$，$p\in U_i$，存在*唯一*的 $g_u\in G$ 使 $u=s_i(p)g_u$（由右作用的自由与可迁）。令 $\phi_i^{-1}(u)=(p,g_u)$。在这个局部平凡化下，截面 $s_i(p)$ 表示为`}</Tx>
        <Eq n="9.42" say={R`在由截面决定的平凡化中，截面本身就是"纤维坐标恒为单位元"的那个点：截面选定了每根纤维的原点。`}>{R`s_i(p)=\phi_i(p,e).`}</Eq>
        <Tx>{R`这个局部平凡化称为**典范局部平凡化**（canonical local trivialization）。由定义 $\phi_i(p,g)=\phi_i(p,e)g=s_i(p)g$。若 $p\in U_i\cap U_j$，两个截面 $s_i(p)$ 与 $s_j(p)$ 由转移函数 $t_{ij}(p)$ 联系如下：`}</Tx>
        <Eq n="9.43" keyEq title="截面的粘合" say={R`两张卡各自选的局部截面（各自的"原点"）相差一个右乘的转移函数：$s_i=s_jt_{ji}$——规范变换在截面上的表现。`}>{R`\begin{aligned}s_i(p)&=\phi_i(p,e)=\phi_j(p,t_{ji}(p)e)=\phi_j(p,t_{ji}(p))\\&=\phi_j(p,e)t_{ji}(p)=s_j(p)t_{ji}(p).\end{aligned}`}</Eq>
        <Box kind="warning" title="勘误：截面的下标（p.384）">{R`原书"Given a section $s_1(p)$ over $U_i$"中的 $s_1$ 应为 $s_i$，本站已改正。`}</Box>

        <Box kind="example" n="9.7" title={R`磁单极：$S^2$ 上的 $\mathrm{U}(1)$ 丛`}>
          <Tx>{R`设 $P$ 是纤维为 $\mathrm{U}(1)=S^1$、底空间为 $S^2$ 的主丛。这个主丛表示**磁单极**（magnetic monopole，§1.9）的拓扑背景。取 $S^2$ 的开覆盖 $\{U_{\rm N},U_{\rm S}\}$，$U_{\rm N}$（$U_{\rm S}$）是北（南）半球。用通常的极角参数化 $S^2$，

$$U_{\rm N}=\{(\theta,\sym{azim}{\phi})\mid0\le\theta\le\pi/2+\varepsilon,\ 0\le\sym{azim}{\phi}<2\pi\}$$
$$U_{\rm S}=\{(\theta,\sym{azim}{\phi})\mid\pi/2-\varepsilon\le\theta\le\pi,\ 0\le\sym{azim}{\phi}<2\pi\}.$$

交集 $U_{\rm N}\cap U_{\rm S}$ 是一条带，本质上就是赤道。设 $\phi_{\rm N}$、$\phi_{\rm S}$ 是局部平凡化：`}</Tx>
          <Eq n="9.44" say={R`两个半球上各自的平凡化：纤维坐标是一个相位 $\mathrm{e}^{\mathrm{i}\alpha}$。`}>{R`\phi_{\rm N}^{-1}(u)=(p,\mathrm{e}^{\mathrm{i}\alpha_{\rm N}})\qquad\phi_{\rm S}^{-1}(u)=(p,\mathrm{e}^{\mathrm{i}\alpha_{\rm S}})`}</Eq>
          <Tx>{R`其中 $p=\pi(u)$。取形如 $\mathrm{e}^{\mathrm{i}n\sym{azim}{\phi}}$ 的转移函数 $t_{\rm NS}(p)$，其中 $n$ 必须是整数，$t_{\rm NS}(p)$ 才能在赤道上单值。由于 $t_{\rm NS}$ 把赤道 $S^1$ 映到 $\mathrm{U}(1)$，这个整数刻画同伦群 $\sym{hgrp}{\pi}_1(\mathrm{U}(1))=\Z$ 的元素。纤维坐标 $\alpha_{\rm N}$ 与 $\alpha_{\rm S}$ 在赤道上的关系为`}</Tx>
          <Eq n="9.45" keyEq title="单极子丛的粘合" say={R`北半球的相位等于南半球的相位再转 $n\phi$：绕赤道一圈，相位多转 $n$ 圈——整数 $n$ 就是磁荷（Dirac 量子化）。`}>{R`\mathrm{e}^{\mathrm{i}\alpha_{\rm N}}=\mathrm{e}^{\mathrm{i}n\sym{azim}{\phi}}\mathrm{e}^{\mathrm{i}\alpha_{\rm S}}.`}</Eq>
          <Tx>{R`若 $n=0$，转移函数是 $\mathrm{U}(1)$ 的单位元，得到平凡丛 $P_0=S^2\times S^1$。若 $n\neq0$，$\mathrm{U}(1)$ 丛 $P_n$ 是扭曲的。**值得注意的是，纤维丛的拓扑结构由一个整数刻画。**这个整数刻画两个局部截面怎样在赤道上粘合，因而对应于同伦群 $\sym{hgrp}{\pi}_1(\mathrm{U}(1))=\Z$ 的元素。

由于 $\mathrm{U}(1)$ 是交换群，右作用与左作用等价。在右作用 $g=\mathrm{e}^{\mathrm{i}\Lambda}$ 下，`}</Tx>
          <Eq n="9.46a" say={R`右作用把北半球的相位整体平移 $\Lambda$——这就是 $\mathrm{U}(1)$ 规范变换。`}>{R`\phi_{\rm N}^{-1}(ug)=(p,\mathrm{e}^{\mathrm{i}(\alpha_{\rm N}+\Lambda)})`}</Eq>
          <Eq n="9.46b" say={R`南半球的相位也平移同样的 $\Lambda$，所以粘合关系 \eqref{9.45} 保持不变。`}>{R`\phi_{\rm S}^{-1}(ug)=(p,\mathrm{e}^{\mathrm{i}(\alpha_{\rm S}+\Lambda)}).`}</Eq>
          <Tx>{R`右作用对应于 $\mathrm{U}(1)$ 规范变换。`}</Tx>
          <Tx>{R`**为什么不同的 $n$ 给出不等价的丛（补充）。**换平凡化（\eqref{9.9}）时 $\tilde t_{\rm NS}=g_{\rm N}^{-1}t_{\rm NS}g_{\rm S}$，其中 $g_{\rm N}:U_{\rm N}\to\mathrm{U}(1)$、$g_{\rm S}:U_{\rm S}\to\mathrm{U}(1)$。两个半球都可缩，所以 $g_{\rm N}$、$g_{\rm S}$ 限制到赤道上的卷绕数为零；而卷绕数在逐点乘法下相加，所以 $\tilde t_{\rm NS}$ 的卷绕数仍是 $n$。因此 $P_n$ 与 $P_{n'}$（$n\neq n'$）不等价，特别地 $P_n$（$n\neq0$）不平凡。交互图 2 的左下小图对给定 $n$ 数值地计算这一卷绕数。`}</Tx>
        </Box>

        <Box kind="example" n="9.8" title={R`$S^4$ 上的 $\mathrm{SU}(2)$ 丛与瞬子数`}>
          <Tx>{R`把欧氏空间 $\R^m$ 的所有无穷远点等同起来，得到单点紧化 $S^m=\R^m\cup\{\infty\}$。若 $\R^m$ 上有一个平凡的 $G$ 丛，紧化后就得到 $S^m$ 上的新 $G$ 丛，它不一定平凡。设 $P$ 是由 $\R^4$ 单点紧化得到的 $S^4$ 上的 $\mathrm{SU}(2)$ 丛。这个主丛表示 $\mathrm{SU}(2)$ **瞬子**（instanton，§1.10）。取 $S^4$ 的开覆盖 $\{U_{\rm N},U_{\rm S}\}$：

$$U_{\rm N}=\{(x,y,z,t)\mid x^2+y^2+z^2+t^2\le R^2+\varepsilon\}$$
$$U_{\rm S}=\{(x,y,z,t)\mid R^2-\varepsilon\le x^2+y^2+z^2+t^2\}$$

其中 $R$ 是正常数，$\varepsilon$ 是无穷小正数。薄薄的交集 $U_{\rm N}\cap U_{\rm S}$ 本质上是 $S^3$。设 $t_{\rm NS}(p)$ 是定义在 $p\in U_{\rm N}\cap U_{\rm S}$ 上的转移函数。由于 $t_{\rm NS}$ 把 $S^3$ 映到 $\mathrm{SU}(2)$，它由 $\sym{hgrp}{\pi}_3(\mathrm{SU}(2))=\Z$ 分类。刻画这个丛的整数称为**瞬子数**（instanton number）。若取 $t_{\rm NS}(p)$ 为单位元 $e\in\mathrm{SU}(2)$，得到平凡丛 $P_0=S^4\times\mathrm{SU}(2)$，对应同伦类 0。非平凡的丛按如下方式得到。先注意 $\mathrm{SU}(2)\cong S^3$（例 4.12）。$A\in\mathrm{SU}(2)$ 写成

$$A=\begin{pmatrix}u&v\\ -\bar v&\bar u\end{pmatrix},$$

其中 $|u|^2+|v|^2=1$。把 $u$、$v$ 分开写成 $u=t+\mathrm{i}z$、$v=y+\mathrm{i}x$，得 $t^2+x^2+y^2+z^2=1$。因此 $\mathrm{SU}(2)$ 可以看作单位球面 $S^3$，$\sym{hgrp}{\pi}_3(\mathrm{SU}(2))\cong\sym{hgrp}{\pi}_3(S^3)\cong\Z$ 分类从 $S^3$ 到 $\mathrm{SU}(2)\cong S^3$ 的映射。*恒等映射* $f:S^3\to S^3\cong\mathrm{SU}(2)$ 是`}</Tx>
          <Eq n="9.47" say={R`把 $S^3$ 上的点 $(x,y,z,t)$ 直接读成一个 $\mathrm{SU}(2)$ 矩阵：单位阵配 $t$，三个 Pauli 矩阵（乘 $\mathrm{i}$）配 $x,y,z$。`}>{R`\begin{aligned}f(x,y,z,t)&\mapsto\begin{pmatrix}t+\mathrm{i}z&y+\mathrm{i}x\\ -y+\mathrm{i}x&t-\mathrm{i}z\end{pmatrix}\\&=tI_2+\mathrm{i}(x\sigma_x+y\sigma_y+z\sigma_z)\end{aligned}`}</Eq>
          <Tx>{R`其中 $I_2$ 是 $2\times2$ 单位矩阵，$\sigma_\mu$ 是 Pauli 矩阵。取一点 $p=(x,y,z,t)\in U_{\rm N}\cap U_{\rm S}$。若 $R=(x^2+y^2+z^2+t^2)^{1/2}$ 表示 $p$ 的径向距离，向量 $(x/R,y/R,z/R,t/R)$ 就是单位长的。给点 $p$ 指定 $\mathrm{SU}(2)$ 的元素`}</Tx>
          <Eq n="9.48" title="单位瞬子的转移函数" say={R`在大球面 $S^3$ 上，把每一点的方向直接当作一个 $\mathrm{SU}(2)$ 元素：这个转移函数恰好把 $S^3$ 盖住 $\mathrm{SU}(2)$ 一次。`}>{R`t_{\rm NS}(p)=\frac1R\left(tI_2+\mathrm{i}\sum_ix^i\sigma_i\right).`}</Eq>
          <Tx>{R`设 $\phi_{\rm N}$、$\phi_{\rm S}$ 是局部平凡化：`}</Tx>
          <Eq n="9.49" say={R`两个区域上的平凡化：纤维坐标是 $\mathrm{SU}(2)$ 的元素。`}>{R`\phi_{\rm N}^{-1}(u)=(p,g_{\rm N})\qquad\phi_{\rm S}^{-1}(u)=(p,g_{\rm S})`}</Eq>
          <Tx>{R`其中 $p=\pi(u)$，$g_{\rm N},g_{\rm S}\in\mathrm{SU}(2)$。在 $U_{\rm N}\cap U_{\rm S}$ 上有`}</Tx>
          <Eq n="9.50" say={R`在交界的 $S^3$ 上，外区的纤维坐标左乘 \eqref{9.48} 的矩阵得到内区的纤维坐标。`}>{R`g_{\rm N}=\frac1R\left(tI_2+\mathrm{i}\sum_ix^i\sigma_i\right)g_{\rm S}.`}</Eq>
          <Tx>{R`当 $(t,\boldsymbol{x})$ 扫过 $S^3$ 一次，$t_{\rm NS}(p)$ 扫过 $\mathrm{SU}(2)$ 一次，所以这个丛对应于 $\sym{hgrp}{\pi}_3(\mathrm{SU}(2))$ 的同伦类 1。不难看出，对应同伦类 $n$ 的转移函数为`}</Tx>
          <Eq n="9.51" keyEq title={R`瞬子数 $n$`} say={R`把单位瞬子的转移函数取 $n$ 次幂，它就把 $S^3$ 盖住 $\mathrm{SU}(2)$ $n$ 次：瞬子数为 $n$。`}>{R`t_{\rm NS}(p)=\frac1{R^n}\left(t\boldsymbol{1}+\mathrm{i}\sum_ix^i\sigma_i\right)^n.`}</Eq>
          <Derivation title={R`为什么 \eqref{9.51} 的度是 $n$（补充）`} collapsed steps={[
            { tex: R`\frac1R\left(tI_2+\mathrm{i}\sum_ix^i\sigma_i\right)=\cos\chi\,I_2+\mathrm{i}\sin\chi\,(\hat{\boldsymbol n}\cdot\boldsymbol\sigma)=\exp\!\big(\mathrm{i}\chi\,\hat{\boldsymbol n}\cdot\boldsymbol\sigma\big)`, why: R`令 $t=R\cos\chi$，$\boldsymbol{x}=R\sin\chi\,\hat{\boldsymbol n}$（$0\le\chi\le\pi$）；用 $(\hat{\boldsymbol n}\cdot\boldsymbol\sigma)^2=I_2$。` },
            { tex: R`t_{\rm NS}=\exp\!\big(\mathrm{i}n\chi\,\hat{\boldsymbol n}\cdot\boldsymbol\sigma\big)=\cos n\chi\,I_2+\mathrm{i}\sin n\chi\,(\hat{\boldsymbol n}\cdot\boldsymbol\sigma)`, why: R`同一方向 $\hat{\boldsymbol n}$ 的指数相乘，指数相加。` },
            { tex: R`w_0=\cos\chi_0\,I_2+\mathrm{i}\sin\chi_0\,\sigma_3\ (0<\chi_0<\pi):\quad t_{\rm NS}^{-1}(w_0)=\{\hat{\boldsymbol n}=\hat z,\ n\chi\equiv\chi_0\}\cup\{\hat{\boldsymbol n}=-\hat z,\ n\chi\equiv-\chi_0\}\pmod{2\pi}`, why: R`取一般的值 $w_0$ 数原像（$n>0$）：需要 $\cos n\chi=\cos\chi_0$ 且 $\sin n\chi\,\hat{\boldsymbol n}=\sin\chi_0\,\hat z$。在 $0<\chi<\pi$（即 $0<n\chi<n\pi$）中，满足 $n\chi=\chi_0+2\pi k$ 或 $n\chi=2\pi k-\chi_0$ 的值合计恰有 $n$ 个，每个都是孤立的原像点，且映射在那里保持定向（局部上它就是单位瞬子映射的复合）。所以映射度——$\pi_3(\mathrm{SU}(2))$ 中的类——等于 $n$；$n<0$ 时同理得 $n$（定向相反）。` },
          ]} />
          <Tx>{R`要继续研究单极与瞬子，必须在纤维丛上引入**联络**（即*规范势*）。我们将在下一章回到这些话题。`}</Tx>
          <Box kind="warning" title="勘误：平凡瞬子丛的底空间（p.385）">{R`原书写"得到平凡丛 $P_0=S^3\times\mathrm{SU}(2)$"。这里的底空间是紧化后的 $S^4$（$S^3$ 只是两个区域的交界），平凡丛应为 $P_0=S^4\times\mathrm{SU}(2)$，本站已改正。`}</Box>
        </Box>

        <Box kind="example" n="9.9" title={R`Hopf 映射：$S^3$ 是 $S^2$ 上的 $\mathrm{U}(1)$ 丛`}>
          <Tx>{R`Hopf 证明了 $S^3$ 是 $S^2$ 上的 $\mathrm{U}(1)$ 丛。嵌入在 $\R^4$ 中的单位三维球面写作

$$(x^1)^2+(x^2)^2+(x^3)^2+(x^4)^2=1.$$

引入 $z^0=x^1+\mathrm{i}x^2$、$z^1=x^3+\mathrm{i}x^4$，它变成`}</Tx>
          <Eq n="9.52" say={R`三维球面就是 $\C^2$ 中长度为 1 的向量 $(z^0,z^1)$ 的集合。`}>{R`|z^0|^2+|z^1|^2=1.`}</Eq>
          <Tx>{R`把 $S^2$ 参数化为

$$(\xi^1)^2+(\xi^2)^2+(\xi^3)^2=1.$$

**Hopf 映射** $\pi:S^3\to S^2$ 定义为`}</Tx>
          <Eq n="9.53a" title="Hopf 映射" say={R`$\xi^1+\mathrm{i}\xi^2=2z^0\bar z^1$ 的实部。`}>{R`\xi^1=2(x^1x^3+x^2x^4)`}</Eq>
          <Eq n="9.53b" say={R`$\xi^1+\mathrm{i}\xi^2=2z^0\bar z^1$ 的虚部。`}>{R`\xi^2=2(x^2x^3-x^1x^4)`}</Eq>
          <Eq n="9.53c" say={R`$\xi^3=|z^0|^2-|z^1|^2$：两个复分量的"权重差"决定纬度。`}>{R`\xi^3=(x^1)^2+(x^2)^2-(x^3)^2-(x^4)^2.`}</Eq>
          <Tx>{R`容易验证 $\pi$ 把 $S^3$ 映到 $S^2$，因为

$$(\xi^1)^2+(\xi^2)^2+(\xi^3)^2=[(x^1)^2+(x^2)^2+(x^3)^2+(x^4)^2]^2=1.$$`}</Tx>
          <Derivation title={R`Hopf 映射的复数写法与 $|\xi|=1$`} collapsed steps={[
            { tex: R`2z^0\bar z^1=2(x^1+\mathrm{i}x^2)(x^3-\mathrm{i}x^4)=2(x^1x^3+x^2x^4)+2\mathrm{i}(x^2x^3-x^1x^4)=\xi^1+\mathrm{i}\xi^2`, why: R`展开乘积，与 \eqref{9.53a}、\eqref{9.53b} 比较。` },
            { tex: R`\xi^3=|z^0|^2-|z^1|^2`, why: R`即 \eqref{9.53c}。` },
            { tex: R`(\xi^1)^2+(\xi^2)^2+(\xi^3)^2=4|z^0|^2|z^1|^2+(|z^0|^2-|z^1|^2)^2=(|z^0|^2+|z^1|^2)^2`, why: R`$|2z^0\bar z^1|^2=4|z^0|^2|z^1|^2$，配方。由 \eqref{9.52} 等于 1。` },
            { tex: R`(z^0,z^1)\mapsto(\lambda z^0,\lambda z^1),\ |\lambda|=1\ \Rightarrow\ \xi\ \text{不变}`, why: R`$(\lambda z^0)(\bar\lambda\bar z^1)=|\lambda|^2z^0\bar z^1$，$|\lambda z^\alpha|=|z^\alpha|$。所以每根纤维至少含一个圆；反之若 $\pi(z)=\pi(w)$，比值 $z^0/z^1=w^0/w^1$（或同为北极），加上归一化即得 $w=\lambda z$。` },
          ]} />
          <Tx>{R`设 $(X,Y)$ 是 $S^2$ 南半球 $U_{\rm S}$ 中一点从北极出发的球极投影坐标。若取包含 $S^2$ 赤道的复平面，$Z=X+\mathrm{i}Y$ 位于单位圆内。在例 8.1 中求得（\figref{9.9}）`}</Tx>
          <Figure n="9.9" caption={R`球面 $S^2$ 的球极坐标。$(X,Y)$ 相对于从北极出发的投影定义，$(U,V)$ 相对于从南极出发的投影定义。`} width="55%" />
          <Eq n="9.54a" say={R`南半球用北极投影的复坐标 $Z$，它恰好是两个复分量之比 $z^0/z^1$——与纤维上的相位 $\lambda$ 无关。`}>{R`Z=\frac{\xi^1+\mathrm{i}\xi^2}{1-\xi^3}=\frac{x^1+\mathrm{i}x^2}{x^3+\mathrm{i}x^4}=\frac{z^0}{z^1}\qquad(\xi\in U_{\rm S}).`}</Eq>
          <Tx>{R`（验证：$1-\xi^3=(|z^0|^2+|z^1|^2)-(|z^0|^2-|z^1|^2)=2|z^1|^2$，所以 $Z=2z^0\bar z^1/(2|z^1|^2)=z^0/z^1$。）注意 $Z$ 在

$$(z^0,z^1)\mapsto(\lambda z^0,\lambda z^1)$$

下不变，其中 $\lambda\in\mathrm{U}(1)$。由于 $|\lambda|=1$，点 $(\lambda z^0,\lambda z^1)$ 也在 $S^3$ 上。北半球 $U_{\rm N}$ 中从南极出发投影的球极坐标 $(U,V)$ 给出`}</Tx>
          <Eq n="9.54b" say={R`北半球用南极投影的复坐标 $W=z^1/z^0$；两个复坐标在重叠区互为倒数。`}>{R`W=U+\mathrm{i}V=\frac{\xi^1-\mathrm{i}\xi^2}{1+\xi^3}=\frac{x^3+\mathrm{i}x^4}{x^1+\mathrm{i}x^2}=\frac{z^1}{z^0}\qquad(\xi\in U_{\rm N}).`}</Eq>
          <Tx>{R`注意在赤道 $U_{\rm N}\cap U_{\rm S}$ 上 $Z=1/W$。

纤维丛结构如下给出。先定义局部平凡化 $\phi_{\rm S}^{-1}:\pi^{-1}(U_{\rm S})\to U_{\rm S}\times\mathrm{U}(1)$：`}</Tx>
          <Eq n="9.55a" say={R`南半球的平凡化：底空间坐标 $z^0/z^1$，纤维坐标取 $z^1$ 的相位。`}>{R`(z^0,z^1)\mapsto(z^0/z^1,z^1/|z^1|)`}</Eq>
          <Tx>{R`以及 $\phi_{\rm N}^{-1}:\pi^{-1}(U_{\rm N})\to U_{\rm N}\times\mathrm{U}(1)$：`}</Tx>
          <Eq n="9.55b" say={R`北半球的平凡化：底空间坐标 $z^1/z^0$，纤维坐标取 $z^0$ 的相位。`}>{R`(z^0,z^1)\mapsto(z^1/z^0,z^0/|z^0|).`}</Eq>
          <Tx>{R`这些局部平凡化在各自的卡上都有良好定义。例如在 $U_{\rm N}$ 上 $z^0\neq0$，所以 $z^1/z^0=U+\mathrm{i}V$ 与 $z^0/|z^0|$ 都非奇异。在赤道 $\xi^3=0$ 上有 $|z^0|=|z^1|=1/\sqrt2$。于是赤道上的局部平凡化为`}</Tx>
          <Eq n="9.56a" say={R`赤道上 $|z^1|=1/\sqrt2$，南半球的纤维坐标就是 $\sqrt2z^1$。`}>{R`\phi_{\rm S}^{-1}:(z^0,z^1)\mapsto(z^0/z^1,\sqrt2z^1)`}</Eq>
          <Tx>{R`以及`}</Tx>
          <Eq n="9.56b" say={R`赤道上北半球的纤维坐标是 $\sqrt2z^0$。`}>{R`\phi_{\rm N}^{-1}:(z^0,z^1)\mapsto(z^1/z^0,\sqrt2z^0).`}</Eq>
          <Tx>{R`赤道上的转移函数是`}</Tx>
          <Eq n="9.57" keyEq title="Hopf 丛的转移函数" say={R`Hopf 丛的转移函数在赤道上就是 $\xi^1+\mathrm{i}\xi^2=\mathrm{e}^{\mathrm{i}\phi}$：绕赤道一圈恰好卷绕一次——它是磁荷为 1 的单极子丛。`}>{R`t_{\rm NS}(\xi)=\frac{\sqrt2z^0}{\sqrt2z^1}=\xi^1+\mathrm{i}\xi^2\in\mathrm{U}(1).`}</Eq>
          <Derivation title={R`验证 \eqref{9.57}，并推广到整个重叠带`} collapsed steps={[
            { tex: R`g_{\rm N}=t_{\rm NS}\,g_{\rm S}\ \Rightarrow\ t_{\rm NS}=\frac{g_{\rm N}}{g_{\rm S}}=\frac{z^0/|z^0|}{z^1/|z^1|}`, why: R`按 \eqref{9.4} 的约定 $f_{\rm N}=t_{\rm NS}f_{\rm S}$；$\mathrm{U}(1)$ 交换，可以直接相除。` },
            { tex: R`=\frac{z^0\bar z^1}{|z^0||z^1|}=\frac{\xi^1+\mathrm{i}\xi^2}{\sin\theta}=\mathrm{e}^{\mathrm{i}\sym{azim}{\phi}}`, why: R`$\bar z^1/|z^1|=|z^1|/z^1$；$2z^0\bar z^1=\xi^1+\mathrm{i}\xi^2=\sin\theta\,\mathrm{e}^{\mathrm{i}\phi}$，$2|z^0||z^1|=\sqrt{1-(\xi^3)^2}=\sin\theta$。结果与纤维上的点（$\lambda$）无关，只依赖底空间点。` },
            { tex: R`\xi^3=0:\quad t_{\rm NS}=\frac{\sqrt2z^0}{\sqrt2z^1}=2z^0\bar z^1=\xi^1+\mathrm{i}\xi^2`, why: R`赤道上 $|z^1|^2=1/2$，$1/z^1=2\bar z^1$，$\sin\theta=1$。这就是 \eqref{9.57}；与 \eqref{9.45} 比较得 $n=1$。` },
          ]} />
          <Tx>{R`绕赤道一周，$t_{\rm NS}(\xi)$ 在复平面上绕单位圆一次，因此 $\mathrm{U}(1)$ 丛 $S^3\xrightarrow{\pi}S^2$ 由 $\sym{hgrp}{\pi}_1(\mathrm{U}(1))=\Z$ 的同伦类 1 刻画。Trautman (1977)、Minami (1979) 与 Ryder (1980) 指出，单位强度的磁单极由 Hopf 映射 $S^3\xrightarrow{\pi}S^2$ 描述。`}</Tx>
          <Tx>{R`**另一种观点。**Hopf 映射也可以稍换一个角度理解。把 $S^3$ 看作**复一维球面**

$$S^1_\C=\{(z^0,z^1)\in\C^2\mid|z^0|^2+|z^1|^2=1\}.$$

定义映射 $\pi:S^1_\C\to\CP^1$：`}</Tx>
          <Eq n="9.58" say={R`Hopf 映射就是"把 $\C^2$ 中的单位向量送到它所在的复直线"：同一复直线上的单位向量只差一个相位，构成一根纤维圆。`}>{R`(z^0,z^1)\mapsto[(z^0,z^1)]=\{\lambda(z^0,z^1)\mid\lambda\in\C-\{0\}\}.`}</Eq>
          <Tx>{R`在这个映射下，$S^3$ 中形如 $\lambda(z^0,z^1)$、$|\lambda|=1$ 的点被映到 $\CP^1=S^2$ 的同一点。这就是前面得到的 Hopf 映射 $\pi:S^3\to S^2$。

这很容易推广到**四元数** $\mathbb{H}$ 的情形。四元数代数由乘法表

$$\boldsymbol{i}^2=\boldsymbol{j}^2=\boldsymbol{k}^2=-1\qquad\boldsymbol{i}\boldsymbol{j}=-\boldsymbol{j}\boldsymbol{i}=\boldsymbol{k}\qquad\boldsymbol{j}\boldsymbol{k}=-\boldsymbol{k}\boldsymbol{j}=\boldsymbol{i}\qquad\boldsymbol{k}\boldsymbol{i}=-\boldsymbol{i}\boldsymbol{k}=\boldsymbol{j}$$

定义。$\mathbb{H}$ 的任意元素写成

$$q=t+\boldsymbol{i}x+\boldsymbol{j}y+\boldsymbol{k}z.$$

显然单位四元数 $|q|=(t^2+x^2+y^2+z^2)^{1/2}=1$ 表示 $S^3\cong\mathrm{SU}(2)$。**四元数一维球面**为`}</Tx>
          <Eq n="9.59" say={R`四元数一维球面：$\mathbb{H}^2=\R^8$ 中的单位球面，即 $S^7$。`}>{R`S^1_{\mathbb H}=\{(q^0,q^1)\in\mathbb{H}^2\mid|q^0|^2+|q^1|^2=1\}`}</Eq>
          <Tx>{R`它表示 $S^7$。这时 Hopf 映射取如下形式：`}</Tx>
          <Eq n="9.60" say={R`四元数 Hopf 映射：把 $S^7$ 中的点送到它所在的四元数直线。`}>{R`\pi:S^1_{\mathbb H}\to\mathbb{H}P^1`}</Eq>
          <Tx>{R`其中 $\mathbb{H}P^1$ 是四元数射影空间，其元素为`}</Tx>
          <Eq n="9.61" say={R`四元数射影直线的点：差一个非零四元数因子的 $(q^0,q^1)$ 视为同一点。`}>{R`[(q^0,q^1)]=\{\eta(q^0,q^1)\in\mathbb{H}^2\mid\eta\in\mathbb{H}-\{0\}\}.`}</Eq>
          <Tx>{R`$S^7$ 中 $|\eta|=1$ 的点在这个映射下被送到 $\mathbb{H}P^1=S^4$ 的同一点，于是得到 Hopf 映射`}</Tx>
          <Eq n="9.62" title={R`四元数 Hopf 映射 $S^7\to S^4$`} say={R`$S^7$ 是 $S^4$ 上纤维为 $S^3=\mathrm{SU}(2)$ 的主丛：单位瞬子的几何模型。`}>{R`\pi:S^7\to S^4.`}</Eq>
          <Tx>{R`纤维是单位四元数 $S^3=\mathrm{SU}(2)$。由这个 Hopf 映射定义的转移函数属于 $\sym{hgrp}{\pi}_3(\mathrm{SU}(2))\cong\Z$ 的类 1。单位强度的瞬子用这个 Hopf 映射来描述。

八元数（octonion）定义 Hopf 映射 $\pi:S^{15}\to S^8$。它与其他 Hopf 映射的不同在于纤维 $S^7$ 并不真正是群。迄今还没有发现这个映射在物理中的应用。（脚注：八元数也称 Cayley 数。八元数的集合是 $\R$ 上的向量空间但不是域；乘法既不交换也不结合。最近的综述见 John C Baez, *The Octonions*, math.RA/0105155。）`}</Tx>
        </Box>
        <HopfLab />

        <Box kind="example" n="9.10" title={R`$G$ 是 $G/H$ 上的 $H$ 主丛`}>
          <Tx>{R`设 $H$ 是李群 $G$ 的闭李子群。我们证明 $G$ 是纤维为 $H$、底空间为 $M=G/H$ 的主丛。定义 $H$ 在 $G$ 上的右作用为 $g\mapsto ga$，$g\in G$，$a\in H$。由于 $G$ 是李群，右作用可微。定义投影 $\pi:G\to M=G/H$ 为 $\pi:g\mapsto[g]=\{gh\mid h\in H\}$。显然 $g$ 与 $ga\in G$ 被映到同一点 $[g]$，所以 $\pi(g)=\pi(ga)$（$=[g]$）。为定义局部平凡化，需要在每张卡 $U_i$ 上定义映射 $f_i:G\to H$。设 $s$ 是 $U_i$ 上的局部截面，$g\in\pi^{-1}([g])$。令 $f_i(g)=s([g])^{-1}g$。由于 $s([g])$ 是 $[g]$ 处的截面值，它可以写成 $ga$（某个 $a\in H$），因此 $s([g])^{-1}g=a^{-1}g^{-1}g=a^{-1}\in H$。于是定义局部平凡化 $\phi_i:U_i\times H\to G$ 为`}</Tx>
          <Eq n="9.63" say={R`$G\to G/H$ 的局部平凡化：底空间坐标是陪集 $[g]$，纤维坐标是 $g$ 相对于截面所选代表元的"偏差" $s([g])^{-1}g\in H$。`}>{R`\phi_i^{-1}(g)=([g],f_i(g)).`}</Eq>
          <Tx>{R`容易看出 $f_i(ga)=f_i(g)a$（$a\in H$），因此 $\phi_i^{-1}(ga)=(p,f_i(g)a)$ 成立——这正是主丛右作用 \eqref{9.41} 的要求。有用的例子（见例 5.18）：`}</Tx>
          <Eq n="9.64" say={R`正交群模去固定一个向量的子群就是球面：$\mathrm{SO}(n)$ 是 $S^{n-1}$ 上的 $\mathrm{SO}(n-1)$ 主丛。`}>{R`\mathrm{O}(n)/\mathrm{O}(n-1)=\mathrm{SO}(n)/\mathrm{SO}(n-1)=S^{n-1}`}</Eq>
          <Eq n="9.65" say={R`酉群模去固定一个复向量的子群是奇数维球面 $S^{2n-1}\subset\C^n$。`}>{R`\mathrm{U}(n)/\mathrm{U}(n-1)=\mathrm{SU}(n)/\mathrm{SU}(n-1)=S^{2n-1}.`}</Eq>
          <Tx>{R`（补充：取 $G=\mathrm{SU}(2)\cong S^3$、$H=\mathrm{U}(1)=\{\mathrm{diag}(\mathrm{e}^{\mathrm{i}\alpha},\mathrm{e}^{-\mathrm{i}\alpha})\}$，则 $G/H=S^2$，这个主丛 $\mathrm{SU}(2)\to S^2$ 正是例 9.9 的 Hopf 丛。）`}</Tx>
        </Box>
      </Sub>

      <Sub n="9.4.2" title="Associated bundles" zh="相伴丛">
        <Tx>{R`给定主纤维丛 $P(M,G)$，可以按如下方式构造**相伴纤维丛**（associated fibre bundle）。设 $G$ 从左边作用在流形 $F$ 上。定义 $g\in G$ 在 $P\times F$ 上的作用为`}</Tx>
        <Eq n="9.66" keyEq title="相伴丛" say={R`把 $P$ 中的"标架"右移 $g$、同时把纤维 $F$ 中的"分量"左移 $g^{-1}$，二者描述的是同一个对象——相伴丛就是模去这种冗余。`}>{R`(u,f)\to(ug,g^{-1}f)`}</Eq>
        <Tx>{R`其中 $u\in P$，$f\in F$。于是相伴纤维丛 $(E,\pi,M,G,F,P)$ 是等价类 $P\times F/G$，其中两点 $(u,f)$ 与 $(ug,g^{-1}f)$ 被等同。

考虑 $F$ 是 $k$ 维向量空间 $V$ 的情形。设 $\rho$ 是 $G$ 的 $k$ 维表示。**相伴向量丛**（associated vector bundle）$P\times_\rho V$ 定义为把 $P\times V$ 中的点 $(u,v)$ 与 $(ug,\rho(g)^{-1}v)$ 等同所得，其中 $u\in P$，$g\in G$，$v\in V$。例如与 $P(M,\mathrm{GL}(k,\R))$ 相伴的是 $M$ 上纤维为 $\R^k$ 的向量丛。相伴向量丛 $E=P\times_\rho V$ 的纤维丛结构如下给出。投影 $\pi_E:E\to M$ 定义为 $\pi_E(u,v)=\pi(u)$；这个投影是良定义的，因为 $\pi(u)=\pi(ug)$ 意味着 $\pi_E(ug,\rho(g)^{-1}v)=\pi(ug)=\pi_E(u,v)$。局部平凡化由 $\psi_i:U_i\times V\to\pi_E^{-1}(U_i)$ 给出。$E$ 的转移函数是 $\rho(t_{ij}(p))$，其中 $t_{ij}(p)$ 是 $P$ 的转移函数（\sref{F:assoc9}）。`}</Tx>
        <Derivation title={R`相伴丛的转移函数是 $\rho(t_{ij})$（补充）`} collapsed steps={[
          { tex: R`\psi_i(p,v)\equiv[(s_i(p),v)]`, why: R`用 $P$ 的局部截面 $s_i$（即典范局部平凡化）定义 $E$ 的局部平凡化。` },
          { tex: R`[(s_i(p),v)]=[(s_j(p)t_{ji}(p),v)]=[(s_j(p),\rho(t_{ji}(p))v)]`, why: R`第一步用 \eqref{9.43}；第二步用等价关系 $(ug,v)\sim(u,\rho(g)v)$（即 \eqref{9.66} 取 $g\to g^{-1}$）。` },
          { tex: R`\psi_i(p,v_i)=\psi_j(p,v_j)\iff v_j=\rho(t_{ji})v_i\iff v_i=\rho(t_{ij})v_j`, why: R`与 \eqref{9.4} 的约定 $f_i=t^E_{ij}f_j$ 比较，得 $t^E_{ij}=\rho(t_{ij})$。因为 $\rho$ 是同态，$\rho(t_{ij})$ 自动满足余循环条件。` },
        ]} />
        <Tx>{R`反过来，向量丛自然诱导一个与之相伴的主丛。设 $E\xrightarrow{\pi}M$ 是 $\dim E=k$ 的向量丛（即纤维为 $\R^k$ 或 $\C^k$）。用同一组转移函数，$E$ 诱导 $M$ 上的主丛 $P(E)\equiv P(M,G)$，结构群 $G$ 为 $\mathrm{GL}(k,\R)$ 或 $\mathrm{GL}(k,\C)$。$P(E)$ 的显式构造按 §9.2.2 所述的重构程序进行。`}</Tx>
        <Box kind="warning" title="勘误：节号引用（p.390）">{R`原书写"按 section 9.1 所述的重构程序"。重构程序在 §9.2.2（\eqref{9.11}–\eqref{9.14}），本站已改正。`}</Box>

        <Box kind="example" n="9.11" title={R`标架丛 $LM$`}>
          <Tx>{R`与 $m$ 维流形 $M$ 上的切丛 $TM$ 相伴的主丛称为**标架丛**（frame bundle）$LM\equiv\bigcup_{p\in M}L_pM$，其中 $L_pM$ 是 $p$ 处标架的集合。在卡 $U_i$ 上引入坐标 $x^\mu$。$T_pM$ 在 $U_i$ 上有自然基 $\{\partial/\partial x^\mu\}$。$p$ 处的标架 $u=\{X_1,\ldots,X_m\}$ 表示为`}</Tx>
          <Eq n="9.67" say={R`一个标架就是 $m$ 个线性无关的切向量，用坐标基展开的系数排成一个可逆矩阵 $(X^\mu{}_\alpha)$。`}>{R`X_\alpha=X^\mu{}_\alpha\partial/\partial x^\mu|_p\qquad1\le\alpha\le m`}</Eq>
          <Tx>{R`其中 $(X^\mu{}_\alpha)$ 是 $\mathrm{GL}(m,\R)$ 的元素，所以 $\{X_\alpha\}$ 线性无关。定义局部平凡化 $\phi_i:U_i\times\mathrm{GL}(m,\R)\to\pi^{-1}(U_i)$ 为 $\phi_i^{-1}(u)=(p,(X^\mu{}_\alpha))$。$LM$ 的丛结构定义如下。

(i) 若 $u=\{X_1,\ldots,X_m\}$ 是 $p$ 处的标架，定义 $\pi_L:LM\to M$ 为 $\pi_L(u)=p$。

(ii) $a=(a^i{}_j)\in\mathrm{GL}(m,\R)$ 在标架 $u=\{X_1,\ldots,X_m\}$ 上的作用为 $(u,a)\mapsto ua$，其中 $ua$ 是 $p$ 处的新标架，定义为`}</Tx>
          <Eq n="9.68" say={R`$\mathrm{GL}(m,\R)$ 从右边作用在标架上：新标架的每个向量是旧标架向量的线性组合——换基。`}>{R`Y_\beta=X_\alpha a^\alpha{}_\beta.`}</Eq>
          <Tx>{R`反过来，给定任意两个标架 $\{X_\alpha\}$ 与 $\{Y_\beta\}$，存在 $\mathrm{GL}(m,\R)$ 的元素使 \eqref{9.68} 成立。因此 $\mathrm{GL}(m,\R)$ 在（每根纤维 $L_pM$ 上）可迁地作用。

(iii) 设 $U_i$ 与 $U_j$ 是重叠的卡，坐标分别为 $x^\mu$ 与 $y^\mu$。对 $p\in U_i\cap U_j$ 有`}</Tx>
          <Eq n="9.69" say={R`同一个标架向量在两套坐标基下的展开。`}>{R`X_\alpha=X^\mu{}_\alpha\partial/\partial x^\mu|_p=\tilde X^\mu{}_\alpha\partial/\partial y^\mu|_p`}</Eq>
          <Tx>{R`其中 $(X^\mu{}_\alpha),(\tilde X^\mu{}_\alpha)\in\mathrm{GL}(m,\R)$。由于 $X^\mu{}_\alpha=(\partial x^\mu/\partial y^\nu)_p\tilde X^\nu{}_\alpha$，求得转移函数 $t^L_{ij}(p)$ 为`}</Tx>
          <Eq n="9.70" title="标架丛的转移函数" say={R`标架丛与切丛用同一组转移函数——Jacobi 矩阵从左边乘在标架矩阵上；换基（右作用）则从右边乘。`}>{R`t^L_{ij}(p)=((\partial x^\mu/\partial y^\nu)_p)\in\mathrm{GL}(m,\R).`}</Eq>
          <Tx>{R`于是，给定 $TM$，我们构造了具有相同转移函数的标架丛 $LM$。

在广义相对论中，右作用对应**局部 Lorentz 变换**，左作用对应**广义坐标变换**。标架丛是容纳这两种变换的最自然的框架。若引入度规把 $\{X_\alpha\}$ 归一化，矩阵 $(X^\mu{}_\alpha)$ 就成为 vierbein，结构群约化为 $\mathrm{O}(m)$，见 §7.8。`}</Tx>
          <Box kind="warning" title="勘误：例 9.11 (iii) 中的哑指标（p.391）">{R`原书写"$X^\mu{}_\alpha=(\partial x^\mu/\partial y^\nu)_p\tilde X^\mu{}_\alpha$"，右边 $\tilde X$ 的上指标应为求和指标 $\nu$：$X^\mu{}_\alpha=(\partial x^\mu/\partial y^\nu)_p\tilde X^\nu{}_\alpha$（由 \eqref{9.69} 与 $\partial/\partial y^\nu=(\partial x^\mu/\partial y^\nu)\partial/\partial x^\mu$ 得到）。本站已改正。`}</Box>
        </Box>

        <Box kind="example" n="9.12" title="自旋丛与旋量场">
          <Tx>{R`$M$ 上的**旋量场**（spinor field）是**自旋丛**（spin bundle）的截面，下面给出定义。由于 $\mathrm{GL}(k,\R)$ 没有旋量表示，需要引入结构群为 $\mathrm{SO}(k)$ 的正交归一标架丛。如例 4.12 所述，$\mathrm{SPIN}(k)$ 是 $\mathrm{SO}(k)$ 的万有覆叠群。［要定义自旋丛，必须检验 $\mathrm{SO}(k)$ 丛能否提升为 $M$ 上的 $\mathrm{SPIN}(k)$ 丛。这种提升的障碍在 §11.6 讨论。］

具体地，考虑与四维 Lorentz 标架丛 $LM$ 相伴的自旋丛，$M$ 是四维 Lorentz 流形。我们关心具有确定的时空定向与时间定向的标架。结构群于是约化为`}</Tx>
          <Eq n="9.71" say={R`保持空间定向与时间方向的 Lorentz 变换（正时向 Lorentz 群）：行列式为 $+1$，且不把未来翻成过去。`}>{R`\mathrm{O}^+_\uparrow(3,1)\equiv\{\Lambda\in\mathrm{O}(3,1)\mid\det\Lambda=+1,\ \Lambda_0{}^0>0\}.`}</Eq>
          <Tx>{R`$\mathrm{O}^+_\uparrow(3,1)$ 的万有覆叠群是 $\mathrm{SL}(2,\C)$，见例 5.16(c)。同态 $\varphi:\mathrm{SL}(2,\C)\to\mathrm{O}^+_\uparrow(3,1)$ 是二对一映射，$\ker\varphi=\{I_2,-I_2\}$。**Weyl 旋量**是纤维丛 $(W,\pi,M,\C^2,\mathrm{SL}(2,\C))$ 的截面。**Dirac 旋量**是`}</Tx>
          <Eq n="9.72" say={R`Dirac 旋量丛：纤维 $\C^4$ 由两个 Weyl 旋量拼成，一个按 $\mathrm{SL}(2,\C)$ 的定义表示、一个按其复共轭表示变换。`}>{R`(D,\pi,M,\C^4,\mathrm{SL}(2,\C)\oplus\overline{\mathrm{SL}(2,\C)})`}</Eq>
          <Tx>{R`的截面。$W$ 的截面是 $\mathrm{O}^+_\uparrow(3,1)$ 的 $(1/2,0)$ 表示，$(\bar W,\pi,M,\C^2,\overline{\mathrm{SL}(2,\C)})$ 的截面是 $(0,1/2)$ 表示，例如见 Ramond (1989)。Dirac 旋量属于 $(1/2,0)\oplus(0,1/2)$。（用本节的语言：$D=W\oplus\bar W$ 是两个相伴向量丛的 Whitney 和，结构群 $\mathrm{SL}(2,\C)$ 通过表示 $\rho\oplus\bar\rho$ 作用；记号 $\mathrm{SL}(2,\C)\oplus\overline{\mathrm{SL}(2,\C)}$ 应理解为这个分块对角表示。）

自旋丛的一般结构将在 §11.6 中给出。`}</Tx>
        </Box>
      </Sub>

      <Sub n="9.4.3" title="Triviality of bundles" zh="丛的平凡性">
        <Tx>{R`纤维丛若能表示为底空间与纤维的直积，就是平凡的。下面的定理给出纤维丛平凡的条件。`}</Tx>
        <Stmt id="T9.2">
          <Eq n="9.73" keyEq title="由整体截面得到平凡化" say={R`有了整体截面，每根纤维都有了一个"原点" $s(p)$，纤维中任一点唯一地写成 $s(p)a$：读出 $(p,a)$ 就是整体平凡化。`}>{R`\Phi:s(p)a\mapsto(p,a).`}</Eq>
          <Proof steps={[
            { claim: R`(⇒) 设 $(P,\pi,M,G)$ 是 $M$ 上的主丛，$s\in\Gamma(M,P)$ 是整体截面。若 $a\in G$，乘积 $s(p)a$ 属于 $p$ 处的纤维（$\pi(s(p)a)=\pi(s(p))=p$）。`, uses: ["9.41"] },
            { claim: R`由于右作用自由且可迁，每个 $u\in P$ 都唯一地写成 $s(p)a$，$p=\pi(u)$，$a\in G$。于是 \eqref{9.73} 定义了映射 $\Phi:P\to M\times G$，它是双射，逆为 $(p,a)\mapsto s(p)a$。` },
            { claim: R`$\Phi$ 是同胚（实际上是微分同胚）：在 $U_i$ 上用任一局部平凡化，记 $\phi_i^{-1}(s(p))=(p,h_i(p))$，$h_i:U_i\to G$ 光滑。由 \eqref{9.41}，$\phi_i^{-1}(s(p)a)=(p,h_i(p)a)$，所以在 $\pi^{-1}(U_i)$ 上 $\Phi\circ\phi_i:(p,g)\mapsto(p,h_i(p)^{-1}g)$，逆为 $(p,a)\mapsto(p,h_i(p)a)$，都光滑。而且 $\Phi(ua)=\Phi(u)a$，它与右作用相容。`, uses: ["9.41"], fill: true },
            { claim: R`所以 $P$ 是平凡丛 $M\times G$（在整体平凡化 $\Phi^{-1}$ 下所有转移函数都是 $e$）。` },
            { claim: R`(⇐) 反之，设 $P\cong M\times G$，$\phi:M\times G\to P$ 是平凡化。取定 $g\in G$，则由 $s_g(p)=\phi(p,g)$ 定义的 $s_g:M\to P$ 是整体截面（$\pi\circ s_g=\mathrm{id}_M$，且光滑）。` },
          ]} />
        </Stmt>
        <Tx>{R`对向量丛有没有相应的定理？我们知道任何向量丛都容许整体的零截面，所以不能简单地把定理 9.2 中的 $P$ 换成 $E$。考虑 $E$ 的相伴主丛 $P(E)$。按定义，$E$ 与 $P(E)$ 共享同一组转移函数。由于丛的扭曲完全由转移函数描述，我们得到下面的推论。`}</Tx>
        <Stmt id="C9.2">
          <Proof steps={[
            { claim: R`$P(E)$ 的纤维 $P(E)_p$ 可以等同于 $E_p$ 的标架（有序基）全体：用局部平凡化，$\phi_i(p,(G^\alpha{}_\beta))\leftrightarrow\{e_\alpha(p)G^\alpha{}_\beta\}$，其中 $\{e_\alpha\}$ 是 $\phi_i$ 给出的局部标架（\eqref{9.26}）；右作用就是换基 \eqref{9.27}。这种等同与卡无关，因为两边的转移函数都是从左边乘 $t_{ij}$。`, uses: ["9.26", "9.27", "F:assoc9"], fill: true },
            { claim: R`(⇐) 若 $P(E)$ 有整体截面，它就是一个整体标架 $\{e_1(p),\ldots,e_k(p)\}$。用 \eqref{9.24}、\eqref{9.25} 的映射 $V=V^\alpha e_\alpha(p)\mapsto(p,\{V^\alpha\})$ 在整个 $M$ 上定义 $E\to M\times\R^k$，它是覆盖 $\mathrm{id}_M$ 的线性同构，故 $E$ 平凡。`, uses: ["9.24", "9.25"], fill: true },
            { claim: R`(⇒) 若 $E\cong M\times\R^k$，平凡化下的常值标准基截面 $\{(p,\boldsymbol{e}_\alpha)\}$ 是整体标架，即 $P(E)$ 的整体截面。（或者：$E$ 平凡 ⇒ 转移函数可取为 $e$ ⇒ $P(E)$ 平凡 ⇒ 由\sref{T9.2} 有整体截面。）`, uses: ["T9.2"], fill: true },
          ]} />
        </Stmt>
        <Box kind="physics" title="三个例子回顾">{R`**Möbius 带**（$k=1$）：整体标架 = 处处非零的截面，而交互图 1 说明任何截面都有零点，故不平凡。**$TS^2$**（$k=2$）：毛球定理说连一个处处非零的向量场都没有，更不必说整体标架。**$S^3$ 的切丛**：$S^3=\mathrm{SU}(2)$ 是李群，三个左不变向量场（第 5 章）构成整体标架，所以 $TS^3$ 平凡。对主丛，单极子丛 $P_n$（$n\neq0$）没有整体截面——物理上，这意味着单极周围的电子波函数不能用单一的规范在整个球面上描述（Wu–Yang 的两片规范）。`}</Box>
      </Sub>
    </Sec>);
}
