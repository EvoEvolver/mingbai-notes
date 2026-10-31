// 章末习题（Problems 4.1–4.3）
import { Sec, Tx, Exercise } from "@kit";

const R = String.raw;

export function Problems() {
  return (
    <Sec n="4.P" title="Problems" zh="章末习题">
      <Tx>{R`三道题分别练习本章的三种工具：形变收缩（§4.2）、用 $\pi_1$ 证明"不存在"（同伦不变性 + $\pi_1(S^1)=\mathbb{Z}$），以及构造高阶同伦群的代表元（$\pi_3(S^2)$ 的 Hopf 映射，第 9 章例 9.9 还会再见）。`}</Tx>
      <Exercise n="P4.1" title={R`$S^n$ 是 $\mathbb{R}^{n+1}-\{0\}$ 的形变收缩核`} level="★"
        hint={R`与习题 4.2 相同的径向插值，只是 $|x|$ 可以大于 1。`}
        solution={R`**收缩**：$f:\mathbb{R}^{n+1}-\{0\}\to S^n$，$f(x)=x/|x|$。它连续（$x\neq0$），且对 $x\in S^n$ 有 $f(x)=x$，即 $f|_{S^n}=\mathrm{id}_{S^n}$（\sref{D4.7}）。

**形变**：$H:(\mathbb{R}^{n+1}-\{0\})\times I\to\mathbb{R}^{n+1}-\{0\}$，
$$H(x,t)=(1-t)\,x+t\,\frac{x}{|x|}=\Big(1-t+\frac{t}{|x|}\Big)x.$$
因子 $1-t+t/|x|>0$，所以 $H(x,t)\neq0$，确实取值于 $\mathbb{R}^{n+1}-\{0\}$；$H$ 连续。验证 \eqref{4.5}、\eqref{4.6}：$H(x,0)=x$；$H(x,1)=x/|x|\in S^n$；若 $|x|=1$，则 $H(x,t)=x$ 对所有 $t$ 成立。所以 $S^n$ 是 $\mathbb{R}^{n+1}-\{0\}$ 的形变收缩核，二者同伦型相同。

**推论**：$\pi_k(\mathbb{R}^{n+1}-\{0\})\cong\pi_k(S^n)$。例如 $\pi_1(\mathbb{R}^2-\{0\})\cong\mathbb{Z}$（交互图 1），$\pi_2(\mathbb{R}^3-\{0\})\cong\mathbb{Z}$——这正是"三维空间中的点缺陷由 $\pi_2$ 分类"的几何来源：包围缺陷的球面是去掉缺陷后的空间的形变收缩核。`}>
        {R`证明 $n$ 维球面 $S^n$ 是去心欧氏空间 $\mathbb{R}^{n+1}-\{0\}$ 的形变收缩核，并求出一个收缩。`}
      </Exercise>
      <Exercise n="P4.2" title="二维 Brouwer 不动点定理" level="★★"
        hint={R`若 $\tilde f$ 存在，它是 $D^2\to S^1$ 的收缩（$q\in S^1$ 时 $\tilde f(q)=q$）。于是包含映射 $i:S^1\to D^2$ 与 $\tilde f$ 满足 $\tilde f\circ i=\mathrm{id}_{S^1}$。对 $\pi_1$ 取诱导同态。`}
        solution={R`**$\tilde f$ 连续。**设 $f$ 无不动点。对 $p\in D^2$，从 $p$ 出发、沿 $p-f(p)$ 方向（即"从 $f(p)$ 经过 $p$"）的射线与 $S^1$ 交于唯一一点 $q=\tilde f(p)$：解 $|p+s\,u|=1$，$s\ge0$，$u=(p-f(p))/|p-f(p)|$，得 $s=-p\cdot u+\sqrt{(p\cdot u)^2+1-|p|^2}$，它连续依赖于 $p$（分母 $|p-f(p)|>0$）。（原书写"从 $p$ 出发经过 $f(p)$ 的半直线"；两种方向约定都可以，本站取从 $f(p)$ 指向 $p$ 的方向，这样边界点 $p\in S^1$ 满足 $\tilde f(p)=p$——若取另一方向，则需另作讨论。）

**$\tilde f$ 是收缩。**若 $p\in S^1$，射线从 $p$ 出发、方向背离 $f(p)\in D^2$，由凸性它立刻离开圆盘，交点就是 $p$ 本身（$s=0$）。所以 $\tilde f\circ i=\mathrm{id}_{S^1}$，$i:S^1\hookrightarrow D^2$ 为包含映射。

**矛盾（原书提示的路线）。**由 $\tilde f\circ i=\mathrm{id}_{S^1}$ 与 $i\circ\tilde f\sim\mathrm{id}_{D^2}$（$D^2$ 凸，直线同伦 $H(p,t)=(1-t)\,i(\tilde f(p))+tp$ 留在 $D^2$ 中），$i$ 与 $\tilde f$ 互为同伦逆，$D^2\simeq S^1$。由 \sref{T4.3}，$\pi_1(D^2)\cong\pi_1(S^1)$。但 $\pi_1(D^2)=\{e\}$（可缩，\sref{T4.4}），$\pi_1(S^1)=\mathbb{Z}$（\sref{T4.5}）——矛盾。

**另一种说法（只用诱导同态）。**对 $\tilde f\circ i=\mathrm{id}$ 取 $\pi_1$：$\tilde f_*\circ i_*=\mathrm{id}_{\mathbb{Z}}$，而 $i_*$ 经过 $\pi_1(D^2)=\{e\}$，故 $\mathrm{id}_{\mathbb{Z}}$ 是零映射，矛盾。

所以不存在这样的 $\tilde f$，从而 $f$ 必有不动点。（"光滑"的假设其实不需要，连续即可。）`}>
        {R`设 $D^2$ 是二维闭圆盘，$S^1=\partial D^2$ 是它的边界。设 $f:D^2\to D^2$ 是光滑映射，且没有不动点，即对任意 $p\in D^2$ 有 $f(p)\neq p$。考虑从 $p$ 出发、经过 $f(p)$ 的半直线（$p\neq f(p)$ 时它总有定义）。这条线与边界交于某点 $q\in S^1$。定义 $\tilde f:D^2\to S^1$，$\tilde f(p)=q$。利用 $\pi_1(S^1)=\mathbb{Z}$ 与 $\pi_1(D^2)=\{0\}$ 证明这样的 $\tilde f$ 不存在，从而 $f$ 必有不动点。［提示：证明若这样的 $\tilde f$ 存在，则 $D^2$ 与 $S^1$ 同伦型相同。］这是二维的 Brouwer 不动点定理。`}
      </Exercise>
      <Exercise n="P4.3" title={R`$\pi_3(S^2)$ 的类 0 与类 1`} level="★★★"
        hint={R`类 0：常值映射。类 1：Hopf 映射。把 $S^3$ 写成 $\{(z_1,z_2)\in\mathbb{C}^2\mid|z_1|^2+|z_2|^2=1\}$，令 $\boldsymbol{x}=z^\dagger\boldsymbol{\sigma}z$。`}
        solution={R`**类 0**：常值映射 $f_0(z)=\boldsymbol{e}_3$（北极）。它是单位元。

**类 1：Hopf 映射。**把 $S^3$ 写成 $\{z=(z_1,z_2)\in\mathbb{C}^2\mid|z_1|^2+|z_2|^2=1\}$（与 \eqref{4.47} 的 $(a,b)$ 一样），定义
$$f_1(z_1,z_2)=z^\dagger\boldsymbol{\sigma}z=\big(2\,\mathrm{Re}(\bar z_1z_2),\ 2\,\mathrm{Im}(\bar z_1z_2),\ |z_1|^2-|z_2|^2\big).$$
**像在 $S^2$ 上**：$|f_1|^2=4|z_1|^2|z_2|^2+(|z_1|^2-|z_2|^2)^2=(|z_1|^2+|z_2|^2)^2=1$。

**纤维**：$f_1(e^{i\chi}z)=f_1(z)$，每个点的原像是一个大圆 $\{e^{i\chi}z\}\cong S^1$；任何两条纤维**环绕一次**（链环数 1）。这条链环数就是 Hopf 不变量，它给出同构 $\pi_3(S^2)\cong\mathbb{Z}$，$f_1$ 的 Hopf 不变量为 1，所以 $[f_1]$ 是生成元，即类 1。$f_0$ 的纤维要么是空集要么是整个 $S^3$，Hopf 不变量为 0。

**另一种理解（与本章的联系）**：$f_1(z)=U\sigma_3U^\dagger$ 中，若把 $z$ 看成 $U=\begin{pmatrix}z_1&-\bar z_2\\ z_2&\bar z_1\end{pmatrix}\in\mathrm{SU}(2)$ 的第一列，则 $f_1(U)=U\sigma_3U^\dagger$ 对应的单位矢量就是把 $\boldsymbol{e}_3$ 用 $U$ 所代表的转动 $\sym{Rrot}{R}\in\mathrm{SO}(3)$ 转过去：$f_1=(\sym{Rrot}{R}\mapsto \sym{Rrot}{R}\boldsymbol{e}_3)\circ(\mathrm{SU}(2)\to\mathrm{SO}(3))$。纤维化 $S^1\to S^3\to S^2$ 的正合序列给出 $\pi_3(S^3)\cong\pi_3(S^2)$（因为 $\pi_3(S^1)=\pi_2(S^1)=0$），而这个同构由 $f_{1*}$ 实现，把 $\mathrm{id}_{S^3}$（类 1）送到 $[f_1]$。这正是 §4.9.4 中向列相 $\pi_3$ 织构与 §4.10.3 Shankar 单极子背后的映射。

**类 $k$**：$f_1\circ g_k$，$g_k:S^3\to S^3$ 为度 $k$ 的映射（例如 $(z_1,z_2)\mapsto$ 在 $\mathrm{SU}(2)$ 中取 $U^k$）。第 9 章例 9.9 从纤维丛的角度再次讨论 Hopf 映射。`}>
        {R`构造属于 $\pi_3(S^2)\cong\mathbb{Z}$ 的元素 0 与 1 的映射 $f:S^3\to S^2$。另见第 9 章例 9.9。`}
      </Exercise>
    </Sec>);
}
