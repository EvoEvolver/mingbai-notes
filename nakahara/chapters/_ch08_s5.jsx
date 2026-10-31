// §8.5 Kähler 流形与 Kähler 微分几何 —— 式 (8.80)–(8.101)，定义 8.4，定理 8.5–8.7，例 8.6–8.8，习题 8.8，图 8.5
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Proof, Exercise, Derivation, C } from "@kit";

const R = String.raw;

export function Sec85() {
  return (
    <Sec n="8.5" title="Kähler manifolds and Kähler differential geometry" zh="Kähler 流形与 Kähler 微分几何"
      gist={R`Kähler = Kähler 形式闭合 $\dd\Omega=0$（\sref{D8.4}）$\iff$ Levi-Civita 联络下 $\nabla J=0$（\sref{T8.5}）$\iff\partial_\lambda g_{\mu\bar\nu}=\partial_\mu g_{\lambda\bar\nu}$ \eqref{8.82} $\iff$ 局部 $g_{\mu\bar\nu}=\partial_\mu\partial_{\bar\nu}\mathcal{K}$（Kähler 势）→ 例：$\C^m$、所有 Riemann 面、$\CP^m$ 上的 Fubini–Study 度规 → Kähler 几何：无挠、曲率多一个对称性、Ricci 形式 = Ricci 张量；Ricci 平坦 ⇒ $c_1=0$（\sref{T8.6}）；Calabi–Yau 流形的和乐群 $\subset\mathrm{SU}(m)$（\sref{T8.7}）。`}
      why={R`Kähler 流形上，Riemann 结构与复结构完全相容：Hermite 联络就是 Levi-Civita 联络，整个度规由一个实函数（Kähler 势）决定。这让 Hodge 理论（§8.6）把 de Rham 上同调按 $(r,s)$ 精确分解；而 Ricci 平坦的紧 Kähler 流形（Calabi–Yau）保持一部分超对称，是超弦紧化的标准选择。`}
      gives={["8.80", "8.82", "8.83", "8.84", "8.86", "8.89", "8.93", "8.95", "8.96a", "8.97", "8.99", "8.101"]}>
      <p className="muted">本节概念：<C id="kahler" /> · <C id="calabi_yau" /></p>

      <Sub n="8.5.1" title="Definitions" zh="定义">
        <Stmt id="D8.4" />
        <Stmt id="T8.5">
          <Proof title="定理 8.5 的证明（「⇒」方向原书从略，本站补全）" steps={[
            { claim: R`**引理：用 Levi-Civita 联络写外微分。**对任意 $r$ 形式 $\omega$，`, tex: R`\dd\omega=\nabla\omega\equiv\frac1{r!}\nabla_\mu\omega_{\nu_1\ldots\nu_r}\dd x^\mu\wedge\dd x^{\nu_1}\wedge\ldots\wedge\dd x^{\nu_r}`, uses: ["8.81"], why: R`$\nabla_\mu\omega_{\nu\ldots}$ 与 $\partial_\mu\omega_{\nu\ldots}$ 只差 $\Gamma^\kappa{}_{\mu\nu_i}\omega_{\ldots\kappa\ldots}$ 型的项；Levi-Civita 联络对两个下指标对称，与反对称的 $\dd x^\mu\wedge\dd x^{\nu_i}$ 缩并为零。` },
            { claim: R`**$\nabla\Omega$ 与 $\nabla J$。**对任意 $X,Y,Z$：`, tex: R`\begin{aligned}(\nabla_Z\Omega)(X,Y)&=\nabla_Z[\Omega(X,Y)]-\Omega(\nabla_ZX,Y)-\Omega(X,\nabla_ZY)\\&=\nabla_Z[g(JX,Y)]-g(J\nabla_ZX,Y)-g(JX,\nabla_ZY)\\&=(\nabla_Zg)(JX,Y)+g(\nabla_ZJX,Y)-g(J\nabla_ZX,Y)\\&=g(\nabla_ZJX-J\nabla_ZX,Y)=g((\nabla_ZJ)X,Y)\end{aligned}`, uses: ["8.55", "T7.1"], why: R`第三行用 $Z[g(A,B)]=(\nabla_Zg)(A,B)+g(\nabla_ZA,B)+g(A,\nabla_ZB)$；第四行用度规相容 $\nabla_Zg=0$。因为 $g$ 非退化，$\nabla_Z\Omega=0\iff\nabla_ZJ=0$。` },
            { claim: R`**"⇐"：$\nabla J=0\Rightarrow$ Kähler。**由上一步 $\nabla\Omega=0$，由引理 $\dd\Omega=\nabla\Omega=0$。` },
            { claim: R`**"⇒"：Kähler $\Rightarrow\nabla J=0$。**原书的论证只给出了 $\nabla J=0\iff\nabla\Omega=0$ 与 $\dd\Omega=\nabla\Omega$（反对称化部分），后者并不直接推出 $\nabla\Omega=0$。用本章的结果补全：$\dd\Omega=0$ 推出 \eqref{8.82}（见下文的计算）。`, uses: ["8.82"], fill: true },
            { claim: R`由 \eqref{8.82}，Hermite 联络的挠率 \eqref{8.73a}、\eqref{8.73b} 为零（\eqref{8.96a}、\eqref{8.96b}）；而它本来就度规相容（\eqref{8.68}）。看成实切丛上的联络，它是无挠且度规相容的联络。`, uses: ["8.96a", "8.68"], fill: true },
            { claim: R`由 Riemann 几何基本定理（\sref{T7.1}），无挠且度规相容的联络唯一，就是 Levi-Civita 联络。所以在 Kähler 流形上 Levi-Civita 联络 = Hermite 联络，而后者满足 $\nabla J=0$（\sref{T8.4}）。`, uses: ["T7.1", "T8.4"], fill: true },
          ]} />
        </Stmt>
        <Eq n="8.80" keyEq title="Kähler 条件的联络形式" say={R`在 Kähler 流形上，用 Levi-Civita 联络做平行移动也保持"乘以 $\mathrm{i}$"：复结构是平行的。`}>{R`\nabla_\mu J=0`}</Eq>
        <Eq n="8.81" say={R`对无挠联络，外微分可以把偏导换成协变导数：联络项在反对称化下消失。`}>{R`\dd\omega=\nabla\omega\equiv\frac1{r!}\nabla_\mu\omega_{\nu_1\ldots\nu_r}\,\dd x^\mu\wedge\dd x^{\nu_1}\wedge\ldots\wedge\dd x^{\nu_r}.`}</Eq>
        <Tx>{R`［例如

$$\begin{aligned}\nabla\Omega&=\tfrac12\nabla_\lambda\Omega_{\mu\nu}\dd x^\lambda\wedge\dd x^\mu\wedge\dd x^\nu\\&=\tfrac12(\partial_\lambda\Omega_{\mu\nu}-\Gamma^\kappa{}_{\lambda\mu}\Omega_{\kappa\nu}-\Gamma^\kappa{}_{\lambda\nu}\Omega_{\mu\kappa})\dd x^\lambda\wedge\dd x^\mu\wedge\dd x^\nu\\&=\tfrac12\partial_\lambda\Omega_{\mu\nu}\dd x^\lambda\wedge\dd x^\mu\wedge\dd x^\nu=\dd\Omega,\end{aligned}$$

因为 $\Gamma$ 是对称的。］定理 8.4 与 8.5 说明：在 Kähler 流形中，Riemann 结构与 Hermite 结构是相容的。

**Kähler 条件的分量形式。**设 $g$ 是 Kähler 度规。由 $\dd\Omega=0$，

$$\begin{aligned}(\partial+\bar\partial)\,\mathrm{i}g_{\mu\bar\nu}\dd z^\mu\wedge\dd\bar z^\nu&=\mathrm{i}\partial_\lambda g_{\mu\bar\nu}\dd z^\lambda\wedge\dd z^\mu\wedge\dd\bar z^\nu+\mathrm{i}\partial_{\bar\lambda}g_{\mu\bar\nu}\dd\bar z^\lambda\wedge\dd z^\mu\wedge\dd\bar z^\nu\\&=\tfrac12\mathrm{i}(\partial_\lambda g_{\mu\bar\nu}-\partial_\mu g_{\lambda\bar\nu})\dd z^\lambda\wedge\dd z^\mu\wedge\dd\bar z^\nu\\&\quad+\tfrac12\mathrm{i}(\partial_{\bar\lambda}g_{\mu\bar\nu}-\partial_{\bar\nu}g_{\mu\bar\lambda})\dd\bar z^\lambda\wedge\dd z^\mu\wedge\dd\bar z^\nu=0\end{aligned}$$

（第二个等号把系数对 $\lambda\leftrightarrow\mu$、$\bar\lambda\leftrightarrow\bar\nu$ 反对称化；两项双次不同，必须分别为零。）由此得到`}</Tx>
        <Eq n="8.82" keyEq title="Kähler 条件的分量形式" say={R`Kähler 度规的混合分量的导数可以交换指标：全纯导数指标与全纯度规指标对称，反全纯的也一样——这正是"度规局部是某个函数的 $\partial\bar\partial$"的可积条件。`}>{R`\frac{\partial g_{\mu\bar\nu}}{\partial z^\lambda}=\frac{\partial g_{\lambda\bar\nu}}{\partial z^\mu}\qquad\frac{\partial g_{\mu\bar\nu}}{\partial\bar z^\lambda}=\frac{\partial g_{\mu\bar\lambda}}{\partial\bar z^\nu}.`}</Eq>
        <Tx>{R`**Kähler 势。**设 Hermite 度规 $g$ 在卡 $U_i$ 上由`}</Tx>
        <Eq n="8.83" keyEq title="Kähler 势" say={R`整个 Kähler 度规（$m^2$ 个分量）局部由一个实函数 $\mathcal{K}$ 的混合二阶导数给出。`}>{R`g_{\mu\bar\nu}=\partial_\mu\partial_{\bar\nu}\mathcal{K}_i`}</Eq>
        <Tx>{R`给出，其中 $\mathcal{K}_i\in\mathcal{F}(U_i)$。这个度规显然满足条件 \eqref{8.82}（偏导可交换），所以是 Kähler 的。反之，可以证明任何 Kähler 度规*局部*都可表示为 \eqref{8.83}（这是 $\partial\bar\partial$ 引理的局部形式：闭的实 $(1,1)$ 形式局部是 $\mathrm{i}\partial\bar\partial$ 某个实函数）。函数 $\mathcal{K}_i$ 称为 Kähler 度规的 **Kähler 势**。由此 $\Omega=\mathrm{i}\partial\bar\partial\mathcal{K}_i$ 在 $U_i$ 上成立（$\partial\bar\partial\mathcal{K}=\partial_\mu\partial_{\bar\nu}\mathcal{K}\,\dd z^\mu\wedge\dd\bar z^\nu$）。

设 $(U_i,\varphi_i)$ 与 $(U_j,\varphi_j)$ 是重叠的卡。在 $U_i\cap U_j$ 上

$$\frac{\partial}{\partial z^\mu}\frac{\partial}{\partial\bar z^\nu}\mathcal{K}_i\,\dd z^\mu\otimes\dd\bar z^\nu=\frac{\partial}{\partial w^\alpha}\frac{\partial}{\partial\bar w^\beta}\mathcal{K}_j\,\dd w^\alpha\otimes\dd\bar w^\beta,$$

其中 $z=\varphi_i(p)$，$w=\varphi_j(p)$。于是`}</Tx>
        <Eq n="8.84" say={R`两张卡上的 Kähler 势给出同一个度规：Jacobi 矩阵乘上去之后，混合二阶导数相等。`}>{R`\frac{\partial w^\alpha}{\partial z^\mu}\frac{\partial\bar w^\beta}{\partial\bar z^\nu}\frac{\partial}{\partial w^\alpha}\frac{\partial}{\partial\bar w^\beta}\mathcal{K}_j=\frac{\partial}{\partial z^\mu}\frac{\partial}{\partial\bar z^\nu}\mathcal{K}_i.`}</Eq>
        <Tx>{R`它（局部地）成立当且仅当 $\mathcal{K}_j(w,\bar w)=\mathcal{K}_i(z,\bar z)+\phi_{ij}(z)+\psi_{ij}(\bar z)$，其中 $\phi_{ij}$（$\psi_{ij}$）是 $z$ 的全纯（反全纯）函数。（"当"：全纯函数与反全纯函数被 $\partial\bar\partial$ 消灭；"仅当"：差 $f=\mathcal{K}_j-\mathcal{K}_i$ 满足 $\partial_\mu\partial_{\bar\nu}f=0$，即 $\partial_\mu f$ 是全纯函数，局部积分出来即得。由于 $\mathcal{K}$ 是实的，可取 $\psi_{ij}=\overline{\phi}_{ij}$。）所以 Kähler 势一般不是整体定义的函数——例 8.8 中 $\CP^m$ 就是如此。`}</Tx>
        <Exercise n="8.8" title={R`$\Omega^m$ 闭而不恰当`} level="★★"
          hint={R`闭：由 \eqref{8.34} 与 $\dd\Omega=0$。不恰当：由 \sref{L8.1}，$\Omega^m$ 是体积元的 $m!$ 倍；若 $\Omega^m=\dd\eta$，由 Stokes 定理 $\int_M\Omega^m=\int_{\partial M}\eta=0$。`}
          solution={R`**闭。**由 Leibniz 律 \eqref{8.34}（$\Omega$ 是偶数阶，符号为正），$\dd(\Omega^m)=m\,\dd\Omega\wedge\Omega^{m-1}=0$。

**不恰当。**由 \sref{L8.1} 的计算，在正交归一基 $\{\hat e_1,J\hat e_1,\ldots\}$ 上 $\Omega^m=m!$，而 Riemann 体积元 $\mathrm{vol}_g$（取 $\Omega^m$ 所定的定向）在同一组基上取值 $1$，所以 $\Omega^m=m!\,\mathrm{vol}_g$，

$$\int_M\Omega^m=m!\,\mathrm{Vol}(M)>0.$$

若 $\Omega^m=\dd\eta$，$\eta\in\Omega^{2m-1}(M)$，由 Stokes 定理与 $\partial M=\emptyset$，$\int_M\Omega^m=\int_{\partial M}\eta=0$，矛盾。

**推论。**$[\Omega^m]$ 是 $H^{2m}(M;\R)$ 的非零元素，所以 $b^{2m}\ge1$（对紧连通可定向流形，$b^{2m}=1$ 本来就成立；更有意思的是 $b^{2p}\ge1$ 对一切 $1\le p\le m$ 成立，见 \sref{T8.11}——那里的论证完全相同：若 $\Omega^p=\dd\eta$，则 $\Omega^m=\dd(\Omega^{m-p}\wedge\eta)$）。`}>
          {R`设 $M$ 是无边紧 Kähler 流形。证明

$$\Omega^m\equiv\underbrace{\Omega\wedge\ldots\wedge\Omega}_m$$

是闭的但不是恰当的，其中 $m=\dim_\C M$。［提示：用 Stokes 定理。］因此第 $2m$ 个 Betti 数不为零，$b^{2m}\ge1$。后面将看到对 $1\le p\le m$ 有 $b^{2p}\ge1$。`}
        </Exercise>

        <Box kind="example" n="8.6" title={R`复欧氏空间 $\C^m$`}>
          <Tx>{R`设 $M=\C^m=\{(z^1,\ldots,z^m)\}$，通过 $z^\mu\to x^\mu+\mathrm{i}y^\mu$ 等同于 $\R^{2m}$。设 $\delta$ 是 $\R^{2m}$ 的欧氏度规：`}</Tx>
          <Eq n="8.85a" say={R`$\R^{2m}$ 的欧氏度规：实部方向与虚部方向两两正交，各自归一。`}>{R`\delta\left(\frac{\partial}{\partial x^\mu},\frac{\partial}{\partial x^\nu}\right)=\delta\left(\frac{\partial}{\partial y^\mu},\frac{\partial}{\partial y^\nu}\right)=\delta_{\mu\nu}\qquad\delta\left(\frac{\partial}{\partial x^\mu},\frac{\partial}{\partial y^\nu}\right)=0.`}</Eq>
          <Tx>{R`注意到 $J\partial/\partial x^\mu=\partial/\partial y^\mu$、$J\partial/\partial y^\mu=-\partial/\partial x^\mu$，可知 $\delta$ 是 Hermite 度规（$J$ 把正交归一基映到正交归一基）。在复坐标下，`}</Tx>
          <Eq n="8.85b" say={R`同一个欧氏度规在复基下只有混合分量，等于 $\frac12$——因子 $\frac12$ 来自 $\partial/\partial z$ 定义中的 $\frac12$。`}>{R`\delta\left(\frac{\partial}{\partial z^\mu},\frac{\partial}{\partial z^\nu}\right)=\delta\left(\frac{\partial}{\partial\bar z^\mu},\frac{\partial}{\partial\bar z^\nu}\right)=0\qquad\delta\left(\frac{\partial}{\partial z^\mu},\frac{\partial}{\partial\bar z^\nu}\right)=\delta\left(\frac{\partial}{\partial\bar z^\mu},\frac{\partial}{\partial z^\nu}\right)=\tfrac12\delta_{\mu\nu}.`}</Eq>
          <Tx>{R`（例如 $\delta(\partial_{z^\mu},\partial_{\bar z^\nu})=\frac14\delta(\partial_x-\mathrm{i}\partial_y,\partial_x+\mathrm{i}\partial_y)=\frac14(\delta_{\mu\nu}+\delta_{\mu\nu})$。）Kähler 形式为`}</Tx>
          <Eq n="8.86" keyEq title={R`$\C^m$ 的 Kähler 形式`} say={R`平直空间的 Kähler 形式就是各个复坐标平面上的面积元之和。`}>{R`\Omega=\frac{\mathrm{i}}{2}\sum_{\mu=1}^m\dd z^\mu\wedge\dd\bar z^\mu=\sum_{\mu=1}^m\dd x^\mu\wedge\dd y^\mu.`}</Eq>
          <Box kind="warning" title={R`勘误：\eqref{8.86} 右端没有因子 $\frac{\mathrm{i}}{2}$（p.353）`}>{R`原书印作 $\Omega=\frac{\mathrm{i}}{2}\sum\dd z^\mu\wedge\dd\bar z^\mu=\frac{\mathrm{i}}{2}\sum\dd x^\mu\wedge\dd y^\mu$。直接展开：$\dd z\wedge\dd\bar z=(\dd x+\mathrm{i}\dd y)\wedge(\dd x-\mathrm{i}\dd y)=-2\mathrm{i}\,\dd x\wedge\dd y$，所以 $\frac{\mathrm{i}}{2}\dd z\wedge\dd\bar z=\dd x\wedge\dd y$。用定义 \eqref{8.55} 独立核对：$\Omega(\partial_x,\partial_y)=\delta(J\partial_x,\partial_y)=\delta(\partial_y,\partial_y)=1$，与 $\dd x\wedge\dd y(\partial_x,\partial_y)=1$ 一致。（原书的右端是纯虚的，与 $\Omega$ 为实形式矛盾。）正文已改正。`}</Box>
          <Tx>{R`显然 $\dd\Omega=0$，所以 $\R^{2m}$ 的欧氏度规 $\delta$ 是 $\C^m$ 的 Kähler 度规。Kähler 势为`}</Tx>
          <Eq n="8.87" say={R`平直度规的 Kähler 势是到原点距离平方的一半。`}>{R`\mathcal{K}=\tfrac12\sum z^\mu\bar z^\mu.`}</Eq>
          <Tx>{R`（$\partial_\mu\partial_{\bar\nu}\mathcal{K}=\frac12\delta_{\mu\nu}$，与 \eqref{8.85b} 一致。）Kähler 流形 $\C^m$ 称为**复欧氏空间**（complex Euclid space）。`}</Tx>
        </Box>

        <Box kind="example" n="8.7" title="复一维流形都是 Kähler 的">{R`任何（可定向的）复流形 $M$，若 $\dim_\C M=1$，都是 Kähler 的。取 Hermite 度规 $g$（由 \sref{T8.2} 存在），设其 Kähler 形式为 $\Omega$。$\Omega$ 是实二形式，而三形式 $\dd\Omega$ 在实二维流形 $M$ 上必为零。一维紧（可定向）复流形称为 **Riemann 面**。（复流形总是可定向的，\sref{T8.3}，所以"可定向"一词是多余的。）`}</Box>

        <Box kind="example" n="8.8" title={R`$\CP^m$ 与 Fubini–Study 度规`}>
          <Tx>{R`复射影空间 $\CP^m$ 是 Kähler 流形。设 $(U_\alpha,\varphi_\alpha)$ 是一张卡，非齐次坐标 $\varphi_\alpha(p)=\xi^\nu_{(\alpha)}$，$\nu\neq\alpha$（例 8.3；这里齐次坐标记作 $z^1,\ldots,z^{m+1}$）。引入更整齐的记号 $\{\zeta^\nu_{(\alpha)}\mid1\le\nu\le m\}$：`}</Tx>
          <Eq n="8.88" say={R`把跳过第 $\alpha$ 个的非齐次坐标重新编号为 $1,\ldots,m$，只是改名。`}>{R`\xi^\nu{}_{(\alpha)}=\zeta^\nu{}_{(\alpha)}\quad(\nu\le\alpha-1)\qquad\xi^{\nu+1}{}_{(\alpha)}=\zeta^\nu{}_{(\alpha)}\quad(\nu\ge\alpha).`}</Eq>
          <Tx>{R`$\{\zeta^\nu{}_{(\alpha)}\}$ 只是 $\{\xi^\nu{}_{(\alpha)}\}$ 的重新命名。定义正定函数`}</Tx>
          <Eq n="8.89" keyEq title={R`$\CP^m$ 的局部 Kähler 势的指数`} say={R`在第 $\alpha$ 张卡上，$\mathcal{K}_\alpha=1+|\zeta|^2$ 等于齐次坐标的模方和除以 $|z^\alpha|^2$。`}>{R`\mathcal{K}_\alpha(p)\equiv\sum_{\nu=1}^m|\zeta^\nu{}_{(\alpha)}(p)|^2+1=\sum_{\nu=1}^{m+1}\left|\frac{z^\nu}{z^\alpha}\right|^2.`}</Eq>
          <Tx>{R`在 $p\in U_\alpha\cap U_\beta$ 处，$\mathcal{K}_\alpha(p)$ 与 $\mathcal{K}_\beta(p)$ 的关系为`}</Tx>
          <Eq n="8.90" say={R`两张卡上的函数只差一个全纯函数的模方 $|z^\beta/z^\alpha|^2$。`}>{R`\mathcal{K}_\alpha(p)=\left|\frac{z^\beta}{z^\alpha}\right|^2\mathcal{K}_\beta(p).`}</Eq>
          <Tx>{R`于是`}</Tx>
          <Eq n="8.91" say={R`取对数后，两张卡上的 $\log\mathcal{K}$ 只差一个全纯函数加它的共轭——正是 Kähler 势允许的变换。`}>{R`\log\mathcal{K}_\alpha=\log\mathcal{K}_\beta+\log\frac{z^\beta}{z^\alpha}+\nosym{\overline{\log\frac{z^\beta}{z^\alpha}}}.`}</Eq>
          <Tx>{R`由于 $z^\beta/z^\alpha$ 是全纯函数，$\bar\partial\log z^\beta/z^\alpha=0$。又 $\partial\,\nosym{\overline{\log z^\beta/z^\alpha}}=\nosym{\overline{\bar\partial\log z^\beta/z^\alpha}}=0$（\eqref{8.42b}）。于是`}</Tx>
          <Eq n="8.92" say={R`$\partial\bar\partial\log\mathcal{K}$ 在各张卡上一致，是整体定义的二形式。`}>{R`\partial\bar\partial\log\mathcal{K}_\alpha=\partial\bar\partial\log\mathcal{K}_\beta.`}</Eq>
          <Tx>{R`（局部的 $\log z^\beta/z^\alpha$ 可能有分支，但它的导数没有歧义。）由此局部地定义一个闭二形式`}</Tx>
          <Eq n="8.93" keyEq title="Fubini–Study 的 Kähler 形式" say={R`$\CP^m$ 的 Kähler 形式：各卡上 $\mathrm{i}\partial\bar\partial\log(1+|\zeta|^2)$ 拼成整体的闭二形式。`}>{R`\Omega\equiv\mathrm{i}\partial\bar\partial\log\mathcal{K}_\alpha.`}</Eq>
          <Tx>{R`存在一个以 $\Omega$ 为 Kähler 形式的 Hermite 度规。取 $X,Y\in T_p\CP^m$，定义 $g:T_p\CP^m\otimes T_p\CP^m\to\R$ 为 $g(X,Y)=\Omega(X,JY)$（由 \eqref{8.55}，$\Omega(X,JY)=g(JX,JY)=g(X,Y)$，所以这是唯一可能的选择）。要证明 $g$ 是 Hermite 度规，需要证明 $g$ 满足 \eqref{8.50} 且正定。Hermite 性是显然的：$g(JX,JY)=-\Omega(JX,Y)=\Omega(Y,JX)=g(Y,X)$，再由 $\Omega$ 的 $J$ 不变性（$(1,1)$ 型）知 $g$ 对称，$g(Y,X)=g(X,Y)$。其次证明 $g$ 正定。在卡 $(U_\alpha,\varphi_\alpha)$ 上，`}</Tx>
          <Eq n="8.94" say={R`把 Kähler 形式在一张卡上写开：度规矩阵就是 $\log\mathcal{K}$ 的混合 Hesse 矩阵。`}>{R`\Omega=\mathrm{i}\frac{\partial^2\log\mathcal{K}}{\partial\zeta^\mu\partial\bar\zeta^\nu}\dd\zeta^\mu\wedge\dd\bar\zeta^\nu`}</Eq>
          <Tx>{R`这里为简洁省去了下标 $(\alpha)$。把 \eqref{8.89} 代入 $U_\alpha$ 上的 $\mathcal{K}$，得`}</Tx>
          <Eq n="8.95" keyEq title="Fubini–Study 度规" say={R`Fubini–Study 度规：在原点附近是平直度规 $\delta_{\mu\nu}$，越往外越"收缩"，让无穷远处的点也只在有限距离之外——整个 $\CP^m$ 是紧的。`}>{R`\Omega=\mathrm{i}\sum_{\mu,\nu}\frac{\delta_{\mu\nu}(\sum_\lambda|\zeta^\lambda|^2+1)-\bar\zeta^\mu\zeta^\nu}{(\sum_\lambda|\zeta^\lambda|^2+1)^2}\dd\zeta^\mu\wedge\dd\bar\zeta^\nu.`}</Eq>
          <Derivation title={R`由 \eqref{8.94} 推出 \eqref{8.95}`} collapsed steps={[
            { tex: R`\frac{\partial\log\mathcal{K}}{\partial\bar\zeta^\nu}=\frac{\zeta^\nu}{\mathcal{K}},\qquad\mathcal{K}=\sum_\lambda\zeta^\lambda\bar\zeta^\lambda+1`, why: R`$\partial(\zeta^\lambda\bar\zeta^\lambda)/\partial\bar\zeta^\nu=\zeta^\nu$。` },
            { tex: R`\frac{\partial}{\partial\zeta^\mu}\frac{\zeta^\nu}{\mathcal{K}}=\frac{\delta_{\mu\nu}}{\mathcal{K}}-\frac{\zeta^\nu\bar\zeta^\mu}{\mathcal{K}^2}=\frac{\delta_{\mu\nu}\mathcal{K}-\bar\zeta^\mu\zeta^\nu}{\mathcal{K}^2}`, why: R`商的导数；$\partial\mathcal{K}/\partial\zeta^\mu=\bar\zeta^\mu$。` },
          ]} />
          <Box kind="warning" title={R`勘误：\eqref{8.95} 分子中是 $\bar\zeta^\mu\zeta^\nu$，Schwarz 不等式应为 $|\sum_\mu X^\mu\bar\zeta^\mu|^2\le\sum|X^\mu|^2\sum|\zeta^\lambda|^2$（p.354）`}>{R`原书 \eqref{8.95} 分子印作 $\delta_{\mu\nu}(\ldots)-\zeta^\mu\bar\zeta^\nu$，即正确矩阵的转置；上面的两步推导给出 $\bar\zeta^\mu\zeta^\nu$（$\mu$ 是全纯指标，对应 $\partial/\partial\zeta^\mu$ 作用在 $\mathcal{K}$ 上产生的 $\bar\zeta^\mu$）。相应地，下面 $g(X,X)$ 的式子中应是 $|\sum_\mu X^\mu\bar\zeta^\mu|^2$；原书引用的"Schwarz 不等式" $\sum|X^\mu|^2\sum|\zeta^\lambda|^2\ge\sum_\mu|X^\mu\zeta^\mu|^2$ 虽然成立但不是所需的那个——需要的是 Cauchy–Schwarz 不等式 $|\sum_\mu X^\mu\bar\zeta^\mu|^2\le\sum_\mu|X^\mu|^2\sum_\lambda|\zeta^\lambda|^2$。正定性的结论不变。交互图 2 在 $m=1$ 时独立地数值核对了这个度规。`}</Box>
          <Tx>{R`设 $X$ 是实向量，$X=X^\mu\partial/\partial\zeta^\mu+\overline{X}^\mu\partial/\partial\bar\zeta^\mu$，则 $JX=\mathrm{i}X^\mu\partial/\partial\zeta^\mu-\mathrm{i}\overline{X}^\mu\partial/\partial\bar\zeta^\mu$。于是（$(\dd\zeta^\mu\wedge\dd\bar\zeta^\nu)(X,JX)=-2\mathrm{i}X^\mu\overline{X}^\nu$）

$$\begin{aligned}g(X,X)=\Omega(X,JX)&=2\sum_{\mu,\nu}\frac{\delta_{\mu\nu}(\sum|\zeta^\lambda|^2+1)-\bar\zeta^\mu\zeta^\nu}{(\sum|\zeta^\lambda|^2+1)^2}X^\mu\overline{X}^\nu\\&=2\left[\sum_\mu|X^\mu|^2\Big(\sum_\lambda|\zeta^\lambda|^2+1\Big)-\Big|\sum_\mu X^\mu\bar\zeta^\mu\Big|^2\right]\Big(\sum_\lambda|\zeta^\lambda|^2+1\Big)^{-2}.\end{aligned}$$

由 Cauchy–Schwarz 不等式 $\sum_\mu|X^\mu|^2\cdot\sum_\lambda|\zeta^\lambda|^2\ge|\sum_\mu X^\mu\bar\zeta^\mu|^2$，方括号 $\ge\sum_\mu|X^\mu|^2>0$（$X\neq0$），所以度规 $g$ 正定。这个度规称为 $\CP^m$ 的 **Fubini–Study 度规**。`}</Tx>
          <Tx>{R`**补充：$m=1$ 时的第一陈类。**$\CP^1$ 上 $g_{\zeta\bar\zeta}=(1+|\zeta|^2)^{-2}$，$G=g_{\zeta\bar\zeta}$，由 \eqref{8.79}

$$\sym{ricf}{\mathfrak{R}}=\mathrm{i}\bar\partial\partial\log(1+|\zeta|^2)^{-2}=2\,\mathrm{i}\partial\bar\partial\log(1+|\zeta|^2)=2\Omega.$$

而 $\int_{\CP^1}\Omega=\int_{\R^2}\frac{2\,\dd x\,\dd y}{(1+r^2)^2}=2\pi$（用 $\frac{\mathrm{i}}{2}\dd\zeta\wedge\dd\bar\zeta=\dd x\wedge\dd y$），所以 $\int c_1=\int\sym{ricf}{\mathfrak{R}}/2\pi=2$——正是球面的 Euler 示性数 $\chi(S^2)=2$（第 11 章将看到 $c_1$ 的积分等于 Euler 数，对复一维流形）。$c_1\neq0$，所以 $\CP^1$ 上没有 Ricci 平坦的 Kähler 度规（\sref{T8.6}）。`}</Tx>
        </Box>
        <Tx>{R`几个有用的事实：

(a) 在已知的球面中，只有 $S^2$ 带有复结构（见下面的注记）。由于 $S^2\simeq\CP^1$，它是 Kähler 流形。
(b) 两个奇数维球面之积 $S^{2m+1}\times S^{2n+1}$ 总带有复结构（Calabi–Eckmann）。这个复结构不容许 Kähler 度规（例如 $S^1\times S^3$ 的 $b^2=0$，违反 \sref{T8.11} 的 $b^2\ge1$）。
(c) Kähler 流形的任何复子流形都是 Kähler 的（把 Kähler 形式拉回，拉回与 $\dd$ 交换，所以仍闭；且仍正定）。由此 $\CP^n$ 中的一切光滑代数簇（例 8.5）都是 Kähler 的。`}</Tx>
        <Box kind="warning" title={R`存疑：$S^6$ 上是否存在复结构仍是公开问题`}>{R`原书 (a) 断言"$S^2$ 是唯一带复结构的球面"，§8.7 又说 $S^6$ "不是复流形（Frölicher 1955）"。实际情况是：由 Borel–Serre，除 $S^2$、$S^6$ 外的球面连殆复结构都没有（例如 $S^4$，§8.7）；$S^6$ 有殆复结构（来自八元数），Frölicher 等证明了**这个**标准殆复结构不可积；但 $S^6$ 上是否存在**某个**可积的复结构，至今（Hopf 问题）尚无公认的解答。本站正文保留原书的叙述，但改为"在已知的球面中"。`}</Box>
      </Sub>

      <Sub n="8.5.2" title="Kähler geometry" zh="Kähler 几何">
        <Tx>{R`Kähler 度规 $g$ 由 \eqref{8.82} 刻画：

$$\frac{\partial g_{\mu\bar\nu}}{\partial z^\lambda}=\frac{\partial g_{\lambda\bar\nu}}{\partial z^\mu}\qquad\frac{\partial g_{\mu\bar\nu}}{\partial\bar z^\lambda}=\frac{\partial g_{\mu\bar\lambda}}{\partial\bar z^\nu}.$$

这保证 Kähler 度规的（Hermite 联络）是*无挠*的：`}</Tx>
        <Eq n="8.96a" keyEq title="Kähler ⇒ 无挠" say={R`把 Kähler 条件代入挠率公式 \eqref{8.73a}，括号恰好为零：Hermite 联络无挠，因而就是 Levi-Civita 联络。`}>{R`T^\lambda{}_{\mu\nu}=g^{\bar\xi\lambda}(\partial_\mu g_{\nu\bar\xi}-\partial_\nu g_{\mu\bar\xi})=0`}</Eq>
        <Eq n="8.96b" say={R`反全纯分量同样为零。`}>{R`T^{\bar\lambda}{}_{\bar\mu\bar\nu}=g^{\bar\lambda\xi}(\partial_{\bar\mu}g_{\bar\nu\xi}-\partial_{\bar\nu}g_{\bar\mu\xi})=0.`}</Eq>
        <Tx>{R`在这个意义上，Kähler 度规定义的联络与 Levi-Civita 联络非常相似（实际上就是它，见 \sref{T8.5} 的证明）。现在 Riemann 张量有一个额外的对称性`}</Tx>
        <Eq n="8.97" keyEq title="Kähler 曲率的额外对称性" say={R`Kähler 流形上，曲率的第二个与第三个全纯指标可以交换——这是 \eqref{8.82} 在曲率上的体现，使 Ricci 形式与 Ricci 张量相同。`}>{R`R^\kappa{}_{\lambda\mu\bar\nu}=-\partial_{\bar\nu}(g^{\bar\xi\kappa}\partial_\mu g_{\lambda\bar\xi})=-\partial_{\bar\nu}(g^{\bar\xi\kappa}\partial_\lambda g_{\mu\bar\xi})=R^\kappa{}_{\mu\lambda\bar\nu}`}</Eq>
        <Tx>{R`以及由 \eqref{8.97} 通过已知对称操作得到的`}</Tx>
        <Eq n="8.98" say={R`把额外对称性与复共轭、后两指标的反对称性组合起来得到的同类关系。`}>{R`R^{\bar\kappa}{}_{\bar\lambda\bar\mu\nu}=R^{\bar\kappa}{}_{\bar\mu\bar\lambda\nu},\qquad R^\kappa{}_{\lambda\bar\mu\nu}=R^\kappa{}_{\nu\bar\mu\lambda},\qquad R^{\bar\kappa}{}_{\bar\lambda\mu\bar\nu}=R^{\bar\kappa}{}_{\bar\nu\mu\bar\lambda}.`}</Eq>
        <Tx>{R`Ricci 形式 $\sym{ricf}{\mathfrak{R}}$ 的定义同前，

$$\sym{ricf}{\mathfrak{R}}=-\mathrm{i}\partial_{\bar\nu}\partial_\mu\log G\,\dd z^\mu\wedge\dd\bar z^\nu.$$

由于 \eqref{8.97}，Ricci 形式的分量与 $\mathrm{Ric}_{\mu\bar\nu}$ 一致：$\sym{ricf}{\mathfrak{R}}_{\mu\bar\nu}\equiv R^\kappa{}_{\kappa\mu\bar\nu}=R^\kappa{}_{\mu\kappa\bar\nu}=\mathrm{Ric}_{\mu\bar\nu}$。若 $\mathrm{Ric}=\sym{ricf}{\mathfrak{R}}=0$，就说 Kähler 度规是 **Ricci 平坦**的。`}</Tx>
        <Stmt id="T8.6">
          <Proof steps={[
            { claim: R`由假设，对度规 $h$ 有 $\sym{ricf}{\mathfrak{R}}(h)=0$。` },
            { claim: R`由上一节（\sref{P8.2} 的证明），两个 Hermite 度规的 Ricci 形式相差一个恰当形式：$\sym{ricf}{\mathfrak{R}}(g)-\sym{ricf}{\mathfrak{R}}(h)=\sym{ricf}{\mathfrak{R}}(g)=\dd\omega$。`, uses: ["P8.2"], why: R`$\det(g_{\mu\bar\nu})/\det(h_{\mu\bar\nu})$ 是正的**整体**函数（换卡时两个行列式乘同一个因子 $|\det|^2$），所以 $\sym{ricf}{\mathfrak{R}}(g)-\sym{ricf}{\mathfrak{R}}(h)=\mathrm{i}\bar\partial\partial\log(G_g/G_h)=\dd\big[\tfrac{\mathrm{i}}{2}(\partial-\bar\partial)\log(G_g/G_h)\big]$，不必沿路径积分。`, fill: true },
            { claim: R`因此用 $g$ 计算的 $c_1(M)$ 与用 $h$ 计算的一致，从而为零。` },
          ]} />
        </Stmt>
        <Tx>{R`第一陈类为零的紧 Kähler 流形称为 **Calabi–Yau 流形**。Calabi (1957) 猜想：若 $c_1(M)=0$，则 Kähler 流形 $M$ 容许 Ricci 平坦度规（更精确地：在每个 Kähler 类中恰有一个）。这由 Yau (1977) 证明。$\dim_\C M=3$ 的 Calabi–Yau 流形被提出作为超弦紧化的候选（见 Horowitz (1986) 与 Candelas (1988)）。最简单的例子：复环面 $T^2=\C/L$（平直度规，$m=1$）；K3 曲面（$m=2$）；$\CP^4$ 中的五次超曲面 $\sum_{i}(z^i)^5=0$（$m=3$），其 Hodge 数见交互图 4。`}</Tx>
      </Sub>

      <Sub n="8.5.3" title="The holonomy group of Kähler manifolds" zh="Kähler 流形的和乐群">
        <Tx>{R`本节结束之前，简要看一看 Kähler 流形的和乐群（和乐群的定义见 \sref{D7.3}）。设 $(M,g)$ 是 Hermite 流形，$\dim_\C M=m$。取向量 $X\in T_pM^+$，沿 $p$ 处的回路 $c$ 平行移动，回到 $p$ 时得到向量 $X'\in T_pM^+$，$X'^\mu=X^\nu h_\nu{}^\mu$。注意 $\nabla$ 不混合全纯指标与反全纯指标，所以 $X'$ 在 $T_pM^-$ 中没有分量。此外 $\nabla$ 保持向量的长度（度规相容；$h_p(X,X)=g_{\mu\bar\nu}X^\mu\overline{X}^\nu$ 不变）。这些事实告诉我们 $(h_\mu{}^\nu(c))$ 属于 $\mathrm{U}(m)\subset\mathrm{O}(2m)$。（对 Kähler 流形，这里的 $\nabla$ 就是 Levi-Civita 联络，所以这是 Riemann 和乐群。）`}</Tx>
        <Stmt id="T8.7">
          <Figure n="8.5" caption={R`$X\in T_pM^+$ 沿 $pqrs$ 平行移动，回到 $p$ 时成为向量 $X'\in T_pM^+$。`} width="45%" />
          <Proof title="定理 8.7 的证明（原书标明为概要）" steps={[
            { claim: R`若 $X=X^\mu\partial/\partial z^\mu\in T_pM^+$ 沿 \figref{8.5} 中的小平行四边形平行移动回到 $p$，得到 $X'\in T_pM^+$，其分量为（参看 \eqref{7.44}）`, tex: R`X'^\mu=X^\mu+X^\nu R^\mu{}_{\nu\kappa\bar\lambda}\varepsilon^\kappa\bar\delta^\lambda`, uses: ["8.99", "D7.3"], why: R`四边形两边为 $\varepsilon^\kappa$（全纯方向）与 $\bar\delta^\lambda$（反全纯方向）；由 \eqref{8.74}，只有一个全纯一个反全纯的曲率分量非零。` },
            { claim: R`由此读出和乐矩阵`, tex: R`h_\mu{}^\nu=\delta_\mu{}^\nu+R^\nu{}_{\mu\kappa\bar\lambda}\varepsilon^\kappa\bar\delta^\lambda`, uses: ["8.100"] },
            { claim: R`在单位元附近 $\mathrm{U}(m)=\mathrm{SU}(m)\times\mathrm{U}(1)$（局部地）；李代数分解为 $\sym{um}{\mathfrak{u}}(m)=\sym{sum}{\mathfrak{su}}(m)\oplus\sym{um}{\mathfrak{u}}(1)$，$\sym{sum}{\mathfrak{su}}(m)$ 是无迹部分，$\sym{um}{\mathfrak{u}}(1)$ 含迹。`, uses: ["8.101"] },
            { claim: R`$h-1$ 的迹是 Ricci 形式：对 Ricci 平坦度规，$\sym{um}{\mathfrak{u}}(1)$ 部分为零，`, tex: R`R^\kappa{}_{\kappa\mu\bar\nu}\varepsilon^\mu\bar\delta^\nu=\sym{ricf}{\mathfrak{R}}_{\mu\bar\nu}\varepsilon^\mu\bar\delta^\nu=0`, uses: ["8.78"] },
            { claim: R`所以无穷小和乐属于 $\sym{sum}{\mathfrak{su}}(m)$，和乐群（单位分支）包含于 $\mathrm{SU}(m)$。［注：严格地说，这里只证明了**限制和乐群**（零伦回路生成的子群）包含于 $\mathrm{SU}(m)$。对多连通的 $M$，这个结论仍然成立——但完整的和乐群可能更大；例如 Enriques 面的万有覆叠是 K3，限制和乐 $\mathrm{SU}(2)$，完整和乐不在 $\mathrm{SU}(2)$ 中（它的 $c_1$ 是挠元，实系数下为零）。在要求 $M$ 单连通或采用"$c_1=0$ 且典范丛平凡"的定义时，结论对完整和乐群成立。］`, fill: true },
          ]} />
        </Stmt>
        <Eq n="8.99" say={R`全纯向量绕一个由全纯位移 $\varepsilon$ 与反全纯位移 $\bar\delta$ 张成的小回路一圈，改变量由曲率给出，并且仍是全纯向量。`}>{R`X'^\mu=X^\mu+X^\nu R^\mu{}_{\nu\kappa\bar\lambda}\varepsilon^\kappa\bar\delta^\lambda`}</Eq>
        <Eq n="8.100" say={R`无穷小和乐矩阵 = 单位阵 + 曲率与面积元的乘积。`}>{R`h_\mu{}^\nu=\delta_\mu{}^\nu+R^\nu{}_{\mu\kappa\bar\lambda}\varepsilon^\kappa\bar\delta^\lambda.`}</Eq>
        <Eq n="8.101" keyEq title={R`$\sym{um}{\mathfrak{u}}(m)$ 的分解`} say={R`酉李代数等于无迹部分（特殊酉）与迹部分（一个 $\mathrm{U}(1)$）；Ricci 形式正是和乐的 $\mathrm{U}(1)$ 部分。`}>{R`\sym{um}{\mathfrak{u}}(m)=\sym{sum}{\mathfrak{su}}(m)\oplus\sym{um}{\mathfrak{u}}(1).`}</Eq>
        <Tx>{R`**物理意义。**和乐群 $\subset\mathrm{SU}(m)$ 意味着存在平行的旋量场（$\mathrm{SU}(3)\subset\mathrm{SO}(6)$ 在旋量表示 $\nosym{\mathbf{4}}$ 中留下一个不变分量），因而在 Calabi–Yau 三维流形上紧化十维超弦，可以在四维中保留 $\mathcal{N}=1$ 超对称（Candelas–Horowitz–Strominger–Witten 1985）。这就是本节为什么在物理文献中如此重要。`}</Tx>
      </Sub>
    </Sec>);
}
