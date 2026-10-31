// 补充材料 A_III：无限深势阱中的粒子（式 AIII-1 … AIII-32）
// 讲法：把势阱当作第 III 章各条假设的"试验台"，围绕三个问题展开——测动量得到什么？叠加态怎样动？测位置之后能量怎样分布？
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { MomentumDistPlot, WellPacketLab, PositionKickPlot } from "./_ch03c_plots.jsx";

const R = String.raw;

export function SecA() {
  return (
    <Sec n="AIII" title="Particle in an infinite potential well" zh="无限深势阱中的粒子"
      gist={R`同一个最简单的模型回答三个问题：定态的动量分布是一对"衍射峰"，$\Delta P_n=n\pi\hbar/a$；两个定态的叠加以 Bohr 频率 $\omega_{21}$ 来回晃动，中心在碰壁前就折返；精度 $\varepsilon$ 的位置测量把能量概率推向 $n\sim a/\varepsilon$ 的高能级。`}
      why={R`第 III 章的假设是抽象陈述。要真正会用，最好在一个每一步都能算到底的体系上把"测动量""求演化""测位置后再测能量"完整做一遍，并且看到哪里会掉进陷阱（例如把 $\delta$ 函数当作测量后的态）。`}
      gives={["AIII-6", "AIII-10", "AIII-18", "AIII-23", "AIII-28", "AIII-32"]}>
      <p className="muted">本节概念：<C id="mom_dist" /> · <C id="bohr_beat" /> · <C id="meas_kick" /></p>
      <Tx>{R`**为什么还要回到这个阱？**能级与本征函数早在 \Ic{HI-2} 里就求出来了。那时的问题是"定态长什么样"；现在我们手里有了第 III 章的测量假设和演化方程，可以问更"实验"的问题：

1. 粒子处在某个能级上，**测它的动量**，会得到哪些值、各以多大概率？

2. 粒子处在两个能级的叠加上，**它会怎么动**？和经典的来回弹跳像不像？

3. 先**测位置**、紧接着**测能量**，结果的概率分布是什么？

这三个问题分别练习第三/第四假设（概率）、第六假设（演化）和第五假设（测量后的态）。先把要用的结论摆出来（记号同 $\mathrm H_{\rm I}$，阱占据 $0\le x\le a$）：`}</Tx>
      <Eq n="AIII-1" keyEq title="无限深阱的能级" say="能级按 $n$ 的平方增长：阱越窄、粒子越轻，能级间隔越大。">{R`E_n=\frac{n^2\pi^2\hbar^2}{2ma^2}`}</Eq>
      <Eq n="AIII-2" say="第 $n$ 个定态在阱内是恰好装下 $n$ 个半波长的正弦，在两壁处为零。">{R`\varphi_n(x)=\sqrt{\frac2a}\,\sin\left(\frac{n\pi x}{a}\right)`}</Eq>
      <Tx>{R`其中 $n=1,2,3,\dots$。下面的计算全靠这两个式子。`}</Tx>

      <Sub n="AIII-1" title="Distribution of the momentum values in a stationary state" zh="定态中的动量分布">
        <Tx>{R`**先猜一猜。**经典粒子在阱里以恒定速率来回弹，动量只取 $\pm\sqrt{2mE}$ 两个值，各占一半时间。量子定态 $\varphi_n$ 是实函数、不随时间变化的驻波——它的动量会不会也"一半向左、一半向右"？答案是"大致如此，但对低能级很不准"。要把"大致"变成数字，就得把波函数换到动量表象。

**动量测量的概率。**按第四假设（连续谱形式），测得动量落在 $[p,p+\mathrm dp]$ 内的概率由动量表象波函数的模方给出：`}</Tx>
        <Eq n="AIII-3" say="测量动量得到 $p$ 附近 $\mathrm dp$ 区间内结果的概率，等于动量表象波函数模方乘以 $\mathrm dp$。">{R`\overline{\mathcal P}_n(p)\,\mathrm dp=\left|\overline\varphi_n(p)\right|^2\,\mathrm dp`}</Eq>
        <Tx>{R`而 $\overline\varphi_n(p)=\braket{p|\varphi_n}$ 就是 $\varphi_n(x)$ 的 Fourier 变换——只是积分区间被阱壁截断成 $[0,a]$：`}</Tx>
        <Eq n="AIII-4" say="动量表象波函数是阱内正弦函数与平面波 $\mathrm e^{-ipx/\hbar}$ 的重叠积分，积分只在阱内进行。">{R`\overline\varphi_n(p)=\frac1{\sqrt{2\pi\hbar}}\int_0^a\sqrt{\frac2a}\,\sin\left(\frac{n\pi x}a\right)\mathrm e^{-ipx/\hbar}\,\mathrm dx`}</Eq>
        <Tx>{R`**计算的诀窍**是把正弦拆成两个复指数：$\sin\theta=(\mathrm e^{i\theta}-\mathrm e^{-i\theta})/2i$。这样被积函数变成两个纯指数，每个都能直接积出来：`}</Tx>
        <Eq n="AIII-5" say="把正弦拆成两个复指数后，积分变成两个指数函数的积分，各自可以直接写出原函数。">{R`\begin{aligned}\overline\varphi_n(p)&=\frac1{2i\sqrt{\pi\hbar a}}\int_0^a\left[\mathrm e^{i\left(\frac{n\pi}a-\frac p\hbar\right)x}-\mathrm e^{-i\left(\frac{n\pi}a+\frac p\hbar\right)x}\right]\mathrm dx\\&=\frac1{2i\sqrt{\pi\hbar a}}\left[\frac{\mathrm e^{i\left(\frac{n\pi}a-\frac p\hbar\right)a}-1}{i\left(\frac{n\pi}a-\frac p\hbar\right)}-\frac{\mathrm e^{-i\left(\frac{n\pi}a+\frac p\hbar\right)a}-1}{-i\left(\frac{n\pi}a+\frac p\hbar\right)}\right]\end{aligned}`}</Eq>
        <Derivation collapsed title="从 (AIII-5) 整理出 (AIII-6)：提出半程相位" steps={[
          { tex: R`\frac{\mathrm e^{iua}-1}{iu}=\mathrm e^{iua/2}\,\frac{\mathrm e^{iua/2}-\mathrm e^{-iua/2}}{iu}=a\,\mathrm e^{iua/2}\,\frac{\sin(ua/2)}{ua/2}`, why: R`对任意实数 $u$ 成立：先提出"半程"相位因子，剩下的是一个对称的正弦。` },
          { tex: R`u_\mp=\frac{n\pi}a\mp\frac p\hbar\ \Rightarrow\ \frac{u_\mp a}2=\frac{n\pi}2\mp\frac{pa}{2\hbar}`, why: R`第一项取 $u=u_-$；第二项分子分母同时变号后是 $u=-u_+$ 的同一形式。` },
          { tex: R`\frac{\sin(u_-a/2)}{u_-a/2}=F\!\left(p-\frac{n\pi\hbar}a\right),\qquad \frac{\sin(u_+a/2)}{u_+a/2}=F\!\left(p+\frac{n\pi\hbar}a\right)`, why: R`$F$ 是偶函数，记号见 \eqref{AIII-7}。` },
          { tex: R`\mathrm e^{-iu_+a/2}=\mathrm e^{-in\pi}\,\mathrm e^{i\left(\frac{n\pi}2-\frac{pa}{2\hbar}\right)}=(-1)^n\,\mathrm e^{i\left(\frac{n\pi}2-\frac{pa}{2\hbar}\right)}`, why: R`两项的相位因子只差 $(-1)^n$；与第二项前的负号合起来就是 $(-1)^{n+1}$。` },
        ]} />
        <Eq n="AIII-6" keyEq title="定态的动量振幅" say="动量振幅是两条以 $\pm n\pi\hbar/a$ 为中心的衍射曲线之和（$n$ 奇）或之差（$n$ 偶），前面只差一个整体相位。">{R`\overline\varphi_n(p)=\frac1{2i}\sqrt{\frac a{\pi\hbar}}\,\mathrm e^{i\left(\frac{n\pi}2-\frac{pa}{2\hbar}\right)}\left[F\!\left(p-\frac{n\pi\hbar}a\right)+(-1)^{n+1}F\!\left(p+\frac{n\pi\hbar}a\right)\right]`}</Eq>
        <Eq n="AIII-7" say="$F$ 是单缝衍射振幅的形状：中央主峰加逐渐衰减的旁瓣，主峰两侧第一对零点相距 $4\pi\hbar/a$。">{R`F(p)=\frac{\sin(pa/2\hbar)}{pa/2\hbar}`}</Eq>
        <Tx>{R`**怎么读这个结果？**$\varphi_n$ 在阱内恰好是两列反向平面波（动量 $\pm n\pi\hbar/a$）的叠加，但它们只存在于宽 $a$ 的"窗口"里。把一列平面波截断到有限窗口，它的动量就不再是单一值，而被抹成一条宽度 $\sim h/a$ 的曲线——和光通过宽 $a$ 的单缝时角分布被抹开是同一个数学。于是：

• 每条衍射曲线 $F$ 的"宽度"（主峰两侧第一对零点之间）是 $4\pi\hbar/a$，**与 $n$ 无关**：它只记得窗口有多宽；

• 两条曲线的中心在 $\mp n\pi\hbar/a$，**相距随 $n$ 线性增大**；

• 两条曲线的幅度也与 $n$ 无关。

所以低能级时两峰挤在一起、互相干涉；高能级时两峰远远分开、各自独立。**动手看**：下面的交互图把 $\overline{\mathcal P}_n(p)$ 画出来，拖动 $n$。`}</Tx>
        <MomentumDistPlot />
        <Tx>{R`**平均动量为零。**方括号里的函数对 $n$ 奇为偶函数、对 $n$ 偶为奇函数（$F$ 本身是偶函数，交换两项时差一个 $(-1)^{n+1}$）。不论哪种情况，平方之后 $\overline{\mathcal P}_n(p)$ 都是 $p$ 的偶函数，向左与向右同样可能：`}</Tx>
        <Eq n="AIII-8" say="动量分布左右对称，所以定态的平均动量为零。">{R`\langle P\rangle_n=\int_{-\infty}^{+\infty}\overline{\mathcal P}_n(p)\,p\,\mathrm dp=0`}</Eq>
        <Tx>{R`这也可以不经计算看出：$\varphi_n$ 是实函数，而实波函数的概率流处处为零，平均动量自然为零。

**$\langle P^2\rangle$：别在动量空间硬算。**用 \eqref{AIII-6} 直接积 $\int\overline{\mathcal P}_n p^2\,\mathrm dp$ 也能做，但被积函数只按 $1/p^2$ 衰减，收敛慢、手算繁。更省事的是留在位置表象：$P$ 在那里作用为 $\frac\hbar i\frac{\mathrm d}{\mathrm dx}$，而 $\langle P^2\rangle=\langle P\varphi_n|P\varphi_n\rangle$ 只需要一阶导数：`}</Tx>
        <Eq n="AIII-9" say="动量平方的平均值等于 $\hbar^2$ 乘以波函数导数模方的积分，结果正好是 $(n\pi\hbar/a)^2$。">{R`\begin{aligned}\langle P^2\rangle_n&=\hbar^2\int_0^a\left|\frac{\mathrm d\varphi_n}{\mathrm dx}\right|^2\mathrm dx\\&=\hbar^2\int_0^a\frac2a\left(\frac{n\pi}a\right)^2\cos^2\left(\frac{n\pi x}a\right)\mathrm dx\\&=\left(\frac{n\pi\hbar}a\right)^2\end{aligned}`}</Eq>
        <Box kind="warning" title="第一行为什么成立">{R`从 $\langle P^2\rangle=-\hbar^2\int\varphi_n^*\varphi_n''\,\mathrm dx$ 出发分部积分，边界项 $\varphi_n^*\varphi_n'\big|_0^a$ 因 $\varphi_n(0)=\varphi_n(a)=0$ 而消失，于是得到导数模方的积分。注意不能"先算 $\varphi_n''$ 再积分"然后忘掉阱壁：$\varphi_n'$ 在壁处有跳变（壁外为零），$\varphi_n''$ 在壁处含 $\delta$ 函数；用一阶导数的形式恰好绕开了这个麻烦。`}</Box>
        <Tx>{R`合起来得到动量的方均根偏差：`}</Tx>
        <Eq n="AIII-10" keyEq title="定态的动量弥散" say="定态的动量方均根偏差等于 $n\pi\hbar/a$，随量子数 $n$ 线性增大。">{R`\Delta P_n=\sqrt{\langle P^2\rangle_n-\langle P\rangle_n^2}=\frac{n\pi\hbar}a`}</Eq>
        <Tx>{R`对照位置弥散（$\Delta X_n$ 随 $n$ 很快趋于 $a/\sqrt{12}$ 量级），$\Delta X_n\Delta P_n$ 随 $n$ 增大，Heisenberg 下界 $\hbar/2$ 只在低能级附近才"吃紧"。

**高能级：两个尖峰。**当 $n\gg1$，两条衍射曲线中心相距 $2n\pi\hbar/a$，远大于各自的宽度 $4\pi\hbar/a$，它们重叠部分（干涉项）可以忽略：`}</Tx>
        <Eq n="AIII-11" say="能级很高时，两条衍射曲线几乎不重叠，交叉项可以略去，概率密度近似为两个独立尖峰之和。">{R`\begin{aligned}\overline{\mathcal P}_n(p)&=\frac a{4\pi\hbar}\left[F\!\left(p-\frac{n\pi\hbar}a\right)+(-1)^{n+1}F\!\left(p+\frac{n\pi\hbar}a\right)\right]^2\\&\simeq\frac a{4\pi\hbar}\left[F^2\!\left(p-\frac{n\pi\hbar}a\right)+F^2\!\left(p+\frac{n\pi\hbar}a\right)\right]\end{aligned}`}</Eq>
        <Tx>{R`这两个峰在哪里？拿同一能量的经典粒子来比：`}</Tx>
        <Eq n="AIII-12" say="经典粒子的动能等于第 $n$ 个能级的能量。">{R`\frac{p_{cl}^2}{2m}=\frac{n^2\pi^2\hbar^2}{2ma^2}`}</Eq>
        <Eq n="AIII-13" say="同能量经典粒子的动量正好是 $\pm n\pi\hbar/a$，即两个量子尖峰的位置。">{R`p_{cl}=\pm\frac{n\pi\hbar}a`}</Eq>
        <Tx>{R`两峰正好落在 $\pm p_{cl}$。所以高能级时测量动量几乎必定得到 $+p_{cl}$ 或 $-p_{cl}$（各一半），**相对**精度随 $n$ 提高（峰宽固定、峰位 $\propto n$）——这是对应原理的一个干净例子：正弦在阱里振荡很多次，局部看就是两列反向行波。反过来，$n=2$ 时阱里只有一个完整振荡，峰宽与峰位同量级；基态只有半个正弦弧，"波长"根本谈不上确定，于是动量分布是 $p=0$ 处的一个宽包。`}</Tx>
        <Box kind="physics" title="$\Delta P_n$ 大，并不等于动量没测准">{R`\eqref{AIII-10} 说 $\Delta P_n$ 随 $n$ 增大，似乎高能级动量"越来越不确定"。其实对双峰分布，方均根偏差量的是**两峰之间的距离**，而不是峰的宽度：高能级时动量的大小 $|p|$ 定得很准，只是正负号各占一半。用一个数字概括一个双峰分布，信息会丢失——这是方均根偏差的局限，不是物理上的模糊。`}</Box>
      </Sub>

      <Sub n="AIII-2" title="Evolution of the particle's wave function" zh="波函数的演化：两个能级的叠加">
        <Tx>{R`**定态不会动。**单个 $\ket{\varphi_n}$ 随时间只多一个整体相位 $\mathrm e^{-iE_nt/\hbar}$，一切可测量都与时间无关。要看到运动，至少需要两个不同能量的分量——它们的相对相位以 Bohr 频率转动，概率密度里的干涉项随之摆动。挑最简单的情形：`}</Tx>
        <Eq n="AIII-14" say="初始时刻粒子处在基态与第一激发态的等权叠加上。">{R`\ket{\psi(0)}=\frac1{\sqrt2}\left[\ket{\varphi_1}+\ket{\varphi_2}\right]`}</Eq>
        <Tx>{R`**$t$ 时刻的态。**保守体系的演化规则（\mainref{D-54}）是：在能量本征基里，每个分量各自乘上 $\mathrm e^{-iE_nt/\hbar}$。代入 \eqref{AIII-1}：`}</Tx>
        <Eq n="AIII-15" say="每个能量分量各自按自己的能量转动相位：基态转得慢，第一激发态转得快四倍。">{R`\ket{\psi(t)}=\frac1{\sqrt2}\left[\mathrm e^{-i\frac{\pi^2\hbar}{2ma^2}t}\ket{\varphi_1}+\mathrm e^{-2i\frac{\pi^2\hbar}{ma^2}t}\ket{\varphi_2}\right]`}</Eq>
        <Tx>{R`整体相位没有物理意义，把基态的相位提出去，只留下**相对**相位：`}</Tx>
        <Eq n="AIII-16" say="去掉整体相位后，只剩第一激发态相对基态的相位以 $\omega_{21}$ 转动。">{R`\ket{\psi(t)}\propto\frac1{\sqrt2}\left[\ket{\varphi_1}+\mathrm e^{-i\omega_{21}t}\ket{\varphi_2}\right]`}</Eq>
        <Eq n="AIII-17" say="Bohr 角频率等于两能级之差除以 $\hbar$，对这个阱是 $3\pi^2\hbar/2ma^2$。">{R`\omega_{21}=\frac{E_2-E_1}\hbar=\frac{3\pi^2\hbar}{2ma^2}`}</Eq>
        <Tx>{R`**概率密度。**两个本征函数都是实函数，所以 $|\psi(x,t)|^2$ 里交叉项只剩一个余弦：`}</Tx>
        <Eq n="AIII-18" keyEq title="两态叠加的概率密度" say="概率密度等于两个定态密度的平均，加上一个以 Bohr 频率振荡的干涉项；只有干涉项随时间变化。">{R`|\psi(x,t)|^2=\frac12\varphi_1^2(x)+\frac12\varphi_2^2(x)+\varphi_1(x)\,\varphi_2(x)\cos\omega_{21}t`}</Eq>
        <Tx>{R`前两项是"粒子一半时间在基态、一半时间在激发态"那样的平均，不动；唯一随时间变化的是干涉项 $\varphi_1\varphi_2\cos\omega_{21}t$。而 $\varphi_1\varphi_2$ 在阱的左半为正、右半为负（$\varphi_2$ 在中点变号），所以 $\cos\omega_{21}t=+1$ 时概率堆在左边，$-1$ 时堆在右边：波包在两壁之间来回晃，只有一个频率 $\nu_{21}=(E_2-E_1)/h$。下面的交互图可以直接看这个晃动；切到"高斯波包"还能看到更丰富的现象（见本小节末尾的拓展）。`}</Tx>
        <WellPacketLab />
        <Tx>{R`**中心怎么走：$\langle X\rangle(t)$。**以阱中点为原点更方便，令`}</Tx>
        <Eq n="AIII-19" say="把位置算符的原点平移到阱的中点。">{R`X'=X-a/2`}</Eq>
        <Tx>{R`每个 $\varphi_n^2$ 关于中点对称，而 $x-a/2$ 关于中点反对称，所以 $X'$ 的对角矩阵元都是零：`}</Tx>
        <Eq n="AIII-20" say="由于对称性，平移后的位置算符在两个定态中的平均值都为零：定态的概率分布以阱中点为中心。">{R`\begin{aligned}\braket{\varphi_1|X'|\varphi_1}&\propto\int_0^a\left(x-\frac a2\right)\sin^2\left(\frac{\pi x}a\right)\mathrm dx=0\\\braket{\varphi_2|X'|\varphi_2}&\propto\int_0^a\left(x-\frac a2\right)\sin^2\left(\frac{2\pi x}a\right)\mathrm dx=0\end{aligned}`}</Eq>
        <Tx>{R`只剩非对角项，它与 Bohr 频率的相位相乘取实部：`}</Tx>
        <Eq n="AIII-21" say="平移后位置的平均值只来自非对角矩阵元，它乘上 Bohr 频率的相位后取实部。">{R`\langle X'\rangle(t)=\mathrm{Re}\left\{\mathrm e^{-i\omega_{21}t}\braket{\varphi_1|X'|\varphi_2}\right\}`}</Eq>
        <Tx>{R`非对角元里 $a/2$ 那部分因 $\braket{\varphi_1|\varphi_2}=0$ 而消失，剩下一个初等积分：`}</Tx>
        <Eq n="AIII-22" say="基态与第一激发态之间的位置矩阵元是 $-16a/9\pi^2$，约为阱宽的 18%。">{R`\begin{aligned}\braket{\varphi_1|X'|\varphi_2}&=\braket{\varphi_1|X|\varphi_2}-\frac a2\braket{\varphi_1|\varphi_2}\\&=\frac2a\int_0^ax\sin\frac{\pi x}a\sin\frac{2\pi x}a\,\mathrm dx\\&=-\frac{16a}{9\pi^2}\end{aligned}`}</Eq>
        <Derivation collapsed title="积出 (AIII-22) 的最后一行" steps={[
          { tex: R`\sin\frac{\pi x}a\sin\frac{2\pi x}a=\frac12\left[\cos\frac{\pi x}a-\cos\frac{3\pi x}a\right]`, why: "积化和差。" },
          { tex: R`\int_0^ax\cos\frac{k\pi x}a\,\mathrm dx=\frac{a^2}{k^2\pi^2}\left[(-1)^k-1\right]=-\frac{2a^2}{k^2\pi^2}\quad(k\ \text{奇})`, why: R`分部积分；$\sin(k\pi)=0$ 使一项消失。` },
          { tex: R`\frac2a\cdot\frac12\left[-\frac{2a^2}{\pi^2}+\frac{2a^2}{9\pi^2}\right]=-\frac{2a}{\pi^2}\cdot\frac89=-\frac{16a}{9\pi^2}`, why: R`取 $k=1$ 与 $k=3$ 相减。` },
        ]} />
        <Eq n="AIII-23" keyEq title="波包中心的运动" say="位置平均值围绕阱中点作简谐振荡，振幅只有 $16a/9\pi^2\approx0.18a$，远小于经典粒子的往返幅度。">{R`\langle X\rangle(t)=\frac a2-\frac{16a}{9\pi^2}\cos\omega_{21}t`}</Eq>
        <Tx>{R`**和经典粒子比一比。**同周期 $2\pi/\omega_{21}$ 来回弹的经典粒子，位置在 $0$ 与 $a$ 之间按折线（锯齿）变化——两壁之间匀速，碰壁瞬间反向。量子的 $\langle X\rangle$ 却是一条振幅只有 $0.18\,a$ 的光滑余弦（交互图下半部分）：**波包中心在还没到墙的时候就折回了**。

原因可以用 Ehrenfest 定理来想：$\mathrm d\langle P\rangle/\mathrm dt=-\langle\mathrm dV/\mathrm dX\rangle$。无限深阱的"力"只存在于两壁上，作用对象是波函数贴着墙的那部分。这个波包宽度与阱宽同量级，总有一部分贴着某面墙，于是中心离墙还远就已经开始被推回来。只有当势在一个波包宽度上变化很小时，中心才按经典规律运动（第 I 章 \Isec{D-2}、\mainsec{D-1}）；这里势在壁上无限陡，条件被彻底破坏。`}</Tx>
        <Box kind="note" title="能量的平均值与弥散不随时间变化">
          <Tx>{R`$H$ 是运动常量，任何与它有关的统计量都不该随时间变。对 \eqref{AIII-15} 直接算：`}</Tx>
          <Eq n="AIII-24" say="平均能量是两个能级的平均，等于基态能量的 5/2 倍。">{R`\langle H\rangle=\frac12E_1+\frac12E_2=\frac52E_1`}</Eq>
          <Eq n="AIII-25" say="能量平方的平均值是 17/2 倍基态能量的平方。">{R`\langle H^2\rangle=\frac12E_1^2+\frac12E_2^2=\frac{17}2E_1^2`}</Eq>
          <Eq n="AIII-26" say="能量的方均根偏差是基态能量的 3/2 倍，也就是两能级差的一半。">{R`\Delta H=\frac32E_1`}</Eq>
          <Tx>{R`（用了 $E_2=4E_1$。）另一方面，波包的形状要变化"一个显著的量"，需要的时间是干涉项转过约一弧度：`}</Tx>
          <Eq n="AIII-27" say="波包形状发生显著变化的特征时间约为 Bohr 角频率的倒数。">{R`\Delta t\simeq\frac1{\omega_{21}}`}</Eq>
          <Tx>{R`两者相乘，$\omega_{21}=3E_1/\hbar$：`}</Tx>
          <Eq n="AIII-28" keyEq title="时间–能量关系的一个实例" say="能量弥散乘以演化特征时间约为 $\hbar/2$：这是时间–能量不确定关系在一个可精确计算的例子里的体现。">{R`\Delta H\cdot\Delta t\simeq\frac32E_1\times\frac\hbar{3E_1}=\frac\hbar2`}</Eq>
          <Tx>{R`正是 \mainsec{D-2} 中时间–能量关系所预言的量级。`}</Tx>
        </Box>
        <Box kind="aside" title="波包的复现（revival）">{R`两态叠加只有一个频率，所以严格周期。一般的波包包含很多能级，相位 $\mathrm e^{-iE_nt/\hbar}$ 各转各的，波包会在几次碰壁后散开、变得面目全非。但无限深阱有一个特殊之处：$E_n=n^2E_1$，所有 Bohr 频率都是 $E_1/\hbar$ 的**整数倍**。于是在

$$T_{\rm rev}=\frac{2\pi\hbar}{E_1}=\frac{4ma^2}{\pi\hbar}$$

时，每个分量的相位 $\mathrm e^{-in^2E_1T_{\rm rev}/\hbar}=\mathrm e^{-2\pi in^2}=1$，波函数**精确地**回到初始形状——不论初态多复杂。在 $T_{\rm rev}/2$ 时，相位因子变成 $(-1)^{n^2}=(-1)^n$；再利用 $\varphi_n(a-x)=(-1)^{n+1}\varphi_n(x)$，得 $\psi(x,T_{\rm rev}/2)=-\psi(a-x,0)$：初始波包关于阱中点的镜像（差一个无关紧要的负号）。在交互图里选"高斯波包"，用"跳到 $T_{\rm rev}$"按钮验证：自相关 $|\braket{\psi(0)|\psi(t)}|^2$ 精确回到 1。两态情形的周期 $2\pi/\omega_{21}=T_{\rm rev}/3$ 只是这一规律的特例。`}</Box>
      </Sub>

      <Sub n="AIII-3" title="Perturbation created by a position measurement" zh="位置测量带来的扰动">
        <Tx>{R`**问题。**粒子处在基态 $\ket{\varphi_1}$。在 $t=0$ 测量位置，结果是 $x=a/2$；紧接着测能量，得到各个 $E_n$ 的概率是多少？

**先试最天真的算法，看它在哪里翻车。**把"测得 $a/2$"理解为态变成 $X$ 的本征函数 $\delta(x-a/2)$，再拿它去和各个 $\varphi_n$ 求重叠：`}</Tx>
        <Eq n="AIII-29" say="错误的推理：用 $\delta$ 函数作测量后的态，会得到所有奇数能级的“概率”都相等、偶数能级为零。">{R`\left|\int_0^a\mathrm dx\,\delta\left(x-\frac a2\right)\varphi_n^*(x)\right|^2=\left|\varphi_n\left(\frac a2\right)\right|^2=\begin{cases}2/a & \text{if } n \text{ is odd}\\ 0 & \text{if } n \text{ is even}\end{cases}`}</Eq>
        <Tx>{R`**三个警报同时响起。**(1) 量纲：右边是 $2/a$，单位是长度的倒数——概率必须是纯数。(2) 求和：所有奇数 $n$ 都得到同一个数，无穷多项加起来发散，不可能等于 1。(3) 偶数能级为零倒是对的（$\varphi_n$ 在中点有节点），但这一点点正确掩盖不了前两条。

三条警报指向同一个根源：$\delta(x-a/2)$ 的模方积分是无穷大，它不是一个可以归一化的态，第五假设根本没法用在它身上——一个 $\delta$ 函数代表不了任何实际制备出来的态。真正的出路来自 \mainsec{E-2} 的观点：对连续谱的可观测量，任何仪器都只有有限分辨率，"测得 $a/2$"的确切含义是`}</Tx>
        <Eq n="AIII-30" say="真实的位置测量只能断言粒子落在以 $a/2$ 为中心、宽为 $\varepsilon$ 的区间内，$\varepsilon$ 由仪器决定且永不为零。">{R`\frac a2-\frac\varepsilon2\le x\le\frac a2+\frac\varepsilon2`}</Eq>
        <Tx>{R`$\varepsilon>0$ 由仪器决定。设 $\varepsilon$ 远小于测量前波函数的尺度（这里是 $a$），那么测量后的波函数可以取为窗口函数 $\sqrt\varepsilon\,\delta^{(\varepsilon)}(x-a/2)$——$\delta^{(\varepsilon)}(x)$ 在宽 $\varepsilon$ 的区间内等于 $1/\varepsilon$、区间外为零（附录 II §1-a）。它是归一化的：`}</Tx>
        <Eq n="AIII-31" say="宽为 $\varepsilon$、高为 $1/\sqrt\varepsilon$ 的窗口函数模方积分为 1，是一个合格的归一化态。">{R`\int\mathrm dx\left|\sqrt\varepsilon\,\delta^{(\varepsilon)}\left(x-\frac a2\right)\right|^2=1`}</Eq>
        <Tx>{R`现在再算能量的概率就是一个普通的重叠积分（积分区间只有宽 $\varepsilon$ 的一小段）：`}</Tx>
        <Eq n="AIII-32" keyEq title="位置测量后的能量分布" say="位置测量后测得 $E_n$ 的概率：奇数能级按 $1/n^2$ 乘一个以 $n=2a/\varepsilon$ 为第一零点的振荡因子分布，偶数能级为零。">{R`\begin{aligned}\mathcal P(E_n)&=\left|\int\varphi_n^*(x)\sqrt\varepsilon\,\delta^{(\varepsilon)}\left(x-\frac a2\right)\mathrm dx\right|^2\\&=\begin{cases}\dfrac{8a}\varepsilon\left(\dfrac1{n\pi}\right)^2\sin^2\left(\dfrac{n\pi\varepsilon}{2a}\right) & \text{if } n \text{ is odd}\\ 0 & \text{if } n \text{ is even}\end{cases}\end{aligned}`}</Eq>
        <Derivation collapsed title="得到 (AIII-32) 的积分" steps={[
          { tex: R`\frac1{\sqrt\varepsilon}\sqrt{\frac2a}\int_{\frac a2-\frac\varepsilon2}^{\frac a2+\frac\varepsilon2}\sin\frac{n\pi x}a\,\mathrm dx=\frac1{\sqrt\varepsilon}\sqrt{\frac2a}\,\frac a{n\pi}\cdot2\sin\frac{n\pi}2\sin\frac{n\pi\varepsilon}{2a}`, why: R`窗口内被积函数的原函数是 $-\frac a{n\pi}\cos\frac{n\pi x}a$；两端余弦之差用和差化积。` },
          { tex: R`\sin\frac{n\pi}2=\begin{cases}\pm1 & n\ \text{奇}\\0 & n\ \text{偶}\end{cases}`, why: "偶数能级在中点有节点，与对称的窗口正交。" },
          { tex: R`\mathcal P(E_n)=\frac1\varepsilon\cdot\frac2a\cdot\frac{a^2}{n^2\pi^2}\cdot4\sin^2\frac{n\pi\varepsilon}{2a}=\frac{8a}\varepsilon\left(\frac1{n\pi}\right)^2\sin^2\frac{n\pi\varepsilon}{2a}`, why: R`取模平方。$\varepsilon\to0$ 时 $\sin^2(\cdot)\simeq(n\pi\varepsilon/2a)^2$，得 $\mathcal P(E_n)\simeq2\varepsilon/a$——这正是错误推理里的 $2/a$ 乘上窗口宽度 $\varepsilon$。` },
        ]} />
        <PositionKickPlot />
        <Tx>{R`**读图。**对固定的 $\varepsilon$，低能级的概率都约为 $2\varepsilon/a$（这就是 \eqref{AIII-29} 中的 $2/a$——只是乘上了被错误推理丢掉的 $\varepsilon$）；到 $n\approx a/\varepsilon$ 附近开始明显下降，第一个零点在 $n=2a/\varepsilon$，此后只剩按 $1/n^2$ 衰减的小旁瓣。分布伸展到多高的能级，**由 $\varepsilon$ 决定**。错误推理在一开始就令 $\varepsilon=0$，丢掉的恰恰是决定答案的那个参数。

**物理解释**就是不确定关系：位置定得越准（$\varepsilon$ 越小），动量弥散就越大（$\sim\hbar/\varepsilon$），测量过程把大量动能"注入"粒子——典型能量 $\sim\hbar^2/m\varepsilon^2$，对应 $n\sim a/\varepsilon$。测量不是被动地读出一个数，它改变了体系。`}</Tx>
        <Box kind="warning" title="一个更尖锐的细节：平均能量是无穷大">{R`由 \eqref{AIII-32}，大 $n$ 时 $\mathcal P(E_n)\propto1/n^2$，而 $E_n\propto n^2$，所以 $\sum_n\mathcal P(E_n)E_n$ 发散。这不是计算错误：窗口函数在边缘有跳变，带跳变的波函数动能期望值总是无穷大。真实仪器的"窗口"边缘是光滑的，平均能量有限但仍 $\sim\hbar^2/m\varepsilon^2$。教训与上面相同：测量后的态的细节（这里是窗口的形状）会进入物理预言，不能随手理想化。`}</Box>
      </Sub>
    </Sec>);
}
