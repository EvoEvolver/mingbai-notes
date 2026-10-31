// 章末习题（Problems 5.1–5.2）
import { Sec, Tx, Box, Exercise } from "@kit";

const R = String.raw;

export function Problems() {
  return (
    <Sec n="5.P" title="Problems" zh="章末习题">
      <Tx>{R`两道题分别复习 §5.7 的齐性空间（"群模迷向群"算维数）与 §5.4 的外微分（用形式写 Maxwell 方程）。`}</Tx>
      <Exercise n="P5.1" title="Stiefel 流形" level="★★"
        hint={R`可迁：把 $r$ 个正交归一向量扩充成 $\R^m$ 的正交归一基，必要时把最后一个向量反号使行列式为 $+1$。迷向群：$gA_0=A_0$ 说明 $g$ 的前 $r$ 列就是 $e_1,\ldots,e_r$，再用正交性。维数：用 $\dim\mathrm{SO}(m)=m(m-1)/2$。`}
        solution={R`**作用。**$g\in\mathrm{SO}(m)$ 作用在 $A=(\boldsymbol{e}_1,\ldots,\boldsymbol{e}_r)$ 上为矩阵乘法 $gA=(g\boldsymbol{e}_1,\ldots,g\boldsymbol{e}_r)$；正交矩阵保持内积，所以 $gA\in V(m,r)$。\eqref{5.141a}、\eqref{5.141b} 显然成立。

**可迁（设 $r<m$）。**给定 $A=(\boldsymbol{e}_1,\ldots,\boldsymbol{e}_r)$，用 Gram–Schmidt 把它扩充成 $\R^m$ 的正交归一基 $\boldsymbol{e}_1,\ldots,\boldsymbol{e}_m$，令 $g=(\boldsymbol{e}_1,\ldots,\boldsymbol{e}_m)\in\mathrm{O}(m)$。若 $\det g=-1$，把 $\boldsymbol{e}_m$ 换成 $-\boldsymbol{e}_m$（不影响前 $r$ 列，因为 $r<m$），使 $g\in\mathrm{SO}(m)$。则 $gA_0=g$ 的前 $r$ 列 $=A$。任意两点都可经由 $A_0$ 相连，所以作用可迁。（$r=m$ 时 $V(m,m)=\mathrm{O}(m)$ 有两个连通分支，$\mathrm{SO}(m)$ 只在 $\det=+1$ 的分支上可迁；题中的结论按 $r<m$ 理解。）

**迷向群。**$gA_0=A_0$ 即 $g$ 的前 $r$ 列是标准基 $\boldsymbol{e}_1,\ldots,\boldsymbol{e}_r$。$g$ 的各列正交归一，所以后 $m-r$ 列与前 $r$ 个标准基正交，前 $r$ 个分量为零：

$$g=\begin{pmatrix}I_r&0\\ 0&h\end{pmatrix},\qquad h^{\mathrm t}h=I_{m-r},\quad\det h=\det g=1.$$

故 $H(A_0)\cong\mathrm{SO}(m-r)$。由可迁性与 §5.7.2 的一般结果（$V(m,r)$ 是紧致的），

$$V(m,r)=\mathrm{SO}(m)/\mathrm{SO}(m-r).$$

**维数。**

$$\dim V(m,r)=\frac{m(m-1)}{2}-\frac{(m-r)(m-r-1)}{2}=\frac{2mr-r^2-r}{2}=\frac{r(r-1)}{2}+r(m-r).$$

**直接检验：**$m\times r$ 矩阵有 $mr$ 个元素，正交归一条件 $A^{\mathrm t}A=I_r$ 是 $r(r+1)/2$ 个独立方程（对称矩阵），$mr-r(r+1)/2=r(m-r)+r(r-1)/2$ ✓。

**特例：**$r=1$ 时 $V(m,1)$ 是 $\R^m$ 中单位向量的集合，即 $S^{m-1}$，与 \eqref{5.150} 的 $\mathrm{SO}(m)/\mathrm{SO}(m-1)=S^{m-1}$ 一致，维数 $0+(m-1)=m-1$ ✓。$r=m-1$ 时 $V(m,m-1)\cong\mathrm{SO}(m)$（最后一个向量由叉积唯一决定）。`}>
        {R`**Stiefel 流形** $V(m,r)$ 是 $\R^m$ 中 $r$ 个正交归一向量 $\{\boldsymbol{e}_i\}$（$1\le i\le r$，$r\le m$）组的集合。$V(m,r)$ 的元素 $A$ 可以表示为 $m\times r$ 矩阵 $(\boldsymbol{e}_1,\ldots,\boldsymbol{e}_r)$。证明 $\mathrm{SO}(m)$ 可迁地作用在 $V(m,r)$ 上。设

$$A_0\equiv\begin{pmatrix}1&0&\ldots&0\\ 0&1&\ldots&0\\ \ldots&\ldots&\ldots&\ldots\\ 0&0&\ldots&1\\ 0&0&\ldots&0\\ 0&0&\ldots&0\end{pmatrix}$$

是 $V(m,r)$ 的元素（前 $r$ 行为 $I_r$，其余为零）。证明 $A_0$ 的迷向群是 $\mathrm{SO}(m-r)$。验证 $V(m,r)=\mathrm{SO}(m)/\mathrm{SO}(m-r)$，且 $\dim V(m,r)=[r(r-1)]/2+r(m-r)$。［注：Stiefel 流形在某种意义上是球面的推广。注意 $V(m,1)=S^{m-1}$。］`}
      </Exercise>

      <Exercise n="P5.2" title="Maxwell 方程的形式写法" level="★★★"
        hint={R`先由 \eqref{5.73} 写出 $F=E_i\,\dd x^i\wedge\dd x^0+B_x\dd x^2\wedge\dd x^3+B_y\dd x^3\wedge\dd x^1+B_z\dd x^1\wedge\dd x^2$，用题中的 $*$ 逐项算 $*F$，再用例 5.10 的方法求 $\dd*F$。对 $J$ 与 $A$ 要注意一形式的分量是**下指标**：$J_\mu=\eta_{\mu\nu}J^\nu$，$A_\mu=\eta_{\mu\nu}A^\nu$。`}
        solution={R`约定：$x^0=t$，$\eta=\mathrm{diag}(-1,1,1,1)$，$(i,j,k)$ 为 $(1,2,3)$ 的偶置换，体积形式记 $\mathrm{vol}=\dd x^0\wedge\dd x^1\wedge\dd x^2\wedge\dd x^3$。由例 5.11 后的注，$A_\mu=(-\phi,\boldsymbol{A})$，同样 $J_\mu=(-\rho,\boldsymbol{j})$，即 $J=J_\mu\dd x^\mu=-\rho\,\dd x^0+j_k\dd x^k$（见下面的勘误框）。

**(a)** 由 \eqref{5.73}，$F=\frac12F_{\mu\nu}\dd x^\mu\wedge\dd x^\nu=E_i\,\dd x^i\wedge\dd x^0+B_i\,\dd x^j\wedge\dd x^k$（$B_1=B_x$ 配 $\dd x^2\wedge\dd x^3$ 等）。用题中 $r=2$ 的 $*$：$*(\dd x^i\wedge\dd x^0)=-\dd x^j\wedge\dd x^k$，$*(\dd x^j\wedge\dd x^k)=\dd x^i\wedge\dd x^0$，

$$*F=-E_i\,\dd x^j\wedge\dd x^k+B_i\,\dd x^i\wedge\dd x^0.$$

求外微分（与例 5.10 相同的计算；时间导数项 $-\partial_0E_i\,\dd x^0\wedge\dd x^j\wedge\dd x^k=-\partial_0E_i\,\dd x^j\wedge\dd x^k\wedge\dd x^0$，空间导数项从 $B_i\dd x^i\wedge\dd x^0$ 中给出旋度）：

$$\dd*F=-(\nabla\cdot\boldsymbol{E})\,\dd x^1\wedge\dd x^2\wedge\dd x^3+\left(\nabla\times\boldsymbol{B}-\frac{\partial\boldsymbol{E}}{\partial t}\right)_i\dd x^j\wedge\dd x^k\wedge\dd x^0.$$

另一方面，用 $r=1$ 的 $*$（$*\dd x^0=-\dd x^1\wedge\dd x^2\wedge\dd x^3$，$*\dd x^i=-\dd x^j\wedge\dd x^k\wedge\dd x^0$），

$$*J=\rho\,\dd x^1\wedge\dd x^2\wedge\dd x^3-j_i\,\dd x^j\wedge\dd x^k\wedge\dd x^0.$$

比较 $\dd x^1\wedge\dd x^2\wedge\dd x^3$ 与 $\dd x^j\wedge\dd x^k\wedge\dd x^0$ 的系数，$\dd*F=-*J$ 恰好给出

$$\nabla\cdot\boldsymbol{E}=\rho,\qquad\nabla\times\boldsymbol{B}-\frac{\partial\boldsymbol{E}}{\partial t}=\boldsymbol{j}.$$

**(b)** 对 (a) 的方程再求一次外微分：$0=\dd(\dd*F)=-\dd*J$。计算

$$\dd*J=\partial_0\rho\,\dd x^0\wedge\dd x^1\wedge\dd x^2\wedge\dd x^3-\partial_ij_i\,\dd x^i\wedge\dd x^j\wedge\dd x^k\wedge\dd x^0=\left(\frac{\partial\rho}{\partial t}+\nabla\cdot\boldsymbol{j}\right)\mathrm{vol},$$

（$\dd x^1\wedge\dd x^2\wedge\dd x^3\wedge\dd x^0=-\mathrm{vol}$，把 $\dd x^0$ 移过三个一形式。）所以 $\partial_\mu J^\mu=\partial\rho/\partial t+\nabla\cdot\boldsymbol{j}=0$：电荷守恒是 $\dd^2=0$ 的推论。

**(c)** 同理，$*A=-A_0\,\dd x^1\wedge\dd x^2\wedge\dd x^3-A_i\,\dd x^j\wedge\dd x^k\wedge\dd x^0$，

$$\dd*A=(-\partial_0A_0+\partial_iA_i)\,\mathrm{vol}=\left(\frac{\partial\phi}{\partial t}+\nabla\cdot\boldsymbol{A}\right)\mathrm{vol}=(\partial_\mu A^\mu)\,\mathrm{vol}.$$

所以 Lorentz 条件 $\partial_\mu A^\mu=0$ 等价于 $\dd*A=0$。（这一问不受下述符号问题影响。）

**一般形式：**$\dd*\alpha$ 对任意一形式 $\alpha$ 给出散度 $\partial_\mu\alpha^\mu$ 乘体积形式，(b)(c) 是同一结构。`}>
        {R`设 $M$ 是 Minkowski 四维时空。定义线性算子 $*:\Omega^r(M)\to\Omega^{4-r}(M)$ 的作用为

$$\begin{aligned}&r=0:&&*1=-\dd x^0\wedge\dd x^1\wedge\dd x^2\wedge\dd x^3;\\&r=1:&&*\dd x^i=-\dd x^j\wedge\dd x^k\wedge\dd x^0,\qquad*\dd x^0=-\dd x^1\wedge\dd x^2\wedge\dd x^3;\\&r=2:&&*\dd x^i\wedge\dd x^j=\dd x^k\wedge\dd x^0,\qquad*\dd x^i\wedge\dd x^0=-\dd x^j\wedge\dd x^k;\\&r=3:&&*\dd x^1\wedge\dd x^2\wedge\dd x^3=-\dd x^0,\qquad*\dd x^i\wedge\dd x^j\wedge\dd x^0=-\dd x^k;\\&r=4:&&*\dd x^0\wedge\dd x^1\wedge\dd x^2\wedge\dd x^3=1;\end{aligned}$$

其中 $(i,j,k)$ 是 $(1,2,3)$ 的偶置换。矢势 $A$ 与电磁张量 $F$ 如例 5.11 所定义。$J=J_\mu\dd x^\mu=-\rho\,\dd x^0+j_k\dd x^k$ 是电流一形式（$J^\mu=(\rho,\boldsymbol{j})$，指标用 $\eta$ 降下）。

(a) 写出方程 $\dd*F=-*J$，验证它化为两个 Maxwell 方程 $\nabla\cdot\boldsymbol{E}=\rho$ 与 $\nabla\times\boldsymbol{B}-\partial\boldsymbol{E}/\partial t=\boldsymbol{j}$。

(b) 证明恒等式 $0=\dd(\dd*F)=-\dd*J$ 化为电荷守恒方程 $\partial_\mu J^\mu=\dfrac{\partial\rho}{\partial t}+\nabla\cdot\boldsymbol{j}=0$。

(c) 证明 Lorentz 条件 $\partial_\mu A^\mu=0$ 可表示为 $\dd*A=0$。`}
      </Exercise>
      <Box kind="warning" title={R`勘误：习题 5.2 中 $J$ 的分量与方程的符号（p.245）`}>{R`原书写 $J=J_\mu\dd x^\mu=\rho\,\dd x^0+j_k\dd x^k$，方程为 $\dd*F=*J$。用题中给出的 $*$ 与例 5.11 的 $F$ 逐项计算（解答 (a)），得到

$$\dd*F=-(\nabla\cdot\boldsymbol{E})\,\dd x^1\wedge\dd x^2\wedge\dd x^3+(\nabla\times\boldsymbol{B}-\partial_t\boldsymbol{E})_i\,\dd x^j\wedge\dd x^k\wedge\dd x^0,$$

而原书的 $J$ 给出 $*J=-\rho\,\dd x^1\wedge\dd x^2\wedge\dd x^3-j_i\,\dd x^j\wedge\dd x^k\wedge\dd x^0$。于是 $\dd*F=*J$ 只能得到 $\nabla\cdot\boldsymbol{E}=\rho$ 与 $\nabla\times\boldsymbol{B}-\partial_t\boldsymbol{E}=-\boldsymbol{j}$——Ampère–Maxwell 定律差一个符号；(b) 也会给出错误的 $\partial_t\rho-\nabla\cdot\boldsymbol{j}=0$。

问题出在指标位置：例 5.11 要求 $A_\mu=(-\phi,\boldsymbol{A})$（下指标），电流一形式也应同样降指标，$J_\mu=\eta_{\mu\nu}J^\nu=(-\rho,\boldsymbol{j})$。用这个 $J$，与题中 $*$ 相容的方程是 $\dd*F=-*J$，三问都得到正确的物理结果（解答已逐项验证）。题面已相应改写。`}</Box>
    </Sec>);
}
