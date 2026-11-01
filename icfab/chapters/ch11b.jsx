// 第 11 章（下）后道互连工艺：关键工艺、未来结构与三维集成（Plummer & Griffin, PDF pp. 545–587，§11.4–11.9）
// §11.1–11.3 由 ch11 负责；符号跨章共享。
// 高层理解层在 _ch11b_overview.jsx；符号词典 _ch11b_notation.jsx；正文 _ch11b_s4a / s4b / s5 / s7；
// 交互图 _ch11b_plots.jsx（数值见 _ch11b_phys.jsx）；自绘图 _ch11b_svg.jsx、_ch11b_damascene.jsx；三维 _ch11b_three.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, pageUrl } from "@kit";
import { NOTATION } from "./_ch11b_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_CONTACT, EQMAP_CU, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch11b_overview.jsx";
import { Sec114 } from "./_ch11b_s4a.jsx";
import { Sub1143, Sub1144 } from "./_ch11b_s4b.jsx";
import { Sec115, Sec116 } from "./_ch11b_s5.jsx";
import { Sec117, Sec118, Sec119 } from "./_ch11b_s7.jsx";

const R = String.raw;

export const meta = {
  id: "ch11b", no: 11, label: "第 11 章（下）", title_en: "Back-End (Interconnect) Processing (II): Key Processes, Future Structures, 3D Integration (§11.4–11.11)",
  title_zh: "后道互连工艺（下）：关键工艺、未来结构与三维集成", pages: "PDF 545–587",
  one_liner: R`第 11 章的下半部分：拆开后道的四项关键工艺——金属–半导体接触、硅化物、Cu 电镀、电迁移——看清它们的物理，再看铜互连缩到 10 nm 时的极限、化合物半导体的剥离，以及芯粒、中介层与三维集成；最后为全书收束。`,
  big_question: R`电流怎样低损耗地从铜导线进入晶体管？只能电镀的铜如何无空洞地填满深孔、又能撑多少年不被电子"吹断"？线宽缩到电子平均自由程以下、单芯片做不下整个系统时，后道往哪里走？`,
  why_it_matters: R`在先进节点上，接触电阻与互连 RC 已经和晶体管本身同等重要，甚至更重要；后道的复杂度与研发投入如今与前道比肩，并延伸为芯粒、硅中介层和三维堆叠——它们正在决定芯片和系统的架构方式。本章的模型（隧穿接触、Deal–Grove 硅化、法拉第电镀、Black 方程、尺寸效应）是评估任何新互连方案的基本工具。`,
  overview: R`本章是第 11 章的**下半部分**（§11.4–11.9；§11.1–11.3 的 RC 限制与后道发展历程见第 11 章（上））。§11.4 依次讲四项关键工艺：接触（热电子发射 vs 隧穿，\eqref{11.11} 与 \eqref{11.15}）、硅化物（线性–抛物线生长 \eqref{11.16}）、Cu 电镀（法拉第定律 \eqref{11.22}、Tafel 关系 \eqref{11.23} 与超填充）和电迁移（电子风力 \eqref{11.27} 到 Black 方程 \eqref{11.30}）。§11.5 讨论降 R、降 C 的物理极限：不缩的阻挡层与尺寸效应 \eqref{11.31} 让 Ru、Co 登场。§11.6 把第 2 章 CMOS 的后道 14 步完整走一遍（可交互翻页）。§11.7 介绍化合物半导体的剥离工艺；§11.8 介绍芯粒、硅中介层、TSV、混合键合与 3D NAND（三维可旋转模型）。§11.9 小结。原书本版无章末习题，正文中穿插了若干自拟小练习。`,
  objectives: [
    R`由 \eqref{11.9} 推出热电子发射接触的 $\rho_c=kT/qJ_0$，并用 \eqref{11.12}–\eqref{11.15} 估算重掺杂隧穿接触的 $\rho_c$ 与接触电阻`,
    R`用线性–抛物线模型 \eqref{11.16} 与表 11.5 计算 $\mathrm{TiSi_{2}}$ 厚度，判断扩散限速与反应限速，理解扩散物种与横向侵蚀的关系`,
    R`用法拉第定律 \eqref{11.22} 换算电镀速率，解释为什么共形填充仍会留缝、超填充靠哪些添加剂机制实现`,
    R`从电子风力 \eqref{11.27} 推到原子通量 \eqref{11.28}，用 Black 方程 \eqref{11.30} 把加速测试外推到工作条件`,
    R`用 \eqref{11.31} 与阻挡层几何比较 Cu、Co、Ru 细线的等效电阻率，说明 $\rho_o\lambda$ 的意义`,
    R`按顺序复述双大马士革后道的各步并说明每层材料的作用；解释剥离、芯粒、TSV、混合键合与 3D NAND 的基本原理`,
  ],
  prereq: [
    { ch: "ch11", what: "第 11 章（上）：互连 RC 延迟、后道结构演进（Al → Cu、低 k、双大马士革图 11.19、多层结构图 11.20）" },
    { ch: "ch06", what: "第 6 章：Deal–Grove 线性–抛物线氧化模型、应力相关参数" },
    { ch: "ch09", what: "第 9 章：等离子体刻蚀与 CMP" },
    { ch: "ch10", what: "第 10 章：溅射、CVD 与台阶覆盖、$(\\cos\\theta)^n$ 角分布" },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="从晶体管的接触往上，一路走到芯片之外的封装与三维集成。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应本章的两条主线。每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式到下一式用了什么。">
        <h3>前道–后道接口：接触与硅化物</h3>
        <EqMap edges={EQMAP_CONTACT} labels={EQMAP_LABELS} />
        <h3>铜互连：电镀、电迁移与尺寸效应</h3>
        <EqMap edges={EQMAP_CU} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec114><Sub1143 /><Sub1144 /></Sec114>
      <Sec115 />
      <Sec116 />
      <Sec117 />
      <Sec118 />
      <Sec119 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 全书收束与附录">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="contact" /> · <C id="salicide" /> · <C id="superfill" /> · <C id="electromigration" /> · <C id="size_effect" /> · <C id="chiplet" /> · <a href={pageUrl("appA")}>附录：常数、材料性质与常用图表 →</a></p>
      </Block>
    </TextbookPage>);
}
