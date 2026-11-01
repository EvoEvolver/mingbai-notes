import { LensingSmoothingRedraw } from "./_ch14_redraw.jsx";
// §13.3 CMB lensing —— 式 (13.18)–(13.23)，图 13.6；§13.4 Galaxy shapes —— 式 (13.24)–(13.40)
import { Sec, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { ShearDistortion } from "./_ch13_plots.jsx";

const R = String.raw;

export function Sec133() {
  return (
    <Sec n="13.3" title="CMB lensing" zh="CMB 透镜"
      gist={R`CMB 温度场被重映射：$T_{\rm obs}(\boldsymbol\theta)=T_{\rm true}(\boldsymbol\theta+\Delta\boldsymbol\theta)$。展开到 $\phi_{\rm L}$ 的二阶并取对角相关，得到透镜后的功率谱 \eqref{13.21}：$C^{(13)}$ 项整体抹平，$C^{(22)}$ 项卷积抹平声学峰并给阻尼尾加功率。非对角相关 \eqref{13.23} 不为零，二次估计量据此重建透镜势。`}
      why={R`CMB 是一个已知统计性质的连续"背景光源"，描述它的透镜所需的形式最少；而且 CMB 透镜的杠杆臂最长，信号最大。`}
      gives={["13.18", "13.19", "13.20", "13.21", "13.22", "13.23"]}>
      <p className="muted">本节概念：<C id="cmblens" /> · <C id="sb" /> · <C id="deflection" /></p>
      <Tx>{R`**打破历史顺序。**引力透镜最初是针对星系这类离散天体的光设想的，下一节就讲这个。很久以后，宇宙学家才意识到像 CMB 这样的弥散场同样会被透镜。事实上描述 CMB 透镜需要的形式更少，所以我们打破历史顺序，先讲透镜对 CMB 的影响。

**重映射温度场。**对 CMB，\eqref{13.3} 中强度对方向的依赖全部包含在温度里。因此这个等式化为：位置 $\boldsymbol\theta$ 处的观测温度等于 $\boldsymbol\theta_S=\boldsymbol\theta+\Delta\boldsymbol\theta$ 处的未透镜温度。Taylor 展开得`}</Tx>
      <Eq n="13.18" keyEq title="CMB 温度的重映射" say={R`观测到的温度就是"挪了位"的原初温度；展开到偏折的二阶，二阶项是算功率谱修正所必需的。`}>{R`\begin{aligned}T_{\rm obs}(\boldsymbol\theta) &= T_{\rm true}(\boldsymbol\theta+\Delta\boldsymbol\theta[\boldsymbol\theta])\\ &\simeq T_{\rm true}(\boldsymbol\theta)+\Delta\theta^i\frac{\partial}{\partial\theta^i}T_{\rm true}(\boldsymbol\theta)+\frac12\Delta\theta^i\Delta\theta^j\frac{\partial^2}{\partial\theta^i\partial\theta^j}T_{\rm true}(\boldsymbol\theta),\end{aligned}`}</Eq>
      <Tx>{R`这里展开到小偏折的**二阶**（马上会看到为什么需要），源距离取 $\chi=\chi_*$，即到最后散射面的距离。现在可以仿照 \secref{12.2} 中非线性物质密度的做法，由 $T_{\rm true}$ 与 $\phi_{\rm L}$ 的统计推出 $T_{\rm obs}$ 的统计。

**平均温度不变。**首先注意 CMB 的平均温度不被透镜改变：透镜只是把到达方向洗牌，不改变面亮度。所以可以把 \eqref{13.18} 两边除以平均温度再减 1，改用 $\Theta_{\rm obs}$ 与 $\Theta_{\rm true}\equiv\Theta$（下面为清楚起见省去未透镜 $\Theta$ 的下标 true——它就是第 9 章算出演化的那个 $\Theta$）。然后转到多极空间，全程采用平直天空近似，并利用`}</Tx>
      <Eq n="13.19" say={R`Fourier 空间里求梯度就是乘以 $i\boldsymbol l$：偏折场的每个 Fourier 模都平行于它的波矢（纯梯度场）。`}>{R`\Delta\boldsymbol\theta(\boldsymbol l) = i\boldsymbol l\,\phi_{\rm L}(\boldsymbol l),`}</Eq>
      <Tx>{R`即 \eqref{13.15} 的 Fourier 空间形式。\eqref{13.18} 变为`}</Tx>
      <Eq n="13.20" say={R`透镜后的温度模 = 原模 + 一阶项（透镜模与温度模的卷积）+ 二阶项（两个透镜模与一个温度模的卷积）；Dirac $\delta$ 函数保证波矢守恒。`}>{R`\begin{aligned}\Theta_{\rm obs}(\boldsymbol l) &= \Theta(\boldsymbol l)-\int\frac{d^2l_1}{(2\pi)^2}\int\frac{d^2l_2}{(2\pi)^2}(2\pi)^2\delta_{\rm D}^{(2)}(\boldsymbol l_1+\boldsymbol l_2-\boldsymbol l)\,\boldsymbol l_1\cdot\boldsymbol l_2\,\phi_{\rm L}(\boldsymbol l_1)\,\Theta(\boldsymbol l_2)\\ &\quad+\frac12\int\frac{d^2l_1}{(2\pi)^2}\int\frac{d^2l_2}{(2\pi)^2}\int\frac{d^2l_3}{(2\pi)^2}(2\pi)^2\delta_{\rm D}^{(2)}(\boldsymbol l_1+\boldsymbol l_2+\boldsymbol l_3-\boldsymbol l)\\ &\qquad\times(\boldsymbol l_1\cdot\boldsymbol l_3)\phi_{\rm L}(\boldsymbol l_1)\,(\boldsymbol l_2\cdot\boldsymbol l_3)\phi_{\rm L}(\boldsymbol l_2)\,\Theta(\boldsymbol l_3).\end{aligned}`}</Eq>
      <Derivation title={R`从 \eqref{13.18} 到 \eqref{13.20}`} collapsed steps={[
        { tex: R`X(\boldsymbol\theta)=\int\frac{d^2l}{(2\pi)^2}e^{i\boldsymbol l\cdot\boldsymbol\theta}X(\boldsymbol l),\qquad \frac{\partial}{\partial\theta^j}\to il_j`, why: R`平直天空的 Fourier 约定。` },
        { tex: R`\Delta\theta^i\partial_i\Theta \to \int\!\!\int (i l_1^i\phi_{\rm L}(\boldsymbol l_1))(il_{2,i}\Theta(\boldsymbol l_2))\,e^{i(\boldsymbol l_1+\boldsymbol l_2)\cdot\boldsymbol\theta} = -\int\!\!\int\boldsymbol l_1\cdot\boldsymbol l_2\,\phi_{\rm L}(\boldsymbol l_1)\Theta(\boldsymbol l_2)\,e^{i(\boldsymbol l_1+\boldsymbol l_2)\cdot\boldsymbol\theta}`, why: R`乘积变卷积；$i\cdot i=-1$ 给出负号。` },
        { tex: R`\int d^2\theta\,e^{-i\boldsymbol l\cdot\boldsymbol\theta}e^{i(\boldsymbol l_1+\boldsymbol l_2)\cdot\boldsymbol\theta}=(2\pi)^2\delta_{\rm D}^{(2)}(\boldsymbol l_1+\boldsymbol l_2-\boldsymbol l)`, why: R`取模 $\boldsymbol l$。` },
        { tex: R`\tfrac12\Delta\theta^i\Delta\theta^j\partial_i\partial_j\Theta\to\tfrac12\,(i)^4\,(\boldsymbol l_1\cdot\boldsymbol l_3)(\boldsymbol l_2\cdot\boldsymbol l_3)\phi_{\rm L}(\boldsymbol l_1)\phi_{\rm L}(\boldsymbol l_2)\Theta(\boldsymbol l_3)`, why: R`四个 $i$ 相乘为 $+1$。` },
      ]} />
      <Tx>{R`**类比非线性物质谱。**现在可以计算 $\Theta_{\rm obs}(\boldsymbol l)$ 的角功率谱，与微扰论中从密度场的二阶、三阶项（\eqref{12.40}）推出次领头阶物质功率谱 \eqref{12.48} 完全类似：结果由两个二次项的耦合（"22"）与线性项 $\Theta(\boldsymbol l)$ 和三次项的耦合（"13"）组成。与非线性物质密度的两点不同：第一，这里是二维而不是三维；第二，$\phi_{\rm L}$ 与 $\Theta$ **不相关**——因为 $\phi_{\rm L}$ 来自源附近（$\Theta$ 的产生处）的贡献被压低了，正如上一节所见。这一事实反而简化了推导。在 \exref{13.2} 中可以证明 $\Theta_{\rm obs}$ 的功率谱为`}</Tx>
      <Eq n="13.21" keyEq title="透镜后的 CMB 温度谱" say={R`透镜后的谱 = 原谱 + 卷积项 $C^{(22)}$（把功率在不同 $l$ 之间搬运、抹平峰谷）+ 整体抹平项 $2C^{(13)}$（$\propto-l^2C$）。`}>{R`\begin{aligned}C^{\rm obs}(l) &= C(l)+C^{(22)}(l)+2C^{(13)}(l)\\ C^{(22)}(l) &= \int\frac{d^2l_1}{(2\pi)^2}\left[\boldsymbol l_1\cdot(\boldsymbol l-\boldsymbol l_1)\right]^2C_{\phi_{\rm L}\phi_{\rm L}}(l_1)\,C(|\boldsymbol l-\boldsymbol l_1|).\\ C^{(13)}(l) &= -\frac14\left[\int\frac{d^2l_1}{(2\pi)^2}l_1^2C_{\phi_{\rm L}\phi_{\rm L}}(l_1)\right]l^2C(l)\end{aligned}`}</Eq>
      <Tx>{R`这里透镜势的功率谱由下式定义：`}</Tx>
      <Eq n="13.22" say={R`透镜势的角功率谱：不同 $\boldsymbol l$ 的模互不相关，方差为 $C_{\phi_{\rm L}\phi_{\rm L}}(l)$。`}>{R`\left\langle\phi_{\rm L}(\boldsymbol l)\phi_{\rm L}^*(\boldsymbol l')\right\rangle = (2\pi)^2\delta_{\rm D}^{(2)}(\boldsymbol l-\boldsymbol l')\,C_{\phi_{\rm L}\phi_{\rm L}}(l).`}</Eq>
      <Tx>{R`它的推导留到 \secref{13.5}，但 \figref{13.7} 已画出了它（乘以前因子 $l^4/4$）。

**两个效应。**\eqref{13.21} 中的 (13) 项对应功率的**阻尼**：可以写成 $C(l)+2C^{(13)}(l)=(1-l^2/l_{\rm lens}^2)C(l)$。因子 $l_{\rm lens}^{-2}$ 正比于方均位移的平方，所以可以把它理解为随机透镜偏折对观测温度分布的抹平。(22) 项则把未透镜谱与透镜偏折谱做卷积，实际效果是抹平 $C(l)$ 的峰。它还会给极小尺度上的 CMB 各向异性**增加**功率：第 9 章看到，当 $l\gg l_D$（角阻尼尺度）时原初 CMB 各向异性被指数压低；而 (22) 项中的积分把功率从大尺度转移到小尺度，于是在阻尼区透镜后的温度各向异性实际上比原初的更大。`}</Tx>
      <Box kind="physics" title={R`量级：方均根偏折与 $l_{\rm lens}$`}>{R`比较 \eqref{13.21} 与偏折场的方差：$\langle|\Delta\boldsymbol\theta|^2\rangle=\int\frac{d^2l}{(2\pi)^2}l^2C_{\phi_{\rm L}\phi_{\rm L}}(l)$，所以 $l_{\rm lens}^{-2}=\frac12\langle|\Delta\boldsymbol\theta|^2\rangle$。用基准宇宙学（Halofit 非线性谱、Limber 近似）数值计算得方均根偏折 $\approx2.4'$，于是 $l_{\rm lens}\approx2000$。偏折虽然只有几角分，但它的功率 $l^4C_{\phi_{\rm L}\phi_{\rm L}}$ 集中在 $l\sim40$–$60$，即**相干尺度达数度**：在比几度小得多的小块天区上，透镜近似是一个整体平移加一个均匀的会聚与剪切。这正是 \exref{13.7} 要你得出的结论。`}</Box>
      <Figure n="13.6" illustration={<LensingSmoothingRedraw />} width="100%" caption={R`原创一维高斯谱混合模型，解释峰谷被抹平及小尺度功率再分配；不是二维透镜积分的精算预言。`} />
      <Tx>{R`两种效应在 \figref{13.6} 中都可见，它同时画出透镜后与原初的温度功率谱（CMB 透镜已纳入 CAMB 与 CLASS 等 Boltzmann 程序）。但只有看相对差（下图）才真正明显：峰被抹平导致一个与 $C(l)$ 本身**反号**的振荡图样，$C^{\rm obs}(l)$ 小尺度功率的增加也清晰可见。尽管效应很小，它已大于当今 $C(l)$ 测量的误差棒，必须计入。

**更有力的用法：非对角相关。**\figref{13.6} 所示对功率谱的效应很重要，但并不是 CMB 透镜最激动人心的方面——特别是，它不便于提取我们想要的透镜势功率谱。有一种强大得多的方式利用 \eqref{13.18} 达到这一目的。在 \eqref{13.21} 中我们只考虑了 $\boldsymbol l'=\boldsymbol l$ 时的 $\langle\Theta_{\rm obs}(\boldsymbol l)\Theta_{\rm obs}^*(\boldsymbol l')\rangle$。第 9 章论证过，对未透镜 CMB 这是唯一不为零的相关。对透镜后的 CMB 这不再成立：\eqref{13.18} 导致非对角模（$\boldsymbol l'\neq\boldsymbol l$）之间出现非零相关。用 \eqref{13.20} 的第一行，`}</Tx>
      <Eq n="13.23" keyEq title="透镜诱导的非对角相关" say={R`固定透镜场时，透镜后 CMB 的两个不同模之间出现相关，正比于差模 $\boldsymbol l-\boldsymbol l'$ 上的透镜势：这是"重建"透镜势的钥匙。`}>{R`\begin{aligned}\left\langle\Theta_{\rm obs}(\boldsymbol l)\Theta_{\rm obs}^*(\boldsymbol l')\right\rangle\Big|_{\phi_{\rm L}} &\overset{\boldsymbol l'\neq\boldsymbol l}{=} -\int\frac{d^2l_1}{(2\pi)^2}\Big[\phi_{\rm L}^*(\boldsymbol l_1)\,\boldsymbol l_1\cdot(\boldsymbol l'-\boldsymbol l_1)\left\langle\Theta(\boldsymbol l)\Theta^*(\boldsymbol l'-\boldsymbol l_1)\right\rangle\\ &\qquad\qquad+\phi_{\rm L}(\boldsymbol l_1)\,\boldsymbol l_1\cdot(\boldsymbol l-\boldsymbol l_1)\left\langle\Theta(\boldsymbol l-\boldsymbol l_1)\Theta^*(\boldsymbol l')\right\rangle\Big]\\ &= \phi_{\rm L}(\boldsymbol l-\boldsymbol l')\,(\boldsymbol l-\boldsymbol l')\cdot\left[\boldsymbol lC(l)-\boldsymbol l'C(l')\right],\end{aligned}`}</Eq>
      <Tx>{R`左边期望值的下标 $\phi_{\rm L}$ 表示：我们对原初 CMB 涨落求期望，而保持透镜场 $\phi_{\rm L}(\boldsymbol l)$ 固定。第二行用到了两件事：原初各向异性 $\Theta(\boldsymbol l)$ 的相关只在宗量中的 $\boldsymbol l$ 相等时才不为零；以及透镜势的实性条件 $\phi_{\rm L}^*(\boldsymbol l_1)=\phi_{\rm L}(-\boldsymbol l_1)$。（相关函数中的 $(2\pi)^2\delta_{\rm D}^{(2)}$ 恰好被积分测度 $d^2l_1/(2\pi)^2$ 吃掉，所以右边没有残留的 $\delta$ 函数。）`}</Tx>
      <Derivation title={R`\eqref{13.23} 第二行的两步代换`} collapsed steps={[
        { tex: R`\left\langle\Theta(\boldsymbol l)\Theta^*(\boldsymbol l'-\boldsymbol l_1)\right\rangle\ne0\ \Rightarrow\ \boldsymbol l_1=\boldsymbol l'-\boldsymbol l`, why: R`第一项：$\phi_{\rm L}^*(\boldsymbol l'-\boldsymbol l)=\phi_{\rm L}(\boldsymbol l-\boldsymbol l')$，$\boldsymbol l_1\cdot(\boldsymbol l'-\boldsymbol l_1)=(\boldsymbol l'-\boldsymbol l)\cdot\boldsymbol l$，相关给出 $C(l)$。` },
        { tex: R`-(\boldsymbol l'-\boldsymbol l)\cdot\boldsymbol l\,C(l)\,\phi_{\rm L}(\boldsymbol l-\boldsymbol l') = (\boldsymbol l-\boldsymbol l')\cdot\boldsymbol l\,C(l)\,\phi_{\rm L}(\boldsymbol l-\boldsymbol l')`, why: R`连同前面的负号。` },
        { tex: R`\left\langle\Theta(\boldsymbol l-\boldsymbol l_1)\Theta^*(\boldsymbol l')\right\rangle\ne0\ \Rightarrow\ \boldsymbol l_1=\boldsymbol l-\boldsymbol l'`, why: R`第二项：$\boldsymbol l_1\cdot(\boldsymbol l-\boldsymbol l_1)=(\boldsymbol l-\boldsymbol l')\cdot\boldsymbol l'$，相关给出 $C(l')$，带负号。` },
      ]} result={R`两项相加即 $\phi_{\rm L}(\boldsymbol l-\boldsymbol l')(\boldsymbol l-\boldsymbol l')\cdot[\boldsymbol lC(l)-\boldsymbol l'C(l')]$。`} />
      <Tx>{R`**二次估计量。**\eqref{13.23} 表明：在固定的 $\boldsymbol L=\boldsymbol l-\boldsymbol l'$ 上组合不同的模 $\Theta_{\rm obs}(\boldsymbol l)$、$\Theta_{\rm obs}^*(\boldsymbol l')$，就能重建透镜势 $\phi_{\rm L}(\boldsymbol L)$。思路是选取使信噪比最大的模加权（Hu, 2001；Hu & Okamoto, 2002）。由于 $\phi_{\rm L}$ 的测量涉及 $\Theta_{\rm obs}$ 的两次幂，这一技术称为**最优二次估计量**（optimal quadratic estimator）。结果是一张天空上的投影物质密度图，可以与其他图做交叉相关，也可以测量其统计量。

**直观理解。**考虑 $|\boldsymbol L|=|\boldsymbol l-\boldsymbol l'|\ll l,l'$ 的情形，此时 \eqref{13.23} 的左边非常接近标准的功率谱构型。于是 \eqref{13.23} 描述的是：一个波数为 $\boldsymbol L$ 的长波透镜势**调制**了观测到的小尺度 CMB 功率谱。这个小尺度功率谱因透镜而**各向异性**（注意右边的 $\boldsymbol L\cdot\boldsymbol l$ 因子：观测到的功率谱依赖于小尺度模与 $\boldsymbol L$ 模之间的夹角）。二次估计量正是利用这种特征性的各向异性来重建调制它的透镜模 $\phi_{\rm L}(\boldsymbol L)$。

**加上偏振。**这里只考虑了 CMB 温度扰动的透镜。与偏振结合时 CMB 透镜更为强大：如果原初 CMB 只有 E 模偏振，透镜造成的位置洗牌会**产生 B 模**（仔细看 \figref{10.3} 就能看出，位置的洗牌会把纯 E 模变成 E 模与 B 模的混合）。于是小尺度上透镜产生的 B 模可以作为重建 $\phi_{\rm L}(\boldsymbol L)$ 的一条几乎没有宇宙方差的通道。`}</Tx>
    </Sec>);
}

export function Sec134() {
  return (
    <Sec n="13.4" title="Galaxy shapes" zh="星系形状：会聚、剪切与放大"
      gist={R`用强度加权的二阶矩张量 $q_{ij}$ 描述星系形状，它与偏振张量同构：迹 $q$ ↔ $I$，椭率 $\epsilon_{1,2}$ ↔ $Q/I$、$U/I$。透镜的 Jacobi 矩阵 $A=\mathbb 1+\psi$ 分解为会聚 $\kappa$ 与剪切 $\gamma_{1,2}$。流量放大 $\mu=|A|^{-1}$；形状张量 $q\to A^{-1}q^{\rm true}A^{-1}$；弱透镜下 $\epsilon_i=\epsilon_i^{\rm true}+2\gamma_i$。`}
      why={R`星系的真实位置未知，整体位移测不出来；但偏折角在像的范围内的**变化**会扭曲形状，而"圆的东西不该有系统性的取向"给了我们参照。`}
      gives={["13.24", "13.26", "13.28", "13.30", "13.34", "13.35", "13.36", "13.38", "13.39", "13.40"]}>
      <p className="muted">本节概念：<C id="kappa" /> · <C id="shear" /> · <C id="mag" /> · <C id="ellip" /></p>
      <Tx>{R`**从位置到形状。**现在从 CMB 转到星系。\eqref{13.3} 表明整个星系像从真实位置被搬到观测位置，就像 CMB 温度被重映射一样。遗憾的是我们事先并不知道星系的真实位置。一个可能的办法是利用未透镜的投影星系密度场的各向同性——与 \secref{13.3} 的 CMB 透镜方法非常类似。然而这种方法通常远不如下面要讲的方法有力。我们不看星系位置的整体位移，而是利用星系像**不同部分之间的相对位移**，即星系观测形状的畸变（\figref{13.2} 的弧状像是其极端形式）。这是因为透镜偏折角在天空上变化，所以在一个星系的像的范围内也在变化。最简单的情形下，透镜把圆形星系的像变成椭圆。

**二阶矩。**为了描述这一效应，需要给出星系形状的定量量度，并看它们如何受引力透镜影响。最简单的形状量度是像的一组**二阶矩**（或四极矩）。把像的中心放在原点 $(\theta_x,\theta_y)=(0,0)$，二阶矩定义为`}</Tx>
      <Eq n="13.24" title="二阶矩（形状）张量" say={R`形状张量是以强度为权重的 $\theta_i\theta_j$ 的平均：像在哪个方向上延伸得越远，那个方向的矩就越大。`}>{R`q_{ij} \equiv \left\langle\theta_i\theta_j\right\rangle_{I_{\rm obs}} \equiv \frac1F\int d^2\theta\,I_{\rm obs}(\theta)\,\theta_i\theta_j`}</Eq>
      <Tx>{R`其中尖括号表示在像上以强度为权重的平均，二阶矩用像的总流量归一化：`}</Tx>
      <Eq n="13.25" say={R`像的总流量：强度对整个像积分。`}>{R`F = \int d^2\theta\,I_{\rm obs}(\boldsymbol\theta),`}</Eq>
      <Tx>{R`特别地，这里选取原点使 $\langle\theta_x\rangle_{I_{\rm obs}}=\langle\theta_y\rangle_{I_{\rm obs}}=0$。$q_{ij}$ 是对称的 $2\times2$ 矩阵，可以写成`}</Tx>
      <Eq n="13.26" keyEq title="迹与椭率" say={R`对称的形状张量分解为迹 $q$（大小）与两个椭率分量 $\epsilon_1$（沿坐标轴拉长）、$\epsilon_2$（沿对角线拉长）。`}>{R`q_{ij} = \frac12q\begin{pmatrix}1+\epsilon_1&\epsilon_2\\ \epsilon_2&1-\epsilon_1\end{pmatrix}.`}</Eq>
      <Tx>{R`三个独立分量是迹 $q={\rm Tr}[q_{ij}]$ 与 $\epsilon_1$、$\epsilon_2$。圆形像 $\epsilon_1=\epsilon_2=0$，$\sqrt q$ 度量像的角大小。\eqref{13.26} 与偏振张量 \eqref{10.2} 非常相似：$q/2$ 相当于强度 $I$，$\epsilon_i$ 相当于归一化的 $Q$、$U$ 偏振：`}</Tx>
      <Eq n="13.27" say={R`形状与偏振的字典：椭率分量对应 Stokes 参数 $Q$、$U$ 除以强度。`}>{R`\epsilon_1\leftrightarrow\frac QI;\qquad\epsilon_2\leftrightarrow\frac UI.`}</Eq>
      <Tx>{R`所以 \figref{10.2} 的偏振图样同样可以理解为不同 $\epsilon_1$、$\epsilon_2$ 值的星系像。这还意味着可以直接搬用 \secref{10.1} 的结果，定义星系椭率场的 E 模与 B 模。我们先假设星系形状在内禀上是随机的，所以观测到的一切形状相关都来自透镜——下面会看到这并不完全正确。

**Jacobi 矩阵。**现在推导透镜如何影响星系形状张量 $q_{ij}$。透镜造成畸变，是因为偏折角 $\Delta\boldsymbol\theta$ 在星系像的范围内变化。因此我们需要真实位置对观测角的导数。习惯上定义 $2\times2$ 变换矩阵`}</Tx>
      <Eq n="13.28" keyEq title="透镜的 Jacobi 矩阵" say={R`把像平面映到源平面的线性映射：迹部分由会聚 $\kappa$ 控制，无迹部分由剪切 $\gamma_1$、$\gamma_2$ 控制。`}>{R`A_{ij} \equiv \frac{\partial\theta_S^i}{\partial\theta^j} = \begin{pmatrix}1-\kappa-\gamma_1&-\gamma_2\\ -\gamma_2&1-\kappa+\gamma_1\end{pmatrix}.`}</Eq>
      <Tx>{R`第二个等号中假设了 $A_{ij}$ 是对称的，这使它可以写成与 \eqref{13.26} 类似的形式。对称性来自偏折角可以写成标量透镜势的梯度（\eqref{13.16}）。$A_{ij}$ 的反对称部分因此在领头阶为零，它对应像的旋转（见 \exref{13.5}）。

量 $\kappa$——像大小 $q$ 或强度 $I$ 的对应物——称为**会聚**（convergence），它描述像的流量与大小怎样被改变。我们最感兴趣的是**剪切**（shear）的两个分量：`}</Tx>
      <Eq n="13.29" say={R`剪切的定义：$\gamma_1$ 是对角元之差的一半（取负），$\gamma_2$ 是非对角元（取负）。`}>{R`\begin{aligned}\gamma_1 &= -\frac{A_{11}-A_{22}}2,\\ \gamma_2 &= -A_{12}.\end{aligned}`}</Eq>
      <Tx>{R`同样，$\gamma_i$ 类比于 $\epsilon_i$，也类比于偏振 $Q$、$U$。可以直接用 \eqref{13.17} 定义的畸变张量表示 $A_{ij}$：`}</Tx>
      <Eq n="13.30" keyEq title="会聚与剪切是透镜势的二阶导数" say={R`Jacobi 矩阵 = 单位矩阵 + 畸变张量；畸变张量的迹给出 $-2\kappa$，无迹部分给出剪切。`}>{R`A_{ij} = \delta_{ij}+\psi_{ij},\qquad\text{and}\qquad\psi_{ij} = \begin{pmatrix}-\kappa-\gamma_1&-\gamma_2\\ -\gamma_2&-\kappa+\gamma_1\end{pmatrix}.`}</Eq>
      <Tx>{R`换言之，$\kappa$、$\gamma_1$、$\gamma_2$ 都是积分引力势的确定函数：$\kappa=-\frac12(\partial_1^2+\partial_2^2)\phi_{\rm L}$，$\gamma_1=-\frac12(\partial_1^2-\partial_2^2)\phi_{\rm L}$，$\gamma_2=-\partial_1\partial_2\phi_{\rm L}$。现在推导它们怎样影响星系像的形状。

**形状矩的透镜变换。**有透镜时，给定星系的观测二阶矩由 \eqref{13.3} 与 \eqref{13.24} 给出：`}</Tx>
      <Eq n="13.31" say={R`观测到的形状矩：在观测角上积分，但被积的强度是源处（$\boldsymbol\theta_S$）的强度。`}>{R`q_{ij} = \frac{\int d^2\theta\,I_{\rm true}(\boldsymbol\theta_S)\,\theta_i\theta_j}{\int d^2\theta\,I_{\rm true}(\boldsymbol\theta_S)}.`}</Eq>
      <Tx>{R`这里的积分对观测角 $\boldsymbol\theta$ 进行，而强度依赖光子在源处出发的角度 $\boldsymbol\theta_S$。现在利用偏折角 $\Delta\boldsymbol\theta$ 在星系像范围内只缓慢变化这一事实，展开`}</Tx>
      <Eq n="13.32" say={R`在像的范围内把映射线性化：源位置 = Jacobi 矩阵乘观测位置 + 一个常数平移。`}>{R`\theta_S^i(\boldsymbol\theta) = \theta^i+\Delta\theta^i+\frac{\partial\Delta\theta^i}{\partial\theta^j}\theta^j+\cdots = A^{ij}\theta^j+\Delta\theta^i+\cdots,`}</Eq>
      <Tx>{R`其中 $\Delta\theta^i$ 及其导数都在星系形心处取值。记住 $A_{ij}$ 与 $\Delta\theta^i$ 总在固定位置上取值，所以可以提到对星系像的积分之外。这一近似对弱透镜足够精确，$\theta$ 的更高阶修正只在非常小的尺度上才显著。

先暂时丢掉常数平移 $\Delta\theta^i$——它只是星系视位置的平移，不应影响形状（下面会证明确实如此）。于是可以在 \eqref{13.31} 中处处把 $\theta^i$ 换成 $(A^{-1})^{ij}\theta_{S,j}$。为了做积分，先把积分变量换成 $\boldsymbol\theta_S$，得`}</Tx>
      <Eq n="13.33" say={R`把积分变量换到源平面：多出一个 Jacobi 行列式 $|\partial\theta/\partial\theta_S|=|A|^{-1}$。`}>{R`\begin{aligned}q_{ij} &= \frac1F\int d^2\theta_S\left|\frac{\partial\theta_k}{\partial\theta_{S,l}}\right|I_{\rm true}(\boldsymbol\theta_S)\,(A^{-1}\theta_S)_i(A^{-1}\theta_S)_j,\\ F &= \int d^2\theta_S\left|\frac{\partial\theta_k}{\partial\theta_{S,l}}\right|I_{\rm true}(\boldsymbol\theta_S).\end{aligned}`}</Eq>
      <Tx>{R`**流量与放大。**先看第二行，即透镜后像的总流量。Jacobi 因子等于 $|A^{-1}|=|A|^{-1}$，可以提到积分外，得`}</Tx>
      <Eq n="13.34" say={R`透镜后的流量 = 无透镜流量乘以面积放大倍数 $|A|^{-1}$。`}>{R`F = |A|^{-1}F_{\rm true},`}</Eq>
      <Tx>{R`其中 $F_{\rm true}$ 是星系未被透镜时会观测到的流量，逆行列式为（\exref{13.3}）`}</Tx>
      <Eq n="13.35" keyEq title="放大率" say={R`放大率是 Jacobi 矩阵行列式的倒数；弱透镜下 $\mu\simeq1+2\kappa$，在 $(1-\kappa)^2=|\gamma|^2$ 处发散（临界曲线）。`}>{R`\mu \equiv |A|^{-1} = \frac1{(1-\kappa)^2-\gamma_1^2-\gamma_2^2}.`}</Eq>
      <Tx>{R`这个描述星系总流量增减的量称为**放大率**（magnification）。透镜保持 $I_\nu$——即面亮度——不变，所以像的流量增加等于面积增加。放大在透镜的各个领域都有重要后果，可以通过它对星系计数的影响（\exref{13.11}）以及星系大小的相关来测量。\eqref{13.35} 实际上在弱透镜区之外也成立。

**形状的变换律。**对 \eqref{13.33} 第一行的形状张量，Jacobi 因子相消，它变为`}</Tx>
      <Eq n="13.36" keyEq title="形状张量的透镜变换律" say={R`观测到的形状张量 = $A^{-1}$ 作用两次于无透镜时的形状张量：像被 $A^{-1}$ 线性地拉伸。`}>{R`q_{ij} = (A^{-1})_i{}^k\,(A^{-1})_j{}^l\,q_{kl}^{\rm true},`}</Eq>
      <Tx>{R`其中 $q_{kl}^{\rm true}$ 是没有透镜时会观测到的二阶矩张量。这就是二阶矩在透镜下的变换律。

**平移确实无关。**如果把 \eqref{13.32} 之后丢掉的常数 $\Delta\boldsymbol\theta$ 加回来，会得到 $\Delta\boldsymbol\theta$ 的线性项与二次项。二次项在我们的处理中是高阶的，立即丢掉。线性项正比于 $\int d^2\theta_SI_{\rm true}(\boldsymbol\theta_S)\theta_S^i$，它为零，因为我们选取了原点为像的形心，强度的偶极矩为零。所以丢掉 $\Delta\theta^i$ 是合理的。

**线性化。**现在把 \eqref{13.36} 对 $\kappa$ 与 $\gamma_i$ 线性化，并用 \eqref{13.30}（$A^{-1}\simeq\delta-\psi$），得`}</Tx>
      <Eq n="13.37" say={R`线性阶：形状张量的改变量就是畸变张量从左右两边各作用一次。`}>{R`q_{ij} \overset{\rm linear}{=} q_{ij}^{\rm true}-\psi_i{}^kq_{kj}^{\rm true}-\psi_j{}^lq_{il}^{\rm true}.`}</Eq>
      <Tx>{R`对 $q_{ij}$ 与 $q_{ij}^{\rm true}$ 都用 \eqref{13.26}，就可以直接推出迹 $q$ 与椭率分量 $\epsilon_i$ 在透镜下的变换。这里只给结果，中间步骤留作 \exref{13.3}。首先，$q_{ij}$ 的迹为`}</Tx>
      <Eq n="13.38" say={R`像的面积按 $1+2\kappa$ 增大（正是放大率），另有一个与内禀椭率和剪切同向程度有关的小修正。`}>{R`q = {\rm Tr}\,q_{ij} = q_{\rm true}\left[1+2\kappa+2(\epsilon_1^{\rm true}\gamma_1+\epsilon_2^{\rm true}\gamma_2)\right].`}</Eq>
      <Tx>{R`$q$ 度量星系像的面积，而面亮度不变时面积正比于流量，所以我们预期它按 $\mu\simeq1+2\kappa$ 增加。忽略高阶的椭率修正，\eqref{13.38} 正是如此。对椭率有`}</Tx>
      <Eq n="13.39" keyEq title="椭率的透镜变换" say={R`观测椭率 = 内禀椭率（略被缩放）+ 两倍剪切；会聚 $\kappa$ 在线性阶不改变椭率。`}>{R`\begin{aligned}\epsilon_1 &= \frac{q_{11}-q_{22}}q = \left(1-2[\epsilon_1^{\rm true}\gamma_1+\epsilon_2^{\rm true}\gamma_2]\right)\epsilon_1^{\rm true}+2\gamma_1,\\ \epsilon_2 &= \frac{2q_{12}}q = \left(1-2[\epsilon_1^{\rm true}\gamma_1+\epsilon_2^{\rm true}\gamma_2]\right)\epsilon_2^{\rm true}+2\gamma_2.\end{aligned}`}</Eq>
      <Derivation title={R`从 \eqref{13.37} 到 \eqref{13.38}–\eqref{13.39}（\exref{13.3}(b) 的要点）`} collapsed steps={[
        { tex: R`q_{ij}=q_{ij}^{\rm true}-(\psi q^{\rm true}+q^{\rm true}\psi)_{ij},\qquad q^{\rm true}=\tfrac12q_{\rm true}\begin{pmatrix}1+e_1&e_2\\e_2&1-e_1\end{pmatrix}`, why: R`记 $e_i\equiv\epsilon_i^{\rm true}$；$\psi$ 与 $q^{\rm true}$ 都对称。` },
        { tex: R`{\rm Tr}(\psi q^{\rm true}+q^{\rm true}\psi)=2{\rm Tr}(\psi q^{\rm true})=q_{\rm true}\left[(-\kappa-\gamma_1)(1+e_1)+(-\kappa+\gamma_1)(1-e_1)-2\gamma_2e_2\right]`, why: R`迹的循环性。` },
        { tex: R`=-q_{\rm true}\left[2\kappa+2(e_1\gamma_1+e_2\gamma_2)\right]\ \Rightarrow\ q=q_{\rm true}\left[1+2\kappa+2(e_1\gamma_1+e_2\gamma_2)\right]`, why: R`即 \eqref{13.38}。` },
        { tex: R`q_{11}-q_{22}=q_{\rm true}e_1-2(\psi_{11}q_{11}^{\rm true}-\psi_{22}q_{22}^{\rm true})=q_{\rm true}\left[e_1+2\gamma_1+2\kappa e_1\right]`, why: R`$(\psi q+q\psi)_{11}=2(\psi_{11}q_{11}+\psi_{12}q_{12})$，$(\cdot)_{22}=2(\psi_{22}q_{22}+\psi_{12}q_{12})$，$\psi_{12}$ 项相消。` },
        { tex: R`\epsilon_1=\frac{e_1+2\gamma_1+2\kappa e_1}{1+2\kappa+2(e_1\gamma_1+e_2\gamma_2)}\simeq\left(1-2[e_1\gamma_1+e_2\gamma_2]\right)e_1+2\gamma_1`, why: R`对 $\kappa,\gamma$ 线性展开：$2\kappa e_1$ 与分母中的 $-2\kappa e_1$ 相消。$\epsilon_2$ 同理，$2q_{12}=q_{\rm true}[e_2+2\gamma_2+2\kappa e_2]$。` },
      ]} result={R`会聚 $\kappa$ 在线性阶从椭率中完全消失——它只改变大小。`} />
      <Tx>{R`注意这里假设了 $\kappa$、$\gamma_1$、$\gamma_2$ 很小，但**没有**假设 $\epsilon_i$ 或 $\epsilon_i^{\rm true}$ 很小——实际上星系一般远非圆形。不过，如果再假设 $\epsilon_i^{\rm true}$ 很小，结果就变得非常简单：`}</Tx>
      <Eq n="13.40" keyEq title="弱透镜的形状方程" say={R`观测椭率 = 内禀椭率 + 两倍剪切：剪切直接"写"在星系的形状上。`}>{R`\epsilon_i = \epsilon_i^{\rm true}+2\gamma_i\qquad(\epsilon_i^{\rm true}\ll1).`}</Eq>
      <ShearDistortion />
      <Box kind="warning" title="几个容易混淆的地方">{R`(1) **椭率的定义不唯一。**本书的 $\epsilon$ 用二阶矩之比定义（文献中常称"畸变" $\chi$），对它 $\epsilon\simeq2\gamma$；另一种常用定义 $(a-b)/(a+b)$ 对应 $\simeq\gamma$。(2) **可观测的是约化剪切** $g=\gamma/(1-\kappa)$：$A=(1-\kappa)\begin{pmatrix}1-g_1&-g_2\\-g_2&1+g_1\end{pmatrix}$，整体因子 $1-\kappa$ 不改变形状。上面的交互图里，固定 $g$ 而改变 $\kappa$，椭率不变。(3) **因子 2 与形状噪声。**单个星系的 $\epsilon^{\rm true}$ 是 $\sim0.3$ 的随机量，透镜的 $2\gamma\sim0.02$ 只能靠平均出来。`}</Box>
      <Tx>{R`**从单个星系到剪切场。**于是，测量遥远星系的椭率，就能估计剪切场，而剪切场通过 \eqref{13.17} 直接依赖引力势。实际上我们并不知道单个星系的真实椭率分量，但知道它们的**分布**（因为透镜是小效应，在一阶可以用所有星系观测形状的分布代替内禀形状的分布）：分布相当窄，典型的方均根宽度为 $\langle(\epsilon_1^{\rm true})^2+(\epsilon_2^{\rm true})^2\rangle^{1/2}/\sqrt2\simeq0.3$。在一小块天区（像素）内把许多星系的椭率求和，内禀椭率的随机噪声被平均掉，透镜信号保留下来。下面推导统计量的剪切场 $\gamma$，都应理解为这样测出来的。`}</Tx>
    </Sec>);
}
