// 第 12 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "当 δ 超过 1";
export const HOOK = R`第 8 章结束时，我们手里有一条漂亮的线性功率谱 $P_{\rm L}(k)$。可是把它在 $8\,h^{-1}\mathrm{Mpc}$ 的球里平均一下，得到的涨落是 $\sigma_8\approx0.8$；再往小尺度看，$\sigma$ 就超过 1 了——过密度 $\delta>1$ 而欠密度却不可能低于 $-1$，"线性"这个前提在那里已经自相矛盾。真实的宇宙在这些尺度上有星系、星系团、纤维和空洞，银河系所在的暗物质晕的密度是宇宙平均值的数百倍。

奇怪的是，引力势在所有尺度上依然只有 $10^{-5}$ 左右：时空几乎是平的，只有**物质**变得非线性了。这一章就利用这个不对称，把问题化成"冷、无碰撞粒子在牛顿引力中运动"——Vlasov–Poisson 方程组——再用两套武器去解它：在大尺度上，把非线性写成线性场的幂级数（微扰论），算出功率谱的单圈修正与双谱；在小尺度上，用数十亿个"相空间小块"做 N 体模拟，从中认出暗物质晕。然后用一个简单得惊人的球坍缩模型解释晕为什么在线性密度达到 $1.686$ 时形成、为什么大质量星系团指数稀少、为什么它们比物质成团得更强——这些正是星系团计数与星系巡天测量宇宙学所依赖的理论。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "12.1", title: "序曲：哪里非线性，可以保留什么", gist: R`$\sigma_W(R)$ \eqref{12.4} 在小尺度超过 1，但势处处 $\lesssim10^{-4}$：度规保持线性、用牛顿 Poisson \eqref{12.5}，物质完全非线性，得 Vlasov 方程 \eqref{12.8}；零速度弥散的冷分布 \eqref{12.9}。`, gives: ["12.4", "12.5", "12.8", "12.9"], next: R`Vlasov 方程在 $6+1$ 维中太难；先取矩，化成流体方程试试。` },
  { sec: "12.2", title: "微扰论", gist: R`取矩得非线性连续性 \eqref{12.14} 与 Euler \eqref{12.20} 方程；丢掉应力后迭代求解：$\delta^{(n)}\propto D_+^n\int F_n\delta_0^n$ \eqref{12.40}，核 $F_2$ \eqref{12.39}。由 Wick 定理得 NLO 功率谱 \eqref{12.48}–\eqref{12.49} 与双谱 \eqref{12.51}；有效流体声速项 \eqref{12.53} 弥补应力。`, gives: ["12.24", "12.37", "12.39", "12.40", "12.48", "12.49", "12.51", "12.53"], next: R`流体描述在壳层交叉处失效，小尺度需要直接解 Vlasov 方程。` },
  { sec: "12.3", title: "数值模拟", gist: R`冷物质占据相空间中的一张薄片；把它离散成"粒子"，沿特征线 \eqref{12.57} 用蛙跳 kick–drift \eqref{12.59}–\eqref{12.60} 推进，引力用 FFT 网格或树算法。`, gives: ["12.54", "12.57", "12.59", "12.60"], next: R`模拟中涌现出束缚的暗物质晕——非线性结构的积木。` },
  { sec: "12.4", title: "暗物质晕", gist: R`质量按 $\Delta\rho_{\rm m}$ 定义 \eqref{12.61}，NFW 轮廓 \eqref{12.62}；球坍缩 \eqref{12.67}–\eqref{12.68} 给出 $\delta_{\rm cr}=1.686$ \eqref{12.69} 与 $\Delta_{\rm vir}\approx180$；Press–Schechter 质量函数 \eqref{12.73}。`, gives: ["12.61", "12.62", "12.64", "12.68", "12.69", "12.70", "12.73"], next: R`最重的晕就是星系团：它们的丰度对 $\sigma(M)$ 指数敏感。` },
  { sec: "12.5", title: "星系团", gist: R`光学、X 射线、SZ 三种找团方法；位力温度 $T\propto M^{2/3}$ \eqref{12.75}–\eqref{12.76}；质量–观测量关系、弱透镜定标与 Malmquist 偏差。`, gives: ["12.75", "12.76"], next: R`星系不只在团里：如何用星系的成团测宇宙学？` },
  { sec: "12.6", title: "星系成团与偏袒", gist: R`峰–背景分离 \eqref{12.77}–\eqref{12.80}：$b_1^{\rm PS}=(\nu^2-1)/\delta_{\rm cr}$ \eqref{12.81}；阈值区域关联的偏袒展开 \eqref{12.83}；星系微扰论核 $F_{{\rm g},2}$ \eqref{12.87}；等效原理保证星系速度无偏。`, gives: ["12.80", "12.81", "12.83", "12.87", "12.88"], next: R`反过来，把所有物质都放进晕里，能否重建物质功率谱？` },
  { sec: "12.7", title: "晕模型", gist: R`物质 = 晕的叠加 \eqref{12.90}；质量函数归一化 \eqref{12.96}；$\delta_{\rm m}$ 是晕过密度经轮廓涂开的加权和 \eqref{12.97}；$P=P_{2{\rm h}}+P_{1{\rm h}}$。`, gives: ["12.90", "12.96", "12.97"], next: R`小结：两条路线，一组方程。` },
  { sec: "12.8", title: "小结", gist: R`Vlasov–Poisson \eqref{12.98}；模拟 + 晕（\eqref{12.99}–\eqref{12.101}）与微扰论（\eqref{12.102}–\eqref{12.104}）各有适用范围。`, gives: ["12.98", "12.101", "12.104"] },
];

// ---------- 推导图 ----------
export const EQMAP_PT = [
  { from: "12.5", to: "12.8", label: "弱场、视界内、非相对论" },
  { from: "12.8", to: "12.14", label: R`零阶矩` },
  { from: "12.8", to: "12.20", label: R`一阶矩 + 应力 (12.17)` },
  { from: "12.9", to: "12.20", label: R`冷物质 $\sigma^{ij}=0$` },
  { from: "12.14", to: "12.23", label: R`去掉背景，换 $\eta$` },
  { from: "12.20", to: "12.23", label: "" },
  { from: "12.23", to: "12.24", label: R`取散度 $\theta=\partial_iu^i$` },
  { from: "12.24", to: "12.33", label: R`代入线性解，以 $\ln D_+$ 为时间` },
  { from: "12.33", to: "12.37", label: R`$\Omega_{\rm m}/f^2\approx1$，$\propto D_+^2$` },
  { from: "12.37", to: "12.39", label: "对称化" },
  { from: "12.39", to: "12.40", label: "逐阶推广" },
  { from: "12.40", to: "12.49", label: "Wick 定理 (12.47)" },
  { from: "12.40", to: "12.51", label: "Wick 定理" },
  { from: "12.20", to: "12.53", label: "有效应力 (12.52)" },
];
export const EQMAP_HALO = [
  { from: "12.65", to: "12.67", label: R`$r\propto$ 局部 $\tilde a$` },
  { from: "12.67", to: "12.68", label: R`去掉 $\Lambda$` },
  { from: "12.68", to: "12.69", label: R`$\theta=2\pi$，线性外推` },
  { from: "12.4", to: "12.70", label: R`$\sigma(R_L[M])$` },
  { from: "12.64", to: "12.70", label: R`$R_L(M)$` },
  { from: "12.69", to: "12.70", label: R`阈值 $\delta_{\rm cr}$` },
  { from: "12.70", to: "12.73", label: R`$\frac{\rho_{\rm m}}{M}\frac{dF}{d\ln M}$` },
  { from: "12.73", to: "12.80", label: R`阈值 $\to\delta_{\rm cr}-\delta_\ell$` },
  { from: "12.80", to: "12.81", label: R`$f_{\rm PS}$` },
  { from: "12.62", to: "12.97", label: "轮廓 y" },
  { from: "12.73", to: "12.97", label: "质量函数" },
  { from: "12.80", to: "12.97", label: R`晕的成团 $b_1$` },
  { from: "12.74", to: "12.75", label: R`$\Delta_{\rm vir}$ 消去半径` },
];
export const EQMAP_LABELS = {
  "12.5": "牛顿 Poisson", "12.8": "Vlasov 方程", "12.9": "冷分布函数", "12.14": "连续性方程", "12.20": "Euler 方程", "12.23": "Euler–Poisson 组",
  "12.24": "非线性项移右边", "12.33": R`以 $\ln D_+$ 为时间`, "12.37": R`$A_\delta$、$A_\theta$`, "12.39": R`核 $F_2$、$G_2$`, "12.40": R`第 $n$ 阶解`, "12.49": "单圈功率谱",
  "12.51": "树图双谱", "12.53": "有效声速", "12.65": "局部 Friedmann", "12.67": "球壳运动方程", "12.68": "摆线解", "12.69": R`$\delta_{\rm cr}=1.686$`,
  "12.4": R`$\sigma_W^2$`, "12.64": "拉格朗日半径", "12.70": "PS 坍缩比例", "12.73": "PS 质量函数", "12.80": "峰–背景分离", "12.81": R`$b_1^{\rm PS}$`,
  "12.62": "NFW 轮廓", "12.97": R`晕模型 $\delta_{\rm m}$`, "12.74": "位力定理", "12.75": "位力温度",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "eq", label: "方程与尺度" },
  { id: "pt", label: "微扰论" },
  { id: "sim", label: "模拟与晕" },
  { id: "obs", label: "观测示踪体" },
];

export const concepts = [
  {
    id: "sigma_w", name_zh: "平滑方差与非线性尺度", name_en: "Filtered variance σ_W", icon: "🔍", section_id: "12.1", group: "eq",
    plain: R`在半径 $R$ 上平滑后密度的涨落：$\sigma_W\gtrsim1$ 的尺度就是非线性的。`,
    explain: R`把线性密度场用窗口 $W$ 平滑，方差就是 $\int d\ln k\,\Delta^2_{\rm L}(k)|W(k)|^2$（\eqref{12.4}）。今天 $\sigma_W$ 在 $R\approx6\,h^{-1}\mathrm{Mpc}$ 处等于 1，更小的尺度上线性理论在大多数地方都给出错误的密度。

同一积分换成势：$\Psi\propto\delta/k^2$，小尺度被强烈压低，所以势的涨落在所有尺度都只有 $\sim5\times10^{-5}$。这个"密度大、势小"的不对称是本章全部简化的出发点。`,
    analogy: R`像看一张照片：缩小看（大 $R$）画面均匀；放大到像素级（小 $R$）每个点都和平均亮度差很多。`,
    book_example: { what: R`\figref{12.1}：tophat 与 sharp-$k$ 两种窗口的 $\sigma_W(R)$，以及 $10^4\times$ 势的 RMS。`, point: R`$R=8\,h^{-1}\mathrm{Mpc}$ 处的值就是 $\sigma_8$；势的曲线几乎是平的。` },
    misconception: R`"非线性"不是指引力变强了——引力势仍然很弱，只是物质密度的相对涨落变成 $\mathcal O(1)$。`,
  },
  {
    id: "vlasov", name_zh: "Vlasov–Poisson 方程组", name_en: "Vlasov–Poisson system", icon: "🌀", section_id: "12.1", group: "eq",
    plain: R`冷无碰撞物质在牛顿引力下的完全非线性运动方程。`,
    explain: R`对非相对论、视界内的物质，Boltzmann 方程化为 \eqref{12.8}：粒子以 $p/ma$ 漂移，动量被膨胀阻尼并受 $-\nabla\Psi$ 推动；势由 Poisson 方程 \eqref{12.5} 决定。它只假设时空扰动小，对分布函数不做任何线性化。

它是 $6+1$ 维的非线性积分–微分方程组，出了名地难解。本章两条路线——取矩做微扰论、离散相空间做 N 体——都是解它的不同方式。`,
    analogy: R`像一大群在缓慢膨胀的舞池里互相吸引的舞者：每个人只受整体引力场牵引，没有碰撞。`,
    book_example: { what: R`\eqref{12.6}–\eqref{12.8} 从测地线方程 \eqref{3.69} 出发，丢掉 $\dot\Phi$ 与 $p^2/E$ 项。`, point: R`$\dot\Phi\sim aH\Psi$ 远小于 $\partial\Psi/\partial x\sim k\Psi$。` },
    misconception: R`牛顿近似并不只在小尺度成立：在同步–共动规范中解释 $\delta_{\rm m}$，\eqref{12.5} 在物质主导期对所有尺度成立。`,
  },
  {
    id: "spt", name_zh: "标准微扰论与核函数", name_en: "Standard perturbation theory", icon: "🧮", section_id: "12.2", group: "pt",
    plain: R`把非线性密度写成线性场的幂级数，每一阶用一个核 $F_n$ 耦合。`,
    explain: R`冷流体方程 \eqref{12.24} 的右边是二次项。代入低阶解迭代，在 $\Omega_{\rm m}/f^2\approx1$ 下得到 $\delta^{(n)}=D_+^n\int F_n\delta_0\cdots\delta_0$（\eqref{12.40}），$F_2=\frac57+\frac27\mu^2+\frac12\mu(k_1/k_2+k_2/k_1)$。

用 Gauss 场的 Wick 定理就能算统计量：功率谱的单圈修正 $P^{(22)}+2P^{(13)}$ 与树图双谱 $2F_2P_{\rm L}P_{\rm L}$。修正的相对大小约为 $\sigma^2_{R=1/k}$，在 $k\sim k_{\rm NL}$ 处变为 1。被忽略的应力用有效流体的声速项 $-C_s^2k^2$（\eqref{12.53}）补上，其系数由模拟定标。`,
    analogy: R`像量子场论里的 Feynman 图：线性场是"外线"，核 $F_n$ 是顶点，功率谱是把外线两两连起来的图。`,
    book_example: { what: R`\figref{12.4}：$z=0$ 与 $z=1$ 的线性与 NLO 功率谱。`, point: R`NLO 修正在 $k\approx0.3$ 与 $0.6\,h\,\mathrm{Mpc^{-1}}$ 处与线性谱相当，分别接近 $k_{\rm NL}$。` },
    misconception: R`SPT 解的是"理想冷流体"——它在壳层交叉后是错的方程；有效流体项不是可有可无的修饰，而是让微扰论自洽的必需品。`,
  },
  {
    id: "shell_crossing", name_zh: "壳层交叉与多流", name_en: "Shell crossing", icon: "🔀", section_id: "12.3", group: "sim",
    plain: R`无碰撞物质穿过中心后，同一点出现多个速度，流体描述失效。`,
    explain: R`冷物质在相空间中是一张薄片。坍缩时内壳层穿过原点再出来，与仍在下落的外壳层相遇：同一位置有两个速度——分布函数出现多个峰。流体每点只能有一个速度，所以它会产生激波，而真实的暗物质不会。

此时应力张量与所有高阶矩都重要。相空间薄片并不撕裂，只是卷绕起来。壳层交叉只发生在小于约 $10\,h^{-1}\mathrm{Mpc}$ 的尺度上。`,
    analogy: R`像两队跑步的人迎面穿过——没有碰撞，但同一地点同时有两种跑向；"平均速度"已经没有意义。`,
    book_example: { what: R`\figref{12.5}：早期单值速度与晚期多流阶段的实空间、速度分布与相空间。`, point: R`左图可以用有效流体描述，右图不能。` },
    misconception: R`多流不是相空间体积被"压没了"——Liouville 定理保证薄片面积守恒，它只是被折叠。`,
  },
  {
    id: "nbody", name_zh: "N 体模拟", name_en: "N-body simulation", icon: "🖥️", section_id: "12.3", group: "sim",
    plain: R`把相空间薄片切成"粒子"，沿测地线数值积分。`,
    explain: R`粒子运动满足 \eqref{12.57}：用超共形动量 $p_c=ap$ 后只剩引力"踢"。蛙跳格式交替执行 kick \eqref{12.59} 与 drift \eqref{12.60}，位置与动量错开半步，能量误差 $\mathcal O(\Delta t^3)$。引力由网格 FFT 或树算法求出，代价 $\sim N\log N$；周期边界；初条件由线性位移场（Zel'dovich）给出。

模拟只需 $\Omega_{\rm m}$、$H(a)$ 与线性功率谱。局限在于只含引力：超新星与 AGN 反馈让 $k\simeq1\,h\,\mathrm{Mpc^{-1}}$ 处有百分之几的不确定性。`,
    analogy: R`像用几十亿个沙粒去代表一层薄薄的流沙：每粒沙不是真实粒子，只是这层流沙的一小块。`,
    book_example: { what: R`\figref{12.6}：Millennium 模拟（$10^{10}$ 个粒子）逐级放大。`, point: R`晕、纤维、墙、空洞与晕内子结构的层级。` },
    misconception: R`模拟"粒子"的质量是数值参数，不是暗物质粒子的质量；分辨率越高粒子越轻。`,
  },
  {
    id: "halo", name_zh: "暗物质晕与层级结构", name_en: "Dark matter halo", icon: "🫧", section_id: "12.4", group: "sim",
    plain: R`引力束缚的暗物质团：星系的宿主、非线性结构的积木。`,
    explain: R`小尺度涨落最大，所以最先坍缩；小晕随后并入大晕，其内核成为子结构——层级式结构形成。晕在模拟中用球形过密度或朋友的朋友算法识别，每个粒子只属于一个晕。

质量定义为平均内部密度为 $\Delta\rho_{\rm m}$ 的球内质量 $M_\Delta$（\eqref{12.61}），常用 $\Delta=200$。拉格朗日半径 $R_L(M)=1.40\,h^{-1}\mathrm{Mpc}\,(M/10^{12}h^{-1}M_\odot)^{1/3}$ 是组装晕的物质原来所占的区域。所有星系都住在晕里，反之不然。`,
    analogy: R`像城市：人口（星系）总在城市（晕）里，但并非每个小镇都有地标建筑；大城市由小镇不断并入而成。`,
    book_example: { what: R`\eqref{12.64}：银河系量级的晕来自 $\sim1\,h^{-1}\mathrm{Mpc}$ 的区域，星系团来自 $\sim10\,h^{-1}\mathrm{Mpc}$。`, point: R`$R_L\propto M^{1/3}$。` },
    misconception: R`晕质量没有唯一定义：$M_{200}$、$M_{500c}$、束缚质量各不相同，比较时必须统一 $\Delta$ 与参考密度。`,
  },
  {
    id: "nfw", name_zh: "NFW 轮廓与浓度", name_en: "NFW profile", icon: "📉", section_id: "12.4.1", group: "sim",
    plain: R`晕的平均密度轮廓：内 $r^{-1}$、外 $r^{-3}$，用浓度 $c$ 描述。`,
    explain: R`Navarro, Frenk & White (1997) 发现晕的球平均轮廓近似普适：$\rho=\rho_s/[(r/r_s)(1+r/r_s)^2]$。两个参数可换成 $M_\Delta$ 与浓度 $c_\Delta=R_\Delta/r_s$，后者只微弱依赖质量。

包含质量 $\propto\ln(1+x)-x/(1+x)$，在大半径处对数发散，所以真实晕在 $r\gtrsim R_{200}$ 处更陡；晕模型中把轮廓截断在 $R_{200}$。`,
    analogy: R`像一座山：山顶很尖（$r^{-1}$ 尖峰），山脚很缓地延伸（$r^{-3}$），"浓度"决定山顶有多陡。`,
    book_example: { what: R`\exref{12.8}：$M_{200}=10^{12}M_\odot$、$c=4,8,16$ 的轮廓。`, point: R`浓度越高，中心密度越高，$r_s$ 越小。` },
    misconception: R`NFW 不是从第一性原理推出的解，而是对模拟的拟合；它的 $r^{-3}$ 尾巴在 $R_{200}$ 外不可信。`,
  },
  {
    id: "spherical_collapse", name_zh: "球坍缩与 δ_cr", name_en: "Spherical collapse", icon: "🎯", section_id: "12.4.2", group: "sim",
    plain: R`过密球像一个闭合小宇宙：膨胀、转向、坍缩；线性外推到 $1.686$ 时坍缩。`,
    explain: R`球内质量守恒，物理半径满足 \eqref{12.67}；无 $\Lambda$ 时为摆线 \eqref{12.68}：$t_{\rm ta}$ 转向，$2t_{\rm ta}$ 坍缩到中心。把同一区域的过密度按线性理论外推，坍缩时刻恰好是 $\delta^{(1)}=\frac35(3\pi/2)^{2/3}=1.686$——与质量无关（物质主导宇宙无标度）。

用位力定理，坍缩后停在 $r_{\rm ta}/2$，密度是背景的 $18\pi^2\approx178$ 倍，这就是 $\Delta=200$ 的由来。$\Lambda$ 对两者影响很小。`,
    analogy: R`像向上抛一个球：抛得越用力（初始过密度越小）飞得越高、越晚落回，但"何时落回"只取决于初速度这一个数。`,
    book_example: { what: R`\figref{12.7}：切出的球、密度轮廓与 $r(t)$ 摆线。`, point: R`转向时非线性 $1+\delta=5.55$，而线性外推只有 $1.06$。` },
    misconception: R`"坍缩到 $r=0$"只是数学；真实的晕在剧烈弛豫后位力化在 $r_{\rm ta}/2$ 附近。`,
  },
  {
    id: "press_schechter", name_zh: "Press–Schechter 质量函数", name_en: "Halo mass function", icon: "📊", section_id: "12.4.2", group: "sim",
    plain: R`晕的数密度：由线性场超过 $\delta_{\rm cr}$ 的概率算出，大质量端指数下降。`,
    explain: R`在 $R_L(M)$ 上平滑的线性场是 Gauss 的，超过 $\delta_{\rm cr}$ 的体积比例（乘以 2）就是坍缩进质量 $>M$ 的晕的质量比例 \eqref{12.70}。求导得 $dn/d\ln M=(\rho_{\rm m}/M)f(\nu)|d\ln\sigma/d\ln M|$，$\nu=\delta_{\rm cr}/\sigma$（\eqref{12.73}）。

因子 2 由偏移集理论解释（首次穿越）。实际的 $f(\nu)$ 由模拟拟合（Sheth–Tormen、Tinker），但"普适函数 $\times$ $\sigma(M,z)$"的形式在各红移与宇宙学下精确到约 5%。$\nu\gg1$ 时 $f\propto e^{-\nu^2/2}$：星系团丰度对 $\sigma_8$ 指数敏感。`,
    analogy: R`像统计海浪：浪高服从 Gauss 分布，超过堤坝（$\delta_{\rm cr}$）的巨浪数目随堤坝高度指数减少。`,
    book_example: { what: R`\figref{12.9}：Tinker et al. (2008) 的模拟质量函数与拟合。`, point: R`横跨五个数量级晕质量，$M\gtrsim10^{15}\,h^{-1}M_\odot$ 处急剧下降。` },
    misconception: R`拟合公式中的 $\delta_{\rm cr}$ 已不再直接代表球坍缩；它只是普适变量 $\nu$ 的标度。`,
  },
  {
    id: "cluster_counts", name_zh: "星系团计数与质量定标", name_en: "Cluster cosmology", icon: "🔭", section_id: "12.5", group: "obs",
    plain: R`数大质量星系团来约束 $\sigma(M)$；难点是找团与称质量。`,
    explain: R`星系团可用光学富度、X 射线（热气体温度与光度）、SZ 效应（$y\propto n_eT$，几乎不依赖距离）找到。位力定理给出 $T\propto M^{2/3}$：$1\,\mathrm{keV}$ 对应约 $1.4\times10^{14}\,h^{-1}M_\odot$（\eqref{12.76}）。

但星系团不均匀、未完全位力化、有冷却与反馈，所以要用弱引力透镜统计定标质量–观测量关系，并建模其弥散。由于质量函数陡降，弥散把更多低质量团"推"进样本（Malmquist 偏差）。`,
    analogy: R`像按身高筛选篮球运动员：身高测量有误差时，被误选进来的矮个子远多于被误刷掉的高个子，因为矮个子多得多。`,
    book_example: { what: R`\figref{12.10}：ROSAT、SPT、Planck、ACT 星系团的质量–红移分布。`, point: R`X 射线在低红移质量门槛更低，SZ 延伸到高红移。` },
    misconception: R`理论预言的是**固定质量**的丰度；观测按观测量挑选——两者之间的桥梁（质量–观测量关系及其弥散）才是主要系统误差。`,
  },
  {
    id: "bias", name_zh: "偏袒与峰–背景分离", name_en: "Bias & peak-background split", icon: "⚖️", section_id: "12.6", group: "obs",
    plain: R`长波长过密度降低坍缩门槛，稀有晕的数目因此放大：$b_1=(\nu^2-1)/\delta_{\rm cr}$。`,
    explain: R`大尺度扰动 $\delta_\ell$ 对小区域来说只是均匀地加了一点密度，坍缩判据变为 $\delta>\delta_{\rm cr}-\delta_\ell$（\eqref{12.77}）。代入质量函数展开到一阶，晕过密度 $=b_1\delta_\ell$，$b_1=-\sigma^{-1}d\ln f/d\nu$（\eqref{12.80}）。稀有峰对门槛极敏感，所以 $b_1\gg1$。

更高阶：阈值区域的关联 $=b_1^2\xi+\frac12b_2^2\xi^2+\cdots$，大尺度上高阶项小——线性偏袒成立。星系的二阶核还包含 $b_1F_2$ 与潮汐项 $b_{K^2}$。星系速度由等效原理保证在大尺度上无偏。`,
    analogy: R`涨潮时，原本差一点就露出水面的礁石大量冒出（被"偏袒"地看见），而潮位本身只涨了一点。`,
    book_example: { what: R`\figref{12.8}：红色长波长扰动把蓝色小尺度涨落抬过或压低于 $\delta_{\rm cr}$。`, point: R`$\delta_\ell>0$ 处有 3 个峰过阈值，$\delta_\ell<0$ 处没有。` },
    misconception: R`\eqref{12.81} 是相对**初始**场的拉格朗日偏袒；相对演化后物质场的欧拉偏袒是 $1+b_1$。`,
  },
  {
    id: "halo_model", name_zh: "晕模型", name_en: "Halo model", icon: "🧩", section_id: "12.7", group: "obs",
    plain: R`所有物质都在晕里：功率谱 = 二晕项（晕的成团）+ 一晕项（晕内部）。`,
    explain: R`假设每个粒子属于且仅属于一个晕，物质过密度就是晕过密度经归一化轮廓 $y$ 涂开、按质量函数加权的和（\eqref{12.97}）。需要的三样东西：质量函数、轮廓、晕的偏袒。

大尺度上二晕项 $\to P_{\rm L}$（要求偏袒一致性 $\int\frac{dn}{d\ln M}\frac{M}{\rho_{\rm m}}b_1=1$），小尺度上一晕项主导。它在很宽的尺度范围内精确到 25%，不够做精密宇宙学，却是理解非线性谱与新物理效应的好工具。`,
    analogy: R`像描述一片森林：大尺度看树丛如何分布（二晕），小尺度看单棵树的树冠形状（一晕）。`,
    book_example: { what: R`\figref{12.12}：$z=0$ 的晕模型功率谱及其与模拟之比。`, point: R`一晕项在大尺度趋于一个非物理的小常数。` },
    misconception: R`晕模型不是从运动方程推出的，而是经验性的拼装；它在大小尺度过渡区（$k\sim0.5\,h\,\mathrm{Mpc^{-1}}$）误差最大。`,
  },
];

export const relations = [
  { from: "sigma_w", to: "vlasov", label: "势小、密度大" },
  { from: "vlasov", to: "spt", label: "取矩" },
  { from: "vlasov", to: "nbody", label: "离散相空间" },
  { from: "shell_crossing", to: "spt", label: "流体失效" },
  { from: "shell_crossing", to: "nbody", label: "需要模拟" },
  { from: "nbody", to: "halo", label: "识别晕" },
  { from: "halo", to: "nfw", label: "内部结构" },
  { from: "spherical_collapse", to: "press_schechter", label: R`阈值 $\delta_{\rm cr}$` },
  { from: "sigma_w", to: "press_schechter", label: R`$\sigma(M)$` },
  { from: "press_schechter", to: "cluster_counts", label: "大质量端" },
  { from: "press_schechter", to: "bias", label: "峰–背景分离" },
  { from: "bias", to: "spt", label: "偏袒展开" },
  { from: "nfw", to: "halo_model", label: "轮廓 y" },
  { from: "press_schechter", to: "halo_model", label: "质量函数" },
  { from: "bias", to: "halo_model", label: "二晕项" },
];

export const TAKEAWAYS = [
  <TxI>{R`**哪里非线性**：$\sigma_W(R)$ 在 $R\lesssim6\,h^{-1}\mathrm{Mpc}$ 超过 1，但势处处 $\lesssim10^{-4}$。所以度规保持线性、引力用牛顿 Poisson 方程，物质用完全非线性的 Vlasov 方程 \eqref{12.8}。`}</TxI>,
  <TxI>{R`**微扰论**：冷流体方程迭代给出 $\delta^{(n)}\propto D_+^n\int F_n\delta_0^n$，$F_2=\frac57+\frac27\mu^2+\frac12\mu(r+1/r)$；单圈修正 $\sim\sigma^2_{R=1/k}$，在 $k_{\rm NL}$ 附近失效；被忽略的应力用 $-C_s^2k^2$ 的有效声速项补上。`}</TxI>,
  <TxI>{R`**模拟与晕**：N 体模拟用蛙跳积分相空间薄片的特征线；其中的晕按 $\Delta\rho_{\rm m}$ 定义质量，近似 NFW 轮廓。球坍缩给出与质量无关的 $\delta_{\rm cr}=1.686$ 与 $\Delta_{\rm vir}=18\pi^2$。`}</TxI>,
  <TxI>{R`**质量函数与星系团**：$dn/d\ln M=(\rho_{\rm m}/M)f(\nu)|d\ln\sigma/d\ln M|$，大质量端 $\propto e^{-\nu^2/2}$，对 $\sigma_8$ 指数敏感；星系团质量需靠位力温度、SZ、富度并以弱透镜定标，弥散导致 Malmquist 偏差。`}</TxI>,
  <TxI>{R`**偏袒**：峰–背景分离 $b_1=-\sigma^{-1}d\ln f/d\nu$，稀有晕偏袒大；大尺度上高阶偏袒是小修正，星系速度由等效原理保证无偏——这就是第 11 章两条假设的依据。晕模型把轮廓、质量函数、偏袒拼成 $P_{1{\rm h}}+P_{2{\rm h}}$。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`为什么在密度涨落 $\delta\gg1$ 的小尺度上，仍然可以把度规扰动只保留到线性阶？`,
    options: [R`因为小尺度上暗能量主导`, R`因为 $\Psi\propto\delta/k^2$，小尺度上势被 $(aH/k)^2$ 强烈压低，处处只有 $\sim10^{-5}$`, R`因为非线性只出现在视界外`, R`因为重子压强抵消了引力`],
    answer: 1, why: R`由 Poisson 方程 \eqref{12.5}，$|\Psi|\sim\frac32\Omega_{\rm m}(aH/k)^2\delta$；\figref{12.1} 中势的 RMS 在所有尺度都约 $0.5\times10^{-4}$。`,
  },
  {
    q: R`标准微扰论中 $\delta^{(2)}$ 为什么正比于 $D_+^2$？`,
    options: [R`因为二阶源项是两个线性场的乘积 $\propto D_+^2$，且在 $\Omega_{\rm m}/f^2\approx1$ 下方程只通过源项显含时间`, "因为功率谱是二次的", R`因为 $D_+\propto a$ 恒成立`, "这是一个任意的约定"],
    answer: 0, why: R`\eqref{12.33}–\eqref{12.36}：令 $\Omega_{\rm m}/f^2=1$ 后左边系数为常数，幂律试探解要求 $n=2$。`,
  },
  {
    q: R`为什么流体描述在小尺度上必然失效？`,
    options: ["因为暗物质会碰撞", R`因为壳层交叉后同一点有多个速度，流体只能有一个速度场，应力张量与高阶矩都变得重要`, "因为数值误差", R`因为 $F_2$ 发散`],
    answer: 1, why: R`\figref{12.5}：多流阶段分布函数在速度空间有多个峰；流体会产生激波，而无碰撞物质会彼此穿过。`,
  },
  {
    q: R`球坍缩阈值 $\delta_{\rm cr}=1.686$ 指的是什么量达到这个值？`,
    options: ["坍缩时真实的非线性过密度", R`把初始过密度按**线性**增长因子外推到坍缩时刻的值`, "转向时的非线性过密度", "位力化后的密度对比"],
    answer: 1, why: R`坍缩时真实密度发散；线性外推值才是能与线性密度场统计（$\sigma(M)$）直接比较的量。转向时 $1+\delta_{\rm NL}=5.55$，位力化后 $\Delta_{\rm vir}\approx178$。`,
  },
  {
    q: R`若 $\sigma_8$ 增大 10%，$10^{15}\,h^{-1}M_\odot$（$\nu\approx3$）星系团的数目大致怎样变化？`,
    options: ["几乎不变", "增加约 10%", "增加约 20%", R`约增加一倍（指数敏感）`],
    answer: 3, why: R`$f\propto\nu e^{-\nu^2/2}$；$\nu$ 从 3 降到 2.73，$e^{-\nu^2/2}$ 增大约 $e^{0.78}\approx2.2$ 倍，再乘以 $\nu$ 因子 0.91，总计约 2 倍。这就是星系团计数对 $\sigma_8$ 敏感的原因。`,
  },
  {
    q: R`峰–背景分离中，为什么大质量晕的偏袒 $b_1\gg1$？`,
    options: ["因为它们的引力更强，吸引更多物质", R`因为它们是稀有的高峰（$\nu\gg1$），Gauss 尾部对阈值的微小移动 $\delta_\ell$ 极其敏感`, "因为它们形成得更早", "因为它们的速度有偏"],
    answer: 1, why: R`$b_1=-\sigma^{-1}d\ln f/d\nu\approx\nu^2/\delta_{\rm cr}$；\figref{12.8} 中一点点 $\delta_\ell$ 就决定了 3 个还是 0 个峰过阈值。`,
  },
];

export const BRIDGE = R`本章最后反复出现一个主题：要把星系团计数、星系成团变成宇宙学约束，我们需要**直接测量质量**，而不是只看发光的示踪体。下一章的引力透镜正是这样的工具：光线被沿途所有物质（不论暗与明）偏折，弱透镜的统计信号直接探测投影的物质功率谱——包括本章讨论的非线性部分与重子反馈的影响——也为星系团的质量–观测量关系提供定标。本章的 Poisson 方程 \eqref{12.5}、非线性功率谱与晕模型将是那里的主要输入。`;
