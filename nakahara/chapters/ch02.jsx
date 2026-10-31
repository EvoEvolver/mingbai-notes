// 第 2 章 数学预备（Nakahara, Geometry, Topology and Physics, 2nd ed., PDF pp. 87–112）——主文件
// 高层理解层在 _ch02_overview.jsx；符号词典在 _ch02_notation.jsx；陈述登记表在 _ch02_stmts.js（经 book.js 合并）；
// 正文：_ch02_s1.jsx（引言 + §2.1）、_ch02_s2.jsx（§2.2）、_ch02_s3.jsx（§2.3）、_ch02_s4.jsx（§2.4）、_ch02_ex.jsx（章末习题）；
// 交互图在 _ch02_demos.jsx（多边形粘合、连续性、拓扑不变量判别、Euler 示性数）。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable } from "@kit";
import { NOTATION } from "./_ch02_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch02_overview.jsx";
import { Intro, Sec21 } from "./_ch02_s1.jsx";
import { Sec22 } from "./_ch02_s2.jsx";
import { Sec23 } from "./_ch02_s3.jsx";
import { Sec24 } from "./_ch02_s4.jsx";
import { Problems } from "./_ch02_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch02", no: 2, title_en: "Mathematical Preliminaries", title_zh: "数学预备", pages: "87–112",
  one_liner: R`用等价关系把正方形粘成环面、Klein 瓶与 $\mathbb{R}\mathrm{P}^2$；用对偶空间、伴随与张量搭好"局部"的线性语言；用开集定义连续、紧致、连通与同胚；再用拓扑不变量——尤其是与剖分无关的 Euler 示性数 $\chi=V-E+F$——证明两个空间"不一样"。`,
  big_question: R`怎样精确地说"把边粘起来"？怎样精确地说两个形状"本质上相同"——又怎样**证明**它们不同？在没有距离的空间里，"连续""接近""有限"还有意义吗？`,
  why_it_matters: R`流形局部像 $\mathbb{R}^n$（向量空间的语言）、整体有拓扑（开集与同胚的语言），本章把这两套语言一次备齐。商空间是此后构造一切空间（$S^n$、$T^n$、$\mathbb{R}\mathrm{P}^n$、陪集空间 $G/H$、纤维丛）的基本手法；对偶与张量是微分形式与 Riemann 几何的语法；"玩具指标定理" $\dim\ker f-\dim\ker\tilde f=\dim V-\dim W$ 是第 12 章指标定理的有限维原型；Euler 示性数则是第 3 章同调群的出发点。`,
  overview: R`本章分四步。**§2.1 映射**：单射、满射、双射、复合与逆；等价关系把集合划分为等价类，商空间 $X/\sim$ 就是"粘合"——$\mathbb{R}/\sim\ =S^1$，正方形按不同方式粘边得到柱面、Möbius 带、环面、Klein 瓶、射影平面，$D^2/S^1=S^2$。**§2.2 向量空间**：基与分量、维数公式 $\dim V=\dim\ker f+\dim\operatorname{im}f$、对偶基与拉回、内积与伴随 $\tilde f=g^{-1}f^{\rm t}G^{\rm t}$、玩具指标定理、$(p,q)$ 型张量。**§2.3 拓扑空间**：开集公理、度量拓扑、连续（开集的逆像是开集）、邻域与 Hausdorff、闭集与边界、紧致（Heine–Borel）、连通与单连通。**§2.4 同胚与不变量**：同胚、拓扑不变量、同伦型、Euler 示性数与连通和 $\chi(X\sharp Y)=\chi(X)+\chi(Y)-2$。四个交互图让你在浏览器里粘合任意多边形并读出 $\chi$ 与可定向性、用逆像检验连续性、用不变量判别同胚、在真实多面体上验证 $\chi$ 与剖分无关。`,
  objectives: [
    R`判断映射的单射/满射/双射性，并由 $g\circ f=\mathrm{id}_X$ 推出 $f$ 单、$g$ 满（习题 2.3）`,
    R`验证一个关系是等价关系，并用商空间描述柱面、Möbius 带、$T^2$、Klein 瓶、$\sym{RP}{\RP^2}$ 与 $S^n=D^n/S^{n-1}$`,
    R`证明维数公式 \eqref{2.8}，写出对偶基 \eqref{2.10}、拉回 \eqref{2.13}、伴随矩阵 \eqref{2.19}，并由此证明玩具指标定理 \eqref{2.21}`,
    R`用开集语言检验连续性（\eqref{2.27}）、紧致性（Heine–Borel）与连通性，并说出它们为什么是拓扑不变量`,
    R`用 $\chi=V-E+F$ 计算曲面的 Euler 示性数（含带粘合的多边形），并用 $\chi(X\sharp Y)=\chi(X)+\chi(Y)-2$ 得到 $\chi(\Sigma_g)=2-2g$`,
  ],
  prereq: [
    { ch: "ch01", what: R`第 1 章：量子力学中的对偶空间（bra 与 ket，§1.2）——§2.2.3 会从数学角度重述` },
    { what: R`本科数学：集合论、微积分（$\varepsilon$–$\delta$ 连续性）、复分析、线性代数（矩阵、秩、行列式）` },
  ],
};

export const notation = NOTATION;
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["D2.1", "D2.2", "T2.1", "T2.2", "D2.3", "D2.4", "D2.5", "D2.6", "D2.7", "T2.3", "D2.8", "D2.9", "D2.10", "T2.4", "T2.5", "T2.6"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="映射与粘合 → 线性代数 → 拓扑空间 → 同胚与不变量。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。主干是线性代数一支：基 → 维数公式 → 对偶 → 内积 → 伴随 → 玩具指标定理 \eqref{2.21}；另一支是 Euler 示性数 \eqref{2.31} 经连通和走到 $\Sigma_g$ \eqref{2.34}。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="deps" toc="定理依赖" kicker="定理依赖" title="定义与定理的依赖关系" lead="上：依赖图（被依赖者在上；悬停看上下游，点击看陈述）。定理 2.4 的完整证明要用到第 3 章的同调理论，图中一并画出。下：本章陈述一览，含每条的作用与核对状态（✚ 表示原书略写或未证、本站已补全）。">
        <DepGraph ids={[...OWN, "T3.4", "T3.7"]} highlight="ch02" />
        <StudyTable ids={OWN} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec21 />
      <Sec22 />
      <Sec23 />
      <Sec24 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 3 章：同调群">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="quotient" /> · <C id="adjoint" /> · <C id="homeo" /> · <C id="euler" /></p>
      </Block>
      <Problems />
    </TextbookPage>);
}
