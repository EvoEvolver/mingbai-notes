// §8.4 The transfer function —— 式 (8.66)–(8.71)，图 8.14；§8.5 The growth factor —— 式 (8.72)–(8.78)，图 8.15
import { Sec, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { TransferPlot, PowerPlot, GrowthPlot, GrowthRatePlot } from "./_ch08_plots.jsx";

const R = String.raw;

export function Sec84() {
  return (
    <Sec n="8.4" title="The transfer function" zh="转移函数"
      gist={R`从匹配条件 \eqref{8.65} 解出增长模式系数 $C_1$，它"幸运地"与匹配时刻无关；与 \eqref{8.7} 比较得小尺度转移函数 \eqref{8.69}，代入数值即 $T(k)=12.0\,(k_{\rm eq}/k)^2\ln(0.12k/k_{\rm eq})$。转移函数的形状由 $k_{\rm eq}\propto\Omega_{\rm m}h^2$ 控制。`}
      why={R`把 \secref{8.2}、\secref{8.3} 的两段解析结果拼成转移函数，才能理解功率谱小尺度的渐近形状：为什么是 $k^{-2}$ 乘一个对数，而不是单纯的 $k^{-2}$。`}
      gives={["8.66", "8.67", "8.68", "8.69", "8.70", "8.71"]}>
      <p className="muted">本节概念：<C id="transfer" /> · <C id="keq" /> · <C id="log_growth" /></p>
      <Tx>{R`**拼装。**\secref{8.2} 与 \secref{8.3} 推出了一直跟到物质期深处的暗物质扰动解析解。现在把这些结果组装起来，得到转移函数形式的一个概念。

**只需增长模式的系数。**首先要把小尺度物质密度的表达式（\eqref{8.64} 连同 \eqref{8.65}）转成转移函数的表达式。转移函数由相等之后很久、衰减模早已消失时的 $\delta_{\rm c}$ 决定。在 $a\gg a_{\rm eq}$ 极限下可以提取更简单的 $\delta_{\rm c}$ 形式：关键常数是增长模式的系数 $C_1$。把 \eqref{8.65} 的第一个匹配条件乘以 $D'_-$、第二个乘以 $D_-$ 再相减，得`}</Tx>
      <Eq n="8.66" say={R`由两个匹配条件消去 $C_2$ 得到的增长模式系数：分母是 $D_\pm$ 的 Wronski 行列式。`}>{R`C_1 = \frac{D'_-(y_m)\ln(By_m/y_H)-D_-(y_m)/y_m}{D_+(y_m)D'_-(y_m)-D'_+(y_m)D_-(y_m)}A\mathcal R.`}</Eq>
      <Tx>{R`分母 $D_+D'_--D'_+D_-=-(4/9)y_m^{-1}(y_m+1)^{-1/2}$，由于 $y_m\ll1$，约等于 $-4/(9y_m)$。类似地，小 $y_m$ 时 $D_-\to(2/3)\ln(4/y)-2$，$D'_-\to-2/(3y)$。所以`}</Tx>
      <Eq n="8.67" say={R`小 $y_m$ 极限下的 $C_1$：两个对数中的 $\ln y_m$ 恰好相消，结果与匹配时刻无关。`}>{R`C_1 \to -\frac94A\mathcal R\left[\frac{-2}{3}\ln(By_m/y_H)-(2/3)\ln(4/y_m)+2\right],`}</Eq>
      <Derivation title={R`$D_-$ 的小 $y$ 展开与 \eqref{8.67} 的化简`} collapsed steps={[
        { tex: R`\sqrt{1+y}-1\approx\frac y2,\quad\sqrt{1+y}+1\approx2\ \Rightarrow\ \ln\frac{\sqrt{1+y}+1}{\sqrt{1+y}-1}\approx\ln\frac4y`, why: R`$y\ll1$。` },
        { tex: R`D_-\approx\frac23\ln\frac4y-2,\qquad D'_-\approx-\frac{2}{3y}`, why: R`代入 \eqref{8.63}，保留最低阶。` },
        { tex: R`C_1\approx\frac{-\frac{2}{3y_m}\ln\frac{By_m}{y_H}-\frac1{y_m}\left[\frac23\ln\frac4{y_m}-2\right]}{-4/(9y_m)}A\mathcal R`, why: R`代入 \eqref{8.66}，$D_+=y_m+\frac23\approx\frac23$，$D'_+=1$。即 \eqref{8.67}。` },
        { tex: R`C_1=\frac94A\mathcal R\left[\frac23\ln\frac{4B}{y_H}-2\right]=\frac32A\mathcal R\ln\left[\frac{4Be^{-3}}{y_H}\right]`, why: R`$\ln(By_m/y_H)+\ln(4/y_m)=\ln(4B/y_H)$：$y_m$ 消失。` },
      ]} />
      <Tx>{R`它"幸运地"不依赖 $y_m$。因此晚期得到小尺度暗物质扰动的近似解`}</Tx>
      <Eq n="8.68" keyEq title="晚期小尺度暗物质扰动" say={R`辐射期进入视界的模式在物质期的过密度：对数增长留下的振幅 $\frac32A\mathcal R\ln(\cdots)$ 乘以增长因子；进入视界越早（$a_H$ 越小），对数越大。`}>{R`\delta_{\rm c}(\boldsymbol k,a) = \frac32A\mathcal R(\boldsymbol k)\ln\left[\frac{4Be^{-3}a_{\rm eq}}{a_H}\right]D_+(a)\qquad(a\gg a_{\rm eq}).`}</Eq>
      <Box kind="warning" title={R`\eqref{8.68} 中 $D_+$ 的归一化`}>{R`由 $\delta_{\rm c}=C_1D_+(y)$，这里的 $D_+$ 是以 $y$ 为自变量的 $D_+(y)=y+2/3=D_+(a)/a_{\rm eq}$（\eqref{8.64}），而不是 \eqref{8.60} 中的 $D_+(a)=a+2a_{\rm eq}/3$。若按 \eqref{8.60} 理解，\eqref{8.68} 右边还应除以 $a_{\rm eq}$。下一式 \eqref{8.69} 中的 $1/a_{\rm eq}$ 正是由此而来——它与 \eqref{8.7}（其中 $D_+=a$ 归一化）比较时出现。`}</Box>
      <Tx>{R`**小尺度转移函数。**在非常小的尺度上，对数宗量可以化简，因为 $a_{\rm eq}/a_H=\sqrt2k/k_{\rm eq}$（\exref{8.6}）。还要记得我们一直忽略重子，所以在这个近似内令总物质密度扰动等于 CDM 的：$\delta_{\rm m}=\delta_{\rm c}$（\secref{8.6.1} 再回到这一点）。比较 \eqref{8.7} 与 \eqref{8.68}，得到小尺度转移函数的解析表达式：`}</Tx>
      <Eq n="8.69" say={R`小尺度转移函数 $\propto\frac{\Omega_{\rm m}H_0^2}{k^2a_{\rm eq}}\times$ 对数：$k^{-2}$ 来自 Poisson 方程中的 $k^2$（同样的 $\delta$ 对应更小的势），对数来自辐射期的对数增长。`}>{R`T(k) = \frac{15}{4}\frac{\Omega_{\rm m}H_0^2}{k^2a_{\rm eq}}A\ln\left[\frac{4Be^{-3}\sqrt2k}{k_{\rm eq}}\right]\qquad(k\gg k_{\rm eq}).`}</Eq>
      <Tx>{R`回忆相等时进入视界的波数定义为`}</Tx>
      <Eq n="8.70" keyEq title={R`$k_{\rm eq}$ 的定义`} say={R`相等时的共形哈勃率就是 $k_{\rm eq}$；物质与辐射各占一半，所以 $H^2(a_{\rm eq})=2\Omega_{\rm m}H_0^2a_{\rm eq}^{-3}$。`}>{R`k_{\rm eq} \equiv a_{\rm eq}H(a_{\rm eq}) = \sqrt{2\Omega_{\rm m}}H_0a_{\rm eq}^{-1/2},`}</Eq>
      <Tx>{R`所以前因子也只是 $k/k_{\rm eq}$ 的函数（$\Omega_{\rm m}H_0^2/a_{\rm eq}=k_{\rm eq}^2/2$）。代入数值（$A=6.4$、$B=0.44$）得`}</Tx>
      <Eq n="8.71" keyEq title="小尺度转移函数（数值形式）" say={R`小尺度 $T(k)\simeq12(k_{\rm eq}/k)^2\ln(0.12k/k_{\rm eq})$：比单纯的 $(k_{\rm eq}/k)^2$ 压低多了一个对数增强。`}>{R`T(k) = 12.0\frac{k_{\rm eq}^2}{k^2}\ln\left[0.12\frac{k}{k_{\rm eq}}\right]\qquad(k\gg k_{\rm eq}).`}</Eq>
      <Tx>{R`（检验：$\frac{15}{4}\cdot\frac12\cdot6.4=12.0$；$4\times0.44\times e^{-3}\times\sqrt2=0.124$。）

**只在很小尺度上准确。**这个解析近似只在非常小的尺度 $k\gtrsim1\,h\,\mathrm{Mpc^{-1}}$ 上准确。自从有了快速准确的转移函数程序（如今彼此吻合到 0.1%），更精巧的解析解或拟合公式已基本失去实用价值。但重要的是，我们的解析工作让我们理解了转移函数**小尺度渐近行为**的来源。如果辐射期没有对数增长，很早进入视界的模式从进入视界到相等之间将完全不增长，它们相对于大尺度模式的振幅会被压低约 $(k_{\rm eq}/k)^2$。辐射期的对数增长模式缓和了这种压低（效应见 \figref{8.13} 中较高 $k$ 模式更大的振幅）。`}</Tx>
      <Box kind="example" title={R`交互：转移函数只依赖 $k/k_{\rm eq}$`}>{R`下图中橙点是五方程组（\eqref{8.10}–\eqref{8.15}，无重子）的数值转移函数：对 34 个 $q=k/k_{\rm eq}$ 值各解一次（在页面加载后分批计算，约需一两秒），以 \eqref{8.2} 在 $a_{\rm late}=0.05$ 处取值（分母用 \eqref{8.31}）。改变 $\Omega_{\rm m}h^2$ 时它们只是整体平移——这正是"$T$ 只依赖 $k/k_{\rm eq}$"。与 Eisenstein–Hu 无重子拟合公式相比，数值解在 $k=0.01$、$0.1$、$1\,\mathrm{Mpc^{-1}}$ 处分别为 $0.718$、$0.112$、$0.0035$（EH：$0.694$、$0.110$、$0.0036$）。红色点线 \eqref{8.71} 比数值解低 13%（$k=1\,h\,\mathrm{Mpc^{-1}}$）、10%（$k=1\,\mathrm{Mpc^{-1}}$）、6%（$k=2\,\mathrm{Mpc^{-1}}$）；在 $k\sim0.1\,\mathrm{Mpc^{-1}}$ 则低估约 6 倍。蓝色虚线为含重子的 EH 公式（重子效应见 \secref{8.6.1}）。`}</Box>
      <TransferPlot />
      <Tx>{R`**功率谱的形状。**最后通过 \eqref{8.8} 看物质功率谱的形状。\figref{8.14} 给出基准欧氏（平直）$\Lambda$CDM 宇宙学的功率谱，以及保持平直（$\Omega_{\rm m}+\Omega_\Lambda=1$）、固定 $h$ 时改变 $\Omega_{\rm m}$ 的效果。显然功率谱的形状，特别是转折尺度 $k_{\rm eq}$，依赖于 $\Omega_{\rm m}$：降低 $\Omega_{\rm m}$ 时，物质–辐射相等推迟，$k_{\rm eq}$ 被推向更低的值；增大 $\Omega_{\rm m}$ 则相反。`}</Tx>
      <Figure n="8.14" interactive={<PowerPlot />}
        caption={R`基准 $\Lambda$CDM 宇宙学 $z=0$ 的物质功率谱（黑色粗线）。其他曲线为在基准值附近改变 $\Omega_{\rm m}$、固定 $h$ 且 $\Omega_{\rm m}+\Omega_\Lambda=1$ 的结果。改变 $\Omega_{\rm m}$ 改变了相等时刻，从而改变物质功率谱的形状。**交互版**：同图 8.3（EH98 转移函数 + \eqref{8.8}）；拖动 $\Omega_{\rm m}$ 可见峰位与 $k_{\rm eq}=0.073\,\mathrm{Mpc^{-1}}\Omega_{\rm m}h^2$ 一起移动，红色点线为基准谱作参照。注意固定 $\mathcal A_s$ 时，大尺度振幅还按 $D_+^2/\Omega_{\rm m}^2$ 变化（\secref{8.6.3}）。`} />
      <Tx>{R`**$\Omega_{\rm m}h^2$ 与形状参数 $\Omega_{\rm m}h$。**回忆物理物质密度由参数组合 $\Omega_{\rm m}h^2$ 控制。因此 $k_{\rm eq}$ 与物质功率谱的形状主要依赖这个组合（\exref{8.7} 中验证）。不过还有一个纯属约定的微妙之处：为了让距离与哈勃常数无关，习惯上把长度乘以 $h$、把波数相应地除以 $h$（见 \figref{8.14} 的坐标轴标注）。由于以物理单位（$\mathrm{Mpc^{-1}}$，参见 \eqref{8.39}）计 $k_{\rm eq}\propto\Omega_{\rm m}h^2$，以 $h\,\mathrm{Mpc^{-1}}$ 为单位时控制 $k_{\rm eq}$ 的参数组合就是 $\Omega_{\rm m}h$。所以 $\Omega_{\rm m}h$ 有时被称为**"形状参数"**。但要记住，就物理尺度而言，相关参数是 $\Omega_{\rm m}h^2$。

**被忽略的物理。**真实宇宙中还有几个物理效应在解析处理中被忽略了。其一，我们假设没有各向异性应力（$\Phi=-\Psi$）；去掉这一假设，大尺度模式势的下降因子从 $9/10$ 变为约 $0.86$，相应地小尺度转移函数升高。其二，计入重子会带来更显著的小尺度变化。这些在 \secref{8.6} 中讨论。其三，本节的工作全部是关于转移函数，即早期只有物质和辐射相关时扰动的演化。晚期，增长因子依赖其他成分，其中最重要的是**暗能量**。`}</Tx>
    </Sec>);
}

export function Sec85() {
  return (
    <Sec n="8.5" title="The growth factor" zh="增长因子"
      gist={R`晚期、视界内、无压（退耦后重子也无压）：总物质过密度满足 $(a\delta_{\rm m}')'=\frac32\Omega_{\rm m}H_0^2\delta_{\rm m}$，以 $a$ 为自变量即 \eqref{8.75}，只依赖膨胀史 $H(a)$。只有物质、$\Lambda$ 与曲率时有积分解 \eqref{8.77}；增长率 $f\simeq\Omega_{\rm m}(a)^{0.55}$。`}
      why={R`暗能量不改变转移函数（那时它还不重要），但改变晚期增长。把它单独装进 $D_+(a)$，大尺度结构的增长就成了检验暗能量的独立探针。`}
      gives={["8.72", "8.73", "8.74", "8.75", "8.76", "8.77", "8.78"]}>
      <p className="muted">本节概念：<C id="growth" /> · <C id="const_phi" /></p>
      <Tx>{R`**第二部分：与尺度无关的增长。**有了转移函数，现在转向结构形成的第二部分——与尺度无关的增长因子。晚期视界远大于我们关心的模式。若不是暗能量（与中微子质量），我们可以继续用 \secref{8.3.2} 的 Meszaros 方程。

**所处的区域。**先回顾要关注的区域。除了视界内极限，还可以忽略晚期（即退耦之后）重子的压强。这意味着重子满足的方程与暗物质的 \eqref{8.12}–\eqref{8.13} 一样。而且，虽然初条件不同，晚期重子紧跟暗物质，所以可以用总物质扰动描述物质部分，定义为（\eqref{6.79}）$\rho_{\rm m}\delta_{\rm m}=\rho_{\rm c}\delta_{\rm c}+\rho_{\rm b}\delta_{\rm b}$，速度类似地为 $u_{\rm m}=(\rho_{\rm c}u_{\rm c}+\rho_{\rm b}u_{\rm b})/\rho_{\rm m}$。本节还忽略中微子质量——它确实会使结构的晚期演化复杂化。

**推导增长方程。**先把 \eqref{8.12} 乘以 $a$ 并对 $\eta$ 求导。忽略视界内可以忽略的右边，并与 \eqref{8.13} 结合，得`}</Tx>
      <Eq n="8.72" say={R`$a\delta_{\rm m}'$ 的变化率由势驱动：物质被势梯度加速，速度散度又改变密度。`}>{R`\left[a\delta'_{\rm m}(\boldsymbol k,\eta)\right]' = ak^2\Phi(\boldsymbol k,\eta).`}</Eq>
      <Derivation title={R`\eqref{8.72} 的推导`} collapsed steps={[
        { tex: R`a\delta_{\rm m}'=-ik\,au_{\rm m}`, why: R`\eqref{8.12} 乘以 $a$，视界内忽略 $-3\Phi'$（它比 $iku$ 小 $(aH/k)^2$）。` },
        { tex: R`(a\delta_{\rm m}')'=-ik\left(au_{\rm m}'+a'u_{\rm m}\right)=-ik\,a\left(u_{\rm m}'+\frac{a'}au_{\rm m}\right)`, why: R`求导。` },
        { tex: R`=-ik\,a\,(ik\Phi)=ak^2\Phi`, why: R`代入 Euler 方程 \eqref{8.13}。` },
      ]} />
      <Tx>{R`现在需要补充一个关于 $\Phi$ 的 Einstein 方程。取 \eqref{8.14}，忽略辐射扰动以及在 $k\gg aH$ 时很小的左边各项，得`}</Tx>
      <Eq n="8.73" say={R`晚期视界内的 Poisson 方程（就是 \eqref{8.5}）。`}>{R`k^2\Phi(\boldsymbol k,\eta) = 4\pi Ga^2\rho_{\rm m}(\eta)\delta_{\rm m}(\boldsymbol k,\eta),`}</Eq>
      <Tx>{R`这不过就是 \eqref{8.5}。利用 $\rho_{\rm m}\propto a^{-3}$ 与 $\Omega_{\rm m}$ 的定义，最终得到 $\delta_{\rm m}$ 增长方程的第一个版本：`}</Tx>
      <Eq n="8.74" keyEq title="增长方程（共形时间）" say={R`物质过密度的增长方程：引力源项 $\frac32\Omega_{\rm m}H_0^2\delta_{\rm m}$ 是常数系数，所有时间依赖都藏在 $a(\eta)$ 里。`}>{R`\left[a\delta'_{\rm m}\right]' = \frac32\Omega_{\rm m}H_0^2\delta_{\rm m}.`}</Eq>
      <Tx>{R`求解时把时间变量从 $\eta$ 换成 $a$ 更方便，得到`}</Tx>
      <Eq n="8.75" keyEq title="增长方程（标度因子）" say={R`以 $a$ 为自变量的增长方程：第二项是哈勃摩擦，第三项是物质的自引力；只需给定膨胀史 $H(a)$ 即可求解。`}>{R`\frac{d^2\delta_{\rm m}}{da^2} + \frac{d\ln(a^3H)}{da}\frac{d\delta_{\rm m}}{da} - \frac{3\Omega_{\rm m}H_0^2}{2a^5H^2}\delta_{\rm m} = 0.`}</Eq>
      <Derivation title={R`从 \eqref{8.74} 到 \eqref{8.75}`} collapsed steps={[
        { tex: R`\frac{d}{d\eta}=a^2H\frac{d}{da}\ \Rightarrow\ a\delta_{\rm m}'=a^3H\frac{d\delta_{\rm m}}{da}`, why: R`$da/d\eta=a^2H$。` },
        { tex: R`[a\delta_{\rm m}']'=a^2H\frac{d}{da}\left(a^3H\frac{d\delta_{\rm m}}{da}\right)=a^5H^2\left[\frac{d^2\delta_{\rm m}}{da^2}+\frac{d\ln(a^3H)}{da}\frac{d\delta_{\rm m}}{da}\right]`, why: R`再求一次导。` },
        { tex: R`\frac{d^2\delta_{\rm m}}{da^2}+\frac{d\ln(a^3H)}{da}\frac{d\delta_{\rm m}}{da}-\frac{3\Omega_{\rm m}H_0^2}{2a^5H^2}\delta_{\rm m}=0`, why: R`代入 \eqref{8.74} 并除以 $a^5H^2$。` },
      ]} />
      <Box kind="example" title={R`检验：物质主导时 $D_+=a$`}>{R`纯物质平直宇宙 $H=H_0a^{-3/2}$：$a^3H\propto a^{3/2}$，$\frac{d\ln(a^3H)}{da}=\frac{3}{2a}$，$\frac{3\Omega_{\rm m}H_0^2}{2a^5H^2}=\frac3{2a^2}$。试 $\delta\propto a^p$：$p(p-1)+\frac32p-\frac32=0$，即 $(p-1)(p+\frac32)=0$。增长解 $p=1$（$D_+=a$），衰减解 $p=-3/2$（就是 $\delta\propto H$）——与 \eqref{8.63} 的晚期行为 $D_-\propto y^{-3/2}$ 一致。`}</Box>
      <Tx>{R`**特殊情形的积分解。**一般而言 \eqref{8.75} 需要数值求解。有几个（重要的）特殊情形可以走得更远。\exref{8.8} 中你将证明：如果除物质外唯一相关的成分是**宇宙学常数与曲率**，可以得到如下积分解：`}</Tx>
      <Eq n="8.76" say={R`只有物质、$\Lambda$ 与曲率时，增长因子正比于 $H(a)$ 乘以 $1/(aH)^3$ 的积分。`}>{R`D_+(a) \propto H(a)\int^a\frac{da'}{(a'H(a'))^3}\qquad(\Lambda,\ \text{curvature}).`}</Eq>
      <Tx>{R`比例常数由定义 \eqref{8.3} 确定：早期物质仍主导时（如 $z\simeq10$），$D_+$ 应等于 $a$。那时 $H=H_0\Omega_{\rm m}^{1/2}a^{-3/2}$，所以增长因子为`}</Tx>
      <Eq n="8.77" keyEq title="增长因子的积分解" say={R`$\Lambda$CDM（可含曲率）中增长因子的闭合积分式；前因子 $\frac52\Omega_{\rm m}$ 保证物质期 $D_+=a$。`}>{R`D_+(a) = \frac{5\Omega_{\rm m}}{2}\frac{H(a)}{H_0}\int_0^a\frac{da'}{(a'H(a')/H_0)^3}\qquad(\Lambda,\ \text{curvature}).`}</Eq>
      <Derivation title={R`归一化常数 $\frac52\Omega_{\rm m}$`} collapsed steps={[
        { tex: R`\frac{H}{H_0}\int_0^a\frac{da'}{(a'H/H_0)^3}=\Omega_{\rm m}^{1/2}a^{-3/2}\int_0^a\frac{da'}{\Omega_{\rm m}^{3/2}a'^{-3/2}}=\frac{a^{-3/2}}{\Omega_{\rm m}}\cdot\frac25a^{5/2}=\frac{2a}{5\Omega_{\rm m}}`, why: R`物质期 $a'H/H_0=\Omega_{\rm m}^{1/2}a'^{-1/2}$。` },
        { tex: R`D_+=\frac{5\Omega_{\rm m}}{2}\cdot\frac{2a}{5\Omega_{\rm m}}=a`, why: R`前因子正好使早期 $D_+=a$。` },
      ]} />
      <Tx>{R`**增长率。**如果暗能量不是宇宙学常数，\eqref{8.77} 就**不是**二阶增长方程的解，需要直接求解方程。不过对于**增长率** $f$——增长因子的对数导数——存在一个即使在动力学暗能量下也非常精确的经验拟合公式：`}</Tx>
      <Eq n="8.78" keyEq title="增长率" say={R`增长率 $f=d\ln D_+/d\ln a$ 近似等于随时间变化的物质密度参数的 $0.55$ 次方：物质主导时 $f=1$，暗能量越重要 $f$ 越小。`}>{R`f(a) \equiv \frac{d\ln D_+(a)}{d\ln a} \simeq \left[\Omega_{\rm m}(a)\right]^{0.55},`}</Eq>
      <Tx>{R`其中 $\Omega_{\rm m}(a)\equiv8\pi G\rho_{\rm m}(a)/3H^2(a)$ 是随时间变化的物质密度参数（$a=1$ 时还原为常数 $\Omega_{\rm m}$）。这个随时间变化的 $\Omega_{\rm m}(a)$ 只在这里和第 12 章使用。

**图 8.15。**\figref{8.15} 给出三种欧氏宇宙学中的增长因子，除以 $a$ 以便更好地显示晚期的趋势。如前所述，若宇宙是欧氏且物质主导的，增长因子就等于标度因子。存在暗能量时，增长按暗能量的量与物态方程被不同程度地压低。第 11 章将看到它的一些可观测推论。`}</Tx>
      <Figure n="8.15" interactive={<GrowthPlot />}
        caption={R`三种不同欧氏宇宙学中增长因子除以标度因子。实线为基准宇宙学。增加暗能量的量，或把其物态方程提高到 $-1$ 以上，都会使晚期增长受到更大压低。**交互版**：红线为 \eqref{8.75} 的 RK4 数值解（初条件 $a=10^{-3}$ 处 $D_+=a$、$dD_+/da=1$，$H$ 由 \eqref{8.84} 给出，$\Omega_{\rm m}=1-\Omega_{\rm de}$）；蓝色虚线为积分式 \eqref{8.77}（对应附录图 A.1 的点线）。$w=-1$ 时两者重合（$D_+(1)=0.785$，与原图一致；$\Omega_\Lambda=0.72$ 时 $0.767$）；$w=-0.5$ 时数值解 $0.607$、积分式 $0.555$，明显不符——这就是 \exref{8.8}(c) 的结论。`} />
      <Tx>{R`下图检验 \eqref{8.78}：对任意 $\Omega_{\rm de}$ 与（常数）$w$，数值增长率与 $\Omega_{\rm m}(a)^{0.55}$ 的最大相对偏差显示在图例中——$w=-1$ 时约 0.5%，$w=-0.5$ 时约 3%（拟合公式中更精确的指数是 $0.55+0.05(1+w)$ 量级的修正）。`}</Tx>
      <GrowthRatePlot />
    </Sec>);
}
