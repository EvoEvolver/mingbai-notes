// 补充材料 H_II：习题（题意用自己的话复述；提示与完整解答为本站自写，习题 11、12 参照原书所附解答的思路重写）
import { Sec, Sub, Tx, Exercise, Box, Table } from "@kit";
import "./_ch02c_kit.jsx";

const R = String.raw;

export function SecH() {
  return (
    <Sec n="HII" title="Exercises" zh="习题"
      gist={R`十二道练习：前十道练习 Dirac 记号、对易子、本征值与本征矢、算符指数（含 Pauli 矩阵与维里定理）；后两道（原书附有解答）在三维空间里具体检验对易可观测量与 C.S.C.O. 的概念。`}
      why={R`第 II 章的工具只有动手算过才算掌握。习题 11、12 建议在读正文 \IIsec{D-3} 时同步完成。`}
      gives={[]}>
      <Tx>{R`以下题目均用自己的话复述题意要点（记号与数值与原书一致），每题附提示与完整解答。`}</Tx>

      <Sub n="HII-1" title="Dirac notation. Commutators. Eigenvectors and eigenvalues" zh="Dirac 记号、对易子、本征值与本征矢">
        <Exercise n="HII-1" title={R`"矩阵单位"算符 $U(m,n)=\ket{\varphi_m}\bra{\varphi_n}$`} level="★" hint={R`一切都归结为两条：$\braket{\varphi_n|\varphi_q}=\delta_{nq}$ 与封闭关系 $\sum_n\ket{\varphi_n}\bra{\varphi_n}=\mathbb 1$。求迹时在 $\{\ket{\varphi_k}\}$ 基中算对角元。`}
          solution={R`**a．**$U^\dagger(m,n)=(\ket{\varphi_m}\bra{\varphi_n})^\dagger=\ket{\varphi_n}\bra{\varphi_m}=U(n,m)$。

**b．**$HU(m,n)=E_m\ket{\varphi_m}\bra{\varphi_n}$，$U(m,n)H=\ket{\varphi_m}\bra{\varphi_n}H=E_n\ket{\varphi_m}\bra{\varphi_n}$（$H$ 厄米，$\bra{\varphi_n}H=E_n\bra{\varphi_n}$）。所以 $[H,U(m,n)]=(E_m-E_n)U(m,n)$：$U(m,n)$ 是把能量"升高" $E_m-E_n$ 的算符。

**c．**$U(m,n)U^\dagger(p,q)=\ket{\varphi_m}\braket{\varphi_n|\varphi_q}\bra{\varphi_p}=\delta_{nq}\ket{\varphi_m}\bra{\varphi_p}=\delta_{nq}U(m,p)$。

**d．**$\Tr U(m,n)=\sum_k\braket{\varphi_k|\varphi_m}\braket{\varphi_n|\varphi_k}=\sum_k\delta_{km}\delta_{nk}=\delta_{mn}$。

**e．**在 $A$ 两边各插一次封闭关系：$A=\sum_{m,n}\ket{\varphi_m}\braket{\varphi_m|A|\varphi_n}\bra{\varphi_n}=\sum_{m,n}A_{mn}U(m,n)$。$U(m,n)$ 就是"第 $m$ 行第 $n$ 列为 1、其余为 0"的矩阵单位。

**f．**$\Tr\{AU^\dagger(p,q)\}=\Tr\{A\ket{\varphi_q}\bra{\varphi_p}\}=\sum_k\braket{\varphi_k|A|\varphi_q}\braket{\varphi_p|\varphi_k}=\braket{\varphi_p|A|\varphi_q}=A_{pq}$。这给出了从算符"读出"矩阵元的迹公式。`}>
          {R`$\{\ket{\varphi_n}\}$ 是厄米算符 $H$ 的本征矢，构成离散正交归一基，$H\ket{\varphi_n}=E_n\ket{\varphi_n}$。定义 $U(m,n)=\ket{\varphi_m}\bra{\varphi_n}$。

**a．**求 $U^\dagger(m,n)$。**b．**求 $[H,U(m,n)]$。**c．**证明 $U(m,n)U^\dagger(p,q)=\delta_{nq}U(m,p)$。**d．**求 $\Tr\{U(m,n)\}$。**e．**若 $A_{mn}=\braket{\varphi_m|A|\varphi_n}$，证明 $A=\sum_{m,n}A_{mn}U(m,n)$。**f．**证明 $A_{pq}=\Tr\{AU^\dagger(p,q)\}$。`}
        </Exercise>

        <Exercise n="HII-2" title={R`三个矩阵的本征分解：$\sigma_y$、$M$、$L_y$`} level="★★" hint={R`先检查"转置共轭等于自身"。二阶矩阵用迹与行列式求本征值；$L_y$ 可以提出因子 $\hbar/\sqrt2\,i$，剩下一个实反对称矩阵。投影算符 $P=\ket u\bra u$ 的矩阵元是 $u_iu_j^*$。`}
          solution={R`**$\sigma_y=\begin{pmatrix}0&-i\\i&0\end{pmatrix}$。**转置再共轭不变，厄米。$\sigma_y^2=\mathbb 1$，本征值 $\pm1$。本征矢 $\ket{\pm}=\frac1{\sqrt2}(\ket1\pm i\ket2)$（验证：$\sigma_y(1,i)^T=(1,i)^T$）。投影算符
$$P_\pm=\frac12\begin{pmatrix}1&\mp i\\\pm i&1\end{pmatrix}$$
直接相乘可得 $P_+P_-=0$（正交），$P_++P_-=\mathbb 1$（封闭）。

**$M=\begin{pmatrix}2&i\sqrt2\\-i\sqrt2&3\end{pmatrix}$。**厄米。迹 5、行列式 $6-2=4$，本征值是 $\lambda^2-5\lambda+4=0$ 的根：$\lambda=1,4$。
- $\lambda=1$：$(M-1)v=0$ 给 $v_1+i\sqrt2v_2=0$，取 $\ket{u_1}=\frac1{\sqrt3}(\sqrt2\ket1+i\ket2)$；
- $\lambda=4$：$-2v_1+i\sqrt2v_2=0$，取 $\ket{u_4}=\frac1{\sqrt3}(\ket1-i\sqrt2\ket2)$。

两者正交：$\braket{u_1|u_4}=\frac13(\sqrt2-\sqrt2)=0$。投影算符
$$P_1=\frac13\begin{pmatrix}2&-i\sqrt2\\i\sqrt2&1\end{pmatrix},\qquad P_4=\frac13\begin{pmatrix}1&i\sqrt2\\-i\sqrt2&2\end{pmatrix}$$
$P_1+P_4=\mathbb 1$，$P_1P_4=0$，并且 $M=1\cdot P_1+4\cdot P_4$（谱分解）。

**$L_y=\frac\hbar{2i}\begin{pmatrix}0&\sqrt2&0\\-\sqrt2&0&\sqrt2\\0&-\sqrt2&0\end{pmatrix}$。**纯虚数乘实反对称矩阵，厄米。写 $L_y=\frac\hbar{\sqrt2\,i}K$，$K=\begin{pmatrix}0&1&0\\-1&0&1\\0&-1&0\end{pmatrix}$；$Kv=\mu v$ 给 $v_2=\mu v_1$、$v_3=-v_1$（$\mu\ne0$）及 $\mu^2=-2$，或 $\mu=0$、$v_2=0$、$v_3=v_1$。于是 $L_y$ 的本征值为 $\hbar,0,-\hbar$，归一化本征矢
$$\ket{+\hbar}=\tfrac12\big(\ket1+i\sqrt2\ket2-\ket3\big),\quad\ket0=\tfrac1{\sqrt2}\big(\ket1+\ket3\big),\quad\ket{-\hbar}=\tfrac12\big(\ket1-i\sqrt2\ket2-\ket3\big)$$
投影算符
$$P_{\pm\hbar}=\frac14\begin{pmatrix}1&\mp i\sqrt2&-1\\\pm i\sqrt2&2&\mp i\sqrt2\\-1&\pm i\sqrt2&1\end{pmatrix},\qquad P_0=\frac12\begin{pmatrix}1&0&1\\0&0&0\\1&0&1\end{pmatrix}$$
三者两两乘积为零，和为 $\mathbb 1$（例如 (1,1) 元：$\frac14+\frac14+\frac12=1$；(1,3) 元：$-\frac14-\frac14+\frac12=0$）。（这正是第 VI 章中 $l=1$ 角动量的 $L_y$。）`}>
          {R`二维空间的正交归一基 $\{\ket1,\ket2\}$ 中给定 $\sigma_y=\begin{pmatrix}0&-i\\i&0\end{pmatrix}$。

**a．**$\sigma_y$ 厄米吗？求本征值与归一化本征矢（用 $\ket1,\ket2$ 展开）。**b．**写出投影到这些本征矢上的投影算符的矩阵，验证正交关系与封闭关系。**c．**对 $M=\begin{pmatrix}2&i\sqrt2\\-i\sqrt2&3\end{pmatrix}$，以及三维空间中的 $L_y=\frac\hbar{2i}\begin{pmatrix}0&\sqrt2&0\\-\sqrt2&0&\sqrt2\\0&-\sqrt2&0\end{pmatrix}$ 回答同样的问题。`}
        </Exercise>

        <Exercise n="HII-3" title={R`两个右矢的归一化与投影矩阵`} level="★" hint={R`模方 = 系数模方之和。投影到某个态的算符必须用**归一化**后的态：$\ket\chi\bra\chi/\braket{\chi|\chi}$。`}
          solution={R`**a．**$\braket{\psi_0|\psi_0}=\frac12+\frac14+\frac14=1$，已归一。$\braket{\psi_1|\psi_1}=\frac13+\frac13=\frac23$，**未**归一；归一化后为 $\frac1{\sqrt2}(\ket{u_1}+i\ket{u_3})$。

**b．**$\rho_0=\ket{\psi_0}\bra{\psi_0}$，矩阵元 $c_ic_j^*$，$c=(\frac1{\sqrt2},\frac i2,\frac12)$：
$$\rho_0=\begin{pmatrix}\frac12&-\frac{i}{2\sqrt2}&\frac1{2\sqrt2}\\\frac{i}{2\sqrt2}&\frac14&\frac i4\\\frac1{2\sqrt2}&-\frac i4&\frac14\end{pmatrix}$$
投影到 $\ket{\psi_1}$ 所在直线的算符为 $\rho_1=\ket{\psi_1}\bra{\psi_1}/\braket{\psi_1|\psi_1}$：
$$\rho_1=\frac12\begin{pmatrix}1&0&-i\\0&0&0\\i&0&1\end{pmatrix}$$
两个矩阵都满足 $\rho_{ji}=\rho_{ij}^*$，厄米；还可验证 $\rho^2=\rho$、$\Tr\rho=1$。注意若直接用未归一的 $\ket{\psi_1}\bra{\psi_1}$，它的平方是自身的 $\frac23$ 倍，不是投影算符。`}>
          {R`三维空间的正交归一基 $\{\ket{u_1},\ket{u_2},\ket{u_3}\}$ 中，$\ket{\psi_0}=\frac1{\sqrt2}\ket{u_1}+\frac i2\ket{u_2}+\frac12\ket{u_3}$，$\ket{\psi_1}=\frac1{\sqrt3}\ket{u_1}+\frac i{\sqrt3}\ket{u_3}$。

**a．**它们归一吗？**b．**写出投影到 $\ket{\psi_0}$、$\ket{\psi_1}$ 上的投影算符的矩阵 $\rho_0$、$\rho_1$，验证它们厄米。`}
        </Exercise>

        <Exercise n="HII-4" title={R`算符 $K=\ket\varphi\bra\psi$`} level="★★" hint={R`$K^\dagger=\ket\psi\bra\varphi$。比较 $K$ 与 $K^\dagger$ 作用在与 $\ket\psi$ 正交的矢量上的结果。$K^2$ 中间夹着一个数 $\braket{\psi|\varphi}$。`}
          solution={R`设 $\ket\varphi$、$\ket\psi$ 都不为零（否则 $K=0$，各问平凡）。

**a．**$K^\dagger=\ket\psi\bra\varphi$。若 $K=K^\dagger$，取任意 $\ket\chi\perp\ket\psi$：$0=K\ket\chi=K^\dagger\ket\chi=\ket\psi\braket{\varphi|\chi}$，所以 $\ket\varphi$ 与一切垂直于 $\ket\psi$ 的矢量正交，即 $\ket\varphi=c\ket\psi$；代回 $c\ket\psi\bra\psi=c^*\ket\psi\bra\psi$ 得 $c$ 为实数。反之亦然。**结论：$K$ 厄米 $\iff$ $\ket\varphi$ 与 $\ket\psi$ 成比例且比例系数为实数。**

**b．**$K^2=\ket\varphi\braket{\psi|\varphi}\bra\psi=\braket{\psi|\varphi}K$。$K^2=K$ 要求 $\braket{\psi|\varphi}=1$；本书所说的"投影算符"（正交投影）还要求厄米，结合 a 得 $\ket\varphi=\ket\psi$ 且 $\braket{\psi|\psi}=1$——$K$ 就是投影到某个归一化态上的 $\ket\psi\bra\psi$。（只满足 $\braket{\psi|\varphi}=1$ 而不成比例时，$K$ 是"斜投影"。）

**c．**令 $P_1=\frac{\ket\varphi\bra\varphi}{\braket{\varphi|\varphi}}$、$P_2=\frac{\ket\psi\bra\psi}{\braket{\psi|\psi}}$，它们是投影算符，且 $P_1P_2=\frac{\braket{\varphi|\psi}}{\braket{\varphi|\varphi}\braket{\psi|\psi}}\ket\varphi\bra\psi$。所以
$$K=\lambda P_1P_2,\qquad\lambda=\frac{\braket{\varphi|\varphi}\braket{\psi|\psi}}{\braket{\varphi|\psi}}$$
**注意：**这要求 $\braket{\varphi|\psi}\neq0$。若 $\ket\varphi\perp\ket\psi$，则投影到这两个态上的 $P_1P_2=0$，此式不能成立——"总可以"在这一情形需要例外（此时 $K$ 是幂零的，$K^2=0$）。`}>
          {R`$K=\ket\varphi\bra\psi$，$\ket\varphi$、$\ket\psi$ 是态空间中的两个矢量。

**a．**$K$ 何时厄米？**b．**求 $K^2$；$K$ 何时是投影算符？**c．**说明 $K$ 可以写成 $K=\lambda P_1P_2$，$P_1$、$P_2$ 为投影算符，求常数 $\lambda$。`}
        </Exercise>

        <Exercise n="HII-5" title="两个投影算符的乘积" level="★★" hint={R`正交投影算符 $\iff$ 厄米且幂等。$(P_1P_2)^\dagger=P_2P_1$。`}
          solution={R`**充分性。**设 $[P_1,P_2]=0$。则 $(P_1P_2)^\dagger=P_2^\dagger P_1^\dagger=P_2P_1=P_1P_2$，厄米；$(P_1P_2)^2=P_1P_2P_1P_2=P_1P_1P_2P_2=P_1P_2$，幂等。所以 $P_1P_2$ 是正交投影算符。

**必要性。**若 $P_1P_2$ 是正交投影算符，它厄米：$P_1P_2=(P_1P_2)^\dagger=P_2P_1$，即二者对易。

**投影到哪里？**像空间 $\mathrm{Im}(P_1P_2)\subseteq\mathcal E_1$（最后作用的是 $P_1$），又 $P_1P_2=P_2P_1$ 故也 $\subseteq\mathcal E_2$。反过来，若 $\ket\chi\in\mathcal E_1\cap\mathcal E_2$，则 $P_1P_2\ket\chi=\ket\chi$。所以 $P_1P_2$ 是投影到**交集** $\mathcal E_1\cap\mathcal E_2$ 上的投影算符。`}>
          {R`$P_1$、$P_2$ 分别是投影到子空间 $\mathcal E_1$、$\mathcal E_2$ 上的正交投影算符。证明：$P_1P_2$ 也是正交投影算符的充要条件是 $P_1$ 与 $P_2$ 对易；此时 $P_1P_2$ 投影到哪个子空间？`}
        </Exercise>

        <Exercise n="HII-6" title={R`$\mathrm e^{i\alpha\sigma_x}$`} level="★" hint={R`$\sigma_x^2=I$，把指数级数按奇偶次项分组。`}
          solution={R`$\sigma_x^2=I$，所以 $\sigma_x^{2k}=I$，$\sigma_x^{2k+1}=\sigma_x$。按定义 \eqref{BII-24}
$$\mathrm e^{i\alpha\sigma_x}=\sum_k\frac{(i\alpha)^{2k}}{(2k)!}I+\sum_k\frac{(i\alpha)^{2k+1}}{(2k+1)!}\sigma_x=I\sum_k\frac{(-1)^k\alpha^{2k}}{(2k)!}+i\sigma_x\sum_k\frac{(-1)^k\alpha^{2k+1}}{(2k+1)!}=I\cos\alpha+i\sigma_x\sin\alpha$$
另一种看法：$\sigma_x$ 的本征值 $\pm1$，在其本征基中 $\mathrm e^{i\alpha\sigma_x}=\mathrm{diag}(\mathrm e^{i\alpha},\mathrm e^{-i\alpha})=\cos\alpha\,I+i\sin\alpha\,\mathrm{diag}(1,-1)$，与上式一致（\eqref{BII-27}）。`}>
          {R`$\sigma_x=\begin{pmatrix}0&1\\1&0\end{pmatrix}$，$I$ 为 $2\times2$ 单位矩阵。证明 $\mathrm e^{i\alpha\sigma_x}=I\cos\alpha+i\sigma_x\sin\alpha$。`}
        </Exercise>

        <Exercise n="HII-7" title="Pauli 矩阵的指数与次序" level="★★" hint={R`关键：$\sigma_u^2=I$。Pauli 矩阵两两反对易：$\sigma_x\sigma_y=-\sigma_y\sigma_x=i\sigma_z$。$\sigma_x+\sigma_y=\sqrt2\,\sigma_u$（$\lambda=\mu=1/\sqrt2$）。`}
          solution={R`**一般化。**$\sigma_y^2=I$，故同上 $\mathrm e^{i\alpha\sigma_y}=I\cos\alpha+i\sigma_y\sin\alpha$。对 $\sigma_u=\lambda\sigma_x+\mu\sigma_y$：$\sigma_u^2=\lambda^2+\mu^2+\lambda\mu(\sigma_x\sigma_y+\sigma_y\sigma_x)=I$（反对易项为零），所以
$$\mathrm e^{i\alpha\sigma_u}=I\cos\alpha+i\sigma_u\sin\alpha$$
**三个矩阵。**

◆ $\mathrm e^{2i\sigma_x}=I\cos2+i\sigma_x\sin2=\begin{pmatrix}\cos2&i\sin2\\i\sin2&\cos2\end{pmatrix}$。

◆ $(\mathrm e^{i\sigma_x})^2=(I\cos1+i\sigma_x\sin1)^2=I(\cos^21-\sin^21)+2i\sigma_x\sin1\cos1$，与上式**相等**——$i\sigma_x$ 与自身对易，\eqref{BII-33} 适用。

◆ $\sigma_x+\sigma_y=\sqrt2\sigma_u$，故 $\mathrm e^{i(\sigma_x+\sigma_y)}=I\cos\sqrt2+i\frac{\sigma_x+\sigma_y}{\sqrt2}\sin\sqrt2=\begin{pmatrix}\cos\sqrt2&\frac{(1+i)\sin\sqrt2}{\sqrt2}\\\frac{(i-1)\sin\sqrt2}{\sqrt2}&\cos\sqrt2\end{pmatrix}$。

**比较。**$\mathrm e^{i\sigma_x}\mathrm e^{i\sigma_y}=(I\cos1+i\sigma_x\sin1)(I\cos1+i\sigma_y\sin1)=I\cos^21+i(\sigma_x+\sigma_y)\sin1\cos1-i\sigma_z\sin^21$。它含有 $\sigma_z$ 项：对角元为 $\cos^21\mp i\sin^21\approx0.292\mp0.708i$，而 $\mathrm e^{i(\sigma_x+\sigma_y)}$ 的对角元是实数 $\cos\sqrt2\approx0.156$，所以 $\mathrm e^{i(\sigma_x+\sigma_y)}\neq\mathrm e^{i\sigma_x}\mathrm e^{i\sigma_y}$：$\sigma_x$、$\sigma_y$ 不对易，指数不能合并（对照 \eqref{BII-30}–\eqref{BII-33}；交互图 B-1 的"Pauli 型"正是这种情形）。`}>
          {R`对习题 2 中的 $\sigma_y$ 证明类似于习题 6 的公式；再推广到一切 $\sigma_u=\lambda\sigma_x+\mu\sigma_y$（$\lambda^2+\mu^2=1$）。计算 $\mathrm e^{2i\sigma_x}$、$(\mathrm e^{i\sigma_x})^2$ 与 $\mathrm e^{i(\sigma_x+\sigma_y)}$ 的矩阵。$\mathrm e^{2i\sigma_x}$ 等于 $(\mathrm e^{i\sigma_x})^2$ 吗？$\mathrm e^{i(\sigma_x+\sigma_y)}$ 等于 $\mathrm e^{i\sigma_x}\mathrm e^{i\sigma_y}$ 吗？`}
        </Exercise>

        <Exercise n="HII-8" title={R`$P$ 与 $X$ 的矩阵元之间的关系；一个求和规则`} level="★★" hint={R`$[X,H]=\frac{1}{2m}[X,P^2]=\frac{i\hbar}mP$（\eqref{BII-43}）。在 $\bra{\varphi_n}\cdots\ket{\varphi_{n'}}$ 之间取这个等式，$H$ 向两边作用。`}
          solution={R`**a．**一方面 $\braket{\varphi_n|[X,H]|\varphi_{n'}}=(E_{n'}-E_n)\braket{\varphi_n|X|\varphi_{n'}}$；另一方面它等于 $\frac{i\hbar}m\braket{\varphi_n|P|\varphi_{n'}}$。所以
$$\braket{\varphi_n|P|\varphi_{n'}}=\alpha\braket{\varphi_n|X|\varphi_{n'}},\qquad\alpha=\frac{m}{i\hbar}(E_{n'}-E_n)=\frac{im}{\hbar}(E_n-E_{n'})$$
**b．**在 $P^2$ 中间插入封闭关系，并用 $P$ 厄米：
$$\braket{\varphi_n|P^2|\varphi_n}=\sum_{n'}\braket{\varphi_n|P|\varphi_{n'}}\braket{\varphi_{n'}|P|\varphi_n}=\sum_{n'}|\braket{\varphi_n|P|\varphi_{n'}}|^2=\frac{m^2}{\hbar^2}\sum_{n'}(E_n-E_{n'})^2|\braket{\varphi_n|X|\varphi_{n'}}|^2$$
移项即得所求。物理意义：动能平均值由偶极矩阵元与能级差决定（这类关系叫"求和规则"，原子物理中的 Thomas–Reiche–Kuhn 规则是它的近亲）。`}>
          {R`一维粒子 $H=\frac1{2m}P^2+V(X)$，$[X,P]=i\hbar$，本征矢 $H\ket{\varphi_n}=E_n\ket{\varphi_n}$（$n$ 离散）。

**a．**证明 $\braket{\varphi_n|P|\varphi_{n'}}=\alpha\braket{\varphi_n|X|\varphi_{n'}}$，$\alpha$ 只依赖于 $E_n-E_{n'}$；求 $\alpha$（提示：考虑 $[X,H]$）。**b．**由此用封闭关系推出
$$\sum_{n'}(E_n-E_{n'})^2|\braket{\varphi_n|X|\varphi_{n'}}|^2=\frac{\hbar^2}{m^2}\braket{\varphi_n|P^2|\varphi_n}$$`}
        </Exercise>

        <Exercise n="HII-9" title="定态中对易子的平均值；维里定理" level="★★" hint={R`a：让 $H$ 分别向左、向右作用。b：用 \eqref{BII-43}、\eqref{BII-48} 与乘积法则 \eqref{BII-12}。$\gamma$ 取 $A=XP$。`}
          solution={R`**a．**$\braket{\varphi_n|AH-HA|\varphi_n}=E_n\braket{\varphi_n|A|\varphi_n}-E_n\braket{\varphi_n|A|\varphi_n}=0$。

**b．$\alpha$**　$[H,P]=[V(X),P]=i\hbar V'(X)$（由 \eqref{BII-48}）；$[H,X]=\frac1{2m}[P^2,X]=-\frac{i\hbar}mP$；$[H,XP]=[H,X]P+X[H,P]=-\frac{i\hbar}mP^2+i\hbar XV'(X)$。

**$\beta$**　由 $[H,X]=-\frac{i\hbar}mP$ 得 $P=\frac{im}\hbar[H,X]$，用 a：$\braket{\varphi_n|P|\varphi_n}=0$。定态中平均动量为零（束缚态不会"跑掉"）。

**$\gamma$**　对 $A=XP$ 用 a：$0=-\frac{i\hbar}m\braket{P^2}+i\hbar\braket{XV'}$，即
$$2E_k=\Big\langle X\frac{\dd V}{\dd X}\Big\rangle\qquad(\text{维里定理})$$
对 $V=V_0X^s$：$X\frac{\dd V}{\dd X}=sV_0X^s=sV$，所以 $2\langle T\rangle=s\langle V\rangle$，即 $\langle V\rangle=\frac2s E_k$。谐振子（$s=2$）动能与势能平均值相等；$s$ 越大（势阱越接近方阱），势能占的份额越小。`}>
          {R`$H\ket{\varphi_n}=E_n\ket{\varphi_n}$。

**a．**对任意算符 $A$，证明 $\braket{\varphi_n|[A,H]|\varphi_n}=0$。

**b．**一维粒子 $H=\frac1{2m}P^2+V(X)$。**α**　用 $P$、$X$、$V(X)$ 表示 $[H,P]$、$[H,X]$、$[H,XP]$。**$\beta$**　证明 $\braket{\varphi_n|P|\varphi_n}=0$（第 III 章将解释为该态中动量的平均值）。**$\gamma$**　建立动能平均值 $E_k=\braket{\varphi_n|\frac{P^2}{2m}|\varphi_n}$ 与 $\braket{\varphi_n|X\frac{\dd V}{\dd X}|\varphi_n}$ 的关系；当 $V(X)=V_0X^s$（$s=2,4,6,\ldots$；$V_0>0$）时，势能平均值 $\braket{\varphi_n|V(X)|\varphi_n}$ 与动能平均值是什么关系？`}
        </Exercise>

        <Exercise n="HII-10" title={R`$\braket{x|XP|\psi}$ 与 $\braket{x|PX|\psi}$`} level="★" hint={R`$X$ 先作用于左矢 $\bra x$；$P$ 用 $\int\dd p\ket p\bra p$ 展开，$p\,\mathrm e^{ipx/\hbar}=\frac\hbar i\frac{\dd}{\dd x}\mathrm e^{ipx/\hbar}$。`}
          solution={R`先证明 $\braket{x|P|\chi}=\frac\hbar i\frac{\dd}{\dd x}\chi(x)$：$\braket{x|P|\chi}=\int\dd p\,\braket{x|p}\,p\,\braket{p|\chi}=\frac\hbar i\frac{\dd}{\dd x}\int\dd p\,\braket{x|p}\braket{p|\chi}=\frac\hbar i\chi'(x)$。

于是 $\braket{x|XP|\psi}=x\braket{x|P|\psi}=\frac\hbar i\,x\,\psi'(x)$；$\braket{x|PX|\psi}=\frac\hbar i\frac{\dd}{\dd x}[x\psi(x)]=\frac\hbar i[\psi(x)+x\psi'(x)]$。

当然可以直接由"$P$ 作用为 $\frac\hbar i\frac{\dd}{\dd x}$"得到，只要记住 $PX$ 中 $X$ 先作用（求导要作用在 $x\psi$ 上）。两者之差 $\braket{x|[X,P]|\psi}=i\hbar\psi(x)$，正是 $[X,P]=i\hbar$。`}>
          {R`利用 $\braket{x|p}=(2\pi\hbar)^{-1/2}\mathrm e^{ipx/\hbar}$，用 $\psi(x)$ 表示 $\braket{x|XP|\psi}$ 与 $\braket{x|PX|\psi}$。能否直接用"$\{\ket x\}$ 表象中 $P$ 作用为 $\frac\hbar i\frac{\dd}{\dd x}$"得到？`}
        </Exercise>
      </Sub>

      <Sub n="HII-2" title="Complete sets of commuting observables, C.S.C.O." zh="对易可观测量完全集（C.S.C.O.）">
        <Exercise n="HII-11" title={R`$H$ 与 $B$：谁构成 C.S.C.O.？`} level="★★" hint={R`$\ket{u_1}$ 同时是两者的本征矢；剩下的问题在 $\{\ket{u_2},\ket{u_3}\}$ 张成的二维子空间里，那里 $H$ 是单位阵的倍数。`}
          solution={<><Tx>{R`**a．**两矩阵都是实对称的，厄米。

**b．**$\ket{u_1}$ 是 $H$（本征值 $\hbar\omega_0$）与 $B$（本征值 $b$）的公共本征矢，所以只需看二者在 $\mathcal E_2=\mathrm{span}\{\ket{u_2},\ket{u_3}\}$ 中的限制（\secref{BII-3}）。在 $\mathcal E_2$ 中 $H=-\hbar\omega_0 I$ 与任何矩阵对易，故 $[H,B]=0$（直接相乘也可验证）。$B$ 在 $\mathcal E_2$ 中为 $b\begin{pmatrix}0&1\\1&0\end{pmatrix}$，本征矢 $\frac1{\sqrt2}(\ket{u_2}\pm\ket{u_3})$，本征值 $\pm b$；它们自动是 $H$ 的本征矢（本征值 $-\hbar\omega_0$）。公共本征基如下表。`}</Tx>
            <Table head={[R`矢量`, R`$H$ 的本征值`, R`$B$ 的本征值`]} rows={[
              [R`$\ket{p_1}=\ket{u_1}$`, R`$\hbar\omega_0$`, R`$b$`],
              [R`$\ket{p_2}=\frac1{\sqrt2}(\ket{u_2}+\ket{u_3})$`, R`$-\hbar\omega_0$`, R`$b$`],
              [R`$\ket{p_3}=\frac1{\sqrt2}(\ket{u_2}-\ket{u_3})$`, R`$-\hbar\omega_0$`, R`$-b$`],
            ]} />
            <Tx>{R`（准到相位因子，这是唯一的一组归一化公共本征矢。）

**c．**◆ $\{H\}$：$-\hbar\omega_0$ 二重简并，不是。◆ $\{B\}$：$b$ 二重简并（$\ket{u_1}$、$\ket{p_2}$，以及它们的任意组合如 $\frac1{\sqrt3}(\ket{u_1}+\ket{u_2}+\ket{u_3})$），不是。◆ $\{H,B\}$：表中三行的本征值对两两不同，**是** C.S.C.O.——在 $H$ 的简并子空间 $\mathcal E_2$ 中 $B$ 的本征值不同（$\pm b$），在 $B$ 的简并子空间 $\{\ket{u_1},\ket{p_2}\}$ 中 $H$ 的本征值不同。◆ $\{H^2,B\}$：$H^2=\hbar^2\omega_0^2\mathbb 1$，$\ket{p_1}$ 与 $\ket{p_2}$ 给出同一对 $(\hbar^2\omega_0^2,b)$，不是。`}</Tx></>}>
          {R`三维空间的正交归一基 $\{\ket{u_1},\ket{u_2},\ket{u_3}\}$ 中（按此次序）
$$H=\hbar\omega_0\begin{pmatrix}1&0&0\\0&-1&0\\0&0&-1\end{pmatrix},\qquad B=b\begin{pmatrix}1&0&0\\0&0&1\\0&1&0\end{pmatrix}$$
$\omega_0$、$b$ 为实常数。**a．**$H$、$B$ 厄米吗？**b．**证明它们对易，给出公共本征基。**c．**$\{H\}$、$\{B\}$、$\{H,B\}$、$\{H^2,B\}$ 中哪些构成 C.S.C.O.？`}
        </Exercise>

        <Exercise n="HII-12" title={R`$L_z$ 与 $S$：与之对易的最一般矩阵`} level="★★" hint={R`矩阵的第 $j$ 列 = 第 $j$ 个基矢的像的分量。与一个可观测量对易的算符不连接该可观测量不同本征值的本征矢（\IIsec{D-3-a}）。`}
          solution={<><Tx>{R`**a．**按"第 $j$ 列写 $\ket{u_j}$ 的像"：
$$L_z=\begin{pmatrix}1&0&0\\0&0&0\\0&0&-1\end{pmatrix},\quad L_z^2=\begin{pmatrix}1&0&0\\0&0&0\\0&0&1\end{pmatrix},\quad S=\begin{pmatrix}0&0&1\\0&1&0\\1&0&0\end{pmatrix},\quad S^2=\mathbb 1$$
都是实对称矩阵，厄米；有限维中可对角化，都是可观测量。

**b．**◆ 与 $L_z$ 对易：$L_z$ 的三个本征值互不相同，对易算符 $M$ 不能连接不同本征值的本征矢，只能是**对角**矩阵 $\mathrm{diag}(M_{11},M_{22},M_{33})$。

◆ 与 $L_z^2$ 对易：$\ket{u_1}$、$\ket{u_3}$ 同属本征值 1，可以互相连接；$\ket{u_2}$（本征值 0）与它们不连。所以
$$M=\begin{pmatrix}M_{11}&0&M_{13}\\0&M_{22}&0\\M_{31}&0&M_{33}\end{pmatrix}$$
（按 $\ket{u_1},\ket{u_3},\ket{u_2}$ 排序就是分块对角的）。条件比 $L_z$ 宽松。

◆ 与 $S^2=\mathbb 1$ 对易：没有任何限制，$M$ 是任意 $3\times3$ 矩阵。

**c．**$\ket{u_2}$ 是 $L_z^2$（本征值 0）与 $S$（本征值 1）的公共本征矢。在 $\mathrm{span}\{\ket{u_1},\ket{u_3}\}$ 中 $L_z^2=I$，$S=\begin{pmatrix}0&1\\1&0\end{pmatrix}$，本征矢 $\frac1{\sqrt2}(\ket{u_1}\pm\ket{u_3})$。公共本征基如下表。`}</Tx>
            <Table head={[R`矢量`, R`$L_z^2$ 的本征值`, R`$S$ 的本征值`]} rows={[
              [R`$\ket{q_1}=\ket{u_2}$`, R`$0$`, R`$1$`],
              [R`$\ket{q_2}=\frac1{\sqrt2}(\ket{u_1}+\ket{u_3})$`, R`$1$`, R`$1$`],
              [R`$\ket{q_3}=\frac1{\sqrt2}(\ket{u_1}-\ket{u_3})$`, R`$1$`, R`$-1$`],
            ]} />
            <Tx>{R`三行的本征值对互不相同，$\{L_z^2,S\}$ **是** C.S.C.O.；单独的 $L_z^2$ 或 $S$ 都有二重简并，都不是。`}</Tx></>}>
          {R`同一个三维空间中，算符 $L_z$、$S$ 由
$$L_z\ket{u_1}=\ket{u_1},\quad L_z\ket{u_2}=0,\quad L_z\ket{u_3}=-\ket{u_3};\qquad S\ket{u_1}=\ket{u_3},\quad S\ket{u_2}=\ket{u_2},\quad S\ket{u_3}=\ket{u_1}$$
定义。**a．**写出 $L_z$、$L_z^2$、$S$、$S^2$ 的矩阵；它们是可观测量吗？**b．**与 $L_z$ 对易的算符最一般的矩阵是什么形式？与 $L_z^2$、$S^2$ 呢？**c．**$L_z^2$ 与 $S$ 构成 C.S.C.O. 吗？给出公共本征基。`}
        </Exercise>
      </Sub>
    </Sec>);
}
