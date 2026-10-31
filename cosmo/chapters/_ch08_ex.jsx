// 习题 8.1–8.13 —— 式 (8.87)–(8.91)。解答：8.4、8.8、8.13 依据原书附录 A；其余为编者给出（数值由本章 _ch08_phys.jsx 计算）。
import { Sec, Tx, Eq, Box, Exercise, Table, Figure } from "@kit";

const R = String.raw;

export function Exercises() {
  return (
    <Sec n="8.E" title="Exercises" zh="习题">
      <Exercise n="8.1" title={R`推导 \eqref{8.10} 与 \eqref{8.11}`} level="★★"
        hint={R`(a) 把重子 Euler 方程 \eqref{5.72} 改写成 $\tau'(u_{\rm b}+3i\Theta_1)=R[\cdots]$，代回光子方程 \eqref{5.67}。(b) 对 \eqref{5.73}（中微子）乘以 $\mathcal P_0$、$\mathcal P_1$ 并对 $\mu$ 积分，注意多极矩约定 $\Theta_l=\frac{1}{(-i)^l}\int\frac{d\mu}{2}\mathcal P_l\Theta$。`}
        solution={R`**多极矩约定。**$\Theta_l\equiv\frac{1}{(-i)^l}\int_{-1}^1\frac{d\mu}{2}\mathcal P_l(\mu)\Theta(\mu)$（\eqref{5.66}），所以 $\int\frac{d\mu}2\mu\Theta=-i\Theta_1$；又 $\mu^2=\frac13+\frac23\mathcal P_2$，故 $\int\frac{d\mu}2\mu^2\Theta=\frac13\Theta_0-\frac23\Theta_2$。

**(a)** 去掉 $\Pi$ 后，\eqref{5.67} 的碰撞项为 $-\tau'[\Theta_0-\Theta+\mu u_{\rm b}]$。它的单极为零（$\int\frac{d\mu}2[\Theta_0-\Theta]=0$，$\int\frac{d\mu}{2}\mu=0$）——散射守恒光子数。它乘以 $\mu$ 的积分为 $-\tau'[i\Theta_1+u_{\rm b}/3]$，所以偶极方程（乘以 $i$ 后）中的碰撞项为
$$\tau'\Big[\Theta_1-\frac{iu_{\rm b}}{3}\Big]=-\frac i3\,\tau'\left[u_{\rm b}+3i\Theta_1\right]=-\frac i3R\left[u_{\rm b}'+\frac{a'}au_{\rm b}+ik\Psi\right],$$
最后一步用了重子 Euler 方程 \eqref{5.72}：$u_{\rm b}'+\frac{a'}au_{\rm b}=-ik\Psi+\frac{\tau'}{R}[u_{\rm b}+3i\Theta_1]$。$l\ge2$ 的碰撞项 $\propto\tau'\Theta_l$ 随高阶矩一起被丢掉。所以剩下的散射项正比于 $R=3\rho_{\rm b}/4\rho_\gamma$，早期 $R\ll1$ 时可以忽略。（物理：紧耦合下 $u_{\rm b}\approx-3i\Theta_1$，光子与重子一起运动；光子感受到的"拖曳"被重子的相对惯性 $R$ 压低。）

**(b)** 无碰撞时光子与中微子都满足 $\Theta'+ik\mu\Theta=-\Phi'-ik\mu\Psi$（\eqref{5.73}）。乘以 $\mathcal P_0=1$ 积分：$\Theta_0'+ik(-i\Theta_1)=-\Phi'$，即 $\Theta_0'+k\Theta_1=-\Phi'$。乘以 $\mathcal P_1=\mu$ 积分：$-i\Theta_1'+ik\big(\frac13\Theta_0-\frac23\Theta_2\big)=-\frac{ik}3\Psi$，乘以 $i$ 得
$$\Theta_1'-\frac k3\Theta_0+\frac{2k}3\Theta_2=\frac k3\Psi .$$
忽略 $\Theta_2$（截断层级）并令 $\Psi=-\Phi$，即得 \eqref{8.10}–\eqref{8.11}。光子与中微子方程相同、绝热初条件相同，所以对总辐射 $\Theta_{{\rm r},l}$ 同样成立。`}>
        {R`(a) 证明在小重子密度极限下，\eqref{5.67} 中的散射项（正比于 $\tau'$ 的那一项）可以忽略：先去掉 $\Pi$（四极矩与偏振很小），再证明散射项正比于 \eqref{5.74} 定义的重子–光子能量比 $R$。需要用到 \eqref{5.72}。（同样，这一串近似只为本章关心物质分布服务。）

(b) 忽略 \eqref{5.67} 中的散射项后，证明这个无碰撞方程化为单极与偶极的两个方程：单极方程由 \eqref{5.73} 乘以 $\mathcal P_0(\mu)=1$ 并对 $d\mu/2$ 积分得到；偶极方程乘以 $\mathcal P_1(\mu)$ 再积分。`}
      </Exercise>

      <Exercise n="8.2" title="数值求解五方程组得到转移函数" level="★★★"
        hint={R`用 \secref{7.5} 的初条件：$\Theta_{{\rm r},0}=\Phi/2$，$\delta_{\rm c}=3\Phi/2$，$\Theta_{{\rm r},1}=iu_{\rm c}/3=-k\Phi/(6aH)$。以 $\ln a$ 为自变量；晚期可以停止跟踪辐射矩。`}
        solution={R`本页 \figref{8.1}、\figref{8.2} 与 \secref{8.4} 交互图正是这个程序（源码见本章 _ch08_phys.jsx 中的 solveMode 函数）。要点：(1) 用实变量 $U=iu_{\rm c}$；(2) $k\eta<1$ 时用 \eqref{8.14} 演化 $\Phi$，之后用代数式 \eqref{8.15} 求 $\Phi$，并用 $\Phi'=-\frac{4\pi Ga^2}{k}(\rho_{\rm c}U+4\rho_{\rm r}\Theta_{{\rm r},1})-\frac{a'}a\Phi$ 驱动 $\Theta_{{\rm r},0}$、$\delta_{\rm c}$，避免 \eqref{8.14} 在视界内的刚性；(3) $k\eta>200$ 且 $a>10a_{\rm eq}$ 后丢掉辐射项。自适应 RK45（相对误差 $10^{-6}$）每个模式只需几百到两万步。结果（基准 $\Omega_{\rm m}h^2=0.1424$，$T$ 取 $a_{\rm late}=0.05$）：$T(0.01\,\mathrm{Mpc^{-1}})=0.718$、$T(0.1)=0.112$、$T(1)=0.0035$，与无重子的 Eisenstein–Hu 拟合（$0.694$、$0.110$、$0.0036$）相差几个百分点；与 CAMB/CLASS（含重子）相比，$k\gtrsim0.05\,\mathrm{Mpc^{-1}}$ 处偏高 20–40%，差别来自重子（\secref{8.6.1}）与中微子各向异性应力。`}>
        {R`数值求解五个方程（\eqref{8.10}–\eqref{8.13} 与 \eqref{8.14}），得到暗物质的转移函数。使用第 7 章推出的初条件。用 \eqref{8.14} 时可能遇到的唯一数值问题出现在小尺度上：当你试图一直积分到今天时，光子矩变得难以跟踪，即使好的微分方程求解器也会在晚期"罢工"。不过有几个简单的办法：(i) 在所关心的晚期势已是常数，所以不必积分到今天；或 (ii) 在某个时刻之后停止跟踪光子矩——它们在晚期对物质分布毫无影响。画出基准 $\Lambda$CDM 模型的转移函数，并与 CAMB 或 CLASS 的输出比较。`}
      </Exercise>

      <Exercise n="8.3" title="各近似的适用区域" level="★"
        solution={<Table head={["", R`$a\ll a_{\rm eq}$`, R`$a\sim a_{\rm eq}$`, R`$a\gg a_{\rm eq}$`]} rows={[
          [R`$k\eta\ll1$`, R`8.2.1 视界外解`, R`8.2.1 视界外解`, R`8.2.1 视界外解；8.2.2（$\Phi$ 恒定）`],
          [R`$k\eta\sim1$`, R`8.3.1 辐射期穿越视界（忽略 $\delta_{\rm c}$ 对势的贡献）`, R`无解析近似`, R`8.2.2 物质期穿越视界（$\Phi$ 恒定）`],
          [R`$k\eta\gg1$`, R`8.3.1（对数增长）与 8.3.2（Meszaros，$y_H\ll y$）`, R`8.3.2 Meszaros 方程`, R`8.3.2 Meszaros；8.2.2（$\Phi$ 恒定）`],
        ]} caption={R`时间从左上流向右下：一个模式沿表格从 $k\eta\ll1$ 走到 $k\eta\gg1$。小尺度模式走"左上→左下→右下"，大尺度模式走"左上→右上→右下"，二者都绕开中央格子。参见 \figref{8.4} 交互版。`} />}>
        <Tx>{R`\secref{8.2} 与 \secref{8.3} 的四个小节对应完整 Einstein–Boltzmann 方程组的四种不同近似。在下表中填入每种近似的适用区域：`}</Tx>
        <Table head={["", R`$a\ll a_{\rm eq}$`, R`$a\sim a_{\rm eq}$`, R`$a\gg a_{\rm eq}$`]} rows={[[R`$k\eta\ll1$`, "", "", ""], [R`$k\eta\sim1$`, "", "", ""], [R`$k\eta\gg1$`, "", "", ""]]} />
        <Tx>{R`例如 \secref{8.2.1} 的视界外解在整个第一行都成立，因为它令 $k\eta\to0$。注意时间从左上流向右下，所以"没有近似能处理中央格子"意味着只有在相等之前很久或之后很久进入视界的尺度才适合解析处理。`}</Tx>
      </Exercise>

      <Exercise n="8.4" title={R`补全 \secref{8.2.1} 的代数`} level="★★" fromBook
        hint={R`(c) 令 $x\equiv\sqrt{1+y}$，则 $y=x^2-1$、$d y=2x\,dx$，被积函数化为 $(x^2-1)^2(3x^2+1)/x^2$ 的多项式加 $1/x^2$ 项。`}
        solution={R`(a)、(b) 是直接的代数（(a) 的步骤见 \eqref{8.24} 下方的推导框；(b) 可把 $\Phi=\sqrt{1+y}\,u/y^3$ 代入 \eqref{8.24} 验证，各项中正比于 $u$ 的系数相消）。

(c) 引入新的积分变量 $x\equiv\sqrt{1+y}$，\eqref{8.30} 变为
$$\Phi=\frac{3\Phi(0)}{2}\frac{\sqrt{1+y}}{y^3}\int_1^{\sqrt{1+y}}dx\frac{(x^2-1)^2(3x^2+1)}{x^2}.\tag{A.100}$$
利用 $1/x^2$ 的积分为 $-1/x$ 作分部积分。边界项正比于分子，在下限 $x=1$ 处为零。因此
$$\begin{aligned}\Phi&=\frac{3\Phi(0)}{2}\frac{\sqrt{1+y}}{y^3}\left[-\frac{y^2(4+3y)}{\sqrt{1+y}}+\int_1^{\sqrt{1+y}}dx(18x^4-20x^2+2)\right]\\&=\frac{3\Phi(0)}{2}\frac{\sqrt{1+y}}{y^3}\left[-\frac{y^2(4+3y)}{\sqrt{1+y}}+\left(\frac{18}{5}x^5-\frac{20}{3}x^3+2x\right)\bigg|_1^{\sqrt{1+y}}\right].\end{aligned}\tag{A.101}$$
在上下限处计算括号中的项即得 \eqref{8.31}。（补充：下限给出 $\frac{18}5-\frac{20}3+2=-\frac{16}{15}$。记 $s=\sqrt{1+y}$，方括号乘以 $\frac32\frac{s}{y^3}$ 后为 $\frac{3}{2y^3}\big[-y^2(4+3y)+\frac{18}5s^6-\frac{20}3s^4+2s^2+\frac{16}{15}s\big]$；$s^2=1+y$ 展开，多项式部分 $=\frac1{15}(9y^3+2y^2-8y-16)$，下限项给出 $\frac{16}{15}s$，合起来正是 $\frac{1}{10y^3}[16\sqrt{1+y}+9y^3+2y^2-8y-16]$。前因子：$A=3\Phi(0)/4$ 与 $d\tilde y=2x\,dx$ 合成 $\frac32\Phi(0)$。）`}>
        {R`补全 \secref{8.2.1} 中省略的一些代数细节。
(a) 通过求导，证明 \eqref{8.23} 导出 \eqref{8.24}。
(b) 证明使用 \eqref{8.25} 定义的 $u$ 时，\eqref{8.24} 等价于 \eqref{8.26}。
(c) 证明 \eqref{8.30} 中的积分可以解析完成，结果为 \eqref{8.31}。一种做法是换元为 $x\equiv\sqrt{1+y}$。`}
      </Exercise>

      <Exercise n="8.5" title={R`$k_{\rm eq}$ 的数值`} level="★"
        hint={R`相等时 $\rho_{\rm m}=\rho_{\rm r}$，所以 $H^2(a_{\rm eq})=2\Omega_{\rm m}H_0^2a_{\rm eq}^{-3}$。$H_0=h/(2998\,\mathrm{Mpc})$。对 $\eta_{\rm eq}$ 用 $\eta=\frac{2}{H_0\sqrt{\Omega_{\rm m}}}(\sqrt{a+a_{\rm eq}}-\sqrt{a_{\rm eq}})$。`}
        solution={R`$k_{\rm eq}^2=a_{\rm eq}^2H^2(a_{\rm eq})=a_{\rm eq}^2\cdot2\Omega_{\rm m}H_0^2a_{\rm eq}^{-3}=2\Omega_{\rm m}H_0^2/a_{\rm eq}$，即 \eqref{8.87}。代入 \eqref{2.86} $a_{\rm eq}=4.15\times10^{-5}/(\Omega_{\rm m}h^2)$：
$$k_{\rm eq}=\frac{h}{2998\,\mathrm{Mpc}}\sqrt{\frac{2\Omega_{\rm m}\cdot\Omega_{\rm m}h^2}{4.15\times10^{-5}}}=\frac{\Omega_{\rm m}h^2}{2998\,\mathrm{Mpc}}\sqrt{\frac{2}{4.15\times10^{-5}}}=0.0732\,\mathrm{Mpc^{-1}}\,\Omega_{\rm m}h^2,$$
基准值 $\Omega_{\rm m}h^2=0.1424$ 给出 $0.0104\,\mathrm{Mpc^{-1}}$，即 \eqref{8.39}。

若改用 $1/\eta_{\rm eq}$：在只有物质与辐射的宇宙中 $\eta_{\rm eq}=\frac{2(\sqrt2-1)\sqrt{a_{\rm eq}}}{H_0\sqrt{\Omega_{\rm m}}}$，所以 $k_{\rm eq}\eta_{\rm eq}=\sqrt{2\Omega_{\rm m}/a_{\rm eq}}H_0\cdot\frac{2(\sqrt2-1)\sqrt{a_{\rm eq}}}{H_0\sqrt{\Omega_{\rm m}}}=2\sqrt2(\sqrt2-1)=1.17$。于是 $1/\eta_{\rm eq}=k_{\rm eq}/1.17=0.0089\,\mathrm{Mpc^{-1}}$（$\eta_{\rm eq}=112\,\mathrm{Mpc}$），比 $k_{\rm eq}$ 低约 15%。`}>
        {R`求等于相等时共动哈勃半径倒数的模式的波数，即定义 $k_{\rm eq}$ 等于 $a_{\rm eq}H(a_{\rm eq})$。证明这一定义意味着`}
        <Eq n="8.87" say={R`相等时进入视界的波数由 $\Omega_{\rm m}H_0^2/a_{\rm eq}$ 决定（与 \eqref{8.70} 相同）。`}>{R`k_{\rm eq} = \sqrt{\frac{2\Omega_{\rm m}H_0^2}{a_{\rm eq}}}.`}</Eq>
        <Tx>{R`再用 \eqref{2.86} 证明 $k_{\rm eq}$ 由 \eqref{8.39} 给出。证明如果把 $k_{\rm eq}$ 定义为 $1/\eta_{\rm eq}$，得到的数值会稍低一些。`}</Tx>
      </Exercise>

      <Exercise n="8.6" title={R`进入视界的时刻 $a_H(k)$`} level="★"
        hint={R`$(aH)^2=H_0^2\Omega_{\rm m}(a^{-1}+a_{\rm eq}a^{-2})$；用 $y=a/a_{\rm eq}$ 与 \eqref{8.87} 改写为 $y$ 的二次方程。`}
        solution={R`忽略暗能量，$(aH)^2=\frac{H_0^2\Omega_{\rm m}}{a_{\rm eq}}\cdot\frac{y+1}{y^2}=\frac{k_{\rm eq}^2}{2}\frac{y+1}{y^2}$。令它等于 $k^2$：$y_H^2-\frac{k_{\rm eq}^2}{2k^2}(y_H+1)=0$，取正根
$$\frac{a_H}{a_{\rm eq}}=y_H=\frac{k_{\rm eq}^2}{4k^2}\left[1+\sqrt{1+\frac{8k^2}{k_{\rm eq}^2}}\right].$$
（检验：$k=k_{\rm eq}$ 时 $y_H=1$。）$k\gg k_{\rm eq}$ 时方括号 $\to2\sqrt2k/k_{\rm eq}$，所以 $y_H\to k_{\rm eq}/(\sqrt2k)$，即 \eqref{8.88}。反过来 $k\ll k_{\rm eq}$ 时 $y_H\to k_{\rm eq}^2/(2k^2)$（物质期 $aH\propto a^{-1/2}$）。`}>
        {R`用 $a_HH(a_H)\equiv k$ 定义 $a_H(k)$——波数 $k$ 等于共动哈勃半径倒数时的标度因子。用 $k$ 与 $k_{\rm eq}$ 表示 $a_H/a_{\rm eq}$。证明在 $k\gg k_{\rm eq}$ 极限下它化为`}
        <Eq n="8.88" say={R`辐射期进入视界的模式：进入时刻与 $k$ 成反比（辐射期 $aH\propto1/a$）。`}>{R`\lim_{k\gg k_{\rm eq}}\frac{a_H}{a_{\rm eq}} = \frac{k_{\rm eq}}{\sqrt2k}.`}</Eq>
      </Exercise>

      <Exercise n="8.7" title={R`$\Omega_{\rm m}h^2$ 与 $\Omega_{\rm m}h$`} level="★★"
        hint={R`物理单位下 $k_{\rm eq}\propto\Omega_{\rm m}h^2$；以 $h\,\mathrm{Mpc^{-1}}$ 为单位时 $k_{\rm eq}/h\propto\Omega_{\rm m}h$。`}
        solution={R`**物理单位、固定 $\Omega_{\rm m}h^2$。**转移函数只依赖 $k/k_{\rm eq}$（以及 $\Omega_{\rm b}/\Omega_{\rm m}$），而 $k_{\rm eq}=0.073\,\mathrm{Mpc^{-1}}\Omega_{\rm m}h^2$ 不变，所以 $T(k)$ 作为 $k\,[\mathrm{Mpc^{-1}}]$ 的函数不变；功率谱形状因此基本不变。振幅仍按 $D_+^2/\Omega_{\rm m}^2\cdot H_0^{-4}\propto D_+^2/(\Omega_{\rm m}h^2)^2$ 中的 $D_+$ 变化（不同 $\Omega_\Lambda$ 的晚期增长不同），所以只有整体振幅略变。

**$h$ 单位、固定 $\Omega_{\rm m}h$。**以 $h\,\mathrm{Mpc^{-1}}$ 计，$k_{\rm eq}/h=0.073\,\Omega_{\rm m}h$ 不变，所以峰（转折）位置在图上不动——这就是"形状参数" $\Omega_{\rm m}h$ 的含义。但其他特征并不保持：重子特征（BAO 位置由声视界决定，物理单位下依赖 $\Omega_{\rm m}h^2$、$\Omega_{\rm b}h^2$）会在 $h$ 单位图中移动；振幅随 $\Omega_{\rm m}$ 与 $D_+$ 改变；$P$ 的单位 $(h^{-1}\mathrm{Mpc})^3$ 也带来 $h^3$ 的标度。所以 $\Omega_{\rm m}h$ 只近似地控制形状。（可用 \figref{8.14} 交互版定性体验：在固定 $h$ 时改变 $\Omega_{\rm m}$，峰位按 $\Omega_{\rm m}$ 移动。）`}>
        {R`用 CAMB 或 CLASS 证明：在保持物理密度 $\Omega_{\rm m}h^2$ 不变（相应地改变 $h$）、并以物理单位（即 $\mathrm{Mpc^{-1}}$）作图时，物质功率谱的形状基本与 $\Omega_{\rm m}$ 无关。现在回到习惯的 $h$ 标度单位，在保持组合 $\Omega_{\rm m}h$ 不变的情况下改变 $\Omega_{\rm m}$。解释你对这种情形下物质功率谱变化的发现。`}
      </Exercise>

      <Exercise n="8.8" title="增长方程的积分解" level="★★★" fromBook
        hint={R`(a) 把 $\delta_{\rm m}=H$ 代入 \eqref{8.75}，改写成 $H^2$ 关于 $\ln a$ 的方程；设 $H^2=H_0^2\sum_s\Omega_sa^{p_s}$。(b) 设 $\delta_{\rm m}=uH$，得到不含 $u$ 本身的方程。`}
        solution={<>
          <Tx>{R`**(a)** 作拟设 $\delta_{\rm m}=$ 常数 $\times H$。由于 \eqref{8.75} 是齐次的，可以直接取 $\delta_{\rm m}=H$。把方程改写为关于 $H^2$ 与 $\ln a$ 的方程，利用
$$\frac{d^2(H^2)}{da^2}=2H\left(\frac{d\ln H}{da}\frac{dH}{da}+\frac{d^2H}{da^2}\right).\tag{A.102}$$
得到
$$\frac{d^2(H^2)}{d(\ln a)^2}+2\frac{d(H^2)}{d\ln a}=\frac{3\Omega_{\rm m}H_0^2}{a^3}.\tag{A.103}$$
现在假设宇宙中有几种成分，
$$H^2(a)=H_0^2\sum_s\Omega_sa^{p_s}\qquad\text{where}\qquad p_s=-3(1+w_s).\tag{A.104}$$
代入 $H^2$ 的方程得
$$\sum_s(p_s^2+2p_s)\Omega_sa^{p_s}=3\Omega_{\rm m}a^{-3}.\tag{A.105}$$
容易看出物质成分（$p_{\rm m}=-3$：$9-6=3$）满足这个方程。所以要使解成立，任何**其他**成分对左边的贡献必须为零：
$$\text{not matter:}\quad p_s^2+2p_s=0\ \Leftrightarrow\ p_s(p_s+2)=0.\tag{A.106}$$
因此 $H$ 在存在物质、宇宙学常数（$p=0$，上式第一个解）和曲率（$p_K=-2$，第二个解）时是增长方程的解，但对其他可能的成分不是。在所有情形下 $H$ 都随时间减小，所以这个**衰减**解不是我们要的。但它让我们可以通过拟设 $u=\delta_{\rm m}/H$ 找到所关心的增长解——不过上面得到的适用条件同样适用于第二个解。`}</Tx>
          <Tx>{R`**(b)** 以 $u=\delta_{\rm m}/H$ 为拟设，$u$ 的演化方程为
$$\frac{d^2u}{da^2}+\left(3\frac{d\ln(H)}{da}+\frac1a\right)\frac{du}{da}=0.\tag{A.107}$$
这个关于 $du/da$ 的一阶方程可以积分（$\ln u'=-3\ln H-\ln a-\ldots$，再用 $\delta_{\rm m}=H$ 满足原方程消去多余项，最终 $u'\propto(aH)^{-3}$）：
$$\frac{du}{da}\propto(aH)^{-3}.\tag{A.108}$$
再积分一次，并记得增长因子是 $uH$，得到
$$D_+(a)\propto H(a)\int^a\frac{da'}{(a'H(a'))^3},\tag{A.109}$$
这就是 \eqref{8.77} 的结果。`}</Tx>
          <Tx>{R`**(c)** 在 (a) 中看到，得到的解只适用于物质、宇宙学常数与曲率的情形；若暗能量物态方程 $w\neq-1$ 就不成立（\eqref{A.106} 要求 $p=0$ 即 $w=-1$，或 $p=-2$ 即 $w=-1/3$——后者与曲率的标度相同，所以严格说 $w=-1/3$ 的常数物态暗能量也可以）。图 A.1 给出近似积分式 \eqref{A.109} 与微分方程解的对比：$w\neq-1$ 时明显不符。（\figref{8.15} 交互版的蓝色虚线即为此积分式。）`}</Tx>
          <Figure n="A.1" width="70%" caption={R`同图 8.15，但另画出积分解 \eqref{A.109}（点线）。$w\neq-1$ 时明显不符。`} />
        </>}>
        <Tx>{R`在只有物质、曲率与宇宙学常数相关的假设下求解 \eqref{8.75}：`}</Tx>
        <Eq n="8.89" say={R`物质 + 宇宙学常数 + 曲率宇宙的膨胀率；曲率项 $1-\Omega_{\rm m}-\Omega_\Lambda$ 按 $a^{-2}$ 标度。`}>{R`H^2(a) = H_0^2\left[\Omega_{\rm m}a^{-3}+\Omega_\Lambda+(1-\Omega_{\rm m}-\Omega_\Lambda)a^{-2}\right].`}</Eq>
        <Tx>{R`(a) 证明 $\delta_{\rm m}\propto H$ 是一个解。这个解的什么性质使它不适合描述宇宙中结构的增长？
(b) 为求第二个解，尝试 $u=\delta_{\rm m}/H$ 形式的解。与 \eqref{8.77} 比较。
(c) 现在把 \eqref{8.89} 推广到非常数的暗能量，$\Omega_\Lambda\to\Omega_{\rm de}(a)$，物态方程为 $w$。$w$ 满足什么条件时 \eqref{8.77} 是 \eqref{8.75} 的解？`}</Tx>
      </Exercise>

      <Exercise n="8.9" title={R`$w=-0.5$ 宇宙中的增长因子`} level="★★"
        hint={R`用 \eqref{8.84} 给出 $H(a)$，在物质期（如 $a=10^{-3}$）以 $D_+=a$、$dD_+/da=1$ 为初条件数值积分 \eqref{8.75}。`}
        solution={R`用 RK4 在 $\ln a$ 上积分（\figref{8.15} 交互版：把 $\Omega_{\rm de}$ 设为 $0.70$，$w$ 设为 $-0.5$ 或 $-1$）。结果：$w=-0.5$ 时 $D_+(1)=0.598$（$D_+/a$ 在 $a=0.5$ 时已降到 $0.787$）；$w=-1$ 时 $D_+(1)=0.779$（$a=0.5$ 时 $0.955$）。$w=-0.5$ 的暗能量密度 $\propto a^{-1.5}$，过去比宇宙学常数更重要，因而更早、更强地压制增长：今天的增长因子小约 23%，对应 $\sigma_8$ 小同样比例（若原初振幅固定）。积分式 \eqref{8.77} 对 $w=-0.5$ 会给出 $0.545$——错误的答案。`}>
        {R`计算 $\Omega_{\rm de}=0.7$、$\Omega_{\rm m}=0.3$、$w=-0.5$ 的宇宙中的增长因子。为此数值求解 \eqref{8.75}。把增长因子作为 $a$ 的函数画出。与同样 $\Omega_{\rm de}$、$\Omega_{\rm m}$ 的宇宙学常数模型（$w=-1$）比较。`}
      </Exercise>

      <Exercise n="8.10" title="中微子质量对增长因子的（膨胀史）影响" level="★★★"
        hint={R`有质量中微子的能量密度 $\rho_\nu(a)=\frac{2}{2\pi^2}\int dp\,p^2\frac{\sqrt{p^2+m_\nu^2}}{e^{p/T_\nu}+1}$，$T_\nu=1.946\,\mathrm K/a$（习题 2.13）。今天 $\Omega_\nu h^2\simeq m_\nu/93\,\mathrm{eV}$。`}
        solution={R`**做法。**在 $H^2(a)$ 中把一种中微子从"辐射"换成上式给出的 $\rho_\nu(a)$，其余不变，按 \eqref{8.75} 积分并在早期令 $D_+=a$。结果依赖于"固定什么"的约定，这里取：$h=0.677$ 与今天的总物质 $\Omega_{\rm m}=0.3106$（含中微子）固定、平直，从 $a=10^{-3}$ 积分（$H$ 中保留辐射）。

**数值（编者计算）。**若 \eqref{8.75} 的源项仍用总 $\Omega_{\rm m}$（即按题意只考虑 $H(a)$ 的改变）：$m_\nu=0.06\,\mathrm{eV}$ 时 $D_+(1)$ 增大 $0.5\%$，$0.2\,\mathrm{eV}$ 时增大 $0.9\%$——因为早期中微子仍是相对论性的，同样的今天 $\Omega_{\rm m}$ 意味着过去 $H$ 略小、增长略快。若更物理地让源项只含会成团的 $\Omega_{\rm m}-\Omega_\nu$（$k\gg k_{\rm fs}$ 的极限），则 $D_+(1)$ 分别减小 $1.1\%$ 与 $4.5\%$——这已包含了第二种（自由流）效应，正是有质量中微子使增长依赖尺度的来源。两种情况下增长都与 $k$ 无关（第一种）或只在 $k\ll k_{\rm fs}$ 与 $k\gg k_{\rm fs}$ 两个极限里与 $k$ 无关（第二种）。`}>
        {R`通过 \eqref{8.75} 计算有质量中微子经由膨胀率 $H(a)$ 对（与尺度无关的）增长因子造成的改变。为此，习题 2.13 的结果有用。考虑两种情形：一种有质量的中微子，(i) $m_\nu=0.06\,\mathrm{eV}$，(ii) $m_\nu=0.2\,\mathrm{eV}$。`}
      </Exercise>

      <Exercise n="8.11" title="中微子自由流尺度" level="★★"
        hint={R`Fermi–Dirac 分布的平均动量 $\langle p\rangle\approx3.15\,T_\nu$。速度 $v=p/\sqrt{p^2+m_\nu^2}$；时间 $\Delta t=1/H$ 内走过的共动距离 $x_{\rm fs}=v\Delta t/a$。`}
        solution={R`取典型动量 $p=3.15\,T_{\nu,0}/a$（Fermi–Dirac 的平均动量；有的书取 $3T$）。速度 $v=p/E=p/\sqrt{p^2+m_\nu^2}$。在 $\Delta t=1/H$ 内走过的物理距离 $v/H$，共动距离 $x_{\rm fs}=v/(aH)$，所以
$$k_{\rm fs}=\frac{aH}{v}=aH\frac{\sqrt{p^2+m_\nu^2}}{p}=a^2H\sqrt{a^{-2}+\frac{m_\nu^2}{(3.15\,T_{\nu,0})^2}}.$$
晚期 $m_\nu/T_{\nu,0}\gg a^{-1}$：$k_{\rm fs}\simeq\frac{m_\nu}{3.15\,T_{\nu,0}}a^2H$。数值：$T_{\nu,0}=1.946\,\mathrm K=1.677\times10^{-4}\,\mathrm{eV}$，$m_\nu=0.1\,\mathrm{eV}$ 时 $m_\nu/(3.15T_{\nu,0})=189$；$H_0=3.336\times10^{-4}h\,\mathrm{Mpc^{-1}}$，所以 $k_{\rm fs}\simeq0.063\,h\,\mathrm{Mpc^{-1}}\frac{m_\nu}{0.1\,\mathrm{eV}}\frac{a^2H}{H_0}$，即 \eqref{8.83}。`}>
        <Tx>{R`计算中微子自由流尺度 $k_{\rm fs}$。先确定温度为 $T_{\nu,0}/a=1.946\,\mathrm K/a$ 的中微子的典型动量；然后计算具有该动量、质量为 $m_\nu$ 的中微子在时间间隔 $\Delta t=1/H$ 内走过的典型距离 $x_{\rm fs}$。自由流尺度为 $k_{\rm fs}=1/x_{\rm fs}$。证明它可以写成
$$\begin{aligned}k_{\rm fs}(a) &\simeq \sqrt{a^{-2}+m_\nu^2/(3.2\,T_{\nu,0})^2}\,a^2H(a)\\ &\simeq 0.063\,h\,\mathrm{Mpc^{-1}}\frac{m_\nu}{0.1\,\mathrm{eV}}\frac{a^2H(a)}{H_0},\end{aligned}$$
其中最后一个等式用了 $m_\nu/T_{\nu,0}\gg a^{-1}$，在所关心的晚期成立。`}</Tx>
        <Box kind="warning" title={R`勘误：题面第一个等式中因子 3.2 的位置`}>{R`原书题面印作 $k_{\rm fs}(a)\simeq3.2\sqrt{a^{-2}+m_\nu^2/T_{\nu,0}^2}\,a^2H(a)$。正确为 $\sqrt{a^{-2}+m_\nu^2/(3.2\,T_{\nu,0})^2}\,a^2H(a)$（上式已改）。依据：取典型动量 $p\simeq3.15\,T_{\nu,0}/a$，$k_{\rm fs}=aH\sqrt{p^2+m_\nu^2}/p=a^2H\sqrt{a^{-2}+m_\nu^2/(3.15T_{\nu,0})^2}$；晚期它给出 $\frac{m_\nu}{3.15T_{\nu,0}}a^2H=0.063\,h\,\mathrm{Mpc^{-1}}\frac{m_\nu}{0.1\,\mathrm{eV}}\frac{a^2H}{H_0}$，正是题面第二个等式（即 \eqref{8.83}）。按原书印法，晚期会得到 $0.64\,h\,\mathrm{Mpc^{-1}}$，比第二个等式大 $3.2^2\approx10$ 倍。`}</Box>
      </Exercise>

      <Exercise n="8.12" title={R`$k_{\rm NL}$ 随红移`} level="★★"
        hint={R`用 \eqref{8.9}：解 $k^3P_{\rm L}(k,z)/2\pi^2=1$；$P_{\rm L}(z)=P_{\rm L}(0)[D_+(z)/D_+(0)]^2$。`}
        solution={R`用 \figref{8.3} 交互版（EH98 转移函数、\eqref{8.75} 的 $D_+$、附录 B 的 $\mathcal A_s$、$n_s$）对 $\Delta^2_{\rm L}=1$ 作对数二分：
$$k_{\rm NL}(z=0)=0.24,\qquad k_{\rm NL}(z=1)=0.69,\qquad k_{\rm NL}(z=2)=2.0\ \ h\,\mathrm{Mpc^{-1}}$$
（$D_+=0.785,\ 0.479,\ 0.332$）。与原书 \figref{8.3} 中的竖线（约 $0.28$、$0.76$、$2.1$）及正文 $k_{\rm NL}(a=1)\simeq0.25$ 一致。注意 $z$ 越高 $k_{\rm NL}$ 增长得越快：因为小尺度 $\Delta^2_{\rm L}\propto k^{n_s-1}T^2k^4$ 随 $k$ 增长越来越慢（$T\propto k^{-2}\ln k$），振幅的小变化对应 $k_{\rm NL}$ 的大移动。`}>
        {R`对基准 $\Lambda$CDM 模型求 $z=0$、$z=1$、$z=2$ 时 \secref{8.1.1} 定义的 $k_{\rm NL}$。`}
      </Exercise>

      <Exercise n="8.13" title={R`$\sigma_R$ 与 $\sigma_8$`} level="★★" fromBook
        hint={R`在原点处计算 $\delta_{{\rm m},R}$；用 \eqref{C.22} $\langle\delta(\boldsymbol k)\delta(\boldsymbol k')\rangle=(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k+\boldsymbol k')P_{\rm L}(k)$。`}
        solution={R`**(a)**
$$\sigma_R^2=\left\langle\left(\int d^3x\,\delta(\boldsymbol x)W_R(|\boldsymbol x|)\right)^2\right\rangle=\left\langle\left(\int\frac{d^3k}{(2\pi)^3}\delta(\boldsymbol k)W_R^*(k)\right)^2\right\rangle\tag{A.110}$$
这里用到：由于 $W_R(x)$ 是实的，$W_R(-\boldsymbol k)=W_R^*(\boldsymbol k)$；并在原点处计算 $\delta_R$。尖括号表示对 $\delta(\boldsymbol k)$ 所有实现的系综平均。利用 \eqref{C.22}
$$\left\langle\delta(\boldsymbol k)\delta(\boldsymbol k')\right\rangle=(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k+\boldsymbol k')P_{\rm L}(k)\tag{A.111}$$
得
$$\sigma_R^2=\int\frac{d^3k}{(2\pi)^3}P_{\rm L}(k)|W_R(k)|^2.\tag{A.112}$$
只剩计算顶帽窗口函数的 Fourier 变换：
$$W_R(k)=\int d^3x\,W_R(x)e^{-i\boldsymbol k\cdot\boldsymbol x}=\frac{2\pi}{V_R}\int_0^Rdx\,x^2\int_{-1}^1d\mu\,e^{ikx\mu}.\tag{A.113}$$
窗口函数已归一化为积分等于 1，所以有因子 $V_R=4\pi R^3/3$。完成角向与径向积分得
$$W_R(k)=\frac{3}{kR^3}\int_0^Rdx\,x\sin(kx)=\frac{3}{k^3R^3}\left[-kR\cos(kR)+\sin(kR)\right].\tag{A.114}$$
**(b)–(c)** 对 $R=8\,h^{-1}\mathrm{Mpc}$ 计算 \eqref{A.112}，基准宇宙学 $z=0$ 时 $\sigma_8=0.81$。$\sigma_R$ 随 $R$ 的变化见图 12.1。（本页 \figref{8.3} 交互版用 EH98 转移函数得到 $\sigma_8=0.83$；差别主要来自忽略的 $0.06\,\mathrm{eV}$ 中微子质量。）`}>
        {R`另一种刻画某一尺度上物质涨落幅度的常用方法，是计算共动半径 $R$ 的球内预期的 RMS 过密度（这里的 $R$ 不要与重子–光子能量密度比混淆）：`}
        <Eq n="8.90" say={R`$\sigma_R^2$ 是在半径 $R$ 的球内平均后的过密度的方差：只计尺度大于约 $R$ 的涨落。`}>{R`\sigma_R^2 \equiv \langle\delta^2_{{\rm m},R}(\boldsymbol x)\rangle.`}</Eq>
        <Tx>{R`这里`}</Tx>
        <Eq n="8.91" say={R`平滑后的过密度：把 $\delta_{\rm m}$ 与半径 $R$ 的顶帽窗口卷积。`}>{R`\delta_{{\rm m},R}(\boldsymbol x) \equiv \int d^3x'\,\delta_{\rm m}(\boldsymbol x')W_R(|\boldsymbol x-\boldsymbol x'|)`}</Eq>
        <Tx>{R`其中 $W_R(x)$ 是**顶帽**窗口函数，$x<R$ 时等于 $3/(4\pi R^3)$，否则为 0；尖括号表示系综平均。
(a) 通过 Fourier 变换，把 $\sigma_R$ 表示为功率谱的积分。
(b) 用 CAMB 或 CLASS 的转移函数（或者如果你做了 \exref{8.2}，用你自己的程序），对基准 $\Lambda$CDM 宇宙学计算 $\sigma_8\equiv\sigma_R(R=8\,h^{-1}\mathrm{Mpc})$。
(c) 在同一模型中画出 $\sigma_R$ 随 $R$ 的变化。由于 $\sigma_R$ 向小 $R$ 单调增大，小尺度比大尺度先变为非线性——这是**等级式**（hierarchical）模型的标志。与图 12.1 比较。`}</Tx>
      </Exercise>
    </Sec>);
}
