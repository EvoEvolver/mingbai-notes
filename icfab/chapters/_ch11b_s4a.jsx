// §11.4 引言、§11.4.1 金属–半导体接触、§11.4.2 硅化物 —— 式 (11.9)–(11.19)，图 11.25–11.33，表 11.3–11.5
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, Table, Details, C } from "@kit";
import { ResistanceFig, BandFig, SalicideFlowFig, DiffuserFig, Reaction1DFig } from "./_ch11b_svg.jsx";
import { ContactPlot, SilicidePlot } from "./_ch11b_plots.jsx";

const R = String.raw;

export function Sec114({ children }) {
  return (
    <Sec n="11.4" title="Key Process Technologies and Back-End Issues" zh="关键工艺技术与后道问题"
      gist={R`把后道演进背后的几项"使能技术"逐一拆开：金属–半导体接触的物理、硅化物的生长动力学、Cu 电镀的超填充，以及决定互连寿命的电迁移。`}
      why={R`§11.3 讲的是"后道结构长成什么样"；要真正理解为什么这样做、极限在哪里，必须深入每一道关键工艺背后的物理与化学。`}
      gives={["11.11", "11.15", "11.16", "11.22", "11.23", "11.28", "11.30"]}>
      <p className="muted">本节概念：<C id="contact" /> · <C id="salicide" /> · <C id="superfill" /> · <C id="electromigration" /></p>
      <Tx>{R`上半章（§11.1–11.3）沿着历史线索讲了后道互连的演进：从 Al/$\mathrm{SiO_{2}}$ 到多层 Cu/低 k，从回流平坦化到 CMP，从刻蚀金属到双大马士革。演进的每一步都要求有新的"使能工艺"。本节逐一深入其中几项。

先说明一下取舍。**CMP** 本来是为后道发明的，但如今前道（STI、栅极替换）也离不开它，已经成为通用的材料去除技术，所以第 9 章已经详细讲过，这里不再重复。本节要讲的四件事是：

◆ **金属–半导体接触**（§11.4.1）：前道晶体管和后道导线的"接口"，它的电阻正在成为整个器件电阻里最难压缩的一项；

◆ **硅化物**（§11.4.2）：让接触电阻和源漏/栅的方块电阻都降下来的反应工艺，它的生长动力学和第 6 章的热氧化几乎是同一个模型；

◆ **Cu 电镀**（§11.4.3）：只在后道用到的沉积技术，关键在于怎样让金属"自下而上"填满深孔；

◆ **电迁移**（§11.4.4）：高电流密度下金属原子被电子"吹走"，是互连最主要的可靠性问题。`}</Tx>

      <Sub n="11.4.1" title="Metal-Semiconductor Contacts" zh="金属–半导体接触">
        <Tx>{R`**问题：电流从导线进入晶体管，要过哪几道"关卡"？**第 7 章（图 7.1）曾把一个 MOS 晶体管的总电阻拆成若干串联分量：沟道、源漏扩展区、源漏区、外延层……那里关心的是它们与掺杂分布的关系。现在把视线往上挪，把导线本身的电阻 $R_{\rm Wire}$ 也画进来（图 11.25）。在晶体管和导线的交界处，有两个接触电阻：

◆ $R_{\rm C\text{-}Sil\text{-}M1}$：硅化物与第一层金属（M1）之间——两种金属性材料相接，电阻通常很小；

◆ $R_{\rm C\text{-}Epi\text{-}Sil}$：硅化物与（外延）硅之间——这是**金属与半导体**的接触，往往是两者中的大头，必须尽量压低。

所以本小节讨论一般的金属–半导体接触电阻。其器件物理在任何半导体器件教材里都有完整推导（原书引 Sze [11.24]），我们直接引用结果，把重点放在"工艺能控制什么"上。`}</Tx>
        <Figure n="11.25" caption={R`MOS 器件截面中的电阻分量，以及接触电阻与金属互连电阻（自绘，依原书图 11.25 重画）。红圈标出前道与后道的交界。`} illustration={<ResistanceFig />} />

        <Tx>{R`**两种导电方式。**金属与半导体接触时，由于两者功函数不同，界面上形成一个势垒 $\phi_B$（肖特基势垒）。电子要从半导体进入金属（或反之），有两条路（图 11.26）：

◆ **翻过去**——热电子发射（thermionic emission）：只有热分布尾部能量够高的电子能越过势垒，电流随电压指数增长，但反向几乎不通——这是**整流**（rectifying）或肖特基接触；

◆ **穿过去**——量子隧穿（tunneling）：如果半导体掺杂极重，耗尽区只有几 nm 厚，电子可以直接隧穿势垒，正反向都导通，I–V 近似直线——这就是我们要的**欧姆接触**（ohmic contact）。

原则上，自然界的金属功函数五花八门，似乎总能挑到一种让 $\phi_B$ 很小的金属。实际上做不到，原因有二：一是金属还要满足电阻率等其他要求；二是**费米能级钉扎**（Fermi-level pinning）——界面态把界面处的费米能级"钉"在禁带中部附近，使 $\phi_B$ 几乎与金属功函数无关。`}</Tx>
        <Figure n="11.26" caption={R`金属–半导体结的能带图与导电方式（交互自绘）。拖动 $N_D$：低掺杂时耗尽区宽、电子只能热发射翻越势垒（整流）；$N_D\gtrsim10^{19}\,\mathrm{cm^{-3}}$ 时势垒薄到几 nm，隧穿成为主导（欧姆）。`} illustration={<BandFig />} />
        <Tx>{R`硅工艺里更常见的接触其实是**金属硅化物/硅**。同样的能带图、同样的钉扎问题照样存在。表 11.3 是几种常用硅化物对 N 型和 P 型硅的实测势垒：尽管这些金属的功函数相差很大，$\phi_{BN}$ 都落在 0.55–0.87 V，几乎扎堆——钉扎占了主导。还请注意每一列的 $\phi_{BN}+\phi_{BP}$ 都约等于 1.1 V，即硅的禁带宽度：对 N 型势垒低的材料，对 P 型势垒就高，没法两头都好。`}</Tx>
        <Table head={["硅化物", "$\\mathrm{MoSi_{2}}$", "$\\mathrm{ZrSi_{2}}$", "$\\mathrm{TiSi_{2}}$", "$\\mathrm{CoSi_{2}}$", "$\\mathrm{WSi_{2}}$", "$\\mathrm{NiSi_{2}}$", "$\\mathrm{Pd_{2}Si}$", "$\\mathrm{PtSi_{2}}$"]}
          rows={[["$\\phi_{BN}$ (V)", "0.55", "0.55", "0.61", "0.65", "0.67", "0.67", "0.75", "0.87"], ["$\\phi_{BP}$ (V)", "0.55", "0.55", "0.49", "0.45", "0.43", "0.43", "0.35", "0.23"]]}
          caption={R`表 11.3 常用硅化物对 N 型与 P 型硅的实测势垒高度（据原书，引自 [11.24]）。`} />

        <Tx>{R`**热电子发射：先算一个反例。**标准教材给出肖特基结的 J–V 关系：`}</Tx>
        <Eq n="11.9" say="热电子发射电流：前因子 $RT^2e^{-q\phi_B/kT}$ 是能翻过势垒的电子流，正偏电压每升高 $kT/q$ 电流就乘以 e；反偏时括号趋于 −1，只剩极小的饱和电流。">{R`J_S = RT^2\exp\left(-\frac{q\phi_B}{kT}\right)\left(\exp\left(\frac{qV_{MS}}{kT}\right)-1\right)`}</Eq>
        <Eq n="11.10" say="Richardson 常数由电子质量、电荷与普朗克常数组成；用有效质量后，Si 约 120、SiC 约 400 A/$\mathrm{(cm^{2}}$ $\mathrm{K^{2})}$。">{R`R = \frac{4\pi q m_e k^2}{h^3}`}</Eq>
        <Tx>{R`式中 $V_{MS}$ 是加在结上的电压（金属接正为正偏，降低半导体一侧的势垒）。反偏时金属一侧的势垒 $\phi_B$ 不随电压变化（金属是导体，不承受电压），所以几乎没有电流。

接触的好坏用**比接触电阻率**（specific contact resistivity）$\rho_c$ 衡量：零偏附近单位面积的微分电阻。对 \eqref{11.9} 在 $V_{MS}=0$ 求导：`}</Tx>
        <Eq n="11.11" keyEq title="比接触电阻率（热电子发射）" say="热电子发射接触的比接触电阻率等于热电压 $kT/q$ 除以饱和电流密度：势垒每高 $kT/q$，饱和电流降为 1/e，接触电阻就涨 e 倍。">{R`\rho_c = \left[\frac{\partial V_{MS}}{\partial J_S}\right]_{V_{MS}=0} = \frac{kT}{qJ_0}\ \ \mathrm{\Omega\,cm^2},\qquad J_0\equiv RT^2\exp\left(-\frac{q\phi_B}{kT}\right)`}</Eq>
        <Box kind="warning" title={R`勘误：式 (11.11) 的分母与随后的数值`}>{R`原书把结果写作 $\rho_c=kT/qJ_S$，分母沿用了 \eqref{11.9} 左端的 $J_S$；但求导后出现的是**饱和电流密度** $J_0=RT^2e^{-q\phi_B/kT}$（\eqref{11.9} 的前因子），而不是工作电流。此处改写为 $J_0$ 以免混淆。

原书接着说"取 $1\,\mathrm{A/cm^2}$ 代入得 $\rho_c=2.5\times10^{-3}\,\mathrm{\Omega\,cm^2}$"。按上式，$J_0=1\,\mathrm{A/cm^2}$ 时 $\rho_c=kT/q\div1=0.0259\,\mathrm V/(1\,\mathrm{A/cm^2})=2.6\times10^{-2}\,\mathrm{\Omega\,cm^2}$，原书数值小了 10 倍。结论不变：这比现代器件需要的 $\sim10^{-8}$ 大了六个数量级以上。（若按实际势垒 $\phi_B=0.6\,\mathrm V$、$R=120$ 计算，$J_0\approx9\times10^{-4}\,\mathrm{A/cm^2}$，$\rho_c\approx30\,\mathrm{\Omega\,cm^2}$，更是无法使用。）`}</Box>
        <Derivation title="由式 (11.9) 求零偏微分电阻" collapsed steps={[
          { tex: R`\frac{\partial J_S}{\partial V_{MS}} = RT^2e^{-q\phi_B/kT}\cdot\frac{q}{kT}e^{qV_{MS}/kT}`, why: R`括号中的 $-1$ 求导为零。` },
          { tex: R`\left.\frac{\partial J_S}{\partial V_{MS}}\right|_{V_{MS}=0} = \frac{q}{kT}J_0`, why: R`令 $V_{MS}=0$，$e^0=1$。` },
          { tex: R`\rho_c=\left[\frac{\partial V_{MS}}{\partial J_S}\right]_0=\frac{kT}{qJ_0}`, why: R`取倒数。` },
        ]} />

        <Tx>{R`**隧穿：重掺杂把势垒"削薄"。**既然翻越势垒行不通，就让电子穿过去。把半导体掺得极重（图 11.26 下），耗尽区宽度`}</Tx>
        <Eq n="11.12" say="耗尽区宽度随掺杂的平方根反比缩小：掺杂提高 100 倍，势垒厚度缩到 1/10。">{R`x_D = \sqrt{\frac{2\varepsilon_S\phi_B}{qN_D}}`}</Eq>
        <Tx>{R`就只剩几 nm。隧穿概率随势垒厚度**指数**增大，隧穿电流为`}</Tx>
        <Eq n="11.13" say="隧穿电流 = 撞击势垒的电子流 $\tfrac12qN_Dv_{th}$ $\times$ 隧穿概率；概率的指数正比于势垒高度、反比于 $\sqrt{N_D}$（即正比于势垒厚度）。">{R`J_S = \frac12 qN_Dv_{th}\exp\left[-\frac{H(\phi_B-V_{MS})}{\sqrt{N_D}}\right]`}</Eq>
        <Eq n="11.14" say="隧穿常数 $H$ 只含材料参数（介电常数与隧穿有效质量）：质量越重、介电常数越大，隧穿越难。">{R`H = \frac{4\pi}{h}\sqrt{\varepsilon_S m_n}`}</Eq>
        <Box kind="warning" title={R`勘误：式 (11.14) 中多了 $/q$`}>{R`原书印作 $H=\frac{4\pi}{h}\sqrt{\epsilon_S m_n/q}$。检验量纲：指数 $H\phi_B/\sqrt{N_D}$ 必须无量纲。取 SI 单位、$\phi_B$ 以伏特计，$\frac{4\pi}{h}\phi_B\sqrt{\varepsilon_S m_n/N_D}$ 的单位是 $\mathrm{V}\cdot\sqrt{\mathrm{(C/V)\,kg\,m^2}}/(\mathrm{J\,s})=1$，恰好无量纲；多出的 $1/\sqrt q$ 会留下 $\mathrm{C^{-1/2}}$。它与 Sze 教材中隧穿特征能 $E_{00}=\frac{q\hbar}{2}\sqrt{N_D/\varepsilon_S m^*}$ 给出的指数 $q\phi_B/E_{00}=\frac{4\pi}{h}\phi_B\sqrt{\varepsilon_Sm^*/N_D}$ 一致。数值上，用改正后的 $H$（$m_n=0.26m_0$、$v_{th}=10^7\,\mathrm{cm/s}$）由 \eqref{11.15} 算得 $N_D=10^{20}\,\mathrm{cm^{-3}}$、$\phi_B=0.3\,\mathrm V$ 时 $\rho_c=2.2\times10^{-8}\,\mathrm{\Omega\,cm^2}$，与图 11.27 的读数 $\approx2.3\times10^{-8}$ 吻合；若保留 $/q$，指数会大十个数量级，毫无意义。`}</Box>
        <Tx>{R`同样在零偏处对 \eqref{11.13} 求导取倒数，得到隧穿接触的比接触电阻率：`}</Tx>
        <Eq n="11.15" keyEq title="隧穿接触的比接触电阻率" say="隧穿接触的比接触电阻率随 $\phi_B/\sqrt{N_D}$ 指数变化：降低势垒或提高掺杂都能让它指数下降，而掺杂进入的是平方根。">{R`\rho_c = \left[\frac{\partial V_{MS}}{\partial J_S}\right]_{V_{MS}=0} = \frac{2\exp\left(H\phi_B/\sqrt{N_D}\right)}{qv_{th}H\sqrt{N_D}}\ \mathrm{\Omega\,cm^2} = \rho_{co}\exp\left(H\phi_B/\sqrt{N_D}\right)\ \mathrm{\Omega\,cm^2}`}</Eq>
        <Tx>{R`**解读。**$\rho_c$ 随 $N_D$ 增大而下降。要让 $x_D$ 小于约 2.5 nm、隧穿真正起作用，一般需要 $N_D>5\times10^{19}\,\mathrm{cm^{-3}}$（由 \eqref{11.12}，$\phi_B=0.3\,\mathrm V$ 时 $x_D=2.8\,\mathrm{nm}$，$\phi_B=0.6\,\mathrm V$ 时 $3.9\,\mathrm{nm}$，量级相符）。对 P 型半导体只需换成 $\phi_{BP}$、$m_p$、$N_A$。图 11.27 是用比 \eqref{11.15} 稍精细的模型算出的 $\rho_c$。下面的交互图直接用 \eqref{11.15} 计算，并叠加原书图上的读数：在 $\phi_B=0.3\,\mathrm V$ 两者几乎重合，在 $\phi_B=0.6\,\mathrm V$ 简单模型低估约 2 倍——指数里的任何近似都会被放大。`}</Tx>
        <Figure n="11.27" caption={R`不同 $\phi_B$ 与硅掺杂浓度下计算的比接触电阻（原书据 [11.24, 11.25]）。"交互版"按式 (11.15) 实时计算，可调隧穿有效质量与热速度，金色点为原书图读数。`} interactive={<ContactPlot />} />
        <Box kind="example" title="25 nm $\times$ 25 nm 的接触有多大电阻？">{R`取图 11.27 中的代表值 $\rho_c=1\times10^{-8}\,\mathrm{\Omega\,cm^2}$，接触面积 $A=(25\times10^{-7}\,\mathrm{cm})^2=6.25\times10^{-12}\,\mathrm{cm^2}$：
$$R_c=\frac{\rho_c}{A}=\frac{10^{-8}}{6.25\times10^{-12}}\approx1.6\,\mathrm{k\Omega}.$$
这与一个现代晶体管的沟道电阻（几 k$\Omega$）同量级，太大了。要降低它，只能让 $\phi_B$ 更小（受费米能级钉扎限制）或掺杂更高（受固溶度限制）——两者都是硬骨头，所以降低 $\rho_c$ 至今仍是研究热点。

（原书此处给出"约 1.3 k$\Omega$"；按上式实为 1.6 k$\Omega$，1.3 k$\Omega$ 对应约 28 nm 见方的接触。交互图中的"接触边长"滑块可直接换算。）`}</Box>

        <Tx>{R`**化合物半导体的接触。**物理完全一样，只是金属体系随材料而异（图 11.28）。

◆ **GaAs MESFET**：栅是整流的肖特基接触，用难熔金属（例中为 WN）；源漏欧姆接触用合金化的 Au–Ge 体系：Ge 是 GaAs 的 N 型杂质，合金化时从金属中外扩散，在界面下形成重掺 $\mathrm{N^{+}}$ 层，于是得到隧穿欧姆接触；上面的 Ni/Au 负责粘附并加厚以降低电阻。P 型 GaAs 常用 Au–Zn 或 Au–In，由 Zn/In 提供 $\mathrm{P^{+}}$。更深的源漏 $\mathrm{N^{+}}$ 区一般用离子注入。

◆ **GaN HEMT**（功率开关中日益普及）：源漏欧姆接触的金属叠层（Ti/Al/Ni/Au）看起来相似，机理却不同：高温退火（典型 850 °C、30 s）时 Ti 与 AlGaN 反应生成界面 TiN 并留下 **N 空位**，N 空位在 AlGaN 中是施主，于是接触下方变成 $\mathrm{N^{+}}$，形成隧穿欧姆接触。栅同样用 WN 肖特基接触。

化合物半导体的后道整体留到 §11.7 再谈。`}</Tx>
        <Figure n="11.28" caption={R`化合物半导体的接触技术。左：GaAs 金属–半导体场效应晶体管（MESFET），欧姆接触为 Au–Ge/Ni/Au，肖特基栅为 WN。右：GaN 高电子迁移率晶体管（HEMT），同样兼有欧姆与整流（肖特基）接触。`} />
        <Box kind="warning" title="测 ρc 没有看上去那么简单">{R`直觉做法：让电流流过接触，量压降，$R=V/I$，再乘以接触面积得到 $\rho_c$。这默认了电流在接触面上**均匀分布**、有效面积就是几何面积。在小尺寸结构中电流是二维甚至三维地拥挤在接触边缘的，有效面积可能和几何面积相差很大。因此有大量文献专门研究如何设计测试结构来正确提取 $\rho_c$（如传输线模型 TLM、Kelvin 结构等，见原书 [11.35]）。`}</Box>
      </Sub>

      <Sub n="11.4.2" title="Silicide Structures and Technology" zh="硅化物结构与工艺">
        <Tx>{R`**为什么要硅化物。**硅化物（silicide）是金属与硅的化合物，电阻率只有十几到几十 $\mu\Omega\,\mathrm{cm}$，比重掺杂硅低两三个数量级。把它铺在源漏和栅的表面，一举三得（后文细说）。表 11.4 汇总了常用硅化物的性质。`}</Tx>
        <Table head={["硅化物", "薄膜电阻率 ($\\mu\\Omega\\,$cm)", "烧结温度 (°C)", "在 Si 上稳定至 (°C)", "与 Al 反应温度 (°C)", "每 nm 金属消耗 Si (nm)", "每 nm 金属生成硅化物 (nm)", "对 n-Si 势垒 (eV)"]}
          rows={[
            ["PtSi", "28–35", "250–400", "~750", "250", "1.12", "1.97", "0.84"],
            ["$\\mathrm{TiSi_{2}}$ (C54)", "13–16", "700–900", "~900", "450", "2.27", "2.51", "0.58"],
            ["$\\mathrm{TiSi_{2}}$ (C49)", "60–70", "500–700", "", "", "2.27", "2.51", ""],
            ["$\\mathrm{WSi_{2}}$", "30–70", "1000", "~1000", "500", "2.53", "2.58", "0.67"],
            ["$\\mathrm{Co_{2}Si}$", "~70", "300–500", "", "", "0.91", "1.47", ""],
            ["CoSi", "100–150", "400–600", "", "", "1.82", "2.02", ""],
            ["$\\mathrm{CoSi_{2}}$", "14–20", "600–800", "~950", "400", "3.64", "3.52", "0.65"],
            ["NiSi", "14–20", "400–600", "~650", "", "1.83", "2.34", ""],
            ["$\\mathrm{NiSi_{2}}$", "40–50", "600–800", "", "", "3.65", "3.63", "0.66"],
            ["$\\mathrm{MoSi_{2}}$", "40–100", "800–1000", "~1000", "500", "2.56", "2.59", "0.64"],
            ["$\\mathrm{TaSi_{2}}$", "35–55", "800–1000", "~1000", "500", "2.21", "2.41", "0.59"],
          ]}
          caption={R`表 11.4 硅化物的性质（据原书，引自 [11.36]）。`} />
        <Tx>{R`**自对准硅化物（salicide）流程。**硅化物可以直接以化合物形式溅射或 CVD 沉积，但更常见的做法是**先沉积金属，再让它与衬底的硅反应**——好处是硅化物只在有硅源的地方生成，天然对准。以 $\mathrm{TiSi_{2}}$ 和多晶硅栅 NMOS 为例（图 11.29）：

1. 去掉硅与多晶硅表面的氧化层，溅射一层 Ti（典型 50–100 nm）；

2. 在约 600 °C 退火，通常不到一分钟。此时发生**两个反应**：Ti 的上表面与气氛中的 $\mathrm{N_{2}}$ 反应生成 TiN；Ti 的下表面在有硅的地方生成 $\mathrm{TiSi_{2}}$。若改用惰性气氛（如 Ar），就不生成 TiN，没有硅源的地方（氧化物侧墙、STI 上）留下未反应的 Ti；

3. 接下来看工艺需要：有的流程用一次光刻把 TiN 图形化，留作**局部互连**（local interconnect）——TiN 电阻率约 50–100 $\mu\Omega\,\mathrm{cm}$，比 Cu 高得多，只能连接距离很近的结构，故称"局部"；不用时就不需要光刻，直接用 $\mathrm{NH_{4}OH}$:$\mathrm{H_{2}O_{2}}$:$\mathrm{H_{2}O}$（1:1:5）溶液或等离子体把 TiN 与未反应的 Ti 选择性去除；

4. 最后再退火一次降低电阻：750 °C 以下形成的是亚稳的 **C49 相**（60–70 $\mu\Omega\,\mathrm{cm}$），需要约 800 °C、30–60 s 才能转变为平衡的 **C54 相**（13–20 $\mu\Omega\,\mathrm{cm}$）。`}</Tx>
        <Figure n="11.29" caption={R`$\mathrm{TiSi_{2}}$ 形成的通用流程（自绘）：沉积 Ti → $\mathrm{N_{2}}$ 中退火同时生成 $\mathrm{TiSi_{2}}$ 与 TiN → 选择性去除 TiN 与未反应 Ti。`} illustration={<SalicideFlowFig />} />
        <Tx>{R`**厚度怎么算。**由表 11.4，每 1 nm Ti 完全反应消耗 2.27 nm Si，生成 2.51 nm $\mathrm{TiSi_{2}}$。100 nm Ti 全部反应，消耗 227 nm Si，生成约 250 nm $\mathrm{TiSi_{2}}$；方块电阻约 $15\times10^{-6}\,\mathrm{\Omega\,cm}/(2500\times10^{-8}\,\mathrm{cm})=0.6\,\mathrm{\Omega/\square}$。若在 $\mathrm{N_{2}}$ 中退火，Ti 的上部变成了 TiN，硅化物就少一些——具体多少取决于两个反应的相对动力学，下面就来建模。

**硅化物带来的三个好处：**(1) 源漏 $\mathrm{N^{+}}$/$\mathrm{P^{+}}$ 区表面盖上一层硅化物，方块电阻大降，而且接触面积等效扩大到整个扩散区，接触电阻随之下降；(2) 多晶硅栅的电阻也降低；(3) 若保留 TiN 作局部互连，在所有 Cu 层之下多了一层布线。第 2 章的 CMOS 流程在源漏上用了 $\mathrm{TiSi_{2}}$，没有用 TiN 局部互连（图 2.16）；由于那里用的是高 k 金属栅，栅顶的硅化物也就不需要了。`}</Tx>
        <Tx>{R`**谁在扩散，决定硅化物长在哪里。**形成 $\mathrm{MSi_{2}}$（M 为金属）时，反应要继续，金属或硅必须有一方**穿过已生成的硅化物**扩散到另一侧（图 11.30）：

◆ 若金属是主要扩散者，新硅化物长在硅化物层的**下表面**（硅一侧）；

◆ 若硅是主要扩散者，新硅化物长在**上表面**（金属一侧）——硅会沿侧墙上的金属一路反应上去，硅化物"爬"过侧墙，去掉多余金属后可能把源漏和栅短路，晶体管报废。

所以一般更希望金属是扩散者；若是硅扩散，就得严格控制退火时间与温度。经验规律是：富金属硅化物 $\mathrm{M_{2}Si}$ 中金属是主要扩散者，单硅化物 MSi 与二硅化物 $\mathrm{MSi_{2}}$ 中通常是硅——但有例外：$\mathrm{TiSi_{2}}$、$\mathrm{CoSi_{2}}$、$\mathrm{WSi_{2}}$、NiSi 的主要扩散者分别是 Si、Co、Si、Ni。当然，这只是厂家选硅化物时的诸多考量之一。`}</Tx>
        <Figure n="11.30" caption={R`硅化物形成示意（自绘）：左，金属为扩散者；右，硅为扩散者——后者可能沿侧墙横向侵蚀。`} illustration={<DiffuserFig />} />

        <Tx>{R`**动力学：又是 Deal–Grove。**第 6 章用线性–抛物线（Deal–Grove）模型描述热氧化：氧穿过已生长的 $\mathrm{SiO_{2}}$ 扩散到 Si/$\mathrm{SiO_{2}}$ 界面反应——一个"扩散–反应"模型。薄的时候反应慢、限速，厚度随时间线性增长；厚了以后扩散限速，厚度 $\propto\sqrt t$。硅化物生长是同一类问题，只是参数换成硅化物的：`}</Tx>
        <Eq n="11.16" keyEq title="硅化物的线性–抛物线生长" say="硅化物厚度满足与热氧化相同的 Deal–Grove 关系：扩散项 $x_s^2/B$ 与反应项 $x_s/(B/A)$ 所需的时间相加。">{R`\frac{x_s^2}{B}+\frac{x_s}{B/A}=t+\tau\qquad\text{或}\qquad x_s=\frac A2\left\{\sqrt{1+\frac{t+\tau}{A^2/4B}}-1\right\}`}</Eq>
        <Tx>{R`$B$ 与 $B/A$ 分别是抛物线和线性速率常数，物理上前者刻画扩散、后者刻画界面反应；$\tau$ 是起始厚度不为零时的时间修正。两个极限：`}</Tx>
        <Eq n="11.17" say="扩散限速：厚度平方正比于时间——要长两倍厚，得花四倍时间。">{R`x_s^2\cong B(t+\tau)`}</Eq>
        <Tx>{R`对应扩散限速（$\mathrm{TiSi_{2}}$ 中是 Si 的扩散），$B$ 主要由 Si 在 $\mathrm{TiSi_{2}}$ 中的扩散系数决定。另一端：`}</Tx>
        <Eq n="11.18" say="反应限速：厚度随时间线性增长，速率就是界面反应速率 $B/A$。">{R`x_s\cong\frac BA(t+\tau)`}</Eq>
        <Derivation title="由二次方程得到 (11.16) 的显式解与两个极限" collapsed steps={[
          { tex: R`x_s^2+Ax_s-B(t+\tau)=0`, why: R`把 \eqref{11.16} 左式两边乘以 $B$，利用 $B/(B/A)=A$。` },
          { tex: R`x_s=\frac{-A+\sqrt{A^2+4B(t+\tau)}}{2}=\frac A2\left\{\sqrt{1+\frac{t+\tau}{A^2/4B}}-1\right\}`, why: R`取正根。` },
          { tex: R`t+\tau\gg\frac{A^2}{4B}:\ x_s\approx\sqrt{B(t+\tau)}`, why: R`根号内 1 可忽略 → \eqref{11.17}。` },
          { tex: R`t+\tau\ll\frac{A^2}{4B}:\ x_s\approx\frac A2\cdot\frac{t+\tau}{2\cdot A^2/4B}=\frac BA(t+\tau)`, why: R`$\sqrt{1+\epsilon}\approx1+\epsilon/2$ → \eqref{11.18}。` },
        ]} />
        <Tx>{R`**与氧化的两点不同。**(1) 反应界面的位置：氧化时氧往下扩散、在**底部**界面反应；$\mathrm{TiSi_{2}}$ 中 Si 往上扩散、在 $\mathrm{TiSi_{2}}$/Ti 的**顶部**界面反应（图 11.31 左，Ar 气氛，即自对准硅化物工艺）。在 $\mathrm{N_{2}}$ 气氛中（图 11.31 右）还同时有第二个反应：N 穿过 TiN 往下扩散，在 TiN/Ti 界面生成新的 TiN——两个反应界面一上一下同时向 Ti 层中间推进。

(2) 体积变化的符号：氧化时体积膨胀，产生压应力。$\mathrm{TiSi_{2}}$ 则相反：1 nm Ti 加 2.27 nm Si，共 3.27 nm 反应物，只生成 2.51 nm 产物，体积缩小约 23%，按理应产生张应力。但实验发现，视形成条件不同，硅化物膜里既可能是张应力，也可能是压应力。`}</Tx>
        <Figure n="11.31" caption={R`$\mathrm{TiSi_{2}}$ 形成的一维图像（自绘）。左：只生成 $\mathrm{TiSi_{2}}$，Si 穿过硅化物扩散，在 $\mathrm{TiSi_{2}}$/Ti 界面生成新硅化物。右：$\mathrm{N_{2}}$ 气氛中同时在顶部生成 TiN，N 穿过 TiN 扩散，在 TiN/Ti 界面生成新 TiN。`} illustration={<Reaction1DFig />} />
        <Tx>{R`**参数从哪里来。**Cea [11.40] 用 Pico 与 Lagally [11.39] 的厚度–时间数据提取了 $\mathrm{TiSi_{2}}$ 的 $B$ 与 $B/A$。方法与第 6 章相同：把 \eqref{11.16} 改写为 $x_s=B\,(t+\tau)/x_s-A$，以 $x_s$ 对 $(t+\tau)/x_s$ 作图，斜率是 $B$，纵截距是 $-A$。结果（表 11.5）很有意思：(100) 衬底上 $B/A$"很大"——界面反应极快，生长完全由 Si 的扩散（$B$）控制，$B/A$ 取任何足够大的值都不影响结果；(111) 衬底上反过来，反应限速，$B$"很大"。`}</Tx>
        <Table head={["", "$B$ ($\\mathrm{\\mu m^2\\,min^{-1}}$)", "$B/A$ ($\\mathrm{\\mu m\\,min^{-1}}$)"]}
          rows={[["(100) Si", "$1.85\\times10^{11}\\exp\\left(-\\dfrac{2.5\\,\\mathrm{eV}}{kT}\\right)$", "“很大”"], ["(111) Si", "“很大”", "$8.9\\times10^{11}\\exp\\left(-\\dfrac{2.5\\,\\mathrm{eV}}{kT}\\right)$"]]}
          caption={R`表 11.5 $\mathrm{TiSi_{2}}$ 形成的 $B$ 与 $B/A$（Cea [11.40]）。`} />
        <Box kind="example" title="在 (100) Si 上用 55 nm Ti 形成 $\mathrm{TiSi_{2}}$">{R`**题目**：在 (100) Si 上沉积 55 nm Ti，Ar 气氛中退火。(a) 若退火足够长使 Ti 全部反应，$\mathrm{TiSi_{2}}$ 多厚、消耗多少 Si？(b) 若在 700 °C 只退火 30 s，用表 11.5 的参数重算。

**(a)** Ar 中不生成 TiN。由表 11.4：$\mathrm{TiSi_{2}}$ 厚 $55\times2.51=138\,\mathrm{nm}$，消耗 Si $55\times2.27=125\,\mathrm{nm}$。

**(b)** 30 s 不一定能反应完，要用动力学。(100) Si 上 $B/A$ 很大，生长不受反应限制，用 \eqref{11.17} 并取 $\tau=0$：$x_s\cong\sqrt{Bt}$。700 °C 时
$$B=1.85\times10^{11}\exp\left(-\frac{2.5\,\mathrm{eV}}{(8.63\times10^{-5}\,\mathrm{eV\,K^{-1}})(973\,\mathrm K)}\right)\mathrm{\mu m^2min^{-1}}=0.022\,\mathrm{\mu m^2min^{-1}},$$
$$x_s\cong\sqrt{(0.022\,\mathrm{\mu m^2min^{-1}})(0.5\,\mathrm{min})}=105\,\mathrm{nm}.$$
所需 Ti 为 $105/2.51=42\,\mathrm{nm}$（小于 55 nm，确实没反应完，顶上还剩 13 nm Ti），消耗 Si $42\times2.27=95.3\,\mathrm{nm}$。`}</Box>
        <Box kind="note" title="交互：$\mathrm{TiSi_{2}}$ 厚度随时间（式 11.16 与表 11.5）">
          <Tx>{R`实线为 (100) Si（扩散限制，$x_s=\sqrt{Bt}$），虚线为 (111) Si（反应限制）；Ti 耗尽（$2.51\times$ Ti 厚度）后生长停止。默认参数即上面的例题：700 °C、30 s 处读出约 102 nm（用 $k=8.617\times10^{-5}\,\mathrm{eV/K}$；原书取 $8.63\times10^{-5}$ 得 105 nm）。把温度降到 600 °C，30 s 只能长出约 20 nm——这就是快速热退火对温度如此敏感的原因：2.5 eV 的激活能意味着每升高约 25 °C 速率常数翻一倍。`}</Tx>
          <SilicidePlot />
        </Box>

        <Tx>{R`**二维、三维：应力与模拟。**小结构中，受约束区域的体积变化会产生应力，第 6 章已经为氧化引入了与应力相关的参数和粘弹性流动模型。硅化物可以同样处理：只要知道某种硅化物工艺的应力相关 $B$、$B/A$，就能放进 Silvaco Athena [11.41] 这类模拟器。但必须清醒：硅化物是多晶，晶界是快扩散通道，而晶界扩散又受应力影响；许多硅化物还有多个可共存的相。所以这些模拟工具的结果多半是**定性正确**而非定量准确。

图 11.32 是一个 Athena 模拟的自对准硅化物工艺：在 1.2 µm 栅长 NMOS（1980 年代水平）左半边保形沉积 0.1 µm Ti，Ar 中 675 °C 退火 2.5 min，生成约 0.1 µm $\mathrm{TiSi_{2}}$，再刻掉多余的 Ti。硅中的灰度等值线是掺杂分布——硅化物形成时会"吃进"相当多的杂质，因此模拟必须同时处理 $\mathrm{TiSi_{2}}$/Si 界面的杂质分凝和退火中的杂质扩散。第 2 章的 CMOS 例子用的 Ti 和 $\mathrm{TiSi_{2}}$ 都要薄得多。`}</Tx>
        <Box kind="warning" title="勘误：图号">{R`原书在描述图 11.32 的退火条件时写作"The anneal in Figure 11.34"，应为图 11.32（图 11.34 是电镀示意）。`}</Box>
        <Figure n="11.32" caption={R`$\mathrm{TiSi_{2}}$ 自对准硅化物工艺的 Athena 模拟。左上：在 NMOS 的 $\mathrm{N^{+}}$ 源区与多晶硅栅上保形沉积 0.1 µm Ti。右上：675 °C 退火 2.5 min，生成约 0.1 µm $\mathrm{TiSi_{2}}$。下：刻去多余 Ti。`} />
        <Tx>{R`第二个例子（图 11.33）用佛罗里达大学的 FLOOPS 模拟器。Cea 与 Law 在线性–抛物线模型之外加入了应力相关参数，以计入硅化物形成中的体积变化。有实验证据表明高压应力会**减慢** Si 在 $\mathrm{TiSi_{2}}$ 中的扩散；模拟中按第 6 章的式 (6.24)：`}</Tx>
        <Eq n="11.19" say="压应力使扩散系数按 $e^{-PV_D/kT}$ 降低：每多 $kT/V_D$ 的压强，扩散慢 e 倍。">{R`D(\text{stress}) = D\exp\left(-\frac{PV_D}{kT}\right)`}</Eq>
        <Tx>{R`其中 $P$ 是生长中硅化物的静水压力（压缩为正），$V_D$ 是激活体积，Si 在 $\mathrm{TiSi_{2}}$ 中取 $1.3\,\mathrm{nm^3}$。由于 Deal–Grove 模型中 $B=2DC^*/N_1$，压力会局部改变 $B$：在拐角等高应力处，Si 扩散变慢，硅化物长得慢。

量级感：$V_D=1.3\,\mathrm{nm^3}$，650 °C 时 $kT=1.27\times10^{-20}\,\mathrm J$，$kT/V_D\approx1\,\mathrm{GPa}$——薄膜中 GPa 量级的应力并不罕见，所以这个效应是实打实的。`}</Tx>
        <Figure n="11.33" caption={R`用 FLOOPS 模拟 0.35 µm 栅结构上 $\mathrm{TiSi_{2}}$ 的形成。左：形成退火前。右：$\mathrm{N_{2}}$ 中 650 °C、30 s 退火后。凡 Ti 与 Si 接触或靠近处都生成 $\mathrm{TiSi_{2}}$，Ti 层顶部生成 TiN。`} />
        <Tx>{R`**读图 11.33。**40 nm Ti 沉积在 0.35 µm 多晶硅栅及相邻源漏上，$\mathrm{N_{2}}$ 中 650 °C 退火 30 s。参数同上一个模拟，另加 TiN 的参数——由于实验数据有限，TiN 的线性和抛物线速率常数取为 $\mathrm{TiSi_{2}}$ 的 20%。结果：硅上的 Ti 没有全部反应，剩约 7.5 nm；约 32.5 nm Ti 和 44 nm Si 被消耗，生成约 50 nm $\mathrm{TiSi_{2}}$ 和硅化物上方约 27 nm TiN。（用表 11.4 核对：44 nm Si 对应 $44/2.27\approx19\,\mathrm{nm}$ Ti 变成硅化物，生成 $19\times2.51\approx49\,\mathrm{nm}$ $\mathrm{TiSi_{2}}$，与 50 nm 相符；其余约 13 nm Ti 变成了 TiN——两个反应在争夺同一层 Ti。）

两个与实验相符的特征，在小结构中更明显：

◆ **硅化物横向侵蚀到氧化物侧墙上**：Si 穿过硅化物扩散到侧墙上方，与那里的 Ti 反应。$\mathrm{N_{2}}$ 气氛中侧墙上方持续生成的 TiN 会挡住 $\mathrm{TiSi_{2}}$ 的横向生长；此外，N 被认为会"填塞"未反应 Ti 的晶界、减慢 Si 扩散（模型里没有显式包含）。

◆ **栅顶硅化物向下弯曲**：被认为是硅化物底部两端在侧墙顶上被机械**钉扎**（图中 pinning point）。Si 从多晶硅/$\mathrm{TiSi_{2}}$ 界面离开、向上扩散到 $\mathrm{TiSi_{2}}$/Ti 界面生成新硅化物，$\mathrm{TiSi_{2}}$ 随之下沉去填补 Si 离开留下的空间；两端被钉住，只有中间能下沉，于是向下弯成弓形。`}</Tx>
      </Sub>
      {children}
    </Sec>);
}
