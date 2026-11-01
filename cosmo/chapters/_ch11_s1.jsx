import { ObservedPositionRedraw, SurveyWedgeRedraw } from "./_ch14_redraw.jsx";
// 引言与 §11.1（含 11.1.1 Galaxy statistics）—— 式 (11.1)–(11.15)，图 11.1–11.2
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { Sub112 } from "./_ch11_s12.jsx";
import { Sub113 } from "./_ch11_s13.jsx";

const R = String.raw;

export function Intro() {
  return (
    <Sec n="11.0" title="Introduction" zh="引言：为什么需要示踪体"
      gist={R`CMB 的 $C(l)$ 可以直接测量，物质功率谱 $P_{\rm L}(k,z)$ 却不行——物质大多是暗的。我们只能借助示踪体：星系（三维的红移巡天或二维的测光巡天），以及以 CMB 为背光的热气体（SZ 效应）。`}
      why={R`第 8 章的 $P_{\rm L}(k,z)$ 携带关于哈勃常数、暗能量与中微子质量的丰富信息；要把它与观测联系起来，必须理解示踪体的统计量与物质统计量之间的关系，以及观测本身引入的畸变。`}>
      <Tx>{R`**理论有了，观测在哪？**前两章看到，CMB 温度与偏振的角功率谱蕴含大量信息。第 8 章则同样精确地预言了线性物质功率谱 $P_{\rm L}(k,z)$，它同样信息丰富：哈勃常数、暗能量、中微子质量都写在里面。但与 CMB 不同，我们**无法直接测量**物质功率谱——物质的主体是暗物质，连许多重子物质也不易观测（例如稀薄的热气体）。好在有许多可观测量能间接探测物质分布。本章讲其中也许最重要的一种：**星系成团**（galaxy clustering），即把星系（更一般地，任何天体）当作大尺度物质分布的**示踪体**（tracer）；另外再讲一种以 CMB 为背光的示踪体。后面几章还会讲星系团与引力透镜。

**红移巡天与它的三个麻烦。**最直接的测量来自**星系红移巡天**：记录每个星系的天球位置与红移（红移是视向距离的量度），于是每个星系都有三维位置，可以计算星系功率谱 $P_{\rm g,obs}(\boldsymbol k)$ 这样的三维统计量。但解释它有几个问题。第一是**偏袒**（bias）：星系的成团与物质不同。第二，星系红移不只含宇宙学红移（只是距离的函数），还含星系**本动速度**的多普勒位移。回想一下：只有当星系相对共动网格静止时，红移才完全由哈勃膨胀决定、是距离的完美指标；而多数星系并不静止，本动速度通过多普勒效应贡献到观测红移里。所以即使红移测得再准，也不能无歧义地换算成视向距离。更重要的是，星系速度不是随机的，而是与物质密度场本身相关——这导致星系统计量的修正，称为**红移空间畸变**（redshift-space distortions，RSD）。

**麻烦里的信息。**不过在一阶近似下，偏袒与 RSD 都**不改变**大尺度成团的形状——这来自关于偏袒与星系速度的简化假设。本章只陈述这些假设，第 12 章再说明它们为什么成立。这一事实使我们可以用星系功率谱的形状——具体说，物质功率谱中的**重子声学振荡**（BAO）特征——来约束膨胀史，这让 BAO 成为暗能量的主要探针之一。RSD 这个表面上的麻烦也有好处：通过速度在星系功率谱上的多普勒统计效应，可以测量结构增长的速率——又一个暗能量（实际上也是引力）的探针。

**没有红移怎么办？**红移巡天信息丰富，但也昂贵：测红移要拍每个星系的光谱，所需光子数远多于成像。**测光巡天**只拍天空图像，用观测更多的星系来弥补径向信息的缺失；以引力透镜为目标的巡天也顺带给出星系的角位置。所以我们必须会预言**角功率谱** $C_{\rm g}(l)$——\secref{11.2} 将看到它是三维星系功率谱的一个积分。

**以 CMB 为背光。**类似的积分，但积分对象换成电离气体**压强扰动**的三维功率谱，就是 \secref{11.3} 要推导的另一个可观测量。晚期宇宙中电离气体的温度远高于 CMB。CMB 光子被这些热电子散射后倾向于获得能量，使 CMB 黑体谱发生特征性的畸变。这个 **Sunyaev–Zel'dovich（SZ）**信号可以与原初 CMB 区分开，从而用于测量电离宇宙中压强的积分，也可用来搜寻大质量星系团。`}</Tx>
    </Sec>);
}

export function Sec111() {
  return (
    <Sec n="11.1" title="Galaxy clustering" zh="星系成团"
      gist={R`把每个星系的（角位置、红移）换成三维坐标时，有两种误差：基准宇宙学的距离误差 $\sym{ch11-dchi}{\delta\chi}$，以及本动速度的多普勒位移 $u_\parallel/aH$（\eqref{11.5}）。利用"星系数在任何坐标下都守恒"求 Jacobian，得到观测过密度 \eqref{11.15}，它是后面 RSD 与 AP 推导的共同起点。`}
      why={R`我们想把观测到的星系功率谱与理论的 $P_{\rm L}$ 比较，就必须精确知道"观测坐标中的过密度"与"真实坐标中的过密度"之间的关系。`}
      gives={["11.1", "11.3", "11.4", "11.5", "11.10", "11.14", "11.15", "11.17", "11.22", "11.23", "11.31", "11.37"]}>
      <p className="muted">本节概念：<C id="tracer" /> · <C id="jacobian" /> · <C id="rsd" /> · <C id="kaiser" /> · <C id="fsigma8" /> · <C id="ap" /> · <C id="bao" /></p>
      <Tx>{R`**最简单的统计量。**原书以 Sloan 数字巡天（SDSS）的真实星系切片为例；本站\figref{11.1} 用合成点演示巡天切片、聚集与选择效应，不含巡天星系位置。这样一个总共含近百万个星系的红移巡天，能算出什么统计量与理论比较？与 CMB 类似，最简单的统计量是功率谱——不过现在是三维的 $P_{\rm g,obs}(\boldsymbol k)$。`}</Tx>
      <Figure n="11.1" illustration={<SurveyWedgeRedraw />} caption={R`巡天样本深度的原创示意：高光度 LRG 可覆盖比星等极限主样本更远的体积。点位为教学抽样，非 SDSS 数据。`} />
      <Tx>{R`**记号。**\figref{11.2} 画出了几何关系：一个星系与我们的共动距离为 $\chi(z)$（\eqref{2.34}）。于是三维位置矢量的分量为`}</Tx>
      <Eq n="11.1" keyEq title="观测位置" say={R`观测者把星系放在"方向 $\hat{\boldsymbol n}$、距离 $\chi(z)$"处：角位置决定方向，红移通过距离–红移关系决定远近。`}>{R`\boldsymbol x_{\rm obs}(z,\theta,\phi)=\chi(z)\,\hat{\boldsymbol n}(\theta,\phi);\qquad\hat{\boldsymbol n}=\frac{\boldsymbol x_{\rm obs}}{|\boldsymbol x_{\rm obs}|}.`}</Eq>
      <Tx>{R`单位矢量 $\hat{\boldsymbol n}$ 与星系在天球上的位置（由两个角 $\theta,\phi$ 给定）一一对应。在未扰动的宇宙中，星系的距离 $\chi$ 与观测红移 $z$ 由 $\chi(z)$ 直接相联（\secref{2.2}）。

**第一个问题：我们不知道真实的 $\chi(z)$。**要计算这个函数，必须假设宇宙的膨胀史——而这本身正是我们想测的东西之一。实际巡天分析中通常假设一个**基准宇宙学**（fiducial cosmology），其距离–红移关系 $\chi_{\rm fid}(z)$ 一般与真实宇宙的不同：`}</Tx>
      <Eq n="11.2" say={R`基准宇宙学的距离等于真实距离加一个误差 $\sym{ch11-dchi}{\delta\chi}(z)$；这个误差只依赖红移。`}>{R`\chi_{\rm fid}(z)=\chi(z)+\sym{ch11-dchi}{\delta\chi}(z).`}</Eq>
      <Tx>{R`**第二个问题：星系在动。**如果星系相对背景宇宙不静止，$|\boldsymbol x_{\rm obs}|$ 就不再等于星系的真实距离。原因很简单：星系的观测红移为`}</Tx>
      <Eq n="11.3" keyEq title="含多普勒项的观测红移" say={R`观测红移 = 宇宙学红移 $1/a_{\rm em}$ 乘以 (1 + 视向本动速度)：速度对红移的**相对**影响与星系多远无关。`}>{R`1+z=\frac{1}{a_{\rm em}}\left[1+u_\parallel\right],\qquad u_\parallel=\boldsymbol u_{\rm g}\cdot\hat{\boldsymbol n},`}</Eq>
      <Tx>{R`其中 $a_{\rm em}$ 是星系发光时的标度因子，因子 $1/a_{\rm em}$ 就是宇宙学红移；第二项是星系本动速度 $\boldsymbol u_{\rm g}$ 造成的多普勒位移，取 $u_{\rm g}$ 的线性阶。注意 $1/a_{\rm em}$ 同时乘在宇宙学项与多普勒项上：给定本动速度对红移的**相对**影响与星系的距离无关。这里假设了星系速度远小于光速（见 \secref{12.1} 的讨论），所以可以停在 $u_{\rm g}$ 的线性阶。

**两个简化。**下文令星系速度等于物质速度，$\boldsymbol u_{\rm g}=\boldsymbol u_{\rm m}$；\secref{12.6} 会看到这在**大尺度上**确实成立。\eqref{11.3} 还忽略了 Sachs–Wolfe 与积分 Sachs–Wolfe 对红移的贡献，它们小得多，只在极大尺度上才重要。`}</Tx>
      <Figure n="11.2" illustration={<ObservedPositionRedraw />} caption={R`视向速度与距离–红移关系误差如何改变真实与表观的星系径向位置。滑块位移采用任意单位。`} />
      <Tx>{R`**速度造成的位移。**若 $\boldsymbol u_{\rm m}=0$ 且基准宇宙学恰好是真实的，距离估计 $|\boldsymbol x|=\chi(z)$ 就是准确的。现在计算速度在 \eqref{11.1} 中造成的误差：`}</Tx>
      <Eq n="11.4" keyEq title="红移空间位移" say={R`视向速度 $u_\parallel$ 把星系沿视线推出 $u_\parallel/aH$ 的共动距离：速度越大、哈勃率越小，看错得越多。`}>{R`\sym{ch11-dxrsd}{\Delta\boldsymbol x_{\rm RSD}}=\frac{\partial\boldsymbol x_{\rm obs}}{\partial u_\parallel}\bigg|_{u_\parallel=0}u_\parallel=\frac{1}{aH}u_\parallel\hat{\boldsymbol n}`}</Eq>
      <Derivation title={R`\eqref{11.4} 中的 $1/aH$ 从哪来`} collapsed steps={[
        { tex: R`1+z=\frac{1+u_\parallel}{a_{\rm em}}\ \Rightarrow\ \frac{\partial z}{\partial u_\parallel}\bigg|_{u_\parallel=0}=\frac{1}{a_{\rm em}}`, why: R`对 \eqref{11.3} 求导。` },
        { tex: R`\frac{\partial\chi}{\partial u_\parallel}=\frac{d\chi}{dz}\frac{\partial z}{\partial u_\parallel}=\frac{1}{H}\cdot\frac1a=\frac{1}{aH}`, why: R`$d\chi/dz=1/H$（\eqref{2.34}），$a=a_{\rm em}$ 取星系处的值。` },
        { tex: R`\Delta\boldsymbol x_{\rm RSD}=\frac{\partial[\chi(z)\hat{\boldsymbol n}]}{\partial u_\parallel}u_\parallel=\frac{u_\parallel}{aH}\hat{\boldsymbol n}`, why: R`方向 $\hat{\boldsymbol n}$ 由角位置决定，不受速度影响。` },
      ]} />
      <Tx>{R`下标 RSD 表明这是红移空间畸变造成的效应。因为每个星系都沿自己的视线移动，$\Delta\boldsymbol x_{\rm obs}$ 正比于 $\hat{\boldsymbol n}$——观测到的（角）天球位置**不变**。\eqref{11.4} 的符号也很清楚：$u_\parallel>0$ 表示星系背离我们运动，带来额外的多普勒红移，从而距离被高估。

**合起来。**把错误宇宙学 \eqref{11.2} 与 \eqref{11.4} 合并，并在 $\sym{ch11-dchi}{\delta\chi}$ 与 $u_\parallel$ 的线性阶工作，得`}</Tx>
      <Eq n="11.5" keyEq title="观测位置与真实位置" say={R`观测位置 = 真实位置 + 沿视线的两段位移：基准宇宙学的距离误差 $\sym{ch11-dchi}{\delta\chi}$（只依赖红移）与速度位移 $u_\parallel/aH$（随三维位置涨落）。`}>{R`\boldsymbol x_{\rm obs}=\boldsymbol x+\left(\sym{ch11-dchi}{\delta\chi}(z)+\frac{1}{aH}u_\parallel(\boldsymbol x)\right)\hat{\boldsymbol n},`}</Eq>
      <Tx>{R`其中 $\boldsymbol x$ 是星系真实的三维位置（即没有速度、又知道真实膨胀史时我们会观测到的位置）。观测坐标与真实位置之间的这种偏移对星系成团的观测有重要影响。它让我们解释星系统计时麻烦一些，但**两种偏移来源都含有丰富的宇宙学信息**，所以值得。`}</Tx>

      <Sub n="11.1.1" title="Galaxy statistics" zh="星系统计">
        <Tx>{R`**问题。**假设我们用观测坐标 $\boldsymbol x_{\rm obs}$（\eqref{11.5}）测量功率谱。这个畸变了的功率谱与星系"真实"的功率谱有什么关系？最早的研究可追溯到 20 世纪 70 年代。这里沿用该课题最著名的论文（Kaiser 1987）的推导，在线性理论框架内进行。Kaiser 只考虑了 RSD；我们同时纳入错误宇宙学造成的位置偏移，这样能统一推出进入观测星系功率谱的全部效应。

**出发点：数守恒。**关键的认识是：一个区域里的星系数，无论用观测位置 $\boldsymbol x_{\rm obs}$ 还是真实坐标 $\boldsymbol x$ 来描述，都是一样的。设想把巡天体积分成许多体积元（体素，voxel），数出每个体素里的星系，就得到星系密度场 $n_{\rm g,obs}(\boldsymbol x_{\rm obs})$；如果能拿到真实位置，同样可得 $n_{\rm g}(\boldsymbol x)$。由于两种情形下星系数相同，`}</Tx>
        <Eq n="11.6" keyEq title="星系数守恒" say={R`同一组星系，用观测坐标数和用真实坐标数，个数一样：密度乘以体积元在两套坐标下相等。`}>{R`n_{\rm g,obs}(\boldsymbol x_{\rm obs})\,d^3x_{\rm obs}=n_{\rm g}(\boldsymbol x)\,d^3x`}</Eq>
        <Tx>{R`其中 $n_{\rm g}$ 是实空间中 $\boldsymbol x$ 处的星系密度，$n_{\rm g,obs}$ 是红移空间中的密度。观测坐标中一点周围的无穷小体积元为`}</Tx>
        <Eq n="11.7" say={R`球坐标中的观测体积元：径向厚度 $dx_{\rm obs}$ 乘以半径平方、再乘以立体角。`}>{R`d^3x_{\rm obs}=x_{\rm obs}^2\,dx_{\rm obs}\,d\Omega,`}</Eq>
        <Tx>{R`其中 $x_{\rm obs}\equiv|\boldsymbol x_{\rm obs}|$；实空间中一点周围的体积元为`}</Tx>
        <Eq n="11.8" say={R`实空间中的同一体积元：用真实径向距离 $x$ 表示。`}>{R`d^3x=x^2\,dx\,d\Omega.`}</Eq>
        <Tx>{R`两者的立体角元 $d\Omega$ 相同（位移沿视线，角位置不变），所以`}</Tx>
        <Eq n="11.9" say={R`观测密度等于真实密度乘以 Jacobian：体积被压缩的地方（$J>1$）看起来更密。`}>{R`n_{\rm g,obs}(\boldsymbol x_{\rm obs})=n_{\rm g}(\boldsymbol x)\,J`}</Eq>
        <Tx>{R`其中 Jacobian $J$ 为`}</Tx>
        <Eq n="11.10" keyEq title="Jacobian" say={R`$J$ 是真实体积与观测体积之比：只来自径向距离的伸缩 $dx/dx_{\rm obs}$ 与半径平方之比。`}>{R`J\equiv\left|\frac{d^3x}{d^3x_{\rm obs}}\right|=\left|\frac{dx}{dx_{\rm obs}}\right|\frac{x^2}{x_{\rm obs}^2}.`}</Eq>
        <Tx>{R`**线性化。**由此与 \eqref{11.5}，在 $\sym{ch11-dchi}{\delta\chi}$ 与 $u_\parallel$ 的线性阶，Jacobian 为`}</Tx>
        <Eq n="11.11" say={R`把 $x_{\rm obs}=x+\sym{ch11-dchi}{\delta\chi}+u_\parallel/aH$ 代入 \eqref{11.10}：第一个因子来自半径平方之比，第二个来自径向伸缩。`}>{R`J=\left(1+\frac{\sym{ch11-dchi}{\delta\chi}}{x}+\frac{u_\parallel}{aHx}\right)^{-2}\left|1+\frac{d}{dx}\sym{ch11-dchi}{\delta\chi}+\frac{1}{aH}\frac{\partial}{\partial x}u_\parallel\right|^{-1}.`}</Eq>
        <Tx>{R`**$\sym{ch11-dchi}{\delta\chi}$ 与 $u_\parallel$ 的关键区别**：前者只依赖红移（可以用 $x$ 作为它的代理），后者则作为三维位置的函数涨落。为了计算 $\sym{ch11-dchi}{\delta\chi}$ 的导数，利用`}</Tx>
        <Eq n="11.12" say={R`距离误差的径向导数等于哈勃率的相对误差：$d\chi/dz=1/H$，所以 $\sym{ch11-dchi}{\delta\chi}$ 的斜率由 $\delta(1/H)=1/H_{\rm fid}-1/H\simeq\sym{ch11-dH}{\delta H}/H^2$ 决定（真实宇宙膨胀得更快时，基准距离增长得更快）。`}>{R`\frac{d}{dx}\sym{ch11-dchi}{\delta\chi}=\frac{dz}{dx}\frac{d\sym{ch11-dchi}{\delta\chi}}{dz}=H\,\sym{ch11-dvar}{\delta}(H^{-1})=+H^{-1}\sym{ch11-dH}{\delta H},`}</Eq>
        <Tx>{R`其中 $\sym{ch11-dH}{\delta H}(z)=H(z)-H_{\rm fid}(z)$ 是真实与基准哈勃率之差（真实减基准；注意与 $\sym{ch11-dchi}{\delta\chi}$、$\sym{ch11-dvar}{\delta}(H^{-1})$ 的“基准减真实”相反），并多次用了 $dz/dx=dz/d\chi=H$。于是 \eqref{11.11} 变为`}</Tx>
        <Eq n="11.13" say={R`展开到一阶：Jacobian 分解为"只依赖红移的项与 $u_\parallel/aHx$"乘以"速度梯度项"。`}>{R`\begin{aligned}J&=\left(1+\frac{\sym{ch11-dchi}{\delta\chi}}{x}+\frac{u_\parallel}{aHx}\right)^{-2}\left|1+H^{-1}\sym{ch11-dH}{\delta H}+\frac{1}{aH}\frac{\partial}{\partial x}u_\parallel\right|^{-1}\\ &\simeq\left(1-2\frac{\sym{ch11-dchi}{\delta\chi}}{x}-H^{-1}\sym{ch11-dH}{\delta H}-2\frac{u_\parallel}{aHx}\right)\left(1-\frac{1}{aH}\frac{\partial}{\partial x}u_\parallel\right)\end{aligned}`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{11.12}–\eqref{11.14} 中 $H^{-1}\sym{ch11-dH}{\delta H}$ 的符号`}>{R`**原书印作** \eqref{11.12} 末项 $-H^{-1}\sym{ch11-dH}{\delta H}$，相应地 \eqref{11.13} 第一行为 $|1-H^{-1}\sym{ch11-dH}{\delta H}+\dots|^{-1}$、第二行为 $(\dots+H^{-1}\sym{ch11-dH}{\delta H}\dots)$，\eqref{11.14} 为 $\bar J=1-2\sym{ch11-dchi}{\delta\chi}/\bar\chi+H^{-1}\sym{ch11-dH}{\delta H}$。

**错在哪里。**原书对 $\sym{ch11-dchi}{\delta\chi}$ 用"基准减真实"（\eqref{11.2}），对 $\sym{ch11-dH}{\delta H}$ 却用"真实减基准"（$\sym{ch11-dH}{\delta H}=H-H_{\rm fid}$，这一定义在 \eqref{11.30}、\eqref{11.31}、\eqref{11.33} 中都被沿用，且与它们一致）。于是 $d\sym{ch11-dchi}{\delta\chi}/dz=1/H_{\rm fid}-1/H\simeq+\sym{ch11-dH}{\delta H}/H^2$，$\frac{d}{dx}\sym{ch11-dchi}{\delta\chi}=+H^{-1}\sym{ch11-dH}{\delta H}$；原书的负号对应的是相反的 $\delta H$ 约定。

**正确为**（上面各式已改）：\eqref{11.12} 末项 $+H^{-1}\sym{ch11-dH}{\delta H}$，$\bar J=1-2\sym{ch11-dchi}{\delta\chi}/\bar\chi-H^{-1}\sym{ch11-dH}{\delta H}$。

**验证。**由 \eqref{11.31} 直接算体积元之比：$\bar J=|d^3x/d^3x_{\rm obs}|=(1-\alpha_\perp)^2(1-\alpha_\parallel)\simeq1-2\alpha_\perp-\alpha_\parallel=1-2\sym{ch11-dchi}{\delta\chi}/\chi_{\rm fid}-\sym{ch11-dH}{\delta H}/H_{\rm fid}$，与改正后的 \eqref{11.14} 一致；这也正是 \eqref{11.34} 的前置因子 $\bar J(1+\alpha_\perp)^2(1+\alpha_\parallel)$ 化为 1 所需要的（照原书符号则剩下 $1+2\alpha_\parallel$）。由于下文先令 $\bar J=1$、后又只用到"前置因子为 1"，这一改正不影响本章其他结果。`}</Box>
        <Tx>{R`第二行丢掉了一些二阶项，并把 $\sym{ch11-dH}{\delta H}$ 项挪进了第一个括号。为什么可以这样做？看这一项和它前面的 $\sym{ch11-dchi}{\delta\chi}$ 项：它们只通过红移 $z$ 依赖 $|\boldsymbol x|$。若只看以 $\bar z$ 为中心的较窄红移片中的星系（通常就是这样做的，以避免星系族群随红移演化），就可以把 $x$ 取为 $\bar\chi=\chi(\bar z)$，即到红移片平均红移 $\bar z$ 的距离；$\sym{ch11-dchi}{\delta\chi}$、$\sym{ch11-dH}{\delta H}$、$H$ 也都可以在 $\bar z$ 处取值。这样这些项就只是一个常数前置因子。

**丢掉 $u_\parallel/aHx$。**接下来看 $u_\parallel/aHx$ 项。Kaiser 意识到，它在多数实际情形下很小。$u_\parallel/aH$ 是视向速度造成的表观位移；用线性理论代入数值，这个位移一般 $\lesssim10\,h^{-1}\mathrm{Mpc}$（\exref{11.3}；本页数值：今天的 RMS 值约 $3\,h^{-1}\mathrm{Mpc}$）。而 $x\sim\bar\chi$ 在当今星系巡天中至少有几百 Mpc。所以这一项很小，可以忽略。

**留下 $\partial u_\parallel/\partial x$。**含 $\partial u_\parallel/\partial x$ 的项**不能**这样处理：速度场在涨落，这一项实际上相当大——下一节马上会看到有多大。最终得到简化的 Jacobian：`}</Tx>
        <Eq n="11.14" keyEq title="简化 Jacobian" say={R`Jacobian 等于常数因子 $\bar J$（来自基准宇宙学误差）乘以 $(1-\partial_xu_\parallel/aH)$：后者是红移空间畸变的源头。`}>{R`J\simeq\bar J\left(1-\frac{1}{aH}\frac{\partial}{\partial x}u_\parallel\right);\qquad\bar J=1-2\frac{\sym{ch11-dchi}{\delta\chi}(\bar z)}{\bar\chi}-H^{-1}(\bar z)\,\sym{ch11-dH}{\delta H}(\bar z).`}</Eq>
        <Box kind="physics" title="为什么是速度梯度而不是速度">{R`把所有星系一起沿视线平移同样的距离，体积元不变、密度不变；只有当相邻星系的位移**不同**时，它们之间的距离才被压缩或拉伸。$\partial u_\parallel/\partial x$ 正是"相邻星系视向位移之差"。在过密区周围，近侧星系背离我们、远侧星系朝向我们：$\partial u_\parallel/\partial x<0$，于是 $J>1$，观测密度被**增大**。`}</Box>
        <Tx>{R`**观测过密度。**真实坐标与观测坐标中的数密度分别为 $n_{\rm g}=\bar n_{\rm g}(1+\delta_{\rm g})$ 与 $n_{\rm g,obs}=\bar n_{\rm g}(1+\delta_{\rm g,obs})$，其中 $\bar n_{\rm g}$ 是平均数密度。实际中 $\bar n_{\rm g}$ 是把红移片中所有星系数出来再除以体积得到的，这保证 $\delta_{\rm g,obs}$ 在整个巡天上的平均为零，正如所需。由 \eqref{11.9} 并展开到扰动的一阶，观测到的星系过密度为`}</Tx>
        <Eq n="11.15" keyEq title="观测过密度" say={R`观测过密度：$\bar J$ 乘以"1 加真实过密度、减视向速度梯度除以 $aH$"，右边都在观测点对应的**真实**位置上取值。`}>{R`1+\delta_{\rm g,obs}(\boldsymbol x_{\rm obs})=\bar J\left[1+\delta_{\rm g}(\boldsymbol x[\boldsymbol x_{\rm obs}])-\frac{1}{aH}\frac{\partial}{\partial x}u_\parallel(\boldsymbol x[\boldsymbol x_{\rm obs}])\right].`}</Eq>
        <Tx>{R`注意右边的星系密度与速度都在**真实**位置上取值。下面两个小节分别处理速度的效应（即 RSD）与错误宇宙学的效应。`}</Tx>
      </Sub>
      <Sub112 />
      <Sub113 />
    </Sec>);
}
