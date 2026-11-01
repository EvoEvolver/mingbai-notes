// 第 5 章（上）高层理解层：开场、路线图、推导图、核心概念、小结与自测。
const R = String.raw;

export const HOOK_TITLE = "用 193 nm 的光，印出 20 nm 的线";
export const HOOK = R`拿一支笔尖 2 mm 粗的马克笔，在纸上画出 0.2 mm 宽、间距同样 0.2 mm 的一排细线——听起来不可能。可今天的芯片厂天天在做同样的事：用波长 193 nm 的深紫外光，印出半周期二三十纳米的线条，而且一片 300 mm 晶圆上的几百亿条线，宽度误差都要控制在一两纳米之内、层与层之间的对准误差也只有一两纳米，每小时还要处理两百多片。最新的一步干脆把波长缩短 14 倍，换成 13.5 nm 的极紫外光——为此整台机器要在真空里工作、所有透镜换成反射镜、光源要用激光去轰击飞行中的锡液滴，一台机器的售价超过一亿美元。

为什么印小图形这么难？答案是**衍射**：光穿过和波长差不多大的掩模开口后会向四面散开，携带图形细节的那部分光散得最远，镜头接不住，像就糊了。本章上篇要建立的，就是围绕这一事实的整套"估算语言"——分辨率 $R=k_1\lambda/\mathrm{NA}$、焦深 $\pm k_2\lambda/\mathrm{NA}^2$、空间像的调制度 MTF、照明的相干因子 $\sigma$，以及光刻胶如何用高对比度 $\gamma$ 和化学放大把一幅"灰蒙蒙"的空间像变成边缘陡直的胶图形。`;

export const ROADMAP = [
  { sec: "5.1", title: "五项指标", gist: R`分辨率、视场、套刻、产能、缺陷——光刻为什么最贵、最难；CD 控制用 $3\sigma$ 表示。`, gives: [], next: R`先认识完成这五项任务的机器与材料。` },
  { sec: "5.2", title: "光刻链条与空间像", gist: R`CAD → 写掩模 → 投影曝光；以空间像为界，分成光源、曝光系统、光刻胶三部分。步进机与扫描机（掩模台快 4 倍）。`, gives: [], next: R`三部分逐一看，先看光源。` },
  { sec: "5.2.1", title: "光源：从汞灯到 EUV", gist: R`g/i 线汞灯 → KrF/ArF 准分子激光 → 13.5 nm 锡等离子体；$E=hc/\lambda$，EUV 光子 92 eV，几乎被一切材料吸收。`, gives: ["5.1"], next: R`光要穿过（或被反射自）掩模。` },
  { sec: "5.2.2", title: "掩模与保护膜", gist: R`石英 + 铬的 4 倍掩模；保护膜让灰尘离焦；EUV 掩模是 Mo/Si Bragg 反射镜。`, gives: [], next: R`掩模怎样成像到晶圆上？` },
  { sec: "5.2.3", title: "接触、接近、投影与直写", gist: R`三类曝光方式的取舍；直写是串行的，$t=$ 剂量乘面积、再除以束流。`, gives: ["5.2"], next: R`最后一部分：接收空间像的光刻胶。` },
  { sec: "5.2.4", title: "三代光刻胶化学", gist: R`DNQ/novolac（溶解抑制、Wolff 重排）→ DUV 化学放大（PAG 产酸、PEB 催化去保护）→ EUV（光电子、散粒噪声）。`, gives: [], next: R`现在回到光学：衍射到底怎样限制分辨率？` },
  { sec: "5.3", title: "衍射、Rayleigh 判据与 NA", gist: R`惠更斯子波 → Airy 斑 $1.22\lambda f/d$ → $R=0.61\lambda/\mathrm{NA}=k_1\lambda/\mathrm{NA}$；接近式受近场限制 $W_{\min}\approx\sqrt{\lambda g}$。`, gives: ["5.3", "5.4", "5.5", "5.6", "5.7", "5.8"], next: R`提高 NA 的代价是什么？` },
  { sec: "5.3", title: R`焦深、MTF 与 $\sigma$`, gist: R`$\lambda/4$ 光程差判据给出 $\mathrm{DOF}=\pm k_2\lambda/\mathrm{NA}^2$；MTF 衡量空间像对比度；部分相干 $\sigma=S/d$ 可改善小图形成像。`, gives: ["5.9", "5.12", "5.13", "5.14"], next: R`空间像是"灰"的——胶如何把它变成陡边？` },
  { sec: "5.4", title: "对比度、CMTF 与胶工艺流程", gist: R`$\gamma=1/\log_{10}(Q_f/Q_0)$，$\mathrm{CMTF}=(10^{1/\gamma}-1)/(10^{1/\gamma}+1)<\mathrm{MTF}$；清洗、HMDS、旋涂、前烘、曝光、PEB、显影、坚膜。`, gives: ["5.15", "5.16"] },
];

export const EQMAP = [
  { from: "5.3", to: "5.6", label: "Rayleigh 判据：峰落在邻点第一暗环" },
  { from: "5.7", to: "5.8", label: R`代入 $\mathrm{NA}=n\sin\alpha$` },
  { from: "5.6", to: "5.8", label: R`$0.61\to k_1$` },
  { from: "5.1", to: "5.8", label: R`短 $\lambda$ = 高能光子` },
  { from: "5.9", to: "5.10", label: R`$\cos\alpha\approx1-\alpha^2/2$` },
  { from: "5.10", to: "5.12", label: R`解出 $\delta$` },
  { from: "5.11", to: "5.12", label: R`$\alpha\approx\mathrm{NA}$` },
  { from: "5.7", to: "5.11", label: R`$n=1$，小角` },
  { from: "5.8", to: "5.12", label: R`$\mathrm{DOF}=(k_2/k_1^2)R^2/\lambda$` },
  { from: "5.4", to: "5.5", label: R`Fresnel 数 $N_F\sim1$` },
  { from: "5.14", to: "5.13", label: R`$\sigma$ 改变像的 MTF` },
  { from: "5.8", to: "5.13", label: R`$k_1$ 越小，MTF 越低` },
  { from: "5.15", to: "5.16", label: R`$Q_f/Q_0=10^{1/\gamma}$` },
  { from: "5.13", to: "5.16", label: R`成像条件 $\mathrm{CMTF}<\mathrm{MTF}$` },
];
export const EQMAP_LABELS = {
  "5.1": "光子能量", "5.3": "Airy 斑半径", "5.4": "Fresnel 适用区间", "5.5": "接近式分辨率", "5.6": "Rayleigh 分辨率", "5.7": "数值孔径", "5.8": R`$R=k_1\lambda/\mathrm{NA}$`,
  "5.9": R`$\lambda/4$ 光程差判据`, "5.10": "小角展开", "5.11": R`$\alpha\approx\mathrm{NA}$`, "5.12": "焦深", "5.13": "MTF", "5.14": R`部分相干 $\sigma$`, "5.15": R`对比度 $\gamma$`, "5.16": "CMTF",
};

export const groups = [
  { id: "sys", label: "光刻系统" },
  { id: "optics", label: "成像光学" },
  { id: "resist", label: "光刻胶" },
];

export const concepts = [
  {
    id: "aerial", name_zh: "空间像与潜像", name_en: "Aerial image & latent image", icon: "🖼️", section_id: "5.2", group: "sys",
    plain: "曝光系统交给光刻胶的\"光强图样\"叫空间像；胶内记下的三维化学图样叫潜像。",
    explain: R`空间像是落在胶**表面**的光强分布 $I(x,y)$，由光源、掩模和镜头决定，与胶无关；它是曝光机与胶之间的分界线。曝光机的任务是让空间像尽可能"好"（分辨率、焦深、均匀性、对比度）。

潜像是光在胶层**内部**引起的化学变化的三维分布（DNQ 胶中是羧酸浓度，化学放大胶中先是酸浓度、PEB 后是去保护程度）。显影把潜像变成实物胶图形。`,
    analogy: "空间像像投影仪打在墙上的画面，潜像像胶片被曝光后尚未冲洗的银盐图像。",
    book_example: { what: R`图 5.3：接触孔一层，光子在胶表面形成二维空间像、在胶内形成三维潜像。`, point: "光学问题和化学问题在空间像处分开，可以分别优化。" },
    misconception: "空间像不是掩模图形的缩小复制品——衍射使它总是\"灰\"的，边缘有坡度，小图形甚至会消失。",
  },
  {
    id: "photon", name_zh: "曝光波长与光子能量", name_en: "Exposure wavelength & photon energy", icon: "💡", section_id: "5.2.1", group: "sys",
    plain: R`波长越短分辨率越高，但光子能量 $E=1.24/\lambda(\mu\mathrm m)$ 越高，越难产生、越容易被材料吸收。`,
    explain: R`光刻波长依次是 g 线 436、i 线 365（汞灯）、KrF 248、ArF 193（准分子激光）、EUV 13.5 nm（锡等离子体）。对应光子能量 2.8、3.4、5.0、6.4、92 eV。

能量决定光与物质的作用方式：3–6 eV 的光子能激发电子或断键（DNQ 中脱 $\mathrm{N_2}$、PAG 产酸）；92 eV 的 EUV 光子把电子整个打出分子，产生二次电子级联。能量太高也意味着几乎所有材料都吸收它，于是 EUV 只能用反射镜、真空和薄胶。`,
    analogy: "换更细的笔尖可以画更细的线，但更细的笔尖更难造、也更容易把纸戳破。",
    book_example: { what: R`式 (5.1)；图 5.4 中的阶梯线；157 nm 因掩模/镜头材料不透明而夭折。`, point: "193 nm 被\"卡住\"二十年，直到换成全反射的 EUV。" },
    misconception: "更短的波长并不自动更好——同样的剂量下 EUV 光子数少 14 倍，散粒噪声更严重。",
  },
  {
    id: "mask", name_zh: "掩模与保护膜", name_en: "Mask (reticle) & pellicle", icon: "🪟", section_id: "5.2.2", group: "sys",
    plain: "掩模是石英上的铬图形（通常放大 4 倍）；保护膜是隔开一段距离的透明防尘膜。",
    explain: R`DUV 掩模：熔融石英 + 约 80 nm 铬，电子束或激光写入、刻蚀而成，图形是晶圆上的 4 倍，便于制造和检查。掩模缺陷会印在每一片晶圆上，所以要比对检查、修补，再绷上保护膜——落在膜上的灰尘离焦，印不出来。

EUV 掩模是反射式：40–50 对 Mo/Si 多层膜构成 Bragg 反射镜（周期约 $\lambda/2=6.8$ nm），上面是 TaBN 吸收层图形。EUV 保护膜只能用约 50 nm 厚的膜，工作时可被加热到上千度。`,
    analogy: "保护膜像相机镜头前的 UV 镜：上面落点灰不会出现在照片里，因为它离焦太远。",
    book_example: { what: R`图 5.5（12 个相同电路的掩模与保护膜）、图 5.6（EUV 多层膜掩模）。`, point: "掩模上只有几个电路时，一粒灰尘就能让良率掉 25%。" },
    misconception: "4 倍掩模并不意味着掩模的绝对精度可以放松 4 倍——套刻与 CD 误差经缩小后仍要达到纳米级。",
  },
  {
    id: "exposure_modes", name_zh: "接触、接近与投影曝光", name_en: "Contact / proximity / projection", icon: "🔦", section_id: "5.2.3", group: "sys",
    plain: "掩模贴着胶（接触）、隔一点缝（接近）、还是用镜头成像（投影）——分辨率、缺陷和成本的三方取舍。",
    explain: R`接触式分辨率高、便宜，但硬接触带来缺陷；接近式无接触，但近场衍射使分辨率只有 $W_{\min}\approx\sqrt{\lambda g}$（几 µm）；投影式用镜头收集远场衍射，分辨率 $k_1\lambda/\mathrm{NA}$，无接触缺陷，但机器极贵。

投影式之外还有串行的直写：电子束或 DMD 激光逐点写，灵活但慢，写满一片晶圆要以天计。`,
    analogy: "盖章（接触）最清楚但会弄脏印章；隔空喷漆（接近）边缘模糊；用投影仪（投影）既清楚又不碰纸，但投影仪很贵。",
    book_example: { what: R`图 5.7 与图 5.27：同一开口在三种方式下的空间像；接近式还有 Fresnel"振铃"。`, point: "量产几乎只用投影式。" },
    misconception: "接近式的间隙并不是越小越好就够——间隙小于波长时 Fresnel 近似失效，接触又会带来缺陷。",
  },
  {
    id: "scanner", name_zh: "步进机与扫描机", name_en: "Stepper & step-and-scan", icon: "🎞️", section_id: "5.2", group: "sys",
    plain: "一次只曝光一个场，然后\"步进\"到下一场；扫描机还让掩模和晶圆在一条光缝下反向同步扫描。",
    explain: R`缩小投影镜头的视场只有几厘米，所以要逐场曝光。扫描机只照亮一条窄缝，掩模台以 4 倍速度、晶圆台以 1 倍速度反向运动，扫描方向上的场长可达 33 mm（标准最大场 26 mm × 33 mm）。

窄缝只需要镜头视场中心一小条区域像差极小，这比让整个大方视场都完美容易得多；代价是两个工件台的同步精度要达到纳米级。`,
    analogy: "复印机的扫描头：一条光带扫过整页，而不是一次照亮整页。",
    book_example: { what: R`§5.2 正文；图 5.2、5.9 中的掩模台与晶圆台。`, point: "\"掩模扫得比晶圆快 4 倍\"正是 4 倍缩小的直接后果。" },
    misconception: "扫描机的掩模与晶圆不是同向运动——实像倒立，二者方向相反。",
  },
  {
    id: "diffraction", name_zh: "衍射与空间频率", name_en: "Diffraction & spatial frequency", icon: "🌊", section_id: "5.3", group: "optics",
    plain: "光穿过小开口后会散开；越细的图形细节散得越远，镜头接不住就丢了。",
    explain: R`按惠更斯–菲涅耳原理，开口内每一点都是子波源，子波叠加就是衍射图样。对周期 $p$ 的图形，衍射光只沿 $\sin\theta_m=m\lambda/p$ 的离散方向传播，每个衍射级对应掩模的一个空间频率分量。

镜头只接收 $|\sin\theta|\le\mathrm{NA}$ 的级次——它是一个空间低通滤波器。丢掉高级次，拐角变圆；连 $\pm1$ 级都丢掉，图形就完全消失。`,
    analogy: "像用低音炮放音乐：高频（细节）被滤掉，只剩下低沉的轮廓。",
    book_example: { what: R`图 5.17–5.19；本页图 5.19 交互版可以看到收集的级次越少像越\"圆\"。`, point: "分辨率问题本质上是\"收集了多少衍射光\"的问题。" },
    misconception: "\"空间频率\"不是光的频率——光是单色的，变化的是图形在空间上的疏密。",
  },
  {
    id: "rayleigh", name_zh: "Rayleigh 分辨率与数值孔径", name_en: "Rayleigh resolution & NA", icon: "🔍", section_id: "5.3", group: "optics",
    plain: R`$R=k_1\lambda/\mathrm{NA}$：缩短波长、加大数值孔径、降低工艺因子 $k_1$，是提高分辨率仅有的三条路。`,
    explain: R`一个点的像是 Airy 斑，第一暗环半径 $1.22\lambda f/d=0.61\lambda/\mathrm{NA}$。Rayleigh 把"一个点像的峰落在另一个的第一暗环上"定义为刚好可分辨，两峰之间的谷约为峰值的 73.5%。

$\mathrm{NA}=n\sin\alpha$ 衡量镜头的收光角；干式上限约 0.93，水浸没（$n=1.44$）可到 1.35。$k_1$ 吸收了胶、形貌、离焦等一切实际因素：简单光刻 0.6–0.8，分辨率增强后可低于 0.3。`,
    analogy: "要分清远处两盏车灯，需要大口径的望远镜（大 NA）或更\"细\"的光（短波长）。",
    book_example: { what: R`式 (5.6)–(5.8)；例题：193 nm、NA 0.6、$k_1=0.75$ 时 $R=241$ nm，EUV 为 16.9 nm。`, point: "亚波长光刻靠的就是不断压低 $k_1$ 和抬高 NA。" },
    misconception: "Rayleigh 判据不是物理定律，而是一个约定；真实的极限由空间像对比度与胶的 CMTF 共同决定。",
  },
  {
    id: "dof", name_zh: "焦深", name_en: "Depth of focus", icon: "🎯", section_id: "5.3", group: "optics",
    plain: R`像只在像面附近 $\pm k_2\lambda/\mathrm{NA}^2$ 的范围内保持清晰；NA 越大，这个范围缩得越快。`,
    explain: R`离焦 $\delta$ 使透镜边缘光线与轴上光线产生光程差 $\delta(1-\cos\alpha)\approx\delta\,\mathrm{NA}^2/2$；Rayleigh 要求它不超过 $\lambda/4$，得到 $\mathrm{DOF}=\pm\lambda/2\mathrm{NA}^2$。

与 $R\propto\lambda/\mathrm{NA}$ 合起来：$\mathrm{DOF}=(k_2/k_1^2)R^2/\lambda$。固定波长时，分辨率翻倍，焦深降到 1/4；胶的厚度、晶圆平整度（CMP）、调焦精度都得跟着收紧。`,
    analogy: "相机光圈开大（大 NA）背景就虚化得厉害——景深变浅。",
    book_example: { what: R`式 (5.9)–(5.12)；例题中 193 nm 焦深 $\pm268$ nm，EUV 仅 $\pm18.75$ nm（原书误印 $\pm9.4$）。`, point: "EUV 必须用很薄的胶和硬掩模。" },
    misconception: R`焦深不是胶的厚度本身；但胶厚必须小于焦深，否则胶的上下表面不可能同时在焦。`,
  },
  {
    id: "mtf", name_zh: "调制传递函数（MTF）", name_en: "Modulation transfer function", icon: "📉", section_id: "5.3", group: "optics",
    plain: R`空间像的对比度：$(I_{\max}-I_{\min})/(I_{\max}+I_{\min})$，大图形接近 1，小图形趋于 0。`,
    explain: R`掩模出射光几乎是理想的黑白方波（MTF ≈ 1），经过镜头后高空间频率被削弱，空间像的 MTF 下降；图形越小、离焦越大，MTF 越低。一般需要 MTF ≥ 0.5 胶才能正确成像，高对比度的化学放大胶可以更低。

严格意义的 MTF 只对相干（或非相干）线性成像定义，部分相干照明下我们用式 (5.13) 的"调制度"作实用度量。`,
    analogy: "复印件的复印件：每复印一次，黑字更灰、白底更暗，对比度下降。",
    book_example: { what: R`式 (5.13)、图 5.25：掩模处 $\mathrm{MTF}\approx1$，晶圆上约 0.6。`, point: "MTF 是连接光学（曝光机）与化学（胶）的那个数。" },
    misconception: "MTF 低不一定印不出来——只要胶的 CMTF 更低就行。",
  },
  {
    id: "sigma", name_zh: R`部分相干因子 $\sigma$`, name_en: "Partial coherence factor", icon: "🌗", section_id: "5.3", group: "optics",
    plain: R`$\sigma=S/d$：光源越大，照到掩模上的光方向越分散；适度的 $\sigma$（0.5–0.7）反而改善小图形成像。`,
    explain: R`$\sigma=0$ 时所有光以同一方向照射掩模，衍射级固定；$\pm1$ 级一旦出了透镜孔径，小图形就彻底消失（截止在半周期 $0.5\lambda/\mathrm{NA}$）。

$\sigma>0$ 时照明方向分散，衍射级跟着平移，一部分照明方向能把 $+1$ 或 $-1$ 级"带进"孔径，截止推到 $0.5\lambda/[(1+\sigma)\mathrm{NA}]$。再者 $\sigma\to0$ 时光强趋于零，曝光时间趋于无穷。代价是大图形的对比度略降。`,
    analogy: "从多个角度打光拍浮雕，比只用一盏正面灯更能看清细小的纹路。",
    book_example: { what: R`式 (5.14)、图 5.26；本页 MTF 曲线图对比 $\sigma=0,0.3,0.6,0.9$。`, point: "这是离轴照明等分辨率增强技术的起点。" },
    misconception: R`$\sigma$ 越大越好？不是——过大的 $\sigma$ 降低大图形的对比度，并使不同尺寸图形的成像差异变大。`,
  },
  {
    id: "contrast", name_zh: R`光刻胶对比度 $\gamma$ 与 CMTF`, name_en: "Resist contrast & CMTF", icon: "⚖️", section_id: "5.4", group: "resist",
    plain: R`$\gamma=1/\log_{10}(Q_f/Q_0)$：胶从"不溶"到"全溶"所需剂量跨度越小，越能把灰色的空间像变成陡边。`,
    explain: R`对比度曲线：剩余胶厚对 $\log_{10}$ 剂量，陡峭段斜率即 $\gamma$。g/i 线 DNQ 胶 2–3，化学放大胶 5–10。

把 $Q_f$、$Q_0$ 代入 MTF 的定义得到胶的临界 MTF：$\mathrm{CMTF}=(10^{1/\gamma}-1)/(10^{1/\gamma}+1)$，即胶能分辨图形所需的最小空间像对比度。成像条件 $\mathrm{CMTF}<\mathrm{MTF}$。$\gamma$ 不是材料常数，随显影、烘烤、波长、衬底而变。`,
    analogy: "像一个阈值很\"硬\"的开关：灯光稍亮就全开、稍暗就全关，再模糊的灯光也能被它变成清楚的明暗两区。",
    book_example: { what: R`式 (5.15)、(5.16)；图 5.28、5.29。g/i 线胶 $\mathrm{CMTF}\approx0.4$，DUV 胶 0.1–0.2。`, point: "高对比度的胶能\"锐化\"较差的空间像。" },
    misconception: "对比度高并不等于灵敏度高——前者是曲线的陡度，后者是曲线的位置（$Q_f$）。",
  },
  {
    id: "car", name_zh: "化学放大光刻胶", name_en: "Chemically amplified resist", icon: "⚗️", section_id: "5.2.4", group: "resist",
    plain: "一个光子产生一个酸，一个酸在后烘中催化几十到几百次去保护反应——灵敏度和对比度同时提高。",
    explain: R`DNQ 胶的量子效率约 0.3，每个光子至多改变一个分子。化学放大胶（CAR）中光子使 PAG 产生 $\mathrm{H^+}$，曝光后烘（PEB）时酸扩散、切掉 PHS 上的 t-BOC 等保护基并再生，总量子效率远大于 1，所需剂量从约 100 降到 20–40 $\mathrm{mJ\,cm^{-2}}$。

代价是对 PEB 温度、时间以及环境中碱性污染极其敏感（反应与扩散随温度指数变化），酸扩散也会模糊潜像。EUV 胶同样是 CAR，但产酸靠 92 eV 光子打出的光电子与二次电子。`,
    analogy: "一根火柴点燃整片干草——光子只负责\"点火\"，后烘时的链式反应完成大部分工作。",
    book_example: { what: R`图 5.13–5.15：三苯基锍盐产生 $\mathrm{CF_3COOH}$，$\mathrm{H^+}$ 切掉 t-BOC 并放出异丁烯与 $\mathrm{CO_2}$。`, point: "酸在反应中守恒——这就是\"催化\"与\"放大\"。" },
    misconception: "化学放大胶的曝光并不在光照时完成，而是在 PEB 中完成；PEB 才是真正的\"曝光\"关键步。",
  },
];
export const relations = [
  { from: "photon", to: "rayleigh", label: R`$\lambda$` },
  { from: "diffraction", to: "rayleigh", label: "收集衍射级" },
  { from: "rayleigh", to: "dof", label: "NA 的代价" },
  { from: "diffraction", to: "mtf", label: "高频丢失" },
  { from: "sigma", to: "mtf", label: "改变截止" },
  { from: "mtf", to: "contrast", label: "CMTF < MTF" },
  { from: "car", to: "contrast", label: R`提高 $\gamma$` },
  { from: "aerial", to: "mtf", label: "度量" },
  { from: "exposure_modes", to: "diffraction", label: "近场 / 远场" },
  { from: "scanner", to: "exposure_modes", label: "投影式的实现" },
  { from: "mask", to: "aerial", label: "物" },
];

export const TAKEAWAYS = [
  R`光刻要同时满足分辨率、视场、套刻、产能、缺陷五项指标；空间像把问题分成"曝光系统"与"光刻胶"两半。`,
  R`光源从 g/i 线汞灯、KrF/ArF 准分子激光走到 13.5 nm 锡等离子体；$E=1.2398/\lambda(\mu\mathrm m)$ eV，EUV 光子 92 eV，迫使系统改用反射镜、真空和薄胶。`,
  R`接触式分辨率高但有缺陷，接近式受近场衍射限制 $W_{\min}\approx\sqrt{\lambda g}$，量产几乎只用 4 倍缩小的投影式（步进 / 扫描）；直写是串行的，$t=$ 剂量乘面积、再除以束流。`,
  R`衍射把图形细节散到大角度；透镜只收 $|\sin\theta|\le\mathrm{NA}$ 的部分。Rayleigh 判据给出 $R=0.61\lambda/\mathrm{NA}\to k_1\lambda/\mathrm{NA}$。`,
  R`$\lambda/4$ 光程差判据给出 $\mathrm{DOF}=\pm k_2\lambda/\mathrm{NA}^2$；分辨率与焦深此消彼长，$\mathrm{DOF}=(k_2/k_1^2)R^2/\lambda$。原书例题 EUV 焦深应为 $\pm18.75$ nm。`,
  R`MTF $=(I_{\rm MAX}-I_{\rm MIN})/(I_{\rm MAX}+I_{\rm MIN})$ 衡量空间像对比度；部分相干 $\sigma=S/d$（常用 0.5–0.7）把小图形的截止推到 $0.5/(1+\sigma)$。`,
  R`胶的对比度 $\gamma=1/\log_{10}(Q_f/Q_0)$ 与 $\mathrm{CMTF}=(10^{1/\gamma}-1)/(10^{1/\gamma}+1)$；能成像的条件是 $\mathrm{CMTF}<\mathrm{MTF}$。化学放大让 DUV 胶 $\gamma=5\text{–}10$、剂量 20–40 $\mathrm{mJ\,cm^{-2}}$。`,
  R`胶工艺：清洗脱水 → HMDS → 旋涂 → 前烘 → 曝光 → PEB（CA 胶的关键步）→ 显影 → 坚膜，通常在与光刻机联机的轨道设备中完成。`,
];

export const QUIZ = [
  {
    q: R`一台 ArF 干式光刻机 $\mathrm{NA}=0.93$，工艺 $k_1=0.35$。不改光源，改成水浸没、$\mathrm{NA}=1.35$，分辨率与焦深（$k_2$ 不变）各变为原来的多少倍？`,
    options: [R`分辨率提高到 1.45 倍（$R$ 变为 0.69 倍），焦深变为 0.47 倍`, R`分辨率与焦深都提高 1.45 倍`, R`分辨率不变，焦深变为 0.69 倍`, R`$R$ 变为 0.69 倍，焦深不变`],
    answer: 0,
    why: R`$R\propto1/\mathrm{NA}$：$0.93/1.35=0.69$；$\mathrm{DOF}\propto1/\mathrm{NA}^2$：$0.69^2=0.47$。（严格说浸没时焦深还要乘以介质折射率等因子，但按式 5.12 的估算如此。）`,
  },
  {
    q: R`接近式光刻机用 i 线（365 nm），要印 1 µm 的图形，间隙最大约为多少？`,
    options: [R`约 27 µm`, R`约 2.7 µm`, R`约 0.37 µm`, R`约 270 µm`],
    answer: 1,
    why: R`$W_{\min}\approx\sqrt{\lambda g}$ ⇒ $g\approx W^2/\lambda=(1\,\mu\mathrm m)^2/0.365\,\mu\mathrm m\approx2.7\,\mu\mathrm m$。这已接近"接触"——难怪接近式只用于几微米的图形。`,
  },
  {
    q: R`为什么光刻机不用理想相干光源（$\sigma=0$）？`,
    options: [R`相干光会损伤光刻胶`, R`相干光的波长更长`, R`光强趋于零，且部分相干能把本会落在孔径外的衍射级部分收进来，改善小图形成像`, R`相干光无法通过石英掩模`],
    answer: 2,
    why: R`这是原书给出的两条理由。在本页 MTF 曲线图上，$\sigma=0$ 在 $k_1=0.5$ 处一刀截止，$\sigma=0.6$ 可以延伸到约 0.31。`,
  },
  {
    q: R`某胶 $Q_0=40$、$Q_f=100\,\mathrm{mJ\,cm^{-2}}$。它的对比度与 CMTF 约为？`,
    options: [R`$\gamma\approx0.4$，CMTF $\approx0.43$`, R`$\gamma\approx2.5$，CMTF $\approx0.43$`, R`$\gamma\approx2.5$，CMTF $\approx0.6$`, R`$\gamma\approx60$，CMTF $\approx0.01$`],
    answer: 1,
    why: R`$\gamma=1/\log_{10}2.5=2.51$；$\mathrm{CMTF}=(100-40)/(100+40)=0.43$——典型的 g/i 线胶水平。`,
  },
  {
    q: R`化学放大胶真正完成"曝光"化学反应的是哪一步？`,
    options: [R`前烘`, R`显影`, R`坚膜`, R`曝光后烘（PEB）`],
    answer: 3,
    why: R`光照只让 PAG 产生酸（潜酸像）；PEB 中酸扩散并催化去保护，所以 PEB 温度必须极严格地控制。`,
  },
  {
    q: R`EUV 掩模为什么是反射式的？`,
    options: [R`为了把掩模放大 4 倍`, R`反射式掩模更便宜`, R`几乎所有材料都强烈吸收 13.5 nm 光子，做不出透射式掩模与透镜`, R`为了消除衍射`],
    answer: 2,
    why: R`92 eV 的光子几乎被一切材料吸收，只能用 Mo/Si 多层膜 Bragg 反射；连保护膜也只能做到约 50 nm 厚。`,
  },
];

export const BRIDGE = R`本篇用"半定性"的方式建立了光刻的估算语言。下篇（§5.5 起）把它们变成真正的模型：用 Fraunhofer 与部分相干成像理论计算空间像，用 Dill 等模型描述胶的曝光、PEB 与显影，然后讨论把 $k_1$ 一路压到 0.3 以下的分辨率增强技术——光学邻近校正（OPC）、相移掩模、离轴照明、浸没式、多重图形——以及 EUV 与纳米压印。本篇的 $R=k_1\lambda/\mathrm{NA}$、$\mathrm{DOF}=\pm k_2\lambda/\mathrm{NA}^2$、MTF、$\sigma$ 和 $\mathrm{CMTF}<\mathrm{MTF}$ 将在那里反复出现。`;
