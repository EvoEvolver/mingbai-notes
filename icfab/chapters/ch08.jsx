// 第 8 章（上）离子注入：§8.1–8.7（Plummer & Griffin, Integrated Circuit Fabrication, PDF pp. 364–389；图 8.23 在 p. 390）——主文件
// 高层理解层 _ch08_overview.jsx；符号词典 _ch08_notation.jsx；正文 _ch08_s2.jsx … _ch08_s7.jsx；
// 交互图 _ch08_plots.jsx；自绘 SVG _ch08_figs.jsx；三维场景 _ch08_three.jsx；数值模型 _ch08_phys.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch08_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_DIST, EQMAP_STOP, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch08_overview.jsx";
import { Sec81, Sec82 } from "./_ch08_s2.jsx";
import { Sec83 } from "./_ch08_s3.jsx";
import { Sec84 } from "./_ch08_s4.jsx";
import { Sec85 } from "./_ch08_s5.jsx";
import { Sec86 } from "./_ch08_s6.jsx";
import { Sec87 } from "./_ch08_s7.jsx";

const R = String.raw;

export const meta = {
  id: "ch08", no: 8, label: "第 8 章（上）", title_en: "Ion Implantation (I): Profiles and Stopping (§8.1–8.7)", title_zh: "离子注入（上）：射程分布与阻止本领", pages: "364–389",
  one_liner: R`离子注入把杂质"数着"打进晶体：剂量由法拉第杯精确计数，深度分布由 $R_P$、$\Delta R_P$（以及 $\gamma$、$\beta$）描述，背后是核阻止与电子阻止的物理。`,
  big_question: R`一个个随机散射、落点无法预言的离子，怎样叠加成可以精确设计的掺杂分布？掩模要多厚才挡得住？离子究竟靠什么停下来？`,
  why_it_matters: R`现代 CMOS 的阱、阈值、源漏、晕环、多晶硅掺杂几乎全靠注入完成。本章给出的高斯/Pearson 分布、掩模厚度 $x_{\rm m}=R_P+m\Delta R_P$、横向 erfc 边缘与阻止本领 $dE/dx=-N(S_n+S_e)$，是设计每一道注入、读懂每一张模拟或 SIMS 曲线的基本工具；核阻止产生的损伤又是下半章退火与瞬态增强扩散的起点。`,
  overview: R`本章是第 8 章的上半（§8.1–8.7）。先看工具：注入机怎样用磁场按 $m/q$ 选离子、用法拉第杯计数剂量（§8.2）。再看统计：大量离子的停止深度近似为高斯分布，$Q=\sqrt{2\pi}\Delta R_PC_P$，扩散后方差加 $2Dt$（§8.2）；用四个矩与 Pearson 分布描述不对称，晶体中的沟道效应造成深尾（§8.3）；多层靶的剂量匹配与两种掩蔽判据（§8.4）；掩模边缘下方的二维 erfc 分布与倾斜注入（§8.5）。最后回到物理：核阻止（屏蔽库仑势下的弹性二体碰撞）与电子阻止（$\propto E^{1/2}$）共同决定射程（§8.6），而 Monte Carlo 二体碰撞模拟把这些物理逐离子地实现出来（§8.7）。§8.8 起的损伤、退火与瞬态增强扩散见第 8 章（下），本章小结之外的"关键概念总结"也由下半章给出。`,
  objectives: [
    R`由 \eqref{8.1}–\eqref{8.3} 解释质量分析与剂量计数，并估算束流、时间与剂量的关系`,
    R`用表 8.1 与 \eqref{8.4}、\eqref{8.7} 画出高斯注入分布，求峰值浓度与结深；用 \eqref{8.9} 估算退火展宽`,
    R`说出 $R_P,\Delta R_P,\gamma,\beta$ 四个矩的物理含义，解释轻离子负偏、重离子正偏与沟道效应的成因及对策`,
    R`用 \eqref{8.16} 与 \eqref{8.19} 设计掩模厚度、计算穿透剂量，并理解剂量匹配法与掩模边缘的 erfc 横向分布 \eqref{8.21}`,
    R`由 \eqref{8.22}–\eqref{8.31} 估算阻止本领与射程，判断核阻止与电子阻止何者主导，理解 Monte Carlo（BCA）模拟的原理与取舍`,
  ],
  prereq: [
    { ch: "ch07", what: "第 7 章：Fick 扩散、高斯与 erfc 解、Dt 的叠加、表面分凝" },
    { ch: "ch03", what: "第 3 章：金刚石晶格与晶向（图 3.6、3.12）" },
    { ch: "ch02", what: "第 2 章：CMOS 工艺流程中的各次注入（阱、阈值、源漏、晕环）" },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="六步：从注入机到 Monte Carlo。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两条主线：分布线（剂量、高斯、矩、掩蔽、横向）与阻止线（碰撞、势、阻止本领、射程）。每个节点是一个编号公式，箭头上写着推导用了什么。">
        <h3>分布线：从高斯到掩蔽与二维</h3>
        <EqMap edges={EQMAP_DIST} labels={EQMAP_LABELS} />
        <h3>阻止线：从二体碰撞到射程</h3>
        <EqMap edges={EQMAP_STOP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十一张卡串起本章：先读一句话版本，再点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec81 />
      <Sec82 />
      <Sec83 />
      <Sec84 />
      <Sec85 />
      <Sec86 />
      <Sec87 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 8 章（下）：损伤、退火与瞬态增强扩散">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="gaussian" /> · <C id="moments" /> · <C id="channeling" /> · <C id="masking" /> · <C id="stopping" /> · <C id="monte_carlo" /></p>
      </Block>
    </TextbookPage>);
}
