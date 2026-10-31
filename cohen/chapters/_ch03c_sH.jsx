// 补充材料 H_III：规范不变性（式 HIII-1 … HIII-76）
// 讲法：先在经典力学中把"物理量"与"计算工具"分开（Newton 方程里没有势，Hamilton 方程里有），得到判别真物理量的特征关系；
// 再在量子力学中逐条对照：同一组 R、P，态矢差一个位置相关的相因子，真物理量的算符随规范协变，一切预言不变。
import { Sec, Sub, Tx, TxI, Eq, Box, Derivation, C } from "@kit";
import { GaugeLab } from "./_ch03c_plots.jsx";

const R = String.raw;
const U = R`\sym{Upot}{U}`;          // 标势（与演化算符 U 区分）
const J = R`\mathcal J`;
const Jp = R`\mathcal J'`;
const RH = R`\sym{rhoP}{\rho}`;      // 概率密度
const FF = R`\sym{Fph}{F}`;          // (HIII-39) 中的厄米算符 F(R;t)
const FG = R`\sym{Fgen}{F}`;         // (HIII-23) 中与规范无关的函数 F
const LA = R`\sym{Lang}{\mathcal L}`; // (HIII-25) 中的"角动量函数"
const ZZ = R`\sym{Zop}{Z}`;          // 位置算符的 z 分量
const gn = R`\sym{gH}{g}_n`;         // G_J 的本征值

export function SecH() {
  return (
    <Sec n="HIII" title="Gauge invariance" zh="规范不变性"
      gist={R`同一电磁场对应无穷多组势 $(${U},\mathbf A)$，彼此由 $\chi(\mathbf r,t)$ 联系。经典 Hamilton 形式中 $\mathbf p$ 随规范变而 $\mathbf r$、$\boldsymbol\pi=\mathbf p-q\mathbf A$ 不变；量子力学中 $\mathbf R$、$\mathbf P$ 的算符在一切规范中相同，态矢则乘上位置相关的相因子 $T_\chi=\mathrm e^{iq\chi(\mathbf R,t)/\hbar}$。Schrödinger 方程形式不变，真物理量的算符满足 $\tilde G_{${J}}=G_{${Jp}}$，于是测量结果、概率、概率密度与概率流都与规范无关。`}
      why={R`第 III 章写带电粒子的 Schrödinger 方程时用的是势而不是场，而势不唯一。如果预言依赖于势的选取，理论就不完整。本节证明预言只依赖于场——并且看清楚哪些量是"真物理量"（$\mathbf r$、$\boldsymbol\pi$、动能），哪些只是计算工具（$\mathbf p$、$\mathbf L$、一般情形下的 $H$）。`}
      gives={["HIII-2", "HIII-14b", "HIII-17", "HIII-43", "HIII-44", "HIII-51", "HIII-59", "HIII-75"]}>
      <p className="muted">本节概念：<C id="gauge" /></p>

      <Sub n="HIII-1" title="Outline of the problem: scalar and vector potentials associated with an electromagnetic field; concept of a gauge" zh="问题：势不唯一">
        <Tx>{R`电磁场由每时每地的电场 $\mathbf E(\mathbf r;t)$ 与磁场 $\mathbf B(\mathbf r;t)$ 刻画，二者受 Maxwell 方程约束。也可以改用一个标势 $${U}(\mathbf r;t)$ 和一个矢势 $\mathbf A(\mathbf r;t)$ 来描述：`}</Tx>
        <Eq n="HIII-1" say="电场由标势的负梯度与矢势的时间变化率给出，磁场是矢势的旋度。">{R`\begin{cases}\mathbf E(\mathbf r;t)=-\boldsymbol\nabla ${U}(\mathbf r;t)-\dfrac\partial{\partial t}\mathbf A(\mathbf r;t)\\\mathbf B(\mathbf r;t)=\boldsymbol\nabla\times\mathbf A(\mathbf r;t)\end{cases}`}</Eq>
        <Tx>{R`由 Maxwell 方程可以证明这样的势总存在（附录 III §4-b），所以任何电磁场都能用势描述。但反过来，场给定后势**不唯一**。对任意函数 $\chi(\mathbf r;t)$ 作替换`}</Tx>
        <Eq n="HIII-2" keyEq title="规范变换" say="标势减去 $\chi$ 的时间导数、矢势加上 $\chi$ 的梯度：电场和磁场都不变，因为梯度的旋度为零，而两处 $\chi$ 的贡献在电场里互相抵消。">{R`\begin{aligned}${U}'(\mathbf r;t)&=${U}(\mathbf r;t)-\frac\partial{\partial t}\chi(\mathbf r;t)\\\mathbf A'(\mathbf r;t)&=\mathbf A(\mathbf r;t)+\boldsymbol\nabla\chi(\mathbf r;t)\end{aligned}`}</Eq>
        <Tx>{R`代回 \eqref{HIII-1} 即可验证：$\boldsymbol\nabla\times\boldsymbol\nabla\chi=0$，$\mathbf B$ 不变；$\mathbf E$ 中 $+\boldsymbol\nabla\partial_t\chi$ 与 $-\partial_t\boldsymbol\nabla\chi$ 抵消。还可以证明，描述同一电磁场的**全部**势都由 \eqref{HIII-2} 得到。

选定一组势叫**选定一个规范**；从一组换到另一组叫**规范变换**。同一个场有无穷多个规范。

**为什么这是个问题。**如果运动方程只含 $\mathbf E$、$\mathbf B$，势的不唯一无关紧要。麻烦在于量子力学偏偏是用势写的：第 III 章 \mainsec{B-5} 给带电粒子写 Schrödinger 方程（\mainref{B-48}）时，Hamilton 算符里出现的是 $\mathbf A$ 和 $${U}$。换一组势，Hamilton 算符就变了，解出来的波函数也变了。那么同一个实验，用两组势会不会算出两个不同的结果？要是会，理论就必须附带一句"本方程只在某某规范中成立"——而这样的规定在物理上找不到任何依据。

本节要证明不会：无论经典（§2）还是量子（§3），可观测的结果只依赖于场，势只是方便计算的中间量。这一性质称为**规范不变性**。`}</Tx>
      </Sub>

      <Sub n="HIII-2" title="Gauge invariance in classical mechanics" zh="经典力学：物理量与计算工具">
        <Tx>{R`（为简单起见只考虑单个粒子；推广到多粒子没有困难。）

**2-a 从 Newton 方程看：问题根本不出现。**电荷 $q$、质量 $m$ 的粒子在电磁场中受 Lorentz 力`}</Tx>
        <Eq n="HIII-3" say="Lorentz 力：电场力加上速度与磁场叉乘给出的磁场力。">{R`\mathbf f=q\left[\mathbf E(\mathbf r;t)+\mathbf v\times\mathbf B(\mathbf r;t)\right]`}</Eq>
        <Eq n="HIII-4" say="Newton 第二定律：质量乘加速度等于力。">{R`m\frac{\mathrm d^2}{\mathrm dt^2}\mathbf r(t)=\mathbf f`}</Eq>
        <Tx>{R`方程里只有场，轨道 $\mathbf r(t)$ 与速度 $\mathbf v(t)$ 当然与规范无关。

**2-b 从 Hamilton 形式看：势登场了。**附录 III 证明 Hamilton 方程与 Newton 方程等价；而第 III 章正是从 Hamilton 形式出发量子化的，所以必须看清规范变换在这一形式里的样子。这里势是**写方程必不可少的**，规范不变性就不那么一目了然了。

**$\nosym{\alpha}$. 基本动力学变量及其演化。**描述 Lorentz 力下的运动可以用 Lagrange 函数（以下分析力学结果不加证明地引自附录 III）`}</Tx>
        <Eq n="HIII-5" say="带电粒子的 Lagrange 函数：动能减去 $q$ 乘以“标势减速度点乘矢势”。">{R`\mathcal L(\mathbf r,\mathbf v;t)=\frac12m\mathbf v^2-q\left[${U}(\mathbf r;t)-\mathbf v\cdot\mathbf A(\mathbf r;t)\right]`}</Eq>
        <Tx>{R`由它求出的正则动量`}</Tx>
        <Eq n="HIII-6" say="正则动量是 Lagrange 函数对速度的梯度：机械动量加上 $q$ 乘矢势。">{R`\mathbf p=\boldsymbol\nabla_{\mathbf v}\mathcal L(\mathbf r,\mathbf v;t)=m\mathbf v+q\mathbf A(\mathbf r;t)`}</Eq>
        <Tx>{R`以及经典 Hamilton 函数`}</Tx>
        <Eq n="HIII-7" say="经典 Hamilton 函数：$(\mathbf p-q\mathbf A)^2/2m$ 加上 $q$ 乘标势。">{R`\mathcal H(\mathbf r,\mathbf p;t)=\frac1{2m}\left[\mathbf p-q\mathbf A(\mathbf r;t)\right]^2+q${U}(\mathbf r;t)`}</Eq>
        <Tx>{R`Hamilton 形式中，粒子某时刻的状态由**基本动力学变量** $\mathbf r$、$\mathbf p$ 刻画，而不再是 $\mathbf r$、$\mathbf v$。正则动量 $\mathbf p$ 不能与**机械动量**混淆：`}</Tx>
        <Eq n="HIII-8" say="机械动量就是质量乘速度。">{R`\boldsymbol\pi=m\mathbf v`}</Eq>
        <Eq n="HIII-9" keyEq title="机械动量与正则动量" say="机械动量等于正则动量减去 $q$ 乘矢势；有磁场时两者不同。">{R`\boldsymbol\pi=\mathbf p-q\mathbf A(\mathbf r;t)`}</Eq>
        <Tx>{R`已知 $\mathbf r$、$\mathbf p$ 就能由 \eqref{HIII-9} 算出 $\boldsymbol\pi$（从而速度）；动能、角动量等其他量也都写成 $\mathbf r$、$\mathbf p$（必要时还有 $t$）的函数。演化由 Hamilton 方程给出：`}</Tx>
        <Eq n="HIII-10" say="Hamilton 方程：位置的变化率是 $\mathcal H$ 对 $\mathbf p$ 的梯度，正则动量的变化率是 $\mathcal H$ 对 $\mathbf r$ 的负梯度。">{R`\begin{cases}\dfrac{\mathrm d}{\mathrm dt}\mathbf r(t)=\boldsymbol\nabla_{\mathbf p}\mathcal H[\mathbf r(t),\mathbf p(t);t]\\\dfrac{\mathrm d}{\mathrm dt}\mathbf p(t)=-\boldsymbol\nabla_{\mathbf r}\mathcal H[\mathbf r(t),\mathbf p(t);t]\end{cases}`}</Eq>
        <Box kind="warning" title="勘误：(HIII-10) 第二行的梯度变量">{R`原书第二行印作 $-\boldsymbol\nabla_{\mathbf v}\mathcal H$。$\mathcal H$ 是 $\mathbf r$、$\mathbf p$ 的函数，根本不含 $\mathbf v$；Hamilton 方程的第二式应是对**位置**求梯度 $-\boldsymbol\nabla_{\mathbf r}\mathcal H$（与第一式的 $\boldsymbol\nabla_{\mathbf p}$ 对称）。正文已改正。`}</Box>
        <Tx>{R`**换规范，动力学变量的值跟着变。**写 \eqref{HIII-10} 必须先选规范 $${J}$，即一对势 $\{${U}(\mathbf r,t),\mathbf A(\mathbf r;t)\}$。若改用描述同一场的规范 $${Jp}$（势 $${U}'$、$\mathbf A'$），同一个运动的动力学变量（记带撇）会怎样？Newton 方程已告诉我们位置与速度与规范无关：`}</Tx>
        <Eq n="HIII-11a" say="同一运动在两个规范中位置相同。">{R`\mathbf r'(t)=\mathbf r(t)`}</Eq>
        <Eq n="HIII-11b" say="同一运动在两个规范中机械动量相同。">{R`\boldsymbol\pi'(t)=\boldsymbol\pi(t)`}</Eq>
        <Tx>{R`但由 \eqref{HIII-9}，两个规范中的机械动量分别为`}</Tx>
        <Eq n="HIII-12" say="在两个规范中，机械动量分别等于各自的正则动量减去 $q$ 乘各自的矢势。">{R`\begin{aligned}\boldsymbol\pi(t)&=\mathbf p(t)-q\mathbf A[\mathbf r(t);t]\\\boldsymbol\pi'(t)&=\mathbf p'(t)-q\mathbf A'[\mathbf r(t);t]\end{aligned}`}</Eq>
        <Tx>{R`于是正则动量**必须**不同，以补偿矢势的差别：`}</Tx>
        <Eq n="HIII-13" say="两个规范中“正则动量减 $q$ 乘矢势”必须相等。">{R`\mathbf p'(t)-q\mathbf A'[\mathbf r'(t);t]=\mathbf p(t)-q\mathbf A[\mathbf r(t);t]`}</Eq>
        <Tx>{R`代入 \eqref{HIII-2}，从 $${J}$ 到 $${Jp}$ 的规范变换使基本动力学变量变为`}</Tx>
        <Eq n="HIII-14a" say="位置在规范变换下不变。">{R`\mathbf r'(t)=\mathbf r(t)`}</Eq>
        <Eq n="HIII-14b" keyEq title="正则动量随规范变化" say="正则动量在规范变换下增加 $q\boldsymbol\nabla\chi$（在粒子所在处取值）。">{R`\mathbf p'(t)=\mathbf p(t)+q\boldsymbol\nabla\chi\left[\mathbf r(t);t\right]`}</Eq>
        <Tx>{R`**在 Hamilton 形式中，描写同一运动的动力学变量在每一时刻的值依赖于所选规范。**这并不奇怪：势本来就显式地出现在 \eqref{HIII-7}、\eqref{HIII-10} 里。

**$\nosym{\beta}$. "真物理量"与"非物理量"。**

*(i) 定义。*由 \eqref{HIII-14a}–\eqref{HIII-14b} 可见，与粒子相关的量分两类：像 $\mathbf r$、$\boldsymbol\pi$ 那样在任意两个规范中每时每刻取值都相同的，以及像 $\mathbf p$ 那样取值依赖于规范的。于是定义：

• **真物理量**：（对给定的运动）任一时刻的值与描述电磁场所用的规范无关；

• **非物理量**：值随规范变换而改变——它和势一样只是计算工具，不是真正可观测的量。

问题是：Hamilton 形式中一切量都是 $\mathbf r$、$\mathbf p$ 的函数，怎样判断某个函数代表的是不是真物理量？

*(ii) 真物理量的特征关系。*从一个具体的困惑开始：动能该写成 $\mathbf p$ 的什么函数？若在所有规范里都写 $\mathbf p^2/2m$（一个**固定形式**的函数 $\mathcal F$），由于 $\mathbf p$ 的值随规范变，算出的"动能"也随规范变——这显然不是动能。正确的写法 $(\mathbf p-q\mathbf A)^2/2m$ 里含着势，**函数形式本身随规范而变**，而这种变化恰好补偿了 $\mathbf p$ 的变化。

所以一般的结论是：除了只依赖 $\mathbf r$ 的量，真物理量必须用"形式依赖于规范"的函数来描写，记作 $\mathcal G_{${J}}(\mathbf r,\mathbf p;t)$，下标提醒我们换规范时函数也要换（机械动量即是一例，应写作 $\boldsymbol\pi_{${J}}(\mathbf r,\mathbf p;t)$）。把定义 (i) 写成式子：同一个运动在两个规范中各用各的函数、各代各的变量，算出的值必须相同，`}</Tx>
        <Eq n="HIII-15" say="真物理量：在两个规范中，各自的函数在各自的动力学变量处取值相同。">{R`\mathcal G_{${J}}\left[\mathbf r(t),\mathbf p(t);t\right]=\mathcal G_{${Jp}}\left[\mathbf r'(t),\mathbf p'(t);t\right]`}</Eq>
        <Tx>{R`代入 \eqref{HIII-14a}–\eqref{HIII-14b}：`}</Tx>
        <Eq n="HIII-16" say="用规范变换下动力学变量的变换关系，把右边改写成原规范中变量的函数。">{R`\mathcal G_{${J}}\left[\mathbf r(t),\mathbf p(t);t\right]=\mathcal G_{${Jp}}\left[\mathbf r(t),\mathbf p(t)+q\boldsymbol\nabla\chi(\mathbf r(t);t);t\right]`}</Eq>
        <Tx>{R`它必须对每一时刻、每一种可能的运动都成立；而固定 $t$ 时 $\mathbf r$、$\mathbf p$ 可以独立任意取值，所以两边必须是 $\mathbf r$、$\mathbf p$ 的**同一个函数**：`}</Tx>
        <Eq n="HIII-17" keyEq title="真物理量的特征关系" say="真物理量的判据：把新规范中的函数里的 $\mathbf p$ 换成 $\mathbf p+q\boldsymbol\nabla\chi$，必须恰好得到原规范中的函数。">{R`\mathcal G_{${J}}\left[\mathbf r,\mathbf p;t\right]=\mathcal G_{${Jp}}\left[\mathbf r,\mathbf p+q\boldsymbol\nabla\chi(\mathbf r;t);t\right]`}</Eq>
        <Tx>{R`操作上：拿 $${Jp}$ 中的函数，把 $\mathbf p$ 换成 $\mathbf p+q\boldsymbol\nabla\chi(\mathbf r;t)$，得到的新函数必须与 $${J}$ 中的函数完全一样；否则就不是真物理量。

*(iii) 例子。*位置（函数就是 $\mathbf r$）与机械动量是两个真物理量，后者在规范 $${J}$ 中为`}</Tx>
        <Eq n="HIII-18" say="规范 $\mathcal J$ 中机械动量作为 $\mathbf r$、$\mathbf p$ 的函数。">{R`\boldsymbol\pi_{${J}}(\mathbf r,\mathbf p;t)=\mathbf p-q\mathbf A(\mathbf r;t)`}</Eq>
        <Tx>{R`我们已知它们满足 \eqref{HIII-17}，但直接验证一次能熟悉这条判据。对 $\mathbf r$：函数不含 $\mathbf p$、形式也不依赖规范，\eqref{HIII-17} 自动成立（一般地，任何只依赖 $\mathbf r$（和 $t$）且形式与规范无关的函数都描述真物理量）。对 $\boldsymbol\pi$：在 $${Jp}$ 中`}</Tx>
        <Eq n="HIII-19" say="规范 $\mathcal J'$ 中机械动量作为 $\mathbf r$、$\mathbf p$ 的函数，用的是新矢势。">{R`\boldsymbol\pi_{${Jp}}(\mathbf r,\mathbf p;t)=\mathbf p-q\mathbf A'(\mathbf r;t)`}</Eq>
        <Tx>{R`把 $\mathbf p$ 换成 $\mathbf p+q\boldsymbol\nabla\chi$，并用 \eqref{HIII-2}：`}</Tx>
        <Eq n="HIII-20" say="代换后 $q\boldsymbol\nabla\chi$ 项恰好抵消矢势之差，得到原规范中的机械动量函数。">{R`\mathbf p+q\boldsymbol\nabla\chi(\mathbf r;t)-q\mathbf A'(\mathbf r;t)=\mathbf p-q\mathbf A(\mathbf r;t)`}</Eq>
        <Tx>{R`正是 $\boldsymbol\pi_{${J}}$，判据满足。另外两个真物理量是动能`}</Tx>
        <Eq n="HIII-21" say="动能作为 $\mathbf r$、$\mathbf p$ 的函数：$(\mathbf p-q\mathbf A)^2/2m$，是真物理量。">{R`\gamma_{${J}}(\mathbf r,\mathbf p;t)=\frac1{2m}\left[\mathbf p-q\mathbf A(\mathbf r;t)\right]^2`}</Eq>
        <Tx>{R`和机械动量对原点的矩：`}</Tx>
        <Eq n="HIII-22" say="机械动量对原点的矩：$\mathbf r$ 叉乘 $(\mathbf p-q\mathbf A)$，是真物理量。">{R`\boldsymbol\lambda_{${J}}(\mathbf r,\mathbf p;t)=\mathbf r\times\left[\mathbf p-q\mathbf A(\mathbf r;t)\right]`}</Eq>
        <Box kind="warning" title="勘误：(HIII-22) 多了一个平方">{R`原书印作 $\mathbf r\times[\mathbf p-q\mathbf A(\mathbf r;t)]^2$。叉乘的右因子必须是矢量，而 $[\mathbf p-q\mathbf A]^2$ 是标量；"机械动量的矩"应为 $\mathbf r\times\boldsymbol\pi=\mathbf r\times[\mathbf p-q\mathbf A]$，与后文量子版本 \eqref{HIII-32} 的 $\boldsymbol\Lambda_{${J}}=\mathbf R\times[\mathbf P-q\mathbf A]$ 一致。正文已删去多余的平方。`}</Box>
        <Tx>{R`一般地，只要函数具有形式`}</Tx>
        <Eq n="HIII-23" keyEq title="构造真物理量的通用形式" say="只要一个量能写成 $\mathbf r$ 与 $\mathbf p-q\mathbf A$ 的函数、且这个函数形式与规范无关，它就是真物理量。">{R`\mathcal G_{${J}}(\mathbf r,\mathbf p;t)=${FG}\left[\mathbf r,\mathbf p-q\mathbf A(\mathbf r;t)\right]`}</Eq>
        <Tx>{R`（$${FG}$ 的形式与规范 $${J}$ 无关），它就代表真物理量——这很合理，因为它的值由规范不变的 $\mathbf r$ 与 $\boldsymbol\pi$ 决定。（也能构造势以更复杂方式出现的真物理量，例如粒子速度与所在处电场的点积。）

**反例**。除 $\mathbf p$ 本身外，函数`}</Tx>
        <Eq n="HIII-24" say="正则动量平方除以 $2m$：不是动能，也不是真物理量。">{R`\mathcal C(\mathbf p)=\frac{\mathbf p^2}{2m}`}</Eq>
        <Tx>{R`就不能与 \eqref{HIII-21} 的动能混淆；一般地，任何只依赖 $\mathbf p$（和 $t$）的函数都不是真物理量。同样，角动量`}</Tx>
        <Eq n="HIII-25" say="正则角动量 $\mathbf r\times\mathbf p$ 依赖于规范，不是真物理量。">{R`${LA}(\mathbf r,\mathbf p)=\mathbf r\times\mathbf p`}</Eq>
        <Tx>{R`也不是真物理量。最后是经典 Hamilton 函数 \eqref{HIII-7}：它是动能 $\gamma_{${J}}$（真物理量）加势能 $q${U}$；而后者（严格说应写成依赖规范的 $${U}_{${J}}(\mathbf r;t)$）在空间每一点的值都随规范而变，不是真物理量。所以**一般情形下 Hamilton 函数不是真物理量**。`}</Tx>
      </Sub>

      <Sub n="HIII-3" title="Gauge invariance in quantum mechanics" zh="量子力学：态矢跟着规范变，预言不变">
        <Tx>{R`**难点在哪。**经典情形有 Newton 方程兜底：它不含势，规范无关性一眼可见。量子力学没有这样的"后门"——第 III 章的量子化本来就是从含势的 Hamilton 形式出发的。所以必须正面回答：第 III 章的假设在**任意**规范中都成立吗？

**策略：逐项模仿 §2。**经典部分已经告诉我们规范变换在 Hamilton 形式中长什么样，量子部分只需把每一项翻译过来。下表就是本小节的提纲，三个子小节依次填满它：`}</Tx>
        <div className="tb-table-wrap"><table className="tb-table"><thead><tr><th></th><th>经典 Hamilton 形式（§2）</th><th>量子力学（§3）</th></tr></thead><tbody>
          <tr><td>基本变量</td><td><TxI>{R`$\mathbf r$、$\mathbf p$ 的值随规范变：$\mathbf p'=\mathbf p+q\boldsymbol\nabla\chi$`}</TxI></td><td><TxI>{R`算符 $\mathbf R$、$\mathbf P$ 在一切规范中相同（3-a）；**态矢**随规范变：$\ket{\psi'}=T_\chi\ket\psi$（3-b）`}</TxI></td></tr>
          <tr><td>运动方程</td><td>Hamilton 方程形式不变</td><td>Schrödinger 方程形式不变（3-b）</td></tr>
          <tr><td>真物理量</td><td><TxI>{R`$\mathcal G_{${J}}[\mathbf r,\mathbf p]=\mathcal G_{${Jp}}[\mathbf r,\mathbf p+q\boldsymbol\nabla\chi]$`}</TxI></td><td><TxI>{R`$\tilde G_{${J}}=G_{${Jp}}$；本征值、概率、密度、流都不变（3-c）`}</TxI></td></tr>
        </tbody></table></div>

        <Tx>{R`**3-a 量子化规则。**先问最基本的：$\mathbf r$、$\mathbf p$ 对应的算符会不会随规范变？不会。态空间始终是 $\mathscr E_{\mathbf r}$，而量子化规则只要求`}</Tx>
        <Eq n="HIII-26" say="位置与正则动量算符同一分量的对易子为 $i\hbar$。">{R`[X,P_x]=[Y,P_y]=[${ZZ},P_z]=i\hbar`}</Eq>
        <Tx>{R`（其余分量两两对易），在 $\{\ket{\mathbf r}\}$ 表象中就是"$\mathbf R$ 乘以 $\mathbf r$、$\mathbf P$ 作用为 $\frac\hbar i\boldsymbol\nabla$"——这里没有一处提到势。所以在任意两个规范中：`}</Tx>
        <Eq n="HIII-27a" say="位置算符在所有规范中相同。">{R`\mathbf R_{${Jp}}=\mathbf R_{${J}}`}</Eq>
        <Eq n="HIII-27b" say="正则动量算符在所有规范中相同。">{R`\mathbf P_{${Jp}}=\mathbf P_{${J}}`}</Eq>
        <Tx>{R`既然如此，下面 $\mathbf R$、$\mathbf P$ 不再写下标。其他量就不一定了：量子化的做法是取该量在**某个规范中**的经典表达式（$\mathbf r$、$\mathbf p$ 的函数，必要时对称化），再把 $\mathbf r,\mathbf p$ 换成 $\mathbf R,\mathbf P$——表达式里只要含势，得到的算符就带着规范的印记，所以记作 $G_{${J}}$ 之类。逐个看：

• 由 $\mathbf r\times\mathbf p$ 得到的角动量算符在所有规范中相同：`}</Tx>
        <Eq n="HIII-28" say="正则角动量算符在所有规范中相同。">{R`\mathbf L_{${Jp}}=\mathbf L_{${J}}`}</Eq>
        <Tx>{R`• 机械动量的算符则依赖规范：`}</Tx>
        <Eq n="HIII-29" say="规范 $\mathcal J$ 中的机械动量算符：$\mathbf P$ 减去 $q$ 乘以 $\mathbf R$ 处的矢势。">{R`\boldsymbol\Pi_{${J}}=\mathbf P-q\mathbf A(\mathbf R;t)`}</Eq>
        <Eq n="HIII-30" say="换到规范 $\mathcal J'$ 后，机械动量算符换成新矢势。">{R`\boldsymbol\Pi_{${Jp}}=\mathbf P-q\mathbf A'(\mathbf R;t)`}</Eq>
        <Tx>{R`它在 $\mathscr E_{\mathbf r}$ 中的作用与 $\boldsymbol\Pi_{${J}}$ 不同：`}</Tx>
        <Eq n="HIII-31" say="两个规范的机械动量算符相差 $q\boldsymbol\nabla\chi(\mathbf R;t)$。">{R`\boldsymbol\Pi_{${Jp}}=\boldsymbol\Pi_{${J}}-q\boldsymbol\nabla\chi(\mathbf R;t)`}</Eq>
        <Tx>{R`• 机械动量的矩也显含所选的矢势（利用 $\mathbf R$ 与 $\boldsymbol\Pi_{${J}}$ 的对易关系可以验证 \eqref{HIII-32} 无须对称化）：`}</Tx>
        <Eq n="HIII-32" say="机械动量的矩算符：$\mathbf R$ 叉乘 $(\mathbf P-q\mathbf A)$。">{R`\boldsymbol\Lambda_{${J}}=\mathbf R\times\boldsymbol\Pi_{${J}}=\mathbf R\times\left[\mathbf P-q\mathbf A(\mathbf R;t)\right]`}</Eq>
        <Tx>{R`• Hamilton 算符由 \eqref{HIII-7} 得到：`}</Tx>
        <Eq n="HIII-33" keyEq title="带电粒子的 Hamilton 算符" say="规范 $\mathcal J$ 中的 Hamilton 算符：$(\mathbf P-q\mathbf A)^2/2m$ 加上 $q$ 乘标势。">{R`H_{${J}}=\frac1{2m}\left[\mathbf P-q\mathbf A(\mathbf R;t)\right]^2+q${U}(\mathbf R;t)`}</Eq>
        <Tx>{R`换个规范，它显然是另一个算符：`}</Tx>
        <Eq n="HIII-34" say="在新规范中 Hamilton 算符换成新的势，一般与原来的 Hamilton 算符不同。">{R`H_{${Jp}}=\frac1{2m}\left[\mathbf P-q\mathbf A'(\mathbf R;t)\right]^2+q${U}'(\mathbf R;t)\ne H_{${J}}`}</Eq>

        <Tx>{R`**3-b 态矢的幺正变换；Schrödinger 方程的形式不变。**

**$\nosym{\alpha}$. 幺正算符 $T_\chi(t)$。**经典中两个规范里的动力学变量是 $\{\mathbf r(t),\mathbf p(t)\}$ 与 $\{\mathbf r'(t),\mathbf p'(t)\}$；量子中相应地记两个规范的态矢为 $\ket{\psi(t)}$、$\ket{\psi'(t)}$。\eqref{HIII-14a}–\eqref{HIII-14b} 的量子对应是平均值之间的关系：`}</Tx>
        <Eq n="HIII-35a" say="两个规范中位置的平均值相同。">{R`\braket{\psi'(t)|\mathbf R_{${Jp}}|\psi'(t)}=\braket{\psi(t)|\mathbf R_{${J}}|\psi(t)}`}</Eq>
        <Eq n="HIII-35b" say="新规范中正则动量的平均值，等于原规范中 $\mathbf P+q\boldsymbol\nabla\chi$ 的平均值。">{R`\braket{\psi'(t)|\mathbf P_{${Jp}}|\psi'(t)}=\braket{\psi(t)|\mathbf P_{${J}}+q\boldsymbol\nabla\chi(\mathbf R;t)|\psi(t)}`}</Eq>
        <Tx>{R`由 \eqref{HIII-27a}–\eqref{HIII-27b}，算符两边相同，所以 \eqref{HIII-35b} 只可能在 $\ket{\psi(t)}$ 与 $\ket{\psi'(t)}$ **是不同右矢**时成立。找一个幺正变换把一个变成另一个：`}</Tx>
        <Eq n="HIII-36a" say="新规范的态矢由幺正算符 $T_\chi$ 作用于原规范的态矢得到。">{R`\ket{\psi'(t)}=T_\chi(t)\ket{\psi(t)}`}</Eq>
        <Eq n="HIII-36b" say="$T_\chi$ 是幺正算符。">{R`T_\chi^\dagger(t)T_\chi(t)=T_\chi(t)T_\chi^\dagger(t)=\mathbb 1`}</Eq>
        <Tx>{R`要使 \eqref{HIII-35a}–\eqref{HIII-35b} 对**任意** $\ket{\psi(t)}$ 成立，只需`}</Tx>
        <Eq n="HIII-37a" say="经 $T_\chi$ 变换后位置算符不变。">{R`T_\chi^\dagger(t)\mathbf R\,T_\chi(t)=\mathbf R`}</Eq>
        <Eq n="HIII-37b" say="经 $T_\chi$ 变换后正则动量算符增加 $q\boldsymbol\nabla\chi$。">{R`T_\chi^\dagger(t)\mathbf P\,T_\chi(t)=\mathbf P+q\boldsymbol\nabla\chi(\mathbf R;t)`}</Eq>
        <Tx>{R`**解出 $T_\chi$。**\eqref{HIII-37a} 左乘 $T_\chi$：`}</Tx>
        <Eq n="HIII-38" say="$T_\chi$ 与位置算符的三个分量都对易。">{R`\mathbf R\,T_\chi(t)=T_\chi(t)\mathbf R`}</Eq>
        <Tx>{R`与 $\mathbf R$ 的三个分量都对易的幺正算符只能是 $\mathbf R$ 的函数，可写成`}</Tx>
        <Eq n="HIII-39" say="与 $\mathbf R$ 对易的幺正算符可以写成 $i$ 乘一个 $\mathbf R$ 的厄米函数的指数。">{R`T_\chi(t)=\mathrm e^{i${FF}(\mathbf R;t)}`}</Eq>
        <Tx>{R`$${FF}(\mathbf R;t)$ 为厄米算符。由 \IIc{BII} 的 (48)（$[\mathbf P,f(\mathbf R)]=\frac\hbar i\boldsymbol\nabla f$）：`}</Tx>
        <Eq n="HIII-40" say="$\mathbf P$ 与 $T_\chi$ 的对易子等于 $\hbar$ 乘 $F$ 的梯度再乘 $T_\chi$。">{R`[\mathbf P,T_\chi(t)]=\hbar\boldsymbol\nabla\{${FF}(\mathbf R;t)\}T_\chi(t)`}</Eq>
        <Tx>{R`左乘 $T_\chi^\dagger$ 得 $T_\chi^\dagger\mathbf PT_\chi=\mathbf P+\hbar\boldsymbol\nabla${FF}$，与 \eqref{HIII-37b} 对比：`}</Tx>
        <Eq n="HIII-41" say="$F$ 的梯度乘 $\hbar$ 必须等于 $q$ 乘 $\chi$ 的梯度。">{R`\hbar\boldsymbol\nabla\{${FF}(\mathbf R;t)\}=q\boldsymbol\nabla\chi(\mathbf R;t)`}</Eq>
        <Eq n="HIII-42" say="$F$ 等于 $q\chi/\hbar$ 加上一个只依赖时间的函数 $F_0(t)$。">{R`${FF}(\mathbf R;t)=F_0(t)+\frac q\hbar\chi(\mathbf R;t)`}</Eq>
        <Tx>{R`$F_0(t)$ 对 $\ket{\psi'(t)}$ 只贡献一个整体相位，没有物理后果，略去：`}</Tx>
        <Eq n="HIII-43" keyEq title="规范变换的幺正算符" say="规范变换在量子力学中由幺正算符 $\mathrm e^{iq\chi(\mathbf R,t)/\hbar}$ 实现。">{R`T_\chi(t)=\mathrm e^{i\frac q\hbar\chi(\mathbf R;t)}`}</Eq>
        <Tx>{R`以它代入 \eqref{HIII-36a}，\eqref{HIII-35a}–\eqref{HIII-35b} 自动满足。

**在 $\{\ket{\mathbf r}\}$ 表象中**，\eqref{HIII-36a}、\eqref{HIII-43} 说的是：`}</Tx>
        <Eq n="HIII-44" keyEq title="波函数的规范变换" say="规范变换使波函数乘上一个随位置变化的相因子 $\mathrm e^{iq\chi(\mathbf r,t)/\hbar}$：这不是整体相位。">{R`\psi'(\mathbf r,t)=\mathrm e^{i\frac q\hbar\chi(\mathbf r,t)}\psi(\mathbf r,t)`}</Eq>
        <Tx>{R`**对波函数而言，规范变换是一个随位置变化的相位**，不是整体相位因子。所以用 $\psi$ 还是 $\psi'$ 算出的预言是否相同，事先并不显然——这正是下面要证明的。若体系由位置 $\mathbf r_1,\mathbf r_2,\dots$、电荷 $q_1,q_2,\dots$ 的若干粒子组成，\eqref{HIII-43} 换成各粒子算符之积：`}</Tx>
        <Eq n="HIII-45" say="多粒子体系的规范变换算符是各粒子变换算符之积，总相位是各粒子 $q_i\chi(\mathbf R_i,t)/\hbar$ 之和。">{R`\begin{aligned}T_\chi(t)&=T_\chi^{(1)}(t)\,T_\chi^{(2)}(t)...\\&=\mathrm e^{\frac i\hbar[q_1\chi(\mathbf R_1,t)+q_2\chi(\mathbf R_2,t)+...]}\end{aligned}`}</Eq>
        <Box kind="warning" title="勘误：(HIII-45) 的上标">{R`原书第一行第二个因子印作 $T_\chi^2(t)$，应为第二个粒子的算符 $T_\chi^{(2)}(t)$（与第一个因子 $T_\chi^{(1)}$ 同一记法），不是平方。正文已改正。`}</Box>
        <Tx>{R`**$\nosym{\beta}$. 态矢的演化。**设在规范 $${J}$ 中`}</Tx>
        <Eq n="HIII-46" say="原规范中的 Schrödinger 方程。">{R`i\hbar\frac{\mathrm d}{\mathrm dt}\ket{\psi(t)}=H_{${J}}(t)\ket{\psi(t)}`}</Eq>
        <Tx>{R`要证明 $\ket{\psi'(t)}=T_\chi\ket{\psi(t)}$ 在规范 $${Jp}$ 中满足**同样形式**的方程：`}</Tx>
        <Eq n="HIII-47" say="新规范中的 Schrödinger 方程，形式与原规范相同，只是用新规范的 Hamilton 算符。">{R`i\hbar\frac{\mathrm d}{\mathrm dt}\ket{\psi'(t)}=H_{${Jp}}(t)\ket{\psi'(t)}`}</Eq>
        <Tx>{R`其中 $H_{${Jp}}$ 由 \eqref{HIII-34} 给出。从左边算起：`}</Tx>
        <Eq n="HIII-48" say="对变换后的态求时间导数，两项分别来自 $T_\chi$ 与原态的时间依赖。">{R`\begin{aligned}i\hbar\frac{\mathrm d}{\mathrm dt}\ket{\psi'(t)}&=i\hbar\frac{\mathrm d}{\mathrm dt}\{T_\chi(t)\ket{\psi(t)}\}\\&=i\hbar\left\{\frac{\mathrm d}{\mathrm dt}T_\chi(t)\right\}\ket{\psi(t)}+i\hbar T_\chi(t)\frac{\mathrm d}{\mathrm dt}\ket{\psi(t)}\end{aligned}`}</Eq>
        <Tx>{R`$\chi(\mathbf R,t)$ 只依赖 $\mathbf R$，与 $\partial_t\chi(\mathbf R;t)$ 对易，所以 $T_\chi$ 可以像普通函数那样对时间求导（\IIc{BII-5} 的注释）：$i\hbar\dot T_\chi=-q(\partial_t\chi)T_\chi$。再用 \eqref{HIII-46}：`}</Tx>
        <Eq n="HIII-49" say="$T_\chi$ 的时间导数贡献 $-q\partial_t\chi$；原态的演化贡献变换后的 Hamilton 算符。">{R`\begin{aligned}i\hbar\frac{\mathrm d}{\mathrm dt}\ket{\psi'(t)}&=-q\left\{\frac\partial{\partial t}\chi(\mathbf R;t)\right\}T_\chi(t)\ket{\psi(t)}+T_\chi(t)H_{${J}}(t)\ket{\psi(t)}\\&=\left\{-q\frac\partial{\partial t}\chi(\mathbf R;t)+\tilde H_{${J}}(t)\right\}\ket{\psi'(t)}\end{aligned}`}</Eq>
        <Tx>{R`$\tilde H_{${J}}$ 表示 $H_{${J}}$ 经 $T_\chi$ 变换后的算符：`}</Tx>
        <Eq n="HIII-50" say="原 Hamilton 算符经 $T_\chi$ 幺正变换后的算符。">{R`\tilde H_{${J}}(t)=T_\chi(t)H_{${J}}(t)T_\chi^\dagger(t)`}</Eq>
        <Tx>{R`所以只要证明`}</Tx>
        <Eq n="HIII-51" keyEq title="Hamilton 算符的变换规律" say="新规范的 Hamilton 算符等于原 Hamilton 算符的幺正变换减去 $q\partial_t\chi$：多出的这一项来自变换本身的时间依赖。">{R`H_{${Jp}}(t)=\tilde H_{${J}}(t)-q\frac\partial{\partial t}\chi(\mathbf R;t)`}</Eq>
        <Tx>{R`而幺正变换保持算符的函数关系：`}</Tx>
        <Eq n="HIII-52" say="变换后的 Hamilton 算符是把原式中的 $\mathbf R$、$\mathbf P$ 换成变换后的 $\tilde{\mathbf R}$、$\tilde{\mathbf P}$。">{R`\tilde H_{${J}}(t)=\frac1{2m}\left[\tilde{\mathbf P}-q\mathbf A(\tilde{\mathbf R};t)\right]^2+q${U}(\tilde{\mathbf R};t)`}</Eq>
        <Tx>{R`其中 $\tilde{\mathbf R}$、$\tilde{\mathbf P}$ 是 $\mathbf R$、$\mathbf P$ 经 $T_\chi$ 的变换。由 \eqref{HIII-37a}–\eqref{HIII-37b}（注意这里的方向是 $T_\chi\cdots T_\chi^\dagger$，所以符号相反）：`}</Tx>
        <Eq n="HIII-53a" say="位置算符在变换下不变。">{R`\tilde{\mathbf R}=T_\chi(t)\mathbf R\,T_\chi^\dagger(t)=\mathbf R`}</Eq>
        <Eq n="HIII-53b" say="正则动量算符在变换下减去 $q\boldsymbol\nabla\chi$。">{R`\tilde{\mathbf P}=T_\chi(t)\mathbf P\,T_\chi^\dagger(t)=\mathbf P-q\boldsymbol\nabla\chi(\mathbf R;t)`}</Eq>
        <Tx>{R`代入 \eqref{HIII-52}：`}</Tx>
        <Eq n="HIII-54" say="代入后，变换后的 Hamilton 算符中矢势被 $\mathbf A+\boldsymbol\nabla\chi$ 取代，标势不变。">{R`\tilde H_{${J}}(t)=\frac1{2m}\left[\mathbf P-q\mathbf A(\mathbf R;t)-q\boldsymbol\nabla\chi(\mathbf R;t)\right]^2+q${U}(\mathbf R;t)`}</Eq>
        <Tx>{R`方括号里正是 $\mathbf P-q\mathbf A'$；而 $q${U}=q${U}'+q\partial_t\chi$。于是 $\tilde H_{${J}}=H_{${Jp}}+q\partial_t\chi$，即 \eqref{HIII-51}。**Schrödinger 方程在任何规范中都写成同样的形式。**`}</Tx>

        <Tx>{R`**3-c 物理预言的规范不变性。**

**$\nosym{\alpha}$. 可观测量的变换。**在 $T_\chi$ 作用下，任一可观测量 $K$ 变为`}</Tx>
        <Eq n="HIII-55" say="可观测量在规范变换下按 $T_\chi$ 作幺正变换。">{R`\tilde K=T_\chi(t)\,K\,T_\chi^\dagger(t)`}</Eq>
        <Tx>{R`\eqref{HIII-53a}–\eqref{HIII-53b} 已显示 $\tilde{\mathbf R}=\mathbf R$ 而 $\tilde{\mathbf P}\ne\mathbf P$。机械动量呢？`}</Tx>
        <Eq n="HIII-56" say="机械动量算符变换后减去 $q\boldsymbol\nabla\chi$。">{R`\begin{aligned}\tilde{\boldsymbol\Pi}_{${J}}&=\tilde{\mathbf P}-q\mathbf A(\tilde{\mathbf R};t)\\&=\mathbf P-q\boldsymbol\nabla\chi(\mathbf R;t)-q\mathbf A(\mathbf R;t)\\&=\boldsymbol\Pi_{${J}}-q\boldsymbol\nabla\chi(\mathbf R;t)\end{aligned}`}</Eq>
        <Tx>{R`对照 \eqref{HIII-27a} 与 \eqref{HIII-31}：两个真物理量（位置与机械动量）的算符满足`}</Tx>
        <Eq n="HIII-57" say="真物理量的算符经变换后，恰好等于新规范中同一物理量的算符。">{R`\begin{cases}\tilde{\mathbf R}_{${J}}=\mathbf R_{${Jp}}\\\tilde{\boldsymbol\Pi}_{${J}}=\boldsymbol\Pi_{${Jp}}\end{cases}`}</Eq>
        <Tx>{R`而不是真物理量的正则动量没有这样的关系（由 \eqref{HIII-27b}、\eqref{HIII-53b}）：`}</Tx>
        <Eq n="HIII-58" say="正则动量变换后不等于新规范中的正则动量：它不是真物理量。">{R`\tilde{\mathbf P}_{${J}}\ne\mathbf P_{${Jp}}`}</Eq>
        <Tx>{R`这是一个普遍规律：**量子力学中，每个真物理量都有一个算符 $G_{${J}}(t)$ 满足**`}</Tx>
        <Eq n="HIII-59" keyEq title="真物理量的量子判据" say="真物理量的算符随规范“协变”：把它做规范幺正变换，就得到新规范中同一物理量的算符。">{R`\tilde G_{${J}}=G_{${Jp}}(t)`}</Eq>
        <Tx>{R`这是经典关系 \eqref{HIII-16} 的量子对应。它也说明：除 $\mathbf R$ 及其函数外，**真物理量的算符依赖于规范 $${J}$**（例如 \eqref{HIII-29}、\eqref{HIII-32}）。

**证明。**对函数 $\mathcal G_{${J}}(\mathbf r,\mathbf p;t)$ 用第 III 章的量子化规则：$\mathbf r,\mathbf p\to\mathbf R,\mathbf P$（必要时对称化），得算符 $G_{${J}}(t)$；函数形式依赖规范，算符也依赖规范。若它是真物理量，由 \eqref{HIII-17}：`}</Tx>
        <Eq n="HIII-60" say="把经典特征关系中的 $\mathbf r$、$\mathbf p$ 换成算符 $\mathbf R$、$\mathbf P$。">{R`\mathcal G_{${J}}[\mathbf R,\mathbf P;t]=\mathcal G_{${Jp}}[\mathbf R,\mathbf P+q\boldsymbol\nabla\chi(\mathbf R;t);t]`}</Eq>
        <Tx>{R`对它施加幺正变换 $T_\chi$（变换保持函数关系）：`}</Tx>
        <Eq n="HIII-61" say="对两边做规范幺正变换，函数里的算符都换成变换后的算符。">{R`\begin{aligned}\tilde{\mathcal G}_{${J}}[\mathbf R,\mathbf P;t]&=\tilde{\mathcal G}_{${Jp}}[\mathbf R,\mathbf P+q\boldsymbol\nabla\chi(\mathbf R;t);t]\\&=\mathcal G_{${Jp}}[\tilde{\mathbf R},\tilde{\mathbf P}+q\boldsymbol\nabla\chi(\tilde{\mathbf R};t);t]\end{aligned}`}</Eq>
        <Tx>{R`由 \eqref{HIII-53a}–\eqref{HIII-53b}，$\tilde{\mathbf R}=\mathbf R$，$\tilde{\mathbf P}+q\boldsymbol\nabla\chi=\mathbf P$：`}</Tx>
        <Eq n="HIII-62" say="变换后的真物理量算符等于新规范中的同一函数，于是得到 \eqref{HIII-59}。">{R`\tilde{\mathcal G}_{${J}}[\mathbf R,\mathbf P;t]=\mathcal G_{${Jp}}[\mathbf R,\mathbf P;t]`}</Eq>
        <Tx>{R`（必要时把两边对称化）这就是 \eqref{HIII-59}。

真物理可观测量的例子：除 $\mathbf R$、$\boldsymbol\Pi_{${J}}$ 外，还有机械动量的矩 $\boldsymbol\Lambda_{${J}}$（\eqref{HIII-32}）与动能`}</Tx>
        <Eq n="HIII-63" say="动能算符：机械动量平方除以 $2m$，是真物理可观测量。">{R`\Gamma_{${J}}=\frac{\boldsymbol\Pi_{${J}}^2}{2m}=\frac1{2m}[\mathbf P-q\mathbf A(\mathbf R;t)]^2`}</Eq>
        <Tx>{R`反之，$\mathbf P$、$\mathbf L$ 不是真物理量；Hamilton 算符一般也不是，因为由 \eqref{HIII-51}：`}</Tx>
        <Eq n="HIII-64" say="一般情形下，变换后的 Hamilton 算符不等于新规范的 Hamilton 算符：$H$ 不是真物理量。">{R`\tilde H_{${J}}(t)\ne H_{${Jp}}(t)`}</Eq>
        <Box kind="note" title="何时 H 就是总能量">
          <Tx>{R`经典上，粒子在**不含时**电磁场中运动，总能量是运动常量。此时可以只用同样不含时的势（于是 $\partial_t\chi=0$），由 \eqref{HIII-51}：`}</Tx>
          <Eq n="HIII-65" say="在不含时的规范之间变换时，Hamilton 算符满足真物理量的判据。">{R`\tilde H_{${J}}=H_{${Jp}}`}</Eq>
          <Tx>{R`这种特殊情形下 $H_{${J}}$ 是真物理可观测量，可以解释为粒子的总能量。`}</Tx>
        </Box>
        <Tx>{R`**$\nosym{\beta}$. 测量真物理量的结果与概率。**设在 $t$ 时刻测量一个真物理量。（以下各量都在测量时刻取值，略去 $t$。）规范 $${J}$ 中，态为 $\ket\psi$，可观测量为 $G_{${J}}$；设 $\ket{\varphi_n}$ 是它的本征矢，本征值 $${gn}$（为简单起见设非简并）：`}</Tx>
        <Eq n="HIII-66" say="规范 $\mathcal J$ 中真物理量算符的本征方程，本征值为 $g_n$。">{R`G_{${J}}\ket{\varphi_n}=${gn}\ket{\varphi_n}`}</Eq>
        <Tx>{R`按第 III 章的假设，在规范 $${J}$ 中测得 $${gn}$ 的概率为`}</Tx>
        <Eq n="HIII-67" say="规范 $\mathcal J$ 中测得 $g_n$ 的概率是本征矢与态的内积模方。">{R`\mathcal P_n=|\braket{\varphi_n|\psi}|^2`}</Eq>
        <Tx>{R`换到规范 $${Jp}$：由 \eqref{HIII-59}，算符 $G_{${Jp}}$ 有本征矢`}</Tx>
        <Eq n="HIII-68" say="新规范中的本征矢是原本征矢经 $T_\chi$ 变换得到的。">{R`\ket{\varphi_n'}=T_\chi\ket{\varphi_n}`}</Eq>
        <Tx>{R`本征值仍是 $${gn}$：`}</Tx>
        <Eq n="HIII-69" say="变换后的本征矢是新规范算符的本征矢，本征值不变。">{R`\begin{aligned}G_{${Jp}}\ket{\varphi_n'}&=T_\chi\,G_{${J}}\,T_\chi^\dagger T_\chi\ket{\varphi_n}\\&=T_\chi\,${gn}\ket{\varphi_n}=${gn}\ket{\varphi_n'}\end{aligned}`}</Eq>
        <Tx>{R`所以在 $${Jp}$ 中 $${gn}$ 仍是可能的测量结果；而相应的概率幅由 \eqref{HIII-36a}、\eqref{HIII-68}：`}</Tx>
        <Eq n="HIII-70" say="由于 $T_\chi$ 幺正，新规范中的概率幅与原规范完全相同。">{R`\braket{\varphi_n'|\psi'}=\braket{\varphi_n|T_\chi^\dagger T_\chi|\psi}=\braket{\varphi_n|\psi}`}</Eq>
        <Tx>{R`概率相同。**量子力学的假设给出规范不变的物理预言**：任何测量的可能结果及其概率都不随规范变换而变。

**$\nosym{\gamma}$. 概率密度与概率流。**由第 III 章的 \mainref{D-9} 与 \mainref{D-20}，在规范 $${J}$ 中`}</Tx>
        <Eq n="HIII-71" say="规范 $\mathcal J$ 中的概率密度是波函数的模方。">{R`${RH}(\mathbf r,t)=|\psi(\mathbf r,t)|^2`}</Eq>
        <Eq n="HIII-72" keyEq title="有矢势时的概率流" say="有矢势时，概率流用机械动量 $\frac\hbar i\boldsymbol\nabla-q\mathbf A$ 而不是正则动量来构造。">{R`\mathbf J(\mathbf r,t)=\frac1m\mathrm{Re}\left\{\psi^*(\mathbf r,t)\left[\frac\hbar i\boldsymbol\nabla-q\mathbf A(\mathbf r;t)\right]\psi(\mathbf r,t)\right\}`}</Eq>
        <Tx>{R`由 \eqref{HIII-44}，相因子模为 1：`}</Tx>
        <Eq n="HIII-73" say="位置相关的相因子不改变模，所以概率密度在规范变换下不变。">{R`${RH}'(\mathbf r,t)=|\psi'(\mathbf r,t)|^2=${RH}(\mathbf r,t)`}</Eq>
        <Tx>{R`流则需要多一步：梯度作用在相因子上会多出 $q\boldsymbol\nabla\chi$，`}</Tx>
        <Eq n="HIII-74" say="把相因子移过梯度算符，多出的 $q\boldsymbol\nabla\chi$ 项恰好补偿新旧矢势之差。">{R`\begin{aligned}\mathbf J'(\mathbf r,t)&=\frac1m\mathrm{Re}\left\{\mathrm e^{-i\frac q\hbar\chi(\mathbf r;t)}\psi^*(\mathbf r,t)\left[\frac\hbar i\boldsymbol\nabla-q\mathbf A'(\mathbf r;t)\right]\mathrm e^{i\frac q\hbar\chi(\mathbf r;t)}\psi(\mathbf r,t)\right\}\\&=\frac1m\mathrm{Re}\left\{\psi^*(\mathbf r,t)\left[\frac\hbar i\boldsymbol\nabla-q\mathbf A'(\mathbf r;t)+q\boldsymbol\nabla\chi(\mathbf r;t)\right]\psi(\mathbf r,t)\right\}\end{aligned}`}</Eq>
        <Tx>{R`由 \eqref{HIII-2}，$-q\mathbf A'+q\boldsymbol\nabla\chi=-q\mathbf A$：`}</Tx>
        <Eq n="HIII-75" keyEq title="概率流规范不变" say="概率流在规范变换下不变。">{R`\mathbf J'(\mathbf r,t)=\mathbf J(\mathbf r,t)`}</Eq>
        <Tx>{R`概率密度与概率流都是规范不变的。这也可以从 $\nosym{\alpha}$ 的一般结论预见：按 \mainref{D-19}，$${RH}(\mathbf r,t)$ 与 $\mathbf J(\mathbf r,t)$ 分别是算符 $\ket{\mathbf r}\bra{\mathbf r}$ 与`}</Tx>
        <Eq n="HIII-76" say="概率流算符：位置投影与机械动量算符的对称化乘积除以 $2m$。">{R`\mathbf K_{${J}}(\mathbf r)=\frac1{2m}\left\{\ket{\mathbf r}\bra{\mathbf r}\boldsymbol\Pi_{${J}}+\boldsymbol\Pi_{${J}}\ket{\mathbf r}\bra{\mathbf r}\right\}`}</Eq>
        <Tx>{R`的平均值；不难证明这两个算符满足 \eqref{HIII-59}，因此描述真物理量，平均值规范不变。`}</Tx>
        <GaugeLab />
        <Box kind="physics" title="规范不变性的分量">{R`(1) 本节说明，带电粒子的量子力学可以在任何规范中计算，答案相同——实际计算中可以挑最方便的规范（例如均匀磁场的对称规范或 Landau 规范）。(2) 但要注意"预言只依赖于场"的确切含义：它说的是只依赖于**所有点**上的场。在 Aharonov–Bohm 效应里，电子只经过 $\mathbf B=0$ 的区域，干涉条纹却随被包围的磁通移动——这并不违反规范不变性（磁通 $\oint\mathbf A\cdot\mathrm d\mathbf l$ 是规范不变量），却说明在量子力学中局部的场不足以描述全部物理。(3) 把"位置相关的相位自由度"当作出发点而不是结论，就得到粒子物理中规范场论的思想。`}</Box>
      </Sub>
    </Sec>);
}
