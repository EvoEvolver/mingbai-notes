// §B 假设的陈述：第一至第六假设与量子化规则。式 (B-1)–(B-50)，图 1
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { Postulate, Rule, Fig, Sub3, Para } from "./_ch03_kit.jsx";
import { Fig1 } from "./_ch03_figs.jsx";
import { MeasureSim } from "./_ch03_plots.jsx";

const R = String.raw;

export function SecB() {
  return (
    <Sec n="B" title="Statement of the postulates" zh="假设的陈述"
      gist={R`六条假设：态是右矢（一）；物理量是可观测量（二）；测量结果只能是本征值（三）；结果 $a_n$ 的概率是 $\ket\psi$ 在本征子空间上投影的模方（四）；测量后态变成这个投影（归一化）（五）；两次测量之间态按 Schrödinger 方程演化（六）。再加上一条“把 $\mathbf r,\mathbf p$ 换成 $\mathbf R,\mathbf P$ 并对称化”的量子化规则。`}
      why={R`第 II 章只给了数学（Hilbert 空间、厄米算符、谱分解）；要把数学变成物理，必须规定数学对象与实验之间的对应。这些规定无法从更基本的东西推出，只能作为假设提出，再由其推论接受实验检验。`}
      gives={["B-4", "B-7", "B-14", "B-17", "B-31", "B-33", "B-39", "B-42"]}>
      <p className="muted">本节概念：<C id="state_vector" /> · <C id="observable" /> · <C id="born_rule" /> · <C id="global_phase" /> · <C id="reduction" /> · <C id="schrodinger" /> · <C id="quantization" /></p>

      <Sub n="B-1" title="Description of the state of a system" zh="体系状态的描述">
        <Tx>{R`回顾一下我们已经走过的路：第 I 章用平方可积的波函数 $\psi(\mathbf r)$ 描述一个粒子；第 II 章发现，波函数只是右矢 $\ket\psi$ 在位置表象中的“坐标” $\braket{\mathbf r|\psi}$，换一个表象（例如动量表象）同一个态就有另一套坐标。既然真正不依赖表象的是右矢本身，自然的做法就是让右矢充当一切体系的“态”——包括自旋这种根本没有空间波函数的自由度。`}</Tx>
        <Postulate k={1} title="态由右矢描述">{R`孤立体系在某一时刻 $t_0$ 所处的状况，完整地由态空间 $\mathcal E$ 中的一个右矢 $\ket{\psi(t_0)}$ 刻画；关于这一时刻的体系，再没有比它更多的信息。`}</Postulate>
        <Tx>{R`这条假设看似只是换了个记号，分量却很重：$\mathcal E$ 是矢量空间，**任意两个态的线性组合也是一个合法的态**。这就是叠加原理。它的物理后果——干涉，以及“叠加”与“不知道处于哪一个”之间的本质区别——要等到其他假设齐备之后才能讨论，见 §E。`}</Tx>
      </Sub>

      <Sub n="B-2" title="Description of physical quantities" zh="物理量的描述">
        <Tx>{R`第 I 章 §D-1 中已经有一个先例：粒子的能量对应微分算符 $H$。把这个先例上升为一般规则：`}</Tx>
        <Postulate k={2} title="物理量由可观测量描述">{R`凡是可以测量的物理量 $\mathcal A$，都对应一个作用在 $\mathcal E$ 上的线性算符 $A$，而且这个算符必须是**可观测量**——厄米、并且其本征矢足以张成整个 $\mathcal E$（第 II 章 §D-2）。`}</Postulate>
        <Tx>{R`为什么不满足于“厄米”，非要“可观测量”？答案在下一条假设之后自然出现：概率规则要求**任何**态都能按 $A$ 的本征矢展开，否则某些态的各结果概率加起来不到 1。另外值得停下来体会的是：经典力学里态与物理量是同一类东西（数和数的函数），量子力学里它们成了两类对象——**态是矢量，物理量是算符**。`}</Tx>
      </Sub>

      <Sub n="B-3" title="The measurement of physical quantities" zh="物理量的测量">
        <Sub3 n="B-3-a" title="Possible results" zh="可能的结果">
          <Postulate k={3} title="测量结果只能是本征值">{R`对物理量 $\mathcal A$ 做测量，读数必定是相应可观测量 $A$ 的本征值之一；本征值以外的数永远不会出现。`}</Postulate>
          <Tx>{R`两个推论马上可以读出来。$A$ 是厄米的，所以读数都是实数——这是任何“仪器读数”起码应满足的条件。若 $A$ 的谱是离散的，读数就只能取分立的值，这正是原子能级量子化的来源（§C-2）。但这条假设沉默地回避了一个问题：在众多本征值中，**这一次**会读到哪一个？那是下一条假设的任务。`}</Tx>
        </Sub3>

        <Sub3 n="B-3-b" title="Principle of spectral decomposition" zh="谱分解原理">
          <Tx>{R`**我们需要一条什么样的规则？** 第 I 章 §A-3 的偏振光子实验已经说明，对处于同一偏振态的光子做同样的测量，单次结果无法预言，只能预言概率。所以我们要的是一条“从态 $\ket\psi$ 和可观测量 $A$ 算出每个本征值的概率”的规则。它至少应满足：概率非负；各本征值的概率之和为 1；当 $\ket\psi$ 本身就是本征值 $a_n$ 的本征矢时，得到 $a_n$ 的概率为 1。下面会看到，“投影长度的平方”同时满足这一切。为了让概率之和自动为 1，先约定态矢归一：`}</Tx>
          <Eq n="B-1" say="归一化约定：态矢与自身的内积为 1。">{R`\braket{\psi|\psi}=1`}</Eq>

          <Para g="alpha">离散谱的情形</Para>
          <Tx>{R`**最简单的情形：离散、非简并。** 每个本征值 $a_n$ 只对应一个方向（差一个常数因子）：`}</Tx>
          <Eq n="B-2" say="$\ket{u_n}$ 是 $A$ 取确定值 $a_n$ 的态：$A$ 作用在它上面只乘以实数 $a_n$。">{R`A\ket{u_n}=a_n\ket{u_n}`}</Eq>
          <Tx>{R`$A$ 是可观测量，归一化的 $\ket{u_n}$ 组成正交归一基，于是 $\ket\psi$ 有唯一的分解`}</Tx>
          <Eq n="B-3" say="把态分解到“各个确定结果”的方向上，系数 $c_n=\braket{u_n|\psi}$。">{R`\ket\psi=\sum_nc_n\ket{u_n}`}</Eq>
          <Tx>{R`把 $|c_n|^2$ 当作得到 $a_n$ 的概率，上面三条要求都满足：它非负；由勾股定理 $\sum_n|c_n|^2=\braket{\psi|\psi}=1$；若 $\ket\psi=\ket{u_m}$ 则只有 $c_m=1$。量子力学正是把这个选择定为假设：`}</Tx>
          <Eq n="B-4" keyEq title="Born 规则（非简并）" say="测得 $a_n$ 的概率等于概率幅 $\braket{u_n|\psi}$ 的模方。">{R`\mathcal P(a_n)=|c_n|^2=|\braket{u_n|\psi}|^2`}</Eq>
          <Postulate k={4} case="离散非简并谱" title="谱分解原理">{R`设体系处于归一化的态 $\ket\psi$，测量 $\mathcal A$。若 $a_n$ 是 $A$ 的非简并本征值、$\ket{u_n}$ 是相应的归一化本征矢，则读到 $a_n$ 的概率等于 $\ket\psi$ 沿 $\ket{u_n}$ 的分量的模方：

$$\mathcal P(a_n)=|\braket{u_n|\psi}|^2.$$`}</Postulate>
          <Tx>{R`**简并带来的新问题。** 若 $a_n$ 是 $g_n$ 重简并的，它对应的不是一个方向，而是一个 $g_n$ 维的子空间 $\mathcal E_n$：`}</Tx>
          <Eq n="B-5" say="同一个本征值 $a_n$ 有 $g_n$ 个线性独立的本征矢，用上标 $i$ 区分。">{R`A\ket{u_n^i}=a_n\ket{u_n^i}\,;\quad i=1,2,\dots g_n`}</Eq>
          <Tx>{R`在这些正交归一本征矢构成的基上，`}</Tx>
          <Eq n="B-6" say="简并情形的展开：对本征值 $n$ 和简并指标 $i$ 双重求和。">{R`\ket\psi=\sum_n\sum_{i=1}^{g_n}c_n^i\ket{u_n^i}`}</Eq>
          <Tx>{R`读数只告诉我们“得到 $a_n$”，并不区分 $\mathcal E_n$ 内的不同方向，所以合理的做法是把 $\mathcal E_n$ 中所有分量的模方加在一起：`}</Tx>
          <Eq n="B-7" keyEq title="谱分解原理（离散谱一般形式）" say="测得 $a_n$ 的概率是态在 $a_n$ 本征子空间中各正交方向上分量模方之和。">{R`\mathcal P(a_n)=\sum_{i=1}^{g_n}|c_n^i|^2=\sum_{i=1}^{g_n}|\braket{u_n^i|\psi}|^2`}</Eq>
          <Postulate k={4} id="4b" case="离散谱，一般情形" title="谱分解原理">{R`设体系处于归一化的态 $\ket\psi$，测量 $\mathcal A$。读到本征值 $a_n$（简并度 $g_n$）的概率，是 $\ket\psi$ 在本征子空间 $\mathcal E_n$ 内任一组正交归一基 $\{\ket{u_n^i}\}_{i=1,\dots,g_n}$ 上各分量模方之和：

$$\mathcal P(a_n)=\sum_{i=1}^{g_n}|\braket{u_n^i|\psi}|^2.$$

非简并情形（$g_n=1$）是它的特例。`}</Postulate>
          <Tx>{R`**隐患：“任一组基”真的无所谓吗？** $\mathcal E_n$ 中的正交归一基有无穷多组。若 \eqref{B-7} 的值随基而变，假设就不自洽。化解的办法是把求和改写成一个不提及基的几何量。把 $\ket\psi$ 中属于 $\mathcal E_n$ 的部分收集起来，`}</Tx>
          <Eq n="B-8" say="把态中属于 $\mathcal E_n$ 的分量收集起来，记作 $\ket{\psi_n}$。">{R`\ket{\psi_n}=\sum_{i=1}^{g_n}c_n^i\ket{u_n^i}`}</Eq>
          <Tx>{R`系数就是内积`}</Tx>
          <Eq n="B-9" say="展开系数等于态在基矢上的投影。">{R`c_n^i=\braket{u_n^i|\psi}`}</Eq>
          <Tx>{R`代回去，$\ket{\psi_n}$ 恰好是某个算符作用在 $\ket\psi$ 上的结果：`}</Tx>
          <Eq n="B-10" say="$\ket{\psi_n}$ 是投影算符 $P_n$ 作用在 $\ket\psi$ 上：只保留 $\mathcal E_n$ 里的分量。">{R`\ket{\psi_n}=\sum_{i=1}^{g_n}\ket{u_n^i}\braket{u_n^i|\psi}=P_n\ket\psi`}</Eq>
          <Eq n="B-11" keyEq title="本征子空间的投影算符" say="到 $\mathcal E_n$ 的投影算符：子空间中任一组正交归一基的“右矢乘左矢”之和，与基的选法无关。">{R`P_n=\sum_{i=1}^{g_n}\ket{u_n^i}\bra{u_n^i}`}</Eq>
          <Tx>{R`$P_n$ 就是第 II 章 §B-3-b 的投影算符——它只由子空间 $\mathcal E_n$ 决定。而 $\ket{\psi_n}$ 的长度平方正好是 \eqref{B-7} 中的和：`}</Tx>
          <Eq n="B-12" say="投影矢量的模方等于 (B-7) 中的求和：概率就是投影的长度平方。">{R`\braket{\psi_n|\psi_n}=\sum_{i=1}^{g_n}|c_n^i|^2`}</Eq>
          <Tx>{R`这就把隐患消除了：**$\mathcal P(a_n)$ 是 $\ket\psi$ 投到 $\mathcal E_n$ 上的长度平方**，基只是计算时的脚手架。写成算符语言，`}</Tx>
          <Eq n="B-13" say="概率等于投影矢量 $P_n\ket\psi$ 与自身的内积。">{R`\mathcal P(a_n)=\bra\psi P_n^\dagger P_n\ket\psi`}</Eq>
          <Tx>{R`而投影算符厄米（$P_n^\dagger=P_n$）且投两次等于投一次（$P_n^2=P_n$），于是得到最干净的形式：`}</Tx>
          <Eq n="B-14" keyEq title="概率 = 投影算符的期望值" say="测得 $a_n$ 的概率等于投影算符 $P_n$ 在 $\ket\psi$ 中的平均值：与基无关的写法。">{R`\mathcal P(a_n)=\bra\psi P_n\ket\psi`}</Eq>
          <Box kind="physics" title="一幅几何图像">{R`$A$ 的各本征子空间 $\mathcal E_1,\mathcal E_2,\dots$ 两两正交，把 $\mathcal E$ “切成”几块。单位长的 $\ket\psi$ 投到每一块上的长度平方之和为 1（多维勾股定理），这些长度平方就是各读数的概率。简并只意味着某一块不止一维，规则不变。`}</Box>

          <Para g="beta">连续谱的情形</Para>
          <Tx>{R`对位置、动量这类谱连续的量，单个本征值的概率只能是零，我们转而问“读数落在一个小区间里”的概率。设谱连续且非简并，本征矢在 $\delta$ 函数意义下正交归一：`}</Tx>
          <Eq n="B-15" say="连续谱的本征方程：本征值 $\alpha$ 连续变化，$\ket{v_\alpha}$ 只能广义归一。">{R`A\ket{v_\alpha}=\alpha\ket{v_\alpha}`}</Eq>
          <Tx>{R`展开中的求和变成积分，系数变成函数：`}</Tx>
          <Eq n="B-16" say="在连续基上展开：系数成为函数 $c(\alpha)$。">{R`\ket\psi=\int\dd\alpha\,c(\alpha)\ket{v_\alpha}`}</Eq>
          <Tx>{R`离散情形的 $|c_n|^2$ 自然地变成概率**密度** $\rho(\alpha)$，读数落在 $[\alpha,\alpha+\dd\alpha]$ 的概率为 $\dd\mathcal P(\alpha)=\rho(\alpha)\,\dd\alpha$，并且（与第 I 章 §B-2 对 $|\psi(\mathbf r)|^2$ 的解释同出一辙）`}</Tx>
          <Eq n="B-17" keyEq title="连续谱的概率密度" say="连续谱读数的概率密度等于展开函数 $c(\alpha)$ 的模方。">{R`\rho(\alpha)=|c(\alpha)|^2=|\braket{v_\alpha|\psi}|^2`}</Eq>
          <Postulate k={4} id="4c" case="连续非简并谱" title="谱分解原理">{R`设体系处于归一化的态 $\ket\psi$，$A$ 的谱连续且非简并、本征矢为 $\ket{v_\alpha}$。测量 $\mathcal A$ 时读数落在 $\alpha$ 与 $\alpha+\dd\alpha$ 之间的概率为

$$\dd\mathcal P(\alpha)=|\braket{v_\alpha|\psi}|^2\,\dd\alpha.$$`}</Postulate>
          <Tx>{R`**三项自检。**

*概率之和。* 以 \eqref{B-7} 为例，把所有读数的概率加起来：`}</Tx>
          <Eq n="B-18" say="所有读数的概率之和等于态的模方，归一化时为 1。">{R`\sum_n\mathcal P(a_n)=\sum_n\sum_{i=1}^{g_n}|c_n^i|^2=\braket{\psi|\psi}=1`}</Eq>
          <Tx>{R`可见归一化是规则自洽的前提。不过若手头的 $\ket\psi$ 没有归一，不必先去归一它，只要在概率中除以模方即可：`}</Tx>
          <Eq n="B-19" say="态矢未归一时，离散谱的概率除以 $\braket{\psi|\psi}$。">{R`\mathcal P(a_n)=\frac1{\braket{\psi|\psi}}\sum_{i=1}^{g_n}|c_n^i|^2`}</Eq>
          <Eq n="B-20" say="连续谱的概率密度同样除以 $\braket{\psi|\psi}$。">{R`\rho(\alpha)=\frac1{\braket{\psi|\psi}}|c(\alpha)|^2`}</Eq>
          <Tx>{R`*完备性的必要。* 规则的每一步都用到“$\ket\psi$ 可以按 $A$ 的本征矢展开”。这正是第二假设坚持“可观测量”的原因：若本征矢不完备，总有一部分 $\ket\psi$ 无处安放，概率之和就小于 1。

*更复杂的谱。* 连续且简并、或部分离散部分连续的谱，都按同一思路处理：把对应于某个读数（或读数区间）的全部本征分量的模方加起来（或积起来）。§E-2 会给出一个具体例子（测量粒子的 $x$ 坐标，那里 $X$ 的本征值关于 $y,z$ 无穷重简并）。`}</Tx>

          <Para g="gamma">一个重要推论：整体相因子没有物理意义</Para>
          <Tx>{R`**问题：一个物理态对应几个右矢？** 第四假设只用到 $|\braket{u_n^i|\psi}|^2$ 这类模方，所以凡是不改变这些模方的改动都不会被任何测量察觉。最简单的改动是乘一个模为 1 的数：`}</Tx>
          <Eq n="B-21" say="两个右矢只差一个整体相因子 $e^{i\theta}$（$\theta$ 实数）。">{R`\ket{\psi'}=e^{i\theta}\ket\psi`}</Eq>
          <Tx>{R`它保持归一，`}</Tx>
          <Eq n="B-22" say="左矢带 $e^{-i\theta}$、右矢带 $e^{i\theta}$，乘积为 1，模不变。">{R`\braket{\psi'|\psi'}=\bra\psi e^{-i\theta}e^{i\theta}\ket\psi=\braket{\psi|\psi}`}</Eq>
          <Tx>{R`也保持每一个概率幅的模：`}</Tx>
          <Eq n="B-23" say="每个概率幅都乘上同一个相因子，模方不变，因而对任何测量的预言相同。">{R`|\braket{u_n^i|\psi'}|^2=|e^{i\theta}\braket{u_n^i|\psi}|^2=|\braket{u_n^i|\psi}|^2`}</Eq>
          <Tx>{R`再进一步，借助未归一形式 \eqref{B-19}、\eqref{B-20}，连模也可以改：`}</Tx>
          <Eq n="B-24" say="乘任意非零复数 $a\,e^{i\theta}$：在 (B-19)、(B-20) 的分子分母中各出一个 $|a|^2$，相互抵消。">{R`\ket{\psi''}=\sym{acst}{a}\,e^{i\theta}\ket\psi`}</Eq>
          <Tx>{R`结论：**成比例的右矢描述同一个物理态**；物理态对应的其实是 $\mathcal E$ 中过原点的一条“射线”。

**但别走过头：相对相位是可观测的。** 拿一个叠加态来试：`}</Tx>
          <Eq n="B-25" say="两个态的叠加，$\lambda_1,\lambda_2$ 为复数。">{R`\ket\psi=\lambda_1\ket{\psi_1}+\lambda_2\ket{\psi_2}`}</Eq>
          <Tx>{R`$e^{i\theta_1}\ket{\psi_1}$ 单独看与 $\ket{\psi_1}$ 不可区分，$e^{i\theta_2}\ket{\psi_2}$ 与 $\ket{\psi_2}$ 也一样。可是把它们代进叠加态，`}</Tx>
          <Eq n="B-26" say="给两个分量各乘不同的相因子，得到的叠加态一般是另一个物理态。">{R`\ket\varphi=\lambda_1e^{i\theta_1}\ket{\psi_1}+\lambda_2e^{i\theta_2}\ket{\psi_2}`}</Eq>
          <Tx>{R`一般是一个**不同的**物理态：两分量之间的相位差变了，而 §E-1 会说明这个相位差直接进入干涉项。只有当两个相因子相同（$\theta_1=\theta_2+2n\pi$）时，它们才能作为公因子提出去：`}</Tx>
          <Eq n="B-27" say="相因子相同时可以提出成为整体相因子，物理态不变。">{R`\ket\varphi=e^{i\theta_1}[\lambda_1\ket{\psi_1}+\lambda_2\ket{\psi_2}]=e^{i\theta_1}\ket\psi`}</Eq>
          <Box kind="key" title="一句话记住">{R`**整体相因子不影响物理预言；展开系数之间的相对相位则影响。** 前者是整个箭头一起转，后者改变了箭头在各方向上的分量关系。§E-1 的四个偏振态 $\mathbf e_1,\dots,\mathbf e_4$（只差相对相位，却是两种线偏振与两种圆偏振）把这一点变得非常具体。`}</Box>
        </Sub3>

        <Sub3 n="B-3-c" title="Reduction of the wave packet" zh="波包的约化（测量后的态）">
          <Tx>{R`**从一个实验事实出发。** 用检偏器挑出一束光子，再让它们通过一个方向相同的检偏器，全部通过——第二次“测量”重复了第一次的结果。一般地：对同一体系**紧接着**重复同一测量，读数总是相同。如果测量后的态仍是测量前的 $\ket\psi$，这件事就无法解释，因为第四假设会对第二次读数再给出一组随机的概率。所以测量必须改变态，而且改变后的态要使“再读一次必得同一值”的概率为 1——它只能是所得本征值的本征矢。另一种说法：测量之后我们多知道了一件事（读到了哪个值），描述体系的态理应把这条信息吸收进去。

先看非简并的读数 $a_n$（连续谱留到 §E-2-d）：`}</Tx>
          <Eq n="B-28" say="读到非简并本征值 $a_n$ 后，态从 $\ket\psi$ 突变为相应的本征矢 $\ket{u_n}$。">{R`\ket\psi\ \overset{(a_n)}{\Longrightarrow}\ \ket{u_n}`}</Eq>
          <Tx>{R`“之前”“之后”指的是什么，图 1 画得很清楚：测量把时间轴切成两段。$0$ 到 $t_0$ 之间，态按第六假设从 $\ket{\psi(0)}$ 演化到 $\ket{\psi(t_0)}$——这就是“测量前的态”；在 $t_0$，读数为 $a_n$，态被换成 $\ket{u_n}$；之后以 $\ket{u_n}$ 为新的初值再按第六假设演化，得到 $\ket{\psi'(t_1)}$。“紧接着重测”就是 $t_1\to t_0$ 的极限，此时体系来不及离开 $\ket{u_n}$。`}</Tx>
          <Fig n="1" caption={R`测量把演化切成两段。$0\to t_0$：态按 Schrödinger 方程连续演化到 $\ket{\psi(t_0)}$；$t_0$：测量 $A$ 得到 $a_n$，态突变为 $\ket{u_n}$（不可预言是哪一个 $n$）；$t_0\to t_1$：以 $\ket{u_n}$ 为新的初态继续连续演化。`}><Fig1 /></Fig>
          <Tx>{R`**简并的读数：该变成 $\mathcal E_n$ 里的哪个矢量？** 只要求“重测必得 $a_n$”的话，$\mathcal E_n$ 中任何矢量都行，所以需要更多的规定。最自然、也被实验证实的选择是：保留 $\ket\psi$ 中原本就在 $\mathcal E_n$ 里的那部分，其余丢掉，再归一。用 §B-3-b 的记号，测量前`}</Tx>
          <Eq n="B-29" say="测量前的态按 $A$ 的本征基展开（含简并指标）。">{R`\ket\psi=\sum_n\sum_{i=1}^{g_n}c_n^i\ket{u_n^i}`}</Eq>
          <Tx>{R`测量后`}</Tx>
          <Eq n="B-30" say="读到简并的 $a_n$ 后，只保留 $\mathcal E_n$ 中的分量（相对系数原样不动），再除以其长度归一。">{R`\ket\psi\ \overset{(a_n)}{\Longrightarrow}\ \frac1{\sqrt{\sum_{i=1}^{g_n}|c_n^i|^2}}\sum_{i=1}^{g_n}c_n^i\ket{u_n^i}`}</Eq>
          <Tx>{R`分子就是 \eqref{B-8} 的投影 $\ket{\psi_n}=P_n\ket\psi$，分母是它的长度 $\sqrt{\mathcal P(a_n)}$。于是写成与基无关的形式：`}</Tx>
          <Eq n="B-31" keyEq title="测量后的态（约化）" say="读到 $a_n$ 后的态是 $\ket\psi$ 在 $\mathcal E_n$ 上的投影除以投影的长度——“波包约化”。">{R`\ket\psi\ \overset{(a_n)}{\Longrightarrow}\ \frac{P_n\ket\psi}{\sqrt{\bra\psi P_n\ket\psi}}`}</Eq>
          <Postulate k={5} title="测量使态约化">{R`若对处于 $\ket\psi$ 的体系测量 $\mathcal A$ 而读到 $a_n$，则测量刚结束时体系的态由 $\ket\psi$ 在 $a_n$ 的本征子空间上的投影给出（归一化后）：

$$\ket\psi\ \longrightarrow\ \frac{P_n\ket\psi}{\sqrt{\bra\psi P_n\ket\psi}}.$$`}</Postulate>
          <Tx>{R`三点检查。第一，结果确实是 $A$ 属于 $a_n$ 的本征矢，所以重测必得 $a_n$。第二，它**不是** $\mathcal E_n$ 中随便哪个矢量：测量前各简并分量的相对大小和相对相位被原样带了过来——§C-6-b 会说明这为什么让“制备一个确定的态”变得需要额外的测量。第三，非简并情形应当退化为 \eqref{B-28}。确实，$g_n=1$ 时 \eqref{B-30} 只剩一项：`}</Tx>
          <Eq n="B-32" say="非简并时测量后的态只是 $\ket{u_n}$ 乘上一个相因子，与 $\ket{u_n}$ 是同一物理态。">{R`\frac1{|c_n|}c_n\ket{u_n}=e^{i\mathrm{Arg}(c_n)}\ket{u_n}`}</Eq>
          <Tx>{R`它与 $\ket{u_n}$ 只差整体相因子，按 §B-3-b-$\gamma$ 是同一个物理态。`}</Tx>
          <Fig n="1a" caption={R`**测量模拟器**（交互）。四维态空间中 $A$ 有三个本征值，其中 $a_2=0$ 二重简并。上半部分：对大量处于同一 $\ket\psi$ 的体系各测一次，频率 $\mathcal N(a_n)/N$ 收敛到第四假设给出的 $\mathcal P(a_n)$，样本平均与样本方均根收敛到 $\langle A\rangle$ \eqref{C-4} 与 $\Delta A$ \eqref{C-23}（统计涨落约为 $\sqrt{\mathcal P(1-\mathcal P)/N}$）。下半部分：对**同一个**体系相继测量，体现第五假设——第一次结果随机，之后每次都重复同一结果；结果为简并的 $a_2$ 时，测量后的态保留了两个简并分量原有的相对模与相对相位。`}><MeasureSim /></Fig>
          <Box kind="warning" title="“约化”不是 Schrödinger 演化">{R`第五假设描述的变化是**突变的、不可预言的**（事先不知道读数），并且**不是线性的**（要除以依赖于 $\ket\psi$ 的因子）。这与第六假设的连续、确定、线性的演化截然不同。两种“态的变化”如何协调，正是 §C-3 提到的测量问题的核心。`}</Box>
        </Sub3>
      </Sub>

      <Sub n="B-4" title="Time evolution of systems" zh="体系的时间演化">
        <Tx>{R`最后一个部件是“时间步进规则”。第 I 章 §B-2 对单粒子波函数写过 Schrödinger 方程；把它从波函数提升到右矢，就得到对任何体系适用的形式：`}</Tx>
        <Postulate k={6} title="Schrödinger 方程支配演化">{R`在两次测量之间，态矢量的变化由体系的总能量算符 $H(t)$ 决定：

$$i\hbar\frac{\dd}{\dd t}\ket{\psi(t)}=H(t)\ket{\psi(t)}.$$`}</Postulate>
        <Tx>{R`$H$ 叫作**哈密顿算符**，因为它通常由经典哈密顿量（附录 III）按下面 §B-5 的规则构造。这一行方程的全部推论——确定性、线性、概率守恒、平均值的演化、定态——构成 §D。`}</Tx>
      </Sub>

      <Sub n="B-5" title="Quantization rules" zh="量子化规则">
        <Tx>{R`第二假设说每个物理量对应一个可观测量，却没说**是哪一个**。对于经典力学里本来就有定义的量（能量、角动量……），需要一张“翻译表”。`}</Tx>
        <Sub3 n="B-5-a" title="Statement" zh="陈述">
          <Tx>{R`翻译从最基本的两个量开始。对标量势中的单个无自旋粒子：`}</Tx>
          <Rule id="rule-RP" title="位置与动量的可观测量">{R`粒子的位置 $\mathbf r=(x,y,z)$ 由可观测量 $\mathbf R=(X,Y,Z)$ 描述，动量 $\mathbf p=(p_x,p_y,p_z)$ 由可观测量 $\mathbf P=(P_x,P_y,P_z)$ 描述。`}</Rule>
          <Tx>{R`它们的代数在第 II 章（式 (E-30)）已经算过：`}</Tx>
          <Eq n="B-33" keyEq title="正则对易关系" say="同类分量彼此对易；同一方向的位置与动量的对易子为 $i\hbar$——一切不确定关系的代数根源。">{R`\begin{aligned}&[R_i,R_j]=[P_i,P_j]=0\\&[R_i,P_j]=i\hbar\,\delta_{ij}\end{aligned}`}</Eq>
          <Tx>{R`有了 $\mathbf R$、$\mathbf P$，其他量似乎一步就能得到：任何经典量都是 $\mathcal A(\mathbf r,\mathbf p,t)$，把字母换成算符（算符的函数见补充材料 B$_{\rm II}$）：`}</Tx>
          <Eq n="B-34" say="朴素的量子化：在经典表达式中把 $\mathbf r,\mathbf p$ 换成 $\mathbf R,\mathbf P$。">{R`A(t)=\mathcal A(\mathbf R,\mathbf P,t)`}</Eq>
          <Tx>{R`**这一步藏着陷阱：乘法的次序。** 经典表达式里写成什么顺序都一样，算符可不行。拿最简单的混合乘积来试——同一个经典量既可以写成`}</Tx>
          <Eq n="B-35" say="经典的标量积 $\mathbf r\cdot\mathbf p$。">{R`\mathbf r\cdot\mathbf p=xp_x+yp_y+zp_z`}</Eq>
          <Tx>{R`也可以写成`}</Tx>
          <Eq n="B-36" say="经典上与 $\mathbf r\cdot\mathbf p$ 完全相同的 $\mathbf p\cdot\mathbf r$。">{R`\mathbf p\cdot\mathbf r=p_xx+p_yy+p_zz`}</Eq>
          <Tx>{R`翻译成算符后，由 \eqref{B-33} 两者不再相等，`}</Tx>
          <Eq n="B-37" say="换成算符后两种次序不相等，差别来自 $[X,P_x]=i\hbar$ 等对易子。">{R`\mathbf R\cdot\mathbf P\neq\mathbf P\cdot\mathbf R`}</Eq>
          <Tx>{R`而且哪一个都当不了可观测量——取厄米共轭会把次序倒过来：`}</Tx>
          <Eq n="B-38" say="$\mathbf R\cdot\mathbf P$ 的厄米共轭是 $\mathbf P\cdot\mathbf R$，二者不等，所以 $\mathbf R\cdot\mathbf P$ 不厄米。">{R`(\mathbf R\cdot\mathbf P)^\dagger=(XP_x+YP_y+ZP_z)^\dagger=\mathbf P\cdot\mathbf R`}</Eq>
          <Derivation title={R`$\mathbf R\cdot\mathbf P$ 与 $\mathbf P\cdot\mathbf R$ 到底差多少`} collapsed steps={[
            { tex: R`\mathbf P\cdot\mathbf R=\sum_iP_iR_i=\sum_i\left(R_iP_i-[R_i,P_i]\right)`, why: R`把每一项的次序交换，代价是一个对易子` },
            { tex: R`=\mathbf R\cdot\mathbf P-\sum_ii\hbar\,\delta_{ii}=\mathbf R\cdot\mathbf P-3i\hbar`, why: R`用 \eqref{B-33}；三个方向各贡献 $i\hbar$` },
            { tex: R`\tfrac12(\mathbf R\cdot\mathbf P+\mathbf P\cdot\mathbf R)=\mathbf R\cdot\mathbf P-\tfrac32i\hbar`, why: R`对称化的结果；它的厄米共轭 $=\frac12(\mathbf P\cdot\mathbf R+\mathbf R\cdot\mathbf P)$，即自身` },
          ]} result={R`$\mathbf R\cdot\mathbf P$ 与 $\mathbf P\cdot\mathbf R$ 相差纯虚常数 $3i\hbar$；对称化恰好取了“中间”，得到厄米算符。`} />
          <Tx>{R`出路是取两种次序的平均。对 $\mathbf r\cdot\mathbf p$ 来说就是`}</Tx>
          <Eq n="B-39" keyEq title="对称化规则" say="与经典量 $\mathbf r\cdot\mathbf p$ 对应的可观测量：两种次序取平均，结果厄米。">{R`\frac12(\mathbf R\cdot\mathbf P+\mathbf P\cdot\mathbf R)`}</Eq>
          <Tx>{R`它是自己的厄米共轭。更复杂的乘积照此办理。翻译表因此要加一条注：`}</Tx>
          <Rule id="quantization-rule" title="量子化规则">{R`要得到经典量 $\mathcal A(\mathbf r,\mathbf p,t)$ 的可观测量：先把它的表达式写成对称化的形式，再把其中的 $\mathbf r$、$\mathbf p$ 分别换成 $\mathbf R$、$\mathbf P$。`}</Rule>
          <Tx>{R`这张翻译表有两处边界。其一，有些量子物理量（如自旋）根本没有经典原型，它们直接由可观测量定义，翻译表派不上用场。其二，\eqref{B-33} 这样简单的形式只在**直角坐标**中成立；用球坐标等其他坐标时不能想当然地写 $[r,p_r]=i\hbar$ 然后照搬。`}</Tx>
        </Sub3>

        <Sub3 n="B-5-b" title="Important examples" zh="重要的例子">
          <Para g="alpha">标量势中粒子的哈密顿量</Para>
          <Tx>{R`对电荷 $q$、质量 $m$ 的无自旋粒子，电场由标量势 $U(\mathbf r)$ 描述，势能 $V(\mathbf r)=qU(\mathbf r)$。经典哈密顿量（附录 III 式 (29)）`}</Tx>
          <Eq n="B-40" say="标量势中粒子的经典哈密顿量：动能加势能。">{R`\mathcal H(\mathbf r,\mathbf p)=\frac{\mathbf p^2}{2m}+V(\mathbf r)`}</Eq>
          <Tx>{R`中的动量就是机械动量，`}</Tx>
          <Eq n="B-41" say="无磁场时，与 $\mathbf r$ 共轭的动量就是 $m\mathbf v$。">{R`\mathbf p=m\frac{\dd\mathbf r}{\dd t}=m\mathbf v`}</Eq>
          <Tx>{R`这里翻译毫无歧义：$\mathbf P^2=P_x^2+P_y^2+P_z^2$ 只含动量，$V(\mathbf R)$ 只含位置，没有需要排序的混合乘积。`}</Tx>
          <Eq n="B-42" keyEq title="标量势中粒子的哈密顿算符" say="哈密顿算符等于动能算符 $\mathbf P^2/2m$ 加势能算符 $V(\mathbf R)$。">{R`H=\frac{\mathbf P^2}{2m}+V(\mathbf R)`}</Eq>
          <Tx>{R`（$V(\mathbf R)$ 的含义见补充材料 B$_{\rm II}$ §4。）第六假设因此具体化为`}</Tx>
          <Eq n="B-43" say="标量势中粒子的 Schrödinger 方程（右矢形式）；投影到位置表象就是第 I 章的波动方程。">{R`i\hbar\frac{\dd}{\dd t}\ket{\psi(t)}=\left[\frac{\mathbf P^2}{2m}+V(\mathbf R)\right]\ket{\psi(t)}`}</Eq>

          <Para g="beta">矢势中粒子的哈密顿量</Para>
          <Tx>{R`有磁场时情况更微妙。经典哈密顿量（附录 III 式 (66)）`}</Tx>
          <Eq n="B-44" say="电磁场中的经典哈密顿量：动能项里 $\mathbf p$ 被 $\mathbf p-q\mathbf A$ 取代，再加 $qU$。">{R`\mathcal H(\mathbf r,\mathbf p)=\frac1{2m}\left[\mathbf p-q\mathbf A(\mathbf r,t)\right]^2+qU(\mathbf r,t)`}</Eq>
          <Tx>{R`里的 $\mathbf p$ 已经不是机械动量了：`}</Tx>
          <Eq n="B-45" say="有矢势时，正则动量 $\mathbf p$ 比机械动量 $m\mathbf v$ 多出 $q\mathbf A$。">{R`\mathbf p=m\frac{\dd\mathbf r}{\dd t}+q\mathbf A(\mathbf r,t)=m\mathbf v+q\mathbf A(\mathbf r,t)`}</Eq>
          <Tx>{R`$\mathbf A$ 只依赖于位置和参数 $t$，翻译成 $\mathbf A(\mathbf R,t)$ 不成问题；而 $[\mathbf P-q\mathbf A]^2$ 作为一个厄米算符的平方，本身就是厄米的，展开时自动出现对称化的组合 $\mathbf P\cdot\mathbf A+\mathbf A\cdot\mathbf P$。于是`}</Tx>
          <Eq n="B-46" keyEq title="电磁场中粒子的哈密顿算符" say="电磁场中的哈密顿算符：$\mathbf P-q\mathbf A(\mathbf R,t)$ 的平方除以 $2m$，再加势能。">{R`H(t)=\frac1{2m}\left[\mathbf P-q\mathbf A(\mathbf R,t)\right]^2+V(\mathbf R,t)`}</Eq>
          <Eq n="B-47" say="势能算符是电荷乘标量势算符。">{R`V(\mathbf R,t)=qU(\mathbf R,t)`}</Eq>
          <Tx>{R`相应的 Schrödinger 方程：`}</Tx>
          <Eq n="B-48" say="电磁场中粒子的 Schrödinger 方程。">{R`i\hbar\frac{\dd}{\dd t}\ket{\psi(t)}=\left\{\frac1{2m}\left[\mathbf P-q\mathbf A(\mathbf R,t)\right]^2+V(\mathbf R,t)\right\}\ket{\psi(t)}`}</Eq>
          <Tx>{R`**易错点：$\mathbf P$ 翻译的是哪个动量？** 是正则动量 $\mathbf p$，不是 $m\mathbf v$。速度另有自己的算符，`}</Tx>
          <Eq n="B-49" say="速度算符：机械动量 $\mathbf P-q\mathbf A$ 除以质量。">{R`\boldsymbol{\mathcal{V}}=\frac1m(\mathbf P-q\mathbf A)`}</Eq>
          <Tx>{R`用它写，哈密顿量又回到熟悉的“动能 + 势能”：`}</Tx>
          <Eq n="B-50" say="用速度算符表示，哈密顿量仍是动能加势能。">{R`H(t)=\frac12m\boldsymbol{\mathcal{V}}^2+V(\mathbf R,t)`}</Eq>
          <Box kind="warning" title={R`正则动量 $\mathbf p$ 与机械动量 $m\mathbf v$`}>{R`满足正则对易关系 \eqref{B-33} 的是 $\mathbf P$（正则动量），而不是 $m\boldsymbol{\mathcal V}$。可以验证速度的分量在磁场中彼此**不**对易：$[\mathcal V_x,\mathcal V_y]=i\hbar qB_z/m^2$——磁场让速度的各分量互不相容。`}</Box>
        </Sub3>
      </Sub>
    </Sec>);
}
