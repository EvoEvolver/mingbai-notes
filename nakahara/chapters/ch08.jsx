// 第 8 章 复流形（Nakahara, Geometry, Topology and Physics, 2nd ed., PDF pp. 328–367）——主文件
// 高层理解层在 _ch08_overview.jsx；符号词典在 _ch08_notation.jsx；陈述登记表在 _ch08_stmts.js（经 book.js 合并）；
// 正文：_ch08_s1.jsx（引言 + §8.1）、_ch08_s2.jsx（§8.2）、_ch08_s3.jsx（§8.3）、_ch08_s4.jsx（§8.4）、_ch08_s5.jsx（§8.5）、
// _ch08_s6.jsx（§8.6）、_ch08_s7.jsx（§8.7–8.8）；交互图在 _ch08_demos.jsx。原书本章没有章末习题。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable } from "@kit";
import { NOTATION } from "./_ch08_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch08_overview.jsx";
import { Intro, Sec81 } from "./_ch08_s1.jsx";
import { Sec82 } from "./_ch08_s2.jsx";
import { Sec83 } from "./_ch08_s3.jsx";
import { Sec84 } from "./_ch08_s4.jsx";
import { Sec85 } from "./_ch08_s5.jsx";
import { Sec86 } from "./_ch08_s6.jsx";
import { Sec87, Sec88 } from "./_ch08_s7.jsx";

const R = String.raw;

export const meta = {
  id: "ch08", no: 8, title_en: "Complex Manifolds", title_zh: "复流形", pages: "328–367",
  one_liner: R`复流形是用全纯函数粘起来的流形；切空间里处处有"乘以 $\mathrm{i}$"的结构 $J$，它把形式分成 $(r,s)$ 型、把 $\dd$ 拆成 $\partial+\bar\partial$；当度规也尊重 $J$ 且 Kähler 形式闭合时，Betti 数被 Hodge 数精确拆开。`,
  big_question: R`在流形上要求坐标变换"全纯"而不只是"光滑"，会多出哪些结构与约束？复结构、度规与拓扑三者如何咬合——什么样的复流形能承载 Kähler 度规、Ricci 平坦度规，它们的上同调长什么样？`,
  why_it_matters: R`复几何是弦论与超对称场论的基本语言：弦的世界面是 Riemann 面，环面的模参数 $\tau$ 与模群决定单圈振幅；超弦紧化需要 Calabi–Yau 流形（$c_1=0$、Ricci 平坦、和乐 $\subset\mathrm{SU}(3)$），其 Hodge 数数出低能理论中的场；轨形是可以精确求解的紧化。数学上，本章的 Dolbeault 上同调、Kähler 形式与第一陈类是第 9–12 章纤维丛、示性类与指标定理的直接前奏。`,
  overview: R`**§8.1** 定义复流形，给出 Riemann 球面、复环面（模参数与 $\mathrm{PSL}(2,\Z)$）、$\CP^n$、复 Grassmann 流形与代数簇。**§8.2** 复化切空间，引入 $\partial/\partial z$、$\partial/\partial\bar z$ 与殆复结构 $J$，把 $T_pM^\C$ 分成全纯与反全纯两部分。**§8.3** 定义 $(r,s)$ 形式与 Dolbeault 算子，证明 $\bar\partial^2=0$，引出 $\bar\partial$ 上同调。**§8.4** Hermite 度规、Kähler 形式（复流形可定向）、Hermite 联络、挠率与曲率、Ricci 形式与第一陈类。**§8.5** Kähler 流形的等价刻画、Kähler 势、Fubini–Study 度规、Calabi–Yau 流形与 $\mathrm{SU}(m)$ 和乐。**§8.6** 伴随算子、复 Hodge 定理、Kähler 流形上 $\Delta=2\Delta_{\bar\partial}$ 及 Hodge 数的对称性与 Betti 数约束。**§8.7** 殆复流形、Nijenhuis 张量与 Newlander–Nirenberg 定理。**§8.8** 轨形。四个交互图：约化模参数并用 $j$ 不变量核对；$\CP^1$ 的两张卡与 Fubini–Study 度规；输入函数检验 Cauchy–Riemann 方程；Hodge 菱形与 Kähler 约束。`,
  objectives: [
    R`由 Cauchy–Riemann 方程 \eqref{8.1} 出发验证 $\CP^n$、$S^2$ 的转移函数全纯；证明两个复环面等价当且仅当周期相差 $\lambda M$（\eqref{8.5}），并能把任意 $\tau$ 约化到基本区域`,
    R`熟练使用 $\partial/\partial z$、$\partial/\partial\bar z$、$\dd z$、$\dd\bar z$；写出 $J$ 在实基与复基下的矩阵（\eqref{8.18}、\eqref{8.22}），说明 $T_pM^\pm$ 的分解与卡无关`,
    R`把复形式按 $(r,s)$ 分解，计算 $\partial$、$\bar\partial$，用 $\dd^2=0$ 推出 $\partial^2=\bar\partial^2=\partial\bar\partial+\bar\partial\partial=0$（\sref{T8.1}）`,
    R`由 Hermite 条件推出 $g_{\mu\nu}=0$；写出 Kähler 形式、Hermite 联络 \eqref{8.69}、曲率 \eqref{8.75a}、Ricci 形式 \eqref{8.79}，并说明 $c_1$ 与度规无关`,
    R`说明 Kähler 条件的四种等价形式，用 Kähler 势计算 $\CP^m$ 的 Fubini–Study 度规并证明其正定；解释 Ricci 平坦、$c_1=0$ 与 $\mathrm{SU}(m)$ 和乐的关系`,
    R`陈述复 Hodge 定理与 $\Delta=2\Delta_{\bar\partial}$，由此推出 Hodge 菱形的对称性与 \eqref{8.118}–\eqref{8.120}，并用它们判断某个复流形能否是 Kähler 的`,
  ],
  prereq: [
    { ch: "ch05", what: R`第 5 章：微分流形与卡（\sref{D5.1}）、$\CP^n$ 与 Grassmann 流形的实版本（例 5.4、5.5）、微分形式与外微分、$\dd^2=0$、李括号` },
    { ch: "ch06", what: R`第 6 章：de Rham 上同调、Betti 数、Stokes 定理` },
    { ch: "ch07", what: R`第 7 章：Riemann 度规、Levi-Civita 联络（\sref{T7.1}）、曲率与和乐群（\sref{D7.3}）、Hodge 星与 Hodge 定理（\sref{T7.8}）、度规的变分 \eqref{7.204}` },
    { what: R`单复变函数论：Cauchy–Riemann 方程、最大模原理、解析延拓；线性代数中的 Hermite 矩阵与 Cauchy–Schwarz 不等式` },
  ],
};

export const notation = NOTATION;
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["D8.1", "D8.2", "P8.1", "T8.1", "D8.3", "T8.2", "L8.1", "T8.3", "T8.4", "P8.2", "D8.4", "T8.5", "T8.6", "T8.7", "P8.3", "T8.8", "T8.9", "T8.10", "T8.11", "D8.5", "D8.6", "T8.12", "T8.13"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead={R`复流形 → 殆复结构 → $(r,s)$ 形式与 $\bar\partial$ → Hermite 几何 → Kähler 几何 → Hodge 理论 → 殆复流形与轨形。点击标题跳到该节；点击公式可放大并逐符号解读。`}>
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着用了什么。左支：Cauchy–Riemann → 复基 → $J$ 的本征分解 → $(r,s)$ 形式 → $\dd=\partial+\bar\partial$ → $\bar\partial$ 上同调。中支：Hermite 度规 → Kähler 形式 / Hermite 联络 → 曲率 → Ricci 形式 → $\mathrm{SU}(m)$ 和乐。右支：Kähler 条件 \eqref{8.82} → Kähler 势与无挠 → $\Delta=2\Delta_{\bar\partial}$ → Hodge 数的约束。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="deps" toc="定理依赖" kicker="定理依赖" title="定义与定理的依赖关系" lead="上：依赖图（被依赖者在上；悬停看上下游，点击看陈述）。下：本章陈述一览，含每条的作用与核对状态（✚ 表示原书略写、本站已补全）。">
        <DepGraph ids={[...OWN, "X:max-principle", "X:aut-C", "D5.1", "T7.1", "T7.4", "T7.7", "T7.8", "D7.3", "P7.2"]} highlight="ch08" />
        <StudyTable ids={OWN} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec81 />
      <Sec82 />
      <Sec83 />
      <Sec84 />
      <Sec85 />
      <Sec86 />
      <Sec87 />
      <Sec88 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 9 章：纤维丛">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="complex_manifold" /> · <C id="kahler" /> · <C id="hodge_numbers" /> · <C id="calabi_yau" /></p>
      </Block>
    </TextbookPage>);
}
