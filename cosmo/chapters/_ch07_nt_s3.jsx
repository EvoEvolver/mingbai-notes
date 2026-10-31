// §7.3 补充符号（核心条目见 _ch07_notation.jsx）
const R = String.raw;
export const NT = [
  { sym: R`\hat a^\dagger`, name: "产生算符", en: "creation operator", def: R`$\hat a$ 的 Hermite 共轭；作用在真空 $|0\rangle$ 上得到含一个粒子的态。$[\hat a,\hat a^\dagger]=1$ \eqref{7.21}`, unit: "无量纲", eq: "7.21" },
  { sym: R`\hat a_{\boldsymbol k}`, name: R`波矢 $\boldsymbol k$ 模式的湮灭算符`, def: R`每个 Fourier 模式一个"振子"，各有自己的 $\hat a_{\boldsymbol k}$、$\hat a^\dagger_{\boldsymbol k}$；连续极限下 $[\hat a_{\boldsymbol k},\hat a^\dagger_{\boldsymbol k'}]=(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k-\boldsymbol k')$`, unit: "—", eq: "7.32" },
  { sym: R`v^*`, name: "模函数的复共轭", def: R`$\hat a^\dagger$ 的系数（负频解）；$\hat x=v\hat a+v^*\hat a^\dagger$ 保证 $\hat x$ 是 Hermite 算符`, unit: R`质量$^{-1/2}$`, eq: "7.20" },
  { sym: R`\hat h`, name: R`张量扰动 $h$ 的量子算符`, def: R`$\hat h=\sqrt{16\pi G}\,\hat{\mathfrak h}/a$；它的真空涨落定义张量功率谱 $P_h$ \eqref{7.35}`, unit: "无量纲", eq: "7.35" },
  { sym: R`\Delta_h`, name: "无量纲张量功率谱（单一偏振）", def: R`$\Delta_h^2=\frac{k^3}{2\pi^2}P_h$ \eqref{7.36}：$\ln k$ 每单位间隔内的 $h$ 方差；视界外 $\Delta_h^2=4GH^2/\pi$`, unit: "无量纲", eq: "7.36" },
  { sym: R`a''`, name: R`标度因子对 $\eta$ 的二阶导数`, def: R`$a''/a$ 在 \eqref{7.33} 中扮演"负的质量平方"；暴胀期间 $a''/a\simeq2/\eta^2$ \eqref{7.38}`, unit: R`共动长度$^{-2}$`, eq: "7.38" },
  { sym: R`W`, name: "Wronski 行列式", en: "Wronskian", def: R`$W\equiv vv^{*\prime}-v^*v'$；对形如 $v''+\omega^2(\eta)v=0$ 的方程 $W$ 守恒，归一化要求 $W=i$（等价于 $[\hat x,\hat p]=i$）`, unit: "无量纲" },
];
