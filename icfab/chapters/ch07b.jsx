// 第 7 章（下）半导体掺杂：原子尺度机制与点缺陷（Plummer & Griffin, PDF pp. 337–363，§7.12–7.19）
// 拆分章：§7.1–7.11 由 ch07 负责（式 7.1–7.51、图 7.1–7.23）。本页公式编号接续第 7 章。
// 高层理解层在 _ch07b_overview.jsx；符号词典 _ch07b_notation.jsx；正文 _ch07b_s1…s5.jsx；
// 交互图 _ch07b_plots.jsx（数值模型 _ch07b_phys.jsx）；图 7.24 的二维/三维动画 _ch07b_lattice.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch07b_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_SI, EQMAP_POLY, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch07b_overview.jsx";
import { Sec712, Sec713 } from "./_ch07b_s1.jsx";
import { Sec714, Sec715 } from "./_ch07b_s2.jsx";
import { Sec716 } from "./_ch07b_s3.jsx";
import { Sec717 } from "./_ch07b_s4.jsx";
import { Sec718, Sec719 } from "./_ch07b_s5.jsx";

const R = String.raw;

export const meta = {
  id: "ch07b", no: 0, label: "第 7 章（下）", title_en: "Doping in Semiconductors (II): Atomic-Scale Mechanisms", title_zh: "半导体掺杂（下）：原子尺度机制与点缺陷", pages: "337–363",
  one_liner: R`掺杂原子自己不会动，它们靠空位和自间隙"搭便车"：把扩散率拆成间隙与空位两条通道，$D_{\rm A}^{\rm eff}=D_{\rm A}^*(f_{\rm I}C_{\rm I}/C_{\rm I}^*+f_{\rm V}C_{\rm V}/C_{\rm V}^*)$，再对真正可动的物种用 Fick 定律，就统一解释了 OED/ORD、扭结加拖尾、发射极推进、反短沟道效应，并延伸到多晶硅与 GaAs。`,
  big_question: R`为什么同一次氧化让硼扩散变快、锑扩散变慢？掺杂原子在原子尺度上如何移动，点缺陷如何被工艺扰动、又如何反过来改变掺杂分布？`,
  why_it_matters: R`现代器件的结深只有几十纳米，扩散的"反常"部分往往就是全部：注入后的瞬态增强扩散、栅下沟道掺杂的重新分布、多晶硅栅的掺杂与穿透，都由点缺陷决定。本章的三流模型 \eqref{7.52}、质量作用定律 \eqref{7.57}、梯度两项 \eqref{7.59} 和 I–V 复合 \eqref{7.60}，正是今天工艺模拟器的物理内核，也是第 8 章 TED 模型的出发点。`,
  overview: R`本章是第 7 章的下半部分（上半部分 §7.1–7.11 讲宏观扩散：Fick 定律、解析解、电场效应与浓度依赖扩散、偏析）。§7.12 介绍三种原子尺度机制；§7.13 用氧化/氮化实验区分间隙与空位通道，建立三流模型，并对可动物种使用 Fick 定律，得到含点缺陷梯度项的通量；§7.14 讨论 I–V 复合的两个极限；§7.15 用自扩散与掺杂扩散的激活能差解释耦合效应的温度依赖；§7.16 是多晶硅的两股流模型；§7.17 把同样的物理用于 GaAs 与 SiC；§7.18–7.19 讨论掺杂方法并总结全章。`,
  objectives: [
    R`描述空位、踢出、间隙–替位对三种机制，说明为何空位机制在金刚石晶格中需要空位走到第三近邻`,
    R`用表 7.4 的 $f_{\rm I}$ 与 \eqref{7.52} 计算给定间隙超饱和下 B、P、As、Sb 的 OED/ORD，并说明 I–V 复合快慢对结论的影响`,
    R`由 \eqref{7.56}、\eqref{7.57} 推出 $D_{\rm A}\propto C_{\rm I}$ 与通量的梯度两项 \eqref{7.59}，用它解释化学泵浦、发射极推进与反短沟道效应`,
    R`用激活能差估算温度对全耦合效应的影响；用两股流模型 \eqref{7.61}–\eqref{7.63} 理解多晶硅中的扩散`,
    R`说明 GaAs 中 Zn/Be 与 IV 族施主的平方律浓度依赖扩散及箱形分布，理解 SiC 中“只需激活、不需扩散”的含义`,
  ],
  prereq: [
    { ch: "ch07", what: "第 7 章（上）：Fick 定律、本征扩散率与 Arrhenius 关系（式 7.28、图 7.14）、浓度依赖扩散（§7.10，式 7.44）" },
    { ch: "ch03", what: "第 3 章：晶体结构（金刚石晶格）、本征点缺陷与层错（图 3.7、3.8、3.12）" },
    { ch: "ch06", what: "第 6 章：热氧化与 LOCOS、氧化时的体积膨胀（图 6.4）" },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="七步从原子跳跃走到器件与材料。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="上图是硅中点缺陷–掺杂耦合的主干推导；下图是多晶硅与 GaAs 中的模型。每个节点是一个编号公式（点击放大），箭头上写着从上一式推到下一式用了什么。">
        <h3>硅：从可动物种到三流模型与梯度项</h3>
        <EqMap edges={EQMAP_SI} labels={EQMAP_LABELS} />
        <h3>多晶硅与 GaAs</h3>
        <EqMap edges={EQMAP_POLY} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec712 />
      <Sec713 />
      <Sec714 />
      <Sec715 />
      <Sec716 />
      <Sec717 />
      <Sec718 />
      <Sec719 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 8 章：离子注入">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="fI" /> · <C id="oed" /> · <C id="recomb" /> · <C id="gradient" /> · <C id="poly" /> · <C id="gaas" />。原书 §7.20 参考文献未转录；§7.21 习题在本版原书中未收录。</p>
      </Block>
    </TextbookPage>);
}
