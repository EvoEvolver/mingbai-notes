// 第 5 章（下）高层理解层：开场、路线图、推导图、核心概念、小结与自测。
const R = String.raw;

export const HOOK_TITLE = "用 193 nm 的光，怎么印出 20 nm 的线？";
export const HOOK = R`2005 年前后，最先进的光刻机用的是 193 nm 的 ArF 激光，数值孔径 0.93。按照 Rayleigh 判据，它的极限分辨率大约是 $0.5\lambda/\mathrm{NA}\approx100$ nm。可是此后十几年，同一个波长的光刻机一路把芯片推进到"14 nm""10 nm""7 nm"工艺，金属层最小节距做到了 40 nm 左右——线宽只有波长的十分之一。光的波长没变，物理定律也没变，变的是什么？

答案出人意料：**掩模不必长得像你想印的图形。**只要我们能在电脑里精确算出"一块掩模经过镜头之后会在胶里留下什么"，就可以反过来设计掩模、光源、甚至把一层图形拆成两三次曝光。本章（第 5 章的下半部分）先建立这套计算工具——用傅里叶光学算空间像、用 Dill 化学动力学算胶里的潜像和显影轮廓——再用它解释 OPC、移相掩模、离轴照明、浸没、多重图形化这些"花招"为什么有效，最后看看完全绕开光学的纳米压印。`;

export const ROADMAP = [
  { sec: "5.5", title: "曝光系统建模：算出空间像", gist: R`掩模后的光场在远处就是掩模的**傅里叶变换**；物镜只收下 $|f|<\mathrm{NA}/\lambda$ 的频率（光瞳），再做逆变换得到像面光强 $I_{\rm i}=|\mathcal F^{-1}\{\mathcal F\{t\}P\}|^2$。斜入射与部分相干靠平移频谱、强度叠加处理；接近式曝光则用 Fresnel 积分。`, gives: ["5.21", "5.25", "5.27", "5.28", "5.31", "5.32"], next: R`空间像只是胶面上的光强；光进了胶之后会怎样被吸收、怎样改变胶的化学？` },
  { sec: "5.6", title: "光刻胶建模：潜像、PEB 与显影", gist: R`Lambert 吸收 + 漂白：$\alpha=Am+B$，$dm/dt=-CIm$（Dill A、B、C）；CAR 中光产酸 $[\mathrm H]$ 在 PEB 中催化去保护；PEB 的扩散抹平驻波；显影速率 $R(m)$ 把潜像变成三维胶轮廓。`, gives: ["5.40", "5.43", "5.44", "5.45", "5.51", "5.53", "5.55", "5.57"], next: R`有了"掩模 → 空间像 → 潜像 → 轮廓"的完整计算链，就能问：怎样改造系统和掩模，印出比波长小得多的图形？` },
  { sec: "5.7", title: "分辨率增强：让掩模不再像图形", gist: R`离轴/Köhler 照明、水浸没（NA 到 1.35、焦深增大）、多层胶与 BARC（消驻波）、设计规则限制、OPC、移相掩模（$d=\lambda/2(n-1)$）、计算光刻、多重图形化与 SADP——把 $k_1$ 从 0.6 压到 0.1。`, gives: ["5.58", "5.59", "5.62", "5.64", "5.65"], next: R`这些花招极其昂贵。有没有完全不同的路线？` },
  { sec: "5.8", title: "纳米压印", gist: R`不用光学成像，直接用 1:1 模具把图形"压"进胶里：热压印、紫外压印、步进-闪光（J-FIL）。分辨率由模具决定，挑战在缺陷、模具寿命与产能。`, gives: [], next: R`最后把整章（上、下两半）收拢成几条要点。` },
  { sec: "5.9", title: "要点小结", gist: R`曝光工具 + 光刻胶两大要素；傅里叶光学与胶化学两门科学；计算光刻与 DTCO；EUV 的到来。`, gives: [] },
];

export const EQMAP_OPT = [
  { from: "5.18", to: "5.21", label: "复振幅" },
  { from: "5.20", to: "5.21", label: R`掩模 $t(x_1,y_1)$` },
  { from: "5.21", to: "5.23", label: "即傅里叶变换" },
  { from: "5.22", to: "5.23", label: R`位置 → 频率` },
  { from: "5.23", to: "5.27", label: "乘光瞳、逆变换" },
  { from: "5.25", to: "5.27", label: R`低通 $\mathrm{NA}/\lambda$` },
  { from: "5.27", to: "5.28", label: "取模平方" },
  { from: "5.27", to: "5.29", label: R`频谱平移 $\sin\theta/\lambda$` },
  { from: "5.29", to: "5.31", label: "点源强度叠加" },
  { from: "5.21", to: "5.32", label: "近场：Fresnel 核" },
  { from: "5.28", to: "5.33", label: "胶面边界条件" },
];
export const EQMAP_RES = [
  { from: "5.34", to: "5.36", label: R`$\alpha$ 随深度变` },
  { from: "5.38", to: "5.40", label: R`$[\mathrm P]=[\mathrm{PAC}]_0-[\mathrm{PAC}]$` },
  { from: "5.40", to: "5.42", label: "代入 Lambert" },
  { from: "5.42", to: "5.43", label: R`$m=m(z,t)$` },
  { from: "5.44", to: "5.43", label: "耦合迭代" },
  { from: "5.43", to: "5.45", label: "两个平台" },
  { from: "5.44", to: "5.47", label: "初始斜率" },
  { from: "5.49", to: "5.51", label: R`$I$ 恒定` },
  { from: "5.51", to: "5.55", label: "酸作催化剂" },
  { from: "5.52", to: "5.53", label: "扩散长度" },
  { from: "5.44", to: "5.57", label: R`潜像 $m$ → 速率` },
  { from: "5.61", to: "5.62", label: "多次反射求和" },
  { from: "5.62", to: "5.64", label: R`$\tau_D^2=-1$` },
];
export const EQMAP_LABELS = {
  "5.18": "复振幅", "5.20": "掩模透过率", "5.21": "Fraunhofer 积分", "5.22": "空间频率", "5.23": "远场 = 傅里叶变换", "5.25": "光瞳函数",
  "5.27": "像面电场", "5.28": "空间像", "5.29": "斜入射", "5.31": "部分相干", "5.32": "Fresnel 积分", "5.33": "Helmholtz 方程",
  "5.34": "Lambert 定律", "5.36": "非均匀吸收", "5.38": "各组分吸收", "5.40": R`Dill：$\alpha=Am+B$`, "5.42": "光强衰减", "5.43": "时空耦合",
  "5.44": "曝光动力学", "5.45": R`测 $A$`, "5.47": R`测 $C$`, "5.49": "CAR 曝光", "5.51": "光生酸", "5.55": "PEB 去保护",
  "5.52": "Arrhenius 扩散", "5.53": "扩散长度", "5.57": "Mack 显影", "5.61": "界面反射", "5.62": "BARC 总反射", "5.64": "理想 BARC",
};

export const groups = [
  { id: "optics", label: "成像光学" },
  { id: "resist", label: "光刻胶化学" },
  { id: "ret", label: "分辨率增强" },
  { id: "alt", label: "其他路线" },
];

export const concepts = [
  {
    id: "fourier_optics", name_zh: "傅里叶光学成像", name_en: "Fourier optics", icon: "🔭", section_id: "5.5.1", group: "optics",
    plain: "远场衍射图就是掩模的频谱；镜头做一次逆变换把它拼回图像。",
    explain: R`在 Fraunhofer 近似下，掩模后方远处的光场分布正比于掩模透过率 $t(x_1,y_1)$ 的二维傅里叶变换，入瞳平面上的位置 $x'$ 对应空间频率 $f_x=x'/z\lambda$。物镜把收集到的这部分频谱再做逆变换，在像面上重建图形。

所以投影成像可以浓缩为一句话：**像 = 掩模经过"傅里叶变换 → 乘光瞳 → 逆变换 → 取模平方"之后的结果**。整个光刻仿真器的光学部分都建立在这条链上。`,
    analogy: "像用一台只有低音喇叭的音响播放一段鼓点：节奏（低频）还在，但每一下敲击的清脆边沿（高频）都被抹圆了。",
    book_example: { what: R`原书用 Optolith 模拟肘形与接触孔（图 5.36–5.39）：i 线 NA 0.43 印 1 µm 很清楚，193 nm NA 0.8 印 0.1 µm 时接触孔几乎消失。`, point: "特征尺寸逼近 $\\lambda/\\mathrm{NA}$ 时，高频被砍掉，角变圆、小孔变暗。" },
    misconception: "镜头并不是把掩模图案\"缩小复制\"过去；它只能传递频谱中被光瞳收下的那一部分，被截掉的信息在像中永远找不回来。",
  },
  {
    id: "pupil_lowpass", name_zh: "光瞳 = 低通滤波器", name_en: "Pupil function", icon: "🕳️", section_id: "5.5.1", group: "optics",
    plain: R`物镜只放行空间频率低于 $\mathrm{NA}/\lambda$ 的信息。`,
    explain: R`光瞳函数 $P(f_x,f_y)$ 在 $\sqrt{f_x^2+f_y^2}<\mathrm{NA}/\lambda$ 内为 1，外面为 0。对一个节距为 $p$ 的光栅，衍射级出现在 $f=n/p$；要成像，至少要收下 0 级和一个 $\pm1$ 级。

相干照明下 $\pm1$ 级都进光瞳需要 $1/p<\mathrm{NA}/\lambda$，即 $p>\lambda/\mathrm{NA}$；这正是 Rayleigh 公式 $k_1=0.5$ 的来源。斜入射把频谱整体平移，可以让 0 级和 +1 级挤进光瞳，把极限推到 $p>\lambda/2\mathrm{NA}$。`,
    analogy: R`像相机前加了一个只能透过粗线条的滤网：网眼大小（$\mathrm{NA}/\lambda$）决定能看到多细的条纹。`,
    book_example: { what: R`图 5.71：193 nm、NA 0.8 印 0.1 µm 线/间隔（节距 0.2 µm < $\lambda/\mathrm{NA}=0.24\,\mu$m），几乎分辨不出；图 5.72 去掉一半线（节距 0.4 µm），对比度立刻恢复。`, point: "能否成像取决于节距与 $\\lambda/\\mathrm{NA}$ 的比较，而不是孤立线宽。" },
    misconception: "\"线宽小于波长就印不出来\"是错的；真正的限制是节距（周期）对应的衍射级能否进入光瞳。",
  },
  {
    id: "partial_coherence", name_zh: "部分相干与离轴照明", name_en: "Partial coherence / off-axis illumination", icon: "💡", section_id: "5.7.1", group: "optics",
    plain: "照明光从许多角度入射，每个角度各成一幅像，强度相加。",
    explain: R`扩展光源上的每个点都发出一束相干平面波，以某个角度照射掩模，频谱在光瞳中平移 $\sin\theta/\lambda$（式 5.29）；不同点源之间互不相干，所以总空间像是各自强度按光源分布 $S$ 加权的平均（式 5.31）。

把光源做成环形、四极、偶极（图 5.56），就能专门照顾某一方向、某一节距的图形，让 0 级与一个一级同时进入光瞳——这就是离轴照明，最多可把 $k_1$ 改善约一倍。Köhler 照明则保证掩模上每个位置得到同样的照明角分布。`,
    analogy: "像从侧面打光拍浮雕：正面打光时细纹被\"拍平\"，斜光一照，起伏立刻显出来。",
    book_example: { what: R`图 5.55：正入射时 $\pm1$ 级落在入瞳外丢失；斜入射把图样整体平移，部分高阶信息被收进物镜。`, point: "离轴照明是用照明角度换取分辨率。" },
    misconception: "部分相干不是\"光不够好\"的缺陷，而是被刻意设计出来的照明自由度。",
  },
  {
    id: "dill_abc", name_zh: "Dill 参数 A、B、C", name_en: "Dill exposure parameters", icon: "🧪", section_id: "5.6.2", group: "resist",
    plain: "A 是会漂白的吸收，B 是不漂白的吸收，C 是曝光反应的快慢。",
    explain: R`DNQ 胶的吸收系数写成 $\alpha=Am+B$，其中 $m=[\mathrm{PAC}]/[\mathrm{PAC}]_0$ 是尚未分解的光敏剂比例。曝光开始时 $\alpha=A+B$，完全曝光后只剩 $B$——胶越曝越透明（漂白）。光敏剂分解按一级动力学 $dm/dt=-CIm$。

光强随深度的衰减和 $m$ 的演化互相耦合，只能迭代求解。Dill 证明，只需测一条透过率–剂量曲线：两端平台给出 $A$、$B$，初始斜率给出 $C$（式 5.45–5.47）。`,
    analogy: "像一块越晒越透明的墨镜：开始时上层吸走大部分光，上层\"褪色\"后，光才一点点照进深处。",
    book_example: { what: "图 5.51：AZ1350J 胶在 50、100、200 mJ/cm$^2$ 时的 PAC 分布，曝光从胶顶向下推进。", point: "漂白让厚胶也能被曝透。" },
    misconception: "Lambert 定律中的 $\\alpha$ 在 DNQ 胶里并不是常数；把它当常数会严重低估底部的曝光量。",
  },
  {
    id: "car", name_zh: "化学放大与 PEB", name_en: "Chemical amplification & PEB", icon: "⚗️", section_id: "5.6.3", group: "resist",
    plain: "一个光子产一个酸，一个酸在烘烤中催化成百上千次反应。",
    explain: R`CAR 中光子使 PAG 分解产酸：$[\mathrm H]=[\mathrm{PAG}]_0(1-e^{-CIt})$（式 5.51）。曝光后烘烤（PEB）时，酸在聚合物中扩散，催化去保护反应 $d[\mathrm M]/dt=-C[\mathrm M][\mathrm H]$，而酸本身不被消耗。

所以 PEB 不只是"烘干"：它完成了真正的曝光反应，温度和时间直接决定剂量灵敏度与线宽；酸的扩散又会模糊潜像，扩散长度必须控制在几十纳米以内。`,
    analogy: "像发面：光照只撒下少量酵母（酸），真正让面团膨胀的是之后的醒发（PEB）。",
    book_example: { what: "原书指出 DUV 胶的 PEB 模拟与图 5.52 类似，只是 PEB 中曝光程度还会继续增加，而不仅是抹平。", point: "PEB 在 CAR 中是曝光过程的一部分。" },
    misconception: "PEB 并非可有可无的辅助步骤；对 CAR 而言，跳过 PEB 胶基本不会显影。",
  },
  {
    id: "standing_wave", name_zh: "驻波与抗反射涂层", name_en: "Standing waves & BARC", icon: "〰️", section_id: "5.7.3", group: "resist",
    plain: R`衬底反射回来的光与入射光干涉，在胶里形成周期 $\lambda/2n$ 的明暗层。`,
    explain: R`胶下若是强反射衬底（Si、金属），向上反射的光与向下的光相干叠加，光强沿深度以 $\lambda/2n$ 为周期起伏，显影后侧壁呈"扇贝"状（图 5.61）。

两种对策：PEB 让曝光产物扩散约 50 nm（$\sigma=\sqrt{2D_{\rm P}t}$），把条纹抹平；或在胶下加 BARC，使两个界面的反射相位相差 180° 而相消——理想透明情形要求 $D=\lambda/4n_2$、$n_2=\sqrt{n_1n_3}$。`,
    analogy: "像在浴缸里来回推水：入射波和反射波叠出不动的波峰波谷。",
    book_example: { what: R`图 5.61：把图 5.51 的 $\mathrm{SiO_2}$ 衬底换成 Si，驻波条纹变得非常明显；SEM 照片中显影后的胶条侧壁呈扇贝形。`, point: "反射衬底会把光学干涉直接刻进胶轮廓。" },
    misconception: "BARC 不是让光\"更多地进入衬底\"那么简单；真实衬底吸收强、折射率复杂，BARC 往往要靠吸收而非单纯的四分之一波长干涉。",
  },
  {
    id: "immersion", name_zh: "浸没光刻", name_en: "Immersion lithography", icon: "💧", section_id: "5.7.2", group: "ret",
    plain: "在镜头与晶圆之间灌水，让 NA 可以超过 1。",
    explain: R`只把空气换成水，并不改变镜头收集衍射光的能力，分辨率不变，但焦深至少提高 $n$ 倍（式 5.58）。真正的收益来自把镜头做得更大：大角度光线在镜头/空气界面会全反射（临界角约 41°），换成水后临界角大得多，光线可以透射，NA 可做到 1.35（上限是水的折射率 1.44）。

工程代价：高纯水要在约 1 mm 的缝隙中随工件台高速移动，胶要防水浸出，有时还需加顶涂层。`,
    analogy: "像潜水员在水下看东西更清楚的反面：镜头与晶圆之间填上和玻璃折射率相近的液体，光线就不再在界面处\"拐弯被挡\"。",
    book_example: { what: "图 5.59：NA < 1 时大角度光线在镜头底面全反射；浸没后可透射到胶上，NA > 1。", point: "浸没靠的是消除全反射，而不是\"水让波长变短\"这一句话就能概括。" },
    misconception: "只加水不改镜头，分辨率并不会提高；提高的是焦深。",
  },
  {
    id: "opc", name_zh: "光学邻近效应修正", name_en: "Optical proximity correction, OPC", icon: "📐", section_id: "5.7.5", group: "ret",
    plain: "预先把掩模\"画歪\"，让印出来的图形变正。",
    explain: R`低通成像会让外角缺光、内角多光、线端回缩、孤立与密集图形线宽不同。OPC 在外角加衬线（serif）、内角挖缺口、线端加"锤头"、加亚分辨率辅助图形，把光补到该去的地方——本质上是在光瞳只放行 $|f|<\mathrm{NA}/\lambda$ 的约束下，反过来挑选掩模频谱。

规则式 OPC 查预先算好的表，快；模型式 OPC 反复调用空间像模型移动边缘，准。走到极致就是**计算光刻/逆光刻**：给定想要的图形，把掩模（乃至光源）离散成像素整体优化，得到与版图毫不相像的掩模（图 5.69、5.70）。`,
    analogy: "像给远视的人配眼镜：不是去改字，而是预先把光路扭曲，让落到视网膜上的像恰好清晰。",
    book_example: { what: "图 5.65：同样的 193 nm、NA 0.93、0.1 µm 肘形，加衬线和缺口后，空间像在角部和线端明显更忠实于设计。", point: "掩模不必像图形——这是 2000 年以后最关键的观念突破。" },
    misconception: "OPC 并不能突破 $\\lambda/2\\mathrm{NA}$ 的节距极限；它改善的是图形保真度，不是光栅分辨率本身。",
  },
  {
    id: "psm", name_zh: "移相掩模", name_en: "Phase-shift mask, PSM", icon: "🌗", section_id: "5.7.5", group: "ret",
    plain: "让相邻开口的光相位差 180°，两峰之间电场必然过零。",
    explain: R`光刻胶响应光强 $|\mathcal E|^2$，但成像过程叠加的是电场。二元掩模上相邻开口电场同号，模糊后相互填平；交替移相掩模让相邻开口的电场反号，模糊后中间必有一个电场零点——光强真正变黑。移相层厚度 $d=\lambda/2(n-1)$。

从频谱看，相邻开口反相使周期加倍、0 级消失，$\pm1$ 级间距减半，同一个 NA 能分辨的节距缩小一半。衰减型 PSM（5–15% 透过、180° 相移）效果较弱但简单便宜。`,
    analogy: "像两支反相的降噪耳机声波：在中间相遇时互相抵消，留下真正的\"静音区\"。",
    book_example: { what: "图 5.66（Levenson）：同一光栅，加 180° 移相层后晶圆处电场一正一负，光强中间出现深谷。", point: "利用相位信息而不只是强度信息成像。" },
    misconception: "移相并不是让那块区域\"更暗\"；移相区透光率不变，变的只是电场符号。",
  },
  {
    id: "multipatterning", name_zh: "多重图形化与 SADP", name_en: "Multi-patterning & SADP", icon: "✂️", section_id: "5.7.6", group: "ret",
    plain: "一次印不出就拆成两三次印；或用侧墙把线数翻倍。",
    explain: R`LELE（光刻–刻蚀–光刻–刻蚀）把密集版图拆到两张掩模上，每张的节距翻倍，再分两次转移到硬掩模中；代价是步骤翻倍和极严的套刻要求。

SADP 先印宽松的芯轴，再共形沉积 $\mathrm{Si_3N_4}$、各向异性回刻成侧墙、去芯轴——侧墙节距是芯轴的一半，线宽由薄膜厚度决定（自对准，无套刻误差），再用切割光刻去掉多余段。重复一次即 SAQP（四倍）。表 5.1 中 7 nm、5 nm 节点 $k_1$ 降到 0.10–0.12 就靠这些。`,
    analogy: "LELE 像两个人各写奇数行和偶数行；SADP 像沿每根铅笔线描两条边，再擦掉铅笔线。",
    book_example: { what: "图 5.73（LELE 步骤）与图 5.74/5.75（SADP 的芯轴、氮化物沉积、侧墙刻蚀、去芯轴）。", point: "用工艺步骤换分辨率。" },
    misconception: "SADP 并不\"免费\"：它要求版图高度规则（单一线宽、单一方向，图 5.64），还需要额外的切割掩模。",
  },
  {
    id: "nil", name_zh: "纳米压印", name_en: "Nanoimprint lithography, NIL", icon: "🖨️", section_id: "5.8", group: "alt",
    plain: "像盖章一样，用 1:1 的模具把纳米图形直接压进胶里。",
    explain: R`热压印把 PMMA 加热到玻璃化温度以上（140–180 °C）后加压成形；紫外压印用透明石英模具压入低黏度液态胶，再紫外固化，室温、低压、更快，是今天的主流。压印后需去掉凹槽底部的残留层（$\mathrm{O_2}$ 等离子体，或模具底部 NiCr 挡光），再刻蚀转移图形。

量产用"喷墨滴胶 + 步进-闪光"（J-FIL）：每个场约 1 秒内完成滴胶、压模、曝光、脱模。分辨率可达 10–20 nm，设备远比 EUV 便宜；挑战是缺陷密度、模具寿命和脱模。`,
    analogy: "活字印刷的纳米版：没有镜头，模具上刻成什么样，胶里就是什么样。",
    book_example: { what: "图 5.76–5.80：热压印与 UV 压印步骤、去残胶的两种方法、两种图形转移方式、步进-闪光与佳能量产设备。", point: "分辨率由模具（电子束写出）决定，与光的波长无关。" },
    misconception: "纳米压印不是\"复古\"技术；它的首个量产候选是对缺陷较宽容的存储器。",
  },
];

export const relations = [
  { from: "fourier_optics", to: "pupil_lowpass", label: "频谱被截断" },
  { from: "pupil_lowpass", to: "partial_coherence", label: "平移频谱" },
  { from: "partial_coherence", to: "opc", label: "源–掩模联合优化" },
  { from: "pupil_lowpass", to: "immersion", label: "增大 NA" },
  { from: "pupil_lowpass", to: "psm", label: "消去 0 级" },
  { from: "pupil_lowpass", to: "multipatterning", label: "放宽节距" },
  { from: "fourier_optics", to: "dill_abc", label: "空间像作输入" },
  { from: "dill_abc", to: "standing_wave", label: "胶内光强" },
  { from: "dill_abc", to: "car", label: "同形动力学" },
  { from: "standing_wave", to: "car", label: "PEB 抹平" },
  { from: "opc", to: "psm", label: "可叠加" },
  { from: "multipatterning", to: "nil", label: "成本之争" },
];

export const TAKEAWAYS = [
  R`**投影成像 = 傅里叶变换 + 低通滤波。**空间像 $I_{\rm i}=|\mathcal F^{-1}\{\mathcal F\{t\}P\}|^2$；光瞳截止频率 $\mathrm{NA}/\lambda$ 决定可分辨节距（相干 $\lambda/\mathrm{NA}$，离轴/移相可到 $\lambda/2\mathrm{NA}$）。部分相干照明 = 各点源的强度叠加。`,
  R`**胶把空间像变成三维轮廓要经过三步化学：**曝光（Dill $\alpha=Am+B$、$dm/dt=-CIm$；CAR 中 $[\mathrm H]=[\mathrm{PAG}]_0(1-e^{-CIt})$）、PEB（扩散长度 $\sigma=\sqrt{2Dt}$ 抹平驻波；CAR 的酸催化去保护）、显影（速率 $R(m)$）。`,
  R`**分辨率增强的核心观念：掩模不必像图形。**OPC、移相掩模、源–掩模联合优化/逆光刻都是"在计算机里反解成像方程"；浸没把 NA 推到 1.35；多重图形化与 SADP 用工艺步骤换节距，把 193 nm 光刻的 $k_1$ 从 0.6 压到约 0.1。`,
  R`**每个花招都有代价：**设计规则越来越死板（单一线宽、单一方向）、掩模与工艺步骤成倍增加、套刻要求极严。193 nm 已到极限，EUV（$\lambda=13.5$ nm）接棒；纳米压印是成本上的另一条路。`,
];

export const QUIZ = [
  { q: R`用 $\lambda=193$ nm、$\mathrm{NA}=0.8$、**相干**照明印节距 200 nm 的等宽线/间隔。像面上会看到什么？`, options: [R`清晰的线条，只是边缘稍软`, R`一片均匀的灰：只有 0 级进入物镜`, R`线条清晰但线宽变窄`, R`对比度约 0.5 的正弦条纹`], answer: 1, why: R`一级衍射在 $f=1/p=5\,\mu\mathrm m^{-1}$，光瞳截止 $\mathrm{NA}/\lambda=4.1\,\mu\mathrm m^{-1}$，$\pm1$ 级都被挡住，只剩常数项。用上面的计算器选"相干"即可验证。` },
  { q: R`同一条件改用交替移相掩模，为什么能分辨了？`, options: [R`移相层让开口更亮`, R`相邻开口反相使周期加倍、0 级消失，$\pm1$ 级落在 $\pm1/2p$，进入了光瞳`, R`移相层缩短了波长`, R`移相掩模提高了 NA`], answer: 1, why: R`真实周期变为 $2p=400$ nm，衍射级位于 $\pm1/400\ \mathrm{nm^{-1}}=\pm2.5\,\mu\mathrm m^{-1}<4.1\,\mu\mathrm m^{-1}$，两束相干的 $\pm1$ 级干涉出周期 $p$ 的条纹，中间电场过零。` },
  { q: R`DNQ 胶曝光时透过率从 $T_0$ 升到 $T_\infty$，这一现象叫什么？它对应哪个 Dill 参数？`, options: [R`驻波；$C$`, R`漂白；$A$`, R`化学放大；$B$`, R`回流；$C$`], answer: 1, why: R`$A=\frac1D\ln(T_\infty/T_0)$ 正是可漂白吸收的大小；$B$ 是漂白后剩下的吸收，$C$ 决定漂白的快慢。` },
  { q: R`在强反射的 Si 衬底上，i 线（365 nm）、$n=1.7$ 的胶中驻波条纹的间距约为：`, options: [R`365 nm`, R`215 nm`, R`107 nm`, R`54 nm`], answer: 2, why: R`入射与反射波叠加的强度周期是 $\lambda/2n=365/3.4\approx107$ nm。0.5 µm 胶中约 5 层条纹，与图 5.61 一致。` },
  { q: R`只把干式光刻机镜头下的空气换成水、其他不变，会怎样？`, options: [R`分辨率提高 1.44 倍`, R`分辨率不变，焦深提高`, R`分辨率与焦深都不变`, R`焦深降低`], answer: 1, why: R`镜头收集的衍射光没有变，所以分辨率不变（焦面位置变了）；但胶中光锥变窄，焦深按式 5.58 至少增大 $n$ 倍。要提高分辨率还得把镜头做大、NA 超过 1。` },
  { q: R`SADP 中，最终线宽主要由什么决定？`, options: [R`芯轴光刻的线宽`, R`共形沉积的 $\mathrm{Si_3N_4}$ 厚度`, R`切割掩模的套刻精度`, R`显影时间`], answer: 1, why: R`侧墙是共形氮化物回刻后留在芯轴侧壁上的部分，其宽度约等于沉积厚度；节距则是芯轴节距的一半。这也是它叫"自对准"的原因。` },
];

export const BRIDGE = R`光刻在胶里刻出了图形，但胶只是"模板"。接下来的几章讲图形最终落到的材料里会发生什么：第 6 章从硅的热氧化与 Si/$\mathrm{SiO_2}$ 界面开始——它决定了栅介质、隔离和许多硬掩模的质量；之后第 7、8 章用扩散与离子注入把杂质送进被胶或硬掩模挡开的区域。本章反复出现的"扩散长度 $\sqrt{2Dt}$"与 Arrhenius 型扩散系数，在第 7 章会成为主角。`;
