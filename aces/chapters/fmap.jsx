// 公式树图样例：面积 = 重要性。组件见 framework/app/src/kit/paper/fmap.jsx。
import { PaperPage, PaperSec, FormulaMap, Tx, P } from "@kit";
import { NOTATION } from "./_method_notation.js";
import "./_paper_kit.jsx";

const R = String.raw;

export const meta = {
  id: "fmap", no: 0, label: "公式树图样例",
  title_zh: "公式树图：面积按重要性分配", title_en: "Formula treemap — a sample",
  tldr: R`公式的排版面积由字号决定，和重要性无关：最关键的撇号印得最小，最不要紧的修正项印得最大。公式树图把讲解从公式身上拿下来，单独画成一张 treemap——**嵌套就是公式的结构，面积就是重要性**。`,
  one_liner: "面积按重要性分配的公式结构图",
};
export const notation = NOTATION;
export const concepts = [];

// 根节点是关系符（= / ≈），两个子节点是左右两边。公式由树生成，见组件文件顶部的说明。
const M7 = {
  n: "7", title: "错误概率 → Pauli 本征值", height: 420,
  tree: {
    id: "eq", tex: R`#lhs=#sum`, name: "equals", label: "左边能直接测，右边是要刻画的噪声：测一个，就约束了全部错误概率", role: "const",
    note: R`这个等号就是 Walsh–Hadamard 变换：错误概率和 Pauli 本征值是同一组信息的两种写法，知道一边就能算出另一边。`,
    kids: [
      { id: "lhs", tex: R`#lam_{#ap}`, glyph: R`\lambda_{\square}`, name: "eigenvalue[probe]", label: "左边：能直接测的量", role: "result",
        note: R`被测 Pauli $\boldsymbol a'$ 的本征值，整体是一个实验上能读出来的数。`,
        kids: [
          { id: "lam", tex: R`\lambda`, w: 3, name: "eigenvalue", label: "被测 Pauli 存活的程度", role: "result", note: R`接近 1 表示噪声对这个 Pauli 几乎没有影响。它是实验里能直接测到的量。` },
          { id: "ap", tex: R`\boldsymbol a'`, w: 5, name: "probe", label: "撇号 = 用来探测的 Pauli", role: "known", note: R`**全式最容易看漏的一笔。**带撇的 $\boldsymbol a'$ 是我们拿来探测的 Pauli，不带撇的 $\boldsymbol a$ 是可能发生的错误。印出来只差一个撇，意思完全不同。` },
        ] },
      { id: "sum", tex: R`\sum_{#range}#body`, name: "sum(errors)", label: "右边：所有错误的带号加和", role: "const",
        note: R`只是"全部加起来"，没有额外的信息。$\sum$ 印得最大，分量却最小，所以它只占一条标题。`,
        kids: [
          { id: "range", tex: R`\boldsymbol a\in\mathbf P^n`, w: 1, name: "for error in all_paulis", label: "遍历全部 4ⁿ 种错误", role: "const", note: R`$\boldsymbol a$ 取遍 $n$ 比特上的全部 $4^n$ 个 Pauli，每一个都是一种可能发生的错误。` },
          { id: "body", tex: R`#sign\,#p`, glyph: R`\times`, name: "sign × prob", label: "每种错误的贡献：符号 × 概率", role: "const",
            note: R`一项的含义：错误 $\boldsymbol a$ 以概率 $p_{\boldsymbol a}$ 发生，并按它是否与探测 Pauli 反对易，给读数记正或记负。`,
            kids: [
              { id: "sign", tex: R`#base^{#om}`, glyph: R`\square^{\square}`, name: "(-1)^anticommutes", label: "这个错误让读数翻号吗", role: "const",
                note: R`把 $\omega$ 的 0/1 变成 $+1/-1$：对易的错误记正，反对易的错误记负。`,
                kids: [
                  { id: "base", tex: R`(-1)`, w: 1.5, name: "-1", label: "底数：负一", role: "const", note: R`底数只负责把上标的 0/1 翻译成正负号。` },
                  { id: "om", tex: R`\omega(\boldsymbol a,\boldsymbol a')`, w: 7, name: "anticommutes(error, probe)", label: "对易记 0，反对易记 1 —— 整条式子的物理全在这里", role: "const", note: R`辛内积。它藏在上标里、印得最小，却决定了整条式子的含义：**只有和被测 Pauli 反对易的错误才会翻转读数**，对易的错误对这个本征值毫无影响。` },
                ] },
              { id: "p", tex: R`p_{\boldsymbol a}`, w: 4, name: "prob[error]", label: "要刻画的错误概率", role: "unknown", note: R`门噪声的真实描述，也是我们最终想知道的东西：错误 $\boldsymbol a$ 发生的概率。` },
            ] },
        ] },
    ],
  },
};

const M15 = {
  n: "15", title: "电路本征值 = 门本征值之积", height: 460,
  tree: {
    id: "eq", tex: R`#lhs=#pu`, name: "equals", label: "能测的整条电路 = 要解的各个门：这个等号让问题可解", role: "const",
    note: R`取对数后，右边的连乘变成求和，整条式子就成了关于门本征值的线性方程，ACES 正是靠它解出未知数。`,
    kids: [
      { id: "lhs", tex: R`#Lam_{#T,#a}`, glyph: R`\Lambda_{\square,\square}`, name: "circuit_eigenvalue[tuple, pauli]", label: "左边：一条电路的衰减", role: "known",
        note: R`一个重排电路 $T$ 和一个 Pauli $\boldsymbol a$ 确定一个能测的数。`,
        kids: [
          { id: "Lam", tex: R`\Lambda`, w: 3, name: "circuit_eigenvalue", label: "大写 Λ：能测", role: "known", note: R`**大写是电路，小写是单个门。**一个字母的大小写之差，就是"能测的"与"要求的"之差。` },
          { id: "T", tex: R`T`, w: 1, name: "tuple", label: "哪条重排电路", role: "design", note: R`$T$ 是实验设计选定的层序列，决定这个方程里出现哪些门。` },
          { id: "a", tex: R`\boldsymbol a`, w: 1, name: "pauli", label: "初始 Pauli", role: "design", note: R`电路开始时制备的 Pauli。` },
        ] },
      { id: "pu", tex: R`\prod_{#urange}#pj`, name: "for layer in circuit", label: "右边：沿电路一层层乘", role: "const",
        note: R`外层连乘沿电路逐层前进。`,
        kids: [
          { id: "urange", tex: R`u\in[L]`, w: 1, name: "layer index", label: "第 u 层", role: "const", note: R`$u$ 取遍 $T$ 的 $L$ 层。` },
          { id: "pj", tex: R`\prod_{#jrange}#lam`, name: "for gate in layer", label: "这一层的每个门", role: "const",
            note: R`内层连乘遍历第 $u$ 层里的所有门。`,
            kids: [
              { id: "jrange", tex: R`j\in[k_{T_u}]`, w: 1, name: "gate index", label: "第 j 个门", role: "const", note: R`$k_{T_u}$ 是第 $u$ 层的门数。` },
              { id: "lam", tex: R`#lamb_{#gate,\,#au}`, glyph: R`\lambda_{\square,\square}`, name: "gate_eigenvalue[gate, pauli]", label: "连乘的每一项", role: "unknown",
                note: R`某个门在它实际看到的 Pauli 上的本征值。`,
                kids: [
                  { id: "lamb", tex: R`\lambda`, w: 4, name: "gate_eigenvalue", label: "小写 λ：要解的未知数", role: "unknown", note: R`ACES 要解出来的就是它们。取对数后乘积变成求和，整条式子就成了线性方程。` },
                  { id: "gate", tex: R`T_uj`, w: 2, name: "layer[u].gates[j]", label: "第 u 层的第 j 个门", role: "const", note: R`指明这个因子属于电路里的哪个门。` },
                  { id: "au", tex: R`\boldsymbol a^{(u)}`, w: 6, name: "pauli_at_step_u", label: "下标里的上标：走到第 u 层时的 Pauli —— 漏看就列错方程", role: "known", note: R`**全式最容易忽略的地方：一个下标里的上标。**Pauli 每经过一层都会被门变换，所以同一个门在不同位置"看到"的 Pauli 不同；乘进去的是**进入**第 $u$ 层时的那一个，而不是最初的 $\boldsymbol a$。` },
                ] },
            ] },
        ] },
    ],
  },
};

const M28 = {
  n: "28", title: "性能指标：实验之前预言精度", height: 480,
  tree: {
    id: "eq", tex: R`#lhs\approx#rhs`, name: "approx", label: "约等号：省略了高阶小量，换来实验前就能算", role: "const",
    note: R`这里是约等号而不是等号：右边是把误差分布近似之后的结果。正因为有这个近似，左边的指标才不需要做实验就能估出来。`,
    kids: [
      { id: "lhs", tex: R`#F(#T,#G\,|\,#C,#lam)`, glyph: R`\square(\square,\square\,|\,\square,\square)`, name: "figure_of_merit(design | circuit, noise)", label: "左边：给一套设计打分", role: "result",
        note: R`竖线左边是可以自己选的实验设计，右边是给定的电路和噪声猜测。`,
        kids: [
          { id: "F", tex: R`\mathcal F`, w: 4, name: "figure_of_merit", label: "越小越准；实验前就能算", role: "result", note: R`平均每个门参数的估计误差，按机时归一化。**它在做实验之前就能算出来**——这是全文最重要的性质：可以先比较设计、再花机时。` },
          { id: "T", tex: R`\mathcal T`, w: 1.5, name: "circuits", label: "跑哪些电路", role: "design", note: R`实验设计的一半：选哪些 tuple 对应的电路来跑。` },
          { id: "G", tex: R`\Gamma`, w: 1.5, name: "shots", label: "各测多少次", role: "design", note: R`实验设计的另一半：测量次数如何分配给各条电路。` },
          { id: "C", tex: R`\mathcal C`, w: 1, name: "circuit", label: "给定的电路", role: "known", note: R`要刻画的电路本身，不能改动。` },
          { id: "lam", tex: R`\boldsymbol\lambda`, w: 1, name: "noise_guess", label: "噪声猜测", role: "known", note: R`门本征值的粗略猜测，用来计算协方差。不需要很准。` },
        ] },
      { id: "rhs", tex: R`#norm\,#main\,#corr`, glyph: R`\times`, name: "per_param × total × fix", label: "右边：三个因子相乘", role: "const",
        note: R`主项决定大小，归一化让不同设计可比，修正项几乎等于 1。`,
        kids: [
          { id: "main", tex: R`\sqrt{\operatorname{tr}(#Sig)}`, name: "total_error", label: "主项：真正决定精度", role: "const", note: R`**决定精度的就是这一项。**协方差矩阵的迹是所有参数方差之和，开方就是总误差的量级。`,
            kids: [{ id: "Sig", tex: R`\Sigma`, w: 5, name: "predicted_covariance(design)", label: "协方差：由设计与噪声猜测算出，不用做实验", role: "known", note: R`估计量的协方差矩阵。只需要电路结构、实验设计和一个粗略的噪声猜测，就能在实验前算出来。` }] },
          { id: "norm", tex: R`\sqrt{#S/#N}`, name: "per_param_time", label: "归一化：换算成每参数、每机时", role: "const", note: R`乘上 $\sqrt{S'/N}$ 之后，不同规模、不同设计的 $\mathcal F$ 可以直接比较。`,
            kids: [
              { id: "S", tex: R`S'`, w: 3, name: "time_cost", label: "撇：按电路时长折算的样本数", role: "design", note: R`$S$ 是测量次数，**带撇**的 $S'$ 是按电路时长折算后的次数——长电路更贵。又是一个撇号决定了含义：比较设计时比的是机时，不是次数。` },
              { id: "N", tex: R`N`, w: 1, name: "n_params", label: "参数个数", role: "const", note: R`被估计的门本征值总数。` },
            ] },
          { id: "corr", tex: R`\left(1-\frac{1}{4}\frac{\operatorname{tr}(\Sigma^2)}{\operatorname{tr}(\Sigma)^2}\right)`, w: 0.8, name: "tiny_fix  # ≈ 1", label: "小修正，通常可忽略", role: "const", note: R`来自平方根的凹性。误差分摊在大量参数上时 $\operatorname{tr}\Sigma^2\ll(\operatorname{tr}\Sigma)^2$，这个括号几乎等于 1。**原式里它占的地方最大，在这张图里它只占一小角。**` },
        ] },
    ],
  },
};

export default function FMap() {
  return (
    <PaperPage meta={meta} notation={notation} keyEquations={false}>
      <PaperSec role="background" title="思路：把讲解从公式身上拿下来">
        <P w={3} label="排版面积 ≠ 重要性">公式里每个符号占多大地方由字号决定，和它重不重要无关：决定含义的撇号、下标里的上标印得最小，只做小修正的大括号印得最大。</P>
        <Tx>{R`所以这里不在公式周围加任何标注，公式本身保持原样、干净地显示。讲解单独画成下面那张**树图**：公式完整地展开成一棵树：最外层是等号或约等号，往里是左边和右边，再到各个因子和符号，公式里的每个记号都属于某个节点。叶子的**面积按重要性分配**，块里写着放大的符号、一个像代码变量那样的名字，以及一句话含义。鼠标停在叶子或父块的标题上，原式里对应的部分会亮起来；点一下，下方固定显示完整说明，还能顺着路径回到上一层。`}</Tx>
      </PaperSec>
      <PaperSec role="solution" title="样例 1：最小的上标，最大的一块">
        <FormulaMap {...M7} start="om" />
      </PaperSec>
      <PaperSec role="solution" title="样例 2：下标里的上标">
        <FormulaMap {...M15} start="au" />
      </PaperSec>
      <PaperSec role="solution" title="样例 3：看着最复杂的一项，只占一小角">
        <FormulaMap {...M28} start="corr" />
      </PaperSec>
    </PaperPage>);
}
