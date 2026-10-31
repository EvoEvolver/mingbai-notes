// §13.6 奇数维空间中的宇称反常 —— 式 (13.106)–(13.119)；交互图 3（EtaLab）
import { Sec, Sub, Tx, Eq, Box, Derivation, Stmt, C } from "@kit";
import { EtaLab } from "./_ch13_demos.jsx";
import { DN, PD, D4, ASL, TR, CH, IND, MR, PV, FG } from "./_ch13_tex.js";

const R = String.raw;
const NN = R`\mathcal{N}`;
const DH = R`\mathrm{i}\hat D`;

export function Sec136() {
  return (
    <Sec n="13.6" title="The parity anomaly in odd-dimensional spaces" zh="奇数维空间中的宇称反常"
      gist={R`奇数维没有复旋量表示，因而没有规范反常，但宇称可能在量子化中破缺 → Pauli–Villars 正规化 $\mathrm{e}^{-W}=\prod\lambda_i/(\lambda_i+\mathrm{i}M)$（\eqref{13.107}）；宇称使本征值变号，$W[\mathcal{A}^{\rm P}]=\overline{W}$（\eqref{13.108}）→ 宇称破缺部分 $=2\mathrm{i}\,\mathrm{Im}\,W$，$\mathrm{Im}\,W=\frac\pi2\eta$（\eqref{13.110}–\eqref{13.111}）→ 维数阶梯：四维阿贝尔反常的指标 $\mathcal{N}$（\eqref{13.114}）= 三维 Dirac 算子的谱流（APS，\eqref{13.119}）= 二维非阿贝尔反常的相位卷绕数（\eqref{13.115a}）。`}
      why={R`前面所有讨论都在偶数维。奇数维中反常以另一种面貌出现：不是流不守恒，而是**谱的不对称性**（$\eta$ 不变量）。它与偶数维的反常通过 Atiyah–Patodi–Singer 定理相连，于是本章三类反常归结为同一个拓扑整数的三种读法。`}
      gives={["13.107", "13.109", "13.110", "13.111", "13.114", "13.117", "13.119"]}>
      <p className="muted">本节概念：<C id="parity_anomaly" /> · <C id="ladder" /></p>
      <Tx>{R`到目前为止我们一直在偶数维空间中工作。原因之一是 $\mathrm{SO}(2l+1)$ 有实或赝实的旋量表示，但没有**复**表示，因此预期不会有规范反常（§13.3 的 $d_{\alpha\beta\gamma}$ 对实表示为零）。但是可以证明，奇数维空间中的规范理论有另一种反常，称为**宇称反常**（parity anomaly）：经典作用量的宇称对称性在量子化之后不能保持。应当注意，Alvarez-Gaumé 等 (1985) 指出，$2l+1$ 维的宇称反常与 $2l+2$ 维的阿贝尔反常相关。`}</Tx>

      <Sub n="13.6.1" title="The parity anomaly" zh="宇称反常">
        <Tx>{R`设 $M$ 是 $(2l+1)$ 维 Riemann 流形。我们把一个维度与其余维度区分开：假定 $M$ 具有 $\R\times\mathcal{M}$ 或 $S^1\times\mathcal{M}$ 的形式，$\mathcal{M}$ 是无边界的 $2l$ 维紧流形。$\R$ 或 $S^1$ 的坐标记为 $t$，$\mathcal{M}$ 的坐标记为 $x$。指标 0 表示 $t$ 方向的分量，$\mu$ 表示 $x$ 方向的分量。例如 $\gamma$ 矩阵的分量是 $\{\gamma^0,\gamma^\mu\ (1\le\mu\le2l)\}$。

定义"宇称"变换 P：

$$\begin{aligned}\mathcal{A}_0(t,x)&\to\mathcal{A}^{\rm P}_0(t,x)=-\mathcal{A}_0(-t,x)\\ \mathcal{A}_\mu(t,x)&\to\mathcal{A}^{\rm P}_\mu(t,x)=\mathcal{A}_\mu(-t,x)\\ \psi(t,x)&\to\psi^{\rm P}(t,x)=\mathrm{i}\gamma_0\psi(-t,x)\\ \bar\psi(t,x)&\to\bar\psi^{\rm P}(t,x)=\mathrm{i}\bar\psi(-t,x)\gamma_0.\end{aligned}$$

（奇数维中"所有坐标反号"是转动的一部分（行列式 $+1$），不是宇称；真正的宇称是反射一个坐标，这里选 $t$。）经典作用量在宇称变换下不变：

$$\begin{aligned}\int\dd t\,\dd x\,\bar\psi\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}\psi\to&-\int\dd t\,\dd x\,\bar\psi(-t,x)\gamma^0\mathrm{i}[\gamma^0(\partial_0-\mathcal{A}_0(-t,x))+\gamma^\mu(\partial_\mu+\mathcal{A}_\mu(-t,x))]\gamma^0\psi(-t,x)\\=&\int\dd t\,\dd x\,\bar\psi(t,x)\mathrm{i}[\gamma^0(\partial_0+\mathcal{A}_0(t,x))+\gamma^\mu(\partial_\mu+\mathcal{A}_\mu(t,x))]\psi(t,x)\end{aligned}$$

最后一行令 $t\to-t$（$\partial_0\to-\partial_0$，再用 $\gamma^0\gamma^\mu\gamma^0=-\gamma^\mu$、$\gamma^0\gamma^0\gamma^0=\gamma^0$ 把两侧的 $\gamma^0$ 移掉）。

**有效作用量是否保持这一不变性？**有效作用量由 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 本征值的正规化乘积给出。我们用 **Pauli–Villars 正规化**来规范这个乘积，即在原 Lagrange 量上加上`}</Tx>
        <Eq n="13.106" title="Pauli–Villars 正规化项" say={R`加入一个质量为 $M$ 的玻色型旋量"幽灵"场：它抵消高能模的发散，但其质量项在奇数维中本身就破坏宇称。`}>{R`\mathcal{L}_{\rm reg}\equiv\bar{${PV}}\mathrm{i}${DN}${PV}+\mathrm{i}${MR}\bar{${PV}}${PV}`}</Eq>
        <Tx>{R`Pauli–Villars 正规化子 $\chi$ 是服从**玻色**统计的旋量，并理解为取 $M\to\infty$ 的极限。正规化的行列式为`}</Tx>
        <Eq n="13.107" title="正规化的行列式" say={R`费米子贡献分子上的行列式，玻色型正规化场贡献分母上的行列式；比值逐个本征值收敛。`}>{R`\mathrm{e}^{-W[\mathcal{A}]}=\frac{\det\mathrm{i}${DN}}{\det(\mathrm{i}${DN}+\mathrm{i}${MR})}=\prod_i\frac{\lambda_i}{\lambda_i+\mathrm{i}${MR}}`}</Eq>
        <Tx>{R`这里用了 $\chi$ 是玻色子（玻色积分给出行列式的倒数）。$\lambda_i$ 是 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 的第 $i$ 个本征值，$\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}\psi_i=\lambda_i\psi_i$。在宇称变换下本征值变号：

$$\begin{aligned}&\mathrm{i}[\gamma^0(\partial_0-\mathcal{A}_0(-t,x))+\gamma^i(\partial_i+\mathcal{A}_i(-t,x))]\mathrm{i}\gamma^0\psi_i(-t,x)\\&\qquad=\mathrm{i}\gamma^0[\gamma^0(-\partial_\tau-\mathcal{A}_0(\tau,x))-\gamma^i(\partial_i+\mathcal{A}_i(\tau,x))]\mathrm{i}\psi(\tau,x)\\&\qquad=-\lambda_i\mathrm{i}\gamma^0\psi_i(\tau,x)\end{aligned}$$

其中 $\tau=-t$。即：若 $\psi_i$ 是 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}[\mathcal{A}]$ 本征值为 $\lambda_i$ 的本征函数，则 $\mathrm{i}\gamma^0\psi_i(-t,x)$ 是 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}[\mathcal{A}^{\rm P}]$ 本征值为 $-\lambda_i$ 的本征函数：$\mathrm{Spec}\,\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}[\mathcal{A}^{\rm P}]=-\mathrm{Spec}\,\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}[\mathcal{A}]$。这说明有效作用量在宇称 P 下变为`}</Tx>
        <Eq n="13.108" say={R`宇称把每个本征值变号，正规化因子 $\lambda/(\lambda+\mathrm{i}M)$ 随之变成它的复共轭：宇称作用在有效作用量上等于取复共轭。`}>{R`W[\mathcal{A}]\to W[\mathcal{A}^{\rm P}]=-\ln\prod\frac{-\lambda_i}{-\lambda_i+\mathrm{i}${MR}}=\overline{\sym{W}{W[\mathcal{A}]}}`}</Eq>
        <Tx>{R`其中横线表示复共轭（$\frac{-\lambda}{-\lambda+\mathrm{i}M}=\frac{\lambda}{\lambda-\mathrm{i}M}=\nosym{\overline{\big(\frac{\lambda}{\lambda+\mathrm{i}M}\big)}}$，$\lambda$ 为实数）。\eqref{13.108} 表明 $W$ 的虚部就是破坏宇称的部分：`}</Tx>
        <Eq n="13.109" say={R`有效作用量与其宇称像之差 = 两倍虚部（乘 $\mathrm{i}$）：宇称守恒 ⇔ $\mathrm{Im}\,W=0$。`}>{R`W[\mathcal{A}]-W[\mathcal{A}^{\rm P}]=2\mathrm{i}\,\mathrm{Im}\,W[\mathcal{A}].`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{13.109} 漏了因子 $\mathrm{i}$（p.545）`}>{R`原书印作 $W[\mathcal{A}]-W[\mathcal{A}^{\rm P}]=2\,\mathrm{Im}\,W[\mathcal{A}]$。由 \eqref{13.108}，$W-W[\mathcal{A}^{\rm P}]=W-\overline W=2\mathrm{i}\,\mathrm{Im}\,W$（左边是纯虚数，右边原书写成实数）。本站已改正；"宇称破坏部分由 $\mathrm{Im}\,W$ 刻画"这一结论不变。`}</Box>
        <Tx>{R`$\mathrm{Im}\,W[\mathcal{A}]$ 由 §12.8 定义的 $\eta$ 不变量给出。事实上，`}</Tx>
        <Eq n="13.110" keyEq title={R`宇称反常 = $\eta$ 不变量`} say={R`每个本征值贡献一个角度 $\tan^{-1}(M/\lambda)$，$M\to\infty$ 时趋于 $\pm\frac\pi2$：虚部数的是"正本征值个数减负本征值个数"，即谱不对称性 $\eta$。`}>{R`\begin{aligned}\mathrm{Im}\,W[\mathcal{A}]&=\lim_{${MR}\to\infty}\mathrm{Im}\Big(-\sum_i\ln\frac{\lambda_i}{\lambda_i+\mathrm{i}${MR}}\Big)=\lim_{${MR}\to\infty}\sum_i\tan^{-1}(${MR}/\lambda_i)\\&=\frac\pi2\Big(\sum_{\lambda>0}1-\sum_{\lambda<0}1\Big)=\frac\pi2\eta.\end{aligned}`}</Eq>
        <Tx>{R`因此，Pauli–Villars 正规化子给出了 $\eta$ 不变量的一种正规化形式（未正规化的 $\sum_{\lambda>0}1-\sum_{\lambda<0}1$ 是"$\infty-\infty$"，$\tan^{-1}(M/\lambda)$ 起截断作用：$|\lambda|\gg M$ 的本征值贡献 $\approx M/\lambda$，正负配对后收敛）。最后得到`}</Tx>
        <Eq n="13.111" title={R`$\eta$ 不变量（$\zeta$ 正规化）`} say={R`宇称反常 = $\frac\pi2\times$（$\zeta$ 函数正规化的）谱不对称性；零模不计入。`}>{R`\mathrm{Im}\,W[\mathcal{A}]=\frac\pi2\eta=\frac\pi2\lim_{s\to0}\sum_i{}'\,\mathrm{sgn}\lambda_i|\lambda_i|^{-2s}`}</Eq>
        <Tx>{R`其中撇号表示略去零模。（两种正规化——Pauli–Villars 的 $\tan^{-1}(M/\lambda)$ 与 $\zeta$ 函数的 $|\lambda|^{-2s}$——在下面的例子中给出相同的极限；一般情形下二者相差局部项，即陈–Simons 型的抵消项。）`}</Tx>
        <EtaLab />
        <Stmt id="F:parity13" />
      </Sub>

      <Sub n="13.6.2" title="The dimensional ladder: 4–3–2" zh="维数阶梯：4–3–2">
        <Tx>{R`值得注意的是，宇称反常 \eqref{13.110} 与 $(2l+2)$ 维空间中的手征反常密切相关（Alvarez-Gaumé 等 1985）。按 Forte (1987)，我们来看**维数阶梯**：`}</Tx>
        <Eq n="13.112" title="维数阶梯" say={R`同一个拓扑整数在三个维度中的三种化身：四维的指标、三维的谱流、二维的相位卷绕。`}>{R`\begin{matrix}\text{四维阿贝尔反常}\\ \downarrow\\ \text{三维宇称反常}\\ \downarrow\\ \text{二维非阿贝尔反常}\end{matrix}`}</Eq>
        <Tx>{R`取 $M_4=S^2\times S^2$ 作为四维空间。阿贝尔反常由指标给出：`}</Tx>
        <Eq n="13.113" say={R`四维阿贝尔反常：正负手征零模数之差 = $\mathrm{ch}_2$ 的积分（中间一项见 \eqref{13.34} 的勘误）。`}>{R`${IND}\,\mathrm{i}${DN}_4=${NN}_+-${NN}_-=\frac{\mathrm{i}}2\int_{S^2\times S^2}\partial_\mu j^\mu_5=\int_{S^2\times S^2}${CH}_2(\mathbb{F}).`}</Eq>
        <Tx>{R`同前，$\mathcal{N}_+$（$\mathcal{N}_-$）是正（负）手征零模的个数。（原书中间一项写作 $\int\partial_\mu j^\mu_5$，因子 $\frac{\mathrm{i}}2$ 的改正见 §13.2 的勘误框。）设 $Q_3$ 是 $\mathrm{ch}_2(\mathbb{F})$ 的陈–Simons 形式，$\mathrm{ch}_2(\mathbb{F})=\dd Q_3(\mathbb{A},\mathbb{F})$。则 $\mathcal{N}\equiv\mathcal{N}_+-\mathcal{N}_-$ 为`}</Tx>
        <Eq n="13.114" title="四维指标 = 转移函数的卷绕数" say={R`第一个梯级：把 $S^2\times S^2$ 的一个 $S^2$ 分成两半球，指标变成赤道 $S^1\times S^2$ 上转移函数 $g$ 的卷绕数 $\frac1{24\pi^2}\int\Tr(g^{-1}\dd g)^3$。`}>{R`\begin{aligned}${NN}&=\int_{S^2\times S^2}${CH}_2(\mathbb{F})=\int_{U_{\rm N}\times S^2}\dd Q_3(\mathbb{A}_{\rm N},\mathbb{F}_{\rm N})+\int_{U_{\rm S}\times S^2}\dd Q_3(\mathbb{A}_{\rm S},\mathbb{F}_{\rm S})\\&=\int_{S^1\times S^2}[Q_3(\mathbb{A}_{\rm N},\mathbb{F}_{\rm N})-Q_3(\mathbb{A}_{\rm S},\mathbb{F}_{\rm S})]\\&=\frac1{24\pi^2}\int_{S^1\times S^2}${TR}(g^{-1}\dd g)^3\end{aligned}`}</Eq>
        <Tx>{R`其中 $g$ 是连接 $\mathbb{A}_{\rm N}$ 与 $\mathbb{A}_{\rm S}$ 的规范变换：$\mathbb{A}_{\rm N}=g^{-1}(\mathbb{A}_{\rm S}+\dd+\dd_\theta)g$。（最后一步用 \eqref{13.100} 取 $l=1$：$-(\frac{\mathrm{i}}{2\pi})^2\frac{1!}{3!}=\frac1{24\pi^2}$。）`}</Tx>
        <Box kind="warning" title={R`勘误：\eqref{13.114} 第二行多出的 $\dd$、\eqref{13.115b} 后多出的 $\mathrm{i}$（p.546）`}>{R`(1) 原书 \eqref{13.114} 第二行写作 $\int_{S^1\times S^2}[Q_3(\mathbb{A}_{\rm N},\mathbb{F}_{\rm N})-\dd Q_3(\mathbb{A}_{\rm S},\mathbb{F}_{\rm S})]$。用 Stokes 定理之后两项都应是 $Q_3$ 本身（与 \eqref{13.99} 相同），且 $\dd Q_3$ 是 4 形式，不能在 3 维的 $S^1\times S^2$ 上积分。(2) 原书在 \eqref{13.115b} 之后写 "$\mathrm{i}\hat D=\sym{psl}{\partial\hspace{-0.5em}/}+\sym{Asl}{\mathcal{A}\hspace{-0.611em}/}\mathcal{P}_+$"，与 \eqref{13.43} 的 $\mathrm{i}\hat D=\mathrm{i}\gamma^\mu(\partial_\mu+\mathcal{A}_\mu\mathcal{P}_+)$ 相比左边多了 $\mathrm{i}$，应为 $\hat D=\sym{psl}{\partial\hspace{-0.5em}/}+\sym{Asl}{\mathcal{A}\hspace{-0.611em}/}\mathcal{P}_+$。本站均已改正。`}</Box>
        <Tx>{R`上一节已经证明，$\mathcal{N}$ 也表示非阿贝尔反常：`}</Tx>
        <Eq n="13.115a" say={R`第三个梯级（已在 §13.5 证明）：同一个 $\mathcal{N}$ 是二维手征行列式沿规范变换圈的相位卷绕数。`}>{R`${NN}=\frac1{2\pi}\int_0^{2\pi}\dd\theta\frac{\partial w(\mathcal{A},\theta)}{\partial\theta}`}</Eq>
        <Tx>{R`其中 $w$ 由下式定义：`}</Tx>
        <Eq n="13.115b" say={R`相位 $w$ 的定义：规范变换后的手征行列式 = 原行列式乘以 $\mathrm{e}^{\mathrm{i}w}$。`}>{R`\det${DH}(\mathcal{A}^{g(\theta)})=\mathrm{e}^{\mathrm{i}w(\mathcal{A},\theta)}\det${DH}(\mathcal{A}).`}</Eq>
        <Tx>{R`这里 $\mathcal{A}$ 是参考规范势，$\mathcal{A}^{g(\theta)}=g^{-1}(x,\theta)(\mathcal{A}+\dd)g(x,\theta)$，$\hat D=${PD}+${ASL}\mathcal{P}_+$。

**中间的梯级：谱流。**接下来证明 $\mathcal{N}$ 也与三维空间中的宇称反常相关。设 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_3$ 是三维 Dirac 算子，定义四维 Dirac 算子`}</Tx>
        <Eq n="13.116" say={R`用三维算子与一个"时间"方向搭出四维 Dirac 算子：$\sigma_1,\sigma_2$ 反对易，使 $(\mathrm{i}\sym{D4}{D\hspace{-0.639em}/}_4)^2=-\partial_t^2+(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_3)^2+\cdots$；它的零模对应三维谱沿 $t$ 的流动。`}>{R`\mathrm{i}${D4}_4[\mathcal{A}]\equiv\mathrm{i}\sigma_1\otimes I\frac{\partial}{\partial t}+\sigma_2\otimes\mathrm{i}${DN}_3[\mathcal{A}_t]`}</Eq>
        <Tx>{R`其中 $\mathcal{A}_t$ 是在 $\mathcal{A}_0=\mathcal{A}_{t=0}$ 与 $\mathcal{A}_1=\mathcal{A}_{t=1}$ 之间插值的单参数规范势族。Atiyah–Patodi–Singer 指标定理（§12.8）为`}</Tx>
        <Eq n="13.117" title="APS 指标定理" say={R`带边流形上的指标 = 体积分（陈特征）+ 两端 $\eta$ 不变量之差的一半：$\eta$ 是边界对指标的修正。`}>{R`${IND}\,\mathrm{i}${D4}_4=-\int_{S^2\times S^1\times I}${CH}_2(\mathcal{F})+\tfrac12[\eta(t=1)-\eta(t=0)]`}</Eq>
        <Tx>{R`这里注意到 Dirac 亏格 $\hat A$ 在 $S^2\times S^1\times I$ 上平凡。设 $\mathcal{A}_0$ 与 $\mathcal{A}_1$ 由规范变换相联系：`}</Tx>
        <Eq n="13.118a" say={R`两端的三维规范势规范等价。`}>{R`\mathcal{A}_1=g^{-1}(\mathcal{A}_0+\dd)g`}</Eq>
        <Tx>{R`并考虑插值规范势`}</Tx>
        <Eq n="13.118b" say={R`线性插值：中间的 $\mathcal{A}_t$ 一般不与两端规范等价，三维谱可以沿 $t$ 流动。`}>{R`\mathcal{A}_t\equiv t\mathcal{A}_1+(1-t)\mathcal{A}_0.`}</Eq>
        <Tx>{R`由于 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_3$ 的谱规范不变，特别地 $\mathrm{Spec}\,\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_3(\mathcal{A}_0)=\mathrm{Spec}\,\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_3(\mathcal{A}_1)$，$\eta$ 不变量也规范不变（注意奇数维空间中没有规范反常）。于是 $\eta(t=0)=\eta(t=1)$，APS 指标定理 \eqref{13.117} 给出`}</Tx>
        <Eq n="13.119" keyEq title="谱流 = 𝒩" say={R`两端的谱完全相同，但沿途有 $\mathcal{N}$ 个本征值从负穿到正（净计数）：三维 Dirac 算子的谱流就是四维指标、也是转移函数 $g$ 的卷绕数。`}>{R`\begin{aligned}\text{spectral flow}&=${IND}\,\mathrm{i}${D4}_4(\mathcal{A}_t)\\&=\int_{S^2\times S^2}${CH}_2(\mathcal{F})=\int_{S^1\times S^2}[Q_3(\mathcal{A}_1,\mathcal{F}_1)-Q_3(\mathcal{A}_0,\mathcal{F}_0)]\\&=\int_{S^1\times S^2}Q_3(g^{-1}\dd g,0)=${NN}.\end{aligned}`}</Eq>
        <Box kind="warning" title={R`存疑：\eqref{13.117} 与 \eqref{13.119} 的符号与积分区域（pp.546–547）`}>{R`(1) 若 \eqref{13.117} 中 $\eta(1)=\eta(0)$，它给出 $\ind\mathrm{i}\sym{D4}{D\hspace{-0.639em}/}_4=-\int\mathrm{ch}_2$，而 \eqref{13.119} 的第一个等号写的是 $+\int\mathrm{ch}_2$。两者的差别取决于 $\mathrm{i}\sym{D4}{D\hspace{-0.639em}/}_4$ 的手征约定与 $S^2\times S^1\times I$ 的定向（APS 定理的整体符号随约定而变）；"谱流 $=\pm\mathcal{N}$" 的绝对值不受影响。(2) \eqref{13.119} 中的积分区域写作 $S^2\times S^2$，但这里的空间是 $S^2\times S^1\times I$（\eqref{13.117}）；由于两端 $\mathcal{A}_0$、$\mathcal{A}_1$ 用 $g$ 粘合，可以把 $S^1\times I$ 的两端粘起来，得到一个以 $g$ 为转移函数的丛——这才是"$S^2\times S^2$"的含义（拓扑上底空间是 $S^2\times T^2$，但起作用的只是沿粘合面的转移函数）。随后一步 $\int_{S^2\times S^1\times I}\dd Q_3=\int_{S^1\times S^2}[Q_3(t=1)-Q_3(t=0)]$ 是 Stokes 定理，再用 \eqref{13.100} 得 $Q_3(g^{-1}\dd g,0)$。我们没有把握断定原书采用哪种定向约定，因此保留原式。`}</Box>
        <Stmt id="F:ladder13" />
        <Tx>{R`于是，三维理论的谱流由指标 $\mathcal{N}$ 给出。

**总结：**映射 $g:S^2\times S^1\to G$ 有三种不同的理解：

(1) $g$ 是 $S^2\times S^2$ 上 $G$ 丛两片之间边界上的转移函数，它给出四维阿贝尔反常的指标 $\mathcal{N}$。

(2) 设 $\mathcal{A}_0$ 与 $\mathcal{A}_1=g^{-1}(\mathcal{A}_0+\dd)g$ 是 $S^2\times S^1$ 上的规范势。规范变换函数 $g$ 度量了 $\mathrm{Spec}\,\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_3(\mathcal{A}_0)$ 与 $\mathrm{Spec}\,\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_3(\mathcal{A}_1)$ 之间的谱流 $\mathcal{N}$。

(3) $g:S^2\times S^1\to G$ 诱导出映射 $S^1\to\mathfrak{G}$，其卷绕数 $\mathcal{N}$ 就是二维空间中的非阿贝尔反常。

这样我们就得到了"**维数阶梯**" 4–3–2。推广到更高维是显然的：$(2l+2)$ 维阿贝尔反常 → $(2l+1)$ 维宇称反常（谱流）→ $2l$ 维非阿贝尔反常。交互图 3 在最简单的一维例子（$S^1$ 上的 $\mathrm{i}\partial_\theta+t$，例 12.8）上展示了"两端谱相同、$\eta$ 相同，但中间有一个本征值穿过零"的谱流机制。`}</Tx>
      </Sub>
    </Sec>);
}
