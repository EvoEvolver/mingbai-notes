// 补充材料 K_I：习题（题意用中文复述，附提示与完整解答）
import { Sec, Tx, Exercise, Box } from "@kit";
import { ChainFig } from "./_ch01c_figs.jsx";
import { DoubleDeltaPlot } from "./_ch01c_plots.jsx";

const R = String.raw;
const AK = R`\sym{alK}{\alpha}`;     // $\delta$ 势强度
const DL = R`\sym{dirac}{\delta}`;   // Dirac δ

export function SecK() {
  return (
    <Sec n="KI" title="Exercises" zh="习题"
      gist={R`八道题：中子在线状分子上的衍射；$\delta$ 势阱的束缚态（坐标与动量两种解法）与透射；双 $\delta$ 势与化学键模型；窄阱极限；半边阱；二维斜反射与横向位移。`}
      why={R`这些题把 $\mathrm{H}_{\rm I}$、$\mathrm{J}_{\rm I}$ 的方法推向两个新方向：无界但可积的 $\delta$ 势（导数不再连续）与二维问题（可分离性）。`}
      gives={[]}>
      <Tx>{R`以下题意为中文复述，数值与条件与原书一致；解答为本页编写。`}</Tx>

      <Exercise n="KI-1" title="中子在线状核链上的衍射" level="★"
        hint={R`把核链当作一维光栅：探测器方向上相邻两核散射波的程差是多少？`}
        solution={<Tx>{R`**(a)** 每个核都把入射中子波散射成球面波，远处探测器收到的是所有散射波之和。核链沿垂直于入射方向排列，相邻两核到探测器（方向 $\theta$）的程差为 $l\sin\theta$。当 $l\sin\theta=n\lambda$（$n$ 为整数）时各散射波同相，计数率出现尖锐的极大（共振）；其余能量下各波大体相消，计数很低。由于 $\lambda=h/\sqrt{2M_nE}$，改变 $E$ 就扫过这些衍射极大：$E$ 增大，$\lambda$ 减小，依次经过 $n=1,2,3,\dots$ 的极大。

**(b)** 能量最低的共振对应 $n=1$（$E<E_1$ 再无共振，说明不存在更长的满足条件的波长）：$l\sin\theta=\lambda_1=h/\sqrt{2M_nE_1}$。代入 $M_n=1.67\times10^{-27}\,\mathrm{kg}$、$E_1=1.3\times10^{-20}\,\mathrm J$：$\lambda_1=6.6\times10^{-34}/\sqrt{2\times1.67\times10^{-27}\times1.3\times10^{-20}}\simeq1.0\times10^{-10}\,\mathrm m$，所以
$$l=\frac{\lambda_1}{\sin30^\circ}\simeq2\,\mathrm{\mathring A}.$$

**(c)** 上面把每个核当作点散射体。当波长减小到与核的尺寸 $d$ 相当时，同一个核的不同部位散射的波之间也有程差，单核的散射有了自己的角分布（"形状因子"），调制整个衍射图样。所以须在 $\lambda\sim d$ 即 $E\sim h^2/2M_nd^2$ 附近开始考虑核的有限尺寸。取 $d\sim10^{-14}\,\mathrm m$，这是 $E\sim10^{-12}\,\mathrm J$（约 10 MeV）的量级——比 $E_1$ 高约 $(l/d)^2\sim10^8$ 倍。`}</Tx>}>
        <Tx>{R`质量为 $M_n$（$M_n\simeq1.67\times10^{-27}\,\mathrm{kg}$）、速度与能量 $E$ 都确定的中子束，垂直射向一列规则排列的原子核（例如长链分子中的核）。相邻核间距为 $l$，核的尺寸为 $d$（$d\ll l$）。远处的中子探测器 $D$ 位于与入射方向成 $\theta$ 角的方向上。`}</Tx>
        <ChainFig />
        <Tx>{R`(a) 定性描述改变入射能量 $E$ 时在 $D$ 处观察到的现象。(b) 计数率作为 $E$ 的函数在 $E=E_1$ 附近有一个共振，且 $E<E_1$ 时再无共振。说明由此可以定出 $l$，并就 $\theta=30^\circ$、$E_1=1.3\times10^{-20}$ 焦耳算出 $l$。(c) $E$ 大约到多大时必须考虑核的有限尺寸？`}</Tx>
        <Box kind="warning" title="勘误：题中数据的小数点">{R`原书印作 "$M_n\simeq167\ 10^{-27}$ kg" 与 "$E_1=13\ 10^{-20}$ joule"，小数点丢失，应为 $1.67\times10^{-27}\,\mathrm{kg}$ 与 $1.3\times10^{-20}\,\mathrm J$（前者即 $\mathrm{A}_{\rm I}$ 中的中子质量；后者给出 $\lambda_1\simeq1\,\mathrm{\mathring A}$、$l\simeq2\,\mathrm{\mathring A}$，与分子中的核间距相符）。`}</Box>
      </Exercise>

      <Exercise n="KI-2" title="$\delta$ 势阱中的束缚态" level="★★"
        hint={R`积分本征方程跨过 $x=0$：动能项给出导数的跃变，势能项给出 $-${AK}\varphi(0)$。束缚态要求 $x\to\pm\infty$ 时都衰减。`}
        solution={<Tx>{R`**(a)** $[${AK}]$ = 能量 $\times$ 长度（因为 $${DL}(x)$ 的量纲是长度$^{-1}$）。把 $-\frac{\hbar^2}{2m}\varphi''-${AK}${DL}(x)\varphi=E\varphi$ 在 $[-\varepsilon,\varepsilon]$ 上积分，令 $\varepsilon\to0$（$E\varphi$ 的积分趋于零）：
$$\varphi'(0^+)-\varphi'(0^-)=-\frac{2m${AK}}{\hbar^2}\,\varphi(0).$$
$\varphi$ 本身连续，导数跳变——这正是 $\mathrm{H}_{\rm I}$ §1-b 评注所说的情形。

**(b)** $x\neq0$ 处 $V=0$，$E<0$ 时 $\rho=\sqrt{-2mE}/\hbar$。连续性：$A_2+A_2'=A_1+A_1'$；导数跳变：$\rho(A_2-A_2')-\rho(A_1-A_1')=-\frac{2m${AK}}{\hbar^2}(A_1+A_1')$。记 $\kappa=m${AK}/\hbar^2\rho$，解出
$$M=\begin{pmatrix}1-\kappa&-\kappa\\ \kappa&1+\kappa\end{pmatrix}.$$
平方可积要求 $x\to-\infty$ 时 $A_1'=0$、$x\to+\infty$ 时 $A_2=0$，即 $A_2=(1-\kappa)A_1=0$，故 $\kappa=1$：$\rho=m${AK}/\hbar^2$，**唯一**的束缚态能量
$$E=-\frac{m${AK}^2}{2\hbar^2}.$$
此时 $A_2'=A_1$，归一化波函数 $\varphi(x)=\sqrt\rho\,\mathrm e^{-\rho|x|}$。

**(c)** 图形是在原点有一个尖角（导数跳变）的双侧指数"帐篷"。宽度 $\Delta x\sim1/\rho=\hbar^2/m${AK}$。

**(d)** 用 $\overline\varphi(p)=(2\pi\hbar)^{-1/2}\int\mathrm e^{-ipx/\hbar}\varphi(x)\mathrm dx$：
$$\overline\varphi(p)=\sqrt{\frac{\rho}{2\pi\hbar}}\,\frac{2\rho}{\rho^2+p^2/\hbar^2},\qquad \nosym{\overline{\mathrm d\mathscr P}}(p)=|\overline\varphi(p)|^2\mathrm dp=\frac2\pi\,\frac{(\hbar\rho)^3}{(p^2+\hbar^2\rho^2)^2}\,\mathrm dp.$$
（对 $p$ 积分为 1。）极大在 $p=0$，宽度 $\Delta p\sim\hbar\rho$，于是 $\Delta x\cdot\Delta p\sim\hbar$，与不确定关系一致。`}</Tx>}>
        <Tx>{R`粒子的 Hamilton 量（正文 \mainref{D-10} 意义下的算符）为 $H=-\frac{\hbar^2}{2m}\frac{\mathrm d^2}{\mathrm dx^2}-${AK}\,${DL}(x)$，$${AK}$ 为正常数，其量纲待求。

(a) 把 $H$ 的本征方程在 $-\varepsilon$ 到 $+\varepsilon$ 间积分，令 $\varepsilon\to0$，证明本征函数 $\varphi(x)$ 的导数在 $x=0$ 处不连续，并用 $${AK}$、$m$、$\varphi(0)$ 表出跃变。(b) 设能量 $E$ 为负（束缚态），$x<0$ 时 $\varphi=A_1\mathrm e^{\rho x}+A_1'\mathrm e^{-\rho x}$，$x>0$ 时 $\varphi=A_2\mathrm e^{\rho x}+A_2'\mathrm e^{-\rho x}$。用 $E$、$m$ 表出 $\rho$；利用 (a) 求出把 $(A_1,A_1')$ 映到 $(A_2,A_2')$ 的矩阵 $M$；再由平方可积条件求出可能的能量与归一化波函数。(c) 画出波函数，估计其宽度 $\Delta x$。(d) 在上述归一化定态中测量动量，结果落在 $p$ 到 $p+\mathrm dp$ 之间的概率 $\nosym{\overline{\mathrm d\mathscr P}}(p)$ 是多少？何处最大？在多宽的范围 $\Delta p$ 内不可忽略？估计 $\Delta x\cdot\Delta p$。`}</Tx>
      </Exercise>

      <Exercise n="KI-3" title="$\delta$ 势的透射" level="★★"
        hint={R`仍用 $x=0$ 处"$\varphi$ 连续、$\varphi'$ 跳 $-\frac{2m${AK}}{\hbar^2}\varphi(0)$"。答案只依赖 $E/E_L$。`}
        solution={<Tx>{R`**(a)** $k=\sqrt{2mE}/\hbar$。连续：$1+A=B$；跳变：$ikB-ik(1-A)=-\frac{2m${AK}}{\hbar^2}B$。记 $\kappa_0=m${AK}/\hbar^2$，得 $2ikA=-2\kappa_0B$，于是
$$B=\frac{1}{1-i\kappa_0/k},\qquad A=\frac{i\kappa_0/k}{1-i\kappa_0/k}.$$

**(b)** $E_L=m${AK}^2/2\hbar^2=\hbar^2\kappa_0^2/2m$，所以 $\kappa_0^2/k^2=E_L/E$：
$$R=|A|^2=\frac{1}{1+E/E_L},\qquad T=|B|^2=\frac{1}{1+E_L/E}=\frac{E}{E+E_L}.$$
$R+T=1$。$T$ 随 $E$ 单调增大，$E\to\infty$ 时 $T\to1$：高能粒子"看不见"这个势（其作用 $\int V\mathrm dx$ 有限，相对动能越来越小）；低能时 $T\to0$，几乎全反射。

把 $T=E/(E+E_L)$ 延拓到 $E<0$：$E\to-E_L$ 时分母为零，$T$ 发散。这个极点恰好位于束缚态能量 $-E_L$（习题 2）：在那里不需要入射波就存在非零的"出射"解——就是束缚态（两侧指数衰减）。散射振幅的极点对应束缚态，这是散射理论中的普遍事实。`}</Tx>}>
        <Tx>{R`粒子处在与上题相同的势中，但能量 $E>0$，沿 $Ox$ 自左向右传播。(a) 证明定态可以写成：$x<0$ 时 $\varphi=\mathrm e^{ikx}+A\,\mathrm e^{-ikx}$，$x>0$ 时 $\varphi=B\,\mathrm e^{ikx}$，并用 $E$、$m$、$${AK}$ 求出 $k$、$A$、$B$（注意 $\mathrm d\varphi/\mathrm dx$ 在 $x=0$ 处的跃变）。(b) 令 $-E_L=-m${AK}^2/2\hbar^2$（束缚态能量），用无量纲参数 $E/E_L$ 表出反射系数 $R$ 与透射系数 $T$；研究它们随 $E$ 的变化，$E\to\infty$ 时如何？如何解释？证明若把 $T$ 的表达式延拓到负 $E$，它在 $E\to-E_L$ 时发散，并讨论这一结果。`}</Tx>
      </Exercise>

      <Exercise n="KI-4" title="用 Fourier 变换重做习题 2" level="★★★"
        hint={R`动量空间里 $${DL}(x)\varphi(x)=\varphi(0)${DL}(x)$ 变成常数；自洽条件 $\varphi(0)=(2\pi\hbar)^{-1/2}\int\overline\varphi\,\mathrm dp$ 给出能量。动能的坐标表达式里，$\varphi''$ 含 $${DL}$ 函数。`}
        solution={<Tx>{R`**(a)** 本征方程 $-\frac{\hbar^2}{2m}\varphi''-${AK}\varphi(0)${DL}(x)=E\varphi$ 做 Fourier 变换：
$$\frac{p^2}{2m}\overline\varphi(p)-\frac{${AK}\varphi(0)}{\sqrt{2\pi\hbar}}=E\,\overline\varphi(p)\ \Rightarrow\ \overline\varphi(p)=\frac{${AK}\varphi(0)}{\sqrt{2\pi\hbar}}\,\frac{1}{p^2/2m-E}.$$
自洽：$\varphi(0)=\frac1{\sqrt{2\pi\hbar}}\int\overline\varphi\,\mathrm dp=\frac{${AK}\varphi(0)}{2\pi\hbar}\int\frac{\mathrm dp}{p^2/2m-E}$。对 $E<0$，$\int\frac{2m\,\mathrm dp}{p^2+2m|E|}=\frac{2m\pi}{\sqrt{2m|E|}}$，得 $1=\frac{m${AK}}{\hbar\sqrt{2m|E|}}$，即 $E=-m${AK}^2/2\hbar^2$——唯一的负能量。$E>0$ 时分母在实轴上有零点：散射态不可平方积分，它的 Fourier 变换含 $${DL}(p\mp\sqrt{2mE})$ 型的分布，而"两边除以 $(p^2/2m-E)$"恰好把这些项丢掉了，所以这个方法只找到束缚态。代回得 $\overline\varphi\propto1/(p^2+\hbar^2\rho^2)$，反变换即 $\varphi\propto\mathrm e^{-\rho|x|}$，$\rho=m${AK}/\hbar^2$，重现习题 2 的全部结果。

**(b)** 若 $\overline\varphi$ 足够光滑（$\varphi$ 可在通常意义下两次求导），分部积分与 Parseval 等式给出两种表达式相等。用 (a) 的结果：$E_k=\frac1{2m}\int p^2|\overline\varphi|^2\mathrm dp=\frac1{2m}\frac2\pi\int\frac{p^2(\hbar\rho)^3}{(p^2+\hbar^2\rho^2)^2}\mathrm dp=\frac{\hbar^2\rho^2}{2m}=\frac{m${AK}^2}{2\hbar^2}=-E$。

在坐标空间：$\varphi=\sqrt\rho\,\mathrm e^{-\rho|x|}$，按分布意义 $\varphi''=\rho^2\varphi-2\rho\,\varphi(0)${DL}(x)$。光滑部分贡献 $-\frac{\hbar^2\rho^2}{2m}$（负的！），原点贡献 $+\frac{\hbar^2}{2m}\cdot2\rho\cdot\rho=\frac{\hbar^2\rho^2}{m}$，合计 $\frac{\hbar^2\rho^2}{2m}$，与动量空间结果一致。

**物理解释：**把 $\delta$ 势看作宽 $a\to0$、深 $V_0\to\infty$、$aV_0=${AK}$ 的方阱。阱内 $k^2\simeq2mV_0/\hbar^2$ 极大，波函数在这极窄的区间里急剧弯折（把斜率从 $+\rho\varphi(0)$ 掰到 $-\rho\varphi(0)$）。阱内的动能密度 $\simeq V_0|\varphi(0)|^2$，乘宽度 $a$ 得 $${AK}\rho=\hbar^2\rho^2/m$——正是原点的那份贡献：粒子穿过深阱时速度极大，虽然在阱内时间极短，动能贡献却有限。`}</Tx>}>
        <Tx>{R`(a) 写出 $H$ 的本征方程及其 Fourier 变换，由此直接得到 $\varphi(x)$ 的 Fourier 变换 $\overline\varphi(p)$（用 $p$、$E$、$${AK}$、$\varphi(0)$ 表示）。证明只可能有一个 $E$ 值，且为负。为什么用这种方法只能找到束缚态、找不到传播态？求出 $\varphi(x)$，说明这样可以重新得到习题 2 的全部结果。

(b) 粒子的平均动能可以写成（参见第 III 章）$E_k=\frac1{2m}\int_{-\infty}^{+\infty}p^2|\overline\varphi(p)|^2\,\mathrm dp$。证明当 $\overline\varphi(p)$ "足够光滑"时，也有 $E_k=-\frac{\hbar^2}{2m}\int_{-\infty}^{+\infty}\varphi^*(x)\frac{\mathrm d^2\varphi}{\mathrm dx^2}\,\mathrm dx$。用这两种方法计算 (a) 中束缚态的 $E_k$，结果如何？注意此时 $\varphi(x)$ 在 $x=0$ 处不"正则"（导数不连续），必须在分布意义下求导，这给所求平均值带来来自 $x=0$ 这一点的贡献。请用物理图像解释这一贡献：考虑以 $x=0$ 为中心、宽 $a\to0$、深 $V_0\to\infty$（$aV_0=${AK}$）的方阱，研究其中波函数的行为。`}</Tx>
      </Exercise>

      <Exercise n="KI-5" title="双 $\delta$ 势阱：最简单的化学键模型" level="★★★"
        hint={R`以 $x=l/2$ 为对称中心，分偶、奇两类；在每个 $\delta$ 处用习题 2 的跃变条件。`}
        solution={<>
          <Tx>{R`**(a)** 束缚态 $E=-\hbar^2\rho^2/2m$。三个区域里 $\varphi$ 为 $\mathrm e^{\pm\rho x}$ 的组合，两端只留衰减项。由于势关于 $x=l/2$ 对称，解可取为偶或奇。在 $x=0$ 处套用习题 2 的跃变条件（$\mu=2m${AK}/\hbar^2$）并利用对称性，消去系数后得到
$$\mathrm e^{-\rho l}=\pm\left(1-\frac{2\rho}{\mu}\right),$$
"$-$"号（即 $2\rho/\mu-1=\mathrm e^{-\rho l}$）对应偶态，"$+$"号对应奇态。图解：左边是从 1 下降的指数，右边是过 $(0,\pm1)$、斜率 $\mp2/\mu$ 的直线，交点即解（见下图）。

**(i) 基态（偶）。**$2\rho/\mu=1+\mathrm e^{-\rho l}>1$，所以 $\rho_S>\mu/2$，$E_S<-E_L$（$E_L$ 为单个 $\delta$ 的束缚能，对应 $\rho=\mu/2$）。物理：粒子可以同时享用两个吸引中心，波函数在两阱之间不必衰减到很小，"更舒展"，动能更低、平均势能更低。波函数在两个 $\delta$ 处各有一个尖角，中间是向上凹的 $\cosh$ 形，两侧指数衰减，关于 $l/2$ 对称。

**(ii) 激发态（奇）。**$1-2\rho/\mu=\mathrm e^{-\rho l}$：在 $\rho=0$ 两边都等于 1，要有正根，直线必须比指数下降得慢，即 $2/\mu<l$。所以当 $l>2/\mu=\hbar^2/m${AK}$ 时存在一个奇激发态，且 $\rho_A<\mu/2$，$E_A>-E_L$。波函数在 $l/2$ 处为零（中间是 $\sinh$ 形），两侧反号。

**(iii) 分子模型。**把两个 $\delta$ 看作两个原子核对电子的吸引，这就是 $H_2^+$ 的一维模型。$l\to\infty$：两个能级都趋于 $-E_L$（两个孤立"原子"，简并）。$l$ 减小：偶态（成键态）能量降低，奇态（反键态）能量升高；$l<2/\mu$ 时奇态消失。$l\to0$：两 $\delta$ 合并成强度 $2${AK}$ 的单个 $\delta$，$\rho\to\mu$，$E_S\to-4E_L$。计入核间排斥 $e^2/l$，总能量 $E_S(l)+e^2/l$：$l\to0$ 时排斥项发散，$l\to\infty$ 时趋于 $-E_L$；若中间某处低于 $-E_L$，曲线就有极小——存在束缚的 $H_2^+$，极小位置即平衡核间距。成键能来自电子在两核之间"共享"所降低的能量：这是化学键最初等的模型。

**(b)** 对排斥或吸引的 $\delta$，单个 $\delta$ 的透射、反射振幅 $t_1,r_1$ 都是**复数**（习题 3）。两个散射体之间多次反射，像 Fabry–Perot：$T=\dfrac{|t_1|^4}{|1-r_1^2\,\mathrm e^{2ikl}|^2}$。共振（$T=1$）条件是 $2kl+2\arg r_1=2n\pi$。由于 $\arg r_1\neq0$（且随 $k$ 变），共振**不在** $l$ 等于 de Broglie 波长整数倍处，也不在半波长整数倍处——这与 $\mathrm{H}_{\rm I}$ §2-b-$\alpha$ 中 $E>V_0$ 的方势垒不同，那里在间断点反射没有相移。`}</Tx>
          <DoubleDeltaPlot />
        </>}>
        <Tx>{R`质量为 $m$ 的粒子处在势 $V(x)=-${AK}\,${DL}(x)-${AK}\,${DL}(x-l)$（$${AK}>0$）中，$l$ 为常数长度。

(a) 令 $E=-\hbar^2\rho^2/2m$，求束缚态。证明可能的能量满足 $\mathrm e^{-\rho l}=\pm\left(1-\frac{2\rho}{\mu}\right)$，其中 $\mu=2m${AK}/\hbar^2$，并给出图解。(i) 基态：证明它是偶的（关于 $x=l/2$ 反射不变），能量 $E_S$ 低于习题 3 中的 $-E_L$，作物理解释并画出波函数。(ii) 激发态：证明当 $l$ 大于某个待定值时，存在能量 $E_A$ 高于 $-E_L$ 的奇激发态，求其波函数。(iii) 说明上述计算如何构成电离双原子分子（如 $H_2^+$，核间距 $l$）的模型。两个能级如何随 $l$ 变化？$l\to0$ 与 $l\to\infty$ 时怎样？若计入两核的排斥，系统总能量是什么？说明总能量随 $l$ 变化的曲线在某些情况下预言了束缚的 $H_2^+$ 的存在，并能定出平衡时的 $l$。这是化学键的一个非常初等的模型。

(b) 求这两个 $\delta$ 势构成的系统的反射与透射系数，研究它们随 $l$ 的变化。所得共振是否出现在 $l$ 为粒子 de Broglie 波长整数倍处？为什么？`}</Tx>
      </Exercise>

      <Exercise n="KI-6" title="宽度趋于零的方势阱" level="★★"
        hint={R`用 $\mathrm{H}_{\rm I}$ 的 \eqref{HI-44}–\eqref{HI-47a}：$k_0a\to0$ 时直线斜率极大，只与第一段偶弧相交。`}
        solution={<Tx>{R`**(a)** 由 \eqref{HI-50}：$a\to0$ 时 $k_0a<\pi$，只有一个（偶）束缚态。在 \eqref{HI-44} 中 $ka/2\leqslant k_0a/2\to0$，$\tan(ka/2)\simeq ka/2$，故 $\rho\simeq k^2a/2$。又 $\rho\ll k$，所以 $k\simeq k_0$，$\rho\simeq k_0^2a/2=mV_0a/\hbar^2$：
$$E=-\frac{\hbar^2\rho^2}{2m}\simeq-\frac{mV_0^2a^2}{2\hbar^2},$$
能量随阱的"面积" $aV_0$ 的平方变化。

**(b)** $\rho\propto a\to0$。由 \eqref{HI-40}，$\rho a\to0$、$ka\to0$ 时 $A_2=A_2'\simeq\frac{ik}{2ik}B_1=B_1/2$（阱内 $\varphi\simeq B_1\cos kx\simeq B_1$）。阱外概率 $\simeq2\int_0^\infty|B_1|^2\mathrm e^{-2\rho x}\mathrm dx=|B_1|^2/\rho$，阱内 $\simeq|B_1|^2a$，比值 $\sim\rho a\propto a^2\to0$：粒子几乎全部时间待在阱**外**——一个"几乎不束缚"的束缚态。

**(c)** 令 $a\to0$、$V_0\to\infty$ 而 $aV_0=${AK}$ 保持不变，方阱趋于 $-${AK}${DL}(x)$。上式给出 $E=-m${AK}^2/2\hbar^2$、$\rho=m${AK}/\hbar^2$，与习题 2 完全一致；但此时 $\rho$ 不再趋于零（$\rho\propto aV_0$），阱外波函数 $\mathrm e^{-\rho|x|}$ 有确定宽度，而阱内部分仍可忽略。`}</Tx>}>
        <Tx>{R`宽为 $a$、深为 $V_0$ 的方势阱（系统使用 $\mathrm{H}_{\rm I}$ §2-c-$\alpha$ 的记号），研究宽度 $a\to0$ 时粒子束缚态的性质。(a) 证明确实只有一个束缚态，并求其能量 $E$（结果为 $E\simeq-\frac{mV_0^2a^2}{2\hbar^2}$，即随阱"面积" $aV_0$ 的平方变化）。(b) 证明 $\rho\to0$ 且 $A_2=A_2'\simeq B_1/2$，由此推出束缚态中粒子位于阱外的概率趋于 1。(c) 以上结论如何用于习题 2 中 $V(x)=-${AK}\,${DL}(x)$ 的粒子？`}</Tx>
      </Exercise>

      <Exercise n="KI-7" title="一侧为无限高壁的势阱" level="★★"
        hint={R`壁处 $\varphi(0)=0$；把解奇延拓到 $x<0$。`}
        solution={<Tx>{R`在 $x<0$ 势无穷大，$\varphi(0)=0$（\eqref{HI-25} 后的评注）。定义 $\tilde\varphi(-x)=-\varphi(x)$，延拓后的函数在 $x=0$ 处连续（为零），导数也连续（奇函数的导数是偶函数），并在 $|x|<a$ 内满足深 $V_0$ 的方阱的方程、在 $|x|>a$ 满足 $V=0$ 的方程——它正是宽 $2a$、深 $V_0$ 的对称方阱的一个**奇**定态。反过来，对称阱的每个奇态限制到 $x\geqslant0$ 都给出本题的定态。

所以本题的束缚态 $=$ 宽 $2a$ 方阱的奇态。由 \eqref{HI-49a}（把阱宽 $a$ 换成 $2a$）：$|\sin(ka)|=k/k_0$、$\tan(ka)<0$，$k_0=\sqrt{2mV_0}/\hbar$。第 $n$ 个奇态存在的条件是 $k_0a>(n-\frac12)\pi$，因此束缚态数目
$$N=\left\lfloor\frac{k_0a}{\pi}+\frac12\right\rfloor .$$
**不**一定有束缚态：只有当 $V_0>\frac{\pi^2\hbar^2}{8ma^2}$（$k_0a>\pi/2$）时才出现第一个。与对称阱（总有一个偶态）不同，壁上的节点"占掉"了半个波长：阱必须够深够宽，才能在 $[0,a]$ 内放下至少四分之一个波长。`}</Tx>}>
        <Tx>{R`粒子处在势 $V(x)=0$（$x\geq a$）、$V(x)=-V_0$（$0\leq x<a$）中，$x<0$ 时 $V(x)$ 为无穷大。设 $\varphi(x)$ 为粒子某定态的波函数。证明 $\varphi(x)$ 可以延拓成一个奇函数，它对应宽 $2a$、深 $V_0$ 的方势阱（参见 $\mathrm{H}_{\rm I}$ §2-c-$\alpha$）的一个定态。讨论束缚态数目与 $a$、$V_0$ 的关系。是否像对称方势阱那样总至少有一个束缚态？`}</Tx>
      </Exercise>

      <Exercise n="KI-8" title="二维斜反射与横向位移" level="★★★"
        hint={R`按 $\mathrm{F}_{\rm I}$ 分离变量：$k_y$ 守恒，$x$ 方向就是 $\mathrm{J}_{\rm I}$ 的一维势阶问题，只是用 $k_x$ 代替 $k$。分别对 $k_x$、$k_y$ 用稳相条件。`}
        solution={<Tx>{R`势只依赖 $x$，定态为 $\mathrm e^{ik_yy}\varphi_{k_x}(x)$，$\varphi_{k_x}$ 是 $\mathrm{H}_{\rm I}$ 势阶问题的解（$E_x=\hbar^2k_x^2/2m$ 与 $V_0$ 比较）。取 $g(k_x,k_y)$ 在 $(k_{x0},k_{y0})$ 附近有尖峰。

**全反射**（$k_{x0}<K_0$）：反射分波的相位为 $-k_xx+k_yy-\omega t-2\theta(k_x)$，$\omega=\hbar(k_x^2+k_y^2)/2m$。对 $k_y$ 稳相：$y=\frac{\hbar k_{y0}}{m}t$；对 $k_x$ 稳相（同 \eqref{JI-9}）：$x_r=-\frac{\hbar k_{x0}}{m}(t-\tau)$，$\tau$ 由 \eqref{JI-10} 给出（用 $k_{x0}$ 代替 $k_0$）。入射中心沿 $x=v_xt$、$y=v_yt$ 运动。

于是反射波包沿与经典反射路径**平行**的直线离开，但在 $t=\tau$ 时才回到 $x=0$，那时它已沿界面滑过了 $v_y\tau$：反射点相对经典反射点有**横向位移**
$$\Delta y=v_y\tau=\frac{\hbar k_{y0}}{m}\,\frac{2m}{\hbar k_{x0}\sqrt{K_0^2-k_{x0}^2}}=\frac{2k_{y0}}{k_{x0}\sqrt{K_0^2-k_{x0}^2}}.$$
物理图像：粒子先钻进禁区深约 $1/\sqrt{K_0^2-k_{x0}^2}$ 的倏逝层，在其中"逗留" $\tau$ 的时间，同时以 $v_y$ 沿界面平移，然后才折回（光学中对应 Goos–Hänchen 位移）。

$V_0\to+\infty$ 时 $K_0\to\infty$，$\tau\to0$、$\Delta y\to0$，量子轨迹渐近于经典的镜面反射轨迹。

**部分反射**（$k_{x0}>K_0$）：$r,t$ 为实数，无延迟、无位移；反射波包按镜面反射，透射波包以 $(q_0,k_{y0})$ 前进（$q_0=\sqrt{k_{x0}^2-K_0^2}$），即发生"折射"：$k_y$ 守恒相当于 Snell 定律，透射方向更偏离法线。`}</Tx>}>
        <Tx>{R`在二维问题中考虑粒子在势阶 $V(x,y)=0$（$x<0$）、$V(x,y)=V_0$（$x>0$）上的斜反射。研究波包中心的运动。对全反射情形，从物理上解释中心轨迹与经典轨迹的差别（反射时的横向位移）。证明当 $V_0\to+\infty$ 时，量子轨迹渐近于经典轨迹。`}</Tx>
      </Exercise>
    </Sec>);
}
