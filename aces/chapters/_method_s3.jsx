// method 页 §六–§八：实验设计优化（shot 分配、tuple 选择、附录 C 玩具问题）；表面码上的设定；易错点与自测。
// 公式 (30)(31)、(D1)、(C1)(C3)(C13)–(C15)(C17)(C20)(C21)、(F1)(F2)。
import { PaperSec, Tx, Eq, Box, Figure, Quiz, Table } from "@kit";
import { DesignLab, ToyCPhiPlot, ToyCFPlot, ToyCGammaPlot } from "./_method_plots.jsx";
import { ScheduleFig } from "./_paper_plots.jsx";

const R = String.raw;

export function S6() {
  return (
    <PaperSec role="solution" id="s-design" title="六、优化实验设计：shot 分配与 tuple 选择"
      lead="性能指标是 (T, Γ) 的一个可计算函数，于是实验设计就成了一个优化问题。原文分两层：连续的 shot 权重用梯度下降；离散的 tuple 集用坐标下降 + 贪心增删。">
      <Tx>{R`**shot 权重：在单纯形上做梯度下降。** 为了让权重始终为正且和为 1，原文改用对数权重 $\boldsymbol\gamma$，$\Gamma_T=e^{-\gamma_T}/\sum_Ue^{-\gamma_U}$，并用 Nesterov 动量：在「先按惯性走一步」的位置求梯度。`}</Tx>
      <Eq n="30" say="速度 = 衰减后的旧速度 − 学习率 × 在前瞻点处的梯度。">{R`\boldsymbol v^{(s+1)}=\sym{mom}{\mu}\boldsymbol v^{(s)}-\eta\frac{\partial\mathcal F}{\partial\boldsymbol\gamma}\big(\mathcal T,\boldsymbol\gamma^{(s)}+\sym{mom}{\mu}\boldsymbol v^{(s)}\big)`}</Eq>
      <Eq n="31" say="按速度更新对数权重。">{R`\boldsymbol\gamma^{(s+1)}=\boldsymbol\gamma^{(s)}+\boldsymbol v^{(s+1)}`}</Eq>
      <Tx>{R`原文取 $\eta=10^{3/4}$、$\sym{mom}{\mu}=0.99$；某一步让 $\mathcal F$ 变差就撤回并清零速度，短时间内多次撤回就把学习率除以 $\eta_r=10^{1/4}$。梯度通过链式法则从对 $\Gamma$ 的导数得到（附录 D；原文说数值自动微分慢得不可用，所以推了解析式）：`}</Tx>
      <Eq n="D1" say="softmax 参数化的链式法则（对 $U$ 隐含求和）：改变一个 $\gamma_T$ 会同时挪动所有权重。">{R`\frac{\partial\mathcal F}{\partial\gamma_T}=\frac{\partial\mathcal F}{\partial\Gamma_U}\frac{\partial\Gamma_U}{\partial\gamma_T}=\frac{\partial\mathcal F}{\partial\Gamma_U}\big(\Gamma_U\Gamma_T-\delta_{UT}\Gamma_T\big)`}</Eq>
      <Box kind="note" title="我们的实现">{R`下面「实验设计实验室」在浏览器里跑的就是 \eqref{30}\eqref{31}\eqref{D1}，参数与原文相同。$\partial\mathcal F/\partial\Gamma_U$ 我们没有照搬附录 D 的 WLS 表达式，而是利用一个结构上的简化：每个 tuple 块的协方差随权重只按一个标量 $c_U\propto\tau_{\mathcal T,\Gamma}/\Gamma_U$ 缩放，于是 \eqref{26} 中的 $A^\intercal WA$ 与 $A^\intercal W\Omega'WA$ 都是「各块固定矩阵 $/c_U$」之和，梯度可以直接对这两个和求导。在 node 中与有限差分核对，一致到 $10^{-4}$。`}</Box>

      <Tx>{R`**tuple 集：浅的加上深的。** 线性回归的最优设计理论（Elfving 定理）说：最优设计只用少数几个、彼此「拉得最开」的测量点。在 ACES 里，浅 tuple 给出接近 1 的电路本征值，深 tuple 给出小得多的本征值——于是原文在基本 tuple 集之外加入一组**重复 tuple** $\mathcal T_{\rm rep}$，类似门集层析（GST）里的「germ」：把若干层重复很多次以放大噪声。实践中最好让被重复的那段在 Pauli 修正下是一个对合（做两遍等于恒等），并只用奇数重复次数；CZ 层总是与动力学解耦层交错，例如 $(2,5,2,5)$ 重复 25 次。重复次数用一个步长按指数增长的坐标下降优化（每一步都先把 shot 权重优化好再评估 $\mathcal F$）。

然后用算法 2 优化浅 tuple：做几轮「远足」，每轮先随机生成 tuple、只保留能降低 $\mathcal F$ 的，直到集合多出 $l_{\rm ex}$ 个；再贪心删除，直到删不动或回到目标大小 $l_{\rm set}$。原文常用 $n_{\rm ex}=3$、$l_{\rm ex}=10$、$l_{\rm set}=5|\mathcal I|$、$f_{\rm trial}=20$；随机 tuple 的长度服从截断的 Zipf 分布，一半是「镜像」tuple。原文发现算法 2 加进来的随机 tuple 都很浅（深度不超过 4）。`}</Tx>
      <Figure n="M4" caption={R`实验设计实验室（缩小版的原文图 3）。表格对比四种设计在同一个对数正态噪声实例上的 $\mathcal F$ 与 $\sqrt{\mathcal V}$，以及达到同样精度所需的相对预算 $(\mathcal F/\mathcal F_{\rm opt})^2$。勾选设计后点「模拟 100 次」：每次都逐 shot 地重新抽样、重新估计，柱状图是实际的归一化 RMS 误差，曲线是由 \eqref{27} 抽样得到的预测分布。三件事值得看：①只换 shot 分配（均匀 → 默认 → 优化）就能显著降低 $\mathcal F$；②优化后大部分预算落在两个 CZ 层**单独**测量的 tuple 上，与原文附录 G 的观察一致；③预测分布与模拟吻合。`} illustration={<DesignLab />} />
      <Box kind="warning" title="玩具版与原文的差别">{R`这里的电路只有 3 个比特、4 种层、63 个参数；优化 tuple 集由我们在 node 中按原文思路（基本集 + 重复 tuple + 贪心加删浅 tuple）跑出，规模远小于原文 $d=3$ 表面码的 31 个 tuple。为了在 $S'\sim10^5$ 的小预算下看清效果，平均错误率取得比原文大（$r_1=0.2\%$、$r_2=1\%$），所以绝对数值不可与原文比较；可比的是**现象**：优化设计在同样机时下好 2–3 倍（原文 $d=3$ 为 $3.17$ 倍），预测与模拟一致。原文中优化后的设计在对数正态噪声上的表现反而略好于它被优化的去极化噪声；在我们的玩具例子里不是这样（$1.07$ 对 $0.97$），说明这一点依赖于具体电路。`}</Box>

      <h3 className="tb-h3">附录 C：一个能算到底的玩具问题</h3>
      <Tx>{R`为了说明 ACES 能做到相对精度、以及计时如何改变结论，附录 C 研究了一个可以解析处理的例子：一层 $n$ 个单比特 Pauli 门（每个门 3 个本征值都等于 $\lambda$），每个比特每种测量基一个 SPAM 本征值 $\lambda_m$，共 $N=6n$ 个参数；两个 tuple 分别把这一层重复 $\phi_1$ 和 $\phi_2=\phi_1+\phi$ 次。按顺序排好后，设计矩阵是`}</Tx>
      <Eq n="C1" say="第一行块：重复 $\phi_1$ 次的电路对数本征值 = $\phi_1$ 个门 + 1 个测量；第二行块同理。">{R`A=\begin{bmatrix}\phi_1I_{3n}&I_{3n}\\\phi_2I_{3n}&I_{3n}\end{bmatrix}`}</Eq>
      <Tx>{R`每个 tuple 只需 3 个实验（全部比特同时制备、测量 $X$、$Y$ 或 $Z$），电路本征值估计互不相关。以一层门的时长为单位，测量+复位耗时 $\tau$；把权重 $\Gamma$ 给 $\phi_2$ tuple，时间因子为`}</Tx>
      <Eq n="C3" say="平均每个 shot 的时长：测量复位 $\tau$ 加上平均执行的层数。">{R`\tau_{\mathcal T,\Gamma}=\tau+\phi_1+\Gamma\phi`}</Eq>
      <Tx>{R`沿 §五 的路线算出 $\Sigma$，只对门本征值那一块取迹（原文称之为修改后的 $\mathcal F$）：`}</Tx>
      <Eq n="C13" say="玩具问题的性能指标：括号外是「深电路更费时」的代价，括号里是两个 tuple 各自的统计误差按 shot 份额加权。">{R`\mathcal F=\sqrt{\frac{(2\tau+1)(\tau+\phi_1+\Gamma\phi)}{4\tau(\tau+1)}\left(\frac{f_1}{1-\Gamma}+\frac{f_2}{\Gamma}\right)}`}</Eq>
      <Eq n="C14" say="浅 tuple 的误差因子。">{R`f_1=\frac{\lambda^2(\lambda^{-2\phi_1}-\lambda_m^2)}{\phi^2}`}</Eq>
      <Eq n="C15" say="深 tuple 的误差因子：电路本征值 $\lambda_m\lambda^{\phi_2}$ 越小，$f_2$ 越大。">{R`f_2=\frac{\lambda^2(\lambda^{-2\phi_1}\lambda^{-2\phi}-\lambda_m^2)}{\phi^2}`}</Eq>
      <Box kind="warning" title={R`存疑：(C13) 的常数前因子`}>{R`按 (C5)–(C12) 与 $\mathcal F=\sqrt{S'/N}\sqrt{\operatorname{tr}\Sigma}$（$N=6n$，迹只取门块）直接计算，得到的是 \eqref{C13} 根号内再乘一个常数 $3/\lambda_m^2$（$\lambda_m=0.96$ 时约 $3.26$，即 $\mathcal F$ 约大 $1.80$ 倍）。我们在 node 中用 (C1)(C8)–(C10) 直接求 $\Sigma'=(A^\intercal\Omega'^{-1}A)^{-1}$ 核对过这个比值。原文说这里的 $\mathcal F$ 是「修改后的」性能指标，归一化可能另有约定，所以我们保留原式。这个常数**不影响**最优的 $\Gamma$ 与 $\phi$（因而不影响原文图 9、图 10 和 $\phi_{\rm opt}=306$），只影响图 11 纵轴的绝对值。下面的交互图按原式绘制。`}</Box>
      <Tx>{R`对 $\Gamma$ 求导令其为零，得到最优分配`}</Tx>
      <Eq n="C17" say="最优 shot 份额：两个 tuple 的「时长 × 误差因子」开方后按比例分配——经典的 Neyman 式分配。">{R`\Gamma=\frac{\sqrt{(\tau+\phi_1)f_2}}{\sqrt{(\tau+\phi_2)f_1}+\sqrt{(\tau+\phi_1)f_2}}`}</Eq>
      <Tx>{R`再对 $\phi_1$ 求导，导数恒正，所以最优 $\phi_1=0$——浅的那个 tuple 越浅越好（正是 Elfving 定理的预言）。代入得`}</Tx>
      <Eq n="C20" keyEq title="附录 C：计时的性能指标" say="只剩一个设计变量：深 tuple 的重复次数 $\phi$。第一项来自只做 SPAM 的浅 tuple，第二项来自深 tuple。">{R`\mathcal F=\sqrt{\frac{(2\tau+1)}{4\tau(\tau+1)}}\,\frac{\lambda}{\phi}\Big(\sqrt{\tau(1-\lambda_m^2)}+\sqrt{(\tau+\phi)(\lambda^{-2\phi}-\lambda_m^2)}\Big)`}</Eq>
      <Tx>{R`如果不计电路时长（只数样本），同样的计算给出`}</Tx>
      <Eq n="C21" say="不计时间、只数 shot 时的性能指标；按它优化得到「样本最优」设计。">{R`\mathcal F'=\frac{\lambda}{\sqrt2\,\phi}\Big(\sqrt{1-\lambda_m^2}+\sqrt{\lambda^{-2\phi}-\lambda_m^2}\Big)`}</Eq>
      <Figure n="M5" caption={R`$\mathcal F$ 随重复次数 $\phi$ 的变化（式 (C13)，$\phi_1=0$，$\tau=660/29$，$\lambda_m=0.96$）。竖线是由 \eqref{C20} 求出的 $\phi_{\rm opt}$。`} illustration={<ToyCGammaPlot />} />
      <Figure n="M6" caption={R`重画原文图 9：最优重复次数。`} illustration={<ToyCPhiPlot />} />
      <Tx>{R`两种设计的 $\phi_{\rm opt}$ 都 $\propto1/(1-\lambda)$，对应的最优电路本征值 $\lambda_m\lambda^{\phi_{\rm opt}}$ 趋于常数（原文图 10）：样本最优约 $0.37$，时间最优缓慢趋近约 $0.80$。我们的计算在 $1-\lambda=10^{-3}$ 处给出时间最优 $\phi_{\rm opt}=306$、对应电路本征值 $0.707$；原文附录 G 还提到达到渐近最优电路本征值只需 176 次重复——$0.96\times0.999^{176}\approx0.805$，与这里的渐近值相符。`}</Tx>
      <Figure n="M7" caption={R`重画原文图 11 的三条曲线（按原式 (C20)(C21)，见上方存疑框）。`} illustration={<ToyCFPlot />} />
      <Box kind="key" title="附录 C 的结论">{R`只数样本时，深电路能把误差压到 $\propto 1-\lambda$（相对精度）；把机时算进去，深电路的代价使最优误差只能 $\propto\sqrt{1-\lambda}$，「完全的相对精度」在固定机时下做不到。原文附录 G 把这里的 $\phi_{\rm opt}=306$ 与表面码优化设计中单比特 Pauli 层的重复次数 191 相比较，认为两者在不同情境下足够接近。`}</Box>
    </PaperSec>);
}

export function S7() {
  return (
    <PaperSec role="background" id="s-surface" title="七、落到表面码：电路、噪声模型与规模"
      lead="原文在一个跟随真实实验结构的 XZZX 表面码综合征提取电路上检验整套流程。下面把具体设定集中列出，便于对照结果。">
      <Tx>{R`**电路。** 原文图 1 的 $d=3$ 电路有 9 个数据比特、8 个测量比特，分 9 层：CZ 层（第 2、4、6、8 层）与单比特层（Hadamard 与动力学解耦 $X$ 门）交替，第 5 层只有动力学解耦 $X$ 门，保证任意两个 CZ 层之间隔着单比特层。第 1、9 层相同，第 3、7 层相同。第 5 层的 $X$ 门与其他层里作用在同一比特上的 $X$ 门**分开**学习——同一个物理门、不同的层，是不同的信道（§一）。`}</Tx>
      <Figure n="M8" caption={R`按原文图 1 的文字描述自绘的层结构（不是原图）：相同的层共用编号，原电路写成 tuple $(1,2,3,4,5,6,3,8,1)$。`} illustration={<ScheduleFig />} />
      <Tx>{R`**噪声模型：对数正态 Pauli 噪声（附录 F）。** 为了模仿真实器件中错误率参差不齐的样子，每个门的每个非恒等 Pauli 错误概率独立地取对数正态分布，参数调到使门的不保真度（非恒等错误概率之和）均值为 $r_1=0.075\%$（单比特，含填充的恒等门）、$r_2=0.5\%$（两比特）、$r_m=2\%$（测量），离散程度 $\sigma_{\rm tot}^2=\log(10/9)$。$b$ 比特门有 $b'=4^b-1$ 个错误概率，把它们的和近似成对数正态，反解出单个概率的参数：`}</Tx>
      <Eq n="F1" say="让 $b'$ 个对数正态变量之和的相对离散程度等于目标值，反解单个变量的形状参数。">{R`\sigma_Z^2=\log\big(1+b'(\exp(\sigma_{Z;b}^2)-1)\big)`}</Eq>
      <Eq n="F2" say="再由均值反解位置参数：每个概率的均值为总不保真度的 $1/b'$。">{R`\mu_Z=\log\big(\mu_{X;b}/b'\big)-\sigma_Z^2/2`}</Eq>
      <Tx>{R`代入得单比特门 $\sigma_Z^2=\log(4/3)\approx0.288$、$\mu_Z\approx-8.438$；两比特门 $\sigma_Z^2=\log(8/3)\approx0.981$、$\mu_Z\approx-8.497$；测量 $\mu_Z\approx-3.965$（我们逐一复算过）。时长按文献中的实验取：每个门层 29 ns，测量+复位 660 ns。实验设计一律针对**同样平均错误率的去极化噪声**优化，再拿去刻画对数正态噪声的随机实例。`}</Tx>
      <Table head={["量", "原文取值 / 结果", "出处"]} rows={[
        [R`比特数 $n$`, R`$2d^2-1$；$d=25$ 时 $1249$`, "§V"],
        [R`门本征值数 $N(d)$`, R`$84d^2-36d-24$；$d=25$ 时 $51{,}576$`, "§V"],
        ["优化设计", R`31 个 tuple：3 个重复 tuple（单比特层，重复 191–233 次）、4 个 CZ+DD 重复 tuple（重复 25 次）、其余为深度 ≤4 的浅 tuple`, "附录 G 表 II"],
        ["shot 权重", R`CZ 层单独测量的 4 个 tuple $(2),(4),(6),(8)$ 共占约 $58\%$`, "附录 G 表 II"],
        ["实验数", R`261（$d=3$ 到 $25$ 不变，Pauli 帧随机化之前）`, "§V"],
        ["电路本征值数", R`$d=25$：$267{,}357$`, "§V"],
      ]} />
      <Box kind="note" title="为什么设计能从 d=3 搬到 d=25">{R`tuple 只引用「层的编号」，而所有码距的电路都由同样 7 种层组成；实验打包（算法 1）只依赖局部结构，所以实验数不随 $d$ 变。原文进一步发现，对去极化噪声，$\operatorname{tr}(\Sigma)/S'$ 与 $\operatorname{tr}(\Sigma^2)/S'^2$ 都能被 $d$ 的二次函数精确拟合（每个数据点相对误差 $<10^{-8}$），连同 $N(d)$ 代入 \eqref{28}\eqref{29}，就得到 $\mathcal F(d)$、$\mathcal V(d)$ 的函数形式，并且 $d\to\infty$ 时 $\mathcal F$ 趋于常数。这是经验拟合，不是证明。`}</Box>
    </PaperSec>);
}

const QUIZ = [
  { q: R`一个单比特 Pauli 信道 $p_X=0.01$、$p_Y=0$、$p_Z=0.02$，$\lambda_Z$ 等于多少？`, options: [R`$0.97$`, R`$0.98$`, R`$0.99$`, R`$0.94$`], answer: 1, why: R`与 $Z$ 反对易的是 $X$、$Y$：$\lambda_Z=p_I+p_Z-p_X-p_Y=0.97+0.02-0.01-0=0.98$。` },
  { q: R`tuple $(2,1,3,2)$ 中层 2 出现了两次。估计时这两次对应的门本征值——`, options: ["是两组独立的未知数", "是同一组未知数", "第二次的本征值是第一次的平方", "只有第一次被计入"], answer: 1, why: R`方法假设噪声马尔可夫且时间平稳：同一层无论何时执行，噪声都一样。正是这种「复用」让方程个数可以多于未知数。` },
  { q: R`为什么原文把 WLS 而不是 GLS 作为大规模时的估计方法？`, options: ["WLS 更精确", "GLS 需要完整协方差块的 Cholesky 分解，几十万个电路本征值时不可行", "GLS 是有偏的", "WLS 不需要知道方差"], answer: 1, why: R`精度上 GLS > WLS > OLS（附录 B），但 GLS 的计算量在 $d=25$ 时太大；原文建议小规模用 GLS。` },
  { q: R`设计 A 的 $\mathcal F$ 是设计 B 的 3 倍。要达到同样的期望误差，A 需要的机时约是 B 的——`, options: ["3 倍", R`$\sqrt3$ 倍`, "9 倍", "相同"], answer: 2, why: R`误差 $\propto\mathcal F/\sqrt{S'}$，固定误差时 $S'\propto\mathcal F^2$。原文 $3.17^2\approx10.1$ 就是这样来的。` },
  { q: R`附录 C 中，为什么考虑电路时长后，最优误差只能 $\propto\sqrt{1-\lambda}$ 而不是 $\propto 1-\lambda$？`, options: ["因为 SPAM 噪声无法消除", R`因为重复次数 $\propto1/(1-\lambda)$ 的深电路跑一次要很久，同样机时内 shot 变少`, "因为 WLS 有偏", "因为 Pauli 帧随机化引入了额外噪声"], answer: 1, why: R`放大噪声需要 $\phi\sim1/(1-\lambda)$ 次重复，电路时长随之增长，抵消了一部分放大带来的收益。` },
  { q: R`两个 Pauli 能在同一个实验中同时被估计（$T$-相容）的条件是——`, options: ["它们对易", "在制备端和测量端的每个比特上，两者相同或至少一个是恒等", "它们的支撑不相交", "它们的电路本征值相等"], answer: 1, why: R`原文只用逐比特的 $X/Y/Z$ 制备和测量，所以每个比特上只能有一种非恒等 Pauli。支撑不相交是充分但不必要的。` },
];

export function S8() {
  return (
    <PaperSec role="editor" id="role-editor" title="易错点与自测">
      <Box kind="warning" title="几处容易读错的地方">{R`**「门本征值」并不是门本身的性质**，而是「这个门在这一层的语境里」的信道，并且是整层噪声在门支撑上的边缘（附录 A）。**$S$ 与 $S'$ 不同**：$S'$ 是基本设计在同样机时下的 shot 数，是比较不同设计时的公平尺度；性能指标按 $S'$ 归一化。**性能指标是在已知真值下算的**：实际使用时要用对噪声的先验估计（原文用平均错误率相同的去极化噪声）来优化设计，图 6 检验的就是这种先验不准时的损失。**表 I 等结果都来自数值模拟**，模拟所用的噪声严格满足方法的假设（Pauli、马尔可夫、时间平稳）。`}</Box>
      <Quiz questions={QUIZ} />
    </PaperSec>);
}
