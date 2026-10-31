// §11.2 Angular correlations —— 式 (11.38)–(11.49)，图 11.8–11.9
import { Sec, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { LimberKernel, WthetaPlot } from "./_ch11_plots.jsx";

const R = String.raw;

export function Sec112() {
  return (
    <Sec n="11.2" title="Angular correlations" zh="角关联"
      gist={R`没有红移时，测的是天球上的投影过密度 $\Delta_{\rm g}(\hat{\boldsymbol n})$（\eqref{11.39}）。按球谐展开得精确的角功率谱 \eqref{11.44}；$l\gg1$ 时 Bessel 函数的积分化为 $\delta_{\rm D}(\chi-\chi')/\chi^2$，得 Limber 近似 \eqref{11.47}；平空近似下角关联函数是 $C_{\rm g}(l)$ 的 Hankel 变换 \eqref{11.49}。`}
      why={R`测光巡天的星系数远多于光谱巡天，但没有精确距离。要用它们，就得会从三维功率谱预言二维投影统计量；同一套技术在 \secref{11.3}（SZ）与第 13 章（透镜）中还会反复使用。`}
      gives={["11.38", "11.39", "11.41", "11.43", "11.44", "11.46", "11.47", "11.49"]}>
      <p className="muted">本节概念：<C id="limber" /> · <C id="tracer" /></p>
      <Tx>{R`**没有红移怎么办？**上一节由一组带精确红移的星系位置推出了三维星系功率谱。但如果没有这些红移呢？大型成像巡天确认了数以百万计星系的天球位置，但没有昂贵的后续观测，它们的距离依然不确定。还能从这样的数据集中提取信息吗？答案是肯定的，而且并不难多少。很多情况下巡天在多个波段观测，于是有星系的颜色。颜色可以换算成近似的红移估计——**测光红移**（photometric redshifts），它们可以作为真实红移的代理（但弥散显著）。

**距离分布。**所以处理成像巡天时，我们没有单个星系的距离，但对**距离的分布** $W(\chi)$ 有所掌握：`}</Tx>
      <Eq n="11.38" keyEq title="选择函数" say={R`$W(\chi)$ 是星系在共动距离上的归一化分布：落在 $[\chi,\chi+d\chi]$ 中的星系所占的比例。`}>{R`W(\chi)=\frac{1}{N_{\rm g}}\frac{dN_{\rm g}}{d\chi},`}</Eq>
      <Tx>{R`其中 $N_{\rm g}$ 是星系总数，$W(\chi)$ 在区间 $\chi\in[0,\infty)$ 上归一化为 1。实际中 $W(\chi)$ 在某个最小距离以下与最大距离以上都降为零：远处的星系太暗探测不到，低红移处则因为体积小而星系不多。测光红移是出了名的难，所以确定 $W(\chi)$ 本身往往就是一项艰巨任务；这里假设它已经解决。

**投影过密度。**现在测的不是三维星系密度场，而是它在天球上的投影。实际中可以把巡天天区分成许多小像素，数出每个像素中的星系，减去平均值再除以平均值，就得到投影过密度 $\Delta_{\rm g}(\hat{\boldsymbol n})$。它就是不同距离 $\chi$ 处三维星系密度场许多切片的叠加，以距离分布加权：`}</Tx>
      <Eq n="11.39" keyEq title="投影过密度" say={R`天球上某方向的星系过密度 = 沿视线各距离处三维过密度的加权平均，权重是距离分布 $W(\chi)$；越远的切片对应越早的时刻。`}>{R`\Delta_{\rm g}(\hat{\boldsymbol n})=\int_0^\infty d\chi\,W(\chi)\,\delta_{\rm g,obs}\big(\boldsymbol x=\hat{\boldsymbol n}\chi,\ \eta=\eta_0-\chi\big).`}</Eq>
      <Tx>{R`用 $\Delta_{\rm g}$ 区分投影的星系密度与三维的 $\delta_{\rm g,obs}$。注意投影涉及不同时刻 $\eta$ 的星系密度：光子都以光速传播，越远的星系被看到的时刻越早。

**球谐展开。**代入 $\delta_{\rm g,obs}$ 的 Fourier 变换，并用 \eqref{C.17} 中指数函数的展开：`}</Tx>
      <Eq n="11.40" say={R`把平面波 $e^{i\boldsymbol k\cdot\hat{\boldsymbol n}\chi}$ 展开成球 Bessel 函数乘球谐函数：投影过密度自然地写成了球谐级数。`}>{R`\begin{aligned}\Delta_{\rm g}(\hat{\boldsymbol n})&=\int_0^\infty d\chi\,W(\chi)\int\frac{d^3k}{(2\pi)^3}e^{i\boldsymbol k\cdot\hat{\boldsymbol n}\chi}\delta_{\rm g,obs}(\boldsymbol k,\eta(\chi))\\ &=4\pi\int\frac{d^3k}{(2\pi)^3}\sum_{lm}i^lY_{lm}(\hat{\boldsymbol n})Y^*_{lm}(\hat{\boldsymbol k})\int_0^\infty d\chi\,W(\chi)j_l(k\chi)\delta_{\rm g,obs}(\boldsymbol k,\eta(\chi))\end{aligned}`}</Eq>
      <Tx>{R`其中简写 $\eta(\chi)=\eta_0-\chi$，$\sum_{lm}\equiv\sum_{l=0}^\infty\sum_{m=-l}^l$。右边恰好是 $\Delta_{\rm g}(\hat{\boldsymbol n})$ 的球谐展开，可以把 $Y_{lm}(\hat{\boldsymbol n})$ 的系数直接读出：`}</Tx>
      <Eq n="11.41" keyEq title="投影过密度的球谐系数" say={R`每个多极系数是三维 Fourier 模式的叠加，权重为 $Y^*_{lm}(\hat{\boldsymbol k})$ 与"选择函数加权的球 Bessel 函数"。`}>{R`\Delta_{{\rm g},lm}=4\pi i^l\int\frac{d^3k}{(2\pi)^3}Y^*_{lm}(\hat{\boldsymbol k})\int_0^\infty d\chi\,W(\chi)j_l(k\chi)\delta_{\rm g,obs}(\boldsymbol k,\eta(\chi)).`}</Eq>
      <Tx>{R`**角功率谱。**与 CMB 各向异性（$a_{lm}$）完全类比，天球上星系计数的角功率谱正比于 $|\Delta_{{\rm g},lm}|^2$ 的期望值。于是计算`}</Tx>
      <Eq n="11.42" say={R`两个多极系数乘积的系综平均：两重 $\boldsymbol k$ 积分、两重距离积分，核心是三维密度的两点关联。`}>{R`\begin{aligned}\left\langle\Delta_{{\rm g},lm}\Delta^*_{{\rm g},l'm'}\right\rangle=&(4\pi)^2i^{l-l'}\int\frac{d^3k}{(2\pi)^3}\int\frac{d^3k'}{(2\pi)^3}Y^*_{lm}(\hat{\boldsymbol k})Y_{l'm'}(\hat{\boldsymbol k}')\int_0^\infty d\chi\,W(\chi)j_l(k\chi)\\ &\times\int_0^\infty d\chi'\,W(\chi')j_{l'}(k'\chi')\left\langle\delta_{\rm g,obs}(\boldsymbol k,\eta(\chi))\delta^*_{\rm g,obs}(\boldsymbol k',\eta(\chi'))\right\rangle.\end{aligned}`}</Eq>
      <Tx>{R`这里 $\langle\ldots\rangle$ 表示对密度场所有实现的系综平均。对两个场的系综平均立即令 $\boldsymbol k'=\boldsymbol k$（由于均匀性），再用球谐函数的正交归一性（\eqref{C.11}）得`}</Tx>
      <Eq n="11.43" say={R`不同 $(l,m)$ 的多极互不相关（统计各向同性），对角元就是角功率谱 $C_{\rm g}(l)$，与 $m$ 无关。`}>{R`\left\langle\Delta_{{\rm g},lm}\Delta^*_{{\rm g},l'm'}\right\rangle=\delta_{ll'}\delta_{mm'}C_{\rm g}(l)`}</Eq>
      <Tx>{R`其中角功率谱定义为`}</Tx>
      <Eq n="11.44" keyEq title="精确的角功率谱" say={R`精确的星系角功率谱：三重积分，核是两个选择函数加权的球 Bessel 函数，输入的是不等时三维功率谱。`}>{R`\begin{aligned}C_{\rm g}(l)=&\frac{2}{\pi}\int k^2dk\int_0^\infty d\chi\,W(\chi)j_l(k\chi)\int_0^\infty d\chi'\,W(\chi')j_l(k\chi')\\ &\times P_{\rm g,obs}(\boldsymbol k,\eta(\chi),\eta(\chi')).\end{aligned}`}</Eq>
      <Derivation title={R`从 \eqref{11.42} 到 \eqref{11.44} 的系数`} collapsed steps={[
        { tex: R`\left\langle\delta_{\rm g,obs}(\boldsymbol k,\eta)\delta^*_{\rm g,obs}(\boldsymbol k',\eta')\right\rangle=(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k-\boldsymbol k')P_{\rm g,obs}(\boldsymbol k,\eta,\eta')`, why: R`不等时功率谱的定义（均匀性）。` },
        { tex: R`(4\pi)^2\int\frac{d^3k}{(2\pi)^3}Y^*_{lm}(\hat{\boldsymbol k})Y_{l'm'}(\hat{\boldsymbol k})(\cdots)=\frac{16\pi^2}{8\pi^3}\int k^2dk\int d\Omega_k\,Y^*_{lm}Y_{l'm'}(\cdots)`, why: R`吃掉 $\boldsymbol k'$ 积分；$d^3k=k^2dk\,d\Omega_k$。` },
        { tex: R`\int d\Omega_k\,Y^*_{lm}(\hat{\boldsymbol k})Y_{l'm'}(\hat{\boldsymbol k})=\delta_{ll'}\delta_{mm'},\qquad i^{l-l'}\to1,\qquad\frac{16\pi^2}{8\pi^3}=\frac2\pi`, why: R`正交归一性（这里假设 $P_{\rm g,obs}$ 与 $\hat{\boldsymbol k}$ 无关，否则角积分不能直接分离）。` },
      ]} />
      <Tx>{R`**不等时功率谱。**注意星系的角功率谱 $C_{\rm g}(l)$ 一般涉及星系的**不等时**（unequal-time）功率谱，因为我们沿光锥做投影。不等时功率谱不为零，因为密度扰动在增长的同时停留在原地（线性理论中 $P(k,\eta,\eta')=P(k)D_+(\eta)D_+(\eta')/D_+^2$）。不过下面很快会看到，在小尺度即大 $l$ 上，只有等时、等距离 $\chi'=\chi$ 的贡献显著。`}</Tx>
      <Figure n="11.8" interactive={<LimberKernel />}
        caption={R`两个平面波扰动及其对角功率谱的贡献。右图是视向波数 $\mu_kk\gg\chi^{-1}$ 的扰动（$\hat{\boldsymbol e}_z$ 方向竖直）；左图是视向波数 $\mu_kk<\chi^{-1}$、基本横向的模式。右图模式产生的角关联可以忽略，因为沿视线有相消；左图的横向模式则没有这种相消。**交互版**：Limber 近似的数学核心——\eqref{11.45} 的被积核 $(k\chi)^2j_l(k\chi)j_l(k\chi')$（以 $\chi'=\chi$ 时的峰值归一）。$\chi'=\chi$ 时它在 $k\chi\approx l+\frac12$ 处取峰，宽度 $\Delta(k\chi)\propto l^{1/3}$，相对宽度随 $l$ 变窄（\exref{11.7}）；$\chi'\neq\chi$ 时两个 Bessel 函数在峰后很快失相，正负相消，积分迅速变小——这正是 \eqref{11.46} 中的 $\delta_{\rm D}(\chi-\chi')$。`} />
      <Tx>{R`**精确但笨重。**\eqref{11.44} 是给定三维功率谱 $P_{\rm g,obs}(\boldsymbol k,\eta,\eta')$（允许各向异性）与选择函数 $W(\chi)$ 时星系角功率谱的精确结果。但它处理起来很麻烦：有三重嵌套积分，而且积分的是振荡函数 $j_l$；我们还需要给出完整的不等时星系功率谱。

**小尺度简化。**为了继续，我们做一个类似上一节远距观测者近似的简化假设。小尺度上 $l\gg1$，贡献 $C_{\rm g}(l)$ 的星系对在天上张开的角度很小，约 $\theta\sim1/l$，所以预期会有简化。仔细看这一区域中的 \eqref{11.44}。对 $k$ 的积分是`}</Tx>
      <Eq n="11.45" say={R`角功率谱中对 $k$ 的那一重积分：两个球 Bessel 函数的乘积乘以三维功率谱。`}>{R`\frac{2}{\pi}\int k^2dk\,j_l(k\chi)j_l(k\chi')P_{\rm g,obs}(\boldsymbol k,\eta,\eta').`}</Eq>
      <Tx>{R`\exref{11.6} 中你将证明：如果 $P_{\rm g,obs}(\boldsymbol k)$ **与 $k$ 无关**、可以提到积分外，这个积分化为`}</Tx>
      <Eq n="11.46" keyEq title="球 Bessel 函数的闭包关系" say={R`球 Bessel 函数的完备性：对所有 $k$ 积分后，两个不同距离之间"没有关联"，只剩一个 Dirac $\delta$ 函数。`}>{R`\frac{2}{\pi}\int k^2dk\,j_l(k\chi)j_l(k\chi')=\frac{1}{\chi^2}\delta_{\rm D}^{(1)}(\chi-\chi').`}</Eq>
      <Tx>{R`有了它，\eqref{11.44} 简单得多：化为对 $\chi$ 的单重积分。但实际上 $P_{\rm g,obs}$ 当然依赖 $k$。那就看看 \eqref{11.45} 被积函数的其余部分。\exref{11.7} 中你会证明：大 $l$ 时球 Bessel 函数的乘积在 $k\chi\approx k\chi'\approx\sqrt{l(l+1)}\approx l+1/2$ 处取尖锐的峰。只要 $P_{\rm g,obs}(\boldsymbol k)$ 在 Bessel 函数不为零的窄范围 $\Delta k\sim1/(l\chi)$ 内变化缓慢，就可以把它近似为常数。刚才描述的近似通常在 $l\gtrsim20$ 时非常精确，称为 **Limber 近似**。它的核心预言是`}</Tx>
      <Eq n="11.47" keyEq title="Limber 近似" say={R`小角度上的角功率谱：每个距离 $\chi$ 只贡献波数 $k=(l+\frac12)/\chi$、垂直视线、等时的三维功率，权重 $W^2/\chi^2$。`}>{R`C_{\rm g}(l)=\int\frac{d\chi}{\chi^2}W^2(\chi)P_{\rm g,obs}\left(k=\frac{l+1/2}{\chi},\ \mu_k=0,\ \eta(\chi)\right),`}</Eq>
      <Derivation title={R`\eqref{11.44} → \eqref{11.47}`} collapsed steps={[
        { tex: R`\frac2\pi\int k^2dk\,j_l(k\chi)j_l(k\chi')P(k)\simeq P\!\left(\frac{l+1/2}{\chi}\right)\frac{1}{\chi^2}\delta_{\rm D}^{(1)}(\chi-\chi')`, why: R`$P$ 在峰 $k\chi\approx l+\frac12$ 附近宽度 $\Delta k\sim1/(l\chi)$ 的范围内近似常数，提出积分外，再用 \eqref{11.46}。` },
        { tex: R`C_{\rm g}(l)=\int d\chi\,W(\chi)\int d\chi'\,W(\chi')\frac{\delta_{\rm D}^{(1)}(\chi-\chi')}{\chi^2}P\left(\frac{l+1/2}{\chi},\eta(\chi),\eta(\chi')\right)=\int\frac{d\chi}{\chi^2}W^2(\chi)P\left(\frac{l+1/2}{\chi},\eta(\chi)\right)`, why: R`$\delta$ 函数吃掉 $\chi'$ 积分，不等时功率谱自动变为等时。` },
      ]} />
      <Tx>{R`它比 \eqref{11.44} 算起来快得多。$P_{\rm g,obs}$ 剩下的宗量值得解释：在 Limber 近似中 $\chi=\chi'$，于是 $\eta(\chi')=\eta(\chi)$，\eqref{11.47} 只涉及**等时**功率谱。它还意味着所涉及的 $\boldsymbol k$ 模式**没有视向分量**——否则扰动上不同的点就有不同的距离，即 $\chi'\ne\chi$。所以 $\boldsymbol k$ 必须垂直视线：$\mu_k=0$（于是 Kaiser 因子退化为 $b_1^2$，RSD 在 Limber 近似下消失）。

**物理图像。**到目前为止的推导相当严格，但偏数学。\figref{11.8} 说明了 Limber 近似背后的物理原因。关注小尺度相当于看小角度，$\theta\sim1/l\ll1$。看图：视向波数 $\mu_kk$ 远大于 $\chi^{-1}$ 的模式，由于沿视线的相消，不产生角关联；只有 $\mu_kk$ 为 $\chi^{-1}$ 量级或更小的模式才产生角关联。因此相关的横向波数 $l/\chi$ 远大于相关的视向波数，可以放心地忽略后者——这就相当于令 $\chi'=\chi$。`}</Tx>
      <Box kind="data" title={R`Limber 近似有多准（\exref{11.7}(b) 的数值结果）`}>{R`取 $W(\chi)$ 为中心在 $\chi(z=1)=2298\,h^{-1}\mathrm{Mpc}$、红移弥散 $\Delta z=0.2$（$\sigma_\chi=337\,h^{-1}\mathrm{Mpc}$）的 Gaussian，线性 $P_{\rm L}$（EH98）与 $D_+$，精确三重积分与 Limber 之比 $C^{\rm Limber}_l/C^{\rm exact}_l$ 为：$l=2$：$0.58$；$l=5$：$0.83$；$l=10$：$0.95$；$l=30$：$0.998$；$l=100$：$1.001$。误差大致按 $1/l^2$ 下降，与"$l\gtrsim20$ 时非常精确"相符。`}</Box>
      <Tx>{R`**角关联函数。**最后还可以写出角关联函数 $w_{\rm g}(\theta)$。$C_{\rm g}(l)$ 与 $w_{\rm g}(\theta)$ 的全天关系在 \exref{11.8} 中推导。但在小尺度上，在平空近似下可以把 $C_{\rm g}(l)$ 当作平面上的二维功率谱，于是`}</Tx>
      <Eq n="11.48" say={R`平空近似：角关联函数是二维功率谱 $C_{\rm g}(l)$ 的二维 Fourier 变换，$\boldsymbol l$ 是天球平面上的"波矢"。`}>{R`w_{\rm g}(\theta)=\int\frac{d^2l}{(2\pi)^2}e^{i\boldsymbol l\cdot\boldsymbol\theta}C_{\rm g}(l).`}</Eq>
      <Tx>{R`由于 $C_{\rm g}(l)$ 只依赖 $\boldsymbol l$ 的大小，对 $\boldsymbol l$ 积分的角向部分为 $\int_0^{2\pi}d\phi\,e^{il\theta\cos\phi}$，它正比于零阶 Bessel 函数 $J_0(l\theta)$（\eqref{C.24}）。因此`}</Tx>
      <Eq n="11.49" keyEq title="角关联函数" say={R`角关联函数是角功率谱的 Hankel 变换：每个多极 $l$ 以 $lC_{\rm g}(l)J_0(l\theta)$ 的形式贡献。`}>{R`w_{\rm g}(\theta)=\int_0^\infty\frac{dl}{2\pi}\,l\,C_{\rm g}(l)J_0(l\theta).`}</Eq>
      <Tx>{R`（中间一步：$\int_0^{2\pi}d\phi\,e^{il\theta\cos\phi}=2\pi J_0(l\theta)$，$d^2l=l\,dl\,d\phi$，于是 $\frac{1}{(2\pi)^2}\cdot2\pi=\frac{1}{2\pi}$。）

**测量。**\figref{11.9} 是暗能量巡天（DES）测得的投影关联函数。由于可用的星系很多，测量的信噪比非常高。可惜，由于在较宽的红移片内投影，BAO 特征被抹平，很难探测。尽管如此，这种投影关联函数与弱引力透镜结合，可以做许多宇宙学检验——这是第 13 章的内容。`}</Tx>
      <Figure n="11.9" interactive={<WthetaPlot />}
        caption={R`测光暗能量巡天（DES）中星系的角关联函数（"3,3" 表示测光红移中心在 $z\simeq0.55$ 的红移区间内星系的自关联）。关联函数 $w(\theta)=w_{\rm g}(\theta)$ 乘了 $\theta$ 以压缩动态范围，因为 $w_{\rm g}$ 向小 $\theta$ 急剧增大。灰色区域涉及小于 $8\,h^{-1}\mathrm{Mpc}$ 的共动尺度，受非线性演化与偏袒的显著影响。曲线为基于线性偏袒的最佳拟合模型。引自 Elvin-Poole et al. (2018)。**交互版**：Gaussian 选择函数（中心 $\bar z$、红移弥散 $\sigma_z$）+ 线性 $P_{\rm L}$ + 线性偏袒，先用 Limber 公式 \eqref{11.47} 算 $C_{\rm g}(l)$，再用 \eqref{11.49} 变换到 $w_{\rm g}(\theta)$。默认 $\bar z=0.55$、$\sigma_z=0.05$、$b_1=1.65$ 时 $\theta w$ 在 $\theta\approx25'$ 处取峰约 $1.0$，$100'$ 处约 $0.4$，与原图量级与形状一致；竖线标出 $8\,h^{-1}\mathrm{Mpc}$ 对应的角度，其左侧线性理论低估了观测（非线性效应）。`} />
    </Sec>);
}
