// 第 7 章（下）高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "同一炉氧化，硼跑得更快，锑却慢了下来";
export const HOOK = R`把两片硅放进同一台氧化炉：一片里埋着一层硼，另一片里埋着一层锑。氧化几个小时后取出来做 SIMS，你会发现，氧化区下方的硼比旁边被氮化硅掩蔽、只经历了"惰性"退火的区域扩散得远得多（氧化增强扩散，OED）；而锑恰恰相反，在氧化区下方扩散得比惰性区更慢（氧化阻滞扩散，ORD）。

温度一样，时间一样，硅片表面发生的只是"长了一层氧化层"这件事。如果扩散只是"浓度梯度驱动的随机行走"（上半章的 Fick 图像），两种杂质最多快慢不同，怎么会一个变快、一个变慢？

答案藏在原子尺度：掺杂原子自己根本不会动，它们必须"搭便车"——借助晶格里的点缺陷（空位 V 与自间隙原子 I）才能跳一步。氧化向硅里注入自间隙原子，于是靠间隙"搭车"的硼变快；多出来的间隙又与空位复合、把空位"吃掉"，于是靠空位"搭车"的锑变慢。这一章就把这个图像变成能算的模型，并用它解释一连串曾经令工艺工程师困惑的"反常"：磷的"扭结加拖尾"、双极晶体管的发射极推进效应、MOS 器件的反短沟道效应，以及多晶硅、GaAs 和 SiC 里的掺杂行为。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "7.12", title: "原子尺度扩散的物理基础", gist: R`宏观 Fick 描述加上电场项与浓度依赖 $D$ 后已"捉襟见肘"；掺杂原子靠点缺陷迁移：空位机制、踢出机制、间隙–替位对（interstitialcy）机制。`, gives: [], next: R`三种机制都可能存在，实验上怎么分辨谁在起作用？` },
  { sec: "7.13", title: "间隙与空位两条通道", gist: R`OED/ORD 与氮化实验表明 B、P 靠间隙，Sb 靠空位：$D_{\rm A}^{\rm eff}=D_{\rm A}^*(f_{\rm I}C_{\rm I}/C_{\rm I}^*+f_{\rm V}C_{\rm V}/C_{\rm V}^*)$；对可动物种用 Fick 定律，并由质量作用定律得到含点缺陷梯度项的通量，解释化学泵浦、发射极推进与反短沟道效应。`, gives: ["7.52", "7.53", "7.56", "7.57", "7.59"], next: R`要用 (7.52) 预测某种杂质，还得知道 $C_{\rm I}$ 变化时 $C_{\rm V}$ 怎么变。` },
  { sec: "7.14", title: "点缺陷复合", gist: R`I 与 V 通过 $\mathrm I+\mathrm V\leftrightarrow\mathrm{Si_S}$ 复合；快复合极限下 $C_{\rm I}C_{\rm V}=C_{\rm I}^*C_{\rm V}^*$，慢复合极限下两者互不影响。`, gives: ["7.54", "7.60"], next: R`为什么 P 的耦合效应在低温下更强？要比较掺杂与硅自扩散的"$DC$ 积"。` },
  { sec: "7.15", title: "硅自扩散为何重要", gist: R`硅自扩散激活能（约 4.8 eV）比掺杂扩散（3–4 eV）高约 1 eV；温度越低，掺杂通量越容易超过点缺陷的平衡能力，耦合效应越强。`, gives: [], next: R`离开单晶：多晶硅里还有晶界这条"高速公路"。` },
  { sec: "7.16", title: "多晶硅中的扩散", gist: R`晶界扩散比晶粒内快约 $10^4$ 倍；两股流模型分别追踪晶粒内与晶界上的掺杂，二者以 $k_{\rm eff}$ 交换、以偏析系数 $s$ 平衡，晶粒按 $L_{\rm g}^2=L_{\rm go}^2+2\sigma t$ 长大。`, gives: ["7.61", "7.62", "7.63"], next: R`同样的点缺陷物理在化合物半导体中如何表现？` },
  { sec: "7.17", title: "化合物半导体中的掺杂扩散", gist: R`GaAs 有两套亚晶格与四种本征点缺陷，Ga、As 自扩散相差悬殊；Zn、Be 经间隙机制扩散、$D\propto(p/n_i)^2$，IV 族施主经 Ga 空位扩散、$D\propto(n/n_i)^2$；SiC 中几乎不扩散，难点变成激活。`, gives: ["7.64", "7.65", "7.66", "7.67", "7.68", "7.69"], next: R`最后回到工艺：今天和未来用什么方法把杂质放进去？` },
  { sec: "7.18", title: "掺杂方法与全章小结", gist: R`离子注入仍是主力，RTP 退火抑制瞬态增强扩散；FinFET 时代沉积膜外扩散等老方法回归。全章要点：掺杂扩散由点缺陷介导，其浓度受温度、费米能级、注入损伤和表面过程共同改变。`, gives: [], next: R`第 8 章：离子注入，以及它带来的点缺陷与瞬态增强扩散。` },
];

// ---------- 推导图 ----------
export const EQMAP_SI = [
  { from: "7.53", to: "7.57", label: "质量作用定律" },
  { from: "7.55", to: "7.56", label: "可动通量 = 总通量" },
  { from: "7.56", to: "7.52", label: R`$D_{\rm A}=d_{\rm AI}kC_{\rm I}$` },
  { from: "7.57", to: "7.52", label: R`$D_{\rm A}/D_{\rm A}^*=C_{\rm I}/C_{\rm I}^*$` },
  { from: "7.57", to: "7.59", label: "链式法则" },
  { from: "7.58", to: "7.59", label: "代入" },
  { from: "7.54", to: "7.60", label: "复合达稳态" },
  { from: "7.60", to: "7.52", label: R`$C_{\rm V}/C_{\rm V}^*=C_{\rm I}^*/C_{\rm I}$` },
];
export const EQMAP_POLY = [
  { from: "7.63", to: "7.61", label: R`晶粒长大改变 $k_{\rm eff}$` },
  { from: "7.61", to: "7.62", label: R`交换项符号相反（守恒）` },
  { from: "7.66", to: "7.67", label: R`带电缺陷 → $(p/n_i)^2$` },
  { from: "7.68", to: "7.67", label: R`$D_{\rm Zn}^{++}(T)$` },
  { from: "7.64", to: "7.65", label: "不同数据集" },
  { from: "7.67", to: "7.69", label: R`n 型类比：Ga 空位` },
];
export const EQMAP_LABELS = {
  "7.52": "三流扩散模型", "7.53": "A + I ↔ AI", "7.54": "I–V 复合", "7.55": "可动物种的 Fick 定律", "7.56": "DC 积相等", "7.57": "质量作用定律",
  "7.58": "可动通量", "7.59": "梯度两项", "7.60": R`$C_{\rm I}C_{\rm V}=C_{\rm I}^*C_{\rm V}^*$`, "7.61": "晶粒内", "7.62": "晶界", "7.63": "晶粒长大",
  "7.64": "GaAs 自扩散", "7.65": "Ga 自扩散（另一拟合）", "7.66": "Be–间隙反应", "7.67": R`Zn：$(p/n_i)^2$`, "7.68": "Zn、Be 本征值", "7.69": R`IV 族：$(n/n_i)^2$`,
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "atom", label: "原子尺度机制" },
  { id: "pert", label: "点缺陷扰动与耦合" },
  { id: "mat", label: "多晶与化合物" },
];

export const concepts = [
  {
    id: "point_defect", name_zh: "点缺陷：空位与自间隙", name_en: "Point defects: V and I", icon: "⚛️", section_id: "7.12", group: "atom",
    plain: "晶格里少了一个原子（空位 V）或多挤进一个硅原子（自间隙 I）——掺杂原子挪窝全靠它们。",
    explain: R`替位掺杂原子与四个硅原子成键，自己几乎不可能直接跳到相邻格点：那里已经有原子。只有当旁边出现空位，或者一个多余的硅原子挤过来，它才有"一步"可走。所以掺杂扩散率本质上正比于（能与它相互作用的）点缺陷数量。

硅中点缺陷浓度极低：$10^{16}\,\mathrm{cm^{-3}}$ 的空位只让样品长度变化约 $0.7\times10^{-7}$，X 射线衍射测不出来。这正是硅不同于金属的地方，也是为什么只能用 OED/ORD 之类的"扰动实验"间接推断机制。`,
    analogy: "停车场停满了车，想挪动一辆，必须先有一个空车位（空位），或者一辆额外的车把它挤出去（自间隙）。",
    book_example: { what: R`§7.12：金属中空位多到 XRD 能测出晶格常数变化，硅中则不能（$\Delta L/L=\Delta V/3V$）。`, point: "硅中点缺陷少、看不见，只能从掺杂行为反推。" },
    misconception: "点缺陷不是“杂质”；它们是晶格自身的热平衡缺陷，浓度随温度指数变化，并会被氧化、氮化、注入等过程推离平衡。",
  },
  {
    id: "vacancy_mech", name_zh: "空位机制", name_en: "Vacancy mechanism", icon: "⬜", section_id: "7.12", group: "atom",
    plain: "掺杂原子与相邻空位换位；空位要绕个圈从另一侧回来，掺杂原子才真正前进。",
    explain: R`只做一次换位，空位就在掺杂原子身后，下一次很可能又换回去，没有净位移。只有空位离开、沿另一条路径回到掺杂原子的另一侧，才能完成一次有效跳跃：正方/面心类晶格中到第二近邻即可，金刚石晶格中必须走到第三近邻。掺杂–空位之间的结合能（库仑作用加上尺寸/弹性畸变）让空位不轻易走远，于是有效跳跃更容易。

大尺寸的 Sb 偏爱空位机制（$f_{\rm V}\approx0.98$）。`,
    analogy: "推箱子游戏：箱子（掺杂）只能推进空格，而你得绕到箱子另一侧才能继续推。",
    book_example: { what: R`图 7.24(a) 与本页三维动画中金刚石晶格的六元环路径。`, point: "空位机制的有效性取决于空位能否绕环回来，而不只是一次换位。" },
    misconception: "一次换位就等于扩散一步——错。没有“绕环”，掺杂原子只是来回振荡。",
  },
  {
    id: "interstitial_mech", name_zh: "间隙型机制：踢出与间隙–替位对", name_en: "Kick-out & interstitialcy", icon: "🦵", section_id: "7.12", group: "atom",
    plain: "自间隙硅把掺杂原子踢进间隙通道，或者与它结成对一起沿键方向走。",
    explain: R`**踢出（kick-out）**：自间隙硅占据掺杂原子的格点，掺杂原子变成间隙原子，沿开放的间隙通道随机行走，再踢出另一个硅原子回到替位位置。**间隙–替位对（interstitialcy）**：掺杂原子与一个硅原子分享一个格点，束缚对沿键方向迁移，分开时掺杂原子回到替位，释放出一个自间隙。

两种过程的起点都消耗一个自间隙、终点都放出一个自间隙，数学上几乎一样，文献（以及本书）统称"间隙辅助扩散"，写成 $\mathrm A+\mathrm I\leftrightarrow\mathrm{AI}$。B、P 几乎完全靠它（$f_{\rm I}\approx1$）。`,
    analogy: "在拥挤的地铁里，被人挤出座位后你在过道里走了一段，又把别人挤离座位坐下——座位上的人换了，你也挪了位置。",
    book_example: { what: R`图 7.24(b)(c)；式 (7.53) $\mathrm A+\mathrm I\leftrightarrow\mathrm{AI}$。`, point: "间隙型机制会“搬运”自间隙：在一处消耗，在另一处释放。" },
    misconception: "踢出与间隙–替位对在宏观模型中通常不加区分；区分它们的意义主要在原子尺度的物理图像上。",
  },
  {
    id: "fI", name_zh: "间隙份额 $f_{\\rm I}$", name_en: "Interstitial fraction", icon: "⚖️", section_id: "7.13", group: "atom",
    plain: R`把惰性扩散率拆成两部分：$f_{\rm I}$ 走间隙通道，$f_{\rm V}=1-f_{\rm I}$ 走空位通道。`,
    explain: R`扰动下的扩散率 $D_{\rm A}^{\rm eff}=D_{\rm A}^*(f_{\rm I}C_{\rm I}/C_{\rm I}^*+f_{\rm V}C_{\rm V}/C_{\rm V}^*)$：每条通道的贡献按"该种缺陷比平衡多了几倍"放大或缩小。表 7.4：Si 自扩散 0.6/0.4，B、P 1.0/0，As 0.4/0.6，Sb 0.02/0.98。

惰性条件下 $C_{\rm I}=C_{\rm I}^*$、$C_{\rm V}=C_{\rm V}^*$，括号等于 1，看不出 $f_{\rm I}$；只有扰动点缺陷（氧化、氮化）才能把两条通道"拆开"。`,
    analogy: "一家店有线上线下两个渠道。平时只看到总销量；只有某天线上平台搞促销（某种缺陷超饱和），才能从总销量的变化反推线上占几成。",
    book_example: { what: "表 7.4 与式 (7.52)。", point: "As 两条通道各占一半，所以氧化下它的变化介于 B 与 Sb 之间。" },
    misconception: R`$f_{\rm I}$ 不是"间隙原子占多少比例"，而是惰性扩散通量中由间隙机制完成的比例。`,
  },
  {
    id: "oed", name_zh: "OED / ORD 与氮化", name_en: "Oxidation-enhanced/retarded diffusion", icon: "🔥", section_id: "7.13", group: "pert",
    plain: "氧化注入自间隙：B、P 变快，Sb 变慢；氮化注入空位：效果正好相反。",
    explain: R`硅被氧化成 $\SiO$ 时体积膨胀约 30%（图 6.4），部分应力通过把硅原子挤成自间隙来释放，于是氧化界面向体内注入 I。证据：氧化诱生层错（由多余的间隙原子面构成）在氧化时长大，而且总与 OED 同时出现。注入的 I 又与 V 复合，使 $C_{\rm V}<C_{\rm V}^*$，于是 Sb 被阻滞。

氨气氮化在表面长出处于张应力的氮化层，注入空位：层错收缩，B、P 被阻滞，Sb 被增强。一增一减、两种气氛互为镜像，这套"无缝逻辑"确立了 I、V 双机制。`,
    analogy: "同一场大雨（氧化）让雨伞店生意兴隆、让冰淇淋店冷清——由此可以推断哪家店靠什么天气吃饭。",
    book_example: { what: "图 7.25（LOCOS 型对照结构）、图 7.26（B 的 OED 与 Sb 的 ORD 的 Athena 模拟）。", point: "同一实验中一增一减，才足以证明两种机制并存。" },
    misconception: "OED 不是氧化层“推”着杂质走，也不是温度更高——它完全来自点缺陷浓度的变化。",
  },
  {
    id: "recomb", name_zh: "I–V 复合与 $C_{\\rm I}C_{\\rm V}=C_{\\rm I}^*C_{\\rm V}^*$", name_en: "I–V recombination", icon: "💥", section_id: "7.14", group: "pert",
    plain: "一个自间隙碰上一个空位就互相湮灭；复合够快时，间隙多几倍，空位就少几倍。",
    explain: R`反应 $\mathrm I+\mathrm V\leftrightarrow\mathrm{Si_S}$ 的稳态（局域平衡）条件是 $C_{\rm I}C_{\rm V}=C_{\rm I}^*C_{\rm V}^*$。若复合很快，它随时成立，于是 $C_{\rm V}/C_{\rm V}^*=C_{\rm I}^*/C_{\rm I}$；若复合很慢（存在复合势垒），一种缺陷的超饱和不影响另一种。离子注入损伤中复合看来非常快——这将是第 8 章 TED 模型的关键假设。`,
    analogy: "正负电荷的中和：哪一种多出来，另一种就被“吃掉”相应的份额，乘积保持不变——就像半导体中的 $np=n_i^2$。",
    book_example: { what: "式 (7.54)、(7.60)；本页复合动力学的数值解。", point: "知道复合快慢，才能由 (7.52) 预测某种杂质在氧化下是增强还是阻滞。" },
    misconception: R`$C_{\rm I}C_{\rm V}=C_{\rm I}^*C_{\rm V}^*$ 不是热平衡（热平衡要求两者各自等于平衡值），而只是复合反应的稳态。`,
  },
  {
    id: "mobile_dc", name_zh: "可动物种与 $DC$ 积", name_en: "Mobile species & the DC product", icon: "🏃", section_id: "7.13", group: "pert",
    plain: R`极少数暂时可动的原子以极高速度迁移，造就了全体掺杂的缓慢移动：$D_{\rm A}C_{\rm A}=d_{\rm AI}C_{\rm AI}$。`,
    explain: R`真正在晶格里跑的是可动物种 AI，其浓度 $C_{\rm AI}\ll C_{\rm A}$、扩散率 $d_{\rm AI}\gg D_{\rm A}$。观测到的通量就是可动物种的通量，所以只有乘积相等，单个量并不相等。再用质量作用定律 $C_{\rm AI}=kC_{\rm A}C_{\rm I}$，立即得到 $D_{\rm A}=d_{\rm AI}kC_{\rm I}\propto C_{\rm I}$——这就是 (7.52) 中间隙项的微观来源。

比较掺杂与硅自扩散的 $DC$ 积可以判断：掺杂运动是否会把点缺陷推离平衡。`,
    analogy: "城市人口的迁移看似缓慢，其实是少数“正在搬家”的人在高速移动；总迁移量等于搬家人数乘以搬家速度。",
    book_example: { what: "式 (7.55)–(7.57)。", point: R`$D_{\rm A}$ 是表观量，$d_{\rm AI}$、$C_{\rm AI}$ 是看不见的微观量。` },
    misconception: R`$D_{\rm A}C_{\rm A}=d_{\rm AI}C_{\rm AI}$ 不意味着 $D_{\rm A}=d_{\rm AI}$。`,
  },
  {
    id: "pumping", name_zh: "化学泵浦：扭结加拖尾与发射极推进", name_en: "Chemical pumping", icon: "⛽", section_id: "7.13", group: "pert",
    plain: "高浓度磷向内扩散时“带着”自间隙走、在深处释放，造成体内间隙超饱和，反过来加速拖尾与下方基区的扩散。",
    explain: R`P 浓度高、扩散快：在表面附近 $\mathrm{P}+\mathrm I\to\mathrm{PI}$，PI 在深处分解 $\mathrm{PI}\to\mathrm P+\mathrm I$。若表面能维持 I 接近平衡，体内就会积累 I 的超饱和（模拟中约 40 倍），使 P 的拖尾异常加快，形成"扭结加拖尾"（kink-and-tail）分布；下方的硼基区也被加速，基区比预期更宽——发射极推进（emitter push）。温度越低效应越强，因为点缺陷自身的通量（激活能更高）跟不上掺杂通量。`,
    analogy: "一队搬运工从仓库门口不断把箱子运进深处卸下：门口的箱子有人及时清走，深处却越堆越多。",
    book_example: { what: "图 7.27（P 在 800 °C 的全耦合模拟，$C_{\rm I}/C_{\rm I}^*\approx40$）、图 7.28（发射极推进）。", point: "掺杂与点缺陷是双向耦合的：点缺陷改变扩散，扩散也改变点缺陷。" },
    misconception: "扭结加拖尾不是“两种不同的磷”，也不必靠两种扩散率去拟合；它是同一种磷与点缺陷耦合的自然结果。",
  },
  {
    id: "gradient", name_zh: "点缺陷梯度驱动与反短沟道效应", name_en: "Defect-gradient-driven diffusion & RSCE", icon: "⛰️", section_id: "7.13", group: "pert",
    plain: R`通量不只由掺杂梯度驱动，点缺陷梯度也能驱动——甚至让杂质"上坡"扩散。`,
    explain: R`把 $C_{\rm AI}=kC_{\rm A}C_{\rm I}$ 代入可动物种的 Fick 定律，链式法则给出两项：$-d_{\rm AI}kC_{\rm I}\partial C_{\rm A}/\partial x$（常规项）与 $-d_{\rm AI}kC_{\rm A}\partial C_{\rm I}/\partial x$（交叉项）。在点缺陷的源与汇附近，交叉项可能占主导：源/漏注入损伤放出大量 I，栅下表面是 I 的汇，I 梯度把沟道杂质推向表面，表面掺杂升高、阈值电压上升，而且沟道越短越明显——反短沟道效应（RSCE）。`,
    analogy: "人群不仅从拥挤处向空旷处散开，还会被“顺风”推着走——即使顺风方向人更多。",
    book_example: { what: "式 (7.59) 与图 7.29（Rafferty 的解释）。", point: "微观模型不只解释旧反常，还预言了新效应。" },
    misconception: "阈值电压随栅长缩短而上升并不违背 DIBL 物理；是沟道掺杂本身被点缺陷梯度重新分布了。",
  },
  {
    id: "self_diff", name_zh: "自扩散与激活能差", name_en: "Self-diffusion & activation energy", icon: "📉", section_id: "7.15", group: "pert",
    plain: "硅自扩散激活能约 4.8 eV，比掺杂（3–4 eV）高约 1 eV；降温时掺杂通量越来越“压倒”点缺陷。",
    explain: R`掺杂比硅本身更容易扩散，说明 III、V 族掺杂与点缺陷之间有额外的相互作用（库仑作用、尺寸引起的晶格弛豫——如替位 B 使周围晶格内缩约 12%、以及电荷转移），使缺陷更容易与掺杂结合或把它踢出。

后果：掺杂的 $DC$ 积（$D_{\rm A}^{\rm eff}C_{\rm A}=d_{\rm AI}C_{\rm AI}$）在低温下相对于点缺陷的 $d_{\rm I}C_{\rm I}^*$、$d_{\rm V}C_{\rm V}^*$ 越来越大，点缺陷来不及恢复平衡，全耦合效应（发射极推进、扭结加拖尾）就越强。`,
    analogy: "两条流水线速度对温度的敏感程度不同：降温时下游（点缺陷）慢得更多，上游（掺杂）送来的货就堆积起来。",
    book_example: { what: "§7.15；硅自扩散中 I、V 两种机制份额相近（表 7.4 中 0.6/0.4）。", point: "激活能之差决定了耦合效应随温度的变化方向。" },
    misconception: "自扩散慢不是因为点缺陷跑得慢；点缺陷本身扩散很快，只是数量极少。",
  },
  {
    id: "poly", name_zh: "多晶硅：晶界高速通道", name_en: "Grain-boundary fast diffusion", icon: "🧱", section_id: "7.16", group: "mat",
    plain: R`晶界扩散比晶粒内快约 $10^4$ 倍；杂质要先从晶粒内慢慢走到晶界，再沿晶界飞快地走远。`,
    explain: R`四个机制：晶界快速扩散、晶粒内扩散、晶粒与晶界之间的偏析、晶粒长大带来的输运。两股流模型 (7.61)(7.62) 分别追踪两种浓度，用 $k_{\rm eff}$ 描述交换、$s$ 描述偏析平衡；晶粒尺寸按 (7.63) 长大。晶粒越大，杂质要在晶粒内走得越远才能到晶界，所以表面峰更高、深处更少。最粗糙的做法是把体扩散率乘 100。`,
    analogy: "城市里的主干道（晶界）车速极快，但从小区（晶粒）开到主干道得先走慢速支路。",
    book_example: { what: "§7.16：As 注入多晶硅后 800 °C 氮气退火；式 (7.61)–(7.63)。", point: "多晶硅栅既要掺透到栅氧界面（避免多晶耗尽），又不能让杂质穿透薄栅氧。" },
    misconception: "多晶硅中的扩散不能用一个“有效扩散率”精确描述，因为晶粒尺寸、偏析和交换速率都在起作用。",
  },
  {
    id: "gaas", name_zh: "GaAs：两套亚晶格与平方律扩散", name_en: "GaAs sublattices & square-law diffusion", icon: "💎", section_id: "7.17", group: "mat",
    plain: R`Ga、As 各走各的亚晶格；p 型 Zn、Be 的扩散率 $\propto(p/n_i)^2$，IV 族施主 $\propto(n/n_i)^2$，产生箱形分布。`,
    explain: R`GaAs 有 Ga 空位、Ga 间隙、As 空位、As 间隙四种本征点缺陷和两种反位缺陷，浓度都依赖费米能级。Ga、As 自扩散相差约 7 个数量级（图 7.30），说明两者在各自亚晶格上独立扩散。p 型（II 族）沿 Ga 亚晶格经间隙机制扩散，n 型 VI 族沿 As 亚晶格，IV 族（Si、Ge、Sn）两性，经 Ga 空位扩散。平方律的浓度依赖使分布呈陡峭的箱形；低温时 Zn 的通量超过自间隙的恢复能力，出现与硅中磷类似的"踢出"拖尾。`,
    analogy: "两条平行的地铁线路（两个亚晶格），乘客（杂质）通常只坐自己那条线。",
    book_example: { what: "式 (7.64)–(7.69)、表 7.5、图 7.30–7.35。", point: "硅里学到的点缺陷语言可以原封不动地迁移到化合物半导体。" },
    misconception: "GaAs 中的扩散数据分散很大（如 7.64 与 7.65），常常源于 As 蒸气压没控制好，而不是测量误差。",
  },
];

export const relations = [
  { from: "point_defect", to: "vacancy_mech", label: "空位提供路径" },
  { from: "point_defect", to: "interstitial_mech", label: "自间隙提供路径" },
  { from: "vacancy_mech", to: "fI", label: R`$f_{\rm V}$` },
  { from: "interstitial_mech", to: "fI", label: R`$f_{\rm I}$` },
  { from: "oed", to: "fI", label: "扰动实验测出" },
  { from: "recomb", to: "oed", label: "解释 Sb 的 ORD" },
  { from: "interstitial_mech", to: "mobile_dc", label: "A + I ↔ AI" },
  { from: "mobile_dc", to: "gradient", label: "链式法则" },
  { from: "mobile_dc", to: "pumping", label: "AI 携带 I" },
  { from: "self_diff", to: "pumping", label: "低温更强" },
  { from: "point_defect", to: "gaas", label: "四种本征缺陷" },
  { from: "pumping", to: "gaas", label: "Zn 的拖尾" },
  { from: "point_defect", to: "poly", label: "晶粒内扩散" },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**掺杂原子靠点缺陷挪窝**：空位机制（掺杂与空位换位，空位须绕环回来）与间隙型机制（踢出、间隙–替位对，统称"间隙辅助"）。`}</TxI>,
  <TxI>{R`**三流模型**：$D_{\rm A}^{\rm eff}=D_{\rm A}^*(f_{\rm I}C_{\rm I}/C_{\rm I}^*+f_{\rm V}C_{\rm V}/C_{\rm V}^*)$；B、P 的 $f_{\rm I}\approx1$，Sb 的 $f_{\rm V}\approx0.98$，As 约各半。氧化注入 I（B、P 增强、Sb 阻滞），氮化注入 V（相反）。`}</TxI>,
  <TxI>{R`**I–V 复合**：快复合时 $C_{\rm I}C_{\rm V}=C_{\rm I}^*C_{\rm V}^*$，慢复合时互不影响；注入损伤中复合很快（第 8 章 TED 的前提）。`}</TxI>,
  <TxI>{R`**可动物种**：$D_{\rm A}C_{\rm A}=d_{\rm AI}C_{\rm AI}$，$C_{\rm AI}=kC_{\rm A}C_{\rm I}$ ⇒ 通量 $-d_{\rm AI}k(C_{\rm I}\partial_xC_{\rm A}+C_{\rm A}\partial_xC_{\rm I})$：点缺陷越多扩散越快，点缺陷有梯度也能驱动扩散（RSCE、上坡扩散）。`}</TxI>,
  <TxI>{R`**全耦合**：高浓度快扩散的 P 把自间隙“泵”入体内，产生扭结加拖尾与发射极推进；因自扩散激活能（约 4.8 eV）高于掺杂（3–4 eV），低温下效应更强。`}</TxI>,
  <TxI>{R`**多晶硅**：晶界快约 $10^4$ 倍，两股流模型 + 晶粒长大 $L_{\rm g}^2=L_{\rm go}^2+2\sigma t$。**GaAs**：两亚晶格独立，Zn/Be $\propto(p/n_i)^2$，IV 族 $\propto(n/n_i)^2$，箱形分布。**SiC**：几乎不扩散，需约 1700 °C 激活。**工艺**：注入 + RTP 为主，FinFET 时代沉积膜外扩散回归。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`在同一次干氧氧化中，下列哪种杂质的扩散最可能被阻滞？`,
    options: ["硼", "磷", "砷", "锑"],
    answer: 3, why: R`氧化注入自间隙；若 I–V 复合较快，$C_{\rm V}/C_{\rm V}^*<1$。Sb 的 $f_{\rm V}=0.98$，(7.52) 括号小于 1，扩散被阻滞（ORD）。`,
  },
  {
    q: R`为什么只做惰性气氛下的扩散实验，无法确定 $f_{\rm I}$？`,
    options: ["因为惰性气氛下点缺陷不存在", R`因为惰性条件下 $C_{\rm I}/C_{\rm I}^*=C_{\rm V}/C_{\rm V}^*=1$，(7.52) 的括号恒为 1，两条通道不可分辨`, "因为惰性气氛温度太低", "因为 SIMS 测不到点缺陷"],
    answer: 1, why: R`只有把点缺陷推离平衡（氧化、氮化），两项才会以不同倍数变化，从而把 $f_{\rm I}$ 与 $f_{\rm V}$ 拆开。`,
  },
  {
    q: R`若某次氧化使 $C_{\rm I}/C_{\rm I}^*=10$，且 I–V 复合很快，As（$f_{\rm I}=0.4$）的 $D^{\rm eff}/D^*$ 约为多少？`,
    options: ["0.4", "4.06", "10", "0.64"],
    answer: 1, why: R`$0.4\times10+0.6\times(1/10)=4+0.06=4.06$。`,
  },
  {
    q: R`式 (7.59) 中第二项 $-d_{\rm AI}kC_{\rm A}\,\partial C_{\rm I}/\partial x$ 解释了哪个现象？`,
    options: ["多晶硅耗尽", "反短沟道效应（掺杂向表面“上坡”扩散）", "SiC 难以激活", "Ga 与 As 自扩散的差异"],
    answer: 1, why: R`源/漏注入损伤是 I 的源、栅下表面是 I 的汇；I 的梯度驱动沟道掺杂向表面堆积，提高阈值电压。`,
  },
  {
    q: R`为什么磷的发射极推进效应在较低温度下更严重？`,
    options: ["低温下磷的固溶度更低", "硅自扩散激活能比掺杂高，低温下点缺陷的 $DC$ 积跟不上磷的 $DC$ 积，自间隙更易在体内堆积", "低温下氧化更快", "低温下 $f_{\\rm I}$ 变大"],
    answer: 1, why: R`激活能约 4.8 eV 对 3–4 eV：降温时自扩散通量下降更快，点缺陷无法及时消除磷“泵”入的超饱和。`,
  },
  {
    q: R`GaAs 中 Zn 扩散率 $\propto(p/n_i)^2$，这种浓度依赖会让退火后的分布呈现什么形状？`,
    options: ["高斯形", "余误差函数形", "前沿陡峭的箱形", "指数衰减形"],
    answer: 2, why: R`高浓度处扩散极快、低浓度处极慢，杂质迅速填平高浓度区并在前沿急剧截止，形成箱形分布（图 7.32）。`,
  },
];

export const BRIDGE = R`本章反复出现一个词：注入损伤。离子注入在把杂质送进晶格的同时，每次碰撞都撞出一对 I 和 V，产生远大于氧化的点缺陷超饱和；短时间内的 I–V 快速复合与剩余间隙（"+1 模型"），正是第 8 章瞬态增强扩散（TED）的出发点。下一章先讲注入本身——射程分布与阻止本领，再回到损伤、退火与 TED，届时 (7.52)、(7.57)、(7.60) 将再次登场。`;
