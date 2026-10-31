// 引言 + §6.1 Scalar–vector–tensor decomposition —— 式 (6.1)–(6.6)
import { Sec, Tx, Eq, Box, Derivation, C } from "@kit";
import { hT, dK } from "./_ch06_notation.jsx";
import { DofMatrix } from "./_ch06_plots.jsx";

const R = String.raw;

export function Intro() {
  return (
    <Sec n="6.0" title="Introduction" zh="引言：给 Boltzmann 方程补上引力"
      gist={R`第 5 章的方程 \eqref{5.67}–\eqref{5.73} 描述了在**给定**的扰动度规中各成分如何演化；本章反过来，用线性化的 Einstein 方程算出度规扰动如何由这些成分决定，使方程组闭合。`}
      why={R`第 3 章只解了 Einstein 方程的均匀（零阶）部分。扰动的一阶部分虽然代数较长，但每一步都很直接——这是值得亲手做一遍的计算。动手之前，要先想清楚 10 个分量如何拆分、坐标如何选取。`}>
      <Tx>{R`**还缺的那一半。**在前几章里，我们用 Boltzmann 方程处理了所有非引力相互作用，也计入了引力对粒子分布的影响，得到方程组 \eqref{5.67}–\eqref{5.73}。但影响是双向的：粒子分布的扰动反过来也会改变引力场。描述这一点需要广义相对论的 Einstein 方程。第 3 章我们求出了 Einstein 方程的均匀解；这里要在这个零阶解附近**展开到线性阶**。

这个计算本身毫无玄机，只是有点长——作者称之为"一生必做一次"的练习，所以下面会相当详细地给出每一步。不过在埋头计算之前，我们先要想两件事：怎样最好地拆分 10 个独立的 Einstein 方程（§6.1），以及怎样选择坐标（§6.2）。`}</Tx>
    </Sec>);
}

export function Sec61() {
  return (
    <Sec n="6.1" title="Scalar–vector–tensor decomposition" zh="标量–矢量–张量分解"
      gist={R`把一般扰动度规的 10 个函数按**空间转动**下的性质分为 4 个标量 $A,B,D,E$、2 个横向矢量 $B_i,V_i$（各 2 个自由度）与 2 个张量自由度 $h^{\rm TT}_{ij}$。分解定理：三类扰动在线性阶各自独立演化。`}
      why={R`Einstein 方程是张量方程，各分量一般相互耦合。Fourier 变换解耦了不同的 $\boldsymbol k$（利用背景的**均匀性**）；按转动性质分类则进一步解耦同一 $\boldsymbol k$ 下的不同分量（利用背景的**各向同性**）——这正是此前只用 $\Phi$、$\Psi$ 两个势的依据。`}
      gives={["6.1", "6.2", "6.3", "6.4", "6.5", "6.6"]}>
      <p className="muted">本节概念：<C id="svt" /> · <C id="dof" /> · <C id="decomp_thm" /></p>
      <Tx>{R`**从 Fourier 解耦到"按转动解耦"。**上一章我们看到，转到 Fourier 空间让扰动后的 Boltzmann 方程大大简化：不同的 Fourier 模式 $\boldsymbol k$ 彼此解耦。Einstein 方程是一个张量等式，对应的是一组一般相互耦合的方程。但存在一种分解，能再次把不同的"模式"解耦。事实上，我们在写出 \eqref{3.49} 那样简单的扰动度规时，已经在默默使用这个结果了。所以本章就从这个分解开始。

**一般的扰动度规。**考虑一个被微小扰动的 FLRW 时空，把度规写成`}</Tx>
      <Eq n="6.1" keyEq title="一般扰动 FLRW 度规" say="在平直 FLRW 度规上加上最一般的小扰动 $h_{\mu\nu}$：时–时、时–空、空–空三块各有自己的扰动，空间部分按 $a^2$ 缩放，时–空部分按 $a$ 缩放，使 $h$ 全部无量纲。">{R`\begin{aligned}g_{00}(t,\boldsymbol x) &= -1+h_{00}(t,\boldsymbol x),\\ g_{0i}(t,\boldsymbol x) &= a(t)h_{0i}(t,\boldsymbol x)=a(t)h_{i0}(t,\boldsymbol x),\\ g_{ij}(t,\boldsymbol x) &= a^2(t)\left[\delta_{ij}+h_{ij}(t,\boldsymbol x)\right],\end{aligned}`}</Eq>
      <Tx>{R`其中 $h_{00}$、$h_{0i}$、$h_{ij}$ 是依赖时空位置的度规扰动，各分量都假定很小。本章大部分时候使用物理时间 $t$。记住 $t$ 与共形时间 $\eta$ 之间总有 $dt=a\,d\eta$：在两者之间来回切换只是一个简单的变量替换，**不触及扰动本身**，也与下面要讨论的坐标选择（规范）无关。

**回顾：共形牛顿规范是一个特殊选择。**在 §3.3 引入扰动度规时，我们假设了 $h_{\mu\nu}$ 的一个特殊形式：`}</Tx>
      <Eq n="6.2" say="共形牛顿规范：时–时扰动由牛顿势 $\Psi$ 给出，时–空扰动为零，空–空扰动只是各向同性的“局域标度因子”变化 $\Phi$。">{R`\begin{aligned}h_{00} &= -2\Psi,\\ h_{0i} &= 0,\\ h_{ij} &= 2\Phi\delta_{ij},\end{aligned}`}</Eq>
      <Tx>{R`即所谓**共形牛顿规范**（conformal-Newtonian gauge）。现在我们花点时间更系统地研究扰动 FLRW 度规，这有两个目的：其一，帮助我们挑出扰动度规的 Einstein 方程中真正需要的分量（本章的最终目标）；其二，我们会看到，$\Phi$、$\Psi$ 两个势**并不足以**涵盖全部引力物理。

**按空间转动分类。**技术上，我们要按各分量在**空间转动**下的行为来分类 \eqref{6.1} 中的分量：

- **时–时分量** $h_{00}$ 没有空间指标，在空间转动下不变——是一个 3-标量。为了不局限于共形牛顿规范，一般地记 $h_{00}=-2A$（这里以及下文的符号与因子 2 都只是约定）。
- **时–空分量** $h_{0i}$ 是一个 3-矢量。把它分解为**纵向**与**横向**两部分，用两个函数 $B$ 和 $B_i$ 表示：`}</Tx>
      <Eq n="6.3" say="任何 3-矢量场都能拆成一个标量的梯度（纵向，“标量”部分 $B$）加上一个无散矢量（横向，“矢量”部分 $B_i$）——即 Helmholtz 分解。">{R`h_{0i}=-\frac{\partial B}{\partial x^i}-B_i\qquad\text{where}\qquad B_i{}^{,i}\equiv\frac{\partial B_i}{\partial x^i}=0.`}</Eq>
      <Tx>{R`这里用逗号表示对坐标的普通偏导数（不是协变导数）：$B_{,i}\equiv\partial B/\partial x^i$。再强调一次：这里以及全书都用 $\delta_{ij}$（欧氏宇宙恰当的空间背景度规）来升降空间指标，并对重复指标求和。于是 $h_{0i}$ 的第一部分是**一个 3-标量函数 $B(t,\boldsymbol x)$ 的梯度**，第二部分是**无散的 3-矢量** $B_i(t,\boldsymbol x)$。我们把前者叫"标量"贡献，后者叫"矢量"贡献。在 Fourier 空间中 \eqref{6.3} 更简单：`}</Tx>
      <Eq n="6.4" say="Fourier 空间里，标量部分平行于 $\boldsymbol k$（纵向），矢量部分垂直于 $\boldsymbol k$（横向）：$k^iB_i=0$。">{R`h_{0i}(t,\boldsymbol k)=-ik_iB(t,\boldsymbol k)-B_i(t,\boldsymbol k),\qquad\text{with}\qquad k^iB_i=0.`}</Eq>
      <Tx>{R`- **空–空分量** $h_{ij}$ 是对称 3-张量。先看它的标量贡献。一种我们已经知道：正比于克罗内克 $\delta$ 的项，如 \eqref{6.2}，一般记为 $D$。但对一个标量 $E$ 求两次空间导数也能构造出对称 3-张量。类似地，对一个无散矢量场 $V_i$ 求一次导数，可以构造出 $h_{ij}$ 的矢量贡献。于是`}</Tx>
      <Eq n="6.5" say="空–空扰动中能由标量与矢量构造的部分：各向同性的 $D$、由标量两次求导得到的 $E$、由无散矢量对称化求导得到的 $V_i$。">{R`h_{ij}=2D\delta_{ij}-2E_{,ij}+V_{i,j}+V_{j,i}\qquad\text{(scalar and vector)},`}</Eq>
      <Tx>{R`其中 $V_i{}^{,i}=0$，并且我们让矢量贡献对 $i$、$j$ 对称。

**这就完整了吗？**没有：$h_{ij}$ 还有一部分**无法**写成对标量或矢量求导。看清这一点的一个办法是**数自由度**。$h_{\mu\nu}$ 是四维对称张量，有 10 个自由函数（16 个分量减去非对角元的 6 个对称约束）。到目前为止我们找到了 4 个标量函数（$A$、$B$、$D$、$E$）和 2 个横向矢量（$B_i$、$V_i$）；由于横向约束，每个矢量含 2 个自由函数。于是已经数出 8 个函数，剩下的 2 个称为**张量**自由度，记作 $h^{\rm TT}_{ij}$（TT = transverse-traceless，横向无迹）。§6.4 会看到它们描述了非常重要的物理——**传播的引力波**。

总结起来，空间度规扰动在 Fourier 空间中写成`}</Tx>
      <Eq n="6.6" keyEq title="空间度规扰动的完整分解" say="空–空扰动 = 标量（$D$ 的迹部分与 $E$ 的纵向部分）+ 矢量（$V_i$，与 $\boldsymbol k$ 垂直）+ 张量（横向无迹的 $h^{\rm TT}_{ij}$）。三部分对应三种在空间转动下性质不同的扰动。">{R`h_{ij}=2D\delta_{ij}+2k_ik_jE+ik_iV_j+ik_jV_i+${hT}_{ij}.`}</Eq>
      <Derivation title={R`从 \eqref{6.5} 到 \eqref{6.6}：Fourier 变换`} collapsed steps={[
        { tex: R`\partial_i\to ik_i\quad\Rightarrow\quad -2E_{,ij}\to-2(ik_i)(ik_j)E=2k_ik_jE`, why: R`两次求导各带一个 $ik$，$i^2=-1$ 使符号翻转。` },
        { tex: R`V_{i,j}+V_{j,i}\to ik_jV_i+ik_iV_j,\qquad k^iV_i=0`, why: R`矢量部分：$V_i$ 垂直于 $\boldsymbol k$。` },
        { tex: R`${dK}^{ij}\,${hT}_{ij}=0,\qquad k^i\,${hT}_{ij}=0`, why: R`剩下的 $h^{\rm TT}_{ij}$ 必须无迹（迹已归入 $D$、$E$）且横向（纵向部分已归入 $E$、$V_i$）——6 个对称分量减去 4 个条件，只剩 2 个。` },
      ]} />
      <Box kind="aside" title={R`交互：数一数 $h_{\mu\nu}$ 的 10 个分量（编者补充）`}>
        <Tx>{R`取 $\boldsymbol k=k\hat{\boldsymbol e}_z$，把 \eqref{6.1}、\eqref{6.4}、\eqref{6.6} 写成矩阵，按标量（蓝）、矢量（绿）、张量（红）着色；最后一个按钮展示规范固定（§6.2）之后剩下的 6 个物理自由度。`}</Tx>
        <DofMatrix />
      </Box>
      <Tx>{R`**分解定理。**以上我们只分解了度规，但 $h_{\mu\nu}$ 并没有什么特殊之处：同样的形式分解可以用于任何张量，例如能动张量。相对论中一个非常重要的结果——**分解定理**（decomposition theorem）——指出：**标量、矢量、张量三类扰动在线性阶上各自独立演化**。也就是说，如果早期宇宙中某个物理过程产生了张量扰动，它们在演化中不会诱导出标量扰动；反过来，要确定标量扰动的演化，也不必担心可能存在的矢量或张量扰动。这就是迄今为止我们可以在扰动度规中忽略矢量与张量贡献的理由。

分解定理成立的根本原因是：FLRW 背景度规在空间上**各向同性**。转到 Fourier 空间（利用 FLRW 度规的**均匀性**解耦不同的扰动，见 Box 5.1），再做标量/矢量/张量分解，我们就把 FLRW 度规的对称性利用到了极致。`}</Tx>
      <Box kind="warning" title="3-标量不是时空标量">{R`这里的分解指的是 **3-标量、3-矢量、3-张量**（相对空间转动而言），不要与时空标量（如场 $\phi(x)$）、时空矢量（如动量 $P^\mu$）、时空张量（如度规 $g_{\mu\nu}$）混淆。原书作者为这种易混的命名致歉，但它在文献中被广泛使用。例如 $h_{00}$ 是 3-标量，却只是时空张量 $h_{\mu\nu}$ 的一个分量。`}</Box>
      <Tx>{R`**一个悬念。**你也许注意到 \eqref{6.2} 与其后推出的一般表达式还有一处不同：即使只考虑标量扰动，难道不需要 $h_{0i}$ 中的 $B_{,i}$ 和 $h_{ij}$ 中的 $E_{,ij}$ 吗？为什么共形牛顿规范可以不要它们？考虑了坐标变换的效应之后，答案就清楚了——这是下一节的内容。`}</Tx>
    </Sec>);
}
