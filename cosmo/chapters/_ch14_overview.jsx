// 第 14 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
const R = String.raw;

export const HOOK_TITLE = String.raw`从 $10^{12}$ 个读数到一个椭圆`;
export const HOOK = R`Planck 卫星在四年里记录了约 $10^{12}$ 个探测器读数；DESI 测了几千万个星系的光谱；Rubin 天文台每晚产生约 20 TB 的图像。可是最终写进论文摘要的，往往只是几个数——"$\Omega_{\rm m}=0.315\pm0.007$"——外加一张香蕉形或椭圆形的等高线图。

这中间发生了什么？答案是一条**压缩链**：原始数据 → 地图 → 两点函数 → 似然 → 参数。每一步都要回答两个问题：*怎样压缩才不丢信息*（最优估计量），以及*压缩后的不确定度是多少*（协方差）。两者都可以从同一个概念出发推出来——**似然函数**，"给定理论时得到这组数据的概率"。

这一章用一台秤开头：称 100 次同一个人，该报告什么体重、什么误差？你会发现，"误差按 $1/\sqrt m$ 下降"和"测方差有不可消除的宇宙方差 $\sqrt{2/m}$"这两条，几乎就是整个 CMB 与星系巡天误差分析的全部骨架。然后我们学两件实用工具：在拿到数据之前就能预言误差的 **Fisher 矩阵**，以及在几十维参数空间里真正把后验"画出来"的 **Markov 链 Monte Carlo**。本页的交互图会在你的浏览器里真的跑一条 Metropolis–Hastings 链。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "14.1", title: "似然函数：称体重", gist: R`似然 = 给定理论时数据的概率 \eqref{14.2}；Bayes 定理把它翻成参数的后验 \eqref{14.4}–\eqref{14.5}。最大化给出估计量（样本均值 \eqref{14.8}、样本方差 \eqref{14.10}）；对数似然的曲率给出误差 $\sigma_w^2/m$ \eqref{14.13}；方差的误差 $\sqrt{2/m}\,\sigma_w^2$ \eqref{14.21} 就是**宇宙方差**；不关心的参数要边缘化 \eqref{14.22}。`, gives: ["14.2", "14.5", "14.8", "14.13", "14.21", "14.22"], next: R`把"称体重"换成"测宇宙"：完整的分析流程长什么样？` },
  { sec: "14.2", title: "总览：从原始数据到参数约束", gist: R`图 14.1 的流程：原始数据 → 地图 → 两点函数 →（与理论、协方差一起）似然 \eqref{14.23} → 采样器或 Fisher 预测。似然对观测量高斯，但对参数不是。`, gives: ["14.23"], next: R`流程第一步：把时间序列压成地图。` },
  { sec: "14.3", title: "制图", gist: R`线性模型 $d=Ps+\eta$ \eqref{14.24}；最小化 $\chi^2$ \eqref{14.25} 得到最优地图 $\hat s=C_NP^\top N^{-1}d$ \eqref{14.30}，噪声协方差 $C_N=(P^\top N^{-1}P)^{-1}$ \eqref{14.31}；均匀噪声时退化为逐像素平均 \eqref{14.33}。星系巡天则在三维网格上定义过密度 \eqref{14.34}。`, gives: ["14.24", "14.30", "14.31", "14.33", "14.34"], next: R`从地图估计功率谱，并算出它的协方差。` },
  { sec: "14.4", title: "两点函数：CMB 与星系功率谱", gist: R`CMB：波束是 $l$ 空间的乘法 \eqref{14.38}；对真实 $a_{lm}$ 边缘化得似然 \eqref{14.42}，最大化得 $\hat C(l)$ \eqref{14.44}，协方差 $\frac{2}{2l+1}[C+NB_l^{-2}]^2$ \eqref{14.48}。星系：离散 Fourier 模 \eqref{14.49}，模式数 \eqref{14.53}，估计量 \eqref{14.54}，Wick 定理给出协方差 \eqref{14.59}；窗函数耦合模式 \eqref{14.62}。`, gives: ["14.42", "14.44", "14.47", "14.48", "14.53", "14.54", "14.59"], next: R`似然的所有部件都齐了。拿到数据之前，能先预言误差吗？` },
  { sec: "14.5", title: "Fisher 矩阵", gist: R`在真值附近展开 $\chi^2$ \eqref{14.64}，曲率的期望就是 Fisher 矩阵 \eqref{14.68}（一般形式 \eqref{14.69}），只含理论量。单参数误差 $1/\sqrt F$；多参数时边缘化误差 $\sqrt{(F^{-1})_{11}}\ge1/\sqrt{F_{11}}$ \eqref{14.71}（图 14.4）。`, gives: ["14.64", "14.67", "14.68", "14.69", "14.71"], next: R`真实分析中似然非高斯、参数几十个——需要数值地"画出"后验。` },
  { sec: "14.6", title: "对似然采样：MCMC", gist: R`网格法需要 $20^{20}$ 次似然计算，不可行。若能得到服从后验的样本，均值 \eqref{14.72}、方差 \eqref{14.73}、直方图就给出一切。细致平衡 \eqref{14.74} 保证 Markov 链收敛到后验；Metropolis–Hastings 的接受概率 \eqref{14.75} 满足它 \eqref{14.76}。`, gives: ["14.72", "14.73", "14.74", "14.75", "14.76"], next: R`总结整条分析链，以及仍然悬而未决的系统误差。` },
  { sec: "14.7", title: "小结", gist: R`两次压缩（数据→地图→两点函数）+ 理论 + 协方差 → 似然 → MCMC。协方差与系统误差是当今最大的挑战；前向建模与零检验是对策。` },
];

// ---------- 推导图 ----------
export const EQMAP_A = [
  { from: "14.1", to: "14.2", label: R`$m$ 次独立测量：相乘` },
  { from: "14.3", to: "14.4", label: "Bayes 定理" },
  { from: "14.2", to: "14.5", label: R`$\times$ 先验` },
  { from: "14.4", to: "14.5", label: "分母与参数无关" },
  { from: "14.2", to: "14.8", label: R`$\partial\mathcal L/\partial w=0$` },
  { from: "14.2", to: "14.10", label: R`$\partial\mathcal L/\partial\sigma_w^2=0$` },
  { from: "14.8", to: "14.13", label: R`曲率：$\Delta\ln\mathcal L=-\frac12$` },
  { from: "14.10", to: "14.21", label: R`Wick：$\langle x^4\rangle=3\sigma^4$` },
  { from: "14.5", to: "14.22", label: "积掉冗余参数" },
];
export const EQMAP_B = [
  { from: "14.24", to: "14.25", label: "高斯噪声" },
  { from: "14.25", to: "14.30", label: R`$\partial\chi^2/\partial s_i=0$` },
  { from: "14.30", to: "14.31", label: R`$\langle\hat s\hat s\rangle-\langle\hat s\rangle\langle\hat s\rangle$` },
  { from: "14.31", to: "14.35", label: "地图 → 球谐" },
  { from: "14.35", to: "14.38", label: "各向同性波束" },
  { from: "14.38", to: "14.42", label: R`对 $a_{lm}$ 边缘化 (14.41)` },
  { from: "14.42", to: "14.44", label: R`$d\ln\mathcal L/dC=0$` },
  { from: "14.44", to: "14.48", label: R`同 (14.21) 的方法` },
  { from: "14.21", to: "14.48", label: R`$m\to2l+1$` },
  { from: "14.49", to: "14.54", label: R`$B_l\to1$，按 $|\boldsymbol k|$ 分箱` },
  { from: "14.53", to: "14.59", label: R`$2l+1\to m_{k,\alpha}$` },
  { from: "14.54", to: "14.59", label: "Wick (14.56)" },
  { from: "14.48", to: "14.23", label: "协方差" },
  { from: "14.23", to: "14.63", label: "对角协方差" },
  { from: "14.63", to: "14.68", label: "展开 + 期望" },
  { from: "14.68", to: "14.71", label: R`积掉 $\lambda_2$` },
  { from: "14.23", to: "14.75", label: "MCMC 采样" },
  { from: "14.74", to: "14.75", label: "Metropolis–Hastings" },
];
export const EQMAP_LABELS = {
  "14.1": "单次测量的似然", "14.2": R`$m$ 次测量的似然`, "14.3": "联合概率", "14.4": "Bayes 定理", "14.5": "后验", "14.8": "样本均值",
  "14.10": "方差估计量", "14.13": R`$\mathrm{Var}[\hat w]$`, "14.21": "宇宙方差原型", "14.22": "边缘化",
  "14.24": "数据模型", "14.25": R`制图的 $\chi^2$`, "14.30": "最优地图", "14.31": "地图噪声协方差", "14.35": R`$a_{lm}^{\rm obs}$`, "14.38": "波束 = 乘法",
  "14.42": R`$C(l)$ 的似然`, "14.44": R`$\hat C(l)$`, "14.48": R`$C(l)$ 协方差`, "14.49": "离散 Fourier", "14.53": "模式数", "14.54": R`$\hat P_{\rm g}$`, "14.59": R`$P_{\rm g}$ 协方差`,
  "14.23": "高斯似然", "14.63": R`$\chi^2(\lambda)$`, "14.68": "Fisher 矩阵", "14.71": "边缘化误差", "14.74": "细致平衡", "14.75": "接受概率",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "prob", label: "概率与推断" },
  { id: "est", label: "估计量与误差" },
  { id: "tools", label: "工具：Fisher 与 MCMC" },
];

export const concepts = [
  {
    id: "likelihood", name_zh: "似然函数", name_en: "Likelihood", icon: "🎯", section_id: "14.1", group: "prob",
    plain: R`给定一组理论参数时，得到手上这组数据的概率；把它看成参数的函数。`,
    explain: R`$\mathcal L(\{d_i\}|\theta)\equiv P(\{d_i\}|\theta)$。独立测量的似然相乘（\eqref{14.2}），所以对数似然相加。似然对**数据**是归一化的概率，但作为**参数**的函数并不归一，也不一定是高斯的——称体重的例子里，它对 $w$ 是高斯的，对 $\sigma_w$ 就不是。

一旦有了似然，最佳参数就是它的峰（最大似然估计），误差就是它的宽度。整个第 14 章都是围绕"怎样写出似然、怎样读出峰和宽度"展开的。`,
    analogy: R`像嫌疑人的"作案可能性"：给定某个嫌疑人（参数），出现这些现场证据（数据）的概率有多大。证据最"自然"的那个嫌疑人就是最大似然估计。`,
    book_example: { what: R`称体重：$m=100$ 次读数，高斯噪声 \eqref{14.2}。`, point: R`对 $w$ 求导得样本均值 \eqref{14.8}；对 $\sigma_w^2$ 求导得样本方差 \eqref{14.10}。` },
    misconception: R`似然不是"参数为真的概率"。$P(\text{数据}|\text{参数})\neq P(\text{参数}|\text{数据})$——两者之间差一个先验（Bayes 定理）。`,
  },
  {
    id: "bayes", name_zh: "Bayes 定理与先验", name_en: "Bayes' theorem & prior", icon: "⚖️", section_id: "14.1", group: "prob",
    plain: R`后验 $\propto$ 似然 $\times$ 先验：把"数据在理论下的概率"翻成"理论在数据下的概率"。`,
    explain: R`由 $P(B,A)=P(B|A)P(A)=P(A|B)P(B)$（\eqref{14.3}）得 $P(\theta|d)=P(d|\theta)P(\theta)/P(d)$（\eqref{14.4}）。分母与参数无关，只是归一化。

先验的主要作用是**纳入额外信息**（例如厂家告诉你秤的误差上限）。"均匀先验"也并非无害：对 $\sigma_w$ 均匀与对 $\sigma_w^2$ 均匀给出不同后验。数据很强时先验的影响消失；数据很弱或事件很罕见时，先验起决定作用（\exref{14.1}：咳嗽一周的人患肺癌的概率只有 $1/400$）。`,
    analogy: R`医生不会因为你咳嗽就判定肺癌：咳嗽在肺癌患者中几乎必然出现（似然大），但肺癌本身极罕见（先验小）。`,
    book_example: { what: R`\exref{14.1}：$P(C|LC)=1$，$P(LC)=1/2000$，$P(C)=1/5$。`, point: R`$P(LC|C)=1\times(1/2000)/(1/5)=1/400$。` },
    misconception: R`"我用均匀先验，所以我的结果不依赖先验"——错。均匀与否依赖参数化：对 $\sigma$ 均匀就不是对 $\ln\sigma$ 或 $\sigma^2$ 均匀。`,
  },
  {
    id: "marginal", name_zh: "边缘化", name_en: "Marginalization", icon: "🧹", section_id: "14.1", group: "prob",
    plain: R`对不关心的（冗余）参数积分，得到只含感兴趣参数的后验。`,
    explain: R`$P(w|\{d_i\})=\int_0^\infty d\sigma_w\,P(w,\sigma_w|\{d_i\})$（\eqref{14.22}）。这样给出的置信区间正确地包含了"我们不知道 $\sigma_w$"这一事实。宇宙学里典型的冗余参数是星系偏袒 $b_1$、前景幅度、仪器定标。

高斯情形下边缘化有闭式结果：边缘化误差 $=\sqrt{(F^{-1})_{11}}$（\eqref{14.71}），总是不小于固定其余参数时的条件误差 $1/\sqrt{F_{11}}$。`,
    analogy: R`想知道一款药对"所有年龄段"病人的平均疗效：把按年龄分开的疗效按年龄分布加权平均——年龄就被"积掉"了。`,
    book_example: { what: R`图 14.4：二维误差椭圆在 $\lambda_1$ 轴上的投影。`, point: R`参数相关越强，边缘化误差比条件误差大得越多。` },
    misconception: R`边缘化不是"把冗余参数固定在最佳值"。固定（取条件分布）会低估误差；本页 Fisher 交互图可直观对比两者。`,
  },
  {
    id: "estimator", name_zh: "估计量", name_en: "Estimator", icon: "🧮", section_id: "14.1", group: "est",
    plain: R`数据的一个函数，用来估计某个理论量；通常取最大似然解。`,
    explain: R`本章的估计量都由"令 $\partial\ln\mathcal L/\partial\theta=0$"得到：体重 $\hat w$（样本均值 \eqref{14.8}）、方差 $\widehat{\sigma_w^2}$ \eqref{14.10}、地图 $\hat s$ \eqref{14.30}、角功率谱 $\hat C(l)$ \eqref{14.44}、星系功率谱 $\hat P_{\rm g}$ \eqref{14.54}。

估计量本身是随机变量；它的期望（对全部可能数据按似然积分，\eqref{14.15}）应等于真值（无偏），它的方差就是误差棒。`,
    analogy: R`像一个"配方"：无论端来什么原料（数据），都按同一个步骤做出一道菜（估计值）。好配方平均下来味道正确，而且每次差别不大。`,
    book_example: { what: R`$\hat C(l)=B_l^{-2}\big(\frac{1}{2l+1}\sum_m|a_{lm}^{\rm obs}|^2-N(l)\big)$。`, point: R`除掉波束、减掉噪声偏差，就是无偏的。` },
    misconception: R`减去噪声 $N(l)$ 只修正了**偏差**，并不能消除噪声带来的**方差**——后者仍出现在 \eqref{14.47} 里。`,
  },
  {
    id: "cosmic_variance", name_zh: "宇宙方差（样本方差）", name_en: "Cosmic / sample variance", icon: "🎲", section_id: "14.4", group: "est",
    plain: R`只有有限个独立模式可用来估计一个方差，所以即使没有噪声，误差也不为零。`,
    explain: R`估计高斯分布的方差，误差 $=\sqrt{2/m}\times$ 方差（\eqref{14.21}）。宇宙学感兴趣的正是涨落的方差（功率谱）：CMB 每个 $l$ 只有 $2l+1$ 个 $a_{lm}$，所以 $\Delta C/C=\sqrt{2/(2l+1)}$（\eqref{14.47}，$N=0$）；只观测部分天区再除以 $\sqrt{f_{\rm sky}}$。星系巡天中模式数 $\propto Vk^2\Delta k$（\eqref{14.53}）。

它是**不能靠更好的仪器**消除的：$l=2$ 的四极矩永远只有 5 个数，误差永远约 63%。`,
    analogy: R`想知道一枚骰子的方差，却只允许掷 5 次——不管你记录得多么精确，结论都有大误差。宇宙只给了我们这一个"骰子"。`,
    book_example: { what: R`\eqref{14.48}：$\mathrm{Cov}_{ll'}=\frac{2}{2l+1}[C(l)+N(l)B_l^{-2}]^2\delta_{ll'}$。`, point: R`第一项是宇宙方差，主导大尺度；第二项是噪声，主导小尺度。` },
    misconception: R`宇宙方差不是"宇宙在变化"，而是"我们只有一个宇宙可观测、其中独立模式有限"。`,
  },
  {
    id: "covariance", name_zh: "协方差矩阵", name_en: "Covariance matrix", icon: "🧊", section_id: "14.4", group: "est",
    plain: R`两点函数估计值之间的方差与相关；它决定似然的形状。`,
    explain: R`似然 \eqref{14.23} 用协方差的逆来加权残差。高斯场 + 全天/周期盒子时协方差是对角的（\eqref{14.48}、\eqref{14.59}）；但非线性演化带来的连通四点函数（\eqref{14.56} 最后一项）、以及巡天窗函数（\eqref{14.62}）都会耦合不同的 $l$ 或 $k$，使协方差非对角。

本书在小结中强调：协方差是当今宇宙学数据分析链中最大的挑战之一。`,
    analogy: R`像一张"谁和谁一起涨跌"的表：若两个区间的误差是相关的，就不能把它们当成两次独立测量来叠加信息。`,
    book_example: { what: R`Wick 定理展开四点函数 \eqref{14.56}。`, point: R`非重叠区间之间协方差为零——只在高斯近似下成立。` },
    misconception: R`对角协方差常用于预测（forecast），但对真实数据已经不够；忽略非对角项会高估信息量。`,
  },
  {
    id: "mapmaking", name_zh: "最优制图", name_en: "Mapmaking", icon: "🗺️", section_id: "14.3", group: "est",
    plain: R`把海量时间序列读数压缩成一张地图，同时不丢失关于信号的信息。`,
    explain: R`数据模型 $d=Ps+\eta$（\eqref{14.24}）是线性的、噪声高斯；最大似然解 $\hat s=(P^\top N^{-1}P)^{-1}P^\top N^{-1}d$（\eqref{14.30}）是"广义加权平均"，其噪声协方差 $C_N=(P^\top N^{-1}P)^{-1}$。均匀不相关噪声时就是逐像素平均，噪声 $\propto m_i^{-1/2}$。

同一公式也适用于投影星系密度、透镜势重建——任何"线性 + 高斯噪声"的问题。`,
    analogy: R`像拼图时把同一块被拍了很多次的照片叠在一起平均：拍得越多越清晰；拍的时候抖得厉害（噪声大）的那几张权重低一点。`,
    book_example: { what: R`图 14.2：ACT 的 45 平方度 CMB 地图。`, point: R`左上角观测次数多，噪声低——正是 $\mathcal N/m_i$。` },
    misconception: R`地图不是"原始数据"，而是第一次压缩；如果噪声模型 $N$ 错了，地图及其协方差都会错。`,
  },
  {
    id: "fisher", name_zh: "Fisher 矩阵", name_en: "Fisher matrix", icon: "🔭", section_id: "14.5", group: "tools",
    plain: R`似然在真值附近曲率的期望；它的逆给出预期的参数误差。`,
    explain: R`$F_{\alpha\beta}=-\langle\partial^2\ln\mathcal L/\partial\lambda_\alpha\partial\lambda_\beta\rangle$（\eqref{14.69}）。对高斯似然、对角且与参数无关的协方差，$F_{\alpha\beta}=\sum_l\frac{\partial C_\alpha\partial C_\beta}{\mathrm{Var}[\hat C]}$（\eqref{14.68}）——只需要理论导数与实验规格，**不需要数据**。

误差：条件误差 $1/\sqrt{F_{\alpha\alpha}}$（其余参数已知），边缘化误差 $\sqrt{(F^{-1})_{\alpha\alpha}}$（其余参数未知）。Fisher 误差是一个下界（Cramér–Rao），在似然近高斯时才准确。`,
    analogy: R`像在山顶测量地形的弯曲程度：山顶越尖，你越能确定峰的位置；山脊又长又平的方向（参数简并），位置就很难确定。`,
    book_example: { what: R`图 14.4：二维误差椭圆。`, point: R`$\sqrt{(F^{-1})_{11}}$ 是椭圆在 $\lambda_1$ 轴上的投影，$1/\sqrt{F_{11}}$ 是它在 $\lambda_2=\bar\lambda_2$ 处的截距。` },
    misconception: R`报告 $1/\sqrt{F_{11}}$ 作为误差（等于假装其他参数全知道）是常见错误；正确的是 $\sqrt{(F^{-1})_{11}}$。`,
  },
  {
    id: "mcmc", name_zh: "Markov 链 Monte Carlo", name_en: "MCMC", icon: "⛓️", section_id: "14.6", group: "tools",
    plain: R`一种随机游走：每一步只看当前点，按规则跳动，使所到之处的分布正好是后验。`,
    explain: R`网格法的代价随维数指数增长（20 维 $\to20^{20}$ 次计算）；而样本法的代价几乎与维数无关：只要有服从后验的样本，均值 \eqref{14.72}、方差 \eqref{14.73}、任意参数的边缘直方图都唾手可得（边缘化 = 忽略其他坐标）。

MCMC 的关键要求是**细致平衡** \eqref{14.74}：和 Boltzmann 方程碰撞项让分布趋于平衡分布完全类比。实践中要关注：步长调节、burn-in、收敛判断、相邻样本的相关。`,
    analogy: R`一个蒙眼的登山者在山区里随机走：往高处的提议总是接受，往低处的提议按高度比例接受。走得足够久，他在每个地方停留的时间就与该处"海拔"（后验）成正比。`,
    book_example: { what: R`图 14.5：20 个样本给出均值 0.46、标准差 0.18（真值 0.5、0.22）。`, point: R`样本越多，样本统计量越接近真值；本页交互图可以亲手验证。` },
    misconception: R`链中的样本并不独立：相邻样本高度相关，有效样本数 $=m_{\rm sample}/\tau$ 可能远小于步数。`,
  },
  {
    id: "detailed_balance", name_zh: "细致平衡与 Metropolis–Hastings", name_en: "Detailed balance & MH", icon: "🔁", section_id: "14.6", group: "tools",
    plain: R`正向与反向跳转的"流量"相等，保证后验是链的平衡分布；MH 的接受规则 $\min\{P'/P,1\}$ 满足它。`,
    explain: R`$P(\lambda)K(\lambda'|\lambda)=P(\lambda')K(\lambda|\lambda')$（\eqref{14.74}）。Metropolis–Hastings：从对称分布 $g$ 提议 $\lambda'$，以 $p_{\rm acc}=\min\{P(\lambda')/P(\lambda),1\}$ 接受，否则重复当前点（\eqref{14.75}）。因为 $g$ 对称，$K$ 之比等于 $p_{\rm acc}$ 之比，恰为 $P(\lambda')/P(\lambda)$（\eqref{14.76}）。

只需要后验的**比值**——归一化常数 $P(\{d_i\})$ 永远不需要计算。`,
    analogy: R`像城市间的人口流动：如果每对城市间"甲→乙"与"乙→甲"的人数相等，各城人口就不再变化——这就是平衡。`,
    book_example: { what: R`\eqref{14.76} 的两种情形 $P(\lambda')<P(\lambda)$ 与 $>$。`, point: R`分子或分母之一为 1，另一个恰好补上比值。` },
    misconception: R`被拒绝时不是"什么都不做"，而是**把当前点再记一次**；漏掉这一步会使采样偏离后验。`,
  },
];

export const relations = [
  { from: "likelihood", to: "bayes", label: R`$\times$ 先验 = 后验` },
  { from: "bayes", to: "marginal", label: "积掉冗余参数" },
  { from: "likelihood", to: "estimator", label: "最大化" },
  { from: "estimator", to: "cosmic_variance", label: "估计方差的误差" },
  { from: "cosmic_variance", to: "covariance", label: "对角部分" },
  { from: "mapmaking", to: "estimator", label: "第一个估计量" },
  { from: "covariance", to: "likelihood", label: "决定形状 (14.23)" },
  { from: "likelihood", to: "fisher", label: "曲率的期望" },
  { from: "fisher", to: "marginal", label: R`$\sqrt{(F^{-1})_{11}}$` },
  { from: "likelihood", to: "mcmc", label: "数值采样" },
  { from: "detailed_balance", to: "mcmc", label: "保证收敛" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  R`**似然**是一切的起点：$\mathcal L=P(\text{数据}|\text{理论})$；后验 $\propto\mathcal L\times$ 先验 \eqref{14.5}。最大化给估计量，曲率给误差：一维高斯时方差 = 对数似然二次项系数的倒数（\eqref{14.12}–\eqref{14.13}）。`,
  R`**宇宙方差**：用 $m$ 个样本估计方差，误差至少 $\sqrt{2/m}$ 倍方差 \eqref{14.21}。CMB 中 $m\to2l+1$（\eqref{14.47}），星系中 $m\to m_{k,\alpha}\propto Vk^2\Delta k$（\eqref{14.53}、\eqref{14.60}）；再加上噪声项 $NB_l^{-2}$ 或 $P_N=1/\bar n_{\rm g}$。`,
  R`**两次压缩**：时间序列 → 地图 $\hat s=C_NP^\top N^{-1}d$ \eqref{14.30}；地图 → 两点函数 $\hat C(l)$ \eqref{14.44}、$\hat P_{\rm g}$ \eqref{14.54}。每一步都是最大似然解，并伴随协方差 \eqref{14.31}、\eqref{14.48}、\eqref{14.59}。`,
  R`**Fisher 矩阵**只需理论导数与实验规格就能预言误差 \eqref{14.68}；报告边缘化误差 $\sqrt{(F^{-1})_{\alpha\alpha}}$，而不是条件误差 $1/\sqrt{F_{\alpha\alpha}}$ \eqref{14.71}。`,
  R`**MCMC**：用满足细致平衡 \eqref{14.74} 的 Markov 链从后验采样；Metropolis–Hastings 只需后验比值 \eqref{14.75}。步长要与后验宽度相当；注意 burn-in 与样本相关。`,
  R`真实分析的难点在于：非高斯似然、非对角协方差（非线性、窗函数）、以及**系统误差**——后者不随数据量 $\propto m^{-1/2}$ 下降，需要前向建模与零检验。`,
];

export const QUIZ = [
  {
    q: R`称了 $m=100$ 次，每次噪声 $\sigma_w=1\,$kg。体重的 $1\sigma$ 误差是多少？如果想把误差再减半，需要称多少次？`,
    options: [R`$0.01\,$kg；200 次`, R`$0.1\,$kg；400 次`, R`$0.1\,$kg；200 次`, R`$1\,$kg；400 次`],
    answer: 1, why: R`$\sqrt{\mathrm{Var}[\hat w]}=\sigma_w/\sqrt m=0.1\,$kg（\eqref{14.13}）。误差 $\propto m^{-1/2}$，减半需要 $4$ 倍测量。`,
  },
  {
    q: R`一个无噪声、全天的 CMB 实验测量 $l=2$ 的四极矩功率 $C(2)$。它的相对误差是多少？`,
    options: [R`0（无噪声就无误差）`, R`$\sqrt{2/5}\approx63\%$`, R`$\sqrt{1/5}\approx45\%$`, R`$2/5=40\%$`],
    answer: 1, why: R`宇宙方差：$\sqrt{2/(2l+1)}=\sqrt{2/5}\approx0.63$（\eqref{14.47}，$N=0$）。天上只有 5 个 $a_{2m}$。`,
  },
  {
    q: R`Fisher 矩阵 $F=\begin{pmatrix}4&-1.6\\-1.6&1\end{pmatrix}$。$\lambda_1$ 的边缘化误差是多少？`,
    options: [R`$1/\sqrt4=0.5$`, R`$\sqrt{4}=2$`, R`$\sqrt{(F^{-1})_{11}}=\sqrt{1/1.44}\approx0.83$`, R`$1/\sqrt{4-1.6}\approx0.65$`],
    answer: 2, why: R`$\det F=4-2.56=1.44$，$(F^{-1})_{11}=F_{22}/\det F=1/1.44$，误差 $\approx0.833$；比条件误差 0.5 大 $1/\sqrt{1-0.8^2}=5/3$ 倍（\eqref{14.71}）。`,
  },
  {
    q: R`Metropolis–Hastings 中，提议点的后验是当前点的 $0.3$ 倍。下一步会怎样？`,
    options: ["一定拒绝，链停止", R`以 30% 的概率移到提议点；否则把当前点再记一次`, R`以 70% 的概率移到提议点`, "一定接受"],
    answer: 1, why: R`$p_{\rm acc}=\min\{0.3,1\}=0.3$（\eqref{14.75}）。被拒绝时当前点重复进入链——这对细致平衡是必要的。`,
  },
  {
    q: R`为什么 Fisher 矩阵 \eqref{14.67} 中的二阶导数项 $(C^{\rm theory}-\hat C)\partial^2C^{\rm theory}/\partial\lambda^2$ 消失了？`,
    options: ["因为二阶导数总是很小", R`因为取了期望：在真值处 $\langle\hat C(l)\rangle=C^{\rm theory}(l,\bar\lambda)$`, "因为协方差是对角的", "因为似然是高斯的"],
    answer: 1, why: R`唯一的随机量是 $\hat C(l)$；对多次实现取平均，残差在真值处为零，只留下 $(\partial C/\partial\lambda)^2$ 项。所以 Fisher 矩阵只含理论量。`,
  },
  {
    q: R`把星系巡天体积扩大 4 倍（其余不变），功率谱在给定 $k$ 区间的相对误差如何变化？`,
    options: ["不变", "减半", "变为 1/4", "只有噪声项减小"],
    answer: 1, why: R`模式数 $m_{k,\alpha}\propto V$（\eqref{14.53}），误差 $\propto m^{-1/2}\propto V^{-1/2}$（\eqref{14.60}），4 倍体积 → 误差减半。散粒噪声项 $1/\bar n_{\rm g}P$ 的比例不变。`,
  },
];

export const BRIDGE = R`这是全书的最后一章。回头看，第 2–13 章构建的是图 14.1 中间那个"理论两点函数"方框：从膨胀背景、Boltzmann 方程、暴胀初条件，一路算到 CMB 的 $C(l)$ 与物质/星系/透镜功率谱。本章补齐了方框两边：数据怎样压缩成可与理论比较的两点函数，以及比较的结果怎样变成参数约束。拿着这两半，你已经可以读懂一篇现代宇宙学数据分析论文的全部结构——也能用 Fisher 矩阵为下一代实验做出自己的预言（\exref{14.9}、\exref{14.11}）。附录 A 给出了部分习题的解答，附录 B、C 汇总了常用数值与特殊函数。`;
