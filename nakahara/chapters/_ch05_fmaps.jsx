// 第 5 章长公式的结构树（FormulaMap）。公式由树展开生成，须与原式逐记号一致。
const R = String.raw;

// §5.4 习题 5.18：一般张量场的李导数
export const FM_5_87 = {
  id: "eq", tex: R`#lhs=#dir+#lower-#upper.`, name: "lie(t) = along_X + lower - upper", label: R`方向导数加上每个指标一项修正`, role: "const",
  note: R`把 $t$ 写成分量乘基，$\mathcal{L}_X$ 逐因子作用：作用在分量上得到第一项，作用在每个 $\dd x^{\nu_s}$ 上得到第二项，作用在每个 $e_{\mu_s}$ 上得到第三项。`,
  kids: [
    { id: "lhs", tex: R`(\mathcal{L}_Xt)^{\mu_1\ldots\mu_n}{}_{\nu_1\ldots\nu_m}`, w: 2, name: "lie_X(t)", label: R`李导数的分量`, role: "result", note: R`$t\in\mathcal{T}^n_m(M)$ 有 $n$ 个上指标、$m$ 个下指标，李导数仍是同型的张量场。` },
    { id: "dir", tex: R`#xd#tc`, glyph: R`\times`, name: "X[t]", label: R`把分量当函数求方向导数`, role: "const", note: R`这是 $\mathcal{L}_X$ 作用在系数上的结果 $X[t^{\ldots}{}_{\ldots}]$。只有这一项不含 $X$ 的导数。`,
      kids: [
        { id: "xd", tex: R`X^\lambda\partial_\lambda`, w: 2, name: "X", label: R`沿 $X$ 的方向导数`, role: "known", note: R`向量 $X$ 作用在函数上的形式。这里的 $\lambda$ 是求和的哑指标。` },
        { id: "tc", tex: R`t^{\mu_1\ldots\mu_n}{}_{\nu_1\ldots\nu_m}`, w: 1.5, name: "t", label: R`$t$ 的分量`, role: "known", note: R`指标原样不动，这一项没有换指标。` },
      ] },
    { id: "lower", tex: R`\sum_{s=1}^{m}#dxl#tl`, name: "for s in lower", label: R`每个下指标一项，取正号`, role: "const", note: R`来自 $\mathcal{L}_X\dd x^\nu=\partial_\lambda X^\nu\dd x^\lambda$。下指标有 $m$ 个，所以求和到 $m$。`,
      kids: [
        { id: "dxl", tex: R`\partial_{\nu_s}X^\lambda`, w: 6, name: "+ grad_X", label: R`$X$ 的导数：不是方向导数`, role: "known", note: R`**李导数依赖 $X$ 的导数，这是它和联络给出的方向导数的根本区别**（见 §7.2）。这里导数的指标是 $\nu_s$，$X$ 的指标是被求和的 $\lambda$。` },
        { id: "tl", tex: R`t^{\mu_1\ldots\mu_n}{}_{\nu_1\ldots\lambda\ldots\nu_m}`, w: 3, name: "t[nu_s -> lambda]", label: R`第 $s$ 个下指标换成 $\lambda$`, role: "known", note: R`其余指标不动，只有第 $s$ 个下指标换成哑指标 $\lambda$，与 $X^\lambda$ 缩并。` },
      ] },
    { id: "upper", tex: R`\sum_{s=1}^{n}#dxu#tu`, name: "for s in upper", label: R`每个上指标一项，取负号`, role: "const", note: R`来自 $\mathcal{L}_Xe_\mu=-\partial_\mu X^\lambda e_\lambda$，负号就在这里。$n=1,m=0$ 时只剩这一项和方向导数，回到 \eqref{5.49a}。`,
      kids: [
        { id: "dxu", tex: R`\partial_\lambda X^{\mu_s}`, w: 6, name: "- grad_X", label: R`同样的 $\partial X$，指标位置互换`, role: "known", note: R`**导数的指标是求和的 $\lambda$，$X$ 带上指标 $\mu_s$，与下指标项正好相反。**$n=0,m=1$ 时没有这一项，回到 \eqref{5.55}。` },
        { id: "tu", tex: R`t^{\mu_1\ldots\lambda\ldots\mu_n}{}_{\nu_1\ldots\nu_m}`, w: 3, name: "t[mu_s -> lambda]", label: R`第 $s$ 个上指标换成 $\lambda$`, role: "known", note: R`只有第 $s$ 个上指标换成 $\lambda$，与 $\partial_\lambda$ 缩并。` },
      ] },
  ],
};
