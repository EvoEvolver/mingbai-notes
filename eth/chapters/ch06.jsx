// 第 6 节 参数选择与推论（原文 pp.12–13）。参数账本在 _ledger.jsx；路径小工具在 _ch06_gadget.js / _ch06_demo.jsx。
import { TextbookPage, Block, Hook, Roadmap, ConceptGrid, Takeaways, Quiz, Bridge, Sec, Sub, Eq, Box, Stmt, Proof, DepGraph, StudyTable, Erratum, pageIds, Tx } from "@kit";
import { Ledger, LedgerPlot } from "./_ledger.jsx";
import { notationFor } from "./_notation.js";
import { HOOK_TITLE, HOOK, ROADMAP, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch06_overview.jsx";
import { GadgetDemo } from "./_ch06_demo.jsx";

const R = String.raw;

export const meta = {
  id: "ch06", no: 6, title_en: "Parameters and consequences", title_zh: "参数选择与推论", pages: "12–13",
  one_liner: R`代入 $q=\lceil(\log n)^{10}\rceil$、$\ell=\lceil\log_q(16\Delta\sqrt n)\rceil$、$d=\lceil100\sqrt{\ell\log\ell}\rceil$ 逐项记账：特殊点代价可忽略，导数代价 $h\log(n/h)$ 给出主定理；再归约到 #3SAT。`,
  big_question: R`前五节的零件拼起来以后，每个引理的前提是否都满足？哪一项代价决定最终指数？从稀疏积和式到 3-CNF 计数还差什么？`,
  why_it_matters: R`这是"证明的会计部门"：没有这一节，前面每个引理都只是条件句。参数账本也解释了指数中 $(\log\log n)^2/\sqrt{\log n}$ 的确切来源，以及定理在什么意义上是渐近的。`,
  overview: R`先用 \eqref{6.1} 选参数并验证引理 4.1 的前提；再由 §4 的分解与 §5 的局部多项式拼出 \eqref{6.2}，得到每个特殊点上的"小块 + 低秩"结构及其代价；最后命题 3.2 给出定理 6.1。本页的**参数账本**让你拖动 $n$ 看每一项的数值。第二部分是两个推论：经 Valiant/Ben-Dor–Halevi 归约与路径小工具得到稀疏 #3SAT 算法；经 [Sub26] 得到非确定时间的上界。`,
  objectives: [
    R`验证 \eqref{6.1} 满足引理 4.1 的条件，并推出 $\ell,M,d,h$ 的量级`,
    R`算出 $s$、$r\log n$、$h\log(n/h)$，说明哪一项占主导`,
    R`解释路径小工具为何保持积和式并把度数降到 3`,
    R`用参数账本说明主定理的渐近性质`,
  ],
  prereq: [
    { ch: "ch03", what: "第 3 节：命题 3.2（由结构化取值恢复积和式）" },
    { ch: "ch04", what: "第 4 节：引理 4.1、4.3 与 (4.9)" },
    { ch: "ch05", what: "第 5 节：定理 5.1" },
  ],
};

export const notation = notationFor("ch06", [
  { sym: R`T`, name: "时间", def: R`非确定图灵机的运行时间（§6 末推论）。` },
  { sym: R`N`, name: "公式规模", def: R`每个公式的变量/子句数 $N=O(T\log\log T)$。` },
]);
export const groups = G, concepts = CS, relations = RL;

function Sec6() {
  return (
    <Sec n="6" title="Parameters and consequences" zh="参数选择与推论"
      gist={R`取 \eqref{6.1}，拼出 $A(t)$ \eqref{6.2}；特殊点代价 $2^{O(n/\log^{10}n)}$，导数代价 $2^{O(n(\log\log n)^2/\sqrt{\log n})}$ 占主导，得定理 6.1；再推到 #3SAT 与 NTIME。`}
      why={R`前面每个结论都带着前提（$Q$ 的范围、$h\le n/2$、块大小、秩），这里一次性兑现。`}
      gives={["6.1", "6.2"]}>
      <Sub n="6(a)" title="Choosing the parameters" zh="选参数">
        <Tx>{R`现在把构造与积和式算法合起来。固定输入的最大度 $\Delta=O(1)$，取`}</Tx>
        <Eq n="6.1" keyEq title="参数选择" say={R`字母表大小取 $\log n$ 的十次方；词长取刚好让 $q^\ell$ 超过 $16\Delta\sqrt n$ 的最小整数；局部多项式次数取 $100\sqrt{\ell\log\ell}$。`}>{R`q=\lceil(\log n)^{10}\rceil,\qquad \ell=\left\lceil\log_q(16\Delta\sqrt n)\right\rceil,\qquad d=\lceil100\sqrt{\ell\log\ell}\rceil.`}</Eq>
        <Tx>{R`于是`}</Tx>
        <Eq say={R`由 $\ell$ 的取法：$q^\ell$ 至少是 $16\Delta\sqrt n$，而 $q^{\ell-1}$ 还不到它，所以 $q^\ell$ 小于 $q$ 倍的 $16\Delta\sqrt n$。`}>{R`16\Delta\sqrt n\le Q=q^\ell<16\Delta q\sqrt n,`}</Eq>
        <Tx>{R`所以对充分大的 $n$，着色引理 \sref{L4.1} 适用。特别地`}</Tx>
        <Eq say={R`词长约为 $\log n/(20\log\log n)$；中间维数至多 $n\log^{20}n$ 量级；局部次数是 $\sqrt{\log n}$ 量级。`}>{R`\ell=\Theta\!\left(\frac{\log n}{\log\log n}\right),\qquad M\le Q^2=O(n\log^{20}n),\qquad d=\Theta(\sqrt{\log n}).`}</Eq>
        <Proof title="补全：参数满足引理 4.1，且量级如上" steps={[
          { claim: R`$Q\ge16\Delta\sqrt n\ge4\Delta\sqrt n$。`, why: R`$\ell$ 是使 $q^\ell\ge16\Delta\sqrt n$ 的最小整数。`, fill: true },
          { claim: R`$Q<16\Delta q\sqrt n=16\Delta(\log n)^{10}\sqrt n\le n$（$n$ 充分大）。`, why: R`$q^{\ell-1}<16\Delta\sqrt n$；$\sqrt n$ 增长快于任何 polylog。`, fill: true },
          { claim: R`$q\ge4\Delta\ell$。`, why: R`$\ell\le\log n$，而 $q=(\log n)^{10}\ge4\Delta\log n$。`, uses: ["L4.1"], fill: true },
          { claim: R`$\ell=\lceil(\tfrac12\log n+\log(16\Delta))/\log q\rceil$，$\log q\approx10\log\log n$，故 $\ell\approx\log n/(20\log\log n)=\Theta(\log n/\log\log n)$。`, why: "取对数。", fill: true },
          { claim: R`$M=(q(q-1))^\ell\le q^{2\ell}=Q^2<256\Delta^2q^2n=O(n\log^{20}n)$。`, why: "上一行的 Q 上界。", fill: true },
          { claim: R`$d=\Theta(\sqrt{\ell\log\ell})=\Theta\big(\sqrt{(\log n/\log\log n)\cdot\log\log n}\big)=\Theta(\sqrt{\log n})$。`, why: R`$\log\ell=\Theta(\log\log n)$。`, fill: true },
        ]} />
      </Sub>

      <Sub n="6(b)" title="Assembling A(t) and the accounting" zh="拼出 $A(t)$ 并记账">
        <Tx>{R`构造 $L,R'$ 与局部多项式 $J(t)$，令`}</Tx>
        <Eq n="6.2" keyEq title="变形族" say={R`变形族：输入相关的 $L,R'$ 不动，只把中间矩阵换成 \sref{T5.1} 的 $J(t)$（每个立方体一份）。`}>{R`A(t)=L(I_C\otimes J(t))R'.`}</Eq>
        <Stmt id="F:At">
          <Proof steps={[
            { claim: R`$A(0)=L(I_C\otimes X^{\otimes\ell})R'=L\cJ R'=A$。`, why: R`$J(0)=X^{\otimes\ell}$，再用 \eqref{4.7}。`, uses: ["T5.1", "F:factor"] },
            { claim: R`$\deg A(t)\le d$。`, why: R`$L,R'$ 是常数矩阵，$\deg J\le d$。` },
            { claim: R`对每个 $i\in[\ell]$：$A(i)=L(I_C\otimes K_i)R'+L(I_C\otimes E)R'=B_i+E_{\rm out}$。`, why: R`$J(i)=K_i+E$。`, uses: ["T5.1"] },
            { claim: R`$B_i$ 有以 $a\in[q]$ 为指标的对应对角块，大小 $s\le3n/q$。`, why: R`$K_i$ 是 $i$-好的。`, uses: ["L4.3", "F:balance"] },
            { claim: R`$r:=\rank(E_{\rm out})\le M/\ell^{100}$，且同一个 $E_{\rm out}$ 适用于所有特殊点。`, why: R`$\rank(E)\le2^\ell/\ell^{100}$，取 $\varepsilon=\ell^{-100}$。`, uses: ["F:survive"] },
          ]} />
        </Stmt>
        <Tx>{R`在每个 $i\in[\ell]$，引理 4.3 与 \eqref{4.9} 给出`}</Tx>
        <Eq say={R`每个特殊点的矩阵 = 块大小至多 $3n/q$ 的分块矩阵 + 秩至多 $M/\ell^{100}$ 的修正。`}>{R`A(i)=B_i+E_{\rm out},\qquad s\le\frac{3n}{q},\qquad r:=\rank(E_{\rm out})\le\frac{M}{\ell^{100}}.`}</Eq>
        <Tx>{R`同一个输出修正对所有点都适用。定量地，`}</Tx>
        <Eq say={R`块大小是 $n/\log^{10}n$；秩乘 $\log n$ 后仍比 $n/\log^{10}n$ 小得多。`}>{R`s=O(n/\log^{10}n),\qquad r\log n=O\!\left(\frac{n(\log\log n)^{100}}{(\log n)^{79}}\right)=o(n/\log^{10}n).`}</Eq>
        <Proof title="补全：r log n 的界" steps={[
          { claim: R`$r\le M/\ell^{100}=O(n\log^{20}n)\cdot O\big((\log\log n/\log n)^{100}\big)=O\big(n(\log\log n)^{100}/(\log n)^{80}\big)$。`, why: R`$\ell=\Theta(\log n/\log\log n)$。`, fill: true },
          { claim: R`乘 $\log n$：$r\log n=O\big(n(\log\log n)^{100}/(\log n)^{79}\big)$，相对 $n/\log^{10}n$ 小 $(\log\log n)^{100}/(\log n)^{69}\to0$ 倍。`, why: "直接比较。", fill: true },
        ]} />
        <Tx>{R`所以每个特殊点上的方子矩阵积和式代价 $2^{O(n/\log^{10}n)}$（\sref{L2.1}）。插值取`}</Tx>
        <Eq say={R`每个特殊点需要的导数阶数，量级为 $n\log\log n/\sqrt{\log n}$。`}>{R`h=\left\lfloor\frac{nd}{\ell}\right\rfloor+1=\Theta\!\left(\frac{n\log\log n}{\sqrt{\log n}}\right).`}</Eq>
        <Tx>{R`导数代价占主导，因为`}</Tx>
        <Eq keyEq title="主项" say={R`导数枚举的子矩阵对数取对数后是 $h\log(n/h)$，量级 $n(\log\log n)^2/\sqrt{\log n}$——这就是主定理的指数。`}>{R`h\log(n/h)=O\!\left(\frac{n(\log\log n)^2}{\sqrt{\log n}}\right).`}</Eq>
        <Tx>{R`现在 \sref{P3.2} 就证明了主结果。`}</Tx>
        <Stmt id="T6.1">
          <Proof steps={[
            { claim: R`前提：$A(0)=A$，$\deg A(t)\le d$，每个 $A(i)$ 为"块 $\le s$ + 秩 $\le r$"。`, uses: ["F:At"] },
            { claim: R`$h=\lfloor nd/\ell\rfloor+1\le n/2$ 对充分大的 $n$ 成立。`, why: R`$d/\ell=\Theta(\log\log n/\sqrt{\log n})\to0$。`, fill: true },
            { claim: R`命题 3.2 给出时间 $\poly(n)2^{O(s+r\log n+h\log(n/h))}$。`, uses: ["P3.2"] },
            { claim: R`代入：$s+r\log n=O(n/\log^{10}n)$，$h\log(n/h)=O(n(\log\log n)^2/\sqrt{\log n})$，后者占主导，即 \eqref{1.1}。`, why: R`$\sqrt{\log n}\ll\log^{10}n$。` },
            { claim: R`$\ell,d$ 与输入描述都是多项式有界；所有数为多项式比特（见下方"精确算术"）。`, why: "命题 3.2 的附加假设。" },
          ]} />
        </Stmt>
        <Box kind="note" title="精确算术（原文 “Exact arithmetic” 段）">{R`辅助维数与多项式次数都是 $n$ 的多项式。插值多项式 $p$、它的各次代入、因子 $L,R'$ 都有多项式比特的有理描述。秩分解与 Hermite 插值解多项式维数的有理线性方程组，行列式界保证解是多项式比特的。积和式 DP 对多项式多个这样的数做乘积求和；阶乘权重只增加多项式比特。公共分母可以始终保持多项式比特长度。所以精确的比特算术只带来多项式开销。`}</Box>
        <Erratum kind="note" loc="§6、定理 6.1" title="“充分大的 n”到底多大">{R`各条件（$Q\le n$、$q\ge4\Delta\ell$、$d\le\ell$、$h\le n/2$）以及"导数项低于 $n$"都只在渐近意义下成立。按 \eqref{6.1} 的显式常数，参数账本显示 $h\le n/2$ 约在 $\log_2n\approx5\times10^8$ 时才成立，总指数低于 $n$ 更要到 $\log_2n\sim10^{10}$ 量级。把 $d$ 的常数 100 换成约 24（仍保证 \eqref{5.6}）门槛会大幅下降。这是论文刻意选用"宽松常数"以简化证明的结果，不影响渐近结论；原文也明说指数 100 可换成任意固定常数。`}</Erratum>
      </Sub>

      <Sub n="6(c)" title="From sparse 3-CNF to sparse permanent" zh="从稀疏 3-CNF 到稀疏积和式">
        <Stmt id="X:valiant" />
        <Tx>{R`Valiant 与 Ben-Dor–Halevi 的带权积和式归约 [Val79, BH93] 把 $n$ 变量、$O(n)$ 子句的 3-CNF 送到维数 $O(n)$、$O(n)$ 个非零元、有界整数权的矩阵；它的积和式是满足赋值数的一个已知非零倍数。

为了控制**单个顶点**的度，把支撑看成二部图：把度为 $k$ 的顶点换成 $2k-1$ 个顶点的路径，原来的关联边接在奇数位置，路径边权为 1。`}</Tx>
        <Stmt id="F:reduce">
          <Proof steps={[
            { claim: R`设路径位置 $1,\dots,2k-1$；奇数位置（$k$ 个）与原顶点同侧，偶数位置（$k-1$ 个）在对侧，偶数位置只有路径边。`, why: "二部图中路径交替两侧。", fill: true },
            { claim: R`任一完美匹配中，$k-1$ 个偶数顶点必须与相邻奇数顶点配对，占用 $k-1$ 个奇数顶点；剩下恰好 1 个奇数顶点用外部边。`, why: "计数。原文用奇偶表述：两个奇数位置都用外部边会留下奇数长的内部区间，都不用则剩奇数个顶点的路径。" },
            { claim: R`若外部边在位置 $2m-1$，则位置 $1..2m-2$ 与 $2m..2k-1$ 是两段偶数个顶点的路径，各有唯一完美匹配，权为 1。`, why: "路径的完美匹配唯一（从端点开始被迫配对）。", fill: true },
            { claim: R`所以原图的每个完美匹配恰对应新图的一个完美匹配，权重相同：带权匹配和（积和式）不变。`, why: "双射。" },
            { claim: R`先替换左侧所有顶点，再替换右侧所有顶点：奇数位置顶点的度 $\le2+1=3$，偶数位置为 2；新增顶点 $\sum(2k-2)=O(\#\text{边})=O(n)$。`, why: R`第二轮替换时，左侧新顶点各只有一条外部边，替换右侧不会增加它们的度。`, fill: true },
          ]} />
        </Stmt>
        <Tx>{R`于是定理 6.1 在 \eqref{1.1} 时间内计数稀疏 3-CNF。标准的计数稀疏化已经能把它推广到任意 3-CNF，只是对数节省更小；附录 B 保持完整的界 \eqref{1.1}（\sref{TB.5}）。`}</Tx>
      </Sub>

      <Sub n="6(d)" title="A consequence for nondeterministic time" zh="非确定时间的推论">
        <Stmt id="X:sub26" notes={false} />
        <Tx>{R`[Sub26] 中的调度条件编码把时间 $T$ 的固定带数非确定多带图灵机的接受计算归约为至多 $2^{O(T\log\log T/\log T)}$ 个公式，每个有 $O(T\log\log T)$ 个变量与子句。对通常的时间可构造界，应用稀疏公式算法得到`}</Tx>
        <Eq keyEq title="非确定时间上界" say={R`非确定时间 $T$ 的问题可以在 $2^{O(T(\log\log T)^3/\sqrt{\log T})}$ 的确定时间内解决。`}>{R`\NTIME(T)\subseteq\DTIME\!\left(2^{O(T(\log\log T)^3/\sqrt{\log T})}\right).`}</Eq>
        <Stmt id="C:NTIME">
          <Proof steps={[
            { claim: R`公式规模 $N=O(T\log\log T)$；每个公式代价 $2^{O(\rho(N))}$，$\rho(N)=N(\log\log N)^2/\sqrt{\log N}$。`, uses: ["F:reduce"] },
            { claim: R`$\rho(N)=O\big(T\log\log T\cdot(\log\log T)^2/\sqrt{\log T}\big)=O\big(T(\log\log T)^3/\sqrt{\log T}\big)$。`, why: R`$\log N=\Theta(\log T)$。`, fill: true },
            { claim: R`公式个数 $2^{O(T\log\log T/\log T)}$ 被上式吸收。`, why: R`$1/\log T\ll(\log\log T)^2/\sqrt{\log T}$。`, fill: true },
          ]} />
        </Stmt>
        <Tx>{R`这个推论中非平凡的成分是调度条件编码；它独立于这里证明的积和式算法。`}</Tx>
      </Sub>
    </Sec>);
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本节路线图"><Roadmap steps={ROADMAP} /></Block>
      <Block id="depgraph" toc="证明结构" kicker="证明结构" title="本节陈述及其上下游" lead="高亮的是本节的陈述。主定理 6.1 汇集了 §2–§5 的全部结论。">
        <DepGraph ids={pageIds("ch06")} highlight="ch06" focus="T6.1" />
        <StudyTable ids={["F:At", "T6.1", "F:reduce", "C:NTIME"]} />
      </Block>
      <Block id="ledger" toc="参数账本" kicker="参数账本" title="参数账本：每一项代价是多少" lead={R`拖动 $\log_2 n$ 与各常数。表中逐项列出参数取值、引理前提是否成立、三类代价（以 2 为底的指数 $\div n$）。下方曲线图给出总指数随 $n$ 的变化。`}>
        <Ledger initial={10.3} />
        <LedgerPlot />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念"><ConceptGrid /></Block>
      <Sec6 />
      <Block id="demo" toc="示例" kicker="动手" title="路径小工具：在浏览器里验证"><GadgetDemo /></Block>
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 附录 A：多项式空间">{BRIDGE}</Bridge>
      </Block>
    </TextbookPage>);
}
