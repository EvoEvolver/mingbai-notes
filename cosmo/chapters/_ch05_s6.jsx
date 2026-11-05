// §5.6 The Boltzmann equation for neutrinos —— 式 (5.62)–(5.65)
import { Sec, Tx, Eq, FormulaMap, Box, Derivation, C } from "@kit";
import { FM_5_63 } from "./_ch05_fmaps.jsx";

const R = String.raw;

export function Sec56() {
  return (
    <Sec n="5.6" title="The Boltzmann equation for neutrinos" zh="中微子的 Boltzmann 方程"
      gist={R`中微子仿照光子用温度扰动 $\mathcal N$ 描述，但没有碰撞；有质量时自由流与引力项分别带 $p/E_\nu$、$E_\nu/p$ 因子，且 $\mathcal N$ 依赖动量大小 $p$，多出 $-aHp\,\partial_p\mathcal N$ 项。`}
      why={R`中微子约占早期辐射能量的 40%，它们的扰动通过引力影响光子与物质；晚期中微子质量又会压制小尺度结构——两者都需要它们的 Boltzmann 方程。`}
      gives={["5.62", "5.63", "5.64", "5.65"]}>
      <p className="muted">本节概念：<C id="neutrino" /> · <C id="free_stream" /></p>
      <Tx>{R`**最后一种丰富的粒子。**最后来看中微子，分布函数为 $f_\nu(\boldsymbol x,\boldsymbol p,t)$。我们仿照光子来处理：中微子在零阶遵循温度为 $T_\nu(a)$ 的平衡分布（§2.4.4 与习题 3.9），而且在早期宇宙中是相对论性的。于是同样可以把其分布函数的扰动表述为温度扰动，记为 $\mathcal N(\boldsymbol x,\boldsymbol p,\eta)$，与 §5.1 对光子所做的一样：`}</Tx>
      <Eq n="5.62" title="中微子温度扰动" say={R`中微子分布 = 温度被扰动的费米–狄拉克形分布；线性展开后，修正项是 $-\mathcal N p\,df^{(0)}/dp$。与光子不同，$\mathcal N$ 允许依赖动量大小 $p$。`}>{R`\begin{aligned}f_\nu(\boldsymbol x,\boldsymbol p,t) &= \left[\exp\left\{\frac{p}{T_\nu(t)[1+\mathcal N(\boldsymbol x,\hat{\boldsymbol p},t)]}\right\}+1\right]^{-1}\\ &= \left[1-\mathcal N(\boldsymbol x,\boldsymbol p,t)\,p\frac{d}{dp}\right]f_\nu^{(0)}(p),\end{aligned}`}</Eq>
      <Tx>{R`其中 $f_\nu^{(0)}(p)=[e^{p/T_\nu(a)}+1]^{-1}$ 是零阶中微子分布，第二行展开到 $\mathcal N$ 的线性阶（与 \eqref{5.3} 完全同理）。在我们关心的时期——中微子脱耦以后——中微子的一切非引力相互作用都可忽略，所以合适的方程是有质量粒子的无碰撞 Boltzmann 方程 \eqref{3.76}：`}</Tx>
      <FormulaMap n="5.63" say={R`中微子分布的无碰撞演化：与暗物质的方程 (5.36) 形式完全相同——速度 $p/E_\nu$ 决定自由流，$E_\nu/p$ 决定引力势的作用。`} tree={FM_5_63} start="vel" />
      <Tx>{R`代入 \eqref{5.62}，零阶项相消（$f_\nu^{(0)}$ 按构造满足均匀的 Boltzmann 方程），一阶得到`}</Tx>
      <Eq n="5.64" say={R`中微子温度扰动的一阶方程（宇宙时、实空间）：自由流带速度因子；因 $\mathcal N$ 依赖 $p$，背景红移 $-Hp\,\partial/\partial p$ 作用在 $\mathcal N$ 上不再抵消；最后两项是引力源。`}>{R`\frac{\partial\mathcal N}{\partial t} + \frac{p}{E_\nu(p)}\frac{\hat p^i}{a}\frac{\partial\mathcal N}{\partial x^i} - Hp\frac{\partial\mathcal N}{\partial p} + \dot\Phi + \frac{E_\nu(p)}{ap}\hat p^i\Psi_{,i} = 0.`}</Eq>
      <Derivation title={R`为什么会出现 $-Hp\,\partial\mathcal N/\partial p$`} collapsed steps={[
        { tex: R`f_\nu=f_\nu^{(0)}+\delta f,\qquad \delta f\equiv-\mathcal N\,p\frac{\partial f_\nu^{(0)}}{\partial p}\equiv-\mathcal N\,\nosym{g}(p/T_\nu)`, why: R`记 $\nosym{g}\equiv p\,\partial_pf_\nu^{(0)}$，它只依赖 $p/T_\nu$。` },
        { tex: R`\frac{\partial\delta f}{\partial t}-Hp\frac{\partial\delta f}{\partial p}=-\nosym{g}\left[\frac{\partial\mathcal N}{\partial t}-Hp\frac{\partial\mathcal N}{\partial p}\right]-\mathcal N\left[\frac{\partial \nosym{g}}{\partial t}-Hp\frac{\partial \nosym{g}}{\partial p}\right]`, why: R`乘积求导。` },
        { tex: R`\frac{\partial \nosym{g}}{\partial t}-Hp\frac{\partial \nosym{g}}{\partial p}=-\left[\frac{\dot T_\nu}{T_\nu}+H\right]p\frac{\partial \nosym{g}}{\partial p}=0`, why: R`$\nosym{g}$ 只依赖 $p/T_\nu$，且 $T_\nu\propto1/a$。第二个方括号消失——与光子情形 \eqref{5.8} 的抵消完全相同。` },
        { tex: R`-\nosym{g}\left[\partial_t\mathcal N+\frac{p}{E_\nu}\frac{\hat p^i}{a}\partial_i\mathcal N-Hp\,\partial_p\mathcal N+\dot\Phi+\frac{E_\nu}{ap}\hat p^i\Psi_{,i}\right]=0`, why: R`加上自由流项（作用于一阶的 $\delta f$）与引力项（作用于 $f^{(0)}_\nu$），提出公因子 $-\nosym{g}$。光子的 $\Theta$ 与 $p$ 无关，所以那里 $\partial_p\Theta=0$，这一项不出现。` },
      ]} result={R`即 \eqref{5.64}。`} />
      <Tx>{R`转换为共形时间导数并转到 Fourier 空间，得到`}</Tx>
      <Eq n="5.65" keyEq title="中微子 Boltzmann 方程" say={R`每个 Fourier 模式、每个动量 $p$ 与方向 $\mu$ 的中微子温度扰动演化：慢中微子自由流得慢（$p/E_\nu$），在势阱中停留更久因而受 $\Psi$ 影响更大（$E_\nu/p$）；没有碰撞项。`}>{R`\mathcal N'(\boldsymbol k,p,\mu,\eta) + ik\mu\frac{p}{E_\nu(p)}\mathcal N - aHp\frac{\partial}{\partial p}\mathcal N = -\Phi' - ik\mu\frac{E_\nu(p)}{p}\Psi,`}</Eq>
      <Tx>{R`这就是我们想要的中微子一阶 Boltzmann 方程。除了没有碰撞项之外，它与光子方程的区别在于 $p/E_\nu(p)$ 因子——当中微子是相对论性时它们化为 1。在晚期，温度降到 $m_\nu$ 以下后，左边第一个 $p/E$ 因子反映了**迟缓的有质量中微子使自由流变慢**；最后一项中的 $E/p$ 因子则反映了**慢中微子在势阱中停留更久**，因而其运动受势阱的影响更大。`}</Tx>
      <Box kind="warning" title={R`勘误：\eqref{5.65} 与 \eqref{5.73} 中的 $H$ 应为 $aH$`}>{R`原书 \eqref{5.65}、\eqref{5.73} 印作 $\cdots-Hp\frac{\partial}{\partial p}\mathcal N\cdots$（斜体 $H$，与 \eqref{5.64} 中对宇宙时的哈勃率同一字形）。正确为 $-aHp\,\partial_p\mathcal N=-\frac{a'}{a}p\,\partial_p\mathcal N$。依据：从 \eqref{5.64}（对 $t$）换到对 $\eta$ 求导时，$\partial_t=a^{-1}\partial_\eta$，整个方程须乘以 $a$——自由流项 $\frac{\hat p^i}{a}\partial_i\to ik\mu$、$\dot\Phi\to\Phi'$、$\frac{E_\nu}{ap}\hat p^i\Psi_{,i}\to ik\mu\frac{E_\nu}{p}\Psi$ 都已按此转换，唯独 $H$ 项未乘 $a$；量纲上 $\mathcal N'$ 为 [共形时间]$^{-1}$，$H$ 为 [宇宙时]$^{-1}$，二者不能直接相加。比较 \eqref{5.52} 中同样的 $H\to a'/a$ 转换。上式已改正。`}</Box>
      <Tx>{R`**$\mathcal N$ 必须依赖 $p$。**需要注意的一个要点是，我们不能再假设 $\mathcal N$ 与 $p$ 无关、只依赖 $\hat{\boldsymbol p}$、$\boldsymbol x$、$\eta$；因此 \eqref{5.65} 中多出了第三项，这在 $\Theta$ 的方程中并不出现。原因是：一旦中微子不再是极端相对论性的，分布中不同部分的中微子运动方式不同。例如，分布低能尾部的中微子与高能尾部的中微子，$p/E_\nu(p)$ 可能差别很大。出于同样的原因，不同的中微子**质量本征态**需要各自的分布函数。

**复合之前的简化。**幸运的是，如果只关心直到复合时期的中微子行为，就可以在 \eqref{5.65} 中令 $p/E_\nu(p)=1$，并忽略 $\mathcal N$ 对 $p$ 的依赖，使它化为光子 Boltzmann 方程的无碰撞版本：
$$\mathcal N'+ik\mu\mathcal N=-\Phi'-ik\mu\Psi;$$
这样还可以用单一的 $\mathcal N$ 描述全部三代中微子。后面的章节将使用这一简化，但也会看到，在晚期宇宙中计入中微子质量变得非常重要。`}</Tx>
      <Box kind="data" title="什么时候中微子变成非相对论的">{R`中微子的典型动量约为 $3T_\nu$，而今天 $T_{\nu,0}=1.68\times10^{-4}\,\mathrm{eV}$，$T_\nu\propto1/a$。质量为 $m_\nu$ 的中微子在 $3T_{\nu,0}/a\sim m_\nu$，即 $1+z\sim m_\nu/(5\times10^{-4}\,\mathrm{eV})$ 时变为非相对论：$m_\nu=0.06\,\mathrm{eV}$ 对应 $z\sim120$，远在复合（$z\approx1100$）之后。这就是"复合之前可当作无质量"的定量依据。`}</Box>
    </Sec>);
}
