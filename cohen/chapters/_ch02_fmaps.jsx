// §A 长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// §A-1-a 叠加态模方的展开
export const FM_A_3 = {
  id: "eq", tex: R`#lhs=#rhs`, name: "expand(abs(psi) ** 2)", label: "把叠加态的模方逐项展开", role: "const",
  note: R`要证明叠加不会跑出 $\mathscr F$，就要看 \eqref{A-2} 的模方能否积分。展开后逐项检查：哪些已经可积，哪些需要另外控制。`,
  kids: [
    { id: "lhs", tex: R`|\psi(\mathbf r)|^2`, w: 2.5, name: "abs(psi) ** 2", label: "叠加态的模方", role: "result", note: R`如果它在全空间的积分收敛，叠加 $\psi$ 就仍然平方可积。这是本节唯一要证的事。` },
    { id: "rhs", tex: R`#t1+#t2+#t3+#t4`, name: "sum(terms)", label: "两个平方项 + 两个干涉项", role: "const",
      note: R`前两项本来就可积；问题只在后两项，它们可正可负，要用上界来控制。`,
      kids: [
        { id: "t1", tex: R`|\lambda_1|^2|\psi_1(\mathbf r)|^2`, w: 2, name: "weight1 * density1", label: "分量 1 的模方：已知可积", role: "known", note: R`$\psi_1$ 平方可积，乘上一个常数 $|\lambda_1|^2$ 后仍然可积，不需要再证明。` },
        { id: "t2", tex: R`|\lambda_2|^2|\psi_2(\mathbf r)|^2`, w: 2, name: "weight2 * density2", label: "分量 2 的模方：已知可积", role: "known", note: R`和前一项相同，$\psi_2$ 平方可积，所以这一项也可积。` },
        { id: "t3", tex: R`#c3\,#f3`, glyph: R`\times`, name: "interference", label: "干涉项：可正可负", role: "const",
          note: R`只有叠加才会出现的项。它可正可负，不能直接说它可积，所以下面要给它找一个上界。`,
          kids: [
            { id: "c3", tex: R`\lambda_1^*\lambda_2`, w: 1.5, name: "coef", label: "系数的乘积", role: "design", note: R`$\lambda_1,\lambda_2$ 是任意复数，证明不能依赖它们的取值，只用到它们的模有限。` },
            { id: "f3", tex: R`\psi_1^*(\mathbf r)\psi_2(\mathbf r)`, w: 6, name: "conj(psi1) * psi2", label: "难点：交叉乘积能否积分", role: "known",
              note: R`**整个证明要处理的就是它。**它的模 $|\psi_1||\psi_2|$ 不超过 $\frac12(|\psi_1|^2+|\psi_2|^2)$，于是被两个可积函数压住，积分必然收敛。` },
          ] },
        { id: "t4", tex: R`#c4\,#f4`, glyph: R`\times`, name: "conj(interference)", label: "前一项的复共轭", role: "const",
          note: R`它就是前一项的复共轭，所以两者之和是实数，这才和左边的实数 $|\psi(\mathbf r)|^2$ 相符。`,
          kids: [
            { id: "c4", tex: R`\lambda_1\lambda_2^*`, w: 1.2, name: "conj(coef)", label: "系数的共轭", role: "design", note: R`前一项系数的复共轭。` },
            { id: "f4", tex: R`\psi_1(\mathbf r)\psi_2^*(\mathbf r)`, w: 2.5, name: "psi1 * conj(psi2)", label: "模和前一项相同", role: "known", note: R`模同样是 $|\psi_1||\psi_2|$，同一个上界对它也成立，不需要另外论证。` },
          ] },
      ] },
  ],
};
