// §11.5 陈–Simons 形式 —— 式 (11.100)–(11.128)，例 11.9–11.10，习题 11.4
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Derivation, Exercise, C } from "@kit";

const R = String.raw;

export function Sec115() {
  return (
    <Sec n="11.5" title="Chern–Simons forms" zh="陈–Simons 形式"
      gist={R`示性类局部恰当：$P_j(\mathcal{F})=\dd Q_{2j-1}(\mathcal{A},\mathcal{F})$，$Q$ 由超渡 $TP_j(\mathcal{A},0)$ 给出（不能整体成立）→ 陈特征的 CS 形式 $Q_{2j-1}=\frac1{(j-1)!}(\frac{\mathrm{i}}{2\pi})^j\int_0^1\dd t\,\mathrm{str}(\mathcal{A},\mathcal{F}_t^{j-1})$，$Q_3=\frac12(\frac{\mathrm{i}}{2\pi})^2\Tr(\mathcal{A}\dd\mathcal{A}+\frac23\mathcal{A}^3)$ → Cartan 同伦公式 $S(\mathcal{A}_1,\mathcal{F}_1)-S(\mathcal{A}_0,\mathcal{F}_0)=(\dd k_{01}+k_{01}\dd)S$ → 规范变换下 $\delta Q_{2j+1}=Q_{2j+1}(g^{-1}\dd g,0)+\dd\alpha_{2j}$ → 三维 Maxwell–Chern–Simons：规范不变的光子质量。`}
      why={R`示性类本身是规范不变的，但它的"原函数"不是；正是这种"差一点不变"在物理上产生了拓扑质量、量子化的耦合常数（三维 CS 理论）与规范反常（第 13 章）。Cartan 同伦公式是把这些计算系统化的工具。`}
      gives={["11.100", "11.101", "11.102", "11.105", "11.106b", "11.106c", "11.107", "11.112", "11.114", "11.118", "11.120", "11.121", "11.122", "11.128"]}>
      <p className="muted">本节概念：<C id="chern_simons" /> · <C id="chern_weil" /></p>

      <Sub n="11.5.1" title="Definition" zh="定义">
        <Tx>{R`设 $P_j(\mathcal{F})$ 是任意一个 $2j$ 形式示性类。由于 $P_j(\mathcal{F})$ 是闭的，由 Poincaré 引理（\sref{T6.3}）它局部地可以写成恰当形式。记`}</Tx>
        <Eq n="11.100" keyEq title="示性类的局部原函数" say={R`在一张坐标卡上，任何示性形式都是某个 $(2j-1)$ 形式的外微分——这个"原函数"就是陈–Simons 形式。`}>{R`P_j(\mathcal{F})=\dd Q_{2j-1}(\mathcal{A},\mathcal{F})`}</Eq>
        <Tx>{R`其中 $Q_{2j-1}(\mathcal{A},\mathcal{F})\in\Omega^{2j-1}(M)$。［原书写作 $\mathfrak{g}\otimes\Omega^{2j-1}(M)$；$Q$ 由迹构成，是普通的（标量值）形式。］［**警告：**这不能整体成立。若在无边界流形 $M$ 上整体地有 $P_j=\dd Q_{2j-1}$，就会有

$$\int_MP_{m/2}=\int_M\dd Q_{m-1}=\int_{\partial M}Q_{m-1}=0$$

其中 $m=\dim M$——而例 11.2、11.4 中这样的积分明明不为零。］$Q_{2j-1}(\mathcal{A},\mathcal{F})$ 这个 $(2j-1)$ 形式称为 $P_j(\mathcal{F})$ 的**陈–Simons 形式**（Chern–Simons form）。由\sref{T11.1}(b)（\eqref{11.20}）的证明可知，$Q$ 由 $P_j$ 的超渡给出：`}</Tx>
        <Eq n="11.101" keyEq title="陈–Simons 形式 = 超渡" say={R`陈–Simons 形式就是从零联络到 $\mathcal{A}$ 的超渡形式：在一张卡上把 $\mathcal{A}$ 从 0 开始逐渐"打开"。`}>{R`Q_{2j-1}(\mathcal{A},\mathcal{F})=TP_j(\mathcal{A},0)=j\int_0^1\tilde P_j(\mathcal{A},\mathcal{F}_t,\ldots,\mathcal{F}_t)\,\dd t`}</Eq>
        <Tx>{R`其中 $\tilde P_j$ 是 $P_j$ 的极化，$\mathcal{F}=\dd\mathcal{A}+\mathcal{A}^2$，并令 $\mathcal{A}'=\mathcal{F}'=0$——\eqref{11.21} 中把"第二个联络"取为零。由于 $Q_{2j-1}$ 依赖于 $\mathcal{F}$ 与 $\mathcal{A}$，我们明确写出它对 $\mathcal{A}$ 的依赖。当然，只有在丛平凡的局部坐标卡上才能令 $\mathcal{A}'=0$（零联络不是整体定义的），这正是 $Q$ 只在局部成立的原因。

设 $M$ 是偶数维流形（$\dim M=m=2l$），且 $\partial M\neq\emptyset$，并设丛在 $M$ 上可以平凡化（例如 $M$ 是 $\R^{2l}$ 中的球体）。由 Stokes 定理，`}</Tx>
        <Eq n="11.102" keyEq title="体积分 = 边界上的 CS 积分" say={R`示性形式在带边流形上的积分，等于陈–Simons 形式在边界上的积分：拓扑荷"住在"边界上。`}>{R`\int_MP_l(\mathcal{F})=\int_M\dd Q_{m-1}(\mathcal{A},\mathcal{F})=\int_{\partial M}Q_{m-1}(\mathcal{A},\mathcal{F}).`}</Eq>
        <Tx>{R`左边取整数值（当 $M$ 的边界上场强为零、可以把 $M$ 粘成闭流形时，例如瞬子的 $\R^4\cup\{\infty\}=S^4$），右边也是如此。因此 $Q_{m-1}$ 本身就是一个示性类，它刻画边界 $\partial M$ 的拓扑。（例：瞬子数化为 $S^3$ 上纯规范 $g^{-1}\dd g$ 的 CS 积分，\sref{L10.4}。）`}</Tx>
      </Sub>

      <Sub n="11.5.2" title="The Chern–Simons form of the Chern character" zh="陈特征的陈–Simons 形式">
        <Tx>{R`作为例子，我们来求陈特征 $\mathrm{ch}_j(\mathcal{F})$ 的陈–Simons 形式。在 0 与 $\mathcal{A}$ 之间插值的联络为`}</Tx>
        <Eq n="11.103" say={R`从零联络到 $\mathcal{A}$ 的直线：把规范势整体乘以 $t$。`}>{R`\mathcal{A}_t=t\mathcal{A}`}</Eq>
        <Tx>{R`相应的曲率为`}</Tx>
        <Eq n="11.104" say={R`缩放后的联络的曲率：线性项 $t\,\dd\mathcal{A}$ 与平方项 $t^2\mathcal{A}^2$ 缩放不同，所以 $\mathcal{F}_t\neq t\mathcal{F}$。`}>{R`\mathcal{F}_t=t\,\dd\mathcal{A}+t^2\mathcal{A}^2=t\mathcal{F}+(t^2-t)\mathcal{A}^2.`}</Eq>
        <Tx>{R`由 \eqref{11.21}（$P_j=\mathrm{ch}_j=\frac1{j!}\Tr(\frac{\mathrm{i}\mathcal{F}}{2\pi})^j$，其极化是 $\frac1{j!}(\frac{\mathrm{i}}{2\pi})^j\mathrm{str}$，乘以 $j$ 得 $\frac1{(j-1)!}$）得到`}</Tx>
        <Eq n="11.105" keyEq title="陈特征的 CS 形式" say={R`陈特征的陈–Simons 形式：一个 $\mathcal{A}$ 配 $j-1$ 个插值曲率，做对称化迹再对 $t$ 积分。`}>{R`Q_{2j-1}(\mathcal{A},\mathcal{F})=\frac1{(j-1)!}\Big(\frac{\mathrm{i}}{2\pi}\Big)^j\int_0^1\dd t\,\mathrm{str}(\mathcal{A},\mathcal{F}_t^{j-1}).`}</Eq>
        <Tx>{R`例如，`}</Tx>
        <Eq n="11.106a" say={R`一维 CS 形式：规范势的迹本身（U(1) 时就是 $\frac{\mathrm{i}}{2\pi}\mathcal{A}$，其环路积分是 Wilson 圈的相位）。`}>{R`Q_1(\mathcal{A},\mathcal{F})=\frac{\mathrm{i}}{2\pi}\int_0^1\dd t\,\Tr\mathcal{A}=\frac{\mathrm{i}}{2\pi}\Tr\mathcal{A}`}</Eq>
        <Eq n="11.106b" keyEq title={R`三维 CS 形式 $Q_3$`} say={R`著名的三维陈–Simons 形式：$\mathcal{A}\dd\mathcal{A}+\frac23\mathcal{A}^3$ 的迹——它的外微分是 $\mathrm{ch}_2$。`}>{R`Q_3(\mathcal{A},\mathcal{F})=\Big(\frac{\mathrm{i}}{2\pi}\Big)^2\int_0^1\dd t\,\mathrm{str}(\mathcal{A},t\,\dd\mathcal{A}+t^2\mathcal{A}^2)=\frac12\Big(\frac{\mathrm{i}}{2\pi}\Big)^2\Tr\Big(\mathcal{A}\,\dd\mathcal{A}+\frac23\mathcal{A}^3\Big).`}</Eq>
        <Eq n="11.106c" say={R`五维 CS 形式：三项，系数 $1,\frac32,\frac35$ 来自 $t$ 积分 $\int t^2,\int t^3,\int t^4$。`}>{R`Q_5(\mathcal{A},\mathcal{F})=\frac12\Big(\frac{\mathrm{i}}{2\pi}\Big)^3\int_0^1\dd t\,\mathrm{str}[\mathcal{A},(t\,\dd\mathcal{A}+t^2\mathcal{A}^2)^2]=\frac16\Big(\frac{\mathrm{i}}{2\pi}\Big)^3\Tr\Big[\mathcal{A}(\dd\mathcal{A})^2+\frac32\mathcal{A}^3\dd\mathcal{A}+\frac35\mathcal{A}^5\Big].`}</Eq>
        <Derivation title={R`\eqref{11.106b}、\eqref{11.106c} 的 $t$ 积分（补充）`} collapsed steps={[
          { tex: R`\mathrm{str}(\mathcal{A},X)=\Tr(\mathcal{A}X),\qquad\mathrm{str}(\mathcal{A},X,X)=\Tr(\mathcal{A}X^2)\quad(X\text{ 为偶次形式})`, why: R`偶次形式在迹中可以自由循环移动，所以对称化后每一项都等于 $\Tr(\mathcal{A}X\cdots)$。` },
          { tex: R`\int_0^1\Tr[\mathcal{A}(t\,\dd\mathcal{A}+t^2\mathcal{A}^2)]\dd t=\tfrac12\Tr(\mathcal{A}\,\dd\mathcal{A})+\tfrac13\Tr\mathcal{A}^3=\tfrac12\Tr(\mathcal{A}\,\dd\mathcal{A}+\tfrac23\mathcal{A}^3)`, why: R`得 \eqref{11.106b}。` },
          { tex: R`(t\,\dd\mathcal{A}+t^2\mathcal{A}^2)^2=t^2(\dd\mathcal{A})^2+t^3(\dd\mathcal{A}\,\mathcal{A}^2+\mathcal{A}^2\dd\mathcal{A})+t^4\mathcal{A}^4`, why: R`展开平方（各项都是偶次形式）。` },
          { tex: R`\Tr(\mathcal{A}\,\dd\mathcal{A}\,\mathcal{A}^2)=\Tr(\mathcal{A}^2\cdot\mathcal{A}\,\dd\mathcal{A})=\Tr(\mathcal{A}^3\dd\mathcal{A})`, why: R`把偶次形式 $\mathcal{A}^2$ 循环移到最前。所以 $t^3$ 项的迹是 $2\Tr(\mathcal{A}^3\dd\mathcal{A})$。` },
          { tex: R`\int_0^1\!\Tr[\mathcal{A}(\ldots)^2]\dd t=\tfrac13\Tr\mathcal{A}(\dd\mathcal{A})^2+\tfrac24\Tr\mathcal{A}^3\dd\mathcal{A}+\tfrac15\Tr\mathcal{A}^5=\tfrac13\Tr\Big[\mathcal{A}(\dd\mathcal{A})^2+\tfrac32\mathcal{A}^3\dd\mathcal{A}+\tfrac35\mathcal{A}^5\Big]`, why: R`再乘以 $\frac12(\frac{\mathrm{i}}{2\pi})^3$（$j=3$ 时 $\frac1{(j-1)!}=\frac12$）得 \eqref{11.106c}。` },
        ]} />
        <Exercise n="11.4" title={R`$\mathrm{ch}_2=\dd Q_3$ 的分量形式`} level="★★"
          hint={R`$\mathrm{ch}_2=\frac12(\frac{\mathrm{i}}{2\pi})^2\Tr\mathcal{F}^2$ 与 $Q_3$ 有相同的前因子，所以只需验证 $\Tr\mathcal{F}^2=\dd\Tr(\mathcal{A}\dd\mathcal{A}+\frac23\mathcal{A}^3)$（\sref{L10.3}）。把两边写成 $\dd x^\kappa\wedge\dd x^\lambda\wedge\dd x^\mu\wedge\dd x^\nu=\epsilon^{\kappa\lambda\mu\nu}\dd^4x$ 的倍数，注意 $\mathcal{F}=\frac12\mathcal{F}_{\kappa\lambda}\dd x^\kappa\wedge\dd x^\lambda$ 中的 $\frac12$。`}
          solution={R`**左边。**$\mathcal{F}\wedge\mathcal{F}=\frac14\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}\dd x^\kappa\wedge\dd x^\lambda\wedge\dd x^\mu\wedge\dd x^\nu=\frac14\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}\,\dd^4x$，所以 $\Tr\mathcal{F}^2=\frac14\Tr[\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}]\dd^4x$。

**右边。**$\mathcal{A}\,\dd\mathcal{A}=\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu\,\dd x^\lambda\wedge\dd x^\mu\wedge\dd x^\nu$，$\mathcal{A}^3=\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu\,\dd x^\lambda\wedge\dd x^\mu\wedge\dd x^\nu$；外微分在前面加 $\partial_\kappa\,\dd x^\kappa$：

$$\dd\Tr\Big(\mathcal{A}\dd\mathcal{A}+\frac23\mathcal{A}^3\Big)=\partial_\kappa\Big[\epsilon^{\kappa\lambda\mu\nu}\Tr\Big(\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu+\frac23\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu\Big)\Big]\dd^4x.$$

**比较。**由 $\Tr\mathcal{F}^2=\dd\Tr(\mathcal{A}\dd\mathcal{A}+\frac23\mathcal{A}^3)$（\sref{L10.3}，或 $\mathrm{ch}_2=\dd Q_3$ 两边约去 $\frac12(\frac{\mathrm{i}}{2\pi})^2$）得

$$\Tr[\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}]=\partial_\kappa\Big[4\epsilon^{\kappa\lambda\mu\nu}\Tr\Big(\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu+\frac23\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu\Big)\Big].$$

**阿贝尔检验。**U(1) 时 $\mathcal{A}^3=0$，$\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}=\epsilon^{\kappa\lambda\mu\nu}(2\partial_\kappa\mathcal{A}_\lambda)(2\partial_\mu\mathcal{A}_\nu)=4\partial_\kappa(\epsilon^{\kappa\lambda\mu\nu}\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu)$（$\epsilon$ 与 $\partial_\kappa\partial_\mu$ 缩并为零）。系数确为 4，见下面的勘误。

**直接验证非阿贝尔部分（概要）。**代入 $\mathcal{F}_{\kappa\lambda}=\partial_\kappa\mathcal{A}_\lambda-\partial_\lambda\mathcal{A}_\kappa+[\mathcal{A}_\kappa,\mathcal{A}_\lambda]$：$\epsilon\Tr\mathcal{F}\mathcal{F}=4\epsilon\Tr(\partial_\kappa\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu)+8\epsilon\Tr(\partial_\kappa\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu)+\epsilon\Tr([\mathcal{A}_\kappa,\mathcal{A}_\lambda][\mathcal{A}_\mu,\mathcal{A}_\nu])$，最后一项 $=4\epsilon\Tr(\mathcal{A}_\kappa\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu)=0$（循环一位是奇置换）。右边 $4\partial_\kappa[\epsilon\Tr\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu]=4\epsilon\Tr(\partial_\kappa\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu)$，$\frac83\partial_\kappa[\epsilon\Tr\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu]=\frac83\cdot3\,\epsilon\Tr(\partial_\kappa\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu)=8\epsilon\Tr(\partial_\kappa\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu)$（三项由循环性与 $\epsilon$ 的反对称性相等）。两边一致。`}>
          {R`设 $\mathcal{F}$ 是 $\mathrm{SU}(2)$ 规范理论的场强。写出恒等式 $\mathrm{ch}_2(\mathcal{F})=\dd Q_3(\mathcal{A},\mathcal{F})$ 的分量表达式，验证（参见引理 10.3）\eqref{11.107}。`}
        </Exercise>
        <Eq n="11.107" say={R`$\mathrm{ch}_2=\dd Q_3$ 的分量形式：瞬子密度 $\epsilon\Tr\mathcal{F}\mathcal{F}$ 是一个流的散度（系数见勘误）。`}>{R`\Tr[\epsilon^{\kappa\lambda\mu\nu}\mathcal{F}_{\kappa\lambda}\mathcal{F}_{\mu\nu}]=\partial_\kappa\big[4\epsilon^{\kappa\lambda\mu\nu}\Tr\big(\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu+\tfrac23\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu\big)\big].`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{11.107} 的系数（p.464）`}>{R`原书右边方括号内的系数印作 $2$，应为 $4$。来源：$\mathcal{F}=\frac12\mathcal{F}_{\kappa\lambda}\dd x^\kappa\wedge\dd x^\lambda$ 使 $\Tr\mathcal{F}^2=\frac14\epsilon\Tr\mathcal{F}\mathcal{F}\,\dd^4x$，而 $\dd Q$ 的分量没有这个 $\frac14$。阿贝尔情形 $\epsilon^{\kappa\lambda\mu\nu}F_{\kappa\lambda}F_{\mu\nu}=4\partial_\kappa(\epsilon^{\kappa\lambda\mu\nu}A_\lambda\partial_\mu A_\nu)$ 是熟知的结果（$F\tilde F$ 是 Chern–Simons 流的散度）。本站已改正。`}</Box>
      </Sub>

      <Sub n="11.5.3" title="Cartan's homotopy operator and applications" zh="Cartan 同伦算子及其应用">
        <Tx>{R`**为什么需要它。**\eqref{11.101} 给出了 CS 形式，但要研究它在规范变换下怎样变化，直接计算很繁琐。Cartan 同伦公式把"沿一族联络的变化"系统地写成"$\dd$ 加上一个算子"的形式，是后面（以及第 13 章 descent 方程）的通用工具。按 Zumino (1985) 与 Alvarez-Gaumé–Ginsparg (1985)，令`}</Tx>
        <Eq n="11.108" say={R`一般的直线插值：从任意 $\mathcal{A}_0$ 到 $\mathcal{A}_1$。`}>{R`\mathcal{A}_t=\mathcal{A}_0+t(\mathcal{A}_1-\mathcal{A}_0)\qquad\mathcal{F}_t=\dd\mathcal{A}_t+\mathcal{A}_t^2`}</Eq>
        <Tx>{R`同前。定义算子 $l_t$：`}</Tx>
        <Eq n="11.109" say={R`同伦算子 $l_t$：把联络"吃掉"得零，把曲率换成"联络的变化量"乘形式参数 $\delta t$——它把形式次数降一。`}>{R`l_t\mathcal{A}_t=0\qquad l_t\mathcal{F}_t=\delta t(\mathcal{A}_1-\mathcal{A}_0).`}</Eq>
        <Tx>{R`要求 $l_t$ 是反导子（anti-derivative）：`}</Tx>
        <Eq n="11.110" say={R`反 Leibniz 律：$l_t$ 越过 $p$ 形式时带符号 $(-1)^p$，与外微分 $\dd$ 的规则相同。`}>{R`l_t(\eta_p\omega_q)=(l_t\eta_p)\omega_q+(-1)^p\eta_p(l_t\omega_q)`}</Eq>
        <Tx>{R`对 $\eta_p\in\Omega^p(M)$、$\omega_q\in\Omega^q(M)$ 成立。我们验证

$$(\dd l_t+l_t\dd)\mathcal{A}_t=l_t(\mathcal{F}_t-\mathcal{A}_t^2)=\delta t(\mathcal{A}_1-\mathcal{A}_0)=\delta t\frac{\partial\mathcal{A}_t}{\partial t}$$

（$l_t\mathcal{A}_t=0$，且由反 Leibniz 律 $l_t(\mathcal{A}_t^2)=0$），以及

$$\begin{aligned}(\dd l_t+l_t\dd)\mathcal{F}_t&=\dd[\delta t(\mathcal{A}_1-\mathcal{A}_0)]+l_t[\mathcal{D}_t\mathcal{F}_t-\mathcal{A}_t\mathcal{F}_t+\mathcal{F}_t\mathcal{A}_t]\\&=\delta t[\dd(\mathcal{A}_1-\mathcal{A}_0)+\mathcal{A}_t(\mathcal{A}_1-\mathcal{A}_0)+(\mathcal{A}_1-\mathcal{A}_0)\mathcal{A}_t]\\&=\delta t\,\mathcal{D}_t(\mathcal{A}_1-\mathcal{A}_0)=\delta t\frac{\partial\mathcal{F}_t}{\partial t}\end{aligned}$$

这里用了 Bianchi 恒等式 $\mathcal{D}_t\mathcal{F}_t=0$（所以 $\dd\mathcal{F}_t=-\mathcal{A}_t\mathcal{F}_t+\mathcal{F}_t\mathcal{A}_t$）。［最后一步：$\partial_t\mathcal{F}_t=\dd(\mathcal{A}_1-\mathcal{A}_0)+(\mathcal{A}_1-\mathcal{A}_0)\mathcal{A}_t+\mathcal{A}_t(\mathcal{A}_1-\mathcal{A}_0)$。$\delta t$ 在这里当作与形式按反 Leibniz 律配合的形式参数，原书的符号约定即如此。］这表明对 $\mathcal{A}$ 与 $\mathcal{F}$ 的任何多项式 $S(\mathcal{A},\mathcal{F})$，都有`}</Tx>
        <Eq n="11.111" say={R`$\dd l_t+l_t\dd$ 就是"对参数 $t$ 求导"：它在生成元 $\mathcal{A}_t$、$\mathcal{F}_t$ 上成立，又满足 Leibniz 律，所以对一切多项式成立。`}>{R`(\dd l_t+l_t\dd)S(\mathcal{A}_t,\mathcal{F}_t)=\delta t\frac{\partial}{\partial t}S(\mathcal{A}_t,\mathcal{F}_t).`}</Eq>
        <Tx>{R`（为什么从生成元推广到多项式：两个反导子 $\dd$ 与 $l_t$ 的反对易子 $\dd l_t+l_t\dd$ 是一个*导子*——满足普通 Leibniz 律、不带符号；$\delta t\,\partial_t$ 也是导子。两个导子在生成元上相等，就在它们生成的整个代数上相等。）右边的 $S$ 必须只是 $\mathcal{A}$ 与 $\mathcal{F}$ 的多项式，不能含 $\dd\mathcal{A}$ 或 $\dd\mathcal{F}$：若 $S$ 含有它们，应先把 $\dd\mathcal{A}$ 换成 $\mathcal{F}-\mathcal{A}^2$，$\dd\mathcal{F}$ 换成 $\mathcal{D}\mathcal{F}-[\mathcal{A},\mathcal{F}]=-[\mathcal{A},\mathcal{F}]$——因为 $l_t$ 只在 $\mathcal{A}_t$、$\mathcal{F}_t$ 上有定义。把 \eqref{11.111} 在 $[0,1]$ 上积分，得到 **Cartan 同伦公式**：`}</Tx>
        <Eq n="11.112" keyEq title="Cartan 同伦公式" say={R`联络两端的任意多项式之差 = $\dd$ 与同伦算子 $k_{01}$ 的反对易子作用在插值族上：沿联络空间"积分"的万能公式。`}>{R`S(\mathcal{A}_1,\mathcal{F}_1)-S(\mathcal{A}_0,\mathcal{F}_0)=(\dd k_{01}+k_{01}\dd)S(\mathcal{A}_t,\mathcal{F}_t)`}</Eq>
        <Tx>{R`其中**同伦算子** $k_{01}$ 定义为`}</Tx>
        <Eq n="11.113" say={R`同伦算子：先用 $l_t$ 降一次，再对 $t$ 从 0 积到 1。`}>{R`k_{01}S(\mathcal{A}_t,\mathcal{F}_t)\equiv\int_0^1\delta t\,l_tS(\mathcal{A}_t,\mathcal{F}_t).`}</Eq>
        <Tx>{R`要把 $k_{01}$ 作用在 $S(\mathcal{A},\mathcal{F})$ 上，先把 $\mathcal{A}$、$\mathcal{F}$ 分别换成 $\mathcal{A}_t$、$\mathcal{F}_t$，再让 $l_t$ 作用在 $S(\mathcal{A}_t,\mathcal{F}_t)$ 上，最后对 $t$ 积分。`}</Tx>
        <Stmt id="F:cartan-homotopy" toc={false} />

        <Box kind="example" n="11.9" title="用同伦公式重新求陈–Simons 形式">
          <Tx>{R`取 $S(\mathcal{A},\mathcal{F})=\mathrm{ch}_{j+1}(\mathcal{F})$，$\mathcal{A}_1=\mathcal{A}$，$\mathcal{A}_0=0$。由于 $\dd\,\mathrm{ch}_{j+1}(\mathcal{F})=0$，

$$\mathrm{ch}_{j+1}(\mathcal{F})=(\dd k_{01}+k_{01}\dd)\mathrm{ch}_{j+1}(\mathcal{F}_t)=\dd[k_{01}\mathrm{ch}_{j+1}(\mathcal{F}_t)].$$

（$S(\mathcal{A}_0,\mathcal{F}_0)=\mathrm{ch}_{j+1}(0)=0$。）因此 $k_{01}\mathrm{ch}_{j+1}(\mathcal{F})$ 就是陈–Simons 形式 $Q_{2j+1}(\mathcal{A},\mathcal{F})$。我们求得`}</Tx>
          <Eq n="11.114" say={R`$l_t$ 作用在 $\Tr\mathcal{F}_t^{j+1}$ 上：依次把每个 $\mathcal{F}_t$ 换成 $\mathcal{A}$，共 $j+1$ 项，合成对称化迹——结果与 \eqref{11.105} 一致。`}>{R`\begin{aligned}k_{01}\mathrm{ch}_{j+1}(\mathcal{F}_t)&=\frac1{(j+1)!}k_{01}\Tr\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big)^{j+1}=\frac1{(j+1)!}\Big(\frac{\mathrm{i}}{2\pi}\Big)^{j+1}\int_0^1\delta t\,l_t\Tr(\mathcal{F}_t^{j+1})\\&=\frac1{j!}\Big(\frac{\mathrm{i}}{2\pi}\Big)^{j+1}\int_0^1\delta t\,\mathrm{str}(\mathcal{A},\mathcal{F}_t^j)\end{aligned}`}</Eq>
          <Tx>{R`与 \eqref{11.105}（$j\to j+1$）一致。`}</Tx>
        </Box>

        <Tx>{R`**陈–Simons 形式的规范变换。**虽然示性类是规范不变的，陈–Simons 形式却不必如此。作为 Cartan 同伦公式的应用，我们计算 $Q_{2j+1}(\mathcal{A},\mathcal{F})$ 在

$$\mathcal{A}\to\mathcal{A}^g=g^{-1}(\mathcal{A}+\dd)g,\qquad\mathcal{F}\to\mathcal{F}^g=g^{-1}\mathcal{F}g$$

下的变化。考虑如下定义的插值族 $\mathcal{A}^g_t$ 与 $\mathcal{F}^g_t$：`}</Tx>
        <Eq n="11.115a" say={R`从纯规范 $g^{-1}\dd g$（$t=0$）到 $\mathcal{A}^g$（$t=1$）的插值。`}>{R`\mathcal{A}^g_t\equiv tg^{-1}\mathcal{A}g+g^{-1}\dd g`}</Eq>
        <Eq n="11.115b" say={R`它的曲率就是 $\mathcal{A}_t=t\mathcal{A}$ 的曲率被 $g$ 共轭：因为 $\mathcal{A}^g_t$ 本身是 $t\mathcal{A}$ 的规范变换。`}>{R`\mathcal{F}^g_t\equiv\dd\mathcal{A}^g_t+(\mathcal{A}^g_t)^2=g^{-1}\mathcal{F}_tg`}</Eq>
        <Tx>{R`其中 $\mathcal{F}_t\equiv t\mathcal{F}+(t^2-t)\mathcal{A}^2$。注意 $\mathcal{A}^g_0=g^{-1}\dd g$，$\mathcal{A}^g_1=\mathcal{A}^g$，$\mathcal{F}^g_0=0$，$\mathcal{F}^g_1=\mathcal{F}^g$。（\eqref{11.115b} 的验证：$\mathcal{A}^g_t=g^{-1}(t\mathcal{A}+\dd)g$ 就是 $t\mathcal{A}$ 的规范变换，规范变换下曲率共轭变换，而 $t\mathcal{A}$ 的曲率由 \eqref{11.104} 给出。）\eqref{11.112} 给出`}</Tx>
        <Eq n="11.116" say={R`对规范变换族应用同伦公式：两端的 CS 形式之差写成 $\dd k_{01}+k_{01}\dd$ 作用的结果。`}>{R`Q_{2j+1}(\mathcal{A}^g,\mathcal{F}^g)-Q_{2j+1}(g^{-1}\dd g,0)=(\dd k_{01}+k_{01}\dd)Q_{2j+1}(\mathcal{A}^g_t,\mathcal{F}^g_t).`}</Eq>
        <Tx>{R`例如，设 $Q_{2j+1}$ 是陈特征 $\mathrm{ch}_{j+1}(\mathcal{F})$ 的陈–Simons 形式。由于 $\dd Q_{2j+1}(\mathcal{A}^g_t,\mathcal{F}^g_t)=\mathrm{ch}_{j+1}(\mathcal{F}^g_t)=\mathrm{ch}_{j+1}(\mathcal{F}_t)$，有`}</Tx>
        <Eq n="11.117" say={R`$k_{01}\dd$ 那一项：陈特征规范不变，所以它就是例 11.9 的 CS 形式本身。`}>{R`k_{01}\dd Q_{2j+1}(\mathcal{A}^g_t,\mathcal{F}^g_t)=k_{01}\mathrm{ch}_{j+1}(\mathcal{F}^g_t)=k_{01}\mathrm{ch}_{j+1}(\mathcal{F}_t)=Q_{2j+1}(\mathcal{A},\mathcal{F})`}</Eq>
        <Tx>{R`最后一个等号用了例 11.9 的结果。（第二个等号：$l_t$ 在两族上的作用对应——$l_t\mathcal{F}^g_t=\delta t\,g^{-1}\mathcal{A}g$，与 $l_t\mathcal{F}_t=\delta t\,\mathcal{A}$ 只差共轭，迹不变。）把这些结果合起来，\eqref{11.116} 写成`}</Tx>
        <Eq n="11.118" keyEq title="CS 形式的规范变化" say={R`规范变换下，陈–Simons 形式只改变两样东西：一个只依赖于 $g$ 的闭形式（积分是绕数），加一个恰当形式（积分为零）。`}>{R`Q_{2j+1}(\mathcal{A}^g,\mathcal{F}^g)-Q_{2j+1}(\mathcal{A},\mathcal{F})=Q_{2j+1}(g^{-1}\dd g,0)+\dd\alpha_{2j}`}</Eq>
        <Tx>{R`其中 $\alpha_{2j}$ 是如下定义的 $2j$ 形式：`}</Tx>
        <Eq n="11.119" say={R`$\alpha_{2j}$：对插值族的 CS 形式施加同伦算子；把 $g$ 共轭掉后只依赖于 $\mathcal{A}_t$、$\mathcal{F}_t$ 与 $v=\dd g\,g^{-1}$。`}>{R`\alpha_{2j}(\mathcal{A},\mathcal{F},v)\equiv k_{01}Q_{2j+1}(\mathcal{A}^g_t,\mathcal{F}^g_t)=k_{01}Q_{2j+1}(\mathcal{A}_t+v,\mathcal{F}_t)`}</Eq>
        <Tx>{R`其中 $v\equiv\dd g\cdot g^{-1}$。［注意 $Q_{2j+1}(\mathcal{A},\mathcal{F})=Q_{2j+1}(g\mathcal{A}g^{-1},g\mathcal{F}g^{-1})$——把 $Q$ 写成 $\mathcal{A}$、$\mathcal{F}$ 的迹多项式时（不出现 $\dd\mathcal{A}$），它在常数式的共轭下不变；而 $g\mathcal{A}^g_tg^{-1}=t\mathcal{A}+\dd g\,g^{-1}=\mathcal{A}_t+v$，$g\mathcal{F}^g_tg^{-1}=\mathcal{F}_t$。］\eqref{11.118} 右边第一项为`}</Tx>
        <Eq n="11.120" keyEq title="纯规范的 CS 形式" say={R`纯规范的 CS 形式：只剩 $(g^{-1}\dd g)^{2j+1}$ 的迹，乘一个 Beta 函数系数——它在 $S^{2j+1}$ 上的积分是 $g$ 的映射度（$j=1$ 时即 \sref{T10.7}）。`}>{R`\begin{aligned}Q_{2j+1}(g^{-1}\dd g,0)&=\frac1{j!}\Big(\frac{\mathrm{i}}{2\pi}\Big)^{j+1}\int_0^1\delta t\,\Tr[g^{-1}\dd g\{(t^2-t)(g^{-1}\dd g)^2\}^j]\\&=\frac1{j!}\Big(\frac{\mathrm{i}}{2\pi}\Big)^{j+1}\Tr[(g^{-1}\dd g)^{2j+1}]\int_0^1\delta t\,(t^2-t)^j\\&=(-1)^j\frac{j!}{(2j+1)!}\Big(\frac{\mathrm{i}}{2\pi}\Big)^{j+1}\Tr[(g^{-1}\dd g)^{2j+1}]\end{aligned}`}</Eq>
        <Tx>{R`这里注意到（纯规范 $\mathcal{A}=g^{-1}\dd g$ 的曲率为零，\eqref{11.104} 中只剩 $\mathcal{A}^2$ 项）$\mathcal{F}_t=(t^2-t)(g^{-1}\dd g)^2$，以及

$$\int_0^1\delta t\,(t^2-t)^j=(-1)^jB(j+1,j+1)=(-1)^j\frac{(j!)^2}{(2j+1)!}$$

$B$ 是 Beta 函数。$(2j+1)$ 形式 $Q_{2j+1}(g^{-1}\dd g,0)$ 是闭的，因而局部恰当：$\dd Q_{2j+1}(g^{-1}\dd g,0)=\mathrm{ch}_{j+1}(0)=0$。（原书此处误印为 $Q_{2j+1}(g\,\dd g,0)$。）`}</Tx>
        <Derivation title={R`$j=1$ 的检验：与第 10 章的瞬子数公式对照（补充）`} collapsed steps={[
          { tex: R`Q_3(g^{-1}\dd g,0)=-\frac{1}{6}\Big(\frac{\mathrm{i}}{2\pi}\Big)^2\Tr(g^{-1}\dd g)^3=\frac{1}{24\pi^2}\Tr(g^{-1}\dd g)^3`, why: R`$j=1$：$(-1)\frac{1!}{3!}=-\frac16$，$(\frac{\mathrm{i}}{2\pi})^2=-\frac1{4\pi^2}$。` },
          { tex: R`\text{另一方面 }Q_3(\mathcal{A},\mathcal{F})|_{\mathcal{A}=g^{-1}\dd g}=\frac12\Big(\frac{\mathrm{i}}{2\pi}\Big)^2\Tr\Big(\mathcal{A}\dd\mathcal{A}+\frac23\mathcal{A}^3\Big)=\frac12\Big(\frac{\mathrm{i}}{2\pi}\Big)^2\Big(-\frac13\Big)\Tr\mathcal{A}^3`, why: R`纯规范时 $\dd\mathcal{A}=-\mathcal{A}^2$。两种算法一致。` },
          { tex: R`\int_{S^3}Q_3(g^{-1}\dd g,0)=\frac1{24\pi^2}\int_{S^3}\Tr(g^{-1}\dd g)^3=\deg g`, why: R`这正是 \sref{T10.7} 的映射度公式：\eqref{11.118} 中规范变换使 CS 积分改变一个整数。` },
        ]} />
        <Tx>{R`至于 $\alpha_{2j}$，例如有`}</Tx>
        <Eq n="11.121" say={R`最简单的 $\alpha$：二形式 $-\frac12(\frac{\mathrm{i}}{2\pi})^2\Tr(v\mathcal{A})$，它是三维 CS 作用量规范变换中的"边界项"。`}>{R`\begin{aligned}\alpha_2&=\frac12\Big(\frac{\mathrm{i}}{2\pi}\Big)^2\int_0^1l_t\Tr\Big[(\mathcal{A}_t+v)\mathcal{F}_t-\frac13(\mathcal{A}_t+v)^3\Big]\\&=\frac12\Big(\frac{\mathrm{i}}{2\pi}\Big)^2\int_0^1\delta t\,\Tr(-t\mathcal{A}^2-v\mathcal{A})\\&=-\frac12\Big(\frac{\mathrm{i}}{2\pi}\Big)^2\Tr(v\mathcal{A})\end{aligned}`}</Eq>
        <Tx>{R`这里注意到

$$\Tr\mathcal{A}^2=\dd x^\mu\wedge\dd x^\nu\Tr(\mathcal{A}_\mu\mathcal{A}_\nu)=-\dd x^\nu\wedge\dd x^\mu\Tr(\mathcal{A}_\nu\mathcal{A}_\mu)=0.$$

（第一行：$Q_3$ 改写为 $\mathcal{A}$、$\mathcal{F}$ 的多项式 $\frac12(\frac{\mathrm{i}}{2\pi})^2\Tr(\mathcal{A}\mathcal{F}-\frac13\mathcal{A}^3)$，因为 $\mathcal{A}\dd\mathcal{A}=\mathcal{A}\mathcal{F}-\mathcal{A}^3$。第二行：$l_t(\mathcal{A}_t+v)=0$，$l_t\mathcal{F}_t=\delta t\,\mathcal{A}$；由反 Leibniz 律 $l_t[(\mathcal{A}_t+v)\mathcal{F}_t]=-(\mathcal{A}_t+v)\,\delta t\,\mathcal{A}$，立方项被 $l_t$ 消去。）`}</Tx>
        <Stmt id="F:cs-gauge" toc={false} />

        <Box kind="example" n="11.10" title="三维 Maxwell–Chern–Simons 理论：拓扑质量">
          <Tx>{R`在三维时空中，规范理论可以有一个由陈–Simons 三形式给出的规范不变质量项（Jackiw–Templeton 1981，Deser 等 1982a、b）。由于陈–Simons 形式在规范变换下只改变一个局部恰当形式，作用量保持不变。为简单起见只考虑 U(1) 规范理论。考虑拉氏量（令 $\mathcal{A}=\mathrm{i}A$，$\mathcal{F}=\mathrm{i}F$）`}</Tx>
          <Eq n="11.122" keyEq title="Maxwell–Chern–Simons 拉氏量" say={R`三维 Maxwell 项加上 Chern–Simons 项 $\epsilon FA$：后者不需要度规，是"拓扑"的，系数 $m$ 将成为光子质量。`}>{R`\mathcal{L}=-\tfrac14F_{\mu\nu}F^{\mu\nu}+\tfrac14m\epsilon^{\lambda\mu\nu}F_{\lambda\mu}A_\nu`}</Eq>
          <Tx>{R`其中 $F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu$。注意第二项是 U(1) 丛的第二陈特征 $F^2$ 的陈–Simons 形式（差一个常数因子）：$\frac14\epsilon^{\lambda\mu\nu}F_{\lambda\mu}A_\nu=\frac12\epsilon^{\lambda\mu\nu}A_\nu\partial_\lambda A_\mu$ 正是 $A\,\dd A$ 的分量。场方程为`}</Tx>
          <Eq n="11.123" say={R`Maxwell 方程多了一项 $m\ast F^\nu$：CS 项像一个与场强对偶成正比的"流"。`}>{R`\partial_\mu F^{\mu\nu}+m\ast F^\nu=0`}</Eq>
          <Tx>{R`其中

$$\ast F^\mu=\tfrac12\epsilon^{\mu\kappa\lambda}F_{\kappa\lambda},\qquad F^{\mu\nu}=\epsilon^{\mu\nu\lambda}\ast F_\lambda.$$

（场方程的推导：$\delta(-\frac14F^2)=-F^{\mu\nu}\partial_\mu\delta A_\nu\simeq\partial_\mu F^{\mu\nu}\delta A_\nu$；$\delta(\frac12m\epsilon^{\lambda\mu\nu}A_\nu\partial_\lambda A_\mu)\simeq m\epsilon^{\lambda\mu\nu}\partial_\lambda A_\mu\delta A_\nu=m\ast F^\nu\delta A_\nu$，两项分部积分后相等。这里指标的升降按欧氏号差处理，与原书一致。）Bianchi 恒等式`}</Tx>
          <Eq n="11.124" say={R`对偶场强无散：它由 $F^{\mu\nu}$ 的反对称性从场方程得出（对 \eqref{11.123} 取 $\partial_\nu$）。`}>{R`\partial_\mu\ast F^\mu=0`}</Eq>
          <Tx>{R`作为 $F^{\mu\nu}$ 反对称性的推论由 \eqref{11.123} 得出（$\partial_\nu\partial_\mu F^{\mu\nu}=0$，故 $m\partial_\nu\ast F^\nu=0$；当然它也直接由 $F=\dd A$ 得出）。容易验证场方程在规范变换`}</Tx>
          <Eq n="11.125" say={R`U(1) 规范变换：势加上一个梯度。`}>{R`A_\mu\to A_\mu+\partial_\mu\theta`}</Eq>
          <Tx>{R`下不变（它只含 $F$），而拉氏量改变一个全导数：`}</Tx>
          <Eq n="11.126" say={R`拉氏量在规范变换下只多出一个全导数：Chern–Simons 项"几乎"规范不变。`}>{R`\mathcal{L}\to-\tfrac14F^{\mu\nu}F_{\mu\nu}+\tfrac14m\epsilon^{\lambda\mu\nu}F_{\lambda\mu}(A_\nu+\partial_\nu\theta)=\mathcal{L}+\tfrac12m\partial_\nu(\ast F^\nu\theta).`}</Eq>
          <Tx>{R`（$\frac14\epsilon^{\lambda\mu\nu}F_{\lambda\mu}\partial_\nu\theta=\frac12\ast F^\nu\partial_\nu\theta=\frac12\partial_\nu(\ast F^\nu\theta)$，用了 \eqref{11.124}。）由 \eqref{11.106b}，右边最后一项可以认同为

$$Q_3(A^\theta,F^\theta)-Q_3(A,F)\sim(A+\dd\theta)\dd A-A\,\dd A\sim\dd(\theta\,\dd A).$$

若假设 $F$ 在时空远处衰减，这一项对作用量没有贡献：`}</Tx>
          <Eq n="11.127" say={R`全导数积分为边界项，场在无穷远衰减时为零：作用量规范不变。`}>{R`\int\dd^3x\,\mathcal{L}\to\int\dd^3x\,\mathcal{L}+\frac m2\int\dd^3x\,\partial_\nu(\ast F^\nu\theta)=\int\dd^3x\,\mathcal{L}.`}</Eq>
          <Tx>{R`**质量。**我们来说明 \eqref{11.122} 描述一个*有质量*的场。先把 \eqref{11.123} 写成

$$\epsilon^{\mu\nu\alpha}\partial_\mu\ast F_\alpha=-m\ast F^\nu.$$

两边乘以 $\varepsilon_{\kappa\lambda\nu}$（用 $\varepsilon_{\kappa\lambda\nu}\epsilon^{\mu\nu\alpha}=-(\delta^\mu_\kappa\delta^\alpha_\lambda-\delta^\mu_\lambda\delta^\alpha_\kappa)$），得到

$$\partial_\lambda\ast F_\kappa-\partial_\kappa\ast F_\lambda=-mF_{\kappa\lambda}.$$

取 $\partial^\lambda$ 并用 \eqref{11.124}（$\partial^\lambda F_{\kappa\lambda}=m\ast F_\kappa$ 由 \eqref{11.123} 得出），得到`}</Tx>
          <Eq n="11.128" keyEq title="拓扑质量" say={R`对偶场强满足 Klein–Gordon 方程，质量为 $m$：Chern–Simons 项让三维光子获得质量，而不破坏规范不变性。`}>{R`(\partial^\lambda\partial_\lambda+m^2)\ast F_\kappa=0`}</Eq>
          <Tx>{R`这表明 $\ast F_\kappa$ 是质量为 $m$ 的矢量场。（对比：在三维用 Proca 项 $\frac12m^2A_\mu A^\mu$ 给光子质量会破坏规范不变性；CS 项给出的质量称为**拓扑质量**。）`}</Tx>
        </Box>
      </Sub>
    </Sec>);
}
