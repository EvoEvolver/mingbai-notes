// 第 9 章的陈述登记表（定义 D、定理 T、引理 L、命题 P、推论 C）。格式见 framework/spec/PROOF.md。
// 数学与原书逐字符核对；原书笔误在 statusNote 中注明并已直接改正。
// 注意：String.raw 中 "$" 不能紧跟 "{"（会被当成模板插值）。
const R = String.raw;
export const S = {
  // ======================= 外部引用 / 未编号论断 =======================
  "X:Steenrod-homotopy": {
    kind: "cited", n: "（Steenrod 1951）", ch: "ch09", en: "Covering homotopy theorem", zh: "覆叠同伦定理", page: 377,
    stmt: R`设 $E\xrightarrow{\pi}M$ 是纤维丛，$N$ 是仿紧流形，$F:N\times[0,1]\to M$ 连续。则任一满足 $\pi\circ\bar F_0=F(\cdot,0)$ 的丛映射 $\bar F_0$ 都能延拓为 $\bar F:N\times[0,1]\to E$，使 $\pi\circ\bar F=F$（"同伦可以提升"）。`,
    deps: [], status: "note",
    statusNote: R`原书不证明定理 9.1，只引 Steenrod《The Topology of Fibre Bundles》(1951)。本站把其中真正用到的工具——覆叠同伦性质——作为外部引用列出，并在定理 9.1 下给出由它推出结论的思路。`,
    role: R`定理 9.1（同伦公理）的引擎：把同伦 $F$ 的"时间方向"提升到丛上，就得到 $f^*E$ 与 $g^*E$ 之间的丛同构。`,
  },
  "F:recon9": {
    kind: "fact", n: "（§9.2.2）", ch: "ch09", en: "Reconstruction of a bundle from transition functions", zh: "由转移函数重构纤维丛", page: 373,
    stmt: R`给定 $M$、开覆盖 $\{U_i\}$、满足相容条件 \eqref{9.6a}–\eqref{9.6c} 的 $t_{ij}:U_i\cap U_j\to G$、纤维 $F$ 与结构群 $G$，令 $X=\bigsqcup_iU_i\times F$，在 $(p,f)\in U_i\times F$ 与 $(q,f')\in U_j\times F$ 之间规定 $(p,f)\sim(q,f')\iff p=q,\ f=t_{ij}(p)f'$。则 $E=X/\sim$，$\pi:[(p,f)]\mapsto p$，$\phi_i:(p,f)\mapsto[(p,f)]$ 构成纤维丛 $(E,\pi,M,F,G)$，且以 $t_{ij}$ 为转移函数。`,
    deps: ["D9.1", "9.4", "9.6a", "9.6b", "9.6c"], status: "filled",
    statusNote: R`原书写 "$f'=t_{ij}(p)f$"，与 \eqref{9.4}、图 9.2 的约定 $f_i=t_{ij}f_j$ 方向相反（$(p,f)$ 在 $U_i$ 卡中、$(q,f')$ 在 $U_j$ 卡中，应有 $f=t_{ij}(p)f'$）。本站已改正，并补出"$\sim$ 是等价关系恰好需要 (9.6a)–(9.6c)"与"转移函数正是 $t_{ij}$"的验证。`,
    role: R`说明"纤维丛 = 一族局部乘积 + 粘合规则"：丛的全部整体信息都在 $\{t_{ij}\}$ 里。相伴丛、诱导主丛 $P(E)$ 都用这一程序构造。`,
    key: R`自反、对称、传递分别对应 $t_{ii}=e$、$t_{ji}=t_{ij}^{-1}$、$t_{ij}t_{jk}=t_{ik}$。`,
    pitfall: R`"并"必须是**不交**并：同一点 $p$ 在不同 $U_i\times F$ 中的副本是不同的元素，靠 $\sim$ 才粘起来。`,
  },
  "F:assoc9": {
    kind: "fact", n: "（§9.4.2）", ch: "ch09", en: "Transition functions of an associated bundle", zh: "相伴丛的转移函数", page: 390,
    stmt: R`设 $P(M,G)$ 是转移函数为 $t_{ij}$ 的主丛，$\rho$ 是 $G$ 在 $V$ 上的表示。则相伴向量丛 $E=P\times_\rho V$（把 $(u,v)$ 与 $(ug,\rho(g)^{-1}v)$ 等同）的投影 $\pi_E([(u,v)])=\pi(u)$ 良定义，其转移函数为 $\rho(t_{ij}(p))$。反之，向量丛 $E$ 用自己的转移函数（按 §9.2.2 的重构程序）诱导主丛 $P(E)$。`,
    deps: ["9.66", "9.43", "F:recon9"], status: "filled",
    statusNote: R`原书只陈述结论。本站补出：用典范局部平凡化 $s_i$，令 $\psi_i(p,v)=[(s_i(p),v)]$；由 \eqref{9.43} $s_i=s_jt_{ji}$，得 $[(s_i,v)]=[(s_jt_{ji},v)]=[(s_j,\rho(t_{ji})v)]$，所以 $v_j=\rho(t_{ji})v_i$，即 $v_i=\rho(t_{ij})v_j$。原书"见 §9.1 的重构程序"应为 §9.2.2。`,
    role: R`一个主丛同时控制它的所有相伴丛：物理中"同一个规范场作用在不同表示的物质场上"的数学表述。`,
    key: R`等价关系中 $\rho(g)^{-1}$ 的逆号保证了 $[(u,v)]\mapsto$"把 $u$ 当作标架、$v$ 当作分量"的拼合与标架选取无关。`,
    pitfall: R`相伴丛的结构群仍是 $G$（通过 $\rho$ 作用），若 $\rho$ 不忠实，转移函数 $\rho(t_{ij})$ 可能比 $t_{ij}$ "更平凡"。`,
  },

  // ======================= §9.2 纤维丛 =======================
  "D9.1": {
    kind: "definition", n: "9.1", ch: "ch09", en: "Differentiable fibre bundle", zh: "（可微）纤维丛", page: 370, eq: "9.4",
    stmt: R`（可微）**纤维丛**（fibre bundle）$(E,\pi,M,F,G)$ 由以下要素组成：(i) 微分流形 $E$，称为**全空间**（total space）；(ii) 微分流形 $M$，称为**底空间**（base space）；(iii) 微分流形 $F$，称为**纤维**（或**典型纤维**）；(iv) 满射 $\pi:E\to M$，称为**投影**；逆像 $\pi^{-1}(p)=F_p\cong F$ 称为 $p$ 处的纤维；(v) 李群 $G$，称为**结构群**，它从左边作用在 $F$ 上；(vi) $M$ 的开覆盖 $\{U_i\}$ 及微分同胚 $\phi_i:U_i\times F\to\pi^{-1}(U_i)$，满足 $\pi\circ\phi_i(p,f)=p$；$\phi_i$ 称为**局部平凡化**，因为 $\phi_i^{-1}$ 把 $\pi^{-1}(U_i)$ 映**满**直积 $U_i\times F$；(vii) 记 $\phi_i(p,f)=\phi_{i,p}(f)$，则 $\phi_{i,p}:F\to F_p$ 是微分同胚。在 $U_i\cap U_j\neq\emptyset$ 上，要求 $t_{ij}(p)\equiv\phi_{i,p}^{-1}\circ\phi_{j,p}:F\to F$ 是 $G$ 的元素；于是 $\phi_i$ 与 $\phi_j$ 由光滑映射 $t_{ij}:U_i\cap U_j\to G$ 联系：$\phi_j(p,f)=\phi_i(p,t_{ij}(p)f)$。映射 $t_{ij}$ 称为**转移函数**（transition functions）。`,
    deps: ["D5.1", "D5.8", "D5.14"], status: "checked",
    role: R`本章及第 10–12 章的基本对象。切丛、法丛、线丛、主丛、相伴丛、自旋丛都是它的特例；规范场论中的"规范势""物质场"分别活在主丛与相伴丛上。`,
    key: R`(vi) 说"局部是乘积"，(vii) 说"乘积之间只差一个结构群元素"。丛的整体扭曲完全记录在转移函数 $t_{ij}$ 中（\sref{F:recon9}）。`,
    pitfall: R`(a) $t_{ij}$ 把 **$j$ 卡**的纤维坐标送到 **$i$ 卡**：$f_i=t_{ij}(p)f_j$（图 9.2），下标顺序容易弄反。(b) 严格地说丛应与覆盖的选取无关（坐标丛的等价类），物理中通常固定一个覆盖。(c) 例 9.1 的 Möbius 带结构群是离散群 $\Z_2$——这是全书唯一一处不用李群作结构群。`,
  },
  "T9.1": {
    kind: "theorem", n: "9.1", ch: "ch09", en: "Homotopy axiom", zh: "同伦公理", page: 377,
    stmt: R`设 $E\xrightarrow{\pi}M$ 是纤维为 $F$ 的纤维丛，$f$ 与 $g$ 是从 $N$ 到 $M$ 的同伦映射。则 $f^*E$ 与 $g^*E$ 是 $N$ 上的等价丛。`,
    deps: ["9.17", "9.16", "X:Steenrod-homotopy"], status: "note",
    statusNote: R`原书只给出处（Steenrod 1951）。本站在正文中给出证明思路：把同伦 $F:N\times I\to M$ 拉回得 $N\times I$ 上的丛 $F^*E$，用覆叠同伦定理说明 $F^*E\cong(F_0^*E)\times I$，再限制到两端 $t=0,1$。`,
    role: R`把"丛的分类"变成同伦论问题：丛只依赖于映射的同伦类。直接推论是可缩底空间上的丛都平凡（\sref{C9.1}）；也解释了为何例 9.7、9.8 中的丛由同伦群 $\pi_1(\mathrm{U}(1))$、$\pi_3(\mathrm{SU}(2))$ 分类。`,
    key: R`同伦 $F$ 的拉回 $F^*E$ 是 $N\times[0,1]$ 上的丛，它在 $t=0$、$t=1$ 处的限制分别是 $f^*E$、$g^*E$；"沿 $t$ 方向搬运纤维"给出二者的同构。`,
    pitfall: R`结论是"等价"（存在覆盖恒等映射的丛同构），不是"相等"。$N$ 需要合理（如仿紧/紧致），对流形总成立。`,
  },
  "C9.1": {
    kind: "corollary", n: "9.1", ch: "ch09", en: "Bundles over contractible spaces are trivial", zh: "可缩底空间上的丛平凡", page: 377,
    stmt: R`设 $E\xrightarrow{\pi}M$ 是纤维丛。若 $M$ 可缩到一点，则 $E$ 是平凡丛。`,
    deps: ["T9.1", "D4.9", "9.18"], status: "filled",
    statusNote: R`原书论证中"$h_1^*E$ 是丛 $\{p_0\}\times F$ 的拉回"一句，本站补出：$h_1$ 是常值映射 $p\mapsto p_0$，由 \eqref{9.18}，$h_1^*E$ 的转移函数 $t_{ij}(h_1(p))=t_{ij}(p_0)$ 是常数，可以用常值规范变换 $g_i=t_{i1}(p_0)$ 全部消成恒等，故平凡。`,
    role: R`给出"局部平凡"的另一种理解：任何丛限制到可缩的坐标邻域上都平凡。例：$T\R^m$、$\R^m$ 上的任何丛都平凡；非平凡性必须来自底空间的拓扑（如 $S^1$、$S^2$、$S^4$）。`,
    key: R`可缩 ⇔ 恒等映射 $h_0=\mathrm{id}_M$ 与常值映射 $h_1$ 同伦；于是 $E=h_0^*E\simeq h_1^*E\simeq M\times F$。`,
    pitfall: R`逆命题不成立：$S^2$ 不可缩，但 $S^2$ 上也有平凡丛（如法丛 $NS^2=S^2\times\R$）。`,
  },

  // ======================= §9.4 主丛 =======================
  "T9.2": {
    kind: "theorem", n: "9.2", ch: "ch09", en: "Triviality of principal bundles", zh: "主丛平凡 ⇔ 有整体截面", page: 392, eq: "9.73",
    stmt: R`主丛是平凡的，当且仅当它容许一个整体截面。`,
    deps: ["9.41", "9.42", "9.43"], status: "filled",
    statusNote: R`原书说"容易验证 $\Phi$ 是同胚"；本站补出：在典范局部平凡化中 $\phi_i^{-1}(s(p)a)=(p,g_i(p)a)$，所以 $\Phi$ 在每个 $\pi^{-1}(U_i)$ 上写成 $(p,g)\mapsto(p,g_i(p)^{-1}g)$，连同逆映射 $(p,a)\mapsto s(p)a$ 都光滑。`,
    role: R`把"主丛是否扭曲"化为"能否在整个底空间上连续地选出纤维中的一个点"。单极子丛 $P_n$（$n\neq0$）、Hopf 丛 $S^3\to S^2$ 没有整体截面，所以不平凡。`,
    key: R`右作用在每根纤维上**自由且可迁**，所以一旦选定 $s(p)$，纤维中的每个点都唯一地写成 $s(p)a$：截面提供了"原点"，$a$ 就是坐标。`,
    pitfall: R`对向量丛不能照搬：零截面永远存在，但向量丛未必平凡（Möbius 带）。正确的推广见 \sref{C9.2}。`,
  },
  "C9.2": {
    kind: "corollary", n: "9.2", ch: "ch09", en: "Triviality of vector bundles", zh: "向量丛平凡的判据", page: 392,
    stmt: R`向量丛 $E$ 是平凡的，当且仅当它的相伴主丛 $P(E)$ 容许整体截面。`,
    deps: ["T9.2", "F:assoc9", "9.24", "9.25"], status: "filled",
    statusNote: R`原书以"丛的扭曲完全由转移函数描述"一句带过；本站补出直接论证：$P(E)$ 的整体截面就是整体**标架** $\{e_1(p),\ldots,e_k(p)\}$，用 \eqref{9.24}、\eqref{9.25} 的映射 $V=V^\alpha e_\alpha(p)\mapsto(p,\{V^\alpha\})$ 给出 $E\cong M\times\R^k$；反之平凡化 $M\times\R^k$ 中的标准基给出整体标架。`,
    role: R`把向量丛的平凡性化为"能否找到 $k$ 个处处线性无关的整体截面"。例：$TS^2$ 不平凡（毛球定理：连一个处处非零的向量场都没有）；$S^3$ 的切丛平凡（$\mathrm{SU}(2)$ 的左不变标架）。`,
    key: R`$P(E)$ 的纤维 = $E$ 的纤维中的标架全体，$\mathrm{GL}(k)$ 从右边作用为换基。`,
    pitfall: R`只找到一个处处非零的截面不够（那只说明 $E$ 分出一个平凡线丛）；需要 $k$ 个处处线性无关的截面。`,
  },
};
