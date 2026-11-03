// 速读与导读页（重要性加权版）：首屏要点 → 背景 → 缺口 → 动机 → 方案 → 结果 → 局限 → 编者评注。
// 按重要性分配面积（framework/spec/PAPER.md「重要性加权」）：w3 = 核心论断 / 关键公式 / 决定性数字 / 关键假设；
// w1 = 细节，进 Fold 或 MinorEq，扫读时折叠；deep = 正文大小但只在精读模式显示（交互图、长表格、自测）。
// 带编号的公式都在 method 页：本页用 \mlink{eq-N|(N)} 链过去（不在本页重复登记编号）。图在 _paper_plots.jsx，按原文数值重画。
import { PaperPage, GMSR, PaperSec, GapMap, Stakes, KeyIdea, Pipeline, Headline, Claim, Limits, EditorView, ReadingGuide, Quiz, Tx, Figure, Table,
  P, BigEq, Fold, KeyNumber, Assume, Verdict, AboveFold } from "@kit";
import { Key } from "@kit/paper/weighted.jsx";
import { NOTATION } from "./_method_notation.js";
import "./_paper_kit.jsx";
import { TableIPlot, D25Plot, ScalingPlot, ScheduleFig } from "./_paper_plots.jsx";

const R = String.raw;
const eq = n => `\\mlink{eq-${n}|(${n})}`;   // 链到 method 页的式 (n)

export const meta = {
  id: "paper", no: 0, label: "速读与导读", title_zh: "速读与导读", title_en: "The paper at a glance",
  tldr: R`把 ACES 改写成以「层的重排（tuple）」为单位的实验设计，推导出能在实验前预言估计误差的性能指标 $\mathcal F$ 并据此优化设计；数值模拟显示，在 1249 比特的 $d=25$ 表面码综合征提取电路上，所需实验数和归一化精度都与码距无关，预测与模拟高度吻合。`,
};
// 四格速读：加权版不放在 hero 里（会把首屏要点挤出第一屏），而是紧跟在 AboveFold 之后
const GM = {
  gap: R`详细的噪声刻画（层析、GST）不能扩展；能扩展的（随机基准）不够细。原始 ACES 可扩展又细致，但缺少可靠的性能预测与设计方法，也没在综合征提取电路的规模上验证过。`,
  motivation: R`综合征提取电路占容错机器的大部分比特和门；知道每个门的 Pauli 错误概率，能改进解码、利用偏置噪声。协议必须在数百至上千比特上仍然好用。`,
  solution: R`电路本征值是门本征值之积，取对数后做加权最小二乘；把 shot 统计误差解析地传播到门本征值，得到性能指标 $\mathcal F$，用它优化 tuple 集与 shot 分配；设计在 $d=3$ 上优化后原样用于大码距。`,
    result: R`$d=25$（1249 比特、51,576 个参数）：261 个实验，预测 $\mathcal F=1.3245$，$S=10^9$ 时实测 $1.3245$；优化设计比基本设计省约 10 倍样本；先验错误率差 2 倍最多多花 13% 预算。全部为数值模拟。`,
};
export const notation = NOTATION;

const PIPE = [
  { title: "拆层、选 tuple", what: "把电路切成若干层，用「层的重排」定义要跑的电路", out: R`tuple 集 $\mathcal T$`,
    why: R`表面码的层种类与码距无关，用 tuple 描述实验，设计就能跨码距复用。`,
    detail: R`原文图 1 的 $d=3$ 电路有 9 层、7 种（第 1=9 层、第 3=7 层），原电路写作 tuple $(1,2,3,4,5,6,3,8,1)$。一个 tuple 可以重复某些层很多次以放大噪声（见 ${eq(13)}）。最简单的「基本 tuple 集」是每种层各跑一次再加一个只做制备和测量的空 tuple。` },
  { title: "打包实验", what: "把能同时测的 Pauli 塞进同一个实验", out: R`实验集 $\sym{Eset}{\mathcal E}_T$`,
    why: R`待估计的电路本征值有 $\mathcal O(n)$ 个；只有每个实验同时测 $\mathcal O(n)$ 个，实验数才能与 $n$ 无关。`,
    detail: R`只用逐比特的 $X/Y/Z$ 制备与测量，所以两个 Pauli 在制备端和测量端的每个比特上必须相同或有一个是恒等（「$T$-相容」）。原文的算法 1 是一个确定性的贪心打包；$d=3$ 到 $d=25$ 的优化设计都只需要 261 个实验。` },
  { title: "采样电路本征值", what: R`制备 Pauli 本征态 → 跑电路 → 测量，读数平均即 $\hat\Lambda$`, out: R`$\hat\Lambda$ 与协方差 $\Omega$`,
    why: R`电路本征值是「输入 $P_{\boldsymbol a}$、输出端测 $P_{T(\boldsymbol a)}$」的期望值 ${eq(20)}，可以直接测。`,
    detail: R`单次读数 $\pm1$，方差 $1-\Lambda^2$；同一实验里两个读数的协方差是 $\Lambda_{\boldsymbol a+\boldsymbol a'}-\Lambda_{\boldsymbol a}\Lambda_{\boldsymbol a'}$ ${eq(21)}。再考虑每个 tuple 分到的 shot 份额和电路时长，得到估计量协方差的闭式 ${eq(23)}。` },
  { title: "取对数、加权最小二乘", what: "乘积变求和，解一个稀疏线性回归", out: R`门本征值 $\hat{\boldsymbol\lambda}$`,
    why: R`电路本征值是门本征值之积 ${eq(15)}；取负对数后是 $\boldsymbol b=A\boldsymbol x$ ${eq(19)}，设计矩阵 $A$ 只含非负整数。`,
    detail: R`用 WLS ${eq(25)} 代替原始 ACES 的 OLS：按每个电路对数本征值的估计方差加权。GLS 更准但 $d=25$ 时算不动。SPAM 噪声全部归到测量上以固定规范。` },
  { title: "还原错误概率", what: "逐门做 Walsh–Hadamard 变换，再投影到概率单纯形", out: R`每个门的 $p_{\boldsymbol a}$`,
    why: R`错误概率与本征值互为 WHT ${eq(7)}${eq(8)}。`,
    detail: R`有限样本下反推出的「概率」可能为负，原文用欧氏距离投影回单纯形；门本征值大于 1 的估计置为 1。附录 A 证明，学到的是整层噪声在该门支撑上的边缘分布。` },
  { title: R`性能指标 $\mathcal F$ 与设计优化`, what: "实验前算出误差分布，据此挑 tuple、分 shot", out: R`优化设计 $(\mathcal T,\Gamma)$`,
    why: R`有了 $\Omega$，误差可以一路线性传播到门本征值：误差平方和是广义卡方分布 ${eq(27)}，其均值给出 $\mathcal F$ ${eq(28)}。`,
    detail: R`shot 权重用 Nesterov 动量梯度下降 ${eq(30)}${eq(31)}；重复 tuple 的重复次数用坐标下降；浅 tuple 用贪心增删（算法 2）。设计针对与目标同平均错误率的去极化噪声优化，在 $d=3$ 上完成后直接搬到 $d=25$。` },
];

const LOGLIN = R`\underbrace{-\log\Lambda_\mu}_{b_\mu}=\sum_{\nu}A_{\mu\nu}\,\underbrace{(-\log\lambda_\nu)}_{x_\nu}`;
const FOM = R`\mathcal F\approx\sqrt{\frac{S'}{N}}\sqrt{\operatorname{tr}\Sigma}\left(1-\frac14\frac{\operatorname{tr}\Sigma^2}{(\operatorname{tr}\Sigma)^2}\right)`;

export default function Paper() {
  return (
    <PaperPage meta={meta} notation={notation} keyEquations={false} weighted>
      <AboveFold>
        <BigEq label="电路本征值 = 门本征值之积 → 线性回归"
          meaning={R`一条电路的总衰减是沿途每个门衰减的乘积；取对数后，「从电路测出每个门」就是一个线性回归。`}
          parts={[
            { tex: R`b_\mu`, note: R`可测：一条重排电路的 $\pm1$ 读数平均，再取对数` },
            { tex: R`A_{\mu\nu}`, note: R`门 $\nu$ 在这条电路上出现的次数：非负整数，只由电路结构决定` },
            { tex: R`x_\nu`, note: "要求的：每个门（在它所在层里）的对数本征值" },
          ]}>{LOGLIN}</BigEq>
        <BigEq label={R`性能指标 $\mathcal F$：实验前预言误差`}
          meaning={R`做实验之前就能算出这套设计会有多准；达到同一精度所需的机时 $\propto\mathcal F^2$`}
          parts={[
            { tex: R`\Sigma`, note: R`shot 统计误差沿加权最小二乘线性传播到门本征值得到的协方差——由设计与噪声先验算出` },
            { tex: R`\sqrt{S'/N}`, note: "按机时与参数个数归一化：不同规模、不同设计可以直接比" },
          ]}>{FOM}</BigEq>
        <div>
          <KeyNumber value="1.3245" label={R`$d=25$：预测的 $\mathcal F$ ＝ 实测误差`}
            why={R`实测为 $S=10^9$ 时的归一化 RMS 误差；1249 比特、51,576 个参数；预测由 $d\le11$ 外推。`} />
          <KeyNumber value="×10.1" label="优化设计比基本设计省的样本倍数"
            why={R`$d=3$ 一个噪声实例：$\mathcal F$ 之比 $3.17$，$3.17^2\approx10.1$。`} />
          <KeyNumber value="261" label={R`实验数，$d=3$ 到 $25$ 不变`}
            why="Pauli 帧随机化之前的计数；设计在 d=3 上优化、原样搬到大码距。" />
        </div>
        <Assume title="Pauli、马尔可夫、时间平稳的噪声——而且全部证据是模拟">{R`方法假定每层的噪声（经 Pauli 帧随机化后）是 **Pauli 信道**，且与前后层、与执行时刻**无关**。文中所有数字都来自**数值模拟**，模拟的噪声恰好严格满足这些假设；漂移、泄漏、非马尔可夫效应下的表现没有检验。`}</Assume>
      </AboveFold>
      <GMSR {...GM} />

      <PaperSec role="background" title="读懂本文需要的最少背景">
        <P w={1}>{R`读之前最好知道：表面码与综合征提取电路的基本图像（数据比特、测量比特、稳定子测量）；Pauli 矩阵与 Clifford 门、量子信道；线性最小二乘。`}</P>
        <P>{R`**综合征提取电路是容错机器的主体。** 表面码一轮又一轮地测量稳定子；测稳定子的那条电路由几层 CZ 门和单比特门交替构成，占了容错计算中绝大部分的比特和门。它的噪声长什么样，直接决定纠错的效果。`}</P>
        <P>{R`**Pauli 噪声与本征值。** 经 Pauli 帧随机化后，每个门的噪声可以当作以概率 $p_{\boldsymbol a}$ 随机施加 Pauli 错误的 **Pauli 信道**。与这些概率等价、但更好测的是 **Pauli 本征值** $\lambda_{\boldsymbol a}$：制备 $P_{\boldsymbol a}$ 的本征态、过噪声、再测，读数平均就被缩短为 $\lambda_{\boldsymbol a}$。`}</P>
        <P w={3} label="ACES：一次性反解所有门">{R`ACES（平均电路本征值采样，Flammia 2021）的出发点：Pauli 穿过 Clifford 电路时被沿途每个门的本征值依次缩短，所以测出足够多不同电路的总衰减，就能**同时**反解出电路里所有门的本征值。`}</P>
        <Fold title="概率 ↔ 本征值、ACES 与本文的三处改动" note="细节">{R`概率与本征值互为 Walsh–Hadamard 变换（\mlink{role-background|方法深读 §一}），所以学到本征值就等于学到了错误概率表。本文在 ACES 框架上做了三件事：换一种描述实验的方式（tuple）、给出精确的性能分析（$\mathcal F$）、并据此优化实验设计。`}</Fold>
        <P deep><Figure n="P1" caption={R`本文研究的 XZZX 表面码综合征提取电路的层结构（按原文图 1 的文字描述自绘）：4 个 CZ 层与单比特层交替；第 5 层只有动力学解耦 $X$ 门。码距变大时层的种类不变——这是设计可以跨码距复用的根本原因。`} illustration={<ScheduleFig />} /></P>
      </PaperSec>

      <PaperSec role="gap" title="已有方法缺了什么">
        <GapMap rows={[
          { name: "全过程层析 / 门集层析（GST）", does: "完整刻画噪声，包括相干误差", misses: "参数与实验数随比特数指数增长，原文称其「扩展性差」" },
          { name: "随机基准（RB）及其变体", does: "高效、可扩展，对 SPAM 不敏感", misses: "只给出平均错误率这类少数几个数，看不到哪个门、哪种 Pauli 错误" },
          { name: "Pauli 信道估计、cycle benchmarking、CER", does: "在受限模型中拟合较少参数；CER 还能学层内关联、达到相对精度", misses: "学更细的关联要用更多实验换取；上千比特场景下的可扩展性与设计方法没有现成答案" },
          { name: "原始 ACES（Flammia 2021）", does: "一个框架同时估计 Clifford 电路里所有门的 Pauli 信道", misses: "普通最小二乘；以伪逆范数为设计准则，不能准确预言性能；没有系统的设计优化，也没在综合征提取电路规模上验证" },
          { name: "本文", ours: true, does: "以层与 tuple 重写 ACES；精确推导估计量的协方差", misses: R`可预测误差的性能指标 $\mathcal F$ 与设计优化；加权最小二乘；1249 比特 $d=25$ 表面码上的完整模拟` },
        ]} />
        <P w={3} label="缺口">{R`缺的是一个**既细到每个门的 Pauli 错误概率、又能扩展到上千比特**的噪声刻画协议——并且在花机时之前就能知道它会有多准、该怎样设计实验。`}</P>
        <P w={1}>{R`上表对其他方法的评价依据原文引言与 §III E 的概括，原文没有与它们做定量比较；关于 CER，原文的结论是两者「性能相当」、各自都可以修改以获得对方的长处。`}</P>
      </PaperSec>

      <PaperSec role="motivation" title="为什么值得做">
        <Stakes chain={[
          { if: "综合征提取电路占了容错机器的大部分比特和门", then: "刻画这条电路的噪声，就是刻画整台机器噪声的主体" },
          { if: "知道每个门、每种 Pauli 错误的概率（包括偏置）", then: "可以给解码器喂更准的错误模型，为偏置噪声定制码与解码器" },
          { if: "刻画协议的实验数或精度随比特数恶化", then: "在数百比特的近期器件和早期容错机器上就无法常规使用" },
          { if: "机时有限且器件参数会漂移", then: "必须在做实验之前就知道怎样分配机时最划算" },
        ]} />
        <P w={3} label="动机：精度可预测、实验数与规模无关">{R`只有**精度可以事先预测、实验数不随规模增长**、设计与数据分析在笔记本上就能完成的协议，才能让「逐门的噪声体检」成为近期器件的日常工具，并为噪声感知解码铺路。`}</P>
      </PaperSec>

      <PaperSec role="solution" title="方案：ACES + 可计算的性能指标 + 实验设计优化">
        <Key label="核心想法：乘积取对数 → 回归 → 误差可事先算">
          <KeyIdea analogy={R`像体检时同时抽几管血、测十几项指标：单看一项说明不了问题，把很多项放在一起解方程，就能定位到每个器官。本文额外做的是：事先算出这套化验单能把每个器官测得多准，并据此决定抽哪几管、各抽多少。`}>{R`**乘积取对数就是线性回归，线性回归的误差可以事先算出来。** 读数是 $\pm1$ 的样本平均，协方差有闭式；把它沿加权最小二乘一路传到门本征值，就得到估计误差的完整分布和性能指标 $\mathcal F$——「怎样设计实验」于是变成一个能在经典计算机上求解的优化问题。`}</KeyIdea>
        </Key>
        <Pipeline steps={PIPE} />
        <P w={3} label="设计只引用层编号 → 跨码距复用">{R`tuple 只引用**层的编号**，而各码距的电路由同样几种层组成：$d=3$ 上优化好的 31 个 tuple 原样用于 $d=25$。这正是「实验数与码距无关」的来源。`}</P>
        <Assume title="学到的是「层语境中的门」">{R`每个门的噪声是在**它所在的那一层**里学的，并且只学门支撑上的本征值——附录 A 证明这恰是整层噪声在该门上的**边缘分布**。层内串扰只以平均形式进入，更高权重的关联错误与跨层的时间关联不在模型内；同一个物理门出现在不同层里，就是不同的信道。`}</Assume>
        <P>{R`另一个影响结论的设计选择：**以机时而非 shot 计价**。深电路更费时，预算 $S$ 按平均电路时长折算 ${eq(22)}；这改变了「重复多少次最好」的答案（附录 C）。完整推导与可交互的玩具版本见\mlink{role-solution|方法深读}。`}</P>
      </PaperSec>

      <PaperSec role="result" title="结果：预测得准、规模无关、优化有效">
        <Headline items={[
          { value: "1249 比特", label: R`$d=25$ 旋转表面码，完整流程数值模拟`, note: "§V；设计优化 + 生成 + 4 个预算的模拟共用时 < 5 小时（2021 款笔记本）" },
          { value: "51,576", label: "待估计的门本征值（含 SPAM）", note: "§V；31 个 tuple、261 个实验、267,357 个电路本征值" },
          { value: "≤ 13%", label: "噪声先验差 2 倍时最多多花的预算", note: "图 6：27 个设计中只有 3 个超过 5%" },
        ]} />

        <Key label="C1 性能指标能准确预言实际误差">
          <Claim id="C1" claim={R`性能指标 $\mathcal F$ 能准确预言实际的估计误差`} strength="strong" where="图 3、图 13、§V（d=25）"
            caveat={R`只在大样本极限下成立：$d=25$、$S=10^6$ 时实测 $1.4480$ 明显偏离预测 $1.3245$；$d=3$ 的小预算下预测分布偏悲观（估计值被截断到合法区间）。`}>
            <P>{R`$d=25$：$S=10^7,10^8,10^9$ 时实测 $1.3243$、$1.3303$、$1.3245$，都在预测 $1.3245\pm2\times0.0091$ 之内。`}</P>
            <Fold title="d=3 的 1000 次重复与我们的复现" note="证据细节">{R`$d=3$：在一个固定的对数正态噪声实例上各跑 1000 次（$S=10^8$），基本与优化设计的归一化 RMS 误差直方图都与由 ${eq(27)} 算出的预测分布吻合（图 3）。我们在\mlink{s-design|方法深读的玩具电路}上独立复现了这一现象：四种设计的模拟均值与 $\mathcal F$ 相差都在 4% 以内。`}</Fold>
            <P deep><Figure n="P2" caption={R`按原文 §V 报告的数值重画。`} illustration={<D25Plot />} /></P>
          </Claim>
        </Key>

        <Key label="C2 优化设计省约 10 倍样本">
          <Claim id="C2" claim="优化设计比基本设计省约 10 倍样本" strength="moderate" where="图 3、附录 H 图 17、附录 G 表 II"
            caveat={R`比较对象是最朴素的基本 tuple 集，不是其他协议；倍数来自 $d=3$ 的单个噪声实例。`}>
            <P>{R`优化设计的形状很简单：大部分预算给**单独**测量各个 CZ 层的浅 tuple，再加少量深的重复 tuple 放大噪声。`}</P>
            <Fold title="具体倍数与预算分配" note="证据细节">{R`$d=3$ 对数正态噪声实例上，基本设计的 $\mathcal F$ 是优化设计的 $3.17$ 倍（样本 $10.1$ 倍）；无旋转表面码上是 $2.98$ 与 $8.86$。$(2),(4),(6),(8)$ 四个单 CZ 层 tuple 合计约 58% 的预算；没有一个 tuple 把两个 CZ 层放在一起测。`}</Fold>
          </Claim>
        </Key>

        <Key label="C3 归一化精度与实验数随码距渐近不变">
          <Claim id="C3" claim="归一化精度与实验数随码距渐近不变" strength="moderate" where="图 4、§V、附录 H 图 18"
            caveat={R`「渐近不变」来自经验拟合（$\operatorname{tr}\Sigma$ 等对 $d$ 的二次函数拟合，$d=3$–$11$），没有理论证明；$d=25$ 只有一次完整模拟。`}>
            <P>{R`参数数 $N(d)=84d^2-36d-24$ 随比特数线性增长，但按 $S'$ 归一化后每个参数的误差不随规模恶化。`}</P>
            <Fold title="拟合与外推" note="证据细节">{R`$\mathcal F$ 在 $d=3$ 到 $11$ 之间缓慢增长并趋于饱和，外推到 $d=25$ 为 $1.3245$。对去极化噪声，$\operatorname{tr}\Sigma/S'$ 与 $\operatorname{tr}\Sigma^2/S'^2$ 被 $d$ 的二次函数拟合到相对误差 $<10^{-8}$，代入 ${eq(28)} 后 $\mathcal F$ 趋于常数。同一个设计在 $d=3$ 到 $25$ 都只需 261 个实验。`}</Fold>
            <P deep><Figure n="P3" caption={R`按原文 §V 的公式与数字重画。`} illustration={<ScalingPlot />} /></P>
          </Claim>
        </Key>

        <Key label="C4 设计对噪声先验的误设很鲁棒">
          <Claim id="C4" claim="设计对噪声先验的误设很鲁棒" strength="moderate" where="图 5、图 6、附录 H 图 19–20"
            caveat={R`只检验了平均错误率在 $\times\tfrac12$ 到 $\times2$ 之间的误设，以及同一对数正态分布族内的随机实例；没有检验非 Pauli、非马尔可夫或漂移的噪声。`}>
            <P>{R`27 个错误率误设的设计（$d=3$）中只有 3 个需要多于 5% 的样本，最差多 $13\%$。`}</P>
            <Fold title="数值与附加观察" note="证据细节">
              <Tx>{R`单比特门、两比特门、测量的错误率分别取一半、原值、两倍，在 400 个对数正态噪声实例上评估。另外，为去极化噪声优化的设计在对数正态噪声上平均表现**更好**；随码距增大，不同噪声实例的 $\mathcal F$ 越来越集中（图 5）。`}</Tx>
              <Table head={["", "最优设计", "最差的误设设计", "相对样本需求"]} rows={[
                [R`旋转表面码 $d=3$`, R`$1.2001\pm0.0014$`, R`$1.2757\pm0.0016$`, R`$+13.00\pm0.10\%$`],
                [R`无旋转表面码 $d=3$`, R`$1.2527\pm0.0012$`, R`$1.3236\pm0.0014$`, R`$+11.64\pm0.10\%$`],
              ]} caption={R`数据：原文 §V 与附录 H。相对样本需求 $=(\mathcal F_{\rm 误设}/\mathcal F_{\rm 最优})^2-1$；例如 $(1.2757/1.2001)^2=1.130$。`} />
            </Fold>
          </Claim>
        </Key>

        <Key label={R`C5 各类门误差都按 $1/\sqrt S$ 下降`}>
          <Claim id="C5" claim={R`各类门的估计误差都按 $1/\sqrt S$ 下降`} strength="strong" where="图 8、表 I（附录 G 表 V 为去极化噪声）"
            caveat={R`最小预算下 Hadamard 与 CZ「好于趋势」是因为估计值被截断进合法区间（$S=10^6$ 时 1211 个门本征值被置为 1）；测量误差在 $S=10^6$ 时差于趋势。`}>
            <P>{R`$d=25$ 上四类门的 TVD 中位数在预算每增 10 倍时都下降约 $\sqrt{10}$ 倍；CZ 最难估（16 个错误概率）。`}</P>
            <Fold title="门类之间的差别" note="证据细节">{R`单比特门有 4 个错误概率、测量 2 个。Pauli 门（$X$ 与填充的恒等门）比同为单比特的 Hadamard 估得更准——原文推测与 Pauli 门和其他 Pauli 对易、更容易达到相对精度有关。`}</Fold>
            <P deep><Figure n="P4" caption={R`按原文表 I 重画。`} illustration={<TableIPlot />} /></P>
          </Claim>
        </Key>

        <Key label="C6 ACES 可以做到相对精度（证据有限）">
          <Claim id="C6" claim="ACES 可以做到相对精度" strength="weak" where="§III E、附录 C 图 9–11"
            caveat={R`只在一个可解析的玩具问题上展示（一层单比特 Pauli 门）；且只有不计电路时长时误差才 $\propto1-\lambda$，计入时长后最优只能 $\propto\sqrt{1-\lambda}$。`}>
            <Fold title="附录 C 的玩具问题" note="证据细节">{R`闭式性能指标 ${eq("C20")}${eq("C21")}：最优重复次数 $\propto1/(1-\lambda)$；样本最优设计的误差 $\propto1-\lambda$（相对精度），时间最优 $\propto\sqrt{1-\lambda}$，基本设计几乎不随 $\lambda$ 变（加性精度）。我们按原式复算，$1-\lambda=10^{-3}$ 处时间最优的重复次数为 306，与原文一致（\mlink{s-design|方法深读 §六}）。一般 Clifford 门只有「轨道」内本征值之积能被放大，原文把更细的分析留给以后。`}</Fold>
          </Claim>
        </Key>

        <Verdict label="结果总结">{R`在满足模型假设的模拟里，ACES 的误差可以**事先算准**，实验数与归一化精度**不随码距恶化**——这是它能给上千比特纠错电路做日常体检的依据。`}</Verdict>
      </PaperSec>

      <PaperSec role="limits" title="局限与开放问题">
        <Assume title="性能预测只在大样本极限下可靠">{R`$\mathcal F$ 建立在一阶 Taylor 展开与正态近似上，原文明说「隐含地假设处在收集大量样本的极限」：$d=25$、$S=10^6$ 时实测 $1.4480$，明显高于预测 $1.3245$。`}</Assume>
        <Assume title="设计优化依赖噪声先验">{R`$\mathcal F$ 要在**已知真值**处计算，实际只能代入先验：原文一律针对**同平均错误率的去极化噪声**优化设计，再拿去刻画对数正态噪声。先验错 2 倍以内损失 ≤13%（C4），更离谱或结构不同的先验没有检验。`}</Assume>
        <Limits limits={[
          R`**电路级噪声模型**：只学单比特、两比特门各自的 Pauli 信道，层内关联只以「边缘」形式进入；更高权重与跨层关联不在模型内。`,
          R`**SPAM 规范**被简单地「全部算给测量」固定；**中途测量与复位**的噪声没有刻画。`,
          R`**$\mathcal F$ 随码距的标度是经验拟合**；优化算法（重复 tuple 的选择、算法 2）是启发式的。`,
          R`大规模时用 WLS 而非更准的 GLS，是计算上的妥协；实验数 261 是 Pauli 帧随机化之前的计数。`,
        ]} />
        <Fold title="开放问题（原文结论部分）" note="4 条">
          <Limits open={[
            R`tuple 集性能的理论刻画——为什么 $\mathcal F(d)$ 能被二次函数如此精确地拟合？`,
            R`借鉴最优实验设计理论与 GST 的 germ 选择、fiducial-pair 约简，去掉不提升性能的电路本征值测量。`,
            R`按门的 Pauli 轨道做边缘化，系统分析 ACES 的相对精度；用 Mahalanobis 距离做单纯形投影以保留协方差信息。`,
            R`在真实器件上运行；把估计结果用于误差缓解、数值模拟与噪声感知解码。`,
          ]} />
        </Fold>
      </PaperSec>

      <PaperSec role="editor" title="编者评注">
        <P w={3} label="编者判断">{R`本文最实质的推进是把**「实验前预言误差」做到了定量可靠**，让实验设计变成可优化的目标；最大的风险恰在模型之外——器件漂移、非马尔可夫效应、测量串扰都没有被检验。（编者观点，不代表原作者。）`}</P>
        <EditorView
          strengths={[
            R`误差传播链 ${eq(23)}→${eq(26)}→${eq(27)} 朴素但完整，预测与 1000 次模拟、乃至 $d=25$ 的单次模拟都吻合到千分之几。`,
            R`**tuple 的抽象**把「电路长什么样」与「实验设计」解耦，设计可以在 17 比特上优化、在 1249 比特上使用。`,
            R`**以机时而非 shot 计价**，并用附录 C 的可解析例子讲清它如何改变最优设计。代码以 Julia 包 QuantumACES 公开。`,
          ]}
          concerns={[
            R`所有证据都来自满足模型假设的模拟；实验要跑多久、漂移多快，决定了这些结论在真机上剩下多少。`,
            R`「好 10 倍」的基准是最朴素的基本设计；与 CER 或原始 ACES 的伪逆范数优化设计之间，没有同等机时下的定量对比。`,
            R`$\mathcal F$ 衡量门本征值的 RMS 误差，而实际关心的往往是错误概率（尤其小概率的偏置项）或对解码性能的影响。`,
            R`附录 C 的 (C13) 与 (C12) 之间似乎差一个常数因子 $3/\lambda_m^2$（见方法深读页的存疑框），不影响结论。`,
          ]}
          questions={[
            R`噪声在实验期间缓慢漂移时，WLS 估计与 $\mathcal F$ 的预测会怎样失效？能否把漂移检测并入设计？`,
            R`对数正态噪声上优化设计反而更好，是普遍现象还是巧合？我们的 3 比特玩具例子里就没有出现。`,
            R`门本征值估计量在轨道内强烈反相关——若直接以轨道乘积为参数重写回归，设计与性能指标会怎样变化？`,
          ]} />
        <P deep>
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
        </P>
      </PaperSec>
    </PaperPage>);
}
