// §6.3 The Einstein equations for scalar perturbations —— 式 (6.20)–(6.48)
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { Gm, dK } from "./_ch06_notation.jsx";

const R = String.raw;

export function Sec63() {
  return (
    <Sec n="6.3" title="The Einstein equations for scalar perturbations" zh="标量扰动的 Einstein 方程"
      gist={R`在共形牛顿规范中依次算出 Ricci 张量 $R_{00}$、$R_{ij}$ 与 Ricci 标量的一阶部分 $\delta R$；取 Einstein 方程的**时–时分量**得到相对论 Poisson 方程 \eqref{6.41}，取**纵向无迹的空–空分量**得到 $k^2(\Phi+\Psi)=-32\pi Ga^2[\rho_\gamma\Theta_2+\rho_\nu\mathcal N_2]$ \eqref{6.48}。`}
      why={R`两个未知势 $\Phi$、$\Psi$ 需要两个独立方程；Einstein 方程 10 个分量中，对标量扰动只有两个是独立且有用的。选对分量（并用投影算符去掉一大堆迹项）能让代数最省力。`}
      gives={["6.20", "6.26", "6.27", "6.28", "6.30", "6.31", "6.32", "6.34", "6.35", "6.38", "6.40", "6.41", "6.44", "6.46", "6.47", "6.48"]}>
      <p className="muted">本节概念：<C id="poisson" /> · <C id="aniso" /> · <C id="constraint" /> · <C id="decomp_thm" /></p>
      <Tx>{R`**出发点。**现在开始计算扰动的线性阶 Einstein 方程。先专注于标量扰动，并继续在共形牛顿规范中工作，所以出发点是`}</Tx>
      <Eq n="6.20" keyEq title="共形牛顿规范的度规" say="只含两个标量势的扰动度规：$\Psi$ 改变时间流逝（牛顿势），$\Phi$ 改变局域的空间尺度。§6.2 已说明这一选择不失一般性。">{R`\begin{aligned}g_{00}(\boldsymbol x,t) &= -1-2\Psi(\boldsymbol x,t),\\ g_{0i}(\boldsymbol x,t) &= 0,\\ g_{ij}(\boldsymbol x,t) &= a^2(t)\delta_{ij}[1+2\Phi(\boldsymbol x,t)].\end{aligned}`}</Eq>
      <Tx>{R`计算 Einstein 方程 \eqref{3.1} 的左边需要三步：

1. 对扰动度规 \eqref{6.20} 计算 Christoffel 符号 $\Gamma^\mu{}_{\alpha\beta}$——§3.3.1 已经做过（\eqref{3.55}–\eqref{3.56}）；
2. 用 \eqref{3.3} 由它们构造 Ricci 张量 $R_{\mu\nu}$；
3. 缩并 Ricci 张量得到 Ricci 标量 $R\equiv g^{\mu\nu}R_{\mu\nu}$。

我们也会立刻转到 Fourier 空间，把空间导数换成 $i\boldsymbol k$ 的幂。两个未知量 $\Phi$、$\Psi$ 需要两个独立方程。既然处理的是标量扰动，可以预料 $00$ 分量以及 $ij$ 方程的**标量部分**会派上用场。`}</Tx>

      <Sub n="6.3.1" title="Ricci tensor" zh="Ricci 张量">
        <Tx>{R`Ricci 张量最容易用 §3.3.1 推出的 Christoffel 符号表示。先看 \eqref{3.3} 的时–时分量：`}</Tx>
        <Eq n="6.21" say="Ricci 张量的时–时分量由四项构成：Christoffel 符号的两个导数项与两个乘积项，指标 $\alpha$、$\beta$ 都要求和。">{R`R_{00}=\Gamma^\alpha{}_{00,\alpha}-\Gamma^\alpha{}_{0\alpha,0}+\Gamma^\alpha{}_{\beta\alpha}\Gamma^\beta{}_{00}-\Gamma^\alpha{}_{\beta0}\Gamma^\beta{}_{0\alpha}.`}</Eq>
        <Tx>{R`这些项在一阶上都有贡献。一个简化来自各项中 $\alpha=0$ 的部分：第一项与第二项的 $\alpha=0$ 部分大小相等、符号相反，最后两项也是如此。所以对 $\alpha$ 的求和只在 $\alpha$ 为空间指标时有贡献。下面逐项计算。

- **第一项**：把 \eqref{3.56} 第一行转到 Fourier 空间（$\Gamma^i{}_{00}=\Psi_{,i}/a^2$，再求一次 $\partial_i$ 得 $-k^2$）：`}</Tx>
        <Eq n="6.22" say="第一项就是牛顿引力：势的拉普拉斯 $\nabla^2\Psi/a^2$，在 Fourier 空间是 $-k^2\Psi/a^2$。">{R`\Gamma^i{}_{00,i}=-\frac{k^2}{a^2}\Psi,`}</Eq>
        <Tx>{R`- **第二项**：用 \eqref{3.56} 第二行 $\Gamma^i{}_{0j}=\delta_{ij}(H+\dot\Phi)$，前面的因子 3 来自 $\delta_{ii}$ 中隐含的求和：`}</Tx>
        <Eq n="6.23" say="第二项是局域哈勃率 $H+\dot\Phi$ 的时间导数（3 个空间方向各一份）：零阶给出 $\dot H=\ddot a/a-H^2$，一阶给出 $\ddot\Phi$。">{R`-\Gamma^i{}_{0i,0}=-3\left(\frac{\ddot a}{a}-H^2+\Phi_{,00}\right)`}</Eq>
        <Tx>{R`- **第三项** $\Gamma^i{}_{i\beta}\Gamma^\beta{}_{00}$：注意 $\Gamma^\beta{}_{00}$ 无论 $\beta$ 取什么都是一阶的，所以 $\Gamma^i{}_{i\beta}$ 只需保留零阶部分。而 \eqref{3.56} 最后一行表明，除非 $\beta=0$，$\Gamma^i{}_{i\beta}$ 都是一阶的。于是到一阶`}</Tx>
        <Eq n="6.24" say="只有 $\beta=0$ 的项留下：零阶膨胀率 $3H$ 乘以 $\Gamma^0{}_{00}=\dot\Psi$。">{R`\begin{aligned}\Gamma^i{}_{i\beta}\Gamma^\beta{}_{00} &= \Gamma^i{}_{i0}\Gamma^0{}_{00}\\ &= 3H\Psi_{,0}.\end{aligned}`}</Eq>
        <Tx>{R`- **最后一项** $-\Gamma^i{}_{\beta0}\Gamma^\beta{}_{0i}$：若 $\beta=0$，两个 $\Gamma$ 都是一阶，乘积为二阶，可忽略。所以只需考虑空间的 $\beta$：`}</Tx>
        <Eq n="6.25" say="两个“局域哈勃率” $\delta_{ij}(H+\dot\Phi)$ 相乘并对 $i,j$ 求和：$3(H+\dot\Phi)^2$ 展开到一阶。">{R`\begin{aligned}-\Gamma^i{}_{\beta0}\Gamma^\beta{}_{0i} &= -\Gamma^i{}_{j0}\Gamma^j{}_{0i}\\ &= -3(H^2+2H\Phi_{,0}).\end{aligned}`}</Eq>
        <Tx>{R`把四组项加起来：`}</Tx>
        <Eq n="6.26" keyEq title={R`$R_{00}$（标量扰动）`} say="Ricci 张量的时–时分量：零阶 $-3\ddot a/a$（与 \eqref{3.6} 一致），一阶包括牛顿项 $-k^2\Psi/a^2$、空间曲率扰动的加速度 $-3\ddot\Phi$ 与膨胀耦合项。">{R`R_{00}=-3\frac{\ddot a}{a}-\frac{k^2}{a^2}\Psi-3\Phi_{,00}+3H(\Psi_{,0}-2\Phi_{,0}).`}</Eq>
        <Tx>{R`注意零阶项与 \eqref{3.6} 一致。空–空部分留作习题（习题 6.5），结果是`}</Tx>
        <Eq n="6.27" keyEq title={R`$R_{ij}$（标量扰动）`} say="Ricci 张量的空–空分量：大部分项正比于 $\delta_{ij}$（各向同性部分），只有最后一项 $k_ik_j(\Phi+\Psi)$ 有方向性——它将决定 $\Phi+\Psi$ 的方程。">{R`\begin{aligned}R_{ij}=\delta_{ij}\Big[&\left(2a^2H^2+a\ddot a\right)(1+2\Phi-2\Psi)\\ &+a^2H(6\Phi_{,0}-\Psi_{,0})+a^2\Phi_{,00}+k^2\Phi\Big]+k_ik_j(\Phi+\Psi).\end{aligned}`}</Eq>
        <Box kind="note" title="数值核对">{R`编者用符号计算（sympy）对度规 \eqref{6.20} 直接求 Christoffel 符号、Ricci 张量与 Einstein 张量，逐项验证了 \eqref{6.26}、\eqref{6.27}、\eqref{6.30}、\eqref{6.34}、\eqref{6.44} 以及习题 6.6 的 \eqref{6.82}，全部与原书一致。`}</Box>
        <Tx>{R`**Ricci 标量。**现在缩并 Ricci 张量的指标（$g^{00}=-1+2\Psi$，$g^{ij}=\delta^{ij}(1-2\Phi)/a^2$，见习题 6.4）：`}</Tx>
        <Eq n="6.28" say="Ricci 标量 = $g^{00}R_{00}$ + $g^{ij}R_{ij}$：把 \eqref{6.26} 乘以 $-1+2\Psi$，把 \eqref{6.27} 的迹（$\delta_{ii}=3$，$k_ik_i=k^2$）乘以 $(1-2\Phi)/a^2$。">{R`\begin{aligned}R\equiv g^{\mu\nu}R_{\mu\nu} &= g^{00}R_{00}+g^{ij}R_{ij}\\ &= [-1+2\Psi]\left[-3\frac{\ddot a}{a}-\frac{k^2}{a^2}\Psi-3\Phi_{,00}+3H(\Psi_{,0}-2\Phi_{,0})\right]\\ &\quad+\frac{1-2\Phi}{a^2}\bigg[3\Big\{\left(2a^2H^2+a\ddot a\right)(1+2\Phi-2\Psi)\\ &\qquad\qquad+a^2H(6\Phi_{,0}-\Psi_{,0})+a^2\Phi_{,00}+k^2\Phi\Big\}+k^2(\Phi+\Psi)\bigg].\end{aligned}`}</Eq>
        <Tx>{R`先检查 $R$ 的零阶部分：合并各项得 $6(H^2+\ddot a/a)$，与 \eqref{3.9} 一致。为得到一阶部分 $\delta R$，按已经熟悉的套路把各项相乘，只保留对 $\Phi$、$\Psi$ 为一阶的项：`}</Tx>
        <Eq n="6.29" say="一阶 Ricci 标量的逐项来源：第一行来自 $g^{00}R_{00}$（\eqref{6.28} 第二行），后两行来自 $g^{ij}R_{ij}$。">{R`\begin{aligned}\delta R=&-6\Psi\frac{\ddot a}{a}+\frac{k^2}{a^2}\Psi+3\Phi_{,00}-3H(\Psi_{,0}-2\Phi_{,0})\\ &-6\Psi\left(2H^2+\frac{\ddot a}{a}\right)+3H(6\Phi_{,0}-\Psi_{,0})\\ &+3\Phi_{,00}+4\frac{k^2\Phi}{a^2}+\frac{k^2\Psi}{a^2},\end{aligned}`}</Eq>
        <Derivation title={R`\eqref{6.29} 的来源`} collapsed steps={[
          { tex: R`g^{00}R_{00}\big|_{1}=2\Psi\left(-3\frac{\ddot a}a\right)-\left[-\frac{k^2}{a^2}\Psi-3\Phi_{,00}+3H(\Psi_{,0}-2\Phi_{,0})\right]`, why: R`零阶 $g^{00}=-1$ 乘一阶 $R_{00}$，加一阶 $2\Psi$ 乘零阶 $-3\ddot a/a$。` },
          { tex: R`g^{ij}R_{ij}\big|_{1}=-\frac{2\Phi}{a^2}\cdot3(2a^2H^2+a\ddot a)+\frac{3}{a^2}(2a^2H^2+a\ddot a)(2\Phi-2\Psi)+\dots`, why: R`$(1-2\Phi)$ 中的 $-2\Phi$ 乘零阶迹 $3(2a^2H^2+a\ddot a)$ 与花括号内的 $+2\Phi$ 相消，只剩 $-6\Psi(2H^2+\ddot a/a)$。` },
          { tex: R`\dots+3H(6\Phi_{,0}-\Psi_{,0})+3\Phi_{,00}+\frac{3k^2\Phi}{a^2}+\frac{k^2(\Phi+\Psi)}{a^2}`, why: R`其余一阶项直接乘 $1/a^2$；$3k^2\Phi+k^2\Phi=4k^2\Phi$。` },
        ]} />
        <Tx>{R`其中第一行是 $R_{00}$ 的贡献，后两行来自 $R_{ij}$。合并后得到`}</Tx>
        <Eq n="6.30" keyEq title="Ricci 标量的一阶部分" say="Ricci 标量的一阶扰动：两个势的拉普拉斯项（$2k^2\Psi$、$4k^2\Phi$）、$\Phi$ 的加速度、以及与背景膨胀耦合的项。">{R`\begin{aligned}\delta R=&-12\Psi\left(H^2+\frac{\ddot a}{a}\right)+\frac{2k^2}{a^2}\Psi+6\Phi_{,00}\\ &-6H(\Psi_{,0}-4\Phi_{,0})+4\frac{k^2\Phi}{a^2}.\end{aligned}`}</Eq>
      </Sub>

      <Sub n="6.3.2" title="Two components of the Einstein equations" zh="Einstein 方程的两个分量">
        <Tx>{R`现在可以推导 $\Phi$、$\Psi$——FLRW 度规的标量扰动——的演化方程了。这里有好几种选择，因为 Einstein 方程`}</Tx>
        <Eq n="6.31" keyEq title="Einstein 方程" say="时空的弯曲（Einstein 张量）等于 $8\pi G$ 乘以物质与能量的分布（能动张量）；一上一下指标的形式让右边最简单。">{R`${Gm}^\mu{}_\nu=8\pi GT^\mu{}_\nu`}</Eq>
        <Tx>{R`有 10 个分量，而我们只需要 2 个。其余 8 个分量要么在一阶上为零，要么是冗余的。（这对标量扰动成立；考虑张量扰动时，另一些分量会有用。）

**时–时分量。**第一个用到的是时–时分量，需要计算`}</Tx>
        <Eq n="6.32" say="Einstein 张量的时–时分量：用 $g^{00}$ 升起一个指标；因为 $g^{00}g_{00}=1$，第二项就是 $-R/2$。">{R`\begin{aligned}${Gm}^0{}_0 &= g^{00}\left[R_{00}-\frac12g_{00}R\right]\\ &= (-1+2\Psi)R_{00}-\frac R2.\end{aligned}`}</Eq>
        <Tx>{R`这里通过乘以 $g^{00}$ 把 $G_{00}$ 的一个指标升了起来（回忆 $g^{0i}$ 为零）。事实证明这样能简化提供右边的能动张量（见 §3.4 与习题 3.12）。第二行由第一行得到，因为 $g^{00}g_{00}=1$。我们已经算出 Ricci 张量的时–时分量 \eqref{6.26} 和扰动的 Ricci 标量 \eqref{6.30}，所以 Einstein 张量时–时分量的一阶部分为`}</Tx>
        <Eq n="6.33" say="$\delta G^0{}_0$ 的逐项来源：第一行是 $(-1+2\Psi)R_{00}$ 的一阶部分，后两行是 $-\delta R/2$。">{R`\begin{aligned}\delta ${Gm}^0{}_0=&-6\Psi\frac{\ddot a}{a}+\frac{k^2}{a^2}\Psi+3\Phi_{,00}-3H(\Psi_{,0}-2\Phi_{,0})\\ &+6\Psi\left(H^2+\frac{\ddot a}{a}\right)-\frac{k^2}{a^2}\Psi-3\Phi_{,00}\\ &+3H(\Psi_{,0}-4\Phi_{,0})-2\frac{k^2\Phi}{a^2}.\end{aligned}`}</Eq>
        <Tx>{R`合并各项（$\ddot a$ 项、$k^2\Psi$ 项、$\Phi_{,00}$ 项、$\Psi_{,0}$ 项都恰好相消）得到`}</Tx>
        <Eq n="6.34" keyEq title={R`$\delta G^0{}_0$`} say="Einstein 张量时–时分量的一阶部分只剩三项：$\Phi$ 的变化率与 $\Psi$ 各乘以膨胀率，以及空间曲率的拉普拉斯 $-2k^2\Phi/a^2$。">{R`\delta ${Gm}^0{}_0=-6H\Phi_{,0}+6\Psi H^2-2\frac{k^2\Phi}{a^2}.`}</Eq>
        <Tx>{R`**右边：能动张量的时–时分量。**Einstein 方程令 $G^0{}_0$ 等于 $8\pi GT^0{}_0$，其中 $T_{\mu\nu}$ 是能动张量。为完成 $\Phi$、$\Psi$ 第一个演化方程的推导，需要算出源项 $T^0{}_0$ 的一阶部分。回忆 §2.3：$-T^0{}_0$ 是宇宙中所有粒子的能量密度，每种成分的贡献是对分布函数的积分。第 3 章已证明即使包含扰动，\eqref{2.62} 的简单表达式依然成立（即 \eqref{3.86}）：`}</Tx>
        <Eq n="6.35" say="能量密度 = 所有成分、所有动量上的“每个粒子的能量乘以占据数”之和；负号是因为 $T^0{}_0=-\rho$。">{R`T^0{}_0(\boldsymbol x,\ t)=-\sum_sg_s\int\frac{d^3p}{(2\pi)^3}E_s(p)f_s(\boldsymbol p,\boldsymbol x,t),`}</Eq>
        <Tx>{R`其中对成分 $s$ 求和，$g_s$ 为简并度，$f_s$ 为分布函数，能量–动量关系 $E_s(p)=\sqrt{p^2+m_s^2}$。要得到能动张量的一阶部分，自然要考虑分布函数的一阶部分，即第 5 章为光子、中微子、暗物质、重子定义的扰动变量。

- **暗物质与重子**最简单：它们非相对论，$E_s(p)\simeq m_s$，对 $T^0{}_0$ 的贡献就正比于 $-mn(t,\boldsymbol x)$（$n$ 为数密度）。于是`}</Tx>
        <Eq n="6.36" say="非相对论物质的能量密度就是质量密度：平均值 $\rho_s$ 乘以 $(1+\delta_s)$。">{R`T^0{}_0\Big|_{s={\rm b,c}}=-\rho_s(1+\delta_s).`}</Eq>
        <Tx>{R`- **光子**要稍微小心。用 \eqref{5.3}：`}</Tx>
        <Eq n="6.37" say="光子能量密度：把一阶展开的分布函数 $f^{(0)}-p\,\partial_pf^{(0)}\Theta$ 代入，乘以能量 $p$ 积分；因子 2 是两种偏振。">{R`T^0{}_0\Big|_\gamma=-2\int\frac{d^3p}{(2\pi)^3}p\left[f^{(0)}-p\frac{\partial f^{(0)}}{\partial p}\Theta\right].`}</Eq>
        <Tx>{R`第一项就是零阶光子能量密度 $\rho_\gamma$。化简第二项时，先做角向积分，它从 $\Theta$ 中挑出单极矩 $\Theta_0$；再对 $p$ 分部积分，这会改变符号并引入因子 4，因为 $\partial p^4/\partial p=4p^3$。于是`}</Tx>
        <Eq n="6.38" say="光子能量密度的相对扰动是 $4\Theta_0$：温度扰动 $\Theta_0$ 的 4 倍，因为 $\rho_\gamma\propto T^4$。">{R`T^0{}_0\Big|_\gamma=-\rho_\gamma[1+4\Theta_0].`}</Eq>
        <Derivation title={R`\eqref{6.37} → \eqref{6.38}`} collapsed steps={[
          { tex: R`2\int\frac{d^3p}{(2\pi)^3}p^2\frac{\partial f^{(0)}}{\partial p}\Theta=2\int_0^\infty\frac{dp\,p^2}{2\pi^2}p^2\frac{\partial f^{(0)}}{\partial p}\int_{-1}^1\frac{d\mu}2\Theta(\mu)=2\Theta_0\int_0^\infty\frac{dp\,p^4}{2\pi^2}\frac{\partial f^{(0)}}{\partial p}`, why: R`$d^3p=p^2dp\,d\Omega$，$\int d\Omega=4\pi\int d\mu/2$（对方位角已积分）；$\Theta_0=\int\frac{d\mu}{2}\Theta$。` },
          { tex: R`\int_0^\infty dp\,p^4\frac{\partial f^{(0)}}{\partial p}=-4\int_0^\infty dp\,p^3f^{(0)}`, why: R`分部积分，边界项为零。` },
          { tex: R`\Rightarrow\ -2\int\frac{d^3p}{(2\pi)^3}p\left(-p\frac{\partial f^{(0)}}{\partial p}\Theta\right)=-4\Theta_0\cdot2\int\frac{d^3p}{(2\pi)^3}pf^{(0)}=-4\Theta_0\rho_\gamma`, why: R`$\rho_\gamma=2\int\frac{d^3p}{(2\pi)^3}pf^{(0)}=2\int\frac{dp\,p^3}{2\pi^2}f^{(0)}$。` },
        ]} />
        <Tx>{R`这个因子 4 事后看是显然的：扰动变量 $\Theta$ 是温度的相对变化，而能动张量关心的是能量密度的扰动 $\delta\rho_\gamma$。由于 $\rho_\gamma\propto\sym{ch06-temp}{T}^4$，本该预料到 $\delta\rho_\gamma/\rho_\gamma=4\delta\sym{ch06-temp}{T}/\sym{ch06-temp}{T}$。`}</Tx>
        <Box kind="warning" title="文献中的两种约定">{R`文献分成两派：一派把 $\Theta$ 定义为 $\delta\rho_\gamma/\rho_\gamma$，另一派（本书）用温度扰动 $\delta T/T$。两者相差 4 倍——读论文时务必先弄清作者用的是哪一种。`}</Box>
        <Tx>{R`- **无质量中微子**的一阶贡献与光子形式相同：`}</Tx>
        <Eq n="6.39" say="无质量中微子的能量密度扰动同样是其温度扰动单极矩的 4 倍。">{R`T^0{}_0\Big|_{\nu,m_\nu=0}=-\rho_\nu[1+4\mathcal N_0].`}</Eq>
        <Tx>{R`对有质量中微子，动量积分不再有闭合形式。所以在后面章节的解析解中我们忽略中微子质量，并基于数值解讨论中微子质量的影响。最后，正如第 5 章开头所说，我们继续忽略暗能量扰动。

**第一个方程。**回到 Einstein 方程：令 \eqref{6.34} 等于 $8\pi G$ 乘以能动张量时–时分量的一阶部分，两边除以 2，得到`}</Tx>
        <Eq n="6.40" say="以宇宙时写出的时–时 Einstein 方程：左边是度规扰动的组合，右边是 $-4\pi G$ 乘以全部成分的能量密度扰动。">{R`-3H\Phi_{,0}+3\Psi H^2-\frac{k^2\Phi}{a^2}=-4\pi G\left[\rho_{\rm c}\delta_{\rm c}+\rho_{\rm b}\delta_{\rm b}+4\rho_\gamma\Theta_0+4\rho_\nu\mathcal N_0\right].`}</Eq>
        <Tx>{R`同样，用共形时间写更方便。每出现一次时间导数就多一个 $1/a$（$\Phi_{,0}=\Phi'/a$，$H=a'/a^2$），于是（两边乘以 $-a^2$）`}</Tx>
        <Eq n="6.41" keyEq title="时–时 Einstein 方程（相对论 Poisson 方程）" say="度规扰动的第一个演化方程：$k^2\Phi$ 是牛顿引力的 Poisson 项，含 $a'/a$ 的项是膨胀带来的相对论修正；右边是全部成分的能量密度扰动。">{R`k^2\Phi+3\frac{a'}{a}\left(\Phi'-\Psi\frac{a'}{a}\right)=4\pi Ga^2[\rho_{\rm c}\delta_{\rm c}+\rho_{\rm b}\delta_{\rm b}+4\rho_\gamma\Theta_0+4\rho_\nu\mathcal N_0].`}</Eq>
        <Tx>{R`这是 $\Phi$、$\Psi$ 的第一个演化方程。在**无膨胀**极限（$a=$ 常数）下，\eqref{6.41} 化为通常的引力 Poisson 方程（Fourier 空间形式）：左边是 $-\nabla^2\Phi$，右边是 $4\pi Ga^2\delta\rho$。正比于 $a'$ 的项描述膨胀，通常只对物理波长（$\sim a/k$）与哈勃半径 $H^{-1}$ 相当或更大的模式重要。研究扰动演化时我们必须用这个广义相对论表达式，因为**今天所有感兴趣的模式都曾经大于哈勃半径**——第 7 章会详细讨论。`}</Tx>
        <Box kind="physics" title="膨胀项何时重要">{R`比较左边两类项：$k^2\Phi$ 对 $3(a'/a)^2\Psi$。两者之比约为 $(k/aH)^2/3$——即（共动波数 / 共动哈勃尺度）的平方。$k\gg aH$（亚视界）时膨胀修正可忽略，回到牛顿引力；$k\lesssim aH$（超视界）时膨胀项主导。习题 6.7 中你会看到，与时–空分量结合后，修正可写成右边多出一项 $\propto 3aH/k$ 的速度项，在 $k/aH\gg1$ 时消失。`}</Box>
        <Tx>{R`**第二个方程：空–空分量。**现在需要 $\Phi$、$\Psi$ 的第二个演化方程。关注 $G^\mu{}_\nu$ 的空间部分：`}</Tx>
        <Eq n="6.42" say="Einstein 张量的空–空分量：用 $g^{ik}=\delta^{ik}(1-2\Phi)/a^2$ 升起一个指标后，减去 $\delta^i{}_j$ 倍的 $R/2$。">{R`${Gm}^i{}_j=g^{ik}\left[R_{kj}-\frac{g_{kj}}2R\right]=\frac{${dK}^{ik}(1-2\Phi)}{a^2}R_{kj}-\frac{${dK}^i{}_j}2R.`}</Eq>
        <Tx>{R`从 \eqref{6.27} 可见，$R_{kj}$ 中的大部分项正比于 $\delta_{kj}$。与 $\delta^{ik}$ 缩并后会得到一大堆正比于 $\delta_{ij}$ 的项，再加上最后那个正比于 $R$ 的项。因此 \eqref{6.42} 可写成`}</Tx>
        <Eq n="6.43" say="空–空 Einstein 张量 = 一大堆各向同性（正比于 $\delta^i{}_j$）的项 + 唯一一个有方向性的项 $k^ik_j(\Phi+\Psi)/a^2$。">{R`${Gm}^i{}_j=F(\Phi,\Psi)${dK}^i{}_j+\frac{k^ik_j(\Phi+\Psi)}{a^2}`}</Eq>
        <Tx>{R`其中 $F(\Phi,\Psi)$ 有近十项，我们宁可不写出来。因为这些项都正比于 $\delta^i{}_j$，它们全都贡献于 $G^i{}_j$ 的**迹**。为了避开它们，考虑 $G^i{}_j$ 的**纵向、无迹**部分：用 $\hat k_i\hat k^j-(1/3)\delta^j_i$ 与 $G^i{}_j$ 缩并即可提取。这个操作恰好挑出纵向无迹的部分，而且只挑出这一部分（习题 6.1）。剩下的是`}</Tx>
        <Eq n="6.44" keyEq title="纵向无迹的 Einstein 张量" say="投影算符把所有正比于 $\delta^i{}_j$ 的项一扫而空（它无迹），只留下有方向性的那一项：$\frac{2}{3a^2}k^2(\Phi+\Psi)$。">{R`\left(\hat k_i\hat k^j-\frac13${dK}^j_i\right)${Gm}^i{}_j=\left(\hat k_i\hat k^j-\frac13${dK}^j_i\right)\left(\frac{k^ik_j(\Phi+\Psi)}{a^2}\right)=\frac{2}{3a^2}k^2(\Phi+\Psi).`}</Eq>
        <Derivation title="投影算符的两条性质" collapsed steps={[
          { tex: R`\left(\hat k_i\hat k^j-\frac13${dK}^j_i\right)${dK}^i{}_j=1-\frac13\cdot3=0`, why: R`作用在任何正比于 $\delta^i{}_j$ 的项上给零——迹项全部消失。` },
          { tex: R`\left(\hat k_i\hat k^j-\frac13${dK}^j_i\right)k^ik_j=k^2-\frac13k^2=\frac23k^2`, why: R`作用在纵向项上保留 $2/3$。` },
        ]} />
        <Tx>{R`**右边：各向异性应力。**这要等于能动张量用同样方式提取的纵向无迹部分。由 §3.4，`}</Tx>
        <Eq n="6.45" say="能动张量的空–空分量：动量流 $p^ip_j/E$ 按分布函数加权积分——它包含压强（迹部分）和各向异性应力（无迹部分）。">{R`T^i{}_j(\boldsymbol x,t)=\sum_sg_s\int\frac{d^3p}{(2\pi)^3}\frac{p^ip_j}{E_s(p)}f_s(\boldsymbol x,\boldsymbol p,t).`}</Eq>
        <Tx>{R`用投影算符作用于它，得到`}</Tx>
        <Eq n="6.46" say="投影后的被积函数正比于 $\mu^2-1/3$，即二阶 Legendre 多项式：只有分布函数的四极矩才有贡献。">{R`\left(\hat k_i\hat k^j-\frac13${dK}^j_i\right)T^i{}_j=\sum_sg_s\int\frac{d^3p}{(2\pi)^3}\frac{p^2\mu^2-(1/3)p^2}{E_s(p)}f_s(\boldsymbol p),`}</Eq>
        <Tx>{R`这里用了 $\mu$ 的定义 $\hat{\boldsymbol k}\cdot\boldsymbol p=\mu p$。我们立刻认出组合 $\mu^2-1/3$ 正比于二阶 Legendre 多项式，更精确地等于 $(2/3)\mathcal P_2(\mu)$。因此这个积分挑出的是分布函数的**四极矩**部分。分布函数的零阶部分没有四极矩，所以源项是一阶的，而且只对光子和中微子非零——正比于 $\Theta_2$ 和 $\mathcal N_2$。对光子，\eqref{6.46} 中的积分为`}</Tx>
        <Eq n="6.47" keyEq title="光子的各向异性应力" say="光子分布的四极矩 $\Theta_2$ 产生各向异性应力 $-\frac83\rho_\gamma\Theta_2$：角向积分挑出 $\Theta_2$，分部积分把 $p^4\partial_pf^{(0)}$ 变成 $-4$ 倍能量密度。">{R`\begin{aligned}-2\int\frac{dp\,p^2}{2\pi^2}p^2\frac{\partial f^{(0)}}{\partial p}\int_{-1}^1\frac{d\mu}2\frac{2\mathcal P_2(\mu)}3\Theta(\mu) &= 2\frac{2\Theta_2}3\int\frac{dp\,p^2}{2\pi^2}p^2\frac{\partial f^{(0)}}{\partial p}\\ &= -\frac83\rho_\gamma\Theta_2\end{aligned}`}</Eq>
        <Tx>{R`其中第一个等号来自四极矩的定义（$\Theta_2=(-i)^{-2}\int\frac{d\mu}2\mathcal P_2\Theta=-\int\frac{d\mu}2\mathcal P_2\Theta$，见 \eqref{5.66}），第二个来自分部积分（与 \eqref{6.38} 相同，$\int dp\,p^4\partial_pf^{(0)}=-4\int dp\,p^3f^{(0)}$）。能动张量的这个分量称为**各向异性应力**（anisotropic stress）。非相对论粒子（如重子与暗物质）对各向异性应力没有贡献，因为 \eqref{6.45} 中的 $p/E_s(p)$ 因子强烈地压低了它们的贡献。

于是对第二个 Einstein 方程，令 \eqref{6.44} 等于 $8\pi G$ 乘以光子与（无质量）中微子的各向异性应力：`}</Tx>
        <Eq n="6.48" keyEq title={R`$\Phi+\Psi$ 方程`} say="两个势之和由辐射的四极矩决定：没有各向异性应力时 $\Phi=-\Psi$，两个势大小相等、符号相反。">{R`k^2(\Phi+\Psi)=-32\pi Ga^2[\rho_\gamma\Theta_2+\rho_\nu\mathcal N_2].`}</Eq>
        <Tx>{R`（推导：$\frac{2}{3a^2}k^2(\Phi+\Psi)=8\pi G\cdot\left(-\frac83\right)[\rho_\gamma\Theta_2+\rho_\nu\mathcal N_2]$，两边乘以 $3a^2/2$。）

这是一个极其重要而有用的结果：**除非光子或中微子有可观的四极矩，两个引力势大小相等、符号相反**。实际上光子四极矩对这个和贡献很小，因为在光子能量密度可观的时期，它们由于紧耦合而四极矩很小（回忆 \eqref{5.22} 之后的论证）。只有无碰撞的中微子在辐射主导的早期有可观的四极矩。

**约束方程。**\eqref{6.41} 与 \eqref{6.48} 就是我们想要的度规扰动 $\Phi$、$\Psi$ 的两个 Einstein 方程。给喜欢微分方程的读者一句话：两个方程中都**没有**作用在 $\Phi$、$\Psi$ 上的二阶时间导数——它们是**约束方程**（constraint equations）。也就是说，$\Phi$、$\Psi$ 并不代表传播的自由度（牛顿理论中熟悉的引力势也不是）。这是与接下来的张量模的关键区别。`}</Tx>
      </Sub>
    </Sec>);
}
