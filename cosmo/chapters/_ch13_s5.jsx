// §13.5 Weak-lensing statistics —— 式 (13.41)–(13.62)，图 13.7–13.9；§13.6 Summary —— 式 (13.63)–(13.66)
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { CkkPlot, XiPlot, GammaTPlot } from "./_ch13_plots.jsx";

const R = String.raw;

export function Sec135() {
  return (
    <Sec n="13.5" title="Weak-lensing statistics" zh="弱透镜统计"
      gist={R`单个像素的 $\psi_{ij}$ 平均为零，要做两点统计。Fourier 空间 $-\psi_{ij}=l_il_j\phi_{\rm L}$，只有 E 模且 $E=\kappa$；用 Limber 近似与 Poisson 方程得 $C_{EE}=C_{\kappa\kappa}=(\frac32\Omega_{\rm m}H_0^2)^2\int d\chi\,a^{-2}g_{\rm L}^2P(l/\chi)$。实空间是 $\xi_\pm=\int\frac{ldl}{2\pi}J_{0,4}C_{EE}$；与前景星系交叉得 $C_{{\rm g}E}\propto b_1$ 与切向剪切 $\xi_{{\rm g},t}$。`}
      why={R`$\langle\psi_{ij}\rangle=0$（因为 $\langle\phi_{\rm L}\rangle=0$）：要"赚到钱"，必须像对 CMB 与星系分布那样，计算角相关函数或其 Fourier 变换——功率谱。推导就是把 \secref{11.2}（投影角相关）与 \secref{10.1}（剪切类比偏振）结合起来。`}
      gives={["13.42", "13.44", "13.46", "13.49", "13.51", "13.53", "13.58", "13.61", "13.62"]}>
      <p className="muted">本节概念：<C id="eb" /> · <C id="cee" /> · <C id="kernel" /> · <C id="ggl" /> · <C id="ia" /></p>
      <Tx>{R`**平直天空就够了。**畸变张量的每个分量平均为零：$\langle\psi_{ij}\rangle=0$，因为 $\langle\phi_{\rm L}\rangle=0$。我们再次采用平直天空近似——这是合理的，因为大部分透镜信号在小尺度上（角波数 $l\gtrsim100$）。于是推导基本上就是把 \secref{11.2}（投影角相关）与 \secref{10.1}（剪切类比偏振）的结果结合起来。我们先在 Fourier 空间求功率谱，再推导实空间的相关函数，最后转向其他重要的透镜统计量，特别是与星系计数的交叉相关。`}</Tx>

      <Sub n="13.5.1" title="Shear power spectrum" zh="剪切功率谱">
        <Tx>{R`**第一步：E 模就是会聚。**为了求剪切功率谱，对 \eqref{13.17} 做二维 Fourier 变换：`}</Tx>
        <Eq n="13.41" say={R`Fourier 空间中畸变张量就是 $l_il_j$ 乘以透镜势：纯"梯度–梯度"型。`}>{R`-\psi_{ij}(\boldsymbol l) = l_il_j\,\phi_{\rm L}(\boldsymbol l).`}</Eq>
        <Tx>{R`借助 \eqref{13.30}，这个关系让我们能直接算出剪切与会聚的功率谱。有了畸变张量的这一表达式，就可以像 \secref{10.1} 中处理 $I_{ij}$ 那样处理它；E 模由 \eqref{10.6} 给出（注意要从 $-\psi_{ij}$ 中减去迹）：`}</Tx>
        <Eq n="13.42" keyEq title="剪切的 E 模等于会聚" say={R`把畸变张量投影到 E 模，得到 $\frac12l^2\phi_{\rm L}$——恰好就是会聚 $\kappa$；投影到 B 模为零。`}>{R`E(\boldsymbol l) = \left(\frac{l^il^j}{l^2}-\frac12\delta_{ij}\right)\left[-\psi_{ij}(\boldsymbol l)\right] = \frac12l^2\phi_{\rm L}(\boldsymbol l) = \kappa(\boldsymbol l).`}</Eq>
        <Tx>{R`最后一个等号同样来自 \eqref{13.30}：取 $-\psi_{ij}$ 的迹得 $2\kappa=-(\partial^2/\partial\theta_1^2+\partial^2/\partial\theta_2^2)\phi_{\rm L}$。**B 模为零**，这可以由 \eqref{10.5} 推出；也可以证明，在线性阶畸变张量的 B 模只能由旋度型的偏折角产生，而 \eqref{13.14} 显然是梯度型的（\exref{13.5}）。`}</Tx>
        <Derivation title={R`E 模与 B 模的投影`} collapsed steps={[
          { tex: R`\left(\frac{l^il^j}{l^2}-\frac12\delta_{ij}\right)l_il_j\phi_{\rm L}=\left(l^2-\frac{l^2}2\right)\phi_{\rm L}=\frac12l^2\phi_{\rm L}`, why: R`E 模投影。` },
          { tex: R`-\psi_{ii}=l^2\phi_{\rm L}=2\kappa\ \Rightarrow\ \kappa(\boldsymbol l)=\tfrac12l^2\phi_{\rm L}(\boldsymbol l)`, why: R`由 \eqref{13.30}，$\psi$ 的迹为 $-2\kappa$。` },
          { tex: R`B\propto\frac{l^i\epsilon^{jk}l_k}{l^2}\,l_il_j\phi_{\rm L}=\frac{(\boldsymbol l\cdot\boldsymbol l)(l_j\epsilon^{jk}l_k)}{l^2}\phi_{\rm L}=0`, why: R`B 模的投影算子含一个 $\epsilon^{jk}$（把 $\boldsymbol l$ 转 $90^\circ$），与 $l_jl_k$ 缩并为零。` },
        ]} />
        <Tx>{R`**第二步：E 模功率谱。**E 模、因而 $\kappa$ 的功率谱为`}</Tx>
        <Eq n="13.43" say={R`E 模功率谱的定义：统计均匀性使不同 $\boldsymbol l$ 不相关。`}>{R`\left\langle E(\boldsymbol l)E^*(\boldsymbol l')\right\rangle = (2\pi)^2\delta_{\rm D}^{(2)}(\boldsymbol l-\boldsymbol l')\,C_{EE}(l),`}</Eq>
        <Tx>{R`各功率谱之间的关系为`}</Tx>
        <Eq n="13.44" keyEq title={R`$C_{EE}=C_{\kappa\kappa}$`} say={R`剪切 E 模谱、会聚谱是同一个东西，都等于透镜势谱乘以 $l^4/4$。`}>{R`C_{EE}(l) = C_{\kappa\kappa}(l) = \frac14l^4\,C_{\phi_{\rm L}\phi_{\rm L}}(l).`}</Eq>
        <Tx>{R`**第三步：$\phi_{\rm L}$ 是天空上的标量——照搬 \secref{11.2}。**方便的是，$\phi_{\rm L}$ 是天空上的标量，所以它的功率谱可以完全按照星系角相关（\secref{11.2}）的方法计算。仿照 \eqref{11.39} 写（平直天空中从一开始就用 $\boldsymbol\theta$ 代替了 $\hat{\boldsymbol n}$）`}</Tx>
        <Eq n="13.45" say={R`透镜势写成"投影核乘以三维场"的标准形式：核为 $2g_{\rm L}(\chi)/\chi$，三维场为 $\Phi$。`}>{R`\phi_{\rm L}(\boldsymbol\theta) = 2\int_0^\infty\frac{d\chi}\chi\,g_{\rm L}(\chi)\,\Phi(\boldsymbol x(\chi),\eta_0-\chi).`}</Eq>
        <Tx>{R`与 \eqref{11.39} 唯一的不同是核 $g_{\rm L}(\chi)$（马上给出），以及要把 $\delta_{\rm g}$ 换成 $2\Phi$。推导于是完全照 \secref{11.2} 进行，由 \eqref{11.47} 得`}</Tx>
        <Eq n="13.46" say={R`Limber 近似：角波数 $l$ 只"看到"每个距离上的三维波数 $(l+\frac12)/\chi$，功率谱是沿视线对 $P_\Phi$ 的加权积分。`}>{R`C_{\phi_{\rm L}\phi_{\rm L}}(l) = 4\int_0^\infty\frac{d\chi}{\chi^2}\frac{g_{\rm L}^2(\chi)}{\chi^2}P_\Phi\left(k=\frac{l+1/2}\chi,\eta(\chi)\right).`}</Eq>
        <Tx>{R`**第四步：透镜核。**现在推导 $\phi_{\rm L}$ 的投影核 $g_{\rm L}$，这需要再考虑一个观测上的复杂性。\eqref{13.17} 给出固定距离 $\chi$ 处星系的畸变张量。透镜是小效应、需要大量统计，所以通常在**测光**巡天中测量，而测光巡天并不给出每个星系的距离。因此我们测的是一个星系红移**分布**上的畸变张量统计。像 \secref{11.2} 研究角相关时那样，把这个分布记作 $W(\chi)$，并归一化为 $\int_0^\infty d\chi W(\chi)=1$。于是透镜势（\eqref{13.16}）为`}</Tx>
        <Eq n="13.47" say={R`对源的距离分布求平均：每个源距离 $\chi$ 都有自己的透镜势 \eqref{13.16}。`}>{R`\phi_{\rm L}(\boldsymbol\theta) = 2\int_0^\infty d\chi\,W(\chi)\int_0^\chi\frac{d\chi'}{\chi'}\Phi(\boldsymbol x(\boldsymbol\theta,\chi'))\left(1-\frac{\chi'}\chi\right).`}</Eq>
        <Tx>{R`同样可以交换积分次序来简化这个二重积分（几乎与 \figref{13.5} 完全相同）：`}</Tx>
        <Eq n="13.48" say={R`交换次序后：透镜势是对"透镜位置" $\chi'$ 的单重积分，所有关于源的信息装进 $g_{\rm L}$。`}>{R`\phi_{\rm L}(\boldsymbol\theta) = 2\int_0^\infty\frac{d\chi'}{\chi'}g_{\rm L}(\chi')\,\Phi(\boldsymbol x(\boldsymbol\theta,\chi'))`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="13.49" keyEq title="透镜核" say={R`透镜核：位于 $\chi'$ 的物质对所有比它远的源的平均"杠杆效率" $1-\chi'/\chi$。`}>{R`g_{\rm L}(\chi') \equiv \int_{\chi'}^\infty d\chi\left(1-\frac{\chi'}\chi\right)W(\chi).`}</Eq>
        <Tx>{R`\secref{13.2} 的交互图画出了它（以及乘上 $\chi'$ 与 $1/a$ 之后的会聚有效权重）。注意只有 $\chi>\chi'$ 的源才贡献：物质只能透镜它**后面**的源。`}</Tx>
        <Figure n="13.7" width="65%" interactive={<CkkPlot />}
          caption={R`CMB（红色虚线，$z_S=1089$）与源星系（黑色实线；中心 $z_S=2$、方均根宽度 $\Delta z=0.2$ 的高斯红移分布）的 E 模剪切功率谱。注意平直天空处理中 $C_{EE}(l)=C_{\kappa\kappa}(l)=(l^4/4)C_{\phi_{\rm L}\phi_{\rm L}}(l)$。两条曲线都用了在模拟上校准的非线性物质功率谱随红移变化的处方（见 \secref{12.7}）。CMB 透镜的功率谱比星系的大，因为距离杠杆臂更长。**交互版**：浏览器内用 EH98 转移函数 + Halofit（Takahashi 2012）与 Limber 积分 \eqref{13.51} 计算；虚线为同一计算但用线性 $P(k)$。可调 $\Omega_{\rm m}$、$\sigma_8$ 观察振幅的依赖。注意原书图例写"$z_S\approx1.5$"，与图注的 $z_S=2$ 不一致；而原书纵轴约为本页数值的 4 倍（见下方说明），把"纵轴乘数"拨到 4 可与原图对照。`} />
        <Box kind="warning" title={R`疑似勘误：\figref{13.7} 的纵轴归一化与图例`}>{R`本页数值（基准 $\Lambda$CDM，$\sigma_8=0.81$）给出 CMB 透镜势谱 $[L(L+1)]^2C_{\phi_{\rm L}\phi_{\rm L}}/2\pi$ 在 $L=40$ 处的峰值 $1.39\times10^{-7}$——与 Planck 等标准计算一致。按 \eqref{13.44} 换算，$l(l+1)C_{EE}/2\pi$ 在 $l=10$、$100$、$1000$ 处为 $2.7\times10^{-6}$、$2.5\times10^{-4}$、$1.7\times10^{-3}$。从原图量得的对应值约为 $1\times10^{-5}$、$9\times10^{-4}$、$6.5\times10^{-3}$，系统地高约 4 倍——相当于画的是 $l^4C_{\phi_{\rm L}\phi_{\rm L}}$ 而漏了 \eqref{13.44} 中的 $1/4$。星系曲线同样高约 4 倍；而且原图中 CMB 与星系曲线的比值（$l=1000$ 处约 14）与本页 $z_S=1.5$ 的比值（13.6）吻合，与 $z_S=2$ 的比值（9.6）不符，说明原图实际用的是图例中的 $z_S\approx1.5$。这些都不影响正文的任何公式。`}</Box>
        <Tx>{R`**第五步：换成物质功率谱。**本质上已经完成了，但再把功率谱整理成稍简单的形式。首先，设 $l$ 足够大，可以忽略 $P_\Phi$ 宗量中的 $+1/2$。其次，可以用 Poisson 方程 \eqref{8.6} 把 $\Phi$ 与非线性物质密度扰动 $\delta_{\rm m}$ 联系起来（第 12 章论证过，它对非线性结构仍然成立）：`}</Tx>
        <Eq n="13.50" say={R`Poisson 方程把势谱换成物质谱：$P_\Phi\propto k^{-4}P$，在 $k=l/\chi$ 处给出 $\chi^4/l^4$。`}>{R`k^2\Phi = -\frac32\Omega_{\rm m}H_0^2a^{-1}\delta_{\rm m},\qquad\text{so that}\qquad P_\Phi\left(k=\frac l\chi\right) = \left(\frac{3\Omega_{\rm m}H_0^2}{2a}\right)^2\frac{\chi^4}{l^4}P\left(\frac l\chi\right).`}</Eq>
        <Box kind="warning" title={R`符号说明：\eqref{13.50} 的负号`}>{R`按本书约定（\eqref{8.5}、\eqref{12.5}：$-k^2\Psi=k^2\Phi=4\pi Ga^2\rho_{\rm m}\delta_{\rm m}$，而 $4\pi Ga^2\rho_{\rm m}=\frac32\Omega_{\rm m}H_0^2/a$），应为 $k^2\Phi=+\frac32\Omega_{\rm m}H_0^2a^{-1}\delta_{\rm m}$——过密区 $\Phi>0$，与 \eqref{13.13} 后的符号讨论一致。\eqref{13.50} 的负号对 $P_\Phi$ 与 \eqref{13.51} 毫无影响（平方）；交叉谱 \eqref{13.61} 也是按正号写出的。本页按原书照录。`}</Box>
        <Tx>{R`于是 $\chi^4$ 消去 \eqref{13.46} 中的分母，$l^4$ 消去 \eqref{13.44} 中的 $l^4$，剩下`}</Tx>
        <Eq n="13.51" keyEq title="剪切功率谱（Limber）" say={R`剪切功率谱是沿视线对非线性物质功率谱的积分，权重 $a^{-2}g_{\rm L}^2$，振幅 $\propto(\Omega_{\rm m}H_0^2)^2$：没有偏袒，直接称量物质。`}>{R`C_{EE}(l) = C_{\kappa\kappa}(l) = \left(\frac32\Omega_{\rm m}H_0^2\right)^2\int_0^\infty d\chi\,a^{-2}(\chi)\,g_{\rm L}^2(\chi)\,P\left(k=\frac l\chi,\eta(\chi)\right).`}</Eq>
        <Derivation title={R`把 \eqref{13.44}、\eqref{13.46}、\eqref{13.50} 串起来`} collapsed steps={[
          { tex: R`C_{\kappa\kappa}=\frac{l^4}4\cdot4\int\frac{d\chi}{\chi^4}g_{\rm L}^2\,P_\Phi(l/\chi)`, why: R`\eqref{13.44} 乘 \eqref{13.46}（忽略 $+1/2$）。` },
          { tex: R`=l^4\int\frac{d\chi}{\chi^4}g_{\rm L}^2\left(\frac{3\Omega_{\rm m}H_0^2}{2a}\right)^2\frac{\chi^4}{l^4}P(l/\chi)`, why: R`代入 \eqref{13.50}。` },
          { tex: R`=\left(\frac32\Omega_{\rm m}H_0^2\right)^2\int d\chi\,a^{-2}g_{\rm L}^2P(l/\chi)`, why: R`$l^4$ 与 $\chi^4$ 全部相消。` },
        ]} result={R`等价地，$\kappa(\boldsymbol\theta)=\frac32\Omega_{\rm m}H_0^2\int d\chi\,\chi\,g_{\rm L}(\chi)\,\delta_{\rm m}/a$：会聚就是加权投影的密度场，再用 Limber 公式即得同一结果。`} />
        <Tx>{R`**结果解读。**也就是说，透镜诱导的星系椭率相关的角功率谱，直接正比于对**非线性**物质功率谱 $P(k)$ 的积分，权重是透镜核 \eqref{13.49}。注意 $\Omega_{\rm m}$ 出现了：透镜的振幅由势扰动控制，而势扰动依赖产生引力的物质总量、从而依赖平均物质密度。基准 $\Lambda$CDM 宇宙学的结果见 \figref{13.7}。显然，大部分剪切信号在小角尺度上。

**弱透镜的威力。**第一，它**直接**探测非线性物质功率谱 $P(k)$，中间没有星系那样恼人的偏袒因子。因此可以用来约束涨落振幅 $\sigma_8$ 以及 $\Omega_{\rm m}$。重要的是，即使在小尺度上——$P(k)$ 处于非线性区——\eqref{13.51} 仍相当准确。也就是说，我们全程忽略的剪切本身的非线性，比三维密度场中的非线性小得多。我们对弱透镜的理论预言因而只受限于预言非线性物质功率谱的能力，而后者在非常小的尺度上会对重子效应敏感（\secref{12.3}）。第二，弱透镜也告诉我们膨胀史，因为 $C_{EE}(l)$ 的振幅依赖到源星系的共动距离 $\chi$，即依赖距离–红移关系。此外，我们知道星系椭率有两个分量，但只有一个——E 模——不为零。所以观测到的 B 模可以作为测量中系统误差的严格检验。

**挑战。**第一，信号很小（见 \figref{13.7} 的纵轴与 \exref{13.8}），因为光子以光速运动、很难被偏折。这意味着需要大量星系才能精确测量，进而意味着这些星系大多很暗，这给稳健的形状测量带来挑战。第二，实际上我们并不准确知道源星系的红移分布，所以必须用外部测量或透镜统计本身来校准（代价是损失一些宇宙学约束能力）。

**内禀取向。**最后，星系形状在内禀上并非完全不相关，必须在解释测量时包含它们内禀相关的模型——称为**内禀取向**（intrinsic alignments）。大尺度上使星系形状内禀相关的领头效应是潮汐场。于是，写出形状与引力势二阶导数张量之间的线性关系：`}</Tx>
        <Eq n="13.52" title="线性潮汐取向" say={R`星系的内禀形状线性响应于所在处的潮汐场（势的横向二阶导数）：这是"形状版"的线性偏袒。`}>{R`q_{ij}^{\rm IA}(\boldsymbol x,\eta) = c_1(\eta)\frac{\partial^2}{\partial\theta^i\partial\theta^j}\Psi(\boldsymbol x,\eta) = -c_1(\eta)\chi^2\Phi_{,ij}(\boldsymbol x,\eta),`}</Eq>
        <Tx>{R`其中 $c_1$ 只依赖时间。这是星系密度线性偏袒关系在形状上的类比。由于形状用天空上的 $2\times2$ 对称矩阵描述，必须把潮汐场写成与 $q_{ij}$ 一致的形式。在 \exref{13.9} 中可以推导这一效应怎样贡献剪切统计。观测上潮汐取向已被高显著性地探测到，但系数 $c_1$ 一般小于 1——星系的"取向"弱于它们的"成团"。尽管如此，鉴于当今弱透镜测量的高精度，必须计入这一效应。还要注意，我们不指望 \eqref{13.52} 在弱非线性或完全非线性尺度上足够：类比 \secref{12.6} 推出的非线性偏袒贡献，非线性取向项会变得重要。`}</Tx>
      </Sub>

      <Sub n="13.5.2" title="Shear correlation function" zh="剪切相关函数">
        <Tx>{R`**为什么要实空间。**现在转向剪切功率谱的 Fourier 变换——相关函数。在大尺度结构领域（不同于 CMB），相关函数用得很多，因为它比功率谱更容易测量。我们迄今所用的 E/B 分解天然在 Fourier 空间中进行，所以没有简单的"E 模相关函数"概念。不过，B 模的缺失同样体现在剪切相关函数中。

**剪切分量与 E 模。**首先再次利用偏振类比，由 \eqref{10.11} 得`}</Tx>
        <Eq n="13.53" say={R`单个 Fourier 模的剪切方向由波矢方位角的两倍决定（自旋 2）：E 模沿波矢或垂直于波矢拉伸。`}>{R`\begin{pmatrix}\gamma_1(\boldsymbol l)\\ \gamma_2(\boldsymbol l)\end{pmatrix} = \begin{pmatrix}\cos2\phi_l\\ \sin2\phi_l\end{pmatrix}E(\boldsymbol l),`}</Eq>
        <Tx>{R`这里一开始就丢掉了所有 B 模（见 \exref{13.10}）。（可直接验证：由 \eqref{13.41}，$\gamma_1=-\psi_{11}-\kappa=l^2\cos^2\phi_l\,\phi_{\rm L}-\frac12l^2\phi_{\rm L}=E\cos2\phi_l$，$\gamma_2=-\psi_{12}=l^2\cos\phi_l\sin\phi_l\,\phi_{\rm L}=E\sin2\phi_l$。）计算 $\gamma_1$ 的自相关：`}</Tx>
        <Eq n="13.54" say={R`$\gamma_1$ 的自相关：对每个 Fourier 模按 $\cos^22\phi_l$ 加权，再做 Fourier 反变换。`}>{R`\begin{aligned}\left\langle\gamma_1(\boldsymbol0)\gamma_1(\boldsymbol\theta)\right\rangle &= \int\frac{d^2l}{(2\pi)^2}\int\frac{d^2l'}{(2\pi)^2}\cos2\phi_l\cos2\phi_{l'}\left\langle E(\boldsymbol l)E(\boldsymbol l')\right\rangle e^{i\boldsymbol l\cdot\boldsymbol\theta}\\ &= \int\frac{d^2l}{(2\pi)^2}e^{il\theta\cos\phi_l}\cos^22\phi_l\,C_{EE}(l),\end{aligned}`}</Eq>
        <Tx>{R`其中把 $l_x$ 轴对准了 $\boldsymbol\theta$（下面会回到这一点）。$\gamma_2$ 的相关函数同理，只是把 $\cos^22\phi_l$ 换成 $\sin^22\phi_l$。所以取两者之和，算起来很简单：`}</Tx>
        <Eq n="13.55" say={R`两个分量的自相关之和与坐标无关，只需方位角平均，给出 $J_0$。`}>{R`\left\langle\gamma_1(\boldsymbol0)\gamma_1(\boldsymbol\theta)\right\rangle+\left\langle\gamma_2(\boldsymbol0)\gamma_2(\boldsymbol\theta)\right\rangle = \int\frac{ldl}{2\pi}J_0(l\theta)\,C_{EE}(l),`}</Eq>
        <Tx>{R`这里用了 \eqref{C.24}。另一方面，两者之差也很容易计算：`}</Tx>
        <Eq n="13.56" say={R`两个分量自相关之差按 $\cos4\phi_l$ 加权，方位角积分给出 $J_4$。`}>{R`\begin{aligned}\left\langle\gamma_1(\boldsymbol0)\gamma_1(\boldsymbol\theta)\right\rangle-\left\langle\gamma_2(\boldsymbol0)\gamma_2(\boldsymbol\theta)\right\rangle &= \int\frac{d^2l}{(2\pi)^2}e^{il\theta\cos\phi_l}\cos^24\phi_l\,C_{EE}(l)\\ &= \int\frac{ldl}{2\pi}J_4(l\theta)\,C_{EE}(l),\end{aligned}`}</Eq>
        <Box kind="warning" title={R`疑似勘误：\eqref{13.56} 第一行应为 $\cos4\phi_l$，不是 $\cos^24\phi_l$`}>{R`$\cos^22\phi_l-\sin^22\phi_l=\cos4\phi_l$。由 \eqref{C.24}，$\int_0^{2\pi}\frac{d\phi}{2\pi}e^{ix\cos\phi}\cos n\phi=i^nJ_n(x)$，取 $n=4$ 正好给出第二行的 $J_4$（$i^4=1$）；若按 $\cos^24\phi_l=\frac12(1+\cos8\phi_l)$ 计算，会得到 $\frac12[J_0+J_8]$。第二行（以及 \eqref{13.58}）是正确的。`}</Box>
        <Derivation title={R`方位角积分：$J_0$、$J_2$、$J_4$ 的来源`} collapsed steps={[
          { tex: R`\int\frac{d^2l}{(2\pi)^2}e^{il\theta\cos\phi_l}F(l)\cos n\phi_l=\int\frac{ldl}{2\pi}F(l)\int_0^{2\pi}\frac{d\phi_l}{2\pi}e^{il\theta\cos\phi_l}\cos n\phi_l=i^n\int\frac{ldl}{2\pi}J_n(l\theta)F(l)`, why: R`\eqref{C.24}。` },
          { tex: R`\cos^22\phi+\sin^22\phi=1\ (n=0),\qquad\cos^22\phi-\sin^22\phi=\cos4\phi\ (n=4,\ i^4=1)`, why: R`给出 \eqref{13.55} 与 \eqref{13.56}。` },
          { tex: R`\cos2\phi\ (n=2,\ i^2=-1)\ \Rightarrow\ -\int\frac{ldl}{2\pi}J_2(l\theta)C_{{\rm g}E}`, why: R`给出 \eqref{13.62} 的负号。` },
        ]} />
        <Tx>{R`**与坐标无关的写法：切向与交叉剪切。**分量 $\gamma_{1,2}$ 依赖坐标系的定义。我们把 $\boldsymbol\theta$ 对准了 $x$ 轴，所以被相关形状的两个星系之间的连线在 \figref{10.2} 中是水平的。于是 $\gamma_1$ 不为零对应星系沿 $\boldsymbol\theta$ 或垂直于它取向（就像 $Q$ 偏振）；$\gamma_2$ 不为零对应星系与分离矢量 $\boldsymbol\theta$ 成 $45^\circ$ 取向（像 $U$ 偏振）。可以推广这一分解，使结果与坐标定义无关。具体做法不是测量 $\gamma_1$ 或 $\gamma_2$，而是测量 $\gamma_t$ 与 $\gamma_\times$：**切向剪切** $\gamma_t$ 是平行或垂直于两星系连线的剪切分量（沿连线的剪切取负）；**交叉分量**与分离矢量成 $45^\circ$ 或 $135^\circ$。上面的结果对这些与坐标无关的定义同样成立：`}</Tx>
        <Eq n="13.57" say={R`切向–切向与交叉–交叉相关之和、差，分别定义 plus 型与 minus 型剪切相关函数。`}>{R`\left\langle\gamma_t(\boldsymbol0)\gamma_t(\boldsymbol\theta)\right\rangle\pm\left\langle\gamma_\times(\boldsymbol0)\gamma_\times(\boldsymbol\theta)\right\rangle = \xi_{+,-}(\theta)`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="13.58" keyEq title={R`剪切相关函数 $\xi_\pm$`} say={R`$\xi_+$ 与 $\xi_-$ 都是 $C_{EE}$ 的 Hankel 变换，分别用 $J_0$ 与 $J_4$：$\xi_-$ 对更小尺度的 $l$ 更敏感。`}>{R`\xi_{+,-}(\theta) = \int\frac{ldl}{2\pi}J_{0,4}(l\theta)\,C_{EE}(l)`}</Eq>
        <Tx>{R`是"plus"型与"minus"型剪切相关函数，二者都由 $C_{EE}(l)=C_{\kappa\kappa}(l)$ 唯一确定。还可以证明两个剪切分量之间的交叉相关为零：$\langle\gamma_t(\boldsymbol0)\gamma_\times(\boldsymbol\theta)\rangle=0$（把 $\boldsymbol\theta$ 对准 $x$ 轴时这很简单：被积函数含 $\cos2\phi_l\sin2\phi_l$，方位角积分为零）。所有这些关系都源于椭率场是纯 E 模；如果存在 B 模，它们也会贡献 $\xi_+$ 与 $\xi_-$，但在后者中带负号（\exref{13.10}）。`}</Tx>
        <Figure n="13.8" width="50%" interactive={<XiPlot />}
          caption={R`暗能量巡天（DES）第一年数据测得的剪切相关函数。包含完整的源星系样本，未按光度红移分组。实线为最佳拟合 $\Lambda$CDM 模型的预言（含内禀取向及其他效应）。取自 Troxel et al. (2018)。**交互版**：用本页的 $C_{EE}$（Halofit）按 \eqref{13.58} 数值计算 $\xi_\pm$；源分布取高斯 $n(z)$，默认中心 $0.6$、宽 $0.3$ 以粗略模拟 DES Y1（未含内禀取向、光度红移误差等），量级与原图相符（在 $10'$ 处原图 $\xi_+\approx1.3\times10^{-5}$）。`} />
        <Tx>{R`**DES 的测量。**\figref{13.8} 给出暗能量巡天的一个测量。显然透镜以非常高的信噪比被探测到，尤其是在小尺度上（图的左边）。测量与 $\Lambda$CDM 预言完全相容。实际的宇宙学约束来自更大的数据矢量：按光度红移估计把源星系样本分成四个子样本，然后使用这些样本之间的全部形状自相关与交叉相关，从而获得关于膨胀史与暗能量物态方程的更多信息。`}</Tx>
      </Sub>

      <Sub n="13.5.3" title="Shear cross-correlations" zh="剪切交叉相关：星系–星系透镜">
        <Tx>{R`**交叉相关。**透镜剪切一个非常重要的应用是与其他宇宙学场的交叉相关，特别是与星系密度。仿照 \eqref{11.39}，考虑投影星系密度`}</Tx>
        <Eq n="13.59" say={R`前景（"透镜"）星系的投影密度：三维星系过密度沿视线按透镜样本的分布 $W_{\rm g}$ 加权。`}>{R`\Delta_{\rm g}(\boldsymbol\theta) = \int_0^\infty d\chi\,W_{\rm g}(\chi)\,\delta_{\rm g}(\boldsymbol x=\boldsymbol\theta\chi,\eta=\eta_0-\chi),`}</Eq>
        <Tx>{R`这里引入了另一个权重函数 $W_{\rm g}(\chi)$，因为这一星系样本不必与测剪切所用的源星系相同。导致 \eqref{11.47} 的平直天空与 Limber 近似并不限于自相关；交叉相关的结果只需把其中一个投影核换成所相关的场的核。于是类比 \eqref{13.46} 得`}</Tx>
        <Eq n="13.60" say={R`交叉谱的 Limber 公式：一个核换成星系的 $W_{\rm g}$，另一个是 E 模的 $l^2g_{\rm L}/\chi$（来自 $E=\frac12l^2\phi_{\rm L}$）。`}>{R`C_{{\rm g}E}(l) = l^2\int_0^\infty\frac{d\chi}{\chi^2}W_{\rm g}(\chi)\frac{g_{\rm L}(\chi)}\chi P_{{\rm g},\Phi}\left(k=\frac{l+1/2}\chi,\eta(\chi)\right),`}</Eq>
        <Tx>{R`其中 $P_{{\rm g},\Phi}$ 是三维星系密度与势之间的交叉功率谱。再用一次 Poisson 方程，得`}</Tx>
        <Eq n="13.61" keyEq title="星系–剪切交叉谱" say={R`星系–剪切交叉谱正比于星系–物质交叉谱，因而正比于 $b_1$（一次方）；只有源在透镜后面时 $g_{\rm L}$ 才不为零。`}>{R`C_{{\rm g}E}(l) = \frac32\Omega_{\rm m}H_0^2\int_0^\infty\frac{d\chi}\chi W_{\rm g}(\chi)\,a^{-1}(\chi)\,g_{\rm L}(\chi)\,P_{\rm gm}\left(k=\frac l\chi,\eta(\chi)\right),`}</Eq>
        <Tx>{R`它涉及三维星系–物质交叉功率谱。**这个结果意味着什么？**考虑固定 $\chi$ 处的被积函数，$\chi$ 是到我们所相关的位置的那些星系（"g"）的距离。只有当 $\chi$ 显著小于源星系（用于测剪切的星系）的典型共动距离时，核 $g_{\rm L}(\chi)$ 才显著。也就是说，只有当源星系的红移高于被相关位置的星系时，才有非零的交叉相关。这是因为 $C_{{\rm g}E}(l)$ 测量的是**与这些较低红移星系相关联的质量**的透镜效应。所以 $\Delta_{\rm g}$ 中的星系通常称为"**透镜星系**"，与用于测剪切的"**源星系**"相对。

**破除偏袒简并。**\eqref{13.61} 的一个重要推论是：$P_{\rm gm}$ 正比于 $b_1$，即线性正比于透镜星系的偏袒，而星系角自相关 $C_{\rm g}(l)$ 正比于 $b_1^2$。所以同时测量 $C_{{\rm g}E}(l)$ 与 $C_{\rm g}(l)$，就有办法破除偏袒–振幅简并。事实上，当今大型成像巡天的透镜分析通常在组合全部三种两点相关——$C_{EE}(l)$、$C_{{\rm g}E}(l)$、$C_{\rm g}(l)$（或它们的实空间对应物）——时得到最紧的约束。但要注意，用线性偏袒 $b_1$ 简单描述 $P_{\rm gm}$ 与 $P_{\rm g}$，在小的非线性尺度上不应成立。

**实空间：切向剪切。**接着推导实空间中的剪切–星系交叉相关函数。仍把 $x$ 轴对准 $\boldsymbol\theta$，于是 $\gamma_1$ 就成为切向剪切 $\gamma_t$。得到`}</Tx>
        <Eq n="13.62" keyEq title="星系–星系透镜" say={R`前景星系周围的平均切向剪切是 $C_{{\rm g}E}$ 的 $J_2$ Hankel 变换：它是透镜星系周围投影质量轮廓的量度。`}>{R`\begin{aligned}\xi_{{\rm g},t}(\theta) \equiv \left\langle\Delta_{\rm g}(\boldsymbol0)\gamma_t(\boldsymbol\theta)\right\rangle &= \int\frac{d^2l}{(2\pi)^2}e^{il\theta\cos\phi_l}\cos2\phi_l\,C_{{\rm g}E}(l)\\ &= -\int\frac{ldl}{2\pi}J_2(l\theta)\,C_{{\rm g}E}(l).\end{aligned}`}</Eq>
        <Box kind="warning" title={R`疑似勘误（符号约定）：$\gamma_t=-\gamma_1$`}>{R`按正文对切向剪切的定义（沿连线的剪切取负），当 $\boldsymbol\theta$ 沿 $x$ 轴时，沿连线（$x$ 方向）的拉伸是 $\gamma_1>0$，所以 $\gamma_t=-\gamma_1$，而不是"$\gamma_1$ 就成为 $\gamma_t$"。\eqref{13.62} 两行实际算的是 $\langle\Delta_{\rm g}\gamma_1\rangle$；按定义应有 $\xi_{{\rm g},t}=+\int\frac{ldl}{2\pi}J_2(l\theta)C_{{\rm g}E}(l)$。物理检查：过密区周围的像沿切向排列，$\gamma_t>0$；$C_{{\rm g}E}>0$（\eqref{13.61}，$b_1>0$）且对光滑的正谱 $\int l\,J_2C\,dl>0$，所以正号才与 \figref{13.9} 中全为正的 $\gamma_t(\theta)$ 一致。自相关 \eqref{13.57} 不受此影响（平方）。本页交互图按正号计算。`}</Box>
        <Tx>{R`**交叉剪切为零：系统误差检验。**容易证明，在没有 B 模时，与 $\gamma_\times$（所选坐标中的 $\gamma_2$）的相应交叉相关为零（被积函数含 $\sin2\phi_l$，方位角积分为零）。所以 $\xi_{{\rm g},\times}(\theta)$ 可以作为另一个观测系统误差检验。这有一个直观解释：如前所见，星系–剪切交叉相关探测的是与透镜星系相关联的质量所造成的透镜效应。天空上没有优先方向，所以透镜星系周围的平均质量分布是轴对称的。把透镜星系放在原点，就处于与 \figref{10.4} 类似的情形，它表明 E 模只产生切向剪切 $\gamma_t$，不产生交叉分量 $\gamma_\times$。更准确地说，\figref{10.4} 画的是一个径向振荡的波，而对过密区的透镜，E 模总是正的，所以星系形状总是沿切向排列。`}</Tx>
        <Figure n="13.9" interactive={<GammaTPlot />}
          caption={R`DES 第一年数据中星系–星系透镜的测量（$\gamma_t(\theta)\equiv\xi_{{\rm g},t}(\theta)$），即剪切–星系密度交叉相关函数。每个子图对应一个不同的透镜星系样本，不同组的点对应不同的源星系样本。右上子图的透镜星系与 \figref{11.9} 中给出密度自相关的样本相同。只画出 $\xi_{{\rm g},t}(\theta)$，因为 $\xi_{{\rm g},\times}(\theta)$ 与零相容，符合预期。曲线是基于 $\Lambda$CDM 宇宙学的拟合，用于测量透镜星系样本的偏袒。取自 Prat et al. (2018)。**交互版**：按 \eqref{13.61} 与（取正号的）\eqref{13.62} 计算，$P_{\rm gm}=b_1P_{\rm NL}$（Halofit），透镜样本为中心 $z_L$、宽 $0.04$ 的高斯分布，四个源样本取原图四个红移区间的中心。默认 $z_L=0.225$、$b_1=1.5$ 时，$z_S\approx1.1$ 曲线在 $10'$、$100'$ 处为 $1.0\times10^{-3}$、$1.6\times10^{-4}$，与左上子图的橙色点吻合；把 $z_L$ 调高，近处源的信号迅速消失。`} />
        <Tx>{R`**DES 的测量。**\figref{13.9} 给出 DES 测得的 $\xi_{{\rm g},t}(\theta)$。透镜星系按测光性质选为光度红星系，它们的光度红移相当准确。每个子图对应一个不同的透镜星系红移区间（其中一个样本的自相关见 \figref{11.9}）。每个子图中，不同组的点对应不同的源星系样本。信号随源星系红移增加而增大，若源星系不够远地位于透镜后面，信号就变小——这一切都是透镜核 \eqref{13.49} 的形状所预期的。虽然信噪比同样在小尺度上（图的左边）最高，但非线性偏袒、内禀取向等非线性效应在这些尺度上变得重要。因此 \figref{13.9} 阴影区的数据**不**用于宇宙学约束。更好的非线性尺度模型有望在将来从数据中提取更多信息。

**星系团质量校准。**我们关于 $C_{{\rm g}E}(l)=C_{{\rm g}\kappa}(l)$ 的结果 \eqref{13.61} 也让我们理解透镜的另一个应用——**星系团质量校准**。$\xi_{{\rm g},t}(\theta)$ 本质上是透镜星系周围投影在天空上（并以透镜核加权）的平均质量轮廓。可以把这一测量技术用于一组按质量代理（丰度、X 射线温度或 SZ 信号）选出的星系团。于是透镜让我们在固定质量代理下测量星系团的投影质量轮廓，从而得到平均的质量–观测量关系。`}</Tx>
      </Sub>
    </Sec>);
}

export function Sec136() {
  return (
    <Sec n="13.6" title="Summary" zh="小结"
      gist={R`面亮度守恒 + 位置重映射完整描述了弱透镜；偏折角的导数（$\kappa$、$\gamma$）改变星系形状；两点统计由剪切 E 模功率谱 \eqref{13.65} 与星系–剪切交叉谱 \eqref{13.66} 决定，前者同时约束增长与几何，后者校准偏袒与星系团质量。`}
      why={R`把本章的结果压缩成几条可以直接带走的方程。`}
      gives={["13.63", "13.64", "13.65", "13.66"]}>
      <Tx>{R`**透镜：直接探测一切成团成分。**引力透镜是一个强大的工具，因为它通过引力效应直接探测宇宙中一切成团的成分——暗的或亮的。我们在 \secref{13.1} 只简要触及了这一宽广课题的诸多方面，想深入的读者可参阅 Bartelmann & Schneider (2001) 的综述。在宇宙学中，透镜最突出的应用是**弱透镜**：通过它对 CMB 与背景星系形状的微小但无处不在的效应来统计地探测透镜。从弱透镜的基本性质——保持面亮度或强度不变（\eqref{13.3}）——出发：`}</Tx>
      <Eq n="13.63" say={R`（重述 \eqref{13.3}）透镜只重映射位置，不改变强度。`}>{R`I_{\rm obs}(\boldsymbol\theta) = I_{\rm true}(\boldsymbol\theta_S),`}</Eq>
      <Tx>{R`其中 $\boldsymbol\theta_S(\boldsymbol\theta)$ 是无透镜时的天空位置，弱透镜可以完全由下面的天空位置重映射描述：`}</Tx>
      <Eq n="13.64" say={R`（重述 \eqref{13.14}–\eqref{13.16}）真实位置 = 观测位置 + 透镜势的梯度。`}>{R`\begin{aligned}\theta_S^i(\boldsymbol\theta) &= \theta^i+\Delta\theta^i,\\ \Delta\theta^i(\boldsymbol\theta) &= \frac{\partial}{\partial\theta^i}\phi_{\rm L}(\boldsymbol\theta);\qquad\phi_{\rm L} = 2\int_0^\chi\frac{d\chi'}{\chi'}\Phi_{,i}(\boldsymbol x(\boldsymbol\theta,\chi'))\left(1-\frac{\chi'}\chi\right),\end{aligned}`}</Eq>
      <Box kind="warning" title={R`疑似勘误：\eqref{13.64} 中 $\phi_{\rm L}$ 的被积函数应为 $\Phi$ 而非 $\Phi_{,i}$`}>{R`透镜势是标量，定义见 \eqref{13.16}：$\phi_{\rm L}=2\int_0^\chi\frac{d\chi'}{\chi'}\Phi(\boldsymbol x(\boldsymbol\theta,\chi'))(1-\chi'/\chi)$。\eqref{13.64} 中多出的下标 $,i$ 是笔误（带 $\Phi_{,i}$ 且没有 $1/\chi'$ 的是偏折角本身 \eqref{13.14}）。本页按原书照录。`}</Box>
      <Tx>{R`其中 $\chi$ 是到源的共动距离。天空上的偏折角 $\Delta\theta^i$ 是透镜的基本可观测量。对星系，我们最容易观测的是它的导数——**会聚**（$\kappa$）与**剪切**（$\gamma$）场，它们影响星系的观测形状（\eqref{13.40}）。

把理论与数据比较的方法与我们研究过的其他探针非常相似：看两点相关函数与功率谱这类统计量。透镜对 CMB 的效应可以预言（\eqref{13.21}），它探测 $z\simeq2$–$5$ 的结构。星系形状相关可以用第 10 章为偏振发展的同一套形式描述，即分解为 E 模与 B 模。透镜也影响星系的数目与大小相关，可用来测量放大率（$\mu$）而不是剪切。所有这些统计量在领头阶都由剪切 E 模的功率谱决定：`}</Tx>
      <Eq n="13.65" say={R`（重述 \eqref{13.51}）剪切 E 模谱 = 会聚谱 = 沿视线加权积分的非线性物质功率谱。`}>{R`C_{EE}(l) = C_{\kappa\kappa}(l) = \left(\frac32\Omega_{\rm m}H_0^2\right)^2\int_0^\infty d\chi\,a^{-2}(\chi)\,g_{\rm L}^2(\chi)\,P\left(k=\frac l\chi,\eta(\chi)\right)`}</Eq>
      <Tx>{R`它等于会聚 $\kappa$ 的功率谱。透镜核 $g_{\rm L}(\chi)$ 由 \eqref{13.49} 定义。另一方面，B 模的预期零结果可以作为观测测量中强有力的系统误差检验。`}</Tx>
      <Box kind="warning" title={R`疑似勘误："$\kappa=\mu/2$"`}>{R`原书此处写"会聚 $\kappa=\mu/2$"。由 \eqref{13.35}，弱透镜下 $\mu\simeq1+2\kappa$，所以应是 $\kappa\simeq(\mu-1)/2$，即放大的**涨落** $\delta\mu=\mu-1\simeq2\kappa$；放大统计（数目与大小相关）的功率谱因而是 $4C_{\kappa\kappa}$。`}</Box>
      <Tx>{R`**增长与几何。**剪切功率谱不仅对沿视线积分的非线性物质功率谱 $P(k,\eta)$ 敏感，也通过距离–红移关系 $\chi(z)$ 对背景宇宙学敏感。所以，若源星系的红移分布已知，透镜就能同时约束膨胀史与增长史。除了必须确定源星系的红移分布，星系形状的内禀相关以及物质分布本身的小尺度重子效应也需要建模。

**交叉相关同样有力。**与剪切功率谱本身同样有力的，是剪切与前景星系计数（星系–星系透镜）或星系团的交叉相关，我们在 \eqref{13.61} 中推出：`}</Tx>
      <Eq n="13.66" say={R`（重述 \eqref{13.61}）星系–剪切交叉谱：$\propto b_1$，只来自源后方的透镜星系。`}>{R`C_{{\rm g}E}(l) = \frac32\Omega_{\rm m}H_0^2\int_0^\infty\frac{d\chi}\chi W_{\rm g}(\chi)\,a^{-1}(\chi)\,g_{\rm L}(\chi)\,P_{\rm gm}\left(k=\frac l\chi,\eta(\chi)\right).`}</Eq>
      <Tx>{R`这个交叉功率谱可以校准透镜星系的偏袒（因为大尺度上 $P_{\rm gm}(k)=b_1P_{\rm L}(k)$），与星系及剪切自相关组合时显著提高约束能力。对星系团，弱透镜剪切可以完成对质量–观测量关系的重要校准。`}</Tx>
    </Sec>);
}
