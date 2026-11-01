import { ConeSingularityRedraw, OrbifoldSectorRedraw, OrbifoldTorusRedraw } from "./_redraw_ch06_08.jsx";
// §8.7 殆复流形 + §8.8 轨形 —— 式 (8.121)–(8.126)，定义 8.5–8.6，定理 8.12–8.13，图 8.6–8.8
import { Sec, Sub, Tx, Eq, Box, Figure, Stmt, Proof, Derivation, C } from "@kit";

const R = String.raw;

export function Sec87() {
  return (
    <Sec n="8.7" title="Almost complex manifolds" zh="殆复流形"
      gist={R`放宽条件：只要求整体的 $(1,1)$ 张量场 $J$ 满足 $J^2=-1$（\sref{D8.5}）→ 仍可分出 $T_pM^\pm$、$\mathcal{X}(M)^\pm$，但不一定有全纯坐标 → 可积性：全纯向量场的括号仍全纯（\sref{D8.6}）$\iff$ Nijenhuis 张量 $N=0$（\sref{T8.12}）$\iff$ 复流形（Newlander–Nirenberg，\sref{T8.13}）。`}
      why={R`给出复结构的一个纯张量刻画：不需要先找全纯坐标，只要检查一个张量是否为零。这在构造新的复流形（例如 Calabi–Eckmann 的 $S^3\times S^3$）与判断"某个 $J$ 是否来自复结构"（如 $S^6$）时是基本工具。`}
      gives={["8.121", "8.122", "8.124", "8.125", "8.126"]}>
      <p className="muted">本节概念：<C id="almost_complex" /></p>
      <Tx>{R`本节与下一节讨论与复流形密切相关的空间。这些是比较专门的题目，初读时可以略过。`}</Tx>

      <Sub n="8.7.1" title="Definitions" zh="定义">
        <Tx>{R`有些微分流形带有类似于复流形的结构。为研究这类流形，我们放宽条件 \eqref{8.16}，在这里只要求一个较弱的条件。`}</Tx>
        <Stmt id="D8.5" />
        <Tx>{R`由于 $J_p^2=-\mathrm{id}_{T_pM}$，$J_p$ 的本征值为 $\pm\mathrm{i}$。若有 $m$ 个 $+\mathrm{i}$，则必有同样多个 $-\mathrm{i}$（$J_p$ 是实矩阵，本征值成共轭对出现），所以 $J_p$ 是 $2m\times2m$ 矩阵，$J_p^2=-I_{2m}$。因此 $M$ 是偶数维流形。（另一个看法：$\det(J_p)^2=\det(-I)=(-1)^{\dim M}$，左边为正，所以 $\dim M$ 为偶数。）注意并非所有偶数维流形都是殆复流形。例如 $S^4$ 不是殆复流形（Steenrod 1951）。还要注意我们现在只要求较弱的条件 $J_p^2=-I_{2m}$。当然，由 \eqref{8.16} 定义的 $J_p$ 满足 $J_p^2=-I_{2m}$，所以复流形是殆复流形。存在不是复流形的殆复流形。例如已知 $S^6$ 带有殆复结构（八元数的虚部的叉积给出），但这个标准殆复结构不可积（Frölicher 1955）。［关于 $S^6$ 是否带有*某个*复结构，见 §8.5 的存疑框。］

把殆复流形 $(M,J)$ 的切空间复化。给定 $T_pM$ 上满足 $J_p^2=-I_{2m}$ 的线性变换 $J_p$，把 $J_p$ 延拓为 $T_pM^\C$ 上的 $\C$ 线性映射。定义在 $T_pM^\C$ 上的 $J_p$ 也满足 $J_p^2=-I_{2m}$：

$$J_p^2(X+\mathrm{i}Y)=J_p^2X+\mathrm{i}J_p^2Y=-X+\mathrm{i}(-Y)=-(X+\mathrm{i}Y),$$

其中 $X,Y\in T_pM$。按 $J_p$ 的本征值把 $T_pM^\C$ 分成两个不相交的子空间，`}</Tx>
        <Eq n="8.121" say={R`即使没有全纯坐标，$J$ 的两个本征空间仍然把复化切空间一分为二。`}>{R`T_pM^\C=T_pM^+\oplus T_pM^-`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="8.122" say={R`全纯 / 反全纯向量的定义只用到 $J$ 的本征值。`}>{R`T_pM^\pm=\{Z\in T_pM^\C\mid J_pZ=\pm\mathrm{i}Z\}.`}</Eq>
        <Tx>{R`任何向量 $V\in T_pM^\C$ 可写成 $V=W_1+\overline{W}_2$，$W_1,W_2\in T_pM^+$。注意 $J_pV=\mathrm{i}W_1-\mathrm{i}\overline{W}_2$。读者此时可能已注意到，可以沿用 §8.2 为复流形建立的向量与向量场的分类方案。事实上，唯一的区别是：复流形上的殆复结构明确地由 \eqref{8.18} 给出，而殆复流形上只要求它满足较弱的条件 $J_p^2=-I_{2m}$。要对复化切空间与复化向量场分类，只需要后一条件。于是把 $T_pM^\C$ 分为 $T_pM^\pm$、把 $\mathcal{X}(M)^\C$ 分为 $\mathcal{X}(M)^\pm$，尽管 $T_pM^+$ 不一定有 $\{\partial/\partial z^\mu\}$ 形式的基（即由坐标给出的基）。例如仍可定义投影算子`}</Tx>
        <Eq n="8.123" say={R`投影算子的定义与 \eqref{8.25} 相同，只用到 $J^2=-1$。`}>{R`\mathcal{P}^\pm\equiv\tfrac12(\mathrm{id}_{T_pM}\mp\mathrm{i}J_p):T_pM^\C\to T_pM^\pm.`}</Eq>
        <Tx>{R`$T_pM^+$（$T_pM^-$）中的向量称为全纯（反全纯）向量，$\mathcal{X}(M)^+$（$\mathcal{X}(M)^-$）中的向量场称为全纯（反全纯）向量场。`}</Tx>
        <Stmt id="D8.6" />
        <Tx>{R`设 $(M,J)$ 是殆复流形。定义 **Nijenhuis 张量场** $N:\mathcal{X}(M)\times\mathcal{X}(M)\to\mathcal{X}(M)$：`}</Tx>
        <Eq n="8.124" keyEq title="Nijenhuis 张量" say={R`四个括号的组合：如果 $J$ 来自全纯坐标，括号与 $J$ "可交换"，四项恰好相消；不相消的部分度量 $J$ 离可积有多远。`}>{R`N(X,Y)\equiv[X,Y]+J[JX,Y]+J[X,JY]-[JX,JY].`}</Eq>
        <Tx>{R`取基 $\{e_\mu=\partial/\partial x^\mu\}$ 与对偶基 $\{\dd x^\mu\}$，殆复结构表示为 $J=J_\mu{}^\nu\dd x^\mu\otimes\partial/\partial x^\nu$。$N$ 的分量表达式为`}</Tx>
        <Eq n="8.125" title="Nijenhuis 张量的分量" say={R`展开后所有含 $X$、$Y$ 导数的项都因 $J^2=-1$ 相消，只剩 $J$ 的一阶导数——所以 $N$ 是张量，而复结构的 $J$ 分量为常数，$N$ 自然为零。`}>{R`\begin{aligned}N(X,Y)=&\ (X^\nu\partial_\nu Y^\mu-Y^\nu\partial_\nu X^\mu)e_\mu\\&+J_\lambda{}^\mu\{J_\kappa{}^\nu X^\kappa\partial_\nu Y^\lambda-Y^\nu\partial_\nu(J_\kappa{}^\lambda X^\kappa)\}e_\mu\\&+J_\lambda{}^\mu\{X^\nu\partial_\nu(J_\kappa{}^\lambda Y^\kappa)-J_\kappa{}^\nu Y^\kappa\partial_\nu X^\lambda\}e_\mu\\&-\{J_\kappa{}^\nu X^\kappa\partial_\nu(J_\lambda{}^\mu Y^\lambda)-J_\kappa{}^\nu Y^\kappa\partial_\nu(J_\lambda{}^\mu X^\lambda)\}e_\mu\\=&\ X^\kappa Y^\nu[-J_\lambda{}^\mu(\partial_\nu J_\kappa{}^\lambda)+J_\lambda{}^\mu(\partial_\kappa J_\nu{}^\lambda)\\&-J_\kappa{}^\lambda(\partial_\lambda J_\nu{}^\mu)+J_\nu{}^\lambda(\partial_\lambda J_\kappa{}^\mu)]e_\mu.\end{aligned}`}</Eq>
        <Derivation title={R`验证 \eqref{8.125} 中导数项的相消（原书一笔带过）`} collapsed steps={[
          { tex: R`(1)\ X^\nu\partial_\nu Y^\mu,\quad(2)\ J_\lambda{}^\mu J_\kappa{}^\nu X^\kappa\partial_\nu Y^\lambda,\quad(3)\ J_\lambda{}^\mu J_\kappa{}^\lambda X^\nu\partial_\nu Y^\kappa,\quad(4)\ -J_\kappa{}^\nu X^\kappa J_\lambda{}^\mu\partial_\nu Y^\lambda`, why: R`含 $\partial Y$ 的四项：来自第一行、第二行第一项、第三行第一项（乘积法则中导数落在 $Y$ 上的部分）、第四行第一项。` },
          { tex: R`(3)=(J^2)_\kappa{}^\mu X^\nu\partial_\nu Y^\kappa=-X^\nu\partial_\nu Y^\mu=-(1),\qquad(4)=-(2)`, why: R`$J_\kappa{}^\lambda J_\lambda{}^\mu=(J^2)_\kappa{}^\mu=-\delta_\kappa{}^\mu$；(4) 与 (2) 只是哑指标顺序不同。` },
          { tex: R`\text{含 }\partial X\text{ 的四项同理相消（交换 }X\leftrightarrow Y\text{）}`, why: R`$N(X,Y)=-N(Y,X)$。` },
          { tex: R`\text{剩余：}-J_\lambda{}^\mu Y^\nu X^\kappa\partial_\nu J_\kappa{}^\lambda+J_\lambda{}^\mu X^\nu Y^\kappa\partial_\nu J_\kappa{}^\lambda-J_\kappa{}^\nu X^\kappa Y^\lambda\partial_\nu J_\lambda{}^\mu+J_\kappa{}^\nu Y^\kappa X^\lambda\partial_\nu J_\lambda{}^\mu`, why: R`导数落在 $J$ 上的项。重新命名哑指标使 $X$ 带 $\kappa$、$Y$ 带 $\nu$，即得 \eqref{8.125} 最后两行的四项。` },
        ]} result={R`$N$ 对 $X$、$Y$ 是 $C^\infty(M)$ 线性的（没有 $X,Y$ 的导数），所以是 $(1,2)$ 型张量。`} />
        <Tx>{R`于是 $N$ 确实对 $X$ 与 $Y$ 是（函数）线性的，因而是张量。若 $J$ 是复结构，$J$ 由 \eqref{8.18} 给出（分量为常数），Nijenhuis 张量场平凡地为零。（原书此处把基写作 $\{e^\mu=\partial/\partial x^\mu\}$，下标应在下方：$e_\mu$。）`}</Tx>
        <Stmt id="T8.12">
          <Proof steps={[
            { claim: R`设 $Z=X+\mathrm{i}Y$，$W=U+\mathrm{i}V\in\mathcal{X}(M)^\C$。把 Nijenhuis 张量场 $\C$ 双线性地延拓到 $\mathcal{X}(M)^\C$ 上：`, tex: R`\begin{aligned}N(Z,W)&=[Z,W]+J[JZ,W]+J[Z,JW]-[JZ,JW]\\&=\{N(X,U)-N(Y,V)\}+\mathrm{i}\{N(X,V)+N(Y,U)\}\end{aligned}`, uses: ["8.126", "8.10"] },
            { claim: R`**"⇐"。**设对任意 $A,B\in\mathcal{X}(M)$ 有 $N(A,B)=0$。由 \eqref{8.126}，对 $Z,W\in\mathcal{X}(M)^\C$ 也有 $N(Z,W)=0$。取 $Z,W\in\mathcal{X}^+(M)\subset\mathcal{X}(M)^\C$。由于 $JZ=\mathrm{i}Z$、$JW=\mathrm{i}W$，`, tex: R`N(Z,W)=[Z,W]+\mathrm{i}J[Z,W]+\mathrm{i}J[Z,W]-\mathrm{i}^2[Z,W]=2\{[Z,W]+\mathrm{i}J[Z,W]\}`, fill: true },
            { claim: R`由假设 $N(Z,W)=0$，得 $[Z,W]=-\mathrm{i}J[Z,W]$，即 $J[Z,W]=\mathrm{i}[Z,W]$（两边乘 $\mathrm{i}J$ 并用 $J^2=-1$），也就是 $[Z,W]\in\mathcal{X}^+(M)$。所以殆复结构是可积的。` },
            { claim: R`**"⇒"。**设 $J$ 可积。由于 $\mathcal{X}^\C(M)$ 是 $\mathcal{X}^+(M)$ 与 $\mathcal{X}^-(M)$ 的直和，把 $Z,W\in\mathcal{X}^\C(M)$ 分解为 $Z=Z^++Z^-$、$W=W^++W^-$，则`, tex: R`N(Z,W)=N(Z^+,W^+)+N(Z^+,W^-)+N(Z^-,W^+)+N(Z^-,W^-)` },
            { claim: R`由于 $JZ^\pm=\pm\mathrm{i}Z^\pm$、$JW^\pm=\pm\mathrm{i}W^\pm$，容易看出 $N(Z^+,W^-)=N(Z^-,W^+)=0$：`, tex: R`N(Z^+,W^-)=[Z^+,W^-]+\mathrm{i}J[Z^+,W^-]-\mathrm{i}J[Z^+,W^-]-(\mathrm{i})(-\mathrm{i})[Z^+,W^-]=0`, fill: true },
            { claim: R`又有`, tex: R`\begin{aligned}N(Z^+,W^+)&=[Z^+,W^+]+J[\mathrm{i}Z^+,W^+]+J[Z^+,\mathrm{i}W^+]-[\mathrm{i}Z^+,\mathrm{i}W^+]\\&=2[Z^+,W^+]-2[Z^+,W^+]=0\end{aligned}`, why: R`因为 $J[Z^+,W^+]=\mathrm{i}[Z^+,W^+]$（可积性）：中间两项给 $2\mathrm{i}\cdot\mathrm{i}[Z^+,W^+]=-2[Z^+,W^+]$，首末两项给 $2[Z^+,W^+]$。` },
            { claim: R`同理 $N(Z^-,W^-)=0$（取复共轭）。于是对任意 $Z,W\in\mathcal{X}^\C(M)$ 有 $N(Z,W)=0$，特别地对 $Z,W\in\mathcal{X}(M)$ 也为零。` },
          ]} />
        </Stmt>
        <Eq n="8.126" say={R`Nijenhuis 张量复双线性地延拓到复向量场上：按实部虚部展开。`}>{R`\begin{aligned}N(Z,W)&=[Z,W]+J[JZ,W]+J[Z,JW]-[JZ,JW]\\&=\{N(X,U)-N(Y,V)\}+\mathrm{i}\{N(X,V)+N(Y,U)\}.\end{aligned}`}</Eq>
        <Tx>{R`若 $M$ 是复流形，复结构 $J$ 是常张量场（在全纯坐标中），Nijenhuis 张量场为零。反过来呢？下面陈述一个重要（且难以证明）的定理。`}</Tx>
        <Stmt id="T8.13" />
        <Tx>{R`总结起来：

$$\text{可积的殆复结构}\ =\ \text{Nijenhuis 张量场为零}\ =\ \text{复流形}.$$`}</Tx>
        <Box kind="example" title="一个不可积的殆复结构（本站补充）">{R`在 $\R^4$（坐标 $x^1,\ldots,x^4$，$\partial_i=\partial/\partial x^i$）上定义

$$J\partial_1=\partial_2-x^3\partial_4,\qquad J\partial_2=-\partial_1-x^3\partial_3,\qquad J\partial_3=\partial_4,\qquad J\partial_4=-\partial_3.$$

逐个检验 $J^2=-1$：例如 $J^2\partial_1=J\partial_2-x^3J\partial_4=-\partial_1-x^3\partial_3+x^3\partial_3=-\partial_1$。所以 $(\R^4,J)$ 是殆复流形（$x^3=0$ 处它就是标准复结构）。但用 \eqref{8.124} 直接计算：$[\partial_2,\partial_4]=0$，$[J\partial_2,\partial_4]=[\partial_2,J\partial_4]=0$（系数不含 $x^2,x^4$），而

$$[J\partial_2,J\partial_4]=[-\partial_1-x^3\partial_3,\,-\partial_3]=[x^3\partial_3,\partial_3]=-\partial_3,$$

于是 $N(\partial_2,\partial_4)=-[J\partial_2,J\partial_4]=\partial_3\neq0$（处处不为零；用分量公式 \eqref{8.125} 数值计算得到同样结果）。由 \sref{T8.12}，$J$ 不可积：$\R^4$ 上不存在使 $J$ 取 \eqref{8.18} 形式的全纯坐标。这说明 $J^2=-1$ 只是逐点的代数条件，可积性是一阶微分条件。`}</Box>
      </Sub>
    </Sec>);
}

export function Sec88() {
  return (
    <Sec n="8.8" title="Orbifolds" zh="轨形"
      gist={R`流形 $M$ 模去离散群 $G$ 的作用得到轨形 $\Gamma=M/G$；$G$ 的不动点成为奇点（曲率集中于此，绕它一圈的和乐是 $G$ 的元素）→ 一维例子：$\C/\Z_3$（锥面）、$T^2/\Z_3$（三个锥点，拓扑上是 $S^2$）→ 三维例子：$T^6/\Z_3$ 有 $27$ 个锥形奇点，不是流形。`}
      why={R`轨形是"几乎平直"的紧空间：除有限个奇点外都是平直的，因而弦论在上面可以精确求解（Dixon–Harvey–Vafa–Witten），又保留了 Calabi–Yau 紧化的拓扑特征——它们可以看作 Calabi–Yau 流形的退化极限。`}
      gives={[]}>
      <p className="muted">本节概念：<C id="orbifold" /></p>
      <Tx>{R`设 $M$ 是流形，$G$ 是作用在 $M$ 上的*离散*群。商空间 $\Gamma\equiv M/G$ 称为**轨形**（orbifold）。下面将看到 $M$ 中存在在 $G$ 作用下不动的点。这些点是奇点，轨形一般不是流形。因此，即使从一个简单的流形 $M$ 出发，轨形 $M/G$ 也可能有相当复杂的拓扑。`}</Tx>

      <Sub n="8.8.1" title="One-dimensional examples" zh="一维例子">
        <Tx>{R`为了得到具体的概念，考虑一个简单的例子。取 $M=\R^2$，把它等同于复平面 $\C$。取 $G=\Z_3$，把点 $z$、$\mathrm{e}^{2\pi\mathrm{i}/3}z$ 与 $\mathrm{e}^{4\pi\mathrm{i}/3}z$ 等同。轨形 $M/G$ 由复平面的三分之一构成，把边粘合后得到一个锥面，见 \figref{8.6}。`}</Tx>
        <Figure illustration={<OrbifoldSectorRedraw />} n="8.6" caption={R`轨形 $\C/\Z_3$ 是复平面的三分之一，其两条边按图示粘合。$V$ 沿 $C$ 平行移动后成为 $\tilde V$，$V$ 与 $\tilde V$ 之间的夹角为 $2\pi/3$。`} width="100%" />
        <Tx>{R`看看这个轨形的和乐群是有趣的。我们使用 $\C$ 的欧氏度规诱导的平直联络。沿回路 $C$（它确实是回路！两端在粘合后是同一点）平行移动向量 $V$ 后，得到向量 $\tilde V$，粘合后它与 $V$ 不同。可以看出 $V$ 与 $\tilde V$ 之间的夹角是 $2\pi/3$。容易验证和乐群是 $\Z_3$（绕原点 $k$ 圈转 $2\pi k/3$）。由于对不绕原点的回路 $C_0$ 和乐是平凡的，可知曲率在原点处是奇异的（回忆：曲率度量和乐的非平凡性，见 §7.3）——像 $\delta$ 函数一样集中在原点，其"积分"等于亏角 $2\pi-2\pi/3=4\pi/3$。一般地，不动点（这里是原点）是曲率的奇点。不过要注意，$\C/\Z_3$ *是*一个（拓扑）流形，因为它有同胚于 $\R^2$ 的开覆盖（锥面可以压平成平面；奇异的只是度规）。

一个不那么平凡的例子取环面为流形。在复平面中把点 $z$ 与 $z+m+n\mathrm{e}^{\mathrm{i}\pi/3}$（$m,n\in\Z$）等同，见 \figref{8.7}(a)。粘合平行四边形 OPQR 的边，得到环面 $T^2$（这是例 8.2 中 $\tau=\mathrm{e}^{\mathrm{i}\pi/3}$ 的情形——基本区域的一个角点，它具有额外的 $\Z_6$ 对称性）。令 $\Z_3$ 以 $\alpha:z\mapsto\mathrm{e}^{2\pi\mathrm{i}/3}z$ 作用在 $T^2$ 上（因为 $\mathrm{e}^{2\pi\mathrm{i}/3}$ 把格映到自身，这在 $T^2$ 上是良定义的）。可以求出有三个不等价的不动点 $z=(n/\sqrt3)\mathrm{e}^{\pi\mathrm{i}/6}$，$n=0,1,2$。这个轨形 $\Gamma=T^2/\Z_3$ 由两个三角形围成一个空腔构成，见 \figref{8.7}(b)。若用环面平直度规诱导的平直联络定义向量的平行移动，可知绕每个不动点的和乐都是 $\Z_3$。`}</Tx>
        <Derivation title={R`$T^2/\Z_3$ 的不动点`} collapsed steps={[
          { tex: R`\alpha z\equiv z\pmod L\iff(1-\mathrm{e}^{2\pi\mathrm{i}/3})z\in L=\{m+n\mathrm{e}^{\mathrm{i}\pi/3}\}`, why: "不动点的定义：在环面上不动，即在平面上只差一个格向量。" },
          { tex: R`1-\mathrm{e}^{2\pi\mathrm{i}/3}=\tfrac32-\tfrac{\sqrt3}2\mathrm{i}=\sqrt3\,\mathrm{e}^{-\mathrm{i}\pi/6}`, why: R`模长 $\sqrt{9/4+3/4}=\sqrt3$。` },
          { tex: R`z=\frac{\ell}{\sqrt3}\mathrm{e}^{\mathrm{i}\pi/6},\ \ell\in L\quad\Rightarrow\quad z\in\left\{0,\ \tfrac1{\sqrt3}\mathrm{e}^{\mathrm{i}\pi/6},\ \tfrac2{\sqrt3}\mathrm{e}^{\mathrm{i}\pi/6}\right\}\ (\mathrm{mod}\ L)`, why: R`$\frac{1}{\sqrt3}\mathrm{e}^{\mathrm{i}\pi/6}L$ 是包含 $L$ 的指数为 3 的格（行列式 $=1-\mathrm{e}^{2\pi i/3}$ 的模方 $=3$），所以模 $L$ 恰有 $3$ 个代表元；取 $\ell=0,1,2$ 即可，例如 $\ell=1$：$\frac1{\sqrt3}\mathrm{e}^{\mathrm{i}\pi/6}=\frac12+\frac{\mathrm{i}}{2\sqrt3}$，正是正三角形 $0,1,\mathrm{e}^{\mathrm{i}\pi/3}$ 的中心。` },
        ]} result={R`三个不动点 = 格点、两类正三角形的中心。由 Gauss–Bonnet，三个锥点各带曲率 $4\pi/3$，总和 $4\pi=2\pi\chi(S^2)$——与 $T^2/\Z_3$ 同胚于 $S^2$ 一致。`} />
        <Figure illustration={<OrbifoldTorusRedraw />} n="8.7" caption={R`自绘 $T^2/\Z_3$：六角格环面上的三个不动点，以及两张三角形沿边界粘合得到的球面商空间。`} width="100%" />
        <Box kind="warning" title={R`勘误：$\Gamma=T^2/\Z_3$（p.365）`}>{R`原书写"这个轨形 $\Gamma=\C/\Z_3$ 由两个三角形围成一个空腔构成"，应为 $\Gamma=T^2/\Z_3$（图 8.7 的图注也是如此）；$\C/\Z_3$ 是前一个例子，是非紧的锥面。正文已改正。`}</Box>
      </Sub>

      <Sub n="8.8.2" title="Three-dimensional examples" zh="三维例子">
        <Tx>{R`三维复轨形曾被提出作为超弦紧化的候选。这个题目的详细讨论超出了本书范围，读者可参阅 Dixon *et al* (1985, 1986) 与 Green *et al* (1987)。

设 $T=\C^3/L$ 是三维复环面，$L$ 是 $\C^3$ 中的格。具体地，设 $(z_1,z_2,z_3)$ 是 $\C^3$ 的坐标，把 $z_i$ 与 $z_i+m+n\mathrm{e}^{\pi\mathrm{i}/3}$ 等同。在这一等同下，$T$ 等同于三个环面之积 $T=T_1\times T_2\times T_3$。像前面一样，$T$ 容许 $\Z_3$ 的作用 $\alpha:z_i\mapsto\mathrm{e}^{2\pi\mathrm{i}/3}z_i$。若每个 $z_i$ 取 $0$、$(1/\sqrt3)\mathrm{e}^{\mathrm{i}\pi/6}$、$(2/\sqrt3)\mathrm{e}^{\pi\mathrm{i}/6}$ 之一，$\alpha$ 的作用保持点 $(z_i)$ 不变。因此轨形中有 $3^3=27$ 个不动点。在这里，不动点是锥形奇点（\figref{8.8}），轨形不可能是流形。`}</Tx>
        <Figure illustration={<ConeSingularityRedraw />} n="8.8" caption={R`自绘高维商锥奇点的实截面示意；$Y^2=XZ$ 的顶点揭示代数奇性，完整的拓扑判别需检查高维 link。`} width="100%" />
        <Tx>{R`［**注：**锥形奇点的出现可以从一个更简单的例子更容易地理解。设 $(x,y)\in\C^2$，令 $\Z_2$ 以 $(x,y)\mapsto\pm(x,y)$ 作用在 $\C^2$ 上。则轨形 $\Gamma=\C^2/\Z_2$ 在原点处有锥形奇点。事实上，令 $[(x,y)]\to(x^2,xy,y^2)\equiv(X,Y,Z)$ 为 $\Gamma$ 到 $\C^3$ 的嵌入（$\pm(x,y)$ 给出同一个像，且像能唯一确定 $\pm(x,y)$）。注意 $X$、$Y$、$Z$ 满足关系 $Y^2=XZ$。若把 $X$、$Y$、$Z$ 看作实变量，这正是锥面的方程（$Y^2=XZ$ 经 $X=u+v$、$Z=u-v$ 变成 $Y^2+v^2=u^2$）。］

与一维情形不同，这里的商不再是拓扑流形：$\C^3/\Z_3$ 原点的"连接"（小球面 $S^5$ 模去 $\Z_3$）是透镜空间 $S^5/\Z_3$ 而不是 $S^5$，所以原点没有同胚于 $\R^6$ 的邻域。在弦论中，这些奇点可以"吹胀"（blow up）成光滑的 Calabi–Yau 流形：$T^6/\Z_3$ 的 27 个奇点吹胀后得到 $b^{1,1}=36$（$9$ 个来自环面、$27$ 个来自吹胀）、$b^{2,1}=0$ 的 Calabi–Yau 三维流形，$\chi=72$。`}</Tx>
      </Sub>
    </Sec>);
}
