// 第 7 章 黎曼几何（Nakahara, Geometry, Topology and Physics, 2nd ed., PDF pp. 264–327）——主文件
// 高层理解层在 _ch07_overview.jsx；符号词典在 _ch07_notation.jsx；陈述登记表在 _ch07_stmts.js（经 book.js 合并）；
// 正文：_ch07_s1.jsx（引言 + §7.1）、_ch07_s2.jsx（§7.2）、_ch07_s3.jsx（§7.3）、_ch07_s4.jsx（§7.4）、_ch07_s5.jsx（§7.5–7.6）、
// _ch07_s7.jsx（§7.7）、_ch07_s8.jsx（§7.8）、_ch07_s9.jsx（§7.9）、_ch07_s10.jsx（§7.10）、_ch07_s11.jsx（§7.11）、_ch07_ex.jsx（章末习题）；
// 交互图在 _ch07_demos.jsx，其数值核心在 _ch07_num.js。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable } from "@kit";
import { NOTATION } from "./_ch07_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch07_overview.jsx";
import { Intro, Sec71 } from "./_ch07_s1.jsx";
import { Sec72 } from "./_ch07_s2.jsx";
import { Sec73 } from "./_ch07_s3.jsx";
import { Sec74 } from "./_ch07_s4.jsx";
import { Sec75, Sec76 } from "./_ch07_s5.jsx";
import { Sec77 } from "./_ch07_s7.jsx";
import { Sec78 } from "./_ch07_s8.jsx";
import { Sec79 } from "./_ch07_s9.jsx";
import { Sec710 } from "./_ch07_s10.jsx";
import { Sec711 } from "./_ch07_s11.jsx";
import { Problems } from "./_ch07_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch07", no: 7, title_en: "Riemannian Geometry", title_zh: "黎曼几何", pages: "264–327",
  one_liner: R`给流形装上度规（量长度）与联络（搬运向量），就有了测地线与曲率；度规唯一决定无挠的 Levi-Civita 联络，曲率表现为平行移动绕圈后的转角，并引出 Einstein 方程、Hodge 定理与弦的作用量。`,
  big_question: R`在一个弯曲的空间里，怎样定义"直线"、"平行"与"弯曲程度"，使它们与坐标的选取无关？这些几何量又怎样变成引力与弦的物理？`,
  why_it_matters: R`这是广义相对论的数学语言：度规是引力势，测地线是自由下落，Riemann 张量是潮汐力，Bianchi 恒等式保证能动量守恒。联络一形式与曲率二形式 $\dd\omega+\omega\wedge\omega$ 是第 9–10 章纤维丛联络与规范场强的原型；Hodge 定理把 Betti 数变成 Laplace 算子的零模数，是第 12 章指标定理的前奏；Polyakov 作用量与 Weyl 不变性是第 14 章弦论的出发点。`,
  overview: R`**§7.1** 定义（伪）Riemann 度规、线元、升降指标与诱导度规。**§7.2** 由"平行移动"启发式地引入联络与协变导数，给出平行移动方程、测地线方程与 $\Gamma$ 的变换律，并由度规相容解出 $\Gamma$ = Christoffel 符号 + 切扭。**§7.3** 定义挠率与曲率张量并说明其几何意义（平行四边形不闭合 / 绕圈的差），讨论可平行化流形，引入 Ricci 张量与标量曲率。**§7.4** 证明 Riemann 几何基本定理，研究测地线（球面、Poincaré 上半平面）、正规坐标、Riemann 张量的对称性与 Bianchi 恒等式。**§7.5** 和乐群。**§7.6** 等距、共形变换、Weyl 张量与等温坐标。**§7.7** Killing 与共形 Killing 向量场。**§7.8** 非坐标基与 Cartan 结构方程（球面、Schwarzschild）。**§7.9** Hodge 星、余微分、Laplace 算子、Hodge 分解与 Hodge 定理。**§7.10** Einstein–Hilbert 作用量与弯曲时空中的旋量。**§7.11** Nambu 与 Polyakov 弦作用量及其对称性。三个交互图分别演示球面上的和乐（转角 = 面积）、球面与双曲平面的测地线，以及任意二维度规的曲率计算。本站改正了原书约二十处笔误（见各勘误框）。`,
  objectives: [
    R`由度规计算诱导度规、Christoffel 符号 \eqref{7.53}、测地线方程 \eqref{7.19b}，并用 Euler–Lagrange 方程 \eqref{7.61} 快速读出 $\Gamma$`,
    R`说明 $\Gamma$ 为何不是张量（\eqref{7.29}），而挠率 \eqref{7.36} 与曲率 \eqref{7.37} 是张量；解释它们的几何意义 \eqref{7.44}、\eqref{7.45}`,
    R`证明 Riemann 几何基本定理（\sref{T7.1}）与 Bianchi 恒等式（\sref{T7.2}），推出 $\nabla_\mu G^{\mu\nu}=0$ 与独立分量数 \eqref{7.88}`,
    R`计算和乐（例 7.7），解出 Killing 向量场（例 7.10、7.11），理解共形变换与 Weyl 张量`,
    R`用正交标架与 Cartan 结构方程 \eqref{7.146a}–\eqref{7.146b} 计算曲率（球面、Schwarzschild）`,
    R`掌握 Hodge 星、$\dd^\dagger$、$\Delta$ 与 Hodge 定理 $H^r\cong\mathrm{Harm}^r$；由 Einstein–Hilbert 作用量推出 Einstein 方程；理解 Polyakov 作用量的对称性`,
  ],
  prereq: [
    { ch: "ch05", what: R`第 5 章：流形、切向量与一形式、拉回 $f^*$（\eqref{5.37}）、流与李导数（\eqref{5.47}、\eqref{5.58}）、微分形式与外微分（\eqref{5.70}）、李群与左不变场` },
    { ch: "ch06", what: R`第 6 章：Stokes 定理（\sref{T6.1}）、de Rham 上同调群（\sref{D6.2}）` },
    { ch: "ch03", what: R`第 3 章：Betti 数与 Euler–Poincaré 定理（\sref{T3.7}）` },
    { what: R`变分法（Euler–Lagrange 方程）；线性代数（对称矩阵的对角化、行列式）；狭义相对论与 Maxwell 方程的基本知识` },
  ],
};

export const notation = NOTATION;
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["D7.1", "D7.2", "T7.1", "T7.2", "D7.3", "D7.4", "D7.5", "P7.1", "T7.3", "T7.4", "D7.6", "T7.5", "D7.7", "T7.6", "T7.7", "T7.8", "P7.2"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="度规 → 联络 → 曲率与挠率 → Levi-Civita 联络与测地线 → 和乐 → 对称性 → 正交标架 → Hodge 理论 → 广义相对论与弦。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。主干从无穷小平行移动 \eqref{7.9} 出发：一支经协变导数到测地线与 Christoffel 符号，再到"测地线 = 弧长极值"；另一支经 $[\nabla,\nabla]$ 到 Riemann 张量、Bianchi 恒等式与 Einstein 方程；还有一支经不变体积元到 Hodge 定理。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="deps" toc="定理依赖" kicker="定理依赖" title="定义与定理的依赖关系" lead="上：依赖图（被依赖者在上；悬停看上下游，点击看陈述）。下：本章陈述一览，含每条的作用与核对状态（✚ 表示原书略写、本站已补全）。">
        <DepGraph ids={[...OWN, "X:Jacobi", "X:Hodge-analysis", "T6.1", "D6.2", "D5.1", "D5.2", "D5.5"]} highlight="ch07" />
        <StudyTable ids={OWN} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec71 />
      <Sec72 />
      <Sec73 />
      <Sec74 />
      <Sec75 />
      <Sec76 />
      <Sec77 />
      <Sec78 />
      <Sec79 />
      <Sec710 />
      <Sec711 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 8 章：复流形">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="metric" /> · <C id="levi_civita" /> · <C id="curvature" /> · <C id="cartan" /> · <C id="hodge" /></p>
      </Block>
      <Problems />
    </TextbookPage>);
}
