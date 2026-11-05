import { BulletClusterRedraw, ClusterArcsRedraw, IntegrationTriangleRedraw, LensingCoordinatesRedraw } from "./_ch14_redraw.jsx";
// 本章引言、§13.1 Overview（图 13.1–13.3）、§13.2 Photon geodesics —— 式 (13.1)–(13.17)，图 13.4–13.5
import { Sec, Tx, Eq, Box, Derivation, Figure, C, FormulaMap } from "@kit";
import { FM_13_17 } from "./_ch13_fmaps.jsx";
import { PointLens, KernelPlot } from "./_ch13_plots.jsx";

const R = String.raw;

export function Intro() {
  return (
    <Sec n="13.0" title="Introduction" zh="引言：为什么要测质量本身"
      gist={R`星系成团、SZ 效应、星系团计数测的都是重子或星系，与物质之间隔着偏袒或质量–观测量关系；引力透镜直接响应全部质量，其统计量直接正比于（非线性）物质功率谱。`}
      why={R`先弄清透镜相对于第 11–12 章探针的独特优势与代价，后面每一步推导才知道是在为什么服务。`}>
      <Tx>{R`**前几种探针的共同缺陷。**到目前为止我们遇到的大尺度结构探针——星系成团、SZ 效应、星系团计数——都是有力的宇宙学工具，但有一个共同的缺陷：它们测的是**星系**（更一般地说是重子物质）的分布，而不是**质量**的分布。而理论上能准确预言的恰恰是后者。第 11、12 章已经看到，星系与物质之间的联系（偏袒）只有在大尺度上、并以引入额外自由系数为代价才可信；星系团的质量–观测量关系同样很难从理论上预言。

**透镜：直接看质量。**本章介绍一种能探测**全部**质量分布的实验途径。非均匀性会通过引力透镜使遥远星系的观测形状发生畸变；它们也会使 CMB 发生微小的畸变，把各向异性从原初形式中改变。而且，这些透镜畸变的统计量与物质功率谱直接相关——确切地说，是第 12 章详细讨论过的**非线性**物质功率谱，因为透镜一直探测到小尺度。

**本章路线。**\secref{13.1}–\secref{13.2} 是概览与透镜基本方程，\secref{13.3} 讨论 CMB 透镜。随后的星系形状透镜（剪切）与偏振用的是同一套形式——两者都可以用天球上一个 $2\times2$ 对称矩阵来量化：第 10 章是具有 $Q$、$U$ 分量的偏振张量，透镜中的对应物是星系像的**二阶矩张量**。所以读 \secref{13.4} 之前最好先复习 \secref{10.1}。\secref{13.5} 把第 10、11 章的结果结合起来，推出弱透镜的功率谱与相关函数。`}</Tx>
    </Sec>);
}

export function Sec131() {
  return (
    <Sec n="13.1" title="Overview" zh="概览：光线响应质量"
      gist={R`宇宙中的非均匀性使光路弯曲。强透镜（多重像、弧、时间延迟、微透镜）早已是成熟的天体物理工具；对宇宙学最重要的是**弱透镜**——背景星系形状的微小系统畸变，可用于称星系团质量，更可用于测量物质功率谱及其与星系的交叉相关。`}
      why={R`透镜之所以有前途，是因为光路响应的是质量——更准确地说，通过时空扰动 $\Phi$、$\Psi$ 响应一切成团的应力–能量成分，因而与第 11 章的探针高度互补。`}>
      <p className="muted">本节概念：<C id="sb" /> · <C id="mag" /> · <C id="kernel" /></p>
      <Tx>{R`**一个和广义相对论一样古老的想法。**非均匀性的引力效应会扭曲光从遥远源到我们的路径。我们在 \secref{3.3.2} 研究光子测地线时已经遇到过这一效应——**引力透镜**（gravitational lensing，简称透镜）。它之所以前景广阔，是因为光路响应的是质量：更确切地说，透镜通过时空扰动 $\Phi$、$\Psi$ 探测宇宙中**所有**成团的应力–能量成分。只要能测量这些畸变，就能推断宇宙中质量的分布。这使透镜与第 11 章讨论的其他结构探针高度互补。

引力场会使遥远的像发生透镜效应，这个想法至少和广义相对论一样古老。甚至在 Einstein 完成广义相对论之前，他就明白测量这种畸变的重要性：他早期的笔记里已有像的放大以及单个源形成双像可能性的计算（Renn et al., 1997）。而正是对引力透镜的探测让广义相对论被接受：1919 年 Eddington 率队前往南半球观测日全食时星光的偏折，测得的偏折量（Dyson et al., 1920）与 Einstein 的新理论吻合得很好。

**强透镜的几种表现。**

- 1979 年，Walsh、Carswell 与 Weymann 观测到一个被多重成像的类星体，证实了 Einstein 早年的猜想：从类星体沿不同方向出发的光线，被中间的一个星系聚焦到同一点（我们）。可以证明，被透镜的类星体数目探测的是宇宙学体积随红移的变化，因而探测膨胀史（Kochanek, 1996）。
- **时间延迟**：同一个源同时发出、因透镜而从不同方向到达我们的两条光线，一般在不同时刻到达。用有光变的源可以测出这一延迟；它依赖哈勃常数，天文学家已用这种方法测量 $H_0$（如 Wong et al., 2019）。
- **微透镜**：一个透镜移入源与我们的连线时，像被放大，于是远处的源呈现特征性的光变。微透镜已被用来限制大质量致密晕天体（MACHO）对暗物质的贡献（如 Tisserand et al., 2007）。透镜也被用于寻找冷暗物质晕中应有的子结构（\secref{12.3}；Vegetti et al., 2012；Hezaveh et al., 2016）。`}</Tx>
      <Figure n="13.1" illustration={<ClusterArcsRedraw />} width="100%" caption={R`SIS 透镜作用于四个高斯源的原创解析模型，展示切向弧与临界曲线；非 Abell 1689 观测图。`} />
      <Tx>{R`**为什么背景星系变成了弧？**原书以 Abell 1689 星系团的照片展示背景星系的弧像；本站\figref{13.1} 用理想等温球透镜和高斯源独立演示这种畸变。考虑一个光线从大质量透镜附近经过、到达观测者的星系（\figref{13.2} 左图）。光线向透镜弯曲，所以星系的**视位置**被推向远离透镜的方向。右图显示了这对源星系的像的影响（为简单起见设透镜绕视线柱对称）：源的每个像素都沿径向向外移动，把规则的椭圆形无透镜像扭成一段弧。另一个畸变效应是：离透镜越近的光线偏折越大，所以弧在径向上比原来的像更窄。

**放大。**下一节将证明透镜**保持像的面亮度**。由于透镜后的像面积比原来大，净效应是源星系像的总流量增加——这称为**放大**（magnification）。借助透镜，我们可以发现并研究那些位于大质量透镜后方、否则太暗而无法探测的星系。`}</Tx>
      <Figure n="13.2" width="100%" illustration={<PointLens />}
        caption={R`原创计算图。点质量透镜，左为对每个像素反向追踪光线得到的天空图像，右为侧视几何（角度夸张）；拖动 $\beta$ 看弧如何变成 Einstein 环、又如何在 $\beta\gg\theta_E$ 时退化为弱透镜的轻微切向拉伸。`} />
      <Tx>{R`**子弹星系团。**\figref{13.3} 是另一个壮观的例子：前景中的大型双星系团——所谓"子弹星系团"——使背景星系的形状畸变，在星系团两个分离的暗物质核周围形成独特的椭圆弧图样。子弹星系团是两个大质量星系团正在进行的并合，为**无碰撞暗物质**的存在提供了醒目的证据。两个星系团中大部分重子是热的弥散气体，可在 X 射线中探测（\secref{12.5}；\figref{13.3} 中粉色）。它们的位置与通过引力透镜探测到的大部分物质（蓝色）明显不同。这种错位在物理上是预期之中的：弥散气体有碰撞，两团相撞时形成强激波；而暗物质无碰撞，两个暗物质晕自由地互相穿过，类似 \figref{12.5} 的示意。各星系团中的星系也是如此：与弥散重子相比它们几乎没有相互作用，所以位于大部分物质所在之处。本书中我们已遇到大量非常稳健的冷暗物质证据，子弹星系团之所以又是一个令人信服的证据，就在于它提供了如此清晰的可视化。`}</Tx>
      <Figure n="13.3" illustration={<BulletClusterRedraw />} width="100%" caption={R`碰撞星系团质量峰与热气体峰错开的原创教学示意；不是子弹星系团的图像或重建数据。`} />
      <Tx>{R`**弱透镜：本章的主角。**对宇宙学而言，引力透镜最重要的方面是**弱透镜**（weak lensing）：遥远星系的形状被中间的前景物质过密区**轻微**扭曲——与 \figref{13.2} 是同一个效应，只是幅度小得多。它的一个应用是利用背景星系推断单个星系团的质量（至少可追溯到 Tyson et al., 1990）。\secref{12.5} 说过，星系团丰度是灵敏的宇宙学探针，但前提是质量有精确的校准——弱透镜恰好能提供这一点（\secref{13.5.3} 简述）。

本章主要关心的是**大尺度物质分布**造成的弱透镜，而不是像星系团那样单个可辨认的透镜。推断暗物质的分布、即绘制质量图，只是目标的一部分；我们最感兴趣的是统计量——相关函数或其 Fourier 变换，功率谱。我们将推导透镜图的功率谱如何测量背后的（非线性）物质功率谱，以及它与星系计数的交叉相关如何为偏袒提供宝贵的约束。`}</Tx>
      <Box kind="physics" title="量级感：弱透镜有多弱？">{R`对一个 $M=10^{12}M_\odot$ 的星系、$z_L=0.5$、$z_S=2$，Einstein 半径只有约 $2''$（\figref{13.2} 交互版的读数）；一个 $10^{15}M_\odot$ 的星系团约为 $1'$ 量级。而大尺度结构在角分到度的尺度上产生的会聚与剪切只有 $\kappa,\gamma\sim10^{-2}$（\exref{13.8}；本页数值：$z_S=1.5$、$\theta_{\rm min}=10'$ 时 $\kappa_{\rm rms}\approx0.013$）。相比之下，星系的内禀椭率弥散约 $0.3$。弱透镜是一项"在巨大噪声中做统计"的测量。`}</Box>
    </Sec>);
}

export function Sec132() {
  return (
    <Sec n="13.2" title="Photon geodesics" zh="光子测地线：偏折角与透镜势"
      gist={R`无碰撞 ⇒ 光子分布函数守恒 ⇒ 比强度只随频率变化 ⇒ $I_{\rm obs}(\boldsymbol\theta)=I_{\rm true}(\boldsymbol\theta_S)$。沿未扰动光路积分测地线方程两次，得到偏折角 $\Delta\theta^i=2\int_0^\chi d\chi'\Phi_{,i}(1-\chi'/\chi)$，它是透镜势 $\phi_{\rm L}$ 的梯度；二阶导数给出畸变张量 $\psi_{ij}$。`}
      why={R`本章所有结果——CMB 的重映射、形状的畸变、功率谱——都只需要一样东西：观测方向 $\boldsymbol\theta$ 与真实方向 $\boldsymbol\theta_S$ 之间的映射。这一节把它算出来。`}
      gives={["13.2", "13.3", "13.13", "13.14", "13.15", "13.16", "13.17"]}>
      <p className="muted">本节概念：<C id="sb" /> · <C id="deflection" /> · <C id="kernel" /></p>
      <Tx>{R`**又是 Boltzmann 方程。**引力透镜对观测光子的效应，又一次是 Boltzmann 方程的应用。晚期宇宙中散射与吸收可以忽略，没有碰撞项，于是 Boltzmann 方程只是说光子分布函数守恒：$df(\boldsymbol x,\boldsymbol p,t)/dt=0$（本章不考虑偏振）。天文学家与 CMB 实验者用探测器所做的任何测量，都可以描述为对**比强度** $I_\nu$（specific intensity）的积分——它定义为单位立体角、单位面积、单位时间、单位频率入射到探测器上的能量：`}</Tx>
      <Eq n="13.1" title="比强度的定义" say={R`比强度就是"每单位立体角、面积、时间、频率"收到的能量——探测器真正测量的量。`}>{R`d\sym{ch13-Eph}{E} = I_\nu\,d\Omega\,dA_\perp\,dt\,d\nu,`}</Eq>
      <Tx>{R`其中 $dA_\perp$ 是垂直于光子流的探测器面积。辐射场的全部信息都包含在 $f(\boldsymbol x,\boldsymbol p,t)$ 中，所以应当能把它与 $I_\nu$ 联系起来。事实上我们第一次遇到 $I_\nu$ 时（\eqref{1.9}）已经瞥见了这一关系。精确的关系是（推导见 \exref{13.1}）`}</Tx>
      <Eq n="13.2" keyEq title="比强度与分布函数" say={R`比强度正比于 $\nu^3$ 乘以光子分布函数：分布函数守恒，所以比强度只能通过频率改变。`}>{R`I_\nu(\boldsymbol x,\hat{\boldsymbol p},t) = 4\pi\nu^3f(\boldsymbol x,p=2\pi\nu,\hat{\boldsymbol p},t),`}</Eq>
      <Tx>{R`其中 $\hat{\boldsymbol p}$ 是被探测光子的单位动量方向。要点是：比强度直接与光子分布函数相关，而后者是**守恒的**。我们测量的正是比强度，尽管常用导出量来刻画测量结果（例如提取 CMB 的温度，或星系像的流量）。`}</Tx>
      <Figure n="13.4" illustration={<LensingCoordinatesRedraw />} width="100%" caption={R`透镜源平面上的真实位置、表观位置和偏折位移；角度夸张的原创几何示意。`} />
      <Tx>{R`**面亮度守恒。**$f$ 守恒意味着：从光子发射到被观测，$I_\nu$ 只通过频率 $\nu$ 的变化而改变——来自宇宙学红移、引力红移与多普勒效应。频移只影响对源距离的估计，不改变星系的形状，这里忽略它。于是，在位置 $\boldsymbol\theta$ 观测到的 $I_\nu$，与没有透镜时（即在均匀宇宙中）从**真实**源方向 $\boldsymbol\theta_S$ 观测到的相同（参见 \figref{13.4}）：`}</Tx>
      <Eq n="13.3" keyEq title="透镜的基本关系：面亮度守恒" say={R`在方向 $\boldsymbol\theta$ 看到的强度，就是没有透镜时方向 $\boldsymbol\theta_S$ 上的强度：透镜只搬动光线的到达方向，不改变亮度。`}>{R`I_{\rm obs}(\boldsymbol\theta) = I_{\rm true}(\boldsymbol\theta_S).`}</Eq>
      <Tx>{R`天空上位置 $\boldsymbol\theta$ 处观测到的强度，实际上来自位于 $\boldsymbol\theta_S$ 的源，但强度本身不变。\eqref{13.3} 是我们推导一切透镜结果的出发点。

**接下来的任务：求 $\boldsymbol\theta_S(\boldsymbol\theta)$。**我们要求解光线离开遥远的源、穿过非均匀宇宙的路径。迄今为止，本书中的光子路径在共动坐标中总是直线；现在允许它像 \figref{13.2} 那样稍有弯曲。\figref{13.4} 给出几何与记号。光子任意时刻的共动位置记为 $\boldsymbol x$，由 \secref{3.3.2} 推出的测地线方程支配。我们始终假设偏折角很小，只做到偏折的**线性阶**——对本章所有应用这都是极好的近似。于是位置的 $x^3$（$z$）分量仍等于径向距离 $\chi$，横向分量等于 $\chi\boldsymbol\theta_S$。换言之，真实源位置是`}</Tx>
      <Eq n="13.4" say={R`真实源在距离 $\chi$ 处、横向偏离视线 $\chi\boldsymbol\theta_S$。`}>{R`\boldsymbol x_{\rm true} = (\boldsymbol\theta_S,1)\,\chi,`}</Eq>
      <Tx>{R`而同一距离上的视位置由 $\boldsymbol\theta$ 定义：`}</Tx>
      <Eq n="13.5" say={R`视位置：沿观测方向 $\boldsymbol\theta$ 延长到同一距离 $\chi$ 的点。`}>{R`\boldsymbol x_{\rm obs} = (\boldsymbol\theta,1)\,\chi.`}</Eq>
      <Tx>{R`**第一次积分：横向位置。**求 $\boldsymbol\theta_S$ 的大部分工作已在 \secref{3.3.2} 完成。先把位置矢量的横向分量 $x_\perp^i$ 写成 $dx_\perp^i/d\chi=-dx_\perp^i/d\eta$ 对 $\chi$ 的积分；对光线 $d\eta=-d\chi$（向外走得越远，时间越早）。我们有`}</Tx>
      <Eq n="13.6" say={R`光子横向位置随距离的变化率就是其单位动量的横向分量（取负号是因为我们沿光线"倒着"从观测者向外积分）。`}>{R`\frac{dx_\perp^i}{d\chi} = -\frac{dx_\perp^i}{d\eta} = -a\frac{dx_\perp^i}{dt} = -\hat p_\perp^i,`}</Eq>
      <Tx>{R`其中 $\hat{\boldsymbol p}_\perp$ 是光子单位动量矢量的横向部分，最后一个等号来自 \eqref{3.34}（对光子 $p/E=1$）。由此得到 $\theta_S^i$ 的积分表达式：`}</Tx>
      <Eq n="13.7" say={R`源的真实角位置 = 横向位移除以距离 = 沿途光线横向倾角的平均（带负号）。`}>{R`\theta_S^i = \frac{x_\perp^i}{\chi} = -\frac1\chi\int_0^\chi\hat p_\perp^i(\chi'')\,d\chi''.`}</Eq>
      <Box kind="warning" title="撇号不是导数">{R`本节中的 $\chi''$（以及稍后的 $\chi'$）是积分变量，**不要**与对共形时间的导数混淆。约定：$\chi'$ 是势所在（"透镜"）的位置，$\chi''$ 是计算横向位移时的中间位置，$\chi$ 是源的距离。`}</Box>
      <Tx>{R`**第二次积分：光线方向。**现在用 \eqref{3.72} 推出的测地线方程分量：`}</Tx>
      <Eq n="13.8" say={R`光子方向的变化只来自势梯度的横向部分（方括号是垂直于传播方向的投影），且 $\Phi$ 与 $\Psi$ 贡献同等。`}>{R`\frac{d\hat p^i}{dt} = \frac1a\left[\delta^{ik}-\hat p^i\hat p^k\right](\Phi-\Psi)_{,k}.`}</Eq>
      <Tx>{R`因子 $[\delta^{ik}-\hat p^i\hat p^k]$ 正是向垂直于 $\boldsymbol p$ 的方向的投影，在小角近似下即垂直于 $z$ 轴的方向。于是`}</Tx>
      <Eq n="13.9" say={R`沿光线每走单位距离，横向方向被势的横向梯度改变 $-2\Phi_{,i}$——因子 2 是广义相对论相对于牛顿引力的"加倍"。`}>{R`\frac{d\hat p_\perp^i}{d\chi} = -a\frac{d\hat p_\perp^i}{dt} = -a\left[\frac1a(\Phi-\Psi)_{,i}\right] = -2\Phi_{,i}.`}</Eq>
      <Tx>{R`最后一个等号成立是因为晚期宇宙没有各向异性应力，$\Phi=-\Psi$。积分 \eqref{13.9} 得`}</Tx>
      <Eq n="13.10" say={R`光线在 $\chi''$ 处的横向倾角 = 从观测者到 $\chi''$ 沿途所有势梯度造成的偏转之和，加一个由边界条件确定的常数。`}>{R`\hat p_\perp^i(\chi'') = -2\int_0^{\chi''}d\chi'\,\Phi_{,i}(\boldsymbol x(\boldsymbol\theta,\chi'),\eta_0-\chi') + \sym{ch13-Ci}{C}^i,`}</Eq>
      <Tx>{R`其中`}</Tx>
      <Eq n="13.11" say={R`未扰动的光路：沿观测方向 $\boldsymbol\theta$ 的直线，势就在这条直线上取值（Born 近似）。`}>{R`\boldsymbol x(\boldsymbol\theta,\chi') = \left(\chi'\theta^1,\ \chi'\theta^2,\ \chi'\right)`}</Eq>
      <Tx>{R`是计算势时所用的**未扰动**光路。也就是说，我们沿零阶路径计算扰动，因为两者之差是偏折的二阶项（这称为 Born 近似）。常数 $C^i$ 稍后确定。把 \eqref{13.10} 代入 \eqref{13.7}，得`}</Tx>
      <Eq n="13.12" say={R`两次积分：先积出光线方向，再积出横向位移，最后除以距离。`}>{R`\theta_S^i = \frac2\chi\int_0^\chi d\chi''\int_0^{\chi''}d\chi'\,\Phi_{,i}(\boldsymbol x(\boldsymbol\theta,\chi'),\eta_0-\chi') - \sym{ch13-Ci}{C}^i.`}</Eq>
      <Figure n="13.5" illustration={<IntegrationTriangleRedraw />} width="100%" caption={R`同一个三角积分域的竖条与横条积分；换序后得到路径长度权重。`} />
      <Tx>{R`**定积分常数。**考虑无偏折极限 $\Phi_{,i}\to0$。此时 $\theta_S^i=-C^i$，而它必须化为 $\theta^i$——真实位置等于观测位置。所以 $-C^i=\theta^i$，于是`}</Tx>
      <Eq n="13.13" say={R`真实位置 = 观测位置 + 沿视线势梯度的二重积分。`}>{R`\theta_S^i = \theta^i + \frac2\chi\int_0^\chi d\chi''\int_0^{\chi''}d\chi'\,\Phi_{,i}(\boldsymbol x(\boldsymbol\theta,\chi'),\eta_0-\chi').`}</Eq>
      <Box kind="physics" title="符号检查：光线向过密区弯曲">{R`以 $\boldsymbol x_\perp=0$ 为中心的过密区那里 $\Phi>0$（本书约定，Poisson 方程 \eqref{8.5}）。于是在 $x>0$ 处 $\Phi$ 对 $x$ 的导数（$i=1$ 的 $\Phi_{,i}$）为负。所以从正 $x$ 轴一侧经过过密区的光线，其 $\theta_S-\theta<0$：真实源比视位置**更靠近**过密区——光线向过密区弯曲，视位置被推离透镜，正如 \figref{13.2} 所示。`}</Box>
      <Tx>{R`**交换积分次序。**$\chi'$–$\chi''$ 平面上的二重积分限于 \figref{13.5} 的阴影区，所以可以交换积分次序，让 $\chi''$ 从 $\chi'$ 积到 $\chi$。$\Phi_{,i}$ 只依赖 $\chi'$，$\chi''$ 的积分平凡地给出 $\chi-\chi'$，于是`}</Tx>
      <Eq n="13.14" keyEq title="偏折角" say={R`偏折角是沿视线对横向势梯度的加权积分，权重 $2(1-\chi'/\chi)$：离源越近的结构杠杆臂越短，贡献越小。`}>{R`\begin{aligned}\theta_S^i &= \theta^i+\Delta\theta^i\\ \Delta\theta^i(\boldsymbol\theta) &= 2\int_0^\chi d\chi'\,\Phi_{,i}(\boldsymbol x(\boldsymbol\theta,\chi'))\left(1-\frac{\chi'}{\chi}\right).\end{aligned}`}</Eq>
      <Derivation title={R`从 \eqref{13.13} 到 \eqref{13.14}：交换积分次序`} collapsed steps={[
        { tex: R`\int_0^\chi d\chi''\int_0^{\chi''}d\chi'\,F(\chi') = \int_0^\chi d\chi'\,F(\chi')\int_{\chi'}^{\chi}d\chi''`, why: R`同一个三角形区域 $0<\chi'<\chi''<\chi$，按横线（固定 $\chi'$）积分。` },
        { tex: R`= \int_0^\chi d\chi'\,F(\chi')\,(\chi-\chi')`, why: R`被积函数不含 $\chi''$。` },
        { tex: R`\frac2\chi\int_0^\chi d\chi'\,\Phi_{,i}\,(\chi-\chi') = 2\int_0^\chi d\chi'\,\Phi_{,i}\left(1-\frac{\chi'}\chi\right)`, why: R`乘以前因子 $2/\chi$。` },
      ]} result={R`物理图像：在 $\chi'$ 处光线方向被改变 $2\Phi_{,i}d\chi'$；这一倾角在剩下的 $\chi-\chi'$ 路程上累积成横向位移 $2\Phi_{,i}d\chi'(\chi-\chi')$，除以 $\chi$ 变成角度。`} />
      <Tx>{R`**偏折角是梯度。**利用 \eqref{13.11}，在积分号下 $\partial/\partial x^i=\chi'^{-1}\partial/\partial\theta^i$（未扰动路径上横向坐标是 $\chi'\theta^i$），因此可以把偏折角写成天空上一个**透镜势** $\phi_{\rm L}$ 的导数：`}</Tx>
      <Eq n="13.15" keyEq title="偏折角 = 透镜势的梯度" say={R`偏折角是天空上一个标量场的梯度：没有旋度，这一点决定了剪切只有 E 模。`}>{R`\Delta\theta^i(\boldsymbol\theta) = \frac{\partial}{\partial\theta^i}\phi_{\rm L}(\boldsymbol\theta)`}</Eq>
      <Eq n="13.16" keyEq title="透镜势" say={R`透镜势是沿视线对 $2\Phi$ 的加权投影，权重 $(1/\chi')(1-\chi'/\chi)$。`}>{R`\phi_{\rm L}(\boldsymbol\theta) \equiv 2\int_0^\chi\frac{d\chi'}{\chi'}\Phi(\boldsymbol x(\boldsymbol\theta,\chi'))\left(1-\frac{\chi'}{\chi}\right).`}</Eq>
      <Tx>{R`透镜势是沿光路对 $2\Phi$ 的加权积分；在我们所做的阶数上，光路可以取未扰动路径 \eqref{13.11}。注意：靠近源的过密区与欠密区对透镜的贡献被压低，因为当 $\chi'$ 趋近 $\chi$ 时 $1-\chi'/\chi$ 趋于零。

**畸变张量。**对星系形状，我们还需要偏折角的一阶导数，等价地说，透镜势的二阶导数矩阵（**畸变张量**，distortion tensor）：`}</Tx>
      <FormulaMap n="13.17" keyEq title="畸变张量" say={R`畸变张量是透镜势的二阶导数，等于沿视线对势的横向二阶导数的加权积分，权重 $2\chi'(1-\chi'/\chi)$——它在源与观测者的中点附近最大。`} tree={FM_13_17} start="Phi" />
      <Tx>{R`这里又一次把对 $\boldsymbol\theta$ 的导数换成积分号下对 $\boldsymbol x$ 的导数（每换一次多一个因子 $\chi'$）。最后一个等号在把透镜与物质分布联系起来时会很有用：由 Poisson 方程，$\Phi_{,ij}$ 的迹正比于物质过密度。

**权重的形状。**\eqref{13.17} 的权重 $\chi'(1-\chi'/\chi)$ 在 $\chi'=\chi/2$ 处最大、两端为零：离观测者太近的结构张角太大（同样的物理梯度对应很小的角梯度），离源太近的结构没有杠杆臂。下图把这一权重（推广到源有分布的情形，\eqref{13.49}）画了出来。`}</Tx>
      <KernelPlot />
      <Box kind="note" title="小结：透镜就是一张坐标重映射">{R`\eqref{13.3} 加上 \eqref{13.14}–\eqref{13.16}：观测方向 $\boldsymbol\theta$ 上看到的，是方向 $\boldsymbol\theta+\nabla_\theta\phi_{\rm L}$ 上本来的东西。下一节对 CMB 温度场应用这张映射，\secref{13.4} 对星系的形状应用它的导数 $\psi_{ij}$。`}</Box>
    </Sec>);
}
