import {TextureRedraw} from "./_redraw_textures.jsx";
// §4.9 向列相液晶中的缺陷、§4.10 超流 3He-A 中的织构 —— 式 (4.68)–(4.75)，习题 4.9–4.11，图 4.23–4.32，交互图 2（DefectLab）
import { Sec, Sub, Tx, Eq, Box, Figure, Erratum, Exercise, Derivation, C } from "@kit";
import { DefectLab } from "./_ch04_demos.jsx";

const R = String.raw;

export function Sec49() {
  return (
    <Sec n="4.9" title="Defects in nematic liquid crystals" zh="向列相液晶中的缺陷"
      gist={R`指向矢 $\boldsymbol{n}$ 没有头尾，$\boldsymbol{n}\sim-\boldsymbol{n}$，序参量空间是 $\sym{RP}{\RP^2}$。于是线缺陷由 $\pi_1(\sym{RP}{\RP^2})\cong\mathbb{Z}_2$ 分类——"半整数"向错稳定、整数向错可以消除；点缺陷由 $\pi_2(\sym{RP}{\RP^2})\cong\mathbb{Z}$ 分类；$\pi_3(\sym{RP}{\RP^2})\cong\mathbb{Z}$ 给出没有奇点、却解不开的三维织构。`}
      why={R`这是同伦分类最干净的实验例子：在偏光显微镜下就能看到"两条刷子"（$\pm\frac12$）与"四条刷子"（$\pm1$）的向错，而且确实只有前者是稳定的。`}
      gives={["4.68"]}>
      <Sub n="4.9.1" title="Order parameter of nematic liquid crystals" zh="向列相液晶的序参量">
        <p className="muted">本小节概念：<C id="order_parameter" /> · <C id="defect_class" /></p>
        <Tx>{R`某些有机晶体在流体相中表现出很有趣的光学性质，称为**液晶**（liquid crystals），其特征是光学各向异性。这里我们关心所谓**向列相**（nematic）液晶，例如**辛氧基氰基联苯**（octyloxy-cyanobiphenyl，8OCB），其分子结构为

$$\mathrm{N{\equiv}C{-}C_6H_4{-}C_6H_4{-}O{-}C_8H_{17}}$$

（两个苯环相连，一端是氰基，另一端是辛氧基链）。向列相液晶的分子很像一根棒，序参量称为**指向矢**（director），由棒的平均方向给出。虽然分子本身有头有尾，指向矢却有反演对称性：区分 $\boldsymbol{n}=\rightarrow$ 与 $-\boldsymbol{n}=\leftarrow$ 没有意义。我们想用 $S^2$ 上的一点来指定指向矢，这几乎可以——只差一点：两个对径点 $\boldsymbol{n}=(\theta,\phi)$ 与 $-\boldsymbol{n}=(\pi-\theta,\pi+\phi)$ 代表同一个状态（\figref{4.23}）。因此向列相液晶的序参量空间是**射影平面** $\sym{RP}{\RP^2}$。

指向矢场一般依赖于位置 $\boldsymbol{r}$。于是可以定义映射 $f:\mathbb{R}^3\to\sym{RP}{\RP^2}$，这个映射称为**织构**（texture）；$\mathbb{R}^3$ 中实际的序参量位形也称为织构。`}</Tx>
        <Figure n="4.23" illustration={<TextureRedraw n="4.23"/>} caption={R`指向矢 $\boldsymbol{n}$ 没有头尾，无法区分 $\boldsymbol{n}$ 与 $-\boldsymbol{n}$。因此这两幅图对应同一个序参量位形。`} width="72%" />
      </Sub>
      <Sub n="4.9.2" title="Line defects in nematic liquid crystals" zh="向列相液晶中的线缺陷">
        <Tx>{R`由例 4.10，$\pi_1(\sym{RP}{\RP^2})\cong\mathbb{Z}_2=\{0,1\}$。向列相液晶中有两种线缺陷：一种能连续地变形为均匀位形，另一种不能。后者代表稳定的涡旋（**向错**，disclination），织构示于 \figref{4.24}。读者应当观察这个织构怎样把圈 $\alpha$ 映到 $\sym{RP}{\RP^2}$：沿 $\alpha$ 走一圈，指向矢只转了**半圈**（$\pi$），在 $S^2$ 上是从 $\boldsymbol{n}$ 到 $-\boldsymbol{n}$ 的一条道路——在 $\sym{RP}{\RP^2}$ 中闭合，正是 \figref{4.16} 中那条不可收缩的 $\beta$。`}</Tx>
        <Figure n="4.24" caption={R`向列相液晶中的涡旋，对应 $\pi_1(\sym{RP}{\RP^2})=\mathbb{Z}_2$ 的非平凡元。交互版：亲手放置 $\pm1$、$\pm\frac12$ 缺陷并测量卷绕数。`} width="50%" illustration={<DefectLab />} />
        <Exercise n="4.9" title={R`"$1+1=0$"：整数向错是假的`} level="★★"
          hint={R`把平面内的径向指向矢 $\boldsymbol{n}=(\cos\phi,\sin\phi,0)$ 在芯附近逐渐"立起来"：$\boldsymbol{n}=(\sin\chi\cos\phi,\sin\chi\sin\phi,\cos\chi)$，$\chi$ 只依赖于离中心的距离 $\rho$。`}
          solution={R`设 \figref{4.25} 的织构在柱坐标 $(\rho,\phi,z)$ 下为径向：$\boldsymbol{n}_0=(\cos\phi,\sin\phi,0)$，在 $\rho=0$ 处奇异。沿包围芯的圆周，指向矢转了一整圈，$k=1$；作为 $\sym{RP}{\RP^1}\subset\sym{RP}{\RP^2}$ 中的圈，它绕"半圈单位"两次，对应 $1+1\in\mathbb{Z}_2$。

**构造形变。**取半径 $\rho_0$，对 $t\in(0,1]$ 令
$$\boldsymbol{n}_t(\rho,\phi)=\big(\sin\chi_t(\rho)\cos\phi,\ \sin\chi_t(\rho)\sin\phi,\ \cos\chi_t(\rho)\big),\qquad \chi_t(\rho)=\frac\pi2\min\!\Big(\frac{\rho}{t\rho_0},\,1\Big).$$
(i) 对每个 $t>0$，$\boldsymbol{n}_t$ **处处连续**：在 $\rho=0$ 处 $\chi_t=0$，$\boldsymbol{n}_t=(0,0,1)$ 与 $\phi$ 无关——芯处的指向矢"立"了起来。(ii) 在 $\rho\ge t\rho_0$（特别是 $\rho\ge\rho_0$ 的边界区域）$\chi_t=\frac\pi2$，$\boldsymbol{n}_t$ 与原来的径向织构 $\boldsymbol{n}_0$ 完全相同——**边界上的指向矢始终不动**。(iii) $t\to0$ 时 $\boldsymbol{n}_t$ 在 $\rho>0$ 处逐点收敛到原织构，奇点被压缩回芯上。所以 $t$ 从 0 增到 1 的过程就是"把奇点熨平"的连续形变；$t=1$ 时得到处处光滑的织构，它又可以进一步连续地变成均匀位形（让 $\boldsymbol{n}$ 在整个区域内统一转向）。这就是所谓**逃逸到第三维**（escape into the third dimension）。对三维矢量（$M=S^2$）同样可以这样做；对限制在平面内的矢量或复相位（$M=S^1$）则做不到——没有第三个方向可以逃逸，$\pi_1(S^1)=\mathbb{Z}$ 中的 1 不是 0。

**同伦的语言。**包围芯的圆周上的指向矢给出 $\sym{RP}{\RP^2}$ 中的圈 $\beta*\beta$（$\beta$ 是 \figref{4.16} 中从 $\boldsymbol{n}$ 到 $-\boldsymbol{n}$ 的半圈）。$\pi_1(\sym{RP}{\RP^2})=\mathbb{Z}_2$ 中 $[\beta]^2=1$，所以这个圈可缩，相应的线缺陷可以消除：$1+1=0$。上面的显式形变正是把 $\beta*\beta$ 在 $S^2$ 上沿经线收缩到北极的过程（\figref{4.16}(b) 的三维版本）。在交互图 2 中选"图 4.25：$+1$ 径向"可以看到 $\pi_1(\sym{RP}{\RP^2})$ 中的类为 0。`}>
          {R`证明 \figref{4.25} 中的线"缺陷"是虚假的：在保持边界上指向矢不动的前提下，通过指向矢的连续形变可以消除中心的奇点。这对应运算 $1+1=0$。`}
        </Exercise>
        <Figure n="4.25" illustration={<TextureRedraw n="4.25"/>} caption={R`一个可以连续地变形为均匀位形的线缺陷。`} width="45%" />
      </Sub>
      <Sub n="4.9.3" title="Point defects in nematic liquid crystals" zh="向列相液晶中的点缺陷">
        <Tx>{R`由例 4.14，$\pi_2(\sym{RP}{\RP^2})=\mathbb{Z}$。因此向列相液晶中存在稳定的点缺陷。\figref{4.26} 是属于类 $1\in\mathbb{Z}$ 的点缺陷（"刺猬"，hedgehog）的织构：指向矢沿径向，$\boldsymbol{n}(\boldsymbol{r})=\hat{\boldsymbol{r}}$，包围它的球面恰好一次覆盖 $S^2$（再投影到 $\sym{RP}{\RP^2}$）。`}</Tx>
        <Figure n="4.26" illustration={<TextureRedraw n="4.26"/>} caption={R`向列相液晶中点缺陷的织构。`} width="48%" />
        <Tx>{R`有趣的是，线缺陷与点缺陷可以结合成一个**环缺陷**（ring defect），它同时由 $\pi_1(\sym{RP}{\RP^2})$ 与 $\pi_2(\sym{RP}{\RP^2})$ 刻画，见 Mineev (1980)。从远处看，环缺陷像一个点缺陷；而沿环的局部结构由 $\pi_1(\sym{RP}{\RP^2})$ 刻画。\figref{4.27} 是这种环缺陷的一个例子：圈 $\alpha$ 分类 $\pi_1(\sym{RP}{\RP^2})\cong\mathbb{Z}_2$，球面（2 维圈）$\beta$ 分类 $\pi_2(\sym{RP}{\RP^2})=\mathbb{Z}$。`}</Tx>
        <Figure n="4.27" illustration={<TextureRedraw n="4.27"/>} caption={R`向列相液晶中环缺陷的织构。圈 $\alpha$ 分类 $\pi_1(\sym{RP}{\RP^2})$，而球面（2 维圈）$\beta$ 分类 $\pi_2(\sym{RP}{\RP^2})$。`} width="48%" />
        <Box kind="warning" title={R`$\pi_1$ 非平凡时，$\pi_2$ 的“荷”只定义到正负号`}>{R`在 $\sym{RP}{\RP^2}$ 中，沿一条不可收缩的圈（$+\frac12$ 向错）把一个刺猬"带着绕一圈"回来，它的荷会变号：$+1\to-1$。这是 $\pi_1$ 对 $\pi_2$ 的作用（$\mathbb{Z}_2$ 作用在 $\mathbb{Z}$ 上取负号）。因此在有向错的向列相中，点缺陷的荷只有绝对值有确定意义——这是 Mermin (1979) 强调的一点，原书未提，作为补充。`}</Box>
      </Sub>
      <Sub n="4.9.4" title="Higher dimensional texture" zh="更高维的织构">
        <Tx>{R`第三同伦群 $\pi_3(\sym{RP}{\RP^2})\cong\mathbb{Z}$ 导致向列相液晶三维介质中一种有趣的**无奇点**织构。（原书此处漏了下标 3。）设指向矢场在 $|\boldsymbol{r}|\to\infty$ 时趋于一个渐近位形，例如 $\boldsymbol{n}=(1,0,0)^{\mathrm t}$。那么介质实际上被紧化为三维球面 $S^3$，织构的拓扑结构由 $\pi_3(\sym{RP}{\RP^2})\cong\mathbb{Z}$ 分类。（由 \sref{T4.10}，$\pi_3(\sym{RP}{\RP^2})\cong\pi_3(S^2)\cong\mathbb{Z}$，见表 4.1。）对应同伦群非平凡元的织构是什么样的？

$\mathbb{R}^3$ 中的任意转动由转轴单位矢量 $\boldsymbol{e}$ 与转角 $\sym{alrot}{\alpha}$ 指定。可以给这个转动指定一个"矢量" $\boldsymbol{\Omega}=\sym{alrot}{\alpha}\boldsymbol{e}$。它并不完全是矢量，因为 $\boldsymbol{\Omega}=\pi\boldsymbol{e}$ 与 $-\boldsymbol{\Omega}=-\pi\boldsymbol{e}$ 是同一个转动，应当等同。因此 $\boldsymbol{\Omega}$ 属于实射影空间 $\sym{RP}{\RP^3}$（例 4.12）。取 $\boldsymbol{n}_0=(1,0,0)^{\mathrm t}$ 为标准指向矢。任意指向矢位形都可以由 $\boldsymbol{n}_0$ 绕某轴 $\boldsymbol{e}$ 转角 $\sym{alrot}{\alpha}$ 得到：$\boldsymbol{n}=\sym{Rrot}{R}(\boldsymbol{e},\sym{alrot}{\alpha})\boldsymbol{n}_0$，其中 $\sym{Rrot}{R}(\boldsymbol{e},\sym{alrot}{\alpha})$ 是 $\mathrm{SO}(3)$ 中相应的转动矩阵。设织构场由对 $\boldsymbol{n}_0$ 施加转动`}</Tx>
        <Eq n="4.68" keyEq title={R`$\pi_3(\sym{RP}{\RP^2})$ 的无奇点织构`} say={R`每一点的转动轴沿径向、转角只随半径变化：从中心的 0 增大到无穷远处的 $2\pi$（恒等转动），整个空间被包成一个 $S^3$，映到转动群上恰好“包一次”。`}>{R`\sym{alrot}{\alpha}\boldsymbol{e}(\boldsymbol{r})=\sym{fprof}{f}(r)\hat{\boldsymbol{r}}`}</Eq>
        <Tx>{R`得到，其中 $\hat{\boldsymbol{r}}$ 是沿位置矢量 $\boldsymbol{r}$ 方向的单位矢量，而

$$\sym{fprof}{f}(r)=\begin{cases}0 & r=0\\ 2\pi & r\to\infty.\end{cases}$$

\figref{4.28} 示出这个织构的指向矢场。注意，虽然织构中没有奇点，却不可能把它"解开"成均匀位形。`}</Tx>
        <Erratum kind="erratum" loc="p.183，(4.68) 之后 $f(r)$ 的边界值与图 4.28 图注" title={R`勘误：$f(\infty)$ 应为 $2\pi$，不是 $\pi$`}>{R`原书取 $\sym{fprof}{f}(0)=0$、$\sym{fprof}{f}(r\to\infty)=\pi$，图注也说"$\sym{alrot}{\alpha}$ 在 $|\boldsymbol{r}|\to\infty$ 时趋于 $\pi$"。这样的织构在无穷远处**不均匀**：绕轴 $\hat{\boldsymbol{r}}$ 转 $\pi$ 的矩阵是 $2\hat{\boldsymbol{r}}\hat{\boldsymbol{r}}^{\mathrm t}-\sym{Id}{I}$，作用于 $\boldsymbol{n}_0$ 得 $2(\hat{\boldsymbol{r}}\cdot\boldsymbol{n}_0)\hat{\boldsymbol{r}}-\boldsymbol{n}_0$，随方向变化——例如沿 $\hat{\boldsymbol{r}}=(1,1,0)/\sqrt2$ 方向得 $\boldsymbol{n}=(0,1,0)$，与 $\pm\boldsymbol{n}_0$ 都不同（沿三个坐标轴恰好得 $\pm\boldsymbol{n}_0$，所以只沿坐标轴画的 \figref{4.28} 看不出问题）。拓扑上，$r\to\infty$ 的球面被映到 $\sym{RP}{\RP^3}$ 中半径 $\pi$ 的边界球面（即 $\sym{RP}{\RP^2}$），而不是一点，$\mathbb{R}^3$ 并没有被紧化成 $S^3$。

取 $\sym{fprof}{f}(\infty)=2\pi$（与 §4.10.3 Shankar 单极子的 \eqref{4.74} 同样的约定："转角模 $2\pi$"）则无穷远处的转动是恒等元，$\boldsymbol{n}\to\boldsymbol{n}_0$。把它提升到 $\mathrm{SU}(2)$：$U(\boldsymbol{r})=\exp[-\frac i2\sym{fprof}{f}(r)\hat{\boldsymbol{r}}\cdot\boldsymbol{\sigma}]$ 在原点为 $\sym{Id}{I}$、在无穷远为 $-\sym{Id}{I}$，恰好一次覆盖 $\mathrm{SU}(2)=S^3$，是 $\pi_3(\mathrm{SU}(2))\cong\pi_3(\mathrm{SO}(3))$ 的生成元；再经 $\sym{Rrot}{R}\mapsto \sym{Rrot}{R}\boldsymbol{n}_0$（即 Hopf 映射 $S^3\to S^2$）与 $S^2\to\sym{RP}{\RP^2}$，得到 $\pi_3(\sym{RP}{\RP^2})\cong\mathbb{Z}$ 的生成元。`}</Erratum>
        <Figure n="4.28" illustration={<TextureRedraw n="4.28"/>} caption={R`取旋转角 $f(r)=2\pi r/(1+r)$，将固定向量 $\hat x$ 绕 $\hat r$ 旋转所得指向矢场的切片。中心和无穷远均趋向同一序参量，采用本站勘误的 $2\pi$ 边界。`} width="85%" />
      </Sub>
    </Sec>);
}

export function Sec410() {
  return (
    <Sec n="4.10" title={R`Textures in superfluid $^3$He-A`} zh={R`超流 $^3$He-A 中的织构`}
      gist={R`$^3$He-A 是自旋三重态 $p$ 波超流，序参量 $A_{\mu i}=d_\mu(\boldsymbol{\Delta}_1+i\boldsymbol{\Delta}_2)_i$；忽略 $\boldsymbol{d}$ 后，正交标架 $(\hat{\boldsymbol{\Delta}}_1,\hat{\boldsymbol{\Delta}}_2,\hat{\boldsymbol{l}})$ 取值于 $\mathrm{SO}(3)\cong\sym{RP}{\RP^3}$。$\pi_1=\mathbb{Z}_2$：disgyration 与 $1+1=0$ 的无芯 Anderson–Toulouse/Mermin–Ho 涡旋；$\pi_2=0$：没有点缺陷；$\pi_3=\mathbb{Z}$：无奇点的 Shankar 单极子。`}
      why={R`同一个序参量空间 $\mathrm{SO}(3)$ 把本章的三个结果——$\pi_1(\sym{RP}{\RP^3})=\mathbb{Z}_2$（\eqref{4.33}）、$\pi_2=0$、$\pi_3=\mathbb{Z}$（\eqref{4.55}）——同时搬上了舞台。`}
      gives={["4.69a", "4.70", "4.71", "4.73", "4.74", "4.75"]}>
      <Sub n="4.10.1" title={R`Superfluid $^3$He-A`} zh={R`超流 $^3$He-A`}>
        <Tx>{R`最后一个、也是最有趣的例子。1972 年以前，BCS 超流的唯一例子是常规超导体（中子星中超流中子的间接观测除外）。\figref{4.29} 是无外磁场时超流 $^3$He 的相图。NMR 及其他观测表明，超流体处于**自旋三重态 $p$ 波**态。这里不用场算符（参见 \eqref{4.65b}），而用产生、湮灭算符定义序参量。三重态超流序参量的最一般形式是`}</Tx>
        <Eq n="4.69a" say={R`Cooper 对的自旋结构由三个分量 $d_\mu(\boldsymbol{k})$ 描述（三重态），它们一般依赖于对的相对动量。`}>{R`\langle \sym{cop}{c}_{\alpha,\boldsymbol{k}}\sym{cop}{c}_{\beta,-\boldsymbol{k}}\rangle\propto\sum_{\mu=1}^{3}(i\sigma_2\sigma_\mu)_{\alpha\beta}\,d_\mu(\boldsymbol{k})`}</Eq>
        <Figure n="4.29" illustration={<TextureRedraw n="4.29"/>} caption={R`超流 $^3$He 的定性相区示意；轴与相界不代表测量值。`} width="62%" />
        <Tx>{R`其中 $\alpha,\beta$ 是自旋指标。Cooper 对处于 $p$ 波态，因此 $d_\mu(\boldsymbol{k})$ 正比于 $Y_{1m}\sim k_i$：`}</Tx>
        <Eq n="4.69b" say={R`$p$ 波：$d_\mu$ 对动量方向是线性的；$3\times3$ 复矩阵 $A_{\mu i}$ 一边连着自旋（$\mu$），一边连着轨道（$i$）。`}>{R`d_\mu(\boldsymbol{k})=\sum_{i=1}^{3}\Delta_0A_{\mu i}k_i.`}</Eq>
        <Tx>{R`体能量有若干个极小，绝对极小依赖于压强与温度。我们特别关心 \figref{4.29} 中的 A 相。A 相的序参量形如`}</Tx>
        <Eq n="4.70" keyEq title={R`$^3$He-A 的序参量`} say={R`A 相的序参量是自旋方向 $\boldsymbol{d}$ 与轨道复矢量 $\boldsymbol{\Delta}_1+i\boldsymbol{\Delta}_2$ 的乘积：$\boldsymbol{d}\in S^2$，而轨道部分等价于一个正交标架，即一个转动。`}>{R`A_{\mu i}=d_\mu(\boldsymbol{\Delta}_1+i\boldsymbol{\Delta}_2)_i`}</Eq>
        <Tx>{R`其中 $\boldsymbol{d}$ 是 Cooper 对自旋投影为零的方向上的单位矢量，$(\boldsymbol{\Delta}_1,\boldsymbol{\Delta}_2)$ 是一对正交的单位矢量。矢量 $\boldsymbol{d}$ 取值于 $S^2$。定义 $\boldsymbol{l}\equiv\boldsymbol{\Delta}_1\times\boldsymbol{\Delta}_2$，则三元组 $(\boldsymbol{\Delta}_1,\boldsymbol{\Delta}_2,\boldsymbol{l})$ 在介质的每一点构成正交标架。任何正交标架都能由标准正交标架 $(\boldsymbol{e}_1,\boldsymbol{e}_2,\boldsymbol{e}_3)$ 经三维转动矩阵得到，所以 $^3$He-A 的序参量空间是 $S^2\times\mathrm{SO}(3)$。这里引入的矢量 $\boldsymbol{l}$ 是 Cooper 对角动量的方向。`}</Tx>
        <Box kind="note" title={R`更精确的序参量空间：$(S^2\times\mathrm{SO}(3))/\mathbb{Z}_2$`}>{R`$(\boldsymbol{d},\boldsymbol{\Delta}_1,\boldsymbol{\Delta}_2)$ 与 $(-\boldsymbol{d},-\boldsymbol{\Delta}_1,-\boldsymbol{\Delta}_2)$ 给出同一个 $A_{\mu i}$（\eqref{4.70}），所以严格说序参量空间是 $(S^2\times\mathrm{SO}(3))/\mathbb{Z}_2$，其基本群是 $\mathbb{Z}_4$（Mermin 1979 的综述中有详细讨论）。原书以下忽略 $\boldsymbol{d}$ 的变化（偶极锁定），只用 $\mathrm{SO}(3)$ 部分，这一细节不影响 §4.10.2–4.10.3 的结论。`}</Box>
        <Tx>{R`为简单起见，忽略 $\hat{\boldsymbol{d}}$ 矢量的变化。［事实上，由于偶极力，$\hat{\boldsymbol{d}}$ 锁定在 $\hat{\boldsymbol{l}}$ 方向。］序参量取形式`}</Tx>
        <Eq n="4.71" say={R`忽略自旋方向后，序参量就是轨道复矢量 $\hat{\boldsymbol{\Delta}}_1+i\hat{\boldsymbol{\Delta}}_2$——等价于一个正交标架。`}>{R`A_i=\Delta_0(\hat{\boldsymbol{\Delta}}_1+i\hat{\boldsymbol{\Delta}}_2)_i`}</Eq>
        <Tx>{R`（原书漏了虚数单位 $i$，印作 $\Delta_0(\hat{\boldsymbol{\Delta}}_1+\hat{\boldsymbol{\Delta}}_2)_i$；按 \eqref{4.70} 应为 $\hat{\boldsymbol{\Delta}}_1+i\hat{\boldsymbol{\Delta}}_2$——没有 $i$ 就只剩一个实矢量，标架信息丢失。）其中 $\hat{\boldsymbol{\Delta}}_1$、$\hat{\boldsymbol{\Delta}}_2$ 与 $\hat{\boldsymbol{l}}\equiv\hat{\boldsymbol{\Delta}}_1\times\hat{\boldsymbol{\Delta}}_2$ 在介质每一点构成正交标架。取标准正交标架 $(\boldsymbol{e}_1,\boldsymbol{e}_2,\boldsymbol{e}_3)$，标架 $(\hat{\boldsymbol{\Delta}}_1,\hat{\boldsymbol{\Delta}}_2,\hat{\boldsymbol{l}})$ 由一个元素 $g\in\mathrm{SO}(3)$ 作用于标准标架得到：`}</Tx>
        <Eq n="4.72" say={R`每一点的标架就是对标准标架施加一个转动 $g$：织构就是从空间到 $\mathrm{SO}(3)$ 的映射。`}>{R`g:(\boldsymbol{e}_1,\boldsymbol{e}_2,\boldsymbol{e}_3)\to(\hat{\boldsymbol{\Delta}}_1,\hat{\boldsymbol{\Delta}}_2,\hat{\boldsymbol{l}}).`}</Eq>
        <Tx>{R`（原书两处把标准标架误印为 $(\boldsymbol{e}_1,\boldsymbol{e}_2,\boldsymbol{e}_2)$。）由于 $g$ 依赖于坐标 $x$，位形 $(\hat{\boldsymbol{\Delta}}_1(x),\hat{\boldsymbol{\Delta}}_2(x),\hat{\boldsymbol{l}}(x))$ 定义了映射 $\psi:X\to\mathrm{SO}(3)$，$x\mapsto g(x)$。映射 $\psi$ 称为超流 $^3$He 的**织构**（"织构"一词实际上借自液晶中的序参量位形，见 §4.9）。给超流 $^3$He-A 中的缺陷分类的同伦群是 $\pi_n(\mathrm{SO}(3))$。

若容器中充满 $^3$He-A，边界对织构施加一定的条件。矢量 $\hat{\boldsymbol{l}}$ 理解为 Cooper 对角动量的方向。对应在平行于器壁的平面内转动，因此 $\hat{\boldsymbol{l}}$ 应垂直于器壁。［**注**：若器壁是**漫反射**的，Cooper 对的轨道运动受到扰动，器壁附近序参量的振幅降低。为简单起见，我们假定器壁是**镜面光滑**的，Cooper 对可以不受干扰地作轨道运动。］自由能有好几种，织构由在给定边界条件下从总自由能导出的 Euler–Lagrange 方程决定。

超流 $^3$He 的综述见 Anderson and Brinkman (1975)、Leggett (1975) 与 Mermin (1978)。`}</Tx>
      </Sub>
      <Sub n="4.10.2" title={R`Line defects and non-singular vortices in $^3$He-A`} zh={R`$^3$He-A 中的线缺陷与无奇点涡旋`}>
        <Tx>{R`$\mathrm{SO}(3)\cong\sym{RP}{\RP^3}$ 的基本群是 $\pi_1(\sym{RP}{\RP^3})\cong\mathbb{Z}_2\cong\{0,1\}$（\eqref{4.33}）。属于类 0 的织构能连续地变形为均匀位形。类 1 的位形称为 **disgyration**，Maki and Tsuneto (1977) 与 Buchholtz and Fetter (1977) 分析过它们。\figref{4.30} 画出了处于最低自由能位形的 disgyration。`}</Tx>
        <Figure n="4.30" illustration={<TextureRedraw n="4.30"/>} caption={R`围绕线核心旋转的三标架：分别选 $x,y,z$ 为固定旋转轴，展示 $SO(3)$ 中同一非平凡同伦类的代表。`} width="90%" />
        <Tx>{R`$\mathbb{Z}_2$ 的一个显著性质是加法 $1+1=0$：两个 disgyration 合并产生平凡织构。把两个 disgyration 合并，可以构造一个看起来像双倍涡度（同伦类"2"）的涡旋、却**没有奇异芯**的织构（\figref{4.31}(a)）。容易验证，圈 $\alpha$ 的像在 $\sym{RP}{\RP^3}$ 中走了两遍，而较小的圈 $\beta$ 的像可以缩成一点。这个织构称为 **Anderson–Toulouse 涡旋**（Anderson and Toulouse 1977）。Mermin and Ho (1976) 指出，若介质在圆柱中，边界施加条件 $\hat{\boldsymbol{l}}\perp$（边界），涡旋在表面处被截断（\figref{4.31}(b)，**Mermin–Ho 涡旋**）。`}</Tx>
        <Figure n="4.31" illustration={<TextureRedraw n="4.31"/>} caption={R`Anderson–Toulouse（左）与 Mermin–Ho（右）无奇点涡旋的 $\hat l$ 截面模型。MH边界的 $\hat l$ 径向、垂直圆柱壁；图未显示完整三标架。`} width="90%" />
        <Box kind="physics" title="为什么“双倍涡旋”可以没有芯">{R`在超导体里，$\pi_1(\mathrm{U}(1))=\mathbb{Z}$，涡度为 2 的涡旋永远有奇异芯。$^3$He-A 的序参量空间更大：相位转动只是 $\mathrm{SO}(3)$ 中的一个 $\mathrm{U}(1)$ 子群（绕 $\hat{\boldsymbol{l}}$ 转）。在 $\mathrm{SO}(3)$ 里，绕一根轴转 $4\pi$ 的圈可以收缩（Dirac 皮带，\eqref{4.33}）——收缩的办法正是让转轴 $\hat{\boldsymbol{l}}$ 在芯附近翻转过来（\figref{4.31}(a) 中心处 $\hat{\boldsymbol{l}}$ 从向上逐渐转为水平再到向下）。于是"两个量子的环流"可以由一个处处光滑的织构承载。`}</Box>
        <Tx>{R`由于 $\pi_2(\sym{RP}{\RP^3})\cong\{e\}$，$^3$He-A 中没有点缺陷。但 $\pi_3(\sym{RP}{\RP^3})\cong\mathbb{Z}$ 引出一种新的点状结构，称为 Shankar 单极子，下面就来研究它。`}</Tx>
      </Sub>
      <Sub n="4.10.3" title={R`Shankar monopole in $^3$He-A`} zh={R`$^3$He-A 中的 Shankar 单极子`}>
        <p className="muted">本小节概念：<C id="texture" /></p>
        <Tx>{R`Shankar (1977) 指出 $^3$He-A 中存在一种点状的无奇点客体。考虑 $^3$He-A 的无限介质，假定介质渐近均匀，即 $|x|\to\infty$ 时 $(\hat{\boldsymbol{\Delta}}_1,\hat{\boldsymbol{\Delta}}_2,\hat{\boldsymbol{l}})$ 趋于标准正交标架 $(\boldsymbol{e}_1,\boldsymbol{e}_2,\boldsymbol{e}_3)$。由于远离原点的所有点都映到同一点，我们把 $\mathbb{R}^3$ 紧化成了 $S^3$。于是织构按 $\pi_3(\sym{RP}{\RP^3})=\mathbb{Z}$ 分类。像前面那样（例 4.12），用 $\sym{RP}{\RP^3}$ 中的"矢量" $\boldsymbol{\Omega}=\theta\boldsymbol{n}$ 指定 $\mathrm{SO}(3)$ 的元素。Shankar (1977) 提出的织构是`}</Tx>
        <Eq n="4.73" keyEq title="Shankar 单极子" say={R`转动轴处处沿径向，转角只随半径变化——与 \eqref{4.68} 同一个构造。`}>{R`\boldsymbol{\Omega}(\boldsymbol{r})=\frac{\boldsymbol{r}}{r}\cdot \sym{fprof}{f}(r)`}</Eq>
        <Figure n="4.32" illustration={<TextureRedraw n="4.32"/>} caption={R`Shankar纹理中整个正交三标架的空间切片。三根轴同时按 $R(\hat r,2\pi/(1+r))$ 旋转，中心和无穷远的标架均趋于标准标架。`} width="90%" />
        <Tx>{R`其中 $\sym{fprof}{f}(r)$ 是单调递减函数，满足`}</Tx>
        <Eq n="4.74" say={R`中心处转 $2\pi$（等于不转），无穷远处转 0（也是不转）：两端都是恒等元，中间转角扫过 $2\pi$。`}>{R`\sym{fprof}{f}(r)=\begin{cases}2\pi & r=0\\ 0 & r=\infty.\end{cases}`}</Eq>
        <Tx>{R`我们形式上把 $\sym{RP}{\RP^3}$ 的半径扩展到 $2\pi$，转角模 $2\pi$ 定义。这个织构称为 **Shankar 单极子**（\figref{4.32}(a)）。初看起来原点处似乎有奇点。但注意那里 $\boldsymbol{\Omega}$ 的长度是 $2\pi$，等价于 $\mathrm{SO}(3)$ 的单位元。\figref{4.32}(b) 描绘了三元组场。由于无论沿什么方向，$r\to\infty$ 时都有 $\boldsymbol{\Omega}(\boldsymbol{r})=0$，空间 $\mathbb{R}^3$ 被紧化成 $S^3$。扫过整个空间时，$\boldsymbol{\Omega}(\boldsymbol{r})$ 扫过 $\mathrm{SO}(3)$ 两遍，这个织构对应 $\pi_3(\mathrm{SO}(3))\cong\mathbb{Z}$ 的类 1。`}</Tx>
        <Derivation title={R`为什么"扫过 $\mathrm{SO}(3)$ 两遍"却是类 1`} steps={[
          { tex: R`U(\boldsymbol{r})=\exp\Big[-\frac{i}{2}\sym{fprof}{f}(r)\,\hat{\boldsymbol{r}}\cdot\boldsymbol{\sigma}\Big]=\cos\frac{\sym{fprof}{f}}{2}-i\sin\frac{\sym{fprof}{f}}{2}\,\hat{\boldsymbol{r}}\cdot\boldsymbol{\sigma}\in\mathrm{SU}(2)`, why: R`把织构提升到二重覆叠 $\mathrm{SU}(2)$（转角 $\theta$ 的转动对应 $\pm e^{-i\theta\boldsymbol{n}\cdot\boldsymbol{\sigma}/2}$）。` },
          { tex: R`r=0:\ U=\cos\pi=-\sym{Id}{I};\qquad r=\infty:\ U=\sym{Id}{I}`, why: R`两端都与方向 $\hat{\boldsymbol{r}}$ 无关，所以 $U$ 是 $S^3=\mathbb{R}^3\cup\{\infty\}$ 上的连续映射。` },
          { tex: R`(u,\boldsymbol{v})=\Big(\cos\frac{\sym{fprof}{f}}{2},\ -\sin\frac{\sym{fprof}{f}}{2}\,\hat{\boldsymbol{r}}\Big)\in S^3\subset\mathbb{R}^4`, why: R`\eqref{4.47} 的参数化。$\sym{fprof}{f}/2$ 从 $\pi$ 单调降到 0，$\hat{\boldsymbol{r}}$ 扫遍 $S^2$：这是 $S^3$ 的"极坐标"，恰好覆盖一次。` },
          { tex: R`\deg U=\pm1\ \Rightarrow\ [U]=\pm1\in\pi_3(\mathrm{SU}(2))\cong\pi_3(\mathrm{SO}(3))`, why: R`由 \sref{T4.10}，二重覆叠诱导 $\pi_3$ 的同构；在 $\mathrm{SU}(2)$ 中覆盖一次，投影到 $\mathrm{SO}(3)$ 就覆盖两次。符号取决于 $S^3$ 的定向约定。` },
        ]} />
        <Exercise n="4.10" title={R`类 $-1$ 的 Shankar 单极子`} level="★★"
          hint={R`把箭头反过来（$\boldsymbol{\Omega}\to-\boldsymbol{\Omega}$）等于对每点的转动取逆 $g\to g^{-1}$——这确实给出类 $-1$，但三元组场的**图**并不是把 \figref{4.32}(b) 中的箭头简单反向。也可以对空间做一次反射 $\boldsymbol{r}\to-\boldsymbol{r}$。`}
          solution={R`**构造。**在 $\pi_3$ 中，逆元由"沿一个坐标反向"给出（\eqref{4.39}）。对 $S^3$ 的映射来说，任何一个反转定向的变换都行。两种等价的写法：

(i) **空间反射**：$\boldsymbol{\Omega}_-(\boldsymbol{r})=\boldsymbol{\Omega}(-\boldsymbol{r})=-\frac{\boldsymbol{r}}{r}\sym{fprof}{f}(r)$，即转动轴沿**向内**的径向。反射 $\boldsymbol{r}\to-\boldsymbol{r}$ 反转 $\mathbb{R}^3$（从而 $S^3$）的定向，所以 $\deg$ 变号，类为 $-1$。

(ii) **逐点取逆**：$g_-(\boldsymbol{r})=g(\boldsymbol{r})^{-1}$，其转动矢量也是 $-\boldsymbol{\Omega}(\boldsymbol{r})$。在 $\mathrm{SU}(2)=S^3$ 上，$U\mapsto U^{-1}=U^\dagger$ 即 $(u,\boldsymbol{v})\mapsto(u,-\boldsymbol{v})$，是三个坐标的反射，反转定向。

两种写法给出同一个 $\boldsymbol{\Omega}_-$，所以 \figref{4.32}(a) 中的 $\boldsymbol{\Omega}$ "箭头"确实全部反向。

**为什么"不能简单地把图 4.32 的箭头反过来"。**题中所说的箭头指的是 \figref{4.32}(b) 中标架 $(\hat{\boldsymbol{\Delta}}_1,\hat{\boldsymbol{\Delta}}_2,\hat{\boldsymbol{l}})$ 的箭头。把每个标架的三个矢量都反向，$(-\hat{\boldsymbol{\Delta}}_1,-\hat{\boldsymbol{\Delta}}_2,-\hat{\boldsymbol{l}})$，得到的是**左手**标架（$(-\hat{\boldsymbol{\Delta}}_1)\times(-\hat{\boldsymbol{\Delta}}_2)=+\hat{\boldsymbol{l}}\neq-\hat{\boldsymbol{l}}$），不在 $\mathrm{SO}(3)$ 中，不是合法的 $^3$He-A 织构。正确的类 $-1$ 织构中，沿 $+\hat{\boldsymbol{x}}$ 轴的标架应等于原织构沿 $-\hat{\boldsymbol{x}}$ 轴的标架（做法 (i)）：例如在 $\boldsymbol{r}=r\hat{\boldsymbol{x}}$ 处，原织构绕 $+\hat{\boldsymbol{x}}$ 转 $\sym{fprof}{f}(r)$，新织构绕 $+\hat{\boldsymbol{x}}$ 转 $-\sym{fprof}{f}(r)$——$\hat{\boldsymbol{\Delta}}_2,\hat{\boldsymbol{l}}$ 在 $yz$ 平面内的转向相反，而 $\hat{\boldsymbol{\Delta}}_1=\hat{\boldsymbol{x}}$ 不变。

**检验**：把类 $+1$ 与类 $-1$ 的单极子按 \eqref{4.38} 拼接（在空间中并排放置、远处均匀），总织构属于类 0，可以连续地解开成均匀位形。`}>
          {R`画出属于 $\pi_3(\sym{RP}{\RP^3})$ 的类 $-1$ 的 Shankar 单极子。［不能简单地把 \figref{4.32} 中的箭头反过来。］`}
        </Exercise>
        <Exercise n="4.11" title={R`平面 Heisenberg 自旋的扩展客体`} level="★★"
          hint={R`有限能量要求 \eqref{4.75}：$|x|\ge L$ 处 $\boldsymbol{n}=\boldsymbol{e}_z$，于是圆盘 $|x|\le L$ 的整个边界映到一点，$D^2/\partial D^2\cong S^2$。例子可取 $\boldsymbol{n}=(\sin\Theta\cos m\phi,\ \sin\Theta\sin m\phi,\ \cos\Theta)$，$\Theta(\rho)$ 从 $\pi$ 降到 0；用拓扑荷积分确定 $m$ 与类的对应（注意符号）。`}
          solution={R`**分类。**Heisenberg 模型的连续极限能量 $E=\frac{J}{2}\int(\partial_i\boldsymbol{n})^2\dd^2x$（取晶格常数为 1）有限，要求 $\boldsymbol{n}$ 在无穷远处趋于常矢量；题设 \eqref{4.75} 把它取为 $\boldsymbol{e}_z$，且在 $|x|\ge L$ 处严格成立。于是位形完全由圆盘 $D_L=\{|x|\le L\}$ 上的映射 $\boldsymbol{n}:D_L\to S^2$ 决定，其边界 $\partial D_L$ 被映到一点 $\boldsymbol{e}_z$。$D_L/\partial D_L\cong S^2$（与 $I^2/\partial I^2\cong S^2$ 同理），所以每个位形就是一个以 $\boldsymbol{e}_z$ 为基点的映射 $S^2\to S^2$，即 2 维圈。两个位形能在保持 $|x|\ge L$ 处 $\boldsymbol{n}=\boldsymbol{e}_z$（有限能量）的前提下连续地变成彼此，当且仅当它们按 \eqref{4.37a}–\eqref{4.37c} 同伦。故扩展客体由 $\pi_2(S^2)\cong\mathbb{Z}$（\eqref{4.53}）分类。

**例子。**用平面极坐标 $(\rho,\phi)$，取单调函数 $\Theta(\rho)$，$\Theta(0)=\pi$，$\Theta(\rho)=0$（$\rho\ge L$），令
$$\boldsymbol{n}=(\sin\Theta\cos m\phi,\ \sin\Theta\sin m\phi,\ \cos\Theta),\qquad m\in\mathbb{Z}.$$
原点处 $\boldsymbol{n}=-\boldsymbol{e}_z$（与 $\phi$ 无关，连续），远处 $\boldsymbol{e}_z$，与 \figref{4.20} 一致。用拓扑荷（\eqref{4.53} 后的积分公式）确定它的类：
$$\partial_\rho\boldsymbol{n}=\Theta'(\cos\Theta\cos m\phi,\cos\Theta\sin m\phi,-\sin\Theta),\qquad\partial_\phi\boldsymbol{n}=m\sin\Theta(-\sin m\phi,\cos m\phi,0),$$
$$\partial_\rho\boldsymbol{n}\times\partial_\phi\boldsymbol{n}=m\,\Theta'\sin\Theta\ \boldsymbol{n}.$$
由于 $\dd x\,\dd y$ 与 $\dd\rho\,\dd\phi$ 定向相同，$(\partial_x\boldsymbol{n}\times\partial_y\boldsymbol{n})\,\dd x\,\dd y=(\partial_\rho\boldsymbol{n}\times\partial_\phi\boldsymbol{n})\,\dd\rho\,\dd\phi$，于是
$$Q=\frac{1}{4\pi}\int_0^{2\pi}\!\dd\phi\int_0^L\!\dd\rho\ m\,\Theta'\sin\Theta=\frac m2\int_{\pi}^{0}\sin\Theta\,\dd\Theta=\frac m2\,\big[-\cos\Theta\big]_\pi^0=-m.$$
所以面内分量转角为 $m\phi$ 的位形属于类 $Q=-m$。（符号依赖于约定：原书 \eqref{4.53} 后用的 $(\theta,\phi)\mapsto(\theta,k\phi)$ 让中心映到**北极**，而这里中心映到南极，相差一个反转定向的反射，故类差一个负号。）

- **类 $-1$**（$m=1$）：$\boldsymbol{n}=(\sin\Theta\cos\phi,\ \sin\Theta\sin\phi,\ \cos\Theta)$。面内分量沿径向向外，中心向下、远处向上，像覆盖 $S^2$ 一次。
- **类 $+2$**（$m=-2$）：$\boldsymbol{n}=(\sin\Theta\cos2\phi,\ -\sin\Theta\sin2\phi,\ \cos\Theta)$。绕原点一圈，面内分量反向转**两**圈（$x$ 轴上向外、$y$ 轴上向内的四瓣状），像覆盖 $S^2$ 两次。

交互图 4（\figref{4.20} 的交互版）用 Belavin–Polyakov 的能量极小解 $w=(\lambda/z)^k$——其面内转角为 $-k\phi$，正是上面 $m=-k$ 的情形——数值验证了 $Q=-1$ 与 $Q=+2$。`}>
          <Tx>{R`考虑定义在 $\mathbb{R}^2$ 上的经典 Heisenberg 自旋（§4.8）。设为使总能量有限，自旋取渐近值`}</Tx>
          <Eq n="4.75" say={R`有限能量要求自旋在远处都指向同一方向：平面加上无穷远点就成了球面 $S^2$。`}>{R`\boldsymbol{n}(x)\to\boldsymbol{e}_z\qquad|x|\ge L`}</Eq>
          <Tx>{R`（见 \figref{4.20}）。证明这个系统中的扩展客体由 $\pi_2(S^2)$ 分类。画出类 $-1$ 与 $+2$ 的自旋位形示例。`}</Tx>
        </Exercise>
      </Sub>
    </Sec>);
}
