// §10.6 Detecting gravitational waves —— 式 (10.47)–(10.50)，图 10.11
// §10.7 Summary
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { ScatterWidget } from "./_ch10_plots.jsx";

const R = String.raw;

export function Sec106() {
  return (
    <Sec n="10.6" title="Detecting gravitational waves" zh="探测引力波：B 模"
      gist={R`标量模绕 $\hat{\boldsymbol k}$ 方位对称，只能产生 E；张量模的光子分布带 $\sin2\phi$、$\cos2\phi$ 方位依赖，四极相对标量情形转 $45^\circ$。取 $\hat{\boldsymbol k}=\cos\alpha\,\hat{\boldsymbol e}_z+\sin\alpha\,\hat{\boldsymbol e}_x$，$h_\times$ 产生 $U\propto h_\times\cos\alpha$（\eqref{10.50}）——天空投影沿 $x$ 的模出现 $U$，即 B 模。`}
      why={R`温度与 E 模中标量与张量的贡献纠缠在一起，参数简并使张量振幅难以确定；B 模没有标量污染，是原初引力波最干净的探针。`}
      gives={["10.47", "10.48", "10.49", "10.50"]}>
      <p className="muted">本节概念：<C id="bmode_gw" /> · <C id="scalar_E" /> · <C id="eb" /></p>
      <Sub n="10.6.1" title="Why tensors can make B" zh="为什么张量能产生 B 模">
        <Tx>{R`**标量的限制。**我们前几节考虑的标量扰动与张量扰动之间有根本差别。标量平面波扰动只关联一个方向：波矢 $\boldsymbol k$ 的方向。一旦它确定，所有光子矩只依赖光子动量与波矢的夹角；给定这个夹角，则绕 $\hat{\boldsymbol k}$ 方向有**方位对称**。正如 \figref{10.8} 所示，这一对称性正是标量扰动只产生 E 模的原因。偏振场中有两个方向：(i) 偏振的取向；(ii) 偏振强度变化的方向。对标量扰动，\figref{10.3} 表明这两个方向必须**对齐**（或互相垂直）。直观地说，两个方向都只能"看向"它们唯一知道的矢量——$\boldsymbol k$——来寻求指引。这种对齐就是 E 模的显著特征。

**张量多出一个方向。**张量扰动诱导的光子分布**不**绕 $\boldsymbol k$ 方向旋转对称——这是 \figref{6.1} 所示张量度规扰动特征图样的结果。它们反而给光子分布带来方位依赖。回忆 \exref{6.14} 推出的 \eqref{6.85}：所得分布按 $\sin(2\phi)$ 或 $\cos(2\phi)$ 变化，$\phi$ 是绕 $\boldsymbol k$ 轴的方位角。这个 $\phi$ 依赖意味着产生偏振场时**多了一个方向可供选择**。于是可以预期，偏振取向不一定与偏振强度变化的方向对齐。也就是说，引力波除了 E 模之外，可能还产生 **B 模**偏振。这正是本节要证明的。

**为什么 B 模如此重要。**在做代数之前，先停下来理解张量产生的 B 模的重要性。先看通过温度各向异性或 E 模探测张量的困难。标量与张量都对温度和 E 模有贡献，所以区分它们的唯一办法是利用二者谱随 $l$ 的差异。温度各向异性的情形已经告诉我们，这是一场棘手的游戏，因为有许多自由的宇宙学参数可以调节。所以即使我们完美地知道 $C_{EE}(l)$（没有噪声——由于宇宙方差这显然不可能），也仍然不能毫不含糊地判断张量是否存在。

B 模则不同。**它没有来自标量扰动的污染**，所以若在偏振中观测到 B 模，就知道它来自引力波。原则上，这一认识具有无限的威力：无论暴胀的张量信号多么小（无论 $H_{\rm inf}/m_{\rm Pl}$ 多么小），我们最终都能通过搜寻 B 模探测到它，因为没有其他成分的涨落会限制我们。实际上，存在来自前景辐射偏振（银河系的尘埃与同步辐射）以及非线性效应——特别是引力透镜（\secref{13.3}）——的污染，两者都贡献 B 模偏振。尽管如此，在可预见的未来，CMB B 模仍将是原初张量模最灵敏的探针。`}</Tx>
      </Sub>
      <Sub n="10.6.2" title="A tensor plane wave" zh="单个张量平面波产生 U">
        <Tx>{R`**问题与技巧。**计算单个张量平面波扰动产生的偏振图样，与 \secref{10.3} 处理的问题完全相同：要求 $z$ 轴附近的出射偏振，需要对入射光子分布积分。其实我们的目标只是证明张量模产生 B 模偏振，这允许我们用一个技巧：\eqref{10.12} 表明，对天空投影沿 $x$ 轴的波矢，只有 B 模产生 $U$ 偏振分量。所以只需证明：张量模在这一配置下通过 \eqref{10.20} 产生 $U$。

于是取 $\boldsymbol k$ 矢量为`}</Tx>
        <Eq n="10.47" title="张量模的波矢" say={R`波矢位于 $x$–$z$ 平面内、与视线成 $\alpha$ 角；它在天空上的投影沿 $x$ 轴，所以出现的 $U$ 就是 B 模。`}>{R`\hat{\boldsymbol k} = \cos\alpha\,\hat{\boldsymbol e}_z + \sin\alpha\,\hat{\boldsymbol e}_x,`}</Eq>
        <Tx>{R`$\alpha$ 是 $\hat{\boldsymbol k}$ 与视线 $\hat{\boldsymbol n}$ 的夹角。为了用 \eqref{10.20}，需要求 $\sym{ThT}{\Theta}^{\rm T}(\hat{\boldsymbol n}')$ 的角度依赖。这是 \exref{6.14} 的主题（如果你还没做过这道题，我们强烈推荐你做）。在那里可以证明：对沿 $z$ 轴的 $\boldsymbol k$，张量扰动诱导的温度各向异性的角度依赖为 $\sin^2\theta'\cos(2\phi')$（对 $h_+$）或 $\sin^2\theta'\sin(2\phi')$（对 $h_\times$）。为具体起见，我们聚焦 $h_\times$；$h_+$ 的同样推导留作 \exref{10.6}。首先把这个角度依赖用描述入射光子方向的单位矢量 $\hat{\boldsymbol n}'$ 重新表示：`}</Tx>
        <Eq n="10.48" title={R`$h_\times$ 产生的温度四极`} say={R`$h_\times$ 在温度中产生的四极就是 $2\hat n'_x\hat n'_y$——一个"对角线方向热、另一条对角线冷"的图样，正是标量四极转 $45^\circ$。`}>{R`\begin{aligned}\sym{ThT}{\Theta}^{\rm T}(\hat{\boldsymbol n}') \propto \sin^2\theta'\sin(2\phi') &= 2\sin^2\theta'\sin\phi'\cos\phi'\\ &= 2\hat{\boldsymbol n}'_x\hat{\boldsymbol n}'_y,\end{aligned}`}</Eq>
        <Tx>{R`其中 $\hat{\boldsymbol n}'_{x,y,z}$ 表示单位矢量的分量。现在要把它推广到 \eqref{10.47} 给出的波矢。为此把坐标系绕 $y$ 轴转 $-\alpha$。这保持 $\hat{\boldsymbol n}'_y$ 不变，而 $\hat{\boldsymbol n}'_x$ 变为`}</Tx>
        <Eq n="10.49" title="坐标旋转" say={R`把"$\boldsymbol k$ 沿 $z$"的结果转到"$\boldsymbol k$ 与 $z$ 成 $\alpha$"：$x$ 分量混入 $z$ 分量，$y$ 分量不变。`}>{R`\hat{\boldsymbol n}'_x \to \cos\alpha\,\hat{\boldsymbol n}'_x - \sin\alpha\,\hat{\boldsymbol n}'_z.`}</Eq>
        <Tx>{R`现在可以把角度依赖代入 \eqref{10.20}。\eqref{10.49} 的第二项在角度积分下为零（$\hat{\boldsymbol n}'_z\hat{\boldsymbol n}'_y\propto\cos\theta'\sin\theta'\sin\phi'$，与权重 $\sin^2\theta'\sin2\phi'$ 相乘后 $\phi'$ 积分为零），所以只写第一项；用角度 $\theta'$、$\phi'$ 表示，它其实与旋转前相同：$\propto\hat{\boldsymbol n}'_x\hat{\boldsymbol n}'_y=\frac12\sin^2\theta'\sin(2\phi')$。这给出`}</Tx>
        <Eq n="10.50" keyEq title="张量模产生 U（即 B 模）" say={R`$h_\times$ 引力波在投影沿 $x$ 的配置下产生 $U$，振幅 $\propto\cos\alpha$：这就是 B 模。波矢完全躺在天空平面内（$\alpha=\pi/2$）时消失。`}>{R`\begin{aligned}U(\hat{\boldsymbol e}_z) &\propto h_\times\cos\alpha\int_{-1}^1d\cos\theta'\sin^4\theta'\int_0^{2\pi}d\phi'\sin^2(2\phi')\\ &= h_\times\cos\alpha\left(\frac{16}{15}\right)\left(\frac\pi2\right).\end{aligned}`}</Eq>
        <Box kind="warning" title={R`疑似勘误：(10.50) 中的 $\phi'$ 积分`}>{R`$\int_0^{2\pi}\sin^2(2\phi')\,d\phi'=\pi$，而非 $\pi/2$；$\theta'$ 积分 $\int_{-1}^1(1-x^2)^2dx=\frac{16}{15}$ 无误。由于第一行本身只是比例关系（"$\propto$"），这不影响结论。按 \eqref{10.20} 的归一化并取 $\sym{ThT}{\Theta}^{\rm T}=2\hat{\boldsymbol n}'_x\hat{\boldsymbol n}'_y$ 严格计算：$U=-A\cdot\frac{16\pi}{15}\cos\alpha$。\figref{10.11} 上方的交互版（\figref{10.5} 中选"张量 $h_\times$"）在浏览器中数值积分，$\alpha=0$ 时给出 $U=-3.351=-16\pi/15$。`}</Box>
        <Tx>{R`**这就是 B 模。**结果摆在眼前：天空投影沿 $x$ 轴的张量模产生了 $U$ 偏振，这意味着它是 B 模的源。为了更直观地理解，回到 \figref{10.8}，它的中图画出了标量扰动的温度四极。张量模产生的四极图样绕指出纸面的 $z$ 轴**转了 $45^\circ$**（见 \figref{6.1} 中 $h_\times$ 的图样，其形式基本就是 \eqref{10.48}）；注意只有当 $\hat{\boldsymbol k}$ 有非零的 $z$ 分量（$\alpha\neq\pi/2$），即不完全躺在天空平面内时，这一图样才出现——这解释了 \eqref{10.50} 中的 $\cos\alpha$ 因子。这一温度四极图样意味着 \figref{10.8} 下图的偏振图样同样转了 $45^\circ$。与 \figref{10.3} 比较，显然这是 B 模。`}</Tx>
        <Figure n="10.11" interactive={<ScatterWidget mode0="hx" />}
          caption={R`张量模（引力波，GW）产生的 B 模 CMB 偏振各向异性谱，分别取张量–标量比 $r=0.001$ 与 $r=0.05$（如图所标）。对目前允许的 $r$ 值，B 模谱甚至远小于 E 模偏振谱。在小尺度上，B 模偏振由中间结构的引力透镜效应作用在原初 CMB E 模偏振上产生。实验测量（带误差棒的点：BK14、POLARBEAR、SPTPol）已清楚地探测到这一预期的透镜信号。大尺度上还有超出这一信号的部分，已被证明来自银河系偏振的前景尘埃辐射。取自 Abazajian et al.（2016）。**交互版**（单个张量平面波的散射几何，即 \eqref{10.47}–\eqref{10.50} 与 \exref{10.6}）：对 $h_\times$，调 $\alpha$ 看 $U=-\frac{16\pi}{15}\cos\alpha$ 的数值积分结果；切换到 $h_+$ 则 $U\equiv0$。`} />
      </Sub>
      <Sub n="10.6.3" title="The B-mode power spectrum" zh="B 模功率谱与透镜 B 模">
        <Tx>{R`**谱的形状。**\figref{10.11} 给出两个不同张量–标量比 $r$（\eqref{7.103}；原书此处误作"scalar-to-tensor ratio"）下暴胀引力波产生的 B 模功率谱。实际上，固定 $\mathcal A_s$ 时，$C_{BB}(l)$ 与 $r$ 成**线性**正比。峰值在 $l\approx100$ 附近的信号来自我们一直研究的复合时期。此外，在非常大的尺度上还有一个峰值在 $l<10$ 的贡献，由再电离后电子的散射产生。如前所述，E 模功率谱中也出现类似的特征（只是来自标量扰动），使我们能约束 $\tau_{\rm rei}$。目前的上限大约为 $r<0.05$，已经把 $C_{BB}(l)$ 约束到明显小于 E 模偏振谱。由于**没有信号就没有宇宙方差**，上限由实验灵敏度与前景扣除决定，所以未来更雄心勃勃的实验可以把这个上限继续往下推。

**透镜 B 模。**故事还没有完全结束。正如我们将在 \secref{13.3} 学到的，引力透镜也作用在 CMB 上：它把观测到的 CMB 冷热斑的位置挪到稍有不同的地方。挪动纯 E 模偏振图样的位置，同样会产生 B 模。这些"**透镜 B 模**"提供了一个**必然存在**的 B 模偏振功率谱，它已经被探测到了。幸运的是，如 \figref{10.11} 所示，这些 B 模的角功率谱不仅振幅远小于线性标量诱导的 CMB 扰动，而且形状与原初、张量模产生的 B 模有所不同。所以我们至少仍可以在大角尺度上搜寻后者。`}</Tx>
        <Box kind="physics" title={R`为什么张量 B 模的峰在 $l\sim100$`}>{R`引力波进入视界后振荡并衰减（第 6 章）。在复合时仍在视界外或刚进入视界的模式，其 $h$ 才在最后散射面附近产生可观的四极；复合时视界 $\eta_*$ 在今天天空上的张角约 $\eta_*/\eta_0\sim1/50$ 弧度（约 $1^\circ$），对应 $l\sim\pi\eta_0/\eta_*\sim100$。更大的 $l$（更早进入视界的模式）到复合时 $h$ 已经衰减，B 模迅速下降；更小的 $l$ 则受投影几何压低，直到 $l<10$ 再由再电离重新产生。`}</Box>
      </Sub>
    </Sec>);
}

export function Sec107() {
  return (
    <Sec n="10.7" title="Summary" zh="小结"
      gist={R`偏振是天空上的对称无迹 $2\times2$ 矩阵，分解为 E（梯度）与 B（旋度）两个独立自由度。线性标量扰动只产生 E；E 模已被精确测量（TE 反相关、再电离光深）；B 模是暴胀引力波最有希望的探针。`}
      why={R`回顾：同一个 Boltzmann 方程 + 平直天空近似，就足以拿下本书技术上最难的一段推导。`}>
      <Tx>{R`**先恭喜自己。**我们已成功攻克了本书技术上最繁重的推导！幸运的是，CMB 偏振在很大程度上可以用本书至今一直使用的同一套工具来处理，即 Boltzmann 方程，辅以在小角尺度上工作所带来的简化（平直天空近似）。

**E 与 B。**CMB 偏振的威力源于这样一个事实：它由天空上的对称、无迹 $2\times2$ 矩阵描述，可以分解为两个独立自由度——E 模（梯度模）与 B 模（旋度模），名字来自它们的图样与静电场、磁场的类比（\figref{10.4}）。线性标量扰动**只产生 E 模**。我们已证明 CMB 偏振（由局部四极温度场的 Compton 散射诱导）确实如此。在第 13 章我们会发现星系形状的关联也是如此，那里会大量使用 \secref{10.1} 的结果。

**E 模的信息。**CMB 的 E 模偏振含有宝贵的宇宙学信息，如今已被非常精确地测量（\figref{10.10}）。大尺度上与温度的**负互相关**是暴胀图景的又一稳健预言，现已被证实。此外，最低 $l$ 处的 E 模偏振直接探测再电离之后 CMB 光子的晚期散射，因而可以打破仅凭温度时存在的标量扰动振幅与晚期散射光深 $\tau_{\rm rei}$ 之间的简并。

**B 模的使命。**另一方面，B 模偏振可以用来搜寻非标量扰动。正如第 7 章所学，有很强的动机去寻找这类扰动，因为暴胀会产生引力波背景。\secref{10.6} 中我们证明了这些张量模确实在 CMB 中产生 B 模偏振。事实上，B 模是目前探测暴胀这一"确凿证据"的最有希望的途径，相应地也有大量实验力量投入对它的搜寻。`}</Tx>
    </Sec>);
}
