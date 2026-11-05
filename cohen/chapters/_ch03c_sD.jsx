// 补充材料 D_III：只涉及体系一部分的测量（式 DIII-1 … DIII-16）
// 讲法：用"只看两个电子中的一个"这个具体问题引入；先给出算概率、算测后态的一般公式，再分别读出"积态"与"非积态"的物理含义，最后落到关联与 EPR。
import { Sec, Sub, Tx, Eq, FormulaMap, Box, C } from "@kit";
import { FM_DIII_9 } from "./_ch03c_fmaps.jsx";

const R = String.raw;
const X2 = R`\sym{chi2}{\chi}`;   // 子体系 (2) 的态 |χ(2)⟩（与 H_III 的规范函数 χ 区分）

export function SecD() {
  return (
    <Sec n="DIII" title="Measurements bearing on only one part of a physical system" zh="只涉及体系一部分的测量"
      gist={R`只测子体系 (1) 时，可观测量是延拓 $\tilde A(1)=A(1)\otimes\mathbb 1(2)$，投影算符是 $\tilde P_n(1)=P_n(1)\otimes\mathbb 1(2)$；概率与测后态由此照第 III 章的公式算出，且与 $\mathscr E(2)$ 中基的选取无关。积态意味着两部分不关联；非积态意味着关联，此时子体系 (1) 不再有自己的态矢。`}
      why={R`实际的物理体系几乎都曾与别的体系相互作用过，而我们通常只观测其中一部分。把第 III 章的假设用到复合体系上，就会自然遇到"关联"、"子体系没有态矢"这些概念——它们是密度算符（$\mathrm E_{\rm III}$）和 EPR 讨论的起点。`}
      gives={["DIII-3", "DIII-7", "DIII-9", "DIII-14", "DIII-16"]}>
      <p className="muted">本节概念：<C id="correlation" /></p>
      <Tx>{R`**场景。**两个电子组成的体系，波函数是六个变量的函数 $\psi(x_1,y_1,z_1;x_2,y_2,z_2)$，对应 $\mathscr E_{\mathbf r}(1)\otimes\mathscr E_{\mathbf r}(2)$ 中的右矢（\IIsec{F-4}）。现在我们只测量电子 (1) 的某个物理量，对电子 (2) 不闻不问。问题是：(a) 各个结果的概率是多少？(b) 测量之后整个体系处在什么态？(c) 能不能干脆说"电子 (1) 处在某个态"？

一般地，体系由两部分 (1)、(2) 组成，态空间分别为 $\mathscr E(1)$、$\mathscr E(2)$，整体的态空间是张量积 $\mathscr E(1)\otimes\mathscr E(2)$（\IIsec{F}）。`}</Tx>

      <Sub n="DIII-1" title="Calculation of the physical predictions" zh="概率与测后态的计算">
        <Tx>{R`**只测 (1) 的可观测量。**它在整体空间里的算符是 $\mathscr E(1)$ 中算符 $A(1)$ 的延拓（\IIsec{F-2}）——对 (2) 什么也不做：`}</Tx>
        <Eq n="DIII-1" say="只作用于子体系 (1) 的可观测量，在整体空间中延拓为它与 (2) 的单位算符的张量积。">{R`A(1)\Longrightarrow\tilde A(1)=A(1)\otimes\mathbb 1(2)`}</Eq>
        <Tx>{R`（本节刻意区分 $A(1)$ 与它的延拓 $\tilde A(1)$。）

**一个小例子先看清楚"简并"从哪来。**设 (1)、(2) 都是两能级体系，基为 $\ket\pm$，$A(1)$ 在 $\mathscr E(1)$ 中以 $\ket+$、$\ket-$ 为非简并本征矢。在四维的整体空间里，"(1) 处于 $\ket+$"的态有一整个二维平面：$\ket+\otimes(\alpha\ket++\beta\ket-)$，$\alpha$、$\beta$ 任意。所以 $\tilde A(1)$ 的谱虽然与 $A(1)$ 相同，每个本征值却是二重简并的——简并度就是 $\mathscr E(2)$ 的维数，它来自我们对 (2) 什么也没问。后果是：只知道"测得 $a_n$"并不能定出测后的整体态，那个平面里究竟落在哪一点，要由测量前的态来决定。下面的公式正是把这件事算清楚。

**构造投影算符。**设 $A(1)$ 的本征值 $a_n$ 在 $\mathscr E(1)$ 中有 $g_n$ 个正交归一本征矢 $\ket{u_n^i(1)}$，对应的投影算符为`}</Tx>
        <Eq n="DIII-2" say="子体系 (1) 中到本征值 $a_n$ 的本征子空间的投影算符，由 $g_n$ 个正交归一本征矢构成。">{R`P_n(1)=\sum_{i=1}^{g_n}\ket{u_n^i(1)}\bra{u_n^i(1)}`}</Eq>
        <Tx>{R`整体空间中同一本征值的投影算符就是它的延拓：`}</Tx>
        <Eq n="DIII-3" keyEq title="延拓的投影算符" say="整体空间中对应同一结果的投影算符，是子体系 (1) 的投影算符与 (2) 的单位算符的张量积。">{R`\tilde P_n(1)=P_n(1)\otimes\mathbb 1(2)`}</Eq>
        <Tx>{R`为了能在具体基中计算，把 $\mathbb 1(2)$ 用 $\mathscr E(2)$ 的**任意**一组正交归一基 $\{\ket{v_k(2)}\}$ 的封闭关系写出来：`}</Tx>
        <Eq n="DIII-4" say="子体系 (2) 的单位算符可以用它的任意一组正交归一基的封闭关系表示。">{R`\mathbb 1(2)=\sum_k\ket{v_k(2)}\bra{v_k(2)}`}</Eq>
        <Eq n="DIII-5" say="延拓的投影算符等于对 (1) 的本征矢与 (2) 的全部基矢构成的积态求和的投影。">{R`\tilde P_n(1)=\sum_{i=1}^{g_n}\sum_k\ket{u_n^i(1)v_k(2)}\bra{u_n^i(1)v_k(2)}`}</Eq>
        <Tx>{R`**(a) 概率。**设整体的态 $\ket\psi$ 已归一化。第 III 章的一般公式 \mainref{B-14} 在这里给出`}</Tx>
        <Eq n="DIII-6" say="测 (1) 得 $a_n$ 的概率，是整体态中延拓投影算符的平均值。">{R`\mathcal P^{(1)}(a_n)=\braket{\psi|\tilde P_n(1)|\psi}`}</Eq>
        <Eq n="DIII-7" keyEq title="只测一部分时的概率" say="只测 (1) 得到 $a_n$ 的概率，是把整体态向所有“(1) 的相应本征矢乘以 (2) 的任意基矢”投影后的模方之和——对 (2) 的所有可能性求和。">{R`\mathcal P^{(1)}(a_n)=\sum_{i=1}^{g_n}\sum_k\left|\braket{u_n^i(1)v_k(2)|\psi}\right|^2`}</Eq>
        <Tx>{R`对 $k$ 求和的含义一目了然：我们不关心 (2) 处于哪个 $\ket{v_k(2)}$，所以把所有可能性的概率加起来。

**(b) 测后态。**按 \mainref{B-31}（第五假设），测量后的态是投影后再归一化：`}</Tx>
        <Eq n="DIII-8" say="测得 $a_n$ 后，整体的态是测量前的态经延拓投影算符投影再归一化。">{R`\ket{\psi'}=\frac{\tilde P_n(1)\ket\psi}{\sqrt{\braket{\psi|\tilde P_n(1)|\psi}}}`}</Eq>
        <FormulaMap n="DIII-9" say="把延拓投影算符展开后，测后态是若干积态的叠加，系数取自测量前的态，分母保证归一化。" tree={FM_DIII_9} start="psi" />
        <Tx>{R`**三点观察。**

*(i) 与 (2) 的基无关。*\eqref{DIII-3}、\eqref{DIII-6}、\eqref{DIII-8} 中根本没有出现 $\{\ket{v_k(2)}\}$——它只是计算时的脚手架。物理上也应如此：不对 (2) 做测量，(2) 的任何一组态都不该有特殊地位。

*(ii) 积态进、积态出，(2) 不受影响。*若测量前是积态`}</Tx>
        <Eq n="DIII-10" say="测量前整体处于积态：子体系 (1) 在 $\ket{\varphi(1)}$，子体系 (2) 在 $\ket{\sym{chi2}{\chi}(2)}$。">{R`\ket\psi=\ket{\varphi(1)}\otimes\ket{${X2}(2)}`}</Eq>
        <Tx>{R`（两者均已归一化），则 $\tilde P_n(1)$ 只作用于第一个因子，由 \eqref{DIII-3}、\eqref{DIII-8} 立即得到`}</Tx>
        <Eq n="DIII-11" say="测后态仍是积态，子体系 (2) 的因子原封不动。">{R`\ket{\psi'}=\ket{\varphi'(1)}\otimes\ket{${X2}(2)}`}</Eq>
        <Eq n="DIII-12" say="子体系 (1) 的态按通常的第五假设在 $\mathscr E(1)$ 中投影并归一化。">{R`\ket{\varphi'(1)}=\frac{P_n(1)\ket{\varphi(1)}}{\sqrt{\braket{\varphi(1)|P_n(1)|\varphi(1)}}}`}</Eq>
        <Tx>{R`(1) 的态按第五假设变了，(2) 的态完全没变。

*(iii) 对 (1) 做完全测量后，整体一定是积态。*如果 $a_n$ 在 $\mathscr E(1)$ 中非简并（更一般地，$A(1)$ 代表 $\mathscr E(1)$ 的一组 ECOC），指标 $i$ 就不再需要，\eqref{DIII-9} 可以整理成一个积：`}</Tx>
        <Eq n="DIII-13" keyEq title="完全测量后的积态" say="对子体系 (1) 做完全测量后，无论之前状态如何，整体态都变成 (1) 的本征态与 (2) 的某个态的乘积。">{R`\ket{\psi'}=\ket{u_n(1)}\otimes\ket{{${X2}}'(2)}`}</Eq>
        <Eq n="DIII-14" keyEq title="子体系 (2) 被“定下”的态" say="测后 (2) 的态由测量前的整体态与 (1) 的测量结果共同决定。">{R`\ket{{${X2}}'(2)}=\frac{\displaystyle\sum_k\ket{v_k(2)}\braket{u_n(1)v_k(2)|\psi}}{\sqrt{\displaystyle\sum_k\left|\braket{u_n(1)v_k(2)|\psi}\right|^2}}`}</Eq>
        <Tx>{R`也就是说：对 (1) 是**完全**的测量（虽然对整体只是部分测量），不论之前整体处在什么态，都会把它变成积态。这个结论下面要用两次。`}</Tx>
      </Sub>

      <Sub n="DIII-2" title="Physical meaning of a tensor product state" zh="积态的物理意义：互不关联">
        <Tx>{R`取积态 \eqref{DIII-10}，用 \eqref{DIII-6} 和 \eqref{DIII-3} 算 (1) 的测量概率：`}</Tx>
        <Eq n="DIII-15" say="积态下测 (1) 得 $a_n$ 的概率，写成整体积态中延拓投影算符的平均值。">{R`\mathcal P^{(1)}(a_n)=\braket{\varphi(1)${X2}(2)|P_n(1)\otimes\mathbb 1(2)|\varphi(1)${X2}(2)}`}</Eq>
        <Tx>{R`算符与态都分解成两个因子，平均值也就分解；$\ket{${X2}(2)}$ 归一化使第二个因子等于 1：`}</Tx>
        <Eq n="DIII-16" keyEq title="积态下的局部预言" say="积态下关于 (1) 的一切预言只依赖 $\ket{\varphi(1)}$，与 (2) 处在什么态毫无关系。">{R`\begin{aligned}\mathcal P^{(1)}(a_n)&=\braket{\varphi(1)|P_n(1)|\varphi(1)}\braket{${X2}(2)|\mathbb 1(2)|${X2}(2)}\\&=\braket{\varphi(1)|P_n(1)|\varphi(1)}\end{aligned}`}</Eq>
        <Tx>{R`**含义：两个各自的实验碰巧放在一起。**上式说，关于 (1) 的预言只用到 $\ket{\varphi(1)}$，(2) 处在什么态完全不进入；反过来亦然。还可以更进一步检验"独立"：同时测 (1) 的 $A(1)$ 与 (2) 的某个 $\sym{obsB}{B}(2)$，联合概率是 $\braket{\varphi\,${X2}|P_n(1)\otimes Q_m(2)|\varphi\,${X2}}=\braket{\varphi|P_n|\varphi}\braket{${X2}|Q_m|${X2}}$（$Q_m$ 为 $\sym{obsB}{B}(2)$ 的投影算符），正好是两个边缘概率之积——两组测量结果是统计独立的随机变量，即两部分**不关联**。什么样的物理过程给出这种态？两个体系各自制备、合到一起时彼此不发生相互作用。`}</Tx>
      </Sub>

      <Sub n="DIII-3" title="Physical meaning of a state that is not a tensor product" zh="非积态：关联，以及子体系为何没有态矢">
        <Tx>{R`**关联。**若 $\ket\psi$ 不能写成 $\ket{\varphi(1)}\otimes\ket{${X2}(2)}$，就找不到一个只属于 (1) 的右矢来概括关于 (1) 的预言，只能回到一般公式 \eqref{DIII-6}–\eqref{DIII-7}。这种态一般意味着两部分的测量结果**关联**（不独立）。可以证明，两个体系一旦相互作用，原来的积态一般会变成非积态：**相互作用产生关联**。

**一个具体的例子。**设 (1)、(2) 各有两个正交态 $\ket +$、$\ket -$，整体处于

$$\ket\psi=\frac1{\sqrt2}\big(\ket{+}\otimes\ket{-}-\ket{-}\otimes\ket{+}\big).$$

测 (1) 得 $+$ 或 $-$ 的概率都是 $1/2$（由 \eqref{DIII-7}）；若得 $+$，由 \eqref{DIII-14}，(2) 随即处于 $\ket -$，反之亦然。单看任一方，结果是完全随机的；两边一对照，结果严格相反。这个态无法写成积，也不存在一个"(1) 自己的态矢"能复现 (1) 的统计——任何纯态 $\alpha\ket++\beta\ket-$ 都会在某个方向上给出确定结果，而这里 (1) 在**任何**方向上都是一半对一半。

**子体系的描述：密度算符。**这个问题非常普遍：几乎每个体系过去都与别的体系相互作用过，因此"它 + 曾与它作用的体系"整体一般处于非积态，单独的它没有态矢。解决办法是放弃用右矢描述子体系，改用一个**算符**——密度算符；具体做法是 $\mathrm E_{\rm III}$ §5-b 的**部分迹**。

**测量会"用掉"关联。**回到上面的例子：测 (1) 得到 $+$ 之后，整体变成 $\ket+\otimes\ket-$——一个积态。这正是 §1 观察 (iii) 的特例：对 (1) 做一组完全测量，不论之前整体如何纠缠，测后一定是积态，(1) 重新拥有自己的态矢（所测 ECOC 的共同本征矢）。过去相互作用留下的关联，在这一刻被测量兑现并抹去了；如果 (2) 此时早已远离、不再与 (1) 作用，之后研究 (1) 就可以完全不管 (2)。`}</Tx>
        <Box kind="physics" title="EPR 的种子">{R`仍有一件事令人不安：测后 (2) 的态 \eqref{DIII-14} 一般**依赖于对 (1) 的测量结果**（积态时则不然，见 §1 观察 (ii)）。于是，对一个可能相距任意远、早已不再相互作用的体系 (1) 做测量，(2) 的量子态就随结果而定——上面的例子里，(1) 得 $+$ 则 (2) 为 $\ket -$。这就是与 Einstein、Podolsky、Rosen 的名字联系在一起的"佯谬"，第 XXI 章 §F-1 详细讨论。要强调的是：单看 (2) 的测量统计，无论对 (1) 测了什么、得了什么，(2) 的统计都不变（这一点在 $\mathrm E_{\rm III}$ 用约化密度算符看得最清楚），所以不能用它来超光速传递信息。`}</Box>
      </Sub>
    </Sec>);
}
