// method 页 §一–§三：Pauli 噪声与本征值；电路本征值 = 门本征值之积；取对数后的线性回归。
// 公式 (1)–(19)、(24)(25)、(A3)、(B2)。重要性加权：BigEq / Assume / P w={3} 为权重 3，Fold / MinorEq / P w={1} 为细节，P deep 只在精读显示。
import { PaperSec, Tx, Eq, Box, Figure, Derivation, P, BigEq, MinorEq, Fold, Assume } from "@kit";
import { PauliConverter, PropagationStepper, MiniACES } from "./_method_plots.jsx";

const R = String.raw;

export function S1() {
  return (
    <PaperSec role="background" id="role-background" title="一、Pauli 噪声：为什么用本征值来描述"
      lead="目标：用尽量少、又尽量好测的数来描述「一个门的噪声」。答案是 Pauli 信道的本征值——它们和错误概率一一对应，但在电路里会相乘，而不是相互缠绕。">
      <P>{R`**先把 Pauli 编成比特串。** $n$ 个比特上的每个 Pauli 用一个长 $2n$ 的比特串 $\boldsymbol a=(\boldsymbol a^{(x)},\boldsymbol a^{(z)})$ 标记；乘法（不计相位）就是比特串模 2 相加，对易与否由「辛内积」$\omega$ 决定。`}</P>
      <Fold title="Pauli 的比特串编码、乘法、对易性与支撑" steps={4} note="记号，可跳过">
        <Eq n="1" say="每个比特上放 $X^{a^{(x)}}Z^{a^{(z)}}$，两者都有时乘一个 $i$ 把 $XZ$ 变成 $Y$；$n$ 个比特张量积起来。">{R`P_{\boldsymbol a}=\bigotimes_{j=1}^{n}i^{a^{(x)}_ja^{(z)}_j}X^{a^{(x)}_j}Z^{a^{(z)}_j}`}</Eq>
        <Eq n="2" say="两个 Pauli 相乘，除了一个相位 $\zeta$ 之外，就是把它们的比特串相加。">{R`P_{\boldsymbol a}P_{\boldsymbol a'}=\zeta(\boldsymbol a,\boldsymbol a')P_{\boldsymbol a+\boldsymbol a'}`}</Eq>
        <Eq n="3" say="交换两个 Pauli 的次序只多一个符号 $(-1)^{\omega}$：$\omega=0$ 对易，$\omega=1$ 反对易。" keyEq title="辛内积决定对易性">{R`P_{\boldsymbol a}P_{\boldsymbol a'}=(-1)^{\omega(\boldsymbol a,\boldsymbol a')}P_{\boldsymbol a'}P_{\boldsymbol a}`}</Eq>
        <Tx>{R`其中 $\omega(\boldsymbol a,\boldsymbol a')=\boldsymbol a^{(x)}\cdot\boldsymbol a'^{(z)}+\boldsymbol a^{(z)}\cdot\boldsymbol a'^{(x)}$（模 2）。逐比特看：两个 Pauli 在某个比特上都不是 $I$ 且彼此不同，记一次反对易；反对易次数为奇数，整体就反对易。Pauli 的**支撑**是它不为 $I$ 的那些比特：`}</Tx>
        <Eq n="4" say="支撑：Pauli 在哪些比特上不是恒等。支撑大小为 $b$ 的叫权重 $b$ 的 Pauli。">{R`\operatorname{supp}(\boldsymbol a)=\{j\in[n]:\{a^{(x)}_j,a^{(z)}_j\}\neq\{0,0\}\}`}</Eq>
      </Fold>

      <P>{R`**Pauli 信道：以一定概率随机施加一个 Pauli。** 要刻画的就是这张概率表 $p_{\boldsymbol a}$：`}</P>
      <Eq n="5" keyEq title="Pauli 信道" say="Pauli 信道就是「掷骰子」：以概率 $p_{\boldsymbol a}$ 在态上作用 $P_{\boldsymbol a}$。要刻画的就是这张概率表。">{R`\mathcal E(\rho)=\sum_{\boldsymbol a\in\mathbf P^n}p_{\boldsymbol a}P_{\boldsymbol a}\rho P_{\boldsymbol a}`}</Eq>
      <Assume title="噪声已被裁剪成 Pauli 信道">{R`一般噪声有相干部分（会自我干涉、累积）。原文的立场是：相干误差靠校准与动力学解耦压低，其余由 **Pauli 帧随机化**（随机编译）在平均意义下裁剪成 Pauli 信道——对 Clifford 电路插入随机 Pauli 门就够了，协议名里的「averaged」即指此。此后全文**假定所有噪声都是 Pauli 信道**；随机化不完美时残留的相干部分不在分析之内。`}</Assume>
      <P>{R`**关键观察：Pauli 算符本身就是 Pauli 信道的本征向量。** 把 \eqref{5} 作用在 $P_{\boldsymbol a'}$ 上，每一项 $P_{\boldsymbol a}P_{\boldsymbol a'}P_{\boldsymbol a}$ 由 \eqref{3} 等于 $\pm P_{\boldsymbol a'}$：`}</P>
      <MinorEq n="6" say="Pauli 信道不会把一个 Pauli 变成别的 Pauli，只会把它按比例缩短；这个比例就是本征值。">{R`\mathcal E(P_{\boldsymbol a'})=\lambda_{\boldsymbol a'}P_{\boldsymbol a'}`}</MinorEq>
      <BigEq n="7" label="错误概率 → 本征值（WHT）"
        meaning={R`本征值 = 与 $P_{\boldsymbol a'}$ 对易的错误的总概率 − 反对易的错误的总概率；噪声越弱越接近 1。`}
        parts={[
          { tex: R`(-1)^{\omega(\boldsymbol a,\boldsymbol a')}`, note: "对易记 +、反对易记 −：只有反对易的错误会让读数翻号" },
          { tex: R`p_{\boldsymbol a}`, note: "要刻画的错误概率表" },
        ]}>{R`\lambda_{\boldsymbol a'}=\sum_{\boldsymbol a\in\mathbf P^n}(-1)^{\omega(\boldsymbol a,\boldsymbol a')}p_{\boldsymbol a}`}</BigEq>
      <P>{R`这是按辛内积排序的 Walsh–Hadamard 变换（WHT），矩阵自乘等于 $4^n$ 乘单位阵，所以反变换几乎一样——知道全部本征值，就知道整张错误概率表：`}</P>
      <Eq n="8" keyEq title="本征值 → 错误概率" say="反过来，错误概率是本征值的 WHT 再除以 $4^n$：知道了全部本征值，就知道了整张错误概率表。">{R`p_{\boldsymbol a}=\frac{1}{4^n}\sum_{\boldsymbol a'\in\mathbf P^n}(-1)^{\omega(\boldsymbol a,\boldsymbol a')}\lambda_{\boldsymbol a'}`}</Eq>
      <P w={3} label="本征值：可直接测、串联时相乘">{R`本征值比概率好用的两个理由：它**可以直接测**（制备 $P_{\boldsymbol a'}$ 的本征态、过信道、再测 $P_{\boldsymbol a'}$，读数平均就是 $\lambda_{\boldsymbol a'}$），而且一串信道作用在同一个 Pauli 上时本征值**相乘**——这就是下一节「电路本征值 = 门本征值之积」的根源。`}</P>
      <P deep><Figure n="M1" caption={R`Pauli 信道 ↔ Pauli 本征值换算器。单比特模式下可以双向换算：从 $\lambda$ 反推 $p$ 时，若三个本征值互相不协调，就会反推出负概率——正是带统计噪声的估计会出现的情况，原文随后把它投影回概率单纯形。两比特模式演示一个关联错误 $ZZ$ 如何只压低与它反对易的本征值，并验证附录 A 的边缘化性质。`} illustration={<PauliConverter />} /></P>
      <P>{R`**一个门的本征值只说明这个门支撑上的事。** 原文只学习落在单个门支撑上的本征值；附录 A 证明，这样学到的恰好是整层错误分布在该门支撑上的**边缘分布**——层内串扰被平均进了「这个门在这一层里」的信道，同一个物理门出现在不同层里就学成不同的信道。`}</P>
      <Fold title="附录 A：为什么是边缘分布" steps={1} note="证明细节">
        <Tx>{R`把 Pauli 拆成门上的部分 $\boldsymbol b\in A$ 与门外的部分 $\boldsymbol c\in A^C$，门外部分与门上任意 Pauli 都对易，于是`}</Tx>
        <Eq n="A3" say="门支撑上的本征值只依赖于把门外错误「求和掉」之后的边缘分布：层内的空间关联被平均进了每个门自己的信道里。">{R`\lambda_{\boldsymbol a}=\sum_{\boldsymbol b\in A}\sum_{\boldsymbol c\in A^C}(-1)^{\omega(\boldsymbol a,\boldsymbol b+\boldsymbol c)}p_{\boldsymbol b+\boldsymbol c}=\sum_{\boldsymbol b\in A}(-1)^{\omega(\boldsymbol a,\boldsymbol b)}\Big(\sum_{\boldsymbol c\in A^C}p_{\boldsymbol b+\boldsymbol c}\Big)`}</Eq>
        <Tx>{R`这就是原文「捕捉层内平均空间关联」的确切含义。为了让每个比特都被某个门覆盖，空闲比特用恒等门「填充」。`}</Tx>
      </Fold>
    </PaperSec>);
}

export function S2() {
  return (
    <PaperSec role="solution" id="role-solution" title="二、电路本征值：一串门本征值之积"
      lead="让一个 Pauli 穿过一整条 Clifford 电路，它每经过一个门就被那个门的本征值缩短一次；总缩短量可以测，各段的缩短量就是要求的未知数。">
      <P>{R`**含噪 Clifford 门。** Clifford 门把 Pauli 共轭成 Pauli；原文把含噪实现写成 $\tilde{\mathcal G}=\mathcal G\mathcal E_{\mathcal G}$——先过噪声，再做理想门。于是`}</P>
      <Eq n="9" keyEq title="含噪门作用于 Pauli" say="含噪 Clifford 门把 $P_{\boldsymbol a}$ 送到理想的像 $\pm P_{\mathcal G(\boldsymbol a)}$，同时乘上一个因子 $\lambda_{\mathcal G,\boldsymbol a}$——它按**输入** Pauli 标记。">{R`\tilde{\mathcal G}(P_{\boldsymbol a})=\lambda_{\mathcal G,\boldsymbol a}\mathcal G(P_{\boldsymbol a})=(\pm)_{\mathcal G,\boldsymbol a}\lambda_{\mathcal G,\boldsymbol a}P_{\mathcal G(\boldsymbol a)}`}</Eq>
      <P w={1}>{R`$\lambda_{\mathcal G,\boldsymbol a}$ 严格说是「广义本征值」（$P_{\boldsymbol a}$ 被映到别的 Pauli 了）。对一个门只需要支撑在它上面的 Pauli；恒等 Pauli 的本征值恒为 1（迹保持、无泄漏），所以每个单比特门 3 个、每个两比特门 15 个未知数。`}</P>
      <MinorEq n="10" say="一个门的 Pauli 集：支撑完全落在门的比特上的 Pauli，$b$ 比特门共 $4^b$ 个。">{R`\mathrm{Pauli}(\mathcal G)=\{\boldsymbol a\in\mathbf P^n:\ \operatorname{supp}(\boldsymbol a)\subseteq\operatorname{supp}(\mathcal G)\}`}</MinorEq>
      <MinorEq n="11" say="全部未知数：对每个不同的层 $i$、层内每个门 $j$、门上的每个 Pauli $\boldsymbol a$，各有一个门本征值 $\lambda_{ij,\boldsymbol a}$。">{R`N=\{(ij,\boldsymbol a):\ i\in\mathcal I,\ j\in[k_i],\ \boldsymbol a\in\mathrm{Pauli}(\mathcal G_{ij})\}`}</MinorEq>

      <P>{R`**层与 tuple。** 综合征提取电路被切成 $l$ 层，每层的门同时执行、作用在互不相交的比特上。ACES 的实验不是跑原电路，而是跑**把这些层重新排列、重复**之后的电路：一个 tuple $T$ 就是一串层编号（可重复）。`}</P>
      <MinorEq n="12" say="电路按时间从右往左排：先 $\mathcal C_1$ 后 $\mathcal C_l$；每层是若干个互不重叠的门之积。">{R`\mathcal C=\mathcal C_l\ldots\mathcal C_2\mathcal C_1,\qquad\mathcal C_i=\prod_{j\in[k_i]}\mathcal G_{ij}`}</MinorEq>
      <Eq n="13" keyEq title="按 tuple 重排的电路" say="tuple $T=(T_1,\dots,T_L)$ 把原电路的层按指定次序（可重复）串起来，得到新电路 $\mathcal C_T$。">{R`\mathcal C_T=\prod_{u\in[L]}\mathcal C_{T_u}`}</Eq>
      <P w={3} label="tuple：设计只引用层编号">{R`用 tuple 参数化实验是本文的关键选择：表面码综合征提取电路无论码距多大，**层的种类都一样**（原文图 1 的 $d=3$ 电路 9 层、7 种），所以「哪些 tuple、各分多少 shot」可以在小码距上优化，原样搬到大码距上用。`}</P>

      <P>{R`**电路本征值。** 整条重排电路对 $P_{\boldsymbol a}$ 的作用和单个门 \eqref{9} 形式一样：送到理想像 $P_{T(\boldsymbol a)}$，再乘上总衰减 $\Lambda_{T,\boldsymbol a}$。跟着 Pauli 一层层走，每个门按 \eqref{9} 乘上「Pauli 此刻落在它支撑上的那一段」的本征值：`}</P>
      <MinorEq n="14" say="整条含噪电路对 $P_{\boldsymbol a}$ 的总效果：送到理想像 $P_{T(\boldsymbol a)}$，再乘上一个总衰减因子 $\Lambda_{T,\boldsymbol a}$。">{R`\tilde{\mathcal C}_T(P_{\boldsymbol a})=\Lambda_{T,\boldsymbol a}\mathcal C_T(P_{\boldsymbol a})=(\pm)_{T,\boldsymbol a}\Lambda_{T,\boldsymbol a}P_{T(\boldsymbol a)}`}</MinorEq>
      <BigEq n="15" label="电路本征值 = 门本征值之积"
        meaning="一条电路的总衰减，是 Pauli 一路走过时遇到的所有门本征值之积。"
        parts={[
          { tex: R`\Lambda_{T,\boldsymbol a}`, note: "可测：重排电路的总衰减" },
          { tex: R`\lambda_{T_uj,\boldsymbol a^{(u)}}`, note: R`未知：第 $u$ 步那一层、第 $j$ 个门、按**进门时**的 Pauli 取` },
        ]}>{R`\Lambda_{T,\boldsymbol a}=\prod_{u\in[L]}\prod_{j\in[k_{T_u}]}\lambda_{T_uj,\boldsymbol a^{(u)}}`}</BigEq>
      <P deep><Figure n="M2" caption={R`按原文图 2 的三比特例子自绘：tuple $T=(2,1,3,2)$，选择输入 Pauli、拖动滑块逐层前进。默认输入 $ZXI$ 时得到的六个因子与原文图注逐项一致。试试输入 $IIZ$：它在层 2 的 $H$ 上变成 $X$，再在层 1 的 CZ 上「长出」第二个比特的 $Z$。`} illustration={<PropagationStepper />} /></P>
      <Assume title="马尔可夫、时间平稳：同一层永远是同一组未知数">{R`同一层在 tuple 中出现两次，两次用的是**同一组**门本征值——原文假定每层噪声与前后层、与执行时刻无关（「马尔可夫、时间平稳」，动力学解耦被认为有助于此）。正是这种复用让方程可以多于未知数；若器件在实验期间漂移，或噪声依赖前一层，这一步就不成立。`}</Assume>
      <P w={1}>{R`易错点：$\lambda_{\mathcal G,\boldsymbol a}$ 的下标是门**之前**的 Pauli（噪声先作用）；同一个门遇到不同的 Pauli 贡献不同的因子，Pauli 在门支撑上是 $I$ 时不贡献因子。`}</P>

      <Fold title="一个 tuple 要测哪些电路本征值" steps={2} note="定义">
        <Tx>{R`原文的规则是：凡是支撑在重排电路中某个门上的 Pauli，都制备一次：`}</Tx>
        <Eq n="16" say="Pauli 制备集：重排电路里每个门的 Pauli 集合起来。">{R`\mathcal Q_T=\bigcup_{\mathcal G\in\mathcal C_T}\mathrm{Pauli}(\mathcal G)`}</Eq>
        <Eq n="17" say="全部要估计的电路本征值，由（tuple, Pauli）对标记。">{R`M=\{(T,\boldsymbol a):\ T\in\mathcal T,\ \boldsymbol a\in\mathcal Q_T\}`}</Eq>
        <Tx>{R`这条规则保证至少有一种设计是够用的：每层各跑一次的 tuple 集 $\{(i)\}_{i\in\mathcal I}$——此时电路本征值就是门本征值本身（不计 SPAM）。`}</Tx>
      </Fold>
    </PaperSec>);
}

export function S3() {
  return (
    <PaperSec role="solution" id="s-lsq" title="三、取对数：一个线性回归问题"
      lead="乘积不好解，对数把它变成加法。于是「从电路本征值求门本征值」就是一个标准的线性最小二乘问题，设计矩阵里只有非负整数。">
      <P>{R`把 \eqref{15} 按未知数整理：每个电路本征值是门本征值的幂积，幂次 $A_{\mu\nu}$ 就是 $\lambda_\nu$ 在路径上出现的次数。`}</P>
      <Eq n="18" say="电路本征值 $\Lambda_\mu$ 是门本征值的整数幂之积，幂次表 $A_{\mu\nu}$ 由电路结构完全确定，与噪声无关。">{R`\Lambda_\mu=\prod_{\nu\in N}\lambda_\nu^{A_{\mu\nu}}`}</Eq>
      <P w={1}>{R`只要本征值都离 0 足够远（落在 $(\delta,1]$ 中），就可以放心取负对数：$b_\mu=-\log\Lambda_\mu$，$x_\nu=-\log\lambda_\nu$。`}</P>
      <BigEq n="19" label="取对数后的线性方程组"
        meaning={R`取负对数后，乘积变求和：电路对数本征值是门对数本征值的整系数线性组合——一个以 $A$ 为设计矩阵的线性回归。`}
        parts={[
          { tex: R`A_{\mu\nu}`, note: "非负整数、只由电路结构决定；列满秩即可解" },
          { tex: R`x_\nu`, note: "门对数本征值：待估计" },
        ]}>{R`b_\mu=\sum_{\nu\in N}A_{\mu\nu}x_\nu`}</BigEq>
      <P>{R`实际的 $b_\mu$ 来自有限次测量，带有误差：`}</P>
      <MinorEq n="24" say="观测到的电路对数本征值 = 设计矩阵 × 门对数本征值 + 近似正态的统计误差，误差协方差为 $\Omega'$。">{R`\boldsymbol b=A\boldsymbol x+\boldsymbol\varepsilon`}</MinorEq>
      <P w={3} label="WLS 取代 OLS">{R`不同电路本征值测得准不准差别很大（衰减越厉害越不准），所以原文用**加权最小二乘**取代原始 ACES 的普通最小二乘：按估计方差的倒数加权，测得准的方程说话更算数。`}</P>
      <Eq n="25" keyEq title="WLS 估计" say="每个电路对数本征值按它的估计方差的倒数加权：测得准的方程说话更算数。">{R`\hat{\boldsymbol x}=\big(A^\intercal\hat WA\big)^{-1}A^\intercal\hat W\boldsymbol b`}</Eq>
      <P w={1}>{R`$\hat W$ 是对角阵，元素为电路对数本征值估计方差的倒数（用估计值本身算出）。因为门本征值不超过 1，负的 $\hat x_\nu$ 直接置 0。`}</P>
      <Fold title="OLS / WLS / GLS 的比较，以及还原错误概率" steps={2} note="旁支">
        <Eq n="B2" say="OLS、WLS、GLS 只差在用什么精度矩阵 $\hat P$：单位阵、对角方差倒数、还是完整协方差的逆。">{R`\hat{\boldsymbol x}=\big(A^\intercal\hat PA\big)^{-1}A^\intercal\hat P\boldsymbol b`}</Eq>
        <Tx>{R`精度依次 OLS < WLS < GLS。GLS 要对每个 tuple 的完整协方差块做 Cholesky 分解，$d=25$ 时有几十万个电路本征值，原文认为不可行，所以大规模时用 WLS；小规模问题原文建议用 GLS。原文附录 G 的 $d=3$ 比较中，三者的期望性能指标分别为 GLS $1.0346$、WLS $1.2001$、OLS $1.4601$。

估计出 $\hat{\boldsymbol\lambda}=e^{-\hat{\boldsymbol x}}$ 之后，对每个门做 \eqref{8} 的 WHT 得到错误概率；统计噪声可能让结果略微越出概率单纯形，再用欧氏距离投影回去（原文提到改用 Mahalanobis 距离可能更好，留作以后的工作）。`}</Tx>
      </Fold>
      <Assume title="SPAM 噪声全部算给测量">{R`制备与测量误差也会乘进每个电路本征值，而两者之间有**规范自由度**、无法分开估计。原文把 SPAM 噪声全部算在测量上来固定规范：每个比特、每种测量基一个参数，$\lambda_\nu=1-2p_\nu$，共 $3n$ 个。因此学到的「测量误差」其实混有制备误差。加入这些参数后 $\{(i)\}$ 不再满秩，于是补上只做制备+测量的空 tuple $()$，得到**基本 tuple 集** $\mathcal T_{\mathcal I}=\{(i)\}_{i\in\mathcal I}\cup\{()\}$——对任何电路都满秩，但性能很差（§六）。`}</Assume>
      <Fold title="为什么基本 tuple 集只能达到「加性」精度" steps={3} note="推导">
        <Derivation title="基本设计的误差下限" steps={[
          { tex: R`\Lambda_{(i),\boldsymbol a}=\lambda_{i,\boldsymbol a}\,\lambda_{\rm meas}`, why: R`单层 tuple：一个门本征值乘上输出 Pauli 的测量本征值（示意写法）。` },
          { tex: R`\mathrm{Var}[\hat\Lambda]=\frac{1-\Lambda^2}{S_T}\approx\frac{2(1-\Lambda)}{S_T}`, why: R`单次读数是 $\pm1$，方差 $1-\Lambda^2$（式 (21) 取 $\boldsymbol a=\boldsymbol a'$）。` },
          { tex: R`\mathrm{std}[\hat\lambda]\sim\sqrt{\frac{2(1-\lambda_{\rm meas})}{S_T}}`, why: R`门本征值很接近 1 时，误差主要由测量误差 $1-\lambda_{\rm meas}$ 决定，与 $1-\lambda$ 本身无关（原文噪声模型中 $p_m\approx2\%$，$1-\lambda_{\rm meas}=2p_m\approx4\%$）。` },
        ]} result={R`基本设计的误差不随门变好而变小：对 $1-\lambda\sim10^{-3}$ 的门，这意味着相对误差很大。要想做到相对精度，必须把门重复很多次让噪声放大（§六，附录 C）。`} />
      </Fold>
      <P deep><Figure n="M3" caption={R`迷你 ACES：在 3 比特玩具电路上做一次完整的模拟实验。每次点击都从头抽样有限 shot 的读数，用 \eqref{25} 估计 63 个门本征值；点的散布应大致落在由 §五 的协方差 $\Sigma$ 预测的 $\pm2\sigma$ 阴影带内。切换「基本 / 优化设计」可以直接看到优化设计在同样时间预算下误差小得多；下方选一个门，看估计的错误概率与真值。`} illustration={<MiniACES />} /></P>
    </PaperSec>);
}
