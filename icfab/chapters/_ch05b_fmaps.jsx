// 公式树图：第 5 章（下）的长公式。组件见 framework/app/src/kit/math/fmap.jsx。
const R = String.raw;
const E = R`\mathcal{E}`, T = R`\sym{tm}{t}`;

export const FM_5_31 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "equals", label: "总光强 = 各照明方向光强的加权平均", role: "const",
  note: R`把光源分成许多点源：每个点源相干，各自成一幅像；点源之间不相干，所以相加的是光强，不是电场。有了这条式子，任意形状的照明光源都能计算。`,
  kids: [
    { id: "lhs", tex: R`I_{\rm total}(x,y)`, w: 4, name: "aerial_image", label: "落在胶面上的总光强分布", role: "result", note: R`部分相干照明下最终的空间像。自变量只剩像面坐标 $(x,y)$，光源坐标已经被积掉了。` },
    { id: "rhs", tex: R`\frac{\displaystyle#num}{\displaystyle#den}`, glyph: R`\frac{\square}{\square}`, name: "weighted_mean", label: "加权平均：上面加权求和，下面归一化", role: "const",
      note: R`形式上就是以 $S$ 为权重对 $I$ 取平均。`,
      kids: [
        { id: "num", tex: R`\iint_{#src}#img\,#S\,#dm`, glyph: R`\iint_{\square}\square\,\square\,\square`, name: "for point in source", label: "对光源每个点：光强 × 权重", role: "const",
          note: R`遍历光源上的每个点源，把它成的像乘上它的强度，再全部加起来。`,
          kids: [
            { id: "src", tex: R`{\rm source}`, w: 1.5, name: "source_region", label: "积分范围", role: "design", note: R`只对光源实际发光的范围积分。` },
            { id: "img", tex: R`#Iv(#xy,#fp)`, name: "image(point)", label: "单个点源成的像，即式 (5.30)", role: "const", note: R`一个照明方向对应一幅完整的空间像，由式 (5.29) 和 (5.30) 算出。`,
              kids: [
                { id: "Iv", tex: R`I`, w: 7, name: "intensity  # 不是电场", label: "相加的是光强，不是电场", role: "known", note: R`**全式的关键选择。**不同点源之间不相干，所以各自先取模平方，再相加。如果把电场相加，得到的是相干照明的结果，而不是这条式子。` },
                { id: "xy", tex: R`x,y`, w: 1, name: "image_xy", label: "像面坐标", role: "const", note: R`胶面上的位置，积分时保持不动。` },
                { id: "fp", tex: R`f'_x,f'_y`, w: 3, name: "illum_dir", label: "哪个点源，即哪个照明方向", role: "const", note: R`光源上的位置，等价于照明角度。斜入射让频谱在光瞳里平移，因此不同方向的像各不相同。` },
              ] },
            { id: "S", tex: R`S(f'_x,f'_y)`, w: 5, name: "source_shape", label: "光源强度分布：照明形状", role: "design", note: R`描述光源强度随位置（等价于照明角度）的分布，起权重的作用。选用不同的照明形状，改的就是这个函数。` },
            { id: "dm", tex: R`df'_x\,df'_y`, w: 1.2, name: "d²f'", label: "光源面元", role: "const", note: R`对光源坐标 $f'_x,f'_y$ 的二重积分微元。` },
          ] },
        { id: "den", tex: R`\iint_{\rm source}S(f'_x,f'_y)\,df'_x\,df'_y`, w: 2.5, name: "normalize", label: "总权重，只做归一化", role: "const", note: R`光源的总强度。除以它之后，结果只取决于光源形状，与总强度无关。它印得和分子差不多大，却不含成像的物理。` },
      ] },
  ],
};

export const FM_5_32 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "equals", label: "近场电场 = 掩模与二次相位核的卷积", role: "const",
  note: R`这是远场衍射 (5.21) 的近场版本，用于接触式和接近式系统。适用条件是 $z\gg W$；到 $z\gg\pi W^2/\lambda$ 时就该改用 Fraunhofer 远场。`,
  kids: [
    { id: "lhs", tex: R`#Ef(x,y,#z)`, name: "field", label: "掩模后距离 $z$ 处的电场", role: "result", note: R`比远场公式多了一个自变量 $z$：近场中光场的形状会随距离变化。`,
      kids: [
        { id: "Ef", tex: E, w: 3, name: "field", label: "要求的电场", role: "result", note: R`胶只响应光强，所以还要取模平方，才得到空间像。` },
        { id: "z", tex: R`z`, w: 2.5, name: "gap", label: "到掩模的距离", role: "design", note: R`接近式曝光中它就是掩模与晶圆的间隙 $g$，是可以调节的量：减小间隙能改善分辨率。` },
      ] },
    { id: "rhs", tex: R`#pre#phase#conv`, glyph: R`\times`, name: "prefactor × phase × integral", label: "两个外部因子乘一个积分", role: "const",
      note: R`像的形状全部由积分决定。前两个因子与 $x,y$ 无关，只影响整体的大小和相位。`,
      kids: [
        { id: "pre", tex: R`\frac{1}{j\lambda z}`, w: 2, name: "amplitude", label: "常数幅度因子", role: "const", note: R`其中的 $1/z$ 就是球面子波的 $1/r$ 取近似的结果。整个因子不随 $x,y$ 变化，不影响图形的形状。` },
        { id: "phase", tex: R`\exp\Big\{2\pi j\frac{z}{\lambda}\Big\}`, w: 2.5, name: "phase", label: "整体相位，模为 1", role: "const", note: R`光走过距离 $z$ 累积的相位。它的模是 1，取光强时直接消失，所以尽管印得很显眼，对空间像没有影响。` },
        { id: "conv", tex: R`\int_{-\infty}^{\infty}\!\!\int_{-\infty}^{\infty}#tm#kern\,#dm`, glyph: R`\int\!\!\int\square\,\square\,\square`, name: "for point in mask", label: "遍历掩模：透过率 × 相位核", role: "const",
          note: R`这是掩模与二次相位核的卷积，核只依赖 $x-x_1$、$y-y_1$。只有极少数情况有解析解（长狭缝是其一），一般要用数值方法计算。`,
          kids: [
            { id: "tm", tex: R`${T}(x_1,y_1)`, w: 5, name: "mask(x1, y1)", label: "掩模透过率：要印的图形", role: "design", note: R`定义与式 (5.20) 相同，透光处为 1，铬遮挡处为 0。它是积分里唯一由版图决定的部分。` },
            { id: "kern", tex: R`\exp\Big\{-\pi j\frac{#r2}{#lz}\Big\}`, name: "quadratic_phase", label: "二次相位核", role: "const", note: R`掩模上每一点的子波带着随距离平方变化的相位到达观察点。子波的距离 $r$ 只展开到二次项，所以这个核比完整的球面波简单，又比远场多保留了一项。`,
              kids: [
                { id: "r2", tex: R`(x-x_1)^2+(y-y_1)^2`, w: 7, name: "lateral_dist²", label: "横向距离的平方：决定相位怎样变化", role: "const", note: R`**Fresnel 与 Fraunhofer 的差别就在这里。**这里同时保留了 $x_1^2$ 和 $y_1^2$；再远一些，这些项的相位可以忽略，剩下对 $x_1,y_1$ 线性的部分正是傅里叶核，也就回到了远场公式。` },
                { id: "lz", tex: R`\lambda z`, w: 4, name: "scale", label: "相位尺度：波长 × 距离", role: "known", note: R`横向距离的平方达到 $\lambda z$ 时，相位转过 $\pi$。因此特征尺寸要与 $\sqrt{\lambda z}$ 比较，这也是 Fresnel 数 $N_F=W^2/\lambda g$ 的来历：缩短波长或减小间隙都能改善分辨率。` },
              ] },
            { id: "dm", tex: R`dx_1\,dy_1`, w: 1.2, name: "d²x1", label: "掩模坐标的面元", role: "const", note: R`对掩模坐标积分，而不是对观察点坐标积分。` },
          ] },
      ] },
  ],
};
