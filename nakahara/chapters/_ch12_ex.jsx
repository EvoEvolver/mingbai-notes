// 章末习题（Problem 12.1）
import { Sec, Tx, Exercise } from "@kit";

const R = String.raw;

export function Problems() {
  return (
    <Sec n="12.P" title="Problems" zh="章末习题">
      <Tx>{R`正文只处理紧流形。本题是指标定理向**非紧**流形推广（Callias–Bott–Seeley 指标定理）的最简单情形：直线上的一阶算子，指标由无穷远处的"渐近值"决定——一个"边界"效应，与 §12.8 的 APS 定理同源。`}</Tx>
      <Exercise n="P12.1" title="直线上的 Callias 型指标（Hirayama 1983）" level="★★★"
        hint={R`(a) 同 \eqref{12.105} 的论证。(b) 先证恒等式 $\frac{z}{L^\dagger L+z}-\frac{z}{LL^\dagger+z}=LC-CL$，$C\equiv L^\dagger(LL^\dagger+z)^{-1}$，所以 $J(z)$ 是一个对易子的迹——在紧流形上它为零，在 $\R$ 上它化成 $x=\pm\infty$ 处的"边界项"，而那里 $W$ 是常数，可以用 Fourier 变换算出。`}
        solution={R`**(a)** $L^\dagger L$ 与 $LL^\dagger$ 非负。若 $L^\dagger L\phi=\lambda\phi$，$\lambda\neq0$，则 $LL^\dagger(L\phi)=L(L^\dagger L\phi)=\lambda L\phi$，且 $\|L\phi\|^2=\lambda\|\phi\|^2\neq0$；反之 $L^\dagger$ 把 $LL^\dagger$ 的非零本征向量送到 $L^\dagger L$ 的同一本征值。两个映射在非零本征空间上互逆（差一个因子 $\lambda$），所以 $\mathrm{Spec}'L^\dagger L=\mathrm{Spec}'LL^\dagger$（含重数）。连续谱部分同理：由极分解，$L$ 给出 $(\ker L)^\perp$ 与 $(\ker L^\dagger)^\perp$ 之间的酉等价，二者的非零谱完全相同。但在非紧的 $\R$ 上，连续谱的态数是无穷的，两边态密度之**差**（谱移函数）可以有限而非零——这正是 (b) 中 $J(z)$ 依赖于 $z$、而紧流形上的 $I(s)$（习题 12.5）却与 $s$ 无关的原因。

**显式形式。**$L=-\mathrm{i}\partial-\mathrm{i}W$，$L^\dagger=-\mathrm{i}\partial+\mathrm{i}W$（$\partial=\dd/\dd x$），于是

$$L^\dagger L=-\partial^2+W^2-W',\qquad LL^\dagger=-\partial^2+W^2+W'$$

——这正是超对称量子力学中的一对伙伴 Hamilton 量（"超势" $W$）。

**(b) 化为对易子。**令 $C\equiv L^\dagger(LL^\dagger+z)^{-1}$。由 $L(L^\dagger L+z)=(LL^\dagger+z)L$ 得 $(LL^\dagger+z)^{-1}L=L(L^\dagger L+z)^{-1}$，于是

$$LC=LL^\dagger(LL^\dagger+z)^{-1}=1-\frac{z}{LL^\dagger+z},\qquad CL=L^\dagger L(L^\dagger L+z)^{-1}=1-\frac{z}{L^\dagger L+z}.$$

所以 $\frac{z}{L^\dagger L+z}-\frac{z}{LL^\dagger+z}=LC-CL=[L,C]$，$J(z)=\mathrm{tr}[L,C]$。

**迹 = 边界项。**$L=-\mathrm{i}\partial-\mathrm{i}W$ 中乘法算子 $W(x)$ 与 $C$ 的对易子的积分核在对角线上为 $W(x)C(x,x)-C(x,x)W(x)=0$。$[\partial,C]$ 的核为 $(\partial_x+\partial_y)C(x,y)$，在对角线上是 $\frac{\dd}{\dd x}C(x,x)$。所以

$$J(z)=-\mathrm{i}\int_{-\infty}^\infty\frac{\dd}{\dd x}C(x,x)\,\dd x=-\mathrm{i}\big[C(x,x)\big]_{x=-\infty}^{x=+\infty}.$$

**渐近区计算。**$|x|\to\infty$ 时 $W\to w$（$w=\mu$ 或 $\lambda$）为常数，$C(x,x)$ 由平面波算出：$-\mathrm{i}\partial\to k$，$L\to k-\mathrm{i}w$，$L^\dagger\to k+\mathrm{i}w$，$LL^\dagger\to k^2+w^2$，

$$C(x,x)\to\int_{-\infty}^\infty\frac{\dd k}{2\pi}\frac{k+\mathrm{i}w}{k^2+w^2+z}=\mathrm{i}w\int\frac{\dd k}{2\pi}\frac1{k^2+w^2+z}=\frac{\mathrm{i}w}{2\sqrt{w^2+z}}$$

（$k$ 的奇部分在对称截断下为零。）代入：

$$J(z)=-\mathrm{i}\Big[\frac{\mathrm{i}\mu}{2\sqrt{\mu^2+z}}-\frac{\mathrm{i}\lambda}{2\sqrt{\lambda^2+z}}\Big]=\frac12\Big(\frac{\mu}{(\mu^2+z)^{1/2}}-\frac{\lambda}{(\lambda^2+z)^{1/2}}\Big).$$

**(c)（本站补充：指标）**若 $\mu,\lambda\neq0$（谱有能隙），$z\to0$ 时 $\frac{z}{L^\dagger L+z}$ 趋于 $\ker L^\dagger L=\ker L$ 上的投影（与习题 12.5 相同），所以

$$\ind L=\lim_{z\to0}J(z)=\frac12\big(\mathrm{sgn}\,\mu-\mathrm{sgn}\,\lambda\big).$$

**直接验证。**$L\psi=0\iff\psi'=-W\psi\iff\psi=\exp(-\int^xW)$，可归一化当且仅当 $W(+\infty)=\mu>0$ 且 $W(-\infty)=\lambda<0$（"扭结"）；$L^\dagger\psi=0\iff\psi=\exp(+\int^xW)$，可归一化当且仅当 $\mu<0<\lambda$。所以：$\mu>0>\lambda$ 时 $\ind L=1-0=1$；$\mu<0<\lambda$ 时 $\ind L=0-1=-1$；$\mu$、$\lambda$ 同号时两个方程都无归一化解，$\ind L=0$。与公式完全一致。物理上这是 Jackiw–Rebbi 的孤子费米零模：费米子在扭结背景中恰有一个零能束缚态，数目由 $W$ 在两端的符号决定，与扭结的细节无关。`}>
        {R`正文只讨论了紧流形。AS 指标定理向非紧流形的推广是 Callias–Bott–Seeley 指标定理（Callias 1978，Bott–Seeley 1978）。这里考虑 Hirayama (1983) 研究过的最简单情形。考虑一对算子

$$L\equiv\frac1{\mathrm{i}}\frac{\dd}{\dd x}-\mathrm{i}W(x)\qquad L^\dagger\equiv\frac1{\mathrm{i}}\frac{\dd}{\dd x}+\mathrm{i}W(x)$$

其中 $W(+\infty)=\mu$，$W(-\infty)=\lambda$。

(a) 证明 $\mathrm{Spec}'L^\dagger L=\mathrm{Spec}'LL^\dagger$，撇号表示略去零本征值。

(b) 证明

$$J(z)\equiv\mathrm{tr}\Big(\frac{z}{L^\dagger L+z}-\frac{z}{LL^\dagger+z}\Big)=\frac12\Big(\frac{\mu}{(\mu^2+z)^{1/2}}-\frac{\lambda}{(\lambda^2+z)^{1/2}}\Big).$$`}
      </Exercise>
    </Sec>);
}
