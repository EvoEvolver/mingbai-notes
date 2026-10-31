// 章末习题（Problem 1.1：Derrick 定理）
import { Sec, Tx, Box, Exercise } from "@kit";

const R = String.raw;

export function Problems() {
  return (
    <Sec n="1.P" title="Problems" zh="章末习题">
      <Tx>{R`本章只有一道章末题，但它很深刻：一个简单的**标度论证**就能排除大量理论中的静态孤子。它解释了为什么 §1.9–1.10 的磁单极与瞬子都需要规范场——规范场的能量在标度变换下的行为不同。`}</Tx>
      <Exercise n="P1.1" title="Derrick 定理" level="★★"
        hint={R`(1) 在 $H_i[\phi_\lambda]$ 中换积分变量 $y=\lambda x$：$\dd^nx=\lambda^{-n}\dd^ny$，$\nabla_x=\lambda\nabla_y$。(2) 若 $\phi$ 是场方程的静态解，它是能量泛函 $H[\phi]$ 的稳定点，因而对标度族 $\phi_\lambda$ 也必须在 $\lambda=1$ 处稳定。(3) $H_1,H_2\ge0$，看 $(2-n)H_1=nH_2$ 的两边符号。`}
        solution={R`**(1)** 记 $\phi_\lambda(x)=\phi(\lambda x)$，换元 $y=\lambda x$：

$$H_1[\phi_\lambda]=\frac12\int\dd^nx\,|\nabla_x\phi(\lambda x)|^2=\frac12\int\lambda^{-n}\dd^ny\,\lambda^2|\nabla_y\phi(y)|^2=\lambda^{2-n}H_1[\phi],$$

$$H_2[\phi_\lambda]=\int\dd^nx\,V(\phi(\lambda x))=\lambda^{-n}\int\dd^ny\,V(\phi(y))=\lambda^{-n}H_2[\phi].$$

**(2)** 静态场方程 $-\nabla^2\phi+V'(\phi)=0$ 正是 $\delta H[\phi]/\delta\phi=0$（\eqref{1.12} 的场论版）。$\phi_\lambda$ 是过 $\phi$ 的一条单参数曲线，所以 $\dfrac{\dd}{\dd\lambda}H[\phi_\lambda]\Big|_{\lambda=1}=\int\dd^nx\,\dfrac{\delta H}{\delta\phi}\,\dfrac{\partial\phi_\lambda}{\partial\lambda}\Big|_{\lambda=1}=0$。由 (1)：

$$\frac{\dd}{\dd\lambda}\big[\lambda^{2-n}H_1+\lambda^{-n}H_2\big]_{\lambda=1}=(2-n)H_1[\phi]-nH_2[\phi]=0.$$

**(3)** 由于 $H_1\ge0$、$H_2\ge0$（$V\ge0$），

◆ $n\ge3$：$(2-n)H_1\le0\le nH_2$，等式迫使 $H_1=H_2=0$。$H_1=0$ 意味着 $\nabla\phi=0$，$\phi$ 为常数（处于 $V$ 的零点）——只有平凡的真空解。

◆ $n=2$：$H_2=0$，即 $\phi$ 处处取 $V$ 的零点；若真空是孤立点（离散），连续性迫使 $\phi$ 为常数，同样平凡。

◆ $n=1$：条件变成 $H_1=H_2$（"维里定理"：梯度能等于势能），可以有非平凡解。例如 $V=\tfrac{\lambda}4(\phi^2-v^2)^2$ 的扭结（kink）$\phi=v\tanh(\sqrt{\lambda/2}\,vx)$。

所以（在 $V$ 的零点孤立的情况下）非平凡的静态拓扑激发**当且仅当** $n=1$ 时存在，这就是 **Derrick 定理**。直观上：$n\ge2$ 时把孤子按 $\lambda>1$ 压缩，两种能量都不增加，孤子会塌缩（或按 $\lambda<1$ 弥散）。

**绕开限制的途径：**

(a) **规范场**：Yang–Mills 能量 $\int\dd^nx\,\Tr\mathcal{F}_{ij}^2$ 在标度下（规范势像导数一样按 $\lambda$ 标度）变为 $\lambda^{4-n}$，提供与梯度项符号相反的标度行为。三维的 't Hooft–Polyakov 磁单极（§1.9 的非 Abel 推广）与二维的 Nielsen–Olesen 涡旋都由此存在；四维纯 Yang–Mills 的 $\lambda^{4-n}=\lambda^0$ 恰好标度不变，于是瞬子（§1.10）有任意大小 $\lambda$。

(b) **高阶导数项**：Skyrme 模型加入四阶导数项，标度为 $\lambda^{4-n}$，在 $n=3$ 时与 $\lambda^{-1}$ 的梯度项平衡，得到 Skyrmion。

(c) **含时解**：定理只针对静态场；带守恒荷的周期解（Q-ball）可以稳定。

(d) **$V\equiv0$ 的非线性 $\sigma$ 模型**：$n=2$ 时 $H_1$ 标度不变，靶空间为 $S^2$ 的 $\sigma$ 模型有拓扑"lump"解（拓扑荷由 $\pi_2(S^2)=\mathbb{Z}$ 给出）。

(e) **无穷能量**：允许能量发散（如整体弦），或在有界区域上考虑。`}>
        <Tx>{R`考虑如下形式的 Hamilton 量`}</Tx>
        <Tx>{R`$$H=\int\dd^nx\left[\frac12\left(\frac{\partial\phi}{\partial t}\right)^2+\frac12(\nabla\phi)^2+V(\phi)\right]$$

其中 $V(\phi)$（$\ge0$）是势。若 $\phi$ 是不依赖时间的经典解，可以略去第一项，写成 $H[\phi]=H_1[\phi]+H_2[\phi]$，其中

$$H_1[\phi]\equiv\frac12\int\dd^nx\,(\nabla\phi)^2,\qquad H_2[\phi]\equiv\int\dd^nx\,V(\phi).$$

(1) 考虑标度变换 $\phi(x)\to\phi(\lambda x)$。证明 $H_i[\phi]$ 的变换为

$$H_1[\phi]\to H_1^\lambda[\phi]=\lambda^{2-n}H_1[\phi],\qquad H_2[\phi]\to H_2^\lambda[\phi]=\lambda^{-n}H_2[\phi].$$

(2) 设 $\phi$ 满足场方程。证明 $(2-n)H_1[\phi]-nH_2[\phi]=0$。［提示：对 $H_1^\lambda[\phi]+H_2^\lambda[\phi]$ 求 $\lambda$ 导数并令 $\lambda=1$。］

(3) 证明 $H[\phi]$ 的不依赖时间的拓扑激发当且仅当 $n=1$ 时存在（**Derrick 定理**）。考虑绕开这一限制的途径。`}</Tx>
        <Box kind="warning" title={R`勘误：第 (1) 问的标度指数`}>{R`原书第 (1) 问把 $H_1$ 的标度因子印作 $\lambda^{(n-2)}$。换元 $y=\lambda x$ 直接给出 $\lambda^{2-n}$（梯度贡献 $\lambda^2$，体积元贡献 $\lambda^{-n}$）；第 (2) 问的结论 $(2-n)H_1-nH_2=0$ 也只有在 $\lambda^{2-n}$ 时才成立。已改正。`}</Box>
      </Exercise>
    </Sec>);
}
