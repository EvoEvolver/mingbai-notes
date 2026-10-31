// §14.2.1–14.2.2 玻色弦的量子理论：真空振幅、积分测度 —— 式 (14.30)–(14.96)，例 14.2，习题 14.3–14.4，图 14.1–14.5
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, Figure, C } from "@kit";

const R = String.raw;
export const Diff = R`\sym{diff}{\mathrm{Diff}}`, Diff0 = R`\sym{diff0}{\mathrm{Diff}_0}`, Weyl = R`\sym{weyl}{\mathrm{Weyl}}`;
export const Teich = R`\sym{teich}{\mathrm{Teich}}`, Mod = R`\sym{mod}{\mathrm{Mod}}`, MCG = R`\sym{mcg}{\mathrm{MCG}}`, CKV = R`\sym{ckv}{\mathrm{CKV}}`;
const DP = R`\sym{diffperp}{\mathrm{Diff}_0^\perp}`;
const SG = R`(\Sigma_g)`;

export function Sec142({ children }) {
  return (
    <Sec n="14.2" title="Quantum theory of bosonic strings" zh="玻色弦的量子理论"
      gist={R`配分函数 = 对嵌入 $X$ 与度规 $\gamma$ 的路径积分，再除以规范群 $\mathrm{Diff}*\mathrm{Weyl}$ 的体积。把度规变形正交分解为 Weyl 方向 $\oplus$ $\operatorname{im}P_1$ $\oplus$ $\ker P_1^\dagger$，分别对应规范、鬼场行列式与模参数；$D=26$ 时 Weyl 反常相消；剩下模空间上的有限维积分 \eqref{14.94}、复形式 \eqref{14.117}。`}
      why={R`作用量有巨大的规范对称性，若不除掉就会把同一个几何数无穷多次；Faddeev–Popov 技巧把"除以无穷体积"变成计算 Jacobi 行列式。而哪些方向是规范、哪些是物理，正由 \secref{14.1} 的算子核与 Riemann–Roch 定理决定。`}
      gives={["14.30", "14.31", "14.38", "14.39", "14.48", "14.50", "14.58", "14.76", "14.80b", "14.83", "14.84a", "14.84b", "14.93", "14.94", "14.100", "14.107", "14.112", "14.113", "14.117", "14.118", "14.119"]}>
      <Tx>{R`现在可以介绍 Polyakov 对玻色弦的表述了：它以**对几何的路径积分**为基础。弦的作用量包含巨大的对称性，必须特别小心，使每个独立的几何只数一次——这由 **Faddeev–Popov 技巧**完成。我们只讨论最简单的情形：闭的、可定向的玻色弦，理论定义在 Riemann 面上。`}</Tx>
      <Sub1421 />
      <Sub1422 />
      {children}
    </Sec>);
}

function Sub1421() {
  return (
    <Sub n="14.2.1" title="Vacuum amplitude of Polyakov strings" zh="Polyakov 弦的真空振幅">
      <p className="muted">本小节概念：<C id="polyakov" /> · <C id="gauge_slice" /> · <C id="moduli" /></p>
      <Tx>{R`**对所有曲面求和。**按路径积分的一般规则，弦理论的配分函数（真空到真空的振幅）为`}</Tx>
      <Eq n="14.30" title="弦的配分函数" say={R`弦的真空振幅：对所有亏格（拓扑）求和，每个亏格内再对所有嵌入与所有度规积分——"对粒子路径求和"的二维推广。`}>{R`Z=\sum_{g=0}^\infty Z_g=\sum_{g=0}^\infty\int\mathcal{D}X\mathcal{D}\gamma\,\mathrm{e}^{-S[X,\gamma]}`}</Eq>
      <Figure n="14.1" caption={R`总真空振幅由 $g$ 圈振幅求和给出。`} width="70%" />
      <Tx>{R`见 \figref{14.1}。为避免混淆，**亏格记作 $g$，度规记作 $\gamma$**。对亏格求和就是对拓扑求和。$Z_g$ 是 $g$ 圈振幅，由对所有度规 $\gamma$ 与所有嵌入 $X$ 积分得到。后面会看到，测度 $\mathcal{D}X\mathcal{D}\gamma$ 并没有良好定义，需要修改。弦的作用量 $S[X,\gamma]$ 取为`}</Tx>
      <Eq n="14.31" title="弦的作用量" say={R`第一项是 Polyakov 作用量；第二项 $=-\lambda\chi$ 是拓扑不变量，只给亏格 $g$ 的曲面一个权重 $\mathrm{e}^{-2\lambda g}$（弦耦合），不影响动力学。`}>{R`S[X,\gamma]\equiv\frac12\int\dd^2\xi\,\sqrt\gamma\gamma^{\alpha\beta}\partial_\alpha X^\mu\partial_\beta X_\mu-\frac{\lambda}{4\pi}\int\dd^2\xi\,\sqrt\gamma\mathcal{R}.`}</Eq>
      <Tx>{R`第一项是 Polyakov 作用量。第二项正比于 Euler 示性数

$$\chi=\frac1{4\pi}\int\dd^2\xi\,\sqrt\gamma\mathcal{R}=2-2g,$$

起弦耦合常数的作用：亏格 $g$ 的圈图被因子 $\mathrm{e}^{-2\lambda g}$ 压低。因为这一项是拓扑不变量，它不影响弦的动力学。我们关心固定亏格 $g$ 的 Riemann 面，从此略去这一项。`}</Tx>
      <Box kind="warning" title={R`勘误：Euler 项的符号（p.556）`}>{R`原书 \eqref{14.31} 中 Euler 项印作 $+\frac{\lambda}{4\pi}\int\sqrt\gamma\mathcal{R}=+\lambda\chi$，此时 $\mathrm{e}^{-S}\propto\mathrm{e}^{-\lambda(2-2g)}\propto\mathrm{e}^{+2\lambda g}$，与紧接着的"被 $\mathrm{e}^{-2\lambda g}$ 压低"矛盾，也与 \eqref{14.1} 的符号不一致。按 \eqref{14.1} 改为 $-\frac{\lambda}{4\pi}$。本章其余部分略去此项，不受影响。`}</Box>
      <Tx>{R`**两种局部对称性。**作用量的第一项有下列对称性（\secref{7.11}）：

**(A)** $\mathrm{Diff}${SG}$——微分同胚 $f:\Sigma_g\to\Sigma_g$ 构成的群。设 $\xi^\alpha\to\xi'^\alpha(\xi)$ 是 $f$ 的坐标表示。新度规是旧度规的拉回，分量为`}</Tx>
      <Eq n="14.32" say={R`微分同胚把度规拉回：分量按张量规则变换。`}>{R`\gamma_{\alpha\beta}\to f^*\gamma_{\alpha\beta}=\frac{\partial\xi^\gamma}{\partial\xi'^\alpha}\frac{\partial\xi^\delta}{\partial\xi'^\beta}\gamma_{\gamma\delta}.`}</Eq>
      <Tx>{R`嵌入也随之变换：`}</Tx>
      <Eq n="14.33" say={R`嵌入映射与微分同胚复合：同一个弦世界面，换一种参数化。`}>{R`X^\mu\to f^*X^\mu=X^\mu\circ f.`}</Eq>
      <Tx>{R`经典作用量的不变性写成`}</Tx>
      <Eq n="14.34" say={R`同时拉回嵌入与度规，作用量不变：作用量只依赖于几何，不依赖于坐标。`}>{R`S[X,\gamma]=S[f^*X,f^*\gamma].`}</Eq>
      <Tx>{R`**(B)** $\mathrm{Weyl}${SG}$——二维 Weyl 重标度构成的群：`}</Tx>
      <Eq n="14.35" say={R`Weyl 重标度：度规在每一点乘上一个任意的正函数。`}>{R`\gamma_{\alpha\beta}\to\hat\gamma_{\alpha\beta}\equiv\mathrm{e}^\phi\gamma_{\alpha\beta}`}</Eq>
      <Tx>{R`其中 $\phi\in\mathcal{F}${SG}$。$S$ 的共形不变性写成`}</Tx>
      <Eq n="14.36" say={R`二维特有：$\sqrt\gamma\gamma^{\alpha\beta}$ 在 Weyl 变换下不变，所以 Polyakov 作用量不在乎度规的"尺度"。`}>{R`S[X,\gamma]=S[X,\hat\gamma].`}</Eq>
      <Figure n="14.2" caption={R`$\mathcal{E}\times\mathcal{M}_g$ 中的元素由 $\mathrm{Diff}(\Sigma_g)*\mathrm{Weyl}(\Sigma_g)$ 作用在规范切片中的元素 $(X,\gamma)$ 上得到。`} width="45%" />
      <Tx>{R`对称性 (A)、(B) 在量子化后必须保留，否则理论有**反常**（anomaly）。

**Faddeev–Popov 的想法。**按标准的 Faddeev–Popov 方法，定义 $Z_g$ 时必须略去与这些对称性对应的自由度。例如，若 $(X_1,\gamma_1)$ 与 $(X_2,\gamma_2)$ 由 $\mathrm{Diff}${SG}$ 的一个元素相联系，就不应把它们当作独立的几何分别计数；同样 $(X,\gamma)$ 与 $(X,\mathrm{e}^\phi\gamma)$ 也不应独立计数。不加注意，我们会把同一组态数无穷多次，导致灾难性的发散。可以把所有几何 $(X,\gamma)$ 的空间分成等价类，并取一个**规范切片**（gauge slice）：切片上任何两点都不能由这些对称性相连（\figref{14.2}）。

更数学地说，设 $\mathcal{E}$ 是所有嵌入 $X:\Sigma_g\to\R^D$ 的空间，$\mathcal{M}_g$ 是 $\Sigma_g$ 上所有度规的空间。天真的路径积分定义在 $\mathcal{E}\times\mathcal{M}_g$ 上。由于对称性 (A)、(B)，积分应限制在商空间 $(\mathcal{E}\times\mathcal{M}_g)/G$ 上，$G=\mathrm{Diff}${SG}*\mathrm{Weyl}${SG}$ 是规范群（$*$ 表示半直积；注意 $\mathrm{Diff}${SG}\cap\mathrm{Weyl}${SG}\neq\emptyset$，后面再回到这一点）。$(f,\mathrm{e}^\phi)$ 在 $(X,\gamma)\in\mathcal{E}\times\mathcal{M}_g$ 上的作用为`}</Tx>
      <Eq n="14.37" say={R`规范群的元素（微分同胚 + Weyl 因子）同时作用在嵌入与度规上。`}>{R`(f,\mathrm{e}^\phi)(X,\gamma)=(f^*X,\mathrm{e}^\phi f^*\gamma).`}</Eq>
      <Tx>{R`商 $\mathcal{M}_g/G$ 称为 $\Sigma_g$ 的**模空间**（moduli space），记作 $${Mod}${SG}$。我们也关心 $\mathrm{Diff}${SG}$ 的子群 $${Diff0}${SG}$——恒等映射所在的连通分支。商空间 $${Teich}${SG}\equiv\mathcal{M}_g/${Diff0}${SG}*${Weyl}${SG}$ 称为 $\Sigma_g$ 的 **Teichmüller 空间**。Riemann 面的一般理论表明，$${Teich}${SG}$ 是 $${Mod}${SG}$ 的有限维万有覆叠空间。具体地：`}</Tx>
      <Eq n="14.38" keyEq title="Teichmüller 空间的维数" say={R`真正的度规自由度（模参数）是有限个：球面没有，环面 2 个实参数（即 $\tau$），亏格 $g\ge2$ 有 $6g-6$ 个。`}>{R`\dim_{\R}${Teich}${SG}=\begin{cases}0&g=0\\2&g=1\\6g-6&g\ge2.\end{cases}`}</Eq>
      <Figure n="14.3" caption={R`映射类群（MCG）由绕 $a_i$、$b_i$、$c_i$（$1\le i\le g$）的 Dehn 扭转生成。`} width="80%" />
      <Tx>{R`群 $\mathrm{Diff}${SG}/${Diff0}${SG}$ 称为**模群**（modular group，MG）或**映射类群**（mapping class group，MCG）。MCG 由例 8.2 中定义的 **Dehn 扭转**生成：对亏格 $g$ 的曲面，MCG 由绕 \figref{14.3} 中 $a_i$、$b_i$、$c_i$ 的 $3g-1$ 个 Dehn 扭转生成（Lickorish）。遗憾的是这 $3g-1$ 个 Dehn 扭转不是最小生成元组；$g\ge2$ 时 MCG 的一般形式还不清楚。（$g=1$ 时 MCG $=\mathrm{SL}(2,\Z)$，就是第 8 章的模群，见交互图 1。）

由这些论证，有意义的配分函数是`}</Tx>
      <Eq n="14.39" title="除以规范群体积的配分函数" say={R`真正的 $g$ 圈振幅：天真的路径积分除以规范群 $\mathrm{Diff}*\mathrm{Weyl}$ 的（无穷）体积，消掉对同一几何的无穷重复计数。`}>{R`Z_g\equiv\int_{\mathcal{E}\times\mathcal{M}_g}\frac{\mathcal{D}X\mathcal{D}\gamma}{V(${Diff}*${Weyl})}\mathrm{e}^{-S[X,\gamma]}`}</Eq>
      <Tx>{R`其中 $V(${Diff}*${Weyl})$ 是 $\mathrm{Diff}${SG}*\mathrm{Weyl}${SG}$ 的（无穷）体积，负责消去对同一几何的无穷重复计数。MCG 的阶（元素个数）记作 $|${MCG}|$。显然`}</Tx>
      <Eq n="14.40" say={R`整个规范群的体积 = 离散的映射类群的阶 $\times$ 恒等分支（含 Weyl）的体积。`}>{R`V(${Diff}*${Weyl})=|${MCG}|V(${Diff0}*${Weyl}).`}</Eq>
    </Sub>);
}

function Sub1422() {
  return (
    <Sub n="14.2.2" title="Measures of integration" zh="积分测度">
      <p className="muted">本小节概念：<C id="fp_measure" /> · <C id="ckv" /> · <C id="weyl_anomaly" /></p>
      <Tx>{R`**我们要做的事。**为了真正算出 \eqref{14.39}，必须定义一个合理的测度，把物理自由度与规范自由度分开。这需要一个 Jacobi 行列式：`}</Tx>
      <Eq n="14.41" say={R`换积分变量：从"度规与嵌入"换成"物理自由度与规范自由度"，代价是一个 Jacobi 因子 $J$——Faddeev–Popov 行列式。`}>{R`\mathcal{D}\gamma\mathcal{D}X\to J(\mathcal{D}\,\text{physical})(\mathcal{D}\,\text{gauge}).`}</Eq>
      <Tx>{R`**技巧：在切空间上算 Jacobi 行列式。**流形 $M$ 上的 Jacobi 行列式与 $TM$ 上的相同。设 $x^\mu$（$y^\mu$）是 $M$ 的坐标卡 $U$（$V$）中的坐标，$U\cap V\neq\emptyset$。坐标变换的 Jacobi 行列式为 $J=\det(\partial y^\mu/\partial x^\nu)$。取 $V\in T_pM$，分量 $V=u^\mu\partial/\partial x^\mu=v^\mu\partial/\partial y^\mu$，其中`}</Tx>
      <Eq n="14.42" say={R`同一个切向量在两组坐标基下的分量由坐标变换的 Jacobi 矩阵联系。`}>{R`v^\mu=u^\nu(\partial y^\mu/\partial x^\nu).`}</Eq>
      <Tx>{R`$\{u^\mu\}$ 与 $\{v^\mu\}$ 是 $T_pM$ 的纤维坐标。与这个换元相应的 Jacobi 行列式为`}</Tx>
      <Eq n="14.43" say={R`切空间上线性换元的 Jacobi 行列式与流形上坐标变换的 Jacobi 行列式相同——所以可以在（线性的）切空间上计算它。`}>{R`\hat J=\det(\partial v^\mu/\partial u^\nu)=\det(\partial y^\mu/\partial x^\nu)=J.`}</Eq>
      <Tx>{R`这说明 $p\in M$ 处的 Jacobi 行列式与 $T_pM$ 上的相同。$\hat J$ 依赖于 $p$，但不依赖于向量本身，因为 $J$ 只依赖于 $p$。`}</Tx>
      <Box kind="example" n="14.2" title="极坐标的 Jacobi 行列式——用 Gauss 积分求">
        <Tx>{R`设 $(x,y)$ 与 $(r,\theta)$ 是 $\R^2$ 的坐标，$x=r\cos\theta$、$y=r\sin\theta$。坐标变换的 Jacobi 行列式为 $J=\det\frac{\partial(x,y)}{\partial(r,\theta)}=r$。取

$$V=v_x\partial/\partial x+v_y\partial/\partial y=v_r\partial/\partial r+v_\theta\partial/\partial\theta\in T_p\R^2.$$

$(v_x,v_y)$ 与 $(v_r,v_\theta)$ 是 $T_p\R^2$ 的纤维坐标。由 $v_x=v_r\partial x/\partial r+v_\theta\partial x/\partial\theta$、$v_y=v_r\partial y/\partial r+v_\theta\partial y/\partial\theta$，相应的 Jacobi 行列式为

$$\hat J=\det[\partial(v_x,v_y)/\partial(v_r,v_\theta)]=\begin{vmatrix}\partial x/\partial r&\partial x/\partial\theta\\ \partial y/\partial r&\partial y/\partial\theta\end{vmatrix}=J.$$

**间接但有启发性的求法。**把测度 $\dd^2v$ 归一化为（与通常的归一化差一个常数因子）

$$1=\int\dd^2v\,\exp(-\tfrac12\|v\|^2)=\int\dd v_x\dd v_y\exp[-\tfrac12(v_x^2+v_y^2)].$$

又 $\|v\|^2=v_r^2+r^2v_\theta^2$（度规 $\dd r^2+r^2\dd\theta^2$）。注意 Jacobi 行列式与 $v_r$、$v_\theta$ 无关，有

$$1=J\int\dd v_r\dd v_\theta\exp[-\tfrac12(v_r^2+r^2v_\theta^2)]=Jr^{-1},$$

由此得 $J=r$。**要点：**只要知道切空间上的度规（$\|v\|^2$ 的二次型），Jacobi 行列式就是这个二次型在新坐标中的 $\det^{1/2}$。我们将用这个办法求弦论的泛函测度。（切空间只是用来求 Jacobi 行列式的工具，本身没有物理意义。）`}</Tx>
      </Box>
      <Tx>{R`这个分析让我们写出`}</Tx>
      <Eq n="14.44" say={R`在切空间层面：度规与嵌入的无穷小变分的测度 = Jacobi 因子 $\times$ 物理变分的测度 $\times$ 规范变分的测度。`}>{R`\mathcal{D}\delta\gamma\mathcal{D}\delta X=J\mathcal{D}\delta(\text{physical})\mathcal{D}\delta(\text{gauge})`}</Eq>
      <Tx>{R`其中 $\delta\gamma$（$\delta X$）是度规 $\gamma$（嵌入 $X$）的小变分，被视为 $T_\gamma(\mathcal{M}_g)$（$T_X\mathcal{E}$）的元素。

**规范方向。**考虑由 $\Sigma_g$ 上无穷小向量场 $\delta v$ 生成的微分同胚。由于 $\delta v$ 是无穷小的，它属于 $${Diff0}${SG}$ 而不是整个 $\mathrm{Diff}${SG}$。在 $\delta v$ 下度规与嵌入的变化为（见 \eqref{7.120a}）`}</Tx>
      <Eq n="14.45" title="无穷小微分同胚" say={R`无穷小微分同胚使度规沿向量场作 Lie 导数（$\nabla_\alpha\delta v_\beta+\nabla_\beta\delta v_\alpha$），使嵌入沿向量场平移。`}>{R`\delta_{\rm D}\gamma_{\alpha\beta}=(\mathcal{L}_{\delta v}\gamma)_{\alpha\beta}=\nabla_\alpha\delta v_\beta+\nabla_\beta\delta v_\alpha\qquad\delta_{\rm D}X=\delta v^\alpha\partial_\alpha X.`}</Eq>
      <Tx>{R`在无穷小 Weyl 重标度 $\mathrm{e}^{\delta\phi}$ 下，$\gamma$ 与 $X$ 的变化为`}</Tx>
      <Eq n="14.46" say={R`无穷小 Weyl 变换只改变度规的尺度（纯迹），不动嵌入。`}>{R`\delta_{\rm W}\gamma_{\alpha\beta}=\delta\phi\gamma_{\alpha\beta}\qquad\delta_{\rm W}X=0.`}</Eq>
      <Tx>{R`这些变化属于非物理的（规范）自由度。**一般的度规小变化**为`}</Tx>
      <Eq n="14.47" title="度规变形的三种成分" say={R`任意的度规变形 = Weyl 变形 + 微分同胚 + Teichmüller 变形（后者既不是微分同胚也不是 Weyl，是真正的物理变化）。`}>{R`\begin{aligned}\delta\gamma_{\alpha\beta}&=\delta_{\rm W}\gamma_{\alpha\beta}+\delta_{\rm D}\gamma_{\alpha\beta}+(\text{physical change})\\&=\delta\phi\gamma_{\alpha\beta}+\nabla_\alpha\delta v_\beta+\nabla_\beta\delta v_\alpha+\delta t^i\frac{\partial}{\partial t^i}\gamma_{\alpha\beta}(t)\end{aligned}`}</Eq>
      <Tx>{R`最后一项称为度规的 **Teichmüller 形变**：它既不能由微分同胚描述，也不能由 Weyl 重标度描述。如前所述，$\{i\}$ 是有限集，$1\le i\le n=\dim_{\R}${Teich}${SG}$。为了后面的方便，把 $\delta\gamma$ 分成无迹部分与有迹部分：`}</Tx>
      <Eq n="14.48" title="无迹 / 有迹分解" say={R`把度规变形重新分组：纯迹部分（并入一个新的 Weyl 参数 $\delta\bar\phi$）、微分同胚的无迹部分 $P_1\delta v$、Teichmüller 形变的无迹部分。`}>{R`\delta\gamma_{\alpha\beta}=\delta\bar\phi\gamma_{\alpha\beta}+(P_1\delta v)_{\alpha\beta}+\delta t^iT_{i\alpha\beta}(t)`}</Eq>
      <Tx>{R`其中 $T_{i\alpha\beta}$ 是 Teichmüller 形变的无迹部分：`}</Tx>
      <Eq n="14.49" say={R`Teichmüller 形变减去它的迹：只保留"改变形状"的部分。`}>{R`T_{i\alpha\beta}\equiv\frac{\partial\gamma_{\alpha\beta}}{\partial t^i}-\frac12\gamma_{\alpha\beta}\gamma^{\gamma\delta}\frac{\partial\gamma_{\gamma\delta}}{\partial t^i}.`}</Eq>
      <Tx>{R`算子 $P_1$ 定义为`}</Tx>
      <Eq n="14.50" keyEq title={R`算子 $P_1$`} say={R`$P_1$ 把向量场映到无迹对称张量：微分同胚引起的度规变化去掉迹。它的核就是共形 Killing 向量。`}>{R`(P_1\delta v)_{\alpha\beta}\equiv\nabla_\alpha\delta v_\beta+\nabla_\beta\delta v_\alpha-\gamma_{\alpha\beta}(\nabla_\gamma\delta v^\gamma)`}</Eq>
      <Tx>{R`它取出 $\delta_{\rm D}\gamma_{\alpha\beta}$ 的无迹部分，而 $\delta\bar\phi$ 定义为`}</Tx>
      <Eq n="14.51" say={R`新的 Weyl 参数收集了所有的迹：原 Weyl 参数、微分同胚的散度、Teichmüller 形变的迹。`}>{R`\delta\bar\phi=\delta\phi+\Big(\nabla_\gamma\delta v^\gamma+\text{trace part of }\delta t\frac{\partial\gamma}{\partial t}\Big)`}</Eq>
      <Tx>{R`括号里的具体形式不需要。

对嵌入，考虑商 $\mathcal{E}/\mathrm{Diff}${SG}$。任意嵌入 $X$ 由 $\mathrm{Diff}${SG}$ 作用在某个 $\tilde X\in\mathcal{E}/\mathrm{Diff}${SG}$ 上得到。于是嵌入的小变化表示为`}</Tx>
      <Eq n="14.52" say={R`嵌入的变化 = 微分同胚引起的部分 + 与微分同胚无关的部分。`}>{R`\delta X=\delta v^\alpha\partial_\alpha\tilde X+\delta\tilde X`}</Eq>
      <Tx>{R`第一项是 $\delta v$ 引起的 $X$ 的变化，第二项与微分同胚无关。测度应该具有如下形式：`}</Tx>
      <Eq n="14.53" say={R`目标：把测度写成模参数、微分同胚、Weyl 因子与"约化"嵌入的测度之积。`}>{R`\mathcal{D}\delta\gamma\mathcal{D}\delta X=J\,\dd^nt\,\mathcal{D}\delta v\mathcal{D}\delta\phi\mathcal{D}\delta\tilde X.`}</Eq>
      <Tx>{R`**切空间上的度规。**为了定义测度，需要指定切空间上的度规（见例 14.2）。我们限于所谓**超局域**（ultralocal）度规：二次的、只依赖 $\gamma_{\alpha\beta}$ 而不依赖 $\partial\gamma_{\alpha\beta}$。对二阶对称张量定义`}</Tx>
      <Eq n="14.54a" title="度规变形空间上的度规" say={R`度规空间上的"DeWitt 型"超局域度规：无迹部分与迹部分分别加权，$u>0$ 是任意常数。`}>{R`\|\delta h\|_\gamma^2=\int\dd^2\xi\,\sqrt\gamma(G^{\alpha\beta\gamma\delta}+u\gamma^{\alpha\beta}\gamma^{\gamma\delta})\delta h_{\alpha\beta}\delta h_{\gamma\delta}`}</Eq>
      <Tx>{R`其中 $u>0$ 是任意常数，`}</Tx>
      <Eq n="14.55" say={R`$G$ 只看张量的无迹部分：它与 $\gamma_{\alpha\beta}$ 缩并为零。`}>{R`G^{\alpha\beta\gamma\delta}\equiv\gamma^{\alpha\gamma}\gamma^{\beta\delta}+\gamma^{\alpha\delta}\gamma^{\beta\gamma}-\gamma^{\alpha\beta}\gamma^{\gamma\delta}.`}</Eq>
      <Tx>{R`容易验证 $G$ 是到无迹部分的投影（$\mathrm{tr}\,G^{\alpha\beta\gamma\delta}\delta h_{\gamma\delta}=\gamma_{\alpha\beta}G^{\alpha\beta\gamma\delta}\delta h_{\gamma\delta}=0$，因为二维中 $\gamma_{\alpha\beta}\gamma^{\alpha\beta}=2$），而 $u\gamma^{\alpha\beta}\gamma^{\gamma\delta}$ 是到迹部分的投影。有限维流形上，度规自然给出体积元；此处测度无法显式定义，只能用 Gauss 积分隐式定义（见例 14.2）：`}</Tx>
      <Eq n="14.56a" say={R`泛函测度的定义：Gauss 积分归一为 1——这是例 14.2 的无穷维推广。`}>{R`\int\mathcal{D}\delta h\,\exp(-\tfrac12\|\delta h\|_\gamma^2)=1.`}</Eq>
      <Tx>{R`同理，标量 $\delta\phi$、向量 $\delta v$、映射 $\delta X^\mu$ 上的度规定义为`}</Tx>
      <Eq n="14.54b" say={R`标量（Weyl 因子）的度规。`}>{R`\|\delta\phi\|_\gamma^2=\int\dd^2\xi\,\sqrt\gamma\delta\phi^2`}</Eq>
      <Eq n="14.54c" say={R`向量场（无穷小微分同胚）的度规。`}>{R`\|\delta v\|_\gamma^2=\int\dd^2\xi\,\sqrt\gamma\gamma_{\alpha\beta}\delta v^\alpha\delta v^\beta`}</Eq>
      <Eq n="14.54d" say={R`嵌入变分的度规：对 $D$ 个分量求和。`}>{R`\|\delta X\|_\gamma^2=\int\dd^2\xi\,\sqrt\gamma\delta X^\mu\delta X_\mu.`}</Eq>
      <Tx>{R`有了这些度规，测度定义为`}</Tx>
      <Eq n="14.56b" say={R`Weyl 因子的测度由 Gauss 归一化定义。`}>{R`\int\mathcal{D}\delta\phi\,\exp(-\tfrac12\|\delta\phi\|_\gamma^2)=1`}</Eq>
      <Eq n="14.56c" say={R`向量场的测度由 Gauss 归一化定义。`}>{R`\int\mathcal{D}\delta v\,\exp(-\tfrac12\|\delta v\|_\gamma^2)=1`}</Eq>
      <Eq n="14.56d" say={R`嵌入变分的测度由 Gauss 归一化定义。`}>{R`\int\mathcal{D}\delta X\,\exp(-\tfrac12\|\delta X\|_\gamma^2)=1.`}</Eq>
      <Exercise n="14.3" title="测度只有微分同胚不变性" level="★"
        hint={R`在微分同胚下 $\sqrt\gamma\,\dd^2\xi$ 是不变的体积元、各被积函数都是标量；在 Weyl 变换 $\gamma\to\mathrm{e}^{2\omega}\gamma$ 下数一数 $\mathrm{e}^{\omega}$ 的幂次。`}
        solution={R`**Diff 不变性。**设 $f$ 是微分同胚。$f^*$ 把 $\gamma$ 处的切向量 $\delta h$、$\delta X$ 拉回为 $f^*\gamma$ 处的切向量 $f^*\delta h$、$f^*\delta X$。被积函数 $\sqrt\gamma(G^{\alpha\beta\gamma\delta}+u\gamma^{\alpha\beta}\gamma^{\gamma\delta})\delta h_{\alpha\beta}\delta h_{\gamma\delta}\,\dd^2\xi$ 与 $\sqrt\gamma\,\delta X^\mu\delta X_\mu\,\dd^2\xi$ 都是由张量完全缩并得到的标量乘以不变体积元，所以 $\|f^*\delta h\|^2_{f^*\gamma}=\|\delta h\|^2_\gamma$、$\|f^*\delta X\|^2_{f^*\gamma}=\|\delta X\|^2_\gamma$（这正是 \eqref{14.65} 所用的性质）。

**Weyl 不变性被破坏。**取 $\gamma\to\mathrm{e}^{2\omega}\gamma$（$\omega$ 不是常数），$\delta X$ 不变：$\sqrt\gamma\to\mathrm{e}^{2\omega}\sqrt\gamma$，故 $\|\delta X\|^2\to\int\dd^2\xi\,\mathrm{e}^{2\omega}\sqrt\gamma\,\delta X^\mu\delta X_\mu\neq\|\delta X\|^2$。对 $\delta h$（同时让 $\delta h_{\alpha\beta}$ 随 $\gamma$ 缩放为 $\mathrm{e}^{2\omega}\delta h_{\alpha\beta}$，或者保持不变，结论相同）：两个逆度规给出 $\mathrm{e}^{-4\omega}$，$\sqrt\gamma$ 给出 $\mathrm{e}^{2\omega}$，$\delta h\delta h$ 给出 $\mathrm{e}^{4\omega}$（或 $1$），净因子 $\mathrm{e}^{2\omega}$（或 $\mathrm{e}^{-2\omega}$），逐点依赖 $\omega$，不能约掉。所以由 \eqref{14.56a} 定义的测度 $\mathcal{D}X$、$\mathcal{D}\gamma$ 依赖于共形因子——这就是共形反常 \eqref{14.84a} 的可能来源。

**注：**二维中只有 $\int\dd^2\xi\sqrt\gamma\gamma^{\alpha\beta}\partial_\alpha X\partial_\beta X$ 这种"恰好一个逆度规"的组合才是 Weyl 不变的；超局域度规不含导数，做不到这一点。`}>
        <Tx>{R`证明 $\|\delta\gamma\|_\gamma^2$ 与 $\|\delta X\|_\gamma^2$ 在 $\mathrm{Diff}${SG}$ 下不变，但在 $\mathrm{Weyl}${SG}$ 下不是不变的。这是共形反常的可能来源，见 \eqref{14.84a}。`}</Tx>
      </Exercise>
      <Tx>{R`**Diff 与 Weyl 的重叠：共形 Killing 向量。**继续之前，要先弄清 $${Diff0}${SG}$ 与 $\mathrm{Weyl}${SG}$ 的重叠。设 $\delta v\in\ker P_1$，即`}</Tx>
      <Eq n="14.57" title="共形 Killing 方程" say={R`$P_1\delta v=0$：这个无穷小微分同胚只改变度规的尺度——它的效果可以被一个 Weyl 变换完全抵消。`}>{R`P_1\delta v=\nabla_\alpha\delta v_\beta+\nabla_\beta\delta v_\alpha-\gamma_{\alpha\beta}(\nabla_\gamma\delta v^\gamma)=0.`}</Eq>
      <Tx>{R`对这样的 $\delta v$，$\delta_{\rm D}\gamma_{\alpha\beta}=(\nabla_\gamma\delta v^\gamma)\gamma_{\alpha\beta}$。$\delta v\in\ker P_1$ 就是**共形 Killing 向量**（conformal Killing vector，CKV，见 \secref{7.7}）。重要的是：若取 $\delta\phi=\nabla_\gamma\delta v^\gamma$，$\delta_{\rm D}$ 与 $\delta_{\rm W}$ 给出相同的度规变形。因此 CKV 的集合就是 $${Diff0}${SG}$ 与 $\mathrm{Weyl}${SG}$ 的重叠。设 $\Sigma_g$ 上有 $k$ 个独立的 CKV，记为 $\Phi^\alpha_s$（$1\le s\le k$）。Riemann 面理论表明`}</Tx>
      <Eq n="14.58" keyEq title="共形 Killing 向量的个数" say={R`共形 Killing 向量（实）的个数：球面 6 个（Möbius 群 $\mathrm{SL}(2,\C)$），环面 2 个（平移），高亏格没有。`}>{R`k=\begin{cases}6&g=0\\2&g=1\\0&g\ge2.\end{cases}`}</Eq>
      <Stmt id="F:teich14" />
      <Tx>{R`（\eqref{14.58} 与 \eqref{14.38} 都可以由 Riemann–Roch 定理加上一个"负次数线丛无全纯截面"的论证推出，见上面的陈述与交互图 2。）把 $\delta v$ 分成 CKV 生成的部分与其正交补：`}</Tx>
      <Eq n="14.59" say={R`向量场 = 与 CKV 正交的部分 + CKV 的线性组合（$k$ 个有限维参数 $\delta a^s$）。`}>{R`\delta v^\alpha=\delta\tilde v^\alpha+\delta a^s\Phi^\alpha_s.`}</Eq>
      <Tx>{R`切向量 $\delta X$ 也相应分解：`}</Tx>
      <Eq n="14.60" say={R`嵌入的变分同样分为三部分：真正的嵌入变化、非 CKV 微分同胚、CKV 引起的移动。`}>{R`\delta X=\delta\tilde X+\delta\tilde v^\alpha\partial_\alpha\tilde X^\mu+\delta a^s\Phi^\alpha_s\partial_\alpha\tilde X^\mu.`}</Eq>
      <Tx>{R`泛函测度变为`}</Tx>
      <Eq n="14.61" say={R`新的积分变量：$n$ 个模参数、Weyl 因子、非 CKV 微分同胚、$k$ 个 CKV 参数、约化嵌入。`}>{R`\mathcal{D}\delta\gamma\mathcal{D}\delta X\to J\,\dd^n\delta t\,\mathcal{D}\delta\phi\mathcal{D}\delta\tilde v\,\dd^k\delta a\,\mathcal{D}\delta\tilde X`}</Eq>
      <Tx>{R`这里注意到 $t$ 与 $a$ 参数是有限维的。设 $${DP}${SG}$ 是 $${Diff0}${SG}$ 中与 CKV 正交的子空间。于是`}</Tx>
      <Eq n="14.62" say={R`微分同胚恒等分支的体积 = 与 CKV 正交部分的体积 $\times$ CKV 群的体积。`}>{R`V(${Diff0})=V(${DP})\cdot V(${CKV})`}</Eq>
      <Eq n="14.63" say={R`因为 CKV 同时属于 Diff 与 Weyl，规范群的体积要扣掉一次 CKV 的体积，避免重复。`}>{R`\begin{aligned}V(${Diff0}*${Weyl})&=V(${DP})V(${Weyl})\\&=V(${Diff0})V(${Weyl})/V(${CKV}).\end{aligned}`}</Eq>
      <Tx>{R`**在一般的点上做分解。**取 $\mathcal{M}_g$ 中的一个切片 $\hat\gamma(t)$，由 $n$ 个 Teichmüller 参数参数化。任何与 $\hat\gamma$ 由 $G=\mathrm{Diff}${SG}*\mathrm{Weyl}${SG}$ 相联系的度规 $\tilde\gamma$ 都写成`}</Tx>
      <Eq n="14.64" say={R`任一度规 = 切片上的代表先做 Weyl 变换、再做微分同胚。`}>{R`\tilde\gamma=f^*(\mathrm{e}^\phi\hat\gamma)\qquad f\in\mathrm{Diff}${SG},\ \mathrm{e}^\phi\in\mathrm{Weyl}${SG}.`}</Eq>
      <Tx>{R`把 $\tilde\gamma$ 处的小变形 $\delta\tilde\gamma$ 表示为 $\gamma\equiv\mathrm{e}^{\delta\phi}\hat\gamma$ 处变形 $\delta\gamma$ 的拉回：$\delta\tilde\gamma=f^*(\delta\gamma)$。注意 $\delta\gamma$ 是 $${Diff0}${SG}$ *原点*附近的小微分同胚引起的，因而可以用向量场 $\delta v$ 描述。由习题 14.3，$\mathrm{Diff}${SG}$ 是相关向量空间的等距，于是`}</Tx>
      <Eq n="14.65" say={R`切空间的度规在微分同胚下不变：只需在 $\gamma=\mathrm{e}^\phi\hat\gamma$ 处计算，结果对整条规范轨道都成立。`}>{R`\|\delta\tilde\gamma\|_{\tilde\gamma}^2=\|f^*(\delta\gamma)\|_{f^*\gamma}^2=\|\delta\gamma\|_\gamma^2\qquad\gamma=\mathrm{e}^\phi\hat\gamma.`}</Eq>
      <Tx>{R`在点 $\gamma$ 处把 $\delta\gamma$ 分解为`}</Tx>
      <Eq n="14.66" say={R`在 $\gamma$ 处的分解：重新定义的 Weyl 参数、非 CKV 微分同胚的无迹部分、Teichmüller 形变的无迹部分。`}>{R`\delta\gamma_{\alpha\beta}=\delta\phi\gamma_{\alpha\beta}+(P_1\delta\tilde v)_{\alpha\beta}+\delta t^iT_{i\alpha\beta}`}</Eq>
      <Tx>{R`其中 $\delta\phi$ 已重新定义，包含了 Teichmüller 形变的迹部分与 $\nabla_\alpha\delta v_\beta+\nabla_\beta\delta v_\alpha$ 的迹部分，见 \eqref{14.51}。`}</Tx>
      <Exercise n="14.4" title={R`$T_i$ 在 Weyl 变换下的行为`} level="★"
        hint={R`$\gamma_{\alpha\beta}=\mathrm{e}^\phi\hat\gamma_{\alpha\beta}$，其中 $\phi$ 一般也依赖 $t^i$。对 $t^i$ 求导时多出的项是纯迹，被 \eqref{14.49} 的减迹去掉。`}
        solution={R`$\frac{\partial\gamma_{\alpha\beta}}{\partial t^i}=\mathrm{e}^\phi\frac{\partial\hat\gamma_{\alpha\beta}}{\partial t^i}+\frac{\partial\phi}{\partial t^i}\mathrm{e}^\phi\hat\gamma_{\alpha\beta}$。迹部分：$\frac12\gamma_{\alpha\beta}\gamma^{\gamma\delta}\frac{\partial\gamma_{\gamma\delta}}{\partial t^i}=\frac12\mathrm{e}^\phi\hat\gamma_{\alpha\beta}\,\mathrm{e}^{-\phi}\hat\gamma^{\gamma\delta}\big(\mathrm{e}^\phi\frac{\partial\hat\gamma_{\gamma\delta}}{\partial t^i}+\frac{\partial\phi}{\partial t^i}\mathrm{e}^\phi\hat\gamma_{\gamma\delta}\big)=\mathrm{e}^\phi\big(\frac12\hat\gamma_{\alpha\beta}\hat\gamma^{\gamma\delta}\frac{\partial\hat\gamma_{\gamma\delta}}{\partial t^i}+\frac{\partial\phi}{\partial t^i}\hat\gamma_{\alpha\beta}\big)$（用了 $\hat\gamma^{\gamma\delta}\hat\gamma_{\gamma\delta}=2$）。相减，含 $\partial\phi/\partial t^i$ 的两项相消：

$$T_{i\alpha\beta}=\mathrm{e}^\phi\Big(\frac{\partial\hat\gamma_{\alpha\beta}}{\partial t^i}-\frac12\hat\gamma_{\alpha\beta}\hat\gamma^{\gamma\delta}\frac{\partial\hat\gamma_{\gamma\delta}}{\partial t^i}\Big)=\mathrm{e}^\phi\hat T_{i\alpha\beta}.$$

（无迹部分在 Weyl 变换下只是整体乘以 $\mathrm{e}^\phi$——它属于 $\mathcal{T}^{\pm2}$，"形状"信息不受尺度影响。）`}>
        <Tx>{R`证明 $\gamma$ 处的 $T_{i\alpha\beta}$ 与 $\hat\gamma$ 处的 $\hat T_{i\alpha\beta}$ 的关系为`}</Tx>
        <Eq n="14.67" say={R`Teichmüller 形变的无迹部分在 Weyl 变换下只整体乘以共形因子。`}>{R`T_{i\alpha\beta}=\mathrm{e}^\phi\hat T_{i\alpha\beta}.`}</Eq>
      </Exercise>
      <Tx>{R`**第一步：分出 CKV。**先求换元 $\mathcal{D}\delta v\to\mathcal{D}\delta\tilde v\,\dd^k\delta a$ 的 Jacobi 行列式。由 \eqref{14.56c}：`}</Tx>
      <Eq n="14.68a" say={R`把向量场测度拆成"正交于 CKV 的部分"与"$k$ 个 CKV 系数"；后者的 Gauss 积分给出 CKV 内积矩阵的 $\det^{-1/2}$。`}>{R`\begin{aligned}1&=\int\mathcal{D}\delta v\,\exp(-\tfrac12\|\delta v\|_\gamma^2)\\&=J\int\mathcal{D}\delta\tilde v\,\dd^k\delta a\,\exp(-\tfrac12\|\delta\tilde v\|_\gamma^2-\tfrac12\|\delta a^s\Phi_s\|_\gamma^2)\\&=J[\det(\Phi_s,\Phi_r)]^{-1/2}\end{aligned}`}</Eq>
      <Tx>{R`其中`}</Tx>
      <Eq n="14.68b" say={R`CKV 之间的内积（Gram 矩阵）：它们一般不正交归一。`}>{R`(\Phi_s,\Phi_r)=\int\dd^2\xi\,\sqrt\gamma\gamma_{\alpha\beta}\Phi^\alpha_s\Phi^\beta_r.`}</Eq>
      <Tx>{R`[**注：**矩阵元 \eqref{14.68b} 是在 $\gamma=\mathrm{e}^\phi\hat\gamma$ 处定义的。下面说明 CKV 本身可以取作与 $\mathrm{e}^\phi$ 无关。取度规 $\hat\gamma$ 的 CKV $\hat\Phi^\alpha_s$：$\hat\nabla_\alpha\hat\Phi_{s\beta}+\hat\nabla_\beta\hat\Phi_{s\alpha}=\hat\gamma_{\alpha\beta}\hat\nabla_\gamma\hat\Phi^\gamma_s$，$\hat\nabla$ 是 $\hat\gamma$ 的协变导数，$\hat\Phi_{s\alpha}\equiv\hat\gamma_{\alpha\beta}\hat\Phi^\beta_s$。简单的计算表明 $\Phi_{s\alpha}=\gamma_{\alpha\beta}\hat\Phi^\beta_s=\mathrm{e}^\phi\hat\Phi_{s\alpha}$ 满足

$$\begin{aligned}\nabla_\alpha\Phi_{s\beta}+\nabla_\beta\Phi_{s\alpha}&=\mathrm{e}^\phi(\hat\nabla_\alpha\hat\Phi_{s\beta}+\hat\nabla_\beta\hat\Phi_{s\alpha}+\hat\gamma_{\alpha\beta}\Phi^\gamma_s\partial_\gamma\phi)\\&=\mathrm{e}^\phi\hat\gamma_{\alpha\beta}(\hat\nabla_\gamma\Phi^\gamma_s+\Phi^\gamma_s\partial_\gamma\phi)=\gamma_{\alpha\beta}\nabla_\gamma\Phi^\gamma_s\end{aligned}$$

（第一行是 $\mathcal{L}_\Phi(\mathrm{e}^\phi\hat\gamma)=\mathrm{e}^\phi(\mathcal{L}_\Phi\hat\gamma+\Phi^\gamma\partial_\gamma\phi\,\hat\gamma)$；第二行用 $\nabla_\gamma\Phi^\gamma=\frac{1}{\sqrt\gamma}\partial_\gamma(\sqrt\gamma\Phi^\gamma)=\hat\nabla_\gamma\Phi^\gamma+\Phi^\gamma\partial_\gamma\phi$。）$\nabla$ 是 $\gamma$ 的协变导数。因此 $\Phi^\alpha_s=\hat\Phi^\alpha_s$ 也是度规 $\gamma=\mathrm{e}^\phi\hat\gamma$ 的 CKV：CKV 可以取作与 $\phi$ 无关。] 由 \eqref{14.68a}：`}</Tx>
      <Box kind="warning" title={R`存疑：$(\Phi_s,\Phi_r)$ 是否与 $\mathrm{e}^\phi$ 无关（p.563）`}>{R`原书的注说"可以证明矩阵元 \eqref{14.68b} 与 $\mathrm{e}^\phi$ 无关"，但随后的计算证明的是**向量场** $\Phi^\alpha_s$ 与 $\phi$ 无关（$\ker P_1$ 在 Weyl 变换下不变）。矩阵元本身 $\int\dd^2\xi\sqrt\gamma\gamma_{\alpha\beta}\Phi^\alpha_s\Phi^\beta_r=\int\dd^2\xi\,\mathrm{e}^{2\phi}\sqrt{\hat\gamma}\hat\gamma_{\alpha\beta}\Phi^\alpha_s\Phi^\beta_r$ 显然依赖 $\phi$。这种依赖与测度本身的 Weyl 依赖性质相同，在 $D=26$ 时整个规范固定后的被积式是 Weyl 不变的（这是现代处理，如 Polchinski 第 5 章的结论）；本章后面只在平坦度规（$\phi=0$）上用到 \eqref{14.68b}，结果不受影响。本站保留原书的推导，仅把注的结论改为"CKV 与 $\phi$ 无关"。`}</Box>
      <Eq n="14.69" say={R`向量场测度 = CKV Gram 矩阵的 $\det^{1/2}$ $\times$ 正交部分测度 $\times$ CKV 系数测度。`}>{R`\mathcal{D}\delta v=[\det(\Phi_r,\Phi_s)]^{1/2}\mathcal{D}\delta\tilde v\,\dd^k\delta a.`}</Eq>
      <Tx>{R`现在总测度写成`}</Tx>
      <Eq n="14.70" say={R`总测度：剩下的未知 Jacobi 因子 $J$ 负责其余的换元。`}>{R`J[\det(\Phi_r,\Phi_s)]^{1/2}\dd^nt\,\mathcal{D}\delta\phi\mathcal{D}\delta\tilde v\,\dd^k\delta a\,\mathcal{D}\delta\tilde X`}</Eq>
      <Tx>{R`其中 $J$ 负责其余的变量替换。

**第二步：求 $J$。**由 \eqref{14.60}、\eqref{14.66}、\eqref{14.70} 与测度的定义 \eqref{14.56a}：`}</Tx>
      <Eq n="14.71" say={R`把所有 Gauss 积分写在一起：新变量的二次型由一个分块矩阵 $M$ 给出，Jacobi 因子就是 $\det^{1/2}(M^\dagger M)$ 的倒数。`}>{R`\begin{aligned}1&=\int\mathcal{D}\delta\gamma\mathcal{D}\delta X\exp(-\tfrac12\|\delta\gamma\|_\gamma^2-\tfrac12\|\delta X\|_\gamma^2)\\&=J\det{}^{1/2}(\Phi,\Phi)\int\dd^n\delta t\,\mathcal{D}\delta\tilde v\mathcal{D}\delta\phi\,\dd^k\delta a\,\mathcal{D}\delta\tilde X\\&\quad\times\exp\Big[-\frac12\Big\|\delta\phi\gamma_{\alpha\beta}+(P_1\delta\tilde v)_{\alpha\beta}+\delta t^i\frac{\partial\gamma_{\alpha\beta}}{\partial t^i}\Big\|^2-\frac12\|\delta\tilde X+\delta\tilde v^\alpha\partial_\alpha\tilde X+\delta a^s\Phi^\alpha_s\partial_\alpha\tilde X\|^2\Big]\\&=J\det{}^{1/2}(\Phi,\Phi)\int\dd^n\delta t\,\mathcal{D}\delta\tilde v\ldots\exp(-\tfrac12\|M\mathcal{V}\|^2)\end{aligned}`}</Eq>
      <Tx>{R`其中（列向量 $\mathcal{V}$ 依次为 $\delta t,\delta\phi,\delta\tilde v,\delta a,\delta\tilde X$；矩阵 $M$ 的第一行给出 $\delta\gamma$，第二行给出 $\delta X$；前三列组成 $A$、$C$，后两列组成 $0$、$B$）`}</Tx>
      <Eq n="14.72" say={R`$\delta\gamma$ 不含 $\delta a$、$\delta\tilde X$（CKV 不改变无迹度规），所以 $M$ 是分块下三角的：$\det M=\det A\det B$。`}>{R`\mathcal{V}=\begin{pmatrix}\delta t\\ \delta\phi\\ \delta\tilde v\\ \delta a\\ \delta\tilde X\end{pmatrix}\qquad M=\begin{pmatrix}\partial\gamma/\partial t&\gamma&P_1&0&0\\ 0&0&\partial\tilde X&\Phi\cdot\partial\tilde X&1\end{pmatrix}\equiv\begin{pmatrix}A&0\\ C&B\end{pmatrix}.`}</Eq>
      <Tx>{R`指数中的矩阵为`}</Tx>
      <Eq n="14.73" say={R`$M^\dagger M$ 可以分解为两个分块三角矩阵之积，行列式因而因式分解为 $\det(A^\dagger A)\det(B^\dagger B)$。`}>{R`\begin{aligned}M^\dagger M&=\begin{pmatrix}A^\dagger&C^\dagger\\ 0&B^\dagger\end{pmatrix}\begin{pmatrix}A&0\\ C&B\end{pmatrix}=\begin{pmatrix}A^\dagger A+C^\dagger C&C^\dagger B\\ B^\dagger C&B^\dagger B\end{pmatrix}\\&=\begin{pmatrix}I&*\\ 0&B^\dagger B\end{pmatrix}\begin{pmatrix}A^\dagger A&0\\ **&I\end{pmatrix}\end{aligned}`}</Eq>
      <Tx>{R`其中 $*$ 与 $**$ 无关紧要。最后一个表达式由恒等式

$$\begin{pmatrix}A&B\\ C&D\end{pmatrix}=\begin{pmatrix}I&B\\ 0&D\end{pmatrix}\begin{pmatrix}A-BD^{-1}C&0\\ D^{-1}C&I\end{pmatrix}$$

得到（此处用于 $M^\dagger M$，左上块的 Schur 补 $A^\dagger A+C^\dagger C-C^\dagger B(B^\dagger B)^{-1}B^\dagger C=A^\dagger A$，因为 $B$ 可逆）。\eqref{14.71} 中的 Gauss 积分立即给出`}</Tx>
      <Eq n="14.74" say={R`Gauss 积分给出 $\det^{-1/2}(M^\dagger M)$，它分解为度规部分 $A$ 与嵌入部分 $B$ 的贡献之积。`}>{R`\begin{aligned}1&=J\det{}^{1/2}(\Phi,\Phi)\det{}^{-1/2}(M^\dagger M)\\&=J\det{}^{1/2}(\Phi,\Phi)[\det(A^\dagger A)\det(B^\dagger B)]^{-1/2}.\end{aligned}`}</Eq>
      <Tx>{R`**第三步：算 $\det^{1/2}(A^\dagger A)$。**需要计算 $\|\delta\gamma\|_\gamma^2$：`}</Tx>
      <Eq n="14.75" say={R`把分解式代入度规：迹部分与无迹部分正交，但 Teichmüller 形变与微分同胚一般不正交——留下交叉项。`}>{R`\begin{aligned}\|\delta\gamma\|_\gamma^2&=\int\dd^2\xi\,\sqrt\gamma(G^{\alpha\beta\gamma\delta}+u\gamma^{\alpha\beta}\gamma^{\gamma\delta})\\&\quad\times[\delta\phi\gamma_{\alpha\beta}+(P_1\delta\tilde v)_{\alpha\beta}+\delta t^iT_{i\alpha\beta}][\delta\phi\gamma_{\gamma\delta}+(P_1\delta\tilde v)_{\gamma\delta}+\delta t^jT_{j\gamma\delta}]\\&=4u\|\delta\phi\|_\gamma^2+\|P_1\delta\tilde v\|^2+\delta t^i\delta t^j(T_i,T_j)+2\delta t^i(P_1\delta\tilde v,T_i).\end{aligned}`}</Eq>
      <Tx>{R`（$4u$ 来自 $u\gamma^{\alpha\beta}\gamma^{\gamma\delta}\gamma_{\alpha\beta}\gamma_{\gamma\delta}=4u$；无迹张量之间的内积记作 $(\cdot,\cdot)$。）

**$P_1$ 的伴随。**一般地 $T_i$ 与 $P_1\delta v$ 不正交。为了把 $T_i$ 分成与 $P_1\delta v$ 正交和平行的部分，需要定义 $P_1$ 的伴随 $P_1^\dagger$。$P_1$ 是把向量场映到无迹对称张量场的椭圆算子，所以 $P_1^\dagger$ 把无迹对称张量映到向量。对无迹对称张量 $\delta h$：

$$\begin{aligned}(P_1\delta v,\delta h)&=\int\dd^2\xi\,\sqrt\gamma G^{\alpha\beta\gamma\delta}(P_1\delta v)_{\alpha\beta}\delta h_{\gamma\delta}\\&=\int\dd^2\xi\,\sqrt\gamma(\nabla^\alpha\delta v^\beta+\nabla^\beta\delta v^\alpha)\delta h_{\alpha\beta}\\&=\int\dd^2\xi\,\sqrt\gamma\delta v^\alpha(-2\nabla^\beta)\delta h_{\alpha\beta}\equiv(\delta v,P_1^\dagger\delta h)\end{aligned}$$

最后的内积按 \eqref{14.54c} 定义。于是`}</Tx>
      <Eq n="14.76" keyEq title={R`$P_1$ 的伴随`} say={R`$P_1^\dagger$ 是无迹张量的散度：它的核——无散的无迹对称张量——就是全纯二次微分，对应模参数。`}>{R`(P_1^\dagger\delta h)_\alpha=-2\nabla^\beta\delta h_{\alpha\beta}.`}</Eq>
      <Box kind="warning" title={R`注：一个常数因子（p.565）`}>{R`按 \eqref{14.55}，$G^{\alpha\beta\gamma\delta}(P_1\delta v)_{\alpha\beta}\delta h_{\gamma\delta}=2(P_1\delta v)^{\gamma\delta}\delta h_{\gamma\delta}$（$\delta h$ 无迹），上面第二行严格说应多一个因子 2，从而 $P_1^\dagger\delta h=-4\nabla^\beta\delta h_{\alpha\beta}$。这只相当于给无迹张量的内积换一个常数归一化，不改变 $\ker P_1^\dagger$，对行列式也只贡献常数，原书（与本站）在后面一律略去这类常数。`}</Box>
      <Tx>{R`**正交分解。**设 $\delta h$ 与所有 $P_1\delta v$ 正交。由上，$(P_1\delta v,\delta h)=(\delta v,P_1^\dagger\delta h)=0$；由于 $\delta v$ 任意，$\delta h$ 必属于 $\ker P_1^\dagger$（\figref{14.4}）。于是 $T_i$ 可以分解为`}</Tx>
      <Figure n="14.4" caption={R`映射 $P_1$ 及其伴随 $P_1^\dagger$。`} width="55%" />
      <Eq n="14.77a" say={R`Teichmüller 形变 = 与规范方向正交的部分 + 落在规范方向（$\operatorname{im}P_1$）中的部分。`}>{R`T_i=\mathcal{P}_0T_i+\mathcal{P}_\perp T_i`}</Eq>
      <Tx>{R`其中投影算子 $\mathcal{P}_0$ 与 $\mathcal{P}_\perp$ 定义为`}</Tx>
      <Eq n="14.77b" say={R`$\mathcal{P}_\perp$ 投影到 $P_1$ 的像（规范方向），$\mathcal{P}_0$ 投影到 $\ker P_1^\dagger$（物理方向）。`}>{R`\mathcal{P}_0\equiv1-P_1\frac{1}{P_1^\dagger P_1}P_1^\dagger\qquad\mathcal{P}_\perp\equiv P_1\frac{1}{P_1^\dagger P_1}P_1^\dagger.`}</Eq>
      <Tx>{R`容易验证 $\mathcal{P}_0+\mathcal{P}_\perp=1$、$\mathcal{P}_0\mathcal{P}_\perp=0$、$P_1^\dagger\mathcal{P}_0=0$、$P_1^\dagger\mathcal{P}_\perp=P_1^\dagger$；对 $T_i\in\ker P_1^\dagger$ 有 $\mathcal{P}_0T_i=T_i$、$\mathcal{P}_\perp T_i=0$，等等。（$1/P_1^\dagger P_1$ 理解为在 $(\ker P_1)^\perp$ 上的逆。）因此 \eqref{14.77a} 是 $T_i$ 的正交分解。写 $\mathcal{P}_\perp T_i=P_1u_i$，其中

$$u_i=\frac{1}{P_1^\dagger P_1}P_1^\dagger T_i.$$

设 $\{\psi_r\}$（$1\le r\le n$）是 $\ker P_1^\dagger$ 的一组实基（不必正交归一）。于是 $T_i$ 可展开为（\figref{14.5}）`}</Tx>
      <Figure n="14.5" caption={R`$\{T_i\}$ 张成与规范切片相切的形变，$\{\psi_r\}$ 张成 $\ker P_1^\dagger$。`} width="50%" />
      <Eq n="14.78" say={R`把 Teichmüller 形变写成"物理基 $\psi_r$ 的组合 + 规范方向 $P_1u_i$"。`}>{R`T_i=\sum_r\psi_rQ_{ri}+P_1u_i.`}</Eq>
      <Tx>{R`用 $\psi_r$ 与 $T_i$ 作内积（$\psi$ 与 $P_1u_i$ 正交），得`}</Tx>
      <Eq n="14.79" say={R`展开系数：$T_i$ 在非正交基 $\psi_r$ 上的投影要乘以 Gram 矩阵的逆。`}>{R`Q_{ri}=\sum_s[(\psi,\psi)^{-1}]_{rs}(\psi_s,T_i).`}</Eq>
      <Tx>{R`最终，$\delta\gamma$ 分解为两两正交的部分：`}</Tx>
      <Eq n="14.80a" say={R`度规变形的正交分解：Weyl 部分 + 规范部分（$P_1$ 的像，把 $T_i$ 的规范分量也吸收进去）+ 物理部分（$\ker P_1^\dagger$）。`}>{R`\delta\gamma=\delta\phi\gamma+P_1(\delta\tilde v+\delta t^iu_i)+\delta t^i\psi_rQ_{ri}.`}</Eq>
      <Tx>{R`相应地，度规变形的空间 $\{\delta\gamma\}$ 分解为直和`}</Tx>
      <Eq n="14.80b" keyEq title="度规变形空间的正交分解" say={R`度规变形 = 共形（Weyl）方向 $\oplus$ 微分同胚方向 $\oplus$ 模方向：本章最重要的几何分解。`}>{R`\{\delta\gamma\}=\{\text{conf}\}\oplus\{\operatorname{im}P_1\}\oplus\{\ker P_1^\dagger\}.`}</Eq>
      <Tx>{R`把 \eqref{14.80a} 代入 \eqref{14.75}，得`}</Tx>
      <Eq n="14.81" say={R`在正交分解下度规变成"对角"的：Weyl、规范与模三部分各自独立。`}>{R`\begin{aligned}\|\delta\gamma\|^2&=4u\|\delta\phi\|^2+\|P_1\delta\bar v\|^2\\&\quad+\delta t^i\delta t^j(T_i,\psi_r)_\gamma[(\psi,\psi)_\gamma^{-1}]_{rs}(\psi_s,T_j)_\gamma\end{aligned}`}</Eq>
      <Tx>{R`其中 $\delta\bar v\equiv\delta\tilde v+\delta t^iu_i$，最后一项中的逆指的是矩阵 $(a_{rs})=((\psi_r,\psi_s))$ 的逆。令 $\mathcal{V}_1^{\rm t}=(\delta t,\delta\phi,\delta\bar v)$，得`}</Tx>
      <Eq n="14.82" say={R`三个 Gauss 积分：Weyl 方向给常数，规范方向给鬼行列式 $\det P_1^\dagger P_1$，模方向给有限维的 Jacobi 因子 $\det(T,\psi)^2/\det(\psi,\psi)$。`}>{R`\begin{aligned}\det{}^{-1/2}(A^\dagger A)&=\int\dd^n\delta t\,\mathcal{D}\delta\phi\mathcal{D}\delta\bar v\exp(-\tfrac12\mathcal{V}_1^{\rm t}A^\dagger A\mathcal{V}_1)\\&=\int\mathcal{D}\delta\phi\exp(-2u\|\delta\phi\|^2)\int\mathcal{D}\delta\bar v\exp(-\tfrac12\|P_1\bar v\|^2)\\&\quad\times\int\dd^n\delta t\exp\{-\tfrac12\delta t^i(T_i,\psi_r)[(\psi,\psi)^{-1}]_{rs}(\psi_s,T_j)\delta t^j\}\\&\propto(\det P_1^\dagger P_1)^{-1/2}\Big(\frac{\det(T,\psi)^2}{\det(\psi,\psi)}\Big)^{-1/2}.\end{aligned}`}</Eq>
      <Derivation title="补：最后一个有限维 Gauss 积分" collapsed steps={[
        { tex: R`Q_{ij}\equiv(T_i,\psi_r)[(\psi,\psi)^{-1}]_{rs}(\psi_s,T_j)=[(T,\psi)(\psi,\psi)^{-1}(T,\psi)^{\rm t}]_{ij}`, why: R`$(T,\psi)$ 是 $n\times n$ 方阵（$\dim\ker P_1^\dagger=n=$ 模参数个数）。` },
        { tex: R`\int\dd^n\delta t\,\exp(-\tfrac12\delta t^{\rm t}Q\,\delta t)\propto(\det Q)^{-1/2}=\Big(\frac{\det(T,\psi)^2}{\det(\psi,\psi)}\Big)^{-1/2}`, why: R`$\det(ABA^{\rm t})=\det A^2\det B$。` },
        { tex: R`\int\mathcal{D}\delta\bar v\exp(-\tfrac12\|P_1\delta\bar v\|^2)=\int\mathcal{D}\delta\bar v\exp(-\tfrac12(\delta\bar v,P_1^\dagger P_1\delta\bar v))=(\det P_1^\dagger P_1)^{-1/2}`, why: R`$\delta\bar v\perp\ker P_1$，所以这里的行列式实际上是去掉零模的 $\det'$。` },
      ]} />
      <Tx>{R`合并 \eqref{14.71} 与 \eqref{14.82}，得

$$1=J\det{}^{1/2}(\Phi,\Phi)\det{}^{-1/2}B^\dagger B\det{}^{-1/2}P_1^\dagger P_1\Big(\frac{\det(T,\psi)^2}{\det(\psi,\psi)}\Big)^{-1/2}.$$

于是 $g$ 圈配分函数为`}</Tx>
      <Eq n="14.83" say={R`Faddeev–Popov 之后的配分函数：模参数积分 $\times$ 规范体积（Weyl 与微分同胚）$\times$ 鬼行列式与模的 Jacobi 因子 $\times$ 嵌入部分，再除以规范群体积。`}>{R`\begin{aligned}Z_g&=\int\frac{\dd^nt\,\mathcal{D}\bar v\mathcal{D}\phi\mathcal{D}\tilde X}{V(${Diff}*${Weyl})}\det{}^{1/2}B^\dagger B\det{}^{-1/2}(\Phi,\Phi)\\&\quad\times\Big(\det P_1^\dagger P_1\frac{\det(T,\psi)^2}{\det(\psi,\psi)}\Big)^{1/2}\mathrm{e}^{-S}.\end{aligned}`}</Eq>
      <Box kind="warning" title={R`勘误：\eqref{14.83} 的积分测度（p.567）`}>{R`原书 \eqref{14.83} 分子印作 "$\dd^nt\,\mathcal{D}\bar v\mathcal{D}\phi\det\tilde X$"。这里应是约化嵌入的泛函测度 $\mathcal{D}\tilde X$（与紧接着的 \eqref{14.85} 一致）；"$\det\tilde X$" 没有意义。正文已改正。`}</Box>
      <Tx>{R`对 $a$（CKV）的积分已经略去，因为它已经包含在 $\phi$ 积分中。天真地看，对 $\bar v$ 的积分给出 $V(${DP})$，对 $\phi$ 的积分给出 $V(${Weyl})$。

**共形反常与临界维数。**然而，如习题 14.3 所示，测度 $\mathcal{D}X$ 与 $\mathcal{D}\gamma$ 依赖于共形因子。Polyakov (1981) 证明了在共形变换 $\gamma\to\mathrm{e}^{2\phi}\gamma$ 下，测度按下式变换：`}</Tx>
      <Eq n="14.84a" keyEq title="物质测度的共形反常" say={R`在 Weyl 变换下，$D$ 个标量场的测度多出一个 Liouville 作用量的指数，系数正比于 $D$（每个 $X^\mu$ 贡献中心荷 1）。`}>{R`\mathcal{D}X\to\exp\Big(\frac{D}{24\pi}\int\dd^2\xi\,\sqrt\gamma(\gamma^{\alpha\beta}\partial_\alpha\phi\partial_\beta\phi+\mathcal{R}\phi)\Big)\mathcal{D}X`}</Eq>
      <Eq n="14.84b" title="度规测度（鬼场）的共形反常" say={R`度规测度（等价地，Faddeev–Popov 鬼场）贡献同样形式的反常，系数为 $-26$。两者相加为零当且仅当 $D=26$。`}>{R`\mathcal{D}\gamma\to\exp\Big(\frac{-26}{24\pi}\int\dd^2\xi\,\sqrt\gamma(\gamma^{\alpha\beta}\partial_\alpha\phi\partial_\beta\phi+\mathcal{R}\phi)\Big)\mathcal{D}\gamma.`}</Eq>
      <Stmt id="X:polyakov14" />
      <Box kind="warning" title={R`勘误：反常系数 $\frac{c}{24\pi}$（p.567）`}>{R`原书 \eqref{14.84a} 的系数印作 $\frac{D}{24\pi^2}$、$\frac{-26}{24\pi^2}$。在 $\int\dd^2\xi\sqrt\gamma\mathcal{R}=4\pi\chi$ 的归一化下（\eqref{14.31} 下方），中心荷 $c$ 的理论在 $\gamma\to\mathrm{e}^{2\phi}\gamma$ 下 $\ln Z$ 改变 $\frac{c}{24\pi}\int\sqrt\gamma(\gamma^{\alpha\beta}\partial_\alpha\phi\partial_\beta\phi+\mathcal{R}\phi)$（Polyakov 1981；参见 Polchinski《String Theory》第 3 章关于 Weyl 反常与 Liouville 作用量的讨论）。检验：$\phi$ 为常数时它给出 $\frac{c}{24\pi}\phi\cdot4\pi\chi=\frac{c\chi}{6}\phi$，即熟知的 $Z\propto L^{c\chi/6}$ 标度律；若系数是 $\frac{c}{24\pi^2}$，指数就成了 $\frac{c\chi}{6\pi}$。正文已改为 $\frac{D}{24\pi}$、$\frac{-26}{24\pi}$；$D=26$ 的结论与系数无关。`}</Box>
      <Tx>{R`因此测度 $\mathcal{D}X\mathcal{D}\gamma$ 共形不变**当且仅当 $D=26$**。数 26 称为**临界维数**（critical dimension）。此后总假设 $D=26$。这时 $\int\mathcal{D}\phi=V(${Weyl})$、$\int\mathcal{D}\bar v=V(${DP})$ 与分母 $V(${Diff}*${Weyl})=|${MCG}|V(${DP})V(${Weyl})$（\eqref{14.40}、\eqref{14.63}）相消，\eqref{14.83} 化为`}</Tx>
      <Eq n="14.85" say={R`$D=26$ 时 Weyl 体积与非 CKV 微分同胚的体积整体消掉，只剩映射类群的阶 $|\mathrm{MCG}|$ 与有限维的模积分。`}>{R`\begin{aligned}Z_g&=\frac{1}{|${MCG}|}\int\dd^nt\,\mathcal{D}\tilde X\det{}^{1/2}B^\dagger B\det{}^{-1/2}(\Phi,\Phi)\\&\quad\times\Big(\det P_1^\dagger P_1\frac{\det(T,\psi)^2}{\det(\psi,\psi)}\Big)^{1/2}\mathrm{e}^{-S}.\end{aligned}`}</Eq>
      <Tx>{R`**对 $X$ 积分。**先消去 $\det^{1/2}B^\dagger B$：

$$\begin{aligned}1&=\int\mathcal{D}\delta X\exp(-\tfrac12\|\delta X\|^2)\\&=J\int\mathcal{D}\delta\tilde X\,\dd^k\delta a\,\exp(-\tfrac12\|\delta\tilde X+\delta a^s\Phi^\alpha_s\partial_\alpha\tilde X\|^2)\\&=J\int\mathcal{D}\delta\tilde X\exp(-\tfrac12\|\delta\tilde X\|^2)\int\dd^k\delta a\,\exp(-\tfrac12\|\delta a^s\Phi^\alpha_s\partial_\alpha\tilde X\|^2)\\&=J\det{}^{-1/2}(B^\dagger B)\end{aligned}$$

所以 $\det^{1/2}(B^\dagger B)$ 就是换元 $X\to(\tilde X,a)$ 的 Jacobi 行列式。于是`}</Tx>
      <Eq n="14.86" say={R`$\det^{1/2}B^\dagger B$ 把约化嵌入的积分还原为对全部嵌入的积分，代价是除以 CKV 群的体积。`}>{R`\int\mathcal{D}\tilde X\det{}^{1/2}B^\dagger B\,\mathrm{e}^{-S}=\int\frac{\mathcal{D}X}{V(${CKV})}\mathrm{e}^{-S}`}</Eq>
      <Tx>{R`其中 $V(${CKV})=\int\dd^ka$ 是 CKV 的体积。

对 $X$ 的积分容易完成。写`}</Tx>
      <Eq n="14.87a" say={R`Polyakov 作用量是 $X$ 的二次型：对 $X$ 的路径积分是 Gauss 积分。`}>{R`\int_{\mathcal{E}}\mathcal{D}X\,\mathrm{e}^{-S}=\int_{\mathcal{E}}\mathcal{D}X\,\exp[-\tfrac12(X,\Delta X)]`}</Eq>
      <Tx>{R`其中`}</Tx>
      <Eq n="14.87b" title="标量 Laplace 算子" say={R`作用在函数（零形式）上的 Laplace–Beltrami 算子（取正号约定，谱非负）。`}>{R`\Delta=-\frac{1}{\sqrt\gamma}\partial_\alpha\sqrt\gamma\gamma^{\alpha\beta}\partial_\beta`}</Eq>
      <Tx>{R`是作用在零形式上的 Laplace 算子，见 \eqref{7.188}。写出 \eqref{14.87a} 的显式形式。设 $\psi_n$ 是 $\Delta$ 的本征函数：`}</Tx>
      <Eq n="14.88" say={R`标量 Laplacian 的本征值问题：本征值非负。`}>{R`\Delta\psi_n=\lambda_n\psi_n\qquad\lambda_n\in[0,\infty)`}</Eq>
      <Tx>{R`$\psi_n$ 归一化为 $(\psi_n,\psi_m)=\int\dd^2\xi\,\sqrt\gamma\psi_n\psi_m=\delta_{nm}$。本征值 $\lambda$ 非负，因为 $\Delta$ 是半正定的（$(\psi,\Delta\psi)=\int\sqrt\gamma|\nabla\psi|^2\ge0$）。把 $X^\mu$ 按 $\psi_n$ 展开：`}</Tx>
      <Eq n="14.89" say={R`嵌入按 Laplacian 的本征函数展开：零模 $X_0$（弦的质心位置）+ 其余振动模。`}>{R`X^\mu=\sum_{n=0}^\infty a^\mu_n\psi_n=X^\mu_0+X'^\mu\qquad a^\mu_n\in\R`}</Eq>
      <Tx>{R`其中 $X^\mu_0=a^\mu_0\psi_0$ 是 $\Delta$ 的零本征函数（零模），$X'^\mu$ 是其余自由度。相应地，路径积分 \eqref{14.87a} 写成`}</Tx>
      <Eq n="14.90" say={R`每个非零模给出 $\lambda_n^{-1/2}$，26 个分量合起来是 $(\det'\Delta)^{-13}$；零模不受压制，要单独积分。`}>{R`\begin{aligned}\int\mathcal{D}X\exp[-\tfrac12(X,\Delta X)]&=\int\prod_{n,\mu}\dd a^\mu_n\exp\Big(-\tfrac12\sum_{n,\mu}\lambda_n(a^\mu_n)^2\Big)\\&=\int\prod_\mu\dd a^\mu_0\int\prod_{n\neq0}\prod_\mu\dd a^\mu_n\exp\Big(-\tfrac12\sum_{n,\mu}\lambda_n(a^\mu_n)^2\Big)\\&=\Big(\int\prod_\mu\dd a^\mu_0\Big)(\det'\Delta)^{-13}\end{aligned}`}</Eq>
      <Tx>{R`撇号表示略去零模。为了对零模积分，注意归一化的本征向量 $\psi_0$ 是（$\Delta\psi_0=0$ 说明 $\psi_0$ 是调和函数；由最大值原理，Riemann 面上的调和函数必为常数）`}</Tx>
      <Eq n="14.91" say={R`零模是常数函数；归一化后它等于世界面面积的平方根的倒数。`}>{R`\psi_0=\Big(\frac{1}{\int\dd^2\xi\,\sqrt\gamma}\Big)^{1/2}.`}</Eq>
      <Tx>{R`由 $X^\mu_0=a^\mu_0\psi_0$：`}</Tx>
      <Eq n="14.92" say={R`零模积分 = 时空体积 $\times$ 面积的 13 次方：把 $\dd a_0$ 换成弦质心坐标 $\dd X_0$。`}>{R`\int\prod_\mu\dd a^\mu_0=\int\prod_\mu\dd X^\mu_0(\psi_0)^{-26}=V\Big(\frac{1}{\int\dd^2\xi\,\sqrt\gamma}\Big)^{-13}`}</Eq>
      <Tx>{R`其中 $V=\int\prod\dd X^\mu_0$ 是时空体积。合并 \eqref{14.90} 与 \eqref{14.92}：`}</Tx>
      <Eq n="14.93" title="物质场的路径积分" say={R`26 个自由标量场的配分函数：（去零模的行列式 / 面积）的 $-13$ 次方。这个组合在 Weyl 常数缩放下才有好的行为。`}>{R`\int\mathcal{D}X\,\mathrm{e}^{-S}=\Big(\frac{\det'\Delta}{\int\dd^2\xi\,\sqrt\gamma}\Big)^{-13}`}</Eq>
      <Tx>{R`这里略去了 $V$ 与其他无关常数。最终得到 $g$ 圈配分函数的表达式：`}</Tx>
      <Stmt id="F:Zg14">
        <Eq n="14.94" keyEq title={R`$g$ 圈配分函数`} say={R`$g$ 圈振幅 = 模空间上的有限维积分；被积函数 = 模的 Jacobi 因子 $\times$ 鬼行列式 $\times$ 物质行列式，再除以残余的 CKV 对称体积。`}>{R`\begin{aligned}Z_g&=\int_{${Mod}}\frac{\dd^nt}{V(${CKV})}\frac{\det(T,\psi)}{\det^{1/2}(\psi,\psi)\det^{1/2}(\Phi,\Phi)}\\&\quad\times[\det'P_1^\dagger P_1]^{1/2}\Big(\frac{\det'\Delta}{\int\dd^2\xi\,\sqrt\gamma}\Big)^{-13}\end{aligned}`}</Eq>
      </Stmt>
      <Tx>{R`这里用了`}</Tx>
      <Eq n="14.95" say={R`除以映射类群的阶，等于把 Teichmüller 空间上的积分换成它的商——模空间上的积分。`}>{R`\frac{1}{|${MCG}|}\int_{${Teich}}\dd^nt=\int_{${Mod}}\dd^nt.`}</Eq>
      <Tx>{R`若 $g\ge2$，Riemann 面没有 CKV，\eqref{14.94} 化为`}</Tx>
      <Eq n="14.96" say={R`高亏格没有共形 Killing 向量，配分函数只剩模积分与三个行列式。`}>{R`Z_g=\int_{${Mod}}\dd^nt\frac{\det(T,\psi)}{\det^{1/2}(\psi,\psi)}(\det'P_1^\dagger P_1)^{1/2}\Big(\frac{\det'\Delta}{\int\dd^2\xi\,\sqrt\gamma}\Big)^{-13}.`}</Eq>
      <Box kind="physics" title="数一数：鬼场、物质与 26">
        <Tx>{R`$(\det'P_1^\dagger P_1)^{1/2}$ 是 Faddeev–Popov 行列式，在现代语言里是一对反对易"鬼场" $b_{\alpha\beta}$（无迹对称张量，属于 $\ker P_1^\dagger$ 的对偶）与 $c^\alpha$（向量，属于 $\ker P_1$）的路径积分。物质 $X^\mu$ 每个分量贡献 $(\det'\Delta)^{-1/2}$。Weyl 反常 \eqref{14.84a} 的系数正是这两类场的"中心荷"：$D$ 个标量各 $+1$，$bc$ 鬼场 $-26$。零模的个数则由 Riemann–Roch 计数：$c$ 的零模 = CKV（$k$ 个），$b$ 的零模 = 二次微分（$\dim\mathrm{Teich}$ 个），两者之差 $=-3\chi$。`}</Tx>
      </Box>
    </Sub>);
}
