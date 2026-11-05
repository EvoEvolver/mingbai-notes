// 公式树图：附录 A 的长公式。组件见 framework/app/src/kit/math/fmap.jsx。
const R = String.raw;

export const FM_A1_16 = {
  id: "eq", tex: R`#n=#Ndp=#f1=#f2=#f3`, name: "neutrality → eq(n)", label: "从电中性出发，一步步把 $E_F$ 换成 $n$", role: "const",
  note: R`前两项是电中性，后三项是同一个电离施主浓度的三种写法。走到最右边时式中不再有 $E_F$，只剩 $n$ 和已知量，于是可以解。`,
  kids: [
    { id: "n", tex: R`n`, w: 4.5, name: "electrons", label: "要解的电子浓度", role: "unknown", note: R`最左边的未知数。它在最右边的分母里还会再出现一次，所以这条等式不是显式解，而是关于 $n$ 的方程。` },
    { id: "Ndp", tex: R`N_D^+`, w: 2.5, name: "ionized_donors", label: "电中性：电子全来自电离施主", role: "const", note: R`只有施主时，每个导带电子都对应一个带正电的施主，所以 $n=N_D^+$。这个等号是整条式子的物理前提，后面都是代数。` },
    { id: "f1", tex: R`\frac{N_D}{1+g_De^{(E_F-E_D)/kT}}`, w: 2.5, name: "fermi_dirac(E_F)", label: "起点：式 (A1.15)", role: "const", note: R`费米–狄拉克统计给出的电离施主浓度。它含有 $E_F$，而 $E_F$ 本身取决于 $n$，还不能直接计算。` },
    { id: "f2", tex: R`\frac{N_D}{1+g_De^{(E_F-E_D+E_C-E_C)/kT}}`, w: 1, name: "add_zero(E_C)", label: "加减 $E_C$，数值不变", role: "const", note: R`纯代数：指数里加减同一个 $E_C$，以便拆成 $E_F-E_C$ 和 $E_C-E_D$ 两段。前一段下一步换成 $n$，后一段只由杂质能级深度决定。` },
    { id: "f3", tex: R`\frac{#Nd}{1+#gd#nr#ex}`, name: "fermi_dirac(n)", label: "终点：式中只剩 $n$ 和已知量", role: "const",
      note: R`分母里 1 后面的那一项越大，施主电离得越少。这一项由简并因子、电子浓度比和杂质深度三者相乘得到。`,
      kids: [
        { id: "Nd", tex: R`N_D`, w: 2, name: "donors_total", label: "施主总浓度", role: "known", note: R`掺入的施主总量，是电离施主浓度的上限：分母不小于 1，所以 $N_D^+\le N_D$。` },
        { id: "gd", tex: R`g_D`, w: 1, name: "degeneracy", label: "简并因子，典型值 2", role: "const", note: R`施主能级可以被自旋向上或向下的电子占据，但不能同时占据两个，所以 $g_D=2$。` },
        { id: "nr", tex: R`\left(\frac{n}{N_C}\right)`, w: 7, name: "e^((E_F-E_C)/kT)", label: "用 (A1.8) 消掉 $E_F$，$n$ 进入分母", role: "unknown", note: R`**全式的转折点。**由 \eqref{A1.8}，$e^{(E_F-E_C)/kT}=n/N_C$，$E_F$ 就此消失。未知数 $n$ 同时出现在等式两边，去分母后正好是关于 $n$ 的二次方程，这才有后面的解析解 \eqref{A1.17}。` },
        { id: "ex", tex: R`e^{(E_C-E_D)/kT}`, w: 3.5, name: "e^(depth/kT)", label: "杂质能级越深，越难电离", role: "known", note: R`$E_C-E_D$ 是施主能级到导带底的深度。深度相对 $kT$ 越大，分母越大，电离越少。它与 $N_C/g_D$ 合起来就是参数 $\gamma_n$。` },
      ] },
  ],
};
