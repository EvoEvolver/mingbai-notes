// 补充材料 E_I、F_I：二维波包的横向尺寸；一维与三维问题的关系（式 EI-1 … FI-22）
// 讲法：E_I 从衍射之谜出发，再用三波模型解释；F_I 先回答"一维模型凭什么成立"，再推广波包理论到三维。
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { ThreeWavePacket } from "./_ch01c_plots.jsx";
import { WaveVectorFig, SlitDiffractionFig } from "./_ch01c_figs.jsx";

const R = String.raw;

export function SecE() {
  return (
    <Sec n="EI" title="A simple treatment of a two-dimensional wave packet" zh="二维波包：角弥散限制横向尺寸"
      gist={R`三列波矢大小相同、方向相差 $\pm\Delta\theta$ 的平面波叠加，在 $y=0$ 处同相、在 $y=\pm\Delta y/2$ 处相消，得到 $k\,\Delta\theta\,\Delta y=2\pi$，即 $\Delta y\cdot\Delta k_y=4\pi$：横向的"不确定关系"。`}
      why={R`正文的一维波包在横向是无限延展的平面；真实的束流总有有限宽度。本节用最小的模型说明：横向受限 ⇔ 波矢方向必须弥散——这也正是单缝衍射。`}
      gives={["EI-4", "EI-5", "EI-7", "EI-8", "EI-9"]}>
      <p className="muted">本节概念：<C id="wavepacket" /> · <C id="uncertainty" /></p>
      <Sub n="EI-1" title="Introduction" zh="问题：一束有宽度的波">
        <Tx>{R`**从一个熟悉的现象说起。**让平面波穿过一条宽 $\Delta y$ 的狭缝，出射波会张开成一个扇面——这是中学就学过的单缝衍射，扇面的半角宽约 $\lambda/\Delta y$。缝越窄，张得越开。`}</Tx>
        <SlitDiffractionFig />
        <Tx>{R`这件事和波包有什么关系？正文 \mainsec{C-2} 里，所有平面波都沿 $Ox$ 传播 [\mainref{C-7}]，叠加出的波包沿 $x$ 有限长，在 $y$、$z$ 方向却处处相同——一张无限大的"波片"。真实的粒子束总有有限的横截面，所以我们需要知道：**怎样的叠加才能让波包在横向也收拢？**答案正是衍射所暗示的：让波矢的**方向**有一点弥散。下面用正文中"三列波"的同样手法，把这句话变成一个算得出来的式子。`}</Tx>
      </Sub>
      <Sub n="EI-2" title="Angular dispersion and lateral dimensions" zh="三列波的模型与结果">
        <Tx>{R`**搭模型。**在 $xOy$ 平面里放三个波矢：$\mathbf k_1$ 沿 $Ox$，$\mathbf k_2$、$\mathbf k_3$ 分别向上、向下偏一个小角 $\Delta\theta$，并让三者沿 $Ox$ 的投影一样长：`}</Tx>
        <WaveVectorFig />
        <Eq n="EI-1" say={R`三个波矢沿 $x$ 的分量相同，都约等于 $k$（长度只差 $\Delta\theta$ 的二阶小量）。`}>{R`k_{1x}\simeq k_{2x}=k_{3x}\simeq|\mathbf k_1|=k`}</Eq>
        <Tx>{R`偏转只带来 $\Delta\theta^2$ 量级的长度差，可以不计；真正的区别在 $y$ 分量：`}</Tx>
        <Eq n="EI-2" say={R`中间的波矢没有 $y$ 分量，两侧的波矢 $y$ 分量为 $\pm k\Delta\theta$。`}>{R`\begin{cases}k_{1y}=0\\ k_{2y}=-k_{3y}\simeq k\,\Delta\theta\end{cases}`}</Eq>
        <Tx>{R`振幅取实数，中间强、两边弱，比例 $1:\frac12:\frac12$：`}</Tx>
        <Eq n="EI-3" say="两侧两列波的振幅取为中间那列的一半，模仿一个在中心有峰的分布。">{R`g(\mathbf k_2)=g(\mathbf k_3)=\frac12g(\mathbf k_1)`}</Eq>
        <Tx>{R`为什么是这个比例？把它想成对一个连续分布的"三点采样"：所有波矢垂直于 $Oz$、$x$ 分量相同，只有 $k_y$ 在变，$|g|$ 作为 $k_y$ 的函数有一个峰（\mainref{C-6} 那样的真实波包）。三个采样点落在峰顶和左右两个半高点上，于是半高全宽就是两侧采样点的间距，与总角弥散 $2\Delta\theta$ 的关系为`}</Tx>
        <Eq n="EI-4" say={R`波矢 $y$ 分量的分布宽度等于 $k$ 乘以总角弥散 $2\Delta\theta$。`}>{R`\Delta k_y=2k\Delta\theta`}</Eq>
        <Tx>{R`**叠加，用 Euler 公式合并两侧的波。**`}</Tx>
        <Eq n="EI-5" say={R`三列平面波叠加后，沿 $x$ 仍是一列行波 $\mathrm e^{ikx}$，但振幅被横向调制为 $1+\cos(k\Delta\theta\,y)$：在 $y=0$ 最大，离轴后减弱。`}>{R`\begin{aligned}\psi(x,y)&=\sum_{i=1}^{3}g(\mathbf k_i)\,\mathrm e^{i\mathbf k_i\cdot\mathbf r}\\&=g(\mathbf k_1)\left[\mathrm e^{ikx}+\frac12\,\mathrm e^{i(kx+k\,\Delta\theta\,y)}+\frac12\mathrm e^{i(kx-k\,\Delta\theta\,y)}\right]\\&=g(\mathbf k_1)\,\mathrm e^{ikx}\left[1+\cos(k\,\Delta\theta\,y)\right]\end{aligned}`}</Eq>
        <Tx>{R`读这个结果：沿 $x$ 仍是一列普通的行波 $\mathrm e^{ikx}$；所有的"新东西"都在方括号里——一个只依赖 $y$ 的包络（与 $z$ 无关，故称"二维"波包）。包络在 $y=0$ 处取最大值 2，然后下降，第一次降到零的位置记为 $y=\pm\Delta y/2$：`}</Tx>
        <Eq n="EI-6" say="波包横向第一次降为零的位置：两侧两列波与中间波恰好反相，1+cos 等于零。">{R`\cos\left(k\,\Delta\theta\,\frac{\Delta y}{2}\right)=-1`}</Eq>
        <Eq n="EI-7" keyEq title="角弥散—横向宽度" say={R`横向宽度与角弥散成反比：$\Delta\theta$ 越小，波包在横向就越宽。`}>{R`k\,\Delta\theta\,\Delta y=2\pi`}</Eq>
        <Tx>{R`几何图像也很清楚：三族等相位线在 $Ox$ 轴上交于同一点，三列波同相相长；离轴越远，两侧的倾斜波前与中间的竖直波前错开越多，到 $\pm\Delta y/2$ 处恰好错开半个波长、反相相消。用 \eqref{EI-4} 把角度换成 $\Delta k_y$，得到与正文 \mainref{C-11} 同形的关系：`}</Tx>
        <Eq n="EI-8" say={R`横向宽度与横向波数弥散之积为常数 $4\pi$：这就是横向的“不确定关系”。`}>{R`\Delta y\cdot\Delta k_y=4\pi`}</Eq>
        <ThreeWavePacket />
        <Box kind="note" title={R`为什么这里是 $4\pi$ 而不是 $\gtrsim1$？`}>{R`三波模型的包络 $1+\cos(k\Delta\theta y)$ 是周期函数：到 $y=\pm2\pi/(k\Delta\theta)$ 又回到最大值。这是只取三个离散 $k_y$ 的人为后果；交互图里换成连续分布，复现的峰就消失了，只剩中间一束。具体的数字因子（$4\pi$、$1$、$\frac12$……）取决于"宽度"怎么定义，有物理意义的只是：**乘积不能小于 1 的量级**。`}</Box>
      </Sub>
      <Sub n="EI-3" title="Discussion" zh="回到狭缝">
        <Tx>{R`现在把开头的现象倒过来看。一列平面波本来没有角弥散，横向无限宽；用狭缝把它截到宽 $\Delta y$，等于强行造出一个横向受限的波包，而 \eqref{EI-7} 说这样的波包**必须**含有方向弥散——出射波只能张开。衍射的角宽度为`}</Tx>
        <Eq n="EI-9" say={R`宽为 $\Delta y$ 的狭缝产生的衍射角宽度约为 $2\lambda/\Delta y$：缝越窄，出射方向越散。`}>{R`2\,\Delta\theta\simeq2\,\frac{\lambda}{\Delta y}`}</Eq>
        <Tx>{R`其中 $\lambda=2\pi/|\mathbf k|$。把 $\lambda$ 代进去，它就是 \eqref{EI-7}。所以**单缝衍射就是横向的不确定关系**：光学家早已熟悉的现象，换上量子语言后对电子、中子同样成立。`}</Tx>
      </Sub>
    </Sec>);
}

export function SecF() {
  return (
    <Sec n="FI" title="The relationship between one- and three-dimensional problems" zh="一维模型的三维依据"
      gist={R`(1) 势能可分离 $V=V_1(x)+V_2(y)+V_3(z)$ 时，本征方程分解为三个一维方程，$E=E_1+E_2+E_3$——这正是一维模型的依据；(2) 三维波包：中心 $\mathbf r_M=-[\nabla_{\mathbf k}\alpha]_{\mathbf k_0}$，各方向都满足 $\Delta x_i\Delta p_i\gtrsim\hbar$，群速度 $\hbar\mathbf k_0/m$。`}
      why={R`正文一直用一维模型而没有严格论证。本节说明在什么条件下一维处理是精确的而不仅仅是近似，并把正文 §C 的波包结论推广到三维。`}
      gives={["FI-4", "FI-11", "FI-14", "FI-17", "FI-20", "FI-22"]}>
      <p className="muted">本节概念：<C id="separation" /> · <C id="wavepacket" /> · <C id="stationary_phase" /></p>
      <Tx>{R`**一个被搁置的问题。**正文的 Schrödinger 方程 \mainref{D-1} 写的是三维的 $\psi(\mathbf r)$，可此后几乎所有例子都只有一个 $x$。读者有理由怀疑：把空间压成一条线，丢掉了什么？本节分两步回答。先看定态：对哪一类势，三维问题**严格地**等于一维问题？再看波包：正文对一维波包的结论（中心、宽度、群速度）在三维中长什么样？`}</Tx>
      <Sub n="FI-2" title="Justification of one-dimensional models" zh="一、可分离势：一维模型严格成立的条件">
        <Tx>{R`势能不含时，正文 \mainsec{D-1} 已经把时间分离出去，剩下本征方程 \mainref{D-8}。如果势能恰好是三个坐标各自的函数之和，`}</Tx>
        <Eq n="FI-18" say="势能是三个分别只依赖 x、y、z 的函数之和——这是能够分离变量的条件。">{R`V(\mathbf r)=V(x,y,z)=V_1(x)+V_2(y)+V_3(z)`}</Eq>
        <Tx>{R`那么 Hamilton 量本身就是三个互不相干的一维 Hamilton 量之和。这暗示解可以是乘积：`}</Tx>
        <Eq n="FI-19" say="尝试把三维定态写成三个一维函数之积。">{R`\varphi(x,y,z)=\varphi_1(x)\times\varphi_2(y)\times\varphi_3(z)`}</Eq>
        <Derivation title="分离变量" steps={[
          { tex: R`\left[-\frac{\hbar^2}{2m}\nabla^2+V_1+V_2+V_3\right]\varphi_1\varphi_2\varphi_3=E\,\varphi_1\varphi_2\varphi_3`, why: R`代入本征方程。` },
          { tex: R`\frac{1}{\varphi_1}\Big[-\frac{\hbar^2}{2m}\varphi_1''+V_1\varphi_1\Big]+\frac{1}{\varphi_2}\Big[-\frac{\hbar^2}{2m}\varphi_2''+V_2\varphi_2\Big]+\frac{1}{\varphi_3}\Big[-\frac{\hbar^2}{2m}\varphi_3''+V_3\varphi_3\Big]=E`, why: R`两边除以 $\varphi_1\varphi_2\varphi_3$。` },
          { tex: R`\text{第一项只依赖 }x,\ \text{第二项只依赖 }y,\ \text{第三项只依赖 }z\ \Rightarrow\ \text{各自为常数 }E_1,E_2,E_3`, why: R`固定 $y,z$ 而改变 $x$，和不变，所以第一项不能随 $x$ 变；其余同理。` },
        ]} />
        <Tx>{R`于是每个因子各自满足一个一维本征方程，例如 $x$ 方向：`}</Tx>
        <Eq n="FI-20" say="x 方向的因子满足一个一维本征方程，本征值 E1 是“分配给 x 方向”的能量。">{R`\left[-\frac{\hbar^2}{2m}\frac{\mathrm d^2}{\mathrm dx^2}+V_1(x)\right]\varphi_1(x)=E_1\,\varphi_1(x)`}</Eq>
        <Tx>{R`（$y$、$z$ 方向把 $V_1,E_1$ 换成 $V_2,E_2$ 或 $V_3,E_3$。）三个"分配能"加起来才是总能量：`}</Tx>
        <Eq n="FI-21" say="总能量是三个方向分离能量之和。">{R`E=E_1+E_2+E_3`}</Eq>
        <Tx>{R`乘积解是否就是全部？可以证明（第 II 章 §F-4-a-$\beta$）：势具有 \eqref{FI-18} 的形式时，**任何**本征解都是这些乘积解的线性组合，所以没有遗漏。

**最常见的特例：势只依赖 $x$。**此时 $V_2=V_3=0$，$y$、$z$ 方向是自由粒子，解为平面波 $\mathrm e^{ik_y\cdot y}$、$\mathrm e^{ik_z\cdot z}$（正文 \mainsec{C-1}），能量直接写得出来：`}</Tx>
        <Eq n="FI-22" keyEq title="一维模型的总能量" say="势只依赖 x 时，总能量 = x 方向一维问题的能量 + y、z 方向自由运动的动能。">{R`E=E_1+\frac{\hbar^2}{2m}\left[k_y^2+k_z^2\right]`}</Eq>
        <Tx>{R`所有非平凡的物理都集中在 \eqref{FI-20} 里。这就是"一维模型"的确切含义：**三维粒子在只依赖 $x$ 的势中运动，横向是自由的**。正文的方势、本页 $\mathrm{H}_{\rm I}$、$\mathrm{J}_{\rm I}$ 的一切计算都应这样理解——它们不是近似，而是严格约化。`}</Tx>
        <Box kind="physics" title="斜入射：可分离性的一个直接用途">{R`粒子斜着射向只依赖 $x$ 的势阶时，$k_y$ 守恒，$x$ 方向就是一维问题，只是"有效能量"换成 $E_1=E-\hbar^2k_y^2/2m$。$\mathrm{K}_{\rm I}$ 习题 8 的斜反射正是这样处理的。`}</Box>
      </Sub>
      <Sub n="FI-1" title="Three-dimensional wave packet" zh="二、三维波包">
        <Tx>{R`**最简单的情形：自由且可分离。**若 $V\equiv0$，波包就是正文 \mainref{C-6}：`}</Tx>
        <Eq n="FI-1" say={R`自由粒子的三维波包：波矢为 $\mathbf k$ 的平面波以振幅 $g(\mathbf k)$ 叠加，每列波按各自的频率 $\omega(\mathbf k)$ 演化。`}>{R`\psi(\mathbf r,t)=\frac1{(2\pi)^{3/2}}\int g(\mathbf k)\,\mathrm e^{i[\mathbf k\cdot\mathbf r-\omega(\mathbf k)t]}\,\mathrm d^3k`}</Eq>
        <Tx>{R`再假设振幅本身是乘积，`}</Tx>
        <Eq n="FI-2" say="假设波矢分布可以分解为三个分量各自分布的乘积。">{R`g(\mathbf k)=g_1(k_x)\times g_2(k_y)\times g_3(k_z)`}</Eq>
        <Tx>{R`而自由粒子的色散关系本来就是三项之和，`}</Tx>
        <Eq n="FI-3" say="自由粒子的角频率是三个方向波数平方之和的 ħ/2m 倍——它本身也是“可分离”的。">{R`\omega(\mathbf k)=\frac{\hbar\mathbf k^2}{2m}=\frac\hbar{2m}(k_x^2+k_y^2+k_z^2)`}</Eq>
        <Tx>{R`指数把和变成积，被积函数整个拆成三个因子，三重积分随之拆成三个一维积分：`}</Tx>
        <Eq n="FI-4" say="在这种可分离情形下，三维波包就是三个一维波包的乘积，各自独立演化。">{R`\psi(\mathbf r,t)=\psi_1(x,t)\times\psi_2(y,t)\times\psi_3(z,t)`}</Eq>
        <Eq n="FI-5" say="x 方向的因子正是一个标准的一维自由波包，色散关系只含 kx。">{R`\begin{cases}\psi_1(x,t)=\dfrac1{\sqrt{2\pi}}\displaystyle\int_{-\infty}^{+\infty}g_1(k_x)\,\mathrm e^{i[k_x\cdot x-\omega(k_x)t]}\,\mathrm dk_x\\ \omega(k_x)=\dfrac{\hbar k_x^2}{2m}\end{cases}`}</Eq>
        <Tx>{R`$\psi_2,\psi_3$ 同形。这和上面定态的分离如出一辙：三个方向各演各的戏。

**一般情形：只假设 $g$ 有尖峰。**势任意时没有 \eqref{FI-1}，但任何时刻都可以做 Fourier 展开，把全部动力学藏进系数的时间依赖：`}</Tx>
        <Eq n="FI-6" say="任意时刻的波函数都可以展开成平面波；所有动力学（包括势能的影响）都藏在系数 g(k,t) 的时间依赖里。">{R`\psi(\mathbf r,t)=\frac1{(2\pi)^{3/2}}\int g(\mathbf k,t)\,\mathrm e^{i\mathbf k\cdot\mathbf r}\,\mathrm d^3k`}</Eq>
        <Tx>{R`我们不要求 $g$ 可分离，只要求 $|g(\mathbf k,t)|$ 集中在 $\mathbf k_0$ 周围、尺寸为 $\Delta k_x,\Delta k_y,\Delta k_z$ 的小区域 $D_k$ 中。把模与相位分开，`}</Tx>
        <Eq n="FI-7" say={R`把振幅写成模乘相位因子，$\alpha$ 是分量 $\mathbf k$ 自带的相位。`}>{R`g(\mathbf k,t)=|g(\mathbf k,t)|\,\mathrm e^{i\alpha(\mathbf k,t)}`}</Eq>
        <Tx>{R`每列分波在点 $\mathbf r$ 的总相位就是`}</Tx>
        <Eq n="FI-8" say={R`每列平面波在点 $\mathbf r$ 的相位 $=$ 振幅自带的相位 $\alpha$ + 传播相位 $\mathbf k\cdot\mathbf r$。`}>{R`\xi(\mathbf k,\mathbf r,t)=\alpha(\mathbf k,t)+k_x\cdot x+k_y\cdot y+k_z\cdot z`}</Eq>
        <Tx>{R`**稳相：哪里所有分波步调一致？**在 $D_k$ 内 $\xi$ 几乎不变的点，分波同相相加，$|\psi|$ 最大。$D_k$ 很小，把 $\xi$ 对 $\delta\mathbf k=\mathbf k-\mathbf k_0$ 展开到一阶：`}</Tx>
        <Eq n="FI-9" say={R`相位在波矢域内的变化，到一阶由三个偏导数分别乘以 $\delta\mathbf k$ 的分量给出。`}>{R`\delta\xi(\mathbf k,\mathbf r,t)\simeq\delta k_x\left[\frac{\partial}{\partial k_x}\xi(\mathbf k,\mathbf r,t)\right]_{\mathbf k=\mathbf k_0}+\delta k_y\left[\frac{\partial}{\partial k_y}\xi(\mathbf k,\mathbf r,t)\right]_{\mathbf k=\mathbf k_0}+\delta k_z\left[\frac{\partial}{\partial k_z}\xi(\mathbf k,\mathbf r,t)\right]_{\mathbf k=\mathbf k_0}`}</Eq>
        <Tx>{R`用 $\mathbf k$ 空间的梯度 $\nabla_{\mathbf k}$ 写得紧凑些，并注意 $\nabla_{\mathbf k}(\mathbf k\cdot\mathbf r)=\mathbf r$：`}</Tx>
        <Eq n="FI-10" say={R`相位变化 = $\delta\mathbf k$ 点乘（位置 $\mathbf r$ 加上振幅相位对 $\mathbf k$ 的梯度）。`}>{R`\begin{aligned}\delta\xi(\mathbf k,\mathbf r,t)&\simeq\delta\mathbf k\cdot\left[\nabla_{\mathbf k}\,\xi(\mathbf k,\mathbf r,t)\right]_{\mathbf k=\mathbf k_0}\\&\simeq\delta\mathbf k\cdot\left[\mathbf r+\left[\nabla_{\mathbf k}\,\alpha(\mathbf k,t)\right]_{\mathbf k=\mathbf k_0}\right]\end{aligned}`}</Eq>
        <Tx>{R`对任意方向的 $\delta\mathbf k$ 都为零，方括号必须为零——这就定出了波包中心：`}</Tx>
        <Eq n="FI-11" keyEq title="三维波包中心" say={R`波包中心位于振幅相位对波矢梯度的负值处：所有分波在这里同相，$|\psi|$ 最大。`}>{R`\mathbf r=\mathbf r_M(t)=-\left[\nabla_{\mathbf k}\,\alpha(\mathbf k,t)\right]_{\mathbf k=\mathbf k_0}`}</Eq>
        <Tx>{R`它是正文 \mainref{C-15} 的三维版本。**离中心多远分波就互相抵消？**令 $\delta\mathbf r=\mathbf r-\mathbf r_M$，\eqref{FI-10} 化为`}</Tx>
        <Eq n="FI-12" say={R`以波包中心为参考，相位在波矢域内的变化就是 $\delta\mathbf k\cdot\delta\mathbf r$。`}>{R`\delta\xi(\mathbf k,\mathbf r,t)\simeq\delta\mathbf k\cdot\delta\mathbf r`}</Eq>
        <Tx>{R`当这个相位差在 $D_k$ 内扫过约 1 弧度（宽松点说，$2\pi$ 的量级），分波就失去同相。因为 $\delta\mathbf k\cdot\delta\mathbf r$ 是三项之和，每个方向独立给出一个条件：`}</Tx>
        <Eq n="FI-13" say="三个方向各自满足：位置宽度乘波数宽度至少为 1 的量级。">{R`\begin{cases}\Delta x\ .\ \Delta k_x\gtrsim1\\ \Delta y\ .\ \Delta k_y\gtrsim1\\ \Delta z\ .\ \Delta k_z\gtrsim1\end{cases}`}</Eq>
        <Tx>{R`乘以 $\hbar$（$\mathbf p=\hbar\mathbf k$）：`}</Tx>
        <Eq n="FI-14" keyEq title="三维 Heisenberg 关系" say="不确定关系对每个直角分量分别成立：同一方向的位置与动量不能同时确定。">{R`\begin{aligned}\Delta x\ .\ \Delta p_x&\gtrsim\hbar\\ \Delta y\ .\ \Delta p_y&\gtrsim\hbar\\ \Delta z\ .\ \Delta p_z&\gtrsim\hbar\end{aligned}`}</Eq>
        <Tx>{R`这是 \mainref{C-23} 的推广。值得强调的是配对方式：只有**同一方向**的位置与动量互相制约；$x$ 与 $p_y$ 可以同时任意精确。$\mathrm{E}_{\rm I}$ 的横向关系正是其中 $y$ 方向那一条。

**中心怎么动？**对 \eqref{FI-11} 求时间导数即得群速度：`}</Tx>
        <Eq n="FI-15" say="波包中心的速度 $=$ 振幅相位梯度随时间变化率的负值。">{R`\mathbf V_G=-\frac{\mathrm d}{\mathrm dt}\left[\nabla_{\mathbf k}\,\alpha(\mathbf k,t)\right]_{\mathbf k=\mathbf k_0}`}</Eq>
        <Tx>{R`对自由波包（不必可分离），比较 \eqref{FI-6} 与 \eqref{FI-1}，每个分量的相位都按自己的频率均匀转动：`}</Tx>
        <Eq n="FI-16" say="自由波包每个分量的相位随时间线性减少，斜率就是该分量的角频率。">{R`\alpha(\mathbf k,t)=\alpha(\mathbf k,0)-\omega(\mathbf k)\,t`}</Eq>
        <Eq n="FI-17" say="自由波包的中心以 ħk0/m 匀速运动，与经典粒子速度 p/m 完全一致。">{R`\mathbf V_G=\left[\nabla_{\mathbf k}\,\omega(\mathbf k)\right]_{\mathbf k=\mathbf k_0}=\frac{\hbar\mathbf k_0}{m}`}</Eq>
        <Tx>{R`波包中心像经典粒子一样以 $\mathbf p_0/m$ 匀速运动（\mainref{C-31} 的推广）。这一节的稳相论证在后面还会两次登场：$\mathrm{G}_{\rm I}$ 用它核对高斯波包的速度，$\mathrm{J}_{\rm I}$ 用它算出反射波包的延迟。`}</Tx>
      </Sub>
    </Sec>);
}
