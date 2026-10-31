// 习题 5.1–5.6 —— 式 (5.75)–(5.77)。解答：5.3、5.4 依据原书附录 A；其余为编者给出。
import { Sec, Tx, Eq, Box, Exercise } from "@kit";

const R = String.raw;

export function Exercises() {
  return (
    <Sec n="5.E" title="Exercises" zh="习题">
      <Exercise n="5.1" title="同步规范中的光子 Boltzmann 方程" level="★★★"
        hint={R`同步规范 $g_{00}=-1$，所以 $P^0=E$；只需重算动量的变化率。由测地线方程的 0 分量，$\Gamma^0{}_{ij}=\frac12\partial_tg_{ij}$。最后用 $\hat{\boldsymbol p}\cdot\hat{\boldsymbol e}_z=\mu$ 计算 $\tilde h_{ij}\hat p^i\hat p^j$。`}
        solution={R`**动量的变化率。**同步规范中 $g_{00}=-1$、$g_{0i}=0$，所以 $P^0=dt/d\lambda=E$，且 $\Gamma^0{}_{ij}=\frac12\partial_tg_{ij}=a\dot a(\delta_{ij}+h_{ij})+\frac{a^2}2\dot h_{ij}$。对光子 $g_{ij}P^iP^j=p^2=E^2$，一阶上 $P^i=p\hat p^i/a$（$h_{ij}$ 的修正乘以零阶各向同性分布对方向导数为零，可忽略）。测地线方程 0 分量：
$$E\frac{dE}{dt}=-\Gamma^0{}_{ij}P^iP^j=-Hp^2-\frac12\dot h_{ij}\hat p^i\hat p^jp^2\ \Rightarrow\ \frac1p\frac{dp}{dt}=-H-\frac12\dot h_{ij}\hat p^i\hat p^j.$$
与共形牛顿规范 $\frac1p\frac{dp}{dt}=-H-\dot\Phi-\frac{\hat p^i}{a}\partial_i\Psi$ 相比，就是把 $\dot\Phi+\hat p^i\partial_i\Psi/a$ 换成 $\frac12\dot h_{ij}\hat p^i\hat p^j$。

**Boltzmann 方程。**$dx^i/dt=\hat p^i/a$（零阶即可，因为它乘的是一阶量 $\partial_if$）。于是 \eqref{5.1} 变为 $\partial_tf+\frac{\hat p^i}a\partial_if-p\,\partial_pf\left[H+\frac12\dot h_{ij}\hat p^i\hat p^j\right]=C[f]$。完全照 §5.1 的步骤代入 \eqref{5.3}，背景项照样抵消，得到
$$\dot\Theta+\frac{\hat p^i}a\partial_i\Theta+\frac12\dot h_{ij}\hat p^i\hat p^j=n_e\sigma_{\rm T}[\Theta_0-\Theta+\hat{\boldsymbol p}\cdot\boldsymbol u_{\rm b}].$$
碰撞项是局域的，形式不变。乘以 $a$ 换成共形时间、转到 Fourier 空间：$\tilde\Theta'+ik\mu\tilde\Theta+\frac12\tilde h_{ij}'\hat p^i\hat p^j=-\tau'[\tilde\Theta_0-\tilde\Theta+\mu u_{\rm b}]$。

**代入 \eqref{5.76}。**取 $\boldsymbol k=k\hat{\boldsymbol e}_z$，$\hat p^z=\mu$，$(\hat p^x)^2+(\hat p^y)^2=1-\mu^2$：
$$\tilde h_{ij}\hat p^i\hat p^j=-2\tilde{\rm n}(1-\mu^2)+(\tilde h+4\tilde{\rm n})\mu^2=\tilde h\mu^2+2\tilde{\rm n}(3\mu^2-1)=\tilde h\mu^2+4\mathcal P_2(\mu)\tilde{\rm n}.$$
乘以 $\frac12$ 并对 $\eta$ 求导即得 $\frac12\mu^2\tilde h'+2\mathcal P_2(\mu)\tilde{\rm n}'$，这正是 \eqref{5.77}。（注意同步规范中没有 $\Psi$ 型的势：$g_{00}$ 未被扰动，所有引力效应都来自空间度规的变化率。）`}>
        <Tx>{R`同步规范中的度规为`}</Tx>
        <Eq n="5.75" say="同步规范：时间分量与时空交叉分量都不扰动，全部扰动放在空间度规 h_ij 里。">{R`\begin{aligned}g_{00}(\boldsymbol x,t) &= -1,\\ g_{0i}(\boldsymbol x,t) &= 0,\\ g_{ij}(\boldsymbol x,t) &= a^2(t)\left[\delta_{ij}+\sym{ch05-hfun}{h}_{ij}(\boldsymbol x,t)\right],\end{aligned}`}</Eq>
        <Tx>{R`其扰动在 Fourier 空间中为`}</Tx>
        <Eq n="5.76" say={R`波矢沿 z 轴时，同步规范的标量扰动由两个函数描述：迹 $\tilde h$ 与无迹部分 $\tilde{\rm n}$；横向两个对角元相同，纵向元为 $\tilde h+4\tilde{\rm n}$。`}>{R`\tilde h_{ij}(\boldsymbol k=k\hat{\boldsymbol e}_z,t) = \begin{pmatrix}-2\tilde{\rm n}(\boldsymbol k,t)&0&0\\0&-2\tilde{\rm n}(\boldsymbol k,t)&0\\0&0&\tilde h(\boldsymbol k,t)+4\tilde{\rm n}(\boldsymbol k,t)\end{pmatrix}.`}</Eq>
        <Tx>{R`本题保留 Fourier 空间的波浪号。这里把波矢 $\boldsymbol k$ 取在 $z$ 方向。仿照 §3.3 的步骤，推出 \eqref{5.35} 在同步规范中的对应形式：`}</Tx>
        <Eq n="5.77" say={R`同步规范中的光子方程：引力项由度规扰动的变化率 $\tilde h'$、$\tilde{\rm n}'$ 给出，其角依赖分别为 $\mu^2$ 与 $\mathcal P_2(\mu)$；碰撞项形式不变。`}>{R`\tilde\Theta' + ik\mu\tilde\Theta + \frac12\mu^2\tilde h' + 2\mathcal P_2(\mu)\tilde{\rm n}' = -\tau'\left[\tilde\Theta_0-\tilde\Theta+\mu u_{\rm b}\right].`}</Eq>
      </Exercise>

      <Exercise n="5.2" title={R`由零阶 Boltzmann 方程得到 $n\propto a^{-3}$`} level="★"
        hint={R`对 \eqref{5.5} 乘以 $d^3p/(2\pi)^3$ 积分；第二项用 \eqref{5.40} 同样的分部积分。`}
        solution={R`对 \eqref{5.5} 积分：$\frac{\partial}{\partial t}\int\frac{d^3p}{(2\pi)^3}f^{(0)}-H\int\frac{d^3p}{(2\pi)^3}p\frac{\partial f^{(0)}}{\partial p}=0$。第一项是 $\partial n/\partial t$。第二项分部积分：$\int_0^\infty dp\,p^3\partial_pf^{(0)}=-3\int_0^\infty dp\,p^2f^{(0)}$（边界项在 $p=0$ 与 $p\to\infty$ 处为零），所以它等于 $-3n$。于是
$$\frac{\partial n}{\partial t}+3Hn=0\ \Leftrightarrow\ \frac{d(na^3)}{dt}=0\ \Rightarrow\ n\propto a^{-3}.$$
这个结论与 $f^{(0)}$ 的具体形式无关（只要它是各向同性的）。`}>
        <Tx>{R`从零阶未积分的 Boltzmann 方程 \eqref{5.5} 出发。对所有动量积分，证明数密度按 $a^{-3}$ 下降。`}</Tx>
        <Box kind="warning" title={R`勘误：题面中的 $a^3$ 应为 $a^{-3}$`}>{R`原书题面印作"the number density falls off as $a^3$"。正确为按 $a^{-3}$ 下降：粒子数守恒、共动体积 $\propto a^3$，故 $n\propto a^{-3}$；由解答中的 $\partial_tn+3Hn=0$ 亦直接得出。`}</Box>
      </Exercise>

      <Exercise n="5.3" title="Pauli 阻塞可以忽略" level="★★" fromBook
        hint={R`非相对论电子 $f_e=e^{(\mu_e-E)/T}$ 在 $q=0$ 处最大，最大值 $e^{(\mu_e-m_e)/T}$。用 \eqref{4.5} 把 $e^{\mu_e/T}$ 用 $n_e$ 表示。`}
        solution={R`由 \eqref{4.2}，电子分布函数在零动量处取最大值 $e^{(\mu_e-m_e)/T}$。为把化学势与密度联系起来，回忆 $n=e^{\mu_e/T}n^{(0)}$，于是在低温极限下（\eqref{4.5}）
$$e^{\mu_e/T}=\frac{n_e}{2}\left(\frac{2\pi}{m_eT}\right)^{3/2}e^{m_e/T}.$$
所以 $f_e$ 的最大值为 $(n_e/2)(2\pi/m_eT)^{3/2}$。电子数密度等于质子数密度，由习题 4.6 的解，今天 $n_e=1.12\times10^{-5}(\Omega_{\rm b}h^2)\,\mathrm{cm^{-3}}$（包括电离的与被俘获的电子）。取电子温度等于今天的光子温度，$2\pi/m_eT=2.04\times10^{-11}\,\mathrm{cm^2}$。补回 $a$ 的因子（$n_e\propto a^{-3}$，$T\propto a^{-1}$）得
$$f_e^{\rm MAX}=10^{-21}\,\Omega_{\rm b}h^2\,a^{-3/2}.$$
（逐项代入的数值系数约为 $5\times10^{-22}$，原书取整为 $10^{-21}$。）该式只在 $T\le m_e$，即 $a\gtrsim4.6\times10^{-10}$ 时成立。所以只要温度远低于电子质量，$f_e$ 就非常小：例如 BBN 时 $a\sim10^{-9}$，$f_e\lesssim10^{-9}$；复合时 $a\sim10^{-3}$，$f_e\sim4\times10^{-19}$。因此 $1-f_e\simeq1$。`}>
        {R`证明从 BBN 到复合的所有时刻，Pauli 阻塞因子 $1-f_e$ 都可以取为 1。先用 §4.1 的结果与近似（即假设 $T_e\ll m_e$），把依赖于 $T_e$ 与 $\mu_e$ 的 $f_e$ 表示为温度与数密度的函数；再证明在此范围内 $f_e$ 远小于 1。`}
      </Exercise>

      <Exercise n="5.4" title="Compton 散射的角依赖" level="★★★" fromBook
        hint={R`精确振幅与角平均振幅之差为 $24\pi\sigma_{\rm T}m_e^2[(\hat{\boldsymbol p}\cdot\hat{\boldsymbol p}')^2-1/3]$；方括号是 $\frac23\mathcal P_2(\hat{\boldsymbol p}\cdot\hat{\boldsymbol p}')$。用球谐函数加法定理分离 $\hat{\boldsymbol p}$ 与 $\hat{\boldsymbol p}'$。`}
        solution={<>
          <Tx>{R`本节推导中使用的振幅平方与题中给出的更精确表达式之差为 $24\pi\sigma_{\rm T}m_e^2[(\hat{\boldsymbol p}\cdot\hat{\boldsymbol p}')^2-1/3]$。方括号中的组合是 $\frac23$ 乘以二阶 Legendre 多项式。用球谐函数的加法定理改写，差值变为
$$\Delta|\mathcal M|^2=16\pi\sigma_{\rm T}m_e^2\,\frac{4\pi}{5}\sum_{m=-2}^{2}Y_{2m}(\hat{\boldsymbol p})Y^*_{2m}(\hat{\boldsymbol p}').$$
这就是要代入 \eqref{5.16} 多重积分、替代 $|\mathcal M|^2$ 的量。代入后只有 $m=0$ 项有贡献，因为其余 $Y_{2m}(\hat{\boldsymbol p}')$ 都有方位角依赖，积分为零。利用 $Y_{20}=\sqrt5\,\mathcal P_2/\sqrt{4\pi}$（以 $\hat{\boldsymbol k}$ 为极轴；见下方勘误），由各向异性 Compton 散射带来的新碰撞项为
$$\Delta C[f(\boldsymbol p)]=\frac{\pi^2n_e\sigma_{\rm T}}{p}\mathcal P_2(\mu)\int\frac{d^3p'}{(2\pi)^3p'}\mathcal P_2(\hat{\boldsymbol p}'\cdot\hat{\boldsymbol k})\left\{\delta_{\rm D}^{(1)}(p-p')+(\boldsymbol p-\boldsymbol p')\cdot\boldsymbol u_{\rm b}\frac{\partial\delta_{\rm D}^{(1)}(p-p')}{\partial p'}\right\}\{f(\boldsymbol p')-f(\boldsymbol p)\}.$$
现在做对 $d\Omega'$ 的角向积分。线性阶上唯一存活的是正比于 $\delta_{\rm D}^{(1)}(p-p')f(\boldsymbol p')$ 的项（$f(\boldsymbol p)$ 与 $f^{(0)}(p')$ 不依赖 $\hat{\boldsymbol p}'$，乘 $\mathcal P_2$ 积分为零；速度项乘扰动是二阶），剩下
$$\Delta C[f(\boldsymbol p)]=-\frac{n_e\sigma_{\rm T}}{2p}\mathcal P_2(\mu)\int_0^\infty p'dp'\,\delta_{\rm D}^{(1)}(p-p')\,p'\frac{\partial f^{(0)}}{\partial p'}\times\int_{-1}^1\frac{d\mu'}{2}\mathcal P_2(\mu')\Theta(\mu').$$
角向积分给出 $-\Theta_2$（由 \eqref{5.66}，$\int\frac{d\mu}2\mathcal P_2\Theta=(-i)^2\Theta_2=-\Theta_2$）。再对 Dirac $\delta_{\rm D}^{(1)}$ 函数积分，得
$$\Delta C[f(\boldsymbol p)]=p\frac{\partial f^{(0)}}{\partial p}n_e\sigma_{\rm T}\frac12\mathcal P_2(\mu)\Theta_2.$$
这相当于在 \eqref{5.22} 的方括号中添加一项 $-\mathcal P_2\Theta_2/2$，从而解释了 \eqref{5.67} 中对应的项。`}</Tx>
          <Box kind="warning" title={R`勘误：原书附录中 $Y_{20}$ 的符号`}>{R`原书附录 A 习题 5.4 解答在 (A.82) 后印作 $Y_{20}=-\sqrt5\,\mathcal P_2/\sqrt{4\pi}$。正确为 $Y_{20}=+\sqrt{5/4\pi}\,\mathcal P_2$：依据 $Y_{20}(\theta)=\sqrt{5/16\pi}\,(3\cos^2\theta-1)$，在 $\theta=0$ 处为正（Condon–Shortley 相位只影响 $m$ 为奇数的分量）。由于只出现 $Y_{20}Y_{20}^*$，此符号不影响最终结果。`}</Box>
        </>}>
        {R`计入 Compton 散射的角依赖。从 \eqref{5.16} 出发，但不用角平均的振幅平方 \eqref{5.18}，而用正确的偏振平均表达式 \eqref{5.17}。证明计入角依赖后会引入 \eqref{5.67} 中的因子 $(1/2)\mathcal P_2(\mu)\Theta_2$。`}
      </Exercise>

      <Exercise n="5.5" title="由 Boltzmann 方程推出连续性方程" level="★★"
        hint={R`\eqref{3.76} 的零阶部分为 $\partial_tf-Hp\,\partial_pf=0$。乘以 $E\,d^3p/(2\pi)^3$ 积分；分部积分时 $\frac{d}{dp}(p^3E)=3p^2E+p^4/E$。`}
        solution={R`零阶方程 $\frac{\partial f}{\partial t}-Hp\frac{\partial f}{\partial p}=0$ 乘以 $\frac{d^3p}{(2\pi)^3}E(p)$ 积分。第一项：$E$ 不显含时间，所以是 $\partial\rho/\partial t$（$\rho=\int\frac{d^3p}{(2\pi)^3}fE$）。第二项：
$$-H\int\frac{d^3p}{(2\pi)^3}Ep\frac{\partial f}{\partial p}=-\frac{H}{2\pi^2}\int_0^\infty dp\,p^3E\frac{\partial f}{\partial p}=+\frac{H}{2\pi^2}\int_0^\infty dp\,f\left(3p^2E+\frac{p^4}{E}\right),$$
其中用了 $dE/dp=p/E$。右边等于 $H\int\frac{d^3p}{(2\pi)^3}f\left(3E+\frac{p^2}{E}\right)=3H\left(\rho+\sym{ch05-pres}{\mathcal P}\right)$，因为 $\sym{ch05-pres}{\mathcal P}=\int\frac{d^3p}{(2\pi)^3}f\frac{p^2}{3E}$（\eqref{2.64}）。于是
$$\frac{\partial\rho}{\partial t}+\frac{\dot a}{a}\left[3\rho+3\sym{ch05-pres}{\mathcal P}\right]=0,$$
与由能动张量守恒得到的 \eqref{2.56} 完全相同。（对各向同性的 $f$ 才有上述角向积分；若计入简并度 $g$，两边同乘即可。）`}>
        {R`用 Boltzmann 方程推导连续性方程，重新得到 §2.3 基于能动张量的结果。把 \eqref{3.76} 的零阶部分乘以 $d^3p/(2\pi)^3\,E(p)$ 并积分，证明所得方程与 \eqref{2.56} 相同。`}
      </Exercise>

      <Exercise n="5.6" title="电子、原子核与原子的紧耦合" level="★★"
        hint={R`(a) 库仑截面可用"势能 $\alpha/b$ 等于动能 $\sim T$"估计碰撞参数：$\sigma_{\rm C}\sim\pi(\alpha/T)^2$（再乘一个库仑对数 $\ln\Lambda\sim10$–$30$）；速率 $\Gamma_{\rm C}=n_e\sigma_{\rm C}v$，$v\sim\sqrt{3T/m_e}$。(b) 中性氢与质子的低能散射由极化势（离子–诱导偶极）主导，Langevin 速率系数 $\langle\sigma v\rangle\simeq2\pi e\sqrt{\alpha_{\rm H}/\mu_{\rm red}}\approx2.7\times10^{-9}\,\mathrm{cm^3\,s^{-1}}$，与速度无关。`}
        solution={R`（编者解答，数量级估计。取 $\Omega_{\rm b}h^2=0.0224$、$\Omega_{\rm m}=0.3$、$h=0.7$，$\bar n_{\rm b}=1.12\times10^{-5}\Omega_{\rm b}h^2a^{-3}\,\mathrm{cm^{-3}}$，$T=2.35\times10^{-4}\,\mathrm{eV}/a$。）

**(a)** 完全电离时 $n_e=\bar n_{\rm b}$。在复合时（$z=1100$，$T=0.26\,\mathrm{eV}$）：$n_e\approx335\,\mathrm{cm^{-3}}$，$\sigma_{\rm C}\sim\pi(\alpha/T)^2=\pi\,(1/137)^2/(0.26\,\mathrm{eV})^2\times(\hbar c)^2\approx1.0\times10^{-12}\,\mathrm{cm^2}$，$v\approx\sqrt{3T/m_e}\,c\approx4\times10^7\,\mathrm{cm\,s^{-1}}$，所以
$$\Gamma_{\rm C}=n_e\sigma_{\rm C}v\approx1.2\times10^{-2}\,\mathrm s^{-1},\qquad H(z=1100)\approx5\times10^{-14}\,\mathrm s^{-1},\qquad \frac{\Gamma_{\rm C}}{H}\approx2\times10^{11}.$$
标度：$n_e\propto a^{-3}$、$\sigma_{\rm C}\propto T^{-2}\propto a^2$、$v\propto a^{-1/2}$，所以 $\Gamma_{\rm C}\propto a^{-3/2}$，物质主导时 $H\propto a^{-3/2}$，比值几乎不变（$z=3\times10^4$ 到 $z=100$ 都在 $10^{11}$ 量级）；辐射主导时 $H\propto a^{-2}$，比值 $\propto a^{1/2}$，回溯到 $T\sim m_e$ 仍远大于 1。再乘上库仑对数只会更大。电子与质子始终紧耦合。

**(b)** 对一个中性氢原子，与自由质子的散射率为 $\sym{ch05-rate}{\Gamma}=x_e\bar n_{\rm b}\langle\sigma v\rangle$。取 $x_e\sim10^{-4}$（复合后剩余电离度的量级，参见图 4.4）与 Langevin 速率 $\langle\sigma v\rangle\approx2.7\times10^{-9}\,\mathrm{cm^3\,s^{-1}}$：
- $z=1100$：$\sym{ch05-rate}{\Gamma}\approx9\times10^{-11}\,\mathrm s^{-1}$，$\sym{ch05-rate}{\Gamma}/H\approx2\times10^3$；
- $z=300$：$\sym{ch05-rate}{\Gamma}/H\approx3\times10^2$；
- $z=100$：$\sym{ch05-rate}{\Gamma}/H\approx50$。

即使电离度低到 $10^{-4}$，中性氢与质子的散射率仍远大于膨胀率（比值 $\propto a^{-3/2}$，随时间缓慢下降，但直到 $z\sim100$ 仍 $\gg1$）。若改用几何截面 $\sim10^{-15}\,\mathrm{cm^2}$ 与热速度估计，结论在复合期间同样成立。因此中性原子、原子核与电子在整个复合期间紧耦合，\eqref{5.61} 描述的是全部重子。`}>
        <Tx>{R`证明电子、原子核与原子在整个复合过程中都保持紧耦合。

(a) 计算库仑散射率与哈勃率之比。可以假设所有电子与质子都是电离的。

(b) 证明即使电离度低到 $10^{-4}$ 量级（参见图 4.4），中性氢被自由质子散射的速率也总是远大于膨胀率。`}</Tx>
      </Exercise>
    </Sec>);
}
