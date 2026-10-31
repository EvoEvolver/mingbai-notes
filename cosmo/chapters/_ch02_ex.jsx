// 习题 2.1–2.14 —— 式 (2.92)–(2.95)。解答：2.1、2.4、2.5、2.7、2.8、2.11 依据原书附录 A；其余为编者给出。
import { Sec, Tx, Eq, Exercise } from "@kit";
import { EtaPlot, ModulusPlot, ModulusAbsPlot, Ex213Plot } from "./_ch02_plots.jsx";

const R = String.raw;

export function Exercises() {
  return (
    <Sec n="2.E" title="Exercises" zh="习题">
      <Exercise n="2.1" title="恢复单位" level="★" fromBook
        hint={R`温度：乘 $k_{\rm B}$，$1\,\mathrm{eV}=11605\,\mathrm K$；长度：$\hbar c=1.973\times10^{-5}\,\mathrm{eV\,cm}$；质量：$1\,\mathrm{eV}/c^2=1.783\times10^{-33}\,\mathrm g$；$1\,\mathrm{Mpc}=3.086\times10^{24}\,\mathrm{cm}$。`}
        solution={R`**(a)** $k_{\rm B}=\mathrm{eV}/(11605\,\mathrm K)$，所以 $2.726\,\mathrm K\to k_{\rm B}\cdot2.726\,\mathrm K=(2.726/11605)\,\mathrm{eV}=2.349\times10^{-4}\,\mathrm{eV}$。

**(b)** $\rho_\gamma=\pi^2T_0^4/15=2.004\times10^{-15}\,\mathrm{eV}^4$。除以 $(\hbar c)^3=(1.973\times10^{-5}\,\mathrm{eV\,cm})^3$ 得 $0.2609\,\mathrm{eV\,cm^{-3}}$。再由质子质量 $1.673\times10^{-24}\,\mathrm g=0.9383\times10^9\,\mathrm{eV}$ 得 $1\,\mathrm{eV}=1.783\times10^{-33}\,\mathrm g$，所以 $\rho_\gamma=4.651\times10^{-34}\,\mathrm{g\,cm^{-3}}$。

**(c)** $H_0=100h\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$，$1\,\mathrm{Mpc}=3.1\times10^{19}\,\mathrm{km}$，故 $H_0=3.23h\times10^{-18}\,\mathrm s^{-1}$。除以光速 $c=3\times10^{10}\,\mathrm{cm\,s^{-1}}$：$H_0=1.1h\times10^{-28}\,\mathrm{cm^{-1}}$，即 $H_0^{-1}=9.3h^{-1}\times10^{27}\,\mathrm{cm}$（$\approx3000\,h^{-1}\mathrm{Mpc}$）。

**(d)** 普朗克质量 $1.2\times10^{28}\,\mathrm{eV}$：乘以 $k_{\rm B}^{-1}=11605\,\mathrm{K/eV}$ 得 $m_{\rm Pl}=1.4\times10^{32}\,\mathrm K$；除以 $\hbar c=1.97\times10^{-5}\,\mathrm{eV\,cm}$ 得 $6.1\times10^{32}\,\mathrm{cm^{-1}}$；再乘光速得 $m_{\rm Pl}=6.1\times10^{32}\times3\times10^{10}\,\mathrm{s^{-1}}=1.8\times10^{43}\,\mathrm{s^{-1}}$。`}>
        {R`插入适当的 $c$、$\hbar$、$k_{\rm B}$ 因子，完成下列换算：

(a) $T_0=2.726\,\mathrm K\to\mathrm{eV}$；

(b) $\rho_\gamma=\pi^2T_0^4/15\to\mathrm{eV}^4$ 以及 $\mathrm{g\,cm^{-3}}$；

(c) $1/H_0\to\mathrm{cm}$；

(d) $m_{\rm Pl}\equiv\sqrt{\hbar c/G}=1.2\times10^{19}\,\mathrm{GeV}\to\mathrm K,\ \mathrm{cm^{-1}},\ \mathrm{s^{-1}}$。`}
      </Exercise>

      <Exercise n="2.2" title="极坐标中的测地线方程" level="★★"
        hint={R`用 \eqref{2.21}：$g^{rr}=1$，$g^{\theta\theta}=1/r^2$，度规只依赖于 $r$，唯一非零导数是 $\partial_r g_{\theta\theta}=2r$。`}
        solution={<>
          <Tx>{R`**(a)** 由 \eqref{2.21}，只有含 $\partial_rg_{\theta\theta}=2r$ 的项非零。

$\Gamma^1{}_{22}=\Gamma^r{}_{\theta\theta}=\frac{g^{rr}}2\left[2\partial_\theta g_{\theta r}-\partial_rg_{\theta\theta}\right]=\frac12(0-2r)=-r$；

$\Gamma^2{}_{12}=\Gamma^\theta{}_{r\theta}=\frac{g^{\theta\theta}}2\left[\partial_\theta g_{r\theta}+\partial_rg_{\theta\theta}-\partial_\theta g_{r\theta}\right]=\frac1{2r^2}\cdot2r=\frac{1}{r}=\Gamma^2{}_{21}$；

$\Gamma^1{}_{11}$、$\Gamma^1{}_{12}$、$\Gamma^2{}_{11}$、$\Gamma^2{}_{22}$ 都只含 $g_{rr}$ 的导数或 $\partial_\theta$，为零。这正是 \eqref{2.93}。（从 \eqref{2.19} 方括号直接计算的过程见 §2.1.2 中的例题框，结果相同。）

**(b)** 以 $t$ 为参数，测地线方程的两个分量为
$$\ddot r+\Gamma^r{}_{\theta\theta}\dot\theta^2=\ddot r-r\dot\theta^2=0,\qquad \ddot\theta+2\Gamma^\theta{}_{r\theta}\dot r\dot\theta=\ddot\theta+\frac{2}{r}\dot r\dot\theta=0.$$
第二式乘以 $r^2$ 即 $\frac{d}{dt}(r^2\dot\theta)=0$：角动量守恒。第一式说明径向加速度只是向心项 $r\dot\theta^2$（极坐标下加速度的径向分量为 $\ddot r-r\dot\theta^2$），二者合起来正是"加速度矢量为零"，即平面上的匀速直线运动。验证：直线 $x=b$、$y=vt$ 对应 $r=\sqrt{b^2+v^2t^2}$、$\tan\theta=vt/b$，有 $r^2\dot\theta=bv=$ 常数，$\ddot r=b^2v^2/r^3=r\dot\theta^2$，两式均满足。`}</Tx>
        </>}>
        <Tx>{R`证明测地线方程能给出二维平面上用极坐标描述的自由粒子的正确运动方程。你可以用以下两种方法之一（或两者）求 Christoffel 符号，然后做 (b)。

(a) 直接由 \eqref{2.19} 方括号中的项，或由二维度规`}</Tx>
        <Eq n="2.92" say="二维平面的极坐标度规：径向距离元 $dr$，角向距离元 $r\,d\theta$。">{R`g_{ij} = \begin{pmatrix}1&0\\0&r^2\end{pmatrix}`}</Eq>
        <Tx>{R`利用 \eqref{2.21} 求 Christoffel 符号。证明唯一非零的 Christoffel 符号为`}</Tx>
        <Eq n="2.93" say="极坐标中仅有的非零 Christoffel 符号：它们给出离心项与角动量守恒。">{R`\Gamma^2{}_{12} = \Gamma^2{}_{21} = \frac{1}{r}\quad;\quad \Gamma^1{}_{22} = -r`}</Eq>
        <Tx>{R`其中 1、2 分别对应 $r$、$\theta$。

(b) 用这些 Christoffel 符号写出测地线方程的两个分量，证明它们给出平面上运动粒子的正确运动方程。`}</Tx>
      </Exercise>

      <Exercise n="2.3" title="有质量粒子的动量衰减" level="★"
        hint={R`仿照 \eqref{2.28}–\eqref{2.30}，但用 $g_{\mu\nu}P^\mu P^\nu=-m^2$，即 $\delta_{ij}a^2P^iP^j=E^2-m^2=p^2$。`}
        solution={R`0 分量测地线方程仍为 $E\,dE/dt=-\Gamma^0{}_{ij}P^iP^j=-\delta_{ij}a\dot aP^iP^j$。由 $-E^2+\delta_{ij}a^2P^iP^j=-m^2$ 得 $\delta_{ij}a^2P^iP^j=E^2-m^2\equiv p^2$，于是
$$E\frac{dE}{dt}=-\frac{\dot a}{a}p^2.$$
又 $E^2=p^2+m^2$ 给出 $E\,dE=p\,dp$，所以 $\frac{dp}{dt}=-\frac{\dot a}{a}p$，即 $p\propto1/a$——**物理动量**对有质量与无质量粒子一样按 $1/a$ 衰减。对非相对论粒子，$E=\sqrt{p^2+m^2}\approx m+\frac{p^2}{2m}$：总能量几乎不变（静质量主导），而动能 $p^2/2m\propto a^{-2}$，速度 $v=p/m\propto a^{-1}$。因此非相对论气体的"温度"按 $T\propto a^{-2}$ 下降（比辐射快），本动速度随膨胀衰减。`}>
        {R`求一个**有质量**的非相对论性粒子的能量如何随宇宙膨胀而变化。回忆在无质量情形我们用了 $g_{\mu\nu}P^\mu P^\nu=0$；现在则有 $g_{\mu\nu}P^\mu P^\nu=-m^2$。`}
      </Exercise>

      <Exercise n="2.4" title="光在共形坐标中走直线" level="★★" fromBook
        hint={R`空间分量测地线方程只涉及 $\Gamma^i{}_{0j}=\Gamma^i{}_{j0}$。再用 $dt/d\lambda=E$、$d\eta/d\lambda=E/a$ 把对 $\lambda$ 的导数换成对 $\eta$ 的导数，并记住 $E/a\propto a^{-2}$。`}
        solution={R`把各 Christoffel 分量（\eqref{2.25}，两项 $\Gamma^i{}_{0j}$ 与 $\Gamma^i{}_{j0}$ 相等）累加，空间分量为
$$\frac{d^2x^i}{d\lambda^2}=-2\frac{\dot a}{a}\frac{dt}{d\lambda}\frac{dx^i}{d\lambda}.$$
利用 $dt/d\lambda=E$ 与 $d\eta/d\lambda=E/a$ 把微分换成对 $\eta$ 的微分，测地线方程变为
$$\frac Ea\frac{d}{d\eta}\left(\frac Ea\frac{dx^i}{d\eta}\right)=-2\frac{\dot a}{a}\frac{E^2}{a}\frac{dx^i}{d\eta}.$$
对无质量粒子 $E/a\propto a^{-2}$，故 $\frac{d}{d\eta}(E/a)=-2\frac Ea\frac{1}{a}\frac{da}{d\eta}=-2\frac Ea\dot a$（因 $da/d\eta=a\dot a$）。左边导数作用在 $E/a$ 上所得的项为 $-2\dot a\frac{E^2}{a^2}\frac{dx^i}{d\eta}$，恰好与右边抵消，剩下 $(E/a)^2\,d^2x^i/d\eta^2=0$，即 \eqref{2.94}。`}>
        <Tx>{R`证明：我们在欧氏宇宙中导出的测地线方程意味着，对无质量粒子有`}</Tx>
        <Eq n="2.94" say="在共形时间与共动坐标中，光线不加速：光走直线、每单位共形时间走一个单位共动距离。">{R`\frac{d^2\boldsymbol x}{d\eta^2} = 0`}</Eq>
        <Tx>{R`其中 $\eta$ 为共形时间。这个非常重要的结果说明：在共动坐标 $(\eta,\boldsymbol x)$ 中，光子像在 Minkowski 空间中一样沿直线传播。`}</Tx>
      </Exercise>

      <Exercise n="2.5" title="宇宙的时间–温度关系" level="★★" fromBook
        hint={R`年龄积分 $t(a)=\int_0^a da'/[a'H(a')]$，$H=H_0\sqrt{\Omega_{\rm m}/a^3+\Omega_{\rm r}/a^4}$，且 $\Omega_{\rm r}/\Omega_{\rm m}=a_{\rm eq}$。分部积分可得闭式解。`}
        solution={R`年龄积分为 $t(a)=\int_0^a\frac{da'}{a'H(a')}$。只考虑物质与辐射，取 $H(a)=H_0\sqrt{\rho/\rho_{\rm cr}}=H_0\sqrt{\Omega_{\rm m}/a^3+\Omega_{\rm r}/a^4}$——在宇宙学常数可忽略的早期成立。而 $\Omega_{\rm r}/\Omega_{\rm m}=a_{\rm eq}=4.15\times10^{-5}/(\Omega_{\rm m}h^2)$，所以
$$t=\frac{1}{\Omega_{\rm m}^{1/2}H_0}\int_0^a\frac{da'\,a'}{\sqrt{a'+a_{\rm eq}}}.$$
分部积分得 $\Omega_{\rm m}^{1/2}H_0t=2a\sqrt{a+a_{\rm eq}}-2\int_0^ada'\sqrt{a'+a_{\rm eq}}$，完成最后的积分：
$$\Omega_{\rm m}^{1/2}H_0t=2a\sqrt{a+a_{\rm eq}}-\frac43\left\{[a+a_{\rm eq}]^{3/2}-a_{\rm eq}^{3/2}\right\}.$$
（可验证 $a\gg a_{\rm eq}$ 时化为 $\frac23a^{3/2}$，即 $a\propto t^{2/3}$。）在极早期，例如温度为 0.1 MeV 时，$a\ll a_{\rm eq}$，于是
$$t=\frac{a^2}{2H_0\sqrt{\Omega_{\rm m}a_{\rm eq}}}\qquad(a\ll a_{\rm eq}),$$
即 $a\propto t^{1/2}$。温度为 0.1 MeV 时标度因子为今天温度除以 0.1 MeV：$2.35\times10^{-4}\,\mathrm{eV}/0.1\,\mathrm{MeV}=2.35\times10^{-9}$。代入数值（$\sqrt{\Omega_{\rm m}a_{\rm eq}}=\sqrt{\Omega_{\rm r}}=6.44\times10^{-3}h^{-1}$，$H_0^{-1}=9.78\times10^9h^{-1}\,\mathrm{yr}$）：
$$t(0.1\,\mathrm{MeV})=4.28\times10^{-16}\times9.78\times10^9h^{-1}\,\mathrm{yr}\cdot h=132\,\mathrm s.$$
注意这一结果与 $\Omega_{\rm m}$（以及 $h$）无关，因为早期由辐射主导。在 $T=1/4\,\mathrm{eV}$ 时 $a=9.4\times10^{-4}$，代入协调模型参数（$\Omega_{\rm m}=0.31$，$h=0.68$，$a_{\rm eq}=2.9\times10^{-4}$），闭式解给出 $t(1/4\,\mathrm{eV})\simeq389{,}000\,\mathrm{yr}$（取 $\Omega_{\rm m}=0.3,\ h=0.7$ 则为 $384{,}000\,\mathrm{yr}$）。`}>
        {R`在早期，宇宙学常数可以忽略。在此近似下，对欧氏宇宙积分式 (1.3) 求出 $a(t)$。利用 $T(t)=T_0/a(t)$，求宇宙温度为 0.1 MeV 和 1/4 eV 时的时刻。我们将在第 4 章看到，这分别是两个关键时期的温度：大爆炸核合成与复合。`}
      </Exercise>

      <Exercise n="2.6" title="共形时间的解析表达式" level="★★"
        hint={R`$\eta=\int_0^a\frac{da'}{a'^2H(a')}$。(a) 中 $H\propto a^{-3/2}$ 或 $a^{-2}$；(b) 中 $a'^2H=H_0\sqrt{\Omega_{\rm m}}\sqrt{a'+a_{\rm eq}}$。`}
        solution={<>
          <Tx>{R`由 $d\eta=dt/a=da/(a^2H)$，有 $\eta(a)=\int_0^a\frac{da'}{a'^2H(a')}$。

**(a)** 物质主导：$H=H_0\sqrt{\Omega_{\rm m}}a^{-3/2}$，$\eta=\frac{1}{H_0\sqrt{\Omega_{\rm m}}}\int_0^a a'^{-1/2}da'=\frac{2a^{1/2}}{H_0\sqrt{\Omega_{\rm m}}}\propto a^{1/2}$（等价地 $\eta=2/(aH)$）。辐射主导：$H=H_0\sqrt{\Omega_{\rm r}}a^{-2}$，$\eta=\frac{a}{H_0\sqrt{\Omega_{\rm r}}}\propto a$（$\eta=1/(aH)$）。

**(b)** 同时含物质与辐射，$a^2H=H_0\sqrt{\Omega_{\rm m}a+\Omega_{\rm r}}=H_0\sqrt{\Omega_{\rm m}}\sqrt{a+a_{\rm eq}}$，所以
$$\eta=\frac{1}{H_0\sqrt{\Omega_{\rm m}}}\int_0^a\frac{da'}{\sqrt{a'+a_{\rm eq}}}=\frac{2}{\sqrt{\Omega_{\rm m}H_0^2}}\left[\sqrt{a+a_{\rm eq}}-\sqrt{a_{\rm eq}}\right],$$
即 \eqref{2.95}。$a\ll a_{\rm eq}$ 时展开得 $\eta\approx a/(H_0\sqrt{\Omega_{\rm m}a_{\rm eq}})=a/(H_0\sqrt{\Omega_{\rm r}})$；$a\gg a_{\rm eq}$ 时得 $2\sqrt a/(H_0\sqrt{\Omega_{\rm m}})$，与 (a) 一致。

**数值**：$1/(H_0\sqrt{\Omega_{\rm m}})=2997.9\,\mathrm{Mpc}/\sqrt{\Omega_{\rm m}h^2}$。取 $\Omega_{\rm m}=0.3$、$h=0.7$（$a_{\rm eq}=2.82\times10^{-4}$），$z=1100$ 即 $a=9.08\times10^{-4}$：$\sqrt{a+a_{\rm eq}}-\sqrt{a_{\rm eq}}=0.03450-0.01680=0.01770$，故 $\eta(z=1100)\approx2\times0.01770\times2997.9/0.3834\,\mathrm{Mpc}\approx277\,\mathrm{Mpc}$（Planck 参数下约 280 Mpc）。作对比，今天 $\eta_0\approx1.4\times10^4\,\mathrm{Mpc}$（需计入 $\Lambda$ 的数值积分）。所以复合时的共动视界只张开天空上约 $277/(1.4\times10^4)\approx0.02\,\mathrm{rad}\approx1^\circ$——这就是 CMB 视界问题的定量形式。下图比较精确数值积分与 \eqref{2.95}：二者在 $a\lesssim0.1$ 时重合，只在 $\Lambda$ 开始起作用的晚期才分开。`}</Tx>
          <EtaPlot />
        </>}>
        <Tx>{R`推导共形时间 $\eta$ 作为 $a$ 的函数的几个简单表达式。

(a) 证明在物质主导的宇宙中 $\eta\propto a^{1/2}$，在辐射主导的宇宙中 $\eta\propto a$。

(b) 考虑一个在 $a_{\rm eq}$ 处物质–辐射相等的欧氏协调宇宙，在早期 $\Lambda$ 的影响可以忽略。证明`}</Tx>
        <Eq n="2.95" say="同时含物质与辐射的平直宇宙中共形时间的解析式：早期 $\eta\propto a$（辐射主导），晚期 $\eta\propto\sqrt a$（物质主导）。">{R`\eta = \frac{2}{\sqrt{\Omega_{\rm m}H_0^2}}\left[\sqrt{a+a_{\rm eq}}-\sqrt{a_{\rm eq}}\right].`}</Eq>
        <Tx>{R`$z=1100$ 时的共形时间是多少？`}</Tx>
      </Exercise>

      <Exercise n="2.7" title="星系的角大小" level="★" fromBook
        hint={R`$\sym{ch02-thang}{\theta}=l/d_A=l(1+z)/\chi(z)$。物质主导欧氏宇宙中 $\chi=\frac{2}{H_0}\left[1-\frac{1}{\sqrt{1+z}}\right]$；1 rad $=2.06\times10^5$ 角秒。`}
        solution={R`所张角等于物理尺度除以角直径距离：
$$\sym{ch02-thang}{\theta}(z)=5\,\mathrm{kpc}\,\frac{1+z}{\chi(z)}.$$
在欧氏物质主导宇宙中，
$$\chi^{\rm Euclidean,MD}(a)=\int_a^1\frac{da'}{H_0a'^{1/2}}=\frac{2}{H_0}\left[1-a^{1/2}\right]=\frac{2}{H_0}\left[1-\frac{1}{\sqrt{1+z}}\right].$$
$z=0.1\ (1)$ 时方括号中的项为 $0.0465\ (0.293)$，所以共动距离为 $\chi=279\,h^{-1}\mathrm{Mpc}$（$z=0.1$）、$1756\,h^{-1}\mathrm{Mpc}$（$z=1$）。做除法并把弧度换成角秒得
$$\sym{ch02-thang}{\theta}=4.07''\,h\ (z=0.1),\qquad \sym{ch02-thang}{\theta}=1.17''\,h\ (z=1).$$
在 $\Omega_\Lambda>0$ 的宇宙中 $\chi$ 必须数值计算。在基准宇宙学（$\Omega_{\rm m}=0.3$，$\Omega_\Lambda=0.7$）中 $z=1$ 处 $\chi$ 比欧氏物质主导情形大约 30%（$2313$ 对 $1756\,h^{-1}\mathrm{Mpc}$），角大小相应减小：$\sym{ch02-thang}{\theta}=0.90''\,h$。$z=0.1$ 处两者的共动距离只差百分之几（$293$ 对 $279$），角大小降为 $\sym{ch02-thang}{\theta}=3.88''\,h$。（可在图 2.3 交互版中读出 $\chi$ 的数值。）`}>
        {R`考虑一个物理尺度为 5 kpc 的星系。若它位于红移 0.1，所张角度是多少？红移 1 呢？在欧氏宇宙中计算：先假设物质主导，再用基准协调宇宙学。`}
      </Exercise>

      <Exercise n="2.8" title="能量密度与比强度" level="★" fromBook
        hint={R`把式 (1.9) 用动量 $p=2\pi\hbar\nu/c$ 改写，并认出分母为 $1/f_{\rm BE}$。$I_\nu$ 是每单位立体角的能流。`}
        solution={R`把式 (1.9) 用动量 $p=2\pi\hbar\nu/c$ 改写，并把分母认作 $1/f_{\rm BE}$，得（$\hbar=c=1$）
$$I_\nu=f_{\rm BE}(p)\frac{4\pi p^3}{(2\pi)^3}.$$
（第 13 章将阐明这一关系的物理内容。）能量密度是它对全部频率的积分，再乘以 $4\pi$ 以计入来自所有方向的光子（因为 $I_\nu$ 计的是每球面度的能流）：
$$\rho_\gamma=4\pi\int_0^\infty d\nu\,I_\nu.$$
换成对动量的积分，$d\nu=dp/(2\pi)$：
$$\rho_\gamma=2\int_0^\infty dp\,I_\nu.$$
验证：$2\int dp\,\frac{4\pi p^3}{(2\pi)^3}f_{\rm BE}=\frac{8\pi}{(2\pi)^3}\int p^3f_{\rm BE}\,dp$，正是 \eqref{2.74}。（恢复单位时 $\rho_\gamma=\frac{4\pi}{c}\int I_\nu d\nu$。）`}>
        {R`具有黑体谱的光子气体的能量密度与辐射的比强度有什么关系？即 $\rho_\gamma$ 与式 (1.9) 定义的 $I_\nu$ 之间是什么关系？`}
      </Exercise>

      <Exercise n="2.9" title="相对论气体的压强与 dP/dT" level="★★"
        hint={R`(a) $E=p$ 时 $p^2/(3E)=E/3$。(b) 按题中提示，$\partial f/\partial T=-(E/T)\,df/dE$，再对 \eqref{2.64} 分部积分。`}
        solution={R`**(a)** 对相对论性粒子（$m\ll T$）$E=p$，于是 \eqref{2.64} 的被积函数 $f\frac{p^2}{3E}=\frac13fE$，与 \eqref{2.62} 的被积函数只差 1/3，与 $f$ 是 FD 还是 BE 无关：$\mathcal P=\rho/3$。显式地，$\rho=\frac{\sym{ch02-gdeg}{g}}{2\pi^2}T^4\int_0^\infty\frac{\sym{ch02-xint}{x}^3d\sym{ch02-xint}{x}}{e^x\mp1}$，BE 时 $=\sym{ch02-gdeg}{g}\frac{\pi^2}{30}T^4$，FD 时 $=\frac78\sym{ch02-gdeg}{g}\frac{\pi^2}{30}T^4$，压强均为其 1/3。

**(b)** 若 $f=f(E/T)$，$\frac{\partial f}{\partial T}=-\frac ET\frac{df}{dE}$。于是
$$\frac{d\mathcal P}{dT}=-\frac{\sym{ch02-gdeg}{g}}{T}\int\frac{d^3p}{(2\pi)^3}\frac{p^2}{3}\frac{df}{dE}=-\frac{\sym{ch02-gdeg}{g}}{2\pi^2T}\int_0^\infty dp\,\frac{p^3E}{3}\frac{df}{dp},$$
其中用了 $df/dE=(E/p)df/dp$。分部积分（边界项为零），$\frac{d}{dp}(p^3E/3)=p^2E+\frac{p^4}{3E}$，得
$$\frac{d\mathcal P}{dT}=\frac{1}{T}\,\sym{ch02-gdeg}{g}\int\frac{d^3p}{(2\pi)^3}f\left(E+\frac{p^2}{3E}\right)=\frac{\rho+\mathcal P}{T},$$
即 \eqref{2.67}（对任意质量成立）。完整步骤另见 §2.3 中的推导框。`}>
        {R`(a) 计算温度为 $T$ 的平衡相对论性粒子的压强。证明对费米–狄拉克和玻色–爱因斯坦统计都有 $\mathcal P=\rho/3$。

(b) 假设分布函数只依赖于 $E/T$（无化学势时的平衡态即如此）。求 $d\mathcal P/dT$。一个简单的做法是把积分中的 $df/dT$ 改写为 $-(E/T)df/dE$，然后对 \eqref{2.64} 分部积分。`}
      </Exercise>

      <Exercise n="2.10" title="哈勃图的理论曲线" level="★★"
        hint={R`物质主导欧氏宇宙：$d_L=\frac{2}{H_0}(1+z)\left[1-(1+z)^{-1/2}\right]$，$d_A=d_L/(1+z)^2$；$\sym{ch02-appmag}{m}-M=5\log_{10}(d_L/\mathrm{Mpc})+25$。协调模型需数值积分 $\chi=\int_0^zdz'/H(z')$。`}
        solution={<>
          <Tx>{R`**物质主导欧氏宇宙**（解析）：$\chi=\frac2{H_0}\left[1-(1+z)^{-1/2}\right]$，故
$$d_L=\frac{2}{H_0}(1+z)\left[1-\frac1{\sqrt{1+z}}\right],\qquad d_A=\frac{2}{H_0}\frac{1}{1+z}\left[1-\frac1{\sqrt{1+z}}\right],$$
$$\sym{ch02-appmag}{m}-M=5\log_{10}\frac{d_L}{\mathrm{Mpc}}+25.$$
**协调模型**：$H(z)=H_0\sqrt{0.3(1+z)^3+0.7}$，对 $\chi$ 数值积分（图 2.3 交互版就是这样算的）。$d_L(z)$、$d_A(z)$ 的曲线即图 2.3；距离模数如下面第一张图（$h=0.7$）：两模型在对数坐标下几乎重合，必须看**差值**。第二张图画出相对于 $\Omega_{\rm m}=1$ 的 $\Delta(\sym{ch02-appmag}{m}-M)$：在 $z=0.5$ 处 $\Lambda$CDM 超新星暗 0.40 mag，$z=1$ 处暗 0.60 mag；甚至比"空宇宙"（$\Omega=0$，$d_L=z(1+z/2)/H_0$）还暗——这正是 1998 年发现加速的判据。与图 2.6 比较：原图上面板的跨度 $34$–$46$ mag 对应 $z\approx0.01$–$2$，与 $h\approx0.7$ 时的曲线一致（绝对标定依赖于 $M$ 与 $H_0$ 的简并，所以超新星本身只约束距离的**形状**）；下面板的残差就是相对最佳拟合 $\Lambda$CDM 的 $\Delta(\sym{ch02-appmag}{m}-M)$。`}</Tx>
          <ModulusAbsPlot />
          <ModulusPlot />
        </>}>
        {R`对欧氏物质主导宇宙（可解析计算）和基准欧氏协调宇宙学（需要数值计算一个一维积分），画出 $d_L(z)$、$d_A(z)$ 以及 $\sym{ch02-appmag}{m}-M$ 随红移的变化。$\sym{ch02-appmag}{m}-M$ 中忽略 K 修正。与图 2.6 比较。`}
      </Exercise>

      <Exercise n="2.11" title="熵密度" level="★★" fromBook
        hint={R`$s=4\rho/3T$；无质量玻色子 $\rho=\sym{ch02-gdeg}{g}\pi^2T^4/30$，费米子乘 7/8。对 $T\ll m$，$e^{E/T}\approx e^{m/T}e^{p^2/2mT}\gg1$。`}
        solution={R`无质量玻色子的能量密度为 $\sym{ch02-gdeg}{g}\pi^2T^4/30$，费米子为其 7/8。由 $s=4\rho/3T$，
$$s=\frac{2\pi^2}{45}\left[\sum_{i=\rm bosons}\sym{ch02-gdeg}{g}_iT_i^3+\frac78\sum_{i=\rm fermions}\sym{ch02-gdeg}{g}_iT_i^3\right],$$
这里考虑了不同粒子可能有不同温度的情形。对 $\mu=0$ 的有质量粒子，当温度远低于质量时 $e^{E/T}\to e^{m/T}\times e^{p^2/2mT}$，分母中的 $\pm1$ 可忽略，所以无论费米子还是玻色子，分布函数——从而压强和能量密度——都按 $e^{-m/T}$ 标度。具体地，$n=\sym{ch02-gdeg}{g}\left(\frac{mT}{2\pi}\right)^{3/2}e^{-m/T}$，$\rho\approx mn$，$\mathcal P=nT$，于是 $s=(\rho+\mathcal P)/T\approx n\,(m/T)\propto(m/T)^{5/2}T^3e^{-m/T}$，指数压低。`}>
        {R`考虑 \eqref{2.70} 定义的熵密度 $s$。对无质量粒子，你在 \exref{2.9} 中已证明 $\mathcal P=\rho/3$，所以 $s=4\rho/3T$。对处于平衡、化学势为零的（无质量）玻色子与费米子，把 $s$ 表示为 $T$ 的函数。证明处于平衡的有质量粒子（$T\ll m$；$\mu=0$）的熵密度是指数压低的。`}
      </Exercise>

      <Exercise n="2.12" title="宇宙中微子的数密度" level="★★"
        hint={R`$n=\sym{ch02-gdeg}{g}\int\frac{d^3p}{(2\pi)^3}f$；$\int_0^\infty\frac{\sym{ch02-xint}{x}^2d\sym{ch02-xint}{x}}{e^x-1}=2\zeta(3)$，$\int_0^\infty\frac{\sym{ch02-xint}{x}^2d\sym{ch02-xint}{x}}{e^x+1}=\frac32\zeta(3)$（式 (C.30)）。`}
        solution={R`光子：$n_\gamma=\frac{2}{2\pi^2}T^3\int_0^\infty\frac{\sym{ch02-xint}{x}^2d\sym{ch02-xint}{x}}{e^x-1}=\frac{2\zeta(3)}{\pi^2}T^3$。$T_0=2.726\,\mathrm K=2.349\times10^{-4}\,\mathrm{eV}$，除以 $(\hbar c)^3$ 得 $n_\gamma=411\,\mathrm{cm^{-3}}$。

一代中微子加反中微子（$\sym{ch02-gdeg}{g}=2$，费米子，温度 $T_\nu$）：$n_{\nu_i}=\frac{2}{2\pi^2}T_\nu^3\cdot\frac32\zeta(3)=\frac34\cdot\frac{2\zeta(3)}{\pi^2}T_\nu^3=\frac34\frac{T_\nu^3}{T^3}n_\gamma=\frac34\cdot\frac4{11}n_\gamma=\frac{3}{11}n_\gamma=112\,\mathrm{cm^{-3}}.$

注意数密度只依赖于分布函数的形状（$p/T_\nu$），**与中微子质量无关**，因为脱耦后的分布 $1/(e^{p/T_\nu}+1)$ 中出现的是动量而非能量。

验证 \eqref{2.84}：今天非相对论时 $\rho_{\nu_i}=m_{\nu_i}n_{\nu_i}$，$\rho_{\rm cr}=1.054\times10^4h^2\,\mathrm{eV\,cm^{-3}}$，于是
$$\Omega_{\nu_i}h^2=\frac{112\,\mathrm{cm^{-3}}\,m_{\nu_i}}{1.054\times10^4\,\mathrm{eV\,cm^{-3}}}=\frac{m_{\nu_i}}{94\,\mathrm{eV}}.$$`}>
        {R`证明今天宇宙中一代中微子与反中微子的数密度为
$$n_{\nu_i}=\frac{3}{11}n_\gamma=112\,\mathrm{cm^{-3}}.$$
为此你还需计算光子数密度；$n_{\nu_i}$ 与 $n_\gamma$ 都可以用黎曼 $\zeta$ 函数表示（式 (C.30)）。利用这一结果验证 \eqref{2.84}。`}
      </Exercise>

      <Exercise n="2.13" title="无质量与 0.06 eV 中微子的两种宇宙" level="★★"
        hint={R`两种情形都满足 $\Omega_{\rm c}+\Omega_\nu=1$。有质量中微子的 $\rho_\nu(a)$ 用 \eqref{2.83}（$T_\nu=T_{\nu,0}/a$）数值积分；无质量时 $\rho_\nu\propto a^{-4}$。`}
        solution={<>
          <Tx>{R`记情形 A（无质量）与 B（$m_\nu=0.06\,\mathrm{eV}$）。中微子（一代，标准丰度与温度 $T_{\nu,0}=1.945\,\mathrm K$）今天的密度参数：A 中 $\Omega_\nu^{\rm A}=0.227\times2.47\times10^{-5}/h^2=5.6\times10^{-6}/h^2$；B 中由 \eqref{2.84} $\Omega_\nu^{\rm B}=0.06/(94h^2)=6.4\times10^{-4}/h^2$。冷暗物质补足到临界密度：$\Omega_{\rm c}=1-\Omega_\nu$。于是
$$\frac{\rho_{\rm A}}{\rho_{\rm cr}}=\frac{1-\Omega_\nu^{\rm A}}{a^3}+\frac{\Omega_\nu^{\rm A}}{a^4},\qquad \frac{\rho_{\rm B}}{\rho_{\rm cr}}=\frac{1-\Omega_\nu^{\rm B}}{a^3}+\frac{\rho_{\nu}^{\rm B}(a)}{\rho_{\rm cr}},$$
后者由 \eqref{2.83} 计算（即 $\Omega_\gamma a^{-4}\times$ 图 2.5 的比值，$x=m_\nu a/T_{\nu,0}$）。

在对数坐标下两条 $\rho(a)$ 曲线几乎完全重合，所以下图画出它们的**比值**。极早期（$a\lesssim10^{-6}$，中微子主导且相对论性）两者相同，比值 $\to1$；今天按构造两者都等于 $\rho_{\rm cr}$，比值 $=1$。中间（物质主导但中微子尚为相对论性，$10^{-4}\lesssim a\lesssim10^{-2}$）B 中冷暗物质少了 $\Omega_\nu^{\rm B}-\Omega_\nu^{\rm A}$，而这部分能量当时还以"辐射"形式存在、密度远低于它日后作为物质的贡献，所以 $\rho_{\rm B}/\rho_{\rm A}\approx1-\Omega_\nu^{\rm B}\approx1-0.0013$（$h=0.7$）。中微子在 $1+z\sim m_\nu/3T_{\nu,0}\approx120$ 前后变为非相对论，比值随之回到 1。这个"中间的亏损"虽小，却会在第 8 章通过结构增长的压低被探测到。`}</Tx>
          <Ex213Plot />
        </>}>
        {R`考虑如下两种情形。每种情形的能量密度都等于临界密度，且只分给两个成分：冷暗物质粒子与一种中微子。两种情形中的中微子都具有标准的丰度和温度，唯一的区别是：一种情形中微子无质量，另一种情形中微子质量为 0.06 eV。画出每种情形中能量密度随标度因子的变化。注意它们在极早期（每种情形早期都只有一种相对论性中微子）和极晚期应当一致，差别只出现在中间。`}
      </Exercise>

      <Exercise n="2.14" title="暗能量–物质相等时期" level="★"
        hint={R`令 $\Omega_{\rm m}a^{-3}=\Omega_\Lambda$。`}
        solution={R`宇宙学常数的密度不变，物质按 $a^{-3}$ 稀释。令 $\Omega_{\rm m}a_{{\rm m}\Lambda}^{-3}=\Omega_\Lambda$：
$$a_{{\rm m}\Lambda}=\left(\frac{\Omega_{\rm m}}{\Omega_\Lambda}\right)^{1/3},\qquad 1+z_{{\rm m}\Lambda}=\left(\frac{\Omega_\Lambda}{\Omega_{\rm m}}\right)^{1/3}.$$
$\Omega_{\rm m}=0.3$、$\Omega_\Lambda=0.7$ 时 $a_{{\rm m}\Lambda}=0.754$，$z_{{\rm m}\Lambda}=0.33$（$\Omega_{\rm m}=0.311$ 时 $a=0.767$，$z=0.30$）——不到 40 亿年前，宇宙在"宇宙学意义上"非常晚近才进入暗能量主导。注意加速开始得**比**暗能量主导**更早**：加速开始于 $\ddot a=0$，即 $\rho_\Lambda=\rho_{\rm m}/2$，$1+z_{\rm acc}=(2\Omega_\Lambda/\Omega_{\rm m})^{1/3}$，$z_{\rm acc}\approx0.67$。对一般常数 $w$：$a_{\rm m,DE}=(\Omega_{\rm m}/\Omega_{\rm DE})^{-1/(3w)}$（见 §2.4.5 的交互图）。`}>
        {R`假设暗能量是宇宙学常数，确定暗能量–物质相等的时期。`}
      </Exercise>
    </Sec>);
}
