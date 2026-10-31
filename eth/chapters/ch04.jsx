// 第 4 节 A factorization that turns coordinate identities into blocks（原文 pp.6–10）——主文件
// 高层理解层：_ch04_overview.jsx；正文：_ch04_s1.jsx（§4、§4.1）、_ch04_s2.jsx（§4.2）、_ch04_s3.jsx（§4.3、§4.4）；
// 可运行示例：_ch04_run.jsx（界面）+ _ch04_algo.js（精确算术构造，可在 node 中单独测试）。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable, pageIds } from "@kit";
import { notationFor } from "./_notation.js";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch04_overview.jsx";
import { Sec4Intro, Sub41 } from "./_ch04_s1.jsx";
import { Sub42 } from "./_ch04_s2.jsx";
import { Sub43, Sub44 } from "./_ch04_s3.jsx";

const R = String.raw;

export const meta = {
  id: "ch04", no: 4, title_en: "A factorization that turns coordinate identities into blocks", title_zh: "把坐标恒等变成分块的分解", pages: "6–10",
  one_liner: R`给行列贴上“词”标号，把稀疏矩阵写成 $A=L(I_C\otimes X^{\otimes\ell})R'$：输入只在两侧，中间是与输入无关的交叉配线；中间矩阵在第 $i$ 个坐标上是恒等时，外层就按第 $i$ 个符号分成大小 $\le3n/q$ 的块。`,
  big_question: R`怎样让一个稀疏矩阵在 $\ell$ 个不同的点上都"变容易"（小块 + 低秩），同时又只用一个与输入无关的小矩阵来控制这种变形？`,
  why_it_matters: R`\sref{P3.2} 把算法化归为构造 $A(t)$；本节完成其中的"外壳"：只要 §5 给出一个 $2^\ell\times2^\ell$ 的低次矩阵多项式 $J(t)$，令 $A(t)=L(I_C\otimes J(t))R'$，就自动有 $A(0)=A$、$\deg A(t)=\deg J(t)$，且在 $t=i$ 处按第 $i$ 个符号分块。外层块大小 $3n/q$ 与误差秩 $\varepsilon M$ 也都在这里确定。`,
  overview: R`§4.1 用普通颜色（$\ell=1$）展示全部想法：$A=LR=LIR=L\cJ R'$，把 $\cJ$ 换成 $I$ 后 $B=LIR'$ 块对角——因为反转后 $L$ 与 $R'$ 读同一个颜色。但一个容易点不够。§4.2 把颜色换成 $[q]^\ell$ 中的词，贪心标号（\sref{L4.1}）满足平衡、有序对互异、逐坐标不同，逐坐标平衡给出组大小 $\le3n/q$。§4.3 发现中间坐标 $\Omega$ 恰是 $|C|$ 个 $\ell$ 维布尔立方体，交换两个词 = 翻转全部方向位 = $X^{\otimes\ell}$。§4.4 定义 $i$-好矩阵并证明：中间矩阵 $i$-好 ⇒ 外层按第 $i$ 个符号分块（\sref{L4.3}）；再加低秩误差，外层只多出秩 $\le\varepsilon M$ 的修正 \eqref{4.9}。`,
  objectives: [
    R`亲手验证 $A=LR=LIR=L\cJ R'$ 并解释为什么 $B=LIR'$ 是块对角的（那张"行颜色/列颜色"表）`,
    R`复述 \sref{L4.1} 的贪心并逐项给出排除词数的预算 $Q/2+Q/4+Q/4$`,
    R`从 $|I_{i,a}|\le(Q/q)\lceil2n/Q\rceil$ 推出 \eqref{4.5}，并说明 $Q\le n$ 用在哪里`,
    R`解释同构 $\Omega\cong C\times\{0,1\}^\ell$，以及为什么"交换两个词"就是 $X^{\otimes\ell}$`,
    R`判断给定矩阵对哪些 $i$ 是 $i$-好的，并证明\sref{L4.3} 与 \eqref{4.9}`,
  ],
  prereq: [
    { ch: "ch02", what: "§2：引理 2.1——“对应对角块 + 低秩”矩阵的积和式算法" },
    { ch: "ch03", what: String.raw`§3：命题 3.2——只需构造 $A(t)$，使特殊点 $t=1,\dots,\ell$ 处是“小块 + 低秩”、且 $d/\ell$ 小` },
    { what: "张量（Kronecker）积、分块矩阵乘法、秩的次可加性" },
  ],
};

export const notation = notationFor("ch04", [
  { sym: R`B`, name: "分块矩阵", def: R`$B=LIR'$（§4.1，式 \eqref{4.4}）；$B_a$ 为第 $a$ 个颜色的对角块；$B_i=L(I_C\otimes K_i)R'$ 为特殊点 $t=i$ 处按第 $i$ 个符号分块的部分。`, eq: "4.4" },
  { id: "Bs", sym: R`B`, name: "i-好矩阵的因子", def: R`\sref{D4.2} 中 $K=I_2\otimes B$（第 $i$ 个因子）里的 $2^{\ell-1}\times2^{\ell-1}$ 矩阵，作用在除第 $i$ 位外的其余 $\ell-1$ 个坐标上。与分块矩阵 $B$ 无关。`, eq: "4.8" },
  { sym: R`R`, name: "右因子（原始与行互换后）", def: R`$M\times n$：$R[(\alpha(u),\beta(v)),v]=1$（$A_{uv}\ne0$）；$R'=\cJ R$ 在反向词对 $(\beta(v),\alpha(u))$ 处存列指示。`, eq: "4.2" },
  { sym: R`L_{\{a,b\}}`, name: "一对颜色的 L 片段", def: R`$L$ 中中间坐标 $(a,b),(b,a)$ 的两列，$=\begin{pmatrix}u_{ab}&0\\0&u_{ba}\end{pmatrix}$（行块：$a$ 色行、$b$ 色行）。` },
  { sym: R`u_{ab}`, name: "带权行指示向量", def: R`块 $(a,b)$ 中唯一元素的行指示向量乘以元素值（空块为零向量）；$A_{ab}=u_{ab}v_{ab}^{\mathsf T}$。` },
  { sym: R`v_{ab}`, name: "列指示向量", def: R`块 $(a,b)$ 中唯一元素的列指示向量（空块为零向量）。` },
  { sym: R`A_{ab}`, name: "颜色块", def: R`行色 $a$、列色 $b$ 的子矩阵；对角块 $A_{aa}=0$，其余每块至多一个非零元。`, eq: "4.1" },
  { sym: R`w`, name: "元素值", def: R`§4.1：非零元 $A_{uv}=w$ 的值。` },
  { sym: R`x`, name: "布尔点（立方体顶点）", def: R`$x\in\{0,1\}^\ell$：一个立方体中的方向位向量；$x_i$ 为第 $i$ 位，$x_{-i}$ 为去掉第 $i$ 位后的 $\ell-1$ 位，$\bar x$ 为逐位取反（= 交换两个词）。` },
  { sym: R`\Q`, name: "有理数域", def: R`$L\in\Q^{n\times M}$ 等：所有构造都是精确有理数。` },
  { sym: R`\one`, name: "示性函数", def: R`$\one\{\cdot\}$：条件成立为 1，否则为 0。` },
  { sym: R`a`, name: "颜色 / 词 / 符号", def: R`§4.1 中 $a\in[q]$ 是颜色；§4.3 中 $(a,b)\in\Omega$ 是一对词，$a_i$ 为其第 $i$ 个符号；$I_{i,a}$ 中 $a\in[q]$ 是符号。` },
  { sym: R`\omega`, name: "中间坐标集中的元素", def: R`$\omega,\omega'\in\Omega$：有序词对 $(a,b)$，等价地 (立方体, 方向位向量)。`, eq: "4.6" },
  { sym: R`Y`, name: "任意矩阵", def: R`秩不等式 $\rank(LYR')\le\rank(Y)$ 中的一般矩阵。` },
  { sym: R`e`, name: "中间坐标", def: R`§4.1：为每个非零元开的中间坐标，随后用有序颜色对 $(a,b)$ 命名。` },
]);
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本节路线图" lead="四个小节，一条主线：分解 → 标号 → 立方体 → 好性。点击标题跳到该小节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="proofmap" toc="证明结构" kicker="证明结构" title="本节陈述在全文证明中的位置" lead="上方是本节依赖的陈述，下方是用到本节结论的陈述（高亮框为本节）。悬停看上下游，点击看陈述与学习笔记。">
        <DepGraph ids={pageIds("ch04")} highlight="ch04" />
        <StudyTable ids={["L4.1", "F:balance", "F:factor", "D4.2", "L4.3", "F:survive"]} />
        <h3 style={{ marginTop: "1.4em" }}>编号公式如何推出</h3>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="九张卡串起本节：先读一句话版本，点开看深入解释、类比、原文出处与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec4Intro />
      <p className="muted">本节概念：<C id="coloring" /> · <C id="intermediate" /> · <C id="reversal" /> · <C id="balance" /> · <C id="cube" /> · <C id="middle" /> · <C id="nice" /> · <C id="blocks" /> · <C id="lowrank" /></p>
      <Sub41 />
      <Sub42 />
      <Sub43 />
      <Sub44 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ §5：还差一个低次的中间矩阵多项式">{BRIDGE}</Bridge>
      </Block>
    </TextbookPage>);
}
