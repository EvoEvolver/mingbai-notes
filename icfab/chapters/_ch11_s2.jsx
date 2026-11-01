// §11.2 互连速度限制：降低 R 与 C —— 式 (11.1)–(11.5)，图 11.3–11.6，原书例题
import { Sec, Tx, Eq, Box, Figure, Derivation, Details, C } from "@kit";
import { Fig113, Fig114, Fig116 } from "./_ch11_figs.jsx";
import { RCCalculator, Fig115Plot, NodePlot, StepPlot, RepeaterPlot } from "./_ch11_plots.jsx";

const R = String.raw;

export function Sec112() {
  return (
    <Sec n="11.2" title="Interconnect Speed Limitations: the Need For Low R & C" zh="互连速度的限制：为什么要低 R、低 C"
      gist={R`把导线看成平行板电容加电阻，RC 时间常数 $\tau=\rho L^2K_{\rm D}\varepsilon_0\left(\frac{1}{Hx_{\rm D}}+\frac{1}{WL_{\rm S}}\right)$：延迟正比于 $\rho$、$K_{\rm D}$ 与 $L^2$，所以最长的全局连线最要命。`}
      why={R`后道半个世纪的材料与工艺创新（更多金属层、Al→Cu、SiO$_2$→低 K）都指向同一个目标；只有先把"延迟由什么决定"算清楚，才能理解每一次材料更替的动机与收益。`}
      gives={["11.1", "11.2", "11.3", "11.4", "11.5"]}>
      <p className="muted">本节概念：<C id="rc" /> · <C id="l2" /> · <C id="repeater" /></p>
      <Tx>{R`**问题。**过去 50 年后道的创新，归结起来只为三件事：

1. **增加互连层数**——晶体管越来越多，布线需要更多"楼层"；
2. **降低导线电阻 $R$**；
3. **降低导线之间的寄生电容 $C$**。

后两件事的驱动力都是"速度"：信号沿导线传播要花时间，而这个时间由 $R$ 与 $C$ 的乘积决定。本节用一个刻意简化的模型把这件事说清楚。模型会丢掉很多细节（边缘场、分布参数、真实布局），但不会改变结论。`}</Tx>

      <Tx>{R`**模型。**考虑\figref{11.3}：两条平行的金属线，宽 $W$、高 $H$、长 $L$，相距 $L_{\rm S}$，坐在厚度 $x_{\rm D}$ 的介质上，介质下面是硅衬底；介质也填满两线之间和上方的空间。`}</Tx>
      <Figure n="11.3" caption={R`用于 RC 分析的简单互连结构：两条尺寸为 $W$、$H$、$L$ 的导线坐在介质（如 SiO$_2$）上，导线之间与上方也是介质（虚线框）。图中标出了导线电阻 $R$、对衬底电容 $C_{\rm S}$ 与线间耦合电容 $C_{\rm I}$。据原书图 11.3（after [11.3]）重绘。`} illustration={<Fig113 />} />
      <Tx>{R`**电阻。**一根导线就是一段均匀导体，电阻等于电阻率乘以长度、除以截面积：`}</Tx>
      <Eq n="11.1" keyEq title="导线电阻" say="导线电阻与长度成正比、与截面积 $WH$ 成反比：线越长越细，电阻越大；电阻率 $\rho$ 是唯一要靠换材料来改的因子。">{R`R = \rho\,\frac{L}{WH}`}</Eq>
      <Tx>{R`**电容。**把每一对相对的导体面都当作平行板电容（暂时忽略边缘场 fringing field）。导线底面与衬底之间隔着 $x_{\rm D}$ 的介质，面积 $WL$；导线侧壁与邻线之间隔着 $L_{\rm S}$，面积 $HL$。于是`}</Tx>
      <Eq n="11.2" keyEq title="导线电容" say="导线电容由两块平行板电容组成：底面对衬底的 $C_{\rm S}$（面积 $WL$、间距 $x_{\rm D}$）与侧壁对邻线的耦合电容 $C_{\rm I}$（面积 $HL$、间距 $L_{\rm S}$）；两项都正比于介质的介电常数。">{R`C = K_{\rm D}\varepsilon_0\,\frac{WL}{x_{\rm D}} + K_{\rm D}\varepsilon_0\,\frac{HL}{L_{\rm S}}`}</Eq>
      <Tx>{R`第一项是对衬底电容 $C_{\rm S}$，第二项是线间耦合电容 $C_{\rm I}$；$K_{\rm D}$ 是介质的介电常数，$\varepsilon_0$ 是真空介电常数。这里已经假定导线四周都被同一种介质包围。注意两个"尺寸缩小"的后果方向相反：导线越窄，$C_{\rm S}$ 越小；但线越密（$L_{\rm S}$ 小）、导线越高（$H$ 大），$C_{\rm I}$ 越大。在先进节点里，$C_{\rm I}$ 往往占大头——下面的计算器可以直接看到这一点。`}</Tx>

      <Tx>{R`**电路模型。**信号沿导线传播需要多久，取决于用什么等效电路，而这又取决于导线长短。先看**很短**的导线：$R_{\rm Wire}\ll R_{\rm Driver}$，电阻主要来自驱动它的 CMOS 门（\figref{11.4}），而分布在导线上的电容可以集总成一个 $C_{\rm Wire}$。`}</Tx>
      <Figure n="11.4" caption={R`极短导线（$R_{\rm Wire}\ll R_{\rm Driver}$）的等效电路：驱动门的输出电阻 $R_{\rm Driver}$ 给集总的导线电容 $C_{\rm Wire}$ 充电。据原书图 11.4 重绘。`} illustration={<Fig114 />} />
      <Tx>{R`对输出节点用基尔霍夫电流定律：流进电容的电流 $C_{\rm Wire}\,dV_{\rm out}/dt$ 等于经电阻流入的电流 $(V_{\rm in}-V_{\rm out})/R_{\rm Driver}$，即`}</Tx>
      <Eq n="11.3" keyEq title="RC 充电方程" say="电容上电压的变化率由电阻上的压降决定：输出离输入越远，充电电流越大；这是一阶线性微分方程。">{R`C_{\rm Wire}\,\frac{dV_{\rm out}}{dt} + \frac{V_{\rm out}-V_{\rm in}}{R_{\rm Driver}} = 0`}</Eq>
      <Tx>{R`对 $t=0$ 时刻施加幅度 $V_{\rm in}$ 的阶跃、初值 $V_{\rm out}(0)=0$，解为指数趋近：`}</Tx>
      <Eq n="11.4" keyEq title="阶跃响应" say="输出电压以时间常数 $\tau$ 指数地趋近输入：每过一个 $\tau$，剩余差距缩小到 $1/e$。">{R`V_{\rm out}(t) = V_{\rm in}\left(1-e^{-t/\tau}\right)`}</Eq>
      <Derivation collapsed title={R`由 (11.3) 解出 (11.4)，并说明 $2.2\tau$ 从何而来`} steps={[
        { tex: R`\frac{dV_{\rm out}}{dt} = -\frac{V_{\rm out}-V_{\rm in}}{R_{\rm Driver}C_{\rm Wire}}\equiv-\frac{V_{\rm out}-V_{\rm in}}{\tau}`, why: R`整理 (11.3)，并定义 $\tau=R_{\rm Driver}C_{\rm Wire}$。` },
        { tex: R`\frac{d(V_{\rm out}-V_{\rm in})}{V_{\rm out}-V_{\rm in}} = -\frac{dt}{\tau}\ \Rightarrow\ V_{\rm out}-V_{\rm in} = (0-V_{\rm in})\,e^{-t/\tau}`, why: R`$V_{\rm in}$ 在 $t>0$ 为常数，分离变量积分，代入 $V_{\rm out}(0)=0$。` },
        { tex: R`0.1 = 1-e^{-t_1/\tau}\Rightarrow t_1=\tau\ln\tfrac{10}{9};\qquad 0.9=1-e^{-t_2/\tau}\Rightarrow t_2=\tau\ln 10`, why: "分别求输出到达终值 10% 与 90% 的时刻。" },
        { tex: R`t_2-t_1 = \tau\ln 9 \approx 2.197\,\tau \approx 2.2\,\tau`, why: R`10%→90% 上升时间，原书记作 $t_{\rm D}=2.2\tau$。` },
      ]} result={R`$V_{\rm out}(t)=V_{\rm in}(1-e^{-t/\tau}),\quad t_{\rm D}=\tau\ln9\approx2.2\tau$`} />
      <StepPlot />
      <Tx>{R`拖动上图的滑块：$R_{\rm Driver}$ 或 $C_{\rm Wire}$ 加倍，曲线沿时间轴整体拉长一倍——速度只取决于乘积 $\tau$。

**长导线。**当 $R_{\rm Wire}\gg R_{\rm Driver}$ 时，最简单的做法是把图 11.4 中的 $R_{\rm Driver}$ 换成 $R_{\rm Wire}$，响应形式不变。严格说，长线应当看成**分布 RC 网络**（distributed RC line）；商用 EDA 工具（Cadence、Synopsys、Silvaco 等）会从版图中提取真实的 $R$、$C$，再交给 SPICE 类电路仿真器。这些精细模型会修正数值，却不改变结论：后道必须把 $R$ 和 $C$ 做小。把 (11.1) 与 (11.2) 相乘：`}</Tx>
      <Eq n="11.5" keyEq title="互连 RC 时间常数" say="导线延迟正比于电阻率 $\rho$、介电常数 $K_{\rm D}$，并且正比于长度的平方——因为 $R$ 和 $C$ 各自都正比于 $L$。">{R`\tau = R_{\rm Wire}C_{\rm Wire} = \rho L^2 K_{\rm D}\varepsilon_0\left(\frac{1}{Hx_{\rm D}}+\frac{1}{WL_{\rm S}}\right)`}</Eq>
      <Tx>{R`这个式子就是本章的"指南针"。它直接告诉我们三件事：

◆ 延迟 $\propto\rho$：要用电阻率更低的金属（Al → Cu，§11.3.3）；

◆ 延迟 $\propto K_{\rm D}$：要用介电常数更低的介质（SiO$_2$ → 低 K，§11.3.4）；

◆ 延迟 $\propto L^2$：$R$ 与 $C$ 都随长度线性增长，乘积就是平方。所以电路里**最长的线**——全局互连——决定了速度上限。`}</Tx>
      <Box kind="example" title="原书例题：1 cm 长的 Al 全局连线">
        <Tx>{R`**题目。**按 \eqref{11.5} 计算互连延迟 $t_{\rm D}=2.2\tau$：Al 导线 $\rho=3.0\times10^{-6}\,\Omega\cdot$cm，SiO$_2$ 介质 $K_{\rm D}=3.9$，$L=1$ cm（全局连线），$H=W=L_{\rm S}=0.1\,\mu$m，$x_{\rm D}=1\,\mu$m。

**解。**统一用 cm：$H=W=L_{\rm S}=10^{-5}$ cm，$x_{\rm D}=10^{-4}$ cm。括号里两项分别是 $1/(Hx_{\rm D})=10^{9}\,\mathrm{cm^{-2}}$ 与 $1/(WL_{\rm S})=10^{10}\,\mathrm{cm^{-2}}$——线间耦合项大了 10 倍。于是
$$t_{\rm D}=2.2\,(3\times10^{-6}\,\Omega\,\mathrm{cm})(1\,\mathrm{cm})^2(3.9)(8.86\times10^{-14}\,\mathrm{F\,cm^{-1}})\left[\frac{1}{(10^{-5}\,\mathrm{cm})(10^{-4}\,\mathrm{cm})}+\frac{1}{(10^{-5}\,\mathrm{cm})(10^{-5}\,\mathrm{cm})}\right]\approx25.1\,\mathrm{ns}.$$
（量纲：$\Omega\,\mathrm{cm}\cdot\mathrm{cm^2}\cdot\mathrm{F\,cm^{-1}}\cdot\mathrm{cm^{-2}}=\Omega\,\mathrm F=\mathrm s$。）

**解读。**GHz 时钟的周期约 1 ns，这根线的延迟却是时钟周期的 25 倍——现代芯片根本不能这样连长线。下面的计算器点"载入原书例题"即可复现 25.1 ns，然后试着把 Al 换成 Cu、把 SiO$_2$ 换成低 K，或把截面加粗，看各能挽回多少。`}</Tx>
      </Box>
      <RCCalculator />
      <Box kind="note" title="计算器里多出来的一项：细线中的 Cu 尺寸效应">{R`原书在 §11.4（本章下篇）才讨论：当导线宽度与 Cu 中电子的平均自由程（约 39 nm）可比时，导线表面与晶界的散射使电阻率显著高于体值；而阻挡层（几 nm 的 TaN/Ta，电阻率高得多）不随导线缩小，占去的截面比例越来越大。计算器中"Cu + 尺寸效应 + 阻挡层"一项用常见的简化近似 $\rho/\rho_0\approx1+\tfrac38\lambda\left(\tfrac1W+\tfrac1H\right)+\tfrac32\tfrac{R_{\rm g}}{1-R_{\rm g}}\tfrac{\lambda}{d}$（取表面全漫反射、晶界反射系数 $R_{\rm g}=0.3$、晶粒尺寸 $d$ 等于导线最小尺寸）给出量级，仅作示意。`}</Box>

      <Tx>{R`**缩放会怎样？**第 1 章讲过"理想"（Dennard）缩放：每一代所有横向、纵向尺寸都缩小同一因子 $\sym{ch11-kscale}{k}$（那时典型 $\sym{ch11-kscale}{k}\approx1.4$，器件密度提高 $\sym{ch11-kscale}{k}^2\approx2$ 倍）。把 $L,H,W,L_{\rm S},x_{\rm D}$ 都除以 $\sym{ch11-kscale}{k}$ 代入 \eqref{11.5}：分子 $L^2$ 缩小 $\sym{ch11-kscale}{k}^2$，分母 $Hx_{\rm D}$、$WL_{\rm S}$ 也各缩小 $\sym{ch11-kscale}{k}^2$，$\tau$ **不变**。看起来连线延迟随缩放保持恒定，并不恶化。但这里有两个陷阱：

1. 晶体管本身随缩放变快了。即使导线延迟不变，它在整个电路延迟里的**占比**也在上升。

2. 理想缩放只针对单个晶体管，忽略了**芯片面积随时间增大**。最坏情形的全局连线要从芯片一边连到另一边，它的 $L$ 不但不缩小，反而变长。所以对最长的那些线，\eqref{11.5} 里的 $L$ 并不缩放，连线延迟的份额随每一代上升。这也说明芯片的架构与布局设计非常关键：尽量少用长距离连线本身就是提速手段。`}</Tx>
      <Tx>{R`20 世纪 80 年代的一项早期研究（原书文献 [11.3]）用类似\figref{11.3} 的简单模型，对比了特征尺寸从 1 $\mu$m 到 0.25 $\mu$m 的三代工艺，结果如\figref{11.5}。虚线是栅延迟（晶体管速度），每代缩小约 $1/\sym{ch11-kscale}{k}$；斜线是各种导线材料的最坏情形互连延迟，横轴是芯片面积。分析中最长连线 $L\propto\sqrt A$，于是 $L^2\propto A$——这就是双对数图上斜率为 1 的原因。`}</Tx>
      <Figure n="11.5" caption={R`全局互连延迟与栅延迟随芯片面积、最小特征尺寸 $F_{\min}$ 的变化（原书图 11.5，after [11.3]）。斜线：各材料最长全局连线的延迟 $\tau_{\rm L}$；水平虚线：栅延迟 $\tau_{\rm g}$。"交互版"在浏览器中按 \eqref{11.5} 实时计算（取 $W=H=L_{\rm S}=F_{\min}$、$x_{\rm D}=1\,\mu$m、$L=\sqrt A$；栅延迟取原图三条虚线的读数并按 $F^{1.25}$ 插值），可连续调 $F_{\min}$ 与 $K_{\rm D}$。`} interactive={<Fig115Plot />} />
      <Tx>{R`**与原图对照。**交互版在 $F_{\min}=1,\,0.5,\,0.25\,\mu$m 时，Al 线在 $A=1\,\mathrm{mm^2}$ 处的延迟分别为 $2.1\times10^{-12}$、$6.2\times10^{-12}$、$2.1\times10^{-11}$ s，原图约为 $1\times10^{-12}$、$3\times10^{-12}$、$1\times10^{-11}$ s：绝对值约高 2 倍（原文献的几何与边缘场细节未在书中给出），但**斜率、材料之间的比值（等于电阻率之比）以及每代约 3 倍的增长**都与原图一致。之所以每代是 3 倍而不是 4 倍，是因为 $x_{\rm D}$ 固定为 1 $\mu$m 不随 $F$ 缩小：$\left(\frac{1}{Hx_{\rm D}}+\frac{1}{WL_{\rm S}}\right)$ 中第一项只增大 2 倍、第二项增大 4 倍。

图中三条结论在今天仍然成立：其一，Cu 的电阻率更低，延迟更小，正如 \eqref{11.5} 所示；其二，用多晶硅、甚至 WSi$_2$ 或 W 做全局连线是糟糕的设计；其三，即使在这些 30 年前的工艺里，只要芯片面积稍大，**互连延迟就已压倒栅延迟**。`}</Tx>
      <Tx>{R`下图把视角从"芯片面积"换成"工艺节点"，并把 $F$ 一直推到 10 nm（这是对原书分析的延伸，栅延迟由原图读数外推，只看趋势）。如果全局连线也跟着按 $F$ 缩小，它的延迟随节点**平方式恶化**；把全局层"冻结"在粗线（绿色点划线），延迟就与节点无关——这正是\figref{11.2} 中"越往上越粗"的层级设计的道理。`}</Tx>
      <NodePlot />

      <Tx>{R`**对策。**30 年前的这些简单估算就已表明：高性能电路必须认真对待后道。缓解办法逐渐演化出几类：

◆ **材料**：降低 $R$ 与 $C$，这是本章其余部分的主题。

◆ **层级结构**：下层用细而电阻较高的线，只走短程；上层用宽而厚得多的线走全局，从而降低长线的 $R$。上层的介质也更厚——这有助于降低的是 $C$（见下方勘误）。

◆ **布局**：需要频繁通信的模块在芯片上放得近一些，直接缩短 $L$。

◆ **中继器**（repeater）：见下。

◆ 光互连、自由空间广播等仍在研究，短期内不太可能进入片上互连。`}</Tx>
      <Box kind="warning" title="勘误：上层介质加厚降低的是 C，不是 R">{R`原书（p. 526 首行）写道：图 11.2 中上层金属的介质层更厚，"这有助于降低 R"。由 \eqref{11.1}，导线电阻 $R=\rho L/(WH)$ 与周围介质的厚度无关；介质加厚增大的是 \eqref{11.2} 中的 $x_{\rm D}$（以及层间距离），降低的是对下层导体的电容 $C$。上层导线**本身**加宽加厚才降低 $R$。正文据此改为"降低 $C$"。`}</Box>
      <Tx>{R`**中继器为什么有效。**延迟 $\propto L^2$ 是"惩罚"，也是机会。把一根长线切成 3 段，每段之间插入一个中继器（放大器），如\figref{11.6}。每段的长度是原来的 1/3，$R$ 与 $C$ 各变为 1/3，于是每段的 RC 延迟是原来的 $1/9$；三段串起来，导线部分的总延迟只有原来的 $3\times\frac19=\frac13$。代价是每个中继器自己的延迟。`}</Tx>
      <Figure n="11.6" caption={R`把长导线分成若干段（此处 3 段），段间插入中继器（放大器）。每段为 $R_{\rm Wire}/3$ 与 $C_{\rm Wire}/3$，末端接负载电容 $C_{\rm L}$。据原书图 11.6 重绘。`} illustration={<Fig116 />} />
      <Derivation title={R`补充推导：最优中继器数目，延迟由 $\propto L^2$ 变为 $\propto L$`} steps={[
        { tex: R`t(n) = n\cdot\frac{t_{\rm D}}{n^2} + n\,\tau_{\rm rep} = \frac{t_{\rm D}}{n}+n\,\tau_{\rm rep}`, why: R`分成 $n$ 段：每段导线延迟为整线 $t_{\rm D}$ 的 $1/n^2$，共 $n$ 段；每段配一个固有延迟为 $\tau_{\rm rep}$ 的中继器（忽略中继器驱动电阻与负载的细节）。` },
        { tex: R`\frac{dt}{dn} = -\frac{t_{\rm D}}{n^2}+\tau_{\rm rep}=0\ \Rightarrow\ n^*=\sqrt{t_{\rm D}/\tau_{\rm rep}}`, why: "对 n 求极小。" },
        { tex: R`t(n^*) = 2\sqrt{t_{\rm D}\,\tau_{\rm rep}}\ \propto\ \sqrt{L^2}=L`, why: R`因为 $t_{\rm D}\propto L^2$。` },
      ]} result={R`$t_{\min}=2\sqrt{t_{\rm D}\tau_{\rm rep}}\propto L$`} />
      <RepeaterPlot />
      <Tx>{R`上图中导线取 Cu、$W=H=L_{\rm S}=0.2\,\mu$m、$x_{\rm D}=0.5\,\mu$m。短线（竖线左侧，$t_{\rm D}<\tau_{\rm rep}$）不值得插中继器；长线插入最优数目的中继器后，延迟由抛物线（斜率 2）变为直线（斜率 1）。这正是原书所说"线延迟可以做到正比于 $L$ 而非 $L^2$"。如何设计中继器的尺寸与间距有大量文献（原书 [11.4]–[11.6]），今天由复杂的 EDA 工具优化后道结构与版图。`}</Tx>
      <Details summary="小练习：换材料能抵消多少缩放带来的恶化？">
        <Tx>{R`设一根全局线长度不变，截面与间距都缩小 $\sym{ch11-kscale}{k}=1.4$ 倍（$x_{\rm D}$ 也缩小）。(a) 由 \eqref{11.5}，$\tau$ 变为原来几倍？(b) 若同时把 Al（3.0 $\mu\Omega\cdot$cm）换成 Cu（1.7），把 SiO$_2$（3.9）换成 SiCOH（2.8），$\tau$ 净变化多少？

**答：**(a) 括号内两项都放大 $\sym{ch11-kscale}{k}^2=1.96$ 倍，$\tau$ 约增为 1.96 倍。(b) 再乘 $\frac{1.7}{3.0}\times\frac{2.8}{3.9}=0.41$，净为 $0.80$ 倍——一次材料"双更替"大约抵掉一代缩放带来的恶化，这也解释了为什么 Cu 与低 K 被几乎同时引入。`}</Tx>
      </Details>
    </Sec>);
}
