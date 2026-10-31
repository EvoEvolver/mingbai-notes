// 补充材料 C_III：两个共轭可观测量的方均根偏差（式 CIII-1 … CIII-25）
// 讲法：先说清楚"这次要证明的是什么、只用到什么"，再用"一个范数不能为负"的论证一口气得到不等式；取等号的条件反过来变成一个一阶微分方程，解出来必然是高斯波包。
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";

const R = String.raw;
const q = R`\sym{qv}{q}`;               // Q 的本征值（与 H_III 的电荷 q 区分）
const th = R`\sym{thC}{\theta}`;        // (CIII-19) 引入的辅助函数 θ(q)
const ph = R`\sym{phC}{\varphi}`;       // (CIII-2) 的辅助右矢 |φ⟩
const BB = R`\sym{obsB}{B}`;            // (CIII-11) 中的可观测量 B

export function SecC() {
  return (
    <Sec n="CIII" title="Root mean square deviations of two conjugate observables" zh="两个共轭可观测量的方均根偏差"
      gist={R`只用 $[Q,P]=i\hbar$ 和"矢量的模方不能为负"，就严格证明 $\Delta P\cdot\Delta Q\ge\hbar/2$；等号成立当且仅当 $(Q-\langle Q\rangle)\ket\psi$ 与 $(P-\langle P\rangle)\ket\psi$ 成比例，在 $\{\ket q\}$ 表象中这是一阶微分方程，唯一解是高斯波包。`}
      why={R`第 I 章的不确定关系是 Fourier 分析给出的量级估计；第 III 章用到了 $\Delta X\Delta P_x\ge\hbar/2$ 但没有给出一般证明。这里给出精确、普适的版本，并刻画"最小不确定态"——后面谐振子的相干态、光学的压缩态都从这里出发。`}
      gives={["CIII-3", "CIII-10", "CIII-11", "CIII-14", "CIII-22"]}>
      <p className="muted">本节概念：<C id="robertson" /></p>
      <Tx>{R`**要证明什么。**称两个可观测量 $Q$、$P$ 为**共轭**的，如果`}</Tx>
      <Tx>{R`$$[Q,P]=i\hbar .$$`}</Tx>
      <Tx>{R`（位置分量与对应的动量分量就是典型例子。）我们要证明：对体系的**任何**态矢，它们的方均根偏差（\mainsec{C-5}）满足`}</Tx>
      <Eq n="CIII-1" say="对任意态，两个共轭可观测量的方均根偏差之积不小于 $\hbar/2$。">{R`\Delta P\cdot\Delta Q\ge\frac\hbar2`}</Eq>
      <Tx>{R`证明里**不会用到波函数、Fourier 变换或任何表象**，只用对易关系和内积的正定性——所以结论对一切满足 $[Q,P]=i\hbar$ 的算符对都成立。第二步再问：什么样的态恰好取到 $\hbar/2$？`}</Tx>

      <Sub n="CIII-1" title="The Heisenberg relation for P and Q" zh="不等式的证明：一个模方不能为负">
        <Tx>{R`**核心想法。**构造一个依赖实参数 $\lambda$ 的右矢，它的模方是 $\lambda$ 的二次多项式；模方对一切 $\lambda$ 都非负，所以这个二次式的判别式不能为正——这个"判别式条件"就是不等式本身。

先对未居中的 $Q$、$P$ 做一遍（下一步再居中）：`}</Tx>
        <Eq n="CIII-2" say="用 $Q+i\lambda P$ 作用在态上，构造一个依赖实参数 $\lambda$ 的辅助右矢。">{R`\ket{${ph}}=(Q+i\lambda P)\ket\psi`}</Eq>
        <Tx>{R`$\lambda$ 为任意实数。展开它的模方；注意 $(Q+i\lambda P)^\dagger=Q-i\lambda P$（$Q$、$P$ 厄米、$\lambda$ 实），交叉项正好组合成对易子：`}</Tx>
        <Eq n="CIII-3" keyEq title="辅助右矢的模方" say="辅助右矢的模方是 $\lambda$ 的二次式：常数项为 $\langle Q^2\rangle$，一次项来自对易子、等于 $-\lambda\hbar$，二次项为 $\lambda^2\langle P^2\rangle$，且对一切 $\lambda$ 非负。">{R`\begin{aligned}\braket{${ph}|${ph}}&=\braket{\psi|(Q-i\lambda P)(Q+i\lambda P)|\psi}\\&=\braket{\psi|Q^2|\psi}+\braket{\psi|(i\lambda QP-i\lambda PQ)|\psi}+\braket{\psi|\lambda^2P^2|\psi}\\&=\langle Q^2\rangle+i\lambda\langle[Q,P]\rangle+\lambda^2\langle P^2\rangle\\&=\langle Q^2\rangle-\lambda\hbar+\lambda^2\langle P^2\rangle\ge0\end{aligned}`}</Eq>
        <Tx>{R`一个开口向上的抛物线处处非负，就不能有两个实根，即判别式 $\le0$：`}</Tx>
        <Eq n="CIII-4" say="二次式对一切实数 $\lambda$ 非负，所以判别式不大于零。">{R`\hbar^2-4\langle P^2\rangle\,\langle Q^2\rangle\le0`}</Eq>
        <Eq n="CIII-5" say="于是 $P^2$ 与 $Q^2$ 的平均值之积不小于 $\hbar^2/4$。">{R`\langle P^2\rangle\,\langle Q^2\rangle\ge\frac{\hbar^2}4`}</Eq>
        <Tx>{R`**居中。**\eqref{CIII-5} 还不是我们要的：$\langle Q^2\rangle$ 包含了"平均值离原点多远"，不是弥散。把平均值减掉（对给定的 $\ket\psi$，$\langle P\rangle$、$\langle Q\rangle$ 只是两个实数）：`}</Tx>
        <Eq n="CIII-6" say="把可观测量减去它在该态中的平均值，得到以零为平均的“偏差算符”。">{R`\begin{aligned}P'&=P-\langle P\rangle=P-\braket{\psi|P|\psi}\\Q'&=Q-\langle Q\rangle=Q-\braket{\psi|Q|\psi}\end{aligned}`}</Eq>
        <Tx>{R`减去一个数乘单位算符不改变对易子，所以 $P'$、$Q'$ 仍是共轭的：`}</Tx>
        <Eq n="CIII-7" say="偏差算符与原算符有相同的对易子 $i\hbar$，因而也是一对共轭可观测量。">{R`[Q',P']=[Q,P]=i\hbar`}</Eq>
        <Tx>{R`\eqref{CIII-5} 的推导只用了对易子，因此对 $P'$、$Q'$ 原样成立：`}</Tx>
        <Eq n="CIII-8" say="对偏差算符同样有：两者平方平均值之积不小于 $\hbar^2/4$。">{R`\langle {P'}^2\rangle\,\langle {Q'}^2\rangle\ge\frac{\hbar^2}4`}</Eq>
        <Tx>{R`而偏差算符平方的平均值正是方差（\mainref{C-23}）：`}</Tx>
        <Eq n="CIII-9" say="方均根偏差就是偏差算符平方平均值的平方根。">{R`\begin{aligned}\Delta P&=\sqrt{\langle {P'}^2\rangle}\\\Delta Q&=\sqrt{\langle {Q'}^2\rangle}\end{aligned}`}</Eq>
        <Tx>{R`开方，就得到要证的结论：`}</Tx>
        <Eq n="CIII-10" keyEq title="Heisenberg 不确定关系（严格形式）" say="共轭可观测量的方均根偏差之积有严格下界 $\hbar/2$，与态无关、与表象无关。">{R`\boxed{\Delta P\cdot\Delta Q\ge\frac\hbar2}`}</Eq>
        <Tx>{R`凡是经典上互为共轭的一对变量 $x_i$、$p_i$，量子化后都满足这个严格下界。`}</Tx>
        <Box kind="aside" title="任意两个可观测量的推广">
          <Tx>{R`把 \eqref{CIII-2} 中的 $Q$、$P$ 换成任意可观测量 $A$、$${BB}$（同样先居中），重复同样的论证，就得到 Robertson 不等式：`}</Tx>
          <Eq n="CIII-11" keyEq title="Robertson 不等式" say="任意两个可观测量的方均根偏差之积，不小于它们对易子平均值模的一半；下界一般依赖于所处的态。">{R`\Delta A\cdot\Delta ${BB}\ge\frac12\left|\langle[A,${BB}]\rangle\right|`}</Eq>
          <Derivation collapsed title="补全推广的论证" steps={[
            { tex: R`[A,${BB}]=i\,\Gamma,\qquad \Gamma^\dagger=\Gamma`, why: R`两个厄米算符的对易子是反厄米的，所以总能写成 $i$ 乘一个厄米算符 $\Gamma$；$\langle\Gamma\rangle$ 是实数。` },
            { tex: R`\big\|(A'+i\lambda ${BB}')\psi\big\|^2=\langle {A'}^2\rangle-\lambda\langle\Gamma\rangle+\lambda^2\langle {${BB}'}^2\rangle\ge0`, why: R`与 \eqref{CIII-3} 完全相同，只是 $\hbar$ 换成了 $\langle\Gamma\rangle$。` },
            { tex: R`\langle\Gamma\rangle^2\le4\,(\Delta A)^2(\Delta ${BB})^2\ \Rightarrow\ \Delta A\,\Delta ${BB}\ge\tfrac12|\langle\Gamma\rangle|=\tfrac12|\langle[A,${BB}]\rangle|`, why: R`判别式非正。共轭情形 $\Gamma=\hbar\,\mathbb 1$，回到 \eqref{CIII-10}。` },
          ]} />
          <Tx>{R`与共轭情形的关键区别：右边是**平均值**，随态而变。例如两个角动量分量 $[L_x,L_y]=i\hbar L_z$，在 $\langle L_z\rangle=0$ 的态里下界为零，$L_x$ 和 $L_y$ 可以同时有确定值（如角动量为零的态）。只有当对易子是常数时，下界才对所有态一致。`}</Tx>
        </Box>
        <Box kind="warning" title="不确定关系说的不是“测一个会扰动另一个”">{R`这里的 $\Delta P$、$\Delta Q$ 是对**同一个态**的大量全同拷贝分别测 $P$、分别测 $Q$ 所得结果的统计弥散。证明里没有任何测量过程，它刻画的是**态的制备**能达到的极限：不存在一种制备方法，使 $P$ 和 $Q$ 的统计分布同时任意窄。`}</Box>
      </Sub>

      <Sub n="CIII-2" title="The &quot;minimum&quot; wave packet" zh="取等号的态：最小波包">
        <Tx>{R`若某个态恰好使`}</Tx>
        <Eq n="CIII-12" say="方均根偏差之积恰好取到下界 $\hbar/2$。">{R`\Delta P\cdot\Delta Q=\frac\hbar2`}</Eq>
        <Tx>{R`就称它是 $P$、$Q$ 的**最小波包**。它长什么样？办法是把证明倒过来读。

**等号 ⇔ 判别式为零 ⇔ 抛物线碰到零。**对居中算符写出同样的辅助右矢：`}</Tx>
        <Eq n="CIII-13" say="用偏差算符构造辅助右矢，它的模方是 $\lambda$ 的二次式。">{R`\ket{${ph}'}=(Q'+i\lambda P')\ket\psi`}</Eq>
        <Tx>{R`$\braket{${ph}'|${ph}'}$ 是 $\lambda$ 的二次式。取等号意味着判别式为零，抛物线在某个 $\lambda_0$ 处恰好碰到零——而一个右矢的模方为零，右矢本身就是零：`}</Tx>
        <Eq n="CIII-14" keyEq title="最小波包的条件" say="取到下界时，偏差算符的这个组合把态完全湮灭：$(Q-\langle Q\rangle)\ket\psi$ 与 $(P-\langle P\rangle)\ket\psi$ 成比例。">{R`(Q'+i\lambda_0P')\ket\psi=\big[Q-\langle Q\rangle+i\lambda_0(P-\langle P\rangle)\big]\ket\psi=0`}</Eq>
        <Tx>{R`反过来，若 $\Delta P\cdot\Delta Q>\hbar/2$，抛物线处处严格为正，不存在这样的 $\lambda_0$。所以：**取到下界的充要条件是 $(Q-\langle Q\rangle)\ket\psi$ 与 $(P-\langle P\rangle)\ket\psi$ 成比例**，比例系数是 $-i\lambda_0$。

**定出 $\lambda_0$。**用方差改写模方：`}</Tx>
        <Eq n="CIII-15" say="取到下界时，模方作为 $\lambda$ 的二次式有重根；系数分别是 $(\Delta P)^2$、$-\hbar$ 和 $(\Delta Q)^2$。">{R`\braket{${ph}'|${ph}'}=\lambda^2(\Delta P)^2-\lambda\hbar+(\Delta Q)^2=0`}</Eq>
        <Tx>{R`判别式为零时，重根就是顶点：`}</Tx>
        <Eq n="CIII-16" say="重根 $\lambda_0$ 等于 $\hbar/2(\Delta P)^2$，利用 $\Delta P\Delta Q=\hbar/2$ 也可写成 $2(\Delta Q)^2/\hbar$；它总是正的。">{R`\lambda_0=\frac\hbar{2(\Delta P)^2}=\frac{2(\Delta Q)^2}\hbar`}</Eq>
        <Tx>{R`**把条件写成微分方程。**到 $\{\ket{${q}}\}$ 表象中去（为简单起见设 $Q$ 的本征值非简并）。在这个表象里 $P$ 作用为 $\frac\hbar i\frac{\mathrm d}{\mathrm d${q}}$（\IIc{EII}），于是 $i\lambda_0P$ 变成 $\hbar\lambda_0\frac{\mathrm d}{\mathrm d${q}}$，\eqref{CIII-14} 成为一阶常微分方程：`}</Tx>
        <Eq n="CIII-17" say="在 $\{\ket q\}$ 表象中，最小波包条件成为关于波函数的一阶线性微分方程。">{R`\left[${q}+\hbar\lambda_0\frac{\mathrm d}{\mathrm d${q}}-\langle Q\rangle-i\lambda_0\langle P\rangle\right]\psi(${q})=0`}</Eq>
        <Eq n="CIII-18" say="波函数是态在 $Q$ 的本征基中的分量。">{R`\psi(${q})=\braket{${q}|\psi}`}</Eq>
        <Tx>{R`**去掉两个"平移"。**方程里的 $\langle Q\rangle$ 和 $\langle P\rangle$ 只是把波包在 $${q}$ 轴上平移、在动量上"推一下"。把它们剥离掉：`}</Tx>
        <Eq n="CIII-19" say="把波函数写成平面波相因子乘以一个以 $\langle Q\rangle$ 为中心的形状函数：前者负责平均动量，后者负责形状。">{R`\psi(${q})=\mathrm e^{i\langle P\rangle${q}/\hbar}\,${th}(${q}-\langle Q\rangle)`}</Eq>
        <Tx>{R`对 \eqref{CIII-19} 求导时，相因子贡献的 $\frac{i\langle P\rangle}\hbar\psi$ 乘上 $\hbar\lambda_0$ 恰好抵消方程中的 $-i\lambda_0\langle P\rangle$；再把变量 $${q}-\langle Q\rangle$ 重新记作 $${q}$，剩下：`}</Tx>
        <Eq n="CIII-20" say="剥离平移后，形状函数满足最简单的一阶方程：导数与 $q$ 成正比。">{R`\left[${q}+\lambda_0\hbar\frac{\mathrm d}{\mathrm d${q}}\right]${th}(${q})=0`}</Eq>
        <Tx>{R`$${th}'/${th}=-${q}/\lambda_0\hbar$，直接积分：`}</Tx>
        <Eq n="CIII-21" say="形状函数必须是高斯函数；$\lambda_0>0$ 保证它可以归一化。">{R`${th}(${q})=C\,\mathrm e^{-${q}^2/2\lambda_0\hbar}`}</Eq>
        <Tx>{R`$C$ 为任意复常数。注意 $\lambda_0>0$ 恰好保证这是一个**衰减**的高斯——若 $\lambda_0<0$，解会发散、无法归一化，这也说明了为什么 \eqref{CIII-16} 中的重根必须是正的。代回 \eqref{CIII-19} 并用 $\lambda_0\hbar=2(\Delta Q)^2$：`}</Tx>
        <Eq n="CIII-22" keyEq title="最小波包" say="最小波包必为高斯波包：中心在 $\langle Q\rangle$，宽度由 $\Delta Q$ 决定，并带有平均动量 $\langle P\rangle$ 的平面波相因子。">{R`\psi(${q})=C\,\mathrm e^{i\langle P\rangle${q}/\hbar}\,\mathrm e^{-\left[\frac{${q}-\langle Q\rangle}{2\Delta Q}\right]^2}`}</Eq>
        <Tx>{R`归一化（$\int|\psi|^2\mathrm d${q}=1$，一个标准 Gauss 积分）定出 $|C|$；取 $C$ 为正实数：`}</Tx>
        <Eq n="CIII-23" say="归一化常数由 $\Delta Q$ 决定。">{R`C=\left[2\pi(\Delta Q)^2\right]^{-1/4}`}</Eq>
        <Tx>{R`**结论**：使 $\Delta P\cdot\Delta Q=\hbar/2$ 的态，在 $\{\ket{${q}}\}$ 表象中一定是高斯波包；它由一个以原点为中心的实高斯 $${th}$ 经两次"平移"得到——在 $${q}$ 轴上平移 $\langle Q\rangle$，在动量轴上平移 $\langle P\rangle$。第 I 章补充材料 $\mathrm G_{\rm I}$ 的 $t=0$ 高斯波包正是这一族中的一员。

**动量表象里也一样。**把 \eqref{CIII-22} 做 Fourier 变换：`}</Tx>
        <Eq n="CIII-24" say="动量表象波函数是 $q$ 表象波函数的 Fourier 变换。">{R`\overline\psi(p)=\braket{p|\psi}=\frac1{\sqrt{2\pi\hbar}}\int_{-\infty}^{+\infty}\mathrm d${q}\,\mathrm e^{-ip${q}/\hbar}\psi(${q})`}</Eq>
        <Tx>{R`高斯的 Fourier 变换仍是高斯；也可以不做积分，直接在 $\{\ket p\}$ 表象中重复上面的论证（此时 $Q$ 作用为 $i\hbar\,\mathrm d/\mathrm dp$）。结果是`}</Tx>
        <Eq n="CIII-25" say="最小波包在动量表象中也是高斯：中心在 $\langle P\rangle$，宽度由 $\Delta P$ 决定，带有位置 $\langle Q\rangle$ 的相因子。">{R`\overline\psi(p)=\left[2\pi(\Delta P)^2\right]^{-1/4}\,\mathrm e^{-i\langle Q\rangle p/\hbar}\,\mathrm e^{-\left[\frac{p-\langle P\rangle}{2\Delta P}\right]^2}`}</Eq>
        <Tx>{R`它与直接 Fourier 变换的结果只差一个常数相位 $\exp(i\langle Q\rangle\langle P\rangle/\hbar)$。位置与动量在这里的角色完全对称：一个表象里的平移，就是另一个表象里的相因子。`}</Tx>
        <Box kind="physics" title="最小波包为什么重要">{R`(1) 高斯波包是"最像经典粒子"的量子态：位置与动量都尽可能确定。(2) 一般它**不会保持**最小：自由演化中 $\Delta Q$ 增大而 $\Delta P$ 不变（$\mathrm G_{\rm I}$ 的扩散），乘积随之变大。(3) 在谐振子势中，适当宽度的高斯波包始终保持最小不确定度并像经典粒子那样振荡——这就是第 V 章将遇到的相干态。`}</Box>
      </Sub>
    </Sec>);
}
