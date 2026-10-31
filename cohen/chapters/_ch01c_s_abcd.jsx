// 补充材料 A_I – D_I：量级估计与 Heisenberg 关系（式 AI-1 … DI-7）
// 讲法：每节按"问题 → 核心想法 → 计算 → 诠释 → 易错点"组织，顺序不跟随原书。
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { DeBroglieCalc, AtomEnergyPlot, FringePlot } from "./_ch01c_plots.jsx";
import { DoubleSlitPlateFig } from "./_ch01c_figs.jsx";

const R = String.raw;
const AD = R`\sym{aD}{a}`;          // D_I 的缝距
const TT = R`\sym{Ttemp}{T}`;       // A_I 的温度

// ======================================================================
// A_I
// ======================================================================
export function SecA() {
  return (
    <Sec n="AI" title="Order of magnitude of the wavelengths associated with material particles" zh="物质粒子的波长有多大"
      gist={R`把 $\lambda=h/p$ 代入几种典型粒子：尘埃 $\sim10^{-16}\,\mathrm m$（毫无意义），热中子与百伏电子 $\sim1\,\mathrm{\mathring A}$（恰好是晶格间距），GeV 电子 $\sim1\,$fermi（核的尺度）。`}
      why={R`波动性"看得见"的前提是波长不小于实验装置的特征尺度；只有算出具体数字，才知道量子效应在哪里重要、在哪里可以放心忽略。`}
      gives={["AI-1", "AI-4", "AI-8", "AI-10", "AI-11"]}>
      <p className="muted">本节概念：<C id="debroglie" /> · <C id="wavepacket" /></p>
      <Tx>{R`**一把尺子的比喻。**任何波都只能"感知"比自己波长大的结构：可见光看不清病毒，X 射线却能显出晶格。物质粒子也一样——它伴随的波长就是它"看"世界的刻度。所以判断量子效应是否重要，只需做一件事：算出波长，拿去和问题里的特征长度比一比。

**我们手里的公式只有一条。**`}</Tx>
      <Eq n="AI-1" keyEq title="de Broglie 关系" say="波长与动量成反比：动量越小（质量轻、跑得慢），伴随的波就越长，波动效应越容易显露。">{R`\lambda=\frac{h}{p}`}</Eq>
      <Tx>{R`难点不在公式，而在于**怎样由实验给定的量得到 $p$**。实验里通常知道的是速度、温度、加速电压或束流能量，四种换算各有适用范围。下面分门别类处理，最后用一个交互计算器把它们放在同一张图上对比。`}</Tx>

      <Sub n="AI-a" title="Given the speed: macroscopic bodies" zh="已知速度：宏观物体为何没有波动性">
        <Tx>{R`最直接的情形是 $p=mv$。挑一个"已经很小"的宏观物体——直径 $1\,\mu$ 的尘埃，$m\simeq10^{-15}\,\mathrm{kg}$——并故意让它慢到 $v\simeq1\,\mathrm{mm/s}$，看看能把波长拉到多长：`}</Tx>
        <Eq n="AI-2" say="尘埃的波长只有约 $10^{-16}$ 米，比它自身小十个数量级：宏观物体的波动性在任何实验里都无从察觉。">{R`\lambda\simeq\frac{6.6\times10^{-34}}{10^{-15}\times10^{-3}}\ \text{meter}=6.6\times10^{-16}\ \text{meter}=6.6\times10^{-6}\ \mathrm{\mathring A}`}</Eq>
        <Tx>{R`结果比原子核还小一个量级、比尘埃本身小十个量级。即使在这么"照顾"的条件下，波动性也毫无踪迹——经典力学在宏观世界的成功并不需要额外解释，它只是 $h$ 太小的直接后果。

能不能干脆让尘埃再慢一点？要使 $\lambda$ 涨到尘埃直径 $1\,\mu$，速度得降到 $10^{-9}\,\mathrm{mm/s}$ 左右，也就是每秒挪动百万分之一微米。现实中不可能把一粒尘埃的速度控制在这样的上限以下，所以哪怕它"静止"放着，其波长相对尺寸也仍可忽略。（形式上 $v\to0$ 时 $\lambda\to\infty$，但这一极限在宏观世界里无法实现。）`}</Tx>
      </Sub>

      <Sub n="AI-b" title="Given the temperature: thermal neutrons" zh="已知温度：热中子">
        <Tx>{R`反应堆引出的中子与慢化剂达到热平衡，能量由温度 $${TT}$ 刻画。热平衡的平均平动动能是 $\frac32k_B${TT}$，于是可以把它当作动能来定动量（$m_n\simeq1.67\times10^{-27}\,\mathrm{kg}$）：`}</Tx>
        <Eq n="AI-3" say="热平衡下，粒子的平均平动动能是 $\frac32k_BT$；据此可以定出热中子的典型速率和动量。">{R`\frac12m_nv^2=\frac{p^2}{2m_n}\simeq\frac32\,k_B${TT}`}</Eq>
        <Eq n="AI-4" say="热中子的波长只取决于中子质量和温度：温度越低，中子越慢，波长越长。">{R`\lambda=\frac hp=\frac{h}{\sqrt{3m_nk_B${TT}}}`}</Eq>
        <Tx>{R`$\lambda\propto${TT}^{-1/2}$：冷中子源把慢化剂降到二三十开，就是为了换来更长的波长。室温 $${TT}\simeq300\,\mathrm K$ 时：`}</Tx>
        <Eq n="AI-5" say="室温中子的波长约 1.4 埃，正好与晶体中原子间距同量级，所以中子束打到晶体上会出现与 X 射线类似的衍射。">{R`\lambda\simeq1.4\ \mathrm{\mathring A}`}</Eq>
        <Tx>{R`这个数字妙在"恰好"——它落在固体中相邻原子的间距上。于是热中子束遇到晶体会像 X 射线那样衍射，这是中子散射成为研究晶体与磁结构利器的根本原因。`}</Tx>
      </Sub>

      <Sub n="AI-c" title="Given the accelerating voltage: electrons" zh="已知加速电压：电子">
        <Tx>{R`电子由电场加速，直接给定的是电势差 $V$（伏）。电荷 $q=1.6\times10^{-19}\,\mathrm C$ 走过 $V$ 伏，得到动能`}</Tx>
        <Eq n="AI-6" say="电子经 V 伏电势差加速，获得的动能等于电荷乘以电势差，数值上是 1.6e-19 乘以 V 焦耳（即 V 电子伏）。">{R`E=qV=1.6\times10^{-19}\,V\ \text{joule}`}</Eq>
        <Tx>{R`只要速度远小于光速，就用非相对论的 $E=p^2/2m_e$ 反解动量：`}</Tx>
        <Eq n="AI-7" say="非相对论粒子：由动能反解出动量 $\sqrt{2mE}$，再用 de Broglie 关系得到波长。">{R`\lambda=\frac hp=\frac{h}{\sqrt{2m_eE}}`}</Eq>
        <Tx>{R`把 $h$、$m_e\simeq0.9\times10^{-30}\,\mathrm{kg}$、$q$ 的数值一次代完，剩下的只有 $V$——这就是实验室里人人会背的速算式：`}</Tx>
        <Eq n="AI-8" keyEq title="电子波长速算式" say="加速电压为 V 伏的电子，波长约为 12.3 除以根号 V 埃：几百伏的电子波长就与 X 射线相当。">{R`\lambda=\frac{6.6\times10^{-34}}{\sqrt{2\times0.9\times10^{-30}\times1.6\times10^{-19}\,V}}\ \text{meter}\simeq\frac{12.3}{\sqrt V}\ \mathrm{\mathring A}`}</Eq>
        <Tx>{R`$V=150$ 伏给出 $1\,\mathrm{\mathring A}$，几百伏便进入 X 射线的波长范围：Davisson–Germer 实验用的正是这个能区，晶体或晶粉都能把电子衍射出环纹。`}</Tx>
      </Sub>

      <Sub n="AI-d" title="Given the beam energy: relativistic electrons" zh="已知束流能量：相对论电子">
        <Tx>{R`加速器把电子推到 $1\,\mathrm{GeV}=10^9\,\mathrm{eV}$ 以上轻而易举，可电子的静能只有 $m_ec^2\simeq0.5\times10^6\,\mathrm{eV}$——动能是静能的两千倍，电子几乎以光速飞行，$E=p^2/2m$ 彻底失效（本书的非相对论量子力学在这里也不再适用）。

好在描写"波"的两条基本关系不依赖速度大小：`}</Tx>
        <Box kind="warning" title="勘误：两处丢失的小数点">{R`原书本页印作 "$1\,\mathrm{eV}=16\times10^{-19}$ joule" 与 "$m_ec^2\simeq05\times10^6\,\mathrm{eV}$"，显然是排版丢了小数点：应为 $1.6\times10^{-19}\,\mathrm J$ 与 $0.5\times10^6\,\mathrm{eV}$（前文式 (AI-6)、(AI-8) 用的正是 $1.6\times10^{-19}$）。正文已直接写正确值。`}</Box>
        <Eq n="AI-9a" say="能量与频率成正比（Planck–Einstein 关系），相对论下同样成立。">{R`E=h\nu`}</Eq>
        <Eq n="AI-9b" say="波长与动量成反比（de Broglie 关系），相对论下同样成立。">{R`\lambda=\frac hp`}</Eq>
        <Tx>{R`需要替换的只是"由能量求动量"那一步。总能量（含静能）与动量满足`}</Tx>
        <Eq n="AI-10" say="相对论粒子的总能量由动量项和静能项按勾股定理合成；动量很大时静能可以忽略，E 约等于 pc。">{R`E=\sqrt{p^2c^2+m_0^2c^4}`}</Eq>
        <Tx>{R`GeV 电子的静能项可以扔掉，$p\simeq E/c$：`}</Tx>
        <Eq n="AI-11" say="1 GeV 电子的波长约 1.2 费米，与原子核同量级：用这样的电子束可以“看清”核与质子的内部结构。">{R`\lambda\simeq\frac{hc}{E}=\frac{6.6\times10^{-34}\times3\times10^{8}}{1.6\times10^{-10}}\ \mathrm m=1.2\times10^{-15}\ \mathrm m=1.2\ \text{fermi}`}</Eq>
        <Tx>{R`（1 fermi $=10^{-15}$ m。）这正是核的尺寸，所以高能电子散射成了探测核与质子内部结构的"显微镜"。若在这里硬套 \eqref{AI-7}，会得到约 39 fermi，错 30 多倍。`}</Tx>
      </Sub>

      <DeBroglieCalc />

      <Box kind="warning" title="三个常见误区">{R`**误区一：先求频率，再用 $c/\nu$。**对 $m_0\neq0$ 的粒子，由 \eqref{AI-9a} 得到 $\nu$ 后仿照光波取 $\lambda=c/\nu$ 是错的——物质波的相速度不是 $c$。永远走"能量 → 动量 → $\lambda=h/p$"这条路（计算器第三行给出了这种错误做法的数值）。

**误区二：给频率与相速度赋予物理意义。**$\nu=E/h$ 随能量零点而变（整体加一个常数势能，$\nu$ 就变了），相速度 $V_\varphi=\omega/k=\nu\lambda$ 也随之变化，而能量零点只是约定。不受影响的是群速度 $V_G=\mathrm d\omega/\mathrm dk=2\pi\,\mathrm d\nu/\mathrm dk$，它只含能量差——所以粒子的速度要用群速度来代表（正文 \mainref{C-31}）。

**误区三：以为"足够慢"总能让宏观物体显出波动性。**见 §AI-a 末尾的估算：原则上可以，实践上做不到。`}</Box>
      <Tx>{R`**带走什么。**波长回答的是"波动性能否被看见"。但即使波长极短，量子力学还对位置与动量**同时**的确定程度设了另一道限制，它在宏观与微观世界中的分量也需要用数字来衡量——这是下一节的事。`}</Tx>
    </Sec>);
}

// ======================================================================
// B_I
// ======================================================================
export function SecB() {
  return (
    <Sec n="BI" title="Constraints imposed by the uncertainty relations" zh="不确定关系的约束有多强"
      gist={R`同一条 $\Delta x\cdot\Delta p\gtrsim\hbar$：对尘埃要求的相对精度是 $10^{-8}$，实际仪器远达不到，故毫无约束；对原子中的电子，它要求 $\frac{\Delta x}{r}\frac{\Delta p}{p}\gtrsim\frac1n$，直接否定了低量子数 Bohr 轨道的"轨迹"图像。`}
      why={R`不确定关系是普适的，但它"咬人"的程度取决于 $\hbar$ 与系统作用量 $rp$ 的比值——估一估这个比值，就知道何时必须放弃经典轨道。`}
      gives={["BI-1", "BI-3", "BI-8"]}>
      <p className="muted">本节概念：<C id="uncertainty" /> · <C id="debroglie" /></p>
      <Tx>{R`**判据先行。**把不确定关系（正文 \mainsec{C-3}）写成量级形式：`}</Tx>
      <Eq n="BI-1" keyEq title="Heisenberg 不确定关系（量级形式）" say="位置的不确定度与动量的不确定度之积至少是约化 Planck 常数的量级：把一个压得越准，另一个就越散。">{R`\Delta x\cdot\Delta p\gtrsim\hbar`}</Eq>
      <Tx>{R`它限制的是绝对精度，而我们关心的是**相对**精度：若系统的典型尺度为 $L$、典型动量为 $P$，两边除以 $LP$ 就得到 $\frac{\Delta x}{L}\cdot\frac{\Delta p}{P}\gtrsim\frac{\hbar}{LP}$。右边这个无量纲数——$\hbar$ 与系统特征作用量之比——就是不确定关系的"分量"。比值极小，约束形同虚设；比值接近 1，经典描写必然崩溃。下面用两个端点的例子把这把尺子校准一下。`}</Tx>

      <Sub n="BI-1" title="Macroscopic system" zh="一端：尘埃">
        <Tx>{R`取 $\mathrm{A}_{\rm I}$ 的尘埃，速度 $10^{-3}\,\mathrm{m/s}$：`}</Tx>
        <Eq n="BI-2" say="尘埃的动量约为 1e-18 焦·秒/米。">{R`p=mv\simeq10^{-18}\ \text{joule}\ \text{sec/m}`}</Eq>
        <Tx>{R`现在提一个苛刻的要求：把它的位置定到 $0.01\,\mu$，比它自身尺寸精细一百倍。不确定关系强加的动量弥散只有`}</Tx>
        <Eq n="BI-3" say="把尘埃位置定到 0.01 微米，动量只需弥散 1e-26 量级——只占动量本身的一亿分之一，远低于任何仪器的分辨能力。">{R`\Delta p\simeq\frac{\hbar}{\Delta x}\simeq\frac{10^{-34}}{10^{-8}}=10^{-26}\ \text{joule}\ \text{sec/m}`}</Eq>
        <Tx>{R`即相对精度 $10^{-8}$。没有哪台动量测量装置能分辨这样的差别，所以对尘埃而言，不确定关系是一条**永远碰不到的边界**。换成波包的语言：我们可以构造一个 $\Delta x$、$\Delta p$ 同时小到可以忽略的波包，它的峰就是尘埃"所在之处"，峰按经典轨道运动。经典力学由此作为一个极限出现，而不是与量子力学并列的另一套理论。`}</Tx>
      </Sub>

      <Sub n="BI-2" title="Microscopic system" zh="另一端：Bohr 轨道">
        <Tx>{R`Bohr 模型把原子里的电子当作沿圆轨道运动的经典粒子，只是额外规定了哪些轨道"允许"，例如`}</Tx>
        <Eq n="BI-4" say="Bohr 量子化：轨道半径乘动量（即角动量）只能取约化 Planck 常数的整数倍。">{R`pr=n\hbar`}</Eq>
        <Tx>{R`（$n$ 为整数）。有意思的是，这条规则恰好把上面那个"分量"变成了 $\hbar/rp=1/n$——不用代任何数字就能下结论。

具体地说，"电子在半径 $r$ 的圆上以动量 $p$ 运动"这句话要有意义，位置和动量的弥散都得远小于它们本身：`}</Tx>
        <Eq n="BI-5a" say="谈轨道的前提之一：位置弥散远小于轨道半径。">{R`\Delta x\ll r`}</Eq>
        <Eq n="BI-5b" say="谈轨道的前提之二：动量弥散远小于动量本身。">{R`\Delta p\ll p`}</Eq>
        <Eq n="BI-6" say="经典轨道图像要求相对位置误差与相对动量误差的乘积远小于 1。">{R`\frac{\Delta x}{r}\cdot\frac{\Delta p}{p}\ll1`}</Eq>
        <Tx>{R`另一方面，把 \eqref{BI-1} 改写成相对形式，`}</Tx>
        <Eq n="BI-7" say="不确定关系的相对形式：两个相对误差之积不小于 ħ 与作用量 rp 之比。">{R`\frac{\Delta x}{r}\cdot\frac{\Delta p}{p}\gtrsim\frac{\hbar}{rp}`}</Eq>
        <Tx>{R`再用 Bohr 条件消去 $rp$：`}</Tx>
        <Eq n="BI-8" say="对第 n 个 Bohr 轨道，两个相对误差之积至少是 1/n：只有 n 很大时，经典轨道的说法才可能自洽。">{R`\frac{\Delta x}{r}\cdot\frac{\Delta p}{p}\gtrsim\frac1n`}</Eq>
        <Tx>{R`\eqref{BI-6} 要求乘积远小于 1，\eqref{BI-8} 却说它至少是 $1/n$。对基态 $n=1$ 两者正面冲突；只有 $n\gg1$ 时才可能兼容。结论是：低激发态的"Bohr 轨道"不是近似不够好，而是这个概念本身与量子力学不相容。第 VII 章会用波函数重新处理氢原子；紧接着的 $\mathrm{C}_{\rm I}$ 则展示，不要轨道、只用不确定关系，就已经能估出原子的大小。`}</Tx>
        <Box kind="physics" title="对应原理的一个视角">{R`$\hbar/rp=1/n$ 说明：量子数越大，系统的作用量相对 $\hbar$ 越大，经典图像越可信。这正是 Bohr 对应原理"大量子数时回到经典"的一种定量表述。`}</Box>
      </Sub>
    </Sec>);
}

// ======================================================================
// C_I
// ======================================================================
export function SecC() {
  return (
    <Sec n="CI" title="Heisenberg relation and atomic parameters" zh="用不确定关系估算氢原子"
      gist={R`电子被关在尺度 $r_0$ 内 ⇒ 动能至少 $\hbar^2/2mr_0^2$；与势能 $-e^2/r_0$ 折中，$E(r_0)$ 的极小值恰好给出 Bohr 半径 $a_0=\hbar^2/me^2$ 与基态能量 $-me^4/2\hbar^2$。`}
      why={R`经典力学里电子"掉进"核里能量更低，原子不可能稳定；不确定关系提供了阻止坍缩的"零点动能"，这是原子存在的根本原因。`}
      gives={["CI-2", "CI-4", "CI-5", "CI-6", "CI-7", "CI-11"]}>
      <p className="muted">本节概念：<C id="zero_point" /> · <C id="uncertainty" /></p>
      <Tx>{R`**先把难题摆出来。**质子固定在原点，电子与它相距 $r$ 时势能为`}</Tx>
      <Eq n="CI-1" say="电子在质子 Coulomb 场中的势能：与距离成反比、为负，距离越近越低。">{R`V(r)=-\frac{q^2}{4\pi\varepsilon_0}\frac1r`}</Eq>
      <Tx>{R`（$-q$ 为电子电荷。）为了不拖着 $4\pi\varepsilon_0$ 走，定义`}</Tx>
      <Eq n="CI-2" say={R`把 SI 单位里的 $q^2/4\pi\varepsilon_0$ 简记为 $e^2$，于是 Coulomb 势能写成 $-e^2/r$（数值上 $e^2\simeq14.4\,\mathrm{eV\,\mathring A}$）。`}>{R`\frac{q^2}{4\pi\varepsilon_0}=e^2`}</Eq>
      <Tx>{R`如果电子是经典粒子，沿半径 $r_0$ 的圆轨道运动，它的势能是`}</Tx>
      <Eq n="CI-8" say={R`经典圆轨道上电子的势能：$-e^2/r_0$。`}>{R`V_{cl}=-\frac{e^2}{r_0}`}</Eq>
      <Tx>{R`动能由"Coulomb 引力 $=$ 向心力"决定：`}</Tx>
      <Eq n="CI-9" say="Coulomb 引力恰好提供圆周运动所需的向心力。">{R`\frac{e^2}{r_0^2}=m\frac{v^2}{r_0}`}</Eq>
      <Eq n="CI-10" say="经典圆轨道上的动能等于势能绝对值的一半，且随 r0 减小而增大的方式（1/r0）与势能相同。">{R`T_{cl}=\frac12mv^2=\frac12\frac{e^2}{r_0}`}</Eq>
      <Eq n="CI-11" say={R`经典总能量 $-e^2/2r_0$ 随 $r_0\to0$ 单调趋于负无穷：没有任何东西阻止电子落入核中。`}>{R`E_{cl}=T_{cl}+V_{cl}=-\frac12\frac{e^2}{r_0}`}</Eq>
      <Tx>{R`问题就在这里：动能与势能**都按 $1/r_0$ 变化**，总能量是一条一路向下、没有底的曲线。轨道越小越"划算"，电子应当坠入核内，结合能无穷大。（何况按经典电动力学，做圆周运动的电子还在不断辐射——稳定轨道从一开始就不存在。）经典物理无法解释为什么世界上有原子。

**量子力学换掉了哪一项？**势能的估计不必改：若电子的波函数球对称、主要分布在半径 $r_0$ 以内（$2r_0$、$3r_0$ 之外几乎为零），平均势能仍是`}</Tx>
      <Eq n="CI-3" say={R`电子分布在半径约 $r_0$ 的区域内时，平均势能约为 $-e^2/r_0$：分布越紧，势能越低。`}>{R`\overline V\simeq-\frac{e^2}{r_0}`}</Eq>
      <Tx>{R`真正改变的是动能。经典动能来自"绕圈的速度"，可以随意调；量子动能却有一个**由局域化本身强加的下限**：电子被限制在线度 $r_0$ 内，动量必然弥散 $\Delta p\gtrsim\hbar/r_0$。哪怕平均动量为零，动量平方的平均也不为零：`}</Tx>
      <Eq n="CI-4" say={R`把电子限制在 $r_0$ 范围内，动量至少弥散 $\hbar/r_0$，因此平均动能至少约为 $\hbar^2/2mr_0^2$：关得越紧，动能越大。`}>{R`\overline T\gtrsim\overline T_{min}=\frac1{2m}(\Delta p)^2\simeq\frac{\hbar^2}{2mr_0^2}`}</Eq>
      <Tx>{R`关键在于幂次：这项随 $1/r_0^2$ 增长，比势能的 $1/r_0$ 快。小尺度上它占上风，把能量曲线"撑"了起来。与不确定关系相容的最低能量于是是`}</Tx>
      <Eq n="CI-5" keyEq title="能量折中函数" say={R`总能量的估计 $=$ 局域化动能（随 $r_0$ 减小按 $1/r_0^2$ 增大）+ Coulomb 势能（按 $-1/r_0$ 减小）：两者竞争，必有一个最佳 $r_0$。`}>{R`E_{min}=\overline T_{min}+\overline V=\frac{\hbar^2}{2mr_0^2}-\frac{e^2}{r_0}`}</Eq>
      <Derivation title="求极小值" steps={[
        { tex: R`\frac{\mathrm dE_{min}}{\mathrm dr_0}=-\frac{\hbar^2}{mr_0^3}+\frac{e^2}{r_0^2}=0`, why: R`对 $r_0$ 求导令其为零。` },
        { tex: R`r_0=\frac{\hbar^2}{me^2}`, why: R`二阶导数 $3\hbar^2/mr_0^4-2e^2/r_0^3=\hbar^2/mr_0^4>0$，确为极小。` },
        { tex: R`E_{min}\big|_{r_0=a_0}=\frac{\hbar^2}{2m}\frac{m^2e^4}{\hbar^4}-e^2\frac{me^2}{\hbar^2}=-\frac{me^4}{2\hbar^2}`, why: R`代回：动能恰好是势能绝对值的一半（与位力定理一致）。` },
      ]} />
      <Eq n="CI-6" keyEq title="Bohr 半径" say={R`动能与势能折中的最佳尺度就是 Bohr 半径 $a_0=\hbar^2/me^2\simeq0.53\,\mathrm{\mathring A}$，它给出氢原子大小的量级。`}>{R`r_0=a_0=\frac{\hbar^2}{me^2}`}</Eq>
      <Eq n="CI-7" say={R`折中后的最低能量是 $-me^4/2\hbar^2\simeq-13.6\,\mathrm{eV}$，正是氢原子的基态能量（电离能）。`}>{R`E_0=-\frac{me^4}{2\hbar^2}`}</Eq>
      <AtomEnergyPlot />
      <Tx>{R`**数字与分寸。**$e^2\simeq14.4\,\mathrm{eV\,\mathring A}$、$\hbar^2/m\simeq7.62\,\mathrm{eV\,\mathring A^2}$ 给出 $a_0\simeq0.53\,\mathrm{\mathring A}$、$E_0\simeq-13.6\,\mathrm{eV}$——与 Bohr 第一轨道、与第 VII 章精确求解的基态（波函数 $\mathrm e^{-r/a_0}$）分毫不差。但别被这份"精确"骗了：推导里每一步都是"$\simeq$""$\gtrsim$"，$\Delta p$ 取 $\hbar/r_0$ 还是 $\hbar/2r_0$ 都会改变数字因子，吻合是幸运的巧合。

值得记住的是机制：**原子的大小是局域化动能与 Coulomb 势能之间的妥协，而这种妥协只在量子力学里存在。**从这个意义上说，正是不确定关系让原子得以存在。同样的论证换上不同的"势能"，可以估算核子在核中的动能、白矮星的半径、分子振动的零点能——这是物理学家最常用的估算手法之一。`}</Tx>
    </Sec>);
}

// ======================================================================
// D_I
// ======================================================================
export function SecD() {
  return (
    <Sec n="DI" title="An experiment illustrating the Heisenberg relations" zh="可动缝板实验：互补性与不确定关系"
      gist={R`用"测缝板反冲"来判断光子走了哪条缝：要分辨两种反冲，板动量需准到 $\Delta p\ll|p_2-p_1|\simeq\frac h\lambda\frac ad$；于是板位置弥散 $\Delta x\gtrsim\lambda d/a$——恰是条纹间距，干涉条纹被抹平。`}
      why={R`这是对互补性最"狡猾"的挑战之一。破解它必须把量子力学同样用于宏观的缝板——说明量子理论不能只对光成立而对物质不成立。`}
      gives={["DI-3", "DI-4", "DI-6", "DI-7"]}>
      <p className="muted">本节概念：<C id="complementarity" /> · <C id="uncertainty" /></p>
      <Tx>{R`**一个挑战。**正文 \mainsec{A-2} 的双缝实验留下一条规矩：路径信息与干涉条纹不可兼得——原书称两个侧面是"互补的"（complementary）。正文的办法是在缝后放探测器直接吸收光子，条纹被破坏并不意外。那么，能不能设计一种**不碰光子本身**的"温柔"测量？

**巧妙的方案。**光子穿过某条缝后要偏转才能到达屏上的点 $M$，偏转意味着它的竖直动量变了，差额由缝板吸收。让缝板 $\mathscr P$ 挂在弹簧上、能竖直滑动，测出它的反冲，就能知道光子从哪条缝来——光子本身完好无损地到达屏上，继续参与累积条纹。`}</Tx>
      <DoubleSlitPlateFig />
      <Tx>{R`两种路径对应的反冲（$h\nu/c$ 为光子动量，$\theta_1,\theta_2$ 是 $F_1M$、$F_2M$ 相对入射方向的偏角）：`}</Tx>
      <Eq n="DI-1" say={R`光子从上缝 $F_1$ 飞向 $M$ 时偏转 $\theta_1$，获得竖直动量；板反冲同样大小、反向的动量。`}>{R`p_1=-\frac{h\nu}{c}\sin\theta_1`}</Eq>
      <Eq n="DI-2" say={R`若光子从下缝 $F_2$ 飞向同一点 $M$，偏转角为 $\theta_2$，板的反冲动量相应不同。`}>{R`p_2=-\frac{h\nu}{c}\sin\theta_2`}</Eq>
      <Tx>{R`它们相差多少？取缝距 $${AD}$、板屏距离 $d\gg${AD}$，屏上落点坐标为 $x$，小角近似下`}</Tx>
      <Eq n="DI-5" say="小角近似下，两缝到 M 的连线与入射方向的夹角，分别由 M 相对上、下缝的高度差除以板屏距离给出。">{R`\begin{aligned}\sin\theta_1&\simeq\theta_1\simeq\frac{x-${AD}/2}{d}\\ \sin\theta_2&\simeq\theta_2\simeq\frac{x+${AD}/2}{d}\end{aligned}`}</Eq>
      <Tx>{R`两角之差与 $x$ 无关，等于 $${AD}/d$，于是（$\lambda=c/\nu$）`}</Tx>
      <Eq n="DI-6" say={R`两种反冲之差与落点无关，约为 $h/\lambda$ 乘以缝距与板屏距离之比。`}>{R`|p_2-p_1|\simeq\frac{h\nu}{c}|\theta_2-\theta_1|\simeq\frac h\lambda\frac{${AD}}{d}`}</Eq>
      <Tx>{R`**漏洞在哪里？**上面的方案默认缝板是经典物体：它的动量可以测得任意准，位置也同时确定。可缝板也由原子组成，同样服从不确定关系。要从反冲读出路径，板的动量本底必须足够"干净"：`}</Tx>
      <Eq n="DI-3" say="要靠反冲判断路径，板动量的不确定度必须远小于两种可能反冲之差。">{R`\Delta p\ll|p_2-p_1|`}</Eq>
      <Tx>{R`代价立刻随之而来——板的竖直位置变得模糊：`}</Tx>
      <Eq n="DI-4" say="板的动量被测得越准，它的位置就越不确定：位置弥散至少是 h 除以两种反冲之差。">{R`\Delta x\gtrsim\frac{h}{|p_2-p_1|}`}</Eq>
      <Tx>{R`代入 \eqref{DI-6}：`}</Tx>
      <Eq n="DI-7" keyEq title="路径信息的代价" say={R`能分辨路径的缝板，其位置弥散至少是 $\lambda d/a$——恰好等于屏上的条纹间距，于是条纹被完全抹平。`}>{R`\Delta x\gtrsim\frac{\lambda d}{${AD}}`}</Eq>
      <Tx>{R`右边恰好是双缝条纹的间距。缝的位置弥散超过一个条纹周期，意味着每个光子对应的条纹图样都随机平移了至少一个周期；成千上万个光子叠加，亮纹填满暗纹，屏上只剩两条单缝强度之和。方案失败了，而且失败得"刚刚好"——不是因为仪器做得不够好，而是因为量子力学本身。下面的交互图把这种此消彼长做成了连续的权衡。`}</Tx>
      <FringePlot />
      <Box kind="key" title={R`教训：量子理论必须"一视同仁"`}>{R`假如缝板可以被当成经典物体，这个装置就能同时给出路径与条纹，光的互补性——进而整个辐射的量子理论——就会被推翻。反之，只量子化物质而不量子化辐射，也会撞上类似的矛盾。量子力学要自洽，就必须对**一切**物理系统成立，包括我们拿来做测量的宏观仪器。`}</Box>
    </Sec>);
}
