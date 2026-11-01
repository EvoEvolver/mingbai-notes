// 第 5 章 非均匀宇宙：物质与辐射（Modern Cosmology, 2nd ed., pp. 111–134）——主文件
// 高层理解层在 _ch05_overview.jsx；符号词典在 _ch05_notation.jsx；
// 各节正文在 _ch05_s1.jsx … _ch05_s7.jsx、习题在 _ch05_ex.jsx；交互图在 _ch05_plots.jsx，数值函数在 _ch05_phys.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Sec, Tx, Box, Figure } from "@kit";
import { NOTATION } from "./_ch05_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_PHOTON, EQMAP_MATTER, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch05_overview.jsx";
import { CouplingDiagram } from "./_ch05_plots.jsx";
import { Sec51 } from "./_ch05_s1.jsx";
import { Sec52 } from "./_ch05_s2.jsx";
import { Sec53 } from "./_ch05_s3.jsx";
import { Sec54 } from "./_ch05_s4.jsx";
import { Sec55 } from "./_ch05_s5.jsx";
import { Sec56 } from "./_ch05_s6.jsx";
import { Sec57 } from "./_ch05_s7.jsx";
import { Exercises } from "./_ch05_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch05", no: 5, title_en: "The inhomogeneous universe: matter & radiation", title_zh: "非均匀宇宙：物质与辐射", pages: "111–134",
  one_liner: R`给宇宙中每一种成分——光子、冷暗物质、重子、中微子——写出扰动的 Boltzmann 方程，并化成 Fourier 空间、共形时间下的一组线性方程。`,
  big_question: R`在一个带有微小度规扰动的膨胀时空里，光子的温度扰动、暗物质与重子的密度和速度、中微子的分布各自如何演化？它们之间又如何通过引力与 Compton 散射相互耦合？`,
  why_it_matters: R`CMB 各向异性与大尺度结构的一切理论预言，都来自求解这组耦合方程。本章得到的光子方程 \eqref{5.35}/\eqref{5.67}、物质的连续性与 Euler 方程、重子的 Compton 拖曳项，是第 6–10 章（引力、初始条件、结构增长、CMB、偏振）的出发点；它们也正是 CAMB、CLASS 等 Boltzmann 程序求解的方程。`,
  overview: R`本章是"一道长长的作业题"：用第 3 章的工具，对每种成分重复同样的步骤。**光子**：把分布函数写成温度被扰动的黑体 \eqref{5.2}，左边（自由流 + 引力，\secref{5.1}）加右边（Compton 碰撞项，\secref{5.2}），转到 Fourier 空间与共形时间，得到光子 Boltzmann 方程（\secref{5.3}）。**冷暗物质**：非相对论、无碰撞，只需取 Boltzmann 方程的零阶与一阶矩，得到连续性方程与 Euler 方程（\secref{5.4}）。**重子**：同样的流体方程，但 Euler 方程中多出由动量守恒得到的 Compton 拖曳力（\secref{5.5}）。**中微子**：无碰撞的"光子方程"，有质量时带 $p/E_\nu$ 因子（\secref{5.6}）。最后用 Legendre 多极矩统一语言，列出全部方程（\secref{5.7}）。唯一缺的是度规扰动 $\Phi$、$\Psi$ 本身——那是第 6 章的 Einstein 方程。`,
  objectives: [
    R`理解为什么把光子扰动写成温度扰动 $\Theta$，并由 \eqref{5.1} 推出 $\Theta$ 方程的左边 \eqref{5.9}`,
    R`利用非相对论 Compton 散射几乎弹性的特点，推出碰撞项 \eqref{5.22}，并解释紧耦合下光子为何像流体（只剩单极与偶极）`,
    R`掌握 Fourier 变换、方向余弦 $\mu$、光深 $\tau$ 的定义，写出光子 Boltzmann 方程 \eqref{5.35}`,
    R`通过对 Boltzmann 方程取矩推出冷暗物质与重子的连续性方程和 Euler 方程，理解层级截断与"冷"的含义`,
    R`用动量守恒推出 Compton 拖曳项 \eqref{5.61}，理解 $R=3\rho_{\rm b}/4\rho_\gamma$ 的作用；写出中微子方程 \eqref{5.65} 并说明 $\mathcal N$ 为何依赖 $p$`,
    R`用 Legendre 多极矩 $\Theta_l$ \eqref{5.66} 描述光子分布，看懂完整方程组 \eqref{5.67}–\eqref{5.74}`,
  ],
  prereq: [
    { ch: "ch03", what: "第 3 章：Boltzmann 方程与碰撞项 (3.48)；共形牛顿规范的扰动度规 (3.79)；光子方程左边 (3.74)；有质量粒子的无碰撞方程 (3.76)" },
    { ch: "ch02", what: R`第 2 章：共形时间 $\eta$ (2.35)、玻色–爱因斯坦分布、$\rho_\gamma$ 的积分表示与中微子温度 $T_\nu$` },
    { ch: "ch04", what: "第 4 章：非相对论电子的分布与化学势（4.1–4.2 节）、复合与电离度（图 4.4）" },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

function Intro() {
  return (
    <Sec n="5.0" title="Introduction" zh="引言：一套耦合的方程"
      gist={R`从本章起研究光子分布的**各向异性**与物质的**非均匀性**。每种成分各有一个 Boltzmann 方程，它们通过引力（度规）和碰撞相互耦合（图 5.1）；本章写出所有成分在给定扰动时空中的方程，引力留给第 6 章。`}
      why={R`第 4 章只关心均匀的数密度；现在分布函数 $f(\boldsymbol x,\boldsymbol p,t)$ 依赖位置和方向，代数会复杂很多——但用第 3 章的工具可以系统地处理，最后得到的方程既简单又有清晰的物理内容。`}>
      <Tx>{R`**从均匀到非均匀。**从这一章开始，我们关心宇宙中光子分布的**各向异性**与物质的**非均匀性**。要解的方程已经见过：第 3 章介绍的 Einstein 方程与 Boltzmann 方程，宇宙中每种成分各有一个 Boltzmann 方程。与第 4 章只关心各成分**均匀**数密度的演化不同，这里必须考虑分布函数 $f(\boldsymbol x,\boldsymbol p,t)$ 对**空间**和**方向**的依赖。这会使代数显著复杂化；但有了第 3 章的工具，我们可以系统地对付这些复杂性——基本上就是"一道很长的作业题"。最终得到的方程组相当简单，物理内容也很清楚。

**谁和谁相互作用。**光子受引力影响，也通过 **Compton 散射**与自由电子相互作用。电子又与质子**紧耦合**。当然这两者也都受引力影响。而决定引力的度规，又受所有这些成分以及中微子和暗物质的影响。所以，要解出其中任何一种成分的分布，都需要**同时**解出所有其他成分。

为了不迷失全局，把核合成与复合之间由 Boltzmann 方程和 Einstein 方程描述的各种相互作用画成图 5.1 会很有帮助。本章结束时，我们将得到宇宙中所有相关成分的扰动演化方程，这使我们向计算真正的宇宙学观测量迈进一大步。缺的主要一环是如何求解出现在 Boltzmann 方程中的**度规扰动**——也就是引力——那是下一章的内容。因此，本章推导的是：在一个**给定的**、带扰动的膨胀时空中，物质、光子与中微子如何行为。`}</Tx>
      <Figure n="5.1" illustration={<CouplingDiagram />}
        caption={R`宇宙各成分之间的相互作用方式。这些联系编码在耦合的 Boltzmann–Einstein 方程中。电子与原子核之间通过库仑散射紧耦合，使我们可以把它们当作单一成分，按惯例称为**重子**。我们不考虑暗能量的扰动（宇宙学常数情形下本就没有），所以暗能量只进入背景度规。自绘交互：点击任一成分或连线，查看本章中描述它的方程。`} />
      <Box kind="note" title="为什么可以忽略暗能量扰动">{R`原则上还应包括暗能量密度的扰动——只要暗能量不是宇宙学常数，这种扰动就一定存在。但实际上，大多数可行的暗能量模型预言其扰动很小，而且只在很晚近才变得重要。所以就我们的目的而言，可以忽略暗能量作为度规扰动的源。`}</Box>
      <Tx>{R`**行进路线。**我们从光子的 Boltzmann 方程开始，包括对碰撞项的详细推导。然后按类似的模式推导暗物质、重子与中微子的 Boltzmann 方程。下面的路线图与推导图给出了全貌。`}</Tx>
    </Sec>);
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="先光子（左边 → 右边 → 合成），再物质（暗物质 → 重子），最后中微子与汇总。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应本章的两条主线。每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。悬停看上下游。">
        <h3>光子线：分布函数 → 碰撞项 → 光子 Boltzmann 方程 → 多极矩</h3>
        <EqMap edges={EQMAP_PHOTON} labels={EQMAP_LABELS} />
        <h3>物质线：取矩 → 流体方程；动量守恒 → Compton 拖曳；中微子</h3>
        <EqMap edges={EQMAP_MATTER} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec51 />
      <Sec52 />
      <Sec53 />
      <Sec54 />
      <Sec55 />
      <Sec56 />
      <Sec57 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 6 章：非均匀宇宙——引力">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="theta" /> · <C id="compton" /> · <C id="tight" /> · <C id="moments" /> · <C id="drag" /> · <C id="multipoles" /></p>
      </Block>
      <Exercises />
    </TextbookPage>);
}
