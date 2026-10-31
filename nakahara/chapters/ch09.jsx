// 第 9 章 纤维丛（Nakahara, Geometry, Topology and Physics, 2nd ed., PDF pp. 368–393）——主文件
// 高层理解层在 _ch09_overview.jsx；符号词典在 _ch09_notation.jsx；陈述登记表在 _ch09_stmts.js（经 book.js 合并）；
// 正文：_ch09_s1.jsx（引言 + §9.1 + §9.2）、_ch09_s3.jsx（§9.3）、_ch09_s4.jsx（§9.4）、_ch09_ex.jsx（章末习题）；交互图在 _ch09_demos.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable } from "@kit";
import { NOTATION } from "./_ch09_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch09_overview.jsx";
import { Intro, Sec91, Sec92 } from "./_ch09_s1.jsx";
import { Sec93 } from "./_ch09_s3.jsx";
import { Sec94 } from "./_ch09_s4.jsx";
import { Problems } from "./_ch09_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch09", no: 9, title_en: "Fibre Bundles", title_zh: "纤维丛", pages: "368–393",
  one_liner: R`纤维丛是"局部像乘积 $U\times F$、整体可以扭曲"的空间；扭曲全部写在取值于结构群的转移函数 $t_{ij}$ 里——切丛、Möbius 带、磁单极、瞬子与 Hopf 纤维化都是例子。`,
  big_question: R`当一个场在每一点取值于某个"内部空间"（切空间、相位圆、旋量空间）时，这些内部空间怎样拼成一个整体？拼法有哪些拓扑上不同的可能，又怎样用转移函数、截面与同伦群把它们区分开？`,
  why_it_matters: R`纤维丛是规范场论与广义相对论的共同语言：规范群是主丛的结构群，规范变换是转移函数与右作用，物质场是相伴丛的截面，标架与旋量来自标架丛与自旋丛。磁荷量子化（$\pi_1(\mathrm{U}(1))=\Z$）与瞬子数（$\pi_3(\mathrm{SU}(2))=\Z$）都是"丛怎样扭曲"的整数刻画。第 10 章在丛上引入联络（规范势），第 11 章用曲率计算这些整数（示性类），第 12–13 章的指标定理与反常都建立在本章之上。`,
  overview: R`**§9.1** 以切丛 $TM$ 为引子：局部 $TU_i\cong U_i\times\R^m$，换卡时纤维坐标乘 Jacobi 矩阵，向量场 = 截面。**§9.2** 给出纤维丛的一般定义、转移函数及其相容条件、换平凡化的规范变换 \eqref{9.9}、圆柱与 Möbius 带、由转移函数重构丛、丛映射、等价丛、拉回丛，以及同伦公理：可缩底空间上的丛都平凡。**§9.3** 讨论向量丛：$TS^2$ 的转移函数、法丛与线丛、标架、余切丛与对偶丛、截面与纤维度规、Whitney 和与张量积。**§9.4** 讨论主丛：右作用、典范局部平凡化、单极子丛、瞬子丛、Hopf 纤维化 $S^3\to S^2$ 与 $S^7\to S^4$、$G\to G/H$、相伴丛、标架丛与自旋丛，以及"主丛平凡 ⇔ 有整体截面"。三个交互图让你在圆柱与 Möbius 带上沿底圆走一圈看纤维是否翻转、在 $S^2$ 上点选一点看它的 Hopf 纤维圆并数值计算卷绕数与环绕数、在 $TS^2$ 的三张卡上核对余循环条件。`,
  objectives: [
    R`写出纤维丛的定义 $(E,\pi,M,F,G)$，解释局部平凡化与转移函数 $t_{ij}=\phi_{i,p}^{-1}\circ\phi_{j,p}$ 的含义，并由定义推出相容条件 \eqref{9.6a}–\eqref{9.6c} 与规范变换 \eqref{9.9}`,
    R`用转移函数区分圆柱与 Möbius 带；说明为什么由 $\{U_i,t_{ij},F,G\}$ 能重构丛（\eqref{9.12}），拉回丛的转移函数为何是 $t_{ij}\circ f$（\eqref{9.18}）`,
    R`陈述同伦公理（\sref{T9.1}）并推出"可缩底空间上的丛平凡"（\sref{C9.1}）`,
    R`计算 $TS^2$ 的转移函数 \eqref{9.23}；掌握标架变换 \eqref{9.29}、余切丛 \eqref{9.31}、Whitney 和 \eqref{9.37} 与张量积丛的转移函数`,
    R`理解主丛的右作用与典范局部平凡化（\eqref{9.41}–\eqref{9.43}）；用 $\pi_1(\mathrm{U}(1))$、$\pi_3(\mathrm{SU}(2))$ 分类单极子丛与瞬子丛；验证 Hopf 丛的转移函数 \eqref{9.57} 卷绕数为 1`,
    R`由主丛构造相伴丛并求其转移函数 $\rho(t_{ij})$；理解标架丛与自旋丛；证明主丛平凡 ⇔ 有整体截面（\sref{T9.2}）`,
  ],
  prereq: [
    { ch: "ch04", what: R`第 4 章：同伦与可缩空间（定义 4.9）、基本群 $\pi_1(S^1)=\Z$、高阶同伦群与 $\mathrm{SU}(2)\cong S^3$（例 4.12）` },
    { ch: "ch05", what: R`第 5 章：流形、坐标卡与转移函数、切空间与一形式的变换律（式 5.23、5.28）、李群与群作用（定义 5.8、5.14、5.15）、$\mathrm{SL}(2,\C)\to\mathrm{O}^\uparrow_+(1,3)$（例 5.16）` },
    { ch: "ch06", what: R`第 6 章：Stokes 定理与 de Rham 上同调（习题 P9.2 用到）` },
    { ch: "ch08", what: R`第 8 章：$\CP^n$ 的齐次与非齐次坐标、$S^2$ 的复球极坐标（例 8.1、8.3）` },
  ],
};

export const notation = NOTATION;
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["D9.1", "F:recon9", "T9.1", "C9.1", "F:assoc9", "T9.2", "C9.2"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="切丛 → 一般纤维丛 → 向量丛 → 主丛。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。主干是转移函数 \eqref{9.4}：向上来自切丛的 Jacobi 矩阵 \eqref{9.3}，向下分出相容条件与重构、规范变换与平凡丛、拉回与 Whitney 和，以及主丛的右作用、截面粘合与单极子/Hopf/瞬子丛。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="deps" toc="定理依赖" kicker="定理依赖" title="定义与定理的依赖关系" lead="上：依赖图（被依赖者在上；悬停看上下游，点击看陈述）。下：本章陈述一览，含每条的作用与核对状态（✚ 表示原书略写、本站已补全）。">
        <DepGraph ids={[...OWN, "X:Steenrod-homotopy", "D5.1", "D5.8", "D5.14", "D4.9"]} highlight="ch09" />
        <StudyTable ids={OWN} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec91 />
      <Sec92 />
      <Sec93 />
      <Sec94 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 10 章：纤维丛上的联络">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="fibre_bundle" /> · <C id="transition_function" /> · <C id="principal_bundle" /> · <C id="hopf" /></p>
      </Block>
      <Problems />
    </TextbookPage>);
}
