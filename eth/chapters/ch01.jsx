// 第 1 节 目标与证明纲要（原文 pp.1–2）——全站的"地图页"：九步纲要、全局证明依赖图、学习笔记总表、参数账本。
// 高层理解层在 _ch01_overview.jsx；正文在 _ch01_s1.jsx；可运行示例在 _ch01_demo.jsx。
import { TextbookPage, Block, Hook, Roadmap, ConceptGrid, Takeaways, Quiz, Bridge, Tx, DepGraph, StudyTable } from "@kit";
import { Ledger } from "./_ledger.jsx";
import { notationFor } from "./_notation.js";
import { HOOK_TITLE, HOOK, ROADMAP, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch01_overview.jsx";
import { Sec1 } from "./_ch01_s1.jsx";
import { MatchingDemo } from "./_ch01_demo.jsx";

const R = String.raw;

export const meta = {
  id: "ch01", no: 1, title_en: "Goal and outline of the proof", title_zh: "目标与证明纲要", pages: "1–2",
  one_liner: R`稀疏矩阵的积和式可以在 $2^{O(n(\log\log n)^2/\sqrt{\log n})}$ 时间内精确算出：把 $A$ 放进一个低次矩阵多项式，在少数“好点”上求导数，再插值回 $t=0$。`,
  big_question: R`一个 $2^n$ 量级、六十年没有本质改进的问题，怎样被拆成"好算的点 + 低阶导数 + 插值"？每一步需要什么、产出什么、各自花多少时间？`,
  why_it_matters: R`这是全文的地图。九个步骤分属两个互不依赖的部分：**算法**（§2–§3：在好点上算积和式与导数）与**代数**（§4–§5：造出有很多好点的低次族）；§6 把参数代入、合计代价。后面每一页都从这里的某一步展开。`,
  overview: R`本页包含四样东西：(1) 原文第 1 节的九步纲要，每步注明在哪里证明；(2) **全局证明依赖图**——所有定义、引理、命题、定理以及证明链上的关键论断，悬停看上下游、点击看陈述；(3) **学习笔记总表**——每个陈述在整体证明中的作用与核对状态；(4) **参数账本**——拖动 $n$，看 $q,\ell,d,h,s,r$ 如何取值、各阶段代价如何相加，以及为什么最终是 $2^{n(\log\log n)^2/\sqrt{\log n}}$。`,
  objectives: [
    R`说出插值策略的四个组成部分：结构化积和式、导数、低次变形族、Hermite 插值`,
    R`解释为什么节省来自 $d/\ell\ll1$，并由 $h\approx nd/\ell$ 推出指数中的 $(\log\log n)^2$`,
    R`在依赖图上指出主定理 6.1 依赖哪些引理，哪些部分只在附录 B 中使用`,
    R`理解"计数算法 ⇒ 判定算法 ⇒ ETH 不成立"的推理链`,
  ],
  prereq: [
    { what: R`矩阵与张量积（Kronecker 积）、多项式插值、二项系数估计 $\binom na\le(en/a)^a$` },
    { what: R`复杂度基本概念：$O,\Theta,o$；#P、3SAT 与归约` },
  ],
};

export const notation = notationFor("ch01");
export const groups = G, concepts = CS, relations = RL;

const ALL_NUMBERED = ["L2.1", "L3.1", "P3.2", "L4.1", "D4.2", "L4.3", "T5.1", "T6.1", "LB.1", "TB.2", "LB.3", "LB.4", "TB.5"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="how" toc="怎样读本站" kicker="使用说明" title="这类论文怎样读：三层结构">
        <Tx>{R`教科书的骨架是"推导"——一个方程推出下一个方程；这篇论文的骨架是**证明依赖**——一个引理被用在另一个引理的证明里，以及一本**参数账本**——每个参数为什么这样选、每一步代价怎样相乘。所以本站在框架原有的"高层理解层 + 严谨正文层"之外，加了三样东西：

**① 陈述环境**：每个定义/引理/命题/定理都用与原文一致的编号排版，下面附 📒 学习笔记（作用、依赖、被谁使用、证明最关键的一步、易卡点、核对状态）。正文中的 \sref{L2.1} 这样的引用悬停即可预览陈述、点击跳转（跨页亦可）。

**② 分步证明**：每一步一句断言 + 一句理由 + 用到的引理/公式；原文略写处由本站补全，标为"补全"。

**③ 可运行示例**：在浏览器里用精确有理数实际算——Ryser 公式、加法公式、低秩 DP、矩阵分解、奇偶多项式、模 $2^b$ 的 gap……把每个关键恒等式在小规模上验证一遍。`}</Tx>
      </Block>
      <Block id="roadmap" toc="九步纲要" kicker="路线图" title="证明纲要：九步" lead="原文第 1 节把证明分成九步。点击标题跳到本页对应的讲解；每张卡注明在哪一节证明。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="depgraph" toc="全局依赖图" kicker="证明结构" title="全局证明依赖图" lead="节点是陈述（颜色表示类型），箭头从“被用到的”指向“用到它的”。主定理 6.1 在中部；附录 A、B 的陈述在下方。悬停高亮全部上下游；点击在右侧查看陈述、作用与依赖，并可跳转到所在页的证明。">
        <DepGraph focus="T6.1" />
      </Block>
      <Block id="study" toc="学习笔记总表" kicker="学习笔记" title="全部编号陈述：作用与核对状态" lead="“已逐步核对”：本站逐行验证了原文证明；“原文略写，本站已补全”：原文跳过的步骤在对应页的分步证明中补出；“有注记”：原文正确，但有一个容易忽略的细节，见对应页的注记框。">
        <StudyTable ids={ALL_NUMBERED} />
      </Block>
      <Block id="ledger" toc="参数账本" kicker="参数账本" title={R`参数账本：为什么是 $2^{n(\log\log n)^2/\sqrt{\log n}}$`} lead={R`拖动 $\log_2 n$。表中按 \eqref{6.1} 计算各参数；下面三行是三类代价（以 2 为底的指数除以 $n$）。总指数低于 1 时，算法才真正快于 Ryser 的 $2^n$。第 6 页有更完整的版本与曲线图。`}>
        <Ledger initial={10.3} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十张卡串起全文：先读一句话版本，点开看深入解释、类比、原文出处与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec1 />
      <Block id="demo" toc="示例" kicker="动手" title="从零开始：积和式到底在数什么">
        <MatchingDemo />
      </Block>
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 2 节：计算结构化积和式">{BRIDGE}</Bridge>
      </Block>
    </TextbookPage>);
}
