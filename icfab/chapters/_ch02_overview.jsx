// 第 2 章高层理解层：开场、路线图、推导图、工艺流程地图、核心概念、小结与自测。
import { TxI, pageUrl } from "@kit";
import { CHN, CHT } from "./_ch02_xsec.jsx";

const R = String.raw;

export const HOOK_TITLE = "一个反相器，四十多道工序";
export const HOOK = R`手机处理器里有上百亿个晶体管，可它们全都是在同一片硅上"同时"做出来的：没有哪一道工序是为某一个晶体管单独做的。每一步要么对整片晶圆一视同仁（生长、沉积、刻蚀、退火、抛光），要么借一块掩模把"哪里要、哪里不要"的信息印上去（光刻）。把这些步骤按正确的顺序排起来，就是一条工艺流程（process flow）。

顺序为什么重要？举个例子：如果先把浅浅的源漏掺杂做好，再去做 1000 °C、10 分钟的阱推进退火，源漏杂质会扩散得面目全非；如果先放上高 k 介质和金属栅，再经历源漏激活退火，这层娇气的介质会被高温毁掉——业界正是在 45 nm 节点吃了这个亏，才转向"先做假栅、最后替换"的后栅流程。

本章沿着一枚 28 nm 平面 CMOS 反相器走完全程：从一块 100 美元的裸硅片，到隔离、阱、阈值调整、假栅、侧墙、源漏、应变、硅化物、替换金属栅，再到第一层铜互连；最后简要看看 22 nm 以后的 FinFET。每一步我们只讲"为什么在这里做、做了什么"，至于"它背后的物理与化学"，会链接到后面专门的章节。把这一章当作全书的地图。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "2.1", title: "为什么要看完整流程", gist: R`工艺步骤的顺序受"热历史"约束：后面的高温步骤会扰动前面做好的掺杂。选 28 nm 平面工艺（Intel 32 nm）作主线，最后介绍 FinFET。`, next: R`先看清楚终点长什么样。` },
  { sec: "2.2", title: "CMOS 结构：终点在哪里", gist: R`CMOS 反相器静态功耗近乎为零；与非门是通用门。终点截面：STI 隔开的 PMOS/NMOS，各在自己的阱里，上面是 W 接触与 Cu 互连。`, next: R`从起点出发：买什么样的硅片？` },
  { sec: "2.3", title: "选衬底", gist: R`直径、晶向 (100)、p 型、约 $10^{15}\,\mathrm{cm^{-3}}$（5–20 $\Omega\cdot$cm）；300 mm 片约 100 美元。`, next: R`第一件事：把将来的晶体管彼此隔离。` },
  { sec: "2.4", title: "浅沟槽隔离（STI）", gist: R`垫氧/氮化硅/光刻胶 → 刻槽 → 热氧化衬垫 → CVD 过填充 → CMP 停在氮化硅 → HF 控高 → 去氮化硅。`, next: R`隔离好的有源区里，先做"局部衬底"——阱。` },
  { sec: "2.5", title: "阱的形成", gist: R`两块掩模、两次注入（B 3 keV、P 10 keV，$10^{13}\,\mathrm{cm^{-2}}$），一次 1000 °C 退火同时完成推进、激活与修复。`, next: R`阱定下了体掺杂，表面掺杂还要微调。` },
  { sec: "2.6", title: "阈值调整注入", gist: R`在栅形成之前注入沟道区；阈值改变量 $\Delta V_{\rm TH}=qQ_i/C_{\rm ox}$。`, gives: ["2.1"], next: R`沟道掺杂定了，接下来做全片最关键的尺寸——栅。` },
  { sec: "2.7", title: "栅氧与多晶硅假栅", gist: R`重长栅氧、沉积多晶硅、最贵的一次光刻与高选择比刻蚀、再氧化。多晶硅只是占位的"假栅"。`, next: R`以栅为掩模，做源漏一侧的精细掺杂。` },
  { sec: "2.8", title: "LDD、halo 与源漏", gist: R`halo 斜角注入防穿通；以栅自对准做浅延伸区；共形沉积 + 各向异性回刻得到亚光刻侧墙；以侧墙自对准做深源漏；毫秒退火。`, next: R`90 nm 以后，光靠缩尺寸不够了，还要"挤一挤"沟道。` },
  { sec: "2.9", title: "沟道应变", gist: R`PMOS 源漏挖槽填 SiGe（压应变↑空穴迁移率），NMOS 填 Si:C（张应变↑电子迁移率）。`, next: R`器件本身完成，要把它"接出来"。` },
  { sec: "2.10", title: "接触：自对准硅化物", gist: R`溅射 Ti，低温 $\mathrm{N_2}$ 退火，只在有硅处生成 $\mathrm{TiSi_2}$，选择性去掉其余部分。`, next: R`45 nm：栅氧薄到漏电不可接受。` },
  { sec: "2.11", title: "高 k 金属栅（后栅）", gist: R`$C=K\varepsilon_0/d$：用大 $K$ 换厚 $d$。CMP 露出假栅 → 去多晶硅与栅氧 → ALD 高 k 叠层 → 分别设定 NMOS/PMOS 功函数 → 填充与 CMP。`, gives: ["2.2"], next: R`前道结束，进入后道互连。` },
  { sec: "2.12", title: "后道互连（BEOL）", gist: R`W 接触塞；低 k 介质中的双大马士革铜互连；ILD/Cu/CMP 循环十余层。`, next: R`22 nm 起，晶体管本身变成了三维。` },
  { sec: "2.13", title: "FinFET", gist: R`硬掩模定鳍 → 刻鳍 → 氧化物填充/CMP/露鳍 → 与鳍垂直的假栅 → 侧墙 → 刻鳍再外延 SiGe 菱形源漏 → 替换金属栅。`, next: R`最后：这只是众多可行流程中的一种。` },
  { sec: "2.14", title: "要点小结", gist: R`同一个终点可以有许多条工艺路线；仿真工具很有用，但只和其中的物理模型一样可靠。` },
];

// ---------- 推导图（本章只有两个编号公式） ----------
export const EQMAP = [{ from: "2.2", to: "2.1", label: R`取 $K=3.9$、$d=t_{\rm ox}$ 得 $C_{\rm ox}$` }];
export const EQMAP_LABELS = { "2.2": "栅电容（平板电容器）", "2.1": "阈值调整注入的阈值改变量" };

// ---------- 工艺流程地图：每一阶段 → 原书图 → 深入章节 ----------
export const FLOW = [
  { stage: "起点", steps: "选择硅片：直径、晶向、导电类型、掺杂浓度", sec: "2.3", figs: [], ch: ["ch03", "appA"] },
  { stage: "隔离（掩模 1）", steps: R`垫氧/氮化硅 → 光刻 → 刻槽 → 衬垫氧化 → CVD 填充 → CMP → HF → 去氮化硅`, sec: "2.4", figs: ["2.4", "2.5", "2.6"], ch: ["ch05", "ch06", "ch09", "ch10"] },
  { stage: "阱（掩模 2、3）", steps: "硼/磷注入 → 推进退火（固相外延修复损伤）", sec: "2.5", figs: ["2.7", "2.8"], ch: ["ch08", "ch07", "ch08b"] },
  { stage: "阈值（复用阱掩模）", steps: R`低剂量注入，$\Delta V_{\rm TH}=qQ_i/C_{\rm ox}$`, sec: "2.6", figs: ["2.9"], ch: ["ch08"] },
  { stage: "假栅（最关键的掩模）", steps: "栅氧 → 多晶硅 → 最关键光刻 → 高选择比刻蚀 → 再氧化", sec: "2.7", figs: ["2.10"], ch: ["ch05b", "ch06", "ch09", "ch10"] },
  { stage: "源漏（N/P 各一组掩模）", steps: "halo → 延伸区 → 侧墙 → 深源漏 → 毫秒退火", sec: "2.8", figs: ["2.11", "2.12", "2.13", "2.14", "2.15"], ch: ["ch08", "ch08b", "ch09", "ch10"] },
  { stage: "应变", steps: "SiGe:B / Si:C:P 选择性外延源漏", sec: "2.9", figs: [], ch: ["ch10"] },
  { stage: "硅化物", steps: R`Ti 溅射 → 退火 → 选择性去除`, sec: "2.10", figs: ["2.16"], ch: ["ch10", "ch11b"] },
  { stage: "替换金属栅", steps: R`ILD0/CMP → 去假栅 → ALD 高 k → 功函数金属 → Al/W 填充 → CMP`, sec: "2.11", figs: ["2.17", "2.18", "2.19", "2.20"], ch: ["ch06", "ch09", "ch10"] },
  { stage: "后道互连", steps: "接触孔 → W 塞 → 双大马士革 Cu → 循环", sec: "2.12", figs: ["2.23", "2.24", "2.25"], ch: ["ch09", "ch11", "ch11b"] },
  { stage: "FinFET", steps: "鳍 → 露鳍 → 假栅 → 侧墙 → 外延源漏 → 替换金属栅", sec: "2.13", figs: ["2.26", "2.27", "2.28", "2.29", "2.30", "2.31", "2.32"], ch: ["ch05b", "ch08b", "ch09", "ch10"] },
];
export function FlowMap() {
  return <div className="tb-table-wrap"><table className="tb-table" style={{ fontSize: 14 }}>
    <thead><tr><th>阶段</th><th>主要步骤</th><th>本章</th><th>深入</th></tr></thead>
    <tbody>{FLOW.map((f, i) => <tr key={i}>
      <td><b>{f.stage}</b></td><td><TxI>{f.steps}</TxI></td>
      <td><TxI>{`\\secref{${f.sec}}` + (f.figs.length ? "；" + f.figs.map(n => `\\figref{${n}}`).join(" ") : "")}</TxI></td>
      <td>{f.ch.map((c, j) => <span key={c}>{j ? " · " : ""}<a href={pageUrl(c)} title={CHT[c]}>{CHN[c]}</a></span>)}</td>
    </tr>)}</tbody>
  </table></div>;
}

// ---------- 核心概念 ----------
export const groups = [
  { id: "iso", label: "隔离与掺杂" },
  { id: "gate", label: "栅与源漏" },
  { id: "perf", label: "性能助推器" },
  { id: "int", label: "互连与三维器件" },
];
export const concepts = [
  {
    id: "flow", name_zh: "工艺流程与热预算", name_en: "Process flow & thermal budget", icon: "🧭", section_id: "2.1", group: "iso",
    plain: "工序的先后不是随意的：每一步高温都会让之前放进去的杂质再走一段路。",
    explain: R`扩散距离大致按 $\sqrt{Dt}$ 增长，而扩散系数 $D$ 随温度指数上升。一条流程中所有高温步骤的"$Dt$ 之和"叫做**热预算**（thermal budget）。所以工艺工程师总是把高温、长时间的步骤（阱推进 1000 °C、10 min）放在前面，把对扩散最敏感的浅结（源漏延伸区）放在后面，并用毫秒级退火来激活它们；对高温最怕的材料（高 k 介质、金属栅）干脆放到前道的最后。`,
    analogy: "像烤一个多层蛋糕：最需要长时间烘烤的底层先进烤箱，奶油装饰最后才放，否则会化掉。",
    book_example: { what: R`gate-first 高 k 流程让高 k 和金属栅经历后续全部高温，被证明行不通；业界转向 gate-last（替换金属栅）。`, point: "流程顺序本身就是一项关键设计。" },
    misconception: "以为只要每一步单独做好，拼起来就行——实际上后面的步骤会改写前面的结果。",
  },
  {
    id: "sti", name_zh: "浅沟槽隔离", name_en: "Shallow trench isolation (STI)", icon: "🧱", section_id: "2.4", group: "iso",
    plain: "在相邻晶体管之间挖一条浅槽、填满氧化物，让它们互不导通。",
    explain: R`STI 是本章第一个"组合拳"：薄垫氧缓冲应力，氮化硅既是刻蚀硬掩模、又是阻挡氧化的掩膜、还是 CMP 的停止层；沟槽先热氧化一薄层衬垫（得到最好的界面并圆化拐角），再用 CVD 氧化物过填充，最后用 CMP 磨平。热氧化时体积膨胀约 2.2 倍，会在拐角处产生应力，所以衬垫只长几纳米。`,
    analogy: "像在农田之间挖排水沟再填上不透水的黏土，各块田的水就不会互相渗漏。",
    book_example: { what: R`图 2.4–2.6：28 nm 工艺中沟槽宽约 30 nm、深约 35 nm、侧壁约 85°。`, point: "隔离区是'浪费'的面积，所以尽量做窄。" },
    misconception: "STI 不是 LOCOS：LOCOS 是在平面上长厚氧化层，会产生'鸟嘴'侵占有源区；STI 只长薄衬垫，主体靠沉积。",
  },
  {
    id: "well", name_zh: "阱与倒掺杂阱", name_en: "Wells (twin / retrograde)", icon: "🪣", section_id: "2.5", group: "iso",
    plain: "在同一块衬底上，为 NMOS 做一块 p 型'小地基'，为 PMOS 做一块 n 型'小地基'。",
    explain: R`双阱（twin-well）工艺用两块掩模分别注入硼和磷，再推进退火。选磷而不选砷/锑，是因为磷与硼的扩散系数几乎相同，两阱推进后深度对称。现代工艺常用多能量注入 + 短退火得到**倒掺杂阱**（retrograde well）：深处浓、表面淡，可降低结电容、抑制闩锁（latch-up）。`,
    analogy: "在一块大地上为两种植物分别铺上酸性土和碱性土的苗床。",
    book_example: { what: R`B 3 keV、P 10 keV，各 $10^{13}\,\mathrm{cm^{-2}}$；1000 °C 10 min 后硼表面浓度约 $9\times10^{17}\,\mathrm{cm^{-3}}$（图 2.8）。`, point: "注入定剂量、退火定深度。" },
    misconception: "阱的导电类型和其中晶体管的类型相反：NMOS 在 P 阱里，PMOS 在 N 阱里。",
  },
  {
    id: "implant", name_zh: "离子注入：剂量与射程", name_en: "Ion implantation: dose & range", icon: "🎯", section_id: "2.5", group: "iso",
    plain: "把杂质离子加速后'打'进硅里：能量决定打多深，束流乘以时间决定打多少。",
    explain: R`剂量 $Q$（$\mathrm{cm^{-2}}$）是浓度分布下的面积，可由束流精确计量；投影射程 $R_p$ 与离散 $\Delta R_p$ 由能量决定，首级近似下分布是高斯型，峰值约 $Q/(\sqrt{2\pi}\Delta R_p)$。代价是损伤：每个离子沿途撞出大量硅原子（电子阻止 + 核阻止），重离子甚至会把硅打成非晶，必须退火修复。`,
    analogy: "像往沙堆里扔铅弹：出手速度决定钻多深，扔多少颗决定多密，每颗都把沿途的沙粒撞得乱七八糟。",
    book_example: { what: R`Shockley 的原始专利主张的其实是"修复损伤的退火"；有综述称注入是"精巧、昂贵却粗暴"的掺杂方法。`, point: "注入 = 精确可控 + 必然带来损伤。" },
    misconception: "注入不是'在表面涂一层再扩散进去'——峰值可以在表面以下，从而做出倒掺杂分布。",
  },
  {
    id: "anneal", name_zh: "退火：激活、修复、扩散", name_en: "Annealing & TED", icon: "🔥", section_id: "2.8", group: "iso",
    plain: "一次加热同时做三件事：把杂质放到替位位置（激活）、把晶格修好、让杂质扩散。",
    explain: R`损伤层下方的完好晶体充当"籽晶"，非晶层逐层重新结晶，称为**固相外延**（SPE）。麻烦在于注入损伤会使杂质在一段时间内异常快速地扩散——**瞬态增强扩散**（TED）。TED 在高温下反而较弱，所以浅结用 RTA/闪光退火这类"高温、极短时间"的处理。`,
    analogy: "像熨衣服：温度高、动作快，褶皱消了，布料却来不及缩水。",
    book_example: { what: R`阱推进 1000 °C 10 min（图 2.8）；源漏激活 1000 °C 20 ms（图 2.15）。`, point: "同样 1000 °C，时间差了四个数量级，用途完全不同。" },
    misconception: "降低退火温度未必减少扩散：低温下 TED 更显著。",
  },
  {
    id: "selfalign", name_zh: "自对准", name_en: "Self-alignment", icon: "📐", section_id: "2.8", group: "gate",
    plain: "让已经做好的结构本身充当下一步的掩模，于是两者天然对齐。",
    explain: R`源漏与栅边缘之间若有重叠，会增加交叠电容；若有间隙，沟道连不上。以栅为掩模注入，源漏就自动对准栅边缘——这就是**自对准多晶硅栅**工艺的精髓，也是源漏要在栅之后才做的原因。同样的思想出现在侧墙（深源漏对准侧墙外缘）和自对准硅化物（只在有硅的地方生成）中。`,
    analogy: "用已经贴好的胶带当模板来刷漆，边缘自然整齐，不需要再量。",
    book_example: { what: R`图 2.12（延伸区对准栅边）、图 2.14（深源漏对准侧墙）、图 2.16（硅化物只长在硅上）。`, point: "自对准把关键尺寸从'套准精度'中解放出来。" },
    misconception: "自对准不等于不需要掩模：选择 NMOS/PMOS 区仍要用光刻胶，只是边缘由栅决定。",
  },
  {
    id: "spacer", name_zh: "侧墙", name_en: "Sidewall spacer", icon: "🧽", section_id: "2.8", group: "gate",
    plain: "共形沉积一层膜，再竖直地均匀刻掉同样厚度，台阶侧面就留下一条窄墙。",
    explain: R`共形薄膜在台阶侧壁处的竖直厚度是"台阶高 + 膜厚"，而平面处只有膜厚。各向异性回刻在竖直方向均匀推进：平面清干净时，侧壁处剩下底宽约等于膜厚 $t$ 的侧墙。它的尺寸由薄膜厚度（可控到纳米）决定，与光刻无关。`,
    analogy: "雪后用推土机把路面推平，墙根底下总会留下一溜雪。",
    book_example: { what: R`图 2.13：10 nm 氮化硅形成约 10 nm 宽的侧墙；第 5 章将看到同一思想用于多重图形化。`, point: "无需光刻就能得到亚光刻尺寸。" },
    misconception: "侧墙宽度不由回刻时间精确控制，而主要由沉积膜厚决定。",
  },
  {
    id: "ldd", name_zh: "LDD 延伸区与 halo", name_en: "LDD extensions & halo", icon: "🌙", section_id: "2.8", group: "gate",
    plain: "在漏端放一段浅而略淡的过渡区降低电场；在栅边缘下塞一个与阱同型的'口袋'防止穿通。",
    explain: R`电源电压不再随尺寸等比例下降（亚阈区摆幅不能缩小），沟道电场越来越强，热载流子可越过 3.2 eV 的 $\mathrm{Si/SiO_2}$ 导带势垒注入栅介质，造成可靠性问题。LDD 让漏电压降落在更长的距离上；由于这类损伤随电场指数变化，小幅降场就很有效。halo（pocket）以约 25° 倾角、4 次旋转注入，局部提高沟道掺杂，抑制短沟道效应。`,
    analogy: "LDD 像楼梯的缓坡，把一级陡台阶拆成两级；halo 像在门口加一道门槛。",
    book_example: { what: R`图 2.11：halo 剂量每次 $5\times10^{12}\,\mathrm{cm^{-2}}$；图 2.12：延伸区 As 1.5 keV / B 300 eV、$10^{15}\,\mathrm{cm^{-2}}$。`, point: "这些剖面无法直接测量，只能靠工艺/器件仿真优化。" },
    misconception: "halo 的掺杂类型与源漏相同——错，它与阱/沟道同型。",
  },
  {
    id: "strain", name_zh: "应变工程", name_en: "Strain engineering", icon: "🗜️", section_id: "2.9", group: "perf",
    plain: "用晶格常数不同的材料做源漏，把沟道'挤'或'拉'，从而让载流子跑得更快。",
    explain: R`Ge 的晶格常数比 Si 大约 4.2%，嵌入源漏的 $\mathrm{Si_{1-x}Ge_x}$ 沿电流方向压缩沟道，提高空穴迁移率；C 原子小，Si:C 产生张应变，提高电子迁移率。外延在 750–850 °C 进行，正好是 TED 最强的温区，所以之前要先用闪光退火稳定延伸区；外延时不能用光刻胶，要用氮化硅硬掩模，并加 HCl 保证只在硅上生长。`,
    analogy: "像拧紧吉他弦：张紧程度改变了'弦'（能带）的性质，声音（迁移率）随之改变。",
    book_example: { what: R`90 nm 节点引入；Ge 含量从 20% 逐代提高到 60%（图 2.22 的 TEM 中可见 SiGe 源漏）。`, point: "不缩小尺寸也能提高性能的'助推器'。" },
    misconception: "压应变对空穴有利、对电子不利；NMOS 需要相反（张）的应变。",
  },
  {
    id: "hkmg", name_zh: "高 k 金属栅与后栅", name_en: "High-K / metal gate, gate-last (RMG)", icon: "🛡️", section_id: "2.11", group: "perf",
    plain: "换用介电常数更大的栅介质，在电容不变的前提下把它做厚，隧穿漏电就降下来了。",
    explain: R`由 \eqref{2.2}，$C=K\varepsilon_0/d$：$K$ 增大几倍，$d$ 就能增厚几倍而电容不变；而直接隧穿电流随厚度指数下降。高 k（$\mathrm{HfO_2}$）怕高温，所以采用**后栅**流程：先用多晶硅假栅完成所有高温步骤，再 CMP 露出、挖掉假栅，用 ALD 沉积高 k 和功函数金属，最后填充、抛光。`,
    analogy: "同样的防水效果，用一层更'致密'的材料就可以做得更厚、更不容易被戳穿。",
    book_example: { what: R`图 2.21：65 nm 的 1.2 nm $\mathrm{SiO_2}$ 与 45 nm 的 3.0 nm 高 k。`, point: "45 nm 节点 Intel 首先量产，打破了'栅氧厚度极限'。" },
    misconception: "高 k 不是为了提高电容本身，而是为了在同样电容下做厚、降漏电。",
  },
  {
    id: "damascene", name_zh: "大马士革互连", name_en: "Damascene (inlaid) interconnect", icon: "🕸️", section_id: "2.12", group: "int",
    plain: "铜刻不动，就先在介质里挖好槽和孔，把铜'镶'进去，再把多余的磨掉。",
    explain: R`等离子刻蚀要求反应产物可挥发，而铜与常用刻蚀气体不生成挥发性产物，所以铜互连只能'镶嵌'：沉积 ILD → 两次光刻刻出通孔与沟槽（借助刻蚀停止层）→ 溅射 TaN/TiN 阻挡层与 Cu 籽晶 → 电镀 Cu → CMP。铜是硅中的少子寿命杀手，阻挡层不可或缺。低 k 介质（掺 F/C 的氧化物）用来减小线间电容。`,
    analogy: "像古代大马士革的金银错工艺：先在铁器上刻出花纹凹槽，再把金丝嵌进去磨平。",
    book_example: { what: R`图 2.24–2.25；IBM 1997 年首先引入铜互连；现代芯片有十余层金属，越往上越粗。`, point: "CMP 从'粗糙'的磨盘工艺变成了后道的核心。" },
    misconception: "铜互连不是'先沉积铜再刻蚀成线'——那是旧的铝互连做法。",
  },
  {
    id: "finfet", name_zh: "FinFET", name_en: "FinFET (tri-gate)", icon: "🦈", section_id: "2.13", group: "int",
    plain: "把沟道竖起来做成一片'鳍'，让栅从左、右、上三面包住它。",
    explain: R`平面器件的栅只从上面控制沟道，短沟道下源漏会"绕过"栅漏电。FinFET 的鳍很薄，三面受栅控制，关态漏电显著降低；单位版图宽度的有效沟道宽度为 $(2H_{\rm fin}+W_{\rm fin})/P_{\rm fin}$，可以大于 1。代价是三维工艺：鳍宽靠多重图形化、源漏掺杂靠刻鳍再外延（倾角注入有阴影问题）、高 k/金属栅要在三维表面上共形沉积。`,
    analogy: "把一条平铺的水管竖起来贴墙放：占地更少，而且可以用手从两边和上面同时捏住它。",
    book_example: { what: R`Intel 22 nm（2011）首先量产；图 2.33 是三家公司 14 nm FinFET 的截面。UTB-SOI 竞争者因只有单一沟道，驱动电流约为 FinFET 的一半。`, point: "器件竞争看三条轴：$I_{\rm ON}$、$I_{\rm OFF}$、制造复杂度（良率与成本）。" },
    misconception: "FinFET 不只是'栅包两边'的双栅：主流做法顶面也导电（三栅）。",
  },
];
export const relations = [
  { from: "flow", to: "anneal", label: "热预算" },
  { from: "sti", to: "well", label: "隔离后做阱" },
  { from: "implant", to: "well", label: "注入定剂量" },
  { from: "implant", to: "anneal", label: "损伤需退火" },
  { from: "selfalign", to: "ldd", label: "以栅为掩模" },
  { from: "spacer", to: "selfalign", label: "深源漏对准侧墙" },
  { from: "ldd", to: "anneal", label: "毫秒退火" },
  { from: "strain", to: "hkmg", label: "45 nm 两者并用" },
  { from: "flow", to: "hkmg", label: "高 k 怕高温 → 后栅" },
  { from: "hkmg", to: "damascene", label: "CMP 思想" },
  { from: "spacer", to: "finfet", label: "多重图形化定鳍" },
  { from: "hkmg", to: "finfet", label: "三维共形 ALD" },
];

export const TAKEAWAYS = [
  <TxI>{R`**流程逻辑**：先隔离（STI）、再做阱与阈值（高温在前）、再做栅（光刻最小尺寸）、再以栅/侧墙为掩模自对准地做源漏（浅结在后、毫秒退火）、最后替换金属栅与互连。顺序由**热预算**和**自对准**两条原则决定。`}</TxI>,
  <TxI>{R`**STI**：氮化硅一身三职（刻蚀硬掩模、氧化阻挡层、CMP 停止层）；衬垫靠热氧化（体积膨胀约 2.2 倍，只长薄层），填充靠 CVD，平坦化靠 CMP。`}</TxI>,
  <TxI>{R`**掺杂**：注入的剂量可精确计量、射程由能量决定；损伤靠退火（SPE）修复；推进用长时间高温，源漏用高温极短时间以避开 TED。阈值调整 $\Delta V_{\rm TH}=qQ_i/C_{\rm ox}$。`}</TxI>,
  <TxI>{R`**亚光刻技巧**：侧墙（共形沉积 + 各向异性回刻）、自对准延伸区、halo 斜角注入，让关键尺寸小于光刻能做到的最小尺寸。`}</TxI>,
  <TxI>{R`**性能助推器**：应变（SiGe 压应变给 PMOS、Si:C 张应变给 NMOS）、自对准硅化物（降低源漏电阻）、高 k 金属栅（$C=K\varepsilon_0/d$，用大 $K$ 换厚 $d$ 抑制隧穿）。`}</TxI>,
  <TxI>{R`**后道**：W 接触塞 + 双大马士革 Cu（铜无法等离子刻蚀）+ 低 k 介质，ILD/Cu/CMP 循环十余层。`}</TxI>,
  <TxI>{R`**FinFET**：三面栅控、$W_{\rm eff}$ 可超过版图宽度；流程沿用 STI、假栅、侧墙、外延源漏、RMG 的思想，但每一步都要在三维表面上完成。同一终点可有多条流程路线，仿真只与其模型一样可靠。`}</TxI>,
];

export const QUIZ = [
  { q: "为什么源漏注入安排在多晶硅栅刻蚀之后，而阈值调整注入安排在栅形成之前？",
    options: ["源漏注入能量太高，必须由栅挡住才能控制深度", "源漏要以栅为掩模自对准以减小交叠电容；阈值注入若穿过栅会损伤薄栅介质", "阈值注入需要高温，而源漏注入不需要", "两者顺序可以任意交换"],
    answer: 1, why: R`源漏对准栅边缘才能把交叠电容降到最小（自对准）；阈值调整要掺在栅下沟道里，在栅形成前直接注入，就不必让离子穿过多晶硅与仅约 2 nm 的栅氧。` },
  { q: "STI 工艺中氮化硅层没有承担下面哪一项任务？",
    options: ["沟槽刻蚀的硬掩模", "阻挡氧/水汽，使衬垫氧化只发生在沟槽里", "CMP 的停止层", "为沟道提供张应变以提高电子迁移率"],
    answer: 3, why: "STI 中的氮化硅是硬掩模、氧化阻挡层和抛光停止层；应变来自 §2.9 的外延源漏，这里的氮化硅最后会被热磷酸去掉。" },
  { q: R`共形沉积 $t=10$ nm 氮化硅后做各向异性回刻，回刻深度恰好等于 10 nm 时，栅侧墙的底宽约为多少？`,
    options: ["约 2 nm", "约 10 nm", "约等于栅高", "取决于光刻分辨率"],
    answer: 1, why: R`平面处刚好清干净时，侧壁处剩余薄膜的底宽等于沉积膜厚 $t$（可用 §2.8 的侧墙交互图验证）。` },
  { q: R`把栅介质从 $K=3.9$ 的 $\mathrm{SiO_2}$ 换成 $K\approx20$ 的 $\mathrm{HfO_2}$，保持栅电容不变，物理厚度约变为原来的多少？`,
    options: ["1/5", "不变", "约 5 倍", "约 25 倍"],
    answer: 2, why: R`由 $C=K\varepsilon_0/d$，$C$ 不变时 $d\propto K$，$20/3.9\approx5.1$。隧穿电流随厚度指数下降，所以漏电大幅降低。` },
  { q: "为什么铜互连采用大马士革（镶嵌）工艺，而不是像铝那样先沉积再刻蚀成线？",
    options: ["铜太硬，无法被刻蚀气体腐蚀", "铜与常用刻蚀气体不生成挥发性产物，难以等离子刻蚀", "铜的电阻率比铝高", "铜在高温下会熔化"],
    answer: 1, why: "等离子刻蚀依赖挥发性反应产物把材料带走；铜做不到，于是先在介质里挖槽、再填铜、最后 CMP。" },
  { q: R`鳍高 42 nm、鳍宽 8 nm、鳍间距 42 nm 的 FinFET，单位版图宽度的有效沟道宽度约为平面器件的多少倍？`,
    options: ["约 0.5 倍", "约 1 倍", "约 2.2 倍", "约 10 倍"],
    answer: 2, why: R`$(2H_{\rm fin}+W_{\rm fin})/P_{\rm fin}=(84+8)/42\approx2.2$。这正是 FinFET 在同样面积内提供更大驱动电流的原因之一（另一原因是更好的栅控）。` },
];

export const BRIDGE = R`本章把整条流程"走"了一遍，许多步骤只说了"做什么"。从下一章开始逐个拆开：第 3 章回到起点——那片几乎完美的硅晶圆是怎样从多晶硅料长成单晶、切片、抛光出来的，(100) 晶面、杂质分凝、氧和碳又是怎么回事。之后的第 4 章讲洁净室与良率，第 5 章起依次是光刻、氧化、扩散、注入、刻蚀/CMP、沉积和互连——每一章都对应本章流程中的若干步骤，可随时回到这里的搭建器找到它们的位置。`;
