import { ScalarPolarizationRedraw, ScatteringBasisRedraw } from "./_ch14_redraw.jsx";
// §10.2 Generating polarization from Compton scattering（图 10.5–10.6）
// §10.3 Polarization from a single plane wave —— 式 (10.13)–(10.29)，图 10.7–10.8
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { ScatterWidget } from "./_ch10_plots.jsx";

const R = String.raw;

export function Sec102() {
  return (
    <Sec n="10.2" title="Generating polarization from Compton scattering" zh="Compton 散射如何产生偏振"
      gist={R`散射光沿出射方向的电场分量传不出去：单向入射给出完全偏振；各向同性与偶极入射给出非偏振光；只有入射辐射的**四极**各向异性产生偏振。紧耦合压低四极，所以 CMB 偏振比温度各向异性小。`}
      why={R`在动手积分之前先用图像弄清"什么能产生偏振"，下一节的公式才有方向：它会精确地验证"只有 $l=2$ 起作用"。`}>
      <p className="muted">本节概念：<C id="thomson" /> · <C id="quad_source" /></p>
      <Tx>{R`**非偏振是默认情形。**沿 $z$ 方向传播的光，对应在 $x$–$y$ 平面内（即横向于传播方向）振荡的电场与磁场。若两个横向方向上的强度相等，光就是非偏振的。到目前为止讨论 CMB 时，我们一直隐含地研究这种情形。现在必须考虑两个横向方向强度不等的可能——即辐射是偏振的。

**单向入射：完全偏振。**Compton 散射能够产生偏振光（与第 5 章一样，这里只考虑光子在电子上的弹性散射，即 Compton 散射的特例——**Thomson 散射**）。看 \figref{10.5} 左图：一束从 $+x$ 方向入射的（非偏振）光，在 $y$ 与 $z$ 方向上强度相等。它在原点被电子散射，偏转到 $+z$ 方向（我们的视线）。由于出射方向沿 $z$ 轴，入射光沿 $z$ 轴的强度**完全传不出去**；而沿 $y$ 轴（同时垂直于入射与出射方向）的强度全部传出。净结果是偏振的出射光：两个垂直于 $\hat{\boldsymbol e}_z$ 的方向上的出射强度之差（$y$：全部传出；$x$：零）达到最大。`}</Tx>
      <Figure n="10.5" illustration={<ScatterWidget mode0="beam" />}
        caption={R`原创计算图。（同时对应 \figref{10.6} 与 \secref{10.3}、\secref{10.6} 的计算）：选择入射辐射场，浏览器按 \eqref{10.19}–\eqref{10.20} 对全部入射方向做立体角积分，给出出射（沿 $z$）的 $Q$、$U$、偏振度与偏振方向，并与解析式对照。核对：单向光束 $\beta=0$ 给 $Q=-1$、偏振度 100%、沿 $y$；各向同性与偶极给 $Q=U=0$。`} />
      <Tx>{R`**各向同性入射：不偏振。**当然不能只研究一条入射线，而要推广到从所有方向入射到电子上的辐射。这样做时，我们开始意识到产生偏振并不像 \figref{10.5} 左图那样容易。看右图，它是一个更相关情形的**漫画**：各向同性辐射从所有方向入射。说"漫画"，是因为图中只画了来自 $+x$ 与 $+y$ 两个方向的入射线——这对论证已经足够。出射光强度的 $I_{xx}$ 分量来自沿 $y$ 方向入射的辐射，而出射的 $I_{yy}$ 来自沿 $x$ 轴入射的辐射。由于两个方向的入射强度相等（各向同性），出射波沿两个轴的强度相等，$I_{xx}=I_{yy}$：**不偏振**。

**偶极入射：仍不偏振。**各向异性的辐射能否产生偏振？最简单的各向异性是偶极，其漫画见 \figref{10.6} 左图。此时出射光沿 $x$ 轴的强度来自 $\pm y$ 方向的入射，它具有平均温度（图中未画）。出射光沿 $y$ 轴的强度也是平均值，因为它是冷斑（$-x$ 方向）与热斑（$+x$ 方向）的叠加。所以偶极图样只产生非偏振的出射光。`}</Tx>
      <Figure n="10.6" illustration={<ScatterWidget mode0="dip" />} caption={R`Thomson 散射的原创角积分：偶极模式不产生净偏振；切换标量四极，观察非零偏振。`} />
      <Tx>{R`**四极入射：偏振！**要产生偏振光，入射辐射必须有**非零的四极矩**，如 \figref{10.6} 右图。从 $x$（$y$）方向入射的较热（较冷）辐射，使出射波沿 $y$（$x$）轴的强度较高（较低）。所以出射波沿 $y$ 轴的强度大于沿 $x$ 轴的：出射辐射是偏振的。\figref{10.6} 描绘的是 $x$–$y$ 平面内、偏好 $y$ 方向的偏振；对照 \figref{10.2}，这对应 $Q<0$、$U=0$。反之，若入射线在 $x$–$y$ 平面内转 $45^\circ$，出射偏振就沿与 $x$、$y$ 轴成 $45^\circ$ 的轴，相应地产生 $U$ 分量。

**宇宙学后果。**Compton 散射只在入射场有四极矩时才产生偏振，这对宇宙学有重要影响。复合之前电子与光子紧耦合，辐射场的四极很小（\eqref{9.36}：$\Theta_2\sim(k/\tau')\Theta_1$）。因此可以预期，CMB 偏振比温度各向异性**小**。`}</Tx>
      <Box kind="physics" title="一句话的物理：电子只沿它被驱动的方向辐射，却不朝那个方向辐射">{R`入射电场驱动电子沿 $\hat{\boldsymbol\epsilon}'$ 振荡，振荡偶极向外辐射，辐射场正比于 $\hat{\boldsymbol\epsilon}'$ 在出射方向的横向投影；沿振荡方向本身没有辐射。出射光在 $\hat{\boldsymbol\epsilon}_i$ 方向的强度因此 $\propto|\hat{\boldsymbol\epsilon}_i\cdot\hat{\boldsymbol\epsilon}'|^2$——这就是下一节 \eqref{10.13} 的来源。对出射方向 $z$：$x$ 向的出射电场只能来自电子沿 $x$ 的振荡，而后者只能由沿 $\pm y$、$\pm z$ 传来的光驱动……把所有入射方向加起来，留下的不对称性正是 $l=2$。`}</Box>
    </Sec>);
}

export function Sec103() {
  return (
    <Sec n="10.3" title="Polarization from a single plane wave" zh="单个平面波产生的偏振"
      gist={R`把偏振依赖的散射截面 \eqref{10.13} 对入射方向积分，得 $Q=-A\int d\Omega' f\sin^2\theta'\cos2\phi'$、$U=-A\int d\Omega' f\sin^2\theta'\sin2\phi'$（\eqref{10.19}–\eqref{10.20}）。代入标量平面波的四极：$\hat{\boldsymbol k}\parallel\hat{\boldsymbol e}_x$ 时 $Q=4\pi A\Theta_2$（\eqref{10.25}），一般方向 $Q+iU=4\pi A\sin^2\theta_k e^{2i\phi_k}\Theta_2$——纯 E 模（\eqref{10.28}–\eqref{10.29}）。`}
      why={R`定量研究需要 Boltzmann 方程，而碰撞项必须计入两个光子偏振态与散射的偏振依赖。本节把上一节的图像变成积分，得到偏振源与温度四极之间的精确关系，以及"标量只给 E"的证明。`}
      gives={["10.13", "10.14", "10.15", "10.16", "10.17", "10.18", "10.19", "10.20", "10.21", "10.22", "10.23", "10.24", "10.25", "10.26", "10.27", "10.28", "10.29"]}>
      <p className="muted">本节概念：<C id="thomson" /> · <C id="quad_source" /> · <C id="scalar_E" /></p>

      <Sub n="10.3.1" title="Scattering geometry" zh="散射几何与 Q、U 的积分式">
        <Tx>{R`**设定。**上一节的图像对定性理解 Compton 散射如何在 CMB 中产生偏振很重要。要定量研究，必须求解 Boltzmann 方程，并在碰撞项中计入两个光子偏振态以及 Compton 散射的偏振依赖。我们先考虑光子分布的单个平面波扰动。

首先要在最一般的情形下定义偏振轴：入射光子来自方向 $\hat{\boldsymbol n}'$（\figref{10.7}）。上一节入射方向是 $\hat{\boldsymbol e}_x$ 时，偏振显然定义为两个垂直方向 $y$、$z$ 上的强度之差。现在把垂直于入射方向、张成入射光偏振平面的两个轴记为 $\hat{\boldsymbol\epsilon}'_1$ 与 $\hat{\boldsymbol\epsilon}'_2$。我们仍只关注沿 $z$ 方向出射的光子，于是两个出射偏振轴可取 $\hat{\boldsymbol\epsilon}_1=\hat{\boldsymbol e}_x$、$\hat{\boldsymbol\epsilon}_2=\hat{\boldsymbol e}_y$。简言之：入射偏振矢量带撇 $\hat{\boldsymbol\epsilon}'_i$，出射的不带撇 $\hat{\boldsymbol\epsilon}_i$。`}</Tx>
        <Figure n="10.7" illustration={<ScatteringBasisRedraw />} caption={R`入射与出射方向的横向偏振基底。改变入射角，检查入射基矢始终垂直于传播方向。`} />
        <Tx>{R`**偏振依赖的截面。**上一节讨论的 Compton 散射的偏振依赖，可以简洁地表示为出射光子沿 $\hat{\boldsymbol\epsilon}_i$ 偏振时振幅平方中多出的一个因子。对两个（无关的）电子自旋以及**入射**光子偏振求和后，\eqref{5.18} 中的振幅平方——现在对出射偏振 $i=1,2$ 分别写——多出因子`}</Tx>
        <Eq n="10.13" title="Thomson 散射的偏振因子" say={R`出射光沿 $\hat{\boldsymbol\epsilon}_i$ 偏振的概率，正比于它与入射两个偏振方向的投影平方之和：电子只"转发"与出射方向垂直的那部分振动。`}>{R`\sum_{3\ \rm spins}|\mathcal M|^2 \propto \sum_{j=1}^2|\hat{\boldsymbol\epsilon}_i(\hat{\boldsymbol n})\cdot\hat{\boldsymbol\epsilon}'_j(\hat{\boldsymbol n}')|^2.`}</Eq>
        <Tx>{R`**Q 的积分式。**先计算 $Q$ 偏振。由 \eqref{10.2}，它的源是 $i=1$ 与 $i=2$ 的截面之差，即沿 $\hat{\boldsymbol e}_x$ 与 $\hat{\boldsymbol e}_y$ 方向的场强之差：`}</Tx>
        <Eq n="10.14" title="Q 型组合" say={R`$Q$ 的源 = 出射 $x$ 向截面减 $y$ 向截面；对每个入射偏振方向分别算投影平方之差再相加。`}>{R`\sum_{j=1}^2|\hat{\boldsymbol\epsilon}_1(\hat{\boldsymbol n})\cdot\hat{\boldsymbol\epsilon}'_j(\hat{\boldsymbol n}')|^2-\sum_{j=1}^2|\hat{\boldsymbol\epsilon}_2(\hat{\boldsymbol n})\cdot\hat{\boldsymbol\epsilon}'_j(\hat{\boldsymbol n}')|^2 = \sum_{j=1}^2\left(|\hat{\boldsymbol e}_x\cdot\hat{\boldsymbol\epsilon}'_j(\hat{\boldsymbol n}')|^2-|\hat{\boldsymbol e}_y\cdot\hat{\boldsymbol\epsilon}'_j(\hat{\boldsymbol n}')|^2\right).`}</Eq>
        <Tx>{R`对所有入射方向 $\hat{\boldsymbol n}'$ 积分，得`}</Tx>
        <Eq n="10.15" title="出射 Q：对入射方向积分" say={R`沿 $z$ 出射的 $Q$ = 各方向入射强度 $f(\hat{\boldsymbol n}')$ 乘以该方向对"$x$ 减 $y$"的贡献，再对全天积分。`}>{R`Q(\hat{\boldsymbol e}_z) = A\int d\Omega' f(\hat{\boldsymbol n}')\sum_{j=1}^2\left(|\hat{\boldsymbol e}_x\cdot\hat{\boldsymbol\epsilon}'_j(\hat{\boldsymbol n}')|^2-|\hat{\boldsymbol e}_y\cdot\hat{\boldsymbol\epsilon}'_j(\hat{\boldsymbol n}')|^2\right).`}</Eq>
        <Tx>{R`这里 $A$ 是归一化常数（下一节再关心它），$f(\hat{\boldsymbol n}')$ 是从 $\hat{\boldsymbol n}'$ 方向入射的辐射强度，对所有这样的方向积分。注意 $f$ 只依赖 $\hat{\boldsymbol n}'$ 而不依赖 $j$：这对应**入射辐射非偏振**的假设（\secref{10.4} 中会修正）。

**入射偏振基矢。**要算 \eqref{10.15} 中的点积，需要 $\hat{\boldsymbol\epsilon}'_1$、$\hat{\boldsymbol\epsilon}'_2$ 的笛卡儿分量。它们与 $\hat{\boldsymbol n}'$ 正交，而`}</Tx>
        <Eq n="10.16" title="入射方向" say={R`入射方向的球坐标：极角 $\theta'$ 从视线（$z$ 轴）量起，方位角 $\phi'$ 绕视线。`}>{R`\hat{\boldsymbol n}' = (\sin\theta'\cos\phi',\ \sin\theta'\sin\phi',\ \cos\theta').`}</Eq>
        <Tx>{R`取 $\hat{\boldsymbol\epsilon}'_2$ 位于 $x$–$y$ 平面内，得`}</Tx>
        <Eq n="10.17" title={R`$\hat{\boldsymbol\epsilon}'_2$`} say={R`第二个入射偏振方向取为水平的方位方向 $\hat{\boldsymbol e}'_\phi$。`}>{R`\hat{\boldsymbol\epsilon}'_2(\theta',\phi') = (-\sin\phi',\cos\phi',0).`}</Eq>
        <Tx>{R`于是 $\hat{\boldsymbol\epsilon}'_1$ 由 $\hat{\boldsymbol n}'$ 与 $\hat{\boldsymbol\epsilon}'_2$ 的叉积完全确定：`}</Tx>
        <Eq n="10.18" title={R`$\hat{\boldsymbol\epsilon}'_1$`} say={R`第一个入射偏振方向是极角方向 $\hat{\boldsymbol e}'_\theta$；它的 $z$ 分量 $-\sin\theta'$ 决定了"沿出射方向的振动传不出去"。`}>{R`\hat{\boldsymbol\epsilon}'_1(\theta',\phi') = (\cos\theta'\cos\phi',\ \cos\theta'\sin\phi',\ -\sin\theta').`}</Eq>
        <Tx>{R`也可以直接看出：$\hat{\boldsymbol\epsilon}'_1$、$\hat{\boldsymbol\epsilon}'_2$ 分别就是球坐标基矢 $\hat{\boldsymbol e}'_\theta$、$\hat{\boldsymbol e}'_\phi$。现在点积变得直截了当：$|\hat{\boldsymbol e}_x\cdot\hat{\boldsymbol\epsilon}'_1|^2=\cos^2\theta'\cos^2\phi'$，$|\hat{\boldsymbol e}_x\cdot\hat{\boldsymbol\epsilon}'_2|^2=\sin^2\phi'$，$|\hat{\boldsymbol e}_y\cdot\hat{\boldsymbol\epsilon}'_1|^2=\cos^2\theta'\sin^2\phi'$，$|\hat{\boldsymbol e}_y\cdot\hat{\boldsymbol\epsilon}'_2|^2=\cos^2\phi'$。于是`}</Tx>
        <Eq n="10.19" keyEq title="出射 Q 只挑出入射的四极" say={R`出射 $Q$ = 入射强度对权重 $-\sin^2\theta'\cos2\phi'\propto Y_{2,2}+Y_{2,-2}$ 的投影：只有入射分布的 $l=2$、$m=\pm2$ 部分能产生 $Q$。`}>{R`\begin{aligned}Q(\hat{\boldsymbol e}_z) &= A\int d\Omega' f(\hat{\boldsymbol n}')\left[\cos^2\theta'\cos^2\phi'+\sin^2\phi'-\cos^2\theta'\sin^2\phi'-\cos^2\phi'\right]\\ &= -A\int d\Omega' f(\hat{\boldsymbol n}')\sin^2\theta'\cos2\phi'.\end{aligned}`}</Eq>
        <Tx>{R`（方括号 $=\cos^2\theta'(\cos^2\phi'-\sin^2\phi')-(\cos^2\phi'-\sin^2\phi')=-(1-\cos^2\theta')\cos2\phi'$。）

**只有四极。**角度依赖正比于球谐函数之和 $Y_{2,2}+Y_{2,-2}$（\eqref{C.10}）。由球谐函数的正交性，积分只挑出分布 $f$ 的 $l=2$、$m=\pm2$ 分量。也就是说：**当且仅当入射辐射有四极矩时，才产生非零的 $Q$**。这验证了上一节的"看图论证"。$U$ 分量的对应表达式也不难推出（\exref{10.3}）：`}</Tx>
        <Eq n="10.20" keyEq title="出射 U" say={R`$U$ 的权重是把 $Q$ 的权重绕视线转 $45^\circ$：$-\sin^2\theta'\sin2\phi'\propto Y_{2,2}-Y_{2,-2}$；同样只有入射四极能产生它。`}>{R`U(\hat{\boldsymbol e}_z) = -A\int d\Omega' f(\hat{\boldsymbol n}')\sin^2\theta'\sin(2\phi').`}</Eq>
        <Tx>{R`现在角度依赖正比于 $Y_{2,2}-Y_{2,-2}$。同样，只有入射的四极产生 $U$ 偏振。`}</Tx>
        <Box kind="example" title="三个检验（交互图 10.5 中可逐一验证）">{R`(1) **单向光束**：$f=\delta(\hat{\boldsymbol n}'-\hat{\boldsymbol e}_x)$，即 $\theta'=\pi/2$、$\phi'=0$：$Q=-A$，$U=0$；而出射总强度 $\propto\sum_{i,j}|\hat{\boldsymbol\epsilon}_i\cdot\hat{\boldsymbol\epsilon}'_j|^2=1+\cos^2\theta'=1$，所以 100% 沿 $y$ 偏振，与 \figref{10.5} 左一致。
(2) **单极**：$f=$ 常数，$\int_0^{2\pi}\cos2\phi'\,d\phi'=0$，$Q=U=0$。
(3) **偶极**：$f\propto\hat{\boldsymbol n}'\cdot\hat{\boldsymbol d}$ 只含 $\cos\phi'$、$\sin\phi'$ 与 $\cos\theta'$，与 $\cos2\phi'$、$\sin2\phi'$ 正交，$Q=U=0$。`}</Box>
      </Sub>

      <Sub n="10.3.2" title="The scalar quadrupole" zh="代入标量平面波的四极">
        <Tx>{R`**为什么要一步步来。**现在把出射的 $Q$、$U$ 场与入射非偏振分布的矩联系起来。分几步：先取波矢沿 $x$ 轴，再推广到 $x$–$z$ 平面，最后得到任意方向 $\boldsymbol k$ 的结果。不过第一步就已给出最终结果的主要特征。

之所以要一步步来，是因为光子分布 $f(\hat{\boldsymbol n}')$ 中四极的方向由**波矢方向**决定。回忆第 5 章：光子分布写成零阶部分（均匀的 Planck 分布）加扰动 $\Theta(k,\mu)$，$\mu$ 是波矢 $\hat{\boldsymbol k}$ 与光子动量方向的点积。于是现在要追踪三个方向：波矢 $\hat{\boldsymbol k}$、入射方向 $\hat{\boldsymbol n}'$、出射方向 $\hat{\boldsymbol n}$。选 $\hat{\boldsymbol n}=\hat{\boldsymbol e}_z$ 已用掉了一部分坐标自由度。在我们的问题中 $\mu=\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}'$，所以 \eqref{10.19} 中的 $f(\hat{\boldsymbol n}')$ 是以 $\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}'$ 为宗量的 Legendre 多项式展开——它**不等于** $\cos\theta'$，因为 $\theta'$ 是 $z$ 轴与 $\hat{\boldsymbol n}'$ 的夹角。把 $\mu$ 与 $\theta'$、$\phi'$ 联系起来并不平凡，所以我们慢慢来。

**第一步：$\boldsymbol k$ 沿 $x$ 方向。**此时`}</Tx>
        <Eq n="10.21" title={R`$\hat{\boldsymbol k}\parallel\hat{\boldsymbol e}_x$ 时的 $\mu$`} say={R`波矢沿 $x$ 时，方向余弦 $\mu$ 就是入射方向的 $x$ 分量。`}>{R`\begin{aligned}\mu\equiv\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}' &= \left(\hat{\boldsymbol n}'\right)_x\\ &= \sin\theta'\cos\phi'\end{aligned}`}</Eq>
        <Tx>{R`第二个等号用了 \eqref{10.16}。回忆扰动 $\Theta$ 被分解为 Legendre 多项式之和，所以`}</Tx>
        <Eq n="10.22" title="只保留四极" say={R`温度扰动的 Legendre 展开中，只有四极项（$l=2$，系数 $(-i)^2\cdot5=-5$）对偏振有贡献。`}>{R`\begin{aligned}\Theta(k,\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}') &= \sum_l(-i)^l(2l+1)\Theta_l(k)\mathcal P_l\left(\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}'\right)\\ &\to -5\Theta_2(k)\mathcal P_2(\sin\theta'\cos\phi'),\end{aligned}`}</Eq>
        <Tx>{R`最后一行只保留了相关的四极部分，并代入 $\mu$ 的表达式 \eqref{10.21}。还要注意：与第 8、9 章一样，本节继续只讨论**标量**扰动。

于是波矢沿 $x$ 方向的平面波产生`}</Tx>
        <Eq n="10.23" title={R`$\hat{\boldsymbol k}\parallel\hat{\boldsymbol e}_x$ 的 Q 积分`} say={R`把四极 $-5\Theta_2\mathcal P_2$ 代入 \eqref{10.19}：负号相消，剩下一个纯几何的二重积分。`}>{R`Q(\hat{\boldsymbol e}_z,\boldsymbol k\|\hat{\boldsymbol e}_x) = 5A\Theta_2(k)\int_0^\pi d\theta'\sin\theta'\int_0^{2\pi}d\phi'\mathcal P_2(\sin\theta'\cos\phi')\sin^2\theta'\cos2\phi'.`}</Eq>
        <Tx>{R`回忆 $\mathcal P_2(\mu)=(3\mu^2-1)/2$。其中 $-1/2$ 部分对积分无贡献，因为 $\cos(2\phi')$ 的 $\phi'$ 积分为零。于是剩下`}</Tx>
        <Eq n="10.24" title="分离变量" say={R`只剩 $\frac32\mu^2=\frac32\sin^2\theta'\cos^2\phi'$ 一项，积分分离为 $\theta'$ 与 $\phi'$ 两个一维积分。`}>{R`Q(\hat{\boldsymbol e}_z,\boldsymbol k\|\hat{\boldsymbol e}_x) = \frac{15A\Theta_2(k)}{2}\int_0^\pi d\theta'\sin^5\theta'\int_0^{2\pi}d\phi'\cos^2\phi'\cos2\phi'.`}</Eq>
        <Tx>{R`$\phi'$ 积分为 $\pi/2$，$\theta'$ 积分为 $16/15$。所以`}</Tx>
        <Derivation title="两个积分" collapsed steps={[
          { tex: R`\int_0^{2\pi}d\phi'\cos^2\phi'\cos2\phi'=\int_0^{2\pi}d\phi'\,\frac{1+\cos2\phi'}{2}\cos2\phi'=\frac12\int_0^{2\pi}\cos^22\phi'\,d\phi'=\frac\pi2`, why: R`$\cos^2\phi'=(1+\cos2\phi')/2$；$\cos2\phi'$ 的整周期积分为零。` },
          { tex: R`\int_0^\pi d\theta'\sin^5\theta'=\int_{-1}^1(1-x^2)^2dx=2\left(1-\frac23+\frac15\right)=\frac{16}{15}`, why: R`令 $x=\cos\theta'$，$\sin^5\theta'\,d\theta'=-(1-x^2)^2dx$。` },
          { tex: R`\frac{15}{2}\cdot\frac\pi2\cdot\frac{16}{15}=4\pi`, why: "合起来。" },
        ]} />
        <Eq n="10.25" title={R`波矢沿 $x$：$Q=4\pi A\Theta_2$`} say={R`波矢垂直于视线时，散射光的 $Q$ 偏振直接等于 $4\pi A$ 乘温度四极：偏振是温度四极的"读数"。`}>{R`Q(\hat{\boldsymbol e}_z,\boldsymbol k\|\hat{\boldsymbol e}_x) = 4\pi A\Theta_2(k).`}</Eq>
        <Tx>{R`我们已经部分建立了偏振（这里由 $Q$ 代表）与各向异性形式体系（一般由 $\Theta_l$ 描述，四极则是 $\Theta_2$）之间的联系。不过这个表达式只适用于非常简单的情形：波矢沿 $x$ 轴，垂直于视线 $\hat{\boldsymbol e}_z$。

符号核对：$\Theta_2>0$ 意味着沿 $\pm\hat{\boldsymbol k}$ 方向较冷（$\Theta\propto-5\Theta_2\mathcal P_2$）、垂直方向较热；按 \figref{10.6} 的逻辑，较冷的 $\pm x$ 入射使出射 $y$ 向较暗，偏振沿 $x$——$Q>0$，与 \eqref{10.25} 一致。

**第二步：$\boldsymbol k$ 在 $x$–$z$ 平面内。**推广到 $x$–$z$ 平面内任意方向的波矢：$\hat{\boldsymbol k}=(\sin\theta_k,0,\cos\theta_k)$。此时 $\mathcal P_2(\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}')$ 包含`}</Tx>
        <Eq n="10.26" title={R`$(\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}')^2$ 的展开`} say={R`波矢倾斜后 $\mu^2$ 多出两项；只有含 $\cos^2\phi'$ 的第一项能与权重 $\cos2\phi'$ 配对。`}>{R`(\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}')^2 = \sin^2\theta_k\sin^2\theta'\cos^2\phi' + 2\sin\theta_k\cos\theta_k\cos\theta'\sin\theta'\cos\phi' + \cos^2\theta_k\cos^2\theta'.`}</Eq>
        <Tx>{R`第一项就是刚算过的 $\hat{\boldsymbol k}\|\hat{\boldsymbol e}_x$ 情形乘以 $\sin^2\theta_k$；第二、三项对 $\cos(2\phi')$ 做 $\phi'$ 积分后都为零（$\int\cos\phi'\cos2\phi'=0$，$\int\cos2\phi'=0$）。所以`}</Tx>
        <Eq n="10.27" title="x–z 平面内的波矢" say={R`偏振随波矢与视线的夹角按 $\sin^2\theta_k$ 变化：沿视线传播的波（$\theta_k=0$）在视线方向看去绕视线对称，不产生偏振。`}>{R`Q(\hat{\boldsymbol e}_z,\boldsymbol k\perp\hat{\boldsymbol e}_y) = 4\pi A\sin^2\theta_k\Theta_2(k).`}</Eq>
        <Tx>{R`在 \exref{10.3} 中可以证明：$\boldsymbol k$ 在 $x$–$z$ 平面内时**没有 $U$ 偏振**，偏振全是 $Q$。

**这意味着纯 E 模。**现在用上 \eqref{10.11}–\eqref{10.12} 学到的 E/B 分解：天空平面就是 $x$–$y$ 平面（它垂直于观测方向 $z$ 轴），所以 $x$–$z$ 平面内的 $\boldsymbol k$ 在天空上的投影沿 $x$ 轴。既然此时偏振是纯 $Q$，我们得出结论：**标量扰动产生的偏振全部在 E 分量中**。在 \exref{10.2} 中可以推出一般方向 $\boldsymbol k$ 的结果，验证它确实符合 \eqref{10.11} 预期的 E 模形式：`}</Tx>
        <Eq n="10.28" keyEq title="一般方向的波矢" say={R`波矢的天空投影转过 $\phi_k$，$(Q,U)$ 就按 $2\phi_k$ 转动，振幅不变——这正是 $\boldsymbol l$ 沿 $\phi_k$ 方向的纯 E 模（对照 \eqref{10.11} 的第一个矩阵）。`}>{R`\begin{aligned}Q(\hat{\boldsymbol e}_z,\boldsymbol k) &= 4\pi A\sin^2\theta_k\cos(2\phi_k)\Theta_2(k)\\ U(\hat{\boldsymbol e}_z,\boldsymbol k) &= 4\pi A\sin^2\theta_k\sin(2\phi_k)\Theta_2(k).\end{aligned}`}</Eq>
        <Tx>{R`**任意视线。**最后，把结果推广到不一定沿 $z$ 轴、而由单位矢量 $\hat{\boldsymbol n}$ 给出的出射方向（视线）。首先利用：偏振完全由天空上的标量 $E$ 模描述，它在 $\hat{\boldsymbol n}$ 的转动下不变。于是只需把 $\cos\theta_k$ 换成 $\hat{\boldsymbol n}\cdot\hat{\boldsymbol k}$：`}</Tx>
        <Eq n="10.29" keyEq title="标量平面波的 E 模偏振" say={R`沿任意视线 $\hat{\boldsymbol n}$ 看，单个标量平面波产生的偏振是纯 E 模，振幅为 $4\pi A$ 乘四极再乘 $1-\mu^2$（$\mu=\hat{\boldsymbol n}\cdot\hat{\boldsymbol k}$）：这就是下一节 Boltzmann 方程中源项的角度依赖。`}>{R`E(\hat{\boldsymbol n},\boldsymbol k) = 4\pi A\left(1-[\hat{\boldsymbol n}\cdot\hat{\boldsymbol k}]^2\right)\Theta_2(k).`}</Eq>
        <Tx>{R`此时应当记住，我们的结果全部在平直天空近似下推出；全天上的表达式会复杂不少，但不带来任何新物理。

**根本原因：对称性。**从根本上说，标量扰动只产生 E 模是由于**对称性**（见 \figref{10.8}）：若考虑沿 $x$ 轴的单个平面波标量扰动，体系绕这个轴有方位对称。四极于是对应辐射在 $\pm\hat{\boldsymbol e}_x$ 方向较热（比如说），在垂直于 $x$ 轴的方向较冷（这恰由我们遇到的 $Y_{2,\pm2}$ 组合描述；另见 \figref{C.1}）。如 \figref{10.8} 所示，这一方位对称要求 Compton 散射产生的偏振图样与 $x$ 轴对齐，如 \figref{10.3}——即纯 E 模。我们下面会看到这一点为何如此重要。Hu & White（1997）的综述对 E、B 模偏振产生的几何有更多详细的解释与图示，并超越了这里的平直天空近似。`}</Tx>
        <Figure n="10.8" illustration={<ScalarPolarizationRedraw />} caption={R`沿 x 轴的标量平面波：空间四极振幅、局部入射图样与沿 z 方向的纯 E 出射偏振。`} />
        <Box kind="warning" title="符号约定提示">{R`\eqref{10.25}–\eqref{10.29} 中 $A$ 的符号与第 5 章光深的约定有关：下一节会看到 $A\propto-\tau'$，而 $\tau'<0$，所以 $A>0$。另外 $E(\hat{\boldsymbol n},\boldsymbol k)$ 在 \eqref{10.29} 中是对单个三维 Fourier 模式而言的，它与 \eqref{10.7} 中二维的 $E(\boldsymbol l)$ 通过投影 $k\eta_0\to l$ 相连（\secref{10.4}）。`}</Box>
      </Sub>
    </Sec>);
}
