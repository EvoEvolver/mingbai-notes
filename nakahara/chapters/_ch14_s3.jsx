// §14.3 单圈振幅 —— 式 (14.121)–(14.147)，习题 14.7，图 14.8，交互图 1、3、4
import { Sec, Sub, Tx, Eq, Box, Stmt, Exercise, Derivation, Figure, C } from "@kit";
import { Mod, CKV, Teich } from "./_ch14_s2a.jsx";
import { ModularInvLab, KroneckerLab, LevelMatchLab } from "./_ch14_demos.jsx";

const R = String.raw;
const QD = R`\sym{qd}{\phi}`;
const EG = R`\sym{eulerg}{\gamma}`;      // Euler 常数
const GF = R`\sym{gammaf}{\Gamma}`;      // Γ 函数
const DISC = R`\sym{disc}{\Delta}`;      // 判别式 Δ(τ)

export function Sec143() {
  return (
    <Sec n="14.3" title="One-loop amplitudes" zh="单圈振幅"
      gist={R`环面：模空间是 $H/\mathrm{SL}(2,\Z)$；CKV 是平移，体积 $\tau_2^2$；唯一的二次微分是 $a\,\dd z\otimes\dd z$，Weil–Petersson 因子 $\tau_2^{-1}$；鬼行列式与物质行列式都是平坦 Laplacian 的 $\det'\Delta$。用 Eisenstein 级数与 Kronecker 极限公式正规化得 $\det'\Delta/\tau_2=\tau_2|\eta|^4$，于是 $Z_1=\int\frac{\dd^2\tau}{\tau_2^2}\tau_2^{-12}|\eta(\tau)|^{-48}$，测度与被积函数分别模不变。`}
      why={R`这是 \secref{14.2} 全部形式机器的第一个、也是最干净的检验：每一个因子都能显式算出，结果必须与环面的参数化（$\tau$ 的模变换）无关——它确实如此，这正是第 8 章 $\mathrm{SL}(2,\Z)$ 的物理意义。`}
      gives={["14.121", "14.124", "14.127", "14.129", "14.133", "14.135", "14.136", "14.137", "14.140b", "14.141", "14.142", "14.144", "14.145", "14.147"]}>
      <Tx>{R`作为上一节所发展形式的例子，我们计算闭的、可定向玻色弦理论的单圈真空到真空振幅。由于 $\dim_{\C}${Teich}(\Sigma_1)=1$、$\dim_{\C}\ker\sym{dlow}{\nabla_z^{(-1)}}=1$，有`}</Tx>
      <Eq n="14.121" title="单圈振幅（未化简）" say={R`环面上 \eqref{14.117} 的特例：一个复模参数 $\tau$、一个复 CKV，所有行列式都变成数。`}>{R`Z_1=\int_{${Mod}}\frac{\dd\tau}{V(${CKV})}\frac{|(\mu,${QD})|^2}{(${QD},${QD})\cdot(\Phi,\Phi)}\det'\Delta^+_{(1)}\Big(\frac{\det'\Delta}{\int\dd^2\xi\,\sqrt\gamma}\Big)^{-13}.`}</Eq>
      <Tx>{R`（这里 $\dd\tau$ 表示复参数 $\tau$ 的实二维测度 $\dd^2\tau=\dd\tau_1\dd\tau_2$。）要算出 \eqref{14.121}，需要几步。`}</Tx>
      <Sub1431 />
      <Sub1432 />
    </Sec>);
}

function Sub1431() {
  return (
    <Sub n="14.3.1" title="Moduli spaces, CKV, Beltrami and quadratic differentials" zh="模空间、CKV、Beltrami 微分与二次微分">
      <p className="muted">本小节概念：<C id="moduli" /> · <C id="modular_inv" /></p>
      <Tx>{R`**模空间。**例 8.2 已说明环面的复结构（即共形结构）由一个复参数 $\tau$（$\mathrm{Im}\,\tau>0$）确定。图 8.3 画出了模空间

$$${Mod}(\Sigma_1)=\mathcal{M}_1/G=${Teich}(\Sigma_1)/\mathrm{SL}(2,\Z)=H/\mathrm{SL}(2,\Z)$$

其中 $H$ 是上半平面。取由 Teichmüller 参数 $\tau=\tau_1+\mathrm{i}\tau_2$（$\tau_2>0$）确定的环面 $T_\tau$，代表元取 \figref{14.8} 中的平行四边形（对边粘合）。$\C$ 中的度规自然诱导出一个平坦度规（单值化定理保证了这一点）：`}</Tx>
      <Eq n="14.122" say={R`环面上的平坦度规，直接从复平面继承：$\sigma=0$。`}>{R`\gamma=\tfrac12[\dd z\otimes\dd\bar z+\dd\bar z\otimes\dd z].`}</Eq>
      <Figure n="14.8" caption={R`复结构由 $\tau$ 参数化的平行四边形。`} width="45%" />
      <Tx>{R`**CKV 及其体积。**CKV 是整体定义的全纯向量场。在环面上，全纯函数只能是常数（\sref{X:max-principle}），所以 CKV 是常向量场 $\Phi=\alpha\partial/\partial z$。取它作为归一化的 CKV 基：条件 $(\Phi,\Phi)=1$ 给出 $\int\dd^2z|\alpha|^2=\tau_2|\alpha|^2=1$，即 $\alpha=\tau_2^{-1/2}$（略去了相位）。向量 $\Phi$ 生成复平面中的平移`}</Tx>
      <Eq n="14.123" say={R`环面的 CKV 就是整体平移；参数 $(v^1,v^2)$ 是平移量（按归一化的 CKV 计）。`}>{R`z\to z'=z+\tau_2^{-1/2}(v^1+\mathrm{i}v^2).`}</Eq>
      <Tx>{R`然而必须注意，平移是模格定义的：$\tau_2^{-1/2}(v^1+\mathrm{i}v^2)$ 与 $\tau_2^{-1/2}(v^1+\mathrm{i}v^2)+(m+\tau n)$ 给出同一个平移。这迫使 $\tau_2^{-1/2}(v^1+\mathrm{i}v^2)$ 位于 \figref{14.8} 的平行四边形之内。由于

$$\tau_2=\int\dd^2z=\tau_2^{-1}\int\dd^2v,$$

求得 $V(${CKV})$ 为`}</Tx>
      <Eq n="14.124" title="环面 CKV 群的体积" say={R`平移群（本身也是一个环面）的体积：以归一化 CKV 为单位量，等于 $\tau_2^2$。`}>{R`V(${CKV})=\int\dd^2v=\tau_2^2.`}</Eq>
      <Tx>{R`**Weil–Petersson 测度。**环面上有一个二次微分 $${QD}$。由于 $${QD}\in\mathcal{T}^{-2}$ 是整体定义的全纯微分（它的系数是环面上的全纯函数，只能是常数），它必有形式`}</Tx>
      <Eq n="14.125" say={R`环面上唯一（相差常数倍）的全纯二次微分：常系数的 $\dd z\otimes\dd z$。`}>{R`${QD}=a\,\dd z\otimes\dd z\qquad a\in\C.`}</Eq>
      <Tx>{R`为求 Beltrami 微分，计算 $\tau$ 作小变化时度规的变化。为此方便地引入 \figref{14.8} 中的 $\xi^\alpha$ 坐标系：点 A 对应 $(1,0)$，B 对应 $(0,1)$。于是 $z=\xi^1+\tau\xi^2$，环面就是 $\xi^\alpha$ 各自模 1 的单位正方形，所有的 $\tau$ 依赖都进入度规。Teichmüller 参数作小变化 $\delta\tau$ 时，除一个共形因子外

$$\begin{aligned}|\dd z|^2\to|\dd\xi^1+(\tau+\delta\tau)\dd\xi^2|^2&=|\dd z+\delta\tau\,\dd\xi^2|^2\\&=\Big|\dd z+\delta\tau\frac{\dd z-\dd\bar z}{2\mathrm{i}\tau_2}\Big|^2\propto\Big|\dd z+\delta\tau\frac{\mathrm{i}\,\dd\bar z}{2\tau_2}\Big|^2.\end{aligned}$$

（用了 $\dd\xi^2=(\dd z-\dd\bar z)/2\mathrm{i}\tau_2$，并把 $|1+\delta\tau/2\mathrm{i}\tau_2|^2$ 并入共形因子。）与 \eqref{14.110} 比较得`}</Tx>
      <Eq n="14.126" say={R`改变 $\tau$ 等于在 $\dd z$ 中混入一点 $\dd\bar z$：混入的比例就是 Beltrami 微分，在平坦环面上是常数 $\mathrm{i}/2\tau_2$。`}>{R`\mu_{zz}=\mathrm{i}/2\tau_2.`}</Eq>
      <Tx>{R`这里的 $(\delta\tau)\mu$ 是 \eqref{14.110} 中 $(\delta\tau)\mu$ 的复共轭。这当然只是 Teichmüller 空间的重新参数化，不影响结果；若读者对此感到别扭，可以改用 $\bar\tau$ 作 Teichmüller 参数。由 \eqref{14.125}、\eqref{14.126}，除去无关常数：

$$(\mu,${QD})=\int\dd^2z\,\sym{conj}{\overline{\mu^{zz}}}${QD}_{zz}=\frac{\mathrm{i}}{2\tau_2}a\tau_2\propto a,\qquad(${QD},${QD})=\int\dd^2z\,\sym{conj}{\overline{${QD}^{zz}}}${QD}_{zz}=|a|^2\tau_2.$$

（原书写作 $a^2\tau_2$，即取 $a$ 为实数。）最终得到`}</Tx>
      <Eq n="14.127" title="环面的 Weil–Petersson 因子" say={R`环面上的 Weil–Petersson 因子：二次微分的归一化 $a$ 消掉，只剩 $1/\tau_2$——上半平面的不变测度 $\dd^2\tau/\tau_2^2$ 的一半来源。`}>{R`\frac{|(\mu,${QD})|^2}{(${QD},${QD})}=\tau_2^{-1}.`}</Eq>
    </Sub>);
}

function Sub1432() {
  return (
    <Sub n="14.3.2" title="The evaluation of determinants" zh="行列式的计算">
      <p className="muted">本小节概念：<C id="zeta_reg" /> · <C id="modular_inv" /> · <C id="tachyon" /></p>
      <Tx>{R`**鬼行列式 = 物质行列式。**先考虑 $\det'P_1^\dagger P_1=\det'\Delta^+_{(1)}$。由于取的是平坦度规，Laplace 算子形式非常简单：`}</Tx>
      <Eq n="14.128" say={R`平坦环面上，作用在向量上的 Laplacian 与作用在函数上的 Laplacian 是同一个算子：鬼场与物质场"看见"同一个谱。`}>{R`\Delta^+_{(1)}=-2\partial_z\partial_{\bar z}=\Delta`}</Eq>
      <Tx>{R`其中 $\Delta$ 是 \eqref{14.87b} 定义的 Laplace 算子（对平坦度规 $\sigma=0$；与 \eqref{14.87b} 至多差常数因子 2，对 $\det'$ 的贡献也只是常数，见下文 $\zeta_\Delta(0)=-1$）。由于

$$\int\dd^2\xi\,\sqrt\gamma=\int\dd^2z=\tau_2,$$

振幅 \eqref{14.121} 化为`}</Tx>
      <Eq n="14.129" title="单圈振幅：因子分解形式" say={R`单圈振幅分解为三个因子：测度 $\dd\tau/\tau_2^2$（来自 CKV 体积 $\tau_2^2$）、鬼场 $\det'\Delta/\tau_2$（含 W-P 因子 $\tau_2^{-1}$）、物质 $(\det'\Delta/\tau_2)^{-13}$——每个因子都是模不变的。`}>{R`Z_1=\int_{${Mod}}\underbrace{\frac{\dd\tau}{\tau_2^2}}_{V(${CKV})}\underbrace{\frac{\det'\Delta}{\tau_2}}_{\text{W-P}}\Big(\underbrace{\frac{\det'\Delta}{\tau_2}}_{\int\dd^2z}\Big)^{-13}`}</Eq>
      <Tx>{R`这里用了 \eqref{14.124} 与 \eqref{14.127}。被积函数这样分解，模不变性便一目了然（习题 14.7）：$\det'\Delta/\tau_2$ 只依赖于环面本身（见下面的说明），$\dd\tau/\tau_2^2$ 是上半平面的 $\mathrm{SL}(2,\R)$ 不变面积元。

**环面 Laplacian 的谱。**用 $\xi^\alpha$ 坐标表示 Laplace 算子较为方便。由`}</Tx>
      <Eq n="14.130" say={R`从复坐标 $z$ 解出平行四边形坐标 $\xi^1,\xi^2$（各自模 1 周期）。`}>{R`\xi^1=\mathrm{i}(\bar\tau z-\tau\bar z)/2\tau_2\qquad\xi^2=(z-\bar z)/2\mathrm{i}\tau_2`}</Eq>
      <Tx>{R`容易求得`}</Tx>
      <Eq n="14.131" say={R`在周期坐标中，平坦 Laplacian 变成常系数的二次型，系数由 $\tau$ 决定：环面的形状全部编码在这里。`}>{R`\Delta=-\frac{1}{2\tau_2^2}[|\tau|^2(\partial_1)^2-2\tau_1\partial_1\partial_2+(\partial_2)^2]`}</Eq>
      <Derivation title={R`推导 \eqref{14.131}`} collapsed steps={[
        { tex: R`\partial_z=\frac{\partial\xi^1}{\partial z}\partial_1+\frac{\partial\xi^2}{\partial z}\partial_2=\frac{1}{2\tau_2}(\mathrm{i}\bar\tau\partial_1-\mathrm{i}\partial_2),\qquad\partial_{\bar z}=\frac{1}{2\tau_2}(-\mathrm{i}\tau\partial_1+\mathrm{i}\partial_2)`, why: R`由 \eqref{14.130}：$\partial\xi^1/\partial z=\mathrm{i}\bar\tau/2\tau_2$，$\partial\xi^2/\partial z=1/2\mathrm{i}\tau_2=-\mathrm{i}/2\tau_2$，等等。` },
        { tex: R`\partial_z\partial_{\bar z}=\frac{1}{4\tau_2^2}(\mathrm{i}\bar\tau\partial_1-\mathrm{i}\partial_2)(-\mathrm{i}\tau\partial_1+\mathrm{i}\partial_2)=\frac{1}{4\tau_2^2}[|\tau|^2\partial_1^2-(\tau+\bar\tau)\partial_1\partial_2+\partial_2^2]`, why: R`$\tau+\bar\tau=2\tau_1$。` },
        { tex: R`\Delta=-2\partial_z\partial_{\bar z}=-\frac{1}{2\tau_2^2}[|\tau|^2\partial_1^2-2\tau_1\partial_1\partial_2+\partial_2^2]` },
      ]} />
      <Tx>{R`其中 $\partial_1=\partial/\partial\xi^1$ 等。满足环面周期边界条件的本征函数为`}</Tx>
      <Eq n="14.132" say={R`环面上的平面波：在两个周期方向上各自是整数个波长。`}>{R`\psi_{m,n}(\xi)=\exp[2\pi\mathrm{i}(n\xi^1+m\xi^2)]\qquad(m,n)\in\Z^2.`}</Eq>
      <Tx>{R`代入 \eqref{14.131}（$\partial_1\to2\pi\mathrm{i}n$、$\partial_2\to2\pi\mathrm{i}m$，方括号 $\to-4\pi^2(|\tau|^2n^2-2\tau_1mn+m^2)=-4\pi^2|m-\tau n|^2$），得本征值`}</Tx>
      <Eq n="14.133" title="环面 Laplacian 的本征值" say={R`环面的谱：本征值正比于对偶格点长度的平方 $|m-\tau n|^2/\tau_2^2$。`}>{R`\lambda_{m,n}=\frac{2\pi^2}{\tau_2^2}(m-\tau n)(m-\bar\tau n).`}</Eq>
      <Tx>{R`行列式表示为无穷乘积（把 $n\to-n$）：`}</Tx>
      <Eq n="14.134" say={R`去掉零模的行列式 = 所有非零本征值之积：一个发散的无穷乘积，需要正规化。`}>{R`\det'\Delta=\prod_{m,n}{}'\frac{2\pi^2}{\tau_2^2}|m+\tau n|^2`}</Eq>
      <Tx>{R`乘积对一切整数 $(m,n)\neq(0,0)$ 进行。

**$\zeta$ 函数正规化。**显然 $\det'\Delta$ 没有良好定义，需要正规化。引入 **Eisenstein 级数**（Siegel 1980，Lang 1987）`}</Tx>
      <Eq n="14.135" title="非全纯 Eisenstein 级数" say={R`对环面的格点作"$-2s$ 次幂和"：它本质上就是环面 Laplacian 的 $\zeta$ 函数 $\zeta_\Delta(s)=(2\pi^2)^{-s}\tau_2^sE(\tau,s)$。`}>{R`E(\tau,s)\equiv\sum_{m,n}{}'\frac{\tau_2^s}{|m+\tau n|^{2s}}`}</Eq>
      <Tx>{R`求和对一切整数 $(m,n)\neq(0,0)$ 进行。这个级数在 $\mathrm{Re}\,s>1$ 时收敛，并可解析延拓到整个复 $s$ 平面。$E(\tau,s)$ 在 $s=1$ 有单极点，在那里有 Laurent 展开`}</Tx>
      <Eq n="14.136" keyEq title="Kronecker 第一极限公式" say={R`Eisenstein 级数在极点 $s=1$ 处的常数项由 Dedekind $\eta$ 函数给出：格点和的"有限部分"知道环面的全部形状信息。`}>{R`E(\tau,s)=\frac{\pi}{s-1}+2\pi[${EG}-\ln2-\ln(\sqrt{\tau_2}|\eta(\tau)|^2)]+\mathcal{O}(s-1).`}</Eq>
      <Tx>{R`这称为 **Kronecker 第一极限公式**，对我们的目的至关重要。\eqref{14.136} 中 $${EG}=0.57721\ldots$ 是 Euler 常数，$\eta(\tau)$ 是 **Dedekind $\eta$ 函数**：`}</Tx>
      <Eq n="14.137" title={R`Dedekind $\eta$ 函数`} say={R`$\eta$ 函数：$q^{1/24}$ 乘以 $(1-q^n)$ 对所有正整数 $n$ 的乘积，$q=\mathrm{e}^{2\pi\mathrm{i}\tau}$。$\eta^{-24}$ 正是 24 个横向振子的配分函数。`}>{R`\eta(\tau)\equiv\mathrm{e}^{\mathrm{i}\pi\tau/12}\prod_{n\ge1}(1-\mathrm{e}^{2\mathrm{i}\pi n\tau}).`}</Eq>
      <Box kind="warning" title={R`勘误：$\eta$ 函数的乘积下限（p.578）`}>{R`原书 \eqref{14.137} 的乘积下限印作 $n>1$。Dedekind $\eta$ 函数的乘积从 $n=1$ 开始；去掉 $n=1$ 的因子 $(1-q)$ 后，\eqref{14.136} 与变换律 \eqref{14.147} 都不再成立（例如 $\eta(\mathrm{i})=\Gamma(\frac14)/2\pi^{3/4}=0.76823$ 要求包含 $n=1$）。正文已改为 $n\ge1$；交互图 1、3 中的数值都按 $n\ge1$ 计算。`}</Box>
      <Stmt id="X:kronecker14" />
      <Tx>{R`**从 Eisenstein 级数到行列式。**略去常数因子：`}</Tx>
      <Eq n="14.138" say={R`$\zeta$ 函数正规化：$\ln\det'=-\zeta'(0)$；分出的 $-\ln\tau_2$ 来自面积，$E(\tau,0)$ 与 $E'(\tau,0)$ 待求。`}>{R`\begin{aligned}\frac{\det'\Delta}{\tau_2}&=\exp\Big(-\ln\tau_2+\sum{}'\ln\frac{|m+\tau n|^2}{\tau_2^2}\Big)\\&=\exp\Big(-\ln\tau_2-\frac{\partial}{\partial s}[\tau_2^sE(\tau,s)]\Big|_{s=0}\Big)\\&=\exp\{-\ln\tau_2[1+E(\tau,0)]-E'(\tau,0)\}.\end{aligned}`}</Eq>
      <Tx>{R`（第二个等号：$\tau_2^sE(\tau,s)=\sum'(|m+\tau n|^2/\tau_2^2)^{-s}$，而"$\sum'\ln\lambda=-\frac{\dd}{\dd s}\sum'\lambda^{-s}|_{s=0}$"正是 $\zeta$ 函数正规化的定义。）为求指数，利用函数方程`}</Tx>
      <Eq n="14.139" say={R`Eisenstein 级数的函数方程：$s\leftrightarrow1-s$ 对称，把未知的 $s=0$ 附近与已知的 $s=1$ 附近联系起来。`}>{R`\pi^{-s}${GF}(s)E(\tau,s)=\pi^{-(1-s)}${GF}(1-s)E(\tau,1-s).`}</Eq>
      <Tx>{R`在 \eqref{14.139} 中取 $s\to0$（$s${GF}(s)=${GF}(1+s)$）：

$$\begin{aligned}sE(\tau,1-s)&=\pi^{1-2s}\frac{${GF}(1+s)}{${GF}(1-s)}E(\tau,s)\\&=\pi(1-2s\ln\pi+\cdots)\frac{(1-${EG}s+\cdots)}{(1+${EG}s+\cdots)}[E(\tau,0)+E'(\tau,0)s+\cdots]\\&=\pi E(\tau,0)+[-2(\ln\pi+${EG})E(\tau,0)+E'(\tau,0)]\pi s+\cdots.\end{aligned}$$

另一方面，由 \eqref{14.136}（把 $s$ 换成 $1-s$）

$$sE(\tau,1-s)=-\pi+2\pi s[${EG}-\ln2-\ln(\sqrt{\tau_2}|\eta(\tau)|^2)]+\cdots.$$

比较 $s^0$ 与 $s^1$ 的系数，得`}</Tx>
      <Eq n="14.140a" say={R`$E(\tau,0)=-1$ 与 $\tau$ 无关：环面 Laplacian 的 $\zeta(0)=-1$（等于"$-$零模数"）。`}>{R`E(\tau,0)=-1`}</Eq>
      <Eq n="14.140b" title={R`$E'(\tau,0)$`} say={R`$\zeta$ 函数在 0 处的导数——正规化行列式的对数——由 $\eta$ 函数给出。`}>{R`E'(\tau,0)=-2[\ln2\pi+\ln(\sqrt{\tau_2}|\eta(\tau)|^2)].`}</Eq>
      <Derivation title="补：比较系数的两行代数" collapsed steps={[
        { tex: R`s^0:\quad\pi E(\tau,0)=-\pi\ \Rightarrow\ E(\tau,0)=-1` },
        { tex: R`s^1:\quad\pi[2(\ln\pi+${EG})+E'(\tau,0)]=2\pi[${EG}-\ln2-\ln(\sqrt{\tau_2}|\eta|^2)]`, why: R`代入 $E(\tau,0)=-1$。` },
        { tex: R`E'(\tau,0)=-2\ln\pi-2\ln2-2\ln(\sqrt{\tau_2}|\eta|^2)=-2[\ln2\pi+\ln(\sqrt{\tau_2}|\eta|^2)]`, why: R`Euler 常数 $\gamma$ 相消。` },
      ]} />
      <Tx>{R`把 \eqref{14.140a} 代入 \eqref{14.138}（$1+E(\tau,0)=0$，面积项正好消去），得`}</Tx>
      <Eq n="14.141" keyEq title="环面 Laplacian 的正规化行列式" say={R`正规化的行列式除以面积等于 $\tau_2|\eta(\tau)|^4$（常数 $(2\pi)^2$ 除外）：一个显式的、模不变的环面不变量。`}>{R`\frac{\det'\Delta}{\tau_2}=\exp[-E'(\tau,0)]=\tau_2|\eta(\tau)|^4.`}</Eq>
      <Box kind="physics" title={R`为什么 $\det'\Delta/\tau_2$ 是模不变的——不用任何特殊函数`}>
        <Tx>{R`$\tau'=(a\tau+b)/(c\tau+d)$ 给出的环面 $\C/(\Z+\tau'\Z)$ 与 $\C/(\Z+\tau\Z)$ 只差一个整体缩放：乘以 $(c\tau+d)$ 把格 $\Z+\tau'\Z$ 映成 $\Z(c\tau+d)+\Z(a\tau+b)=\Z+\tau\Z$。缩放 $|c\tau+d|^{-1}$ 使谱乘以 $|c\tau+d|^2$、面积乘以 $|c\tau+d|^{-2}$（$\tau_2'=\tau_2/|c\tau+d|^2$）。$\zeta$ 正规化下 $\det'(\kappa\Delta)=\kappa^{\zeta_\Delta(0)}\det'\Delta=\kappa^{-1}\det'\Delta$（\eqref{14.140a}），所以 $\det'\Delta/\tau_2$ 恰好不变。交互图 1 会显示两边谱 $\times$ 面积完全相同。这就是原书说"因式分解使模不变性一目了然"的含义，也给出 $|\eta(-1/\tau)|=|\tau|^{1/2}|\eta(\tau)|$ 的一个证明（习题 14.7）。`}</Tx>
      </Box>
      <Tx>{R`**最终结果。**由 \eqref{14.129} 与 \eqref{14.141}：`}</Tx>
      <Stmt id="F:Z114">
        <Eq n="14.142" keyEq title="闭玻色弦的单圈振幅" say={R`玻色弦单圈振幅：在模空间（基本区域）上对不变测度 $\dd^2\tau/\tau_2^2$ 积分，被积函数 $\tau_2^{-12}|\eta|^{-48}$——24 个横向振子的配分函数（左、右行各 $\eta^{-24}$）乘以动量积分的 $\tau_2^{-12}$。`}>{R`Z_1=\int_{${Mod}}\frac{\dd\tau}{\tau_2^2}\tau_2^{-12}|\eta(\tau)|^{-48}.`}</Eq>
      </Stmt>
      <Tx>{R`定义**判别式**（discriminant）可以得到 $Z_1$ 的一个简洁形式：`}</Tx>
      <Eq n="14.143" say={R`判别式：$\eta$ 的 24 次方（乘以常数）。它是权 12 的尖点形式。`}>{R`${DISC}(\tau)\equiv(2\pi)^{12}\eta(\tau)^{24}.`}</Eq>
      <Tx>{R`除去一个无关常数，单圈振幅为`}</Tx>
      <Eq n="14.144" title="单圈振幅：判别式形式" say={R`单圈振幅由权 12 的尖点形式（判别式）完全决定。`}>{R`Z_1=\int_{${Mod}}\frac{\dd\tau}{\tau_2^2}\tau_2^{-12}|${DISC}(\tau)|^{-2}.`}</Eq>
      <Tx>{R`$${DISC}(\tau)$ 称为权 12 的**尖点形式**（cusp form），意思是`}</Tx>
      <Eq n="14.145" title="权 12 的模形式" say={R`在模变换下判别式只乘以 $(c\tau+d)^{12}$：它是权 12 的模形式；配合 $\tau_2^{-12}$ 的变换 $|c\tau+d|^{24}$，被积函数整体不变。`}>{R`${DISC}\Big(\frac{a\tau+b}{c\tau+d}\Big)=(c\tau+d)^{12}${DISC}(\tau)`}</Eq>
      <Tx>{R`且 $c(0)=0$，其中 $c(n)$ 是 Fourier 系数：`}</Tx>
      <Eq n="14.146" say={R`判别式的 $q$ 展开：常数项为零（"尖点形式"），$q^1$ 的系数是 $(2\pi)^{12}$，之后是 Ramanujan $\tau$ 函数。`}>{R`${DISC}(\tau)=\sum_{n\ge0}c(n)\mathrm{e}^{2\pi n\mathrm{i}\tau}.`}</Eq>
      <Tx>{R`（由 \eqref{14.137}，$${DISC}=(2\pi)^{12}q\prod(1-q^n)^{24}=(2\pi)^{12}(q-24q^2+252q^3-\cdots)$，确实 $c(0)=0$。）更高亏格的振幅由其他权的尖点形式给出，见 Belavin–Knizhnik (1986)、Moore (1986)、Gilbert (1986)、Morozov (1987)。`}</Tx>
      <ModularInvLab />
      <Exercise n="14.7" title={R`$\eta$ 的模变换与单圈被积函数的模不变性`} level="★★"
        hint={R`第一式直接由乘积。第二式：(i) 用上面"为什么 $\det'\Delta/\tau_2$ 模不变"的论证与 \eqref{14.141} 先得 $|\eta(-1/\tau)|=|\tau|^{1/2}|\eta(\tau)|$；(ii) $h(\tau)=\eta(-1/\tau)/[(-\mathrm{i}\tau)^{1/2}\eta(\tau)]$ 在 $H$ 上全纯（$\eta$ 无零点）、$|h|\equiv1$，故为常数；取 $\tau=\mathrm{i}$。最后数 $\tau_2$ 与 $|\eta|$ 的幂次。`}
        solution={R`**(1) $\tau\to\tau+1$。**$\mathrm{e}^{2\pi\mathrm{i}n(\tau+1)}=\mathrm{e}^{2\pi\mathrm{i}n\tau}$，乘积不变；前因子 $\mathrm{e}^{\mathrm{i}\pi(\tau+1)/12}=\mathrm{e}^{\pi\mathrm{i}/12}\mathrm{e}^{\mathrm{i}\pi\tau/12}$。故 $\eta(\tau+1)=\mathrm{e}^{\pi\mathrm{i}/12}\eta(\tau)$。

**(2) $\tau\to-1/\tau$。**(i) 模长。$-1/\tau$ 的格 $\Z+(-1/\tau)\Z=\tau^{-1}(\Z\tau+\Z)$ 是原格缩放 $1/|\tau|$（并转动）后的格，所以平坦环面 $T_{-1/\tau}$ 与 $T_\tau$ 相似，谱 $\lambda'=|\tau|^2\lambda$、面积 $\tau_2'=\tau_2/|\tau|^2$。由 $\zeta_\Delta(0)=E(\tau,0)=-1$，$\det'\Delta'=(|\tau|^2)^{-1}\det'\Delta$，于是 $\det'\Delta'/\tau_2'=\det'\Delta/\tau_2$。代入 \eqref{14.141}：$\frac{\tau_2}{|\tau|^2}|\eta(-1/\tau)|^4=\tau_2|\eta(\tau)|^4$，即 $|\eta(-1/\tau)|=|\tau|^{1/2}|\eta(\tau)|$。

(ii) 相位。乘积 \eqref{14.137} 在 $H$ 上绝对收敛且每个因子不为零，故 $\eta$ 全纯无零点。令 $h(\tau)=\eta(-1/\tau)/[(-\mathrm{i}\tau)^{1/2}\eta(\tau)]$，其中 $(-\mathrm{i}\tau)^{1/2}$ 取主支（$-\mathrm{i}\tau$ 在右半平面，主支全纯，正实数取正根）。$h$ 在 $H$ 上全纯，由 (i) $|h|\equiv1$；由最大模原理 $h$ 为常数。取 $\tau=\mathrm{i}$：$-1/\tau=\mathrm{i}$，$(-\mathrm{i}\cdot\mathrm{i})^{1/2}=1$，$h(\mathrm{i})=1$。故 $\eta(-1/\tau)=(-\mathrm{i}\tau)^{1/2}\eta(\tau)$。

（另一种标准证明：对 $\ln\eta$ 求导得 $\frac{\eta'}{\eta}=\frac{\pi\mathrm{i}}{12}E_2(\tau)$，再用 $E_2$ 的准模性 $E_2(-1/\tau)=\tau^2E_2(\tau)+\frac{12\tau}{2\pi\mathrm{i}}$ 积分。）

**(3) 测度的不变性。**$T$：$\tau_2$ 与 $\dd^2\tau$ 都不变。$S$：$\tau'=-1/\tau$，$\dd\tau'/\dd\tau=\tau^{-2}$，故 $\dd^2\tau'=|\tau|^{-4}\dd^2\tau$；$\tau_2'=\tau_2/|\tau|^2$，故 $\dd^2\tau'/\tau_2'^2=\dd^2\tau/\tau_2^2$。（一般地 $\dd^2\tau/\tau_2^2$ 是 Poincaré 度规 $|\dd\tau|^2/\tau_2^2$ 的面积元，在整个 $\mathrm{SL}(2,\R)$ 下不变。）

**(4) 被积函数的不变性。**$T$：$|\eta(\tau+1)|=|\eta(\tau)|$，$\tau_2$ 不变。$S$：$\tau_2'^{-12}|\eta(-1/\tau)|^{-48}=\big(\frac{\tau_2}{|\tau|^2}\big)^{-12}\big(|\tau|^{1/2}|\eta(\tau)|\big)^{-48}=|\tau|^{24}|\tau|^{-24}\tau_2^{-12}|\eta(\tau)|^{-48}$。两个 $|\tau|^{24}$ 相消。因为 $T$、$S$ 生成 $\mathrm{SL}(2,\Z)$，两者分别在整个模群下不变。

（顺带：$\Delta=(2\pi)^{12}\eta^{24}$ 满足 $\Delta(\tau+1)=\mathrm{e}^{2\pi\mathrm{i}}\Delta=\Delta$，$\Delta(-1/\tau)=(-\mathrm{i}\tau)^{12}\Delta=\tau^{12}\Delta$，即 \eqref{14.145}。）`}>
        <Tx>{R`证明`}</Tx>
        <Eq n="14.147" keyEq title={R`$\eta$ 的模变换`} say={R`$\eta$ 在 $T$ 下只乘一个 24 次单位根，在 $S$ 下乘以 $(-\mathrm{i}\tau)^{1/2}$：它是权 $\frac12$ 的（带乘子的）模形式。`}>{R`\eta(\tau+1)=\mathrm{e}^{\pi\mathrm{i}/12}\eta(\tau)\qquad\eta(-1/\tau)=(-\mathrm{i}\tau)^{1/2}\eta(\tau)`}</Eq>
        <Tx>{R`其中分支取为 $z>0$ 时 $\sqrt z>0$。用这一结果证明 $\dd\tau/\tau_2^2$ 与 $\tau_2^{-12}|\eta(\tau)|^{-48}$ 在 $\tau\to\tau+1$、$\tau\to-1/\tau$ 下各自不变。`}</Tx>
      </Exercise>
      <Stmt id="F:modinv14" />
      <KroneckerLab />
      <Box kind="physics" title={R`被积函数在说什么：迅子、无质量态与能级匹配`}>
        <Tx>{R`用 $q=\mathrm{e}^{2\pi\mathrm{i}\tau}$ 展开：$\eta(\tau)^{-24}=q^{-1}\prod_n(1-q^n)^{-24}=q^{-1}\sum_{N\ge0}d_Nq^N$，$d_N=1,24,324,3200,25650,\ldots$ 是 24 个横向振子在能级 $N$ 的态数。于是

$$\tau_2^{-12}|\eta|^{-48}=\tau_2^{-12}\sum_{N,\tilde N}d_Nd_{\tilde N}\,q^{N-1}\bar q^{\tilde N-1}.$$

对 $\tau_1\in[-\frac12,\frac12]$ 积分（基本区域在 $\tau_2>1$ 的部分正是这个条带）只留下 $N=\tilde N$ 的项——**能级匹配**（level matching），每项 $\propto\mathrm{e}^{-4\pi\tau_2(N-1)}$，对应质量 $\frac{\alpha'}{4}m^2=N-1$ 的闭弦态：$N=0$ 是**迅子**（tachyon，$m^2<0$），$N=1$ 是 $24^2=576$ 个无质量态（引力子、Kalb–Ramond 场、伸缩子），……。$\tau_2\to\infty$ 时迅子项 $\sim\mathrm{e}^{4\pi\tau_2}\tau_2^{-14}$ 使 $Z_1$ 发散——这是玻色弦的著名病态，超弦的 GSO 投影去掉了它。$\tau_2^{-12}$ 则来自 24 个横向方向的连续动量积分。（这一段是本站补充的物理解读，原书未讨论；交互图 4 数值验证能级匹配。）`}</Tx>
      </Box>
      <LevelMatchLab />
    </Sub>);
}
