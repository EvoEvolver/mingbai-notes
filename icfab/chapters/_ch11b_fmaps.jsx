// 第 11 章（下）公式树图：式 (11.15)。
const R = String.raw;

export const FM_11_15 = {
  id: "eq", tex: R`#lhs=#defn=#full=#short`, name: "equals", label: "从定义到结果：指数项决定一切", role: "const",
  note: R`依次是：要算的量、它的定义、对 \eqref{11.13} 在零偏处求导取倒数的结果，以及把前因子合并后的简写。`,
  kids: [
    { id: "lhs", tex: R`\rho_c`, w: 3, name: "contact_resistivity", label: "比接触电阻率：越小越好", role: "result",
      note: R`衡量接触好坏的量。除以接触面积就得到接触电阻；纳米尺度的接触面积极小，所以它的要求非常苛刻。` },
    { id: "defn", tex: R`\left[\frac{\partial V_{MS}}{\partial J_S}\right]_{V_{MS}=0}`, w: 3.5, name: "dV/dJ at zero_bias", label: "定义：零偏处的单位面积微分电阻", role: "const",
      note: R`和热电子发射接触用的是同一个定义，区别只在电流来自隧穿。` },
    { id: "full", tex: R`\frac{#num}{#den}\ \mathrm{\Omega\,cm^2}`, name: "exp / prefactor", label: "求导结果：指数项 ÷ 撞击项", role: "const",
      note: R`分子来自隧穿概率的倒数，分母来自撞击势垒的电子流，再加上求导带下来的因子。掺杂同时出现在两处，但指数里的那一处影响大得多。`,
      kids: [
        { id: "num", tex: R`2\exp\left(#arg\right)`, name: "2 * exp(barrier)", label: "分子：隧穿概率的倒数", role: "const",
          note: R`隧穿概率随势垒的高度和厚度指数变化，所以 $\rho_c$ 也是指数变化。指数里的任何近似都会被放大。`,
          kids: [
            { id: "arg", tex: R`#H#phi/\sqrt{#Nd}`, glyph: R`\square\square/\sqrt{\square}`, name: "H * barrier / sqrt(doping)", label: "指数：势垒的高度与厚度", role: "const",
              note: R`$\sqrt{N_D}$ 在分母里，是因为势垒厚度 $x_D$ 反比于 $\sqrt{N_D}$（\eqref{11.12}）。`,
              kids: [
                { id: "H", tex: R`H`, w: 2, name: "tunnel_const", label: "材料常数，见式 (11.14)", role: "const",
                  note: R`只含介电常数和隧穿有效质量，由 \eqref{11.14} 给出。有效质量越重，隧穿越难。` },
                { id: "phi", tex: R`\phi_B`, w: 7, name: "barrier_height", label: "势垒高度：线性进指数", role: "known",
                  note: R`**全式最关键的量之一。**它线性地进入指数，降低一点就能让 $\rho_c$ 指数下降。可惜费米能级钉扎使它几乎与金属无关，很难压低。` },
                { id: "Nd", tex: R`N_D`, w: 6, name: "doping", label: "掺杂：开方后进指数", role: "design",
                  note: R`掺杂越高，势垒越薄，隧穿越容易。它进入指数时要开平方，而且上限受固溶度限制。$N_D>5\times10^{19}\,\mathrm{cm^{-3}}$ 时隧穿才真正起作用。` },
              ] },
          ] },
        { id: "den", tex: R`qv_{th}H\sqrt{N_D}`, w: 5, name: "denominator", label: "分母：幂次关系的前因子", role: "const",
          note: R`撞击势垒的电子流 $\tfrac12qN_Dv_{th}$ 乘以求导带下来的 $H/\sqrt{N_D}$，分子上的 2 也来自这里的 $\tfrac12$。$N_D$ 在这里也有贡献，但只是幂次，远不如指数项重要。` },
      ] },
    { id: "short", tex: R`#rco#expB\ \mathrm{\Omega\,cm^2}`, glyph: R`\times`, name: "rho_co × exp", label: "简写", role: "const",
      note: R`把不在指数里的部分合并成 $\rho_{co}$，一眼就能看出指数项是主角。`,
      kids: [
        { id: "rco", tex: R`\rho_{co}`, w: 1.5, name: "prefactor", label: "合并后的前因子", role: "const",
          note: R`$\rho_{co}=2/(qv_{th}H\sqrt{N_D})$，也就是上一种写法里指数以外的部分。` },
        { id: "expB", tex: R`\exp\left(H\phi_B/\sqrt{N_D}\right)`, w: 3, name: "exp(barrier)", label: R`同一个指数，决定 $\rho_c$ 的量级`, role: "const",
          note: R`和上一种写法的指数完全相同。降低 $\rho_c$ 只有两条路：降低 $\phi_B$，或提高 $N_D$。` },
      ] },
  ],
};
