import { PolarSpectraRedraw } from "./_ch14_redraw.jsx";
// §10.4 Boltzmann solution —— 式 (10.30)–(10.42)
// §10.5 Polarization power spectra —— 式 (10.43)–(10.46)，图 10.9–10.10
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { KernelPlot } from "./_ch10_plots.jsx";

const R = String.raw;

export function Sec104() {
  return (
    <Sec n="10.4" title="Boltzmann solution" zh="偏振的 Boltzmann 方程及其解"
      gist={R`$\Theta_P$ 的自由流项与 $\Theta$ 相同，碰撞项含源 $\frac34(1-\mu^2)\Pi$ 与损失 $\Theta_P$（\eqref{10.31}）。视线积分 + 瞬时退耦 + 小尺度近似给出 $E_l\simeq\frac34\Pi(\eta_*)\frac{l^2}{(k\eta_0)^2}j_l(k\eta_0)$；紧耦合下 $\Pi=\frac52\Theta_2$，再用 $\Theta_2=-\frac{4k}{9\tau'}\Theta_1$ 得 \eqref{10.42}。`}
      why={R`上一节只是单次散射的"快照"。要预言今天看到的 E 模，必须写出偏振随时间演化的方程并沿视线积分——方法与第 9 章求温度各向异性完全平行。`}
      gives={["10.30", "10.31", "10.32", "10.33", "10.34", "10.35", "10.36", "10.37", "10.38", "10.39", "10.40", "10.41", "10.42"]}>
      <p className="muted">本节概念：<C id="tight_supp" /> · <C id="scalar_E" /></p>

      <Sub n="10.4.1" title="The polarization Boltzmann equation" zh="偏振的 Boltzmann 方程">
        <Tx>{R`**$\Theta_P$ 的精确含义。**在 \secref{5.7} 中我们简短地引入了偏振强度 $\Theta_P(k,\mu,\eta)$。现在可以精确定义它了：它对应波矢 $\boldsymbol k$ 沿 $x$ 方向时的 $Q$ 偏振。更一般地，$\Theta_P=\Theta_E$ 给出 E 模偏振的振幅。由于标量扰动绕 $\hat{\boldsymbol k}$ 轴方位对称，偏振完全由单个函数 $\Theta_P(k,\mu,\eta)$ 决定。要预言观测到的 E 模，就要推导并求解决定 $\Theta_P$ 演化的 Boltzmann 方程。幸运的是，难活儿已经干完了。

**左边：自由流。**方程左边由自由流决定，所以与 $\Theta(k,\mu,\eta)$ 的相同：$\Theta_P'+ik\mu\Theta_P$。（偏振不受引力势影响——没有 $\Phi'$、$\Psi$ 项：引力红移对两个偏振方向一视同仁。）

**右边：源与损失。**右边含源项与损失项。

- 上一节（\eqref{10.27}）发现：出射偏振（$\hat{\boldsymbol k}$ 在 $x$–$z$ 平面内）$\propto(1-\mu^2)\Theta_2$，其中 $\mu$ 是 $\hat{\boldsymbol k}$ 与 $\hat{\boldsymbol n}$ 夹角的余弦。比例常数必须含单位 $\eta$ 间隔内的散射次数，所以 $A\propto-\tau'$（回忆光深按惯例沿时间倒着量，故有负号）。因此预期 $\Theta_P$ 的源项 $\propto-\tau'(1-\mu^2)\Theta_2$。
- 另一个重要事实：若没有源，辐射通过 Compton 散射会逐渐**退偏振**。所以预期有一个正比于 $\Theta_P$ 的损失项，即 $\tau'\Theta_P$。

合起来得到`}</Tx>
        <Eq n="10.30" title="启发式的偏振 Boltzmann 方程" say={R`偏振像温度一样自由流动；每次散射按 $(1-\mu^2)\Theta_2$ 产生新的偏振，同时把已有的偏振"洗掉"。`}>{R`\Theta_P' + ik\mu\Theta_P = -\tau'\left[b(1-\mu^2)\Theta_2-\Theta_P\right],`}</Eq>
        <Tx>{R`其中 $b$ 是一个预期为 1 量级的常数。这个方程几乎全对。还需计入的一个效应是**入射辐射本身的偏振**——推导中我们假设了入射辐射非偏振。结果是（Bond & Efstathiou 1987）`}</Tx>
        <Eq n="10.31" keyEq title="偏振的 Boltzmann 方程" say={R`完整方程：损失项 $-\Theta_P$ 不变，源项变为 $\frac34(1-\mu^2)\Pi$，其中 $\Pi$ 把温度四极与入射偏振的单极、四极合在一起。`}>{R`\Theta_P' + ik\mu\Theta_P = -\tau'\left[-\Theta_P+\frac34(1-\mu^2)\Pi\right]`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="10.32" title="偏振的源 Π" say={R`偏振的源 = 温度四极 + 偏振四极 + 偏振单极：已偏振的入射光散射后也会贡献偏振。`}>{R`\Pi(k,\eta) \equiv \Theta_2 + \Theta_{P2} + \Theta_{P0}.`}</Eq>
        <Box kind="note" title="与第 5 章方程的一致性">{R`$\frac34(1-\mu^2)=\frac12[1-\mathcal P_2(\mu)]$，所以 \eqref{10.31} 也可写成 $\Theta_P'+ik\mu\Theta_P=-\tau'\left[-\Theta_P+\frac12(1-\mathcal P_2(\mu))\Pi\right]$，这正是第 5 章所用的形式；同一个 $\Pi$ 也出现在温度方程 \eqref{5.67} 的 $-\frac12\mathcal P_2(\mu)\Pi$ 项中（\eqref{5.68}）。与 \eqref{10.30} 比较，完整推导相当于把 $b\Theta_2$ 换成 $\frac34\Pi$；紧耦合下 $\Pi=\frac52\Theta_2$（\exref{10.5}），即等效 $b=\frac{15}{8}$。`}</Box>
      </Sub>

      <Sub n="10.4.2" title="Line-of-sight solution" zh="视线积分解">
        <Tx>{R`**形式解。**现在求解偏振的 Boltzmann 方程。仿照 \eqref{9.49}，\eqref{10.31} 的形式解为`}</Tx>
        <Box kind="warning" title="勘误：引用的方程编号">{R`原书此处印作"the formal solution to Eq. (10.32)"；正确为 \eqref{10.31}（上文已改）。依据：\eqref{10.32} 只是源 $\Pi$ 的定义，不是微分方程；被求解的是偏振 Boltzmann 方程 \eqref{10.31}，下面的 \eqref{10.34} 也正是 \eqref{10.31} 右边的产生项。`}</Box>
        <Eq n="10.33" title="形式解" say={R`今天的偏振 = 过去每一时刻产生的偏振，乘以自由流相位 $e^{ik\mu(\eta-\eta_0)}$ 与此后未被再散射的概率 $e^{-\tau}$，再对时间积分。`}>{R`\Theta_P(k,\mu) = \int_0^{\eta_0}d\eta\,e^{ik\mu(\eta-\eta_0)-\tau(\eta)}S_P(k,\mu,\eta),`}</Eq>
        <Tx>{R`其中源项为`}</Tx>
        <Eq n="10.34" title="源函数" say={R`源函数就是 \eqref{10.31} 右边的产生项；损失项 $\tau'\Theta_P$ 已被因子 $e^{-\tau}$ 吸收。`}>{R`S_P(k,\mu,\eta) = -\frac34\tau'(1-\mu^2)\Pi.`}</Eq>
        <Derivation title={R`验证 \eqref{10.33} 解 \eqref{10.31}`} collapsed steps={[
          { tex: R`\Theta_P'+(ik\mu-\tau')\Theta_P=S_P`, why: R`把 \eqref{10.31} 的 $\tau'\Theta_P$ 移到左边。` },
          { tex: R`\frac{d}{d\eta}\left[\Theta_Pe^{ik\mu\eta-\tau}\right]=S_Pe^{ik\mu\eta-\tau}`, why: R`积分因子 $e^{ik\mu\eta-\tau}$（注意 $(e^{-\tau})'=-\tau'e^{-\tau}$）。` },
          { tex: R`\Theta_P(\eta_0)=\int_0^{\eta_0}d\eta\,S_P\,e^{ik\mu(\eta-\eta_0)-\tau(\eta)}`, why: R`从 $0$ 积到 $\eta_0$；$\tau(\eta_0)=0$，而 $\eta\to0$ 时 $\tau\to\infty$，初值的贡献被 $e^{-\tau}$ 完全压掉。` },
        ]} />
        <Tx>{R`利用 \eqref{9.56} 对可见度函数的定义 $g(\eta)=-\tau'e^{-\tau}$，它可以写成`}</Tx>
        <Eq n="10.35" title="用可见度函数表示" say={R`偏振是源 $\Pi$ 按"最后散射概率" $g(\eta)$ 加权的平均，再乘以几何因子 $\frac34(1-\mu^2)$ 与自由流相位。`}>{R`\Theta_P(k,\mu) = \frac34(1-\mu^2)\int_0^{\eta_0}d\eta\,g(\eta)e^{ik\mu(\eta-\eta_0)}\Pi(k,\eta).`}</Eq>
        <Tx>{R`**瞬时退耦。**一个合理的近似是：除了变化剧烈的可见度函数之外，被积函数都取退耦时刻的值。剩下的 $g(\eta)$ 积分等于 1，结果为`}</Tx>
        <Eq n="10.36" title="瞬时退耦近似" say={R`把最后散射面当作无限薄：今天看到的偏振就是退耦时的源 $\Pi(\eta_*)$，乘几何因子，再沿视线自由传播到今天。`}>{R`\Theta_P(k,\mu) \simeq \frac34\Pi(k,\eta_*)(1-\mu^2)e^{ik\mu(\eta_*-\eta_0)}.`}</Eq>
        <Tx>{R`**化 $\mu$ 为导数。**忽略 $\eta_*$ 相对 $\eta_0$，并把 $\mu$ 的因子改写为导数（$\partial^2_{k\eta_0}e^{-ik\eta_0\mu}=-\mu^2e^{-ik\eta_0\mu}$），得`}</Tx>
        <Eq n="10.37" title={R`把 $\mu^2$ 换成导数`} say={R`$1-\mu^2$ 的因子可以写成作用在平面波相位上的微分算符 $1+\partial^2/\partial(k\eta_0)^2$，这样取 Legendre 矩时只需对 $j_l$ 求导。`}>{R`\Theta_P(k,\mu) \simeq \frac34\Pi(k,\eta_*)\left(1+\frac{\partial^2}{\partial(k\eta_0)^2}\right)e^{-ik\eta_0\mu}.`}</Eq>
        <Tx>{R`**取多极矩。**要得到矩 $\Theta_{P,l}$，把 \eqref{10.37} 乘以 $\mathcal P_l(\mu)$ 并像 \eqref{5.66} 那样对 $\mu$ 积分。由 \eqref{C.15}（$\frac{1}{(-i)^l}\int_{-1}^1\frac{d\mu}{2}\mathcal P_l(\mu)e^{-ix\mu}=j_l(x)$）得`}</Tx>
        <Eq n="10.38" keyEq title="今天的 E 模多极矩" say={R`今天第 $l$ 个 E 模多极矩 = 退耦时的偏振源乘以投影核 $(1+\partial^2_x)j_l(x)$，$x=k\eta_0$：三维波数 $k$ 主要投影到 $l\sim k\eta_0$。`}>{R`E_l(k) = \Theta_{P,l}(k) \simeq \frac34\Pi(k,\eta_*)\left(1+\frac{\partial^2}{\partial(k\eta_0)^2}\right)j_l(k\eta_0).`}</Eq>
        <Tx>{R`我们把 $\Theta_{P,l}$ 等同于 $E_l$，因为标量扰动只产生 E 模。

**小尺度近似。**\eqref{10.38} 含 $(j_l+j_l'')(k\eta_0)$。利用球 Bessel 方程（\eqref{C.13}）可改写为`}</Tx>
        <Eq n="10.39" title="投影核的三项" say={R`投影核 $j_l+j_l''$ 精确地等于三项之和；在 $x\sim l$ 处，前两项为 $\mathcal O(l^{-1})$，第三项为 $\mathcal O(1)$。`}>{R`j_l + j_l'' = -\frac{2}{k\eta_0}j_{l-1} + \frac{2(l+1)}{(k\eta_0)^2}j_l + \frac{l(l+1)}{(k\eta_0)^2}j_l.`}</Eq>
        <Derivation title={R`由球 Bessel 方程推出 \eqref{10.39}`} collapsed steps={[
          { tex: R`j_l''+\frac2xj_l'+\left[1-\frac{l(l+1)}{x^2}\right]j_l=0`, why: R`球 Bessel 方程 \eqref{C.13}，$x=k\eta_0$。` },
          { tex: R`j_l+j_l''=-\frac2xj_l'+\frac{l(l+1)}{x^2}j_l`, why: "移项。" },
          { tex: R`j_l'=j_{l-1}-\frac{l+1}{x}j_l`, why: R`球 Bessel 函数的递推关系。` },
          { tex: R`j_l+j_l''=-\frac2xj_{l-1}+\frac{2(l+1)}{x^2}j_l+\frac{l(l+1)}{x^2}j_l`, why: R`代入，即 \eqref{10.39}。` },
        ]} />
        <Tx>{R`右边三项中，**最后一项在小尺度上占主导**。要看清这一点，记住球 Bessel 函数大致在 $k\eta_0\sim l$ 处取峰值。作量级估计时，可以在右边三项中都把 $k\eta_0$ 取为 $l$ 的量级。于是第一、二项为 $l^{-1}$ 量级，而最后一项为 $l^2/(k\eta_0)^2\sim1$ 量级，占主导。所以`}</Tx>
        <Eq n="10.40" title="小尺度近似" say={R`$l\gg1$ 时投影核约为 $\frac{l^2}{(k\eta_0)^2}j_l$：它在 $k\eta_0\sim l$ 处与 $j_l$ 本身同量级，偏振的投影与温度几乎一样，只是多了一个压低 $k\eta_0>l$ 处贡献的因子。`}>{R`E_l(k) \simeq \frac34\Pi(k,\eta_*)\frac{l^2}{(k\eta_0)^2}j_l(k\eta_0).`}</Eq>
        <Box kind="example" title="交互：投影核与小尺度近似（本页补充，原书无此图）">
          <KernelPlot l0={200} />
          <Tx>{R`投影核的检验：在浏览器中用 Miller 递推计算球 Bessel 函数，比较精确的 $(j_l+j_l'')(k\eta_0)$（黑）与小尺度近似 $\frac{l^2}{(k\eta_0)^2}j_l$（橙虚线）以及 \eqref{10.39} 的前两项（绿点线）。核对（$k\eta_0>0.95\,l$ 范围内近似的相对均方根误差）：$l=10$ 时 13%、$l=50$ 时 2.9%、$l=200$ 时 0.7%、$l=1000$ 时 0.15%——$l$ 小时前两项不可忽略——\eqref{10.40} 是一个 $l\gg1$ 的近似，与平直天空近似的适用范围一致。`}</Tx>
        </Box>
      </Sub>

      <Sub n="10.4.3" title="Tight coupling" zh="紧耦合极限：偏振正比于偶极">
        <Tx>{R`**$\Pi$ 与四极。**在紧耦合极限下，可以用四极表示 $\Pi$。在 \exref{10.5} 中可以证明：紧耦合时 $\Pi=5\Theta_2/2$。于是今天的偏振矩为`}</Tx>
        <Eq n="10.41" keyEq title={R`E 模 $\propto$ 退耦时的温度四极`} say={R`今天的 E 模直接正比于退耦时刻的温度四极 $\Theta_2(\eta_*)$：偏振是最后散射面上四极的投影。`}>{R`E_l(k) \simeq \frac{15}{8}\Theta_2(k,\eta_*)\frac{l^2}{(k\eta_0)^2}j_l(k\eta_0).`}</Eq>
        <Box kind="example" title={R`为什么 $\Pi=\frac52\Theta_2$（\exref{10.5} 的要点）`}>{R`$\tau'$ 很大时，\eqref{10.31} 右边方括号必须为零：$\Theta_P=\frac34(1-\mu^2)\Pi=\frac12[1-\mathcal P_2(\mu)]\Pi$。按 \eqref{5.66} 取矩：$\Theta_{P0}=\frac12\Pi$，$\Theta_{P2}=\frac{1}{(-i)^2}\cdot\left(-\frac12\Pi\right)\cdot\frac15=\frac1{10}\Pi$（用了 $\int\frac{d\mu}2\mathcal P_2^2=\frac15$）。代入 \eqref{10.32}：$\Pi=\Theta_2+\frac{1}{10}\Pi+\frac12\Pi$，所以 $\Pi=\frac52\Theta_2$，$\Theta_{P0}=\frac54\Theta_2$，$\Theta_{P2}=\frac14\Theta_2$。注意入射偏振把源放大了 $2.5$ 倍。`}</Box>
        <Tx>{R`**再进一步：偏振正比于偶极。**在紧耦合极限下，四极正比于偶极（\eqref{9.36}：$\Theta_2=-\frac{4k}{9\tau'}\Theta_1$）。因此`}</Tx>
        <Eq n="10.42" keyEq title={R`E 模 $\propto$ 退耦时的偶极`} say={R`E 模 $\propto(k/\tau')\times$ 偶极：散射越频繁（$|\tau'|$ 越大）四极越小、偏振越弱；偏振随偶极（即流体速度）振荡，与温度单极错开半拍。`}>{R`E_l(k) \simeq -\frac{5k}{6\tau'(\eta_*)}\Theta_1(k,\eta_*)\frac{l^2}{(k\eta_0)^2}j_l(k\eta_0).`}</Eq>
        <Tx>{R`（$\frac{15}{8}\cdot\left(-\frac{4}{9}\right)=-\frac56$；由于 $\tau'<0$，前因子实际上是正的 $\frac{5k}{6|\tau'|}$。）

**三个值得注意的特征。**\eqref{10.42} 是假设紧耦合时单个平面波标量扰动在今天产生的偏振矩。

1. **最重要的**：偏振谱比各向异性谱小一个量级为 $k/\tau'$（退耦时）的因子。这直接源于两个事实：偏振由四极产生，而四极在早期宇宙中被 Compton 散射压低。
2. **振荡**：因为 $E_l\propto\Theta_1$，而 $\Theta_1$ 作声学振荡，所以预期偏振功率谱中有振荡。更定量地说，预期偏振振荡与偶极一样，与单极 $\Theta_0$ **反相**。温度各向异性谱的峰谷主要来自单极的振荡，因此应与偏振功率谱的峰谷错开。
3. **没有 ISW 的类比**：偏振不会因光子穿过变化的（弱）引力势而产生或改变。所以今天的偏振谱在某种意义上是早期宇宙更"纯净"的一瞥，不受后来发展的污染。`}</Tx>
        <Box kind="physics" title="量级：为什么偏振只有温度的几个百分点">{R`退耦时 $|\tau'|$ 由复合中的电子数密度决定，而相关的 $k$ 是声学尺度；更精确地，偏振来自最后散射面有限厚度内光子能自由走过的距离（扩散长度）所形成的四极。数值计算给出 $C_{EE}\approx C_{TT}/50$（\figref{10.9}），对应振幅比约 $1/7$。这里的紧耦合公式高估了压低（$k/\tau'$ 在退耦时并不很小，紧耦合正在失效），但正确地给出了相位关系与 $k$ 依赖。`}</Box>
      </Sub>
    </Sec>);
}

export function Sec105() {
  return (
    <Sec n="10.5" title="Polarization power spectra" zh="偏振功率谱"
      gist={R`仿照温度，定义 E 模转移函数 $\mathcal T^E_l=E_l/\mathcal R$，得 $C_{EE}$ 与 $C_{TE}$（\eqref{10.44}、\eqref{10.46}）；标量扰动 $C_{BB}=0$。EE 约为 TT 的 $1/50$、振荡更显著、与 TT 反相、阻尼更弱；TE 在 $30\lesssim l\lesssim200$ 为负，证明扰动起源于视界外；$l<10$ 的再电离凸起 $\propto\tau_{\rm rei}^2$。`}
      why={R`真实宇宙是许多平面波的叠加，振幅随机；能与观测比较的是角功率谱。`}
      gives={["10.43", "10.44", "10.45", "10.46"]}>
      <p className="muted">本节概念：<C id="tight_supp" /> · <C id="te_anti" /> · <C id="reion" /></p>
      <Tx>{R`**从单个平面波到功率谱。**\eqref{10.42} 是单个平面波产生的偏振矩。真实宇宙包含的不止一个平面波，而是许多振幅 $\Theta_P(\boldsymbol k,\hat{\boldsymbol n})$ 各不相同的平面波的叠加。平面波叠加给出的 $E_l$ 角功率谱，与温度各向异性的计算完全相同；于是仿照 \eqref{9.72}，定义`}</Tx>
      <Eq n="10.43" title="E 模转移函数" say={R`把每个模式的 E 模多极矩除以它的原初曲率扰动，得到只依赖 $k$ 与 $l$ 的确定性转移函数；随机性全在 $\mathcal R$ 里。`}>{R`\sym{TE}{\mathcal T}^E_l(k) \equiv \frac{E_l(k)}{\mathcal R(\boldsymbol k)},`}</Eq>
      <Tx>{R`于是偏振功率谱为`}</Tx>
      <Eq n="10.44" keyEq title="E 模角功率谱" say={R`E 模功率谱 = 对所有波数积分"转移函数平方乘原初功率谱"——与温度的 $C(l)$ 公式形式完全相同。`}>{R`C_{EE}(l) = \frac2\pi\int_0^\infty dk\,k^2|\sym{TE}{\mathcal T}^E_l(k)|^2P_{\mathcal R}(k).`}</Eq>
      <Tx>{R`我们还知道，对标量扰动`}</Tx>
      <Eq n="10.45" keyEq title="标量扰动不产生 B 模" say={R`线性标量扰动的 B 模功率谱严格为零——这是 \secref{10.3} 对称性论证的直接推论，也是用 B 模搜寻引力波的基础。`}>{R`C_{BB}(l) = 0`}</Eq>
      <Figure n="10.9" illustration={<PolarSpectraRedraw />} caption={R`原创解析声学模型：TT、EE 与有正有负的 TE。仅演示相位与相对振幅，非基准宇宙学精算谱。`} />
      <Tx>{R`**数值结果（\figref{10.9}）。**图中给出完整数值计算的偏振功率谱 $C_{EE}(l)$，以及作比较的 $C_{TT}(l)$（点线，缩小 50 倍）。正如紧耦合近似所预期：

- EE 的声学振荡**更显著**，并且与 $C_{TT}(l)$ **反相**。两者都因为 $C_{EE}(l)$ 由光子分布的**偶极**决定（回忆紧耦合近似中四极与偶极相关），而 $C_{TT}(l)$ 是单极与偶极的组合，单极占主导——单极与偶极的贡献在 TT 中部分"填平"了彼此的谷，而 EE 只有一个成分。
- 偶极受光子扩散的影响较小，所以偏振功率谱在小尺度上的**阻尼较弱**，这也能从图中看出。

**温度–偏振互相关。**\figref{10.9} 还画出了温度与偏振的互相关，它由温度与 E 模结果组合而得：`}</Tx>
      <Eq n="10.46" keyEq title="温度–E 模互功率谱" say={R`TE 互谱 = 温度转移函数与 E 模转移函数之积对原初功率谱加权积分；两者相位相差约 $90^\circ$，所以 $C_{TE}$ 随 $l$ 正负交替。`}>{R`C_{TE}(l) = \frac2\pi\int_0^\infty dk\,k^2\,\mathcal T_l^*(k)\sym{TE}{\mathcal T}^E_l(k)\,P_{\mathcal R}(k).`}</Eq>
      <Box kind="warning" title={R`勘误：\eqref{10.46} 中的绝对值号`}>{R`原书印作 $C_{TE}(l)=\frac2\pi\int_0^\infty dk\,k^2\left|\mathcal T_l^*(k)\sym{TE}{\mathcal T}^E_l(k)\right|P_{\mathcal R}(k)$；正确为不带绝对值的 $\frac2\pi\int_0^\infty dk\,k^2\,\mathcal T_l^*(k)\sym{TE}{\mathcal T}^E_l(k)\,P_{\mathcal R}(k)$（上式已改；乘积按实部理解，对实的转移函数即直接相乘）。依据：互谱必须保留符号——取绝对值将使 $C_{TE}$ 恒为正，与原书 \figref{10.9} 中正负交替的 TE 曲线以及紧接着讨论的"$l\lesssim200$ 处 $C_{TE}<0$"直接矛盾；与 \eqref{10.44} 的 $|\sym{TE}{\mathcal T}^E_l|^2$ 不同，交叉谱是两个不同量的乘积而非模方。另外，原书在 \eqref{10.46} 之后写"$\Theta^E_l(k)$ 的计算"，应为 $\sym{TE}{\mathcal T}^E_l(k)$（下文已改）。`}</Box>
      <Tx>{R`注意 \eqref{10.44} 与 \eqref{10.46} 在平直天空近似之外依然成立，只是 $\sym{TE}{\mathcal T}^E_l(k)$ 的计算会复杂一些。

**TE 反相关：暴胀的又一证据。**在 $l\lesssim200$ 处看到的 $T$ 与 $E$ 的反相关（$C_{TE}(l)<0$）意义重大：它直接源于初条件是在**视界之外**设定的，因而只激发了声学振荡的余弦模（\eqref{9.26}、\eqref{9.28}）。若正弦模与余弦模都被激发，温度谱或偏振谱中都不会出现一系列相干的峰谷（Dodelson 2003）。当然，声学振荡在温度谱中早已被观测到。但第一个声学峰在 $\ell\sim200$，对应复合时已在视界内的物理尺度。人们也许能构造一个在复合前后产生扰动的可行模型，并小心地让它只产生余弦模。然而 TE 谱中的下凹从 $\ell\sim30$ 就开始了，对应复合时**仍在视界外**的尺度。因此，任何在视界内产生扰动的模型都根本无法解释这些尺度上非零的 $C_{TE}(\ell)$。观测到这一特征，构成了初始扰动起源要早得多的有力证据，而暴胀为此提供了自然的解释。原书所引的 Planck 测量表明这一信号已被精确测得；本站\figref{10.10} 只演示 TE 的声学相位，不含观测点。`}</Tx>
      <Figure n="10.10" illustration={<PolarSpectraRedraw crossOnly />} caption={R`原创 TE 相位教学模型。原书以 Planck 2018 观测及残差检验理论；本图不含观测数据或测量残差。`} />
      <Tx>{R`**偏振打破 $\mathcal A_s$–$\tau_{\rm rei}$ 简并。**$C_{EE}(l)$ 与 $C_{TE}(l)$ 都含有宝贵的宇宙学参数信息。特别地，\secref{9.7.2} 描述的、由再电离后 CMB 光子晚期散射造成的 $\mathcal A_s$–$\tau_{\rm rei}$ 简并，可以被偏振测量打破。回忆 \secref{9.7.2}：在小于再电离时（电子重新开始散射时）视界的尺度上——对应 $l\gtrsim100$——温度各向异性 $\Theta$ 被压低一个因子 $e^{-\tau_{\rm rei}}$，而最大尺度不受影响。在偏振中，这一晚期散射却**产生**各向异性。机制同样是：再电离后的自由电子看到的温度四极，经 Compton 散射转化为偏振辐射。只要把 $\eta_*$ 换成 $\eta_{\rm rei}$、$\eta_0$ 换成 $\eta_0-\eta_{\rm rei}$（$\eta_{\rm rei}$ 是再电离发生时的共形时间），\eqref{10.41} 仍然适用。

**为什么只在大角度。**由于光子在复合与再电离之间自由流动，若 $k$ 在那时已在视界内，即 $k\gg aH(\eta_{\rm rei})$，再电离时的四极 $\Theta_2(k,\eta_{\rm rei})$ 会被压低（自由流把四极的功率转移到很高的 $l$，而大 $l$ 的投影在 $\eta_{\rm rei}$ 附近的局部四极中贡献很小）。因此再电离产生的偏振信号只在非常大的角尺度上显著；它在真实偏振谱中形成 $l<10$ 处的凸起，在 $C_{EE}(l)$ 中更加明显；本站\figref{10.10} 的声学相位模型没有加入此项。$C_{EE}(l)$ 中再电离凸起的振幅正比于 $\tau_{\rm rei}^2$，从而可以独立于温度 $C(l)$ 约束 $\tau_{\rm rei}$。`}</Tx>
      <Box kind="data" title="数字">{R`再电离凸起出现在 $l\lesssim10$，对应再电离时视界在今天天空上的张角；Planck 由低 $l$ 的 EE 测得 $\tau_{\rm rei}\approx0.054\pm0.007$（附录 B 的基准值），它与 $\mathcal A_se^{-2\tau_{\rm rei}}$（温度谱高 $l$ 处测得的组合）一起分别确定 $\mathcal A_s$ 与 $\tau_{\rm rei}$。凸起振幅 $\propto\tau_{\rm rei}^2$：散射概率 $\propto\tau_{\rm rei}$，功率谱再平方。`}</Box>
    </Sec>);
}
