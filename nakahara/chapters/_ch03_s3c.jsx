import { FoundationsRedraw } from "./_redraw_foundations.jsx";
// §3.3.4 H0 的计算、§3.3.5 更多同调计算 —— 式 (3.43)–(3.51)，定理 3.5，例 3.10–3.13，图 3.8–3.12
import { Sub, Tx, Eq, Box, Figure, Stmt, Proof, Erratum, Details, Table, C } from "@kit";
import { ChainLab } from "./_ch03_demos.jsx";

const R = String.raw;

export function Sub334() {
  return (
    <Sub n="3.3.4" title={R`Computation of $H_0(K)$`} zh={R`$H_0(K)$ 的计算`}>
      <Tx>{R`例 3.6–3.9 与习题 3.2、3.3 的零维同调群都是 $H_0(K)\cong\mathbb{Z}$（习题 3.1 的两个孤立点除外）。这些复形的共同点是什么？答案是**连通**：`}</Tx>
      <Stmt id="T3.5">
        <Eq n="3.43" keyEq title={R`连通 $\Rightarrow H_0\cong\mathbb{Z}$`} say="连通复形的所有顶点都同调，零维同调群只剩一个生成元：任意一个顶点的类。">{R`H_0(K)\cong\mathbb{Z}.`}</Eq>
        <Proof steps={[
          { claim: R`**任意两个顶点同调。**$K$ 连通，所以对任意两个 0 单形 $p_i,p_j$，存在一串 1 单形 $(p_ip_k),(p_kp_l),\ldots,(p_mp_j)$ 把它们连起来，且`, tex: R`\partial_1\big((p_ip_k)+(p_kp_l)+\cdots+(p_mp_j)\big)=p_j-p_i`, why: R`中间顶点成对相消（与 \figref{3.7}(a) 的论证相同）。因此 $p_i\sim p_j$，$[p_i]=[p_j]$；特别地每个顶点都同调于 $p_1$。` },
          { claim: R`设 $z=\sum_{i=1}^{I_0}n_ip_i\in Z_0(K)$（$I_0$ 为顶点数），它的同调类由一个点生成：`, tex: R`[z]=\Big[\sum_in_ip_i\Big]=\sum_in_i[p_i]=\sum_in_i[p_1]`, uses: ["3.3"] },
          { claim: R`**若 $\sum n_i=0$ 则 $z\in B_0(K)$。**`, tex: R`z=\sum_in_i(p_i-p_1)+\Big(\sum_in_i\Big)p_1=\sum_in_i(p_i-p_1)`, why: R`每个 $p_i-p_1$ 都是上一步路径链的边界，所以 $z$ 是边缘的整系数组合，仍是边缘。`, fill: true },
          { claim: R`**反之，边缘的系数和为零。**设 $\sigma_j=(p_{j,1}p_{j,2})$（$1\le j\le I_1$）为全部 1 单形，则`, tex: R`B_0(K)=\{n_1(p_{1,2}-p_{1,1})+\cdots+n_{I_1}(p_{I_1,2}-p_{I_1,1})\mid n_1,\ldots,n_{I_1}\in\mathbb{Z}\}`, why: R`每个 $n_j$ 都以 $+n_j$ 与 $-n_j$ 成对出现，所以 $\sum_jn_jp_j\in B_0(K)\Rightarrow\sum_jn_j=0$。` },
          { claim: R`所以对连通复形：$z=\sum n_ip_i\in B_0(K)\iff\sum n_i=0$。定义满同态 $f:Z_0(K)\to\mathbb{Z}$：`, tex: R`f(n_1p_1+\cdots+n_{I_0}p_{I_0})=\sum_{i=1}^{I_0}n_i,\qquad\ker f=f^{-1}(0)=B_0(K)` },
          { claim: R`由同态基本定理：`, tex: R`H_0(K)=Z_0(K)/B_0(K)=Z_0(K)/\ker f\cong\operatorname{im}f=\mathbb{Z}`, uses: ["T3.1"] },
        ]} />
      </Stmt>
      <Box kind="physics" title="零维同调与守恒荷">{R`"系数和" $f$ 有一个物理的读法：把 0 链看成放在顶点上的整数电荷，1 单形是"把一个单位电荷从一端搬到另一端"的操作。边缘 $\partial_1(p_ip_j)=p_j-p_i$ 正是一次搬运，它不改变总电荷。$H_0\cong\mathbb{Z}$ 说：在连通空间里，**唯一**搬不掉的信息就是总电荷——它是守恒量。若空间有 $N$ 个分支，每个分支的电荷分别守恒，于是 $H_0\cong\mathbb{Z}^N$（\sref{C3.1}）。`}</Box>
    </Sub>);
}

export function Sub335() {
  return (
    <Sub n="3.3.5" title="More homology computations" zh="更多同调计算">
      <p className="muted">本小节概念：<C id="torsion" /></p>
      <Tx>{R`接下来的两个例子是**不可定向**空间：Möbius 带与射影平面。它们会展示两件新鲜事：边界可以"绕两圈"；同调群可以有**挠**。`}</Tx>
      <Box kind="example" n="3.10" title="Möbius 带">
        <Tx>{R`\figref{3.8} 是 Möbius 带的三角剖分：长条的左边 $p_0\to p_1$（向下）与右边 $p_1\leftarrow p_0$（向上）按箭头**反向**粘合。共 6 个顶点、12 条棱、6 个三角形。显然 $B_2(K)=0$。取闭链 $z\in Z_2(K)$：

$$\begin{aligned}z=\ &i(p_0p_1p_2)+j(p_2p_1p_4)+k(p_2p_4p_3)\\ &+l(p_3p_4p_5)+m(p_3p_5p_1)+n(p_1p_5p_0).\end{aligned}$$

它满足

$$\begin{aligned}\partial_2z=\ &i\{(p_1p_2)-(p_0p_2)+(p_0p_1)\}+j\{(p_1p_4)-(p_2p_4)+(p_2p_1)\}\\ &+k\{(p_4p_3)-(p_2p_3)+(p_2p_4)\}+l\{(p_4p_5)-(p_3p_5)+(p_3p_4)\}\\ &+m\{(p_5p_1)-(p_3p_1)+(p_3p_5)\}+n\{(p_5p_0)-(p_1p_0)+(p_1p_5)\}=0.\end{aligned}$$

$(p_0p_2)$、$(p_1p_4)$、$(p_2p_3)$、$(p_4p_5)$、$(p_3p_1)$、$(p_5p_0)$——即长条上下两条边上的 6 条棱——各在 $\partial_2z$ 中**只出现一次**，所以所有系数必须为零：$i=j=k=l=m=n=0$。于是 $Z_2(K)=\{0\}$，`}</Tx>
        <Eq n="3.44" say="Möbius 带有边界，没有任何非零的二维闭链。">{R`H_2(K)=Z_2(K)/B_2(K)\cong\{0\}.`}</Eq>
        <Tx>{R`**$H_1$：用直觉代替繁琐计算。**找出"走完整一圈"的闭路。其中一条是沿中线的

$$z=(p_0p_1)+(p_1p_4)+(p_4p_5)+(p_5p_0).$$

其他绕一圈的闭路都同调于 $z$ 的倍数。例如取 $z'=(p_1p_2)+(p_2p_3)+(p_3p_5)+(p_5p_1)$，则 $z\sim z'$，因为

$$z-z'=\partial_2\{(p_2p_1p_4)+(p_2p_4p_3)+(p_3p_4p_5)+(p_1p_5p_0)\}.$$

但若取沿**边界**走一圈的

$$z''=(p_1p_4)+(p_4p_5)+(p_5p_0)+(p_0p_2)+(p_2p_3)+(p_3p_1),$$

则 $z''\sim2z$，因为

$$\begin{aligned}2z-z''&=2(p_0p_1)+(p_1p_4)+(p_4p_5)+(p_5p_0)-(p_0p_2)-(p_2p_3)-(p_3p_1)\\ &=\partial_2\{(p_0p_1p_2)+(p_1p_4p_2)+(p_2p_4p_3)+(p_3p_4p_5)+(p_3p_5p_1)+(p_0p_1p_5)\}.\end{aligned}$$

可以验证所有闭路都同调于某个 $nz$（$n\in\mathbb{Z}$）。$H_1(K)$ 由一个元素 $[z]$ 生成：`}</Tx>
        <Eq n="3.45" say="Möbius 带的一维同调由中线生成，是一份整数；它的边界同调于中线绕两圈。">{R`H_1(K)=\{i[z]\mid i\in\mathbb{Z}\}\cong\mathbb{Z}.`}</Eq>
        <Tx>{R`$K$ 连通，由 \sref{T3.5}，$H_0(K)=\{i[p_a]\mid i\in\mathbb{Z}\}\cong\mathbb{Z}$，$p_a$ 是 $K$ 的任意一个 0 单形。

**解读**：Möbius 带的边界只有**一条**闭曲线，它沿长条走了两遍，同调于 $2z$。若是普通圆柱面，上下两条边界各同调于 $\pm z$。这个"2"是不可定向性的第一个代数痕迹。`}</Tx>
      </Box>
      <Figure n="3.8" illustration={<FoundationsRedraw n="3.8"/>} caption={R`Möbius 带的三角剖分。`} width="75%" />
      <Details summary={R`"所有闭路都同调于 $nz$"的严格验证（本站补充）`}>{R`原书说"容易验证"。分两步。

**(1) $H_1\cong\mathbb{Z}$。**用秩来数：$I_0=6$、$I_1=12$、$I_2=6$。$K$ 连通，$\operatorname{rank}\partial_1=I_0-1=5$，所以 $\operatorname{rank}Z_1=12-5=7$。$Z_2=0$ 说明 $\partial_2$ 是单射，$\operatorname{rank}B_1=6$。因此 $H_1$ 的秩为 $7-6=1$。$\partial_2$ 的 Smith 标准形对角元全是 $1$（见 \secref{3.4.3} 的交互计算器），所以没有挠：$H_1\cong\mathbb{Z}$。

**(2) $[z]$ 是生成元，而不是某个生成元的倍数。**构造一个"截线计数"同态 $\theta:C_1(K)\to\mathbb{Z}$：在 $(p_0p_2)$、$(p_1p_2)$、$(p_1p_4)$ 上取值 $1$，其余棱取值 $0$。这三条棱正是从上边缘穿到下边缘的一条短截线所穿过的棱。逐个检查含这些棱的三角形：$\theta(\partial_2(p_0p_1p_2))=\theta(p_1p_2)-\theta(p_0p_2)=0$，$\theta(\partial_2(p_2p_1p_4))=\theta(p_1p_4)-\theta(p_1p_2)=0$，其余三角形不含这些棱。所以 $\theta$ 在所有边缘上为零，诱导出同态 $H_1(K)\to\mathbb{Z}$。而 $\theta(z)=\theta(p_1p_4)=1$：若 $[z]=k[g]$，则 $1=k\,\theta(g)$，只能 $k=\pm1$。所以 $[z]$ 生成 $H_1(K)$。顺带地 $\theta(z'')=\theta(p_1p_4)+\theta(p_0p_2)=2$，与 $z''\sim2z$ 吻合。

想要亲手试：在下面"链与同调类"交互图里选 Möbius 带，画出任意闭路，它会告诉你这条闭路同调于几倍的 $z$。`}</Details>

      <Box kind="example" n="3.11" title={R`射影平面 $\sym{RP}{\mathbb{R}P^2}$`}>
        <Tx>{R`射影平面 $\sym{RP}{\mathbb{R}P^2}$ 在第 2 章例 2.5(c) 中定义为把对径点粘合的球面 $S^2$。作为陪集空间，也可以取半球面（或圆盘 $D^2$），把边界 $S^1$ 上的对径点粘合（第 2 章图 2.5(b)）。\figref{3.9} 是射影平面的三角剖分：外围六边形的对边按箭头粘合，$p_3,p_4,p_5$ 各出现两次。共 6 个顶点、15 条棱、10 个三角形。显然 $B_2(K)=\{0\}$。取闭链 $z\in Z_2(K)$：

$$\begin{aligned}z=\ &m_1(p_0p_1p_2)+m_2(p_0p_4p_1)+m_3(p_0p_5p_4)+m_4(p_0p_3p_5)+m_5(p_0p_2p_3)\\ &+m_6(p_2p_4p_3)+m_7(p_2p_5p_4)+m_8(p_2p_1p_5)+m_9(p_1p_3p_5)+m_{10}(p_1p_4p_3).\end{aligned}$$

它的边界为

$$\begin{aligned}\partial_2z=\ &m_1\{(p_1p_2)-(p_0p_2)+(p_0p_1)\}+m_2\{(p_4p_1)-(p_0p_1)+(p_0p_4)\}\\ &+m_3\{(p_5p_4)-(p_0p_4)+(p_0p_5)\}+m_4\{(p_3p_5)-(p_0p_5)+(p_0p_3)\}\\ &+m_5\{(p_2p_3)-(p_0p_3)+(p_0p_2)\}+m_6\{(p_4p_3)-(p_2p_3)+(p_2p_4)\}\\ &+m_7\{(p_5p_4)-(p_2p_4)+(p_2p_5)\}+m_8\{(p_1p_5)-(p_2p_5)+(p_2p_1)\}\\ &+m_9\{(p_3p_5)-(p_1p_5)+(p_1p_3)\}+m_{10}\{(p_4p_3)-(p_1p_3)+(p_1p_4)\}=0.\end{aligned}$$

逐条棱看系数。例如 $(p_0p_1)$ 的系数是 $(m_1-m_2)$，故 $m_1-m_2=0$。类似地

$$\begin{aligned}&-m_1+m_5=0,\ m_4-m_5=0,\ m_2-m_3=0,\ m_1-m_8=0,\\ &m_9-m_{10}=0,\ -m_2+m_{10}=0,\ m_5-m_6=0,\ m_6-m_7=0,\\ &m_6+m_{10}=0.\end{aligned}$$

前九个条件说明十个 $m_i$ 全都相等，最后一个 $m_6+m_{10}=0$ 则给出 $2m_i=0$。所以这十个条件成立当且仅当 $m_i=0$（$1\le i\le10$）。闭链群 $Z_2(K)$ 平凡，`}</Tx>
        <Eq n="3.46" say="射影平面没有非零的二维闭链：它是闭曲面，却“包不住”任何东西——这是不可定向的标志。">{R`H_2(K)=Z_2(K)/B_2(K)\cong\{0\}.`}</Eq>
        <Tx>{R`**换个角度看 $H_2$——这会大大简化 $H_1$ 的计算。**把所有 2 单形以相同系数相加：$z\equiv\sum_{i=1}^{10}m\sigma_{2,i}$（$m\in\mathbb{Z}$）。$K$ 的每个 1 单形恰好是两个 2 单形的公共面。内部的棱在相邻两个三角形中方向相反而相消；外围六边形的棱被粘合后，在两个三角形中却以**相同**方向出现。于是`}</Tx>
        <Eq n="3.47" keyEq title="所有三角形之和的边界" say="把射影平面的十个三角形全部加起来，内部棱相消，外围的三条棱各被走了两遍、方向相同：边界是绕外圈闭路的两倍。">{R`\partial_2z=2m(p_3p_5)+2m(p_5p_4)+2m(p_4p_3).`}</Eq>
        <Tx>{R`因此若 $z\in Z_2(K)$，$m$ 必须为零，$Z_2(K)=\{0\}$，与前面一致。\eqref{3.47} 也告诉我们 $H_1(K)$：任何 1 闭链都同调于下面这条闭链的倍数（参见例 3.10 的做法）：

$$z=(p_3p_5)+(p_5p_4)+(p_4p_3).$$

而 \eqref{3.47} 说明 $z$ 的**偶数倍**是 2 链的边界。所以 $z$ 是闭链，且 $z+z$ 同调于 $0$。于是`}</Tx>
        <Eq n="3.48" keyEq title={R`$H_1(\sym{RP}{\mathbb{R}P^2})=\mathbb{Z}_2$`} say="射影平面上有一条闭路，它自己不是边界，但绕两次就成了边界：一维同调群是二元循环群。">{R`H_1(K)=\{[z]\mid[z]+[z]\sim[0]\}\cong\mathbb{Z}_2.`}</Eq>
        <Tx>{R`这个例子说明：**同调群不一定是自由 Abel 群，它可以具有有限生成 Abel 群的全部结构**（\eqref{3.10}）。$K$ 连通，$H_0(K)\cong\mathbb{Z}$。

**为什么 $z$ 本身不是边缘？**若 $z=\partial_2c$，$c=\sum m_i\sigma_{2,i}$，那么内部棱的系数为零迫使所有 $m_i$ 相等（同上面的论证），于是 $\partial_2c=2m\,z\neq z$——方程 $2m=1$ 没有**整数**解。这就是挠的来源：在有理数里 $z=\partial_2(\tfrac12\sum\sigma_{2,i})$ 是边缘，在整数里不是。`}</Tx>
      </Box>
      <Figure n="3.9" illustration={<FoundationsRedraw n="3.9"/>} caption={R`射影平面的三角剖分。`} width="55%" />

      <Tx>{R`把例 3.11 与下面两个例子比较很有意思。在这两个例子中，我们用本节培养的"边界与闭链"的直觉来得到结果，而不做直截了当但繁琐的计算（本站的交互计算器会替你把繁琐计算做完）。`}</Tx>
      <Box kind="example" n="3.12" title={R`环面 $T^2$ 与亏格 $g$ 的曲面 $\Sigma_g$`}>
        <Tx>{R`$T^2$ 同调群的形式推导留给读者（例如见 Fraleigh 1976）；这里正好回顾同调群的直观意义：**第 $r$ 同调群由那些没有边界、自身又不是某个 $(r+1)$ 链之边界的 $r$ 链生成**。

**$H_2$。**环面的表面没有边界，但它不是任何 3 链的边界。所以 $H_2(T^2)$ 由一个生成元——曲面本身——自由生成，$H_2(T^2)\cong\mathbb{Z}$。

**$H_1$。**\figref{3.10} 中的闭路 $a$、$b$ 都没有边界，也都不是 2 链的边界。再取一条闭路 $a'$，它与 $a$ 同调，因为 $a'-a$ 恰好是图中阴影区域的边界。所以 $H_1(T^2)$ 由 $a$ 与 $b$ 自由生成，$H_1(T^2)\cong\mathbb{Z}\oplus\mathbb{Z}$。$T^2$ 连通，$H_0(T^2)\cong\mathbb{Z}$。

**推广到亏格 $g$。**亏格 $g$ 的闭曲面 $\Sigma_g$ 没有边界，也没有 3 单形，所以曲面 $\Sigma_g$ 本身自由生成 $H_2(\Sigma_g)\cong\mathbb{Z}$。第一同调群 $H_1(\Sigma_g)$ 由那些不是任何区域边界的闭路生成，\figref{3.11} 给出了生成元的标准选取。我们得到`}</Tx>
        <Eq n="3.49" keyEq title={R`$H_1(\Sigma_g)$`} say={R`亏格 $g$ 的曲面上，每个环柄贡献两条独立的、不是边界的闭路（绕柄与穿柄），一维同调群是 $2g$ 份整数。`}>{R`\begin{aligned}H_1(\Sigma_g)&=\{i_1[a_1]+j_1[b_1]+\cdots+i_g[a_g]+j_g[b_g]\}\\ &\cong\underbrace{\mathbb{Z}\oplus\mathbb{Z}\oplus\cdots\oplus\mathbb{Z}}_{2g}.\end{aligned}`}</Eq>
        <Tx>{R`$\Sigma_g$ 连通，$H_0(\Sigma_g)\cong\mathbb{Z}$。$a_i$（$b_i$）同调于第 2 章 \figref{2.12} 中多边形的棱 $a_i$（$b_i$）。这 $2g$ 条曲线 $\{a_i,b_i\}$ 称为 $\Sigma_g$ 上的**典范曲线组**（canonical system of curves）。`}</Tx>
      </Box>
      <Figure n="3.10" illustration={<FoundationsRedraw n="3.10"/>} caption={R`$a'$ 与 $a$ 同调，但 $b$ 与 $a$ 不同调。$a$ 与 $b$ 生成 $H_1(T^2)$。`} width="45%" />
      <Figure n="3.11" illustration={<FoundationsRedraw n="3.11"/>} caption={R`$a_i$ 与 $b_i$（$1\le i\le g$）生成 $H_1(\Sigma_g)$。`} width="90%" />
      <Erratum kind="erratum" loc="p.135 第 2 段" title={R`"$H_2(T^2)\cong\mathbb{Z}$" 应为 $H_2(\Sigma_g)\cong\mathbb{Z}$`}>{R`原书在讨论亏格 $g$ 的曲面时写"the surface $\Sigma_g$ itself freely generates $H_2(T^2)\cong\mathbb{Z}$"。这里讨论的是 $\Sigma_g$，结论应为 $H_2(\Sigma_g)\cong\mathbb{Z}$（$T^2$ 只是 $g=1$ 的特例）。本站正文已改正。交互计算器中"球面 + $h$ 个环柄"的构造对 $h=1,2,3,4$ 实际算出 $H_2\cong\mathbb{Z}$、$H_1\cong\mathbb{Z}^{2h}$。`}</Erratum>

      <Box kind="example" n="3.13" title="Klein 瓶">
        <Tx>{R`\figref{3.12} 是 Klein 瓶的三角剖分：左右两边同向粘合（都是 $b$，向上），上下两边**反向**粘合（上边 $p_0p_1p_2p_0$ 向右，下边读作 $p_0p_2p_1p_0$，箭头向左）。内部的 4 个顶点原图未标号。计算与射影平面大同小异。

**$H_2$。**$B_2(K)=0$，$H_2(K)=Z_2(K)$。设 $z\in Z_2(K)$。若 $z=\sum m\sigma_{2,i}$ 是所有 2 单形以相同系数之和（按图中统一的绕向），内部的 1 单形全部相消，只剩外围的 1 单形：

$$\partial_2z=-2ma,\qquad a=(p_0p_1)+(p_1p_2)+(p_2p_0).$$

左右两边的 $b$ 方向相同、在绕外圈时一上一下，相互抵消；上下两边的 $a$ 方向相反，绕外圈时却同向，叠加成 $-2a$。$\partial_2z=0$ 要求 $m=0$；而一般的 $z$ 要在内部棱处相消，就必须各三角形系数相等。所以`}</Tx>
        <Eq n="3.50" say="Klein 瓶和射影平面一样不可定向，没有非零的二维闭链。">{R`H_2(K)=Z_2(K)\cong\{0\}.`}</Eq>
        <Tx>{R`**$H_1$。**借鉴环面的经验，每个 1 闭链都同调于某个 $ia+jb$（$i,j\in\mathbb{Z}$）。要让一个 2 链的边界只由 $a$ 和 $b$ 组成，所有 2 单形必须以相同系数相加；对这样的 2 链 $z=\sum m\sigma_{2,i}$，$\partial z=-2ma$。这说明 $2ma\sim0$。所以 $H_1(K)$ 由两个闭链 $a$、$b$ 生成，且 $a+a\sim0$：`}</Tx>
        <Eq n="3.51" title={R`Klein 瓶的 $H_1$`} say={R`Klein 瓶有一条自由的闭路 $b$，还有一条绕两次才成为边界的闭路 $a$：一维同调群是整数加二元循环群。`}>{R`H_1(K)=\{i[a]+j[b]\mid i,j\in\mathbb{Z}\}\cong\mathbb{Z}_2\oplus\mathbb{Z}.`}</Eq>
        <Tx>{R`$K$ 连通，$H_0(K)\cong\mathbb{Z}$。`}</Tx>
      </Box>
      <Figure n="3.12" illustration={<FoundationsRedraw n="3.12"/>} caption={R`Klein 瓶的三角剖分。`} width="55%" />
      <Erratum kind="note" loc="p.135–136 例 3.13" title={R`$\partial_2z=-2ma$ 与 "$\partial z=2ma$" 的符号`}>{R`原书先写 $\partial_2z=-2ma$，几行后又写 $\partial z=2ma$。按图中三角形的统一绕向（逆时针），外圈下边 $p_0\to p_2\to p_1\to p_0$ 与上边（从右往左）$p_0\to p_2\to p_1\to p_0$ 都是 $-a$，正确的是 $\partial_2z=-2ma$（本站交互计算器给出 $-2(p_0p_1)-2(p_1p_2)-2(p_2p_0)$）。符号对结论 $2a\sim0$ 无影响：$-2ma$ 与 $2ma$ 同为边缘。`}</Erratum>
      <Table head={["闭曲面", R`$H_0$`, R`$H_1$`, R`$H_2$`, "全部三角形（统一绕向）之和的边界", "可定向？"]} rows={[
        [R`$S^2$（习题 3.3）`, R`$\mathbb{Z}$`, R`$\{0\}$`, R`$\mathbb{Z}$`, R`$0$`, "是"],
        [R`$T^2$（例 3.12）`, R`$\mathbb{Z}$`, R`$\mathbb{Z}\oplus\mathbb{Z}$`, R`$\mathbb{Z}$`, R`$0$`, "是"],
        [R`$\sym{RP}{\mathbb{R}P^2}$（例 3.11）`, R`$\mathbb{Z}$`, R`$\mathbb{Z}_2$`, R`$\{0\}$`, R`$2z$`, "否"],
        [R`Klein 瓶（例 3.13）`, R`$\mathbb{Z}$`, R`$\mathbb{Z}_2\oplus\mathbb{Z}$`, R`$\{0\}$`, R`$-2a$`, "否"],
      ]} caption={R`规律：闭曲面可定向 ⇔ 所有三角形能统一定向使边界全部相消 ⇔ $H_2\cong\mathbb{Z}$；不可定向时相消失败，留下"两倍的闭路"，它正是 $H_1$ 中 $\mathbb{Z}_2$ 挠的来源。`} />
      <ChainLab />
    </Sub>);
}
