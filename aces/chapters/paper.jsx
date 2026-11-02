// 速读与导读页：背景 → 缺口 → 动机 → 方案 → 结果 → 局限 → 编者评注。
// 带编号的公式都在 method 页（本页用 \eqref 链过去，避免同一编号在两页重复登记）；本页的图在 _paper_plots.jsx，
// 全部按原文报告的数值重画。符号词典与 method 页共用（_method_notation.js）。
import { PaperPage, PaperSec, GapMap, Stakes, KeyIdea, Pipeline, Headline, ClaimBoard, Claim, Limits, EditorView, ReadingGuide, Quiz, Tx, Box, Figure, Table } from "@kit";
import { NOTATION } from "./_method_notation.js";
import "./_paper_kit.jsx";
import { TableIPlot, D25Plot, ScalingPlot, ScheduleFig } from "./_paper_plots.jsx";

const R = String.raw;

export const meta = {
  id: "paper", no: 0, label: "速读与导读", title_zh: "速读与导读", title_en: "The paper at a glance",
  tldr: R`把 ACES 改写成以「层的重排（tuple）」为单位的实验设计，推导出能在实验前预言估计误差的性能指标 $\mathcal F$ 并据此优化设计；数值模拟显示，在 1249 比特的 $d=25$ 表面码综合征提取电路上，所需实验数和归一化精度都与码距无关，预测与模拟高度吻合。`,
  gmsr: {
    gap: R`详细的噪声刻画（层析、GST）不能扩展；能扩展的（随机基准）不够细。原始 ACES 可扩展又细致，但缺少可靠的性能预测与设计方法，也没在综合征提取电路的规模上验证过。`,
    motivation: R`综合征提取电路占容错机器的大部分比特和门；知道每个门的 Pauli 错误概率，能改进解码、利用偏置噪声。协议必须在数百至上千比特上仍然好用。`,
    solution: R`电路本征值是门本征值之积，取对数后做加权最小二乘；把 shot 统计误差解析地传播到门本征值，得到性能指标 $\mathcal F$，用它优化 tuple 集与 shot 分配；设计在 $d=3$ 上优化后原样用于大码距。`,
    result: R`$d=25$（1249 比特、51,576 个参数）：261 个实验，预测 $\mathcal F=1.3245$，$S=10^9$ 时实测 $1.3245$；优化设计比基本设计省约 10 倍样本；先验错误率差 2 倍最多多花 13% 预算。全部为数值模拟。`,
  },
  overview: R`这篇论文（Hockings、Doherty、Harper，悉尼大学，arXiv:2404.06545）做的是**量子纠错电路的噪声体检**：给定一条表面码综合征提取电路，在不知道噪声的前提下，设计一套实验，从测量数据中估计电路里**每个门**的 Pauli 错误概率，并保证这件事在上千比特的规模上仍然做得动、做得准。本页先给最少的背景，再按「缺口—动机—方案—结果」梳理全文，最后是局限与编者评注。推导细节、各公式与可运行的小实验在\mlink{b-top|方法深读}页。`,
  prereq: [
    { what: R`表面码与综合征提取电路的基本图像（数据比特、测量比特、稳定子测量）` },
    { what: R`Pauli 矩阵与 Clifford 门；量子信道的概念` },
    { what: R`线性最小二乘的基本知识` },
  ],
};
export const notation = NOTATION;

const PIPE = [
  { title: "拆层、选 tuple", what: "把电路切成若干层，用「层的重排」定义要跑的电路", out: R`tuple 集 $\mathcal T$`,
    why: R`表面码的层种类与码距无关，用 tuple 描述实验，设计就能跨码距复用。`,
    detail: R`原文图 1 的 $d=3$ 电路有 9 层、7 种（第 1=9 层、第 3=7 层），原电路写作 tuple $(1,2,3,4,5,6,3,8,1)$。一个 tuple 可以重复某些层很多次以放大噪声（见 \eqref{13}）。最简单的「基本 tuple 集」是每种层各跑一次再加一个只做制备和测量的空 tuple。` },
  { title: "打包实验", what: "把能同时测的 Pauli 塞进同一个实验", out: R`实验集 $\sym{Eset}{\mathcal E}_T$`,
    why: R`待估计的电路本征值有 $\mathcal O(n)$ 个；只有每个实验同时测 $\mathcal O(n)$ 个，实验数才能与 $n$ 无关。`,
    detail: R`只用逐比特的 $X/Y/Z$ 制备与测量，所以两个 Pauli 在制备端和测量端的每个比特上必须相同或有一个是恒等（「$T$-相容」）。原文的算法 1 是一个确定性的贪心打包；$d=3$ 到 $d=25$ 的优化设计都只需要 261 个实验。` },
  { title: "采样电路本征值", what: R`制备 Pauli 本征态 → 跑电路 → 测量，读数平均即 $\hat\Lambda$`, out: R`$\hat\Lambda$ 与协方差 $\Omega$`,
    why: R`电路本征值是「输入 $P_{\boldsymbol a}$、输出端测 $P_{T(\boldsymbol a)}$」的期望值 \eqref{20}，可以直接测。`,
    detail: R`单次读数 $\pm1$，方差 $1-\Lambda^2$；同一实验里两个读数的协方差是 $\Lambda_{\boldsymbol a+\boldsymbol a'}-\Lambda_{\boldsymbol a}\Lambda_{\boldsymbol a'}$ \eqref{21}。再考虑每个 tuple 分到的 shot 份额和电路时长，得到估计量协方差的闭式 \eqref{23}。` },
  { title: "取对数、加权最小二乘", what: "乘积变求和，解一个稀疏线性回归", out: R`门本征值 $\hat{\boldsymbol\lambda}$`,
    why: R`电路本征值是门本征值之积 \eqref{15}；取负对数后是 $\boldsymbol b=A\boldsymbol x$ \eqref{19}，设计矩阵 $A$ 只含非负整数。`,
    detail: R`用 WLS \eqref{25} 代替原始 ACES 的 OLS：按每个电路对数本征值的估计方差加权。GLS 更准但 $d=25$ 时算不动。SPAM 噪声全部归到测量上以固定规范。` },
  { title: "还原错误概率", what: "逐门做 Walsh–Hadamard 变换，再投影到概率单纯形", out: R`每个门的 $p_{\boldsymbol a}$`,
    why: R`错误概率与本征值互为 WHT \eqref{7}\eqref{8}。`,
    detail: R`有限样本下反推出的「概率」可能为负，原文用欧氏距离投影回单纯形；门本征值大于 1 的估计置为 1。附录 A 证明，学到的是整层噪声在该门支撑上的边缘分布。` },
  { title: R`性能指标 $\mathcal F$ 与设计优化`, what: "实验前算出误差分布，据此挑 tuple、分 shot", out: R`优化设计 $(\mathcal T,\Gamma)$`,
    why: R`有了 $\Omega$，误差可以一路线性传播到门本征值：误差平方和是广义卡方分布 \eqref{27}，其均值给出 $\mathcal F$ \eqref{28}。`,
    detail: R`shot 权重用 Nesterov 动量梯度下降 \eqref{30}\eqref{31}；重复 tuple 的重复次数用坐标下降；浅 tuple 用贪心增删（算法 2）。设计针对与目标同平均错误率的去极化噪声优化，在 $d=3$ 上完成后直接搬到 $d=25$。` },
];

const CLAIMS = [
  { id: "C1", claim: R`性能指标 $\mathcal F$ 能准确预言实际的估计误差`, strength: "strong" },
  { id: "C2", claim: "优化设计比基本设计省约 10 倍样本", strength: "moderate" },
  { id: "C3", claim: "归一化精度与实验数随码距渐近不变", strength: "moderate" },
  { id: "C4", claim: "设计对噪声先验的误设很鲁棒", strength: "moderate" },
  { id: "C5", claim: R`各类门的估计误差都按 $1/\sqrt S$ 下降`, strength: "strong" },
  { id: "C6", claim: "ACES 可以做到相对精度", strength: "weak" },
];

export default function Paper() {
  return (
    <PaperPage meta={meta} notation={notation} keyEquations={false}>
      <PaperSec role="background" title="读懂本文需要的最少背景">
        <Tx>{R`**综合征提取电路是容错机器的主体。** 表面码把一个逻辑比特编码在 $d\times d$ 个数据比特上，另有 $d^2-1$ 个测量比特，一轮又一轮地测量稳定子（相邻数据比特的 $X$ 或 $Z$ 宇称）。测稳定子的那条电路——综合征提取电路——由几层 CZ 门和单比特门交替构成，占了容错计算中绝大部分的比特和门操作。它的噪声长什么样，直接决定纠错的效果。

**Pauli 噪声与本征值。** 经过 Pauli 帧随机化（随机编译）之后，每个门的噪声可以当作一个 **Pauli 信道**：以概率 $p_{\boldsymbol a}$ 随机施加一个 Pauli 错误。与这些概率等价、但更好测的是信道的 **Pauli 本征值** $\lambda_{\boldsymbol a}$：制备 $P_{\boldsymbol a}$ 的本征态，让它经过噪声，读数平均就被缩短为 $\lambda_{\boldsymbol a}$。概率与本征值互为 Walsh–Hadamard 变换（\mlink{role-background|方法深读 §一}）。

**ACES 是什么。** 平均电路本征值采样（averaged circuit eigenvalue sampling，Flammia 2021）的想法是：一个 Pauli 穿过一条 Clifford 电路时，它被路径上每个门的本征值依次缩短，**整条电路的本征值等于这些门本征值之积**。只要跑足够多、足够不同的电路，测出它们的总本征值，就能反解出每个门的本征值——一次性、对电路里所有门同时进行。本文在这个框架上做了三件事：换一种描述实验的方式（tuple）、给出精确的性能分析（$\mathcal F$）、并据此优化实验设计。`}</Tx>
        <Figure n="P1" caption={R`本文研究的 XZZX 表面码综合征提取电路的层结构（按原文图 1 的文字描述自绘）：4 个 CZ 层与单比特层交替；第 5 层只有动力学解耦 $X$ 门。码距变大时层的种类不变——这是设计可以跨码距复用的根本原因。`} illustration={<ScheduleFig />} />
      </PaperSec>

      <PaperSec role="gap" title="已有方法缺了什么">
        <GapMap rows={[
          { name: "全过程层析 / 门集层析（GST）", does: "完整刻画噪声，包括相干误差", misses: "参数与实验数随比特数指数增长，原文称其「扩展性差」" },
          { name: "随机基准（RB）及其变体", does: "高效、可扩展，对 SPAM 不敏感", misses: "只给出平均错误率这类少数几个数，看不到噪声的细节（哪个门、哪种 Pauli 错误）" },
          { name: "Pauli 信道估计、cycle benchmarking、cycle error reconstruction（CER）", does: "在受限的噪声模型中拟合较少参数；CER 还能学层内关联、达到相对精度", misses: "按原文的讨论，学习更细的关联要用更多实验换取；对综合征提取电路这种上千比特的场景，可扩展性与设计方法没有现成答案" },
          { name: "原始 ACES（Flammia 2021）", does: "一个框架同时估计 Clifford 电路里所有门的 Pauli 信道", misses: "用普通最小二乘；以设计矩阵伪逆范数作为设计准则，并不能准确预言性能；没有系统的实验设计优化，也没在综合征提取电路的规模上验证" },
          { name: "本文", ours: true, does: "以层与 tuple 重写 ACES；精确推导估计量的协方差", misses: R`给出可预测误差的性能指标 $\mathcal F$，用它优化设计；改用加权最小二乘；在 1249 比特的 $d=25$ 表面码上完整模拟` },
        ]} gap={R`需要一个**既细到每个门的 Pauli 错误概率、又能扩展到上千比特**的噪声刻画协议，并且在花机时之前就能知道它会有多准、该怎样设计实验。`} />
        <Tx>{R`说明：上表关于其他方法的评价依据的是原文引言与 §III E 的概括，原文没有与它们做定量比较；关于 CER，原文的结论是两者「性能相当」、各自都可以修改以获得对方的长处。`}</Tx>
      </PaperSec>

      <PaperSec role="motivation" title="为什么值得做">
        <Stakes chain={[
          { if: "综合征提取电路占了容错机器的大部分比特和门", then: "刻画这条电路的噪声，就是刻画整台机器噪声的主体" },
          { if: "知道每个门、每种 Pauli 错误的概率（包括偏置）", then: "可以给解码器喂更准的错误模型，为偏置噪声定制码、解码器与容错操作" },
          { if: "刻画协议的实验数或精度随比特数恶化", then: "在数百比特的近期器件和早期容错机器上就无法常规使用" },
          { if: "机时有限且器件参数会漂移", then: "必须在做实验之前就知道怎样分配机时最划算" },
        ]} payoff={R`一个精度可预测、实验数与规模无关、能在笔记本上完成设计与数据分析的协议，让「详细噪声刻画」成为近期器件的日常工具，并为噪声感知解码铺路。`} />
      </PaperSec>

      <PaperSec role="solution" title="方案：ACES + 可计算的性能指标 + 实验设计优化">
        <KeyIdea analogy={R`像体检时同时抽几管血、测十几项指标：每项化验结果都是若干器官状态的组合，单看一项说明不了问题，但把很多项放在一起解方程，就能定位到每个器官。本文额外做的是：事先算出这套化验单能把每个器官测得多准，并据此决定抽哪几管、各抽多少。`}>{R`**乘积取对数就是线性回归，线性回归的误差可以事先算出来。** 电路本征值 $=$ 门本征值之积，取对数后是设计矩阵为非负整数的线性方程组 \eqref{19}。读数是 $\pm1$ 的样本平均，其协方差有闭式 \eqref{23}；把它沿加权最小二乘一路传到门本征值，就得到估计误差的完整分布 \eqref{27} 和性能指标 $\mathcal F$ \eqref{28}——于是「怎样设计实验」变成了一个可以在经典计算机上求解的优化问题。`}</KeyIdea>
        <Pipeline steps={PIPE} />
        <Tx>{R`**三个值得记住的设计选择。** ① **以层为单位**：门的噪声是在「它所在的层」这个语境里学的，自动包含层内串扰的平均效应（附录 A）。② **以机时而非 shot 计价**：深电路更费时，预算 $S$ 按平均电路时长折算 \eqref{22}；这一点改变了「重复多少次最好」的答案（附录 C）。③ **小码距优化、大码距使用**：设计只引用层编号，$d=3$ 上优化好的 31 个 tuple 原样用于 $d=25$。完整推导与可交互的玩具版本见\mlink{role-solution|方法深读}。`}</Tx>
      </PaperSec>

      <PaperSec role="result" title="结果：预测得准、规模无关、优化有效">
        <Headline items={[
          { value: "1249 比特", label: R`$d=25$ 旋转表面码，完整流程数值模拟`, note: "§V；设计优化 + 生成 + 4 个预算的模拟共用时 < 5 小时（2021 款笔记本）" },
          { value: "51,576", label: "待估计的门本征值（含 SPAM）", note: "§V；31 个 tuple、261 个实验、267,357 个电路本征值" },
          { value: "1.3245 / 1.3245", label: R`预测 $\mathcal F$ / $S=10^9$ 时实测的归一化 RMS 误差`, note: "§V；预测来自 d≤11 的拟合外推" },
          { value: "×10.1", label: R`优化设计相对基本设计的样本效率（$d=3$）`, note: R`图 3：$\mathcal F$ 之比 3.17，$3.17^2\approx10.1$` },
          { value: "≤ 13%", label: "噪声先验差 2 倍时最多多花的预算", note: "图 6：27 个设计中只有 3 个超过 5%" },
        ]} />
        <ClaimBoard claims={CLAIMS} />

        <Claim id="C1" claim={CLAIMS[0].claim} strength="strong" where="图 3、图 13、§V（d=25）"
          caveat={R`只在大样本极限下成立：$d=25$、$S=10^6$ 时实测 $1.4480$ 明显偏离预测 $1.3245$；$d=3$ 的小预算（$10^6,10^7$）下预测分布偏悲观（因为估计值被截断到合法区间）。所有比较都是数值模拟，模拟噪声严格满足 Pauli、马尔可夫、时间平稳的假设。`}>
          <Tx>{R`$d=3$：在一个固定的对数正态噪声实例上各跑 1000 次（$S=10^8$），基本与优化设计的归一化 RMS 误差直方图都与由 \eqref{27} 算出的预测分布吻合（图 3）。$d=25$：$S=10^7,10^8,10^9$ 时实测 $1.3243$、$1.3303$、$1.3245$，都在预测 $1.3245\pm2\times0.0091$ 之内（下图）。我们在\mlink{s-design|方法深读的玩具电路}上独立复现了这一现象：四种设计的模拟均值与 $\mathcal F$ 相差都在 4% 以内。`}</Tx>
          <Figure n="P2" caption={R`按原文 §V 报告的数值重画。`} illustration={<D25Plot />} />
        </Claim>

        <Claim id="C2" claim={CLAIMS[1].claim} strength="moderate" where="图 3、附录 H 图 17、附录 G 表 II"
          caveat={R`比较对象是最朴素的基本 tuple 集，不是其他协议；倍数来自单个噪声实例（$d=3$）。优化依赖对噪声的先验（原文用同平均错误率的去极化噪声）。`}>
          <Tx>{R`在 $d=3$ 的一个对数正态噪声实例上，基本设计的 $\mathcal F$ 是优化设计的 $3.17$ 倍，即达到同样精度要多花 $10.1$ 倍的样本；无旋转表面码上的对应数字是 $2.98$ 与 $8.86$。优化后的设计其实很简单：大部分预算给了**单独**测量各个 CZ 层的浅 tuple（$(2),(4),(6),(8)$ 合计约 58%），再加少量深的重复 tuple 来放大噪声；没有一个 tuple 把两个 CZ 层放在一起测。`}</Tx>
        </Claim>

        <Claim id="C3" claim={CLAIMS[2].claim} strength="moderate" where="图 4、§V、附录 H 图 18"
          caveat={R`「渐近不变」来自经验拟合：对去极化噪声，$\operatorname{tr}\Sigma/S'$ 与 $\operatorname{tr}\Sigma^2/S'^2$ 被 $d$ 的二次函数精确拟合（$d=3$–$11$，相对误差 $<10^{-8}$），代入 \eqref{28} 后 $\mathcal F$ 趋于常数。没有理论证明；$d=25$ 只有一次完整模拟。`}>
          <Tx>{R`$\mathcal F$ 在 $d=3$ 到 $11$ 之间缓慢增长并趋于饱和，外推到 $d=25$ 为 $1.3245$；同一个设计在 $d=3$ 到 $25$ 都只需 261 个实验。要估计的参数数 $N(d)=84d^2-36d-24$ 随比特数线性增长，但每个参数的（按 $S'$ 归一化的）误差不随规模恶化。`}</Tx>
          <Figure n="P3" caption={R`按原文 §V 的公式与数字重画。`} illustration={<ScalingPlot />} />
        </Claim>

        <Claim id="C4" claim={CLAIMS[3].claim} strength="moderate" where="图 5、图 6、附录 H 图 19–20"
          caveat={R`只检验了平均错误率在 $\times\tfrac12$ 到 $\times2$ 之间的误设，以及同一对数正态分布族内的随机实例；没有检验非 Pauli、非马尔可夫或漂移的噪声。`}>
          <Tx>{R`对单比特门、两比特门、测量的错误率分别取一半、原值、两倍，共 27 个设计，在 400 个对数正态噪声实例上评估（$d=3$）：只有 3 个设计需要多于 5% 的样本，最差的多 $13.00\pm0.10\%$（$\mathcal F=1.2757\pm0.0016$ 对 $1.2001\pm0.0014$）。另外，为去极化噪声优化的设计在对数正态噪声上平均表现**更好**；随码距增大，不同噪声实例的 $\mathcal F$ 越来越集中（图 5）。`}</Tx>
          <Table head={["", "最优设计", "最差的误设设计", "相对样本需求"]} rows={[
            [R`旋转表面码 $d=3$`, R`$1.2001\pm0.0014$`, R`$1.2757\pm0.0016$`, R`$+13.00\pm0.10\%$`],
            [R`无旋转表面码 $d=3$`, R`$1.2527\pm0.0012$`, R`$1.3236\pm0.0014$`, R`$+11.64\pm0.10\%$`],
          ]} caption={R`数据：原文 §V 与附录 H。相对样本需求 $=(\mathcal F_{\rm 误设}/\mathcal F_{\rm 最优})^2-1$；例如 $(1.2757/1.2001)^2=1.130$。`} />
        </Claim>

        <Claim id="C5" claim={CLAIMS[4].claim} strength="strong" where="图 8、表 I（附录 G 表 V 为去极化噪声）"
          caveat={R`误差用每个门的总变差距离（TVD）衡量；最小预算下 Hadamard 与 CZ 的表现「好于趋势」，是因为估计值被截断进合法区间（$S=10^6$ 时有 1211 个门本征值被置为 1），而测量误差在 $S=10^6$ 时差于趋势。`}>
          <Tx>{R`$d=25$ 上四类门的 TVD 中位数在预算每增加 10 倍时都下降约 $\sqrt{10}$ 倍。CZ 门最难估，部分原因是它的错误分布有 16 个概率（单比特门 4 个、测量 2 个）；Pauli 门（$X$ 与填充的恒等门）比同为单比特的 Hadamard 估得更准——原文推测与 Pauli 门和其他 Pauli 对易、更容易达到相对精度有关。`}</Tx>
          <Figure n="P4" caption={R`按原文表 I 重画。`} illustration={<TableIPlot />} />
        </Claim>

        <Claim id="C6" claim={CLAIMS[5].claim} strength="weak" where="§III E、附录 C 图 9–11"
          caveat={R`只在一个可解析的玩具问题上展示（一层单比特 Pauli 门），且只有不计电路时长时误差才 $\propto1-\lambda$；计入时长后最优只能 $\propto\sqrt{1-\lambda}$。一般 Clifford 门只有「轨道」内本征值之积能被放大，原文把更细的分析留给以后。`}>
          <Tx>{R`附录 C 的玩具问题给出闭式性能指标 \eqref{C20}\eqref{C21}：最优重复次数 $\propto1/(1-\lambda)$；样本最优设计的误差 $\propto1-\lambda$（相对精度），时间最优 $\propto\sqrt{1-\lambda}$，基本设计几乎不随 $\lambda$ 变（加性精度）。我们按原式复算，$1-\lambda=10^{-3}$ 处时间最优的重复次数为 306，与原文一致（\mlink{s-design|方法深读 §六}）。`}</Tx>
        </Claim>
      </PaperSec>

      <PaperSec role="limits" title="局限与开放问题">
        <Limits limits={[
          R`**全部是数值模拟**，且模拟噪声严格满足方法的假设：Pauli 信道（默认已做 Pauli 帧随机化）、马尔可夫、时间平稳。真实器件中的漂移、泄漏、非马尔可夫效应如何影响结果，原文没有检验。`,
          R`**电路级噪声模型**：只学单比特、两比特门各自的 Pauli 信道，层内关联只以「边缘」形式进入（附录 A）；更高权重的关联错误与跨层时间关联不在模型内。`,
          R`**SPAM 的规范自由度**被简单地「全部算给测量」固定；**中途测量与复位**的噪声没有刻画（原文认为可以按已有方法推广）。`,
          R`**性能指标基于一阶/二阶 Taylor 展开与大样本正态近似**：小预算（如 $S=10^6$）时预测失准；而且它是在已知真值处计算的，实际优化只能依赖噪声先验。`,
          R`**$\mathcal F$ 随码距的标度是经验拟合**，二次函数形式缺乏理论解释；优化算法（重复 tuple 的选择、算法 2）是启发式的。`,
          R`大规模时采用 WLS 而不是更准的 GLS，是计算上的妥协；实验数 261 是 Pauli 帧随机化之前的计数，实际执行时还要乘以随机化次数。`,
        ]} open={[
          R`tuple 集性能的理论刻画——为什么 $\mathcal F(d)$ 能被二次函数如此精确地拟合？`,
          R`借鉴最优实验设计理论（A-最优设计）与 GST 的 germ 选择、fiducial-pair 约简，去掉不提升性能的电路本征值测量。`,
          R`按门的 Pauli 轨道做边缘化，系统分析 ACES 的相对精度能力；用 Mahalanobis 距离做单纯形投影以保留协方差信息。`,
          R`在真实器件上运行；把估计结果用于误差缓解、数值模拟与噪声感知解码，量化详细噪声刻画对纠错性能的实际提升。`,
        ]} />
      </PaperSec>

      <PaperSec role="editor" title="编者评注">
        <EditorView
          strengths={[
            R`**把「实验前预言误差」做到了定量可靠。** \eqref{23}→\eqref{26}→\eqref{27} 这条误差传播链朴素但完整，预测与 1000 次模拟、乃至 $d=25$ 的单次模拟都吻合到千分之几。这让实验设计从「拍脑袋」变成了可优化的目标，也是本文相对原始 ACES 最实质的推进。`,
            R`**tuple 的抽象很聪明。** 它把「电路长什么样」与「实验设计」解耦，使设计可以在 17 比特上优化、在 1249 比特上使用；实验数不随规模增长是这一抽象的直接回报。`,
            R`**以机时而非 shot 计价**，并在附录 C 用一个可解析的例子讲清楚了它如何改变最优设计——这是许多噪声学习论文忽略的现实约束。`,
            R`代码以 Julia 包 QuantumACES 公开，数值结果可复现。`,
          ]}
          concerns={[
            R`所有证据都来自满足模型假设的模拟。最大的风险恰在模型之外：器件漂移（实验要跑多久？）、门噪声对层上下文以外因素的依赖、测量串扰等。`,
            R`「优化设计好 10 倍」的比较基准是最朴素的基本设计；与 CER 等相对精度方法、或与原始 ACES 的伪逆范数优化设计之间，没有在同等机时下的定量对比。`,
            R`性能指标衡量的是门本征值的 RMS 误差，而实际关心的往往是错误概率（尤其是小概率的偏置项）或对解码性能的影响；两者之间的映射没有分析。`,
            R`附录 C 的 (C13) 与前面 (C12) 之间似乎差一个常数因子 $3/\lambda_m^2$（见方法深读页的存疑框），不影响结论，但读者自行推导时可能困惑。`,
          ]}
          questions={[
            R`如果噪声在实验期间缓慢漂移，WLS 估计与 $\mathcal F$ 的预测会怎样失效？能否把漂移检测（例如重复 tuple 的指数衰减检验）并入设计？`,
            R`对数正态噪声上优化设计反而更好，这是普遍现象还是该电路与该噪声族的巧合？我们的 3 比特玩具例子里就没有出现。`,
            R`门本征值估计量在轨道内强烈反相关——若直接以轨道乘积为参数重写回归，设计与性能指标会有什么变化？`,
          ]} />
        <ReadingGuide rows={[
          { goal: "只想知道做了什么、结果如何", read: "摘要、§I 末段、§V 开头与图 3、图 4、表 I", skip: "§III C–E 的推导、附录" },
          { goal: "想理解 ACES 的基本原理", read: "§III A–B（式 (1)–(19)）与图 2", skip: "§IV 的算法细节" },
          { goal: "想复现或改进性能分析", read: "§III C–E（式 (20)–(29)）、附录 B、附录 D", skip: "附录 F–H" },
          { goal: "想设计自己的 ACES 实验", read: "§IV（算法 1、2）、附录 E、附录 G 表 II", skip: "附录 A" },
          { goal: "关心相对精度与重复次数", read: "§III E 末段、附录 C（图 9–11）", skip: "§V 的大规模结果" },
        ]} />
        <Quiz questions={[
          { q: "本文中的「tuple」是什么？", options: ["一组门本征值", "原电路各层的一个重排（可重复）序列，用来定义要跑的电路", "一次测量的比特串结果", "一组 T-相容的 Pauli"], answer: 1, why: R`tuple 规定按什么次序、重复几次执行哪些层；tuple 集加上 shot 权重就是完整的实验设计。` },
          { q: R`为什么能把在 $d=3$ 上优化的设计直接用于 $d=25$？`, options: ["因为噪声与码距无关", "因为 tuple 只引用层的编号，而各码距的电路由同样几种层组成", "因为 WLS 与码距无关", "因为 d=25 的实验数更少"], answer: 1, why: "表面码是 LDPC 码且稳定子几何局域，层的种类与码距无关；实验打包也只依赖局部结构。" },
          { q: R`性能指标 $\mathcal F$ 小 2 倍，意味着——`, options: ["误差小 4 倍", "同样精度所需机时少 4 倍", "实验数少 2 倍", "需要的 tuple 少 2 倍"], answer: 1, why: R`$\mathcal F$ 是按 $\sqrt{S'}$ 归一化的期望 RMS 误差，固定精度时 $S'\propto\mathcal F^2$。` },
          { q: R`$d=25$、$S=10^6$ 时实测误差 $1.4480$ 明显高于预测 $1.3245$，原文的解释是——`, options: ["性能指标公式有错", "预测只在大样本极限下成立，此时测量误差的估计表现不佳", "模拟代码有 bug", "噪声模型不是 Pauli 的"], answer: 1, why: "性能分析依赖一阶 Taylor 展开与正态近似；原文指出小预算下测量误差估计差于趋势，是该离群值的原因。" },
        ]} />
      </PaperSec>
    </PaperPage>);
}
