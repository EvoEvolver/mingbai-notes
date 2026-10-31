// 第 13 章 结构探针：引力透镜（Modern Cosmology, 2nd ed., pp. 373–400）——主文件
// 高层理解层在 _ch13_overview.jsx；符号词典在 _ch13_notation.jsx；
// 正文：_ch13_s1.jsx（引言、13.1–13.2）、_s3（13.3–13.4）、_s5（13.5–13.6），习题在 _ch13_ex.jsx；
// 交互图在 _ch13_plots.jsx，数值函数在 _ch13_phys.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch13_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_A, EQMAP_B, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch13_overview.jsx";
import { Intro, Sec131, Sec132 } from "./_ch13_s1.jsx";
import { Sec133, Sec134 } from "./_ch13_s3.jsx";
import { Sec135, Sec136 } from "./_ch13_s5.jsx";
import { Exercises } from "./_ch13_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch13", no: 13, title_en: "Probes of structure: lensing", title_zh: "结构探针：引力透镜", pages: "373–400",
  one_liner: R`光线响应的是质量本身：从"面亮度守恒"出发，偏折角是透镜势 $\phi_{\rm L}$ 的梯度；它的导数（会聚 $\kappa$、剪切 $\gamma$）扭曲星系形状，重映射抹平 CMB；剪切 E 模功率谱 $C_{EE}=(\frac32\Omega_{\rm m}H_0^2)^2\int d\chi\,a^{-2}g_{\rm L}^2P(l/\chi)$ 直接称量非线性物质功率谱。`,
  big_question: R`星系、气体都只是质量的"示踪体"，中间隔着偏袒。有没有一种观测能**直接**看到全部质量（包括暗物质）的分布？光线被引力偏折了多少、怎样把背景星系上百分之一的形变从 $\sim30\%$ 的内禀椭率噪声中提取出来，并与物质功率谱定量联系？`,
  why_it_matters: R`弱透镜是当今约束 $\sigma_8$、$\Omega_{\rm m}$ 与暗能量最有力的探针之一（DES、KiDS、HSC、Euclid、Rubin、Roman）；CMB 透镜重建出全天质量图，并贡献 CMB B 模；星系–星系透镜校准偏袒与星系团质量，使第 11–12 章的探针能真正用于宇宙学。本章的 $C_{EE}$ 与 $C_{{\rm g}E}$ 是下一章参数推断的直接输入。`,
  overview: R`\secref{13.1} 概览强透镜与弱透镜。\secref{13.2} 从无碰撞 Boltzmann 方程得面亮度守恒 \eqref{13.3}，积分光子测地线得偏折角 \eqref{13.14}、透镜势 \eqref{13.16} 与畸变张量 \eqref{13.17}。\secref{13.3} 把重映射用于 CMB：透镜后的功率谱 \eqref{13.21} 与可用于重建透镜势的非对角相关 \eqref{13.23}。\secref{13.4} 用二阶矩张量描述星系形状，引入会聚、剪切与放大 \eqref{13.28}–\eqref{13.35}，得形状变换律 \eqref{13.36} 与 $\epsilon=\epsilon^{\rm true}+2\gamma$ \eqref{13.40}。\secref{13.5} 推出剪切 E 模功率谱 \eqref{13.51}、实空间相关函数 $\xi_\pm$ \eqref{13.58} 与星系–剪切交叉相关 \eqref{13.61}–\eqref{13.62}。`,
  objectives: [
    R`从 $df/dt=0$ 推出 $I_\nu=4\pi\nu^3f$ 与面亮度守恒 \eqref{13.3}，理解透镜是一张坐标重映射`,
    R`积分测地线方程，推导偏折角 \eqref{13.14}、透镜势 \eqref{13.16} 与畸变张量 \eqref{13.17}；解释因子 2 与权重 $1-\chi'/\chi$`,
    R`推导透镜后的 CMB 功率谱 \eqref{13.21} 与非对角相关 \eqref{13.23}，理解二次估计量的原理`,
    R`掌握 $\kappa$、$\gamma_{1,2}$、$\mu$ 的定义与几何意义，推导形状变换律 \eqref{13.36}–\eqref{13.40}`,
    R`证明标量透镜只有 E 模且 $E=\kappa$，用 Limber 近似与 Poisson 方程推出 $C_{EE}$ \eqref{13.51} 与透镜核 \eqref{13.49}`,
    R`推导 $\xi_\pm$ \eqref{13.58} 与星系–星系透镜 \eqref{13.61}–\eqref{13.62}，理解它们在破除偏袒简并与星系团质量校准中的作用`,
  ],
  prereq: [
    { ch: "ch03", what: R`第 3 章：光子测地线方程 \eqref{3.34}、\eqref{3.72}` },
    { ch: "ch08", what: R`第 8 章：Poisson 方程 \eqref{8.5}–\eqref{8.6}、线性物质功率谱与增长因子` },
    { ch: "ch10", what: R`第 10 章：偏振张量与 E/B 分解 \eqref{10.2}、\eqref{10.6}、\eqref{10.11}（\secref{10.1}）` },
    { ch: "ch11", what: R`第 11 章：投影角相关与 Limber 近似 \eqref{11.39}、\eqref{11.47}；线性偏袒` },
    { ch: "ch12", what: R`第 12 章：非线性物质功率谱、微扰论 \eqref{12.40}–\eqref{12.48}` },
    { ch: "ch09", what: R`第 9 章：CMB 温度功率谱与阻尼尺度` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="先算出光线被偏折多少（13.2），再把这张重映射分别用于 CMB（13.3）与星系形状（13.4），最后做统计（13.5）。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应本章两条主线。每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。">
        <h3>几何线：面亮度守恒 → 偏折角 → 透镜势 → CMB 重映射 / 形状变换</h3>
        <EqMap edges={EQMAP_A} labels={EQMAP_LABELS} />
        <h3>统计线：畸变张量 → E 模 → Limber → 功率谱、相关函数与交叉相关</h3>
        <EqMap edges={EQMAP_B} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十二张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec131 />
      <Sec132 />
      <Sec133 />
      <Sec134 />
      <Sec135 />
      <Sec136 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 14 章：分析与推断">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="sb" /> · <C id="deflection" /> · <C id="shear" /> · <C id="eb" /> · <C id="cee" /> · <C id="ggl" /></p>
      </Block>
      <Exercises />
    </TextbookPage>);
}
