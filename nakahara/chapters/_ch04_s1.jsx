import {HomotopyRedraw} from "./_redraw_homotopy.jsx";
// 引言 + §4.1 基本群 —— 式 (4.1)–(4.4)，定义 4.1–4.5，命题 4.1，引理 4.1，定理 4.1，图 4.1–4.5
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Proof, Derivation, C } from "@kit";

const R = String.raw;

export function Intro() {
  return (
    <Sec n="4.0" title="Introduction" zh="引言：从“数洞”到“分类映射”"
      gist={R`同调群给"不是边界的闭链"赋予群结构；同伦群换一个角度：考察**映射之间的连续形变**。取一个标准空间（如 $S^n$），把所有映射 $S^n\to Y$ 按"能否连续地变成彼此"分类，同伦类的集合就是同伦群。`}
      why={R`物理里真正需要分类的往往不是空间，而是**场位形**——从空间（或包围缺陷的一个球面）到序参量空间的映射。同伦正是"能否连续变形"的数学。`}
      gives={[]}>
      <p className="muted">本节概念：<C id="homotopy" /> · <C id="fundamental_group" /></p>
      <Tx>{R`上一章的同调群把"是闭链但不是边界"的东西做成了群。本章换一个视角：设 $X$、$Y$ 是拓扑空间，考虑从 $X$ 到 $Y$ 的全体连续映射。我们在这个集合上引进一个等价关系——**同伦**（homotopic to）：若映射 $f$ 的像 $f(X)$ 可以在 $Y$ 中连续地变形为 $g(X)$，就把 $f$ 与 $g$ 等同起来。

$X$ 取结构已经熟知的**标准空间**。例如取 $n$ 维球面 $S^n$，研究所有映射 $S^n\to Y$ 在同伦等价下怎样分类——这就是**同伦群**（homotopy groups）的基本思想：

◆ $n=1$：$S^1\to Y$ 是 $Y$ 中的圈，分类结果是**基本群** $\pi_1(Y)$（§4.1–4.4）；

◆ $n\ge2$：$S^n\to Y$ 是"$n$ 维的圈"，分类结果是**高阶同伦群** $\pi_n(Y)$（§4.5–4.7）；

◆ 物理应用（§4.8–4.10）：把包围缺陷的球面 $S^n$ 上的序参量看成映射 $S^n\to M$，同伦类就是缺陷的**拓扑荷**——超导涡旋的卷绕数、向列相液晶中"绕半圈"的向错、超流 $^3$He-A 中没有奇点的 Shankar 单极子。

本章只做同伦群的初等讨论，足够后面各章使用。Nash and Sen (1983) 与 Croom (1978) 可作补充读物。`}</Tx>
      <Box kind="key" title="同调 vs 同伦：两种“数洞”的方式">{R`**同调**（第 3 章）：区域的整系数组合（链），问"有没有边界、是不是边界"。结果总是 Abel 群，可以用整数线性代数机械地算出。

**同伦**（本章）：映射本身，问"能不能连续地变成彼此"。基本群一般**不交换**，信息更多；高阶同伦群虽然交换，却**没有**通用算法（§4.7）。二者在一维的联系是 \sref{T4.9}：$H_1$ 恰是 $\pi_1$ 的交换化。`}</Box>
    </Sec>);
}

export function Sec41() {
  return (
    <Sec n="4.1" title="Fundamental groups" zh="基本群"
      gist={R`道路与圈（\sref{D4.1}）；乘积 $\alpha*\beta$ = 先走 $\alpha$ 再走 $\beta$（\eqref{4.1}）；**同伦** = 保持基点的连续形变（\eqref{4.3}）；同伦类在乘积 $[\alpha]*[\beta]=[\alpha*\beta]$ 下构成群——**基本群** $\pi_1(X,x_0)$。`}
      why={R`圈的拼接本身不是群运算（常值圈不是真正的单位元，$\alpha*\alpha^{-1}\neq c_x$）；只有把"可以连续变形成彼此"的圈等同起来，才得到一个干净的群。`}
      gives={["4.1", "4.2", "4.3", "4.4"]}>
      <Sub n="4.1.1" title="Basic ideas" zh="基本想法">
        <p className="muted">本小节概念：<C id="homotopy" /></p>
        <Tx>{R`看 \figref{4.1} 的两个圆盘：一个中间挖了洞，一个没有。怎样刻画它们的区别？

在 (b) 中，**任何**圈都能连续地收缩成一点。在 (a) 中则不然：绕洞的圈 $\alpha$ 因为洞的存在无法缩成一点；而不绕洞的圈（如 $\beta$）仍然可以。若圈 $\alpha$ 能通过连续形变从 $\beta$ 得到，就说 $\alpha$ 与 $\beta$ **同伦**（homotopic）。例如 $Y$ 中任何圈都同伦于一点。`}</Tx>
        <Figure n="4.1" illustration={<HomotopyRedraw n="4.1"/>} caption={R`有洞的圆盘 (a) 与无洞的圆盘 (b)。(a) 中的洞阻止圈 $\alpha$ 收缩为一点。`} width="78%" />
        <Tx>{R`"同伦"是等价关系（\sref{P4.1}），等价类称为**同伦类**（homotopy class）。\figref{4.1} 中 $Y$ 只有一个同伦类；而 $X$ 的每个同伦类由一个整数 $n\in\mathbb{Z}$ 刻画——圈绕洞的**圈数**：逆时针为 $n>0$，顺时针为 $n<0$，不绕洞为 $n=0$。

更进一步，$\mathbb{Z}$ 是加法群，而加法有几何意义：$n+m$ 对应"先绕洞 $n$ 圈，再绕 $m$ 圈"。于是同伦类的集合带有群结构，称为**基本群**（fundamental group）。本节的任务就是把这幅图像变成精确的定义；§4.3 再证明 $X$ 的基本群确实是 $\mathbb{Z}$（交互图 1 可以亲手验证）。`}</Tx>
      </Sub>

      <Sub n="4.1.2" title="Paths and loops" zh="道路与圈">
        <Stmt id="D4.1" />
        <Tx>{R`对 $x\in X$，**常值道路**（constant path）$c_x:I\to X$ 定义为 $c_x(s)=x$，$s\in I$。它也是常值圈，因为 $c_x(0)=c_x(1)=x$。道路（圈）的集合上可以引入如下代数结构。`}</Tx>
        <Stmt id="D4.2">
          <Eq n="4.1" keyEq title="道路的乘积" say={R`先用一半时间以两倍速度走完 $\alpha$，再用另一半时间走完 $\beta$；两段在 $\alpha(1)=\beta(0)$ 处接上。`}>{R`\alpha*\beta(s)=\begin{cases}\alpha(2s) & 0\le s\le\frac12\\ \beta(2s-1) & \frac12\le s\le1\end{cases}`}</Eq>
        </Stmt>
        <Figure n="4.2" illustration={<HomotopyRedraw n="4.2"/>} caption={R`有公共端点的道路 $\alpha$ 与 $\beta$ 的乘积 $\alpha*\beta$。`} width="60%" />
        <Tx>{R`见 \figref{4.2}。由于 $\alpha(1)=\beta(0)$，$\alpha*\beta$ 是 $I$ 到 $X$ 的连续映射。几何上，$\alpha*\beta$ 在前一半时间里走完 $\alpha(I)$，后一半时间里走完 $\beta(I)$——注意速度加倍了。`}</Tx>
        <Stmt id="D4.3">
          <Eq n="4.2" say="逆道路就是倒着走同一条路：从终点出发回到起点。">{R`\alpha^{-1}(s)\equiv\alpha(1-s)\qquad s\in I.`}</Eq>
        </Stmt>
        <Tx>{R`逆道路 $\alpha^{-1}$ 沿相反方向走过 $\alpha$ 的像，从 $x_1$ 回到 $x_0$。圈是起点与终点重合的特殊道路，所以圈的乘积与逆以完全相同的方式定义。

看上去常值映射 $c_x$ 像是单位元，然而它**不是**：$\alpha*\alpha^{-1}$ 并不等于 $c_x$！前者真的走出去再走回来，后者原地不动。要在圈的空间上定义一个群运算，必须引入同伦的概念。`}</Tx>
        <Box kind="warning" title="道路层面的乘法连结合律都不满足">{R`$(\alpha*\beta)*\gamma$ 用 $\frac14,\frac14,\frac12$ 的时间走三段，$\alpha*(\beta*\gamma)$ 用 $\frac12,\frac14,\frac14$。作为映射 $I\to X$ 它们不相等。所以"道路 + 拼接"连半群都不是；同伦把这些"只差参数化"的区别抹掉之后，才有结合律（\sref{T4.1}）。`}</Box>
      </Sub>

      <Sub n="4.1.3" title="Homotopy" zh="同伦">
        <Tx>{R`我们要按一个干净的等价关系给道路与圈分类，使等价类构成群。办法是：把能**连续地变形成彼此**的道路（圈）等同起来。我们主要关心圈，所以定义与定理多数对圈陈述；但要记住，许多陈述经适当修改后同样适用于道路。`}</Tx>
        <Stmt id="D4.4">
          <Eq n="4.3" keyEq title="圈的同伦" say={R`同伦是一族随时间 $t$ 连续变化的圈：$t=0$ 时是 $\alpha$，$t=1$ 时是 $\beta$，而且每一时刻起点和终点都钉在基点 $x_0$ 上。`}>{R`\begin{aligned}&F(s,0)=\alpha(s),\qquad F(s,1)=\beta(s)\qquad\forall s\in I\\ &F(0,t)=F(1,t)=x_0\qquad\forall t\in I.\end{aligned}`}</Eq>
        </Stmt>
        <Tx>{R`把同伦画成 \figref{4.3}(a) 很有帮助：正方形 $I\times I$ 的两条竖边被映到 $x_0$，下边是 $\alpha(s)$，上边是 $\beta(s)$。在空间 $X$ 中，像按 \figref{4.3}(b) 那样连续变形。`}</Tx>
        <Figure n="4.3" illustration={<HomotopyRedraw n="4.3"/>} caption={R`(a) 正方形表示在圈 $\alpha$ 与 $\beta$ 之间插值的同伦 $F$。(b) 在实空间 $X$ 中，$\alpha$ 的像连续地变形为 $\beta$ 的像。`} width="85%" />
        <Stmt id="P4.1">
          <Proof steps={[
            { claim: R`**自反性** $\alpha\sim\alpha$：取不随时间变化的同伦。`, tex: R`F(s,t)=\alpha(s)\quad\text{对任意 }t\in I`, why: R`显然满足 \eqref{4.3}：$F(0,t)=\alpha(0)=x_0$。` },
            { claim: R`**对称性**：设 $F$ 是 $\alpha$ 到 $\beta$ 的同伦（$F(s,0)=\alpha(s)$，$F(s,1)=\beta(s)$），则时间倒流给出 $\beta$ 到 $\alpha$ 的同伦。`, tex: R`\bar F(s,t)=F(s,1-t)`, why: R`$\bar F(s,0)=\beta(s)$，$\bar F(s,1)=\alpha(s)$，端点仍在 $x_0$。` },
            { claim: R`**传递性**：设 $F$ 是 $\alpha$ 与 $\beta$ 之间、$G$ 是 $\beta$ 与 $\gamma$ 之间的同伦。把两段同伦首尾相接、各用一半时间（\figref{4.4}）：`, tex: R`H(s,t)=\begin{cases}F(s,2t) & 0\le t\le\frac12\\ G(s,2t-1) & \frac12\le t\le1.\end{cases}` },
            { claim: R`$H$ 连续：两段在 $t=\frac12$ 处吻合，由粘接引理（闭集上分段连续且在交集上一致）即得。`, tex: R`F(s,1)=\beta(s)=G(s,0)`, fill: true },
            { claim: R`边界条件：$H(s,0)=\alpha(s)$，$H(s,1)=\gamma(s)$，$H(0,t)=H(1,t)=x_0$。故 $\alpha\sim\gamma$。`, fill: true },
          ]} />
        </Stmt>
        <Figure n="4.4" illustration={<HomotopyRedraw n="4.4"/>} caption={R`经由 $\beta$ 连接 $\alpha$ 与 $\gamma$ 的同伦 $H$。`} width="38%" />
      </Sub>

      <Sub n="4.1.4" title="Fundamental groups" zh="基本群">
        <p className="muted">本小节概念：<C id="fundamental_group" /></p>
        <Tx>{R`圈的等价类记作 $[\alpha]$，称为 $\alpha$ 的**同伦类**（homotopy class）。圈的乘积自然地诱导出同伦类之间的乘积。`}</Tx>
        <Stmt id="D4.5">
          <Eq n="4.4" title="同伦类的乘积" say="两个绕法相乘，就是任取代表圈接起来再取同伦类：基本群的乘法是“先绕这一种，再绕那一种”。">{R`[\alpha]*[\beta]=[\alpha*\beta].`}</Eq>
        </Stmt>
        <Tx>{R`和第 3 章的商群加法 \eqref{3.3} 一样，首先要检查这个定义与代表元无关。`}</Tx>
        <Stmt id="L4.1">
          <Proof steps={[
            { claim: R`设 $F(s,t)$ 是 $\alpha$ 与 $\alpha'$ 之间的同伦，$G(s,t)$ 是 $\beta$ 与 $\beta'$ 之间的同伦。在 $s$ 方向上把它们并排：`, tex: R`H(s,t)=\begin{cases}F(2s,t) & 0\le s\le\frac12\\ G(2s-1,t) & \frac12\le s\le1\end{cases}` },
            { claim: R`$H$ 连续：在 $s=\frac12$ 处两段吻合。`, tex: R`F(1,t)=x_0=G(0,t)\qquad\forall t`, why: R`同伦保持基点（\eqref{4.3} 第二行）在这里起决定作用。`, fill: true },
            { claim: R`$H$ 满足 \eqref{4.3}：`, tex: R`H(s,0)=\alpha*\beta(s),\quad H(s,1)=\alpha'*\beta'(s),\quad H(0,t)=F(0,t)=x_0,\quad H(1,t)=G(1,t)=x_0`, uses: ["4.1"], fill: true },
            { claim: R`所以 $\alpha*\beta\sim\alpha'*\beta'$，$[\alpha]*[\beta]$ 良定义。` },
          ]} />
        </Stmt>
        <Stmt id="T4.1">
          <Proof steps={[
            { claim: R`**(1) 结合律。**$(\alpha*\beta)*\gamma$ 与 $\alpha*(\beta*\gamma)$ 之间的同伦可取为（\figref{4.5}(a)）`, tex: R`F(s,t)=\begin{cases}\alpha\Big(\dfrac{4s}{1+t}\Big) & 0\le s\le\dfrac{1+t}{4}\\ \beta(4s-t-1) & \dfrac{1+t}{4}\le s\le\dfrac{2+t}{4}\\ \gamma\Big(\dfrac{4s-t-2}{2-t}\Big) & \dfrac{2+t}{4}\le s\le1.\end{cases}` },
            { claim: R`验证：$t=0$ 时三段为 $\alpha(4s),\beta(4s-1),\gamma(2s-1)$，正是 $(\alpha*\beta)*\gamma$；$t=1$ 时为 $\alpha(2s),\beta(4s-2),\gamma(4s-3)$，正是 $\alpha*(\beta*\gamma)$。分段处 $\alpha(1)=\beta(0)$、$\beta(1)=\gamma(0)$，故连续；$F(0,t)=\alpha(0)=x$，$F(1,t)=\gamma(1)=x$。`, uses: ["4.1"], fill: true },
            { claim: R`于是可以简写 $[\alpha*\beta*\gamma]$ 表示 $[(\alpha*\beta)*\gamma]$ 或 $[\alpha*(\beta*\gamma)]$。` },
            { claim: R`**(2) 单位元。**$\alpha*c_x$ 与 $\alpha$ 之间的同伦（\figref{4.5}(b)）：`, tex: R`F(s,t)=\begin{cases}\alpha\Big(\dfrac{2s}{1+t}\Big) & 0\le s\le\dfrac{t+1}{2}\\ x & \dfrac{t+1}{2}\le s\le1.\end{cases}`, why: R`$t=0$：前半 $\alpha(2s)$、后半常值 $x$，即 $\alpha*c_x$；$t=1$：$\alpha(s)$。常值段逐渐被"挤掉"。` },
            { claim: R`类似地，$c_x*\alpha$ 与 $\alpha$ 之间的同伦为`, tex: R`F(s,t)=\begin{cases}x & 0\le s\le\dfrac{1-t}{2}\\ \alpha\Big(\dfrac{2s-1+t}{1+t}\Big) & \dfrac{1-t}{2}\le s\le1.\end{cases}`, why: R`故 $[\alpha]*[c_x]=[\alpha]=[c_x]*[\alpha]$。` },
            { claim: R`**(3) 逆元。**定义 $F:I\times I\to X$：`, tex: R`F(s,t)=\begin{cases}\alpha(2s(1-t)) & 0\le s\le\frac12\\ \alpha(2(1-s)(1-t)) & \frac12\le s\le1.\end{cases}`, why: R`在 $s=\frac12$ 两段都等于 $\alpha(1-t)$：圈只走到 $\alpha(1-t)$ 就原路返回。` },
            { claim: R`$F(s,0)=\alpha*\alpha^{-1}$（后半段 $\alpha(2-2s)=\alpha^{-1}(2s-1)$），$F(s,1)=\alpha(0)=c_x$，所以`, tex: R`[\alpha*\alpha^{-1}]=[\alpha]*[\alpha^{-1}]=[c_x]`, uses: ["4.2", "4.4"] },
            { claim: R`把同一公式用于 $\alpha^{-1}$（注意 $(\alpha^{-1})^{-1}=\alpha$）又得 $[\alpha^{-1}]*[\alpha]=[c_x]$。所以 $[\alpha^{-1}]=[\alpha]^{-1}$。`, fill: true },
          ]} />
        </Stmt>
        <Figure n="4.5" illustration={<HomotopyRedraw n="4.5"/>} caption={R`(a) $(\alpha*\beta)*\gamma$ 与 $\alpha*(\beta*\gamma)$ 之间的同伦。(b) $\alpha*c_x$ 与 $\alpha$ 之间的同伦。`} width="85%" />
        <Box kind="physics" title="读图：同伦就是“重新安排时间表”">{R`\figref{4.5}(a) 的两条斜线标出了 $F(\cdot,t)$ 中三段的分界点 $s=\frac{1+t}4$ 与 $s=\frac{2+t}4$：随着 $t$ 从 0 增到 1，分界点向右平移，$\alpha$ 段被拉长、$\gamma$ 段被压短。像集合 $\alpha(I)\cup\beta(I)\cup\gamma(I)$ 自始至终没变，变的只是"什么时刻走到哪里"。结合律与单位元的同伦都是这一类；只有逆元的同伦真正改变了像（让圈越走越短）。`}</Box>
        <Tx>{R`**小结。**$\pi_1(X,x)$ 是群：单位元是常值圈 $c_x$ 的同伦类；乘积 $[\alpha]*[\beta]$ 良定义并满足群公理；$[\alpha]$ 的逆是 $[\alpha]^{-1}=[\alpha^{-1}]$。下一节研究基本群的一般性质，它们会大大简化实际计算。`}</Tx>
      </Sub>
    </Sec>);
}
