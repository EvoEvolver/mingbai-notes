import {HomotopyRedraw} from "./_redraw_homotopy.jsx";
// §4.5 高阶同伦群、§4.6 高阶同伦群的一般性质、§4.7 高阶同伦群的例子 —— 式 (4.35)–(4.56)（及原书误编号的 Bott 周期性公式），
// 定义 4.10–4.12，定理 4.10，例 4.12–4.14，习题 4.6–4.8，图 4.17–4.19，表 4.1
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Proof, Erratum, Exercise, Table, Derivation, C } from "@kit";

const R = String.raw;

export function Sec45() {
  return (
    <Sec n="4.5" title="Higher homotopy groups" zh="高阶同伦群"
      gist={R`把 $I$ 换成 $n$ 维立方体 $I^n$，把整个边界 $\partial I^n$ 钉在基点上：$n$ 维圈就是带基点的映射 $S^n\cong I^n/\partial I^n\to X$。同伦类在"沿 $s_1$ 方向拼接"下成群——**第 $n$ 同伦群** $\pi_n(X,x_0)$。`}
      why={R`基本群只看得见"套索"能否收紧。一个包住点缺陷的球面、一个充满整个空间而在无穷远处均匀的场，需要用 $S^2$、$S^3$ 去探测——这就是高阶同伦群。`}
      gives={["4.35", "4.36", "4.37a", "4.38", "4.39", "4.40", "4.41"]}>
      <p className="muted">本节概念：<C id="higher_homotopy" /></p>
      <Tx>{R`基本群给拓扑空间 $X$ 中的圈的同伦类分类。给 $X$ 指定其他群的办法有很多，例如可以给 $X$ 中球面的同伦类分类，或给 $X$ 中环面的同伦类分类。结果表明，球面 $S^n$（$n\ge2$）的同伦类构成一个与基本群类似的群。`}</Tx>
      <Sub n="4.5.1" title="Definitions" zh="定义">
        <Tx>{R`令 $I^n$（$n\ge1$）表示单位 $n$ 维立方体 $I\times\cdots\times I$：`}</Tx>
        <Eq n="4.35" say={R`$n$ 维单位立方体：每个坐标都在 0 与 1 之间。`}>{R`I^n=\{(s_1,\ldots,s_n)\mid 0\le s_i\le1\ (1\le i\le n)\}.`}</Eq>
        <Tx>{R`边界 $\partial I^n$ 是 $I^n$ 的几何边界：`}</Tx>
        <Eq n="4.36" say="立方体的边界：至少有一个坐标取到 0 或 1 的点。">{R`\partial I^n=\{(s_1,\ldots,s_n)\in I^n\mid\text{some }s_i=0\text{ or }1\}.`}</Eq>
        <Tx>{R`回忆在基本群中，$I=[0,1]$ 的边界 $\partial I$ 被映到基点 $x_0$。类似地，这里我们考虑把边界 $\partial I^n$ 映到一点 $x_0\in X$ 的连续映射 $\alpha:I^n\to X$。由于边界被映到同一点 $x_0$，我们实际上从 $I^n$ 得到了 $S^n$（参见第 2 章图 2.8：圆盘的边界缩成一点就是 $S^2$）。若 $I^n/\partial I^n$ 表示把边界 $\partial I^n$ 缩成一点的立方体，则 $I^n/\partial I^n\cong S^n$。映射 $\alpha$ 称为 $x_0$ 处的 **$n$ 维圈**（$n$-loop）。\sref{D4.4} 的直接推广如下。`}</Tx>
        <Stmt id="D4.10">
          <Eq n="4.37a" say={R`同伦在 $t=0$ 时是 $\alpha$。`}>{R`F(s_1,\ldots,s_n,0)=\alpha(s_1,\ldots,s_n)`}</Eq>
          <Eq n="4.37b" say={R`同伦在 $t=1$ 时是 $\beta$。`}>{R`F(s_1,\ldots,s_n,1)=\beta(s_1,\ldots,s_n)`}</Eq>
          <Eq n="4.37c" say="形变的每一时刻，立方体的整个边界都钉在基点上。">{R`F(s_1,\ldots,s_n,t)=x_0\qquad\text{for }(s_1,\ldots,s_n)\in\partial I^n,\ t\in I.`}</Eq>
        </Stmt>
        <Exercise n="4.6" title="n 维圈的同伦是等价关系" level="★"
          hint={R`逐字照搬 \sref{P4.1} 的证明，把 $s$ 换成 $(s_1,\ldots,s_n)$。`}
          solution={R`**自反性**：$F(s_1,\ldots,s_n,t)=\alpha(s_1,\ldots,s_n)$；在 $\partial I^n$ 上取值 $x_0$。

**对称性**：若 $F$ 是 $\alpha$ 到 $\beta$ 的同伦，则 $F(s_1,\ldots,s_n,1-t)$ 是 $\beta$ 到 $\alpha$ 的同伦；\eqref{4.37c} 对所有 $t$ 成立，自然对 $1-t$ 也成立。

**传递性**：若 $F$ 是 $\alpha\sim\beta$、$G$ 是 $\beta\sim\gamma$ 的同伦，令 $H(s,t)=F(s,2t)$（$0\le t\le\frac12$）、$H(s,t)=G(s,2t-1)$（$\frac12\le t\le1$），这里 $s=(s_1,\ldots,s_n)$。$t=\frac12$ 处两段都等于 $\beta(s)$，由粘接引理 $H$ 连续；$H$ 在 $\partial I^n\times I$ 上恒为 $x_0$。故 $\alpha\sim\gamma$。

等价类记作 $[\alpha]$，称为 $\alpha$ 的**同伦类**。`}>
          {R`证明 $\alpha\sim\beta$ 是等价关系。$\alpha$ 所属的等价类称为 $\alpha$ 的**同伦类**，记作 $[\alpha]$。`}
        </Exercise>
        <Tx>{R`下面定义群运算。$n$ 维圈 $\alpha$ 与 $\beta$ 的乘积 $\alpha*\beta$ 定义为`}</Tx>
        <Eq n="4.38" keyEq title={R`$n$ 维圈的乘积`} say={R`把立方体沿第一个坐标切成两半：左半放 $\alpha$（压缩一倍），右半放 $\beta$。中间的分界面是边界的一部分，两边都取值 $x_0$，所以拼接连续。`}>{R`\alpha*\beta(s_1,\ldots,s_n)=\begin{cases}\alpha(2s_1,\ldots,s_n) & 0\le s_1\le\frac12\\ \beta(2s_1-1,\ldots,s_n) & \frac12\le s_1\le1.\end{cases}`}</Eq>
        <Tx>{R`乘积 $\alpha*\beta$ 在 $X$ 中看起来像 \figref{4.17}(a)，把它画成 \figref{4.17}(b) 也很有帮助。若定义 $\alpha^{-1}$ 为`}</Tx>
        <Eq n="4.39" say="逆圈：把第一个坐标反过来，相当于把球面翻转定向。">{R`\alpha^{-1}(s_1,\ldots,s_n)\equiv\alpha(1-s_1,\ldots,s_n)`}</Eq>
        <Tx>{R`它满足`}</Tx>
        <Eq n="4.40" say="一个 n 维圈与它的逆接起来，可以连续地收缩成常值映射。">{R`\alpha^{-1}*\alpha(s_1,\ldots,s_n)\sim\alpha*\alpha^{-1}(s_1,\ldots,s_n)\sim c_{x_0}(s_1,\ldots,s_n)`}</Eq>
        <Tx>{R`其中 $c_{x_0}$ 是 $x_0\in X$ 处的常值 $n$ 维圈，$c_{x_0}:(s_1,\ldots,s_n)\mapsto x_0$。请验证 $\alpha*\beta$ 与 $\alpha^{-1}$ 都是 $x_0$ 处的 $n$ 维圈：在 $s_1=0,1$ 与 $s_i=0,1$（$i\ge2$）处取值 $x_0$；$\alpha*\beta$ 在 $s_1=\frac12$ 处两段都是 $x_0$。`}</Tx>
        <Figure n="4.17" illustration={<HomotopyRedraw n="4.17"/>} caption={R`$n$ 维圈 $\alpha$ 与 $\beta$ 的乘积 $\alpha*\beta$。`} width="60%" />
        <Stmt id="D4.11">
          <Eq n="4.41" say={R`同伦类的乘法：任取代表并按 \eqref{4.38} 拼接。`}>{R`[\alpha]*[\beta]\equiv[\alpha*\beta]`}</Eq>
        </Stmt>
        <Tx>{R`上面定义的乘积 $\alpha*\beta$ 自然诱导同伦类的乘积 \eqref{4.41}（$\alpha,\beta$ 是 $x_0$ 处的 $n$ 维圈）。下面两道习题验证这个乘积良定义并满足群公理。`}</Tx>
        <Exercise n="4.7" title="乘积与代表元无关" level="★"
          hint={R`仿照 \sref{L4.1}：在 $s_1$ 方向上并排两个同伦。`}
          solution={R`设 $F$ 是 $\alpha\sim\alpha'$、$G$ 是 $\beta\sim\beta'$ 的同伦（都满足 \eqref{4.37a}–\eqref{4.37c}）。令
$$H(s_1,\ldots,s_n,t)=\begin{cases}F(2s_1,s_2,\ldots,s_n,t) & 0\le s_1\le\frac12\\ G(2s_1-1,s_2,\ldots,s_n,t) & \frac12\le s_1\le1.\end{cases}$$
在 $s_1=\frac12$ 处，$F(1,\ldots,t)=x_0=G(0,\ldots,t)$（这两个点都在 $\partial I^n$ 上），故 $H$ 连续。$H(\cdot,0)=\alpha*\beta$，$H(\cdot,1)=\alpha'*\beta'$；若 $(s_1,\ldots,s_n)\in\partial I^n$，则 $(2s_1,\ldots)$ 或 $(2s_1-1,\ldots)$ 也在 $\partial I^n$ 上，$H=x_0$。所以 $\alpha*\beta\sim\alpha'*\beta'$。`}>
          {R`证明 \eqref{4.41} 定义的 $n$ 维圈的乘积与代表元无关（参见 \sref{L4.1}）。`}
        </Exercise>
        <Exercise n="4.8" title={R`$\pi_n$ 是群`} level="★★"
          hint={R`所有同伦都只改动第一个坐标 $s_1$，其余坐标 $s_2,\ldots,s_n$ 作为参数"旁观"。逐字照搬 \sref{T4.1} 中的三个公式。`}
          solution={R`记 $s'=(s_2,\ldots,s_n)$。把 \sref{T4.1} 证明中的每个同伦 $F(s,t)$ 换成 $F(s_1,s',t)$，只在第一个参数上做同样的重新参数化：

**(1)** $F(s_1,s',t)=\alpha\big(\frac{4s_1}{1+t},s'\big)$（$0\le s_1\le\frac{1+t}4$），$\beta(4s_1-t-1,s')$（$\frac{1+t}4\le s_1\le\frac{2+t}4$），$\gamma\big(\frac{4s_1-t-2}{2-t},s'\big)$（$\frac{2+t}4\le s_1\le1$）。

**(2)** $F(s_1,s',t)=\alpha\big(\frac{2s_1}{1+t},s'\big)$（$0\le s_1\le\frac{t+1}2$），$x_0$（$\frac{t+1}2\le s_1\le1$）；另一侧类似。

**(3)** $F(s_1,s',t)=\alpha(2s_1(1-t),s')$（$0\le s_1\le\frac12$），$\alpha(2(1-s_1)(1-t),s')$（$\frac12\le s_1\le1$）。

需要多检查的只是 \eqref{4.37c}：若 $s'\in\partial I^{n-1}$（某个 $s_i=0$ 或 $1$，$i\ge2$），则每一段的自变量都在 $\partial I^n$ 上，取值 $x_0$；若 $s_1=0$ 或 $1$，与 $n=1$ 时相同，取值 $\alpha(0,s')$ 等，也在边界上，等于 $x_0$。在 (3) 中 $t=1$ 时 $F=\alpha(0,s')=x_0$，即 $c_{x_0}$。于是 $\pi_n(X,x_0)$ 满足结合律、以 $[c_{x_0}]$ 为单位元、$[\alpha^{-1}]$ 为 $[\alpha]$ 的逆元。`}>
          <Tx>{R`证明第 $n$ 同伦群是群。为此可以验证下列事实（参见 \sref{T4.1}）：

(1) $([\alpha]*[\beta])*[\gamma]=[\alpha]*([\beta]*[\gamma])$。

(2) $[\alpha]*[c_x]=[c_x]*[\alpha]=[\alpha]$。

(3) $[\alpha]*[\alpha^{-1}]=[c_x]$，它定义了逆元 $[\alpha]^{-1}=[\alpha^{-1}]$。`}</Tx>
        </Exercise>
        <Tx>{R`**零维的情形。**到目前为止我们排除了 $\pi_0(X,x_0)$。现在给从 $I^0$ 到 $X$ 的映射分类。注意 $I^0=\{0\}$，$\partial I^0=\emptyset$。设 $\alpha,\beta:\{0\}\to X$，$\alpha(0)=x$、$\beta(0)=y$。若存在连续映射 $F:\{0\}\times I\to X$ 使 $F(0,0)=x$、$F(0,1)=y$，就定义 $\alpha\sim\beta$。这说明 $\alpha\sim\beta$ 当且仅当 $x$ 与 $y$ 能用 $X$ 中的曲线连起来，即它们在同一个（弧）连通分支中。显然这个等价关系与 $x_0$ 无关，我们简单地把这样得到的第零**同伦**集记作 $\pi_0(X)$。但要注意，$\pi_0(X)$ 不是群，它是 $X$ 的（弧）连通分支的集合，其元素个数就是分支数。（原书此处误作"zeroth homology group"。）`}</Tx>
      </Sub>
    </Sec>);
}

export function Sec46() {
  return (
    <Sec n="4.6" title="General properties of higher homotopy groups" zh="高阶同伦群的一般性质"
      gist={R`$n\ge2$ 时 $\pi_n$ 总是**交换**的（\eqref{4.42}）；与基点无关、同伦不变、对积空间可加（\eqref{4.43}）；最重要的是：**万有覆叠不改变高阶同伦群**（\sref{T4.10}），由此 $\pi_n(S^1)=\{e\}$、$\pi_n(\sym{RP}{\RP^m})\cong\pi_n(S^m)$、$\pi_n(\mathrm{SO}(3))\cong\pi_n(S^3)$。`}
      why={R`高阶同伦群一般没有算法；能用的只有这些结构性质，把未知的群换成已知的。`}
      gives={["4.42", "4.43", "4.44", "4.45", "4.46", "4.47", "4.48", "4.49", "4.50", "4.51", "4.52"]}>
      <Sub n="4.6.1" title="Abelian nature of higher homotopy groups" zh="高阶同伦群的交换性">
        <Tx>{R`高阶同伦群总是 Abel 群：对 $x_0\in X$ 处的任意 $n$ 维圈 $\alpha$ 与 $\beta$（$n\ge2$），$[\alpha]$ 与 $[\beta]$ 满足`}</Tx>
        <Eq n="4.42" keyEq title={R`$n\ge2$ 时 $\pi_n$ 交换`} say="在二维以上的立方体里，两块“地盘”可以互相绕开、交换位置：高阶同伦群总是交换的。">{R`[\alpha]*[\beta]=[\beta]*[\alpha].`}</Eq>
        <Tx>{R`验证这一断言只需看 \figref{4.18}：形变序列中的每一步显然都是同伦的。这表明 $\alpha*\beta\sim\beta*\alpha$，即 $[\alpha]*[\beta]=[\beta]*[\alpha]$。`}</Tx>
        <Figure n="4.18" illustration={<HomotopyRedraw n="4.18"/>} caption={R`高阶同伦群总是交换的：$\alpha*\beta\sim\beta*\alpha$。`} width="95%" />
        <Derivation title={R`读 \figref{4.18}：Eckmann–Hilton 式的"让位"`} collapsed steps={[
          { tex: R`\alpha*\beta:\ \alpha\text{ 占 }[0,\tfrac12]\times I^{n-1},\ \beta\text{ 占 }[\tfrac12,1]\times I^{n-1}`, why: R`其余区域（若有）映到 $x_0$。` },
          { tex: R`\text{把 }\alpha\text{ 的支撑收缩到左下角的小方块，}\beta\text{ 的收缩到右上角}`, why: R`在 $s_2$ 方向上重新参数化，小方块之外映到 $x_0$——这是同伦，因为边界始终映到 $x_0$。` },
          { tex: R`\text{在 }(s_1,s_2)\text{ 平面内让两块沿相反方向绕行半圈，互换位置}`, why: R`$n\ge2$ 时有第二个方向 $s_2$ 供它们"错车"；$n=1$ 时只有一条线，两块无法绕过彼此——这正是 $\pi_1$ 可以不交换的原因。` },
          { tex: R`\text{再放大回原尺寸：得到 }\beta*\alpha`, why: "整个过程是一串同伦的复合。" },
        ]} result={R`$\alpha*\beta\sim\beta*\alpha\ (n\ge2)$`} />
      </Sub>
      <Sub n="4.6.2" title="Arcwise connectedness and higher homotopy groups" zh="弧连通性与高阶同伦群">
        <Tx>{R`若拓扑空间 $X$ 弧连通，则对任意 $x_0,x_1\in X$，$\pi_n(X,x_0)$ 同构于 $\pi_n(X,x_1)$。证明与 \sref{T4.2} 平行（用连接两点的道路 $\eta$ 把 $n$ 维圈"拖"过去：在立方体外围加一层"管子"，管子沿径向走 $\eta$）。因此若 $X$ 弧连通，不必指明基点。`}</Tx>
      </Sub>
      <Sub n="4.6.3" title="Homotopy invariance of higher homotopy groups" zh="高阶同伦群的同伦不变性">
        <Tx>{R`设 $X$、$Y$ 同伦型相同（\sref{D4.6}）。若 $f:X\to Y$ 是同伦等价，则同伦群 $\pi_n(X,x_0)$ 同构于 $\pi_n(Y,f(x_0))$（参见 \sref{T4.3}）。高阶同伦群的拓扑不变性是这一事实的直接推论。特别地，若 $X$ 可缩，则同伦群都平凡：$\pi_n(X,x_0)=\{e\}$，$n>1$（对 $n=1$ 就是 \sref{T4.4}）。`}</Tx>
      </Sub>
      <Sub n="4.6.4" title="Higher homotopy groups of a product space" zh="积空间的高阶同伦群">
        <Tx>{R`设 $X$、$Y$ 是弧连通拓扑空间，则`}</Tx>
        <Eq n="4.43" say="积空间上的 n 维圈就是两个因子上 n 维圈的配对，所以同伦群逐因子相加。">{R`\pi_n(X\times Y)\cong\pi_n(X)\oplus\pi_n(Y)`}</Eq>
        <Tx>{R`参见 \sref{T4.6}：证明逐字相同（投影 $p_1,p_2$ 把 $n$ 维圈及其同伦拆成两个分量）。`}</Tx>
      </Sub>
      <Sub n="4.6.5" title="Universal covering spaces and higher homotopy groups" zh="万有覆叠空间与高阶同伦群">
        <p className="muted">本小节概念：<C id="covering" /></p>
        <Tx>{R`有几种情形下，一个空间的同伦群可以由另一个空间已知的同伦群给出。拓扑空间与它的**万有覆叠空间**的高阶同伦群之间有一个值得注意的性质。`}</Tx>
        <Stmt id="D4.12" />
        <Tx>{R`［**注**：某些群本身也是拓扑空间，称为**拓扑群**（topological groups），例如 $\mathrm{SO}(n)$ 与 $\mathrm{SU}(n)$。若 \sref{D4.12} 中的 $X$ 与 $\widetilde X$ 恰好都是拓扑群，且 $p:\widetilde X\to X$ 是群同态，则（万有）覆叠空间称为（**万有**）**覆叠群**（(universal) covering group）。］

例如 $\mathbb{R}$ 是 $S^1$ 的万有覆叠空间（§4.3）。由于 $S^1$ 与 $\mathrm{U}(1)$ 等同，把 $\mathbb{R}$ 看成加法群时，它是 $\mathrm{U}(1)$ 的万有覆叠群。映射 $p:\mathbb{R}\to\mathrm{U}(1)$ 可取 $p:x\mapsto e^{i2\pi x}$。显然 $p$ 是满射；若 $U=\{e^{i2\pi x}\mid x\in(x_0-0.1,x_0+0.1)\}$，则

$$p^{-1}(U)=\bigcup_{n\in\mathbb{Z}}(x_0-0.1+n,\ x_0+0.1+n),$$

这是 $\mathbb{R}$ 中不交开集的并，每一段都被 $p$ 同胚地映到 $U$ 上。容易证明 $p$ 还是 $\mathbb{R}$ 中的加法与 $\mathrm{U}(1)$ 中的乘法之间的同态：$p(x+y)=e^{i2\pi(x+y)}=p(x)p(y)$。所以 $(\mathbb{R},p)$ 是 $\mathrm{U}(1)=S^1$ 的万有覆叠群。`}</Tx>
        <Stmt id="T4.10">
          <Eq n="4.44" title="覆叠映射诱导高阶同伦群同构" say={R`万有覆叠与原空间“局部长得一样”，而二维以上的球面单连通、看不出覆叠的多层结构：所以 $n\ge2$ 的同伦群完全相同。`}>{R`p_*:\pi_n(\widetilde X,\tilde x_0)\to\pi_n(X,x_0)`}</Eq>
        </Stmt>
        <Tx>{R`［**警告**：此定理不能用于 $n=1$：$\pi_1(\mathbb{R})=\{e\}$，而 $\pi_1(S^1)=\mathbb{Z}$。］证明见 Croom (1978)。`}</Tx>
        <Derivation title={R`为什么 $n\ge2$（证明思路，本站补）`} collapsed steps={[
          { tex: R`\text{提升判别法：}f:(Y,y_0)\to(X,x_0)\text{ 可提升到 }\widetilde X\iff f_*\pi_1(Y)\subset p_*\pi_1(\widetilde X)`, why: R`$Y$ 连通且局部道路连通。$\widetilde X$ 单连通时右边是 $\{e\}$。` },
          { tex: R`Y=S^n\ (n\ge2):\ \pi_1(S^n)=\{e\}`, why: R`\eqref{4.22}。所以任何 $n$ 维圈都能唯一地提升（固定 $\tilde x_0$），$p_*$ 是满射。` },
          { tex: R`Y=S^n\times I`, why: R`同理，同伦也能提升，所以两个提升若在 $X$ 中同伦，则在 $\widetilde X$ 中也同伦：$p_*$ 是单射。` },
          { tex: R`Y=S^1:\ \pi_1(S^1)=\mathbb{Z}\neq\{e\}`, why: R`绕 $S^1$ 一圈的圈不能提升成 $\mathbb{R}$ 中的**闭**圈——$n=1$ 时定理失效。` },
        ]} />
        <Tx>{R`例如 $\mathbb{R}$ 可缩，所以 $\pi_n(\mathbb{R})=\{e\}$。于是`}</Tx>
        <Eq n="4.45" say="圆周的所有高阶同伦群都平凡：它的万有覆叠是一条可缩的直线。">{R`\pi_n(S^1)\cong\pi_n(\mathrm{U}(1))=\{e\}\qquad n\ge2.`}</Eq>
        <Box kind="example" n="4.12" title={R`$\sym{RP}{\RP^n}$、$\mathrm{SO}(3)$、$\mathrm{SU}(2)$ 与自旋群`}>
          <Tx>{R`设 $S^n=\{x\in\mathbb{R}^{n+1}\mid|x|^2=1\}$。实射影空间 $\sym{RP}{\RP^n}$ 由 $S^n$ 把每对对径点 $(x,-x)$ 等同得到。容易看出，对 $n\ge2$，$S^n$ 是 $\sym{RP}{\RP^n}$ 的覆叠空间（2 叶）。由于 $n\ge2$ 时 $\pi_1(S^n)=\{e\}$，$S^n$ 是 $\sym{RP}{\RP^n}$ 的万有覆叠空间，于是`}</Tx>
          <Eq n="4.46" say={R`实射影空间与球面只差一个二对一的覆叠，所以二阶及以上的同伦群完全相同。`}>{R`\pi_n(\sym{RP}{\RP^m})\cong\pi_n(S^m)\qquad(n\ge2).`}</Eq>
          <Tx>{R`值得注意的是 $\sym{RP}{\RP^3}$ 与 $\mathrm{SO}(3)$ 等同。为看出这一点，用绕轴 $\boldsymbol{n}$ 转角 $\theta$（$0\le\theta\le\pi$）的转动来表示 $\mathrm{SO}(3)$ 的元素，并给它指定一个"矢量" $\boldsymbol{\Omega}\equiv\theta\boldsymbol{n}$。$\boldsymbol{\Omega}$ 取值于半径为 $\pi$ 的实心球 $D^3$。而且 $\pi\boldsymbol{n}$ 与 $-\pi\boldsymbol{n}$ 表示同一个转动，应当等同。因此 $\boldsymbol{\Omega}$ 所属的空间是边界球面 $S^2$ 上对径点粘合的实心球 $D^3$。另一方面，$\sym{RP}{\RP^3}$ 也可以表示为 $S^3$ 的北半球 $D^3$，其边界 $S^2$ 上的对径点粘合。这说明 $\sym{RP}{\RP^3}$ 与 $\mathrm{SO}(3)$ 等同。

同样有趣的是 $S^3$ 与 $\mathrm{SU}(2)$ 等同。首先，任一元素 $g\in\mathrm{SU}(2)$ 都写成`}</Tx>
          <Eq n="4.47" say={R`任何 $\mathrm{SU}(2)$ 矩阵都由一对模平方和为 1 的复数 $(a,b)$ 决定——也就是 $\mathbb{C}^2=\mathbb{R}^4$ 中的单位球面 $S^3$。`}>{R`g=\begin{pmatrix}a & -\bar b\\ b & \bar a\end{pmatrix}\qquad|a|^2+|b|^2=1.`}</Eq>
          <Tx>{R`若写 $a=u+iv$、$b=x+iy$，这就成为 $S^3$：

$$u^2+v^2+x^2+y^2=1.$$

综合这些结果得到`}</Tx>
          <Eq n="4.48" keyEq title={R`$\mathrm{SO}(3)$ 与 $\mathrm{SU}(2)$ 的高阶同伦群`} say={R`三维转动群与它的二重覆叠 $\mathrm{SU}(2)=S^3$ 只在基本群上不同；二阶以上的同伦群全部相同。`}>{R`\pi_n(\mathrm{SO}(3))=\pi_n(\sym{RP}{\RP^3})=\pi_n(S^3)=\pi_n(\mathrm{SU}(2))\qquad n\ge2.`}</Eq>
          <Tx>{R`更一般地，$\mathrm{SO}(n)$ 的万有覆叠群 $\mathrm{Spin}(n)$ 称为**自旋群**（spin group）。$n$ 较小时它们是`}</Tx>
          <Eq n="4.49" say={R`三维的自旋群就是 $\mathrm{SU}(2)$：描述自旋 $\frac12$ 的那个群。`}>{R`\mathrm{Spin}(3)=\mathrm{SU}(2)`}</Eq>
          <Eq n="4.50" say={R`四维转动群的二重覆叠是两个 $\mathrm{SU}(2)$ 的乘积（相对论中的左、右手旋量）。`}>{R`\mathrm{Spin}(4)=\mathrm{SU}(2)\times\mathrm{SU}(2)`}</Eq>
          <Eq n="4.51" say={R`五维自旋群同构于 $4\times4$ 的紧致辛群。`}>{R`\mathrm{Spin}(5)=\mathrm{USp}(4)`}</Eq>
          <Eq n="4.52" say={R`六维自旋群同构于 $\mathrm{SU}(4)$。`}>{R`\mathrm{Spin}(6)=\mathrm{SU}(4).`}</Eq>
          <Tx>{R`这里 $\mathrm{USp}(2N)$ 表示满足 $A^{\mathrm t}JA=J$ 的 $2N\times2N$ **酉**矩阵 $A$ 构成的紧致群，其中

$$J=\begin{pmatrix}0 & I_N\\ -I_N & 0\end{pmatrix}.$$

（原书只写了条件 $A^{\mathrm t}JA=J$；仅凭这一条件得到的是非紧的复辛群 $\mathrm{Sp}(2N,\mathbb{C})$，"紧致"要求 $A$ 同时是酉矩阵：$\mathrm{USp}(2N)=\mathrm{Sp}(2N,\mathbb{C})\cap\mathrm{U}(2N)$。）`}</Tx>
        </Box>
        <Erratum kind="erratum" loc="p.170，式 (4.46) 与 SO(3) 的参数化" title={R`勘误：(4.46) 只对 $n\ge2$ 成立；转角范围应为 $0\le\theta\le\pi$`}>{R`**(4.46)**：原书印作 $\pi_n(\sym{RP}{\RP^m})\cong\pi_n(S^m)$ 而未注明 $n$ 的范围。它来自 \sref{T4.10}，只对 $n\ge2$ 成立；$n=1$ 时 $\pi_1(\sym{RP}{\RP^m})\cong\mathbb{Z}_2$（$m\ge2$）而 $\pi_1(S^m)=\{e\}$。本站补上条件 $n\ge2$。（顺带：前一句"对 $n\ge2$，$S^n$ 是 $\sym{RP}{\RP^n}$ 的覆叠空间"其实对 $n=1$ 也成立，只是那时 $S^1$ 不单连通、不是万有覆叠。）

**转角**：原书写 $0<\theta<\pi$。这样会漏掉恒等元（$\theta=0$，对应球心）与转 $\pi$ 的转动（对应边界球面，正是需要对径粘合的那一部分）。应为 $0\le\theta\le\pi$。`}</Erratum>
      </Sub>
    </Sec>);
}

const T41 = [
  [R`$\mathrm{SO}(3)$`, R`$\mathbb{Z}_2$`, "0", R`$\mathbb{Z}$`, R`$\mathbb{Z}_2$`, R`$\mathbb{Z}_2$`, R`$\mathbb{Z}_{12}$`],
  [R`$\mathrm{SO}(4)$`, R`$\mathbb{Z}_2$`, "0", R`$\mathbb{Z}+\mathbb{Z}$`, R`$\mathbb{Z}_2+\mathbb{Z}_2$`, R`$\mathbb{Z}_2+\mathbb{Z}_2$`, R`$\mathbb{Z}_{12}+\mathbb{Z}_{12}$`],
  [R`$\mathrm{SO}(5)$`, R`$\mathbb{Z}_2$`, "0", R`$\mathbb{Z}$`, R`$\mathbb{Z}_2$`, R`$\mathbb{Z}_2$`, "0"],
  [R`$\mathrm{SO}(6)$`, R`$\mathbb{Z}_2$`, "0", R`$\mathbb{Z}$`, "0", R`$\mathbb{Z}$`, "0"],
  [R`$\mathrm{SO}(n)$, $n>6$`, R`$\mathbb{Z}_2$`, "0", R`$\mathbb{Z}$`, "0", "0", "0"],
  [R`$\mathrm{U}(1)$`, R`$\mathbb{Z}$`, "0", "0", "0", "0", "0"],
  [R`$\mathrm{SU}(2)$`, "0", "0", R`$\mathbb{Z}$`, R`$\mathbb{Z}_2$`, R`$\mathbb{Z}_2$`, R`$\mathbb{Z}_{12}$`],
  [R`$\mathrm{SU}(3)$`, "0", "0", R`$\mathbb{Z}$`, "0", R`$\mathbb{Z}$`, R`$\mathbb{Z}_6$`],
  [R`$\mathrm{SU}(n)$, $n>3$`, "0", "0", R`$\mathbb{Z}$`, "0", R`$\mathbb{Z}$`, "0"],
  [R`$S^2$`, "0", R`$\mathbb{Z}$`, R`$\mathbb{Z}$`, R`$\mathbb{Z}_2$`, R`$\mathbb{Z}_2$`, R`$\mathbb{Z}_{12}$`],
  [R`$S^3$`, "0", "0", R`$\mathbb{Z}$`, R`$\mathbb{Z}_2$`, R`$\mathbb{Z}_2$`, R`$\mathbb{Z}_{12}$`],
  [R`$S^4$`, "0", "0", "0", R`$\mathbb{Z}$`, R`$\mathbb{Z}_2$`, R`$\mathbb{Z}_2$`],
  [R`$G_2$`, "0", "0", R`$\mathbb{Z}$`, "0", "0", R`$\mathbb{Z}_3$`],
  [R`$F_4$`, "0", "0", R`$\mathbb{Z}$`, "0", "0", "0"],
  [R`$E_6$`, "0", "0", R`$\mathbb{Z}$`, "0", "0", "0"],
  [R`$E_7$`, "0", "0", R`$\mathbb{Z}$`, "0", "0", "0"],
  [R`$E_8$`, "0", "0", R`$\mathbb{Z}$`, "0", "0", "0"],
];

export function Sec47() {
  return (
    <Sec n="4.7" title="Examples of higher homotopy groups" zh="高阶同伦群的例子"
      gist={R`$\pi_n(S^n)\cong\mathbb{Z}$——整数是"包了几层"（映射度，\eqref{4.53}）；由覆叠得 $\pi_n(\sym{RP}{\RP^n})\cong\mathbb{Z}$、$\pi_3(\mathrm{SO}(3))\cong\mathbb{Z}$；表 4.1 汇总常用结果；Bott 周期性给出酉群与正交群的稳定同伦群。`}
      why={R`物理应用（§4.8–4.10）需要的正是这张表：$\pi_2(S^2)$ 管铁磁体的斯格明子，$\pi_2(\sym{RP}{\RP^2})$ 管液晶的点缺陷，$\pi_3$ 管无奇点的织构与瞬子。`}
      gives={["4.53", "4.54", "4.55", "4.56"]}>
      <Tx>{R`一般来说，计算高阶同伦群 $\pi_n(X)$ 没有算法；$n\ge2$ 时每个拓扑空间都需要专门的方法。这里我们研究几个可以用直观论证得到高阶同伦群的例子，并在表 4.1 中汇集有用的结果。`}</Tx>
      <Table head={["", R`$\pi_1$`, R`$\pi_2$`, R`$\pi_3$`, R`$\pi_4$`, R`$\pi_5$`, R`$\pi_6$`]} rows={T41}
        caption={R`**表 4.1** 常用的同伦群（原书记号 $\mathbb{Z}+\mathbb{Z}$ 即 $\mathbb{Z}\oplus\mathbb{Z}$）。本站已逐项与标准表核对（如 Ito 1987 附录 A 表 6），无误。`} />
      <Box kind="example" n="4.13" title={R`$\pi_n(S^n)\cong\mathbb{Z}$`}>
        <Tx>{R`注意到 $\pi_n(X,x_0)$ 是 $X$ 中 $n$ 维圈（即 $S^n$）的同伦类的集合，立即得到`}</Tx>
        <Eq n="4.53" keyEq title={R`$\pi_n(S^n)\cong\mathbb{Z}$`} say={R`把一个 $n$ 维球面映到另一个 $n$ 维球面上，同伦类由“包了几层（计入方向）”这一个整数完全决定。`}>{R`\pi_n(S^n,x_0)\cong\mathbb{Z}\qquad n\ge1.`}</Eq>
        <Tx>{R`若 $\alpha$ 把 $S^n$ 映到一点 $x_0\in S^n$，$[\alpha]$ 是单位元 $0\in\mathbb{Z}$。由于 $I^n/\partial I^n$ 与 $S^n$ 都可定向，可以给它们指定定向。若 $\alpha$ 以相同的定向把 $I^n/\partial I^n$ 同胚地映到 $S^n$ 上，则 $[\alpha]$ 对应元素 $1\in\mathbb{Z}$；若同胚 $\alpha$ 以相反的定向把 $I^n/\partial I^n$ 映到 $S^n$ 上，则 $[\alpha]$ 对应 $-1$。

例如取 $n=2$。由于 $I^2/\partial I^2\cong S^2$，$I^2$ 中的点可以用极坐标 $(\theta,\phi)$ 表示（\figref{4.19}：中心 $\theta=0$，边界 $\theta=\pi$ 缩成一点）。类似地，$X=S^2$ 可用极坐标 $(\theta',\phi')$ 表示。设 $\alpha:(\theta,\phi)\mapsto(\theta',\phi')$ 是 $X$ 中的 2 维圈。若 $\theta'=\theta$、$\phi'=\phi$，则当 $(\theta,\phi)$ 以相同定向扫过 $I^2$ 一次时，$(\theta',\phi')$ 扫过 $S^2$ 一次，这个 2 维圈属于类 $+1\in\pi_2(S^2,x_0)$。若 $\alpha:(\theta,\phi)\mapsto(\theta',\phi')$ 由 $\theta'=\theta$、$\phi'=2\phi$ 给出，则 $(\theta,\phi)$ 扫过 $I^2$ 一次时 $(\theta',\phi')$ 扫过 $S^2$ 两次，这个 2 维圈属于类 $2\in\pi_2(S^2,x_0)$。一般地，映射 $(\theta,\phi)\mapsto(\theta,k\phi)$（$k\in\mathbb{Z}$）对应 $\pi_2(S^2,x_0)$ 的类 $k$。类似的论证对一般的 $n>2$ 验证 \eqref{4.53}。`}</Tx>
      </Box>
      <Figure n="4.19" illustration={<HomotopyRedraw n="4.19"/>} caption={R`$I^2$ 中的点可以用极坐标 $(\theta,\phi)$ 表示。`} width="45%" />
      <Box kind="physics" title="映射度的积分公式（§4.8 斯格明子要用）">{R`对光滑映射 $\boldsymbol{m}:S^2\to S^2$，类 $k$ 可以用"像覆盖的立体角"来数：

$$k=\frac{1}{4\pi}\int\boldsymbol{m}\cdot\Big(\frac{\partial\boldsymbol{m}}{\partial x}\times\frac{\partial\boldsymbol{m}}{\partial y}\Big)\,\dd x\,\dd y.$$

被积函数是像点在单位球面上扫过的有向面积元；总面积是 $4\pi$ 的 $k$ 倍。对 $(\theta,\phi)\mapsto(\theta,k\phi)$，雅可比行列式处处为 $k$（$\sin\theta\,\dd\theta\,\dd\phi\mapsto k\sin\theta\,\dd\theta\,\dd\phi$），积分正好是 $k$。§4.8 的交互图 4 用这个公式实时计算平面斯格明子的拓扑荷。`}</Box>
      <Box kind="example" n="4.14" title={R`$\pi_n(\sym{RP}{\RP^n})$ 与 $\pi_3(\mathrm{SO}(3))$`}>
        <Tx>{R`注意 $S^n$ 是 $\sym{RP}{\RP^n}$ 的万有覆叠空间（$n\ge2$），得到`}</Tx>
        <Eq n="4.54" say={R`射影空间与球面的最高非平凡同伦群相同：都是整数。`}>{R`\pi_n(\sym{RP}{\RP^n})\cong\pi_n(S^n)\cong\mathbb{Z}\qquad n\ge2.`}</Eq>
        <Tx>{R`［当然这对 $n=1$ 也碰巧成立，因为 $\sym{RP}{\RP^1}=S^1$。］例如 $\pi_2(\sym{RP}{\RP^2})\cong\pi_2(S^2)\cong\mathbb{Z}$。由于 $\mathrm{SU}(2)=S^3$ 是 $\mathrm{SO}(3)=\sym{RP}{\RP^3}$ 的万有覆叠群，由 \sref{T4.10} 得（另见 \eqref{4.48}）`}</Tx>
        <Eq n="4.55" keyEq title={R`$\pi_3(\mathrm{SO}(3))\cong\mathbb{Z}$`} say={R`三维球面到转动群的映射按整数分类：这是 Shankar 单极子与 Yang–Mills 瞬子的拓扑荷。`}>{R`\pi_3(\mathrm{SO}(3))\cong\pi_3(\mathrm{SU}(2))\cong\pi_3(S^3)\cong\mathbb{Z}.`}</Eq>
        <Tx>{R`超流 $^3$He-A 中的 **Shankar 单极子**对应这些同伦类的非平凡元，见 §4.10。$\pi_3(\mathrm{SU}(2))$ 还用于第 9 章例 9.8 中瞬子的分类。`}</Tx>
      </Box>
      <Tx>{R`总之我们得到表 4.1，表中还列出了其他有用的同伦群。下面评论几件有趣的事实。

**(a)** 由于 $\mathrm{Spin}(4)=\mathrm{SU}(2)\times\mathrm{SU}(2)$ 是 $\mathrm{SO}(4)$ 的万有覆叠群，对 $n>2$（实际上 $n\ge2$）有 $\pi_n(\mathrm{SO}(4))=\pi_n(\mathrm{SU}(2))\oplus\pi_n(\mathrm{SU}(2))$（\sref{T4.10} 加 \eqref{4.43}）。

**(b)** 存在称为 **$J$ 同态**（$J$-homomorphism）的映射 $J:\pi_k(\mathrm{SO}(n))\to\pi_{k+n}(S^n)$，见 Whitehead (1978)。特别地，$k=1$ 时这个同态已知是同构，于是 $\pi_1(\mathrm{SO}(n))=\pi_{n+1}(S^n)$。例如

$$\begin{aligned}&\pi_1(\mathrm{SO}(2))\cong\pi_3(S^2)\cong\mathbb{Z}\\ &\pi_1(\mathrm{SO}(3))\cong\pi_4(S^3)\cong\pi_4(\mathrm{SU}(2))\cong\pi_4(\mathrm{SO}(3))\cong\mathbb{Z}_2.\end{aligned}$$

**(c)** **Bott 周期性定理**（Bott periodicity theorem）断言：对 $n\ge(k+1)/2$，`}</Tx>
      <Eq n="4.56" keyEq title="Bott 周期性（酉群）" say={R`在稳定范围内，酉群的同伦群以 2 为周期：偶数阶平凡，奇数阶是整数（对 $\mathrm{SU}(n)$ 须 $k\ge2$）。`}>{R`\pi_k(\mathrm{U}(n))\cong\begin{cases}\{e\} & k\text{ even}\\ \mathbb{Z} & k\text{ odd}\end{cases}\qquad\text{且 }\pi_k(\mathrm{SU}(n))\cong\pi_k(\mathrm{U}(n))\ (k\ge2)`}</Eq>
      <Tx>{R`类似地，对 $n\ge k+2$，

$$\pi_k(\mathrm{O}(n))\cong\pi_k(\mathrm{SO}(n))\cong\begin{cases}\{e\} & k\equiv2,4,5,6\pmod 8\\ \mathbb{Z}_2 & k\equiv0,1\pmod 8\\ \mathbb{Z} & k\equiv3,7\pmod 8\end{cases}\qquad(k\ge1;\ k=0\text{ 时只对 }\mathrm{O}(n)\text{ 成立})$$

辛群也有类似的周期性，这里不再列出。更多结果见 Ito (1987) 附录 A 表 6。`}</Tx>
      <Erratum kind="erratum" loc="pp.172–173，式 (4.56) 与其后的正交群公式" title={R`勘误：$\mathrm{U}(n)$ 与 $\mathrm{SU}(n)$ 在 $k=1$ 不同；$\mathrm{O}(n)$ 与 $\mathrm{SO}(n)$ 在 $k=0$ 不同；正交群公式的编号重复`}>{R`**(4.56)**：原书写作 $\pi_k(\mathrm{U}(n))\cong\pi_k(\mathrm{SU}(n))\cong\{e\}$（$k$ 偶）或 $\mathbb{Z}$（$k$ 奇）。对 $k=1$ 这是错的：$\pi_1(\mathrm{U}(n))\cong\mathbb{Z}$（行列式 $\det:\mathrm{U}(n)\to\mathrm{U}(1)$ 诱导同构），而 $\mathrm{SU}(n)$ 单连通，$\pi_1(\mathrm{SU}(n))=\{e\}$（表 4.1 本身就列着 $\pi_1(\mathrm{SU}(n))=0$）。原因：$\mathrm{U}(n)\cong\mathrm{SU}(n)\times\mathrm{U}(1)$（作为空间），而 $\pi_k(\mathrm{U}(1))=0$ 只对 $k\ge2$ 成立。本站把 $\mathrm{SU}(n)$ 的等式限制为 $k\ge2$。

**正交群公式**：同理 $\pi_0(\mathrm{O}(n))\cong\mathbb{Z}_2$（两个分支 $\det=\pm1$），而 $\pi_0(\mathrm{SO}(n))$ 平凡；"$k\equiv0$"给出 $\mathbb{Z}_2$ 对 $\mathrm{SO}(n)$ 只在 $k=8,16,\ldots$ 时成立。该公式在原书中被印成编号 **(4.50)**，与上面的 $\mathrm{Spin}(4)=\mathrm{SU}(2)\times\mathrm{SU}(2)$ 重号（按顺序应为 (4.57)，但 (4.57) 已是下一节的 Heisenberg 哈密顿量）；为避免冲突，本站把它排为不编号的行间公式。

其余数值与表 4.1 吻合：例如 $k=3$：$\pi_3(\mathrm{SO}(n))=\mathbb{Z}$（$n\ge5$），$\pi_3(\mathrm{SU}(n))=\mathbb{Z}$（$n\ge2$）；$k=5$：$\pi_5(\mathrm{SU}(n))=\mathbb{Z}$（$n\ge3$），$\pi_5(\mathrm{SO}(n))=0$（$n\ge7$）。`}</Erratum>
    </Sec>);
}
