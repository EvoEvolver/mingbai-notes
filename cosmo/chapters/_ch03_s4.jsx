// §3.4 Summary —— 式 (3.77)–(3.86)
import { Sec, Tx, Eq, Box, Table } from "@kit";

const R = String.raw;

export function Sec34() {
  return (
    <Sec n="3.4" title="Summary" zh="小结"
      gist={R`宇宙学 $\approx$ Einstein 方程（引力）+ Boltzmann 方程（物质与辐射）。本章给出了两者的一般形式，把前者用于光滑宇宙（Friedmann 方程），把后者用于光滑与扰动宇宙（线性阶），并给出了碰撞项与能动张量的一般表达式。`}
      why={R`后面每一章都是这两个方程的应用：第 4 章用均匀 Boltzmann 方程 + 碰撞项算热历史，第 5–6 章用扰动的 Boltzmann 与 Einstein 方程算结构的种子，第 9 章算 CMB。`}
      gives={["3.77", "3.78", "3.79", "3.80", "3.81", "3.82", "3.83", "3.84", "3.85", "3.86"]}>
      <Tx>{R`几乎整个宇宙学都由两个基本物理方程的一系列应用构成：描述引力的 **Einstein 方程**，以及描述物质与辐射的统计力学 **Boltzmann 方程**。本章简明地总结了这两个方程，并把它们应用于光滑宇宙，以及（对 Boltzmann 方程而言）扰动宇宙。

**Einstein 方程**的完整形式是`}</Tx>
      <Eq n="3.77" say="完整的 Einstein 方程：几何（Einstein 张量）= $8\pi G\times$ 能动张量；宇宙学常数或其他暗能量已计入右边。">{R`G_{\mu\nu} \equiv R_{\mu\nu} - \frac12g_{\mu\nu}R = 8\pi G\,T_{\mu\nu},`}</Eq>
      <Tx>{R`这里已把宇宙学常数（或其他形式的暗能量）放在右边。把它应用于 FLRW 度规并假设欧氏宇宙，我们推出了标度因子 $a(t)$ 的 Friedmann 方程：`}</Tx>
      <Eq n="3.78" say="Friedmann 方程：膨胀率的平方由各成分的密度之和决定，每种成分按自己的物态方程随 a 稀释。">{R`\frac{H^2(t)}{H_0^2} = \frac{\rho(t)}{\rho_{\rm cr}} = \sum_{s={\rm r,m},\nu,{\rm DE}}\Omega_s\,[a(t)]^{-3(1+w_s)}.`}</Eq>
      <Tx>{R`后面的章节将全力研究均匀宇宙周围的扰动。计入扰动后，把度规写成`}</Tx>
      <Eq n="3.79" say="共形牛顿规范下的扰动度规：$\Psi$ 扰动时间，$\Phi$ 扰动空间。">{R`\begin{aligned}g_{00}(\vx,t) &= -1 - 2\Psi(\vx,t),\\ g_{0i}(\vx,t) &= 0,\\ g_{ij}(\vx,t) &= a^2(t)\delta_{ij}\left[1 + 2\Phi(\vx,t)\right],\end{aligned}`}</Eq>
      <Tx>{R`并全程在 $\Psi$、$\Phi$ 的线性阶工作。扰动宇宙中的 Einstein 方程推迟到第 6 章推导；本章解出了扰动宇宙中的测地线方程。共动动量成为`}</Tx>
      <Eq n="3.80" say="用固有能量与物理动量表示的四动量，各带 $\Psi$、$\Phi$ 的一阶修正。">{R`P^\mu = \left[E(1-\Psi),\; p^i\frac{1-\Phi}{a}\right],`}</Eq>
      <Tx>{R`其中 $E=\sqrt{p^2+m^2}$ 是固有能量，$\boldsymbol p$ 是物理动量。测地线方程给出`}</Tx>
      <Eq n="3.81" say="一个紧凑的关系，同时包含牛顿动力学（$\Psi$ 梯度）、宇宙学红移（$H$）、积分 Sachs–Wolfe 效应（$\dot\Phi$）与引力透镜（$\Phi$ 梯度）。">{R`\frac{dp^i}{dt} = -\left(H+\dot\Phi\right)p^i - \frac{E}{a}\Psi_{,i} - \frac1a\frac{p^i}{E}p^k\Phi_{,k} + \frac{p^2}{aE}\Phi_{,i},`}</Eq>
      <Tx>{R`这个紧凑的关系包含了牛顿动力学、引力透镜等多种多样的物理，本书会反复使用它。

**Boltzmann 方程**由两部分组成。左边是全时间导数 $df/dt$，表示无碰撞时分布函数 $f(\boldsymbol x,\boldsymbol p,t)$ 守恒；这个时间导数也包含引力的效应。在均匀宇宙中，左边为`}</Tx>
      <Eq n="3.82" say="均匀宇宙中 Boltzmann 方程的左边：时间变化 + 流动 + 红移。">{R`\frac{df}{dt} = \frac{\partial f}{\partial t} + \frac pE\frac{\hat p^i}{a}\frac{\partial f}{\partial x^i} - Hp\frac{\partial f}{\partial p}.`}</Eq>
      <Tx>{R`通过扰动度规 \eqref{3.49} 计入宇宙中的结构，并假设所有扰动都很小、可以在线性阶工作，Boltzmann 方程成为`}</Tx>
      <Eq n="3.83" say="扰动宇宙中（线性阶）Boltzmann 方程的左边：红移项被局域膨胀 $\dot\Phi$ 与引力势梯度修正。">{R`\frac{df}{dt} = \frac{\partial f}{\partial t} + \frac pE\frac{\hat p^i}{a}\frac{\partial f}{\partial x^i} - \left[H + \dot\Phi + \frac{E}{ap}\hat p^i\Psi_{,i}\right]p\frac{\partial f}{\partial p}.`}</Eq>
      <Tx>{R`Boltzmann 方程的第二部分是右边的碰撞项 $C[f]$。它刻画一切微观的散射、对产生、湮灭和衰变过程。特别地，对两粒子散射过程`}</Tx>
      <Eq n="3.84" say="一般的两体反应及其逆反应。">{R`(1)_{\vp} + (2)_{\boldsymbol q} \leftrightarrow (3)_{\vp'} + (4)_{\boldsymbol q'},`}</Eq>
      <Tx>{R`我们推出了如下碰撞项：`}</Tx>
      <Eq n="3.85" say="两体碰撞项（两边乘以 $a$ 的形式）：洛伦兹不变相空间积分 $\times$ 振幅平方 $\times$ 能动量守恒 $\times$ “得到 − 失去”。">{R`\begin{aligned}a\,C[f_1(\vp)] = \frac{a}{2E_1(p)}&\int\frac{d^3q}{(2\pi)^32E_2(q)}\int\frac{d^3p'}{(2\pi)^32E_3(p')}\int\frac{d^3q'}{(2\pi)^32E_4(q')}|\mathcal M|^2\\ &\times(2\pi)^4\delta_{\rm D}^{(3)}[\vp+\boldsymbol q-\vp'-\boldsymbol q']\\ &\qquad\times\delta_{\rm D}^{(1)}[E_1(p)+E_2(q)-E_3(p')-E_4(q')]\\ &\times\Big\{f_3(\vp')f_4(\boldsymbol q')\left[1\pm f_1(\vp)\right]\left[1\pm f_2(\boldsymbol q)\right]\\ &\qquad - f_1(\vp)f_2(\boldsymbol q)\left[1\pm f_3(\vp')\right]\left[1\pm f_4(\boldsymbol q')\right]\Big\}.\end{aligned}`}</Eq>
      <Tx>{R`（这里两边都乘了 $a$——与 \eqref{3.48} 等价。后面改用共形时间 $d\eta=dt/a$ 时，$a\,C[f]$ 正是 $df/d\eta$ 右边出现的组合。）

分布函数反过来告诉我们：要放进 Einstein 方程右边的**能动张量**是什么。在扰动宇宙中普遍成立的表达式是 \eqref{3.20}。它看起来比实际可怕；你可以在 \exref{3.12} 中证明：\eqref{3.20} 与 \eqref{3.80} 一起，给出扰动宇宙中简并度为 $\sym{ch03-gdeg}{g}$ 的单一成分的能动张量：`}</Tx>
      <Eq n="3.86" keyEq title="扰动宇宙中的能动张量" say="一上一下指标的能动张量非常简洁：$T^0{}_0$ 是负的能量密度，$T^0{}_i$ 是动量密度（一阶量），$T^i{}_j$ 是压强与各向异性应力。">{R`\begin{aligned}T^0{}_0(\vx,t) &= -\sym{ch03-gdeg}{g}\int\frac{d^3p}{(2\pi)^3}E(p)f(\vx,\vp,t),\\ T^0{}_i(\vx,t) &= \sym{ch03-gdeg}{g}\,a(1+\Phi-\Psi)\int\frac{d^3p}{(2\pi)^3}p_if(\vx,\vp,t),\\ T^i{}_j(\vx,t) &= \sym{ch03-gdeg}{g}\int\frac{d^3p}{(2\pi)^3}\frac{p^ip_j}{E(p)}f(\vx,\vp,t).\end{aligned}`}</Eq>
      <Tx>{R`注意这些简单的表达式适用于**一个指标升起**的能动张量。事实上，$T^0{}_i$ 中对 $p_if(\boldsymbol x,\boldsymbol p,t)$ 的积分将是扰动的一阶量（零阶分布各向同性，积分为零），所以前因子中的 $\Phi-\Psi$ 可以丢掉——它们只贡献二阶项。`}</Tx>
      <Table head={[R`方程`, R`均匀宇宙`, R`扰动宇宙（线性阶）`, R`用在哪里`]} rows={[
        [R`Einstein`, R`$H^2/H_0^2=\sum_s\Omega_sa^{-3(1+w_s)}+\Omega_{\rm K}a^{-2}$ \eqref{3.14}`, R`第 6 章`, R`膨胀史（第 2–4 章）；势的演化（第 6 章）`],
        [R`测地线`, R`$dp/dt=-Hp$ \eqref{3.37}`, R`$dp/dt=-(H+\dot\Phi)p-\frac Ea\hat p^i\Psi_{,i}$ \eqref{3.71}；偏折 \eqref{3.72}`, R`红移、ISW、引力透镜（第 13 章）`],
        [R`Boltzmann 左边`, R`\eqref{3.38}／\eqref{3.82}`, R`辐射 \eqref{3.74}；有质量 \eqref{3.76}`, R`CMB（第 5、9 章）；暗物质（第 5 章）`],
        [R`碰撞项`, R`\eqref{3.48}`, R`同左`, R`冻结、BBN、复合（第 4 章）；Compton 散射（第 5 章）`],
        [R`能动张量`, R`$\rho$、$\mathcal P$（\exref{3.7}）`, R`\eqref{3.86}`, R`Einstein 方程右边`],
      ]} caption={R`本章方程一览：左列给出背景（零阶）形式，中列给出一阶形式。`} />
      <Box kind="key" title="本章思路一图流">{R`**引力**：Ricci 张量 \eqref{3.3} + FLRW 的 $\Gamma^\mu{}_{\alpha\beta}$ → $R_{00}$、$R_{ij}$、$R$ \eqref{3.6}–\eqref{3.9} → Einstein 方程 00 分量 \eqref{3.11} → Friedmann 方程 \eqref{3.12}–\eqref{3.14}。

**统计**：粒子数守恒 $df/dt=0$ \eqref{3.17} → 加碰撞 $df/dt=C[f]$ \eqref{3.19} → 膨胀宇宙 \eqref{3.38} → 数密度 $\dot n+3Hn=\int C$ \eqref{3.43}；碰撞项 \eqref{3.48}。

**扰动**：度规 \eqref{3.49} → $\Gamma^\mu{}_{\alpha\beta}$ \eqref{3.52}–\eqref{3.56} → 四动量 \eqref{3.60} → $dp^i/dt$ \eqref{3.69} → 大小 \eqref{3.71} + 方向 \eqref{3.72} → 线性 Boltzmann 方程 \eqref{3.74}、\eqref{3.76}。`}</Box>
    </Sec>);
}
