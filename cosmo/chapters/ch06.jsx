// 第 6 章 非均匀宇宙：引力（Modern Cosmology, 2nd ed., pp. 135–156）——主文件
// 高层理解层在 _ch06_overview.jsx；符号词典在 _ch06_notation.jsx；
// 各节正文在 _ch06_s1.jsx … _ch06_s5.jsx、习题在 _ch06_ex.jsx；交互图在 _ch06_plots.jsx，数值函数在 _ch06_phys.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch06_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_SCALAR, EQMAP_TENSOR, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch06_overview.jsx";
import { Intro, Sec61 } from "./_ch06_s1.jsx";
import { Sec62 } from "./_ch06_s2.jsx";
import { Sec63 } from "./_ch06_s3.jsx";
import { Sec64 } from "./_ch06_s4.jsx";
import { Sec65 } from "./_ch06_s5.jsx";
import { Exercises } from "./_ch06_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch06", no: 6, title_en: "The inhomogeneous universe: gravity", title_zh: "非均匀宇宙：引力", pages: "135–156",
  one_liner: R`把 Einstein 方程在 FLRW 背景附近线性化：先按空间转动把度规扰动分成标量、矢量、张量，再用规范自由把标量化简为 $\Phi$、$\Psi$，得到它们的两个方程与引力波方程。`,
  big_question: R`光子、中微子、暗物质与重子的扰动，怎样反过来决定时空度规的扰动 $\Phi$、$\Psi$？度规扰动中有多少是真正的物理自由度，哪些只是坐标选取的假象？`,
  why_it_matters: R`本章的 \eqref{6.41}、\eqref{6.48} 与第 5 章的 Boltzmann 方程合在一起，构成宇宙线性扰动的完整方程组——CAMB、CLASS 等程序求解的正是它们。规范变换与 Bardeen 不变量是第 7 章计算暴胀扰动的工具；张量方程 \eqref{6.73} 则支配原初引力波及其在 CMB 中的 B 模印记（第 10 章）。`,
  overview: R`本章分两大步。**先想清楚自由度**（\secref{6.1}–\secref{6.2}）：一般扰动度规有 10 个函数，按空间转动性质分为 4 个标量 $A,B,D,E$、两个横向矢量 $B_i,V_i$ 与张量 $h^{\rm TT}_{ij}$；FLRW 背景的均匀各向同性保证三类在线性阶上解耦（分解定理）。小坐标变换 $t\to t+\zeta$、$x^i\to x^i+\xi^{,i}$ 可以消去两个标量函数，所以共形牛顿规范只需 $\Psi$、$\Phi$；Bardeen 组合 $\Phi_A$、$\Phi_H$ 规范不变。**再计算**：标量部分（\secref{6.3}）按 Christoffel → Ricci → Einstein 的顺序得到时–时方程（相对论 Poisson 方程）与纵向无迹的空–空方程（$\Phi+\Psi$ 由各向异性应力决定）；张量部分（\secref{6.4}）得到膨胀宇宙中的引力波方程，并验证张量不进入标量方程。\secref{6.5} 汇总。`,
  objectives: [
    R`把一般扰动度规 \eqref{6.1} 分解为标量、矢量、张量，并数出 $10=4+4+2$ 个自由度`,
    R`推导标量度规扰动的规范变换 \eqref{6.17}–\eqref{6.18}，验证 Bardeen 不变量 \eqref{6.19}，并解释为何物理自由度只有 6 个`,
    R`由共形牛顿规范的 Christoffel 符号算出 $R_{00}$、$R_{ij}$、$\delta R$ 与 $\delta G^0{}_0$，得到 \eqref{6.41} 并说明其牛顿极限`,
    R`用纵向无迹投影推出 \eqref{6.48}，解释为何 $\Phi\simeq-\Psi$ 以及中微子四极矩的作用`,
    R`推导张量模方程 \eqref{6.73}，理解超视界冻结、进入视界后振荡并按 $1/a$ 衰减，求出 RD、MD 下的解析解`,
    R`说明分解定理在本章中的几处具体体现`,
  ],
  prereq: [
    { ch: "ch03", what: "第 3 章：Einstein 方程 (3.1)–(3.3)、共形牛顿规范的 Christoffel 符号 (3.55)–(3.56)、扰动能动张量 (3.86)" },
    { ch: "ch05", what: R`第 5 章：光子温度扰动与多极矩、中微子扰动、物质的 $\delta$ 与 $u$（式 5.67–5.74）` },
    { ch: "ch02", what: "第 2 章：共形时间、Box 2.2 的坐标变换律、FLRW 背景演化" },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="先数清自由度（分解 → 规范），再分别计算标量与张量的 Einstein 方程。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应本章的两条主线。每个节点是一个编号公式（点击放大、逐符号解读），悬停查看上下游与每一步用了什么。">
        <h3>标量线：分解 → 规范 → Ricci → 两条 Einstein 方程</h3>
        <EqMap edges={EQMAP_SCALAR} labels={EQMAP_LABELS} />
        <h3>张量线：Christoffel → Ricci → 引力波方程</h3>
        <EqMap edges={EQMAP_TENSOR} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十一张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec61 />
      <Sec62 />
      <Sec63 />
      <Sec64 />
      <Sec65 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 7 章：初始条件">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="svt" /> · <C id="gauge" /> · <C id="poisson" /> · <C id="aniso" /> · <C id="gw_eq" /> · <C id="horizon" /></p>
      </Block>
      <Exercises />
    </TextbookPage>);
}
