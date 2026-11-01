// 第 1 章 历史回顾、摩尔定律与技术前景（Plummer & Griffin, PDF pp. 13–45）——主文件
// 高层理解层在 _ch01_overview.jsx；符号词典在 _ch01_notation.jsx；各节正文在 _ch01_s12/s3/s4/s5/s6.jsx；
// 交互图在 _ch01_plots.jsx（数值见 _ch01_phys.jsx）；自绘图在 _ch01_figs.jsx；三维结构在 _ch01_3d.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch01_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch01_overview.jsx";
import { Sec11, Sec12 } from "./_ch01_s12.jsx";
import { Sec13 } from "./_ch01_s3.jsx";
import { Sec14 } from "./_ch01_s4.jsx";
import { Sec15 } from "./_ch01_s5.jsx";
import { Sec16, Sec17, Sec18, Sec19, Sec110 } from "./_ch01_s6.jsx";

const R = String.raw;

export const meta = {
  id: "ch01", no: 1, title_en: "Historical Perspective, Moore's Law and Future Technology Prospects", title_zh: "历史回顾、摩尔定律与技术前景", pages: "13–45",
  one_liner: R`集成电路六十年的指数增长靠三项发明起步（平面工艺、光刻、集成），靠 Dennard 恒定电场缩放加速，又因 $kT/q$ 定下的 60 mV/dec 而在约 2004 年失去"免费午餐"；此后靠新材料、三维器件和三维集成继续前进。`,
  big_question: R`为什么芯片能在六十年里把复杂度提高十个数量级？"把晶体管做小"为什么曾经让一切同时变好，又为什么在电压降到约 1 V 时戛然而止？之后的进步从哪里来？`,
  why_it_matters: R`本书后面的每一种单元工艺——氧化、光刻、扩散、注入、刻蚀、沉积、互连——都是为了制造本章描述的器件、并让本章的缩放曲线继续下去。理解缩放的账（\eqref{1.S4}–\eqref{1.S8}）和它的物理极限（\eqref{1.1}），才能理解为什么工艺要不断追求更薄的介质、更浅的结、更陡的掺杂、更细更准的图形，以及为什么今天的前沿是应变、高 $k$ 金属栅、FinFET 和 GAA。`,
  overview: R`本章沿三条线展开。**发明线**（§1.1–1.2）：从生长结、合金结、台面管的"结暴露"困境出发，看 $\SiO$ 掩蔽与钝化（平面工艺）、光刻和薄膜互连怎样让集成电路成为可能。**器件线**（§1.3）：MOSFET 的积累—耗尽—反型、它对界面与洁净度的苛刻要求、双极管与 CMOS 的对比。**缩放线**（§1.4–1.6）：摩尔定律与每代 0.7 倍；Dennard 恒定电场缩放逐项推出缩放表；亚阈摆幅 \eqref{1.1} 给出电压缩放的物理下限；此后的功耗墙、材料与器件创新、节点名脱钩，以及 FinFET → GAA → 堆叠 GAA、3D NAND、小芯片的三维化路线。§1.7 介绍全书的组织与 TCAD 仿真。本章交互：摩尔定律与节点数据的对数图、Dennard 缩放计算器、$I_{\rm DS}$–$V_{\rm GS}$ 模型、MOS 静电（积累/耗尽/反型）、平面工艺与光刻的分步示意，以及平面 MOSFET/FinFET/GAA/堆叠 GAA 的三维结构。`,
  objectives: [
    R`说清平面工艺中 $\SiO$ 的掩蔽与钝化作用，以及光刻、集成（Kilby/Noyce）各自解决了什么问题`,
    R`描述 MOSFET 的积累、耗尽、反型三态，解释 N$^+$ 源漏与 $\mathrm{Si/SiO_2}$ 界面质量的作用，以及 CMOS 为何静态不耗电`,
    R`由恒定电场条件 \eqref{1.S4} 推出电容、电流、延迟、功耗与功率密度的缩放因子（原书图 1.16 的表）`,
    R`由热发射推出亚阈摆幅 \eqref{1.1}，并据此说明电源电压为何停在约 1 V、理想缩放为何在 90 nm 代结束`,
    R`用 \eqref{1.S11}–\eqref{1.S13} 估算静态功耗、动态功耗与广义缩放下的功率密度，理解功耗墙`,
    R`比较平面 MOSFET、FinFET、GAA 与堆叠 GAA 的栅控方式，并解释节点名与实际特征尺寸的脱钩`,
  ],
  prereq: [
    { what: R`半导体基础：能带、N/P 型掺杂、PN 结与费米能级（原书附录 1 在本书所需层次上做了回顾）` },
    { what: R`电路基础：电容充放电、功率 $P=VI$` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="三条线（发明、器件、缩放）七步走。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="原书本章只有一个编号公式 (1.1)；图中其余节点是我们把正文中的关键关系写成的补充式 (1.Sn)。左半是 Dennard 缩放的账，右半是 60 mV/dec 如何终结它。悬停看上下游。">
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec11 />
      <Sec12 />
      <Sec13 />
      <Sec14 />
      <Sec15 />
      <Sec16 />
      <Sec17 />
      <Sec18 />
      <Sec19 />
      <Sec110 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 2 章：现代 CMOS 工艺">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="planar" /> · <C id="fieldeffect" /> · <C id="dennard" /> · <C id="swing" /> · <C id="powerwall" /> · <C id="gaa" /></p>
      </Block>
    </TextbookPage>);
}
