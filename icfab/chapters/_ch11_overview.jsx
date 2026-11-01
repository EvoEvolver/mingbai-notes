// 第 11 章（上）高层理解层：开场、路线图、推导图、核心概念、小结与自测。
const R = String.raw;

export const HOOK_TITLE = "一颗芯片里，导线比晶体管还慢";
export const HOOK = R`一颗现代处理器里有几百亿个晶体管，把它们连起来的铜导线若首尾相接，总长可达数十公里，分布在十几层"楼"里。晶体管每一代都更快，栅延迟已降到皮秒量级；可是一根横跨芯片 1 cm 的细导线，按最简单的 RC 模型算，延迟竟能达到几十纳秒——是 GHz 时钟周期的几十倍。

问题出在一个看似无害的平方上：导线的电阻和电容都与长度成正比，所以延迟正比于长度的平方。于是后道（互连）工艺半个世纪的历史，几乎都在和这个 $L^2$ 以及它前面的系数 $\rho K$ 较劲：把铝换成铜（降 $\rho$），把二氧化硅换成多孔的低 K 材料甚至空气（降 $K$），把长线放到又宽又厚的顶层，再在中间插上中继器。每一次更替又带来新的麻烦——铝会扎穿浅结、会长"小丘"、会被电子流冲走；铜无法刻蚀、还会毒害晶体管；多孔介质软得经不起抛光——于是又有阻挡层、W 塞、CMP、大马士革……本章（上）就沿着这条"问题—对策"的链条，把今天后道每一层薄膜为什么在那里讲清楚。`;

export const ROADMAP = [
  { sec: "11.1", title: "后道是一座立体路网", gist: R`接触、通孔、局部/中间/全局多层 Cu 导线、金属前介质与金属间介质；越往上导线越宽越厚。`, gives: [], next: R`为什么上层要做粗？要先算导线的延迟。` },
  { sec: "11.2", title: "RC 延迟：一切创新的指南针", gist: R`$R=\rho L/WH$、平行板 $C$ → $\tau\propto\rho K_{\rm D}L^2$；理想缩放下 $\tau$ 不变，但全局线不缩短；中继器把 $L^2$ 变成 $L$。`, gives: ["11.1", "11.2", "11.3", "11.4", "11.5"], next: R`知道了要降 $\rho$、降 $K$，再看历史上一步步怎么做到的。` },
  { sec: "11.3.1", title: "接触：从纯 Al 到多层阻挡", gist: R`Si 溶入 Al 造成尖刺 → Al(Si) → 阻挡层（被动/填塞/牺牲）→ TiSi$_2$/TiN 双层。`, gives: [], next: R`接触解决了，层数一多，表面变得崎岖。` },
  { sec: "11.3.2", title: "平坦化：多层布线的前提", gist: R`焦深与台阶覆盖要求平坦（DOP）；W 塞 + CMP、光刻胶回刻、SOG（与中毒通孔），最终 CMP 胜出；大马士革的概念。`, gives: ["11.6"], next: R`结构平了，Al 本身的毛病（小丘、电迁移、电阻）浮出水面。` },
  { sec: "11.3.3", title: "从 Al 到 Cu", gist: R`热失配→小丘/空洞，电子风→电迁移；加 Cu、加分流层；最终换成电阻更低、抗电迁移更好的 Cu，用双大马士革绕开刻蚀难题。`, gives: [], next: R`$\rho$ 已到底，剩下 $K$。` },
  { sec: "11.3.4", title: "低 K 介质", gist: R`平行板电容只剩 $K$ 可调；Clausius–Mossotti：降极化率 $\alpha$ 或降密度 $N$ → FSG、SiCOH、多孔 SiCOH、空气隙；代价是吸水与力学强度。`, gives: ["11.7", "11.8"], next: R`第 11 章（下）：接触、硅化物、电镀、电迁移等关键工艺的物理模型。` },
];

export const EQMAP = [
  { from: "11.1", to: "11.5", label: R`$R_{\rm Wire}$` },
  { from: "11.2", to: "11.5", label: R`$C_{\rm Wire}$` },
  { from: "11.3", to: "11.4", label: "解一阶 ODE" },
  { from: "11.4", to: "11.5", label: R`$\tau=RC$；$t_{\rm D}=2.2\tau$` },
  { from: "11.7", to: "11.2", label: "两对平行板" },
  { from: "11.8", to: "11.7", label: R`$K(N,\alpha)$` },
];
export const EQMAP_LABELS = {
  "11.1": "导线电阻", "11.2": "导线电容", "11.3": "RC 充电方程", "11.4": "阶跃响应", "11.5": R`$\tau\propto\rho K_{\rm D}L^2$`,
  "11.6": "平坦化度 DOP", "11.7": "平行板电容", "11.8": "Clausius–Mossotti",
};

export const groups = [
  { id: "speed", label: "速度：R 与 C" },
  { id: "contact", label: "接触与阻挡" },
  { id: "struct", label: "多层结构" },
  { id: "rel", label: "可靠性与材料" },
];

export const concepts = [
  {
    id: "hierarchy", name_zh: "互连层级", name_en: "Interconnect hierarchy", icon: "🏙️", section_id: "11.1", group: "struct",
    plain: "后道像城市路网：底层是细密的小路，顶层是又宽又厚的高速路。",
    explain: R`局部互连（M1–M2）连接相邻晶体管，节距最小；中间互连跨越模块；全局互连承载时钟、电源和长距离总线。由于延迟 $\propto L^2$，长线对电阻极其敏感，所以顶层导线做得宽、厚、间距大，介质也更厚。各层之间用通孔相连，相邻两层导线方向互相垂直。`,
    analogy: "城市里不会把高速公路修成小区支路那么窄：车流距离越长，越需要宽阔的道路。",
    book_example: { what: "图 11.2：从金属前介质、W 塞到全局 Cu 层，导线尺寸沿绿色斜线逐层增大。", point: "层级结构是用版图手段对抗 $L^2$ 的主要办法之一。" },
    misconception: "层数多只是因为晶体管多？——也是为了让长线可以走到电阻低的粗线层。",
  },
  {
    id: "rc", name_zh: "RC 延迟", name_en: "RC delay", icon: "⏱️", section_id: "11.2", group: "speed",
    plain: "导线就是一个电阻给一个电容充电，充得越慢，信号越慢。",
    explain: R`驱动门（或导线自身）的电阻 $R$ 给导线电容 $C$ 充电，输出按 $1-e^{-t/\tau}$ 上升，$\tau=RC$。10%→90% 上升时间为 $\ln9\,\tau\approx2.2\tau$。由 \eqref{11.5}，$\tau=\rho L^2K_{\rm D}\varepsilon_0\left(\frac1{Hx_{\rm D}}+\frac1{WL_{\rm S}}\right)$：降 $\rho$、降 $K_{\rm D}$、缩短 $L$ 都能提速。`,
    analogy: "用一根细水管给水桶灌水：管子越细（R 大）、桶越大（C 大），灌满越慢。",
    book_example: { what: "原书例题：1 cm 长、0.1 µm 见方的 Al 线，$t_{\\rm D}=25.1$ ns。", point: "是 GHz 时钟周期的 25 倍——长线必须另想办法。" },
    misconception: "RC 延迟主要来自导线对衬底的电容？——在密节距下，线间耦合电容往往占大头。",
  },
  {
    id: "l2", name_zh: "延迟随 L² 增长", name_en: "Delay scales as L squared", icon: "📈", section_id: "11.2", group: "speed",
    plain: "线长翻倍，电阻和电容都翻倍，延迟变成四倍。",
    explain: R`理想缩放中所有尺寸同比缩小，$\tau$ 不变；但晶体管变快了，导线占比上升；而且芯片面积变大，最长的全局线根本不缩短。图 11.5 中最长线 $L\propto\sqrt A$，所以延迟 $\propto A$，双对数图上斜率为 1。`,
    analogy: "队伍越长，不仅每个人要走的路更长，要传话的人也更多。",
    book_example: { what: "图 11.5：1 µm 到 0.25 µm 三代工艺，Al 线在几十 mm$^2$ 的芯片上就已慢于栅延迟。", point: "互连延迟早在 30 年前就压倒了栅延迟。" },
    misconception: "工艺缩放会自动让一切变快？——对全局互连恰恰相反。",
  },
  {
    id: "repeater", name_zh: "中继器", name_en: "Repeater", icon: "📡", section_id: "11.2", group: "speed",
    plain: "把长线切成几段、每段加一个放大器，延迟从随 $L^2$ 变为随 $L$ 增长。",
    explain: R`分成 $n$ 段后导线总延迟为 $t_{\rm D}/n$，加上 $n$ 个中继器的延迟 $n\tau_{\rm rep}$；最优 $n^*=\sqrt{t_{\rm D}/\tau_{\rm rep}}$，最小延迟 $2\sqrt{t_{\rm D}\tau_{\rm rep}}\propto L$。`,
    analogy: "接力赛：一个人跑全程越跑越慢，分成几棒反而更快，只是交接棒要花点时间。",
    book_example: { what: "图 11.6：分 3 段，每段 RC 延迟为原来 1/9，导线部分合计为 1/3。", point: "代价是中继器本身的延迟、面积与功耗。" },
    misconception: "中继器越多越好？——过了最优段数，中继器延迟反而占主导。",
  },
  {
    id: "spiking", name_zh: "Al 尖刺", name_en: "Al spiking", icon: "📌", section_id: "11.3.1", group: "contact",
    plain: "Si 溶进 Al 里，Al 反过来钻进 Si 里，扎穿浅结。",
    explain: R`450–500 °C 时 Si 在 Al 中溶解度约 0.5–1 at.%，且在多晶 Al 中扩散很快；Si 被吸走留下空洞，Al 填入。由于自然氧化层被 Al 不均匀地还原，Al 只在局部下钻，形成超过 1 µm 深的尖刺；Al 又是 P 型杂质，扎进 N$^+$ 区尤其致命。`,
    analogy: "像海绵吸水：只要旁边有足够的'干海绵'（Al 导线），硅就会被一点点吸走。",
    book_example: { what: "图 11.8：尖刺穿过 N$^+$/P 结。", point: "纯 Al 接触只能用于 2–3 µm 以上的深结。" },
    misconception: "预先掺 1% Si 的 Al 就一劳永逸？——冷却时 Si 析出成 P 型结节，接触电阻升高。",
  },
  {
    id: "barrier", name_zh: "阻挡层与粘附层", name_en: "Barrier / adhesion layers", icon: "🧱", section_id: "11.3.1", group: "contact",
    plain: "在金属和硅之间加薄层：一层负责粘牢、导电，一层负责挡住互扩散。",
    explain: R`阻挡层分被动型（TiN，惰性且致密）、填塞型（晶界被 N/O 填塞的 TiW）、牺牲型（Ti，靠自身先反应来保护，耗尽即失效）。因为"粘得牢"往往需要界面反应，而"挡得住"又要求不反应，实践中走向双层：Ti 或 TiSi$_2$ 打底、TiN 在上。Cu 时代则用 TaN/Ta 包住 Cu。`,
    analogy: "墙面装修：先刷一层界面剂让涂料粘得住，再刷防水层挡住潮气。",
    book_example: { what: "图 11.9 与图 11.18：TiSi$_2$/TiN 接触，W 塞外包 TiN。", point: "后道里电阻率高一个量级的材料（表 11.1）大多扮演这类角色。" },
    misconception: "阻挡层越厚越安全？——它电阻高、不随导线缩小，会吃掉导体截面。",
  },
  {
    id: "planarization", name_zh: "平坦化与 CMP", name_en: "Planarization & CMP", icon: "🪞", section_id: "11.3.2", group: "struct",
    plain: "把每一层磨平，下一层才能做好光刻和填充。",
    explain: R`起伏会逐层累积，超过光刻焦深（DUV 约 $\pm250$ nm）就无法成像，台阶覆盖也越来越差。平坦化度 $\mathrm{DOP}=1-x_{\rm step}^{\rm f}/x_{\rm step}^{\rm i}$。光刻胶回刻、SOG 只能局部平坦；CMP 利用化学选择性（如磨到 SiO$_2$ 就变慢）实现全局平坦，成为主流。`,
    analogy: "盖楼每层都要找平，否则越往上越歪。",
    book_example: { what: "图 11.14：1998 年 Intel 五层 Al 互连，每层都用 CMP。", point: "CMP 让后道可以叠到 15 层。" },
    misconception: "抛光会引入颗粒，所以不适合芯片？——正是硅片制备中的抛光经验让 IBM 把它变成了平坦化利器。",
  },
  {
    id: "damascene", name_zh: "大马士革工艺", name_en: "Damascene process", icon: "🪙", section_id: "11.3.2", group: "struct",
    plain: "不是先铺金属再刻出导线，而是先在介质里挖槽，再填金属、磨平。",
    explain: R`W 塞就是"单大马士革"：挖孔、覆盖式淀积 W、CMP。双大马士革在同一次金属填充中同时形成通孔与上层导线，两次光刻都在平坦表面上进行。对无法等离子体刻蚀的 Cu 来说，它是唯一可行的图形化方式。`,
    analogy: "镶嵌工艺：在木器上刻出花纹凹槽，再把金属嵌进去打磨平整——这正是名字的来源。",
    book_example: { what: "图 11.19：A–F 六步双大马士革流程。", point: "现代芯片中这一流程重复多达 15 次。" },
    misconception: "大马士革是为了平坦化才发明的？——平坦是副产品，对 Cu 而言首先是因为刻不动。",
  },
  {
    id: "em", name_zh: "电迁移与小丘", name_en: "Electromigration & hillocks", icon: "⚡", section_id: "11.3.3", group: "rel",
    plain: "电子流像风一样推着金属原子走，久而久之一处堆成小丘、一处掏出空洞。",
    explain: R`Al 熔点低、晶界扩散快：热失配压应力（弹性估算约 0.9 GPa）让 Al 沿晶界挤出成小丘，拉应力形成空洞；工作时 0.1–0.5 MA/cm$^2$ 的电流密度使原子沿电子流方向迁移。对策：加 Cu 钉扎晶界、加 Ti/TiN 分流层与机械约束；根本办法是换用抗电迁移好得多的 Cu。寿命常用 Black 方程 $\propto J^{-n}e^{E_{\rm a}/kT}$ 描述。`,
    analogy: "大风天的沙丘：风持续往一个方向吹，沙子从迎风面被吹走，在背风面堆积。",
    book_example: { what: "图 11.16：Al(Cu,Si) 线中电迁移形成的小丘与空洞。", point: "电迁移在电路正常工作时发生，是长期可靠性问题。" },
    misconception: "电迁移只取决于电流大小？——它对温度呈指数敏感，并强烈依赖晶粒结构与界面。",
  },
  {
    id: "cu", name_zh: "Al → Cu", name_en: "Transition from Al to Cu", icon: "🟠", section_id: "11.3.3", group: "rel",
    plain: "Cu 电阻更低、抗电迁移更好，但刻不动、还会毒害晶体管。",
    explain: R`Cu 1.72 vs Al 2.7 $\mu\Omega\cdot$cm；Ag 腐蚀且抗电迁移差，Au 只略好又污染器件。Cu 的卤化物低温不挥发，无法等离子体刻蚀 → 双大马士革 + CMP；Cu 在 SiO$_2$ 中扩散快 → 四周包 TaN/Ta、Si$_3$N$_4$ 等，代价是占去截面。IBM 1997 年率先量产。`,
    analogy: "换了一种更好的水管材料，但它没法切割，只能预先挖好沟槽浇铸进去，还得外面套一层防渗套管。",
    book_example: { what: "图 11.20：Intel 14 nm 的多层 Cu 互连堆栈。", point: "与图 11.7 的单层 Al 对比，可见 50 年的演进。" },
    misconception: "Cu 的优势只在电阻率？——抗电迁移可能更重要，它允许更高的电流密度。",
  },
  {
    id: "lowk", name_zh: "低 K 介质", name_en: "Low-K dielectrics", icon: "🫧", section_id: "11.3.4", group: "rel",
    plain: "让导线之间的绝缘材料更'稀'、更难极化，寄生电容就小了。",
    explain: R`由 Clausius–Mossotti $\frac{K-1}{K+2}=\frac{N\alpha}{3\varepsilon_0}$：降极化率（Si–F、Si–CH$_3$ 代替 Si–O）或降密度（自由体积、孔隙）。FSG 3.5 → SiCOH 2.6–3.0 → 多孔 SiCOH ~2 → 空气 1。代价：吸水（水 $K\approx80$）、力学强度差、热与化学稳定性差；于是有聚合物填孔、替代介质、空气隙等集成方案。`,
    analogy: "隔音墙：把实心砖换成多孔砖，隔得更好（K 低），但更容易被压碎、也更容易受潮。",
    book_example: { what: "表 11.2 与图 11.24：Intel 14 nm 在 M4、M6 用空气隙，RC 改善 17%。", point: "降 K 已逼近物理极限，集成难度急剧上升。" },
    misconception: "孔隙越多越好？——孔隙率一高，CMP 时就会塌，吸水也会把 K 拉回去。",
  },
];

export const relations = [
  { from: "rc", to: "l2", label: "延迟随长度平方" }, { from: "l2", to: "hierarchy", label: "长线放顶层" }, { from: "l2", to: "repeater", label: "切段" },
  { from: "spiking", to: "barrier", label: "催生" }, { from: "planarization", to: "damascene", label: "W 塞 + CMP" },
  { from: "em", to: "cu", label: "推动" }, { from: "rc", to: "cu", label: "降电阻率" }, { from: "rc", to: "lowk", label: "降介电常数" }, { from: "damascene", to: "cu", label: "使之可行" },
];

export const TAKEAWAYS = [
  R`导线的 RC 时间常数 $\tau=\rho L^2K_{\rm D}\varepsilon_0\left(\frac{1}{Hx_{\rm D}}+\frac{1}{WL_{\rm S}}\right)$：后道创新的三条主线——降 $\rho$（Al→Cu）、降 $K$（SiO$_2$→低 K→空气）、管住 $L$（层级、布局、中继器）——都写在这个式子里。`,
  R`延迟 $\propto L^2$：理想缩放下局部线延迟不变，但全局线不缩短、晶体管却在变快，所以互连占比越来越大；中继器把延迟变为 $\propto L$。10%→90% 上升时间是 $\ln9\,\tau\approx2.2\tau$。`,
  R`接触的演变是一部"问题—对策"史：Si 溶入 Al → 尖刺 → Al(Si) → Si 析出 → 阻挡层（被动/填塞/牺牲）→ Ti(TiSi$_2$)/TiN 双层；接触面积按 $F^2$ 缩小使接触电阻成为问题。`,
  R`平坦化（$\mathrm{DOP}=1-x_{\rm step}^{\rm f}/x_{\rm step}^{\rm i}$）是多层布线的前提：W 塞 + CMP 取代了光刻胶回刻与 SOG；"挖槽—填充—抛光"的大马士革方法后来成为 Cu 互连的唯一出路。`,
  R`Al 的低熔点带来小丘、空洞与电迁移；加 Cu、加分流层只是补丁，Cu 以更低电阻率和好得多的抗电迁移性取而代之，代价是必须用双大马士革并四面包覆阻挡层。`,
  R`Clausius–Mossotti $\frac{K-1}{K+2}=\frac{N\alpha}{3\varepsilon_0}$ 说明降 $K$ 只有两条路：降极化率、降密度；孔隙与空气隙把 $K$ 推向 1，但吸水、力学强度与工艺兼容性成为新的瓶颈。`,
];

export const QUIZ = [
  { q: R`把一根全局连线的长度加倍、其余不变，按 \eqref{11.5} 其 RC 延迟变为原来的几倍？`, options: ["2 倍", "4 倍", R`$\sqrt2$ 倍`, "不变"], answer: 1, why: R`$R$ 与 $C$ 都正比于 $L$，$\tau\propto L^2$，所以是 4 倍。` },
  { q: R`理想缩放（$L,W,H,L_{\rm S},x_{\rm D}$ 全部除以 $k$）下，导线的 $\tau$ 如何变化？为什么全局互连仍然越来越成问题？`, options: [R`$\tau$ 增大 $k^2$ 倍`, R`$\tau$ 不变，但全局线 $L$ 不缩短且晶体管变快`, R`$\tau$ 减小 $k$ 倍`, R`$\tau$ 不变，因此互连永远不是瓶颈`], answer: 1, why: R`$L^2/(Hx_{\rm D})$ 与 $L^2/(WL_{\rm S})$ 都不变；但芯片面积增大使最长线不缩短，晶体管又变快，互连所占比例上升。` },
  { q: R`为什么纯 Al 与浅 N$^+$ 结接触特别危险？`, options: ["Al 的电阻率太高", R`Si 溶入 Al 后 Al 局部下钻成尖刺，而 Al 在 Si 中是 P 型杂质，会短路 N$^+$/P 结`, R`Al 与 SiO$_2$ 不粘附`, R`Al 会形成 TiAl$_3$`], answer: 1, why: R`尖刺可深达 1 $\mu$m 以上，穿过结即短路；Al 作为 III 族受主还会补偿 N$^+$。` },
  { q: R`Ti 作为接触材料很好，为什么说它"不是好的阻挡层"？`, options: ["它与 Si 不反应", R`它在低温就与 Al 生成 TiAl$_3$、高温与 Si 生成 TiSi$_2$，属于会被耗尽的牺牲阻挡层`, "它电阻率比 Al 低", "它不能还原自然氧化层"], answer: 1, why: R`Ti 只在被耗尽之前起阻挡作用，400 °C 以上很快耗尽；因此常在其上加 TiN。` },
  { q: R`Cu 互连为什么必须用大马士革工艺？`, options: ["Cu 无法电镀", "Cu 的卤化物在低温下不挥发，难以等离子体刻蚀", "Cu 的电阻率太高", "为了让 Cu 与 Si 直接接触"], answer: 1, why: R`无法刻蚀 Cu，就改为在介质中刻槽、填 Cu、再用 CMP 磨回。` },
  { q: R`按 Clausius–Mossotti 方程，下列哪项**不能**降低介质的 $K$？`, options: [R`用 Si–CH$_3$ 代替 Si–O`, "引入孔隙", "让材料吸收少量水汽", "用 Si–F 代替部分 Si–O"], answer: 2, why: R`水的 O–H 键极性极强（$K\approx80$），吸水会显著升高 $K$；前三项中另外两项分别降低极化率与密度。` },
];

export const BRIDGE = R`本章（上）回答了"后道为什么长成今天这样"。第 11 章（下）将进入"怎么做到"：金属–半导体接触的肖特基势垒与隧穿、比接触电阻率与掺杂的定量关系（图 11.27）；自对准硅化物（salicide）的生长动力学；Cu 电镀与"超填充"；电迁移的物理与 Black 方程、失效统计；细线中的电阻率尺寸效应与替代金属；以及三维集成与先进封装。`;
