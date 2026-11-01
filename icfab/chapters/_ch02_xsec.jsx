// 第 2 章：平面 28 nm CMOS 工艺的参数化截面模型（自绘；不使用原书图片）。
// 同一套多边形数据同时驱动：① 二维 SVG 截面（图 2.2、2.4–2.19、2.23–2.25 的自绘版）；② Three.js 分步搭建器（沿纸面法向拉伸）。
// 坐标：x 为横向位置（nm，0–280，左 PMOS、右 NMOS，与原书一致）；z 为深度（nm，硅表面 z=0，向下为正，与原书纵轴一致）。
import { TxI } from "@kit";

const R = String.raw;

// ---------------- 材料与配色（全章统一） ----------------
// 约定：Si 灰、SiO2 浅蓝、Si3N4 绿、多晶硅红棕、金属金/橙、光刻胶紫；n 型掺杂蓝色、p 型掺杂红色（半透明叠加）。
export const MAT = {
  si: { n: "单晶硅 Si", c: "#c9c9c9" },
  pr: { n: "光刻胶", c: "#a88bd8" },
  tox: { n: R`热氧化 $\mathrm{SiO_2}$`, c: "#8fbfe0" },
  ox: { n: R`CVD 氧化物 $\mathrm{SiO_2}$`, c: "#bcdaf0" },
  nit: { n: R`氮化硅 $\mathrm{Si_3N_4}$`, c: "#86c58a" },
  poly: { n: "多晶硅（假栅）", c: "#9a5a3a" },
  ti: { n: "钛 Ti", c: "#7d8088" },
  tisi: { n: R`硅化物 $\mathrm{TiSi_2}$`, c: "#4f5058" },
  hfo: { n: R`高 k 介质 $\mathrm{HfO_2}$`, c: "#e8c547" },
  tin: { n: "TiN（功函数/阻挡层）", c: "#b0895a" },
  tan: { n: "TaN（刻蚀停止/阻挡层）", c: "#6f5a3e" },
  al: { n: "铝 Al（栅填充）", c: "#e3cf8f" },
  w: { n: "钨 W（接触塞）", c: "#c39a46" },
  cu: { n: "铜 Cu（M1）", c: "#d9782d" },
  lowk: { n: "低 k 层间介质 ILD", c: "#d6e8f5" },
  es: { n: "刻蚀停止层", c: "#9ed9c4" },
  sige: { n: "SiGe:B（压应变源漏）", c: "#77aca5" },
  sic: { n: "Si:C:P（张应变源漏）", c: "#b5ae76" },
  nw: { n: "N 阱（n 型）", c: "rgba(40,100,215,0.16)", dope: 1 },
  pw: { n: "P 阱（p 型）", c: "rgba(215,65,45,0.15)", dope: 1 },
  nl: { n: "n 型浅掺杂（阈值调整/halo/延伸区）", c: "rgba(40,100,215,0.38)", dope: 1 },
  pl: { n: "p 型浅掺杂（阈值调整/halo/延伸区）", c: "rgba(215,65,45,0.36)", dope: 1 },
  np: { n: R`$\mathrm{N^+}$ 源漏（As）`, c: "rgba(30,80,200,0.62)", dope: 1 },
  pp: { n: R`$\mathrm{P^+}$ 源漏（B）`, c: "rgba(205,45,35,0.58)", dope: 1 },
};

// 章节链接用到的章号显示
export const CHN = { ch03: "第 3 章", ch04: "第 4 章", ch05: "第 5 章（上）", ch05b: "第 5 章（下）", ch06: "第 6 章", ch07: "第 7 章（上）", ch07b: "第 7 章（下）", ch08: "第 8 章（上）", ch08b: "第 8 章（下）", ch09: "第 9 章", ch10: "第 10 章", ch11: "第 11 章（上）", ch11b: "第 11 章（下）", appA: "附录" };
export const CHT = { ch03: "晶体生长与晶圆", ch04: "洁净与良率", ch05: "光刻基础", ch05b: "分辨率增强", ch06: "热氧化与界面", ch07: "宏观扩散", ch07b: "原子尺度扩散", ch08: "离子注入", ch08b: "注入损伤与退火", ch09: "刻蚀与 CMP", ch10: "薄膜沉积", ch11: "互连 RC", ch11b: "互连工艺", appA: "常数与图表" };

// ---------------- 工艺步骤（平面 28 nm 高 k 金属栅 CMOS） ----------------
// fig：对应原书图号（左/右/上/下面板）；ch：深入讲解的章节；imp：注入（离子、能量、剂量、倾角、遮挡侧）
export const PSTEPS = [
  { id: "wafer", sec: "2.3", t: "起始晶圆", proc: "购入抛光片", mat: R`p 型 (100) 硅，掺硼约 $10^{15}\,\mathrm{cm^{-3}}$`, d: R`300 mm 晶圆约 100 美元；除 O、C 外杂质在 ppt 量级。选 (100) 是为了得到缺陷最少的 $\mathrm{Si/SiO_2}$ 界面。`, ch: ["ch03", "ch06"] },
  { id: "stack", sec: "2.4", t: "垫氧 + 氮化硅 + 光刻胶", proc: "热氧化；LPCVD 氮化硅；旋涂光刻胶", mat: R`$\mathrm{SiO_2}$ / $\mathrm{Si_3N_4}$ / 光刻胶`, d: R`薄垫氧缓冲应力；氮化硅不能靠"氮化"长出来，只能用 $\mathrm{SiH_2Cl_2}+\mathrm{NH_3}$ 低压化学气相沉积。`, ch: ["ch06", "ch10"], fig: "2.4" },
  { id: "litho", sec: "2.4", t: "第 1 块掩模：有源区光刻，刻蚀氮化硅/垫氧", proc: "193 nm 光刻 + 等离子刻蚀", mat: "光刻胶图形", d: R`沟槽宽度接近最小尺寸（约 28–30 nm），因为隔离区是"浪费"的面积。`, ch: ["ch05", "ch09"], fig: "2.4 左" },
  { id: "trench", sec: "2.4", t: "硅沟槽刻蚀（约 85° 倾角）", proc: R`含氟等离子刻蚀（$\mathrm{CF_4}$ 等）`, mat: "Si", d: "碳沉积与氟刻蚀相互竞争，得到略倾斜的侧壁，避免尖角处电场集中。", ch: ["ch09"], fig: "2.4 右" },
  { id: "liner", sec: "2.4", t: "去胶，热氧化衬垫层", proc: R`$\mathrm{H_2SO_4/H_2O_2}$ 或 $\mathrm{O_2}$ 等离子去胶；800 °C 干氧 30 min`, mat: R`约 5 nm 热氧化 $\mathrm{SiO_2}$`, d: "氮化硅阻挡氧化，只有沟槽内被氧化（LOCOS 思想）；热氧化给出最好的界面并圆化拐角。", ch: ["ch06"], fig: "2.5 左" },
  { id: "fill", sec: "2.4", t: "CVD 氧化物过填充", proc: R`LPCVD（$\mathrm{SiH_4}+\mathrm{O_2}$）`, mat: R`沉积 $\mathrm{SiO_2}$`, d: "必须无空洞地填满沟槽；侧壁越陡越难。", ch: ["ch10"], fig: "2.5 右" },
  { id: "cmp", sec: "2.4", t: "CMP 抛光，停在氮化硅上", proc: "化学机械抛光", mat: "—", d: "坚硬的氮化硅充当抛光停止层。", ch: ["ch09"], fig: "2.6 上左" },
  { id: "hf", sec: "2.4", t: "HF 回刻：露出氮化硅、控制台阶高度", proc: "稀 HF 湿法刻蚀", mat: "—", d: "热磷酸只刻氮化硅、不刻氧化物，所以先用 HF 清掉氮化硅表面残留氧化物。", ch: ["ch09"], fig: "2.6 上右" },
  { id: "nitstrip", sec: "2.4", t: "热磷酸去氮化硅：STI 完成", proc: R`$\mathrm{H_3PO_4}$ 湿法刻蚀`, mat: "—", d: "得到平坦的、被氧化物沟槽隔开的有源区。", ch: ["ch09"], fig: "2.6 下" },
  { id: "pwell", sec: "2.5", t: "第 2 块掩模：P 阱硼注入", proc: "离子注入，光刻胶遮挡 PMOS 区", mat: R`B，3 keV，$10^{13}\,\mathrm{cm^{-2}}$`, d: "可用较便宜的光刻机（mix and match）。注入同时造成晶格损伤。", ch: ["ch08"], fig: "2.7 左", imp: { lab: R`硼注入`, mask: "p" } },
  { id: "nwell", sec: "2.5", t: "第 3 块掩模：N 阱磷注入", proc: "离子注入，光刻胶遮挡 NMOS 区", mat: R`P，10 keV，$10^{13}\,\mathrm{cm^{-2}}$`, d: "选磷而不是砷/锑：磷与硼扩散系数几乎相同，两阱推进后深度对称。", ch: ["ch08", "ch07"], fig: "2.7 右", imp: { lab: R`磷注入`, mask: "n" } },
  { id: "drive", sec: "2.5", t: "推进退火（1000 °C，10 min）", proc: "炉管退火", mat: "—", d: "一次退火做三件事：推进扩散到所需深度、激活杂质、通过固相外延修复损伤。", ch: ["ch07", "ch08b"], fig: "2.8" },
  { id: "vtp", sec: "2.6", t: "PMOS 阈值调整注入（磷）", proc: "离子注入，光刻胶遮挡 NMOS", mat: R`P，15 keV，$6\times10^{12}\,\mathrm{cm^{-2}}$`, d: R`在栅形成之前注入，避免离子穿过栅、损伤薄栅介质；$\Delta V_{\rm TH}=qQ_i/C_{\rm ox}$。`, ch: ["ch08"], fig: "2.9 左", imp: { lab: R`磷注入`, mask: "n" } },
  { id: "vtn", sec: "2.6", t: "NMOS 阈值调整注入（硼）", proc: "离子注入，光刻胶遮挡 PMOS", mat: R`B，5 keV，$6\times10^{12}\,\mathrm{cm^{-2}}$`, d: "随后短时退火修复损伤，剖面基本不动。", ch: ["ch08"], fig: "2.9 右", imp: { lab: R`硼注入`, mask: "p" } },
  { id: "gox", sec: "2.7", t: "去氧化层，重长栅氧，沉积多晶硅", proc: "HF 去氧；热氧化；LPCVD 多晶硅（硅烷）", mat: R`栅氧 $<2$ nm；多晶硅`, d: "栅氧长完立刻沉积多晶硅以免沾污；多晶硅只是后面会被替换的“假栅”。", ch: ["ch06", "ch10"] },
  { id: "gate", sec: "2.7", t: "最关键的光刻：多晶硅栅图形化与刻蚀", proc: "最贵的光刻 + 高选择比各向异性刻蚀", mat: "多晶硅", d: R`栅长是全片最小的光刻尺寸（略小于 28 nm）；必须停在不到 2 nm 的栅氧上。`, ch: ["ch05b", "ch09"], fig: "2.10 左" },
  { id: "reox", sec: "2.7", t: "多晶硅再氧化（800 °C，干氧 30 min）", proc: "热氧化", mat: R`$\mathrm{SiO_2}$`, d: "钝化多晶硅侧壁；所有氧化层都略微增厚。", ch: ["ch06"], fig: "2.10 右" },
  { id: "halon", sec: "2.8", t: "NMOS halo 斜角注入（硼）", proc: R`倾角 $25^\circ$，4 次 $90^\circ$ 旋转`, mat: R`B，5 keV，每次 $5\times10^{12}\,\mathrm{cm^{-2}}$`, d: "在栅边缘下方加一个与阱同型的“口袋”，抑制源漏间的亚表面穿通。", ch: ["ch08"], fig: "2.11 左", imp: { lab: "硼 halo", mask: "p", tilt: 25 } },
  { id: "halop", sec: "2.8", t: "PMOS halo 斜角注入（磷）", proc: R`倾角 $25^\circ$，4 次旋转`, mat: R`P，15 keV，每次 $5\times10^{12}\,\mathrm{cm^{-2}}$`, d: "4 次旋转保证 x、y 两个方向的晶体管都被同样注入。", ch: ["ch08"], fig: "2.11 右", imp: { lab: "磷 halo", mask: "n", tilt: 25 } },
  { id: "extn", sec: "2.8", t: "NMOS 浅延伸区（LDD）注入：砷", proc: "以栅为掩模的自对准注入", mat: R`As，1.5 keV，$10^{15}\,\mathrm{cm^{-2}}$`, d: "自对准于栅边缘，因横向散射与后续扩散略伸入栅下。", ch: ["ch08"], fig: "2.12 左", imp: { lab: "砷注入", mask: "p" } },
  { id: "extp", sec: "2.8", t: "PMOS 浅延伸区注入：硼", proc: "自对准注入", mat: R`B，300 eV，$10^{15}\,\mathrm{cm^{-2}}$`, d: "延伸区使漏端电场分布在更长距离上，减轻热载流子问题。", ch: ["ch08"], fig: "2.12 右", imp: { lab: "硼注入", mask: "n" } },
  { id: "spdep", sec: "2.8", t: "共形沉积 10 nm 氮化硅", proc: "LPCVD（共形）", mat: R`$\mathrm{Si_3N_4}$`, d: "共形薄膜在台阶侧壁处的“竖直厚度”等于台阶高度加膜厚。", ch: ["ch10"], fig: "2.13 左" },
  { id: "spetch", sec: "2.8", t: "各向异性回刻：侧墙形成", proc: "定向等离子刻蚀，无需光刻", mat: R`$\mathrm{Si_3N_4}$ 侧墙`, d: "平面处被清掉，侧壁处留下宽度约等于膜厚的侧墙——亚光刻尺寸的特征。", ch: ["ch09", "ch05b"], fig: "2.13 右" },
  { id: "sdn", sec: "2.8", t: "NMOS 深源漏注入：砷", proc: "HF 去氧、长屏蔽氧化层后注入", mat: R`As，3 keV，$3\times10^{15}\,\mathrm{cm^{-2}}$`, d: "自对准于侧墙外缘；屏蔽氧化层使离子方向随机化，防止沟道效应。", ch: ["ch08"], fig: "2.14 左", imp: { lab: "砷注入", mask: "p" } },
  { id: "sdp", sec: "2.8", t: R`PMOS 深源漏注入：硼（或 $\mathrm{BF_2}$）`, proc: "离子注入", mat: R`B，600 eV，$3\times10^{15}\,\mathrm{cm^{-2}}$`, d: "注入也进入多晶硅假栅，但它以后会被拿掉，不必关心其中的剖面。", ch: ["ch08"], fig: "2.14 右", imp: { lab: "硼注入", mask: "n" } },
  { id: "rta", sec: "2.8", t: "毫秒级闪光退火（1000 °C，20 ms）", proc: "RTA / 闪光退火", mat: "—", d: "高温短时：修复损伤同时尽量不扩散；低温反而会因瞬态增强扩散（TED）而扩散更多。", ch: ["ch08b"], fig: "2.15" },
  { id: "sige", sec: "2.9", t: "PMOS 源漏凹槽 + 原位掺硼 SiGe 外延", proc: R`氮化硅硬掩模；干法挖槽；$\mathrm{SiH_2Cl_2/GeH_4/B_2H_6/HCl}$ 选择性外延，750–850 °C`, mat: R`$\mathrm{Si_{1-x}Ge_x}$:B（$x$ 从 20% 增至 60%）`, d: "Ge 原子比 Si 大，SiGe 源漏把沟道“挤压”，压应变提高空穴迁移率。HCl 提供选择性。", ch: ["ch10"] },
  { id: "sic", sec: "2.9", t: "NMOS 源漏凹槽 + 原位掺磷 Si:C 外延", proc: "第二次氮化硅硬掩模 + 选择性外延", mat: "Si:C:P", d: "C 原子小，产生张应变，提高电子迁移率。", ch: ["ch10"] },
  { id: "ti", sec: "2.10", t: "溅射 Ti", proc: "Ar 离子溅射（基本共形）", mat: "Ti", d: "接下来在低温（350–450 °C）$\mathrm{N_2}$ 中退火。", ch: ["ch10"], fig: "2.16 左" },
  { id: "silicide", sec: "2.10", t: R`退火成 $\mathrm{TiSi_2}$，湿法去除 TiN/未反应 Ti`, proc: R`低温退火（$\mathrm{N_2}$）+ 选择性湿刻`, mat: R`$\mathrm{TiSi_2}$`, d: "只在有硅可反应处成硅化物（自对准硅化物），降低源漏薄层电阻。", ch: ["ch11b"], fig: "2.16 右" },
  { id: "ild0", sec: "2.11", t: "沉积厚氧化层，CMP 到多晶硅顶", proc: "CVD + CMP", mat: R`$\mathrm{SiO_2}$`, d: "后栅（gate-last）流程的第一步：把假栅顶部露出来。", ch: ["ch10", "ch09"], fig: "2.17 左" },
  { id: "polyrm", sec: "2.11", t: "去除多晶硅假栅", proc: "对栅氧高选择比的等离子刻蚀", mat: "—", d: "留下一个以侧墙为壁的“栅槽”。", ch: ["ch09"], fig: "2.17 右" },
  { id: "goxrm", sec: "2.11", t: "湿法去除假栅氧，长 <1 nm 化学氧化层", proc: "湿法刻蚀 + 化学氧化", mat: "—", d: "露出裸硅沟道，随即形成极薄界面层以稳定界面。", ch: ["ch06"], fig: "2.18 左" },
  { id: "hk", sec: "2.11", t: R`ALD 高 k 叠层：界面氧化层 / $\mathrm{HfO_2}$ / TiN / TaN`, proc: "原子层沉积（两种前驱体交替、表面自限制）", mat: R`$\mathrm{HfO_2}$ 2–3 nm；TiN 盖层；TaN 刻蚀停止层`, d: "高 k 介质较不稳定，所以放到前道的最后一步才引入。", ch: ["ch10", "ch06"], fig: "2.18 右" },
  { id: "tin", sec: "2.11", t: "厚 TiN（设 PMOS 功函数），在 NMOS 中刻掉", proc: "沉积 + 光刻胶遮挡 PMOS + 刻蚀（停在 TaN 上）", mat: "TiN", d: "两种晶体管需要不同的栅金属功函数。", ch: ["ch09"], fig: "2.19 左" },
  { id: "al", sec: "2.11", t: "Al 填充 + CMP：替换金属栅（RMG）完成", proc: "沉积 + CMP；约 400 °C 退火调功函数", mat: "Al（设 NMOS 功函数并填充）", d: "前道（FEOL）到此结束。", ch: ["ch10", "ch09"], fig: "2.19 右" },
  { id: "ct", sec: "2.12", t: "接触孔光刻与刻蚀", proc: "光刻 + 氧化物等离子刻蚀，停在硅化物上", mat: "—", d: "栅接触一般做在有源区外（见图 2.3）；新工艺用自对准接触。", ch: ["ch09"], fig: "2.23 左" },
  { id: "w", sec: "2.12", t: "TiN 阻挡层 + CVD 钨填充 + CMP", proc: "溅射 + CVD + CMP", mat: "W 接触塞", d: "W 过填充后抛光，只留下孔中的“钨塞”。", ch: ["ch10", "ch11b"], fig: "2.23 右" },
  { id: "dama", sec: "2.12", t: "沉积 ILD，双大马士革刻蚀（通孔 + 沟槽）", proc: "PECVD 低 k 介质；两次光刻 + 刻蚀（借助刻蚀停止层）", mat: "掺 F/C 的低 k 氧化物", d: "铜很难被等离子刻蚀（无挥发性产物），所以先在介质里挖好槽。", ch: ["ch11b", "ch09"], fig: "2.24 左" },
  { id: "cu", sec: "2.12", t: "阻挡层 + Cu 籽晶 + 电镀 Cu + CMP：M1 完成", proc: "溅射 TaN/TiN 与 Cu 籽晶；电镀；CMP", mat: "Cu", d: "铜是少子寿命“杀手”，阻挡层和低温控制至关重要。之后 ILD/Cu/CMP 循环十余层。", ch: ["ch11b", "ch11"], fig: "2.24 右、2.2、2.25" },
];
export const PI = Object.fromEntries(PSTEPS.map((s, i) => [s.id, i]));

// ---------------- 几何工具 ----------------
export const rect = (x0, z0, x1, z1) => [[x0, z0], [x1, z0], [x1, z1], [x0, z1]];
function arcPts(cx, cz, r, a0, a1, n = 8) { const o = []; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; o.push([cx + r * Math.cos(a), cz - r * Math.sin(a)]); } return o; }
// 顶部两角为圆角的矩形（zt 在上，zb 在下）
function roundTop(x0, zt, x1, zb, r) { return [[x0, zb], ...arcPts(x0 + r, zt + r, r, Math.PI, Math.PI / 2), ...arcPts(x1 - r, zt + r, r, Math.PI / 2, 0), [x1, zb]]; }
// 底部两角为圆角的矩形（掺杂区）
function roundBot(x0, zt, x1, zb, r) { return [[x0, zt], [x1, zt], ...arcPts(x1 - r, zb - r, r, 0, -Math.PI / 2), ...arcPts(x0 + r, zb - r, r, -Math.PI / 2, -Math.PI)]; }
function ellipse(cx, cz, rx, rz, n = 20) { return Array.from({ length: n }, (_, i) => { const a = 2 * Math.PI * i / n; return [cx + rx * Math.cos(a), cz + rz * Math.sin(a)]; }); }
// 侧墙：内侧竖直、外侧上端为四分之一圆
function spacer(xIn, side, zt, zb, w) { const xo = xIn + side * w; return side > 0 ? [[xIn, zb], [xIn, zt], ...arcPts(xIn, zt + w, w, Math.PI / 2, 0), [xo, zb]] : [[xIn, zb], [xo, zb], ...arcPts(xIn, zt + w, w, Math.PI, Math.PI / 2), [xIn, zt]]; }
// 沟槽形 STI 填充：顶 zt，表面处半宽 hw，深 D，侧壁内收 tp
function trench(xc, zt, hw, D, tp = 3) { return [[xc - hw - 1, zt], [xc + hw + 1, zt], [xc + hw + 1, 0], [xc + hw, 0], [xc + hw - tp, D], [xc - hw + tp, D], [xc - hw, 0], [xc - hw - 1, 0]]; }
// U 形衬垫层：外缘 (hw+a, D+a)，内缘 (hw-b, D-b)
function liner(xc, hw, D, a, b, tp = 3) { return [[xc - hw - a, 0], [xc - hw - a + tp, D + a], [xc + hw + a - tp, D + a], [xc + hw + a, 0], [xc + hw - b, 0], [xc + hw - b - tp, D - b], [xc - hw + b + tp, D - b], [xc - hw + b, 0]]; }
// 从顶面挖出若干台阶形凹槽的平板：notches=[[{a,b,z},{a,b,z}…]]（由外到内逐级变窄、逐级加深）
function notched(x0, x1, zt, zb, notches) {
  const p = [[x0, zt]];
  for (const lv of [...notches].sort((u, v) => u[0].a - v[0].a)) {
    for (const l of lv) { const last = p[p.length - 1]; p.push([l.a, last[1]], [l.a, l.z]); }
    for (let i = lv.length - 1; i >= 0; i--) { const l = lv[i]; p.push([l.b, l.z], [l.b, i ? lv[i - 1].z : zt]); }
  }
  p.push([x1, zt], [x1, zb], [x0, zb]);
  return p;
}
// 栅槽内的共形薄膜：偏移 o 处的表面链（cmp=true 时只取槽内部分）
const ZT = -32, HL = 12;   // ILD0 顶面、栅半长
function chain(o, gates, x0, x1, cmp) {
  const p = cmp ? [] : [[x0, ZT - o]];
  for (const g of gates) p.push([g - HL + o, cmp ? ZT : ZT - o], [g - HL + o, -o], [g + HL - o, -o], [g + HL - o, cmp ? ZT : ZT - o]);
  if (!cmp) p.push([x1, ZT - o]);
  return p;
}
const film = (o1, o2, gates, x0, x1, cmp) => [...chain(o1, gates, x0, x1, cmp), ...chain(o2, gates, x0, x1, cmp).reverse()];
// 仅保留 x∈[a,b]（Sutherland–Hodgman，对两条竖线裁剪）
function clipX(poly, a, b) {
  const clip = (P, inside, cut) => { const o = []; for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length], ip = inside(p), iq = inside(q); if (ip) o.push(p); if (ip !== iq) o.push(cut(p, q)); } return o; };
  const at = x => (p, q) => [x, p[1] + (q[1] - p[1]) * (x - p[0]) / (q[0] - p[0])];
  return clip(clip(poly, p => p[0] >= a, at(a)), p => p[0] <= b, at(b));
}
function clipZtop(poly, zt) {   // 只保留 z ≥ zt（CMP 磨平）
  const o = []; for (let i = 0; i < poly.length; i++) { const p = poly[i], q = poly[(i + 1) % poly.length], ip = p[1] >= zt, iq = q[1] >= zt; if (ip) o.push(p); if (ip !== iq) o.push([p[0] + (q[0] - p[0]) * (zt - p[1]) / (q[1] - p[1]), zt]); } return o;
}

export const GATES = [70, 210];                 // PMOS、NMOS 栅中心
const ACT = [[15, 125], [155, 265]];             // 有源区
const SD = [[15, 46], [94, 125], [155, 186], [234, 265]];   // 侧墙外缘到 STI 的源漏区
const CT = [[22, 42], [98, 118], [162, 182], [238, 258]];   // 接触孔

// ---------------- 第 k 步的截面 ----------------
// 返回 [{m, p}]，按绘制顺序（后画者在上）。
export function planar(k) {
  const at = id => k >= PI[id], bf = id => k < PI[id];
  const L = [], add = (m, p, tag) => p && L.push({ m, p, tag });
  const nStage = at("drive") ? 2 : at("pwell") ? 1 : 0;
  // --- 硅衬底（沟槽刻蚀后带缺口） ---
  add("si", at("trench") ? [[0, 60], [0, 35], [12, 35], [15, 0], [125, 0], [128, 35], [152, 35], [155, 0], [265, 0], [268, 35], [280, 35], [280, 60]] : rect(0, 0, 280, 60));
  // --- 掺杂（半透明叠加） ---
  if (nStage === 2) { add("nw", rect(0, 0, 140, 60)); add("pw", rect(140, 0, 280, 60)); }
  else { if (at("pwell")) add("pw", rect(155, 0, 265, 20)); if (at("nwell")) add("nw", rect(15, 0, 125, 22)); }
  if (at("vtp")) add("nl", rect(15, 0, 125, 7));
  if (at("vtn")) add("pl", rect(155, 0, 265, 7));
  if (at("halon")) for (const s of [-1, 1]) add("pl", ellipse(210 + s * 12, 11, 9, 6));
  if (at("halop")) for (const s of [-1, 1]) add("nl", ellipse(70 + s * 12, 11, 9, 6));
  const ann = at("rta") ? 2 : 0;
  if (at("extn")) for (const s of [-1, 1]) add("np", s < 0 ? roundBot(155, 0, 210 - 10 + ann, 5 + ann, 3) : roundBot(210 + 10 - ann, 0, 265, 5 + ann, 3));
  if (at("extp")) for (const s of [-1, 1]) add("pp", s < 0 ? roundBot(15, 0, 70 - 10 + ann, 5 + ann, 3) : roundBot(70 + 10 - ann, 0, 125, 5 + ann, 3));
  if (at("sdn")) { add("np", roundBot(155, 0, 186 + ann, 18 + ann * 2, 8)); add("np", roundBot(234 - ann, 0, 265, 18 + ann * 2, 8)); }
  if (at("sdp")) { add("pp", roundBot(15, 0, 46 + ann, 18 + ann * 2, 8)); add("pp", roundBot(94 - ann, 0, 125, 18 + ann * 2, 8)); }
  // --- 应变源漏外延（凹槽后填充；顶部略高于表面） ---
  if (at("sige")) for (const [a, b] of SD.slice(0, 2)) { add("sige", roundBot(a, -3, b, 20, 7)); add("pp", roundBot(a, -3, b, 20, 7)); }
  if (at("sic")) for (const [a, b] of SD.slice(2)) { add("sic", roundBot(a, -3, b, 18, 7)); add("np", roundBot(a, -3, b, 18, 7)); }
  // --- STI ---
  const tc = [0, 140, 280];
  if (at("liner")) tc.forEach(c => add("tox", liner(c, 15, 35, 2, 1)));
  if (at("fill")) {
    const top = at("gox") ? -4 : at("nitstrip") ? -8 : at("hf") ? -10 : -46;
    tc.forEach(c => add("ox", trench(c, top, 14, 34)));
    if (bf("cmp")) add("ox", rect(0, -62, 280, -46));
  }
  // --- 表面氧化层 ---
  if (at("stack") && bf("nitstrip")) {
    if (bf("litho")) add("tox", rect(0, -6, 280, 0)); else ACT.forEach(([a, b]) => add("tox", rect(a, -6, b, 0)));
  }
  if (at("nitstrip") && bf("gox")) add("tox", rect(0, -8, 280, 0));
  if (at("gox")) {
    const t = at("spetch") ? 2 : at("reox") ? 3 : 2;
    ACT.forEach(([a, b]) => add("tox", rect(a, -t, b, 0)));
  }
  // --- 氮化硅硬掩模（STI） ---
  if (at("stack") && bf("nitstrip")) { if (bf("litho")) add("nit", rect(0, -46, 280, -6)); else ACT.forEach(([a, b]) => add("nit", rect(a, -46, b, -6))); }
  // --- ILD0（后栅流程；栅槽、接触孔为缺口） ---
  if (at("ild0")) {
    const nn = [];
    if (at("polyrm")) GATES.forEach(g => nn.push([{ a: g - HL, b: g + HL, z: at("goxrm") ? -0.05 : -2 }]));
    if (at("ct")) CT.forEach(([a, b]) => nn.push([{ a, b, z: -4 }]));
    add("ox", notched(0, 280, ZT, 0, nn));
  }
  // --- 硅化物 ---
  if (at("silicide")) SD.forEach(([a, b]) => add("tisi", rect(a, -6, b, 2)));
  // --- 多晶硅 ---
  if (at("gox") && bf("gate")) add("poly", rect(0, -32, 280, -2));
  if (at("reox") && bf("polyrm")) GATES.forEach(g => add("tox", clipZtop(rect(g - 14, -34, g + 14, -2), at("ild0") ? ZT : -99)));
  if (at("polyrm")) GATES.forEach(g => { add("tox", rect(g - 14, ZT, g - 12, -2)); add("tox", rect(g + 12, ZT, g + 14, -2)); });
  if (at("polyrm") && bf("goxrm")) GATES.forEach(g => add("tox", rect(g - 12, -2, g + 12, 0)));
  // Ti 薄膜（共形）——画在侧墙与栅之前，只露出外缘一圈
  if (at("ti") && bf("silicide")) { add("ti", rect(0, -6, 280, -2)); GATES.forEach(g => add("ti", roundTop(g - 27, -37, g + 27, -2, 13))); }
  if (at("gate") && bf("polyrm")) GATES.forEach(g => add("poly", rect(g - HL, -32, g + HL, -2)));
  if (at("silicide") && bf("ild0")) GATES.forEach(g => add("tisi", rect(g - HL, -37, g + HL, -28)));
  // --- 侧墙 ---
  if (at("spdep") && bf("spetch")) { add("nit", rect(0, -13, 280, -3)); GATES.forEach(g => add("nit", roundTop(g - 24, -44, g + 24, -3, 10))); }
  if (at("spetch")) GATES.forEach(g => [-1, 1].forEach(s => add("nit", clipZtop(spacer(g + s * 14, s, -34, -2, 10), at("ild0") ? ZT : -99))));
  if (at("spdep") && bf("spetch")) GATES.forEach(g => { add("tox", rect(g - 14, -34, g + 14, -2)); add("poly", rect(g - HL, -32, g + HL, -2)); });
  // --- 高 k 金属栅 ---
  if (at("hk")) {
    const cmp = at("al");
    add("tox", film(0, 1, GATES, 0, 280, cmp));
    add("hfo", film(1, 3, GATES, 0, 280, cmp));
    add("tin", film(3, 4.5, GATES, 0, 280, cmp));
    add("tan", film(4.5, 6, GATES, 0, 280, cmp));
  }
  if (at("tin")) add("tin", film(6, 9, [70], 0, 140, at("al")));
  if (at("al")) { add("al", chain(9, [70], 0, 0, true)); add("al", chain(6, [210], 0, 0, true)); }
  // --- 接触塞 ---
  if (at("w")) CT.forEach(([a, b]) => { add("tin", rect(a, ZT, b, -4)); add("w", rect(a + 1, ZT, b - 1, -5)); });
  // --- M1 双大马士革 ---
  if (at("dama")) {
    const nn = CT.map(([a, b]) => [{ a: a - 7, b: b + 7, z: -50 }, { a: a + 1, b: b - 1, z: ZT - 0.05 }]);
    add("lowk", notched(0, 280, -72, ZT, nn));
    // 刻蚀停止层（图 2.25 的细节）：通孔层底部与沟槽底部
    const gaps = (lo, hi, holes) => { const o = []; let x = lo; for (const [a, b] of holes) { if (a > x) o.push([x, a]); x = Math.max(x, b); } if (x < hi) o.push([x, hi]); return o; };
    gaps(0, 280, CT.map(([a, b]) => [a + 1, b - 1])).forEach(([a, b]) => add("es", rect(a, ZT - 2, b, ZT), "lowk"));
    gaps(0, 280, CT.map(([a, b]) => [a - 7, b + 7])).forEach(([a, b]) => add("es", rect(a, -52, b, -50), "lowk"));
  }
  if (at("cu")) CT.forEach(([a, b]) => {
    add("tan", [[a - 7, -72], [b + 7, -72], [b + 7, -50], [b - 1, -50], [b - 1, ZT], [a + 1, ZT], [a + 1, -50], [a - 7, -50]], "cu");
    add("cu", [[a - 5.5, -72], [b + 5.5, -72], [b + 5.5, -51.5], [b - 2.5, -51.5], [b - 2.5, ZT - 1.5], [a + 2.5, ZT - 1.5], [a + 2.5, -51.5], [a - 5.5, -51.5]]);
  });
  // --- 光刻胶 ---
  const st = PSTEPS[k], imp = st.imp;
  if (at("stack") && bf("liner")) { if (bf("litho")) add("pr", rect(0, -90, 280, -46)); else ACT.forEach(([a, b]) => add("pr", rect(a, -90, b, -46))); }
  if (imp) {
    const top = at("gox") ? -2 : -8, h = imp.tilt ? -58 : -62;
    add("pr", imp.mask === "p" ? rect(0, h, 140, top) : rect(140, h, 280, top));
  }
  if (st.id === "tin") add("pr", rect(0, -78, 140, -41));
  return L.map(o => ({ ...o, p: clipX(o.p, 0, 280) })).filter(o => o.p.length > 2);
}

// ---------------- 二维截面 SVG ----------------
const VX0 = 50, S = 2.2, Z0 = -100, Z1 = 60, VY0 = 10;
const X = x => VX0 + x * S, Y = z => VY0 + (z - Z0) * S;
const W = VX0 + 280 * S + 14, H = VY0 + (Z1 - Z0) * S + 44;
const pts = p => p.map(([x, z]) => `${X(x).toFixed(1)},${Y(z).toFixed(1)}`).join(" ");

function Arrows({ imp }) {
  const xs = []; for (let x = 10; x < 280; x += 17) xs.push(x);
  const t = (imp.tilt || 0) * Math.PI / 180, len = 13;
  return <g stroke="#333" strokeWidth="1.3" fill="#333">
    {xs.map((x, i) => { const s = imp.tilt ? (i % 2 ? 1 : -1) : 0, dx = s * len * Math.tan(t); const x2 = X(x + dx / 2), y2 = Y(-80), x1 = X(x - dx / 2), y1 = Y(-80 - len);
      const a = Math.atan2(y2 - y1, x2 - x1), d = 6;
      return <g key={i}><line x1={x1} y1={y1} x2={x2} y2={y2} /><polygon points={`${x2},${y2} ${x2 - d * Math.cos(a - .4)},${y2 - d * Math.sin(a - .4)} ${x2 - d * Math.cos(a + .4)},${y2 - d * Math.sin(a + .4)}`} stroke="none" /></g>; })}
    <text x={imp.mask === "p" ? X(210) : X(70)} y={Y(-98) + 4} textAnchor="middle" fontSize="15" stroke="none">{imp.lab}{imp.tilt ? `（倾角 ${imp.tilt}°）` : ""}</text>
  </g>;
}
function Sup({ x, y, b, s, fill = "#fff" }) { return <text x={x} y={y} textAnchor="middle" fontSize="14" fontWeight="600" fill={fill} stroke="rgba(0,0,0,.35)" strokeWidth=".4">{b}<tspan dy="-6" fontSize="10">{s}</tspan></text>; }

// 单个截面面板
export function XSec({ k, title, axes = true, simple = false }) {
  const L = planar(k).map(o => (simple && o.tag ? { ...o, m: o.tag } : o)), st = PSTEPS[k], at = id => k >= PI[id];
  return <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title || st.t} style={{ width: "100%", display: "block", fontFamily: "system-ui,sans-serif", background: "#fff" }}>
    <title>{title || st.t}</title>
    <rect x={X(0)} y={Y(Z0)} width={280 * S} height={(Z1 - Z0) * S} fill="#fbfbfd" stroke="#bbb" />
    {L.map((o, i) => <polygon key={i} points={pts(o.p)} fill={MAT[o.m].c} stroke={MAT[o.m].dope ? "none" : "rgba(0,0,0,.35)"} strokeWidth=".6" strokeLinejoin="round" />)}
    {st.imp && <Arrows imp={st.imp} />}
    {at("pwell") && <g fontSize="14" fill="#333" textAnchor="middle"><text x={X(70)} y={Y(52)}>PMOS{at("drive") && bf(k, "gox") ? " – N 阱" : ""}</text><text x={X(210)} y={Y(52)}>NMOS{at("drive") && bf(k, "gox") ? " – P 阱" : ""}</text></g>}
    {at("sdn") && <Sup x={X(170)} y={Y(9)} b="N" s="+" />}{at("sdn") && <Sup x={X(250)} y={Y(9)} b="N" s="+" />}
    {at("sdp") && <Sup x={X(30)} y={Y(9)} b="P" s="+" />}{at("sdp") && <Sup x={X(110)} y={Y(9)} b="P" s="+" />}
    {at("nitstrip") && bf(k, "ild0") && <text x={X(140)} y={Y(26)} textAnchor="middle" fontSize="13" fill="#24506e">STI</text>}
    {axes && <g fontSize="12" fill="#555">
      {[0, 40, 80, 120, 160, 200, 240, 280].map(x => <g key={x}><line x1={X(x)} x2={X(x)} y1={Y(Z1)} y2={Y(Z1) + 4} stroke="#888" /><text x={X(x)} y={Y(Z1) + 16} textAnchor="middle">{x}</text></g>)}
      {[-80, -40, 0, 40].map(z => <g key={z}><line x1={X(0) - 4} x2={X(0)} y1={Y(z)} y2={Y(z)} stroke="#888" /><text x={X(0) - 7} y={Y(z) + 4} textAnchor="end">{z}</text></g>)}
      <text x={X(140)} y={H - 6} textAnchor="middle">横向位置 / nm（纵轴：深度 / nm，硅表面为 0）</text>
    </g>}
  </svg>;
}
const bf = (k, id) => k < PI[id];

// 材料图例（只列出当前截面中出现的材料）
export function Legend({ ks }) {
  const used = [...new Set(ks.flatMap(k => planar(k).map(o => o.m)))];
  return <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", fontSize: 13, marginTop: 6 }}>
    {used.map(m => <span key={m} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 14, height: 11, background: MAT[m].c, border: "1px solid rgba(0,0,0,.3)", display: "inline-block" }} /><TxI>{MAT[m].n}</TxI></span>)}
  </div>;
}

// 原书多面板图的自绘版：ids 为各面板对应的步骤
export function XPanels({ ids, labels, simple = false }) {
  const ks = ids.map(id => PI[id]);
  return <div>
    <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${ids.length > 1 ? 300 : 420}px, 1fr))`, gap: 10 }}>
      {ks.map((k, i) => <div key={i}><div style={{ fontSize: 13, color: "#555", margin: "0 0 2px 4px" }}>{labels ? labels[i] + "　" : ""}<TxI>{PSTEPS[k].t}</TxI></div><XSec k={k} simple={simple} /></div>)}
    </div>
    <Legend ks={ks} />
  </div>;
}
