// §4.6 芯片制造的良率建模 —— 式 (4.17)–(4.26)，图 4.23
import { Sec, Tx, Eq, Box, Figure, Derivation, C } from "@kit";
import { YieldModelsPlot, CumYieldPlot, WaferMC } from "./_ch04_plots.jsx";

const R = String.raw;

export function Sec46() {
  return (
    <Sec n="4.6" title="Modeling Yield in Chip Manufacturing" zh="芯片制造的良率建模"
      gist={R`功能良率 $Y=f(D_{\rm O},A_C)$ \eqref{4.17}。缺陷均匀、独立时得 Poisson 模型 $Y=e^{-A_CD_{\rm O}}$ \eqref{4.20}；缺陷密度本身有分布时按 Murphy 积分 \eqref{4.21} 平均——Gamma 分布给出负二项模型 \eqref{4.22}，指数分布给出 Seeds 模型 \eqref{4.23}。多道工序的良率相乘 \eqref{4.26}，所以单步缺陷密度必须低到 $0.01\,\mathrm{cm^{-2}}$ 量级。`}
      why={R`晶圆的制造成本几乎与有多少芯片能工作无关，良率直接决定每片晶圆的收入；要预测和改善良率，必须把"颗粒"变成数学。`}
      gives={["4.20", "4.21", "4.22", "4.23", "4.26"]}>
      <p className="muted">本节概念：<C id="yield_models" /></p>
      <Tx>{R`**良率是什么，为什么要建模。**制造良率就是功能正常的产品所占的比例；对 IC 而言，是工艺结束时能工作的芯片（die）所占的比例。晶圆的加工成本基本与其上多少芯片能用无关，所以良率决定能卖多少芯片、每片晶圆收入多少——公司的利润直接系于良率。

本节讨论**功能良率**（functional yield）：没有缺陷的芯片比例。下一节讨论**参数良率**：工艺参数总有分布，即使功能完好的芯片也有性能差异，工艺控制要把它们约束在规格内。

功能良率主要受颗粒造成的缺陷限制。所以良率模型的两个基本参数是：**缺陷密度** $D_{\rm O}$（如每平方厘米的缺陷数；常写作 $D_0$），以及**关键面积** $A_C$——芯片上缺陷落入后很可能致命的那部分面积。$A_C$ 通常小于芯片总面积：缺陷可能落在没有器件的区域，或落在不会造成故障的地方（回忆 \figref{4.3} 与 \figref{4.5}）。于是良率模型的一般形式是 [4.44]`}</Tx>
      <Eq n="4.17" say="功能良率只取决于两件事：缺陷有多密，以及芯片上有多大面积“怕”缺陷。各种模型的区别在于这个函数的具体形式。">{R`Y = f(D_{\rm O}, A_C)`}</Eq>

      <Tx>{R`**最简单的模型：Poisson。**假设缺陷在晶圆上空间不相关、均匀分布，且每个缺陷都让芯片报废。它可以用一个漂亮的计数论证推出 [4.44]。设晶圆上有 $\sym{ch04-nchip}{C}$ 个芯片、$M$ 个缺陷，每个缺陷独立地落入任一芯片，共有 $\sym{ch04-nchip}{C}^M$ 种分配方式。若指定某个芯片**没有**缺陷，缺陷只能分给其余 $\sym{ch04-nchip}{C}-1$ 个芯片，方式数为`}</Tx>
      <Eq n="4.18" say="把 M 个缺陷全部分给除某一芯片以外的其余芯片，共有 (C−1) 的 M 次方种方式。">{R`(\sym{ch04-nchip}{C}-1)^M`}</Eq>
      <Tx>{R`于是某个芯片不含缺陷的概率是`}</Tx>
      <Eq n="4.19" say="某一芯片一个缺陷都没分到的概率：每个缺陷各自以 1−1/C 的概率避开它，M 个缺陷独立，概率相乘。">{R`\frac{(\sym{ch04-nchip}{C}-1)^M}{\sym{ch04-nchip}{C}^M} = \left(1-\frac{1}{\sym{ch04-nchip}{C}}\right)^M`}</Eq>
      <Tx>{R`缺陷总数等于芯片数、每芯片关键面积与缺陷密度三者之积，$M=\sym{ch04-nchip}{C}A_CD_{\rm O}$。良率就是无缺陷芯片的**比例**；在芯片很多的极限下`}</Tx>
      <Eq n="4.20" keyEq title="Poisson 良率模型" say="缺陷均匀独立时，良率随“每片芯片的平均缺陷数”A_C·D_O 指数下降：平均一个缺陷时良率只剩 37%。">{R`Y = \lim_{\sym{ch04-nchip}{C}\to\infty}\left(1-\frac{1}{\sym{ch04-nchip}{C}}\right)^{\sym{ch04-nchip}{C}A_CD_{\rm O}} = \exp(-A_CD_{\rm O})`}</Eq>
      <Derivation title={R`极限 $(1-1/\sym{ch04-nchip}{C})^{\sym{ch04-nchip}{C}\lambda}\to e^{-\lambda}$`} collapsed steps={[
        { tex: R`\ln\left(1-\frac{1}{\sym{ch04-nchip}{C}}\right)^{\sym{ch04-nchip}{C}\lambda}=\sym{ch04-nchip}{C}\lambda\ln\left(1-\frac{1}{\sym{ch04-nchip}{C}}\right)=\sym{ch04-nchip}{C}\lambda\left(-\frac{1}{\sym{ch04-nchip}{C}}-\frac{1}{2\sym{ch04-nchip}{C}^2}-\cdots\right)`, why: R`令 $\lambda=A_CD_{\rm O}$；$\ln(1-u)=-u-u^2/2-\cdots$。` },
        { tex: R`\to-\lambda\quad(\sym{ch04-nchip}{C}\to\infty)`, why: R`高阶项 $\propto1/\sym{ch04-nchip}{C}$ 趋于零。` },
        { tex: R`P(k\ \text{个缺陷})=\binom{M}{k}\Big(\tfrac{1}{\sym{ch04-nchip}{C}}\Big)^k\Big(1-\tfrac{1}{\sym{ch04-nchip}{C}}\Big)^{M-k}\to\frac{\lambda^k e^{-\lambda}}{k!}`, why: R`更一般地，一颗芯片上的缺陷数服从二项分布，在 $\sym{ch04-nchip}{C}\to\infty$、$M/\sym{ch04-nchip}{C}=\lambda$ 固定时趋于 Poisson 分布；良率是 $k=0$ 的那一项——模型因此得名。` },
      ]} />
      <Tx>{R`**Poisson 模型的问题：低估大芯片的良率。**它对小芯片通常合理，但对大芯片会低估良率 [4.9, 4.44, 4.45]。原因是它假设缺陷密度在整片晶圆上处处相同，而实际缺陷常常**成团**出现在某些区域，晶圆边缘的缺陷密度也往往更高。缺陷扎堆，意味着许多缺陷"挤"在同一批已经坏掉的芯片上，别的芯片反而躲过了——同样的平均缺陷密度，好芯片更多。

**Murphy 的想法：对缺陷密度再求一次平均。**Murphy 首先提出 $\sym{ch04-dd}{D}$ 不应是常数 [4.46]：各芯片、各晶圆的缺陷密度按某个归一化概率密度 $f(\sym{ch04-dd}{D})$ 分布，良率是 Poisson 良率对这个分布的平均：`}</Tx>
      <Eq n="4.21" keyEq title="Murphy 积分" say="把每一种可能的局部缺陷密度下的 Poisson 良率，按该密度出现的概率加权平均，就得到总良率；不同的分布 f(D) 给出不同的良率模型。">{R`Y = \int_0^\infty e^{-A_C\sym{ch04-dd}{D}} f(\sym{ch04-dd}{D})\,\dd \sym{ch04-dd}{D}`}</Eq>
      <Box kind="warning" title="勘误：式 (4.21) 指数中的变量">{R`原书把被积函数印作 $e^{-A_CD_{\rm O}}f(D)$。若指数里是常数 $D_{\rm O}$，它可以提到积分号外，而 $\int f\,\dd D=1$，积分就恒等于 Poisson 结果，模型失去意义。指数中应是积分变量 $\sym{ch04-dd}{D}$：$e^{-A_C\sym{ch04-dd}{D}}$；平均缺陷密度 $D_{\rm O}=\int \sym{ch04-dd}{D}f(\sym{ch04-dd}{D})\dd \sym{ch04-dd}{D}$ 作为 $f$ 的参数出现。下面的推导验证了这一写法给出原书的 (4.22)(4.23)。`}</Box>
      <Tx>{R`不同的 $f(\sym{ch04-dd}{D})$ 就是不同的解析良率模型（[4.44] 有详细讨论）。业界常用的两个：`}</Tx>
      <Eq n="4.22" keyEq title="负二项模型" say="缺陷有聚集时的良率：聚集因子 C 越小（越扎堆），同样平均缺陷数下良率越高；工业上常取 $C\approx2$。">{R`\text{负二项模型：}\ Y = \left(1+\frac{A_CD_{\rm O}}{C}\right)^{-C}`}</Eq>
      <Eq n="4.23" keyEq title="Seeds 模型" say="缺陷密度服从指数分布时的良率：随面积只按反比例下降，远比 Poisson 的指数下降缓慢。">{R`\text{Seeds 模型：}\ Y = \frac{1}{1+D_{\rm O}A_C}`}</Eq>
      <Derivation title={R`由 Murphy 积分推出负二项与 Seeds 模型（原书未给出）`} steps={[
        { tex: R`f(\sym{ch04-dd}{D})=\frac{\sym{ch04-dd}{D}^{\,C-1}e^{-\sym{ch04-dd}{D}/\theta}}{\Gamma(C)\,\theta^{C}},\qquad \theta=\frac{D_{\rm O}}{C}`, why: R`取 Gamma 分布：形状参数 $C$，均值 $C\theta=D_{\rm O}$，方差 $D_{\rm O}^2/C$——$C$ 越小，缺陷密度起伏越大（越"成团"）。` },
        { tex: R`Y=\frac{1}{\Gamma(C)\theta^C}\int_0^\infty \sym{ch04-dd}{D}^{\,C-1}e^{-\sym{ch04-dd}{D}(A_C+1/\theta)}\,\dd \sym{ch04-dd}{D}=\frac{1}{\Gamma(C)\theta^C}\cdot\frac{\Gamma(C)}{(A_C+1/\theta)^{C}}`, why: R`代入 \eqref{4.21}，用 $\int_0^\infty x^{C-1}e^{-sx}dx=\Gamma(C)/s^C$。` },
        { tex: R`Y=(1+A_C\theta)^{-C}=\left(1+\frac{A_CD_{\rm O}}{C}\right)^{-C}`, why: R`即 \eqref{4.22}。之所以叫"负二项"，是因为 Poisson 与 Gamma 的混合使每颗芯片上的缺陷数服从负二项分布。` },
        { tex: R`C=1:\ f(\sym{ch04-dd}{D})=\frac{1}{D_{\rm O}}e^{-\sym{ch04-dd}{D}/D_{\rm O}}\ \Rightarrow\ Y=\frac{1}{1+A_CD_{\rm O}}`, why: R`形状参数为 1 的 Gamma 分布就是指数分布，得 Seeds 模型 \eqref{4.23}。` },
        { tex: R`f(\sym{ch04-dd}{D})=\delta(\sym{ch04-dd}{D}-D_{\rm O})\ \Rightarrow\ Y=e^{-A_CD_{\rm O}}`, why: R`没有起伏（$C\to\infty$，方差 $\to0$）时回到 Poisson。` },
      ]} result={R`三个模型是同一族的三个成员：$C=\infty$（Poisson）、$C$ 有限（负二项）、$C=1$（Seeds）。`} />
      <Tx>{R`在负二项模型中，$C$ 是描述颗粒空间分布的**聚集因子**（clustering factor）。$C\to\infty$ 意味着缺陷几乎不聚集、彼此独立，(4.22) 退化为 (4.20)；$C=1$ 意味着高度聚集，得到 Seeds 模型：`}</Tx>
      <Eq n="4.24" say="聚集因子趋于无穷（缺陷完全不扎堆）时，负二项模型回到 Poisson 模型。">{R`Y = \lim_{C\to\infty}\left(1+\frac{A_CD_{\rm O}}{C}\right)^{-C} = \exp(-A_CD_{\rm O})`}</Eq>
      <Eq n="4.25" say="聚集因子等于 1 时，负二项模型正好就是 Seeds 模型。">{R`Y = \lim_{C\to1}\left(1+\frac{A_CD_{\rm O}}{C}\right)^{-C} = \frac{1}{1+A_CD_{\rm O}}`}</Eq>
      <Box kind="warning" title={R`勘误：负二项模型"趋于 Seeds"的条件是 $C=1$，不是 $C\to0$`}>{R`原书在图 4.23 的讨论中写"当 $C\to0$ 时它趋于 Seeds 模型"，与紧邻的式 (4.25)（$C\to1$）矛盾。实际上 $C\to0$ 时 $(1+x/C)^{-C}=\exp[-C\ln(1+x/C)]\to1$，良率趋于 100%（极端聚集：所有缺陷都挤在极少数芯片上）。负二项曲线是在 $C=1$ 时与 Seeds 曲线**重合**；$C<1$ 时它甚至高于 Seeds。交互图中把 $C$ 拉到 1 以下即可看到。`}</Box>
      <Tx>{R`\figref{4.23} 画出了各模型的良率随芯片面积的变化。工业上常用 $C\approx2$ 的负二项模型。`}</Tx>
      <Figure n="4.23" caption={R`几种良率模型的芯片良率随芯片面积的变化。原书上图 $D_{\rm O}=0.5\,\mathrm{cm^{-2}}$，下图缺陷密度小 5 倍（$0.1\,\mathrm{cm^{-2}}$），良率相应高得多。交互版可调 $D_{\rm O}$ 与 $C$，并附加了原书未列的 Murphy 三角分布模型 $Y=[(1-e^{-A_CD_{\rm O}})/(A_CD_{\rm O})]^2$ 作对照。`} illustration={<YieldModelsPlot />} />

      <h4>交互：在一片 300 mm 晶圆上撒缺陷</h4>
      <Tx>{R`模型终究是模型。下面直接"做实验"：在晶圆上画出芯片网格，随机撒下缺陷，数一数多少芯片幸存。先在"均匀随机"模式下多撒几片，累计平均会收敛到 Poisson 值；切换到"成团分布"，同样的平均缺陷密度下良率明显升高，并收敛到负二项模型。再把芯片面积从 $0.5\,\mathrm{cm^2}$ 拉到 $6\,\mathrm{cm^2}$，体会"大芯片对聚集有多敏感"。`}</Tx>
      <WaferMC />
      <Box kind="aside" title="小练习：Monte Carlo 的统计误差">{R`一片晶圆上若有 $n$ 颗芯片、真实良率为 $Y$，单片测得的良率的标准差约为 $\sqrt{Y(1-Y)/n}$（二项分布）。对 $A_C=1.5\,\mathrm{cm^2}$（约 430 颗）、$Y\approx0.64$，单片误差约 2.3 个百分点；累计 10 片约 0.7 个百分点。在成团模式下误差还会更大——为什么？（提示：同一块区域内的芯片"同生共死"，有效独立样本数变少了。）`}</Box>

      <Tx>{R`**真正的难点：几百道工序相乘。**看了 \figref{4.23}，也许会觉得 $0.1\,\mathrm{cm^{-2}}$ 的缺陷密度就能得到不错的良率。但还要考虑一个非常重要的因素：芯片制造包含几十上百道串行工序，任何一道引入的缺陷都会**累积**。所以总良率应写成各步良率之积，以负二项模型为例：`}</Tx>
      <Eq n="4.26" keyEq title="多工序累积良率" say="总良率是每道关键工序良率的乘积；若各道的聚集因子相同，可近似合并为“总的平均缺陷数”代入一次负二项公式。">{R`Y = \prod_{i=1}^{\rm levels}\left(1+\frac{A_{{\rm C}i}D_{{\rm O}i}}{C_i}\right)^{-C_i} \cong \left\{1+\left(\sum_{i=1}^{\rm levels}A_{{\rm C}i}D_{{\rm O}i}\right)\Big/C_i\right\}^{-C_i}`}</Eq>
      <Tx>{R`于是若一个工艺有 50 道（关键）工序、每道良率 99%，总良率约 $(0.99)^{50}\approx60\%$；若每道只有 95%，总良率只剩百分之几。表 4.1 中单步 $0.01\,\mathrm{cm^{-2}}$ 这样的苛刻指标，在这个算术下就容易理解了。当然每道工序各不相同，实际产线建模的难点之一就是确定每一道的 $A_C$ 与 $D_{\rm O}$（更多内容见 [4.44]）。`}</Tx>
      <Box kind="note" title={R`关于 (4.26) 中的 $\cong$`}>{R`右端的"合并"形式要求各道的 $C_i$ 取同一个值 $C$，并且只在一阶上与左端一致：两边展开都是 $1-\sum_iA_{{\rm C}i}D_{{\rm O}i}+\cdots$，二阶项不同。物理上，左端假设各层缺陷的"成团"彼此独立；右端相当于所有层的缺陷密度一起涨落（完全相关）——后者聚集更强，给出的良率更高。下面的交互图对比了两者：当总缺陷数 $nA_CD_{\rm O}$ 与 $C$ 相当时，差别已经可观。`}</Box>
      <CumYieldPlot />
      <Tx>{R`**仿真工具。**功能良率建模已有不少有趣的仿真工具，常用策略正是 Monte Carlo：取一个具体的电路版图，随机把缺陷叠加上去，再计算这些缺陷造成的电路故障——例如 VLASIC [4.44, 4.47]。上面的晶圆实验就是这种方法最简化的版本（关键面积取整个芯片）。`}</Tx>
    </Sec>);
}
