// 公式透镜样例：同一条公式，「原样显示」与「透镜」对照。组件见 framework/app/src/kit/paper/lens.jsx。
import { PaperPage, PaperSec, FormulaLens, Eq, Tx, P, Verdict } from "@kit";
import { NOTATION } from "./_method_notation.js";
import "./_paper_kit.jsx";

const R = String.raw;

export const meta = {
  id: "lens", no: 0, label: "公式透镜样例",
  title_zh: "公式透镜：让公式内部的重要性看得见", title_en: "Formula lens — a sample",
  tldr: R`公式难读，常常不是因为数学难，而是因为**最关键的信息印在最小的字符上**，而且公式里既没有变量名，也不能插注释。公式透镜给公式补上代码才有的三样东西：注释、有意义的名字、逐行讲解。`,
  one_liner: "同一条公式：原样显示 vs. 透镜",
};
export const notation = NOTATION;
export const concepts = [];

// ---------- 样例 1：式 (7) ----------
const L7 = {
  n: "7", title: "错误概率 → Pauli 本征值",
  tex: R`\mk{lam}{\lambda_{\mk{ap}{\boldsymbol a'}}}=\mk{sum}{\sum_{\boldsymbol a\in\mathbf P^n}}\mk{sign}{(-1)^{\mk{om}{\omega(\boldsymbol a,\boldsymbol a')}}}\,\mk{p}{p_{\boldsymbol a}}`,
  parts: [
    { id: "lam", role: "result", glyph: R`\lambda`, label: "本征值：被测 Pauli 存活的程度", note: R`接近 1 表示噪声对这个 Pauli 几乎没影响；它是实验能直接测到的量。`, side: "top" },
    { id: "ap", role: "known", glyph: R`\boldsymbol a'`, label: "撇号：被测的那个 Pauli", note: R`**最容易看漏的一笔。**带撇的 $\boldsymbol a'$ 是我们拿来探测的 Pauli；不带撇的 $\boldsymbol a$ 是会发生的错误。两者长得几乎一样，意义完全不同。`, side: "bottom" },
    { id: "sum", role: "const", glyph: R`\textstyle\sum_{\boldsymbol a}`, label: "对所有可能的错误求和", note: R`$n$ 个比特共 $4^n$ 种 Pauli 错误，逐个计入。`, side: "top" },
    { id: "om", role: "const", glyph: R`\omega`, label: "ω：对易记 0，反对易记 1", note: R`辛内积。这个藏在上标里的小函数决定了整条公式的含义：**只有和被测 Pauli 反对易的错误才会翻转读数**。`, side: "bottom" },
    { id: "sign", role: "const", glyph: R`(-1)^{\omega}`, label: "±1：这个错误让读数翻号吗", side: "top" },
    { id: "p", role: "unknown", glyph: R`p_{\boldsymbol a}`, label: "要刻画的错误概率", note: R`门噪声的真实描述：错误 $\boldsymbol a$ 发生的概率。这是我们最终想知道的东西。`, side: "bottom" },
  ],
  steps: [
    { ids: ["lam", "ap"], text: R`左边：挑一个 Pauli $\boldsymbol a'$ 去探测门，它经过噪声后剩下的比例叫 $\lambda_{\boldsymbol a'}$。注意那个**撇号**——它标的是"探测用的"Pauli。` },
    { ids: ["sum", "p"], text: R`右边：噪声是许多可能错误的混合，错误 $\boldsymbol a$ 以概率 $p_{\boldsymbol a}$ 发生，我们把它们全部加起来。` },
    { ids: ["sign", "om"], text: R`每个错误带一个 $\pm1$：和探测 Pauli **对易**（$\omega=0$）就不影响读数，记 $+$；**反对易**（$\omega=1$）就把读数翻号，记 $-$。整条式子的物理全在这个小上标里。` },
    { ids: ["lam", "sum", "sign", "p"], text: R`合起来：本征值 = 不翻号的错误总概率 − 翻号的错误总概率。噪声越弱，几乎只剩"无错误"那一项，$\lambda$ 就越接近 1。` },
  ],
  code: [
    { ids: ["lam", "ap"], src: "def eigenvalue(probe):            # λ_{a'}", note: "被测 Pauli 存活的程度" },
    { ids: ["sum"], src: "    total = 0\n    for error in all_paulis(n):  # Σ_a", note: "4^n 种可能的错误" },
    { ids: ["sign", "om"], src: "        flips = anticommutes(error, probe)   # ω(a,a')", note: "只有反对易的错误会翻转读数" },
    { ids: ["p", "sign"], src: "        total += (-1 if flips else +1) * prob[error]   # (-1)^ω p_a", note: "" },
    { ids: ["lam"], src: "    return total", note: "≈ 1 − 2·(翻号错误的总概率)" },
  ],
};

// ---------- 样例 2：式 (15) ----------
const L15 = {
  n: "15", title: "电路本征值 = 门本征值之积",
  tex: R`\mk{Lam}{\Lambda_{T,\boldsymbol a}}=\mk{pu}{\prod_{u\in[L]}}\mk{pj}{\prod_{j\in[k_{T_u}]}}\mk{lam}{\lambda_{\mk{gate}{T_uj},\,\mk{au}{\boldsymbol a^{(u)}}}}`,
  parts: [
    { id: "Lam", role: "known", glyph: R`\Lambda`, label: "大写 Λ：整条电路的衰减（可测）", note: R`**大写**是电路、**小写**是单个门——一个字母的大小写之差，就是"能测的"和"要求的"之差。`, side: "top" },
    { id: "pu", role: "const", glyph: R`\textstyle\prod_u`, label: "外层：沿电路一层一层走", note: R`$u$ 是第几步，$L$ 是电路的层数。`, side: "bottom" },
    { id: "pj", role: "const", glyph: R`\textstyle\prod_j`, label: "内层：这一层里的每个门", side: "top" },
    { id: "lam", role: "unknown", glyph: R`\lambda`, label: "小写 λ：单个门的本征值（未知）", note: R`ACES 要解出来的就是它们。取对数后，乘积变成求和，整条式子就成了一个线性方程。`, side: "bottom" },
    { id: "gate", role: "const", glyph: R`T_uj`, label: "第 u 步那层的第 j 个门", side: "top" },
    { id: "au", role: "known", glyph: R`\boldsymbol a^{(u)}`, label: "上标 (u)：走到第 u 步时的 Pauli", note: R`**下标里的上标，最容易被忽略。**Pauli 每经过一层就会变形，所以同一个门在不同位置"看到"的 Pauli 不同；$\boldsymbol a^{(u)}$ 记录的是**进入**第 $u$ 层时的那一个。`, side: "bottom" },
  ],
  steps: [
    { ids: ["Lam"], text: R`左边是能测的：让一个 Pauli $\boldsymbol a$ 走完整条电路 $T$，测它最后还剩多少。` },
    { ids: ["pu", "pj"], text: R`右边是两层循环：外层沿着电路一层一层走，内层遍历这一层里的每个门。` },
    { ids: ["lam", "gate"], text: R`每遇到一个门，就乘上这个门的本征值。总衰减 = 一路上所有门本征值之积。` },
    { ids: ["au"], text: R`关键细节：Pauli 每过一层都会被门变换。所以乘进去的是"**此刻**的 Pauli $\boldsymbol a^{(u)}$"对应的本征值，而不是最初的 $\boldsymbol a$。漏看这个上标，就会把方程列错。` },
  ],
  code: [
    { ids: ["Lam"], src: "def circuit_eigenvalue(circuit, pauli):   # Λ_{T,a}", note: "能直接测的量" },
    { ids: ["pu"], src: "    result = 1\n    for layer in circuit.layers:           # ∏_u", note: "" },
    { ids: ["pj", "gate"], src: "        for gate in layer.gates:           # ∏_j", note: "" },
    { ids: ["lam", "au"], src: "            result *= gate_eigenvalue[gate, pauli]   # λ_{T_uj, a^(u)}", note: "要解的未知数" },
    { ids: ["au"], src: "        pauli = layer.propagate(pauli)     # a^(u) → a^(u+1)", note: "Pauli 被这一层变换" },
    { ids: ["Lam"], src: "    return result", note: "取对数 → 线性方程 b = A·x" },
  ],
};

// ---------- 样例 3：式 (28) ----------
const L28 = {
  n: "28", title: "性能指标：实验之前预言精度",
  tex: R`\mk{F}{\mathcal F(\mk{T}{\mathcal T},\mk{G}{\Gamma}\,|\,\mathcal C,\boldsymbol\lambda)}\approx\mk{norm}{\sqrt{\mk{S}{S'}/\mk{N}{N}}}\,\mk{main}{\sqrt{\operatorname{tr}(\mk{Sig}{\Sigma})}}\mk{corr}{\left(1-\frac{1}{4}\frac{\operatorname{tr}(\Sigma^2)}{\operatorname{tr}(\Sigma)^2}\right)}`,
  parts: [
    { id: "F", role: "result", glyph: R`\mathcal F`, label: "性能指标：越小越准", note: R`平均每个门参数的估计误差，按机时归一化。**它在做实验之前就能算出来**，这是全文最重要的性质。`, side: "top" },
    { id: "T", role: "design", glyph: R`\mathcal T`, label: "设计：跑哪些电路", side: "bottom" },
    { id: "G", role: "design", glyph: R`\Gamma`, label: "设计：每种电路测多少次", side: "top" },
    { id: "S", role: "design", glyph: R`S'`, label: "撇：按机时换算的总样本数", note: R`$S$ 是测量次数，带撇的 $S'$ 是**按电路时长折算**后的次数——长电路更贵。又是一个撇号决定含义。`, side: "bottom" },
    { id: "N", role: "const", glyph: R`N`, label: "要估计的参数个数", side: "top" },
    { id: "Sig", role: "known", glyph: R`\Sigma`, label: "协方差：由设计与噪声先验算出", note: R`估计量的协方差矩阵。由电路结构、设计和一个粗略的噪声猜测就能算，不需要真的做实验。`, side: "bottom" },
    { id: "main", role: "const", glyph: R`\sqrt{\operatorname{tr}\Sigma}`, label: "主项：总方差的平方根", note: R`**真正决定精度的是这一项。**`, side: "top" },
    { id: "corr", role: "const", glyph: R`(1-\tfrac14\cdots)`, label: "小修正：通常接近 1", note: R`来自平方根的凹性。误差分摊在大量参数上时 $\operatorname{tr}\Sigma^2\ll(\operatorname{tr}\Sigma)^2$，这个括号几乎等于 1——**看着最复杂的一项，其实最不重要**。`, side: "bottom" },
  ],
  steps: [
    { ids: ["F", "T", "G"], text: R`左边：给定一套实验设计（跑哪些电路 $\mathcal T$、各测多少次 $\Gamma$），$\mathcal F$ 衡量它有多准。` },
    { ids: ["Sig", "main"], text: R`主项：协方差矩阵 $\Sigma$ 的迹是所有参数方差之和，开方就是"总误差"的量级。` },
    { ids: ["norm", "S", "N"], text: R`归一化：乘上 $\sqrt{S'/N}$，换算成"每个参数、每单位机时"的误差，于是不同规模、不同设计可以直接比较。` },
    { ids: ["corr"], text: R`最后这个括号看起来最复杂，但它只是平方根带来的小修正，通常非常接近 1。**视觉上最显眼的部分，恰恰最不重要。**` },
  ],
  code: [
    { ids: ["F", "T", "G"], src: "def figure_of_merit(design, gate_eigs_guess):    # F(T, Γ | C, λ)", note: "实验前就能算" },
    { ids: ["Sig"], src: "    cov = predicted_covariance(design, gate_eigs_guess)   # Σ", note: "由设计 + 噪声猜测算出" },
    { ids: ["main"], src: "    total_error = sqrt(trace(cov))              # √tr Σ", note: "主项" },
    { ids: ["norm", "S", "N"], src: "    per_param = sqrt(design.time_cost / n_params)  # √(S'/N)", note: "按机时与参数个数归一化" },
    { ids: ["corr"], src: "    tiny_fix = 1 - trace(cov @ cov) / (4 * trace(cov)**2)   # 通常 ≈ 1", note: "可以先忽略" },
    { ids: ["F"], src: "    return per_param * total_error * tiny_fix", note: "" },
  ],
};

export default function Lens() {
  return (
    <PaperPage meta={meta} notation={notation} keyEquations={false}>
      <PaperSec role="background" title="问题：为什么公式比代码难读">
        <P w={3} label="关键信息印在最小的字符上">公式难读，一个根本原因是：**承载关键信息的往往是最小的字符**——一个撇号、一个下标里的上标、一个大小写之差。它们印得最小，意义却最大；扫读时眼睛恰好最容易滑过它们。</P>
        <Tx>{R`代码之所以好读，是因为它有三样公式没有的东西：**有意义的名字**（\`gate_eigenvalue\` 而不是 $\lambda_{T_uj,\boldsymbol a^{(u)}}$）、**注释**（可以在任何一行旁边写"这里为什么这样"）、**按行展开**（一步一步执行，而不是一行塞进所有逻辑）。`}</Tx>
        <Tx>{R`公式透镜把这三样东西补回给公式：每个关键子式**引出注释**，小字符在注释里**放大**；按"已知 / 未知 / 可以自己选 / 常数 / 结果"**着色**，一眼看出哪个是要求的；可以切到**逐步**模式一项一项点亮，或切到**代码**模式看同一条式子写成带注释的程序。鼠标放在公式的任何一块上，对应的注释和代码行一起亮起来。`}</Tx>
      </PaperSec>

      <PaperSec role="solution" title="样例 1：最关键的信息藏在上标里">
        <Tx>{R`先看原样显示——试着在 3 秒内说出：哪个符号是要求的？哪个是被测的？那个上标在干什么？`}</Tx>
        <div className="fl-before"><span>原样显示</span><Eq n="7" say="（对照用）原样显示的式 (7)">{R`\lambda_{\boldsymbol a'}=\sum_{\boldsymbol a\in\mathbf P^n}(-1)^{\omega(\boldsymbol a,\boldsymbol a')}p_{\boldsymbol a}`}</Eq></div>
        <FormulaLens {...L7} />
      </PaperSec>

      <PaperSec role="solution" title="样例 2：下标里的上标">
        <div className="fl-before"><span>原样显示</span><Eq n="15" say="（对照用）原样显示的式 (15)">{R`\Lambda_{T,\boldsymbol a}=\prod_{u\in[L]}\prod_{j\in[k_{T_u}]}\lambda_{T_uj,\boldsymbol a^{(u)}}`}</Eq></div>
        <FormulaLens {...L15} />
      </PaperSec>

      <PaperSec role="solution" title="样例 3：看着最复杂的一项最不重要">
        <div className="fl-before"><span>原样显示</span><Eq n="28" say="（对照用）原样显示的式 (28)">{R`\mathcal F(\mathcal T,\Gamma|\mathcal C,\boldsymbol\lambda)\approx\sqrt{S'/N}\sqrt{\operatorname{tr}(\Sigma)}\left(1-\frac{1}{4}\frac{\operatorname{tr}(\Sigma^2)}{\operatorname{tr}(\Sigma)^2}\right)`}</Eq></div>
        <FormulaLens {...L28} />
        <Verdict label="透镜的三个作用">小字符放大并配注释；按角色着色分清已知与未知；用逐步与代码视图把一行公式拆成可以跟随的步骤。</Verdict>
      </PaperSec>
    </PaperPage>);
}
