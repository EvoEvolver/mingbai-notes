// 补充材料 N_III：任意形状势阱或势垒中粒子的非束缚态（式 NIII-1 … NIII-38）
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import { TransferPlot } from "./_ch03d_plots.jsx";
import { ScatterFig } from "./_ch03d_figs.jsx";

const R = String.raw;
const AT = R`\tilde A`, ATP = R`\tilde A'`;
const EPS = R`\sym{epsN}{\varepsilon}`;

export function SecN() {
  return (
    <Sec n="NIII" title="Unbound states of a particle in the presence of a potential well or barrier of arbitrary shape" zh="任意形状势阱或势垒中粒子的非束缚态"
      gist={R`对任意有限力程的势，正能量定态在势的左右两侧都是平面波，两侧系数由一个 $2\times2$ 传递矩阵 $M(k)$ 联系。势是实的 ⇒ $M=\begin{pmatrix}F&G^*\\G&F^*\end{pmatrix}$；概率流守恒 ⇒ $\det M=|F|^2-|G|^2=1$。由此 $T=1/|F|^2$、$R=|G/F|^2$，且左入射与右入射的透射系数相同；出射–入射振幅之间的 $S$ 矩阵是幺正的。`}
      why={R`\Ic{HI} 对几种方势逐个计算过反射与透射。这里不假设势的形状，只用"势是实的"和"流守恒"两条，就得到一批普遍结论；传递矩阵也是下一个补充材料（周期势）的计算工具。`}
      gives={["NIII-8", "NIII-14", "NIII-18", "NIII-21", "NIII-26", "NIII-29b", "NIII-32"]}>
      <p className="muted">本节概念：<C id="transfer_matrix" /> · <C id="reciprocity" /> · <C id="s_matrix" /></p>
      <Tx>{R`**先澄清一个疑虑。**$\mathrm M_{\rm III}$ 只承认负能量的束缚态（能量零点取在无穷远处，且需要吸引势），正能量的本征函数 $\varphi_k(x)$ 因为在无穷远处像 $\mathrm e^{\pm ikx}$ 那样不衰减而被丢掉了。那么本节为什么又专门研究它们？因为它们是**积木**：单独一个不能归一，叠加成波包就可以（第 I 章），而且叠加之后的时间演化——传播、变形、在势上分裂成反射与透射两部分——可以直接从每块积木的性质读出来。\Ic{JI} 正是这样用方势的 $\varphi_k$ 得到了反射、透射系数和反射延迟。（负能量但不属于分立谱的解在无穷远处指数发散，任何叠加都救不回来，所以不必考虑。）

**这里的目标。**仍只讨论一维。对 $V(x)$ 的形状不作任何假设——可以有一个或几个势垒、势阱……——只要求它在有限区间 $[x_1,x_2]$ 之外为零。我们将看到，无论什么形状，势对 $\varphi_k$ 的全部影响都可以浓缩为一个 $2\times2$ 矩阵 $M(k)$，它具有若干普遍性质；由此得到与势的形状无关的结论。例如：一个势垒（无论对称与否）对同能量的粒子，从左边来和从右边来的反射、透射系数都相同。`}</Tx>

      <Sub n="NIII-1" title={R`Transmission matrix $M(k)$`} zh={R`传递矩阵 $M(k)$`}>
        <h4 id="sec-NIII-1-a">1-a 定义</h4>
        <Tx>{R`把原点放在区间 $[x_1,x_2]$ 的中点，区间长 $l$，于是 $V(x)$ 只在 $|x|<l/2$ 内变化。能量为 $E$ 的定态满足`}</Tx>
        <ScatterFig />
        <Eq n="NIII-1" say={R`能量为 $E$ 的定态方程，写成二阶导数加一项等于零的形式。`}>{R`\Big\{\frac{\mathrm d^2}{\mathrm dx^2}+\frac{2m}{\hbar^2}[E-V(x)]\Big\}\varphi(x)=0`}</Eq>
        <Tx>{R`本补充材料一律用参数`}</Tx>
        <Eq n="NIII-2" say={R`用势外的波数 $k$ 代替能量作参数。`}>{R`k=\sqrt{\frac{2mE}{\hbar^2}}`}</Eq>
        <Tx>{R`来标记能量。**两个"标准解"。**在 $x<-l/2$，$\mathrm e^{ikx}$ 满足方程。令 $v_k(x)$ 为在 $x<-l/2$ 时恒等于 $\mathrm e^{ikx}$ 的那个解；穿过势之后，在 $x>+l/2$ 它必然是两个独立解 $\mathrm e^{ikx}$、$\mathrm e^{-ikx}$ 的线性组合：`}</Tx>
        <Eq n="NIII-3a" say={R`标准解 $v_k$ 在势的左边是纯粹的 $\mathrm e^{ikx}$。`}>{R`\text{若}\ x<-\frac l2:\qquad v_k(x)=\mathrm e^{ikx}`}</Eq>
        <Eq n="NIII-3b" say={R`穿过势之后它变成两列平面波的组合，系数 $F(k)$、$G(k)$ 记录了势的全部影响。`}>{R`\text{若}\ x>+\frac l2:\qquad v_k(x)=F(k)\,\mathrm e^{ikx}+G(k)\,\mathrm e^{-ikx}`}</Eq>
        <Tx>{R`$F(k)$、$G(k)$ 依赖于 $k$ 和势的形状。同样引入在 $x<-l/2$ 时等于 $\mathrm e^{-ikx}$ 的解 $v_k'(x)$：`}</Tx>
        <Eq n="NIII-4a" say={R`另一个标准解 $v_k'$ 在势的左边是纯粹的 $\mathrm e^{-ikx}$。`}>{R`\text{若}\ x<-\frac l2:\qquad v_k'(x)=\mathrm e^{-ikx}`}</Eq>
        <Eq n="NIII-4b" say={R`它在势的右边同样是两列平面波的组合，系数为 $F'(k)$、$G'(k)$。`}>{R`\text{若}\ x>+\frac l2:\qquad v_k'(x)=F'(k)\,\mathrm e^{ikx}+G'(k)\,\mathrm e^{-ikx}`}</Eq>
        <Tx>{R`对给定的 $E$（即 $k$），\eqref{NIII-1} 的通解是 $v_k$ 与 $v_k'$ 的线性组合：`}</Tx>
        <Eq n="NIII-5" say={R`能量为 $E$ 的一般定态是两个标准解的叠加。`}>{R`\varphi_k(x)=A\,v_k(x)+A'\,v_k'(x)`}</Eq>
        <Tx>{R`由 \eqref{NIII-3a}、\eqref{NIII-4a}，在左边`}</Tx>
        <Eq n="NIII-6a" say={R`势的左侧：系数 $A$、$A'$ 分别是向右、向左传播的平面波振幅。`}>{R`\text{若}\ x<-\frac l2:\qquad\varphi_k(x)=A\,\mathrm e^{ikx}+A'\,\mathrm e^{-ikx}`}</Eq>
        <Tx>{R`由 \eqref{NIII-3b}、\eqref{NIII-4b}，在右边`}</Tx>
        <Eq n="NIII-6b" say={R`势的右侧：系数 $\tilde A$、$\tilde A'$ 是右侧向右、向左传播的平面波振幅。`}>{R`\text{若}\ x>+\frac l2:\qquad\varphi_k(x)=${AT}\,\mathrm e^{ikx}+${ATP}\,\mathrm e^{-ikx}`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="NIII-7" say={R`右侧系数是左侧系数的线性组合。`}>{R`\begin{aligned}${AT}&=F(k)\,A+F'(k)\,A'\\${ATP}&=G(k)\,A+G'(k)\,A'\end{aligned}`}</Eq>
        <Tx>{R`按定义，**传递矩阵**（transmission matrix）是`}</Tx>
        <Eq n="NIII-8" keyEq title="传递矩阵" say={R`传递矩阵把势左侧的两列平面波振幅变换为右侧的两列振幅；它的列就是两个标准解在右侧的系数。`}>{R`M(k)=\begin{pmatrix}F(k)&F'(k)\\G(k)&G'(k)\end{pmatrix}`}</Eq>
        <Tx>{R`\eqref{NIII-7} 于是写成矩阵形式：`}</Tx>
        <Eq n="NIII-9" say={R`已知左边的振幅，乘上 $M(k)$ 就得到右边的振幅。`}>{R`\begin{pmatrix}${AT}\\${ATP}\end{pmatrix}=M(k)\begin{pmatrix}A\\A'\end{pmatrix}`}</Eq>
        <Tx>{R`有了 $M(k)$，给定波函数在势左边的行为 \eqref{NIII-6a}，就能写出它在右边的行为 \eqref{NIII-6b}。

**评注：定态的概率流处处相等。**与波函数 $\varphi(x)$ 相联系的概率流是`}</Tx>
        <Eq n="NIII-10" say={R`一维概率流：由波函数及其导数构成，衡量单位时间流过某点的概率。`}>{R`J(x)=\frac{\hbar}{2mi}\Big[\varphi^*(x)\frac{\mathrm d\varphi}{\mathrm dx}-\varphi(x)\frac{\mathrm d\varphi^*}{\mathrm dx}\Big]`}</Eq>
        <Tx>{R`求导时交叉项 $\varphi^{*\prime}\varphi'$ 相互抵消：`}</Tx>
        <Eq n="NIII-11" say={R`概率流的导数只剩二阶导数项。`}>{R`\frac{\mathrm d}{\mathrm dx}J(x)=\frac{\hbar}{2mi}\Big[\varphi^*(x)\frac{\mathrm d^2\varphi}{\mathrm dx^2}-\varphi(x)\frac{\mathrm d^2\varphi^*}{\mathrm dx^2}\Big]`}</Eq>
        <Tx>{R`用 \eqref{NIII-1} 把二阶导数换成 $-\frac{2m}{\hbar^2}(E-V)\varphi$（$V$ 为实数，对 $\varphi^*$ 同样成立），括号里两项正好相消：`}</Tx>
        <Eq n="NIII-12" say={R`定态的概率流不随位置变化。`}>{R`\frac{\mathrm d}{\mathrm dx}J(x)=0`}</Eq>
        <Tx>{R`所以定态的流在整条 $x$ 轴上相同。\eqref{NIII-12} 正是正文 \mainref{D-11} 所给的三维定态关系`}</Tx>
        <Eq n="NIII-13" say={R`三维定态的概率流无源无汇：散度为零。`}>{R`\operatorname{div}\mathbf J(\mathbf r)=0`}</Eq>
        <Tx>{R`的一维版本。因此 $\varphi_k$ 的流可以在任意 $x$ 处计算——用左边的形式 \eqref{NIII-6a} 或右边的形式 \eqref{NIII-6b} 都行；平面波的交叉项不贡献流：`}</Tx>
        <Eq n="NIII-14" keyEq title="两侧的概率流" say={R`概率流等于速度 $\hbar k/m$ 乘以“向右强度减向左强度”；在势的左右两边算出的结果必须相同。`}>{R`J_k(x)=\frac{\hbar k}{m}\big[|A|^2-|A'|^2\big]=\frac{\hbar k}{m}\big[|${AT}|^2-|${ATP}|^2\big]`}</Eq>

        <h4 id="sec-NIII-1-b">1-b M(k) 的性质</h4>
        <Tx>{R`**$\alpha$. 势是实的 ⇒ 矩阵只有两个独立元。**$V(x)$ 为实函数，若 $\varphi(x)$ 是 \eqref{NIII-1} 的解，$\varphi^*(x)$ 也是。看 $v_k^*(x)$：比较 \eqref{NIII-3a} 与 \eqref{NIII-4a}，在 $x<-l/2$ 它与 $v_k'(x)$ 相同（都是 $\mathrm e^{-ikx}$）；两个解在一段区间上完全相同（函数与导数都相同），就处处相同：`}</Tx>
        <Eq n="NIII-15" say={R`第二个标准解就是第一个标准解的复共轭。`}>{R`v_k^*(x)=v_k'(x)`}</Eq>
        <Tx>{R`把 \eqref{NIII-3b}、\eqref{NIII-4b} 代进去比较 $\mathrm e^{\pm ikx}$ 的系数：`}</Tx>
        <Eq n="NIII-16" say={R`$v_k'$ 在右侧的 $\mathrm e^{-ikx}$ 系数是 $F$ 的共轭。`}>{R`F^*(k)=G'(k)`}</Eq>
        <Eq n="NIII-17" say={R`$v_k'$ 在右侧的 $\mathrm e^{ikx}$ 系数是 $G$ 的共轭。`}>{R`G^*(k)=F'(k)`}</Eq>
        <Tx>{R`因此 $M(k)$ 可以简写为`}</Tx>
        <Eq n="NIII-18" keyEq title="实势的传递矩阵" say={R`对实势，传递矩阵的第二列是第一列的“共轭交换”，全部信息在 $F(k)$、$G(k)$ 两个复数里。`}>{R`M(k)=\begin{pmatrix}F(k)&G^*(k)\\G(k)&F^*(k)\end{pmatrix}`}</Eq>
        <Tx>{R`**$\beta$. 流守恒 ⇒ 行列式为 1。**由 \eqref{NIII-12}，定态的流与 $x$ 无关，所以按 \eqref{NIII-14}，对任意 $A$、$A'$ 都必须有`}</Tx>
        <Eq n="NIII-19" say={R`势两侧的“净流量”必须相等，无论入射振幅怎样选。`}>{R`|A|^2-|A'|^2=|${AT}|^2-|${ATP}|^2`}</Eq>
        <Tx>{R`另一方面，由 \eqref{NIII-9} 与 \eqref{NIII-18} 直接算右边：`}</Tx>
        <Eq n="NIII-20" say={R`直接展开右侧系数的模平方之差，交叉项相消，结果是 $|F|^2-|G|^2$ 乘以左侧的差。`}>{R`\begin{aligned}|${AT}|^2-|${ATP}|^2&=[F(k)A+G^*(k)A'][F^*(k)A^*+G(k)A'^*]\\&\quad-[G(k)A+F^*(k)A'][G^*(k)A^*+F(k)A'^*]\\&=\big[|F(k)|^2-|G(k)|^2\big]\big[|A|^2-|A'|^2\big]\end{aligned}`}</Eq>
        <Tx>{R`所以条件 \eqref{NIII-19} 等价于`}</Tx>
        <Eq n="NIII-21" keyEq title="流守恒：det M = 1" say={R`概率流守恒等价于传递矩阵的行列式为 1，即 $|F|^2$ 比 $|G|^2$ 恰好大 1。`}>{R`|F(k)|^2-|G(k)|^2=\operatorname{Det}M(k)=1`}</Eq>
        <Box kind="note" title="评注 (i)：偶势的额外性质">{R`上面对势的形状没有任何假设。若 $V(x)=V(-x)$，还可以证明 $G(k)$ 是纯虚数。`}</Box>
        <Derivation title="补证：偶势时 G(k) 为纯虚数" collapsed steps={[
          { tex: R`w(x)\equiv v_k(-x)`, why: R`势为偶函数时，$w$ 也是 \eqref{NIII-1} 的解。` },
          { tex: R`x>\tfrac l2:\ w=\mathrm e^{-ikx};\qquad x<-\tfrac l2:\ w=F\,\mathrm e^{-ikx}+G\,\mathrm e^{ikx}`, why: R`由 \eqref{NIII-3a}、\eqref{NIII-3b} 把 $x$ 换成 $-x$。` },
          { tex: R`w=G\,v_k+F\,v_k'`, why: R`左侧行为决定解：比较 \eqref{NIII-3a}、\eqref{NIII-4a}。` },
          { tex: R`x>\tfrac l2:\ w=(GF+FG^*)\,\mathrm e^{ikx}+(G^2+|F|^2)\,\mathrm e^{-ikx}`, why: R`用 \eqref{NIII-3b} 与 $v_k'=v_k^*$ 展开。` },
          { tex: R`F\,(G+G^*)=0\ \Rightarrow\ \operatorname{Re}G=0`, why: R`与第二行比较，$\mathrm e^{ikx}$ 的系数必须为零；而 $|F|\ge1$。（$\mathrm e^{-ikx}$ 的系数给出 $|F|^2-|G|^2=1$，与 \eqref{NIII-21} 一致。）` },
        ]} />
        <Tx>{R`**评注 (ii)：入射波、出射波与 $S$ 矩阵。**由 \eqref{NIII-6}，$A$ 与 $${ATP}$ 是"入射"平面波的系数——分别从 $x=-\infty$、$x=+\infty$ 跑向势的作用区；$${AT}$ 与 $A'$ 是"出射"波的系数——离开势而去的透射或反射粒子。传递矩阵按"左–右"分组，物理上更自然的是按"入–出"分组：引入 $S$ 矩阵，用入射振幅给出出射振幅，`}</Tx>
        <Eq n="NIII-22" say={R`$S$ 矩阵把两列入射波的振幅映射为两列出射波的振幅。`}>{R`\begin{pmatrix}${AT}\\A'\end{pmatrix}=S(k)\begin{pmatrix}A\\${ATP}\end{pmatrix}`}</Eq>
        <Tx>{R`$S$ 很容易用 $M$ 的元素表出。从 \eqref{NIII-9}、\eqref{NIII-18} 出发：`}</Tx>
        <Eq n="NIII-23a" say={R`传递关系的第一行。`}>{R`${AT}=F(k)\,A+G^*(k)\,A'`}</Eq>
        <Eq n="NIII-23b" say={R`传递关系的第二行。`}>{R`${ATP}=G(k)\,A+F^*(k)\,A'`}</Eq>
        <Tx>{R`由第二行解出出射振幅 $A'$：`}</Tx>
        <Eq n="NIII-24" say={R`左侧的反射振幅用两列入射振幅表示。`}>{R`A'=\frac1{F^*(k)}\big[${ATP}-G(k)\,A\big]`}</Eq>
        <Tx>{R`代回第一行：`}</Tx>
        <Eq n="NIII-25" say={R`右侧的出射振幅也用两列入射振幅表示。`}>{R`${AT}=\frac1{F^*(k)}\Big[\big(F(k)F^*(k)-G(k)G^*(k)\big)A+G^*(k)\,${ATP}\Big]`}</Eq>
        <Tx>{R`利用 \eqref{NIII-21}，$FF^*-GG^*=1$，于是`}</Tx>
        <Eq n="NIII-26" keyEq title="S 矩阵" say={R`$S$ 矩阵：对角元是透射振幅 $1/F^*$，非对角元是两个方向的反射振幅。`}>{R`S(k)=\frac1{F^*(k)}\begin{pmatrix}1&G^*(k)\\-G(k)&1\end{pmatrix}`}</Eq>
        <Tx>{R`再用一次 \eqref{NIII-21} 即可验证`}</Tx>
        <Eq n="NIII-27" keyEq title="S 矩阵幺正" say={R`$S$ 矩阵是幺正的：入射的总概率流全部变成出射的概率流。`}>{R`S(k)\,S^\dagger(k)=S^\dagger(k)\,S(k)=\mathbb 1`}</Eq>
        <Tx>{R`（例如 $(SS^\dagger)_{11}=(1+|G|^2)/|F|^2=1$，$(SS^\dagger)_{12}=(-G^*+G^*)/|F|^2=0$。）$S$ 是**幺正**的。这个矩阵在碰撞理论中起重要作用；它的幺正性也可以直接从演化算符的幺正性得出（\IIIc{FIII}）——后者不过表示"在 $Ox$ 轴上某处找到粒子的总概率"（波函数的范数）不随时间改变。`}</Tx>
      </Sub>

      <Sub n="NIII-2" title="Transmission and reflection coefficients" zh="透射系数与反射系数">
        <Tx>{R`**严格的做法与捷径。**严格地说，应当（像 \Ic{JI} 那样）用刚研究的本征函数构造波包。例如能量为 $E_i$、从左边入射的粒子：叠加 $${ATP}=0$（右边没有入射波）的 $\varphi_k(x)$，系数 $g(k)$ 在 $k=k_i=\sqrt{2mE_i/\hbar^2}$ 附近有尖锐的峰。细节与 \Ic{JI} 完全类似，这里不重复；结论是反射、透射系数分别等于 $|A'(k_i)/A(k_i)|^2$ 与 $|${AT}(k_i)/A(k_i)|^2$——两侧速度相同（都在 $V=0$ 区域），所以不出现 \Ic{HI} 中那样的速度比因子。

**从左边入射**（$${ATP}=0$），由 \eqref{NIII-22}、\eqref{NIII-26}：`}</Tx>
        <Eq n="NIII-28" say={R`左入射时，透射振幅是 $A/F^*$，反射振幅是 $-GA/F^*$。`}>{R`\begin{aligned}${AT}(k)&=\frac1{F^*(k)}\,A(k)\\A'(k)&=-\frac{G(k)}{F^*(k)}\,A(k)\end{aligned}`}</Eq>
        <Tx>{R`于是反射与透射系数为`}</Tx>
        <Eq n="NIII-29a" say={R`左入射的反射系数等于 $|G/F|^2$。`}>{R`R_1(k_i)=\Big|\frac{A'(k_i)}{A(k_i)}\Big|^2=\Big|\frac{G(k_i)}{F(k_i)}\Big|^2`}</Eq>
        <Eq n="NIII-29b" keyEq title="透射系数" say={R`左入射的透射系数只由 $F$ 的模决定：$|F|$ 越大，越难穿过。`}>{R`T_1(k_i)=\Big|\frac{${AT}(k_i)}{A(k_i)}\Big|^2=\frac1{|F(k_i)|^2}`}</Eq>
        <Tx>{R`条件 \eqref{NIII-21} 保证 $R_1+T_1=(|G|^2+1)/|F|^2=1$。

**从右边入射**（$A=0$）：`}</Tx>
        <Eq n="NIII-30" say={R`右入射时，透射到左边的振幅同样是入射振幅除以 $F^*$。`}>{R`\begin{aligned}${AT}(k)&=\frac{G^*(k)}{F^*(k)}\,${ATP}(k)\\A'(k)&=\frac1{F^*(k)}\,${ATP}(k)\end{aligned}`}</Eq>
        <Eq n="NIII-31a" say={R`右入射的透射系数，与左入射完全相同。`}>{R`T_2(k_i)=\Big|\frac{A'(k_i)}{${ATP}(k_i)}\Big|^2=\frac1{|F(k_i)|^2}`}</Eq>
        <Eq n="NIII-31b" say={R`右入射的反射系数，与左入射完全相同。`}>{R`R_2(k_i)=\Big|\frac{${AT}(k_i)}{${ATP}(k_i)}\Big|^2=\Big|\frac{G(k_i)}{F(k_i)}\Big|^2`}</Eq>
        <Tx>{R`比较 \eqref{NIII-29a}–\eqref{NIII-29b} 与 \eqref{NIII-31a}–\eqref{NIII-31b}：$T_1=T_2$，$R_1=R_2$。**对给定能量，势垒（无论是否对称）的"透明度"对从左、从右来的粒子总是相同的。**这并不显然：一个斜坡状的势垒，从陡的一侧和缓的一侧撞上去，波函数的形状大不相同，可透射概率一模一样。根源只有两条——势是实的（时间反演）与流守恒。下面交互图中的"斜坡势垒"就是专门用来验证这一点的：两个方向的透射系数分别由 $v_k$ 与 $v_k'$ 两次**独立**数值积分得到。

**$|F|\ge1$ 与共振。**由 \eqref{NIII-21}：`}</Tx>
        <Eq n="NIII-32" keyEq title="F 的模不小于 1" say={R`$|F|^2=1+|G|^2$，所以 $|F|$ 至少为 1，透射系数至多为 1。`}>{R`|F(k)|\ge1`}</Eq>
        <Tx>{R`取等号时（$G=0$）反射系数为零、透射系数为 1：**共振**。反过来的情形却不可能：\eqref{NIII-21} 要求 $|F|>|G|$，所以永远不会有 $T=0$、$R=1$——除非 $F$、$G$ 同时趋于无穷。而这只能在 $k=0$ 发生：把 $v_k$ 除以 $F(k)$，若 $F\to\infty$，所得函数在左边恒为零，按延拓在右边也恒为零；可它在右边是 $\mathrm e^{ikx}+(G/F)\mathrm e^{-ikx}$，要恒为零只能 $k=0$ 且 $F=-G$。（于是有限高、有限宽的势在任何正能量下都"漏"一点。）`}</Tx>
      </Sub>

      <Sub n="NIII-3" title="Example" zh="例：方势垒与方势阱">
        <Tx>{R`回到 \Ic{HI-2} 的方势：在 $-l/2<x<l/2$ 内 $V(x)$ 等于常数 $V_0$（先取 $V_0>0$）。（注意这里势垒放在 $-l/2$ 到 $+l/2$ 之间，而 $\mathrm H_{\rm I}$ 中放在 $0$ 到 $l$ 之间，相差一个平移，$F$ 会因此多出相位因子。）

**$E<V_0$。**令`}</Tx>
        <Eq n="NIII-33" say={R`势垒内部的衰减常数，由“欠缺的能量” $V_0-E$ 决定。`}>{R`\rho=\sqrt{\frac{2m}{\hbar^2}(V_0-E)}`}</Eq>
        <Tx>{R`与 \Ic{HI} 类似的初等计算（在 $x=\pm l/2$ 两处拼接 $\varphi$、$\varphi'$）给出`}</Tx>
        <Eq n="NIII-34" say={R`方势垒（能量低于势垒）的传递矩阵：对角元含双曲函数，非对角元正比于 $\sinh\rho l$，决定隧穿。`}>{R`M(k)=\begin{pmatrix}\Big[\cosh\rho l+i\dfrac{k^2-\rho^2}{2k\rho}\sinh\rho l\Big]\mathrm e^{-ikl}&-i\dfrac{k_0^2}{2k\rho}\sinh\rho l\\ i\dfrac{k_0^2}{2k\rho}\sinh\rho l&\Big[\cosh\rho l-i\dfrac{k^2-\rho^2}{2k\rho}\sinh\rho l\Big]\mathrm e^{ikl}\end{pmatrix}`}</Eq>
        <Tx>{R`其中`}</Tx>
        <Eq n="NIII-35" say={R`与势垒高度对应的波数。`}>{R`k_0=\sqrt{\frac{2mV_0}{\hbar^2}}`}</Eq>
        <Tx>{R`（这里 $V_0$ 必为正，因为假设了 $E<V_0$。）`}</Tx>
        <Derivation title="(34) 的推导要点" collapsed steps={[
          { tex: R`|x|<\tfrac l2:\quad v_k=a\,\mathrm e^{\rho x}+b\,\mathrm e^{-\rho x}`, why: R`势垒内是实指数；$k^2+\rho^2=k_0^2$。` },
          { tex: R`a=\frac{\rho+ik}{2\rho}\,\mathrm e^{(\rho-ik)l/2},\qquad b=\frac{\rho-ik}{2\rho}\,\mathrm e^{-(\rho+ik)l/2}`, why: R`在 $x=-l/2$ 与 $\mathrm e^{ikx}$ 拼接（值与导数）。` },
          { tex: R`F=\frac{(ik+\rho)a\,\mathrm e^{\rho l/2}+(ik-\rho)b\,\mathrm e^{-\rho l/2}}{2ik}\,\mathrm e^{-ikl/2}`, why: R`在 $x=+l/2$ 把 $v_k$ 分解为 $F\mathrm e^{ikx}+G\mathrm e^{-ikx}$，取 $\mathrm e^{ikx}$ 的系数。` },
          { tex: R`F=\Big[\cosh\rho l+i\frac{k^2-\rho^2}{2k\rho}\sinh\rho l\Big]\mathrm e^{-ikl},\qquad G=i\frac{k_0^2}{2k\rho}\sinh\rho l`, why: R`化简（$G$ 由 $\mathrm e^{-ikx}$ 的系数同样得到）；第二列由 \eqref{NIII-18} 给出。` },
        ]} />
        <Tx>{R`**$E>V_0$。**令`}</Tx>
        <Eq n="NIII-36" say={R`能量高于势垒时，势垒内部的波数。`}>{R`k'=\sqrt{\frac{2m}{\hbar^2}(E-V_0)}`}</Eq>
        <Eq n="NIII-37" say={R`带符号的“势垒波数”：$\varepsilon$ 记录 $V_0$ 的正负，于是同一公式也适用于方势阱。`}>{R`k_0=\sqrt{${EPS}\frac{2mV_0}{\hbar^2}}`}</Eq>
        <Tx>{R`（$V_0>0$ 时 $${EPS}=+1$，$V_0<0$ 即方势阱时 $${EPS}=-1$。）把 \eqref{NIII-34} 中的 $\rho$ 换成 $ik'$（$\cosh\rho l\to\cos k'l$，$\sinh\rho l\to i\sin k'l$）即得`}</Tx>
        <Eq n="NIII-38" say={R`能量高于势垒（或势阱中）时的传递矩阵：双曲函数变成三角函数；$\sin k'l=0$ 时 $G=0$，即共振透射。`}>{R`M(k)=\begin{pmatrix}\Big[\cos k'l+i\dfrac{k^2+k'^2}{2kk'}\sin k'l\Big]\mathrm e^{-ikl}&-i${EPS}\dfrac{k_0^2}{2kk'}\sin k'l\\ i${EPS}\dfrac{k_0^2}{2kk'}\sin k'l&\Big[\cos k'l-i\dfrac{k^2+k'^2}{2kk'}\sin k'l\Big]\mathrm e^{ikl}\end{pmatrix}`}</Eq>
        <Box kind="warning" title={R`勘误：(38) 右下角元素`}>{R`原书 (38) 右下角印作 $\big[\cos k'l-i\frac{k^2-k'^2}{2kk'}\sin k'l\big]\mathrm e^{ikl}$。按 \eqref{NIII-18}，右下角必须是左上角 $F(k)$ 的复共轭，分子应为 $k^2+k'^2$（与左上角相同）。数值核对：$V_0=5$、$l=2$、$E=7$（$\hbar^2/2m=1$）时，直接积分方程得到的 $F'$ 元素为 $-0.8308+0.5935i$，正是 $F^*$；按原书印法则得 $-0.6929+0.6836i$，且不满足 $\det M=1$。`}</Box>
        <Tx>{R`容易验证 \eqref{NIII-34}、\eqref{NIII-38} 满足 \eqref{NIII-16}、\eqref{NIII-17}、\eqref{NIII-21}。由 \eqref{NIII-29b}，$T=1/|F|^2$ 与 \Icref{HI-30} 等势垒透射公式一致；$\sin k'l=0$ 时 $G=0$，就是 $\mathrm H_{\rm I}$ 的共振。

下面的交互图对几种形状的势直接数值积分 \eqref{NIII-1} 求出 $F$、$G$：方势垒、方势阱有解析式 \eqref{NIII-34}/\eqref{NIII-38} 对照；双势垒展示**共振隧穿**——能量远低于势垒顶时，两个势垒之间形成"准束缚态"，在特定能量下透射系数可以接近 1；斜坡势垒验证左右对称性。`}</Tx>
        <TransferPlot />
      </Sub>
    </Sec>);
}
