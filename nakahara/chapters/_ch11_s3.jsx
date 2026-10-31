// §11.3 陈特征 —— 式 (11.47)–(11.68)，定理 11.5，例 11.2–11.4，习题 11.2；交互图 1（单极子）、交互图 2（分裂原理）
import { Sec, Sub, Tx, Eq, Box, Stmt, Derivation, Exercise, C } from "@kit";
import { MonopoleLab, SplitLab } from "./_ch11_demos.jsx";

const R = String.raw;

export function Sec113() {
  return (
    <Sec n="11.3" title="Chern characters" zh="陈特征"
      gist={R`$\mathrm{ch}(\mathcal{F})=\Tr\exp(\mathrm{i}\mathcal{F}/2\pi)=\sum_j\mathrm{e}^{x_j}$，$\mathrm{ch}_0=k$、$\mathrm{ch}_1=c_1$、$\mathrm{ch}_2=\frac12(c_1^2-2c_2)$ → 单极子荷 $=\int_{S^2}\mathrm{ch}_1$、瞬子数 $=\int_{S^4}\mathrm{ch}_2$、$\CP^1$ 典范线丛 $\mathrm{Ch}_1=-1$ → $\mathrm{ch}(E\otimes F)=\mathrm{ch}(E)\mathrm{ch}(F)$、$\mathrm{ch}(E\oplus F)=\mathrm{ch}(E)+\mathrm{ch}(F)$ → Todd 类 $\prod\frac{x_j}{1-\mathrm{e}^{-x_j}}=1+\frac12c_1+\frac1{12}(c_1^2+c_2)+\cdots$。`}
      why={R`陈类对 $\oplus$ 相乘，处理张量积却很笨拙；而物理里的场经常处在张量积表示中（如"规范群表示 $\otimes$ 旋量"）。陈特征把 $\oplus$、$\otimes$ 分别变成 $+$、$\times$，是 Atiyah–Singer 指标定理（第 12 章）里出现的那个类。`}
      gives={["11.47", "11.48", "11.50", "11.51c", "11.53", "11.55", "11.60", "11.62a", "11.62b", "11.65", "11.66", "11.67e"]}>
      <p className="muted">本节概念：<C id="chern_character" /> · <C id="todd" /> · <C id="splitting" /></p>

      <Sub n="11.3.1" title="Definitions" zh="定义">
        <Tx>{R`在示性类中，陈特征由于出现在 Atiyah–Singer 指标定理中而特别重要。**全陈特征**（total Chern character）定义为`}</Tx>
        <Eq n="11.47" keyEq title="陈特征" say={R`陈特征：把 $\mathrm{i}\mathcal{F}/2\pi$ 取指数再求迹。指数把"加法"变成"乘法"，这正是它对张量积可乘的原因。`}>{R`\mathrm{ch}(\mathcal{F})\equiv\Tr\exp\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big)=\sum_{j=0}\frac1{j!}\Tr\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big)^j.`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{11.47} 的求和下限（p.451）`}>{R`原书求和从 $j=1$ 开始，漏掉了 $j=0$ 项 $\Tr I=k$。指数级数从 $j=0$ 开始，且下文 \eqref{11.51a} $\mathrm{ch}_0=k$、\eqref{11.52} 中的"1"、\eqref{11.54} 中的"2"都正是这一项。本站已改正。`}</Box>
        <Tx>{R`第 $j$ 个**陈特征** $\mathrm{ch}_j(\mathcal{F})$ 为`}</Tx>
        <Eq n="11.48" say={R`第 $j$ 个陈特征是 $2j$ 形式：$\mathrm{i}\mathcal{F}/2\pi$ 的 $j$ 次幂的迹除以 $j!$。`}>{R`\mathrm{ch}_j(\mathcal{F})\equiv\frac1{j!}\Tr\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big)^j.`}</Eq>
        <Tx>{R`若 $2j>m=\dim M$，$\mathrm{ch}_j(\mathcal{F})$ 为零，所以 $\mathrm{ch}(\mathcal{F})$ 是有限阶的多项式。把 $\mathcal{F}$ 对角化：

$$\frac{\mathrm{i}\mathcal{F}}{2\pi}\to g^{-1}\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big)g=A\equiv\mathrm{diag}(x_1,\ldots,x_k)\qquad g\in\mathrm{GL}(k,\C).$$

全陈特征表示为`}</Tx>
        <Eq n="11.49" say={R`对角化后，指数的迹就是各陈根指数之和：陈特征是"可加"的。`}>{R`\Tr[\exp(A)]=\sum_{j=1}^k\exp(x_j).`}</Eq>
        <Tx>{R`用初等对称函数 $S_r(x_j)$ 表示，全陈特征成为`}</Tx>
        <Eq n="11.50" say={R`把每个指数按幂展开再求和：第 $n$ 阶是幂和 $\sum x_j^n/n!$，再用 Newton 恒等式化为初等对称函数。`}>{R`\sum_{j=1}^k\exp(x_j)=\sum_{j=1}^k\Big(1+x_j+\frac1{2!}x_j^2+\frac1{3!}x_j^3+\cdots\Big)=k+S_1(x_j)+\frac1{2!}[S_1(x_j)^2-2S_2(x_j)]+\cdots.`}</Eq>
        <Tx>{R`于是每个陈特征都可以用陈类表示：`}</Tx>
        <Eq n="11.51a" say={R`零阶陈特征就是纤维维数。`}>{R`\mathrm{ch}_0(\mathcal{F})=k`}</Eq>
        <Eq n="11.51b" say={R`一阶陈特征等于第一陈类。`}>{R`\mathrm{ch}_1(\mathcal{F})=c_1(\mathcal{F})`}</Eq>
        <Eq n="11.51c" title={R`$\mathrm{ch}_2$ 与陈类`} say={R`二阶陈特征：$\frac12\sum x_j^2=\frac12[(\sum x_j)^2-2\sum_{i<j}x_ix_j]$。对 $\mathrm{SU}(n)$ 丛（$c_1=0$）它就是 $-c_2$。`}>{R`\mathrm{ch}_2(\mathcal{F})=\tfrac12[c_1(\mathcal{F})^2-2c_2(\mathcal{F})]`}</Eq>
        <Tx>{R`其中 $k$ 是丛的纤维维数。继续展开可得 $\mathrm{ch}_3=\frac16(c_1^3-3c_1c_2+3c_3)$、$\mathrm{ch}_4=\frac1{24}(c_1^4-4c_1^2c_2+4c_1c_3+2c_2^2-4c_4)$——交互图 2 用 Newton 恒等式符号地算出它们。`}</Tx>

        <Box kind="example" n="11.2" title="单极子与瞬子的拓扑荷">
          <Tx>{R`设 $P$ 是 $S^2$ 上的 $\mathrm{U}(1)$ 丛。若 $\mathcal{A}_{\rm N}$、$\mathcal{A}_{\rm S}$ 是 §10.5 定义的 $U_{\rm N}$、$U_{\rm S}$ 上的局部联络，场强为 $\mathcal{F}_i=\dd\mathcal{A}_i$（$i={\rm N},{\rm S}$）。我们有`}</Tx>
          <Eq n="11.52" say={R`二维球面上任何四形式都为零，所以 U(1) 丛的陈特征只剩两项。`}>{R`\mathrm{ch}(\mathcal{F})=1+\frac{\mathrm{i}\mathcal{F}}{2\pi}`}</Eq>
          <Tx>{R`这里注意到在 $S^2$ 上 $\mathcal{F}^n=0$（$n\ge2$）。这个丛描述磁单极。由 \eqref{10.94} 给出的磁荷 $2g$ 是一个整数，用陈特征表示为`}</Tx>
          <Eq n="11.53" keyEq title="单极子的陈数" say={R`单极子丛的第一陈数：曲率（乘 $\mathrm{i}/2\pi$）在球面上的积分——一个与联络无关的整数，绝对值就是磁荷 $2g$。`}>{R`N=\frac{\mathrm{i}}{2\pi}\int_{S^2}\mathcal{F}=\int_{S^2}\mathrm{ch}_1(\mathcal{F}).`}</Eq>
          <Box kind="warning" title={R`存疑：$N$ 与磁荷 $2g$ 的符号（p.452）`}>{R`原书说"磁荷 $2g$ 用陈特征表示为 $N$"。按 §10.5 的约定 $\mathcal{A}_{\rm N}=\mathrm{i}g(1-\cos\theta)\dd\phi$，有 $\mathcal{F}=\mathrm{i}F=\mathrm{i}g\sin\theta\,\dd\theta\wedge\dd\phi$，于是

$$N=\frac{\mathrm{i}}{2\pi}\int_{S^2}\mathrm{i}g\sin\theta\,\dd\theta\wedge\dd\phi=-\frac{g}{2\pi}\cdot4\pi=-2g.$$

所以 $|N|=2g$，但符号相反：第一陈数 $N=-2g$，而 $\frac1{2\pi}\int F=2g$ 是磁通量除以 $2\pi$。这与例 11.4 一致：$2g=1$ 的单极子丛就是 Hopf 丛，即 $\CP^1$ 上的典范线丛，其 $\mathrm{Ch}_1=-1$。\eqref{11.53} 作为定义式本身无误，本站保留原式，仅在此说明符号。交互图 1 同时显示两个数。`}</Box>
          <MonopoleLab />
          <Tx>{R`设 $P$ 是 $S^4$ 上的 $\mathrm{SU}(2)$ 丛。$P$ 的全陈类由 \eqref{11.27} 给出。全陈特征为`}</Tx>
          <Eq n="11.54" say={R`$\mathrm{SU}(2)$ 丛的陈特征：零阶是纤维维数 2，一阶因无迹为零，二阶是场强平方的迹。`}>{R`\mathrm{ch}(\mathcal{F})=2+\Tr\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big)+\frac12\Tr\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big)^2.`}</Eq>
          <Tx>{R`由于 $n\ge3$ 时 $\mathcal{F}^n=0$（$S^4$ 上没有 6 形式），$\mathrm{ch}(\mathcal{F})$ 终止于 $\mathrm{ch}_2(\mathcal{F})$。此外，$G=\mathrm{SU}(2)$ 时 $\Tr\mathcal{F}=0$，所以一阶项为零。正如 §10.5 所见，瞬子数由下式给出：`}</Tx>
          <Eq n="11.55" keyEq title="瞬子数" say={R`瞬子数是二阶陈特征在 $S^4$ 上的积分（对 $\mathrm{SU}(2)$ 它等于 $-\int c_2$）。`}>{R`\frac12\int_{S^4}\Tr\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big)^2=\int_{S^4}\mathrm{ch}_2(\mathcal{F}).`}</Eq>
          <Tx>{R`两种情形中，$\mathrm{ch}_j$ 都测量局部片段粘合时丛被拧了多少。（由 \eqref{11.51c} 与 $c_1=0$，$\mathrm{SU}(2)$ 丛的 $\mathrm{ch}_2=-c_2$；与 \sref{T10.7} 比较：瞬子数 $n=\int\mathrm{ch}_2=-\int c_2$。）`}</Tx>
        </Box>

        <Box kind="example" n="11.3" title={R`$2m$ 维流形上 U(1) 丛的第 $m$ 陈特征`}>
          <Tx>{R`设 $P$ 是 $2m$ 维流形 $M$ 上的 $\mathrm{U}(1)$ 丛。第 $m$ 个陈特征为

$$\begin{aligned}\frac1{m!}\Tr\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big)^m&=\frac1{m!}\Big(\frac{\mathrm{i}}{2\pi}\Big)^m\Big[\frac12\mathcal{F}_{\mu\nu}\dd x^\mu\wedge\dd x^\nu\Big]^m\\&=\frac1{m!}\Big(\frac{\mathrm{i}}{4\pi}\Big)^m\mathcal{F}_{\mu_1\nu_1}\cdots\mathcal{F}_{\mu_m\nu_m}\dd x^{\mu_1}\wedge\dd x^{\nu_1}\wedge\ldots\wedge\dd x^{\mu_m}\wedge\dd x^{\nu_m}\\&=\frac1{m!}\Big(\frac{\mathrm{i}}{4\pi}\Big)^m\epsilon^{\mu_1\nu_1\ldots\mu_m\nu_m}\mathcal{F}_{\mu_1\nu_1}\cdots\mathcal{F}_{\mu_m\nu_m}\dd x^1\wedge\ldots\wedge\dd x^{2m}\end{aligned}$$

它描述 $2m$ 维空间中的 U(1) 反常（见第 13 章）。（最后一步：$\dd x^{\mu_1}\wedge\ldots\wedge\dd x^{\nu_m}=\epsilon^{\mu_1\nu_1\ldots\mu_m\nu_m}\dd x^1\wedge\ldots\wedge\dd x^{2m}$。）`}</Tx>
          <Box kind="warning" title={R`勘误：例 11.3 末行漏了 $1/m!$（p.453）`}>{R`原书最后一行印作 $\big(\frac{\mathrm{i}}{4\pi}\big)^m\epsilon^{\mu_1\nu_1\ldots}\mathcal{F}\cdots\mathcal{F}\,\dd x^1\wedge\ldots\wedge\dd x^{2m}$，丢了前一行的因子 $\frac1{m!}$——把 $\dd x$ 的外积换成 $\epsilon$ 符号只是重写，不会产生 $m!$。检验 $m=1$：$\mathrm{ch}_1=\frac{\mathrm{i}}{2\pi}\mathcal{F}_{12}\dd x^1\wedge\dd x^2$，而 $\frac{\mathrm{i}}{4\pi}\epsilon^{\mu\nu}\mathcal{F}_{\mu\nu}=\frac{\mathrm{i}}{2\pi}\mathcal{F}_{12}$，一致；$m=2$ 时缺少的 $\frac12$ 就是瞬子数公式 \eqref{11.55} 中的那个 $\frac12$。本站已改正。`}</Box>
        </Box>

        <Box kind="example" n="11.4" title={R`线丛；$\CP^1$ 上的典范线丛`}>
          <Tx>{R`设 $L$ 是复线丛。于是`}</Tx>
          <Eq n="11.56" say={R`线丛的曲率是 $1\times1$ 矩阵，陈特征就是 $\mathrm{e}^x$；在二维底空间上 $x^2=0$，只剩 $1+x$。`}>{R`\mathrm{ch}(L)=\Tr\exp\Big(\frac{\mathrm{i}\mathcal{F}}{2\pi}\Big)=\mathrm{e}^x=1+x\qquad x\equiv\frac{\mathrm{i}\mathcal{F}}{2\pi}.`}</Eq>
          <Tx>{R`（最后一个等号在 $\dim M=2$ 时成立。）例如，设 $L\xrightarrow{\pi}\CP^1$ 是 $\CP^1=S^2$ 上的典范线丛。Fubini–Study 度规给出曲率（例 8.8）`}</Tx>
          <Eq n="11.57" say={R`Fubini–Study 度规诱导的典范线丛曲率：$\ln(1+|z|^2)$ 的 $\partial\bar\partial$。`}>{R`\mathcal{F}=-\partial\bar\partial\ln(1+|z|^2)=-\frac{\dd z\wedge\dd\bar z}{(1+z\bar z)^2}`}</Eq>
          <Tx>{R`在实坐标 $z=x+\mathrm{i}y=r\exp(\mathrm{i}\theta)$ 中，`}</Tx>
          <Eq n="11.58" say={R`换成实坐标：$\dd z\wedge\dd\bar z=-2\mathrm{i}\,\dd x\wedge\dd y$，曲率是纯虚的面积形式，在原点最大、向无穷远按 $r^{-4}$ 衰减。`}>{R`\mathcal{F}=2\mathrm{i}\frac{\dd x\wedge\dd y}{(1+x^2+y^2)^2}=2\mathrm{i}\frac{r\,\dd r\wedge\dd\theta}{(1+r^2)^2}.`}</Eq>
          <Tx>{R`由 $\mathrm{ch}(\mathcal{F})=1+\Tr(\mathrm{i}\mathcal{F}/2\pi)$ 得`}</Tx>
          <Eq n="11.59" say={R`第一陈特征是一个处处为负的面积形式。`}>{R`\mathrm{ch}_1(\mathcal{F})=-\frac1\pi\frac{r\,\dd r\wedge\dd\theta}{(1+r^2)^2}.`}</Eq>
          <Tx>{R`$\mathrm{Ch}_1(L)$，即 $\mathrm{ch}_1(\mathcal{F})$ 在 $S^2$ 上的积分，是一个整数：`}</Tx>
          <Eq n="11.60" title={R`典范线丛 $\mathrm{Ch}_1=-1$`} say={R`对整个复平面积分（加上无穷远一点就是整个球面），得到 $-1$：典范线丛是"最基本的扭曲线丛"。`}>{R`\mathrm{Ch}_1(L)=-\frac1\pi\int\frac{r\,\dd r\,\dd\theta}{(1+r^2)^2}=-\int_1^\infty t^{-2}\,\dd t=-1.`}</Eq>
          <Derivation title="例 11.4 的计算细节（补充）" collapsed steps={[
            { tex: R`\bar\partial\ln(1+z\bar z)=\frac{z\,\dd\bar z}{1+z\bar z},\qquad\partial\Big(\frac{z\,\dd\bar z}{1+z\bar z}\Big)=\Big[\frac1{1+z\bar z}-\frac{z\bar z}{(1+z\bar z)^2}\Big]\dd z\wedge\dd\bar z=\frac{\dd z\wedge\dd\bar z}{(1+z\bar z)^2}`, why: R`所以 $\mathcal{F}=-\partial\bar\partial\ln(1+|z|^2)=-\dd z\wedge\dd\bar z/(1+|z|^2)^2$，即 \eqref{11.57}。` },
            { tex: R`\dd z\wedge\dd\bar z=(\dd x+\mathrm{i}\dd y)\wedge(\dd x-\mathrm{i}\dd y)=-2\mathrm{i}\,\dd x\wedge\dd y,\qquad\dd x\wedge\dd y=r\,\dd r\wedge\dd\theta`, why: R`得 \eqref{11.58}。` },
            { tex: R`\frac{\mathrm{i}}{2\pi}\cdot2\mathrm{i}\frac{r\,\dd r\wedge\dd\theta}{(1+r^2)^2}=-\frac1\pi\frac{r\,\dd r\wedge\dd\theta}{(1+r^2)^2}`, why: R`得 \eqref{11.59}。` },
            { tex: R`\int_0^{2\pi}\dd\theta\int_0^\infty\frac{r\,\dd r}{(1+r^2)^2}=2\pi\cdot\frac12\int_1^\infty t^{-2}\dd t=\pi`, why: R`令 $t=1+r^2$，$r\,\dd r=\dd t/2$。乘以 $-\frac1\pi$ 得 $-1$。整个复平面在 $\CP^1$ 中只差一点（无穷远点，测度为零）。` },
          ]} />
          <Box kind="physics" title="与单极子的对应">{R`典范线丛的转移函数是 $z^0/z^1$ 型的比值，限制到赤道上是 $\mathrm{e}^{\pm\mathrm{i}\phi}$——它就是第 9 章的 Hopf 丛（$n=1$ 的单极子丛）的相伴线丛。所以 $\mathrm{Ch}_1=-1$ 与交互图 1 中 $2g=1$ 时 $c_1=-1$ 是同一个结果的两种计算。`}</Box>
        </Box>
      </Sub>

      <Sub n="11.3.2" title="Properties of the Chern characters" zh="陈特征的性质">
        <Stmt id="T11.5" />
        <Eq n="11.61" say={R`陈特征与拉回交换。`}>{R`\mathrm{ch}(f^*E)=f^*\mathrm{ch}(E).`}</Eq>
        <Eq n="11.62a" title="张量积可乘" say={R`张量积丛的陈特征是两个陈特征之积：指数把"曲率相加"变成"指数相乘"。`}>{R`\mathrm{ch}(E\otimes F)=\mathrm{ch}(E)\wedge\mathrm{ch}(F)`}</Eq>
        <Eq n="11.62b" title="直和可加" say={R`直和丛的陈特征是两个陈特征之和：迹对分块对角矩阵相加。`}>{R`\mathrm{ch}(E\oplus F)=\mathrm{ch}(E)+\mathrm{ch}(F).`}</Eq>
        <Tx>{R`（原书把 \eqref{11.62b} 右边写作 $\mathrm{ch}(E)\oplus\mathrm{ch}(F)$，意为 $H^*(M)$ 中的和。）

**证明。**(a) 由\sref{T11.2}(b) 得到（原书误写为 11.2(a)）。(b) 这些结果直接来自 ch 多项式的定义。设

$$\mathrm{ch}(A)=\sum_j\frac1{j!}\Tr\Big(\frac{\mathrm{i}A}{2\pi}\Big)^j$$

是矩阵 $A$ 的多项式。设 $A$ 是 $B$ 与 $C$ 的张量积，$A=B\otimes C=B\otimes I+I\otimes C$（注意 $\mathcal{F}_{E\otimes F}=\mathcal{F}_E\otimes I+I\otimes\mathcal{F}_F$）。由于 $B\otimes I$ 与 $I\otimes C$ 可交换，二项式定理适用，且 $\Tr(B^m\otimes C^{j-m})=\Tr B^m\Tr C^{j-m}$，于是

$$\begin{aligned}\mathrm{ch}(B\otimes C)&=\sum_j\frac1{j!}\Big(\frac{\mathrm{i}}{2\pi}\Big)^j\Tr(B\otimes I+I\otimes C)^j=\sum_j\frac1{j!}\Big(\frac{\mathrm{i}}{2\pi}\Big)^j\sum_{m=0}^j\binom jm\Tr(B^m)\Tr(C^{j-m})\\&=\sum_m\frac1{m!}\Tr\Big(\frac{\mathrm{i}B}{2\pi}\Big)^m\sum_n\frac1{n!}\Tr\Big(\frac{\mathrm{i}C}{2\pi}\Big)^n=\mathrm{ch}(B)\mathrm{ch}(C).\end{aligned}$$

把 $B$ 换成 $\mathcal{F}_E$、$C$ 换成 $\mathcal{F}_F$，\eqref{11.62a} 得证。（"$A=B\otimes C$"是原书的记法，实际含义是 $A$ 为张量积丛的曲率 $B\otimes I+I\otimes C$。）

若 $A$ 是分块对角的，$A=\begin{pmatrix}B&0\\0&C\end{pmatrix}=B\oplus C$，则

$$\mathrm{ch}(B\oplus C)=\sum\frac1{j!}\Big(\frac{\mathrm{i}}{2\pi}\Big)^j\Tr(B\oplus C)^j=\sum\frac1{j!}\Big(\frac{\mathrm{i}}{2\pi}\Big)^j[\Tr(B^j)+\Tr(C^j)]=\mathrm{ch}(B)+\mathrm{ch}(C).$$

把 $A$、$B$、$C$ 分别换成 $\mathcal{F}_{E\oplus F}$、$\mathcal{F}_E$、$\mathcal{F}_F$，这个关系仍成立。∎`}</Tx>
        <Box kind="warning" title="勘误：定理 11.5 证明中的三处笔误（p.454）">{R`(1) 二项展开的求和原书印作 $\sum_{m=1}^j$，应从 $m=0$ 开始（否则漏掉 $\Tr C^j$ 项，结果就不是 $\mathrm{ch}(B)\mathrm{ch}(C)$）；(2) 直和计算第二行原书印作 $(\frac{1}{2\pi})^j$，应为 $(\frac{\mathrm{i}}{2\pi})^j$；(3) "(a) 由定理 11.2(a)"应为 11.2(b)。本站已改正。`}</Box>
        <Tx>{R`**分裂原理在这里怎样工作。**设 $L_j$（$1\le j\le k$）是复线丛。由 \eqref{11.62b}，对 $E=L_1\oplus L_2\oplus\cdots\oplus L_k$ 有`}</Tx>
        <Eq n="11.63" say={R`线丛之和的陈特征是各线丛陈特征之和。`}>{R`\mathrm{ch}(E)=\mathrm{ch}(L_1)+\mathrm{ch}(L_2)+\cdots+\mathrm{ch}(L_k).`}</Eq>
        <Tx>{R`由于 $\mathrm{ch}(L_i)=\exp(x_i)$，得到`}</Tx>
        <Eq n="11.64" say={R`于是陈特征就是陈根指数之和，与 \eqref{11.49}–\eqref{11.50} 一致。`}>{R`\mathrm{ch}(E)=\sum_{j=1}^k\exp(x_j)`}</Eq>
        <Box kind="warning" title={R`勘误：\eqref{11.64} 应为求和（p.455）`}>{R`原书印作 $\mathrm{ch}(E)=\prod_{j=1}^k\exp(x_j)$。由 \eqref{11.63}（直和可加），应为 $\sum_j\exp(x_j)$；原书紧接着说"这就是 \eqref{11.50}"，而 \eqref{11.50} 正是求和。乘积 $\prod\exp(x_j)=\exp(c_1)$ 是另一个东西（行列式线丛 $\det E$ 的陈特征）。\eqref{11.63} 中原书的 $\oplus$ 也按 $H^*(M)$ 中的加法写成了 $+$。本站已改正。`}</Box>
        <Tx>{R`这就是 \eqref{11.50}。因此一般向量丛 $E$ 的陈特征由 $k$ 个复线丛的 Whitney 和的陈特征给出。作为具体微分形式的示性类本身依赖于联络，并不能区分同一底空间上纤维维数相同的两个向量丛；重要的是它们的上同调类，尤其是它们在底空间上的*积分*。`}</Tx>
      </Sub>

      <Sub n="11.3.3" title="Todd classes" zh="Todd 类">
        <Tx>{R`与复向量丛相关的另一个有用的示性类是 **Todd 类**，定义为`}</Tx>
        <Eq n="11.65" title="Todd 类" say={R`Todd 类：对每个陈根取 $x/(1-\mathrm{e}^{-x})$ 再连乘；它是乘性的，出现在 Riemann–Roch–Hirzebruch 定理与 Dolbeault 指标定理中。`}>{R`\mathrm{Td}(\mathcal{F})=\prod_j\frac{x_j}{1-\mathrm{e}^{-x_j}}`}</Eq>
        <Tx>{R`这里默认使用分裂原理。按 $x_j$ 的幂展开，$\mathrm{Td}(\mathcal{F})$ 成为`}</Tx>
        <Eq n="11.66" say={R`把每个因子按 Bernoulli 数展开，再连乘并用陈类改写：一阶是 $\frac12c_1$，二阶是 $\frac1{12}(c_1^2+c_2)$。`}>{R`\begin{aligned}\mathrm{Td}(\mathcal{F})&=\prod_j\Big(1+\frac12x_j+\sum_{k\ge1}(-1)^{k-1}\frac{B_k}{(2k)!}x_j^{2k}\Big)\\&=1+\frac12\sum_jx_j+\frac1{12}\sum_jx_j^2+\frac14\sum_{j<k}x_jx_k+\cdots\\&=1+\frac12c_1(\mathcal{F})+\frac1{12}[c_1(\mathcal{F})^2+c_2(\mathcal{F})]+\cdots\end{aligned}`}</Eq>
        <Tx>{R`其中 $B_k$ 是 **Bernoulli 数**

$$B_1=\frac16\qquad B_2=\frac1{30}\qquad B_3=\frac1{42}\qquad B_4=\frac1{30}\qquad B_5=\frac5{66}\qquad\ldots.$$

（这是旧约定，$B_k$ 全取正值；现代约定下它们是 $|B_{2k}|$。验证二阶项：$\frac1{12}\sum x_j^2+\frac14\sum_{j<k}x_jx_k=\frac1{12}(c_1^2-2c_2)+\frac14c_2=\frac1{12}(c_1^2+c_2)$。）\eqref{11.66} 的前几项为`}</Tx>
        <Eq n="11.67a" say={R`零阶 Todd 类是 1。`}>{R`\mathrm{Td}_0(\mathcal{F})=1`}</Eq>
        <Eq n="11.67b" say={R`一阶 Todd 类是第一陈类的一半。`}>{R`\mathrm{Td}_1(\mathcal{F})=\tfrac12c_1`}</Eq>
        <Eq n="11.67c" say={R`二阶 Todd 类：复曲面上 $\int\mathrm{Td}_2=\frac1{12}\int(c_1^2+c_2)$ 是 Noether 公式中的全纯 Euler 示性数。`}>{R`\mathrm{Td}_2(\mathcal{F})=\tfrac1{12}(c_1^2+c_2)`}</Eq>
        <Eq n="11.67d" say={R`三阶 Todd 类只有一项。`}>{R`\mathrm{Td}_3(\mathcal{F})=\tfrac1{24}c_1c_2`}</Eq>
        <Eq n="11.67e" title={R`$\mathrm{Td}_4$`} say={R`四阶 Todd 类：五个单项式，公分母 720。交互图 2 由分裂原理符号地复现了它。`}>{R`\mathrm{Td}_4(\mathcal{F})=\tfrac1{720}(-c_1^4+4c_1^2c_2+3c_2^2+c_1c_3-c_4)`}</Eq>
        <Eq n="11.67f" say={R`五阶 Todd 类：四个单项式，公分母 1440。`}>{R`\mathrm{Td}_5(\mathcal{F})=\tfrac1{1440}(-c_1^3c_2+3c_1c_2^2+c_1^2c_3-c_1c_4)`}</Eq>
        <Tx>{R`其中 $c_i$ 代表 $c_i(\mathcal{F})$。`}</Tx>
        <SplitLab />
        <Exercise n="11.2" title="Todd 类是乘性的" level="★"
          hint={R`对 $E$、$F$ 各自用分裂原理；$E\oplus F$ 的陈根是两组陈根的并。`}
          solution={R`设 $E$ 的陈根为 $x_1,\ldots,x_k$，$F$ 的陈根为 $y_1,\ldots,y_l$。$E\oplus F$ 的曲率可取为分块对角 $\mathrm{diag}(\mathcal{F}_E,\mathcal{F}_F)$（\sref{T11.3} 的证明），对角化后本征值为 $x_1,\ldots,x_k,y_1,\ldots,y_l$。由定义 \eqref{11.65}，

$$\mathrm{Td}(E\oplus F)=\prod_{i=1}^k\frac{x_i}{1-\mathrm{e}^{-x_i}}\prod_{a=1}^l\frac{y_a}{1-\mathrm{e}^{-y_a}}=\mathrm{Td}(E)\wedge\mathrm{Td}(F).$$

用陈类表达时这等价于一族恒等式，例如一阶：$\frac12c_1(E\oplus F)=\frac12[c_1(E)+c_1(F)]$（由 \eqref{11.33}，$c_1(E\oplus F)=c_1(E)+c_1(F)$）；二阶：$\frac1{12}[(c_1(E)+c_1(F))^2+c_2(E)+c_1(E)c_1(F)+c_2(F)]=\mathrm{Td}_2(E)+\mathrm{Td}_1(E)\mathrm{Td}_1(F)+\mathrm{Td}_2(F)$，两边展开都是 $\frac1{12}(c_1(E)^2+c_2(E))+\frac14c_1(E)c_1(F)+\frac1{12}(c_1(F)^2+c_2(F))$。一般地，凡由 $\prod_if(x_i)$ 定义的类（"乘性序列"）对 Whitney 和都是乘性的——$c$、$\mathrm{Td}$、$L$、$\hat A$ 都如此。`}>
          {R`设 $E$、$F$ 是 $M$ 上的复向量丛。证明 $\mathrm{Td}(E\oplus F)=\mathrm{Td}(E)\wedge\mathrm{Td}(F)$（\eqref{11.68}）。`}
        </Exercise>
        <Eq n="11.68" say={R`Todd 类对 Whitney 和是乘性的：陈根合并，连乘拆开。`}>{R`\mathrm{Td}(E\oplus F)=\mathrm{Td}(E)\wedge\mathrm{Td}(F).`}</Eq>
      </Sub>
    </Sec>);
}
