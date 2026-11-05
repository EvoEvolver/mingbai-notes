// 第 7 章（下）公式树图：式 (7.61)、(7.62)。组件见 @kit 的 FormulaMap。
const R = String.raw;

const Cgr = R`\sym{Cgr}{C}_{\rm A}^{\rm grain}`, Cgb = R`\sym{Cgb}{C}_{\rm A}^{\rm gb}`, Dgr = R`\sym{Dgr}{D}_{\rm A}^{\rm grain}`, Dgb = R`\sym{Dgb}{D}_{\rm A}^{\rm gb}`;

export const FM_7_61 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "equals", label: "晶粒内的掺杂：浓度变化来自两条路", role: "const",
  note: R`这是两股流模型中的一个方程：晶粒内的掺杂一边自己慢慢扩散，一边转移给晶界。它和 \eqref{7.62} 通过交换项耦合，要联立求解。`,
  kids: [
    { id: "lhs", tex: R`\frac{\partial ${Cgr}}{\partial t}`, w: 3, name: "d(grain_conc)/dt", label: "晶粒内掺杂浓度的变化率", role: "unknown",
      note: R`$${Cgr}$ 是处在晶粒内部的那部分掺杂，按单位总体积计。注入后的 As 起初主要在这里。` },
    { id: "rhs", tex: R`#diff-#ex`, name: "diffusion - transfer", label: "右边：扩散减去转移", role: "const",
      note: R`第一项只在晶粒这一股内部搬动掺杂，第二项才让掺杂离开这一股。`,
      kids: [
        { id: "diff", tex: R`\frac{\partial}{\partial x}\left(#D#grad\right)`, name: "diffuse", label: "晶粒内部的扩散", role: "const",
          note: R`Fick 第二定律，$D$ 写在导数里面，因为它可以依赖浓度。这部分和体硅里的扩散一样慢。`,
          kids: [
            { id: "D", tex: Dgr, w: 3, name: "D_grain", label: "晶粒内扩散率：慢", role: "known",
              note: R`晶粒内部是规则晶格，就是体硅中常见的浓度依赖扩散。它比晶界扩散率小约 $10^4$ 倍。` },
            { id: "grad", tex: R`\frac{\partial ${Cgr}}{\partial x}`, w: 1.5, name: "d(grain_conc)/dx", label: "晶粒内浓度的梯度", role: "unknown",
              note: R`只用晶粒这一股自己的浓度。` },
          ] },
        { id: "ex", tex: R`#k\left(#Cg-\frac{#Cb}{#s}\right)`, name: "transfer_to_boundary", label: "转移给晶界的量（前面是减号）", role: "const",
          note: R`括号是离平衡还有多远，$k_{\rm eff}$ 是向平衡靠拢的快慢。括号为正时掺杂离开晶粒、进入晶界，所以这一项前面是减号。`,
          kids: [
            { id: "k", tex: R`k_{\rm eff}`, w: 7, name: "transfer_rate", label: "转移快慢：决定晶粒能交出多少", role: "known",
              note: R`**这张图最重要的一块。**掺杂一旦进入晶界，很快就铺开；真正卡住的是能到达晶界的量。晶粒越大，要走得越远才能到达晶界，表面附近的峰就越高、深处越少。本书没有给出它的表达式，交互图里用的是建模假设。` },
            { id: "Cg", tex: Cgr, w: 2.5, name: "grain_conc", label: "晶粒内的浓度", role: "unknown",
              note: R`晶粒内的掺杂越多，交出去的越多。` },
            { id: "Cb", tex: Cgb, w: 2.5, name: "boundary_conc", label: "晶界上的浓度", role: "unknown",
              note: R`把两个方程耦合起来的量：晶界越满，转移越慢。` },
            { id: "s", tex: R`s`, w: 3, name: "segregation", label: "偏析系数：平衡时的分配比", role: "known",
              note: R`交换停止时 $${Cgb}=s\,${Cgr}$。它把晶界浓度折算成"和它平衡的晶粒浓度"，这样才能和 $${Cgr}$ 直接相减。` },
          ] },
      ] },
  ],
};

export const FM_7_62 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "equals", label: "晶界上的掺杂：快速扩散加上转移来的量", role: "const",
  note: R`和 \eqref{7.61} 结构相同，只换了两处：扩散率换成晶界的，交换项由减变加。两式相加，交换项抵消，总浓度只随扩散改变。`,
  kids: [
    { id: "lhs", tex: R`\frac{\partial ${Cgb}}{\partial t}`, w: 3, name: "d(boundary_conc)/dt", label: "晶界掺杂浓度的变化率", role: "unknown",
      note: R`$${Cgb}$ 是偏析在晶界上的那部分掺杂，也按单位总体积计。` },
    { id: "rhs", tex: R`#diff+#ex`, name: "diffusion + transfer", label: "右边：扩散加上转移", role: "const",
      note: R`第一项把晶界上的掺杂快速运往深处，第二项是它的来源。`,
      kids: [
        { id: "diff", tex: R`\frac{\partial}{\partial x}\left(#D#grad\right)`, name: "diffuse_along_boundary", label: "沿晶界的快速扩散", role: "const",
          note: R`形式和晶粒内扩散相同，差别全在扩散率上。`,
          kids: [
            { id: "D", tex: Dgb, w: 7, name: "D_boundary", label: "晶界扩散率：约为晶粒内的 $10^4$ 倍", role: "known",
              note: R`**这个方程的主角。**晶界是快速扩散的通道，正因为有它，多晶硅中的掺杂比单晶硅走得快得多。不同取向晶粒之间的弱键或不规则成键，同时也让晶界成为掺杂的"汇"。` },
            { id: "grad", tex: R`\frac{\partial ${Cgb}}{\partial x}`, w: 1.5, name: "d(boundary_conc)/dx", label: "晶界上浓度的梯度", role: "unknown",
              note: R`只用晶界这一股自己的浓度。` },
          ] },
        { id: "ex", tex: R`#k\left(#Cg-\frac{#Cb}{#s}\right)`, name: "transfer_from_grain", label: "从晶粒转移来的量（前面是加号）", role: "const",
          note: R`**和 \eqref{7.61} 的交换项完全相同，只有符号相反。**晶粒失去的正是晶界得到的，掺杂只是换手，总量不变。`,
          kids: [
            { id: "k", tex: R`k_{\rm eff}`, w: 4.5, name: "transfer_rate", label: "转移快慢：晶界的进货速度", role: "known",
              note: R`晶界扩散很快，所以晶界上能有多少掺杂往深处走，要看晶粒供应得多快。` },
            { id: "Cg", tex: Cgr, w: 2.5, name: "grain_conc", label: "晶粒内的浓度：来源", role: "unknown",
              note: R`晶粒这一股提供的掺杂，把两个方程耦合起来。` },
            { id: "Cb", tex: Cgb, w: 2, name: "boundary_conc", label: "晶界上的浓度", role: "unknown",
              note: R`晶界越满，继续进入的量越少。` },
            { id: "s", tex: R`s`, w: 2.5, name: "segregation", label: "偏析系数：平衡时的分配比", role: "known",
              note: R`交换停止时 $${Cgb}=s\,${Cgr}$，它决定晶界最终能积累多少。` },
          ] },
      ] },
  ],
};
