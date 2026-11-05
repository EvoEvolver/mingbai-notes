// §10.3 的公式树图：式 (10.14)、(10.15)
const R = String.raw;

const EPS_IN = R`\hat{\boldsymbol\epsilon}'_j(\hat{\boldsymbol n}')`;

export const FM_10_14 = {
  id: "eq", tex: R`#lhs = #rhs.`, name: "equals", label: "同一个差的两种写法：通用形式 = 沿 z 出射的形式", role: "const",
  note: R`这个等号没有新物理，只做两件事：把两个求和并成一个，并代入沿 $z$ 出射时的偏振轴 $\hat{\boldsymbol\epsilon}_1=\hat{\boldsymbol e}_x$、$\hat{\boldsymbol\epsilon}_2=\hat{\boldsymbol e}_y$。右边才是后面真正要算的形式。`,
  kids: [
    { id: "lhs", tex: R`#sa-#sb`, name: "sigma[1] - sigma[2]", label: "左边：截面之差", role: "result",
      note: R`把偏振因子 \eqref{10.13} 分别取 $i=1$ 和 $i=2$ 再相减。按 $Q$ 的定义 \eqref{10.2}，这个差就是 $Q$ 的源。`,
      kids: [
        { id: "sa", tex: R`\sum_{#ja}^2|#oa\cdot#pa|^2`, name: "sigma[1]", label: "出射沿第 1 轴", role: "const",
          note: R`入射光子的两个偏振都可能散射到第 1 个出射偏振上，所以把两者的投影平方相加。`,
          kids: [
            { id: "ja", tex: R`j=1`, w: 0.8, name: "for pol in incoming", label: "两个入射偏振", role: "const", note: R`$j$ 取遍入射光的两个横向偏振。` },
            { id: "oa", tex: R`\hat{\boldsymbol\epsilon}_1(\hat{\boldsymbol n})`, w: 2.5, name: "axis_out[1]", label: "第 1 个出射偏振轴", role: "design", note: R`不带撇的 $\hat{\boldsymbol\epsilon}_i$ 属于出射光，垂直于出射方向 $\hat{\boldsymbol n}$。这里还是通用写法，没有选定方向。` },
            { id: "pa", tex: EPS_IN, w: 1.5, name: "axis_in[j]", label: "第 j 个入射偏振轴", role: "unknown", note: R`带撇的量属于入射光，垂直于入射方向 $\hat{\boldsymbol n}'$。它的具体分量要到 \eqref{10.17}、\eqref{10.18} 才写出。` },
          ] },
        { id: "sb", tex: R`\sum_{#jb}^2|#ob\cdot#pb|^2`, name: "sigma[2]", label: "出射沿第 2 轴", role: "const",
          note: R`和前一项结构相同，只把出射轴换成 $\hat{\boldsymbol\epsilon}_2$。全部差别都在这个下标上。`,
          kids: [
            { id: "jb", tex: R`j=1`, w: 0.8, name: "for pol in incoming", label: "两个入射偏振", role: "const", note: R`同样对入射光的两个偏振求和。` },
            { id: "ob", tex: R`\hat{\boldsymbol\epsilon}_2(\hat{\boldsymbol n})`, w: 2.5, name: "axis_out[2]", label: "第 2 个出射偏振轴", role: "design", note: R`另一个垂直于 $\hat{\boldsymbol n}$ 的出射偏振轴。与 $\hat{\boldsymbol\epsilon}_1$ 相减才得到 $Q$。` },
            { id: "pb", tex: EPS_IN, w: 1.5, name: "axis_in[j]", label: "第 j 个入射偏振轴", role: "unknown", note: R`与前一项是同一组入射偏振轴：两项只有出射轴不同。` },
          ] },
      ] },
    { id: "rhs", tex: R`\sum_{#jc}^2\left(#ex-#ey\right)`, name: "for pol: x - y", label: "右边：每个入射偏振算 x 减 y", role: "result",
      note: R`出射方向取 $z$ 之后的形式。括号就是一个入射偏振对 $Q$ 的贡献，接下来 \eqref{10.15} 把它对入射方向积分。`,
      kids: [
        { id: "jc", tex: R`j=1`, w: 0.8, name: "for pol in incoming", label: "两个入射偏振", role: "const", note: R`左边的两个求和合并成了这一个，$j$ 仍取遍两个入射偏振。` },
        { id: "ex", tex: R`|#ax\cdot#px|^2`, name: "strength[x]", label: "x 向投影", role: "const",
          note: R`入射偏振 $j$ 能给出射 $x$ 向提供多少强度。电子只把投影到这个方向上的振动转发出去。`,
          kids: [
            { id: "ax", tex: R`\hat{\boldsymbol e}_x`, w: 5, name: "axis_out[1] = x", label: "固定的 x 轴：换入具体方向的一步", role: "design", note: R`**这是这个等号的实质。**只看沿 $z$ 出射的光子，出射偏振轴就可以取天空平面内的坐标轴，$\hat{\boldsymbol\epsilon}_1=\hat{\boldsymbol e}_x$。从此 $\hat{\boldsymbol n}'$ 的方向成了这个投影里唯一的变量。` },
            { id: "px", tex: EPS_IN, w: 2, name: "axis_in[j]", label: "入射偏振轴，随 n′ 转动", role: "unknown", note: R`它随入射方向 $\hat{\boldsymbol n}'$ 变化，所以这个点积依赖入射方向。分量见 \eqref{10.17}、\eqref{10.18}。` },
          ] },
        { id: "ey", tex: R`|#ay\cdot#py|^2`, name: "strength[y]", label: "y 向投影", role: "const",
          note: R`同一个入射偏振给出射 $y$ 向提供的强度。前面的减号使 $x$、$y$ 两向相等的部分互相抵消，只留下不对称。`,
          kids: [
            { id: "ay", tex: R`\hat{\boldsymbol e}_y`, w: 5, name: "axis_out[2] = y", label: "固定的 y 轴：与 x 轴相减", role: "design", note: R`$\hat{\boldsymbol\epsilon}_2=\hat{\boldsymbol e}_y$。$x$ 与 $y$ 的这个差正是 $Q$ 的含义，它和 $x$ 轴同等重要。` },
            { id: "py", tex: EPS_IN, w: 2, name: "axis_in[j]", label: "入射偏振轴，随 n′ 转动", role: "unknown", note: R`与 $x$ 向投影里是同一个入射偏振轴。` },
          ] },
      ] },
  ],
};

export const FM_10_15 = {
  id: "eq", tex: R`#lhs = #rhs.`, name: "equals", label: "沿 z 的 Q = 入射强度 × 几何权重，对全天积分", role: "const",
  note: R`把 \eqref{10.14} 的差乘上每个方向的入射强度，再对所有入射方向加起来。这时几何部分已经和入射场分开，后面只需算出权重的具体角度依赖。`,
  kids: [
    { id: "lhs", tex: R`#Q(#ez)`, glyph: R`\square(\square)`, name: "Q(out=z)", label: "左边：沿 z 出射光的 Q", role: "result",
      note: R`要算的量，只针对一个出射方向。`,
      kids: [
        { id: "Q", tex: R`Q`, w: 4, name: "stokes_Q", label: "x 向减 y 向的强度差", role: "result", note: R`出射光的 Stokes 参数 $Q$：$x$、$y$ 两个方向上的强度之差。不为零就说明出射光有偏振。` },
        { id: "ez", tex: R`\hat{\boldsymbol e}_z`, w: 2, name: "out_dir", label: "选定的出射方向", role: "design", note: R`出射方向取为 $z$ 轴，也就是视线方向。正因如此，出射偏振轴才能取 $\hat{\boldsymbol e}_x$、$\hat{\boldsymbol e}_y$。` },
      ] },
    { id: "rhs", tex: R`#A\int #dom #f#kernel`, glyph: R`\square\int\square\square\square`, name: "norm * for n' in sky", label: "右边：对所有入射方向累加", role: "const",
      note: R`一个电子把来自各个方向的光都散射到 $z$ 方向，所以每个入射方向都有一份贡献。积分相当于把 $f$ 投影到几何权重上；$A$ 只管整体大小。`,
      kids: [
        { id: "A", tex: R`A`, w: 2, name: "norm", label: "归一化常数", role: "const", note: R`一个归一化常数，这里不必关心它的值，\secref{10.4} 才会确定。` },
        { id: "dom", tex: R`d\Omega'`, w: 1.5, name: "dOmega'", label: "入射立体角", role: "const", note: R`遍历全天的入射方向 $\hat{\boldsymbol n}'$。带撇表示入射。` },
        { id: "f", tex: R`f(\hat{\boldsymbol n}')`, w: 6, name: "intensity_in(n')", label: "入射强度：决定有没有 Q 的输入", role: "known", note: R`**全式唯一的物理输入：**从 $\hat{\boldsymbol n}'$ 方向入射的辐射强度。几何权重是固定的，$Q$ 是否为零完全取决于 $f$ 的角分布。它只依赖 $\hat{\boldsymbol n}'$、不依赖 $j$，这对应入射光非偏振的假设，\secref{10.4} 会修正。` },
        { id: "kernel", tex: R`\sum_{#j}^2\left(|#ax\cdot#px|^2-|#ay\cdot#py|^2\right)`, name: "weight(n')", label: "几何权重", role: "const",
          note: R`就是 \eqref{10.14} 的右边，只含几何。减号让 $x$、$y$ 相等的部分抵消，比如 $f$ 为常数时积分后 $Q=0$。下一步代入入射基矢，它会化成 $-\sin^2\theta'\cos2\phi'$（\eqref{10.19}）。`,
          kids: [
            { id: "j", tex: R`j=1`, w: 1.2, name: "for pol in incoming", label: "两个入射偏振", role: "const", note: R`入射光非偏振，两个偏振的强度都是 $f$，所以 $f$ 可以提到这个求和外面。` },
            { id: "ax", tex: R`\hat{\boldsymbol e}_x`, w: 3, name: "axis_out[1] = x", label: "出射偏振轴 x", role: "design", note: R`沿 $z$ 出射时选定的第一个偏振轴。入射偏振 $j$ 投影到这个轴上，得到它给 $x$ 向提供的强度。` },
            { id: "px", tex: EPS_IN, w: 1.5, name: "axis_in[j]", label: "入射偏振轴", role: "unknown", note: R`依赖入射方向，因此权重随 $\theta'$、$\phi'$ 变化。分量见 \eqref{10.17}、\eqref{10.18}。` },
            { id: "ay", tex: R`\hat{\boldsymbol e}_y`, w: 3, name: "axis_out[2] = y", label: "出射偏振轴 y", role: "design", note: R`沿 $z$ 出射时选定的第二个偏振轴。同一个入射偏振投影到这里的强度，要从 $x$ 向的强度里减去。` },
            { id: "py", tex: EPS_IN, w: 1.5, name: "axis_in[j]", label: "入射偏振轴", role: "unknown", note: R`与 $x$ 向投影里是同一个入射偏振轴。` },
          ] },
      ] },
  ],
};
