// 第 8 章（下）公式树图：式 (8.48)。
const R = String.raw;
const CImax = R`\sym{ch08b-CImax}{C_{\rm I}^{\max}}`, CIs = R`\sym{ch08b-CIstar}{C_{\rm I}^*}`;
const Dself = R`\sym{ch08b-Dself}{D^{\rm self}}`, DAeff = R`\sym{ch08b-DAeff}{D_{\rm A}^{\rm eff}}`;

export const FM_8_48 = {
  id: "eq", tex: R`#lhs=#formA=#formB=#formC`, name: "equals", label: "三步化简，最后只剩两个激活能之比", role: "const",
  note: R`从左到右是同一个量的三种写法：先写成增强扩散 × 持续时间，再消掉 $C_{\rm I}^{\max}$，最后把分母换成 Si 自扩散。温度依赖在最后一种写法里才一眼可见。`,
  kids: [
    { id: "lhs", tex: R`${DAeff}t_{\rm eff}`, w: 4, name: "ted_Dt", label: "TED 造成的总扩散量", role: "result",
      note: R`增强扩散系数乘以稳态持续时间。它衡量分布因 TED 移动了多少，可以和普通扩散的 $Dt$ 直接比较。` },
    { id: "formA", tex: R`#enh#tau`, glyph: R`\times`, name: "enhanced_D × duration", label: "第一步：扩散多快 × 持续多久", role: "const",
      note: R`这是 TED 总量的直接估计：括号里是增强后的扩散系数，后面是这个增强能维持的时间。`,
      kids: [
        { id: "enh", tex: R`\left(#DaA#sat\right)`, glyph: R`\left(\square\,\square\right)`, name: "enhanced_D", label: "增强扩散", role: "const",
          note: R`假设杂质完全靠间隙机制扩散（$f_{\rm I}=1$），扩散系数按间隙原子的过饱和度成比例放大。`,
          kids: [
            { id: "DaA", tex: R`D_{\rm A}`, w: 1, name: "normal_D", label: "杂质的正常扩散系数", role: "known", note: R`没有注入损伤时的杂质扩散系数。` },
            { id: "sat", tex: R`\frac{${CImax}}{${CIs}}`, w: 3, name: "supersaturation", label: "稳态过饱和度", role: "known",
              note: R`{311} 团簇把自由间隙浓度钉在 $C_{\rm I}^{\max}$。它和平衡浓度之比只依赖温度，与剂量无关。` },
          ] },
        { id: "tau", tex: R`\tau_{\rm enh}`, w: 3, name: "ted_duration", label: "TED 持续时间", role: "known",
          note: R`剂量除以流向表面的通量，$\tau_{\rm enh}=QR_{\rm P}/(d_{\rm I}C_{\rm I}^{\max})$。团簇越稳定，过饱和度越低，但持续越久。` },
      ] },
    { id: "formB", tex: R`#DaB\left(\frac{#qr}{#flux}\right)`, name: "cancel(C_I_max)", label: "消掉结合能", role: "const",
      note: R`代入 $\tau_{\rm enh}$ 后，$C_{\rm I}^{\max}$ 恰好约掉，结合能 $E_{\rm b}$ 完全不再出现。所以总量不取决于团簇有多稳定。`,
      kids: [
        { id: "DaB", tex: R`D_{\rm A}`, w: 1, name: "normal_D", label: "仍是正常扩散系数", role: "known", note: R`和第一步里是同一个量，没有变化。` },
        { id: "qr", tex: R`QR_{\rm P}`, w: 2, name: "dose * range", label: "剂量 × 射程", role: "design",
          note: R`按 +1 模型，要清除的多余间隙原子正比于剂量 $Q$，而射程 $R_{\rm P}$ 是它们到表面的距离。` },
        { id: "flux", tex: R`d_{\rm I}${CIs}`, w: 2.5, name: "interstitial_transport", label: "间隙原子输运", role: "known",
          note: R`间隙原子扩散系数乘以平衡浓度。这个组合可以换成 Si 自扩散的量，于是有了第三步。` },
      ] },
    { id: "formC", tex: R`\frac{#DaC}{#fI#Ds#CSi}#qrC`, name: "activation_ratio", label: "第三步：两个激活能比高下", role: "const",
      note: R`分子和分母都随温度指数变化，分母变得更快，比值的净结果约为 $e^{+1.3\,\mathrm{eV}/kT}$。所以**温度越低，TED 越大**，这正是 TED 最反常的地方。`,
      kids: [
        { id: "DaC", tex: R`D_{\rm A}`, w: 5, name: "D_dopant", label: "分子：激活能约 3.5 eV", role: "known",
          note: R`降温时杂质扩散系数当然会变小，但它的激活能比分母的小，所以比不过分母下降的速度。` },
        { id: "fI", tex: R`f_{\rm I}^{\rm self}`, w: 1, name: "interstitial_fraction", label: "自扩散里走间隙机制的份额", role: "const",
          note: R`Si 自扩散中经由间隙机制的比例。只有这部分对应间隙原子的输运。` },
        { id: "Ds", tex: Dself, w: 8, name: "D_self", label: "分母：激活能约 4.8 eV，决定了全式的反常", role: "known",
          note: R`**全式的决定因素。**Si 自扩散的激活能比杂质扩散大约 1.3 eV，降温时分母掉得更快。物理上，背景点缺陷浓度和间隙扩散系数都随温度急剧下降，多余缺陷就过饱和更多、存在更久。` },
        { id: "CSi", tex: R`C_{\rm Si}`, w: 1, name: "si_density", label: "Si 原子密度", role: "const", note: R`约 $5\times10^{22}\,\mathrm{cm^{-3}}$，不随温度变化。` },
        { id: "qrC", tex: R`QR_{\rm P}`, w: 3, name: "dose * range", label: "剂量或能量越大，总量越大", role: "design",
          note: R`总量线性正比于剂量和射程。过饱和度不含 $Q$，增大剂量或能量只是拉长了 TED。这里的线性关系只在非晶化阈值以下成立。` },
      ] },
  ],
};
