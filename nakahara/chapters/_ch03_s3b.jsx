// §3.3.3 同调群 —— 式 (3.28)–(3.42)，定义 3.5，定理 3.4，例 3.6–3.9，习题 3.1–3.3
import { Sub, Tx, Eq, Box, Stmt, Exercise, Erratum, Table, C } from "@kit";

const R = String.raw;

export function Sub333() {
  return (
    <Sub n="3.3.3" title="Homology groups" zh="同调群">
      <p className="muted">本小节概念：<C id="homology" /> · <C id="invariance" /></p>
      <Tx>{R`**为什么链群本身不行？**至此我们有了三个群 $C_r(K)$、$Z_r(K)$、$B_r(K)$。它们和 $K$（或以 $K$ 为三角剖分的空间）的拓扑性质有什么关系？$C_r(K)$ 能表达同胚下不变的性质吗？三角形的三边与正方形的四边是同胚的，可是它们的 1 维链群

$$C_1(K_1)=\{i(p_0p_1)+j(p_1p_2)+k(p_2p_0)\mid i,j,k\in\mathbb{Z}\}\cong\mathbb{Z}\oplus\mathbb{Z}\oplus\mathbb{Z},\qquad C_1(K_2)\cong\mathbb{Z}\oplus\mathbb{Z}\oplus\mathbb{Z}\oplus\mathbb{Z}$$

显然不同构，所以 $C_r(K)$ 不可能是拓扑不变量。$Z_r(K)$ 与 $B_r(K)$ 一般也不是（例如两者的 $Z_0=C_0$ 分别是 $\mathbb{Z}^3$ 与 $\mathbb{Z}^4$）。原来，真正的拓扑不变量是下面定义的**同调群**：把闭链里"平凡的"——是边界的——部分除掉。`}</Tx>
      <Erratum kind="note" loc="p.126 第 3 段" title={R`"$Z_r(K)$ 与 $B_r(K)$ 也一样"需要具体到维数`}>{R`原书说 $Z_r$、$B_r$ 与 $C_r$ 一样不是拓扑不变量。这句话作为一般结论是对的，但在三角形与正方形这个例子里要小心：两者的 $Z_1$ 都同构于 $\mathbb{Z}$、$B_1$ 都为 $0$；真正不同的是 $Z_0=C_0$（$\mathbb{Z}^3$ 对 $\mathbb{Z}^4$）与 $B_0$（$\mathbb{Z}^2$ 对 $\mathbb{Z}^3$）。商 $H_0=Z_0/B_0$ 则两者都是 $\mathbb{Z}$。`}</Erratum>
      <Stmt id="D3.5">
        <Eq n="3.28" keyEq title="同调群" say={R`第 $r$ 同调群就是 $r$ 维闭链模去 $r$ 维边缘：没有边界的东西中，扣除那些本身就是边界的。`}>{R`H_r(K)\equiv Z_r(K)/B_r(K).`}</Eq>
      </Stmt>
      <Tx>{R`由于 $B_r(K)$ 是 $Z_r(K)$ 的子群（\sref{T3.3}），$H_r(K)$ 良定义。$H_r(K)$ 是 $r$ 维闭链的等价类的集合：`}</Tx>
      <Eq n="3.29" say="同调群的每个元素是一类闭链，类与类之间相差边缘。">{R`H_r(K)\equiv\{[z]\mid z\in Z_r(K)\}`}</Eq>
      <Tx>{R`每个等价类 $[z]$ 称为一个**同调类**（homology class）。两个 $r$ 维闭链 $z$、$z'$ 属于同一类，当且仅当 $z-z'\in B_r(K)$，此时称 $z$ 与 $z'$ **同调**（homologous），记作 $z\sim z'$ 或 $[z]=[z']$。几何上，$z-z'$ 是某块区域的边界——两条闭路"夹着"一块区域，可以把一条扫到另一条。按定义，任何边缘 $b\in B_r(K)$ 都同调于 $0$，因为 $b-0\in B_r(K)$。

下面这条定理是整个理论的意义所在，原书（以及我们）不加证明地接受它：`}</Tx>
      <Stmt id="T3.4">
        <Eq n="3.30" say="同胚的空间，无论怎样三角剖分，同调群都同构。">{R`H_r(K)\cong H_r(L)\qquad r=0,1,2,\ldots.`}</Eq>
        <Tx>{R`特别地，若 $(K,f)$ 与 $(L,g)$ 是同一个 $X$ 的两个三角剖分，则`}</Tx>
        <Eq n="3.31" say="同一个空间的两种不同剖分，给出同构的同调群。">{R`H_r(K)\cong H_r(L)\qquad r=0,1,2,\ldots.`}</Eq>
      </Stmt>
      <Tx>{R`因此，即使 $X$ 本身不是多面体，只要它可以三角剖分，谈论"$X$ 的同调群"就有意义。对任意三角剖分 $(K,f)$，定义`}</Tx>
      <Eq n="3.32" keyEq title="空间的同调群" say="空间的同调群就用它任意一个三角剖分的同调群来定义；定理 3.4 保证结果与剖分无关。">{R`H_r(X)\equiv H_r(K)\qquad r=0,1,2,\ldots.`}</Eq>
      <Tx>{R`\sref{T3.4} 保证这与三角剖分 $(K,f)$ 的选取无关。**现在开始动手算。**下面的例子从最简单的复形开始，每一个都只用到定义和同态基本定理。`}</Tx>

      <Box kind="example" n="3.6" title="一个点">
        <Tx>{R`设 $K=\{p_0\}$。0 维链群 $C_0(K)=\{ip_0\mid i\in\mathbb{Z}\}\cong\mathbb{Z}$。显然 $Z_0(K)=C_0(K)$，$B_0(K)=\{0\}$（$\partial_0p_0=0$，且 $p_0$ 不是任何东西的边界）。于是`}</Tx>
        <Eq n="3.33" say="一个点的零维同调群是整数：它有一个连通分支。">{R`H_0(K)\equiv Z_0(K)/B_0(K)=C_0(K)\cong\mathbb{Z}.`}</Eq>
      </Box>
      <Exercise n="3.1" title="两个点" level="★"
        hint={R`没有 1 单形，所以 $B_0(K)=\{0\}$；$r\ge1$ 时链群都是零。`}
        solution={R`$K=\{p_0,p_1\}$ 只有 0 单形。$C_0(K)=\{ip_0+jp_1\mid i,j\in\mathbb{Z}\}\cong\mathbb{Z}\oplus\mathbb{Z}$。$\partial_0\equiv0$，故 $Z_0(K)=C_0(K)$。没有 1 单形，$C_1(K)=0$，故 $B_0(K)=\operatorname{im}\partial_1=\{0\}$。于是 $H_0(K)=C_0(K)\cong\mathbb{Z}\oplus\mathbb{Z}$。对 $r\ge1$，$C_r(K)=0$，所以 $Z_r=B_r=0$，$H_r(K)=\{0\}$；$r<0$ 时按定义为 $0$。这就是 \eqref{3.34}。

几何上：两个点是两个连通分支，各贡献一个 $\mathbb{Z}$（与 \sref{C3.1} 一致）。`}>
        <Tx>{R`设 $K=\{p_0,p_1\}$ 是由两个 0 单形构成的单纯复形。证明`}</Tx>
        <Eq n="3.34" say="两个孤立点：零维同调群是两份整数（两个连通分支），更高维全为零。">{R`H_r(K)=\begin{cases}\mathbb{Z}\oplus\mathbb{Z}&(r=0)\\ \{0\}&(r\neq0).\end{cases}`}</Eq>
      </Exercise>

      <Box kind="example" n="3.7" title="一条线段">
        <Tx>{R`设 $K=\{p_0,p_1,(p_0p_1)\}$，则

$$C_0(K)=\{ip_0+jp_1\mid i,j\in\mathbb{Z}\},\qquad C_1(K)=\{k(p_0p_1)\mid k\in\mathbb{Z}\}.$$

**$H_1$。**$(p_0p_1)$ 不是 $K$ 中任何单形的边界，$B_1(K)=\{0\}$，所以 $H_1(K)=Z_1(K)/B_1(K)=Z_1(K)$。若 $z=m(p_0p_1)\in Z_1(K)$，则

$$\partial_1z=m\,\partial_1(p_0p_1)=m\{p_1-p_0\}=mp_1-mp_0=0,$$

只能 $m=0$。于是 $Z_1(K)=0$，`}</Tx>
        <Eq n="3.35" say="线段上没有非零的一维闭链：它有两个端点，封不起来。">{R`H_1(K)=0.`}</Eq>
        <Tx>{R`**$H_0$。**$Z_0(K)=C_0(K)=\{ip_0+jp_1\}$，而

$$B_0(K)=\operatorname{im}\partial_1=\{\partial_1i(p_0p_1)\mid i\in\mathbb{Z}\}=\{i(p_0-p_1)\mid i\in\mathbb{Z}\}.$$

定义满同态 $f:Z_0(K)\to\mathbb{Z}$，$f(ip_0+jp_1)=i+j$（"系数和"）。则 $\ker f=f^{-1}(0)=B_0(K)$（系数和为零 ⇔ 形如 $i(p_0-p_1)$）。由同态基本定理 $Z_0(K)/\ker f\cong\operatorname{im}f=\mathbb{Z}$，即`}</Tx>
        <Eq n="3.36" say="线段是连通的，两个端点被那条边“粘成同一类”，零维同调群只剩一份整数。">{R`H_0(K)=Z_0(K)/B_0(K)\cong\mathbb{Z}.`}</Eq>
        <Tx>{R`**解读**：$p_1-p_0=\partial_1(p_0p_1)$ 是边缘，所以 $[p_0]=[p_1]$——两个端点在同调意义下是"同一个点"。`}</Tx>
      </Box>

      <Box kind="example" n="3.8" title={R`三角形的三边：圆周 $S^1$`}>
        <Tx>{R`设 $K=\{p_0,p_1,p_2,(p_0p_1),(p_1p_2),(p_2p_0)\}$（\figref{3.7}(b)），它是 $S^1$ 的三角剖分。

**$H_1$。**没有 2 单形，所以 $B_1(K)=0$，$H_1(K)=Z_1(K)/B_1(K)=Z_1(K)$。设 $z=i(p_0p_1)+j(p_1p_2)+k(p_2p_0)\in Z_1(K)$（$i,j,k\in\mathbb{Z}$），要求

$$\begin{aligned}\partial_1z&=i(p_1-p_0)+j(p_2-p_1)+k(p_0-p_2)\\ &=(k-i)p_0+(i-j)p_1+(j-k)p_2=0.\end{aligned}$$

这只在 $i=j=k$ 时成立，因此 $Z_1(K)=\{i\{(p_0p_1)+(p_1p_2)+(p_2p_0)\}\mid i\in\mathbb{Z}\}$。它同构于 $\mathbb{Z}$，于是`}</Tx>
        <Eq n="3.37" keyEq title={R`$H_1(S^1)$`} say={R`圆周有一个“绕一圈”的闭链，它不是任何东西的边界；绕 $i$ 圈对应整数 $i$。`}>{R`H_1(K)=Z_1(K)\cong\mathbb{Z}.`}</Eq>
        <Tx>{R`**$H_0$。**$Z_0(K)=C_0(K)$，而

$$\begin{aligned}B_0(K)&=\{\partial_1[l(p_0p_1)+m(p_1p_2)+n(p_2p_0)]\mid l,m,n\in\mathbb{Z}\}\\ &=\{(n-l)p_0+(l-m)p_1+(m-n)p_2\mid l,m,n\in\mathbb{Z}\}.\end{aligned}$$

定义满同态 $f:Z_0(K)\to\mathbb{Z}$，$f(ip_0+jp_1+kp_2)=i+j+k$。可以验证 $\ker f=f^{-1}(0)=B_0(K)$：$B_0$ 中元素的系数和 $(n-l)+(l-m)+(m-n)=0$；反之系数和为零的 $ip_0+jp_1+kp_2$ 取 $l=-i$、$m=-i-j$、$n=0$ 即可写成上式。由同态基本定理，`}</Tx>
        <Eq n="3.38" say="三角形的边是连通的，零维同调群为整数。">{R`H_0(K)=Z_0(K)/B_0(K)\cong\mathbb{Z}.`}</Eq>
        <Tx>{R`$K$ 是圆周 $S^1$ 的三角剖分，\eqref{3.37} 与 \eqref{3.38} 就是 $S^1$ 的同调群。`}</Tx>
      </Box>
      <Exercise n="3.2" title="正方形的四边" level="★"
        hint={R`仿照例 3.8：写 $z=i(p_0p_1)+j(p_1p_2)+k(p_2p_3)+l(p_3p_0)$，解 $\partial_1z=0$。`}
        solution={R`**$H_1$**：没有 2 单形，$B_1=0$，$H_1=Z_1$。设 $z=i(p_0p_1)+j(p_1p_2)+k(p_2p_3)+l(p_3p_0)$，则

$$\partial_1z=(l-i)p_0+(i-j)p_1+(j-k)p_2+(k-l)p_3,$$

为零当且仅当 $i=j=k=l$。所以 $Z_1(K)=\{i[(p_0p_1)+(p_1p_2)+(p_2p_3)+(p_3p_0)]\}\cong\mathbb{Z}$，$H_1(K)\cong\mathbb{Z}$。

**$H_0$**：$Z_0=C_0\cong\mathbb{Z}^4$；系数和 $f(ip_0+jp_1+kp_2+lp_3)=i+j+k+l$ 是满同态，$B_0$ 中元素系数和为零；反之系数和为零的 0 链 $\sum n_ip_i=n_1(p_1-p_0)+n_2(p_2-p_0)+n_3(p_3-p_0)$，而 $p_1-p_0=\partial_1(p_0p_1)$、$p_2-p_0=\partial_1[(p_0p_1)+(p_1p_2)]$、$p_3-p_0=-\partial_1(p_3p_0)$ 都是边缘。故 $\ker f=B_0$，$H_0(K)\cong\mathbb{Z}$。

与例 3.8 完全相同——尽管 $C_1$ 从 $\mathbb{Z}^3$ 变成了 $\mathbb{Z}^4$。这正是 \sref{T3.4} 所预言的：三角形的边与正方形的边同胚。`}>
        {R`设 $K=\{p_0,p_1,p_2,p_3,(p_0p_1),(p_1p_2),(p_2p_3),(p_3p_0)\}$，其多面体是正方形的四边。验证它的同调群与例 3.8 相同。`}
      </Exercise>

      <Box kind="example" n="3.9" title={R`实心三角形：圆盘`}>
        <Tx>{R`设 $K=\{p_0,p_1,p_2,(p_0p_1),(p_1p_2),(p_2p_0),(p_0p_1p_2)\}$（\figref{3.6}(b)）。0 单形与 1 单形的结构与例 3.8 相同，所以`}</Tx>
        <Eq n="3.39" say="实心三角形仍是连通的。">{R`H_0(K)\cong\mathbb{Z}.`}</Eq>
        <Tx>{R`**$H_1$。**由上例，$Z_1(K)=\{i\{(p_0p_1)+(p_1p_2)+(p_2p_0)\}\mid i\in\mathbb{Z}\}$。设 $c=m(p_0p_1p_2)\in C_2(K)$，则 $b=\partial_2c\in B_1(K)$ 为

$$\begin{aligned}b&=m\{(p_1p_2)-(p_0p_2)+(p_0p_1)\}\\ &=m\{(p_0p_1)+(p_1p_2)+(p_2p_0)\}\qquad m\in\mathbb{Z}.\end{aligned}$$

这说明 $Z_1(K)=B_1(K)$——**每个**闭链都是边缘，于是`}</Tx>
        <Eq n="3.40" title="圆盘没有一维的洞" say="填上内部之后，绕一圈的闭链变成了三角形内部的边界，同调类变为零。">{R`H_1(K)=Z_1(K)/B_1(K)\cong\{0\}.`}</Eq>
        <Tx>{R`**$H_2$。**没有 3 单形，$B_2(K)=\{0\}$，$H_2(K)=Z_2(K)/B_2(K)=Z_2(K)$。设 $z=m(p_0p_1p_2)\in Z_2(K)$。由 $\partial_2z=m\{(p_1p_2)-(p_0p_2)+(p_0p_1)\}=0$ 知 $m=0$，因此 $Z_2(K)=\{0\}$，`}</Tx>
        <Eq n="3.41" say="一个实心三角形本身有边界，不是二维闭链，所以二维同调群为零。">{R`H_2(K)\cong\{0\}.`}</Eq>
        <Tx>{R`对照例 3.8 与例 3.9：两者只差一个 2 单形，而正是它让 $H_1$ 从 $\mathbb{Z}$ 变成 $0$——这就是本章开头 \figref{3.1} 的精确表述。`}</Tx>
      </Box>
      <Erratum kind="erratum" loc="p.129 例 3.9" title={R`"$Z_1(K)\cong B_1(K)$" 应为等号；"$Z_1(K)=\{0\}$" 应为 $Z_2(K)=\{0\}$`}>{R`**(1)** 原书写"这说明 $Z_1(K)\cong B_1(K)$，因此 $H_1(K)\cong\{0\}$"。仅有**同构**推不出商群平凡：例如 $2\mathbb{Z}\cong\mathbb{Z}$，但 $\mathbb{Z}/2\mathbb{Z}\cong\mathbb{Z}_2\neq\{0\}$。上面的计算实际证明的是**相等** $Z_1(K)=B_1(K)$（两者都是 $\{m[(p_0p_1)+(p_1p_2)+(p_2p_0)]\}$），本站已直接写成等号。

**(2)** 计算 $H_2$ 时原书写"Hence, $Z_1(K)=\{0\}$"，这是笔误：刚刚证明的是 2 维闭链 $m(p_0p_1p_2)$ 必须 $m=0$，即 $Z_2(K)=\{0\}$，与紧接着的 \eqref{3.41} 一致。`}</Erratum>

      <Exercise n="3.3" title={R`四面体表面：球面 $S^2$`} level="★★"
        hint={R`$H_0$ 用连通性。$H_2$：设 $z=\sum m_i\sigma_{2,i}$，每条棱恰在两个三角形中，$\partial_2z=0$ 给出 $m$ 之间的关系。$H_1$：先证每个 1 闭链都同调于"不经过 $p_0$"的闭链，再证后者是边缘；或直接用 Euler–Poincaré 定理检验秩。`}
        solution={R`**$H_0\cong\mathbb{Z}$**：$K$ 连通（任意两顶点有棱相连），由 \sref{T3.5}。

**$H_2\cong\mathbb{Z}$**：没有 3 单形，$H_2=Z_2$。设 $z=a(p_0p_1p_2)+b(p_0p_1p_3)+c(p_0p_2p_3)+d(p_1p_2p_3)$。逐条棱读 $\partial_2z$ 的系数：$(p_0p_1)$：$a+b$；$(p_0p_2)$：$-a+c$；$(p_0p_3)$：$-b-c$；$(p_1p_2)$：$a+d$；$(p_1p_3)$：$b-d$；$(p_2p_3)$：$c+d$。令其全为零得 $b=-a$、$c=a$、$d=-a$。故 $Z_2(K)=\{m[(p_0p_1p_2)-(p_0p_1p_3)+(p_0p_2p_3)-(p_1p_2p_3)]\mid m\in\mathbb{Z}\}\cong\mathbb{Z}$——生成元正是 $\partial_3(p_0p_1p_2p_3)$ 的负元，即"带一致定向的整个球面"。

**$H_1\cong\{0\}$**：设 $z\in Z_1(K)$，记 $x$ 为 $z$ 中 $(p_0p_1)$ 的系数。令 $z'=z-x\,\partial_2(p_0p_1p_3)$，由于 $\partial_2(p_0p_1p_3)=(p_1p_3)-(p_0p_3)+(p_0p_1)$，$z'$ 中 $(p_0p_1)$ 的系数为零。再记 $y$ 为 $z'$ 中 $(p_0p_2)$ 的系数，令 $z''=z'-y\,\partial_2(p_0p_2p_3)$，于是 $(p_0p_2)$ 的系数也为零。$z''$ 与 $z$ 同调，仍是闭链；它在 $p_0$ 处的边界只能来自 $(p_0p_3)$，所以 $(p_0p_3)$ 的系数也必为零。剩下的 $z''$ 只含三角形 $p_1p_2p_3$ 的三条边，与例 3.8 一样必为 $k[(p_1p_2)+(p_2p_3)+(p_3p_1)]=k\,\partial_2(p_1p_2p_3)$。因此每个 1 闭链都是边缘，$Z_1=B_1$，$H_1(K)=\{0\}$。

**检验**：$\chi=4-6+4=2=b_0-b_1+b_2=1-0+1$（\sref{T3.7}）。$K$ 是 $S^2$ 的三角剖分，\eqref{3.42} 就是 $S^2$ 的同调群。`}>
        <Tx>{R`设 $K=\{p_0,p_1,p_2,p_3,(p_0p_1),(p_0p_2),(p_0p_3),(p_1p_2),(p_1p_3),(p_2p_3),(p_0p_1p_2),(p_0p_1p_3),(p_0p_2p_3),(p_1p_2p_3)\}$，其多面体是四面体的表面。验证`}</Tx>
        <Eq n="3.42" keyEq title={R`$S^2$ 的同调群`} say={R`球面：连通（$H_0\cong\mathbb{Z}$）、任何闭路都是边界（$H_1=0$）、整个球面本身是一个不是边界的二维闭链（$H_2\cong\mathbb{Z}$）。`}>{R`H_0(K)\cong\mathbb{Z}\qquad H_1(K)\cong\{0\}\qquad H_2(K)\cong\mathbb{Z}.`}</Eq>
        <Tx>{R`$K$ 是球面 $S^2$ 的三角剖分，\eqref{3.42} 给出 $S^2$ 的同调群。`}</Tx>
      </Exercise>
      <Table head={["复形", R`$H_0$`, R`$H_1$`, R`$H_2$`, "要点"]} rows={[
        [R`点（例 3.6）`, R`$\mathbb{Z}$`, "—", "—", R`$B_0=0$`],
        [R`两点（习题 3.1）`, R`$\mathbb{Z}\oplus\mathbb{Z}$`, R`$0$`, "—", "两个连通分支"],
        [R`线段（例 3.7）`, R`$\mathbb{Z}$`, R`$0$`, "—", R`$p_1-p_0$ 是边缘`],
        [R`$S^1$（例 3.8、习题 3.2）`, R`$\mathbb{Z}$`, R`$\mathbb{Z}$`, "—", "绕一圈的闭链不是边缘"],
        [R`圆盘（例 3.9）`, R`$\mathbb{Z}$`, R`$0$`, R`$0$`, R`$Z_1=B_1$`],
        [R`$S^2$（习题 3.3）`, R`$\mathbb{Z}$`, R`$0$`, R`$\mathbb{Z}$`, "球面本身是 2 闭链"],
      ]} caption="§3.3.3 的计算结果一览。" />
    </Sub>);
}
