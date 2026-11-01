// A.2–A.11：词头、换算、常数、硅与绝缘体性质、SiO2 色表、Irvin 曲线、误差函数、符号表、缩写表。
import { Sec, Tx, Eq, Box, Figure, Table, Details } from "@kit";
import { SearchTable, OxideColorChart, OxideColorTable, OxideReflectancePlot, IrvinTool, ErfCalc, ErfPlot, ErfTable } from "./_appA_tools.jsx";

const R = String.raw;

export function SecA2() {
  return <Sec n="A.2" title="Standard Prefixes" zh="标准词头" gist="国际单位制的十进制词头，从 $10^{12}$ 到 $10^{-15}$。" why="工艺参数横跨约 30 个数量级（fA 漏电流到 THz 频率、fs 激光到 Tb 存储），读数时词头一错就是三个数量级。">
    <Table head={["词头", "符号", "数值"]} rows={[
      ["tera-（太）", "T-", "$10^{12}$"], ["giga-（吉）", "G-", "$10^{9}$"], ["mega-（兆）", "M-", "$10^{6}$"], ["kilo-（千）", "k-", "$10^{3}$"],
      ["milli-（毫）", "m-", "$10^{-3}$"], ["micro-（微）", "$\\mu$-", "$10^{-6}$"], ["nano-（纳）", "n-", "$10^{-9}$"], ["pico-（皮）", "p-", "$10^{-12}$"], ["femto-（飞）", "f-", "$10^{-15}$"],
    ]} />
  </Sec>;
}

export function SecA3() {
  return <Sec n="A.3" title="Useful Conversions" zh="常用换算" gist="压强、能量、力、电学量、长度与温度在 SI 与 cgs/工程单位之间的换算。" why="本书混用 cm–g–s、eV、torr、cal 等单位（例如 Deal–Grove 常数用 µm 与 h，气体动力学用 torr，热力学用 cal/mol），换算是日常操作。">
    <SearchTable head={["换算关系"]} placeholder="搜索单位，如 torr、eV、dyne" rows={[
      ["1 atm = 760 torr（精确）"], ["1 atm = $1.013\\times10^{5}$ Pa"], ["1 Pa = 1 $\\mathrm{J\\,m^{-3}}$ = 10 $\\mathrm{dyne\\,cm^{-2}}$；1 MPa = $10^{7}$ $\\mathrm{dyne\\,cm^{-2}}$"],
      ["1 eV = $1.60219\\times10^{-19}$ J"], ["1 cal = 4.184 J"], ["1 J = $10^{7}$ erg"], ["1 erg = $2.39\\times10^{-8}$ cal"], ["1 N = 1 $\\mathrm{J\\,m^{-1}}$ = $10^{5}$ dyne"],
      ["1 V = 1 ohm·amp"], ["1 J = 1 volt·coulomb = 1 coulomb·amp·ohm"], ["1 J = $10^{7}$ dyne·cm"], ["1 coulomb = 1 amp·sec = 1 farad·volt"], ["1 amp = 1 farad·volt·$\\mathrm{sec^{-1}}$"],
      ["1 nm = $10^{-3}$ $\\mu$m = $10^{-7}$ cm = $10^{-9}$ m = 10 Å"], ["T(K) = T(°C) + 273.15"],
    ]} />
    <Box kind="note" title="两个最常用的换算">{R`(1) **热能尺度**：$kT$ 在 300 K 为 0.0259 eV，在 $1000^\circ$C（1273 K）为 0.110 eV——工艺温度下 $kT$ 是室温的 4 倍多，所有 $e^{-E/kT}$ 型的激活过程（扩散、氧化、$n_i$）都因此快上许多个数量级。(2) **气体常数**：$R=N_{AV}k$，所以 $1\,\mathrm{eV}$/粒子 $=96.5\,\mathrm{kJ/mol}=23.06\,\mathrm{kcal/mol}$，文献里以 kcal/mol 给出的激活能除以 23.06 就是 eV。`}</Box>
  </Sec>;
}

export function SecA4() {
  return <Sec n="A.4" title="Physical Constants" zh="物理常数" gist="本书计算中用到的基本物理常数（cgs 与 eV 混合单位）。" why="附录 A.1 的所有公式（$kT$、$N_C$、$\rho$）和各章的数值例题都要用到这些数。">
    <SearchTable head={["物理量", "符号", "数值"]} placeholder="搜索常数" rows={[
      ["阿伏伽德罗常数 Avogadro constant", "$N_{AV}$", "$6.022\\times10^{23}\\ \\mathrm{mole^{-1}}$"],
      ["玻尔兹曼常数 Boltzmann constant", "$k$", "$1.381\\times10^{-23}\\ \\mathrm{J\\,K^{-1}}=8.617\\times10^{-5}\\ \\mathrm{eV\\,K^{-1}}$"],
      ["电子电荷 Electron charge", "$q$", "$1.602\\times10^{-19}$ C"],
      ["电子静止质量 Electron rest mass", "$\\sym{me0}{m_e}$", "$9.1\\times10^{-28}$ g"],
      ["气体常数 Gas constant", "$R$", "$1.987\\ \\mathrm{cal\\,mole^{-1}\\,K^{-1}}$"],
      ["真空介电常数 Permittivity in vacuum", "$\\varepsilon_0$", "$8.854\\times10^{-14}\\ \\mathrm{F\\,cm^{-1}}$"],
      ["普朗克常数 Planck constant", "$h$", "$6.626\\times10^{-34}$ J sec $=4.136\\times10^{-15}$ eV sec"],
      ["真空光速 Speed of light in vacuum", "$c$", "$2.998\\times10^{10}\\ \\mathrm{cm\\,sec^{-1}}$"],
      ["300 K 热电压 Thermal voltage at 300 K", "$kT/q$", "0.0259 V"],
    ]} />
  </Sec>;
}

export function SecA5() {
  return <Sec n="A.5" title="Physical Properties of Silicon" zh="硅的物理性质" gist="硅的电学、热学、力学与晶体学常数一览。" why="热预算计算用比热与热导率，应力计算用杨氏模量与热膨胀系数，器件估算用迁移率、$N_C$、$N_V$、$n_i$——这张表在全书反复出现。">
    <SearchTable head={["性质", "数值"]} placeholder="搜索性质，如 mobility、热、lattice" rows={[
      ["300 K 禁带宽度 Bandgap", "1.107 eV"],
      ["300 K 电子（多子）迁移率", "1400 $\\mathrm{cm^2\\,volt^{-1}\\,sec^{-1}}$"],
      ["300 K 空穴（多子）迁移率", "470 $\\mathrm{cm^2\\,volt^{-1}\\,sec^{-1}}$"],
      ["晶体结构 Crystal structure", "立方金刚石 Cubic diamond"],
      ["熔点 Melting point", "1417 °C"],
      ["密度 Density", "2.328 $\\mathrm{g\\,cm^{-3}}$"],
      ["300 K 热导率 $k_S$", "0.358 cal $(\\mathrm{sec\\,cm\\,{}^\\circ C})^{-1}$"],
      ["熔化潜热 Latent heat of fusion", "340 $\\mathrm{cal\\,g^{-1}}$"],
      ["线膨胀系数 $\\Delta L/(L\\,\\Delta T)$", "$2.6\\times10^{-6}\\ {}^\\circ\\mathrm{C^{-1}}$"],
      ["杨氏模量 Young's modulus", "$Y_{100}=1.3\\times10^{12}$，$Y_{111}=1.9\\times10^{12}\\ \\mathrm{dyne\\,cm^{-2}}$"],
      ["晶格常数 Lattice constant", "0.5431 nm"],
      ["比热 Specific heat", "0.7 $\\mathrm{J\\,g^{-1}\\,{}^\\circ C^{-1}}$"],
      ["热扩散率 Thermal diffusivity", "0.92 $\\mathrm{cm^2\\,sec^{-1}}$"],
      ["原子密度 Atomic density", "$5\\times10^{22}\\ \\mathrm{cm^{-3}}$"],
      ["原子量 Atomic weight", "28.09"],
      ["击穿场强 Breakdown field", "约 $3\\times10^{5}\\ \\mathrm{V\\,cm^{-1}}$"],
      ["价带有效态密度 $N_V$", "$1.8\\times10^{19}\\ \\mathrm{cm^{-3}}$"],
      ["导带有效态密度 $N_C$", "$3.2\\times10^{19}\\ \\mathrm{cm^{-3}}$"],
      ["电子态密度有效质量 $m_e^*$", "$1.08\\,\\sym{me0}{m_e}$（$\\sym{me0}{m_e}=9.1\\times10^{-28}$ g）"],
      ["空穴态密度有效质量 $m_p^*$", "$0.81\\,\\sym{me0}{m_e}$"],
      ["电子峰值（饱和）速度 $v_{SAT}$", "$1\\times10^{7}\\ \\mathrm{cm\\,sec^{-1}}$"],
      ["空穴峰值（饱和）速度 $v_{SAT}$", "$1\\times10^{7}\\ \\mathrm{cm\\,sec^{-1}}$"],
      ["电子亲和能 Electron affinity $\\chi$", "4.05 eV"],
      ["25 °C 本征载流子浓度 $n_i$", "$1.45\\times10^{10}\\ \\mathrm{cm^{-3}}$"],
      ["本征电阻率 Intrinsic resistivity", "$2.3\\times10^{5}\\ \\mathrm{\\Omega}\\,\\mathrm{cm}$"],
      ["相对介电常数 Relative permittivity", "11.9"],
    ]} />
    <Box kind="note" title="自洽性检查">{R`几项可以互相验证：本征电阻率 $\rho_i=1/[qn_i(\mu_n+\mu_p)]=1/[(1.602\times10^{-19})(1.45\times10^{10})(1870)]=2.3\times10^5\,\mathrm{\Omega}\,\mathrm{cm}$，与表一致；由 $m_e^*=1.08\sym{me0}{m_e}$ 代入 \eqref{A1.10} 得 300 K 的 $N_C=2.8\times10^{19}$，与表列 $3.2\times10^{19}$ 同量级；由 $m_h^*=0.81\sym{me0}{m_e}$ 得 $N_V=1.8\times10^{19}$，与表一致。表中 300 K 带隙 1.107 eV 与 Table A1.1 拟合式给出的 1.12 eV 略有差别——不同文献的取值，量级上无影响。`}</Box>
  </Sec>;
}

export function SecA6() {
  return <Sec n="A.6" title="Properties of Insulators Used in Semiconductor Technology" zh="硅工艺中绝缘体的性质" gist="$\mathrm{SiO_2}$、$\mathrm{Si_3N_4}$ 与 $\mathrm{SiO_xN_y}$ 的电学、光学、力学与刻蚀性质对比。" why="选介质就是在介电常数、击穿场强、应力、刻蚀选择比之间做取舍：例如氮化硅在 BHF 中的刻蚀速率比 $\mathrm{SiO_2}$ 慢约 100 倍，所以它是 LOCOS 和 CMP 的理想掩蔽 / 停止层。">
    <SearchTable head={["性质", "$\\mathrm{SiO_2}$", "$\\mathrm{Si_3N_4}$", "$\\mathrm{SiO_xN_y}$"]} placeholder="搜索性质，如 etch、refractive" rows={[
      ["结构 Structure", "非晶", "非晶", "非晶"],
      ["电阻率 ($\\mathrm{\\Omega}\\,$cm)", "$10^{14}$–$10^{16}$", "约 $10^{14}$", ""],
      ["密度 ($\\mathrm{g/cm^3}$)", "2.27", "3.1", ""],
      ["介电常数 $K$", "3.8–3.9", "7.5", "5–6"],
      ["介电强度 ($\\mathrm{V\\,cm^{-1}}$)", "$5$–$10\\times10^{6}$", "约 $10^{7}$", "约 $5\\times10^{6}$"],
      ["禁带宽度 (eV)", "约 9", "约 5", ""],
      ["膨胀系数 (${}^\\circ\\mathrm{C^{-1}}$)", "$5\\times10^{-7}$", "", ""],
      ["折射率 Refractive index", "1.46", "2.05", "1.6–1.9"],
      ["薄膜应力 ($\\mathrm{dyne\\,cm^{-2}}$)", "$2$–$4\\times10^{9}$", "$9$–$10\\times10^{9}$", "$1$–$6\\times10^{9}$"],
      ["热导率 (W/cm °C)", "0.014", "", ""],
      ["红外吸收峰 ($\\mu$m)", "9.3", "11.5–12", "9–12"],
      ["缓冲 HF 刻蚀速率 (nm/min)", "100", "0.5–1", "2–40"],
      ["熔点 (°C)", "约 1700", "", ""],
      ["电子迁移率 ($\\mathrm{cm^2\\,V^{-1}\\,s^{-1}}$)", "20–40", "", ""],
      ["空穴迁移率 ($\\mathrm{cm^2\\,V^{-1}\\,s^{-1}}$)", "约 $2\\times10^{-5}$", "", ""],
      ["表面电阻率 ($\\mathrm{\\Omega}/\\square$)", "$10^{16}$–$10^{19}$", "", ""],
    ]} />
  </Sec>;
}

export function SecA7() {
  return <Sec n="A.7" title="Color Chart for Thermally Grown SiO2 Films Observed Perpendicularly Under Daylight Fluorescent Lighting" zh="热生长 $\mathrm{SiO_2}$ 薄膜颜色–厚度对照表（日光型荧光灯下垂直观察）"
    gist="氧化层的颜色来自薄膜干涉：厚度决定哪些波长被反射相消，从而用肉眼就能把厚度估到几十纳米。" why="在没有椭偏仪的场合（或作为椭偏结果的快速核对），工程师看一眼片子的颜色就能判断氧化是否大致到位；颜色随厚度周期性重复，所以还要知道是第几'级'。">
    <Tx>{R`光从空气射到氧化层上，一部分在 空气/$\mathrm{SiO_2}$ 界面反射，一部分穿过氧化层在 $\mathrm{SiO_2}$/Si 界面反射；两束光的光程差为 $2n_{ox}x_{ox}$（正入射）。两次反射都是从低折射率到高折射率，各有一个半波损失，相互抵消，所以反射**相消**（颜色"被拿走"）的条件是`}</Tx>
    <Eq say="当氧化层往返光程等于半整数个波长时，这种颜色的光在反射中相消；被拿走的颜色决定了我们看到的补色。">{R`2n_{ox}x_{ox}=\left(m+\tfrac12\right)\lambda,\qquad m=0,1,2,\dots`}</Eq>
    <Tx>{R`例如 $x_{ox}=310$ nm、$n_{ox}\approx1.46$：$m=1$ 时 $\lambda\approx604$ nm（橙红被拿走），剩下的光偏蓝——原书表中 310 nm 正是"Blue"。厚度每增加约 $\lambda/2n_{ox}\approx190$ nm，同一种相消就重复一次，颜色序列（紫→蓝→绿→黄→橙→红紫）循环出现，每一轮叫一个**级次**（order）。级次越高，可见区内同时出现的相消波长越多，颜色越淡、越难分辨。

下面的交互色卡用完整的三层膜反射公式（含 Si 的复折射率与 $\mathrm{SiO_2}$ 的色散）在浏览器里计算反射谱，再用 CIE 色匹配函数换算成屏幕颜色，与原书色表逐条对照。`}</Tx>
    <OxideColorChart />
    <OxideReflectancePlot />
    <Tx>{R`**原书色表**（可搜索；"计算色"一栏为本页按上述模型算出的近似颜色，"级次"为按 550 nm 相消计数的计算定义）：`}</Tx>
    <OxideColorTable />
    <Box kind="warning" title="使用色表的注意事项">{R`(1) 颜色随观察角变化（斜看时等效光程变短，颜色向"更薄"的方向移动），所以要**垂直观察**；(2) 光源不同颜色也不同，原表对应日光型荧光灯；(3) 同一颜色在不同级次重复出现，必须结合工艺预期（或在片子边缘逐渐变薄处数色环）确定级次；(4) 对 $\mathrm{Si_3N_4}$ 等其他介质，要按折射率换算（$n=2.05$ 时同样颜色对应的厚度约为氧化层的 $1.46/2.05\approx0.71$ 倍），不能直接套用此表。屏幕上的计算颜色只是近似。`}</Box>
  </Sec>;
}

export function SecA8() {
  return <Sec n="A.8" title="Irvin Curves" zh="Irvin 曲线" gist="把扩散层的方块电阻乘结深换算成平均电导率，再由表面浓度与衬底掺杂读出（或反推）分布参数。"
    why="四探针只测得到方块电阻 $\rho_S$，结深可用磨角染色测出；Irvin 曲线把这两个易测量与看不见的表面浓度 $C_S$ 联系起来，是第 7 章扩散工艺表征的标准工具。">
    <Tx>{R`对一个从表面向下扩散、与衬底（浓度 $C_B$，类型相反）形成结的掺杂层，它的**方块电阻**只取决于从表面到结深 $x_j$ 之间的导电能力。定义该层的**平均电导率**（有效电导率）：`}</Tx>
    <Eq say="扩散层的平均电导率等于把每一深度的局部电导率从表面积分到结深再除以结深；局部电导率用净载流子浓度和由总杂质浓度决定的迁移率算出。">{R`\bar\sigma=\frac{1}{\rho_Sx_j}=\frac{1}{x_j}\int_0^{x_j}q\,\mu\big(N(x)+C_B\big)\,\big[N(x)-C_B\big]\,dx`}</Eq>
    <Tx>{R`这里假设杂质全电离，载流子浓度取净掺杂 $N(x)-C_B$，而迁移率由**总**杂质浓度 $N(x)+C_B$ 决定（离化杂质都会散射载流子）。只要分布的**形状**给定——恒定表面源扩散的 erfc 型 $N=C_S\,\mathrm{erfc}(x/2\sqrt{Dt})$，或限定源扩散的 Gauss 型 $N=C_S\exp(-x^2/4Dt)$——积分结果只依赖 $C_S$ 与 $C_B$，与 $Dt$ 无关（$\sqrt{Dt}$ 同时缩放 $x_j$ 和分母）。于是可以把 $\bar\sigma$ 画成 $C_S$ 的函数、以 $C_B$ 为参数，这就是 Irvin（1962）的四组曲线：N 型 / P 型 × erfc / Gauss。

**用法**：测得 $\rho_S$ 与 $x_j$ → 算 $\bar\sigma=1/(\rho_Sx_j)$ → 在对应类型、分布、$C_B$ 的曲线上读出 $C_S$。反过来，给定设计的 $C_S$ 与 $x_j$ 也能预估 $\rho_S$。`}</Tx>
    <IrvinTool />
    <Figure n="A8.1" caption="Irvin 曲线：N 型 erfc 扩散分布。原书图。" />
    <Figure n="A8.2" caption="Irvin 曲线：P 型 erfc 扩散分布。原书图。" />
    <Box kind="warning" title="勘误：图号">{R`原书第 605 页上下两幅图的图注都印成"Figure A8.1"；第二幅（P 型 erfc）应为图 A8.2，与第 606 页的 A8.3、A8.4 连续编号。`}</Box>
    <Figure n="A8.3" caption="Irvin 曲线：N 型 Gauss 扩散分布。原书图。" />
    <Figure n="A8.4" caption="Irvin 曲线：P 型 Gauss 扩散分布。原书图。" />
    <Details summary="读图练习（自拟）">{R`某 P 型衬底（$C_B=10^{16}\,\mathrm{cm^{-3}}$）上做磷的恒定表面源扩散（erfc），四探针测得 $\rho_S=20\,\mathrm{\Omega}/\square$，染色测得 $x_j=1\,\mu$m。求表面浓度。

**解**：$\bar\sigma=1/(\rho_Sx_j)=1/(20\times10^{-4})=500\,(\mathrm{\Omega}\,\mathrm{cm})^{-1}$。在图 A8.1 的 $C_B=10^{16}$ 曲线上读得 $C_S\approx2$–$3\times10^{20}\,\mathrm{cm^{-3}}$。在上面的查询器中选"N 型、erfc"，把 $C_S$ 调到使 $\rho_S$ 显示约 20 $\mathrm{\Omega}/\square$ 处，得到约 $3\times10^{20}$（迁移率模型不同带来的差别在预期之内）。`}</Details>
  </Sec>;
}

export function SecA9() {
  return <Sec n="A.9" title="Error Function" zh="误差函数" gist="erf 与 erfc 的定义、性质、近似式和数值表——恒定表面源扩散的解就是 erfc。"
    why="第 7 章恒定表面浓度扩散 $C(x,t)=C_S\,\mathrm{erfc}(x/2\sqrt{Dt})$、第 8 章注入分布的积分、第 5 章光刻胶模型都离不开它。">
    <Figure n="A9.1" caption={R`误差函数 $\mathrm{erf}(x)$。交互版另画出 $\mathrm{erfc}$ 与导数；"原书图"为原图。`} interactive={<ErfPlot />} />
    <Tx>{R`**定义**：`}</Tx>
    <Eq say="误差函数是标准高斯曲线从 0 到 x 下的面积（归一化使 x 趋于无穷时为 1）。">{R`\mathrm{erf}(x)=\frac{2}{\sqrt\pi}\int_0^x\exp(-\eta^2)\,d\eta`}</Eq>
    <Eq say="余误差函数是从 x 到无穷的那部分面积；在扩散中它描述恒定表面源下杂质浓度随深度的衰减。">{R`\mathrm{erfc}(x)=1-\mathrm{erf}(x)=\frac{2}{\sqrt\pi}\int_x^\infty\exp(-\eta^2)\,d\eta`}</Eq>
    <Tx>{R`**性质**：奇函数 $\mathrm{erf}(-x)=-\mathrm{erf}(x)$，因而 $\mathrm{erf}(0)=0$；$\mathrm{erf}(\infty)=1$，因而 $\mathrm{erf}(-\infty)=-1$。导数是高斯函数：`}</Tx>
    <Eq say="误差函数的导数就是高斯函数——所以 erfc 分布的浓度梯度（扩散通量）在表面最大、随深度按高斯衰减。">{R`\frac{d}{dx}\mathrm{erf}(x)=\frac{2}{\sqrt\pi}\exp(-x^2)`}</Eq>
    <Tx>{R`**近似式**（来自 NBS《Handbook of Mathematical Functions》，1964）：对 $x\ge0$ 误差小于 4%：`}</Tx>
    <Eq say="一个只用指数和平方根就能算的 erfc 近似，在 x 从 0 到无穷整个范围内误差都在几个百分点以内。">{R`\mathrm{erfc}(x)\approx\frac{1.1\exp(-x^2)}{|x|+\sqrt{x^2+1.21}}`}</Eq>
    <Tx>{R`**渐近式**：`}</Tx>
    <Eq say="x 很大时，erfc 比单纯的高斯衰减还要多除以 $x\sqrt\pi$；也就是 erf 以这个速度逼近 1。">{R`\mathrm{erfc}(x)\longrightarrow\frac{\exp(-x^2)}{x\sqrt\pi}\quad\left(\text{即 }\mathrm{erf}(x)\to1-\frac{\exp(-x^2)}{x\sqrt\pi}\right)\quad\text{for }x\gg1`}</Eq>
    <Eq say="x 很小时，erf 近似是一条斜率为 $2/\sqrt\pi$ 的直线。">{R`\mathrm{erf}(x)\longrightarrow\frac{2x}{\sqrt\pi}\quad\text{for }x\ll1`}</Eq>
    <Box kind="warning" title="勘误：大 x 渐近式">{R`原书写作 "$\mathrm{erf}(x)\to\dfrac{\exp(-x^2)}{2\sqrt\pi}$ for $x\gg1$"。这显然不对：$x\gg1$ 时 $\mathrm{erf}(x)\to1$，而右边趋于 0；分母也不对。正确的是 $\mathrm{erfc}(x)\to e^{-x^2}/(x\sqrt\pi)$（对 erfc 的积分做一次分部积分即得）。例如 $x=3$：渐近式给 $2.33\times10^{-5}$，精确值 $2.21\times10^{-5}$，误差约 5%；$x$ 越大越准。另外原书小 $x$ 式漏写了"$x$"（"for $\ll1$"）。`}</Box>
    <Box kind="note" title="近似式的适用范围">{R`原书近似式含 $|x|$，但它只对 $x\ge0$ 有效（$x\to-\infty$ 时它趋于 0，而真实的 $\mathrm{erfc}\to2$）。负自变量请用 $\mathrm{erfc}(-x)=2-\mathrm{erfc}(x)$。`}</Box>
    <ErfCalc />
    <Tx>{R`**数值表**（$z$ 从 0.00 到 3.00，步长 0.01）：`}</Tx>
    <ErfTable />
  </Sec>;
}

const SYMBOLS = [
  ["$A$", "面积", "$\\mathrm{cm^2}$"], ["$C$", "电容", "F（法拉）"], ["$C$", "浓度", "$\\mathrm{cm^{-3}}$"], ["$D$", "扩散系数（实验测得）", "$\\mathrm{cm^2\\,sec^{-1}}$"],
  ["$d$", "可动物种的扩散系数", "$\\mathrm{cm^2\\,sec^{-1}}$"], ["$E$", "能量", "eV"], ["$F$", "通量", "$\\mathrm{cm^{-2}\\,sec^{-1}}$"], ["$F_{min}$", "最小特征尺寸", "nm"],
  ["$I$", "电流", "A"], ["$I$", "光强", "$\\mathrm{J\\,cm^{-2}\\,sec^{-1}}$"], ["$I$", "间隙原子（未注明时指 Si 自间隙）", ""], ["$J$", "电流密度", "$\\mathrm{A\\,cm^{-2}}$"],
  ["$K$", "相对介电常数", "无量纲"], ["$m$", "质量", "g"], ["$n$", "电子浓度", "$\\mathrm{cm^{-3}}$"], ["$n$", "折射率", "无量纲"], ["$N$", "密度", "$\\mathrm{atoms\\,cm^{-3}}$"],
  ["$P$", "压强", "atm 或 torr"], ["$Q$", "剂量", "$\\mathrm{cm^{-2}}$"], ["$R$", "电阻", "$\\mathrm{\\Omega}$"], ["$t$", "时间", "sec"], ["$T$", "温度", "K（注明 °C 者除外）"],
  ["$v$", "速度", "$\\mathrm{cm\\,sec^{-1}}$"], ["$v$", "沉积或刻蚀速率（表面推进速度）", "$\\mathrm{cm\\,sec^{-1}}$"], ["$V$", "电压或电势差", "V"], ["$V$", "体积", "$\\mathrm{cm^3}$"],
  ["$V$", "空位（未注明时指 Si 中）", ""], ["$\\mathcal{E}$", "电场", "$\\mathrm{V\\,cm^{-1}}$"], ["$\\varepsilon$", "介电常数（电容率）", "$\\mathrm{F\\,cm^{-1}}$"], ["$\\mu$", "载流子迁移率", "$\\mathrm{cm^2/V\\,sec}$"],
  ["$\\sigma$", "电导率", "$\\mathrm{S\\,m^{-1}}$（本书正文多用 $(\\mathrm{\\Omega}\\,\\mathrm{cm})^{-1}$）"], ["$\\sigma$", "应力", "$\\mathrm{dyne\\,cm^{-2}}$ 或 Pa"], ["$\\tau$", "寿命", "sec"], ["$\\rho$", "电阻率", "$\\mathrm{\\Omega}\\,$cm"],
  ["$\\rho_S$", "方块电阻", "$\\mathrm{\\Omega}/\\square$"], ["$\\rho_C$", "比接触电阻率", "$\\mathrm{\\Omega}\\,\\mathrm{cm^2}$"],
];
export function SecA10() {
  return <Sec n="A.10" title="List of Important Symbols" zh="重要符号表" gist="全书通用符号及其单位；同一字母在不同章节可能有不同含义（如 $n$ 既是电子浓度也是折射率）。" why="读公式时先确认符号与单位，可以避免最常见的量纲错误。">
    <SearchTable head={["符号", "含义", "单位"]} rows={SYMBOLS} placeholder="搜索符号或含义，如 dose、电阻" />
  </Sec>;
}

const ACRONYMS = `AC|alternating current|交流
A/C|amorphous/crystalline interface in Si|硅中非晶/晶体界面
AFM|atomic force microscopy|原子力显微镜
APCVD|atmospheric pressure chemical vapor deposition|常压化学气相沉积
ARC|antireflection coating|抗反射涂层
ARDE|aspect ratio dependent etching|深宽比相关刻蚀
Athena|Silvaco Inc. process simulator|Silvaco 公司的工艺模拟器
BCC|body-centered cubic unit cell|体心立方晶胞
BJT|bipolar junction transistor|双极结型晶体管
BOE|buffered oxide etch (same as BHF, buffered HF)|缓冲氧化物刻蚀液（同 BHF）
BPSG|borophosphosilicate glass|硼磷硅玻璃
CA(R)|chemically amplified (resist)|化学放大（光刻胶）
CVD|chemical vapor deposition|化学气相沉积
CZ|Czochralski crystal growth method|直拉法晶体生长
DC|direct current|直流
DI|de-ionized, or a very pure, water|去离子（超纯）水
DOF|depth of focus|焦深
DOP|degree of planarization|平坦化程度
DRAM|dynamic random access memory|动态随机存储器
DQN|diazonaphthoquinone, a resist material|重氮萘醌（光刻胶材料）
DUV|deep ultraviolet|深紫外
e-beam|electron beam lithography|电子束光刻
EGS|electronic grade silicon|电子级硅
EMP|electron microprobe|电子探针
EOR|end of range defects|射程末端缺陷
erf|error function|误差函数
erfc|complementary error function|余误差函数
EUV|extreme ultraviolet|极紫外
FCC|face-centered cubic unit cell|面心立方晶胞
FET|field effect transistor|场效应晶体管
FZ|float zone crystal growth method|区熔法晶体生长
HDP|high-density plasma|高密度等离子体
HEPA|high-efficiency particulate air (filter)|高效空气过滤器
HF|high-frequency|高频
HMDS|hexamethyldisilazane, an adhesion promoter|六甲基二硅氮烷（增粘剂）
IC|integrated circuit|集成电路
ICP|inductively coupled plasma|电感耦合等离子体
IMD|inter-metal dielectric|金属间介质
IMP|ionized metal deposition (same as IPVD)|离化金属沉积（同 IPVD）
INSOL|insoluble portion of polymer base in CA resist|化学放大胶中树脂的不溶部分
ITRS|International Technology Roadmap for Semiconductors|国际半导体技术路线图
LDD|lightly doped drain|轻掺杂漏
LF|low-frequency|低频
LOCOS|local oxidation of silicon|硅的局部氧化
LPCVD|low pressure chemical vapor deposition|低压化学气相沉积
LSS|implant range theory developed by Lindhard, Scharff and Schiott|Lindhard–Scharff–Schiott 注入射程理论
MBE|molecular beam epitaxy|分子束外延
MGS|metallurgical grade silicon|冶金级硅
MOS|metal-oxide-semiconductor|金属–氧化物–半导体
MTF|modulation transfer function|调制传递函数
MTTF|mean time to failure|平均失效时间
NMOS|N-channel MOS transistor|N 沟道 MOS 晶体管
NPN|bipolar transistor with N-type emitter and collector|NPN 双极晶体管
NTD|neutron transmutation doping|中子嬗变掺杂
NTRS|National Technology Roadmap for Semiconductors|美国国家半导体技术路线图
OISF|oxidation-induced stacking fault|氧化诱生层错
OPC|optical proximity correction|光学邻近校正
OPD|optical path difference|光程差
PAC|photoactive compound|光敏化合物
PAG|photo-acid generator|光致产酸剂
PEB|post exposure bake|曝光后烘
PECVD|plasma-enhanced chemical vapor deposition|等离子体增强化学气相沉积
PMOS|P-channel MOS transistor|P 沟道 MOS 晶体管
PSG|phosphosilicate glass|磷硅玻璃
PSM|phase shift mask|相移掩模
PVD|physical vapor deposition (e.g., evaporation, sputter deposition)|物理气相沉积（蒸发、溅射等）
RCA|a wafer cleaning process|RCA 晶圆清洗工艺
RF|radio frequency, usually 13.56 MHz|射频（通常 13.56 MHz）
RIE|reactive ion etching|反应离子刻蚀
RTA|rapid thermal annealing|快速热退火
RTO|rapid thermal oxidation|快速热氧化
SC-1, SC-2|wafer cleaning solutions, part of RCA cleaning process|RCA 清洗中的两种清洗液
SEM|scanning electron microscopy|扫描电子显微镜
SIA|Semiconductor Industry Association|美国半导体行业协会
SIMOX|process for SOI, "separation by implanted oxygen"|注氧隔离（SOI 工艺）
SIMS|secondary ion mass spectrometry|二次离子质谱
SMIF|standard mechanical interface (box)|标准机械接口（晶圆盒）
SOG|spin-on-glass|旋涂玻璃
SOI|silicon on insulator|绝缘体上硅
SOL|soluble portion of polymer base in CA resist|化学放大胶中树脂的可溶部分
SRH|Shockley-Read-Hall recombination|Shockley–Read–Hall 复合
STM|scanning tunneling microscope|扫描隧道显微镜
SUPREM|Stanford University Process Engineering Models|斯坦福大学工艺工程模型（模拟器）
TCAD|technology computer-aided design|工艺与器件计算机辅助设计
TED|transient enhanced diffusion|瞬态增强扩散
TEM|transmission electron microscopy|透射电子显微镜
TEOS|tetraethoxysilane, Si(OC2H5)4|正硅酸乙酯
UV|ultraviolet light, wavelength about 0.2–0.4 µm|紫外光（波长约 0.2–0.4 µm）
VLSI|very-large-scale integration, usually > 10^5 components|超大规模集成（通常超过十万个元件）`.split("\n").map(l => l.split("|"));
export function SecA11() {
  return <Sec n="A.11" title="List of Common Acronyms" zh="常用缩写" gist={`全书出现的工艺、设备、表征与器件缩写（共 ${ACRONYMS.length} 条）。`} why="芯片制造行话以缩写为主，读论文与工艺文件时随手可查。">
    <SearchTable head={["缩写", "英文全称", "中文"]} rows={ACRONYMS} placeholder="搜索缩写或关键词，如 CVD、刻蚀、resist" />
    <Box kind="warning" title="勘误：两处缩写释义">{R`(1) 原书把 HMDS 写成 "Hexamethyldisilane"；作为光刻增粘剂的 HMDS 是 hexamethyldisilazane（六甲基二硅氮烷，$\mathrm{[(CH_3)_3Si]_2NH}$），本表已改正。(2) TEOS 原书拼作 "tetraethooxysilane"，应为 tetraethoxysilane。另外 INSOL、SOL 条目中的 "polmer" 为 polymer 之误。`}</Box>
  </Sec>;
}
