// 章末习题（Problems 3.1–3.2）与图 3.13
import { Sec, Tx, Exercise, Figure } from "@kit";

const R = String.raw;

export function Problems() {
  return (
    <Sec n="3.P" title="Problems" zh="章末习题">
      <Tx>{R`两道题都是"曲面分类"的同调版本。解答里用到的工具全部来自本章：连通性给 $H_0$，"所有三角形之和的边界"给 $H_2$，Euler–Poincaré 定理给 $H_1$ 的秩，"两倍的闭路是边界"给挠。\secref{3.4.3} 末尾的计算器可以对任意 $h,q$ 与交叉帽数直接验证答案。`}</Tx>
      <Exercise n="P3.1" title="带环柄与洞的可定向曲面" level="★★"
        hint={R`先算 $\chi$：挖一个洞（删去一个三角形）使 $\chi$ 减 1；加一个环柄相当于与环面做连通和，$\chi(\nosym{A}\#\nosym{B})=\chi(\nosym{A})+\chi(\nosym{B})-2$。再分别讨论 $q=0$ 与 $q\ge1$ 时的 $H_2$，最后用 \eqref{3.57} 求 $b_1$。`}
        solution={R`记曲面为 $\Sigma_{h,q}$（$h$ 个环柄、$q$ 个洞）。

**Euler 示性数。**从 $S^2$（$\chi=2$）出发。挖一个洞：在三角剖分中删去一个 2 单形的内部，$I_0,I_1$ 不变，$I_2$ 减 1，所以 $\chi$ 减 1。加一个环柄：与环面做连通和——两边各删去一个三角形（$\chi$ 各减 1），再把两个三角形边界粘起来（3 个顶点、3 条棱合并，$\chi$ 再减 $3-3=0$），故 $\chi(\nosym{A}\#T^2)=\chi(\nosym{A})+0-2=\chi(\nosym{A})-2$。于是

$$\chi(\Sigma_{h,q})=2-2h-q.$$

**$H_0$。**曲面连通，$H_0\cong\mathbb{Z}$（\sref{T3.5}）。

**$H_2$。**曲面可定向：可以给所有三角形选取一致的定向，使每条内部棱在相邻两个三角形中方向相反。设 $z=\sum m_i\sigma_{2,i}$ 是 2 闭链；内部棱的系数为零迫使相邻三角形系数相等，连通性迫使所有 $m_i=m$。若 $q=0$，所有棱都是内部棱，$\partial_2z=0$ 对任意 $m$ 成立，$H_2=Z_2\cong\mathbb{Z}$（由整个曲面生成，如环面）。若 $q\ge1$，洞边界上的棱只属于一个三角形，在 $\partial_2z$ 中系数为 $\pm m$，所以 $m=0$，$H_2=\{0\}$。

**$H_1$ 的秩。**由 \eqref{3.57}，$b_1=b_0+b_2-\chi$：

$$q=0:\ b_1=1+1-(2-2h)=2h;\qquad q\ge1:\ b_1=1+0-(2-2h-q)=2h+q-1.$$

**$H_1$ 无挠。**设 $nz=\partial_2c$（$n\ge2$，$z\in Z_1$），要证 $z$ 本身是边缘。取一致定向，记 $S=\sum_i\sigma_{2,i}$ 为全部三角形之和，则 $\partial_2S$ 是所有洞边界之和（$q=0$ 时 $\partial_2S=0$），其中每条棱系数为 $\pm1$。对一条内部棱，它在 $\partial_2c$ 中的系数是两侧三角形系数之差，等于 $nz$ 在该棱的系数，故是 $n$ 的倍数；曲面连通，所以 $c$ 的所有系数模 $n$ 同余于某个 $c_0$，可写 $c=c_0S+nc'$。于是 $n(z-\partial_2c')=c_0\,\partial_2S$。若 $q=0$，右边为零，而 $C_1$ 无挠，故 $z=\partial_2c'$。若 $q\ge1$，比较洞边界上某条棱的系数得 $n\mid c_0$，记 $c_0=nc_0'$，则 $z=\partial_2(c'+c_0'S)$。两种情形 $z$ 都是边缘，所以 $H_1$ 没有挠。

直观的生成元：每个环柄的 $a_i,b_i$（\figref{3.11}），加上 $q$ 条洞边界 $c_1,\ldots,c_q$；它们满足一个关系 $c_1+\cdots+c_q=\partial_2S\sim0$，故独立的只有 $q-1$ 条。

**答案：**

$$q=0:\quad H_0\cong\mathbb{Z},\quad H_1\cong\mathbb{Z}^{2h},\quad H_2\cong\mathbb{Z},\quad\chi=2-2h;$$
$$q\ge1:\quad H_0\cong\mathbb{Z},\quad H_1\cong\mathbb{Z}^{2h+q-1},\quad H_2\cong\{0\},\quad\chi=2-2h-q.$$

交互计算器对 $0\le h\le4$、$0\le q\le4$ 实际构造三角剖分并用 Smith 标准形算出的结果与此完全一致（例如 $h=2,q=3$：$I=27/87/55$，$H_1\cong\mathbb{Z}^6$，$\chi=-5$）。`}>
        {R`最一般的可定向二维曲面是带有 $h$ 个环柄、$q$ 个洞的 2 维球面。计算这个曲面的同调群与 Euler 示性数。`}
      </Exercise>
      <Figure n="3.13" caption={R`$S^2$ 上的一个洞，其边按图示方式粘合（交叉帽）。可以考虑带 $q$ 个这种洞的 $S^2$。`} width="40%" />
      <Exercise n="P3.2" title="带交叉帽的球面" level="★★"
        hint={R`按 \figref{3.13} 粘合洞的边，相当于与 $\sym{RP}{\mathbb{R}P^2}$ 做连通和；$\chi(\sym{RP}{\mathbb{R}P^2})=1$。仿照例 3.11 与 3.13：把所有三角形以相同系数相加，边界是什么？`}
        solution={R`记曲面为 $N_q$（$q\ge1$ 个交叉帽）。按图 3.13 粘合一个洞的边，就是把一个 Möbius 带的边界缝到洞上；结果与 $\sym{RP}{\mathbb{R}P^2}$ 做了一次连通和（题中已指出 $q=1$ 时得到 $\sym{RP}{\mathbb{R}P^2}$）。

**Euler 示性数。**$\chi(\nosym{A}\#\sym{RP}{\mathbb{R}P^2})=\chi(\nosym{A})+1-2=\chi(\nosym{A})-1$，故

$$\chi(N_q)=2-q.$$

**$H_0\cong\mathbb{Z}$**（连通）。

**$H_2\cong\{0\}$。**设 $z=\sum m_i\sigma_{2,i}$ 是 2 闭链。在球面部分与每个交叉帽内部可以一致定向，内部棱的系数为零迫使所有 $m_i=m$；但每个交叉帽的粘合线 $c_j$（\figref{3.13} 中被粘起来的边）在两侧以**相同**方向出现，所以 $\partial_2z=2m(c_1+\cdots+c_q)$（与 \eqref{3.47} 相同的机制），只能 $m=0$。

**$H_1$。**生成元可取 $q$ 条交叉帽闭路 $c_1,\ldots,c_q$（每条都像 $\sym{RP}{\mathbb{R}P^2}$ 中的 $z$）；任何 1 闭链都同调于它们的整系数组合。唯一的关系来自上一段：所有三角形之和的边界给出

$$2(c_1+c_2+\cdots+c_q)\sim0.$$

于是 $H_1\cong\mathbb{Z}^q/\langle2(1,1,\ldots,1)\rangle$。换一组基 $e=c_1+\cdots+c_q,\ c_2,\ldots,c_q$（这是幺模变换），关系只涉及 $e$：$2e\sim0$。所以

$$H_1(N_q)\cong\mathbb{Z}^{q-1}\oplus\mathbb{Z}_2.$$

**检验：**$b_0-b_1+b_2=1-(q-1)+0=2-q=\chi$ ✓；$q=1$ 给出 $\sym{RP}{\mathbb{R}P^2}$ 的 $H_1\cong\mathbb{Z}_2$（\eqref{3.48}），$q=2$ 给出 Klein 瓶的 $\mathbb{Z}\oplus\mathbb{Z}_2$（\eqref{3.51}）——Klein 瓶正是两个交叉帽的球面。

**答案：**$H_0\cong\mathbb{Z}$，$H_1\cong\mathbb{Z}^{q-1}\oplus\mathbb{Z}_2$，$H_2\cong\{0\}$，$\chi=2-q$。交互计算器对 $q=1,\ldots,4$ 的实际计算与此一致；同时有 $h$ 个环柄与 $c\ge1$ 个交叉帽时结果是 $H_1\cong\mathbb{Z}^{2h+c-1}\oplus\mathbb{Z}_2$，这说明"一个环柄 = 两个交叉帽"（在已有交叉帽时）。`}>
        {R`考虑带一个洞的球面，并按 \figref{3.13} 所示粘合洞的边。得到的曲面就是射影平面 $\sym{RP}{\mathbb{R}P^2}$。更一般地，考虑带 $q$ 个这种"交叉帽"（crosscap）的球面，计算它的同调群与 Euler 示性数。`}
      </Exercise>
    </Sec>);
}
