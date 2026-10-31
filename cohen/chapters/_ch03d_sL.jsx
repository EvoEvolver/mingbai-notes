// 补充材料 L_III：习题（题意要点用中文复述，附提示与完整解答）
import { Sec, Tx, Exercise, Box } from "@kit";

const R = String.raw;
const PP = R`\mathcal P`;
const DD = R`\sym{dirac}{\delta}`;
const RHO = R`\sym{rhoD}{\rho}`;      // 概率密度 ρ(r)
const ROP = R`\sym{rhoOp}{\rho}`;     // 密度算符
const UO = R`\sym{Upos}{U}`;          // 习题 7 的位置分量 U
const AO = R`\sym{Aobs}{A}`, BO = R`\sym{Bobs}{B}`;   // 习题 14 的可观测量
const LAM = R`\sym{lamV}{\lambda}`;   // 习题 10 的系数
const AL = R`\sym{ab}{\alpha}`, BE = R`\sym{ab2}{\beta}`;   // 习题 11 的区间端点
const EPS = R`\sym{epsL}{\varepsilon}`;   // 能量单位 π²ħ²/2ma²

export function SecL() {
  return (
    <Sec n="LIII" title="Exercises" zh="习题"
      gist={R`十九道题：概率分布与平均值（1–3、6、7、11）；Ehrenfest 定理与波包扩散、匀力场（4、5）；概率流与相位（8、9）；位力定理（10）；方阱中的测量与演化（12、13、16）；三能级系统（14）；相互作用绘景（15）；密度算符与部分迹（16e–19）。`}
      why={R`第 III 章的假设——测量的概率规则、波包坍缩、Schrödinger 方程、平均值的演化——只有在具体计算中才真正变成自己的东西。这组题几乎覆盖了每一条假设，最后几题还需要 $\mathrm E_{\rm III}$ 的密度算符。`}
      gives={[]}>
      <Tx>{R`题意为中文复述要点，数值与条件与原书一致；提示与解答为本页编写。习题 5、10、15 的参考文献见原书。`}</Tx>

      <Exercise n="LIII-1" title="一个 Lorentz 型波函数" level="★"
        hint={R`$|\psi|^2$ 与相位因子无关；$\int\mathrm dx/(x^2+a^2)=\pi/a$。求 $\langle P\rangle$ 时把 $\psi$ 写成"实振幅乘相位"，振幅的导数项贡献纯虚数积分。`}
        solution={<Tx>{R`**(a)** $|\psi|^2=N^2/(x^2+a^2)$，$\int_{-\infty}^{\infty}\frac{\mathrm dx}{x^2+a^2}=\frac\pi a$，故（取 $N$ 为正实数）$N=\sqrt{a/\pi}$。

**(b)** $${PP}=\frac a\pi\int_{-a/\sqrt3}^{a/\sqrt3}\frac{\mathrm dx}{x^2+a^2}=\frac2\pi\arctan\frac1{\sqrt3}=\frac2\pi\cdot\frac\pi6=\frac13$。

**(c)** 记 $\psi=f(x)\mathrm e^{ip_0x/\hbar}$，$f=N/\sqrt{x^2+a^2}$ 为实函数。$-i\hbar\psi'=[p_0f-i\hbar f']\mathrm e^{ip_0x/\hbar}$，所以
$$\langle P\rangle=\int\psi^*(-i\hbar\psi')\,\mathrm dx=p_0\int f^2\,\mathrm dx-i\hbar\int ff'\,\mathrm dx=p_0-\frac{i\hbar}2\big[f^2\big]_{-\infty}^{+\infty}=p_0 .$$
相位因子 $\mathrm e^{ip_0x/\hbar}$ 决定平均动量，实振幅的形状不贡献平均动量。`}</Tx>}>
        <Tx>{R`一维粒子的波函数为 $\psi(x)=N\dfrac{\mathrm e^{ip_0x/\hbar}}{\sqrt{x^2+a^2}}$，$a$、$p_0$ 为实常数，$N$ 为归一化系数。(a) 定出 $N$。(b) 测量位置，结果落在 $-a/\sqrt3$ 与 $+a/\sqrt3$ 之间的概率是多少？(c) 求该态的平均动量。`}</Tx>
      </Exercise>

      <Exercise n="LIII-2" title="距离与速度超过阈值的概率" level="★"
        hint={R`"到原点的距离"是 $|X|$；速度 $v=p/m$，要用动量表象的波函数。`}
        solution={<Tx>{R`**(a)** 测得距离 $d>d_0$ 即 $|x|>d_0$：
$$${PP}(d_0)=\int_{-\infty}^{-d_0}|\psi(x,t)|^2\mathrm dx+\int_{d_0}^{+\infty}|\psi(x,t)|^2\mathrm dx=1-\int_{-d_0}^{d_0}|\psi(x,t)|^2\mathrm dx$$
（$\psi$ 已归一化）。$d_0\to0$ 时积分区间缩为一点，$${PP}\to1$；$d_0\to\infty$ 时 $${PP}\to0$。

**(b)** 速度 $v=p/m$，$v>v_0$ 即 $p>mv_0$。令 $\overline\psi(p,t)=(2\pi\hbar)^{-1/2}\int\mathrm e^{-ipx/\hbar}\psi(x,t)\,\mathrm dx$，则
$$${PP}(v>v_0)=\int_{mv_0}^{+\infty}|\overline\psi(p,t)|^2\,\mathrm dp .$$`}</Tx>}>
        <Tx>{R`一维中质量为 $m$ 的粒子，$t$ 时刻波函数为 $\psi(x,t)$。(a) $t$ 时刻测量粒子到原点的距离 $d$：用 $\psi$ 写出结果大于给定长度 $d_0$ 的概率 $${PP}(d_0)$，并求 $d_0\to0$、$d_0\to\infty$ 的极限。(b) 改为测量 $t$ 时刻的速度 $v$：写出结果大于 $v_0$ 的概率。`}</Tx>
      </Exercise>

      <Exercise n="LIII-3" title="指数型动量分布的自由波包" level="★★"
        hint={R`给出的 $\psi(x,0)$ 本身就是一个 Fourier 积分：动量 $\hbar k$ 的振幅正比于 $\mathrm e^{-|k|/k_0}$。$x$ 空间的形状由 $\int_{-\infty}^{\infty}\mathrm e^{-|k|/k_0}\mathrm e^{ikx}\mathrm dk=\frac{2k_0}{1+k_0^2x^2}$ 得到。`}
        solution={<Tx>{R`**(a)** 写成 $\psi(x,0)=(2\pi)^{-1/2}\int g(k)\mathrm e^{ikx}\mathrm dk$，$g(k)=\sqrt{2\pi}N\mathrm e^{-|k|/k_0}$。归一化 $\int|g|^2\mathrm dk=2\pi N^2k_0=1$，$N=1/\sqrt{2\pi k_0}$，于是 $k$ 的概率密度为 $\frac1{k_0}\mathrm e^{-2|k|/k_0}$。动量 $p=\hbar k$ 落在 $[-p_1,p_1]$ 内的概率
$$${PP}(p_1,0)=\int_{-p_1/\hbar}^{p_1/\hbar}\frac{\mathrm e^{-2|k|/k_0}}{k_0}\,\mathrm dk=1-\mathrm e^{-2p_1/\hbar k_0}.$$
图形：从 0 开始近似线性上升（斜率 $2/\hbar k_0$），在 $p_1\sim\hbar k_0$ 的尺度上饱和到 1。

**(b)** 自由粒子的每个动量分量只获得相位 $\mathrm e^{-i\hbar k^2t/2m}$，$|g(k,t)|=|g(k,0)|$，所以 $${PP}(p_1,t)=${PP}(p_1,0)$：自由粒子的动量是运动常数，动量分布不随时间变化。

**(c)** $\psi(x,0)=N\frac{2k_0}{1+k_0^2x^2}$——一个以原点为中心、半宽 $\sim1/k_0$ 的 Lorentz 型实波包。用 $u=k_0x$ 及 $\int\frac{u^2\mathrm du}{(1+u^2)^2}=\int\frac{\mathrm du}{(1+u^2)^2}=\frac\pi2$：$\langle X\rangle=0$，$\langle X^2\rangle=1/k_0^2$，$\Delta X=1/k_0$。动量：$\langle k\rangle=0$，$\langle k^2\rangle=\frac2{k_0}\int_0^\infty k^2\mathrm e^{-2k/k_0}\mathrm dk=\frac{k_0^2}2$，$\Delta P=\hbar k_0/\sqrt2$。所以
$$\Delta X\cdot\Delta P=\frac{\hbar}{\sqrt2}\approx0.71\,\hbar>\frac\hbar2 .$$
满足不确定关系，但不是最小不确定度波包（只有高斯波包取等号）。

**此后的演化**：$\langle P\rangle=0$，中心不动；$\psi(x,0)$ 是实函数，$\langle XP+PX\rangle_0=0$，所以按习题 4 的结果 $(\Delta X)^2=\frac{1}{k_0^2}+\frac{\hbar^2k_0^2}{2m^2}t^2$：波包对称地向两边扩散，形状逐渐变化，晚期宽度按 $\Delta P\,t/m$ 线性增长。`}</Tx>}>
        <Tx>{R`一维自由粒子在 $t=0$ 的波函数为 $\psi(x,0)=N\int_{-\infty}^{+\infty}\mathrm dk\,\mathrm e^{-|k|/k_0}\mathrm e^{ikx}$，$k_0$、$N$ 为常数。(a) $t=0$ 测动量，结果在 $-p_1$ 与 $+p_1$ 之间的概率 $${PP}(p_1,0)$ 是多少？画出它。(b) 若在 $t$ 时刻测量，$${PP}(p_1,t)$ 如何？解释。(c) $t=0$ 时波包是什么形状？算出此刻的 $\Delta X\cdot\Delta P$ 并下结论；定性描述此后的演化。`}</Tx>
      </Exercise>

      <Exercise n="LIII-4" title="自由波包的扩散（Ehrenfest 方法）" level="★★"
        hint={R`对任意可观测量 $A$：$\frac{\mathrm d}{\mathrm dt}\langle A\rangle=\frac1{i\hbar}\langle[A,H]\rangle$。需要 $[X,P^2]=2i\hbar P$。`}
        solution={<Tx>{R`**(a)** $H=P^2/2m$。$\frac{\mathrm d}{\mathrm dt}\langle X\rangle=\frac1{i\hbar}\langle[X,P^2]\rangle/2m=\langle P\rangle/m$，$\frac{\mathrm d}{\mathrm dt}\langle P\rangle=0$。所以 $\langle P\rangle$ 为常数，$\langle X\rangle=\langle X\rangle_0+\langle P\rangle t/m$ 是 $t$ 的线性函数。

**(b)** $[X^2,P^2]=X[X,P^2]+[X,P^2]X=2i\hbar(XP+PX)$，故
$$\frac{\mathrm d}{\mathrm dt}\langle X^2\rangle=\frac1m\langle XP+PX\rangle .$$
$[XP+PX,P^2]=[X,P^2]P+P[X,P^2]=4i\hbar P^2$，故
$$\frac{\mathrm d}{\mathrm dt}\langle XP+PX\rangle=\frac2m\langle P^2\rangle ,$$
而 $\langle P^2\rangle$ 为常数。逐次积分：$\langle XP+PX\rangle=\langle XP+PX\rangle_0+\frac{2\langle P^2\rangle}mt$，
$$\langle X^2\rangle=\langle X^2\rangle_0+\frac{\langle XP+PX\rangle_0}m\,t+\frac{\langle P^2\rangle}{m^2}\,t^2 .$$

**(c)** 减去 $\langle X\rangle^2=(\langle X\rangle_0+\langle P\rangle t/m)^2$，并注意 $(\Delta P)^2=\langle P^2\rangle-\langle P\rangle^2$ 不变：
$$(\Delta X)^2(t)=\frac{(\Delta P)^2}{m^2}t^2+\frac{\langle XP+PX\rangle_0-2\langle X\rangle_0\langle P\rangle}m\,t+(\Delta X)^2(0).$$
这是 $t$ 的二次函数，开口向上。把时间原点移到它的极小处，一次项消失，即得
$$(\Delta X)^2=\frac1{m^2}(\Delta P)_0^2\,t^2+(\Delta X)_0^2 ,$$
$(\Delta X)_0$ 是新原点（宽度最小的时刻）的宽度，$(\Delta P)_0=\Delta P$。

**解读**：$\Delta X(t)$ 是一条双曲线：$|t|$ 大时 $\Delta X\simeq\Delta P\,|t|/m$——速度弥散 $\Delta P/m$ 的一群经典粒子散开的宽度；$t=0$ 附近不低于 $(\Delta X)_0$。对 \Ic{GI} 的高斯波包，$(\Delta X)_0=a/2$、$\Delta P=\hbar/a$，代入即得 \Icref{GI-20}：$\Delta X=\frac a2\sqrt{1+\frac{4\hbar^2t^2}{m^2a^4}}$。这里的结论对**任意**形状的自由波包都成立。`}</Tx>}>
        <Tx>{R`考虑自由粒子。(a) 用 Ehrenfest 定理证明 $\langle X\rangle$ 是 $t$ 的线性函数，$\langle P\rangle$ 保持不变。(b) 写出 $\langle X^2\rangle$ 与 $\langle XP+PX\rangle$ 的运动方程并积分。(c) 证明适当选择时间原点后，方均根偏差满足 $(\Delta X)^2=\frac1{m^2}(\Delta P)_0^2t^2+(\Delta X)_0^2$，$(\Delta X)_0$、$(\Delta P)_0$ 为初始时刻的方均根偏差。波包宽度怎样随时间变化（对照 \Ic{GI-3}）？给出物理解释。`}</Tx>
      </Exercise>

      <Exercise n="LIII-5" title="恒力作用下的粒子" level="★★"
        hint={R`$V=-fX$，$[P,V(X)]=-i\hbar V'(X)$。动量表象中 $X=i\hbar\,\partial/\partial p$。`}
        solution={<Tx>{R`**(a)** $\frac{\mathrm d}{\mathrm dt}\langle X\rangle=\langle P\rangle/m$，$\frac{\mathrm d}{\mathrm dt}\langle P\rangle=-\langle V'(X)\rangle=f$。积分：$\langle P\rangle=\langle P\rangle_0+ft$，$\langle X\rangle=\langle X\rangle_0+\frac{\langle P\rangle_0}mt+\frac f{2m}t^2$——与经典匀加速运动完全一样。（力与位置无关，所以 $\langle F(X)\rangle=F(\langle X\rangle)$ 严格成立，Ehrenfest 定理给出的就是经典方程。）

**(b)** $\frac{\mathrm d}{\mathrm dt}\langle P^2\rangle=\frac1{i\hbar}\langle[P^2,-fX]\rangle=\frac{-f}{i\hbar}\langle-2i\hbar P\rangle=2f\langle P\rangle$，而 $\frac{\mathrm d}{\mathrm dt}\langle P\rangle^2=2\langle P\rangle f$。两者相减，$\frac{\mathrm d}{\mathrm dt}(\Delta P)^2=0$。

**(c)** 在 $\{|p\rangle\}$ 表象中，$\overline\psi(p,t)=\langle p|\psi(t)\rangle$ 满足
$$i\hbar\frac{\partial\overline\psi}{\partial t}=\frac{p^2}{2m}\overline\psi-i\hbar f\frac{\partial\overline\psi}{\partial p}.$$
乘以 $\overline\psi^*$ 加上共轭方程（$p^2/2m$ 项是实数乘 $|\overline\psi|^2$，相消）：
$$\frac{\partial}{\partial t}|\langle p|\psi(t)\rangle|^2=-f\,\frac{\partial}{\partial p}|\langle p|\psi(t)\rangle|^2 .$$
这是一阶波动方程，通解为 $|\langle p|\psi(t)\rangle|^2=|\langle p-ft|\psi(0)\rangle|^2$：动量分布**整体平移**，速率 $f$，形状不变——每个动量分量都像经典粒子那样被力均匀加速。(b) 中 $\Delta P$ 不变正是这一点的推论。`}</Tx>}>
        <Tx>{R`一维中势能 $V(X)=-fX$，$f$ 为正常数（例如重力场或均匀电场）。(a) 写出位置与动量平均值的 Ehrenfest 方程，积分并与经典运动比较。(b) 证明 $\Delta P$ 不随时间变化。(c) 写出 $\{|p\rangle\}$ 表象中的 Schrödinger 方程，由此导出 $\frac{\partial}{\partial t}|\langle p|\psi(t)\rangle|^2$ 与 $\frac{\partial}{\partial p}|\langle p|\psi(t)\rangle|^2$ 的关系；积分并给出物理解释。`}</Tx>
      </Exercise>

      <Exercise n="LIII-6" title="三维指数型波函数" level="★"
        hint={R`变量分离：$|\psi|^2$ 是三个一维因子之积。一维 Fourier 变换 $\int\mathrm e^{-ipx/\hbar}\mathrm e^{-|x|/2a}\mathrm dx=\frac{4a}{1+4a^2p^2/\hbar^2}$。`}
        solution={<Tx>{R`**(a)** $|\psi|^2=N^2\mathrm e^{-|x|/a}\mathrm e^{-|y|/b}\mathrm e^{-|z|/c}$，$\int\mathrm e^{-|x|/a}\mathrm dx=2a$，所以 $N^2\cdot8abc=1$，$N=1/\sqrt{8abc}$。

**(b)** $${PP}(0\le X\le a)=\frac1{2a}\int_0^a\mathrm e^{-x/a}\mathrm dx=\frac12(1-\mathrm e^{-1})\approx0.316$。

**(c)** $Y$、$Z$ 的分布独立：$${PP}=(1-\mathrm e^{-1})\cdot(1-\mathrm e^{-1})=(1-\mathrm e^{-1})^2\approx0.400$。

**(d)** $\overline\psi(\mathbf p)=(2\pi\hbar)^{-3/2}N\prod\frac{4a_i}{1+4a_i^2p_i^2/\hbar^2}$（$a_i=a,b,c$），于是
$$|\overline\psi(\mathbf p)|^2=\prod_i\frac{4a_i}{\pi\hbar}\,\frac1{(1+4a_i^2p_i^2/\hbar^2)^2}$$
（每个因子在 $p_i$ 上积分为 1，可作核对）。在 $p_x=p_y=0$、$p_z=\hbar/c$ 处，前两个括号为 1，第三个为 $1+4=5$：
$$\mathrm d${PP}=\frac{64\,abc}{25\,\pi^3\hbar^3}\,\mathrm dp_x\,\mathrm dp_y\,\mathrm dp_z .$$`}</Tx>}>
        <Tx>{R`三维波函数 $\psi(x,y,z)=N\exp\big[-\big(\frac{|x|}{2a}+\frac{|y|}{2b}+\frac{|z|}{2c}\big)\big]$，$a,b,c$ 为正长度。(a) 求归一化常数 $N$。(b) 测 $X$ 得 $0$ 与 $a$ 之间的概率。(c) 同时测 $Y$、$Z$，分别得 $-b$ 到 $+b$、$-c$ 到 $+c$ 之间的概率。(d) 测动量，结果落在以 $p_x=p_y=0$、$p_z=\hbar/c$ 为中心的体元 $\mathrm dp_x\mathrm dp_y\mathrm dp_z$ 内的概率。`}</Tx>
      </Exercise>

      <Exercise n="LIII-7" title="各种测量结果的概率" level="★"
        hint={R`可以同时测量的量必须对易；对易可观测量的联合分布用"混合表象"（部分坐标、部分动量）的波函数。`}
        solution={<Tx>{R`记 $\overline\psi(\mathbf p)=(2\pi\hbar)^{-3/2}\int\mathrm d^3r\,\mathrm e^{-i\mathbf p\cdot\mathbf r/\hbar}\psi(\mathbf r)$。

**(a)** $\int_{x_1}^{x_2}\mathrm dx\int\mathrm dy\int\mathrm dz\,|\psi(x,y,z)|^2$。

**(b)** $\int_{p_1}^{p_2}\mathrm dp_x\int\mathrm dp_y\int\mathrm dp_z\,|\overline\psi(\mathbf p)|^2$。

**(c)** $X$ 与 $P_z$ 对易，可以同时测量。只对 $z$ 做 Fourier 变换：$\chi(x,y,p_z)=(2\pi\hbar)^{-1/2}\int\mathrm dz\,\mathrm e^{-ip_zz/\hbar}\psi(x,y,z)$，则概率为 $\int_{x_1}^{x_2}\mathrm dx\int\mathrm dy\int_0^{\infty}\mathrm dp_z\,|\chi(x,y,p_z)|^2$。

**(d)** $\int_{p_1}^{p_2}\mathrm dp_x\int_{p_3}^{p_4}\mathrm dp_y\int_{p_5}^{p_6}\mathrm dp_z\,|\overline\psi(\mathbf p)|^2$。$p_3,p_5\to-\infty$、$p_4,p_6\to+\infty$ 时后两个积分遍及全轴，结果正是 (b)。

**(e)** $U=(X+Y+Z)/\sqrt3$ 是位置在单位矢量 $\mathbf n=(1,1,1)/\sqrt3$ 方向上的分量。转到正交坐标 $(u,v,w)$，$u=\mathbf n\cdot\mathbf r$（转动的 Jacobian 为 1）：概率为 $\int_{u_1}^{u_2}\mathrm du\int\mathrm dv\int\mathrm dw\,|\psi(\mathbf r(u,v,w))|^2$，即对满足 $u_1\le(x+y+z)/\sqrt3\le u_2$ 的区域积分 $|\psi|^2$。`}</Tx>}>
        <Tx>{R`$\psi(\mathbf r)$ 为归一化波函数。用 $\psi$ 写出下列概率：(a) 测 $X$ 得 $x_1$ 与 $x_2$ 之间；(b) 测 $P_x$ 得 $p_1$ 与 $p_2$ 之间；(c) 同时测 $X$、$P_z$，得 $x_1\le x\le x_2$ 且 $p_z\ge0$；(d) 同时测 $P_x,P_y,P_z$，得 $p_1\le p_x\le p_2$、$p_3\le p_y\le p_4$、$p_5\le p_z\le p_6$，并证明 $p_3,p_5\to-\infty$、$p_4,p_6\to+\infty$ 时它等于 (b) 的结果；(e) 测位置分量 $${UO}=\frac1{\sqrt3}(X+Y+Z)$，得 $u_1$ 与 $u_2$ 之间。`}</Tx>
        <Box kind="warning" title="勘误：(d) 中的不等号">{R`原书 (d) 的条件印作 "$p_3\ge p_y\le p_4$"、"$p_5\ge p_z\le p_6$"，前一个不等号方向印反，应为 $p_3\le p_y\le p_4$、$p_5\le p_z\le p_6$（与 $p_1\le p_x\le p_2$ 同型，也才与随后"$p_3,p_5\to-\infty$"的极限相容）。`}</Box>
      </Exercise>

      <Exercise n="LIII-8" title="概率流的积分：平均动量与平均角动量" level="★★"
        hint={R`$m\mathbf J=\frac12[\psi^*(-i\hbar\nabla\psi)+\text{c.c.}]$；厄米算符的平均值是实数。`}
        solution={<Tx>{R`**(a)** $\mathbf J=\frac{\hbar}{2mi}(\psi^*\nabla\psi-\psi\nabla\psi^*)$，所以
$$m\int\mathrm d^3r\,\mathbf J=\frac12\Big[\int\psi^*\Big(\frac\hbar i\nabla\Big)\psi\,\mathrm d^3r+\text{c.c.}\Big]=\operatorname{Re}\langle\mathbf P\rangle=\langle\mathbf P\rangle .$$

**(b)** $L_x=YP_z-ZP_y$。$Y$ 与 $P_z$ 对易，$(YP_z)^\dagger=P_zY=YP_z$；同理 $ZP_y$ 厄米。所以 $\mathbf L$ 的三个分量都是厄米算符。又 $\mathbf r\times(\psi^*\nabla\psi)=\psi^*(\mathbf r\times\nabla)\psi$，
$$m\int\mathrm d^3r\,[\mathbf r\times\mathbf J]=\frac12\Big[\int\psi^*\Big(\mathbf r\times\frac\hbar i\nabla\Big)\psi\,\mathrm d^3r+\text{c.c.}\Big]=\operatorname{Re}\langle\mathbf L\rangle=\langle\mathbf L\rangle .$$
可见概率流的"一阶矩"给出平均动量，"力矩"给出平均角动量——与经典流体的动量、角动量完全类比。`}</Tx>}>
        <Tx>{R`$\mathbf J(\mathbf r)$ 是质量为 $m$ 的粒子的波函数 $\psi(\mathbf r)$ 对应的概率流（正文 \mainref{D-17}、\mainref{D-19}）。(a) 证明 $m\int\mathrm d^3r\,\mathbf J(\mathbf r)=\langle\mathbf P\rangle$。(b) 轨道角动量 $\mathbf L=\mathbf R\times\mathbf P$ 的三个分量是厄米算符吗？证明 $m\int\mathrm d^3r\,[\mathbf r\times\mathbf J(\mathbf r)]=\langle\mathbf L\rangle$。`}</Tx>
      </Exercise>

      <Exercise n="LIII-9" title="由概率密度与概率流确定量子态" level="★★"
        hint={R`写 $\psi=\sqrt{${RHO}}\,\mathrm e^{i\xi}$ 代入流的定义；有磁场时流要用 $\mathbf P-q\mathbf A$（正文 \mainref{D-20}）。`}
        solution={<Tx>{R`**(a)** $\nabla\psi=(\nabla\sqrt{${RHO}}+i\sqrt{${RHO}}\nabla\xi)\mathrm e^{i\xi}$，$\psi^*\nabla\psi=\sqrt{${RHO}}\nabla\sqrt{${RHO}}+i${RHO}\nabla\xi$，减去共轭得 $2i${RHO}\nabla\xi$，所以 $\mathbf J=\frac\hbar m${RHO}\nabla\xi$。若两个波函数给出相同的 $${RHO}$ 与 $\mathbf J$，则在 $${RHO}\ne0$ 处 $\nabla\xi_1=\nabla\xi_2$，$\xi_1-\xi_2$ 为常数（在 $${RHO}\ne0$ 的连通区域上）：两者只差一个整体相位因子，代表同一物理态。

**(b)** $\mathbf v=\mathbf J/${RHO}=\frac\hbar m\nabla\xi$ 是梯度场，故 $\nabla\times\mathbf v=0$：任意给定的 $(${RHO},\mathbf J)$ 只有在流速无旋时才对应一个量子态。（$\xi$ 在 $\psi$ 的零点周围可以多值，形成量子化的涡旋；在 $${RHO}\ne0$ 的区域内上述结论成立。）

**(c)** 有矢势时 $\mathbf J=\frac1{2m}[\psi^*(-i\hbar\nabla-q\mathbf A)\psi+\text{c.c.}]$。代入 $\psi=\sqrt{${RHO}}\mathrm e^{i\xi}$：
$$\mathbf J=\frac{${RHO}(\mathbf r)}m\big[\hbar\nabla\xi(\mathbf r)-q\mathbf A(\mathbf r)\big],\qquad\mathbf v=\frac1m(\hbar\nabla\xi-q\mathbf A),$$
$$\nabla\times\mathbf v(\mathbf r)=-\frac qm\nabla\times\mathbf A=-\frac qm\mathbf B(\mathbf r).$$
有磁场时概率流体的速度场不再无旋，其涡度由磁场给出。`}</Tx>}>
        <Tx>{R`要证明：无自旋粒子的物理态完全由概率密度 $${RHO}(\mathbf r)=|\psi(\mathbf r)|^2$ 与概率流 $\mathbf J(\mathbf r)$ 确定。(a) 设 $\psi(\mathbf r)=\sqrt{${RHO}(\mathbf r)}\,\mathrm e^{i\xi(\mathbf r)}$，证明 $\mathbf J(\mathbf r)=\frac\hbar m${RHO}(\mathbf r)\nabla\xi(\mathbf r)$；由此说明给出相同 $${RHO}$、$\mathbf J$ 的两个波函数只能差一个整体相位因子。(b) 对任意给定的 $${RHO}$、$\mathbf J$，证明只有当 $\nabla\times\mathbf v=0$（$\mathbf v=\mathbf J/${RHO}$ 为"概率流体"的速度）时才能对应一个量子态。(c) 若粒子处在磁场 $\mathbf B=\nabla\times\mathbf A$ 中（正文 \mainref{D-20}），证明 $\mathbf J=\frac{${RHO}}m[\hbar\nabla\xi-q\mathbf A]$ 且 $\nabla\times\mathbf v=-\frac qm\mathbf B$。`}</Tx>
      </Exercise>

      <Exercise n="LIII-10" title="位力定理" level="★★"
        hint={R`在定态 $|\varphi\rangle$ 中，任何对易子 $[H,A]$ 的平均值都是零（展开 $\langle\varphi|HA-AH|\varphi\rangle$）。`}
        solution={<Tx>{R`**(a)** $[H,XP]=\big[\frac{P^2}{2m},X\big]P+X[V,P]=-\frac{i\hbar}mP^2+i\hbar XV'(X)$。定态中 $\langle[H,XP]\rangle=E\langle XP\rangle-\langle XP\rangle E=0$，所以 $\langle P^2/m\rangle=\langle XV'\rangle$，即 $2\langle T\rangle=\langle XV'(X)\rangle$。对 $V=${LAM}X^n$，$XV'=nV$：
$$2\langle T\rangle=n\langle V\rangle .$$

**(b)** 同理 $[H,\mathbf R\cdot\mathbf P]=-\frac{i\hbar}m\mathbf P^2+i\hbar\,\mathbf R\cdot\nabla V(\mathbf R)$；由 Euler 恒等式 $\mathbf R\cdot\nabla V=nV$，定态中仍有 $2\langle T\rangle=n\langle V\rangle$。氢原子 $V=-e^2/r$，$n=-1$：$2\langle T\rangle=-\langle V\rangle$，从而 $E=\langle T\rangle+\langle V\rangle=-\langle T\rangle=\frac12\langle V\rangle$（基态 $\langle T\rangle=13.6\,\mathrm{eV}$，$\langle V\rangle=-27.2\,\mathrm{eV}$）。

**(c)** 用 $\sum_i\mathbf R_i\cdot\mathbf P_i$ 代替 $\mathbf R\cdot\mathbf P$，同样的计算给出 $2\langle T\rangle=\langle\sum_i\mathbf R_i\cdot\nabla_iV\rangle=n\langle V\rangle$，$T$ 为总动能。分子中原子核（电荷 $-Z_iq$）与电子（电荷 $q$）两两以 Coulomb 力相互作用，相互作用能是全部坐标的 $-1$ 次齐次函数（把核也当作量子粒子处理），所以定态中
$$2\langle T\rangle=-\langle V\rangle,\qquad E=-\langle T\rangle=\tfrac12\langle V\rangle .$$`}</Tx>}>
        <Tx>{R`(a) 一维 Hamilton 量 $H=\frac{P^2}{2m}+V(X)$，$V(X)=${LAM}X^n$。计算 $[H,XP]$；若势中有一个或几个定态 $|\varphi\rangle$，证明其中动能与势能的平均值满足 $2\langle T\rangle=n\langle V\rangle$。(b) 三维 $H=\frac{\mathbf P^2}{2m}+V(\mathbf R)$：计算 $[H,\mathbf R\cdot\mathbf P]$。若 $V$ 是 $X,Y,Z$ 的 $n$ 次齐次函数（$V(\alpha x,\alpha y,\alpha z)=\alpha^nV$，满足 Euler 恒等式 $x\partial_xV+y\partial_yV+z\partial_zV=nV$），定态中平均动能与平均势能有何关系？用于氢原子 $V=-e^2/r$。(c) $N$ 个粒子（位置 $\mathbf R_i$、动量 $\mathbf P_i$），势能是全部分量的 $n$ 次齐次函数时能否推广？用于由电荷 $-Z_iq$ 的核与电荷 $q$ 的电子组成、两两以 Coulomb 力作用的任意分子：定态中动能与相互作用能有何关系？`}</Tx>
      </Exercise>

      <Exercise n="LIII-11" title="两粒子波函数" level="★"
        hint={R`$|\psi(x_1,x_2)|^2\mathrm dx_1\mathrm dx_2$ 是联合概率。不测的那个变量对全轴积分；涉及一个粒子的动量就对它的坐标做 Fourier 变换。`}
        solution={<Tx>{R`设 $\psi$ 已归一化，$I=[${AL},${BE}]$。

**(a)** $\mathrm dx\int_{${AL}}^{${BE}}|\psi(x,x_2)|^2\mathrm dx_2$。**(b)** $\mathrm dx\int_{-\infty}^{\infty}|\psi(x,x_2)|^2\mathrm dx_2$。

**(c)** 至少一个在 $I$ 内 $=1-$（两个都在 $I$ 外）$=1-\int_{x_1\notin I}\int_{x_2\notin I}|\psi|^2\mathrm dx_1\mathrm dx_2$。

**(d)** 恰好一个：$\int_{x_1\in I}\int_{x_2\notin I}|\psi|^2+\int_{x_1\notin I}\int_{x_2\in I}|\psi|^2$。

**(e)** 令 $\phi(p_1,x_2)=(2\pi\hbar)^{-1/2}\int\mathrm e^{-ip_1x_1/\hbar}\psi(x_1,x_2)\mathrm dx_1$，概率为 $\int_{p'}^{p''}\mathrm dp_1\int_{${AL}}^{${BE}}\mathrm dx_2\,|\phi(p_1,x_2)|^2$。

**(f)** 令 $\overline\psi(p_1,p_2)$ 为对两个变量的 Fourier 变换，概率为 $\int_{p'}^{p''}\mathrm dp_1\int_{p'''}^{p''''}\mathrm dp_2\,|\overline\psi(p_1,p_2)|^2$。

**(g)** 由 (e)（$x_2$ 遍及全轴）：$\int_{p'}^{p''}\mathrm dp_1\int\mathrm dx_2|\phi(p_1,x_2)|^2$；由 (f)（$p_2$ 遍及全轴）：$\int_{p'}^{p''}\mathrm dp_1\int\mathrm dp_2|\overline\psi(p_1,p_2)|^2$。$\overline\psi(p_1,\cdot)$ 正是 $\phi(p_1,\cdot)$ 对 $x_2$ 的 Fourier 变换，由 Parseval 等式两者相等——不测的粒子用哪种表象"积掉"都一样。

**(h)** $P(-d\le x_1-x_2\le d)=\iint_{|x_1-x_2|\le d}|\psi|^2\mathrm dx_1\mathrm dx_2=\int_{-d}^{d}\mathrm du\int\mathrm dx_2\,|\psi(x_2+u,x_2)|^2$；平均值 $\langle X_1-X_2\rangle=\iint(x_1-x_2)|\psi(x_1,x_2)|^2\mathrm dx_1\mathrm dx_2$。`}</Tx>}>
        <Tx>{R`一维中两个粒子 (1)、(2) 的波函数为 $\psi(x_1,x_2)$。求下列概率：(a) 测两粒子位置，得 $x\le x_1\le x+\mathrm dx$ 且 $${AL}\le x_2\le${BE}$；(b) 不管粒子 (2)，粒子 (1) 在 $x$ 与 $x+\mathrm dx$ 之间；(c) 至少有一个粒子在 $${AL}$ 与 $${BE}$ 之间；(d) 恰有一个粒子在其间；(e) 粒子 (1) 的动量在 $p'$ 与 $p''$ 之间且粒子 (2) 的位置在 $${AL}$ 与 $${BE}$ 之间；(f) 测两粒子动量，得 $p'\le p_1\le p''$、$p'''\le p_2\le p''''$；(g) 只测 $P_1$：分别由 (e) 与 (f) 的结果算出它落在 $p'$、$p''$ 之间的概率，并比较；(h) 测代数距离 $X_1-X_2$，结果在 $-d$ 与 $+d$ 之间的概率与平均值。`}</Tx>
      </Exercise>

      <Exercise n="LIII-12" title="一维无限深势阱中的测量" level="★"
        hint={R`以 $${EPS}\equiv\pi^2\hbar^2/2ma^2$ 为单位，$E_n=n^2${EPS}$。注意原题没有说 $|\psi(0)\rangle$ 已归一化。`}
        solution={<Tx>{R`记 $S=\sum_{n=1}^4|a_n|^2$（若已归一化则 $S=1$），$E_n=n^2${EPS}$，$${EPS}=\pi^2\hbar^2/2ma^2$。

**(a)** $3\pi^2\hbar^2/ma^2=6${EPS}$，低于它的只有 $E_1=${EPS}$、$E_2=4${EPS}$：概率 $(|a_1|^2+|a_2|^2)/S$。

**(b)** $\langle H\rangle=\frac{${EPS}}S(|a_1|^2+4|a_2|^2+9|a_3|^2+16|a_4|^2)$，$\langle H^2\rangle=\frac{${EPS}^2}S(|a_1|^2+16|a_2|^2+81|a_3|^2+256|a_4|^2)$，$\Delta H=\sqrt{\langle H^2\rangle-\langle H\rangle^2}$。

**(c)** $|\psi(t)\rangle=\sum_na_n\mathrm e^{-iE_nt/\hbar}|\varphi_n\rangle$。每个系数只多了相位，模不变，所以 (a)、(b) 的结果对任何 $t$ 都成立——$H$ 是运动常数。

**(d)** $8\pi^2\hbar^2/ma^2=16${EPS}=E_4$：测量后系统处于 $|\varphi_4\rangle$（差一个相位）。再测能量必得 $E_4$；之后它作为定态一直不变，什么时候再测都还是 $E_4$。`}</Tx>}>
        <Tx>{R`质量 $m$ 的粒子在 $0\le x\le a$ 内 $V=0$、其余处 $V=+\infty$ 的势阱中。$H$ 的本征态 $|\varphi_n\rangle$ 对应 $E_n=\frac{n^2\pi^2\hbar^2}{2ma^2}$（\Ic{HI}）。$t=0$ 时 $|\psi(0)\rangle=a_1|\varphi_1\rangle+a_2|\varphi_2\rangle+a_3|\varphi_3\rangle+a_4|\varphi_4\rangle$。(a) 测能量得到小于 $\frac{3\pi^2\hbar^2}{ma^2}$ 的值的概率？(b) 该态能量的平均值与方均根偏差？(c) 求 $t$ 时刻的 $|\psi(t)\rangle$；(a)、(b) 的结果在任意 $t$ 时还成立吗？(d) 测得能量 $\frac{8\pi^2\hbar^2}{ma^2}$ 后系统处于什么态？再测能量结果如何？`}</Tx>
      </Exercise>

      <Exercise n="LIII-13" title="二维无限深势阱（参见 $\mathrm G_{\rm II}$）" level="★★"
        hint={R`用积化和差：$\cos\frac{\pi x}a\sin\frac{2\pi x}a=\frac12\big[\sin\frac{\pi x}a+\sin\frac{3\pi x}a\big]$，把 $\psi$ 展开成 $\varphi_n(x)\varphi_p(y)$ 的组合。`}
        solution={<Tx>{R`记 $\varphi_n(x)=\sqrt{2/a}\sin(n\pi x/a)$，$${EPS}=\pi^2\hbar^2/2ma^2$，$H_x$、$H_y$ 的本征值为 $n^2${EPS}$、$p^2${EPS}$。

**(a)** $\{H\}$：$E_{np}=(n^2+p^2)${EPS}$ 有简并（如 $(1,2)$、$(2,1)$），不是 C.S.C.O.。$\{H_x\}$：每个本征值对 $y$ 方向无穷简并，不是。$\{H_x,H_y\}$：一对本征值 $(n,p)$ 唯一确定 $\varphi_n(x)\varphi_p(y)$，是。$\{H,H_x\}$：$H_y=H-H_x$ 被确定，等价于上一组，是。

**(b)** 积化和差后 $\psi=\frac N4[\sin\frac{\pi x}a+\sin\frac{3\pi x}a][\sin\frac{\pi y}a+\sin\frac{3\pi y}a]$；归一化给出 $N=4/a$ 与
$$\psi=\tfrac12\big[\varphi_1(x)+\varphi_3(x)\big]\big[\varphi_1(y)+\varphi_3(y)\big].$$
**$\alpha$.** 四个态 $(n,p)\in\{1,3\}^2$ 各占 $1/4$：$E=2${EPS}$（概率 $1/4$）、$10${EPS}$（$(1,3)$ 与 $(3,1)$，概率 $1/2$）、$18${EPS}$（概率 $1/4$）。$\langle H\rangle=10${EPS}=\frac{5\pi^2\hbar^2}{ma^2}$。
**$\beta$.** 测 $H_x$：得 $${EPS}=\frac{\pi^2\hbar^2}{2ma^2}$ 或 $9${EPS}$，概率各 $1/2$。若得 $${EPS}$，态坍缩为 $\varphi_1(x)\frac{\varphi_1(y)+\varphi_3(y)}{\sqrt2}$，再测 $H_y$ 得 $${EPS}$ 或 $9${EPS}$，概率各 $1/2$。
**$\gamma$.** $H_x$ 与 $P_y$ 对易。得 $E_x=9${EPS}$ 的概率 $1/2$，$y$ 方向的态是 $\chi=(\varphi_1+\varphi_3)/\sqrt2$。其 Fourier 变换（$q=p_y/\hbar$）：$\int_0^a\mathrm e^{-iqy}\sin\frac{n\pi y}a\mathrm dy=\frac{(n\pi/a)(1+\mathrm e^{-iqa})}{(n\pi/a)^2-q^2}$（$n$ 为奇数）。于是
$$${PP}=\frac{1}{\pi\hbar a}\cos^2\frac{p_0a}{2\hbar}\Big[\frac{\pi/a}{(\pi/a)^2-q_0^2}+\frac{3\pi/a}{(3\pi/a)^2-q_0^2}\Big]^2\mathrm dp,\qquad q_0=\frac{p_0}\hbar .$$
（$q_0\to\pi/a$ 等处的表观奇点被 $\cos^2$ 的零点抵消；对 $p_0$ 积分并乘 2 可验证总概率为 1。）`}</Tx>}>
        <Tx>{R`二维中质量 $m$ 的粒子，$H=H_x+H_y$，$H_x=\frac{P_x^2}{2m}+V(X)$，$H_y=\frac{P_y^2}{2m}+V(Y)$；$V(x)$［或 $V(y)$］在 $[0,a]$ 内为零，其余处无穷大。(a) $\{H\}$、$\{H_x\}$、$\{H_x,H_y\}$、$\{H,H_x\}$ 中哪些是 C.S.C.O.？(b) 波函数在 $0\le x,y\le a$ 内为 $\psi=N\cos\frac{\pi x}a\cos\frac{\pi y}a\sin\frac{2\pi x}a\sin\frac{2\pi y}a$，其余处为零。$\alpha$. 能量平均值 $\langle H\rangle$？测能量的可能结果与概率？$\beta$. 测 $H_x$ 的可能结果与概率？若得 $\frac{\pi^2\hbar^2}{2ma^2}$，随后测 $H_y$ 的结果与概率？$\gamma$. 改为同时测 $H_x$ 与 $P_y$：得 $E_x=\frac{9\pi^2\hbar^2}{2ma^2}$ 且 $p_0\le p_y\le p_0+\mathrm dp$ 的概率？`}</Tx>
      </Exercise>

      <Exercise n="LIII-14" title="三能级系统中的两个可观测量" level="★★"
        hint={R`先求 $${AO}$、$${BO}$ 的本征矢。$${AO}$ 与 $H$ 对易吗？$${BO}$ 呢？`}
        solution={<Tx>{R`$|\psi(0)\rangle=\frac1{\sqrt2}|u_1\rangle+\frac12|u_2\rangle+\frac12|u_3\rangle$（已归一化）。

**(a)** 能量 $\hbar\omega_0$ 的概率 $1/2$；$2\hbar\omega_0$（二重简并）的概率 $\frac14+\frac14=\frac12$。$\langle H\rangle=\frac32\hbar\omega_0$，$\langle H^2\rangle=\frac52\hbar^2\omega_0^2$，$\Delta H=\frac12\hbar\omega_0$。

**(b)** $${AO}$ 的本征值 $a$：本征矢 $|u_1\rangle$ 与 $(|u_2\rangle+|u_3\rangle)/\sqrt2$；本征值 $-a$：$(|u_2\rangle-|u_3\rangle)/\sqrt2$。$|\psi(0)\rangle=\frac1{\sqrt2}|u_1\rangle+\frac1{\sqrt2}\frac{|u_2\rangle+|u_3\rangle}{\sqrt2}$ 完全在本征值 $a$ 的子空间中：必得 $a$（概率 1），测量后态不变，仍为 $|\psi(0)\rangle$。

**(c)** $|\psi(t)\rangle=\frac1{\sqrt2}\mathrm e^{-i\omega_0t}|u_1\rangle+\frac12\mathrm e^{-2i\omega_0t}\big(|u_2\rangle+|u_3\rangle\big)$。

**(d)** $${AO}$ 只在 $H$ 的简并子空间 $\{|u_2\rangle,|u_3\rangle\}$ 内混合，$[H,${AO}]=0$；态始终在 $${AO}=a$ 的子空间里，$\langle ${AO}\rangle(t)=a$。$${BO}$ 混合能量不同的 $|u_1\rangle$、$|u_2\rangle$（$c_i(t)$ 为 $|\psi(t)\rangle$ 在 $|u_i\rangle$ 上的系数）：
$$\langle ${BO}\rangle(t)=b\Big[2\operatorname{Re}(c_1^*c_2)+|c_3|^2\Big]=b\Big[\frac{\sqrt2}2\cos\omega_0t+\frac14\Big].$$
评注：与 $H$ 对易的可观测量是运动常数，平均值不变；不对易的，平均值以 Bohr 频率 $(E_2-E_1)/\hbar=\omega_0$ 振荡。

**(e)** 测 $${AO}$：$t$ 时刻仍必得 $a$。测 $${BO}$：本征值 $+b$ 对应 $(|u_1\rangle+|u_2\rangle)/\sqrt2$ 与 $|u_3\rangle$，$-b$ 对应 $(|u_1\rangle-|u_2\rangle)/\sqrt2$。
$${PP}(-b)=\tfrac12|c_1-c_2|^2=\frac38-\frac{\sqrt2}4\cos\omega_0t$，$${PP}(+b)=\frac58+\frac{\sqrt2}4\cos\omega_0t$（与 (d) 一致：$b[${PP}(+b)-${PP}(-b)]=\langle ${BO}\rangle$）。解释：$${AO}$ 的测量结果的概率分布不随时间变化（运动常数），$${BO}$ 的则以频率 $\omega_0$ 振荡。`}</Tx>}>
        <Tx>{R`三维态空间，正交归一基 $|u_1\rangle,|u_2\rangle,|u_3\rangle$。在此基中
$$H=\hbar\omega_0\begin{pmatrix}1&0&0\\0&2&0\\0&0&2\end{pmatrix},\quad ${AO}=a\begin{pmatrix}1&0&0\\0&0&1\\0&1&0\end{pmatrix},\quad ${BO}=b\begin{pmatrix}0&1&0\\1&0&0\\0&0&1\end{pmatrix},$$
$\omega_0$、$a$、$b$ 为正实常数。$t=0$ 时 $|\psi(0)\rangle=\frac1{\sqrt2}|u_1\rangle+\frac12|u_2\rangle+\frac12|u_3\rangle$。(a) $t=0$ 测能量：可能值与概率？求 $\langle H\rangle$ 与 $\Delta H$。(b) 改测 $${AO}$：可能结果、概率、测量后的态？(c) 求 $|\psi(t)\rangle$。(d) 求 $\langle ${AO}\rangle(t)$、$\langle ${BO}\rangle(t)$，有何评注？(e) $t$ 时刻测 $${AO}$ 的结果？测 $${BO}$ 呢？解释。`}</Tx>
      </Exercise>

      <Exercise n="LIII-15" title="相互作用绘景" level="★★★"
        hint={R`对 $U_0^\dagger$ 求导：由 $i\hbar\partial_tU_0=H_0U_0$ 取伴随得 $-i\hbar\partial_tU_0^\dagger=U_0^\dagger H_0$。（宜先读 $\mathrm F_{\rm III}$，可能的话也读 $\mathrm G_{\rm III}$。）`}
        solution={<Tx>{R`**(a)** $i\hbar\frac{\mathrm d}{\mathrm dt}|\psi_I\rangle=\big(i\hbar\partial_tU_0^\dagger\big)|\psi_S\rangle+U_0^\dagger\,i\hbar\frac{\mathrm d}{\mathrm dt}|\psi_S\rangle=-U_0^\dagger H_0|\psi_S\rangle+U_0^\dagger(H_0+W)|\psi_S\rangle=U_0^\dagger W|\psi_S\rangle$。再用 $|\psi_S\rangle=U_0|\psi_I\rangle$：
$$i\hbar\frac{\mathrm d}{\mathrm dt}|\psi_I(t)\rangle=W_I(t)|\psi_I(t)\rangle,\qquad W_I=U_0^\dagger WU_0 .$$
定性解释：$|\psi_S\rangle$ 的运动里，由 $H_0$ 引起的快速"转动"（相位以 $E/\hbar$ 的频率变化）已被 $U_0^\dagger$ 抵掉，$|\psi_I\rangle$ 只受 $W_I$ 驱动；$W\ll H_0$ 时它的变化率小得多，$W=0$ 时 $|\psi_I\rangle$ 根本不动。

**(b)** 从 $t_0$ 到 $t$ 积分 (a) 的方程即得积分方程；反过来对积分方程求导又回到微分方程，且自动满足初始条件，所以两者等价。初始条件：$U_0(t_0,t_0)=\mathbb 1$，故 $|\psi_I(t_0)\rangle=|\psi_S(t_0)\rangle$。

**(c)** 把积分方程右边的 $|\psi_I(t')\rangle$ 用整个右边代入，反复迭代：
$$|\psi_I(t)\rangle=\Big\{\mathbb 1+\frac1{i\hbar}\int_{t_0}^t\mathrm dt'W_I(t')+\frac1{(i\hbar)^2}\int_{t_0}^t\mathrm dt'W_I(t')\int_{t_0}^{t'}\mathrm dt''W_I(t'')+\dots\Big\}|\psi_I(t_0)\rangle ,$$
第 $n$ 项含 $n$ 个 $W_I$，时间按 $t\ge t'\ge t''\ge\dots$ 排序——这就是 $W$ 的幂级数（Dyson 级数），第 XIII 章含时微扰论的出发点。`}</Tx>}>
        <Tx>{R`任意系统的 Hamilton 量为 $H_0(t)$，演化算符 $U_0(t,t')$ 满足 $i\hbar\frac{\partial}{\partial t}U_0(t,t_0)=H_0(t)U_0(t,t_0)$、$U_0(t_0,t_0)=\mathbb 1$。加上微扰后 $H(t)=H_0(t)+W(t)$。"相互作用绘景"中的态矢量定义为 $|\psi_I(t)\rangle=U_0^\dagger(t,t_0)|\psi_S(t)\rangle$（$|\psi_S\rangle$ 为 Schrödinger 绘景中的态）。(a) 证明 $i\hbar\frac{\mathrm d}{\mathrm dt}|\psi_I(t)\rangle=W_I(t)|\psi_I(t)\rangle$，$W_I(t)=U_0^\dagger(t,t_0)W(t)U_0(t,t_0)$；定性解释为什么 $W\ll H_0$ 时 $|\psi_I\rangle$ 的运动比 $|\psi_S\rangle$ 慢得多。(b) 证明上述微分方程等价于积分方程 $|\psi_I(t)\rangle=|\psi_I(t_0)\rangle+\frac1{i\hbar}\int_{t_0}^t\mathrm dt'\,W_I(t')|\psi_I(t')\rangle$，其中 $|\psi_I(t_0)\rangle=|\psi_S(t_0)\rangle$。(c) 迭代求解，证明 $|\psi_I(t)\rangle$ 可以展开为 $W$ 的幂级数（写出到二阶）。`}</Tx>
        <Box kind="warning" title="勘误：(b) 的初始条件">{R`原书 (b) 写作 "where $|\psi_I(t_0)\rangle=|\psi_S(t)\rangle$"，右边应为 $|\psi_S(t_0)\rangle$：由定义及 $U_0(t_0,t_0)=\mathbb 1$，两个绘景只在初始时刻 $t_0$ 重合。`}</Box>
      </Exercise>

      <Exercise n="LIII-16" title="两粒子之间的关联" level="★★"
        hint={R`能量单位 $${EPS}=\pi^2\hbar^2/2ma^2$，$|\varphi_n\varphi_q\rangle$ 的能量为 $(n^2+q^2)${EPS}$。一个四分量态是乘积态的充要条件：系数矩阵 $c_{nq}$ 的行列式为零。(e) 需要 $\mathrm E_{\rm III}$。`}
        solution={<Tx>{R`**(a)** 本征态 $|\varphi_n\varphi_q\rangle$，本征值 $(n^2+q^2)${EPS}$。最低能级 $2${EPS}$（$n=q=1$）不简并；其次 $5${EPS}$（$(1,2)$ 与 $(2,1)$）二重简并。

**(b)** $\alpha$. $|\psi(t)\rangle=\frac1{\sqrt6}\mathrm e^{-2i${EPS}t/\hbar}|\varphi_1\varphi_1\rangle+\frac1{\sqrt3}\mathrm e^{-5i${EPS}t/\hbar}|\varphi_1\varphi_2\rangle+\frac1{\sqrt6}\mathrm e^{-5i${EPS}t/\hbar}|\varphi_2\varphi_1\rangle+\frac1{\sqrt3}\mathrm e^{-8i${EPS}t/\hbar}|\varphi_2\varphi_2\rangle$。
$\beta$. 测 $H$：$2${EPS}$（$1/6$），$5${EPS}$（$\frac13+\frac16=\frac12$），$8${EPS}$（$1/3$）。
$\gamma$. 测 $H(1)$：$${EPS}$（$\frac16+\frac13=\frac12$），$4${EPS}$（$\frac12$）。

**(c)** $\alpha$. $|\psi(0)\rangle=\frac{|\varphi_1\rangle+|\varphi_2\rangle}{\sqrt2}\otimes\Big(\frac1{\sqrt3}|\varphi_1\rangle+\sqrt{\tfrac23}|\varphi_2\rangle\Big)$，是乘积态。$\langle H(1)\rangle=\frac12(1+4)${EPS}=\frac52${EPS}$，$\langle H(2)\rangle=(\frac13+\frac23\cdot4)${EPS}=3${EPS}$，$\langle H(1)H(2)\rangle=\frac{15}2${EPS}^2=\langle H(1)\rangle\langle H(2)\rangle$：乘积态中两粒子的测量结果统计独立。
$\beta$. $U(t)=U_1(t)\otimes U_2(t)$，乘积态演化后仍是乘积态，各因子的系数只多相位，上述平均值都不变。

**(d)** 若 $|\psi(0)\rangle=(a_1|\varphi_1\rangle+a_2|\varphi_2\rangle)\otimes(b_1|\varphi_1\rangle+b_2|\varphi_2\rangle)$，则 $a_2b_2=0$ 而 $a_1b_2\ne0$、$a_2b_1\ne0$，矛盾：不是乘积态。$\langle H(1)\rangle=(\frac45\cdot1+\frac15\cdot4)${EPS}=\frac85${EPS}$；$\langle H(2)\rangle=(\frac25\cdot1+\frac35\cdot4)${EPS}=\frac{14}5${EPS}$；$\langle H(1)H(2)\rangle=(\frac15\cdot1+\frac35\cdot4+\frac15\cdot4)${EPS}^2=\frac{17}5${EPS}^2\ne\frac{112}{25}${EPS}^2=\langle H(1)\rangle\langle H(2)\rangle$：两粒子的能量是**关联**的。$H(1)$、$H(2)$、$H(1)H(2)$ 都与 $H$ 对易，这些平均值在 $t$ 时刻仍不变。

**(e)** $\alpha$. 在基 $(11,12,21,22)$ 中 $${ROP}(0)_{ij}=c_ic_j^*$，$c=(\frac1{\sqrt6},\frac1{\sqrt3},\frac1{\sqrt6},\frac1{\sqrt3})$；$${ROP}(t)_{ij}=c_ic_j^*\mathrm e^{-i(E_i-E_j)t/\hbar}$。部分迹：
$${ROP}(1)=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$，$${ROP}(2)=\begin{pmatrix}1/3&\sqrt2/3\\\sqrt2/3&2/3\end{pmatrix}$。三者都是纯态（$\operatorname{Tr}${ROP}^2=1$，或行列式为零），且 $${ROP}=${ROP}(1)\otimes${ROP}(2)$：乘积态没有关联。
$\beta$. $c=(\frac1{\sqrt5},\sqrt{\tfrac35},\frac1{\sqrt5},0)$：$${ROP}(1)=\begin{pmatrix}4/5&1/5\\1/5&1/5\end{pmatrix}$，$${ROP}(2)=\begin{pmatrix}2/5&\sqrt3/5\\\sqrt3/5&3/5\end{pmatrix}$，$\operatorname{Tr}${ROP}(1)^2=\operatorname{Tr}${ROP}(2)^2=\frac{19}{25}<1$：整体是纯态，每个子系统却是**统计混合**；$${ROP}\ne${ROP}(1)\otimes${ROP}(2)$——缺失的信息全部在两粒子的关联之中。`}</Tx>}>
        <Tx>{R`质量都为 $m$ 的两个粒子互不作用，同处宽 $a$ 的无限深势阱（\Ic{HI-2}）。$H(1)$、$H(2)$ 为各自的 Hamilton 量，本征态 $|\varphi_n(1)\rangle$、$|\varphi_q(2)\rangle$ 的能量为 $\frac{n^2\pi^2\hbar^2}{2ma^2}$、$\frac{q^2\pi^2\hbar^2}{2ma^2}$；整体的基取 $|\varphi_n\varphi_q\rangle=|\varphi_n(1)\rangle\otimes|\varphi_q(2)\rangle$。
(a) $H=H(1)+H(2)$ 的本征态与本征值？两个最低能级的简并度？
(b) $t=0$ 时 $|\psi(0)\rangle=\frac1{\sqrt6}|\varphi_1\varphi_1\rangle+\frac1{\sqrt3}|\varphi_1\varphi_2\rangle+\frac1{\sqrt6}|\varphi_2\varphi_1\rangle+\frac1{\sqrt3}|\varphi_2\varphi_2\rangle$。$\alpha$. 求 $t$ 时刻的态。$\beta$. 测总能量 $H$ 的可能结果与概率。$\gamma$. 改测 $H(1)$ 呢？
(c) $\alpha$. 证明 $|\psi(0)\rangle$ 是张量积态；求 $\langle H(1)\rangle$、$\langle H(2)\rangle$、$\langle H(1)H(2)\rangle$，比较 $\langle H(1)\rangle\langle H(2)\rangle$ 与 $\langle H(1)H(2)\rangle$ 并解释。$\beta$. 证明这些结果对 $|\psi(t)\rangle$ 仍成立。
(d) 若 $|\psi(0)\rangle=\frac1{\sqrt5}|\varphi_1\varphi_1\rangle+\sqrt{\tfrac35}|\varphi_1\varphi_2\rangle+\frac1{\sqrt5}|\varphi_2\varphi_1\rangle$：证明它不能写成张量积，并回答 (c) 的全部问题。
(e) $\alpha$. 写出 (b) 的态对应的密度算符 $${ROP}(0)$ 在基 $|\varphi_n\varphi_p\rangle$ 中的矩阵；$${ROP}(t)$ 是什么？求 $t=0$ 的部分迹 $${ROP}(1)=\operatorname{Tr}_2${ROP}$、$${ROP}(2)=\operatorname{Tr}_1${ROP}$。$${ROP}$、$${ROP}(1)$、$${ROP}(2)$ 描述纯态吗？比较 $${ROP}$ 与 $${ROP}(1)\otimes${ROP}(2)$ 并解释。$\beta$. 对 (d) 的态回答同样的问题。`}</Tx>
      </Exercise>

      <Box kind="note" title="以下三题以密度算符为主题">{R`它们假定 $\mathrm E_{\rm III}$ 的概念与结果已经熟悉。`}</Box>

      <Exercise n="LIII-17" title="纯态的判据" level="★★"
        hint={R`在自身本征基中 $${ROP}$ 是对角的；本征值 $\pi_l$ 非负且和为 1。`}
        solution={<Tx>{R`$${ROP}=\sum_l\pi_l|\chi_l\rangle\langle\chi_l|$，$${ROP}^2=\sum_l\pi_l^2|\chi_l\rangle\langle\chi_l|$；在 $\{|\chi_l\rangle\}$ 基中两者都是对角矩阵，对角元分别为 $\pi_l$、$\pi_l^2$。

**纯态**：$${ROP}=|\psi\rangle\langle\psi|$ 是投影算符，本征值为 1（本征矢 $|\psi\rangle$）与 0（与 $|\psi\rangle$ 正交的子空间）——只有一个非零对角元，等于 1。**统计混合**：有几个 $\pi_l$ 严格介于 0 与 1 之间（$\pi_l\ge0$，$\sum\pi_l=1$）。

**判据**：$\operatorname{Tr}${ROP}^2=\sum_l\pi_l^2\le\sum_l\pi_l=1$，因为 $0\le\pi_l\le1$ 时 $\pi_l^2\le\pi_l$；等号当且仅当每个 $\pi_l$ 都是 0 或 1，即恰有一个 $\pi_l=1$——纯态。所以 $${ROP}$ 描述纯态当且仅当 $\operatorname{Tr}${ROP}^2=1$。`}</Tx>}>
        <Tx>{R`$${ROP}$ 是任意系统的密度算符，$|\chi_l\rangle$、$\pi_l$ 为其本征矢与本征值。用它们写出 $${ROP}$ 与 $${ROP}^2$。在 $\{|\chi_l\rangle\}$ 基中这两个算符的矩阵是什么样子——先对纯态，再对统计混合？（先证明纯态时 $${ROP}$ 只有一个非零对角元且等于 1，而统计混合时有几个对角元介于 0 与 1 之间。）证明 $${ROP}$ 描述纯态当且仅当 $${ROP}^2$ 的迹等于 1。`}</Tx>
      </Exercise>

      <Exercise n="LIII-18" title="Hamilton 演化保持纯度" level="★★"
        hint={R`$i\hbar\frac{\mathrm d${ROP}}{\mathrm dt}=[H,${ROP}]$，再用迹的循环性。`}
        solution={<Tx>{R`$\frac{\mathrm d}{\mathrm dt}\operatorname{Tr}${ROP}^2=2\operatorname{Tr}\Big(${ROP}\frac{\mathrm d${ROP}}{\mathrm dt}\Big)=\frac2{i\hbar}\operatorname{Tr}\big(${ROP}H${ROP}-${ROP}${ROP}H\big)=0$（$\operatorname{Tr}(${ROP}${ROP}H)=\operatorname{Tr}(${ROP}H${ROP})$）。由习题 17，在 Hamilton 量（哪怕含时）支配的演化中，纯态始终是纯态，统计混合始终是混合，"纯度" $\operatorname{Tr}${ROP}^2$ 守恒。纯态与混合之间的转变只能来自别处：测量、与环境耦合后对环境取部分迹（如习题 16 (e)$\beta$），或者对制备过程的不完全了解。`}</Tx>}>
        <Tx>{R`系统的密度算符 $${ROP}(t)$ 在 Hamilton 量 $H(t)$ 作用下演化。证明 $${ROP}^2$ 的迹不随时间变化。结论：系统能否演化得先处于纯态、后处于统计混合？`}</Tx>
      </Exercise>

      <Exercise n="LIII-19" title="部分迹的一个性质；无相互作用子系统的约化演化" level="★★★"
        hint={R`在乘积基 $|u_nv_p\rangle$ 中写出 $\operatorname{Tr}_1$ 的矩阵元，对 $n$ 的求和可以交换哑标。`}
        solution={<Tx>{R`设 $${AO}=${AO}(1)\otimes\mathbb 1(2)$，矩阵元 $\langle u_nv_p|${AO}|u_{n'}v_{p'}\rangle=${AO}_{nn'}\delta_{pp'}$。则
$$\langle v_p|\operatorname{Tr}_1(${AO}${BO})|v_{p'}\rangle=\sum_{n,n'}${AO}_{nn'}\,\langle u_{n'}v_p|${BO}|u_nv_{p'}\rangle,\qquad\langle v_p|\operatorname{Tr}_1(${BO}${AO})|v_{p'}\rangle=\sum_{n,n'}\langle u_nv_p|${BO}|u_{n'}v_{p'}\rangle\,${AO}_{n'n}.$$
在第二式中交换哑标 $n\leftrightarrow n'$ 即得第一式：$\operatorname{Tr}_1\{${AO}${BO}\}=\operatorname{Tr}_1\{${BO}${AO}\}$。（$${BO}=${BO}(1)\otimes\mathbb 1(2)$ 的情形同理。）注意 $${AO}$ 必须只作用于被求迹的空间 (1)；同样的论证给出：只作用于 (2) 的算符在 $\operatorname{Tr}_2$ 下可以循环。

**应用**：$${ROP}(1)=\operatorname{Tr}_2${ROP}$，$i\hbar\frac{\mathrm d${ROP}}{\mathrm dt}=[H(1)+H(2),${ROP}]$。于是
$$i\hbar\frac{\mathrm d}{\mathrm dt}${ROP}(1)=\operatorname{Tr}_2[H(1),${ROP}]+\operatorname{Tr}_2[H(2),${ROP}].$$
第一项中 $H(1)$ 不作用于 (2)，可以提到 $\operatorname{Tr}_2$ 外：$=[H(1),${ROP}(1)]$。第二项由上面的性质（对 $\operatorname{Tr}_2$）为零。所以
$$i\hbar\frac{\mathrm d}{\mathrm dt}${ROP}(1)=[H(1),${ROP}(1)].$$
**解释**：两子系统无相互作用时，子系统 (1) 的约化密度算符只在自己的 Hamilton 量下演化，好像 (2) 不存在一样——即使两者之间存在关联（纠缠）。子系统 (1) 上的一切测量结果都不受 (2) 的演化影响。`}</Tx>}>
        <Tx>{R`整体系统由子系统 (1)、(2) 组成，$${AO}$、$${BO}$ 作用于 $\mathscr E(1)\otimes\mathscr E(2)$。证明：当 $${AO}$（或 $${BO}$）实际上只作用于 $\mathscr E(1)$，即 $${AO}=${AO}(1)\otimes\mathbb 1(2)$［或 $${BO}=${BO}(1)\otimes\mathbb 1(2)$］时，部分迹 $\operatorname{Tr}_1\{${AO}${BO}\}$ 与 $\operatorname{Tr}_1\{${BO}${AO}\}$ 相等。应用：若整体 Hamilton 量是分别只作用于 $\mathscr E(1)$ 与 $\mathscr E(2)$ 的两个算符之和 $H=H(1)+H(2)$，求约化密度算符 $${ROP}(1)$ 的变化率 $\frac{\mathrm d}{\mathrm dt}${ROP}(1)$，并给出物理解释。`}</Tx>
      </Exercise>
    </Sec>);
}
