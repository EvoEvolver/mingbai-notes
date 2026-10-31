// 补充材料 J_I：势阶上的波包（式 JI-1 … JI-27）
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { StepPacketPlot } from "./_ch01c_plots.jsx";

const R = String.raw;
const HV = R`\sym{heav}{\theta}`;    // Heaviside 阶跃函数

export function SecJ() {
  return (
    <Sec n="JI" title="Behavior of a wave packet at a potential step" zh="势阶上的波包：反射、透射与延迟"
      gist={R`把 $\mathrm{H}_{\rm I}$ 的定态叠加成波包、用稳相法追踪中心：$E<V_0$ 时反射波包比经典粒子晚 $\tau=2m/\hbar k_0\sqrt{K_0^2-k_0^2}$ 返回（来自反射相移的导数）；$E>V_0$ 时没有延迟，反射波包是入射波包的缩小镜像，透射波包被压窄为 $q_0/k_0$ 倍，正好解释 $T$ 中的因子 $k_2/k_1$。`}
      why={R`定态是不可归一的平面波，"粒子何时反射""在禁区待多久"这类问题只有用波包才能回答；同时它从动力学上验证了 $\mathrm{H}_{\rm I}$ 由定态得到的 $R$、$T$ 与相移。`}
      gives={["JI-5", "JI-9", "JI-10", "JI-13", "JI-15", "JI-19c", "JI-24", "JI-26", "JI-27"]}>
      <p className="muted">本节概念：<C id="stationary_phase" /> · <C id="reflection_delay" /> · <C id="wavepacket" /></p>
      <Tx>{R`**定态回答不了的问题。**$\mathrm{H}_{\rm I}$ 得到了势阶的反射系数、透射系数，甚至全反射时的相移。但定态是充满全空间、永不停歇的平面波，它说不出"粒子什么时候撞上台阶""在禁区里待了多久""透射出去的粒子长什么样"。要回答这些带时间的问题，必须有一个局域的、会动的对象——波包。

**好消息是：用定态搭波包，时间演化白送。**每个定态只需乘上 $\mathrm e^{-iEt/\hbar}$ 就随时间演化（正文 \mainsec{D-1-b}），所以只要用定态（而不是自由平面波）作基底来叠加，整个演化就写得出来；剩下的工作是用稳相法找出各部分的中心。下面对高为 $V_0$ 的势阶做这件事，并顺手从动力学上重新得到 $\mathrm{H}_{\rm I}$ 的结论。记号：`}</Tx>
      <Eq n="JI-1" say={R`把能量和台阶高度都换算成波数：$k$ 对应粒子能量，$K_0$ 对应台阶高度；$k<K_0$ 为全反射，$k>K_0$ 为部分反射。`}>{R`\begin{aligned}\sqrt{\frac{2mE}{\hbar^2}}&=k\\ \sqrt{\frac{2mV_0}{\hbar^2}}&=K_0\end{aligned}`}</Eq>
      <Tx>{R`与 $\mathrm{H}_{\rm I}$ 一样，按 $k$ 小于或大于 $K_0$ 分两种情形。`}</Tx>

      <Sub n="JI-1" title="Total reflection: E < V0" zh={R`全反射（$E<V_0$）：反射延迟`}>
        <Tx>{R`**搭波包。**只取 $k<K_0$ 的定态（$g(k)$ 在 $k>K_0$ 处为零），保证每个分量都全反射。所需的定态就是 $\mathrm{H}_{\rm I}$ 的 \eqref{HI-11}、\eqref{HI-20}（$k_1$ 改记为 $k$）。先只关心台阶左侧 $x<0$。全反射时 $|A_1'|=|A_1|$（\eqref{HI-22}），反射振幅只差一个相位，把它写成`}</Tx>
        <Eq n="JI-2" say={R`全反射时反射振幅与入射振幅模相等，只差一个相位因子 $\mathrm e^{-2i\theta(k)}$。`}>{R`\frac{A_1'(k)}{A_1(k)}=\mathrm e^{-2i\theta(k)}`}</Eq>
        <Tx>{R`其中 [参见 $\mathrm{H}_{\rm I}$ 的 \eqref{HI-19}]`}</Tx>
        <Eq n="JI-3" say={R`反射相位由衰减常数与波数之比决定：能量越接近台阶顶，$\theta$ 越小。`}>{R`\tan\,\theta(k)=\frac{\sqrt{K_0^2-k^2}}{k}`}</Eq>
        <Tx>{R`（由 \eqref{HI-22}：$\frac{k-i\rho_2}{k+i\rho_2}=\mathrm e^{-2i\theta}$，$\theta=\arg(k+i\rho_2)$。）于是 $t=0$ 时、$x<0$ 处的波包写作`}</Tx>
        <Eq n="JI-4" say={R`$t=0$ 时势阶左侧的波包：每个波数分量都是“入射波 + 带相移的反射波”。`}>{R`\psi(x,0)=\frac{1}{\sqrt{2\pi}}\int_0^{K_0}\mathrm dk\ g(k)\left[\mathrm e^{ikx}+\mathrm e^{-2i\theta(k)}\mathrm e^{-ikx}\right]`}</Eq>
        <Tx>{R`$|g(k)|$ 取为在 $k_0<K_0$ 处宽 $\Delta k$ 的尖峰。乘上各自的时间因子（正文 \mainref{D-14}）就得到任意时刻的波包：`}</Tx>
        <Eq n="JI-5" title="势阶左侧的波包" say={R`任意时刻势阶左侧的波函数 $=$ 入射波包 + 反射波包；后者每个分量多带一个反射相位 $2\theta(k)$。`}>{R`\begin{aligned}\psi(x,t)=&\frac{1}{\sqrt{2\pi}}\int_0^{K_0}\mathrm dk\ g(k)\,\mathrm e^{i[kx-\omega(k)t]}\\&+\frac{1}{\sqrt{2\pi}}\int_0^{K_0}\mathrm dk\ g(k)\,\mathrm e^{-i[kx+\omega(k)t+2\theta(k)]}\end{aligned}`}</Eq>
        <Tx>{R`（$\omega(k)=\hbar k^2/2m$。）务必记住这个式子**只描写 $x<0$ 的部分**——两项分别由入射分波与反射分波组成，它们本身并不保证在 $x<0$ 内"有东西"。哪一项在何时、何处真正形成一个峰，交给稳相法来判断。

**入射部分的中心。**取 $g$ 为实函数，令第一项的相位 $kx-\omega t$ 对 $k$ 在 $k_0$ 处的导数为零：`}</Tx>
        <Eq n="JI-6" say={R`入射波包中心以群速度 $\hbar k_0/m$ 匀速运动，$t=0$ 时到达台阶。`}>{R`x_i=t\left[\frac{\mathrm d\omega}{\mathrm dk}\right]_{k=k_0}=\frac{\hbar k_0}{m}\,t`}</Eq>
        <Tx>{R`**反射部分的中心。**第二项的相位是 $-[kx+\omega t+2\theta(k)]$，多了反射相移；需要 $\mathrm d\theta/\mathrm dk$。对 \eqref{JI-3} 两边微分：`}</Tx>
        <Eq n="JI-7" say={R`对 $\tan\theta$ 的定义式两边微分，求出 $\theta$ 随 $k$ 的变化。`}>{R`\begin{aligned}[1+\tan^2\theta]\,\mathrm d\theta&=\left[1+\frac{K_0^2-k^2}{k^2}\right]\mathrm d\theta\\&=-\frac{\mathrm dk}{k^2}\sqrt{K_0^2-k^2}-\frac{\mathrm dk}{\sqrt{K_0^2-k^2}}\end{aligned}`}</Eq>
        <Tx>{R`即`}</Tx>
        <Eq n="JI-8" say={R`两边同乘 $k^2$ 后化简：$\mathrm d\theta/\mathrm dk=-1/\sqrt{K_0^2-k^2}$。`}>{R`\frac{K_0^2}{k^2}\,\mathrm d\theta=-\frac{K_0^2}{k^2}\frac{1}{\sqrt{K_0^2-k^2}}\,\mathrm dk`}</Eq>
        <Tx>{R`化简得 $\mathrm d\theta/\mathrm dk=-1/\sqrt{K_0^2-k^2}$。令反射项的相位导数为零：`}</Tx>
        <Eq n="JI-9" title="反射波包中心" say={R`反射波包中心以 $-\hbar k_0/m$ 向左运动，但比经典的 $-\hbar k_0t/m$ 多出一段正的位移：它“迟到”了。`}>{R`x_r=-\left[t\frac{\mathrm d\omega}{\mathrm dk}+2\frac{\mathrm d\theta}{\mathrm dk}\right]_{k=k_0}=-\frac{\hbar k_0}{m}\,t+\frac{2}{\sqrt{K_0^2-k_0^2}}`}</Eq>
        <Tx>{R`**把两个中心的运动连成一部"电影"。**

*早期（$t<0$）：*$x_i<0$，入射峰在台阶左侧向右走。而 \eqref{JI-9} 给出的 $x_r$ 是**正**的——落在这个公式适用的区域 $x<0$ 之外。也就是说，在 $x<0$ 的任何地方，反射分波都相互抵消：**此时根本没有反射波包**，只有一个普通的入射波包。

*撞墙（$t\approx0$）：*入射峰到达台阶，入射与反射分波在台阶附近干涉，形状复杂（交互图中可以看到干涉条纹），并有一部分概率渗入禁区。

*晚期（$t$ 足够大）：*角色互换。$x_i$ 变正，入射分波在 $x<0$ 处处相消——**入射波包消失了**；$x_r$ 变负，反射分波在 $x_r$ 处相长，一个与入射波包互为镜像的波包以 $-\hbar k_0/m$ 向左离去（假设 $\Delta k$ 小到这段时间内扩散可以忽略）。

**最有意思的是那个常数项。**把 \eqref{JI-9} 写成 $x_r=-\frac{\hbar k_0}{m}(t-\tau)$：反射波包的运动与"在 $t=\tau$ 时从原点出发"的经典粒子一样——它比瞬时反射**晚了** $\tau$：`}</Tx>
        <Eq n="JI-10" keyEq title="反射延迟" say={R`全反射的粒子不是瞬间弹回，而是延迟 $\tau$；能量越接近台阶高度（$k_0\to K_0$），延迟越长。`}>{R`\tau=-2\left[\frac{\mathrm d\theta/\mathrm dk}{\mathrm d\omega/\mathrm dk}\right]_{k=k_0}=\frac{2m}{\hbar k_0\sqrt{K_0^2-k_0^2}}`}</Eq>
        <Tx>{R`**这个延迟意味着什么？**经典粒子撞上硬墙是瞬间弹回的；量子粒子则在禁区的倏逝层里"逗留"了一段时间（见评注 (i)）。注意 $\tau$ 不是正比于反射相移 $2\theta(k_0)$ 本身，而是正比于它对 $k$ 的**导数**：单一平面波的相移只是一个常数相位，没有可观测的时间意义；只有波包中各分量相移的**差别**才会移动峰的位置。这是"群延迟"概念的一个干净例子。$k_0\to K_0$（能量逼近台阶顶）时 $\tau$ 发散——倏逝层越来越厚，粒子钻得越来越深（当然那时 $g(k)$ 在 $K_0$ 处被截断，近似也就失效了）。`}</Tx>
        <StepPacketPlot />
        <Box kind="note" title="评注 (i)：禁区中的波包">
          <Tx>{R`也可以研究 $x>0$ 区域中的波包：`}</Tx>
          <Eq n="JI-11" say={R`势阶右侧（禁区）的波包：由衰减的倏逝波叠加而成。`}>{R`\psi(x,t)=\frac1{\sqrt{2\pi}}\int_0^{K_0}\mathrm dk\ g(k)B_2'(k)\,\mathrm e^{-\rho(k)x}\mathrm e^{-i\omega(k)t}`}</Eq>
          <Tx>{R`其中`}</Tx>
          <Eq n="JI-12" say={R`各分量的衰减常数。`}>{R`\rho(k)=\sqrt{K_0^2-k^2}`}</Eq>
          <Tx>{R`$B_2'(k)$ 取自 \eqref{HI-23}（$A_1\to1$、$k_1\to k$、$\rho_2\to\rho$）。它的辐角是 $A_1'$ 辐角的一半，即 $-\theta(k)$。被积函数的相位于是是 $-\theta(k)-\omega(k)t$——**不含 $x$**（$\mathrm e^{-\rho x}$ 是实的）。在 $k_0$ 附近展开：`}</Tx>
          <Eq n="JI-13" say={R`禁区波包的相位与 $x$ 无关，在 $t=\tau/2$ 时对 $k$ 稳定：波包在禁区中的“驻留”中心时刻正是延迟的一半。`}>{R`\left\{-\left[\frac{\mathrm d\theta}{\mathrm dk}\right]_{k=k_0}-\left[\frac{\mathrm d\omega}{\mathrm dk}\right]_{k=k_0}t\right\}(k-k_0)=-\frac{\hbar k_0}{m}(k-k_0)\left(t-\frac\tau2\right)`}</Eq>
          <Tx>{R`（用到 \eqref{JI-10}。）相位与 $x$ 无关，所以禁区里不会有一个随时间移动的峰；变化的只是整体强度。$t=\tau/2$ 时相位对 $k$ 稳定，各分量同相，$|\psi|$ 最大：粒子在 $\tau/2$ 时"最深入"禁区，前后对称，这与反射波包晚到 $\tau$ 的结论一致。

离开 $\tau/2$ 越远，各分量的相位差 $\frac{\hbar k_0}{m}(k-k_0)(t-\tau/2)$ 越大；当它在宽度 $\Delta k$ 上达到 1 的量级，`}</Tx>
          <Eq n="JI-14" say={R`禁区中的分波保持同相的时间尺度：相位差 $\frac{\hbar k_0}{m}\Delta k\,\Delta t$ 达到 1 量级后就互相抵消。`}>{R`\frac{\hbar k_0}{m}\,\Delta k\,\Delta t\simeq1`}</Eq>
          <Tx>{R`各分量就失去同相，禁区中的波包衰减殆尽。所以禁区被"占用"的时间约为`}</Tx>
          <Eq n="JI-15" say={R`波包整体在禁区边缘停留的时间，约等于它以群速度走过自身宽度 $1/\Delta k$ 所需的时间。`}>{R`\Delta t=\frac{1/\Delta k}{\hbar k_0/m}`}</Eq>
          <Tx>{R`这正是入射波包以群速度走过自身长度 $1/\Delta k$ 所需的时间——波包"撞墙"本来就要持续这么久。`}</Tx>
        </Box>
        <Box kind="note" title={R`评注 (ii)：延迟远小于"经过时间"`}>
          <Tx>{R`由于假设 $\Delta k$ 远小于 $k_0$ 与 $K_0$，比较 \eqref{JI-10} 与 \eqref{JI-15}（$\Delta t/\tau=\sqrt{K_0^2-k_0^2}/2\Delta k$）：`}</Tx>
          <Eq n="JI-16" say={R`波包撞墙的持续时间远长于反射延迟。`}>{R`\Delta t\gg\tau`}</Eq>
          <Tx>{R`所以反射延迟给反射波包造成的位移远小于它的宽度——上面交互图里要仔细看才能看出虚线与实线中心的错开。`}</Tx>
        </Box>
      </Sub>

      <Sub n="JI-2" title="Partial reflection: E > V0" zh={R`部分反射（$E>V_0$）：一分为二`}>
        <Tx>{R`**搭波包。**这次只取 $k>K_0$ 的定态，$g(k)$ 以 $k_0>K_0$ 为中心、宽 $\Delta k$。每个定态取 $A_1=1$、$A_2'=0$（粒子从左方入射），$A_1'(k)$、$A_2(k)$ 由 \eqref{HI-13}、\eqref{HI-14} 给出（$k_1\to k$，$k_2\to\sqrt{k^2-K_0^2}$）。为了用一个式子写出全空间的波包，借助阶跃函数`}</Tx>
        <Eq n="JI-17" say={R`阶跃函数：在负半轴为 0、正半轴为 1，用来把左右两侧的表达式拼成一个式子。`}>{R`\begin{aligned}${HV}(x)&=0\qquad\text{if }x<0\\ ${HV}(x)&=1\qquad\text{if }x>0\end{aligned}`}</Eq>
        <Tx>{R`于是`}</Tx>
        <Eq n="JI-18" title="部分反射的波包" say={R`波包由三部分组成：左侧的入射波包与反射波包，右侧以波数 $\sqrt{k^2-K_0^2}$ 传播的透射波包。`}>{R`\begin{aligned}\psi(x,t)=\ &${HV}(-x)\frac1{\sqrt{2\pi}}\int_{K_0}^{+\infty}\mathrm dk\ g(k)\ \mathrm e^{i[kx-\omega(k)t]}\\&+${HV}(-x)\frac1{\sqrt{2\pi}}\int_{K_0}^{+\infty}\mathrm dk\ g(k)A_1'(k)\ \mathrm e^{-i[kx+\omega(k)t]}\\&+${HV}(x)\frac1{\sqrt{2\pi}}\int_{K_0}^{+\infty}\mathrm dk\ g(k)A_2(k)\ \mathrm e^{i[\sqrt{k^2-K_0^2}\,x-\omega(k)t]}\end{aligned}`}</Eq>
        <Tx>{R`**三个中心。**$A_1'(k)$、$A_2(k)$ 都是实数，不给相位添任何东西，稳相条件直接给出`}</Tx>
        <Eq n="JI-19a" say={R`入射波包中心：以 $\hbar k_0/m$ 向右。`}>{R`x_i=\frac{\hbar k_0}{m}t`}</Eq>
        <Eq n="JI-19b" say={R`反射波包中心：以同样速率向左，没有延迟。`}>{R`x_r=-\frac{\hbar k_0}{m}t`}</Eq>
        <Eq n="JI-19c" say={R`透射波包中心：以较慢的速度 $\hbar\sqrt{k_0^2-K_0^2}/m$ 向右，同样没有延迟。`}>{R`x_t=\frac{\hbar\sqrt{k_0^2-K_0^2}}{m}\,t`}</Eq>
        <Tx>{R`与 §1 同样的推理：$t<0$ 时 $x_r>0$、$x_t<0$，两者都在各自的有效区域之外，只有入射波包；$t$ 足够大时 $x_i>0$，入射波包消失，只剩向左的反射波包与向右的透射波包（交互图中把 $k_0/K_0$ 调到 1 以上）。与全反射不同，**这里没有延迟**——正是因为振幅都是实数，相移对 $k$ 的导数为零。

**反射波包：缩小的镜像。**$\Delta k$ 很小时，$A_1'(k)$ 在峰内几乎不变，可以换成 $A_1'(k_0)$ 提到积分外。剩下的积分与入射项只差 $x\to-x$，所以反射波包是入射波包的镜像，振幅乘以 $A_1'(k_0)<1$。反射概率 $=$ 两个波包的概率之比 = $|A_1'(k_0)|^2$，与 $\mathrm{H}_{\rm I}$ 的 \eqref{HI-15} 一致。

**透射波包：没那么简单。**同样把 $A_2(k)$ 换成 $A_2(k_0)$；但右侧的波数 $\sqrt{k^2-K_0^2}$ 与 $k$ 不是一一平移的关系，需要把它线性化：`}</Tx>
        <Eq n="JI-20" say={R`在 $k_0$ 附近把透射区波数线性化：$k$ 每变化 $\delta k$，透射波数变化 $(k_0/q_0)\delta k$，比 $\delta k$ 更大。`}>{R`\begin{aligned}\sqrt{k^2-K_0^2}&\simeq\sqrt{k_0^2-K_0^2}+(k-k_0)\left[\frac{\mathrm d\sqrt{k^2-K_0^2}}{\mathrm dk}\right]_{k=k_0}\\&\simeq q_0+(k-k_0)\frac{k_0}{q_0}\end{aligned}`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="JI-21" say={R`透射区的中心波数。`}>{R`q_0=\sqrt{k_0^2-K_0^2}`}</Eq>
        <Tx>{R`透射波包于是可写成`}</Tx>
        <Eq n="JI-22" say={R`线性化之后，透射波包的包络就是入射包络把 $x$ 按 $k_0/q_0$ 拉伸后的样子。`}>{R`\psi_t(x,t)\simeq A_2(k_0)\,\mathrm e^{iq_0x}\frac1{\sqrt{2\pi}}\int_{K_0}^{+\infty}\mathrm dk\ g(k)\ \mathrm e^{i\left[(k-k_0)\frac{k_0}{q_0}x-\omega(k)t\right]}`}</Eq>
        <Tx>{R`与入射波包比较：`}</Tx>
        <Eq n="JI-23" say={R`入射波包写成同样的形式：平面波 $\mathrm e^{ik_0x}$ 乘一个包络积分。`}>{R`\psi_i(x,t)=\mathrm e^{ik_0x}\frac1{\sqrt{2\pi}}\int_{K_0}^{+\infty}\mathrm dk\ g(k)\ \mathrm e^{i[(k-k_0)x-\omega(k)t]}`}</Eq>
        <Tx>{R`可见`}</Tx>
        <Eq n="JI-24" title="透射波包＝压缩的入射波包" say={R`透射波包的包络等于入射包络在 $(k_0/q_0)x$ 处的值再乘 $A_2(k_0)$：振幅略大，但沿 $x$ 被压窄为 $q_0/k_0$ 倍。`}>{R`|\psi_t(x,t)|\simeq A_2(k_0)\left|\psi_i\left(\frac{k_0}{q_0}x,t\right)\right|`}</Eq>
        <Tx>{R`**压窄。**\eqref{JI-24} 说：透射包络在 $x$ 处的值等于入射包络在 $(k_0/q_0)x$ 处的值。$k_0/q_0>1$，所以整个包络沿 $x$ 被压缩，宽度缩小为原来的 $q_0/k_0$；同时振幅乘了 $A_2(k_0)>1$（\eqref{HI-14}）：`}</Tx>
        <Eq n="JI-25" say={R`透射波包的宽度缩小为入射宽度的 $q_0/k_0$ 倍。`}>{R`(\Delta x)_t=\frac{q_0}{k_0}\Delta x`}</Eq>
        <Tx>{R`透射概率 $=$ 透射波包下的面积 / 入射波包下的面积 $=$ 振幅比的平方 $\times$ 宽度比：`}</Tx>
        <Eq n="JI-26" keyEq title="透射系数的波包解释" say={R`透射概率 $=$ 振幅放大的平方 $\times$ 宽度压缩比：这正是 $\mathrm{H}_{\rm I}$ 中透射系数里速度比因子 $k_2/k_1$ 的来源。`}>{R`T=\frac{q_0}{k_0}|A_2(k_0)|^2`}</Eq>
        <Tx>{R`这就是 $\mathrm{H}_{\rm I}$ 的 \eqref{HI-16}，而那个当初只能用"概率流"解释的速度比因子 $k_2/k_1$，现在有了看得见的含义：**它就是透射波包的宽度压缩比。**宽度压缩还给出速度：包络在相同时间内走过的距离也按同一比例缩小，`}</Tx>
        <Eq n="JI-27" say={R`透射波包的速度 $=$ 入射速度 $\times$ 压缩比 = $\hbar q_0/m$，与透射区的群速度一致。`}>{R`V_t=\frac{\hbar k_0}{m}\times\frac{q_0}{k_0}=\frac{\hbar q_0}{m}`}</Eq>
        <Box kind="physics" title="一张图看懂压缩">{R`为什么透射波包会变窄？入射波包的前沿先到达台阶、先减速；后沿还在以 $\hbar k_0/m$ 追赶，直到它也越过台阶。整个包络于是被"压"短了 $q_0/k_0$ 倍——高速公路上车队驶入限速路段时车距缩短，是同一回事。车流量（概率流）守恒：密度变大、速度变小，乘积不变，这正是 $T=\frac{q_0}{k_0}|A_2|^2$ 的含义。`}</Box>
      </Sub>
    </Sec>);
}
