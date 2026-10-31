// 第 14 章 玻色弦理论（Nakahara, Geometry, Topology and Physics, 2nd ed., PDF pp. 548–579）——主文件
// 高层理解层在 _ch14_overview.jsx；符号词典在 _ch14_notation.jsx；陈述登记表在 _ch14_stmts.js（经 book.js 合并）；
// 正文：_ch14_s1.jsx（引言 + §14.1）、_ch14_s2a.jsx（§14.2.1–14.2.2）、_ch14_s2b.jsx（§14.2.3–14.2.4）、_ch14_s3.jsx（§14.3）。
// 交互图在 _ch14_demos.jsx，数值核心在 _ch14_num.js。原书本章无章末 Problems。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C, DepGraph, StudyTable } from "@kit";
import { NOTATION } from "./_ch14_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as GR, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch14_overview.jsx";
import { Intro, Sec141 } from "./_ch14_s1.jsx";
import { Sec142 } from "./_ch14_s2a.jsx";
import { Sub1423, Sub1424 } from "./_ch14_s2b.jsx";
import { Sec143 } from "./_ch14_s3.jsx";

const R = String.raw;

export const meta = {
  id: "ch14", no: 14, title_en: "Bosonic String Theory", title_zh: "玻色弦理论", pages: "548–579",
  one_liner: R`弦的真空振幅是对所有 Riemann 面的路径积分；除掉微分同胚与 Weyl 冗余后只剩有限个模参数，$D=26$ 时反常相消，单圈振幅化为 $\int_{\mathrm{Mod}}\frac{\dd^2\tau}{\tau_2^2}\tau_2^{-12}|\eta(\tau)|^{-48}$。`,
  big_question: R`"对所有曲面求和"怎样才能变成一个有意义的、有限维的积分？剩下多少个参数——为什么是 $6g-6$？为什么时空必须是 26 维？环面的答案为什么必须在 $\tau\to\tau+1$、$\tau\to-1/\tau$ 下不变？`,
  why_it_matters: R`这是全书的终点：Riemann 面上的复几何（第 8 章）、共形 Killing 向量（第 7 章）、指标定理与热核（第 12 章）、路径积分（第 1 章）在一个具体的物理计算中汇合。Polyakov 的几何路径积分是现代弦论微扰展开的基础；模空间、Weil–Petersson 测度、$\zeta$ 正规化行列式、模形式也由此进入数学物理的主流。`,
  overview: R`本章分三步。**§14.1 Riemann 面上的微分几何**：二维度规局部共形平坦 $\mathrm{e}^{2\sigma}|\dd z|^2$，换卡全纯，Riemann 面是复流形；张量按螺旋度 $n$ 分类为 $\mathcal{T}^n$；两种协变导数 $\nabla^z_{(n)}$、$\nabla_z^{(n)}$ 互为负伴随，组成 Laplace 算子 $\Delta^\pm_{(n)}$；用热核证明 Riemann–Roch 定理 $\ind\nabla_z^{(n)}=(2n-1)(g-1)$。**§14.2 玻色弦的量子理论**：$Z_g=\int\mathcal{D}X\mathcal{D}\gamma\,\mathrm{e}^{-S}/V(\mathrm{Diff}*\mathrm{Weyl})$；度规变形正交分解为 Weyl $\oplus$ $\operatorname{im}P_1$ $\oplus$ $\ker P_1^\dagger$，共形 Killing 向量单独处理；Faddeev–Popov Jacobi 因子含鬼行列式 $\det'P_1^\dagger P_1$；Polyakov 反常要求 $D=26$；复形式下模方向是全纯二次微分，计数 $3-3g$；单值化定理与 Weil–Petersson 测度。**§14.3 单圈振幅**：环面上 $V(\mathrm{CKV})=\tau_2^2$、W-P 因子 $\tau_2^{-1}$；$\zeta$ 正规化 + Kronecker 极限公式给出 $\det'\Delta/\tau_2=\tau_2|\eta|^4$；最终 $Z_1=\int\frac{\dd^2\tau}{\tau_2^2}\tau_2^{-12}|\eta|^{-48}$，模不变。四个交互图在浏览器里真算：被积函数的模不变性（热图 + $\eta$ 变换律）、Riemann–Roch 计数、Kronecker 极限公式的三方法核对、能级匹配与质量谱。`,
  objectives: [
    R`说明为什么二维度规的共形类等价于复结构 \eqref{14.8}，用螺旋度 \eqref{14.15} 统一处理向量、形式与张量`,
    R`推导协变导数的显式形式 \eqref{14.21a} 与伴随关系 \eqref{14.23a}，并由热核短时展开证明 Riemann–Roch 定理 \eqref{14.27}`,
    R`写出度规变形的正交分解 \eqref{14.80b}，解释 Faddeev–Popov 行列式、共形 Killing 向量与模参数各自的来源，推出 \eqref{14.94}`,
    R`由 Riemann–Roch 计数 CKV 与二次微分 \eqref{14.113}，说明 $\dim\mathrm{Teich}=0,2,6g-6$ 与临界维数 $D=26$ 的来由`,
    R`在环面上算出 $V(\mathrm{CKV})$、Weil–Petersson 因子与 $\zeta$ 正规化行列式 \eqref{14.141}，得到单圈振幅 \eqref{14.142} 并证明其模不变性 \eqref{14.147}`,
  ],
  prereq: [
    { ch: "ch01", what: R`第 1 章：路径积分与 Gauss 积分，$\int\prod\dd a\,\mathrm{e}^{-\frac12\lambda a^2}\propto\lambda^{-1/2}$` },
    { ch: "ch07", what: R`第 7 章：等温坐标（例 7.9）、共形 Killing 向量（§7.7）、Laplace–Beltrami 算子、Polyakov 作用量（§7.11）` },
    { ch: "ch08", what: R`第 8 章：复流形、Hermite 联络 \eqref{8.69}、复环面与模参数 $\tau$、$\mathrm{SL}(2,\Z)$ 与基本区域（例 8.2）` },
    { ch: "ch12", what: R`第 12 章：Atiyah–Singer 指标定理与热核表示（\sref{T12.2}、\sref{T12.5}）` },
  ],
};

export const notation = NOTATION;
export const groups = GR, concepts = CS, relations = RL;

const OWN = ["F:adj14", "T14.1", "F:teich14", "X:polyakov14", "F:Zg14", "T14.2", "X:kronecker14", "F:Z114", "F:modinv14"];

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="Riemann 面的几何 → Riemann–Roch → 路径积分与规范冗余 → Faddeev–Popov 测度与 D = 26 → 复形式与模空间 → 环面上的单圈振幅。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead={R`每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着用了什么。三条主干：几何一支 \eqref{14.5} → 伴随 \eqref{14.23a} → 热核 \eqref{14.29a} → Riemann–Roch \eqref{14.27}；测度一支 \eqref{14.39} → 正交分解 \eqref{14.80b} → $g$ 圈振幅 \eqref{14.94}/\eqref{14.117}（$D=26$）；单圈一支 Eisenstein 级数 \eqref{14.135} + Kronecker \eqref{14.136} → $\det'\Delta/\tau_2$ \eqref{14.141} → $Z_1$ \eqref{14.142}。`}>
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="deps" toc="定理依赖" kicker="定理依赖" title="陈述的依赖关系" lead="上：依赖图（被依赖者在上；悬停看上下游，点击看陈述）。下：本章陈述一览，含每条的作用与核对状态（✚ 表示原书略写、本站已补全）。">
        <DepGraph ids={[...OWN, "T12.2", "T12.5", "X:max-principle", "D8.1"]} highlight="ch14" />
        <StudyTable ids={OWN} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十五张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec141 />
      <Sec142>
        <Sub1423 />
        <Sub1424 />
      </Sec142>
      <Sec143 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="全书回望：弦论用到了哪些工具">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="riemann_roch" /> · <C id="fp_measure" /> · <C id="weyl_anomaly" /> · <C id="moduli" /> · <C id="modular_inv" /> · <C id="tachyon" /></p>
      </Block>
    </TextbookPage>);
}
