// 第 4 章 半导体制造：洁净室、晶圆清洗、吸杂与芯片良率（Plummer & Griffin, PDF pp. 116–161）——主文件
// 高层理解层 _ch04_overview.jsx；符号词典 _ch04_notation.jsx；正文 _ch04_s1 … _ch04_s7；
// 交互图 _ch04_plots.jsx（数值 _ch04_phys.jsx）；自绘示意图 _ch04_figs.jsx；氧化还原阶梯 _ch04_redox.jsx；三维吸杂 _ch04_three.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch04_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_CONTAM, EQMAP_YIELD, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch04_overview.jsx";
import { Sec41 } from "./_ch04_s1.jsx";
import { Sec42 } from "./_ch04_s2.jsx";
import { Sec43 } from "./_ch04_s3.jsx";
import { Sec44 } from "./_ch04_s4.jsx";
import { Sec45 } from "./_ch04_s5.jsx";
import { Sec46 } from "./_ch04_s6.jsx";
import { Sec47, Sec48 } from "./_ch04_s7.jsx";

const R = String.raw;

export const meta = {
  id: "ch04", no: 4, title_en: "Semiconductor Manufacturing: Clean Rooms, Wafer Cleaning, Gettering and Chip Yield", title_zh: "半导体制造：洁净室、晶圆清洗、吸杂与芯片良率", pages: "116–161",
  one_liner: R`芯片能不能赚钱，取决于缺陷与污染能压得多低：洁净室挡、清洗洗、吸杂藏，最后用良率模型 $Y=f(D_{\rm O},A_C)$ 把这一切算成钱。`,
  big_question: R`一颗面积数平方厘米、经过数百道工序的芯片，怎样才能以接近 90% 的良率被制造出来？颗粒、金属与碱金属离子分别从哪里来、如何被除去，缺陷密度又怎样决定良率？`,
  why_it_matters: R`后面每一章的单元工艺（光刻、氧化、扩散、注入、刻蚀、沉积）都在本章描述的洁净环境中进行；本章引入的点缺陷（I、V）反应、Arrhenius 扩散、SRH 寿命与良率统计，会在第 6–11 章反复出现。对工程师而言，良率模型是把工艺指标与经济效益联系起来的唯一桥梁。`,
  overview: R`本章沿"三道防线 + 一条底线"展开。**§4.1** 用两个器件例子（可动离子与 MOS 阈值、深能级金属与 DRAM 刷新）说明污染规格从何而来。**§4.2** 洁净室：ISO 等级的幂律、HEPA 与层流、纯水。**§4.3** 清洗：去胶与 RCA，以及用氧化还原电位理解清洗化学。**§4.4** 吸杂：释放–扩散–俘获三步，本征吸杂的氧沉淀与洁净区，背面吸杂与自间隙注入。**§4.5** 反过来利用深能级做寿命控制。**§4.6** 功能良率：从 Poisson 到 Murphy 积分、负二项与 Seeds 模型，以及多工序累积。**§4.7** 参数良率：$C_p$、$C_{pk}$ 与过程控制。`,
  objectives: [
    R`用式 (4.1)(4.2) 估算可动离子引起的阈值漂移和金属陷阱决定的产生寿命，并据此理解表 4.1 的规格`,
    R`用式 (4.3) 在 ISO 等级、颗粒尺寸与颗粒浓度之间换算；说明 HEPA 与层流的作用`,
    R`用表 4.3 的氧化电位判断清洗液中谁被氧化、谁会反镀，解释 RCA 清洗 SC-1/SC-2 各自的作用`,
    R`描述吸杂的三步；写出踢出与离解反应 (4.7)(4.8) 并判断 I、V 过饱和的影响；用式 (4.9)–(4.11) 估算扩散长度、氧过饱和度与洁净区深度`,
    R`由 Murphy 积分推出负二项与 Seeds 模型，计算给定 $D_{\rm O}$、$A_C$、$C$ 下的良率与多工序累积良率`,
    R`计算 $C_p$、$C_{pk}$ 并与超规格比例联系起来`,
  ],
  prereq: [
    { ch: "ch02", what: "第 2 章：CMOS 工艺流程（前道/后道、CMP 的位置）" },
    { ch: "ch03", what: "第 3 章：CZ 生长中的氧、点缺陷 I/V 及其扩散系数式 (3.6)" },
    { what: R`半导体器件基础：MOS 阈值电压、SRH 复合（附录 A.1）；概率论中的 Poisson 与正态分布` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="三道防线（洁净室、清洗、吸杂），一个反用（寿命控制），一条底线（良率）。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="本章的公式分成两条线：污染的物理化学（器件影响、氧化还原、点缺陷反应与扩散），以及良率的统计。箭头上写着从一式到另一式用了什么。">
        <h3>污染线：器件影响 → 清洗化学 → 吸杂</h3>
        <EqMap edges={EQMAP_CONTAM} labels={EQMAP_LABELS} />
        <h3>良率线：计数论证 → Poisson → Murphy 积分 → 负二项 / Seeds</h3>
        <EqMap edges={EQMAP_YIELD} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec41 />
      <Sec42 />
      <Sec43 />
      <Sec44 />
      <Sec45 />
      <Sec46 />
      <Sec47 />
      <Sec48 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 5 章：光刻">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="three_tier" /> · <C id="redox" /> · <C id="gettering" /> · <C id="intrinsic_g" /> · <C id="yield_models" /> · <C id="cpk" /></p>
      </Block>
    </TextbookPage>);
}
