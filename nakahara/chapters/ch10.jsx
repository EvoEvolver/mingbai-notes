// 第 10 章 纤维丛上的联络（Nakahara, Geometry, Topology and Physics, 2nd ed., PDF pp. 394–438）——主文件
// 高层理解层在 _ch10_overview.jsx；符号词典在 _ch10_notation.jsx；陈述登记表在 _ch10_stmts.js（经 book.js 合并）；
// 正文：_ch10_s1.jsx（引言 + §10.1）、_ch10_s2.jsx（§10.2–10.3）、_ch10_s4.jsx（§10.4）、_ch10_s5a.jsx（§10.5.1–10.5.4）、
// _ch10_s5b.jsx（§10.5.5 瞬子）、_ch10_s6.jsx（§10.6 Berry 相位 + 章末习题）。
// 交互图在 _ch10_demos.jsx，数值核心在 _ch10_num.js。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable } from "@kit";
import { NOTATION } from "./_ch10_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch10_overview.jsx";
import { Intro, Sec101 } from "./_ch10_s1.jsx";
import { Sec102, Sec103 } from "./_ch10_s2.jsx";
import { Sec104 } from "./_ch10_s4.jsx";
import { Sec105 } from "./_ch10_s5a.jsx";
import { Sec106, Problems } from "./_ch10_s6.jsx";

const R = String.raw;

export const meta = {
  id: "ch10", no: 10, title_en: "Connections on Fibre Bundles", title_zh: "纤维丛上的联络", pages: "394–438",
  one_liner: R`联络就是在主丛里选定"水平方向"：拉回到坐标卡上是规范势 $\mathcal{A}$，换卡是规范变换，沿闭路平行移动回不到原处的程度是和乐（Wilson 圈），无穷小的和乐是曲率——Yang–Mills 场强 $\mathcal{F}=\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}$。`,
  big_question: R`规范势、规范变换、场强、协变导数、Wilson 圈、磁单极的量子化、瞬子数、Berry 相位——这些物理概念背后是不是同一个几何结构？它是什么，为什么它的某些积分总是整数？`,
  why_it_matters: R`规范场论（电磁、弱、强相互作用）的全部数学语言就是主丛上的联络。本章把第 7 章的 Riemann 联络推广到任意结构群，并说明哪些物理量依赖规范（势）、哪些规范协变（场强）、哪些规范不变（和乐、$\Tr\mathcal{F}^k$ 的积分）。单极子与瞬子的量子化、Berry 相位都是"曲率积分 = 转移函数的卷绕"，为第 11 章的示性类与第 12 章的指标定理做好准备。`,
  overview: R`本章分六步。**§10.1 联络**：竖直子空间 $V_uP$ 由基本向量场 $A^\#$ 给出；联络是右不变的水平补空间 $H_uP$，等价于满足 $\omega(A^\#)=A$、$R_g^*\omega=\mathrm{Ad}_{g^{-1}}\omega$ 的联络一形式 $\omega$；局部拉回 $\mathcal{A}_i=\sigma_i^*\omega$ 是规范势，换卡满足 $\mathcal{A}_j=t_{ij}^{-1}\mathcal{A}_it_{ij}+t_{ij}^{-1}\dd t_{ij}$；水平提升解出 $\dot g=-\mathcal{A}(X)g$，即路径排序指数。**§10.2 和乐**：闭路的平行移动 $\tau_\gamma(u)=ug_\gamma$ 构成和乐群。**§10.3 曲率**：$\Omega=\mathrm{D}\omega=\dd_P\omega+\omega\wedge\omega$，几何意义是无穷小和乐（Ambrose–Singer）；局部 $\mathcal{F}=\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}$ 协变地变换；Bianchi 恒等式 $\mathcal{D}\mathcal{F}=0$。**§10.4 相伴丛**：协变导数 $\nabla_\mu=\partial_\mu+\mathcal{A}_\mu$，$\nabla\nabla=\mathcal{F}$，度规联络与 Hermite 联络。**§10.5 规范理论**：Maxwell、Dirac 单极子（$2g\in\mathbb{Z}$）、Aharonov–Bohm、Yang–Mills、瞬子数 $=\frac1{24\pi^2}\int\Tr(g^{-1}\dd g)^3$。**§10.6 Berry 相位**：参数空间 U(1) 丛的和乐。五个交互图在浏览器里真算：球面和乐 = 立体角、单极子的两块卡与 Wilson 圈、SU(2) 场强三种算法、瞬子映射度的数值积分、自旋 1/2 的 Berry 相位。`,
  objectives: [
    R`说清联络的两种等价定义（水平分解 \sref{D10.1} 与联络一形式 \sref{D10.2}），并由 \eqref{10.8} 推出规范势的相容条件 \eqref{10.9}`,
    R`写出水平提升方程 \eqref{10.13b} 与路径排序解 \eqref{10.14}，并用它计算简单联络的和乐（例 10.2–10.3、\eqref{10.26}）`,
    R`独立证明 Cartan 结构方程 \eqref{10.32a}，由它得到场强 \eqref{10.39}、\eqref{10.41} 与协变变换律 \eqref{10.42}，解释曲率为什么是"无穷小和乐" \eqref{10.35}`,
    R`在相伴矢量丛上写出协变导数的局部形式 \eqref{10.58}，并对切丛、U(1)、SU(2)、伴随表示各举一例；证明 $\nabla\nabla=\mathcal{F}$`,
    R`用两块坐标卡推导 Dirac 量子化条件 \eqref{10.93}，用 Chern–Simons 形式推导瞬子数公式 \eqref{10.128}，并把 Berry 相位解释为和乐 \eqref{10.158}`,
  ],
  prereq: [
    { ch: "ch05", what: R`第 5 章：李群与李代数、左不变向量场、伴随表示、Maurer–Cartan 形式；外微分与拉回（$\dd f^*=f^*\dd$）` },
    { ch: "ch06", what: R`第 6 章：Stokes 定理、Poincaré 引理、de Rham 上同调（$\Tr\mathcal{F}^2$ 的上同调类）` },
    { ch: "ch07", what: R`第 7 章：Riemann 流形上的联络、平行移动、曲率、Cartan 结构方程（作为本章的特例）` },
    { ch: "ch09", what: R`第 9 章：纤维丛、主丛、局部截面与转移函数、相伴矢量丛；平凡丛的判据` },
  ],
};

export const notation = NOTATION;
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["D10.1", "D10.2", "P10.1", "T10.1", "L10.1", "D10.3", "T10.2", "C10.1", "F:hol", "D10.4", "D10.5", "P10.2", "L10.2", "T10.3", "T10.4", "T10.5", "T10.6", "D10.6", "L10.3", "L10.4", "T10.7", "F:berry"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="联络 → 规范势 → 平行移动 → 和乐 → 曲率 → 相伴丛 → 物理应用。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着用了什么。主干有两支：联络一形式 \eqref{10.3a} → 相容条件 \eqref{10.9} → 规范变换 / 单极子量子化；水平提升 \eqref{10.13b} → Wilson 圈 \eqref{10.26} / Berry 相位 \eqref{10.158}。曲率一支：结构方程 \eqref{10.32b} → 场强 \eqref{10.38a} → Bianchi \eqref{10.46} → Maxwell 方程；Chern–Simons \eqref{10.120} → 瞬子数 \eqref{10.128}。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="deps" toc="定理依赖" kicker="定理依赖" title="定义与定理的依赖关系" lead="上：依赖图（被依赖者在上；悬停看上下游，点击看陈述）。下：本章陈述一览，含每条的作用与核对状态（✚ 表示原书略写、本站已补全）。">
        <DepGraph ids={[...OWN, "D9.1", "C9.2", "T6.1", "D5.17", "D5.5"]} highlight="ch10" />
        <StudyTable ids={OWN} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十四张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec101 />
      <Sec102 />
      <Sec103 />
      <Sec104 />
      <Sec105 />
      <Sec106 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 11 章：示性类">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="connection" /> · <C id="holonomy" /> · <C id="curvature" /> · <C id="monopole" /> · <C id="instanton" /> · <C id="berry" /></p>
      </Block>
      <Problems />
    </TextbookPage>);
}
