// 第 13 章长公式的结构树（FormulaMap）：面积 = 重要性。
const R = String.raw;

export const FM_13_17 = {
  id: "eq", tex: R`#psi \equiv #jac = #hess = #proj,`, name: "chain(defs)", label: "同一个张量的三种写法", role: "const",
  note: R`从几何定义开始，经透镜势，一直写到沿视线的积分。最后一种写法直接连到物质分布：由 Poisson 方程，$\Phi_{,ij}$ 的迹正比于物质过密度。`,
  kids: [
    { id: "psi", tex: R`\psi_{ij}`, w: 3.5, name: "distortion", label: "畸变张量：星系形状改变的来源", role: "result",
      note: R`一个 $2\times2$ 的角空间矩阵。星系的形状取决于偏折角的导数而不是偏折角本身，\secref{13.4} 把它用到星系形状上。` },
    { id: "jac", tex: R`\frac{\partial\Delta\theta^i}{\partial\theta^j}`, w: 2.5, name: "d(deflection)/d(theta)", label: "定义：偏折角随方向的变化", role: "const",
      note: R`相邻方向的偏折角之差。如果偏折处处相同，像只会平移，形状不变；只有这个导数才造成畸变。` },
    { id: "hess", tex: R`#dd#phi`, glyph: R`\times`, name: "hessian(phi_L)", label: "透镜势的二阶导数", role: "const",
      note: R`偏折角是透镜势的梯度 \eqref{13.15}，再求一次导就是二阶导数矩阵，因此 $\psi_{ij}$ 关于 $i,j$ 对称。`,
      kids: [
        { id: "dd", tex: R`\frac{\partial^2}{\partial\theta^i\partial\theta^j}`, w: 1.2, name: "d2/dtheta2", label: "对观测方向求两次导", role: "const",
          note: R`导数对天空上的角度 $\boldsymbol\theta$ 求，而积分里的 $\Phi_{,ij}$ 对物理坐标 $\boldsymbol x$ 求，两者通过因子 $\chi'$ 换算。` },
        { id: "phi", tex: R`\phi_{\rm L}(\boldsymbol\theta)`, w: 2.3, name: "phi_L(theta)", label: "天空上的透镜势", role: "known",
          note: R`\eqref{13.16} 定义的沿视线投影，是天空上的一个标量场。` },
      ] },
    { id: "proj", tex: R`2\int_0^\chi#dc\,#tid\,#wt`, name: "los_integral", label: "沿视线累加", role: "const",
      note: R`观测者到源的每一段都贡献一个小畸变，全部累加。前面的 $2$ 就是 \eqref{13.9} 中广义相对论相对牛顿引力的加倍。`,
      kids: [
        { id: "dc", tex: R`d\chi'`, w: 0.9, name: "dchi", label: "沿视线走一步", role: "const",
          note: R`$\chi'$ 是路径上的共动距离，从观测者 $0$ 积到源 $\chi$。` },
        { id: "tid", tex: R`#Phi(#path)`, name: "tide(x)", label: "路径上势的横向二阶导数", role: "const",
          note: R`在给定路径点上取值的二阶导数，整条式子的物理来源都在这里。`,
          kids: [
            { id: "Phi", tex: R`\Phi_{,ij}`, w: 7, name: "d2_potential_dx2", label: "势的横向二阶导：结构在这里进入", role: "known",
              note: R`**全式的物理来源。**只有势的二阶导才拉伸或压缩光束，均匀的梯度只造成平移。它的迹由 Poisson 方程正比于物质过密度，所以弱透镜测的正是物质分布。` },
            { id: "path", tex: R`\boldsymbol x(\boldsymbol\theta,\chi')`, w: 2, name: "unperturbed_path", label: "沿未扰动的直线取值", role: "known",
              note: R`\eqref{13.11} 的未扰动光路。这是 Born 近似：真实路径与它的差别属于偏折的二阶项。` },
          ] },
        { id: "wt", tex: R`#near#far`, glyph: R`\times`, name: "lensing_weight", label: "中点最大", role: "const",
          note: R`$\chi'(1-\chi'/\chi)$ 在 $\chi'=\chi/2$ 处最大，所以大约在观测者与源的中点附近的结构贡献最多。`,
          kids: [
            { id: "near", tex: R`\chi'`, w: 3.5, name: "angle_to_physical", label: "太近的结构贡献小", role: "const",
              note: R`把对 $\boldsymbol\theta$ 的导数换成对 $\boldsymbol x$ 的导数，每次多一个 $\chi'$；两次导数抵掉 \eqref{13.16} 里的 $1/\chi'$ 后剩一个。离观测者太近时，同样的物理梯度只对应很小的角梯度。` },
            { id: "far", tex: R`\left(1-\frac{\chi'}{\chi}\right)`, w: 3.5, name: "lever_arm", label: "太靠近源就没有杠杆臂", role: "const",
              note: R`光线被改变方向后，还要走完剩下的路程才累积成位移。$\chi'\to\chi$ 时这段路程趋于零，贡献也消失。` },
          ] },
      ] },
  ],
};
