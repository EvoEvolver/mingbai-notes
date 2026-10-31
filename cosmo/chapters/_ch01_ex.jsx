// 习题 1.1–1.5 —— 式 (1.11)–(1.13)。解答：1.1、1.2、1.4 依据原书附录 A（式 A.1–A.9）；1.3、1.5 为编者给出（数值已用 node 核对）。
import { Sec, Tx, Eq, Exercise, Derivation, Box } from "@kit";
import { AgePlot } from "./_ch01_plots.jsx";

const R = String.raw;

export function Exercises() {
  return (
    <Sec n="1.E" title="Exercises" zh="习题">
      <Exercise n="1.1" title="宇宙学常数有多“不自然”" level="★" fromBook
        hint={R`所求比值等于 $(\rho_\Lambda/\rho_{\rm cr})(H_0/H)^2$。辐射主导时 $H/H_0\propto a^{-2}$，而 $T\propto a^{-1}$，所以 $H/H_0=(T/T_0)^2$。`}
        solution={R`所求比值可写成
$$\frac{\rho_\Lambda}{3H^2/(8\pi G)}=\frac{\rho_\Lambda}{\rho_{\rm cr}}\left(\frac{H_0}{H}\right)^2,$$
今天它等于 0.7。按假设，宇宙一直是辐射主导的（今天显然不成立，但对早期是很好的近似），于是取 $H/H_0=a^{-2}$；温度也按 $a^{-1}$ 标度，所以 $H/H_0=(T/T_0)^2$，其中 $T_0=2.7\,\mathrm K=2.3\times10^{-4}\,\mathrm{eV}$。因此
$$\frac{\rho_\Lambda}{3H^2/(8\pi G)}=0.7\left(\frac{T_0}{T}\right)^4.$$
在普朗克能标 $T_0/T=2.3\times10^{-4}/1.22\times10^{28}=1.9\times10^{-32}$，所以
$$\frac{\rho_\Lambda}{3H^2/(8\pi G)}=9\times10^{-128}.$$
这就是所谓**精细调节问题**：为了让宇宙学常数恰好在今天变得重要，它在早期必须被调到小得荒谬的值；若它大得多，我们的宇宙会面目全非——指数膨胀，到今天几乎空无一物。这是一个深刻的问题。

（注：若保留辐射项的系数 $\Omega_{\rm r}\approx9\times10^{-5}$，即 $H^2/H_0^2=\Omega_{\rm r}(T/T_0)^4$，结果再乘 $1/\Omega_{\rm r}$ 变为 $\sim10^{-123}$；计入早期更大的 $g_*$ 还会再小一两个数量级。结论不变：$10^{-120}$ 量级。）`}>
        {R`假设（不正确地）$H$ 一直按温度的平方标度，直到宇宙温度为 $10^{19}\,\mathrm{GeV}/k_{\rm B}$ 的时刻（即假设宇宙一直到**普朗克时间**都是辐射主导的）。再假设今天的暗能量是宇宙学常数 $\Lambda$ 的形式，使得今天 $\rho_\Lambda=0.7\rho_{\rm cr}$，且 $\rho_\Lambda$ 在宇宙整个历史中保持不变。那时 $\rho_\Lambda/(3H^2/8\pi G)$ 是多少？

这个估算的目的是说明 $\Lambda$ 的值有多么奇怪（或"不自然"）。出于多种原因（见 \exref{1.5}），人们会预期它的"自然"值所给出的能量密度应与普朗克时间的环境密度相当。`}
      </Exercise>

      <Exercise n="1.2" title="宇宙的年龄" level="★★" fromBook
        hint={R`(a) 被积函数化为 $a^{1/2}$。(b) 令 $\sym{ch01-xint}{x}=\ln(1/a^3)$，则 $da/a=-d\sym{ch01-xint}{x}/3$，$a^{-3}=e^{\sym{ch01-xint}{x}}$；把方括号写成 $\Omega_\Lambda(1+\alpha e^{\sym{ch01-xint}{x}})$，$\alpha=(1-\Omega_\Lambda)/\Omega_\Lambda$，再用 \eqref{1.12}，并注意 $\coth^{-1}(\infty)=0$。`}
        solution={<>
          <Tx>{R`需要计算积分
$$t_0=\frac{1}{H_0}\int_0^1\frac{da}{a}\left[\Omega_\Lambda+\frac{1-\Omega_\Lambda}{a^3}\right]^{-1/2}$$
在 $\Omega_\Lambda=0.7$ 与 $0$ 两种情形下的值。

**(a)** $\Omega_\Lambda=0$ 时可以直接积出：
$$\int_0^1\frac{da}{a}\,a^{3/2}=\frac23,$$
所以 $t_0=2/(3H_0)=0.67\times10^{10}\,h^{-1}\,\mathrm{yr}$。

**(b)** $\Omega_\Lambda\neq0$ 时，可以用习题提示的换元，或直接数值积分。换元：$\sym{ch01-xint}{x}=-3\ln a$，$a$ 从 0 到 1 对应 $\sym{ch01-xint}{x}$ 从 $\infty$ 到 0，
$$H_0t_0=\frac{1}{3\sqrt{\Omega_\Lambda}}\int_0^\infty\frac{d\sym{ch01-xint}{x}}{\sqrt{1+\alpha e^{\sym{ch01-xint}{x}}}}=\frac{2}{3\sqrt{\Omega_\Lambda}}\coth^{-1}\!\sqrt{1+\alpha}=\frac{2}{3\sqrt{\Omega_\Lambda}}\tanh^{-1}\!\sqrt{\Omega_\Lambda},$$
其中用了 $\sqrt{1+\alpha}=1/\sqrt{\Omega_\Lambda}$ 与 $\coth^{-1}y=\tanh^{-1}(1/y)$。$\Omega_\Lambda\to0$ 时 $\tanh^{-1}\sqrt{\Omega_\Lambda}/\sqrt{\Omega_\Lambda}\to1$，回到 (a) 的 $2/3$。代入 $\Omega_\Lambda=0.7$：
$$\int_0^1\frac{da}{a}\left[0.7+\frac{0.3}{a^3}\right]^{-1/2}\simeq0.96.$$

**(c)** 所以对固定的哈勃常数，含 $\Lambda$ 的宇宙比物质主导的宇宙老，倍数为 $0.96/0.67=1.43$（精确值 $0.964/0.667=1.45$）。原因是含 $\Lambda$ 的宇宙今天在加速，过去膨胀得比物质主导宇宙慢——要达到同样的今天膨胀率，需要更长的时间。取 $h=0.7$，宇宙学常数宇宙的年龄为 $0.964\times9.78/0.7\,\mathrm{Gyr}=13.5\,\mathrm{Gyr}$（见下方勘误），与恒星、球状星团等独立年龄指标相符。`}</Tx>
          <AgePlot />
          <Box kind="warning" title={R`勘误：附录 A 中的宇宙年龄 13.8 Gyr`}>{R`原书附录 A 印作"For $h=0.7$, a cosmological constant universe has an age of 13.8 billion years"。按 \eqref{1.11} 取 $\Omega_\Lambda=0.7$、$h=0.7$ 实际得到 $t_0=0.964\times H_0^{-1}=0.964\times9.778\,\mathrm{Gyr}/0.7=13.47\,\mathrm{Gyr}$（上面 (b) 的闭式解 $\frac{2}{3\sqrt{0.7}}\tanh^{-1}\sqrt{0.7}=0.964$，数值积分同），所以上文写作 13.5 Gyr。13.8 Gyr（精确为 13.78）是附录 B.3 基准宇宙学（$h=0.677$，$\Omega_\Lambda=0.689$，并计入辐射）的值——上图把 $h$ 调到 0.677、$\Omega_\Lambda$ 调到 0.69 即可复现。`}</Box>
        </>}>
        <Tx>{R`假设今天的宇宙是欧氏的，同时含有物质和宇宙学常数，后者的能量密度不随时间变化。积分 \eqref{1.2} 求宇宙今天的年龄（由于辐射只在宇宙年龄中很小的一部分时间里主导，只计入物质与宇宙学常数是很好的近似）。即假设 $\rho(t_0)=\rho_{\rm cr}$，用 \eqref{1.3} 写出`}</Tx>
        <Eq n="1.11" say={R`把 Friedmann 方程倒过来：每一小段标度因子的增长 $da/a$ 所花的时间，等于哈勃时间乘以当时膨胀率倒数的相对值；物质项 $\propto a^{-3}$，$\Lambda$ 项不变。`}>{R`dt = H_0^{-1}\frac{da}{a}\left[\Omega_\Lambda + \frac{1-\Omega_\Lambda}{a^3}\right]^{-1/2}`}</Eq>
        <Tx>{R`其中 $\Omega_\Lambda$ 是宇宙学常数的能量密度与临界密度之比（见 \eqref{2.71}）。从 $a=0$（$t=0$）积分到今天 $a=1$，得到宇宙今天的年龄。以下两种情形的积分都可以解析地完成。

(a) 先做 $\Omega_\Lambda=0$ 的情形。

(b) 再做 $\Omega_\Lambda>0$ 的情形。*提示*：定义新的积分变量 $\sym{ch01-xint}{x}\equiv\ln(1/a^3)$，然后利用`}</Tx>
        <Eq n="1.12" say={R`一个标准积分：$1/\sqrt{1+\alpha e^x}$ 的原函数是反双曲余切，用于把宇宙年龄积分化为闭合形式。`}>{R`\int \frac{d\sym{ch01-xint}{x}}{\sqrt{1+\alpha e^{\sym{ch01-xint}{x}}}} = -2\coth^{-1}\left(\sqrt{\alpha e^{\sym{ch01-xint}{x}}+1}\right).`}</Eq>
        <Tx>{R`(c) 对固定的 $H_0$，哪个宇宙更老？`}</Tx>
        <Derivation title={R`验证积分公式 \eqref{1.12}`} collapsed steps={[
          { tex: R`u\equiv\sqrt{1+\alpha e^{\sym{ch01-xint}{x}}}\ \Rightarrow\ du=\frac{\alpha e^{\sym{ch01-xint}{x}}}{2u}d\sym{ch01-xint}{x}=\frac{u^2-1}{2u}d\sym{ch01-xint}{x}`, why: R`换元。` },
          { tex: R`\int\frac{d\sym{ch01-xint}{x}}{u}=\int\frac{2\,du}{u^2-1}=\ln\frac{u-1}{u+1}`, why: R`部分分式，$u>1$。` },
          { tex: R`\ln\frac{u-1}{u+1}=-2\coth^{-1}u`, why: R`因为 $\coth^{-1}u=\frac12\ln\frac{u+1}{u-1}$（$u>1$）。公式正确。` },
        ]} />
      </Exercise>

      <Exercise n="1.3" title="氢与氘的 Lyman-α 线" level="★"
        hint={R`氢原子能级 $\propto$ 约化质量 $\mu=m_em_{\rm N}/(m_e+m_{\rm N})$，所以跃迁波长 $\lambda\propto1/\mu$。用 $m_{\rm p}/m_e=1836.15$、$m_{\rm D}c^2=1875.61\,\mathrm{MeV}$、$m_ec^2=0.511\,\mathrm{MeV}$。`}
        solution={R`能级 $E_n=-\mu c^2\alpha^2/2n^2$ 正比于约化质量，故
$$\frac{\lambda_{\rm D}}{\lambda_{\rm H}}=\frac{\mu_{\rm H}}{\mu_{\rm D}}=\frac{1+m_e/m_{\rm D}}{1+m_e/m_{\rm p}}=\frac{1+2.724\times10^{-4}}{1+5.446\times10^{-4}}=1-2.720\times10^{-4}.$$
所以氘的 Lyman-$\alpha$ 线位于
$$\lambda_{\rm D}=1216\,\text{Å}\times(1-2.72\times10^{-4})=1215.67\,\text{Å},\qquad \Delta\lambda=\lambda_{\rm H}-\lambda_{\rm D}=0.33\,\text{Å}.$$
近似地 $\Delta\lambda/\lambda\approx\frac{m_e}{m_{\rm p}}\left(1-\frac{m_{\rm p}}{m_{\rm D}}\right)\approx\frac{m_e}{2m_{\rm p}}$。用速度表示：
$$\frac{c\Delta\lambda}{\lambda}=2.998\times10^5\,\mathrm{km\,s^{-1}}\times2.72\times10^{-4}\approx82\,\mathrm{km\,s^{-1}}.$$
氘线出现在氢线的蓝端，相当于约 $82\,\mathrm{km\,s^{-1}}$ 的速度偏移。这正是在类星体吸收谱中测量原初氘的方法（§1.3）：在每条强氢吸收线蓝侧 $82\,\mathrm{km\,s^{-1}}$ 处寻找弱得多（$\mathrm{D/H}\sim2.5\times10^{-5}$）的伴线；吸收云的热运动与湍动展宽必须小于这个间隔，才能把两者分开。`}>
        {R`利用氢与氘的约化质量，以及氢的 Lyman-$\alpha$（$n=2\to n=1$）跃迁波长为 $1216\,\text{Å}$ 这一事实，求氘中相应跃迁发出的光子的波长。天文学家常用 $c\Delta\lambda/\lambda$ 刻画两条相近谱线的分裂。对 H–D 这一对，这个量是多少？`}
      </Exercise>

      <Exercise n="1.4" title="黑体谱的峰值" level="★★" fromBook
        hint={R`把 \eqref{1.9} 写成 $I_\nu=2(2\pi\hbar\nu)\nu^2/c^2\,/\,(e^{2\pi\hbar\nu/k_{\rm B}T}-1)$，看出它的单位就是"能量/(面积·时间·频率·立体角)"。$1\,\mathrm{Jy}=10^{-26}\,\mathrm{J\,s^{-1}\,m^{-2}\,Hz^{-1}}$。`}
        solution={R`把 \eqref{1.9} 改写为
$$I_\nu=\frac{2(2\pi\hbar\nu)\nu^2/c^2}{\exp[2\pi\hbar\nu/k_{\rm B}T]-1}.$$
图 1.7 纵轴的单位是每球面度百万央斯基（MJy/sr），其中 $1\,\mathrm{Jy}=10^{-26}\,\mathrm{J\,s^{-1}\,m^{-2}\,Hz^{-1}}$；所以单位是每单位时间、面积、频率和立体角的能量。另一方面，$I_\nu$ 的单位是能量（$2\pi\hbar\nu$）乘以面积的倒数（$\nu^2/c^2$ 的单位是 $\mathrm{m^{-2}}$）；由于 $\mathrm{Hz}=\mathrm{s^{-1}}$，两者的单位相同。于是
$$\text{强度}\ [\mathrm{MJy/sr}]=10^{20}\,I_\nu\ [\text{SI 单位}].$$
定义 $\sym{ch01-xbb}{x}=2\pi\hbar\nu/k_{\rm B}T$，令导数为零并数值求解，得 $I_\nu$ 在 $\sym{ch01-xbb}{x}\simeq2.82$ 处取极大（§1.4 的推导框）。对 $T=2.728\,\mathrm K$ 这给出 $\nu_{\max}=160\,\mathrm{GHz}$。由 $\nu=c/\lambda$，这也是逆波长上的极大位置：$(\lambda^{-1})_{\max}=5.35\,\mathrm{cm^{-1}}$。代入其余常数，峰值强度为
$$I_\nu(\nu_{\max})=385\,\mathrm{MJy\,sr^{-1}}.$$
这两个值都与图 1.7 相符（可在图 1.7 交互版中直接读出）。若取 $T=2.73\,\mathrm K$，峰值 $1/\lambda=5.35\,\mathrm{cm^{-1}}$ 几乎不变，$\simeq5\,\mathrm{cm^{-1}}$ 得证。`}>
        {R`把 \eqref{1.9} 中的比强度换成图 1.7 所画的量——单位面积、单位时间、单位频率、单位立体角的能量——的表达式。证明 2.73 K 黑体谱的峰值确实位于 $1/\lambda\simeq5\,\mathrm{cm^{-1}}$。它对应什么频率？`}
      </Exercise>

      <Exercise n="1.5" title="真空能灾难" level="★★"
        hint={R`角度积分给出 $4\pi$；自然单位下 $\rho_{\rm vacuum}=\frac{1}{4\pi^2}\int_0^{p_{\max}}p^2\sqrt{p^2+m^2}\,dp$。原函数：$\int p^2\sqrt{p^2+m^2}\,dp=\frac18\left[p(2p^2+m^2)\sqrt{p^2+m^2}-m^4\sinh^{-1}(p/m)\right]$。$p_{\max}\gg m$ 时结果 $\to p_{\max}^4/16\pi^2$。`}
        solution={R`取 $\hbar=c=1$，角度积分后
$$\rho_{\rm vacuum}=\frac{4\pi}{(2\pi)^3}\int_0^{p_{\max}}p^2\,\frac{\sqrt{p^2+m^2}}{2}\,dp=\frac{1}{4\pi^2}\cdot\frac18\left[p(2p^2+m^2)\sqrt{p^2+m^2}-m^4\sinh^{-1}\frac pm\right]_0^{p_{\max}}.$$

**(i) $E_{\max}=p_{\max}c=10m_ec^2$**：方括号为 $10\cdot201\cdot\sqrt{101}\,m_e^4-m_e^4\sinh^{-1}10=(20200.3-3.0)\,m_e^4$，所以
$$\rho_{\rm vacuum}=\frac{2524.7}{4\pi^2}m_e^4=64.0\,m_e^4=64.0\times(0.511\times10^6\,\mathrm{eV})^4=4.4\times10^{24}\,\mathrm{eV^4}/(\hbar c)^3.$$
与 $\rho_\Lambda\simeq3\times10^{-11}\,\mathrm{eV^4}/(\hbar c)^3$ 相比，大了 $1.5\times10^{35}$ 倍。

**(ii) $E_{\max}=m_{\rm Pl}c^2=1.2\times10^{19}\,\mathrm{GeV}$**：此时 $p_{\max}\gg m_e$，
$$\rho_{\rm vacuum}\simeq\frac{p_{\max}^4}{16\pi^2}=\frac{(1.2\times10^{28}\,\mathrm{eV})^4}{158}=1.3\times10^{110}\,\mathrm{eV^4}/(\hbar c)^3,$$
比 $\rho_\Lambda$ 大 $4\times10^{120}$ 倍——这就是著名的"相差 120 个数量级"。

即使取极其保守的截断，差距也有 35 个数量级。这就是正文所说的"真空能远大于解释观测所需的值"：要么存在某种我们不知道的机制几乎精确地抵消了真空能，要么这种估算方式本身有问题（Martin, 2012）——无论哪种，都是一个巨大的问题。`}>
        <Tx>{R`谐振子的基态能量为 $\hbar\omega/2$。这一基态能量延续到量子场论中：即使在真空里，场的涨落也会产生能量密度`}</Tx>
        <Eq n="1.13" say={R`量子场论中的真空能：把每个动量模式的零点能 $\hbar\omega/2$ 加起来；积分发散，必须在某个能标截断。`}>{R`\rho_{\rm vacuum} = \int\frac{d^3p}{(2\pi\hbar)^3}\,\frac{\hbar\omega}{2}`}</Eq>
        <Tx>{R`其中积分对应于对所有可能动量模式求和；对质量为 $m$ 的粒子，能量为 $\hbar\omega=\sqrt{m^2c^4+p^2c^2}$。这个积分发散，但这只是反映了在某个尺度 $E_{\max}=p_{\max}c$ 以上很可能存在改变基本自由度的新物理。对电子计算这个积分，取两个值：$E_{\max}=10m_ec^2$（这是极其保守的，因为我们肯定知道这个能标以上的物理）与 $E_{\max}=m_{\rm Pl}c^2=1.2\times10^{19}\,\mathrm{GeV}$（量子力学对引力的修正变大的能标）。把得到的值与今天的暗能量密度 $\rho_\Lambda\simeq3\times10^{-11}\,\mathrm{eV^4}/(\hbar c)^3$ 比较。

*注意*：关于这种处理发散的方式是否正确，文献中存在一些分歧（Martin, 2012）；然而所有人都同意：这里有一个大问题。`}</Tx>
      </Exercise>
    </Sec>);
}
