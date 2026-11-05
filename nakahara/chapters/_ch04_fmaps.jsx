// 第 4 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// §4.8.2 ⁴He 的哈密顿量
export const FM_4_60 = {
  id: "eq", tex: R`#lhs=#one+#two.`, name: "H = one_body + two_body", label: R`单粒子项加两体相互作用`, role: "const",
  note: R`两项都只含成对的 $\phi^\dagger$ 与 $\phi$，这一点决定了它的对称性：\eqref{4.61} 的整体相位变换不改变 $\sym{Ham}{H}$，而序参量 $\Psi$ 却会变。`,
  kids: [
    { id: "lhs", tex: R`\sym{Ham}{H}`, w: 1.5, name: "hamiltonian", label: R`$^4$He 的哈密顿量`, role: "result", note: R`场算符写成的总能量算符。下面要比较的，是它的对称性和序参量 \eqref{4.59} 的对称性。` },
    { id: "one", tex: R`\int#dx\,#phid#op#phi`, name: "one_body", label: R`每一点上的单粒子能量`, role: "const",
      note: R`在同一点 $\boldsymbol{x}$ 上，算符夹在 $\phi^\dagger$ 与 $\phi$ 之间，再对全空间积分。没有相互作用时只剩这一项。`,
      kids: [
        { id: "dx", tex: R`\dd\boldsymbol{x}`, w: 0.8, name: "dx", label: R`空间积分`, role: "const", note: R`把每一点的贡献加起来。` },
        { id: "phid", tex: R`\phi^\dagger(\boldsymbol{x})`, w: 2.5, name: "phi_dag(x)", label: R`变换时带 $e^{-i\chi}$`, role: "known", note: R`$\phi$ 的厄米共轭。在 \eqref{4.61} 下它带 $e^{-i\chi}$，正好抵消右边 $\phi$ 带来的 $e^{i\chi}$。` },
        { id: "op", tex: R`\Big(-#kin-#mu\Big)`, name: "kinetic - mu", label: R`单粒子算符`, role: "const", note: R`作用在 $\phi$ 上的单粒子算符。$\chi$ 是常数，$\nabla$ 碰不到相位，所以相位能穿过这个算符。`,
          kids: [
            { id: "kin", tex: R`\frac{\nabla^2}{2\sym{mass}{m}}`, w: 2.5, name: "kinetic", label: R`动能（带前面的负号）`, role: "known", note: R`连同前面的负号，$-\nabla^2/2\sym{mass}{m}$ 就是质量为 $\sym{mass}{m}$ 的 $^4$He 原子的动能算符。` },
            { id: "mu", tex: R`\mu`, w: 1.5, name: "chem_potential", label: R`化学势`, role: "known", note: R`连同负号，这一项是 $-\mu\int\dd\boldsymbol{x}\,\phi^\dagger\phi$，即 $-\mu$ 乘粒子数。` },
          ] },
        { id: "phi", tex: R`\phi(\boldsymbol{x})`, w: 2.5, name: "phi(x)", label: R`变换时带 $e^{i\chi}$`, role: "known", note: R`场算符本身。$\Psi$ 是它的期待值 \eqref{4.59}，所以 $\Psi$ 随它一起变换。` },
      ] },
    { id: "two", tex: R`\frac12\int#dxy\,#rhoy#V#rhox`, name: "two_body", label: R`两点密度经 $V$ 相互作用`, role: "const",
      note: R`前面的 $\frac12$ 是因为积分同时扫过 $(\boldsymbol{x},\boldsymbol{y})$ 和 $(\boldsymbol{y},\boldsymbol{x})$，每一对点算了两次。`,
      kids: [
        { id: "dxy", tex: R`\dd\boldsymbol{x}\,\dd\boldsymbol{y}`, w: 0.8, name: "dx dy", label: R`两点积分`, role: "const", note: R`遍历所有成对的两点。` },
        { id: "rhoy", tex: R`\phi^\dagger(\boldsymbol{y})\phi(\boldsymbol{y})`, w: 5, name: "pair(y)", label: R`$y$ 点成对：相位相消`, role: "known", note: R`**$\phi^\dagger\phi$ 在 $\boldsymbol{y}$ 点成对出现，$e^{-i\chi}e^{i\chi}=1$，相位消失。**整个哈密顿量的 $\mathrm{U}(1)$ 不变性就来自这种配对。` },
        { id: "V", tex: R`V(|\boldsymbol{x}-\boldsymbol{y}|)`, w: 3, name: "V(distance)", label: R`只依赖两点距离的相互作用`, role: "known", note: R`两体势只看距离 $|\boldsymbol{x}-\boldsymbol{y}|$，不含场算符，所以对相位变换没有反应。` },
        { id: "rhox", tex: R`\phi^\dagger(\boldsymbol{x})\phi(\boldsymbol{x})`, w: 5, name: "pair(x)", label: R`$x$ 点成对：相位相消`, role: "known", note: R`同样的配对。$\sym{Ham}{H}$ 因此在 \eqref{4.61} 下不变；而单独的 $\Psi$ 按 \eqref{4.62} 变，基态由此破缺这一对称性。` },
      ] },
  ],
};
