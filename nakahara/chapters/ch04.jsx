// 第 4 章 同伦群（Nakahara, Geometry, Topology and Physics, 2nd ed., PDF pp. 141–188）——主文件
// 高层理解层在 _ch04_overview.jsx；符号词典在 _ch04_notation.jsx；陈述登记表在 _ch04_stmts.js（经 book.js 合并）；
// 正文：_ch04_s1.jsx（引言 + §4.1）、_ch04_s2.jsx（§4.2–4.3）、_ch04_s4.jsx（§4.4）、_ch04_s5.jsx（§4.5–4.7）、
//       _ch04_s8.jsx（§4.8）、_ch04_s9.jsx（§4.9–4.10）、_ch04_ex.jsx（章末习题）；
// 交互图在 _ch04_demos.jsx，边群/群表示算法在 _ch04_edge.js（复用第 3 章 _ch03_homology.js 的 Smith 标准形与 H_1）。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable } from "@kit";
import { NOTATION } from "./_ch04_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch04_overview.jsx";
import { Intro, Sec41 } from "./_ch04_s1.jsx";
import { Sec42, Sec43 } from "./_ch04_s2.jsx";
import { Sec44 } from "./_ch04_s4.jsx";
import { Sec45, Sec46, Sec47 } from "./_ch04_s5.jsx";
import { Sec48 } from "./_ch04_s8.jsx";
import { Sec49, Sec410 } from "./_ch04_s9.jsx";
import { Problems } from "./_ch04_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch04", no: 4, title_en: "Homotopy Groups", title_zh: "同伦群", pages: "141–188",
  one_liner: R`把"能否连续地变成彼此"做成群：圈的同伦类构成基本群 $\pi_1$，球面的同伦类构成高阶同伦群 $\pi_n$；包围缺陷的球面上的序参量是映射 $S^n\to M$，它的同伦类就是涡旋、向错、单极子与无奇点织构的拓扑荷。`,
  big_question: R`怎样判断一个空间里的圈（或球面）能否连续地收缩成一点？怎样把这个判断变成可计算的群，并用它解释为什么超导涡旋的磁通是量子化的、为什么液晶里只有"半整数"向错是稳定的？`,
  why_it_matters: R`同伦群是物理学中"拓扑稳定性"的通用语言：磁通量子化（$\pi_1(\mathrm{U}(1))=\mathbb{Z}$）、自旋 $\frac12$ 与 Dirac 皮带（$\pi_1(\mathrm{SO}(3))=\mathbb{Z}_2$）、斯格明子（$\pi_2(S^2)=\mathbb{Z}$）、瞬子与 Shankar 单极子（$\pi_3(\mathrm{SU}(2))=\mathbb{Z}$）都是同一个问题的不同实例。它也与第 3 章的同调群精确地接上（$H_1=\pi_1$ 的交换化），并为第 9–10 章纤维丛的分类（粘合函数的同伦类）做好准备。`,
  overview: R`**§4.1** 道路、圈与同伦，基本群 $\pi_1(X,x_0)$ 的定义与群公理。**§4.2** 一般性质：与基点无关、同伦不变性、形变收缩与可缩空间。**§4.3** 用万有覆叠 $\mathbb{R}\to S^1$ 证明 $\pi_1(S^1)=\mathbb{Z}$（映射度），积空间与环面。**§4.4** 多面体的基本群：自由群与群表示，边群与极大树的"游戏规则"，环面、Klein 瓶、$\RP^2$、花束；$H_1$ 是 $\pi_1$ 的交换化。**§4.5–4.7** 高阶同伦群：定义、交换性、万有覆叠定理、$\pi_n(S^n)=\mathbb{Z}$、$\mathrm{SO}(3)\cong\RP^3$ 与 $\mathrm{SU}(2)\cong S^3$、表 4.1 与 Bott 周期性。**§4.8–4.10** 物理：序参量空间与缺陷分类 $n=d-m-1$；超导涡旋、向列相的向错/刺猬/$\pi_3$ 织构、$^3$He-A 的 disgyration、无芯涡旋与 Shankar 单极子。四个交互图：手画闭曲线算卷绕数；在矢量场/指向矢场中放置缺陷并读出 $\pi_1(M)$ 中的类；按边群规则计算 $\pi_1$ 并与第 3 章的 $H_1$ 对照；数值积分斯格明子的拓扑荷。`,
  objectives: [
    R`写出圈的乘积 \eqref{4.1} 与同伦 \eqref{4.3}，并用显式同伦证明 $\pi_1(X,x_0)$ 满足群公理（\sref{T4.1}）`,
    R`用形变收缩与同伦不变性（\sref{T4.3}）化简空间，判断可缩性；用提升与映射度证明 $\pi_1(S^1)\cong\mathbb{Z}$`,
    R`对给定三角剖分取极大树、读出生成元与关系，算出环面、Klein 瓶、$\RP^2$、花束的 $\pi_1$，并由交换化得到 $H_1$`,
    R`解释高阶同伦群为何交换、万有覆叠为何不改变 $\pi_n$（$n\ge2$），并由此得到 $\pi_n(\RP^m)$、$\pi_n(\mathrm{SO}(3))$`,
    R`对给定的序参量空间 $M$ 与介质维数，用 $\pi_{d-m-1}(M)$ 判断缺陷是否拓扑稳定（超导涡旋、向列相向错与刺猬、$^3$He-A 织构）`,
  ],
  prereq: [
    { ch: "ch02", what: R`第 2 章：拓扑空间、连续映射、同胚、（弧）连通与单连通（定义 2.8）；等价关系（定义 2.2）；习题 2.3（$g\circ f=\mathrm{id}$ 推出单射/满射）；亏格 $g$ 曲面的多边形表示（章末题 2.1）` },
    { ch: "ch03", what: R`第 3 章：同态基本定理（定理 3.1）、单纯复形与三角剖分、同调群 $H_1$ 与 Smith 标准形（交互图 3 直接复用第 3 章算法）；Möbius 带的剖分（图 3.8）` },
    { what: R`群论基础（正规子群、商群）；复数与 $\mathrm{SU}(2)$、$\mathrm{SO}(3)$ 的基本知识；统计力学中配分函数与自由能的定义（§4.8）` },
  ],
};

export const notation = NOTATION;
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["D4.1", "D4.2", "D4.3", "D4.4", "P4.1", "D4.5", "L4.1", "T4.1", "T4.2", "D4.6", "P4.2", "T4.3", "C4.1", "D4.7", "D4.8", "D4.9", "T4.4",
  "L4.2", "T4.5", "T4.6", "T4.7", "L4.3", "T4.8", "T4.9", "C4.2", "C4.3", "D4.10", "D4.11", "D4.12", "T4.10"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="基本群（定义 → 性质 → 例子 → 算法）→ 高阶同伦群 → 凝聚态中的缺陷与织构。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`每个节点是一个编号公式（点击放大、逐符号解读）。三条主线：圈的同伦 → $\pi_1$ → $\pi_1(S^1)=\mathbb{Z}$；群表示 → 边群 → 环面、Klein 瓶、$\RP^2$；$n$ 维圈 → 万有覆叠 → $\pi_3(\mathrm{SO}(3))=\mathbb{Z}$。三者在缺陷分类 \eqref{4.67} 与 Shankar 单极子 \eqref{4.73} 汇合。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="deps" toc="定理依赖" kicker="定理依赖" title="定义与定理的依赖关系" lead="上：依赖图（被依赖者在上；悬停看上下游，点击看陈述；灰色为第 2、3 章的陈述）。下：本章陈述一览，含每条的作用与核对状态（✚ 表示原书略写、本站已补全）。">
        <DepGraph ids={[...OWN, "D2.2", "D2.4", "D2.8", "D2.9", "D3.5"]} highlight="ch04" />
        <StudyTable ids={OWN} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec41 />
      <Sec42 />
      <Sec43 />
      <Sec44 />
      <Sec45 />
      <Sec46 />
      <Sec47 />
      <Sec48 />
      <Sec49 />
      <Sec410 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 5 章：流形">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="fundamental_group" /> · <C id="edge_group" /> · <C id="higher_homotopy" /> · <C id="defect_class" /></p>
      </Block>
      <Problems />
    </TextbookPage>);
}
