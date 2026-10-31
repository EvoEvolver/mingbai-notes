// 第 12 章 指标定理（Nakahara, Geometry, Topology and Physics, 2nd ed., PDF pp. 473–520）——主文件
// 高层理解层在 _ch12_overview.jsx；符号词典在 _ch12_notation.jsx；陈述登记表在 _ch12_stmts.js（经 book.js 合并）；
// 正文：_ch12_s1.jsx（引言 + §12.1）、_ch12_s2.jsx（§12.2–12.3）、_ch12_s4.jsx（§12.4–12.5）、_ch12_s6.jsx（§12.6）、
//       _ch12_s7.jsx（§12.7–12.8）、_ch12_s9.jsx（§12.9）、_ch12_s10.jsx（§12.10）、_ch12_ex.jsx（章末习题）；交互图在 _ch12_demos.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable } from "@kit";
import { NOTATION } from "./_ch12_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch12_overview.jsx";
import { Intro, Sec121 } from "./_ch12_s1.jsx";
import { Sec122, Sec123 } from "./_ch12_s2.jsx";
import { Sec124, Sec125 } from "./_ch12_s4.jsx";
import { Sec126 } from "./_ch12_s6.jsx";
import { Sec127, Sec128 } from "./_ch12_s7.jsx";
import { Sec129 } from "./_ch12_s9.jsx";
import { Sec1210 } from "./_ch12_s10.jsx";
import { Problems } from "./_ch12_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch12", no: 12, title_en: "Index Theorems", title_zh: "指标定理", pages: "473–520",
  one_liner: R`椭圆算子的零模之差 $\ind D=\dim\ker D-\dim\ker D^\dagger$ 是拓扑不变量：Atiyah–Singer 定理把它写成示性类的积分，统一了 Gauss–Bonnet–陈、Riemann–Roch、Hirzebruch 符号差与 Dirac 算子的 $\hat A$ 亏格定理，并可用超对称量子力学的路径积分证明。`,
  big_question: R`一个微分方程有多少个独立解？这个本来要靠解方程才能回答的解析问题，为什么在取"正手征解数减负手征解数"之后，竟然只由流形与丛的拓扑（曲率的积分）决定？`,
  why_it_matters: R`指标定理是现代数学物理的枢纽：它数出瞬子、单极子、孤子背景中的费米子零模，给出手征反常的整体形式（第 13 章），决定弦论与超对称理论中模空间的维数；它的热核与超对称证明本身就是物理学家贡献给数学的经典工具。Gauss–Bonnet 告诉我们"总曲率 = $2\pi\chi$"，Riemann–Roch 告诉我们复流形上全纯截面的个数，符号差定理推出 $\int p_1$ 是 3 的倍数——它们都是同一个定理的特例。`,
  overview: R`**§12.1** 用主符号定义椭圆性，紧流形上椭圆算子是 Fredholm 算子，$\operatorname{coker}D\cong\ker D^\dagger$（定理 12.1）；推广到椭圆复形并"卷起"成两项复形，de Rham 复形的指标是 $\chi(M)$。**§12.2** 陈述 Atiyah–Singer 指标定理。**§12.3–12.6** 把它用到 de Rham、Dolbeault、符号差、自旋四个复形，得到 Gauss–Bonnet–陈、Hirzebruch–Riemann–Roch、Hirzebruch 符号差与 $\hat A$ 亏格指标定理，以及单极子、瞬子背景中的零模计数。**§12.7** 用热核与 $\zeta$ 函数解释为什么指标是局部量的积分。**§12.8** 讨论带边流形的 APS 定理、$\eta$ 不变量与谱流。**§12.9–12.10** 发展超对称量子力学，并用 Witten 指标的路径积分证明自旋复形的指标定理。五个交互图让你：随意改动矩阵看指标不变；在变形曲面上数值积分 Gauss 曲率；核对 Riemann–Roch；数值求单极子背景中 Dirac 算子的零模；看本征值的谱流与 $\eta$ 不变量的锯齿。`,
  objectives: [
    R`由 \eqref{12.3}、\eqref{12.4} 计算 Laplace、d'Alembert、$\dd$、$\bar\partial$、Dirac 算子的符号并判断椭圆性；证明 $\operatorname{coker}D\cong\ker D^\dagger$（\sref{T12.1}）`,
    R`写出椭圆复形的指标 \eqref{12.19}，用 Hodge 理论把它化为调和截面的交错计数，并把复形卷起成两项复形（\eqref{12.24}）`,
    R`陈述 Atiyah–Singer 指标定理 \eqref{12.33}，并对 de Rham 复形用分裂原理推出 $\chi(M)=\int_Me(TM)$（\eqref{12.41}）`,
    R`由 HRR \eqref{12.50} 推出 Riemann 面上的 Riemann–Roch $h^0-h^1=(1-g)\dim V+\deg V$（改正后的 \eqref{12.51}）；由符号差复形推出 $\tau=\int L$ 与 $\tau=\frac13\int p_1$`,
    R`写出手征基中的 Dirac 算子（\eqref{12.79}），用扭曲自旋复形的指标定理计算单极子、瞬子背景中的零模数（\eqref{12.86}–\eqref{12.90}）`,
    R`用热核证明 $\ind D=\tilde h_E(t)-\tilde h_F(t)$ 与 $t$ 无关（\eqref{12.105}–\eqref{12.109}）；理解 $\eta$ 不变量、谱流与 APS 定理（\eqref{12.121}–\eqref{12.125}）`,
    R`复述超对称证明的每一步：Witten 指标 \eqref{12.165}、周期边界的路径积分 \eqref{12.171}、$\beta\to0$ 局域化、涨落行列式 \eqref{12.188}、得到 $\int\hat A$（\eqref{12.194}）`,
  ],
  prereq: [
    { ch: "ch06", what: R`第 6 章：de Rham 上同调、Betti 数、Poincaré 对偶` },
    { ch: "ch07", what: R`第 7 章：Hodge 星、$\dd^\dagger$、Laplace 算子与 Hodge 分解（\sref{T7.7}、\sref{T7.8}）；曲率二形式与结构方程；弯曲时空的 Dirac 算子（§7.10）` },
    { ch: "ch08", what: R`第 8 章：复流形、$(p,q)$ 形式、$\partial$ 与 $\bar\partial$、Dolbeault 上同调` },
    { ch: "ch09", what: R`第 9 章：向量丛、截面、主丛与相伴丛、单极子丛与瞬子丛` },
    { ch: "ch10", what: R`第 10 章：联络与曲率、单极子的卷绕数（§10.5）` },
    { ch: "ch11", what: R`第 11 章：陈类、陈特征、Todd 类、Euler 类、Pontryagin 类、$L$ 多项式与 $\hat A$ 亏格，分裂原理` },
    { ch: "ch01", what: R`第 1 章：路径积分、Grassmann 变量与费米相干态（§1.5）、$\zeta$ 函数正规化（§1.4）` },
  ],
};

export const notation = NOTATION;
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["X:elliptic-Fredholm", "T12.1", "F:hodge12", "F:rollup12", "T12.2", "C12.1", "F:deRham12", "F:HRR12", "F:sign12", "F:spinAS12", "T12.3", "T12.4", "T12.5", "T12.6"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="椭圆与 Fredholm → AS 定理 → 四个经典复形 → 热核与 APS → 超对称证明。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。左侧主干：符号与椭圆性 → 复形的指标 → AS 定理 \eqref{12.33}，向下分出 Gauss–Bonnet、Riemann–Roch、符号差与 $\hat A$ 四个定理；右侧主干：非零谱配对 \eqref{12.105} → 热核公式与 Witten 指标 → 路径积分 → \eqref{12.194}，最后回头证明 \eqref{12.83}。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="deps" toc="定理依赖" kicker="定理依赖" title="定理之间的依赖关系" lead="上：依赖图（被依赖者在上；悬停看上下游，点击看陈述）。下：本章陈述一览，含每条的作用与核对状态（✚ 表示原书略写、本站已补全）。">
        <DepGraph ids={[...OWN, "T7.7", "T7.8", "X:splitting", "T11.5", "X:gauss-bonnet", "X:signature"]} highlight="ch12" />
        <StudyTable ids={OWN} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec121 />
      <Sec122 />
      <Sec123 />
      <Sec124 />
      <Sec125 />
      <Sec126 />
      <Sec127 />
      <Sec128 />
      <Sec129 />
      <Sec1210 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 13 章：规范场论中的反常">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="analytic_index" /> · <C id="as_theorem" /> · <C id="dirac_index" /> · <C id="witten_index" /></p>
      </Block>
      <Problems />
    </TextbookPage>);
}
