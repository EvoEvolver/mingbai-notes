// 附录 A 多项式空间（原文 pp.14–15）——主文件。
// 高层理解层在 _appA_overview.jsx；正文在 _appA_s.jsx；可运行示例与交互图在 _appA_demos.jsx（计算在 _appA_calc.jsx）。
import { TextbookPage, Block, TxI, Hook, Roadmap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable, pageIds } from "@kit";
import { notationFor } from "./_notation.js";
import { HOOK_TITLE, HOOK, ROADMAP, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_appA_overview.jsx";
import { SecA, SecA1, SecA2, SecA3 } from "./_appA_s.jsx";

const R = String.raw;

export const meta = {
  id: "appA", no: "A", title_en: "Polynomial space", title_zh: "多项式空间", pages: "14–15",
  one_liner: R`把引理 2.1 的颜色计数表看成多项式 $F$ 的系数，用“插值泛函而非系数表”逐点求值、累加、丢弃——同样的时间，多项式的空间。`,
  big_question: R`\sref{L2.1} 需要一张多达 $(n+1)^{2r}$ 项的表，可我们只要它的一个加权对角和。能否不存这张表、又不多花时间，就算出这个数？`,
  why_it_matters: R`主定理（\sref{T6.1}）由此成为"亚指数时间 + 多项式空间"的算法；附录 B 的任意 #3SAT 算法同样声称多项式空间，并直接借用这里的阶乘配对 $\cL_r$ 与网格公式 \eqref{A.5}。`,
  overview: R`附录 A 只有三小节，但完成了一次漂亮的视角切换。§A.1：给颜色配形式变量，块多项式 $F_b$ \eqref{A.1} 的系数就是块表，$F=\prod_bF_b$ 的系数就是 $W(\nu,\xi)$；\eqref{2.6} 变成阶乘配对 $\per(B+UV^{\mathsf T})=\cL_r(F)$ \eqref{A.3}，而 $F$ 在一个数值点的值可在多项式空间内算出。§A.2：每变量次数 $\le n$，张量积 Lagrange 插值加上 $\cL_r$ 的按坐标分解，得到网格求和公式 \eqref{A.5}，权重由一张 $(n+1)\times(n+1)$ 的表 $\kappa$ \eqref{A.4} 给出。§A.3：把它装进 \eqref{3.1}，一切顺序枚举，\sref{T6.1} 在多项式空间内成立。`,
  objectives: [
    R`解释为什么 $F=\prod_bF_b$ 的 $z^\nu w^\xi$ 系数等于 \sref{L2.1} 的 $W(\nu,\xi)$，并由 \eqref{2.6} 推出 \eqref{A.3}`,
    R`说明为什么 $\cL_r$ 不能用单点取值实现，却能写成网格值的加权和`,
    R`独立推导 \eqref{A.5}：张量积插值 + 配对按坐标分解 + 单坐标值 $\kappa_{ab}$`,
    R`算出小 $n$ 的 $\kappa$（如 $n=1$ 时 $\kappa=\begin{pmatrix}2&-1\\-1&1\end{pmatrix}$），并验证 $\sum\kappa_{ab}f(a)g(b)=\sum_kk!f_kg_k$`,
    R`逐层说明 \sref{T6.1} 的算法为何只需多项式空间，以及时间为何不变`,
  ],
  prereq: [
    { ch: "ch02", what: <TxI>{R`§2.2–2.3：颜色计数 DP (2.5)、引理 2.1 与表 $W(\nu,\xi)$、式 (2.6)`}</TxI> },
    { ch: "ch03", what: "§3：引理 3.1 的 (3.1)、Hermite 插值与命题 3.2" },
    { what: R`单变量 Lagrange 插值；"空间复杂度"的含义（同时保存的比特数）` },
  ],
};

export const notation = notationFor("appA", [
  { sym: R`z`, name: "左颜色变量", def: R`$z=(z_1,\dots,z_r)\in\Q^r$：$u_i(z)=\sum_aU_{ia}z_a$，$z_a$ 的指数记录颜色 $a$ 在左端点上的使用次数。（§A.3 中 $\Q[z]/(z^h)$ 的 $z$ 是 §3 的展开变量，另见条目"展开变量"。）` },
  { id: "zh", sym: R`z`, name: "展开变量（§3）", def: R`§A.3 与 \eqref{3.1} 中的 $z$：$\Delta(z)=A(t_0+z)-A_0$，小积和式在 $\Q[z]/(z^h)$ 中计算。与颜色变量 $z\in\Q^r$ 无关。` },
  { sym: R`a`, name: "颜色 / 插值节点 / 网格向量", def: R`\eqref{A.1} 与 $u_i(z)$ 中：颜色 $a\in[r]$；$\Lambda_a$、\eqref{A.4} 中：插值节点 $a\in\{0,\dots,n\}$；\eqref{A.5} 中：网格向量 $a\in\{0,\dots,n\}^r$（代入 $z=a$），$a_c$ 为其第 $c$ 个坐标。§A.3 中 $a=|S|=|T|$。` },
  { sym: R`b`, name: "块 / 插值节点 / 网格向量", def: R`$F_b$、$I_b$、$J_b$ 中：块的编号；\eqref{A.4} 中：插值节点；\eqref{A.5} 中：网格向量 $b\in\{0,\dots,n\}^r$（代入 $w=b$）。` },
  { sym: R`c`, name: "节点哑指标 / 坐标", def: R`$\Lambda_a$ 的乘积中跑遍其余节点 $c\ne a$；\eqref{A.5} 中跑遍颜色坐标 $c=1,\dots,r$。` },
  { sym: R`t`, name: "插值变量", def: R`单变量 Lagrange 基 $\Lambda_a(t)$ 的变量；$[t^k]$ 取 $t^k$ 的系数。§A.3 中 $t_0$ 为特殊点。` },
  { sym: R`k`, name: "次数指标", def: R`\eqref{A.4} 中系数的次数 $k=0,\dots,n$。` },
  { sym: R`I_b`, name: "第 b 个行块", def: R`$B$ 的行划分 $I_1,I_2,\dots$；$|I_b|\le s$。` },
  { sym: R`J_b`, name: "第 b 个列块", def: R`$B$ 的列划分 $J_1,J_2,\dots$，与 $I_b$ 对应；$|J_b|\le s$，不必等于 $|I_b|$。` },
  { sym: R`\Lambda`, name: "Lagrange 基", def: R`$\Lambda_a(t)=\prod_{c\ne a}\frac{t-c}{a-c}$：节点 $\{0,\dots,n\}$ 上的单变量 Lagrange 基，$\Lambda_a(c)=[a=c]$。` },
  { sym: R`\Q`, name: "有理数域", def: R`$\Q$；$\Q^r$ 为 $r$ 维有理向量，$\Q[z]/(z^h)$ 为截断多项式环。` },
  { sym: R`\chi`, name: "着色", def: R`证明中的着色映射 $\chi:I_b\setminus S\to[r]$，$\nu(\chi)$ 为其颜色计数向量。` },
  { sym: R`\Delta`, name: "增量矩阵", def: R`$\Delta(z)=A(t_0+z)-A_0$（§3），每个元素被 $z$ 整除。` },
  { sym: R`E_{\rm out}`, name: "输出低秩修正", def: R`特殊点处 $A(i)=B_i+E_{\rm out}$ 的低秩部分。` },
  { sym: R`f`, name: "测试多项式", def: R`示例中的次数 $\le n$ 的单变量多项式，$f_k=[t^k]f$。` },
  { sym: R`g`, name: "测试多项式", def: R`示例中的次数 $\le n$ 的单变量多项式，$g_k=[t^k]g$。` },
  { sym: R`C`, name: "Lagrange 系数矩阵", def: R`$C_{ak}=[t^k]\Lambda_a$；$C=\mathrm{Vd}^{-\mathsf T}$，$\kappa=C\,\diag(k!)\,C^{\mathsf T}$。` },
  { sym: R`G`, name: "另一个多项式", def: R`§A.1 警示框中与 $F$ 相乘的任意多项式，用来说明 $\cL_r$ 不保乘法。` },
  { sym: R`p`, name: "求值点", def: R`§A.1 警示框中的一个数值点 $p$；点取值 $F\mapsto F(p)$ 是乘法同态。` },
  { sym: R`m`, name: "子矩阵大小", def: R`§A.3 中子矩阵 $A_0[S^c,T^c]$ 的大小 $m=n-|S|\le n$。` },
  { sym: R`l`, name: "次数指标", def: R`证明中与 $k$ 并列的第二个次数指标：$\cL_1(z^kw^l)=k!\,[k=l]$。` },
  { sym: R`\one`, name: "全一向量", def: R`$\one=(1,\dots,1)$。` },
  { sym: R`P`, name: "积和式多项式", def: R`$P(t)=\per(A(t))$；$P^{(j)}(t_0)$ 为其 $j$ 阶导数，由 \eqref{3.1} 给出。` },
]);

export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本附录路线图" lead="动机 + 三小节。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="deps" toc="依赖图" kicker="证明结构" title="本附录在整篇证明中的位置" lead={R`高亮的是本附录的三个论断：\eqref{A.3} 依赖 \sref{L2.1}；\eqref{A.5} 依赖 \eqref{A.3}；空间版主定理依赖 \eqref{A.5}、\sref{L3.1} 与 \sref{T6.1}。附录 B 的 \sref{LB.1} 与替换律 \eqref{B.1} 也用到这里。`}>
        <DepGraph ids={pageIds("appA")} highlight="appA" />
        <StudyTable ids={["F:pairing", "F:numpair", "C:space"]} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="七张卡：四个代数工具，三个关于资源的观念。">
        <ConceptGrid />
      </Block>
      <SecA />
      <SecA1 />
      <SecA2 />
      <SecA3 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 附录 B：任意 #3SAT 与稀疏四次 gap">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="genpoly" /> · <C id="pairing" /> · <C id="kappa" /> · <C id="stream" /> · <C id="polyspace" /></p>
      </Block>
    </TextbookPage>);
}
