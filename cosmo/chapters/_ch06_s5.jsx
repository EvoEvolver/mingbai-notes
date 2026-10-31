// §6.5 Summary —— 式 (6.77)–(6.81)
import { Sec, Tx, Eq, Box, Derivation } from "@kit";

const R = String.raw;

export function Sec65() {
  return (
    <Sec n="6.5" title="Summary" zh="小结"
      gist={R`用物质（m）与辐射（r）的加权量把两条标量 Einstein 方程写成 \eqref{6.77}–\eqref{6.78}；与时–空分量组合得到不含时间导数的势方程 \eqref{6.80}；两种张量偏振各自满足 \eqref{6.81}。`}
      why={R`这些就是第 7–10 章要与第 5 章 Boltzmann 方程联立求解的引力方程。`}
      gives={["6.77", "6.78", "6.79", "6.80", "6.81"]}>
      <Tx>{R`**本章做了什么。**Einstein 方程把度规的扰动与物质和辐射的扰动联系起来。我们可以按扰动在空间转动下的行为分解它们：标量–矢量–张量分解。标量、矢量、张量扰动相互解耦：线性阶上各自独立于其他两类演化。取 Einstein 方程的两个分量，我们得到了描述标量度规扰动的两个函数 $\Phi$、$\Psi$ 的演化方程。与上一章的 Boltzmann 方程一样，这些方程在 Fourier 空间中写起来最简单。沿用省略 Fourier 变量波浪号的约定（\eqref{5.29}），可写成`}</Tx>
      <Eq n="6.77" keyEq title="标量方程一：时–时分量" say="相对论 Poisson 方程的紧凑形式：右边是物质的密度扰动加上 4 倍的辐射单极矩，都按各自的平均能量密度加权。">{R`k^2\Phi+3\frac{a'}{a}\left(\Phi'-\Psi\frac{a'}{a}\right)=4\pi Ga^2[\rho_{\rm m}\delta_{\rm m}+4\rho_{\rm r}\Theta_{\rm r,0}]`}</Eq>
      <Eq n="6.78" keyEq title="标量方程二：各向异性应力" say="两个势之和只由辐射的四极矩（各向异性应力）决定；没有它时 $\Phi=-\Psi$。">{R`k^2(\Phi+\Psi)=-32\pi Ga^2\rho_{\rm r}\Theta_{\rm r,2}.`}</Eq>
      <Tx>{R`这里下标 m 包括全部物质（重子与暗物质），下标 r 包括全部辐射（中微子与光子）。更精确地，`}</Tx>
      <Eq n="6.79" say="物质量按物质密度加权求和，辐射量按辐射密度加权求和：例如 $\rho_{\rm r}\Theta_{\rm r,0}$ 是光子与中微子单极矩按各自能量密度的加权和。">{R`\begin{aligned}\rho_{\rm m}\delta_{\rm m} &\equiv \rho_{\rm c}\delta_{\rm c}+\rho_{\rm b}\delta_{\rm b}; &\qquad \rho_{\rm r}\Theta_{\rm r,0} &\equiv \rho_\gamma\Theta_0+\rho_\nu\mathcal N_0;\\ \rho_{\rm m}u_{\rm m} &\equiv \rho_{\rm c}u_{\rm c}+\rho_{\rm b}u_{\rm b}; &\qquad \rho_{\rm r}\Theta_{\rm r,1} &\equiv \rho_\gamma\Theta_1+\rho_\nu\mathcal N_1.\end{aligned}`}</Eq>
      <Tx>{R`（$\rho_{\rm r}\Theta_{\rm r,2}$ 类似地定义为 $\rho_\gamma\Theta_2+\rho_\nu\mathcal N_2$，与 \eqref{6.48} 对应。）

**其余分量是冗余的。**Einstein 方程的其他分量要么为零，要么冗余：它们不提供关于 $\Phi$、$\Psi$ 演化的新信息（这与均匀宇宙的情形相似：所有 Einstein 方程都导向 Friedmann 方程）。冗余的一个例子是时–空分量，你可以在习题 6.6 中推导它。不过有时某种形式的演化方程比另一种更有用。例如，这些方程的一个组合（习题 6.7）给出势的**代数**方程：`}</Tx>
      <Eq n="6.80" keyEq title="势的代数方程" say="与时–空分量组合后消去了 $\Phi'$：$\Phi$ 由物质与辐射的密度扰动加上一个正比于 $aH/k$ 的速度修正直接决定；亚视界（$k\gg aH$）时修正可忽略，即 Poisson 方程。">{R`k^2\Phi=4\pi Ga^2\left[\rho_{\rm m}\delta_{\rm m}+4\rho_{\rm r}\Theta_{\rm r,0}+\frac{3aH}{k}\left(i\rho_{\rm m}u_{\rm m}+4\rho_{\rm r}\Theta_{\rm r,1}\right)\right].`}</Eq>
      <Derivation title={R`由 \eqref{6.77} 与 \eqref{6.83} 得 \eqref{6.80}（习题 6.7）`} collapsed steps={[
        { tex: R`\Phi'-aH\Psi=\frac{4\pi Ga^2}{ik}\left[\rho_{\rm m}u_{\rm m}-4i\rho_{\rm r}\Theta_{\rm r,1}\right]`, why: R`时–空方程 \eqref{6.83}，用 \eqref{6.79} 的加权量。` },
        { tex: R`3\frac{a'}a\left(\Phi'-\Psi\frac{a'}a\right)=3aH(\Phi'-aH\Psi)=-\frac{3aH}{k}\,4\pi Ga^2\left[i\rho_{\rm m}u_{\rm m}+4\rho_{\rm r}\Theta_{\rm r,1}\right]`, why: R`$a'/a=aH$；$\frac1i=-i$，所以 $\frac{1}{ik}[\rho_{\rm m}u_{\rm m}-4i\rho_{\rm r}\Theta_{\rm r,1}]=-\frac1k[i\rho_{\rm m}u_{\rm m}+4\rho_{\rm r}\Theta_{\rm r,1}]$。` },
        { tex: R`k^2\Phi=4\pi Ga^2\left[\rho_{\rm m}\delta_{\rm m}+4\rho_{\rm r}\Theta_{\rm r,0}\right]-3\frac{a'}a\left(\Phi'-\Psi\frac{a'}a\right)`, why: R`把 \eqref{6.77} 的膨胀项移到右边，代入上式即得 \eqref{6.80}。` },
      ]} />
      <Tx>{R`**张量。**Einstein 方程的其他分量包含的不是标量扰动 $\Phi$、$\Psi$ 的信息，而是矢量与张量扰动的信息。矢量模若无源则迅速衰减；张量模则很重要，因为它们描述引力波。第 7 章将看到暴胀也产生张量扰动，所以了解 Einstein 方程对其演化说了什么很重要。我们证明了刻画张量扰动的函数有两个，$h_+$ 与 $h_\times$；每个独立演化并满足`}</Tx>
      <Eq n="6.81" keyEq title="张量方程（小结）" say="两种偏振的引力波各自满足同一个带哈勃阻尼的波动方程；进入视界后振幅衰减。">{R`h''_t+2\frac{a'}{a}h'_t+k^2h_t=0`}</Eq>
      <Tx>{R`其中 $t$ 代表 $+$、$\times$。在膨胀宇宙中，\eqref{6.81} 描述的引力波振幅在模式进入视界后衰减。`}</Tx>
      <Box kind="aside" title="延伸阅读">{R`关于规范选择与分解定理，有比本章详细得多的优秀文献。Liddle & Lyth（2000）的 *Cosmological Inflation and Large Scale Structure* 处理得很好，其优点之一是讲清了规范选择背后的物理。两篇经典综述是 Mukhanov 等（1992）与 Kodama & Sasaki（1984）。最后，Bardeen（1980）关于规范不变变量的开创性论文以清晰简洁著称。`}</Box>
    </Sec>);
}
