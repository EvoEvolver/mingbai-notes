// 第 11 章 结构探针：示踪体（Modern Cosmology, 2nd ed., pp. 295–324）——主文件
// 高层理解层在 _ch11_overview.jsx；符号词典在 _ch11_notation.jsx；
// 正文：_ch11_s1.jsx（引言、11.1、11.1.1）、_s12（11.1.2）、_s13（11.1.3）、_s2（11.2）、_s3（11.3–11.4）；习题在 _ch11_ex.jsx；
// 交互图在 _ch11_plots.jsx，数值函数在 _ch11_phys.jsx（线性功率谱沿用 _ch08_phys.jsx）。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch11_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP_3D, EQMAP_2D, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch11_overview.jsx";
import { Intro, Sec111 } from "./_ch11_s1.jsx";
import { Sec112 } from "./_ch11_s2.jsx";
import { Sec113, Sec114 } from "./_ch11_s3.jsx";
import { Exercises } from "./_ch11_ex.jsx";

const R = String.raw;

export const meta = {
  id: "ch11", no: 11, title_en: "Probes of structure: tracers", title_zh: "结构探针：示踪体", pages: "295–324",
  one_liner: R`用星系与热气体当"路标"测量看不见的物质分布：红移空间畸变给出增长率 $f\sigma_8$，BAO 与 Alcock–Paczyński 效应给出 $\chi(\bar z)$ 与 $H(\bar z)$，投影统计用 Limber 近似，SZ 效应把电子压强写进 CMB 能谱。`,
  big_question: R`我们只能看到星系的天球位置与红移，它们既不等于物质分布、红移又被本动速度污染、换算距离还得先假设宇宙学——怎样从这样的数据中干净地取出 $P_{\rm L}(k)$、结构增长率与膨胀史？没有红移时又能测什么？`,
  why_it_matters: R`星系红移巡天（BOSS、DESI、Euclid）与测光巡天（DES、Rubin）是当今约束暗能量与检验引力的主力：BAO 标准尺测距离，RSD 测增长，二者对比检验广义相对论。观测功率谱公式 \eqref{11.37} 是所有这些分析的骨架；Limber 公式则贯穿第 13 章的引力透镜；SZ 效应是寻找远处大质量星系团的利器。`,
  overview: R`本章分三步。**三维**（\secref{11.1}）：观测位置与真实位置差一个沿视线的位移 $\delta\chi+u_\parallel/aH$ \eqref{11.5}；由星系数守恒求 Jacobian 得观测过密度 \eqref{11.15}。速度部分给出 Kaiser 公式 \eqref{11.22}–\eqref{11.23}；错误宇宙学部分是零阶的坐标缩放 \eqref{11.31}，在 Fourier 空间就是波矢缩放 \eqref{11.35}，合起来得 \eqref{11.37}，BAO 让它成为测距工具。**二维**（\secref{11.2}）：投影过密度的球谐系数给出精确的 $C_{\rm g}(l)$ \eqref{11.44}，大 $l$ 下化为 Limber 公式 \eqref{11.47}。**CMB 背光**（\secref{11.3}）：Compton 碰撞项的二阶展开给出扩散方程 \eqref{11.56}，小 $y$ 解 \eqref{11.58} 是零点在 217 GHz 的谱畸变，$y$ 是视线压强积分 \eqref{11.59}。`,
  objectives: [
    R`理解观测坐标与真实坐标的两种差别 \eqref{11.5}，会用数守恒 \eqref{11.6} 推出 Jacobian 与观测过密度 \eqref{11.15}`,
    R`由连续性方程推出线性速度 \eqref{11.17}，在远距观测者近似下推出 Kaiser 公式 \eqref{11.22}–\eqref{11.23} 与其多极矩，理解为什么测得的是 $f\sigma_8$`,
    R`推出 AP 参数 \eqref{11.31} 与波矢缩放 \eqref{11.35}，理解 BAO 作为标准尺如何测量 $d_A(\bar z)$ 与 $H(\bar z)$`,
    R`推出投影角功率谱 \eqref{11.44}、Limber 近似 \eqref{11.47} 与 $w_{\rm g}(\theta)$ \eqref{11.49}，知道 Limber 近似的适用范围`,
    R`由 Compton 碰撞项推出 SZ 扩散方程 \eqref{11.56} 与 $y$ 型畸变 \eqref{11.58}，算出 SZ 零点 217 GHz，理解 $y$ 图的角功率谱 \eqref{11.62}`,
  ],
  prereq: [
    { ch: "ch08", what: R`第 8 章：线性功率谱 $P_{\rm L}(k,z)$ \eqref{8.8}、增长因子与增长率 \eqref{8.75}–\eqref{8.78}、连续性方程 \eqref{8.12}、BAO（\secref{8.6.1}）` },
    { ch: "ch05", what: R`第 5 章：Compton 碰撞项 \eqref{5.13}–\eqref{5.19}` },
    { ch: "ch02", what: R`第 2 章：共动距离 $\chi(z)$ \eqref{2.34} 与角直径距离` },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="三维（11.1：位置畸变 → RSD → AP 与 BAO）→ 二维投影（11.2：Limber）→ 以 CMB 为背光（11.3：SZ）。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="两张图对应本章两条主线。每个节点是一个编号公式（点击放大、逐符号解读），箭头上写着从上一式推到下一式用了什么。">
        <h3>三维线：位置畸变 → Jacobian → Kaiser 公式 → 加入 AP 的观测功率谱</h3>
        <EqMap edges={EQMAP_3D} labels={EQMAP_LABELS} />
        <h3>投影线：选择函数 → 精确角功率谱 → Limber → 角关联函数；Compton 碰撞项 → y 型畸变 → y 图的角功率谱</h3>
        <EqMap edges={EQMAP_2D} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十张卡串起整章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Intro />
      <Sec111 />
      <Sec112 />
      <Sec113 />
      <Sec114 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 12 章：结构增长——超越线性理论">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="kaiser" /> · <C id="fsigma8" /> · <C id="ap" /> · <C id="bao" /> · <C id="limber" /> · <C id="sz" /></p>
      </Block>
      <Exercises />
    </TextbookPage>);
}
