// 补充材料 G_I：一维高斯波包与波包扩散（式 GI-1 … GI-22）
import { Sec, Sub, Tx, Eq, Box, Derivation, C, FormulaMap } from "@kit";
import { FM_GI_16a, FM_GI_17 } from "./_ch01c_fmaps.jsx";
import { GaussSpreadPlot, GaussWidthPlot } from "./_ch01c_plots.jsx";

const R = String.raw;
const A = R`\sym{aG}{a}`;          // 高斯宽度参数
const AL = R`\sym{alG}{\alpha}`;   // 积分复参数
const XI = R`\sym{xiG}{\xi}`;      // 积分变量
const TH = R`\sym{thG}{\theta}`;   // 相位角
const PH = R`\sym{phG}{\varphi}`;  // 整体相位
const V0 = R`\sym{V0G}{V_0}`;      // 波包速度

export function SecG() {
  return (
    <Sec n="GI" title="One-dimensional Gaussian wave packet: spreading of the wave packet" zh="一维高斯波包与波包扩散"
      gist={R`高斯 $g(k)$ 让一切都能精确算出：$t=0$ 时 $\Delta x\cdot\Delta p=\hbar/2$（最小波包）；之后中心以 $\hbar k_0/m$ 匀速运动，宽度按 $\Delta x(t)=\frac{${A}}{2}\sqrt{1+4\hbar^2t^2/m^2${A}^4}$ 增长，晚期趋于经典粒子群的弥散 $\hbar|t|/m${A}$；动量分布始终不变。`}
      why={R`正文对波包的结论都是"量级"论证；这里给一个可以从头算到尾的例子，既验证那些结论，又揭示一个新现象——自由波包的扩散。`}
      gives={["GI-7", "GI-9", "GI-14", "GI-16a", "GI-17", "GI-19", "GI-20"]}>
      <p className="muted">本节概念：<C id="wavepacket" /> · <C id="spreading" /> · <C id="uncertainty" /></p>
      <Tx>{R`**先看结论，再看怎么来。**本节最重要的结果只有一行：一个初始宽度为 $${A}/2$ 的自由波包，$t$ 时刻的宽度是 $\frac{${A}}{2}\sqrt{1+4\hbar^2t^2/m^2${A}^4}$——它会越走越"胖"。这就是**波包扩散**（spreading），正文的量级论证看不到它。

为什么选高斯？因为正文 §C 的每一步都只给出"$\simeq$""$\gtrsim$"，没有一个能从头算到尾的例子来核对。高斯函数在 Fourier 变换与自由演化下都保持高斯形，于是积分全部可以精确完成。整个计算只用一个工具（复参数 Gauss 积分）和一个技巧（配方），我们先把工具备好。`}</Tx>

      <Sub n="GI-1" title="Definition of a Gaussian wave packet" zh="定义">
        <Tx>{R`一维模型中的自由粒子 [$V(x)\equiv0$]，$t=0$ 时的波函数取为`}</Tx>
        <Eq n="GI-1" say={R`以 $k_0$ 为中心、宽度约 $1/a$ 的高斯权重把平面波 $\mathrm e^{ikx}$ 叠加起来，得到 $t=0$ 的波包。`}>{R`\psi(x,0)=\frac{\sqrt{${A}}}{(2\pi)^{3/4}}\int_{-\infty}^{+\infty}\mathrm e^{-\frac{${A}^2}{4}(k-k_0)^2}\,\mathrm e^{ikx}\,\mathrm dk`}</Eq>
        <Tx>{R`换句话说，展开系数（动量空间的波函数）是`}</Tx>
        <Eq n="GI-2" say={R`Fourier 振幅是以 $k=k_0$ 为中心的高斯函数，前面的常数保证波函数归一。`}>{R`\frac1{\sqrt{2\pi}}g(k,0)=\frac{\sqrt{${A}}}{(2\pi)^{3/4}}\,\mathrm e^{-\frac{${A}^2}{4}(k-k_0)^2}`}</Eq>
        <Tx>{R`前面的常数只是为了归一化，形状才是要点：波数集中在 $k_0$ 附近、宽约 $1/${A}$ 的钟形里。

**工具：复参数的 Gauss 积分。**配方之后，所有积分都会化成这个样子：`}</Tx>
        <Eq n="GI-3" say={R`一类带复参数的高斯积分；为使其收敛，要求 $\mathrm{Re}\,\alpha^2>0$。`}>{R`I(${AL},\beta)=\int_{-\infty}^{+\infty}\mathrm e^{-${AL}^2(${XI}+\beta)^2}\,\mathrm d${XI}`}</Eq>
        <Tx>{R`这里 $${AL}$、$\beta$ 都允许是复数（只需 $\mathrm{Re}\,${AL}^2>0$ 保证收敛）。复的 $\beta$ 相当于把积分路线从实轴平移到一条平行线上；被积函数是整函数且在两端衰减，由 Cauchy 定理，平移不改变积分值：`}</Tx>
        <Eq n="GI-4" say={R`复平移 $\beta$ 不改变积分值：把积分路径在复平面上平移，被积函数在两端衰减，中间没有奇点。`}>{R`I(${AL},\beta)=I(${AL},0)`}</Eq>
        <Tx>{R`再作伸缩 $u=${AL}${XI}$（取 $-\pi/4<\mathrm{Arg}\,${AL}<\pi/4$ 的那个平方根，旋转后的路径同样可以转回实轴），`}</Tx>
        <Eq n="GI-5" say={R`把变量伸缩 $\alpha$ 倍，积分就除以 $\alpha$。`}>{R`I(${AL},0)=\frac1{${AL}}\,I(1,0)`}</Eq>
        <Tx>{R`最后一块是人人熟悉的 Gauss 积分（把它平方，写成平面上的二重积分再换极坐标）：`}</Tx>
        <Eq n="GI-6" say={R`标准高斯积分等于 $\sqrt\pi$（平方后在平面上换极坐标即可算出）。`}>{R`I(1,0)=\int_{-\infty}^{+\infty}\mathrm e^{-${XI}^2}\,\mathrm d${XI}=\sqrt\pi`}</Eq>
        <Tx>{R`三步合成一个公式，本节以后只用它：`}</Tx>
        <Eq n="GI-7" title="复 Gauss 积分" say={R`带复参数的高斯积分等于 $\sqrt\pi/\alpha$，与平移 $\beta$ 无关——本补充材料的全部计算都靠它。`}>{R`\int_{-\infty}^{+\infty}\mathrm e^{-${AL}^2(${XI}+\beta)^2}\,\mathrm d${XI}=\frac{\sqrt\pi}{${AL}}`}</Eq>
        <Tx>{R`（条件 $-\pi/4<\mathrm{Arg}\,${AL}<+\pi/4$ 只是规定取哪一支平方根。）

**第一次使用：$t=0$ 的波形。**\eqref{GI-1} 的指数是 $k$ 的二次式，配方：`}</Tx>
        <Eq n="GI-8" say={R`配方：把指数里的二次项和一次项合并成关于 $k$ 的完全平方，余下与 $k$ 无关的部分就是 $x$ 的高斯包络和平面波相位。`}>{R`-\frac{${A}^2}{4}(k-k_0)^2+ikx=-\frac{${A}^2}{4}\left[k-k_0-\frac{2ix}{${A}^2}\right]^2+ik_0x-\frac{x^2}{${A}^2}`}</Eq>
        <Tx>{R`对方括号用 \eqref{GI-7}（$${AL}=${A}/2$，$\beta=-k_0-2ix/${A}^2$），得到`}</Tx>
        <Eq n="GI-9" title="t = 0 的高斯波包" say={R`初始波函数本身也是高斯函数（宽度约 $a$），乘上中心波数 $k_0$ 的平面波：高斯的 Fourier 变换仍是高斯。`}>{R`\psi(x,0)=\left(\frac{2}{\pi${A}^2}\right)^{1/4}\mathrm e^{ik_0x}\,\mathrm e^{-x^2/${A}^2}`}</Eq>
        <Tx>{R`一个宽 $\sim${A}$ 的高斯包络乘上中心波数的平面波：动量空间的高斯变回坐标空间仍是高斯（附录 I）。取模平方：`}</Tx>
        <Eq n="GI-10" say={R`$t=0$ 时粒子的概率密度是以原点为中心的钟形曲线。`}>{R`|\psi(x,0)|^2=\sqrt{\frac{2}{\pi${A}^2}}\,\mathrm e^{-2x^2/${A}^2}`}</Eq>
        <Tx>{R`峰在原点。用正文的稳相公式 \mainref{C-16} 也能一眼看出这一点：$g(k)$ 是实的，辐角处处为零，中心自然在 $x=0$。`}</Tx>
      </Sub>

      <Sub n="GI-2" title={R`Calculation of $\Delta x$ and $\Delta p$; uncertainty relation`} zh={R`计算 $\Delta x$、$\Delta p$：最小不确定度`}>
        <Tx>{R`**宽度的约定。**对 Gauss 函数 $f(x)=\mathrm e^{-x^2/b^2}$，把宽度定义为`}</Tx>
        <Eq n="GI-11" say={R`把高斯函数 $\mathrm e^{-x^2/b^2}$ 的宽度定义为 $b/\sqrt2$：在这个距离上函数降为峰值的 $1/\sqrt{\mathrm e}$。`}>{R`\Delta x=\frac{b}{\sqrt2}`}</Eq>
        <Tx>{R`宽度怎么定义本来见仁见智；这样选的理由是，用在概率密度上时它恰好等于方均根偏差（第 III 章 §C-5 会正式定义），以后可以直接和不确定关系的严格形式比较。对照 \eqref{GI-10}  读出 $b=${A}/\sqrt2$：`}</Tx>
        <Eq n="GI-12" say={R`$t=0$ 时波包的位置宽度是 $a/2$。`}>{R`\Delta x=\frac{${A}}{2}`}</Eq>
        <Tx>{R`$|g(k,0)|^2\propto\mathrm e^{-${A}^2(k-k_0)^2/2}$ 同样是 Gauss 函数，$b=\sqrt2/${A}$，于是`}</Tx>
        <Eq n="GI-13a" say={R`波数分布的宽度是 $1/a$：位置越窄（$a$ 小），波数越散。`}>{R`\Delta k=\frac1{${A}}`}</Eq>
        <Tx>{R`或者用动量表示`}</Tx>
        <Eq n="GI-13b" say={R`动量宽度 $\hbar/a$。`}>{R`\Delta p=\frac{\hbar}{${A}}`}</Eq>
        <Tx>{R`于是`}</Tx>
        <Eq n="GI-14" keyEq title="最小不确定度波包" say={R`$t=0$ 的高斯波包恰好取到不确定关系的下限 $\hbar/2$：它是“最小”波包。`}>{R`\Delta x\,.\,\Delta p=\frac{\hbar}{2}`}</Eq>
        <Tx>{R`乘积与 $${A}$ 无关：把波包压窄，动量就按比例变散，此消彼长。第 III 章会证明方均根意义下 $\Delta x\Delta p\geq\hbar/2$ 是严格下限，高斯恰好贴着下限——这就是"最小不确定度波包"的含义。下面会看到，这个"最小"只在一个瞬间成立。`}</Tx>
      </Sub>

      <Sub n="GI-3" title="Evolution of the wave packet" zh="波包的演化">
        <Tx>{R`**3-a 让它动起来。**自由演化的规则很简单（正文 \mainref{C-7}）：每个平面波分量各自乘上 $\mathrm e^{-i\omega(k)t}$。`}</Tx>
        <Eq n="GI-15" say={R`$t$ 时刻的波包：每个平面波分量乘上自己的时间相位 $\mathrm e^{-i\omega(k)t}$，其中 $\omega=\hbar k^2/2m$。`}>{R`\psi(x,t)=\frac{\sqrt{${A}}}{(2\pi)^{3/4}}\int_{-\infty}^{+\infty}\mathrm e^{-\frac{${A}^2}{4}(k-k_0)^2}\,\mathrm e^{i[kx-\omega(k)t]}\,\mathrm dk`}</Eq>
        <Tx>{R`关键观察：自由粒子的色散 $\omega=\hbar k^2/2m$ 本身是 $k$ 的二次式，加进指数后指数仍然是二次的——只是 $k^2$ 的系数变成了复数 $\frac{${A}^2}{4}+\frac{i\hbar t}{2m}$。所以同一招（配方 + \eqref{GI-7}）照样奏效，结果仍是高斯，只不过"宽度参数"成了复数：`}</Tx>
        <FormulaMap n="GI-16a" keyEq title="t 时刻的高斯波包" say={R`任意时刻波包仍是高斯形，但宽度参数变成复数 $a^2+2i\hbar t/m$：中心以 $\hbar k_0/m$ 移动，同时变宽并带上位置相关的相位。`} tree={FM_GI_16a} start="im" />
        <Tx>{R`其中 $${PH}$ 为实数且与 $x$ 无关：`}</Tx>
        <Eq n="GI-16b" say={R`整体相位只依赖时间：一部分来自中心波数的动能相位，另一部分 $\theta$ 来自复宽度的辐角。`}>{R`${PH}=-${TH}-\frac{\hbar k_0^2}{2m}t\qquad\text{with}\qquad\tan2${TH}=\frac{2\hbar t}{m${A}^2}`}</Eq>
        <Derivation collapsed title="从 (GI-15) 到 (GI-16a) 的配方细节" steps={[
          { tex: R`-\frac{${A}^2}{4}(k-k_0)^2+ikx-\frac{i\hbar t}{2m}k^2=-\Big(\frac{${A}^2}{4}+\frac{i\hbar t}{2m}\Big)k^2+\Big(\frac{${A}^2k_0}{2}+ix\Big)k-\frac{${A}^2k_0^2}{4}`, why: R`把 \eqref{GI-15} 的指数按 $k$ 的幂次整理。记 $${AL}^2=\frac{${A}^2}{4}+\frac{i\hbar t}{2m}=\frac{1}{4}\big(${A}^2+\frac{2i\hbar t}{m}\big)$，$\mathrm{Re}\,${AL}^2=${A}^2/4>0$。` },
          { tex: R`=-${AL}^2\Big(k-\frac{${A}^2k_0/2+ix}{2${AL}^2}\Big)^2+\frac{(${A}^2k_0/2+ix)^2}{4${AL}^2}-\frac{${A}^2k_0^2}{4}`, why: R`配方。` },
          { tex: R`\frac{(${A}^2k_0/2+ix)^2}{4${AL}^2}-\frac{${A}^2k_0^2}{4}=ik_0x-\frac{i\hbar k_0^2}{2m}t-\frac{(x-\hbar k_0t/m)^2}{${A}^2+2i\hbar t/m}`, why: R`通分化简（把分子展开、减去 $${A}^2k_0^2/4$ 后整理成关于 $x-\hbar k_0t/m$ 的平方）。这三项分别给出平面波 $\mathrm e^{ik_0x}$、相位中的 $-\hbar k_0^2t/2m$ 与高斯包络。` },
          { tex: R`\int\mathrm e^{-${AL}^2(k-\dots)^2}\mathrm dk=\frac{\sqrt\pi}{${AL}}=\frac{2\sqrt\pi}{\left(${A}^4+4\hbar^2t^2/m^2\right)^{1/4}}\,\mathrm e^{-i${TH}}`, why: R`用 \eqref{GI-7}。$${AL}=\frac12\sqrt{${A}^2+2i\hbar t/m}$ 的模为 $\frac12(${A}^4+4\hbar^2t^2/m^2)^{1/4}$，辐角为 $${TH}$，$\tan2${TH}=2\hbar t/m${A}^2$。` },
          { tex: R`\frac{\sqrt{${A}}}{(2\pi)^{3/4}}\cdot2\sqrt\pi=\Big(\frac{2${A}^2}{\pi}\Big)^{1/4}`, why: R`收拾常数因子，即得 \eqref{GI-16a}、\eqref{GI-16b}。（已用数值积分 \eqref{GI-15} 逐点核对，相对误差 $<10^{-4}$。）` },
        ]} />
        <Tx>{R`取模平方，得到 $t$ 时刻的概率密度：`}</Tx>
        <FormulaMap n="GI-17" title="t 时刻的概率密度" say={R`概率密度仍是高斯：中心在 $\hbar k_0t/m$，宽度随 $|t|$ 增大、峰高相应降低，曲线下面积保持为 1。`} tree={FM_GI_17} start="grow" />
        <Tx>{R`**总概率会不会变？**把 \eqref{GI-17} 再积一次当然可以验证，但有一个不用计算的论证。从 \eqref{GI-15} 直接读出 $t$ 时刻的动量空间波函数：`}</Tx>
        <Eq n="GI-18" say={R`自由演化只给每个动量分量乘一个模为 1 的相位因子，动量分布的模完全不变。`}>{R`g(k,t)=\mathrm e^{-i\omega(k)t}\,g(k,0)`}</Eq>
        <Box kind="warning" title="勘误：式 (GI-18) 的指数">{R`原书此式印作 $\mathrm e^{-i\nosym{w}(k)t}$，其中的 "$\nosym{w}$" 应为角频率 $\omega$（与 \eqref{GI-15} 中的 $\omega(k)=\hbar k^2/2m$ 相同），属排印错误；已改正。`}</Box>
        <Tx>{R`相位因子不改变模，所以 $g(k,t)$ 与 $g(k,0)$ 的范数相同；而 Parseval–Plancherel 等式（附录 I 式 (45)）保证坐标空间与动量空间的范数相等。串起来，$\psi(x,t)$ 的范数等于 $\psi(x,0)$ 的范数。（第 III 章会把这一点追溯到 Hamilton 量的厄米性。）

**3-b 中心：没有意外。**\eqref{GI-17} 的峰在 $x=${V0}t$，`}</Tx>
        <Eq n="GI-19" title="波包中心速度" say={R`高斯波包的中心以 $\hbar k_0/m$ 匀速运动——正是正文的群速度。`}>{R`${V0}=\frac{\hbar k_0}{m}`}</Eq>
        <Tx>{R`与正文 \mainref{C-32} 的群速度 $\mathrm d\omega/\mathrm dk|_{k_0}$ 一致——一般理论在这个精确例子里得到了验证。

**3-c 宽度：真正的新东西。**按 \eqref{GI-11} 从 \eqref{GI-17} 的指数分母读出宽度：`}</Tx>
        <Eq n="GI-20" keyEq title="波包扩散公式" say={R`波包宽度在 $t=0$ 时最小（$a/2$），之后按双曲线规律增大，晚期近似随 $|t|$ 线性增长。`}>{R`\Delta x(t)=\frac{${A}}{2}\sqrt{1+\frac{4\hbar^2t^2}{m^2${A}^4}}`}</Eq>
        <Tx>{R`这个式子关于 $t$ 对称：从遥远的过去走来时，波包一路**收缩**，到 $t=0$ 窄到 $${A}/2$，此后一路**膨胀**、没有上限。$t=0$ 并不特殊，只是我们恰好把波包"最紧"的时刻选作了时间原点。峰高按 $1/\Delta x$ 变化，面积始终为 1。

下面两张交互图：第一张把 \eqref{GI-15} 的数值积分与解析式 \eqref{GI-17} 叠在一起，拖动 $t$ 看波包"先收缩后扩散"；第二张画 $\Delta x(t)$ 与经典弥散。`}</Tx>
        <GaussSpreadPlot />
        <Tx>{R`**动量分布却纹丝不动。**由 \eqref{GI-18}：`}</Tx>
        <Eq n="GI-21" say={R`自由波包的动量分布不随时间改变：平均动量 $\hbar k_0$ 与动量弥散 $\hbar\Delta k$ 都守恒。`}>{R`|g(k,t)|=|g(k,0)|`}</Eq>
        <Tx>{R`位置分布在变，动量分布却不变：没有力，动量就没有理由改变（第 III 章会说成"自由粒子的动量是运动常数"）。这一反差正是理解扩散的钥匙。

**一个经典的"替身"。**不变的动量弥散 $\hbar/${A}$ 意味着速度有 $\Delta v=\hbar/m${A}$ 的弥散。想象一群经典小球在 $t=0$ 从同一点出发、速度各不相同，它们散开的宽度是 $\delta x_{cl}=\hbar|t|/m${A}$——两条过原点的直线。量子宽度 \eqref{GI-20} 是以这两条直线为渐近线的双曲线：

· **晚期**两者重合——扩散不过是"快的跑得远、慢的跑得近"，有完全经典的解释；

· **早期**两者分道扬镳——小球群可以在 $t=0$ 聚成一点，量子波包却被 $\Delta x\geq\hbar/2\Delta p=${A}/2$ 挡住。双曲线的"圆底"就是不确定关系的印记。

由此也看出谁扩散得快：初始越窄（$${A}$ 小），动量越散，扩散越猛；质量越大，扩散越慢——宏观物体的扩散慢到可以忽略。`}</Tx>
        <GaussWidthPlot />
        <Box kind="note" title="评注 (i)：扩散是普遍现象">{R`高斯只是让计算变得干净，扩散本身与形状无关：对任意自由波包，$\Delta x^2(t)$ 都是 $t$ 的二次函数，晚期斜率为 $\Delta p/m$（第 III 章补充材料 $\mathrm{L}_{\rm III}$ 习题 4）。`}</Box>
        <Box kind="note" title={R`评注 (ii)：为什么正文说 $\Delta x\cdot\Delta k\simeq1$，而 $t$ 很大时它 $\gg1$？`}><Tx>{R`这里有个似乎矛盾的地方：正文 \mainref{C-17} 断言 $\Delta x\cdot\Delta k\simeq1$，而本节的高斯波包到了晚期 $\Delta x\Delta k$ 可以任意大，可它的 $|g(k)|$ 明明就是一个宽 $\Delta k$ 的单峰。

问题出在正文论证里一个没有明说的前提：\mainref{C-13} 把 $g(k)$ 的辐角 $\alpha(k)$ 在峰内**线性化**了。线性项只让波包平移；若二次项在峰宽内贡献的相位不可忽略，各分波就会额外失配，波包被"抹宽"。线性化成立的条件大致是`}</Tx>
          <Eq n="GI-22" say={R`正文的估计成立的条件：相位的二阶项在整个波数宽度内引起的变化必须远小于 $2\pi$。`}>{R`\Delta k^2\left[\frac{\mathrm d^2\alpha}{\mathrm dk^2}\right]_{k=k_0}\ll2\pi`}</Eq>
          <Tx>{R`一旦违反，\mainref{C-17} 给出的就只是下限，实际波包更宽。

自由演化恰好不断制造二次相位：$\alpha(k)=-\hbar k^2t/2m$。代入，条件变为 $\frac{1}{${A}^2}\frac{\hbar t}{m}\ll2\pi$——正是 \eqref{GI-20} 根号里修正项还小的那段时间。在这段时间内 $\Delta x\Delta k=\frac12\sqrt{1+4\hbar^2t^2/m^2${A}^4}$ 仍是 1 的量级；之后二次相位主导，波包扩散。所以扩散与"$\Delta x\Delta k\simeq1$"并不矛盾，它恰好标出了那条经验法则的适用边界。`}</Tx>
        </Box>
      </Sub>
    </Sec>);
}
