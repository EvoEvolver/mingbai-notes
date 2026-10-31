// 附录 B 任意 #3SAT：稀疏四次多项式的 gap（原文 pp.15–19）——主文件
// 高层理解层在 _appB_overview.jsx；正文在 _appB_s1.jsx（B 引言、B.1）与 _appB_s2.jsx（B.2–B.6）；
// 可运行示例在 _appB_run.jsx，纯计算在 _appB_calc.js。
import { TextbookPage, Block, TxI, Hook, Roadmap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, pageIds, StudyTable } from "@kit";
import { notationFor } from "./_notation.js";
import { HOOK_TITLE, HOOK, ROADMAP, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_appB_overview.jsx";
import { SecB, SecB1 } from "./_appB_s1.jsx";
import { SecB2, SecB3, SecB4, SecB5, SecB6 } from "./_appB_s2.jsx";

const R = String.raw;

export const meta = {
  id: "appB", no: "B", title_en: "Arbitrary #3SAT via sparse quartic gaps", title_zh: "任意 #3SAT：稀疏四次多项式的 gap", pages: "15–19",
  one_liner: R`把稀疏积和式算法推广到任意 3-CNF：稀疏化后每片叶子有 $n\polylog n$ 个子句，用“稠密 Vandermonde 校验 + 精确计数挑选的短校验”把计数化为稀疏四次 $\F_2$ 多项式的 gap，再用“拷贝映射的变形”算出 gap。`,
  big_question: R`当子句数远多于变量数时，怎样在**不为子句付出变量代价**的前提下，仍在 $2^{O(n(\log\log n)^2/\sqrt{\log n})}$ 时间内精确数出满足赋值？`,
  why_it_matters: R`主文（\sref{T6.1}）只覆盖 $O(n)$ 个子句的 3-CNF；直接稀疏化只能得到较弱的 $2^{O(n/\log^{1/32}n)}$。附录 B 给出全文的最终结论——\sref{TB.5}：任意 #3SAT 都有 $2^{O(\rho(n))}$ 时间、多项式空间的确定性算法。它还展示了主文机器的可移植性：§4–§5 的分解与变形不只适用于积和式。`,
  overview: R`附录 B 自下而上搭了五层。**\sref{LB.1}** 是唯一的新算法原语：对"局部因子之积"在全部布尔点上求和。它把因子–变量的共享关系写成拷贝矩阵 $C$，像主文变形 $A$ 那样变形 $C$；特殊点上用截断指数的替换律 \eqref{B.1} 处理低秩部分，用布尔有限差分 \eqref{B.2} 求导。**\sref{TB.2}** 用它计算稀疏四次 $\F_2$ 多项式的 gap：$(-1)^Q=\prod(1-2m_e)$，模 $u^b$ 截断 \eqref{B.3} 后取中心剩余。**\sref{LB.3}** 用 Vandermonde 稠密校验让假赋值至少违反 $w$ 个以上子句；**\sref{LB.4}** 把"通过混合校验的赋值数"写成 gap 之和 \eqref{B.4}；**§B.5** 用精确计数确定性地挑出 $3n$ 个短校验；**§B.6** 把 $2^{O(n/\log n)}$ 片稀疏化叶子的计数加起来，得到 \sref{TB.5}。`,
  objectives: [
    R`说明为什么 $\sigma=(\log n)^{-1/32}$ 的直接稀疏化只给出 $2^{O(n/\log^{1/32}n)}$，而 $\sigma=1/\lceil\log n\rceil$ 需要新的计数器`,
    R`复述 \sref{LB.1} 证明的三段（结构化求值 / 构造变形拷贝映射 / 布尔有限差分），并指出每段对应主文的哪个结论`,
    R`证明替换律 \eqref{B.1} 与布尔有限差分公式 \eqref{B.2}，并估计 $(S,T)$ 对数 $(v/h)^{O(h)}$`,
    R`解释 \sref{TB.2} 中模 $u^b$ 截断为何不丢信息、为何 $b=v+2$`,
    R`用 Vandermonde 论证证明 \sref{LB.3}，用特征和推出 \eqref{B.4}，并核算 $Q_u$ 的单项式数`,
    R`完成 §B.5 的概率估计 $>\frac12(1-e^{-1})>\frac14$ 与 $2^n(3/4)^{3n}<1$，并解释为什么这是确定性算法`,
  ],
  prereq: [
    { ch: "ch04", what: <TxI>{R`§4：词标号（引理 4.1）、分解 $A=L(I\otimes X^{\otimes\ell})R'$、$i$-好与分块（引理 4.3）`}</TxI> },
    { ch: "ch05", what: <TxI>{R`§5：低次矩阵多项式 $J(t)$（定理 5.1）`}</TxI> },
    { ch: "ch03", what: "§3：导数与 Hermite 插值（引理 3.1、命题 3.2）" },
    { ch: "appA", what: <TxI>{R`附录 A：阶乘配对泛函 $\cL_r$ 与数值配对 (A.5)`}</TxI> },
    { what: R`有限域 $\F_{2^b}$ 的基本知识；Vandermonde 行列式；$\pm1$ 特征和` },
  ],
};

// 本页补充 / 覆盖的符号（同一字母多义时用 \sym{id}{…} 指定）
export const notation = notationFor("appB", [
  { sym: R`x`, name: "布尔赋值", def: R`$x\in\{0,1\}^v$（§B.1–B.2）或 $x\in\{0,1\}^n$（§B.3 起，3-CNF 的赋值）；$x_{G_b}$ 为组 $G_b$ 上的分量。` },
  { sym: R`y`, name: "形式变量 y", def: R`替换律 \eqref{B.1} 中被代入的值；有限差分中与 $x$ 独立的形式变量，最后代回 $y=x$。` },
  { sym: R`n`, name: "变量个数", def: R`3-CNF 的变量个数；附录 B 的全部复杂度都以 $n$ 计。` },
  { sym: R`P`, name: "变形后的和", def: R`$P(\theta)=\sum_x\Phi(C(\theta)x)$，$P(0)$ 为所求；$\deg P\le Dd_*$。` },
  { sym: R`h`, name: "导数个数", def: R`每个特殊点求 $0,\dots,h-1$ 阶导数，$h=\lfloor Dd_*/\ell_*\rfloor+1$。` },
  { sym: R`S`, name: "变量子集 S", def: R`Möbius 展开中的单项式支撑 $S\subseteq[v]$，$|S|\le j$。` },
  { sym: R`T`, name: "变量子集 T", def: R`$T\subseteq S$；$\one_T$ 为其指示向量。` },
  { sym: R`\Delta`, name: "最大度", def: R`固定高度变量后，因子–变量关联图两侧的最大度 $\Delta=\log^{O_{a,c}(1)}v$。` },
  { sym: R`\one`, name: "指示向量 / 指示函数", def: R`$\one_T\in\{0,1\}^v$ 为 $T$ 的指示向量；$\one\{\cdot\}$ 为指示函数。` },
  { sym: R`\cL_r`, name: "阶乘配对泛函", def: R`$\cL_r(z^\nu w^\xi)=\nu!\,[\nu=\xi]$（附录 A）。`, eq: "A.2" },
  { sym: R`\F`, name: "有限域", def: R`$\F_{2^b}$：$2^b$ 元有限域，构造为 $\F_2[t]/(p(t))$，$p$ 为 $b$ 次不可约多项式。` },
  { sym: R`\F_2`, name: "二元域", def: R`$\{0,1\}$，模 2 运算。` },
  { sym: R`\Q`, name: "有理数域", def: R`$\Q[u]/(u^b)$、$\Q[\tau]/(\tau^h)$ 为截断多项式环。` },
  { sym: R`\mathbb Z`, name: "整数环", def: R`示例中在 $\mathbb Z[u]/(u^b)$、$\mathbb Z[\tau]/(\tau^h)$ 上精确计算。` },
  { sym: R`\mathcal C_*`, name: "立方体指标集（附录 B）", def: R`中间坐标按无序符号对分成的布尔立方体的集合；$I_{\mathcal C_*}\otimes K$ 为每个立方体一份 $K$。` },
  { sym: R`\mathcal C`, name: "立方体指标集（主文）", def: R`§4 的 $\mathcal C=\binom{[q]}{2}^\ell$。`, eq: "4.6" },
  { sym: R`v_e`, name: "违反位", def: R`$v_e(x)=1$ ⇔ $x$ 违反第 $e$ 个子句；次数 $\le3$、至多 8 个单项式。` },
  { sym: R`e_k`, name: "初等对称多项式", def: R`$e_k(m_1,\dots,m_L)$；在布尔点上等于 $\binom{\kappa(x)}k$。` },
  { sym: R`\kappa`, name: "取值为 1 的单项式个数", def: R`$\kappa(x)=\#\{e:m_e(x)=1\}$。` },
  { sym: R`\beta`, name: "变量标号 / 包含位", def: R`§B.1：变量的词标号 $\beta(j)\in[q_*]^{\ell_*}$；§B.5：候选短校验中第 $t$ 个位置的包含位 $\beta_t$。` },
  { sym: R`\mathcal S`, name: "假幸存者集合", def: R`当前通过全部校验但 $v(x)\ne0$ 的赋值。` },
  { sym: R`f`, name: "假幸存者个数", def: R`$f=|\mathcal S|$；$f_t$ 为第 $t$ 轮后的个数。` },
  { sym: R`\mathbb E`, name: "期望", def: R`对均匀随机候选取期望。` },
  { sym: R`\Pr`, name: "概率", def: R`对均匀随机候选的概率。` },
  { sym: R`\overline{\deg}`, name: "变量平均度", def: R`关联图中变量一侧的平均度数。` },
  { sym: R`p`, name: "不可约多项式", def: R`构造 $\F_{2^b}$ 用的 $b$ 次不可约多项式 $p(t)$（示例中）。` },
  { sym: R`N'`, name: "叶子矩阵维数", def: R`把一片稀疏化叶子归约到积和式时的矩阵维数 $O(n\log^{9/32}n)$。` },
  { sym: R`\varepsilon`, name: "稀疏化指数", def: R`$\sigma=(\log n)^{-\varepsilon}$ 时的指数（原文取 $1/32$）。` },
  { sym: R`K`, name: "i-好矩阵 / 次数常数", def: R`$K_i$ 为 $i$-好矩阵（定义 4.2）；证明中 $M_*\le v\log^Kv$ 的 $K$ 为常数。` },
  { sym: R`E`, name: "低秩误差", def: R`$J_*(i)=K_i+E$，$\rank E\le2^{\ell_*}/\ell_*^A$。` },
  { sym: R`A`, name: "输入矩阵 / 例外指数", def: R`主文的输入矩阵 $A$；附录 B 中 $\ell_*^{-A}$ 的 $A$ 是充分大的固定常数（见 $\sym{Aexp}{A}$）。` },
  { sym: R`C`, name: "拷贝矩阵 / 校验矩阵", def: R`§B.1：拷贝矩阵（出现 $(e,j)$ 的行只选出 $x_j$），$C(\theta)$ 为其变形；§B.4：稠密校验矩阵 $C\in\F_2^{h_0\times m}$。（$q_*=(\log v)^C$ 中的常数见 $\sym{Cexp}{C}$。）` },
  { sym: R`b`, name: "组下标 / 截断阶 / 域次数", def: R`§B.1：变量组 $G_b$ 的下标；§B.2：截断阶 $b=v+2$；§B.3：$b=\lceil\log_2(m+1)\rceil$，$\F_{2^b}$。` },
  { sym: R`a`, name: "常数 / 下标", def: R`$\deg\Phi\le av$、$N\le av$ 中的常数；Möbius 展开中的变量下标 $x_a$；$a_j$ 为短校验行。` },
  { sym: R`t`, name: "位置 / 轮次", def: R`§B.5：候选列表中的位置 $t$，或贪心的轮次 $t$。` },
  { sym: R`G`, name: "变量组", def: R`特殊点 $\theta=i$ 处 $G_a=\{j:\beta(j)_i=a\}$，大小 $\le s$；因子 $e$ 的局部输入只依赖 $G_{\alpha(e)_i}$。` },
  { sym: R`\Psi`, name: "代入形式变量后的被求和式", def: R`$\Psi(x,z)=\prod_e\phi_e((C_{\rm loc}x+Uz)_e)$；$\Phi(C_0x)=\Psi(x,V^{\mathsf T}x)$，对 $z$ 次数 $\le D$。` },
  { sym: R`\mu`, name: "多重指标", def: R`$\mu\in\mathbb N^r$：$F(z)=\sum_\mu F_\mu z^\mu$ 的指数向量，$\mu!=\prod_a\mu_a!$。` },
  { id: "Aexp", sym: R`A`, name: "例外比例指数", def: R`对 \sref{T5.1} 取例外比例 $\ell_*^{-A}$，$A$ 充分大使 $r\log v=o(\rho(v))$。` },
  { id: "Cexp", sym: R`C`, name: "字母表指数常数", def: R`$q_*=(\log v)^C$ 中的充分大的固定常数；与拷贝矩阵 $C$ 无关。` },
  { id: "bbit", sym: R`b`, name: "校验比特", def: R`恒等式 $\one\{b=0\}=\frac12\sum_a(-1)^{ab}$ 中被检验的比特 $b\in\F_2$。` },
  { id: "abit", sym: R`a`, name: "特征和变量", def: R`$a\in\F_2$，对它求和实现指示函数。` },
  { id: "targ", sym: R`t`, name: "e_D 的自变量", def: R`$e_D(t)=\sum_{j\le D}t^j/j!$ 中的单变量。` },
]);
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  const ids = pageIds("appB");
  const own = ["X:sparsify", "LB.1", "F:subst", "TB.2", "LB.3", "LB.4", "F:select", "TB.5"];
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="附录 B 路线图" lead="引言 + 六节。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="deps" toc="依赖图" kicker="证明依赖" title="附录 B 在整篇证明中的位置" lead={R`本页陈述（高亮）及其直接上下游。悬停节点看全部上游/下游；点击看陈述与学习笔记。\sref{LB.1} 向上连到 §4–§5 与附录 A——它复用的正是主文的机器。`}>
        <DepGraph ids={ids} highlight="appB" />
        <h3>本页陈述一览</h3>
        <StudyTable ids={own} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十一张卡：计数引擎、代数技巧、校验与去随机化、整体框架。">
        <ConceptGrid />
      </Block>
      <SecB />
      <SecB1 />
      <SecB2 />
      <SecB3 />
      <SecB4 />
      <SecB5 />
      <SecB6 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 全文收束：回到第 1 页的全局依赖图">{BRIDGE}<p><a href="#/ch01">→ 打开第 1 页（目标与证明纲要）的全局依赖图，从定理 B.5 / ETH 节点向上回溯整条证明链</a></p></Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="copy_map" /> · <C id="subst" /> · <C id="bool_fd" /> · <C id="mod2b" /> · <C id="vandermonde" /> · <C id="derand" /></p>
      </Block>
    </TextbookPage>);
}
