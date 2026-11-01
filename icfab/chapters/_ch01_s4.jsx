// §1.4 摩尔定律与 MOS 器件缩放（式 1.1；图 1.16、1.17；表 1.1）
import { Sec, Tx, Eq, Box, Figure, Derivation, Table, Details, C } from "@kit";
import { DennardCalc, NodePlot, ScalingPlot } from "./_ch01_plots.jsx";

const R = String.raw;

export function Sec14() {
  return (
    <Sec n="1.4" title="Moore's Law and MOS Device Scaling" zh="摩尔定律与 MOS 器件缩放"
      gist={R`芯片复杂度的增长主要来自器件变小。Dennard 的**恒定电场缩放**让尺寸、电压同缩 $1/\kappa$、掺杂增 $\kappa$ 倍：器件更快、单管功耗降 $\kappa^2$ 倍而功率密度不变。但亚阈摆幅 $S=n(kT/q)\ln10\ge60\,\mathrm{mV/dec}$ 不随尺寸缩小，电源电压因此停在约 1 V，理想缩放在 90 nm 代（约 2004 年）结束。`}
      why={R`缩放是"为什么每一代都要更薄的栅氧、更浅的结、更高的掺杂、更细的光刻"的总根源；而它的终结又解释了 2004 年之后的一切新材料、新结构。`}
      gives={["1.S2", "1.S3", "1.S4", "1.S7", "1.S8", "1.1", "1.S9", "1.S10"]}>
      <p className="muted">本节概念：<C id="moore" /> · <C id="node" /> · <C id="dennard" /> · <C id="swing" /></p>
      <Tx>{R`**复杂度从哪里来：芯片更大，器件更小。**回头看 \figref{1.1}，芯片复杂度增长有两个来源。一是**芯片面积变大**：能经济地制造多大的芯片，取决于制造缺陷——大多数电路中一个缺陷就让整块芯片报废（存储器可以设计冗余，容忍少量失效），所以缺陷密度是关键参数（第 4 章讲良率）。在 IC 历史的大部分时间里，最大芯片面积每年增长 10%–20%，反映了制造水平的进步；近年受光刻等限制，增速已不到每年 10%。二是**器件变小**——这是最重要的来源，历来用"最小特征尺寸"（晶体管结构中最小的横向尺寸）衡量。MOSFET 刚进入商品集成电路时横向尺寸大于 10 µm；今天约 10 nm，小了三个数量级。`}</Tx>
      <Tx>{R`**每代缩 0.7 倍的来历。**行业的节奏是：每一代（technology generation，或"节点" node）把单位面积的器件数翻一倍。器件面积 $\propto\lambda^2$，面积减半要求线性尺寸缩小 $1/\sqrt2$：`}</Tx>
      <Eq n="1.S2" keyEq title="一代工艺的线性缩小（补充式）" say="每一代把线性尺寸缩小到约 0.7 倍，器件面积就减半、密度翻倍；这就是 180、130、90、65、45……这串节点名的由来。">{R`\lambda_{j+1}=\frac{\lambda_j}{\sqrt2}\approx0.7\,\lambda_j\quad\Longrightarrow\quad\frac{\lambda_{j+1}^2}{\lambda_j^2}=\frac12`}</Eq>
      <Tx>{R`验证一下：$180\times0.7=126\approx130$，$130\times0.7=91\approx90$，$90\times0.7=63\approx65$，$65\times0.7=45.5\approx45$……节点名正是这样一串近似的 $0.7$ 倍数。`}</Tx>

      <Tx>{R`**Dennard 的问题：怎样缩小才能"什么都不变坏"？**1974 年 Dennard 等人的经典论文 [1.10] 第一次系统地回答了"缩放能走多远"。他们的推理很直接：要让缩小后的器件**像原来一样工作**，就应该让器件内部的**电场保持不变**。平均电场就是电压除以它降落的距离：`}</Tx>
      <Eq n="1.S3" keyEq title="平均电场（原书 §1.5 行内式）" say="平均电场等于电压除以电压降落的距离：长度缩小而电压不变，电场就成比例增大。">{R`\mathcal E=\frac{V}{L}`}</Eq>
      <Tx>{R`于是**所有尺寸**（横向的 $L$、$W$ 和纵向的 $t_{\rm ox}$、结深）缩小 $\kappa$ 倍，**电压**也缩小 $\kappa$ 倍，$\mathcal E$ 不变。耗尽层宽度 $\propto\sqrt{V/N_{\rm A}}$ 也要跟着缩小 $\kappa$ 倍，所以**掺杂浓度**必须**增大** $\kappa$ 倍（原书写作 $k$；我们用 $\kappa$ 以免与玻尔兹曼常数混淆）：`}</Tx>
      <Eq n="1.S4" keyEq title="恒定电场（Dennard）缩放规则（补充式）" say="恒定电场缩放：所有尺寸与电压同缩 $\kappa$ 倍，衬底掺杂增大 $\kappa$ 倍，于是器件内部的电场分布形状和大小都不变。">{R`L,\,W,\,t_{\rm ox}\to\frac{1}{\kappa}(L,\,W,\,t_{\rm ox}),\qquad V\to\frac{V}{\kappa},\qquad N_{\rm A}\to\kappa\,N_{\rm A}`}</Eq>
      <Tx>{R`**其余各量怎样变——逐项推出原书的缩放表。**有了 \eqref{1.S4}，图 1.16 右侧表格中的每一行都可以推出来：

**电容**：栅电容 $C=\varepsilon A/t_{\rm ox}$，面积 $A=WL$ 缩小 $\kappa^2$ 倍、$t_{\rm ox}$ 缩小 $\kappa$ 倍：`}</Tx>
      <Eq n="1.S5" say="栅电容等于介电常数乘面积除以介质厚度；面积缩 $\kappa^2$ 倍、厚度缩 $\kappa$ 倍，电容净缩 $\kappa$ 倍。">{R`C=\frac{\varepsilon A}{t_{\rm ox}}=\frac{\varepsilon WL}{t_{\rm ox}}\ \longrightarrow\ \frac{(1/\kappa^2)}{(1/\kappa)}\,C=\frac{C}{\kappa}`}</Eq>
      <Tx>{R`**电流**：原书只说"电流也缩小 $\kappa$ 倍"。用长沟道 MOSFET 的饱和电流公式（标准器件教材 [1.8]）可以验证：`}</Tx>
      <Eq n="1.S6" say="长沟道 MOSFET 的饱和电流：与迁移率、单位面积栅电容、宽长比成正比，与过驱动电压的平方成正比；按 Dennard 缩放后电流缩小 $\kappa$ 倍。">{R`I_{\rm DS}=\frac{\mu C_{\rm ox}}{2}\,\frac{W}{L}\,\left(V_{\rm GS}-V_{\rm TH}\right)^2\ \longrightarrow\ \underbrace{\kappa}_{C_{\rm ox}=\varepsilon/t_{\rm ox}}\cdot\underbrace{1}_{W/L}\cdot\underbrace{\frac{1}{\kappa^2}}_{V^2}=\frac{1}{\kappa}`}</Eq>
      <Tx>{R`（迁移率 $\mu$ 在电场不变时近似不变。）**延迟**：门延迟是用电流 $I$ 把电容 $C$ 充到电压 $V$ 的时间：`}</Tx>
      <Eq n="1.S7" keyEq title="门延迟（补充式）" say="门延迟等于电容乘电压除以电流，即把负载电容充电到电源电压所需的时间；恒定电场缩放下它缩小 $\kappa$ 倍——电路变快。">{R`\tau=\frac{CV}{I}\ \longrightarrow\ \frac{(1/\kappa)(1/\kappa)}{(1/\kappa)}\,\tau=\frac{\tau}{\kappa}`}</Eq>
      <Tx>{R`**功耗与功率密度**：单管功耗 $P=VI$ 缩小 $\kappa^2$ 倍；而单管占的面积 $WL$ 也缩小 $\kappa^2$ 倍：`}</Tx>
      <Eq n="1.S8" keyEq title="功耗与功率密度（补充式）" say="单管功耗缩小 $\kappa^2$ 倍，单管面积也缩小 $\kappa^2$ 倍，所以单位面积的功耗保持不变——同样大的芯片能放 $\kappa^2$ 倍的晶体管而总功耗不变。">{R`P=VI\ \longrightarrow\ \frac{P}{\kappa^2},\qquad \frac{P}{WL}\ \longrightarrow\ \frac{P/\kappa^2}{WL/\kappa^2}=\frac{P}{WL}`}</Eq>
      <Tx>{R`**结论：一份"完美的买卖"。**取 $\kappa=2$：晶体管更小、更快（延迟减半）、更省电（单管功耗降为 1/4）；同样面积的芯片能放下 4 倍的晶体管，而总功耗**与旧芯片一样**。这个组合几十年里一直奏效。下面的计算器把 \figref{1.16} 的表格"活"了过来：拖动 $\kappa$ 看各量的倍数与具体数值；再把 $\beta$ 从 1 往 0 拖（电压不再跟着缩），观察哪些格子变红。`}</Tx>
      <Figure n="1.16" caption={R`理想（Dennard）缩放。原书左图是原器件、中图是缩小 2 倍（$k=2$）的器件，右侧表格列出各参数的缩放因子：尺寸 $t_{\rm ox},L,W$：$1/k$；掺杂：$k$；电压 $V$：$1/k$；电流 $I$：$1/k$；电容 $\varepsilon A/t_{\rm ox}$：$1/k$；延迟 $VC/I$：$1/k$；功耗 $VI$：$1/k^2$；功率密度 $VI/WL$：1。交互版中缩放因子记作 $\kappa$，并允许电压只缩小 $\alpha$ 倍。`} illustration={<DennardCalc />} />
      <Derivation title={R`把表格变成一张"量纲账本"`} collapsed steps={[
        { tex: R`L,W,t_{\rm ox}\propto\kappa^{-1},\quad V\propto\kappa^{-1},\quad N_{\rm A}\propto\kappa`, why: R`输入：\eqref{1.S4}。` },
        { tex: R`\mathcal E=V/L\propto\kappa^{0}`, why: R`电场不变——这是整个方案的出发点。` },
        { tex: R`C_{\rm ox}=\varepsilon/t_{\rm ox}\propto\kappa,\qquad C=C_{\rm ox}WL\propto\kappa\cdot\kappa^{-2}=\kappa^{-1}`, why: "单位面积电容变大，总电容变小。" },
        { tex: R`I\propto C_{\rm ox}\frac{W}{L}V^2\propto\kappa\cdot1\cdot\kappa^{-2}=\kappa^{-1}`, why: R`长沟道饱和电流 \eqref{1.S6}。若器件进入速度饱和，$I\propto WC_{\rm ox}v_{\rm sat}V\propto\kappa^{-1}\cdot\kappa\cdot\kappa^{-1}=\kappa^{-1}$，结果相同。` },
        { tex: R`\tau=CV/I\propto\kappa^{-1}\kappa^{-1}/\kappa^{-1}=\kappa^{-1},\qquad f_{\max}\propto1/\tau\propto\kappa`, why: "延迟缩短，时钟可以加快。" },
        { tex: R`P=VI\propto\kappa^{-2},\qquad P/(WL)\propto\kappa^{-2}/\kappa^{-2}=1`, why: R`若时钟也按 $\kappa$ 加快，动态功耗 $CV^2f\propto\kappa^{-1}\kappa^{-2}\kappa=\kappa^{-2}$，与 $VI$ 一致。` },
      ]} result={R`恒定电场缩放下：尺寸、电压、电流、电容、延迟 $\propto\kappa^{-1}$；功耗 $\propto\kappa^{-2}$；电场与功率密度不变；密度 $\propto\kappa^{2}$。`} />

      <Tx>{R`**路线图：把缩放变成全行业的日程表。**恒定电场缩放给了硅芯片行业一份可预测的路线图。1994 年美国半导体行业协会（SIA）在科罗拉多州 Boulder 召开研讨会，把它正式写成《国家半导体技术路线图》（NTRS）[1.11]，此后通过全行业会议定期更新；1990 年代末它变成国际性的 **ITRS** [1.12]，成为半导体行业被引用最多的"战略规划"。它的基本前提是：以 CMOS 为基础的进步遵循摩尔定律，每 2–3 年一代，每代器件密度翻倍、横向尺寸缩小 0.7 倍（\eqref{1.S2}）。下表是 2003 版 ITRS 的一部分；注意 2003 年以后的各列在当时都是**预测**，是全行业努力要达到的共识目标。`}</Tx>
      <Table caption={R`**表 1.1** 2003 版 ITRS 的部分数据（2003 年以后为当时的预测）。DRAM 一行的单位已更正为 Gb（吉比特），见下方勘误。`}
        head={["量产年份", "2000", "2002", "2004", "2007", "2010", "2013", "2016", "2018"]}
        rows={[
          ["技术节点（nm）", "180", "130", "90", "65", "45", "32", "22", "14"],
          ["微处理器栅长（nm）", "100", "70", "53", "35", "25", "18", "13", "10"],
          ["DRAM 每芯片容量（Gb）", "0.512", "1", "4", "16", "32", "64", "128", "256"],
          [R`MPU 晶体管数（$10^6$）`, "", "", "550", "1100", "2200", "4400", "8800", "14000"],
          ["电源电压（V）", "1.5–1.8", "1.2–1.5", "0.9–1.2", "0.8–1.1", "0.7–1.0", "0.6–0.9", "0.5–0.8", "0.5–0.7"],
        ]} />
      <Box kind="warning" title="勘误：表 1.1 中 DRAM 容量的单位">{R`原书表头写作"DRAM Bits/Chip (GB)"。按字面 GB 是吉**字节**，2000 年的 DRAM 芯片就成了 0.512 GB = 4 Gb，比实际大 8 倍。ITRS 原表此行的单位是 **Gbits**（吉比特）：2000 年量产的 DRAM 为 512 Mb（= 0.512 Gb）芯片，这与当时的产品一致。因此正确的表头是"每芯片比特数（Gb）"。数值本身无误。`}</Box>
      <Tx>{R`**节点名与"最小特征尺寸"。**直到 2000 年后不久，ITRS 中的节点名大致就等于光刻印出的最小特征尺寸：180 nm 节点意味着最小印刷尺寸约 180 nm，每一代缩小 0.7 倍。注意表中每一代的**微处理器栅长**都比节点名还小——因为栅长是决定 MOS 晶体管性能的最重要尺寸，工程师用各种光刻"技巧"（第 5 章）把它刻得比一般图形更细。

正因为有 ITRS，行业习惯用 \figref{1.17} 这样的图来标示进度：1995 年以前约 3 年一代，此后约 2 年一代，这些点代表"理想"缩放时期；红色阴影（最小特征尺寸）紧贴节点名，说明理想缩放时期的密度提升确实来自横向尺寸的缩小。回头看，这段时期的缩放是"直截了当"的：每代都要巨大研发投入，但路线清楚——光刻改进让线条更细，CMOS 器件结构不变，密度每 2–3 年翻倍，电路一代比一代快，芯片功耗大致不变。`}</Tx>
      <Figure n="1.17" caption={R`"理想"缩放时期的技术节点随年份变化（原书数据点按图读出）。阴影区（交互版中为与节点名重合的部分）对应每一代光刻印出的最小特征尺寸。交互版：调节代际周期 $T_{\rm g}$ 与"1 µm 节点"年份，拟合 $\lambda(t)=1\,\mu\mathrm m\times0.7^{(t-t_{1\mu\mathrm m})/T_{\rm g}}$——默认 $T_{\rm g}=3$ 年可以很好地连接 1983 年的 1 µm 与 2000 年的 130 nm（$0.7^{17/3}\approx0.13$）。`} illustration={<NodePlot era="ideal" />} />

      <Tx>{R`**是什么让理想缩放停下来：60 mV/dec。**答案就藏在表 1.1 的最后一行。MOS 晶体管从关到开的转变，不可能比 PN 二极管的开关更陡。回忆 \figref{1.12}：反型层的电子来自 N$^+$ 源区，源与 P 型衬底之间有一个势垒，栅压把这个势垒**压低**，电子才"漫"进沟道形成反型层。电子越过势垒的速率受**热发射**（thermionic emission）限制——载流子能量服从玻尔兹曼分布，能越过高度为 $\Phi_{\rm B}$ 的势垒的电子数 $\propto e^{-q\Phi_{\rm B}/kT}$。于是在 \figref{1.18} 的低电流段，电流对栅压呈指数关系，其斜率的倒数为`}</Tx>
      <Eq n="1.1" keyEq title="亚阈摆幅（逆斜率）" say="亚阈区电流每变化十倍，栅压至少要变 $n(kT/q)\ln10$；室温下 $(kT/q)\ln10$ 约 60 mV，这是热发射给出的物理下限，与器件大小无关。">{R`\text{Inverse slope}=n\left(\frac{kT}{q}\right)\ln(10)=n\left(\frac{60\,\mathrm{mV}}{\text{decade current }(I)}\right)\quad\text{where }n\ge1`}</Eq>
      <Derivation title={R`从热发射推出 \eqref{1.1}`} steps={[
        { tex: R`I_{\rm DS}\propto\exp\!\left(-\frac{q\Phi_{\rm B}}{kT}\right)`, why: R`源区电子能量服从玻尔兹曼分布，能越过源—沟道势垒 $\Phi_{\rm B}$ 的比例按指数衰减。` },
        { tex: R`\Delta\Phi_{\rm B}=-\frac{\Delta V_{\rm GS}}{n},\qquad n=1+\frac{C_{\rm dep}}{C_{\rm ox}}\ \ge1`, why: R`栅压通过栅电容 $C_{\rm ox}$ 与耗尽层电容 $C_{\rm dep}$ 组成的分压器作用在沟道表面上，只有 $1/n$ 的栅压变化真正用来压低势垒（双极管的基极直接接在 P 区上，$n=1$）。` },
        { tex: R`\frac{d\ln I_{\rm DS}}{dV_{\rm GS}}=\frac{q}{nkT}\ \Longrightarrow\ \frac{dV_{\rm GS}}{d\log_{10}I_{\rm DS}}=n\,\frac{kT}{q}\ln10`, why: R`换成以 10 为底的对数（$\ln I=\ln10\cdot\log_{10}I$）。` },
        { tex: R`\frac{kT}{q}\ln10=0.02585\,\mathrm V\times2.3026=59.5\,\mathrm{mV}\ (T=300\,\mathrm K)`, why: R`原书取整为 60 mV。温度越高下限越大：$T=358\,\mathrm K$（85 °C）时为 71 mV。` },
      ]} result={R`$S=n(kT/q)\ln10\ \ge\ 59.5\,\mathrm{mV/dec}$（室温）。它只依赖温度，不随尺寸缩小——这正是理想缩放的阿喀琉斯之踵。`} />
      <Tx>{R`把亚阈区写成显式的指数律（$S$ 记逆斜率，$I_0$ 为 $V_{\rm GS}=V_{\rm TH}$ 时的电流）：`}</Tx>
      <Eq n="1.S9" keyEq title="亚阈电流的指数律（补充式）" say="阈值以下，栅压每降低一个 $S$（约 60–80 mV），电流就降为十分之一。">{R`I_{\rm DS}=I_0\,10^{(V_{\rm GS}-V_{\rm TH})/S},\qquad V_{\rm GS}<V_{\rm TH},\qquad S=n\frac{kT}{q}\ln10`}</Eq>
      <Tx>{R`**一个开关要摆多大的电压？**要让电流改变 10 倍，栅压至少变化 60 mV。实际电路要求开关比 $I_{\rm ON}/I_{\rm OFF}\ge10^6$，由 \eqref{1.S9}：`}</Tx>
      <Eq n="1.S10" keyEq title="最小栅压摆幅（补充式）" say="开关比要几个数量级，栅压就至少要摆几个 $S$；$10^6$ 的开关比在理想的 60 mV/dec 下也要 360 mV，这个数不会随器件缩小而减小。">{R`\Delta V_{\rm G}\ \ge\ S\,\log_{10}\frac{I_{\rm ON}}{I_{\rm OFF}}=6\times60\,\mathrm{mV}=360\,\mathrm{mV}\qquad\left(\frac{I_{\rm ON}}{I_{\rm OFF}}=10^6,\ n=1\right)`}</Eq>
      <Tx>{R`实际的 MOS 器件通常达不到 60 mV/dec 的下限（$n>1$），因为它的场效应机制是**隔着栅介质间接地**作用在 N$^+$P 势垒上的；双极晶体管则能达到（$n=1$），因为控制端直接接触 P 区，所加电压全部用来压低势垒。再加上噪声容限等实际考虑，MOS 的栅压在两态之间需要摆动 **0.5–0.7 V**。所以 CMOS 电路的电源电压很难降到这个范围以下。一旦理想缩放把电源电压降到 1 V 左右——这发生在 2000 年后不久的 **90 nm 代**——**理想缩放就结束了**。表 1.1 的电源电压一行清楚地显示了这一点：ITRS 预测尺寸继续缩小，工作电压却大致不变。`}</Tx>
      <Box kind="warning" title="易错点：60 mV/dec 不是“工艺不够好”">{R`(1) 60 mV/dec 来自载流子的**玻尔兹曼统计**，是一切靠热发射越过势垒的开关的共同下限，与器件尺寸、材料几乎无关；把晶体管做小**不能**改善它。改进工艺只能让 $n$ 接近 1（如高 $k$ 介质、FinFET 增强栅控）。(2) 要突破它必须换掉"热发射"这一机制，例如隧穿 FET、负电容 FET 等——这正是 §1.6 所说的"下一代开关"研究，至今尚无可量产的替代者。(3) 降低温度可以降低 $kT/q$，但芯片工作在室温以上，反而使 $S$ 更大。`}</Box>
      <Details summary="小练习：为什么 0.5 V 的电源电压已经很勉强？">{R`设 $n=1.3$，$T=358\,\mathrm K$（芯片工作温度约 85 °C），则 $S=1.3\times0.0308\times2.303\,\mathrm V\approx92\,\mathrm{mV/dec}$。若要求 $I_{\rm ON}/I_{\rm OFF}=10^5$，阈值以下就至少需要 $5S\approx0.46\,\mathrm V$ 的摆幅，再加上阈值之上获得足够 $I_{\rm ON}$ 所需的过驱动电压，0.5 V 已不够用。这与表 1.1 中 2016–2018 年预测的 0.5–0.8 V 下限一致。`}</Details>
      <ScalingPlot />
      <Tx className="muted">{R`交互：电压跟不上尺寸时会怎样。横轴是累计的尺寸缩小倍数 $\kappa$，电压只缩小 $\alpha=\kappa^\beta$ 倍。$\beta=1$ 时（恒定电场）功率密度和电场都是水平线；把 $\beta$ 拖向 0（恒定电压），长沟道模型下功率密度按 $\kappa^3$ 上升——缩小 8 倍（约 6 代）功率密度就涨 512 倍。§1.5 的 \eqref{1.S13} 给出一般公式。`}</Tx>
    </Sec>);
}
