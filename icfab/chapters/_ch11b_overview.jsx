// 第 11 章（下）高层理解层：开场、路线图、推导图、核心概念、小结、自测与全书收束。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "晶体管只占一层，导线却有十几层";
export const HOOK = R`把一颗现代处理器沿纵向剖开，你会看到：所有晶体管挤在硅片表面不到 100 nm 的薄层里，而它们上方压着十几层铜导线，越往上越粗，像一座倒置的城市。最底层的导线只有 20 nm 宽——比铜中电子的平均自由程（39 nm）还窄；导线外面还得包一层 2–3 nm、几乎不导电的阻挡层，防止铜扩散进硅里杀死晶体管。每条导线是怎么"灌"进去的？铜不能刻蚀，只能电镀：在深宽比好几比一的沟槽里，金属必须从底部往上长，否则就会封口留下空洞。通电之后，每平方厘米上千万安培的电子流像风一样把铜原子吹走，导线会在几年后断开——除非你会算它的寿命。

而这还没完：当一颗芯片做不下整个系统时，人们把它拆成若干小芯粒，摆在一块布满硅通孔的硅中介层上，再把存储芯片一层层键合起来；存储芯片自己内部，则早已把上百层晶体管垂直地"盖"成了楼。本章（下）把这些都讲清楚，也为全书从硅锭到芯片的旅程画上句号。`;

export const ROADMAP = [
  { sec: "11.4.1", title: "金属–半导体接触", gist: R`热电子发射给出 $\rho_c=kT/qJ_0$，太大；把半导体掺到 $N_D\gtrsim5\times10^{19}$ 使势垒薄到几 nm，隧穿给出 $\rho_c\propto\exp(H\phi_B/\sqrt{N_D})$；费米能级钉扎让 $\phi_B$ 难以降低。`, gives: ["11.9", "11.11", "11.12", "11.15"], next: R`要让接触面积大、电阻低，就在硅表面长一层硅化物。` },
  { sec: "11.4.2", title: "硅化物：又一个 Deal–Grove", gist: R`自对准硅化物（salicide）只长在有硅的地方；生长遵循线性–抛物线律 \eqref{11.16}，(100) Si 上 $\mathrm{TiSi_{2}}$ 扩散限速；谁是扩散者决定是否横向侵蚀；应力通过 \eqref{11.19} 改变 $B$。`, gives: ["11.16", "11.17", "11.18", "11.19"], next: R`接触做好了，往上是铜导线——它怎么沉积？` },
  { sec: "11.4.3", title: "Cu 电镀与超填充", gist: R`法拉第定律 \eqref{11.22} 定膜厚，Tafel 关系 \eqref{11.23} 定工作区；共形沉积也会留缝，必须靠加速剂/抑制剂/整平剂实现自下而上的超填充。`, gives: ["11.20", "11.21", "11.22", "11.23"], next: R`导线做成了，它能用多久？` },
  { sec: "11.4.4", title: "电迁移", gist: R`电子风力 $F_{\rm wind}=Z^*q\rho J$ 驱动原子通量 \eqref{11.28}；通量散度产生空洞/小丘；寿命由 Black 方程 \eqref{11.30} 描述，Al 走晶界、Cu 走表面。`, gives: ["11.27", "11.28", "11.29", "11.30"], next: R`导线越来越细，R 与 C 还能降多少？` },
  { sec: "11.5", title: "未来：尺寸效应与新金属", gist: R`降 C 的极限是空气隙；降 R 受不缩的阻挡层与表面/晶界散射 \eqref{11.31} 拖累，$\rho_o\lambda$ 小、无需阻挡层的 Ru、Co 在最细的层上胜出。`, gives: ["11.31"], next: R`把所有要素放回一条完整流程。` },
  { sec: "11.6", title: "回看 CMOS 后道", gist: R`第 2 章 CMOS 的后道 14 步：接触孔、TiN/W 塞、CMP、四层介质叠层、先通孔后沟槽、去停止层、阻挡层、籽晶、电镀、CMP。`, gives: [], next: R`化合物半导体又是怎样解决"金属刻不动"的？` },
  { sec: "11.7", title: "化合物半导体后道：剥离", gist: R`MESFET/pHEMT 只需几层金属；多元金属叠层难刻，用剥离图形化，关键是倒梯形或钻蚀的胶剖面。`, gives: [], next: R`芯片做不下整个系统时怎么办？` },
  { sec: "11.8", title: "芯粒、中介层与三维集成", gist: R`把 SOC 拆成芯粒，经微凸点装在含 TSV 的硅中介层上（2.5D），再用混合键合垂直堆叠（3D）；单片三维的代表是数百层的 3D NAND。`, gives: [], next: R`收束全章与全书。` },
  { sec: "11.9", title: "要点小结", gist: R`后道从 Si/$\mathrm{SiO_{2}}$/Al 演变到多层 Cu/低 k 与先进封装，复杂度已与前道比肩。`, gives: [] },
];

export const EQMAP_CONTACT = [
  { from: "11.10", to: "11.9", label: "前因子 $RT^2$" },
  { from: "11.9", to: "11.11", label: "零偏求导" },
  { from: "11.12", to: "11.13", label: "势垒薄 → 隧穿" },
  { from: "11.14", to: "11.13", label: "隧穿常数 $H$" },
  { from: "11.13", to: "11.15", label: "零偏求导" },
  { from: "11.16", to: "11.17", label: "扩散限速" },
  { from: "11.16", to: "11.18", label: "反应限速" },
  { from: "11.19", to: "11.17", label: R`$B=2DC^*/N_1$` },
];
export const EQMAP_CU = [
  { from: "11.21", to: "11.22", label: R`每个 Cu 需 $n=2$ 个电子` },
  { from: "11.20", to: "11.22", label: "阳极补充离子" },
  { from: "11.23", to: "11.22", label: "电压 → 电流 → 速率" },
  { from: "11.27", to: "11.28", label: R`$\times$ 迁移率 $D/kT$ $\times$ 浓度` },
  { from: "11.29", to: "11.28", label: "热激活 $D$" },
  { from: "11.28", to: "11.30", label: "通量散度 → 空洞 → 寿命" },
  { from: "11.29", to: "11.30", label: R`同一个 $E_A$` },
  { from: "11.31", to: "11.27", label: R`细线 $\rho$ 增大` },
];
export const EQMAP_LABELS = {
  "11.9": "热电子发射 J–V", "11.10": "Richardson 常数", "11.11": R`$\rho_c=kT/qJ_0$`, "11.12": "耗尽区宽度", "11.13": "隧穿电流", "11.14": R`隧穿常数 $H$`,
  "11.15": "隧穿接触 $\\rho_c$", "11.16": "线性–抛物线生长", "11.17": "抛物线极限", "11.18": "线性极限", "11.19": "应力减慢扩散",
  "11.20": "阳极反应", "11.21": "阴极反应", "11.22": "法拉第定律", "11.23": "Tafel 方程",
  "11.27": "电子风力", "11.28": "电迁移通量", "11.29": "Arrhenius 扩散", "11.30": "Black 方程", "11.31": "细线有效电阻率",
};

export const groups = [
  { id: "fe", label: "接触与硅化物" },
  { id: "cu", label: "铜互连工艺" },
  { id: "rel", label: "可靠性与缩放" },
  { id: "pkg", label: "化合物、封装与三维" },
];

export const concepts = [
  {
    id: "contact", name_zh: "欧姆接触与比接触电阻", name_en: "Ohmic contact & specific contact resistivity", icon: "🔌", section_id: "11.4.1", group: "fe",
    plain: "让电流低损耗地从金属进入半导体：把半导体掺得极重，让电子隧穿而不是翻越势垒。",
    explain: R`金属与半导体之间有肖特基势垒 $\phi_B$。低掺杂时耗尽区宽，电子只能靠热激发翻越势垒（热电子发射），I–V 整流，$\rho_c=kT/qJ_0$ 大得不能用。重掺杂（$N_D\gtrsim5\times10^{19}\,\mathrm{cm^{-3}}$）把耗尽区压到 2–3 nm，电子直接隧穿，I–V 变成直线，$\rho_c=\rho_{co}\exp(H\phi_B/\sqrt{N_D})$。

衡量指标是比接触电阻率 $\rho_c$（$\Omega\,\mathrm{cm^2}$），接触电阻 $R_c=\rho_c/\text{面积}$。接触越小，$R_c$ 越大——所以先进节点上它成了总电阻里最难压的一项。`,
    analogy: "势垒像一堵墙：矮墙可以翻（热发射），但翻得过的人很少；把墙削得极薄，人就能直接'穿墙而过'（隧穿），不管墙多高。",
    book_example: { what: R`25 nm $\times$ 25 nm 的接触、$\rho_c=10^{-8}\,\Omega\,\mathrm{cm^2}$ 给出约 1.6 k$\Omega$（§11.4.1 例），与晶体管沟道电阻同量级。`, point: "接触电阻已不是可以忽略的'寄生'，而是主角之一。" },
    misconception: R`"换一种功函数合适的金属就能把 $\phi_B$ 做小"——费米能级钉扎让 $\phi_B$ 几乎与金属无关（表 11.3），只能靠提高掺杂或界面工程。`,
  },
  {
    id: "salicide", name_zh: "自对准硅化物", name_en: "Self-aligned silicide (salicide)", icon: "🧩", section_id: "11.4.2", group: "fe",
    plain: "整片沉积金属、退火，金属只在碰到硅的地方变成低阻硅化物，其余的再洗掉——不用光刻就对准了。",
    explain: R`Ti、Co、Ni 等金属与硅反应生成电阻率十几 $\mu\Omega\,\mathrm{cm}$ 的硅化物；氧化物侧墙和 STI 上没有硅源，金属不反应，随后用选择性腐蚀去掉。源漏和栅因此一次性"镀"上低阻层，接触面积也扩大到整个扩散区。

生长动力学与热氧化同构：$x_s^2/B+x_s/(B/A)=t+\tau$。$\mathrm{TiSi_{2}}$ 中 Si 是扩散者，新硅化物长在顶部，可能沿侧墙爬升造成短路；在 $\mathrm{N_{2}}$ 中退火，顶部同时生成的 TiN 能挡住这种横向侵蚀。`,
    analogy: "就像只在有面团的地方才会烤出面包皮：烤盘（氧化物）上的黄油不会变成面包皮，烤完一擦就掉。",
    book_example: { what: R`55 nm Ti 在 (100) Si 上 700 °C、30 s 退火，按 $x_s=\sqrt{Bt}$ 生成约 105 nm $\mathrm{TiSi_{2}}$，消耗 42 nm Ti（§11.4.2 例）。`, point: "Deal–Grove 模型在完全不同的材料体系中再次适用。" },
    misconception: "硅化物膜的应力不一定是张应力：虽然 $\\mathrm{TiSi_{2}}$ 反应体积缩小约 23%，实验上张、压应力都可能出现。",
  },
  {
    id: "dual_damascene", name_zh: "双大马士革工艺", name_en: "Dual damascene", icon: "🏛️", section_id: "11.6", group: "cu",
    plain: "先在介质里挖出通孔和沟槽，再一次性灌满铜、磨平——因为铜刻不动。",
    explain: R`Cu 没有挥发性的等离子体刻蚀产物，不能像 Al 那样"先铺满再刻掉多余的"。双大马士革反过来：沉积介质叠层（含刻蚀停止层），两次光刻分别刻出通孔与沟槽，共形沉积 TaN/Ta 阻挡层与 Cu 籽晶，电镀 Cu 一次填满通孔与沟槽，最后 CMP 磨掉表面多余的 Cu。

一个单元同时做出一层导线和其下的通孔，重复十几次就是整个后道。`,
    analogy: "大马士革镶嵌工艺：在金属器物表面刻出花纹，再嵌入金银丝、打磨平整。",
    book_example: { what: "图 11.44 的 a–n 十四步：W 塞之后，四层叠层 → 先通孔、后沟槽 → 去停止层 → 阻挡层 → 籽晶 → 电镀 → CMP。", point: "每一层材料的存在都有理由：停止层定深度，阻挡层防扩散，籽晶层作阴极。" },
    misconception: "双大马士革中的'双'不是做两层导线，而是一次填充同时形成通孔和沟槽两个层级。",
  },
  {
    id: "superfill", name_zh: "超填充（自下而上电镀）", name_en: "Superfilling / bottom-up plating", icon: "⬆️", section_id: "11.4.3", group: "cu",
    plain: "让沟槽底部长得比侧壁和顶部快，金属从下往上把孔填满，不留缝也不留洞。",
    explain: R`顶部快于底部会先封口留空洞；即使处处等速（共形），两侧壁在中线相遇也会留缝。物理上能让 A 点比 B 点电流大的只有三种原因：欧姆路径、浓度耗尽、反应速率常数——前两者都偏向顶部，只能用第三条：在镀液中加 ppm 级的加速剂、抑制剂、整平剂，局部改变电沉积速率常数。

加速剂小、扩散快，又在高曲率处富集（底部面积缩小时覆盖率上升）；抑制剂大、扩散慢，主要盖住场区与孔口。`,
    analogy: "往细长瓶子里灌沙子：若瓶口先被沙子搭桥堵住，瓶里就空了一截；要让沙子先落到瓶底，再一层层往上堆。",
    book_example: { what: "图 11.35 对比三种填充模式；图 11.36 右是填充进行到一半的实验剖面，底部已明显隆起。", point: "超填充是添加剂化学而非镀槽几何带来的。" },
    misconception: "'共形沉积就够了'——共形填充在两侧壁相遇处留下一条缝，同样是可靠性隐患。",
  },
  {
    id: "electromigration", name_zh: "电迁移与 Black 方程", name_en: "Electromigration & Black's equation", icon: "🌬️", section_id: "11.4.4", group: "rel",
    plain: "大电流的电子流像风一样把金属原子吹走，导线久而久之出现空洞断开或堆出小丘短路。",
    explain: R`电子风力 $F_{\rm wind}=Z^*q\rho J$，原子通量 $F=(DC/kT)Z^*q\rho J$。通量本身无害，通量的**散度**才造成原子亏损（空洞）或堆积（小丘）。寿命用 Black 方程 $\mathrm{MTTF}=AJ^{-n}\exp(E_A/kT)$ 描述，靠高温大电流加速测试、再外推到工作条件。

$E_A$ 取决于主导扩散路径：Al 走晶界（0.5–0.8 eV，加 Cu 钝化晶界可改善），Cu 走表面（约 0.9 eV，取决于顶面盖层与阻挡层）。`,
    analogy: "风沙地貌：风持续吹，沙丘迎风面被吹蚀、背风面堆积；导线中'风'是电子流，'沙'是金属原子。",
    book_example: { what: "1 mA 流过 100 nm $\\times$ 100 nm 的 M1 截面就是 $10^7\\,\\mathrm{A/cm^2}$；电迁移空洞常出现在 Cu 线顶面（图 11.39）。", point: "可靠性问题直接由工艺界面质量决定。" },
    misconception: "电迁移不是电场直接推动离子——电场力被电子屏蔽，起作用的是电子碰撞传递的动量，方向与电流相反。",
  },
  {
    id: "barrier", name_zh: "阻挡层与衬垫", name_en: "Diffusion barrier & liner", icon: "🛡️", section_id: "11.5", group: "rel",
    plain: "包在铜线外面的 2–4 nm TaN/Ta：防止铜扩散进介质和硅，并抑制铜的表面扩散。",
    explain: R`Cu 在 $\mathrm{SiO_{2}}$ 和 Si 中扩散极快，进入硅后形成深能级陷阱，必须用阻挡层封住；Cu 的电迁移以表面扩散为主，又需要衬垫改善界面。两者合计 2–4 nm，导电性远不如 Cu，且不能随线宽缩小。

线宽 40 nm 时它们只占截面一小部分；线宽 10 nm 时，2 nm 阻挡层就吃掉近一半截面。`,
    analogy: "保温杯的内胆壁厚不随杯子变小而变薄：杯子越小，能装水的比例越低。",
    book_example: { what: "10 nm、无需阻挡层的金属线可以胜过体电阻率低一半但需要 2 nm 阻挡层的金属线（§11.5）。", point: "细线竞争比的不是体电阻率，而是'有效导电截面 $\\times$ 有效电阻率'。" },
    misconception: "'阻挡层越薄越好'——太薄会失去阻挡作用或不连续，所以它有下限，正是这个下限让 Cu 在最细的层上失去优势。",
  },
  {
    id: "size_effect", name_zh: "电阻率尺寸效应", name_en: "Resistivity size effect", icon: "📉", section_id: "11.5", group: "rel",
    plain: "导线细到与电子平均自由程相当时，电子频繁撞表面和晶界，电阻率远高于块体值。",
    explain: R`一阶近似 $\rho_{\rm eff}=\rho_o+\rho_o\lambda\frac{3(1-p)}{4d}+\rho_o\lambda\frac{3R}{2D(1-R)}$。两个附加项都正比于 $\rho_o\lambda$——这才是细线时代的材料优值。Cu 的 $\rho_o$ 最低，但 $\lambda=39\,\mathrm{nm}$ 很长，$\rho_o\lambda=6.7\times10^{-16}\,\Omega\,\mathrm{m^2}$ 反而比 Ru、Rh、Ir、Pt 等大。

降低尺寸效应的手段：原子级平整的界面（提高镜面率 $p$）、大晶粒（$D\gtrsim10\lambda$）、低反射的晶界（孪晶界 $R\approx0.01$）。`,
    analogy: "在宽阔广场上走路很少撞人；挤进狭窄走廊，你会不停撞墙——走得快的人（平均自由程长）撞得最多。",
    book_example: { what: "表 11.8：Cu 的 $\\rho_o\\lambda=6.7$，Rh 只有 3.2（$\\times10^{-16}\\,\\Omega\\,\\mathrm{m^2}$）；图 11.43 imec 数据中 Ru、Co 等的电阻率随截面减小而上升。", point: "细线的最佳金属不一定是块体电阻率最低的金属。" },
    misconception: "尺寸效应不只来自表面：晶粒随线宽变小，晶界散射往往同样重要甚至更重要。",
  },
  {
    id: "lowk", name_zh: "低 k 与空气隙", name_en: "Low-k dielectrics & air gaps", icon: "🫧", section_id: "11.5", group: "rel",
    plain: "降低导线间电容的办法是降低介质的介电常数，极限是空气（K=1）。",
    explain: R`互连电容正比于介电常数 $K$。低 k 材料通过引入孔隙或有机成分降低 $K$，但 $K$ 越低机械强度越差，经不起 CMP 等工艺；一种做法是先用结实的牺牲材料完成工艺、最后换成低 k（图 11.23）。终极方案是在导线之间局部留下空气隙，Intel 14 nm 在两层金属中采用后 RC 改善约 17%（图 11.24）。`,
    analogy: "隔热材料越蓬松隔热越好，但也越一压就塌。",
    book_example: { what: "图 11.24：Intel 14 nm 的 M4、M6 层中白色的空气隙。", point: "降 C 的物理极限已经触手可及，进一步改进只能靠降 R 或改架构。" },
    misconception: "'空气隙可以处处使用'——它削弱机械支撑与散热，通常只用在少数关键层。",
  },
  {
    id: "liftoff", name_zh: "剥离工艺", name_en: "Lift-off", icon: "🎈", section_id: "11.7", group: "pkg",
    plain: "先做出带开口的胶，再整片镀金属，最后溶掉胶，把胶上的金属一起'抬走'，留下开口中的金属图形。",
    explain: R`适用于难以刻蚀的多元金属叠层（Ni/AuGe、Ti/Pt/Au 等），化合物半导体中广泛使用。关键是胶的侧壁不能被金属连续覆盖：要用倒梯形剖面（控制曝光的负胶）或双层胶下层过显影形成钻蚀，让金属在台阶处断开；沉积宜用方向性强的蒸发。`,
    analogy: "用模板刷漆：揭掉模板时，若漆把模板边缘和墙面连成一片，揭下来就会撕坏图案。",
    book_example: { what: "图 11.47 垂直侧壁无法剥离；图 11.48 负胶与双层胶两种解法。", point: "剥离是光刻、沉积与刻蚀原理的组合应用。" },
    misconception: "高分辨率光刻追求的垂直侧壁恰恰不适合剥离。",
  },
  {
    id: "chiplet", name_zh: "芯粒与 2.5D 集成", name_en: "Chiplets & 2.5D integration", icon: "🧱", section_id: "11.8", group: "pkg",
    plain: "不再把整个系统做在一颗大芯片上，而是拆成若干小芯粒，用硅中介层把它们高密度地连起来。",
    explain: R`好处：只在需要处用最贵的工艺；混用不同厂家、不同材料（GaN、SiC、光子）的芯片；小芯片良率高（良率随面积指数下降）；可单独升级。代价：芯粒之间的互连必须高性能——低 R、低 C——这正是后道技术的延伸；系统划分成为关键设计问题（AMD EPYC，图 11.51）。`,
    analogy: "与其浇筑一整栋楼，不如在工厂造好标准模块再现场拼装：坏一块换一块。",
    book_example: { what: "图 11.50 右与图 11.52：芯粒经微凸点装在含 TSV 的硅中介层上，中介层经焊料凸点装到封装上。", point: "封装正在变成'后道的后道'。" },
    misconception: "'芯粒只是传统多芯片模块换个名字'——硅中介层的布线密度比 PC 板高几个数量级，接近片上互连。",
  },
  {
    id: "tsv", name_zh: "硅通孔与混合键合", name_en: "TSV & hybrid bonding", icon: "🔩", section_id: "11.8", group: "pkg",
    plain: "穿透整片硅的铜柱（TSV）与芯片间直接的铜–铜键合，让芯片可以垂直堆叠并高密度互连。",
    explain: R`TSV 把中介层或芯片的正面电路与背面连通；堆叠芯片之间用晶圆–晶圆（或芯片–晶圆）键合实现"极高密度、高速"的垂直互连。混合键合同时键合介质与嵌在其中的 Cu 焊盘，间距可到微米级，远密于焊料微凸点。HBM 存储就是 DRAM 芯片用 TSV 堆叠的典型产品。`,
    analogy: "高楼里的电梯井：不必绕到楼外，就能直接在楼层之间上下。",
    book_example: { what: "图 11.52 中'very high density, high speed vertical interconnects'。", point: "垂直互连把导线长度从毫米缩到微米，RC 随之大降。" },
    misconception: "堆叠芯片不等于单片三维集成：前者是多片晶圆键合，后者是在同一片晶圆上逐层制造器件。",
  },
  {
    id: "nand3d", name_zh: "3D NAND", name_en: "3D NAND", icon: "🏢", section_id: "11.8", group: "pkg",
    plain: "把 NAND 存储串竖起来：沉积上百层叠层，刻出贯穿的竖孔，在孔里做沟道，每一层字线与沟道相交处就是一个存储单元。",
    explain: R`NAND 电路本来就是存储管串联，适合竖直排列。约 2013 年平面 NAND 微缩到头后转向 3D：交替沉积几十到几百层，用高度各向异性刻蚀打出深宽比数十的孔，再共形沉积电荷俘获层、隧穿层与多晶硅沟道，字线从阵列边缘的台阶处引出。

它是单片三维集成最成功的商业例子，全靠第 9、10 章的极限刻蚀与沉积技术。`,
    analogy: "从平房改成摩天楼：地皮（硅面积）不变，楼层越多，住户越多。",
    book_example: { what: "图 11.53：NAND 串的电路与垂直堆叠示意，以及三星 32 层 NAND 截面。", point: "密度提升从'缩小'转向'加层'。" },
    misconception: "3D NAND 不是把平面芯片堆起来，而是在同一片硅上一次性做出所有层的单元。",
  },
];

export const relations = [
  { from: "contact", to: "salicide", label: "硅化物扩大接触面积" },
  { from: "dual_damascene", to: "superfill", label: "要求无空洞填充" },
  { from: "superfill", to: "electromigration", label: "缝与空洞是失效起点" },
  { from: "barrier", to: "electromigration", label: "衬垫抑制表面扩散" },
  { from: "barrier", to: "size_effect", label: "不缩的截面损失" },
  { from: "size_effect", to: "electromigration", label: R`$\rho$ 增大，风力增大` },
  { from: "lowk", to: "dual_damascene", label: "低 k 需经受 CMP" },
  { from: "liftoff", to: "dual_damascene", label: "两种绕开金属刻蚀的办法" },
  { from: "chiplet", to: "tsv", label: "中介层用 TSV" },
  { from: "tsv", to: "nand3d", label: "两条三维路线" },
];

export const TAKEAWAYS = [
  <TxI>{R`**接触**：热电子发射接触 $\rho_c=kT/qJ_0$ 太大；重掺杂使 $x_D=\sqrt{2\varepsilon_S\phi_B/qN_D}$ 只剩几 nm，隧穿接触 $\rho_c=\rho_{co}\exp(H\phi_B/\sqrt{N_D})$；费米能级钉扎使 $\phi_B$ 几乎与金属无关。`}</TxI>,
  <TxI>{R`**硅化物**：自对准、只长在有硅处；生长服从 $x_s^2/B+x_s/(B/A)=t+\tau$；(100) Si 上 $\mathrm{TiSi_{2}}$ 扩散限速（$E_A=2.5\,\mathrm{eV}$）；硅为扩散者时有侧墙侵蚀风险；C49→C54 需约 800 °C。`}</TxI>,
  <TxI>{R`**电镀**：膜厚由法拉第定律 $W=ItA_W/nF$ 控制（3–15 mA/$\mathrm{cm^{2}}$ ↔ 约 0.1–0.4 µm/min），工作在 Tafel 区；共形填充会留缝，必须靠加速剂/抑制剂/整平剂实现超填充。`}</TxI>,
  <TxI>{R`**电迁移**：$F_{\rm wind}=Z^*q\rho J$，$\mathrm{MTTF}=AJ^{-n}e^{E_A/kT}$；Al 走晶界（0.5–0.8 eV），Cu 走表面（约 0.9 eV），界面工程决定寿命。`}</TxI>,
  <TxI>{R`**缩放**：降 C 的极限是空气隙；降 R 受 2–4 nm 不缩的阻挡层和尺寸效应 $\rho_{\rm eff}=\rho_o+\rho_o\lambda[\cdots]$ 拖累，$\rho_o\lambda$ 小、无需阻挡层的 Ru、Co 在最细层胜出。`}</TxI>,
  <TxI>{R`**集成**：双大马士革单元重复十几次构成后道；化合物半导体用剥离；系统层面转向芯粒 + 硅中介层（TSV）+ 混合键合堆叠，以及单片三维的 3D NAND。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`为什么不能靠挑选功函数合适的金属，把 Si 接触的势垒 $\phi_B$ 做得很小？`,
    options: ["功函数合适的金属都太贵", "界面态把费米能级钉扎在禁带中部附近，$\\phi_B$ 几乎与金属无关", "势垒高度只由掺杂决定", "Si 表面总有一层氧化物"],
    answer: 1, why: R`表 11.3 中功函数差别很大的硅化物，$\phi_{BN}$ 都在 0.55–0.87 V——这就是费米能级钉扎。因此只能靠提高掺杂让势垒变薄、走隧穿。`,
  },
  {
    q: R`隧穿接触的 $\rho_c\propto\exp(H\phi_B/\sqrt{N_D})$。掺杂浓度提高 4 倍，指数中的数值如何变化？`,
    options: ["变为 1/4", "变为 1/2", "变为 2 倍", "不变"],
    answer: 1, why: R`指数中是 $1/\sqrt{N_D}$：$N_D\times4$ ⇒ $\sqrt{N_D}\times2$ ⇒ 指数减半。若原来指数为 10（$e^{10}\approx2\times10^4$），现在为 5（$e^5\approx150$），$\rho_c$ 降两个多数量级。`,
  },
  {
    q: "在 (100) Si 上形成 $\\mathrm{TiSi_{2}}$，退火时间加倍，硅化物厚度大约如何变化？",
    options: ["加倍", "增大约 41%", "不变", "增大 4 倍"],
    answer: 1, why: R`(100) Si 上 $B/A$"很大"，扩散限速，$x_s\approx\sqrt{Bt}$；时间加倍，厚度乘以 $\sqrt2\approx1.41$（前提是 Ti 尚未耗尽）。`,
  },
  {
    q: "为什么完全共形的电镀也不能保证无缺陷地填满沟槽？",
    options: ["共形电镀速率太慢", "两侧壁以相同速率向中间推进，在中线相遇留下一条缝", "共形电镀会在底部留下空洞", "共形电镀无法覆盖侧壁"],
    answer: 1, why: R`共形时侧壁、底部同速，沟槽宽度先被两侧壁合拢，留下竖直的缝（seam）；只有底部明显快于侧壁的超填充才能自下而上无缝填满（图 11.35）。`,
  },
  {
    q: R`Black 方程中 Cu 互连 $n\approx1.2$。工作电流密度减半，MTTF 如何变化（温度不变）？`,
    options: ["约 1.2 倍", "约 2.3 倍", "约 4 倍", "不变"],
    answer: 1, why: R`$\mathrm{MTTF}\propto J^{-n}$，$J$ 减半 ⇒ MTTF 乘以 $2^{1.2}\approx2.3$。若 $n=2$（Al 常用），则为 4 倍。`,
  },
  {
    q: R`线宽缩到约 10 nm 时，Ru 可能胜过 Cu，主要原因是？`,
    options: ["Ru 的体电阻率低于 Cu", "Ru 不需要阻挡层，且 $\\rho_o\\lambda$ 更小，尺寸效应弱", "Ru 更容易电镀", "Ru 的电子平均自由程更长"],
    answer: 1, why: R`Ru 体电阻率是 Cu 的约 4.5 倍，但 Cu 要让出 2–4 nm 给不导电的阻挡层，且 $\lambda_{\rm Cu}=39\,\mathrm{nm}$ 使尺寸效应剧烈；Ru 的 $\lambda=10\,\mathrm{nm}$、无需阻挡层。`,
  },
];

export const BRIDGE = R`**全书收束：从硅锭到芯片。**回头看这条长长的工艺链：第 3 章从熔体中拉出近乎完美的单晶硅锭，切成晶圆；第 4 章在洁净室里与颗粒和金属沾污搏斗，用吸杂和良率模型为每一步把关；第 5 章用光刻把设计图形缩小投影到光刻胶上，分辨率由 $k_1\lambda/\mathrm{NA}$ 决定；第 6 章热氧化长出栅介质与隔离层（Deal–Grove）；第 7、8 章用扩散与离子注入把杂质放到该去的地方，并与点缺陷、瞬态增强扩散周旋；第 9 章用等离子体刻蚀与 CMP 把图形刻进材料、把表面磨平；第 10 章用 CVD、PVD、ALD 一层层沉积薄膜；第 11 章最终用接触、硅化物、十几层铜互连和先进封装把数十亿个晶体管连成一个系统。值得注意的是，同几个物理模型在不同章节反复出现：扩散–反应的 Deal–Grove 模型（氧化 → 硅化物）、Arrhenius 热激活（扩散、刻蚀、电迁移）、Fick 扩散与通量（掺杂、薄膜生长、电镀边界层）——掌握它们，就掌握了理解新工艺的钥匙。

**附录**汇集了全书反复使用的基础资料：平衡态半导体物理基础、单位前缀与换算、物理常数、硅与常用绝缘体的物理性质、热氧化膜颜色表、Irvin 曲线、误差函数表，以及重要符号与缩写表——做练习、查数据时可随时翻阅。`;
