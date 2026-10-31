// §4.2 基本群的一般性质、§4.3 基本群的例子 —— 式 (4.5)–(4.13)，定义 4.6–4.9，命题 4.2，定理 4.2–4.6，推论 4.1，引理 4.2，
// 例 4.1–4.3，习题 4.1–4.2，图 4.6–4.9，交互图 1（WindingLab）
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Proof, Erratum, Exercise, Derivation, C } from "@kit";
import { WindingLab } from "./_ch04_demos.jsx";

const R = String.raw;

export function Sec42() {
  return (
    <Sec n="4.2" title="General properties of fundamental groups" zh="基本群的一般性质"
      gist={R`弧连通空间的基本群与基点无关（\sref{T4.2}）；同伦型相同的空间基本群同构（\sref{T4.3}），因而 $\pi_1$ 是拓扑不变量；**形变收缩**是判断同伦型的实用工具（\eqref{4.5}–\eqref{4.7}）；可缩空间单连通（\sref{T4.4}）。`}
      why={R`直接按定义算 $\pi_1$ 几乎不可能。这些一般性质让我们把空间换成更简单的"同伦替身"——圆环换成圆周，$\mathbb{R}^n$ 换成一点。`}
      gives={["4.5", "4.6", "4.7", "4.8", "4.9"]}>
      <Sub n="4.2.1" title="Arcwise connectedness and fundamental groups" zh="弧连通性与基本群">
        <Tx>{R`第 2 章（\sref{D2.8}）定义过：若对任意 $x_0,x_1\in X$ 都存在道路 $\alpha$ 使 $\alpha(0)=x_0$、$\alpha(1)=x_1$，则称 $X$ **弧连通**（arcwise connected）。`}</Tx>
        <Stmt id="T4.2">
          <Proof steps={[
            { claim: R`取道路 $\eta:I\to X$，$\eta(0)=x_0$、$\eta(1)=x_1$。若 $\alpha$ 是 $x_0$ 处的圈，则 $\eta^{-1}*\alpha*\eta$ 是 $x_1$ 处的圈（\figref{4.6}）。由 \sref{L4.1}，这给出良定义的映射`, tex: R`P_\eta:\pi_1(X,x_0)\to\pi_1(X,x_1),\qquad P_\eta([\alpha])=[\eta^{-1}*\alpha*\eta]` },
            { claim: R`$P_\eta$ 是**同态**：在 $[\alpha]$ 与 $[\beta]$ 之间插入 $[\eta]*[\eta^{-1}]=[c_{x_0}]$。`, tex: R`\begin{aligned}P_\eta([\alpha]*[\beta])&=[\eta^{-1}]*[\alpha]*[\beta]*[\eta]\\ &=[\eta^{-1}]*[\alpha]*[\eta]*[\eta^{-1}]*[\beta]*[\eta]\\ &=P_\eta([\alpha])*P_\eta([\beta])\end{aligned}`, uses: ["T4.1"], why: R`用到结合律与 $[\eta*\eta^{-1}]=[c_{x_0}]$——\sref{T4.1} 的证明对道路（而不只是圈）同样成立。` },
            { claim: R`定义 $P_\eta^{-1}:\pi_1(X,x_1)\to\pi_1(X,x_0)$，$P_\eta^{-1}([\alpha'])=[\eta*\alpha'*\eta^{-1}]$。它是 $P_\eta$ 的逆：`, tex: R`P_\eta^{-1}\circ P_\eta([\alpha])=P_\eta^{-1}([\eta^{-1}*\alpha*\eta])=[\eta*\eta^{-1}*\alpha*\eta*\eta^{-1}]=[\alpha]` },
            { claim: R`于是 $P_\eta^{-1}\circ P_\eta=\mathrm{id}_{\pi_1(X,x_0)}$；对称地 $P_\eta\circ P_\eta^{-1}=\mathrm{id}_{\pi_1(X,x_1)}$。由第 2 章习题 2.3（$g\circ f=\mathrm{id}$ ⇒ $f$ 单、$g$ 满），$P_\eta$ 是双射，从而是同构。` },
          ]} />
        </Stmt>
        <Figure n="4.6" caption={R`由 $x_0$ 处的圈 $\alpha$ 构造出 $x_1$ 处的圈 $\eta^{-1}*\alpha*\eta$。`} width="45%" />
        <Tx>{R`因此，若 $X$ 弧连通，就不必指明基点：对任意 $x_0,x_1\in X$ 都有 $\pi_1(X,x_0)\cong\pi_1(X,x_1)$，可以简写为 $\pi_1(X)$。`}</Tx>
        <Exercise n="4.1" title={R`$P_\eta$ 只依赖于 $\eta$ 的同伦类，并满足复合律`} level="★"
          hint={R`(1) 设 $\eta\sim\zeta$（端点固定的道路同伦），由 \sref{L4.1} 的论证（对道路同样成立）得 $\eta^{-1}*\alpha*\eta\sim\zeta^{-1}*\alpha*\zeta$。注意 $\eta\sim\zeta\Rightarrow\eta^{-1}\sim\zeta^{-1}$。(2) 直接展开 $(\eta*\zeta)^{-1}=\zeta^{-1}*\eta^{-1}$。`}
          solution={R`**(1)** 设 $H$ 是 $\eta$ 与 $\zeta$ 之间保持端点的同伦：$H(s,0)=\eta(s)$，$H(s,1)=\zeta(s)$，$H(0,t)=x_0$，$H(1,t)=x_1$。则 $\bar H(s,t)=H(1-s,t)$ 是 $\eta^{-1}$ 与 $\zeta^{-1}$ 之间的同伦。把 $\bar H$、"$\alpha$ 的常值同伦"$(s,t)\mapsto\alpha(s)$、$H$ 在 $s$ 方向上依次拼接（与 \sref{L4.1} 的证明相同，只是三段），得到 $\eta^{-1}*\alpha*\eta$ 与 $\zeta^{-1}*\alpha*\zeta$ 之间保持基点 $x_1$ 的同伦。因此对每个 $[\alpha]$ 有 $P_\eta([\alpha])=P_\zeta([\alpha])$，即 $P_\eta=P_\zeta$。

**(2)** $\eta*\zeta$ 是从 $\eta(0)$ 到 $\zeta(1)$ 的道路，且 $(\eta*\zeta)^{-1}=\zeta^{-1}*\eta^{-1}$（逐点验证：$(\eta*\zeta)^{-1}(s)=(\eta*\zeta)(1-s)$，$s\le\frac12$ 时为 $\zeta(1-2s)=\zeta^{-1}(2s)$，$s\ge\frac12$ 时为 $\eta(2-2s)=\eta^{-1}(2s-1)$）。于是，利用同伦类层面的结合律，
$$P_{\eta*\zeta}([\alpha])=[\zeta^{-1}*\eta^{-1}*\alpha*\eta*\zeta]=P_\zeta\big([\eta^{-1}*\alpha*\eta]\big)=P_\zeta\circ P_\eta([\alpha]).$$
所以 $P_{\eta*\zeta}=P_\zeta\circ P_\eta$。（顺序与"先走 $\eta$ 再走 $\zeta$"一致。）`}>
          {R`(1) 设 $\eta$ 与 $\zeta$ 是从 $x_0$ 到 $x_1$ 的道路，且 $\eta\sim\zeta$。证明 $P_\eta=P_\zeta$。

(2) 设道路 $\eta,\zeta$ 满足 $\eta(1)=\zeta(0)$。证明 $P_{\eta*\zeta}=P_\zeta\circ P_\eta$。`}
        </Exercise>
      </Sub>

      <Sub n="4.2.2" title="Homotopic invariance of fundamental groups" zh="基本群的同伦不变性">
        <p className="muted">本小节概念：<C id="homotopy_type" /></p>
        <Tx>{R`道路与圈的同伦很容易推广到任意映射。设 $f,g:X\to Y$ 连续。若存在连续映射 $F:X\times I\to Y$ 使 $F(x,0)=f(x)$、$F(x,1)=g(x)$，则称 $f$ **同伦**于 $g$，记作 $f\sim g$；$F$ 称为 $f$ 与 $g$ 之间的**同伦**。`}</Tx>
        <Stmt id="D4.6" />
        <Stmt id="P4.2">
          <Proof steps={[
            { claim: R`**自反性**：$X\simeq X$，$\mathrm{id}_X$ 是同伦等价。` },
            { claim: R`**对称性**：若 $X\simeq Y$，同伦等价为 $f:X\to Y$，则 $Y\simeq X$——同伦等价取 $f$ 的同伦逆。` },
            { claim: R`**传递性**：设 $X\simeq Y$、$Y\simeq Z$，$f:X\to Y$、$g:Y\to Z$ 是同伦等价，$f':Y\to X$、$g':Z\to Y$ 是它们的同伦逆。则`, tex: R`\begin{aligned}(g\circ f)(f'\circ g')&=g(f\circ f')g'\sim g\circ\mathrm{id}_Y\circ g'=g\circ g'\sim\mathrm{id}_Z\\ (f'\circ g')(g\circ f)&=f'(g'\circ g)f\sim f'\circ\mathrm{id}_Y\circ f=f'\circ f\sim\mathrm{id}_X\end{aligned}` },
            { claim: R`其中"$\sim$"可以两边复合：若 $F$ 是 $f\circ f'$ 与 $\mathrm{id}_Y$ 之间的同伦，则 $(z,t)\mapsto g\big(F(g'(z),t)\big)$ 是 $g(f\circ f')g'$ 与 $g\circ g'$ 之间的同伦。所以 $X\simeq Z$。`, fill: true },
          ]} />
        </Stmt>
        <Tx>{R`基本群最值得注意的性质之一：同伦型相同的两个空间有相同的基本群。`}</Tx>
        <Stmt id="T4.3">
          <Proof title="证明概要（原书不证，本站补）" steps={[
            { claim: R`连续映射 $f:X\to Y$ 诱导同态 $f_*:\pi_1(X,x_0)\to\pi_1(Y,f(x_0))$，$f_*([\alpha])=[f\circ\alpha]$。`, why: R`若 $F$ 是 $\alpha\sim\alpha'$ 的同伦，则 $f\circ F$ 是 $f\circ\alpha\sim f\circ\alpha'$ 的同伦；且 $f\circ(\alpha*\beta)=(f\circ\alpha)*(f\circ\beta)$。`, fill: true },
            { claim: R`设 $g$ 是 $f$ 的同伦逆，$G:X\times I\to X$ 是 $\mathrm{id}_X$ 与 $g\circ f$ 之间的同伦。基点沿道路 $\eta(t)=G(x_0,t)$ 从 $x_0$ 移到 $g(f(x_0))$。可以验证`, tex: R`(g\circ f)_*=P_\eta:\pi_1(X,x_0)\to\pi_1(X,g(f(x_0)))`, why: R`对圈 $\alpha$，正方形 $(s,t)\mapsto G(\alpha(s),t)$ 的四条边依次是 $\alpha$、$\eta$、$g\circ f\circ\alpha$、$\eta$，由此得 $g\circ f\circ\alpha\sim\eta^{-1}*\alpha*\eta$。`, fill: true },
            { claim: R`$P_\eta$ 是同构（\sref{T4.2}），所以 $g_*\circ f_*=(g\circ f)_*$ 是双射 ⇒ $f_*$ 单射、$g_*$ 满射。对称地由 $f\circ g\sim\mathrm{id}_Y$ 得 $f_*$（从 $\pi_1(X,g(f(x_0)))$ 出发的那个）满射。于是 $f_*$ 是同构。`, uses: ["T4.2"], fill: true },
          ]} />
        </Stmt>
        <Tx>{R`下面的推论直接由 \sref{T4.3} 得到。`}</Tx>
        <Stmt id="C4.1" />
        <Tx>{R`在这个意义上，我们必须承认基本群对拓扑空间的分类不如同胚那样严格。我们最多只能断言：若 $X$ 与 $Y$ 的基本群不同，则 $X$ 不可能同胚于 $Y$。但要注意，同伦群（包括基本群）在物理中有大量应用，我们会陆续看到。需要强调：**同伦群在物理中的主要用途不是给空间分类，而是给映射——即场位形——分类。**

对任意一对 $X$、$Y$，"同伦型相同"不太好直观把握。实践中常见的情形是 $Y$ 是 $X$ 的子空间。这时若 $Y$ 可以由 $X$ 连续地变形而来，就有 $X\simeq Y$。`}</Tx>
        <Stmt id="D4.7" />
        <Tx>{R`注意整个 $X$ 被映到 $R$ 上，而 $R$ 中的点保持不动。\figref{4.7} 是收缩核与收缩的一个例子。`}</Tx>
        <Figure n="4.7" caption={R`圆周 $R$ 是圆环 $X$ 的收缩核。箭头表示收缩的作用。`} width="40%" />
        <Stmt id="D4.8">
          <Eq n="4.5" say={R`形变从恒等映射出发（$t=0$ 时每点不动），到 $t=1$ 时把整个空间压到子空间 $R$ 上。`}>{R`H(x,0)=x\qquad H(x,1)\in R\qquad\text{for any }x\in X`}</Eq>
          <Eq n="4.6" say={R`形变的全过程中，$R$ 里的点始终一动不动。`}>{R`H(x,t)=x\qquad\text{for any }x\in R\text{ and any }t\in I.`}</Eq>
        </Stmt>
        <Tx>{R`$H$ 是 $\mathrm{id}_X$ 与收缩 $f:X\to R$ 之间的同伦，在形变过程中 $R$ 的点保持不动。

收缩核**不一定**是形变收缩核。在 \figref{4.8} 中，圆周 $R$ 是 $X$ 的收缩核（例如把右边那个洞的周围"压扁"到 $R$ 上），却不是形变收缩核：$X$ 中右边的洞阻碍了 $\mathrm{id}_X$ 连续地变形成收缩。

当 $R$ 是 $X$ 的形变收缩核时，$X$ 与 $R$ 同伦型相同（收缩 $f=H(\cdot,1)$ 与包含映射 $i:R\hookrightarrow X$ 互为同伦逆：$f\circ i=\mathrm{id}_R$，$i\circ f\sim\mathrm{id}_X$ 由 $H$ 给出），于是`}</Tx>
        <Eq n="4.7" keyEq title="形变收缩保持基本群" say={R`把空间形变收缩到子空间上，基本群不变：可以放心地用更简单的“骨架”代替原空间计算 $\pi_1$。`}>{R`\pi_1(X,a)\cong\pi_1(R,a)\qquad a\in R.`}</Eq>
        <Figure n="4.8" caption={R`圆周 $R$ 不是 $X$ 的形变收缩核。`} width="40%" />
        <Erratum kind="note" loc={R`p.150，式 (4.7) 前一句`} title={R`(4.7) 适用于形变收缩核，不适用于图 4.8`}>{R`原书在讨论完 \figref{4.8} 之后紧接着写"由于 $X$ 与 $R$ 同伦型相同，有 (4.7)"，读起来像是在说图 4.8。但图 4.8 中的 $R$ 恰恰**不是**形变收缩核，(4.7) 在那里不成立：$X$ 是挖去两个洞的圆盘，$\pi_1(X)$ 是两个生成元的自由群（与 2-花束同伦型相同，例 4.7），而 $\pi_1(R)\cong\mathbb{Z}$。本站把 (4.7) 明确放在"$R$ 是形变收缩核"的前提下。`}</Erratum>
        <Box kind="example" n="4.1" title="圆周是圆环的形变收缩核">
          <Tx>{R`设 $X$ 为单位圆周，$Y$ 为圆环：`}</Tx>
          <Eq n="4.8" say="单位圆周：模长为 1 的复数。">{R`X=\{e^{i\theta}\mid 0\le\theta<2\pi\}`}</Eq>
          <Eq n="4.9" say={R`圆环：半径在 $\frac12$ 与 $\frac32$ 之间的复数，它包含单位圆周。`}>{R`Y=\{re^{i\theta}\mid 0\le\theta<2\pi,\ \tfrac12\le r\le\tfrac32\}`}</Eq>
          <Tx>{R`见 \figref{4.7}。定义 $f:X\hookrightarrow Y$，$f(e^{i\theta})=e^{i\theta}$（包含映射），以及 $g:Y\to X$，$g(re^{i\theta})=e^{i\theta}$（径向投影）。则 $f\circ g:re^{i\theta}\mapsto e^{i\theta}$，$g\circ f:e^{i\theta}\mapsto e^{i\theta}$。可见 $f\circ g\sim\mathrm{id}_Y$，$g\circ f=\mathrm{id}_X$。同伦

$$H(re^{i\theta},t)=\{1+(r-1)(1-t)\}e^{i\theta}$$

在 $\mathrm{id}_Y$（$t=0$：$H=re^{i\theta}$）与 $f\circ g$（$t=1$：$H=e^{i\theta}$）之间插值，并保持 $X$ 上的点（$r=1$）不动。所以 $X$ 是 $Y$ 的形变收缩核。就基本群而言，$\pi_1(X,a)\cong\pi_1(Y,a)$，$a\in X$。`}</Tx>
        </Box>
        <Erratum kind="erratum" loc="p.150，式 (4.9) 与例 4.1 末段" title={R`勘误：圆环的半径范围应为 $\frac12\le r\le\frac32$；同伦连接的是 $\mathrm{id}_Y$ 而非 $\mathrm{id}_X$`}>{R`**(4.9)：**原书印作 $\frac12\le r\le\frac23$。这样的圆环不包含单位圆周 $X$（$r=1$），于是 $f:X\to Y$、"$X$ 是 $Y$ 的形变收缩核"都无从谈起；而且对 $r<1$ 的点，$H(re^{i\theta},t)$ 在 $t=1$ 时落到 $r=1$——在 $Y$ 之外。取 $\frac12\le r\le\frac32$ 则一切成立：对 $t\in I$，$1+(r-1)(1-t)$ 介于 $r$ 与 $1$ 之间，始终在 $Y$ 中。（$\frac23$ 应是 $\frac32$ 的误排。）

**插值的两端：**$H(re^{i\theta},0)=re^{i\theta}$ 是 $Y$ 上的恒等映射 $\mathrm{id}_Y$，不是 $\mathrm{id}_X$（$H$ 的定义域是 $Y$）。原书写作"interpolates between $\mathrm{id}_X$ and $f\circ g$"，应为 $\mathrm{id}_Y$。`}</Erratum>
        <Stmt id="D4.9" />
        <Tx>{R`设 $c_a:X\to\{a\}$ 为常值映射。若 $X$ 可缩，则存在同伦 $H:X\times I\to X$，使对任意 $x\in X$ 有 $H(x,0)=c_a(x)=a$、$H(x,1)=\mathrm{id}_X(x)=x$，而且对任意 $t\in I$ 有 $H(a,t)=a$。这个同伦 $H$ 称为**收缩**（contraction）。（这里时间方向与 \eqref{4.5} 相反，只是把 $t$ 换成 $1-t$。）`}</Tx>
        <Box kind="example" n="4.2" title={R`$\mathbb{R}^n$ 可缩`}>{R`$X=\mathbb{R}^n$ 可以收缩到原点 $0$。事实上，定义 $H:\mathbb{R}^n\times I\to\mathbb{R}^n$，$H(x,t)=tx$，则 (i) 对任意 $x\in X$，$H(x,0)=0$ 且 $H(x,1)=x$；(ii) 对任意 $t\in I$，$H(0,t)=0$。由此可见任何**凸**子集 $C\subset\mathbb{R}^n$ 都可缩：取 $a\in C$，$H(x,t)=a+t(x-a)$ 始终留在 $C$ 中。

（原书 (ii) 印作"$H(0,1)=0$ for any $t\in I$"，应为 $H(0,t)=0$；陪域也应为 $\mathbb{R}^n$ 而非 $\mathbb{R}$。）`}</Box>
        <Exercise n="4.2" title={R`$S^n$ 是 $D^{n+1}-\{0\}$ 的形变收缩核`} level="★"
          hint={R`径向投影 $x\mapsto x/|x|$ 是收缩；直线插值 $H(x,t)=(1-t)x+tx/|x|$ 给出形变。检查它不经过原点。`}
          solution={R`取 $H:(D^2-\{0\})\times I\to D^2-\{0\}$，
$$H(x,t)=(1-t)\,x+t\,\frac{x}{|x|}=\Big(1-t+\frac{t}{|x|}\Big)x.$$
因子 $1-t+t/|x|>0$，所以 $H(x,t)\neq0$；又 $|H(x,t)|=(1-t)|x|+t\le1$，故 $H$ 确实取值于 $D^2-\{0\}$。$H$ 连续（$|x|>0$）。检查 \eqref{4.5}、\eqref{4.6}：$H(x,0)=x$；$H(x,1)=x/|x|\in S^1$；若 $x\in S^1$ 则 $|x|=1$，$H(x,t)=x$ 对所有 $t$ 成立。所以 $S^1$ 是 $D^2-\{0\}$ 的形变收缩核，收缩为 $f(x)=x/|x|$。

完全相同的公式（$x\in\mathbb{R}^{n+1}$，$0<|x|\le1$）说明 $S^n$ 是 $D^{n+1}-\{0\}$ 的形变收缩核。推论：$\pi_1(D^2-\{0\})\cong\pi_1(S^1)\cong\mathbb{Z}$——这正是 \figref{4.1}(a) 的严格版本。`}>
          {R`设 $D^2=\{(x,y)\in\mathbb{R}^2\mid x^2+y^2\le1\}$。证明单位圆周 $S^1$ 是 $D^2-\{0\}$ 的形变收缩核。再证明单位球面 $S^n$ 是 $D^{n+1}-\{0\}$ 的形变收缩核，其中 $D^{n+1}=\{x\in\mathbb{R}^{n+1}\mid|x|\le1\}$。`}
        </Exercise>
        <Stmt id="T4.4">
          <Proof steps={[
            { claim: R`可缩空间与一点 $\{p\}$ 同伦型相同（\sref{D4.8} 之后的论证：形变收缩核与原空间同伦型相同）。` },
            { claim: R`由 \sref{T4.3}，$\pi_1(X,x_0)\cong\pi_1(\{p\},p)$。`, uses: ["T4.3"] },
            { claim: R`一点的基本群平凡：$\{p\}$ 上唯一的圈就是 $c_p$。`, fill: true },
          ]} />
        </Stmt>
        <Tx>{R`若弧连通空间 $X$ 的基本群平凡，则称 $X$ **单连通**（simply connected，见第 2 章 \sref{D2.8}）。`}</Tx>
      </Sub>
    </Sec>);
}

export function Sec43() {
  return (
    <Sec n="4.3" title="Examples of fundamental groups" zh="基本群的例子"
      gist={R`用万有覆叠 $\mathbb{R}\to S^1$ 把圈 $f:S^1\to S^1$ 提升为 $\tilde f:\mathbb{R}\to\mathbb{R}$，$\tilde f(x+2\pi)=\tilde f(x)+2\pi n$；整数 $n=\deg f$ 完全决定同伦类，于是 $\pi_1(S^1)\cong\mathbb{Z}$（\eqref{4.10}）。积空间：$\pi_1(X\times Y)\cong\pi_1(X)\oplus\pi_1(Y)$，得 $\pi_1(T^n)\cong\mathbb{Z}^n$。`}
      why={R`一般没有计算基本群的常规程序；但圆周是一切"卷绕"现象的原型——涡旋的卷绕数、映射度、规范变换的拓扑类都从这里来。`}
      gives={["4.10", "4.11", "4.12", "4.13"]}>
      <p className="muted">本节概念：<C id="degree" /> · <C id="covering" /></p>
      <Tx>{R`一般说来，计算基本群没有常规程序。但在某些情形下，可以用比较简单的考虑得到它们。这里我们讨论圆周 $S^1$ 及相关空间的基本群。

把 $S^1$ 写成 $\{z\in\mathbb{C}\mid|z|=1\}$。定义 $p:\mathbb{R}\to S^1$，$p:x\mapsto\exp(ix)$。$p$ 把 $0\in\mathbb{R}$ 映到 $1\in S^1$，取后者为基点。可以想象 $\mathbb{R}$ 在 $p$ 下一圈圈地缠绕在 $S^1$ 上（\figref{4.9}）。若 $x,y\in\mathbb{R}$ 满足 $x-y=2\pi m$（$m\in\mathbb{Z}$），它们映到 $S^1$ 的同一点，记作 $x\sim y$。这是等价关系，等价类 $[x]=\{y\mid x-y=2\pi m,\ m\in\mathbb{Z}\}$ 与 $S^1$ 上的点 $\exp(ix)$ 一一对应，于是 $S^1\cong\mathbb{R}/2\pi\mathbb{Z}$。

设 $\tilde f:\mathbb{R}\to\mathbb{R}$ 连续，$\tilde f(0)=0$，且 $\tilde f(x+2\pi)\sim\tilde f(x)$。那么 $[\tilde f(x+2\pi)-\tilde f(x)]/2\pi$ 是 $x$ 的连续整数值函数，因而是常数：对任意 $x\in\mathbb{R}$，$\tilde f(x+2\pi)=\tilde f(x)+2n\pi$，$n$ 是固定整数。若 $x\sim y$（$x-y=2\pi m$），则`}</Tx>
      <Derivation title={R`$\tilde f$ 把等价的点映成等价的点`} steps={[
        { tex: R`\tilde f(x)-\tilde f(y)=\tilde f(y+2\pi m)-\tilde f(y)`, why: R`$x=y+2\pi m$。` },
        { tex: R`=\tilde f(y)+2\pi mn-\tilde f(y)=2\pi mn`, why: R`反复使用 $\tilde f(x+2\pi)=\tilde f(x)+2n\pi$（$m<0$ 时向反方向用）。` },
      ]} result={R`$\tilde f(x)\sim\tilde f(y)$`} />
      <Figure n="4.9" caption={R`由 $x\mapsto\exp(ix)$ 定义的映射 $p:\mathbb{R}\to S^1$ 把 $x+2m\pi$ 投影到 $S^1$ 上的同一点；而满足 $\tilde f(0)=0$、$\tilde f(x+2\pi)=\tilde f(x)+2n\pi$（$n$ 固定）的 $\tilde f:\mathbb{R}\to\mathbb{R}$ 定义了映射 $f:S^1\to S^1$。整数 $n$ 指定了 $f$ 所属的同伦类。`} width="70%" interactive={<WindingLab />} />
      <Tx>{R`因此 $\tilde f:\mathbb{R}\to\mathbb{R}$ 唯一地定义了连续映射 $f:\mathbb{R}/2\pi\mathbb{Z}\to\mathbb{R}/2\pi\mathbb{Z}$，$f([x])=p\circ\tilde f(x)$（\figref{4.9}）。注意 $f$ 保持基点 $1\in S^1$ 不动。反过来，给定保持 $1\in S^1$ 不动的映射 $f:S^1\to S^1$，可以定义 $\tilde f:\mathbb{R}\to\mathbb{R}$，使 $\tilde f(0)=0$ 且 $\tilde f(x+2\pi)=\tilde f(x)+2\pi n$（**提升**：从 $\tilde f(0)=0$ 出发，沿着 $x$ 连续地追踪角度，这个连续选择是唯一的）。

总之，满足 $f(1)=1$ 的映射 $f:S^1\to S^1$ 的集合，与满足 $\tilde f(0)=0$、$\tilde f(x+2\pi)=\tilde f(x)+2\pi n$ 的映射 $\tilde f:\mathbb{R}\to\mathbb{R}$ 的集合一一对应。整数 $n$ 称为 $f$ 的**映射度**（degree），记作 $\deg(f)$：$x$ 绕 $S^1$ 一圈时，$f(x)$ 绕 $S^1$ 转 $n$ 圈。`}</Tx>
      <Stmt id="L4.2">
        <Proof steps={[
          { claim: R`**(1) ⇐。**设 $\deg f=\deg g=n$，$\tilde f,\tilde g$ 是对应的提升。令`, tex: R`\tilde F(x,t)\equiv t\tilde f(x)+(1-t)\tilde g(x)`, why: R`它是 $\tilde g$（$t=0$）与 $\tilde f$（$t=1$）之间的同伦。` },
          { claim: R`$\tilde F$ 满足同样的周期条件与基点条件，所以 $F\equiv p\circ\tilde F$ 是 $S^1$ 上 $f$ 与 $g$ 之间保持基点的同伦。`, tex: R`\tilde F(x+2\pi,t)=t(\tilde f(x)+2\pi n)+(1-t)(\tilde g(x)+2\pi n)=\tilde F(x,t)+2\pi n,\qquad\tilde F(0,t)=0`, fill: true, why: R`这是直线插值能成立的关键：**两者度数相同**，插值后的增量仍是 $2\pi n$。` },
          { claim: R`**(1) ⇒。**设 $f\sim g:S^1\to S^1$，则有同伦 $F:S^1\times I\to S^1$，$F(1,t)=1$ 对任意 $t\in I$。对应的提升 $\tilde F:\mathbb{R}\times I\to\mathbb{R}$ 是 $\tilde f$ 与 $\tilde g$ 之间的同伦，满足 $\tilde F(x+2\pi,t)=\tilde F(x,t)+2n\pi$，其中 $n\in\mathbb{Z}$。` },
          { claim: R`$n$ 不依赖于 $t$：$n(t)=[\tilde F(2\pi,t)-\tilde F(0,t)]/2\pi$ 是 $t$ 的连续函数，又只取整数值，故为常数。因此 $\deg(f)=n(0)=n(1)=\deg(g)$。`, fill: true, why: R`这里用到同伦的提升存在且连续（同伦提升性质：对 $(x,t)$ 逐点沿路径提升，由 $p$ 的局部同胚性得连续）。` },
          { claim: R`**(2)** $\tilde f:x\mapsto nx$ 诱导映射 $f:S^1\to S^1$，$f(e^{ix})=e^{inx}$，$\deg(f)=n$。` },
        ]} />
      </Stmt>
      <Tx>{R`\sref{L4.2} 告诉我们：给满足 $f(1)=1$ 的映射 $f:S^1\to S^1$ 指定整数 $\deg(f)$，就得到 $\pi_1(S^1,1)$ 与 $\mathbb{Z}$ 之间的双射。而且这是同构：对 $f,g:S^1\to S^1$，作为圈的乘积 $f*g$ 满足 $\deg(f*g)=\deg(f)+\deg(g)$。`}</Tx>
      <Derivation title={R`$\deg(f*g)=\deg f+\deg g$`} steps={[
        { tex: R`\tilde f(x+2\pi)=\tilde f(x)+2\pi n,\qquad\tilde g(x+2\pi)=\tilde g(x)+2\pi m`, why: "两个圈的提升。" },
        { tex: R`\widetilde{f*g}:\ \text{先沿 }\tilde f\text{ 从 }0\text{ 走到 }2\pi n,\ \text{再沿 }\tilde g+2\pi n\text{ 从 }2\pi n\text{ 走到 }2\pi(n+m)`, why: R`$\tilde g+2\pi n$ 仍是 $g$ 的提升（起点平移了 $2\pi n$），两段在 $2\pi n$ 处接上。` },
        { tex: R`\widetilde{f*g}(x+2\pi)=\widetilde{f*g}(x)+2\pi(m+n)`, why: R`注意 $*$ 不是映射的复合，而是道路的乘积。` },
      ]} result={R`$\deg(f*g)=n+m$`} />
      <Tx>{R`于是我们最终证明了：`}</Tx>
      <Stmt id="T4.5">
        <Eq n="4.10" keyEq title={R`$\pi_1(S^1)\cong\mathbb{Z}$`} say="圆周上的圈按“绕了几圈”分类，绕法相乘就是圈数相加：圆周的基本群是整数加法群。">{R`\pi_1(S^1)\cong\mathbb{Z}.`}</Eq>
      </Stmt>
      <Tx>{R`$S^1$ 弧连通，所以可以省去基点。

这个定理的证明不算显然，但陈述本身连小孩都懂。用橡皮筋套住一根圆柱：如果它绕了 $n$ 圈，就无法连续地变成绕 $m$（$\neq n$）圈的样子；如果先绕 $n$ 圈再绕 $m$ 圈，总共就绕了 $n+m$ 圈。`}</Tx>
      <Box kind="physics" title="卷绕数的积分公式">{R`对光滑的圈 $f(s)=e^{i\vartheta(s)}$，提升就是"连续追踪的角度" $\vartheta(s)$，于是

$$\deg f=\frac{1}{2\pi}\big[\vartheta(1)-\vartheta(0)\big]=\frac{1}{2\pi i}\oint\frac{\dd z}{z}.$$

这正是复分析里的辐角原理，也是超导体中**磁通量子化**的拓扑根源：序参量相位 $\varphi$ 绕涡旋一圈的增量必须是 $2\pi$ 的整数倍（§4.8.3）。交互图 1 用同样的方法——逐段累加相邻两点之间的最小转角——实时计算你画出的圈的卷绕数。`}</Box>

      <Sub n="4.3.1" title="Fundamental group of torus" zh="环面的基本群">
        <Stmt id="T4.6">
          <Proof steps={[
            { claim: R`定义投影 $p_1:X\times Y\to X$、$p_2:X\times Y\to Y$。若 $\alpha$ 是 $X\times Y$ 中 $(x_0,y_0)$ 处的圈，则 $\alpha_1\equiv p_1(\alpha)$ 是 $X$ 中 $x_0$ 处的圈，$\alpha_2\equiv p_2(\alpha)$ 是 $Y$ 中 $y_0$ 处的圈。反之，任一对圈 $\alpha_1$（$X$ 中，$x_0$ 处）与 $\alpha_2$（$Y$ 中，$y_0$ 处）唯一确定 $X\times Y$ 中 $(x_0,y_0)$ 处的圈 $\alpha=(\alpha_1,\alpha_2)$。` },
            { claim: R`定义同态 $\varphi:\pi_1(X\times Y,(x_0,y_0))\to\pi_1(X,x_0)\oplus\pi_1(Y,y_0)$：`, tex: R`\varphi([\alpha])=([\alpha_1],[\alpha_2])`, why: R`良定义：$\alpha\sim\alpha'$ 的同伦 $F$ 投影为 $p_1\circ F$、$p_2\circ F$。同态：道路乘积逐分量进行，$p_i(\alpha*\beta)=p_i(\alpha)*p_i(\beta)$。`, fill: true },
            { claim: R`$\varphi$ 有逆：$([\alpha_1],[\alpha_2])\mapsto[(\alpha_1,\alpha_2)]$（两个分量的同伦合起来就是积空间中的同伦）。所以 $\varphi$ 是所求的同构。`, tex: R`\pi_1(X\times Y,(x_0,y_0))\cong\pi_1(X,x_0)\oplus\pi_1(Y,y_0)` },
          ]} />
        </Stmt>
        <Box kind="note" title={R`记号：$\oplus$ 与 $\times$`}>{R`$\pi_1$ 一般非交换。对非交换群，\sref{T4.6} 中的"$\oplus$"应读作**直积** $\pi_1(X)\times\pi_1(Y)$（两个因子的元素彼此交换，各因子内部未必交换）。本章涉及的因子（$\mathbb{Z}$、$\{e\}$）都是交换的，两种记号没有区别。`}</Box>
        <Box kind="example" n="4.3" title="环面与圆柱面">
          <Tx>{R`(1) 设 $T^2=S^1\times S^1$ 是环面，则`}</Tx>
          <Eq n="4.11" title={R`$\pi_1(T^2)\cong\mathbb{Z}\oplus\mathbb{Z}$`} say="环面上的圈由两个独立的整数刻画：绕“经线”方向几圈、绕“纬线”方向几圈。">{R`\pi_1(T^2)\cong\pi_1(S^1)\oplus\pi_1(S^1)\cong\mathbb{Z}\oplus\mathbb{Z}.`}</Eq>
          <Tx>{R`类似地，对 $n$ 维环面

$$T^n=\underbrace{S^1\times S^1\times\cdots\times S^1}_{n}$$

有`}</Tx>
          <Eq n="4.12" say={R`$n$ 维环面的基本群是 $n$ 份整数：每个圆周因子贡献一个独立的卷绕数。`}>{R`\pi_1(T^n)\cong\underbrace{\mathbb{Z}\oplus\mathbb{Z}\oplus\cdots\oplus\mathbb{Z}}_{n}.`}</Eq>
          <Tx>{R`(2) 设 $X=S^1\times\mathbb{R}$ 是圆柱面。由于 $\pi_1(\mathbb{R})\cong\{e\}$（\sref{T4.4}），`}</Tx>
          <Eq n="4.13" say="圆柱面的直线方向可以收缩掉，只剩绕圆周的卷绕数。">{R`\pi_1(X)\cong\mathbb{Z}\oplus\{e\}\cong\mathbb{Z}.`}</Eq>
        </Box>
      </Sub>
    </Sec>);
}
