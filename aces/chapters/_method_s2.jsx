// method 页 §四–§五：电路本征值的采样、实验打包与协方差；性能指标 F 与 V。公式 (20)–(23)、(26)–(29)。
// 重要性加权：BigEq / Assume / Verdict / P w={3} 为权重 3；推导进 Fold，次要公式用 MinorEq。
import { PaperSec, Tx, Eq, Derivation, P, BigEq, MinorEq, Fold, Assume, Verdict } from "@kit";

const R = String.raw;

export function S4() {
  return (
    <PaperSec role="solution" id="s-sampling" title="四、怎样测电路本征值：采样、打包与协方差"
      lead="一个电路本征值就是一个 ±1 读数的平均。真正的工程问题是：怎样在一次实验里同时测成千上万个，同时算清它们之间的统计相关。">
      <P>{R`**单个电路本征值**就是「输入 $P_{\boldsymbol a}$、在输出端测 $P_{T(\boldsymbol a)}$」的期望值：`}</P>
      <Eq n="20" keyEq title="电路本征值的测量" say="电路本征值就是「输入 $P_{\boldsymbol a}$、在输出端测 $P_{T(\boldsymbol a)}$」的归一化期望值，符号已知、可修正。">{R`\Lambda_{T,\boldsymbol a}=(\pm)_{T,\boldsymbol a}\frac{1}{2^n}\operatorname{tr}\big(P_{T(\boldsymbol a)}\tilde{\mathcal C}_T(P_{\boldsymbol a})\big)`}</Eq>
      <P w={1}>{R`操作上：在 $P_{\boldsymbol a}$ 的本征基里（共 $2^n$ 种符号配置 $\boldsymbol s$）均匀随机地选一个态制备，跑含噪电路，按 $P_{T(\boldsymbol a)}$ 的基逐比特测量，用已知符号 $(\pm)_{T,\boldsymbol a}$ 与 $\boldsymbol s$ 的宇称修正读数。修正后的单次读数 $m_{T,\boldsymbol a}=\pm1$，期望恰为 $\Lambda_{T,\boldsymbol a}$，方差 $1-\Lambda_{T,\boldsymbol a}^2$；样本平均 $\hat\Lambda_{T,\boldsymbol a}$ 无偏。`}</P>

      <P>{R`**一次实验测很多个。** 电路本征值有 $\mathcal O(n)$ 个，要让实验数与 $n$ 无关，每次实验就必须同时测 $\mathcal O(n)$ 个。原文只允许逐比特的 $X,Y,Z$ 制备和测量，所以两个 Pauli 能同时测，当且仅当它们**$T$-相容**：在制备端和测量端的每个比特上相同或至少一个是 $I$。一组两两相容的 Pauli 构成一个**实验** $\sym{Eexp}{E}_T$，全部实验构成实验集 $\sym{Eset}{\mathcal E}_T$。`}</P>
      <P w={1}>{R`只用单比特 Clifford 做基变换，是为了避免引入纠缠门带来额外的 SPAM 噪声。原文的算法 1 用贪心法打包：先放还没进任何实验的 Pauli，优先选测量支撑与已选 Pauli 重叠最多的，再用其余相容 Pauli 把实验填满。`}</P>
      <P>{R`**同时测量带来相关。** 同一批 shot 里 $m_{T,\boldsymbol a}m_{T,\boldsymbol a'}$ 正好是 $\boldsymbol a+\boldsymbol a'$ 的读数（\eqref{2}），所以`}</P>
      <Eq n="21" say="同一个实验中两个读数的协方差：它们乘积的期望（即 $\boldsymbol a+\boldsymbol a'$ 的电路本征值）减去期望之积。$\boldsymbol a=\boldsymbol a'$ 时退化为方差 $1-\Lambda^2$。">{R`\mathrm{Cov}[m_{T,\boldsymbol a},m_{T,\boldsymbol a'}]=\Lambda_{T,\boldsymbol a+\boldsymbol a'}-\Lambda_{T,\boldsymbol a}\Lambda_{T,\boldsymbol a'}`}</Eq>
      <P w={1}>{R`若 $\boldsymbol a$ 与 $\boldsymbol a'$ 的支撑在整条电路中始终不相交，$\Lambda_{T,\boldsymbol a+\boldsymbol a'}=\Lambda_{T,\boldsymbol a}\Lambda_{T,\boldsymbol a'}$，协方差为零；所以协方差矩阵很稀疏。`}</P>

      <P w={3} label="成本按机时计，不按 shot 计">{R`**真正的成本是机时，不是 shot 数。** 深电路跑一次更久，所以比较设计时要固定机时：同样时间里，平均电路越长，采到的 shot 越少。`}</P>
      <P>{R`原文定义：基本 tuple 集在某段时间内能采 $S'$ 个 shot；设计 $(\mathcal T,\Gamma)$ 把这段时间按 shot 权重 $\Gamma_T$ 分给各 tuple（默认 $\Gamma_T\propto\tau_T^{-1}$，即每个 tuple 占用同样的机时）。时间因子 $\tau_{\mathcal T,\Gamma}=\sum_T\Gamma_T\tau_T$ 是平均每个 shot 的时长：`}</P>
      <Eq n="22" keyEq title="测量预算" say="同样的机时，设计的平均电路越长，采到的 shot 越少：测量预算 $S$ 等于 $S'$ 乘以基本设计与本设计的平均时长之比。">{R`S=S'\left(\frac{\tau_{\mathcal T_{\mathcal I}}}{\tau_{\mathcal T,\Gamma}}\right)`}</Eq>
      <P>{R`每个实验分到 $\sym{Sst}{S}_T=S\Gamma_T/|\sym{Eset}{\mathcal E}_T|$ 个 shot。一个电路本征值出现在 $\sym{Ecnt}{E}_{T,\boldsymbol a}$ 个实验里，两个本征值同时出现在 $\sym{Ecnt}{E}_{T,\boldsymbol a,\boldsymbol a'}$ 个实验里：`}</P>
      <BigEq n="23" label="电路本征值估计量的协方差"
        meaning="两个估计量的协方差 = 单次读数的协方差 × 共享 shot 数 ÷ 两者各自 shot 数之积；它只依赖设计和噪声，实验前就能算。"
        parts={[
          { tex: R`\sym{Ecnt}{E}_{T,\boldsymbol a,\boldsymbol a'}`, note: "共享的实验数：不同时出现就不相关" },
          { tex: R`\sym{Sst}{S}_T`, note: R`每个实验分到的 shot：由预算 $S$ 与权重 $\Gamma_T$ 决定——这是设计可以调的旋钮` },
          { tex: R`\Lambda_{T,\boldsymbol a+\boldsymbol a'}-\Lambda_{T,\boldsymbol a}\Lambda_{T,\boldsymbol a'}`, note: R`单次协方差 \eqref{21}` },
        ]}>{R`\mathrm{Cov}\big[\hat\Lambda_{T,\boldsymbol a},\hat\Lambda_{T,\boldsymbol a'}\big]=\frac{\sym{Ecnt}{E}_{T,\boldsymbol a,\boldsymbol a'}}{\sym{Sst}{S}_T\sym{Ecnt}{E}_{T,\boldsymbol a}\sym{Ecnt}{E}_{T,\boldsymbol a'}}\big(\Lambda_{T,\boldsymbol a+\boldsymbol a'}-\Lambda_{T,\boldsymbol a}\Lambda_{T,\boldsymbol a'}\big)`}</BigEq>
      <P w={1}>{R`不同 tuple 之间不相关，所以协方差矩阵 $\Omega$ 按 tuple 分块对角。`}</P>
      <Fold title="从 (21) 到 (23)" steps={4} note="推导">
        <Derivation title="样本均值的协方差" steps={[
          { tex: R`\hat\Lambda_{T,\boldsymbol a}=\frac{1}{n_{\boldsymbol a}}\sum_{k\in K_{\boldsymbol a}}m^{(k)}_{T,\boldsymbol a},\quad n_{\boldsymbol a}=\sym{Sst}{S}_T\sym{Ecnt}{E}_{T,\boldsymbol a}`, why: R`$K_{\boldsymbol a}$ 为测到 $\boldsymbol a$ 的那些 shot：$\sym{Ecnt}{E}_{T,\boldsymbol a}$ 个实验，每个 $\sym{Sst}{S}_T$ 个 shot。` },
          { tex: R`\mathrm{Cov}[\hat\Lambda_{\boldsymbol a},\hat\Lambda_{\boldsymbol a'}]=\frac{1}{n_{\boldsymbol a}n_{\boldsymbol a'}}\sum_{k\in K_{\boldsymbol a}}\sum_{k'\in K_{\boldsymbol a'}}\mathrm{Cov}[m^{(k)}_{\boldsymbol a},m^{(k')}_{\boldsymbol a'}]`, why: R`协方差的双线性。` },
          { tex: R`=\frac{|K_{\boldsymbol a}\cap K_{\boldsymbol a'}|}{n_{\boldsymbol a}n_{\boldsymbol a'}}\big(\Lambda_{\boldsymbol a+\boldsymbol a'}-\Lambda_{\boldsymbol a}\Lambda_{\boldsymbol a'}\big)`, why: R`不同 shot 独立，只有同一个 shot（$k=k'$）才相关，相关量由 \eqref{21} 给出。` },
          { tex: R`|K_{\boldsymbol a}\cap K_{\boldsymbol a'}|=\sym{Sst}{S}_T\sym{Ecnt}{E}_{T,\boldsymbol a,\boldsymbol a'}`, why: R`共享的 shot 来自同时含两者的实验。代入即得 \eqref{23}。` },
        ]} />
      </Fold>
      <P w={1}>{R`**实践中的 shot 安排。** Pauli 帧随机化要求每个 Pauli 的各种本征态符号配置被等频率地制备，所以实际上是「很多次随机化、每次少量 shot」。原文建议随机化次数按 shot 权重分配（可设下限），每次随机化最好只取一个 shot。原文报告的实验数（如 261）都是**随机化之前**的计数。`}</P>
    </PaperSec>);
}

export function S5() {
  return (
    <PaperSec role="solution" id="s-fom" title="五、性能指标：在做实验之前预言误差"
      lead="有了电路本征值的协方差 Ω，就能把统计误差沿着最小二乘一路传到门本征值上，算出误差的整个分布——这就是性能指标 F 的来源。">
      <P>{R`**四步线性传播。** ① 一阶 Taylor 展开到对数域：$\Omega'_{\alpha\beta}\approx\Omega_{\alpha\beta}/\Lambda_\alpha\Lambda_\beta$。② \eqref{25} 是 $\boldsymbol b$ 的线性函数，估计量的协方差就是把 $\Omega'$ 夹在估计矩阵两侧（此处用真值算的 $W$）：`}</P>
      <Eq n="26" keyEq title="门对数本征值估计量的协方差" say="WLS 的「三明治」协方差：权重矩阵与真实误差协方差不一致时，误差就是这样传播的。">{R`\Sigma'=\big(A^\intercal WA\big)^{-1}A^\intercal W\Omega'WA\big(A^\intercal WA\big)^{-1}`}</Eq>
      <P w={1}>{R`若 $W=\Omega'^{-1}$（GLS），右边化简为熟悉的 $(A^\intercal\Omega'^{-1}A)^{-1}$；WLS 只取对角，所以要保留三明治形式。`}</P>
      <P>{R`③ 再做一次一阶展开回到本征值，$\Sigma_{\alpha\beta}\approx\lambda_\alpha\lambda_\beta\Sigma'_{\alpha\beta}$，残差 $\hat{\boldsymbol\lambda}-\boldsymbol\lambda$ 近似服从 $\mathcal N_N(0,\Sigma)$。④ 把 $\Sigma$ 对角化，误差平方和是独立 $\chi^2_1$ 的加权和：`}</P>
      <Eq n="27" keyEq title="误差平方和的分布" say="估计误差的平方和是一个广义卡方分布：均值 $\mathrm{tr}\,\Sigma$，方差 $2\,\mathrm{tr}\,\Sigma^2$；整个分布都能在实验前算出来。">{R`\|\hat{\boldsymbol\lambda}-\boldsymbol\lambda\|_2^2=\sum_{\nu=1}^{N}\sigma_\nu y_\nu,\qquad y_\nu\sim\chi^2_1`}</Eq>
      <Assume title="性能分析只在大样本极限下成立">{R`上面两次**一阶 Taylor 展开**和**正态近似**都要求每个电路本征值的统计误差足够小，原文明说预测「隐含地假设处在收集大量样本的极限」。预算小时会失准：$d=25$、$S=10^6$ 时实测 $1.4480$ 对预测 $1.3245$；估计值被截断进合法区间，也会让小预算下的实际误差偏离预测。另外 $\Sigma$ 要在**真值** $\boldsymbol\lambda$ 处计算，实际只能代入噪声先验。`}</Assume>
      <P>{R`原文关注**归一化 RMS 误差** $\sqrt{S'/N}\,\|\hat{\boldsymbol\lambda}-\boldsymbol\lambda\|_2$：除以 $\sqrt N$ 对每个本征值取平均，乘 $\sqrt{S'}$ 去掉统计标度，使它只依赖于设计和噪声。性能指标是它的期望，二阶展开得：`}</P>
      <BigEq n="28" label={R`ACES 性能指标 $\mathcal F$`}
        meaning="性能指标 ≈ 平均每个参数的 RMS 误差（按机时归一化），实验前由协方差 Σ 算出。"
        parts={[
          { tex: R`\sqrt{\operatorname{tr}\Sigma}`, note: "主项：所有门本征值估计方差之和的平方根" },
          { tex: R`1-\tfrac14\tfrac{\operatorname{tr}\Sigma^2}{(\operatorname{tr}\Sigma)^2}`, note: R`$\sqrt{\cdot}$ 的凹性带来的小修正；误差均匀分摊在许多参数上（$\operatorname{tr}\Sigma^2\ll(\operatorname{tr}\Sigma)^2$）时可忽略` },
        ]}>{R`\mathcal F(\mathcal T,\Gamma|\mathcal C,\boldsymbol\lambda)\approx\sqrt{S'/N}\sqrt{\operatorname{tr}(\Sigma)}\left(1-\frac{1}{4}\frac{\operatorname{tr}(\Sigma^2)}{\operatorname{tr}(\Sigma)^2}\right)`}</BigEq>
      <Verdict label={R`所需机时 $\propto\mathcal F^2$`}>{R`要达到固定精度，所需机时 $\propto\mathcal F^2$：「$\mathcal F$ 小 3.17 倍」就是「省 10 倍机时」。`}</Verdict>
      <MinorEq n="29" say="归一化 RMS 误差的方差：决定一次实验的实际误差会在 $\mathcal F$ 周围散开多少。">{R`\mathcal V(\mathcal T,\Gamma|\mathcal C,\boldsymbol\lambda)\approx\frac{S'}{2N}\frac{\operatorname{tr}(\Sigma^2)}{\operatorname{tr}(\Sigma)}\left(1-\frac{1}{8}\frac{\operatorname{tr}(\Sigma^2)}{\operatorname{tr}(\Sigma)^2}\right)`}</MinorEq>
      <Fold title="(28)(29) 的二阶展开" steps={4} note="推导">
        <Derivation title="对 √Q 做二阶展开" steps={[
          { tex: R`Q=\|\hat{\boldsymbol\lambda}-\boldsymbol\lambda\|_2^2,\quad \mathbb E[Q]=t_1\equiv\operatorname{tr}\Sigma,\quad \mathbb V[Q]=2t_2,\ t_2\equiv\operatorname{tr}\Sigma^2`, why: R`由 \eqref{27}：$\chi^2_1$ 的均值 1、方差 2。` },
          { tex: R`\sqrt Q\approx\sqrt{t_1}+\frac{Q-t_1}{2\sqrt{t_1}}-\frac{(Q-t_1)^2}{8t_1^{3/2}}`, why: R`在均值处对 $\sqrt{\cdot}$ 做二阶 Taylor 展开。` },
          { tex: R`\mathbb E[\sqrt Q]\approx\sqrt{t_1}-\frac{2t_2}{8t_1^{3/2}}=\sqrt{t_1}\Big(1-\frac{t_2}{4t_1^2}\Big)`, why: R`一次项期望为零，二次项期望为 $\mathbb V[Q]=2t_2$。乘 $\sqrt{S'/N}$ 即 \eqref{28}。` },
          { tex: R`\mathbb V[\sqrt Q]=t_1-\big(\mathbb E\sqrt Q\big)^2\approx\frac{t_2}{2t_1}\Big(1-\frac{t_2}{8t_1^2}\Big)`, why: R`$\mathbb E[Q]=t_1$ 精确成立，减去上式的平方并保留到 $t_2^2$ 项。乘 $S'/N$ 即 \eqref{29}。` },
        ]} />
      </Fold>
      <P>{R`**为什么这比「伪逆范数」好。** 原始 ACES 用设计矩阵伪逆的范数衡量设计，只看 $A$ 的几何，不看每个电路本征值实际测得多准（衰减多少、分到多少 shot、和谁一起测）；$\mathcal F$ 把这些都算进去了。`}</P>
      <P w={1}>{R`原文附录 G 表 IV 给出一个反例：错误率设错的设计里性能最差的那一个（$\mathcal F$ 最大），伪逆范数反而比最优设计**更小**（$d=3$：$0.5435$ 对 $0.5838$）。`}</P>
      <Fold title="加性精度与相对精度" note="背景">{R`一个常见的说法是 ACES 只能做到**加性**精度（误差不随噪声变小而变小）。原文强调这是没有优化设计的结论：把门重复 $\phi$ 次，电路本征值变成 $\lambda^\phi$，衰减被放大，就能做到**相对**精度（误差 $\propto 1-\lambda$）。不过并非所有本征值都能这样放大：门会把一些 Pauli 互相映射（「轨道」，如 $H$ 的 $(X,Z)$ 与 $(Y)$），重复门只能放大轨道内本征值的**乘积**，例如 $\lambda_{H,X}\lambda_{H,Z}$。原文观察到优化设计中同一轨道内的估计量强烈反相关，但更细的分析留给了以后。具体的标度见 §六 的附录 C 玩具问题。`}</Fold>
    </PaperSec>);
}
