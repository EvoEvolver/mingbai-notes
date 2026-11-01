import { ManifoldRedraw } from "./_redraw_manifolds.jsx";
// §5.5 微分形式的积分 —— 式 (5.97)–(5.102)，定义 5.6–5.7，例 5.13，图 5.14
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Derivation, C } from "@kit";

const R = String.raw;

export function Sec55() {
  return (
    <Sec n="5.5" title="Integration of differential forms" zh="微分形式的积分"
      gist={R`换坐标时基 $\{e_\mu\}$ 的变换行列式 $J$ 的符号定义定向 → 可定向（\sref{D5.6}）$\iff$ 存在处处非零的 $m$ 形式（体积元）；$m$ 形式的分量乘 Jacobi 行列式（\eqref{5.99}）→ 在一张卡里 $\int f\omega$ 就是普通多重积分 → 用单位分解（\sref{D5.7}）拼成整体积分 $\int_Mf\omega=\sum_i\int_{U_i}f_i\omega$。`}
      why={R`$m$ 形式在坐标变换下恰好乘上 Jacobi 行列式——与多重积分的换元公式相同（只差绝对值）。所以 $m$ 形式是天然的被积对象；绝对值的差别就是"定向"要解决的问题。`}
      gives={["5.97", "5.99", "5.100", "5.102"]}>
      <p className="muted">本节概念：<C id="integration" /></p>

      <Sub n="5.5.1" title="Orientation" zh="定向">
        <Tx>{R`微分形式在流形 $M$ 上的积分只有当 $M$ "可定向"时才有定义，所以先定义流形的定向。设 $M$ 是连通的 $m$ 维微分流形。在点 $p\in M$，切空间 $T_pM$ 由基 $\{e_\mu\}=\{\partial/\partial x^\mu\}$ 张成，$x^\mu$ 是 $p$ 所在卡 $U_i$ 的局部坐标。设 $U_j$ 是另一张卡，$U_i\cap U_j\neq\emptyset$，局部坐标为 $y^\alpha$。若 $p\in U_i\cap U_j$，$T_pM$ 既由 $\{e_\mu\}$ 张成，也由 $\{\tilde e_\alpha\}=\{\partial/\partial y^\alpha\}$ 张成。基的变换为`}</Tx>
        <Eq n="5.97" say={R`同一切空间的两组坐标基之间由 Jacobi 矩阵联系；这个矩阵行列式的正负决定两组基是否"同手性"。`}>{R`\tilde e_\alpha=\left(\frac{\partial x^\mu}{\partial y^\alpha}\right)e_\mu.`}</Eq>
        <Tx>{R`若在 $U_i\cap U_j$ 上 $J=\det(\partial x^\mu/\partial y^\alpha)>0$，称 $\{e_\mu\}$ 与 $\{\tilde e_\alpha\}$ 在 $U_i\cap U_j$ 上定义**相同的定向**；若 $J<0$，则定义**相反的定向**。`}</Tx>
        <Stmt id="D5.6" />
        <Tx>{R`若 $M$ 不可定向，$J$ 就不可能在所有卡的交集上都为正。例如\figref{5.14}(a) 中的 Möbius 带不可定向，因为我们不得不在交集 B 上取 $J$ 为负。

**体积元。**若 $m$ 维流形 $M$ 可定向，则存在一个处处不为零的 $m$ 形式 $\omega$。这个 $m$ 形式 $\omega$ 称为**体积元**（volume element），在把函数 $f\in\mathcal{F}(M)$ 在 $M$ 上积分时起测度的作用。若存在严格为正的函数 $h\in\mathcal{F}(M)$ 使 $\omega=h\omega'$，称两个体积元 $\omega$ 与 $\omega'$ **等价**。负定的函数 $h'\in\mathcal{F}(M)$ 给出 $M$ 的不等价的定向。因此任何可定向流形都恰有**两个**不等价的定向，一个称为**右手的**（right handed），另一个称为**左手的**（left handed）。取 $m$ 形式`}</Tx>
        <Eq n="5.98" say={R`局部上，$m$ 形式只有一个分量：一个函数乘坐标的"体积楔积"。分量处处为正就代表一个定向。`}>{R`\omega=h(p)\,\dd x^1\wedge\ldots\wedge\dd x^m`}</Eq>
        <Figure n="5.14" illustration={<ManifoldRedraw n="5.14"/>} caption={R`Möbius带沿带方向绕行后，局部标架的横向基矢反转：转移矩阵行列式为 $-1$，因此不能全局定向。`} width="80%" />
        <Tx>{R`其中 $h(p)$ 在坐标为 $x=\varphi(p)$ 的卡 $(U,\varphi)$ 上正定。若 $M$ 可定向，就可以把 $\omega$ 延拓到整个 $M$，使它的分量 $h$ 在每张卡 $U_i$ 上都正定；这时 $\omega$ 是体积元。注意 $h$ 的正性与坐标的选取无关。事实上，设 $p\in U_i\cap U_j\neq\emptyset$，$x^\mu$ 与 $y^\alpha$ 分别是 $U_i$ 与 $U_j$ 的坐标，则 \eqref{5.98} 变成`}</Tx>
        <Eq n="5.99" title="m 形式的变换" say={R`换坐标时，$m$ 形式的分量乘上 Jacobi 行列式——与多重积分换元公式中的 Jacobi 因子相同，只是带符号。`}>{R`\omega=h(p)\frac{\partial x^1}{\partial y^{\mu_1}}\dd y^{\mu_1}\wedge\ldots\wedge\frac{\partial x^m}{\partial y^{\mu_m}}\dd y^{\mu_m}=h(p)\det\left(\frac{\partial x^\mu}{\partial y^\nu}\right)\dd y^1\wedge\ldots\wedge\dd y^m.`}</Eq>
        <Derivation title={R`为什么楔积给出的恰好是行列式`} collapsed steps={[
          { tex: R`\dd y^{\mu_1}\wedge\cdots\wedge\dd y^{\mu_m}=\varepsilon^{\mu_1\ldots\mu_m}\,\dd y^1\wedge\cdots\wedge\dd y^m`, why: R`$m$ 个一形式在 $m$ 维中：指标有重复则为零（性质 (i)），否则是 $(1,\ldots,m)$ 的一个置换，等于其符号乘标准顺序（性质 (ii)）。` },
          { tex: R`\frac{\partial x^1}{\partial y^{\mu_1}}\cdots\frac{\partial x^m}{\partial y^{\mu_m}}\varepsilon^{\mu_1\ldots\mu_m}=\det\left(\frac{\partial x^\mu}{\partial y^\nu}\right)`, why: R`这正是行列式的 Leibniz 展开式。` },
        ]} result={R`$\dd x^1\wedge\cdots\wedge\dd x^m=J\,\dd y^1\wedge\cdots\wedge\dd y^m$，$J=\det(\partial x/\partial y)$。`} />
        <Tx>{R`\eqref{5.99} 中的行列式就是坐标变换的 Jacobi 行列式，由所设的可定向性它必须为正。若 $M$ 不可定向，就不能在 $M$ 上定义分量正定的 $\omega$。再看\figref{5.14}：若沿图中所示方向绕带子一周，回到起点时 $\omega=\dd x\wedge\dd y$ 变号，$\dd x\wedge\dd y\to-\dd x\wedge\dd y$。因此 $\omega$ 无法在 $M$ 上唯一地定义。`}</Tx>
        <Box kind="physics" title="定向与宇称">{R`物理中"右手系与左手系"的区别正是 $\R^3$ 的两个定向。$\varepsilon^{\mu\nu\lambda}$、叉乘、磁场 $\boldsymbol{B}$（作为二形式的对偶）都依赖于定向，所以在空间反射下多一个负号——它们是赝矢量。弱相互作用宇称不守恒说明：自然规律本身"知道"时空的定向。在不可定向的空间里，这样的定律甚至无法整体地写出来。`}</Box>
      </Sub>

      <Sub n="5.5.2" title="Integration of forms" zh="形式的积分">
        <Tx>{R`现在可以定义函数 $f:M\to\R$ 在可定向流形 $M$ 上的积分了。取体积元 $\omega$。在坐标为 $x$ 的坐标邻域 $U_i$ 中，定义 $m$ 形式 $f\omega$ 的积分为`}</Tx>
        <Eq n="5.100" title="一张卡里的积分" say={R`在一张卡里，形式的积分就是把分量函数（$f$ 乘体积元的分量 $h$）当作普通的 $m$ 元函数，做普通的多重积分。`}>{R`\int_{U_i}f\omega\equiv\int_{\varphi(U_i)}f(\varphi_i^{-1}(x))\,h(\varphi_i^{-1}(x))\,\dd x^1\ldots\dd x^m.`}</Eq>
        <Tx>{R`右边是 $m$ 元函数的普通多重积分。**与卡无关**：若 $f\omega$ 的支集同时含于 $U_i$ 与 $U_j$，由多重积分换元公式，$\dd x^1\cdots\dd x^m=|J|\,\dd y^1\cdots\dd y^m$；而由 \eqref{5.99}，$\omega$ 在 $y$ 坐标中的分量是 $hJ$。定向一致时 $J>0$，$|J|=J$，两种算法的被积函数逐点相同。（若 $J<0$，两种算法差一个负号——这就是为什么积分需要定向。）

一旦定义了 $f$ 在 $U_i$ 上的积分，就可以借助下面定义的"单位分解"给出 $f$ 在整个 $M$ 上的积分。`}</Tx>
        <Stmt id="D5.7" />
        <Tx>{R`由条件 (iii)，`}</Tx>
        <Eq n="5.101" say={R`利用单位分解把函数切成许多小块，每一块只在一张卡里不为零。`}>{R`f(p)=\sum_if(p)\varepsilon_i(p)=\sum_if_i(p)`}</Eq>
        <Tx>{R`其中由 (ii)，$f_i(p)\equiv f(p)\varepsilon_i(p)$ 在 $U_i$ 之外为零。于是给定点 $p\in M$，所设的仿紧性保证 \eqref{5.101} 中对 $i$ 的求和只有有限项。对每个 $f_i(p)$，可以按 \eqref{5.100} 定义它在 $U_i$ 上的积分。最后，$f$ 在 $M$ 上的积分定义为`}</Tx>
        <Eq n="5.102" keyEq title="整体积分" say={R`整体积分 = 各张卡中局部积分之和，每张卡只积分属于它的那一块。`}>{R`\int_Mf\omega\equiv\sum_i\int_{U_i}f_i\omega.`}</Eq>
        <Tx>{R`虽然另一个图册 $\{(V_i,\psi_i)\}$ 给出不同的坐标与不同的单位分解，\eqref{5.102} 定义的积分保持不变。`}</Tx>
        <Derivation title={R`为什么与图册、单位分解的选取无关（本站补充）`} collapsed steps={[
          { tex: R`\sum_i\int_{U_i}f\varepsilon_i\omega=\sum_i\sum_j\int_{U_i}f\varepsilon_i\delta_j\omega`, why: R`设 $\{\delta_j\}$ 是从属于另一个覆盖 $\{V_j\}$ 的单位分解，在每项中插入 $1=\sum_j\delta_j$（有限和）。` },
          { tex: R`\int_{U_i}f\varepsilon_i\delta_j\omega=\int_{V_j}f\varepsilon_i\delta_j\omega`, why: R`被积形式只在 $U_i\cap V_j$ 上不为零；上面已说明同一个积分用两张同定向的卡计算结果相同。` },
          { tex: R`\sum_j\sum_i\int_{V_j}f\varepsilon_i\delta_j\omega=\sum_j\int_{V_j}f\delta_j\omega`, why: R`交换有限和的次序，再用 $\sum_i\varepsilon_i=1$。` },
        ]} result={R`两种定义给出同一个数。`} />
        <Box kind="example" n="5.13" title={R`用单位分解计算 $\int_{S^1}\cos^2\theta$`}>{R`取例 5.2 中 $S^1$ 的图册。令 $U_1=S^1-\{(1,0)\}$，$U_2=S^1-\{(-1,0)\}$，$\varepsilon_1(\theta)=\sin^2(\theta/2)$，$\varepsilon_2(\theta)=\cos^2(\theta/2)$。

**验证这是单位分解**（原书留给读者）：$0\le\varepsilon_i\le1$；$\varepsilon_1+\varepsilon_2=1$；$\varepsilon_1$ 在唯一不属于 $U_1$ 的点 $\theta=0$（即 $(1,0)$）处为零，$\varepsilon_2$ 在唯一不属于 $U_2$ 的点 $\theta=\pi$ 处为零。两个函数都是 $\cos\theta$ 的线性函数（$\varepsilon_{1,2}=\frac12(1\mp\cos\theta)$），所以在 $S^1$ 上光滑。

来积分函数 $f=\cos^2\theta$。［当然我们知道 $\int_0^{2\pi}\dd\theta\cos^2\theta=\pi$，但这里用单位分解来做。］在 $U_1$ 中用卡 $\varphi_1$（$\theta\in(0,2\pi)$），在 $U_2$ 中用卡 $\varphi_2$（$\theta\in(-\pi,\pi)$）：

$$\int_{S^1}\dd\theta\cos^2\theta=\int_0^{2\pi}\dd\theta\,\sin^2\frac\theta2\cos^2\theta+\int_{-\pi}^{\pi}\dd\theta\,\cos^2\frac\theta2\cos^2\theta=\tfrac12\pi+\tfrac12\pi=\pi.$$

（第一项：$\sin^2\frac\theta2=\frac12(1-\cos\theta)$，$\int_0^{2\pi}\frac12\cos^2\theta=\frac\pi2$，而 $\int_0^{2\pi}\cos^3\theta=0$；第二项同理。）`}</Box>
        <Box kind="warning" title={R`注意：严格的单位分解要求"支集"在 $U_i$ 中`}>{R`\sref{D5.7} 的 (ii) 只要求 $\varepsilon_i$ 在 $U_i$ 外为零。标准的定义要求 $\varepsilon_i$ 的**支集**（$\varepsilon_i\neq0$ 之集的闭包）含于 $U_i$。例 5.13 中 $\varepsilon_1=\sin^2(\theta/2)$ 的支集是整个 $S^1$，严格说不符合要求；但它只在一个点上越界，而单点对积分没有贡献，所以计算结果不受影响。要构造严格的单位分解，需要用 $\mathrm{e}^{-1/t}$ 型的光滑"鼓包函数"。`}</Box>
        <Tx>{R`**体积元的分量没有典范选择。**到目前为止，只要 $h$ 严格为正，我们就让它保持任意。读者也许想把 $h$ 取为 1。但正如 \eqref{5.99} 所示，换坐标时 $h$ 要乘以 Jacobi 行列式，没有典范的方式挑出分量 $h$：在一套坐标中为 1，在另一套中未必为 1。若流形带有度规，情况就不同了，见第 7 章（那里 $h=\sqrt{|g|}$）。`}</Tx>
        <Box kind="aside" title="预告：Stokes 定理">{R`本节只定义了 $m$ 形式在 $m$ 维流形上的积分。$r$ 形式可以在 $r$ 维子流形（或第 6 章的 $r$ 链）上积分：先用嵌入把它拉回。第 6 章将证明 **Stokes 定理** $\int_M\dd\omega=\int_{\partial M}\omega$，它统一了 Newton–Leibniz 公式、Green 公式、Gauss 公式与经典 Stokes 公式。交互图 3 在正方形与立方体上用数值积分验证了它的两个特例。`}</Box>
      </Sub>
    </Sec>);
}
