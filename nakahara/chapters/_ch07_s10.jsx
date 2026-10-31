// §7.10 广义相对论的几个方面 —— 式 (7.200)–(7.229a′)，命题 7.2，习题 7.24–7.25
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, C } from "@kit";

const R = String.raw;

export function Sec710() {
  return (
    <Sec n="7.10" title="Aspects of general relativity" zh="广义相对论的几个方面"
      gist={R`广义相对论的两条原理 → Einstein 方程 $G_{\mu\nu}=8\pi GT_{\mu\nu}$ 推广 Poisson 方程 → 度规量的变分与 Palatini 恒等式（\sref{P7.2}）→ Einstein–Hilbert 作用量 $\frac1{16\pi G}\int\mathcal R\sqrt{-g}$ 的变分给出 $G_{\mu\nu}=0$，加上物质给出 $G_{\mu\nu}=8\pi GT_{\mu\nu}$ → 弯曲时空中的旋量：用 vierbein 与自旋联络 $\Omega_\mu=\frac12\mathrm{i}\Gamma^\alpha{}_\mu{}^\beta\Sigma_{\alpha\beta}$ 构造局部 Lorentz 协变的 Dirac 作用量。`}
      why={R`本章的工具在这里汇合成一个物理理论：度规是引力势，曲率是引力场强，测地线是自由下落，Bianchi 恒等式保证能动量守恒；而旋量逼迫我们使用 §7.8 的正交标架。`}
      gives={["7.200", "7.202", "7.204", "7.205", "7.206", "7.207", "7.211", "7.214", "7.221", "7.227", "7.229a"]}>
      <p className="muted">本节概念：<C id="einstein" /></p>
      <Sub n="7.10.1" title="Introduction to general relativity" zh="广义相对论导引">
        <Tx>{R`广义相对论是经典物理中最优美、最成功的理论之一。理论与天体物理、宇宙学观测——太阳系检验、脉冲双星的引力辐射、引力红移、（当时）新发现的引力透镜效应等——没有矛盾。不熟悉广义相对论的读者可参考 Berry（1989）或 Price（1982）的入门文章。

Einstein 提出以下原理来构造广义相对论：

(I) **广义相对性原理**：物理定律在任何坐标系中取相同的形式。
(II) **等效原理**：存在一个坐标系，使引力场的效应在局部消失。（自由下落的电梯里的观者在电梯撞地之前感觉不到重力。）——数学上就是正规坐标 \eqref{7.75}。

任何引力理论在弱场极限下都必须回到 Newton 引力理论。在 Newton 理论中，引力势 $\Phi$ 满足 Poisson 方程`}</Tx>
        <Eq n="7.200" say={R`Newton 引力：势的 Laplace（这里是 $\nabla^2$）正比于质量密度。`}>{R`\Delta\Phi=4\pi G\rho`}</Eq>
        <Tx>{R`其中 $\rho$ 是质量密度。（这里 $\Delta$ 是物理中通常的 $\nabla^2$，与 \eqref{7.188} 差一个符号。）Einstein 方程推广了这一经典结果，使广义相对性原理得以满足。

在广义相对论中，引力势换成度规张量的分量。于是 \eqref{7.200} 的左边换成 **Einstein 张量**`}</Tx>
        <Eq n="7.201" say={R`Einstein 张量，与 \eqref{7.86} 相同（指标降下）。`}>{R`G_{\mu\nu}\equiv \sym{Ric}{\mathit{Ric}}_{\mu\nu}-\tfrac12g_{\mu\nu}\mathcal R.`}</Eq>
        <Tx>{R`同样，质量密度换成更一般的对象——**能动张量** $T_{\mu\nu}$。**Einstein 方程**取与 \eqref{7.200} 非常相似的形式：`}</Tx>
        <Eq n="7.202" title="Einstein 方程" say={R`物质告诉时空怎样弯曲：曲率（Einstein 张量）正比于能动张量。`}>{R`G_{\mu\nu}=8\pi GT_{\mu\nu}.`}</Eq>
        <Tx>{R`常数 $8\pi G$ 的选取使 \eqref{7.202} 在弱场极限下重现 Newton 的结果（习题 7.24）。张量 $T_{\mu\nu}$ 由物质作用量通过变分原理得到。由 Noether 定理，$T_{\mu\nu}$ 必须满足形如 $\nabla_\mu T^{\mu\nu}=0$ 的守恒方程。$G_{\mu\nu}$ 也满足类似的守恒律（\eqref{7.85}；$\sym{Ric}{\mathit{Ric}}_{\mu\nu}$ 不满足）。下一小节将看到，\eqref{7.202} 的左边也可以由变分原理得到。`}</Tx>
        <Exercise n="7.24" title="Newton 极限" level="★★"
          hint={R`保留 $\Phi/c^2$ 的一阶。用迹反转形式 $\sym{Ric}{\mathit{Ric}}_{\mu\nu}=\frac{8\pi G}{c^4}(T_{\mu\nu}-\frac12g_{\mu\nu}T)$（恢复 $c$ 后 $G_{\mu\nu}=\frac{8\pi G}{c^4}T_{\mu\nu}$），只需算 $\sym{Ric}{\mathit{Ric}}_{00}$。`}
          solution={R`取 $x^0=ct$，静态场。恢复光速后 Einstein 方程为 $G_{\mu\nu}=\frac{8\pi G}{c^4}T_{\mu\nu}$。取迹：$-\mathcal R=\frac{8\pi G}{c^4}T$（四维中 $g^{\mu\nu}G_{\mu\nu}=\mathcal R-2\mathcal R$），于是

$$\sym{Ric}{\mathit{Ric}}_{\mu\nu}=\frac{8\pi G}{c^4}\Big(T_{\mu\nu}-\frac12g_{\mu\nu}T\Big).$$

尘埃：$T=g^{00}T_{00}=-\rho c^2$（一阶近似），$\sym{Ric}{\mathit{Ric}}_{00}=\frac{8\pi G}{c^4}\big(\rho c^2-\frac12\rho c^2\big)=\frac{4\pi G\rho}{c^2}$。

另一方面，度规只有 $g_{00}=-1-2\Phi/c^2$ 偏离平直，且不依赖时间。一阶的 Christoffel 符号只有 $\Gamma^i{}_{00}=-\frac12\partial_ig_{00}=\partial_i\Phi/c^2$ 与 $\Gamma^0{}_{0i}=\partial_i\Phi/c^2$；由 \eqref{7.42}，

$$\sym{Ric}{\mathit{Ric}}_{00}=R^\lambda{}_{0\lambda0}=\partial_i\Gamma^i{}_{00}-\partial_0\Gamma^\lambda{}_{\lambda0}+O(\Gamma^2)=\frac{\nabla^2\Phi}{c^2}.$$

两式相等：$\nabla^2\Phi=4\pi G\rho$，即 Poisson 方程 \eqref{7.200}。（同时，测地线方程 $\ddot x^i=-c^2\Gamma^i{}_{00}=-\partial_i\Phi$ 就是 Newton 的引力加速度。）"弱场"指 $|\Phi|/c^2\ll1$，例如地表 $\sim7\times10^{-10}$。`}>
          {R`考虑度规

$$g_{00}=-1-\frac{2\Phi}{c^2}\qquad g_{0i}=0\qquad g_{ij}=\delta_{ij}\qquad1\le i,j\le3$$

与 $T_{00}=\rho c^2$、$T_{0i}=T_{ij}=0$（静止的尘埃）。证明在弱场极限（$\Phi/c^2\ll1$）下 \eqref{7.202} 化为 Poisson 方程。`}
        </Exercise>
      </Sub>

      <Sub n="7.10.2" title="Einstein–Hilbert action" zh="Einstein–Hilbert 作用量">
        <Tx>{R`本小节与下一小节的例子取自 Weinberg（1972）。广义相对论描述几何的动力学，即 $g_{\mu\nu}$ 的动力学。这个理论的作用量原理是什么？照例要求相关的作用量是标量。此外它应含 $g_{\mu\nu}$ 的导数：$\int\sqrt{|g|}\dd^mx$ 不能描述度规的动力学。最简单的猜测是 $S_{\rm EH}\propto\int\mathcal R\sqrt{|g|}\dd^mx$。由于 $\mathcal R$ 是标量，$\sqrt{|g|}\dd x^1\dd x^2\ldots\dd x^m$ 是不变体积元，$S_{\rm EH}$ 是标量。下面证明 $S_{\rm EH}$ 对度规变分确实给出 Einstein 方程。联络限定为 Levi-Civita 联络。先证明一个技术性的命题。`}</Tx>
        <Stmt id="P7.2">
          <Proof steps={[
            { claim: R`(a) 由 $g_{\kappa\lambda}g^{\lambda\nu}=\delta_\kappa{}^\nu$ 得 $0=\delta(g_{\kappa\lambda}g^{\lambda\nu})=\delta g_{\kappa\lambda}g^{\lambda\nu}+g_{\kappa\lambda}\delta g^{\lambda\nu}$。乘 $g^{\mu\kappa}$ 得 $\delta g^{\mu\nu}=-g^{\mu\kappa}g^{\lambda\nu}\delta g_{\kappa\lambda}$。` },
            { claim: R`(b) 先注意矩阵恒等式 $\ln(\det g_{\mu\nu})=\Tr(\ln g_{\mu\nu})$（把 $g_{\mu\nu}$ 对角化即可证明）。在变分 $\delta g_{\mu\nu}$ 下，左边变为 $\delta g\cdot g^{-1}$，右边变为 $g^{\mu\nu}\cdot\delta g_{\mu\nu}$，所以 $\delta g=gg^{\mu\nu}\delta g_{\mu\nu}$。`, tex: R`\delta\sqrt{|g|}=\frac{\delta|g|}{2\sqrt{|g|}}=\frac{|g|g^{\mu\nu}\delta g_{\mu\nu}}{2\sqrt{|g|}}=\tfrac12\sqrt{|g|}g^{\mu\nu}\delta g_{\mu\nu}`, why: R`$\delta\Tr\ln g=\Tr(g^{-1}\delta g)$；$|g|=\pm g$ 的符号在变分下不变。` },
            { claim: R`(c) 设 $\Gamma$ 与 $\widetilde\Gamma$ 是两个联络，差 $\delta\Gamma\equiv\widetilde\Gamma-\Gamma$ 是 $(1,2)$ 型张量（习题 7.5）。取 $\widetilde\Gamma$ 为 $g+\delta g$ 的联络，$\Gamma$ 为 $g$ 的联络。在 $g$ 的正规坐标系中工作，那里（在所考虑的点）$\Gamma\equiv0$（当然一般 $\partial\Gamma\neq0$），见 \eqref{7.75}。`, uses: ["7.75"] },
            { claim: R`由 \eqref{7.42}，$\sym{Ric}{\mathit{Ric}}_{\mu\nu}=\partial_\kappa\Gamma^\kappa{}_{\nu\mu}-\partial_\nu\Gamma^\kappa{}_{\kappa\mu}+\Gamma\Gamma$。变分时 $\delta(\Gamma\Gamma)=\delta\Gamma\cdot\Gamma+\Gamma\cdot\delta\Gamma=0$（$\Gamma=0$），所以`, tex: R`\delta \sym{Ric}{\mathit{Ric}}_{\mu\nu}=\partial_\kappa\delta\Gamma^\kappa{}_{\nu\mu}-\partial_\nu\delta\Gamma^\kappa{}_{\kappa\mu}=\nabla_\kappa\delta\Gamma^\kappa{}_{\nu\mu}-\nabla_\nu\delta\Gamma^\kappa{}_{\kappa\mu}`, why: R`第二个等号（原书请读者验证）：$\delta\Gamma$ 是张量，其协变导数 \eqref{7.26} 中的 $\Gamma$ 项在 $\Gamma=0$ 处都消失，所以 $\nabla=\partial$。原书此处第二项印作 $\nabla_\nu\Gamma^\kappa{}_{\kappa\mu}$，漏了 $\delta$。`, uses: ["7.26", "7.42"], fill: true },
            { claim: R`两边都是张量，所以这个等式在任何坐标系中都成立。` },
          ]} />
        </Stmt>
        <Eq n="7.203" say={R`逆度规的变分：用两个逆度规把 $\delta g_{\kappa\lambda}$ 的指标"翻上去"，再加负号。`}>{R`\text{(a)}\quad\delta g^{\mu\nu}=-g^{\mu\kappa}g^{\lambda\nu}\delta g_{\kappa\lambda}`}</Eq>
        <Eq n="7.204" title="行列式的变分" say={R`度规行列式的变分是它乘以 $g^{\mu\nu}\delta g_{\mu\nu}$：体积元对度规的"迹"变化敏感。`}>{R`\text{(b)}\quad\delta g=gg^{\mu\nu}\delta g_{\mu\nu},\qquad\delta\sqrt{|g|}=\tfrac12\sqrt{|g|}g^{\mu\nu}\delta g_{\mu\nu}`}</Eq>
        <Eq n="7.205" title="Palatini 恒等式" say={R`Ricci 张量的变分是联络变分（一个张量）的协变散度之差：缩并后成为全散度，不影响运动方程。`}>{R`\text{(c)}\quad\delta \sym{Ric}{\mathit{Ric}}_{\mu\nu}=\nabla_\kappa\delta\Gamma^\kappa{}_{\nu\mu}-\nabla_\nu\delta\Gamma^\kappa{}_{\kappa\mu}\qquad(\text{Palatini 恒等式}).`}</Eq>
        <Tx>{R`定义 **Einstein–Hilbert 作用量**`}</Tx>
        <Eq n="7.206" title="Einstein–Hilbert 作用量" say={R`引力的作用量：标量曲率在时空上的不变积分——最简单的、含度规导数的标量。`}>{R`S_{\rm EH}\equiv\frac1{16\pi G}\int\mathcal R\sqrt{-g}\,\dd^4x.`}</Eq>
        <Tx>{R`常数因子 $1/16\pi G$ 是为了在加入物质时重现 Newton 极限，见 \eqref{7.214}。我们证明 $\delta S_{\rm EH}=0$ 给出真空 Einstein 方程。在变分 $g\to g+\delta g$（$|x|\to\infty$ 时 $\delta g\to0$）下，被积函数的改变为

$$\begin{aligned}\delta(\mathcal R\sqrt{-g})&=\delta(g^{\mu\nu}\sym{Ric}{\mathit{Ric}}_{\mu\nu}\sqrt{-g})\\&=\delta g^{\mu\nu}\sym{Ric}{\mathit{Ric}}_{\mu\nu}\sqrt{-g}+g^{\mu\nu}\delta \sym{Ric}{\mathit{Ric}}_{\mu\nu}\sqrt{-g}+\mathcal R\,\delta(\sqrt{-g})\\&=-g^{\mu\kappa}g^{\lambda\nu}\delta g_{\kappa\lambda}\sym{Ric}{\mathit{Ric}}_{\mu\nu}\sqrt{-g}+g^{\mu\nu}(\nabla_\kappa\delta\Gamma^\kappa{}_{\nu\mu}-\nabla_\nu\delta\Gamma^\kappa{}_{\kappa\mu})\sqrt{-g}+\tfrac12\mathcal R\sqrt{-g}g^{\mu\nu}\delta g_{\mu\nu}.\end{aligned}$$

注意第二项是全散度：

$$\nabla_\kappa(g^{\mu\nu}\delta\Gamma^\kappa{}_{\nu\mu}\sqrt{-g})-\nabla_\nu(g^{\mu\nu}\delta\Gamma^\kappa{}_{\kappa\mu}\sqrt{-g})=\partial_\kappa(g^{\mu\nu}\delta\Gamma^\kappa{}_{\mu\nu}\sqrt{-g})-\partial_\nu(g^{\mu\nu}\delta\Gamma^\kappa{}_{\kappa\mu}\sqrt{-g})$$

［$\nabla g=0$；对向量密度 $V^\kappa\sqrt{-g}$，$\nabla_\kappa(V^\kappa\sqrt{-g})=\partial_\kappa(V^\kappa\sqrt{-g})$，因为 $\Gamma^\kappa{}_{\kappa\lambda}=\partial_\lambda\ln\sqrt{|g|}$。］所以不贡献变分（边界上 $\delta g=0$）。由其余各项得`}</Tx>
        <Eq n="7.207" title="作用量的变分" say={R`Einstein–Hilbert 作用量对度规的"梯度"正是（负的）Einstein 张量。`}>{R`\delta S_{\rm EH}=\frac1{16\pi G}\int\Big(-\sym{Ric}{\mathit{Ric}}^{\mu\nu}+\frac12\mathcal Rg^{\mu\nu}\Big)\delta g_{\mu\nu}\sqrt{-g}\,\dd^4x.`}</Eq>
        <Tx>{R`若要求对任意变分 $\delta g$ 都有 $\delta S_{\rm EH}=0$，就得到真空 Einstein 方程`}</Tx>
        <Eq n="7.208" say={R`真空 Einstein 方程；在四维中等价于 $\sym{Ric}{\mathit{Ric}}_{\mu\nu}=0$（取迹得 $\mathcal R=0$）。`}>{R`G_{\mu\nu}=\sym{Ric}{\mathit{Ric}}_{\mu\nu}-\tfrac12g_{\mu\nu}\mathcal R=0`}</Eq>
        <Tx>{R`其中对称张量 $G$ 称为 **Einstein 张量**。（习题 7.10(c) 已验证 Schwarzschild 度规满足它。）

到目前为止只考虑了引力场。设存在由作用量`}</Tx>
        <Eq n="7.209" say={R`物质作用量：拉氏密度在弯曲时空中的不变积分。`}>{R`S_{\rm M}\equiv\int\mathcal L(\phi)\sqrt{-g}\,\dd^4x`}</Eq>
        <Tx>{R`描述的物质，$\mathcal L(\phi)$ 是理论的拉氏密度。典型的例子是实标量场与 Maxwell 场：`}</Tx>
        <Eq n="7.210a" say={R`实标量场的作用量（度规符号 $(-,+,+,+)$，动能项前为负号）。`}>{R`S_{\rm S}\equiv-\tfrac12\int[g^{\mu\nu}\partial_\mu\phi\partial_\nu\phi+m^2\phi^2]\sqrt{-g}\,\dd^4x`}</Eq>
        <Eq n="7.210b" say={R`Maxwell 场的作用量。`}>{R`S_{\rm ED}\equiv-\tfrac14\int F_{\mu\nu}F^{\mu\nu}\sqrt{-g}\,\dd^4x`}</Eq>
        <Tx>{R`其中 $F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu=\nabla_\mu A_\nu-\nabla_\nu A_\mu$（无挠时 $\Gamma$ 项相消，参看 \eqref{7.55}）。若物质作用量在 $\delta g$ 下改变 $\delta S_{\rm M}$，**能动张量** $T^{\mu\nu}$ 由下式定义：`}</Tx>
        <Eq n="7.211" title="能动张量的定义" say={R`能动张量是物质作用量对度规的响应：时空几何怎样"推"物质，物质就以同样的方式"推"几何。`}>{R`\delta S_{\rm M}=\tfrac12\int T^{\mu\nu}\delta g_{\mu\nu}\sqrt{-g}\,\dd^4x.`}</Eq>
        <Tx>{R`由于 $\delta g_{\mu\nu}$ 对称，$T^{\mu\nu}$ 也取为对称的。例如实标量场的 $T_{\mu\nu}$ 为`}</Tx>
        <Eq n="7.212" say={R`标量场的能动张量；$T_{00}=\frac12(\dot\phi^2+(\nabla\phi)^2+m^2\phi^2)$ 是正定的能量密度。`}>{R`\begin{aligned}T_{\mu\nu}(x)&=-2\frac1{\sqrt{-g}}\frac{\delta}{\delta g^{\mu\nu}(x)}S_{\rm S}\\&=\partial_\mu\phi\partial_\nu\phi-\tfrac12g_{\mu\nu}(g^{\kappa\lambda}\partial_\kappa\phi\partial_\lambda\phi+m^2\phi^2).\end{aligned}`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{7.212} 第一行的符号（p.320）`}>{R`原书印作 $T_{\mu\nu}=+2\frac1{\sqrt{-g}}\frac{\delta S_{\rm S}}{\delta g^{\mu\nu}}$。由定义 \eqref{7.211}（对**下**指标 $\delta g_{\mu\nu}$），$T^{\mu\nu}=\frac2{\sqrt{-g}}\frac{\delta S}{\delta g_{\mu\nu}}$；换成对**上**指标变分，由 \eqref{7.203}，$\delta g_{\mu\nu}=-g_{\mu\kappa}g_{\nu\lambda}\delta g^{\kappa\lambda}$，得 $T_{\mu\nu}=-\frac2{\sqrt{-g}}\frac{\delta S}{\delta g^{\mu\nu}}$。直接验证：$\frac{\delta S_{\rm S}}{\delta g^{\mu\nu}}=-\frac12\sqrt{-g}\big[\partial_\mu\phi\partial_\nu\phi-\frac12g_{\mu\nu}(g^{\kappa\lambda}\partial_\kappa\phi\partial_\lambda\phi+m^2\phi^2)\big]$（用 $\delta\sqrt{-g}=-\frac12\sqrt{-g}g_{\mu\nu}\delta g^{\mu\nu}$），所以只有带负号的定义才给出第二行（以及正的能量密度）。第二行与 \eqref{7.214} 原书正确。正文已改正。`}</Box>
        <Tx>{R`设引力场与作用量为 $S_{\rm M}$ 的物质场耦合。现在作用量原理为`}</Tx>
        <Eq n="7.213" say={R`引力加物质的总作用量取极值。`}>{R`\delta(S_{\rm EH}+S_{\rm M})=0`}</Eq>
        <Tx>{R`（在 $g\to g+\delta g$ 下）。由 \eqref{7.207} 与 \eqref{7.211}，被积函数 $\big[\frac1{16\pi G}(-\sym{Ric}{\mathit{Ric}}^{\mu\nu}+\frac12\mathcal Rg^{\mu\nu})+\frac12T^{\mu\nu}\big]\delta g_{\mu\nu}$ 对任意 $\delta g$ 积分为零，得 **Einstein 方程**`}</Tx>
        <Eq n="7.214" keyEq title="Einstein 方程（由变分）" say={R`由作用量原理推出的 Einstein 方程；系数 $1/16\pi G$ 正是为了让右边是 $8\pi GT$。`}>{R`G_{\mu\nu}=8\pi GT_{\mu\nu}.`}</Eq>
        <Exercise n="7.25" title="宇宙学常数" level="★"
          hint={R`$\delta(\Lambda\sqrt{-g})=\frac12\Lambda\sqrt{-g}g^{\mu\nu}\delta g_{\mu\nu}$。`}
          solution={R`$\Lambda$ 项的变分由 \eqref{7.204}：$\delta\int\Lambda\sqrt{-g}\,\dd^4x=\frac12\int\Lambda g^{\mu\nu}\delta g_{\mu\nu}\sqrt{-g}\,\dd^4x$。与 \eqref{7.207} 相加：

$$\delta\widetilde S_{\rm EH}=\frac1{16\pi G}\int\Big(-\sym{Ric}{\mathit{Ric}}^{\mu\nu}+\frac12\mathcal Rg^{\mu\nu}+\frac12\Lambda g^{\mu\nu}\Big)\delta g_{\mu\nu}\sqrt{-g}\,\dd^4x,$$

真空方程为

$$\sym{Ric}{\mathit{Ric}}_{\mu\nu}-\frac12g_{\mu\nu}\mathcal R-\frac12\Lambda g_{\mu\nu}=0.$$

（按本题的写法 $\mathcal R+\Lambda$，$\Lambda>0$ 对应负的真空能；常见约定写作 $\mathcal R-2\Lambda$，得 $G_{\mu\nu}+\Lambda g_{\mu\nu}=0$，两者相差 $\Lambda\to-2\Lambda$。）取迹（四维）：$-\mathcal R-2\Lambda=0$，于是 $\sym{Ric}{\mathit{Ric}}_{\mu\nu}=-\frac12\Lambda g_{\mu\nu}$：真空解是 Einstein 空间。$\mathcal R^2$、$\sym{Ric}{\mathit{Ric}}^{\mu\nu}\sym{Ric}{\mathit{Ric}}_{\mu\nu}$、$R_{\kappa\lambda\mu\nu}R^{\kappa\lambda\mu\nu}$ 这类项含度规的四阶导数，给出高阶引力理论；四维中 Gauss–Bonnet 组合 $\mathcal R^2-4\sym{Ric}{\mathit{Ric}}^2+R_{\kappa\lambda\mu\nu}^2$ 的积分是拓扑不变量（第 11 章的 Euler 类），不影响运动方程。`}>
          {R`可以在标量曲率上加一个额外的标量而不破坏作用量的不变性。例如可以加一个常数，称为**宇宙学常数** $\Lambda$：`}
        </Exercise>
        <Eq n="7.215" say={R`带宇宙学常数的引力作用量：真空本身具有能量。`}>{R`\widetilde S_{\rm EH}=\frac1{16\pi G}\int_M(\mathcal R+\Lambda)\sqrt{-g}\,\dd^4x.`}</Eq>
        <Tx>{R`写出真空 Einstein 方程。其他可能的标量还有 $\mathcal R^2$、$\sym{Ric}{\mathit{Ric}}^{\mu\nu}\sym{Ric}{\mathit{Ric}}_{\mu\nu}$ 或 $R_{\kappa\lambda\mu\nu}R^{\kappa\lambda\mu\nu}$ 等项。`}</Tx>
      </Sub>

      <Sub n="7.10.3" title="Spinors in curved spacetime" zh="弯曲时空中的旋量">
        <Tx>{R`为具体起见，考虑四维 Lorentz 流形 $M$ 上的 Dirac 旋量 $\psi$。由`}</Tx>
        <Eq n="7.216" say={R`vierbein 把弯曲时空的度规化成局部的 Minkowski 度规。`}>{R`g_{\mu\nu}=e^\alpha{}_\mu e^\beta{}_\nu\eta_{\alpha\beta}`}</Eq>
        <Tx>{R`定义的 vierbein $e^\alpha{}_\mu$ 在每点 $p\in M$ 定义一个正交标架 $\{\hat\theta^\alpha=e^\alpha{}_\mu\dd x^\mu\}$。如前所述，$\alpha,\beta,\gamma,\ldots$ 是局部正交指标，$\mu,\nu,\lambda,\ldots$ 是坐标指标。在这个标架中，Dirac 矩阵 $\gamma^\alpha=e^\alpha{}_\mu\gamma^\mu$ 满足 $\{\gamma^\alpha,\gamma^\beta\}=2\eta^{\alpha\beta}$。（为什么非要标架？因为旋量按 Lorentz 群的**旋量表示**变换，而 $\mathrm{GL}(4,\R)$——坐标变换的群——没有有限维旋量表示。）在局部 Lorentz 变换 $\Lambda^\alpha{}_\beta(p)$ 下，Dirac 旋量变换为`}</Tx>
        <Eq n="7.217" say={R`旋量在局部 Lorentz 变换下按旋量表示 $\rho(\Lambda)$ 变换；$\bar\psi$ 按逆变换。`}>{R`\psi(p)\to\rho(\Lambda)\psi(p)\qquad\bar\psi(p)\to\bar\psi(p)\rho(\Lambda)^{-1}`}</Eq>
        <Tx>{R`其中 $\bar\psi\equiv\psi^\dagger\gamma^0$，$\rho(\Lambda)$ 是 $\Lambda$ 的旋量表示。为了构造不变的作用量，要找一个协变导数 $\nabla_\alpha\psi$，它是局部 Lorentz 向量，并按旋量变换：`}</Tx>
        <Eq n="7.218" say={R`所求的协变导数：标架指标 $\alpha$ 按向量变换，旋量部分按 $\rho(\Lambda)$ 变换。`}>{R`\nabla_\alpha\psi\to\rho(\Lambda)\Lambda_\alpha{}^\beta\nabla_\beta\psi.`}</Eq>
        <Tx>{R`若找到这样的 $\nabla_\alpha\psi$，不变拉氏量可以取为`}</Tx>
        <Eq n="7.219" say={R`弯曲时空的 Dirac 拉氏量，形式上与平直时空相同。`}>{R`\mathcal L=\bar\psi\left(\mathrm{i}\gamma^\alpha\nabla_\alpha+m\right)\psi`}</Eq>
        <Tx>{R`$m$ 是 $\psi$ 的质量。注意 $e_\alpha{}^\mu\partial_\mu\psi$ 在 $\Lambda(p)$ 下变换为`}</Tx>
        <Eq n="7.220" say={R`普通导数不协变：$\Lambda$ 随点变化，$\partial_\mu\rho(\Lambda)$ 多出一项。`}>{R`e_\alpha{}^\mu\partial_\mu\psi\to\Lambda_\alpha{}^\beta e_\beta{}^\mu\partial_\mu\rho(\Lambda)\psi=\Lambda_\alpha{}^\beta e_\beta{}^\mu[\rho(\Lambda)\partial_\mu\psi+\partial_\mu\rho(\Lambda)\psi].`}</Eq>
        <Tx>{R`（原书第二个等号后的 $\Lambda_\alpha{}^\eta$ 应为 $\Lambda_\alpha{}^\beta$。）设 $\nabla_\alpha$ 的形式为`}</Tx>
        <Eq n="7.221" title="旋量协变导数" say={R`旋量的协变导数：普通导数加一个"自旋联络" $\Omega_\mu$，用来吸收标架随点转动带来的多余项。`}>{R`\nabla_\alpha\psi=e_\alpha{}^\mu[\partial_\mu+\Omega_\mu]\psi.`}</Eq>
        <Tx>{R`由 \eqref{7.218} 与 \eqref{7.220}，$\Omega_\mu$ 必须满足`}</Tx>
        <Eq n="7.222" say={R`自旋联络必须像规范势一样变换：共轭加一个非齐次项。`}>{R`\Omega_\mu\to\rho(\Lambda)\Omega_\mu\rho(\Lambda)^{-1}-\partial_\mu\rho(\Lambda)\rho(\Lambda)^{-1}.`}</Eq>
        <Tx>{R`为求 $\Omega_\mu$ 的显式形式，考虑无穷小局部 Lorentz 变换 $\Lambda_\alpha{}^\beta(p)=\delta_\alpha{}^\beta+\varepsilon_\alpha{}^\beta(p)$。Dirac 旋量变换为`}</Tx>
        <Eq n="7.223" say={R`无穷小 Lorentz 变换在旋量上的作用：生成元是 $\Sigma_{\alpha\beta}$。`}>{R`\psi\to\exp[\tfrac12\mathrm{i}\varepsilon^{\alpha\beta}\Sigma_{\alpha\beta}]\psi\simeq[1+\tfrac12\mathrm{i}\varepsilon^{\alpha\beta}\Sigma_{\alpha\beta}]\psi`}</Eq>
        <Tx>{R`其中 $\Sigma_{\alpha\beta}\equiv\frac14\mathrm{i}[\gamma_\alpha,\gamma_\beta]$ 是 Lorentz 变换生成元的旋量表示。$\Sigma_{\alpha\beta}$ 满足 $\mathfrak{o}(1,3)$ 李代数：`}</Tx>
        <Eq n="7.224" say={R`Lorentz 李代数：两个生成元的对易子是生成元的线性组合，系数由 $\eta$ 给出。`}>{R`\mathrm{i}[\Sigma_{\alpha\beta},\Sigma_{\gamma\delta}]=\eta_{\gamma\beta}\Sigma_{\alpha\delta}-\eta_{\gamma\alpha}\Sigma_{\beta\delta}+\eta_{\delta\beta}\Sigma_{\gamma\alpha}-\eta_{\delta\alpha}\Sigma_{\gamma\beta}.`}</Eq>
        <Tx>{R`在同一 Lorentz 变换下，$\Omega_\mu$ 变换为`}</Tx>
        <Eq n="7.225" say={R`把 \eqref{7.222} 展开到 $\varepsilon$ 的一阶。`}>{R`\begin{aligned}\Omega_\mu&\to(1+\tfrac12\mathrm{i}\varepsilon^{\alpha\beta}\Sigma_{\alpha\beta})\Omega_\mu(1-\tfrac12\mathrm{i}\varepsilon^{\gamma\delta}\Sigma_{\gamma\delta})-\tfrac12\mathrm{i}\partial_\mu\varepsilon^{\alpha\beta}\Sigma_{\alpha\beta}(1-\tfrac12\mathrm{i}\varepsilon^{\gamma\delta}\Sigma_{\gamma\delta})\\&=\Omega_\mu+\tfrac12\mathrm{i}\varepsilon^{\alpha\beta}[\Sigma_{\alpha\beta},\Omega_\mu]-\tfrac12\mathrm{i}\partial_\mu\varepsilon^{\alpha\beta}\Sigma_{\alpha\beta}.\end{aligned}`}</Eq>
        <Tx>{R`回忆联络一形式 $\omega^\alpha{}_\beta$ 在无穷小 Lorentz 变换下变换为（见 \eqref{7.152}，$\Lambda=1+\varepsilon$，$\Lambda^{-1}=1-\varepsilon$）`}</Tx>
        <Eq n="7.226a" say={R`\eqref{7.152} 的无穷小版本。`}>{R`\omega^\alpha{}_\beta\to\omega^\alpha{}_\beta+\varepsilon^\alpha{}_\gamma\omega^\gamma{}_\beta-\omega^\alpha{}_\gamma\varepsilon^\gamma{}_\beta-\dd\varepsilon^\alpha{}_\beta`}</Eq>
        <Tx>{R`或用分量写（$\omega^\alpha{}_\beta=\Gamma^\alpha{}_{\mu\beta}\dd x^\mu$，这里 $\Gamma^\alpha{}_{\mu\beta}\equiv e^\gamma{}_\mu\Gamma^\alpha{}_{\gamma\beta}$：中间的"求导方向"指标换成了坐标指标）`}</Tx>
        <Eq n="7.226b" say={R`同一变换律的分量形式。`}>{R`\Gamma^\alpha{}_{\mu\beta}\to\Gamma^\alpha{}_{\mu\beta}+\varepsilon^\alpha{}_\gamma\Gamma^\gamma{}_{\mu\beta}-\Gamma^\alpha{}_{\mu\gamma}\varepsilon^\gamma{}_\beta-\partial_\mu\varepsilon^\alpha{}_\beta.`}</Eq>
        <Tx>{R`由 \eqref{7.224}、\eqref{7.225} 与 \eqref{7.226b}，组合`}</Tx>
        <Eq n="7.227" title="自旋联络" say={R`自旋联络就是联络一形式（取值于 Lorentz 李代数）在旋量表示中的像：$\Omega_\mu=\frac12\mathrm{i}\Gamma^\alpha{}_\mu{}^\beta\Sigma_{\alpha\beta}$。`}>{R`\Omega_\mu\equiv\tfrac12\mathrm{i}\Gamma^\alpha{}_\mu{}^\beta\Sigma_{\alpha\beta}=\tfrac12\mathrm{i}e^\alpha{}_\nu\nabla_\mu e^{\beta\nu}\Sigma_{\alpha\beta}`}</Eq>
        <Tx>{R`满足变换性质 \eqref{7.222}。事实上，

$$\begin{aligned}\tfrac12\mathrm{i}\Gamma^\alpha{}_\mu{}^\beta\Sigma_{\alpha\beta}&\to\tfrac12\mathrm{i}(\Gamma^\alpha{}_\mu{}^\beta+\varepsilon^\alpha{}_\gamma\Gamma^\gamma{}_\mu{}^\beta-\Gamma^\alpha{}_{\mu\gamma}\varepsilon^{\gamma\beta}-\partial_\mu\varepsilon^{\alpha\beta})\Sigma_{\alpha\beta}\\&=\tfrac12\mathrm{i}\Gamma^\alpha{}_\mu{}^\beta\Sigma_{\alpha\beta}+\tfrac12\mathrm{i}(\varepsilon^\alpha{}_\gamma\Gamma^\gamma{}_\mu{}^\beta\Sigma_{\alpha\beta}-\Gamma^\alpha{}_{\mu\gamma}\varepsilon^{\gamma\beta}\Sigma_{\alpha\beta})-\tfrac12\mathrm{i}\partial_\mu\varepsilon^{\alpha\beta}\Sigma_{\alpha\beta}\\&=\tfrac12\mathrm{i}\Gamma^\alpha{}_\mu{}^\beta\Sigma_{\alpha\beta}+\tfrac12\mathrm{i}\varepsilon^{\alpha\beta}[\Sigma_{\alpha\beta},\tfrac12\mathrm{i}\Gamma^\gamma{}_\mu{}^\delta\Sigma_{\gamma\delta}]-\tfrac12\mathrm{i}\partial_\mu\varepsilon^{\alpha\beta}\Sigma_{\alpha\beta}.\end{aligned}$$

（最后一步用 \eqref{7.224} 把对易子展开，并利用 $\varepsilon_{\alpha\beta}$ 与 $\Gamma_{\gamma\mu\delta}$ 关于各自两个标架指标的反对称性（\eqref{7.155}）；与 \eqref{7.225} 逐项一致。）最后得到在坐标变换与局部 Lorentz 转动下都是标量的拉氏量`}</Tx>
        <Eq n="7.228" say={R`弯曲时空的 Dirac 拉氏量：$\gamma^\alpha e_\alpha{}^\mu$ 加上自旋联络。`}>{R`\mathcal L\equiv\bar\psi[\mathrm{i}\gamma^\alpha e_\alpha{}^\mu(\partial_\mu+\tfrac12\mathrm{i}\Gamma^\beta{}_\mu{}^\gamma\Sigma_{\beta\gamma})+m]\psi`}</Eq>
        <Tx>{R`以及标量作用量`}</Tx>
        <Eq n="7.229a" title="弯曲时空的 Dirac 作用量" say={R`弯曲时空中的 Dirac 作用量：体积元 $\sqrt{-g}$、vierbein 与自旋联络三者缺一不可。`}>{R`S_\psi\equiv\int_M\dd^4x\sqrt{-g}\,\bar\psi[\mathrm{i}\gamma^\alpha e_\alpha{}^\mu(\partial_\mu+\tfrac12\mathrm{i}\Gamma^\beta{}_\mu{}^\gamma\Sigma_{\beta\gamma})+m]\psi.`}</Eq>
        <Tx>{R`若 $\psi$ 与规范场 $\mathcal A$ 耦合，作用量为`}</Tx>
        <Eq n="7.229b" say={R`再加上内部对称性的规范势 $\mathcal A_\mu$：时空的联络与内部的联络并列出现。`}>{R`S_\psi=\int_M\dd^4x\sqrt{-g}\,\bar\psi[\mathrm{i}\gamma^\alpha e_\alpha{}^\mu(\partial_\mu+\mathcal A_\mu+\tfrac12\mathrm{i}\Gamma^\beta{}_\mu{}^\gamma\Sigma_{\beta\gamma})+m]\psi.`}</Eq>
        <Tx>{R`有趣的是，若 $\dim M=2$，自旋联络项消失。为看清这一点，把 \eqref{7.229a} 改写为（二维）

$$S_\psi=\frac12\int_M\dd^2x\sqrt{-g}\,\bar\psi[\mathrm{i}\gamma^\mu\overleftrightarrow{\partial_\mu}+\tfrac12\mathrm{i}\Gamma^\beta{}_\mu{}^\gamma\{\mathrm{i}\gamma^\mu,\Sigma_{\beta\gamma}\}+m]\psi\qquad(7.229\text{a}')$$

其中 $\gamma^\mu=\gamma^\alpha e_\alpha{}^\mu$，我们在拉氏量中加了全导数使它成为 Hermite 的。$\Sigma$ 的非零分量是 $\Sigma_{01}\propto[\gamma_0,\gamma_1]\propto\gamma_3$，$\gamma_3$ 是 $\gamma_5$ 的二维类比。由于 $\{\gamma^\mu,\gamma_3\}=0$，自旋联络项从 $S_\psi$ 中消失。`}</Tx>
        <Box kind="note" title={R`注：$(7.229\mathrm{a}')$ 中质量项的系数`}>{R`把 \eqref{7.229a} 写成 $\frac12[\mathcal L+\mathcal L^\dagger]$ 的对称形式时，动能项变成 $\frac12\bar\psi\mathrm{i}\gamma^\mu\overleftrightarrow{\partial_\mu}\psi$，自旋联络项变成 $\frac12\bar\psi\cdot\frac12\mathrm{i}\Gamma\{\mathrm{i}\gamma^\mu,\Sigma\}\psi$（$\gamma^0\Sigma^\dagger\gamma^0=\Sigma$ 使两项合成反对易子），而质量项保持 $m\bar\psi\psi$——所以若把 $\frac12$ 提到整个方括号外，括号内应写 $2m$。这一点不影响"自旋联络项在二维消失"的结论。`}</Box>
      </Sub>
    </Sec>);
}
