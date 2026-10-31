// 习题 6.1–6.15 —— 式 (6.82)–(6.87)。解答：6.1、6.3、6.8 依据原书附录 A；其余为编者给出
// （6.5、6.6、6.10、6.11、6.15 的 Einstein 张量结果已用 sympy 对度规直接计算核对）。
import { Sec, Tx, Eq, Exercise, Box } from "@kit";
import { hT, hV, Gm, dK, ThT } from "./_ch06_notation.jsx";
import { TransferPlot } from "./_ch06_plots.jsx";

const R = String.raw;
const G3 = R`\sym{ch06-G3}{G}`, GL = R`\sym{ch06-GL}{G}`, Tt = R`\sym{ch06-Ttr}{T}`, az = R`\sym{ch06-azim}{\phi}`;

export function Exercises() {
  return (
    <Sec n="6.E" title="Exercises" zh="习题">
      <Exercise n="6.1" title="纵向分量的正确形式" level="★" fromBook
        hint={R`在 Fourier 空间中 $\partial_j\partial_l\to-k_jk_l$；利用 $\epsilon_{ijk}$ 对 $j,k$ 反对称、$\hat k_j\hat k_k$ 对 $j,k$ 对称。`}
        solution={R`在 Fourier 空间中 $${GL}^L{}_{,jl}\to-k_jk_l${GL}^L$，所以
$$\epsilon_{ijk}${G3}_{kl,jl}\to-k^2\epsilon_{ijk}\left(\hat k_k\hat k_j-\hat k_j\hat k_k/3\right)${GL}^L=-\frac23k^2\epsilon_{ijk}\hat k_j\hat k_k${GL}^L=0,$$
因为 $\epsilon_{ijk}$ 在交换 $j,k$ 时反对称，而 $\hat k_j\hat k_k$ 对称。（这里 $\hat k_l\hat k_l=1$，且 $\delta_{kl}k_jk_l=k_jk_k$。）$${G3}_{ij}$ 也无迹，因为 $\delta_{ij}(\hat k_i\hat k_j-\delta_{ij}/3)=1-1=0$。旋度为零说明它没有横向（矢量、张量）成分，无迹说明它没有迹（$\delta_{ij}$）成分——只剩纵向无迹部分，这正是投影算符 $\hat k_i\hat k^j-\frac13\delta^j_i$ 挑出的东西。`}>
        <Tx>{R`考虑一个 $3\times3$ 张量，其 Fourier 空间分量为 $${G3}_{ij}(\boldsymbol k)=(\hat k_i\hat k_j-\delta_{ij}/3)${GL}^L(\boldsymbol k)$。证明这种形式无迹，并且在实空间中满足 $\epsilon_{ijk}${G3}_{kl,jl}=0$（$\epsilon_{ijk}$ 为 Levi-Civita 符号），因而它是纵向分量的恰当形式。`}</Tx>
      </Exercise>

      <Exercise n="6.2" title="度规分量的规范变换与 Bardeen 不变量" level="★★"
        hint={R`取 \eqref{6.13} 的 $0i$ 与 $ij$ 分量，只保留一阶项。关键：新度规的背景部分要在新时间处取值，$a^2(\hat t)=a^2(t)(1+2H\zeta)$。`}
        solution={R`**$0i$ 分量。**一阶项为 $\hat g_{00}\,\partial_t\hat t\,\partial_i\hat t+\hat g_{0i}+\hat g_{jl}\,\partial_t\hat x^j\,\partial_i\hat x^l=-\zeta_{,i}-a\hat B_{,i}+a^2\dot\xi_{,i}$，令其等于 $g_{0i}=-aB_{,i}$ 得 $\hat B=B-\zeta/a+a\dot\xi=B-a^{-1}\zeta+\xi'$。

**$ij$ 分量。**$\hat g_{lm}(\hat x)(\delta_{li}+\xi_{,li})(\delta_{mj}+\xi_{,mj})=a^2(t)(1+2H\zeta)(\delta_{ij}[1+2\hat D]-2\hat E_{,ij})+2a^2\xi_{,ij}$，令其等于 $a^2(\delta_{ij}[1+2D]-2E_{,ij})$，比较 $\delta_{ij}$ 项与 $_{,ij}$ 项得 $\hat D=D-H\zeta$、$\hat E=E+\xi$。

**不变量。**$\hat E'-\hat B=E'-B+\zeta/a$，所以 $\frac1a\partial_\eta[a(\hat E'-\hat B)]=\frac1a\partial_\eta[a(E'-B)]+\zeta'/a$，恰好抵消 $\hat A$ 中的 $-\zeta'/a$：$\hat\Phi_A=\Phi_A$。同理 $-\hat D=-D+H\zeta$ 与 $aH(\hat B-\hat E')=aH(B-E')-H\zeta$ 抵消：$\hat\Phi_H=\Phi_H$。（详见 §6.2 中的两个折叠推导；§6.2 的交互图给出了数值例子。）`}>
        <Tx>{R`推导 \eqref{6.18} 给出的度规分量变换。证明 $\Phi_A$ 与 $\Phi_H$ 在一般坐标变换下不变。`}</Tx>
      </Exercise>

      <Exercise n="6.3" title="标量场扰动的变换" level="★" fromBook
        hint={R`从 $\hat\phi(\hat x)=\phi(x[\hat x])$ 出发，把背景场 $\bar\phi(\hat t-\zeta)$ 对 $\zeta$ 展开；$\delta\phi$ 的宗量中的 $\zeta$、$\xi$ 可直接丢掉。`}
        solution={R`由标量场的变换律与 \eqref{6.7} 对 $\delta\phi$ 的定义，
$$\hat\phi(\hat x)=\phi(x[\hat x])=\bar\phi(\hat t-\zeta)+\delta\phi(\hat t-\zeta,\hat{\boldsymbol x}-\nabla\xi).$$
$\delta\phi$ 已是一阶量，其宗量中的 $\zeta$、$\xi$ 可立即丢掉。展开 $\bar\phi$：
$$\hat\phi(\hat x)=\bar\phi(\hat t)-\zeta\frac{d\bar\phi(\hat t)}{d\hat t}+\delta\phi(\hat t,\hat{\boldsymbol x}).$$
另一方面，在 $\hat x$ 坐标系中 \eqref{6.7} 写作 $\hat\phi(\hat x)=\bar\phi(\hat t)+\widehat{\delta\phi}(\hat t,\hat{\boldsymbol x})$（背景函数形式不变）。两式相等即得
$$\widehat{\delta\phi}(\hat t,\hat{\boldsymbol x})=\delta\phi(\hat t,\hat{\boldsymbol x})-\frac{d\bar\phi(\hat t)}{d\hat t}\zeta(\hat t,\hat{\boldsymbol x}),$$
去掉帽子即 \eqref{6.10}。`}>
        <Tx>{R`在扰动的线性阶推导 \eqref{6.10}。利用 $\delta\phi$ 与平移矢量 $\xi^\mu$ 都是一阶扰动这一事实。`}</Tx>
      </Exercise>

      <Exercise n="6.4" title="共形牛顿规范的 Christoffel 符号" level="★"
        hint={R`$g_{ij}=a^2(1+2\Phi)\delta_{ij}$ 是对角的，逆为 $\delta^{ij}/[a^2(1+2\Phi)]$。然后逐个代入 $\Gamma^i{}_{\mu\nu}=\frac{g^{ij}}2[g_{j\mu,\nu}+g_{j\nu,\mu}-g_{\mu\nu,j}]$。`}
        solution={R`**逆度规。**因为 $g_{0i}=0$，空间块可单独求逆：$g^{ij}=\delta^{ij}/[a^2(1+2\Phi)]\simeq\delta^{ij}(1-2\Phi)/a^2$。

**$\Gamma^i{}_{00}$：**$\frac{g^{ij}}2[2g_{j0,0}-g_{00,j}]=\frac{g^{ij}}2\partial_j(2\Psi)=\frac{1}{a^2}\Psi_{,i}$（$\Psi$ 已是一阶，$g^{ij}$ 取零阶）。

**$\Gamma^i{}_{0j}$：**$\frac{g^{ik}}2g_{kj,0}=\frac{\delta_{ij}}{2a^2(1+2\Phi)}\partial_t[a^2(1+2\Phi)]=\delta_{ij}\left(H+\frac{\dot\Phi}{1+2\Phi}\right)\simeq\delta_{ij}(H+\dot\Phi)$。

**$\Gamma^i{}_{jk}$：**$\frac{g^{il}}2[g_{lj,k}+g_{lk,j}-g_{jk,l}]=\frac{1}{2a^2}a^2\cdot2[\delta_{ij}\Phi_{,k}+\delta_{ik}\Phi_{,j}-\delta_{jk}\Phi_{,i}]$。

这正是 \eqref{3.56} 的三行。`}>
        <Tx>{R`推导 \eqref{3.56} 中的 Christoffel 符号 $\Gamma^i{}_{\mu\nu}$。为此需要 $g^{ij}$；证明 $g^{ij}=\delta^{ij}(1-2\Phi)/a^2$。`}</Tx>
      </Exercise>

      <Exercise n="6.5" title={R`标量扰动的 $R_{ij}$`} level="★★★"
        hint={R`按 \eqref{6.58} 的四项计算，所需 Christoffel 符号为 \eqref{3.55}–\eqref{3.56} 以及 $\Gamma^0{}_{00}=\dot\Psi$、$\Gamma^0{}_{0i}=\Psi_{,i}$。注意只有 $\Gamma^\alpha{}_{ij,\alpha}$ 中的 $\Gamma^k{}_{ij,k}$ 与 $\Gamma^\alpha{}_{i\alpha,j}$ 中的 $\Gamma^\alpha{}_{i\alpha,j}$ 会产生 $k_ik_j$ 项。`}
        solution={R`逐项计算（Fourier 空间，$\partial_i\to ik_i$）：

- $\Gamma^0{}_{ij,0}=\delta_{ij}\partial_t\{a^2[H+2H(\Phi-\Psi)+\dot\Phi]\}$，零阶部分为 $\delta_{ij}(a^2H^2+a\ddot a)$，一阶部分含 $\Phi-\Psi$、$\dot\Phi-\dot\Psi$、$\dot\Phi$、$\ddot\Phi$；
- $\Gamma^k{}_{ij,k}=ik_k[\delta_{ki}ik_j+\delta_{kj}ik_i-\delta_{ij}ik_k]\Phi=(k^2\delta_{ij}-2k_ik_j)\Phi$；
- $-\Gamma^\alpha{}_{i\alpha,j}=-\Gamma^0{}_{i0,j}-\Gamma^k{}_{ik,j}=-(ik_j)(ik_i)\Psi-3(ik_j)(ik_i)\Phi=k_ik_j(\Psi+3\Phi)$；
- 乘积项 $\Gamma^\alpha{}_{\beta\alpha}\Gamma^\beta{}_{ij}-\Gamma^\alpha{}_{\beta j}\Gamma^\beta{}_{i\alpha}$ 只需保留"零阶乘一阶"的组合，给出 $\delta_{ij}$ 乘以 $H$、$\dot\Phi$、$\dot\Psi$、$\Phi$、$\Psi$ 的组合。

$k_ik_j$ 项合计 $-2\Phi+\Psi+3\Phi=\Phi+\Psi$，$\delta_{ij}k^2$ 项为 $k^2\Phi$；其余 $\delta_{ij}$ 项整理后为 $(2a^2H^2+a\ddot a)(1+2\Phi-2\Psi)+a^2H(6\dot\Phi-\dot\Psi)+a^2\ddot\Phi$，即 \eqref{6.27}。编者用 sympy 对度规 \eqref{6.20} 直接计算 Ricci 张量，结果与 \eqref{6.27} 完全一致（例如取 $\boldsymbol k\parallel z$ 时 $R_{xx}$ 的一阶部分为 $k^2\Phi+2(a\ddot a+2\dot a^2)(\Phi-\Psi)+a^2\ddot\Phi+a\dot a(6\dot\Phi-\dot\Psi)$，$R_{zz}$ 多出 $k^2(\Phi+\Psi)$）。`}>
        <Tx>{R`证明 $R_{ij}$ 由 \eqref{6.27} 给出。`}</Tx>
      </Exercise>

      <Exercise n="6.6" title="时–空分量的 Einstein 方程" level="★★"
        hint={R`$G^0{}_i=g^{00}R_{0i}$（$\delta^0{}_i=0$）。能动张量取 \eqref{3.86} 的 $T^0{}_i=ga(1+\Phi-\Psi)\int\frac{d^3p}{(2\pi)^3}p_if$，前置因子中的 $\Phi$、$\Psi$ 可忽略。`}
        solution={R`**左边。**一阶上 $G^0{}_i=-R_{0i}$。由 $\Gamma^0{}_{0i}=\Psi_{,i}$、$\Gamma^0{}_{ij}$、$\Gamma^i{}_{0j}=\delta_{ij}(H+\dot\Phi)$ 计算 $R_{0i}$，得 $G^0{}_i=2\partial_i(\dot\Phi-H\Psi)$，即 Fourier 空间的 \eqref{6.82}（sympy 核对无误）。

**右边。**非相对论成分：$\int\frac{d^3p}{(2\pi)^3}p_if=\rho_s u_{s,i}=\rho_s\hat k_iu_s$（由 \eqref{5.39}，$E\simeq m$）。光子：$f\to-p\partial_pf^{(0)}\Theta$，角向积分 $\int\frac{d\Omega}{4\pi}\hat p_i\Theta=\hat k_i\int\frac{d\mu}2\mu\Theta=-i\hat k_i\Theta_1$，径向分部积分给出 $4\rho_\gamma$，故贡献 $-4i\rho_\gamma\Theta_1\hat k_i$；中微子同理。所以 $T^0{}_i=a\hat k_i[\rho_{\rm c}u_{\rm c}+\rho_{\rm b}u_{\rm b}-4i\rho_\gamma\Theta_1-4i\rho_\nu\mathcal N_1]$。

**合并。**$2ik_i(\Phi'/a-H\Psi)=8\pi Ga\hat k_i[\ldots]$，除以 $2ik_i/a$ 即得 \eqref{6.83}。`}>
        <Tx>{R`计算 Einstein 方程的时–空分量。证明在 Fourier 空间中，相关的 Einstein 张量分量为`}</Tx>
        <Eq n="6.82" say="Einstein 张量的时–空分量正比于 $\Phi$ 的变化率与 $H\Psi$ 之差的梯度——它对应动量密度（速度场）。">{R`${Gm}^0{}_i=2ik_i\left(\frac{\Phi'}{a}-H\Psi\right).`}</Eq>
        <Tx>{R`与 \eqref{3.86} 给出的能动张量结合，证明`}</Tx>
        <Eq n="6.83" say="时–空 Einstein 方程：$\Phi'-aH\Psi$ 由各成分的动量密度（物质速度与辐射偶极矩）决定。">{R`\Phi'-aH\Psi=\frac{4\pi Ga^2}{ik}[\rho_{\rm c}u_{\rm c}+\rho_{\rm b}u_{\rm b}-4i\rho_\gamma\Theta_1-4i\rho_\nu\mathcal N_1].`}</Eq>
        <Tx>{R`注意 $T^0{}_i$ 中对分布函数的积分已经是一阶的，所以 \eqref{3.86} 前置因子中的 $\Phi$、$\Psi$ 可以忽略。在已有正文两个方程的前提下，Einstein 方程的时–空分量不提供新信息；用哪两个是方便与否的问题。`}</Tx>
      </Exercise>

      <Exercise n="6.7" title="势的代数方程与牛顿极限" level="★★"
        hint={R`用 \eqref{6.83} 消去 \eqref{6.41} 中的 $\Phi'-\Psi a'/a$。`}
        solution={R`\eqref{6.41} 的膨胀项为 $3\frac{a'}a(\Phi'-aH\Psi)$，代入 \eqref{6.83}：$3aH\cdot\frac{4\pi Ga^2}{ik}[\rho_{\rm m}u_{\rm m}-4i\rho_{\rm r}\Theta_{\rm r,1}]=-\frac{3aH}k4\pi Ga^2[i\rho_{\rm m}u_{\rm m}+4\rho_{\rm r}\Theta_{\rm r,1}]$。移到右边即得 \eqref{6.80}（见 §6.5 的折叠推导）。

**牛顿极限。**速度项与密度项之比 $\sim(aH/k)(u/\delta)$。由连续性方程 $\delta'\sim-iku$，亚视界时 $u\sim(aH/k)\delta$（$\delta$ 的变化时标为哈勃时间），所以速度项被 $(aH/k)^2$ 压低；$k/aH\gg1$ 时可忽略：
$$k^2\Phi=4\pi Ga^2\delta\rho\quad\Longleftrightarrow\quad\nabla^2\Phi=-4\pi Ga^2\delta\rho .$$
换成物理坐标 $\boldsymbol r=a\boldsymbol x$，$\nabla_r^2=a^{-2}\nabla^2$，得 $\nabla_r^2\Phi=-4\pi G\delta\rho$；由于无各向异性应力时 $\Psi=-\Phi$，即 $\nabla_r^2\Psi=4\pi G\delta\rho$——牛顿引力势的 Poisson 方程，"适当的 $a$ 因子"就是这里的 $a^2$。`}>
        <Tx>{R`把时–时方程 \eqref{6.41} 与习题 6.6 的时–空方程结合，得到 \eqref{6.80} 给出的势的代数方程（即不含时间导数）。证明当扰动波长远小于视界（$k/aH\gg1$），即"牛顿极限"时，它化为带有适当 $a$ 因子的 Poisson 方程。`}</Tx>
      </Exercise>

      <Exercise n="6.8" title="补全张量方程推导中的空白" level="★★" fromBook
        hint={R`(a) 定义式中全是空间导数，而度规中唯一随空间变化的是一阶的 $h^{\rm TT}$；(b) $\alpha=\beta=0$ 与 $\alpha,\beta$ 都为空间指标的项都可忽略。`}
        solution={R`**(a)** 按定义 $\Gamma^i{}_{jk}=\frac{g^{il}}2[g_{lj,k}+g_{lk,j}-g_{jk,l}]$。所有导数都是空间导数，度规中唯一随空间变化的是一阶部分 $h^{\rm TT}$，所以可以再次使用零阶的 $g^{il}=\delta^{il}/a^2$，在 Fourier 空间中即得 \eqref{6.57}。

**(b)** 乘积 $\Gamma^\alpha{}_{\beta j}\Gamma^\beta{}_{i\alpha}$ 在 $\alpha=\beta=0$ 时为零（因 $\Gamma^0{}_{0i}=0$），在 $\alpha,\beta$ 都为空间指标时每个 Christoffel 符号都是一阶的。因此
$$\Gamma^\alpha{}_{\beta j}\Gamma^\beta{}_{i\alpha}=\Gamma^0{}_{kj}\Gamma^k{}_{i0}+\Gamma^k{}_{0j}\Gamma^0{}_{ik}=\Gamma^0{}_{kj}\Gamma^k{}_{i0}+(i\leftrightarrow j).$$
而
$$\Gamma^0{}_{kj}\Gamma^k{}_{i0}=\frac12\left(2Hg_{jk}+a^2${hT}_{jk,0}\right)\left(H${dK}_{ik}+\frac12${hT}_{ik,0}\right)=H^2g_{ij}+a\dot a\,${hT}_{ij,0}.$$
加上 $i,j$ 互换的同样项只是引入因子 2，故 $\Gamma^\alpha{}_{\beta j}\Gamma^\beta{}_{i\alpha}=2H^2g_{ij}+2a\dot a\,${hT}_{ij,0}$，与 \eqref{6.64} 相同（$a\dot a=a^2H$）。`}>
        <Tx>{R`补全张量方程推导中的空白。(a) 证明存在张量扰动时 $\Gamma^i{}_{jk}$ 由 \eqref{6.57} 给出。(b) 证明 \eqref{6.58} 的最后一项由 \eqref{6.64} 给出。`}</Tx>
      </Exercise>

      <Exercise n="6.9" title="标量型光子分布不产生张量源" level="★★"
        hint={R`取 $\hat{\boldsymbol k}=\hat{\boldsymbol e}_z$，写 $\hat{\boldsymbol p}=(\sqrt{1-\mu^2}\cos${az},\sqrt{1-\mu^2}\sin${az},\mu)$。`}
        solution={R`由 \eqref{6.45}，$T^1{}_1-T^2{}_2=2\int\frac{d^3p}{(2\pi)^3}\frac{p_x^2-p_y^2}{p}f$。用球坐标，$p_x^2-p_y^2=p^2(1-\mu^2)\cos2${az}$。零阶的 $f^{(0)}$ 各向同性；一阶的 $-p\partial_pf^{(0)}\Theta$ 中 $\Theta$ 只依赖 $\mu$，不依赖方位角 $${az}$。于是方位角积分 $\int_0^{2\pi}d${az}\cos2${az}=0$，$T^1{}_1-T^2{}_2=0$。同理 $T^1{}_2\propto\int d${az}\sin2${az}=0$。换言之，绕 $\hat{\boldsymbol k}$ 轴对称的（标量型）分布没有 $m=\pm2$ 的方位依赖，无法驱动张量模。`}>
        <Tx>{R`我们通过 \eqref{5.2} 定义了光子分布函数的扰动。证明：若 $\Theta$ 只依赖 $\hat{\boldsymbol k}$ 与 $\hat{\boldsymbol p}$ 夹角的余弦 $\mu$，那么取 $\hat{\boldsymbol k}$ 沿 $z$ 轴时 $T^1{}_1-T^2{}_2$ 为零。这正是我们迄今所处理的依赖形式。这是分解定理的又一个侧面：为标量扰动提供源（以及由标量扰动产生）的项，不影响张量扰动。`}</Tx>
      </Exercise>

      <Exercise n="6.10" title="标量扰动不进入张量方程" level="★"
        hint={R`由 \eqref{6.43}，$G^i{}_j=F\delta^i{}_j+k^ik_j(\Phi+\Psi)/a^2$。`}
        solution={R`取 $\boldsymbol k=k\hat{\boldsymbol e}_z$，$k^1=k^2=0$。由 \eqref{6.43}：$\delta G^1{}_1-\delta G^2{}_2=F-F+(k^1k_1-k^2k_2)(\Phi+\Psi)/a^2=0$，$\delta G^1{}_2=F\cdot0+k^1k_2(\Phi+\Psi)/a^2=0$。所以标量扰动对这两个分量没有贡献；结合 §6.4.4（张量不进入标量方程），完成了标量与张量之间分解定理的证明。（编者用 sympy 对度规 \eqref{6.20} 直接计算，确认这两个分量的一阶部分恒为零。）`}>
        <Tx>{R`证明：若 $\hat{\boldsymbol k}$ 沿 $z$ 轴，标量扰动（$\Phi$ 与 $\Psi$）对 $\delta G^1{}_1-\delta G^2{}_2$ 与 $\delta G^1{}_2$ 都没有贡献。这就完成了标量与张量之间分解定理的证明。`}</Tx>
      </Exercise>

      <Exercise n="6.11" title={R`$h_\times$ 满足同一方程`} level="★"
        hint={R`取 \eqref{6.70} 的 $G^1{}_2$ 分量，$${hT}_{12}=h_\times$。`}
        solution={R`由 \eqref{6.70}，$\delta G^1{}_2=\frac32H\dot h_\times+\frac12\ddot h_\times+\frac{k^2}{2a^2}h_\times$（sympy 核对无误）。与 \eqref{6.71} 相比只差一个整体因子 $\frac12$（因为 $h_+$ 出现在 $11$ 与 $22$ 两个分量中、取差时加倍）。换成共形时间，$2a^2\delta G^1{}_2=h''_\times+2\frac{a'}ah'_\times+k^2h_\times$。无各向异性应力时右边 $16\pi Ga^2T^1{}_2=0$（习题 6.9），所以 $h_\times$ 满足与 $h_+$ 相同的 \eqref{6.73}。`}>
        <Tx>{R`利用 Einstein 方程的 $G^1{}_2$ 分量证明 $h_\times$ 满足与 $h_+$ 相同的方程。`}</Tx>
      </Exercise>

      <Exercise n="6.12" title="辐射主导与物质主导下的解析解" level="★★"
        hint={R`辐射主导 $a\propto\eta$，物质主导 $a\propto\eta^2$。令 $x=k\eta$，把方程与球 Bessel 方程 $f''+\frac2xf'+[1-\frac{l(l+1)}{x^2}]f=0$ 比较。`}
        solution={R`令 $x=k\eta$。

**辐射主导**（$a'/a=1/\eta$）：$\frac{d^2h}{dx^2}+\frac2x\frac{dh}{dx}+h=0$，即 $l=0$ 的球 Bessel 方程。通解 $h=c_1j_0(x)+c_2y_0(x)$，$y_0=-\cos x/x$ 在 $x\to0$ 时发散（衰减模）。满足 $h(0)=1$ 的正规解为
$$h_t=j_0(k\eta)=\frac{\sin k\eta}{k\eta}.$$

**物质主导**（$a'/a=2/\eta$）：$\frac{d^2h}{dx^2}+\frac4x\frac{dh}{dx}+h=0$。令 $h=F/x$，代入得 $F''+\frac2xF'+(1-\frac2{x^2})F=0$，即 $l=1$ 的球 Bessel 方程。由 $j_1(x)\to x/3$，正规且 $h(0)=1$ 的解为
$$h_t=\frac{3j_1(k\eta)}{k\eta},\qquad j_1(x)=\frac{\sin x}{x^2}-\frac{\cos x}{x}.$$

两者在 $k\eta\ll1$ 时为常数，$k\eta\gg1$ 时分别 $\propto\sin(k\eta)/k\eta\propto1/a$ 与 $\propto-3\cos(k\eta)/(k\eta)^2\propto1/a$，都是按 $1/a$ 衰减的振荡。图 6.2 交互版中可以把这两条解析曲线与数值解叠在一起比较；编者的数值核对显示，纯辐射/纯物质宇宙中数值解与这两个公式的偏差都小于 $10^{-5}$。`}>
        <Tx>{R`若宇宙纯物质主导，求解波动方程 \eqref{6.73}。对辐射主导的情形做同样的事。`}</Tx>
      </Exercise>

      <Exercise n="6.13" title="引力波的转移函数" level="★★★"
        hint={R`数值积分 \eqref{6.73}，同时积分 $da/d\eta=a^2H$。注意逐点比值在 $j_1(k\eta_0)$ 的零点附近发散——比较振幅（包络）更有意义。`}
        solution={<>
          <Tx>{R`**做法。**以 $H_0=1$ 为单位，同时积分 $a'=a^2\sqrt{\Omega_{\rm r}a^{-4}+\Omega_{\rm m}a^{-3}+\Omega_\Lambda}$ 与 \eqref{6.73}，初值 $h=1$、$h'=0$（极早期，辐射主导，超视界），积分到 $a=1$。基准宇宙学（$\Omega_{\rm m}=0.3$、$h=0.7$、平直）中 $H_0\eta_0=3.24$。

**逐点比值的问题。**按 \eqref{6.84} 逐点计算时，分母 $3j_1(k\eta_0)/k\eta_0$ 在 $k\eta_0=4.49,7.73,\dots$ 处为零，而数值解的零点位置略有不同，比值会出现极点（例如 $k/H_0=3$ 时为 $0.82$，$k/H_0=10$ 时却只有 $0.15$）。对 $k\eta_0<4.49$ 的大尺度模式，逐点比值有意义：$k/H_0=0.3,\,0.6,\,1$ 时 $\sym{ch06-Ttr}{T}=1.002,\,1.008,\,1.044$。

**振幅比。**更有用的是比较两者在 $\eta_0$ 处的振荡振幅 $\sqrt{h^2+(h'/k)^2}$。下图给出这个比值：大尺度上略小于 1（晚期 $\Lambda$ 主导使衰减加快，$k/H_0=1$ 时 $0.93$）；对 $k\gtrsim k_{\rm eq}$ 的模式——在辐射时期进入视界——比值近似 $\propto k$（$k/H_0=100$ 时 $3.6$，$1000$ 时 $32$）。原因：辐射时期进入视界的模式振幅按 $a(\eta_k)/a$ 衰减，$a\propto\eta$；而纯物质主导公式假定 $a\propto\eta^2$ 从 $\eta=0$ 开始，衰减得更快。虚线为 Turner, White & Lidsey（1993）对无 $\Lambda$ 宇宙给出的拟合 $\sym{ch06-Ttr}{T}^2\approx1+1.34(k/k_{\rm eq})+2.50(k/k_{\rm eq})^2$（编者补充的外部对照，$k_{\rm eq}=0.073\,\Omega_{\rm m}h^2\,\mathrm{Mpc}^{-1}$），与数值解（再乘以 $\Lambda$ 造成的约 $0.92$）符合到几个百分点。`}</Tx>
          <TransferPlot />
        </>}>
        <Tx>{R`定义引力波演化的**转移函数**为`}</Tx>
        <Eq n="6.84" say="转移函数 = 真实的张量模振幅（相对初值）除以纯物质主导解；它衡量辐射时期与暗能量时期对引力波振幅的修正。">{R`${Tt}(k,\eta)\equiv\frac{h_t(k,\eta)}{h_t(k,\eta=0)}\left(\frac{k\eta}{3j_1(k\eta)}\right).`}</Eq>
        <Tx>{R`你也许认出了括号中的项正是习题 6.12 中物质主导解的倒数。在基准宇宙学中数值求解 \eqref{6.73}，计算 $\eta=\eta_0$ 处的转移函数。`}</Tx>
      </Exercise>

      <Exercise n="6.14" title="张量扰动下的光子 Boltzmann 方程" level="★★★"
        hint={R`仿照习题 5.1（同步规范）：张量度规中 $\frac1p\frac{dp}{dt}=-H-\frac12\dot h^{\rm TT}_{ij}\hat p^i\hat p^j$。碰撞项要保留 Compton 散射的角依赖 $\propto1+(\hat{\boldsymbol p}\cdot\hat{\boldsymbol p}')^2$，用 Legendre 加法定理挑出 $m=\pm2$ 部分。`}
        solution={R`**左边。**度规 \eqref{6.49} 中 $g_{00}=-1$、$g_{0i}=0$，测地线方程的 0 分量给出 $\frac1p\frac{dp}{dt}=-H-\frac12${hT}_{ij,0}\hat p^i\hat p^j$（与习题 5.1 同理，只是 $h_{ij}$ 换成 $h^{\rm TT}_{ij}$）。照 §5.1 的步骤，$\Theta$ 方程左边为 $\dot\Theta+\frac{\hat p^i}a\partial_i\Theta+\frac12${hT}_{ij,0}\hat p^i\hat p^j$。取 $\hat{\boldsymbol k}=\hat{\boldsymbol e}_z$，$\hat{\boldsymbol p}=(\sqrt{1-\mu^2}\cos${az},\sqrt{1-\mu^2}\sin${az},\mu)$：
$$${hT}_{ij}\hat p^i\hat p^j=(1-\mu^2)\left[h_+\cos2${az}+h_\times\sin2${az}\right].$$
所以源项天然具有 \eqref{6.85} 的方位依赖，换成共形时间并代入 \eqref{6.85}，$+$ 分量的左边为 $\frac{d${ThT}_+}{d\eta}+ik\mu${ThT}_++\frac12h'_+$（$\times$ 同理）。

**碰撞项。**散射进来的光子贡献 $S(\hat{\boldsymbol p})=\frac{3}{16\pi}\int d\Omega'[1+(\hat{\boldsymbol p}\cdot\hat{\boldsymbol p}')^2]\Theta(\hat{\boldsymbol p}')$（忽略偏振）。把 $1+\cos^2\gamma=\frac43+\frac23\mathcal P_2(\cos\gamma)$ 并用加法定理 $\mathcal P_2(\cos\gamma)=\frac{4\pi}5\sum_mY_{2m}(\hat{\boldsymbol p})Y^*_{2m}(\hat{\boldsymbol p}')$：对 $\Theta\propto(1-\mu'^2)\cos2${az}'$，单极部分与 $m\neq\pm2$ 的部分都积分为零（$\int d${az}'\cos2${az}'=0$），重子速度项同样为零。保留 $m=\pm2$，算得
$$S=(1-\mu^2)\cos2${az}\cdot\frac3{32}\int_{-1}^1d\mu'(1-\mu'^2)^2${ThT}_+(\mu').$$
再展开 $(1-\mu^2)^2=\frac8{15}\mathcal P_0-\frac{16}{21}\mathcal P_2+\frac8{35}\mathcal P_4$，并用 $\int d\mu\,\mathcal P_l${ThT}=2(-i)^l${ThT}_l$：
$$\frac3{32}\left[\frac{16}{15}${ThT}_0+\frac{32}{21}${ThT}_2+\frac{16}{35}${ThT}_4\right]=\frac1{10}${ThT}_0+\frac17${ThT}_2+\frac3{70}${ThT}_4.$$
碰撞项 $-\tau'[S-\Theta]$ 于是给出 \eqref{6.86} 右边的 $\tau'[${ThT}_t-\frac1{10}${ThT}_{t,0}-\frac17${ThT}_{t,2}-\frac3{70}${ThT}_{t,4}]$。（计入偏振后系数会改变，见第 10 章。）`}>
        <Tx>{R`推导存在 \eqref{6.49} 给出的张量扰动时光子分布函数的方程。与标量扰动不同，张量扰动会在 $\Theta_l$ 中引入方位角依赖，所以需要把张量造成的各向异性分解为`}</Tx>
        <Eq n="6.85" say="张量模产生的温度各向异性带有 $\cos2\phi$、$\sin2\phi$ 的方位依赖——两叶的“四极”图样，分别对应 $+$ 与 $\times$ 偏振。">{R`${ThT}(k,\mu,${az})=${ThT}_+(k,\mu)(1-\mu^2)\cos(2${az})+${ThT}_\times(k,\mu)(1-\mu^2)\sin(2${az}).`}</Eq>
        <Tx>{R`证明 $+$ 与 $\times$ 分量都满足`}</Tx>
        <Eq n="6.86" say="张量模的光子方程：自由流项与标量情形相同，引力源项是引力波的变化率 $\frac12h_t'$，碰撞项把分布拉向 Compton 散射的 $m=\pm2$ 源（含单极、四极、十六极矩）。">{R`\frac{d${ThT}_t}{d\eta}+ik\mu${ThT}_t+\frac12h_t{}'=\tau'\left[${ThT}_t-\frac1{10}${ThT}_{t,0}-\frac17${ThT}_{t,2}-\frac3{70}${ThT}_{t,4}\right]`}</Eq>
        <Tx>{R`其中 $t$ 代表 $\times$ 或 $+$，矩 $${ThT}_{t,l}$ 仿照 \eqref{5.66} 中的标量矩定义。`}</Tx>
      </Exercise>

      <Exercise n="6.15" title="矢量扰动" level="★★"
        hint={R`由 \eqref{6.6}，矢量部分为 $ik_iV_j+ik_jV_i$；取 $\boldsymbol k=k\hat{\boldsymbol e}_z$ 看 $zz$ 分量。`}
        solution={R`**与 $V_i$ 的关系。**由 \eqref{6.6}，$h^V_{ij}=ik_iV_j+ik_jV_i$。$k_x=k_y=0$、$k_z=k$，所以 $h_{xz}=ikV_x$，$h_{yz}=ikV_y$，而 $h_{zz}=2ikV_z$。\eqref{6.87} 中 $h_{zz}=0$，故 $V_z=0$，即 $k^iV_i=0$：$V_i$ 是横向的。

**不影响标量与张量方程。**对度规 $g_{ij}=a^2(\delta_{ij}+h^V_{ij})$ 直接计算 Einstein 张量（编者用 sympy 完成），一阶部分中 $\delta G^0{}_0=0$、纵向无迹部分 $(\hat k_i\hat k^j-\frac13\delta^j_i)\delta G^i{}_j=0$、$\delta G^1{}_1-\delta G^2{}_2=0$、$\delta G^1{}_2=0$。所以 \eqref{6.41}、\eqref{6.48}、\eqref{6.73} 都不受矢量扰动影响。物理原因同样是转动性质：$h_{xz}$、$h_{yz}$ 在绕 $\hat{\boldsymbol k}$ 转动下按 $m=\pm1$ 变换，不能与 $m=0$（标量）或 $m=\pm2$（张量）的组合混合。

**附带：矢量模衰减。**非零的分量是 $\delta G^1{}_3=\frac12(\ddot h_{xz}+3H\dot h_{xz})=\frac1{2a^2}(h''_{xz}+2\frac{a'}ah'_{xz})$ 与 $\delta G^0{}_1=-\frac{ik}2\dot h_{xz}$。没有矢量型源（涡旋动量、各向异性应力）时，后者直接给出 $h'_{xz}=0$；即使初始有涡旋，前者也给出 $h'_{xz}\propto a^{-2}$——这就是正文所说"矢量扰动产生后迅速衰减"。`}>
        <Tx>{R`考虑度规的矢量扰动。特化到 $\hat{\boldsymbol k}=\hat{\boldsymbol e}_z$，它们可以用两个函数 $h_{xz}$ 和 $h_{yz}$ 描述，同样只扰动度规的空间部分（回忆 §6.2：可以用规范自由消去度规中两个横向矢量之一，这里消去的是 $B_i$）。于是 $h_{ij}$ 为`}</Tx>
        <Eq n="6.87" say="矢量扰动只出现在 $xz$、$yz$ 两个非对角分量：它把垂直于 $\boldsymbol k$ 的方向与 $\boldsymbol k$ 方向耦合起来（“剪切”），绕 $\boldsymbol k$ 转动时按 $m=\pm1$ 变换。">{R`${hV}_{ij}=\begin{pmatrix}0&0&h_{xz}\\ 0&0&h_{yz}\\ h_{xz}&h_{yz}&0\end{pmatrix}.`}</Eq>
        <Tx>{R`把 $h_{xz}$、$h_{yz}$ 与 $V_i$ 联系起来，并证明 $V_i$ 是横向的。然后证明 $h_{xz}$ 与 $h_{yz}$ 不影响迄今为止推出的任何标量或张量演化方程：\eqref{6.41}、\eqref{6.48} 与 \eqref{6.73}——又一个分解定理的侧面。`}</Tx>
      </Exercise>
    </Sec>);
}
