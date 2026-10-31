// 第 9 章 宇宙微波背景（Modern Cosmology, 2nd ed., pp. 231–270）——主文件
// 高层理解层在 _ch09_overview.jsx；符号词典在 _ch09_notation.jsx；
// 各节正文：_ch09_s1.jsx（引言、9.1）、_s2（9.2–9.3）、_s4（9.4）、_s5（9.5）、_s6（9.6–9.8），习题在 _ch09_ex.jsx；
// 交互图在 _ch09_plots.jsx，数值函数（简化 Boltzmann 求解器、复合、C(l) 近似投影）在 _ch09_phys.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch09_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_A, EQMAP_B, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch09_overview.jsx";
import { Intro, Sec91 } from "./_ch09_s1.jsx";
import { Sec92, Sec93 } from "./_ch09_s2.jsx";
import { Sec94 } from "./_ch09_s4.jsx";
import { Sec95 } from "./_ch09_s5.jsx";
import { Sec96, Sec97, Sec98 } from "./_ch09_s6.jsx";
import { Exercises } from "./_ch09_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch09", no: 9, title_en: "The cosmic microwave background", title_zh: "宇宙微波背景", pages: "231–270",
  one_liner: R`复合前光子–重子流体做声学振荡（$\Theta_0+\Phi\propto\cos kr_s$）、被扩散阻尼（$e^{-k^2/k_D^2}$）；复合后光子自由流，把尺度 $k$ 投影到 $l\sim k\eta_0$：$\Theta_l=(\Theta_0+\Psi)j_l+3\Theta_1j_l'+\text{ISW}$，$C(l)=\frac2\pi\int dk\,k^2P_{\mathcal R}|\mathcal T_l|^2$。`,
  big_question: R`CMB 温度角功率谱 $C(l)$ 为什么在大角度上是一片高原、在 $l\approx220$ 处有一个主峰、其后是一串交替高低的小峰并在 $l\gtrsim2000$ 处衰减殆尽？每个特征量出了什么——原初振幅、声视界、重子与暗物质的密度、空间曲率？`,
  why_it_matters: R`CMB 各向异性是精确宇宙学的基石：Planck 在 $l\lesssim2000$ 已达宇宙方差极限，把 $\Omega_{\rm b}h^2$、$\Omega_{\rm c}h^2$、$\theta_s$、$n_s$ 测到百分之一乃至更好。本章的半解析理解——Sachs–Wolfe、声学振荡、Silk 阻尼、视线积分——也是下一章偏振、第 11 章 BAO 与第 13 章 CMB 透镜的共同出发点。`,
  overview: R`先偷看数值解，用受迫谐振子、随机行走与几何投影建立定性图景（\secref{9.1}）。然后分三步定量计算复合时的光子分布：大尺度视界外解给出 Sachs–Wolfe 结果 $\Theta_0+\Psi=-\mathcal R/5$（\secref{9.2}）；紧耦合极限下光子–重子是一种流体，满足受迫振子方程，解出单极 $\propto\cos(kr_s)$ 与偶极 $\propto\sin(kr_s)$（\secref{9.3}）；展开到 $1/\tau'$ 二阶得到扩散阻尼 $e^{-k^2/k_D^2}$（\secref{9.4}）。接着用视线积分把复合时的单极、偶极送到今天，并定义可观测的角功率谱 $C(l)$（\secref{9.5}）。最后组装出 $C(l)$：SW 高原、声学峰、偶极与 ISW 的作用（\secref{9.6}），以及它对宇宙学参数的依赖与简并（\secref{9.7}）。`,
  objectives: [
    R`推导大尺度结果 \eqref{9.6}、\eqref{9.9}，解释"大尺度热斑是欠密区"`,
    R`从 Boltzmann 矩层级 \eqref{9.11} 论证紧耦合下的流体近似，推导振子方程 \eqref{9.20}–\eqref{9.22} 与声速 \eqref{9.21}`,
    R`用 Green 函数解出紧耦合单极 \eqref{9.26} 与偶极 \eqref{9.28}，理解峰位 \eqref{9.27}、奇偶峰不对称与相位关系`,
    R`推导色散关系 \eqref{9.39} 与扩散阻尼尺度 \eqref{9.42}，能估算 $k_D$`,
    R`推导视线积分 \eqref{9.54}、可见度函数 \eqref{9.56} 与 \eqref{9.59}；推导 $C(l)$ 公式 \eqref{9.74} 与宇宙方差 \eqref{9.67}`,
    R`计算 SW 高原 \eqref{9.79}–\eqref{9.80}；理解偶极的不相干相加与早期 ISW 的相干相加；说明曲率、$\tau_{\rm rei}$、$\Omega_{\rm b}h^2$、$\Omega_{\rm c}h^2$ 如何改变 $C(l)$`,
  ],
  prereq: [
    { ch: "ch05", what: R`第 5 章：光子 Boltzmann 方程 \eqref{5.67}、多极矩定义 \eqref{5.66}、重子方程 \eqref{5.71}–\eqref{5.72}、光深 \eqref{5.33}` },
    { ch: "ch07", what: R`第 7 章：绝热初条件 \eqref{7.91} 与原初功率谱 \eqref{7.99}` },
    { ch: "ch08", what: R`第 8 章：视界外方程 \eqref{8.16}–\eqref{8.17}、Kodama–Sasaki 解 \eqref{8.31}–\eqref{8.32}、辐射期势的衰减` },
    { ch: "ch02", what: R`第 2 章：共形时间、角直径距离 \eqref{2.39}` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="先看答案建立图景（9.1）；复合前分三段：大尺度（9.2）、声学振荡（9.3）、扩散阻尼（9.4）；复合后：自由流与 C(l) 的定义（9.5）；组装功率谱（9.6）并讨论参数（9.7）。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应复合前、复合后两段物理。每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。">
        <h3>复合前：Boltzmann 层级 → 紧耦合振子 → 声学峰与扩散阻尼</h3>
        <EqMap edges={EQMAP_A} labels={EQMAP_LABELS} />
        <h3>复合后：视线积分 → 今天的多极矩 → 角功率谱与 SW 高原</h3>
        <EqMap edges={EQMAP_B} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec91 />
      <Sec92 />
      <Sec93 />
      <Sec94 />
      <Sec95 />
      <Sec96 />
      <Sec97 />
      <Sec98 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 10 章：偏振的 CMB">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="sw" /> · <C id="oscillator" /> · <C id="silk" /> · <C id="freestream" /> · <C id="cl" /> · <C id="params" /></p>
      </Block>
      <Exercises />
    </TextbookPage>);
}
