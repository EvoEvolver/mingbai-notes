// 补充材料 K_III：不稳定态与寿命（式 KIII-1 … KIII-12）
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { DecayPlot } from "./_ch03d_plots.jsx";

const R = String.raw;
const PP = R`\mathcal P`;
const NT = R`\sym{Nt}{N}`;           // 尚未衰变的系统数 N(t)
const NTOT = R`\mathcal N`;

export function SecK() {
  return (
    <Sec n="KIII" title="Unstable states. Lifetime" zh="不稳定态与寿命"
      gist={R`激发态原子其实会自发辐射而衰变：留在原态的概率按 $\mathrm e^{-t/\tau}$ 减小，单位时间的衰变概率 $1/\tau$ 与"年龄"无关，$\tau$ 是平均寿命，能量相应有自然宽度 $\Delta E\simeq\hbar/\tau$。唯象做法：给能量加上虚部 $E_n'=E_n-i\hbar\gamma_n/2$，$\gamma_n=1/\tau_n$。`}
      why={R`正文的定态在孤立系统里永远不变，可现实中的激发态都会衰变。这里用最省事的办法把"不稳定"装进量子力学的描述，同时让能量–时间不确定关系有一个具体的落脚点。`}
      gives={["KIII-3", "KIII-5", "KIII-7", "KIII-10", "KIII-11", "KIII-12"]}>
      <p className="muted">本节概念：<C id="lifetime" /> · <C id="natural_width" /> · <C id="complex_energy" /></p>

      <Sub n="KIII-1" title="Introduction" zh="问题：定态为什么会“不定”">
        <Tx>{R`**理论说不变，实验说会变。**设保守系统（$H$ 不显含时间）在 $t=0$ 处于 $H$ 的某个本征态：`}</Tx>
        <Eq n="KIII-1" say={R`初始时刻系统恰好处在 $H$ 的一个本征态上。`}>{R`|\psi(0)\rangle=|\varphi_n\rangle`}</Eq>
        <Eq n="KIII-2" say={R`$|\varphi_n\rangle$ 是能量为 $E_n$ 的定态。`}>{R`H|\varphi_n\rangle=E_n|\varphi_n\rangle`}</Eq>
        <Tx>{R`按正文 \mainsec{D-2-b}，系统将永远停留在这个态上。第 VII 章会解氢原子 Hamilton 量的本征值问题，得到的能级与实验符合得极好；可实验同样告诉我们，除基态外的这些"定态"其实都不稳定：处在激发态的原子迟早会放出一个或几个光子回到基态。

**矛盾出在哪里。**问题不在量子力学，而在模型：第 VII 章解的是一个**孤立**的氢原子，真实原子却泡在电磁场里，随时可以与它交换能量。严格说，能写出 Hamilton 量的是"原子 + 电磁场"这个整体，单独的原子没有（参见 \IIIc{EIII-5} 的评注）。为什么平时可以放心地忽略电磁场？因为耦合很弱，强度由精细结构常数 $\simeq1/137$ 衡量（第 VII 章）——忽略它对能级位置的影响极小；只有当我们关心的正是"态会不会衰变"时，这个近似才失效。`}</Tx>
        <Box kind="note" title="两种“随时间变化”不可混为一谈">{R`孤立保守系统若初态是几个定态的叠加，它也会随时间变化，并不停留在初态。但此时 $H$ 是运动常数（正文 \mainsec{D-2-c}）：测得各个能量值的概率、能量平均值都不随时间改变。不稳定态则不同：一个态**不可逆地**变成另一个态，系统的能量减少了——被辐射出的光子带走（光子还可以带走动量与角动量）。

另外，激发态的不稳定来自光子的**自发**发射；基态之下没有更低的态，所以基态稳定。当然，原子也可以吸收光而跃迁到更高的能级。`}</Box>
        <Tx>{R`本补充材料只做**唯象**的处理：仍然把系统当作孤立的，用尽量简单的方式把"不稳定"装进量子描述。更严格的处理（并为这里的唯象方法提供依据）见 $\mathrm{D}_{\rm XIII}$。`}</Tx>
      </Sub>

      <Sub n="KIII-2" title="Definition of the lifetime" zh="寿命的定义">
        <Tx>{R`**实验事实：一个参数就够了。**很多不稳定态的行为只需一个具有时间量纲的参数 $\tau$——该态的**寿命**（lifetime）——就能刻画：若 $t=0$ 时把系统制备在不稳定态 $|\varphi_n\rangle$，到 $t$ 时刻它仍处于激发态的概率是`}</Tx>
        <Eq n="KIII-3" keyEq title="指数衰减律" say={R`$t$ 时刻仍未衰变的概率随时间指数下降，衰减的时间尺度就是寿命 $\tau$。`}>{R`${PP}(t)=\mathrm e^{-t/\tau}`}</Eq>
        <Tx>{R`**换成统计的语言。**取大量（$${NTOT}$ 个）相同、相互独立、都在 $t=0$ 制备于 $|\varphi_n\rangle$ 的系统。$t$ 时刻还剩 $${NT}(t)=${NTOT}\,\mathrm e^{-t/\tau}$ 个处在该态；在 $t$ 到 $t+\mathrm dt$ 之间离开的数目是`}</Tx>
        <Eq n="KIII-4" say={R`单位时间内衰变掉的系统数，与此刻还剩下的数目成正比，比例系数是 $1/\tau$。`}>{R`\mathrm dn(t)=${NT}(t)-${NT}(t+\mathrm dt)=-\frac{\mathrm d${NT}(t)}{\mathrm dt}\,\mathrm dt=${NT}(t)\,\frac{\mathrm dt}{\tau}`}</Eq>
        <Tx>{R`对 $t$ 时刻仍"幸存"的每个系统，它在随后 $\mathrm dt$ 内离开的概率是`}</Tx>
        <Eq n="KIII-5" say={R`一个尚未衰变的系统在下一个 $\mathrm dt$ 内衰变的概率恒为 $\mathrm dt/\tau$，与它已经存活了多久无关。`}>{R`\mathrm d\varpi(t)=\frac{\mathrm dn(t)}{${NT}(t)}=\frac{\mathrm dt}{\tau}`}</Eq>
        <Tx>{R`$\mathrm d\varpi$ 与 $t$ 无关：系统有一个恒定的**单位时间衰变概率** $1/\tau$。这是指数律的真正内容——"不会变老"。反过来，若每个系统在任何时刻衰变的倾向都相同，积分 \eqref{KIII-4} 就必然得到 \eqref{KIII-3}。`}</Tx>
        <h4>三点评注</h4>
        <Tx>{R`**(i) 为什么叫“寿命”。**系统停留在不稳定态的平均时间是（$\mathrm e^{-t/\tau}\mathrm dt/\tau$ 是"恰好在 $t$ 附近衰变"的概率）`}</Tx>
        <Eq n="KIII-6" say={R`以衰变时刻的概率分布加权求平均，得到的平均停留时间恰好就是 $\tau$。`}>{R`\int_0^\infty t\,\mathrm e^{-t/\tau}\,\frac{\mathrm dt}{\tau}=\tau`}</Eq>
        <Tx>{R`所以 $\tau$ 就是平均寿命。稳定态的 $${PP}(t)$ 恒为 1，寿命无穷大。

**(ii) 寿命不记得“来历”。**$\tau$ 与系统是怎样被制备到不稳定态的无关——它是不稳定态本身的属性。这与 \eqref{KIII-5} 的"无记忆"是同一件事。

**(iii) 自然宽度。**按能量–时间不确定关系（正文 \mainsec{D-2-e}），演化的特征时间 $\tau$ 对应能量的不确定度`}</Tx>
        <Eq n="KIII-7" keyEq title="自然宽度" say={R`寿命越短，能量越“模糊”：能量的不确定度约为 $\hbar$ 除以寿命。`}>{R`\Delta E\simeq\frac{\hbar}{\tau}`}</Eq>
        <Tx>{R`实验确实发现不稳定态的能量不能无限精确地确定，只能精确到 $\Delta E$ 的量级；$\Delta E$ 称为该态的**自然宽度**（natural width）。就氢原子而言，各能级的宽度与能级间距相比小得可以忽略——例如 $2p$ 态寿命约 $1.6\,\mathrm{ns}$，$\hbar/\tau\approx4\times10^{-7}\,\mathrm{eV}$，而 $2p$ 与 $1s$ 相距约 $10\,\mathrm{eV}$。这就是一级近似下可以把它们当作稳定态的原因。`}</Tx>
      </Sub>

      <Sub n="KIII-3" title="Phenomenological description of the instability of a state" zh="不稳定性的唯象描述：复能量">
        <Tx>{R`**先看稳定的情形。**保守系统初始处于 $|\varphi_n\rangle$，按正文 \mainref{D-54}，`}</Tx>
        <Eq n="KIII-8" say={R`定态随时间只多出一个相位因子。`}>{R`|\psi(t)\rangle=\mathrm e^{-iE_nt/\hbar}|\varphi_n\rangle`}</Eq>
        <Tx>{R`$t$ 时刻测得系统仍在 $|\varphi_n\rangle$ 的概率`}</Tx>
        <Eq n="KIII-9" say={R`仍在原态的概率是相位因子的模平方——能量为实数时它恒为 1。`}>{R`${PP}_n(t)=\Big|\mathrm e^{-iE_nt/\hbar}\Big|^2`}</Eq>
        <Tx>{R`$H$ 是可观测量，$E_n$ 为实数，这个概率恒为 1——定态之所以"定"，全靠能量是实数。

**一个大胆的改动。**那就让能量带上虚部：把 \eqref{KIII-9} 中的 $E_n$ 换成复数`}</Tx>
        <Eq n="KIII-10" keyEq title="复能量" say={R`把能量换成复数：实部是能级的位置，负虚部的大小 $\hbar\gamma_n/2$ 决定衰减得多快。`}>{R`E_n'=E_n-i\hbar\frac{\gamma_n}2`}</Eq>
        <Tx>{R`概率变成`}</Tx>
        <Eq n="KIII-11" keyEq title="复能量给出指数衰减" say={R`能量的虚部使相位因子的模随时间指数衰减，其平方给出 $\mathrm e^{-\gamma_nt}$——正是实验的衰减律。`}>{R`${PP}_n'(t)=\Big|\mathrm e^{-i(E_n-i\hbar\frac{\gamma_n}2)t/\hbar}\Big|^2=\mathrm e^{-\gamma_nt}`}</Eq>
        <Tx>{R`这正是 \eqref{KIII-3} 的指数衰减。所以要唯象地描述寿命为 $\tau_n$ 的不稳定态 $|\varphi_n\rangle$，只需像 \eqref{KIII-10} 那样给能量加一个虚部，并令`}</Tx>
        <Eq n="KIII-12" keyEq title="衰减率 = 1/寿命" say={R`能量虚部里的衰减率 $\gamma_n$ 就是寿命的倒数。`}>{R`\gamma_n=\frac1{\tau_n}`}</Eq>
        <Box kind="warning" title="代价：范数不守恒，“Hamilton 量”不再厄米">{R`把 $E_n$ 换成 $E_n'$ 后，\eqref{KIII-8} 中态矢量的范数变成 $\mathrm e^{-\gamma_nt/2}$，随时间减小。这并不奇怪：正文 \mainsec{D-1-c} 说明范数守恒来自 Hamilton 算符的厄米性，而本征值为复数的算符不可能是厄米的。归根结底，所研究的系统只是一个更大系统（原子 + 电磁场）的一部分，它的演化本来就不能严格用一个 Hamilton 量描述。能用一个本征值为复数的"Hamilton 量"把它描述得这么简单，已经相当了不起。`}</Box>

        <h4>补充：复能量的 Fourier 分析——Lorentz 线形</h4>
        <Tx>{R`\eqref{KIII-7} 只说了 $\Delta E\simeq\hbar/\tau$ 的量级。复能量让我们把它算到底（这一段是本站的补充，原书在第 XIII 章补充材料中才严格处理）。$t\ge0$ 时振幅 $c(t)=\mathrm e^{-iE_n't/\hbar}=\mathrm e^{-iE_nt/\hbar}\mathrm e^{-\gamma_nt/2}$；它的 Fourier 分量给出"这个衰变态里含有能量 $E$ 的比重"：`}</Tx>
        <Derivation title="从指数衰减到 Lorentz 线形" collapsed steps={[
          { tex: R`\int_0^\infty\mathrm e^{iEt/\hbar}\,c(t)\,\mathrm dt=\int_0^\infty\mathrm e^{[i(E-E_n)/\hbar-\gamma_n/2]t}\,\mathrm dt=\frac{\hbar}{\hbar\gamma_n/2-i(E-E_n)}`, why: "收敛因子来自 $\\gamma_n>0$。" },
          { tex: R`\Big|\cdots\Big|^2=\frac{\hbar^2}{(E-E_n)^2+(\hbar\gamma_n/2)^2}`, why: "取模平方。" },
          { tex: R`w(E)=\frac{1}{2\pi}\,\frac{\hbar\gamma_n}{(E-E_n)^2+(\hbar\gamma_n/2)^2},\qquad\int w(E)\,\mathrm dE=1`, why: "归一化后即 Lorentz 分布（Cauchy 分布）。" },
          { tex: R`w(E_n\pm\hbar\gamma_n/2)=\tfrac12\,w(E_n)\ \Rightarrow\ \text{半高全宽}=\hbar\gamma_n=\frac{\hbar}{\tau_n}`, why: "半高宽恰为 $\\hbar/\\tau_n$：\\eqref{KIII-7} 的 $\\simeq$ 在这个意义上变成了等号。" },
        ]} />
        <Tx>{R`于是"寿命"与"线宽"是同一个复数 $E_n'$ 的虚部的两种读法：时间域里是指数衰减，能量域里是宽度 $\hbar\gamma_n$ 的 Lorentz 线形。下图在浏览器里直接对 $c(t)$ 做数值 Fourier 变换并量出半高宽，与 $\hbar/\tau$ 对照。`}</Tx>
        <DecayPlot />
        <Box kind="warning" title="Lorentz 线形的方均根宽度是无穷大">{R`Lorentz 分布的尾巴按 $1/(E-E_n)^2$ 衰减，二阶矩发散，所以正文意义下的方均根偏差 $\Delta E$ 严格说是无穷大。线宽一律用半高全宽 $\hbar\gamma_n$ 来描述；\eqref{KIII-7} 中的 $\Delta E$ 应当这样理解。`}</Box>
      </Sub>
    </Sec>);
}
