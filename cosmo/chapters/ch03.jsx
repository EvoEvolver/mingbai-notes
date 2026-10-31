// 第 3 章 宇宙学基本方程（Modern Cosmology, 2nd ed., pp. 57–84）——主文件
// 高层理解层在 _ch03_overview.jsx；符号词典在 _ch03_notation.jsx；
// 各节正文在 _ch03_s1.jsx … _ch03_s4.jsx、习题在 _ch03_ex.jsx；交互图在 _ch03_plots.jsx，数值函数在 _ch03_phys.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Sec, Tx, Table } from "@kit";
import { NOTATION } from "./_ch03_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_GRAV, EQMAP_BOLTZ, EQMAP_PERT, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch03_overview.jsx";
import { Sec31 } from "./_ch03_s1.jsx";
import { Sec32 } from "./_ch03_s2.jsx";
import { Sec33 } from "./_ch03_s3.jsx";
import { Sec34 } from "./_ch03_s4.jsx";
import { Exercises } from "./_ch03_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch03", no: 3, title_en: "The fundamental equations of cosmology", title_zh: "宇宙学基本方程", pages: "57–84",
  one_liner: R`宇宙学 = Einstein 方程（引力）+ Boltzmann 方程（物质与辐射）：本章推出两者的一般形式，用前者得到 Friedmann 方程，用后者在光滑与扰动宇宙中追踪粒子的分布。`,
  big_question: R`标度因子 $a(t)$ 究竟由什么决定？成群的光子、中微子、暗物质粒子在膨胀并且起伏的时空中，它们的分布如何随时间演化、如何相互碰撞？`,
  why_it_matters: R`本书之后的每一章都是这两个方程的应用：第 4 章用均匀 Boltzmann 方程和碰撞项算热历史（冻结、核合成、复合）；第 5–6 章用扰动的 Boltzmann 与 Einstein 方程建立结构增长的方程组；CMB 各向异性（第 9 章）与引力透镜（第 13 章）都从本章的 \eqref{3.71}、\eqref{3.72}、\eqref{3.74} 出发。`,
  overview: R`本章沿两条线展开，最后在扰动宇宙中汇合。**引力线**（§3.1）：写下 Einstein 方程，用第 2 章的 Christoffel 符号算出 FLRW 的 Ricci 张量与标量，00 分量即第一 Friedmann 方程；把 $\Lambda$ 移到右边，它就是 $w=-1$ 的成分。**统计线**（§3.2）：用分布函数描述粒子群，粒子数守恒给出 $df/dt=0$；先在谐振势这个玩具模型中看清方程的结构与平衡分布，再把它搬进膨胀宇宙并配上两体碰撞项。**扰动宇宙**（§3.3）：在度规中加入 $\Psi$、$\Phi$，解线性阶测地线方程，得到红移、引力红移与偏折，并写出辐射与有质量粒子的线性 Boltzmann 方程。`,
  objectives: [
    R`由 Christoffel 符号算出欧氏 FLRW 的 $R_{00}$、$R_{ij}$、$R$，并从 Einstein 方程 00 分量推出 Friedmann 方程 \eqref{3.12}–\eqref{3.14}；推出第二 Friedmann 方程与加速条件 $w<-1/3$`,
    R`说明为什么宇宙学常数等效于 $\rho_\Lambda=\Lambda/8\pi G$、$w=-1$ 的成分，并数值积分 Friedmann 方程求 $a(t)$ 与宇宙年龄`,
    R`写出无碰撞 Boltzmann 方程（Liouville 定理）并解释平衡分布；在膨胀宇宙中推导 \eqref{3.38} 与数密度方程 \eqref{3.43}`,
    R`读懂两体碰撞项 \eqref{3.48} 的每个因子（相空间测度、$\delta_{\rm D}$ 函数、$|\mathcal M|^2$、玻色增强 / 泡利阻塞）`,
    R`在共形牛顿规范下求扰动时空的四动量与测地线方程，解释 \eqref{3.71} 中的红移、引力红移与 \eqref{3.72} 中的光线偏折（因子 2）；写出线性 Boltzmann 方程 \eqref{3.74}、\eqref{3.76}`,
  ],
  prereq: [
    { ch: "ch02", what: "第 2 章：FLRW 度规 (2.12)、Christoffel 符号 (2.21)–(2.25)、测地线方程 (2.20)、能动张量与连续性方程 (2.44)–(2.61)、分布函数 (2.62)–(2.66)" },
    { what: R`经典力学的相空间与 Liouville 定理；狭义相对论的四动量与质壳条件；量子统计中的玻色增强与泡利不相容` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

function Intro() {
  return (
    <Sec n="3.0" title="Introduction" zh="引言：两个方程统治宇宙学"
      gist={R`宇宙学本质上是"广义相对论 + 统计力学"：唯一重要的长程力是引力，而我们关心的是物质的**集体**行为。所以几乎一切结果都来自 Einstein 方程与 Boltzmann 方程的组合。`}
      why={R`先看清全书的"操作系统"：后面每一章——热历史、扰动、CMB、大尺度结构——都只是这两个方程在不同情形下的应用。`}
      gives={[]}>
      <Tx>{R`宇宙学本质上是**广义相对论与统计力学的结合**。唯一相关的长程力是引力；正如上一章所见，引力还提供了物质在其中运动的背景时空。宇宙学研究整个宇宙的演化，所以我们并不关心单个粒子的命运，而是关心物质集体的、平均的行为——那是统计力学的领域。这就是为什么宇宙学中几乎所有结果都可以由两个方程的组合推出：引力一侧的 **Einstein 方程**，以及描述物质与辐射的统计力学 **Boltzmann 方程**。

这两个方程都相当难对付，应用起来很快就会变得技术化。本章的做法是：先给出 Einstein 方程与 Boltzmann 方程的一般形式并讲清其物理内容；再把它们用于均匀宇宙——对 Einstein 方程而言，这将推出 Friedmann 方程 (1.3)。这些结果使我们能在本章和下一章计算宇宙的**膨胀史**与**热历史**。此外，有了本章的经验，后面处理宇宙中扰动的章节就不再有什么特别困难之处。所以熟悉本章搭建的框架，在学习本书其余部分时会得到丰厚的回报。`}</Tx>
      <Table head={[R``, R`**引力侧**`, R`**物质侧**`]} rows={[
        [R`方程`, R`Einstein：$G_{\mu\nu}=8\pi GT_{\mu\nu}$`, R`Boltzmann：$df/dt=C[f]$`],
        [R`未知量`, R`度规 $g_{\mu\nu}$（$a$、$\Psi$、$\Phi$）`, R`分布函数 $f_s(\boldsymbol x,\boldsymbol p,t)$`],
        [R`如何耦合`, R`右边需要 $T^\mu{}_\nu$ ← 由 $f$ 积分得到 \eqref{3.20}`, R`左边的 $\dot{\boldsymbol x}$、$\dot{\boldsymbol p}$ ← 由 $g_{\mu\nu}$ 的测地线方程得到`],
        [R`本章完成`, R`均匀宇宙（§3.1）；扰动留到第 6 章`, R`均匀（§3.2）与线性扰动（§3.3）`],
      ]} caption={R`本章的"两栏账本"：两侧通过能动张量与测地线方程互相耦合——这就是"Einstein–Boltzmann 方程组"。`} />
    </Sec>);
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="引力一节、统计三步、扰动四步。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="三张图对应本章的三条主线。每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。悬停看上下游。">
        <h3>引力线：Ricci 张量 → Einstein 方程 → Friedmann 方程</h3>
        <EqMap edges={EQMAP_GRAV} labels={EQMAP_LABELS} />
        <h3>统计线：粒子数守恒 → Boltzmann 方程 → 数密度与碰撞项</h3>
        <EqMap edges={EQMAP_BOLTZ} labels={EQMAP_LABELS} />
        <h3>扰动线：扰动度规 → 测地线 → 线性 Boltzmann 方程</h3>
        <EqMap edges={EQMAP_PERT} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十三张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
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
        <Bridge title="→ 第 4 章：物种的起源">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="friedmann" /> · <C id="acceleration" /> · <C id="boltzmann" /> · <C id="collision" /> · <C id="geodesic_pert" /> · <C id="linear_boltzmann" /></p>
      </Block>
      <Exercises />
    </TextbookPage>);
}
