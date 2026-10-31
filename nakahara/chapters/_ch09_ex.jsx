// 章末习题（Problems 9.1–9.2）
import { Sec, Tx, Exercise } from "@kit";

const R = String.raw;

export function Problems() {
  return (
    <Sec n="9.P" title="Problems" zh="章末习题">
      <Tx>{R`两道题分别练习"用转移函数判断平凡性"（Whitney 和，§9.3.5）与"用微分形式刻画 Hopf 映射的拓扑"（Hopf 不变量，例 9.9 与第 6 章的 de Rham 上同调）。`}</Tx>
      <Exercise n="P9.1" title={R`$L\oplus L$ 是平凡丛`} level="★★"
        hint={R`用例 9.1 的两卡覆盖 $U_1=(0,2\pi)$、$U_2=(-\pi,\pi)$。由 \eqref{9.37}，$L\oplus L$ 的转移函数是 $\mathrm{diag}(t_{12},t_{12})$，即 $A$ 上为 $I_2$，$B$ 上为 $\pm I_2$。关键：$-I_2$ 是转角 $\pi$ 的转动，可以"慢慢转出来"。试求 $g_i:U_i\to\mathrm{GL}(2,\R)$ 使 $T_{12}=g_1^{-1}g_2$（\eqref{9.10}），提示：$g(\theta)=R(\theta/2)$。`}
        solution={R`**归约。**按题设，$L$ 是圆柱或 Möbius 带（事实上 $S^1$ 上任意实线丛都等价于二者之一：在例 9.1 的覆盖下，$t_{12}$ 在连通的 $A$、$B$ 上各有确定的符号，正的因子可以用 \eqref{9.9} 的规范变换吸收）。圆柱：$t_{12}=1$ 处处；Möbius 带：$t_{12}|_A=1$，$t_{12}|_B=-1$。

**圆柱。**$L=S^1\times\R$，$L\oplus L=S^1\times\R^2$ 显然平凡。

**Möbius 带。**由 \eqref{9.37}，$L\oplus L$ 的转移函数为

$$T_{12}(\theta)=\begin{pmatrix}t_{12}&0\\ 0&t_{12}\end{pmatrix}=\begin{cases}I_2,&\theta\in A=(0,\pi)\\ -I_2,&\theta\in B=(\pi,2\pi).\end{cases}$$

记 $R(\alpha)=\begin{pmatrix}\cos\alpha&-\sin\alpha\\ \sin\alpha&\cos\alpha\end{pmatrix}$。在 $U_1=(0,2\pi)$ 上令 $g_1(\theta)=R(\theta/2)$；在 $U_2=(-\pi,\pi)$ 上令 $g_2(\theta')=R(\theta'/2)$。二者都光滑。检验 $g_1^{-1}g_2=T_{12}$：

- 在 $A$ 上，同一点的两个坐标相同（$\theta'=\theta$），$g_1^{-1}g_2=R(-\theta/2)R(\theta/2)=I_2$ ✓；
- 在 $B$ 上，$\theta'=\theta-2\pi$，$g_1^{-1}g_2=R(-\theta/2)R(\theta/2-\pi)=R(-\pi)=-I_2$ ✓。

所以 $T_{12}=g_1^{-1}g_2$ 正是平凡丛转移函数的形式 \eqref{9.10}。具体地，换用新平凡化 $\tilde\phi_i=\phi_i\circ g_i^{-1}$，由 \eqref{9.9}（其中规范变换取 $g_i^{-1}$）得 $\tilde T_{12}=g_1T_{12}g_2^{-1}=g_1(g_1^{-1}g_2)g_2^{-1}=I_2$。所以 $L\oplus L$ 平凡。

**整体标架（等价的说法，\sref{C9.2}）。**在卡 1 中写出两个截面

$$e_1(\theta)=\big(\cos\tfrac\theta2,\ \sin\tfrac\theta2\big),\qquad e_2(\theta)=\big(-\sin\tfrac\theta2,\ \cos\tfrac\theta2\big)\qquad(\text{两个 }L\text{ 分量的纤维坐标}).$$

当 $\theta\to2\pi^-$ 时它们趋于 $(-1,0)$、$(0,-1)$，经过 $B$ 上的粘合 $-I_2$ 恰好与 $\theta\to0^+$ 时的 $(1,0)$、$(0,1)$ 相接，所以是两个处处线性无关的整体截面。

**几何图像（"画出 $L\oplus L$"）。**在每个 $\theta$ 处纤维是一个平面 $\R^2$；把 Möbius 带的纤维看作平面中的一条直线，$L\oplus L$ 的纤维就是包含这条直线的整个平面。沿底圆走一圈，粘合映射 $-I_2$ 把平面绕原点转 $\pi$——但转 $\pi$ 与恒等映射在 $\mathrm{SO}(2)$ 中可以连续连接：让平面在绕圈的过程中逐渐转过 $\theta/2$，正好吸收掉这个 $-I_2$。于是 $L\oplus L$ 同胚于 $S^1\times\R^2$（开的实心环面）。对比：单个 Möbius 带的粘合 $-1\in\mathrm{GL}(1,\R)$ 与 $1$ 不在同一连通分支中，无法这样"转出来"。

**推广。**更一般地，$\pm I_{2}$ 属于 $\mathrm{GL}(2,\R)$ 的同一个连通分支（行列式都为 $+1$），这是 $L\oplus L$ 平凡的根本原因；而 $L\oplus L\oplus L$ 的转移函数 $-I_3$ 行列式为 $-1$，又不平凡了（它不可定向）。`}>
        {R`设 $L$ 是 $S^1$ 上的实线丛（即 $L$ 是圆柱 $S^1\times\R$ 或 Möbius 带）。证明 Whitney 和 $L\oplus L$ 是平凡丛。画出 $L\oplus L$ 的草图以确认这一结果。`}
      </Exercise>

      <Exercise n="P9.2" title="Hopf 不变量" level="★★★"
        hint={R`(a) $\dd$ 与拉回交换；$n\ge2$ 时 $H^n(S^{2n-1})=0$。(b) 两个选择相差闭形式，它在 $S^{2n-1}$ 上恰当；用 Stokes 定理。(c) 在 $S^{2n-1}\times[0,1]$ 上对同伦 $F$ 的拉回 $F^*\Omega_n$ 重复 (a)，注意 $\Omega_n\wedge\Omega_n=0$。(d) 题中提示。(e) 用 $z^0=\cos\frac\chi2\mathrm{e}^{\mathrm{i}\alpha}$、$z^1=\sin\frac\chi2\mathrm{e}^{\mathrm{i}\beta}$ 参数化 $S^3$，则 $\pi$ 把 $(\chi,\alpha,\beta)$ 送到球坐标 $(\theta,\phi)=(\chi,\alpha-\beta)$。`}
        solution={R`约定 $n\ge2$（$n=1$ 时 $H^0$ 的讨论是平凡的）。$\Omega_n$ 是 $S^n$ 上的 $n$ 形式（最高阶），所以 $\dd\Omega_n=0$。

**(a)** $\dd(f^*\Omega_n)=f^*(\dd\Omega_n)=0$（\eqref{5.75}：$\dd$ 与拉回交换），所以 $f^*\Omega_n$ 闭。它是 $S^{2n-1}$ 上的 $n$ 形式，而 $0<n<2n-1$ 时 $H^n(S^{2n-1})=0$（第 6 章：球面只有 $0$ 阶与最高阶上同调），所以闭形式都恰当：$f^*\Omega_n=\dd\omega_{n-1}$。

**(b)** 设 $\dd\omega=\dd\omega'=f^*\Omega_n$，则 $\theta=\omega'-\omega$ 是闭的 $(n-1)$ 形式。$1\le n-1<2n-1$，所以 $H^{n-1}(S^{2n-1})=0$，$\theta=\dd\eta$。于是

$$\int\omega'\wedge\dd\omega'=\int(\omega+\dd\eta)\wedge\dd\omega=\int\omega\wedge\dd\omega+\int\dd(\eta\wedge\dd\omega)=\int\omega\wedge\dd\omega,$$

其中用了 $\dd(\eta\wedge\dd\omega)=\dd\eta\wedge\dd\omega$（因为 $\dd^2=0$），以及 $S^{2n-1}$ 无边界时的 Stokes 定理（\sref{T6.1}）。

**(c)** 设 $F:S^{2n-1}\times I\to S^n$ 是从 $f$ 到 $g$ 的同伦，$I=[0,1]$。$F^*\Omega_n$ 在 $S^{2n-1}\times I$ 上闭；$S^{2n-1}\times I$ 与 $S^{2n-1}$ 同伦等价，$H^n=0$，所以 $F^*\Omega_n=\dd\tilde\omega$。限制到两端 $i_t:S^{2n-1}\to S^{2n-1}\times\{t\}$：$\dd(i_0^*\tilde\omega)=i_0^*F^*\Omega_n=f^*\Omega_n$，同样 $\dd(i_1^*\tilde\omega)=g^*\Omega_n$，所以由 (b) 可用 $i_0^*\tilde\omega$、$i_1^*\tilde\omega$ 计算 $H(f)$、$H(g)$。而

$$\dd(\tilde\omega\wedge\dd\tilde\omega)=\dd\tilde\omega\wedge\dd\tilde\omega=F^*(\Omega_n\wedge\Omega_n)=0,$$

因为 $\Omega_n\wedge\Omega_n$ 是 $S^n$ 上的 $2n$ 形式，$2n>n$。由 Stokes 定理（$\partial(S^{2n-1}\times I)=S^{2n-1}\times\{1\}-S^{2n-1}\times\{0\}$），

$$0=\int_{S^{2n-1}\times I}\dd(\tilde\omega\wedge\dd\tilde\omega)=H(g)-H(f).$$

**(d)** $n$ 奇时 $\omega_{n-1}$ 是偶数阶形式，$\dd\omega_{n-1}$ 是奇数阶。于是

$$\dd(\omega_{n-1}\wedge\omega_{n-1})=\dd\omega_{n-1}\wedge\omega_{n-1}+\omega_{n-1}\wedge\dd\omega_{n-1}=2\,\omega_{n-1}\wedge\dd\omega_{n-1},$$

第二个等号用 $\xi\wedge\eta=(-1)^{qr}\eta\wedge\xi$，$q=n$、$r=n-1$，$qr$ 为偶数。所以 $H(f)=\frac12\int_{S^{2n-1}}\dd(\omega_{n-1}\wedge\omega_{n-1})=0$（Stokes）。

**(e)** $n=2$，$\pi:S^3\to S^2$。**参数化。**$z^0=\cos\frac\chi2\mathrm{e}^{\mathrm{i}\alpha}$，$z^1=\sin\frac\chi2\mathrm{e}^{\mathrm{i}\beta}$，$0\le\chi\le\pi$。由 \eqref{9.53a}–\eqref{9.53c}，$\xi^1+\mathrm{i}\xi^2=2z^0\bar z^1=\sin\chi\,\mathrm{e}^{\mathrm{i}(\alpha-\beta)}$，$\xi^3=\cos\chi$，即 $\theta=\chi$，$\phi=\alpha-\beta$。

**拉回。**$\Omega_2=\frac1{4\pi}\sin\theta\,\dd\theta\wedge\dd\phi$（$\int_{S^2}\Omega_2=1$），所以

$$\pi^*\Omega_2=\frac1{4\pi}\sin\chi\,\dd\chi\wedge(\dd\alpha-\dd\beta).$$

**整体光滑的势。**取

$$\omega_1=-\frac1{4\pi}\big[(1+\cos\chi)\,\dd\alpha+(1-\cos\chi)\,\dd\beta\big]=-\frac1{2\pi}\big(|z^0|^2\dd\alpha+|z^1|^2\dd\beta\big)=-\frac1{2\pi}\,\mathrm{Im}\big(\bar z^0\dd z^0+\bar z^1\dd z^1\big).$$

最后一种写法说明 $\omega_1$ 在整个 $S^3$ 上光滑（在 $z^0=0$ 处 $\dd\alpha$ 无定义，但其系数 $|z^0|^2=0$；$z^1=0$ 同理）。直接计算 $\dd\omega_1=\frac1{4\pi}[\sin\chi\,\dd\chi\wedge\dd\alpha-\sin\chi\,\dd\chi\wedge\dd\beta]=\pi^*\Omega_2$ ✓。（这个 $\omega_1$ 正是第 10 章 Hopf 丛上的典范联络形式，差一个常数因子。）

**计算。**

$$\omega_1\wedge\dd\omega_1=-\frac{1}{16\pi^2}\big[(1+\cos\chi)\dd\alpha+(1-\cos\chi)\dd\beta\big]\wedge\sin\chi\,\dd\chi\wedge(\dd\alpha-\dd\beta)=\frac{2\sin\chi}{16\pi^2}\,\dd\alpha\wedge\dd\chi\wedge\dd\beta.$$

（$\dd\alpha\wedge\dd\chi\wedge(-\dd\beta)$ 项给 $+(1+\cos\chi)$；$\dd\beta\wedge\dd\chi\wedge\dd\alpha=-\dd\alpha\wedge\dd\chi\wedge\dd\beta$ 项给 $+(1-\cos\chi)$。）以 $S^3$ 作为 $\R^4$ 中单位球边界的标准定向，$(\alpha,\chi,\beta)$ 是正定向的坐标（行列式 $\det[\boldsymbol{x},\partial_\alpha\boldsymbol{x},\partial_\chi\boldsymbol{x},\partial_\beta\boldsymbol{x}]>0$，可直接验证）。于是

$$H(\pi)=\frac{2}{16\pi^2}\int_0^{2\pi}\!\dd\alpha\int_0^\pi\!\sin\chi\,\dd\chi\int_0^{2\pi}\!\dd\beta=\frac{2\cdot(2\pi)\cdot2\cdot(2\pi)}{16\pi^2}=1.$$

**几何意义。**Hopf 不变量等于两个一般点的原像（两根纤维）的环绕数。交互图 2 对任意两根纤维数值地计算 Gauss 环绕积分，得到 $\pm1$（符号取决于纤维与 $\R^3$ 的定向约定）。由 (c)，$H$ 是同伦不变量，所以 Hopf 映射不同伦于常值映射：$\pi_3(S^2)\neq0$（事实上 $\pi_3(S^2)\cong\Z$，由 Hopf 不变量给出同构）。`}>
        {R`设 $\Omega_n$ 是 $S^n$ 的体积元，归一化为 $\int_{S^n}\Omega_n=1$。设 $f:S^{2n-1}\to S^n$ 是光滑映射，考虑拉回 $f^*\Omega_n$。

(a) 证明 $f^*\Omega_n$ 是闭的，并可写成 $\dd\omega_{n-1}$，其中 $\omega_{n-1}$ 是 $S^{2n-1}$ 上的 $(n-1)$ 形式。

(b) 证明 **Hopf 不变量**

$$H(f)\equiv\int_{S^{2n-1}}\omega_{n-1}\wedge\dd\omega_{n-1}$$

与 $\omega_{n-1}$ 的选取无关。

(c) 证明若 $f$ 与 $g$ 同伦，则 $H(f)=H(g)$。

(d) 证明 $n$ 为奇数时 $H(f)=0$。［提示：用 $\omega_{n-1}\wedge\dd\omega_{n-1}=\frac12\dd(\omega_{n-1}\wedge\omega_{n-1})$。］

(e) 计算例 9.9 中定义的映射 $\pi:S^3\to S^2$ 的 Hopf 不变量。`}
      </Exercise>
    </Sec>);
}
