// A.1 平衡态半导体材料基础（上）：键模型、掺杂与电阻率、能带模型、态密度与统计、载流子浓度。
import { Sub, Tx, Eq, Box, Figure, Derivation, Table, C } from "@kit";
import { FigA1_1, FigA1_3, FigA1_5, FigA1_7, FigA1_8, FigA1_9, FigA1_11, FigA1_12, PeriodicSlice, Legend } from "./_appA_figs.jsx";
import { DiamondCell } from "./_appA_lattice3d.jsx";
import { NiPlot, NiCalc, FermiDiracPlot, ResistivityPlot, MobilityPlot } from "./_appA_plots.jsx";

const R = String.raw;

export function A1Bonds() {
  return <Sub n="A.1.1" zh="键模型：共价键、晶格与本征激发" title="The bond picture">
    <Tx>{R`整本书讲的是"怎样在一块硅里精确地放进杂质原子"。这一附录先回答一个更基础的问题：**为什么放进杂质就能改变硅的导电性，而且改变得如此之大？** 原书的说法很直白——半导体的特点就是"电导率可以靠掺杂在极宽的范围内控制"。晶体、多晶、非晶材料都能掺杂，但集成电路几乎总是用单晶，因为它的性质最可重复、器件性能最好。

先看硅原子本身。它有 14 个电子，最外层（价层）4 个。这 4 个**价电子**（valence electrons）决定了它怎样成键。在晶体里，每个硅原子与 4 个最近邻各共享一对电子，形成**共价键**（covalent bond）；这样每个原子周围"凑满"了 8 个共享电子——和惰性气体的满壳层一样稳定。`}</Tx>
    <Figure n="A1.1" caption={R`硅原子（左，14 个电子，最外层 4 个）与晶体中的二维键模型（右，只画价电子；灰色椭圆是由两个电子组成的共价键）。自绘。`} illustration={<FigA1_1 />} />
    <Tx>{R`二维图只是为了好画。真实晶体是三维的：硅属于**金刚石结构**（diamond structure），可以看成两套面心立方（FCC）格子沿体对角线错开 $1/4$ 套在一起，每个原子恰好处在 4 个近邻构成的正四面体中心。晶格常数 $a=0.543$ nm（第 3 章会详谈晶向与晶面）。Ge 也是这种结构；把 III 族和 V 族原子交替放在两套子格子上（如 GaAs），平均每个原子仍有 4 个价电子，同样能形成这种四面体共价键——这就是"化合物半导体"的来历。更复杂的如 $\mathrm{Hg_xCd_{1-x}Te}$（II–VI 族）也可以。`}</Tx>
    <Figure n="A1.2" caption={R`左：硅的金刚石结构晶胞（三维，可旋转；两种颜色是两套 FCC 子晶格，黑棒为共价键，$a=0.543$ nm）。右：与半导体及掺杂有关的周期表片段——IV 族是元素半导体，III 与 V（或 II 与 VI）族组合成化合物半导体，III 族是硅的受主、V 族是施主。自绘。`}
      illustration={<div><DiamondCell /><PeriodicSlice /></div>} />
    <Tx>{R`绝对零度以上，晶格热振动偶尔会把一根 Si–Si 键"震断"：一个电子挣脱出来成为可以自由运动的**自由电子**，原来的位置留下一个"缺电子"的空位——**空穴**（hole）。邻近键上的电子可以跳进这个空位，于是空穴也能在晶体中移动，表现得像一个带正电的载流子。一次断键同时产生一个电子和一个空穴，所以叫**电子–空穴对**。`}</Tx>
    <Figure n="A1.3" caption={R`断开一根共价键：产生一个自由电子（$-$）和一个可动空穴（$+$），两者都能导电。自绘。`} illustration={<FigA1_3 />} />
    <Tx>{R`在纯净（本征）半导体里电子和空穴严格成对出现，它们的浓度相等，记作**本征载流子浓度** $n_i$（intrinsic carrier concentration）。室温下硅的 $n_i\approx1.4\times10^{10}\,\mathrm{cm^{-3}}$，而硅的原子密度约 $5\times10^{22}\,\mathrm{cm^{-3}}$——大约每 $10^{12}$ 根键里才断一根。所以纯硅几乎不导电，靠它做不出有用的器件。

图 A1.4 还画出了 Ge、GaAs、4H-SiC、GaN。键越强的材料，同样温度下断键越少、$n_i$ 越小：SiC 与 GaN 的 $n_i$ 低得惊人，它们被称为**宽禁带半导体**（wide-bandgap semiconductors），正在功率器件中开辟新天地；GaAs 则用于高频。注意横轴一直延伸到 1500 K：**工艺温度下的 $n_i$ 与器件工作温度下的 $n_i$ 可以相差 8 个数量级**，这是本附录最重要的提醒之一。`}</Tx>
    <Figure n="A1.4" caption={R`几种半导体的本征载流子浓度随温度的变化，虚线为室温。交互版按 Table A1.1 与 \eqref{A1.12} 实时重算；"原书图"标签为原图。`} interactive={<NiPlot />} />
  </Sub>;
}

export function A1Doping() {
  return <Sub n="A.1.2" zh="掺杂与电阻率" title="Doping and resistivity">
    <Tx>{R`让半导体"有用"的关键是**掺杂**（doping）：用 V 族原子（如 As）或 III 族原子（如 B）**替换**晶格中的硅原子。As 有 5 个价电子，4 个用来和近邻成键，多出的第 5 个只被很弱地束缚，几乎总会脱离成为自由电子，As 因此叫**施主**（donor），使材料成为 N 型；B 只有 3 个价电子，成键时缺一个，从邻键"借"一个电子就留下一个空穴，B 叫**受主**（acceptor），使材料成为 P 型。施主、受主浓度分别记作 $N_D$、$N_A$。

两点要特别记住。第一，载流子是**一对一**地由杂质提供的：放进多少 As，就多出多少电子——所以控制住掺杂浓度，就精确控制了载流子浓度和电导率。第二，杂质放出载流子之后自己带上了**相反的电荷**：图中写的是 $\mathrm{As^+}$ 和 $\mathrm{B^-}$。这些固定的离化杂质在器件中建立内建电场，在第 7 章还会影响杂质扩散本身。

早年掺杂靠气相扩散（第 1 章图 1.5、1.6），今天主要靠离子注入（第 8 章），并通过光刻掩蔽做到局部掺杂（图 1.7）。`}</Tx>
    <Figure n="A1.5" caption={R`用 V 族（As，左）和 III 族（B，右）元素对 IV 族半导体掺杂的键模型。As 放出的电子成为自由电子，自身成为 $\mathrm{As^+}$；B 接受一个电子留下空穴，自身成为 $\mathrm{B^-}$。自绘。`} illustration={<FigA1_5 />} />
    <Tx>{R`离子注入可以把杂质浓度从 ppm 量级一直调到百分之几，电导率随之跨越许多个数量级。工程上习惯用 $\mathrm{N^+}$、$\mathrm{P^{-}}$ 这类记号粗略表示掺杂"轻重"，没有严格定义，常用的约定如下：`}</Tx>
    <Table head={["记号", "掺杂浓度范围"]} rows={[
      [R`$\mathrm{N^{--}}$ 或 $\mathrm{P^{--}}$`, R`$N_D$ 或 $N_A<10^{14}\,\mathrm{cm^{-3}}$`],
      [R`$\mathrm{N^{-}}$ 或 $\mathrm{P^{-}}$`, R`$10^{14}<N_D$ 或 $N_A<10^{16}\,\mathrm{cm^{-3}}$`],
      [R`$\mathrm{N}$ 或 $\mathrm{P}$`, R`$10^{16}<N_D$ 或 $N_A<10^{18}\,\mathrm{cm^{-3}}$`],
      [R`$\mathrm{N^{+}}$ 或 $\mathrm{P^{+}}$`, R`$10^{18}<N_D$ 或 $N_A<10^{20}\,\mathrm{cm^{-3}}$`],
      [R`$\mathrm{N^{++}}$ 或 $\mathrm{P^{++}}$`, R`$N_D$ 或 $N_A>10^{20}\,\mathrm{cm^{-3}}$`],
    ]} caption={R`掺杂轻重的习惯记号（近似约定）。即使是 $\mathrm{N^{++}}$，相对于 $5\times10^{22}\,\mathrm{cm^{-3}}$ 的晶格原子密度也通常不到 1%。`} />
    <Tx>{R`衡量材料导电能力的量是**电阻率** $\rho$（resistivity）。电子和空穴各自贡献一份电导：浓度乘以电荷再乘以**迁移率** $\mu$（mobility，单位电场下的漂移速度），两份相加取倒数：`}</Tx>
    <Eq n="A1.1" keyEq title="电阻率" say="电阻率是两种载流子电导之和的倒数：载流子越多、跑得越快，电阻率越低；实际上通常只有多子那一项起作用。">{R`\rho=\frac{1}{qn\mu_n+qp\mu_p}`}</Eq>
    <Tx>{R`轻掺杂硅中 $\mu_n\approx1400$、$\mu_p\approx470\,\mathrm{cm^2/V\,s}$；迁移率随温度、掺杂和电场而变（掺杂越重，离化杂质散射越强，迁移率越低）。N 型材料里 $n\gg p$，P 型里 $p\gg n$，所以式中一般只有一项重要。图 A1.6 就是假设杂质全部电离（N 型 $n=N_D$，P 型 $p=N_A$）后画出的硅的 $\rho$–$N$ 曲线；交互版用 \eqref{A1.1} 加一个常用的迁移率经验式重新计算，两者几乎重合。`}</Tx>
    <Figure n="A1.6" caption={R`硅的电阻率与掺杂浓度（N 型 As、P 型 B）。原书图引自 aplusphysics.com，假设杂质全部电离。交互版为本页重算。`} interactive={<ResistivityPlot />} />
    <Box kind="warning" title={R`勘误：图号`}>{R`原书在引入电阻率时两次写"Figure A1.7 的纵轴"和"Figure A1.7 中画的电阻率"，实际指的是图 A1.6（A1.7 是能带/键模型示意图）。本页已直接改正。`}</Box>
    <Box kind="aside" title="本页计算所用的迁移率">{R`下面的曲线是 Irvin 曲线查询器（\secref{A.8}）与图 A1.6 交互版共用的 300 K 迁移率模型。它不是原书内容，只是让"浏览器里真算"成为可能的经验输入。`}</Box>
    <MobilityPlot />
    <Tx>{R`化合物半导体还有更多掺杂选择。以 GaAs 为例：Zn 替换 Ga（少一个价电子）是 P 型；Se 替换 As（多一个价电子）是 N 型；Si 很有趣——替换 Ga 时是施主，替换 As 时是受主（称"两性杂质"）。当然，理论上可行的组合并不都实用。`}</Tx>
  </Sub>;
}

export function A1Bands() {
  return <Sub n="A.1.3" zh="能带模型" title="The band picture">
    <Tx>{R`键模型直观，但要定量计算就得换一种语言——**能带模型**（band model）。两者描述的是同一件事，只是角度不同；本书两种都用，哪个讲得清楚就用哪个。

能带图的纵轴是**电子的能量**。从键模型看，完美晶体中的电子要么被束缚在键上，要么是自由的，没有中间状态；把电子从键上"拔"出来需要一份确定的能量。能带图里就画成：束缚（成键）电子的能级在**价带顶** $E_V$ 以下，自由电子的能级在**导带底** $E_C$ 以上，二者之差 $E_G=E_C-E_V$ 是**禁带宽度**（bandgap），完美晶体在禁带中没有允许的能级。打断一根键＝把一个电子从价带"举"到导带，同时在价带留下一个空穴。`}</Tx>
    <Figure n="A1.7" caption={R`本征（未掺杂）半导体的能带模型（左）与键模型（右）。成键电子位于 $E_V$ 以下，自由电子位于 $E_C$ 以上；两图都表示了本征激发过程。自绘。`} illustration={<><FigA1_7 /><Legend /></>} />
    <Tx>{R`掺杂在能带图里表现为禁带中新出现的**杂质能级**。As 的第 5 个电子受到 As 原子核里多出的那个正电荷的吸引，但束缚很弱——它对成键没有用处。于是在紧贴 $E_C$ 下方画一条施主能级 $E_D$，$E_C-E_D$ 就是释放这个电子所需的能量。若 $E_C-E_D$ 很小（硅中几十 meV，而室温 $kT\approx26$ meV），称为**浅施主**（shallow donor）：除了极低温，热能总能把电子"踢"进导带，每个施主贡献一个自由电子，自身变成带正电的 $\mathrm{As^+}$：`}</Tx>
    <Eq n="A1.2" say="一个施主 As 原子电离：放出一个导带电子，自身留下带正电的 $\mathrm{As^+}$ 离子。">{R`\mathrm{As}\longrightarrow\mathrm{As^+}+\mathrm{e^-}\quad\text{or}\quad\mathrm{As}\longrightarrow\mathrm{As^+}+n`}</Eq>
    <Tx>{R`受主完全对称：B 引入紧贴 $E_V$ 上方的受主能级 $E_A$，$E_A-E_V$ 是空穴被 B 束缚的能量。一个常用的比喻是把空穴想成液体里的**气泡**：气泡总想往上浮，所以在能带图里空穴"往下走"反而需要能量——要把它从 $E_A$ "按"进价带，它才成为可动的正电载流子。浅受主在室温同样几乎全部电离，留下 $\mathrm{B^-}$：`}</Tx>
    <Eq n="A1.3" say="一个受主 B 原子电离：向价带放出一个空穴，自身带负电成为 $\mathrm{B^-}$。">{R`\mathrm{B}\longrightarrow\mathrm{B^-}+\mathrm{h^+}\quad\text{or}\quad\mathrm{B}\longrightarrow\mathrm{B^-}+p`}</Eq>
    <Figure n="A1.8" caption={R`掺杂半导体的能带模型与键模型（以硅为例）。$E_D$、$E_A$ 分别为施主与受主能级；两种模型中都画出了 N 型与 P 型掺杂。自绘。`} illustration={<FigA1_8 />} />
  </Sub>;
}

export function A1Stats() {
  return <Sub n="A.1.4" zh="态密度与费米–狄拉克统计" title="Density of states and Fermi–Dirac statistics">
    <Tx>{R`要从"图像"走到"数字"，需要回答两个问题：**(1) 每个能量上有多少个允许的电子态？(2) 每个态被电子占据的概率是多少？** 两者相乘再积分，就得到载流子浓度。

先说第一个。孤立原子的电子能级是分立的；许多原子远离时，它们的能级相同。把原子拉近组成晶体，泡利不相容原理要求同一量子态最多容纳一个电子，于是原本相同的能级**劈裂**成一大串靠得极近的能级——**能带**。离带边越远，能级越密。`}</Tx>
    <Figure n="A1.9" caption={R`能带是 $E_C$ 之上、$E_V$ 之下大量分立能级的集合；态密度 $D$ 随离开带边的距离而增大。自绘（右图按 $\sqrt{E-E_C}$ 精确作图）。`} illustration={<FigA1_9 />} />
    <Tx>{R`量子力学（把电子看成在边长 $L$ 的盒子里的自由粒子，只是质量换成"态密度有效质量"）给出带边附近的**态密度**（density of states）：`}</Tx>
    <Eq n="A1.4" keyEq title="导带态密度" say="导带底之上，单位体积、单位能量的允许态数随能量离开带边的平方根增长；有效质量越大，态越多。">{R`D_C(E)=\frac{4\pi}{h^3}\left(2m_e^*\right)^{3/2}(E-E_C)^{1/2},\quad E\ge E_C`}</Eq>
    <Eq n="A1.5" say="价带顶之下，空穴可用的态密度同样随离开带边的平方根增长。">{R`D_V(E)=\frac{4\pi}{h^3}\left(2m_h^*\right)^{3/2}(E_V-E)^{1/2},\quad E\le E_V`}</Eq>
    <Box kind="warning" title={R`勘误：式 (A1.4)(A1.5) 漏了因子 $2^{3/2}$`}>{R`原书印作 $D_C(E)=\dfrac{4\pi}{h^3}(m_e^*)^{3/2}(E-E_C)^{1/2}$（$D_V$ 同理），有效质量前缺了因子 2。正确形式应是 $(2m^*)^{3/2}$。

**依据**：把 \eqref{A1.4} 乘以 Boltzmann 因子积分必须得到原书自己的 \eqref{A1.10}：$\int_0^\infty\frac{4\pi}{h^3}(2m^*)^{3/2}\varepsilon^{1/2}e^{-\varepsilon/kT}d\varepsilon=\frac{4\pi}{h^3}(2m^*)^{3/2}\frac{\sqrt\pi}{2}(kT)^{3/2}=2\left(\frac{2\pi m^*kT}{h^2}\right)^{3/2}$，恰为 $N_C$；若按原书印的形式积分，会少一个 $2^{3/2}\approx2.83$ 的因子，硅室温 $N_C$ 将只有约 $1.1\times10^{19}$ 而不是表中的 $3.2\times10^{19}\,\mathrm{cm^{-3}}$。式中 $D$ 的单位是"每 $\mathrm{cm^3}$ 每 eV"。`}</Box>
    <Tx>{R`电子总是先填低能态：导带电子聚在 $E_C$ 附近，价带空穴（像气泡一样）"浮"在 $E_V$ 附近。

第二个问题由统计力学回答：能量为 $E$ 的态被电子占据的概率服从**费米–狄拉克分布**（Fermi–Dirac distribution）：`}</Tx>
    <Eq n="A1.6" keyEq title="费米–狄拉克分布" say="能量比费米能级高出几个 kT 的态几乎是空的，低出几个 kT 的几乎是满的；过渡区的宽度就是热能 kT。">{R`f(E)=\frac{1}{1+\exp\left(\frac{E-E_F}{kT}\right)}`}</Eq>
    <Tx>{R`其中 $E_F$ 是**费米能级**（Fermi level），按定义是 $f=1/2$ 的能量。0 K 时 $f$ 是阶跃函数：$E_F$ 以下全满、以上全空；温度升高，台阶被热能"抹平"，宽度约几个 $kT$。原书特意画了两条有工艺意义的曲线：300 K（器件工作温度）和 1273 K（$1000^\circ$C，典型工艺温度）——后者的过渡区宽得多。`}</Tx>
    <Figure n="A1.10" caption={R`电子占据能级 $E$ 的概率 $f(E)$：0 K、300 K、1273 K 三个温度（原书图的三条曲线），另加一条可调温度曲线及其 Boltzmann 近似。交互重绘。`} illustration={<FermiDiracPlot />} />
    <Tx>{R`当 $E-E_F$ 比 $kT$ 大好几倍时，分母里的指数远大于 1，"1+" 可以丢掉，分布退化为经典的 **Boltzmann 分布**：`}</Tx>
    <Eq n="A1.7" say="远高于费米能级的态，占据概率按指数衰减——每高出一个 kT，概率降为 1/e。">{R`f(E)\cong\exp\left(-\frac{E-E_F}{kT}\right)`}</Eq>
  </Sub>;
}

export function A1Carriers() {
  return <Sub n="A.1.5" zh="载流子浓度、质量作用定律与本征浓度" title="Carrier concentrations">
    <Tx>{R`现在把两件事乘起来。图 A1.11 把整个计算画成了一张图：最左是能带，接着是态密度 $D(E)$，然后是占据概率 $f(E)$，最右是二者的乘积——每个能量上真实存在的电子数（导带中，$D\cdot f$）和空穴数（价带中，$D\cdot(1-f)$）。禁带里没有态，所以乘积为零；离带边越远态越多，但 $f$ 衰减得更快，所以电子集中在 $E_C$ 上方一小段，空穴集中在 $E_V$ 下方一小段。未掺杂时 $f$ 在禁带中央附近等于 1/2，即 $E_F=E_i$。`}</Tx>
    <Figure n="A1.11" caption={R`态密度、占据概率与得到的电子、空穴分布（右图阴影的面积即 $n$ 与 $p$）。未掺杂时 $n=p=n_i$，$E_F=E_i$ 近似位于禁带中央。自绘，曲线按 $\sqrt{E}$ 与费米函数实际形状绘制（为看清把 $kT$ 放大）。`} illustration={<FigA1_11 />} />
    <Box kind="warning" title={R`勘误：引用的式号`}>{R`原书说 $D(E)$ "由式 A1.7 与 A1.8 画出"，又说连续分布"如式 A1.7 和 A1.8 所示"；态密度实际是 \eqref{A1.4} 与 \eqref{A1.5}。`}</Box>
    <Tx>{R`右图曲线下的面积就是总浓度。在 Boltzmann 近似下积分可以解析完成：`}</Tx>
    <Eq n="A1.8" keyEq title="电子浓度" say="导带电子数相当于在导带底放了 N_C 个能级、再乘以它们被占据的 Boltzmann 概率；费米能级每靠近导带一个 kT，电子浓度乘以 e。">{R`n=\int_{E_C}^{\infty}f(E)D(E)\,dE\cong N_C\exp\left(-\frac{E_C-E_F}{kT}\right)`}</Eq>
    <Eq n="A1.9" keyEq title="空穴浓度" say="价带空穴数相当于价带顶的 N_V 个能级乘以'空着'的概率；费米能级离价带越近，空穴越多。">{R`p=\int_{-\infty}^{E_V}\left[1-f(E)\right]D(E)\,dE\cong N_V\exp\left(-\frac{E_F-E_V}{kT}\right)`}</Eq>
    <Eq n="A1.10" say="有效态密度：把整条能带等效成带边上的一个能级时，这个能级的'容量'；它随 T 的 3/2 次方增大。">{R`N_C=2\left(\frac{2\pi m_e^*kT}{h^2}\right)^{3/2}\qquad N_V=2\left(\frac{2\pi m_h^*kT}{h^2}\right)^{3/2}`}</Eq>
    <Derivation collapsed title="补全：由 (A1.4)(A1.7) 积分得到 (A1.8)(A1.10)" steps={[
      { tex: R`n=\int_{E_C}^{\infty}\frac{4\pi}{h^3}(2m_e^*)^{3/2}(E-E_C)^{1/2}\,e^{-(E-E_F)/kT}\,dE`, why: R`代入 \eqref{A1.4} 与 Boltzmann 近似 \eqref{A1.7}` },
      { tex: R`=\frac{4\pi}{h^3}(2m_e^*)^{3/2}e^{-(E_C-E_F)/kT}\,(kT)^{3/2}\int_0^\infty u^{1/2}e^{-u}\,du`, why: R`令 $u=(E-E_C)/kT$，把与 $E$ 无关的因子提出` },
      { tex: R`\int_0^\infty u^{1/2}e^{-u}du=\Gamma(3/2)=\frac{\sqrt\pi}{2}`, why: "Gamma 函数" },
      { tex: R`n=\underbrace{2\left(\frac{2\pi m_e^*kT}{h^2}\right)^{3/2}}_{N_C}\exp\left(-\frac{E_C-E_F}{kT}\right)`, why: R`整理：$4\pi\cdot2^{3/2}\cdot\tfrac{\sqrt\pi}{2}=2(2\pi)^{3/2}$。空穴同理得 $N_V$` },
    ]} />
    <Tx>{R`$N_C$、$N_V$ 称为导带、价带的**有效态密度**（effective density of states），硅室温约 $3.2\times10^{19}$ 与 $1.8\times10^{19}\,\mathrm{cm^{-3}}$。

**适用条件要记牢**：上面用了 Boltzmann 近似，要求 $E_F$ 离 $E_C$、$E_V$ 以及禁带中任何允许能级都至少有几个 $kT$。三种情况会破坏它：低温下杂质没有全电离、$E_F$ 靠近 $E_D$ 或 $E_A$；掺杂超过约 $10^{19}\,\mathrm{cm^{-3}}$（硅），$E_F$ 进入导带或价带——这样的材料叫**简并**（degenerate）半导体，行为更像金属；以及深能级杂质。本书多数地方用 \eqref{A1.8}\eqref{A1.9} 这对简单结果，例外情况在 \secref{A.1.7} 处理。

把两式相乘，$E_F$ 消掉了：`}</Tx>
    <Eq n="A1.11" keyEq title="质量作用定律" say="平衡时电子浓度与空穴浓度的乘积是个只取决于材料和温度的常数：一种载流子增多，另一种必然减少。">{R`np=n_i^2`}</Eq>
    <Tx>{R`未掺杂时 $n=p=n_i$，所以乘积就是 $n_i^2$；而由于 $E_F$ 已经消去，**这个关系对掺杂材料同样成立**——这就是**质量作用定律**（law of mass action）。物理上，产生（断键）与复合（电子遇到空穴）一刻不停地进行，达到动态平衡；掺入施主使电子增多，电子与空穴相遇而复合的机会变大，空穴就被"压"下去。写出乘积的具体形式：`}</Tx>
    <Eq n="A1.12" keyEq title="本征载流子浓度" say="$n_i^2$ 等于两个有效态密度之积乘以 exp(−E_G/kT)：禁带越宽、温度越低，本征载流子就越少；右边是硅的实用近似式。">{R`np=n_i^2=N_CN_V\exp\left(-\frac{E_G}{kT}\right)\cong1.52\times10^{33}\,T^3\exp\left(-\frac{1.21\eV}{kT}\right)`}</Eq>
    <Tx>{R`右端是硅的近似式（$T$ 以 K 计，结果单位 $\mathrm{cm^{-6}}$）：$T^3$ 来自 $N_CN_V\propto T^3$，1.21 eV 是把带隙随温度的线性下降外推到 0 K 的"有效"值。用它算：300 K 时 $n_i\approx1.4\times10^{10}$，1273 K 时 $n_i\approx7.1\times10^{18}\,\mathrm{cm^{-3}}$。

Table A1.1 给出了几种常用半导体的参数拟合式，图 A1.4 就是用它们画的。这些式子是为了在**很宽**的温度范围内大致适用而拟合的，所以算出的数只是近似。`}</Tx>
    <Table head={["材料", "$E_G$ (eV)", "$N_C$ ($\\mathrm{cm^{-3}}$)", "$N_V$ ($\\mathrm{cm^{-3}}$)", "室温 $n_i$"]} rows={[
      ["Si", R`$1.17-4.73\times10^{-4}\dfrac{T^2}{T+636}$`, R`$6.2\times10^{15}T^{1.5}$`, R`$3.5\times10^{15}T^{1.5}$`, R`$1.45\times10^{10}\,\mathrm{cm^{-3}}$`],
      ["Ge", R`$0.742-4.8\times10^{-4}\dfrac{T^2}{T+235}$`, R`$1.98\times10^{15}T^{1.5}$`, R`$9.6\times10^{14}T^{1.5}$`, R`$2.1\times10^{13}\,\mathrm{cm^{-3}}$`],
      ["GaAs", R`$1.52-5.41\times10^{-4}\dfrac{T^2}{T+204}$`, R`$8.63\times10^{13}T^{1.5}$`, R`$1.83\times10^{15}T^{1.5}$`, R`$1.0\times10^{6}\,\mathrm{cm^{-3}}$`],
      ["4H SiC", R`$3.63-6.5\times10^{-4}\dfrac{T^2}{T+1300}$`, R`$1.83\times10^{15}T^{1.5}$`, R`$1.83\times10^{15}T^{1.5}$`, R`$1.6\times10^{-8}\,\mathrm{cm^{-3}}$`],
      ["GaN", R`$3.47-7.7\times10^{-4}\dfrac{T^2}{T+600}$`, R`$4.3\times10^{14}T^{1.5}$`, R`$8.9\times10^{15}T^{1.5}$`, R`$3.3\times10^{-10}\,\mathrm{cm^{-3}}$`],
    ]} caption={R`Table A1.1　几种半导体的带隙、有效态密度与室温本征浓度（$T$ 以 K 计）。`} />
    <Tx>{R`带隙随温度升高而**缩小**：受热膨胀使原子间距变大、共价键变弱，断键更容易，$n_i$ 更大。下面的计算器同时给出拟合式算出的 $n_i$ 和表中列出的室温值，方便对照。`}</Tx>
    <NiCalc />
    <Box kind="warning" title={R`存疑：Table A1.1 的"室温 $n_i$"列与拟合式不完全自洽`}>{R`把表中的 $E_G$、$N_C$、$N_V$ 拟合式在 300 K 代入 $n_i=\sqrt{N_CN_V}\,e^{-E_G/2kT}$：Si 得 $8.7\times10^{9}$（表列 $1.45\times10^{10}$，后者是本书一贯使用的经典值；近年更精确的测量值约 $9.7\times10^{9}$）；Ge $2.0\times10^{13}$（表列 $2.1\times10^{13}$，一致）；GaAs $2.3\times10^{6}$（表列 $1.0\times10^{6}$）；GaN $3.2\times10^{-10}$（一致）；**4H-SiC 只得 $6\times10^{-12}$，与表列 $1.6\times10^{-8}$ 差三个多数量级**。这些量级上的差别对器件工作温度下的计算有影响，对工艺温度（$n_i$ 很大时）影响不大。本页保留原表数值，计算一律用拟合式，并在计算器中把两者并列。`}</Box>
    <Tx>{R`还有一个修正要知道：掺杂浓度超过约 $10^{19}\,\mathrm{cm^{-3}}$ 时，杂质原子彼此靠得足够近，会相互作用并改变晶格本身，常见结果是带隙变窄、$n_i$ 增大——称**重掺杂效应**（heavy doping effects），用 \eqref{A1.12} 算出的 $n_i$ 要相应修正。

最后，把 \eqref{A1.8}\eqref{A1.9} 与 \eqref{A1.12} 联立，以未掺杂时的费米能级 $E_i$（本征能级）为参考点，可以写出一对极常用的形式：`}</Tx>
    <Eq n="A1.13" keyEq title="以 E_i 为参考的电子浓度" say="费米能级每比本征能级高一个 kT，电子浓度就是 n_i 的 e 倍。">{R`n=n_i\exp\left(\frac{E_F-E_i}{kT}\right)`}</Eq>
    <Eq n="A1.14" say="费米能级每比本征能级低一个 kT，空穴浓度就是 n_i 的 e 倍。">{R`p=n_i\exp\left(\frac{E_i-E_F}{kT}\right)`}</Eq>
    <Derivation collapsed title={R`补全：(A1.13) 的来历以及 $E_i$ 的位置`} steps={[
      { tex: R`n_i=N_C\exp\left(-\frac{E_C-E_i}{kT}\right)`, why: R`本征时 $E_F=E_i$、$n=n_i$，代入 \eqref{A1.8}` },
      { tex: R`n=N_C e^{-(E_C-E_F)/kT}=N_C e^{-(E_C-E_i)/kT}\,e^{(E_F-E_i)/kT}=n_i\,e^{(E_F-E_i)/kT}`, why: R`在指数中插入 $\pm E_i$；空穴同理得 \eqref{A1.14}` },
      { tex: R`E_i=\frac{E_C+E_V}{2}+\frac{kT}{2}\ln\frac{N_V}{N_C}`, why: R`令 \eqref{A1.8}\eqref{A1.9} 相等解出 $E_i$：因为 $N_C\ne N_V$，$E_i$ 略偏离禁带正中（硅中约低 0.01 eV），所以原书说"近似"位于中央` },
    ]} />
    <Tx>{R`这两个式子说的是：$n$ 增大，$E_F$ 就上移到 $E_i$ 之上；$p$ 增大，$E_F$ 下移。因此能带图里**费米能级的位置本身就是掺杂类型和轻重的直观标尺**：越靠近 $E_C$，N 型越重；越靠近 $E_V$，P 型越重。由于 $np=n_i^2$，N 型材料中空穴浓度相应变小，P 型反之。`}</Tx>
    <Figure n="A1.12" caption={R`本征（左）、N 型（中）、P 型（右）材料中的费米能级：N 型 $E_F$ 在禁带中线之上，P 型在之下。自绘。`} illustration={<FigA1_12 />} />
  </Sub>;
}
