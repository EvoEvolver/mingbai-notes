// §3.3 单纯复形的同调群（上）：3.3.1 定向单形、3.3.2 链群、闭链群与边缘群 —— 式 (3.13)–(3.27)，定义 3.2–3.4，引理 3.3，定理 3.3，图 3.6–3.7
// 3.3.3 在 _ch03_s3b.jsx；3.3.4–3.3.5 在 _ch03_s3c.jsx
import { Sec, Sub, Tx, Eq, Box, Figure, Derivation, Stmt, Proof, C } from "@kit";
import { BoundaryLab } from "./_ch03_demos.jsx";
import { Sub333 } from "./_ch03_s3b.jsx";
import { Sub334, Sub335 } from "./_ch03_s3c.jsx";

const R = String.raw;

export function Sec33() {
  return (
    <Sec n="3.3" title="Homology groups of simplicial complexes" zh="单纯复形的同调群"
      gist={R`给单形定向 → 链群 $C_r(K)\cong\mathbb{Z}^{I_r}$ → 边界算子 $\partial_r$ 满足 $\partial_r\partial_{r+1}=0$ → 闭链 $Z_r=\ker\partial_r$ 包含边缘 $B_r=\operatorname{im}\partial_{r+1}$ → **同调群 $H_r=Z_r/B_r$**；并在点、线段、圆周、圆盘、球面、Möbius 带、射影平面、环面、Klein 瓶上逐一算出。`}
      why={R`这是本章的核心：把"没有边界的区域"和"是边界的区域"都变成整数线性代数，再用商群把前者中"平凡"的部分（后者）除掉，剩下的就是洞。`}
      gives={["3.14", "3.20", "3.26", "3.27", "3.28", "3.43", "3.48"]}>
      <Sub331 />
      <Sub332 />
      <Sub333 />
      <Sub334 />
      <Sub335 />
    </Sec>);
}

function Sub331() {
  return (
    <Sub n="3.3.1" title="Oriented simplexes" zh="定向单形">
      <p className="muted">本小节概念：<C id="orientation" /></p>
      <Tx>{R`**为什么要定向？**我们想让"边界"成为一种可以加减的代数对象。线段从 $p_0$ 走到 $p_1$，再从 $p_1$ 走回 $p_0$，等于哪儿也没去——这要求"反着走"是"正着走"的**负元**。所以必须给单形指定方向。

对 $r\ge1$ 的 $r$ 单形可以指定**定向**（orientation）。下面用 $(\ldots)$ 表示定向单形，以区别于无定向的 $\langle\ldots\rangle$；符号 $\sigma_r$ 两种都用。定向 1 单形 $\sigma_1=(p_0p_1)$ 是从 $p_0$ 指向 $p_1$ 的有向线段（\figref{3.6}(a)）。它与 $(p_1p_0)$ 要区分开，并规定`}</Tx>
      <Eq n="3.13" say={R`反向的线段是正向线段的负元：从 $p_0$ 到 $p_1$ 再回来，等于没有走。`}>{R`(p_0p_1)=-(p_1p_0).`}</Eq>
      <Tx>{R`这里的"$-$"要按有限生成 Abel 群来理解：$(p_1p_0)$ 是 $(p_0p_1)$ 的**逆元**。从 $p_0$ 到 $p_1$ 接着从 $p_1$ 到 $p_0$ 等于原地不动，$(p_0p_1)+(p_1p_0)=0$，所以 $-(p_1p_0)=(p_0p_1)$。

类似地，定向 2 单形 $\sigma_2=(p_0p_1p_2)$ 是三角形区域 $p_0p_1p_2$ 连同沿边界的一个绕行方向（\figref{3.6}(b)）。顺序 $p_0p_1p_2$ 给出的绕向与 $p_2p_0p_1$、$p_1p_2p_0$ 相同（轮换），而与 $p_0p_2p_1$、$p_2p_1p_0$、$p_1p_0p_2$ 相反（交换两个顶点）。因此规定

$$(p_0p_1p_2)=(p_2p_0p_1)=(p_1p_2p_0)=-(p_0p_2p_1)=-(p_2p_1p_0)=-(p_1p_0p_2).$$

记 $P=\begin{pmatrix}0&1&2\\ i&j&k\end{pmatrix}$ 为 $0,1,2$ 的置换，上式可概括为 $(p_ip_jp_k)=\operatorname{sgn}(P)(p_0p_1p_2)$，其中 $P$ 为偶（奇）置换时 $\operatorname{sgn}(P)=+1\,(-1)$。定向 3 单形 $\sigma_3=(p_0p_1p_2p_3)$ 是四面体四个顶点的有序序列，对置换 $P=\begin{pmatrix}0&1&2&3\\ i&j&k&l\end{pmatrix}$ 同样定义 $(p_ip_jp_kp_l)=\operatorname{sgn}(P)(p_0p_1p_2p_3)$。`}</Tx>
      <Figure n="3.6" caption={R`(a) 定向 1 单形；(b) 定向 2 单形。`} width="75%" />
      <Tx>{R`**一般定义。**取 $\mathbb{R}^m$ 中 $r+1$ 个几何独立的点 $p_0,\ldots,p_r$，$\{p_{i_0},\ldots,p_{i_r}\}$ 是它们的一个重排。若置换 $P=\begin{pmatrix}0&1&\ldots&r\\ i_0&i_1&\ldots&i_r\end{pmatrix}$ 是偶置换，就称 $\{p_0,\ldots,p_r\}$ 与 $\{p_{i_0},\ldots,p_{i_r}\}$ 等价。这显然是等价关系，其等价类称为**定向 $r$ 单形**（oriented $r$-simplex）。等价类恰有两个：偶置换一类、奇置换一类。含 $\{p_0,\ldots,p_r\}$ 的那一类记作 $\sigma_r=(p_0p_1\ldots p_r)$，另一类记作 $-\sigma_r=-(p_0p_1\ldots p_r)$。换言之，`}</Tx>
      <Eq n="3.14" keyEq title="定向与置换的符号" say="把顶点重新排序，定向单形只会乘上该排列的符号：偶排列不变，奇排列变号。">{R`(p_{i_0}p_{i_1}\ldots p_{i_r})=\operatorname{sgn}(P)\,(p_0p_1\ldots p_r).`}</Eq>
      <Tx>{R`对 $r=0$，形式上规定定向 0 单形就是一个点 $\sigma_0=p_0$。`}</Tx>
      <Box kind="physics" title="与外微分形式的类比">{R`\eqref{3.14} 的反对称性和 $\dd x\wedge\dd y=-\dd y\wedge\dd x$ 是同一回事：定向单形是积分区域，微分形式是被积函数，二者配对 $\int_\sigma\omega$。第 6 章的 de Rham 上同调正是建立在这种配对之上，那里的 Stokes 定理 $\int_\sigma \dd\omega=\int_{\partial\sigma}\omega$ 把本章的 $\partial$ 与外微分 $\dd$ 联系起来。`}</Box>
    </Sub>);
}

function Sub332() {
  return (
    <Sub n="3.3.2" title="Chain group, cycle group and boundary group" zh="链群、闭链群与边缘群">
      <p className="muted">本小节概念：<C id="chain" /> · <C id="boundary_op" /> · <C id="cycle_boundary" /></p>
      <Tx>{R`设 $K=\{\sigma_\alpha\}$ 是 $n$ 维单纯复形。把其中的单形都看作定向单形，仍记作 $\sigma_\alpha$（每个单形任意选定一个定向即可；换一个定向只是把对应的基元素乘 $-1$，不影响后面的任何群）。

**链群：把单形当作基向量。**`}</Tx>
      <Stmt id="D3.2" />
      <Tx>{R`设 $K$ 中有 $I_r$ 个 $r$ 单形，记为 $\sigma_{r,i}$（$1\le i\le I_r$）。则 $c\in C_r(K)$ 可写成`}</Tx>
      <Eq n="3.15" say={R`$r$ 链就是 $r$ 单形的整系数形式组合：每个单形“用了几次、朝哪个方向”。`}>{R`c=\sum_{i=1}^{I_r}c_i\sigma_{r,i}\qquad c_i\in\mathbb{Z}.`}</Eq>
      <Tx>{R`整数 $c_i$ 称为 $c$ 的**系数**。群结构是逐个系数相加：$c=\sum_ic_i\sigma_{r,i}$ 与 $c'=\sum_ic_i'\sigma_{r,i}$ 之和为`}</Tx>
      <Eq n="3.16" say="链的加法就是系数逐项相加，和整数向量的加法完全一样。">{R`c+c'=\sum_i(c_i+c_i')\sigma_{r,i}.`}</Eq>
      <Tx>{R`单位元是 $0=\sum_i0\cdot\sigma_{r,i}$，$c$ 的逆元是 $-c=\sum_i(-c_i)\sigma_{r,i}$。（注意：反向的 $r$ 单形 $-\sigma_r$ 与 $(-1)\sigma_r\in C_r(K)$ 等同——这就是 \eqref{3.13}、\eqref{3.14} 的意义。）于是 $C_r(K)$ 是秩为 $I_r$ 的自由 Abel 群：`}</Tx>
      <Eq n="3.17" say={R`$r$ 维链群就是 $I_r$ 维的整数格点：每个 $r$ 单形贡献一个整数坐标。`}>{R`C_r(K)\cong\underbrace{\mathbb{Z}\oplus\mathbb{Z}\oplus\cdots\oplus\mathbb{Z}}_{I_r}.`}</Eq>

      <Tx>{R`**边界算子：先看低维，再猜一般公式。**用 $\partial_r\sigma_r$ 表示 $r$ 单形 $\sigma_r$ 的边界；$\partial_r$ 应理解为作用在 $\sigma_r$ 上、产生其边界的**算子**。0 单形没有边界，所以规定`}</Tx>
      <Eq n="3.18" say="一个点没有边界。">{R`\partial_0p_0=0.`}</Eq>
      <Tx>{R`对 1 单形 $(p_0p_1)$，规定`}</Tx>
      <Eq n="3.19" say="有向线段的边界是“终点减起点”。">{R`\partial_1(p_0p_1)=p_1-p_0.`}</Eq>
      <Tx>{R`**为什么起点前面是负号？**看两个例子（\figref{3.7}）。

(a) 把有向线段 $(p_0p_2)$ 分成 $(p_0p_1)$ 与 $(p_1p_2)$ 两段。我们认为 $(p_0p_2)$ 的边界是 $\{p_0\}\cup\{p_2\}$，而 $(p_0p_1)+(p_1p_2)$ 的边界也应当如此。若规定 $\partial_1(p_0p_2)=p_0+p_2$，就会得到 $\partial_1(p_0p_1)+\partial_1(p_1p_2)=p_0+p_1+p_1+p_2$，中间的 $p_1$ 是**虚假的**边界。若取 $\partial_1(p_0p_2)=p_2-p_0$，则 $\partial_1(p_0p_1)+\partial_1(p_1p_2)=p_1-p_0+p_2-p_1=p_2-p_0$，正合所愿。

(b) 三角形的三边 $(p_0p_1)+(p_1p_2)+(p_2p_0)$ 应当没有边界。若坚持"加号规则"，会得到 $p_0+p_1+p_1+p_2+p_2+p_0$，与直觉矛盾；而"终点减起点"给出

$$\partial_1(p_0p_1)+\partial_1(p_1p_2)+\partial_1(p_2p_0)=p_1-p_0+p_2-p_1+p_0-p_2=0.$$

总结成规则：**删去第一个顶点取正号，删去第二个顶点取负号**。把它推广到一般维数就是`}</Tx>
      <Figure n="3.7" caption={R`(a) 带有一个虚假边界 $p_1$ 的定向 1 单形；(b) 没有边界的单纯复形。`} width="75%" />
      <Eq n="3.20" keyEq title="边界算子" say={R`单形的边界是依次删去每个顶点所得的面的交错和：删第 $i$ 个顶点，配符号 $(-1)^i$。`}>{R`\sym{bd}{\partial}_r\sigma_r\equiv\sum_{i=0}^{r}(-1)^i(p_0p_1\ldots\hat p_i\ldots p_r)`}</Eq>
      <Tx>{R`其中 $\sigma_r=(p_0\ldots p_r)$（$r>0$），记号 $\hat p_i$ 表示**删去**顶点 $p_i$。$\partial_r\sigma_r$ 是一个 $(r-1)$ 链。例如

$$\begin{aligned}\partial_2(p_0p_1p_2)&=(p_1p_2)-(p_0p_2)+(p_0p_1)\\ \partial_3(p_0p_1p_2p_3)&=(p_1p_2p_3)-(p_0p_2p_3)+(p_0p_1p_3)-(p_0p_1p_2).\end{aligned}$$

注意 $\partial_2(p_0p_1p_2)=(p_0p_1)+(p_1p_2)+(p_2p_0)$——正好是沿 \figref{3.6}(b) 的绕向走一圈。对 $r=0$ 形式上规定 $\partial_0\sigma_0=0$。`}</Tx>
      <Derivation title={R`\eqref{3.20} 与定向相容：重排顶点时两边同乘 $\operatorname{sgn}(P)$（本站补充）`} collapsed steps={[
        { tex: R`\partial_r(p_1p_0p_2\ldots p_r)=(p_0p_2\ldots p_r)-(p_1p_2\ldots p_r)+\sum_{i\ge2}(-1)^i(p_1p_0\ldots\hat p_i\ldots p_r)`, why: R`把公式直接用于交换了前两个顶点的序列。` },
        { tex: R`=-\Big[(p_1p_2\ldots p_r)-(p_0p_2\ldots p_r)+\sum_{i\ge2}(-1)^i(p_0p_1\ldots\hat p_i\ldots p_r)\Big]`, why: R`$i\ge2$ 的各项中 $p_1p_0$ 交换回 $p_0p_1$ 各产生一个负号（\eqref{3.14}）。` },
        { tex: R`=-\partial_r(p_0p_1\ldots p_r)=\partial_r\big(-(p_0p_1\ldots p_r)\big)`, why: R`任何置换都是相邻对换之积，对一般相邻对换论证相同。所以 $\partial_r$ 在定向单形（等价类）上良定义。` },
      ]} />
      <Tx>{R`$\partial_r$ 线性地作用在 $c=\sum_ic_i\sigma_{r,i}\in C_r(K)$ 上：`}</Tx>
      <Eq n="3.21" say="边界算子是线性的：一条链的边界等于各单形边界按系数相加。">{R`\partial_rc=\sum_ic_i\partial_r\sigma_{r,i}.`}</Eq>
      <Tx>{R`右边是 $C_{r-1}(K)$ 的元素，所以 $\partial_r$ 定义了映射`}</Tx>
      <Eq n="3.22" say={R`边界算子把 $r$ 链送成 $(r-1)$ 链，维数降一。`}>{R`\sym{bd}{\partial}_r:C_r(K)\to C_{r-1}(K).`}</Eq>
      <Tx>{R`$\partial_r$ 称为**边界算子**（boundary operator）；由 \eqref{3.21} 它显然是同态。在基 $\{\sigma_{r,i}\}$、$\{\sigma_{r-1,j}\}$ 下，$\partial_r$ 就是一个 $I_{r-1}\times I_r$ 的**整数矩阵**，每列至多 $r+1$ 个非零元，都是 $\pm1$——下面的交互图会把它画出来。

设 $K$ 是 $n$ 维单纯复形，就有一串自由 Abel 群与同态`}</Tx>
      <Eq n="3.23" keyEq title="链复形" say="把各维链群用边界算子串起来，就得到链复形：每一步维数降一，两端接上零群。">{R`0\xrightarrow{\ i\ }C_n(K)\xrightarrow{\ \partial_n\ }C_{n-1}(K)\xrightarrow{\ \partial_{n-1}\ }\cdots\xrightarrow{\ \partial_2\ }C_1(K)\xrightarrow{\ \partial_1\ }C_0(K)\xrightarrow{\ \partial_0\ }0`}</Eq>
      <Tx>{R`其中 $i:0\hookrightarrow C_n(K)$ 是包含映射（$0$ 看作 $C_n(K)$ 的单位元）。这个序列称为与 $K$ 相伴的**链复形**（chain complex），记作 $C(K)$。研究这些同态的**像**与**核**很有意思：`}</Tx>
      <Stmt id="D3.3">
        <Eq n="3.24" say="闭链就是边界为零的链：没有“端点”，自己封闭。">{R`\sym{bd}{\partial}_rc=0`}</Eq>
      </Stmt>
      <Stmt id="D3.4">
        <Eq n="3.25" say="边缘就是某个高一维链的边界。">{R`c=\sym{bd}{\partial}_{r+1}d`}</Eq>
      </Stmt>
      <Tx>{R`由 \sref{L3.1}，$Z_r(K)=\ker\partial_r$ 与 $B_r(K)=\operatorname{im}\partial_{r+1}$ 都是 $C_r(K)$ 的子群。下面证明它们之间的一个关键关系——没有它就无法定义同调群。`}</Tx>
      <Stmt id="L3.3">
        <Proof steps={[
          { claim: R`只需对 $C_{r+1}(K)$ 的生成元验证。`, why: R`$\partial$ 是线性的（\eqref{3.21}）。` },
          { claim: R`$r=0$ 时 $\partial_0\circ\partial_1=0$。`, why: R`$\partial_0$ 是零算子（\eqref{3.18}）。` },
          { claim: R`设 $r>0$，取 $\sigma=(p_0\ldots p_rp_{r+1})\in C_{r+1}(K)$。先作用 $\partial_{r+1}$，再把 $\partial_r$ 移进求和号：`, tex: R`\partial_r(\partial_{r+1}\sigma)=\partial_r\sum_{i=0}^{r+1}(-1)^i(p_0\ldots\hat p_i\ldots p_{r+1})=\sum_{i=0}^{r+1}(-1)^i\partial_r(p_0\ldots\hat p_i\ldots p_{r+1})`, uses: ["3.20", "3.21"] },
          { claim: R`对每一项再用 \eqref{3.20}。删去 $p_i$ 之后，原来排在 $p_i$ **之前**的 $p_j$（$j<i$）仍在第 $j$ 位；排在 $p_i$ **之后**的 $p_j$（$j>i$）前移到第 $j-1$ 位：`, tex: R`=\sum_{i=0}^{r+1}(-1)^i\Big(\sum_{j=0}^{i-1}(-1)^j(p_0\ldots\hat p_j\ldots\hat p_i\ldots p_{r+1})+\sum_{j=i+1}^{r+1}(-1)^{j-1}(p_0\ldots\hat p_i\ldots\hat p_j\ldots p_{r+1})\Big)` },
          { claim: R`整理成两个双重和：`, tex: R`=\sum_{j<i}(-1)^{i+j}(p_0\ldots\hat p_j\ldots\hat p_i\ldots p_{r+1})-\sum_{j>i}(-1)^{i+j}(p_0\ldots\hat p_i\ldots\hat p_j\ldots p_{r+1})` },
          { claim: R`在第二个和中把求和变量的名字 $i\leftrightarrow j$ 互换，它就变成 $\sum_{i<j}\ldots$ 互换后 $=\sum_{j<i}(-1)^{i+j}(p_0\ldots\hat p_j\ldots\hat p_i\ldots p_{r+1})$，与第一个和**逐项相同**，两者相减为零。`, tex: R`\partial_r(\partial_{r+1}\sigma)=0`, why: R`每个"删去两个顶点"的面恰好出现两次、符号相反：一次先删大下标，一次先删小下标。`, fill: true },
        ]} />
        <Eq n="3.26" keyEq title={R`$\partial^2=0$`} say="边界的边界为零：每个删去两个顶点的面都恰好出现两次，符号相反而相互抵消。">{R`\begin{aligned}\sym{bd}{\partial}_r(\sym{bd}{\partial}_{r+1}\sigma)&=\partial_r\sum_{i=0}^{r+1}(-1)^i(p_0\ldots\hat p_i\ldots p_{r+1})=\sum_{i=0}^{r+1}(-1)^i\partial_r(p_0\ldots\hat p_i\ldots p_{r+1})\\ &=\sum_{i=0}^{r+1}(-1)^i\Big(\sum_{j=0}^{i-1}(-1)^j(p_0\ldots\hat p_j\ldots\hat p_i\ldots p_{r+1})+\sum_{j=i+1}^{r+1}(-1)^{j-1}(p_0\ldots\hat p_i\ldots\hat p_j\ldots p_{r+1})\Big)\\ &=\sum_{j<i}(-1)^{i+j}(p_0\ldots\hat p_j\ldots\hat p_i\ldots p_{r+1})-\sum_{j>i}(-1)^{i+j}(p_0\ldots\hat p_i\ldots\hat p_j\ldots p_{r+1})=0\end{aligned}`}</Eq>
      </Stmt>
      <Box kind="example" title={R`亲手验证一次：$\partial_1\partial_2(p_0p_1p_2)=0$`}>{R`$\partial_2(p_0p_1p_2)=(p_1p_2)-(p_0p_2)+(p_0p_1)$，于是

$$\partial_1\partial_2(p_0p_1p_2)=(p_2-p_1)-(p_2-p_0)+(p_1-p_0)=0.$$

顶点 $p_0$ 出现在"删 $p_1$ 再删 $p_2$"与"删 $p_2$ 再删 $p_1$"两条路径中，符号相反；$p_1$、$p_2$ 同理。下面的交互图对任意 $r\le5$ 把这种两两配对全部列出来。`}</Box>
      <BoundaryLab />
      <Stmt id="T3.3">
        <Eq n="3.27" title={R`$B_r\subset Z_r$`} say="每个边缘都是闭链：边界本身没有边界。">{R`B_r(K)\subset Z_r(K)\qquad(\subset C_r(K)).`}</Eq>
        <Proof steps={[
          { claim: R`任取 $c\in B_r(K)$，写成 $c=\partial_{r+1}d$，$d\in C_{r+1}(K)$。`, uses: ["D3.4"] },
          { claim: R`于是 $\partial_rc=\partial_r(\partial_{r+1}d)=0$，即 $c\in Z_r(K)$。`, uses: ["L3.3", "D3.3"] },
        ]} />
      </Stmt>
      <Tx>{R`**几何图像。**按我们的定义，$\partial_r$ 取出 $r$ 链的边界。若 $c$ 是 $r$ 维闭链，$\partial_rc=0$ 说明 $c$ **没有边界**。若 $c=\partial_{r+1}d$ 是 $r$ 维边缘，$c$ 就是比它高一维的 $d$ 的**边界**。直觉告诉我们"边界没有边界"，所以 $Z_r(K)\supset B_r(K)$。那些**不是边缘的闭链**——没有边界、又不围住任何东西——在本章扮演中心角色。`}</Tx>
    </Sub>);
}
