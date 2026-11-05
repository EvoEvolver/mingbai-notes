// 补充材料 O_III：一维周期结构中粒子的量子性质（式 OIII-1 … OIII-59）
import { Sec, Sub, Tx, Eq, FormulaMap, Box, Derivation, C } from "@kit";
import { FM_OIII_44, FM_OIII_57 } from "./_ch03d_fmaps.jsx";
import { BandPlot } from "./_ch03d_plots.jsx";
import { PeriodicFig, CrystalFig } from "./_ch03d_figs.jsx";

const R = String.raw;
const AT = R`\tilde A`, ATP = R`\tilde A'`;
const X = R`\sym{XO}{X}`, Y = R`\sym{YO}{Y}`, KA = R`\sym{kB}{k}`, LA = R`\sym{LO}{L}`;
const EPS = R`\sym{epsO}{\varepsilon}`, P = R`\sym{pO}{p}`;
const Xa = `${X}(\\alpha)`, ka = `${KA}(\\alpha)`;

export function SecO() {
  return (
    <Sec n="OIII" title="Quantum properties of a particle in a one-dimensional periodic structure" zh="一维周期结构中粒子的量子性质"
      gist={R`$N$ 个相同"势垒"等距排列。从一个势垒到下一个，平面波系数乘上迭代矩阵 $Q(\alpha)=D(\alpha)M(\alpha)$；$\det Q=1$，本征值由 $X(\alpha)=\mathrm{Re}[\mathrm e^{i\alpha l}F(\alpha)]$ 决定：$|X|\le1$ 时为 $\mathrm e^{\pm ikl}$（波可以无衰减地传下去——允许带），$|X|>1$ 时为 $\varepsilon\mathrm e^{\pm\rho l}$（指数增长或衰减——禁带，Bragg 反射）。有限晶体中，允许带内恰有 $N$ 个能级 $k\simeq p\pi/Nl$，与边缘细节无关；禁带中只有少数局域在晶体边缘的态。`}
      why={R`这是固体能带论最简单的完整模型：不需要严格周期、不需要 $N\to\infty$，只用 $\mathrm N_{\rm III}$ 的传递矩阵就能看到能带、能隙、Bragg 反射与表面态是怎样从"重复 $N$ 次"里长出来的。`}
      gives={["OIII-17", "OIII-18", "OIII-20", "OIII-21", "OIII-24", "OIII-26", "OIII-30", "OIII-34", "OIII-46", "OIII-48", "OIII-58"]}>
      <p className="muted">本节概念：<C id="bands" /> · <C id="bragg" /> · <C id="edge_states" /></p>
      <Tx>{R`**研究对象。**势 $V(x)$ 具有周期结构：不必是严格意义下的周期函数，只要在 $x$ 轴的一段有限区域里"像"周期函数——同一个图样在等间距处重复 $N$ 次（只有 $N\to\infty$ 时才真正周期）。

这样的结构到处都有：由 $N$ 个相同、等距的原子（或原子团）组成的线状分子；固体物理里为理解晶体中电子的能级排布而取的一维模型。$N$ 很大时（线状大分子、宏观晶体），$V(x)$ 在很宽的范围内由周期函数给出，可以预期粒子的性质与真正周期势中几乎一样。但物理上 $N$ 永远不会真的无穷大，所以这里处理**任意** $N$。

**主线。**为研究 $V$ 对本征函数 $\varphi(x)$（本征值 $E$）的影响，引入依赖于 $E$ 的 $2\times2$ **迭代矩阵** $Q$。我们会看到：$Q$ 的本征值是实数还是虚数（模为 1 的复数），$\varphi$ 的行为截然不同；本征值又依赖于 $E$，于是能量轴自然地分成两类区域——这就引出**允许带**与**禁带**。`}</Tx>
      <Box kind="note" title="两点约定"><Tx>{R`(i) 为方便，把重复 $N$ 次的图样叫做"势垒"（图中那样），但它也可以是"势阱"或任意形状。(ii) 固体物理习惯用字母 $k$ 表示定态波函数中的一个参数，它**不**简单地正比于能量的平方根。为与这一习惯一致，本补充材料改用 $\alpha$ 代替 $\mathrm N_{\rm III}$ 中的 $k$：`}</Tx>
        <Eq n="OIII-1" say={R`势为零处的波数改记为 $\alpha$；字母 $k$ 留给后面的“晶体动量”参数。`}>{R`\alpha=\sqrt{\frac{2mE}{\hbar^2}}`}</Eq>
        <Tx>{R`字母 $k$ 留到后面再引入——它将与 $Q$ 的复本征值直接相关。`}</Tx>
      </Box>

      <Sub n="OIII-1" title="Passage through several successive identical potential barriers" zh="穿过一串相同的势垒">
        <Tx>{R`把 $N$ 个势垒并排：第一个中心在 $x=0$，第二个在 $x=l$，……，最后一个在 $x=(N-1)l$；每个占据长度 $l$ 的一段，彼此紧挨。研究本征函数 $\varphi_\alpha(x)$ 穿过这一串势垒时的行为，它满足`}</Tx>
        <Eq n="OIII-2" say={R`周期结构中的定态方程，能量用 $\alpha$ 标记。`}>{R`\Big\{\frac{\mathrm d^2}{\mathrm dx^2}+\frac{2m}{\hbar^2}[E-V(x)]\Big\}\varphi_\alpha(x)=0`}</Eq>
        <Tx>{R`$E$ 与 $\alpha$ 由 \eqref{OIII-1} 联系。`}</Tx>
        <PeriodicFig />

        <h4 id="sec-OIII-1-a">1-a 分段写解</h4>
        <Tx>{R`$N$ 个势垒的左边（$x\le-l/2$）$V=0$，通解是`}</Tx>
        <Eq n="OIII-3a" say={R`结构左边的自由区：入射与反射两列平面波。`}>{R`\text{若}\ x\le-\frac l2:\quad\varphi_\alpha(x)=A_0\,\mathrm e^{i\alpha x}+A_0'\,\mathrm e^{-i\alpha x}`}</Eq>
        <Tx>{R`像 $\mathrm N_{\rm III}$ §1-a 那样引入两个标准解，这里记为 $v_\alpha(x)$、$v_\alpha'(x)$。在第一个势垒（中心 $x=0$）内，通解是`}</Tx>
        <Eq n="OIII-3b" say={R`第一个势垒内部：两个标准解的组合。`}>{R`\text{若}\ -\frac l2\le x\le\frac l2:\quad\varphi_\alpha(x)=A_1\,v_\alpha(x)+A_1'\,v_\alpha'(x)`}</Eq>
        <Tx>{R`第二个势垒（中心 $x=l$）内，标准解平移 $l$：`}</Tx>
        <Eq n="OIII-3c" say={R`第二个势垒内部：平移后的标准解的组合，系数 $A_2$、$A_2'$。`}>{R`\text{若}\ \frac l2\le x\le\frac{3l}2:\quad\varphi_\alpha(x)=A_2\,v_\alpha(x-l)+A_2'\,v_\alpha'(x-l)`}</Eq>
        <Tx>{R`一般地，第 $n$ 个势垒（中心 $x=(n-1)l$）内：`}</Tx>
        <Eq n="OIII-3d" say={R`第 $n$ 个势垒内部：以该势垒中心为原点的标准解的组合，系数 $A_n$、$A_n'$。`}>{R`\text{若}\ (n-1)l-\frac l2\le x\le(n-1)l+\frac l2:\quad\varphi_\alpha(x)=A_n\,v_\alpha[x-(n-1)l]+A_n'\,v_\alpha'[x-(n-1)l]`}</Eq>
        <Tx>{R`最后，$N$ 个势垒的右边（$x\ge(N-1)l+l/2$）又是 $V=0$：`}</Tx>
        <Eq n="OIII-3e" say={R`结构右边的自由区：两列平面波，相位从最后一个势垒的中心量起。`}>{R`\text{若}\ x\ge(N-1)l+\frac l2:\quad\varphi_\alpha(x)=C_0\,\mathrm e^{i\alpha[x-(N-1)l]}+C_0'\,\mathrm e^{-i\alpha[x-(N-1)l]}`}</Eq>
        <Tx>{R`剩下的事是在 $x=-l/2,\,+l/2,\,\dots,\,(N-1)l+l/2$ 处把这些表达式拼接起来。`}</Tx>

        <h4 id="sec-OIII-1-b">1-b 拼接：借用孤立势垒的结果</h4>
        <Tx>{R`$v_\alpha$、$v_\alpha'$ 依赖于势的具体形状，但它们及其导数在每个势垒两端的值很容易用 $\mathrm N_{\rm III}$ 的结果算出。**技巧**：设想只保留第 $n$ 个势垒，把其余的都拿掉。\eqref{OIII-3d} 在这个势垒内照样成立，把它向左、右延拓就是平面波的叠加——只要在 \eqref{NIII-6a}、\eqref{NIII-6b} 中把 $x$ 换成 $x-(n-1)l$、$k$ 换成 $\alpha$，并给 $A,A',\tilde A,\tilde A'$ 加上下标 $n$。孤立的第 $n$ 个势垒左边（$x\le(n-1)l-l/2$）：`}</Tx>
        <Eq n="OIII-4" say={R`孤立的第 $n$ 个势垒左边的平面波形式，与该势垒内部的解在左端点处值与导数都相同。`}>{R`A_n\,\mathrm e^{i\alpha[x-(n-1)l]}+A_n'\,\mathrm e^{-i\alpha[x-(n-1)l]}`}</Eq>
        <Tx>{R`右边（$x\ge(n-1)l+l/2$）：`}</Tx>
        <Eq n="OIII-5" say={R`孤立的第 $n$ 个势垒右边的平面波形式。`}>{R`${AT}_n\,\mathrm e^{i\alpha[x-(n-1)l]}+${ATP}_n\,\mathrm e^{-i\alpha[x-(n-1)l]}`}</Eq>
        <Tx>{R`两组系数由传递矩阵联系：`}</Tx>
        <Eq n="OIII-6" say={R`单个势垒的传递矩阵把它左侧的系数变成右侧的系数。`}>{R`\begin{pmatrix}${AT}_n\\${ATP}_n\end{pmatrix}=M(\alpha)\begin{pmatrix}A_n\\A_n'\end{pmatrix}`}</Eq>
        <Tx>{R`$M(\alpha)$ 就是 $\mathrm N_{\rm III}$ 的 $M(k)$（换了记号）。**要点**：在第 $n$ 个势垒的左端，\eqref{OIII-3d} 与平面波叠加 \eqref{OIII-4} 的值和导数都相同；在右端，它与 \eqref{OIII-5} 的值和导数都相同。势垒端点处的边界数据就这样全部用平面波表示出来，拼接条件变得很简单。

在第一个势垒左端（$x=-l/2$），\eqref{OIII-3a} 与 $A_1\mathrm e^{i\alpha x}+A_1'\mathrm e^{-i\alpha x}$ 的值和导数相同，立即得到`}</Tx>
        <Eq n="OIII-7" say={R`第一个势垒左侧的平面波系数就是整个结构左边的系数。`}>{R`\begin{cases}A_0=A_1\\A_0'=A_1'\end{cases}`}</Eq>
        <Tx>{R`（由 $\mathrm N_{\rm III}$ 这是显然的。）第一个势垒的右端就是第二个的左端：要求 $${AT}_1\mathrm e^{i\alpha x}+${ATP}_1\mathrm e^{-i\alpha x}$ 与 $A_2\mathrm e^{i\alpha(x-l)}+A_2'\mathrm e^{-i\alpha(x-l)}$ 值与导数都相同，即同一函数的两种写法，系数差一个相位：`}</Tx>
        <Eq n="OIII-8" say={R`相邻两个势垒之间：平面波原点平移 $l$，系数只差相位因子 $\mathrm e^{\pm i\alpha l}$。`}>{R`\begin{cases}A_2=${AT}_1\,\mathrm e^{i\alpha l}\\A_2'=${ATP}_1\,\mathrm e^{-i\alpha l}\end{cases}`}</Eq>
        <Tx>{R`一般地，在第 $n$ 与第 $n+1$ 个势垒的交界（$x=nl-l/2$）：`}</Tx>
        <Eq n="OIII-9" say={R`第 $n$ 个势垒右侧的系数，换个原点就是第 $n+1$ 个势垒左侧的系数。`}>{R`\begin{cases}A_{n+1}=${AT}_n\,\mathrm e^{i\alpha l}\\A_{n+1}'=${ATP}_n\,\mathrm e^{-i\alpha l}\end{cases}`}</Eq>
        <Tx>{R`最后，在最后一个势垒的右端（$x=(N-1)l+l/2$），\eqref{OIII-3e} 与 $n=N$ 时的 \eqref{OIII-5} 值和导数相同：`}</Tx>
        <Eq n="OIII-10" say={R`结构右边的系数就是最后一个势垒右侧的系数。`}>{R`\begin{cases}C_0=${AT}_N\\C_0'=${ATP}_N\end{cases}`}</Eq>

        <h4 id="sec-OIII-1-c">1-c 迭代矩阵 Q(α)</h4>
        <Tx>{R`把相位因子也写成矩阵：`}</Tx>
        <Eq n="OIII-11" say={R`“自由传播一个周期”的矩阵：两列平面波各自获得相位 $\pm\alpha l$。`}>{R`D(\alpha)=\begin{pmatrix}\mathrm e^{i\alpha l}&0\\0&\mathrm e^{-i\alpha l}\end{pmatrix}`}</Eq>
        <Tx>{R`拼接条件 \eqref{OIII-9} 成为`}</Tx>
        <Eq n="OIII-12" say={R`换原点的操作用 $D$ 矩阵表示。`}>{R`\begin{pmatrix}A_{n+1}\\A_{n+1}'\end{pmatrix}=D(\alpha)\begin{pmatrix}${AT}_n\\${ATP}_n\end{pmatrix}`}</Eq>
        <Tx>{R`再用 \eqref{OIII-6}：`}</Tx>
        <Eq n="OIII-13" say={R`从一个势垒到下一个势垒，系数被同一个矩阵 $DM$ 变换一次。`}>{R`\begin{pmatrix}A_{n+1}\\A_{n+1}'\end{pmatrix}=D(\alpha)M(\alpha)\begin{pmatrix}A_n\\A_n'\end{pmatrix}`}</Eq>
        <Tx>{R`反复使用并利用 \eqref{OIII-7}：`}</Tx>
        <Eq n="OIII-14" say={R`走过 $n$ 个周期，系数被 $DM$ 作用 $n$ 次。`}>{R`\begin{pmatrix}A_{n+1}\\A_{n+1}'\end{pmatrix}=[D(\alpha)M(\alpha)]^n\begin{pmatrix}A_1\\A_1'\end{pmatrix}=[D(\alpha)M(\alpha)]^n\begin{pmatrix}A_0\\A_0'\end{pmatrix}`}</Eq>
        <Box kind="warning" title="勘误：(14) 左边的下分量">{R`原书 (14) 第一行左边的列矩阵印作 $\begin{pmatrix}A_{n+1}\\A_{n+1}\end{pmatrix}$，下分量漏了撇号，应为 $A_{n+1}'$（与 \eqref{OIII-13} 一致）。`}</Box>
        <Tx>{R`最后的拼接条件 \eqref{OIII-10} 用 \eqref{OIII-6} 与 \eqref{OIII-14} 改写：`}</Tx>
        <Eq n="OIII-15" say={R`整个结构的传递矩阵：最后一个势垒的 $M$ 乘上前面 $N-1$ 次迭代。`}>{R`\begin{pmatrix}C_0\\C_0'\end{pmatrix}=M(\alpha)\begin{pmatrix}A_N\\A_N'\end{pmatrix}=M(\alpha)\,[D(\alpha)M(\alpha)]^{N-1}\begin{pmatrix}A_0\\A_0'\end{pmatrix}`}</Eq>
        <Tx>{R`即`}</Tx>
        <Eq n="OIII-16" say={R`$N$ 个势垒的总传递矩阵：每个势垒贡献一个 $M$，每段间隔贡献一个 $D$，交替相乘。`}>{R`\begin{pmatrix}C_0\\C_0'\end{pmatrix}=\underbrace{M(\alpha)D(\alpha)M(\alpha)D(\alpha)\dots D(\alpha)M(\alpha)}_{N\ \text{个}\ M(\alpha)}\begin{pmatrix}A_0\\A_0'\end{pmatrix}`}</Eq>
        <Tx>{R`从 $(A_0,A_0')$ 到 $(C_0,C_0')$：每个势垒对应一个 $M(\alpha)$，两个相邻势垒之间的"间隔"对应一个 $D(\alpha)$。\eqref{OIII-13}、\eqref{OIII-14} 表明关键在于矩阵`}</Tx>
        <Eq n="OIII-17" keyEq title="迭代矩阵" say={R`迭代矩阵：沿周期结构平移一个周期 $l$，平面波系数就被 $Q$ 乘一次。`}>{R`Q(\alpha)=D(\alpha)M(\alpha)`}</Eq>
        <Tx>{R`从 $(A_1,A_1')$ 走到 $(A_{n+1},A_{n+1}')$——沿周期结构平移 $nl$——它出现 $n$ 次方，因此称为**迭代矩阵**（iteration matrix）。由 \eqref{NIII-18} 与 \eqref{OIII-11}：`}</Tx>
        <Eq n="OIII-18" keyEq title="迭代矩阵的元素" say={R`迭代矩阵：传递矩阵的第一行乘 $\mathrm e^{i\alpha l}$，第二行乘 $\mathrm e^{-i\alpha l}$。`}>{R`Q(\alpha)=\begin{pmatrix}\mathrm e^{i\alpha l}F(\alpha)&\mathrm e^{i\alpha l}G^*(\alpha)\\\mathrm e^{-i\alpha l}G(\alpha)&\mathrm e^{-i\alpha l}F^*(\alpha)\end{pmatrix}`}</Eq>
        <Tx>{R`要算 $[Q(\alpha)]^n$，最方便的是换到使 $Q$ 对角化的基——所以先研究 $Q$ 的本征值。`}</Tx>

        <h4 id="sec-OIII-1-d">1-d Q(α) 的本征值</h4>
        <Tx>{R`设 $\lambda$ 是 $Q(\alpha)$ 的本征值。\eqref{OIII-18} 的特征方程是`}</Tx>
        <Eq n="OIII-19" say={R`迭代矩阵的特征方程。`}>{R`\big[\mathrm e^{i\alpha l}F(\alpha)-\lambda\big]\big[\mathrm e^{-i\alpha l}F^*(\alpha)-\lambda\big]-|G(\alpha)|^2=0`}</Eq>
        <Tx>{R`展开后常数项是 $|F|^2-|G|^2$，按 \eqref{NIII-21} 等于 1（即 $\det Q=\det D\cdot\det M=1$）：`}</Tx>
        <Eq n="OIII-20" keyEq title="特征方程" say={R`本征值满足的二次方程：两根之积为 1，两根之和为 $2X(\alpha)$。`}>{R`\lambda^2-2\lambda\,${Xa}+1=0`}</Eq>
        <Tx>{R`$${Xa}$ 是复数 $\mathrm e^{i\alpha l}F(\alpha)$ 的实部：`}</Tx>
        <Eq n="OIII-21" keyEq title="半迹函数" say={R`决定一切的实函数：它是 $\mathrm e^{i\alpha l}F(\alpha)$ 的实部，也等于迭代矩阵迹的一半。`}>{R`${Xa}=\operatorname{Re}\big[\mathrm e^{i\alpha l}F(\alpha)\big]=\frac12\operatorname{Tr}Q(\alpha)`}</Eq>
        <Tx>{R`回忆 \eqref{NIII-32}：$|F(\alpha)|\ge1$，所以 $|\mathrm e^{i\alpha l}F(\alpha)|$ 也不小于 1。二次方程 \eqref{OIII-20} 的判别式（约化形式）是`}</Tx>
        <Eq n="OIII-22" say={R`特征方程的约化判别式：$|X|$ 是否超过 1 决定两根是实是虚。`}>{R`\Delta'=[${Xa}]^2-1`}</Eq>
        <Tx>{R`**情形 (i)：**能量使得`}</Tx>
        <Eq n="OIII-23" say={R`允许带的条件：$X(\alpha)$ 落在 $-1$ 与 $+1$ 之间。`}>{R`|${Xa}|\le1`}</Eq>
        <Tx>{R`（例如下图中 $\alpha$ 在 $\alpha_0$ 与 $\alpha_1$ 之间。）此时可令`}</Tx>
        <Eq n="OIII-24" keyEq title="引入 Bloch 参数" say={R`在允许带里把 $X$ 写成余弦，从而定义参数 $k(\alpha)$。`}>{R`${Xa}=\cos[${ka}l]`}</Eq>
        <Eq n="OIII-25" say={R`$k(\alpha)$ 取在 0 到 $\pi/l$ 之间。`}>{R`0\le${ka}\le\frac\pi l`}</Eq>
        <Tx>{R`代入 \eqref{OIII-20}，$\lambda=\cos kl\pm\sqrt{\cos^2kl-1}=\cos kl\pm i\sin kl$：`}</Tx>
        <Eq n="OIII-26" keyEq title="允许带的本征值" say={R`允许带中，迭代矩阵的两个本征值是互为共轭、模为 1 的相位因子。`}>{R`\lambda=\mathrm e^{\pm i${ka}l}`}</Eq>
        <Tx>{R`两个本征值互为复共轭，模都等于 1。`}</Tx>
        <Tx>{R`**情形 (ii)：**能量使得`}</Tx>
        <Eq n="OIII-27" say={R`禁带的条件：$X(\alpha)$ 的绝对值大于 1。`}>{R`|${Xa}|>1`}</Eq>
        <Tx>{R`（例如 $\alpha$ 在 $\alpha_1$ 与 $\alpha_2$ 之间。）此时令`}</Tx>
        <Eq n="OIII-28" say={R`在禁带里把 $X$ 写成带符号的双曲余弦，定义衰减参数 $\rho(\alpha)$。`}>{R`${Xa}=${EPS}\cosh[\rho(\alpha)l]`}</Eq>
        <Eq n="OIII-29" say={R`$\rho(\alpha)$ 取非负值。`}>{R`\rho(\alpha)\ge0`}</Eq>
        <Tx>{R`$${Xa}>0$ 时 $${EPS}=+1$，$<0$ 时 $${EPS}=-1$。于是`}</Tx>
        <Eq n="OIII-30" keyEq title="禁带的本征值" say={R`禁带中，两个本征值是实数且互为倒数：一个随周期数指数增长，另一个指数衰减。`}>{R`\lambda=${EPS}\,\mathrm e^{\pm\rho(\alpha)l}`}</Eq>
        <Tx>{R`此时两个本征值都是实数，互为倒数。`}</Tx>
        <Box kind="physics" title={R`$\mathrm e^{i\alpha l}F(\alpha)$ 在复平面上的轨迹`}>{R`把 $\mathrm e^{i\alpha l}F(\alpha)=${X}(\alpha)+i${Y}(\alpha)$ 随 $\alpha$ 的变化画在复平面上：由于 $|F|\ge1$，曲线始终在以原点为心的单位圆**之外**。曲线落在两条竖线 $${X}=\pm1$ 之间时，对应的能量在允许带；落在两条竖线之外时在禁带。下面交互图的第二个面板就画出了这条轨迹。`}</Box>
      </Sub>

      <Sub n="OIII-2" title="Discussion: the concept of an allowed or forbidden energy band" zh="讨论：允许带与禁带">
        <h4 id="sec-OIII-2-a">2-a 波函数的行为</h4>
        <Tx>{R`为了用 \eqref{OIII-14}，先算出 $Q(\alpha)$ 的两个本征矢对应的列矩阵 $\Lambda_1(\alpha)$、$\Lambda_2(\alpha)$（本征值分别为 $\lambda_1$、$\lambda_2$），再把初始列矩阵分解为`}</Tx>
        <Eq n="OIII-31" say={R`把第一个势垒的系数按迭代矩阵的两个本征矢分解。`}>{R`\begin{pmatrix}A_1\\A_1'\end{pmatrix}=c_1(\alpha)\Lambda_1(\alpha)+c_2(\alpha)\Lambda_2(\alpha)`}</Eq>
        <Tx>{R`于是直接得到`}</Tx>
        <Eq n="OIII-32" say={R`走到第 $n$ 个势垒，两个本征分量各乘上自己本征值的 $n-1$ 次方。`}>{R`\begin{pmatrix}A_n\\A_n'\end{pmatrix}=\lambda_1^{n-1}c_1(\alpha)\Lambda_1(\alpha)+\lambda_2^{n-1}c_2(\alpha)\Lambda_2(\alpha)`}</Eq>
        <Tx>{R`**两种行为。**$|${Xa}|<1$ 时，由 \eqref{OIII-26}，穿过一个个势垒只是让两个分量各自转一个相位——$\varphi_\alpha$ 像虚指数的叠加，在结构中"传播"。$|${Xa}|>1$ 时，由 \eqref{OIII-30}，只有一个本征值（比如 $\lambda_1$）的模大于 1，$n$ 足够大时`}</Tx>
        <Eq n="OIII-33" say={R`禁带中，经过足够多个周期后，增长的那个本征分量占绝对优势，系数按 $\mathrm e^{(n-1)\rho l}$ 指数增长。`}>{R`\begin{pmatrix}A_n\\A_n'\end{pmatrix}\simeq${EPS}^{n-1}\,\mathrm e^{(n-1)\rho(\alpha)l}\,c_1(\alpha)\Lambda_1(\alpha)`}</Eq>
        <Tx>{R`$A_n$、$A_n'$ 随 $n$ 指数增长（除非恰好 $c_1(\alpha)=0$）：波函数每穿过一个势垒模就变大一些，行为像实指数的叠加。`}</Tx>

        <h4 id="sec-OIII-2-b">2-b Bragg 反射；周期势中可能的能量</h4>
        <Tx>{R`$\varphi_\alpha$ 像实指数还是虚指数，物理现象自然不同。**先看透射。**按 \eqref{OIII-15}，矩阵 $M(\alpha)[Q(\alpha)]^{N-1}$ 对 $N$ 个势垒的作用与 $M(\alpha)$ 对单个势垒的作用相同；按 \eqref{NIII-29b}，透射系数 $T_N(\alpha)$ 的倒数等于这个矩阵左上角元素的模平方。若能量使 $Q$ 的本征值为实数 \eqref{OIII-30}，$N$ 大时 $\lambda_1=${EPS}\mathrm e^{\rho(\alpha)l}$ 占优，$[Q(\alpha)]^{N-1}$ 随 $N$ 指数增长（也可从 \eqref{OIII-33} 看出），于是透射系数指数下降：`}</Tx>
        <Eq n="OIII-34" keyEq title="禁带中的透射" say={R`禁带能量下，$N$ 个势垒的透射系数随 $N$ 指数衰减。`}>{R`T_N(\alpha)\propto\mathrm e^{-2N\rho(\alpha)l}`}</Eq>
        <Tx>{R`$N$ 大时，这一串势垒几乎必然把粒子反射回去。原因是各个势垒散射的波，对透射方向完全相消、对反射方向完全相长——可以与 X 射线在晶体上的 **Bragg 反射**相比。注意这种相消干涉即使在 $E$ **高于**势垒顶时也会发生，而那时经典粒子必定通过。

**禁带有多宽？**看复平面上 $\mathrm e^{i\alpha l}F(\alpha)$ 的轨迹：它只能在单位圆外，而禁带对应它越出两条竖线 $X=\pm1$ 的那些弧段。单个势垒越透明，$|F|$ 越接近 1，轨迹越贴着单位圆走，越出竖线的弧段就越短——高能时（$\alpha\to\infty$，势的起伏相对可忽略）禁带缩成几乎孤立的能量。这些能量正是 Bragg 条件 $l=${P}\lambda/2$（$${P}$ 为整数，$\lambda$ 为 de Broglie 波长）挑出的：能量远高于势的起伏时，波长近乎确定，只有恰好"合拍"的波长才被整体反射。

**允许带呢？**本征值模为 1（\eqref{OIII-26}），$[Q(\alpha)]^{N-1}$ 的元素有界，$T_N(\alpha)$ 不会随 $N$ 增大而趋于零：波在规则的周期势中传下去而不衰减——又一个只有波动性才能解释的纯量子现象。直觉"每过一个势垒损失一点，$N$ 个就损失殆尽"给出的是 $\prod T=T^N\to0$，与正确答案完全不同（交互图中的灰色点线）：相干的多次反射使各势垒的效果不能简单相乘。

**由此猜出能谱。**周期势中的能级量子化（固体物理的核心问题）在 §3 细算，但结论现在就能猜到：$|X|>1$ 时 \eqref{OIII-33} 中的 $A_n$、$A_n'$ 随 $n$ 无界增长，波函数不能保持有界，这样的能量不被允许——**禁带**；$|X|<1$ 时系数有界——**允许带**。能谱由一段段连续的允许区间组成，中间隔着禁区。`}</Tx>
        <BandPlot />
      </Sub>

      <Sub n="OIII-3" title="Quantization of energy levels in a periodic potential; effect of boundary conditions" zh="周期势中的能级量子化；边界条件的作用">
        <Tx>{R`**模型：一维"晶体"。**质量为 $m$ 的粒子处在下图的势 $V(x)$ 中：在 $-l/2\le x\le Nl+l/2$ 内它呈周期形状，由 $N+1$ 个高 $V_0$ 的势垒组成，中心在 $x=0,l,2l,\dots,Nl$；在这个区域之外，$V$ 在与 $l$ 相当的距离上随意变化，然后变成正常数 $V_e$。$[0,Nl]$ 叫"晶格内部"，$x\le-l/2$ 与 $x\ge Nl+l/2$ 附近叫晶格的"两端（边缘）"。

物理上它代表一维模型中线状分子或晶体里电子感受到的势：$x=l/2,3l/2,\dots$ 处的阱对应各离子对电子的吸引；远离晶体时电子不受吸引力，所以 $V$ 很快变成常数。`}</Tx>
        <CrystalFig />
        <Tx>{R`**一个看似矛盾的预期。**这个势完全落在 $\mathrm M_{\rm III}$ 的框架里（只是能量零点换成了 $V_e$），所以束缚态能量分立、都低于 $V_e$。$\mathrm M_{\rm III}$ 还告诉我们：量子化是边界条件（$x\to\pm\infty$ 时 $\varphi\to0$）造成的。照此推理，晶格两端那段不规则的势应当决定能级——可是同一种晶体，表面怎么处理都不影响它的体能谱，这才符合经验。

下面的分析会化解这个矛盾，结论有两条：(1) 只要势阱足够多，绝大多数能级只由周期区域内的 $V(x)$ 决定，而且聚成允许带，正如 §2-b 的直觉；(2) 边缘的细节只影响少数几个**局域在边缘**的态，它们的能量可以落在禁带里。方法沿用 $\mathrm M_{\rm III}$：先把"波函数在两侧有界"翻译成系数之间的条件。`}</Tx>

        <h4 id="sec-OIII-3-a">3-a 波函数必须满足的条件</h4>
        <Tx>{R`在周期区域内，波函数形如 \eqref{OIII-3d}，系数 $A_n$、$A_n'$ 由 \eqref{OIII-32} 决定。为写得更明确，令`}</Tx>
        <Eq n="OIII-35" say={R`把两个本征分量（含系数）的上下分量分别记作 $f_1,f_1'$ 与 $f_2,f_2'$。`}>{R`c_1(\alpha)\Lambda_1(\alpha)=\begin{pmatrix}f_1(\alpha)\\f_1'(\alpha)\end{pmatrix},\qquad c_2(\alpha)\Lambda_2(\alpha)=\begin{pmatrix}f_2(\alpha)\\f_2'(\alpha)\end{pmatrix}`}</Eq>
        <Tx>{R`于是`}</Tx>
        <Eq n="OIII-36" say={R`第 $n$ 个势垒的系数是两个几何级数之和，公比为两个本征值。`}>{R`\begin{aligned}A_n&=f_1(\alpha)\,\lambda_1^{n-1}+f_2(\alpha)\,\lambda_2^{n-1}\\A_n'&=f_1'(\alpha)\,\lambda_1^{n-1}+f_2'(\alpha)\,\lambda_2^{n-1}\end{aligned}`}</Eq>
        <Tx>{R`**左边界。**晶格左边远处 $V=V_e$，波函数只能是（$\mathrm e^{-\mu x}$ 在 $x\to-\infty$ 发散，已舍去）`}</Tx>
        <Eq n="OIII-37a" say={R`晶体左边远处，波函数只保留朝外衰减的实指数。`}>{R`\varphi_\alpha(x)=B\,\mathrm e^{\mu(\alpha)x}`}</Eq>
        <Eq n="OIII-37b" say={R`晶体外的衰减常数由能量低于 $V_e$ 的程度决定。`}>{R`\mu(\alpha)=\sqrt{\frac{2m}{\hbar^2}(V_e-E)}`}</Eq>
        <Tx>{R`**一个巧妙的推论：$|A_n|=|A_n'|$。**实指数 \eqref{OIII-37a} 的概率流为零（\IIIc{BIII}）。定态的流与 $x$ 无关（\eqref{NIII-12}），所以在晶格内部也处处为零。按 \eqref{NIII-14}，系数 $A_n$ 与 $A_n'$ 必须等模。于是，若把左边的边界条件写成 $A_1$、$A_1'$ 之间的关系（即要求 $-l/2\le x\le l/2$ 上的表达式是 \eqref{OIII-37a} 的延拓），它必然是`}</Tx>
        <Eq n="OIII-38a" say={R`左边界条件化为一个相位条件：$A_1$ 与 $A_1'$ 等模，比值是一个相位。`}>{R`\frac{A_1}{A_1'}=\mathrm e^{i\chi(\alpha)}`}</Eq>
        <Tx>{R`$\chi(\alpha)$ 是 $\alpha$（即 $E$）的实函数，依赖于晶格左边缘 $V(x)$ 的细节。我们不需要它的具体形式；要紧的只是左边界条件具有 \eqref{OIII-38a} 的形式。

**右边界**（$x\to+\infty$）同理：`}</Tx>
        <Eq n="OIII-38b" say={R`右边界条件同样是一个相位条件，相位 $\chi'$ 由右边缘的势决定。`}>{R`\frac{A_{N+1}}{A_{N+1}'}=\mathrm e^{i\chi'(\alpha)}`}</Eq>
        <Tx>{R`实函数 $\chi'(\alpha)$ 依赖于右边缘的 $V(x)$。

**量子化的步骤。**（1）从满足 \eqref{OIII-38a} 的 $A_1$、$A_1'$ 出发，这保证 $x\to-\infty$ 时 $\varphi_\alpha$ 有界；$\varphi_\alpha$ 只确定到常数因子，可取`}</Tx>
        <Eq n="OIII-39" say={R`满足左边界条件的一个方便选择：两个系数互为共轭。`}>{R`A_1=\mathrm e^{i\chi(\alpha)/2},\qquad A_1'=\mathrm e^{-i\chi(\alpha)/2}`}</Eq>
        <Tx>{R`（2）用 \eqref{OIII-36} 算出 $A_n$、$A_n'$，把波函数延拓到整个晶体。条件 \eqref{OIII-39} 意味着 $\varphi_\alpha$ 是实函数（$\mathrm N_{\rm III}$ §1-b：$v_\alpha'=v_\alpha^*$），所以算出来必然有`}</Tx>
        <Eq n="OIII-40" say={R`实波函数要求每个势垒中的两个系数互为复共轭。`}>{R`A_n'=A_n^*`}</Eq>
        <Tx>{R`（3）最后要求 $A_{N+1}$、$A_{N+1}'$ 满足 \eqref{OIII-38b}，保证 $x\to+\infty$ 时有界。由 \eqref{OIII-40}，比值 $A_{N+1}/A_{N+1}'$ 自动是模为 1 的复数，\eqref{OIII-38b} 只是两个相位相等——一个关于 $\alpha$ 的**实**方程，它的若干实根给出允许的能量。

下面分两种情形：$Q(\alpha)$ 的本征值为虚数（模为 1，$|X(\alpha)|<1$）与为实数（$|X(\alpha)|>1$）。`}</Tx>

        <h4 id="sec-OIII-3-b">3-b 允许带：晶格内部的定态</h4>
        <Tx>{R`设 $E$ 落在 $|${Xa}|<1$ 的区域。

**$\alpha$. 量子化方程的形式。**用 \eqref{OIII-26}，\eqref{OIII-36} 变为`}</Tx>
        <Eq n="OIII-41" say={R`允许带中，系数是两列“Bloch 波”的叠加，相位每个周期前进 $\pm kl$。`}>{R`\begin{cases}A_n=f_1(\alpha)\,\mathrm e^{i(n-1)${ka}l}+f_2(\alpha)\,\mathrm e^{-i(n-1)${ka}l}\\A_n'=f_1'(\alpha)\,\mathrm e^{i(n-1)${ka}l}+f_2'(\alpha)\,\mathrm e^{-i(n-1)${ka}l}\end{cases}`}</Eq>
        <Tx>{R`选择 \eqref{OIII-39} 使得对所有 $n$ 都有 $A_n'=A_n^*$。容易证明 \eqref{OIII-41} 给出一对共轭复数，当且仅当`}</Tx>
        <Eq n="OIII-42" say={R`要使每个 $A_n'$ 都是 $A_n$ 的共轭，两组系数必须交叉共轭。`}>{R`\begin{aligned}f_1^*(\alpha)&=f_2'(\alpha)\\f_2^*(\alpha)&=f_1'(\alpha)\end{aligned}`}</Eq>
        <Tx>{R`（对 $A_n^*$ 取共轭后 $\mathrm e^{\pm i(n-1)kl}$ 互换，与 $A_n'$ 逐项比较即得。）于是条件 \eqref{OIII-38b} 写成`}</Tx>
        <Eq n="OIII-43" say={R`右边界条件在允许带中的形式：一个关于 $\alpha$ 的相位方程，$N$ 通过 $\mathrm e^{2iNkl}$ 进入。`}>{R`\frac{f_1(\alpha)\,\mathrm e^{2iN${ka}l}+f_2(\alpha)}{f_2^*(\alpha)\,\mathrm e^{2iN${ka}l}+f_1^*(\alpha)}=\mathrm e^{i\chi'(\alpha)}`}</Eq>
        <Tx>{R`这个关于 $\alpha$ 的方程给出能级的量子化。解出 $\mathrm e^{2iNkl}$，令`}</Tx>
        <FormulaMap n="OIII-44" say={R`把边缘的影响全部收进一个相位 $\Theta(\alpha)$（分子分母互为共轭，所以比值的模为 1）。`} tree={FM_OIII_44} start="p1" />
        <Tx>{R`（原则上 $\Theta$ 可由 $\chi(\alpha)$、$\chi'(\alpha)$ 与 $Q(\alpha)$ 算出。）\eqref{OIII-43} 简化为`}</Tx>
        <Eq n="OIII-45" say={R`量子化条件化为两个相位因子相等。`}>{R`\mathrm e^{2iN${ka}l}=\mathrm e^{i\Theta(\alpha)}`}</Eq>
        <Tx>{R`所以能级由下式给出：`}</Tx>
        <Eq n="OIII-46" keyEq title="允许带中的能级" say={R`允许带中的能级：$k(\alpha)$ 取一串等间距（间隔 $\pi/Nl$）的值，再加上边缘相位造成的小平移。`}>{R`${ka}=\frac{\Theta(\alpha)}{2Nl}+${P}\,\frac{\pi}{Nl}`}</Eq>
        <Eq n="OIII-47" say={R`整数 $p$ 只能取 $N$ 个值。`}>{R`${P}=0,1,2,\dots,(N-1)`}</Eq>
        <Tx>{R`（其他 $${P}$ 值必须排除，因为 \eqref{OIII-25} 限定 $${KA}$ 在宽为 $\pi/l$ 的区间内变化。）$N$ 很大时，\eqref{OIII-46} 可以简化为`}</Tx>
        <Eq n="OIII-48" keyEq title="大 N 极限" say={R`晶体很长时边缘相位可忽略：$k$ 在 0 到 $\pi/l$ 之间等间距取 $N$ 个值，与边缘细节无关。`}>{R`${ka}\simeq${P}\,\frac{\pi}{Nl}`}</Eq>

        <Tx>{R`**$\beta$. 图解；能级的位置。**把定义 \eqref{OIII-24} 代入 \eqref{OIII-46} 就是关于 $\alpha$ 的方程。图解：先画 $${Xa}=\operatorname{Re}[\mathrm e^{i\alpha l}F(\alpha)]$。由于虚指数 $\mathrm e^{i\alpha l}$，曲线振荡；由于 $|F|\ge1$（\eqref{NIII-32}），振幅大于 1，曲线与直线 $X=\pm1$ 相交于 $\alpha_0,\alpha_1,\alpha_2,\dots$。去掉 $|X|>1$ 的那些 $\alpha$ 区间，在剩下的弧段上画`}</Tx>
        <Eq n="OIII-49" say={R`由 $X(\alpha)$ 反解出 $k(\alpha)$：反余弦除以周期。`}>{R`${ka}=\frac1l\operatorname{Arccos}${Xa}`}</Eq>
        <Tx>{R`（反余弦取主值 $[0,\pi]$。）由 \eqref{OIII-46}，能级是这条曲线与 $\Theta(\alpha)/2Nl+${P}\pi/Nl$ 的交点；$N\gg1$ 时就是与水平线 $y=${P}\pi/Nl$（$${P}=0,1,\dots,N-1$）的交点。于是得到一组组能级：它们对应等间距的 $${KA}$ 值，位于允许带 $\alpha_0\le\alpha\le\alpha_1$、$\alpha_2\le\alpha\le\alpha_3$……之中；带与带之间是禁带（§c）。交互图的 $k(\alpha)$ 面板展示的就是这条曲线和这些水平线。

**为什么用 $k$ 作变量。**在一个允许带内，可以按对应的 $${KA}$ 值给每个能级定位——于是很自然地反过来把 $\alpha$ 与 $E$ 看作 $k$ 的函数 $\alpha(k)$、$E(k)$。$k$ 与 $\alpha$ 的关系由 $k(\alpha)$ 曲线直接给出，再算 $E=\hbar^2\alpha^2/2m$ 即得**色散关系** $E(k)$（交互图第三个面板）。

**评注。**同一个 $k$ 对应几个不同的 $\alpha$（几个能带），所以 $E(k)$ 有好几支。但若在某个允许带中 $${Xa}$ 从 $-1$ 单调增到 $+1$（或单调减），这个带中每个 $k$ 恰对应一个能级，**这个带恰好含 $N$ 个能级**。`}</Tx>

        <Tx>{R`**$\gamma$. 讨论。**上面的计算表明，$N$ 从 1 增大到很大时，一组分立能级是怎样逐渐变成允许带的。严格地说能带仍由分立能级组成，但对宏观晶格，能级间隔小到实际上构成连续区。以 $k$ 为参数时，**态密度**（单位 $k$ 区间内的能级数）**是常数** $Nl/\pi$——这一非常有用的性质，正是通常选 $k$ 作变量的原因。

从 \eqref{OIII-46} 到 \eqref{OIII-48} 还有一个要点：$N$ 大时，只通过 $\chi(\alpha)$、$\chi'(\alpha)$ 以及 $\Theta(\alpha)$ 进入的边缘效应不再起作用，决定能级的只是晶格内部周期势的形状。

**两个极限情形。**(i) $V(x)=0$（自由粒子）：`}</Tx>
        <Eq n="OIII-50" say={R`没有势时，传递矩阵的对角元为 1，$X(\alpha)$ 就是 $\cos\alpha l$。`}>{R`\begin{cases}F(\alpha)=1\\${Xa}=\cos\alpha l\end{cases}`}</Eq>
        <Tx>{R`于是`}</Tx>
        <Eq n="OIII-51" say={R`自由粒子的 $k(\alpha)$ 是一条锯齿形折线：$\alpha$ 被“折叠”回 0 到 $\pi/l$ 之间。`}>{R`\begin{aligned}&\text{若}\ 0\le\alpha\le\frac\pi l:\quad${ka}=\alpha\\&\text{若}\ \frac\pi l\le\alpha\le\frac{2\pi}l:\quad${ka}=\frac{2\pi}l-\alpha\\&\text{等等}\end{aligned}`}</Eq>
        <Tx>{R`（交互图中的虚线折线。）由 \eqref{OIII-50}，条件 $|X|\le1$ 永远满足：我们知道，自由粒子没有禁带。比较 $E(k)$ 面板中的实线与虚线就能看出势的作用：一旦出现禁带，能量曲线就变形，使得在 $k=0$ 与 $k=\pi/l$（带边）处切线水平；与自由粒子不同，每个带中都有一个拐点，在那里能量随 $k$ 线性变化。

(ii) 单个势垒的透射系数 $T(\alpha)$ 几乎为零时，由 \eqref{NIII-29b} 与 \eqref{NIII-21}：`}</Tx>
        <Eq n="OIII-52" say={R`单个势垒几乎不透明时，$F$ 与 $G$ 的模都很大。`}>{R`\begin{cases}|F(\alpha)|\gg1\\|G(\alpha)|\gg1\end{cases}`}</Eq>
        <Tx>{R`复平面上 $\mathrm e^{i\alpha l}F(\alpha)$ 离原点很远，$|X|<1$ 的 $\alpha$ 区间极窄：**单个势垒的透射系数减小，允许带随之变窄**；透射为零的极限下，能带缩成孤立势阱的各个能级。反过来，一旦隧道效应让粒子能从一个阱跑到下一个阱，阱的每个分立能级就展宽成一个能带，带宽随透射系数增大而增加（$\mathrm F_{\rm XI}$ 将回到这一点）。在交互图中减小势垒宽度或高度就能看到这一点。`}</Tx>

        <h4 id="sec-OIII-3-c">3-c 禁带：局域在边缘的定态</h4>
        <Tx>{R`**$\alpha$. 方程的形式；能级。**现在设 $\alpha$ 落在 $|${Xa}|>1$ 的区域。由 \eqref{OIII-30}，\eqref{OIII-36} 写成`}</Tx>
        <Eq n="OIII-53" say={R`禁带中，系数是一个指数增长项与一个指数衰减项之和（带符号 $\varepsilon^{n-1}$）。`}>{R`\begin{cases}A_n=${EPS}^{n-1}\big[f_1(\alpha)\,\mathrm e^{(n-1)\rho(\alpha)l}+f_2(\alpha)\,\mathrm e^{-(n-1)\rho(\alpha)l}\big]\\A_n'=${EPS}^{n-1}\big[f_1'(\alpha)\,\mathrm e^{(n-1)\rho(\alpha)l}+f_2'(\alpha)\,\mathrm e^{-(n-1)\rho(\alpha)l}\big]\end{cases}`}</Eq>
        <Tx>{R`对所有 $n$ 都有 $A_n'=A_n^*$，这次（实指数不交换）要求`}</Tx>
        <Eq n="OIII-54" say={R`禁带中，每个分量的上下系数各自互为共轭。`}>{R`\begin{cases}f_1'(\alpha)=f_1^*(\alpha)\\f_2'(\alpha)=f_2^*(\alpha)\end{cases}`}</Eq>
        <Tx>{R`量子化条件 \eqref{OIII-38b} 变成`}</Tx>
        <Eq n="OIII-55" say={R`禁带中的右边界条件：$N$ 只通过很小的因子 $\mathrm e^{-2N\rho l}$ 出现。`}>{R`\frac{A_{N+1}}{A_{N+1}'}=\frac{f_1(\alpha)+f_2(\alpha)\,\mathrm e^{-2N\rho(\alpha)l}}{f_1^*(\alpha)+f_2^*(\alpha)\,\mathrm e^{-2N\rho(\alpha)l}}=\mathrm e^{i\chi'(\alpha)}`}</Eq>
        <Box kind="warning" title="勘误：(55) 中漏了等号">{R`原书 (55) 印成 $\frac{A_{N+1}}{A'_{N+1}}=\frac{f_1+f_2\mathrm e^{-2N\rho l}}{f_1^*+f_2^*\mathrm e^{-2N\rho l}}\,\mathrm e^{i\chi'}$，读起来像是比值再乘以 $\mathrm e^{i\chi'}$。由 \eqref{OIII-53}（取 $n=N+1$，公因子 $${EPS}^N\mathrm e^{N\rho l}$ 约去）左边等于那个分式，而条件 \eqref{OIII-38b} 要求它等于 $\mathrm e^{i\chi'}$——中间漏了一个等号。由此才能推出 \eqref{OIII-56}–\eqref{OIII-57}。`}</Box>
        <Tx>{R`即（解出 $\mathrm e^{-2N\rho l}$ 并上下同乘 $\mathrm e^{-i\chi'/2}$）`}</Tx>
        <Eq n="OIII-56" say={R`禁带能级的方程：左边是随 $N$ 指数变小的数，右边是只与边缘有关的实函数。`}>{R`\mathrm e^{-2N\rho(\alpha)l}=${LA}(\alpha)`}</Eq>
        <Tx>{R`其中实函数 $${LA}(\alpha)$ 定义为`}</Tx>
        <FormulaMap n="OIII-57" say={R`只依赖于边缘相位与本征分量的实函数（分子、分母都是纯虚数）。`} tree={FM_OIII_57} start="f1" />
        <Tx>{R`$N\gg1$ 时 $\mathrm e^{-2N\rho l}\simeq0$，\eqref{OIII-56} 化为`}</Tx>
        <Eq n="OIII-58" keyEq title="边缘态的能级" say={R`禁带中的能级由 $L(\alpha)$ 的零点给出，与晶体长度 $N$ 无关。`}>{R`${LA}(\alpha)=0`}</Eq>
        <Tx>{R`所以禁带中的能级是 $${LA}(\alpha)$ 的零点。$N$ 既不出现在 \eqref{OIII-57} 中也不出现在 \eqref{OIII-58} 中，这类能级的数目与 $N$ 无关（不像允许带中的能级数）。因此 $N\gg1$ 时可以说：几乎所有能级都聚在允许带里。

**$\beta$. 讨论。**这里的情形与 §b 截然不同：晶格长度 $N$ 不起作用（只要足够大）；而 \eqref{OIII-57} 表明边缘相位 $\chi$、$\chi'$ 起决定作用。既然它们取决于晶格边缘处的 $V(x)$，可以预期这些态局域在边缘。确实如此。\eqref{OIII-57}、\eqref{OIII-58} 给出两种可能：

(i) 若 $f_1(\alpha)\ne0$，$${LA}(\alpha)=0$ 要求`}</Tx>
        <Eq n="OIII-59" say={R`第一种边缘态：增长的本征分量自身就满足右边界条件。`}>{R`\frac{f_1(\alpha)}{f_1^*(\alpha)}=\frac{f_1(\alpha)}{f_1'(\alpha)}=\mathrm e^{i\chi'(\alpha)}`}</Eq>
        <Tx>{R`按定义 \eqref{OIII-35}，这正是说：**只用 $Q(\alpha)$ 的第一个本征矢**构造的波函数，自己就满足了右边界条件。为什么右边界只"看"第一个本征矢？因为从左端出发、满足左边界条件的任意解，其系数列矩阵一般在两个本征矢上都有分量；走过 $N\gg1$ 个周期后，增长的那个分量以 $|\lambda_1|^N$ 的倍数压倒另一个（\eqref{OIII-33}），到达右端时 $(A_{N+1},A_{N+1}')$ 实际上就平行于第一个本征矢。

$|\lambda_1|>1$ 意味着这个波函数沿 $x$ 方向指数增长——从晶格右端往里看，它是指数衰减的：这是一个**局域在晶格右端**的定态。

(ii) 若 $f_1(\alpha)=0$，由 \eqref{OIII-54} 也有 $f_1'(\alpha)=0$，再由 \eqref{OIII-35} 得 $c_1(\alpha)=0$：态只由第二个（衰减的）本征矢构成，于是**局域在晶格左端**；其余讨论与 (i) 相同。`}</Tx>
        <Box kind="physics" title="表面态">{R`这类能量落在禁带里、波函数从晶体表面向内指数衰减的态，在三维固体中称为**表面态**（Tamm 态）。它们的数目由表面决定而不随晶体变大而增多，所以对体性质影响很小，却主导了许多表面与界面现象。`}</Box>
      </Sub>
    </Sec>);
}
