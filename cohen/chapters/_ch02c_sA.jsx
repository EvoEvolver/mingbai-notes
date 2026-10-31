// 补充材料 A_II：Schwarz 不等式 —— 式 (AII-1)–(AII-7)
import { Sec, Tx, Eq, Box, Derivation, C } from "@kit";
import "./_ch02c_kit.jsx";
import { Fig } from "./_ch02c_kit.jsx";
import { ProjectionSketch } from "./_ch02c_figs.jsx";

const R = String.raw;

export function SecA() {
  return (
    <Sec n="AII" title="The Schwarz inequality" zh="Schwarz 不等式"
      gist={R`任意两个矢量的标积的模方不超过两者模方之积：$|\braket{\varphi_1|\varphi_2}|^2\le\braket{\varphi_1|\varphi_1}\braket{\varphi_2|\varphi_2}$，等号当且仅当二者成比例。证明只用到"任何矢量的模方 $\ge0$"。`}
      why={R`它让复空间里的"夹角"有意义，保证归一化态之间的跃迁概率 $|\braket{\varphi|\psi}|^2$ 不超过 1；以后推导 Heisenberg 不确定关系时还会直接用到。`}
      gives={["AII-2", "AII-5", "AII-6"]}>
      <p className="muted">本节概念：<C id="schwarz" /></p>
      <Tx>{R`**从一个熟悉的不等式说起。**在普通三维空间里，$\mathbf a\cdot\mathbf b=|\mathbf a||\mathbf b|\cos\theta$，因为 $|\cos\theta|\le1$，所以 $(\mathbf a\cdot\mathbf b)^2\le\mathbf a^2\mathbf b^2$。态空间是复的、维数可以无穷，"夹角"不能直接画出来；但反过来，只要能证明同样的不等式，我们就可以**用它来定义**夹角，并且确信两个归一化态的重叠 $|\braket{\varphi|\psi}|$ 永远在 0 和 1 之间——这正是第 III 章把 $|\braket{\varphi|\psi}|^2$ 解释为概率时所需要的。

**唯一的原料。**标积的正定性（\IIeq{B-12}）：`}</Tx>
      <Eq n="AII-1" say="任何右矢与自身的标积都是非负实数：它就是矢量长度的平方，只有零矢量的长度为零。">{R`\braket{\psi|\psi}\quad\text{real}\ \geq0`}</Eq>
      <Tx>{R`只有 $\ket\psi$ 是零矢量时才取等号。要证明的结论是：对任意 $\ket{\varphi_1},\ket{\varphi_2}\in\mathcal E$，`}</Tx>
      <Eq n="AII-2" keyEq title="Schwarz 不等式" say="两个矢量标积的模方，不超过它们各自模方的乘积；只有两个矢量方向相同（成比例）时才取等号。">{R`|\braket{\varphi_1|\varphi_2}|^2\leq\braket{\varphi_1|\varphi_1}\braket{\varphi_2|\varphi_2}`}</Eq>
      <Tx>{R`等号成立当且仅当两者成比例。

**思路：把 $\ket{\varphi_1}$ 中"沿 $\ket{\varphi_2}$ 的部分"减掉。**几何上，$\ket{\varphi_1}$ 可以分成平行于 $\ket{\varphi_2}$ 的投影和与之垂直的余量；余量的长度平方 $\ge0$，而这句话翻译成标积就是 Schwarz 不等式（见图 A-1）。为了不预先假设"投影"怎么算，我们让系数自由变化，再挑一个最好的。对任意复数 $\lambda$ 构造`}</Tx>
      <Eq n="AII-3" say="构造一个试探矢量：从 $\ket{\varphi_1}$ 出发，加上 $\ket{\varphi_2}$ 的任意复数倍。">{R`\ket\psi=\ket{\varphi_1}+\lambda\ket{\varphi_2}`}</Eq>
      <Tx>{R`按标积的线性（右边）和反线性（左边）展开它的模方，四项都写出来，再用 \eqref{AII-1}：`}</Tx>
      <Eq n="AII-4" say="试探矢量的模方展开成四项：两个“纯项”和两个互为复共轭的“交叉项”；无论 $\lambda$ 取什么值，总和都不小于零。">{R`\braket{\psi|\psi}=\braket{\varphi_1|\varphi_1}+\lambda\braket{\varphi_1|\varphi_2}+\lambda^*\braket{\varphi_2|\varphi_1}+\lambda\lambda^*\braket{\varphi_2|\varphi_2}\geq0`}</Eq>
      <Tx>{R`这是关于 $\lambda$ 的一族不等式。最"紧"的一条来自使左边最小的 $\lambda$——也就是让 $\ket\psi$ 恰好成为垂直余量的那个值。（若 $\ket{\varphi_2}=0$，\eqref{AII-2} 两边都为零，无需证明；下面设 $\braket{\varphi_2|\varphi_2}>0$。）把 $\lambda,\lambda^*$ 当作独立变量，对 $\lambda^*$ 求导令其为零，得 $\braket{\varphi_2|\varphi_1}+\lambda\braket{\varphi_2|\varphi_2}=0$，即`}</Tx>
      <Eq n="AII-5" say="最优系数：恰好把 $\ket{\varphi_1}$ 沿 $\ket{\varphi_2}$ 方向的投影减掉，剩下的部分与 $\ket{\varphi_2}$ 正交。">{R`\lambda=-\frac{\braket{\varphi_2|\varphi_1}}{\braket{\varphi_2|\varphi_2}}`}</Eq>
      <Tx>{R`代回 \eqref{AII-4}。逐项看：第二、三项各等于 $-|\braket{\varphi_1|\varphi_2}|^2/\braket{\varphi_2|\varphi_2}$，第四项是 $+|\braket{\varphi_1|\varphi_2}|^2/\braket{\varphi_2|\varphi_2}$，三项合起来只剩一个负号项：`}</Tx>
      <Eq n="AII-6" say="减去投影之后的余量模方：原矢量的模方减去它在 $\ket{\varphi_2}$ 方向上分量的模方，仍然不能为负。">{R`\braket{\varphi_1|\varphi_1}-\frac{\braket{\varphi_1|\varphi_2}\braket{\varphi_2|\varphi_1}}{\braket{\varphi_2|\varphi_2}}\geq0`}</Eq>
      <Tx>{R`这就是"勾股定理"：总长度平方 = 投影长度平方 + 余量长度平方，而余量长度平方不为负。两边乘以正数 $\braket{\varphi_2|\varphi_2}$，并注意 $\braket{\varphi_1|\varphi_2}\braket{\varphi_2|\varphi_1}=|\braket{\varphi_1|\varphi_2}|^2$：`}</Tx>
      <Eq n="AII-7" say="把上式乘以 $\braket{\varphi_2|\varphi_2}$ 即得 Schwarz 不等式本身。">{R`\braket{\varphi_1|\varphi_1}\ \braket{\varphi_2|\varphi_2}\geq\braket{\varphi_1|\varphi_2}\ \braket{\varphi_2|\varphi_1}`}</Eq>
      <Fig n="A-1" caption={R`自绘示意（实二维截面）：$\ket\psi=\ket{\varphi_1}+\lambda\ket{\varphi_2}$ 随 $\lambda$ 变化扫出一条直线；取 \eqref{AII-5} 时 $\ket\psi$ 与 $\ket{\varphi_2}$ 垂直、长度最短。拖动滑块：$\braket{\psi|\psi}$ 在最优 $\lambda$ 处取最小值，这个最小值就是 \eqref{AII-6} 的左边。`}><ProjectionSketch /></Fig>
      <Tx>{R`**等号何时成立。**等号要求最小值 $\braket{\psi|\psi}$ 恰好为零，即 $\ket\psi$ 是零矢量：$\ket{\varphi_1}=-\lambda\ket{\varphi_2}$，两者成比例。反过来，成比例时 \eqref{AII-2} 两边显然相等。`}</Tx>
      <Box kind="physics" title="Schwarz 不等式在量子力学里管什么">{R`◆ **概率不超过 1。**$\ket\varphi$、$\ket\psi$ 都归一时，\eqref{AII-2} 给出 $|\braket{\varphi|\psi}|^2\le1$；等号只在两个态只差一个相位因子（物理上是同一个态）时成立。

◆ **"夹角"。**可以定义 $\cos\theta=|\braket{\varphi_1|\varphi_2}|/\sqrt{\braket{\varphi_1|\varphi_1}\braket{\varphi_2|\varphi_2}}\in[0,1]$；$\theta=0$ 为同一射线，$\theta=\pi/2$ 为正交。

◆ **不确定关系。**把 $\ket{\varphi_1}=(X-\langle X\rangle)\ket\psi$、$\ket{\varphi_2}=(P-\langle P\rangle)\ket\psi$ 代入 \eqref{AII-2}，再配合对易子，就能得到 $\Delta X\,\Delta P\ge\hbar/2$（第 III 章补充材料中会做）。`}</Box>
      <Box kind="warning" title="复空间里不能照搬实空间的二次函数论证">{R`实空间常见的证法是：$|\mathbf a+t\mathbf b|^2\ge0$ 对所有实数 $t$ 成立，于是判别式 $\le0$。复空间里若只让 $\lambda$ 取实数，判别式只能给出 $(\mathrm{Re}\braket{\varphi_1|\varphi_2})^2\le\braket{\varphi_1|\varphi_1}\braket{\varphi_2|\varphi_2}$，丢掉了虚部。必须让 $\lambda$ 取复数（或先把 $\ket{\varphi_2}$ 乘一个相位，使标积变为实数），才能得到含 $|\braket{\varphi_1|\varphi_2}|^2$ 的完整结论。`}</Box>
    </Sec>);
}
