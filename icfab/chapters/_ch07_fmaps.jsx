// 第 7 章（上）公式树图：式 (7.33)、(7.51)。组件见 @kit 的 FormulaMap。
const R = String.raw;

export const FM_7_33 = {
  id: "eq", tex: R`#F=#atoms=#conc=#grad=#fick`, name: "equals_chain", label: "从数原子一步步写成 Fick 第一定律", role: "const",
  note: R`四个等号是同一个量的四种写法：先数原子，再换成浓度，再凑成梯度，最后把系数命名为 $D$。没有引入新的物理，却把微观跳跃和宏观定律接了起来。`,
  kids: [
    { id: "F", tex: R`F`, w: 3, name: "net_flux", label: "穿过平面 1、2 之间的净流量", role: "result",
      note: R`单位时间、单位面积穿过这个界面的净原子数，右行减左行。` },
    { id: "atoms", tex: R`-#half(#dN)`, name: "count_atoms", label: "第一步：数原子", role: "const",
      note: R`平面 1 向右跳的减去平面 2 向左跳的。负号表示：右边原子多时，净流量向左。`,
      kids: [
        { id: "half", tex: R`\frac{\nu_b}{2}`, w: 3, name: "jump_rate_one_way", label: "朝某一侧跳的频率", role: "known",
          note: R`$\nu_b$ 是总跳跃频率。左右概率相等，朝一侧的只占一半，这就是分母 2 的来历。` },
        { id: "dN", tex: R`N_2-N_1`, w: 7, name: "atoms_right - atoms_left", label: "净流动的来源：两侧原子数不对等", role: "known",
          note: R`**整条式子的物理就在这个差里。**每个原子都独立地、左右等概率地跳，并不"知道"浓度梯度。净流动只是因为浓的一侧跳过来的多，淡的一侧跳回去的少。两侧相等时，来回抵消。` },
      ] },
    { id: "conc", tex: R`-\frac{\nu_b}{2}#dx\,(#dC)`, name: "to_conc", label: "第二步：面密度换成体浓度", role: "const",
      note: R`用 $C_i=N_i/\Delta x$ 把面密度 $N$ 换成体浓度 $C$，因此多出一个 $\Delta x$。`,
      kids: [
        { id: "dx", tex: R`\Delta x`, w: 1.2, name: "plane_spacing", label: "原子平面的间距", role: "known",
          note: R`一个平面所代表的厚度，$N_i=C_i\Delta x$。` },
        { id: "dC", tex: R`C_2-C_1`, w: 1.6, name: "conc_difference", label: "相邻平面的浓度差", role: "known",
          note: R`还是同一个"不对等"，只是换了单位。` },
      ] },
    { id: "grad", tex: R`-#group\,#slope`, name: "make_gradient", label: "第三步：凑出梯度", role: "const",
      note: R`分子分母同乘 $\Delta x$，浓度差变成梯度，前面的系数里 $\Delta x$ 变成平方。`,
      kids: [
        { id: "group", tex: R`\frac{\nu_b}{2}\Delta x^2`, w: 5, name: "micro_coefficient", label: "微观量合成的系数：下一步就叫 $D$", role: "const",
          note: R`**跳得越勤、每步越远，这个系数越大。**它只含微观量，和浓度无关。温度依赖全部来自 $\nu_b$，这也是扩散系数呈 Arrhenius 形式的原因。` },
        { id: "slope", tex: R`\frac{\Delta C}{\Delta x}`, w: 1.6, name: "gradient", label: "离散的浓度梯度", role: "known",
          note: R`$\Delta C=C_2-C_1$，$\Delta x$ 是平面间距。` },
      ] },
    { id: "fick", tex: R`-#D\,#slopeb`, name: "fick_first_law", label: "结果：Fick 第一定律", role: "const",
      note: R`形式和宏观的 Fick 第一定律相同：通量正比于浓度梯度，负号表示顺着浓度下降的方向流。`,
      kids: [
        { id: "D", tex: R`D`, w: 4, name: "diffusivity", label: "扩散系数：宏观定律里的那个常数", role: "result",
          note: R`这里顺带得到了它的微观定义 $D=\tfrac{\nu_b}{2}\Delta x^2$，即紧接着的 \eqref{7.34}。` },
        { id: "slopeb", tex: R`\frac{\Delta C}{\Delta x}`, w: 2, name: "gradient", label: "驱动通量的浓度梯度", role: "known",
          note: R`和上一步是同一个量。宏观上看到的"被梯度驱动"，微观上只是数量不对等。` },
      ] },
  ],
};

export const FM_7_51 = {
  id: "eq", tex: R`#F=#rhs`, name: "equals", label: "界面陷阱的净俘获通量", role: "const",
  note: R`这是模拟器里的初步模型，用来描述杂质被界面单层俘获造成的剂量损失。`,
  kids: [
    { id: "F", tex: R`F`, w: 3, name: "trap_flux", label: "流向界面陷阱的净通量", role: "result",
      note: R`杂质流入陷阱就从硅中"丢失"：它们是失活的，剥离氧化层时还会被一并带走。超浅源漏延伸区的方块电阻会因此显著增大。` },
    { id: "rhs", tex: R`#h#net`, glyph: R`\times`, name: "transport × (capture - release)", label: "传输系数 × 俘获与脱陷之差", role: "const",
      note: R`一个传输系数乘一个差：差决定方向，系数决定快慢。`,
      kids: [
        { id: "h", tex: R`\sym{ch07-htr}{h}`, w: 2, name: "transport_coeff", label: "传输系数：决定通量的快慢", role: "known",
          note: R`把括号里的差换算成通量，量纲和 7.11 节界面通量里的传输系数一样是 $\mathrm{cm/s}$。` },
        { id: "net", tex: R`\left(#cap-#rel\right)`, name: "capture - release", label: "俘获减脱陷", role: "const",
          note: R`前一项把杂质送进陷阱，后一项放出来。两者之差为零时，净通量为零。`,
          kids: [
            { id: "cap", tex: R`#C#occ`, glyph: R`\times`, name: "capture", label: "俘获项：浓度 × 陷阱状况", role: "const",
              note: R`界面附近的杂质越多、可俘获的状况越好，俘获越强。`,
              kids: [
                { id: "C", tex: R`C`, w: 4, name: "conc_at_interface", label: "界面附近的杂质浓度", role: "known",
                  note: R`注入杂质的瞬态增强扩散能把大量杂质原子送到界面，正是通过这个因子加大俘获。` },
                { id: "occ", tex: R`\left(#f+#rterm\right)`, name: "trap_state", label: "陷阱状况：空位比例加一个修正", role: "const",
                  note: R`俘获不是无限的：界面层只有约一个原子层量级，能容纳的杂质有限。`,
                  kids: [
                    { id: "f", tex: R`f`, w: 6, name: "unfilled_fraction", label: "未填满的陷阱比例：模型的主角", role: "unknown",
                      note: R`**这个模型的出发点：杂质只流向未填满的陷阱。**这就是为什么剂量损失有上限，大约一个原子层。` },
                    { id: "rterm", tex: R`#r\,#frac`, name: "occupancy_term", label: "占据相关项：物理含义书中未说明", role: "const",
                      note: R`和陷阱密度与其上限之比成正比。这一项的物理含义书中没有说明，可能对应模拟器里的某种占据依赖俘获，具体以模拟器文档为准。`,
                      kids: [
                        { id: "r", tex: R`r`, w: 1.5, name: "capture_rate", label: "俘获速率常数", role: "known",
                          note: R`正文把它称为俘获的速率常数。` },
                        { id: "frac", tex: R`\frac{#sig}{#smax}`, name: "trap_density / max", label: "陷阱密度相对上限的比值", role: "const",
                          note: R`把陷阱密度归一化成 0 到 1 之间的数。`,
                          kids: [
                            { id: "sig", tex: R`\sym{ch07-sigtrap}{\sigma}`, w: 1.5, name: "trap_density", label: "陷阱密度", role: "unknown",
                              note: R`界面上单位面积的陷阱密度，正文称为可用陷阱密度。` },
                            { id: "smax", tex: R`\sigma_{\max}`, w: 1.5, name: "trap_density_max", label: "最大陷阱密度", role: "known",
                              note: R`陷阱密度的上限。` },
                          ] },
                      ] },
                  ] },
              ] },
            { id: "rel", tex: R`#k\,#sigb`, name: "release", label: "脱陷项：杂质回到硅中", role: "const",
              note: R`解释了为什么剂量损失不完全是永久的：后续退火中，被俘获的杂质有一部分可能回到硅中。`,
              kids: [
                { id: "k", tex: R`\sym{ch07-kdt}{k}`, w: 3, name: "detrap_rate", label: "脱陷速率常数", role: "known",
                  note: R`决定陷阱放出杂质的快慢。` },
                { id: "sigb", tex: R`\sym{ch07-sigtrap}{\sigma}`, w: 2.5, name: "trap_density", label: R`同一个 $\sigma$：脱陷也与它成正比`, role: "unknown",
                  note: R`和占据相关项里的 $\sigma$ 是同一个量，所以它同时出现在俘获和脱陷两边。` },
              ] },
          ] },
      ] },
  ],
};
