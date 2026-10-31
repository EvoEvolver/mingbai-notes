// §1.2 正则量子化 —— 式 (1.26)–(1.78)，引理 1.1，命题 1.1，习题 1.2–1.4
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Derivation, Exercise, C } from "@kit";

const R = String.raw;

export function Sec12() {
  return (
    <Sec n="1.2" title="Canonical quantization" zh="正则量子化"
      gist={R`态是复 Hilbert 空间中的矢量（射线），物理量是 Hermite 算符，Poisson 括号换成 $-\mathrm{i}$ 乘对易子：$[\hat q_i,\hat p_j]=\mathrm{i}\delta_{ij}$。由此得到 Heisenberg / Schrödinger 两种绘景、波函数与 $\hat p=-\mathrm{i}\,\dd/\dd x$，并用升降算符解出谐振子谱 $E_n=(n+\tfrac12)\omega$。`}
      why={R`路径积分（§1.3）要从算符形式的跃迁振幅 $\langle x_f|\mathrm{e}^{-\mathrm{i}\hat H(t_f-t_i)}|x_i\rangle$ 出发；完备性关系 $\int\dd x\,|x\rangle\langle x|=I$、$\langle x|p\rangle=\mathrm{e}^{\mathrm{i}px}/\sqrt{2\pi}$ 是把它切成小段的两件工具。`}
      gives={["1.30", "1.32", "1.34", "1.42", "1.50", "1.55", "1.58", "1.66", "1.72", "1.74"]}>
      <Tx>{R`到 19 世纪末，人们已经知道经典物理——Newton 力学与经典电磁学——包含严重的矛盾。20 世纪初，狭义与广义相对论以及量子力学的发现解决了这些矛盾。迄今没有任何实验与量子论相矛盾。但令人惊讶的是，量子论并没有"证明"：我们能说的只是它与自然界不矛盾。因此这里不"证明"量子力学，而是概述量子论所依据的若干**规则**。`}</Tx>

      <Sub n="1.2.1" title="Hilbert space, bras and kets" zh="Hilbert 空间、左矢与右矢">
        <p className="muted">本小节概念：<C id="canonical_q" /></p>
        <Tx>{R`考虑一个复 Hilbert 空间`}</Tx>
        <Eq n="1.26" say={R`量子系统的舞台：一个复 Hilbert 空间，它的元素（右矢）就是可能的量子态。`}>{R`\mathcal{H}=\{|\phi\rangle,|\psi\rangle,\ldots\}.`}</Eq>
        <Tx>{R`$\mathcal{H}$ 的元素称为**右矢**（ket 或 ket vector）。（量子力学里 Hilbert 空间常指流形 $M$ 上平方可积函数的空间 $L^2(M)$。但下面需要处理 $\delta(x)$、$\mathrm{e}^{\mathrm{i}kx}$ 这类范数无穷大的函数；包含它们的扩充空间称为装备 Hilbert 空间（rigged Hilbert space）。这里的处理在数学上不严格，但不会带来不便。）

线性函数 $\alpha:\mathcal{H}\to\mathbb{C}$ 满足

$$\alpha(c_1|\psi_1\rangle+c_2|\psi_2\rangle)=c_1\alpha(|\psi_1\rangle)+c_2\alpha(|\psi_2\rangle)\qquad\forall c_i\in\mathbb{C},\ |\psi_i\rangle\in\mathcal{H}.$$

采用 Dirac 引入的记号，把线性函数写成 $\langle\alpha|$，作用写成 $\langle\alpha|\psi\rangle\in\mathbb{C}$。线性函数的全体本身是向量空间，称为 $\mathcal{H}$ 的**对偶空间**（dual vector space），记作 $\mathcal{H}^*$；其元素称为**左矢**（bra 或 bra vector）。

设 $\{|e_1\rangle,|e_2\rangle,\ldots\}$ 是 $\mathcal{H}$ 的一组基（假定 $\mathcal{H}$ 可分，基至多可数；注意此时还不能要求正交归一，因为还没有定义范数）。任何 $|\psi\rangle\in\mathcal{H}$ 展开为 $|\psi\rangle=\sum_k\psi_k|e_k\rangle$，$\psi_k\in\mathbb{C}$ 称为 $|\psi\rangle$ 的第 $k$ 个分量。在 $\mathcal{H}^*$ 中引入基 $\{\langle\varepsilon_1|,\langle\varepsilon_2|,\ldots\}$，要求它是 $\{|e_k\rangle\}$ 的**对偶基**（dual basis）：`}</Tx>
        <Eq n="1.27" say={R`对偶基的定义：第 $i$ 个左矢基作用在第 $j$ 个右矢基上，相同给 1，不同给 0。`}>{R`\langle\varepsilon_i|e_j\rangle=\delta_{ij}.`}</Eq>
        <Tx>{R`于是任意线性函数展开为 $\langle\alpha|=\sum_k\alpha_k\langle\varepsilon_k|$，$\alpha_k\in\mathbb{C}$ 为其第 $k$ 个分量，作用写成分量形式：`}</Tx>
        <Eq n="1.28" say={R`左矢作用于右矢，用分量写就是"行向量乘列向量"：对应分量相乘再求和。`}>{R`\langle\alpha|\psi\rangle=\sum_{ij}\alpha_i\psi_j\langle\varepsilon_i|e_j\rangle=\sum_{ij}\alpha_i\psi_j\delta_{ij}=\sum_i\alpha_i\psi_i.`}</Eq>
        <Tx>{R`可以把 $|\psi\rangle$ 看作列向量、$\langle\alpha|$ 看作行向量，$\langle\alpha|\psi\rangle$ 就是行向量乘列向量得到的数。

**内积。**$\mathcal{H}$ 与 $\mathcal{H}^*$ 之间可以建立一一对应：固定基 $\{|e_k\rangle\}$ 与 $\{\langle\varepsilon_k|\}$，与 $|\psi\rangle=\sum_k\psi_k|e_k\rangle$ 对应的是 $\langle\psi|=\sum_k\psi_k^*\langle\varepsilon_k|\in\mathcal{H}^*$（取复共轭的理由马上就清楚）。由此定义 $\mathcal{H}$ 中两个元素 $|\phi\rangle,|\psi\rangle$ 的**内积**（inner product）`}</Tx>
        <Eq n="1.29" say={R`内积：把第一个右矢变成左矢（分量取复共轭）再作用于第二个；复共轭保证 $\langle\psi|\psi\rangle\ge0$。`}>{R`(|\phi\rangle,|\psi\rangle)\equiv\langle\phi|\psi\rangle=\sum_k\phi_k^*\psi_k.`}</Eq>
        <Tx>{R`我们习惯用同一个字母表示对应的左矢和右矢。**范数**由内积自然定义：$\||\psi\rangle\|=\sqrt{\langle\psi|\psi\rangle}$，它满足范数的全部公理；正是左矢分量中的复共轭使范数是非负实数。

有了内积，就能构造正交归一基 $\{|e_k\rangle\}$：$(|e_i\rangle,|e_j\rangle)=\langle e_i|e_j\rangle=\delta_{ij}$。设 $|\psi\rangle=\sum_k\psi_k|e_k\rangle$，左乘 $\langle e_k|$ 得 $\langle e_k|\psi\rangle=\psi_k$，于是 $|\psi\rangle=\sum_k\langle e_k|\psi\rangle|e_k\rangle=\sum_k|e_k\rangle\langle e_k|\psi\rangle$。这对任何 $|\psi\rangle$ 都成立，所以得到**完备性关系**（completeness relation）`}</Tx>
        <Eq n="1.30" title="完备性关系" say={R`把所有正交归一基矢的投影算符加起来就是恒等算符：在任何表达式中都可以"插入一组完备基"。`}>{R`\sum_k|e_k\rangle\langle e_k|=I,`}</Eq>
        <Tx>{R`$I$ 是 $\mathcal{H}$ 中的恒等算符（$\mathcal{H}$ 有限维时就是单位矩阵）。`}</Tx>
      </Sub>

      <Sub n="1.2.2" title="Axioms of canonical quantization" zh="正则量子化的公理">
        <p className="muted">本小节概念：<C id="canonical_q" /></p>
        <Tx>{R`给定一个孤立的经典动力学系统（例如谐振子），可以按照下面一组公理构造对应的量子系统。

**A1.**量子系统有一个 Hilbert 空间 $\mathcal{H}$，系统的状态由矢量 $|\psi\rangle\in\mathcal{H}$ 描述，因此 $|\psi\rangle$ 也称为**态**或**态矢量**（state vector）。$|\psi\rangle$ 与 $c|\psi\rangle$（$c\in\mathbb{C}$，$c\neq0$）描述同一个态：态是 $\mathcal{H}$ 的**射线表示**（ray representation）。

**A2.**经典力学中的物理量 $A$ 换成作用于 $\mathcal{H}$ 的 Hermite 算符 $\hat A$（算符记号 $\hat{}$ 在不致混淆时以后省略），称为**可观测量**（observable）。测量 $A$ 的结果是 $\hat A$ 的某个本征值（Hermite 性保证本征值为实数）。

**A3.**经典力学中的 Poisson 括号换成**对易子**（commutator）`}</Tx>
        <Eq n="1.31" say={R`对易子：两个算符按两种顺序相乘之差，衡量它们"不可交换"的程度。`}>{R`[\hat A,\hat B]\equiv\hat A\hat B-\hat B\hat A`}</Eq>
        <Tx>{R`乘以 $-\mathrm{i}/\hbar$。以后除非特别说明，采用 $\hbar=1$ 的单位制。基本对易关系为（对照 \eqref{1.22}）`}</Tx>
        <Eq n="1.32" keyEq title="正则对易关系" say={R`正则量子化的核心：坐标之间、动量之间对易，同一自由度的坐标与动量不对易，对易子为 $\mathrm{i}$（即 $\mathrm{i}\hbar$）。`}>{R`[\hat q_i,\hat q_j]=[\hat p_i,\hat p_j]=0\qquad[\hat q_i,\hat p_j]=\mathrm{i}\delta_{ij}.`}</Eq>
        <Tx>{R`在这个替换下，Hamilton 运动方程 \eqref{1.24} 变为`}</Tx>
        <Eq n="1.33" say={R`量子版的正则方程：坐标与动量算符的变化率等于它们与 Hamilton 量的对易子除以 $\mathrm{i}$。`}>{R`\frac{\dd\hat q_i}{\dd t}=\frac{1}{\mathrm{i}}[\hat q_i,H]\qquad\frac{\dd\hat p_i}{\dd t}=\frac{1}{\mathrm{i}}[\hat p_i,H].`}</Eq>
        <Tx>{R`经典量 $A$ 不显含 $t$ 时，它满足与 Hamilton 方程相同形式的方程 \eqref{1.23}。类比地，对不显含 $t$ 的 $\hat A$，有 **Heisenberg 运动方程**：`}</Tx>
        <Eq n="1.34" title="Heisenberg 方程" say={R`Heisenberg 方程：算符的时间变化由它与 Hamilton 量的对易子决定，是 \eqref{1.23} 的量子版本。`}>{R`\frac{\dd\hat A}{\dd t}=\frac{1}{\mathrm{i}}[\hat A,\hat H].`}</Eq>
        <Tx>{R`**A4.**设 $|\psi\rangle\in\mathcal{H}$ 为任意态。制备许多个都处在这个态的系统，在时刻 $t$ 测量 $A$，一般得到随机的结果，其期望值为`}</Tx>
        <Eq n="1.35" say={R`期望值：大量相同制备的系统上测量 $A$ 的平均结果，等于算符夹在态矢中间、再除以态的模方。`}>{R`\langle A\rangle_t=\frac{\langle\psi|\hat A(t)|\psi\rangle}{\langle\psi|\psi\rangle}.`}</Eq>
        <Tx>{R`**A5.**对任何物理态 $|\psi\rangle\in\mathcal{H}$，都存在一个算符以 $|\psi\rangle$ 为本征态。（这条公理在文献中常被忽略，其存在理由见下文。）

这五条公理就是"游戏规则"。下面作几点评论。

**仔细看 A4。**为简单起见设 $|\psi\rangle$ 归一化：$\||\psi\rangle\|^2=\langle\psi|\psi\rangle=1$。设 $\hat A(t)$ 有离散本征值 $\{a_n\}$ 与对应的归一化本征矢 $\{|n\rangle\}$（$\hat A$ 是 Hermite 的，总可以取 $\{|n\rangle\}$ 为正交归一）：$\hat A(t)|n\rangle=a_n|n\rangle$，$\langle n|n\rangle=1$。对任意态 $|\psi\rangle=\sum_n\psi_n|n\rangle$（$\psi_n=\langle n|\psi\rangle$），期望值为

$$\langle\psi|\hat A(t)|\psi\rangle=\sum_{m,n}\psi_m^*\psi_n\langle m|\hat A(t)|n\rangle=\sum_na_n|\psi_n|^2.$$

在态 $|n\rangle$ 中测量 $A$ 的结果总是 $a_n$，所以测得 $a_n$ 的概率——即 $|\psi\rangle$ 处于 $|n\rangle$ 的概率——是 $|\psi_n|^2=|\langle n|\psi\rangle|^2$。数 $\langle n|\psi\rangle$ 代表态 $|n\rangle$ 在 $|\psi\rangle$ 中的"权重"，称为**概率幅**（probability amplitude）。

**连续谱。**若 $\hat A$ 有连续谱 $a$，态展开为 $|\psi\rangle=\int\dd a\,\psi(a)|a\rangle$，完备性关系变为`}</Tx>
        <Eq n="1.36" say={R`连续谱的完备性关系：求和换成积分。`}>{R`\int\dd a\,|a\rangle\langle a|=I.`}</Eq>
        <Tx>{R`由恒等式 $\int\dd a'\,|a'\rangle\langle a'|a\rangle=|a\rangle$，必须有归一化`}</Tx>
        <Eq n="1.37" say={R`连续本征矢只能"归一化到 $\delta$ 函数"：不同本征值正交，相同本征值的内积发散。`}>{R`\langle a'|a\rangle=\delta(a'-a),`}</Eq>
        <Tx>{R`$\delta(a)$ 是 **Dirac $\delta$ 函数**。由此得展开系数 $\psi(a)=\langle a|\psi\rangle$。若 $\langle\psi|\psi\rangle=1$，则

$$1=\int\dd a\,\dd a'\,\psi^*(a)\psi(a')\langle a|a'\rangle=\int\dd a\,|\psi(a)|^2.$$

再由 $\langle\psi|\hat A|\psi\rangle=\int a|\psi(a)|^2\,\dd a$ 可知，测得 $A$ 的值落在 $[a,a+\dd a]$ 中的概率是 $|\psi(a)|^2\,\dd a$，所以概率密度为`}</Tx>
        <Eq n="1.38" say={R`连续谱的概率密度：本征矢上的概率幅取模方。`}>{R`\rho(a)=|\langle a|\psi\rangle|^2.`}</Eq>
        <Tx>{R`**为什么需要 A5。**设系统处于 $|\psi\rangle$，并假定它"同时处于" $|\phi\rangle$ 的概率是 $|\langle\psi|\phi\rangle|^2$。当 $|\phi\rangle$ 是某个可观测量的本征态时，上面已经说明了这一点；A5 断言这对任意态都成立。`}</Tx>
      </Sub>

      <Sub n="1.2.3" title="Heisenberg equation, Heisenberg picture and Schrödinger picture" zh="Heisenberg 方程、Heisenberg 绘景与 Schrödinger 绘景">
        <Tx>{R`Heisenberg 运动方程 $\dd\hat A/\dd t=\tfrac{1}{\mathrm{i}}[\hat A,\hat H]$ 的形式解很容易得到：`}</Tx>
        <Eq n="1.39" say={R`Heisenberg 绘景中算符的时间演化：用 $\mathrm{e}^{\pm\mathrm{i}\hat Ht}$ 把初始算符"夹"起来。`}>{R`\hat A(t)=\mathrm{e}^{\mathrm{i}\hat Ht}\hat A(0)\mathrm{e}^{-\mathrm{i}\hat Ht}.`}</Eq>
        <Tx>{R`（验证：对 $t$ 求导得 $\mathrm{i}\hat H\hat A(t)-\hat A(t)\mathrm{i}\hat H=\tfrac1{\mathrm{i}}[\hat A(t),\hat H]$。）所以 $\hat A(t)$ 与 $\hat A(0)$ 由幺正算符`}</Tx>
        <Eq n="1.40" title="时间演化算符" say={R`时间演化算符：Hamilton 量的指数，幺正，保持概率。`}>{R`\hat U(t)=\mathrm{e}^{-\mathrm{i}\hat Ht}`}</Eq>
        <Tx>{R`联系起来，是幺正等价的。算符依赖于 $t$ 而态不依赖于 $t$ 的这种表述称为 **Heisenberg 绘景**（Heisenberg picture）。

还可以引入一个与之等价的绘景。把 $\hat A$ 在态 $|\psi\rangle$ 中的期望值写成

$$\langle\hat A(t)\rangle=\langle\psi|\mathrm{e}^{\mathrm{i}\hat Ht}\hat A(0)\mathrm{e}^{-\mathrm{i}\hat Ht}|\psi\rangle=(\langle\psi|\mathrm{e}^{\mathrm{i}\hat Ht})\hat A(0)(\mathrm{e}^{-\mathrm{i}\hat Ht}|\psi\rangle).$$

记 $|\psi(t)\rangle\equiv\mathrm{e}^{-\mathrm{i}\hat Ht}|\psi\rangle$，期望值也可写成`}</Tx>
        <Eq n="1.41" say={R`同一个期望值的另一种算法：让态随时间演化、算符固定不动。`}>{R`\langle\hat A(t)\rangle=\langle\psi(t)|\hat A(0)|\psi(t)\rangle.`}</Eq>
        <Tx>{R`在这种表述中态依赖于 $t$ 而算符不依赖，称为 **Schrödinger 绘景**（Schrödinger picture）。

接下来求 $|\psi(t)\rangle$ 满足的运动方程。为避免混淆，Schrödinger 绘景（Heisenberg 绘景）中的量加下标 S（H）：$|\psi(t)\rangle_{\rm S}=\mathrm{e}^{-\mathrm{i}\hat Ht}|\psi\rangle_{\rm H}$，$\hat A_{\rm S}=\hat A_{\rm H}(0)$。对 $|\psi(t)\rangle_{\rm S}$ 求时间导数即得 **Schrödinger 方程**：`}</Tx>
        <Eq n="1.42" keyEq title="Schrödinger 方程" say={R`Schrödinger 方程：态矢的时间变化率（乘 $\mathrm{i}$）等于 Hamilton 量作用于它；Hamilton 量是时间平移的生成元。`}>{R`\mathrm{i}\frac{\dd}{\dd t}|\psi(t)\rangle_{\rm S}=\hat H|\psi(t)\rangle_{\rm S}.`}</Eq>
        <Tx>{R`注意 Hamilton 量 $\hat H$ 在两个绘景中相同（它与 $\mathrm{e}^{\pm\mathrm{i}\hat Ht}$ 对易）。不致混淆时下标 S、H 以后省略。`}</Tx>
      </Sub>

      <Sub n="1.2.4" title="Wavefunction" zh="波函数">
        <Tx>{R`考虑在实直线 $\mathbb{R}$ 上运动的粒子。设 $\hat x$ 为位置算符，本征值 $y$、本征矢 $|y\rangle$：$\hat x|y\rangle=y|y\rangle$，归一化为 $\langle x|y\rangle=\delta(x-y)$。类似地，设 $q$ 为 $\hat p$ 的本征值、本征矢 $|q\rangle$：$\hat p|q\rangle=q|q\rangle$，$\langle p|q\rangle=\delta(p-q)$。

设 $|\psi\rangle\in\mathcal{H}$。内积`}</Tx>
        <Eq n="1.43" title="波函数" say={R`波函数就是态矢在位置本征基下的分量：粒子在 $x$ 处的概率幅。`}>{R`\psi(x)\equiv\langle x|\psi\rangle`}</Eq>
        <Tx>{R`是 $|\psi\rangle$ 在基 $|x\rangle$ 下的分量：

$$|\psi\rangle=\int|x\rangle\langle x|\,\dd x\,|\psi\rangle=\int\psi(x)|x\rangle\,\dd x.$$

系数 $\psi(x)\in\mathbb{C}$ 称为**波函数**（wavefunction）。按前面的公理，它是在态 $|\psi\rangle$ 中于 $x$ 处找到粒子的概率幅，即 $|\psi(x)|^2\dd x$ 是在区间 $[x,x+\dd x]$ 中找到粒子的概率。在整条实直线上找到粒子的概率为 1，因此自然地要求归一化`}</Tx>
        <Eq n="1.44" say={R`归一化：粒子总要在某处，所以概率密度在整条实直线上的积分为 1。`}>{R`\int\dd x\,|\psi(x)|^2=\langle\psi|\psi\rangle=1`}</Eq>
        <Tx>{R`类似地，$\psi(p)=\langle p|\psi\rangle$ 是在态中找到动量为 $p$ 的概率幅，动量落在 $[p,p+\dd p]$ 的概率是 $|\psi(p)|^2\dd p$。

用波函数写两个态的内积：`}</Tx>
        <Eq n="1.45a" say={R`内积在坐标表象中是波函数共轭相乘再积分。`}>{R`\langle\psi|\phi\rangle=\int\dd x\,\langle\psi|x\rangle\langle x|\phi\rangle=\int\dd x\,\psi^*(x)\phi(x),`}</Eq>
        <Eq n="1.45b" say={R`同一个内积在动量表象中的写法：插入的完备基换成动量本征态。`}>{R`=\int\dd p\,\langle\psi|p\rangle\langle p|\phi\rangle=\int\dd p\,\psi^*(p)\phi(p).`}</Eq>
        <Tx>{R`抽象的右矢现在由更具体的波函数 $\psi(x)$ 或 $\psi(p)$ 表示。**算符呢？**在基 $|x\rangle$ 中写出它们。由定义 $\hat x|x\rangle=x|x\rangle$ 得 $\langle x|\hat x=\langle x|x$，右乘 $|\psi\rangle$：`}</Tx>
        <Eq n="1.46" say={R`坐标表象中，位置算符就是"乘以 $x$"。`}>{R`\langle x|\hat x|\psi\rangle=x\langle x|\psi\rangle=x\psi(x).`}</Eq>
        <Tx>{R`常写作 $(\hat x\psi)(x)=x\psi(x)$。

动量算符 $\hat p$ 呢？考虑幺正算符 $\hat U(a)=\mathrm{e}^{-\mathrm{i}a\hat p}$——动量是平移的生成元。`}</Tx>
        <Stmt id="L1.1">
          <Eq n="1.47" say={R`动量的指数是平移算符：$\mathrm{e}^{-\mathrm{i}a\hat p}$ 把位置本征态平移 $a$。`}>{R`\hat U(a)|x\rangle=|x+a\rangle.`}</Eq>
          <Proof steps={[
            { claim: R`由 $[\hat x,\hat p]=\mathrm{i}$ 归纳得 $[\hat x,\hat p^n]=\mathrm{i}n\hat p^{n-1}$（$n=1,2,\ldots$）。`, tex: R`[\hat x,\hat p^{n}]=[\hat x,\hat p^{n-1}]\hat p+\hat p^{n-1}[\hat x,\hat p]=\mathrm{i}(n-1)\hat p^{n-1}+\mathrm{i}\hat p^{n-1}`, fill: true, uses: ["1.32"] },
            { claim: R`于是`, tex: R`[\hat x,\hat U(a)]=\left[\hat x,\sum_n\frac{(-\mathrm{i}a)^n}{n!}\hat p^n\right]=\sum_{n\ge1}\frac{(-\mathrm{i}a)^n}{n!}\mathrm{i}n\hat p^{n-1}=a\hat U(a)`, why: R`$\mathrm{i}(-\mathrm{i}a)=a$，余下的和重新求和为 $\hat U(a)$。` },
            { claim: R`改写成作用在 $|x\rangle$ 上：`, tex: R`\hat x\hat U(a)|x\rangle=\hat U(a)(\hat x+a)|x\rangle=(x+a)\hat U(a)|x\rangle` },
            { claim: R`所以 $\hat U(a)|x\rangle$ 是 $\hat x$ 的本征值为 $x+a$ 的本征矢，$\hat U(a)|x\rangle\propto|x+a\rangle$。$\hat U(a)$ 幺正，保持矢量的范数，故 $\hat U(a)|x\rangle=|x+a\rangle$。`, why: R`严格说，比例常数是模为 1 的相因子，可以由 $|x\rangle$ 的相位约定吸收（取 $|x\rangle\equiv\hat U(x)|0\rangle$ 即可）。`, fill: true },
          ]} />
        </Stmt>
        <Tx>{R`取无穷小数 $\varepsilon$，则 $\hat U(\varepsilon)|x\rangle=|x+\varepsilon\rangle\simeq(1-\mathrm{i}\varepsilon\hat p)|x\rangle$。由此`}</Tx>
        <Eq n="1.48" say={R`动量算符作用于位置本征态，就是对标签 $x$ 求导（乘 $\mathrm{i}$）。`}>{R`\hat p|x\rangle=\frac{|x+\varepsilon\rangle-|x\rangle}{-\mathrm{i}\varepsilon}\ \xrightarrow{\varepsilon\to0}\ \mathrm{i}\frac{\dd}{\dd x}|x\rangle`}</Eq>
        <Tx>{R`以及它的对偶`}</Tx>
        <Eq n="1.49" say={R`取 Hermite 共轭：动量算符从右边作用在位置左矢上，是 $-\mathrm{i}$ 乘对 $x$ 的导数。`}>{R`\langle x|\hat p=\frac{\langle x+\varepsilon|-\langle x|}{\mathrm{i}\varepsilon}\ \xrightarrow{\varepsilon\to0}\ -\mathrm{i}\frac{\dd}{\dd x}\langle x|.`}</Eq>
        <Tx>{R`因此对任何态 $|\psi\rangle$：`}</Tx>
        <Eq n="1.50" title="坐标表象中的动量算符" say={R`坐标表象中，动量算符就是 $-\mathrm{i}\,\dd/\dd x$。`}>{R`\langle x|\hat p|\psi\rangle=-\mathrm{i}\frac{\dd}{\dd x}\langle x|\psi\rangle=-\mathrm{i}\frac{\dd}{\dd x}\psi(x).`}</Eq>
        <Tx>{R`也写作 $(\hat p\psi)(x)=-\mathrm{i}\,\dd\psi(x)/\dd x$。类似地，在基 $|p\rangle$ 中得到算符的**动量表象**：`}</Tx>
        <Eq n="1.51" say={R`动量表象中位置算符作用于动量本征态：对标签 $p$ 求导乘 $-\mathrm{i}$（与 \eqref{1.48} 符号相反）。`}>{R`\hat x|p\rangle=-\mathrm{i}\frac{\dd}{\dd p}|p\rangle`}</Eq>
        <Eq n="1.52" say={R`动量算符作用于自己的本征态，给出本征值。`}>{R`\hat p|p\rangle=p|p\rangle`}</Eq>
        <Eq n="1.53" say={R`动量表象中，位置算符是 $\mathrm{i}\,\dd/\dd p$。`}>{R`\langle p|\hat x|\psi\rangle=\mathrm{i}\frac{\dd}{\dd p}\psi(p)`}</Eq>
        <Eq n="1.54" say={R`动量表象中，动量算符就是"乘以 $p$"。`}>{R`\langle p|\hat p|\psi\rangle=p\psi(p).`}</Eq>
        <Exercise n="1.2" title={R`证明 \eqref{1.51}–\eqref{1.54}`} level="★"
          hint={R`仿照 \sref{L1.1}：$\hat V(b)=\mathrm{e}^{\mathrm{i}b\hat x}$ 平移动量本征态。用 $[\hat p,\hat x^n]=-\mathrm{i}n\hat x^{n-1}$ 证明 $[\hat p,\hat V(b)]=b\hat V(b)$。`}
          solution={R`**平移动量。**由 $[\hat p,\hat x]=-\mathrm{i}$ 归纳得 $[\hat p,\hat x^n]=-\mathrm{i}n\hat x^{n-1}$。令 $\hat V(b)=\mathrm{e}^{\mathrm{i}b\hat x}=\sum_n(\mathrm{i}b)^n\hat x^n/n!$，则

$$[\hat p,\hat V(b)]=\sum_{n\ge1}\frac{(\mathrm{i}b)^n}{n!}(-\mathrm{i}n)\hat x^{n-1}=(-\mathrm{i})(\mathrm{i}b)\hat V(b)=b\hat V(b).$$

所以 $\hat p\hat V(b)|p\rangle=\hat V(b)(\hat p+b)|p\rangle=(p+b)\hat V(b)|p\rangle$，与引理 1.1 同理（幺正性 + 相位约定）得 $\hat V(b)|p\rangle=|p+b\rangle$。

**(1.51)。**取无穷小 $b=\varepsilon$：$|p+\varepsilon\rangle\simeq(1+\mathrm{i}\varepsilon\hat x)|p\rangle$，故

$$\hat x|p\rangle=\frac{|p+\varepsilon\rangle-|p\rangle}{\mathrm{i}\varepsilon}\to-\mathrm{i}\frac{\dd}{\dd p}|p\rangle.$$

**(1.52)** 就是 $|p\rangle$ 的定义。

**(1.53)。**取 (1.51) 的 Hermite 共轭（$\hat x$ Hermite）：$\langle p|\hat x=\mathrm{i}\tfrac{\dd}{\dd p}\langle p|$。右乘 $|\psi\rangle$ 得 $\langle p|\hat x|\psi\rangle=\mathrm{i}\tfrac{\dd}{\dd p}\langle p|\psi\rangle=\mathrm{i}\tfrac{\dd}{\dd p}\psi(p)$。

**(1.54)。**$\langle p|\hat p=p\langle p|$（$\hat p$ Hermite，本征值实），右乘 $|\psi\rangle$ 即得。

**检验：**在动量表象中 $[\hat x,\hat p]\psi(p)=\mathrm{i}\tfrac{\dd}{\dd p}(p\psi)-p\,\mathrm{i}\tfrac{\dd\psi}{\dd p}=\mathrm{i}\psi$，与 \eqref{1.32} 一致。`}>
          {R`证明 \eqref{1.51}–\eqref{1.54}。`}
        </Exercise>
        <Stmt id="P1.1">
          <Eq n="1.55" title="位置–动量重叠" say={R`动量本征态在坐标表象中是平面波，归一化常数 $1/\sqrt{2\pi}$ 使它归一到 $\delta$ 函数。`}>{R`\langle x|p\rangle=\frac{1}{\sqrt{2\pi}}\mathrm{e}^{\mathrm{i}px}`}</Eq>
          <Eq n="1.56" say={R`上式的复共轭：位置本征态在动量表象中也是平面波。`}>{R`\langle p|x\rangle=\frac{1}{\sqrt{2\pi}}\mathrm{e}^{-\mathrm{i}px}`}</Eq>
          <Proof steps={[
            { claim: R`在 $(\hat p\psi)(x)=\langle x|\hat p|\psi\rangle=-\mathrm{i}\tfrac{\dd}{\dd x}\psi(x)$ 中取 $|\psi\rangle=|p\rangle$：`, tex: R`p\langle x|p\rangle=\langle x|\hat p|p\rangle=-\mathrm{i}\frac{\dd}{\dd x}\langle x|p\rangle`, uses: ["1.50"] },
            { claim: R`解这个一阶常微分方程：`, tex: R`\langle x|p\rangle=C\mathrm{e}^{\mathrm{i}px}` },
            { claim: R`归一化条件（插入动量的完备基 \eqref{1.36}；取 $C$ 为实数）：`, tex: R`\delta(x-y)=\langle x|y\rangle=\langle x|\int|p\rangle\langle p|\,\dd p\,|y\rangle=C^2\int\dd p\,\mathrm{e}^{\mathrm{i}p(x-y)}=C^22\pi\delta(x-y)`, uses: ["1.36", "1.37"], why: R`$\int\dd p\,\mathrm{e}^{\mathrm{i}pz}=2\pi\delta(z)$；这里用了 $\langle p|y\rangle=\langle y|p\rangle^*=C\mathrm{e}^{-\mathrm{i}py}$。` },
            { claim: R`所以 $C=1/\sqrt{2\pi}$，得 \eqref{1.55}。` },
            { claim: R`(1.56)（原书留作习题）：$\langle p|x\rangle=\langle x|p\rangle^*=\mathrm{e}^{-\mathrm{i}px}/\sqrt{2\pi}$。也可独立推导：由 \eqref{1.53}，$x\langle p|x\rangle=\langle p|\hat x|x\rangle=\mathrm{i}\tfrac{\dd}{\dd p}\langle p|x\rangle$，解为 $C'\mathrm{e}^{-\mathrm{i}px}$，同样的归一化给出 $C'=1/\sqrt{2\pi}$。`, fill: true, uses: ["1.53"] },
          ]} />
        </Stmt>
        <Tx>{R`于是 $\psi(x)$ 与 $\psi(p)$ 的关系为`}</Tx>
        <Eq n="1.57" say={R`动量表象的波函数就是坐标表象波函数的 Fourier 变换。`}>{R`\psi(p)=\langle p|\psi\rangle=\int\dd x\,\langle p|x\rangle\langle x|\psi\rangle=\int\frac{\dd x}{\sqrt{2\pi}}\mathrm{e}^{-\mathrm{i}px}\psi(x)`}</Eq>
        <Tx>{R`这正是 $\psi(x)$ 的 Fourier 变换。

**波函数满足的 Schrödinger 方程。**对 \eqref{1.42} 从左作用 $\langle x|$（省去下标 S）：$\langle x|\mathrm{i}\tfrac{\dd}{\dd t}|\psi(t)\rangle=\langle x|\hat H|\psi(t)\rangle$。对 $\hat H=\hat p^2/2m+V(\hat x)$ 型的 Hamilton 量，得到**含时 Schrödinger 方程**（time-dependent Schrödinger equation）：`}</Tx>
        <Eq n="1.58" title="含时 Schrödinger 方程" say={R`含时 Schrödinger 方程：波函数的时间变化由动能项（二阶导数）与势能项共同决定。`}>{R`\begin{aligned}\mathrm{i}\frac{\dd}{\dd t}\psi(x,t)&=\left\langle x\left|\frac{\hat p^2}{2m}+V(\hat x)\right|\psi(t)\right\rangle\\&=-\frac{1}{2m}\frac{\dd^2}{\dd x^2}\psi(x,t)+V(x)\psi(x,t),\end{aligned}`}</Eq>
        <Tx>{R`其中 $\psi(x,t)\equiv\langle x|\psi(t)\rangle$。

**分离变量。**设解的形式为 $\psi(x,t)=T(t)\phi(x)$。代入 \eqref{1.58} 并除以 $\psi(x,t)$：

$$\frac{\mathrm{i}T'(t)}{T(t)}=\frac{-\phi''(x)/2m+V(x)\phi(x)}{\phi(x)},$$

撇号表示对相应变量求导。左边只依赖 $t$、右边只依赖 $x$，所以两边等于同一个常数，记作 $E$。于是要同时解两个方程：`}</Tx>
        <Eq n="1.59" say={R`分离变量后的时间部分：一阶方程，分离常数 $E$ 就是能量。`}>{R`\mathrm{i}T'(t)=ET(t)`}</Eq>
        <Eq n="1.60" say={R`分离变量后的空间部分：Hamilton 算符的本征值问题。`}>{R`-\frac{1}{2m}\frac{\dd^2}{\dd x^2}\phi(x)+V(x)\phi(x)=E\phi(x).`}</Eq>
        <Tx>{R`第一个方程立即解出`}</Tx>
        <Eq n="1.61" say={R`定态的时间因子：以角频率 $E$ 转动的相位。`}>{R`T(t)=\exp(-\mathrm{i}Et)`}</Eq>
        <Tx>{R`第二个是 Hamilton 算符的本征值问题，称为**不含时 Schrödinger 方程**、**定态 Schrödinger 方程**，或简称 **Schrödinger 方程**。在三维空间中写作`}</Tx>
        <Eq n="1.62" say={R`三维定态 Schrödinger 方程：二阶导数换成 Laplace 算子。`}>{R`-\frac{1}{2m}\nabla^2\phi(\boldsymbol{x})+V(\boldsymbol{x})\phi(\boldsymbol{x})=E\phi(\boldsymbol{x}).`}</Eq>
      </Sub>

      <Sub n="1.2.5" title="Harmonic oscillator" zh="谐振子">
        <p className="muted">本小节概念：<C id="oscillator" /></p>
        <Tx>{R`在这里停一下，算一个非平凡的例子。我们取一维谐振子：它不平凡，却能精确求解，而且在后面的应用中非常重要。Hamilton 算符为`}</Tx>
        <Eq n="1.63" title="量子谐振子" say={R`量子谐振子：Hamilton 量与经典 \eqref{1.18} 同形，只是 $x,p$ 换成满足正则对易关系的算符。`}>{R`\hat H=\frac{\hat p^2}{2m}+\frac12m\omega^2\hat x^2\qquad[\hat x,\hat p]=\mathrm{i}.`}</Eq>
        <Tx>{R`（不含时）Schrödinger 方程为`}</Tx>
        <Eq n="1.64" say={R`谐振子的定态方程：动能项加抛物线势。`}>{R`-\frac{1}{2m}\frac{\dd^2}{\dd x^2}\psi(x)+\frac12m\omega^2x^2\psi(x)=E\psi(x).`}</Eq>
        <Tx>{R`作无量纲化 $\xi=\sqrt{m\omega}\,x$、$\varepsilon=E/\hbar\omega$（$\hbar=1$ 时即 $E/\omega$），得到`}</Tx>
        <Eq n="1.65" say={R`无量纲化后的谐振子方程；只有 $\varepsilon$ 取特定值时才有可归一化的解。`}>{R`\psi''+(2\varepsilon-\xi^2)\psi=0.`}</Eq>
        <Derivation title={R`从 \eqref{1.64} 到 \eqref{1.65}（并说明勘误）`} collapsed steps={[
          { tex: R`\frac{\dd}{\dd x}=\sqrt{m\omega}\frac{\dd}{\dd\xi},\qquad x^2=\frac{\xi^2}{m\omega}`, why: R`由 $\xi=\sqrt{m\omega}\,x$。` },
          { tex: R`-\frac{m\omega}{2m}\psi''+\frac12m\omega^2\frac{\xi^2}{m\omega}\psi=E\psi\ \Longleftrightarrow\ -\frac{\omega}{2}\psi''+\frac{\omega}{2}\xi^2\psi=E\psi`, why: R`撇号表示对 $\xi$ 求导。` },
          { tex: R`\psi''+\left(\frac{2E}{\omega}-\xi^2\right)\psi=0=\psi''+(2\varepsilon-\xi^2)\psi`, why: R`两边乘 $-2/\omega$，再用 $\varepsilon=E/\omega$。` },
        ]} result={R`系数是 $2\varepsilon$ 而不是 $\varepsilon$；只有这样才与后面的 $\varepsilon_n=n+\tfrac12$ 相容。`} />
        <Tx>{R`这个常微分方程的可归一化解只在 $\varepsilon=\varepsilon_n\equiv(n+\tfrac12)$（$n=0,1,2,\ldots$）时存在，即`}</Tx>
        <Eq n="1.66" keyEq title="谐振子能级" say={R`谐振子能级等间距，间隔 $\omega$；最低能量不是零，而是零点能 $\tfrac12\omega$。`}>{R`E=E_n\equiv(n+\tfrac12)\omega\qquad(n=0,1,2,\ldots)`}</Eq>
        <Tx>{R`归一化的解用 **Hermite 多项式**`}</Tx>
        <Eq n="1.67" say={R`Hermite 多项式的 Rodrigues 公式：对 Gauss 函数求 $n$ 阶导数，得到 $n$ 次多项式乘回原 Gauss 函数。`}>{R`H_n(\xi)=(-1)^n\mathrm{e}^{\xi^2}\frac{\dd^n\mathrm{e}^{-\xi^2}}{\dd\xi^n}`}</Eq>
        <Tx>{R`写成`}</Tx>
        <Eq n="1.68" say={R`谐振子第 $n$ 个本征函数：$n$ 次 Hermite 多项式乘 Gauss 包络，前面的常数使它在 $x$ 上归一化。`}>{R`\psi_n(x)=\left(\frac{m\omega}{\pi}\right)^{1/4}\frac{1}{\sqrt{2^nn!}}H_n(\xi)\mathrm{e}^{-\xi^2/2}.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{1.65}、\eqref{1.67}、\eqref{1.68} 三处`}>{R`**(1.65)** 原书印作 $\psi''+(\varepsilon-\xi^2)\psi=0$（$\varepsilon=E/\hbar\omega$）。按上面的推导，系数应为 $2\varepsilon$；否则本征值是 $\varepsilon_n=2n+1$，与紧接着的 $\varepsilon_n=n+\tfrac12$ 矛盾。

**(1.67)** 原书印作 $H_n(\xi)=(-1)^n\mathrm{e}^{\xi^2/2}\,\dd^n\mathrm{e}^{-\xi^2/2}/\dd\xi^n$。那是"概率论者的 Hermite 多项式" $\mathrm{He}_n$，与 $\mathrm{e}^{-\xi^2/2}$ 相乘**不是** \eqref{1.65} 的解。例如 $n=2$：$\mathrm{He}_2=\xi^2-1$，而 $(\xi^2-1)\mathrm{e}^{-\xi^2/2}$ 代入 \eqref{1.65} 后，无论 $\varepsilon$ 取何值都不为零（取 $\varepsilon=\tfrac52$ 消去 $\xi^2$ 项后仍余 $-2\mathrm{e}^{-\xi^2/2}$）；正确的 $H_2=4\xi^2-2$ 则精确满足（$\varepsilon=\tfrac52$）。

**(1.68)** 原书归一化常数印作 $\sqrt{m\omega/(2^nn!\sqrt\pi)}$。由 $\int H_n^2\mathrm{e}^{-\xi^2}\dd\xi=2^nn!\sqrt\pi$ 与 $\dd x=\dd\xi/\sqrt{m\omega}$，对 $x$ 归一化要求常数为 $(m\omega)^{1/4}/\sqrt{2^nn!\sqrt\pi}=(m\omega/\pi)^{1/4}/\sqrt{2^nn!}$（量纲：$[\psi]=[\text{长度}]^{-1/2}$，而 $m\omega$ 的量纲是 $[\text{长度}]^{-2}$）。本站已改正，$n=0$ 时与 \eqref{1.76} 一致。`}</Box>
        <Tx>{R`**代数解法。**这个本征值问题也可以用代数方法分析。定义**湮灭算符** $\hat a$ 与**产生算符** $\hat a^\dagger$：`}</Tx>
        <Eq n="1.69" title="湮灭算符" say={R`湮灭算符：位置与动量的特定复组合，它把能级降低一级。`}>{R`\hat a=\sqrt{\frac{m\omega}{2}}\hat x+\mathrm{i}\sqrt{\frac{1}{2m\omega}}\hat p`}</Eq>
        <Eq n="1.70" say={R`产生算符：湮灭算符的 Hermite 共轭，把能级升高一级。`}>{R`\hat a^\dagger=\sqrt{\frac{m\omega}{2}}\hat x-\mathrm{i}\sqrt{\frac{1}{2m\omega}}\hat p.`}</Eq>
        <Tx>{R`**粒子数算符** $\hat N$ 定义为`}</Tx>
        <Eq n="1.71" say={R`粒子数算符：先湮灭再产生，本征值数出振子中"量子"的个数。`}>{R`\hat N=\hat a^\dagger\hat a.`}</Eq>
        <Exercise n="1.3" title="升降算符的代数" level="★"
          hint={R`把 \eqref{1.69}–\eqref{1.70} 代入，只用 $[\hat x,\hat p]=\mathrm{i}$。对 $\hat N$ 用 $[AB,C]=A[B,C]+[A,C]B$。最后把 $\hat x,\hat p$ 用 $\hat a,\hat a^\dagger$ 反解出来代入 $\hat H$。`}
          solution={R`**(1.72)。**$[\hat a,\hat a]=0$、$[\hat a^\dagger,\hat a^\dagger]=0$ 显然。

$$[\hat a,\hat a^\dagger]=\left[\sqrt{\tfrac{m\omega}{2}}\hat x+\tfrac{\mathrm{i}}{\sqrt{2m\omega}}\hat p,\ \sqrt{\tfrac{m\omega}{2}}\hat x-\tfrac{\mathrm{i}}{\sqrt{2m\omega}}\hat p\right]=-\tfrac{\mathrm{i}}{2}[\hat x,\hat p]+\tfrac{\mathrm{i}}{2}[\hat p,\hat x]=-\tfrac{\mathrm{i}}{2}\mathrm{i}+\tfrac{\mathrm{i}}{2}(-\mathrm{i})=1.$$

**(1.73)。**$[\hat N,\hat a]=[\hat a^\dagger\hat a,\hat a]=\hat a^\dagger[\hat a,\hat a]+[\hat a^\dagger,\hat a]\hat a=-\hat a$；$[\hat N,\hat a^\dagger]=\hat a^\dagger[\hat a,\hat a^\dagger]+[\hat a^\dagger,\hat a^\dagger]\hat a=\hat a^\dagger$。

**(1.74)。**反解：$\hat x=(\hat a+\hat a^\dagger)/\sqrt{2m\omega}$，$\hat p=-\mathrm{i}\sqrt{m\omega/2}\,(\hat a-\hat a^\dagger)$。于是

$$\frac{\hat p^2}{2m}=-\frac{\omega}{4}(\hat a-\hat a^\dagger)^2,\qquad\frac12m\omega^2\hat x^2=\frac{\omega}{4}(\hat a+\hat a^\dagger)^2,$$

$$\hat H=\frac{\omega}{4}\big[(\hat a+\hat a^\dagger)^2-(\hat a-\hat a^\dagger)^2\big]=\frac{\omega}{2}(\hat a\hat a^\dagger+\hat a^\dagger\hat a)=\frac{\omega}{2}(2\hat a^\dagger\hat a+1)=\left(\hat N+\tfrac12\right)\omega.$$`}>
          <Tx>{R`证明`}</Tx>
          <Eq n="1.72" title="升降算符对易关系" say={R`产生与湮灭算符的对易子为 1：这是正则对易关系 $[\hat x,\hat p]=\mathrm{i}$ 换了一组变量的写法。`}>{R`[\hat a,\hat a]=[\hat a^\dagger,\hat a^\dagger]=0\qquad[\hat a,\hat a^\dagger]=1`}</Eq>
          <Tx>{R`以及`}</Tx>
          <Eq n="1.73" say={R`粒子数算符与升降算符的对易关系：$\hat a$ 使粒子数减 1，$\hat a^\dagger$ 使粒子数加 1。`}>{R`[\hat N,\hat a]=-\hat a\qquad[\hat N,\hat a^\dagger]=\hat a^\dagger.`}</Eq>
          <Tx>{R`并证明`}</Tx>
          <Eq n="1.74" title="谐振子 Hamilton 量的粒子数形式" say={R`谐振子的能量 = 量子数乘 $\omega$ 再加零点能 $\tfrac12\omega$。`}>{R`\hat H=(\hat N+\tfrac12)\omega.`}</Eq>
        </Exercise>
        <Tx>{R`设 $|n\rangle$ 是 $\hat N$ 的归一化本征矢，$\hat N|n\rangle=n|n\rangle$。由习题 1.3 的对易关系，

$$\begin{aligned}\hat N(\hat a|n\rangle)&=(\hat a\hat N-\hat a)|n\rangle=(n-1)(\hat a|n\rangle)\\\hat N(\hat a^\dagger|n\rangle)&=(\hat a^\dagger\hat N+\hat a^\dagger)|n\rangle=(n+1)(\hat a^\dagger|n\rangle).\end{aligned}$$

所以 $\hat a$ 使本征值减 1，$\hat a^\dagger$ 使本征值加 1，故名*湮灭*与*产生*。注意本征值 $n\ge0$，因为

$$n=\langle n|\hat N|n\rangle=(\langle n|\hat a^\dagger)(\hat a|n\rangle)=\|\hat a|n\rangle\|^2\ge0,$$

等号当且仅当 $\hat a|n\rangle=0$ 时成立。取定 $n_0>0$，反复用 $\hat a$ 作用于 $|n_0\rangle$；若 $n_0$ 不是整数，对某个整数 $k>n_0$，$\hat a^k|n_0\rangle$ 的本征值 $n_0-k$ 将为负，矛盾。只有 $n_0$ 为非负整数时才能避免：降到 $n=0$ 时 $\hat a|0\rangle$ 的范数为零，链条在此终止。于是存在满足 $\hat a|0\rangle=0$ 的态 $|0\rangle$，称为**基态**（ground state）。由 $\hat N|0\rangle=\hat a^\dagger\hat a|0\rangle=0$，它是 $\hat N$ 本征值为 0 的本征矢。波函数 $\psi_0(x)\equiv\langle x|0\rangle$ 由**一阶**常微分方程`}</Tx>
        <Eq n="1.75" say={R`基态被湮灭算符消灭；在坐标表象中这是一个一阶常微分方程。`}>{R`\langle x|\hat a|0\rangle=\sqrt{\frac{1}{2m\omega}}\left(\frac{\dd}{\dd x}\psi_0(x)+m\omega x\psi_0(x)\right)=0.`}</Eq>
        <Tx>{R`决定（用了 \eqref{1.46}、\eqref{1.50}）。解很容易求得：`}</Tx>
        <Eq n="1.76" say={R`谐振子基态波函数是 Gauss 函数，宽度 $1/\sqrt{m\omega}$。`}>{R`\psi_0(x)=C\exp(-m\omega x^2/2)`}</Eq>
        <Tx>{R`其中 $C=(m\omega/\pi)^{1/4}$ 是 \eqref{1.68}（$n=0$）给出的归一化常数。任意 $|n\rangle$ 都可以由 $|0\rangle$ 反复作用 $\hat a^\dagger$ 得到。`}</Tx>
        <Exercise n="1.4" title="激发态的构造" level="★"
          hint={R`用 $[\hat N,(\hat a^\dagger)^n]=n(\hat a^\dagger)^n$（归纳）；范数用 $\hat a(\hat a^\dagger)^n|0\rangle=n(\hat a^\dagger)^{n-1}|0\rangle$。`}
          solution={R`**本征值。**由 $[\hat N,\hat a^\dagger]=\hat a^\dagger$ 归纳：$[\hat N,(\hat a^\dagger)^n]=(\hat a^\dagger)^{n-1}[\hat N,\hat a^\dagger]+[\hat N,(\hat a^\dagger)^{n-1}]\hat a^\dagger=(\hat a^\dagger)^n+(n-1)(\hat a^\dagger)^n=n(\hat a^\dagger)^n$。所以 $\hat N(\hat a^\dagger)^n|0\rangle=(\hat a^\dagger)^n\hat N|0\rangle+n(\hat a^\dagger)^n|0\rangle=n(\hat a^\dagger)^n|0\rangle$。

**归一化。**先证 $\hat a(\hat a^\dagger)^n|0\rangle=n(\hat a^\dagger)^{n-1}|0\rangle$：$[\hat a,(\hat a^\dagger)^n]=n(\hat a^\dagger)^{n-1}$（同样归纳，用 $[\hat a,\hat a^\dagger]=1$），再用 $\hat a|0\rangle=0$。于是

$$\|(\hat a^\dagger)^n|0\rangle\|^2=\langle0|\hat a^n(\hat a^\dagger)^n|0\rangle=n\langle0|\hat a^{n-1}(\hat a^\dagger)^{n-1}|0\rangle=\cdots=n!\,\langle0|0\rangle=n!.$$

所以 $|n\rangle=(\hat a^\dagger)^n|0\rangle/\sqrt{n!}$ 归一。顺带得到 $\hat a^\dagger|n\rangle=\sqrt{n+1}|n+1\rangle$、$\hat a|n\rangle=\sqrt n|n-1\rangle$。`}>
          <Tx>{R`证明`}</Tx>
          <Eq n="1.77" say={R`第 $n$ 个激发态 = 产生算符作用 $n$ 次于基态，除以 $\sqrt{n!}$ 归一。`}>{R`|n\rangle=\frac{1}{\sqrt{n!}}(\hat a^\dagger)^n|0\rangle`}</Eq>
          <Tx>{R`满足 $\hat N|n\rangle=n|n\rangle$ 且是归一化的。`}</Tx>
        </Exercise>
        <Tx>{R`于是 $\hat N$ 的谱为 $\operatorname{Spec}\hat N=\{0,1,2,\ldots\}$，Hamilton 量的谱为`}</Tx>
        <Eq n="1.78" say={R`谐振子的能谱（以 $\omega$ 为单位）：所有正半奇数。`}>{R`\operatorname{Spec}\hat H=\{\tfrac12,\tfrac32,\tfrac52,\ldots\}.`}</Eq>
        <Tx>{R`（以 $\omega$ 为单位。）这个谱将在 §1.4 中用路径积分重新得到：配分函数 $\Tr\,\mathrm{e}^{-\beta\hat H}=\sum_n\mathrm{e}^{-\beta(n+\frac12)\omega}=1/(2\sinh(\beta\omega/2))$。`}</Tx>
      </Sub>
    </Sec>);
}
