// §13.5 阿贝尔反常与非阿贝尔反常 —— 式 (13.84)–(13.105)，习题 13.2，图 13.2–13.4
import { Sec, Sub, Tx, Eq, Box, Derivation, Figure, Exercise, Stmt, C } from "@kit";
import { DN, TR, CH, IND, FG, CHI } from "./_ch13_tex.js";

const R = String.raw;
const DH = R`\mathrm{i}\hat D`;
const Ag = R`\mathcal{A}^{g(\theta)}`;
const Fg = R`\mathcal{F}^{g(\theta)}`;
const NN = R`\mathcal{N}`;

export function Sec135() {
  return (
    <Sec n="13.5" title="Abelian anomalies versus non-Abelian anomalies" zh="阿贝尔反常与非阿贝尔反常"
      gist={R`规范变换的圈 $g(\theta,x)$（$g(0,x)=g(2\pi,x)=e$）是映射 $S^1\wedge S^m=S^{m+1}\to G$，按 $\pi_{m+1}(G)$ 分类 → $\det\mathrm{i}\hat D$ 的模沿规范轨道不变，相位 $\mathrm{e}^{\mathrm{i}w(\mathcal{A},\theta)}$ 绕单位圆 $\mathcal{N}$ 圈（\eqref{13.90}）→ 用 $\mathcal{A}^{t,\theta}=t\mathcal{A}^{g(\theta)}$ 把圆圈填成圆盘，$\mathcal{N}=\sum m_i$ 是零点的局部卷绕数之和（\eqref{13.94}）→ 把圆盘与另一圆盘粘成 $S^2$，$g$ 成为 $S^2\times S^m$ 上 $G$ 丛的转移函数：$\mathcal{N}=\ind\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_{m+2}=\int\mathrm{ch}_{l+1}$（\eqref{13.98}）→ 展开 $\omega=g^{-1}\dd_\theta g$ 的一次项：$\delta_\omega W=2\pi\mathrm{i}\int Q^1_m$（\eqref{13.103}），带归一化地得到 \eqref{13.105}。`}
      why={R`回答 Sumitani 的两个问题：为什么从高两维的阿贝尔反常出发（因为相位卷绕就是高两维的指标），以及归一化怎样定出（指标是整数，$\frac1{24\pi^2}$ 由此唯一确定）。`}
      gives={["13.86", "13.88", "13.90", "13.94", "13.98", "13.101", "13.103", "13.105"]}>
      <p className="muted">本节概念：<C id="phase_winding" /> · <C id="nonabelian_anomaly" /> · <C id="descent" /></p>
      <Tx>{R`考虑 $m$ 维欧氏空间（$m=2l$），紧化为 $S^m=\R^m\cup\{\infty\}$；设 $G$ 是**单连通**的半单规范群（例如 $\mathrm{SU}(N)$，$\pi_1(\mathrm{SU}(N))$ 平凡）。考虑单参数的规范变换族 $g(\theta,x)$（$0\le\theta\le2\pi$），满足`}</Tx>
      <Eq n="13.84" say={R`规范变换的一个闭合圈：从恒等变换出发，沿 $\theta$ 走一圈回到恒等变换。`}>{R`g(0,x)=g(2\pi,x)=e.`}</Eq>
      <Tx>{R`不失一般性，可以把 $g$ 归一化为在某点 $x_0\in S^m$ 处 $g(\theta,x_0)=e$。映射 $g:S^1\times S^m\to G$ 按同伦类 $\pi_{m+1}(G)$ 分类。为说明这一点，定义拓扑空间 $X$ 与 $Y$ 的 **smash 积** $X\wedge Y$：它是直积 $X\times Y$ 把 $X\vee Y\equiv(x_0\times X)\cup(X\times y_0)$ 收缩成一点所得的空间。由图 13.2 容易看出 $S^1\wedge S^m=S^m\wedge S^1=S^{m+1}$（读者可以自己画出 $S^1\wedge S^1=S^2$ 来说服自己：环面 $S^1\times S^1$ 把一条经线和一条纬线捏成一点，就是球面）。反复应用得到`}</Tx>
      <Eq n="13.85" say={R`球面的 smash 积仍是球面，维数相加。`}>{R`S^m\wedge S^n=S^{m+n}.`}</Eq>
      <Figure n="13.2" caption={R`smash 积 $S^1\wedge S^m\simeq S^{m+1}$。`} width="48%" />
      <Tx>{R`在我们关心的情形，条件 \eqref{13.84}（以及 $g(\theta,x_0)=e$）使直积 $S^1\times S^m$ 在拓扑上看起来像 $S^1\wedge S^m=S^{m+1}$：$X\vee Y$ 上 $g\equiv e$，可以把它捏成一点。于是 $g$ 可以看作从 $S^{m+1}$ 到 $G$ 的映射，按 $\pi_{m+1}(G)$ 分类。由于这是空间 $\mathfrak{G}=\Omega^m(G)$ 中的一个单参数族（一个圈），我们也有 $\pi_{m+1}(G)=\pi_1(\mathfrak{G})$。实际上我们取 $G=\mathrm{SU}(N)$，对它有`}</Tx>
      <Eq n="13.86" title={R`$\pi_{m+1}(\mathrm{SU}(N))$`} say={R`秩足够大时（稳定范围），$\mathrm{SU}(N)$ 的奇数阶同伦群 $\pi_{2l+1}$ 都是整数群：规范变换的圈有整数个"拓扑类"。`}>{R`\pi_{m+1}(\mathrm{SU}(N))=\Z\qquad N\ge\tfrac12m+1.`}</Eq>
      <Tx>{R`（例如 $m=2$：$\pi_3(\mathrm{SU}(2))=\Z$；$m=4$：$\pi_5(\mathrm{SU}(3))=\Z$，但 $\pi_5(\mathrm{SU}(2))=\Z_2$，所以四维时要 $N\ge3$。）

**参考规范场与相位。**现在在零瞬子扇区 $\Omega^m_0(G)$ 中取一个"参考"规范场 $\mathcal{A}$，不失一般性可以假定 Dirac 算子 \eqref{13.49} 没有零模。考虑单参数规范势族`}</Tx>
      <Eq n="13.87" say={R`沿规范变换的圈把参考规范场搬一圈：$\mathcal{A}^{g(\theta)}$ 都是同一个物理构型，在 $\mathfrak{A}$ 的纤维（规范轨道）上画出一个闭曲线。`}>{R`${Ag}(x)\equiv g^{-1}(\theta,x)(\mathcal{A}(x)+\dd)g(\theta,x)`}</Eq>
      <Tx>{R`其中 $\theta$ 参数化 $S^1$。§13.3 中看到 $|\det\mathrm{i}\hat D|$ 规范不变（见 \eqref{13.47}），只有 $\det\mathrm{i}\hat D$ 的**相位**可能在规范变换下获得反常变化。特别地，这意味着 $\det\mathrm{i}\hat D$ 对任何 $\theta$ 都不为零。我们写`}</Tx>
      <Eq n="13.88" title="反常相位" say={R`手征行列式 = 规范不变的模（非手征 Dirac 行列式的平方根）乘以反常相位 $\mathrm{e}^{\mathrm{i}w}$。`}>{R`\exp\{-W_r[${Ag}]\}=\det${DH}(${Ag})=[\det\mathrm{i}${DN}(\mathcal{A})]^{1/2}\exp[\mathrm{i}w(\mathcal{A},\theta)]`}</Eq>
      <Tx>{R`其中 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 是 Dirac 算子 \eqref{13.49}，$\exp[\mathrm{i}w(\mathcal{A},\theta)]$ 是与规范变换 \eqref{13.87} 相联系的反常相位（由 \eqref{13.47}–\eqref{13.48}，$|\det\mathrm{i}\hat D|$ 与 $[\det\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}]^{1/2}$ 只差无关常数因子）。

接下来考虑一个**双**参数规范场族 $\mathcal{A}^{t,\theta}$（$0\le t\le1$），它在 $\mathcal{A}=0$ 与 $\mathcal{A}^{g(\theta)}$ 之间插值：`}</Tx>
      <Eq n="13.89" say={R`把规范轨道上的圈"填"成一个圆盘：径向参数 $t$ 把每个 $\mathcal{A}^{g(\theta)}$ 线性缩到零。圆盘内部的构型一般不再规范等价。`}>{R`\mathcal{A}^{t,\theta}\equiv t${Ag}\qquad(0\le t\le1).`}</Eq>
      <Tx>{R`由 $(t,\theta)$ 给定的参数空间看作以 $(t,\theta)$ 为极坐标的二维单位圆盘 $D^2$。在圆盘边界 $\partial D^2=S^1$ 上，$\det\mathrm{i}\hat D(\mathcal{A}^{1,\theta})$ 的模是不为零的常数。于是相位 $\mathrm{e}^{\mathrm{i}w(\mathcal{A},\theta)}$ 定义了一个映射 $S^1(=\partial D^2)\to S^1(=\mathrm{U}(1))$；见图 13.3。`}</Tx>
      <Figure n="13.3" caption={R`有效作用量 $W[\mathcal{A}^{g(\theta)}]$ 的相位定义了映射 $S^1\to\mathrm{U}(1)$，$\theta\mapsto\mathrm{e}^{\mathrm{i}w(\mathcal{A},\theta)}$。圆盘上有若干点 $\{p_i\}$ 使 $\det\mathrm{i}\hat D(\mathcal{A}^{t,\theta})$ 为零。映射 $S^1\to\mathrm{U}(1)$ 的卷绕数等于沿各小回路 $C_i$ 的卷绕数之和。`} width="80%" />
      <Tx>{R`沿圆盘边界走一圈，相位在单位圆上绕圈。这个映射的卷绕数是整数`}</Tx>
      <Eq n="13.90" keyEq title="相位卷绕数" say={R`沿规范变换的圈走一圈，手征行列式的相位绕单位圆 $\mathcal{N}$ 圈；$\mathcal{N}\neq0$ 就意味着反常不可能被局部抵消项消除。`}>{R`${NN}=\frac1{2\pi}\int_0^{2\pi}\frac{\partial w(\mathcal{A},\theta)}{\partial\theta}\dd\theta.`}</Eq>
      <Tx>{R`下面会看到，$\mathcal{N}$ 由 $(m+2)$ 维的阿贝尔反常导出。`}</Tx>
      <Eq n="13.91" say={R`有效作用量沿规范变换的闭圈不回到原值，而是差 $-2\pi\mathrm{i}\mathcal{N}$：$\mathrm{e}^{-W}$ 单值，$W$ 本身多值——一个 Berry 相位。`}>{R`W[\mathcal{A}^{g(2\pi)}]-W[\mathcal{A}^{g(0)}]=-2\pi\mathrm{i}${NN}.`}</Eq>
      <Exercise n="13.2" title="有效作用量的 Berry 相位" level="★"
        hint={R`取 \eqref{13.88} 的对数：$W=-\frac12\ln\det\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}(\mathcal{A})-\mathrm{i}w(\mathcal{A},\theta)$。$\det\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}(\mathcal{A})$ 不依赖于 $\theta$；沿 $\theta$ 连续地选取 $w$ 的分支。`}
        solution={R`由 \eqref{13.88}，$\mathrm{e}^{-W[\mathcal{A}^{g(\theta)}]}=[\det\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}(\mathcal{A})]^{1/2}\mathrm{e}^{\mathrm{i}w(\mathcal{A},\theta)}$。由于 $\det\mathrm{i}\hat D(\mathcal{A}^{g(\theta)})$ 对所有 $\theta$ 都不为零，可以沿 $\theta\in[0,2\pi]$ 连续地取对数：

$$W[\mathcal{A}^{g(\theta)}]=-\tfrac12\ln\det\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}(\mathcal{A})-\mathrm{i}w(\mathcal{A},\theta),$$

其中 $w(\mathcal{A},\theta)$ 是 $\theta$ 的连续实函数（不取模 $2\pi$）。第一项与 $\theta$ 无关（$\mathcal{A}$ 是固定的参考场）。于是

$$W[\mathcal{A}^{g(2\pi)}]-W[\mathcal{A}^{g(0)}]=-\mathrm{i}[w(\mathcal{A},2\pi)-w(\mathcal{A},0)]=-\mathrm{i}\int_0^{2\pi}\frac{\partial w}{\partial\theta}\dd\theta=-2\pi\mathrm{i}\mathcal{N},$$

最后一步用了 \eqref{13.90}。

**为什么是 Berry 相位。**$g(2\pi)=g(0)=e$，所以 $\mathcal{A}^{g(2\pi)}=\mathcal{A}^{g(0)}=\mathcal{A}$——参数回到原处，但"波函数" $\mathrm{e}^{-W}$ 的相位 $w$ 增加了 $2\pi\mathcal{N}$。这与 §10.6 的 Berry 相位完全类似：参数空间是规范轨道 $\mathfrak{G}$，绝热演化一圈后获得的相位由一个联络（这里是 $\partial_\theta w$）沿闭路的积分给出；它不为零（模 $2\pi$ 意义下为零，但作为连续函数的增量为 $2\pi\mathcal{N}$）反映了行列式线丛在 $\mathfrak{A}/\mathfrak{G}$ 上的扭曲。$\mathcal{N}\neq0$ 时 $W$ 不可能是规范不变的局部泛函。`}>
        {R`证明 \eqref{13.91}。由于 $g(2\pi)=g(0)$，\eqref{13.91} 可以看作一个 Berry 相位。`}
      </Exercise>

      <Sub n="13.5.1" title="m dimensions versus m + 2 dimensions" zh="m 维与 m+2 维">
        <Tx>{R`回忆：参考规范场 $\mathcal{A}$ 不支持算子 $\mathrm{i}\hat D(\mathcal{A})$ 的零模。由于 $|\det\mathrm{i}\hat D(\mathcal{A}^{g(\theta)})|=|\det\mathrm{i}\hat D(\mathcal{A})|\neq0$，算子 $\mathrm{i}\hat D(\mathcal{A}^{g(\theta)})$ 也没有零模。当然，$\mathrm{i}\hat D(\mathcal{A}^{t,\theta})$ 可能有零模，因为 $\mathcal{A}^{t,\theta}$ 一般**不能**由 $\mathcal{A}$ 经规范变换得到。设它在 $p_i=(t_i,\theta_i)$ 处有零模，并假定这些是孤立点。由于 $\det\mathrm{i}\hat D(\mathcal{A}^{t,\theta})$ 是本征值的正规化乘积，它在 $p_i$ 处为零。$\det\mathrm{i}\hat D(\mathcal{A}^{t,\theta})$ 的相位只可能在这些点附近同伦非平凡（在不含零点的区域里相位是连续函数，任何闭回路都可以收缩）。此外，$p_i$ 处的卷绕数由在 $p_i$ 处为零的那个本征值决定。例如，若 $\lambda_n(t,\theta)$ 在 $p_i$ 处为零，它应有形式`}</Tx>
      <Eq n="13.92" say={R`在零点 $p_i$ 附近，消失的本征值写成模乘以相位；整个行列式的相位卷绕全来自这一个本征值。`}>{R`\lambda_n(t,\theta)=f(t,\theta)\mathrm{e}^{\mathrm{i}w_i(t,\theta)}`}</Eq>
      <Figure n="13.4" caption={R`把圆盘 $D^2\times S^m$（坐标 $(t,\theta,x)$，北半球 $U_{\rm N}$）与另一块 $D^2\times S^m$（坐标 $(s,\theta,x)$，南半球 $U_{\rm S}$）沿 $t=s=1$ 粘合，得到无边界的 $S^2\times S^m$。`} width="40%" />
      <Tx>{R`其中 $f(t_i,\theta_i)=0$。$p_i$ 处的卷绕数为`}</Tx>
      <Eq n="13.93" say={R`零点 $p_i$ 的局部卷绕数：消失的本征值沿小回路 $C_i$ 绕原点的圈数。`}>{R`m_i=\frac1{2\pi}\int_{C_i}\frac{\dd}{\dd s}w_i(t,\theta)\,\dd s`}</Eq>
      <Tx>{R`其中 $C_i$ 是包围 $p_i$ 的小回路，见图 13.3。把回路 $S^1=\partial D^2$ 连续形变成包围各 $p_i$ 的小圆 $C_i$ 之和（就像复分析中的辐角原理），得到总卷绕数`}</Tx>
      <Eq n="13.94" title="总卷绕数 = 局部卷绕数之和" say={R`边界上的卷绕数等于圆盘内各零点局部卷绕数之和——二维的辐角原理。`}>{R`${NN}=\frac1{2\pi}\int_{S^1}\dd\theta\frac{\partial}{\partial\theta}w(\mathcal{A},\theta)=\sum m_i.`}</Eq>
      <Tx>{R`**粘成 $S^2\times S^m$。**下面证明卷绕数 $\mathcal{N}$ 与 $(m+2)$ 维空间（$m=2l$）中的指标定理相关：$\mathcal{N}=\ind\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_{m+2}$，$\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_{m+2}$ 是下面定义的 $S^2\times S^m$ 上的 Dirac 算子。考虑定义在坐标为 $(t,\theta,x)$ 的 $D^2\times S^m$ 上的规范理论。为避免边界项，再加上另一块坐标为 $(s,\theta,x)$ 的 $D^2\times S^m$，组成无边界的流形 $S^2\times S^m$；见图 13.4。称 $(t,\theta)$ 片为北半球 $U_{\rm N}$，$(s,\theta)$ 片为南半球 $U_{\rm S}$。在 $S^2$ 的赤道 $S^1$ 上 $t=s=1$。选取如下局部规范势：`}</Tx>
      <Eq n="13.95a" say={R`北半球上的规范势：圆盘族 $\mathcal{A}^{t,\theta}$ 加上沿 $\theta$ 方向的纯规范项 $g^{-1}\dd_\theta g$。`}>{R`\mathcal{A}_{\rm N}(t,\theta,x)=\mathcal{A}^{t,\theta}+g^{-1}\dd_\theta g\qquad(t,\theta)\in U_{\rm N}`}</Eq>
      <Eq n="13.95b" say={R`南半球上的规范势就是参考场本身，与 $(s,\theta)$ 无关。`}>{R`\mathcal{A}_{\rm S}(s,\theta,x)=\mathcal{A}\qquad(s,\theta)\in U_{\rm S}`}</Eq>
      <Tx>{R`其中 $\mathcal{A}$ 是前面引入的参考规范场。为把 $\mathcal{A}_{\rm N}=\mathcal{A}_{{\rm N}\mu}\dd x^\mu$ 与 $\mathcal{A}_{\rm S}=\mathcal{A}_{{\rm S}\mu}\dd x^\mu$ 提升为 $S^2\times S^m$ 上 $G$ 丛的整体联络，定义 $(m+2)$ 维规范势`}</Tx>
      <Eq n="13.96a" say={R`北半球上的 $(m+2)$ 维规范势：$t$ 分量为零，其余分量取自 \eqref{13.95a}。`}>{R`\mathbb{A}_{\rm N}(t,\theta,x)=(\mathcal{A}_t,\mathcal{A}_\theta,\mathcal{A}_\mu)=(0,0,\mathcal{A}_{{\rm N}\mu})`}</Eq>
      <Eq n="13.96b" say={R`南半球上的 $(m+2)$ 维规范势：只有 $S^m$ 方向的分量。`}>{R`\mathbb{A}_{\rm S}(s,\theta,x)=(\mathcal{A}_s,\mathcal{A}_\theta,\mathcal{A}_\mu)=(0,0,\mathcal{A}_{{\rm S}\mu}).`}</Eq>
      <Tx>{R`在赤道上（$t=s=1$），$\mathbb{A}_{\rm N}=g^{-1}(\mathbb{A}_{\rm S}+\Delta)g$，其中 $\Delta=\dd+\dd_\theta+\dd_t$（注意 $\dd_tg=0$）。因此 $\mathbb{A}=\{\mathbb{A}_{\rm N},\mathbb{A}_{\rm S}\}$ 定义了 $S^2\times S^m$ 上的整体联络，**$g$ 是赤道上的转移函数**。`}</Tx>
      <Box kind="warning" title={R`存疑：\eqref{13.95a} 与 \eqref{13.96a} 中 $\theta$ 分量的写法（p.541）`}>{R`\eqref{13.95a} 中的 $g^{-1}\dd_\theta g$ 是沿 $\theta$ 方向的一形式，而 \eqref{13.96a} 又把 $\theta$ 分量写成 $0$、只保留 $\mathcal{A}_{{\rm N}\mu}$——两者字面上不一致。赤道上的粘合 $\mathbb{A}_{\rm N}=g^{-1}(\mathbb{A}_{\rm S}+\dd+\dd_\theta)g=\mathcal{A}^{g(\theta)}+g^{-1}\dd_\theta g$ 要求 $\mathbb{A}_{\rm N}$ 在 $t=1$ 处的 $\theta$ 分量**等于** $g^{-1}\partial_\theta g$；合理的读法是 \eqref{13.95a}（含 $\theta$ 分量）为准，并在 $t\to0$ 处用一个截断函数把 $\theta$ 分量光滑地关掉（圆盘中心 $\theta$ 无定义）。之后的论证（\eqref{13.99}–\eqref{13.101}）只用到赤道上的粘合关系与"$\mathbb{A}$ 是某个 $G$ 丛上的联络"，因此结论不受影响。本站保留原式并作此说明。`}</Box>
      <Tx>{R`考虑与 $\mathbb{A}$ 耦合的 **Dirac** 算子 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_{m+2}$。它的指标定理（\sref{F:spinAS12}）为`}</Tx>
      <Eq n="13.97" say={R`$S^2\times S^m$ 上的指标定理：$(m+2)$ 维手征零模数之差 = 第 $l+1$ 个陈特征的积分（$\hat A=1$）。`}>{R`${IND}\,\mathrm{i}${DN}_{m+2}=${NN}_+-${NN}_-=\int_{S^2\times S^m}${CH}_{l+1}(\mathbb{F})`}</Eq>
      <Tx>{R`其中 $\mathbb{F}=\Delta\mathbb{A}+\mathbb{A}^2$，$\mathcal{N}_+$（$\mathcal{N}_-$）是 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_{m+2}$ 的手征 $+$（$-$）零模个数（手征在 $(m+2)$ 维空间中定义）。

Alvarez-Gaumé 与 Ginsparg (1984) 用绝热微扰计算证明：每个卷绕数 $m_i$ 必为 $\pm1$；而且 Dirac 算子 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_{m+2}$ 在 $p_i=(t_i,\theta_i)$ 处有一个零模，其 $(m+2)$ 维手征 $${CHI}=m_i=\pm1$。于是总卷绕数 $\mathcal{N}=\sum m_i$ 由指标 $\mathcal{N}_+-\mathcal{N}_-$ 给出。（直观图像：在 $p_i$ 附近，$\mathrm{i}\hat D(\mathcal{A}^{t,\theta})$ 的一个本征值 $\lambda_n(t,\theta)\approx c\,(\delta t+\mathrm{i}\,\delta\theta)$ 或其共轭在复平面上穿过原点；把 $(t,\theta)$ 当作两个额外的坐标，$\partial_t\pm\mathrm{i}\partial_\theta$ 正是 $(m+2)$ 维 Dirac 算子在这两个方向上的部分，于是 $m$ 维的"零点"变成 $(m+2)$ 维的一个零模，转向决定手征。）现在有`}</Tx>
      <Stmt id="X:AG1984" />
      <Eq n="13.98" keyEq title="m 维相位卷绕 = (m+2) 维指标" say={R`本节的中心公式：$m$ 维手征行列式相位的卷绕数，等于 $(m+2)$ 维 Dirac 算子的指标，即高两维的阿贝尔反常积分。`}>{R`${IND}\,\mathrm{i}${DN}_{m+2}=\int_{S^2\times S^m}${CH}_{l+1}(\mathbb{F})=\frac1{2\pi}\int_0^{2\pi}\dd\theta\frac{\partial w(\mathcal{A},\theta)}{\partial\theta}.`}</Eq>
      <Tx>{R`**用陈–Simons 形式计算指标。**由 \eqref{13.98} 可以容易地求出带归一化的非阿贝尔反常。由于 $\mathrm{ch}_{l+1}(\mathbb{F})=\dd Q_{m+1}(\mathbb{A},\mathbb{F})$（在每个半球上），有`}</Tx>
      <Eq n="13.99" say={R`把指标积分拆到两个半球上，各自用 Stokes 定理化为赤道 $S^1\times S^m$ 上两个陈–Simons 形式之差。`}>{R`\begin{aligned}\int_{S^2\times S^m}${CH}_{l+1}(\mathbb{F})&=\int_{D^2\times S^m}${CH}_{l+1}(\mathbb{F}_{\rm N})+\int_{D^2\times S^m}${CH}_{l+1}(\mathbb{F}_{\rm S})\\&=\int_{S^1\times S^m}[Q_{m+1}(\mathbb{A}_{\rm N},\mathbb{F}_{\rm N})|_{t=1}-Q_{m+1}(\mathbb{A}_{\rm S},\mathbb{F}_{\rm S})|_{s=1}].\end{aligned}`}</Eq>
      <Tx>{R`（两个半球的边界都是赤道，但定向相反，所以出现差。）由式 (11.118)（\sref{F:cs-gauge}）得`}</Tx>
      <Eq n="13.100" say={R`两个只差一个规范变换的陈–Simons 形式之差 = 纯规范项 $Q(g^{-1}\Delta g,0)\propto\Tr(g^{-1}\Delta g)^{m+1}$ 加一个恰当形式。`}>{R`\begin{aligned}&Q_{m+1}(\mathbb{A}_{\rm N},\mathbb{F}_{\rm N})|_{t=1}-Q_{m+1}(\mathbb{A}_{\rm S},\mathbb{F}_{\rm S})|_{s=1}\\&\qquad=Q_{m+1}(g^{-1}\Delta g,0)+\Delta\alpha_m\\&\qquad=(-1)^l\Big(\frac{\mathrm{i}}{2\pi}\Big)^{l+1}\frac{l!}{(m+1)!}${TR}(g^{-1}\Delta g)^{m+1}+\Delta\alpha_m.\end{aligned}`}</Eq>
      <Derivation title={R`$Q_{2l+1}(g^{-1}\Delta g,0)$ 的系数`} collapsed steps={[
        { tex: R`Q_{2l+1}(\mathcal{A},\mathcal{F})=\frac1{l!}\Big(\frac{\mathrm{i}}{2\pi}\Big)^{l+1}\int_0^1\dd t\,\mathrm{str}(\mathcal{A},\mathcal{F}_t^{\,l})`, why: R`式 (11.105)，$j=l+1$。` },
        { tex: R`\mathcal{A}=g^{-1}\dd g,\ \mathcal{F}=0:\quad\mathcal{F}_t=(t^2-t)\mathcal{A}^2`, why: R`纯规范：$\dd(g^{-1}\dd g)=-(g^{-1}\dd g)^2$。` },
        { tex: R`\int_0^1(t^2-t)^l\dd t=(-1)^l\frac{(l!)^2}{(2l+1)!}`, why: R`Beta 函数 $B(l+1,l+1)$。` },
        { tex: R`Q_{2l+1}(g^{-1}\dd g,0)=(-1)^l\Big(\frac{\mathrm{i}}{2\pi}\Big)^{l+1}\frac{l!}{(2l+1)!}\Tr(g^{-1}\dd g)^{2l+1}`, why: R`$m+1=2l+1$，即 \eqref{13.100}。$l=1$：$-(\frac{\mathrm{i}}{2\pi})^2\frac16=\frac1{24\pi^2}$，与 \sref{T10.7} 的瞬子数公式一致。` },
      ]} />
      <Tx>{R`于是指标定理成为（$\Delta\alpha_m$ 在闭流形 $S^1\times S^m$ 上积分为零）`}</Tx>
      <Eq n="13.101" keyEq title="指标 = 规范变换圈的卷绕数" say={R`$(m+2)$ 维指标 = 映射 $g:S^1\times S^m\simeq S^{m+1}\to G$ 的卷绕数（$\pi_{m+1}(G)$ 中的整数）。`}>{R`${IND}\,\mathrm{i}${DN}_{m+2}=(-1)^l\Big(\frac{\mathrm{i}}{2\pi}\Big)^{l+1}\frac{l!}{(m+1)!}\int_{S^1\times S^m}${TR}(g^{-1}\Delta g)^{m+1}.`}</Eq>
      <Tx>{R`\sref{T10.7} 说 $\int_{S^3}\Tr(g^{-1}\dd g)^3$ 给出映射 $g:S^3\to\mathrm{SU}(2)$ 的卷绕数。同样，\eqref{13.101} 表示映射 $g:S^{m+1}\to G$ 的卷绕数，按 $\pi_{m+1}(G)$ 分类（注意 $S^1\wedge S^m=S^{m+1}$）。

**识别非阿贝尔反常。**最后证明非阿贝尔反常应当等同于 $Q^1_m$。首先注意

$$\int_{S^1\times S^m}Q_{m+1}(\mathbb{A}_{\rm S},\mathbb{F}_{\rm S})=0$$

因为被积式与 $\dd\theta$ 无关（$\mathbb{A}_{\rm S}=\mathcal{A}$ 只有 $S^m$ 方向的分量），因而不可能是 $S^1\times S^m$ 的体积元。于是`}</Tx>
      <Eq n="13.102" say={R`指标只由北半球边界上的陈–Simons 形式给出，其中联络被鬼场 $\omega=g^{-1}\dd_\theta g$ 扩展。`}>{R`${IND}\,\mathrm{i}${DN}_{m+2}=\int_{S^1\times S^m}Q_{m+1}(${Ag}+\omega,${Fg})`}</Eq>
      <Tx>{R`其中 $\omega=g^{-1}\dd_\theta g$，$\mathcal{F}^{g(\theta)}=\dd\mathcal{A}^{g(\theta)}+(\mathcal{A}^{g(\theta)})^2=g(\theta)^{-1}\mathcal{F}g(\theta)$。这正是 §13.4 的结构：$\dd_\theta$ 扮演 $\mathcal{S}$ 的角色，$\omega$ 就是鬼场，$\mathbb{F}=\mathcal{F}^{g(\theta)}$ 不含 $\dd\theta$。若把 \eqref{13.102} 的被积式按 $\omega$ 展开，只有**关于 $\dd\theta$ 线性**的项对积分有贡献。这一项 $Q^1_m(\omega,\mathcal{A}^{g(\theta)},\mathcal{F}^{g(\theta)})$ 正比于 $\dd\theta\wedge$（$S^m$ 中的体积元），因而是 $S^1\times S^m$ 的体积元。现在有`}</Tx>
      <Eq n="13.103" keyEq title="带归一化的非阿贝尔反常" say={R`沿规范轨道一步的有效作用量变化 $=2\pi\mathrm{i}\int Q^1_m$：下降方程的解 $Q^1_m$ 不但满足 WZ 条件，而且其归一化由整数指标唯一定出。`}>{R`\begin{aligned}\delta_\omega W[\mathcal{A}]&=\int_{S^m}${TR}\,\omega\mathcal{D}_\mu\frac{\delta W[\mathcal{A}]}{\delta\mathcal{A}_\mu}\\&=\mathrm{i}\,\dd_\theta w(\theta,\mathcal{A})=2\pi\mathrm{i}\int_{S^m}Q^1_m(\omega,${Ag},${Fg}).\end{aligned}`}</Eq>
      <Derivation title={R`\eqref{13.103} 中的符号与因子`} collapsed steps={[
        { tex: R`\partial_\theta\mathcal{A}^{g(\theta)}=\mathcal{D}_{\mathcal{A}^g}(g^{-1}\partial_\theta g)`, why: R`对 \eqref{13.87} 求导。所以沿 $\theta$ 前进 $\dd\theta$ 相当于规范变换 $\mathcal{A}\to\mathcal{A}-\mathcal{D}v$，$v=-\omega$。` },
        { tex: R`\delta_\omega W=W[\mathcal{A}-\mathcal{D}\omega]-W[\mathcal{A}]=-\dd_\theta W=\mathrm{i}\,\dd_\theta w`, why: R`由 \eqref{13.88}，$W=-\frac12\ln\det\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}-\mathrm{i}w$，第一项与 $\theta$ 无关。` },
        { tex: R`\dd_\theta w=2\pi\int_{S^m}Q^1_m`, why: R`\eqref{13.98}、\eqref{13.102}：$\frac1{2\pi}\int\dd\theta\,\partial_\theta w=\int_{S^1}\int_{S^m}Q^1_m$ 对任意的圈 $g$ 都成立，被积式逐点相等（差恰当项）。` },
      ]} />
      <Stmt id="F:ag13" />
      <Tx>{R`$Q^1_m$ 的显式形式由 \eqref{13.82} 给出。对 $m=4$，求得`}</Tx>
      <Eq n="13.104" say={R`四维：$2\pi\mathrm{i}\cdot\frac16(\frac{\mathrm{i}}{2\pi})^3=\frac1{24\pi^2}$，正是 Bardeen 反常的系数。`}>{R`\begin{aligned}\int${TR}\,\omega\mathcal{D}_\mu\frac{\delta W[\mathcal{A}]}{\delta\mathcal{A}_\mu}&=2\pi\mathrm{i}\int_{S^4}Q^1_4(\omega,${Ag},${Fg})\\&=\frac1{24\pi^2}\int_{S^4}${TR}\,\omega\,\dd\Big[${Ag}\dd${Ag}+\frac12(${Ag})^3\Big].\end{aligned}`}</Eq>
      <Tx>{R`（系数：$2\pi\mathrm{i}\cdot\frac16\cdot\frac{\mathrm{i}^3}{(2\pi)^3}=\frac{2\pi}{6\cdot8\pi^3}=\frac1{24\pi^2}$。）令 $\theta=0$（$g=e$），我们重现了反常散度`}</Tx>
      <Eq n="13.105" keyEq title="带归一化重现 Bardeen 反常" say={R`拓扑方法的终点：不做任何 Feynman 图，就得到了包括系数 $\frac1{24\pi^2}$ 在内的四维非阿贝尔反常，与 \eqref{13.57} 完全一致。`}>{R`\mathcal{D}_\mu\langle j^\mu\rangle_\alpha=\frac1{24\pi^2}${TR}\,T_\alpha\epsilon^{\kappa\lambda\mu\nu}\partial_\kappa\Big[\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu+\frac12\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu\Big]`}</Eq>
      <Tx>{R`它与 \eqref{13.56} 一致。这里的方法保证了 WZ 条件给出正确的结果；而且它重现了包括归一化在内的反常散度，而归一化单靠 WZ 条件是无法定出的。`}</Tx>
      <Stmt id="F:nonab13" />
      <Box kind="physics" title="小结：两个反常，一个陈特征">{R`同一个 $\mathrm{ch}_{l+1}$ 扮演两个角色：在 $2l+2$ 维中，它的积分是阿贝尔反常（手征零模数之差）；在 $2l$ 维中，它的陈–Simons 形式沿规范轨道的"一阶下降" $Q^1_{2l}$ 是非阿贝尔反常。系数的差别全部来自这一下降：$\frac1{(l+1)!}$ 与 $2\pi\mathrm{i}$、$\int(1-t)t^k\dd t$ 的组合。四维的 $\frac1{24\pi^2}$ 来自六维的 $\mathrm{ch}_3=\frac1{3!}\Tr(\frac{\mathrm{i}\mathcal{F}}{2\pi})^3$；四维的 $\frac1{4\pi^2}$（阿贝尔）则来自四维自己的 $\mathrm{ch}_2$。`}</Box>
    </Sub>
    </Sec>);
}
