// §10.2 和乐 + §10.3 曲率 —— 式 (10.21)–(10.47)，定义 10.4–10.5，命题 10.2，引理 10.2，定理 10.3–10.5，
// 例 10.3，习题 10.5–10.7，交互图 1（球面和乐）、交互图 3（SU(2) 场强）
import { Sec, Sub, Tx, Eq, Box, Stmt, Proof, Exercise, Derivation, C } from "@kit";
import { SphereHolonomyLab, SU2CurvatureLab } from "./_ch10_demos.jsx";

const R = String.raw;
const LG = R`\sym{lie}{\mathfrak{g}}`;
const OM = R`\sym{forms}{\Omega}`;

export function Sec102() {
  return (
    <Sec n="10.2" title="Holonomy" zh="和乐"
      gist={R`闭路 $\gamma$ 的水平提升一般闭不上，在纤维上诱导 $\tau_\gamma(u)=ug_\gamma$；$g_{\alpha*\beta}=g_\beta g_\alpha$ 使全体 $g_\gamma$ 构成 $G$ 的子群——和乐群 $\Phi_u$。局部地 $g_\gamma=\mathcal{P}\exp(-\oint\mathcal{A})$，即 Wilson 圈。`}
      why={R`和乐是联络最基本的整体不变量：它告诉我们"平行移动一圈回来差了多少"，也是规范理论中唯一能脱离规范选择而被测量的量（Wilson 圈、Aharonov–Bohm 相位、Berry 相位）。`}
      gives={["10.21", "10.22", "10.23", "10.25", "10.26", "10.27"]}>
      <Sub n="10.2.1" title="Definitions" zh="定义">
        <p className="muted">本小节概念：<C id="holonomy" /></p>
        <Tx>{R`**问题。**设 $P(M,G)$ 是主丛，$\gamma:[0,1]\to M$ 是曲线，它过 $u_0\in\pi^{-1}(\gamma(0))$ 的水平提升为 $\tilde\gamma$。上一节定义了映射 $\Gamma(\tilde\gamma):\pi^{-1}(\gamma(0))\to\pi^{-1}(\gamma(1))$，把 $u_0=\tilde\gamma(0)$ 映到 $u_1=\tilde\gamma(1)$。考虑两条曲线 $\alpha,\beta:[0,1]\to M$，$\alpha(0)=\beta(0)=p_0$，$\alpha(1)=\beta(1)=p_1$，取水平提升使 $\tilde\alpha(0)=\tilde\beta(0)=u_0$。那么 $\tilde\alpha(1)$ 不一定等于 $\tilde\beta(1)$：平行移动依赖路径。

换句话说，若考虑 $p=\gamma(0)=\gamma(1)$ 处的**闭路**（loop）$\gamma$，一般有 $\tilde\gamma(0)\neq\tilde\gamma(1)$。闭路 $\gamma$ 在纤维上定义了一个**变换** $\tau_\gamma:\pi^{-1}(p)\to\pi^{-1}(p)$。它与群的右作用相容：`}</Tx>
        <Eq n="10.21" say={R`沿闭路平行移动一圈的变换与右作用对易：先右移再绕圈，与先绕圈再右移，结果一样。`}>{R`\tau_\gamma(ug)=\tau_\gamma(u)g`}</Eq>
        <Tx>{R`这立刻由 \eqref{10.18} 推出。注意 $\tau_\gamma$ 不仅依赖于闭路 $\gamma$，还依赖于联络。`}</Tx>
        <Box kind="example" n="10.3" title={R`$\mathbb{R}$ 丛上的和乐：平移 $2\pi$`}>
          <Tx>{R`考虑 $M=\mathbb{R}^2-\{0\}$ 上的 $\mathbb{R}$ 丛。例 10.2 的联络一形式 $\omega$ 与闭路 $\gamma$ 定义了映射 $\tau_\gamma:\pi^{-1}((1,0))\to\pi^{-1}((1,0))$，$g\mapsto g+2\pi$（$g\in\mathbb{R}$）。绕原点 $n$ 圈的闭路给出 $g\mapsto g+2\pi n$；不绕原点的闭路给出恒等变换。所以这个联络的和乐群是 $2\pi\mathbb{Z}\subset\mathbb{R}$，而限制和乐群（下面的 \eqref{10.27}）是平凡的。`}</Tx>
        </Box>
        <Tx>{R`**和乐群。**取 $u\in P$，$\pi(u)=p$，考虑 $p$ 处闭路的集合 $C_p(M)\equiv\{\gamma:[0,1]\to M\mid\gamma(0)=\gamma(1)=p\}$。元素的集合`}</Tx>
        <Stmt id="F:hol">
          <Eq n="10.22" keyEq title="和乐群" say={R`和乐群：把 $u$ 沿 $p$ 处所有可能的闭路平行移动一圈，回来时相差的群元素全体。`}>{R`\Phi_u\equiv\{g\in G\mid\tau_\gamma(u)=ug,\ \gamma\in C_p(M)\}`}</Eq>
        </Stmt>
        <Tx>{R`是结构群 $G$ 的子群，称为 $u$ 处的**和乐群**（holonomy group）。$\Phi_u$ 的群性质容易由习题 10.3 推出。若 $\alpha$、$\beta$ 与 $\gamma=\alpha*\beta$ 都是 $p$ 处的闭路，由 \eqref{10.20}，$\tau_\gamma=\tau_\beta\circ\tau_\alpha$，于是

$$\tau_\gamma(u)=\tau_\beta\circ\tau_\alpha(u)=\tau_\beta(ug_\alpha)=\tau_\beta(u)g_\alpha=ug_\beta g_\alpha,$$

其中 $\tau_\alpha(u)=ug_\alpha$ 等。这说明`}</Tx>
        <Eq n="10.23" say={R`闭路的复合对应和乐元的乘积，而且顺序反过来：先走 $\alpha$ 后走 $\beta$，和乐元是 $g_\beta g_\alpha$。`}>{R`g_\gamma=g_\beta g_\alpha.`}</Eq>
        <Tx>{R`常值闭路 $c:[0,1]\mapsto p$ 定义恒等变换 $\tau_c:u\mapsto u$。$\gamma$ 的逆闭路 $\gamma^{-1}$ 诱导逆变换 $\tau_{\gamma^{-1}}=\tau_\gamma^{-1}$（\eqref{10.19}），因此 $g_{\gamma^{-1}}=g_\gamma^{-1}$。封闭性、单位元、逆元齐备，$\Phi_u$ 是子群。（$g_\gamma$ 由 $\tau_\gamma(u)=ug_\gamma$ 唯一确定，因为 $G$ 在纤维上的作用是自由的。）`}</Tx>
        <Exercise n="10.5" title="和乐群对基点的依赖" level="★★"
          hint={R`(a) 用 \eqref{10.21}。(b) 设 $u'=\Gamma(\tilde\gamma)(u)$；$u'$ 处的闭路 $\alpha'$ 对应 $u$ 处的闭路 $\gamma*\alpha'*\gamma^{-1}$。(c) 连通流形是道路连通的；结合 (a)(b)。`}
          solution={R`**(a)** 由 \eqref{10.21}，$\tau_\alpha(ug)=\tau_\alpha(u)g=ug_\alpha g=ug\,(g^{-1}g_\alpha g)$。所以 $ug$ 处闭路 $\alpha$ 的和乐元是 $g^{-1}g_\alpha g=\mathrm{ad}_{g^{-1}}g_\alpha$，这就是 \eqref{10.24}。令 $g=a$、让 $\alpha$ 取遍 $C_p(M)$：$\Phi_{ua}=\{a^{-1}g_\alpha a\}=a^{-1}\Phi_ua$。这不仅是同构，而且是 $G$ 中的共轭子群——\eqref{10.25} 中的"$\cong$"实际上是等号。

**(b)** 设 $\gamma$ 是从 $p=\pi(u)$ 到 $p'=\pi(u')$ 的曲线，$u'=\Gamma(\tilde\gamma)(u)$。对 $p'$ 处的任意闭路 $\alpha'$，$\alpha\equiv\gamma*\alpha'*\gamma^{-1}$ 是 $p$ 处的闭路，由 \eqref{10.19}、\eqref{10.20} 与 \eqref{10.18}：

$$\tau_\alpha(u)=\Gamma(\tilde\gamma)^{-1}\tau_{\alpha'}\Gamma(\tilde\gamma)(u)=\Gamma(\tilde\gamma)^{-1}(u'g_{\alpha'})=\Gamma(\tilde\gamma)^{-1}(u')\,g_{\alpha'}=ug_{\alpha'}.$$

故 $\Phi_{u'}\subset\Phi_u$；交换 $u$、$u'$ 的角色（用 $\gamma^{-1}$）得 $\Phi_u\subset\Phi_{u'}$。所以 $\Phi_u=\Phi_{u'}$——同一水平提升上的点有**相同**的和乐群。

**(c)** 设 $u,v\in P$。$M$ 连通，从而道路连通；取从 $\pi(u)$ 到 $\pi(v)$ 的曲线，从 $u$ 出发做水平提升，终点 $u''\in\pi^{-1}(\pi(v))$，所以 $v=u''a$（某个 $a\in G$）。由 (b)、(a)：$\Phi_v=\Phi_{u''a}=a^{-1}\Phi_{u''}a=a^{-1}\Phi_ua\cong\Phi_u$。因此对连通的 $M$，所有和乐群彼此共轭，作为抽象群可以记作 $\Phi$。`}>
          <Tx>{R`(a) 设 $\tau_\alpha(u)=ug_\alpha$。证明`}</Tx>
          <Eq n="10.24" say={R`把起点沿纤维右移 $g$，同一闭路的和乐元被 $g$ 共轭。`}>{R`\tau_\alpha(ug)=ug(\mathrm{ad}_{g^{-1}}g_\alpha)=ug(g^{-1}g_\alpha g).`}</Eq>
          <Tx>{R`验证`}</Tx>
          <Eq n="10.25" say={R`同一根纤维上不同点的和乐群互为共轭子群。`}>{R`\Phi_{ua}\cong a^{-1}\Phi_ua.`}</Eq>
          <Tx>{R`(b) 设 $u,u'\in P$ 是同一条水平提升 $\tilde\gamma$ 上的点。证明 $\Phi_u\cong\Phi_{u'}$。(c) 设 $M$ 连通。证明所有 $\Phi_u$ 彼此同构。`}</Tx>
        </Exercise>
        <Box kind="warning" title={R`勘误：\eqref{10.24} 中伴随作用的下标（p.405）`}>{R`原书印作 $ug(\mathrm{ad}_g\,g_\alpha)=ug(g^{-1}g_\alpha g)$。但本章开头定义了 $\mathrm{ad}_gh\equiv ghg^{-1}$，所以 $g^{-1}g_\alpha g=\mathrm{ad}_{g^{-1}}g_\alpha$。等式右边（显式的 $g^{-1}g_\alpha g$）是对的，只是 $\mathrm{ad}$ 的下标应为 $g^{-1}$。正文已改正。`}</Box>
        <Exercise n="10.6" title="和乐元的局部公式（Wilson 圈）" level="★"
          hint={R`在 \eqref{10.14} 中令 $\gamma$ 为闭路、$t=1$；取 $u=\sigma_i(p)$。`}
          solution={R`取 $u=\sigma_i(p)$（$g_i(u)=e$）。由定理 10.2 的构造，从 $u$ 出发的水平提升为 $\tilde\gamma(t)=\sigma_i(\gamma(t))g_i(\gamma(t))$，$g_i$ 由 \eqref{10.14} 给出。$\gamma$ 是闭路，$\gamma(1)=p$，所以

$$\tau_\gamma(u)=\tilde\gamma(1)=\sigma_i(p)g_i(\gamma(1))=u\,\mathcal{P}\exp\Big(-\oint_\gamma\mathcal{A}_{i\mu}\dd x^\mu\Big),$$

即 $g_\gamma=\mathcal{P}\exp(-\oint_\gamma\mathcal{A}_{i\mu}\dd x^\mu)$。

**两点说明：**(1) 若 $u=\sigma_i(p)h$，由 \eqref{10.24} 得 $g_\gamma=h^{-1}\mathcal{P}\exp(-\oint\mathcal{A})h$；所以路径排序指数本身依赖规范（换截面时被共轭），但它的共轭类——例如 $\Tr g_\gamma$（Wilson 圈）——是规范不变的。(2) 阿贝尔情形 $\mathcal{P}$ 可以去掉，$g_\gamma=\exp(-\oint\mathcal{A})$；由 Stokes 定理 $=\exp(-\int_S\mathcal{F})$——这是 \eqref{10.159b} 与交互图 1、2 的出发点。`}>
          <Tx>{R`设 $\mathcal{A}_i=\mathcal{A}_{i\mu}\dd x^\mu$ 是 $U_i$ 上的规范势，$\gamma$ 是 $U_i$ 中的闭路。设 $\tau_\gamma(u)=ug_\gamma$，$u\in P$，$g_\gamma\in G$。用 \eqref{10.14} 证明`}</Tx>
          <Eq n="10.26" keyEq title="Wilson 圈" say={R`闭路的和乐元就是规范势沿闭路的路径排序指数——物理中的 Wilson 圈。`}>{R`g_\gamma=\mathcal{P}\exp\Big(-\oint_\gamma\mathcal{A}_{i\mu}\dd x^\mu\Big).`}</Eq>
        </Exercise>
        <Tx>{R`**限制和乐群。**令 $C_p^0(M)$ 表示 $p$ 处与常值闭路同伦的闭路的集合。群`}</Tx>
        <Eq n="10.27" say={R`只用能缩成一点的闭路得到的和乐群：它只"看到"曲率，看不到空间的洞。`}>{R`\Phi_u^0\equiv\{g\in G\mid\tau_\gamma(u)=ug,\ \gamma\in C_p^0(M)\}`}</Eq>
        <Tx>{R`称为**限制和乐群**（restricted holonomy group）。它是 $\Phi_u$ 的正规子群（零伦闭路被任意闭路共轭后仍零伦），而 $\gamma\mapsto g_\gamma\Phi^0_u$ 给出从 $\pi_1(M,p)$ 到商群 $\Phi_u/\Phi^0_u$ 的满同态。例 10.3 中 $\Phi^0_u$ 平凡、$\Phi_u=2\pi\mathbb{Z}$：全部和乐来自 $\pi_1(\mathbb{R}^2-\{0\})=\mathbb{Z}$。下一节将看到，$\Phi^0_u$ 由曲率决定（Ambrose–Singer 定理）。`}</Tx>
      </Sub>
    </Sec>);
}

export function Sec103() {
  return (
    <Sec n="10.3" title="Curvature" zh="曲率"
      gist={R`曲率 $\Omega=\mathrm{D}\omega$（只喂水平向量的外微分）。Cartan 结构方程 $\Omega=\dd_P\omega+\omega\wedge\omega$；$\Omega(X,Y)=-\omega([X,Y])$ 是无穷小闭路的和乐。局部形式即 Yang–Mills 场强 $\mathcal{F}=\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}$，换卡时协变 $\mathcal{F}_j=t_{ij}^{-1}\mathcal{F}_it_{ij}$；Bianchi 恒等式 $\mathcal{D}\mathcal{F}=0$。`}
      why={R`和乐是整体量，难以直接计算；曲率是它的"局部密度"。物理上，场强（而不是势）出现在作用量与运动方程中。`}
      gives={["10.28", "10.29", "10.30", "10.32b", "10.33", "10.35", "10.38a", "10.39", "10.41", "10.42", "10.45", "10.46", "10.47"]}>
      <Sub n="10.3.1" title="Covariant derivatives in principal bundles" zh="主丛上的协变导数">
        <Tx>{R`第 5 章定义了外微分 $\dd:${OM}^r(M)\to${OM}^{r+1}(M)$。$r$ 形式 $\eta$ 是作用于向量的实值形式，$\eta:TM\wedge\ldots\wedge TM\to\mathbb{R}$。我们要把这一运算推广，以便对**向量值** $r$ 形式 $\phi\in${OM}^r(P)\otimes V$ 求导：

$$\phi:TP\wedge\ldots\wedge TP\to V,$$

其中 $V$ 是 $k$ 维向量空间。$\phi$ 的最一般形式是 $\phi=\sum_{\alpha=1}^k\phi^\alpha\otimes e_\alpha$，$\{e_\alpha\}$ 是 $V$ 的基，$\phi^\alpha\in${OM}^r(P)$。

$P(M,G)$ 上的联络 $\omega$ 把 $T_uP$ 分成 $H_uP\oplus V_uP$。相应地，向量 $X\in T_uP$ 分解为 $X=X^H+X^V$，$X^H\in H_uP$，$X^V\in V_uP$。`}</Tx>
        <Stmt id="D10.4">
          <Eq n="10.28" say={R`主丛上的协变导数：先对每个分量求普通外微分，然后只允许水平向量喂进去——竖直方向的变化被"过滤掉"。`}>{R`\mathrm{D}\phi(X_1,\ldots,X_{r+1})\equiv\dd_P\phi(X_1^H,\ldots,X_{r+1}^H)`}</Eq>
        </Stmt>
      </Sub>
      <Sub n="10.3.2" title="Curvature" zh="曲率">
        <p className="muted">本小节概念：<C id="curvature" /></p>
        <Stmt id="D10.5">
          <Eq n="10.29" keyEq title="曲率二形式" say={R`曲率就是联络一形式自己的协变导数：联络"在水平方向上的旋度"。`}>{R`\Omega\equiv\mathrm{D}\omega\in${OM}^2(P)\otimes${LG}.`}</Eq>
        </Stmt>
        <Stmt id="P10.2">
          <Eq n="10.30" say={R`曲率在右作用下也按伴随表示变换，但与联络不同，它没有非齐次项。`}>{R`R_a^*\Omega=a^{-1}\Omega a\qquad a\in G.`}</Eq>
          <Proof steps={[
            { claim: R`先注意 $(R_{a*}X)^H=R_{a*}(X^H)$（$R_{a*}$ 保持水平子空间，也保持竖直子空间），且 $\dd_PR_a^*=R_a^*\dd_P$（\eqref{5.75}）。`, uses: ["P10.1", "5.75"] },
            { claim: R`由定义：`, tex: R`\begin{aligned}R_a^*\Omega(X,Y)&=\Omega(R_{a*}X,R_{a*}Y)=\dd_P\omega((R_{a*}X)^H,(R_{a*}Y)^H)\\&=\dd_P\omega(R_{a*}X^H,R_{a*}Y^H)=R_a^*\dd_P\omega(X^H,Y^H)\\&=\dd_PR_a^*\omega(X^H,Y^H)=\dd_P(a^{-1}\omega a)(X^H,Y^H)=a^{-1}\dd_P\omega(X^H,Y^H)a\\&=a^{-1}\Omega(X,Y)a\end{aligned}` },
            { claim: R`这里用了 $a$ 是常元素，所以 $\dd_Pa=0$。`, uses: ["10.3b"] },
          ]} />
        </Stmt>
        <Tx>{R`**李代数值形式的对易子。**取 $${LG}$ 值 $p$ 形式 $\zeta=\zeta^\alpha\otimes T_\alpha$ 与 $${LG}$ 值 $q$ 形式 $\eta=\eta^\alpha\otimes T_\alpha$，其中 $\zeta^\alpha\in${OM}^p(P)$、$\eta^\alpha\in${OM}^q(P)$，$\{T_\alpha\}$ 是 $${LG}$ 的基。定义 $\zeta$ 与 $\eta$ 的对易子：`}</Tx>
        <Eq n="10.31" say={R`两个李代数值形式的"分次对易子"：形式部分做外积，李代数部分做李括号，结构常数把它们粘在一起。`}>{R`\begin{aligned}[\zeta,\eta]&\equiv\zeta\wedge\eta-(-1)^{pq}\eta\wedge\zeta=T_\alpha T_\beta\zeta^\alpha\wedge\eta^\beta-(-1)^{pq}T_\beta T_\alpha\eta^\beta\wedge\zeta^\alpha\\&=[T_\alpha,T_\beta]\otimes\zeta^\alpha\wedge\eta^\beta=f_{\alpha\beta}{}^\gamma T_\gamma\otimes\zeta^\alpha\wedge\eta^\beta.\end{aligned}`}</Eq>
        <Tx>{R`（第二个等号到第三个等号用了 $\eta^\beta\wedge\zeta^\alpha=(-1)^{pq}\zeta^\alpha\wedge\eta^\beta$。）若在 \eqref{10.31} 中令 $\zeta=\eta$，当 $p=q$ 为奇数时有

$$[\zeta,\zeta]=2\zeta\wedge\zeta=f_{\alpha\beta}{}^\gamma T_\gamma\otimes\zeta^\alpha\wedge\zeta^\beta.$$

特别地，对一形式 $\omega$，$\omega\wedge\omega=\frac12[\omega,\omega]\neq0$——李代数值一形式与自己的外积一般不为零，这正是非阿贝尔场强中二次项的来源。`}</Tx>
        <Stmt id="L10.2">
          <Proof steps={[
            { claim: R`设 $Y$ 是由单参数子群 $g(t)=\exp(tV)$ 生成的竖直向量场（$Y=V^\#$），它的流就是右作用 $R_{g(t)}$。于是 $Y$ 沿 $X$ 的李导数为`, tex: R`\mathcal{L}_YX=[Y,X]=\lim_{t\to0}t^{-1}(R_{g(t)*}X-X).` },
            { claim: R`由于联络满足 $R_{g*}H_uP=H_{ug}P$，向量 $R_{g(t)*}X$ 是水平的；水平子空间是线性子空间，差商及其极限都是水平的。所以 $[Y,X]$ 水平，$[X,Y]=-[Y,X]$ 亦然。`, uses: ["P10.1"], fill: true, why: R`严格地，差商中的两项要在同一点比较：$R_{g(t)*}X|_{ug(t)^{-1}}$ 与 $X|_u$ 都属于 $T_uP$，且都是水平向量（$X$ 是水平向量场）。` },
          ]} />
        </Stmt>
        <Stmt id="T10.3">
          <Eq n="10.32a" keyEq title="Cartan 结构方程" say={R`曲率等于联络的外微分，再加上联络在两个方向上的读数的对易子：对易子项只在非阿贝尔群里出现。`}>{R`\Omega(X,Y)=\dd_P\omega(X,Y)+[\omega(X),\omega(Y)]`}</Eq>
          <Tx>{R`也写作`}</Tx>
          <Eq n="10.32b" keyEq title="结构方程（形式写法）" say={R`曲率二形式 = 联络的外微分 + 联络与自身的外积。`}>{R`\Omega=\dd_P\omega+\omega\wedge\omega.`}</Eq>
          <Proof steps={[
            { claim: R`**(i) $X,Y\in H_uP$。**按定义 $\omega(X)=\omega(Y)=0$。由定义 10.5，$\Omega(X,Y)=\dd_P\omega(X^H,Y^H)=\dd_P\omega(X,Y)$，因为 $X=X^H$、$Y=Y^H$。两边相等。`, uses: ["D10.5"] },
            { claim: R`**(ii) $X\in H_uP$，$Y\in V_uP$。**因 $Y^H=0$，$\Omega(X,Y)=0$；又 $\omega(X)=0$。所以要证 $\dd_P\omega(X,Y)=0$。由 \eqref{5.70}：`, tex: R`\dd_P\omega(X,Y)=X\omega(Y)-Y\omega(X)-\omega([X,Y])=X\omega(Y)-\omega([X,Y]).`, uses: ["5.70"] },
            { claim: R`$Y\in V_uP$，故有 $V\in${LG}$ 使 $Y=V^\#$（把 $Y$ 延拓为基本向量场）。于是 $\omega(Y)=V$ 是常数，$X\omega(Y)=X\cdot V=0$。由引理 10.2，$[X,Y]\in H_uP$，所以 $\omega([X,Y])=0$，$\dd_P\omega(X,Y)=0$。`, uses: ["L10.2", "10.3a"] },
            { claim: R`**(iii) $X,Y\in V_uP$。**此时 $\Omega(X,Y)=0$，而`, tex: R`\dd_P\omega(X,Y)=X\omega(Y)-Y\omega(X)-\omega([X,Y])=-\omega([X,Y]).`, why: R`$\omega(X)$、$\omega(Y)$ 是常数（$X=B^\#$、$Y=C^\#$）。` },
            { claim: R`竖直向量场在李括号下封闭，$[X,Y]\in V_uP$（习题 10.1(b)），所以存在 $A\in${LG}$ 使 $\omega([X,Y])=A$，$A^\#=[X,Y]$。令 $B^\#=X$、$C^\#=Y$，则 $[\omega(X),\omega(Y)]=[B,C]=A$，因为 $[B,C]^\#=[B^\#,C^\#]$。于是`, tex: R`0=\dd_P\omega(X,Y)+\omega([X,Y])=\dd_P\omega(X,Y)+[\omega(X),\omega(Y)].`, uses: ["10.2"] },
            { claim: R`$\Omega$ 与右边都对 $(X,Y)$ 双线性且反对称，而任意向量都分解为水平 + 竖直，所以三种情形足以证明 \eqref{10.32a} 对任意向量成立。` },
            { claim: R`**由 (10.32a) 推 (10.32b)。**注意`, tex: R`\begin{aligned}[\omega,\omega](X,Y)&=[T_\alpha,T_\beta]\,\omega^\alpha\wedge\omega^\beta(X,Y)=[T_\alpha,T_\beta][\omega^\alpha(X)\omega^\beta(Y)-\omega^\beta(X)\omega^\alpha(Y)]\\&=[\omega(X),\omega(Y)]-[\omega(Y),\omega(X)]=2[\omega(X),\omega(Y)].\end{aligned}`, why: R`因此 $\Omega(X,Y)=(\dd_P\omega+\frac12[\omega,\omega])(X,Y)=(\dd_P\omega+\omega\wedge\omega)(X,Y)$。`, uses: ["10.31"] },
          ]} />
        </Stmt>
        <Box kind="note" title="与第 7 章对照">{R`第 7 章的 Cartan 结构方程 $R^\alpha{}_\beta=\dd\omega^\alpha{}_\beta+\omega^\alpha{}_\gamma\wedge\omega^\gamma{}_\beta$（\sref{T7.3}）正是 \eqref{10.32b} 在标架丛上用局部截面拉回后的矩阵写法：$\omega\wedge\omega$ 中的矩阵乘法就是 $\omega^\alpha{}_\gamma\wedge\omega^\gamma{}_\beta$。`}</Box>
      </Sub>
      <Sub n="10.3.3" title="Geometrical meaning of the curvature and the Ambrose–Singer theorem" zh="曲率的几何意义与 Ambrose–Singer 定理">
        <p className="muted">本小节概念：<C id="curv_meaning" /></p>
        <Tx>{R`第 7 章证明了 Riemann 曲率张量表示向量平行移动的不可交换性。主丛上的曲率有类似的解释。我们先证明：$\Omega(X,Y)$ 给出水平向量 $X,Y\in H_uP$ 的李括号 $[X,Y]$ 的竖直分量。由 $\omega(X)=\omega(Y)=0$，

$$\dd_P\omega(X,Y)=X\omega(Y)-Y\omega(X)-\omega([X,Y])=-\omega([X,Y]).$$

由于 $X^H=X$、$Y^H=Y$，`}</Tx>
        <Eq n="10.33" say={R`两个水平向量场的括号一般不再水平；曲率读出的正是这个括号的竖直部分（差一个负号）。`}>{R`\Omega(X,Y)=\dd_P\omega(X,Y)=-\omega([X,Y]).`}</Eq>
        <Tx>{R`**无穷小平行四边形。**在坐标卡 $U$ 上取坐标 $\{x^\mu\}$，令 $V=\partial/\partial x^1$、$W=\partial/\partial x^2$。取无穷小平行四边形 $\gamma$，顶点为 $\mathrm{O}=\{0,0,\ldots,0\}$、$\mathrm{P}=\{\epsilon,0,\ldots,0\}$、$\mathrm{Q}=\{\epsilon,\delta,0,\ldots,0\}$、$\mathrm{R}=\{0,\delta,0,\ldots,0\}$。考虑 $\gamma$ 的水平提升 $\tilde\gamma$。设 $X,Y\in H_uP$ 是使 $\pi_*X=\epsilon V$、$\pi_*Y=\delta W$ 的水平向量场（$\epsilon V$、$\delta W$ 的水平提升）。则`}</Tx>
        <Eq n="10.34" say={R`两个水平提升向量场的括号投影到底流形上，是坐标向量场的括号，它为零——所以这个括号完全是竖直的。`}>{R`\pi_*([X,Y])=\epsilon\delta[V,W]=\epsilon\delta\Big[\frac{\partial}{\partial x^1},\frac{\partial}{\partial x^2}\Big]=0`}</Eq>
        <Tx>{R`即 $[X,Y]$ 是**竖直**的。（这里用了：$X$ 与 $\epsilon V$、$Y$ 与 $\delta W$ 是 $\pi$-相关的，所以 $\pi_*[X,Y]=[\pi_*X,\pi_*Y]$。）这说明闭路 $\gamma$ 的水平提升 $\tilde\gamma$ 闭不上：先沿 $X$ 再沿 $Y$，与先沿 $Y$ 再沿 $X$，到达同一根纤维上的不同点，偏差正比于连接起点与终点的竖直向量 $[X,Y]$。曲率量出这段距离：`}</Tx>
        <Box kind="warning" title={R`勘误：\eqref{10.34} 左边多了上标 $H$（p.408）`}>{R`原书印作 $\pi_*([X,Y]^H)=\epsilon\delta[V,W]=0$。等式 $\pi_*(\cdot)=\epsilon\delta[V,W]$ 来自 $\pi$-相关向量场的括号公式 $\pi_*[X,Y]=[\pi_*X,\pi_*Y]$，它作用于整个 $[X,Y]$；由此 $\pi_*[X,Y]=0$，即 $[X,Y]$ 竖直（$\ker\pi_*=V_uP$）。若左边写成水平分量 $[X,Y]^H$，就把要证明的结论（水平分量为零）预先放进了等式。应为 $\pi_*([X,Y])$，正文已改正。`}</Box>
        <Eq n="10.35" keyEq title="曲率 = 无穷小和乐" say={R`沿一个无穷小闭路水平提升，起点与终点在纤维上的偏差由曲率给出：曲率就是"单位面积的和乐"。`}>{R`\Omega(X,Y)=-\omega([X,Y])=-A`}</Eq>
        <Tx>{R`其中 $A$ 是使 $[X,Y]=A^\#$ 的 $${LG}$ 元素。`}</Tx>
        <Box kind="warning" title={R`勘误：\eqref{10.35} 的最后一个等号差一个负号（p.408）`}>{R`原书印作 $\Omega(X,Y)=-\omega([X,Y])=A$，其中 $[X,Y]=A^\#$。但由公理 \eqref{10.3a}，$\omega([X,Y])=\omega(A^\#)=A$，所以 $-\omega([X,Y])=-A$。正文写作 $-A$。（几何结论不变：曲率量出 $[X,Y]$ 的竖直偏差，只是方向相反。）`}</Box>
        <Derivation title={R`补充：无穷小闭路的和乐 $\approx1-\epsilon\delta\,\mathcal{F}_{12}$（与交互图 3 对照）`} collapsed steps={[
          { tex: R`g_\gamma=\mathcal{P}\exp\Big(-\oint_\gamma\mathcal{A}\Big)`, why: R`由 \eqref{10.26}，沿平行四边形 $\mathrm{OPQR}$（逆时针）的和乐元。` },
          { tex: R`g_\gamma=e^{\delta\mathcal{A}_2(0,\delta/2)}\,e^{\epsilon\mathcal{A}_1(\epsilon/2,\delta)}\,e^{-\delta\mathcal{A}_2(\epsilon,\delta/2)}\,e^{-\epsilon\mathcal{A}_1(\epsilon/2,0)}+O(3)`, why: R`四条边 $\mathrm{O\to P\to Q\to R\to O}$ 各贡献一个 $\exp(-\mathcal{A}_\mu\Delta x^\mu)$（取边中点的值；后两条边 $\Delta x^1=-\epsilon$、$\Delta x^2=-\delta$），后走的边写在左边；$O(3)$ 表示三阶小量。` },
          { tex: R`g_\gamma=1-\epsilon\delta\big(\partial_1\mathcal{A}_2-\partial_2\mathcal{A}_1+[\mathcal{A}_1,\mathcal{A}_2]\big)+O(3)=1-\epsilon\delta\,\mathcal{F}_{12}+O(3)`, why: R`一阶项：对边之差 $\epsilon[\mathcal{A}_1(\epsilon/2,\delta)-\mathcal{A}_1(\epsilon/2,0)]-\delta[\mathcal{A}_2(\epsilon,\delta/2)-\mathcal{A}_2(0,\delta/2)]\approx\epsilon\delta(\partial_2\mathcal{A}_1-\partial_1\mathcal{A}_2)$。二阶项：$\epsilon^2\mathcal{A}_1^2$、$\delta^2\mathcal{A}_2^2$ 各自相消；$\epsilon\delta$ 交叉项按"左在后"的顺序相加为 $-\mathcal{A}_1\mathcal{A}_2-\mathcal{A}_2\mathcal{A}_1+2\mathcal{A}_2\mathcal{A}_1=-[\mathcal{A}_1,\mathcal{A}_2]$。` },
        ]} result={R`曲率的局部形式 $\mathcal{F}_{12}$（\eqref{10.39}）就是单位面积上的和乐偏差。交互图 3 用路径排序乘积数值计算 $g_\gamma$，验证 $-(g_\gamma-1)/\epsilon^2\to\mathcal{F}_{12}$。`} />
        <Tx>{R`闭曲线的水平提升起点与终点之间的偏差恰好就是和乐，因此我们预期和乐群可以用曲率表示。`}</Tx>
        <Stmt id="T10.4">
          <Eq n="10.36" say={R`和乐群的李代数由所有水平向量对上的曲率值张成：局部的曲率完全决定了（限制）和乐群。`}>{R`\Omega_u(X,Y)\qquad X,Y\in H_uP`}</Eq>
        </Stmt>
        <Tx>{R`下面的交互图把这一切放到最熟悉的例子里：二维球面。$S^2$ 的标架丛结构群是 $\mathrm{SO}(2)\cong\mathrm{U}(1)$，Levi-Civita 联络（第 7 章）就是这个主丛上的联络。曲率处处为 $K=1$，所以任何闭路的和乐角都等于它围住的面积——Gauss–Bonnet 定理在丛语言中的样子。`}</Tx>
        <SphereHolonomyLab />
      </Sub>
      <Sub n="10.3.4" title="Local form of the curvature" zh="曲率的局部形式">
        <Tx>{R`**我们要做的事：**把 $P$ 上的曲率拉回到底流形，得到物理学家的场强，并求出它在换卡时的变换律。曲率 $\Omega$ 的局部形式 $\mathcal{F}$ 定义为`}</Tx>
        <Eq n="10.37" say={R`场强就是曲率用局部截面拉回到底流形上的结果，与"规范势是联络的拉回"完全平行。`}>{R`\mathcal{F}\equiv\sigma^*\Omega`}</Eq>
        <Tx>{R`其中 $\sigma$ 是 $M$ 的坐标卡 $U$ 上的局部截面（参照 $\mathcal{A}=\sigma^*\omega$）。$\mathcal{F}$ 用规范势 $\mathcal{A}$ 表示为`}</Tx>
        <Eq n="10.38a" keyEq title="Yang–Mills 场强" say={R`场强 = 规范势的外微分 + 势与自身的外积；后一项只在非阿贝尔理论中存在，它让规范场自己带"荷"。`}>{R`\mathcal{F}=\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}`}</Eq>
        <Tx>{R`其中 $\dd$ 是 $M$ 上的外微分。$\mathcal{F}$ 作用在 $TM$ 的向量上为`}</Tx>
        <Eq n="10.38b" say={R`场强作用在两个底流形向量上：势的外微分加上势在两个方向上的值的对易子。`}>{R`\mathcal{F}(X,Y)=\dd\mathcal{A}(X,Y)+[\mathcal{A}(X),\mathcal{A}(Y)].`}</Eq>
        <Tx>{R`**证明 \eqref{10.38a}。**注意 $\mathcal{A}=\sigma^*\omega$、$\sigma^*\dd_P\omega=\dd\sigma^*\omega$（拉回与外微分对易）、$\sigma^*(\zeta\wedge\eta)=\sigma^*\zeta\wedge\sigma^*\eta$。由 Cartan 结构方程，

$$\mathcal{F}=\sigma^*(\dd_P\omega+\omega\wedge\omega)=\dd\sigma^*\omega+\sigma^*\omega\wedge\sigma^*\omega=\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}.$$

**分量形式。**在坐标为 $x^\mu=\varphi(p)$ 的卡 $U$ 上，令 $\mathcal{A}=\mathcal{A}_\mu\dd x^\mu$。若写 $\mathcal{F}=\frac12\mathcal{F}_{\mu\nu}\dd x^\mu\wedge\dd x^\nu$，直接计算给出`}</Tx>
        <Eq n="10.39" keyEq title="场强的分量" say={R`场强分量：普通的"旋度" $\partial_\mu\mathcal{A}_\nu-\partial_\nu\mathcal{A}_\mu$ 加上势分量的对易子。`}>{R`\mathcal{F}_{\mu\nu}=\partial_\mu\mathcal{A}_\nu-\partial_\nu\mathcal{A}_\mu+[\mathcal{A}_\mu,\mathcal{A}_\nu].`}</Eq>
        <Derivation title="补全：由 (10.38a) 得 (10.39)" collapsed steps={[
          { tex: R`\dd\mathcal{A}=\partial_\mu\mathcal{A}_\nu\,\dd x^\mu\wedge\dd x^\nu=\tfrac12(\partial_\mu\mathcal{A}_\nu-\partial_\nu\mathcal{A}_\mu)\dd x^\mu\wedge\dd x^\nu`, why: R`把系数反对称化（对称部分被 $\dd x^\mu\wedge\dd x^\nu$ 消掉）。` },
          { tex: R`\mathcal{A}\wedge\mathcal{A}=\mathcal{A}_\mu\mathcal{A}_\nu\,\dd x^\mu\wedge\dd x^\nu=\tfrac12[\mathcal{A}_\mu,\mathcal{A}_\nu]\dd x^\mu\wedge\dd x^\nu`, why: R`同理；注意 $\mathcal{A}_\mu\mathcal{A}_\nu$ 是矩阵乘积，反对称部分是对易子的一半。` },
        ]} result={R`两式相加与 $\frac12\mathcal{F}_{\mu\nu}\dd x^\mu\wedge\dd x^\nu$ 比较，即得 \eqref{10.39}。`} />
        <Tx>{R`$\mathcal{F}$ 也称为曲率二形式，并被认同为（Yang–Mills）**场强**（field strength）。为避免混淆，我们称 $\Omega$ 为曲率，称 $\mathcal{F}$ 为（Yang–Mills）场强。由于 $\mathcal{A}_\mu$ 与 $\mathcal{F}_{\mu\nu}$ 是 $${LG}$ 值函数，可以用 $${LG}$ 的基 $\{T_\alpha\}$ 展开：`}</Tx>
        <Eq n="10.40" say={R`把李代数值的势与场强按生成元展开，得到实分量 $A_\mu{}^\alpha$、$F_{\mu\nu}{}^\alpha$——物理书里带"色指标"的写法。`}>{R`\mathcal{A}_\mu=A_\mu{}^\alpha T_\alpha\qquad\mathcal{F}_{\mu\nu}=F_{\mu\nu}{}^\alpha T_\alpha.`}</Eq>
        <Tx>{R`基向量满足通常的对易关系 $[T_\alpha,T_\beta]=f_{\alpha\beta}{}^\gamma T_\gamma$。于是得到熟知的表达式`}</Tx>
        <Eq n="10.41" keyEq title="场强的实分量" say={R`场强的每个色分量：线性的旋度项，加上由结构常数决定的势的二次项——非阿贝尔规范场的自相互作用。`}>{R`F_{\mu\nu}{}^\alpha=\partial_\mu A_\nu{}^\alpha-\partial_\nu A_\mu{}^\alpha+f_{\beta\gamma}{}^\alpha A_\mu{}^\beta A_\nu{}^\gamma.`}</Eq>
        <Tx>{R`（由 $[\mathcal{A}_\mu,\mathcal{A}_\nu]=A_\mu{}^\beta A_\nu{}^\gamma[T_\beta,T_\gamma]=f_{\beta\gamma}{}^\alpha A_\mu{}^\beta A_\nu{}^\gamma T_\alpha$。）`}</Tx>
        <Stmt id="T10.5">
          <Eq n="10.42" keyEq title="场强协变变换" say={R`换坐标卡时场强只被转移函数共轭，没有非齐次项：场强是"协变"的，因此它的迹在整个流形上有意义。`}>{R`\mathcal{F}_j=\mathrm{Ad}_{t_{ij}^{-1}}\mathcal{F}_i=t_{ij}^{-1}\mathcal{F}_it_{ij}`}</Eq>
          <Proof steps={[
            { claim: R`引入对应的规范势 $\mathcal{A}_i$、$\mathcal{A}_j$：$\mathcal{F}_i=\dd\mathcal{A}_i+\mathcal{A}_i\wedge\mathcal{A}_i$，$\mathcal{F}_j=\dd\mathcal{A}_j+\mathcal{A}_j\wedge\mathcal{A}_j$。把 $\mathcal{A}_j=t_{ij}^{-1}\mathcal{A}_it_{ij}+t_{ij}^{-1}\dd t_{ij}$ 代入 $\mathcal{F}_j$（下面把 $t_{ij}$ 简写为 $t$）：`, tex: R`\mathcal{F}_j=\dd(t^{-1}\mathcal{A}_it+t^{-1}\dd t)+(t^{-1}\mathcal{A}_it+t^{-1}\dd t)\wedge(t^{-1}\mathcal{A}_it+t^{-1}\dd t)`, uses: ["10.9"] },
            { claim: R`展开外微分（用 $\dd t^{-1}=-t^{-1}\dd t\,t^{-1}$，并注意 $\dd(t^{-1}\mathcal{A}_it)$ 的三项按 Leibniz 律带符号）：`, tex: R`\dd(\cdots)=-t^{-1}\dd t\wedge t^{-1}\mathcal{A}_it+t^{-1}\dd\mathcal{A}_it-t^{-1}\mathcal{A}_i\wedge\dd t-t^{-1}\dd t\,t^{-1}\wedge\dd t` },
            { claim: R`展开乘积：`, tex: R`(\cdots)\wedge(\cdots)=t^{-1}\mathcal{A}_i\wedge\mathcal{A}_it+t^{-1}\mathcal{A}_i\wedge\dd t+t^{-1}\dd t\,t^{-1}\wedge\mathcal{A}_it+t^{-1}\dd t\wedge t^{-1}\dd t` },
            { claim: R`相加：第一式的第 1、3、4 项分别与第二式的第 3、2、4 项相消，剩下`, tex: R`\mathcal{F}_j=t^{-1}(\dd\mathcal{A}_i+\mathcal{A}_i\wedge\mathcal{A}_i)t=t^{-1}\mathcal{F}_it.`, why: R`这里用了恒等式 $\dd t^{-1}=-t^{-1}\dd t\,t^{-1}$（由 $\dd(t^{-1}t)=0$）。` },
          ]} />
        </Stmt>
        <SU2CurvatureLab />
        <Exercise n="10.7" title="纯规范的场强为零" level="★"
          hint={R`$\dd(g^{-1})=-g^{-1}\dd g\,g^{-1}$。`}
          solution={R`设 $\mathcal{A}=g^{-1}\dd g$。则

$$\dd\mathcal{A}=\dd(g^{-1})\wedge\dd g=-g^{-1}\dd g\,g^{-1}\wedge\dd g=-(g^{-1}\dd g)\wedge(g^{-1}\dd g)=-\mathcal{A}\wedge\mathcal{A},$$

所以 $\mathcal{F}=\dd\mathcal{A}+\mathcal{A}\wedge\mathcal{A}=0$。（这就是第 5 章 Maurer–Cartan 方程 $\dd\theta+\theta\wedge\theta=0$ 的拉回。）

**另一种看法：**$\mathcal{A}=g^{-1}\dd g$ 正是 $\mathcal{A}'=0$ 经规范变换 \eqref{10.10a} 得到的势；由 \eqref{10.42}（同一卡上换截面的版本），$\mathcal{F}=g^{-1}\cdot0\cdot g=0$。

**逆命题（提示）：**若 $\mathcal{F}=0$，由 Ambrose–Singer 定理限制和乐群平凡；在可缩的 $U$ 上，平行移动与路径无关，于是从一点出发把 $e$ 平行移动到各点，得到一个**水平截面** $\sigma'$；在这个截面下 $\mathcal{A}'=\sigma'^*\omega=0$（截面的切向量全是水平的），再换回原截面 $\sigma=\sigma'g$，由 \eqref{10.10a} 得 $\mathcal{A}=g^{-1}\dd g$。`}>
          <Tx>{R`若局部地 $\mathcal{A}=g^{-1}\dd g$，规范势 $\mathcal{A}$ 称为**纯规范**（pure gauge）。证明对纯规范 $\mathcal{A}$ 场强 $\mathcal{F}$ 为零。[可以证明逆命题也成立：若在坐标卡 $U$ 上 $\mathcal{F}=0$，规范势可以**局部地**写成 $\mathcal{A}=g^{-1}\dd g$。]`}</Tx>
        </Exercise>
      </Sub>
      <Sub n="10.3.5" title="The Bianchi identity" zh="Bianchi 恒等式">
        <p className="muted">本小节概念：<C id="bianchi" /></p>
        <Tx>{R`$\omega$ 与 $\Omega$ 是 $${LG}$ 值的，用 $${LG}$ 的基 $\{T_\alpha\}$ 展开：$\omega=\omega^\alpha T_\alpha$，$\Omega=\Omega^\alpha T_\alpha$。则 \eqref{10.32b} 成为`}</Tx>
        <Eq n="10.43" say={R`结构方程的分量形式：每个李代数分量的曲率，等于对应分量的外微分加上由结构常数耦合的二次项（带因子 $\frac12$）。`}>{R`\Omega^\alpha=\dd_P\omega^\alpha+\tfrac12f_{\beta\gamma}{}^\alpha\omega^\beta\wedge\omega^\gamma.`}</Eq>
        <Tx>{R`对 \eqref{10.43} 求外微分得`}</Tx>
        <Eq n="10.44" say={R`对结构方程再求一次外微分：曲率的外微分只含"联络的外微分与联络"的乘积，每一项都带有一个未被微分的联络一形式。`}>{R`\dd_P\Omega^\alpha=\tfrac12f_{\beta\gamma}{}^\alpha\big(\dd_P\omega^\beta\wedge\omega^\gamma-\omega^\beta\wedge\dd_P\omega^\gamma\big).`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{10.43} 缺因子 $\frac12$，\eqref{10.44} 第二项符号错（p.410）`}>{R`原书印作 $\Omega^\alpha=\dd_P\omega^\alpha+f_{\beta\gamma}{}^\alpha\omega^\beta\wedge\omega^\gamma$ 与 $\dd_P\Omega^\alpha=f_{\beta\gamma}{}^\alpha\dd_P\omega^\beta\wedge\omega^\gamma+f_{\beta\gamma}{}^\alpha\omega^\beta\wedge\dd_P\omega^\gamma$。

**(1) 因子 $\frac12$。**$\omega\wedge\omega=T_\beta T_\gamma\,\omega^\beta\wedge\omega^\gamma=\frac12[T_\beta,T_\gamma]\omega^\beta\wedge\omega^\gamma=\frac12f_{\beta\gamma}{}^\alpha T_\alpha\,\omega^\beta\wedge\omega^\gamma$（$\omega^\beta\wedge\omega^\gamma$ 反对称，只有 $T_\beta T_\gamma$ 的反对称部分存活）。这与本节前面的 $[\zeta,\zeta]=2\zeta\wedge\zeta=f_{\alpha\beta}{}^\gamma T_\gamma\otimes\zeta^\alpha\wedge\zeta^\beta$ 一致，也与 \eqref{10.41}（那里 $\frac12$ 被 $\mathcal{F}=\frac12\mathcal{F}_{\mu\nu}\dd x^\mu\wedge\dd x^\nu$ 的约定吸收）一致。

**(2) 符号。**$\omega^\beta$ 是一形式，$\dd(\omega^\beta\wedge\omega^\gamma)=\dd\omega^\beta\wedge\omega^\gamma-\omega^\beta\wedge\dd\omega^\gamma$。若照原书写成"$+$"，由 $f_{\beta\gamma}{}^\alpha$ 的反对称性可知 $f_{\beta\gamma}{}^\alpha\omega^\beta\wedge\dd\omega^\gamma=-f_{\beta\gamma}{}^\alpha\dd\omega^\beta\wedge\omega^\gamma$，原书右边恒为零——显然不对。原书随后用到的拉回式 $\sigma^*(\dd_P\omega\wedge\omega-\omega\wedge\dd_P\omega)$ 正是正确的版本。

两处都不影响 Bianchi 恒等式的结论。正文已改正。`}</Box>
        <Tx>{R`**Bianchi 恒等式。**矩阵写法下 \eqref{10.44} 就是 $\dd_P\Omega=\dd_P\omega\wedge\omega-\omega\wedge\dd_P\omega$：右边每一项都含一个未被微分的 $\omega$。注意到对水平向量 $X$ 有 $\omega(X)=0$，于是

$$\mathrm{D}\Omega(X,Y,Z)=\dd_P\Omega(X^H,Y^H,Z^H)=0,$$

其中 $X,Y,Z\in T_uP$。这就证明了 **Bianchi 恒等式**：`}</Tx>
        <Eq n="10.45" keyEq title="Bianchi 恒等式" say={R`曲率的协变导数恒为零：这是一个几何恒等式，不是动力学方程。`}>{R`\mathrm{D}\Omega=0.`}</Eq>
        <Tx>{R`**局部形式。**用 $\sigma^*$ 作用于 \eqref{10.44}。左边：$\sigma^*\dd_P\Omega=\dd\cdot\sigma^*\Omega=\dd\mathcal{F}$。右边：

$$\sigma^*(\dd_P\omega\wedge\omega-\omega\wedge\dd_P\omega)=\dd\sigma^*\omega\wedge\sigma^*\omega-\sigma^*\omega\wedge\dd\sigma^*\omega=\dd\mathcal{A}\wedge\mathcal{A}-\mathcal{A}\wedge\dd\mathcal{A}=\mathcal{F}\wedge\mathcal{A}-\mathcal{A}\wedge\mathcal{F}.$$

（最后一步代入 $\dd\mathcal{A}=\mathcal{F}-\mathcal{A}\wedge\mathcal{A}$，两个 $\mathcal{A}\wedge\mathcal{A}\wedge\mathcal{A}$ 相消。）于是得到`}</Tx>
        <Eq n="10.46" keyEq title="Bianchi 恒等式（局部形式）" say={R`场强的协变外微分为零：阿贝尔时就是 $\dd\mathcal{F}=0$，即 Maxwell 方程中不含源的那一半。`}>{R`\mathcal{D}\mathcal{F}=\dd\mathcal{F}+\mathcal{A}\wedge\mathcal{F}-\mathcal{F}\wedge\mathcal{A}=\dd\mathcal{F}+[\mathcal{A},\mathcal{F}]=0`}</Eq>
        <Tx>{R`其中 $\mathcal{D}$ 作用于 $M$ 上 $${LG}$ 值 $p$ 形式 $\eta$ 的定义为`}</Tx>
        <Eq n="10.47" say={R`底流形上李代数值形式的协变外微分：普通外微分加上与规范势的分次对易子。`}>{R`\mathcal{D}\eta\equiv\dd\eta+[\mathcal{A},\eta].`}</Eq>
        <Tx>{R`注意 $G=\mathrm{U}(1)$ 时 $\mathcal{D}\mathcal{F}=\dd\mathcal{F}$。交互图 3 的最后一个检验就是 \eqref{10.46} 的分量形式 $\mathcal{D}_1\mathcal{F}_{23}+\mathcal{D}_2\mathcal{F}_{31}+\mathcal{D}_3\mathcal{F}_{12}=0$（$\mathcal{D}_\lambda=\partial_\lambda+[\mathcal{A}_\lambda,\cdot\,]$）。`}</Tx>
      </Sub>
    </Sec>);
}
