// 第 13 章高层理解层：开场、路线图、推导图、核心概念、小结与自测。
import { TxI } from "@kit";

const R = String.raw;

export const HOOK_TITLE = "称量看不见的质量";
export const HOOK = R`2006 年，天文学家把"子弹星系团"（\figref{13.3}）的两张图叠在一起：一张是 Chandra 拍到的 X 射线，显示两团碰撞后被激波拖在后面的热气体——这是星系团里绝大部分**重子**；另一张是从背景星系的微小变形"反推"出的质量分布——它和气体**错开**了，跟着星系一起穿了过去。没有任何望远镜能直接看到这团质量；我们是靠它把背后几千个星系的形状拉歪了百分之几，才把它"称"了出来。

这就是引力透镜的力量：**光线响应的是质量，而不是发光的物质**。前面两章的探针——星系成团、SZ 效应、星系团计数——测的都是重子或星系，与物质之间隔着偏袒 $b_1$ 或质量–观测量关系这层"毛玻璃"。透镜绕开了它。代价是信号极小：典型的会聚与剪切只有 $\kappa,\gamma\sim10^{-2}$，比星系本身 $\sim0.3$ 的内禀椭率小一个量级以上，只能靠平均上亿个星系、用统计的方式把它"挤"出来。

这一章，我们从"光子分布函数守恒"这一句话出发，推出偏折角、透镜势与畸变张量；用它看 CMB 怎样被抹平、又怎样被用来重建质量图；再把星系形状写成和偏振一模一样的 $2\times2$ 张量，得到剪切的 E 模功率谱——它直接正比于沿视线积分的**非线性物质功率谱**，没有任何偏袒因子。`;

// ---------- 路线图 ----------
export const ROADMAP = [
  { sec: "13.1", title: "概览：光线响应质量", gist: R`强透镜（弧、多重像、时间延迟、微透镜）展示了效应的存在；对宇宙学最重要的是**弱透镜**——大尺度结构使背景星系形状发生百分之一量级的系统畸变，可用于称星系团质量，更可用于测量物质功率谱。`, gives: [], next: R`要定量，先得算出光线在扰动宇宙中被偏折多少。` },
  { sec: "13.2", title: "光子测地线：偏折角与透镜势", gist: R`无碰撞 ⇒ 比强度守恒 ⇒ $I_{\rm obs}(\boldsymbol\theta)=I_{\rm true}(\boldsymbol\theta_S)$ \eqref{13.3}。沿未扰动路径积分测地线方程，偏折角是透镜势的梯度 \eqref{13.14}–\eqref{13.16}，畸变张量是它的二阶导数 \eqref{13.17}。权重 $1-\chi'/\chi$ 使源附近的结构不起作用。`, gives: ["13.3", "13.13", "13.14", "13.15", "13.16", "13.17"], next: R`最简单的"源"是一个连续场：CMB。` },
  { sec: "13.3", title: "CMB 透镜", gist: R`把 $T_{\rm obs}(\boldsymbol\theta)=T_{\rm true}(\boldsymbol\theta+\Delta\boldsymbol\theta)$ 展开到二阶 \eqref{13.18}–\eqref{13.20}：功率谱的峰被抹平、阻尼尾部获得功率 \eqref{13.21}；更重要的是不同 $\boldsymbol l$ 之间出现相关 \eqref{13.23}，二次估计量据此重建 $\phi_{\rm L}$。`, gives: ["13.18", "13.20", "13.21", "13.23"], next: R`星系的真实位置未知，只能利用像的**形状**。` },
  { sec: "13.4", title: "星系形状：会聚、剪切与放大", gist: R`用二阶矩张量 $q_{ij}$ 描述形状（类比偏振）。Jacobi 矩阵 $A=\mathbb 1+\psi$ 分解为会聚 $\kappa$ 与剪切 $\gamma_{1,2}$ \eqref{13.28}–\eqref{13.30}；流量放大 $\mu=|A|^{-1}$ \eqref{13.35}；形状按 $q\to A^{-1}qA^{-1}$ 变换 \eqref{13.36}，弱透镜下 $\epsilon_i=\epsilon_i^{\rm true}+2\gamma_i$ \eqref{13.40}。`, gives: ["13.28", "13.30", "13.35", "13.36", "13.39", "13.40"], next: R`单个星系的 $\gamma$ 淹没在内禀椭率中，必须做统计。` },
  { sec: "13.5", title: "弱透镜统计", gist: R`$-\psi_{ij}(\boldsymbol l)=l_il_j\phi_{\rm L}$ 只产生 E 模，$E=\kappa$ \eqref{13.42}；用 Limber 近似与 Poisson 方程得 $C_{EE}=C_{\kappa\kappa}=(\frac32\Omega_{\rm m}H_0^2)^2\int d\chi\,a^{-2}g_{\rm L}^2P$ \eqref{13.51}。实空间为 $\xi_\pm$ \eqref{13.58}；与前景星系交叉得 $C_{{\rm g}E}\propto b_1$ \eqref{13.61} 与切向剪切 \eqref{13.62}。`, gives: ["13.42", "13.44", "13.49", "13.51", "13.53", "13.58", "13.61", "13.62"], next: R`汇总：透镜 = 天空位置的重映射，统计量由 $C_{EE}$ 与 $C_{{\rm g}E}$ 决定。` },
  { sec: "13.6", title: "小结", gist: R`面亮度守恒 \eqref{13.63} + 位置重映射 \eqref{13.64}；剪切功率谱 \eqref{13.65} 同时约束增长（$P$）与几何（$\chi(z)$）；星系–星系透镜 \eqref{13.66} 校准偏袒与星系团质量。`, gives: ["13.63", "13.64", "13.65", "13.66"] },
];

// ---------- 推导图 ----------
export const EQMAP_A = [
  { from: "13.3", to: "13.7", label: R`源位置 $\theta_S=x_\perp/\chi$` },
  { from: "13.9", to: "13.10", label: R`沿未扰动路径积分` },
  { from: "13.10", to: "13.13", label: R`代入 (13.7)，定 $C^i$` },
  { from: "13.7", to: "13.13", label: "" },
  { from: "13.13", to: "13.14", label: R`交换积分次序（图 13.5）` },
  { from: "13.14", to: "13.16", label: R`$\partial_x=\chi'^{-1}\partial_\theta$` },
  { from: "13.16", to: "13.17", label: "再求一次导" },
  { from: "13.17", to: "13.30", label: R`分解为 $\kappa$、$\gamma_{1,2}$` },
  { from: "13.30", to: "13.35", label: R`$\mu=|A|^{-1}$` },
  { from: "13.30", to: "13.36", label: "换积分变量" },
  { from: "13.36", to: "13.37", label: "线性化" },
  { from: "13.37", to: "13.39", label: R`代入 (13.26)` },
  { from: "13.39", to: "13.40", label: R`$\epsilon^{\rm true}\ll1$` },
  { from: "13.16", to: "13.18", label: R`CMB：$T$ 重映射` },
  { from: "13.18", to: "13.20", label: R`Fourier：$\Delta\boldsymbol\theta=i\boldsymbol l\phi_{\rm L}$` },
  { from: "13.20", to: "13.21", label: "对角相关（\\exref{13.2}）" },
  { from: "13.20", to: "13.23", label: R`非对角 $\boldsymbol l'\ne\boldsymbol l$` },
];
export const EQMAP_B = [
  { from: "13.17", to: "13.41", label: "Fourier 变换" },
  { from: "13.41", to: "13.42", label: R`E 模投影 (10.6)` },
  { from: "13.42", to: "13.44", label: R`$C_{EE}=\frac14l^4C_{\phi\phi}$` },
  { from: "13.47", to: "13.49", label: "交换积分次序" },
  { from: "13.49", to: "13.46", label: R`Limber (11.47)` },
  { from: "13.46", to: "13.51", label: R`Poisson (13.50)` },
  { from: "13.44", to: "13.51", label: "" },
  { from: "13.42", to: "13.53", label: R`$\gamma=E(\cos2\phi_l,\sin2\phi_l)$` },
  { from: "13.53", to: "13.58", label: R`方位角积分 → $J_0$、$J_4$` },
  { from: "13.51", to: "13.58", label: "" },
  { from: "13.59", to: "13.61", label: "交叉 Limber + Poisson" },
  { from: "13.49", to: "13.61", label: "" },
  { from: "13.61", to: "13.62", label: R`$\gamma_t=-\gamma_1$：$-\cos2\phi_l$ → $+J_2$` },
];
export const EQMAP_LABELS = {
  "13.3": "面亮度守恒", "13.7": R`$\theta_S$ 的积分`, "13.9": R`测地线：$-2\Phi_{,i}$`, "13.10": R`$\hat p_\perp(\chi'')$`, "13.13": "双重积分", "13.14": "偏折角",
  "13.16": R`透镜势 $\phi_{\rm L}$`, "13.17": R`畸变张量 $\psi_{ij}$`, "13.30": R`$\kappa,\gamma_1,\gamma_2$`, "13.35": R`放大率 $\mu$`, "13.36": "形状变换律", "13.37": "线性化",
  "13.39": "椭率变换", "13.40": R`$\epsilon=\epsilon^{\rm true}+2\gamma$`, "13.18": "CMB 温度重映射", "13.20": R`$\Theta_{\rm obs}(\boldsymbol l)$ 到二阶`, "13.21": "透镜后的 $C(l)$", "13.23": "非对角相关",
  "13.41": R`$-\psi_{ij}=l_il_j\phi_{\rm L}$`, "13.42": R`$E=\kappa$`, "13.44": R`$C_{EE}=C_{\kappa\kappa}$`, "13.47": "对源分布平均", "13.49": R`透镜核 $g_{\rm L}$`, "13.46": R`$C_{\phi\phi}$（Limber）`,
  "13.51": R`$C_{EE}$ 与 $P(k)$`, "13.53": R`$\gamma_{1,2}$ 与 $E$`, "13.58": R`$\xi_\pm$`, "13.59": "投影星系密度", "13.61": R`$C_{{\rm g}E}$`, "13.62": "切向剪切",
};

// ---------- 核心概念 ----------
export const groups = [
  { id: "geom", label: "光线几何" },
  { id: "shape", label: "形状与放大" },
  { id: "stats", label: "统计量" },
  { id: "probe", label: "观测与系统误差" },
];

export const concepts = [
  {
    id: "sb", name_zh: "面亮度守恒", name_en: "Conservation of surface brightness", icon: "🔦", section_id: "13.2", group: "geom",
    plain: R`透镜只搬动光线的到达方向，不改变比强度：$I_{\rm obs}(\boldsymbol\theta)=I_{\rm true}(\boldsymbol\theta_S)$。`,
    explain: R`晚期宇宙中光子几乎不被散射，Boltzmann 方程没有碰撞项，分布函数 $f$ 沿光线守恒。比强度 $I_\nu=4\pi\nu^3f$（\eqref{13.2}）只通过频率改变——而频移（红移、引力红移、多普勒）不改变形状。于是透镜效应完全是一个**坐标重映射**：在方向 $\boldsymbol\theta$ 看到的，就是没有透镜时方向 $\boldsymbol\theta_S$ 上的东西。

推论：像的面积变大多少，流量就变大多少（放大率 $\mu$）；CMB 的平均温度不被透镜改变。`,
    analogy: R`像透过一块不平的玻璃看墙纸：花纹被拉伸、挪位，但每一小块的颜色深浅不变。`,
    book_example: { what: R`式 (13.3)：本章一切结果的出发点。`, point: R`\secref{13.3} 中 CMB 温度的重映射与 \secref{13.4} 中形状矩的计算都直接从它出发。` },
    misconception: R`"透镜让星系更亮"指的是总流量；单位立体角的亮度（面亮度）并不变。`,
  },
  {
    id: "deflection", name_zh: R`偏折角与透镜势 $\phi_{\rm L}$`, name_en: "Deflection angle & lensing potential", icon: "↪️", section_id: "13.2", group: "geom",
    plain: R`偏折角 $\Delta\boldsymbol\theta$ 是天空上一个标量——透镜势 $\phi_{\rm L}$——的梯度；$\phi_{\rm L}$ 是沿视线对 $2\Phi$ 的加权积分。`,
    explain: R`光线每走一段 $d\chi'$，横向势梯度 $-2\Phi_{,i}$ 就让它的方向改变一点（因子 2：$\Phi$ 与 $\Psi$ 各贡献一半，牛顿引力只给一半）。这一偏转在源平面上造成的横向位移按"杠杆臂" $(\chi-\chi')$ 放大，换成角度再除以 $\chi$，权重就是 $1-\chi'/\chi$（\eqref{13.14}）。

因为偏折角是梯度，畸变张量 $\psi_{ij}=\partial_i\partial_j\phi_{\rm L}$ 是对称的——没有旋转，剪切只有 E 模。`,
    analogy: R`像一束光穿过一池有起伏的热空气：每一层"薄透镜"都把它推偏一点。判断某一层有多重要，要看它离**源**有多远：离源越近，这一偏转到达源之前走的路（杠杆臂）越短，几乎不产生位移。`,
    book_example: { what: R`式 (13.14)–(13.16) 与图 13.5 的积分次序交换。`, point: R`$1-\chi'/\chi$ 在 $\chi'\to\chi$ 时为零：源附近的结构对透镜无贡献——这也是 CMB 透镜与原初 $\Theta$ 不相关的原因。` },
    misconception: R`偏折角**不是**单个透镜的 $4GM/b$ 那么简单：宇宙学弱透镜是沿整条视线、无数小偏折的线性叠加。`,
  },
  {
    id: "kernel", name_zh: R`透镜核 $g_{\rm L}(\chi)$`, name_en: "Lensing kernel / efficiency", icon: "🏔️", section_id: "13.5", group: "geom",
    plain: R`位于 $\chi'$ 的物质对一组源的平均透镜效率；单一源面时为 $1-\chi'/\chi_S$，有效权重在源距离一半处最大。`,
    explain: R`源的红移只知道分布 $W(\chi)$ 时，把 \eqref{13.16} 对 $W$ 平均并交换积分次序，得 $g_{\rm L}(\chi')=\int_{\chi'}^\infty d\chi(1-\chi'/\chi)W(\chi)$（\eqref{13.49}）。会聚的权重还要乘 $\chi'/a$（来自 Poisson 方程与角导数），于是 $\propto\chi'(1-\chi'/\chi_S)/a$——在源与观测者的"几何中点"附近最大，在两端为零。

所以弱透镜测的是一大段视线上投影的质量；对 CMB（$\chi_S=\chi_*$），有效权重在 $z\sim2$–$5$。`,
    analogy: R`像跷跷板的支点：透镜放在正中间时撬动最大，紧贴观测者或紧贴源都撬不动。`,
    book_example: { what: R`\figref{13.9}：源星系越远，同一组透镜星系的切向剪切信号越大。`, point: R`源若不在透镜足够远的后面，$g_{\rm L}$ 接近零，信号消失。` },
    misconception: R`$g_{\rm L}$ 本身在 $\chi'\to0$ 时趋于 1，但真正的效率还要乘 $\chi'$——离观测者太近的结构张角太大、角尺度上的密度梯度太小，同样不起作用。`,
  },
  {
    id: "kappa", name_zh: R`会聚 $\kappa$`, name_en: "Convergence", icon: "🔍", section_id: "13.4", group: "shape",
    plain: R`畸变张量的迹部分：各向同性地放大像（$\mu\simeq1+2\kappa$），等于沿视线加权投影的物质密度。`,
    explain: R`$\kappa=-\frac12\nabla_\theta^2\phi_{\rm L}$。由 Poisson 方程，$\nabla^2\Phi\propto\delta_{\rm m}$，所以 $\kappa=\frac32\Omega_{\rm m}H_0^2\int d\chi\,\chi g_{\rm L}(\chi)\delta_{\rm m}/a$——一张"投影质量图"。在 Fourier 空间 $\kappa(\boldsymbol l)=\frac12l^2\phi_{\rm L}(\boldsymbol l)=E(\boldsymbol l)$，所以 $C_{\kappa\kappa}=C_{EE}$。

单个星系的大小未知，$\kappa$ 难以从单个像测出；但可通过放大偏差改变星系计数（\exref{13.11}）或尺寸相关来测量。`,
    analogy: R`放大镜：只让图像整体变大，不改变圆的"圆度"。`,
    book_example: { what: R`式 (13.38)：$q=q_{\rm true}[1+2\kappa+\cdots]$。`, point: R`像的面积按 $1+2\kappa$ 增大，与 $\mu$ 的线性展开一致。` },
    misconception: R`$\kappa$ 不是"像被放大了 $\kappa$ 倍"：面积放大 $\simeq1+2\kappa$，线尺度放大 $\simeq1+\kappa$。`,
  },
  {
    id: "shear", name_zh: R`剪切 $\gamma_1,\gamma_2$`, name_en: "Shear", icon: "🥚", section_id: "13.4", group: "shape",
    plain: R`畸变张量的无迹部分：把圆拉成椭圆，两个分量类比偏振的 $Q$、$U$。`,
    explain: R`$A_{ij}=\begin{pmatrix}1-\kappa-\gamma_1&-\gamma_2\\-\gamma_2&1-\kappa+\gamma_1\end{pmatrix}$。$\gamma_1>0$ 让像沿 $x$ 轴拉长，$\gamma_2>0$ 沿 $45^\circ$ 对角线拉长；在 $\phi\to\phi+\pi/2$ 下变号——它是自旋 2 量，和偏振一样。

可观测的其实是**约化剪切** $g=\gamma/(1-\kappa)$：一个圆形源的像的轴比为 $(1-\kappa-|\gamma|)/(1-\kappa+|\gamma|)=(1-|g|)/(1+|g|)$。弱透镜下 $g\approx\gamma$，椭率 $\epsilon\approx2\gamma$。`,
    analogy: R`像把一张印着圆点的橡皮膜沿一个方向拉、另一个方向压：圆点变成同向排列的小椭圆。`,
    book_example: { what: R`式 (13.40)：$\epsilon_i=\epsilon_i^{\rm true}+2\gamma_i$。`, point: R`测量背景星系椭率、在小天区内平均，就得到剪切场的估计。` },
    misconception: R`剪切不改变像的面积（线性阶），面积只由 $\kappa$ 改变。`,
  },
  {
    id: "mag", name_zh: R`放大率 $\mu$`, name_en: "Magnification", icon: "🔆", section_id: "13.4", group: "shape",
    plain: R`$\mu=|A|^{-1}=1/[(1-\kappa)^2-|\gamma|^2]$：面亮度守恒时，流量放大 = 面积放大。`,
    explain: R`把形状矩积分的变量从观测角换到源角，Jacobi 行列式 $|A|^{-1}$ 就是面积比（\eqref{13.33}–\eqref{13.35}）。这个式子在强透镜下也成立：$|A|=0$ 处 $\mu\to\infty$，称为临界曲线（点质量透镜的 Einstein 环）。弱透镜下 $\mu\simeq1+2\kappa$。

在流量限的样本里，放大让本来太暗的星系"挤进"样本，同时稀释了面数密度——净效应由计数斜率 $s$ 决定：$n_{\rm g}=\bar n_{\rm g}\mu^{2.5s-1}$（\eqref{13.72}，放大偏差）。`,
    analogy: R`像在放大镜下数沙子：每粒看起来更亮，但视野里沙子的数目变少了。`,
    book_example: { what: R`\figref{13.1}：Abell 1689 背后的高红移星系被放大成明亮的弧。`, point: R`透镜让我们看到原本暗到无法探测的星系。` },
    misconception: R`放大偏差的符号不固定：$s>0.4$ 时计数增加，$s<0.4$ 时计数减少。`,
  },
  {
    id: "ellip", name_zh: "椭率与形状噪声", name_en: "Ellipticity & shape noise", icon: "🌌", section_id: "13.4", group: "shape",
    plain: R`星系本身就不圆：内禀椭率的弥散 $\sigma_\epsilon\simeq0.3$（每个分量），远大于透镜剪切 $\sim0.01$。`,
    explain: R`用二阶矩张量 $q_{ij}$ 定义椭率（\eqref{13.26}）。对单个星系，$\epsilon^{\rm true}$ 未知，透镜信号 $2\gamma$ 只是一个小小的附加项。若内禀方向随机，在一个小天区内平均 $N$ 个星系，噪声按 $\sigma_\epsilon/\sqrt N$ 下降而信号不变。要测到 $\gamma\sim0.01$ 的 1%，需要每个像素平均上万个星系——这就是大型成像巡天的意义。`,
    analogy: R`像从一群随意站立的人里看出"大家都被风吹得往东歪了一点"：单个人看不出，人足够多时就清清楚楚。`,
    book_example: { what: R`\secref{13.4} 末：$\langle(\epsilon_1^{\rm true})^2+(\epsilon_2^{\rm true})^2\rangle^{1/2}/\sqrt2\simeq0.3$。`, point: R`统计必须靠大量暗弱星系，形状测量的稳健性因此成为主要挑战。` },
    misconception: R`"内禀方向随机"并不完全成立——潮汐场会使相邻星系的取向相关（内禀取向）。`,
  },
  {
    id: "eb", name_zh: "E 模与 B 模", name_en: "E- and B-modes", icon: "🌀", section_id: "13.5", group: "stats",
    plain: R`剪切场像偏振一样可分解为梯度型 E 模与旋度型 B 模；标量引力透镜只产生 E 模，$E=\kappa$。`,
    explain: R`$-\psi_{ij}(\boldsymbol l)=l_il_j\phi_{\rm L}(\boldsymbol l)$ 是纯梯度–梯度型，投影到 E 模得 $\frac12l^2\phi_{\rm L}=\kappa$，投影到 B 模为零（\eqref{13.42}）。B 模只能来自旋度型偏折（矢量/张量扰动、高阶透镜，\exref{13.5}）。所以观测到的剪切 B 模几乎全是系统误差——它是一把免费的"误差尺"。

实空间里同样的信息体现为：$\xi_\pm$ 都由 $C_{EE}$ 决定，$\langle\gamma_t\gamma_\times\rangle=0$，$\xi_{{\rm g},\times}=0$。`,
    analogy: R`像水面上的波纹：从一点扩散出去的（梯度型）与旋涡（旋度型）。引力只会"推"不会"拧"。`,
    book_example: { what: R`式 (13.42) 与 \exref{13.5}、\exref{13.10}。`, point: R`B 模对 $\xi_+$ 贡献为正、对 $\xi_-$ 贡献为负，可借此分离。` },
    misconception: R`CMB 透镜**能**产生 B 模偏振——那是把原有的 E 模偏振图样挪位；这与"剪切场本身没有 B 模"并不矛盾。`,
  },
  {
    id: "cee", name_zh: R`剪切功率谱 $C_{EE}(l)$`, name_en: "Shear power spectrum", icon: "📊", section_id: "13.5", group: "stats",
    plain: R`$C_{EE}=C_{\kappa\kappa}=(\frac32\Omega_{\rm m}H_0^2)^2\int d\chi\,a^{-2}g_{\rm L}^2P(l/\chi)$：沿视线积分的非线性物质功率谱，没有偏袒。`,
    explain: R`Limber 近似把角波数 $l$ 对应到每个距离上的三维波数 $k=l/\chi$；Poisson 方程把势谱换成物质谱，$\chi^4$ 与 $l^4$ 恰好相消（\eqref{13.50}–\eqref{13.51}）。

它同时依赖：振幅（$\sigma_8$，主要以 $\sigma_8\Omega_{\rm m}^{\sim0.5}$ 组合出现）、$\Omega_{\rm m}$（前因子）、距离–红移关系（$g_{\rm L}$ 与 $\chi$）——所以弱透镜既测增长又测几何。因为透镜把很多不相关的结构投影叠加，剪切场本身的非线性比三维密度场弱得多，\eqref{13.51} 在小尺度上仍然准确；限制在于预言非线性（含重子效应）的 $P(k)$。`,
    analogy: R`像透过一摞半透明的描图纸看图案：每张纸上的图案都被按距离缩放后叠在一起。`,
    book_example: { what: R`\figref{13.7}：CMB（$z_S=1089$）与星系（$z_S\approx1.5$）的 $C_{EE}$。`, point: R`杠杆臂越长信号越大；信号主要在小角尺度。` },
    misconception: R`弱透镜不是"测线性功率谱"——$l\gtrsim200$ 时非线性贡献就已显著（\exref{13.6}）。`,
  },
  {
    id: "cmblens", name_zh: "CMB 透镜", name_en: "CMB lensing", icon: "🌐", section_id: "13.3", group: "probe",
    plain: R`最后散射面的温度图被约 $2'$–$3'$ 的随机偏折搬动：功率谱的峰被抹平，并在不同 $\boldsymbol l$ 之间留下可用来重建质量的相关。`,
    explain: R`偏折的方均根只有几角分，但相干尺度达数度（$l\sim40$–$60$）。对功率谱的效应（\eqref{13.21}）：$C^{(13)}$ 项整体压低 $(1-l^2/l_{\rm lens}^2)$，$C^{(22)}$ 卷积项把峰抹平、并把功率搬到 $l\gg l_D$ 的阻尼尾部。

更有用的是，透镜破坏了统计各向同性：固定 $\phi_{\rm L}$ 时 $\langle\Theta_{\rm obs}(\boldsymbol l)\Theta_{\rm obs}^*(\boldsymbol l')\rangle\neq0$（$\boldsymbol l'\neq\boldsymbol l$，\eqref{13.23}）。对这些非对角相关做最优加权，就得到"二次估计量"重建的透镜势图。偏振 B 模更是一条几乎无宇宙方差的通道。`,
    analogy: R`像透过晃动的水面看池底的瓷砖：花纹的平均大小不变，但锐利的边缘被抹糊；局部被拉伸的方向告诉你水面是怎样起伏的。`,
    book_example: { what: R`\figref{13.6}：透镜前后 $C(l)$ 的相对差。`, point: R`差异呈与峰反相的振荡，并在 $l\gtrsim2500$ 上升；虽小，却超过当今测量误差。` },
    misconception: R`透镜不改变 CMB 的平均温度，也几乎不改变低 $l$ 的功率——它只是"洗牌"。`,
  },
  {
    id: "ggl", name_zh: "星系–星系透镜", name_en: "Galaxy–galaxy lensing", icon: "🎯", section_id: "13.5", group: "probe",
    plain: R`前景星系位置与背景星系切向剪切的交叉相关：测量前景星系周围的平均投影质量，$\propto b_1$。`,
    explain: R`$C_{{\rm g}E}=\frac32\Omega_{\rm m}H_0^2\int\frac{d\chi}{\chi}W_{\rm g}a^{-1}g_{\rm L}P_{\rm gm}$（\eqref{13.61}）。只有源在透镜后面足够远时 $g_{\rm L}$ 才不为零。因为没有优先方向，前景星系周围的平均质量分布轴对称，所以只产生切向剪切 $\gamma_t$，$\xi_{{\rm g},\times}=0$。

与星系自相关（$\propto b_1^2$）和剪切自相关（无 $b_1$）组合——"$3\times2$ 点"分析——可同时确定偏袒与物质涨落振幅。对按质量代理选出的星系团做同样的叠加，即校准质量–观测量关系。`,
    analogy: R`像在一张满是噪点的照片上，把所有路灯所在位置叠加平均：单张照片看不出光晕，叠加一千张就看清了光晕的轮廓。`,
    book_example: { what: R`\figref{13.9}：DES Y1 五个透镜红移区间、四个源红移区间的 $\gamma_t(\theta)$。`, point: R`源越远信号越大；源与透镜重叠时信号趋于零——完全是透镜核的形状。` },
    misconception: R`$\gamma_t$ 测的不是透镜星系本身的质量，而是与它们**相关**的全部质量（含邻近的晕与大尺度结构）。`,
  },
  {
    id: "ia", name_zh: "内禀取向", name_en: "Intrinsic alignments", icon: "🧭", section_id: "13.5", group: "probe",
    plain: R`潮汐场使物理上相邻的星系形状相互关联，模拟出假的透镜信号：$q_{ij}^{\rm IA}=-c_1\chi^2\Phi_{,ij}$。`,
    explain: R`大尺度上，星系形状对潮汐张量的线性响应是"形状版"的线性偏袒（\eqref{13.52}）。它产生两类污染（\exref{13.9}）：同一位置两星系的 II 相关，以及前景星系的内禀取向与背景星系透镜剪切之间的 GI 相关（符号相反）。观测上 $c_1<1$，星系"取向"弱于"成团"，但在当今的精度下必须建模；非线性尺度上还需更高阶项。`,
    analogy: R`像一群在潮汐里漂浮的浮木：它们自己就排得有点整齐，不一定是因为你透过的玻璃是弯的。`,
    book_example: { what: R`式 (13.52) 与 \exref{13.9}。`, point: R`用红移分 bin、利用不同红移依赖（透镜依赖几何、IA 依赖局域）来分离二者。` },
    misconception: R`内禀取向**不会**产生 B 模（线性潮汐模型下），所以 B 模检验发现不了它。`,
  },
];

export const relations = [
  { from: "sb", to: "deflection", label: "坐标重映射" },
  { from: "deflection", to: "kappa", label: R`二阶导数` },
  { from: "deflection", to: "shear", label: R`二阶导数` },
  { from: "kappa", to: "mag", label: R`$\mu\simeq1+2\kappa$` },
  { from: "shear", to: "mag", label: R`$|A|^{-1}$` },
  { from: "shear", to: "ellip", label: R`$\epsilon=\epsilon^{\rm true}+2\gamma$` },
  { from: "deflection", to: "cmblens", label: "重映射温度图" },
  { from: "kappa", to: "eb", label: R`$E=\kappa$` },
  { from: "eb", to: "cee", label: R`$C_{EE}$` },
  { from: "kernel", to: "cee", label: "Limber 权重" },
  { from: "kernel", to: "ggl", label: "源须在透镜后" },
  { from: "ia", to: "ellip", label: "污染" },
  { from: "eb", to: "ggl", label: R`只有 $\gamma_t$` },
];

// ---------- 小结 ----------
export const TAKEAWAYS = [
  <TxI>{R`**出发点**：晚期无碰撞 ⇒ 面亮度守恒 $I_{\rm obs}(\boldsymbol\theta)=I_{\rm true}(\boldsymbol\theta_S)$；透镜就是天空位置的重映射 $\boldsymbol\theta_S=\boldsymbol\theta+\nabla_\theta\phi_{\rm L}$。`}</TxI>,
  <TxI>{R`**透镜势**：$\phi_{\rm L}=2\int_0^\chi\frac{d\chi'}{\chi'}\Phi\,(1-\chi'/\chi)$——因子 2 来自 $\Phi-\Psi$，权重 $1-\chi'/\chi$ 让源附近的结构失效。`}</TxI>,
  <TxI>{R`**形状**：$A=\mathbb 1+\psi$ 分解为会聚 $\kappa$ 与剪切 $\gamma_{1,2}$；$\mu=|A|^{-1}$；形状张量 $q\to A^{-1}qA^{-1}$，弱透镜下 $\epsilon_i=\epsilon_i^{\rm true}+2\gamma_i$；内禀椭率 $\sim0.3$ 是主要噪声。`}</TxI>,
  <TxI>{R`**CMB 透镜**：方均根偏折约 $2.4'$（本页数值），抹平声学峰、给阻尼尾加功率；非对角相关 \eqref{13.23} 让二次估计量重建 $\phi_{\rm L}$。`}</TxI>,
  <TxI>{R`**剪切谱**：标量透镜只有 E 模，$E=\kappa$；$C_{EE}=(\frac32\Omega_{\rm m}H_0^2)^2\int d\chi\,a^{-2}g_{\rm L}^2P(l/\chi)$ 直接探测非线性物质功率谱，同时依赖距离–红移关系。`}</TxI>,
  <TxI>{R`**实空间与交叉**：$\xi_\pm=\int\frac{ldl}{2\pi}J_{0,4}C_{EE}$；星系–星系透镜 $\xi_{{\rm g},t}=\int\frac{ldl}{2\pi}J_2C_{{\rm g}E}\propto b_1$（按切向剪切的定义取正号，见 \eqref{13.62} 后的勘误），与 $C_{\rm g}\propto b_1^2$ 合用可破除偏袒简并；B 模与 $\xi_{{\rm g},\times}$ 是系统误差检验。`}</TxI>,
];

export const QUIZ = [
  {
    q: R`为什么光线的偏折由 $\Phi-\Psi=2\Phi$ 决定，而不是像牛顿力学那样只由 $\Psi$ 决定？`,
    options: [R`因为光子没有质量`, R`因为对极端相对论粒子，空间曲率扰动 $\Phi$ 与时间扰动 $\Psi$ 贡献相同（\eqref{3.72} 中 $p^2/E^2=1$），二者各贡献一半`, R`因为宇宙在膨胀`, R`因为 $\Phi$ 是 $\Psi$ 的两倍`],
    answer: 1, why: R`\eqref{3.72} 中横向梯度项为 $(\frac{p^2}{E^2}\Phi-\Psi)_{,k}$；慢速粒子只感受 $\Psi$，光子则感受 $\Phi-\Psi$。无各向异性应力时 $\Psi=-\Phi$，得到著名的"爱因斯坦因子 2"。`,
  },
  {
    q: R`一个大质量星系团位于观测者与源星系正中间，另一个同样的星系团紧贴源星系。哪个产生的剪切更大？`,
    options: [R`紧贴源的那个`, R`正中间的那个`, R`一样大`, R`取决于源的大小`],
    answer: 1, why: R`权重 $\chi'(1-\chi'/\chi)$ 在 $\chi'=\chi/2$ 处最大，在 $\chi'\to\chi$ 时为零：紧贴源的偏折没有"杠杆臂"把它变成位移。`,
  },
  {
    q: R`一个圆形源受 $\kappa=0$、$\gamma_1=0.1$、$\gamma_2=0$ 的透镜作用，像会怎样？`,
    options: [R`沿 $y$ 轴拉长`, R`沿 $x$ 轴拉长，椭率 $\epsilon_1\approx0.2$`, R`沿 $45^\circ$ 方向拉长`, R`整体放大但仍是圆`],
    answer: 1, why: R`$A=\mathrm{diag}(0.9,1.1)$，像 $=A^{-1}\times$源，$x$ 方向放大到 $1/0.9$，$y$ 方向缩到 $1/1.1$；由 \eqref{13.40}，$\epsilon_1\approx2\gamma_1=0.2$（精确值 $2g/(1+g^2)=0.198$）。`,
  },
  {
    q: R`为什么测到的剪切 B 模可以用来检验系统误差？`,
    options: [R`因为 B 模总是比 E 模大`, R`因为标量扰动产生的偏折角是梯度，畸变张量 $\partial_i\partial_j\phi_{\rm L}$ 只有 E 模；线性阶的 B 模只能来自旋度型偏折`, R`因为 B 模只来自引力波`, R`因为 B 模不随红移变化`],
    answer: 1, why: R`\eqref{13.42}：$-\psi_{ij}=l_il_j\phi_{\rm L}$ 投影到 B 模为零。矢量/张量扰动与高阶透镜效应很小，所以显著的 B 模多半来自 PSF 修正不完善等系统误差。`,
  },
  {
    q: R`星系–星系透镜 $C_{{\rm g}E}$ 与星系角自相关 $C_{\rm g}$ 合用，为什么能破除偏袒–振幅简并？`,
    options: [R`因为 $C_{{\rm g}E}$ 不依赖宇宙学`, R`因为 $C_{{\rm g}E}\propto b_1\sigma_8^2$ 而 $C_{\rm g}\propto b_1^2\sigma_8^2$，比值给出 $b_1$`, R`因为透镜星系没有偏袒`, R`因为 $C_{{\rm g}E}$ 只在大尺度上不为零`],
    answer: 1, why: R`$P_{\rm gm}=b_1P$，$P_{\rm g}=b_1^2P$。两者不同的 $b_1$ 幂次使比值 $C_{{\rm g}E}^2/C_{\rm g}\propto P$ 与偏袒无关（再配合剪切自相关 $C_{EE}$）。`,
  },
  {
    q: R`透镜对 CMB 温度功率谱的主要效应是什么？`,
    options: [R`改变 CMB 平均温度`, R`在所有尺度上均匀放大功率`, R`抹平声学峰（相对差呈与峰反相的振荡），并把功率搬到阻尼尾部`, R`产生新的声学峰`],
    answer: 2, why: R`$C^{(22)}$ 项是未透镜谱与偏折谱的卷积，抹平峰谷并把大尺度功率转移到 $l\gg l_D$；$C^{(13)}$ 项给出 $(1-l^2/l_{\rm lens}^2)$ 的整体压低。平均温度不变（面亮度守恒）。`,
  },
];

export const BRIDGE = R`到这里，我们已经有了一整套把宇宙学模型变成观测量的"预言机器"：CMB 温度与偏振谱（第 9–10 章）、星系成团与星系团计数（第 11–12 章）、以及本章的剪切与星系–星系透镜谱。每一个预言都是若干参数（$\Omega_{\rm m}$、$\sigma_8$、$h$、$n_s$、偏袒、内禀取向振幅……）的函数，而每一组数据都带着噪声、宇宙方差与系统误差。最后一章讨论怎样把二者连接起来：似然函数、Fisher 矩阵、协方差的估计（包括本章反复出现的形状噪声与宇宙方差），以及在许多参数与"讨厌参数"并存时如何得到可靠的宇宙学约束。`;
