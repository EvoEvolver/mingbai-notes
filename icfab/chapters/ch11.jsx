// 第 11 章（上）后道互连工艺：RC 限制与发展历程（Plummer & Griffin, IC Fabrication, PDF pp. 520–545，§11.1–11.3）——主文件
// 高层理解层在 _ch11_overview.jsx；符号词典在 _ch11_notation.jsx；正文 _ch11_s1 / s2 / s3a / s3b；
// 交互图 _ch11_plots.jsx（数值模型 _ch11_phys.jsx）；自绘示意图 _ch11_figs.jsx；三维互连堆栈 _ch11_stack3d.jsx。
import { TextbookPage, Block, Hook, Roadmap, EqMap, ConceptGrid, Takeaways, Quiz, Bridge, C } from "@kit";
import { NOTATION } from "./_ch11_notation.jsx";
import { HOOK_TITLE, HOOK, ROADMAP, EQMAP, EQMAP_LABELS, groups as G, concepts as CS, relations as RL, TAKEAWAYS, QUIZ, BRIDGE } from "./_ch11_overview.jsx";
import { Sec111 } from "./_ch11_s1.jsx";
import { Sec112 } from "./_ch11_s2.jsx";
import { Sec113 } from "./_ch11_s3a.jsx";

const R = String.raw;

export const meta = {
  id: "ch11", no: 11, title_en: "Back-End (Interconnect) Processing Technologies (I): RC Limits and Historical Development", title_zh: "后道互连工艺（上）：RC 限制与发展历程", pages: "520–545（第 11 章上，§11.1–11.3）",
  one_liner: R`导线延迟 $\tau\propto\rho K L^2$——后道半个世纪的创新（多层布线、阻挡层、W 塞与 CMP、Al→Cu、SiO$_2$→低 K）都是在与这个式子较劲。`,
  big_question: R`为什么晶体管越做越快，芯片速度却越来越受导线限制？为了让导线"更快"，后道的材料和结构经历了哪些更替，每一次更替解决了什么、又带来了什么新问题？`,
  why_it_matters: R`今天一颗芯片的后道多达 15 层，其工艺复杂度与前道晶体管相当，并与之共同决定性能、功耗与可靠性。本章（上）建立的 RC 模型和"问题—对策"历史，是理解第 11 章（下）中接触、硅化物、Cu 电镀、电迁移与新互连材料的基础。`,
  overview: R`本页是第 11 章的上半部分。§11.1 介绍后道的立体结构与互连层级；§11.2 用平行板电容加电阻的极简模型推出 RC 时间常数 \eqref{11.5}，讨论缩放、全局连线与中继器；§11.3 沿四条历史主线展开：接触结构（Al 尖刺与阻挡层）、平坦化（W 塞、回刻、SOG、CMP、大马士革）、Al 到 Cu（小丘、电迁移、双大马士革）、低 K 介质（Clausius–Mossotti、多孔与空气隙）。§11.4 起的关键工艺物理见第 11 章（下）。`,
  objectives: [
    R`由 \eqref{11.1}、\eqref{11.2} 推出 \eqref{11.5}，能用它估算任意导线的 $R$、$C$、$\tau$ 与 $2.2\tau$ 延迟，并解释 $L^2$ 依赖与理想缩放下 $\tau$ 不变的含义`,
    R`解一阶 RC 电路 \eqref{11.3}–\eqref{11.4}，说明 10%→90% 上升时间为 $\tau\ln9$；推导中继器的最优段数与 $\propto L$ 的延迟`,
    R`解释 Al 尖刺的成因与 Al(Si)、阻挡层（被动/填塞/牺牲）、Ti/TiN 双层的取舍`,
    R`用 DOP \eqref{11.6} 描述平坦化，比较回刻、SOG 与 CMP，说明大马士革与双大马士革流程`,
    R`说明小丘、空洞与电迁移的机理及对策，解释 Cu 取代 Al 的收益与代价`,
    R`由 Clausius–Mossotti \eqref{11.8} 说明降低 $K$ 的两条途径，估算孔隙率与吸水对 $K$ 的影响`,
  ],
  prereq: [
    { ch: "ch02", what: "第 2 章：CMOS 后道流程（W 塞、Cu 双大马士革）的概览" },
    { ch: "ch05", what: "第 5 章：焦深与分辨率（平坦化为何必要）" },
    { ch: "ch09", what: "第 9 章：CMP 与平坦化度 DOP（式 9.21）" },
    { ch: "ch10", what: "第 10 章：薄膜沉积与台阶覆盖" },
  ],
};

export const notation = NOTATION;
export const groups = G, concepts = CS, relations = RL;

export default function Chapter() {
  return (
    <TextbookPage meta={meta} notation={notation} groups={groups} concepts={concepts} relations={relations}>
      <Block id="hook" toc="开场"><Hook title={HOOK_TITLE}>{HOOK}</Hook></Block>
      <Block id="roadmap" toc="路线图" kicker="路线图" title="本章路线图" lead="一条物理主线（RC 延迟）加四条历史主线。点击标题跳到该节；点击公式可放大并逐符号解读。">
        <Roadmap steps={ROADMAP} />
      </Block>
      <Block id="eqmap" toc="推导路线" kicker="推导路线" title="关键方程如何推出" lead="本章（上）的 8 个编号公式：电阻与两块平行板电容合成 RC 时间常数；Clausius–Mossotti 从微观给出 K。平坦化度 (11.6) 是独立的工艺指标。">
        <EqMap edges={EQMAP} labels={EQMAP_LABELS} />
      </Block>
      <Block id="concepts" toc="核心概念" kicker="核心概念" title="核心概念" lead="十一张卡串起本章：先读一句话版本，点开看深入解释、类比、书中例子与常见误解。">
        <ConceptGrid />
      </Block>
      <Sec111 />
      <Sec112 />
      <Sec113 />
      <Block id="end" toc="小结" kicker="小结" title="带走这几条">
        <Takeaways items={TAKEAWAYS} />
        <h3 style={{ marginTop: "1.5em" }}>概念自测</h3>
        <Quiz questions={QUIZ} />
        <Bridge title="→ 第 11 章（下）：关键工艺、未来结构与三维集成">{BRIDGE}</Bridge>
        <p className="muted" style={{ marginTop: "1em" }}>相关概念：<C id="rc" /> · <C id="l2" /> · <C id="barrier" /> · <C id="damascene" /> · <C id="em" /> · <C id="lowk" /></p>
      </Block>
    </TextbookPage>);
}
