// §8.2 Large scales —— 式 (8.16)–(8.39)，图 8.5–8.7
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { PhiPlot, RegimeDiagram } from "./_ch08_plots.jsx";

const R = String.raw;

export function Sec82() {
  return (
    <Sec n="8.2" title="Large scales" zh="大尺度"
      gist={R`大尺度模式先在视界外穿过物质–辐射相等，再在物质期进入视界。前一段可精确求解：势降到 $9/10$（\eqref{8.31}），于是辐射期 $\Phi=\frac23\mathcal R$、物质期 $\Phi=\frac35\mathcal R$；后一段证明物质期 $\Phi=$ 常数是严格解，所以 $k\ll k_{\rm eq}$ 时 $T(k)=1$。`}
      why={R`这一节回答了两个"大尺度"问题：\eqref{8.4} 里的 $3/5$ 从哪来？转移函数为什么在大尺度上等于 1？两者合起来，也给出了功率谱转折的位置 $k_{\rm eq}$。`}
      gives={["8.24", "8.31", "8.32", "8.35", "8.37", "8.38", "8.39"]}>
      <p className="muted">本节概念：<C id="nine_tenths" /> · <C id="const_phi" /> · <C id="keq" /></p>
      <Tx>{R`**两段路。**在大尺度上，我们可以先得到势穿过物质–辐射转变的解析解，再得到它穿越视界的解析解。先从对物质–辐射转变成立的视界外解开始。\secref{8.2.1} 的结论是：宇宙从辐射主导变为物质主导时，势下降为原来的 $9/10$。`}</Tx>

      <Sub n="8.2.1" title="Super-horizon solution" zh="视界外解">
        <Tx>{R`**丢掉所有含 $k$ 的项。**对远在视界外的模式（$k\eta\ll1$，\figref{8.5} 中的区域），演化方程中所有依赖 $k$ 的项都可以丢掉。由 \eqref{8.10} 与 \eqref{8.12} 可见，在这一极限下速度（$u_{\rm c}$ 与 $\Theta_{{\rm r},1}$）与其余方程脱耦，要解的方程立刻从五个减为三个。至于第三个方程：\eqref{8.15} 中有与 $k$ 成反比的项，难以处理，所以改用 \eqref{8.14}。剩下`}</Tx>
        <Figure n="8.5" interactive={<RegimeDiagram lk0={-3} reg0="sh" />}
          caption={R`\secref{8.2.1} 研究的区域：在进入物质主导之前一直位于视界外的扰动的视界外演化。**交互版**：默认选中 $k=10^{-3}\,h\,\mathrm{Mpc^{-1}}$ 的模式，它在 $a\approx0.01$ 才进入视界。`} />
        <Eq n="8.16" say={R`视界外辐射单极只随势变化：$\Theta_{{\rm r},0}'=-\Phi'$，偶极（流动）来不及起作用。`}>{R`\Theta'_{{\rm r},0} = -\Phi',`}</Eq>
        <Eq n="8.17" say={R`视界外暗物质过密度只因局域体积变化而变：$\delta_{\rm c}'=-3\Phi'$。`}>{R`\delta_{\rm c}{}' = -3\Phi',`}</Eq>
        <Eq n="8.18" title="视界外 Einstein 方程" say={R`丢掉 $k^2\Phi$ 后的 00 分量：势的演化完全由密度扰动与膨胀率决定。`}>{R`3\frac{a'}{a}\left(\Phi'+\frac{a'}{a}\Phi\right) = 4\pi Ga^2\left[\rho_{\rm c}\delta_{\rm c}+4\rho_{\rm r}\Theta_{{\rm r},0}\right].`}</Eq>
        <Tx>{R`**利用绝热初条件。**还可以更进一步：前两个方程要求 $\delta_{\rm c}-3\Theta_{{\rm r},0}$ 为常数；而且我们知道这个常数为零（这正是 \secref{7.5} 的绝热初条件）。于是用暗物质方程 \eqref{8.17}，并在 Einstein 方程中令 $\Theta_{{\rm r},0}=\delta_{\rm c}/3$，Einstein 方程变为`}</Tx>
        <Eq n="8.19" say={R`代入 $\Theta_{{\rm r},0}=\delta_{\rm c}/3$：辐射的贡献 $\frac43\rho_{\rm r}\delta_{\rm c}$ 写成暗物质项乘以 $\frac4{3y}$。`}>{R`3\frac{a'}{a}\left(\Phi'+\frac{a'}{a}\Phi\right) = 4\pi Ga^2\rho_{\rm c}\delta_{\rm c}\left[1+\frac4{3y}\right],`}</Eq>
        <Tx>{R`其中引入了`}</Tx>
        <Eq n="8.20" keyEq title="新的时间变量 y" say={R`$y$ 是以相等时刻为单位的标度因子，也等于物质与辐射的密度比：$y=1$ 即相等。`}>{R`y \equiv \frac{a}{a_{\rm eq}} = \frac{\rho_{\rm m}}{\rho_{\rm r}},`}</Eq>
        <Tx>{R`下面用它代替 $\eta$ 或 $a$ 作为演化变量。由于忽略重子，也可以把 \eqref{8.20} 的分子换成 $\rho_{\rm c}$——一个能略微提高解析解精度的简单修正。

**换自变量。**\eqref{8.17} 与 \eqref{8.19} 是关于 $\delta_{\rm c}$ 与 $\Phi$ 两个变量的两个一阶方程。策略是把它们化成一个二阶方程再求解。先用新变量 $y$ 改写。对 $y$ 与对 $\eta$ 的导数之间的关系为`}</Tx>
        <Eq n="8.21" say={R`对共形时间求导等于 $aHy$ 乘以对 $y$ 求导：因为 $dy/d\eta=a'/a_{\rm eq}=a^2H/a_{\rm eq}=aHy$。`}>{R`\begin{aligned}\frac{d}{d\eta} &= \frac{dy}{d\eta}\frac{d}{dy}\\ &= aHy\frac{d}{dy},\end{aligned}`}</Eq>
        <Tx>{R`第二行用了 $y$ 的定义与 $a'=a^2H$。于是 Einstein 方程化为`}</Tx>
        <Eq n="8.22" say={R`用 $y$ 写的视界外 Einstein 方程：左边是 $d(y\Phi)/dy$，右边是暗物质过密度乘以一个从辐射期（$\frac23$）过渡到物质期（$\frac12$）的系数。`}>{R`\begin{aligned}y\frac{d\Phi}{dy}+\Phi &= \frac{y}{2(y+1)}\delta_{\rm c}\left[1+\frac4{3y}\right]\\ &= \frac{3y+4}{6(y+1)}\delta_{\rm c}\end{aligned}`}</Eq>
        <Tx>{R`其中第一行右边成立是因为 $8\pi G\rho_{\rm c}/3=(8\pi G\rho/3)\,y/(y+1)=H^2y/(y+1)$。`}</Tx>
        <Derivation title={R`从 \eqref{8.19} 到 \eqref{8.22}`} collapsed steps={[
          { tex: R`3\frac{a'}{a}\left(\Phi'+\frac{a'}{a}\Phi\right)=3(aH)\left(aHy\frac{d\Phi}{dy}+aH\Phi\right)=3a^2H^2\left(y\frac{d\Phi}{dy}+\Phi\right)`, why: R`$a'/a=aH$，并用 \eqref{8.21}。` },
          { tex: R`4\pi Ga^2\rho_{\rm c}=\frac32a^2\cdot\frac{8\pi G\rho_{\rm c}}{3}=\frac32a^2H^2\frac{y}{y+1}`, why: R`总密度 $\rho=\rho_{\rm c}+\rho_{\rm r}$（无重子、无暗能量），$\rho_{\rm c}/\rho=y/(1+y)$，且 $8\pi G\rho/3=H^2$。` },
          { tex: R`y\frac{d\Phi}{dy}+\Phi=\frac{y}{2(y+1)}\delta_{\rm c}\left[1+\frac4{3y}\right]=\frac{3y+4}{6(y+1)}\delta_{\rm c}`, why: R`两边除以 $3a^2H^2$。` },
        ]} />
        <Tx>{R`**化成一个二阶方程。**一般地，要把两个一阶方程化为一个二阶方程，就对其中一个求导。这里为了简化代数，先把 \eqref{8.22} 改写成 $\delta_{\rm c}$ 的表达式，再对 $y$ 求导，最后借暗物质方程 \eqref{8.17} 令 $d\delta_{\rm c}/dy=-3d\Phi/dy$。得到`}</Tx>
        <Eq n="8.23" say={R`把 \eqref{8.22} 解出的 $\delta_{\rm c}$ 对 $y$ 求导，并令它等于 $-3d\Phi/dy$（\eqref{8.17}）。`}>{R`-3\frac{d\Phi}{dy} = \frac{d}{dy}\left\{\frac{6(y+1)}{3y+4}\left[y\frac{d\Phi}{dy}+\Phi\right]\right\}.`}</Eq>
        <Tx>{R`求导虽繁琐但很直接（\exref{8.4}(a)），结果是`}</Tx>
        <Eq n="8.24" keyEq title="视界外势的二阶方程" say={R`视界外势满足的二阶常微分方程：系数只依赖 $y$，即只依赖背景从辐射期到物质期的转变。`}>{R`\frac{d^2\Phi}{dy^2} + \frac{21y^2+54y+32}{2y(y+1)(3y+4)}\frac{d\Phi}{dy} + \frac{\Phi}{y(y+1)(3y+4)} = 0.`}</Eq>
        <Derivation title={R`从 \eqref{8.23} 到 \eqref{8.24}（\exref{8.4}(a)）`} collapsed steps={[
          { tex: R`g(y)\equiv\frac{6(y+1)}{3y+4},\qquad g'(y)=\frac{6(3y+4)-18(y+1)}{(3y+4)^2}=\frac{6}{(3y+4)^2}`, why: R`记前因子为 $g$。` },
          { tex: R`-3\Phi_y=g'(y\Phi_y+\Phi)+g(y\Phi_{yy}+2\Phi_y)`, why: R`对乘积求导，$\frac{d}{dy}(y\Phi_y+\Phi)=y\Phi_{yy}+2\Phi_y$。下标 $y$ 表示对 $y$ 的导数。` },
          { tex: R`\Phi_{yy}+\left[\frac2y+\frac{g'}{g}+\frac{3}{gy}\right]\Phi_y+\frac{g'}{gy}\Phi=0`, why: R`除以 $gy$。` },
          { tex: R`\frac{g'}{g}=\frac1{(y+1)(3y+4)},\qquad\frac{3}{gy}=\frac{3y+4}{2y(y+1)}`, why: R`代入 $g$。` },
          { tex: R`\frac2y+\frac1{(y+1)(3y+4)}+\frac{3y+4}{2y(y+1)}=\frac{4(y+1)(3y+4)+2y+(3y+4)^2}{2y(y+1)(3y+4)}=\frac{21y^2+54y+32}{2y(y+1)(3y+4)}`, why: R`通分：$12y^2+28y+16+2y+9y^2+24y+16$。` },
        ]} result={R`即 \eqref{8.24}；$\Phi$ 的系数为 $g'/(gy)=1/[y(y+1)(3y+4)]$。`} />
        <Tx>{R`**Kodama–Sasaki 的妙招。**值得注意的是，Kodama & Sasaki (1984) 找到了 \eqref{8.24} 的解析解。他们引入新变量`}</Tx>
        <Eq n="8.25" say={R`一个巧妙的代换：把势乘以 $y^3/\sqrt{1+y}$，使新方程不再含有正比于未知函数本身的项。`}>{R`u \equiv \frac{y^3}{\sqrt{1+y}}\Phi.`}</Eq>
        <Tx>{R`用这个变量，\eqref{8.24} 变为（\exref{8.4}(b)）`}</Tx>
        <Eq n="8.26" say={R`$u$ 的方程中没有正比于 $u$ 的项，所以它实际上是 $du/dy$ 的一阶方程。`}>{R`\frac{d^2u}{dy^2} + \frac{du}{dy}\left[-\frac2y+\frac{3/2}{1+y}-\frac{3}{3y+4}\right] = 0.`}</Eq>
        <Tx>{R`也就是说，没有正比于 $u$ 的项。于是我们得到的不是 $\Phi$ 的二阶方程，而是 $du/dy$ 的**一阶**方程，而且幸运地可以积分。接下来几步记 $u'\equiv du/dy$（注意：这里的撇号是对 $y$ 求导），有`}</Tx>
        <Eq n="8.27" say={R`分离变量：$u'$ 的对数导数是三个简单分式之和，可以逐项积分。`}>{R`\frac{du'}{u'} = dy\left[\frac2y-\frac{3/2}{1+y}+\frac{3}{3y+4}\right],`}</Eq>
        <Tx>{R`积分得`}</Tx>
        <Eq n="8.28" say={R`逐项积分得到 $\ln u'$：三个对数加一个积分常数。`}>{R`\ln(u') = 2\ln(y) - (3/2)\ln(1+y) + \ln(3y+4) + \text{constant}.`}</Eq>
        <Tx>{R`取指数，`}</Tx>
        <Eq n="8.29" say={R`$du/dy$ 的显式形式，常数 $A$ 待定。`}>{R`u' = \frac{du}{dy} = \sym{ch08-Aks}{A}\frac{y^2(3y+4)}{(1+y)^{3/2}}`}</Eq>
        <Tx>{R`其中 $A$ 是待定常数（与后面 \eqref{8.52} 中的 $A$ 无关）。

**再积一次分。**离势的解析表达式只差一个积分。记住 $u$ 的定义 \eqref{8.25}，对 \eqref{8.29} 积分得`}</Tx>
        <Eq n="8.30" say={R`$y^3\Phi/\sqrt{1+y}$ 等于从 0 到 $y$ 的一个初等积分；积分下限取 0 是因为早期 $y^3\Phi\to0$。`}>{R`\frac{y^3}{\sqrt{1+y}}\Phi = \sym{ch08-Aks}{A}\int_0^yd\tilde y\frac{\tilde y^2(3\tilde y+4)}{(1+\tilde y)^{3/2}}.`}</Eq>
        <Tx>{R`这里本应还有另一个常数 $u(0)$；但早期 $y^3\Phi\to0$，所以它为零。同样的逻辑也能在做积分之前定出 $A$：小 $y$ 时被积函数变为 $4\tilde y^2$，于是 \eqref{8.30} 变为 $\Phi=4A/3$，所以 $A=3\Phi(0)/4$。积分可以解析完成（\exref{8.4}(c)），结果为`}</Tx>
        <Eq n="8.31" keyEq title="Kodama–Sasaki 视界外解" say={R`视界外势随 $y$ 的精确演化：$y\to0$ 时等于 $\Phi(0)$，$y\to\infty$ 时趋于 $\frac9{10}\Phi(0)$。`}>{R`\Phi(\boldsymbol k,y) = \frac{1}{10y^3}\left[16\sqrt{1+y}+9y^3+2y^2-8y-16\right]\Phi(\boldsymbol k,0).`}</Eq>
        <Box kind="example" title={R`两个极限的检验`}>{R`**小 $y$。**展开 $16\sqrt{1+y}=16+8y-2y^2+y^3-\frac58y^4+\cdots$，方括号中 $16$、$8y$、$2y^2$ 全部相消，剩下 $y^3+9y^3-\frac58y^4=10y^3-\frac58y^4$，所以 $\Phi/\Phi(0)=1-y/16+\cdots\to1$。（"虽然不明显"，但确实如此——两个积分常数正是按这个条件选的。）

**大 $y$。**$y^3$ 项主导，$\Phi\to\frac{9}{10}\Phi(0)$。数值上，$y=1$（相等）时 $\Phi/\Phi(0)=0.963$；$y=10$ 时 $0.916$；$y=34$（$a=0.01$）时 $0.905$——下降过程拖得很长。`}</Box>
        <Tx>{R`\eqref{8.31} 就是视界外势的最终表达式。在大 $y$，宇宙进入物质主导后，方括号中的 $y^3$ 项占主导，所以 $\Phi\to(9/10)\Phi(0)$。**即使在最大的尺度上，宇宙穿过相等时，势也下降为 $9/10$。**

**$\Phi$ 与 $\mathcal R$。**这个结果让我们得到视界外引力势 $\Phi$ 与曲率扰动 $\mathcal R$ 之间非常有用的关系。\secref{7.5} 推出辐射期 $\Phi\simeq-\Psi=(2/3)\mathcal R$。现在看到，深入物质主导后 $\Phi$ 下降为 $9/10$。由于 $\mathcal R$ 在视界外始终守恒，物质期有 $\Phi=(9/10)(2/3)\mathcal R$。总结为`}</Tx>
        <Eq n="8.32" keyEq title={R`视界外 $\Phi$ 与 $\mathcal R$`} say={R`视界外势与守恒曲率扰动之比：辐射期 $\frac23$，物质期 $\frac35=\frac9{10}\times\frac23$。`}>{R`\Phi(\boldsymbol k,\eta)\Big|_{\text{super-horizon}} = \begin{cases}\frac23\mathcal R(\boldsymbol k), & \text{radiation domination},\\ \frac35\mathcal R(\boldsymbol k), & \text{matter domination}.\end{cases}`}</Eq>
        <Tx>{R`物质主导期，正如前面提到的，$\Phi$ 甚至在视界内也不演化（下一小节证明），所以 $\Phi=(3/5)\mathcal R$ 在视界内依然成立。这就解释了转移函数定义 \eqref{8.4} 中的 $3/5$。

**与数值解比较。**\figref{8.6} 表明，这个解在最大尺度上相当好，偏差主要来自解析计算中忽略的**中微子四极矩** $\mathcal N_2$（$\mathcal N_2$ 也使 $\Phi$ 不严格等于 $-\Psi$）。解析解有一个也许出人意料的特点：虽然大尺度势在纯物质期和纯辐射期都是常数，但两者之间的过渡相当**漫长**。例如——这对下一章的 CMB 很重要——即使是最大尺度模式的势，直到 $a\simeq10^{-2}$（远晚于 $a_{\rm eq}$）仍在衰减。`}</Tx>
        <Figure n="8.6" interactive={<PhiPlot k0={0.003} />}
          caption={R`基准 $\Lambda$CDM 宇宙学中势的演化，着重于直到复合前都与视界相当或比视界大的大尺度模式。细实线是 \eqref{8.31} 的解析结果，只对远大于视界的模式成立（并忽略了 $l\ge2$ 的中微子与光子矩）。**交互版**：同图 8.1 的五方程组数值解（无中微子四极矩，因此 $k\to0$ 时精确趋于 $0.9$；原书 CLASS 曲线在 $a=0.1$ 约为 $0.85$）。把 $k$ 调到 $0.001$、$0.003$、$0.01\,\mathrm{Mpc^{-1}}$ 可对照原图三条曲线：本页数值在 $a=0.1$ 分别为 $0.889$、$0.837$、$0.645$。`} />
      </Sub>

      <Sub n="8.2.2" title="Through horizon crossing" zh="穿越视界">
        <Tx>{R`**数值解的提示。**\figref{8.6} 有一个有趣的特点：大尺度势（数值解）在很晚时（$a\gtrsim10^{-2}$）变为常数。$k=10^{-3}\,\mathrm{Mpc^{-1}}$ 的模式在 $\eta\sim k^{-1}=1000\,\mathrm{Mpc}$ 进入视界，在基准宇宙学中对应 $a\sim0.006$（原书写作 $h\,\mathrm{Mpc^{-1}}$ 与 $h^{-1}\mathrm{Mpc}$，见 \secref{8.1.2} 末的易错点）。这就是 \figref{8.7} 中突出的区域。**模式穿越视界时，势保持不变。**只要宇宙由物质主导，这个结论就成立。下面来证明它。

**巧用初条件。**我们关心的是辐射不重要时的五方程组。势只依赖物质的非均匀性，所以可以丢掉两个辐射方程 \eqref{8.10}–\eqref{8.11}。除了两个物质方程，这次保留第二个 Einstein 方程 \eqref{8.15}。它是代数方程，原则上可以消去两个物质方程中的 $\Phi$，剩下两个一阶微分方程，它们一般有两个解。但我们不直接求解，而是利用初条件"作弊"：刚刚得知，物质期深处视界外的势为常数，所以初条件是势为常数（$\Phi'=0$）。如果能证明 $\Phi=$ 常数是物质主导方程组的两个通解之一，就不必关心另一个解是什么（如果它是增长的，$\Phi'>0$，就必须关心；但它其实是衰减的）。初条件保证常数 $\Phi$ 就是**那个**解。`}</Tx>
        <Figure n="8.7" interactive={<RegimeDiagram lk0={-2.5} reg0="cp" />}
          caption={R`\secref{8.2.2} 研究的区域：模式在物质主导期穿越视界的演化。`} />
        <Tx>{R`于是要检验方程组`}</Tx>
        <Eq n="8.33" say={R`物质期、忽略 $\Phi'$ 源项前的连续性方程：$\delta_{\rm c}'=-iku_{\rm c}$。`}>{R`\delta_{\rm c}{}' + iku_{\rm c} = 0,`}</Eq>
        <Eq n="8.34" say={R`暗物质的 Euler 方程，$a'/a$ 写作 $aH$。`}>{R`u_{\rm c}{}' + aHu_{\rm c} = ik\Phi,`}</Eq>
        <Eq n="8.35" say={R`物质期的代数 Einstein 方程：$4\pi Ga^2\rho_{\rm c}=\frac32a^2H^2$，势由共动密度扰动决定。`}>{R`k^2\Phi = \frac32a^2H^2\left[\delta_{\rm c}+\frac{3aHiu_{\rm c}}{k}\right],`}</Eq>
        <Box kind="note" title={R`\eqref{8.33} 为什么没有 $-3\Phi'$`}>{R`我们正要检验 $\Phi'=0$ 是否为解；在 $\Phi=$ 常数的假设下 \eqref{8.12} 右边本就为零。不过下面的论证其实更强：把 $-3\Phi'$ 保留下来，它在化简后只贡献正比于 $\Phi'$ 或 $\Phi''$ 的项，不影响"没有正比于 $\Phi$ 的项"这一结论。`}</Box>
        <Tx>{R`是否允许 $\Phi$ 为时间常数的解。用代数方程 \eqref{8.35} 消去另两个方程中的 $\delta_{\rm c}$。物质主导期 $H\propto a^{-3/2}$，所以 $d(aH)/d\eta=-a^2H^2/2$。于是把 \eqref{8.33} 中的 $\delta_{\rm c}$ 用 $\Phi$ 与 $u_{\rm c}$ 表示，得`}</Tx>
        <Eq n="8.36" say={R`把 $\delta_{\rm c}=\frac{2k^2\Phi}{3a^2H^2}-\frac{3aHiu_{\rm c}}{k}$ 代入连续性方程并求导后得到的关系。`}>{R`\frac{2k^2\Phi'}{3a^2H^2} + \frac{2k^2\Phi}{3aH} - \frac{3aHiu_{\rm c}{}'}{k} + \frac{3a^2H^2iu_{\rm c}}{2k} + iku_{\rm c} = 0.`}</Eq>
        <Derivation title={R`\eqref{8.36} 的来历`} collapsed steps={[
          { tex: R`\delta_{\rm c}=\frac{2k^2\Phi}{3a^2H^2}-\frac{3aHiu_{\rm c}}{k}`, why: R`由 \eqref{8.35} 解出。` },
          { tex: R`\frac{d}{d\eta}\frac{1}{(aH)^2}=-\frac{2}{(aH)^3}\frac{d(aH)}{d\eta}=\frac{1}{aH},\qquad\frac{d(aH)}{d\eta}=-\frac{a^2H^2}{2}`, why: R`物质期 $aH\propto a^{-1/2}$、$a\propto\eta^2$，所以 $aH=2/\eta$。` },
          { tex: R`\delta_{\rm c}'=\frac{2k^2\Phi'}{3a^2H^2}+\frac{2k^2\Phi}{3aH}-\frac{3aHiu_{\rm c}'}{k}+\frac{3a^2H^2iu_{\rm c}}{2k}`, why: R`逐项求导；最后一项来自 $-\frac{3i u_{\rm c}}{k}\frac{d(aH)}{d\eta}$。代入 \eqref{8.33} 即得。` },
        ]} />
        <Tx>{R`现在有关于 $\Phi$ 与 $u_{\rm c}$ 的两个一阶方程。策略是化成一个关于 $\Phi$ 的二阶方程。先用速度方程 \eqref{8.34} 消去 \eqref{8.36} 中的 $u_{\rm c}{}'$（$iu_{\rm c}' = -aHiu_{\rm c}-k\Phi$），剩下`}</Tx>
        <Eq n="8.37" say={R`$\Phi'$ 正比于方括号 $\left[\frac{iu_{\rm c}}k+\frac{2\Phi}{3aH}\right]$：这个组合为零，势就不变。`}>{R`\frac{2k^2\Phi'}{3a^2H^2} + \left[\frac{iu_{\rm c}}{k}+\frac{2\Phi}{3aH}\right]\left(\frac{9a^2H^2}{2}+k^2\right) = 0.`}</Eq>
        <Tx>{R`**判据。**如果二阶方程形如 $\alpha\Phi''+\beta\Phi'=0$，即没有正比于 $\Phi$ 的项，那么 $\Phi=$ 常数就是方程组的解。所以把 \eqref{8.37} 对 $\eta$ 求导，但只看正比于 $\Phi$ 的项，丢掉所有正比于 $\Phi$ 导数的项。利用物质期 $(d/d\eta)(aH)^{-1}=1/2$，剩下的项为`}</Tx>
        <Eq n="8.38" say={R`求导后"正比于 $\Phi$"的项合起来恰好又是 \eqref{8.37} 中的方括号乘以 $aH$，而它正比于 $\Phi'$——所以根本没有正比于 $\Phi$ 的项。`}>{R`\begin{aligned}&\left[\frac{iu_{\rm c}{}'}{k}+\frac{\Phi}{3}\right]\left(\frac{9a^2H^2}{2}+k^2\right)+\left[\frac{iu_{\rm c}}{k}+\frac{2\Phi}{3aH}\right]\frac{d}{d\eta}\frac{9a^2H^2}{2}\\ &\qquad= -\left[\frac{iaHu_{\rm c}}{k}+\frac{2\Phi}{3}\right]\left(9a^2H^2+k^2\right)\end{aligned}`}</Eq>
        <Tx>{R`其中再次用速度方程消去了 $u_{\rm c}{}'$（$iu_{\rm c}'/k=-iaHu_{\rm c}/k-\Phi$），并用了 $\frac{d}{d\eta}\frac{9a^2H^2}2=9aH\cdot(-\frac{a^2H^2}2)$。但 \eqref{8.37} 告诉我们，右边方括号（$=aH\times$ \eqref{8.37} 的方括号）正比于 $\Phi'$。所以没有正比于 $\Phi$ 的项。**常数势是物质主导期的解**；初条件选中了这一模式，所以 $\Phi=$ 常数就是物质主导期**的**解。`}</Tx>
        <Box kind="physics" title="两股力量的精确平衡">{R`只要宇宙由物质主导，势就保持不变。这回答了膨胀宇宙中的一个问题：随着越来越多的物质吸积进过密区，势阱会变深吗？还是会随着物质被膨胀拉开而变浅？结论是：**在物质主导的宇宙中，这两种效应微妙地相互平衡，势保持常数。**从 \eqref{8.6} 看得最清楚：$\Phi\propto\delta_{\rm m}/a$，而视界内物质期 $\delta_{\rm m}\propto a$。暗能量开始主导时（$a\gtrsim0.1$），平衡被打破，势会衰减。这种衰减由增长因子精确描述（\secref{8.5}），按构造不影响转移函数。`}</Box>
        <Tx>{R`**本节主要结论：大尺度 $T(k)=1$。**按 \eqref{8.2} 定义的转移函数，在所有于宇宙变为物质主导**之后**才进入视界的尺度上都非常接近 1。即对所有 $k\ll a_{\rm eq}H(a_{\rm eq})$（相等时共动哈勃半径的倒数）都等于 1。\exref{8.5} 中你将证明相关尺度为`}</Tx>
        <Eq n="8.39" keyEq title="相等尺度" say={R`相等时进入视界的波数正比于物理物质密度 $\Omega_{\rm m}h^2$：基准宇宙学中约 $0.010\,\mathrm{Mpc^{-1}}$。`}>{R`k_{\rm eq} = 0.073\,\mathrm{Mpc^{-1}}\Omega_{\rm m}h^2 = 0.010\,\mathrm{Mpc^{-1}}\qquad(\text{fiducial cosmology}).`}</Eq>
        <Tx>{R`在我们工作的极限下——忽略重子与各向异性应力——转移函数**只依赖 $k/k_{\rm eq}$**。（这一点在 \secref{8.4} 的交互图中被直接利用：数值转移函数只需对 $k/k_{\rm eq}$ 算一次。）`}</Tx>
      </Sub>
    </Sec>);
}
