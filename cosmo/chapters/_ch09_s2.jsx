// §9.2 Large-scale anisotropies（式 9.5–9.9）与 §9.3 Acoustic oscillations（式 9.10–9.28，图 9.6–9.7）
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, C } from "@kit";
import { ToyAcousticPlot, RecSpectrumPlot } from "./_ch09_plots.jsx";

const R = String.raw;

export function Sec92() {
  return (
    <Sec n="9.2" title="Large-scale anisotropies" zh="大尺度各向异性"
      gist={R`视界外 $\Theta_0'=-\Phi'$，配合初条件得 $\Theta_0=-\Phi+\mathcal R$；复合在相等之后很久，$\Phi=\frac35\mathcal R$，所以 $\Theta_0+\Psi=-\frac15\mathcal R=-\frac16\delta_{\rm c}$。`}
      why={R`这是最干净的一端：没有压强、没有振荡，只有引力。它给出大角度各向异性的振幅（\secref{9.6.1}），并把 $\delta T/T$ 与 $\delta\rho/\rho$ 联系起来。`}
      gives={["9.5", "9.6", "9.7", "9.8", "9.9"]}>
      <p className="muted">本节概念：<C id="sw" /></p>
      <Tx>{R`**视界外方程。**求光子扰动的大尺度解，用视界外方程 \eqref{8.16}：它直接告诉我们 $\Theta_0=-\Phi$ 加一个常数。初条件（具体是 \eqref{7.91}）为 $\Theta_0(\eta=0)=\Phi(\eta=0)/2$，所以这个常数是 $\frac32\Phi(0)=\mathcal R$，$\mathcal R$ 是暴胀期间确定的守恒曲率扰动。$\Phi$ 的大尺度演化有精确表达式 \eqref{8.31}。复合发生在物质–辐射相等之后很久，可以取该式 $y\gg1$ 的极限，\eqref{8.32} 成立：$\Phi=(3/5)\mathcal R$。因此在复合时，大尺度光子扰动满足`}</Tx>
      <Eq n="9.5" say={R`视界外光子单极 = $\mathcal R$ 减去当时的势；物质期 $\Phi=\frac35\mathcal R$，于是 $\Theta_0=\frac25\mathcal R$：过密区（$\Phi>0$）的光子本征温度更高。`}>{R`\begin{aligned}\Theta_0(\boldsymbol k,\eta_*) &= -\Phi(\boldsymbol k,\eta_*)+\mathcal R(\boldsymbol k)\\ &= \frac25\mathcal R(\boldsymbol k)=\frac23\Phi(\boldsymbol k,\eta_*).\end{aligned}`}</Eq>
      <Tx>{R`可观测的各向异性是 $\Theta_0+\Psi$；由于 $\Psi\simeq-\Phi$，它在很好的近似下等于 $\Theta_0-\Phi$。因此`}</Tx>
      <Eq n="9.6" keyEq title="Sachs–Wolfe 结果" say={R`大尺度上我们看到的温度扰动只有势的 $-1/3$，即原初曲率扰动的 $-1/5$：本征的变热被爬出势阱的红移过度抵消。`}>{R`(\Theta_0+\Psi)(\boldsymbol k,\eta_*) = -\frac13\Phi(\boldsymbol k,\eta_*) = -\frac15\mathcal R(\boldsymbol k).`}</Eq>
      <Tx>{R`\eqref{9.6} 在计算大尺度各向异性谱时会很有用。

**用暗物质密度来表达。**另一种表达复合时大尺度扰动的有用方式是用暗物质密度场。第 7 章推出的初条件为 $\delta_{\rm c}=\mathcal R$。对大尺度演化方程 $\delta_{\rm c}{}'=-3\Phi'$（\eqref{8.17}）积分，得到`}</Tx>
      <Eq n="9.7" say={R`视界外暗物质密度随势的变化而变：$\Phi$ 每下降一份，$\delta_{\rm c}$ 就增加三份。方括号在 $\eta_*\to0$ 时为零，保证初条件。`}>{R`\delta_{\rm c}(\boldsymbol k,\eta_*) = \mathcal R(\boldsymbol k) - 3\left[\Phi(\boldsymbol k,\eta_*) - \frac23\mathcal R(\boldsymbol k)\right],`}</Eq>
      <Tx>{R`其中若令 $\eta_*\to0$，方括号中的因子化为零（因为 $\Phi(0)=\frac23\mathcal R$），保证了正确的初条件。于是`}</Tx>
      <Eq n="9.8" say={R`复合时（物质期）视界外暗物质过密度是势的两倍：$\delta_{\rm c}=\frac65\mathcal R=2\Phi$。`}>{R`\delta_{\rm c}(\boldsymbol k,\eta_*) = \frac65\mathcal R(\boldsymbol k) = 2\Phi(\boldsymbol k,\eta_*).`}</Eq>
      <Tx>{R`所以用暗物质过密度表示，观测到的各向异性为`}</Tx>
      <Eq n="9.9" keyEq title="温度涨落与密度涨落" say={R`大尺度上观测到的温度涨落是暗物质过密度的 $-1/6$：$\delta T/T\sim10^{-5}$ 对应 $\delta\rho/\rho\sim6\times10^{-5}$，且过密区显得更冷。`}>{R`(\Theta_0+\Psi)(\boldsymbol k,\eta_*) = -\frac16\delta_{\rm c}(\boldsymbol k,\eta_*).`}</Eq>
      <Derivation title={R`\eqref{9.5}–\eqref{9.9} 的一行核对`} collapsed steps={[
        { tex: R`\Theta_0=\mathcal R-\tfrac35\mathcal R=\tfrac25\mathcal R,\qquad \Theta_0+\Psi=\tfrac25\mathcal R-\tfrac35\mathcal R=-\tfrac15\mathcal R`, why: R`用 $\Phi=\frac35\mathcal R$、$\Psi=-\Phi$。` },
        { tex: R`\delta_{\rm c}=\mathcal R-3\big(\tfrac35-\tfrac23\big)\mathcal R=\mathcal R+\tfrac15\mathcal R=\tfrac65\mathcal R`, why: R`代入 \eqref{9.7}。` },
        { tex: R`\frac{\Theta_0+\Psi}{\delta_{\rm c}}=\frac{-1/5}{6/5}=-\frac16`, why: R`即 \eqref{9.9}。` },
      ]} />
      <Tx>{R`**令人意外的符号。**这个关系包含一条有趣的信息：过密区观测到的温度扰动竟然是**负的**。大尺度过密区在复合时确实含有比欠密区更热的光子，即 $\Psi<0$ 时 $\Theta_0>0$。但光子要到达我们，必须爬出势阱；在此过程中损失的能量超过了它们初始比平均更热的那部分，所以 $\Psi<0$ 时 $\Theta_0+\Psi$ 为负。总之，**今天在 CMB 上看到的大尺度热斑，其实是复合时的欠密区**。

**因子 6。**\eqref{9.9} 的另一个重要特征是系数 $1/6$。它把"$\delta T/T$"（左边）与"$\delta\rho/\rho$"（右边）联系起来：粗略地说，$10^{-5}$ 量级的各向异性对应 $6\times10^{-5}$ 的过密度。正如上一章末尾所说，任何可行的宇宙学模型都必须回答：观测到的 CMB 各向异性，与到今天形成观测结构所需的物质密度扰动是否一致？这个因子 6 对此至关重要。`}</Tx>
      <Box kind="physics" title="为什么初条件常数正好是 𝓡">
        <Tx>{R`辐射期视界外 $\Phi(0)=\frac23\mathcal R$（\secref{7.5}，暂不计中微子各向异性应力），绝热初条件 $\Theta_0(0)=\Phi(0)/2=\frac13\mathcal R$，所以守恒量 $\Theta_0+\Phi=\frac13\mathcal R+\frac23\mathcal R=\mathcal R$。这个"守恒的 $\Theta_0+\Phi$"在 \secref{9.3} 会再次出现：紧耦合方程 \eqref{9.22} 正是关于 $\Theta_0+\Phi$ 的，视界外极限下其右边可以忽略，于是 $\Theta_0+\Phi$ 不变。本页数值解（含中微子）验证：$k=10^{-5}\,\mathrm{Mpc^{-1}}$ 时复合后 $\Theta_0+\Psi$ 加上 ISW 项的值为 $-0.202\,\mathcal R$。`}</Tx>
      </Box>
    </Sec>);
}

export function Sec93() {
  return (
    <Sec n="9.3" title="Acoustic oscillations" zh="声学振荡"
      gist={R`紧耦合（$\tau'\to\infty$）下高阶矩被 $k/\tau'$ 压低，光子只剩单极与偶极；把重子速度展开到 $1/\tau'$ 一阶并消元，得到 $\Theta_0+\Phi$ 的受迫、带拖曳振子方程 \eqref{9.22}，声速 $c_s=1/\sqrt{3(1+R)}$。忽略拖曳后用 Green 函数解出 \eqref{9.26}：只有余弦模，峰在 $kr_s=n\pi$；偶极 \eqref{9.28} 与之反相。`}
      why={R`复合时进入视界的模式受压强支配，\secref{9.2} 的视界外近似失效。这一节给出复合时光子单极与偶极的半解析解——它们是 \eqref{9.59} 的输入。`}
      gives={["9.10", "9.11", "9.12", "9.13", "9.14", "9.15", "9.16", "9.17", "9.18", "9.19", "9.20", "9.21", "9.22", "9.23", "9.24", "9.25", "9.26", "9.27", "9.28"]}>
      <p className="muted">本节概念：<C id="tight" /> · <C id="oscillator" /> · <C id="soundhorizon" /></p>
      <Tx>{R`电子与原子核结合成原子之前，也就是 $\eta_*$ 之前，光子的平均自由程远小于视界。Compton 散射把电子–质子流体与光子紧紧耦合在一起。现在用 Boltzmann 方程定量地研究这一区间。`}</Tx>

      <Sub n="9.3.1" title="Tightly-coupled limit of the Boltzmann equations" zh="Boltzmann 方程的紧耦合极限">
        <Tx>{R`**目标：证明只剩两个矩。**当光子的平均自由程远小于所关心的尺度时，紧耦合极限成立；本质上等价于 $\tau\gg1$。我们要论证：在 $\tau\gg1$ 极限下，唯一不可忽略的矩 $\Theta_l$ 是单极（$l=0$）与偶极（$l=1$），其余都被压低。在这个意义上，光子的行为与流体完全一样，只需两个变量描述：密度 $\rho$ 与（纵向）速度 $u$。

为证明这一点，回到光子的 Boltzmann 方程 \eqref{5.67}。我们要把这个关于 $\Theta(k,\eta,\mu)$ 的微分方程，变成关于 $\Theta_l(k,\eta)$ 的无穷多个耦合方程。办法是乘以 $\mathcal P_l(\mu)$ 再对 $\mu$ 积分。利用 \eqref{5.66}，$l>2$ 时 Boltzmann 方程化为`}</Tx>
        <Eq n="9.10" say={R`第 $l$ 阶矩的方程：时间变化 + 自由流（把 $\mu\Theta$ 投影到第 $l$ 阶）= 散射把该阶矩抹去的速率 $\tau'\Theta_l$。`}>{R`\Theta_l' + \frac{k}{(-i)^{l+1}}\int_{-1}^1\frac{d\mu}{2}\mu\mathcal P_l(\mu)\Theta(\mu) = \tau'\Theta_l \qquad (l>2).`}</Eq>
        <Tx>{R`注意 Boltzmann 方程中所有其他项（如 $-\Phi'$）都只按 $\mu^0$、$\mu^1$ 或 $\mu^2$ 变化，所以与 $l>2$ 的 $\mathcal P_l$ 相乘积分后都消失。第二项的积分用 Legendre 多项式的递推关系 \eqref{C.3} 来做，得到`}</Tx>
        <Eq n="9.11" title="Boltzmann 矩层级" say={R`矩层级：第 $l$ 阶矩由相邻的 $l\pm1$ 阶通过自由流（$\propto k$）驱动，同时被散射（$\tau'$）阻尼。`}>{R`\Theta_l' - \frac{kl}{2l+1}\Theta_{l-1} + \frac{k(l+1)}{2l+1}\Theta_{l+1} = \tau'\Theta_l.`}</Eq>
        <Derivation title={R`从 \eqref{5.67} 经 \eqref{9.10} 到 \eqref{9.11}`} collapsed steps={[
          { tex: R`\int_{-1}^1\frac{d\mu}{2}\mathcal P_l(\mu)\Theta(\mu)=(-i)^l\Theta_l`, why: R`\eqref{5.66} 的定义。` },
          { tex: R`\frac{i k}{(-i)^l}\int\frac{d\mu}2\mu\mathcal P_l\Theta=\frac{k}{(-i)^{l+1}}\int\frac{d\mu}2\mu\mathcal P_l\Theta`, why: R`自由流项 $ik\mu\Theta$ 乘以 $\mathcal P_l/(-i)^l$ 积分；$i=1/(-i)$。散射项中只有 $+\tau'\Theta$ 对 $l>2$ 有贡献，给出 $\tau'\Theta_l$：即 \eqref{9.10}。` },
          { tex: R`(2l+1)\mu\mathcal P_l=(l+1)\mathcal P_{l+1}+l\mathcal P_{l-1}`, why: R`递推关系 \eqref{C.3}。` },
          { tex: R`\int\frac{d\mu}2\mu\mathcal P_l\Theta=\frac{(l+1)(-i)^{l+1}\Theta_{l+1}+l(-i)^{l-1}\Theta_{l-1}}{2l+1}`, why: R`代入并用第一步。` },
          { tex: R`\frac{k}{(-i)^{l+1}}\times(\cdots)=\frac{k(l+1)}{2l+1}\Theta_{l+1}+\frac{kl}{2l+1}(-i)^{-2}\Theta_{l-1}=\frac{k(l+1)}{2l+1}\Theta_{l+1}-\frac{kl}{2l+1}\Theta_{l-1}`, why: R`$(-i)^{-2}=-1$，即得 \eqref{9.11}。` },
        ]} />
        <Tx>{R`**量级估计。**考虑 \eqref{9.11} 中各项的量级。左边第一项的量级为 $\Theta_l/\eta$，远小于右边被因子 $\tau'$ 放大的那一项。暂时忽略 $\Theta_{l+1}$ 项，这告诉我们在紧耦合区`}</Tx>
        <Eq n="9.12" say={R`紧耦合下每高一阶的矩都被压低一个因子 $k/\tau'=k\lambda_{\rm MFP}$：长波扰动看不到四极以上的各向异性。`}>{R`\Theta_l \sim -\frac{k}{\tau'}\frac{l}{2l+1}\Theta_{l-1}.`}</Eq>
        <Tx>{R`回忆平均自由程 $\lambda_{\rm MFP}=-1/\tau'$，前置因子就是 $k\lambda_{\rm MFP}$。因此对所有波长远大于平均自由程的模式，$\Theta_l\ll\Theta_{l-1}$。这也说明了刚才扔掉 $\Theta_{l+1}$ 项是合理的：$\Theta_{l+1}$ 与 $\Theta_l$ 之间有类似的关系。容易验证，若忽略偏振的多极矩，$\Theta_2$ 同样被压低；下一章会看到这种压低也适用于偏振。总之，所有 $l>1$ 的矩都远小于单极和偶极。

**为什么高阶矩被阻尼：物理图像。**在利用这一事实、推导只保留单极与偶极（流体近似）的紧耦合方程之前，我们想理解**为什么**紧耦合环境中高阶矩被阻尼。这一观察极其重要，不仅在宇宙学中，而且在所有使用流体近似的场合。考虑 \figref{9.6} 所示的平面波扰动。坐在扰动中心的观测者看到的光子来自约一个平均自由程 $-1/\tau'$ 的距离。对大尺度扰动（$k/|\tau'|\ll1$，如图所示）来说，光子来源区域内温度几乎不变，所以诱导出的各向异性极小。对波长极短（$k/|\tau'|\sim1$）的扰动这就不成立了——但事实上，这些模式的波长远小于阻尼尺度，已经被光子扩散强烈阻尼。`}</Tx>
        <Figure n="9.6" width="75%" caption={R`紧耦合时期的各向异性：扰动尺度远大于光子平均自由程 $1/|\tau'|$。观测者（圆点）测到的光子来自 $1/|\tau'|$ 以内，远小于模式的波长。因此她看到来自各个方向的光子温度几乎完全相同；更准确地说，她测到一个单极和一个很小的偶极，更高阶的矩都可忽略。`} />
        <Tx>{R`**单极与偶极方程。**有了这些认识，转向前两个矩的方程。扔掉 $\Theta_2$ 后它们为`}</Tx>
        <Eq n="9.13" title="单极（连续性）方程" say={R`光子单极（密度）的变化 = 偶极（速度）的散度 + 空间曲率扰动随时间变化带来的"拉伸"。`}>{R`\Theta_0' + k\Theta_1 = -\Phi',`}</Eq>
        <Eq n="9.14" title="偶极（Euler）方程" say={R`光子偶极（动量）由压强梯度 $k\Theta_0/3$ 与引力 $k\Psi/3$ 驱动，并通过散射项被拖向重子速度。`}>{R`\Theta_1' - \frac{k\Theta_0}{3} = \frac{k\Psi}{3} + \tau'\left[\Theta_1 - \frac{iu_{\rm b}}{3}\right].`}</Eq>
        <Tx>{R`它们由 \eqref{5.67} 乘以 $\mathcal P_0(\mu)$ 与 $\mathcal P_1(\mu)$ 再对 $\mu$ 积分得到，还需补充电子–重子流体的方程 \eqref{5.71} 与 \eqref{5.72}。先把速度方程 \eqref{5.72} 改写为`}</Tx>
        <Eq n="9.15" say={R`重子速度 = 光子"携带"的速度 $-3i\Theta_1$，加上一个被 $R/\tau'$ 压低的修正——重子自身惯性与引力造成的偏离。`}>{R`u_{\rm b} = -3i\Theta_1 + \frac{R}{\tau'}\left[u_{\rm b}{}' + \frac{a'}{a}u_{\rm b} + ik\Psi\right],`}</Eq>
        <Tx>{R`其中，回忆一下，重子–光子能量比 $R=R(\eta)$ 定义为`}</Tx>
        <Eq n="9.16" say={R`$R$ 衡量重子给光子流体增加的惯性：重子的 $\rho$ 与光子的 $\rho+P=\frac43\rho_\gamma$ 之比；$R\propto a$，复合时约 0.6。`}>{R`R \equiv \frac{3\rho_{\rm b}}{4\rho_\gamma}.`}</Eq>
        <Tx>{R`**按 $1/\tau'$ 展开。**\eqref{9.15} 右边第二项远小于第一项：其中各部分相对被压低了 $1/(\tau'\eta)$ 与 $k/\tau'$ 量级的因子。所以最低阶 $u_{\rm b}=-3i\Theta_1$。系统的展开方法是：在第二项中处处使用这个最低阶表达式，得到`}</Tx>
        <Eq n="9.17" say={R`重子速度到 $1/\tau'$ 一阶：把最低阶 $u_{\rm b}=-3i\Theta_1$ 代入修正项。`}>{R`u_{\rm b} \simeq -3i\Theta_1 + \frac{R}{\tau'}\left[-3i\Theta_1' - 3i\frac{a'}{a}\Theta_1 + ik\Psi\right].`}</Eq>
        <Tx>{R`现在把这个表达式代入 \eqref{9.14}，消去 $u_{\rm b}$。整理后得到`}</Tx>
        <Eq n="9.18" title="紧耦合偶极方程" say={R`光子–重子流体的 Euler 方程：重子把惯性提高到 $1+R$，压强梯度项被 $1/(1+R)$ 削弱，并出现膨胀拖曳项 $\frac{a'}{a}\frac{R}{1+R}\Theta_1$。`}>{R`\Theta_1' + \frac{a'}{a}\frac{R}{1+R}\Theta_1 - \frac13\frac{k}{1+R}\Theta_0 = \frac{k\Psi}{3}.`}</Eq>
        <Derivation title={R`\eqref{9.17} 代入 \eqref{9.14} ⇒ \eqref{9.18}`} collapsed steps={[
          { tex: R`\Theta_1-\frac{iu_{\rm b}}3=\Theta_1-\Theta_1-\frac{R}{\tau'}\Big[\Theta_1'+\frac{a'}a\Theta_1-\frac{k\Psi}3\Big]`, why: R`$-\frac i3(-3i\Theta_1)=-\Theta_1$；$-\frac i3\cdot\frac{R}{\tau'}[-3i\Theta_1'-3i\frac{a'}a\Theta_1+ik\Psi]=-\frac R{\tau'}[\Theta_1'+\frac{a'}a\Theta_1-\frac{k\Psi}3]$。最低阶相消——这正是紧耦合的含义。` },
          { tex: R`\Theta_1'-\frac{k\Theta_0}3=\frac{k\Psi}3-R\Big[\Theta_1'+\frac{a'}a\Theta_1-\frac{k\Psi}3\Big]`, why: R`乘以 $\tau'$：大因子 $\tau'$ 与小因子 $1/\tau'$ 抵消，留下有限的 $R$ 项。` },
          { tex: R`(1+R)\Theta_1'+R\frac{a'}a\Theta_1-\frac{k\Theta_0}3=(1+R)\frac{k\Psi}3`, why: R`移项。除以 $1+R$ 即 \eqref{9.18}。` },
        ]} />
        <Tx>{R`**化为一个二阶方程。**现在有了关于前两个光子矩的两个一阶耦合方程 \eqref{9.13} 与 \eqref{9.18}。把 \eqref{9.13} 求导、用 \eqref{9.18} 消去 $\Theta_1'$，可以化成一个二阶方程：`}</Tx>
        <Eq n="9.19" say={R`单极的二阶方程（中间形式）：仍含偶极 $\Theta_1$，来自拖曳项。`}>{R`\Theta_0'' + \frac{k^2}{3}\Psi - \frac{a'}{a}\frac{R}{1+R}k\Theta_1 + \frac13\frac{k^2}{1+R}\Theta_0 = -\Phi''.`}</Eq>
        <Tx>{R`最后再用 \eqref{9.13}（$k\Theta_1=-\Theta_0'-\Phi'$）消去这里的 $\Theta_1$，剩下`}</Tx>
        <Eq n="9.20" keyEq title="受迫、带拖曳的振子" say={R`光子–重子流体的单极是一个带拖曳、受迫的谐振子：频率 $kc_s$ 来自压强，拖曳来自重子随膨胀的惯性变化，外力 $F$ 由引力势构成。`}>{R`\begin{aligned}&\Theta_0'' + \frac{a'}{a}\frac{R}{1+R}\Theta_0' + k^2c_s^2\Theta_0 = F(k,\eta),\\ &F(k,\eta) \equiv -\frac{k^2}{3}\Psi - \frac{a'}{a}\frac{R}{1+R}\Phi' - \Phi'',\end{aligned}`}</Eq>
        <Tx>{R`这里把右边的驱动函数定义为 $F$，并定义流体的声速`}</Tx>
        <Eq n="9.21" keyEq title="声速" say={R`光子–重子流体的声速：纯辐射为 $1/\sqrt3$，重子增加惯性但不增加压强，使声速降低。`}>{R`c_s(\eta) \equiv \sqrt{\frac{1}{3(1+R[\eta])}}.`}</Eq>
        <Tx>{R`**解读。**声速依赖于宇宙中的重子密度。若重子密度相对辐射可忽略，$c_s$ 取相对论流体的标准值 $1/\sqrt3$。重子使流体变"重"，从而降低声速——这类似于受迫谐振子 \eqref{9.2} 中 $(K/m)x$ 项里的质量倒数。马上会看到，流体在空间和时间上都振荡，周期由声速、从而由重子密度决定。注意 \eqref{9.20} 是 \eqref{9.1} 的"长大成人版"：区别只在于 $\Theta_0'$ 拖曳项（见 \exref{9.2}）和正确的、随时间变化的外力项。拖曳项的出现不改变 \secref{9.1} 中的任何定性结论。

**一个更对称的写法。**最后注意，$\Phi$ 在右边出现的方式与 $\Theta_0$ 在左边出现的方式非常相似。\eqref{9.20} 的另一种写法利用了这一点：`}</Tx>
        <Eq n="9.22" keyEq title={R`$\Theta_0+\Phi$ 的振子方程`} say={R`把势并入左边：$\Theta_0+\Phi$ 是"弹簧上的砝码"，外力只剩 $\frac{k^2}3[\Phi/(1+R)-\Psi]$；拖曳系数 $R'/(1+R)$ 就是重子负载随时间的增长率。`}>{R`\left\{\frac{d^2}{d\eta^2} + \frac{R'}{1+R}\frac{d}{d\eta} + k^2c_s^2\right\}[\Theta_0+\Phi](\boldsymbol k,\eta) = \frac{k^2}{3}\left[\frac{1}{1+R}\Phi - \Psi\right](\boldsymbol k,\eta).`}</Eq>
        <Derivation title={R`\eqref{9.20} ⇒ \eqref{9.22}`} collapsed steps={[
          { tex: R`R\propto a\ \Rightarrow\ \frac{R'}{1+R}=\frac{a'}{a}\frac{R}{1+R}`, why: R`$\rho_{\rm b}\propto a^{-3}$、$\rho_\gamma\propto a^{-4}$。` },
          { tex: R`(\Theta_0+\Phi)''+\frac{R'}{1+R}(\Theta_0+\Phi)'+k^2c_s^2(\Theta_0+\Phi)=F+\Phi''+\frac{R'}{1+R}\Phi'+k^2c_s^2\Phi`, why: R`两边同加 $\Phi$ 的对应项。` },
          { tex: R`=-\frac{k^2}3\Psi+\frac{k^2}{3(1+R)}\Phi`, why: R`代入 $F$ 的定义，$\Phi''$ 与 $\Phi'$ 项相消，$k^2c_s^2=k^2/[3(1+R)]$。` },
        ]} />
        <Box kind="warning" title={R`$\Theta_0+\Phi$ 不是可观测量`}>
          <Tx>{R`紧耦合语境中方便的组合 $\Theta_0+\Phi$，**不是**给出观测 CMB 温度的组合 $\Theta_0+\Psi\simeq\Theta_0-\Phi$。二者相差 $2\Phi$；在势已衰减的小尺度上差别很小，在大尺度和第一峰附近则很重要。`}</Tx>
        </Box>
      </Sub>

      <Sub n="9.3.2" title="Tightly-coupled solutions" zh="紧耦合解">
        <Tx>{R`**策略：Green 函数。**支配光子–重子流体声学振荡的方程 \eqref{9.22} 是一个二阶常微分方程。我们再次（如同 \secref{8.3.1}）用 Green 函数方法求完整解：先求齐次方程的两个解，再用它们构造特解。

**齐次解：忽略拖曳。**原则上，求齐次解要解右边为零的阻尼谐振子方程 \eqref{9.22}。实际上拖曳项的量级为 $R(\Theta_0+\Phi)/\eta^2$，而压强项大得多，量级为 $k^2c_s^2(\Theta_0+\Phi)$（更准确地说，当模式在视界内或 $R$ 很小时它更大）。物理上，压强驱动的振荡时间尺度远小于拖曳起作用的膨胀时间。所以作为第一近似，忽略拖曳项，只求振荡解；用 WKB 近似可以修正这一点（\exref{9.5}）。在这个极限下两个齐次解为`}</Tx>
        <Eq n="9.23" say={R`忽略拖曳后的两个齐次解：以声视界为"时钟"的正弦与余弦。`}>{R`S_1(k,\eta) = \sin[kr_s(\eta)];\qquad S_2(k,\eta) = \cos[kr_s(\eta)]`}</Eq>
        <Tx>{R`其中定义了**声视界**（sound horizon）`}</Tx>
        <Eq n="9.24" keyEq title="声视界" say={R`声视界：声波从大爆炸到 $\eta$ 走过的共动距离；振荡相位就是 $kr_s$。`}>{R`r_s(\eta) \equiv \int_0^\eta d\tilde\eta\,c_s(\tilde\eta).`}</Eq>
        <Tx>{R`既然 $c_s$ 是声速，声视界就是声波到 $\eta$ 时刻为止走过的共动距离。（基准宇宙学中 $r_s(\eta_*)\approx144\,\mathrm{Mpc}$，而 $\eta_*/\sqrt3\approx162\,\mathrm{Mpc}$：重子使声波走得更慢。）

**完整解。**紧耦合下的光子温度解可以由 \eqref{9.23} 的齐次解构造：`}</Tx>
        <Eq n="9.25" say={R`Green 函数解：两个齐次解的组合，加上外力 $\frac{k^2}3(\Phi-\Psi)$ 对 Green 函数（分子为两解的交叉差、分母为 Wronski 行列式）的积分。`}>{R`\begin{aligned}\Theta_0(\boldsymbol k,\eta)+\Phi(\boldsymbol k,\eta) &= C_1(\boldsymbol k)S_1(\eta) + C_2(\boldsymbol k)S_2(\eta)\\ &\quad+ \frac{k^2}{3}\int_0^\eta d\tilde\eta\,[\Phi(\boldsymbol k,\tilde\eta) - \Psi(\boldsymbol k,\tilde\eta)]\,\frac{S_1(\tilde\eta)S_2(\eta) - S_1(\eta)S_2(\tilde\eta)}{S_1(\tilde\eta)S_2'(\tilde\eta) - S_1'(\tilde\eta)S_2(\eta)}.\end{aligned}`}</Eq>
        <Box kind="warning" title="疑似勘误：(9.25) 的分母">
          <Tx>{R`原书分母最后一个因子印作 $S_2(\eta)$。Green 函数的分母是在积分变量处取值的 Wronski 行列式 $W(\tilde\eta)=S_1(\tilde\eta)S_2'(\tilde\eta)-S_1'(\tilde\eta)S_2(\tilde\eta)$，应为 $S_2(\tilde\eta)$；正文随后说"分母化为 $-kc_s(\tilde\eta)$"也只有这样才成立（$W=-kc_s[\sin^2+\cos^2]$）。上式按原书转写。`}</Tx>
        </Box>
        <Tx>{R`这里我们又一次丢掉了 $R$ 的所有出现，只保留快速变化的正弦和余弦宗量中的 $R$。也就是说，例如 $S_1$ 的宗量仍取为含非零 $R$ 的 $kr_s$。（右边的外力也因此由 $\frac{k^2}3[\frac\Phi{1+R}-\Psi]$ 近似为 $\frac{k^2}3[\Phi-\Psi]$。）

**定常数。**$C_1$、$C_2$ 由匹配初条件确定：初始时 $\Theta_0$ 与 $\Phi$ 都是常数。由于初始 $\Theta_0'$ 与 $\Phi'$ 为零，正弦项的系数 $C_1$ 必须为零；于是 $C_2(\boldsymbol k)=\Theta_0(\boldsymbol k,0)+\Phi(\boldsymbol k,0)$。在我们所取的极限下，被积函数的分母化为 $-kc_s(\tilde\eta)\to-k/\sqrt3$。最后，分子中两乘积之差就是 $-\sin[k(r_s-r'_s)]$（$r'_s\equiv r_s(\tilde\eta)$），所以`}</Tx>
        <Eq n="9.26" keyEq title="紧耦合单极解（Hu–Sugiyama）" say={R`复合前的单极 = 初值以余弦方式振荡 + 引力势 $\Phi-\Psi$ 在过去各时刻"踢"出的声波之和（每一脚之后都以 $\sin[k\Delta r_s]$ 传播）。`}>{R`\begin{aligned}\Theta_0(\boldsymbol k,\eta)+\Phi(\boldsymbol k,\eta) &= [\Theta_0(\boldsymbol k,0)+\Phi(\boldsymbol k,0)]\cos(kr_s)\\ &\quad+ \frac{k}{\sqrt3}\int_0^\eta d\tilde\eta\,[\Phi(\boldsymbol k,\tilde\eta) - \Psi(\boldsymbol k,\tilde\eta)]\sin[k(r_s(\eta) - r_s(\tilde\eta))].\end{aligned}`}</Eq>
        <Derivation title={R`\eqref{9.25} ⇒ \eqref{9.26} 的三角恒等式`} collapsed steps={[
          { tex: R`S_1(\tilde\eta)S_2(\eta)-S_1(\eta)S_2(\tilde\eta)=\sin(kr'_s)\cos(kr_s)-\sin(kr_s)\cos(kr'_s)=-\sin[k(r_s-r'_s)]`, why: R`$\sin(A-B)$ 公式。` },
          { tex: R`W(\tilde\eta)=\sin(kr'_s)\big[-kc_s\sin(kr'_s)\big]-kc_s\cos(kr'_s)\cos(kr'_s)=-kc_s(\tilde\eta)`, why: R`$\frac{d}{d\eta}\sin(kr_s)=kc_s\cos(kr_s)$，$\frac{d}{d\eta}\cos(kr_s)=-kc_s\sin(kr_s)$。` },
          { tex: R`\frac{k^2}3\cdot\frac{-\sin[k(r_s-r'_s)]}{-k/\sqrt3}=\frac{k}{\sqrt3}\sin[k(r_s-r'_s)]`, why: R`取 $c_s\to1/\sqrt3$（与丢掉 $R$ 的近似一致）。` },
        ]} />
        <Tx>{R`**只有余弦模。**\eqref{9.26} 是紧耦合极限下各向异性的表达式，最先由 Hu 与 Sugiyama（1995）推出。它显示了暴胀初条件的特征——只激发**余弦模**。这直接来自这样一个事实：扰动是在暴胀期间离开视界时产生的，此后在视界外保持不变。纯余弦的初条件导致 $\Theta+\Phi$ 中的**相干振荡**。另一些在模式进入视界时才产生扰动的方案，通常会预言正弦与余弦模都存在；那样的话，$\Theta_0$ 中就不会有清晰的峰谷结构。

**峰位。**事实上 \eqref{9.26} 能准确预言完整数值解得到的峰位，即 \figref{9.2} 中 $\eta=\eta_*$ 时 $\Theta_0+\Phi$ 作为 $k$ 的函数的极值。要精确计算 \eqref{9.26}，需要对第二项中的 $(\Phi-\Psi)(\boldsymbol k,\tilde\eta)$ 做数值积分（\exref{9.6}）。这里再简化一步：在第一项主导的极限下，峰应出现在 $\cos(kr_s)$ 的极值处，即`}</Tx>
        <Eq n="9.27" keyEq title="声学峰的位置" say={R`复合时声波恰好振荡了半周期的整数倍的模式成为峰：$k_{\rm pk}r_s=n\pi$。`}>{R`k_{\rm pk} = n\pi/r_s \qquad n=1,2,\dots`}</Eq>
        <Tx>{R`这些粗略峰位标在 \figref{9.7} 中。预言的 $k_{\rm pk}$ 与完整数值结果相差在 10% 以内。（本页数值解：前三个峰在 $k_{\rm pk}r_s/\pi=0.88,\,1.82,\,2.88$。第一峰偏低最多，因为第一峰尺度上势的衰减最显著，外力项给余弦加上了相移。）`}</Tx>
        <ToyAcousticPlot />
        <Tx>{R`**偶极。**除单极之外，复合时光子分布还有不可忽略的偶极。利用 \eqref{9.13}，把 \eqref{9.26} 求导即得偶极的解析解：`}</Tx>
        <Eq n="9.28" title="紧耦合偶极解" say={R`偶极（流体速度）按 $\sin(kr_s)$ 振荡，与单极的 $\cos(kr_s)$ 相差四分之一周期——就像振子的速度与位移。`}>{R`\begin{aligned}\Theta_1(\boldsymbol k,\eta) &= \frac{1}{\sqrt3}[\Theta_0(\boldsymbol k,0)+\Phi(\boldsymbol k,0)]\sin(kr_s)\\ &\quad- \frac{k}{3}\int_0^\eta d\tilde\eta\,[\Phi(\boldsymbol k,\tilde\eta) - \Psi(\boldsymbol k,\tilde\eta)]\cos[k(r_s(\eta) - r_s(\tilde\eta))].\end{aligned}`}</Eq>
        <Derivation title={R`\eqref{9.26} ⇒ \eqref{9.28}`} collapsed steps={[
          { tex: R`\Theta_1=-\frac1k(\Theta_0'+\Phi')=-\frac1k\frac{d}{d\eta}(\Theta_0+\Phi)`, why: R`\eqref{9.13}。` },
          { tex: R`\frac{d}{d\eta}\cos(kr_s)=-kc_s\sin(kr_s)\to-\frac{k}{\sqrt3}\sin(kr_s)`, why: R`第一项给出 $\frac1{\sqrt3}[\cdots]\sin(kr_s)$。` },
          { tex: R`\frac{d}{d\eta}\int_0^\eta d\tilde\eta\,(\Phi-\Psi)\sin[k(r_s-r'_s)]=0+\int_0^\eta d\tilde\eta\,(\Phi-\Psi)\,kc_s\cos[k(r_s-r'_s)]`, why: R`上限处的边界项含 $\sin0=0$。乘以 $-\frac1k\cdot\frac{k}{\sqrt3}$ 并取 $c_s\to1/\sqrt3$，得 $-\frac k3\int(\Phi-\Psi)\cos[\cdots]$。` },
        ]} />
        <Tx>{R`第一项与单极**完全反相**（$\sin(kr_s)$ 对 $\cos(kr_s)$）。\figref{9.7} 显示，即使计入积分项，这一特征依然存在。这种相位错开将对最终的各向异性谱产生重要影响（\secref{9.6.2}）。`}</Tx>
        <Figure n="9.7" interactive={<RecSpectrumPlot dipole />}
          caption={R`基准协调宇宙学中复合时的单极 $\Theta_0+\Psi$ 与偶极 $3\Theta_1$。竖虚线为 \eqref{9.27} 的粗略解析峰位。偶极与单极完全反相，并且对复合时尚未进入视界的最长波模式为零。**交互版**：本页简化 Boltzmann 解；竖线 $n\pi\eta_0/r_s$ 用同一模型的 $r_s(\eta_*)\approx144\,\mathrm{Mpc}$、$\eta_0\approx1.42\times10^4\,\mathrm{Mpc}$ 计算，第一条在 $k\eta_0\approx309$。原书图中竖线约在 457、910、1367，比 $\pi\eta_0/r_s$ 大约 $1/h$ 倍——与 \figref{9.2} 一样，横轴疑为 $k$ 以 $h\,\mathrm{Mpc^{-1}}$ 计、$\eta_0$ 以 $\mathrm{Mpc}$ 计的混合单位。`} />
      </Sub>
    </Sec>);
}
