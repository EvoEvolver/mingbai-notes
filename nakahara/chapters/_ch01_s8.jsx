// §1.8 规范理论 + §1.9 磁单极 + §1.10 瞬子 —— 式 (1.241a)–(1.306)，习题 1.11–1.14
import { Sec, Sub, Tx, Eq, Box, Derivation, Exercise, C } from "@kit";
import { InstantonLab } from "./_ch01_demos.jsx";

const R = String.raw;

export function Sec18() {
  return (
    <Sec n="1.8" title="Gauge theories" zh="规范理论"
      gist={R`Maxwell 理论在 $A_\mu\to A_\mu+\partial_\mu\chi$ 下不变；把物质场的整体相位对称性提升为**局域**对称性，就必须引入规范场与协变导数 $\nabla_\mu=\partial_\mu-\mathrm{i}eA_\mu$。推广到非 Abel 群：$\nabla_\mu=\partial_\mu+g\mathcal{A}_\mu$，场强 $\mathcal{F}=\partial\mathcal{A}-\partial\mathcal{A}+g[\mathcal{A},\mathcal{A}]$ 协变变换 $\mathcal{F}\to U\mathcal{F}U^\dagger$。Higgs 机制：真空期望值使规范场获得质量。`}
      why={R`规范势就是第 10 章纤维丛上的**联络**，场强就是**曲率**，规范变换就是换局部截面——"物理不应依赖于我们描述它的方式"在几何上就是这个意思。`}
      gives={["1.243", "1.244", "1.245", "1.252", "1.253", "1.262", "1.264", "1.267", "1.268a"]}>
      <Tx>{R`目前，物理上合理的基本相互作用理论都建立在规范理论之上。**规范原理**——*物理不应依赖于我们描述它的方式*——与广义相对论的原理是协调的。这里简要总结规范理论的经典方面；进一步的参考书见本章开头所列。`}</Tx>

      <Sub n="1.8.1" title="Abelian gauge theories" zh="Abel 规范理论">
        <p className="muted">本小节概念：<C id="gauge" /></p>
        <Tx>{R`读者应当熟悉 Maxwell 方程（取 $c=1$）：`}</Tx>
        <Eq n="1.241a" say={R`磁场无源：不存在磁荷（§1.9 将挑战这一点）。`}>{R`\operatorname{div}\boldsymbol{B}=0`}</Eq>
        <Eq n="1.241b" say={R`Faraday 电磁感应定律：变化的磁场产生涡旋电场。`}>{R`\frac{\partial\boldsymbol{B}}{\partial t}+\operatorname{curl}\boldsymbol{E}=0`}</Eq>
        <Eq n="1.241c" say={R`Gauss 定律：电场的源是电荷密度。`}>{R`\operatorname{div}\boldsymbol{E}=\rho`}</Eq>
        <Eq n="1.241d" say={R`Ampère–Maxwell 定律：磁场的旋度由电流与位移电流产生。`}>{R`\frac{\partial\boldsymbol{E}}{\partial t}-\operatorname{curl}\boldsymbol{B}=-\boldsymbol{j}.`}</Eq>
        <Tx>{R`磁场 $\boldsymbol{B}$ 与电场 $\boldsymbol{E}$ 用矢势 $A^\mu=(\phi,\boldsymbol{A})$ 表示为`}</Tx>
        <Eq n="1.242" say={R`电磁势：磁场是矢势的旋度，电场是标势的负梯度减去矢势的时间变化率；齐次方程 (1.241a,b) 因此自动成立。`}>{R`\boldsymbol{B}=\operatorname{curl}\boldsymbol{A}\qquad\boldsymbol{E}=-\frac{\partial\boldsymbol{A}}{\partial t}-\operatorname{grad}\phi.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{1.241d}、\eqref{1.242}、\eqref{1.244}`}>{R`(1) 原书 \eqref{1.241d} 印作 $\partial\boldsymbol{E}/\partial t-\operatorname{curl}\boldsymbol{E}=-\boldsymbol{j}$，应为 $\operatorname{curl}\boldsymbol{B}$。

(2) 原书 \eqref{1.242} 印作 $\boldsymbol{E}=\partial\boldsymbol{A}/\partial t-\operatorname{grad}\phi$，并写 $A_\mu=(\phi,\boldsymbol{A})$。按 \eqref{1.244} 的矩阵（$F_{0i}=-E_i$）与度规 $\eta=\mathrm{diag}(-1,1,1,1)$，自洽的写法是上指标 $A^\mu=(\phi,\boldsymbol{A})$，即 $A_\mu=(-\phi,\boldsymbol{A})$，于是 $F_{0i}=\partial_tA_i+\partial_i\phi=-E_i$ 给出 $\boldsymbol{E}=-\partial_t\boldsymbol{A}-\operatorname{grad}\phi$（标准形式）。

(3) 原书 \eqref{1.244} 矩阵第三行最后一个元素印作 $B_z$，应为 $F_{23}=\partial_2A_3-\partial_3A_2=B_x$。

三处均已改正；习题 1.11 的解答按改正后的形式验证了全部 Maxwell 方程。`}</Box>
        <Tx>{R`Maxwell 方程在**规范变换**（gauge transformation）`}</Tx>
        <Eq n="1.243" title="规范变换" say={R`规范变换：矢势加上任意标量函数的梯度，电磁场不变——势有冗余，物理只看等价类。`}>{R`A_\mu\to A_\mu+\partial_\mu\chi`}</Eq>
        <Tx>{R`下不变，$\chi$ 是标量函数。若定义**电磁场张量** $F_{\mu\nu}$，这种不变性就一目了然：`}</Tx>
        <Eq n="1.244" title="电磁场张量" say={R`场强张量是势的"外导数"：反对称，六个分量就是电场与磁场。`}>{R`F_{\mu\nu}\equiv\partial_\mu A_\nu-\partial_\nu A_\mu=\begin{pmatrix}0&-E_x&-E_y&-E_z\\E_x&0&B_z&-B_y\\E_y&-B_z&0&B_x\\E_z&B_y&-B_x&0\end{pmatrix}.`}</Eq>
        <Tx>{R`由构造，$F$ 在 \eqref{1.243} 下不变（$\partial_\mu\partial_\nu\chi-\partial_\nu\partial_\mu\chi=0$）。电磁场的 Lagrange 密度为`}</Tx>
        <Eq n="1.245" title="Maxwell Lagrange 密度" say={R`电磁场的 Lagrange 密度：$-\tfrac14F^2=\tfrac12(\boldsymbol{E}^2-\boldsymbol{B}^2)$，加上势与电流的耦合。`}>{R`\mathcal{L}_{\rm EM}=-\tfrac14F_{\mu\nu}F^{\mu\nu}+A_\mu j^\mu`}</Eq>
        <Tx>{R`其中 $j^\mu=(\rho,\boldsymbol{j})$。`}</Tx>
        <Exercise n="1.11" title="Maxwell 方程的协变形式" level="★★"
          hint={R`(1.246a) 中三个指标互不相同才非零；取 $(\xi,\mu,\nu)=(1,2,3)$ 得 $\operatorname{div}\boldsymbol{B}=0$，取一个指标为 0 得 Faraday 定律。(1.246b)：$F^{0i}=E_i$，$F^{ij}=F_{ij}$。Euler–Lagrange 方程对 $A_\mu$ 变分：$\partial\mathcal{L}/\partial(\partial_\nu A_\mu)=-F^{\nu\mu}$。`}
          solution={R`**(1.246a)。**由 $F=\dd A$ 的结构，$\partial_\xi F_{\mu\nu}+\partial_\mu F_{\nu\xi}+\partial_\nu F_{\xi\mu}$ 代入 $F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu$ 后六项两两相消，所以它是恒等式；问题是它在分量上说什么。它对指标全反对称，只有三个指标互异时非零。

$(\xi,\mu,\nu)=(1,2,3)$：$\partial_1F_{23}+\partial_2F_{31}+\partial_3F_{12}=\partial_xB_x+\partial_yB_y+\partial_zB_z=\operatorname{div}\boldsymbol{B}=0$，即 \eqref{1.241a}。

$(\xi,\mu,\nu)=(0,1,2)$：$\partial_0F_{12}+\partial_1F_{20}+\partial_2F_{01}=\partial_tB_z+\partial_xE_y-\partial_yE_x=\partial_tB_z+(\operatorname{curl}\boldsymbol{E})_z=0$；其余分量同理，即 \eqref{1.241b}。

**(1.246b)。**升指标（$\eta^{00}=-1$）：$F^{0i}=-F_{0i}=E_i$，$F^{i0}=-E_i$，$F^{ij}=F_{ij}$。

$\mu=0$：$\partial_\nu F^{0\nu}=\partial_iF^{0i}=\operatorname{div}\boldsymbol{E}=j^0=\rho$，即 \eqref{1.241c}。

$\mu=1$：$\partial_0F^{10}+\partial_2F^{12}+\partial_3F^{13}=-\partial_tE_x+\partial_yB_z-\partial_zB_y=-\partial_tE_x+(\operatorname{curl}\boldsymbol{B})_x=j_x$，即 $\partial_t\boldsymbol{E}-\operatorname{curl}\boldsymbol{B}=-\boldsymbol{j}$，\eqref{1.241d}（改正后的形式）。

**Euler–Lagrange 方程。**把 $A_\mu$ 当作场：$F_{\alpha\beta}F^{\alpha\beta}$ 对 $\partial_\nu A_\mu$ 求导得 $4F^{\nu\mu}$，所以 $\partial\mathcal{L}_{\rm EM}/\partial(\partial_\nu A_\mu)=-F^{\nu\mu}$，$\partial\mathcal{L}_{\rm EM}/\partial A_\mu=j^\mu$。\eqref{1.208} 给出 $\partial_\nu(-F^{\nu\mu})-j^\mu=0$，即 $\partial_\nu F^{\mu\nu}=j^\mu$，正是 \eqref{1.246b}。（齐次方程 \eqref{1.246a} 不来自变分，而是 $F=\dd A$ 的恒等式——Bianchi 恒等式。）`}>
          <Tx>{R`证明 \eqref{1.241a} 与 \eqref{1.241b} 可写成`}</Tx>
          <Eq n="1.246a" say={R`齐次 Maxwell 方程（Bianchi 恒等式）：场强的全反对称化导数为零，即 $\dd F=0$。`}>{R`\partial_\xi F_{\mu\nu}+\partial_\mu F_{\nu\xi}+\partial_\nu F_{\xi\mu}=0`}</Eq>
          <Tx>{R`而 \eqref{1.241c} 与 \eqref{1.241d} 可写成`}</Tx>
          <Eq n="1.246b" title="非齐次 Maxwell 方程" say={R`非齐次 Maxwell 方程：场强的散度等于四维电流。`}>{R`\partial_\nu F^{\mu\nu}=j^\mu`}</Eq>
          <Tx>{R`其中时空指标用 Minkowski 度规 $\eta=\mathrm{diag}(-1,1,1,1)$ 升降。验证 \eqref{1.246b} 是由 \eqref{1.245} 导出的 Euler–Lagrange 方程。`}</Tx>
        </Exercise>
        <Tx>{R`**从整体对称性到局域对称性。**设 $\psi$ 是带电荷 $e$ 的 Dirac 场。自由 Dirac Lagrange 密度`}</Tx>
        <Eq n="1.247" say={R`自由 Dirac Lagrange 密度（此处质量项的符号与 \eqref{1.233} 相反，属于 $\gamma$ 矩阵约定的差别）。`}>{R`\mathcal{L}_0=\bar\psi(\mathrm{i}\gamma^\mu\partial_\mu+m)\psi`}</Eq>
        <Tx>{R`显然在**整体**（*global*）规范变换`}</Tx>
        <Eq n="1.248" say={R`整体相位变换：所有时空点同时转动同一个相位。`}>{R`\psi\to\mathrm{e}^{-\mathrm{i}e\alpha}\psi\qquad\bar\psi\to\bar\psi\mathrm{e}^{\mathrm{i}e\alpha}`}</Eq>
        <Tx>{R`下不变，其中 $\alpha\in\mathbb{R}$ 是常数。我们把这个对称性提升为在**局域**（*local*）规范变换`}</Tx>
        <Eq n="1.249" say={R`局域相位变换：每个时空点可以转动不同的相位 $\alpha(x)$。`}>{R`\psi\to\mathrm{e}^{-\mathrm{i}e\alpha(x)}\psi\qquad\bar\psi\to\bar\psi\mathrm{e}^{\mathrm{i}e\alpha(x)}.`}</Eq>
        <Tx>{R`下的不变性。在 \eqref{1.249} 下，Lagrange 密度变为`}</Tx>
        <Eq n="1.250" say={R`局域相位变换后多出一项 $e\gamma^\mu\partial_\mu\alpha$：导数作用到了相位因子上。`}>{R`\bar\psi(\mathrm{i}\gamma^\mu\partial_\mu+m)\psi\to\bar\psi(\mathrm{i}\gamma^\mu\partial_\mu+e\gamma^\mu\partial_\mu\alpha+m)\psi.`}</Eq>
        <Tx>{R`（$\partial_\mu(\mathrm{e}^{-\mathrm{i}e\alpha}\psi)=\mathrm{e}^{-\mathrm{i}e\alpha}(\partial_\mu\psi-\mathrm{i}e\partial_\mu\alpha\,\psi)$，乘 $\mathrm{i}\gamma^\mu$ 得多出的 $e\gamma^\mu\partial_\mu\alpha$。）多出的项 $e\partial_\mu\alpha$ 看起来像矢势的规范变换，所以我们让规范场 $A_\mu$ 与 $\psi$ 耦合，使 Lagrange 密度具有局域规范对称性。可以验证`}</Tx>
        <Eq n="1.251" say={R`最小耦合：把 $\partial_\mu$ 换成 $\partial_\mu-\mathrm{i}eA_\mu$，规范场吸收了相位的导数。`}>{R`\mathcal{L}=\bar\psi[\mathrm{i}\gamma^\mu(\partial_\mu-\mathrm{i}eA_\mu)+m]\psi`}</Eq>
        <Tx>{R`在联合的规范变换`}</Tx>
        <Eq n="1.252" title="U(1) 规范变换" say={R`联合规范变换：物质场转相位的同时，规范场平移相位的梯度，二者的效应恰好抵消。`}>{R`\begin{aligned}&\psi\to\psi'=\mathrm{e}^{-\mathrm{i}e\alpha(x)}\psi\qquad\bar\psi\to\bar\psi'=\bar\psi\mathrm{e}^{\mathrm{i}e\alpha(x)}\\&A_\mu\to A'_\mu=A_\mu-\partial_\mu\alpha(x)\end{aligned}`}</Eq>
        <Tx>{R`下不变。引入**协变导数**（covariant derivatives）`}</Tx>
        <Eq n="1.253" keyEq title="协变导数" say={R`协变导数：普通导数加上规范场，使导数后的场与原场按相同方式变换。`}>{R`\nabla_\mu\equiv\partial_\mu-\mathrm{i}eA_\mu\qquad\nabla'_\mu\equiv\partial_\mu-\mathrm{i}eA'_\mu.`}</Eq>
        <Tx>{R`读者应验证 $\nabla_\mu\psi$ 的变换方式很"好"：`}</Tx>
        <Eq n="1.254" say={R`协变导数之所以叫"协变"：它与场本身一样只乘一个相位因子。`}>{R`\nabla'_\mu\psi'=\mathrm{e}^{-\mathrm{i}e\alpha(x)}\nabla_\mu\psi.`}</Eq>
        <Tx>{R`（$\nabla'_\mu\psi'=(\partial_\mu-\mathrm{i}eA_\mu+\mathrm{i}e\partial_\mu\alpha)(\mathrm{e}^{-\mathrm{i}e\alpha}\psi)=\mathrm{e}^{-\mathrm{i}e\alpha}(\partial_\mu\psi-\mathrm{i}e\partial_\mu\alpha\,\psi-\mathrm{i}eA_\mu\psi+\mathrm{i}e\partial_\mu\alpha\,\psi)=\mathrm{e}^{-\mathrm{i}e\alpha}\nabla_\mu\psi$。）完整的量子电动力学（QED）Lagrange 密度为`}</Tx>
        <Eq n="1.255" say={R`QED 的 Lagrange 密度：Maxwell 项加上与规范场最小耦合的 Dirac 项。`}>{R`\mathcal{L}_{\rm QED}=-\tfrac14F^{\mu\nu}F_{\mu\nu}+\bar\psi(\mathrm{i}\gamma^\mu\nabla_\mu+m)\psi.`}</Eq>
        <Exercise n="1.12" title="带电标量场的规范不变性" level="★"
          hint={R`先证明 $\nabla'_\mu\phi'=\mathrm{e}^{-\mathrm{i}e\alpha}\nabla_\mu\phi$（与 \eqref{1.254} 相同的计算），再取 Hermite 共轭。`}
          solution={R`$\nabla_\mu=\partial_\mu-\mathrm{i}eA_\mu$。在 \eqref{1.257} 下，

$$\nabla'_\mu\phi'=(\partial_\mu-\mathrm{i}eA_\mu+\mathrm{i}e\partial_\mu\alpha)(\mathrm{e}^{-\mathrm{i}e\alpha}\phi)=\mathrm{e}^{-\mathrm{i}e\alpha}(\partial_\mu\phi-\mathrm{i}e\partial_\mu\alpha\,\phi-\mathrm{i}eA_\mu\phi+\mathrm{i}e\partial_\mu\alpha\,\phi)=\mathrm{e}^{-\mathrm{i}e\alpha}\nabla_\mu\phi.$$

取 Hermite 共轭：$(\nabla'_\mu\phi')^\dagger=(\nabla_\mu\phi)^\dagger\mathrm{e}^{\mathrm{i}e\alpha}$（$\alpha$ 为实）。所以

$$\eta^{\mu\nu}(\nabla'_\mu\phi')^\dagger(\nabla'_\nu\phi')=\eta^{\mu\nu}(\nabla_\mu\phi)^\dagger\mathrm{e}^{\mathrm{i}e\alpha}\mathrm{e}^{-\mathrm{i}e\alpha}(\nabla_\nu\phi)=\eta^{\mu\nu}(\nabla_\mu\phi)^\dagger(\nabla_\nu\phi),$$

而 $\phi'^\dagger\phi'=\phi^\dagger\phi$。因此 $\mathcal{L}$ 不变。注意：若用普通导数，$\partial_\mu\phi'$ 会多出 $-\mathrm{i}e\partial_\mu\alpha\,\phi$，不变性就失去了——这正是引入 $A_\mu$ 的理由。

（注：在度规 $\mathrm{diag}(-1,1,1,1)$ 下，与 \eqref{1.209}、\eqref{1.219} 一致的物理 Lagrange 密度应为 $-\eta^{\mu\nu}(\nabla_\mu\phi)^\dagger(\nabla_\nu\phi)-m^2\phi^\dagger\phi$；原书 \eqref{1.256} 差一个整体符号，这不影响本题的规范不变性。）`}>
          <Tx>{R`设 $\phi=(\phi_1+\mathrm{i}\phi_2)/\sqrt2$ 是带电荷 $e$ 的复标量场。证明 Lagrange 密度`}</Tx>
          <Eq n="1.256" say={R`带电复标量场与规范场最小耦合的 Lagrange 密度（标量 QED）。`}>{R`\mathcal{L}=\eta^{\mu\nu}(\nabla_\mu\phi)^\dagger(\nabla_\nu\phi)+m^2\phi^\dagger\phi`}</Eq>
          <Tx>{R`在规范变换`}</Tx>
          <Eq n="1.257" say={R`带电标量场的 U(1) 规范变换。`}>{R`\phi\to\mathrm{e}^{-\mathrm{i}e\alpha(x)}\phi\qquad\phi^\dagger\to\phi^\dagger\mathrm{e}^{\mathrm{i}e\alpha(x)}\qquad A_\mu\to A_\mu-\partial_\mu\alpha(x).`}</Eq>
          <Tx>{R`下不变。`}</Tx>
        </Exercise>
      </Sub>

      <Sub n="1.8.2" title="Non-Abelian gauge theories" zh="非 Abel 规范理论">
        <p className="muted">本小节概念：<C id="gauge" /></p>
        <Tx>{R`上面的规范变换属于 U(1) 群，即模为 1 的复数，它恰好是 Abel 群。几十年前，Yang 与 Mills（1954）引入了非 Abel 规范变换。当时，非 Abel 规范理论只是出于好奇而被研究；如今它们在基本粒子物理中处于核心地位。

设 $G$ 是紧半单 Lie 群，例如 $\mathrm{SO}(N)$ 或 $\mathrm{SU}(N)$。反 Hermite 生成元 $\{T_\alpha\}$ 满足对易关系`}</Tx>
        <Eq n="1.258" say={R`Lie 代数：生成元的对易子仍是生成元的线性组合，系数为结构常数。`}>{R`[T_\alpha,T_\beta]=f_{\alpha\beta}{}^\gamma T_\gamma`}</Eq>
        <Tx>{R`其中 $f_{\alpha\beta}{}^\gamma$ 称为 $G$ 的**结构常数**（structure constants）。$G$ 中靠近单位元的元素 $U$ 可以表示为`}</Tx>
        <Eq n="1.259" say={R`单位元附近的群元是 Lie 代数元的指数。`}>{R`U=\exp(-\theta^\alpha T_\alpha).`}</Eq>
        <Tx>{R`设 Dirac 场 $\psi$ 在 $U\in G$ 下变换为`}</Tx>
        <Eq n="1.260" say={R`物质场按群的某个表示变换（例如基本表示）。`}>{R`\psi\to U\psi\qquad\bar\psi\to\bar\psi U^\dagger.`}</Eq>
        <Tx>{R`［注：严格地说，必须指明 $\psi$ 属于 $G$ 的哪个表示。若读者对 \eqref{1.260} 感到不安，可以认为 $\psi$ 属于（例如）基本表示。］考虑 Lagrange 密度`}</Tx>
        <Eq n="1.261" say={R`Dirac 场与 Yang–Mills 场的最小耦合：协变导数 $\partial_\mu+g\mathcal{A}_\mu$，$\mathcal{A}_\mu$ 是 Lie 代数值的。`}>{R`\mathcal{L}=\bar\psi[\mathrm{i}\gamma^\mu(\partial_\mu+g\mathcal{A}_\mu)+m]\psi`}</Eq>
        <Tx>{R`其中 **Yang–Mills 规范场** $\mathcal{A}_\mu$ 在 $G$ 的 Lie 代数中取值，即可以按 $T_\alpha$ 展开为 $\mathcal{A}_\mu=A_\mu{}^\alpha T_\alpha$（花体的场是反 Hermite 的）。常数 $g$ 是**耦合常数**，控制 Dirac 场与规范场耦合的强弱。容易验证 $\mathcal{L}$ 在下列变换下不变：`}</Tx>
        <Eq n="1.262" title="非 Abel 规范变换" say={R`非 Abel 规范变换：规范场像矩阵一样被共轭，再加上一个非齐次项 $g^{-1}U\partial U^\dagger$。`}>{R`\begin{aligned}&\psi\to\psi'=U\psi\qquad\bar\psi\to\bar\psi'=\bar\psi U^\dagger\\&\mathcal{A}_\mu\to\mathcal{A}'_\mu=U\mathcal{A}_\mu U^\dagger+g^{-1}U\partial_\mu U^\dagger.\end{aligned}`}</Eq>
        <Tx>{R`协变导数如前定义为 $\nabla_\mu=\partial_\mu+g\mathcal{A}_\mu$。协变导数 $\nabla_\mu\psi$ 在规范变换下协变地变换：`}</Tx>
        <Eq n="1.263" say={R`协变导数后的场与原场一样左乘 $U$。`}>{R`\nabla'_\mu\psi'=U\nabla_\mu\psi.`}</Eq>
        <Derivation title={R`验证 \eqref{1.263}`} collapsed steps={[
          { tex: R`\nabla'_\mu\psi'=\partial_\mu(U\psi)+gU\mathcal{A}_\mu U^\dagger U\psi+U(\partial_\mu U^\dagger)U\psi`, why: R`代入 \eqref{1.262}。` },
          { tex: R`U(\partial_\mu U^\dagger)U=-\partial_\mu U`, why: R`对 $U^\dagger U=1$ 求导：$(\partial_\mu U^\dagger)U=-U^\dagger\partial_\mu U$，左乘 $U$。` },
          { tex: R`\nabla'_\mu\psi'=(\partial_\mu U)\psi+U\partial_\mu\psi+gU\mathcal{A}_\mu\psi-(\partial_\mu U)\psi=U\nabla_\mu\psi`, why: R`非齐次项恰好抵消导数作用在 $U$ 上的部分。于是 $\bar\psi'\gamma^\mu\nabla'_\mu\psi'=\bar\psi U^\dagger U\gamma^\mu\nabla_\mu\psi$，$\mathcal{L}$ 不变。` },
        ]} />
        <Tx>{R`**Yang–Mills 场强张量**为`}</Tx>
        <Eq n="1.264" keyEq title="Yang–Mills 场强" say={R`非 Abel 场强 = Abel 部分 + 规范场的对易子；对易子项使规范场自己带"荷"、相互作用。`}>{R`\mathcal{F}_{\mu\nu}\equiv\partial_\mu\mathcal{A}_\nu-\partial_\nu\mathcal{A}_\mu+g[\mathcal{A}_\mu,\mathcal{A}_\nu].`}</Eq>
        <Tx>{R`分量 $F_{\mu\nu}{}^\alpha$ 为`}</Tx>
        <Eq n="1.265" say={R`场强的分量形式：对易子化为结构常数。`}>{R`F_{\mu\nu}{}^\alpha=\partial_\mu A_\nu{}^\alpha-\partial_\nu A_\mu{}^\alpha+gf_{\beta\gamma}{}^\alpha A_\mu{}^\beta A_\nu{}^\gamma.`}</Eq>
        <Tx>{R`定义**对偶场张量** $*\mathcal{F}_{\mu\nu}\equiv\tfrac12\varepsilon_{\mu\nu\kappa\lambda}\mathcal{F}^{\kappa\lambda}$，它满足 **Bianchi 恒等式**`}</Tx>
        <Eq n="1.266" say={R`Bianchi 恒等式：对偶场强的协变散度恒为零——非 Abel 版的齐次 Maxwell 方程。`}>{R`\mathcal{D}_\mu*\mathcal{F}^{\mu\nu}\equiv\partial_\mu*\mathcal{F}^{\mu\nu}+g[\mathcal{A}_\mu,*\mathcal{F}^{\mu\nu}]=0.`}</Eq>
        <Exercise n="1.13" title="场强的协变变换" level="★★"
          hint={R`把 $\nabla_\mu=\partial_\mu+g\mathcal{A}_\mu$ 看作作用于 $\psi$ 的算符，先证明 $[\nabla_\mu,\nabla_\nu]=g\mathcal{F}_{\mu\nu}$（作为乘法算符），再用 \eqref{1.263}。`}
          solution={R`**第一步：场强是协变导数的对易子。**对任意 $\psi$，

$$[\nabla_\mu,\nabla_\nu]\psi=(\partial_\mu+g\mathcal{A}_\mu)(\partial_\nu\psi+g\mathcal{A}_\nu\psi)-(\mu\leftrightarrow\nu)=g(\partial_\mu\mathcal{A}_\nu-\partial_\nu\mathcal{A}_\mu)\psi+g^2[\mathcal{A}_\mu,\mathcal{A}_\nu]\psi=g\mathcal{F}_{\mu\nu}\psi,$$

二阶导数项与 $\mathcal{A}\partial\psi$ 型的项在反对称化中都消去。

**第二步。**由 \eqref{1.263}，$\nabla'_\mu(U\psi)=U\nabla_\mu\psi$ 对任意 $\psi$ 成立，即作为算符 $\nabla'_\mu=U\nabla_\mu U^{-1}$。于是

$$g\mathcal{F}'_{\mu\nu}=[\nabla'_\mu,\nabla'_\nu]=U[\nabla_\mu,\nabla_\nu]U^{-1}=gU\mathcal{F}_{\mu\nu}U^\dagger.$$

**直接验证（另一种做法）：**把 $\mathcal{A}'=U\mathcal{A}U^\dagger+g^{-1}U\partial U^\dagger$ 代入 \eqref{1.264}，利用 $\partial U^\dagger=-U^\dagger(\partial U)U^\dagger$，所有含 $\partial U$ 的项成对相消，剩下 $U(\partial_\mu\mathcal{A}_\nu-\partial_\nu\mathcal{A}_\mu+g[\mathcal{A}_\mu,\mathcal{A}_\nu])U^\dagger$。

注意与 Abel 情形的区别：U(1) 时 $\mathcal{F}$ 规范**不变**，非 Abel 时只是**协变**（被共轭），所以 $\mathcal{F}$ 本身不是可观测量，$\Tr(\mathcal{F}\mathcal{F})$ 才是。`}>
          <Tx>{R`证明在 \eqref{1.262} 下 $\mathcal{F}_{\mu\nu}$ 的变换为`}</Tx>
          <Eq n="1.267" title="场强的协变性" say={R`非 Abel 场强在规范变换下被群元共轭（协变），而不是不变；只有它的迹才是规范不变的。`}>{R`\mathcal{F}_{\mu\nu}\to U\mathcal{F}_{\mu\nu}U^\dagger.`}</Eq>
        </Exercise>
        <Tx>{R`由这个习题得到规范不变的作用量`}</Tx>
        <Eq n="1.268a" title="Yang–Mills 作用量" say={R`Yang–Mills Lagrange 密度：场强平方的迹，规范不变；反 Hermite 生成元使 $\Tr(\mathcal{F}\mathcal{F})$ 为负，所以前面是 $+\tfrac12$。`}>{R`\mathcal{L}_{\rm YM}=\tfrac12\Tr(\mathcal{F}^{\mu\nu}\mathcal{F}_{\mu\nu})`}</Eq>
        <Tx>{R`其中迹取遍群的矩阵指标。分量形式为`}</Tx>
        <Eq n="1.268b" say={R`分量形式：每个色分量都贡献一份 Maxwell 型的 $-\tfrac14F^2$。`}>{R`\mathcal{L}_{\rm YM}=\tfrac12F^{\mu\nu\alpha}F_{\mu\nu}{}^\beta\Tr(T_\alpha T_\beta)=-\tfrac14F^{\mu\nu\alpha}F_{\mu\nu\alpha}`}</Eq>
        <Tx>{R`这里把 $\{T_\alpha\}$ 归一化为 $\Tr(T_\alpha T_\beta)=-\tfrac12\delta_{\alpha\beta}$。由 \eqref{1.268a} 导出的场方程为`}</Tx>
        <Eq n="1.269" title="Yang–Mills 方程" say={R`Yang–Mills 方程：场强的协变散度为零（无源时），是 Maxwell 方程 $\partial_\nu F^{\mu\nu}=0$ 的非 Abel 推广。`}>{R`\mathcal{D}_\mu\mathcal{F}^{\mu\nu}=\partial_\mu\mathcal{F}^{\mu\nu}+g[\mathcal{A}_\mu,\mathcal{F}^{\mu\nu}]=0.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{1.268a}–\eqref{1.268b} 的整体符号`}>{R`原书写作 $\mathcal{L}_{\rm YM}=-\tfrac12\Tr(\mathcal{F}^{\mu\nu}\mathcal{F}_{\mu\nu})=+\tfrac14F^{\mu\nu\alpha}F_{\mu\nu\alpha}$。在本章的度规 $\mathrm{diag}(-1,1,1,1)$ 下，每个分量都应当像 Maxwell 项 \eqref{1.245} 那样是 $-\tfrac14F^2=\tfrac12(\boldsymbol{E}^2-\boldsymbol{B}^2)$，否则能量不是正定的。由于生成元反 Hermite、$\Tr(T_\alpha T_\beta)=-\tfrac12\delta_{\alpha\beta}$，正确的写法是 $+\tfrac12\Tr(\mathcal{F}\mathcal{F})=-\tfrac14F^\alpha F^\alpha$。场方程 \eqref{1.269} 与整体符号无关。（§1.10 的 Euclid 作用量 \eqref{1.290} $-\tfrac12\Tr\mathcal{F}\mathcal{F}$ 则是正确的：Euclid 作用量必须正定。）另外，原书 \eqref{1.269} 的指标写作 $\mathcal{D}_\mu\mathcal{F}_{\mu\nu}$，这里按 Minkowski 记号写成 $\mathcal{D}_\mu\mathcal{F}^{\mu\nu}$。`}</Box>
      </Sub>

      <Sub n="1.8.3" title="Higgs fields" zh="Higgs 场">
        <Tx>{R`如果规范对称性在我们的世界中是显然的，就会有许多可观测的无质量矢量场。除电磁场外这类场的缺失，迫使我们破缺规范对称性。如果对称性是**自发**破缺的，理论仍保持可重整。

考虑与复标量场 $\phi$ 耦合的 U(1) 规范场，其 Lagrange 密度为（本小节按 Higgs 机制的常见写法取度规 $\mathrm{diag}(+1,-1,-1,-1)$，所以标量动能项前为正号）`}</Tx>
        <Eq n="1.270" title="Abel Higgs 模型" say={R`Abel Higgs 模型：规范场 + 带电标量场 + 墨西哥帽势；势的极小值不在 $\phi=0$。`}>{R`\mathcal{L}=-\tfrac14F^{\mu\nu}F_{\mu\nu}+(\nabla_\mu\phi)^\dagger(\nabla^\mu\phi)-\lambda(\phi^\dagger\phi-v^2/2)^2.`}</Eq>
        <Tx>{R`势 $V(\phi)=\lambda(\phi^\dagger\phi-v^2/2)^2$ 在 $|\phi|=v/\sqrt2$ 处取极小值 $V=0$。Lagrange 密度 \eqref{1.270} 在局域规范变换`}</Tx>
        <Eq n="1.271" say={R`Higgs 模型的局域 U(1) 规范对称性。`}>{R`A_\mu\to A_\mu-\partial_\mu\alpha\qquad\phi\to\mathrm{e}^{-\mathrm{i}e\alpha}\phi\qquad\phi^\dagger\to\mathrm{e}^{\mathrm{i}e\alpha}\phi^\dagger.`}</Eq>
        <Tx>{R`下不变。这个对称性因 **Higgs 场** $\phi$ 的**真空期望值**（vacuum expectation value，VEV）$\langle\phi\rangle$ 而自发破缺。把 $\phi$ 展开为

$$\phi=\frac{1}{\sqrt2}[v+\rho(x)]\mathrm{e}^{\mathrm{i}\alpha(x)/v}\sim\frac{1}{\sqrt2}[v+\rho(x)+\mathrm{i}\alpha(x)],$$

设 $v\neq0$。此时可以取**幺正规范**（unitary gauge），把 $\phi$ 的相位"规范掉"，使 $\phi$ 只有实部：`}</Tx>
        <Eq n="1.272" say={R`幺正规范：用规范自由度把 Higgs 场的相位转掉，只剩径向涨落 $\rho$。`}>{R`\phi(x)=\frac{1}{\sqrt2}(v+\rho(x)).`}</Eq>
        <Tx>{R`把 \eqref{1.272} 代入 \eqref{1.270} 并按 $\rho$ 展开，得`}</Tx>
        <Eq n="1.273" say={R`在破缺真空附近展开：规范场获得质量项 $\tfrac12e^2v^2A^2$，$\rho$ 获得质量项 $\lambda v^2\rho^2$，外加三次、四次相互作用。`}>{R`\mathcal{L}=-\tfrac14F_{\mu\nu}F^{\mu\nu}+\tfrac12\partial_\mu\rho\partial^\mu\rho+\tfrac12e^2A_\mu A^\mu(v^2+2v\rho+\rho^2)-\tfrac14\lambda(4v^2\rho^2+4v\rho^3+\rho^4).`}</Eq>
        <Tx>{R`（$|\nabla_\mu\phi|^2$ 中 $e^2A_\mu A^\mu|\phi|^2=\tfrac12e^2A^2(v+\rho)^2$；$\phi^\dagger\phi-v^2/2=\tfrac12(2v\rho+\rho^2)$，平方后乘 $\lambda$ 即最后一项。）由自由部分导出的 $A_\mu$ 与 $\rho$ 的运动方程为`}</Tx>
        <Eq n="1.274" title="Higgs 机制的质量" say={R`线性化方程：规范场成为质量 $ev$ 的 Proca 场，Higgs 粒子 $\rho$ 的质量平方为 $2\lambda v^2$。`}>{R`\partial^\nu F_{\nu\mu}+e^2v^2A_\mu=0\qquad\partial_\mu\partial^\mu\rho+2\lambda v^2\rho=0.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{1.270} 的势与 \eqref{1.274} 的系数`}>{R`(1) 原书 \eqref{1.270} 的势印作 $\lambda(\phi^\dagger\phi-v^2)^2$，极小值在 $|\phi|=v$。但随后的展开 $\phi=(v+\rho)/\sqrt2$ 把真空放在 $|\phi|=v/\sqrt2$，\eqref{1.273} 的最后一项也只在势为 $\lambda(\phi^\dagger\phi-v^2/2)^2$ 时成立（否则 $\rho=0$ 时势不为零，还会出现 $\rho$ 的一次项）。本站改为 $v^2/2$。

(2) 原书 \eqref{1.274} 第一式写作 $\partial^\nu F_{\nu\mu}+2e^2v^2A_\mu=0$。由 \eqref{1.273} 的质量项 $\tfrac12e^2v^2A_\mu A^\mu$，Euler–Lagrange 方程给出系数 $e^2v^2$（规范玻色子质量 $m_A=ev$），已改正。第二式 $2\lambda v^2$ 正确（$m_\rho^2=2\lambda v^2$）。

(3) 本小节的动能项符号对应度规 $\mathrm{diag}(+1,-1,-1,-1)$，与 \eqref{1.209} 的约定不同；原书未加说明。`}</Box>
        <Tx>{R`由第一个方程（取散度：$\partial^\mu\partial^\nu F_{\nu\mu}=0$），$A_\mu$ 必须满足 Lorentz 条件 $\partial_\mu A^\mu=0$。\eqref{1.270} 表观的自由度数为 2（光子）+ 2（复标量）= 4。若 VEV $\neq0$，则有 3（有质量矢量）+ 1（实标量）= 4：自由度没有丢失，复标量的相位被规范场"吃掉"成为它的纵向分量。$A_0$ 的质量项符号不对，所以不能是物理自由度。由规范场产生有质量场的机制称为 **Higgs 机制**（Higgs mechanism）。`}</Tx>
      </Sub>
    </Sec>);
}

export function Sec19() {
  return (
    <Sec n="1.9" title="Magnetic monopoles" zh="磁单极"
      gist={R`点磁荷 $\boldsymbol{B}=g\boldsymbol{r}/r^3$ 的磁通 $4\pi g\neq0$，所以不存在处处光滑的单一矢势：$\boldsymbol{A}^{\rm N}$ 沿负 $z$ 轴奇异（Dirac 弦），$\boldsymbol{A}^{\rm S}$ 沿正 $z$ 轴奇异。Wu–Yang：北半球用 $\boldsymbol{A}^{\rm N}$、南半球用 $\boldsymbol{A}^{\rm S}$，赤道上相差规范变换 $\Lambda=2g\phi$；波函数单值要求 $2eg/\hbar c\in\mathbb{Z}$——Dirac 量子化条件。`}
      why={R`这是全书最重要的物理例子之一：两张"坐标卡"上的规范势用转移函数粘起来，正是第 9–10 章纤维丛与联络的原型；整数 $2eg/\hbar c$ 就是第 11 章的第一 Chern 数。`}
      gives={["1.276", "1.277", "1.278a", "1.278b", "1.281", "1.284", "1.287"]}>
      <Tx>{R`Maxwell 方程统一了电与磁，在物理史上应当被看作统一自然界各种力的第一次尝试。尽管它取得了巨大成功，Dirac（1931）注意到 Maxwell 方程中存在一个不对称：方程 $\operatorname{div}\boldsymbol{B}=0$ 否认了磁荷的存在。他引入了**磁单极**（magnetic monopole）——一个点状磁荷——使理论对称。`}</Tx>

      <Sub n="1.9.1" title="Dirac monopole" zh="Dirac 磁单极">
        <p className="muted">本小节概念：<C id="monopole" /></p>
        <Tx>{R`考虑位于 $\boldsymbol{r}=0$、强度为 $g$ 的磁单极（Gauss 单位制）：`}</Tx>
        <Eq n="1.275" say={R`磁单极：磁场的散度在原点是一个 $\delta$ 函数源。`}>{R`\operatorname{div}\boldsymbol{B}=4\pi g\delta^3(\boldsymbol{r}).`}</Eq>
        <Tx>{R`由 $\Delta(1/r)=-4\pi\delta^3(\boldsymbol{r})$ 与 $\nabla(1/r)=-\boldsymbol{r}/r^3$，这个方程的解为`}</Tx>
        <Eq n="1.276" title="单极磁场" say={R`单极磁场：与点电荷的 Coulomb 场完全相同的径向平方反比场。`}>{R`\boldsymbol{B}=g\boldsymbol{r}/r^3.`}</Eq>
        <Tx>{R`把 $\boldsymbol{B}$ 在半径 $R$ 的球面 $S$ 上积分得到磁通 $\Phi$：`}</Tx>
        <Eq n="1.277" title="单极磁通" say={R`穿过包围磁单极的任意闭曲面的磁通都是 $4\pi g$，与半径无关——这是拓扑量。`}>{R`\Phi=\oint_S\boldsymbol{B}\cdot\dd\boldsymbol{S}=4\pi g.`}</Eq>
        <Tx>{R`**给出单极场 \eqref{1.276} 的矢势是什么？**若定义矢势 $\boldsymbol{A}^{\rm N}$：`}</Tx>
        <Eq n="1.278a" say={R`北半球矢势（Cartesian 分量）：在 $z\to-r$（负 $z$ 轴）处分母为零。`}>{R`A^{\rm N}{}_x=\frac{-gy}{r(r+z)}\qquad A^{\rm N}{}_y=\frac{gx}{r(r+z)}\qquad A^{\rm N}{}_z=0`}</Eq>
        <Tx>{R`容易验证`}</Tx>
        <Eq n="1.279" say={R`$\boldsymbol{A}^{\rm N}$ 的旋度 = 单极场 + 沿负 $z$ 轴向原点输送磁通 $4\pi g$ 的"弦"——这样总磁通为零，与 $\operatorname{div}\operatorname{curl}=0$ 相容。`}>{R`\operatorname{curl}\boldsymbol{A}^{\rm N}=g\boldsymbol{r}/r^3+4\pi g\delta(x)\delta(y)\theta(-z)\hat{\boldsymbol{e}}_z.`}</Eq>
        <Tx>{R`（原书省略了单位矢量 $\hat{\boldsymbol{e}}_z$。检验：$\operatorname{div}$ 第二项 $=4\pi g\delta(x)\delta(y)\partial_z\theta(-z)=-4\pi g\delta^3(\boldsymbol{r})$，恰好抵消第一项的散度，符合 $\operatorname{div}\operatorname{curl}=0$。）除了沿负 $z$ 轴（$\theta=\pi$）之外，$\operatorname{curl}\boldsymbol{A}^{\rm N}=\boldsymbol{B}$。沿 $z$ 轴的奇异性称为 **Dirac 弦**（Dirac string），它反映的是坐标系选得不好。若改为定义另一个矢势`}</Tx>
        <Eq n="1.278b" say={R`南半球矢势：奇异性移到正 $z$ 轴。`}>{R`A^{\rm S}{}_x=\frac{gy}{r(r-z)}\qquad A^{\rm S}{}_y=\frac{-gx}{r(r-z)}\qquad A^{\rm S}{}_z=0`}</Eq>
        <Tx>{R`这回除了沿正 $z$ 轴（$\theta=0$）之外，$\operatorname{curl}\boldsymbol{A}^{\rm S}=\boldsymbol{B}$。

**奇异性是 \eqref{1.277} 的必然结果。**若存在处处无奇异的矢量 $\boldsymbol{A}$ 使 $\boldsymbol{B}=\operatorname{curl}\boldsymbol{A}$，由 Gauss 定律，

$$\Phi=\oint_S\boldsymbol{B}\cdot\dd\boldsymbol{S}=\oint_S\operatorname{curl}\boldsymbol{A}\cdot\dd\boldsymbol{S}=\int_V\operatorname{div}(\operatorname{curl}\boldsymbol{A})\,\dd V=0$$

（$V$ 为 $S$ 所围的体积），与 $4\pi g$ 矛盾。（更直接地：$S$ 是无边界的闭曲面，由 Stokes 定理 $\oint_S\operatorname{curl}\boldsymbol{A}\cdot\dd\boldsymbol{S}=0$。）只有放弃使用**单个**矢势，才能避免这个问题。`}</Tx>
        <Exercise n="1.14" title="极坐标中的单极矢势" level="★"
          hint={R`$x=r\sin\theta\cos\phi$，$y=r\sin\theta\sin\phi$，$z=r\cos\theta$；$r\pm z=r(1\pm\cos\theta)$；并用 $\sin^2\theta=(1-\cos\theta)(1+\cos\theta)$。`}
          solution={R`$\boldsymbol{A}^{\rm N}=\dfrac{g}{r(r+z)}(-y,x,0)$，而 $(-y,x,0)=r\sin\theta(-\sin\phi,\cos\phi,0)=r\sin\theta\,\hat{\boldsymbol{e}}_\phi$，$r+z=r(1+\cos\theta)$。所以

$$\boldsymbol{A}^{\rm N}=\frac{g\,r\sin\theta}{r^2(1+\cos\theta)}\hat{\boldsymbol{e}}_\phi=\frac{g\sin^2\theta}{r\sin\theta(1+\cos\theta)}\hat{\boldsymbol{e}}_\phi=\frac{g(1-\cos\theta)}{r\sin\theta}\hat{\boldsymbol{e}}_\phi.$$

同理 $\boldsymbol{A}^{\rm S}=\dfrac{g}{r(r-z)}(y,-x,0)=-\dfrac{g\,r\sin\theta}{r^2(1-\cos\theta)}\hat{\boldsymbol{e}}_\phi=-\dfrac{g(1+\cos\theta)}{r\sin\theta}\hat{\boldsymbol{e}}_\phi$。

**检验旋度。**对 $\boldsymbol{A}=A_\phi(r,\theta)\hat{\boldsymbol{e}}_\phi$，$(\operatorname{curl}\boldsymbol{A})_r=\dfrac{1}{r\sin\theta}\partial_\theta(\sin\theta A_\phi)$，$(\operatorname{curl}\boldsymbol{A})_\theta=-\dfrac1r\partial_r(rA_\phi)$。$\sin\theta A^{\rm N}_\phi=g(1-\cos\theta)/r$，$\partial_\theta$ 得 $g\sin\theta/r$，故 $B_r=g/r^2$；$rA^{\rm N}_\phi$ 与 $r$ 无关，$B_\theta=0$。$\boldsymbol{A}^{\rm S}$ 同理。$\theta\to\pi$ 时 $A^{\rm N}_\phi\approx2g/(r\sin\theta)\to\infty$（Dirac 弦），而 $\theta\to0$ 时 $A^{\rm N}_\phi\approx g\theta/2r\to0$，光滑。`}>
          <Tx>{R`引入极坐标 $(r,\theta,\phi)$。证明矢势 $\boldsymbol{A}^{\rm N}$ 与 $\boldsymbol{A}^{\rm S}$ 可以表示为`}</Tx>
          <Eq n="1.280a" title="单极矢势（北）" say={R`北半球的单极矢势：只有 $\phi$ 分量，在 $\theta=\pi$ 处奇异，在北极光滑。`}>{R`\boldsymbol{A}^{\rm N}(\boldsymbol{r})=\frac{g(1-\cos\theta)}{r\sin\theta}\hat{\boldsymbol{e}}_\phi`}</Eq>
          <Eq n="1.280b" say={R`南半球的单极矢势：在 $\theta=0$ 处奇异，在南极光滑。`}>{R`\boldsymbol{A}^{\rm S}(\boldsymbol{r})=-\frac{g(1+\cos\theta)}{r\sin\theta}\hat{\boldsymbol{e}}_\phi`}</Eq>
          <Tx>{R`其中 $\hat{\boldsymbol{e}}_\phi=-\sin\phi\,\hat{\boldsymbol{e}}_x+\cos\phi\,\hat{\boldsymbol{e}}_y$。`}</Tx>
        </Exercise>
      </Sub>

      <Sub n="1.9.2" title="The Wu–Yang monopole" zh="Wu–Yang 磁单极">
        <p className="muted">本小节概念：<C id="monopole" /> · <C id="gauge" /></p>
        <Tx>{R`Wu 与 Yang（1975）注意到，Dirac 磁单极背后的几何与拓扑结构最好用**纤维丛**来描述。第 9、10 章将用纤维丛及其联络来讲述 Dirac 磁单极；这里在不引入纤维丛的情况下概述 Wu 与 Yang 的想法。

Wu 与 Yang 注意到，描述一个磁单极时可以使用**多于一个**矢势。例如，在包围磁单极的球面 $S$ 的北半球用 $\boldsymbol{A}^{\rm N}$、南半球用 $\boldsymbol{A}^{\rm S}$，就可以避免奇异性。这两个矢势都给出磁场 $\boldsymbol{B}=g\boldsymbol{r}/r^3$，它在球面上处处无奇异。在作为南北半球边界的赤道上，$\boldsymbol{A}^{\rm N}$ 与 $\boldsymbol{A}^{\rm S}$ 由规范变换联系：$\boldsymbol{A}^{\rm N}-\boldsymbol{A}^{\rm S}=\operatorname{grad}\Lambda$。为求出 $\Lambda$，利用习题 1.14 的结果：`}</Tx>
        <Eq n="1.281" title="两半球矢势之差" say={R`两个矢势在重叠区相差一个纯规范：$\operatorname{grad}(2g\phi)$——它不能在整个赤道上写成单值函数的梯度。`}>{R`\boldsymbol{A}^{\rm N}-\boldsymbol{A}^{\rm S}=\frac{2g}{r\sin\theta}\hat{\boldsymbol{e}}_\phi=\operatorname{grad}(2g\phi)`}</Eq>
        <Tx>{R`这里用了表达式

$$\operatorname{grad}f=\frac{\partial f}{\partial r}\hat{\boldsymbol{e}}_r+\frac1r\frac{\partial f}{\partial\theta}\hat{\boldsymbol{e}}_\theta+\frac{1}{r\sin\theta}\frac{\partial f}{\partial\phi}\hat{\boldsymbol{e}}_\phi.$$

于是联系 $\boldsymbol{A}^{\rm N}$ 与 $\boldsymbol{A}^{\rm S}$ 的规范变换函数为`}</Tx>
        <Eq n="1.282" say={R`转移函数：规范参数是方位角的 $2g$ 倍，绕赤道一圈增加 $4\pi g$。`}>{R`\Lambda=2g\phi.`}</Eq>
        <Tx>{R`注意 $\Lambda$ 在 $\theta=0$ 与 $\theta=\pi$ 处没有定义（$\phi$ 在两极不确定）。由于我们只在 $\theta=\pi/2$ 处作规范变换，这些奇异性在分析中不会出现。总磁通为`}</Tx>
        <Eq n="1.283" say={R`总磁通 = 两个半球上各自用光滑的矢势计算的磁通之和。`}>{R`\Phi=\oint_S\operatorname{curl}\boldsymbol{A}\cdot\dd\boldsymbol{S}=\int_{U_{\rm N}}\operatorname{curl}\boldsymbol{A}^{\rm N}\cdot\dd\boldsymbol{S}+\int_{U_{\rm S}}\operatorname{curl}\boldsymbol{A}^{\rm S}\cdot\dd\boldsymbol{S}`}</Eq>
        <Tx>{R`其中 $U_{\rm N}$、$U_{\rm S}$ 分别表示北、南半球。由 Stokes 定理（北半球的边界是逆时针的赤道，南半球的边界是顺时针的赤道）：`}</Tx>
        <Eq n="1.284" title="磁通 = 转移函数的绕数" say={R`磁通完全由赤道上的规范变换决定：$\Lambda$ 绕赤道一圈的增量 $4\pi g$——拓扑荷住在"粘合处"。`}>{R`\begin{aligned}\Phi&=\oint_{\rm equator}\boldsymbol{A}^{\rm N}\cdot\dd\boldsymbol{s}-\oint_{\rm equator}\boldsymbol{A}^{\rm S}\cdot\dd\boldsymbol{s}=\oint_{\rm equator}(\boldsymbol{A}^{\rm N}-\boldsymbol{A}^{\rm S})\cdot\dd\boldsymbol{s}\\&=\oint_{\rm equator}\operatorname{grad}(2g\phi)\cdot\dd\boldsymbol{s}=4g\pi\end{aligned}`}</Eq>
        <Tx>{R`与 \eqref{1.277} 一致。`}</Tx>
        <Box kind="physics" title="预告：这就是纤维丛">{R`$U_{\rm N}$、$U_{\rm S}$ 是 $S^2$ 的两张坐标卡，$\boldsymbol{A}^{\rm N}$、$\boldsymbol{A}^{\rm S}$ 是两张卡上的局部联络，$\mathrm{e}^{\mathrm{i}e\Lambda/\hbar c}$ 是赤道上的**转移函数** $S^1\to\mathrm{U}(1)$。转移函数绕赤道一圈的绕数（即 $\pi_1(\mathrm{U}(1))=\mathbb{Z}$ 中的元素，第 4 章）就是下面的整数 $n$，它分类了 $S^2$ 上的 U(1) 丛——第 9、10 章将以此构造 Dirac 单极丛及其联络。`}</Box>
      </Sub>

      <Sub n="1.9.3" title="Charge quantization" zh="电荷量子化">
        <p className="muted">本小节概念：<C id="monopole" /></p>
        <Tx>{R`考虑在磁荷为 $g$ 的磁单极场中运动的、电荷为 $e$、质量为 $m$ 的点粒子。若磁单极足够重，粒子的 Schrödinger 方程取如下形式（恢复 $\hbar$、$c$）：`}</Tx>
        <Eq n="1.285" say={R`带电粒子在磁场中的 Schrödinger 方程：动量换成机械动量 $\boldsymbol{p}-e\boldsymbol{A}/c$（最小耦合）。`}>{R`\frac{1}{2m}\left(\boldsymbol{p}-\frac ec\boldsymbol{A}\right)^2\psi(\boldsymbol{r})=E\psi(\boldsymbol{r}).`}</Eq>
        <Tx>{R`容易证明，在规范变换 $\boldsymbol{A}\to\boldsymbol{A}+\operatorname{grad}\Lambda$ 下波函数变为 $\psi\to\exp(\mathrm{i}e\Lambda/\hbar c)\psi$（因为 $(\boldsymbol{p}-\tfrac ec\boldsymbol{A}-\tfrac ec\nabla\Lambda)\mathrm{e}^{\mathrm{i}e\Lambda/\hbar c}\psi=\mathrm{e}^{\mathrm{i}e\Lambda/\hbar c}(\boldsymbol{p}-\tfrac ec\boldsymbol{A})\psi$，$\boldsymbol{p}=-\mathrm{i}\hbar\nabla$）。现在 $\boldsymbol{A}^{\rm N}$ 与 $\boldsymbol{A}^{\rm S}$ 只相差规范变换 $\boldsymbol{A}^{\rm N}-\boldsymbol{A}^{\rm S}=\operatorname{grad}(2g\phi)$。若 $\psi^{\rm N}$、$\psi^{\rm S}$ 分别是定义在 $U_{\rm N}$、$U_{\rm S}$ 上的波函数，它们由相位变换联系：`}</Tx>
        <Eq n="1.286" say={R`两个半球上的波函数在赤道上相差一个依赖于方位角的相位。`}>{R`\psi^{\rm S}(\boldsymbol{r})=\exp\left(\frac{-\mathrm{i}e\Lambda}{\hbar c}\right)\psi^{\rm N}(\boldsymbol{r}).`}</Eq>
        <Tx>{R`取 $\theta=\pi/2$，研究沿赤道从 $\phi=0$ 走到 $\phi=2\pi$ 时波函数的行为。要求波函数单值，\eqref{1.286} 迫使我们取`}</Tx>
        <Eq n="1.287" keyEq title="Dirac 量子化条件" say={R`Dirac 量子化条件：相位因子 $\mathrm{e}^{-2\mathrm{i}eg\phi/\hbar c}$ 绕赤道一圈必须回到 1，所以 $2eg/\hbar c$ 必须是整数。`}>{R`\frac{2eg}{\hbar c}=n\qquad n\in\mathbb{Z}.`}</Eq>
        <Tx>{R`这就是著名的磁荷 **Dirac 量子化条件**；若磁单极存在，磁荷只能取离散值`}</Tx>
        <Eq n="1.288" say={R`磁荷的允许值：$\hbar c/2e$ 的整数倍。`}>{R`g=\frac{\hbar cn}{2e}\qquad n\in\mathbb{Z}.`}</Eq>
        <Tx>{R`同理，只要宇宙中某处存在一个磁单极，**所有电荷都是量子化的**——这至今仍是对电荷量子化最优美的解释之一。`}</Tx>
      </Sub>
    </Sec>);
}

export function Sec110() {
  return (
    <Sec n="1.10" title="Instantons" zh="瞬子"
      gist={R`Euclid 路径积分由作用量的局部极小值主导；在 $\mathbb{R}^4$ 上的 SU(2) 规范理论中，有限作用量要求无穷远处 $\mathcal{A}_\mu$ 是纯规范 $U^{-1}\partial_\mu U$，其分类由 $S^3\to\mathrm{SU}(2)$ 的绕数（瞬子数 $Q$）给出。由 $\int\Tr(\mathcal{F}\pm*\mathcal{F})^2$ 的符号得 Bogomolny 下界 $S\ge8\pi^2|Q|$，在（反）自对偶解上取等号；BPST 瞬子 $f=r^2/(r^2+\lambda^2)$ 给出 $Q=1$、$S=8\pi^2$。`}
      why={R`瞬子是全书拓扑最直接地进入物理的例子：$Q$ 是第二 Chern 数（第 11 章），它的存在由 $\pi_3(\mathrm{SU}(2))=\mathbb{Z}$（第 4 章）保证，第 10 章将在 $S^4$ 上的 SU(2) 丛中重新构造它。`}
      gives={["1.290", "1.293", "1.295", "1.297", "1.299", "1.302", "1.303", "1.305"]}>
      <Tx>{R`Euclid 理论中真空到真空的振幅为`}</Tx>
      <Eq n="1.289" say={R`Euclid 真空振幅：每个场位形以 $\mathrm{e}^{-S}$ 加权，作用量越小贡献越大。`}>{R`Z\equiv\langle0|0\rangle\propto\int\mathcal{D}\phi\,\mathrm{e}^{-S[\phi,\partial_\mu\phi]}`}</Eq>
      <Tx>{R`其中 $S$ 是 Euclid 作用量。\eqref{1.289} 表明，对 $Z$ 的主要贡献来自使 $S[\phi,\partial_\mu\phi]$ 取**局部极小值**的 $\phi(x)$。在许多理论中，除了绝对极小值外还存在若干局部极小值。在非 Abel 规范理论中，这些极小值称为**瞬子**（instantons）。`}</Tx>

      <Sub n="1.10.1" title="Introduction" zh="引言">
        <p className="muted">本小节概念：<C id="instanton" /></p>
        <Tx>{R`考虑定义在四维 Euclid 空间 $\mathbb{R}^4$ 上的 SU(2) 规范理论。作用量为`}</Tx>
        <Eq n="1.290" title="Euclid Yang–Mills 作用量" say={R`Euclid Yang–Mills 作用量：反 Hermite 场强平方的迹为负，前面的负号使作用量非负。`}>{R`S=\int\dd^4x\,\mathcal{L}(x)=\int\dd^4x\,[-\tfrac12\Tr\,\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu}]`}</Eq>
        <Tx>{R`其中场强为`}</Tx>
        <Eq n="1.291" say={R`SU(2) 场强，与 \eqref{1.264} 相同。`}>{R`\mathcal{F}_{\mu\nu}=\partial_\mu\mathcal{A}_\nu-\partial_\nu\mathcal{A}_\mu+g[\mathcal{A}_\mu,\mathcal{A}_\nu]`}</Eq>
        <Tx>{R`而

$$\mathcal{A}_\mu\equiv A_\mu{}^\alpha\frac{\sigma_\alpha}{2\mathrm{i}}\qquad\mathcal{F}_{\mu\nu}\equiv F_{\mu\nu}{}^\alpha\frac{\sigma_\alpha}{2\mathrm{i}}$$

（$\sigma_\alpha$ 为 Pauli 矩阵，$\sigma_\alpha/2\mathrm{i}$ 是反 Hermite 的，$\Tr(\tfrac{\sigma_\alpha}{2\mathrm{i}}\tfrac{\sigma_\beta}{2\mathrm{i}})=-\tfrac12\delta_{\alpha\beta}$）。场方程为`}</Tx>
        <Eq n="1.292" say={R`Euclid Yang–Mills 方程。`}>{R`\mathcal{D}_\mu\mathcal{F}_{\mu\nu}=\partial_\mu\mathcal{F}_{\mu\nu}+g[\mathcal{A}_\mu,\mathcal{F}_{\mu\nu}]=0.`}</Eq>
        <Tx>{R`在路径积分中只有作用量有限的场位形有贡献。设 $\mathcal{A}_\mu$ 满足（以下取 $g=1$；一般情形把 $\mathcal{A}$ 换成 $g\mathcal{A}$ 即可）`}</Tx>
        <Eq n="1.293" title="无穷远处的纯规范" say={R`有限作用量要求场强在无穷远处足够快地衰减，于是规范势趋于纯规范 $U^{-1}\partial U$：一个从 $S^3$（无穷远球面）到 SU(2) 的映射。`}>{R`\mathcal{A}_\mu\to U(x)^{-1}\partial_\mu U(x)\qquad\text{当 }|x|\to\infty`}</Eq>
        <Tx>{R`其中 $U(x)$ 是 SU(2) 的元素。容易看出对 \eqref{1.293} 的 $\mathcal{A}_\mu$，$\mathcal{F}_{\mu\nu}$ 为零（$\partial_\mu(U^{-1}\partial_\nu U)-\partial_\nu(U^{-1}\partial_\mu U)=-[U^{-1}\partial_\mu U,U^{-1}\partial_\nu U]$，恰好抵消对易子项）。我们要求在大半径的球面 $S^3$ 上规范势由 \eqref{1.293} 给出。

后面将证明，这种位形由 $S^3$ 映到规范群 SU(2) 的方式来刻画。非平凡的位形是那些不能连续形变为均匀位形的位形；它们由 Belavin 等人（1975）提出，称为**瞬子**。`}</Tx>
        <Box kind="warning" title={R`勘误：\eqref{1.293}、\eqref{1.300}、\eqref{1.304} 中多余的 $\mathrm{i}$`}>{R`原书把纯规范写作 $\mathcal{A}_\mu\to\mathrm{i}U^{-1}\partial_\mu U$，瞬子拟设写作 $\mathcal{A}_\mu=\mathrm{i}f(r)U^{-1}\partial_\mu U$。但原书自己约定 $\mathcal{A}_\mu=A_\mu{}^\alpha\sigma_\alpha/2\mathrm{i}$ 是**反 Hermite**的，而 $U^{-1}\partial_\mu U$ 已经是反 Hermite 的（$\mathfrak{su}(2)$ 值），乘 $\mathrm{i}$ 后变成 Hermite 的；而且 $\mathcal{A}=\mathrm{i}U^{-1}\partial U$ 的场强并不为零。在 $g=1$、反 Hermite 约定下，纯规范是 $U^{-1}\partial_\mu U$（与 \eqref{1.262} 一致）。本站去掉了这三处的 $\mathrm{i}$；下面的交互图在浏览器中数值验证：去掉 $\mathrm{i}$ 后 BPST 解精确自对偶、$S=8\pi^2$、$Q=1$；保留 $\mathrm{i}$ 则既不自对偶也不满足这些值。`}</Box>
      </Sub>

      <Sub n="1.10.2" title="The (anti-)self-dual solution" zh="（反）自对偶解">
        <p className="muted">本小节概念：<C id="instanton" /></p>
        <Tx>{R`一般而言，解二阶微分方程比解一阶的困难。如果能用一个等价的一阶方程代替二阶方程就好了。考虑不等式（反 Hermite 矩阵 $X$ 满足 $-\Tr X^2\ge0$）`}</Tx>
        <Eq n="1.294" say={R`一个显然的不等式：反 Hermite 矩阵平方的迹非正，所以加负号后积分非负。`}>{R`-\int\dd^4x\,\Tr\,(\mathcal{F}_{\mu\nu}\pm*\mathcal{F}_{\mu\nu})^2\ge0.`}</Eq>
        <Tx>{R`显然，当`}</Tx>
        <Eq n="1.295" title="（反）自对偶方程" say={R`自对偶（取 +）或反自对偶（取 −）：场强等于自己的 Hodge 对偶——一阶方程。`}>{R`\mathcal{F}_{\mu\nu}=\pm*\mathcal{F}_{\mu\nu}`}</Eq>
        <Tx>{R`时 \eqref{1.294} 取等号。取正号时称 $\mathcal{F}$ **自对偶**（self-dual），取负号时称**反自对偶**（anti-self-dual）。若 \eqref{1.295} 成立，场方程自动满足，因为`}</Tx>
        <Eq n="1.296" say={R`自对偶场自动满足场方程：场方程变成了 Bianchi 恒等式。`}>{R`\mathcal{D}_\mu\mathcal{F}_{\mu\nu}=\pm\mathcal{D}_\mu*\mathcal{F}_{\mu\nu}=0\qquad\text{（Bianchi 恒等式）}.`}</Eq>
        <Tx>{R`如 §10.5 将证明的，积分`}</Tx>
        <Eq n="1.297" title="瞬子数" say={R`瞬子数（第二 Chern 数）：$\Tr\mathcal{F}*\mathcal{F}$ 的积分是整数，刻画 $S^3\to\mathrm{SU}(2)$ 的绕数。`}>{R`Q\equiv\frac{-1}{16\pi^2}\int\dd^4x\,\Tr\,\mathcal{F}_{\mu\nu}*\mathcal{F}^{\mu\nu}`}</Eq>
        <Tx>{R`是刻画 $S^3$ 映到 SU(2) 的方式的整数。若 $\mathcal{F}$ 自对偶，则 $Q$ 为正；若反自对偶，则 $Q$ 为负。由 \eqref{1.294} 得（注意 $*\mathcal{F}_{\mu\nu}*\mathcal{F}^{\mu\nu}=\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu}$）`}</Tx>
        <Eq n="1.298" say={R`展开平方：场强平方项两份，交叉项是瞬子数密度。`}>{R`-\int\dd^4x\,\Tr\,(2\mathcal{F}_{\mu\nu}\mathcal{F}^{\mu\nu}\pm2\mathcal{F}_{\mu\nu}*\mathcal{F}^{\mu\nu})\ge0.`}</Eq>
        <Tx>{R`由这个不等式与作用量的定义得到`}</Tx>
        <Eq n="1.299" keyEq title="Bogomolny 下界" say={R`作用量的拓扑下界：瞬子数为 $Q$ 的位形，作用量至少为 $8\pi^2|Q|$，（反）自对偶解恰好达到。`}>{R`S\ge8\pi^2|Q|`}</Eq>
        <Tx>{R`（\eqref{1.298} 即 $4S\pm32\pi^2Q\ge0$——因为 $-\int\Tr\mathcal{F}\mathcal{F}=2S$、$\int\Tr\mathcal{F}*\mathcal{F}=-16\pi^2Q$——所以对两种符号都有 $S\ge\mp8\pi^2Q$。）在 \eqref{1.295} 时取等号：自对偶时 $S=8\pi^2Q$，故 $Q>0$。

我们专注于自对偶解 $\mathcal{F}=*\mathcal{F}$，寻找如下形式的瞬子解：`}</Tx>
        <Eq n="1.300" say={R`瞬子拟设：纯规范乘以径向函数 $f(r)$，$f\to1$ 时回到 \eqref{1.293}。`}>{R`\mathcal{A}_\mu=f(r)U(x)^{-1}\partial_\mu U(x)`}</Eq>
        <Tx>{R`其中 $r\equiv|x|$，且`}</Tx>
        <Eq n="1.301a" say={R`边界条件：无穷远处趋于纯规范。`}>{R`f(r)\to1\qquad\text{当 }r\to\infty`}</Eq>
        <Eq n="1.301b" title={R`$S^3\to\mathrm{SU}(2)$ 的恒等映射`} say={R`把 $\mathbb{R}^4$ 中的单位向量看成单位四元数，即 SU(2) 元素：这是 $S^3\to\mathrm{SU}(2)$ 的绕数为 1 的映射。`}>{R`U(x)=\frac1r(x_4-\mathrm{i}x_i\sigma_i).`}</Eq>
        <Tx>{R`把 \eqref{1.300} 代入 \eqref{1.295}，得 $f$ 满足`}</Tx>
        <Eq n="1.302" say={R`自对偶条件化成关于 $f$ 的一阶常微分方程（Riccati 型）。`}>{R`r\frac{\dd f(r)}{\dd r}=2f(1-f).`}</Eq>
        <Tx>{R`满足边界条件 \eqref{1.301a} 的解为（分离变量：$\dd f/[f(1-f)]=2\,\dd r/r$，$\log\tfrac{f}{1-f}=\log\tfrac{r^2}{\lambda^2}$）`}</Tx>
        <Eq n="1.303" title="BPST 轮廓" say={R`BPST 瞬子的径向轮廓：在半径 $\lambda$ 附近从 0 过渡到 1；$\lambda$ 是瞬子的大小，可以任意。`}>{R`f(r)=\frac{r^2}{r^2+\lambda^2}`}</Eq>
        <Tx>{R`其中 $\lambda$ 是确定瞬子大小的参数。代入 \eqref{1.300}：`}</Tx>
        <Eq n="1.304" say={R`BPST 瞬子的规范势。`}>{R`\mathcal{A}_\mu(x)=\frac{r^2}{r^2+\lambda^2}U(x)^{-1}\partial_\mu U(x)`}</Eq>
        <Tx>{R`对应的场强为`}</Tx>
        <Eq n="1.305" title="BPST 场强" say={R`BPST 瞬子的场强：集中在半径 $\lambda$ 的区域内，按 $r^{-4}$ 衰减；作用量密度 $48\lambda^4/(r^2+\lambda^2)^4$。`}>{R`\mathcal{F}_{\mu\nu}(x)=\frac{4\mathrm{i}\lambda^2}{(r^2+\lambda^2)^2}\sigma_{\mu\nu}`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="1.306" say={R`自对偶的 Pauli 矩阵组合（'t Hooft 符号）：空间–空间分量与空间–时间分量。`}>{R`\sigma_{ij}\equiv\frac{1}{4\mathrm{i}}[\sigma_i,\sigma_j]\qquad\sigma_{i4}\equiv\frac12\sigma_i=-\sigma_{4i}.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{1.305}`}>{R`原书 \eqref{1.305} 印作 $\mathcal{F}_{\mu\nu}=\dfrac{4\lambda^2}{r^2+\lambda^2}\sigma_{\mu\nu}$。(1) 量纲：$\mathcal{F}$ 的量纲是 [长度]$^{-2}$，而 $4\lambda^2/(r^2+\lambda^2)$ 无量纲，分母应为 $(r^2+\lambda^2)^2$；否则 $r\to\infty$ 时 $\mathcal{F}\to$ 常数 $\times\lambda^2/r^2$，作用量 $\int r^3\dd r\,r^{-4}$ 对数发散。(2) 在反 Hermite 约定下 $\sigma_{\mu\nu}$（Hermite）前还需一个 $\mathrm{i}$。原书 \eqref{1.306} 用指标 0，这里与 \eqref{1.301b} 的 $x_4$ 一致写作 4。改正后的形式由下面的交互图在任意点上数值核对（误差 $\sim10^{-8}$）。`}</Box>
        <Tx>{R`这个解给出 $Q=+1$ 与 $S=8\pi^2$。验证：作用量密度 $-\tfrac12\Tr\mathcal{F}_{\mu\nu}\mathcal{F}_{\mu\nu}=48\lambda^4/(r^2+\lambda^2)^4$，

$$S=2\pi^2\int_0^\infty r^3\dd r\,\frac{48\lambda^4}{(r^2+\lambda^2)^4}=2\pi^2\cdot48\cdot\frac{1}{12}=8\pi^2,$$

（$2\pi^2$ 是单位 $S^3$ 的面积，$\int_0^\infty u^3\dd u/(u^2+1)^4=1/12$），而自对偶给出 $Q=S/8\pi^2=1$，与 $U$ 的绕数一致。`}</Tx>
        <InstantonLab />
      </Sub>
    </Sec>);
}
