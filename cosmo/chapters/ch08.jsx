// 第 8 章 结构增长：线性理论（Modern Cosmology, 2nd ed., pp. 195–229）——主文件
// 高层理解层在 _ch08_overview.jsx；符号词典在 _ch08_notation.jsx；
// 各节正文在 _ch08_s1.jsx（8.1）、_s2（8.2）、_s3（8.3）、_s4（8.4–8.5）、_s6（8.6–8.7），习题在 _ch08_ex.jsx；
// 交互图在 _ch08_plots.jsx，数值函数在 _ch08_phys.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, Sec, Tx } from "@kit";
import { NOTATION } from "./_ch08_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_T, EQMAP_G, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch08_overview.jsx";
import { Sec81 } from "./_ch08_s1.jsx";
import { Sec82 } from "./_ch08_s2.jsx";
import { Sec83 } from "./_ch08_s3.jsx";
import { Sec84, Sec85 } from "./_ch08_s4.jsx";
import { Sec86, Sec87 } from "./_ch08_s6.jsx";
import { Exercises } from "./_ch08_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch08", no: 8, title_en: "Growth of structure: linear theory", title_zh: "结构增长：线性理论", pages: "195–230",
  one_liner: R`把第 5–7 章的方程解出来：暗物质扰动在视界外不变、在辐射期对数增长、在物质期 $\propto a$；由此得到转移函数 $T(k)$、增长因子 $D_+(a)$ 与线性物质功率谱 $P_{\rm L}(k)$。`,
  big_question: R`暴胀留下的十万分之一的原初扰动 $\mathcal R(\boldsymbol k)$，如何长成今天的物质分布？为什么物质功率谱在 $k_{\rm eq}\approx0.01\,\mathrm{Mpc^{-1}}$ 处转折，小尺度为什么按 $k^{-2}\ln k$ 被压低？暗能量、重子、中微子又怎样改写这幅图？`,
  why_it_matters: R`星系巡天、弱引力透镜与星系团计数测量的都是物质功率谱及其增长；本章的分解 $\delta_{\rm m}\propto\mathcal R\,T(k)D_+(a)$ 把它们与 CMB 测得的原初扰动连接起来，是第 11–13 章一切比较的出发点。辐射期势的衰减振荡、视界外势的 $9/10$ 下降也直接进入下一章的 CMB 计算。`,
  overview: R`本章只盯住暗物质。先用数值解建立"三阶段"图景，并把势分解为 $\frac35\mathcal R\,T(k)D_+(a)/a$，写出功率谱 \eqref{8.8}（\secref{8.1}）。然后取极限求解析解：**大尺度**——视界外 Kodama–Sasaki 精确解给出 $9/10$，物质期势恒定，所以 $T=1$（\secref{8.2}）；**小尺度**——辐射期势按 $j_1$ 衰减振荡，暗物质对数增长，再由 Meszaros 方程接力穿过相等（\secref{8.3}）。两段拼成小尺度转移函数 \eqref{8.71}（\secref{8.4}）。晚期的增长只依赖 $H(a)$，由 \eqref{8.75} 给出增长因子（\secref{8.5}）。最后讨论重子（BAO）、有质量中微子（自由流）与暗能量（\secref{8.6}）。`,
  objectives: [
    R`理解演化的三个阶段，掌握转移函数 \eqref{8.2} 与增长因子 \eqref{8.3} 的定义及其约定，能由 Poisson 方程推出 \eqref{8.7}–\eqref{8.8} 与 $\Delta^2_{\rm L}$`,
    R`会把第 5–6 章方程截断为五方程组 \eqref{8.10}–\eqref{8.15}，并能数值求解（\exref{8.2}）`,
    R`推导视界外 Kodama–Sasaki 解 \eqref{8.31}，解释 $\frac23\mathcal R\to\frac35\mathcal R$；证明物质期 $\Phi=$ 常数`,
    R`推导辐射期势的波动方程 \eqref{8.44} 与解 \eqref{8.46}，以及暗物质的对数增长 \eqref{8.52}`,
    R`求解 Meszaros 方程 \eqref{8.59}、做匹配 \eqref{8.65}，得到小尺度转移函数 \eqref{8.71}，理解 $k_{\rm eq}\propto\Omega_{\rm m}h^2$`,
    R`推导增长方程 \eqref{8.75} 与 $\Lambda$ 宇宙中的积分解 \eqref{8.77}；了解重子、中微子、暗能量的效应`,
  ],
  prereq: [
    { ch: "ch05", what: R`第 5 章：光子、暗物质、重子、中微子的 Boltzmann 方程 \eqref{5.67}–\eqref{5.74}` },
    { ch: "ch06", what: R`第 6 章：Einstein 方程 \eqref{6.41}、\eqref{6.48}、\eqref{6.80} 与总辐射矩的定义 \eqref{6.79}` },
    { ch: "ch07", what: R`第 7 章：绝热初条件（\secref{7.5}）与原初功率谱 \eqref{7.99}` },
    { ch: "ch02", what: R`第 2 章：$a_{\rm eq}$ \eqref{2.86}、共形时间与暗能量物态方程` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

function Intro() {
  return (
    <Sec n="8.0" title="Introduction" zh="引言：为什么先算物质"
      gist={R`方程与初条件都已齐备，现在来解。本章聚焦暗物质的 $\delta_{\rm c}$ 与 $u_{\rm c}$：它们只通过引力与其他扰动耦合，几乎不依赖辐射扰动的细节；最终目标是线性物质功率谱。`}
      why={R`反过来却不成立：要正确处理辐射的各向异性（下一章），必须先知道物质扰动如何演化。`}>
      <Tx>{R`**先物质，后光子。**建立了要解的方程组与扰动的初条件之后，现在可以计算物质的非均匀性与光子的各向异性了。本章聚焦**暗物质**的扰动：密度扰动 $\delta_{\rm c}$ 与速度 $u_{\rm c}$。它们只通过**引力**与其他所有扰动耦合。因此暗物质扰动对辐射扰动的细节依赖很小：晚期宇宙由物质主导，传递引力作用的势 $\Phi$、$\Psi$ 与辐射无关；早期占主导的辐射扰动又相对简单，单极与偶极之外的所有矩都可以忽略。我们从物质开始，是因为反过来不成立——下一章会看到，要正确处理辐射的各向异性，需要知道物质扰动的行为。

**目标：线性物质功率谱。**本章的最终目标是得到线性物质功率谱的预言。做法是求解每个 Fourier 模式的演化；有了这个解，再加上暴胀产生的初始功率谱，就能构造出作为红移函数的物质功率谱。在大尺度上，它可以与星系成团和引力透镜的观测比较（第 11、13 章）。但晚期小尺度上物质变为非线性，所以结果不能在那些尺度上直接与观测比较；不过它们是非线性结构的解析与数值计算（第 12 章）的出发点。

**数值与解析。**有几个公开程序（最流行的是 CAMB 与 CLASS）通过数值求解前几章推出的方程，在几秒内把转移函数算到亚百分之一的精度。在 \secref{8.2} 与 \secref{8.3} 中，我们发展**近似解析解**。它们为早期宇宙结构增长的物理提供额外的洞见，但跳过这两节并不妨碍阅读本书其余部分。计算的主要特征在 \secref{8.1} 中总结。本页的交互图则在浏览器里直接数值求解简化的方程组，可以随时与解析结果对照。`}</Tx>
    </Sec>);
}

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="先建立图景与方程（8.1），再分大尺度（8.2）与小尺度（8.3）求解析解，拼出转移函数（8.4）；晚期增长单独处理（8.5）；最后加入重子、中微子与暗能量（8.6）。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应本章两条主线。每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。">
        <h3>转移函数线：五方程组 → 各种极限 → 小尺度 T(k)</h3>
        <EqMap edges={EQMAP_T} labels={EQMAP_LABELS} />
        <h3>功率谱与增长因子线：Poisson 方程 → P(k)；连续性 + Euler → 增长方程</h3>
        <EqMap edges={EQMAP_G} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
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
        <Bridge title="→ 第 9 章：CMB 各向异性">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="transfer" /> · <C id="growth" /> · <C id="nine_tenths" /> · <C id="log_growth" /> · <C id="meszaros" /> · <C id="pk" /></p>
      </Block>
      <Exercises />
    </TextbookPage>);
}
