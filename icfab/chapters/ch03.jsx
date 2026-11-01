// 第 3 章 半导体材料：晶体生长、晶圆制备与材料性质（Plummer & Griffin, PDF pp. 77–115）——主文件
// 高层理解层在 _ch03_overview.jsx；符号词典 _ch03_notation.jsx；正文 _ch03_s1…s4.jsx；
// 交互图 _ch03_plots.jsx（数值见 _ch03_phys.jsx）；自绘插图 _ch03_figs.jsx；三维晶格 _ch03_lattice.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch03_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_PD, EQMAP_SEG, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch03_overview.jsx";
import { Sec31, Sec32, Sec33 } from "./_ch03_s1.jsx";
import { Sec34 } from "./_ch03_s2.jsx";
import { Sec35, Sec36, Sec37 } from "./_ch03_s3.jsx";
import { Sec38, Sec39 } from "./_ch03_s4.jsx";

const R = String.raw;

export const meta = {
  id: "ch03", no: 3, title_en: "Semiconductor Materials: Crystal Growth, Wafer Preparation and Material Properties", title_zh: "半导体材料：晶体生长、晶圆制备与材料性质", pages: "77–115",
  one_liner: R`从石英砂到镜面晶圆：用晶体学描述硅，用热力学数清点缺陷，用热平衡算出拉速，用杂质守恒算出晶锭上的掺杂分布。`,
  big_question: R`一片"无位错、杂质 ppb 级、电阻率均匀"的硅晶圆是怎样造出来的？晶体里必然存在哪些缺陷、有多少、带什么电？掺杂在生长中为什么会沿晶锭漂移，又如何反过来被用来提纯？`,
  why_it_matters: R`晶圆是所有工艺的起点：晶向决定氧化速率与界面质量（第 6 章），本征点缺陷 I、V 是扩散与注入损伤的"主角"（第 7、8 章），CZ 硅中的氧是内吸杂的基础（第 4 章），分凝的概念将在氧化与扩散的界面再分布中反复出现。本章的 $C^*\propto e^{-H^f/kT}$、$C_{V^-}^*\propto n/n_i$ 与 $C_S=k_OC_O(1-f)^{k_O-1}$ 是后面各章的基本工具。`,
  overview: R`本章沿着"材料 → 缺陷 → 生长 → 晶圆 → 掺杂"推进。§3.2 建立描述晶体的语言（Miller 指数、金刚石与闪锌矿晶格、六方四指数）；§3.3–3.4 讨论缺陷，重点是热力学必然存在的点缺陷：平衡浓度、扩散率和随费米能级变化的电荷态。§3.5–3.6 讲单晶生长：硅的 CZ 与 FZ（含拉速的热平衡模型），以及化合物半导体的 LEC、Bridgman 与升华法。§3.7 是把晶锭变成抛光晶圆的机械与化学步骤。§3.8 用杂质守恒推导 CZ 与 FZ 中的掺杂分布，引出区熔提纯与中子嬗变掺杂；§3.9 介绍 SOI 与键合晶圆。`,
  objectives: [
    R`由截距求晶面的 Miller 指数，说明金刚石/闪锌矿晶格的构造与原子密度，并用 $\lambda=hc/E_G$ 估算发光波长`,
    R`用 $\sigma=\alpha Y\Delta T$ 估计产生位错的临界温差，并说明层错/位错攀移如何用作点缺陷"探针"`,
    R`由式 (3.3)–(3.7) 计算任意温度下 $C_{I^0}^*$、$C_{V^0}^*$、$D_I$、$D_V$，并与 $n_i$、掺杂浓度比较`,
    R`由式 (3.8)–(3.13) 计算带电空位浓度，解释为什么掺杂会增加点缺陷总数`,
    R`说明 CZ 与 FZ 的流程、Dash 缩颈与氧的三种效应，用式 (3.14) 估算最大拉速`,
    R`推导并使用 $C_S=k_OC_O(1-f)^{k_O-1}$ 与 FZ 单次通过公式，理解区熔提纯与 NTD`,
  ],
  prereq: [
    { ch: "ch02", what: "第 2 章：CMOS 工艺流程从 P 型 (100) 衬底开始，晶圆规格的来历" },
    { what: R`半导体基础：禁带、费米能级、$n=n_ie^{(E_F-E_i)/kT}$（附录 A.1）；Boltzmann 统计` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="九节，从晶体的语言走到 SOI 晶圆。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="本章有两条推导主线：点缺陷的统计（§3.4）与生长中的杂质守恒（§3.8）。每个节点是一个编号公式，箭头上写着用了什么。式 (3.1)、(3.2)、(3.14)、(3.15)、(3.26) 是独立的结果，见各节。">
        <h3>点缺陷：从自由能到带电缺陷</h3>
        <EqMap edges={EQMAP_PD} labels={EQMAP_LABELS} />
        <h3>分凝：从杂质守恒到 CZ 与 FZ 的掺杂分布</h3>
        <EqMap edges={EQMAP_SEG} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十一张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec31 />
      <Sec32 />
      <Sec33 />
      <Sec34 />
      <Sec35 />
      <Sec36 />
      <Sec37 />
      <Sec38 />
      <Sec39 />
      <Block id="end" toc="小结" kicker="3.10 小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 4 章：洁净室、晶圆清洗、吸杂与芯片良率">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="diamond" /> · <C id="native_pd" /> · <C id="charged_pd" /> · <C id="cz" /> · <C id="segregation" /> · <C id="zone_refining" /></p>
      </Block>
    </TextbookPage>);
}
