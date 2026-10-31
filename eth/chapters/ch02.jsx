// 第 2 节 计算结构化积和式（原文 pp.3–5）——主文件
// 高层理解层在 _ch02_overview.jsx；正文在 _ch02_s1.jsx（约定 + §2.1）、_ch02_s2.jsx（§2.2）、_ch02_s3.jsx（§2.3 引理 2.1）；
// 可运行示例与交互图在 _ch02_run.jsx，纯函数（运算计数环、Gray 码 Ryser、随机分块）在 _ch02_algo.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable, pageIds } from "@kit";
import { notationFor } from "./_notation.js";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch02_overview.jsx";
import { Sec2Intro, Sec21 } from "./_ch02_s1.jsx";
import { Sec22 } from "./_ch02_s2.jsx";
import { Sec23 } from "./_ch02_s3.jsx";

const R = String.raw;

export const meta = {
  id: "ch02", no: 2, title_en: "Computing structured permanents", title_zh: "计算结构化积和式", pages: "3–5",
  one_liner: R`“小块 + 低秩”的矩阵——以及它的每个方子矩阵——的积和式可以在 $\poly(n)\cdot2^{O(s)}\cdot n^{O(r)}$ 次运算内精确算出：低秩部分只记颜色计数，计数表一块一块地合并。`,
  big_question: R`一般积和式要付出 $2^n$；分块矩阵与低秩矩阵各自都有快速算法。当矩阵是两者之和 $B+E$、低秩部分把所有块缠在一起时，还能避开 $2^n$ 吗？`,
  why_it_matters: R`这是整篇论文在每个特殊插值点 $t=i$ 上实际运行的计算引擎（\sref{L2.1}）。§4–§5 费尽心思构造的分解，目的就是让 $A(i)=B_i+E_{\rm out}$ 满足本引理的假设；§3 则需要它对**每个方子矩阵**都成立。论文最终的运行时间中，特殊点代价 $T_0=2^{O(n/\log^{10}n)}$ 就来自这里。`,
  overview: R`本节分三步。**§2.1**：积和式是二部图完美匹配的加权和；子集 DP 与 Ryser 公式给出 $O(n2^n)$ 基线；加法公式按每条边的来源（$B$ 或 $C$）把积和式拆成子矩阵积和式之积的和。**§2.2**：低秩矩阵 $E=UV^{\mathsf T}$ 的每条边"选一种颜色"，权重拆到两个端点；同色端点任意配对、权重相同，所以 DP 只需记录颜色计数向量 $\nu$，状态数 $\binom{n+r}{r}$。**§2.3**：对"小块 + 低秩"，每块枚举由 $B$ 匹配的 $(S,T)$，剩余端点着色得表 $W_a$；各块按计数向量卷积，$\per(B+E)=\sum_\nu\nu!\,W(\nu,\nu)$。删行列不破坏这两种结构，所以每个方子矩阵同样适用。`,
  objectives: [
    R`用完美匹配的语言解释积和式，并说明子集 DP、Ryser 公式 \eqref{2.1} 的 $O(n2^n)$ 从何而来（包括 Gray 码这一细节）`,
    R`证明加法公式 \eqref{2.2}，并说出 $S,T$ 与补集各由哪个矩阵匹配`,
    R`从"着色 + 同色配对"推出秩二公式 \eqref{2.4} 与秩 $r$ 公式 \eqref{2.5}，解释为什么对负权重也成立、为什么状态数是 $\binom{n+r}{r}$`,
    R`复述 \sref{L2.1} 的算法：块表 $W_a$、逐块卷积、\eqref{2.6}，并给出"每项恰计一次"的双射论证与 $\poly(n)2^{O(s)}n^{O(r)}$ 的代价分析`,
    R`说明为什么 \sref{L2.1} 对每个方子矩阵成立，以及为什么定义允许非方块`,
  ],
  prereq: [
    { ch: "ch01", what: "§1 纲要：曲线 A(t)、特殊点、导数 + 插值的整体策略（本节是其中第 1 步）" },
    { what: R`线性代数（秩、秩分解）；组合计数（排列、隔板法、容斥原理）；动态规划的基本思想` },
  ],
};

export const notation = notationFor("ch02", [
  { sym: R`u`, name: "红色左端点权重 / 行指标", def: R`§2.2 秩一、秩二中 $u_i$ 为左端点 $i$ 取红色（第一项）时的权重：$E_{ij}=u_iv_j(+w_iz_j)$。下标位置的 $u$ 是行指标。` },
  { sym: R`v`, name: "红色右端点权重 / 列指标", def: R`§2.2 中 $v_j$ 为右端点 $j$ 取红色时的权重。下标位置的 $v$ 是列指标。` },
  { sym: R`w`, name: "蓝色左端点权重", def: R`秩二分解 $E_{ij}=u_iv_j+w_iz_j$ 中左端点 $i$ 取蓝色时的权重。` },
  { sym: R`z`, name: "蓝色右端点权重", def: R`秩二分解中右端点 $j$ 取蓝色时的权重。` },
  { sym: R`X`, name: "已用列集合", def: R`子集 DP 的状态 $X\subseteq[n]$：前 $u$ 行已经占用的列。` },
  { sym: R`f`, name: "DP 表 / 函数", def: R`子集 DP 中 $f_u(X)$ 为前 $u$ 行恰好占用列集 $X$ 的部分匹配权重和；Ryser 公式证明中 $f:[n]\to S$ 为"每行选一列"的任意函数。` },
  { sym: R`m`, name: "像的大小", def: R`Ryser 证明中函数 $f$ 的像 $f([n])$ 的大小。` },
  { sym: R`M`, name: "一般矩阵", def: R`记号 $M[S,T]$：由行集 $S$、列集 $T$ 构成的子矩阵（$S^c,T^c$ 为补集）。` },
  { sym: R`\sigma`, name: "块内局部匹配", def: R`加法公式与引理 2.1 证明中用 $C$（或 $B$）匹配的那部分双射，如 $\sigma_a:S_a\to T_a$。` },
  { sym: R`\tau`, name: "剩余端点的配对", def: R`加法公式证明中 $S^c\to T^c$ 的双射；引理 2.1 证明中剩余端点之间的保色双射。` },
  { sym: R`c`, name: "着色函数", def: R`$c:[n]\to[r]$，左端点所在边的颜色；$c'$ 为右端点颜色。` },
  { sym: R`F`, name: "取 B 的行", def: R`引理 2.1 证明中，一项里取 $B$ 元素的行集合 $F\subseteq[n]$；$S_a=F\cap I_a$。` },
  { sym: R`R_0`, name: "删去的行", def: R`取子矩阵时删去的行集合。` },
  { sym: R`C_0`, name: "删去的列", def: R`取子矩阵时删去的列集合，$|C_0|=|R_0|$。` },
  { sym: R`C`, name: "加法公式中的第二项", def: R`$\per(B+C)$ 中的 $C$：用它匹配行集 $S$ 与列集 $T$。` },
  { sym: R`S`, name: "行子集 / 列子集", def: R`加法公式中用 $C$ 匹配的行；Ryser 公式中为列子集；引理 2.1 中 $S\subseteq I_a$ 为块内用 $B$ 匹配的行。` },
  { sym: R`T`, name: "列子集", def: R`加法公式中用 $C$ 匹配的列；引理 2.1 中 $T\subseteq J_a$ 为块内用 $B$ 匹配的列。` },
  { sym: R`\mathbb{Z}`, name: "整数", def: R`$\mathbb{Z}_{\ge0}$：非负整数。` },
]);
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["F:add", "F:lowrank", "L2.1"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本节路线图" lead="约定 + 三个小节。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="deps" toc="证明结构" kicker="证明结构" title="本节陈述在整篇证明中的位置" lead="上：证明依赖图（被依赖者在上；金边为本页陈述，悬停看上下游，点击看陈述）。中：本页陈述一览。下：本页编号公式之间的推导关系。">
        <DepGraph ids={pageIds("ch02")} highlight="ch02" />
        <StudyTable ids={OWN} />
        <h3>本页公式如何相互推出</h3>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="八张卡串起本节：先读一句话版本，点开看深入解释、类比、文中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec2Intro />
      <Sec21 />
      <Sec22 />
      <Sec23 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 3 节：导数与插值">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="addition" /> · <C id="countvec" /> · <C id="blockconv" /> · <C id="subclosure" /></p>
      </Block>
    </TextbookPage>);
}
