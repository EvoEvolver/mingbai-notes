// 习题 9.1–9.17 —— 式 (9.83)–(9.95)。解答：9.2、9.9、9.16、9.17 依据原书附录 A；其余为编者给出（数值由本章 _ch09_phys.jsx 计算）。
import { Sec, Tx, Eq, Exercise, Table } from "@kit";

const R = String.raw;

export function Exercises() {
  return (
    <Sec n="9.E" title="Exercises" zh="习题">
      <Exercise n="9.1" title="等曲率扰动的大尺度解" level="★"
        hint={R`视界外 $\Theta_0'=-\Phi'$（\eqref{8.16}），积分常数由初条件定；再用 $\Psi\simeq-\Phi$。`}
        solution={R`视界外忽略所有正比于 $k$ 的项，光子单极满足 $\Theta_0'=-\Phi'$，所以 $\Theta_0+\Phi$ 守恒。等曲率初条件 $\Theta_0=\Phi=0$ 使守恒量为零：$\Theta_0(\eta_*)=-\Phi(\eta_*)$。于是 $\Theta_0+\Psi=-\Phi+\Psi=2\Psi$（用 $\Phi=-\Psi$），即 \eqref{9.83}。与绝热情形 \eqref{9.6} $\Theta_0+\Psi=\frac13\Psi$ 相比，同样的势产生的大尺度各向异性大 6 倍、符号相反——等曲率模式中势是由组分间的相对扰动在视界外"逐渐长出"的，光子没有初始的本征温度扰动来抵消引力红移。`}>
        <Tx>{R`本书大部分篇幅致力于理解具有第 7 章所推初条件的绝热扰动。另一类扰动是**等曲率**扰动，其初条件为 $\Theta_0=\Psi=\Phi=0$。物理上，它们对应于不同粒子种类之间的相对扰动，使总密度扰动为零。证明在大尺度上这些初条件意味着`}</Tx>
        <Eq n="9.83" say={R`等曲率初条件下，大尺度可观测温度扰动是复合时势的两倍（而绝热情形只有 $\Psi/3$）。`}>{R`\Theta_0(\boldsymbol k,\eta_*) + \Psi(\boldsymbol k,\eta_*) = 2\Psi(\boldsymbol k,\eta_*).`}</Eq>
      </Exercise>

      <Exercise n="9.2" title="带阻尼的谐振子" level="★" fromBook
        solution={R`设解为 $x=e^{i\omega t}$。阻尼方程化为关于 $\omega$ 的二次方程
$$\omega^2-\frac{ib}{m}\omega-\frac{k}{m}=0.\tag{A.115}$$
在 $k/m>\gamma^2\equiv(b/2m)^2$ 时解为
$$\omega=i\gamma\pm\omega_1.\tag{A.116}$$
频率变为 $\omega_1\equiv[k/m-\gamma^2]^{1/2}$，小于无阻尼情形的 $\sqrt{k/m}$。振幅还被因子 $e^{-\gamma t}$ 指数衰减。（对照 \eqref{9.22}：拖曳系数 $R'/(1+R)\sim aH$ 远小于 $kc_s$，所以频率修正可忽略，主要效应是慢变的振幅衰减——WKB 解中的 $(1+R)^{-1/4}$，见 \exref{9.5}。）`}>
        <Tx>{R`带拖曳项的谐振子方程为`}</Tx>
        <Eq n="9.84" say={R`阻尼谐振子：惯性 + 拖曳 + 回复力 = 0。`}>{R`m\ddot x + b\dot x + \sym{ch09-kspring}{k}x = 0.`}</Eq>
        <Tx>{R`求 $k/m>(b/2m)^2$ 时此方程的解。振荡频率是多少？与无阻尼（$b=0$）的解有何不同？非零 $b$ 除改变频率外还有什么效应？（这里 $k$ 是劲度系数。）`}</Tx>
      </Exercise>

      <Exercise n="9.3" title={R`$R(\eta_*)$ 与声速`} level="★"
        hint={R`$R=\frac{3\rho_{\rm b}}{4\rho_\gamma}=\frac{3\Omega_{\rm b}h^2}{4\Omega_\gamma h^2}a$，$\Omega_\gamma h^2=2.47\times10^{-5}$（$T_0=2.7255\,\mathrm K$）。`}
        solution={<>
          <Tx>{R`$R(a)=\frac{3}{4\times2.47\times10^{-5}}\,\Omega_{\rm b}h^2\,a=3.03\times10^4\,\Omega_{\rm b}h^2\,a$。取 $a_*=1/1091$：`}</Tx>
          <Table head={[R`$\Omega_{\rm b}h^2$`, R`$R(a_*)$`, R`$c_s(a_*)=[3(1+R)]^{-1/2}$`, R`$r_s(\eta_*)$ [Mpc]`]} rows={[
            [R`$0.0180$（$-20\%$）`, "0.499", "0.473", "146.7"],
            [R`$0.0224$（基准）`, "0.624", "0.453", "144.2"],
            [R`$0.0269$（$+20\%$）`, "0.749", "0.435", "141.9"],
          ]} caption={R`$r_s$ 一栏为本页数值（$\Omega_{\rm c}h^2$ 固定，复合时刻按可见度峰取）。`} />
          <Tx>{R`$c_s(a)$ 从早期的 $1/\sqrt3=0.577$ 单调下降，$R\propto a$ 线性增长；三条曲线在 $a\lesssim10^{-5}$ 时重合，复合时相差约 $\pm4\%$。重子越多，声速越低、声视界越小（峰移向更大 $l$），奇偶峰不对称越强。`}</Tx>
        </>}>
        {R`对 $\Omega_{\rm b}h^2$ 的基准值以及上下浮动 $\pm20\%$ 的值，求 $R(\eta_*)$。画出这三种 $\Omega_{\rm b}h^2$ 下声速随标度因子的变化。`}
      </Exercise>

      <Exercise n="9.4" title="声视界的解析式" level="★★"
        hint={R`物质+辐射背景中 $a^2H=H_0\sqrt{\Omega_{\rm m}}\sqrt{a+a_{\rm eq}}$。把积分变量换成 $R\propto a$，并用 $k_{\rm eq}^2=2\Omega_{\rm m}H_0^2/a_{\rm eq}$。`}
        solution={R`$r_s=\int c_s\,d\eta=\int_0^a\frac{da'}{a'^2H\sqrt{3(1+R)}}$。令 $R=R_{\rm eq}a/a_{\rm eq}$（$R_{\rm eq}\equiv R(\eta_{\rm eq})$），则 $a'+a_{\rm eq}=a_{\rm eq}(R'+R_{\rm eq})/R_{\rm eq}$，
$$r_s=\frac{\sqrt{a_{\rm eq}}}{\sqrt3\,H_0\sqrt{\Omega_{\rm m}}\sqrt{R_{\rm eq}}}\int_0^R\frac{dR'}{\sqrt{(1+R')(R'+R_{\rm eq})}} .$$
积分 $=2\ln\big[\sqrt{1+R'}+\sqrt{R'+R_{\rm eq}}\big]_0^R=2\ln\frac{\sqrt{1+R}+\sqrt{R+R_{\rm eq}}}{1+\sqrt{R_{\rm eq}}}$。再用 $H_0\sqrt{\Omega_{\rm m}}=k_{\rm eq}\sqrt{a_{\rm eq}/2}$：前因子 $\frac{2\sqrt2}{\sqrt3k_{\rm eq}\sqrt{R_{\rm eq}}}=\frac{2}{3k_{\rm eq}}\sqrt{\frac{6}{R_{\rm eq}}}$，即 \eqref{9.85}。数值核对：基准宇宙学 $k_{\rm eq}=0.0104\,\mathrm{Mpc^{-1}}$、$R_{\rm eq}=0.200$、$R_*=0.623$，\eqref{9.85} 给出 $144.2\,\mathrm{Mpc}$，与本页数值积分 $144.2\,\mathrm{Mpc}$ 一致（复合时 $\Lambda$ 可忽略）。这正是 Eisenstein–Hu（1998）转移函数中所用的声视界公式。`}>
        <Tx>{R`证明声视界可以用共形时间表示为`}</Tx>
        <Eq n="9.85" say={R`物质+辐射宇宙中声视界的闭式：只依赖相等尺度 $k_{\rm eq}$ 与重子负载 $R$（在相等时与在 $\eta$ 时的值）。`}>{R`r_s(\eta) = \frac{2}{3k_{\rm eq}}\sqrt{\frac{6}{R(\eta_{\rm eq})}}\ln\left\{\frac{\sqrt{1+R}+\sqrt{R+R(\eta_{\rm eq})}}{1+\sqrt{R(\eta_{\rm eq})}}\right\},`}</Eq>
        <Tx>{R`其中 $k_{\rm eq}$ 由 \eqref{8.39} 给出。`}</Tx>
      </Exercise>

      <Exercise n="9.5" title="WKB 解" level="★★"
        hint={R`$B$ 快变、$A$ 慢变：实部方程中忽略 $A''/A$ 与 $A'/A$ 项。虚部方程乘以 $A^2(1+R)$ 后是一个全导数。`}
        solution={R`把 $\Theta_0=Ae^{iB}$ 代入 \eqref{9.20} 的齐次部分 $\Theta_0''+\frac{R'}{1+R}\Theta_0'+k^2c_s^2\Theta_0=0$（$\frac{a'}a\frac R{1+R}=\frac{R'}{1+R}$）：
$\Theta_0'=(A'+iAB')e^{iB}$，$\Theta_0''=(A''+2iA'B'+iAB''-AB'^2)e^{iB}$。除以 $Ae^{iB}$ 并分出实部与虚部，即得 \eqref{9.87}–\eqref{9.88}。

**实部**：$B$ 变化远快于 $A$，$(B')^2\gg A''/A,\ \frac{R'}{1+R}\frac{A'}{A}$，于是 $B'=kc_s$，$B=k\int c_s\,d\eta=kr_s$——相位与 \eqref{9.23} 相同。

**虚部**：乘以 $A^2(1+R)$：$\frac{d}{d\eta}\big[A^2B'(1+R)\big]=0$，所以 $A\propto[B'(1+R)]^{-1/2}\propto[c_s(1+R)]^{-1/2}\propto(1+R)^{-1/4}$。

因此 WKB 齐次解为 $(1+R)^{-1/4}\cos(kr_s)$ 与 $(1+R)^{-1/4}\sin(kr_s)$，比 \eqref{9.23} 多一个因子 $(1+R)^{-1/4}$。这是"绝热不变量"：振子质量（$1+R$）缓慢增加时，能量/频率守恒，振幅按 $(m\omega)^{-1/2}\propto(1+R)^{-1/4}$ 减小。复合时 $R_*\approx0.6$，振幅约降低 11%。`}>
        <Tx>{R`求 \eqref{9.20} 的 WKB 解。令`}</Tx>
        <Eq n="9.86" say={R`WKB 拟设：慢变振幅 $A$ 乘以快变相位因子 $e^{iB}$。`}>{R`\Theta_0 = Ae^{iB}`}</Eq>
        <Tx>{R`其中 $A$、$B$ 为实数。证明 \eqref{9.20} 的齐次部分分解为分别来自实部与虚部的两个方程：`}</Tx>
        <Eq n="9.87" say={R`实部：相位变化率的平方由压强回复力（$k^2c_s^2$）决定，振幅的二阶导数与拖曳给出小修正。`}>{R`\text{Real:}\quad -(B')^2 + \frac{A''}{A} + \frac{R'}{1+R}\frac{A'}{A} + k^2c_s^2 = 0,`}</Eq>
        <Eq n="9.88" say={R`虚部：等价于 $[A^2B'(1+R)]'=0$——"作用量"守恒，决定振幅的缓慢变化。`}>{R`\text{Imaginary:}\quad 2B'\frac{A'}{A} + B'' + \frac{R'}{1+R}B' = 0.`}</Eq>
        <Tx>{R`利用实部方程以及 $B$ 比 $A$ 变化快得多的事实求出 $B$；再用虚部方程确定 $A$。证明这样得到的齐次解与 \eqref{9.23} 的简单振荡解相差一个因子 $(1+R)^{1/4}$。`}</Tx>
      </Exercise>

      <Exercise n="9.6" title={R`数值计算复合时的 $\Theta_0+\Psi$ 与 $\Theta_1$`} level="★★★"
        hint={R`需要势 $\Phi(k,\eta)$、$\Psi(k,\eta)$：可从 CAMB/CLASS 输出插值，或用 Hu & Sugiyama（1995）的拟合公式。`}
        solution={R`本页 \figref{9.1}、\figref{9.2}、\figref{9.7} 的交互版做的是一个相关但更直接的计算：不用 \eqref{9.26}–\eqref{9.28} 的 Green 函数积分，而是把紧耦合方程 \eqref{9.13}、\eqref{9.18} 与 CDM、截断的中微子层级、Einstein 方程一起数值积分到可见度峰（源码 _ch09_phys.jsx 中的 solveMode）。结果：第一、二、三峰在 $k_{\rm pk}r_s/\pi=0.88,\,1.82,\,2.88$；未计阻尼时 $[(\Theta_0+\Psi)/\Phi(0)]^2$ 的峰高为 0.75、0.54、1.13。由此投影得到的 $C(l)$ 峰位（220、540、810、1130、1420、1730）与原书 \figref{9.17} 中的完整 Boltzmann 解吻合到 1–2%，峰高偏差约 10–20%，主要来自紧耦合近似在复合附近失效、复合历史的 tanh 近似以及忽略偏振。若改用 \eqref{9.26}：把数值解给出的 $\Phi-\Psi$ 代入积分，得到的峰位相同，但振幅缺少 WKB 因子 $(1+R)^{-1/4}$ 与 $\Phi/(1+R)$ 修正，奇数峰会偏高约 10%。`}>
        {R`通过计算 \eqref{9.26} 与 \eqref{9.28} 中的积分，求复合时 $\Theta_0+\Psi$ 与 $\Theta_1$ 的数值解。为此需要引力势的表达式：可以从 CAMB 或 CLASS 的输出插值得到，或者使用 Hu 与 Sugiyama（1995）给出的拟合公式。把结果与 CAMB 或 CLASS 的完整数值 Boltzmann 解比较。`}
      </Exercise>

      <Exercise n="9.7" title="偏振对扩散阻尼的修正" level="★★★"
        hint={R`计入偏振后四极方程的散射项变为 $\tau'[\Theta_2-\Pi/10]$，$\Pi=\Theta_2+\Theta_{P,0}+\Theta_{P,2}$。紧耦合下偏振的单极与四极由 $\Pi$ 决定。`}
        solution={R`偏振方程（\eqref{5.67} 的偏振部分）为 $\Theta_P'+ik\mu\Theta_P=-\tau'[-\Theta_P+\frac12(1-\mathcal P_2)\Pi]$。紧耦合下按 $1/\tau'$ 展开，领头阶由散射项的平衡给出：$\Theta_{P,0}=\frac12\Pi$，$\Theta_{P,2}=\frac1{10}\Pi$（$l=2$ 矩取 \eqref{5.66} 的符号约定），其余各阶被压低。代入 $\Pi$ 的定义：$\Pi=\Theta_2+\frac12\Pi+\frac1{10}\Pi$，故 $\Pi=\frac52\Theta_2$。

于是温度四极方程 $\Theta_2'-\frac{2k}{5}\Theta_1=\tau'(\Theta_2-\frac{\Pi}{10})=\frac34\tau'\Theta_2$——散射项系数由 $\frac9{10}$ 变为 $\frac34$。丢掉 $\Theta_2'$：$\Theta_2=-\frac{8k}{15\tau'}\Theta_1$（取代 \eqref{9.36} 的 $-\frac{4k}{9\tau'}$）。于是 \eqref{9.38} 中的 $-\frac{8k^2}{27\tau'}$ 变为 $\frac{2k}{3}\Theta_2/\Theta_1=-\frac{16k^2}{45\tau'}$，\eqref{9.40} 中的 $\frac8{27}$ 变为 $\frac{16}{45}$，而 \eqref{9.42} 中的 $\frac89=3\times\frac{8}{27}$ 变为 $3\times\frac{16}{45}=\frac{16}{15}$。偏振把阻尼长度的平方加大了 $\frac{16/15}{8/9}=1.2$ 倍（$R=0$ 时），即 $k_D$ 减小约 9%。`}>
        {R`我们对扩散阻尼的处理忽略了偏振的效应。仿照 \secref{9.4} 按 $\tau'^{-1}$ 展开，这次计入偏振。证明这使 \eqref{9.42} 中的因子 $8/9$ 变为 $16/15$。这个漂亮的结果由 Zaldarriaga 与 Harari（1995）得到。`}
      </Exercise>

      <Exercise n="9.8" title={R`全电离、$R=0$ 时的阻尼尺度`} level="★★"
        hint={R`$d\eta=da/(a^2H)$，$H=H_0\sqrt{\Omega_{\rm m}}a^{-3/2}\sqrt{1+a_{\rm eq}/a}$。积分 $\int_0^a\frac{a'^2\,da'}{\sqrt{a'+a_{\rm eq}}}$ 用 $u=a'+a_{\rm eq}$ 换元。`}
        solution={R`$R=0$ 时 \eqref{9.42} 为 $k_D^{-2}=\frac{4}{27}\int\frac{d\eta}{n_e\sigma_{\rm T}a}$。用 \eqref{9.43}，$\frac{d\eta}{n_e\sigma_{\rm T}a}=\frac{da}{a^2H}\cdot\frac{a^2}{2.3\times10^{-5}\,\Omega_{\rm b}h^2(1-Y_P/2)}$，所以
$$k_D^{-2}=\frac{4}{27}\,\frac{1}{2.3\times10^{-5}\,\Omega_{\rm b}h^2(1-Y_P/2)}\,\frac{1}{H_0\sqrt{\Omega_{\rm m}}}\int_0^a\frac{a'^2\,da'}{\sqrt{a'+a_{\rm eq}}} .$$
令 $u=a'+a_{\rm eq}$：$\int\frac{(u-a_{\rm eq})^2}{\sqrt u}du=\frac25u^{5/2}-\frac43a_{\rm eq}u^{3/2}+2a_{\rm eq}^2u^{1/2}$，下限 $u=a_{\rm eq}$ 给出 $\frac{16}{15}a_{\rm eq}^{5/2}$。提出 $\frac25a^{5/2}$，记 $y=a/a_{\rm eq}$、$s=1+1/y$：
$$\int_0^a=\frac25a^{5/2}\cdot\frac52\Big[\frac{16}{15}s^{5/2}-\frac83s^{3/2}+2s^{1/2}-\frac{16}{15}y^{-5/2}\Big]=\frac25a^{5/2}f_D(y),$$
展开 $\frac52[\cdots]=5\sqrt s-\frac{20}{3}s^{3/2}+\frac83(s^{5/2}-y^{-5/2})$，正是 \eqref{9.89}；$y\to\infty$ 时 $f_D\to5-\frac{20}3+\frac83=1$。代入 $H_0\sqrt{\Omega_{\rm m}}=3.33\times10^{-4}\sqrt{\Omega_{\rm m}h^2}\,\mathrm{Mpc^{-1}}$：
$$k_D^{-2}=\frac{(4/27)(2/5)}{2.3\times10^{-5}\times3.33\times10^{-4}}\,a^{5/2}f_D\,(\Omega_{\rm b}h^2)^{-1}(1-Y_P/2)^{-1}(\Omega_{\rm m}h^2)^{-1/2}\,\mathrm{Mpc^2},$$
系数为 $7.7\times10^6\,\mathrm{Mpc^2}$——形式与 \eqref{9.44} 相同，但数值是原书 $3.1\times10^6$ 的 $5/2$ 倍（见 \secref{9.4} 的勘误框；原书 \figref{9.8} 的虚线与 $7.7\times10^6$ 一致）。`}>
        <Tx>{R`假设所有与氢相关的电子保持电离，并令 $R=0$。计算 \eqref{9.42} 定义的阻尼尺度 $k_D$。证明在此极限下阻尼尺度由 \eqref{9.44} 给出，其中`}</Tx>
        <Eq n="9.89" say={R`相等之前（辐射期）积分增长较慢的修正因子；物质主导深处（$y\to\infty$）趋于 1。`}>{R`f_D(y) = 5\sqrt{1+1/y} - \frac{20}{3}(1+1/y)^{3/2} + \frac83\left[(1+1/y)^{5/2} - 1/y^{5/2}\right].`}</Eq>
      </Exercise>

      <Exercise n="9.9" title="Legendre 多项式的球谐投影" level="★" fromBook
        solution={R`用球谐函数的加法定理 \eqref{C.12} 写出
$$\mathcal P_{l'}(\hat{\boldsymbol p}\cdot\hat{\boldsymbol k})=\frac{4\pi}{2l'+1}\sum_{m'}Y^*_{l'm'}(\hat{\boldsymbol p})Y_{l'm'}(\hat{\boldsymbol k}).\tag{A.117}$$
于是角积分变成两个球谐函数乘积的积分，由正交性 \eqref{9.64}，只有 $l'=l$、$m'=m$ 时等于 1，否则为零。这直接给出所要的结果。`}>
        <Tx>{R`证明`}</Tx>
        <Eq n="9.90" say={R`把 Legendre 多项式投影到 $Y_{lm}$ 上：只有同阶 $l'=l$ 存活，结果是 $Y_{lm}$ 在 $\hat{\boldsymbol k}$ 方向的值乘以 $4\pi/(2l+1)$。`}>{R`\int d\Omega\,Y_{lm}(\hat{\boldsymbol p})\mathcal P_{l'}(\hat{\boldsymbol p}\cdot\hat{\boldsymbol k}) = \frac{4\pi}{2l+1}Y_{lm}(\hat{\boldsymbol k})\delta_{ll'}.`}</Eq>
      </Exercise>

      <Exercise n="9.10" title={R`从最后散射面直接求 $a_{lm}$`} level="★★"
        hint={R`平面波展开 \eqref{C.17}：$e^{i\boldsymbol k\cdot\hat{\boldsymbol p}\chi}=\sum_l i^l(2l+1)j_l(k\chi)\mathcal P_l(\hat{\boldsymbol k}\cdot\hat{\boldsymbol p})=4\pi\sum_{lm}i^lj_l(k\chi)Y^*_{lm}(\hat{\boldsymbol k})Y_{lm}(\hat{\boldsymbol p})$。`}
        solution={R`(a) 代入平面波展开并比较 $Y_{lm}(\hat{\boldsymbol p})$ 的系数：
$$a_{lm}=4\pi i^l\int\frac{d^3k}{(2\pi)^3}\,j_l(k\chi_*)\,Y^*_{lm}(\hat{\boldsymbol k})\,(\Theta+\Psi)(\boldsymbol k,\eta_*).$$
(b) 取 $\langle a_{lm}a^*_{lm}\rangle$，用 $\langle(\Theta+\Psi)(\boldsymbol k)(\Theta+\Psi)^*(\boldsymbol k')\rangle=(2\pi)^3\delta^{(3)}_{\rm D}(\boldsymbol k-\boldsymbol k')P_{\mathcal R}(k)\,|(\Theta+\Psi)/\mathcal R|^2$：
$$C(l)=16\pi^2\int\frac{d^3k}{(2\pi)^3}P_{\mathcal R}(k)\Big|\frac{\Theta+\Psi}{\mathcal R}\Big|^2j_l^2(k\chi_*)|Y_{lm}(\hat{\boldsymbol k})|^2=\frac2\pi\int dk\,k^2P_{\mathcal R}(k)\Big|\frac{(\Theta+\Psi)(k,\eta_*)}{\mathcal R}\,j_l(k\chi_*)\Big|^2 ,$$
最后一步对 $\hat{\boldsymbol k}$ 积分得 $\int d\Omega_k|Y_{lm}|^2=1$。这正是 \eqref{9.74} 在 $\mathcal T_l=(\Theta_0+\Psi)j_l/\mathcal R$（\eqref{9.59} 只保留单极项）时的形式。这一推导直接体现了"三维 Fourier 模式在半径 $\chi_*$ 的球面上的投影"。`}>
        <Tx>{R`从复合时的非均匀温度场 $\Theta_0(\boldsymbol x,\eta_*)$ 或 $\Theta_0(\boldsymbol k,\eta_*)$ 到今天的各向异性图样 $a_{lm}$，还有一种与正文不同的途径。

(a) 假设我们今天从方向 $\hat{\boldsymbol p}$ 看到的光子来自最后散射面：$\Theta(\boldsymbol x_0,\hat{\boldsymbol p},\eta_0)=(\Theta_0+\Psi)(\boldsymbol x=\chi_*\hat{\boldsymbol p},\eta_*)$，$\boldsymbol x_0$ 是我们的位置。也就是说，忽略偶极与 ISW 项。对右边做 Fourier 变换、把左边按球谐函数展开，得到`}</Tx>
        <Eq n="9.91" say={R`今天看到的天空 = 半径 $\chi_*$ 的最后散射面上 $\Theta+\Psi$ 的值；右边是这个三维场的 Fourier 表示。`}>{R`\sum_{lm}a_{lm}Y_{lm}(\hat{\boldsymbol p}) = \int\frac{d^3k}{(2\pi)^3}e^{i\boldsymbol k\cdot\hat{\boldsymbol p}\chi_*}(\Theta+\Psi)(\boldsymbol k,\eta_*).`}</Eq>
        <Tx>{R`现在用 \eqref{C.17} 展开指数。令 $Y_{lm}(\hat{\boldsymbol p})$ 的系数相等，得到 $a_{lm}$ 的表达式。

(b) 把 (a) 中得到的 $a_{lm}$ 平方并取期望值，得到 $C(l)$ 的表达式。只计入 \eqref{9.59} 的单极项时，应当重现 \eqref{9.74}。`}</Tx>
      </Exercise>

      <Exercise n="9.11" title="单极与偶极的交叉项" level="★★"
        hint={R`$\int j_lj_l'\,dx=\frac12[j_l^2]_0^\infty$。对另两个积分用 $j_l'=\frac{lj_{l-1}-(l+1)j_{l+1}}{2l+1}$ 与 Weber–Schafheitlin 积分 $\int_0^\infty j_mj_n\,dx=\frac{\sin[(m-n)\pi/2]}{(m-n)(m+n+1)}$（$m=n$ 时取极限 $\frac{\pi}{2(2n+1)}$）。`}
        solution={<>
          <Tx>{R`**交叉项严格为零**：$\int_0^\infty j_lj_l'\,dx=\frac12\big[j_l^2(x)\big]_0^\infty=0$（$l\ge1$ 时 $j_l(0)=0$，$x\to\infty$ 时 $j_l\to0$）。**平方项**：$\int_0^\infty j_l^2\,dx=\frac{\pi}{2(2l+1)}$；$\int_0^\infty(j_l')^2dx=\frac{\pi}{2(2l+1)^2}\Big[\frac{l^2}{2l-1}+\frac{(l+1)^2}{2l+3}\Big]\approx\frac{\pi}{4(2l+1)}$（$j_{l-1}j_{l+1}$ 的交叉积分因 $\sin\pi=0$ 而为零）。数值核对（本页 jlArray，积分到 $x\approx4000+20l$ 并补上尾部 $\approx1/2x$）：`}</Tx>
          <Table head={["$l$", R`$\int j_l^2$`, R`$\int j_lj_l'$`, R`$\int(j_l')^2$`, R`比值 $\int j'^2/\int j^2$`]} rows={[
            ["10", R`$7.480\times10^{-2}$`, R`$\sim10^{-9}$`, R`$3.749\times10^{-2}$`, "0.501"],
            ["50", R`$1.555\times10^{-2}$`, R`$\sim10^{-8}$`, R`$7.79\times10^{-3}$`, "0.500"],
            ["100", R`$7.815\times10^{-3}$`, R`$\sim10^{-9}$`, R`$3.91\times10^{-3}$`, "0.500"],
            ["200", R`$3.917\times10^{-3}$`, R`$\sim10^{-9}$`, R`$1.96\times10^{-3}$`, "0.500"],
          ]} />
          <Tx>{R`所以对所有 $k$ 积分时，单极（$\propto j_l$）与偶极（$\propto j_l'$）的功率直接相加，交叉项不贡献——这就是 \secref{9.6.2} 所说的"不相干相加"。（实际的 $C(l)$ 积分带有权重 $P_{\mathcal R}(k)|\Theta_0+\Psi|^2$ 等，它们随 $k$ 慢变，交叉项因此只是被强烈压低而非严格为零；本页 \secref{9.6.2} 说明框中对振荡取平均的处理正是这一结论的连续版本。）`}</Tx>
        </>}>
        <Tx>{R`证明对所有模式求和时，单极与偶极的交叉项被压低。单极正比于 $j_l(k\eta_0)$，偶极正比于 $j_l'(k\eta_0)$。计算三个可能的积分`}</Tx>
        <Eq n="9.92" say={R`三个积分分别对应单极自身、单极–偶极交叉、偶极自身的投影权重。`}>{R`\int_0^\infty dx\,j_lj_l;\qquad \int_0^\infty dx\,j_lj_l';\qquad \int_0^\infty dx\,j_l'j_l'.`}</Eq>
        <Tx>{R`证明平方项（$j_l^2$ 与 $(j_l')^2$）的积分远大于交叉项 $j_lj_l'$ 的积分。对 $l=10$ 直到 $l=200$ 计算这些积分。`}</Tx>
      </Exercise>

      <Exercise n="9.12" title={R`$\Lambda$ 对峰位的影响`} level="★★"
        hint={R`$h=\sqrt{\Omega_{\rm m}h^2/\Omega_{\rm m}}$；平直时 $\eta_0-\eta_*=\int_{a_*}^1\frac{da}{a^2H}$。声视界只依赖 $\Omega_{\rm m}h^2$、$\Omega_{\rm b}h^2$，所以峰位 $\propto\eta_0-\eta_*$。`}
        solution={<>
          <Tx>{R`取基准 $\Omega_{\rm m}h^2=0.1424$（含 $0.06\,\mathrm{eV}$ 中微子），$r_s(\eta_*)=144.2\,\mathrm{Mpc}$，$z_*=1090$：`}</Tx>
          <Table head={["模型", "$h$", R`$\eta_0$ [Mpc]`, R`$\eta_0-\eta_*$ [Mpc]`, R`$\pi(\eta_0-\eta_*)/r_s$`, R`估计峰位 $l_{1,2,3}$`]} rows={[
            [R`(i) $\Omega_\Lambda=0$，$\Omega_{\rm m}=1$`, "0.377", "15 621", "15 340", "334", "243、597、895"],
            [R`(ii) $\Omega_\Lambda=0.7$，$\Omega_{\rm m}=0.3$`, "0.689", "14 114", "13 833", "301", "219、538、807"],
            ["基准（$h=0.677$）", "0.677", "14 161", "13 880", "302", "220、540、810"],
          ]} caption={R`$\eta_*\approx280\,\mathrm{Mpc}$ 在三种模型中相同（只依赖 $\Omega_{\rm m}h^2$）。峰位按本页近似模型的基准峰位（220、540、810）乘以距离比估计；谷位同理（基准约 420、670、1010）。`} />
          <Tx>{R`$\Omega_\Lambda=0$ 的模型需要 $h=0.38$，到最后散射面的距离长 11%，所有峰移向大 $l$ 约 11%。原题让与 \figref{9.17} 比较；比较对象更自然的是 \figref{9.15}——$\Lambda$ 与曲率一样，只是通过距离整体平移峰位。`}</Tx>
        </>}>
        {R`若宇宙是含宇宙学常数的平直宇宙，确定 CMB 各向异性谱中峰与谷的位置。计算中通过把 $\Omega_{\rm m}h^2$ 固定为基准宇宙学的值来保持声视界不变，于是峰位只依赖于到最后散射面的距离 $\eta_0-\eta_*$。考虑两个平直模型：(i) $\Omega_\Lambda=0$（于是 $\Omega_{\rm m}=1$）与 (ii) $\Omega_\Lambda=0.7$（于是 $\Omega_{\rm m}=0.3$）。两种情形各需要多大的 $h$ 才能保持 $\Omega_{\rm m}h^2$ 不变？求每种情形的 $\eta_0-\eta_*$（宇宙学常数情形需数值积分）。把结果与 \figref{9.17} 比较。`}
      </Exercise>

      <Exercise n="9.13" title={R`$w=-0.5$ 暗能量的峰位`} level="★★"
        solution={R`平直、$\Omega_{\rm de}=0.7$、$w=-0.5$、仍取 $\Omega_{\rm m}h^2=0.1424$（$h=0.689$）：$H^2=H_0^2[\Omega_{\rm m}a^{-3}+\Omega_{\rm r}a^{-4}+\Omega_{\rm de}a^{-3(1+w)}]$，数值积分得 $\eta_0-\eta_*=12\,792\,\mathrm{Mpc}$，比 $\Lambda$ 模型（13 833 Mpc）短 7.5%。$w>-1$ 的暗能量在过去更重要，使膨胀在晚期更快、距离更短。峰位相应地移向小 $l$：约 203、499、749（$\Lambda$ 模型 219、538、807）。这说明 CMB 峰位对 $w$ 有响应，但它只测量一个距离，因此与 $\Omega_{\rm m}$、$h$ 简并（"几何简并"），需要 BAO、超新星等低红移距离来打破。`}>
        {R`计算一个平直模型中到最后散射面的距离，其中暗能量由 $\Omega_{\rm de}=0.7$（今天）与 $w=-0.5$ 描述。把各向异性谱中的预期峰位与上一题的宇宙学常数模型比较。`}
      </Exercise>

      <Exercise n="9.14" title="用 Boltzmann 方程推导再电离的压低" level="★★"
        solution={R`忽略势、速度与 $\Theta_0$ 后，\eqref{5.67} 化为 $\Theta'+ik\mu\Theta=\tau'\Theta$，即 \eqref{9.45} 取 $\hat S=0$。由 \eqref{9.47}，$\frac{d}{d\eta}[\Theta e^{ik\mu\eta-\tau}]=0$，所以
$$\Theta(k,\mu,\eta_0)=\Theta(k,\mu,\eta_{\rm in})\,e^{ik\mu(\eta_{\rm in}-\eta_0)}\,e^{-[\tau(\eta_{\rm in})-\tau(\eta_0)]}=e^{-\tau_{\rm rei}}\,\Theta_{\rm free}(k,\mu,\eta_0),$$
其中 $\Theta_{\rm free}$ 是没有散射时自由流到今天的解，$\tau(\eta_{\rm in})=\tau_{\rm rei}$。取 Legendre 矩，每个 $\Theta_l(\eta_0)$ 都被乘以 $e^{-\tau_{\rm rei}}$，$C(l)$ 乘以 $e^{-2\tau_{\rm rei}}$。被忽略的 $-\tau'\Theta_0$ 项正是"散射进视线的光子"：它把散射掉的光子以局域单极的形式补回来——对再电离时仍在视界外的模式（$l\lesssim\eta_0/\eta_{\rm rei}$），局域单极就包含了扰动本身，于是压低被抵消；这就是 \eqref{9.82} 只适用于小尺度的原因。`}>
        {R`用 Boltzmann 方程推导再电离的效应。在光子的 Boltzmann 方程中忽略引力势、速度和 $\Theta_0$。从复合之后某一初始时刻 $\eta_{\rm in}$ 的谱 $\Theta_l(\eta_{\rm in})$ 出发，演化到今天。证明各阶矩确实被压低了 $e^{-\tau_{\rm rei}}$ 倍。`}
      </Exercise>

      <Exercise n="9.15" title="张量模的温度矩" level="★★"
        hint={R`张量情形的 Boltzmann 方程 \eqref{6.86}：复合后忽略散射，$\Theta^{\rm T}{}'+ik\mu\Theta^{\rm T}=-\frac12(h_t^{\rm TT})'$（角度因子 $\sin^2\theta\cos2\phi$ 等已提出）。`}
        solution={R`瞬时复合意味着 $\eta<\eta_*$ 时 $\tau=\infty$、之后 $\tau=0$，所以视线积分 \eqref{9.49} 的下限变为 $\eta_*$、且 $e^{-\tau}=1$：$\Theta^{\rm T}(k,\mu,\eta_0)=-\frac12\int_{\eta_*}^{\eta_0}d\eta\,(h^{\rm TT}_t)'e^{ik\mu(\eta-\eta_0)}$（复合时引力波在视界外几乎未演化，复合前产生的张量各向异性被散射抹去）。源不含 $\mu$，直接用 \eqref{9.50}：$\Theta^{\rm T}_{l,t}=(-1)^l\cdot(-\frac12)\int(h^{\rm TT}_t)'j_l[k(\eta-\eta_0)]\,d\eta$，再用 $j_l(-x)=(-1)^lj_l(x)$ 即得 \eqref{9.93}。物理意义：引力波进入视界后衰减振荡（$h\propto3j_1(k\eta)/k\eta$，物质期），光子沿途穿过随时间变化的度规而获得各向异性——张量版的 ISW 效应。`}>
        <Tx>{R`假设复合是瞬时发生的。证明张量扰动（\eqref{6.86}）产生的第 $l$ 阶矩的解为`}</Tx>
        <Eq n="9.93" say={R`引力波的温度矩：光子从最后散射面到今天穿过随时间变化的张量度规，沿途累积的"张量 ISW"。`}>{R`\Theta^{\rm T}_{l,t}(k,\eta_0) = -\frac12\int_{\eta_*}^{\eta_0}d\eta\left(h^{\rm TT}_t\right)'j_l[k(\eta_0-\eta)],`}</Eq>
        <Tx>{R`对两种张量模偏振 $t=+,\times$ 都成立。`}</Tx>
      </Exercise>

      <Exercise n="9.16" title="张量的角功率谱" level="★★★" fromBook
        solution={R`把 \eqref{9.73} 推广到张量，得
$$C^{\rm T}(l)=\sum_{l'l''}(-i)^{l'+l''}(2l'+1)(2l''+1)\int\frac{d^3k}{(2\pi)^3}\Theta^{\rm T}_{l'}(k)\Theta^{\rm T*}_{l''}(k)I_{lml'}(k)I^*_{lml''}(k)\tag{A.118}$$
其中
$$I_{lml'}(k)\equiv\sqrt{\frac{8\pi}{15}}\int d\Omega\,\mathcal P_{l'}(\hat{\boldsymbol k}\cdot\hat{\boldsymbol p})Y_{lm}(\hat{\boldsymbol p})[Y_{22}(\hat{\boldsymbol p})+Y_{2-2}(\hat{\boldsymbol p})].\tag{A.119}$$
因子 $(8\pi/15)^{1/2}[Y_{22}+Y_{2-2}]$ 就是 \eqref{6.85} 中出现的组合 $\sin^2\theta\cos(2\phi)$，所以此式只对 $+$ 模成立，但 $\times$ 模给出完全相同的结果。

积分 $I_{lml'}$ 并不平凡。把 Legendre 多项式改写为 $[4\pi/(2l'+1)]^{1/2}Y_{l'0}/i^{l'}$，$I_{lml'}$ 就变成三个球谐函数乘积的积分。这类积分在量子力学中有深入研究，可以用 Wigner 3j 符号表示（见 Landau 等 1965）：
$$I_{lml'}=\sqrt{\frac{32\pi^2}{15(2l'+1)}}\frac{1}{i^{l'}}\langle lm|Y_{22}+Y_{2-2}|l'0\rangle\tag{A.120}$$
除非 $m=2$ 或 $m=-2$，它为零。当 $m$ 取这两个值之一时，矩阵元为
$$\langle l2|Y_{22}+Y_{2-2}|l'0\rangle=i^{l'-l}\begin{pmatrix}l&2&l'\\0&0&0\end{pmatrix}\left[\frac{5(2l'+1)(2l+1)}{4\pi}\right]^{1/2}\begin{pmatrix}l&2&l'\\-2&2&0\end{pmatrix}.\tag{A.121}$$
第一个 3j 符号（下行全为零的那个）除非上行元素之和 $l+l'+2$ 为偶数否则为零；当然 $l'$ 与 $l$ 之差不能超过 2，因为 $Y_{22}Y_{l'0}$ 的组合给出从 $l'-2$ 到 $l'+2$ 的角动量。所以只有 $l'=l-2,\,l,\,l+2$ 时矩阵元非零。利用 Landau 等（1965）第 106 节的表 9 得到最终结果：
$$I_{lml'}=\sqrt{\frac{8\pi}{3}}(2l+1)i^{-l}(\delta_{m,2}+\delta_{m,-2})[c_{-2}\delta_{l',l-2}+c_0\delta_{l',l}+c_2\delta_{l',l+2}]\tag{A.122}$$
其中 $\delta_{m,2}$ 等是 Kronecker δ。系数为
$$c_{-2}=\frac{\sqrt6}{4}\frac{[(l-1)l(l+1)(l+2)]^{1/2}}{(2l-3)(2l-1)(2l+1)},\quad c_0=-2\frac{\sqrt6}{4}\frac{[(l-1)l(l+1)(l+2)]^{1/2}}{(2l-1)(2l+1)(2l+3)},\quad c_2=\frac{\sqrt6}{4}\frac{[(l-1)l(l+1)(l+2)]^{1/2}}{(2l+1)(2l+3)(2l+5)}.\tag{A.123}$$
于是得到 \eqref{9.94}。（原书 \eqref{9.94} 中三项的分母与 $c_{\pm2},c_0$ 的分母在形式上不同，是因为 $\Theta^{\rm T}_{l\pm2}$ 的系数还要乘以 $(2l'+1)$，例如 $(2l-3)$ 与 $c_{-2}$ 的分母约去。）`}>
        <Tx>{R`利用 \eqref{6.85} 给出的张量模分解，求 $\Theta^{\rm T}_l(k,\eta_0)$ 对 $C(l)$ 的贡献。即证明 \eqref{9.74} 在张量情形的对应式为`}</Tx>
        <Eq n="9.94" say={R`张量的 $C(l)$：$\sin^2\theta\cos2\phi$ 的角向结构把第 $l$ 阶球谐与 $l-2$、$l$、$l+2$ 阶温度矩耦合起来，前因子 $(l-1)l(l+1)(l+2)$ 来自自旋 2。`}>{R`C^{\rm T}(l;t) = \frac{(l-1)l(l+1)(l+2)}{\pi}\int_0^\infty dk\,k^2\times\left|\frac{\Theta^{\rm T}_{l-2,t}}{(2l-1)(2l+1)} + 2\frac{\Theta^{\rm T}_{l,t}}{(2l-1)(2l+3)} + \frac{\Theta^{\rm T}_{l+2,t}}{(2l+1)(2l+3)}\right|^2,`}</Eq>
        <Tx>{R`其中 $t=+,\times$ 表示两种张量模偏振。`}</Tx>
      </Exercise>

      <Exercise n="9.17" title="原初引力波的温度谱" level="★★★" fromBook
        solution={R`(a) 在大尺度上可以取 $h_t$ 的物质期解，于是
$$\Theta^{\rm T}_{l,t}(k,\eta_0)=-\frac12\int_{\eta_*}^{\eta_0}d\eta\,j_l[k(\eta_0-\eta)]\frac{d}{d\eta}\left[\frac{3j_1(k\eta)}{k\eta}\right]h_t(k,0).\tag{A.124}$$
代入 \eqref{9.94}，并用 $P_h(k)=P_{\rm T}(k)/4$ 作为视界外张量模（即 $\eta=0$ 时）的功率谱的定义，得
$$C^{\rm T}(l)=\frac12\,\frac{9(l-1)l(l+1)(l+2)}{4\pi}\int_0^\infty dk\,k^2P_{\rm T}(k)\left\{\int_0^{\eta_0}d(k\eta)\frac{j_2(k\eta)}{k\eta}\left[\frac{j_{l-2}(k[\eta_0-\eta])}{(2l-1)(2l+1)}+2\frac{j_l(k[\eta_0-\eta])}{(2l-1)(2l+3)}+\frac{j_{l+2}(k[\eta_0-\eta])}{(2l+1)(2l+3)}\right]\right\}^2,\tag{A.125}$$
这里因 $\eta_*\ll\eta_0$ 把时间积分下限设为零，并用了恒等式 $(j_1/x)'=-j_2/x$。前面的 $1/2$ 来自对 $+$、$\times$ 分量求和并换算到 $P_{\rm T}$。对 $P_{\rm T}$ 用 \eqref{7.102}（取 $n_{\rm T}=0$），定义新积分变量 $y\equiv k\eta_0$、$x\equiv k\eta$，得到
$$C^{\rm T}(l)=\frac{9\pi}{2}(l-1)l(l+1)(l+2)\mathcal A_{\rm T}\int_0^\infty\frac{dy}{y}\left\{\int_0^ydx\frac{j_2(x)}{x}\left[\frac{j_{l-2}(y-x)}{(2l-1)(2l+1)}+2\frac{j_l(y-x)}{(2l-1)(2l+3)}+\frac{j_{l+2}(y-x)}{(2l+1)(2l+3)}\right]\right\}^2.\tag{A.126}$$
(b) 对 $l=2$，(A.126) 中的二重积分等于 $2.14\times10^{-4}$，所以 $C^{\rm T}(l=2)=0.036\mathcal A_{\rm T}$。在 Sachs–Wolfe 极限下标量 $C(l=2)=4\mathcal A_s/75$。由此
$$r_2\equiv\frac{C^{\rm T}(l=2)}{C(l=2)}=0.68\frac{\mathcal A_{\rm T}}{\mathcal A_s}=0.68r.\tag{A.127}$$

**编者核对。**本页数值计算二重积分得 $2.139\times10^{-4}$，与原书一致。但 (A.125) 化到 (A.126) 时前因子应为 $\frac12\cdot\frac{9\cdot24}{4\pi}\cdot2\pi^2=54\pi=\frac{9\pi}{4}\cdot24$，即 (A.126) 的 $\frac{9\pi}{2}$ 应为 $\frac{9\pi}{4}$；$0.036\mathcal A_{\rm T}$ 是按正确前因子 $54\pi\times2.14\times10^{-4}=0.0363$ 得到的（若按印出的 $9\pi/2$ 则为 0.073）。另一方面，标量 $C(2)=4\mathcal A_s/75$ 来自 \eqref{9.80} 的 $8/25$；按更正后的 $l(l+1)C(l)=\frac{2\pi}{25}\mathcal A_s$，$C(2)=\frac{\pi}{75}\mathcal A_s=0.0419\mathcal A_s$，于是 $r_2\approx0.036/0.0419\,r\approx0.87\,r$。无论哪种，$r_2$ 与常规的 $r$（\secref{7.6}，在枢轴尺度上定义的原初功率之比）是同一量级但不相等：张量模在进入视界后衰减，对四极矩的贡献相对标量 SW 效应要打折扣。`}>
        <Tx>{R`确定暴胀期间产生的引力波造成的温度各向异性谱。

(a) 结合前两题的结果、你对 \exref{6.12} 的解答，以及 \eqref{7.102} 中引力波的原初振幅，求原初引力波造成的大角度角功率谱 $C^{\rm T}(l)$。

(b) 张量各向异性可以经验地用下式参数化：`}</Tx>
        <Eq n="9.95" say={R`四极矩上张量与标量贡献之比——一个经验的张量振幅指标。`}>{R`r_2 \equiv \frac{C^{\rm T}(l=2)}{C(l=2)},`}</Eq>
        <Tx>{R`即张量与标量扰动对温度四极矩的贡献之比。\eqref{9.80} 已经给出了标量 $C(l=2)$ 的表达式。求 $C^{\rm T}(l=2)$ 并计算 $r_2$。可以取 $n_{\rm T}=0$。与 \secref{7.6} 中张量–标量比 $r$ 的常规定义比较。`}</Tx>
      </Exercise>
    </Sec>);
}
