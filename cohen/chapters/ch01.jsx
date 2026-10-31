// 第 I 章 波与粒子：量子力学基本概念（Cohen-Tannoudji, Diu, Laloë, Quantum Mechanics I, 2nd ed., PDF pp. 25–56）——主文件
// 高层理解层在 _ch01_overview.jsx；符号词典在 _ch01_notation.jsx；各节正文在 _ch01_sA … _ch01_sD.jsx；
// 交互图在 _ch01_plots.jsx（数值函数 _ch01_phys.js），自绘插图在 _ch01_figs.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Sec, Tx, Table } from "@kit";
import { NOTATION } from "./_ch01_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_A, EQMAP_C, EQMAP_D, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch01_overview.jsx";
import { SecA } from "./_ch01_sA.jsx";
import { SecB } from "./_ch01_sB.jsx";
import { SecC } from "./_ch01_sC.jsx";
import { SecD, Conclusion } from "./_ch01_sD.jsx";

const R = String.raw;

export const meta = {
  id: "ch01", no: 1, title_en: "Waves and particles. Introduction to the basic ideas of quantum mechanics", title_zh: "波与粒子：量子力学基本概念", pages: "1–32（PDF 25–56）",
  one_liner: R`实验迫使我们把光和物质都看成"用波计算概率、以粒子被探测"的对象：由此引出波函数、谱分解原理、Schrödinger 方程、波包与 Heisenberg 关系、定态与能量量子化。`,
  big_question: R`同一个光子（电子）为什么既能像波一样干涉，又总是一个点一个点地被探测到？要容纳这两件事，物理学必须放弃哪些经典观念，又该用什么语言来描述粒子？`,
  why_it_matters: R`本章是全书的"词汇表"：概率幅 $\psi(\mathbf r,t)$、$|\psi|^2$ 的概率解释、测量的谱分解规则、Schrödinger 方程 \eqref{B-8}、$\Delta x\,\Delta p\gtrsim\hbar$ \eqref{C-23}、定态方程 $H\varphi=E\varphi$ \eqref{D-9}——第 II 章为它们配上数学工具，第 III 章把它们写成公设，之后的每一章都在用它们。`,
  overview: R`本章不追求严格，而追求**可信**：用一连串简单实验说明量子观念是怎样被逼出来的。**§A（光）**：Planck–Einstein 关系给出光子；双缝实验中光子逐个积累出条纹，迫使我们把电场解释为概率幅；偏振实验总结出测量的规则——结果量子化、本征态、按本征态分解求概率、测量后态突变。**§B（物质）**：de Broglie 把同样的关系用到物质粒子；态由波函数描写，$|\psi|^2$ 为概率密度，演化由线性、一阶的 Schrödinger 方程决定。**§C（波包）**：自由粒子的平面波不可归一化，物理态是波包；稳相论证给出波包中心与 $\Delta x\,\Delta k\gtrsim1$，乘以 $\hbar$ 成为 Heisenberg 关系；中心以群速度（即经典速度）运动。**§D（定态）**：势不含时时分离变量得到定态与本征值方程；方势借光学类比给出量子反射、隧道效应、能量量子化与共振透射。`,
  objectives: [
    R`写出 Planck–Einstein 与 de Broglie 关系 \eqref{A-1}、\eqref{B-3}，并估算光子能量和粒子的 de Broglie 波长`,
    R`解释双缝实验为何同时排除纯粒子与纯波动诠释，说出"概率幅"的含义 \eqref{A-5}、\eqref{B-4}`,
    R`用谱分解原理计算测量概率 \eqref{A-10}、\eqref{B-6}，并说明测量后的态 \eqref{B-7}`,
    R`由 Schrödinger 方程推出自由粒子的色散关系，写出波包 \eqref{C-7} 及其 Fourier 关系 \eqref{C-9}`,
    R`用稳相条件求波包中心 \eqref{C-16}，论证 $\Delta x\,\Delta k\gtrsim1$ 与 $\Delta x\,\Delta p\gtrsim\hbar$，区分相速度与群速度 \eqref{C-32}`,
    R`由分离变量推出定态与 $H\varphi=E\varphi$，写出一般解 \eqref{D-14}；用光学类比定性预言方势阶、势垒、势阱中的量子行为`,
  ],
  prereq: [
    { what: R`经典力学（能量、动量、势能与力 $F=-\mathrm dV/\mathrm dx$）；电磁波与光学（干涉、衍射、偏振、折射率、Malus 定律）` },
    { what: R`复数与复指数；Fourier 变换与 Parseval 等式的基本概念（附录 I）；线性微分方程` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

function Intro() {
  return (
    <Sec n="0" title="Introduction" zh="引言：为什么需要量子力学"
      gist={R`原子与亚原子尺度的现象（原子的存在与稳定、化学键、晶体中的电子……）离开量子物理无从理解；经典力学是量子力学（与相对论）在日常尺度上的近似。本章以定性方式引入量子观念与"词汇"。`}
      why={R`先弄清量子力学要解决什么问题、它与经典物理和相对论是什么关系，才能理解后面每一个"反直觉"的规则从何而来。`}
      gives={[]}>
      <Tx>{R`**为什么从这里开始。**原子为什么稳定？化学键从哪来？电子怎样在晶体里传播？这些问题在经典物理里没有答案。宏观物体的密度、比热、弹性，归根结底也由组成它的原子、电子决定，而且不少宏观现象（超导、激光、半导体……）直接就是量子行为的放大。所以说量子力学是我们理解自然的地基，化学、生物学中的许多现象也建立在它之上。

**它统一了什么。**十九世纪末的物理有两套互不相干的定律：物质用 Newton 力学（附录 III），辐射用 Maxwell 电磁理论（它已把电、磁、光统一，并被 Hertz 波证实），两者之间靠 Lorentz 力联系。量子理论的一大成就，是让物质粒子与辐射服从**同一套**规则——这正是本章 §A（光）与 §B（物质）平行展开的原因。

**它与经典物理、相对论的关系。**二十世纪初的两场革命基本上彼此独立：相对论处理接近光速的运动，量子力学处理原子和亚原子尺度。两者都把经典物理当作自己的近似——物体既非相对论（速度远小于光速）又是宏观（尺寸远大于原子）时，Newton 力学照样好用。量子与相对论可以合而为一，但理论相当复杂；原子与分子物理的绝大多数问题，非相对论量子力学就够了，本书只讨论它。

**怎样读这一章。**本章故意不严格、不完备：目标是让量子观念显得"可信"，并熟悉它的词汇。动摇"轨道"这类直觉的实验会被一一摆出来，看量子理论怎样定性地解决它们。数学形式留给第 II 章，物理公设留给第 III 章。`}</Tx>
      <Table head={[R``, R`**经典描述**`, R`**量子描述**`]} rows={[
        [R`态`, R`6 个数：$\mathbf r(t)$、$\mathbf v(t)$`, R`一个函数 $\psi(\mathbf r,t)$（无穷多个数）`],
        [R`演化`, R`Newton 方程（对 $t$ 二阶）`, R`Schrödinger 方程 \eqref{B-8}（对 $t$ 一阶、线性）`],
        [R`测量`, R`原则上可任意精确、扰动任意小`, R`结果只能是本征值；概率由谱分解给出；测量扰动系统`],
        [R`位置与动量`, R`同时确定`, R`$\Delta x\,\Delta p\gtrsim\hbar$ \eqref{C-23}`],
        [R`经典极限`, R`—`, R`$\lambda=h/p$ 远小于特征长度时，波包中心按经典规律运动 \eqref{C-32}`],
      ]} caption={R`本章的"对照表"：结论部分会再次回到这几行。`} />
    </Sec>);
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="光 → 物质 → 波包 → 定态，十一步。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="三张图对应本章的三条线。每个节点是一个编号公式（点击放大），箭头上写着从上一式到下一式用了什么。">
        <h3>从光到物质：二象性、测量与 Schrödinger 方程</h3>
        <EqMap edges={EQMAP_A} labels={EQMAP_LABELS} />
        <h3>波包：Fourier、稳相、不确定关系、群速度</h3>
        <EqMap edges={EQMAP_C} labels={EQMAP_LABELS} />
        <h3>定态与方势：分离变量与光学类比</h3>
        <EqMap edges={EQMAP_D} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <SecA />
      <SecB />
      <SecC />
      <SecD />
      <Conclusion />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 II 章：量子力学的数学工具">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="duality" /> · <C id="prob_amp" /> · <C id="spectral" /> · <C id="wavepacket" /> · <C id="heisenberg" /> · <C id="stationary" /> · <C id="tunnel" /></p>
      </Block>
    </TextbookPage>);
}
