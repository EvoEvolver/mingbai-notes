// 章末习题（Problems 7.1–7.3）
import { Sec, Tx, Box, Exercise } from "@kit";

const R = String.raw;

export function Problems() {
  return (
    <Sec n="7.P" title="Problems" zh="章末习题">
      <Tx>{R`三道题分别把 \sref{T7.2} 推广到有挠情形、在三维中检验共形平坦的判据（与 \eqref{7.111}–\eqref{7.115} 配合），以及用和乐（§7.5）理解"局部平坦但整体不平坦"的宇宙弦时空。`}</Tx>
      <Exercise n="P7.1" title="有挠率时的 Bianchi 恒等式" level="★★★"
        hint={R`第一式：在轮换和 $\mathfrak S$ 内部重排 $\nabla_Y\nabla_XZ\to\nabla_X\nabla_ZY$、$\nabla_{[X,Y]}Z\to\nabla_{[Y,Z]}X$，再用挠率的定义 \eqref{7.36} 与 Jacobi 恒等式。第二式：照搬\sref{T7.2} 的证明，只是 $R(T(X,Y),Z)V$ 不再为零。`}
        solution={R`**第一 Bianchi 恒等式。**由定义 \eqref{7.37}，

$$\mathfrak S\{R(X,Y)Z\}=\mathfrak S\{\nabla_X\nabla_YZ\}-\mathfrak S\{\nabla_Y\nabla_XZ\}-\mathfrak S\{\nabla_{[X,Y]}Z\}.$$

轮换和对 $(X,Y,Z)$ 的循环重命名不变：取 $f(X,Y,Z)=\nabla_Y\nabla_XZ$，则 $f(Z,X,Y)=\nabla_X\nabla_ZY$，所以 $\mathfrak S\{\nabla_Y\nabla_XZ\}=\mathfrak S\{\nabla_X\nabla_ZY\}$；同理 $\mathfrak S\{\nabla_{[X,Y]}Z\}=\mathfrak S\{\nabla_{[Y,Z]}X\}$。于是

$$\mathfrak S\{R(X,Y)Z\}=\mathfrak S\{\nabla_X(\nabla_YZ-\nabla_ZY)-\nabla_{[Y,Z]}X\}=\mathfrak S\{\nabla_X[T(Y,Z)+[Y,Z]]-\nabla_{[Y,Z]}X\}.$$

而 $\nabla_X[Y,Z]-\nabla_{[Y,Z]}X=T(X,[Y,Z])+[X,[Y,Z]]$（\eqref{7.36}），Jacobi 恒等式使 $\mathfrak S\{[X,[Y,Z]]\}=0$，所以

$$\mathfrak S\{R(X,Y)Z\}=\mathfrak S\{T(X,[Y,Z])\}+\mathfrak S\{\nabla_X[T(Y,Z)]\}.$$

$T=0$ 时退化为 \eqref{7.81a}。（另一种常见写法：用 $(\nabla_XT)(Y,Z)=\nabla_X[T(Y,Z)]-T(\nabla_XY,Z)-T(Y,\nabla_XZ)$ 可改写为 $\mathfrak S\{R(X,Y)Z\}=\mathfrak S\{(\nabla_XT)(Y,Z)+T(T(X,Y),Z)\}$，两者等价。）

**第二 Bianchi 恒等式。**\sref{T7.2} 证明中，有两步不依赖无挠：(a) 在 $\mathfrak S$ 内重排，$\mathfrak S\{R(\nabla_XY,Z)-R(\nabla_YX,Z)\}=\mathfrak S\{R(\nabla_ZX,Y)+R(X,\nabla_ZY)\}$；(b) $\mathfrak S\{[\nabla_Z,R(X,Y)]-R([X,Y],Z)\}=0$（只用 $R=[\nabla,\nabla]-\nabla_{[\,,\,]}$ 与 Jacobi 恒等式）。于是

$$\mathfrak S\{R(T(X,Y),Z)\}V=\mathfrak S\{R(\nabla_ZX,Y)+R(X,\nabla_ZY)-R([X,Y],Z)\}V=\mathfrak S\{-(\nabla_ZR)(X,Y)+[\nabla_Z,R(X,Y)]-R([X,Y],Z)\}V=-\mathfrak S\{(\nabla_ZR)(X,Y)\}V,$$

（第二个等号用 Leibniz 律）即 $\mathfrak S\{(\nabla_ZR)(X,Y)\}V=\mathfrak S\{R(Z,T(X,Y))\}V$。循环重命名 $(X,Y,Z)\to(Y,Z,X)$：

$$\mathfrak S\{(\nabla_XR)(Y,Z)\}V=\mathfrak S\{R(X,T(Y,Z))\}V.$$

（顺带：步骤 (a) 中 $R(X,\nabla_ZY)$ 前是**加**号；原书式 (7.82) 第二行印作减号，见 §7.4.5 的勘误。）`}>
        {R`设 $\nabla$ 是挠率张量不为零的一般联络。证明第一 Bianchi 恒等式成为

$$\mathfrak S\{R(X,Y)Z\}=\mathfrak S\{T(X,[Y,Z])\}+\mathfrak S\{\nabla_X[T(Y,Z)]\}$$

其中 $\mathfrak S$ 是\sref{T7.2} 中定义的轮换和。再证明第二 Bianchi 恒等式为

$$\mathfrak S\{(\nabla_XR)(Y,Z)\}V=\mathfrak S\{R(X,T(Y,Z))\}V$$

其中 $\mathfrak S$ 只轮换 $X$、$Y$ 与 $Z$。`}
      </Exercise>

      <Exercise n="P7.2" title="三维的 Weyl–Schouten（Cotton）张量" level="★★★"
        hint={R`$C_{\lambda\mu\nu}=\nabla_\nu P_{\lambda\mu}-\nabla_\mu P_{\lambda\nu}$，$P\equiv \sym{Ric}{\mathit{Ric}}-\frac14\mathcal Rg$（三维的 Schouten 张量）。对 $\bar g=\mathrm{e}^{2\sigma}\delta$，由 \eqref{7.113}、\eqref{7.114a}（$m=3$，平直的 $\sym{Ric}{\mathit{Ric}}=0$、$\mathcal R=0$）证明 $\bar P_{\mu\nu}=-B_{\mu\nu}$，然后用 \eqref{7.106} 直接计算 $\bar\nabla_\nu B_{\lambda\mu}-\bar\nabla_\mu B_{\lambda\nu}$。`}
        solution={R`**改写。**由 $\nabla g=0$，$C_{\lambda\mu\nu}=\nabla_\nu P_{\lambda\mu}-\nabla_\mu P_{\lambda\nu}$，其中 $P_{\lambda\mu}=\sym{Ric}{\mathit{Ric}}_{\lambda\mu}-\frac14g_{\lambda\mu}\mathcal R$。

**共形平坦度规的 $P$。**设局部 $\bar g=\mathrm{e}^{2\sigma}\delta$。对平直的 $g=\delta$（$\Gamma=0$、$\sym{Ric}{\mathit{Ric}}=0$、$\mathcal R=0$），记 $\sigma_\mu=\partial_\mu\sigma$、$\sigma_{\mu\nu}=\partial_\mu\partial_\nu\sigma$、$s=\sigma_\rho\sigma_\rho$，由 \eqref{7.112}，$B_{\mu\nu}=-\sigma_\mu\sigma_\nu+\sigma_{\mu\nu}+\frac12s\,\delta_{\mu\nu}$（对称）。$m=3$ 时 \eqref{7.113}、\eqref{7.114a} 给出 $\overline{\sym{Ric}{\mathit{Ric}}}_{\mu\nu}=-\delta_{\mu\nu}B-B_{\mu\nu}$（$B\equiv B_\lambda{}^\lambda$）、$\mathrm{e}^{2\sigma}\bar{\mathcal R}=-4B$，所以

$$\bar P_{\mu\nu}=\overline{\sym{Ric}{\mathit{Ric}}}_{\mu\nu}-\tfrac14\mathrm{e}^{2\sigma}\delta_{\mu\nu}\bar{\mathcal R}=-\delta_{\mu\nu}B-B_{\mu\nu}+\delta_{\mu\nu}B=-B_{\mu\nu}.$$

**计算 $\bar C$。**由 \eqref{7.106}，$\bar\Gamma^\rho{}_{\nu\lambda}=\delta^\rho_\lambda\sigma_\nu+\delta^\rho_\nu\sigma_\lambda-\delta_{\nu\lambda}\sigma_\rho$。

$$-\bar C_{\lambda\mu\nu}=\big(\partial_\nu B_{\lambda\mu}-\partial_\mu B_{\lambda\nu}\big)-\big(\bar\Gamma^\rho{}_{\nu\lambda}B_{\rho\mu}-\bar\Gamma^\rho{}_{\mu\lambda}B_{\rho\nu}\big)$$

（含 $\bar\Gamma^\rho{}_{\nu\mu}B_{\lambda\rho}$ 的项对 $\mu\nu$ 对称而消去）。第一个括号（三阶导数 $\sigma_{\lambda\mu\nu}$ 对称而消去）：

$$\partial_\nu B_{\lambda\mu}-\partial_\mu B_{\lambda\nu}=\sigma_\nu\sigma_{\lambda\mu}-\sigma_\mu\sigma_{\lambda\nu}+\delta_{\lambda\mu}\sigma_\rho\sigma_{\rho\nu}-\delta_{\lambda\nu}\sigma_\rho\sigma_{\rho\mu}.$$

第二个括号：用 $\sigma_\rho B_{\rho\mu}=\sigma_\rho\sigma_{\rho\mu}-\frac12s\sigma_\mu$，

$$\bar\Gamma^\rho{}_{\nu\lambda}B_{\rho\mu}-(\mu\leftrightarrow\nu)=\sigma_\nu B_{\lambda\mu}-\sigma_\mu B_{\lambda\nu}-\delta_{\nu\lambda}\sigma_\rho B_{\rho\mu}+\delta_{\mu\lambda}\sigma_\rho B_{\rho\nu}=\sigma_\nu\sigma_{\lambda\mu}-\sigma_\mu\sigma_{\lambda\nu}-\delta_{\nu\lambda}\sigma_\rho\sigma_{\rho\mu}+\delta_{\mu\lambda}\sigma_\rho\sigma_{\rho\nu}$$

（$\sigma\sigma\sigma$ 项与 $s$ 项都成对相消）。两个括号逐项相等，所以 $\bar C_{\lambda\mu\nu}=0$。$C$ 是张量，在一个坐标系中为零就处处为零：共形平坦的三维流形上 $C_{\lambda\mu\nu}=0$。

**为什么三维要用 $C_{\lambda\mu\nu}$ 而不是 Weyl 张量：**三维中 $F(3)=6$（\eqref{7.88}）恰等于对称张量 $\sym{Ric}{\mathit{Ric}}_{\mu\nu}$ 的分量数，Riemann 张量完全由 Ricci 张量决定：$R_{\kappa\lambda\mu\nu}=g_{\kappa\mu}P_{\lambda\nu}-g_{\kappa\nu}P_{\lambda\mu}-g_{\lambda\mu}P_{\kappa\nu}+g_{\lambda\nu}P_{\kappa\mu}$，于是 \eqref{7.115} 的 Weyl 张量恒为零，不能作判据。三维的共形不变量是三阶导数的 $C_{\lambda\mu\nu}$（Cotton 张量）。`}>
        {R`设 $(M,g)$ 是共形平坦的三维流形。证明由

$$C_{\lambda\mu\nu}\equiv\nabla_\nu \sym{Ric}{\mathit{Ric}}_{\lambda\mu}-\nabla_\mu \sym{Ric}{\mathit{Ric}}_{\lambda\nu}-\tfrac14(g_{\lambda\mu}\partial_\nu\mathcal R-g_{\lambda\nu}\partial_\mu\mathcal R)$$

定义的 **Weyl–Schouten 张量**为零。已知 $\dim M=3$ 时 $C_{\lambda\mu\nu}=0$ 是共形平坦的充要条件。`}
      </Exercise>

      <Exercise n="P7.3" title="宇宙弦时空" level="★★"
        hint={R`换元后度规局部是 Minkowski 的，但 $\tilde\phi$ 的周期不是 $2\pi$。用和乐（§7.5）或 Gauss–Bonnet 看 $r=0$：绕 $z$ 轴一圈，向量转过多少？`}
        solution={R`**化为 Minkowski 形式。**令 $\tilde\phi\equiv(1-4\mu)\phi$，则 $(1-4\mu)^2r^2\dd\phi\otimes\dd\phi=r^2\dd\tilde\phi\otimes\dd\tilde\phi$，

$$g=-\dd t\otimes\dd t+\dd r\otimes\dd r+r^2\dd\tilde\phi\otimes\dd\tilde\phi+\dd z\otimes\dd z,$$

正是柱坐标中的 Minkowski 度规。

**但它不是 Minkowski 时空。**$\phi$ 的周期是 $2\pi$，所以 $\tilde\phi$ 的周期是 $2\pi(1-4\mu)$：把 Minkowski 空间的 $(r,\tilde\phi)$ 平面切去一个角度为 $8\pi\mu$ 的楔形，再把两条边粘起来——每个 $t,z$ 截面都是一个**圆锥面**。局部（$r>0$）与 Minkowski 等距，整体不同。

**曲率。**$r>0$ 处，度规分量与 Minkowski 的柱坐标形式相同，Riemann 张量的所有分量为零（直接计算：$(r,\phi)$ 部分 $\dd r^2+\alpha^2r^2\dd\phi^2$，$\alpha=1-4\mu$，唯一非零的 Christoffel 符号 $\Gamma^r{}_{\phi\phi}=-\alpha^2r$、$\Gamma^\phi{}_{r\phi}=1/r$，$R^r{}_{\phi r\phi}=\partial_r\Gamma^r{}_{\phi\phi}-\Gamma^\phi{}_{r\phi}\Gamma^r{}_{\phi\phi}=-\alpha^2+\alpha^2=0$；其余方向是平凡的乘积）。

**$r=0$ 的锥形奇点。**沿圆周 $r=r_0$、$z,t$ 固定平行移动一个向量。由 \eqref{7.18b}（与例 7.7 同法，$\Gamma^r{}_{\phi\phi}=-\alpha^2r_0$、$\Gamma^\phi{}_{\phi r}=1/r_0$）：$\partial_\phi X^r=\alpha^2r_0X^\phi$，$\partial_\phi X^\phi=-X^r/r_0$，于是 $X^r$ 以角频率 $\alpha$ 振荡，绕一圈后相对坐标标架转过 $2\pi\alpha$，即相对平移后的原向量转过亏角

$$\Delta=2\pi-2\pi\alpha=8\pi\mu,$$

与 $r_0$ 无关。若时空在 $r=0$ 处也光滑，小回路的和乐应趋于零（\eqref{7.44}）；现在它保持有限，说明曲率集中在 $r=0$ 这条线（弦）上：二维截面的 Gauss 曲率是 $\delta$ 函数，$K\sqrt g=8\pi\mu\,\delta^2(x)$（Gauss–Bonnet：$\iint K\,\dd A=\Delta$）。这是"有挠无曲"的反面：**无曲（$r>0$）却有和乐**——§7.5 中"$H(p)$ 平凡 $\iff R=0$"只对单连通区域成立的例子。

**物理。**用 Einstein 方程，$\Delta=8\pi G\mu_{\rm lin}$，$\mu_{\rm lin}$ 是弦的线质量密度（这里取 $G=1$，$\mu$ 就是线密度）。远处的光线从弦两侧经过后会聚，产生双像（引力透镜）；而弦外没有任何潮汐力。条件 $\mu\neq1/4$ 排除 $\alpha=0$ 的退化度规；$0<\mu<1/2$ 时 $|\alpha|<1$。

［注：原书题面的度规印作 $(1-4\mu^2)r^2\dd\phi\otimes\dd\phi$，与随后的换元 $\tilde\phi=(1-4\mu)\phi$ 不相容；应为 $(1-4\mu)^2$，题面已改正。］`}>
        {R`考虑度规

$$g=-\dd t\otimes\dd t+\dd r\otimes\dd r+(1-4\mu)^2r^2\dd\phi\otimes\dd\phi+\dd z\otimes\dd z$$

其中 $0<\mu<1/2$，$\mu\neq1/4$。引入新变量 $\tilde\phi\equiv(1-4\mu)\phi$，证明度规 $g$ 化为 Minkowski 度规。这是否意味着 $g$ 描述 Minkowski 时空？计算 Riemann 曲率张量，证明在 $r=0$ 处有弦状奇点。这个奇点是**锥形的**（除了沿这条线以外时空都是平坦的）。这个度规是宇宙弦时空的模型。`}
      </Exercise>
      <Box kind="warning" title={R`勘误：习题 7.3 中的 $(1-4\mu)^2$（p.327）`}>{R`原书度规中 $\dd\phi\otimes\dd\phi$ 的系数印作 $(1-4\mu^2)r^2$。要让 $\tilde\phi=(1-4\mu)\phi$ 把它化为 $r^2\dd\tilde\phi\otimes\dd\tilde\phi$，系数必须是 $(1-4\mu)^2r^2$；条件 "$\mu\neq1/4$"（而不是 $\mu\neq1/2$）也只对 $(1-4\mu)^2$ 有意义。题面已改正。`}</Box>
    </Sec>);
}
