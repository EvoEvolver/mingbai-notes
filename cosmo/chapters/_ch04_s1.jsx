// §4.1 The homogeneous Boltzmann equation revisited —— 式 (4.1)–(4.9)，表 4.1
import { Sec, Tx, Eq, Box, Derivation, Table, C } from "@kit";
import { S } from "./_ch04_notation.jsx";

const R = String.raw;
const N0 = S.n0;

export function Sec41() {
  return (
    <Sec n="4.1" title="The homogeneous Boltzmann equation revisited" zh="再访均匀宇宙中的 Boltzmann 方程"
      gist={R`动力学平衡 + 玻尔兹曼统计，把关于分布函数的积分–微分方程 \eqref{4.1} 压缩成每种粒子一个常微分方程——**速率方程** \eqref{4.8}；反应率远大于 $H$ 时它退化为化学平衡条件 \eqref{4.9}（Saha 方程）。`}
      why={R`本章三个应用（中子–质子比、复合、暗物质）都是"反应 $1+2\leftrightarrow3+4$ 跟不跟得上膨胀"的问题；先把通用工具磨好，后面三节都只是代入。`}
      gives={["4.1", "4.5", "4.7", "4.8", "4.9"]}>
      <p className="muted">本节概念：<C id="rate_eq" /> · <C id="chem_eq" /> · <C id="freeze_out" /></p>
      <Tx>{R`**出发点。**设我们关心物种 1 的数密度 $n_1$。为简单起见，假设影响它丰度的唯一过程是与物种 2 反应、生成两个粒子——不妨就叫 3 和 4：$1+2\leftrightarrow3+4$。也就是说，1 和 2 可以湮灭成 3 和 4，逆过程也可以产生 1 和 2。膨胀宇宙中这个系统的 Boltzmann 方程已在 §3.2.2 推出，对应的碰撞项在 §3.2.3 给出；把一般结果 \eqref{3.43} 与 \eqref{3.48} 合起来，得到 $n_1$ 的演化方程：`}</Tx>
      <Eq n="4.1" title="均匀宇宙的 Boltzmann 方程" say={R`共动体积内粒子 1 的数目变化率 = 对四个粒子全部动量积分的“产生 − 湮灭”：$\delta_{\rm D}$ 函数保证能量动量守恒，$|\mathcal M|^2$ 是反应强度，花括号里是逆反应减正反应（含泡利阻塞/玻色增强因子 $1\pm f$）。`}>{R`\begin{aligned}a^{-3}\frac{d(n_1a^3)}{dt}={}&\int\frac{d^3p_1}{(2\pi)^32E_1}\int\frac{d^3p_2}{(2\pi)^32E_2}\int\frac{d^3p_3}{(2\pi)^32E_3}\int\frac{d^3p_4}{(2\pi)^32E_4}\\&\times(2\pi)^4\delta_{\rm D}^{(3)}(\boldsymbol p_1+\boldsymbol p_2-\boldsymbol p_3-\boldsymbol p_4)\,\delta_{\rm D}^{(1)}(E_1+E_2-E_3-E_4)\,|\mathcal M|^2\\&\times\{f_3f_4[1\pm f_1][1\pm f_2]-f_1f_2[1\pm f_3][1\pm f_4]\}.\end{aligned}`}</Eq>
      <Tx>{R`这里 $E_i$ 是 $E_i(p_i)$ 的简写，$f_i$ 是 $f_i(p_i,t)$ 的简写。**先读懂左边**：$n_1a^3$ 是一个共动体积里粒子 1 的个数，若没有任何反应它就是常数（只是被膨胀稀释）；所以左边量度的恰恰是"反应造成的净变化"。右边第一项 $f_3f_4[1\pm f_1][1\pm f_2]$ 是 $3+4\to1+2$ 的产生，第二项是 $1+2\to3+4$ 的损失；$1\pm f$ 是玻色增强（$+$）或泡利阻塞（$-$）。

**难在哪里？**这是一个关于相空间分布的**积分–微分方程**，原则上还要对其他物种写出同样的方程、联立求解。幸好在宇宙学的大多数应用中，这些困难可以绕开。`}</Tx>

      <Tx>{R`**第一个化简：动力学平衡。**最重要的认识是：散射过程（只交换能量动量、不改变粒子数）通常快得多，它们强制实现**动力学平衡**（kinetic equilibrium）——各物种的分布都取一般的玻色–爱因斯坦/费米–狄拉克形式（\eqref{2.65}、\eqref{2.66}），并且**所有物种温度 $T$ 相同**。于是分布中的全部自由度被压缩成两个时间的函数：$T$ 和化学势 $\mu$。

如果湮灭过程也处于平衡，任何反应两边的化学势之和必须相等。例如 $e^++e^-\leftrightarrow\gamma+\gamma$ 平衡时 $\mu_{e^+}+\mu_{e^-}=2\mu_\gamma$。但我们要研究的恰恰是不平衡的情形：系统不处于**化学平衡**（chemical equilibrium），我们需要解一个关于 $\mu$ 的微分方程。动力学平衡的伟大之处在于：这将是**一个常微分方程**，而不是 \eqref{4.1} 那样复杂的积分方程。`}</Tx>
      <Box kind="physics" title="两种平衡，两种速率">{R`早期宇宙中，**散射**（如 $e\gamma\to e\gamma$）改变动量而不改变粒子数，**湮灭/产生**（如 $e^+e^-\to\gamma\gamma$）改变粒子数。前者通常远快于后者。所以典型的状态是：分布的**形状**早已热化（动力学平衡），而**数目**是否跟得上取决于湮灭率与膨胀率之比。本章所有"冻结"都发生在这一层：动力学平衡仍在，化学平衡丢了。`}</Box>

      <Tx>{R`**第二个化简：经典（玻尔兹曼）统计。**我们感兴趣的系统温度通常远低于 $E-\mu$。此时 BE 和 FD 分布分母中的指数很大，远远压倒 $\pm1$，量子统计的复杂性可以忽略，分布就是经典稀薄气体的**玻尔兹曼分布**（Boltzmann distribution）：`}</Tx>
      <Eq n="4.2" say={R`当 $E-\mu\gg T$ 时，量子统计退化为经典玻尔兹曼分布：占据数是一个化学势因子乘以能量的指数压低。`}>{R`f(E)\to e^{\mu/T}e^{-E/T}.`}</Eq>
      <Tx>{R`同时，Boltzmann 方程中的泡利阻塞/玻色增强因子也可忽略，因为在 \eqref{4.2} 的极限下 $f(E)\ll1$，$1\pm f\simeq1$。在这两条近似下，\eqref{4.1} 的最后一行变成`}</Tx>
      <Eq n="4.3" say="玻尔兹曼极限下，花括号里的“产生 − 湮灭”只剩一个公共的能量指数因子乘以两边化学势指数之差：反应是否平衡全由化学势决定。">{R`\begin{aligned}&f_3f_4[1\pm f_1][1\pm f_2]-f_1f_2[1\pm f_3][1\pm f_4]\\&\qquad\to\ e^{-(E_1+E_2)/T}\left\{e^{(\mu_3+\mu_4)/T}-e^{(\mu_1+\mu_2)/T}\right\}.\end{aligned}`}</Eq>
      <Derivation title={R`从 \eqref{4.1} 的最后一行到 \eqref{4.3}`} collapsed steps={[
        { tex: R`f_i\simeq e^{\mu_i/T}e^{-E_i/T},\qquad 1\pm f_i\simeq1`, why: R`玻尔兹曼极限 \eqref{4.2}，$f_i\ll1$。` },
        { tex: R`f_3f_4-f_1f_2=e^{(\mu_3+\mu_4)/T}e^{-(E_3+E_4)/T}-e^{(\mu_1+\mu_2)/T}e^{-(E_1+E_2)/T}`, why: R`直接代入。` },
        { tex: R`=e^{-(E_1+E_2)/T}\left\{e^{(\mu_3+\mu_4)/T}-e^{(\mu_1+\mu_2)/T}\right\}`, why: R`积分中有 $\delta_{\rm D}^{(1)}(E_1+E_2-E_3-E_4)$，可用能量守恒 $E_3+E_4=E_1+E_2$ 提出公因子。` },
      ]} />
      <Tx>{R`**换一个未知函数：用 $n$ 代替 $\mu$。**我们更愿意直接解数密度。物种 $s$ 的数密度与 $\mu_s$ 的关系是`}</Tx>
      <Eq n="4.4" say={R`动力学平衡下，数密度 = 简并度 $\times$ 化学势因子 $\times$ 对玻尔兹曼因子的动量积分：知道 $n$ 就等于知道 $\mu$。`}>{R`n_s=g_se^{\mu_s/T}\int\frac{d^3p}{(2\pi)^3}e^{-E_s(p)/T},`}</Eq>
      <Tx>{R`$g_s$ 是我们已熟悉的简并度（自旋态数）。再定义一个很有用的量：同温度下 $\mu_s=0$ 时的数密度`}</Tx>
      <Eq n="4.5" keyEq title="平衡数密度" say={R`零化学势时的“平衡”数密度：非相对论粒子被 $e^{-m/T}$ 指数压低（还带 $(mT)^{3/2}$ 的相空间因子），相对论粒子则 $\propto T^3$。`}>{R`${N0}_s^{(0)}\equiv g_s\int\frac{d^3p}{(2\pi)^3}e^{-E_s(p)/T}=\begin{cases}g_s\left(\dfrac{m_sT}{2\pi}\right)^{3/2}e^{-m_s/T}&m_s\gg T,\\ g_s\dfrac{T^3}{\pi^2}&m_s\ll T.\end{cases}`}</Eq>
      <Derivation title={R`\eqref{4.5} 的两个极限`} collapsed steps={[
        { tex: R`${N0}_s^{(0)}=\frac{g_s}{2\pi^2}\int_0^\infty dp\,p^2e^{-E_s(p)/T}`, why: R`角度积分给出 $4\pi$，$4\pi/(2\pi)^3=1/2\pi^2$。` },
        { tex: R`m_s\gg T:\ E_s\simeq m_s+\frac{p^2}{2m_s}\ \Rightarrow\ \int_0^\infty dp\,p^2e^{-p^2/2m_sT}=\frac{\sqrt\pi}{4}(2m_sT)^{3/2}`, why: R`高斯积分 $\int_0^\infty u^2e^{-u^2}du=\sqrt\pi/4$（见习题 4.1）。` },
        { tex: R`\Rightarrow\ ${N0}_s^{(0)}=\frac{g_s}{2\pi^2}\frac{\sqrt\pi}{4}(2m_sT)^{3/2}e^{-m_s/T}=g_s\left(\frac{m_sT}{2\pi}\right)^{3/2}e^{-m_s/T}`, why: R`$\frac{\sqrt\pi\,2^{3/2}}{8\pi^2}=(2\pi)^{-3/2}$。` },
        { tex: R`m_s\ll T:\ E_s\simeq p\ \Rightarrow\ \int_0^\infty dp\,p^2e^{-p/T}=2T^3\ \Rightarrow\ ${N0}_s^{(0)}=g_s\frac{T^3}{\pi^2}`, why: R`$\Gamma(3)=2$。` },
      ]} />
      <Tx>{R`特别地，光子有 $${N0}_\gamma^{(0)}=2T^3/\pi^2$，这个关系非常有用。（精确的玻色–爱因斯坦结果多一个因子 $\zeta(3)=1.202$；在本章的估算中这一差别无关紧要。）有了这个定义，$e^{\mu_i/T}$ 可以改写为 $n_i/${N0}_i^{(0)}$，于是由 \eqref{4.4}：`}</Tx>
      <Eq n="4.6" say="化学势因子 = 实际数密度与平衡数密度之比；于是“产生 − 湮灭”可以全部用数密度写出。">{R`e^{(\mu_3+\mu_4)/T}-e^{(\mu_1+\mu_2)/T}=\frac{n_3n_4}{${N0}_3^{(0)}${N0}_4^{(0)}}-\frac{n_1n_2}{${N0}_1^{(0)}${N0}_2^{(0)}}.`}</Eq>

      <Tx>{R`**收官：速率方程。**在这些近似下，Boltzmann 方程大为简化。把所有与粒子物理相关的积分打包，定义**热平均截面**（thermally averaged cross section）`}</Tx>
      <Eq n="4.7" title="热平均截面" say={R`把反应强度 $|\mathcal M|^2$ 对所有入射与出射动量按热分布加权平均：$\langle\sigma v\rangle$ 是“截面 $\times$ 相对速度”的热平均，一般依赖温度。`}>{R`\begin{aligned}\langle\sigma v\rangle\equiv{}&\frac{1}{${N0}_1^{(0)}${N0}_2^{(0)}}\int\frac{d^3p_1}{(2\pi)^32E_1}\int\frac{d^3p_2}{(2\pi)^32E_2}\int\frac{d^3p_3}{(2\pi)^32E_3}\int\frac{d^3p_4}{(2\pi)^32E_4}\,e^{-(E_1+E_2)/T}\\&\times(2\pi)^4\delta_{\rm D}^{(3)}(\boldsymbol p_1+\boldsymbol p_2-\boldsymbol p_3-\boldsymbol p_4)\,\delta_{\rm D}^{(1)}(E_1+E_2-E_3-E_4)\,|\mathcal M|^2,\end{aligned}`}</Eq>
      <Tx>{R`它一般依赖温度 $T$。于是 Boltzmann 方程变成`}</Tx>
      <Eq n="4.8" keyEq title="速率方程" say={R`共动数密度的变化率 = 平衡数密度乘积 $\times$ 热平均截面 $\times$ （实际丰度相对平衡值的“产生项 − 湮灭项”）：右边为零时就是化学平衡。`}>{R`a^{-3}\frac{d(n_1a^3)}{dt}=${N0}_1^{(0)}${N0}_2^{(0)}\langle\sigma v\rangle\left\{\frac{n_3n_4}{${N0}_3^{(0)}${N0}_4^{(0)}}-\frac{n_1n_2}{${N0}_1^{(0)}${N0}_2^{(0)}}\right\}.`}</Eq>
      <Tx>{R`我们得到了每个物种数密度的一个简单常微分方程。各应用的细节各不相同（见表 4.1），但追踪丰度时我们**总是从这个方程出发**。`}</Tx>
      <Table caption={R`**表 4.1** 本章讨论的最重要反应。最后一行中 $X$ 表示暗物质粒子，$\psi$ 表示湮灭产生的较轻粒子。`}
        head={[R``, R`1`, R`2`, R`$\leftrightarrow$`, R`3`, R`4`]}
        rows={[
          [R`中子–质子比`, R`$${S.ne}$`, R`$\nu_e$ 或 $${S.el}^+$`, R`$\leftrightarrow$`, R`$${S.pr}$`, R`$${S.el}^-$ 或 $\bar\nu_e$`],
          [R`复合`, R`$${S.el}$`, R`$${S.pr}$`, R`$\leftrightarrow$`, R`H`, R`$\gamma$`],
          [R`暗物质产生`, R`$X$`, R`$X$`, R`$\leftrightarrow$`, R`$\psi$`, R`$\psi$`],
        ]} />

      <Tx>{R`**一个定性判断：什么时候能用平衡？**看 \eqref{4.8} 两边的量级。左边约为 $n_1/t$；而宇宙学的典型时间是 $H^{-1}$，所以左边 $\sim n_1H$。右边 $\sim n_1n_2\langle\sigma v\rangle$。因此，如果单个粒子 1 的反应率 $n_2\langle\sigma v\rangle$ 远大于膨胀率，右边的每一项都远大于左边；要保持等式，右边两项**必须几乎相消**。也就是说，反应率很大时 \eqref{4.8} 趋于`}</Tx>
      <Eq n="4.9" keyEq title="化学平衡（Saha）条件" say={R`反应率远快于膨胀时，产生与湮灭精确抵消：两边“实际丰度 / 平衡丰度”的乘积相等——这就是化学平衡，即 $\mu_1+\mu_2=\mu_3+\mu_4$。`}>{R`\frac{n_3n_4}{${N0}_3^{(0)}${N0}_4^{(0)}}=\frac{n_1n_2}{${N0}_1^{(0)}${N0}_2^{(0)}}.`}</Eq>
      <Tx>{R`这等价于 $\mu_1+\mu_2=\mu_3+\mu_4$，即前面所说的**化学平衡**。同一个关系也叫**核统计平衡**（nuclear statistical equilibrium, NSE）或 **Saha 方程**（Saha equation）。`}</Tx>
      <Box kind="key" title="本章的“万能判据”">{R`令 $\Gamma\equiv n_2\langle\sigma v\rangle$ 为单个粒子 1 的反应率：

◆ $\Gamma\gg H$：化学平衡，丰度由 \eqref{4.9} 代数地决定（常常随 $T$ 指数变化）；

◆ $\Gamma\ll H$：反应停止，共动丰度 $n_1a^3$ 不再变化——**冻结**（freeze-out）；

◆ $\Gamma\sim H$：过渡区，必须数值解 \eqref{4.8}。

因为 $\Gamma$ 一般随温度下降得比 $H$ 快（后面会看到 $\lambda_{np}\propto T^3$ 而 $H\propto T^2$；对非相对论物种，$n_2$ 还带 $e^{-m/T}$），每一种反应终将在某个温度冻结。本章三节分别是这个故事在 MeV、eV 与 $m_X/20$ 温度上的三个版本。`}</Box>
      <Box kind="warning" title="Saha 条件里有两个“平衡数密度”">{R`\eqref{4.9} 中的 $${N0}^{(0)}$ 是**同温度、零化学势**下的数密度，它们由 \eqref{4.5} 直接给出，含有质量差带来的指数因子。正是这些指数因子（例如 $e^{B_{\rm D}/T}$、$e^{-\epsilon_0/T}$）与粒子数比的竞争，决定了核合成与复合的时刻。不要把 $${N0}^{(0)}$ 与"处于化学平衡时的实际数密度"混为一谈——后者还带着各自的 $e^{\mu/T}$。`}</Box>
    </Sec>);
}
