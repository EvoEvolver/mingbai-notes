// 第 3 页 §3 Derivatives and interpolation（原文 pp.5–6）——主文件
// 高层理解层在 _ch03_overview.jsx；正文 §3 在 _ch03_s0.jsx、§3.1 在 _ch03_s1.jsx；
// 可运行示例在 _ch03_demos.jsx，其精确计算在 _ch03_calc.js（可用 node 单独测试）。
import { TextbookPage, Block, Hook, Roadmap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable, pageIds } from "@kit";
import { notationFor } from "./_notation.js";
import { HOOK_TITLE, HOOK, ROADMAP, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch03_overview.jsx";
import { Sec3 } from "./_ch03_s0.jsx";
import { Sec31 } from "./_ch03_s1.jsx";

const R = String.raw;

export const meta = {
  id: "ch03", no: 3, title_en: "Derivatives and interpolation", title_zh: "导数与插值", pages: "5–6",
  one_liner: R`在每个特殊点上，用子矩阵积和式算出 $P(t)=\per(A(t))$ 的前 $h$ 阶导数 \eqref{3.1}，再用 Hermite 插值拼出 $P$、读出 $P(0)=\per(A)$。`,
  big_question: R`特殊点只有 $\ell$ 个，远少于 $\deg P\le nd$；而且特殊点上只有"每个方子矩阵的积和式"好算。凭这些，能否恢复 $\per(A)$？代价是多少？`,
  why_it_matters: R`本页把全文的"算法部分"封装成一个接口——\sref{P3.2}：只要构造出 $A(t)$，使特殊点上"小块 + 低秩"且 $d/\ell$ 小，就能在 $\poly(n)\,2^{O(s+r\log n+h\log(n/h))}$ 时间内算出 $\per(A)$。其中 $(n/h)^{O(h)}$ 这一项正是最终运行时间的主项；§4–§6 的全部工作都在为这三个参数服务。`,
  overview: R`§3 先证明 \sref{L3.1}：对积和式求导等价于对元素求偏导乘余子式积和式；把 $A(t_0+z)$ 写成 $A_0+\Delta(z)$ 后用加法公式展开，因为 $\Delta(z)$ 的每个元素被 $z$ 整除，$j$ 阶导数只涉及大小 $\le j$ 的子集对，得到式 \eqref{3.1}；枚举 $\sum_{a<h}\binom na^2\le(n/h)^{O(h)}$ 对子集即可。§3.1 用 Hermite 插值把 $\ell$ 个点、各 $h$ 阶导数拼成整个 $P$（需 $\ell h>nd$），得到 \sref{P3.2} 与运行时间 \eqref{3.2}，并把剩余任务归结为"构造 $d/\ell$ 小的 $A(t)$"。`,
  objectives: [
    R`由积和式的定义推出 $P'(t_0)=\sum_{u,v}A'_{uv}(t_0)\per(A_0$ 删去第 $u$ 行第 $v$ 列$)$，并说明为什么导数矩阵不需要结构`,
    R`用加法公式与整除性 $z^{|S|}\mid\per(\Delta(z)[S,T])$ 推导式 \eqref{3.1}`,
    R`证明 $\sum_{a<h}2^{O(a)}\binom na^2\le(n/h)^{O(h)}$，并说明 $h\le n/2$ 用在哪里`,
    R`证明 Hermite 插值的唯一性，写出合流 Vandermonde 方程组`,
    R`由 $h=\lfloor nd/\ell\rfloor+1$ 推出 $\ell h>nd$，组装出 \sref{P3.2} 的时间界 \eqref{3.2}`,
  ],
  prereq: [
    { ch: "ch02", what: "§2：积和式加法公式 (2.2)、引理 2.1（小块 + 低秩 ⇒ 每个方子矩阵的积和式都好算）、Ryser 公式与子集 DP" },
    { what: R`多项式的 Taylor 展开、唯一分解；二项式系数估计 $\binom nh\le(\mathrm{e}n/h)^h$` },
  ],
};

export const notation = notationFor("ch03", [
  { sym: R`G`, name: "示例系数矩阵", def: R`本页示例中 $A(t)=G_0+tG_1+t^2G_2$ 的系数矩阵（稀疏随机整数）；$A(0)=G_0$。` },
  { sym: R`\widetilde P`, name: "另一个候选多项式", def: R`示例 2 中 $\widetilde P=P+\prod_{i=1}^{\ell}(t-i)^h$：与 $P$ 在全部特殊点的 $0,\dots,h-1$ 阶导数相同，次数 $\ell h$。` },
  { sym: R`D`, name: "两候选之差", def: R`Hermite 唯一性证明中 $D=P_1-P_2$，$\deg D<\ell h$。` },
  { sym: R`N`, name: "插值数据量", def: R`$N=\ell h$：Hermite 方程组的未知数与方程个数。` },
  { sym: R`c`, name: "多项式系数", def: R`$c_k$：插值多项式 $\sum_kc_kt^k$ 的系数；$P(0)=c_0$。` },
  { sym: R`\sigma`, name: "子矩阵上的排列", def: R`$a\times a$ 子矩阵积和式展开中，$S$ 到 $T$ 的一一对应。` },
  { sym: R`s_k`, name: "S 的第 k 个元素", def: R`$S=\{s_1,\dots,s_a\}$。` },
  { sym: R`H`, name: "二元熵函数", def: R`$H(p)=-p\log_2p-(1-p)\log_2(1-p)$；$\log_2\binom nh\approx nH(h/n)$。` },
  { sym: R`\Q`, name: "有理数域", def: R`$\Q[z]/(z^h)$：只保留 $z^0,\dots,z^{h-1}$ 系数的截断多项式环。` },
  { sym: R`f`, name: "一般多项式", def: R`$[z^j]f$ 表示多项式 $f$ 中 $z^j$ 的系数。` },
  { sym: R`P_1`, name: "候选多项式", def: R`Hermite 唯一性证明中的两个候选 $P_1,P_2$。` },
  { sym: R`P_2`, name: "候选多项式", def: R`同 $P_1$。` },
]);
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本页路线图" lead={R`五步：一阶导数的机制 → 高阶导数 \eqref{3.1} → 代价 → Hermite 插值 → \sref{P3.2}。点击标题跳到该节。`}>
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="deps" toc="证明结构" kicker="证明结构" title="本页陈述在整体证明中的位置" lead={R`高亮的是本页陈述；悬停看上下游，点击看陈述与学习笔记。\sref{L3.1} 用 §2 的加法公式与 \sref{L2.1}；\sref{P3.2} 被第 6 节的主定理调用。`}>
        <DepGraph ids={pageIds("ch03")} highlight="ch03" />
        <StudyTable ids={["L3.1", "F:hermite", "P3.2"]} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="九张卡：前六张讲“导数从哪里来”，后三张讲“插值与参数”。">
        <ConceptGrid />
      </Block>
      <Sec3 />
      <Sec31 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 4 节：把坐标恒等式变成分块">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="minor_deriv" /> · <C id="addition" /> · <C id="cost" /> · <C id="hermite" /> · <C id="budget" /> · <C id="separation" /></p>
      </Block>
    </TextbookPage>);
}
