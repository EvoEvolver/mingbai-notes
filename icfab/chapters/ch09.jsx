// 第 9 章 刻蚀技术与化学机械抛光（Plummer & Griffin, pp. PDF 424–475）——主文件
// 高层理解层在 _ch09_overview.jsx；符号词典在 _ch09_notation.jsx；各节正文在 _ch09_s1 … _ch09_s6.jsx；
// 自绘图 _ch09_figs.jsx；交互模拟器 _ch09_sim.jsx（刻蚀轮廓水平集、Bosch、cos^n、CMP）；Three.js KOH 模型 _ch09_koh.jsx；<Plot> 交互图 _ch09_plots.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Tx } from "@kit";
import { NOTATION } from "./_ch09_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_A, EQMAP_B, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch09_overview.jsx";
import { Sec91, Sec92 } from "./_ch09_s1.jsx";
import { Sec93, Sec94 } from "./_ch09_s2.jsx";
import { Sec95 } from "./_ch09_s3.jsx";
import { Sec96, Sec97, Sec98 } from "./_ch09_s4.jsx";
import { Sec99 } from "./_ch09_s5.jsx";
import { Sec910, Sec911 } from "./_ch09_s6.jsx";

const R = String.raw;

export const meta = {
  id: "ch09", no: 9, title_en: "Etching Technologies and Chemical-Mechanical Polishing", title_zh: "刻蚀技术与化学机械抛光", pages: "PDF 424–475（原书页码 412–463）",
  one_liner: R`把掩模图形"搬"进材料：用选择比 $S$ 和各向异性度 $A$ 衡量刻蚀，理解等离子体鞘层如何产生定向离子、离子与自由基如何协同刻蚀，学会刻蚀剖面的模拟、原子层刻蚀，以及用 Preston 方程描述的化学机械抛光。`,
  big_question: R`怎样才能只去掉想去掉的材料、只朝想去的方向去掉——而且在纳米尺度上精确地停下来？又怎样把十几层互连之间的表面磨得近乎绝对平整？`,
  why_it_matters: R`每一个晶体管的栅、鳍、接触孔、每一条互连线，形状都是刻出来的；线宽偏差、侧壁角、刻蚀停止的精度直接决定器件性能与良率。CMP 则是现代多层互连和先进光刻（焦深仅 $\pm250$ nm 甚至更小）的前提。本章的鞘层物理、协同刻蚀、$(\cos\theta)^n$ 与黏附系数、Langmuir 自限制吸附，也会在第 10 章薄膜沉积中原样出现。`,
  overview: R`本章分四段。**湿法刻蚀**（§9.2）：引入选择比 $S=r_1/r_2$ 与各向异性度 $A=1-r_{\rm lat}/r_{\rm vert}$，以及 KOH 的晶向选择刻蚀。**等离子体刻蚀的物理与化学**（§9.3–9.8）：弱电离等离子体、鞘层与自偏压给出定向的高能离子；电子碰撞产生自由基；四种刻蚀机制中最重要的是离子增强化学刻蚀（十倍协同）与离子增强抑制剂刻蚀（F/C 比、侧壁钝化、Bosch 工艺）；ICP 把密度与能量解耦；Cl、Br 化学让剖面更陡；弓形、微沟槽与 ARDE。**刻蚀模拟与 ALE**（§9.9–9.10）：水平集、余弦幂入射分布、黏附系数与视角，线性组合模型与 IECE 覆盖率模型；用 Langmuir 自限制吸附实现逐层刻蚀。**CMP**（§9.11）：平坦化程度 DOP、Preston 方程、Warnock 模型、硬抛光模型、碟形与侵蚀，以及图形密度效应。`,
  objectives: [
    R`用选择比 \eqref{9.2} 估算过刻对下层的损耗，用各向异性度 \eqref{9.4} 估算钻蚀与线宽损失；用 KOH 的 54.74° 几何计算倒金字塔坑的自停止深度`,
    R`解释等离子体为何相对器壁带正电位、离子能量为何约为几个 $T_{\rm e}$ 并可因电极面积不对称而进一步提高（自偏压）；用 \eqref{9.8}–\eqref{9.9} 在 K、eV、V 之间换算`,
    R`区分纯化学、纯物理、离子增强化学、离子增强抑制剂四种刻蚀机制，说明 F/C 比、$\mathrm{O_2}$/$\mathrm{H_2}$ 添加与偏压如何控制选择比和剖面，解释 Bosch 工艺`,
    R`写出并使用水平集方程 \eqref{9.11}、余弦幂分布 \eqref{9.12}、黏附系数 \eqref{9.13}、线性组合模型 \eqref{9.14} 与 IECE 模型 \eqref{9.15}–\eqref{9.18}，完成原书例题`,
    R`用 Langmuir 动力学 \eqref{9.20} 估算 ALE 改性步时间，解释 ALE 离子能量窗口；用 Preston 方程 \eqref{9.22} 估算 CMP 速率，解释图形密度、碟形与侵蚀`,
  ],
  prereq: [
    { ch: "ch05", what: "第 5 章：光刻胶掩模、焦深与分辨率（为何需要平坦表面）" },
    { ch: "ch02", what: "第 2 章：CMOS 工艺流程中的 STI、栅刻蚀、接触孔与 CMP 步骤" },
    { what: R`基础气体动理论与玻尔兹曼分布；简单的偏微分方程概念` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="十一节分四段：湿法 → 等离子体物理与化学 → 模拟与 ALE → CMP。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="本章的编号公式不多但分散在几条独立的线上。每个节点是一个编号公式（点击放大），箭头上写着从上一式到下一式用了什么。">
        <h3>刻蚀的指标、等离子体能量与刻蚀模拟</h3>
        <EqMap edges={EQMAP_A} labels={EQMAP_LABELS} />
        <h3>原子层刻蚀与 CMP</h3>
        <EqMap edges={EQMAP_B} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec91 />
      <Sec92 />
      <Sec93 />
      <Sec94 />
      <Sec95 />
      <Sec96 />
      <Sec97 />
      <Sec98 />
      <Sec99 />
      <Sec910 />
      <Sec911 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Tx>{R`原书 §9.12 的要点可以压缩为一句话：**刻蚀把图形转移进材料，选择性来自化学、方向性来自鞘层加速的离子，两者的协同与竞争（加上抑制剂）决定了剖面；CMP 用化学软化加机械去除，以非局域的压力分配实现平坦化。**具体如下。`}</Tx>
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 10 章：薄膜沉积技术">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="selectivity" /> · <C id="anisotropy" /> · <C id="sheath" /> · <C id="synergy" /> · <C id="feature_sim" /> · <C id="ale" /> · <C id="cmp" /></p>
      </Block>
    </TextbookPage>);
}
