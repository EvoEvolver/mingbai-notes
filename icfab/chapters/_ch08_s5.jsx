// §8.5 二维与三维注入：点扩展函数、掩模边缘下的 erfc 分布、倾斜注入。
import { Sec, Tx, Eq, Box, Figure, Derivation } from "@kit";
import { LateralPlot, TiltMap2D } from "./_ch08_plots.jsx";
import { dRlat, dRlat2, erfc } from "./_ch08_tex.jsx";

const R = String.raw;
const aa = R`\sym{ahalf}{a}`;

export function Sec85() {
  return (
    <Sec n="8.5" title="2D and 3D Implants" zh="二维与三维注入"
      gist={R`单个束元的二维分布 = 纵向分布 $\times$ 横向高斯（点扩展函数）；对掩模开口叠加得到两个 erfc 之差，掩模边缘处浓度为开口中心的一半；倾斜注入使两侧不对称，需要多方向补偿。`}
      why={R`掩蔽注入只掺杂局部区域，器件真正关心的是掩模（栅）边缘下方的二维分布——它决定源漏与栅的交叠、有效沟道长度。`}
      gives={["8.20", "8.21"]}>
      <Tx>{R`绝大多数注入都是**掩蔽注入**：杂质只进入晶圆的局部区域（图 8.12）。这时人们关心的是注入产生的二维、三维分布。图 8.15 是一个典型例子：35 keV（左）和 120 keV（右）的 As 注入，被多晶硅栅的边缘挡住一部分——正是 MOS 器件制造中常见的结构（第 2 章）。用腐蚀把掺杂区"显影"出来后可以看到：掺杂区并不止于栅边缘的正下方，而是向栅下方延伸了一段，能量越高延伸越多。`}</Tx>
      <Figure n="8.15" caption={R`35 keV（左）与 120 keV（右）As 注入在多晶硅栅边缘处的截面像，掺杂区经腐蚀显示。原书引自 [8.9]（AVS 授权）。`} />
      <Tx>{R`**点扩展函数。**只要知道分布在横向上的矩，前面的高斯、Pearson、双 Pearson 都能推广到二维、三维。以高斯为例：离子停止位置在横向上也近似服从高斯分布，其标准差叫**横向离散** $\Delta R_{\rm lat}$。通常进一步假设纵向与横向**相互独立**，于是从 $y=0$ 处垂直入射的一个细束元（图 8.15 中的一支红箭头），产生的二维分布就是两者之积：`}</Tx>
      <Eq n="8.20" keyEq title="点扩展函数" say="一束细离子束在固体中留下的二维分布：纵向按一维分布，横向按以入射点为中心的高斯散开，两者相乘。">{R`C(x,y)=C_{\rm ver}(x)\,\frac{1}{\sqrt{2\pi}\,${dRlat}}\exp\left(-\frac{y^2}{2${dRlat2}}\right)`}</Eq>
      <Tx>{R`这叫**点扩展函数**（point spread function）。式中 $C_{\rm ver}(x)$ 就是一维纵向分布（如 \eqref{8.4}），横向因子已归一化，所以对 $y$ 积分回到 $C_{\rm ver}(x)$。

**对开口叠加。**实际的束覆盖整个开口，每一个入射点 $y'$ 都贡献一个以 $y'$ 为中心的点扩展函数，总分布是它们的和（积分）。第 7 章和 \eqref{8.19} 已经告诉我们：高斯函数的"和"是 erfc。对从 $y=-a$ 到 $y=+a$ 的开口：`}</Tx>
      <Eq n="8.21" keyEq title="掩模边缘下的横向分布" say="开口内每个入射点贡献一个横向高斯，叠加起来是两个余误差函数之差：开口中心接近一维分布，掩模边缘处恰为一半，向掩模下方按横向离散的尺度衰减。">{R`C(x,y)=C_{\rm ver}(x)\int_{-${aa}}^{+${aa}}\frac{1}{\sqrt{2\pi}\,${dRlat}}\exp\left(-\frac{(y-y')^2}{2${dRlat2}}\right)dy'=\frac{C_{\rm ver}(x)}{2}\left[${erfc}\left(\frac{y-${aa}}{\sqrt2\,${dRlat}}\right)-${erfc}\left(\frac{y+${aa}}{\sqrt2\,${dRlat}}\right)\right]`}</Eq>
      <Box kind="warning" title={R`勘误：式 (8.21)`}>{R`原书 \eqref{8.21} 印作
$C(x,y)=C_{\rm ver}(x)\int_{-a}^{+a}\exp\left(\frac{y-y'}{2\Delta R_{\rm lat}}\right)dy=C_{\rm ver}(x)\left[\operatorname{erfc}\left(\frac{y-a}{\sqrt{2\Delta R_{\rm lat}}}\right)-\operatorname{erfc}\left(\frac{y+a}{\sqrt{2\Delta R_{\rm lat}}}\right)\right]$，有四处问题：

(1) 被积函数的指数缺平方与负号，应为 $-(y-y')^2/(2\Delta R_{\rm lat}^2)$，否则不是 \eqref{8.20} 的横向高斯；(2) 漏了归一化因子 $1/(\sqrt{2\pi}\Delta R_{\rm lat})$；(3) 积分变量应是入射位置 $y'$ 而不是 $y$；(4) 结果少了因子 $\tfrac12$，且 erfc 自变量的分母应为 $\sqrt2\,\Delta R_{\rm lat}$ 而不是 $\sqrt{2\Delta R_{\rm lat}}$（后者量纲不对）。

验证：令 $a\to\infty$（无掩模），改正式给出 $\tfrac12[\operatorname{erfc}(-\infty)-\operatorname{erfc}(\infty)]C_{\rm ver}=C_{\rm ver}$，正确回到一维分布；原式则给出 $2C_{\rm ver}$。本页正文与交互图均使用改正式。`}</Box>
      <Derivation title={R`改正式 (8.21) 的推导`} collapsed steps={[
        { tex: R`C(x,y)=C_{\rm ver}(x)\int_{-${aa}}^{${aa}}\frac{1}{\sqrt{2\pi}\,${dRlat}}e^{-(y-y')^2/2${dRlat2}}\,dy'`, why: R`把 \eqref{8.20} 中的中心从 $0$ 换成入射位置 $y'$，再对开口内所有 $y'$ 积分。` },
        { tex: R`u=\frac{y'-y}{\sqrt2\,${dRlat}},\qquad dy'=\sqrt2\,${dRlat}\,du`, why: "换元。" },
        { tex: R`=\frac{C_{\rm ver}(x)}{\sqrt\pi}\int_{(-${aa}-y)/\sqrt2${dRlat}}^{(${aa}-y)/\sqrt2${dRlat}}e^{-u^2}du`, why: R`系数 $\frac{\sqrt2\Delta R_{\rm lat}}{\sqrt{2\pi}\Delta R_{\rm lat}}=\frac1{\sqrt\pi}$。` },
        { tex: R`=\frac{C_{\rm ver}(x)}{2}\left[${erfc}\left(\frac{y-${aa}}{\sqrt2\,${dRlat}}\right)-${erfc}\left(\frac{y+${aa}}{\sqrt2\,${dRlat}}\right)\right]`, why: R`$\frac{2}{\sqrt\pi}\int_{z_1}^{z_2}e^{-u^2}du=\operatorname{erfc}(z_1)-\operatorname{erfc}(z_2)$，并用 $\operatorname{erfc}(-z)$ 的对称性整理。` },
      ]} />
      <Tx>{R`**读出几个结论。**(1) 开口很宽时（$a\gg\Delta R_{\rm lat}$），在一侧边缘 $y=a$ 处，方括号 $\approx\operatorname{erfc}(0)-0=1$，浓度恰为 $\tfrac12C_{\rm ver}$；(2) 进入掩模下方 $2\Delta R_{\rm lat}$，浓度降到 $\tfrac12\operatorname{erfc}(\sqrt2)\approx2.3\%$；(3) 开口窄到与 $\Delta R_{\rm lat}$ 可比时，连开口中心都达不到 $C_{\rm ver}$——对纳米尺度的器件这一点不能忽视。`}</Tx>
      <Figure n="8.16" caption={R`0.3 µm 栅长 MOS 器件 As 源漏注入的 Athena 模拟：$5\times10^{15}\,\mathrm{cm^{-2}}$、100 keV、$0^\circ$ 倾斜（红箭头）。用了含沟道（晶体衬底）的 Pearson 分布；沟道区的蓝色等值线来自此前的 B 沟道注入。右图为沿 As 纵向峰附近（虚线）的横向截线。"交互版"用 \eqref{8.21} 的思想（逐个入射点叠加点扩展函数）重算二维分布，可调倾角。`} interactive={<TiltMap2D />} />
      <Tx>{R`Athena 等模拟器用多种方法由解析分布构造二维分布，\eqref{8.21} 这种简单的 erfc 形式只是其中之一（见 [8.6]）。图 8.16 的模拟用了含沟道的 Pearson 分布。

**倾斜注入。**图 8.17 是同一个器件，只是 As 源漏注入以 $30^\circ$ 倾斜进行。不对称一目了然：栅在一侧投下阴影，这一侧的漏端 $\mathrm n^+$ 区与栅边缘之间出现了间隙，这样的晶体管是不能工作的。但倾斜注入在器件制造中确有用处——第 2 章的**晕环注入**（halo，图 2.11）就是用倾斜注入在沟道较深处局部提高掺杂、抑制源漏穿通，它的剂量比图 8.17 的源漏注入低得多。从图 8.17 也能看出：如果版图中有各种朝向的器件，倾斜注入至少要以 $\pm30^\circ$（也许还有别的方位）分几次进行，才能得到对称的器件特性。`}</Tx>
      <Figure n="8.17" caption={R`与图 8.16 相同的器件，As 源漏注入（$5\times10^{15}\,\mathrm{cm^{-2}}$、100 keV）改为 $30^\circ$ 倾斜（红箭头）。右图为沿 As 纵向峰附近（虚线）的横向截线：右侧 $\mathrm n^+$ 区与栅分离。`} />
      <Box kind="note" title="交互：横向边缘的形状">{R`下面的图只画改正后的 \eqref{8.21} 在某一深度的横向因子 $C(x,y)/C_{\rm ver}(x)$：调节开口半宽 $a$ 与横向离散 $\Delta R_{\rm lat}$，看边缘处的"一半"规律与窄开口时中心浓度的下降。`}</Box>
      <LateralPlot />
    </Sec>);
}
