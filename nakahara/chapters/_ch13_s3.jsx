// §13.3 非阿贝尔反常 —— 式 (13.36)–(13.57)；交互图 4（AnomalyCancelLab：标准模型的反常相消）
import { Sec, Tx, Eq, Box, Derivation, Stmt, C } from "@kit";
import { AnomalyCancelLab } from "./_ch13_demos.jsx";
import { DN, PD, TR, MR } from "./_ch13_tex.js";

const R = String.raw;
const G5 = R`\gamma^{m+1}`;
const DH = R`\mathrm{i}\hat D`;

export function Sec133() {
  return (
    <Sec n="13.3" title="Non-Abelian anomalies" zh="非阿贝尔反常"
      gist={R`只与正手征 Weyl 费米子耦合的规范场 → 有效作用量 $W_{\boldsymbol r}[\mathcal{A}]$ 在无穷小规范变换下的变化 $=\int v^\alpha\mathcal{D}_\mu\langle j^\mu\rangle_\alpha$（\eqref{13.41}）→ $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+$ 把 $S_+\otimes E$ 映到 $S_-\otimes E$，没有本征值问题，于是引入 $\mathrm{i}\hat D$（\eqref{13.43}）：非 Hermite、本征值不规范不变 → 但 $|\det\mathrm{i}\hat D|$ 规范不变，只有相位 $\mathrm{Im}\,W$ 可能反常（\eqref{13.47}）→ Jacobian 正规化给出 Bardeen 反常 \eqref{13.56}–\eqref{13.57}。`}
      why={R`规范反常与手征反常不同：它破坏的是**定域规范对称性**本身，会毁掉理论的一致性（幺正性、可重整性）。因此物理上可接受的理论必须让所有费米子的规范反常相加为零——这正是标准模型中夸克与轻子超荷的约束来源。`}
      gives={["13.41", "13.43", "13.47", "13.55", "13.56", "13.57"]}>
      <p className="muted">本节概念：<C id="nonabelian_anomaly" /> · <C id="chiral_det" /> · <C id="anomaly_cancel" /></p>
      <Tx>{R`上一节考虑的手征流是规范单态（不带规范指标）。现在研究带规范指标 $\alpha$ 的**规范流** $j^\mu{}_\alpha$。这里考虑**手征理论**：规范场 $\mathcal{A}$ 只与一种手征的 Weyl 费米子 $\psi$ 耦合（下面用投影 $\mathcal{P}_+$ 选出的分量；原书称之为"左手"，这只是约定的叫法）。设 $\psi$ 属于规范群 $G$ 的**复表示** $\boldsymbol{r}$，例如 $\mathrm{SU}(3)$ 的 $\boldsymbol{3}$。有效作用量 $W_{\boldsymbol r}[\mathcal{A}]$ 为`}</Tx>
      <Eq n="13.36" say={R`手征费米子的有效作用量：费米子只通过 $\mathcal{P}_+$ 分量感受规范场。`}>{R`\mathrm{e}^{-W_{\boldsymbol r}[\mathcal{A}]}=\int\mathcal{D}\psi\mathcal{D}\bar\psi\exp\Big(-\int\dd x\,\bar\psi\mathrm{i}${DN}_+\psi\Big)`}</Eq>
      <Tx>{R`其中`}</Tx>
      <Eq n="13.37" say={R`手征 Dirac 算子：协变导数后接正手征投影。`}>{R`\mathrm{i}${DN}_+=\mathrm{i}\gamma^\mu(\partial_\mu+\mathcal{A}_\mu)\mathcal{P}_+\qquad\mathcal{P}_\pm=\tfrac12(1\pm${G5}).`}</Eq>
      <Tx>{R`规范流是`}</Tx>
      <Eq n="13.38" say={R`规范流 = 有效作用量对规范势的变分（期望值意义下），带群指标 $\alpha$。`}>{R`j^\mu{}_\alpha=\mathrm{i}\bar\psi\gamma^\mu T_\alpha\mathcal{P}_+\psi.`}</Eq>
      <Tx>{R`**规范变分与流的散度。**设 $v=v^\alpha T_\alpha$ 是无穷小规范变换参数，$g=1-v$，在此变换下`}</Tx>
      <Eq n="13.39" say={R`无穷小规范变换使规范势改变 $-\mathcal{D}_\mu v$（伴随表示的协变导数）。`}>{R`\mathcal{A}_\mu\to(1+v)(\mathcal{A}_\mu+\dd)(1-v)=\mathcal{A}_\mu-\mathcal{D}_\mu v`}</Eq>
      <Tx>{R`其中 $\mathcal{D}_\mu v\equiv\partial_\mu v+[\mathcal{A}_\mu,v]$ 是伴随表示中场的协变导数（展开到 $v$ 的一阶：$(1+v)(\mathcal{A}-\mathcal{A}v-\dd v)\approx\mathcal{A}+v\mathcal{A}-\mathcal{A}v-\dd v$）。有效作用量的变换为`}</Tx>
      <Eq n="13.40" say={R`有效作用量在规范变换下的一阶变化：分部积分后，变化量正比于"流"$\delta W/\delta\mathcal{A}$ 的协变散度。`}>{R`\begin{aligned}W_r[\mathcal{A}]\to\ &W_r[\mathcal{A}-\mathcal{D}v]\\=\ &W_r[\mathcal{A}]-\int\dd x\ ${TR}\Big(\mathcal{D}v\frac{\delta}{\delta\mathcal{A}}W_r[\mathcal{A}]\Big)\\=\ &W_r[\mathcal{A}]-\int\dd x\ ${TR}(\partial_\mu v^\alpha+f_{\alpha\beta\gamma}A_\mu{}^\beta v^\gamma)\frac{\delta}{\delta A_\mu{}^\alpha}W_r[\mathcal{A}]\\=\ &W_r[\mathcal{A}]+\int\dd x\ ${TR}\Big(v^\alpha\mathcal{D}\frac{\delta}{\delta\mathcal{A}}W_r[\mathcal{A}]_\alpha\Big).\end{aligned}`}</Eq>
      <Tx>{R`由于

$$\frac{\delta}{\delta A_\mu{}^\alpha}W_r[\mathcal{A}]=\big\langle\mathrm{i}\bar\psi\gamma^\mu T_\alpha\tfrac12(1+\gamma^{m+1})\psi\big\rangle_{\mathcal{A}}=\langle j^\mu{}_\alpha\rangle$$

（对 \eqref{13.36} 求变分，$\mathrm{e}^{-W}$ 的对数导数把 $-\int\bar\psi\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+\psi$ 中 $\mathcal{A}$ 的系数拉下来），我们得到`}</Tx>
      <Eq n="13.41" keyEq title="规范变分 = 流的协变散度" say={R`若规范流的协变散度为零（经典情形），有效作用量规范不变；量子论中右边不为零，就是非阿贝尔反常。`}>{R`W_r[\mathcal{A}-\mathcal{D}v]-W_r[\mathcal{A}]=\int\dd x\ ${TR}(v^\alpha\mathcal{D}_\mu\langle j^\mu\rangle_\alpha).`}</Eq>
      <Tx>{R`（\eqref{13.40}、\eqref{13.41} 中的 "$\Tr$" 只是沿用记号：$v^\alpha\mathcal{D}_\mu\langle j^\mu\rangle_\alpha$ 已对 $\alpha$ 求和，是一个数。）

**手征 Dirac 算子没有本征值问题。**我们很想把 \eqref{13.36} 朴素地看成 $\det(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/})=\prod\lambda'_i$，$\lambda_i$ 是 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 的"本征值"。但这里有个微妙之处：$\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+$ 把 $S_+\otimes E$ 的截面映到 $S_-\otimes E$ 的截面，其中 $E$ 是与 $G$ 丛相伴的向量丛，$S_\pm$ 是手征为 $\pm$ 的旋量丛。因此方程 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+\psi=\lambda\psi$ 没有意义（两边住在不同的空间里）。为绕开这一困难，我们形式地引入一个 **Dirac** 旋量 $\psi$，定义`}</Tx>
      <Eq n="13.42" say={R`把 Weyl 费米子形式地补成 Dirac 旋量：负手征分量是自由的"旁观者"，不影响规范变换性质。`}>{R`\mathrm{e}^{-W_r[\mathcal{A}]}=\int\mathcal{D}\psi\mathcal{D}\bar\psi\exp\Big(-\int\dd x\,\bar\psi${DH}\psi\Big)`}</Eq>
      <Tx>{R`其中 $\mathrm{i}\hat D$ 定义为`}</Tx>
      <Eq n="13.43" keyEq title={R`手征 Dirac 算子 $\mathrm{i}\hat D$`} say={R`规范场只与正手征分量耦合的算子：右下块是 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+$，右上块是自由的 $\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_-$。它把旋量空间映到自身，于是本征值问题有意义，但它不是 Hermite 的。`}>{R`${DH}\equiv\mathrm{i}\gamma^\mu(\partial_\mu+\mathcal{A}_\mu\mathcal{P}_+)=\begin{pmatrix}0&\mathrm{i}${PD}_-\\ \mathrm{i}${DN}_+&0\end{pmatrix}`}</Eq>
      <Box kind="warning" title={R`勘误：\eqref{13.43} 中多出的 $\mathrm{i}$（p.529）`}>{R`原书印作 $\mathrm{i}\gamma^\mu(\partial_\mu+\mathrm{i}\mathcal{A}_\mu\mathcal{P}_+)$。本书的 $\mathcal{A}_\mu$ 是反 Hermite 的，协变导数是 $\partial_\mu+\mathcal{A}_\mu$（\eqref{13.37}），而且等号右边的分块矩阵与 \eqref{13.46} 的计算都对应 $\partial_\mu+\mathcal{A}_\mu\mathcal{P}_+$。多出的 $\mathrm{i}$ 是排印错误，本站已删去。`}</Box>
      <Tx>{R`这里把 $\gamma^{m+1}$ 对角化了（上方为正手征，下方为负手征）。在 \eqref{13.43} 中规范场 $\mathcal{A}$ 只与正手征场耦合。现在本征值问题 $\mathrm{i}\hat D\psi_i=\lambda_i\psi_i$ 有了良好定义。注意 $\mathrm{i}\hat D$ **不是 Hermite 的**，$\lambda_i$ 一般是复数。此外，必须分别引入右本征函数与左本征函数：`}</Tx>
      <Eq n="13.44a" say={R`右本征函数。`}>{R`${DH}\psi_i=\lambda_i\psi_i`}</Eq>
      <Eq n="13.44b" say={R`左本征函数：$\chi_i^\dagger$ 从右边被 $\mathrm{i}\hat D$ 作用（箭头表示向左作用），等价于 $(\mathrm{i}\hat D)^\dagger$ 的本征函数，本征值取复共轭。`}>{R`\chi^\dagger{}_i(\mathrm{i}\overleftarrow{\hat D})=\lambda_i\chi^\dagger{}_i\qquad(${DH})^\dagger\chi_i=\bar\lambda_i\chi_i.`}</Eq>
      <Tx>{R`由于 $i\neq j$ 时 $\int\chi_i^\dagger\psi_j\,\dd x=0$（$\lambda_j\int\chi_i^\dagger\psi_j=\int\chi^\dagger_i\mathrm{i}\hat D\psi_j=\lambda_i\int\chi_i^\dagger\psi_j$，本征值不同时只能为零），可以选双正交基`}</Tx>
      <Eq n="13.45" say={R`左、右本征函数的双正交归一化——非 Hermite 算子谱分解的标准做法。`}>{R`\int\chi^\dagger{}_i\psi_j\,\dd x=\delta_{ij}.`}</Eq>
      <Tx>{R`**本征值不规范不变。**应当注意，本征值 $\lambda_i$ **不是**规范不变的。这可以从下式看出：`}</Tx>
      <Eq n="13.46" say={R`把规范变换后的算子"转回去"，多出一项 $-\mathrm{i}(\sym{psl}{\partial\hspace{-0.5em}/}g)g^{-1}\mathcal{P}_-$：负手征那一块不随规范变换协变，所以谱不是规范不变的。`}>{R`\begin{aligned}g(${DH}(\mathcal{A}^g))g^{-1}&=g\mathrm{i}\gamma^\mu[\partial_\mu+g^{-1}(\mathcal{A}_\mu+\partial_\mu)g\mathcal{P}_+]g^{-1}\\&=${DH}(\mathcal{A})-\mathrm{i}(${PD}g)g^{-1}+\mathrm{i}(${PD}g)g^{-1}\mathcal{P}_+\neq${DH}(\mathcal{A}).\end{aligned}`}</Eq>
      <Derivation title={R`\eqref{13.46} 的计算`} collapsed steps={[
        { tex: R`g\,\mathrm{i}\gamma^\mu\partial_\mu\,g^{-1}=\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}+\mathrm{i}\gamma^\mu g(\partial_\mu g^{-1})=\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}-\mathrm{i}(\sym{psl}{\partial\hspace{-0.5em}/}g)g^{-1}`, why: R`作为算子：$\partial_\mu(g^{-1}\psi)=g^{-1}\partial_\mu\psi+(\partial_\mu g^{-1})\psi$，且 $g\partial_\mu g^{-1}=-(\partial_\mu g)g^{-1}$。` },
        { tex: R`g\,\mathcal{A}^g_\mu\,g^{-1}=\mathcal{A}_\mu+(\partial_\mu g)g^{-1},\qquad\mathcal{A}^g_\mu=g^{-1}\mathcal{A}_\mu g+g^{-1}\partial_\mu g`, why: R`$\mathcal{P}_+$ 作用在旋量指标上，与 $g$ 对易。` },
        { tex: R`g(\mathrm{i}\hat D(\mathcal{A}^g))g^{-1}=\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}+\mathrm{i}\gamma^\mu\mathcal{A}_\mu\mathcal{P}_+-\mathrm{i}(\sym{psl}{\partial\hspace{-0.5em}/}g)g^{-1}(1-\mathcal{P}_+)`, why: R`合并两步。最后一项 $=-\mathrm{i}(\sym{psl}{\partial\hspace{-0.5em}/}g)g^{-1}\mathcal{P}_-$，只有 $g$ 为常数时才消失。` },
      ]} />
      <Tx>{R`如果 \eqref{13.46} 中等号成立，那么当 $\mathrm{i}\hat D(\mathcal{A})\psi_i=\lambda_i\psi_i$ 时，$g^{-1}\psi_i$ 将满足 $\mathrm{i}\hat D(\mathcal{A}^g)g^{-1}\psi_i=\lambda_ig^{-1}\psi_i$，于是 $\mathrm{Spec}\,\mathrm{i}\hat D(\mathcal{A})$ 规范不变。

**但行列式的模是规范不变的。**虽然单个本征值不规范不变，$\mathrm{i}\hat D$ 的本征值乘积的绝对值却是规范不变的。事实上，`}</Tx>
      <Eq n="13.47" keyEq title={R`$|\det\mathrm{i}\hat D|$ 规范不变`} say={R`$\mathrm{i}\hat D$ 与其伴随的乘积是分块对角的：一块是自由算子，另一块是 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_-$——与通常的 Dirac 行列式相同，因而规范不变。`}>{R`\begin{aligned}\det(${DH})\det((${DH})^\dagger)&=\det(${DH}(${DH})^\dagger)\\&=\det\begin{pmatrix}(\mathrm{i}${PD}_-)(\mathrm{i}${PD}_+)&0\\ 0&(\mathrm{i}${DN}_+)(\mathrm{i}${DN}_-)\end{pmatrix}\\&=\det(\mathrm{i}${PD}_-\mathrm{i}${PD}_+)\det(\mathrm{i}${DN}_+\mathrm{i}${DN}_-)\end{aligned}`}</Eq>
      <Tx>{R`其中 $\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_+=(\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_-)^\dagger$，$\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_-=(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+)^\dagger$。这（差一个无关的因子 $\det(\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_-\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_+)$）不过是 Dirac 行列式：`}</Tx>
      <Eq n="13.48" say={R`Dirac 行列式的平方是两个手征块的行列式之积；两块的非零谱相同，所以等于 $[\det(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_-)]^2$。`}>{R`[\det(\mathrm{i}${DN})]^2=\det\begin{pmatrix}\mathrm{i}${DN}_-\mathrm{i}${DN}_+&0\\ 0&\mathrm{i}${DN}_+\mathrm{i}${DN}_-\end{pmatrix}=[\det(\mathrm{i}${DN}_+\mathrm{i}${DN}_-)]^2`}</Eq>
      <Tx>{R`其中 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 为`}</Tx>
      <Eq n="13.49" say={R`非手征的 Dirac 算子在手征基下的分块形式。`}>{R`\mathrm{i}${DN}=\begin{pmatrix}0&\mathrm{i}${DN}_-\\ \mathrm{i}${DN}_+&0\end{pmatrix}.`}</Eq>
      <Tx>{R`Dirac 行列式规范不变（$\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}$ 规范协变，谱不变），因此 $|\det(\mathrm{i}\hat D)|$ 也规范不变。由此推出 $\mathrm{Re}\,W_{\boldsymbol r}[\mathcal{A}]$ 规范不变，因为

$$\exp(-W_{\boldsymbol r}[\mathcal{A}])\exp(-\overline{\sym{W}{W_{\boldsymbol r}[\mathcal{A}]}})=\det(\mathrm{i}\hat D)\det((\mathrm{i}\hat D)^\dagger)\propto\det(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_-)$$

是规范不变的。所以，在规范变换下可能获得反常变化的**只有 $W_{\boldsymbol r}[\mathcal{A}]$ 的虚部**，即 $\det(\mathrm{i}\hat D)$ 的**相位**。`}</Tx>
      <Stmt id="F:absdet13" />
      <Tx>{R`**用 Jacobian 计算反常。**反常可以像上一节那样计算 Jacobian 得到。泛函测度取为 $\prod_i\dd a_i\dd\bar b_i$（现在 $\psi=\sum a_i\psi_i$，$\bar\psi=\sum\bar b_i\chi_i^\dagger$）。考虑无穷小规范变换`}</Tx>
      <Eq n="13.50" say={R`只转动正手征部分的无穷小规范变换：$\psi_+=\mathcal{P}_+\psi$ 转，$\bar\psi_-=\bar\psi\mathcal{P}_-$ 反向转。`}>{R`\mathcal{A}\to\mathcal{A}-\mathcal{D}v\qquad\psi\to\psi+v\psi_+\qquad\bar\psi\to\bar\psi-\bar\psi_-v`}</Eq>
      <Tx>{R`这里规范变换只转动正手征部分。与 \eqref{13.21}–\eqref{13.22} 同样的计算（$\psi$ 的转动给出 $\mathcal{P}_+$，$\bar\psi$ 的转动给出 $-\mathcal{P}_-$，合起来是 $\mathcal{P}_+-\mathcal{P}_-=\gamma^{m+1}$）给出 Jacobian 因子`}</Tx>
      <Eq n="13.51" say={R`手征规范变换的 Jacobian：$v$ 加权的 $\gamma^{m+1}$ 之迹，用左右本征函数写出。`}>{R`\int\dd x\ ${TR}\,v(x)\sum_n(n|x\rangle${G5}\langle x|n\rangle`}</Eq>
      <Tx>{R`其中 $\langle x|n\rangle=\psi_n(x)$，$(n|x\rangle=\chi_n^\dagger(x)$（注意 $(n|$ **不是** $|n\rangle$ 的 Hermite 共轭）。这个积分没有良好定义，必须正规化。仍用 Gauss 正规化子：`}</Tx>
      <Eq n="13.52" say={R`Gauss 正规化：插入 $\mathrm{e}^{-(\mathrm{i}\hat D)^2/M^2}$，再用完备性把模求和换成核在对角线上的值。`}>{R`\begin{aligned}&\int\dd x\lim_{\substack{${MR}\to\infty\\ x\to y}}${TR}\,v(x)\sum_n(n|y\rangle${G5}\langle x|\mathrm{e}^{-(${DH})^2/${MR}^2}|n\rangle\\&\qquad=\int\dd x\lim_{\substack{${MR}\to\infty\\ x\to y}}${TR}\,v(x)${G5}\mathrm{e}^{-(\mathrm{i}\hat D_x)^2/${MR}^2}\delta(x-y)\end{aligned}`}</Eq>
      <Tx>{R`这里用了完备性关系`}</Tx>
      <Eq n="13.53" say={R`非 Hermite 算子的完备性：右本征矢与左本征矢配对求和得单位算子。`}>{R`\sum_n|n\rangle(n|=I.`}</Eq>
      <Tx>{R`由 \eqref{13.41} 与 \eqref{13.52} 得`}</Tx>
      <Eq n="13.54" say={R`有效作用量的规范变分 = 正规化的 Jacobian；后者可以直接计算。`}>{R`\int\dd x\,v^\alpha\mathcal{D}_\mu\Big(\frac{\delta}{\delta A_\mu{}^\alpha}W_r[\mathcal{A}]\Big)=\int\dd x\lim_{\substack{${MR}\to\infty\\ x\to y}}${TR}[v${G5}\mathrm{e}^{-(\mathrm{i}\hat D_x)^2/${MR}^2}\delta(x-y)].`}</Eq>
      <Tx>{R`在现在的情形下，$W_r$ 在 \eqref{13.50} 下确实会改变。由 \eqref{13.43}，$(\mathrm{i}\hat D)^2=\mathrm{diag}(\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_-\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+,\ \mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_-)$ 是分块对角的（上块作用于正手征，下块作用于负手征），所以迹可以写成`}</Tx>
      <Eq n="13.55" say={R`把 $\gamma^{m+1}$ 写成 $\mathcal{P}_+-\mathcal{P}_-$：正手征块用 $\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_-\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+$ 作热核，负手征块用 $\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_-$，两块的差就是非阿贝尔反常。`}>{R`\begin{aligned}${TR}[v${G5}\mathrm{e}^{-(\mathrm{i}\hat D_x)^2/${MR}^2}]&=${TR}[v(\mathcal{P}_+-\mathcal{P}_-)\mathrm{e}^{-(\mathrm{i}\hat D_x)^2/${MR}^2}]\\&=${TR}[v\mathcal{P}_+\mathrm{e}^{-(\mathrm{i}${PD}_-\mathrm{i}${DN}_+)/${MR}^2}]-${TR}[v\mathcal{P}_-\mathrm{e}^{-(\mathrm{i}${DN}_+\mathrm{i}${PD}_-)/${MR}^2}].\end{aligned}`}</Eq>
      <Box kind="warning" title={R`勘误：\eqref{13.55} 的指数（p.531）`}>{R`原书第一行把指数写成 $-(\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_-\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+)-(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_-\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_+)/M^2$（丢失了分块结构，$\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_-\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_+$ 也不是 $(\mathrm{i}\hat D)^2$ 的块），第二行写成 $\mathrm{e}^{(\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/})/M^2}$、$\mathrm{e}^{(\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/})/M^2}$（漏了负号与手征下标）。由 \eqref{13.43} 直接平方得 $(\mathrm{i}\hat D)^2=\begin{pmatrix}\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_-\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+&0\\0&\mathrm{i}\sym{Dsl}{\nabla\hspace{-0.667em}/}_+\mathrm{i}\sym{psl}{\partial\hspace{-0.5em}/}_-\end{pmatrix}$，Gauss 截断必须是 $\mathrm{e}^{-(\cdot)/M^2}$ 才收敛。本站按此改正。`}</Box>
      <Tx>{R`\eqref{13.55} 可以在平面波基下计算，直接但冗长（例如见 Gross 与 Jackiw 1972）。下一节我们从拓扑观点推出非阿贝尔反常。对 $m=4$，反常变分为`}</Tx>
      <Eq n="13.56" title="四维非阿贝尔反常（Bardeen 形式）" say={R`有效作用量的反常规范变分：被积式是 $v$ 乘以一个四形式 $\dd(\mathcal{A}\dd\mathcal{A}+\frac12\mathcal{A}^3)$，系数 $\frac1{24\pi^2}$。`}>{R`\begin{aligned}W_r[\mathcal{A}-\mathcal{D}v]-W_r[\mathcal{A}]&=\int\dd x\,v^\alpha\mathcal{D}_\mu\langle j^\mu\rangle_\alpha\\&=\frac1{24\pi^2}\int\dd x\ ${TR}\{v^\alpha T_\alpha\epsilon^{\kappa\lambda\mu\nu}\partial_\kappa[\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu+\tfrac12\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu]\}\\&=\frac1{24\pi^2}\int${TR}\{v\,\dd[\mathcal{A}\dd\mathcal{A}+\tfrac12\mathcal{A}^3]\}.\end{aligned}`}</Eq>
      <Tx>{R`规范流的反常散度为`}</Tx>
      <Eq n="13.57" keyEq title="规范流的反常散度" say={R`手征费米子的规范流不守恒；在欧氏约定下右边是纯虚的（只有 $\mathrm{Im}\,W$ 变化），系数 $\frac1{24\pi^2}$、三次项 $\frac12$。`}>{R`\mathcal{D}_\mu\langle j^\mu\rangle_\alpha=\frac1{24\pi^2}${TR}\{T_\alpha\epsilon^{\kappa\lambda\mu\nu}\partial_\kappa[\mathcal{A}_\lambda\partial_\mu\mathcal{A}_\nu+\tfrac12\mathcal{A}_\lambda\mathcal{A}_\mu\mathcal{A}_\nu]\}.`}</Eq>
      <Tx>{R`这应与 \eqref{13.33} 对比。两者有两处不同：$\mathcal{A}^3$ 前的三分之二换成了二分之一，以及整体因子不同。

**为什么右边只改变 $\mathrm{Im}\,W$？**对反 Hermite 生成元，$\Tr(T_\alpha\{T_\beta,T_\gamma\})$ 是纯虚数（取复共轭等于 $(-1)^3$ 乘自身）。$\Tr\{v\,\dd\mathcal{A}\,\dd\mathcal{A}\}$ 中两个 $\dd\mathcal{A}$ 对称地出现，只挑出 $\Tr(T_\alpha\{T_\beta,T_\gamma\})$，所以 \eqref{13.56} 的主项是纯虚的——与 \sref{F:absdet13} 一致。`}</Tx>
      <Box kind="physics" title={R`反常相消：$d_{\alpha\beta\gamma}$ 之和必须为零`}>{R`\eqref{13.56} 对费米子是**线性可加**的：若理论中有若干个手征费米子，各自属于表示 $\boldsymbol r_k$，总的反常是各自贡献之和，而每个贡献中依赖于表示的部分只有（$\dd\mathcal{A}\dd\mathcal{A}$ 项挑出的）对称迹

$$d_{\alpha\beta\gamma}(\boldsymbol r)=\tfrac12\Tr_{\boldsymbol r}(T_\alpha\{T_\beta,T_\gamma\}).$$

（三次项的系数由 Wess–Zumino 条件与主项捆绑，见 §13.4。）所以**规范反常相消 ⇔ $\sum_k d_{\alpha\beta\gamma}(\boldsymbol r_k)=0$**（相反手征的费米子以负号计入）。实表示与赝实表示的 $d_{\alpha\beta\gamma}=0$，这就是"只有复表示才有反常"的原因。对 $\mathrm{SU}(2)$ 而言所有表示都是（赝）实的，没有微扰反常，但有 Witten 的整体反常：二重态的个数必须是偶数。

标准模型的规范群是 $\mathrm{SU}(3)\times\mathrm{SU}(2)\times\mathrm{U}(1)_Y$，每一代费米子（全部写成左手 Weyl 场）是 $\sym{smQ}{Q}(\boldsymbol3,\boldsymbol2)_{1/6}$、$\sym{smu}{u}^c(\bar{\boldsymbol3},\boldsymbol1)_{-2/3}$、$\sym{smd}{d}^c(\bar{\boldsymbol3},\boldsymbol1)_{1/3}$、$\sym{smL}{L}(\boldsymbol1,\boldsymbol2)_{-1/2}$、$\sym{sme}{e}^c(\boldsymbol1,\boldsymbol1)_{1}$。$d_{\alpha\beta\gamma}$ 的独立分量给出六个条件：$[\mathrm{SU}(3)]^3$、$[\mathrm{SU}(3)]^2\mathrm{U}(1)$、$[\mathrm{SU}(2)]^2\mathrm{U}(1)$、$[\mathrm{U}(1)]^3$，以及（超出本书的）混合引力反常 $\sum Y$ 与 Witten 条件。夸克与轻子**各自都有反常，只有放在一起才相消**——这把电荷量子化与"每代夸克与轻子成套出现"联系了起来。下面的交互图逐项计算这些和，你可以修改超荷看哪一项失效。`}</Box>
      <AnomalyCancelLab />
    </Sec>);
}
