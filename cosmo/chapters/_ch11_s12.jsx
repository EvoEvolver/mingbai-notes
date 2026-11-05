// §11.1.2 Redshift-space distortions —— 式 (11.16)–(11.24)，图 11.3–11.5
import { Sub, Tx, Eq, FormulaMap, Box, Derivation, Figure, C } from "@kit";
import { FM_11_21 } from "./_ch11_fmaps.jsx";
import { KaiserPlot, KaiserMuPlot, RSDSketch, FSigma8Plot } from "./_ch11_plots.jsx";

const R = String.raw;

export function Sub112() {
  return (
    <Sub n="11.1.2" title="Redshift-space distortions" zh="红移空间畸变">
      <Tx>{R`**先定性地想。**在动手计算星系功率谱之前，先想想本动速度对星系成团会有什么效应。\figref{11.3} 画出了红移空间中出现的畸变。左图是本节主要关心的大尺度情形。周围星系正向一个大尺度过密区下落，这个过密区在红移空间中显得被**压扁**：离我们最近的星系朝过密区中心运动，也就是背离我们运动，于是它们看起来比实际更远（也就更靠近过密区中心）；同样，扰动"另一侧"的星系朝我们运动，看起来比实际更近。总效果是让一个本来是圆形的过密区出现表观各向异性。由于把星系挤到一起会增大它们的数密度（上一节 Jacobian 所描述的效应），我们预期红移空间中的成团比实空间中**更强**。`}</Tx>
      <Figure n="11.3" illustration={<RSDSketch />}
        caption={R`原创计算图。线性理论中，半径为 $R$ 的壳层上的下落速度为 $v_r=-\frac13f\,aH\bar\Delta R$（$\bar\Delta$ 为壳内平均过密度），于是视向坐标变为 $s_\parallel=r_\parallel(1-\varepsilon)$，$\varepsilon\equiv f\bar\Delta/3$。$\varepsilon\ll1$ 为线性压扁；$\varepsilon=1$ 的壳层正处于转向（turnaround），被压成一条线；$\varepsilon>1$ 时近侧与远侧互换（右图情形）。$\sigma_v$ 加入随机速度弥散，演示"上帝之指"。`} />
      <Tx>{R`**小尺度：拉长而不是压扁。**进入更小的非线性尺度，红移空间畸变的性质改变了。小尺度上速度通常稍大一些，但更重要的是，进入红移空间的位移 $u_\parallel/aH$ 与我们所关联的两个星系之间的距离相比变得大得多——因为按定义，小尺度成团意味着考虑的是彼此更近的星系对。结果见 \figref{11.3} 右图：观测到的等密度线沿视线被**极度拉长**；而且星系的真实位置与观测位置交换了顺序。这意味着成团的四极矩与线性情形**符号相反**。

注意，我们"所看的只是真实位置的一个小畸变"这一假设，不能正确描述 \figref{11.3} 右图的情形。可见处理红移空间畸变是件棘手的事，不仅要仔细处理线性过密度，还要处理小尺度上复杂得多的非线性效应。本章满足于定量处理**线性**畸变：它适用于大尺度，也是所有进一步工作的出发点。

**需要的两个关系。**现在从 \eqref{11.15} 出发计算星系功率谱。忽略 $\sym{ch11-dchi}{\delta\chi}$ 与 $\sym{ch11-dH}{\delta H}$，可以令 $\bar J=1$。我们还需要 $\delta_{\rm g}$ 与 $\boldsymbol u_{\rm m}$ 同物质密度 $\delta$ 的关系。先看 $\boldsymbol u_{\rm m}$，它沿 $\hat{\boldsymbol k}$ 方向。晚期（$z\lesssim10$）重子与 CDM 一起运动（$u_{\rm b}=u_{\rm c}$），过密度也相等（$\delta_{\rm b}=\delta_{\rm c}$）。于是对两者都可以用连续性方程 \eqref{8.12}，即对总物质密度：`}</Tx>
      <Eq n="11.16" say={R`总物质的线性连续性方程：密度变化率由速度散度决定，右边是势变化带来的修正。`}>{R`\delta_{\rm m}{}'+i\boldsymbol k\cdot\boldsymbol u_{\rm m}=-3\Phi'`}</Eq>
      <Tx>{R`其中撇号表示对 $\eta$ 求导。由于我们工作在视界内尺度，右边可以令为零：与左边各项相比它被压低了 $(aH/k)^2$。利用线性密度场的时间依赖由增长因子 $D_+(\eta)$ 给出这一事实，就能用密度解出速度：`}</Tx>
      <Eq n="11.17" keyEq title="线性速度–密度关系" say={R`线性速度场是纵向的（$\propto\boldsymbol k$），大小正比于增长率 $f$：结构长得越快，物质流得越快。`}>{R`\boldsymbol u_{\rm m}(\boldsymbol k,\eta)=\frac{i\boldsymbol k}{k^2}\frac{D_+{}'}{D_+}\delta(\boldsymbol k,\eta)=aHf\frac{i\boldsymbol k}{k^2}\delta(\boldsymbol k,\eta),`}</Eq>
      <Derivation title={R`\eqref{11.16} → \eqref{11.17}`} collapsed steps={[
        { tex: R`\delta(\boldsymbol k,\eta)=\frac{D_+(\eta)}{D_+(\eta_i)}\delta(\boldsymbol k,\eta_i)\ \Rightarrow\ \delta'=\frac{D_+'}{D_+}\delta`, why: R`线性理论中各模式按增长因子演化（\secref{8.5}）。` },
        { tex: R`i\boldsymbol k\cdot\boldsymbol u_{\rm m}=-\delta'\quad\text{且}\quad\boldsymbol u_{\rm m}\parallel\boldsymbol k\ \Rightarrow\ \boldsymbol u_{\rm m}=\frac{i\boldsymbol k}{k^2}\delta'`, why: R`令 \eqref{11.16} 右边为零；纵向矢量 $\boldsymbol u=u\hat{\boldsymbol k}$ 满足 $i\boldsymbol k\cdot\boldsymbol u=iku$，故 $u=-\delta'/(ik)=i\delta'/k$。` },
        { tex: R`\frac{D_+'}{D_+}=\frac{d\ln D_+}{d\ln a}\frac{d\ln a}{d\eta}=f\cdot\frac{a'}{a}=aHf`, why: R`$a'/a=aH$，$f\equiv d\ln D_+/d\ln a$（\eqref{8.78}）。` },
      ]} />
      <Tx>{R`其中线性增长率 $f=d\ln D_+/d\ln a$ 定义于 \eqref{8.78}。$\Lambda$CDM 宇宙中增长率接近 1（平直物质主导宇宙中恰为 1）。

关于 \eqref{11.17} 中密度与速度的关系，有两点要强调。**第一**，Fourier 空间中速度正比于波矢 $\boldsymbol k$，即它是**纵向**矢量；物理上这对应速度没有旋度分量。第 12 章会看到旋度分量迅速衰减（类似第 6 章讨论的矢量模式），所以这是精确的假设。**第二**，这个关系只在线性理论中成立，因而只适用于很大的尺度；第 12 章将介绍超越这一假设的方法。

**线性偏袒。**接下来，为了把 $\delta_{\rm g}$ 与 $\delta_{\rm m}$ 联系起来，假设**线性偏袒关系**`}</Tx>
      <Eq n="11.18" keyEq title="线性偏袒" say={R`大尺度上星系过密度与物质过密度成正比，比例系数 $b_1$ 依赖样本与时间。`}>{R`\delta_{\rm g}(\boldsymbol x,\eta)=b_1(\eta)\,\delta_{\rm m}(\boldsymbol x,\eta).`}</Eq>
      <Tx>{R`星系是大尺度结构中复杂的、高度非线性的示踪体，其密度扰动与物质的不同。可为什么偏偏是**线性**相关？答案是：在扰动的**线性阶**、在大尺度上，这是有保证的结论；\secref{12.6} 会更严格地论证这一点。偏袒参数 $b_1$ 敏感地依赖所考虑的星系样本，一般也随红移变化。最后，星系是离散的示踪体，所以星系密度场带有噪声；它与 RSD 无关，留到最后再加。

**红移空间过密度。**利用这些结果与 \eqref{11.15}（取 $\bar J=1$），红移空间中的过密度其实是实空间过密度加上本动速度带来的修正：`}</Tx>
      <Eq n="11.19" say={R`红移空间星系过密度 = 偏袒后的物质过密度 − 视向速度沿视线的梯度（除以 $aH$）。`}>{R`\delta_{\rm g,RSD}(\boldsymbol x)=b_1\delta_{\rm m}(\boldsymbol x)-\frac{\partial}{\partial\boldsymbol x}\left[\frac{\boldsymbol u_{\rm m}(\boldsymbol x)\cdot\hat{\boldsymbol x}}{aH}\right],`}</Eq>
      <Tx>{R`这里用下标 RSD，因为 RSD 只是得到 $\delta_{\rm g,obs}$ 所需两种效应之一。此后略去时间宗量。我们还把 $\boldsymbol x_{\rm obs}$ 换成了 $\boldsymbol x$：两者只差一个本身已是扰动的项，展开 $\delta_{\rm g}$ 与 $\boldsymbol u_{\rm m}$ 的宗量只会产生高阶项，所以可以不区分它们。另外 $aH$ 总是在平均红移 $\bar z$ 处取值，实际上是常数（对窄红移片非常精确）。

**远距观测者近似。**现在引入**远距观测者近似**（distant-observer approximation），它本质上是平空近似：把方向矢量 $\hat{\boldsymbol n}=\boldsymbol x/x$ 视为固定，忽略它在星系之间的变化。若涉及的角尺度很小（参见 \figref{11.2}），这是合理的。也就是说，只要星系在 $(x^1,x^2)$ 平面上彼此较近，就可以近似 $\hat{\boldsymbol x}\cdot\boldsymbol u_{\rm m}\to\hat{\boldsymbol e}_z\cdot\boldsymbol u_{\rm m}$，其中 $\hat{\boldsymbol e}_z$ 是指向所关心巡天天区中心的径向单位矢量（取它为 $z$ 轴）。

**做 Fourier 变换。**在远距观测者近似下，可以直接计算红移空间过密度的 Fourier 变换：`}</Tx>
      <Eq n="11.20" say={R`对 \eqref{11.19} 做 Fourier 变换，并把速度用 \eqref{11.17} 写成密度的 Fourier 积分。`}>{R`\begin{aligned}\delta_{\rm g,RSD}(\boldsymbol k)&=\int d^3x\,e^{-i\boldsymbol k\cdot\boldsymbol x}\left[b_1\delta_{\rm m}(\boldsymbol x)-\frac{\partial}{\partial x}\left[\frac{\boldsymbol u_{\rm m}(\boldsymbol x)\cdot\hat{\boldsymbol e}_z}{aH}\right]\right]\\ &=b_1\delta_{\rm m}(\boldsymbol k)-if\int d^3x\,e^{-i\boldsymbol k\cdot\boldsymbol x}\frac{\partial}{\partial x}\left[\int\frac{d^3k'}{(2\pi)^3}e^{i\boldsymbol k'\cdot\boldsymbol x}\delta_{\rm m}(\boldsymbol k')\frac{\boldsymbol k'}{k'^2}\cdot\hat{\boldsymbol e}_z\right],\end{aligned}`}</Eq>
      <Tx>{R`第一个等号来自我们的 Fourier 约定与 \eqref{11.19}，第二个来自 \eqref{11.17}（$aH$ 相消，留下 $f$）。对 $x$ 的导数作用在指数上，拉下一个因子 $i\boldsymbol k'\cdot\hat{\boldsymbol x}$，我们再次把它取为 $i\boldsymbol k'\cdot\hat{\boldsymbol e}_z$，于是`}</Tx>
      <FormulaMap n="11.21" say={R`$-if\times i(\boldsymbol k'\cdot\hat{\boldsymbol e}_z)\times(\boldsymbol k'\cdot\hat{\boldsymbol e}_z)/k'^2=f(\hat{\boldsymbol k}'\cdot\hat{\boldsymbol e}_z)^2$：速度项变成密度乘以方向余弦的平方。`} tree={FM_11_21} start="mu" />
      <Tx>{R`对 $\boldsymbol x$ 的积分给出 $(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k'-\boldsymbol k)$。因此在远距观测者近似下，`}</Tx>
      <Eq n="11.22" keyEq title="Kaiser 公式（过密度）" say={R`红移空间中每个 Fourier 模式被放大 $(b_1+f\mu_k^2)$ 倍：沿视线的模式增强最多，垂直视线的不受影响。`}>{R`\delta_{\rm g,RSD}(\boldsymbol k)=\left[b_1+f\mu_k^2\right]\delta_{\rm m}(\boldsymbol k).`}</Eq>
      <Tx>{R`这里 $\mu_k\equiv\hat{\boldsymbol e}_z\cdot\hat{\boldsymbol k}$，是视线与波矢 $\hat{\boldsymbol k}$ 夹角的余弦。

**解读。**\eqref{11.22} 把我们对（大尺度）红移空间畸变的预期定量化了。**第一**，由于 $f\mu_k^2\ge0$，红移空间中的表观过密度比实空间中（那里就是 $b_1\delta_{\rm m}(\boldsymbol k)$）**更大**。这可以从 \figref{11.3} 看出：等密度线被压扁，意味着星系被挤得更近，于是过密区周围的密度增大；欠密区周围则相反。两种效应都增大表观的星系密度对比。**第二**，增强只针对波矢**平行**视线的扰动。波矢垂直视线的扰动——即沿视线密度不变的扰动——不受红移空间畸变的影响。

**功率谱。**相应地，红移空间中的星系功率谱不仅依赖 $\boldsymbol k$ 的大小，还依赖其方向（用 $\mu_k$ 参数化）。由 \eqref{11.22} 得`}</Tx>
      <Eq n="11.23" keyEq title="红移空间功率谱" say={R`红移空间星系功率谱等于线性物质功率谱乘以 $(b_1+f\mu_k^2)^2$，再加上与尺度无关的噪声 $P_N$。`}>{R`P_{\rm g,RSD}(k,\mu_k,\bar z)=P_{\rm L}(k,\bar z)\left[b_1+f\mu_k^2\right]^2+P_N,`}</Eq>
      <Tx>{R`其中 $P_{\rm L}(k,z)$ 是第 8 章研究的线性物质功率谱，$b_1$ 与 $f$ 都理解为在平均红移 $\bar z$ 处取值。最后我们加入了星系功率谱中的噪声项，假设它是"白"的，即与尺度无关的常数 $P_N$。例如，若星系是从一个连续场中 Poisson 抽样出来的，则（另见第 14 章的 \exref{14.8}）`}</Tx>
      <Eq n="11.24" say={R`Poisson 散粒噪声：功率谱噪声等于平均数密度的倒数——星系越稀疏，噪声越大。`}>{R`P_N=\frac{1}{\bar n_{\rm g}}.`}</Eq>
      <Tx>{R`实际星系出于种种原因并不是简单的 Poisson 抽样，但在低 $k$ 处依然预期有一个与尺度无关的噪声 $P_N$。

**拆开 $b_1$ 与 $f$。**测出 $P_{\rm g,RSD}(k,\mu_k)$ 后，可以同时改变 $k$ 与 $\mu_k$，从而把乘以 $b_1$ 和乘以 $f$ 的贡献分开。技术上常对 $\mu_k$ 做多极展开（\exref{11.4}）：单极 $P^{(0)}=(b_1^2+\frac23b_1f+\frac15f^2)P_{\rm L}$，四极 $P^{(2)}=(\frac43b_1f+\frac47f^2)P_{\rm L}$，十六极 $P^{(4)}=\frac{8}{35}f^2P_{\rm L}$。下图演示这三项如何精确重建 $(b_1+f\mu_k^2)^2$：`}</Tx>
      <KaiserMuPlot />
      <Tx>{R`**测量。**原书图 11.4 展示 BOSS 巡天（SDSS-III 的一部分）测得的星系功率谱多极矩；本站图 11.4 重算线性 Kaiser 预言，不含观测点。测量的误差棒惊人地小，与模型吻合良好——模型由这里推出的线性预言加上第 12 章讨论的非线性修正组成。注意误差棒向低 $k$（大尺度）增大，原因与低 $l$ CMB 多极矩误差较大相同——样本方差（sample variance）：有限的巡天体积 $V_{\rm survey}$ 中只能测到有限个 Fourier 模式，数目约为 $N_k=2\pi k^2\Delta kV_{\rm survey}/(2\pi)^3$。只要 $V_{\rm survey}$ 还没有包含整个可观测宇宙，就可以通过更大、更深的巡天测到更多模式（即投入更多观测时间与更大的望远镜）。`}</Tx>
      <Figure n="11.4" illustration={<KaiserPlot />}
        caption={R`原创计算图。$z=0.57$ 的线性 $P_{\rm L}$（EH98 转移函数，第 8 章）配 Kaiser 公式。取 $b_1=2$、$f=f(0.57)=0.78$，单极 $P^{(0)}$ 在 $k=0.02$、$0.1$、$0.2\,h\,\mathrm{Mpc^{-1}}$ 处约为 $7.0\times10^4$、$1.7\times10^4$、$5.8\times10^3\,(h^{-1}\mathrm{Mpc})^3$，与原图的数据点（约 $6.5\times10^4$、$1.8\times10^4$、$5.5\times10^3$）相符；线性四极在 $k\gtrsim0.1$ 处高于数据，正是上帝之指（\figref{11.3} 右图）把四极压低的结果。`} />
      <Tx>{R`**能同时测出偏袒与增长率吗？**不完全能：一般我们并不知道物质功率谱 $P_{\rm L}(k,\bar z)$，特别是它的**振幅**无法直接测量。但并非一无所获：若用 \exref{8.13} 定义的 $\sigma_8$ 表示物质功率谱的振幅，三维星系功率谱能测出 $b_1\sigma_8$ 与 $f\sigma_8$。前者依赖星系样本，对多数宇宙学家而言基本是个讨厌参数；$f\sigma_8$ 则含有宝贵的信息。`}</Tx>
      <Box kind="physics" title={R`为什么是 $f\sigma_8$`}>{R`把 \eqref{11.23} 写成 $P_{\rm g,RSD}=\big(b_1\sigma_8+f\sigma_8\,\mu_k^2\big)^2\,\big[P_{\rm L}/\sigma_8^2\big]+P_N$。方括号里是功率谱的**形状**，由 CMB 与第 8 章的转移函数精确确定；它的整体振幅 $\sigma_8$ 与 $b_1$、$f$ 完全简并。所以数据只能约束两个组合 $b_1\sigma_8$ 与 $f\sigma_8$。（若另有手段测 $\sigma_8$——如引力透镜，第 13 章——就能把 $b_1$ 与 $f$ 单独解出。）`}</Box>
      <Tx>{R`**$f\sigma_8$ 的测量。**原书图 11.5 汇总了 $f\sigma_8$ 的观测约束；本站\figref{11.5} 数值求解增长方程，绘制理论曲线，不含观测点。正如 \secref{8.5} 所见，增长因子以及增长率是暗能量的直接探针：暗能量造成的膨胀越快，增长率越低。反之，若引力实际上不由广义相对论描述，我们预期增长率更大，因为对引力的修改通常会增强引力。因此一个特别重要的检验是：把测得的增长率与**测得的膨胀率**所预期的增长率比较。广义相对论预言二者之间有唯一的关系，与暗能量的类型无关（\eqref{8.78}），而修改引力会改变这个关系。值得注意的是，数据确实支持 $\Omega_\Lambda\simeq0.7$ 的平直协调宇宙学（实线）：高红移的点显示出物质主导宇宙所预期的趋势，而在 $z\lesssim0.5$ 处有相对这一趋势被压低、甚至出现转折的证据。`}</Tx>
      <Figure n="11.5" illustration={<FSigma8Plot />}
        caption={R`原创计算图。$f(z)\sigma_8(z)=f(z)\sigma_8D_+(z)/D_+(0)$，$f$ 由增长方程 \eqref{8.75} 数值求得。基准 $\Lambda$CDM（$\sigma_8=0.811$）在 $z=0.57$ 给出 $f\sigma_8=0.470$，峰值 $0.475$ 在 $z\approx0.4$，向更低红移下降——与原图实线一致。把 $w$ 调离 $-1$ 或改变 $\Omega_{\rm m}$，可以看到曲线怎样移动；$f=\Omega_{\rm m}(z)^{0.55}$ 近似在 $w=-1$ 时误差 $<1\%$（\exref{11.2}）。`} />
      <p className="muted">本小节概念：<C id="rsd" /> · <C id="kaiser" /> · <C id="tracer" /> · <C id="fsigma8" /></p>
    </Sub>);
}
