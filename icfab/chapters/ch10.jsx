// 第 10 章 薄膜沉积技术（Plummer & Griffin，PDF 476–519，书页 464–507）——主文件
// 高层理解层在 _ch10_overview.jsx；符号词典 _ch10_notation.jsx；各节正文 _ch10_s1.jsx … _ch10_s6.jsx；
// 交互图 _ch10_plots.jsx（数值模型 _ch10_phys.jsx）、台阶覆盖模拟 _ch10_step.jsx、ALD 三维动画 _ch10_ald3d.jsx；自绘插图 _ch10_figs1/2.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Sec, Tx, Box, Table } from "@kit";
import { NOTATION } from "./_ch10_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_GROVE, EQMAP_OTHER, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch10_overview.jsx";
import { K } from "./_ch10_svg.jsx";
import { Sec1021 } from "./_ch10_s1.jsx";
import { Sec1022, Sec1023 } from "./_ch10_s2.jsx";
import { Sec1024, Sec1025, Sec1026 } from "./_ch10_s3.jsx";
import { Sec1027 } from "./_ch10_s4.jsx";
import { Sec1028, Sec1029, Sec10210 } from "./_ch10_s5.jsx";
import { Sec103 } from "./_ch10_s6.jsx";

const R = String.raw;

export const meta = {
  id: "ch10", no: 10, title_en: "Deposition Technologies", title_zh: "薄膜沉积技术", pages: "464–507（PDF 476–519）",
  one_liner: R`沉积 = 把原子送到表面（输运）+ 让它们留下来（反应或粘附）；两者的竞争决定了速率、均匀性和台阶覆盖，而各种沉积技术不过是在这场竞争中选了不同的平衡点。`,
  big_question: R`怎样在给定的温度上限下，又快、又均匀、又能钻进深沟槽地长出一层薄膜？为什么 CVD 的速率随温度呈“两段式”，降低气压反而让批量生长更均匀，ALD 能做到原子级厚度控制，而溅射与蒸发的侧壁覆盖那么差？`,
  why_it_matters: R`一颗现代芯片的大部分材料都是沉积上去的：外延源漏、高 k 栅介质、侧墙、层间介质、阻挡层与金属。Grove 模型 $v=\frac{k_Sh_G}{k_S+h_G}\frac{C_T}{N}Y$ 是理解一切 CVD 工艺窗口的钥匙；临界厚度决定了应变工程能走多远；ALD 的自限制是 3 nm 以下节点与 3D NAND 的基础；而“到达角分布 + 粘附系数”模型是预测台阶覆盖、空洞与锁孔的通用语言，第 11 章的互连工艺离不开它。`,
  overview: R`本章按沉积温度从高到低组织（表 10.1）。**化学沉积**一线：先用 Grove 模型（输运通量与反应通量串联）分析 CVD 与外延，得到反应控制与输运控制两个区及其温度依赖；接着讨论外延的掺杂问题、异质外延的临界厚度与 ELO；再沿“降低温度、提高产能”的方向依次介绍 LPCVD（降压提高 $h_G$）、MOCVD（不稳定的金属有机前驱体）、PECVD（等离子体代替热能）和 ALD（两个自限制半反应）。**物理沉积**一线：直流/磁控/射频溅射、蒸发与 MBE。最后 §10.3 用统一的“入射角分布 $(\cos\theta)^n$ + 粘附系数 $S_C$”模型解释共形性、悬挑结构的填充、沟槽与通孔的差别以及锁孔。`,
  objectives: [
    R`从 $F_1=h_G(C_G-C_S)$、$F_2=k_SC_S$ 推出 Grove 公式 \eqref{10.7}，判断给定条件处于哪个控制区，并计算温度改变 10 °C 引起的速率变化`,
    R`解释 LPCVD 为何能同时获得均匀性与高产能（\eqref{10.16}–\eqref{10.18}），并估算降压对 $h_G$ 的影响`,
    R`用 \eqref{10.12}、\eqref{10.13} 估算外延层的外扩散与自掺杂过渡区；用失配度 \eqref{10.15} 与临界厚度 \eqref{10.14} 判断应变外延层是否会产生位错`,
    R`写出 MOCVD、PECVD、ALD 的典型反应（\eqref{10.19}–\eqref{10.27}），说明每种方法降低沉积温度的机理与代价`,
    R`理解直流、磁控、射频溅射与蒸发的物理（\eqref{10.28}、\eqref{10.29}），以及余弦分布与球面等厚的几何`,
    R`用到达角分布 $(\cos\theta)^n$ 与粘附系数 $S_C$ 计算沟槽、通孔内的相对沉积厚度，解释 2D/3D 差异与锁孔的形成`,
  ],
  prereq: [
    { ch: "ch06", what: "第 6 章：Deal–Grove 氧化模型（通量串联、线性/抛物线区的思路）" },
    { ch: "ch07", what: "第 7 章：Fick 扩散与 erfc 解（外延层外扩散）" },
    { ch: "ch09", what: "第 9 章：等离子体与鞘层、溅射刻蚀、余弦分布（式 9.12）、level-set 轮廓模拟" },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

function Intro() {
  return (
    <Sec n="10.1" title="Introduction" zh="引言：沉积工具箱"
      gist={R`芯片的大部分结构是“沉积—图形化—刻蚀”的反复叠加；沉积方法种类繁多，本章按**沉积温度**从高到低组织，因为温度往往决定了一种方法能用在工艺的哪一步。`}
      why={R`同一个 CMOS 流程里，前道外延需要上千度，后道铜互连之上却不能超过约 400 °C；不先建立“温度预算”的观念，就无法理解为什么需要这么多种沉积方法。`}
      gives={[]}>
      <Tx>{R`回顾第 2 章的 CMOS 流程：从外延层、栅介质、多晶硅栅、侧墙，到层间介质、阻挡层、金属，几乎每一步都要先**沉积**一层薄膜，再光刻、刻蚀。沉积方法的“工具箱”很大，同一层膜往往有好几种做法可选，工艺工程师的任务是根据约束挑选合适的那一种。

最硬的约束通常是**温度**：后面的步骤不能破坏前面已经做好的东西——掺杂分布会继续扩散，铝在 660 °C 熔化，铜互连与低 k 介质更是只能承受约 400 °C。所以本章按热预算从高到低排列各种方法。这恰好也是它们的历史发展顺序：最早的“薄膜”是高温热生长的氧化层（第 6 章），今天绝大多数薄膜则是在越来越低的温度下沉积出来的。`}</Tx>
    </Sec>);
}

function Sec102() {
  return (
    <Sec n="10.2" title="Thermal Classification of Deposition Systems" zh="沉积系统的热分类"
      gist={R`表 10.1：CVD（500–1100 °C）、LPCVD、MOCVD、PECVD（300–450 °C）、ALD（100–400 °C）涉及化学反应；溅射、蒸发、MBE 是纯物理过程，可在低温工作。`}
      why={R`一张表先给出整章的“地图”：每种方法在温度轴上的位置，以及它靠化学还是靠物理。`}
      gives={[]}>
      <Tx>{K`表 10.1 把本章的方法按典型温度范围排成一列。前五行依靠**化学反应**：气体分子在表面（或气相中）分解、反应，产物留下成膜；后三行是**物理过程**：把源材料的原子“搬运”过来，不涉及化学变化。分类很粗，例外很多——例如外延硅既可以用 1100 °C 的 {{SiCl4}}，也可以用 600 °C 以下的 {{SiH4}}；但作为路线图足够了。`}</Tx>
      <Table head={["工艺", "缩写", "温度范围", "机理"]} rows={[
        ["化学气相沉积", "CVD", "500–1100 °C", "气相化学反应"],
        ["低压化学气相沉积", "LPCVD", "500–800 °C", "低压气相化学"],
        ["金属有机化学气相沉积", "MOCVD", "600–1200 °C", "气相化学"],
        ["等离子体增强化学气相沉积", "PECVD", "300–450 °C", "等离子体化学"],
        ["原子层沉积", "ALD", "100–400 °C", "表面化学"],
        ["等离子体溅射", "Sputtering", "100–300 °C", "物理沉积"],
        ["蒸发", "Evaporation", "100–500 °C", "物理沉积"],
        ["分子束外延", "MBE", "100–400 °C", "物理沉积"],
      ]} caption="表 10.1 各种沉积工艺的热分类（据 T. Kamins）。" />
      <Box kind="note" title="读表的两点提醒">{K`(1) MOCVD 的温度范围（600–1200 °C）看起来比 CVD 还高，那是因为它常用于 GaN 等需要高温的化合物外延；就同一种材料而言，金属有机前驱体总是让沉积温度显著下降（§10.2.5）。(2) 物理沉积的“温度”是指衬底温度，可以低到室温；需要时加热衬底只是为了改善膜质（表面迁移、致密化）。`}</Box>
      <p className="muted">本节概念：<C id="grove" /> · <C id="pecvd" /> · <C id="ald" /> · <C id="sputter" /></p>
    </Sec>);
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="化学沉积一线（CVD → 外延 → LPCVD → MOCVD → PECVD → ALD）与物理沉积一线（溅射 → 蒸发 → MBE），最后汇合到统一的轮廓模型。点击标题跳到该节。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="主干是 Grove 模型：两个通量相等 → 表面浓度 → 生长速度 → 两个极限；LPCVD 只是把其中的 h_G 换成随气压变化的量。其余公式是相对独立的几条支线。点击节点放大公式。">
        <h3>主干：Grove 模型与 LPCVD</h3>
        <EqMap edges={EQMAP_GROVE} labels={EQMAP_LABELS} />
        <h3>支线：外延掺杂、临界厚度、ALD、等离子体</h3>
        <EqMap edges={EQMAP_OTHER} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec102 />
      <Sec1021 />
      <Sec1022 />
      <Sec1023 />
      <Sec1024 />
      <Sec1025 />
      <Sec1026 />
      <Sec1027 />
      <Sec1028 />
      <Sec1029 />
      <Sec10210 />
      <Sec103 />
      <Block id="end" toc="小结" kicker="小结（§10.4 Summary of Key Ideas）" title="带走这几条">
        <Tx>{R`原书 §10.4 的要点：沉积系统可分为以化学为主（各种 CVD 变体）与以物理为主（溅射、蒸发）两类；物理沉积不需要热能分解气体，可在接近室温下工作；化学沉积则一直在寻找更不稳定的前驱体以降低温度，最新的成果是由两个分开的自限制半反应组成的 ALD。CVD 的动力学由输运通量与表面反应通量的平衡决定；LPCVD 借降压大幅提高输运，使反应控制区可以在高速率下稳定工作；MOCVD 与 PECVD 进一步把温度降低。所有这些系统的轮廓都可以用入射角分布 $(\cos\theta)^n$ 加粘附系数 $S_C$ 的简单模型来描述。`}</Tx>
        <Box kind="warning" title="勘误：§10.4 小结中的一处笔误">{R`原书小结写 MOCVD 与 PECVD“enabled operation at even lower pressures”。从 §10.2.5–10.2.6 的论述看，这两种方法的意义在于让沉积在**更低温度**下进行（PECVD 的工作气压 50 mTorr–1 Torr 与 LPCVD 相当，并不更低），此处应为 “lower temperatures”。`}</Box>
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 11 章：后道互连工艺">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="grove" /> · <C id="regimes" /> · <C id="lpcvd" /> · <C id="ald" /> · <C id="sticking" /></p>
      </Block>
    </TextbookPage>);
}
