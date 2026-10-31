// §6.2 de Rham 上同调群 —— 式 (6.11)–(6.27)，定义 6.1–6.2，定理 6.2，推论 6.1，例 6.1–6.3，习题 6.2–6.4，交互图 2
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, Erratum, Table, C } from "@kit";
import { WindingLab } from "./_ch06_demos.jsx";

const R = String.raw;

export function Sec62() {
  return (
    <Sec n="6.2" title="de Rham cohomology groups" zh="de Rham 上同调群"
      gist={R`$H^r(M)=Z^r(M)/B^r(M)$：**闭形式模恰当形式**。$H^0$ 数连通分支，$H^1(\mathbb{R})=0$，$H^1(S^1)\cong\mathbb{R}$。积分 $(c,\omega)=\int_c\omega$ 满足 $(c,\dd\omega)=(\partial c,\omega)$，诱导 $H_r\times H^r\to\mathbb{R}$；**de Rham 定理**说它非退化，于是 $b^r=b_r$、$\chi(M)=\sum(-1)^rb^r$。`}
      why={R`这一节完成本章的主要构造：用微分形式定义一个拓扑不变量，并证明（引用 de Rham 定理）它与第 3 章的同调群携带同样的信息——只是以对偶的方式。`}
      gives={["6.11", "6.12", "6.13", "6.14", "6.16", "6.17", "6.20", "6.21", "6.24", "6.25", "6.26", "6.27"]}>
      <Sub621 />
      <Sub622 />
    </Sec>);
}

function Sub621() {
  return (
    <Sub n="6.2.1" title="Definitions" zh="定义">
      <p className="muted">本小节概念：<C id="closed_exact" /> · <C id="derham" /></p>
      <Tx>{R`**类比是全部的动机。**第 3 章里，$\partial^2=0$ 保证"边缘都是闭链"，于是可以做商 $Z_r/B_r$。第 5 章证明了 $\dd^2=0$（\eqref{5.72}），所以"恰当形式都是闭形式"，同样可以做商。下面的定义就是这一句话的正式版本。`}</Tx>
      <Stmt id="D6.1" />
      <Tx>{R`回忆（第 5 章）：$\omega$ 称为**闭形式**（closed form），若 $\dd\omega=0$；称为**恰当形式**（exact form），若存在 $\psi$ 使 $\omega=\dd\psi$。上闭链群就是 $\dd:\Omega^r(M)\to\Omega^{r+1}(M)$ 的核，上边缘群是 $\dd:\Omega^{r-1}(M)\to\Omega^r(M)$ 的像——与 $Z_r=\ker\partial_r$、$B_r=\operatorname{im}\partial_{r+1}$ 相比，箭头的方向反了过来，这就是"上"（co-）的含义。

下面这道习题说明：闭形式在外积下封闭，而恰当形式是其中的"理想"——这是 \secref{6.4.2} 上同调环结构的基础。`}</Tx>
      <Exercise n="6.2" title="闭与恰当在外积下的行为" level="★"
        hint={R`用 Leibniz 律 $\dd(\omega\wedge\psi)=\dd\omega\wedge\psi+(-1)^r\omega\wedge\dd\psi$（$\omega$ 为 $r$ 形式，\eqref{5.69}）。`}
        solution={R`设 $\omega$ 为 $r$ 形式，$\psi$ 为 $s$ 形式。

**(a)** $\dd\omega=\dd\psi=0$，故 $\dd(\omega\wedge\psi)=\dd\omega\wedge\psi+(-1)^r\omega\wedge\dd\psi=0$，即 $\omega\wedge\psi\in Z^{r+s}(M)$。

**(b)** $\dd\omega=0$，$\psi=\dd\chi$（$\chi\in\Omega^{s-1}(M)$）。则 $\dd(\omega\wedge\chi)=\dd\omega\wedge\chi+(-1)^r\omega\wedge\dd\chi=(-1)^r\omega\wedge\psi$，所以

$$\omega\wedge\psi=\dd\big((-1)^r\omega\wedge\chi\big)\in B^{r+s}(M).$$

**(c)** 恰当形式都是闭的（$B^r\subset Z^r$），所以 (c) 是 (b) 的特例。同理（或用 $\omega\wedge\psi=(-1)^{rs}\psi\wedge\omega$）闭 ∧ 恰当、恰当 ∧ 闭都是恰当。`}>
        <Tx>{R`证明：(a) 若 $\omega\in Z^r(M)$、$\psi\in Z^s(M)$，则 $\omega\wedge\psi\in Z^{r+s}(M)$；(b) 若 $\omega\in Z^r(M)$、$\psi\in B^s(M)$，则 $\omega\wedge\psi\in B^{r+s}(M)$；(c) 若 $\omega\in B^r(M)$、$\psi\in B^s(M)$，则 $\omega\wedge\psi\in B^{r+s}(M)$。`}</Tx>
      </Exercise>
      <Stmt id="D6.2">
        <Eq n="6.11" keyEq title="de Rham 上同调群" say={R`第 $r$ 个 de Rham 上同调群：闭 $r$ 形式模去恰当 $r$ 形式。它数的是"局部有原形式、整体却没有"的闭形式有多少个独立的类。`}>{R`H^r(M;\mathbb{R})\equiv Z^r(M)/B^r(M).`}</Eq>
      </Stmt>
      <Tx>{R`设 $\omega\in Z^r(M)$。则 $[\omega]\in H^r(M)$ 是等价类 $\{\omega'\in Z^r(M)\mid\omega'=\omega+\dd\psi,\ \psi\in\Omega^{r-1}(M)\}$。相差一个恰当形式的两个闭形式称为**上同调的**（cohomologous）。我们将看到 $H^r(M)$ 与 $H_r(M)$ 同构（\sref{T6.2}）。下面的例子帮助建立直觉。`}</Tx>
      <Box kind="physics" title="上同调类 = 规范等价类">{R`电磁学里矢势 $A$ 与 $A+\dd\chi$ 给出同一个场强 $F=\dd A$。在场强为零的区域里 $A$ 是闭形式；"$A$ 能否被规范变换完全消去"正是"$[A]$ 是否为零"。Aharonov–Bohm 实验中，螺线管外 $F=0$，但 $[A]\neq0$：它的周期 $\oint A=\Phi$ 可以通过干涉条纹测量（本章开场）。`}</Box>

      <Box kind="example" n="6.1" title={R`$H^0$：局部常值函数`}>
        <Tx>{R`$r=0$ 时 $B^0(M)$ 没有意义，因为没有 $(-1)$ 形式。规定 $\Omega^{-1}(M)$ 为零空间 $\{0\}$，于是 $B^0(M)=0$。从而 $H^0(M)=Z^0(M)=\{f\in\Omega^0(M)=\mathcal{F}(M)\mid\dd f=0\}$。若 $M$ 连通，$\dd f=0$ 当且仅当 $f$ 在 $M$ 上为常数（$\dd f=0$ 推出 $f$ 局部常值，而局部常值函数的每个水平集既开又闭）。因此 $H^0(M)$ 同构于向量空间 $\mathbb{R}$：`}</Tx>
        <Eq n="6.12" say="连通流形上导数为零的函数只有常数，所以零阶上同调就是一条实数轴。">{R`H^0(M)\cong\mathbb{R}.`}</Eq>
        <Tx>{R`若 $M$ 有 $n$ 个连通分支，$\dd f=0$ 当且仅当 $f$ 在每个分支上为常数，由 $n$ 个实数决定：`}</Tx>
        <Eq n="6.13" say={R`每个连通分支贡献一个独立的常数，所以 $H^0$ 的维数就是连通分支数——与第 3 章的 $H_0$ 数分支完全对应。`}>{R`H^0(M)\cong\underbrace{\mathbb{R}\oplus\mathbb{R}\oplus\cdots\oplus\mathbb{R}}_{n}.`}</Eq>
      </Box>
      <Erratum kind="note" loc="p.251 例 6.1" title={R`"$\Omega^{-1}(M)$ 为空集"应理解为零空间`}>{R`原书说"定义 $\Omega^{-1}(M)$ 为空集（empty）"。向量空间不能是空集——它至少含零向量。应理解为 $\Omega^{-1}(M)=\{0\}$，于是 $B^0(M)=\dd(\{0\})=\{0\}$，结论不变。`}</Erratum>

      <Box kind="example" n="6.2" title={R`$M=\mathbb{R}$：$H^1(\mathbb{R})=0$`}>
        <Tx>{R`由例 6.1，$H^0(\mathbb{R})=\mathbb{R}$。再求 $H^1(\mathbb{R})$。设 $x$ 是 $\mathbb{R}$ 的坐标。因为 $\dim\mathbb{R}=1$，任何一形式 $\omega\in\Omega^1(\mathbb{R})$ 都是闭的（$\dd\omega$ 是 2 形式，必为零）。设 $\omega=f\,\dd x$，$f\in\mathcal{F}(\mathbb{R})$。定义函数

$$F(x)=\int_0^xf(s)\,\dd s\in\mathcal{F}(\mathbb{R})=\Omega^0(\mathbb{R}).$$

因为 $\dd F(x)/\dd x=f(x)$，$\omega$ 是恰当的：

$$\omega=f\,\dd x=\frac{\dd F(x)}{\dd x}\dd x=\dd F.$$

于是任何一形式既闭又恰当，我们得到`}</Tx>
        <Eq n="6.14" say="实直线上每个一形式都有原函数（不定积分），所以一阶上同调为零：直线没有洞。">{R`H^1(\mathbb{R})=\{0\}.`}</Eq>
      </Box>

      <Box kind="example" n="6.3" title={R`圆周：$H^1(S^1)\cong\mathbb{R}$`}>
        <Tx>{R`设 $S^1=\{e^{\mathrm{i}\theta}\mid0\le\theta<2\pi\}$。$S^1$ 连通，故 $H^0(S^1)=\mathbb{R}$。下面算 $H^1(S^1)$。设 $\omega=f(\theta)\,\dd\theta\in\Omega^1(S^1)$（$f$ 是周期为 $2\pi$ 的光滑函数）。能否写成 $\omega=\dd F$，$F\in\mathcal{F}(S^1)$？重复上例的分析：若 $\omega=\dd F$，$F$ 必为（相差常数）

$$F(\theta)=\int_0^\theta f(\theta')\,\dd\theta'.$$

为使 $F$ 在 $S^1$ 上单值，必须有周期性 $F(2\pi)=F(0)\ (=0)$，即

$$F(2\pi)=\int_0^{2\pi}f(\theta')\,\dd\theta'=0.$$

若定义映射 $\lambda:\Omega^1(S^1)\to\mathbb{R}$：`}</Tx>
        <Eq n="6.15" say={R`给每个一形式指定它绕圆周一圈的积分（周期）；周期为零恰好是有单值原函数的条件。`}>{R`\lambda:\omega=f\,\dd\theta\mapsto\int_0^{2\pi}f(\theta')\,\dd\theta'`}</Eq>
        <Tx>{R`则 $B^1(S^1)$ 恰好就是 $\ker\lambda$。$S^1$ 上所有一形式都闭，$Z^1(S^1)=\Omega^1(S^1)$；$\lambda$ 是满射（$\lambda(\frac{b}{2\pi}\dd\theta)=b$）。由同态基本定理（\sref{T3.1}，对向量空间同样成立）：`}</Tx>
        <Eq n="6.16" keyEq title={R`$H^1(S^1)\cong\mathbb{R}$`} say={R`圆周的一阶上同调是一维的：一个一形式的上同调类完全由它绕圈的积分决定。`}>{R`H^1(S^1)=\Omega^1(S^1)/\ker\lambda=\operatorname{im}\lambda=\mathbb{R}.`}</Eq>
        <Tx>{R`**另一种看法。**设 $\omega,\omega'$ 是两个闭而不恰当的形式。$\omega-\omega'$ 一般不恰当，但总存在 $a\in\mathbb{R}$ 使 $\omega'-a\omega$ 恰当。事实上，令

$$a=\int_0^{2\pi}\omega'\Big/\int_0^{2\pi}\omega$$

（分母非零，因为 $\omega$ 不恰当），则 $\int_0^{2\pi}(\omega'-a\omega)=0$，由上面的判据它恰当。这说明：给定一个闭而不恰当的形式 $\omega$，任何闭形式 $\omega'$ 都与某个 $a\omega$ 上同调；每个上同调类由一个实数 $a$ 指定，故 $H^1(S^1)=\mathbb{R}$，由 $[\dd\theta]$ 生成。（注意 $\dd\theta$ 是 $S^1$ 上处处有定义的光滑一形式，尽管"$\theta$"不是 $S^1$ 上的单值函数。）`}</Tx>
      </Box>

      <Exercise n="6.3" title={R`平面去掉原点：角形式`} level="★★"
        hint={R`(a) 直接验证 $\partial_x\big(\frac{x}{x^2+y^2}\big)=\partial_y\big(\frac{-y}{x^2+y^2}\big)$。(b) 求导 $\tan^{-1}(y/x)$；判断恰当性时，计算 $\omega$ 沿单位圆的积分，并用 Stokes 定理。`}
        solution={R`**(a)** $\dd\omega=\Big[\partial_x\Big(\frac{x}{x^2+y^2}\Big)-\partial_y\Big(\frac{-y}{x^2+y^2}\Big)\Big]\dd x\wedge\dd y$，而

$$\partial_x\frac{x}{x^2+y^2}=\frac{y^2-x^2}{(x^2+y^2)^2},\qquad\partial_y\frac{-y}{x^2+y^2}=\frac{-(x^2+y^2)+2y^2}{(x^2+y^2)^2}=\frac{y^2-x^2}{(x^2+y^2)^2},$$

两者相等，$\dd\omega=0$。

**(b)** 在 $x\neq0$ 处，$\dd\tan^{-1}(y/x)=\frac{1}{1+y^2/x^2}\Big(-\frac{y}{x^2}\dd x+\frac1x\dd y\Big)=\frac{-y\,\dd x+x\,\dd y}{x^2+y^2}=\omega$。所以**局部**地 $\omega=\dd F$，$F$ 就是极角 $\theta$（相差常数）。

但 $\omega$ **不是**恰当的。把单位圆参数化为 $(\cos t,\sin t)$，$0\le t\le2\pi$：$\omega$ 拉回为 $\frac{-\sin t(-\sin t)+\cos t\cos t}{1}\dd t=\dd t$，所以 $\oint_{S^1}\omega=2\pi$。若存在光滑单值函数 $G$ 使 $\omega=\dd G$，由 Stokes 定理 $\oint_{S^1}\dd G=\int_{\partial S^1}G=0$（$\partial S^1=\emptyset$），矛盾。问题在于"函数" $F=\tan^{-1}(y/x)$：它在 $x=0$ 上没有定义；任何连续的选支（极角 $\theta$）绕原点一圈要增加 $2\pi$，不是 $M=\mathbb{R}^2-\{0\}$ 上的单值函数。

**结论：**$[\omega]\neq0\in H^1(\mathbb{R}^2-\{0\})$。进一步，$\mathbb{R}^2-\{0\}$ 同伦等价于 $S^1$（径向收缩 $x\mapsto x/|x|$），由 \sref{T6.4}，$H^1(\mathbb{R}^2-\{0\})\cong H^1(S^1)\cong\mathbb{R}$，由 $[\omega]$ 生成；任何闭一形式 $\eta$ 都满足 $\eta-\frac{1}{2\pi}\big(\oint_{S^1}\eta\big)\omega$ 恰当。交互图 2 数值演示了 $\oint_C\omega=2\pi\times$（$C$ 绕原点的圈数）。`}>
        <Tx>{R`设 $M=\mathbb{R}^2-\{0\}$。定义一形式`}</Tx>
        <Eq n="6.17" keyEq title="平面上的角形式" say={R`平面去掉原点上的"角形式"：处处闭，局部是极角的微分，但绕原点一圈积分为 $2\pi$，所以整体上不是任何函数的微分。`}>{R`\omega=\frac{-y}{x^2+y^2}\dd x+\frac{x}{x^2+y^2}\dd y.`}</Eq>
        <Tx>{R`(a) 证明 $\omega$ 是闭的。(b) 定义"函数" $F(x,y)=\tan^{-1}(y/x)$，证明 $\omega=\dd F$。$\omega$ 是恰当的吗？`}</Tx>
      </Exercise>
      <WindingLab />
    </Sub>);
}

function Sub622() {
  return (
    <Sub n="6.2.2" title={R`Duality of $H_r(M)$ and $H^r(M)$; de Rham's theorem`} zh={R`$H_r(M)$ 与 $H^r(M)$ 的对偶；de Rham 定理`}>
      <p className="muted">本小节概念：<C id="period" /> · <C id="betti_analytic" /> · <C id="stokes" /></p>
      <Tx>{R`顾名思义，**上**同调群是同调群的对偶空间，而对偶由 Stokes 定理提供。**我们要做的事**：(1) 用积分把链与形式配成一对；(2) 证明这一配对能下降到 $H_r\times H^r$；(3) 引用 de Rham 定理说它非退化。

**链与形式的内积。**设 $M$ 是 $m$ 维流形，$C_r(M)$ 为其链群。取 $c\in C_r(M)$、$\omega\in\Omega^r(M)$，$1\le r\le m$，定义内积 $(\ ,\ ):C_r(M)\times\Omega^r(M)\to\mathbb{R}$：`}</Tx>
      <Eq n="6.18" say="链与形式的“内积”就是把形式在链上积分：链是量具，形式是被量的东西。">{R`c,\omega\mapsto(c,\omega)\equiv\int_c\omega.`}</Eq>
      <Tx>{R`$(c,\omega)$ 显然对 $c$ 与 $\omega$ 都是线性的；$(\ ,\omega)$ 可以看作作用于 $c$ 的线性映射，反之亦然：`}</Tx>
      <Eq n="6.19a" say="对链是线性的：在两条链之和上的积分是两个积分之和。">{R`(c_1+c_2,\omega)=\int_{c_1+c_2}\omega=\int_{c_1}\omega+\int_{c_2}\omega`}</Eq>
      <Eq n="6.19b" say="对形式是线性的：两个形式之和的积分是各自积分之和。">{R`(c,\omega_1+\omega_2)=\int_c(\omega_1+\omega_2)=\int_c\omega_1+\int_c\omega_2.`}</Eq>
      <Tx>{R`于是 Stokes 定理有了一个紧凑的形式：`}</Tx>
      <Eq n="6.20" keyEq title={R`$\dd$ 与 $\partial$ 互为伴随`} say={R`Stokes 定理的内积形式：外微分 $\dd$ 是边界算子 $\partial$ 的伴随，就像矩阵与它的转置。`}>{R`(c,\dd\omega)=(\partial c,\omega).`}</Eq>
      <Tx>{R`在这个意义下，外微分算子 $\dd$ 是边界算子 $\partial$ 的**伴随**（adjoint），反之亦然。若把 $C_r$ 与 $\Omega^r$ 想成有限维空间，$(\ ,\ )$ 想成矩阵配对，那么 $\dd$ 的矩阵就是 $\partial$ 的矩阵的转置；"转置的核与像"恰好对偶于"原矩阵的余核与像"——这就是 de Rham 定理在有限维线性代数里的影子。`}</Tx>
      <Exercise n="6.4" title="边缘与恰当形式的周期为零" level="★"
        hint={R`两种情形各用一次 \eqref{6.20}。`}
        solution={R`**(i)** $c=\partial c'$（$c'\in C_{r+1}(M)$），$\dd\omega=0$：$(c,\omega)=(\partial c',\omega)=(c',\dd\omega)=0$。

**(ii)** $\partial c=0$，$\omega=\dd\psi$（$\psi\in\Omega^{r-1}(M)$）：$(c,\omega)=(c,\dd\psi)=(\partial c,\psi)=0$。

几何意义：(i) 闭形式在任何"边界"上的积分为零——它对"把闭链连续扫过一块区域"不敏感；(ii) 恰当形式在任何闭链上的积分为零——它看不到"洞"。`}>
        <Tx>{R`设 (i) $c\in B_r(M)$、$\omega\in Z^r(M)$，或 (ii) $c\in Z_r(M)$、$\omega\in B^r(M)$。证明两种情形下都有 $(c,\omega)=0$。`}</Tx>
      </Exercise>
      <Tx>{R`**下降到同调与上同调。**内积 $(\ ,\ )$ 自然诱导出 $H_r(M)$ 与 $H^r(M)$ 元素之间的内积 $\Lambda$。设 $[c]\in H_r(M)$、$[\omega]\in H^r(M)$，定义 $\Lambda:H_r(M)\times H^r(M)\to\mathbb{R}$：`}</Tx>
      <Eq n="6.21" keyEq title="同调–上同调配对" say={R`同调类与上同调类的配对：取任意代表闭链与代表闭形式积分；Stokes 定理保证结果与代表的选取无关。`}>{R`\Lambda([c],[\omega])\equiv(c,\omega)=\int_c\omega.`}</Eq>
      <Proof title={R`$\Lambda$ 良定义`} steps={[
        { claim: R`换闭链的代表元：$c\to c+\partial c'$，$c'\in C_{r+1}(M)$。由 Stokes 定理与 $\dd\omega=0$：`, tex: R`(c+\partial c',\omega)=(c,\omega)+(c',\dd\omega)=(c,\omega)`, uses: ["6.20"] },
        { claim: R`换闭形式的代表元：$\omega\to\omega+\dd\psi$，$\psi\in\Omega^{r-1}(M)$。由 $\partial c=0$：`, tex: R`(c,\omega+\dd\psi)=(c,\omega)+(\partial c,\psi)=(c,\omega)`, uses: ["6.20"] },
        { claim: R`因此 $\Lambda(\ ,[\omega])$ 是线性映射 $H_r(M)\to\mathbb{R}$，$\Lambda([c],\ )$ 是线性映射 $H^r(M)\to\mathbb{R}$。` },
      ]} />
      <Erratum kind="erratum" loc="p.253 第 2 段" title={R`"内积 $\lambda$" 应为 $\Lambda$`}>{R`原书在引入同调–上同调配对时先写作小写 $\lambda$（与例 6.3 的周期映射 $\lambda$ 撞名），随即在 \eqref{6.21} 中写作 $\Lambda$。正文统一用 $\Lambda$。`}</Erratum>
      <Tx>{R`要证明 $H_r(M)$ 与 $H^r(M)$ 互为对偶，还需证明 $\Lambda(\ ,[\omega])$ 有最大秩，即 $\dim H_r(M)=\dim H^r(M)$。我们接受下面这条属于 de Rham 的定理，不加证明——它的证明高度非平凡。`}</Tx>
      <Stmt id="T6.2" />
      <Derivation title="非退化 ⇒ 维数相等（线性代数补充）" collapsed steps={[
        { tex: R`\Lambda:V\times W\to\mathbb{R}\ \text{双线性},\quad V=H_r(M),\ W=H^r(M)\ \text{有限维}`, why: R`de Rham 定理的前半句保证有限维（$M$ 紧致）。` },
        { tex: R`\text{左非退化}:\ \Lambda(v,\cdot)=0\Rightarrow v=0\quad\Longrightarrow\quad V\hookrightarrow W^*,\ \dim V\le\dim W`, why: R`$v\mapsto\Lambda(v,\cdot)$ 是单射。` },
        { tex: R`\text{右非退化}:\ \Lambda(\cdot,w)=0\Rightarrow w=0\quad\Longrightarrow\quad W\hookrightarrow V^*,\ \dim W\le\dim V`, why: "同理。" },
        { tex: R`\dim V=\dim W,\qquad W\cong V^*`, why: R`单射 $W\to V^*$ 在维数相等时是同构。` },
      ]} result={R`所以 $\dim H^r(M)=\dim H_r(M)=b_r(M)$，即 \eqref{6.25}。`} />
      <Tx>{R`**周期。**闭 $r$ 形式 $\omega$ 沿闭链 $c$ 的**周期**（period）定义为 $(c,\omega)=\int_c\omega$。习题 6.4 表明：若 $\omega$ 恰当或 $c$ 是边缘，周期为零。由 de Rham 定理容易推出下面的推论。`}</Tx>
      <Stmt id="C6.1">
        <Eq n="6.22" say={R`判别恰当性只需检查有限多个周期：闭形式在一组同调基的每一条闭链上的积分都为零，它就是恰当的。`}>{R`\int_{c_i}\psi=0\qquad(1\le i\le k).`}</Eq>
        <Eq n="6.23" say={R`周期可以任意指定：对任意一组实数，都有闭形式以它们为在基闭链上的积分。`}>{R`\int_{c_i}\omega=b_i\qquad(1\le i\le k).`}</Eq>
        <Proof steps={[
          { claim: R`**(a)** "⇒"：恰当形式的周期为零（习题 6.4(ii)）。"⇐"：设所有 $\int_{c_i}\psi=0$。由于 $\{[c_i]\}$ 是 $H_r(M)$ 的基，线性推出 $\Lambda([c],[\psi])=0$ 对一切 $[c]\in H_r(M)$ 成立。de Rham 定理说双线性型 $\Lambda$ 非退化：把 $\Lambda(\ ,[\psi])$ 看作 $H_r(M)$ 上的线性函数，它为零迫使 $[\psi]$ 是平凡元，即恰当形式的类。所以 $\psi$ 恰当。`, uses: ["T6.2"], fill: true, why: R`原书把 $\Lambda([c_i],\ )$ 看作 $H^r(M)$ 上的线性映射，说"其核只含平凡元"。严格地说，是**所有** $\Lambda([c_i],\ )$ 的公共核只含平凡元——这需要 $\{[c_i]\}$ 张成 $H_r(M)$。` },
          { claim: R`**(b)** de Rham 定理保证：对同调基 $\{[c_i]\}$，可以选取 $H^r(M)$ 的对偶基 $\{[\omega_i]\}$，使`, uses: ["T6.2"] },
        ]} qed={false} />
        <Eq n="6.24" say={R`选一组闭形式，使第 $j$ 个只在第 $j$ 条基闭链上积出 1、在其余基闭链上积出 0——同调基的对偶基。`}>{R`\Lambda([c_i],[\omega_j])=\int_{c_i}\omega_j=\delta_{ij}.`}</Eq>
        <Tx>{R`令 $\omega\equiv\sum_{i=1}^kb_i\omega_i$，则闭 $r$ 形式 $\omega$ 满足 $\int_{c_i}\omega=b_i$，正如所断言。$\square$`}</Tx>
      </Stmt>
      <Tx>{R`例如，我们看到下列群的对偶：

(a) $H^0(M)\cong H_0(M)\cong\underbrace{\mathbb{R}\oplus\cdots\oplus\mathbb{R}}_{n}$，若 $M$ 有 $n$ 个连通分支（配对：在 0 闭链"点"上取函数值；局部常值函数由它在每个分支的一点上的值决定）；

(b) $H^1(S^1)\cong H_1(S^1)\cong\mathbb{R}$（配对：$\Lambda([S^1],[\dd\theta])=2\pi$；$\frac1{2\pi}\dd\theta$ 是 $[S^1]$ 的对偶基）。

由于 $H^r(M)$ 与 $H_r(M)$ 同构，我们得到`}</Tx>
      <Eq n="6.25" keyEq title={R`$b^r=b_r$`} say={R`用微分形式数出的“洞”与用闭链数出的“洞”一样多：上同调的维数等于 Betti 数。`}>{R`b^r(M)\equiv\dim H^r(M)=\dim H_r(M)=b_r(M)`}</Eq>
      <Tx>{R`其中 $b_r(M)$ 是 $M$ 的 Betti 数（第 3 章 \eqref{3.56}）。于是 Euler 示性数可以写成`}</Tx>
      <Eq n="6.26" keyEq title="Euler 示性数的解析表达" say={R`Euler 示性数等于各阶 de Rham 上同调维数的交错和：左边是纯拓扑量，右边由偏微分方程 $\dd\omega=0$ 的解空间决定。`}>{R`\chi(M)=\sum_{r=0}^m(-1)^rb^r(M).`}</Eq>
      <Box kind="warning" title={R`勘误：\eqref{6.26} 的求和从 $r=0$ 开始（p.255）`}>{R`原书印作 $\sum_{r=1}^m$。Euler–Poincaré 定理（第 3 章 \eqref{3.57}）的求和从 $r=0$ 开始，$b^0$ 必须计入：例如 $S^2$ 有 $b^0=b^2=1$、$b^1=0$，正确的 $\chi=1-0+1=2$，而从 $r=1$ 求和会得到 $1$。正文已改正。`}</Box>
      <Tx>{R`这是一个相当有趣的公式：左边是纯**拓扑**的，右边却由一个**解析**条件给出（$\dd\omega=0$ 是一组偏微分方程）。我们将反复遇到拓扑与分析的这种相互作用——第 7 章的 Hodge 定理、第 12 章的指标定理都是它的发展。

**总结：两个复形。**我们有链复形 $C(M)$ 与 de Rham 复形 $\Omega^*(M)$：`}</Tx>
      <Eq n="6.27" say={R`上一行是链复形，箭头 $\partial$ 降维；下一行是 de Rham 复形，箭头 $\dd$ 升维。两者都满足“连续两步为零”，积分把它们逐项配对。`}>{R`\begin{matrix}\longleftarrow C_{r-1}(M)\xleftarrow{\ \partial_r\ }C_r(M)\xleftarrow{\ \partial_{r+1}\ }C_{r+1}(M)\longleftarrow\\\longrightarrow\Omega^{r-1}(M)\xrightarrow{\ \dd_r\ }\Omega^r(M)\xrightarrow{\ \dd_{r+1}\ }\Omega^{r+1}(M)\longrightarrow\end{matrix}`}</Eq>
      <Tx>{R`对它们，第 $r$ 同调群与第 $r$ de Rham 上同调群分别定义为

$$H_r(M)=Z_r(M)/B_r(M)=\ker\partial_r/\operatorname{im}\partial_{r+1},\qquad H^r(M)=Z^r(M)/B^r(M)=\ker\dd_{r+1}/\operatorname{im}\dd_r .$$

（这里 $\dd_r:\Omega^{r-1}(M)\to\Omega^r(M)$，下标表示"到达"的阶数，与 $\partial_r:C_r\to C_{r-1}$ 按"出发"的阶数编号恰好错开一位。）`}</Tx>
      <Erratum kind="erratum" loc={R`p.255 \eqref{6.27}`} title="de Rham 复形最右端的箭头方向">{R`原书第二行最右端印作 "$\Omega^{r+1}(M)\longleftarrow$"。de Rham 复形中所有箭头都是 $\dd$，指向阶数升高的方向，应为 $\longrightarrow$。正文已改正。`}</Erratum>
      <Table head={["", "同调（第 3 章、§6.1）", "de Rham 上同调（本节）"]} rows={[
        ["对象", R`链 $c\in C_r(M)$`, R`形式 $\omega\in\Omega^r(M)$`],
        ["算子", R`$\partial:C_r\to C_{r-1}$，$\partial^2=0$`, R`$\dd:\Omega^r\to\Omega^{r+1}$，$\dd^2=0$`],
        ["“闭”", R`闭链 $\partial c=0$`, R`闭形式 $\dd\omega=0$`],
        ["“平凡”", R`边缘 $c=\partial c'$`, R`恰当形式 $\omega=\dd\psi$`],
        ["商", R`$H_r=Z_r/B_r$`, R`$H^r=Z^r/B^r$`],
        ["配对与对偶", R`$\Lambda([c],[\omega])=\int_c\omega$`, R`de Rham：非退化，$H^r\cong(H_r)^*$`],
      ]} />
    </Sub>);
}
