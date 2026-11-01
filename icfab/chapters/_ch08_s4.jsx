// §8.4 多层注入：剂量匹配法、掩蔽判据与例题。
import { Sec, Sub, Tx, Eq, Box, Figure, Details } from "@kit";
import { MultilayerSVG } from "./_ch08_figs.jsx";
import { MaskCalc, DoseMatchPlot } from "./_ch08_plots.jsx";
import { dRp, dRp2, xm, erfc } from "./_ch08_tex.jsx";

const R = String.raw;

export function Sec84() {
  return (
    <Sec n="8.4" title="Multilayer Implants" zh="多层注入"
      gist={R`多层靶用剂量匹配法逐层拼接分布；掩模厚度按"界面浓度不超过 $C_B$"取 $x_{\rm m}=R_P+m\Delta R_P$，或按"穿透剂量"算 $Q_P=\frac Q2\operatorname{erfc}[(x_{\rm m}-R_P)/\sqrt2\Delta R_P]$。`}
      why={R`几乎所有注入都要穿过屏蔽氧化层，并被光刻胶或薄膜部分遮挡；设计掩模厚度是工艺工程师的日常。`}
      gives={["8.14", "8.15", "8.16", "8.17", "8.18", "8.19"]}>

      <Sub n="8.4.a" zh="多层靶与剂量匹配法">
        <Tx>{R`前面的例子都是直接注入 Si。实际中注入几乎总是面对**多层结构**：表面常有一层薄的 $\SiO$ 或其他屏蔽层来抑制沟道（§8.3），晶圆的一部分区域还被光刻胶或淀积薄膜挡住（回忆第 2 章的 CMOS 流程）。图 8.12 概括了这种一般情形：右侧是我们已经讨论过的直接注入衬底；左侧离子要先穿过材料 1、材料 2 才到衬底。高斯、Pearson、双 Pearson 这些解析方法在左侧同样能用，但每种材料有自己的矩，整体分布要拼起来。`}</Tx>
        <Figure n="8.12" caption={R`向多层靶注入（自绘）。左侧依次是厚 $t_1$ 的材料 1、厚 $t_2$ 的材料 2 与衬底；右侧为直接注入衬底。颜色按全书约定：光刻胶紫、$\SiO$ 浅蓝、Si 灰。`} illustration={<MultilayerSVG />} />
        <Tx>{R`Athena 等模拟器有多种拼接方法，最简单也最常用的是**剂量匹配法**（dose matching，[8.8]）。思路是：**下一层"从哪里接着画"，由"上一层已经吃掉了多少剂量"决定。**具体分三步：

**第一步。**用材料 1 的矩算出分布 $C_1(x)$，停在材料 1 中的离子数为（参照 \eqref{8.5}）`}</Tx>
        <Eq n="8.14" say="停留在第一层材料中的剂量，等于用该材料的矩算出的分布在该层厚度范围内的积分。">{R`Q_1=\int_0^{t_1}C_1(x)\,dx`}</Eq>
        <Tx>{R`**第二步。**假设离子直接注入材料 2（相当于第一步中把材料 1 整个换成材料 2），算出分布 $C_2(x)$，再找出能"装下"剂量 $Q_1$ 的材料 2 厚度 $x'$，即 $\int_0^{x'}C_2\,dx=Q_1$。

**第三步。**材料 2 中真实的分布，就取 $C_2$ 从 $x'$ 到 $x'+t_2$ 的那一段，平移到实际位置 $t_1$ 到 $t_1+t_2$。对材料 2 以下的各层（包括衬底）重复这一过程。

这样做保证了**剂量守恒**：离子在每一层"消耗"的份额按该层自身的阻止能力计算。代价是界面处分布可能**不连续**——图 8.13 就是一例：80 nm $\mathrm{Si_3N_4}$ 上的 P 注入，用两种材料各自的矩做双 Pearson 计算，在氮化硅/硅界面处浓度出现跳变。这是方法造成的，不是物理。`}</Tx>
        <Figure n="8.13" caption={R`$10^{14}\,\mathrm{cm^{-2}}$、100 keV 的 P 注入多层结构（80 nm $\mathrm{Si_3N_4}$/Si）的 Athena 模拟，衬底按非晶处理 [8.6]。"交互版"用高斯分布演示剂量匹配法：拖动覆盖层厚度 $t_1$ 与其射程系数 $s_1$，观察 $x'$ 与界面跳变。`} interactive={<DoseMatchPlot />} />
      </Sub>

      <Sub n="8.4.b" zh="掩模要多厚：两种判据">
        <Tx>{R`多层注入中一个特别重要的情形是**掩蔽**：图 8.12 中的 $t_1$、$t_2$ 要多大，才能挡住本来要掺进右侧衬底的注入？任何能把离子"截住"的层都可以当掩模；例如注入通常在室温进行，光刻胶就是很方便的掩模。估算掩模厚度当然要知道离子在**掩模材料**中的矩。但即使知道了，还有一个更根本的问题：**什么叫"挡住"？**

设想要做一次 $10^{15}\,\mathrm{cm^{-2}}$、100 keV 的 B 注入，并用淀积的 $\SiO$ 层掩蔽。图 8.14 是 Athena 模拟：氧化层厚 600 nm，按高斯分布、Si 衬底按非晶计算。高斯的尾巴按指数下降，但要到 $x\to\infty$ 才真正为零——所以总有一些离子穿过去，"挡住"必须先下定义。`}</Tx>
        <Tx>{R`**判据一：界面浓度。**一个合理的定义是：掩模要厚到使衬底中尾部的浓度不超过某个指定的背景浓度 $C_B$（图 8.14）。高斯分布在 $x$ 方向单调下降的一侧，最大的衬底浓度就在掩模/衬底界面（深度 $x_{\rm m}$）处，于是判据为`}</Tx>
        <Eq n="8.15" say="掩模合格的条件：掩模底面（与衬底的界面）处的注入浓度不超过衬底的背景浓度。">{R`C(${xm})=C_P\exp\left(-\frac{(${xm}-R_P)^2}{2${dRp2}}\right)\le C_B`}</Eq>
        <Tx>{R`式中 $x_{\rm m}$ 为掩模厚度，$R_P$、$\Delta R_P$ 是离子在**掩模材料**（这里是 $\SiO$）中的矩，$C_B$ 为衬底中指定的浓度。取等号、对两边取对数解出 $x_{\rm m}$：`}</Tx>
        <Eq n="8.16" keyEq title="掩模厚度（浓度判据）" say={R`掩模厚度 = 投影射程再加上 $m$ 个离散；$m$ 只按对数的平方根依赖于峰值与背景浓度之比，通常在 4 到 6 之间。`}>{R`${xm}=R_P+${dRp}\sqrt{2\ln\left(\frac{C_P}{C_B}\right)}=R_P+\sym{mfac}{m}\,${dRp}`}</Eq>
        <Tx>{R`参数 $m$ 的意思是：掩模厚度应等于射程加上掩模材料中离散的 $m$ 倍。$m$ 对浓度比非常不敏感：$C_P/C_B=10^4$ 时 $m=4.29$，$10^5$ 时 $4.80$，$10^6$ 时 $5.26$。所以掩模厚度主要由 $R_P$、$\Delta R_P$ 决定。

**判据二：穿透剂量。**有时关心的不是界面处的浓度，而是**到达衬底的总离子数**——比如掩模下面是 MOSFET 的沟道区，阈值电压取决于沟道中的总电荷。穿过厚度 $x_{\rm m}$ 掩模的剂量就是高斯尾部的面积：`}</Tx>
        <Eq n="8.17" say="穿透剂量：把掩模中的高斯分布从掩模底面积分到无穷远，即落入衬底的离子总数。">{R`Q_P=\frac{Q}{\sqrt{2\pi}${dRp}}\int_{${xm}}^{\infty}\exp\left[-\left(\frac{x-R_P}{\sqrt2\,${dRp}}\right)^2\right]dx`}</Eq>
        <Tx>{R`其中 $Q$ 为总注入剂量，矩仍取掩模材料中的值。高斯的尾积分可以写成余误差函数：`}</Tx>
        <Eq n="8.18" say={R`从某点 $z$ 到无穷远的高斯尾部面积，等于余误差函数在该点的值乘以 $\sqrt\pi/2$。`}>{R`\int_{z}^{\infty}\exp(-u^2)\,du=\frac{\sqrt\pi}{2}\,${erfc}(z)`}</Eq>
        <Box kind="warning" title={R`勘误：式 (8.18) 的积分下限`}>{R`原书 \eqref{8.18} 印作 $\int_d^\infty\exp(-u^2)\,du=\frac{\sqrt\pi}2\operatorname{erfc}(u)$：积分下限是 $d$，右边却是 $u$ 的函数，而 $u$ 是积分哑变量、积完就不存在了。正确写法是下限与 erfc 的自变量为同一个量，本页记作 $z$：$\int_z^\infty e^{-u^2}du=\frac{\sqrt\pi}2\operatorname{erfc}(z)$。这正是 erfc 的定义 $\operatorname{erfc}(z)=\frac2{\sqrt\pi}\int_z^\infty e^{-u^2}du$，代入 \eqref{8.17} 后得到的 \eqref{8.19} 本身是正确的。`}</Box>
        <Tx>{R`在 \eqref{8.17} 中令 $u=(x-R_P)/(\sqrt2\Delta R_P)$，$dx=\sqrt2\Delta R_P\,du$，下限变为 $z=(x_{\rm m}-R_P)/(\sqrt2\Delta R_P)$，前面的系数 $\frac{Q}{\sqrt{2\pi}\Delta R_P}\cdot\sqrt2\Delta R_P\cdot\frac{\sqrt\pi}2=\frac Q2$。于是穿透剂量为`}</Tx>
        <Eq n="8.19" keyEq title="穿透剂量（剂量判据）" say={R`穿过掩模的剂量 = 总剂量的一半乘以 erfc（掩模超出射程的部分以 $\sqrt2\Delta R_P$ 为单位度量）：掩模每多一个离散，穿透剂量就下降一到两个数量级。`}>{R`Q_P=\frac Q2\,${erfc}\left(\frac{${xm}-R_P}{\sqrt2\,${dRp}}\right)`}</Eq>
        <Figure n="8.14" caption={R`$10^{15}\,\mathrm{cm^{-2}}$、100 keV 的 B 注入 $\SiO$ 掩模/Si 衬底的 Athena 模拟（高斯分布，Si 按非晶处理）[8.6]。图中标出峰值 $C_P$、界面浓度 $C(x=0)$ 与掩模厚度 $x_{\rm m}$。"交互版"是**掩模计算器**：按表 8.1 的矩（可乘以材料系数 $s$）同时给出两种判据的结果；默认值对应下面的例题。`} interactive={<MaskCalc />} />
        <Box kind="physics" title="两种判据的关系">{R`两个判据都在问"尾部有多小"，只是一个看尾部的**高度**，一个看尾部的**面积**。由 erfc 的渐近式 $\operatorname{erfc}(z)\approx e^{-z^2}/(z\sqrt\pi)$，在 $x_{\rm m}=R_P+m\Delta R_P$ 处有

$$\frac{Q_P}{Q}\approx\frac{e^{-m^2/2}}{m\sqrt{2\pi}}=\frac{1}{m\sqrt{2\pi}}\frac{C(x_{\rm m})}{C_P},$$

即穿透剂量约等于界面浓度乘以 $\Delta R_P/m$：尾部的"有效厚度"只有 $\Delta R_P/m$。$m=4.3$ 时 $Q_P/Q\approx10^{-5}$。这也说明为什么**改变能量**很危险：能量升高使 $R_P$ 增大、$m$ 变小，$e^{-m^2/2}$ 随之指数地增大——见下面例题 (b)。`}</Box>
        <Box kind="example" title="多晶硅栅能否掩蔽 As 源漏注入？">{R`**题目。**工艺工程师在制作 NMOS 时，想在做砷源漏注入的同时掺杂多晶硅栅。源漏注入剂量 $2\times10^{15}\,\mathrm{cm^{-2}}$、能量 50 keV。(a) 若要求穿过栅的注入不超过沟道表面附近的掺杂 $10^{16}\,\mathrm{cm^{-3}}$，多晶硅最薄要多厚（栅氧化层比多晶硅薄得多，可忽略）？(b) 若就用这个厚度，而工程师把注入能量改成 80 keV，会有多少剂量穿透多晶硅？

**解 (a)。**多晶硅的矩取 Si 的值。查表 8.1，50 keV As：$R_P=36.2\,\mathrm{nm}$，$\Delta R_P=15.2\,\mathrm{nm}$。令界面浓度等于沟道掺杂：

$$C(x_{\rm m})=10^{16}=\frac{Q}{\sqrt{2\pi}\Delta R_P}\exp\left[-\frac{(x_{\rm m}-R_P)^2}{2\Delta R_P^2}\right]=\frac{2\times10^{15}}{\sqrt{2\pi}(15.2\times10^{-7})}\exp\left[-\frac{(x_{\rm m}-36.2\times10^{-7})^2}{2(15.2\times10^{-7})^2}\right]$$

（长度以 cm 计。）峰值 $C_P=5.25\times10^{20}\,\mathrm{cm^{-3}}$，$m=\sqrt{2\ln(5.25\times10^4)}=4.66$，所以

$$x_{\rm m}=36.2+4.66\times15.2=107\,\mathrm{nm}=0.107\,\mathrm{\mu m}.$$

**解 (b)。**80 keV As：$R_P^*=56.1\,\mathrm{nm}$，$\Delta R_P^*=22.0\,\mathrm{nm}$。由 \eqref{8.19}：

$$Q_P=\frac Q2\operatorname{erfc}\left[\frac{x_{\rm m}-R_P^*}{\sqrt2\Delta R_P^*}\right]=\frac{2\times10^{15}}{2}\operatorname{erfc}\left[\frac{107-56.1}{\sqrt2(22.0)}\right]=10^{15}\left[1-\operatorname{erf}(1.636)\right]=2.1\times10^{13}\,\mathrm{cm^{-2}}.$$

穿透的剂量约为总剂量的 1%，但它比典型的沟道掺杂剂量（$\sim10^{12}\,\mathrm{cm^{-2}}$）大一个数量级以上，阈值电压会被彻底改变。能量从 50 升到 80 keV，看似不大的改动就让掩模失效。我们用页面的数值实现复核过：(a) $107.07\,\mathrm{nm}$，(b) $\operatorname{erfc}(1.636)=0.02069$，$Q_P=2.07\times10^{13}\,\mathrm{cm^{-2}}$，与原书一致。在上面的掩模计算器中把能量从 50 拖到 80 即可重现。`}</Box>
        <Details summary="小练习：光刻胶要多厚？">{R`用光刻胶掩蔽 200 keV、$5\times10^{15}\,\mathrm{cm^{-2}}$ 的 B 注入，要求穿透剂量 $Q_P\le10^{10}\,\mathrm{cm^{-2}}$。设 B 在光刻胶中的 $R_P$ 与 $\Delta R_P$ 均为 Si 中的 2 倍（这是一个假设值，实际应查该胶的矩表）。

**提示与答案。**表 8.1：Si 中 $R_P=509$、$\Delta R_P=110\,\mathrm{nm}$，胶中取 $1018$、$220\,\mathrm{nm}$。要求 $\operatorname{erfc}(z)\le2Q_P/Q=4\times10^{-6}$，解得 $z\approx3.26$，即 $x_{\rm m}\ge R_P+\sqrt2\,z\,\Delta R_P=1018+4.61\times220\approx2.03\,\mathrm{\mu m}$。（在掩模计算器中选 B、200 keV、$s=2$ 可验证。）`}</Details>
      </Sub>
    </Sec>);
}
