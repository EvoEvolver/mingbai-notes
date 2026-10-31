// §11.1.3 BAO and Alcock–Paczyński —— 式 (11.25)–(11.37)，图 11.6–11.7
import { Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { BAOAP } from "./_ch11_plots.jsx";

const R = String.raw;

export function Sub113() {
  return (
    <Sub n="11.1.3" title="BAO and Alcock–Paczyński" zh="BAO 与 Alcock–Paczyński 效应">
      <Tx>{R`**错误的宇宙学。**现在转向"错误宇宙学"的效应：用 \eqref{11.1} 赋予星系三维位置时，所用的距离–红移关系与真实宇宙的不同。除非有更高的力量告诉我们宇宙的真相，这种情况是**必然**的！幸运的是，观测到的星系功率谱可以帮我们弄清真实的距离–红移关系。

这其实比红移空间畸变更容易推导，大部分工作我们已经做完了。基本效应见 \figref{11.6}：星系被从真实位置移开 $\sym{ch11-dchi}{\delta\chi}(z)$。最低阶下这对所有星系都相同；但由于不同宇宙学中距离–红移关系的演化不同，不同宇宙学红移处的星系位移也不同，于是 \figref{11.6} 中的虚线圆被畸变成椭圆。`}</Tx>
      <Figure n="11.6" interactive={<BAOAP view="ring" />}
        caption={R`赋予星系三维位置时使用不同宇宙学所造成的 Alcock–Paczyński 畸变示意。最低阶下，所有星系都从真实位置（虚线圆）沿视线（虚线箭头）移动同样的距离 $\sym{ch11-dchi}{\delta\chi}(\bar z)$。但 $\sym{ch11-dchi}{\delta\chi}$ 一般随红移演化，所以较近（$z_{\rm low}$，下半部）与较远（$z_{\rm high}$，上半部）的星系位移略有不同。结果是表示星系表观位置的实线椭圆。**交互版**：由真实宇宙学（$\Omega_{\rm m}^{\rm true}$、$w^{\rm true}$）与基准宇宙学（$\Omega_{\rm m}^{\rm fid}$，$w=-1$）在 $\bar z$ 处直接计算 \eqref{11.31} 的 $\alpha_\perp$、$\alpha_\parallel$，画出半径 $r_s$ 的 BAO 环在观测坐标中的形状（形变放大 4 倍以便看清）。例：真实 $\Omega_{\rm m}=0.3106$、基准 $0.25$、$\bar z=0.57$ 时 $\alpha_\perp=0.024$、$\alpha_\parallel=0.049$。`} />
      <Tx>{R`**设定坐标。**作为观测者，我们把星系的观测位置 $(\theta,\phi)$ 与红移 $z$ 变成一个"观测"三维位置 $\boldsymbol x_{\rm obs}$：使用基准距离–红移关系 $\chi_{\rm fid}(z)$，并选一个方便的三维坐标原点。再次利用平空近似，使天球位置变为二维矢量 $\boldsymbol\theta$，并选原点使得`}</Tx>
      <Eq n="11.25" say={R`坐标原点取在天区中心方向、红移片中心红移处。`}>{R`\boldsymbol x_{\rm obs}=\boldsymbol 0\quad\Leftrightarrow\quad\boldsymbol\theta=\boldsymbol 0,\ z=\bar z,`}</Eq>
      <Tx>{R`其中 $\boldsymbol\theta=0$ 对应巡天覆盖区中心附近的一点，$\bar z$ 是所考虑红移片的中心值。

**横向。**我们**赋予**星系的横向分量 $x^1_{\rm obs}$、$x^2_{\rm obs}$ 为`}</Tx>
      <Eq n="11.26" say={R`横向观测坐标等于基准距离乘以角位置。`}>{R`(x^1_{\rm obs},x^2_{\rm obs})=\chi_{\rm fid}(z)\times(\theta^1,\theta^2),`}</Eq>
      <Tx>{R`而在真实宇宙学中**应当赋予**的分量为`}</Tx>
      <Eq n="11.27" say={R`真实横向坐标比观测的小一个比例 $\sym{ch11-dchi}{\delta\chi}/\chi_{\rm fid}$：距离高估了多少，横向尺寸就被放大多少。`}>{R`(x^1,x^2)=\chi(z)\times(\theta^1,\theta^2)=\left[1-\frac{\sym{ch11-dchi}{\delta\chi}(z)}{\chi_{\rm fid}(z)}\right](x^1_{\rm obs},x^2_{\rm obs}).`}</Eq>
      <Tx>{R`第二个等号由 \eqref{11.26} 相减并利用 \eqref{11.2} 得到。全程只保留 $\sym{ch11-dchi}{\delta\chi}$ 的线性阶。\eqref{11.27} 毫不意外：若 $\sym{ch11-dchi}{\delta\chi}>0$，我们赋予星系的共动距离比实际大；相应地，星系的真实位置在横向上比赋予的位置更靠近原点（$|x^1|$、$|x^2|$ 更小）。$\sym{ch11-dchi}{\delta\chi}<0$ 时相反。

**视向。**位置的视向分量 $x^3_{\rm obs}$ 由红移决定。由于我们已让 $z=\bar z$ 对应 $x^3=0$，观测坐标为`}</Tx>
      <Eq n="11.28" say={R`视向观测坐标 = 红移差 ÷ 基准哈勃率：窄红移片中距离–红移关系可以线性化。`}>{R`x^3_{\rm obs}(z)=\chi_{\rm fid}(z)-\chi_{\rm fid}(\bar z)\simeq\frac{1}{H_{\rm fid}(\bar z)}(z-\bar z),`}</Eq>
      <Tx>{R`这里在"窄红移片、$z-\bar z$ 总是很小"的假设下展开到 $z-\bar z$ 的线性阶，并用了 $d\chi/dz=1/H$。我们**应当**赋予星系的视向分量 $x^3(z)$ 满足同样的关系：`}</Tx>
      <Eq n="11.29" say={R`真实视向坐标与观测视向坐标之比，等于基准与真实哈勃率之比。`}>{R`x^3(z)\simeq\frac{1}{H(\bar z)}(z-\bar z)=\frac{H_{\rm fid}(\bar z)}{H(\bar z)}x^3_{\rm obs}.`}</Eq>
      <Tx>{R`利用 $\sym{ch11-dH}{\delta H}(z)=H(z)-H_{\rm fid}(z)$，并在 $\sym{ch11-dH}{\delta H}$ 的线性阶工作，第二个等号可改写为`}</Tx>
      <Eq n="11.30" say={R`真实宇宙膨胀得越快（$\sym{ch11-dH}{\delta H}>0$），同样的红移差对应的真实视向距离越短。`}>{R`x^3(z)=\left[1-\frac{\sym{ch11-dH}{\delta H}(\bar z)}{H_{\rm fid}(\bar z)}\right]x^3_{\rm obs}.`}</Eq>
      <Tx>{R`**横向与视向不一样。**由于第 3 轴的零点由固定红移 $\bar z$ 定义，真实位置与赋予位置之间的位移只来自 $\chi(z)$ 与 $\chi_{\rm fid}(z)$ 在 $\bar z$ 附近**变化方式**的不同；也就是说，相关的量是距离–红移关系在 $\bar z$ 处的斜率 $d\chi/dz$，即哈勃参数 $H(\bar z)$ 的倒数。可见位置的视向位移（\eqref{11.30}）与横向位移（\eqref{11.27}）不同，一般导致星系密度场的**椭圆形畸变**（\figref{11.6}）。

**小结。**错误的距离–红移关系造成的真实位置与观测位置之间的关系为`}</Tx>
      <Eq n="11.31" keyEq title={R`AP 参数 $\alpha_\perp$、$\alpha_\parallel$`} say={R`错误宇宙学 = 横向缩放 $1-\alpha_\perp$（由距离误差决定）+ 视向缩放 $1-\alpha_\parallel$（由哈勃率误差决定）。`}>{R`\begin{aligned}&\boldsymbol x(\boldsymbol x_{\rm obs})=\Big([1-\alpha_\perp]x^1_{\rm obs},\ [1-\alpha_\perp]x^2_{\rm obs},\ [1-\alpha_\parallel]x^3_{\rm obs}\Big),\quad\text{where}\\ &\alpha_\perp=\frac{\sym{ch11-dchi}{\delta\chi}}{\chi_{\rm fid}}\bigg|_{\bar z};\qquad\alpha_\parallel=\frac{\sym{ch11-dH}{\delta H}}{H_{\rm fid}}\bigg|_{\bar z}.\end{aligned}`}</Eq>
      <Tx>{R`同样，由于星系位于窄红移片中，在平均红移 $\bar z$ 处计算 $\alpha_\perp$、$\alpha_\parallel$ 就足够了。

**能学到什么。**马上会看到，测量观测功率谱就能约束 $\alpha_\perp$ 与 $\alpha_\parallel$。先看这样的测量能告诉我们什么。给定 $\alpha_\perp$ 的测量值，\eqref{11.31} 第二行的第一部分可以把 $\chi(\bar z)$ 用已知量表示：`}</Tx>
      <Eq n="11.32" keyEq title={R`由 $\alpha_\perp$ 得距离`} say={R`测得 $\alpha_\perp$，就把基准距离修正为真实的共动距离 $\chi(\bar z)$。`}>{R`\chi(\bar z)=\chi_{\rm fid}(\bar z)\left[1+\alpha_\perp\right]`}</Eq>
      <Tx>{R`类似地，由 $\alpha_\parallel$ 得`}</Tx>
      <Eq n="11.33" keyEq title={R`由 $\alpha_\parallel$ 得哈勃率`} say={R`测得 $\alpha_\parallel$，就把基准哈勃率修正为真实的 $H(\bar z)$。`}>{R`H(\bar z)=H_{\rm fid}(\bar z)\left[1+\alpha_\parallel\right].`}</Eq>
      <Box kind="warning" title={R`疑似勘误：\eqref{11.32} 的符号`}>{R`由 \eqref{11.2} $\chi=\chi_{\rm fid}-\sym{ch11-dchi}{\delta\chi}$ 与 \eqref{11.31} $\alpha_\perp=\sym{ch11-dchi}{\delta\chi}/\chi_{\rm fid}$，严格地应有 $\chi(\bar z)=\chi_{\rm fid}(\bar z)[1-\alpha_\perp]$；而 \eqref{11.33} 与 $\sym{ch11-dH}{\delta H}=H-H_{\rm fid}$ 一致，符号正确。原书 \eqref{11.32} 的 "$+$" 与它自己的定义不一致。本页的交互图按 \eqref{11.2}、\eqref{11.31} 的定义计算：$\alpha_\perp=(\chi_{\rm fid}-\chi)/\chi_{\rm fid}$。物理结论不变——测到 $\alpha_\perp$ 就测到了距离。`}</Box>
      <Tx>{R`也就是说，测量这两个畸变参数能推出给定红移 $\bar z$ 处的距离 $\chi(\bar z)$ 与哈勃率 $H(\bar z)$。

**从功率谱中提取。**现在说明怎样从星系功率谱中提取 $\alpha_\perp$、$\alpha_\parallel$。这与 \eqref{11.20} 类似。上一小节已算出红移空间畸变的贡献，现在只需加入坐标缩放 \eqref{11.31} 的效应。这时必须跟踪它对 $\delta_{\rm g}$ **宗量**的影响：缩放在空间上是均匀的，因而是**零阶**效应（不同于 RSD，那里本动速度造成的位移是一阶的）。最后还要把 \eqref{11.15} 之后丢掉的 Jacobian 因子 $\bar J$ 加回来，它保证归一化正确。得`}</Tx>
      <Eq n="11.34" say={R`观测过密度的 Fourier 变换：换积分变量到真实坐标，体积因子 $(1+\alpha_\perp)^2(1+\alpha_\parallel)$ 与 $\bar J$ 相消，只剩宗量里的波矢缩放。`}>{R`\begin{aligned}\delta_{\rm g,obs}(\boldsymbol k_{\rm obs})&=\bar J\int d^3x_{\rm obs}\,e^{-i\boldsymbol k_{\rm obs}\cdot\boldsymbol x_{\rm obs}}\delta_{\rm g,RSD}(\boldsymbol x[\boldsymbol x_{\rm obs}])\\ &=\bar J(1+\alpha_\perp)^2(1+\alpha_\parallel)\int d^3x\,e^{-i\boldsymbol k[\boldsymbol k_{\rm obs}]\cdot\boldsymbol x}\delta_{\rm g,RSD}(\boldsymbol x)\\ &=\delta_{\rm g,RSD}(\boldsymbol k[\boldsymbol k_{\rm obs}]),\end{aligned}`}</Eq>
      <Tx>{R`第二行中我们反解了 \eqref{11.31}，并定义`}</Tx>
      <Eq n="11.35" keyEq title="波矢的缩放" say={R`观测波矢变回真实波矢：横向分量乘以 $1+\alpha_\perp$，视向分量乘以 $1+\alpha_\parallel$——实空间放大，Fourier 空间就缩小。`}>{R`\boldsymbol k[\boldsymbol k_{\rm obs}]=\Big([1+\alpha_\perp]k^1_{\rm obs},\ [1+\alpha_\perp]k^2_{\rm obs},\ [1+\alpha_\parallel]k^3_{\rm obs}\Big).`}</Eq>
      <Derivation title={R`\eqref{11.34} 的换元细节`} collapsed steps={[
        { tex: R`x^{1,2}_{\rm obs}=(1+\alpha_\perp)x^{1,2},\qquad x^3_{\rm obs}=(1+\alpha_\parallel)x^3`, why: R`反解 \eqref{11.31}（线性阶）。` },
        { tex: R`d^3x_{\rm obs}=(1+\alpha_\perp)^2(1+\alpha_\parallel)\,d^3x`, why: R`体积元的缩放。` },
        { tex: R`\boldsymbol k_{\rm obs}\cdot\boldsymbol x_{\rm obs}=(1+\alpha_\perp)(k^1_{\rm obs}x^1+k^2_{\rm obs}x^2)+(1+\alpha_\parallel)k^3_{\rm obs}x^3=\boldsymbol k[\boldsymbol k_{\rm obs}]\cdot\boldsymbol x`, why: R`于是相因子只依赖缩放后的波矢 \eqref{11.35}。` },
        { tex: R`\bar J(1+\alpha_\perp)^2(1+\alpha_\parallel)=1`, why: R`$\bar J=|d^3x/d^3x_{\rm obs}|=(1-\alpha_\perp)^2(1-\alpha_\parallel)$ 正是这个体积因子的倒数（见 \eqref{11.13} 下方的勘误说明）。` },
      ]} />
      <Tx>{R`\eqref{11.34} 中的前置因子借助 \eqref{11.14} 简单地化为 1。这不是奇迹，而是因为给定体积中的星系数与我们用来描述它们的坐标无关：$N_{\rm g}=n_{\rm g}\Delta x^3=n_{\rm g,obs}\Delta x^3_{\rm obs}$。对 $d^3x$ 的积分给出 $\delta_{\rm g,RSD}$，即在 $\boldsymbol k[\boldsymbol k_{\rm obs}]$ 处取值的 \eqref{11.22}。也就是说，基准宇宙学与真实宇宙学之差在 Fourier 空间星系密度中表现为波矢的一个简单缩放：`}</Tx>
      <Eq n="11.36" say={R`观测坐标中的星系 Fourier 模式 = Kaiser 公式在缩放后的真实波矢处取值。`}>{R`\delta_{\rm g,obs}(\boldsymbol k_{\rm obs})=[b_1+f\mu_k^2]\delta_{\rm m}(\boldsymbol k)\Big|_{\boldsymbol k=\left([1+\alpha_\perp]k^1_{\rm obs},\ [1+\alpha_\perp]k^2_{\rm obs},\ [1+\alpha_\parallel]k^3_{\rm obs}\right)}.`}</Eq>
      <Tx>{R`最后，用 \eqref{11.23} 可把观测星系功率谱写成`}</Tx>
      <Eq n="11.37" keyEq title="观测星系功率谱" say={R`观测功率谱 = Kaiser 公式（RSD）在 AP 缩放后的波矢处取值 + 噪声：一个式子同时包含速度与错误宇宙学两种效应。`}>{R`P_{\rm g,obs}(\boldsymbol k_{\rm obs},\bar z)=\left(P_{\rm L}(k,\bar z)\left[b_1+f\mu_k^2\right]^2\right)\Big|_{\boldsymbol k=\left([1+\alpha_\perp]k^1_{\rm obs},\ [1+\alpha_\perp]k^2_{\rm obs},\ [1+\alpha_\parallel]k^3_{\rm obs}\right)}+P_N.`}</Eq>
      <Tx>{R`这个方程包含两种效应：上一小节推出的本动速度造成的红移空间畸变；以及我们赋予星系的坐标基于假设的、而非真实的距离–红移关系这一事实。常数噪声项 $P_N$ 不受两者影响。

**AP 效应。**注意，即使星系没有速度，错误的距离–红移关系也会使星系功率谱各向异性：设想令 $f=0$（形式上等价于让所有速度为零），$\boldsymbol k_{\rm obs}$ 与 $\boldsymbol k$ 的关系仍依赖 $\boldsymbol k_{\rm obs}$ 与视线的夹角，因为 $\alpha_\parallel$ 与 $\alpha_\perp$ 不同。因此**错误的假设宇宙学会在星系功率谱中引入各向异性**。这一点最早由 Alcock 与 Paczyński (1979) 指出，故称 **Alcock–Paczyński（AP）效应**。与 RSD 不同，AP 效应的幅度依赖功率谱的**形状**——把 \eqref{11.37} 对 $\alpha_\parallel$、$\alpha_\perp$ 展开到线性阶就能看出。正因如此，AP 与 RSD 可以分开。`}</Tx>
      <Derivation title={R`把 \eqref{11.37} 展开到 $\alpha$ 的线性阶：AP 为什么依赖谱形`} collapsed steps={[
        { tex: R`k=k_{\rm obs}\sqrt{(1+\alpha_\parallel)^2\mu_{\rm obs}^2+(1+\alpha_\perp)^2(1-\mu_{\rm obs}^2)}\simeq k_{\rm obs}\left[1+\alpha_\perp+(\alpha_\parallel-\alpha_\perp)\mu_{\rm obs}^2\right]`, why: R`$\mu_{\rm obs}$ 为 $\boldsymbol k_{\rm obs}$ 与视线夹角的余弦。` },
        { tex: R`\mu_k^2\simeq\mu_{\rm obs}^2\left[1+2(\alpha_\parallel-\alpha_\perp)(1-\mu_{\rm obs}^2)\right]`, why: R`$\mu_k=k^3/k$ 的展开。` },
        { tex: R`P_{\rm g,obs}\simeq(b_1+f\mu_{\rm obs}^2)^2P_{\rm L}(k_{\rm obs})\left[1+\frac{d\ln P_{\rm L}}{d\ln k}\Big(\alpha_\perp+(\alpha_\parallel-\alpha_\perp)\mu_{\rm obs}^2\Big)\right]+\mathcal O(f\alpha)+P_N`, why: R`AP 的修正正比于对数斜率 $d\ln P_{\rm L}/d\ln k$：对幂律谱它只是一个 $\mu^2$ 依赖、与 RSD 简并；但真实的 $P_{\rm L}$ 斜率随 $k$ 变化，尤其在 BAO 振荡处剧烈变化，于是两者可以区分。` },
      ]} />
      <Tx>{R`**BAO 标准尺。**最后，\eqref{11.37} 也是当前与未来星系红移巡天首要科学目标之一的基础：把重子声学振荡特征当作**标准尺**，通常简称"BAO"（\figref{11.7}）。回想物质功率谱含有一个小的振荡调制（\secref{8.6.1}），大致形如 $\cos(kr_s)$，其中 $r_s\approx105\,h^{-1}\mathrm{Mpc}$ 是复合时的声视界。早期宇宙中这一特征只印在物质的重子成分上，但重子与暗物质通过引力耦合，这一振荡图样被传递到晚期的物质功率谱中，只是振幅变小。

这意味着功率谱中有一个位于**真实**共动尺度 $k\sim\pi/r_s$ 的明确特征。\eqref{11.37} 告诉我们，在星系功率谱中会看到同一特征，但在表观尺度 $k_{\rm obs}[k]$ 处。由于 $r_s$ 被 CMB 极其精确地确定（事实上，声视界主要依赖重子密度 $\Omega_{\rm b}h^2$，所以 BBN 与氘丰度的约束也足够），在红移 $\bar z$ 处的星系功率谱中测量这一特征，就能精确测出 $\alpha_\perp$ 与 $\alpha_\parallel$（\figref{11.7}）。`}</Tx>
      <Figure n="11.7" interactive={<BAOAP />}
        caption={R`BOSS 巡天 CMASS 样本角平均（单极）三维星系功率谱中的 BAO 特征。数据（点）与最佳拟合模型（线）都除以了一个不含 BAO 特征的平滑模型功率谱，以突出这一特征。拟合参数包括 $\alpha_\perp$ 与 $\alpha_\parallel$，它们使模型沿 $k$ 轴平移（见 \eqref{11.37}）。改编自 Beutler et al. (2017)。**交互版**：EH98 含重子转移函数除以其无振荡（no-wiggle）版本，代入 \eqref{11.37}（$b_1=2$）后取单极。$\alpha=0$ 时振荡的谷在 $k\approx0.05$、$0.11$，峰在 $0.08$、$0.14\,h\,\mathrm{Mpc^{-1}}$，幅度约 $\pm5\%$，与原图一致；线性理论在高 $k$ 处振幅偏大，可用 $\Sigma_{\rm nl}\approx6$–$8\,h^{-1}\mathrm{Mpc}$ 的非线性阻尼（第 12 章）把它压到原图水平。上图是对应的关联函数单极 $r^2\xi_0$：真实宇宙学中 BAO 峰在 $r\approx101\,h^{-1}\mathrm{Mpc}$（EH98 声视界 $s=150\,\mathrm{Mpc}$），在基准宇宙学中被测到的位置按 $1+\alpha_{\rm iso}$ 平移。`} />
      <Tx>{R`**直观理解。**\eqref{11.37} 严格描述的东西，直观上简单得多：BAO 振荡是印在星系成团图样中的一个**已知大小**的特征；测量它在红移 $\bar z$ 处星系中的表观大小，就能测量到那个红移的距离。具体地说，BAO 特征直接测出距离 $\chi(\bar z)$（经由 $\alpha_\perp$；更准确地说是角直径距离 $d_A(\bar z)$，在我们一直假设的平直宇宙中二者等价）与哈勃率 $H(\bar z)$（经由 $\alpha_\parallel$）。由于 BAO 特征有扎实的理论基础与特征性的形状，这种测距方法极为稳健。

**本节小结。**星系红移巡天测得的大尺度三维星系功率谱含有两个重要的宇宙学信息来源：**(1)** RSD 通过功率谱的振幅与各向异性给出增长率 $f\sigma_8(\bar z)$；**(2)** BAO 特征与 AP 畸变利用基准与真实距离–红移关系之差，测量 $d_A(\bar z)$ 与 $H(\bar z)$。

难怪越来越多的资源投入到越来越大的红移巡天中：它们既含有背景膨胀史的丰富信息，也含有结构增长的丰富信息。而且上面所说的一切适用于大尺度结构的**任何**示踪体，不只是星系：例如类星体、Lyman-α 森林，以及未分辨的谱线发射体与吸收体（称为强度映射，intensity mapping）。

**再次强调前提。**这些信息依赖于我们的假设：示踪体密度与物质密度扰动之间是简单的线性关系（\eqref{11.18}），以及示踪体速度无偏。毕竟，若后者不成立，就无法得到增长率的无偏估计；若偏袒更复杂，就无法确定示踪体功率谱中的 BAO 特征与物质功率谱中的处于同一尺度。所以这些假设需要仔细论证——第 12 章正是要做这件事。`}</Tx>
      <p className="muted">本小节概念：<C id="ap" /> · <C id="bao" /> · <C id="jacobian" /></p>
    </Sub>);
}
