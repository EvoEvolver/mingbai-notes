import { GaugeTangentRedraw, OperatorSplitRedraw } from "./_redraw_ch12_14.jsx";
// §14.2.3–14.2.4 复张量演算与弦测度、Riemann 面的模空间 —— 式 (14.97)–(14.120)，习题 14.5–14.6，定理 14.2（单值化），图 14.6–14.7，交互图 2
import { Sub, Tx, Eq, Box, Stmt, Exercise, Derivation, Figure, Table, C } from "@kit";
import { DL, DU } from "./_ch14_s1.jsx";
import { Diff, Diff0, Weyl, Teich, Mod, MCG, CKV } from "./_ch14_s2a.jsx";
import { RRLab } from "./_ch14_demos.jsx";

const R = String.raw;
const TT = R`\mathcal{T}`;
const QD = R`\sym{qd}{\phi}`;      // 二次微分 φ（与 Weyl 因子 φ 区分）
const SG = R`(\Sigma_g)`;

export function Sub1423() {
  return (
    <Sub n="14.2.3" title="Complex tensor calculus and string measure" zh="复张量演算与弦测度">
      <p className="muted">本小节概念：<C id="beltrami" /> · <C id="fp_measure" /></p>
      <Tx>{R`**为什么改用复语言。**任何 Riemann 面都有复结构，可以利用这一点计算弦振幅。弦论许多漂亮的方面只有在明确考虑复结构时才显现出来。这里用复微分几何的语言重写配分函数——\secref{14.1} 的螺旋度张量 $${TT}^n$ 与算子 $\nabla$ 将把 $P_1$、$P_1^\dagger$ 变成对角的、一眼可读的形式。

先在 $\mathcal{M}_g$ 中固定规范，选取等温坐标系 $\gamma=\frac12\mathrm{e}^{2\sigma}[\dd z\otimes\dd\bar z+\dd\bar z\otimes\dd z]$，其中 $\gamma_{z\bar z}=\gamma_{\bar zz}=\frac12\exp2\sigma$。（事实上这一选择并没有把规范完全固定；后面将借助单值化定理完全固定规范。）于是由 $\delta v$ 生成的微分同胚引起的度规变形为（参见 \eqref{14.45}）`}</Tx>
      <Eq n="14.97" say={R`无迹部分 $\delta\gamma_{zz}$ 来自降螺旋度导数作用于 $\delta v_z$；迹部分 $\delta\gamma_{z\bar z}$ 来自散度，正比于 $\gamma_{z\bar z}$——它可以被 Weyl 变换吸收。`}>{R`\begin{aligned}\delta_{\rm D}\gamma_{zz}&=2${DL("-1")}\delta v_z\\\delta_{\rm D}\gamma_{z\bar z}&=\nabla_z\delta v_{\bar z}+\nabla_{\bar z}\delta v_z=\gamma_{\bar zz}(\sym{dlow}{\nabla_z^{(1)}}\delta v^z+${DU("-1")}\delta v_z).\end{aligned}`}</Eq>
      <Tx>{R`同理，无穷小共形变化生成的 $\delta_{\rm W}\gamma$ 为（参见 \eqref{14.46}）`}</Tx>
      <Eq n="14.98" say={R`Weyl 变换只改变 $\gamma_{z\bar z}$，不动无迹分量 $\gamma_{zz}$。`}>{R`\delta_{\rm W}\gamma_{z\bar z}=\delta\phi\gamma_{z\bar z}\qquad\delta_{\rm W}\gamma_{zz}=0.`}</Eq>
      <Tx>{R`**$P_1$ 是对角的。**为看清 $P_1$ 在向量上的作用，取 $\delta v^z\in${TT}^1$ 与 $\delta v_z\in${TT}^{-1}$。由 \eqref{14.50}：`}</Tx>
      <Eq n="14.99a" say={R`$P_1$ 作用在全纯向量分量 $\delta v^z$ 上：升螺旋度导数，结果是螺旋度 $+2$ 的张量。`}>{R`(P_1\delta v)^{zz}=2${DU("1")}\delta v^z\in${TT}^2`}</Eq>
      <Eq n="14.99b" say={R`$P_1$ 作用在 $\delta v_z$ 上：降螺旋度导数，结果是螺旋度 $-2$ 的张量（度规的无迹变形 $\delta\gamma_{zz}$）。`}>{R`(P_1\delta v)_{zz}=2${DL("-1")}\delta v_z\in${TT}^{-2}.`}</Eq>
      <Tx>{R`这说明 $P_1$ 是映射（略去常数因子 2）`}</Tx>
      <Eq n="14.100" title={R`$P_1$ 的复形式`} say={R`在螺旋度分解下 $P_1$ 是对角的：螺旋度 $+1$ 的部分被升到 $+2$，$-1$ 的部分被降到 $-2$，两部分互为复共轭。`}>{R`P_1=\begin{pmatrix}${DU("1")}&0\\0&${DL("-1")}\end{pmatrix}:${TT}^1\oplus${TT}^{-1}\to${TT}^2\oplus${TT}^{-2}.`}</Eq>
      <Tx>{R`同理，$P_1^\dagger$ 把无迹对称张量映到向量。对 $\delta h^{zz}\in${TT}^2$ 与 $\delta h_{zz}\in${TT}^{-2}$：`}</Tx>
      <Eq n="14.101a" say={R`$P_1^\dagger$ 在螺旋度 $+2$ 的张量上是降螺旋度导数（散度）。`}>{R`(P_1^\dagger\delta h)^z=${DL("2")}\delta h^{zz}\in${TT}^1`}</Eq>
      <Eq n="14.101b" say={R`$P_1^\dagger$ 在螺旋度 $-2$ 的张量上是升螺旋度导数，即（乘以 $2\mathrm{e}^{-2\sigma}$ 的）$\partial_{\bar z}$。`}>{R`(P_1^\dagger\delta h)_z=${DU("-2")}\delta h_{zz}\in${TT}^{-1}.`}</Eq>
      <Tx>{R`因此 $P_1^\dagger$ 是映射（与 \eqref{14.23a} 一致：伴随把 $\nabla^z$ 换成 $-\nabla_z$，反之亦然）`}</Tx>
      <Eq n="14.102" say={R`$P_1^\dagger$ 同样是对角的，方向与 $P_1$ 相反。`}>{R`P_1^\dagger=\begin{pmatrix}${DL("2")}&0\\0&${DU("-2")}\end{pmatrix}:${TT}^2\oplus${TT}^{-2}\to${TT}^1\oplus${TT}^{-1}.`}</Eq>
      <Tx>{R`乘积 $P_1^\dagger P_1$ 为`}</Tx>
      <Eq n="14.103" say={R`鬼算子 $P_1^\dagger P_1$ 由两个 Laplace 型算子组成，分别作用在螺旋度 $+1$ 与 $-1$ 的向量上。`}>{R`P_1^\dagger P_1=\begin{pmatrix}${DL("2")}${DU("1")}&0\\0&${DU("-2")}${DL("-1")}\end{pmatrix}:${TT}^1\oplus${TT}^{-1}\to${TT}^1\oplus${TT}^{-1}.`}</Eq>
      <Tx>{R`相应地，\eqref{14.96} 中的行列式变为`}</Tx>
      <Eq n="14.104" say={R`鬼行列式等于两个螺旋度 Laplacian 的行列式之积的平方根。`}>{R`\begin{aligned}(\det'P_1^\dagger P_1)^{1/2}&=(\det'${DL("2")}${DU("1")}\det'${DU("-2")}${DL("-1")})^{1/2}\\&=(\det'\Delta^+_{(1)}\Delta^-_{(-1)})^{1/2}\end{aligned}`}</Eq>
      <Tx>{R`其中 $\Delta^\pm_{(n)}$ 是 Laplace 算子（\eqref{14.24a}）。**下面证明 $\Delta^+_{(1)}$ 与 $\Delta^-_{(-1)}$ 的谱相同。**取 $\Delta^+_{(1)}$ 的本征函数 $\delta v^z$：`}</Tx>
      <Eq n="14.105" say={R`螺旋度 $+1$ 的 Laplacian 的本征方程，用显式形式 \eqref{14.21a} 写出。`}>{R`\Delta^+_{(1)}\delta v^z=-2\mathrm{e}^{-4\sigma}\partial_z\mathrm{e}^{2\sigma}\partial_{\bar z}\delta v^z=\lambda\delta v^z`}</Eq>
      <Tx>{R`这里用了 \eqref{14.21a}。本征值 $\lambda$ 是非负实数（$\Delta^\pm_{(n)}$ 是半正定的 Hermite 算子）。于是`}</Tx>
      <Eq n="14.106" say={R`复共轭再降指标，把 $\Delta^+_{(1)}$ 的本征函数变成 $\Delta^-_{(-1)}$ 的本征函数，本征值不变。`}>{R`\begin{aligned}\Delta^-_{(-1)}(\gamma_{z\bar z}\sym{conj}{\overline{\delta v^z}})&=-\mathrm{e}^{-2\sigma}\partial_{\bar z}\mathrm{e}^{2\sigma}\partial_z\sym{conj}{\overline{\delta v^z}}=-\mathrm{e}^{-2\sigma}\sym{conj}{\overline{\partial_z\mathrm{e}^{2\sigma}\partial_{\bar z}\delta v^z}}\\&=-\gamma_{z\bar z}2\mathrm{e}^{-4\sigma}\sym{conj}{\overline{\partial_z\mathrm{e}^{2\sigma}\partial_{\bar z}\delta v^z}}=\lambda\gamma_{z\bar z}\sym{conj}{\overline{\delta v^z}}\end{aligned}`}</Eq>
      <Tx>{R`这说明 $\gamma_{z\bar z}\sym{conj}{\overline{\delta v^z}}$ 是 $\Delta^-_{(-1)}$ 的本征函数，本征值相同。（第一个等号：由 \eqref{14.21a}，$\Delta^-_{(-1)}=-\nabla^z_{(-2)}\nabla_z^{(-1)}=-2\mathrm{e}^{-2\sigma}\partial_{\bar z}\mathrm{e}^{2\sigma}\partial_z\mathrm{e}^{-2\sigma}$，作用在 $\frac12\mathrm{e}^{2\sigma}\sym{conj}{\overline{\delta v^z}}$ 上。）容易看出逆命题也成立（习题 14.5）。因此 $\Delta^+_{(1)}$ 与 $\Delta^-_{(-1)}$ 有相同的本征值，$\det'\Delta^+_{(1)}=\det'\Delta^-_{(-1)}$。于是 \eqref{14.104} 成为`}</Tx>
      <Eq n="14.107" keyEq title="鬼行列式" say={R`鬼场行列式化为一个 Laplace 算子的行列式（不开方）：两个复共轭的螺旋度扇区贡献相同。`}>{R`(\det'P_1^\dagger P_1)^{1/2}=\det'\Delta^-_{(-1)}=\det'\Delta^+_{(1)}.`}</Eq>
      <Exercise n="14.5" title="逆命题：谱相同" level="★"
        hint={R`仿照 \eqref{14.106}：$\Delta^+_{(1)}=-2\mathrm{e}^{-4\sigma}\partial_z\mathrm{e}^{2\sigma}\partial_{\bar z}$，$\Delta^-_{(-1)}=-2\mathrm{e}^{-2\sigma}\partial_{\bar z}\mathrm{e}^{2\sigma}\partial_z\mathrm{e}^{-2\sigma}$；$\gamma^{z\bar z}=2\mathrm{e}^{-2\sigma}$；本征值是实数。`}
        solution={R`设 $\Delta^-_{(-1)}\delta v_z=\lambda\delta v_z$，即 $-2\mathrm{e}^{-2\sigma}\partial_{\bar z}\mathrm{e}^{2\sigma}\partial_z(\mathrm{e}^{-2\sigma}\delta v_z)=\lambda\delta v_z$。令 $w\equiv\gamma^{z\bar z}\sym{conj}{\overline{\delta v_z}}=2\mathrm{e}^{-2\sigma}\sym{conj}{\overline{\delta v_z}}$。则

$$\Delta^+_{(1)}w=-2\mathrm{e}^{-4\sigma}\partial_z\mathrm{e}^{2\sigma}\partial_{\bar z}(2\mathrm{e}^{-2\sigma}\sym{conj}{\overline{\delta v_z}})=-4\mathrm{e}^{-4\sigma}\sym{conj}{\overline{\partial_{\bar z}\mathrm{e}^{2\sigma}\partial_z(\mathrm{e}^{-2\sigma}\delta v_z)}}.$$

由本征方程，$\partial_{\bar z}\mathrm{e}^{2\sigma}\partial_z(\mathrm{e}^{-2\sigma}\delta v_z)=-\frac{\lambda}{2}\mathrm{e}^{2\sigma}\delta v_z$；取共轭（$\lambda$ 实，$\sigma$ 实）代入：$\Delta^+_{(1)}w=-4\mathrm{e}^{-4\sigma}\cdot(-\frac\lambda2)\mathrm{e}^{2\sigma}\sym{conj}{\overline{\delta v_z}}=\lambda\cdot2\mathrm{e}^{-2\sigma}\sym{conj}{\overline{\delta v_z}}=\lambda w$。

所以 $\gamma^{z\bar z}\sym{conj}{\overline{\delta v_z}}$ 是 $\Delta^+_{(1)}$ 的本征向量，本征值相同。两个映射 $\delta v^z\mapsto\gamma_{z\bar z}\sym{conj}{\overline{\delta v^z}}$ 与 $\delta v_z\mapsto\gamma^{z\bar z}\sym{conj}{\overline{\delta v_z}}$ 互逆，故两个算子的谱（含简并度）完全相同；零模也一一对应（都对应 CKV）。`}>
        <Tx>{R`设 $\delta v_z$ 是 $\Delta^-_{(-1)}$ 的本征向量，本征值为 $\lambda$。证明 $\gamma^{z\bar z}\sym{conj}{\overline{\delta v_z}}$ 是 $\Delta^+_{(1)}$ 的本征向量，本征值相同。`}</Tx>
      </Exercise>
      <Tx>{R`**Teichmüller 形变的复形式。**度规的物理变化是 Teichmüller 形变 $\delta\tau^i\mu_i$，其中 $\tau^i$（$\mu_i$）是 $t^i$（$T_i$）的复对应物。由前面的经验，Teichmüller 形变中相关的部分在实基中是**对称无迹**的；在复基中，这相当于 $\mu_{iz\bar z}=\mu_{i\bar zz}=0$。于是度规的一般变分为`}</Tx>
      <Eq n="14.108a" say={R`度规的无迹变形 = 非 CKV 微分同胚（降螺旋度导数的像）+ 模参数的变化（Beltrami 微分）。`}>{R`\delta\gamma_{zz}=${DL("-1")}\delta\tilde v_z+\delta\tau^i\mu_{izz}`}</Eq>
      <Eq n="14.108b" say={R`度规的迹部分只是 Weyl 变化。`}>{R`\delta\gamma_{z\bar z}=\delta\phi\gamma_{z\bar z}`}</Eq>
      <Tx>{R`这里重新定义了 $\delta\phi$，使它包含 $\delta v$ 引起的 $\delta\gamma_{z\bar z}$（注意 $\delta_{\rm D}\gamma_{z\bar z}\propto\gamma_{z\bar z}$）。\eqref{14.108a} 中的 $\delta\tilde v$ 不含 CKV，即 $\delta\tilde v\in(\ker${DL("-1")})^\perp$。

**内积。**为进行 $\{\delta\gamma\}$ 的正交分解，需要定义各空间中的内积。最自然的选择是`}</Tx>
      <Eq n="14.109a" say={R`无迹度规变形（螺旋度 $-2$）的内积。`}>{R`\|\delta\gamma_{zz}\|^2=\int\dd^2z\,\sqrt\gamma\,\sym{conj}{\overline{\delta\gamma_{zz}}}\delta\gamma^{zz}`}</Eq>
      <Eq n="14.109b" say={R`迹部分的内积。`}>{R`\|\delta\gamma_{z\bar z}\|^2=\int\dd^2z\,\sqrt\gamma\,\sym{conj}{\overline{\delta\gamma_{z\bar z}}}\delta\gamma^{z\bar z}`}</Eq>
      <Tx>{R`以及`}</Tx>
      <Eq n="14.109c" say={R`向量场的内积，即 \eqref{14.22} 在 $n=1$ 时的形式。`}>{R`\|\delta v_z\|^2=\int\dd^2z\,\sqrt\gamma\gamma_{z\bar z}\sym{conj}{\overline{\delta v^z}}\delta v^z.`}</Eq>
      <Tx>{R`注意 $\delta\gamma_{zz}\dd z\otimes\dd z$ 与 $\delta\gamma_{z\bar z}\dd z\otimes\dd\bar z$ 是不同的张量，内积要分别指定。

**正交分解与二次微分。**仿照上一小节的论证，引入正交分解`}</Tx>
      <Eq n="14.110" title="Beltrami 微分 → 二次微分" say={R`把 Beltrami 微分 $\mu_i$ 中落在规范方向上的部分并入 $\delta\bar v$，剩下与规范方向正交的部分就是二次微分 $\phi_i$。`}>{R`\delta\gamma_{zz}=${DL("-1")}\delta\tilde v_z+\delta\tau^i\mu_{izz}=${DL("-1")}\delta\bar v_z+\delta\tau^i${QD}_{izz}`}</Eq>
      <Tx>{R`其中 $\delta\bar v=\delta\tilde v+$（$\delta\tau^i\mu_{izz}$ 在 $\{\operatorname{im}${DL("-1")}\}$ 上的投影）。$${DL("-1")}\delta\bar v_z$ 与 $${QD}_{izz}$ 的正交性意味着

$$0=(${DL("-1")}\delta v_z,${QD}_{izz})=\int\dd^2z\,\sqrt\gamma\,\sym{conj}{\overline{\delta v_z}}(-${DU("-2")}${QD}_{izz})$$

这里用了 $(${DL("-1")})^\dagger=-${DU("-2")}$（\eqref{14.23b}）。由于 $\delta v_z$ 任意，得（\figref{14.6}）`}</Tx>
      <Figure illustration={<OperatorSplitRedraw complex />} n="14.6" caption={R`映射 $\nabla_z^{(-1)}$ 及其伴随 $\nabla^z_{(-2)}$。`} width="100%" />
      <Eq n="14.111" say={R`与所有规范变形正交的无迹变形，被 $\nabla^z_{(-2)}$（即 $\partial_{\bar z}$）零化：它是全纯的。`}>{R`${QD}_{izz}\in\ker${DU("-2")}.`}</Eq>
      <Tx>{R`由 $${DU("-2")}=2\mathrm{e}^{-2\sigma}\partial_{\bar z}$ 的显式形式，$\partial_{\bar z}${QD}_{izz}=0$，即 $\ker${DU("-2")}$ 是螺旋度 $-2$ 的**全纯**张量的集合。张量 $${QD}_i=${QD}_{izz}\dd z\otimes\dd z$ 称为**二次微分**（quadratic differential），而 $\mu_i=\mu_{izz}\dd z\otimes\dd z$（更常见的写法是 $\mu_{i\bar z}{}^z\,\dd\bar z\otimes\partial_z$，二者由度规互换）称为 **Beltrami 微分**（\figref{14.7}）。实际计算中，常常用 Beltrami 微分指定规范切片，见后文。现在我们证明了`}</Tx>
      <Figure illustration={<GaugeTangentRedraw complex />} n="14.7" caption={R`Beltrami 微分 $\{\mu_i\}$ 张成与规范切片相切的形变，$\{\phi_i\}$ 张成 $\ker\nabla^z_{(-2)}$。`} width="100%" />
      <Eq n="14.112" title="模方向 = 全纯二次微分" say={R`真正的物理（模）方向就是全纯二次微分：它们与所有微分同胚正交，且不能被 Weyl 变换吸收。`}>{R`\{\ker P_1^\dagger\}=\{\text{Quadratic differential}\}=\{\ker${DU("-2")}\}.`}</Eq>
      <Tx>{R`Riemann–Roch 定理 \eqref{14.27}（取 $n=-1$：$(2n-1)(g-1)=-3(g-1)$）成为`}</Tx>
      <Eq n="14.113" keyEq title="Riemann–Roch：CKV 与二次微分的计数" say={R`共形 Killing 向量的复维数减去二次微分的复维数恒等于 $3-3g=\frac32\chi$：$g\ge2$ 时没有 CKV，于是有 $3g-3$ 个复模参数。`}>{R`\dim_{\C}\ker${DL("-1")}-\dim_{\C}\ker${DU("-2")}=3-3g.`}</Eq>
      <RRLab />
      <Tx>{R`现在把 $\{\delta\gamma\}$ 分成两两正交的部分：`}</Tx>
      <Eq n="14.114" say={R`复形式的正交分解：Weyl 方向 $\oplus$ 微分同胚（$\nabla_z^{(-1)}$ 的像）$\oplus$ 二次微分，再加上复共轭。`}>{R`\{\delta\gamma\}=\{\text{conf}\}\oplus\{\operatorname{im}${DL("-1")}\}\oplus\{\ker${DU("-2")}\}+\text{cc}`}</Eq>
      <Tx>{R`它应与 \eqref{14.80b} 比较。测度变为`}</Tx>
      <Eq n="14.115" say={R`复形式下的积分变量：$n$ 个复模参数、规范与 Weyl 自由度、约化嵌入、$k$ 个复 CKV 参数。`}>{R`\mathcal{D}\delta\gamma\mathcal{D}\delta X\to J\,\dd^n\delta\tau\,\mathcal{D}\delta\bar v\mathcal{D}\delta\phi\mathcal{D}\delta\tilde X\,\dd^k\delta a`}</Eq>
      <Tx>{R`其中 $n$ 与 $k$ 分别是 Teichmüller 空间与 CKV 的**复**维数。重复上一小节的论证求出 Jacobi 行列式，得`}</Tx>
      <Eq n="14.116" say={R`复形式的 $g$ 圈振幅：鬼行列式 $\det'\Delta^+_{(1)}$、Weil–Petersson 因子 $|\det(\mu,\phi)|^2/\det(\phi,\phi)$、CKV 归一化。`}>{R`\begin{aligned}Z_g&=\int\mathcal{D}\gamma\mathcal{D}X\frac{1}{V(${Diff}*${Weyl})}\mathrm{e}^{-S}\\&=\int_{${Mod}}\dd^n\tau\,\mathcal{D}X\frac{\det'\Delta^+_{(1)}}{V(${CKV})}\frac{|\det(\mu,${QD})|^2}{\det(${QD},${QD})\det(\Phi,\Phi)}\mathrm{e}^{-S}.\end{aligned}`}</Eq>
      <Tx>{R`由于我们对复变量积分，\eqref{14.96} 中的 $\frac12$ 次幂不再出现（一个复 Gauss 积分 = 两个实 Gauss 积分）：$(\det'P_1^\dagger P_1)^{1/2}=\det'\Delta^+_{(1)}$（\eqref{14.107}），$\det(T,\psi)/\det^{1/2}(\psi,\psi)\to|\det(\mu,${QD})|^2/\det(${QD},${QD})$。对 $X$ 积分（\eqref{14.93}）得`}</Tx>
      <Eq n="14.117" keyEq title={R`$g$ 圈振幅（复形式）`} say={R`弦的 $g$ 圈振幅的最终形式：模空间上的积分，被积函数 = Weil–Petersson 测度 $\times$ 鬼行列式 $\times$ 物质行列式的 $-13$ 次幂 ÷ CKV 体积。`}>{R`\begin{aligned}Z_g&=\int_{${Mod}}\frac{\dd^n\tau}{V(${CKV})}\frac{|\det(\mu,${QD})|^2}{\det(${QD},${QD})\det(\Phi,\Phi)}\\&\quad\times\det'\Delta^+_{(1)}\Big(\frac{\det'\Delta}{\int\dd^2z\,\sqrt\gamma}\Big)^{-13}.\end{aligned}`}</Eq>
    </Sub>);
}

export function Sub1424() {
  return (
    <Sub n="14.2.4" title="Moduli spaces of Riemann surfaces" zh="Riemann 面的模空间">
      <p className="muted">本小节概念：<C id="moduli" /> · <C id="uniformization" /></p>
      <Tx>{R`空间 $${Mod}${SG}$ 与 $${Teich}${SG}$ 已定义为

$$${Mod}${SG}\equiv\mathcal{M}_g/(${Diff}${SG}*${Weyl}${SG})\qquad${Teich}${SG}\equiv\mathcal{M}_g/(${Diff0}${SG}*${Weyl}${SG}).$$

（原书此处略写了 Weyl 因子，与 \secref{14.2.1} 的定义相同。）它们通过 $${MCG}\equiv${Diff}${SG}/${Diff0}${SG}$ 相联系：$${Mod}${SG}=${Teich}${SG}/${MCG}$。下面更仔细地看这些对象。首先注意：`}</Tx>
      <Eq n="14.118" title="各亏格的 CKV、Teichmüller 空间与模群" say={R`三种亏格一览：球面有 3 个复 CKV、没有模；环面各 1 个，模群是 $\mathrm{SL}(2,\Z)$；高亏格没有 CKV，有 $3g-3$ 个复模参数，模群结构复杂。`}>{R`\begin{matrix}g&\dim_{\C}${CKV}&${CKV}&\dim_{\C}${Teich}${SG}&${MCG}\\ 0&3&\mathrm{SL}(2,\C)&0&\{1\}\\ 1&1&\mathrm{U}(1)\times\mathrm{U}(1)&1&\mathrm{SL}(2,\Z)\\ \ge2&0&\text{empty}&3g-3&?\end{matrix}`}</Eq>
      <Box kind="warning" title={R`勘误：球面的模群（p.574）`}>{R`原书表 \eqref{14.118} 中 $g=0$ 一行的 MCG 印作 $\mathrm{SL}(2,R)$。$S^2$ 的保定向微分同胚群是连通的（Smale 定理：$\mathrm{Diff}^+(S^2)\simeq\mathrm{SO}(3)$），所以映射类群是平凡群 $\{1\}$——这与"$g=0$ 时 Teich 是一点、Mod 也是一点"一致。$\mathrm{SL}(2,\R)$ 是上半平面的等距群，可能与 $g=1$ 时 $\tau$ 所在的 $H$ 混淆。正文已改正。另外 $g=1$ 时真正作用在 $\tau$ 上的是 $\mathrm{PSL}(2,\Z)=\mathrm{SL}(2,\Z)/\{\pm1\}$。`}</Box>
      <Tx>{R`[**注：**$g\ge2$ 时 MCG 可以由 $3g-1$ 个 Dehn 扭转表示，但它们不是最小的。] 由 \eqref{14.118} 立即得出 $Z_0=0$：Teichmüller 空间是一点，而 $\mathrm{SL}(2,\C)$ 的体积是无穷大（$V(${CKV})$ 在分母上）。当然，这并不意味着带三个顶点算符的振幅为零——三个顶点算符的位置恰好可以用来固定 $\mathrm{SL}(2,\C)$。一般地，$${Mod}${SG}$ 拓扑上非平凡，而 $${Teich}${SG}$ 是平凡的（可缩的，同胚于 $\R^{6g-6}$）。$${Teich}${SG}$ 是 $${Mod}${SG}$ 的万有覆叠空间，拓扑非平凡性来自 MCG。

**单值化定理。**实际计算中，单值化定理非常有用。在上一小节中，我们先选取 Beltrami 微分 $\mu_i$，再把基换成 $${QD}_i\in\ker P_1^\dagger$。最初选取 $\mu_i$ 的动机正来自单值化定理。`}</Tx>
      <Stmt id="T14.2">
        <Eq n="14.119" keyEq title="单值化：三种常曲率几何" say={R`每个 Riemann 面都共形等价于一个常曲率曲面：球面（正曲率）、平坦环面（零曲率）、上半平面模 Fuchs 群（负曲率）。`}>{R`\begin{matrix}g&\text{Riemann surface}&\text{Metric}&\mathrm{sign}\,\mathcal{R}\\ 0&\C\cup\{\infty\}&\dd s^2=\dd z\otimes\dd\bar z/(1+z\bar z)^2&+\\ 1&\C/L&\dd s^2=\dd z\otimes\dd\bar z&0\\ \ge2&H/G&\dd s^2=\dd z\otimes\dd\bar z/(\mathrm{Im}\,z)^2&-\end{matrix}`}</Eq>
        <Tx>{R`其中 $L$ 是 $\C$ 中的格（见例 8.2），$H$ 是上半平面，$G\subset\mathrm{SL}(2,\R)$ 称为 **Fuchs 群**（Fuchsian group）。$g\ge2$ 的度规是 **Poincaré 度规**（见例 7.6）。证明见 Farkas–Kra (1980) 等。`}</Tx>
      </Stmt>
      <Tx>{R`**Weil–Petersson 测度。**借助这个定理，总可以取常曲率度规组成 $\mathcal{M}_g$ 中的规范切片。这相当于 Beltrami 微分 $\mu_i$ 的一种特殊选取。这个切片定义了 **Weil–Petersson 测度**：`}</Tx>
      <Eq n="14.120" say={R`模空间上的自然测度：Beltrami 微分与二次微分的配对的模方，除以二次微分的 Gram 行列式——它与规范切片的选取无关。`}>{R`\int\dd^n\tau\frac{|\det(\mu,${QD})|^2}{\det(${QD},${QD})}=\int\dd(\text{Weil–Petersson})`}</Eq>
      <Tx>{R`见 D'Hoker–Phong (1986)。`}</Tx>
      <Exercise n="14.6" title="三种度规的标量曲率" level="★"
        hint={R`把度规写成 $\mathrm{e}^{2\sigma}|\dd z|^2$（对称部分），用 \eqref{14.20b}：$\mathcal{R}=-8\mathrm{e}^{-2\sigma}\partial_z\partial_{\bar z}\sigma$。对 $\mathrm{Im}\,z=y=(z-\bar z)/2\mathrm{i}$ 有 $\partial_zy=\frac1{2\mathrm{i}}$、$\partial_{\bar z}y=-\frac1{2\mathrm{i}}$。`}
        solution={R`**$g=0$：**$\mathrm{e}^{2\sigma}=(1+z\bar z)^{-2}$，$\sigma=-\ln(1+z\bar z)$。$\partial_{\bar z}\sigma=-\frac{z}{1+z\bar z}$，$\partial_z\partial_{\bar z}\sigma=-\frac{(1+z\bar z)-z\bar z}{(1+z\bar z)^2}=-\frac{1}{(1+z\bar z)^2}$。故 $\mathcal{R}=-8(1+z\bar z)^2\cdot\big(-\frac{1}{(1+z\bar z)^2}\big)=8$——常数，正（这是半径 $\frac12$ 的球面，Gauss 曲率 4）。

**$g=1$：**$\sigma=0$，$\mathcal{R}=0$。

**$g\ge2$：**$\mathrm{e}^{2\sigma}=y^{-2}$，$\sigma=-\ln y$。$\partial_{\bar z}\ln y=\frac{1}{y}\cdot\big(-\frac1{2\mathrm{i}}\big)$，$\partial_z\partial_{\bar z}\ln y=-\frac{1}{y^2}\cdot\frac1{2\mathrm{i}}\cdot\big(-\frac1{2\mathrm{i}}\big)=-\frac{1}{4y^2}$，所以 $\partial_z\partial_{\bar z}\sigma=\frac{1}{4y^2}$，$\mathcal{R}=-8y^2\cdot\frac{1}{4y^2}=-2$——常数，负（Gauss 曲率 $-1$）。

三者都与 $z,\bar z$ 无关，符号依次为 $+,0,-$，与 Gauss–Bonnet $\int\sqrt\gamma\mathcal{R}=4\pi(2-2g)$ 的符号一致。`}>
        <Tx>{R`计算 \eqref{14.119} 中各度规的标量曲率，验证它们与 $z$、$\bar z$ 无关。`}</Tx>
      </Exercise>
    </Sub>);
}
