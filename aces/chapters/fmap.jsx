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

const M7 = {
  n: "7", title: "错误概率 → Pauli 本征值", height: 400,
  tex: R`\mk{lam}{\lambda_{\mk{ap}{\boldsymbol a'}}}=\mk{rhs}{\mk{sum}{\sum_{\boldsymbol a\in\mathbf P^n}}\mk{sign}{(-1)^{\mk{om}{\omega(\boldsymbol a,\boldsymbol a')}}}\,\mk{p}{p_{\boldsymbol a}}}`,
  nodes: [
    { id: "lhs", w: 0, name: "eigenvalue", label: "左边：能直接测的量", glyph: R`\lambda_{\boldsymbol a'}`, role: "result" },
    { id: "lam", parent: "lhs", w: 3, name: "eigenvalue", label: "被测 Pauli 存活的程度", glyph: R`\lambda`, role: "result", note: R`接近 1 表示噪声对这个 Pauli 几乎没有影响。它是实验里能直接测到的量。` },
    { id: "ap", parent: "lhs", w: 5, name: "probe", label: "撇号 = 用来探测的 Pauli", glyph: R`\boldsymbol a'`, role: "known", note: R`**全式最容易看漏的一笔。**带撇的 $\boldsymbol a'$ 是我们拿来探测的 Pauli，不带撇的 $\boldsymbol a$ 是可能发生的错误。印出来只差一个撇，意思完全不同。` },
    { id: "rhs", w: 0, name: "Σ ±p", label: "右边：所有错误的带号加和", glyph: R`\textstyle\sum(-1)^{\omega}p`, role: "const" },
    { id: "om", parent: "rhs", w: 7, name: "anticommutes(error, probe)", label: "对易记 0，反对易记 1 —— 整条式子的物理全在这里", glyph: R`\omega(\boldsymbol a,\boldsymbol a')`, role: "const", note: R`辛内积。它藏在上标里、印得最小，却决定了整条式子的含义：**只有和被测 Pauli 反对易的错误才会翻转读数**，对易的错误对这个本征值毫无影响。` },
    { id: "p", parent: "rhs", w: 4, name: "prob[error]", label: "要刻画的错误概率", glyph: R`p_{\boldsymbol a}`, role: "unknown", note: R`门噪声的真实描述，也是我们最终想知道的东西：错误 $\boldsymbol a$ 发生的概率。` },
    { id: "sign", parent: "rhs", w: 2, name: "±1", label: "这个错误让读数翻号吗", glyph: R`(-1)^{\omega}`, role: "const", note: R`把 $\omega$ 的 0/1 变成 $+1/-1$：对易的错误记正，反对易的错误记负。` },
    { id: "sum", parent: "rhs", w: 1, name: "for error in all_paulis", label: "遍历全部 4ⁿ 种错误", glyph: R`\textstyle\sum_{\boldsymbol a}`, role: "const", note: R`只是"全部加起来"，没有额外的信息。印得最大，分量却最小。` },
  ],
};

const M15 = {
  n: "15", title: "电路本征值 = 门本征值之积", height: 400,
  tex: R`\mk{Lam}{\Lambda_{T,\boldsymbol a}}=\mk{rhs}{\mk{pu}{\prod_{u\in[L]}}\mk{pj}{\prod_{j\in[k_{T_u}]}}\mk{lam}{\lambda_{\mk{gate}{T_uj},\,\mk{au}{\boldsymbol a^{(u)}}}}}`,
  nodes: [
    { id: "Lam", w: 3, name: "circuit_eigenvalue", label: "大写 Λ：整条电路的衰减，能测", glyph: R`\Lambda_{T,\boldsymbol a}`, role: "known", note: R`**大写是电路，小写是单个门。**一个字母的大小写之差，就是"能测的"与"要求的"之差。` },
    { id: "rhs", w: 0, name: "∏∏ λ", label: "右边：一路上所有门本征值之积", glyph: R`\textstyle\prod\prod\lambda`, role: "const" },
    { id: "lam", parent: "rhs", w: 4, name: "gate_eigenvalue[gate, pauli]", label: "小写 λ：单个门的本征值 —— 要解的未知数", glyph: R`\lambda`, role: "unknown", note: R`ACES 要解出来的就是它们。取对数后乘积变成求和，整条式子就成了线性方程。` },
    { id: "au", parent: "rhs", w: 6, name: "pauli_at_step_u", label: "下标里的上标：走到第 u 层时的 Pauli —— 漏看就列错方程", glyph: R`\boldsymbol a^{(u)}`, role: "known", note: R`**全式最容易忽略的地方：一个下标里的上标。**Pauli 每经过一层都会被门变换，所以同一个门在不同位置"看到"的 Pauli 不同；乘进去的是**进入**第 $u$ 层时的那一个，而不是最初的 $\boldsymbol a$。` },
    { id: "gate", parent: "rhs", w: 2, name: "layer[u].gates[j]", label: "第 u 层的第 j 个门", glyph: R`T_uj`, role: "const" },
    { id: "pu", parent: "rhs", w: 1, name: "for layer in circuit", label: "沿电路一层层走", glyph: R`\textstyle\prod_u`, role: "const" },
    { id: "pj", parent: "rhs", w: 1, name: "for gate in layer", label: "这一层的每个门", glyph: R`\textstyle\prod_j`, role: "const" },
  ],
};

const M28 = {
  n: "28", title: "性能指标：实验之前预言精度", height: 440,
  tex: R`\mk{F}{\mathcal F(\mk{T}{\mathcal T},\mk{G}{\Gamma}\,|\,\mathcal C,\boldsymbol\lambda)}\approx\mk{rhs}{\mk{norm}{\sqrt{\mk{S}{S'}/\mk{N}{N}}}\,\mk{main}{\sqrt{\operatorname{tr}(\mk{Sig}{\Sigma})}}\mk{corr}{\left(1-\frac{1}{4}\frac{\operatorname{tr}(\Sigma^2)}{\operatorname{tr}(\Sigma)^2}\right)}}`,
  nodes: [
    { id: "lhsg", w: 0, name: "figure_of_merit(design)", label: "左边：给一套设计打分", glyph: R`\mathcal F(\mathcal T,\Gamma)`, role: "result" },
    { id: "F", parent: "lhsg", w: 4, name: "figure_of_merit", label: "越小越准；实验前就能算", glyph: R`\mathcal F`, role: "result", note: R`平均每个门参数的估计误差，按机时归一化。**它在做实验之前就能算出来**——这是全文最重要的性质：可以先比较设计、再花机时。` },
    { id: "T", parent: "lhsg", w: 1.5, name: "circuits", label: "跑哪些电路", glyph: R`\mathcal T`, role: "design" },
    { id: "G", parent: "lhsg", w: 1.5, name: "shots", label: "各测多少次", glyph: R`\Gamma`, role: "design" },
    { id: "rhs", w: 0, name: "per_param × total × fix", label: "右边：三个因子相乘", glyph: R`\sqrt{\cdot}\sqrt{\cdot}(\cdots)`, role: "const" },
    { id: "main", parent: "rhs", w: 0, name: "total_error", label: "主项：真正决定精度", glyph: R`\sqrt{\operatorname{tr}\Sigma}`, role: "const", note: R`**决定精度的就是这一项。**协方差矩阵的迹是所有参数方差之和，开方就是总误差的量级。` },
    { id: "Sig", parent: "main", w: 5, name: "predicted_covariance(design)", label: "协方差：由设计与噪声猜测算出，不用做实验", glyph: R`\Sigma`, role: "known", note: R`估计量的协方差矩阵。只需要电路结构、实验设计和一个粗略的噪声猜测，就能在实验前算出来。` },
    { id: "norm", parent: "rhs", w: 0, name: "per_param_time", label: "归一化：换算成每参数、每机时", glyph: R`\sqrt{S'/N}`, role: "const", note: R`乘上 $\sqrt{S'/N}$ 之后，不同规模、不同设计的 $\mathcal F$ 可以直接比较。` },
    { id: "S", parent: "norm", w: 3, name: "time_cost", label: "撇：按电路时长折算的样本数", glyph: R`S'`, role: "design", note: R`$S$ 是测量次数，**带撇**的 $S'$ 是按电路时长折算后的次数——长电路更贵。又是一个撇号决定了含义：比较设计时比的是机时，不是次数。` },
    { id: "N", parent: "norm", w: 1, name: "n_params", label: "参数个数", glyph: R`N`, role: "const" },
    { id: "corr", parent: "rhs", w: 0.8, name: "tiny_fix  # ≈ 1", label: "小修正，通常可忽略", glyph: R`\bigl(1-\tfrac14\tfrac{\operatorname{tr}\Sigma^2}{(\operatorname{tr}\Sigma)^2}\bigr)`, role: "const", note: R`来自平方根的凹性。误差分摊在大量参数上时 $\operatorname{tr}\Sigma^2\ll(\operatorname{tr}\Sigma)^2$，这个括号几乎等于 1。**原式里它占的地方最大，在这张图里它只占一小角。**` },
  ],
};

export default function FMap() {
  return (
    <PaperPage meta={meta} notation={notation} keyEquations={false}>
      <PaperSec role="background" title="思路：把讲解从公式身上拿下来">
        <P w={3} label="排版面积 ≠ 重要性">公式里每个符号占多大地方由字号决定，和它重不重要无关：决定含义的撇号、下标里的上标印得最小，只做小修正的大括号印得最大。</P>
        <Tx>{R`所以这里不在公式周围加任何标注，公式本身保持原样、干净地显示。讲解单独画成下面那张**树图**：大块套小块，嵌套关系就是公式的结构（左边 / 右边 → 各个因子 → 各个符号）；每一块的**面积按重要性分配**，块里写着放大的符号、一个像代码变量那样的名字，以及一句话含义。鼠标停在任何一块上，原式里对应的部分会亮起来；点一块，下方显示完整说明。`}</Tx>
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
