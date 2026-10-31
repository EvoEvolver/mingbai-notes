// 第 3 章 同调群（Nakahara, Geometry, Topology and Physics, 2nd ed., PDF pp. 113–140）——主文件
// 高层理解层在 _ch03_overview.jsx；符号词典在 _ch03_notation.jsx；陈述登记表在 _ch03_stmts.js（经 book.js 合并）；
// 正文：_ch03_s1.jsx（引言 + §3.1）、_ch03_s2.jsx（§3.2）、_ch03_s3.jsx / _s3b / _s3c（§3.3）、_ch03_s4.jsx（§3.4）、_ch03_ex.jsx（章末习题）；
// 交互图在 _ch03_demos.jsx，整数同调算法（Smith 标准形等）在 _ch03_homology.js。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable } from "@kit";
import { NOTATION } from "./_ch03_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch03_overview.jsx";
import { Intro, Sec31 } from "./_ch03_s1.jsx";
import { Sec32 } from "./_ch03_s2.jsx";
import { Sec33 } from "./_ch03_s3.jsx";
import { Sec34 } from "./_ch03_s4.jsx";
import { Problems } from "./_ch03_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch03", no: 3, title_en: "Homology Groups", title_zh: "同调群", pages: "113–140",
  one_liner: R`把空间剖分成单形，用整数系数的"链"表示区域、用满足 $\partial^2=0$ 的边界算子表示"取边界"，于是"没有边界却又不是边界"的东西——洞——被精确地数成一组 Abel 群 $H_r=\ker\partial_r/\operatorname{im}\partial_{r+1}$。`,
  big_question: R`怎样用纯代数（而且是计算机能做的整数线性代数）判断一个空间有几个连通分支、几个"环洞"、几个"空腔"，以及它是否"拧过"？这些数为什么不依赖于剖分方式？`,
  why_it_matters: R`同调群是全书第一个系统的拓扑不变量。第 4 章的同伦群、第 6 章的 de Rham 上同调、第 11–12 章的示性类与指标定理都以它为参照：$\partial^2=0$ 与 $\dd^2=0$ 是同一个结构，Euler–Poincaré 定理 $\sum(-1)^rI_r=\sum(-1)^rb_r$ 是指标定理最简单的原型。物理上，Aharonov–Bohm 效应、涡旋与磁单极的拓扑荷、规范场的反常，都离不开"闭路是否是边界"这一问题。`,
  overview: R`本章分四步。**§3.1 代数**：商群、同态基本定理 $G_1/\ker f\cong\operatorname{im}f$、有限生成 Abel 群的结构 $\mathbb{Z}^r\oplus\mathbb{Z}_{k_1}\oplus\cdots\oplus\mathbb{Z}_{k_p}$。**§3.2 几何**：单形、单纯复形、多面体与三角剖分。**§3.3 同调**：定向单形 → 链群 $C_r(K)\cong\mathbb{Z}^{I_r}$ → 边界算子 $\partial_r$ 与 $\partial_r\partial_{r+1}=0$ → 闭链群 $Z_r$、边缘群 $B_r$ → 同调群 $H_r=Z_r/B_r$；然后在点、线段、圆周、圆盘、球面、Möbius 带、射影平面、环面、Klein 瓶上逐一计算，看到挠 $\mathbb{Z}_2$ 的出现。**§3.4 一般性质**：同调对连通分支直和分解（$H_0$ 数分支），同调群 = 自由部分 $\oplus$ 挠，Betti 数 $b_r=\dim H_r(K;\mathbb{R})$，以及 Euler–Poincaré 定理。三个交互图让你在浏览器里亲手验证 $\partial^2=0$、构造闭链并判断它是否为边界、用 Smith 标准形算出任意曲面的同调群。`,
  objectives: [
    R`用同态基本定理 \eqref{3.6} 计算商群，并说出有限生成 Abel 群结构定理 \eqref{3.10} 中秩与挠的含义`,
    R`判断一组单形是否构成单纯复形，写出定向单形的符号规则 \eqref{3.14}`,
    R`由 \eqref{3.20} 计算任意链的边界，并独立证明 $\partial_r\partial_{r+1}=0$（\sref{L3.3}）`,
    R`按定义 $H_r=Z_r/B_r$ 算出 $S^1$、圆盘、$S^2$ 的同调群，并解释 $\mathbb{R}\mathrm{P}^2$ 的 $H_1\cong\mathbb{Z}_2$ 从何而来`,
    R`证明连通复形 $H_0\cong\mathbb{Z}$（\sref{T3.5}），并用 Euler–Poincaré 定理 \eqref{3.57} 由单形个数检验同调计算`,
  ],
  prereq: [
    { ch: "ch02", what: "第 2 章：群、子群与正规子群（例 2.6）；线性映射的秩–零化度定理（定理 2.1）；曲面的 Euler 示性数 (2.31) 与亏格 g 曲面的多边形表示（图 2.12）；射影平面（例 2.5）" },
    { what: R`线性代数（秩、核、像）；置换的奇偶性；基本的点集拓扑（同胚、连通、紧致）` },
  ],
};

export const notation = NOTATION;
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["D3.1", "L3.1", "T3.1", "L3.2", "T3.2", "D3.2", "D3.3", "D3.4", "L3.3", "T3.3", "D3.5", "T3.4", "T3.5", "T3.6", "C3.1", "D3.6", "T3.7"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="代数 → 几何 → 同调 → 一般性质。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。一支是代数（同态基本定理 → 结构定理），一支是边界算子（定向 → $\partial$ → $\partial^2=0$ → 同调群），两支在 \eqref{3.54} 汇合。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="deps" toc="定理依赖" kicker="定理依赖" title="定义与定理的依赖关系" lead="上：依赖图（被依赖者在上；悬停看上下游，点击看陈述）。下：本章陈述一览，含每条的作用与核对状态（✚ 表示原书略写、本站已补全）。">
        <DepGraph ids={[...OWN, "X:T2.1"]} highlight="ch03" />
        <StudyTable ids={OWN} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec31 />
      <Sec32 />
      <Sec33 />
      <Sec34 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 4 章：同伦群">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="homology" /> · <C id="boundary_op" /> · <C id="torsion" /> · <C id="betti_euler" /></p>
      </Block>
      <Problems />
    </TextbookPage>);
}
