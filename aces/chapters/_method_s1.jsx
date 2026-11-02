// method 页 §一–§三：Pauli 噪声与本征值；电路本征值 = 门本征值之积；取对数后的线性回归。
// 公式 (1)–(19)、(24)(25)、(A3)、(B2)。
import { PaperSec, Tx, Eq, Box, Figure, Derivation } from "@kit";
import { PauliConverter, PropagationStepper, MiniACES } from "./_method_plots.jsx";

const R = String.raw;

export function S1() {
  return (
    <PaperSec role="background" id="role-background" title="一、Pauli 噪声：为什么用本征值来描述"
      lead="目标：用尽量少、又尽量好测的数来描述「一个门的噪声」。答案是 Pauli 信道的本征值——它们和错误概率一一对应，但在电路里会相乘，而不是相互缠绕。">
      <Tx>{R`**先把 Pauli 编成比特串。** $n$ 个比特上的每个 Pauli 都可以用一个长 $2n$ 的比特串 $\boldsymbol a=(\boldsymbol a^{(x)},\boldsymbol a^{(z)})$ 来标记：第 $j$ 个比特上 $X$ 部分有没有、$Z$ 部分有没有。`}</Tx>
      <Eq n="1" say="每个比特上放 $X^{a^{(x)}}Z^{a^{(z)}}$，两者都有时乘一个 $i$ 把 $XZ$ 变成 $Y$；$n$ 个比特张量积起来。">{R`P_{\boldsymbol a}=\bigotimes_{j=1}^{n}i^{a^{(x)}_ja^{(z)}_j}X^{a^{(x)}_j}Z^{a^{(z)}_j}`}</Eq>
      <Tx>{R`这样编码的好处是：矩阵乘法在不计相位时就是比特串相加（模 2），对易还是反对易由一个简单的「辛内积」决定。`}</Tx>
      <Eq n="2" say="两个 Pauli 相乘，除了一个相位 $\zeta$ 之外，就是把它们的比特串相加。">{R`P_{\boldsymbol a}P_{\boldsymbol a'}=\zeta(\boldsymbol a,\boldsymbol a')P_{\boldsymbol a+\boldsymbol a'}`}</Eq>
      <Eq n="3" say="交换两个 Pauli 的次序只多一个符号 $(-1)^{\omega}$：$\omega=0$ 对易，$\omega=1$ 反对易。" keyEq title="辛内积决定对易性">{R`P_{\boldsymbol a}P_{\boldsymbol a'}=(-1)^{\omega(\boldsymbol a,\boldsymbol a')}P_{\boldsymbol a'}P_{\boldsymbol a}`}</Eq>
      <Tx>{R`其中 $\omega(\boldsymbol a,\boldsymbol a')=\boldsymbol a^{(x)}\cdot\boldsymbol a'^{(z)}+\boldsymbol a^{(z)}\cdot\boldsymbol a'^{(x)}$（模 2）。逐比特看就是：两个 Pauli 在某个比特上都不是 $I$ 且彼此不同，记一次反对易；反对易次数为奇数，整体就反对易。Pauli 的**支撑**是它不为 $I$ 的那些比特：`}</Tx>
      <Eq n="4" say="支撑：Pauli 在哪些比特上不是恒等。支撑大小为 $b$ 的叫权重 $b$ 的 Pauli。">{R`\operatorname{supp}(\boldsymbol a)=\{j\in[n]:\{a^{(x)}_j,a^{(z)}_j\}\neq\{0,0\}\}`}</Eq>

      <Tx>{R`**Pauli 信道：以一定概率随机施加一个 Pauli。**`}</Tx>
      <Eq n="5" keyEq title="Pauli 信道" say="Pauli 信道就是「掷骰子」：以概率 $p_{\boldsymbol a}$ 在态上作用 $P_{\boldsymbol a}$。要刻画的就是这张概率表。">{R`\mathcal E(\rho)=\sum_{\boldsymbol a\in\mathbf P^n}p_{\boldsymbol a}P_{\boldsymbol a}\rho P_{\boldsymbol a}`}</Eq>
      <Tx>{R`为什么只考虑 Pauli 信道？一般的噪声可以有相干部分（会自我干涉、累积）。原文的立场是：相干误差可以靠校准与动力学解耦压低，剩下的由 **Pauli 帧随机化**（在实现上即随机编译）在平均意义下「裁剪」成 Pauli 信道——对 Clifford 电路，插入随机 Pauli 门就够了。所以协议名字里的「averaged」正是指这种随机化后的平均。

**关键观察：Pauli 算符本身就是 Pauli 信道的本征向量。** 把 \eqref{5} 作用在某个 Pauli $P_{\boldsymbol a'}$ 上，每一项 $P_{\boldsymbol a}P_{\boldsymbol a'}P_{\boldsymbol a}$ 由 \eqref{3} 等于 $\pm P_{\boldsymbol a'}$，于是`}</Tx>
      <Eq n="6" say="Pauli 信道不会把一个 Pauli 变成别的 Pauli，只会把它按比例缩短；这个比例就是本征值。">{R`\mathcal E(P_{\boldsymbol a'})=\lambda_{\boldsymbol a'}P_{\boldsymbol a'}`}</Eq>
      <Eq n="7" keyEq title="错误概率 → 本征值" say="本征值 = 与 $P_{\boldsymbol a'}$ 对易的错误的总概率 − 反对易的错误的总概率。噪声越弱，本征值越接近 1。">{R`\lambda_{\boldsymbol a'}=\sum_{\boldsymbol a\in\mathbf P^n}(-1)^{\omega(\boldsymbol a,\boldsymbol a')}p_{\boldsymbol a}`}</Eq>
      <Tx>{R`这是一个按辛内积排序的 Walsh–Hadamard 变换（WHT）。它的矩阵自乘等于 $4^n$ 乘单位矩阵，所以反变换几乎一样：`}</Tx>
      <Eq n="8" keyEq title="本征值 → 错误概率" say="反过来，错误概率是本征值的 WHT 再除以 $4^n$：知道了全部本征值，就知道了整张错误概率表。">{R`p_{\boldsymbol a}=\frac{1}{4^n}\sum_{\boldsymbol a'\in\mathbf P^n}(-1)^{\omega(\boldsymbol a,\boldsymbol a')}\lambda_{\boldsymbol a'}`}</Eq>
      <Box kind="physics" title="本征值为什么比概率「好测」">{R`本征值有直接的操作含义：制备 $P_{\boldsymbol a'}$ 的一个本征态，过一遍信道，再测 $P_{\boldsymbol a'}$，读数平均就是 $\lambda_{\boldsymbol a'}$。而一连串 Pauli 信道作用在同一个 Pauli 上时，本征值**相乘**——这就是下一节「电路本征值 = 门本征值之积」的根源。错误概率则要经过 WHT 才能还原，最后一步再做。`}</Box>
      <Figure n="M1" caption={R`Pauli 信道 ↔ Pauli 本征值换算器。单比特模式下可以双向换算：从 $\lambda$ 反推 $p$ 时，若三个本征值互相不协调，就会反推出负概率——正是带统计噪声的估计会出现的情况，原文随后把它投影回概率单纯形。两比特模式演示一个关联错误 $ZZ$ 如何只压低与它反对易的本征值，并验证附录 A 的边缘化性质。`} illustration={<PauliConverter />} />
      <Tx>{R`**一个门的本征值只说明这个门支撑上的事。** 原文把每一层的噪声 $\mathcal E_i$ 看成 $n$ 比特 Pauli 信道，但只学习落在单个门支撑上的那些本征值。附录 A 证明，这样学到的恰好是整层错误概率分布在该门支撑上的**边缘分布**：把 Pauli 拆成门上的部分 $\boldsymbol b\in A$ 与门外的部分 $\boldsymbol c\in A^C$，门外部分与门上任意 Pauli 都对易，于是`}</Tx>
      <Eq n="A3" say="门支撑上的本征值只依赖于把门外错误「求和掉」之后的边缘分布：层内的空间关联被平均进了每个门自己的信道里。">{R`\lambda_{\boldsymbol a}=\sum_{\boldsymbol b\in A}\sum_{\boldsymbol c\in A^C}(-1)^{\omega(\boldsymbol a,\boldsymbol b+\boldsymbol c)}p_{\boldsymbol b+\boldsymbol c}=\sum_{\boldsymbol b\in A}(-1)^{\omega(\boldsymbol a,\boldsymbol b)}\Big(\sum_{\boldsymbol c\in A^C}p_{\boldsymbol b+\boldsymbol c}\Big)`}</Eq>
      <Tx>{R`这就是原文「捕捉层内平均空间关联」的确切含义：一个 CZ 旁边的门同时出错的倾向不会被单独建模，但它对这个 CZ 的影响被平均进了「这个 CZ 在这一层里」的信道。同一个物理门出现在不同的层里，就学成不同的信道。为了让每个比特都被某个门覆盖，空闲比特用恒等门「填充」。`}</Tx>
    </PaperSec>);
}

export function S2() {
  return (
    <PaperSec role="solution" id="role-solution" title="二、电路本征值：一串门本征值之积"
      lead="让一个 Pauli 穿过一整条 Clifford 电路，它每经过一个门就被那个门的本征值缩短一次；总缩短量可以测，各段的缩短量就是要求的未知数。">
      <Tx>{R`**含噪 Clifford 门。** Clifford 门 $G$ 把 Pauli 共轭成 Pauli（带一个符号）。原文用超算符 $\mathcal G(P_{\boldsymbol a})=GP_{\boldsymbol a}G^\dagger$，把含噪实现写成 $\tilde{\mathcal G}=\mathcal G\mathcal E_{\mathcal G}$——先过噪声，再做理想门。于是`}</Tx>
      <Eq n="9" keyEq title="含噪门作用于 Pauli" say="含噪 Clifford 门把 $P_{\boldsymbol a}$ 送到理想的像 $\pm P_{\mathcal G(\boldsymbol a)}$，同时乘上一个因子 $\lambda_{\mathcal G,\boldsymbol a}$——它按**输入** Pauli 标记。">{R`\tilde{\mathcal G}(P_{\boldsymbol a})=\lambda_{\mathcal G,\boldsymbol a}\mathcal G(P_{\boldsymbol a})=(\pm)_{\mathcal G,\boldsymbol a}\lambda_{\mathcal G,\boldsymbol a}P_{\mathcal G(\boldsymbol a)}`}</Eq>
      <Tx>{R`$\lambda_{\mathcal G,\boldsymbol a}$ 严格说是「广义本征值」（$P_{\boldsymbol a}$ 被映到别的 Pauli 了），下文就叫本征值。对一个门，只需要支撑在它上面的 Pauli：`}</Tx>
      <Eq n="10" say="一个门的 Pauli 集：支撑完全落在门的比特上的 Pauli，$b$ 比特门共 $4^b$ 个。">{R`\mathrm{Pauli}(\mathcal G)=\{\boldsymbol a\in\mathbf P^n:\ \operatorname{supp}(\boldsymbol a)\subseteq\operatorname{supp}(\mathcal G)\}`}</Eq>
      <Tx>{R`恒等 Pauli 的本征值恒为 1（迹保持、无泄漏），所以每个单比特门 3 个、每个两比特门 15 个未知数。把所有层、所有门的未知数编成一个指标集：`}</Tx>
      <Eq n="11" say="全部未知数：对每个不同的层 $i$、层内每个门 $j$、门上的每个 Pauli $\boldsymbol a$，各有一个门本征值 $\lambda_{ij,\boldsymbol a}$。">{R`N=\{(ij,\boldsymbol a):\ i\in\mathcal I,\ j\in[k_i],\ \boldsymbol a\in\mathrm{Pauli}(\mathcal G_{ij})\}`}</Eq>

      <Tx>{R`**层与 tuple。** 综合征提取电路被切成 $l$ 层，每层的门同时执行、作用在互不相交的比特上（因此层内次序无关）：`}</Tx>
      <Eq n="12" say="电路按时间从右往左排：先 $\mathcal C_1$ 后 $\mathcal C_l$；每层是若干个互不重叠的门之积。">{R`\mathcal C=\mathcal C_l\ldots\mathcal C_2\mathcal C_1,\qquad\mathcal C_i=\prod_{j\in[k_i]}\mathcal G_{ij}`}</Eq>
      <Tx>{R`ACES 的实验不是跑原电路，而是跑**把这些层重新排列、重复**之后的电路。一个 tuple $T$ 就是一串层编号（可重复），规定新电路的样子：`}</Tx>
      <Eq n="13" keyEq title="按 tuple 重排的电路" say="tuple $T=(T_1,\dots,T_L)$ 把原电路的层按指定次序（可重复）串起来，得到新电路 $\mathcal C_T$。">{R`\mathcal C_T=\prod_{u\in[L]}\mathcal C_{T_u}`}</Eq>
      <Tx>{R`用 tuple 来参数化实验是这篇论文的一个关键选择：表面码的综合征提取电路无论码距多大，**层的种类都一样**（原文图 1 的 $d=3$ 电路有 9 层、7 种），所以「哪些 tuple、各分多少 shot」这个实验设计可以在小码距上优化，原样搬到大码距上用。

**电路本征值。** 整条重排电路对 $P_{\boldsymbol a}$ 的作用和单个门 \eqref{9} 形式完全一样：`}</Tx>
      <Eq n="14" say="整条含噪电路对 $P_{\boldsymbol a}$ 的总效果：送到理想像 $P_{T(\boldsymbol a)}$，再乘上一个总衰减因子 $\Lambda_{T,\boldsymbol a}$。">{R`\tilde{\mathcal C}_T(P_{\boldsymbol a})=\Lambda_{T,\boldsymbol a}\mathcal C_T(P_{\boldsymbol a})=(\pm)_{T,\boldsymbol a}\Lambda_{T,\boldsymbol a}P_{T(\boldsymbol a)}`}</Eq>
      <Tx>{R`跟着 Pauli 一层一层走：记 $P_{\boldsymbol a^{(u)}}$ 为第 $u$ 层之前的 Pauli，第 $u$ 层的每个门按 \eqref{9} 乘上「$\boldsymbol a^{(u)}$ 落在它支撑上的那一段」对应的本征值，然后把 Pauli 送到下一层。于是`}</Tx>
      <Eq n="15" keyEq title="电路本征值 = 门本征值之积" say="电路本征值等于 Pauli 一路走过时遇到的所有门本征值之积；每个因子由「那一层、那个门、那时 Pauli 在门上的样子」决定。">{R`\Lambda_{T,\boldsymbol a}=\prod_{u\in[L]}\prod_{j\in[k_{T_u}]}\lambda_{T_uj,\boldsymbol a^{(u)}}`}</Eq>
      <Figure n="M2" caption={R`按原文图 2 的三比特例子自绘：tuple $T=(2,1,3,2)$，选择输入 Pauli、拖动滑块逐层前进。默认输入 $ZXI$ 时得到的六个因子与原文图注逐项一致。试试输入 $IIZ$：它在层 2 的 $H$ 上变成 $X$，再在层 1 的 CZ 上「长出」第二个比特的 $Z$。`} illustration={<PropagationStepper />} />
      <Box kind="warning" title="易错点：本征值按「进门时」的 Pauli 取">{R`$\lambda_{\mathcal G,\boldsymbol a}$ 的下标是门**之前**的 Pauli（因为 $\tilde{\mathcal G}=\mathcal G\mathcal E_{\mathcal G}$，噪声先作用）。同一个门遇到不同的 Pauli，贡献不同的因子；Pauli 在门支撑上是 $I$ 时这个门不贡献因子。另外，同一层在 tuple 中出现两次，两次用的是**同一组**未知数——层内噪声不随时间变化（马尔可夫、时间平稳）是整套方法的前提。`}</Box>

      <Tx>{R`**一个 tuple 要测哪些电路本征值？** 原文的规则是：凡是支撑在重排电路中某个门上的 Pauli，都制备一次：`}</Tx>
      <Eq n="16" say="Pauli 制备集：重排电路里每个门的 Pauli 集合起来。">{R`\mathcal Q_T=\bigcup_{\mathcal G\in\mathcal C_T}\mathrm{Pauli}(\mathcal G)`}</Eq>
      <Eq n="17" say="全部要估计的电路本征值，由（tuple, Pauli）对标记。">{R`M=\{(T,\boldsymbol a):\ T\in\mathcal T,\ \boldsymbol a\in\mathcal Q_T\}`}</Eq>
      <Tx>{R`这条规则保证至少有一种设计是够用的：每层各跑一次的 tuple 集 $\{(i)\}_{i\in\mathcal I}$——此时电路本征值就是门本征值本身（不计 SPAM）。`}</Tx>
    </PaperSec>);
}

export function S3() {
  return (
    <PaperSec role="solution" id="s-lsq" title="三、取对数：一个线性回归问题"
      lead="乘积不好解，对数把它变成加法。于是「从电路本征值求门本征值」就是一个标准的线性最小二乘问题，设计矩阵里只有非负整数。">
      <Tx>{R`把 \eqref{15} 按未知数重新整理：每个电路本征值都是若干门本征值的幂积，幂次 $A_{\mu\nu}$ 就是 $\lambda_\nu$ 在路径上出现的次数（同一层重复几次就可能出现几次）。`}</Tx>
      <Eq n="18" say="电路本征值 $\Lambda_\mu$ 是门本征值的整数幂之积，幂次表 $A_{\mu\nu}$ 由电路结构完全确定，与噪声无关。">{R`\Lambda_\mu=\prod_{\nu\in N}\lambda_\nu^{A_{\mu\nu}}`}</Eq>
      <Tx>{R`只要本征值都离 0 足够远（落在 $(\delta,1]$ 中），就可以放心取负对数：$b_\mu=-\log\Lambda_\mu$，$x_\nu=-\log\lambda_\nu$。乘积变成求和：`}</Tx>
      <Eq n="19" keyEq title="对数后的线性方程组" say="取负对数后，电路对数本征值是门对数本征值的整系数线性组合：一个以 $A$ 为设计矩阵的线性回归。">{R`b_\mu=\sum_{\nu\in N}A_{\mu\nu}x_\nu`}</Eq>
      <Tx>{R`只要 $A$ 列满秩，就能用最小二乘解出全部 $x_\nu$。实际的 $b_\mu$ 来自有限次测量，带有误差，所以写成标准回归形式：`}</Tx>
      <Eq n="24" say="观测到的电路对数本征值 = 设计矩阵 × 门对数本征值 + 近似正态的统计误差，误差协方差为 $\Omega'$。">{R`\boldsymbol b=A\boldsymbol x+\boldsymbol\varepsilon`}</Eq>
      <Tx>{R`不同电路本征值的误差大小差别很大（衰减得厉害的本征值测得更不准，见 §四），所以原文用**加权**最小二乘（WLS）取代原始 ACES 的普通最小二乘（OLS）：`}</Tx>
      <Eq n="25" keyEq title="WLS 估计" say="每个电路对数本征值按它的估计方差的倒数加权：测得准的方程说话更算数。">{R`\hat{\boldsymbol x}=\big(A^\intercal\hat WA\big)^{-1}A^\intercal\hat W\boldsymbol b`}</Eq>
      <Tx>{R`$\hat W$ 是对角阵，元素为电路对数本征值估计方差的倒数（用估计值本身算出）。因为门本征值不超过 1，负的 $\hat x_\nu$ 直接置 0。附录 B 把三种做法放在一起：`}</Tx>
      <Eq n="B2" say="OLS、WLS、GLS 只差在用什么精度矩阵 $\hat P$：单位阵、对角方差倒数、还是完整协方差的逆。">{R`\hat{\boldsymbol x}=\big(A^\intercal\hat PA\big)^{-1}A^\intercal\hat P\boldsymbol b`}</Eq>
      <Tx>{R`精度依次 OLS < WLS < GLS。GLS 要对每个 tuple 的完整协方差块做 Cholesky 分解，$d=25$ 时有几十万个电路本征值，原文认为不可行，所以大规模时用 WLS；小规模问题原文建议用 GLS。原文附录 G 的 $d=3$ 比较中，三种设计的期望性能指标分别为 GLS $1.0346$、WLS $1.2001$、OLS $1.4601$。

估计出 $\hat{\boldsymbol\lambda}=e^{-\hat{\boldsymbol x}}$ 之后，对每个门做 \eqref{8} 的 WHT 得到错误概率；统计噪声可能让结果略微越出概率单纯形，再用欧氏距离投影回去（原文结论部分提到，改用 Mahalanobis 距离投影、以保留协方差信息，可能更好，留作以后的工作）。`}</Tx>
      <Box kind="key" title="SPAM 与规范自由度">{R`制备与测量的误差也会乘进每个电路本征值。原文指出，制备误差与测量误差存在**规范自由度**，无法分开估计；它的做法是把 SPAM 噪声全部算在测量上（相当于固定一个规范）：每个比特、每种测量基（$X,Y,Z$）一个参数，$\lambda_\nu=1-2p_\nu$，共 $3n$ 个。加入这些参数后，$\{(i)\}$ 不再满秩，于是补上只做制备+测量的空 tuple $()$，得到**基本 tuple 集** $\mathcal T_{\mathcal I}=\{(i)\}_{i\in\mathcal I}\cup\{()\}$——对任何电路都满秩，但性能很差（§六）。`}</Box>
      <Derivation title="为什么基本 tuple 集只能达到「加性」精度" collapsed steps={[
        { tex: R`\Lambda_{(i),\boldsymbol a}=\lambda_{i,\boldsymbol a}\,\lambda_{\rm meas}`, why: R`单层 tuple：一个门本征值乘上输出 Pauli 的测量本征值（示意写法）。` },
        { tex: R`\mathrm{Var}[\hat\Lambda]=\frac{1-\Lambda^2}{S_T}\approx\frac{2(1-\Lambda)}{S_T}`, why: R`单次读数是 $\pm1$，方差 $1-\Lambda^2$（式 (21) 取 $\boldsymbol a=\boldsymbol a'$）。` },
        { tex: R`\mathrm{std}[\hat\lambda]\sim\sqrt{\frac{2(1-\lambda_{\rm meas})}{S_T}}`, why: R`门本征值很接近 1 时，误差主要由测量误差 $1-\lambda_{\rm meas}$ 决定，与 $1-\lambda$ 本身无关（原文噪声模型中 $p_m\approx2\%$，$1-\lambda_{\rm meas}=2p_m\approx4\%$）。` },
      ]} result={R`基本设计的误差不随门变好而变小：对 $1-\lambda\sim10^{-3}$ 的门，这意味着相对误差很大。要想做到相对精度，必须把门重复很多次让噪声放大（§六，附录 C）。`} />
      <Figure n="M3" caption={R`迷你 ACES：在 3 比特玩具电路上做一次完整的模拟实验。每次点击都从头抽样有限 shot 的读数，用 \eqref{25} 估计 63 个门本征值；点的散布应大致落在由 §五 的协方差 $\Sigma$ 预测的 $\pm2\sigma$ 阴影带内。切换「基本 / 优化设计」可以直接看到优化设计在同样时间预算下误差小得多；下方选一个门，看估计的错误概率与真值。`} illustration={<MiniACES />} />
    </PaperSec>);
}
