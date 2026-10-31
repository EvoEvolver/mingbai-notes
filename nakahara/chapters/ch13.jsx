// 第 13 章 规范场论中的反常（Nakahara, Geometry, Topology and Physics, 2nd ed., PDF pp. 521–547）——主文件
// 高层理解层在 _ch13_overview.jsx；符号词典在 _ch13_notation.jsx；陈述登记表在 _ch13_stmts.js（经 book.js 合并）；公式记号常量在 _ch13_tex.js；
// 正文：_ch13_s1.jsx（开篇 + §13.1 + §13.2）、_ch13_s3.jsx（§13.3）、_ch13_s4.jsx（§13.4）、_ch13_s5.jsx（§13.5）、_ch13_s6.jsx（§13.6）；交互图在 _ch13_demos.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable } from "@kit";
import { NOTATION } from "./_ch13_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch13_overview.jsx";
import { Intro, Sec131, Sec132 } from "./_ch13_s1.jsx";
import { Sec133 } from "./_ch13_s3.jsx";
import { Sec134 } from "./_ch13_s4.jsx";
import { Sec135 } from "./_ch13_s5.jsx";
import { Sec136 } from "./_ch13_s6.jsx";

const R = String.raw;

export const meta = {
  id: "ch13", no: 13, title_en: "Anomalies in Gauge Field Theories", title_zh: "规范场论中的反常", pages: "521–547",
  one_liner: R`经典对称性未必能量子化：手征转动下路径积分测度的 Jacobian 就是 Dirac 算子的指标 $\int\mathrm{ch}_l(\mathcal{F})$（阿贝尔反常）；手征费米子行列式的相位沿规范圈的卷绕是高两维的指标，经下降方程落下来就是非阿贝尔反常；奇数维中它化身为 $\eta$ 不变量（宇称反常）。`,
  big_question: R`一个在 Lagrange 量层面成立的对称性，为什么会在量子论中失效？失效的量为什么是拓扑不变量，又为什么四维的阿贝尔反常与非阿贝尔反常系数不同（$\frac1{4\pi^2},\frac23$ vs $\frac1{24\pi^2},\frac12$）？`,
  why_it_matters: R`反常是第 11、12 章数学（示性类、陈–Simons 形式、指标定理、$\eta$ 不变量）在物理中最直接的落点。手征反常解释了 $\pi^0\to\gamma\gamma$ 并给出颜色数；规范反常相消约束了标准模型的费米子量子数（夸克与轻子必须成套出现）；下降方程、BRS 上同调与"高两维"的思想后来成为弦论反常相消（Green–Schwarz）与拓扑物态（量子霍尔效应、拓扑绝缘体中的反常流入）的标准工具。`,
  overview: R`**§13.1** 回顾两个由 Feynman 图得到的公式：Adler–Bell–Jackiw 的阿贝尔反常 \eqref{13.5} 与 Bardeen 的非阿贝尔反常 \eqref{13.9}。**§13.2** 用 Fujikawa 方法推出前者：按 Dirac 算子的本征函数展开费米场，手征转动下测度的 Jacobian 给出 $\partial_\mu j^\mu=-2\mathrm{i}\boldsymbol A$；Gauss（热核）截断后非零模成对抵消，$\int\boldsymbol A=\nu_+-\nu_-=\int\mathrm{ch}_l(\mathcal{F})$——局部的指标定理。**§13.3** 处理只与一种手征耦合的规范场：$\mathrm{i}\hat D$ 非 Hermite，但 $|\det\mathrm{i}\hat D|$ 规范不变，反常只在相位中；Jacobian 正规化给出 \eqref{13.57}，反常对费米子可加，引出标准模型的反常相消。**§13.4** 引入 BRS 算子与鬼场（沿规范轨道的外微分与 Maurer–Cartan 形式），写出 Wess–Zumino 一致性条件，并用 Stora–Zumino 下降方程从 $\mathrm{ch}_{l+1}$ 构造其解（命题 13.1）。**§13.5** 证明 $m$ 维手征行列式相位沿规范圈的卷绕数等于 $S^2\times S^m$ 上 Dirac 算子的指标，从而带归一化地得到非阿贝尔反常。**§13.6** 讨论奇数维的宇称反常 $\mathrm{Im}\,W=\frac\pi2\eta$，并用 APS 定理把三者连成维数阶梯 4–3–2。四个交互图分别演示环面磁场上的 Fujikawa 正规化、下降方程系数的精确计算、$S^1$ 上 $\eta$ 不变量与谱流，以及标准模型一代费米子的反常相消。`,
  objectives: [
    R`用 Fujikawa 方法推出 $\partial_\mu j^\mu_{m+1}=-2\mathrm{i}\boldsymbol A$（\eqref{13.15}–\eqref{13.25}），说明 Grassmann 测度为何乘 $(\det C)^{-1}$`,
    R`解释 Gauss 截断下非零模为何成对抵消（\eqref{13.28}），并用平面波计算 $\boldsymbol A(x)=-\frac1{32\pi^2}\Tr\epsilon\mathcal{F}\mathcal{F}$（\eqref{13.32}），得到 $\nu_+-\nu_-=\int\mathrm{ch}_l(\mathcal{F})$`,
    R`说明手征 Dirac 算子 $\mathrm{i}\hat D$ 的构造与非 Hermite 性，证明 $|\det\mathrm{i}\hat D|$ 规范不变（\eqref{13.47}），理解反常相消条件 $\sum d_{\alpha\beta\gamma}=0$`,
    R`写出 BRS 变换 \eqref{13.63a}–\eqref{13.63b} 并验证其幂零性（习题 13.1）；理解 $\mathbb{F}=\boldsymbol F$ 如何导出下降方程 \eqref{13.80a}–\eqref{13.80d} 与 WZ 条件的解`,
    R`复现命题 13.1 的证明，算出 $Q^1_2$、$Q^1_4$（\eqref{13.83a}–\eqref{13.83b}），解释 $\frac23$ 与 $\frac12$ 的来源`,
    R`理解 §13.5 的论证链：规范圈 $\to$ 相位卷绕 $\mathcal{N}$ $\to$ 圆盘零点 $\to$ $S^2\times S^m$ 上的指标 $\to$ $\delta_\omega W=2\pi\mathrm{i}\int Q^1_m$；推出 $\frac1{24\pi^2}$`,
    R`推导宇称反常 $\mathrm{Im}\,W=\frac\pi2\eta$（\eqref{13.110}），并说明维数阶梯 4–3–2 中三种身份的同一性`,
  ],
  prereq: [
    { ch: "ch01", what: R`第 1 章：路径积分、Grassmann 数与 Berezin 积分（§1.5，$\dd(ca)=\dd a/c$）` },
    { ch: "ch10", what: R`第 10 章：联络与规范势、规范变换 $g^{-1}(\mathcal{A}+\dd)g$、Ehresmann 联络的重建（定理 10.1）、瞬子与映射度 $\frac1{24\pi^2}\int\Tr(g^{-1}\dd g)^3$（定理 10.7）、Berry 相位` },
    { ch: "ch11", what: R`第 11 章：陈特征 $\mathrm{ch}_l$、对称化迹 str（式 (11.8)）、陈–Simons 形式的插值公式（式 (11.105)）及其规范变换（式 (11.118)）` },
    { ch: "ch12", what: R`第 12 章：Dirac 算子与扭曲旋量复形的 Atiyah–Singer 指标定理（定理 12.2）、热核与 McKean–Singer 公式（定理 12.5）、$\eta$ 不变量、谱流与 APS 指标定理（定理 12.3；§12.8、例 12.8）` },
  ],
};

export const notation = NOTATION;
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["F:fujikawa13", "F:absdet13", "F:descent13", "F:wz13", "P13.1", "X:AG1984", "F:ag13", "F:nonab13", "F:parity13", "F:ladder13"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="两个公式 → 阿贝尔反常即指标 → 非阿贝尔反常是相位问题 → WZ 条件与下降方程 → 为什么要高两维 → 奇数维与维数阶梯。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。左支是 Fujikawa 方法：作用量与测度的变化 → 反常守恒律 → 截断 → 指标；中支是 BRS 与下降方程：$\mathcal{S}^2=0$、$\mathbb{F}=\boldsymbol F$ → WZ 条件与 $Q^1_{2l}$；右支是 §13.5–13.6：相位卷绕 → 高两维指标 → 带归一化的反常，以及 $\eta$ 与谱流。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="deps" toc="论断依赖" kicker="论断依赖" title="本章论断的依赖关系" lead="原书本章只有一个编号陈述（命题 13.1）；其余在推理链上起作用的论断登记为“论断”（F:）或“外部引用”（X:）。上：依赖图（被依赖者在上；悬停看上下游，点击看陈述）。下：一览表，含作用与核对状态（✚ 表示原书略写、本站已补全）。">
        <DepGraph ids={[...OWN, "F:cs-gauge", "T10.7"]} highlight="ch13" />
        <StudyTable ids={OWN} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十三张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec131 />
      <Sec132 />
      <Sec133 />
      <Sec134 />
      <Sec135 />
      <Sec136 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 14 章：玻色弦理论">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="anomaly" /> · <C id="abelian_anomaly" /> · <C id="descent" /> · <C id="ladder" /></p>
      </Block>
    </TextbookPage>);
}
