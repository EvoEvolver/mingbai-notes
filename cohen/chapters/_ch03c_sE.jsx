// 补充材料 E_III：密度算符（式 EIII-1 … EIII-70；另重抄第 III 章 (B-14)）
// 讲法：从"两种概率"出发，先在纯态里把态矢换成投影算符并验证一切预言都能改写（且变成线性），再利用线性一步推广到统计混合；
// 然后读矩阵元的意义（布居数、相干），最后两个应用：热平衡与部分迹。
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { DensityLab } from "./_ch03c_plots.jsx";

const R = String.raw;
const TT = R`\sym{Ttemp}{T}`;     // 温度
const KB = R`\sym{kB}{k}`;        // Boltzmann 常数
const X2 = R`\sym{chi2}{\chi}`;   // 子体系 (2) 的态
const TH = R`\sym{thE}{\theta}`;  // 整体相位

export function SecE() {
  return (
    <Sec n="EIII" title="The density operator" zh="密度算符"
      gist={R`对态了解不完全时，用 $\rho=\sum_kp_k\ket{\psi_k}\bra{\psi_k}$ 代替态矢：$\Tr\rho=1$，$\langle A\rangle=\Tr\{\rho A\}$，$\mathcal P(a_n)=\Tr\{P_n\rho\}$，$i\hbar\dot\rho=[H,\rho]$。纯态 $\iff\rho^2=\rho\iff\Tr\rho^2=1$。对角元是布居数、非对角元是相干；热平衡 $\rho=Z^{-1}\mathrm e^{-H/kT}$；部分迹给出子体系的约化密度算符。`}
      why={R`实验中态往往只在统计意义上已知（自然光、炉中射出的原子束、热平衡体系），而且子体系一般没有自己的态矢（$\mathrm D_{\rm III}$）。密度算符把"量子概率"和"经典的无知"装进同一个对象，是量子统计力学与开放体系的基本工具。`}
      gives={["EIII-9", "EIII-16", "EIII-27", "EIII-28", "EIII-31", "EIII-38", "EIII-49", "EIII-51", "EIII-57", "EIII-65"]}>
      <p className="muted">本节概念：<C id="mixture" /> · <C id="density_op" /> · <C id="coherence" /> · <C id="partial_trace" /></p>

      <Sub n="EIII-1" title="Outline of the problem" zh="问题：态只部分已知">
        <Tx>{R`**回到开场的偏振片。**通过偏振器的光子，偏振态是我们**亲手制备**的，第 III 章的一切都适用：给出右矢，就能算出任何测量的概率。自然光则不同——没有人制备过它，我们只知道"各方向等可能"。原子束也一样：从温度 $${TT}$ 的炉子里出来，每个原子的动能只有一个统计分布。

这类情形在实验里才是常态，所以必须回答：**手里只有关于态的统计信息时，怎样做出能充分利用这些信息的量子预言？**本节的答案是换一个描述态的对象——密度算符。它的好处是把"对态的不了解"与"量子测量的随机性"放进同一个式子里，用起来和右矢一样方便。`}</Tx>
      </Sub>

      <Sub n="EIII-2" title="The concept of a statistical mixture of states" zh="统计混合：两层概率">
        <Tx>{R`**把"不知道"写成清单。**最常见的局面是：我们能列出一张表——态 $\ket{\psi_1}$ 出现的概率 $p_1$，态 $\ket{\psi_2}$ 出现的概率 $p_2$，……（热平衡体系就是这样：能量为 $E_n$ 的态以正比于 $\mathrm e^{-E_n/${KB}${TT}}$ 的概率出现。）表中概率加起来为一：`}</Tx>
        <Eq n="EIII-1" say="统计混合中各个可能态的概率之和为 1。">{R`p_1+p_2+...=\sum_kp_k=1`}</Eq>
        <Tx>{R`这样一张表称为**统计混合**。表中的态取归一化的（本节一律如此），但不必两两正交。

做预言的办法其实不用学：对表中每一行，按第 III 章算出所求测量结果的概率，再按 $p_k$ 加权平均。值得停下来看的是，这个结果里的随机性有**两个彼此无关的来源**：一个是表本身——我们对制备过程知道得不全，这在经典统计力学里同样存在；另一个是每一行内部——即使态完全确定，量子测量也只给出概率。此前我们只处理后一种（表只有一行，$p=1$）。`}</Tx>
        <Box kind="warning" title="统计混合不等于叠加">
          <Tx>{R`以概率 $p_k$ 处于 $\ket{\psi_k}$ 的混合，不能与叠加态（此处设 $\ket{\psi_k}$ 正交归一）`}</Tx>
          <Eq n="EIII-2" say="叠加态：各个态以复系数 $c_k$ 相干地加在一起，而不是以概率混合。">{R`\ket\psi=\sum_kc_k\ket{\psi_k}`}</Eq>
          <Tx>{R`混为一谈。我们常说叠加态"以概率 $|c_k|^2$ 处于 $\ket{\psi_k}$"，准确含义只是：若测量一组以 $\ket{\psi_k}$ 为本征矢的 ECOC，得到与 $\ket{\psi_k}$ 相应结果的概率是 $|c_k|^2$。但 \mainsec{E-1} 已经强调，叠加态**并不等价于**"以概率 $|c_1|^2$ 处于 $\ket{\psi_1}$、以概率 $|c_2|^2$ 处于 $\ket{\psi_2}$……"：振幅取模方时会产生交叉项 $c_kc_{k'}^*$，即干涉效应。

一个具体对照：$\frac1{\sqrt2}(\ket++\ket-)$ 与"一半 $\ket+$、一半 $\ket-$"的混合，测 $\ket\pm$ 的结果统计完全相同；但若测的可观测量以 $\frac1{\sqrt2}(\ket+\pm\ket-)$ 为本征矢，前者**必然**得到第一个结果，后者两种结果各占一半。

因此一般不存在一个"平均态矢"来描述统计混合：对概率加权平均，永远不会产生干涉项。描述混合需要的不是"平均右矢"，而是下面的"平均算符"。`}</Tx>
        </Box>
      </Sub>

      <Sub n="EIII-3" title="The pure case. Introduction of the density operator" zh="纯态：把态矢换成投影算符">
        <Tx>{R`**策略。**"对每个 $\ket{\psi_k}$ 算一遍再加权"原则上正确，但很笨重。我们先回到态完全已知的情形（**纯态**），证明用某个算符代替态矢可以给出全部预言；之后会看到，几乎所有关于这个算符的公式，原样适用于统计混合。`}</Tx>
        <Tx>{R`**态矢的语言（复习）。**在离散正交归一基 $\{\ket{u_n}\}$ 中展开 $t$ 时刻的态（连续基同理）：`}</Tx>
        <Eq n="EIII-3" say="$t$ 时刻的态在正交归一基中按系数 $c_n(t)$ 展开。">{R`\ket{\psi(t)}=\sum_nc_n(t)\ket{u_n}`}</Eq>
        <Eq n="EIII-4" say="归一化条件：所有展开系数模方之和为 1。">{R`\sum_n|c_n(t)|^2=1`}</Eq>
        <Tx>{R`可观测量 $A$ 的矩阵元与平均值：`}</Tx>
        <Eq n="EIII-5" say="可观测量 $A$ 在基中的矩阵元。">{R`\braket{u_n|A|u_p}=A_{np}`}</Eq>
        <Eq n="EIII-6" say="平均值是系数的二次式：对 $c_nc_p^*$ 与矩阵元的乘积求和。">{R`\langle A\rangle(t)=\braket{\psi(t)|A|\psi(t)}=\sum_{n,p}c_n^*(t)\,c_p(t)\,A_{np}`}</Eq>
        <Tx>{R`演化由 Schrödinger 方程给出：`}</Tx>
        <Eq n="EIII-7" say="态矢的演化由 Schrödinger 方程决定，$H(t)$ 为体系的 Hamilton 算符。">{R`i\hbar\frac{\mathrm d}{\mathrm dt}\ket{\psi(t)}=H(t)\ket{\psi(t)}`}</Eq>
        <Tx>{R`**关键观察。**\eqref{EIII-6} 中系数只以 $c_n^*c_p$ 的组合出现。这些组合恰好是投影算符 $\ket{\psi(t)}\bra{\psi(t)}$（\IIsec{B-3}）的矩阵元：`}</Tx>
        <Eq n="EIII-8" say="系数的二次组合 $c_n^*c_p$ 正是投影算符 $\ket\psi\bra\psi$ 的矩阵元。">{R`\braket{u_p|\psi(t)}\braket{\psi(t)|u_n}=c_n^*(t)\,c_p(t)`}</Eq>
        <Tx>{R`于是很自然地定义**密度算符**：`}</Tx>
        <Eq n="EIII-9" keyEq title="纯态的密度算符" say="纯态的密度算符就是到态矢方向上的投影算符。">{R`\rho(t)=\ket{\psi(t)}\bra{\psi(t)}`}</Eq>
        <Tx>{R`它在 $\{\ket{u_n}\}$ 中的矩阵叫**密度矩阵**：`}</Tx>
        <Eq n="EIII-10" say="密度矩阵元 $\rho_{pn}$ 等于 $c_p$ 乘以 $c_n$ 的共轭。">{R`\rho_{pn}(t)=\braket{u_p|\rho(t)|u_n}=c_n^*(t)\,c_p(t)`}</Eq>
        <Tx>{R`**把三条基本公式改写成 $\rho$ 的语言。**归一化 \eqref{EIII-4} 说的是密度矩阵对角元之和为 1：`}</Tx>
        <Eq n="EIII-11" say="归一化条件用密度矩阵写出就是：迹等于 1。">{R`\sum_n|c_n(t)|^2=\sum_n\rho_{nn}(t)=\Tr\rho(t)=1`}</Eq>
        <Tx>{R`平均值 \eqref{EIII-6} 用 \eqref{EIII-5}、\eqref{EIII-10} 改写，再用封闭关系把对 $n$ 的求和收起来：`}</Tx>
        <Eq n="EIII-12" say="平均值等于密度算符与可观测量乘积的迹。">{R`\begin{aligned}\langle A\rangle(t)&=\sum_{n,p}\braket{u_p|\rho(t)|u_n}\braket{u_n|A|u_p}\\&=\sum_p\braket{u_p|\rho(t)A|u_p}\\&=\Tr\{\rho(t)A\}\end{aligned}`}</Eq>
        <Tx>{R`演化：对 \eqref{EIII-9} 求导，两个因子各贡献一项，用 \eqref{EIII-7} 及其共轭 $-i\hbar\frac{\mathrm d}{\mathrm dt}\bra{\psi(t)}=\bra{\psi(t)}H(t)$：`}</Tx>
        <Eq n="EIII-13" say="密度算符的时间导数等于 Hamilton 算符与它的对易子除以 $i\hbar$。">{R`\begin{aligned}\frac{\mathrm d}{\mathrm dt}\rho(t)&=\left(\frac{\mathrm d}{\mathrm dt}\ket{\psi(t)}\right)\bra{\psi(t)}+\ket{\psi(t)}\left(\frac{\mathrm d}{\mathrm dt}\bra{\psi(t)}\right)\\&=\frac1{i\hbar}H(t)\ket{\psi(t)}\bra{\psi(t)}+\frac1{(-i\hbar)}\ket{\psi(t)}\bra{\psi(t)}H(t)\\&=\frac1{i\hbar}\left[H(t),\,\rho(t)\right]\end{aligned}`}</Eq>
        <Tx>{R`汇总成三条：概率守恒、平均值、演化方程——`}</Tx>
        <Eq n="EIII-14" say="概率守恒：密度算符的迹恒为 1。">{R`\Tr\rho(t)=1`}</Eq>
        <Eq n="EIII-15" keyEq title="用密度算符算平均值" say="可观测量的平均值等于 $\rho A$（或 $A\rho$）的迹。">{R`\langle A\rangle(t)=\Tr\{\rho(t)A\}=\Tr\{A\rho(t)\}`}</Eq>
        <Eq n="EIII-16" keyEq title="von Neumann 方程" say="密度算符的演化方程：$i\hbar$ 乘以时间导数等于 $[H,\rho]$。注意次序与 Heisenberg 方程相反。">{R`i\hbar\frac{\mathrm d}{\mathrm dt}\rho(t)=\left[H(t),\,\rho(t)\right]`}</Eq>
        <Tx>{R`**测量概率**也能用 $\rho$ 写出。关键是把概率看成投影算符的平均值——这正是第 III 章的 \mainref{B-14}：`}</Tx>
        <Eq n="B-14" say="（第 III 章重抄）测得 $a_n$ 的概率等于态在本征子空间投影算符 $P_n$ 下的平均值。">{R`\mathcal P(a_n)=\braket{\psi|P_n|\psi}`}</Eq>
        <Tx>{R`写成 $t$ 时刻的形式：`}</Tx>
        <Eq n="EIII-17" say="$t$ 时刻测得 $a_n$ 的概率是投影算符 $P_n$ 在态 $\ket{\psi(t)}$ 中的平均值。">{R`\mathcal P(a_n)=\braket{\psi(t)|P_n|\psi(t)}`}</Eq>
        <Tx>{R`再用 \eqref{EIII-15}：`}</Tx>
        <Eq n="EIII-18" keyEq title="用密度算符算概率" say="测得 $a_n$ 的概率等于投影算符 $P_n$ 与密度算符乘积的迹。">{R`\mathcal P(a_n)=\Tr\{P_n\,\rho(t)\}`}</Eq>
        <Tx>{R`**纯态中 $\rho$ 的性质。**用 $\rho$ 而不用 $\ket\psi$ 有两个立竿见影的好处。第一，$\ket{\psi(t)}$ 与 $\mathrm e^{i${TH}}\ket{\psi(t)}$（$${TH}$ 为实数）描写同一物理态，却是不同的右矢；而它们给出**同一个** $\rho$——整体相位的冗余自动消失了。第二，\eqref{EIII-14}、\eqref{EIII-15}、\eqref{EIII-18} 都对 $\rho$ **线性**，而 \eqref{EIII-6}、\eqref{EIII-17} 对 $\ket{\psi}$ 是二次的。线性正是下一步推广到混合的关键。

由定义 \eqref{EIII-9} 还直接读出：`}</Tx>
        <Eq n="EIII-19" say="密度算符是厄米的。">{R`\rho^\dagger(t)=\rho(t)`}</Eq>
        <Eq n="EIII-20" say="纯态的密度算符是投影算符，平方等于自身。">{R`\rho^2(t)=\rho(t)`}</Eq>
        <Eq n="EIII-21" say="纯态的密度算符平方的迹等于 1。">{R`\Tr\rho^2(t)=1`}</Eq>
        <Tx>{R`后两条来自 $\rho$ 是投影算符，**只在纯态中成立**。`}</Tx>
      </Sub>

      <Sub n="EIII-4" title="A statistical mixture of states (non-pure case)" zh="统计混合：线性带来的推广">
        <Tx>{R`**4-a 定义。**回到一般情形：某一时刻体系以概率 $p_k$ 处于 $\ket{\psi_k}$，概率满足`}</Tx>
        <Eq n="EIII-22" say="混合中的概率都介于 0 与 1 之间，且总和为 1。">{R`\begin{cases}0\le p_1,\,p_2,\,...,\,p_k,\,...\le1\\\displaystyle\sum_kp_k=1\end{cases}`}</Eq>
        <Tx>{R`测量 $A$ 得到 $a_n$ 的概率 $\mathcal P(a_n)$ 怎么算？若态是 $\ket{\psi_k}$，概率为`}</Tx>
        <Eq n="EIII-23" say="若体系确定处于 $\ket{\psi_k}$，测得 $a_n$ 的概率是 $P_n$ 在该态中的平均值。">{R`\mathcal P_k(a_n)=\braket{\psi_k|P_n|\psi_k}`}</Eq>
        <Tx>{R`按 §2 的规则加权求和：`}</Tx>
        <Eq n="EIII-24" say="混合中测得 $a_n$ 的总概率，是各个可能态中的概率按 $p_k$ 加权之和。">{R`\mathcal P(a_n)=\sum_kp_k\,\mathcal P_k(a_n)`}</Eq>
        <Tx>{R`而由 \eqref{EIII-18}，每一项都可以用对应纯态的密度算符写成迹：`}</Tx>
        <Eq n="EIII-25" say="每个可能态中的概率，等于该态的密度算符与 $P_n$ 乘积的迹。">{R`\mathcal P_k(a_n)=\Tr\{\rho_k\,P_n\}`}</Eq>
        <Eq n="EIII-26" say="第 $k$ 个可能态的密度算符是到它的投影。">{R`\rho_k=\ket{\psi_k}\bra{\psi_k}`}</Eq>
        <Tx>{R`现在线性发挥作用了：求和可以穿过迹，加权平均落到算符上：`}</Tx>
        <Eq n="EIII-27" keyEq title="混合中的测量概率" say="由于迹是线性的，加权求和可以移进迹里，概率只依赖于加权平均后的密度算符。">{R`\begin{aligned}\mathcal P(a_n)&=\sum_kp_k\Tr\{\rho_k\,P_n\}\\&=\Tr\left\{\sum_kp_k\,\rho_k\,P_n\right\}\\&=\Tr\{\rho P_n\}\end{aligned}`}</Eq>
        <Eq n="EIII-28" keyEq title="统计混合的密度算符" say="统计混合的密度算符是各可能态投影算符以概率加权的平均。">{R`\rho=\sum_kp_k\,\rho_k`}</Eq>
        <Tx>{R`于是**所有物理预言都只依赖于 $\rho$**——各纯态密度算符的加权平均。这就是统计混合的密度算符的定义。描述混合的"平均对象"不是平均右矢，而是平均投影算符。`}</Tx>
        <Box kind="note" title={R`同一个 $\rho$，多种“配方”`}>{R`给定 $\{p_k,\ket{\psi_k}\}$ 得到唯一的 $\rho$，反过来却不成立：同一个 $\rho$ 可以由很多不同的混合得到。例如在 $N$ 维空间中，一组基 $\{\ket{u_n}\}$ 的 $N$ 个态各以 $1/N$ 的概率混合，得到 $\rho=\mathbb 1/N$；换成任何另一组基 $\{\ket{v_n}\}$，结果完全一样。由于一切概率都只依赖 $\rho$，这些"配方"在任何测量中都**无法区分**——有时称为同一密度算符的"多重制备"。所以问"这束自然光里的光子到底是线偏振的混合还是圆偏振的混合"是没有物理意义的。`}</Box>
        <Tx>{R`**4-b 一般性质。**$p_k$ 是实数，每个 $\rho_k$ 厄米，所以 $\rho$ 厄米。它的迹：`}</Tx>
        <Eq n="EIII-29" say="混合密度算符的迹是各纯态密度算符的迹的加权和。">{R`\Tr\rho=\sum_kp_k\Tr\rho_k`}</Eq>
        <Eq n="EIII-30" say="每个纯态密度算符的迹为 1，所以混合密度算符的迹也为 1。">{R`\Tr\rho=\sum_kp_k=1`}</Eq>
        <Tx>{R`即 \eqref{EIII-14} 一般成立。平均值公式 \eqref{EIII-15} 也照搬：由 \eqref{EIII-27} 与 $A$ 的谱分解 $A=\sum_na_nP_n$（\IIsec{D}）`}</Tx>
        <Eq n="EIII-31" keyEq title="混合中的平均值" say="对混合，平均值同样等于 $\rho A$ 的迹；推导只用到谱分解与迹的线性。">{R`\begin{aligned}\langle A\rangle&=\sum_na_n\mathcal P(a_n)=\Tr\left\{\rho\sum_na_nP_n\right\}\\&=\Tr\{\rho A\}\end{aligned}`}</Eq>
        <Tx>{R`**演化。**假定 Hamilton 算符 $H(t)$ 完全已知（不知道的只是态）。若 $t_0$ 时体系以概率 $p_k$ 处于 $\ket{\psi_k}$，则 $t$ 时以**同样的**概率 $p_k$ 处于由 Schrödinger 方程演化出的`}</Tx>
        <Eq n="EIII-32" say="混合中的每个可能态各自按 Schrödinger 方程演化，初始值为 $\ket{\psi_k}$；概率 $p_k$ 不变。">{R`\begin{cases}i\hbar\dfrac{\mathrm d}{\mathrm dt}\ket{\psi_k(t)}=H(t)\ket{\psi_k(t)}\\\ket{\psi_k(t_0)}=\ket{\psi_k}\end{cases}`}</Eq>
        <Eq n="EIII-33" say="$t$ 时刻的密度算符是各演化后纯态密度算符的加权和。">{R`\rho(t)=\sum_kp_k\rho_k(t)`}</Eq>
        <Eq n="EIII-34" say="第 $k$ 个可能态在 $t$ 时刻的密度算符。">{R`\rho_k(t)=\ket{\psi_k(t)}\bra{\psi_k(t)}`}</Eq>
        <Tx>{R`每个 $\rho_k(t)$ 都是纯态，服从 \eqref{EIII-16}：`}</Tx>
        <Eq n="EIII-35" say="每个纯态分量的密度算符都满足 von Neumann 方程。">{R`i\hbar\frac{\mathrm d}{\mathrm dt}\rho_k(t)=[H(t),\rho_k(t)]`}</Eq>
        <Tx>{R`方程对 $\rho_k$ 线性，加权求和后形式不变：`}</Tx>
        <Eq n="EIII-36" keyEq title="混合的演化方程" say="统计混合的密度算符满足与纯态完全相同的演化方程。">{R`i\hbar\frac{\mathrm d}{\mathrm dt}\rho(t)=[H(t),\rho(t)]`}</Eq>
        <Tx>{R`**哪些公式不能推广。**§3 中只有 \eqref{EIII-20}、\eqref{EIII-21} 不能推广：$\rho$ 不再是投影算符，一般`}</Tx>
        <Eq n="EIII-37" say="统计混合的密度算符一般不是投影算符，平方不等于自身。">{R`\rho^2\ne\rho`}</Eq>
        <Eq n="EIII-38" keyEq title="纯度判据" say="密度算符平方的迹不大于 1；等于 1 当且仅当是纯态。">{R`\Tr\rho^2\le1`}</Eq>
        <Tx>{R`例如 $\ket{\psi_k}$ 两两正交时，在包含它们的正交归一基中 $\rho$ 是对角的，对角元就是 $p_k$；$\rho^2$ 的对角元是 $p_k^2$，而 $p_k<1$（除非只有一个非零）使 $\sum p_k^2<1$。反过来，\eqref{EIII-20}、\eqref{EIII-21} 中只要有一条成立，就**一定**是纯态。$\Tr\rho^2$ 因此被称为态的**纯度**。

最后，对任意右矢 $\ket u$：`}</Tx>
        <Eq n="EIII-39" say="密度算符在任意态中的平均值，是该态与各可能态重叠模方的加权和。">{R`\begin{aligned}\braket{u|\rho|u}&=\sum_kp_k\braket{u|\rho_k|u}\\&=\sum_kp_k\left|\braket{u|\psi_k}\right|^2\end{aligned}`}</Eq>
        <Eq n="EIII-40" say="于是密度算符在任何态中的平均值都非负：$\rho$ 是正算符。">{R`\braket{u|\rho|u}\ge0`}</Eq>
        <Tx>{R`$\rho$ 是**正算符**。厄米、正、迹为 1——这三条正是一个算符能作为密度算符的充要条件。

**4-c 布居数与相干。**$\rho$ 在 $\{\ket{u_n}\}$ 中的矩阵元有什么物理意义？先看对角元。由 \eqref{EIII-28}，`}</Tx>
        <Eq n="EIII-41" say="密度矩阵的对角元是各纯态分量对角元的加权和。">{R`\rho_{nn}=\sum_kp_k[\rho_k]_{nn}`}</Eq>
        <Tx>{R`引入 $\ket{\psi_k}$ 在基中的分量`}</Tx>
        <Eq n="EIII-42" say="第 $k$ 个可能态在 $u_n$ 上的展开系数。">{R`c_n^{(k)}=\braket{u_n|\psi_k}`}</Eq>
        <Eq n="EIII-43" keyEq title="布居数" say="对角元是各可能态中“处于 $u_n$”的概率按 $p_k$ 的加权平均：即找到体系处于 $u_n$ 的平均概率。">{R`\rho_{nn}=\sum_kp_k\left|c_n^{(k)}\right|^2`}</Eq>
        <Tx>{R`**读法：先在每一行里算，再对表求平均。**混合表的第 $k$ 行若被选中，测量时发现体系在 $\ket{u_n}$ 的概率是 $|c_n^{(k)}|^2$；对表加权平均，就得到"不知道选中哪一行"时发现它在 $\ket{u_n}$ 的概率。所以对角元 $\rho_{nn}$ 就是 $\ket{u_n}$ 上的**布居数**（population）：把同样的制备与测量重复 $N$ 次，大约有 $N\rho_{nn}$ 次落在 $\ket{u_n}$。它是非负实数之和，只有每一行都不含 $\ket{u_n}$ 分量时才为零。

同样的计算给出非对角元：`}</Tx>
        <Eq n="EIII-44" keyEq title="相干" say="非对角元是各可能态中交叉项 $c_n^{(k)}c_p^{(k)*}$ 的加权平均：它衡量 $u_n$ 与 $u_p$ 之间残存的干涉能力。">{R`\rho_{np}=\sum_kp_k\,c_n^{(k)}c_p^{(k)*}`}</Eq>
        <Tx>{R`每一行里的 $c_n^{(k)}c_p^{(k)*}$ 是 \mainsec{E-1} 讨论过的那种交叉项——只要第 $k$ 行的态是 $\ket{u_n}$ 与 $\ket{u_p}$ 的相干叠加，它就不为零，干涉便可能出现。$\rho_{np}$ 把各行的交叉项按权重相加。和布居数的关键区别在于：这里加的是**带相位的复数**。各行相位杂乱时，它们互相抵消，$\rho_{np}$ 可以是零，尽管每一行单独都有干涉能力——平均把干涉"洗掉"了；相位有一定的一致性时，$\rho_{np}\ne0$，$\ket{u_n}$ 与 $\ket{u_p}$ 之间就保留着可观测的干涉。因此非对角元被称为**相干**（coherences）。交互图里"等权混合 $\ket{\pm x}$"与"纯态叠加 $\frac{\ket0+\ket1}{\sqrt2}$"的对比，就是 $\rho_{01}=0$ 与 $\rho_{01}=\frac12$ 的区别。`}</Tx>
        <Box kind="note" title="三条补充">
          <Tx>{R`**(i) 布居与相干的划分依赖于基。**$\rho$ 厄米，总能找到使它对角化的正交归一基 $\{\ket{\chi_l}\}$：`}</Tx>
          <Eq n="EIII-45" say="在使 $\rho$ 对角化的基中，$\rho$ 写成各基矢投影算符以本征值 $\pi_l$ 加权之和。">{R`\rho=\sum_l\pi_l\,\ket{\chi_l}\bra{\chi_l}`}</Eq>
          <Tx>{R`由 $\rho$ 正、迹为 1：`}</Tx>
          <Eq n="EIII-46" say="$\rho$ 的本征值都在 0 与 1 之间且总和为 1，可以当作概率。">{R`\begin{cases}0\le\pi_l\le1\\\displaystyle\sum_l\pi_l=1\end{cases}`}</Eq>
          <Tx>{R`所以任何 $\rho$ 都可以看成正交态 $\ket{\chi_l}$ 以概率 $\pi_l$ 的混合，在这组基里没有相干。

**(ii) 能量本征基中的演化。**若 $\ket{u_n}$ 是不含时 $H$ 的本征矢，`}</Tx>
          <Eq n="EIII-47" say="基矢是不含时 Hamilton 算符的本征矢，本征值为 $E_n$。">{R`H\ket{u_n}=E_n\ket{u_n}`}</Eq>
          <Tx>{R`由 \eqref{EIII-36} 取矩阵元：`}</Tx>
          <Eq n="EIII-48" say="在能量本征基中，布居数的时间导数为零；相干的时间导数正比于两能量之差。">{R`\begin{cases}i\hbar\dfrac{\mathrm d}{\mathrm dt}\rho_{nn}(t)=0\\i\hbar\dfrac{\mathrm d}{\mathrm dt}\rho_{np}(t)=(E_n-E_p)\rho_{np}\end{cases}`}</Eq>
          <Eq n="EIII-49" keyEq title="布居不变、相干以 Bohr 频率转动" say="在能量本征基中，布居数不随时间变化，相干则以 Bohr 频率 $(E_p-E_n)/\hbar$ 转动相位。">{R`\begin{cases}\rho_{nn}(t)=\text{constant}\\\rho_{np}(t)=\mathrm e^{\frac i\hbar(E_p-E_n)t}\rho_{np}(0)\end{cases}`}</Eq>
          <Tx>{R`布居数不变，相干以体系的 Bohr 频率振荡——这与 \eqref{AIII-18} 中只有干涉项随时间变化是同一回事。

**(iii) 相干受布居数约束。**由 \eqref{EIII-40} 可以证明`}</Tx>
          <Eq n="EIII-50" say="相干的模方不超过对应两个布居数之积。">{R`\rho_{nn}\rho_{pp}\ge|\rho_{np}|^2`}</Eq>
          <Tx>{R`（取 $\ket u=\alpha\ket{u_n}+\beta\ket{u_p}$，要求 $\braket{u|\rho|u}\ge0$ 对一切 $\alpha,\beta$ 成立，即 $2\times2$ 子矩阵半正定。）由此，只有布居数都不为零的两个态之间才可能有相干。`}</Tx>
        </Box>
        <DensityLab />
      </Sub>

      <Sub n="EIII-5" title="Use of the density operator: some applications" zh="两个应用：热平衡与部分迹">
        <Tx>{R`**5-a 热平衡。**与温度为 $${TT}$ 的热库达到平衡的体系，其密度算符可以证明为`}</Tx>
        <Eq n="EIII-51" keyEq title="热平衡密度算符" say="热平衡体系的密度算符正比于 $\mathrm e^{-H/\sym{kB}{k}\sym{Ttemp}{T}}$，除以配分函数保证迹为 1。">{R`\rho=Z^{-1}\,\mathrm e^{-H/${KB}${TT}}`}</Eq>
        <Tx>{R`$${KB}$ 为 Boltzmann 常数，归一化系数 $Z$ 使迹为 1，称为**配分函数**：`}</Tx>
        <Eq n="EIII-52" say="配分函数是 $\mathrm e^{-H/\sym{kB}{k}\sym{Ttemp}{T}}$ 的迹。">{R`Z=\Tr\left(\mathrm e^{-H/${KB}${TT}}\right)`}</Eq>
        <Tx>{R`在 $H$ 的本征基中（\IIc{BII-4}，算符函数作用在本征矢上就是对本征值取函数）：`}</Tx>
        <Eq n="EIII-53" say="能量本征态的布居数服从 Boltzmann 分布 $\mathrm e^{-E_n/\sym{kB}{k}\sym{Ttemp}{T}}/Z$。">{R`\begin{aligned}\rho_{nn}&=Z^{-1}\braket{u_n|\mathrm e^{-H/${KB}${TT}}|u_n}\\&=Z^{-1}\,\mathrm e^{-E_n/${KB}${TT}}\end{aligned}`}</Eq>
        <Eq n="EIII-54" say="热平衡中不同能量本征态之间没有相干。">{R`\begin{aligned}\rho_{np}&=Z^{-1}\braket{u_n|\mathrm e^{-H/${KB}${TT}}|u_p}\\&=Z^{-1}\,\mathrm e^{-E_p/${KB}${TT}}\braket{u_n|u_p}\\&=0\end{aligned}`}</Eq>
        <Tx>{R`热平衡中，定态的布居数随能量指数下降（温度越低下降越快），定态之间的相干为零。在 \eqref{EIII-49} 的意义下，这正是一个**不随时间变化**的 $\rho$：没有相干，就没有任何以 Bohr 频率的振荡。（统计力学中的更多应用见第 III 卷附录 VI。）

**5-b 子体系的描述：部分迹。**回到 $\mathrm D_{\rm III}$ §3 留下的问题。整体 (1)+(2) 的态空间为`}</Tx>
        <Eq n="EIII-55" say="整体的态空间是两个子体系态空间的张量积。">{R`\mathscr E=\mathscr E(1)\otimes\mathscr E(2)`}</Eq>
        <Tx>{R`取 $\mathscr E(1)$ 的基 $\{\ket{u_n(1)}\}$ 与 $\mathscr E(2)$ 的基 $\{\ket{v_p(2)}\}$，积 $\ket{u_n(1)}\ket{v_p(2)}$ 构成 $\mathscr E$ 的基。整体的密度算符 $\rho$ 作用在 $\mathscr E$ 中。第 II 章 \IIsec{F-2} 讲过怎样把只作用于 $\mathscr E(1)$ 的算符**延拓**到 $\mathscr E$；现在要做反方向的事：从 $\rho$ 构造一个只作用于 $\mathscr E(1)$ 的算符 $\rho(1)$，使关于 (1) 的一切预言都能由它给出。这一操作叫对 (2) 取**部分迹**。

定义 $\rho(1)$ 的矩阵元为`}</Tx>
        <Eq n="EIII-56" keyEq title="部分迹（矩阵元）" say="约化密度矩阵元：把整体密度矩阵中子体系 (2) 的指标取相同并求和，子体系 (1) 的两个指标保持不同。">{R`\braket{u_n(1)|\rho(1)|u_{n'}(1)}=\sum_p\big(\bra{u_n(1)}\bra{v_p(2)}\big)\,\rho\,\big(\ket{u_{n'}(1)}\ket{v_p(2)}\big)`}</Eq>
        <Eq n="EIII-57" keyEq title="约化密度算符" say="子体系 (1) 的约化密度算符是整体密度算符对 (2) 的部分迹。">{R`\rho(1)=\Tr_2\rho`}</Eq>
        <Tx>{R`对称地，`}</Tx>
        <Eq n="EIII-58" say="子体系 (2) 的约化密度算符是对 (1) 的部分迹。">{R`\rho(2)=\Tr_1\rho`}</Eq>
        <Eq n="EIII-59" say="$\rho(2)$ 的矩阵元：子体系 (1) 的指标取相同并求和。">{R`\braket{v_p(2)|\rho(2)|v_{p'}(2)}=\sum_n\Big(\bra{u_n(1)}\bra{v_p(2)}\Big)\rho\Big(\ket{u_n(1)}\ket{v_{p'}(2)}\Big)`}</Eq>
        <Tx>{R`名字的来历：完整的迹是`}</Tx>
        <Eq n="EIII-60" say="整体密度算符的迹：两个子体系的指标都取相同并求和。">{R`\Tr\rho=\sum_n\sum_p\Big(\bra{u_n(1)}\bra{v_p(2)}\Big)\rho\Big(\ket{u_n(1)}\ket{v_p(2)}\Big)`}</Eq>
        <Tx>{R`它对两组指标都"取相同、求和"；部分迹只对其中一组这样做，另一组保留为矩阵指标。显然`}</Tx>
        <Eq n="EIII-61" say="先对一个子体系、再对另一个子体系取部分迹，就得到整体的迹，次序无关。">{R`\Tr\rho=\Tr_1(\Tr_2\rho)=\Tr_2(\Tr_1\rho)`}</Eq>
        <Tx>{R`所以 $\rho(1)$、$\rho(2)$ 的迹也为 1；由定义还可验证它们厄米、正——满足密度算符的一切一般性质（§4-b）。

**为什么 $\rho(1)$ 就是 (1) 的"态"。**设 $A(1)$ 作用于 $\mathscr E(1)$，$\tilde A(1)=A(1)\otimes\mathbb 1(2)$ 是它的延拓。由 \eqref{EIII-31}、迹的定义和 $\{\ket{u_n(1)}\ket{v_p(2)}\}$ 的封闭关系：`}</Tx>
        <Eq n="EIII-62" say="延拓可观测量的平均值写成整体基中的双重求和，$A(1)$ 与单位算符的矩阵元分别出现。">{R`\begin{aligned}\langle\tilde A(1)\rangle&=\Tr\left\{\rho\tilde A(1)\right\}\\&=\sum_{n,p}\sum_{n',p'}\Big(\bra{u_n(1)}\bra{v_p(2)}\Big)\rho\Big(\ket{u_{n'}(1)}\ket{v_{p'}(2)}\Big)\times\Big(\bra{u_{n'}(1)}\bra{v_{p'}(2)}\Big)A(1)\otimes\mathbb 1(2)\Big(\ket{u_n(1)}\ket{v_p(2)}\Big)\\&=\sum_{n,p,n',p'}\Big(\bra{u_n(1)}\bra{v_p(2)}\Big)\rho\Big(\ket{u_{n'}(1)}\ket{v_{p'}(2)}\Big)\times\braket{u_{n'}(1)|A(1)|u_n(1)}\braket{v_{p'}(2)|v_p(2)}\end{aligned}`}</Eq>
        <Tx>{R`而 (2) 的基正交归一：`}</Tx>
        <Eq n="EIII-63" say="子体系 (2) 的基矢正交归一。">{R`\braket{v_{p'}(2)|v_p(2)}=\delta_{pp'}`}</Eq>
        <Tx>{R`于是 $p'=p$，对 $p$ 的求和单独剥离出来：`}</Tx>
        <Eq n="EIII-64" say="对 (2) 的指标求和可以先做，方括号里恰好是 $\rho(1)$ 的矩阵元。">{R`\langle\tilde A(1)\rangle=\sum_{n,n'}\left[\sum_p\braket{u_n(1)v_p(2)|\rho|u_{n'}(1)v_p(2)}\right]\braket{u_{n'}(1)|A(1)|u_n(1)}`}</Eq>
        <Tx>{R`方括号正是 \eqref{EIII-56} 定义的 $\rho(1)$ 的矩阵元：`}</Tx>
        <Eq n="EIII-65" keyEq title="约化密度算符给出子体系的全部预言" say="只涉及子体系 (1) 的任何平均值，都可以把 $\rho(1)$ 当作 (1) 自己的密度算符来计算，仿佛 (1) 是孤立的。">{R`\begin{aligned}\langle\tilde A(1)\rangle&=\sum_{n,n'}\braket{u_n(1)|\rho(1)|u_{n'}(1)}\braket{u_{n'}(1)|A(1)|u_n(1)}\\&=\sum_n\braket{u_n(1)|\rho(1)A(1)|u_n(1)}\\&=\Tr\{\rho(1)A(1)\}\end{aligned}`}</Eq>
        <Tx>{R`与 \eqref{EIII-31} 对比：**一切只涉及 (1) 的平均值，都可以当作 (1) 是孤立体系、密度算符为 $\rho(1)$ 来计算**。把 $A(1)$ 取成投影算符（与 \eqref{EIII-17}→\eqref{EIII-18} 相同的思路），测量概率也由 $\rho(1)$ 给出。`}</Tx>
        <Box kind="key" title="关于部分迹的五点说明">
          <Tx>{R`**(i)** $\mathrm D_{\rm III}$ 说过，整体不处于积态时，无法给 (1) 指定态矢。密度算符则没有这个困难：无论整体是不是积态、是纯态还是混合，部分迹都能给 (1) 指定一个密度算符，由它算出关于 (1) 的一切预言。

**(ii)** 即使 $\rho$ 是纯态（$\Tr\rho^2=1$），$\rho(1)$、$\rho(2)$ 一般**不是**纯态：由 \eqref{EIII-56}、\eqref{EIII-59} 可验证 $\Tr\{\rho^2(1)\}$、$\Tr\{\rho^2(2)\}$ 一般不等于 1。这是"(1) 没有态矢"的另一种说法——除非整体是积态。

**(iii)** 若整体处于积态`}</Tx>
          <Eq n="EIII-66" say="整体处于积态。">{R`\ket\psi=\ket{\varphi(1)}\ket{${X2}(2)}`}</Eq>
          <Tx>{R`其密度算符直接分解为`}</Tx>
          <Eq n="EIII-67" say="积态的密度算符是两个子体系密度算符的张量积。">{R`\rho=\sigma(1)\otimes\tau(2)`}</Eq>
          <Eq n="EIII-68" say="两个因子分别是各子体系态的投影算符。">{R`\begin{aligned}\sigma(1)&=\ket{\varphi(1)}\bra{\varphi(1)}\\\tau(2)&=\ket{${X2}(2)}\bra{${X2}(2)}\end{aligned}`}</Eq>
          <Tx>{R`更一般地，$\rho$ 可以分解成 \eqref{EIII-67} 的形式而 $\sigma(1)$、$\tau(2)$ 本身是混合。这时部分迹给出`}</Tx>
          <Eq n="EIII-69" say="对可分解的密度算符取部分迹，得到的正是各自的因子。">{R`\begin{aligned}\Tr_2\{\sigma(1)\otimes\tau(2)\}&=\sigma(1)\\\Tr_1\{\sigma(1)\otimes\tau(2)\}&=\tau(2)\end{aligned}`}</Eq>
          <Tx>{R`\eqref{EIII-67} 这样的 $\rho$ 代表两个体系的简单并列：(1) 由 $\sigma(1)$ 描述，(2) 由 $\tau(2)$ 描述。

**(iv)** 从一个不能分解的 $\rho$ 出发，算出 $\rho(1)=\Tr_2\rho$、$\rho(2)=\Tr_1\rho$，再作乘积`}</Tx>
          <Eq n="EIII-70" say="用两个约化密度算符重新拼出的乘积算符。">{R`\rho'=\rho(1)\otimes\rho(2)`}</Eq>
          <Tx>{R`与 (iii) 不同，$\rho'$ 一般**不等于** $\rho$。两部分之间的"关联"存在于 $\rho$ 中，却没有被 $\rho'$ 保留下来——部分迹只保留了各自的局部信息。

**(v)** 若整体按 \eqref{EIII-36} 演化，一般**找不到**只属于 (1) 的 Hamilton 算符使 $\rho(1)$ 满足同样形式的方程。$\rho(1)$ 在每一时刻的定义很简单，它的演化却复杂得多（这正是开放量子体系理论要处理的问题）。`}</Tx>
        </Box>
        <Tx>{R`上面交互图的"部分迹"一栏正是 (ii)、(iv) 的数值演示：整体始终是纯态，$\Tr\rho(1)^2$ 却随两部分的关联增强而从 1 降到 $1/2$，而 $\|\rho-\rho(1)\otimes\rho(2)\|$ 则从 0 增大。`}</Tx>
      </Sub>
    </Sec>);
}
