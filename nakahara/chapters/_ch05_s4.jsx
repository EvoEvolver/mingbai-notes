// §5.4 微分形式 —— 式 (5.59)–(5.96)，定义 5.4–5.5，例 5.10–5.12，习题 5.13–5.18，表 5.1；交互图 3（外微分与 d²=0、Stokes 数值验证）
import { Sec, Sub, Tx, Eq, Box, Stmt, Exercise, Derivation, Table, C, FormulaMap } from "@kit";
import { FM_5_87 } from "./_ch05_fmaps.jsx";
import { FormsLab } from "./_ch05_demos.jsx";

const R = String.raw;

export function Sec54() {
  return (
    <Sec n="5.4" title="Differential forms" zh="微分形式"
      gist={R`对称化与反对称化 → $r$ 形式 = 全反对称 $(0,r)$ 张量（\sref{D5.4}），楔积 $\wedge$，$\dim\Omega^r_p=\binom{m}{r}$ → 外微分 $\dd$（\sref{D5.5}）统一 grad/rot/div，满足 $\dd^2=0$、与拉回交换 → de Rham 复形、闭形式与恰当形式 → 内积 $\mathrm{i}_X$ 与 Cartan 公式 $\mathcal{L}_X=\dd\mathrm{i}_X+\mathrm{i}_X\dd$ → 用形式重写 Maxwell 方程与 Hamilton 力学。`}
      why={R`微分形式是"可以在流形上积分的东西"，也是唯一一类不需要任何额外结构就能求导（外微分）的张量。$\dd^2=0$ 与第 3 章的 $\partial^2=0$ 配对，引出第 6 章的 de Rham 上同调。`}
      gives={["5.62", "5.63", "5.65", "5.67b", "5.68", "5.69", "5.70", "5.72", "5.75", "5.78", "5.82"]}>
      <p className="muted">本节概念：<C id="diff_form" /> · <C id="ext_derivative" /></p>
      <Tx>{R`定义微分形式之前，先考察张量的对称性质。张量 $\omega\in\mathcal{T}^0_{r,p}(M)$ 上的**对称操作**定义为`}</Tx>
      <Eq n="5.59" say={R`置换操作：把喂给张量的 $r$ 个向量按置换 $P$ 重新排序后再喂进去。`}>{R`P\omega(V_1,\ldots,V_r)\equiv\omega(V_{P(1)},\ldots,V_{P(r)})`}</Eq>
      <Tx>{R`其中 $V_i\in T_pM$，$P$ 是 $r$ 阶**对称群**（symmetric group）$S_r$ 的元素。取坐标基 $\{e_\mu\}=\{\partial/\partial x^\mu\}$，$\omega$ 在这组基下的分量为

$$\omega(e_{\mu_1},e_{\mu_2},\ldots,e_{\mu_r})=\omega_{\mu_1\mu_2\ldots\mu_r}.$$

由 \eqref{5.59}，$P\omega$ 的分量为

$$P\omega(e_{\mu_1},e_{\mu_2},\ldots,e_{\mu_r})=\omega_{\mu_{P(1)}\mu_{P(2)}\ldots\mu_{P(r)}}.$$

对一般的 $(q,r)$ 型张量，对称操作对 $q$ 个指标与 $r$ 个指标分别定义。对 $\omega\in\mathcal{T}^0_{r,p}(M)$，**对称化子**（symmetrizer）$\mathcal{S}$ 定义为`}</Tx>
      <Eq n="5.60" say={R`对称化：对所有置换求平均，得到对任意交换都不变的张量。`}>{R`\mathcal{S}\omega=\frac{1}{r!}\sum_{P\in S_r}P\omega`}</Eq>
      <Tx>{R`而**反对称化子**（anti-symmetrizer）$\mathcal{A}$ 为`}</Tx>
      <Eq n="5.61" title="反对称化子" say={R`反对称化：对所有置换带符号求平均，得到交换任意两个变量就变号的张量——微分形式就是这样的张量。`}>{R`\mathcal{A}\omega=\frac{1}{r!}\sum_{P\in S_r}\operatorname{sgn}(P)P\omega`}</Eq>
      <Tx>{R`其中偶置换 $\operatorname{sgn}(P)=+1$，奇置换 $\operatorname{sgn}(P)=-1$。$\mathcal{S}\omega$ **全对称**（即对任意 $P\in S_r$ 有 $P\mathcal{S}\omega=\mathcal{S}\omega$），$\mathcal{A}\omega$ **全反对称**（$P\mathcal{A}\omega=\operatorname{sgn}(P)\mathcal{A}\omega$）。`}</Tx>

      <Sub n="5.4.1" title="Definitions" zh="定义">
        <Stmt id="D5.4" />
        <Tx>{R`用全反对称的张量积定义 $r$ 个一形式的**楔积**（wedge product）$\wedge$：`}</Tx>
        <Eq n="5.62" keyEq title="楔积" say={R`楔积就是把张量积对所有次序带符号求和：交换两个因子变号，同一个因子出现两次就为零。`}>{R`\dd x^{\mu_1}\wedge\dd x^{\mu_2}\wedge\ldots\wedge\dd x^{\mu_r}=\sum_{P\in S_r}\operatorname{sgn}(P)\,\dd x^{\mu_{P(1)}}\otimes\dd x^{\mu_{P(2)}}\otimes\ldots\otimes\dd x^{\mu_{P(r)}}.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{5.62} 右边是 $\otimes$（p.216）`}>{R`原书 \eqref{5.62} 右边的乘号印成了 $\wedge$，使定义变成循环定义。按紧接着的例子（$\dd x^\mu\wedge\dd x^\nu=\dd x^\mu\otimes\dd x^\nu-\dd x^\nu\otimes\dd x^\mu$）和"全反对称的张量积"这一说法，右边应是张量积 $\otimes$。正文已改正。`}</Box>
        <Tx>{R`例如

$$\begin{aligned}\dd x^\mu\wedge\dd x^\nu&=\dd x^\mu\otimes\dd x^\nu-\dd x^\nu\otimes\dd x^\mu\\ \dd x^\lambda\wedge\dd x^\mu\wedge\dd x^\nu&=\dd x^\lambda\otimes\dd x^\mu\otimes\dd x^\nu+\dd x^\nu\otimes\dd x^\lambda\otimes\dd x^\mu+\dd x^\mu\otimes\dd x^\nu\otimes\dd x^\lambda\\&\quad-\dd x^\lambda\otimes\dd x^\nu\otimes\dd x^\mu-\dd x^\nu\otimes\dd x^\mu\otimes\dd x^\lambda-\dd x^\mu\otimes\dd x^\lambda\otimes\dd x^\nu.\end{aligned}$$

容易验证楔积满足：

(i) 若某个指标 $\mu$ 至少出现两次，则 $\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}=0$；
(ii) $\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}=\operatorname{sgn}(P)\,\dd x^{\mu_{P(1)}}\wedge\ldots\wedge\dd x^{\mu_{P(r)}}$；
(iii) $\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}$ 对每个 $\dd x^\mu$ 是线性的。

（注意这个约定下 $\dd x^1\wedge\dd x^2(e_1,e_2)=1$，即 $\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\mu_r}=r!\,\mathcal{A}(\dd x^{\mu_1}\otimes\cdots\otimes\dd x^{\mu_r})$。）

把 $p\in M$ 处 $r$ 形式的向量空间记作 $\Omega^r_p(M)$。\eqref{5.62} 形式的 $r$ 形式构成 $\Omega^r_p(M)$ 的基，$\omega\in\Omega^r_p(M)$ 展开为`}</Tx>
        <Eq n="5.63" title="r 形式的展开" say={R`$r$ 形式按楔积基展开；分量取全反对称，$1/r!$ 抵消同一组指标的 $r!$ 种排列重复计数。`}>{R`\omega=\frac{1}{r!}\omega_{\mu_1\mu_2\ldots\mu_r}\dd x^{\mu_1}\wedge\dd x^{\mu_2}\wedge\ldots\wedge\dd x^{\mu_r}`}</Eq>
        <Tx>{R`其中 $\omega_{\mu_1\mu_2\ldots\mu_r}$ 取为**全反对称**，反映了基的反对称性。例如任意二阶张量的分量 $\omega_{\mu\nu}$ 可以分解为对称部分 $\sigma_{\mu\nu}$ 与反对称部分 $\alpha_{\mu\nu}$：`}</Tx>
        <Eq n="5.64a" say="二阶张量的对称部分。">{R`\sigma_{\mu\nu}=\omega_{(\mu\nu)}\equiv\tfrac12(\omega_{\mu\nu}+\omega_{\nu\mu})`}</Eq>
        <Eq n="5.64b" say={R`二阶张量的反对称部分——只有它能与 $\dd x^\mu\wedge\dd x^\nu$ 缩并出非零结果。`}>{R`\alpha_{\mu\nu}=\omega_{[\mu\nu]}\equiv\tfrac12(\omega_{\mu\nu}-\omega_{\nu\mu}).`}</Eq>
        <Tx>{R`注意 $\sigma_{\mu\nu}\dd x^\mu\wedge\dd x^\nu=0$（对称乘反对称，交换哑指标后等于自己的负值），而 $\alpha_{\mu\nu}\dd x^\mu\wedge\dd x^\nu=\omega_{\mu\nu}\dd x^\mu\wedge\dd x^\nu$。

**维数。**\eqref{5.62} 中从 $(1,2,\ldots,m)$ 选出 $(\mu_1,\mu_2,\ldots,\mu_r)$ 有 $\binom{m}{r}$ 种方式（次序只影响符号），所以向量空间 $\Omega^r_p(M)$ 的维数是

$$\binom{m}{r}=\frac{m!}{(m-r)!\,r!}.$$

为了后面方便，定义 $\Omega^0_p(M)=\R$。显然 $\Omega^1_p(M)=T^*_pM$。若 \eqref{5.62} 中 $r$ 超过 $m$，它恒为零，因为在反对称求和中必有某个指标至少出现两次。等式 $\binom{m}{r}=\binom{m}{m-r}$ 意味着 $\dim\Omega^r_p(M)=\dim\Omega^{m-r}_p(M)$。由于 $\Omega^r_p(M)$ 是向量空间，$\Omega^r_p(M)$ 同构于 $\Omega^{m-r}_p(M)$（见 §2.2；第 7 章的 Hodge 星算子给出一个典范的同构）。

**外积。**把楔积平凡地推广，定义 $q$ 形式与 $r$ 形式的**外积**（exterior product）$\wedge:\Omega^q_p(M)\times\Omega^r_p(M)\to\Omega^{q+r}_p(M)$。设 $\omega\in\Omega^q_p(M)$，$\xi\in\Omega^r_p(M)$，$(q+r)$ 形式 $\omega\wedge\xi$ 作用在 $q+r$ 个向量上定义为`}</Tx>
        <Eq n="5.65" title="外积" say={R`两个形式的外积：把 $q+r$ 个向量的所有分配方式带符号求和，前 $q$ 个喂给 $\omega$、后 $r$ 个喂给 $\xi$；除以 $q!r!$ 抵消每组内部的重排。`}>{R`(\omega\wedge\xi)(V_1,\ldots,V_{q+r})=\frac{1}{q!\,r!}\sum_{P\in S_{q+r}}\operatorname{sgn}(P)\,\omega(V_{P(1)},\ldots,V_{P(q)})\,\xi(V_{P(q+1)},\ldots,V_{P(q+r)})`}</Eq>
        <Tx>{R`其中 $V_i\in T_pM$。若 $q+r>m$，$\omega\wedge\xi$ 恒为零。有了这个乘法，就定义了一个代数`}</Tx>
        <Eq n="5.66" say={R`把各阶形式直和起来，在外积下封闭：这是 $p$ 点的外代数（Grassmann 代数），总维数 $2^m$。`}>{R`\Omega^*_p(M)\equiv\Omega^0_p(M)\oplus\Omega^1_p(M)\oplus\ldots\oplus\Omega^m_p(M).`}</Eq>
        <Tx>{R`$\Omega^*_p(M)$ 是 $p$ 处全体微分形式的空间，对外积封闭。`}</Tx>
        <Exercise n="5.13" title="极坐标中的面积元" level="★"
          hint={R`把 $x=r\cos\theta$、$y=r\sin\theta$ 的微分代入，用 $\dd r\wedge\dd r=\dd\theta\wedge\dd\theta=0$、$\dd\theta\wedge\dd r=-\dd r\wedge\dd\theta$。`}
          solution={R`$\dd x=\cos\theta\,\dd r-r\sin\theta\,\dd\theta$，$\dd y=\sin\theta\,\dd r+r\cos\theta\,\dd\theta$。于是

$$\dd x\wedge\dd y=\cos\theta\cdot r\cos\theta\,\dd r\wedge\dd\theta-r\sin\theta\cdot\sin\theta\,\dd\theta\wedge\dd r=r(\cos^2\theta+\sin^2\theta)\,\dd r\wedge\dd\theta=r\,\dd r\wedge\dd\theta.$$

（$\dd r\wedge\dd r$、$\dd\theta\wedge\dd\theta$ 项为零。）系数 $r$ 正是 Jacobi 行列式 $\det\partial(x,y)/\partial(r,\theta)$——这就是 \eqref{5.99} 的特例：$m$ 形式在换坐标时乘上 Jacobi 行列式。`}>
          {R`取 $\R^2$ 中的直角坐标 $(x,y)$。二形式 $\dd x\wedge\dd y$ 是有向面积元（初等向量代数中的向量积）。证明它在极坐标中变成 $r\,\dd r\wedge\dd\theta$。`}
        </Exercise>
        <Exercise n="5.14" title="外积的代数规则" level="★★"
          hint={R`先对基形式证明：由 \eqref{5.65} 与 \eqref{5.62}，基形式的外积就是把楔积"接起来"：$(\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\mu_q})\wedge(\dd x^{\nu_1}\wedge\cdots\wedge\dd x^{\nu_r})=\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\nu_r}$。再数需要多少次对换。`}
          solution={R`**引理：基形式的外积是"拼接"。**设 $\omega=\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\mu_q}$，$\xi=\dd x^{\nu_1}\wedge\cdots\wedge\dd x^{\nu_r}$。由 \eqref{5.62}，$\omega(W_1,\ldots,W_q)=\sum_{Q\in S_q}\operatorname{sgn}(Q)\prod_a\dd x^{\mu_{Q(a)}}(W_a)$，$\xi$ 同理。代入 \eqref{5.65}，三重求和 $\sum_P\sum_Q\sum_{Q'}$ 中每一项都是某个 $S_{q+r}$ 元素（$P$ 复合上作用在前 $q$ 个、后 $r$ 个位置上的 $Q,Q'$）的符号乘相应的乘积，每个 $S_{q+r}$ 元素恰好出现 $q!\,r!$ 次。除以 $q!\,r!$ 后正是 $\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\mu_q}\wedge\dd x^{\nu_1}\wedge\cdots\wedge\dd x^{\nu_r}$ 按 \eqref{5.62} 在 $(V_1,\ldots,V_{q+r})$ 上的值。

**(5.67b)** 由双线性，只需对基形式证明。把 $\dd x^{\nu_1}\wedge\cdots\wedge\dd x^{\nu_r}$ 整块移到 $\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\mu_q}$ 前面：每个 $\dd x^{\nu_b}$ 要越过 $q$ 个 $\dd x^\mu$，共 $qr$ 次相邻对换，每次变号（性质 (ii)），所以 $\xi\wedge\eta=(-1)^{qr}\eta\wedge\xi$。

**(5.67a)** 在 (5.67b) 中取 $\eta=\xi$、$r=q$ 为奇数：$\xi\wedge\xi=(-1)^{q^2}\xi\wedge\xi=-\xi\wedge\xi$，故 $\xi\wedge\xi=0$。（$q$ 为偶数时不一定为零：在 $\R^4$ 中 $(\dd x^1\wedge\dd x^2+\dd x^3\wedge\dd x^4)^{\wedge2}=2\,\dd x^1\wedge\dd x^2\wedge\dd x^3\wedge\dd x^4\neq0$。）

**(5.67c)** 由引理，两边在基形式上都等于三段楔积的拼接 $\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\nu_1}\wedge\cdots\wedge\dd x^{\lambda_s}$；再由三线性推广到一般形式。`}>
          <>
            <Tx>{R`设 $\xi\in\Omega^q_p(M)$，$\eta\in\Omega^r_p(M)$，$\omega\in\Omega^s_p(M)$。证明`}</Tx>
            <Eq n="5.67a" say={R`奇数阶形式与自己的外积为零（对一形式就是 $\dd x\wedge\dd x=0$）。`}>{R`\xi\wedge\xi=0\qquad\text{若 }q\text{ 为奇数}`}</Eq>
            <Eq n="5.67b" title="外积的分次交换律" say={R`交换两个形式的次序，符号是两个阶数之积的奇偶：只要有一个是偶数阶，它们就可交换。`}>{R`\xi\wedge\eta=(-1)^{qr}\eta\wedge\xi`}</Eq>
            <Eq n="5.67c" say="外积满足结合律。">{R`(\xi\wedge\eta)\wedge\omega=\xi\wedge(\eta\wedge\omega).`}</Eq>
          </>
        </Exercise>
        <Tx>{R`可以在流形 $M$ 的每一点光滑地指定一个 $r$ 形式。$M$ 上光滑 $r$ 形式的空间记作 $\Omega^r(M)$；并定义 $\Omega^0(M)$ 为光滑函数的代数 $\mathcal{F}(M)$。总结为表 5.1。`}</Tx>
        <Table caption="表 5.1　各阶微分形式的基与维数" head={["$r$ 形式", "基", "维数"]} rows={[
          [R`$\Omega^0(M)=\mathcal{F}(M)$`, R`$\{1\}$`, R`$1$`],
          [R`$\Omega^1(M)=T^*M$`, R`$\{\dd x^\mu\}$`, R`$m$`],
          [R`$\Omega^2(M)$`, R`$\{\dd x^{\mu_1}\wedge\dd x^{\mu_2}\}$`, R`$m(m-1)/2$`],
          [R`$\Omega^3(M)$`, R`$\{\dd x^{\mu_1}\wedge\dd x^{\mu_2}\wedge\dd x^{\mu_3}\}$`, R`$m(m-1)(m-2)/6$`],
          [R`$\vdots$`, R`$\vdots$`, R`$\vdots$`],
          [R`$\Omega^m(M)$`, R`$\{\dd x^1\wedge\dd x^2\wedge\ldots\wedge\dd x^m\}$`, R`$1$`],
        ]} />
      </Sub>

      <Sub n="5.4.2" title="Exterior derivatives" zh="外微分">
        <Stmt id="D5.5" />
        <Eq n="5.68" keyEq title="外微分" say={R`外微分对分量求偏导，再把新的方向 $\dd x^\nu$ 楔到最前面——楔积自动把导数反对称化，结果与坐标无关。`}>{R`\dd_r\omega=\frac{1}{r!}\left(\frac{\partial}{\partial x^\nu}\omega_{\mu_1\ldots\mu_r}\right)\dd x^\nu\wedge\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}.`}</Eq>
        <Tx>{R`通常省去下标 $r$，简写为 $\dd$。楔积自动把系数反对称化。`}</Tx>
        <Box kind="example" n="5.10" title="三维空间中的 grad、rot、div">
          <Tx>{R`三维空间中的 $r$ 形式为：
(i) $\omega_0=f(x,y,z)$；
(ii) $\omega_1=\omega_x(x,y,z)\dd x+\omega_y(x,y,z)\dd y+\omega_z(x,y,z)\dd z$；
(iii) $\omega_2=\omega_{xy}(x,y,z)\dd x\wedge\dd y+\omega_{yz}(x,y,z)\dd y\wedge\dd z+\omega_{zx}(x,y,z)\dd z\wedge\dd x$；
(iv) $\omega_3=\omega_{xyz}(x,y,z)\dd x\wedge\dd y\wedge\dd z$。

若定义**轴矢量** $\alpha^\mu\equiv\varepsilon^{\mu\nu\lambda}\omega_{\nu\lambda}$，二形式就可以看作一个"向量"。**Levi-Civita 记号** $\varepsilon^{\mu\nu\lambda}$ 由 $\varepsilon^{P(1)P(2)P(3)}=\operatorname{sgn}(P)$ 定义，它给出 $\mathcal{X}(M)$ 与 $\Omega^2(M)$ 之间的同构。［注意二者都是三维的。］$\dd$ 的作用为：

(i) $\dd\omega_0=\dfrac{\partial f}{\partial x}\dd x+\dfrac{\partial f}{\partial y}\dd y+\dfrac{\partial f}{\partial z}\dd z$，

(ii) $\dd\omega_1=\left(\dfrac{\partial\omega_y}{\partial x}-\dfrac{\partial\omega_x}{\partial y}\right)\dd x\wedge\dd y+\left(\dfrac{\partial\omega_z}{\partial y}-\dfrac{\partial\omega_y}{\partial z}\right)\dd y\wedge\dd z+\left(\dfrac{\partial\omega_x}{\partial z}-\dfrac{\partial\omega_z}{\partial x}\right)\dd z\wedge\dd x$，

(iii) $\dd\omega_2=\left(\dfrac{\partial\omega_{yz}}{\partial x}+\dfrac{\partial\omega_{zx}}{\partial y}+\dfrac{\partial\omega_{xy}}{\partial z}\right)\dd x\wedge\dd y\wedge\dd z$，

(iv) $\dd\omega_3=0$。

因此 $\dd$ 作用在 $\omega_0$ 上等同于 grad，作用在 $\omega_1$ 上等同于 rot（旋度），作用在 $\omega_2$ 上等同于 div。（(iv) 为零是因为三维中不存在四形式。）`}</Tx>
        </Box>
        <Exercise n="5.15" title="外微分的 Leibniz 律" level="★★"
          hint={R`在坐标中写出 $\xi\wedge\omega$，对系数之积用乘积法则；把新出现的 $\dd x^\lambda$ 移过 $\xi$ 的 $q$ 个基一形式。`}
          solution={R`由线性只需考虑 $\xi=f\,\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\mu_q}$、$\omega=g\,\dd x^{\nu_1}\wedge\cdots\wedge\dd x^{\nu_r}$（$f,g$ 为函数）。由习题 5.14 的引理，$\xi\wedge\omega=fg\,\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\nu_r}$，于是由 \eqref{5.68}

$$\begin{aligned}\dd(\xi\wedge\omega)&=\partial_\lambda(fg)\,\dd x^\lambda\wedge\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\mu_q}\wedge\dd x^{\nu_1}\wedge\cdots\wedge\dd x^{\nu_r}\\&=(\partial_\lambda f\,\dd x^\lambda\wedge\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\mu_q})\wedge g\,\dd x^{\nu_1}\wedge\cdots\\&\quad+f\,(\partial_\lambda g)\,\dd x^\lambda\wedge\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\mu_q}\wedge\dd x^{\nu_1}\wedge\cdots.\end{aligned}$$

第一项就是 $\dd\xi\wedge\omega$。第二项中把 $\dd x^\lambda$ 向右移过 $q$ 个 $\dd x^{\mu}$，得到因子 $(-1)^q$，变成 $(-1)^q\xi\wedge\dd\omega$。故 $\dd(\xi\wedge\omega)=\dd\xi\wedge\omega+(-1)^q\xi\wedge\dd\omega$。符号 $(-1)^q$ 说明 $\dd$ 是"反导子"：它像一个奇数阶的对象，越过 $q$ 形式时带出 $(-1)^q$。`}>
          <>
            <Tx>{R`设 $\xi\in\Omega^q(M)$，$\omega\in\Omega^r(M)$。证明`}</Tx>
            <Eq n="5.69" title="外微分的 Leibniz 律" say={R`外微分对外积的乘积法则带一个符号：$\dd$ 越过 $q$ 形式 $\xi$ 时要乘 $(-1)^q$。`}>{R`\dd(\xi\wedge\omega)=\dd\xi\wedge\omega+(-1)^q\xi\wedge\dd\omega.`}</Eq>
          </>
        </Exercise>
        <Tx>{R`**不用坐标的写法。**外微分的一个有用的表达式这样得到。取 $X=X^\mu\partial/\partial x^\mu$、$Y=Y^\nu\partial/\partial x^\nu\in\mathcal{X}(M)$ 与 $\omega=\omega_\mu\dd x^\mu\in\Omega^1(M)$。容易验证组合

$$X[\omega(Y)]-Y[\omega(X)]-\omega([X,Y])=\frac{\partial\omega_\mu}{\partial x^\nu}(X^\nu Y^\mu-X^\mu Y^\nu)$$

（展开 $X[\omega_\mu Y^\mu]$ 与 $Y[\omega_\mu X^\mu]$ 后，含 $\partial Y$、$\partial X$ 的项恰好被 $\omega([X,Y])$ 抵消），而它等于 $\dd\omega(X,Y)$（由 \eqref{5.68} 与 \eqref{5.62}，$\dd\omega=\partial_\nu\omega_\mu\dd x^\nu\wedge\dd x^\mu$，作用在 $(X,Y)$ 上就是 $\partial_\nu\omega_\mu(X^\nu Y^\mu-X^\mu Y^\nu)$）。于是得到与坐标无关的表达式`}</Tx>
        <Eq n="5.70" title="外微分的无坐标公式" say={R`一形式的外微分在一对向量上的值：两项"沿一个方向求另一个的配对的导数"之差，再减去李括号的修正——没有任何坐标。`}>{R`\dd\omega(X,Y)=X[\omega(Y)]-Y[\omega(X)]-\omega([X,Y]).`}</Eq>
        <Tx>{R`对 $r$ 形式 $\omega\in\Omega^r(M)$，它推广为`}</Tx>
        <Eq n="5.71" say={R`$r$ 形式外微分的无坐标公式：轮流把一个向量拿出来做方向导数（交错符号），再对每对向量用它们的李括号做修正。`}>{R`\begin{aligned}\dd\omega(X_1,\ldots,X_{r+1})&=\sum_{i=1}^{r+1}(-1)^{i+1}X_i\,\omega(X_1,\ldots,\hat X_i,\ldots,X_{r+1})\\&\quad+\sum_{i<j}(-1)^{i+j}\omega([X_i,X_j],X_1,\ldots,\hat X_i,\ldots,\hat X_j,\ldots,X_{r+1})\end{aligned}`}</Eq>
        <Tx>{R`其中带 $\nosym{\hat{\ }}$ 的项被删去。读者应当对 $r=2$ 明确验证 \eqref{5.71}。`}</Tx>
        <Box kind="warning" title={R`勘误：\eqref{5.71} 第一个求和的上限是 $r+1$（p.219）`}>{R`原书第一个求和印作 $\sum_{i=1}^{r}$。$\dd\omega$ 是 $(r+1)$ 形式，$X_1,\ldots,X_{r+1}$ 中每一个都要轮流被取出，所以上限应为 $r+1$。检验 $r=1$：上限 $r+1=2$ 给出 $X_1[\omega(X_2)]-X_2[\omega(X_1)]-\omega([X_1,X_2])$，正是 \eqref{5.70}；若上限为 $r=1$ 则缺少第二项。正文已改正。`}</Box>
        <Derivation title={R`对 $r=2$ 验证 \eqref{5.71}（原书留给读者）`} collapsed steps={[
          { tex: R`\omega=\tfrac12\omega_{\mu\nu}\dd x^\mu\wedge\dd x^\nu,\quad\dd\omega=\tfrac12\partial_\lambda\omega_{\mu\nu}\dd x^\lambda\wedge\dd x^\mu\wedge\dd x^\nu`, why: R`由 \eqref{5.63}、\eqref{5.68}。` },
          { tex: R`\dd\omega(X,Y,Z)=\partial_\lambda\omega_{\mu\nu}\big(X^\lambda Y^\mu Z^\nu+Y^\lambda Z^\mu X^\nu+Z^\lambda X^\mu Y^\nu\big)`, why: R`把 \eqref{5.62} 的六项代入，利用 $\omega_{\mu\nu}=-\omega_{\nu\mu}$ 两两合并，消去 $\frac12$。` },
          { tex: R`X[\omega(Y,Z)]=X^\lambda\partial_\lambda\omega_{\mu\nu}Y^\mu Z^\nu+\omega_{\mu\nu}X[Y^\mu]Z^\nu+\omega_{\mu\nu}Y^\mu X[Z^\nu]`, why: R`$\omega(Y,Z)=\omega_{\mu\nu}Y^\mu Z^\nu$，用乘积法则。$Y[\omega(Z,X)]$、$Z[\omega(X,Y)]$ 同理（第一项带 $+$、第二项带 $-$、第三项带 $+$，即 $(-1)^{i+1}$，并把 $-\omega(X,Z)$ 写成 $+\omega(Z,X)$）。` },
          { tex: R`-\omega([X,Y],Z)+\omega([X,Z],Y)-\omega([Y,Z],X)`, why: R`第二个求和的三项（$(i,j)=(1,2),(1,3),(2,3)$，符号 $(-1)^{i+j}$）。把 $[X,Y]^\mu=X[Y^\mu]-Y[X^\mu]$ 代入，正好消去上一步中所有含 $X[Y^\mu]$ 这类导数的项。` },
          { tex: R`X[\omega(Y,Z)]-Y[\omega(X,Z)]+Z[\omega(X,Y)]-\ldots=\partial_\lambda\omega_{\mu\nu}\big(X^\lambda Y^\mu Z^\nu+Y^\lambda Z^\mu X^\nu+Z^\lambda X^\mu Y^\nu\big)`, why: R`剩下的恰是三个"导数落在 $\omega$ 分量上"的项，与第二步相同。` },
        ]} result={R`\eqref{5.71} 对 $r=2$ 成立；交互图 3 对随机多项式系数再做一次数值核对。`} />
        <Tx>{R`**$\dd^2=0$。**现在证明一个重要的公式：`}</Tx>
        <Eq n="5.72" keyEq title={R`$\dd^2=0$`} say={R`外微分做两次恒为零：二阶偏导数对两个求导方向对称，而楔积对它们反对称，一对称一反对称，缩并为零。`}>{R`\dd^2=0\qquad(\text{或 }\dd_{r+1}\dd_r=0).`}</Eq>
        <Tx>{R`取

$$\omega=\frac{1}{r!}\omega_{\mu_1\ldots\mu_r}\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}\in\Omega^r(M).$$

$\dd^2$ 作用在 $\omega$ 上为

$$\dd^2\omega=\frac{1}{r!}\frac{\partial^2\omega_{\mu_1\ldots\mu_r}}{\partial x^\lambda\partial x^\nu}\dd x^\lambda\wedge\dd x^\nu\wedge\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}.$$

它恒为零，因为 $\partial^2\omega_{\mu_1\ldots\mu_r}/\partial x^\lambda\partial x^\nu$ 关于 $\lambda$、$\nu$ 对称，而 $\dd x^\lambda\wedge\dd x^\nu$ 反对称。在三维中，$\dd^2=0$ 就是熟悉的 $\nabla\times(\nabla f)=0$ 与 $\nabla\cdot(\nabla\times\boldsymbol{A})=0$。`}</Tx>
        <FormsLab />
        <Box kind="example" n="5.11" title={R`电磁场：$F=\dd A$ 与 Bianchi 恒等式`}>
          <Tx>{R`已知电磁势 $A=(\phi,\boldsymbol{A})$ 是一形式 $A=A_\mu\dd x^\mu$（见第 10 章）。电磁张量定义为 $F=\dd A$，分量为`}</Tx>
          <Eq n="5.73" keyEq title="电磁场张量" say={R`电磁场张量 $F_{\mu\nu}$：时空混合分量是电场，纯空间分量是磁场——电场与磁场是同一个二形式的不同分量。`}>{R`F_{\mu\nu}=\begin{pmatrix}0&-E_x&-E_y&-E_z\\ E_x&0&B_z&-B_y\\ E_y&-B_z&0&B_x\\ E_z&B_y&-B_x&0\end{pmatrix}`}</Eq>
          <Tx>{R`其中照常有

$$\boldsymbol{E}=-\nabla\phi-\frac{\partial}{\partial x^0}\boldsymbol{A}\qquad\text{与}\qquad\boldsymbol{B}=\nabla\times\boldsymbol{A}.$$

两个 Maxwell 方程 $\nabla\cdot\boldsymbol{B}=0$ 与 $\partial\boldsymbol{B}/\partial t=-\nabla\times\boldsymbol{E}$ 由恒等式 $\dd F=\dd(\dd A)=0$ 得出，它称为 **Bianchi 恒等式**；另一组方程是由第 1 章 Lagrange 量 (1.245) 导出的运动方程（形式写法见章末习题 5.2）。`}</Tx>
          <Derivation title={R`从 $\dd F=0$ 读出两个齐次 Maxwell 方程（本站补充）`} collapsed steps={[
            { tex: R`F=\tfrac12F_{\mu\nu}\dd x^\mu\wedge\dd x^\nu=E_i\,\dd x^i\wedge\dd x^0+B_x\dd y\wedge\dd z+B_y\dd z\wedge\dd x+B_z\dd x\wedge\dd y`, why: R`由 \eqref{5.73}：$F_{0i}=-E_i$ 给出 $-E_i\dd x^0\wedge\dd x^i=E_i\dd x^i\wedge\dd x^0$；$F_{12}=B_z$ 等。记 $x^0=t$。` },
            { tex: R`\dd(B_x\dd y\wedge\dd z+\cdots)=(\nabla\cdot\boldsymbol{B})\,\dd x\wedge\dd y\wedge\dd z+\partial_tB_x\,\dd y\wedge\dd z\wedge\dd t+\cdots`, why: R`由例 5.10(iii) 加上对 $t$ 的导数项。` },
            { tex: R`\dd(E_i\dd x^i\wedge\dd t)=(\nabla\times\boldsymbol{E})_x\,\dd y\wedge\dd z\wedge\dd t+\cdots`, why: R`空间部分就是例 5.10(ii) 的旋度，再楔上 $\dd t$。` },
            { tex: R`\dd F=0\iff\nabla\cdot\boldsymbol{B}=0,\quad\partial_t\boldsymbol{B}+\nabla\times\boldsymbol{E}=0`, why: R`$\dd x\wedge\dd y\wedge\dd z$ 与三个 $\dd x^j\wedge\dd x^k\wedge\dd t$ 线性无关，系数分别为零。` },
          ]} result={R`两个齐次 Maxwell 方程不是"动力学"，而是 $F=\dd A$ 与 $\dd^2=0$ 的推论。`} />
        </Box>
        <Box kind="warning" title={R`勘误：$F_{03}=-E_z$（p.220），以及 $A_\mu$ 的符号约定`}>{R`原书 \eqref{5.73} 第一行最后一个元素印作 $-E_x$，应为 $-E_z$（反对称性要求 $F_{03}=-F_{30}=-E_z$）。正文已改正。

另注：要从 $F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu$ 得到 $F_{0i}=-E_i$，需要 $A_0=-\phi$，即一形式的分量是 $A_\mu=\eta_{\mu\nu}A^\nu=(-\phi,\boldsymbol{A})$（度规 $\eta=\mathrm{diag}(-1,1,1,1)$，见 §5.6）；原书写的 $A=(\phi,\boldsymbol{A})$ 应理解为上指标分量 $A^\mu$。验证：$F_{0i}=\partial_0A_i-\partial_iA_0=\partial_0A_i+\partial_i\phi=-E_i$ ✓。`}</Box>
        <Tx>{R`**拉回与外微分。**映射 $f:M\to N$ 诱导拉回 $f^*:T^*_{f(p)}N\to T^*_pM$，$f^*$ 自然推广到 $(0,r)$ 型张量（§5.2）。$r$ 形式是 $(0,r)$ 型张量，所以这也适用。设 $\omega\in\Omega^r(N)$，$f$ 为映射 $M\to N$。在每点 $f(p)\in N$，$f$ 诱导拉回 $f^*:\Omega^r_{f(p)}N\to\Omega^r_pM$：`}</Tx>
        <Eq n="5.74" say={R`拉回的 $r$ 形式吃 $r$ 个向量：先把它们一个个推前，再喂给原来的形式。`}>{R`(f^*\omega)(X_1,\ldots,X_r)\equiv\omega(f_*X_1,\ldots,f_*X_r)`}</Eq>
        <Tx>{R`其中 $X_i\in T_pM$，$f_*$ 是微分映射 $T_pM\to T_{f(p)}N$。`}</Tx>
        <Exercise n="5.16" title="拉回与外微分、外积交换" level="★★"
          hint={R`先证 (5.76)（直接由 \eqref{5.74} 与 \eqref{5.65}）。对 (5.75)，先对函数证明 $f^*\dd g=\dd(g\circ f)$（链式法则），再用 (5.76) 与 \eqref{5.69}。`}
          solution={R`**(5.76)**：对 $X_i\in T_pM$，由 \eqref{5.74} 与 \eqref{5.65}（设 $\xi,\omega$ 分别为 $q,r$ 形式；原题 $q=r$ 只是特例）

$$\begin{aligned}f^*(\xi\wedge\omega)(X_1,\ldots,X_{q+r})&=(\xi\wedge\omega)(f_*X_1,\ldots,f_*X_{q+r})\\&=\frac{1}{q!r!}\sum_P\operatorname{sgn}(P)\,\xi(f_*X_{P(1)},\ldots)\,\omega(f_*X_{P(q+1)},\ldots)\\&=\frac{1}{q!r!}\sum_P\operatorname{sgn}(P)\,(f^*\xi)(X_{P(1)},\ldots)\,(f^*\omega)(X_{P(q+1)},\ldots)=(f^*\xi\wedge f^*\omega)(X_1,\ldots).\end{aligned}$$

**函数：**对 $g\in\Omega^0(N)$，$f^*g=g\circ f$，且 $\langle f^*\dd g,X\rangle=\langle\dd g,f_*X\rangle=(f_*X)[g]=X[g\circ f]=\langle\dd(g\circ f),X\rangle$，故 $f^*\dd g=\dd(f^*g)$。特别地 $f^*\dd y^\alpha=\dd(y^\alpha\circ f)$。

**(5.75)**：写 $\omega=\frac1{r!}\omega_{\alpha_1\ldots\alpha_r}\dd y^{\alpha_1}\wedge\cdots\wedge\dd y^{\alpha_r}$。由 (5.76) 与上式，

$$f^*\omega=\frac1{r!}(\omega_{\alpha_1\ldots\alpha_r}\circ f)\,\dd(y^{\alpha_1}\circ f)\wedge\cdots\wedge\dd(y^{\alpha_r}\circ f).$$

用 \eqref{5.69} 求外微分；每个 $\dd(y^{\alpha}\circ f)$ 再求外微分为零（$\dd^2=0$），只剩

$$\dd(f^*\omega)=\frac1{r!}\dd(\omega_{\alpha_1\ldots\alpha_r}\circ f)\wedge\dd(y^{\alpha_1}\circ f)\wedge\cdots=\frac1{r!}f^*(\dd\omega_{\alpha_1\ldots\alpha_r})\wedge f^*\dd y^{\alpha_1}\wedge\cdots=f^*(\dd\omega).$$

意义：外微分是"自然的"，与坐标变换（以及任何光滑映射）交换——所以 \eqref{5.68} 虽然用坐标写出，结果与坐标无关。`}>
          <>
            <Tx>{R`设 $\xi,\omega\in\Omega^r(N)$，$f:M\to N$。证明`}</Tx>
            <Eq n="5.75" title="外微分与拉回交换" say={R`先拉回再求外微分，等于先求外微分再拉回：外微分与任何光滑映射（包括坐标变换）都相容。`}>{R`\dd(f^*\omega)=f^*(\dd\omega)`}</Eq>
            <Eq n="5.76" say="拉回保持外积。">{R`f^*(\xi\wedge\omega)=(f^*\xi)\wedge(f^*\omega).`}</Eq>
          </>
        </Exercise>
        <Tx>{R`**de Rham 复形。**外微分 $\dd_r$ 诱导序列`}</Tx>
        <Eq n="5.77" say={R`各阶形式由外微分串成一条链，相邻两步的复合为零：每一步的像都落在下一步的核里。`}>{R`0\xrightarrow{\ i\ }\Omega^0(M)\xrightarrow{\ \dd_0\ }\Omega^1(M)\xrightarrow{\ \dd_1\ }\cdots\xrightarrow{\ \dd_{m-2}\ }\Omega^{m-1}(M)\xrightarrow{\ \dd_{m-1}\ }\Omega^m(M)\xrightarrow{\ \dd_m\ }0`}</Eq>
        <Tx>{R`其中 $i$ 是包含映射 $0\hookrightarrow\Omega^0(M)$。这个序列称为 **de Rham 复形**（de Rham complex）。由于 $\dd^2=0$，有 $\operatorname{im}\dd_r\subset\ker\dd_{r+1}$。［取 $\omega\in\Omega^r(M)$，则 $\dd_r\omega\in\operatorname{im}\dd_r$，而 $\dd_{r+1}(\dd_r\omega)=0$ 意味着 $\dd_r\omega\in\ker\dd_{r+1}$。］$\ker\dd_r$ 的元素称为**闭 $r$ 形式**（closed $r$-form），$\operatorname{im}\dd_{r-1}$ 的元素称为**恰当 $r$ 形式**（exact $r$-form）。即：若 $\dd\omega=0$，$\omega\in\Omega^r(M)$ 是闭的；若存在 $(r-1)$ 形式 $\psi$ 使 $\omega=\dd\psi$，$\omega$ 是恰当的。商空间 $\ker\dd_r/\operatorname{im}\dd_{r-1}$ 称为第 $r$ 个 **de Rham 上同调群**，它是同调群的对偶空间，见第 6 章。`}</Tx>
        <Box kind="key" title={R`与第 3 章的对照：$\partial^2=0$ 与 $\dd^2=0$`}>{R`第 3 章：链复形 $\cdots\to C_{r+1}\xrightarrow{\partial}C_r\xrightarrow{\partial}C_{r-1}\to\cdots$，$\partial^2=0$，同调群 $H_r=\ker\partial_r/\operatorname{im}\partial_{r+1}$（闭链模边缘）。本章：$\dd$ **升**一阶，$\dd^2=0$，上同调群 $H^r=\ker\dd_r/\operatorname{im}\dd_{r-1}$（闭形式模恰当形式）。二者由 Stokes 定理 $\int_c\dd\omega=\int_{\partial c}\omega$ 配对：边界上积分恰当形式为零，闭形式在边缘上积分为零。例：$\R^2-\{0\}$ 上 $\omega=(x\,\dd y-y\,\dd x)/(x^2+y^2)$ 是闭的，绕原点积分为 $2\pi\neq0$，所以不恰当——它"看见"了第 3 章里那个不是边界的闭路。`}</Box>
      </Sub>

      <Sub n="5.4.3" title="Interior product and Lie derivative of forms" zh="内积与形式的李导数">
        <Tx>{R`另一个重要运算是**内积**（interior product）$\mathrm{i}_X:\Omega^r(M)\to\Omega^{r-1}(M)$，其中 $X\in\mathcal{X}(M)$。对 $\omega\in\Omega^r(M)$ 定义`}</Tx>
        <Eq n="5.78" title="内积" say={R`内积把向量 $X$ "塞进"形式的第一个空位，形式降一阶。`}>{R`\mathrm{i}_X\omega(X_1,\ldots,X_{r-1})\equiv\omega(X,X_1,\ldots,X_{r-1}).`}</Eq>
        <Tx>{R`对 $X=X^\mu\partial/\partial x^\mu$ 与 $\omega=(1/r!)\omega_{\mu_1\ldots\mu_r}\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}$，有`}</Tx>
        <Eq n="5.79" say={R`内积的分量写法：把 $X$ 缩并到形式的第一个指标上；等价地，对每个基一形式轮流"吃掉"它，带上交错符号。`}>{R`\begin{aligned}\mathrm{i}_X\omega&=\frac{1}{(r-1)!}X^\nu\omega_{\nu\mu_2\ldots\mu_r}\dd x^{\mu_2}\wedge\ldots\wedge\dd x^{\mu_r}\\&=\frac{1}{r!}\sum_{s=1}^{r}X^{\mu_s}\omega_{\mu_1\ldots\mu_s\ldots\mu_r}(-1)^{s-1}\dd x^{\mu_1}\wedge\ldots\wedge\nosym{\widehat{\dd x^{\mu_s}}}\wedge\ldots\wedge\dd x^{\mu_r}\end{aligned}`}</Eq>
        <Tx>{R`其中带 $\nosym{\hat{\ }}$ 的项被删去。例如设 $(x,y,z)$ 是 $\R^3$ 的坐标，则

$$\mathrm{i}_{e_x}(\dd x\wedge\dd y)=\dd y,\qquad\mathrm{i}_{e_x}(\dd y\wedge\dd z)=0,\qquad\mathrm{i}_{e_x}(\dd z\wedge\dd x)=-\dd z.$$

**Cartan 公式。**形式的李导数用内积写最简洁。设 $\omega=\omega_\mu\dd x^\mu$ 是一形式，考虑组合

$$\begin{aligned}(\dd\mathrm{i}_X+\mathrm{i}_X\dd)\omega&=\dd(X^\mu\omega_\mu)+\mathrm{i}_X\left[\tfrac12(\partial_\mu\omega_\nu-\partial_\nu\omega_\mu)\dd x^\mu\wedge\dd x^\nu\right]\\&=(\omega_\mu\partial_\nu X^\mu+X^\mu\partial_\nu\omega_\mu)\dd x^\nu+X^\mu(\partial_\mu\omega_\nu-\partial_\nu\omega_\mu)\dd x^\nu\\&=(\omega_\mu\partial_\nu X^\mu+X^\mu\partial_\mu\omega_\nu)\dd x^\nu.\end{aligned}$$

与 \eqref{5.55} 比较（交换哑指标名 $\mu\leftrightarrow\nu$ 后完全相同），得到`}</Tx>
        <Eq n="5.80" say={R`一形式的李导数等于"先缩并再求外微分"加"先求外微分再缩并"。`}>{R`\mathcal{L}_X\omega=(\dd\mathrm{i}_X+\mathrm{i}_X\dd)\omega.`}</Eq>
        <Tx>{R`对一般的 $r$ 形式 $\omega=(1/r!)\omega_{\mu_1\ldots\mu_r}\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}$，有（由 \eqref{5.54} 与 \sref{P5.1}：系数被 $X$ 求导，每个 $\dd x^{\mu_s}$ 被 $\mathcal{L}_X\dd x^{\mu_s}=\partial_\nu X^{\mu_s}\dd x^\nu$ 替换）`}</Tx>
        <Eq n="5.81" say={R`$r$ 形式的李导数：分量沿 $X$ 的导数，加上每个指标各自被流的 Jacobi 矩阵"转动"一次。`}>{R`\begin{aligned}\mathcal{L}_X\omega&=\lim_{\varepsilon\to0}\frac{1}{\varepsilon}\left((\sigma_\varepsilon)^*\omega|_{\sigma_\varepsilon(x)}-\omega|_x\right)\\&=X^\nu\frac{1}{r!}\partial_\nu\omega_{\mu_1\ldots\mu_r}\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}+\sum_{s=1}^{r}\partial_{\mu_s}X^\nu\frac{1}{r!}\omega_{\mu_1\ldots\overset{s}{\nu}\ldots\mu_r}\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}\end{aligned}`}</Eq>
        <Tx>{R`（$\overset{s}{\nu}$ 表示第 $s$ 个指标换成 $\nu$。）另一方面`}</Tx>
        <Derivation title={R`计算 $(\dd\mathrm{i}_X+\mathrm{i}_X\dd)\omega$`} steps={[
          { tex: R`\dd\mathrm{i}_X\omega=\frac1{r!}\sum_{s=1}^r\big[\partial_\nu X^{\mu_s}\,\omega_{\mu_1\ldots\mu_s\ldots\mu_r}+X^{\mu_s}\partial_\nu\omega_{\mu_1\ldots\mu_s\ldots\mu_r}\big](-1)^{s-1}\dd x^\nu\wedge\dd x^{\mu_1}\wedge\ldots\wedge\nosym{\widehat{\dd x^{\mu_s}}}\wedge\ldots\wedge\dd x^{\mu_r}`, why: R`对 \eqref{5.79} 第二行求外微分，乘积法则作用在 $X^{\mu_s}\omega$ 上。` },
          { tex: R`\mathrm{i}_X\dd\omega=\frac1{r!}\Big[X^\nu\partial_\nu\omega_{\mu_1\ldots\mu_r}\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}+\sum_{s=1}^rX^{\mu_s}\partial_\nu\omega_{\mu_1\ldots\mu_s\ldots\mu_r}(-1)^s\dd x^\nu\wedge\dd x^{\mu_1}\wedge\ldots\wedge\nosym{\widehat{\dd x^{\mu_s}}}\wedge\ldots\wedge\dd x^{\mu_r}\Big]`, why: R`$\dd\omega=\frac1{r!}\partial_\nu\omega\,\dd x^\nu\wedge\dd x^{\mu_1}\wedge\cdots$ 是 $(r+1)$ 形式；用 \eqref{5.79} 对它的 $r+1$ 个槽位轮流缩并：$\dd x^\nu$ 在第 1 位（符号 $+$），$\dd x^{\mu_s}$ 在第 $s+1$ 位（符号 $(-1)^s$）。` },
          { tex: R`(\dd\mathrm{i}_X+\mathrm{i}_X\dd)\omega=\frac1{r!}\sum_{s=1}^r\partial_\nu X^{\mu_s}\,\omega_{\mu_1\ldots\mu_s\ldots\mu_r}(-1)^{s-1}\dd x^\nu\wedge\dd x^{\mu_1}\wedge\ldots\wedge\nosym{\widehat{\dd x^{\mu_s}}}\wedge\ldots\wedge\dd x^{\mu_r}+\frac1{r!}X^\nu\partial_\nu\omega_{\mu_1\ldots\mu_r}\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\mu_r}`, why: R`两式相加，$X^{\mu_s}\partial_\nu\omega$ 项的符号 $(-1)^{s-1}$ 与 $(-1)^s$ 相反，相互抵消。` },
          { tex: R`(-1)^{s-1}\dd x^\nu\wedge\dd x^{\mu_1}\wedge\ldots\wedge\nosym{\widehat{\dd x^{\mu_s}}}\wedge\ldots=\dd x^{\mu_1}\wedge\ldots\wedge\underset{s}{\dd x^\nu}\wedge\ldots\wedge\dd x^{\mu_r}`, why: R`把 $\dd x^\nu$ 右移 $s-1$ 位放进第 $s$ 个空位，正好抵消符号。再把哑指标 $\mu_s$ 与 $\nu$ 互换名字，第一项就是 \eqref{5.81} 的第二项。` },
        ]} result={R`$(\dd\mathrm{i}_X+\mathrm{i}_X\dd)\omega$ 与 \eqref{5.81} 逐项相同。`} />
        <Box kind="warning" title={R`勘误：$\mathrm{i}_X\dd\omega$ 中漏了 $\partial_\nu$（p.222）`}>{R`原书在 $(\dd\mathrm{i}_X+\mathrm{i}_X\dd)\omega$ 的展开中，来自 $\mathrm{i}_X\dd\omega$ 的求和项印作 "$X^{\mu_s}\omega_{\mu_1\ldots\mu_s\ldots\mu_r}(-1)^s\dd x^\nu\wedge\ldots$"，漏掉了 $\partial_\nu$——应为 $X^{\mu_s}\partial_\nu\omega_{\mu_1\ldots\mu_s\ldots\mu_r}$（$\dd\omega$ 的分量带一个导数）。正是这一项与 $\dd\mathrm{i}_X\omega$ 中的 $X^{\mu_s}\partial_\nu\omega$ 项相消，原书下一行的结果正确。上面的推导已按正确形式写出。`}</Box>
        <Tx>{R`于是对任意 $r$ 形式 $\omega$ 都有`}</Tx>
        <Eq n="5.82" keyEq title="Cartan 公式" say={R`Cartan 魔术公式：形式的李导数 = 外微分与内积的"反对易子"。它把流（动力学）与外微分（拓扑）连在一起。`}>{R`(\dd\mathrm{i}_X+\mathrm{i}_X\dd)\omega=\mathcal{L}_X\omega`}</Eq>
        <Exercise n="5.17" title={R`内积的代数性质`} level="★★★"
          hint={R`(5.83)：先用 \sref{P5.1} 与"李导数和缩并交换"证明 $(\mathcal{L}_X\omega)(X_1,\ldots,X_r)=X[\omega(X_1,\ldots,X_r)]-\sum_i\omega(X_1,\ldots,[X,X_i],\ldots,X_r)$。(5.84)：对基形式数槽位。(5.86)：用 \eqref{5.82} 与 (5.85)。`}
          solution={R`**引理。**对 $r$ 形式 $\omega$，

$$(\mathcal{L}_X\omega)(X_1,\ldots,X_r)=X[\omega(X_1,\ldots,X_r)]-\sum_{i=1}^r\omega(X_1,\ldots,[X,X_i],\ldots,X_r).$$

理由：$\omega(X_1,\ldots,X_r)$ 是 $\omega\otimes X_1\otimes\cdots\otimes X_r$ 的完全缩并；李导数与缩并交换（拉回/推前保持配对 \eqref{5.36}），再由 Leibniz 律 \eqref{5.57b} 与 $\mathcal{L}_XX_i=[X,X_i]$ 即得。$r=1$ 时可直接由 \eqref{5.55} 与 \eqref{5.49a} 用分量核对。

**(5.83)。**由引理，

$$\big(\mathcal{L}_X(\mathrm{i}_Y\omega)\big)(X_1,\ldots,X_{r-1})=X[\omega(Y,X_1,\ldots)]-\sum_i\omega(Y,\ldots,[X,X_i],\ldots),$$
$$\big(\mathrm{i}_Y\mathcal{L}_X\omega\big)(X_1,\ldots,X_{r-1})=X[\omega(Y,X_1,\ldots)]-\omega([X,Y],X_1,\ldots)-\sum_i\omega(Y,\ldots,[X,X_i],\ldots).$$

相减得 $\omega([X,Y],X_1,\ldots,X_{r-1})=(\mathrm{i}_{[X,Y]}\omega)(X_1,\ldots)$，即 $\mathrm{i}_{[X,Y]}=\mathcal{L}_X\mathrm{i}_Y-\mathrm{i}_Y\mathcal{L}_X$。

**(5.84)。**由线性只需对基形式 $\omega=\dd x^{\mu_1}\wedge\cdots\wedge\dd x^{\mu_r}$、$\eta=\dd x^{\nu_1}\wedge\cdots\wedge\dd x^{\nu_s}$ 证明。由 \eqref{5.79}，$\mathrm{i}_X$ 作用在基形式上是对每个槽位"吃掉"一次，第 $k$ 个槽位带符号 $(-1)^{k-1}$。$\omega\wedge\eta$ 是 $r+s$ 个槽位的拼接（习题 5.14 的引理）：前 $r$ 个槽位给出 $\mathrm{i}_X\omega\wedge\eta$；第 $r+b$ 个槽位的符号是 $(-1)^{r+b-1}=(-1)^r(-1)^{b-1}$，给出 $(-1)^r\omega\wedge\mathrm{i}_X\eta$。

**(5.85)。**$\mathrm{i}_X\mathrm{i}_X\omega(X_1,\ldots,X_{r-2})=\omega(X,X,X_1,\ldots,X_{r-2})=0$（全反对称张量在两个相同的变量上为零）。

**(5.86)。**由 \eqref{5.82} 与 (5.85)：$\mathcal{L}_X\mathrm{i}_X\omega=\dd\mathrm{i}_X\mathrm{i}_X\omega+\mathrm{i}_X\dd\mathrm{i}_X\omega=\mathrm{i}_X\dd\mathrm{i}_X\omega$，而 $\mathrm{i}_X\mathcal{L}_X\omega=\mathrm{i}_X\dd\mathrm{i}_X\omega+\mathrm{i}_X\mathrm{i}_X\dd\omega=\mathrm{i}_X\dd\mathrm{i}_X\omega$。两者相等。`}>
          <>
            <Tx>{R`设 $X,Y\in\mathcal{X}(M)$，$\omega\in\Omega^r(M)$。证明`}</Tx>
            <Eq n="5.83" say={R`沿李括号做内积，等于"李导数"与"内积"两个操作的对易子：先缩并 $Y$ 再沿 $X$ 求李导数，减去反过来的次序。`}>{R`\mathrm{i}_{[X,Y]}\omega=\mathcal{L}_X(\mathrm{i}_Y\omega)-\mathrm{i}_Y(\mathcal{L}_X\omega).`}</Eq>
            <Tx>{R`再证明 $\mathrm{i}_X$ 是**反导子**（anti-derivation）`}</Tx>
            <Eq n="5.84" say={R`内积对外积的乘积法则：越过 $r$ 形式时带符号 $(-1)^r$，和外微分一样。`}>{R`\mathrm{i}_X(\omega\wedge\eta)=\mathrm{i}_X\omega\wedge\eta+(-1)^r\omega\wedge\mathrm{i}_X\eta`}</Eq>
            <Tx>{R`并且**幂零**（nilpotent）`}</Tx>
            <Eq n="5.85" say={R`同一个向量塞进形式两次，结果为零（反对称性）。`}>{R`\mathrm{i}_X^2=0.`}</Eq>
            <Tx>{R`利用幂零性证明`}</Tx>
            <Eq n="5.86" say={R`沿 $X$ 的李导数与 $X$ 的内积可以交换次序。`}>{R`\mathcal{L}_X\mathrm{i}_X\omega=\mathrm{i}_X\mathcal{L}_X\omega.`}</Eq>
          </>
        </Exercise>
        <Box kind="warning" title={R`勘误：\eqref{5.83} 的右边（p.222）`}>{R`原书印作 "$\mathrm{i}_{[X,Y]}\omega=X(\mathrm{i}_Y\omega)-Y(\mathrm{i}_X\omega)$"。这一般不成立。反例：$M=\R^2$，$\omega=x\,\dd y$，$X=\partial_x$，$Y=\partial_y$。则 $[X,Y]=0$，左边为零；而 $X(\mathrm{i}_Y\omega)=\partial_x(x)=1$，$Y(\mathrm{i}_X\omega)=\partial_y(0)=0$，右边为 1。对一形式，由 \eqref{5.70}，$X[\omega(Y)]-Y[\omega(X)]=\dd\omega(X,Y)+\omega([X,Y])$，多出 $\dd\omega(X,Y)$。正确的恒等式是 $\mathrm{i}_{[X,Y]}=[\mathcal{L}_X,\mathrm{i}_Y]$，即 $\mathrm{i}_{[X,Y]}\omega=\mathcal{L}_X(\mathrm{i}_Y\omega)-\mathrm{i}_Y(\mathcal{L}_X\omega)$；正文与解答已按此改正。`}</Box>
        <Exercise n="5.18" title="一般张量场的李导数" level="★★"
          hint={R`用 \sref{P5.1}，把 $t$ 写成分量乘基 $e_{\mu_1}\otimes\cdots\otimes\dd x^{\nu_1}\otimes\cdots$；需要 $\mathcal{L}_Xe_\mu=-\partial_\mu X^\lambda e_\lambda$ 与 $\mathcal{L}_X\dd x^\nu=\partial_\lambda X^\nu\dd x^\lambda$。`}
          solution={R`$t=t^{\mu_1\ldots\mu_n}{}_{\nu_1\ldots\nu_m}e_{\mu_1}\otimes\cdots\otimes e_{\mu_n}\otimes\dd x^{\nu_1}\otimes\cdots\otimes\dd x^{\nu_m}$。由 \eqref{5.49a}，$\mathcal{L}_Xe_\mu=[X,\partial_\mu]=-\partial_\mu X^\lambda e_\lambda$；由 \eqref{5.55}，$\mathcal{L}_X\dd x^\nu=\partial_\lambda X^\nu\dd x^\lambda$。用 \eqref{5.57b} 逐因子作用：

· 系数：$X[t^{\ldots}{}_{\ldots}]=X^\lambda\partial_\lambda t^{\mu_1\ldots\mu_n}{}_{\nu_1\ldots\nu_m}$；

· 第 $s$ 个上指标的基 $e_{\mu_s}$：$t^{\ldots\mu_s\ldots}(-\partial_{\mu_s}X^\kappa)e_\kappa$；把哑指标 $\mu_s\to\lambda$、$\kappa\to\mu_s$，分量贡献 $-\partial_\lambda X^{\mu_s}t^{\mu_1\ldots\lambda\ldots\mu_n}{}_{\nu_1\ldots\nu_m}$；

· 第 $s$ 个下指标的基 $\dd x^{\nu_s}$：$t_{\ldots\nu_s\ldots}\partial_\kappa X^{\nu_s}\dd x^\kappa$；把 $\nu_s\to\lambda$、$\kappa\to\nu_s$，分量贡献 $+\partial_{\nu_s}X^\lambda t^{\mu_1\ldots\mu_n}{}_{\nu_1\ldots\lambda\ldots\nu_m}$。

相加即得 (5.87)。下指标有 $m$ 个、上指标有 $n$ 个，所以两个求和的上限分别是 $m$ 与 $n$。特例：$n=1,m=0$ 回到 \eqref{5.49a}；$n=0,m=1$ 回到 \eqref{5.55}。`}>
          <>
            <Tx>{R`设 $t\in\mathcal{T}^n_m(M)$。证明`}</Tx>
            <FormulaMap n="5.87" title="张量场的李导数" say={R`一般张量场的李导数：分量的方向导数，每个下指标加一项 $+\partial X$，每个上指标减一项 $\partial X$。`} tree={FM_5_87} start="dxl" />
          </>
        </Exercise>
        <Box kind="warning" title={R`勘误：\eqref{5.87} 第一个求和的上限是 $m$（p.223）`}>{R`$t\in\mathcal{T}^n_m(M)$ 有 $n$ 个上指标、$m$ 个下指标。原书 \eqref{5.87} 中对下指标 $\nu_s$ 的求和印作 $\sum_{s=1}^{n}$，应为 $\sum_{s=1}^{m}$。正文已改正。`}</Box>

        <Box kind="example" n="5.12" title="Hamilton 力学的形式语言">
          <Tx>{R`用微分形式重写 Hamilton 力学（§1.1）。设 $H$ 为 Hamilton 量，$(q^\mu,p_\mu)$ 为其相空间坐标。定义二形式`}</Tx>
          <Eq n="5.88" title="辛二形式" say={R`辛二形式把每一对共轭的动量与坐标配成一个"有向面积元"，相空间的几何就由它决定。`}>{R`\omega=\dd p_\mu\wedge\dd q^\mu`}</Eq>
          <Tx>{R`称为**辛二形式**（symplectic two-form）。若引入一形式`}</Tx>
          <Eq n="5.89" say={R`辛势（典范一形式）：动量乘坐标的微分，即作用量 $\int p\,\dd q$ 的被积式。`}>{R`\theta=p_\mu\,\dd q^\mu,`}</Eq>
          <Tx>{R`辛二形式就可写成`}</Tx>
          <Eq n="5.90" say={R`辛形式是恰当的：它是辛势的外微分，因此自动是闭的。`}>{R`\omega=\dd\theta.`}</Eq>
          <Tx>{R`（验证：$\dd(p_\mu\dd q^\mu)=\dd p_\mu\wedge\dd q^\mu$ ✓。）给定相空间上的函数 $f(q,p)$，可以定义 **Hamilton 向量场**`}</Tx>
          <Eq n="5.91" say={R`每个相空间函数 $f$ 都生成一个流：以 $f$ 为"Hamilton 量"的运动。`}>{R`X_f=\frac{\partial f}{\partial p_\mu}\frac{\partial}{\partial q^\mu}-\frac{\partial f}{\partial q^\mu}\frac{\partial}{\partial p_\mu}.`}</Eq>
          <Tx>{R`于是容易验证（用 $\mathrm{i}_X(\dd p\wedge\dd q)=\dd p(X)\,\dd q-\dd q(X)\,\dd p$）

$$\mathrm{i}_{X_f}\omega=-\frac{\partial f}{\partial p_\mu}\dd p_\mu-\frac{\partial f}{\partial q^\mu}\dd q^\mu=-\dd f.$$

考虑由 Hamilton 量生成的向量场`}</Tx>
          <Eq n="5.92" say={R`取 $f=H$：Hamilton 量生成的向量场就是相空间中的"速度场"。`}>{R`X_H=\frac{\partial H}{\partial p_\mu}\frac{\partial}{\partial q^\mu}-\frac{\partial H}{\partial q^\mu}\frac{\partial}{\partial p_\mu}.`}</Eq>
          <Tx>{R`对 Hamilton 运动方程`}</Tx>
          <Eq n="5.93" title="Hamilton 方程" say={R`Hamilton 运动方程：坐标的速度是 $H$ 对动量的偏导，动量的变化率是 $H$ 对坐标偏导的负值。`}>{R`\frac{\dd q^\mu}{\dd t}=\frac{\partial H}{\partial p_\mu}\qquad\frac{\dd p_\mu}{\dd t}=-\frac{\partial H}{\partial q^\mu},`}</Eq>
          <Tx>{R`的解 $(q^\mu,p_\mu)$，还有`}</Tx>
          <Eq n="5.94" say={R`沿运动轨道，$X_H$ 就是对时间求导：Hamilton 方程说的正是"轨道是 $X_H$ 的积分曲线"。`}>{R`X_H=\frac{\dd p_\mu}{\dd t}\frac{\partial}{\partial p_\mu}+\frac{\dd q^\mu}{\dd t}\frac{\partial}{\partial q^\mu}=\frac{\dd}{\dd t}.`}</Eq>
          <Tx>{R`辛二形式沿 $X_H$ 生成的流保持不变：`}</Tx>
          <Eq n="5.95" title="Liouville 定理的形式版" say={R`辛形式沿 Hamilton 流不变——相空间"面积"守恒，这就是 Liouville 定理。`}>{R`\begin{aligned}\mathcal{L}_{X_H}\omega&=\dd(\mathrm{i}_{X_H}\omega)+\mathrm{i}_{X_H}(\dd\omega)\\&=\dd(\mathrm{i}_{X_H}\omega)=-\dd^2H=0\end{aligned}`}</Eq>
          <Tx>{R`这里用了 \eqref{5.82}（以及 $\dd\omega=\dd^2\theta=0$）。反之，若 $X$ 满足 $\mathcal{L}_X\omega=0$，则存在 Hamilton 量 $H$，使 Hamilton 运动方程沿 $X$ 生成的流成立。这由前面的观察得出：$\mathcal{L}_X\omega=\dd(\mathrm{i}_X\omega)=0$，于是由 Poincaré 引理（\sref{X:Poincare-lemma}），（局部）存在函数 $H(q,p)$ 使

$$\mathrm{i}_X\omega=-\dd H.$$

**Poisson 括号。**借助 Hamilton 向量场，Poisson 括号可以写成与特殊坐标选取无关的形式。事实上`}</Tx>
          <Eq n="5.96" title="Poisson 括号" say={R`把两个 Hamilton 向量场依次塞进辛形式，得到的正是 Poisson 括号——它是辛几何的对象，与正则坐标的选取无关。`}>{R`\mathrm{i}_{X_f}(\mathrm{i}_{X_g}\omega)=-\mathrm{i}_{X_f}(\dd g)=\frac{\partial f}{\partial q^\mu}\frac{\partial g}{\partial p_\mu}-\frac{\partial f}{\partial p_\mu}\frac{\partial g}{\partial q^\mu}=[f,g]_{\mathrm{PB}}.`}</Eq>
          <Tx>{R`（中间一步：$-\mathrm{i}_{X_f}\dd g=-X_f[g]=-\frac{\partial f}{\partial p_\mu}\frac{\partial g}{\partial q^\mu}+\frac{\partial f}{\partial q^\mu}\frac{\partial g}{\partial p_\mu}$。）`}</Tx>
        </Box>
        <Box kind="warning" title={R`勘误：例 5.12 中的四处符号/指标（pp.223–224）`}>{R`**(1) \eqref{5.89}。**原书印作 $\theta=q^\mu\,\dd p_\mu$。但 $\dd(q^\mu\dd p_\mu)=\dd q^\mu\wedge\dd p_\mu=-\dd p_\mu\wedge\dd q^\mu=-\omega$，与 \eqref{5.90} $\omega=\dd\theta$ 矛盾。正文改为通常的典范一形式 $\theta=p_\mu\dd q^\mu$（等价地也可取 $\theta=-q^\mu\dd p_\mu$，二者相差恰当形式 $\dd(p_\mu q^\mu)$）。

**(2)** $\mathrm{i}_{X_f}\omega$ 的展开式中原书写 "$\dd p^\mu$"，指标位置应为 $\dd p_\mu$。

**(3) \eqref{5.94}。**原书两项之间漏了加号；正文已补上。

**(4) \eqref{5.96}。**原书第二项印作 $\frac{\partial f}{\partial q^\mu}\frac{\partial g}{\partial p_\mu}$，与第一项相同，使括号恒为零。由 $-X_f[g]$ 的计算，第二项应为 $\frac{\partial f}{\partial p_\mu}\frac{\partial g}{\partial q^\mu}$。正文已改正。`}</Box>
        <Box kind="physics" title="为什么用形式写 Hamilton 力学">{R`(1) **正则变换**就是保持 $\omega$ 的微分同胚（辛同胚），$\omega$ 在任何正则坐标中都写成 $\dd p_\mu\wedge\dd q^\mu$。(2) $\omega^n/n!$ 是相空间的体积元，\eqref{5.95} 推出 Liouville 定理：Hamilton 流保持相空间体积。(3) Poisson 括号满足 $X_{[f,g]_{\mathrm{PB}}}=\pm[X_f,X_g]$（符号取决于约定），即函数的 Poisson 代数与向量场的李代数同态——这是正则量子化"Poisson 括号 → 对易子"的几何根源。`}</Box>
      </Sub>
    </Sec>);
}
