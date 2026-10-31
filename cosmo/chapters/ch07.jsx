// 第 7 章 初始条件（Modern Cosmology, 2nd ed., pp. 157–194）——主文件
// 高层理解层在 _ch07_overview.jsx；符号词典在 _ch07_notation.jsx（各节补充条目在 _ch07_nt_*.jsx）；
// 各节正文在 _ch07_s1.jsx … _ch07_s6.jsx、习题在 _ch07_ex.jsx；交互图在 _ch07_plots.jsx，数值函数在 _ch07_phys.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch07_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_BG, EQMAP_PERT, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch07_overview.jsx";
import { Intro70, Sec71 } from "./_ch07_s1.jsx";
import { Sec72 } from "./_ch07_s2.jsx";
import { Sec73 } from "./_ch07_s3.jsx";
import { Sec74 } from "./_ch07_s4.jsx";
import { Sec75 } from "./_ch07_s5.jsx";
import { Sec76 } from "./_ch07_s6.jsx";
import { Exercises } from "./_ch07_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch07", no: 7, title_en: "Initial conditions", title_zh: "初始条件", pages: "157–194",
  one_liner: R`暴胀——一段共动哈勃半径不断缩小的加速膨胀——既解释了宇宙为何如此均匀，又把量子真空涨落拉伸成超视界的原初扰动，给出 Einstein–Boltzmann 方程组的初始条件：$P_{\mathcal R}\propto H^2/\epsilon_{\rm sr}$、$P_{\rm T}\propto H^2$。`,
  big_question: R`第 5、6 章的方程组需要初始条件。宇宙最初的扰动从哪里来？它们有多大、在不同尺度上如何分布？为什么在复合时彼此"从未见过面"的区域温度竟然相同到十万分之一？`,
  why_it_matters: R`本章给出的原初功率谱 $P_{\mathcal R}(k)=2\pi^2\mathcal A_sk^{-3}(k/k_{\rm p})^{n_s-1}$ 与张量谱 $P_{\rm T}$，以及绝热初条件 $\Phi=2\Theta_0$、$\delta_{\rm c}=\delta_{\rm b}=3\Theta_0$，是第 8–10 章计算物质功率谱与 CMB 各向异性的唯一输入。观测到的 $n_s\approx0.965$（略小于 1）与对 $r$ 的上限，正是在检验本章的慢滚暴胀预言。`,
  overview: R`本章分三步走。**第一步（\secref{7.1}–\secref{7.2}）：背景。**视界问题说明，若宇宙一直由物质与辐射主导，最后散射面上相隔 $\gtrsim1.2^\circ$ 的区域从未有过因果联系。解决办法是让共动哈勃半径 $(aH)^{-1}$ 在早期**缩小**——即加速膨胀（暴胀），并持续约 60 个 e 倍。最简单的实现是一个沿平缓势 $V(\phi)$ 慢滚的标量场，用慢滚参数 $\epsilon_{\rm sr}$、$\delta_{\rm sr}$ 刻画。**第二步（\secref{7.3}–\secref{7.4}）：扰动。**把张量扰动 $h$ 与标量场扰动 $\delta\phi$ 都改写成谐振子，按量子力学给出真空涨落 $|v|^2$；在 de Sitter 背景中模函数在视界内振荡、出视界后冻结，于是得到 $P_h=8\pi GH^2/k^3$ 与 $P_{\delta\phi}=H^2/2k^3$。标量扰动还要把 $\delta\phi$ 转换成度规扰动：借助视界外守恒的曲率扰动 $\mathcal R$（两条路线：超视界守恒论证 \secref{7.4.2}、空间平直切片 \secref{7.4.3}），得到 $P_{\mathcal R}=2\pi GH^2/(\epsilon_{\rm sr}k^3)$ 与 $P_\Phi=\frac49P_{\mathcal R}$。**第三步（\secref{7.5}–\secref{7.6}）：接到 Boltzmann 方程上。**在 $k\eta\ll1$ 的早期，所有带 $k$ 的项可忽略，得到绝热初条件；最后用 $\mathcal A_s$、$n_s$、$r$ 参数化原初谱，并由慢滚参数预言 $n_{\rm T}=-2\epsilon_{\rm sr}$、$n_s=1-4\epsilon_{\rm sr}-2\delta_{\rm sr}$、$r=16\epsilon_{\rm sr}$。`,
  objectives: [
    R`用共动视界 $\eta=\int d\ln a\,(aH)^{-1}$ 说明视界问题，算出 $\theta\gtrsim1.2^\circ$；解释为何"共动哈勃半径缩小 $\Leftrightarrow\ddot a>0$"能解决它，并估算所需的约 60 个 e 倍`,
    R`由标量场的能动张量 \eqref{7.6} 推出 $\rho$、$P$、$w$ 与运动方程 \eqref{7.14}/\eqref{7.15}；会用慢滚参数 $\epsilon_{\rm sr}$、$\delta_{\rm sr}$ 刻画暴胀`,
    R`掌握谐振子量子化：$\hat x=v\hat a+v^*\hat a^\dagger$、$\langle|\hat x|^2\rangle=|v|^2$；把张量方程改写成 $v''+(k^2-a''/a)v=0$，解出 de Sitter 模函数 \eqref{7.40} 并得到 $P_h$ \eqref{7.42}`,
    R`推出无引力背景下 $\delta\phi$ 的方程 \eqref{7.54} 与 $P_{\delta\phi}$，理解曲率扰动 $\mathcal R$ 为何在视界外守恒（$\delta P=\dot P\delta\rho/\dot\rho$），并得到 $P_\Phi$ \eqref{7.62}、$P_{\mathcal R}$ \eqref{7.78}`,
    R`在 $k\eta\ll1$ 极限下化简 Einstein–Boltzmann 方程，推出绝热初条件 \eqref{7.91}、\eqref{7.94}、\eqref{7.95}`,
    R`会用 $\mathcal A_s$、$n_s$、$\mathcal A_{\rm T}$、$n_{\rm T}$、$r$ 描述原初谱，并推出 $r=16\epsilon_{\rm sr}$、$n_{\rm T}=-2\epsilon_{\rm sr}$、$n_s=1-4\epsilon_{\rm sr}-2\delta_{\rm sr}$`,
  ],
  prereq: [
    { ch: "ch02", what: R`第 2 章：共形时间与共动视界 \eqref{2.35}、连续性方程 \eqref{2.56}、辐射期 $a\propto\eta$、暗能量需要负压（2.4.6 节）` },
    { ch: "ch06", what: R`第 6 章：张量扰动方程 \eqref{6.73}、Bardeen 规范不变量 \eqref{6.19}、Einstein 方程 \eqref{6.41}、\eqref{6.48} 与辐射单极矩 \eqref{6.79}` },
    { ch: "ch05", what: R`第 5 章：光子、中微子、暗物质与重子的 Boltzmann 方程 \eqref{5.67}–\eqref{5.73}` },
    { ch: "ch03", what: "第 3 章：能动张量与扰动度规；Fourier 模式与功率谱的基本概念" },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="先解决背景的问题（视界问题 → 暴胀 → 慢滚标量场），再计算扰动（张量 → 标量），最后把结果接到第 5、6 章的方程组上。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应本章的两条主线。每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。悬停看上下游。">
        <h3>背景线：视界问题 → 慢滚标量场</h3>
        <EqMap edges={EQMAP_BG} labels={EQMAP_LABELS} />
        <h3>扰动线：谐振子量子化 → 原初功率谱 → 初始条件</h3>
        <EqMap edges={EQMAP_PERT} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro70 />
      <Sec71 />
      <Sec72 />
      <Sec73 />
      <Sec74 />
      <Sec75 />
      <Sec76 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 8 章：结构增长——线性理论">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="horizon" /> · <C id="hubble_radius" /> · <C id="slow_roll" /> · <C id="vacuum" /> · <C id="freeze" /> · <C id="curv_R" /> · <C id="adiabatic" /> · <C id="tilt" /></p>
      </Block>
      <Exercises />
    </TextbookPage>);
}
