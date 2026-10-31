// 引言 + §14.1 Riemann 面上的微分几何 —— 式 (14.1)–(14.29)，例 14.1，习题 14.1–14.2，定理 14.1（Riemann–Roch）
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, Table, C } from "@kit";

const R = String.raw;
// 两种协变导数（多字母符号整体标注）：∇_z^{(n)}: 𝒯ⁿ→𝒯ⁿ⁻¹，∇^z_{(n)}: 𝒯ⁿ→𝒯ⁿ⁺¹；以及对 $\bar z$ 的版本
export const DL = n => R`\sym{dlow}{\nabla_z^{(${n})}}`;
export const DU = n => R`\sym{dup}{\nabla^z_{(${n})}}`;
const DLb = n => R`\sym{dlowb}{\nabla_{\bar z}^{(${n})}}`;
const DUb = n => R`\sym{dupb}{\nabla^{\bar z}_{(${n})}}`;
const TT = R`\mathcal{T}`;
const KH = R`\mathcal{K}`;

export function Intro() {
  return (
    <Sec n="14.0" title="Introduction" zh="引言：弦的单圈振幅"
      gist={R`本章计算闭的、可定向玻色弦在 26 维 Euclid 空间中的单圈真空振幅。出发点是 Polyakov 作用量 \eqref{14.1}；工具是 Riemann 面上的微分几何（\secref{14.1}）；方法是对几何的路径积分，用 Faddeev–Popov 技巧只数一次（\secref{14.2}）；结果是模空间上的积分 \eqref{14.142}（\secref{14.3}）。`}
      why={R`弦论把"对粒子路径求和"推广为"对二维曲面求和"。曲面的拓扑由亏格 $g$ 刻画，同一亏格的曲面又有无穷多种度规——但大部分只是规范自由度。把真正的物理自由度（模参数）挑出来，正需要全书前面的几何与拓扑。`}
      gives={["14.1"]}>
      <Tx>{R`**本章要做什么。**我们研究最简单的情形：26 维 Euclid 空间中闭的、可定向的玻色弦。弦扫出的世界面是亏格 $g$ 的 Riemann 面 $\Sigma_g$，动力学由 **Polyakov 作用量**（Polyakov action）给出：`}</Tx>
      <Eq n="14.1" keyEq title="Polyakov 作用量（含 Euler 项）" say={R`第一项是 $D$ 个"世界面上的无质量标量场" $X^\mu$ 的 Dirichlet 能量；第二项正比于世界面的 Euler 示性数，只依赖于拓扑——它给每多一个"洞"的曲面加一个固定的权重。`}>{R`S=\frac{1}{2\pi}\int_{\Sigma_g}\dd^2\xi\,\sqrt\gamma\gamma^{\alpha\beta}\partial_\alpha X^\mu\partial_\beta X_\mu-\frac{\lambda}{4\pi}\int_{\Sigma_g}\dd^2\xi\,\sqrt\gamma\mathcal{R}`}</Eq>
      <Tx>{R`这里 $\gamma_{\alpha\beta}$ 是世界面上的度规，$\mathcal{R}$ 是它的标量曲率。第二项等于 $-\lambda\chi$，$\chi=2-2g$ 是 Euler 示性数，所以 $\mathrm{e}^{-S}$ 中含因子 $\mathrm{e}^{\lambda\chi}=\mathrm{e}^{2\lambda}\mathrm{e}^{-2\lambda g}$：它决定不同圈数振幅之间的相对比例——$g$ 圈振幅正比于 $\mathrm{e}^{-2\lambda g}$（$\mathrm{e}^{-\lambda}$ 起弦耦合常数的作用）。可能的抵消项没有写出。

**路线。**我们先发展所需的数学工具——Riemann 面上的微分几何（\secref{14.1}）；然后写出真空振幅的路径积分表达式（\secref{14.2}）；最后作为例子算出单圈真空振幅（\secref{14.3}）。原书的讲法依据 D'Hoker–Phong (1986)、Polchinski (1986)、Moore–Nelson (1986)；综述可参看 Alvarez-Gaumé–Nelson (1986)、Bagger (1987)、D'Hoker–Phong (1988)、Weinberg (1988)。$D=26$ 的原因将在 \secref{14.2} 中说明。`}</Tx>
      <Box kind="warning" title={R`勘误：圈数压低因子（p.548）`}>{R`原书此处说"$g$ 圈振幅正比于 $\exp(-\lambda g)$"。由 \eqref{14.1}，$-\frac{\lambda}{4\pi}\int\sqrt\gamma\mathcal{R}=-\lambda\chi=-\lambda(2-2g)$，故 $\mathrm{e}^{-S}\propto\mathrm{e}^{-2\lambda g}$（与原书 §14.2.1 的说法一致）。正文已改正。另外，\eqref{14.1} 的动能项系数 $\frac1{2\pi}$ 与 §14.2 中 \eqref{14.31} 的 $\frac12$ 只差 $X^\mu$ 的归一化，对本章任何结论都没有影响。`}</Box>
      <Box kind="physics" title="与第 7 章的关系">
        <Tx>{R`第 7 章 \secref{7.11} 在 Minkowski 世界面上引入了 Polyakov 作用量 \eqref{7.233} 及其对称性（微分同胚、Weyl 重标度 \eqref{7.234b}、目标空间 Poincaré 对称）。本章转到 Euclid 号差：世界面度规 $\gamma_{\alpha\beta}$ 正定，世界面是紧的 Riemann 面——于是第 8 章的复几何（\secref{8.1} 的复环面与模参数 $\tau$）、第 12 章的指标定理（\sref{T12.2}、\sref{T12.5}）都能直接派上用场。`}</Tx>
      </Box>
    </Sec>);
}

export function Sec141() {
  return (
    <Sec n="14.1" title="Differential geometry on Riemann surfaces" zh="Riemann 面上的微分几何"
      gist={R`二维度规局部总可写成 $\mathrm{e}^{2\sigma}|\dd z|^2$，共形相容的坐标变换是全纯的，所以 Riemann 面是复流形。张量只需用纯 $z$ 指标表示，按螺旋度 $n$ 分类为 $\mathcal{T}^n$；两种协变导数 $\nabla_z^{(n)}:\mathcal{T}^n\to\mathcal{T}^{n-1}$、$\nabla^z_{(n)}:\mathcal{T}^n\to\mathcal{T}^{n+1}$ 互为负伴随，组成 Laplace 算子 $\Delta^\pm_{(n)}$。热核给出 Riemann–Roch 定理：$\ind\nabla_z^{(n)}=(2n-1)(g-1)$。`}
      why={R`弦的路径积分要对世界面的度规积分，需要知道哪些度规变形是微分同胚、哪些是 Weyl 变换、哪些是"真"的。这些空间正是某些 $\nabla$ 算子的核与像；它们的维数由 Riemann–Roch 定理给出。`}
      gives={["14.2", "14.5", "14.8", "14.15", "14.16", "14.18a", "14.18b", "14.20b", "14.22", "14.23a", "14.24a", "14.24b", "14.25", "14.27", "14.29a"]}>
      <Tx>{R`Riemann 面是没有边界的二维实流形。前面的章节已在多处遇到它们（例 7.9 的等温坐标、例 8.2 的复环面、第 12 章的 Riemann–Roch 定理）。这里先把基本事实汇总，使本章自成一体；再引入几个新的方面——它们恰好是计算玻色弦振幅所需的背景。`}</Tx>
      <Sub1411 />
      <Sub1412 />
      <Sub1413 />
      <Sub1414 />
    </Sec>);
}

function Sub1411() {
  return (
    <Sub n="14.1.1" title="Metric and complex structure" zh="度规与复结构">
      <p className="muted">本小节概念：<C id="riemann_surface" /></p>
      <Tx>{R`**出发点：二维度规总是共形平坦的。**设 $\Sigma_g$ 是亏格 $g$ 的 Riemann 面。例 7.9 已证明：在任何坐标卡 $U$ 中都可以引入**等温坐标**（isothermal coordinates）$(\xi^1,\xi^2)$，使度规共形平坦：`}</Tx>
      <Eq n="14.2" say={R`二维度规局部只剩一个函数的自由度：选好坐标后它是平直度规乘以一个正的"共形因子" $\mathrm{e}^{2\sigma}$。`}>{R`g=\mathrm{e}^{2\sigma(\xi)}(\dd\xi^1\otimes\dd\xi^1+\dd\xi^2\otimes\dd\xi^2).`}</Eq>
      <Tx>{R`引入复坐标`}</Tx>
      <Eq n="14.3" say={R`把两个等温坐标合成一个复坐标及其共轭。`}>{R`z=\xi^1+\mathrm{i}\xi^2\qquad\bar z=\xi^1-\mathrm{i}\xi^2.`}</Eq>
      <Tx>{R`形式与向量分别由下列基张成：`}</Tx>
      <Eq n="14.4a" say={R`复的一形式基：$\dd z$ 与 $\dd\bar z$。`}>{R`\dd z=\dd\xi^1+\mathrm{i}\,\dd\xi^2\qquad\dd\bar z=\dd\xi^1-\mathrm{i}\,\dd\xi^2`}</Eq>
      <Eq n="14.4b" say={R`与之对偶的复向量基：$\partial_z$ 作用在 $z$ 上给 1、作用在 $\bar z$ 上给 0。`}>{R`\partial_z=\frac12\Big(\frac{\partial}{\partial\xi^1}-\mathrm{i}\frac{\partial}{\partial\xi^2}\Big)\qquad\partial_{\bar z}=\frac12\Big(\frac{\partial}{\partial\xi^1}+\mathrm{i}\frac{\partial}{\partial\xi^2}\Big).`}</Eq>
      <Tx>{R`用复坐标，度规写成`}</Tx>
      <Eq n="14.5" title="复坐标中的共形平坦度规" say={R`在复坐标中，度规只有"混合"分量 $g_{z\bar z}$：长度元是 $\mathrm{e}^{2\sigma}|\dd z|^2$。`}>{R`g=\tfrac12\mathrm{e}^{2\sigma(z,\bar z)}[\dd z\otimes\dd\bar z+\dd\bar z\otimes\dd z].`}</Eq>
      <Tx>{R`$g$ 的分量为`}</Tx>
      <Eq n="14.6a" say={R`度规的下指标分量：只有 $z\bar z$ 混合分量非零。`}>{R`g_{z\bar z}=g_{\bar zz}=\tfrac12\mathrm{e}^{2\sigma}\qquad g_{zz}=g_{\bar z\bar z}=0`}</Eq>
      <Eq n="14.6b" say={R`逆度规的分量：同样只有混合分量，等于 $2\mathrm{e}^{-2\sigma}$。`}>{R`g^{z\bar z}=g^{\bar zz}=2\mathrm{e}^{-2\sigma}\qquad g^{zz}=g^{\bar z\bar z}=0.`}</Eq>
      <Tx>{R`**换卡时会发生什么？**设 $V$ 是 $\Sigma_g$ 的另一个坐标卡，$U\cap V\neq\emptyset$，$(w,\bar w)$ 是 $V$ 中的复坐标。$V$ 中的度规为`}</Tx>
      <Eq n="14.7" say={R`另一张卡里的度规同样是共形平坦的，只是共形因子换成 $\sigma'$。`}>{R`g=\mathrm{e}^{2\sigma'(w,\bar w)}\,\dd w\otimes\dd\bar w.`}</Eq>
      <Tx>{R`两种表达式 \eqref{14.5}、\eqref{14.7} 在 $U\cap V$ 上必须一致（只看对称部分）：$\mathrm{e}^{2\sigma(z,\bar z)}\dd z\otimes\dd\bar z=\mathrm{e}^{2\sigma'(w,\bar w)}\dd w\otimes\dd\bar w$。而

$$\dd w\otimes\dd\bar w=[(\partial w/\partial z)\dd z+(\partial w/\partial\bar z)\dd\bar z]\otimes[(\partial\bar w/\partial z)\dd z+(\partial\bar w/\partial\bar z)\dd\bar z]\propto\dd z\otimes\dd\bar z$$

要求 $\dd z\otimes\dd z$ 与 $\dd\bar z\otimes\dd\bar z$ 的系数为零，于是必须 $\partial w/\partial\bar z=\partial\bar w/\partial z=0$。[另一种可能 $\partial w/\partial z=\partial\bar w/\partial\bar z=0$ 是反全纯的坐标变换，它反转定向；若 $(z,\bar z)$ 与 $(w,\bar w)$ 定义同一个定向，就被排除。] 因此`}</Tx>
      <Eq n="14.8" keyEq title="换卡是全纯的" say={R`保持共形平坦形式且保持定向的坐标变换必为全纯函数：Riemann 面自动是一维复流形。`}>{R`w=w(z)\qquad\bar w=\bar w(\bar z)`}</Eq>
      <Tx>{R`这验证了 $\Sigma_g$ 是复流形（定义 8.1）。同时共形因子按下式变换：`}</Tx>
      <Eq n="14.9" say={R`换卡时共形因子吸收全纯变换的伸缩率 $|\partial w/\partial z|^2$。`}>{R`\mathrm{e}^{2\sigma(z,\bar z)}=\mathrm{e}^{2\sigma'(w,\bar w)}|\partial w/\partial z|^2.`}</Eq>
      <Box kind="physics" title="度规 → 复结构，而且只依赖于共形类">
        <Tx>{R`推导中 $\sigma$ 与 $\sigma'$ 是什么并不重要：两个只相差 Weyl 因子 $\mathrm{e}^{2\phi}$ 的度规给出同一组等温坐标，因而同一个复结构。所以"度规的共形类 ↔ 复结构"——这正是弦论里 Weyl 对称性的几何内容：把 Weyl 变换与微分同胚都模掉之后，剩下的就是复结构的模空间（\secref{14.2.4}）。`}</Tx>
      </Box>
    </Sub>);
}

function Sub1412() {
  return (
    <Sub n="14.1.2" title="Vectors, forms and tensors" zh="向量、形式与张量">
      <p className="muted">本小节概念：<C id="helicity" /></p>
      <Tx>{R`令 $M=\Sigma_g$。向量场 $V^z\partial/\partial z\in TM^+$ 与 $V^{\bar z}\partial/\partial\bar z\in TM^-$ 的分量按下式变换：`}</Tx>
      <Eq n="14.10" say={R`全纯向量的分量乘以 $\partial w/\partial z$，反全纯向量的分量乘以它的复共轭：每个分量只"看见"一种导数。`}>{R`V^w=(\partial w/\partial z)V^z\qquad V^{\bar w}=(\partial\bar w/\partial\bar z)V^{\bar z}.`}</Eq>
      <Tx>{R`微分形式 $\omega_z\dd z\in\Omega^{1,0}(M)$ 与 $\omega_{\bar z}\dd\bar z\in\Omega^{0,1}(M)$ 的分量则按下式变换：`}</Tx>
      <Eq n="14.11" say={R`形式的分量按逆因子变换：$(1,0)$ 形式的分量除以 $\partial w/\partial z$。`}>{R`\omega_w=(\partial w/\partial z)^{-1}\omega_z\qquad\omega_{\bar w}=(\partial\bar w/\partial\bar z)^{-1}\omega_{\bar z}.`}</Eq>
      <Tx>{R`它们可以看作 $M=\Sigma_g$ 上全纯（反全纯）线丛的截面——转移函数正是全纯（反全纯）函数 $\partial w/\partial z$ 的幂。度规给出 $TM^+$ 与 $\Omega^{0,1}(M)$ 之间的自然同构：`}</Tx>
      <Eq n="14.12" say={R`用度规降指标，把全纯向量 $V^z$ 变成 $(0,1)$ 形式的分量 $\omega_{\bar z}$：一个 $z$ 上指标等价于一个 $\bar z$ 下指标。`}>{R`\omega_{\bar z}=g_{\bar zz}V^z,\qquad V^z=g^{z\bar z}\omega_{\bar z}.`}</Eq>
      <Tx>{R`同理 $TM^-$ 同构于 $\Omega^{1,0}(M)$：`}</Tx>
      <Eq n="14.13" say={R`同理，反全纯向量与 $(1,0)$ 形式通过度规相互转换。`}>{R`\omega_z=g_{z\bar z}V^{\bar z},\qquad V^{\bar z}=g^{\bar zz}\omega_z.`}</Eq>
      <Tx>{R`**只需要纯 $z$ 指标。**一般地，给定任意张量，可以用度规把所有 $\bar z$ 指标换成 $z$ 指标：上 $\bar z$ 指标降为下 $z$ 指标，下 $\bar z$ 指标升为上 $z$ 指标。容易看出`}</Tx>
      <Eq n="14.14" say={R`$q_2$ 个上 $\bar z$ 指标用 $g_{z\bar z}$ 降成下 $z$ 指标，$p_2$ 个下 $\bar z$ 指标用 $g^{z\bar z}$ 升成上 $z$ 指标：任何张量都等价于只带 $z$ 指标的张量。`}>{R`T^{\overbrace{z\ldots z}^{q_1}\overbrace{\bar z\ldots\bar z}^{q_2}}{}_{\underbrace{z\ldots z}_{p_1}\underbrace{\bar z\ldots\bar z}_{p_2}}\to T^{\overbrace{z\ldots z}^{q_1+p_2}}{}_{\underbrace{z\ldots z}_{p_1+q_2}}=(g_{z\bar z})^{q_2}(g^{z\bar z})^{p_2}\,T^{\overbrace{z\ldots z}^{q_1}\overbrace{\bar z\ldots\bar z}^{q_2}}{}_{\underbrace{z\ldots z}_{p_1}\underbrace{\bar z\ldots\bar z}_{p_2}}.`}</Eq>
      <Tx>{R`这个对应是同构。例如 $T_{z\bar z}{}^{\bar z}\to g^{z\bar z}g_{z\bar z}T_{z\bar z}{}^{\bar z}=T_z{}^z{}_z$。因此只需考虑纯 $z$ 指标的张量，并为它们指定**螺旋度**（helicity）。由于 $T$ 只有 $z$ 指标，在 $z\to w$ 下它按下式变换：`}</Tx>
      <Eq n="14.15" keyEq title="螺旋度 n 的变换律" say={R`纯 $z$ 指标张量在全纯坐标变换下只乘以 $(\partial w/\partial z)$ 的 $n$ 次方：它是线丛 $K^{-n}$ 的截面，$n$ = 上指标数 − 下指标数。`}>{R`T\to\Big(\frac{\partial w}{\partial z}\Big)^nT`}</Eq>
      <Tx>{R`其中 $n\in\Z$ 等于上 $z$ 指标的个数减去下 $z$ 指标的个数。例如 $T^{zz}{}_z\to T^{ww}{}_w=\big(\frac{\partial w}{\partial z}\big)T^{zz}{}_z$。要紧的只是上、下指标个数之**差**：$T^z{}_z$ 在 $z\to w$ 下不变，被视为标量。数 $n$ 称为**螺旋度**。螺旋度为 $n$ 的张量的集合记作 $${TT}^n$：`}</Tx>
      <Eq n="14.16" title={R`张量空间 $\mathcal{T}^n$`} say={R`$\mathcal{T}^n$：所有"上指标数减下指标数等于 $n$"的纯 $z$ 指标张量。$n=1$ 是全纯向量，$n=-1$ 是 $(1,0)$ 形式，$n=-2$ 是二次微分。`}>{R`${TT}^n\equiv\{T^{\overbrace{z\ldots z}^{q}}{}_{\underbrace{z\ldots z}_{p}}\,|\,q-p=n\}.`}</Eq>
      <Tx>{R`螺旋度刻画了 $\mathrm{U}(1)=\mathrm{SO}(2)$（切平面转动群）的不可约表示：转动 $\theta$ 时 $T\in${TT}^n$ 乘以 $\mathrm{e}^{\mathrm{i}n\theta}$。

到目前为止我们假设 $n$ 是整数。可以证明 $n=\frac12$ 对应 $\Sigma_g$ 上的旋量场。事实上，Riemann 面上旋量的存在由 $\Sigma_g$ 的第二 Stiefel–Whitney 类平凡保证（第 11 章）。$${TT}^1$ 与 $\Sigma_g$ 上的全纯线丛 $K$ 等同，于是 $${TT}^{1/2}$ 是 $K$ 的**平方根**：$S_+^2=K=${TT}^1$，其中 $S_+$ 是正手征的旋量丛。同理 $${TT}^{-1}=\bar K=S_-^2$，$S_-$ 是负手征的旋量丛。（原书用 $S_\pm$ 而不用 $\Delta_\pm$ 记旋量丛，因为 $\Delta^\pm$ 留给 Laplace 算子。）`}</Tx>
      <Box kind="warning" title={R`注：$\mathcal{T}^1$ 与 $K$ 的约定`}>{R`按 \eqref{14.15}，$\mathcal{T}^n$ 的转移函数是 $(\partial w/\partial z)^n$，与全纯切丛 $TM^+$ 的 $n$ 次幂相同；而典范丛 $K=\Omega^{1,0}$ 的转移函数是 $(\partial w/\partial z)^{-1}$。所以严格说 $\mathcal{T}^1\cong TM^+=K^{-1}$，$\mathcal{T}^{-1}\cong K$。原书写 $\mathcal{T}^1=K$，是把"$K$"当作与本章螺旋度符号相反的约定；本站保留原书写法，计数时（交互图 2）一律用 $\mathcal{T}^{-m}\leftrightarrow K^m$（$m$ 次全纯微分）。`}</Box>
      <Box kind="example" n="14.1" title="实指标下的螺旋度">
        <Tx>{R`用实指标表示，螺旋度 $\pm1$ 的向量是 $V^1\pm\mathrm{i}V^2$。这是因为

$$V^1\frac{\partial}{\partial\xi^1}+V^2\frac{\partial}{\partial\xi^2}=(V^1+\mathrm{i}V^2)\partial_z+(V^1-\mathrm{i}V^2)\partial_{\bar z}.$$

令 $V^z=V^1+\mathrm{i}V^2$、$V^{\bar z}=V^1-\mathrm{i}V^2\simeq V_z$。螺旋度 $\pm2$ 的张量是 $T^{11}\pm\mathrm{i}T^{12}$，其中 $T$ 是二阶**对称无迹**张量（$T^{22}=-T^{11}$）。事实上

$$T^{11}\Big(\frac{\partial}{\partial\xi^1}\otimes\frac{\partial}{\partial\xi^1}-\frac{\partial}{\partial\xi^2}\otimes\frac{\partial}{\partial\xi^2}\Big)+T^{12}\Big(\frac{\partial}{\partial\xi^1}\otimes\frac{\partial}{\partial\xi^2}+\frac{\partial}{\partial\xi^2}\otimes\frac{\partial}{\partial\xi^1}\Big)=2(T^{11}+\mathrm{i}T^{12})\partial_z\otimes\partial_z+2(T^{11}-\mathrm{i}T^{12})\partial_{\bar z}\otimes\partial_{\bar z}.$$

（验证：$\partial_1=\partial_z+\partial_{\bar z}$、$\partial_2=\mathrm{i}(\partial_z-\partial_{\bar z})$，所以 $\partial_1\otimes\partial_1-\partial_2\otimes\partial_2=2\partial_z\otimes\partial_z+2\partial_{\bar z}\otimes\partial_{\bar z}$，$\partial_1\otimes\partial_2+\partial_2\otimes\partial_1=2\mathrm{i}(\partial_z\otimes\partial_z-\partial_{\bar z}\otimes\partial_{\bar z})$。）显然 $T^{zz}=2(T^{11}+\mathrm{i}T^{12})$ 的螺旋度为 $+2$，$T^{\bar z\bar z}=2(T^{11}-\mathrm{i}T^{12})$ 的螺旋度为 $-2$（注意 $g_{z\bar z}g_{z\bar z}T^{\bar z\bar z}=T_{zz}$）。

**物理意义：**对称无迹张量在二维只有两个实自由度，正好组成螺旋度 $\pm2$ 的一对——这就是"引力子"在世界面上的螺旋度；度规的无迹变形 $\delta\gamma_{zz}$ 属于 $\mathcal{T}^{-2}$。`}</Tx>
      </Box>
      <Box kind="warning" title={R`勘误：例 14.1 中的分量（p.551）`}>{R`原书写"螺旋度 $\pm2$ 的张量是 $T^{11}\pm\mathrm{i}T^{22}$"以及"$T^{zz}=2(T^1+\mathrm{i}T^{12})$"。由紧接着的展开式，应为 $T^{11}\pm\mathrm{i}T^{12}$ 与 $T^{zz}=2(T^{11}+\mathrm{i}T^{12})$（无迹条件下 $T^{22}=-T^{11}$，$T^{11}\pm\mathrm{i}T^{22}$ 不是螺旋度本征态）。正文已改正。`}</Box>
    </Sub>);
}

function Sub1413() {
  return (
    <Sub n="14.1.3" title="Covariant derivatives" zh="协变导数">
      <p className="muted">本小节概念：<C id="cov_deriv" /></p>
      <Tx>{R`**联络只有一个分量。**$\Sigma_g$ 是 Kähler 流形（任何 Hermite 度规在复一维都是 Kähler 的），其 Levi-Civita 联络就是 Hermite 联络 \eqref{8.69}。唯一不为零的 Christoffel 记号是`}</Tx>
      <Eq n="14.17" say={R`共形平坦度规的联络只剩两个分量，都是共形因子的导数：$2\partial_z\sigma$ 像一个 U(1) 规范势。`}>{R`\Gamma^z{}_{zz}=g^{z\bar z}\partial_zg_{z\bar z}=2\partial_z\sigma\qquad\Gamma^{\bar z}{}_{\bar z\bar z}=g^{\bar zz}\partial_{\bar z}g_{\bar zz}=2\partial_{\bar z}\sigma.`}</Eq>
      <Tx>{R`对 $${TT}^n$ 中的张量定义两种协变导数：$${DU("n")}:${TT}^n\to${TT}^{n+1}$ 与 $${DL("n")}:${TT}^n\to${TT}^{n-1}$。设 $T^{z\ldots z}{}_{z\ldots z}\in${TT}^n$（$q$ 个上指标、$p$ 个下指标，$q-p=n$）。定义`}</Tx>
      <Eq n="14.18a" title={R`升螺旋度的导数 $\nabla^z_{(n)}$`} say={R`对 $\bar z$ 求协变导数再用逆度规升成 $z$ 指标：螺旋度加一。因为 $\Gamma^{\bar z}{}_{\bar zz}=0$，它就是普通的 $\partial_{\bar z}$ 乘以 $g^{z\bar z}$。`}>{R`\begin{aligned}${DU("n")}T^{z\ldots z}{}_{z\ldots z}&=g^{z\bar z}\nabla_{\bar z}T^{z\ldots z}{}_{z\ldots z}\\&=g^{z\bar z}[\partial_{\bar z}+(q-p)\Gamma^z{}_{\bar zz}]T^{z\ldots z}{}_{z\ldots z}\\&=g^{z\bar z}\partial_{\bar z}T^{z\ldots z}{}_{z\ldots z}\end{aligned}`}</Eq>
      <Eq n="14.18b" title={R`降螺旋度的导数 $\nabla_z^{(n)}$`} say={R`对 $z$ 求协变导数：每个上指标贡献 $+\Gamma^z{}_{zz}$、每个下指标贡献 $-\Gamma^z{}_{zz}$，合起来是 $2n\partial_z\sigma$——像荷为 $n$ 的粒子在规范势 $2\partial_z\sigma$ 中的协变导数。`}>{R`\begin{aligned}${DL("n")}T^{z\ldots z}{}_{z\ldots z}&=\nabla_zT^{z\ldots z}{}_{z\ldots z}\\&=[\partial_z+(q-p)\Gamma^z{}_{zz}]T^{z\ldots z}{}_{z\ldots z}\\&=(\partial_z+2n\partial_z\sigma)T^{z\ldots z}{}_{z\ldots z}.\end{aligned}`}</Eq>
      <Tx>{R`在 \eqref{14.18b} 中，$2n\partial_z\sigma$ 的作用就像一个规范势 $\mathcal{A}$（第 10 章）：$${TT}^n$ 是"荷 $n$"的线丛。我们也定义对 $\bar z$ 的协变导数`}</Tx>
      <Eq n="14.19" say={R`对 $\bar z$ 的两种导数只是把上面两种导数再用度规升降一次。`}>{R`${DUb("n")}=g^{\bar zz}${DL("n")},\qquad${DLb("n")}=g_{\bar zz}${DU("n")}.`}</Eq>
      <Tx>{R`$K$ 的曲率二形式与 Christoffel 记号相应的标量曲率为`}</Tx>
      <Eq n="14.20a" say={R`线丛的曲率就是"规范势" $2\partial_z\sigma$ 的外微分。`}>{R`\begin{aligned}\mathcal{F}&=R^z{}_{zz\bar z}\,\dd z\wedge\dd\bar z=-\partial_{\bar z}(2\partial_z\sigma)\,\dd z\wedge\dd\bar z\\&=-2\partial_z\partial_{\bar z}\sigma\,\dd z\wedge\dd\bar z\end{aligned}`}</Eq>
      <Eq n="14.20b" title="共形平坦度规的标量曲率" say={R`标量曲率只由共形因子的 Laplacian 决定：$\mathcal{R}=-8\mathrm{e}^{-2\sigma}\partial_z\partial_{\bar z}\sigma$（Gauss 曲率的两倍）。`}>{R`\mathcal{R}=g^{\bar zz}Ric_{\bar zz}+g^{z\bar z}Ric_{z\bar z}=-8\mathrm{e}^{-2\sigma}\partial_z\partial_{\bar z}\sigma.`}</Eq>
      <Tx>{R`（检验：$\mathrm{e}^{2\sigma}=1/y^2$ 的 Poincaré 度规给出 $\mathcal{R}=-2$，即 Gauss 曲率 $-1$，见习题 14.6。）`}</Tx>
      <Exercise n="14.1" title="协变导数的显式形式" level="★"
        hint={R`用 $g^{z\bar z}=2\mathrm{e}^{-2\sigma}$、$g_{\bar zz}=\frac12\mathrm{e}^{2\sigma}$ 与 \eqref{14.18a}、\eqref{14.19}；对 $\nabla_z^{(n)}$ 注意 $\mathrm{e}^{-2n\sigma}\partial_z(\mathrm{e}^{2n\sigma}T)=\partial_zT+2n(\partial_z\sigma)T$。`}
        solution={R`**(a)** 由 \eqref{14.18a}：$\nabla^z_{(n)}T=g^{z\bar z}\partial_{\bar z}T=2\mathrm{e}^{-2\sigma}\partial_{\bar z}T$。由 \eqref{14.18b}：$\nabla_z^{(n)}T=(\partial_z+2n\partial_z\sigma)T=\mathrm{e}^{-2n\sigma}\partial_z(\mathrm{e}^{2n\sigma}T)$。

**(b)** 由 \eqref{14.19}：$\nabla^{\bar z}_{(n)}=g^{\bar zz}\nabla_z^{(n)}=2\mathrm{e}^{-2\sigma}\mathrm{e}^{-2n\sigma}\partial_z\mathrm{e}^{2n\sigma}=2\mathrm{e}^{-2(n+1)\sigma}\partial_z\mathrm{e}^{2n\sigma}$；$\nabla_{\bar z}^{(n)}=g_{\bar zz}\nabla^z_{(n)}=\frac12\mathrm{e}^{2\sigma}\cdot2\mathrm{e}^{-2\sigma}\partial_{\bar z}=\partial_{\bar z}$。

（算子写法中 $\partial_z\mathrm{e}^{2n\sigma}$ 表示"先乘 $\mathrm{e}^{2n\sigma}$ 再求导"。）`}>
        <Tx>{R`验证：`}</Tx>
        <Eq n="14.21a" title="协变导数的显式形式" say={R`升螺旋度的导数就是 $\partial_{\bar z}$（乘以 $2\mathrm{e}^{-2\sigma}$）；降螺旋度的导数是"用 $\mathrm{e}^{2n\sigma}$ 规范变换过的" $\partial_z$。`}>{R`${DU("n")}=2\mathrm{e}^{-2\sigma}\partial_{\bar z}\qquad${DL("n")}=\mathrm{e}^{-2n\sigma}\partial_z\mathrm{e}^{2n\sigma}`}</Eq>
        <Eq n="14.21b" say={R`对 $\bar z$ 的两种导数的显式形式。`}>{R`${DUb("n")}=2\mathrm{e}^{-2(n+1)\sigma}\partial_z\mathrm{e}^{2n\sigma}\qquad${DLb("n")}=\partial_{\bar z}.`}</Eq>
      </Exercise>
      <Tx>{R`**伴随关系。**$${DU("n")}$ 与 $${DL("n")}$ 在适当定义的内积下互为（负）伴随。设 $T,U\in${TT}^n$。我们要求内积在全纯坐标变换 $z\to w$ 下不变。由于

$$g_{z\bar z}\to|\dd w/\dd z|^{-2}g_{z\bar z}\qquad\dd^2z\sqrt g\to\dd^2w\sqrt g\qquad\bar T\to\sym{conj}{\overline{(\dd w/\dd z)}}^n\bar T\qquad U\to(\dd w/\dd z)^nU,$$

可知组合`}</Tx>
      <Eq n="14.22" title={R`$\mathcal{T}^n$ 上的不变内积`} say={R`$\bar TU$ 多出的 $|\dd w/\dd z|^{2n}$ 正好被 $(g_{z\bar z})^n$ 吃掉：这是 $\mathcal{T}^n$ 上唯一自然的（与坐标无关的）内积。`}>{R`(T,U)\equiv\int\dd^2z\sqrt g(g_{z\bar z})^n\bar TU`}</Eq>
      <Tx>{R`在全纯坐标变换下不变。取 $T\in${TT}^n$、$U\in${TT}^{n+1}$。用 $\sqrt g=\mathrm{e}^{2\sigma}$、$(g_{z\bar z})^{n+1}=2^{-n-1}\mathrm{e}^{2(n+1)\sigma}$：

$$\begin{aligned}(U,${DU("n")}T)&=\int\dd^2z\,\mathrm{e}^{2\sigma}2^{-n-1}\mathrm{e}^{2(n+1)\sigma}\bar U\,2\mathrm{e}^{-2\sigma}\partial_{\bar z}T\\&=-2^{-n}\int\dd^2z\,T\partial_{\bar z}[\mathrm{e}^{2(n+1)\sigma}\bar U]\qquad\text{（分部积分）}\\&=-2^{-n}\int\dd^2z\,T\mathrm{e}^{2(n+1)\sigma}\sym{conj}{\overline{[\partial_zU+2(n+1)(\partial_z\sigma)U]}}\\&=-\int\dd^2z\sqrt g(g_{z\bar z})^n\sym{conj}{\overline{[${DL("n+1")}U]}}\,T=(-${DL("n+1")}U,T).\end{aligned}$$

这说明`}</Tx>
      <Eq n="14.23a" keyEq title="伴随关系 (a)" say={R`升螺旋度导数的伴随是负的降螺旋度导数：它们像 $\bar\partial$ 与 $-\partial$ 的弯曲空间版本。`}>{R`(${DU("n")})^\dagger=-${DL("n+1")}.`}</Eq>
      <Box kind="warning" title={R`勘误：伴随关系的推导（p.552）`}>{R`原书分部积分的第二、三行把 $\mathrm{e}^{2(n+1)\sigma}$ 印成 $\mathrm{e}^{(2n+1)\sigma}$、把 $2(n+1)(\partial_z\sigma)$ 印成 $(2n+1)(\partial_z\sigma)$；第一行明明给出 $\mathrm{e}^{2\sigma}\cdot2^{-n-1}\mathrm{e}^{2(n+1)\sigma}\cdot2\mathrm{e}^{-2\sigma}=2^{-n}\mathrm{e}^{2(n+1)\sigma}$。只有 $2(n+1)$ 才能拼成 $\nabla_z^{(n+1)}=\partial_z+2(n+1)\partial_z\sigma$ 并与最后一行的 $\sqrt g(g_{z\bar z})^n=2^{-n}\mathrm{e}^{2(n+1)\sigma}$ 匹配。此外原书最后一个等号写作 $\sym{conj}{\overline{(-\nabla_z^{(n+1)}U,T)}}$；由内积 \eqref{14.22} 对第一个变量反线性，左边恰为 $(-\nabla_z^{(n+1)}U,T)$，不带复共轭。结论 \eqref{14.23a} 不变。`}</Box>
      <Stmt id="F:adj14" />
      <Exercise n="14.2" title="另一个伴随关系" level="★"
        hint={R`可以直接仿照上面的分部积分；更省事的做法是对 \eqref{14.23a} 取伴随并把 $n$ 换成 $n-1$。`}
        solution={R`**方法一（取伴随）。**\eqref{14.23a} 对任意 $n$ 成立，把 $n$ 换成 $n-1$：$(\nabla^z_{(n-1)})^\dagger=-\nabla_z^{(n)}$（作为 $\mathcal{T}^{n-1}\to\mathcal{T}^n$ 的算子的伴随）。再取一次伴随（$A^{\dagger\dagger}=A$）：$(\nabla_z^{(n)})^\dagger=-\nabla^z_{(n-1)}$。

**方法二（直接计算）。**取 $T\in\mathcal{T}^n$、$U\in\mathcal{T}^{n-1}$：

$$(U,\nabla_z^{(n)}T)=\int\dd^2z\,2^{-(n-1)}\mathrm{e}^{2n\sigma}\bar U\,\mathrm{e}^{-2n\sigma}\partial_z(\mathrm{e}^{2n\sigma}T)=-2^{1-n}\int\dd^2z\,\mathrm{e}^{2n\sigma}T\,\partial_z\bar U.$$

而 $\partial_z\bar U=\sym{conj}{\overline{\partial_{\bar z}U}}=\sym{conj}{\overline{\frac12\mathrm{e}^{2\sigma}\nabla^z_{(n-1)}U}}$，故上式 $=-2^{-n}\int\dd^2z\,\mathrm{e}^{2(n+1)\sigma}\sym{conj}{\overline{\nabla^z_{(n-1)}U}}\,T=-\int\dd^2z\sqrt g(g_{z\bar z})^n\sym{conj}{\overline{\nabla^z_{(n-1)}U}}\,T=(-\nabla^z_{(n-1)}U,T)$。`}>
        <Tx>{R`证明`}</Tx>
        <Eq n="14.23b" say={R`降螺旋度导数的伴随是负的升螺旋度导数——与 \eqref{14.23a} 互为伴随。`}>{R`(${DL("n")})^\dagger=-${DU("n-1")}.`}</Eq>
      </Exercise>
      <Tx>{R`**两种 Laplace 算子。**定义 $\Delta^\pm_{(n)}:${TT}^n\to${TT}^{n\pm1}\to${TT}^n$：`}</Tx>
      <Eq n="14.24a" title={R`Laplace 算子 $\Delta^+_{(n)}$`} say={R`先升螺旋度再降回来：$\Delta^+=(\nabla^z)^\dagger\nabla^z$ 非负，核就是 $\ker\nabla^z_{(n)}$（全纯截面）。`}>{R`\Delta^+_{(n)}\equiv-${DL("n+1")}${DU("n")}=-2\mathrm{e}^{-2\sigma}[\partial_z\partial_{\bar z}+2n(\partial_z\sigma)\partial_{\bar z}]`}</Eq>
      <Eq n="14.24b" title={R`Laplace 算子 $\Delta^-_{(n)}$`} say={R`先降螺旋度再升回来：$\Delta^-=(\nabla_z)^\dagger\nabla_z$ 非负，核就是 $\ker\nabla_z^{(n)}$；它比 $\Delta^+$ 多一个曲率项。`}>{R`\Delta^-_{(n)}\equiv-${DU("n-1")}${DL("n")}=-2\mathrm{e}^{-2\sigma}[\partial_z\partial_{\bar z}+2n(\partial_z\sigma)\partial_{\bar z}+2n(\partial_z\partial_{\bar z}\sigma)].`}</Eq>
      <Derivation title={R`展开 \eqref{14.24a}–\eqref{14.24b}`} collapsed steps={[
        { tex: R`\Delta^+_{(n)}=-\mathrm{e}^{-2(n+1)\sigma}\partial_z\mathrm{e}^{2(n+1)\sigma}\cdot2\mathrm{e}^{-2\sigma}\partial_{\bar z}=-2\mathrm{e}^{-2(n+1)\sigma}\partial_z\big(\mathrm{e}^{2n\sigma}\partial_{\bar z}\,\cdot\big)`, why: R`用 \eqref{14.21a}；$\nabla^z_{(n)}T\in\mathcal{T}^{n+1}$，所以外面是 $\nabla_z^{(n+1)}$。` },
        { tex: R`=-2\mathrm{e}^{-2\sigma}[\partial_z\partial_{\bar z}+2n(\partial_z\sigma)\partial_{\bar z}]`, why: R`$\partial_z(\mathrm{e}^{2n\sigma}\partial_{\bar z}T)=\mathrm{e}^{2n\sigma}[\partial_z\partial_{\bar z}T+2n\partial_z\sigma\,\partial_{\bar z}T]$。` },
        { tex: R`\Delta^-_{(n)}=-2\mathrm{e}^{-2\sigma}\partial_{\bar z}\,\mathrm{e}^{-2n\sigma}\partial_z\mathrm{e}^{2n\sigma}=-2\mathrm{e}^{-2\sigma}\partial_{\bar z}(\partial_z+2n\partial_z\sigma)`, why: R`$\nabla_z^{(n)}T\in\mathcal{T}^{n-1}$，外面是 $\nabla^z_{(n-1)}=2\mathrm{e}^{-2\sigma}\partial_{\bar z}$。` },
        { tex: R`=-2\mathrm{e}^{-2\sigma}[\partial_z\partial_{\bar z}+2n(\partial_z\sigma)\partial_{\bar z}+2n(\partial_z\partial_{\bar z}\sigma)]`, why: R`$\partial_{\bar z}$ 也作用在 $\partial_z\sigma$ 上，多出曲率项。` },
      ]} />
      <Tx>{R`于是`}</Tx>
      <Eq n="14.25" title="两种 Laplacian 之差 = 曲率" say={R`两种 Laplace 算子只差一个乘法算子，正比于螺旋度乘以标量曲率——这是 Weitzenböck 公式在 Riemann 面上的形式，也是 Riemann–Roch 定理中 $n$ 依赖性的来源。`}>{R`\Delta^+_{(n)}-\Delta^-_{(n)}=4n\mathrm{e}^{-2\sigma}(\partial_z\partial_{\bar z}\sigma)=-\tfrac12n\mathcal{R}.`}</Eq>
      <Tx>{R`特别地，对标量（$n=0$）`}</Tx>
      <Eq n="14.26" say={R`对标量函数两种 Laplacian 相同：都是（$\frac12$ 倍的）Laplace–Beltrami 算子。`}>{R`\Delta^+_{(0)}=\Delta^-_{(0)}\;(\equiv\Delta_{(0)}).`}</Eq>
      <Box kind="physics" title="一张小地图：我们需要的几个空间">
        <Table head={["螺旋度", "几何对象", "相关算子", "弦论中的角色"]} rows={[
          [R`$n=1$（$\delta v^z$）`, "全纯向量场 / 无穷小微分同胚", R`$\nabla^z_{(1)}$：$\mathcal{T}^1\to\mathcal{T}^2$`, R`共形 Killing 向量 = $\ker\nabla^z_{(1)}$`],
          [R`$n=-1$（$\delta v_z$）`, R`同上（降指标）`, R`$\nabla_z^{(-1)}$：$\mathcal{T}^{-1}\to\mathcal{T}^{-2}$`, R`$P_1$ 的复形式 \eqref{14.100}`],
          [R`$n=-2$（$\delta\gamma_{zz}$）`, "度规的无迹变形；二次微分", R`$\nabla^z_{(-2)}$：$\mathcal{T}^{-2}\to\mathcal{T}^{-1}$`, R`模参数 = $\ker\nabla^z_{(-2)}$`],
          [R`$n=0$（$X^\mu$）`, "函数", R`$\Delta_{(0)}$`, R`物质场行列式 $(\det'\Delta)^{-13}$`],
        ]} />
      </Box>
    </Sub>);
}

function Sub1414() {
  return (
    <Sub n="14.1.4" title="The Riemann–Roch theorem" zh="Riemann–Roch 定理">
      <p className="muted">本小节概念：<C id="riemann_roch" /></p>
      <Tx>{R`**我们要做的事。**这里按 D'Hoker–Phong (1988) 从 Atiyah–Singer 指标定理（\sref{T12.2}）推出 Riemann–Roch 定理的一个版本。具体工具是第 12 章的热核表示（\sref{T12.5}）：指标 = 两个热核迹之差，与 $t$ 无关；取 $t\to0$，只需要热核对角元的短时展开。`}</Tx>
      <Stmt id="T14.1">
        <Eq n="14.27" keyEq title="Riemann–Roch 定理" say={R`$\nabla_z^{(n)}$ 的零模数减去其伴随的零模数是一个纯拓扑量 $(2n-1)(g-1)$：$n=-1$ 时它说"共形 Killing 向量数 − 二次微分数 $=3-3g$"。`}>{R`\dim_{\C}\ker${DL("n")}-\dim_{\C}\ker${DU("n-1")}=(2n-1)(g-1).`}</Eq>
        <Tx>{R`**约定。**本证明中 $\dd^2z=2\,\dd\xi^1\dd\xi^2$（$\dd^2w$ 同），这样平直热核 $K$ 才归一；同时把 $\Delta\equiv-2\partial_z\partial_{\bar z}$ 记作平直 Laplace 算子。`}</Tx>
        <Proof steps={[
          { claim: R`**化为 Laplace 算子的核。**由 \eqref{14.24a}，$\Delta^-_{(n)}=(\nabla_z^{(n)})^\dagger\nabla_z^{(n)}$、$\Delta^+_{(n-1)}=(\nabla^z_{(n-1)})^\dagger\nabla^z_{(n-1)}$（用 \eqref{14.23a}），所以 $\ker${DL("n")}=\ker\Delta^-_{(n)}$、$\ker${DU("n-1")}=\ker\Delta^+_{(n-1)}$。又 $\Delta^-_{(n)}$ 与 $\Delta^+_{(n-1)}$ 的非零谱相同（\sref{T12.5} 的论证），故对任意 $t>0$：`, tex: R`\ind${DL("n")}=\int\dd^2z\,[${KH}^-_n(z,z;t)-${KH}^+_{n-1}(z,z;t)]`, uses: ["F:adj14", "T12.5"] },
          { claim: R`**热核方程。**$\Delta^+_{(n)}$ 的热核 $${KH}^+_n$ 满足`, tex: R`\Big(\frac{\partial}{\partial t}+\Delta^+_{(n)}\Big)${KH}^+_n(z,w;t)=\Big(\frac{\partial}{\partial t}+\Delta-V_n\Big)${KH}^+_n(z,w;t)=0`, why: R`其中 $\Delta\equiv-2\partial_z\partial_{\bar z}$ 是平直空间的 Laplace 算子，"势" $V_n\equiv\Delta-\Delta^+_{(n)}=(1-\mathrm{e}^{-2\sigma})\Delta+4n\mathrm{e}^{-2\sigma}\partial_z\sigma\partial_{\bar z}$（由 \eqref{14.24a}）。` },
          { claim: R`平直 Laplace 算子的热核 $(\partial_t+\Delta)K(z,w;t)=0$ 容易求得：`, tex: R`K(z,w;t)=\frac{1}{4\pi t}\mathrm{e}^{-|z-w|^2/2t}.` },
          { claim: R`**微扰展开（Duhamel 迭代）。**把 $V_n$ 当微扰：`, tex: R`\begin{aligned}${KH}^+_n(z,z';t)&=K(z,z';t)+\int_0^t\dd s\int\dd w\,K(z,w;t-s)V_n(w)${KH}^+_n(w,z';s)\\&=K(z,z';t)+\int\dd s\int\dd w\,K(z,w;t-s)V_n(w)K(w,z';s)\\&\quad+\int\dd s\int\dd s'\int\dd v\int\dd w\,K(z,v;t-s)V_n(v)K(v,w;s-s')V_n(w)K(w,z';s')+\cdots.\end{aligned}` },
          { claim: R`我们只需要 $t$ 很小时的对角元：`, tex: R`${KH}^+_n(z,z;t)=\frac{1}{4\pi t}+\int_0^t\dd s\int\dd w\,K(z,w;t-s)V_n(w)K(w,z;s)+\mathcal{O}(t).\qquad(14.28)`, why: R`下面单独以 \eqref{14.28} 编号列出。` },
          { claim: R`**在 $z$ 点展开 $\sigma$。**取坐标使 $\sigma(z)=0$：`, tex: R`\sigma(w)\simeq0+\partial_z\sigma(w-z)+\partial_{\bar z}\sigma(\bar w-\bar z)+\tfrac12[\partial_z^2\sigma(w-z)^2+\partial_{\bar z}^2\sigma(\bar w-\bar z)^2+2\partial_z\partial_{\bar z}\sigma|w-z|^2]+\cdots`, why: R`由于二维的转动对称性，\eqref{14.28} 的积分中只有"一个 $z$ 导数配一个 $\bar z$ 导数"的项存活；正比于 $\partial_z\sigma\partial_{\bar z}\sigma$ 的项在展开的第二、三项之间相消，剩下正比于 $\partial_z\partial_{\bar z}\sigma$ 的项。于是 $V_n(w)$ 中起作用的部分是 $(1-\mathrm{e}^{-2\sigma})\Delta\to2\partial_z\partial_{\bar z}\sigma|w-z|^2\Delta_w$ 与 $4n\partial_w\sigma\partial_{\bar w}\to4n(\bar w-\bar z)\partial_z\partial_{\bar z}\sigma\partial_{\bar w}$。` },
          { claim: R`要计算的是`, tex: R`\int_0^t\dd s\int\dd^2w\,K(z,w;t-s)\big[2\partial_z\partial_{\bar z}\sigma|w-z|^2\Delta_w+4n(\bar w-\bar z)\partial_z\partial_{\bar z}\sigma\,\partial_{\bar w}\big]K(w,z;s).` },
          { claim: R`**两个 Gauss 积分**（取 $z=0$；$\dd^2w=2\,\dd x\,\dd y$，$\int\dd^2w\,|w|^{2k}\mathrm{e}^{-a|w|^2}=2\pi k!/a^{k+1}$，$a=\frac{t}{2s(t-s)}$）：`, tex: R`\begin{aligned}\int\dd^2w\,K(z,w;t-s)|w-z|^2\Delta_wK(w,z;s)&=\frac{1}{16\pi^2s^2(t-s)}\int\dd^2w|w|^2\exp\Big(-\frac{t}{2s(t-s)}|w|^2\Big)\\&\quad-\frac{1}{32\pi^2s^3(t-s)}\int\dd^2w|w|^4\exp\Big(-\frac{t}{2s(t-s)}|w|^2\Big)=\frac{(t-s)(2s-t)}{2\pi t^3}\end{aligned}`, why: R`$\Delta_w\mathrm{e}^{-|w|^2/2s}=-\frac12\nabla^2\mathrm{e}^{-r^2/2s}=\big(\frac1s-\frac{r^2}{2s^2}\big)\mathrm{e}^{-r^2/2s}$；两项分别为 $\frac{1}{16\pi^2s^2(t-s)}\cdot\frac{2\pi}{a^2}$ 与 $\frac{1}{32\pi^2s^3(t-s)}\cdot\frac{4\pi}{a^3}$，相减即得。`, fill: true },
          { claim: R`以及`, tex: R`\int\dd^2w\,K(z,w;t-s)(\bar z-\bar w)\partial_{\bar w}K(w,z;s)=\frac{1}{32\pi^2s^2(t-s)}\int\dd^2w\,|w|^2\exp\Big(-\frac{t}{2s(t-s)}|w|^2\Big)=\frac{t-s}{4\pi t^2}`, why: R`$(\bar z-\bar w)\partial_{\bar w}\mathrm{e}^{-|w|^2/2s}=\frac{|w|^2}{2s}\mathrm{e}^{-|w|^2/2s}$（$z=0$）。原书中间一步漏掉了 $|w|^2$（没有它结果会是 $1/8\pi st$），见下方勘误框。`, fill: true },
          { claim: R`**对 $s$ 积分**（令 $s=ut$）：`, tex: R`\int_0^t\frac{(t-s)(2s-t)}{2\pi t^3}\dd s=\frac{1}{2\pi}\int_0^1(1-u)(2u-1)\dd u=-\frac{1}{12\pi},\qquad\int_0^t\frac{t-s}{4\pi t^2}\dd s=\frac{1}{8\pi}.`, why: R`$\int_0^1(1-u)(2u-1)\dd u=\int_0^1(-2u^2+3u-1)\dd u=-\frac23+\frac32-1=-\frac16$。注意 $(\bar w-\bar z)=-(\bar z-\bar w)$。`, fill: true },
          { claim: R`合起来：$2\partial_z\partial_{\bar z}\sigma\cdot(-\frac1{12\pi})-4n\partial_z\partial_{\bar z}\sigma\cdot\frac1{8\pi}=-\frac{1+3n}{6\pi}\partial_z\partial_{\bar z}\sigma=\frac{1+3n}{12\pi}\Delta\sigma$，即 \eqref{14.29a}。`, fill: true },
          { claim: R`**$\Delta^-_{(n)}$ 的热核。**由 \eqref{14.25}，在 $\sigma(z)=0$ 处 $\Delta^-_{(n)}=\Delta^+_{(n)}+2n\Delta\sigma$（$\Delta\sigma=-2\partial_z\partial_{\bar z}\sigma$）。多出的常数势一阶贡献 $-2n\Delta\sigma\int_0^t\dd s\int\dd^2w\,K(z,w;t-s)K(w,z;s)=-2n\Delta\sigma\cdot tK(z,z;t)=-\frac{n}{2\pi}\Delta\sigma$，于是得 \eqref{14.29b}。`, fill: true, why: R`用 $K$ 的半群性质 $\int\dd^2w\,K(z,w;t-s)K(w,z;s)=K(z,z;t)=\frac1{4\pi t}$；$\frac{1+3n}{12\pi}-\frac{6n}{12\pi}=\frac{1-3n}{12\pi}$。原书只写"我们也有"。` },
          { claim: R`**拼起来。**由 \eqref{14.29a} 与 \eqref{14.20b}：`, tex: R`\begin{aligned}\ind${DL("n")}&=\int\dd^2z\Big(\frac{1-3n}{12\pi}-\frac{1+3(n-1)}{12\pi}\Big)\Delta\sigma=\frac{1-2n}{8\pi}\int\dd^2x\sqrt g\,\mathcal{R}\\&=-\frac{2n-1}{2}\chi(\Sigma_g)=(2n-1)(g-1)\end{aligned}`, why: R`$\sqrt g\mathcal{R}=-8\partial_z\partial_{\bar z}\sigma=4\Delta\sigma$（\eqref{14.20b}，$\sqrt g=\mathrm{e}^{2\sigma}$），$\dd^2z=2\dd^2x$；其中 $\chi=\frac1{4\pi}\int\dd^2x\sqrt g\,\mathcal{R}=2-2g$ 是 $\Sigma_g$ 的 Euler 示性数（Gauss–Bonnet）。`, uses: ["14.20b"] },
        ]} />
      </Stmt>
      <Tx>{R`证明中用到的两个关键中间式单独编号如下：`}</Tx>
      <Eq n="14.28" say={R`短时热核的对角元：领头项是平直空间的 $1/4\pi t$，第一个修正来自度规与平直度规之差 $V_n$。`}>{R`${KH}^+_n(z,z;t)=\frac{1}{4\pi t}+\int_0^t\dd s\int\dd w\,K(z,w;t-s)V_n(w)K(w,z;s)+\mathcal{O}(t).`}</Eq>
      <Eq n="14.29a" title={R`热核系数 $\mathcal{K}^+_n$`} say={R`热核对角元的常数项正比于共形因子的 Laplacian（即曲率），系数 $\frac{1+3n}{12\pi}$ 线性依赖于螺旋度。`}>{R`${KH}^+_n(z,z;t)=\frac{1}{4\pi t}+\frac{1+3n}{12\pi}\Delta\sigma+\mathcal{O}(t).`}</Eq>
      <Tx>{R`$\Delta^-_{(n)}$ 的热核 $${KH}^-_n$ 的对角部分同样为`}</Tx>
      <Eq n="14.29b" say={R`$\Delta^-$ 多出的曲率项把系数改成 $\frac{1-3n}{12\pi}$：两种热核在 $n\neq0$ 时有不同的局部"零模密度"。`}>{R`${KH}^-_n(z,z;t)=\frac{1}{4\pi t}+\frac{1-3n}{12\pi}\Delta\sigma+\mathcal{O}(t).`}</Eq>
      <Box kind="warning" title={R`勘误：第二个 Gauss 积分（p.555）`}>{R`原书写 $\int\dd^2w\,K(z,w;t-s)(\bar z-\bar w)\partial_{\bar w}K(w,z;s)=\frac{1}{32\pi^2s^2(t-s)}\int\dd^2w\exp\big(-\frac{t}{2s(t-s)}|w|^2\big)=\frac{t-s}{4\pi t^2}$。$(\bar z-\bar w)\partial_{\bar w}$ 作用在 Gauss 函数上带下 $|w|^2/2s$，中间的积分应含 $|w|^2$；按原书写法积出来是 $\frac{1}{8\pi st}$，与最后的 $\frac{t-s}{4\pi t^2}$ 不符。最终结果 $\frac{t-s}{4\pi t^2}$（从而 \eqref{14.29a}）是对的。另：本证明中 $\dd^2z$ 取 $2\,\dd\xi^1\dd\xi^2$，原书 $\int\dd^2x\,\mathcal{R}$ 中的面积元应理解为 $\sqrt g\,\dd^2x$。`}</Box>
      <Box kind="physics" title="三个检验">
        <Tx>{R`**(1)** $n=0$：$\Delta_{(0)}=\frac12\Delta_{\rm LB}$，热核常数项 $\frac{1}{12\pi}\Delta\sigma=\frac{\sqrt g\mathcal{R}}{48\pi}$（对 $\dd^2z$），换回 $\dd^2x$ 与 $\mathrm{e}^{-t\Delta_{\rm LB}/2}$ 正是熟知的 $\frac{\mathcal{R}}{24\pi}$ 热核系数。

**(2)** $n=1$（$\nabla_z^{(1)}$ 作用于向量，伴随作用于函数）：$\dim\ker\nabla_z^{(1)}-\dim\ker\nabla^z_{(0)}=g-1$。$\ker\nabla^z_{(0)}$ 是全纯函数，只有常数（1 维），所以 $\dim\ker\nabla_z^{(1)}=g$——即全纯一形式（Abel 微分）的个数，这是 Riemann 面上熟知的 $h^{1,0}=g$。

**(3)** $n=-1$：$\dim\ker\nabla_z^{(-1)}-\dim\ker\nabla^z_{(-2)}=3-3g$，见 \eqref{14.113}——弦测度的全部维数计数都来自这里。交互图 2 对任意 $g$、$n$ 列出了两个核的维数。`}</Tx>
      </Box>
    </Sub>);
}
