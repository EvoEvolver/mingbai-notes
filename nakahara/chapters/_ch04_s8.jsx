import {TextureRedraw} from "./_redraw_textures.jsx";
// §4.8 凝聚态系统中的序 —— 式 (4.57)–(4.67)，图 4.20–4.22，交互图 4（SkyrmionLab）
import { Sec, Sub, Tx, Eq, Box, Figure, Erratum, Derivation, Table, C, FormulaMap } from "@kit";
import { FM_4_60 } from "./_ch04_fmaps.jsx";
import { SkyrmionLab } from "./_ch04_demos.jsx";

const R = String.raw;

export function Sec48() {
  return (
    <Sec n="4.8" title="Orders in condensed matter systems" zh="凝聚态系统中的序"
      gist={R`对称性自发破缺使均匀基态取值于**序参量空间** $M$（铁磁体 $S^2$、超导与超流 $^4$He 为 $\mathrm{U}(1)$、向列相为 $\sym{RP}{\RP^2}$、$^3$He-A 为 $S^2\times\mathrm{SO}(3)$）。包围缺陷的球面 $S^n$ 上的序参量是映射 $S^n\to M$，其同伦类就是缺陷的拓扑荷：$d$ 维介质中的 $m$ 维缺陷由 $\pi_n(M)$ 分类，$n=d-m-1$（\eqref{4.67}）。`}
      why={R`这是本章数学的物理落点：同伦群不是用来给空间分类，而是给**场位形**分类——哪些缺陷可以被"熨平"，哪些因拓扑原因稳定存在。`}
      gives={["4.57", "4.58", "4.59", "4.63a", "4.65a", "4.66", "4.67"]}>
      <Tx>{R`近年来拓扑方法在凝聚态物理中发挥着越来越重要的作用。例如同伦论被用来给凝聚态系统中可能存在的扩展客体（孤子、涡旋、单极子等等）分类。这些分类将在 §4.8–4.10 中研究。这里先简要地看看发生相变的凝聚态系统的序参量。`}</Tx>
      <Sub n="4.8.1" title="Order parameter" zh="序参量">
        <p className="muted">本小节概念：<C id="order_parameter" /></p>
        <Tx>{R`设 $\sym{Ham}{H}$ 是描述某凝聚态系统的哈密顿量，并设 $\sym{Ham}{H}$ 在某种对称操作下不变。系统的基态不必保持 $\sym{Ham}{H}$ 的对称性。若如此，就说系统发生了**对称性自发破缺**（spontaneous symmetry breakdown）。

为说明这一现象，考虑 **Heisenberg 哈密顿量**`}</Tx>
        <Eq n="4.57" keyEq title="Heisenberg 铁磁体" say="相邻自旋倾向于平行排列（J>0），外场 h 与总自旋耦合。h→0 时哈密顿量对整体转动不变。">{R`\sym{Ham}{H}=-J\sum_{(i,j)}\boldsymbol{S}_i\cdot\boldsymbol{S}_j+\boldsymbol{h}\cdot\sum_i\boldsymbol{S}_i`}</Eq>
        <Tx>{R`它描述 $N$ 个铁磁 Heisenberg 自旋 $\{\boldsymbol{S}_i\}$。参数 $J$ 是正常数，求和遍及最近邻格点对 $(i,j)$，$\boldsymbol{h}$ 是均匀外磁场。配分函数为 $Z=\operatorname{tr}e^{-\sym{betaT}{\beta}\sym{Ham}{H}}$，其中 $\sym{betaT}{\beta}=1/T$ 是温度的倒数。自由能 $\sym{Ffree}{F}$ 由 $\exp(-\sym{betaT}{\beta}\sym{Ffree}{F})=Z$ 定义。每个自旋的平均磁化为`}</Tx>
        <Eq n="4.58" say="每个自旋的平均磁化等于自由能对外场的导数除以自旋数（按本式中 +h·S 的符号约定）。">{R`\boldsymbol{m}\equiv\frac1N\sum_i\langle\boldsymbol{S}_i\rangle=\frac{1}{N}\frac{\partial \sym{Ffree}{F}}{\partial\boldsymbol{h}}`}</Eq>
        <Tx>{R`其中 $\langle\ldots\rangle\equiv\operatorname{tr}(\ldots e^{-\sym{betaT}{\beta}\sym{Ham}{H}})/Z$。`}</Tx>
        <Erratum kind="erratum" loc="p.173，式 (4.58)" title={R`勘误：(4.58) 多了一个因子 $1/\beta$`}>{R`原书印作 $\boldsymbol{m}=\frac{1}{N\sym{betaT}{\beta}}\frac{\partial \sym{Ffree}{F}}{\partial\boldsymbol{h}}$。直接求导：

$$\frac{\partial \sym{Ffree}{F}}{\partial\boldsymbol{h}}=-\frac{1}{\sym{betaT}{\beta}}\frac{1}{Z}\frac{\partial Z}{\partial\boldsymbol{h}}=-\frac{1}{\sym{betaT}{\beta}Z}\operatorname{tr}\Big(-\sym{betaT}{\beta}\sum_i\boldsymbol{S}_i\,e^{-\sym{betaT}{\beta}\sym{Ham}{H}}\Big)=\sum_i\langle\boldsymbol{S}_i\rangle,$$

所以 $\boldsymbol{m}=\frac1N\,\partial \sym{Ffree}{F}/\partial\boldsymbol{h}$。量纲检验：$\boldsymbol{h}\cdot\boldsymbol{S}$ 是能量，$\partial \sym{Ffree}{F}/\partial\boldsymbol{h}$ 已具有自旋的量纲；再乘 $1/\sym{betaT}{\beta}=T$（能量）就不对了。原式若写成 $\frac{1}{N\sym{betaT}{\beta}}\frac{\partial\ln Z}{\partial\boldsymbol{h}}$ 则差一个负号；本站取上面的形式。（另：哈密顿量中写 $+\boldsymbol{h}\cdot\sum\boldsymbol{S}_i$ 时，磁化与 $\boldsymbol{h}$ **反**平行；通常约定写 $-\boldsymbol{h}\cdot\sum\boldsymbol{S}_i$，此时 $\boldsymbol{m}=-\frac1N\partial \sym{Ffree}{F}/\partial\boldsymbol{h}$。不影响后面的讨论。）`}</Erratum>
        <Tx>{R`考虑极限 $\boldsymbol{h}\to0$。在这个极限下 $\sym{Ham}{H}$ 对全体 $\boldsymbol{S}_i$ 的 $\mathrm{SO}(3)$ 转动不变；但众所周知，$\sym{betaT}{\beta}$ 足够大时 $\boldsymbol{m}$ 不为零，系统不遵守 $\mathrm{SO}(3)$ 对称性。这称为**自发磁化**（spontaneous magnetization），使 $\boldsymbol{m}\neq0$ 的最高温度称为**临界温度**（critical temperature）。矢量 $\boldsymbol{m}$ 是描述有序态（$\boldsymbol{m}\neq0$）与无序态（$\boldsymbol{m}=0$）之间相变的**序参量**（order parameter）。系统在绕磁化轴 $\boldsymbol{m}$ 的 $\mathrm{SO}(2)$ 转动下仍然对称。

相变背后的机制是什么？自由能是 $\sym{Ffree}{F}=\langle \sym{Ham}{H}\rangle-T\sym{Sent}{S}$，$\sym{Sent}{S}$ 是熵。低温时 $\sym{Ffree}{F}$ 中的 $T\sym{Sent}{S}$ 项可以忽略，$\sym{Ffree}{F}$ 的极小靠使 $\langle \sym{Ham}{H}\rangle$ 极小达到——所有 $\boldsymbol{S}_i$ 指向同一方向。高温时熵项主导 $\sym{Ffree}{F}$，$\sym{Ffree}{F}$ 的极小靠使 $\sym{Sent}{S}$ 极大达到——$\boldsymbol{S}_i$ 的方向完全随机。

若系统温度均匀，$|\boldsymbol{m}|$ 与位置无关，$\boldsymbol{m}$ 只由方向确定。在基态中 $\boldsymbol{m}$ 本身也应与位置无关。用极坐标 $(\theta,\phi)$ 表示 $\boldsymbol{m}$ 的方向很方便：$\boldsymbol{m}$ 与球面 $S^2$ 上的点一一对应。设 $\boldsymbol{m}$ 随位置变化：$\boldsymbol{m}=\boldsymbol{m}(\boldsymbol{x})$。空间每一点 $\boldsymbol{x}$ 都被指定 $S^2$ 上的一点 $(\theta,\phi)$，得到从空间到 $S^2$ 的映射 $(\theta(\boldsymbol{x}),\phi(\boldsymbol{x}))$。

除了基态（以及由基态附近的小振荡——**自旋波**——描述的激发态）之外，系统还可能存在各种**不能**由基态经小扰动得到的激发态。哪些激发可能存在，取决于空间维数与序参量。例如若空间是二维的，Heisenberg 铁磁体可能有一种称为 **Belavin–Polyakov 单极子**的激发（\figref{4.20}，Belavin and Polyakov 1975）。注意 $\boldsymbol{m}$ 在远处趋于常矢量（这里是 $\hat{\boldsymbol{z}}$），所以能量不发散。这一条件保证了激发的稳定性：在远处 $\boldsymbol{m}$ 保持不变的前提下，不可能把这个位形连续地变形为均匀位形。这类稳定性由拓扑论证保证的激发称为**拓扑激发**（topological excitations）。注意场 $\boldsymbol{m}(\boldsymbol{x})$ 定义了映射 $\boldsymbol{m}:S^2\to S^2$（平面加上无穷远点就是 $S^2$），因而按同伦群 $\pi_2(S^2)=\mathbb{Z}$ 分类。`}</Tx>
        <Figure n="4.20" caption={R`Belavin–Polyakov 单极子的示意图。$|\boldsymbol{x}|\to\infty$ 时矢量 $\boldsymbol{m}$ 趋于 $\hat{\boldsymbol{z}}$。交互版：选择拓扑荷，实时数值积分 $\frac1{4\pi}\int\boldsymbol{m}\cdot(\partial_x\boldsymbol{m}\times\partial_y\boldsymbol{m})$，验证它等于 $\pi_2(S^2)$ 中的类（习题 4.11）。`} width="60%" illustration={<SkyrmionLab />} />
      </Sub>

      <Sub n="4.8.2" title={R`Superfluid $^4$He and superconductors`} zh={R`超流 $^4$He 与超导体`}>
        <Tx>{R`在 Bogoliubov 理论中，超流 $^4$He 的序参量是期待值`}</Tx>
        <Eq n="4.59" keyEq title={R`$^4$He 的序参量`} say={R`场算符的期待值是一个复数场：模长 $\Delta_0$ 由凝聚能决定，相位 $\sym{alphaph}{\alpha}(\boldsymbol{x})$ 才是自由的——它取值于圆周 $\mathrm{U}(1)$。`}>{R`\langle\phi(\boldsymbol{x})\rangle=\Psi(\boldsymbol{x})=\Delta_0(\boldsymbol{x})e^{i\sym{alphaph}{\alpha}(\boldsymbol{x})}`}</Eq>
        <Tx>{R`其中 $\phi(\boldsymbol{x})$ 是场算符。（原书左边写 $\Psi(\boldsymbol{r})$、右边写 $\boldsymbol{x}$，是同一个位置变量，本站统一为 $\boldsymbol{x}$。）在算符形式中，

$$\phi(\boldsymbol{x})\sim(\text{产生算符})+(\text{湮灭算符}),$$

由此可知若 $\Psi(\boldsymbol{x})\neq0$，粒子数不守恒。这与整体规范对称性的自发破缺有关。$^4$He 的哈密顿量是`}</Tx>
        <FormulaMap n="4.60" say={R`玻色子场的动能（减去化学势）加上两体相互作用：只出现 $\phi^\dagger\phi$ 的组合。`} tree={FM_4_60} start="rhox" />
        <Tx>{R`显然 $\sym{Ham}{H}$ 在整体规范变换`}</Tx>
        <Eq n="4.61" say={R`把所有点的场乘上同一个相位：哈密顿量中 $\phi$ 与 $\phi^\dagger$ 成对出现，相位相消。`}>{R`\phi(\boldsymbol{x})\to e^{i\chi}\phi(\boldsymbol{x})`}</Eq>
        <Tx>{R`下不变。然而序参量的变换是`}</Tx>
        <Eq n="4.62" say="序参量本身随相位变换而改变——基态选定了一个相位，破缺了哈密顿量的 U(1) 对称性。">{R`\Psi(\boldsymbol{x})\to e^{i\chi}\Psi(\boldsymbol{x})`}</Eq>
        <Tx>{R`因而不遵守哈密顿量的对称性。（原书右边误印为 $\Phi(\boldsymbol{x})$。）描述 $^4$He 的唯象自由能由两部分组成。主要部分是**凝聚能**（condensation energy）`}</Tx>
        <Eq n="4.63a" title="凝聚能（Landau 型）" say={R`$\sym{alphaGL}{\alpha}$ 在临界温度变号：高于 $T_{\rm c}$ 时极小在 $\Psi=0$，低于 $T_{\rm c}$ 时极小在一个圆周 $|\Psi|=\Delta_0$ 上——序参量空间就是这个圆周。`}>{R`\mathcal{F}_0\equiv\frac{\sym{alphaGL}{\alpha}}{2!}|\Psi(\boldsymbol{x})|^2+\frac{\sym{betaGL}{\beta}}{4!}|\Psi(\boldsymbol{x})|^4`}</Eq>
        <Tx>{R`其中 $\sym{alphaGL}{\alpha}\sim\sym{alphaGL}{\alpha}_0(T-T_{\rm c})$ 在临界温度变号（$^4$He 的 $\lambda$ 点 $T_{\rm c}\approx2.17\ \mathrm{K}$）。\figref{4.21} 画出了 $T>T_{\rm c}$ 与 $T<T_{\rm c}$ 时的 $\mathcal{F}_0$。若 $T>T_{\rm c}$，$\mathcal{F}_0$ 的极小在 $\Psi(\boldsymbol{x})=0$；若 $T<T_{\rm c}$，极小在 $|\Psi|=\Delta_0\equiv[-(6\sym{alphaGL}{\alpha}/\sym{betaGL}{\beta})]^{1/2}$。`}</Tx>
        <Derivation title={R`极小值位置 $\Delta_0$`} steps={[
          { tex: R`\frac{\dd\mathcal{F}_0}{\dd|\Psi|}=\sym{alphaGL}{\alpha}|\Psi|+\frac{\sym{betaGL}{\beta}}{6}|\Psi|^3=0`, why: R`$\frac{\dd}{\dd x}\big(\frac{\sym{alphaGL}{\alpha}}{2}x^2+\frac{\sym{betaGL}{\beta}}{24}x^4\big)$，$x=|\Psi|$。` },
          { tex: R`|\Psi|^2=-\frac{6\sym{alphaGL}{\alpha}}{\sym{betaGL}{\beta}}\quad(\sym{alphaGL}{\alpha}<0,\ \sym{betaGL}{\beta}>0)`, why: R`$T<T_{\rm c}$ 时才有非零实根；此时 $\Psi=0$ 是极大。` },
        ]} result={R`$\Delta_0=[-(6\sym{alphaGL}{\alpha}/\sym{betaGL}{\beta})]^{1/2}$；极小构成圆周 $\{\Delta_0e^{i\sym{alphaph}{\alpha}}\}\cong S^1$`} />
        <Erratum kind="erratum" loc="p.175，式 (4.63a) 之后" title={R`勘误：$^4$He 的临界温度约为 $2.17\ \mathrm{K}$，不是"$\sim4\ \mathrm{K}$"`}>{R`原书写"$T\sim4\ \mathrm{K}$"。$^4$He 的超流转变（$\lambda$ 点）在饱和蒸气压下为 $T_\lambda\approx2.17\ \mathrm{K}$；$4.2\ \mathrm{K}$ 是 $^4$He 在一个大气压下的沸点。`}</Erratum>
        <Figure n="4.21" illustration={<TextureRedraw n="4.21"/>} caption={R`$T>T_{\rm c}$ 时自由能在 $|\Psi|=0$ 处取极小，$T<T_{\rm c}$ 时在 $|\Psi|=\Delta_0$ 处取极小。`} width="40%" />
        <Tx>{R`若 $\Psi(\boldsymbol{x})$ 依赖于 $\boldsymbol{x}$，还有一项称为**梯度能**（gradient energy）的附加贡献`}</Tx>
        <Eq n="4.63b" say="序参量在空间中变化要付出代价：梯度能正比于序参量梯度的模方。">{R`\mathcal{F}_{\rm grad}\equiv\tfrac12\sym{Kgrad}{K}\,\overline{\nabla\Psi(\boldsymbol{x})}\cdot\nabla\Psi(\boldsymbol{x})`}</Eq>
        <Tx>{R`$\sym{Kgrad}{K}$ 是正常数。若 $\Psi(\boldsymbol{x})$ 的空间变化足够缓和，可以假定 $\Delta_0$ 为常数（**London 极限**）。

在超导体的 BCS 理论中，序参量是（Tsuneto 1982）`}</Tx>
        <Eq n="4.64" say={R`超导序参量是两个电子湮灭算符乘积的期待值：Cooper 对的“波函数”，带两个自旋指标。`}>{R`\Psi_{\alpha\beta}\equiv\langle\psi_\alpha(\boldsymbol{x})\psi_\beta(\boldsymbol{x})\rangle`}</Eq>
        <Tx>{R`$\psi_\alpha(\boldsymbol{x})$ 是自旋 $\alpha=(\uparrow,\downarrow)$ 的（非相对论）电子场算符。但要注意 \eqref{4.64} 不是自旋代数的不可约表示。为看清这一点，考察 $\Psi_{\alpha\beta}$ 在自旋转动下的行为。绕轴 $\boldsymbol{n}$ 转无穷小角 $\theta$ 的矩阵表示为

$$\sym{Rrot}{R}=\sym{Id}{I}_2+i\frac{\theta}{2}n^\mu\sigma_\mu,$$

$\sigma_\mu$ 是 Pauli 矩阵。由于 $\psi_\alpha$ 按 $\psi_\alpha\to \sym{Rrot}{R}_\alpha{}^\beta\psi_\beta$ 变换，`}</Tx>
        <Derivation title={R`$\Psi\to\sym{Rrot}{R}\Psi\sym{Rrot}{R}^{\mathrm t}$ 的分解（本站重写，见下面的注记）`} steps={[
          { tex: R`\Psi_{\alpha\beta}\to \sym{Rrot}{R}_\alpha{}^{\alpha'}\Psi_{\alpha'\beta'}\sym{Rrot}{R}_\beta{}^{\beta'}=(\sym{Rrot}{R}\cdot\Psi\cdot \sym{Rrot}{R}^{\mathrm t})_{\alpha\beta}`, why: "两个指标各自按旋量变换。" },
          { tex: R`\text{写 }\Psi=\Phi\,(i\sigma_2),\quad \sigma_\mu^{\mathrm t}=-\sigma_2\sigma_\mu\sigma_2\ \Rightarrow\ (i\sigma_2)\,\sym{Rrot}{R}^{\mathrm t}=\sym{Rrot}{R}^{-1}(i\sigma_2)+O(\theta^2)`, why: R`$i\sigma_2(\sym{Id}{I}_2+\frac{i\theta}{2}n^\mu\sigma_\mu^{\mathrm t})=(\sym{Id}{I}_2-\frac{i\theta}{2}n^\mu\sigma_\mu)i\sigma_2$。` },
          { tex: R`\sym{Rrot}{R}\Psi \sym{Rrot}{R}^{\mathrm t}=\Big[\Phi+i\frac{\theta}{2}n^\mu[\sigma_\mu,\Phi]\Big](i\sigma_2)+O(\theta^2)`, why: R`$\Phi$ 按伴随表示变换：$\Phi\to \sym{Rrot}{R}\Phi \sym{Rrot}{R}^{-1}$。` },
          { tex: R`\Phi=\Delta\,\sym{Id}{I}_2:\quad[\sigma_\mu,\Phi]=0`, why: "单位矩阵部分不变：自旋单态。" },
          { tex: R`\Phi=\Delta^\nu\sigma_\nu:\quad i\frac{\theta}{2}n^\mu\Delta^\nu[\sigma_\mu,\sigma_\nu]=-\theta\,\varepsilon^{\mu\nu\lambda}n_\mu\Delta_\nu\sigma_\lambda`, why: R`$[\sigma_\mu,\sigma_\nu]=2i\varepsilon^{\mu\nu\lambda}\sigma_\lambda$。$\Delta^\mu$ 像矢量一样转动：自旋三重态。` },
        ]} />
        <Tx>{R`设 $\Psi_{\alpha\beta}\propto i(\sigma_2)_{\alpha\beta}$，则 $\Psi$ 在这个转动下不变，因而表示**自旋单态**配对。我们写`}</Tx>
        <Eq n="4.65a" title="自旋单态（常规超导）" say={R`常规超导体的序参量是一个复标量乘以单态自旋结构 $i\sigma_2$：和 $^4$He 一样，只剩一个 $\mathrm{U}(1)$ 相位。`}>{R`\Psi_{\alpha\beta}(\boldsymbol{x})=\Delta(\boldsymbol{x})(i\sigma_2)_{\alpha\beta}=\Delta_0(\boldsymbol{x})e^{i\varphi(\boldsymbol{x})}(i\sigma_2)_{\alpha\beta}.`}</Eq>
        <Tx>{R`若改取`}</Tx>
        <Eq n="4.65b" say={R`自旋三重态配对：序参量由自旋空间中的一个（复）矢量 $\Delta^\mu$ 描述，超流 $^3$He 就是这种情形。`}>{R`\Psi_{\alpha\beta}(\boldsymbol{x})=\Delta^\mu(\boldsymbol{x})\,i(\sigma_\mu\cdot\sigma_2)_{\alpha\beta}`}</Eq>
        <Tx>{R`则有 $\Psi_{\alpha\beta}\to[\Delta^\mu+\delta\,\varepsilon^{\mu\nu\lambda}n_\nu\Delta_\lambda](i\sigma_\mu\cdot\sigma_2)_{\alpha\beta}$（$\delta$ 为无穷小转角，符号取决于转动方向的约定）。这表明 $\Delta^\mu$ 是自旋空间中的矢量，因而 \eqref{4.65b} 表示**自旋三重态**配对。`}</Tx>
        <Erratum kind="note" loc="pp.176–177，自旋转动下的中间式" title={R`注记：原书中间一步的记号混乱`}>{R`原书中间式写作 $\big[\Psi+i\frac{\delta}{2}\boldsymbol{n}(\boldsymbol{\sigma}\Psi\sigma_2-\Psi\sigma_2\boldsymbol{\sigma})\big]_{\alpha\beta}$：转角前面记作 $\theta$、这里又记作 $\delta$；$\sigma_2$ 的位置也与 $\sigma_\mu^{\mathrm t}=-\sigma_2\sigma_\mu\sigma_2$ 不一致（正确的一阶项是 $i\frac{\theta}{2}n^\mu(\sigma_\mu\Psi-\Psi\sigma_2\sigma_\mu\sigma_2)$）。上面的推导把 $\Psi$ 写成 $\Phi\,(i\sigma_2)$，一阶项化为对易子 $[\sigma_\mu,\Phi]$，结论与原书相同：$i\sigma_2$ 部分不变（单态），$\sigma_\mu i\sigma_2$ 部分按矢量转动（三重态）。对三重态，用原书的 $\sym{Rrot}{R}=\sym{Id}{I}_2+i\frac\theta2n^\mu\sigma_\mu$ 算出的是 $\Delta\to\Delta-\theta\,\boldsymbol{n}\times\Delta$（即转 $-\theta$）；原书写 $+\delta\,\boldsymbol{n}\times\Delta$，差别只在转动方向的约定。`}</Erratum>
        <Tx>{R`常规超导体的序参量形如 \eqref{4.65a}，我们暂时只分析这种情形。在 \eqref{4.65a} 中，$\Delta(\boldsymbol{x})$ 与超流 $^4$He 的 $\Psi(\boldsymbol{x})$ 形式相同，自由能仍由 \eqref{4.63a}、\eqref{4.63b} 给出。这种相似性归功于 **Cooper 对**。在超流态中，宏观数目的 $^4$He 原子占据基态（Bose–Einstein 凝聚），由于量子相干性，它们表现得像一个巨大的分子。在这个状态中产生元激发需要有限的能量，除非供给这一临界能量，流动不会衰减。电子是费米子，初看起来不会发生 Bose–Einstein 凝聚。关键在于 Cooper 对：通过交换声子，一对电子感受到一个刚好压过 Coulomb 排斥的吸引力。这个微小的吸引力使电子（在动量空间中）结成服从 Bose 统计的对。这些对凝聚，形成电荷为 $2e$ 的 Cooper 对超流态。

电磁场通过最小耦合与系统相耦合：`}</Tx>
        <Eq n="4.66" say={R`对超导体，梯度要换成规范协变导数；电荷是 $2e$，因为凝聚的是电子对。`}>{R`\mathcal{F}_{\rm grad}=\tfrac12\sym{Kgrad}{K}\,\big|(\partial_\mu-i2eA_\mu)\Delta(\boldsymbol{x})\big|^2.`}</Eq>
        <Tx>{R`（用 $2e$ 是因为 Cooper 对带电荷 $2e$。）按在外加磁场中的行为，超导体大致分为两类。**第 I 类**超导体在强磁场中形成正常区与超导区共存的中间态。**第 II 类**超导体形成涡旋格子（**Abrikosov 格子**），把磁场约束在涡旋芯内，其余区域保持超导态。在圆筒中旋转的超流 $^4$He 中也观察到了类似的涡旋格子。`}</Tx>
      </Sub>

      <Sub n="4.8.3" title="General consideration" zh="一般考虑：缺陷的同伦分类">
        <p className="muted">本小节概念：<C id="order_parameter" /> · <C id="defect_class" /></p>
        <Tx>{R`接下来两节研究同伦群在有序介质缺陷分类中的应用。本节的分析依据 Toulouse and Kléman (1976)、Mermin (1979) 与 Mineev (1980)。

如前两小节所见，凝聚态系统发生相变时，系统的对称性降低，这一降低由序参量描述。为确定起见，考虑超导体的三维介质，序参量形如 $\psi(\boldsymbol{x})=\Delta_0(\boldsymbol{x})e^{i\varphi(\boldsymbol{x})}$。考虑均匀外界条件（温度、压强等）下的均匀系统。振幅 $\Delta_0$ 由凝聚自由能的极小唯一确定。注意仍剩下大量自由度：$\psi$ 可以取圆周 $S^1\cong\mathrm{U}(1)$ 中由相位 $e^{i\varphi}$ 决定的任何值。这样，均匀系统的取值落在某个区域 $M$ 中，$M$ 称为**序参量空间**（order parameter space）。超导体 $M=\mathrm{U}(1)$；Heisenberg 自旋系统 $M=S^2$；向列相液晶 $M=\sym{RP}{\RP^2}$；超流 $^3$He-A 则 $M=S^2\times\mathrm{SO}(3)$（§4.9–4.10）。

若系统处于非均匀态，梯度自由能不可忽略，$\psi$ 可能不在 $M$ 中。但若序参量变化的特征尺度远大于**相干长度**，仍可假定序参量取值于 $M$，只是这时它的值是位置的函数。在这种情况下，介质中可能存在序参量没有唯一定义的点、线或面，称为**缺陷**（defects）。按维数分为**点缺陷**（**单极子**）、**线缺陷**（**涡旋**）与**面缺陷**（**畴壁**）。这些缺陷由同伦群分类。

用更数学的语言：设 $X$ 是充满所考虑介质的空间。序参量是经典场 $\psi(x)$，也可以看成**映射** $\psi:X\to M$。设介质中有一个缺陷，为具体起见，考虑超导体三维介质中的一条线缺陷。想象一个包围线缺陷的圆周 $S^1$。若 $S^1$ 上每一处都远离线缺陷（远大于相干长度 $\xi$），可以假定沿 $S^1$ 的序参量取值于序参量空间 $M=\mathrm{U}(1)$（\figref{4.22}）。基本群就是这样进入问题的：我们讨论拓扑空间 $\mathrm{U}(1)$ 中的圈。映射 $S^1\to\mathrm{U}(1)$ 按同伦类分类。取一点 $r_0\in S^1$，要求它映到 $x_0\in M$。注意 $\pi_1(\mathrm{U}(1),x_0)=\mathbb{Z}$，就可以给线缺陷指定一个整数。这个整数称为**卷绕数**（winding number），因为它数的是 $S^1$ 的像绕空间 $\mathrm{U}(1)$ 几圈。`}</Tx>
        <Figure n="4.22" illustration={<TextureRedraw n="4.22"/>} caption={R`包围线缺陷（涡旋）的圆周 $S^1$ 被映到 $\mathrm{U}(1)=S^1$。这个映射由基本群 $\pi_1(\mathrm{U}(1))$ 分类。`} width="80%" />
        <Tx>{R`若两条线缺陷的卷绕数相同，一条可以连续地变形为另一条。若两条线缺陷 $A$ 与 $B$ 合并，新线缺陷属于 $A$、$B$ 合并前所属同伦类的乘积类。由于 $\mathbb{Z}$ 中的群运算是加法，新卷绕数是原卷绕数之和。序参量的均匀分布对应常值映射 $\psi(x)=x_0\in M$，属于单位元 $0\in\mathbb{Z}$。若两条卷绕数相反的线缺陷合并，新线缺陷可以连续地变形为无缺陷的位形。`}</Tx>
        <Box kind="physics" title="磁通量子化">{R`在超导体中，远离涡旋芯处超流的规范协变梯度为零，$\nabla\varphi=2e\boldsymbol{A}$（取 $\hbar=1$）。沿包围涡旋的圆周积分：$2e\oint\boldsymbol{A}\cdot\dd\boldsymbol{l}=\oint\nabla\varphi\cdot\dd\boldsymbol{l}=2\pi n$，即穿过涡旋的磁通是 $\Phi_0=\pi/e=h/2e$ 的整数倍。整数 $n$ 正是 $\pi_1(\mathrm{U}(1))=\mathbb{Z}$ 中的卷绕数——**磁通量子化是基本群的直接物理体现**。`}</Box>
        <Tx>{R`其他同伦群呢？先考虑缺陷的维数与**包围**它的球面 $S^n$。例如三维介质中的点缺陷可以被 $S^2$ 包围，缺陷由 $\pi_2(M,x_0)$ 分类。若 $M$ 有多个分支，$\pi_0(M)$ 非平凡。考虑三维 Ising 模型，$M=\{\downarrow\}\cup\{\uparrow\}$。这时存在序参量没有定义的畴壁：例如 $x<0$ 处 $\boldsymbol{S}=\uparrow$、$x>0$ 处 $\boldsymbol{S}=\downarrow$，在 $x=0$ 的 $yz$ 平面上就有一个畴壁。一般地，$d$ 维介质中的 $m$ 维缺陷由同伦群 $\pi_n(M,x_0)$ 分类，其中`}</Tx>
        <Eq n="4.67" keyEq title="缺陷的同伦分类" say={R`在 $d$ 维介质中，包围一个 $\sym{mdef}{m}$ 维缺陷的最小球面是 $n=d-\sym{mdef}{m}-1$ 维的；缺陷的拓扑荷就是这个球面上序参量的同伦类。`}>{R`n=d-\sym{mdef}{m}-1.`}</Eq>
        <Tx>{R`Ising 模型 $d=3$、$\sym{mdef}{m}=2$，故 $n=0$。`}</Tx>
        <Table head={[R`$d$`, R`缺陷维数 $m$`, R`包围球面 $S^n$`, "分类群", "例子"]} rows={[
          ["3", "2（面：畴壁）", R`$S^0$（两点）`, R`$\pi_0(M)$`, R`Ising：$\pi_0(\{\uparrow,\downarrow\})$ 有两个元素`],
          ["3", "1（线：涡旋、向错）", R`$S^1$`, R`$\pi_1(M)$`, R`超导 $\mathbb{Z}$；向列相 $\mathbb{Z}_2$；$^3$He-A 的 disgyration $\mathbb{Z}_2$`],
          ["3", "0（点：单极子）", R`$S^2$`, R`$\pi_2(M)$`, R`向列相刺猬 $\pi_2(\sym{RP}{\RP^2})=\mathbb{Z}$`],
          ["3", R`$-1$（无奇点织构）`, R`$S^3$（整个紧化空间）`, R`$\pi_3(M)$`, R`Shankar 单极子 $\pi_3(\mathrm{SO}(3))=\mathbb{Z}$`],
          ["2", "0（点）", R`$S^1$`, R`$\pi_1(M)$`, R`薄膜中的涡旋（交互图 2）`],
          ["2", R`$-1$（无奇点织构）`, R`$S^2$（紧化平面）`, R`$\pi_2(M)$`, R`Belavin–Polyakov 斯格明子 $\pi_2(S^2)=\mathbb{Z}$`],
        ]} caption={R`\eqref{4.67} 的应用一览。$m=-1$ 的行是本站补充的读法：没有奇点、在无穷远处均匀的位形，把整个空间紧化成 $S^d$，由 $\pi_d(M)$ 分类（§4.9.4、§4.10.3、习题 4.11）。`} />
      </Sub>
    </Sec>);
}
