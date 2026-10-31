// 第 4 章 物种的起源（Modern Cosmology, 2nd ed., pp. 85–110）——主文件
// 高层理解层在 _ch04_overview.jsx；符号词典在 _ch04_notation.jsx；
// 各节正文在 _ch04_s1.jsx … _ch04_s4.jsx、习题在 _ch04_ex.jsx；交互图在 _ch04_plots.jsx，数值函数在 _ch04_phys.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Sec, Tx, Box } from "@kit";
import { NOTATION } from "./_ch04_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_A, EQMAP_B, EQMAP_C, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch04_overview.jsx";
import { Sec41 } from "./_ch04_s1.jsx";
import { Sec42 } from "./_ch04_s2.jsx";
import { Sec43 } from "./_ch04_s3.jsx";
import { Sec44, Sec45 } from "./_ch04_s4.jsx";
import { Exercises } from "./_ch04_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch04", no: 4, title_en: "The origin of species", title_zh: "物种的起源", pages: "85–110",
  one_liner: R`用同一个速率方程讲完宇宙史上三次"失衡"：中子冻结与核合成、电子与质子的复合、暗物质粒子的冻结——今天的轻元素、CMB 与暗物质都是它们留下的遗迹。`,
  big_question: R`宇宙早期几乎处处处于热平衡，可平衡态不会留下任何"记忆"。那么今天的氦、宇宙微波背景、暗物质，是在什么时刻、因为什么而偏离平衡被保存下来的？它们的丰度能算出来吗？`,
  why_it_matters: R`BBN 的轻元素丰度是检验早期宇宙物理与测量 $\Omega_{\rm b}h^2$ 的最古老化石；复合的时刻与细节决定了 CMB 各向异性（第 9–10 章）；热冻结图景把暗物质的丰度与粒子物理的截面联系起来，给暗物质实验指出了目标。三者用的是同一套数学：Boltzmann 方程 + "反应率与膨胀率之比"。`,
  overview: R`本章先在 §4.1 把第 3 章的 Boltzmann 方程化简为速率方程 \eqref{4.8}：散射保证动力学平衡，玻尔兹曼统计去掉量子因子，每种粒子只剩一个未知函数 $n(t)$；反应率 $\gg H$ 时它退化为 Saha 条件 \eqref{4.9}。随后三节是三次应用。**§4.2 BBN**：$\eta_{\rm b}\sim10^{-9}$ 使氘要等到 $T_{\rm nuc}\approx0.07\,\mathrm{MeV}$ 才能存活；在此之前弱相互作用在 $T\lesssim1\,\mathrm{MeV}$ 冻结，中子比例停在 0.15，衰变后剩 0.11，几乎全部进入 $^4$He，$Y_P\approx0.22$–$0.25$。**§4.3 复合**：同样的"光子太多"使氢的复合推迟到 $T\approx0.3\,\mathrm{eV}$；Saha 给出时刻，Peebles 方程给出 $X_e$ 的真实演化；散射率/膨胀率表明光子在复合期间退耦。**§4.4 暗物质**：WIMP 的 Riccati 方程给出 $Y_\infty\simeq x_f/\lambda$，遗迹密度 $\Omega_X\propto1/\langle\sigma v\rangle$，弱作用尺度的截面恰好给出正确丰度——"WIMP 奇迹"——以及直接、间接、对撞机三类探测。`,
  objectives: [
    R`从 \eqref{4.1} 出发，说明动力学平衡与玻尔兹曼统计如何把它化为速率方程 \eqref{4.8}，并会用 $n_2\langle\sigma v\rangle$ 与 $H$ 的比较判断化学平衡与冻结`,
    R`由 Saha 条件推出氘丰度 \eqref{4.16} 与 $T_{\rm nuc}$ 的估计 \eqref{4.29}，解释为什么 $\eta_{\rm b}$ 很小使核合成与复合都被推迟`,
    R`写出并数值求解中子丰度方程 \eqref{4.26}，得到 $X_n\to0.15$、$X_n(T_{\rm nuc})=0.11$ 与 $Y_P=2X_n(T_{\rm nuc})$`,
    R`用 Saha 方程 \eqref{4.34} 与 Peebles 方程 \eqref{4.36}（含习题 4.7 的修正因子）计算 $X_e(z)$，并由 \eqref{4.43} 估计退耦红移`,
    R`推导 WIMP 冻结丰度 $Y_\infty\simeq x_f/\lambda$ 与遗迹密度 \eqref{4.56}–\eqref{4.57}，理解 $\Omega_X$ 为何不显式依赖 $m_X$，并了解三类暗物质探测`,
  ],
  prereq: [
    { ch: "ch02", what: R`第 2 章：分布函数与平衡统计（BE/FD）、熵守恒与 $T_\nu/T$、密度参数 $\Omega_s$ 与 $\rho_{\rm cr}$` },
    { ch: "ch03", what: "第 3 章：Friedmann 方程 (3.12)、均匀宇宙中的 Boltzmann 方程及其碰撞项 (3.43)、(3.48)" },
    { what: R`核物理与原子物理常识：结合能、同位素、氢原子能级；弱相互作用与中子 $\beta$ 衰变` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

function Intro() {
  return (
    <Sec n="4.0" title="Introduction" zh="引言：偏离平衡的时刻"
      gist={R`早期宇宙又热又密，粒子相互作用极频繁，大多数成分处于平衡；而宇宙学家最关心的恰恰是**反应跟不上膨胀、平衡被打破**的时刻——核合成、复合、（可能还有）暗物质的产生。三者都可以用均匀宇宙中的同一个 Boltzmann 方程处理。`}
      why={R`平衡态由温度唯一决定，不留下历史的痕迹；今天能观测到的"遗迹"，都是在偏离平衡时被冻结下来的。`}>
      <Tx>{R`**一个对比。**早期宇宙又热又密，粒子之间的相互作用比今天频繁得多。举个例子：今天一个可见光波段的光子通常可以穿越可观测宇宙的大部分而不被偏折或吸收，平均自由程超过 $10^{28}\,\mathrm{cm}$；而在宇宙年龄为 1 秒时，光子的平均自由程大约只有一个原子那么大。所以在宇宙膨胀一倍所需的时间里，一个光子要相互作用非常非常多次。这些多次相互作用使宇宙中的许多成分保持平衡。

**但关键在于例外。**尽管如此，总有一些时刻，反应无法快到足以维持平衡。并非巧合，这些时刻正是宇宙学家最感兴趣的。本章将看到，偏离平衡的现象在以下过程中起了作用：(i) **大爆炸核合成**期间轻元素的形成；(ii) 电子与质子**复合**成中性氢；以及很可能 (iii) 早期宇宙中**暗物质**的产生。要理解的重要一点是：三者都是非平衡物理的结果，而且三者都可以用同一个形式体系来研究——§3.2 引入的均匀宇宙中的 Boltzmann 方程。本章 §4.2–§4.4 只不过是这个一般公式的应用。

**本章的位置。**总结一下：本章在第 2 章的基础上更进一步，考虑宇宙中的非平衡过程，但仍在**均匀宇宙**的框架内工作。在随后的各章中，我们将超越均匀性，研究同时依赖位置与传播方向的物质与辐射分布函数。`}</Tx>
      <Box kind="key" title="全章的一条主线">{R`对每一种反应，比较**单个粒子的反应率** $\Gamma=n\langle\sigma v\rangle$ 与**膨胀率** $H$：

$\Gamma\gg H$ → 化学平衡，丰度由温度决定（Saha）；$\Gamma\lesssim H$ → 丰度冻结，留下遗迹。

中子–质子转化在 $T\sim1\,\mathrm{MeV}$、氢的复合在 $T\sim0.3\,\mathrm{eV}$、WIMP 湮灭在 $T\sim m_X/20$ 先后越过这条线。`}</Box>
    </Sec>);
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="一个方程、三次应用。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="三张图都从速率方程 (4.8) 出发。每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。悬停看上下游。">
        <h3>框架与核合成：速率方程 → Saha → 中子冻结 → 氦</h3>
        <EqMap edges={EQMAP_A} labels={EQMAP_LABELS} />
        <h3>复合与退耦</h3>
        <EqMap edges={EQMAP_B} labels={EQMAP_LABELS} />
        <h3>暗物质：WIMP 冻结</h3>
        <EqMap edges={EQMAP_C} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十一张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec41 />
      <Sec42 />
      <Sec43 />
      <Sec44 />
      <Sec45 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title={R`→ 第 5 章：非均匀宇宙中的 Boltzmann 方程`}>{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="rate_eq" /> · <C id="freeze_out" /> · <C id="np_ratio" /> · <C id="helium" /> · <C id="recombination" /> · <C id="wimp" /></p>
      </Block>
      <Exercises />
    </TextbookPage>);
}
