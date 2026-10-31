// §B 物质粒子与物质波 —— 式 (B-1)–(B-12)
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";

const R = String.raw;

export function SecB() {
  return (
    <Sec n="B" title="Material particles and matter waves" zh="物质粒子与物质波"
      gist={R`de Broglie：物质粒子也伴随波，$E=\hbar\omega$、$\mathbf p=\hbar\mathbf k$、$\lambda=h/|\mathbf p|$。把 §A 的规则搬过来：粒子的态是波函数 $\psi(\mathbf r,t)$，$|\psi|^2$ 是概率密度，测量服从谱分解，演化服从 Schrödinger 方程。`}
      why={R`原子光谱的分立谱线说明原子能量是量子化的，而经典力学对此无能为力。若物质也是波，被束缚的波只能取分立的"模式"，量子化就水到渠成。`}
      gives={["B-1", "B-3", "B-4", "B-6", "B-8", "B-12"]}>
      <p className="muted">本节概念：<C id="debroglie" /> · <C id="wavefunction" /> · <C id="spectral" /> · <C id="collapse" /></p>

      <Sub n="B-1" title="The de Broglie relations" zh="de Broglie 关系">
        <Tx>{R`**从一个谜题出发。**加热的氢气发出的光，经棱镜分开后不是一条连续彩带，而是几条细线。每条线是一种确定能量的光子。最省事的解释是：原子自身只能处在一串分立的能量 $E_1,E_2,\dots$ 上，发光就是在两级之间"跳"一下，多出来的能量交给一个光子。能量守恒立刻给出谱线频率：`}</Tx>
        <Eq n="B-1" say="原子在两个能级之间跃迁时，发射或吸收的光子能量恰好等于两能级之差——所以谱线是分立的。">{R`h\,\nu_{ij}=|E_i-E_j|`}</Eq>
        <Tx>{R`Franck–Hertz 实验用电子撞原子，独立地看到了同样的能级。Bohr 和 Sommerfeld 写下了挑选"允许轨道"的规则，对氢原子算得很准——可是为什么只有这些轨道被允许，没人说得出道理。

**de Broglie 的想法（1923）。**把问题倒过来看：被束缚在有限区域里的**波**天然只有分立的振动模式，就像两端固定的弦只能发出基音和泛音。那么如果电子也是一种波，原子的能级不就是它的"简正模"吗？他假设光子的那对关系对一切粒子都成立：`}</Tx>
        <Eq n="B-2" say="把光子的 Planck–Einstein 关系原封不动地用到物质粒子上：粒子的能量对应波的频率，动量对应波矢。">{R`\left\{\begin{aligned}E&=h\nu=\hbar\omega\\ \mathbf p&=\hbar\mathbf k\end{aligned}\right.`}</Eq>
        <Tx>{R`由此每个动量为 $\mathbf p$ 的粒子都有一个波长：`}</Tx>
        <Eq n="B-3" keyEq title="de Broglie 波长" say="粒子的波长等于 Planck 常数除以动量：动量越大，波长越短；宏观物体动量巨大，波长小到无从观测。">{R`\lambda=\frac{2\pi}{|\mathbf k|}=\frac{h}{|\mathbf p|}\qquad\text{(de Broglie relation)}`}</Eq>
        <Tx>{R`沿着这条路，Bohr–Sommerfeld 规则可以被**推出**而不是被假设。四年后 Davisson 和 Germer 让电子束打在镍晶体上，得到了衍射图样，物质波从假设变成了实验事实。`}</Tx>
        <Box kind="physics" title="为什么日常看不到物质波？">{R`$h$ 太小。一个 $1$ g、以 $1$ cm/s 运动的小球：$\lambda=h/p\approx6.6\times10^{-34}/10^{-5}\approx7\times10^{-29}$ m，比原子核小十几个数量级，任何衍射装置都无能为力。而一个经 $100$ V 加速的电子：$p=\sqrt{2m_eeU}\approx5.4\times10^{-24}$ kg·m/s，$\lambda\approx1.2\times10^{-10}$ m——恰与晶体中原子间距相当，所以晶体能让电子衍射（Davisson–Germer 实验的道理）。各种粒子的 de Broglie 波长数量级见补充材料 A_I。`}</Box>
      </Sub>

      <Sub n="B-2" title="Wave functions. Schrödinger equation" zh="波函数与 Schrödinger 方程">
        <Tx>{R`**这一小节的方法很简单：照抄。**§A 为光子总结出了"态—概率—测量—演化"四条规则；既然电子也有波动性，就把每一条换成电子的版本（暂不考虑自旋，见第 IX 章）。下面逐条对照着写。

**态：从 6 个数到一个函数。**经典粒子的状态是位置和速度；对量子粒子，这个角色由**波函数** $\psi(\mathbf r,t)$ 接替——相当于光子的 $\mathbf E(\mathbf r,t)$，关于粒子能知道的一切都编码在里面。

**概率：模方是密度。**对光子我们说出现的概率 $\propto|\mathbf E|^2$。位置是连续变量，所以对电子要说的是"落在 $\mathbf r$ 附近一个小体积 $\mathrm d^3r$ 里的概率"，它与 $\mathrm d^3r$ 成正比，比例系数就是 $|\psi|^2$：`}</Tx>
        <Eq n="B-4" keyEq title="Born 的概率解释" say="在某点附近小体积内找到粒子的概率，等于波函数模方乘以体积（再乘一个归一化常数）：波函数模方就是概率密度。">{R`\mathrm d\mathscr P(\mathbf r,t)=C\,|\psi(\mathbf r,t)|^2\,\mathrm d^3r`}</Eq>
        <Tx>{R`$|\psi|^2$ 因此叫**概率密度**，$C$ 是一个保证总概率为 1 的常数，稍后定出。

**测量：照搬谱分解。**偏振实验里"本征结果、本征态、按本征态分解、系数模方给概率"这一套，现在推广到任何物理量。设该量的可能结果是 $\{a\}$，与 $a$ 对应的本征函数是 $\psi_a(\mathbf r)$——若测量时刻 $t_0$ 的波函数恰为 $\psi_a$，结果必然是 $a$。一般情形下先展开`}</Tx>
        <Eq n="B-5" say="把测量时刻的波函数写成该物理量各本征函数的线性组合，系数 $c_a$ 是对应本征态的“分量”。">{R`\psi(\mathbf r,t_0)=\sum_a c_a\,\psi_a(\mathbf r)`}</Eq>
        <Tx>{R`（这一步就是 \eqref{A-10} 的推广，那里只有两个本征态。）然后得到 $a$ 的概率是`}</Tx>
        <Eq n="B-6" keyEq title="测得本征值 a 的概率" say="测得某个本征值的概率，等于对应系数的模方占全部系数模方之和的比例——分母保证所有概率加起来等于 1。">{R`\mathscr P_a=\frac{|c_a|^2}{\displaystyle\sum_a|c_a|^2}`}</Eq>
        <Tx>{R`分母只是把概率归一，使 $\sum_a\mathscr P_a=1$。测得 $a$ 之后，系统不再是原来的 $\psi$，而成了与 $a$ 对应的本征态——正如过了检偏器的光子变成 $\mathbf e_x$ 偏振：`}</Tx>
        <Eq n="B-7" say="测得结果 a 之后，波函数立即变成与 a 对应的本征函数——正如通过检偏器的光子变为沿透光轴偏振。">{R`\psi'(\mathbf r,t_0)=\psi_a(\mathbf r)`}</Eq>
        <Tx>{R`**演化：需要一个方程。**最后还缺 $\psi$ 随时间怎样变。这里我们不证明，而是**提出**一个方程，让它接受实验检验（第 III 章会更系统地讨论）；用 Planck 与 de Broglie 关系可以很自然地"猜"出它，猜法在下面的推导框里。对质量 $m$、处于势能 $V(\mathbf r,t)$ 中的粒子（"势"在量子力学里习惯上指势能，例如电势乘电荷）：`}</Tx>
        <Eq n="B-8" keyEq title="Schrödinger 方程" say="波函数随时间的变化率由两项决定：动能项（波函数的弯曲程度，即拉普拉斯算符）与势能项。方程对波函数是线性的、对时间是一阶的。">{R`i\hbar\frac{\partial}{\partial t}\psi(\mathbf r,t)=-\frac{\hbar^2}{2m}\,\sym{lap}{\Delta}\psi(\mathbf r,t)+V(\mathbf r,t)\,\psi(\mathbf r,t)`}</Eq>
        <Tx>{R`$\sym{lap}{\Delta}=\partial^2/\partial x^2+\partial^2/\partial y^2+\partial^2/\partial z^2$ 是拉普拉斯算符。`}</Tx>
        <Derivation title="Schrödinger 方程从哪里来（启发式，不是证明）" collapsed steps={[
{ tex: R`\psi=A\,\mathrm e^{i(\mathbf k\cdot\mathbf r-\omega t)}=A\,\mathrm e^{i(\mathbf p\cdot\mathbf r-Et)/\hbar}`, why: R`由 \eqref{B-2}，动量 $\mathbf p$、能量 $E$ 确定的自由粒子应对应一个单色平面波。` },
{ tex: R`i\hbar\,\partial_t\psi=E\,\psi,\qquad -i\hbar\nabla\psi=\mathbf p\,\psi,\qquad -\hbar^2\sym{lap}{\Delta}\psi=\mathbf p^2\psi`, why: R`对平面波，求时间导数"取出"能量，求空间梯度"取出"动量。` },
{ tex: R`E=\frac{\mathbf p^2}{2m}\ \Longrightarrow\ i\hbar\,\partial_t\psi=-\frac{\hbar^2}{2m}\sym{lap}{\Delta}\psi`, why: R`要求非相对论自由粒子的能量–动量关系对每个平面波都成立；方程对 $\psi$ 线性，所以对平面波的任意叠加也成立。` },
{ tex: R`E=\frac{\mathbf p^2}{2m}+V\ \Longrightarrow\ i\hbar\,\partial_t\psi=-\frac{\hbar^2}{2m}\sym{lap}{\Delta}\psi+V\psi`, why: R`有势场时把总能量换成动能加势能，得到 \eqref{B-8}。（这只是"猜"出方程的动机；方程的正确性由实验检验。）` },
]} />
        <Tx>{R`**这个方程的两个"形状特征"各有用处。**

◆ 它对 $\psi$ 是**线性齐次**的：两个解的任意线性组合还是解。叠加原理加上"$\psi$ 是概率幅"，正是电子也能产生干涉条纹的原因——和 §A 里光的情形一模一样。

◆ 它对时间是**一阶**的：给定某一时刻的 $\psi(\mathbf r,t_0)$，以后就被唯一确定。如果方程含 $\partial_t^2$，我们还得额外交代 $\partial_t\psi$，那 $\psi$ 就称不上"完整的态"了。

至此，光和物质用的是同一套语言：两者都必须借助量子概念、尤其是波粒二象性才能描述。`}</Tx>
        <Tx>{R`**收尾：把 $C$ 定下来。**一个粒子总得在某处，把所有体积元的概率加起来必须是 1：`}</Tx>
        <Eq n="B-9" say="粒子总得在某个地方：把所有体积元中找到它的概率加起来等于 1。">{R`\int\mathrm d\mathscr P(\mathbf r,t)=1`}</Eq>
        <Tx>{R`代入 \eqref{B-4}，这要求 $|\psi|^2$ 的全空间积分存在——这是对波函数的一条实质性限制：`}</Tx>
        <Eq n="B-10" say="波函数模方在全空间的积分必须是有限的——否则无法归一化，也就无法解释为概率。">{R`\int|\psi(\mathbf r,t)|^2\,\mathrm d^3r\quad\text{is finite}`}</Eq>
        <Tx>{R`满足它的函数叫**平方可积**函数。于是`}</Tx>
        <Eq n="B-11" say="归一化常数的倒数就是波函数模方的全空间积分。">{R`\frac1C=\int|\psi(\mathbf r,t)|^2\,\mathrm d^3r`}</Eq>
        <Tx>{R`实际计算中通常先把 $\psi$ 乘上一个常数使 $C=1$，即采用**归一化**的波函数：`}</Tx>
        <Eq n="B-12" keyEq title="归一化条件" say="归一化的波函数：模方在全空间的积分恰为 1，此时概率密度就是 $|\psi|^2$ 本身。">{R`\int|\psi(\mathbf r,t)|^2\,\mathrm d^3r=1`}</Eq>
        <Tx>{R`有人会担心：今天归一化了，明天还归一吗？下面的推导框说明，Schrödinger 方程自动保证这一点（$C$ 与时间无关）。`}</Tx>
        <Derivation title="补充：为什么归一化不随时间变化（V 为实函数）" collapsed steps={[
{ tex: R`\frac{\mathrm d}{\mathrm dt}\int|\psi|^2\mathrm d^3r=\int\left(\psi^*\partial_t\psi+\psi\,\partial_t\psi^*\right)\mathrm d^3r`, why: R`对 $|\psi|^2=\psi^*\psi$ 求时间导数。` },
{ tex: R`\partial_t\psi=\frac{i\hbar}{2m}\sym{lap}{\Delta}\psi-\frac{i}{\hbar}V\psi,\qquad \partial_t\psi^*=-\frac{i\hbar}{2m}\sym{lap}{\Delta}\psi^*+\frac{i}{\hbar}V\psi^*`, why: R`由 \eqref{B-8} 及其复共轭（$V$ 为实数）。` },
{ tex: R`\frac{\mathrm d}{\mathrm dt}\int|\psi|^2\mathrm d^3r=\frac{i\hbar}{2m}\int\left(\psi^*\sym{lap}{\Delta}\psi-\psi\,\sym{lap}{\Delta}\psi^*\right)\mathrm d^3r`, why: R`势能项 $\mp\frac i\hbar V|\psi|^2$ 恰好相消。` },
{ tex: R`=\frac{i\hbar}{2m}\oint\left(\psi^*\nabla\psi-\psi\nabla\psi^*\right)\cdot\mathrm d\mathbf S=0`, why: R`被积函数是散度 $\nabla\cdot(\psi^*\nabla\psi-\psi\nabla\psi^*)$；平方可积的 $\psi$ 在无穷远处足够快地趋于零，面积分为零。` },
]} result={R`$\int|\psi|^2\mathrm d^3r$ 守恒，$C$ 与时间无关：在非相对论量子力学中，粒子既不会凭空产生也不会消失。`} />
        <Box kind="physics" title="经典态与量子态：差在哪里">{R`经典粒子在某时刻由 $x,y,z;v_x,v_y,v_z$ 六个数描述，相继时刻的这些数连成一条轨道。量子粒子要用一个函数 $\psi(\mathbf r,t)$——空间每一点一个复数，等于无穷多个参数——而"轨道"的位置被"波的传播"取代。所以若用电子做双缝实验并看到条纹，再问"电子走了哪条缝"就没有意义：与它相联系的波同时经过了两条缝。`}</Box>
        <Box kind="aside" title="为什么物质粒子不会凭空出现或消失">{R`光子可以被发射、被吸收；而在本书的非相对论框架里，电子的数目是守恒的——灯丝发射的电子原本就在灯丝里，被计数器"吸收"的电子只是并入了原子或电流。上面推导的 $\int|\psi|^2$ 守恒就是这件事的数学表达。相对论会打破它（高能光子在原子核附近可以变成电子–正电子对，正电子遇上电子又会湮灭成光子），这也是建立相对论量子力学的主要难点之一；本书始终把时间和空间不对称地处理，停留在非相对论领域。`}</Box>
      </Sub>
    </Sec>);
}
