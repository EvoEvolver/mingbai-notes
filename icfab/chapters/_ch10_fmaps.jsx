// 第 10 章公式树图：式 (10.14)。
const R = String.raw;
const th = R`\sym{ch10-thd}{\theta}`;

export const FM_10_14 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "equals", label: "隐式方程：$h_c$ 同时出现在等号两边", role: "const",
  note: R`这个式子不能直接算出结果，需要迭代求解。好在对数因子随 $h_c$ 变化很慢，所以 $h_c$ 近似反比于 $f$。`,
  kids: [
    { id: "lhs", tex: R`h_c`, w: 4, name: "critical_thickness", label: "无位错应变层的厚度上限", role: "result",
      note: R`薄膜低于这个厚度时可以无位错地长成应变膜；更厚时，平衡结构是带失配位错的弛豫膜。` },
    { id: "rhs", tex: R`#pref#elastic#logf`, glyph: R`\times`, name: "geometry × material × log", label: "右边：三个因子相乘", role: "const",
      note: R`第一个因子含失配度，决定大小；第二个由泊松比和位错类型决定；第三个只是缓慢变化的对数。`,
      kids: [
        { id: "pref", tex: R`\frac{#rA}{#eight#f#trig}`, name: "r0 / (mismatch × geometry)", label: "失配度在分母：失配越大越薄", role: "const",
          note: R`力学平衡的结果：应力驱动位错形成的力随 $f$ 增大，所以能撑住的厚度随 $f$ 下降。`,
          kids: [
            { id: "rA", tex: R`r_0`, w: 1.5, name: "core_radius", label: "位错核半径", role: "known",
              note: R`位错弹性能积分的内截断半径，与 Burgers 矢量长度同量级。` },
            { id: "eight", tex: R`8\pi`, w: 0.8, name: "8*pi", label: "数值常数", role: "const", note: R`力平衡时合并出的数值常数，没有可调的含义。` },
            { id: "f", tex: R`f`, w: 8, name: "mismatch", label: "失配度：决定 $h_c$ 的主要旋钮", role: "design",
              note: R`**全式最关键的量。**$f=(a_f-a_s)/a_s$。提高 Ge 含量能加大应变、提升空穴迁移率，但 $f$ 同时增大，可用的 SiGe 层就更薄。失配大于约 1% 时只能长很薄的应变层。` },
            { id: "trig", tex: R`\sin(${th})\cos(\phi)`, w: 2.5, name: "slip_geometry", label: "位错的几何取向", role: "known",
              note: R`$\theta$ 是位错线与 Burgers 矢量的夹角，$\phi$ 是滑移面相对薄膜平面的倾角。这个组合决定 Burgers 矢量中能释放失配的分量。` },
          ] },
        { id: "elastic", tex: R`\left[\frac{1-\nu\cos^2(${th})}{1+\nu}\right]`, w: 2, name: "elastic_factor", label: "材料修正：泊松比与位错类型", role: "known",
          note: R`由泊松比 $\nu$（Si 约 0.28）和 $\theta$ 决定，对给定材料和位错类型是一个定值。` },
        { id: "logf", tex: R`\ln\left(\frac{#hcB}{#rB}-1\right)`, name: "log_term", label: "缓慢变化的对数", role: "const",
          note: R`阻力只按 $\ln h$ 增长，驱动力随 $h$ 线性增长，所以必有一个厚度使两者相等。这个对数项的具体形式有疑问，见下方的存疑框。`,
          kids: [
            { id: "hcB", tex: R`h_c`, w: 4, name: "critical_thickness", label: "未知数又出现在这里", role: "unknown",
              note: R`容易看漏的一笔：$h_c$ 在右边也有，所以要迭代求解。它只在对数里，影响不大，这才有“$h_c$ 近似反比于 $f$”的结论。` },
            { id: "rB", tex: R`r_0`, w: 1, name: "core_radius", label: "同一个核半径", role: "known", note: R`把 $h_c$ 量成无量纲的比值，才能取对数。` },
          ] },
      ] },
  ],
};
