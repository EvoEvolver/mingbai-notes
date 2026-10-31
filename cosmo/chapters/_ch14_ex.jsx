// 习题 14.1–14.12 —— 式 (14.77)–(14.83)。解答：14.4、14.10 依据原书附录 A（式 A.173–A.181）；其余为编者给出。
// 14.9、14.11、14.12 的数值由 node 脚本计算（EH98 转移函数 + 增长因子，与第 8 章 _ch08_phys.jsx 相同的基准宇宙学；
// 1-loop 用标准 SPT 的 P22、P13 积分）。
import { Sec, Tx, Eq, Exercise, Table } from "@kit";

const R = String.raw;

export function Exercises() {
  return (
    <Sec n="14.E" title="Exercises" zh="习题">
      <Exercise n="14.1" title="先验的威力：咳嗽与肺癌" level="★"
        hint={R`Bayes 定理 \eqref{14.4}：$P(LC|C)=P(C|LC)P(LC)/P(C)$。`}
        solution={R`$$P(LC|C)=\frac{P(C|LC)\,P(LC)}{P(C)}=\frac{1\times(1/2000)}{1/5}=\frac{1}{400}=0.25\%.$$
尽管"肺癌患者几乎都会咳嗽"（似然为 1），但肺癌本身极其罕见（先验 $1/2000$），而咳嗽一周很常见（证据 $P(C)=1/5$）。所以 Alice 患肺癌的概率只有约 0.25%——比"我咳嗽，肺癌的主要症状是咳嗽，所以我很可能得了肺癌"的直觉小得多。把似然 $P(C|LC)$ 误当成后验 $P(LC|C)$，就是所谓"检察官谬误"。`}>
        <Tx>{R`Alice 咳嗽持续了一周。肺癌的主要症状之一是咳嗽；把它量化为 $P(C|LC)=1$。在美国，每年大约每 2000 人中有 1 人被诊断为肺癌。用 Bayes 定理估计 Alice 患上肺癌的概率 $P(LC|C)$。假设在给定的一年中，每 5 人中有 1 人会咳嗽持续一周。这是先验在日常生活中重要性的一个戏剧性例证。`}</Tx>
      </Exercise>

      <Exercise n="14.2" title="逆方差加权" level="★"
        hint={R`把 \eqref{14.2} 的指数改为 $-\sum_i(d_i-w)^2/2\sigma_{w,i}^2$，对 $w$ 求导。`}
        solution={R`似然 $\mathcal L\propto\exp\{-\sum_i(d_i-w)^2/2\sigma_{w,i}^2\}$（前因子与 $w$ 无关）。令 $\partial\ln\mathcal L/\partial w=\sum_i(d_i-w)/\sigma_{w,i}^2=0$：
$$\hat w=\frac{\sum_i d_i/\sigma_{w,i}^2}{\sum_i1/\sigma_{w,i}^2}.$$
这是以 $1/\sigma_{w,i}^2$ 为权重的加权平均——**逆方差加权**：噪声大的测量权重小。曲率 $-\partial^2\ln\mathcal L/\partial w^2=\sum_i\sigma_{w,i}^{-2}$，所以 $\mathrm{Var}[\hat w]=\big(\sum_i\sigma_{w,i}^{-2}\big)^{-1}$，即各测量的"信息" $1/\sigma^2$ 相加。所有 $\sigma_{w,i}$ 相等时回到 \eqref{14.8} 与 \eqref{14.13}。`}>
        <Tx>{R`把似然 \eqref{14.2} 推广到每次测量误差不同的情形，$\sigma_w\to\sigma_{w,i}$。推导使这个似然最大的 $w$，并证明它对应逆方差加权。`}</Tx>
      </Exercise>

      <Exercise n="14.3" title="地图的协方差" level="★★"
        hint={R`把 \eqref{14.24} 的矩阵形式 $d=Ps+\eta$ 代入 \eqref{14.30}，利用 $\langle\eta\eta^\top\rangle=N$。`}
        solution={R`代入 $d=Ps+\eta$：
$$\hat s=C_NP^\top N^{-1}(Ps+\eta)=C_N(P^\top N^{-1}P)s+C_NP^\top N^{-1}\eta=s+C_NP^\top N^{-1}\eta,$$
因为 $C_N=(P^\top N^{-1}P)^{-1}$。所以 $\hat s$ 无偏，$\hat s-s=C_NP^\top N^{-1}\eta$。于是
$$\left\langle(\hat s-s)(\hat s-s)^\top\right\rangle=C_NP^\top N^{-1}\langle\eta\eta^\top\rangle N^{-1}PC_N=C_N(P^\top N^{-1}P)C_N=C_N,$$
用到了 $N$、$C_N$ 对称。分量形式即 $\langle(\hat s_i-s_i)(\hat s_j-s_j)\rangle=(C_N)_{ij}$。由于 $\langle\hat s_i\rangle=s_i$，这也就是正文所说的 $\langle\hat s_i\hat s_j\rangle-\langle\hat s_i\rangle\langle\hat s_j\rangle$。`}>
        <Tx>{R`证明地图的协方差矩阵`}</Tx>
        <Eq n="14.77" say={R`地图估计误差的协方差：估计值偏离真信号的二阶矩。`}>{R`\left\langle(\hat s_i-s_i)(\hat s_j-s_j)\right\rangle,`}</Eq>
        <Tx>{R`（其中 $\hat s_i$ 由 \eqref{14.30} 的估计量给出）等于 \eqref{14.31} 给出的 $C_N$。`}</Tx>
      </Exercise>

      <Exercise n="14.4" title="一般波束与各向同性波束" level="★★" fromBook
        hint={R`把波束双重展开为 $B(\hat{\boldsymbol n},\hat{\boldsymbol n}')=\sum B_{lm,l'm'}Y_{lm}(\hat{\boldsymbol n})Y^*_{l'm'}(\hat{\boldsymbol n}')$；各向同性时用 Legendre 展开与加法定理 \eqref{C.12}。`}
        solution={R`**一般波束。**把波束对两个自变量做球谐展开（对 $l'm'$ 用复共轭是约定，便于后面计算）：
$$B(\hat{\boldsymbol n},\hat{\boldsymbol n}')=\sum_{lm,l'm'}B_{lm,l'm'}Y_{lm}(\hat{\boldsymbol n})Y^*_{l'm'}(\hat{\boldsymbol n}')\qquad\text{(A.173)}$$
连同 $\Theta(\hat{\boldsymbol n}')=\sum_{l''m''}a_{l''m''}Y_{l''m''}(\hat{\boldsymbol n}')$ 代入 \eqref{14.36}（去掉噪声）：
$$\Delta(\hat{\boldsymbol n})=\int d\Omega'\sum_{l''m''}Y_{l''m''}a_{l''m''}\sum_{lm,l'm'}B_{lm,l'm'}Y_{lm}(\hat{\boldsymbol n})Y^*_{l'm'}(\hat{\boldsymbol n}')=\sum_{lm}Y_{lm}(\hat{\boldsymbol n})\sum_{l'm'}B_{lm,l'm'}a_{l'm'},\qquad\text{(A.174)}$$
这里用了正交归一 $\int d\Omega'\,Y_{l''m''}Y^*_{l'm'}=\delta_{l''l'}\delta_{m''m'}$。读出 $Y_{lm}(\hat{\boldsymbol n})$ 的系数即 $a_{lm}^{\rm obs}$，就是 \eqref{14.78}；加上噪声即 \eqref{14.37}。

**各向同性波束。**若 $B(\hat{\boldsymbol n},\hat{\boldsymbol n}')=B(\hat{\boldsymbol n}\cdot\hat{\boldsymbol n}')$，即只依赖两方向夹角，可以做 Legendre 展开并用 \eqref{C.12}：
$$B(\hat{\boldsymbol n}\cdot\hat{\boldsymbol n}')=\sum_l(2l+1)\tilde B_l\mathcal P_l(\hat{\boldsymbol n}\cdot\hat{\boldsymbol n}')=4\pi\sum_{lm}\tilde B_lY_{lm}(\hat{\boldsymbol n})Y^*_{lm}(\hat{\boldsymbol n}'),\qquad\text{(A.175)}$$
所以 $B_{lm,l'm'}=B_l\,\delta_{ll'}\delta_{mm'}$（A.176），其中 $B_l\equiv4\pi\tilde B_l$。代入 \eqref{14.37} 立即得到 \eqref{14.38}。`}>
        <Tx>{R`推导一般的（随位置变化、各向异性的）波束对全天 $a_{lm}^{\rm obs}$ 的效应。从像 \eqref{14.36} 那样写出观测温度开始；忽略噪声，它与本计算无关。把所有量分解为多极矩，使 $B(\hat{\boldsymbol n},\hat{\boldsymbol n}')$ 换成 $B_{lm,l'm'}$。证明观测温度的多极矩（勘误：原书印作 "monopoles"，此处显然指多极矩 $a_{lm}^{\rm obs}$）为`}</Tx>
        <Eq n="14.78" say={R`一般波束把真实多极矩线性混合成观测多极矩。`}>{R`a_{lm}^{\rm obs}=\sum_{l'm'}B_{lm,l'm'}a_{l'm'}.`}</Eq>
        <Tx>{R`再专门考虑 \secref{14.4.1} 中处处相同且各向同性的波束 $B(\hat{\boldsymbol n},\hat{\boldsymbol n}')=B(\hat{\boldsymbol n}\cdot\hat{\boldsymbol n}')$，证明此时 \eqref{14.38} 成立。`}</Tx>
      </Exercise>

      <Exercise n="14.5" title={R`推导 \eqref{14.40} 与 \eqref{14.42}`} level="★★"
        hint={R`$a_{lm}^{\rm obs}-B_la_{lm}=\eta_{lm}$；两个高斯的乘积对 $a_{lm}$ 积分时配方。`}
        solution={R`**(14.40)**：固定 $a_{lm}$ 时，$a_{lm}^{\rm obs}-B_la_{lm}=\eta_{lm}$ 是零均值、方差 $N(l)$ 的高斯变量（\eqref{14.39}），所以 $P(a_{lm}^{\rm obs}|a_{lm})$ 就是 $\eta_{lm}$ 在 $a_{lm}^{\rm obs}-B_la_{lm}$ 处的高斯密度，即 \eqref{14.40}。（与原书一致，这里把每个 $a_{lm}$ 当作一个实高斯自由度。）

**(14.42)**：对单个 $m$，记 $x=a_{lm}^{\rm obs}$、$a=a_{lm}$、$C=C(l)$、$N=N(l)$、$B=B_l$：
$$\int da\,\frac{e^{-(x-Ba)^2/2N}}{\sqrt{2\pi N}}\frac{e^{-a^2/2C}}{\sqrt{2\pi C}}.$$
指数中 $a$ 的二次项系数为 $-\frac12\big(\frac{B^2}{N}+\frac1C\big)=-\frac{B^2C+N}{2NC}$，配方后
$$-\frac{x^2}{2N}+\frac{x^2B^2C}{2N(B^2C+N)}=-\frac{x^2}{2(B^2C+N)},$$
Gauss 积分给出 $\sqrt{2\pi NC/(B^2C+N)}$，与前因子合并为 $1/\sqrt{2\pi(B^2C+N)}$。所以每个 $m$ 贡献 $[2\pi(CB_l^2+N)]^{-1/2}\exp\{-|a_{lm}^{\rm obs}|^2/2(CB_l^2+N)\}$；$2l+1$ 个相乘即 \eqref{14.42}。物理上：信号与噪声独立，方差相加。`}>
        <Tx>{R`利用噪声 $\eta_{lm}$ 是零均值、协方差由 \eqref{14.39} 给出的高斯随机变量这一事实，推导 \eqref{14.40}。完成 \eqref{14.41} 中的积分，得到似然 \eqref{14.42}。`}</Tx>
      </Exercise>

      <Exercise n="14.6" title="白噪声功率谱与像素大小无关" level="★★"
        hint={R`$\eta_{lm}=\sum_p\Delta\Omega\,Y^*_{lm}(\hat{\boldsymbol n}_p)\eta_p$，$\langle\eta_p\eta_{p'}\rangle=\sigma_\eta^2\delta_{pp'}$。`}
        solution={R`把 \eqref{14.35} 离散化为对像素 $p$ 求和：$\eta_{lm}=\sum_p\Delta\Omega\,Y^*_{lm}(\hat{\boldsymbol n}_p)\eta_p$。均匀、不相关噪声：$\langle\eta_p\eta_{p'}\rangle=\sigma_\eta^2\delta_{pp'}$。于是
$$\left\langle\eta_{lm}\eta^*_{l'm'}\right\rangle=\sigma_\eta^2(\Delta\Omega)^2\sum_pY^*_{lm}(\hat{\boldsymbol n}_p)Y_{l'm'}(\hat{\boldsymbol n}_p)\simeq\sigma_\eta^2\Delta\Omega\int d\Omega\,Y^*_{lm}Y_{l'm'}=\sigma_\eta^2\Delta\Omega\,\delta_{ll'}\delta_{mm'}.$$
所以噪声协方差是对角的，$N(l)=\sigma_\eta^2\Delta\Omega$，与 $l$ 无关（白噪声）。像素面积减半 $\Delta\Omega\to\Delta\Omega/2$ 时，每个像素观测时间减半，$\sigma_\eta\to\sqrt2\sigma_\eta$，$\sigma_\eta^2\to2\sigma_\eta^2$；乘积 $\sigma_\eta^2\Delta\Omega$ 不变。物理上：噪声功率谱只取决于单位天区上积累的总观测时间，与怎样划分像素无关。（单位说明：通常把这个不变量写成 $N=(\Delta_T/T_0)^2$，其中"噪声水平" $\Delta_T$ 以 $\mu{\rm K}\cdot{\rm arcmin}$ 计，即像素噪声乘以像素边长；原书题面"$\mu{\rm K/arcmin^2}$、乘以像素面积"的说法有误，题中已按勘误改写。本页 \secref{14.4.1} 的交互图即按 $N=(\Delta_T\cdot1')^2$ 计算。）`}>
        <Tx>{R`考虑一个全天 CMB 实验，空间像素面积为 $\nosym{\Delta}\Omega$。设实验在每个像素中测量温度，高斯噪声为 $\sigma_\eta$。噪声幅度常以 $\mu{\rm K}\cdot{\rm arcmin}$ 为单位给出（噪声水平 $\Delta_T$），于是温度扰动 $\Theta$ 上的噪声 $\sigma_\eta$ 由这个数除以像素边长 $\sqrt{\nosym{\Delta}\Omega}$、再除以 $T_0=2.726\,$K 得到。（勘误：原书印作单位 $\mu{\rm K/arcmin^2}$、"乘以像素面积"。那样 $\sigma_\eta\propto\nosym{\Delta}\Omega$，与本题下文"像素面积减半、每个像素噪声升高 $\sqrt2$ 倍"即 $\sigma_\eta\propto\nosym{\Delta}\Omega^{-1/2}$ 相矛盾；正确的组合是 $\sigma_\eta^2\nosym{\Delta}\Omega=(\Delta_T/T_0)^2$ 与像素无关。）噪声因此被假设为均匀的（全天处处相同）且不相关的（像素之间）。求 $a_{lm}^{\rm obs}$ 的噪声协方差矩阵。若（同一实验）像素面积减半，每个像素得到的观测时间少一半，于是每个像素的噪声升高 $\sqrt2$ 倍。证明这两个变化（像素更小；每个像素噪声更大）使噪声协方差不变。`}</Tx>
      </Exercise>

      <Exercise n="14.7" title="弱透镜的形状噪声" level="★★"
        hint={R`由 \eqref{13.40}，$\epsilon_i=\epsilon_i^{\rm true}+2\gamma_i$，所以每个星系给出剪切估计 $\epsilon_i/2$，其噪声方差 $\sigma_\epsilon^2/4$。`}
        solution={R`由 \eqref{13.40}，单个星系的剪切估计 $\hat\gamma_i=\epsilon_i/2=\gamma_i+\epsilon_i^{\rm true}/2$，噪声方差 $\sigma_\epsilon^2/4$（每个分量）。一个面积为 $\nosym{\Delta}\Omega$ 的像素中有 $\bar n_{\rm g}\nosym{\Delta}\Omega$ 个星系，取平均后每个像素、每个分量的噪声方差为
$$\sigma_{\rm pix}^2=\frac{\sigma_\epsilon^2}{4\bar n_{\rm g}\nosym{\Delta}\Omega},$$
各像素、两个分量之间互不相关。这正是 \exref{14.6} 的均匀白噪声，所以噪声功率谱为 $\sigma_{\rm pix}^2\nosym{\Delta}\Omega$：
$$N_{EE}(l)=N_{BB}(l)=\frac{\sigma_\epsilon^2}{4\bar n_{\rm g}}.$$
（$\gamma_1,\gamma_2$ 的白噪声在 E/B 分解下等分为 E 与 B，各得同样的功率谱。）与像素大小无关，只依赖源星系的数密度与内禀椭率弥散。按 \secref{13.4}，每个分量 $\sigma_\epsilon\simeq0.3$，于是 $N\simeq0.0225/\bar n_{\rm g}$；例如 $\bar n_{\rm g}=30\,{\rm arcmin}^{-2}=3.5\times10^{8}\,{\rm sr}^{-1}$ 时 $N\approx6.3\times10^{-11}$。（文献中常把 $\sigma_\gamma\equiv\sigma_\epsilon/2$ 称为“每分量剪切弥散”，写作 $N=\sigma_\gamma^2/\bar n_{\rm g}$，二者相同。）`}>
        <Tx>{R`推导透镜角功率谱 $C_{EE}(l)$（\secref{13.5}）的噪声贡献。这与 \exref{14.6} 推导的 CMB 噪声类似，只是噪声来自星系的内禀椭率。从 \eqref{13.40} 出发，把 $\epsilon_i^{\rm true}$（$i=1,2$）当作高斯噪声，$\langle\epsilon_i^{\rm true}\rangle=0$，$\langle(\epsilon_i^{\rm true})^2\rangle=\sigma_\epsilon^2$。然后假设面积为 $\nosym{\Delta}\Omega$ 的像素中有 $\bar n_{\rm g}\nosym{\Delta}\Omega$ 个星系，$\bar n_{\rm g}$ 是源星系的角数密度（单位立体角的星系数）。`}</Tx>
      </Exercise>

      <Exercise n="14.8" title="Poisson 散粒噪声：$P_N=1/\bar n_{\rm g}$" level="★★"
        hint={R`Poisson 分布的均值与方差都等于 $\bar m_{\rm g}$；不同子体积独立。`}
        solution={R`**(a)** 对 Poisson 分布 \eqref{14.79}：$\langle m\rangle=\bar m_{\rm g}$，$\langle m^2\rangle=\bar m_{\rm g}+\bar m_{\rm g}^2$（方差 = 均值）。以数密度与子体积表示：$\bar m_{\rm g}=\bar n_{\rm g}v$，所以 $\langle m\rangle=\bar n_{\rm g}v$，$\langle m^2\rangle=\bar n_{\rm g}v+(\bar n_{\rm g}v)^2$。

**(b)** 无内禀成团时不同子体积独立：$\alpha\neq\beta$ 时 $\langle m_\alpha m_\beta\rangle=\langle m\rangle^2$；$\alpha=\beta$ 时 $=\langle m\rangle^2+\langle m\rangle$。所以
$$\frac{\langle m(\boldsymbol x_\alpha)m(\boldsymbol x_\beta)\rangle}{\langle m\rangle^2}=1+\frac{\delta_{\alpha\beta}}{\bar n_{\rm g}v}.$$
相关函数是**超出 1 的部分**：$\xi_{\rm g}=\delta_{\alpha\beta}/(\bar n_{\rm g}v)$。（勘误：原书 \eqref{14.80} 印作 $\xi_{\rm g}=\langle mm\rangle/\langle m\rangle^2$，漏了 $-1$；按 $1+\xi_{\rm g}=\langle n n\rangle/\bar n_{\rm g}^2$ 的定义，无关联时 $\xi_{\rm g}$ 应为 0 而不是 1。题中已改。）连续极限下 $\delta_{\alpha\beta}/v\to\delta_{\rm D}^{(3)}(\boldsymbol x_\alpha-\boldsymbol x_\beta)$，即 $\xi_{\rm g}(r)=\delta_{\rm D}^{(3)}(\boldsymbol r)/\bar n_{\rm g}$。

**(c)** Fourier 变换：$P_N=\int d^3r\,\xi_{\rm g}(r)e^{-i\boldsymbol k\cdot\boldsymbol r}=1/\bar n_{\rm g}$，与 $k$ 无关（白噪声）。直接计算：令 $\delta_\alpha=(n_\alpha-\bar n_{\rm g})/\bar n_{\rm g}$，$n_\alpha=m_\alpha/v$，则 $\langle\delta_\alpha\delta_\beta\rangle=\delta_{\alpha\beta}/(\bar n_{\rm g}v)$。用 \eqref{14.81} 的归一化 $\Delta(\boldsymbol k_i)=\frac{v}{L^{3/2}}\sum_\alpha e^{i\boldsymbol k_i\cdot\boldsymbol x_\alpha}\delta_\alpha$：
$$\left\langle\Delta(\boldsymbol k_i)\Delta(\boldsymbol k_j)\right\rangle=\frac{v^2}{L^3}\sum_\alpha e^{i(\boldsymbol k_i+\boldsymbol k_j)\cdot\boldsymbol x_\alpha}\frac{1}{\bar n_{\rm g}v}=\frac{v}{L^3}\cdot\frac{L^3}{v}\delta_{\boldsymbol k_i,-\boldsymbol k_j}\cdot\frac{1}{\bar n_{\rm g}}=\frac{\delta_{\boldsymbol k_i,-\boldsymbol k_j}}{\bar n_{\rm g}},$$
（$\sum_\alpha e^{i\boldsymbol q\cdot\boldsymbol x_\alpha}=(L^3/v)\delta_{\boldsymbol q,0}$）。这正是 \eqref{14.57} 中的噪声项，$P_N=1/\bar n_{\rm g}$，且对角。（勘误：原书 \eqref{14.81} 印作前因子 $L^{3/2}$，那样结果会多出 $(L^3/v)^2$，与 \eqref{14.57} 不符；题中已改为 $v/L^{3/2}$，见 \secref{14.4.2} 的勘误。）`}>
        <Tx>{R`在 \secref{14.4.2} 中我们假设星系协方差中的噪声贡献是对角的、幅度为 $P_N$。假设星系计数中的噪声是 Poisson 过程，证明确实如此，并求 $P_N$ 的值：

(a) 把巡天区域分成小的子体积。假设给定子体积中的星系数服从均值为 $\bar m_{\rm g}$ 的 Poisson 分布（简单起见设所有子体积的 $\bar m_{\rm g}$ 相同），`}</Tx>
        <Eq n="14.79" say={R`子体积中星系数的 Poisson 分布：均值与方差都等于 $\bar m_{\rm g}$。`}>{R`P(\sym{ch14-mcount}{m})=\frac{(\bar m_{\rm g})^{m}e^{-\bar m_{\rm g}}}{\sym{ch14-mcount}{m}!}.`}</Eq>
        <Tx>{R`用平均密度 $\bar n_{\rm g}$ 与子体积的体积 $v$ 表示这个分布的期望值 $\langle m\rangle$ 与 $\langle m^2\rangle$。

(b) 在 Poisson 模型 \eqref{14.79} 下计算星系的相关函数，即`}</Tx>
        <Eq n="14.80" say={R`子体积星系数的两点乘积按平均数平方归一后减去 1：相关函数是超出无关联期望的那部分。`}>{R`\xi_{\rm g}(|\boldsymbol x_\alpha-\boldsymbol x_\beta|)=\frac{\left\langle \sym{ch14-mcount}{m}(\boldsymbol x_\alpha)\sym{ch14-mcount}{m}(\boldsymbol x_\beta)\right\rangle}{\langle \sym{ch14-mcount}{m}\rangle^2}-1,`}</Eq>
        <Tx>{R`其中 $\boldsymbol x_\alpha$ 表示子体积 $\alpha$ 的位置。假设没有内禀成团，所以每个子体积中的 $\langle m\rangle$ 相同。

(c) 计算星系功率谱。可以对上一步的结果做 Fourier 变换，也可以按下面的方法直接计算。把 \eqref{14.49} 改写为`}</Tx>
        <Eq n="14.81" say={R`以子体积为单元写出的离散 Fourier 变换：前因子为子体积 $v$ 除以 $L^{3/2}$（按勘误后的 \eqref{14.49}）。`}>{R`\Delta(\boldsymbol k_i)=\frac{v}{L^{3/2}}\sum_\alpha e^{i\boldsymbol k_i\cdot\boldsymbol x_\alpha}\left[\frac{n(\boldsymbol x_\alpha)-\bar n_{\rm g}}{\bar n_{\rm g}}\right]`}</Eq>
        <Tx>{R`其中求和遍历大小为 $v$ 的子体积。利用 (a) 的结果，并再次假设没有内禀成团，求 $\langle\Delta(\boldsymbol k_i)\Delta(\boldsymbol k_j)\rangle$。无论用哪种方法，证明你得到 \eqref{14.57} 中的噪声贡献，且 $P_N=1/\bar n_{\rm g}$。`}</Tx>
      </Exercise>

      <Exercise n="14.9" title="BICEP2/Keck Array 对张标比的预期上限" level="★★★"
        hint={R`$f_{\rm sky}=400/41253$；$N=\sigma^2\nosym{\Delta}\Omega$；$r=0$ 时 $F_{rr}=\sum_l\frac{(2l+1)f_{\rm sky}}{2}\frac{(\partial C^{BB}_l/\partial r)^2}{(C^{BB,\rm lens}_l+N_lB_l^{-2})^2}$。张量 B 模的形状可从 \figref{10.11} 读出：$r=0.05$ 时在 $l\approx80$ 处 $l(l+1)C_l/2\pi\approx3\times10^{-3}\,\mu{\rm K}^2$。`}
        solution={R`**噪声与天区。**$f_{\rm sky}=400/41253=9.7\times10^{-3}$。$1\,{\rm arcmin}^2=8.46\times10^{-8}\,$sr，所以 $N=(3\,\mu{\rm K})^2\times8.46\times10^{-8}=7.6\times10^{-7}\,\mu{\rm K}^2\,$sr（以 $\Theta$ 计再除以 $T_0^2$：$1.0\times10^{-19}$）。由 \eqref{14.47}，$r=0$ 且忽略透镜 B 模时 $\sqrt{\mathrm{Var}[\hat C^{BB}(l)]}=\sqrt{2/[(2l+1)f_{\rm sky}]}\,N B_l^{-2}$；例如 $l=80$ 时约 $1.6\times10^{-1}N\approx1.2\times10^{-7}\,\mu{\rm K}^2$。

**Fisher 预测。**张量 B 模 $C_l^{BB}=r\,\hat C_l^{BB}$，模板由 \figref{10.11} 近似：$r=1$ 时 $l(l+1)C_l/2\pi$ 在 $l\approx85$ 处峰值约 $0.06\,\mu{\rm K}^2$（$l=80$ 处 $C_l\approx5.8\times10^{-5}\,\mu{\rm K}^2$，信噪比每模式 $\approx76r$）。取 $l=30$–$300$、半高全宽 $30'$ 的高斯波束，在 $r=0$ 处
$$F_{rr}=\sum_l\frac{(2l+1)f_{\rm sky}}{2}\frac{(\hat C_l^{BB})^2}{(N_lB_l^{-2})^2}\ \Rightarrow\ \sigma(r)=F_{rr}^{-1/2}\approx1.3\times10^{-3},$$
95% 上限 $r<2.6\times10^{-3}$（"理想情况"：只有仪器噪声）。若把引力透镜产生的 B 模（$C_l^{BB,\rm lens}\approx2\times10^{-6}\,\mu{\rm K}^2$，相当于 $5\,\mu{\rm K}\cdot{\rm arcmin}$ 白噪声）当作额外的"噪声"，$\sigma(r)\approx4.8\times10^{-3}$，95% 上限 $\approx0.01$。实际的 BK15 结果是 $\sigma(r)\approx0.02$、$r<0.06$（95%），差距来自银河尘埃与同步辐射前景的边缘化、滤波造成的模式损失以及有限的 $l$ 覆盖。这些数值依赖于所取模板，只应看作量级估计。`}>
        <Tx>{R`估计 BICEP2/Keck Array 实验（Ade et al., 2018）的 B 模偏振功率谱 $\mathrm{Var}[\hat C_{BB}(l)]$ 的预期误差。观测覆盖天空上 400 平方度；假设每个 1 平方角分像素中的噪声为 $3\,\mu$K。用 Fisher 矩阵计算该实验（在理想情况下）在真实 $r=0$ 的假设下预期能达到的张标比 $r$ 上限。`}</Tx>
      </Exercise>

      <Exercise n="14.10" title="Fisher 参数偏差：系统误差把参数推到哪里" level="★★★" fromBook
        hint={R`把极大似然条件 $d\ln\mathcal L/d\lambda=0$ 在 $\bar\lambda$ 处展开到一阶。`}
        solution={R`**(a)** 把极大似然条件在 $\bar\lambda$（没有系统误差时的峰值）处展开：
$$\frac{d\ln\mathcal L}{d\lambda}=\frac{d\ln\mathcal L}{d\bar\lambda}+\frac{d^2\ln\mathcal L}{d\bar\lambda^2}(\lambda-\bar\lambda)=0\ \Rightarrow\ \lambda=\bar\lambda+\mathcal F^{-1}\frac{d\ln\mathcal L}{d\bar\lambda},\qquad\text{(A.177)}$$
因为 $d^2\ln\mathcal L/d\bar\lambda^2=-\mathcal F$。并且
$$\frac{d\ln\mathcal L}{d\bar\lambda}=\sum_l\frac{\partial C^{\rm theory}(l,\bar\lambda)}{\partial\bar\lambda}\,\frac{\hat C(l)-C^{\rm theory}(l,\bar\lambda)}{\mathrm{Var}[\hat C(l)]}.\qquad\text{(A.178)}$$

**(b)** 取期望：$\mathcal F$ 变为 $F$，按假设 $\langle\hat C(l)-C^{\rm theory}(l,\bar\lambda)\rangle=C^{\rm sys}(l)$——对许多噪声实现平均后，观测 $\hat C(l)$ 与真实宇宙的理论值之间的失配非零，等于 $C^{\rm sys}(l)$。得到
$$\lambda_{\rm sys}=\bar\lambda+F^{-1}\sum_l\frac{\partial C^{\rm theory}(l,\bar\lambda)}{\partial\bar\lambda}\frac{C^{\rm sys}(l)}{\mathrm{Var}[\hat C(l)]}.\qquad\text{(A.179)}$$
求和可以理解为 $\partial C^{\rm theory}/\partial\bar\lambda$ 与 $C^{\rm sys}(l)$ 之间以逆方差加权的**内积**。若系统误差与模型对 $\bar\lambda$ 的依赖几乎"正交"（例如一个在 $l$ 上近似常数的系统误差，与一个使 $C^{\rm theory}$ 振荡变化的参数如 $\Omega_{\rm b}h^2$），参数偏移就可以忽略。

**(c)** 多参数时 (A.177) 变成矢量关系。定义
$$B_\alpha=\sum_l\frac{\partial C^{\rm theory}(l,\{\bar\lambda_\gamma\})}{\partial\bar\lambda_\alpha}\frac{C^{\rm sys}(l)}{\mathrm{Var}[\hat C(l)]},\qquad\text{(A.180)}$$
则
$$\lambda_\alpha=\bar\lambda_\alpha+\sum_\beta(F^{-1})_{\alpha\beta}B_\beta.\qquad\text{(A.181)}$$
诠释与单参数相同，但现在即使 $B_\alpha$ 很小，$\lambda_\alpha$ 也可能偏移：只要 $B_\beta$ 对与 $\lambda_\alpha$ 部分简并的另一个参数 $\lambda_\beta$ 显著，使 $(F^{-1})_{\alpha\beta}\neq0$。Fisher 矩阵编码的参数简并在这里同样非常重要。`}>
        <Tx>{R`在推导 Fisher 矩阵时，我们假设对许多噪声实现平均后，测得的 $\hat C(l)$ 等于真参数值 $\bar\lambda$ 处的理论预言 $C^{\rm theory}(l,\bar\lambda)$。Fisher 形式还能让我们推断理论与数据失配——无论来自数据中的系统误差，还是理论预言不完善——造成的参数 $\lambda$ 的偏差。

(a) 假设似然在下式处取极大：`}</Tx>
        <Eq n="14.82" say={R`数据 = 真值处的理论 + 系统误差项（统计误差不变）。`}>{R`\hat C(l)=C^{\rm theory}(l,\bar\lambda)+C^{\rm sys}(l),`}</Eq>
        <Tx>{R`其中 $C^{\rm sys}(l)$ 是观测系统误差或理论误差，而统计误差 $\mathrm{Var}[\hat C(l)]$ 不变。简单起见假设只有一个参数 $\lambda$，在 $C^{\rm sys}(l)$ 的线性阶（忽略含 $C^{\rm sys}(l)$ 两次幂的项）推导似然峰值所在的 $\lambda_{\rm sys}$。提示：把似然在 $\bar\lambda$ 附近 Taylor 展开。

(b) 对该表达式中的所有量取期望，回忆 $\langle\hat C(l)\rangle=C^{\rm theory}(l,\bar\lambda)+C^{\rm sys}(l)$，并使用 Fisher 矩阵。

(c) 把结果推广到多参数。`}</Tx>
      </Exercise>

      <Exercise n="14.11" title="Euclid 对增长率 f 的预期约束" level="★★★"
        hint={R`$P_{\rm g}(k,\mu)=(b_1+f\mu^2)^2P_{\rm L}(k,z)+P_N$（\eqref{11.23}）。对每个 $(k,\mu)$ 单元，用 \eqref{14.60} 的方差构造 $F_{ab}=\sum\frac{\partial P_{\rm g}}{\partial\lambda_a}\frac{\partial P_{\rm g}}{\partial\lambda_b}\big/\mathrm{Var}[\hat P_{\rm g}]$，参数 $(b_1,f)$，再取 $\sqrt{(F^{-1})_{ff}}$。`}
        solution={R`**Fisher 矩阵。**把 \eqref{14.68} 的 $l$ 求和换成对 $k$ 区间与 $\mu$ 区间的求和，$\mathrm{Var}[\hat C(l)]$ 换成 \eqref{14.60} 的方差。对模式计数取连续极限（按改正后的 \eqref{14.53}，即标准的 FKP 计数，见 \secref{14.4.2} 的勘误），
$$F_{ab}=\frac{V}{8\pi^2}\int_{k_F}^{k_{\rm max}}k^2dk\int_{-1}^{1}d\mu\,\frac{\partial_aP_{\rm g}\,\partial_bP_{\rm g}}{\left[P_{\rm g}(k,\mu)+1/\bar n_{\rm g}\right]^2},\qquad\partial_{b_1}P_{\rm g}=2(b_1+f\mu^2)P_{\rm L},\ \ \partial_fP_{\rm g}=2\mu^2(b_1+f\mu^2)P_{\rm L}.$$
（若照搬原书印刷的 \eqref{14.53}（带 $\frac12$）+\eqref{14.59}，前因子变为 $V/16\pi^2$，下表误差都乘 $\sqrt2$。）

**数值。**基准 ΛCDM（$\Omega_{\rm m}=0.31$，$h=0.677$，$\sigma_8=0.83$）在 $z=1.4$：$D_+(z)/D_+(0)=0.516$，$f=0.919$，$P_{\rm L}(0.1\,h\,{\rm Mpc^{-1}})=1570\,h^{-3}{\rm Mpc}^3$，$\bar n_{\rm g}P_{\rm g}(0.1)\approx1.8$（散粒噪声不可忽略但不主导）。$V=63\times10^9\,h^{-3}{\rm Mpc}^3$，$k_F=1.6\times10^{-3}\,h\,{\rm Mpc}^{-1}$。线性振幅 $\sigma_8$ 视为已知，对 $b_1$ 边缘化：`}>
        <Tx>{R`推导星系功率谱的 Fisher 矩阵。用它连同 \eqref{14.60} 与 \eqref{11.23}，估计 Euclid 巡天由星系功率谱测量增长率 $f$ 的预期误差，采用以下非常粗略的规格：`}</Tx>
        <Eq n="14.83" say={R`Euclid 的近似规格：巨大的体积、$z\approx1.4$、中等数密度与偏袒。`}>{R`V=63h^{-3}\,{\rm Gpc}^3;\quad z=1.4;\quad\bar n_{\rm g}=5.2\times10^{-4}h^3\,{\rm Mpc}^{-3};\quad b_1=1.5.`}</Eq>
        <Tx>{R`可以假设立方体积，且 $\bar n_{\rm g}$ 是固定参数，但应对 $b_1$ 边缘化。利用 \secref{12.2} 的结果，提出一个合理的 $k_{\rm max}$，在此以下你会相信这个基于线性理论的预测（见下一题）。`}</Tx>
      </Exercise>
      <Table head={["$k_{\\rm max}\\ [h\\,{\\rm Mpc}^{-1}]$", "$\\sigma(f)$（边缘化 $b_1$）", "$\\sigma(f)/f$", "$1/\\sqrt{F_{ff}}$（$b_1$ 已知）"]}
        rows={[["0.10", "0.0055", "0.60%", "0.0039"], ["0.15", "0.0034", "0.37%", "0.0023"], ["0.20", "0.0025", "0.27%", "0.0017"], ["0.30", "0.0018", "0.20%", "0.0012"]]}
        caption={R`\exref{14.11} 的数值结果（编者用 Eisenstein–Hu 转移函数计算）。**$k_{\rm max}$ 的选择**：\secref{12.2} 的一圈修正在 $z=1.4$、$k=0.1\,h\,{\rm Mpc^{-1}}$ 处约为 $P_{\rm L}$ 的 0.5%，$k=0.2$ 处约 5%，所以线性理论大致可信到 $k_{\rm max}\approx0.1$–$0.15\,h\,{\rm Mpc}^{-1}$。注意这里假定 $\sigma_8$ 已知；实际上 RSD 测的是 $f\sigma_8$，若同时放开振幅，误差会显著增大。下一题表明 $k_{\rm max}=0.15$ 已经偏乐观。`} />

      <Exercise n="14.12" title="忽略一圈修正造成的 f 偏差" level="★★★"
        hint={R`把 \exref{14.10} 的 $C^{\rm sys}(l)$ 换成 $P^{\rm sys}(k,\mu)=(b_1+f\mu^2)^2P_{\rm 1\text{-}loop}(k)$，$P_{\rm 1\text{-}loop}=P_{22}+P_{13}$（\eqref{12.48}）；$\delta\lambda_a=(F^{-1})_{ab}B_b$，$B_b=\sum\partial_bP_{\rm g}\,P^{\rm sys}/\mathrm{Var}$。`}
        solution={R`**形式。**与 \exref{14.10}(c) 完全相同，只是对 $l$ 的求和换成对 $(k,\mu)$ 单元的求和：
$$\delta\lambda_a=\sum_b(F^{-1})_{ab}B_b,\qquad B_b=\frac{V}{8\pi^2}\int k^2dk\int d\mu\,\frac{\partial_bP_{\rm g}\,P^{\rm sys}(k,\mu)}{[P_{\rm g}+1/\bar n_{\rm g}]^2},$$
参数 $(b_1,f)$，$F$ 同 \exref{14.11}。若理论只用线性谱而真实谱含一圈修正，$P^{\rm sys}=(b_1+f\mu^2)^2[P_{22}+P_{13}]$（简化模型：把一圈修正乘以 Kaiser 因子）。

**数值（编者计算，标准 SPT 积分，$z=1.4$）。**$P_{\rm 1\text{-}loop}/P_{\rm L}=0.55\%$、$2.3\%$、$4.7\%$、$11.5\%$（$k=0.1$、$0.15$、$0.2$、$0.3\,h\,{\rm Mpc}^{-1}$）。


$k_{\rm max}=0.10$：$\delta f=-0.001$，$\sigma(f)=0.0055$，$|\delta f|/\sigma\approx0.2$；

$k_{\rm max}=0.125$：$\delta f=+0.002$，$\sigma(f)=0.0042$，比值 0.5；

$k_{\rm max}=0.15$：$\delta f=+0.004$，$\sigma(f)=0.0034$，比值 1.3；

$k_{\rm max}=0.20$：$\delta f=+0.014$，$\sigma(f)=0.0025$，比值 5.7。

所以系统偏移在 $k_{\rm max}\approx0.14\,h\,{\rm Mpc}^{-1}$ 处等于 $1\sigma$ 统计误差（若按原书带 $\frac12$ 的模式计数，方差大 2 倍，交点略移到 $\approx0.15$）。偏移中相当一部分被 $b_1$ 吸收（$\delta b_1$ 与 $\delta f$ 同量级），这正是 \exref{14.10}(c) 所说的"通过简并参数传递的偏差"。结论：对 Euclid 这样的巡天，统计误差小到线性理论在 $k\gtrsim0.1\,h\,{\rm Mpc}^{-1}$ 就不够用了，必须使用包含非线性与偏袒展开的理论模型（第 12 章）。`}>
        <Tx>{R`把 \exref{14.10} 推导的 Fisher 参数偏差形式从 $C(l)$ 的情形改写到三维星系功率谱的情形。用它估计：若忽略物质功率谱的一圈修正（\eqref{12.48}），增长率 $f$ 会产生多大的偏差，作为 $k_{\rm max}$ 的函数。在什么 $k_{\rm max}$ 处系统偏移等于 $f$ 的 $1\sigma$ 统计误差？`}</Tx>
      </Exercise>
    </Sec>);
}
