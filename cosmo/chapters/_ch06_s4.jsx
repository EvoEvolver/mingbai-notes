// §6.4 Tensor perturbations —— 式 (6.49)–(6.76)
import { Sec, Sub, Tx, Eq, Box, Derivation, C, Figure } from "@kit";
import { hT, Gm, Rm, dK } from "./_ch06_notation.jsx";
import { GWRing, TensorModePlot } from "./_ch06_plots.jsx";

const R = String.raw;

export function Sec64() {
  return (
    <Sec n="6.4" title="Tensor perturbations" zh="张量扰动"
      gist={R`对横向无迹扰动 $h^{\rm TT}_{ij}$ 重复"Christoffel → Ricci → Einstein"：$R_{00}$ 与 $R$ 不受影响，$\delta G^i{}_j$ 由 \eqref{6.70} 给出；取 $11-22$（与 $12$）分量得到 $h_t''+2\frac{a'}ah_t'+k^2h_t=0$——膨胀宇宙中的引力波方程。最后验证张量不进入标量方程（分解定理）。`}
      why={R`暴胀在产生标量扰动的同时也预言张量扰动（第 7 章）；它们在 CMB 中留下独特的印记（第 10 章 B 模偏振）。张量方程是本书中唯一真正"传播"的引力自由度。`}
      gives={["6.49", "6.53", "6.56", "6.57", "6.58", "6.65", "6.67", "6.69", "6.70", "6.71", "6.72", "6.73", "6.74", "6.76"]}>
      <p className="muted">本节概念：<C id="tt" /> · <C id="gw_eq" /> · <C id="horizon" /> · <C id="decomp_thm" /></p>
      <Tx>{R`**为什么还要张量。**到此为止推出的方程都适用于均匀 FLRW 宇宙的**标量**扰动。这样聚焦是合理的：如前所见，度规的标量扰动由密度涨落产生，反之亦然；构成宇宙结构的密度涨落是我们最主要的兴趣。而且有分解定理，单独研究标量扰动完全没有问题。

尽管如此，§6.1 已经表明还有其他类型的引力扰动，尤其是**张量**扰动。下一章将看到，标量扰动起源的主流理论——暴胀——也预言了张量扰动。抛开宇宙学不谈，自 LIGO 合作组首次探测以来，**引力波**已成为研究各种天体物理现象的有力探针。LIGO 敏感的波长约为数百公里，而我们要考虑的是数千 Mpc 的波长；但支配它们产生与传播的基本方程是同一个，我们现在已经有能力推导它了。

寻找宇宙学引力波最有希望的途径，是它们在 CMB 中（尤其在大尺度上）造成的畸变。所以全书各处散布着与张量扰动有关的习题。第三类——**矢量**扰动——也放在习题里。它们没那么有趣：在大多数宇宙学情景中它们不会被大量产生，即便产生也会迅速衰减（见习题 6.15 的解答）。研究矢量与张量模式所需的工具，正是我们研究标量扰动时打造的那些。

**张量扰动度规。**张量扰动可以用这样的度规扰动（记号见 \eqref{6.1}）刻画：时–时部分不扰动（$g_{00}=-1$，即 $h_{00}=0$；原书此处写作 $h_{00}=-1$，见下方易错点）、$h_{0i}=0$，并且`}</Tx>
      <Box kind="warning" title="原书此处的笔误">{R`原书写作"$h_{00}=-1$"，按 \eqref{6.1} 的记号应为 $h_{00}=0$（即 $g_{00}=-1$，如 §6.4.1 所述"$g_{00}$ 为常数"）。这里按正确含义讲述。`}</Box>
      <Eq n="6.49" keyEq title="张量扰动度规" say="引力波只扰动空间度规中垂直于传播方向（$z$ 轴）的 $x$–$y$ 块：对角元 $\pm h_+$、非对角元 $h_\times$，迹为零。">{R`\delta g_{ij}(t,\boldsymbol x)=a^2(t)${hT}_{ij}(t,\boldsymbol x),\qquad ${hT}_{ij}=\begin{pmatrix}h_+&h_\times&0\\ h_\times&-h_+&0\\ 0&0&0\end{pmatrix}.`}</Eq>
      <Tx>{R`也就是说，度规的扰动由两个函数 $h_+$ 和 $h_\times$ 描述，都假定很小。为确定起见，我们把扰动放在 $x$–$y$ 平面内；这对应于一种隐含的坐标轴选择——把 $z$ 轴取在波矢 $\boldsymbol k$ 的方向。更一般地，$h_+$ 与 $h_\times$ 是一个**无散、无迹、对称张量**的两个分量。无散意味着 $k^i${hT}_{ij}=k^j${hT}_{ij}=0$（$h_{ij}$ 中有散度的部分包含在 \eqref{6.6} 的标量与矢量扰动 $D$、$E$、$V_i$ 中）。\eqref{6.49} 显然满足这一点，因为在 $\hat{\boldsymbol k}=\hat{\boldsymbol e}_z$ 方向上没有分量。无迹也满足，因为对角线上的扰动之和为零。推导的大部分只依赖 $${hT}_{ij}$ 的横向与无迹性质，直到最后才特化到 $\hat{\boldsymbol k}=\hat{\boldsymbol e}_z$。

除了数学之外，我们很快会看到 \eqref{6.49} 中张量模的度规贡献有鲜明的几何特征。不过有了度规，先放手推导 Einstein 方程。推导同样分两步：(i) Christoffel 符号；(ii) Ricci 张量与 Einstein 张量。`}</Tx>

      <Sub n="6.4.1" title="Christoffel symbol for tensor perturbations" zh="张量扰动的 Christoffel 符号">
        <Tx>{R`**$\Gamma^0{}_{\alpha\beta}$。**所考虑的度规 \eqref{6.49} 中 $g_{00}$ 为常数、$g_{0i}$ 为零。回忆 Christoffel 符号是度规导数之和；唯一非零的项是含空间度规导数 $g_{ij,\alpha}$ 的项。因此可以立刻断言`}</Tx>
        <Eq n="6.50" say="上指标为 0、下指标含 0 的 Christoffel 符号全为零：它们只涉及 $g_{00}$、$g_{0i}$ 的导数，而这两者都是常数。">{R`\Gamma^0{}_{00}=\Gamma^0{}_{i0}=0.`}</Eq>
        <Tx>{R`两个下指标都是空间指标的那一项为`}</Tx>
        <Eq n="6.51" say="$\Gamma^0{}_{ij}$ 是空间度规的时间变化率的一半（$g^{00}=-1$）。">{R`\Gamma^0{}_{ij}=-\frac{g^{00}}2g_{ij,0}=\frac12g_{ij,0}.`}</Eq>
        <Tx>{R`由于 $g_{ij}=a^2(\delta_{ij}+${hT}_{ij})$，`}</Tx>
        <Eq n="6.52" say="空间度规的时间导数 = 背景膨胀 $2Hg_{ij}$ + 引力波振幅的变化 $a^2\dot h^{\rm TT}_{ij}$。">{R`g_{ij,0}=2Hg_{ij}+a^2${hT}_{ij,0}.`}</Eq>
        <Tx>{R`于是第一个非零的 Christoffel 符号是`}</Tx>
        <Eq n="6.53" keyEq={false} title={R`$\Gamma^0{}_{ij}$（张量扰动）`} say="背景项 $Hg_{ij}$（其中 $g_{ij}$ 已含 $h$）加上引力波变化率的一半。">{R`\Gamma^0{}_{ij}=Hg_{ij}+\frac{a^2${hT}_{ij,0}}2.`}</Eq>
        <Tx>{R`**$\Gamma^i{}_{0j}$ 与 $\Gamma^i{}_{jk}$。**两个下指标都为 0 时 Christoffel 符号为零（$\Gamma^i{}_{00}$ 只含 $g_{0i}$ 与 $g_{00}$ 的导数）。剩下两类分量是 $\Gamma^i{}_{0j}$ 与 $\Gamma^i{}_{jk}$。前者为`}</Tx>
        <Eq n="6.54" say="$\Gamma^i{}_{0j}$ 同样只是空间度规的时间导数，用逆度规 $g^{ik}$ 升起指标。">{R`\Gamma^i{}_{0j}=\frac{g^{ik}}2g_{jk,0}.`}</Eq>
        <Tx>{R`$g_{jk}$ 的时间导数既作用在标度因子上，也作用在扰动 $h_{+,\times}$ 上，如 \eqref{6.52}，所以`}</Tx>
        <Eq n="6.55" say="代入 \eqref{6.52}：一部分来自背景膨胀，一部分来自扰动的变化率。">{R`\Gamma^i{}_{0j}=\frac{g^{ik}}2\left[2Hg_{jk}+a^2${hT}_{jk,0}\right].`}</Eq>
        <Tx>{R`而 $g^{ik}g_{jk}=\delta_{ij}$，所以第一项就是背景贡献 $\delta_{ij}H$。对第二项，可以令 $g^{jk}=\delta_{jk}/a^2$（即忽略一阶项），因为它乘的是已经一阶的 $${hT}_{jk}$。所以`}</Tx>
        <Eq n="6.56" keyEq={false} title={R`$\Gamma^i{}_{0j}$（张量扰动）`} say="局域膨胀率：各向同性的 $H$ 加上引力波造成的各向异性“膨胀率” $\frac12\dot h^{\rm TT}_{ij}$——某些方向膨胀快、某些方向慢。">{R`\Gamma^i{}_{0j}=H\delta_{ij}+\frac12${hT}_{ij,0},`}</Eq>
        <Tx>{R`这里用了 $${hT}_{ij}$ 对称这一事实。最后需要的 Christoffel 符号是 $\Gamma^i{}_{jk}$。在习题 6.8 中你将证明`}</Tx>
        <Eq n="6.57" say="纯空间的 Christoffel 符号来自引力波的空间梯度（Fourier 空间中为 $ik$ 乘振幅），结构与平直空间小扰动的 Christoffel 符号相同。">{R`\Gamma^i{}_{jk}=\frac i2\left[k_k${hT}_{ij}+k_j${hT}_{ik}-k_i${hT}_{jk}\right].`}</Eq>
        <Derivation title={R`\eqref{6.57} 的推导（习题 6.8(a)，依据附录 A）`} collapsed steps={[
          { tex: R`\Gamma^i{}_{jk}=\frac{g^{il}}2\left[g_{lj,k}+g_{lk,j}-g_{jk,l}\right]`, why: R`定义。` },
          { tex: R`g_{lj,k}=a^2${hT}_{lj,k}\to a^2(ik_k)${hT}_{lj}`, why: R`全是空间导数，而度规中唯一随空间变化的是一阶的 $h^{\rm TT}$；Fourier 空间 $\partial_k\to ik_k$。` },
          { tex: R`\Gamma^i{}_{jk}=\frac{${dK}^{il}}{2a^2}\,a^2\,i\left[k_k${hT}_{lj}+k_j${hT}_{lk}-k_l${hT}_{jk}\right]`, why: R`因括号已是一阶，$g^{il}$ 取零阶 $\delta^{il}/a^2$，即得 \eqref{6.57}。` },
        ]} />
      </Sub>

      <Sub n="6.4.2" title="Ricci tensor for tensor perturbations" zh="张量扰动的 Ricci 张量">
        <Tx>{R`沿用标量扰动的步骤，把这些 Christoffel 符号组合成 Ricci 张量。

**$R_{00}$ 与 $R$ 不受影响。**先看时–时分量 $R_{00}$。其实不必显式计算：$R_{00}$ 没有空间指标（是 3-标量），所以 $${hT}_{ij}$ 的指标必须与 $R_{00}$ 内部的其他指标缩并。可选的只有 $\delta^{kl}$ 和 $k^i$（也可以与另一个 $h^{\rm TT}_{kl}$ 缩并，但那是二阶项）。而 $${hT}_{ij}$ 无迹且无散，与克罗内克 $\delta$ 或 $k^i$ 的一切缩并都为零。这意味着 $R_{00}$ 在线性阶上**不可能**含有张量模的贡献——这是分解定理的一个体现。Ricci 标量 $R$ 也一样。

**空间分量。**Ricci 张量的空间分量确实依赖张量扰动变量：`}</Tx>
        <Eq n="6.58" say="Ricci 张量空–空分量的定义 \eqref{3.3}：两项导数、两项乘积。">{R`R_{ij}=\Gamma^\alpha{}_{ij,\alpha}-\Gamma^\alpha{}_{i\alpha,j}+\Gamma^\alpha{}_{\alpha\beta}\Gamma^\beta{}_{ij}-\Gamma^\alpha{}_{\beta j}\Gamma^\beta{}_{i\alpha}.`}</Eq>
        <Tx>{R`**前两项。**放在一起展开：`}</Tx>
        <Eq n="6.59" say="前两项展开：由于 \eqref{6.50}，$\Gamma^\alpha{}_{i\alpha,j}$ 中 $\alpha=0$ 的部分为零。">{R`\Gamma^\alpha{}_{ij,\alpha}-\Gamma^\alpha{}_{i\alpha,j}=\Gamma^0{}_{ij,0}+\Gamma^k{}_{ij,k}-\Gamma^k{}_{ik,j}`}</Eq>
        <Tx>{R`因为由 \eqref{6.50}，$\alpha=0$ 在 $\Gamma^\alpha{}_{i\alpha,j}$ 中没有贡献。这里最长的是第一项，涉及多重时间导数。先推迟它的计算：回忆 $\Gamma^0{}_{ij}=g_{ij,0}/2$，所以第一项可以简写为 $g_{ij,00}/2$。\eqref{6.59} 的最后一项为零，因为对张量扰动 $\Gamma^k{}_{ik}=0$（迹为零）。合并其余各项（$\Gamma^k{}_{ij,k}\to ik_k\Gamma^k{}_{ij}$）得到`}</Tx>
        <Eq n="6.60" say="代入 \eqref{6.57}：三项分别含 $k_ik_k h_{jk}$、$k_jk_kh_{ik}$ 与 $k^2h_{ij}$。">{R`\Gamma^\alpha{}_{ij,\alpha}-\Gamma^\alpha{}_{i\alpha,j}=\frac{g_{ij,00}}2+\frac12\left[-k_ik_k${hT}_{jk}-k_jk_k${hT}_{ik}+k^2${hT}_{ij}\right].`}</Eq>
        <Tx>{R`括号中前两项因 $${hT}_{ij}$ 的横向性而为零。因此`}</Tx>
        <Eq n="6.61" say="横向性消去了两项，只剩下空间二阶导数（$k^2$）项与时间二阶导数项——波动方程的两个“动能”部分。">{R`\Gamma^\alpha{}_{ij,\alpha}-\Gamma^\alpha{}_{i\alpha,j}=\frac{g_{ij,00}}2+\frac{k^2}2${hT}_{ij}.`}</Eq>
        <Tx>{R`**第三项** $\Gamma^\alpha{}_{\alpha\beta}\Gamma^\beta{}_{ij}$：只有 $\alpha$ 为空间指标时非零（$\Gamma^0{}_{0\beta}=0$），所以`}</Tx>
        <Eq n="6.62" say="第三项拆成 $\beta=0$ 与 $\beta$ 为空间指标两部分。">{R`\Gamma^\alpha{}_{\alpha\beta}\Gamma^\beta{}_{ij}=\Gamma^k{}_{k0}\Gamma^0{}_{ij}+\Gamma^k{}_{kl}\Gamma^l{}_{ij}.`}</Eq>
        <Tx>{R`第二项中两个 Christoffel 符号都是一阶的，乘积可忽略。第一项中对 $k$ 的求和使一阶项消失（$h^{\rm TT}$ 无迹），所以 $\Gamma^k{}_{k0}$ 纯为零阶的 $3H$。因此`}</Tx>
        <Eq n="6.63" say="第三项 = 背景膨胀率之和 $3H$ 乘以 $\Gamma^0{}_{ij}=g_{ij,0}/2$。">{R`\Gamma^\alpha{}_{\alpha\beta}\Gamma^\beta{}_{ij}=\frac32Hg_{ij,0}.`}</Eq>
        <Tx>{R`**最后一项**留作习题（习题 6.8(b)）：`}</Tx>
        <Eq n="6.64" say="第四项：两个“局域膨胀率”的乘积，背景部分 $2H^2g_{ij}$ 加上与引力波变化率的交叉项。">{R`\Gamma^\alpha{}_{\beta j}\Gamma^\beta{}_{i\alpha}=2H^2g_{ij}+2a^2H${hT}_{ij,0}.`}</Eq>
        <Derivation title={R`\eqref{6.64} 的推导（习题 6.8(b)，依据附录 A）`} collapsed steps={[
          { tex: R`\Gamma^\alpha{}_{\beta j}\Gamma^\beta{}_{i\alpha}=\Gamma^0{}_{kj}\Gamma^k{}_{i0}+\Gamma^k{}_{0j}\Gamma^0{}_{ik}=\Gamma^0{}_{kj}\Gamma^k{}_{i0}+(i\leftrightarrow j)`, why: R`$\alpha=\beta=0$ 时为零（$\Gamma^0{}_{0i}=0$）；$\alpha,\beta$ 都是空间指标时每个因子都是一阶，乘积为二阶。` },
          { tex: R`\Gamma^0{}_{kj}\Gamma^k{}_{i0}=\frac12\left(2Hg_{jk}+a^2${hT}_{jk,0}\right)\left(H${dK}_{ik}+\frac12${hT}_{ik,0}\right)=H^2g_{ij}+a\dot a\,${hT}_{ij,0}`, why: R`代入 \eqref{6.53}、\eqref{6.56}；一阶交叉项两个，各为 $\frac12a^2H\dot h^{\rm TT}_{ij}$（$g_{jk}\to a^2\delta_{jk}$），合计 $a^2H\dot h^{\rm TT}_{ij}=a\dot a\dot h^{\rm TT}_{ij}$。` },
          { tex: R`\Gamma^\alpha{}_{\beta j}\Gamma^\beta{}_{i\alpha}=2H^2g_{ij}+2a\dot a\,${hT}_{ij,0}`, why: R`加上 $i\leftrightarrow j$ 的同样项（$h^{\rm TT}$ 对称），得因子 2；$a\dot a=a^2H$。` },
        ]} />
        <Tx>{R`现在把 \eqref{6.58} 的四项合起来：`}</Tx>
        <Eq n="6.65" say="四项之和：时间二阶导数项、空间梯度项、两项膨胀项相减。">{R`R_{ij}=\frac{g_{ij,00}}2+\frac{k^2}2${hT}_{ij}+\frac32Hg_{ij,0}-2H^2g_{ij}-2a^2H${hT}_{ij,0}.`}</Eq>
        <Tx>{R`还需要把度规的时间导数展开。对 \eqref{6.52} 再求一次时间导数（$\dot H=\ddot a/a-H^2$），得`}</Tx>
        <Eq n="6.66" say="空间度规的二阶时间导数：背景加速与膨胀的组合，加上引力波振幅的一阶、二阶时间导数。">{R`g_{ij,00}=2g_{ij}\left(\frac{\ddot a}{a}+H^2\right)+4a^2H${hT}_{ij,0}+a^2${hT}_{ij,00}.`}</Eq>
        <Tx>{R`于是 Ricci 张量为`}</Tx>
        <Eq n="6.67" keyEq title={R`张量扰动下的 $R_{ij}$`} say="零阶部分 $g_{ij}(\ddot a/a+2H^2)$ 与背景一致；一阶部分是引力波的“波动算符”：二阶时间导数、哈勃阻尼与空间梯度。">{R`R_{ij}=g_{ij}\left(\frac{\ddot a}{a}+2H^2\right)+\frac32a^2H${hT}_{ij,0}+a^2\frac{${hT}_{ij,00}}2+\frac{k^2}2${hT}_{ij}.`}</Eq>
        <Derivation title={R`\eqref{6.65} + \eqref{6.66} → \eqref{6.67}`} collapsed steps={[
          { tex: R`\frac{g_{ij,00}}2=g_{ij}\left(\frac{\ddot a}a+H^2\right)+2a^2H${hT}_{ij,0}+\frac{a^2}2${hT}_{ij,00}`, why: R`\eqref{6.66} 除以 2。` },
          { tex: R`\frac32Hg_{ij,0}=3H^2g_{ij}+\frac32a^2H${hT}_{ij,0}`, why: R`\eqref{6.52}。` },
          { tex: R`g_{ij}\left(\frac{\ddot a}a+H^2+3H^2-2H^2\right)+a^2H${hT}_{ij,0}\left(2+\frac32-2\right)+\dots`, why: R`与 $-2H^2g_{ij}-2a^2H\dot h^{\rm TT}_{ij}$ 合并：系数 $\frac32$。` },
        ]} />
        <Tx>{R`我们再一次成功地重现了 Ricci 张量的零阶部分。前面论证过，Ricci 标量`}</Tx>
        <Eq n="6.68" say="Ricci 标量的定义：两部分缩并之和。">{R`R=g^{00}R_{00}+g^{ij}R_{ij}`}</Eq>
        <Tx>{R`在线性阶上不受 $${hT}_{ij}$ 的任何贡献。用 \eqref{6.67} 你可以轻松确认这一点：$g^{ij}g_{ij}=3$ 的零阶项之外，一阶项都与 $\delta^{ij}$ 缩并（$g^{ij}$ 的一阶部分 $-h^{ij}/a^2$ 与零阶 $g_{ij}$ 的乘积给出迹 $h^i{}_i=0$），而 $h^{\rm TT}$ 无迹。我们已准备好转向 Einstein 方程。正如 §6.1 所预期的，下面会看到刚算出的 Einstein 张量一阶部分并不与标量扰动耦合。`}</Tx>
      </Sub>

      <Sub n="6.4.3" title="Einstein equations for tensor perturbations" zh="张量扰动的 Einstein 方程">
        <Tx>{R`**读出 $\delta G^i{}_j$。**现在读出张量模引起的 Einstein 张量扰动。由于 Ricci 标量不受张量扰动影响，一阶 Einstein 张量就是`}</Tx>
        <Eq n="6.69" say="张量扰动下 $\delta R=0$，所以 Einstein 张量的扰动就等于 Ricci 张量的扰动。">{R`\delta ${Gm}^i{}_j=\delta ${Rm}^i{}_j.`}</Eq>
        <Tx>{R`为得到 $R^i{}_j$，用 \eqref{6.67} 的 Ricci 张量缩并 $g^{ik}R_{kj}$。第一项正比于 $g^{ik}g_{kj}=\delta^i{}_j$，没有一阶部分；其余项显然是 $h^{\rm TT}$ 的一阶量，所以可令 $g^{ik}=\delta^{ik}/a^2$，得到`}</Tx>
        <Eq n="6.70" keyEq title={R`张量模的 $\delta G^i{}_j$`} say="引力波对 Einstein 张量的贡献：哈勃阻尼项、二阶时间导数项与空间梯度项——正是波动方程的三部分。">{R`\delta ${Gm}^i{}_j=${dK}^{ik}\left[\frac32H${hT}_{kj,0}+\frac{${hT}_{kj,00}}2+\frac{k^2}{2a^2}${hT}_{kj}\right].`}</Eq>
        <Tx>{R`**特化到 $\hat{\boldsymbol k}=\hat{\boldsymbol e}_z$。**最后，为推出张量变量 $h_+$、$h_\times$ 的演化方程，特化到 $\hat{\boldsymbol k}=\hat{\boldsymbol e}_z$（最终方程与这个方便的选择无关）。

为得到 $h_+$ 的方程，考虑 Einstein 张量的 $G^1{}_1$ 与 $G^2{}_2$ 分量之差。\eqref{6.70} 中的 Einstein 张量正比于 $${hT}_{ij}$ 及其导数。由于 $${hT}_{11}=-${hT}_{22}=h_+$，$\delta G^1{}_1$ 与 $\delta G^2{}_2$ 大小相等、符号相反。所以`}</Tx>
        <Eq n="6.71" say="$11$ 与 $22$ 分量之差只含 $h_+$：阻尼项 $3H\dot h_+$、加速度 $\ddot h_+$ 与梯度项 $k^2h_+/a^2$。">{R`\delta ${Gm}_1{}^1-\delta ${Gm}_2{}^2=3Hh_{+,0}+h_{+,00}+\frac{k^2h_+}{a^2}.`}</Eq>
        <Tx>{R`现在换成共形时间：$h_{+,0}=h'_+/a$，$h_{+,00}=h''_+/a^2-(a'/a^3)h'_+$。于是`}</Tx>
        <Eq n="6.72" say="乘以 $a^2$ 并换成共形时间后，$11-22$ 分量就是 $h_+$ 的阻尼波动算符：阻尼系数从 $3H$ 变成 $2a'/a$。">{R`a^2[\delta ${Gm}^1{}_1-\delta ${Gm}^2{}_2]=h''_++2\frac{a'}{a}h'_++k^2h_+.`}</Eq>
        <Derivation title={R`换成共形时间：$3\to2$ 的由来`} collapsed steps={[
          { tex: R`a^2\cdot3Hh_{+,0}=3a^2\frac{a'}{a^2}\frac{h'_+}a=3\frac{a'}ah'_+`, why: R`$H=a'/a^2$，$h_{+,0}=h'_+/a$。` },
          { tex: R`a^2h_{+,00}=h''_+-\frac{a'}ah'_+`, why: R`$\partial_t=\frac1a\partial_\eta$ 作用两次：$\frac1a\partial_\eta(\frac1ah')=\frac{h''}{a^2}-\frac{a'}{a^3}h'$。` },
          { tex: R`3\frac{a'}ah'_+-\frac{a'}ah'_+=2\frac{a'}ah'_+`, why: R`两项合并。` },
        ]} />
        <Tx>{R`**右边为零。**在没有各向异性应力时，Einstein 方程这个分量的右边为零（习题 6.9）。这意味着第 5 章推导的物质扰动**不产生**引力波。辐射成分（光子与中微子）的各向异性确实有各向异性应力，由其四极矩给出。如上一节所论，光子的四极矩在辐射主导时期被压低，其源项可以忽略。张量 Einstein 方程右边最相关的量于是是中微子的各向异性应力。它确实为引力波提供了一个源项，导致小尺度张量模的阻尼。这里忽略它，因为本书其余部分关注的是大尺度张量模。

最后，$h_\times$ 满足与 $h_+$ 相同的方程（习题 6.11），所以张量模由下式支配：`}</Tx>
        <Eq n="6.73" keyEq title="引力波方程" say="膨胀宇宙中的引力波方程：一个带“哈勃摩擦” $2(a'/a)h'$ 的波动方程，$+$ 与 $\times$ 两种偏振各自独立满足。">{R`h''_t+2\frac{a'}{a}h'_t+k^2h_t=0`}</Eq>
        <Tx>{R`其中 $t=+,\times$。\eqref{6.73} 是一个**波动方程**，对应的解称为**引力波**。例如，若忽略宇宙膨胀，使 \eqref{6.73} 中的阻尼项消失，立刻看出两个解是 $h_t\propto e^{\pm ik\eta}$。在实空间中，度规扰动的形式为`}</Tx>
        <Eq n="6.74" say="不考虑膨胀时，引力波是以光速沿 $\pm\hat{\boldsymbol k}$ 传播的平面波的叠加，$A$、$B$ 为两个方向的振幅。">{R`h_t(\boldsymbol x,\eta)=\int\frac{d^3k}{(2\pi)^3}e^{i\boldsymbol k\cdot\boldsymbol x}\left[\sym{ch06-Aamp}{A}(\boldsymbol k)e^{ik\eta}+\sym{ch06-Bamp}{B}(\boldsymbol k)e^{-ik\eta}\right]\qquad\text{(no expansion)}.`}</Eq>
        <Tx>{R`这两个模式对应以光速沿 $\pm z$ 方向传播的波。它们引起的时空畸变画在图 6.1 下半部分。注意垂直于波矢的平面内的**椭圆图样**。这种不对称是张量模与标量扰动的根本区别（另见习题 6.14）：标量扰动引起的时空畸变总是绕波矢方位对称的。`}</Tx>
        <Figure n="6.1" interactive={<GWRing />}
          caption={R`传播中的引力波（张量模）造成的时空扰动示意；$\boldsymbol k$ 矢量沿 $z$ 轴（如 \eqref{6.49}），垂直纸面向外。上半部分是波振幅随时间的演化（忽略一个周期内膨胀造成的阻尼），下半部分是在一个波周期内不同时刻，时空在垂直于传播方向上的拉伸与压缩。**交互版**：拖动相位或点"播放"，看一圈测试粒子随 $h_+$、$h_\times$ 变形；偏振角 $\psi$ 在 $+$ 与 $\times$ 之间连续过渡。右侧四个小图复现原书图 6.1 的 $h_+$、$h_\times$ 两行。`} />
        <Tx>{R`**膨胀宇宙中的解。**\eqref{6.73} 是引力波方程在膨胀宇宙中的推广。习题 6.12 表明，若宇宙纯辐射主导或纯物质主导，可以得到精确解析解：与 \eqref{6.74} 中的简单解一样是振荡的，但振幅也会衰减。图 6.2 给出四个不同波长模式的 $h_t$ 演化。

- 每个模式在早期、当其波长大于视界（$k\eta<1$）时保持**常数**。"大于视界"的确切含义下一章再讲；现在只需注意，在 \eqref{6.73} 中令 $k\to0$，$h_t=$ 常数是一个解。
- 一旦模式的波长与视界相当，其振幅就以频率 $k/2\pi$ 振荡并开始**衰减**。具体地，衰减方式是 $\propto1/a$，使得引力波的能量密度按 $a^{-4}$ 红移——正如我们对任何形式的辐射所预期的。
- 给定 $k$ 的模式在 $k\eta=1$ 时被称为**进入视界**。由于小尺度模式（如图 6.2 中的 $k/H_0=1000$）更早进入视界，它们比大尺度张量模衰减得更多。`}</Tx>
        <Box kind="physics" title={R`为什么振幅 $\propto1/a$`}>{R`令 $h=\chi/a$，代入 \eqref{6.73}：$\chi''+(k^2-a''/a)\chi=0$。亚视界时 $k^2\gg a''/a\sim\eta^{-2}$，$\chi\approx\cos(k\eta+\varphi_0)$，于是 $h\propto\cos(k\eta)/a$。引力波能量密度 $\propto\langle\dot h^2\rangle\propto(k/a)^2h^2\propto a^{-4}$：频率红移一个 $1/a$，"粒子数"稀释 $a^{-3}$——与光子完全相同。`}</Box>
        <Figure n="6.2" interactive={<TensorModePlot />}
          caption={R`不同波数的引力波随共形时间的演化，以其初始超视界振幅归一化。每个模式在波长变得小于视界——对应 $k\eta=1$ 的时刻——时开始振荡并衰减。小尺度（高 $k$）模式衰减得更早。**交互版**：浏览器内用 RK4 数值求解 \eqref{6.73}（平直 $\Lambda$CDM，$h=0.7$，$\Omega_{\rm r}h^2=4.15\times10^{-5}$），可调 $\Omega_{\rm m}$ 与一个额外模式的 $k$。核对：$k/H_0=1000$ 的模式在 $H_0\eta\approx0.0045$ 处达到最小值 $-0.21$，$k/H_0=100$ 在 $H_0\eta\approx0.046$ 处达到 $-0.17$，$k/H_0=1$ 在 $H_0\eta=4$ 处为 $0.17$，均与原书图一致；基准宇宙学今天 $H_0\eta_0=3.24$（原书横轴延伸到 $H_0\eta\approx4$，即越过今天，到 $a\approx3$）。`} />
      </Sub>

      <Sub n="6.4.4" title="Verifying the decomposition theorem" zh="验证分解定理">
        <Tx>{R`**要证明什么。**既然已经算出了标量与张量对 Einstein 张量 $G_{\mu\nu}$ 的贡献，就可以演示这两类扰动的分解。为此回忆：我们是通过 Einstein 张量的两个分量得到标量方程的：`}</Tx>
        <Eq n="6.75" say="推导标量方程所用的两个分量：时–时分量，与空–空分量的纵向无迹部分。">{R`${Gm}^0{}_0;\qquad\left(\hat k_i\hat k_j-\frac13${dK}_{ij}\right)${Gm}^i{}_j.`}</Eq>
        <Tx>{R`把这两个分量代入 Einstein 方程得到了 \eqref{6.41} 与 \eqref{6.48}。如果能证明张量扰动对这两个分量没有贡献，我们就至少确认了分解定理的一部分：**支配标量扰动的方程不受张量影响**。

张量扰动对 $G^0{}_0$ 没有贡献，因为 $G^0{}_0$ 只依赖 $R_{00}$ 与 $R$，而我们已看到两者都不依赖 $h_+$ 或 $h_\times$。现在证明 $(\hat k_i\hat k_j-\delta_{ij}/3)G^i{}_j$ 也不含张量贡献。用投影算符乘 \eqref{6.70}：`}</Tx>
        <Eq n="6.76" keyEq title="张量不进入标量方程" say="把纵向无迹投影作用于张量模的 Einstein 张量：右边每一项都含 $\hat k^ih^{\rm TT}_{ij}$（横向性使之为零）或 $h^{\rm TT}$ 的迹（无迹性使之为零），所以整体为零。">{R`\left(\hat k_i\hat k_j-\frac13${dK}_{ij}\right)\delta ${Gm}^i{}_j=\left(\hat k^i\hat k^j-\frac13${dK}^{ij}\right)\times\left[\frac32H${hT}_{ij,0}+\frac{${hT}_{ij,00}}2+\frac{k^2}{2a^2}${hT}_{ij}\right].`}</Eq>
        <Tx>{R`右边各项全为零：它们要么涉及 $\hat k^i${hT}_{ij}$ 这类缩并（及其时间导数），因横向性而为零；要么涉及 $${hT}_{ij}$ 的迹，因无迹而为零。所以上一节推出的标量方程不因张量模的存在而改变——这是分解定理的一个体现。反方向（标量不进入张量方程）见习题 6.10；矢量模见习题 6.15。`}</Tx>
      </Sub>
    </Sec>);
}
