// 补充材料 D_II：r- 与 p- 表象的进一步研究 —— 式 (DII-1)–(DII-32)
import { Sec, Sub, Tx, Eq, Box, Derivation, C, Table, FormulaMap } from "@kit";
import { FM_DII_32 } from "./_ch02c_fmaps.jsx";
import "./_ch02c_kit.jsx";

const R = String.raw;

export function SecD() {
  return (
    <Sec n="DII" title="A more detailed study of the r and p representations" zh={R`$\{\ket{\mathbf r}\}$ 与 $\{\ket{\mathbf p}\}$ 表象的进一步研究`}
      gist={R`在位置表象中，$\mathbf R$ 及其函数是对角的（乘法），$\mathbf P$ 的矩阵元是 $\delta$ 函数的导数，作用为 $\frac\hbar i\nabla$，$\mathbf P$ 的函数则是一个卷积核；由此得到位置表象的 Schrödinger 方程。动量表象完全对称：$\mathbf P$ 对角，$\mathbf R$ 作用为 $i\hbar\nabla_{\mathbf p}$，势能变成以 $\bar V(\mathbf p-\mathbf p')$ 为核的积分算符。`}
      why={R`正文 \IIsec{E} 给出了两个表象的基本公式，但没有把"算符的矩阵元长什么样"算到底。把矩阵元写清楚，才能理解为什么同一个 Schrödinger 方程在位置空间是微分方程，在动量空间是积分方程。`}
      gives={["DII-2", "DII-5", "DII-9", "DII-10", "DII-19", "DII-22", "DII-23", "DII-32"]}>
      <p className="muted">本节概念：<C id="representation" /></p>
      <Tx>{R`**一张对照表先放在这里**，本节就是把它的每一格算出来：`}</Tx>
      <Table head={[R``, R`**位置表象** $\{\ket{\mathbf r}\}$`, R`**动量表象** $\{\ket{\mathbf p}\}$`]} rows={[
        [R`$\mathbf R$、$F(\mathbf R)$`, R`对角：乘以 $\mathbf r$、$F(\mathbf r)$ \eqref{DII-2} \eqref{DII-3}`, R`$X$：$\delta'$ 型 \eqref{DII-22}；$F(\mathbf R)$：卷积核 \eqref{DII-23}`],
        [R`$\mathbf P$、$G(\mathbf P)$`, R`$P_x$：$\delta'$ 型 \eqref{DII-5}；$G(\mathbf P)$：卷积核 \eqref{DII-10}`, R`对角：乘以 $\mathbf p$、$G(\mathbf p)$ \eqref{DII-20} \eqref{DII-21}`],
        [R`Schrödinger 方程`, R`微分方程 \eqref{DII-19}`, R`积分方程 \eqref{DII-32}`],
      ]} caption={R`两个表象的角色完全对称：在自己的表象里是乘法，在对方的表象里是求导（或卷积）。`} />

      <Sub n="DII-1" title="The r representation" zh={R`位置表象 $\{\ket{\mathbf r}\}$`}>
        <Sub n="DII-1-a" title="The R operator and functions of R" zh={R`算符 $\mathbf R$ 及其函数`}>
          <Tx>{R`正文 \IIsec{E-2} 中 $\ket{\mathbf r'}$ 是 $X,Y,Z$ 的公共本征矢，所以 $X\ket{\mathbf r'}=x'\ket{\mathbf r'}$；再用 $\braket{\mathbf r|\mathbf r'}=\delta(\mathbf r-\mathbf r')$，并注意 $\delta$ 函数使 $x'$ 可以换成 $x$：`}</Tx>
          <Eq n="DII-1" say="位置算符三个分量在位置表象中都是对角的：矩阵元等于坐标值乘以 $\delta(\mathbf r-\mathbf r')$。">{R`\begin{aligned}\braket{\mathbf r|X|\mathbf r'}&=x\ \delta(\mathbf r-\mathbf r')\\\braket{\mathbf r|Y|\mathbf r'}&=y\ \delta(\mathbf r-\mathbf r')\\\braket{\mathbf r|Z|\mathbf r'}&=z\ \delta(\mathbf r-\mathbf r')\end{aligned}`}</Eq>
          <Tx>{R`三式合一：`}</Tx>
          <Eq n="DII-2" keyEq title={R`$\mathbf R$ 在位置表象中对角`} say="位置算符在自己的表象里是“对角”的：矩阵元为 $\mathbf r\,\delta(\mathbf r-\mathbf r')$。">{R`\braket{\mathbf r|\mathbf R|\mathbf r'}=\mathbf r\ \delta(\mathbf r-\mathbf r')`}</Eq>
          <Tx>{R`由 \eqref{BII-27}（本征矢在算符函数下不变、本征值变为函数值），任何 $F(\mathbf R)$ 也对角：`}</Tx>
          <Eq n="DII-3" say="位置算符的任意函数在位置表象中也是对角的，对角元就是该函数在 $r$ 处的值。">{R`\braket{\mathbf r|F(\mathbf R)|\mathbf r'}=F(\mathbf r)\ \delta(\mathbf r-\mathbf r')`}</Eq>
          <Tx>{R`作用在波函数上就是逐点乘以 $F(\mathbf r)$——这正是 \eqref{BII-39} 对势能所说的。`}</Tx>
        </Sub>

        <Sub n="DII-1-b" title="The P operator and functions of P" zh={R`算符 $\mathbf P$ 及其函数`}>
          <Tx>{R`**$\mathbf P$ 在位置表象里不对角。**它的矩阵元怎么算？$\mathbf P$ 在 $\{\ket{\mathbf p}\}$ 中是对角的，所以绕道动量表象：在中间插入 $\int\dd^3p\,\ket{\mathbf p}\bra{\mathbf p}$，再用平面波 $\braket{\mathbf r|\mathbf p}=(2\pi\hbar)^{-3/2}\mathrm e^{i\mathbf p\cdot\mathbf r/\hbar}$。三维积分因子化为三个一维积分：`}</Tx>
          <Eq n="DII-4" say="$P_x$ 在位置表象中的矩阵元：插入动量本征矢的封闭关系，三维积分分解为三个一维积分，只有 $x$ 方向多出一个因子 $p_x$。">{R`\begin{aligned}\braket{\mathbf r|P_x|\mathbf r'}&=\int\dd^3p\ \braket{\mathbf r|P_x|\mathbf p}\ \braket{\mathbf p|\mathbf r'}\\&=\int\dd^3p\ p_x\braket{\mathbf r|\mathbf p}\ \braket{\mathbf p|\mathbf r'}\\&=(2\pi\hbar)^{-3}\int\dd^3p\ p_x\ \mathrm e^{\frac i\hbar\mathbf p\cdot(\mathbf r-\mathbf r')}\\&=\left[\frac1{2\pi\hbar}\int_{-\infty}^{+\infty}\dd p_x\ p_x\ \mathrm e^{\frac i\hbar p_x(x-x')}\right]\\&\quad\times\left[\frac1{2\pi\hbar}\int_{-\infty}^{+\infty}\dd p_y\ \mathrm e^{\frac i\hbar p_y(y-y')}\right]\\&\quad\times\left[\frac1{2\pi\hbar}\int_{-\infty}^{+\infty}\dd p_z\ \mathrm e^{\frac i\hbar p_z(z-z')}\right]\end{aligned}`}</Eq>
          <Tx>{R`后两个方括号是 $\delta$ 函数的积分表示。第一个多了 $p_x$：注意 $p_x\mathrm e^{ip_xu/\hbar}=\frac\hbar i\frac{\dd}{\dd u}\mathrm e^{ip_xu/\hbar}$，把求导提到积分号外，剩下的又是 $\delta(u)$，于是第一个方括号是 $\frac\hbar i\delta'(x-x')$（附录 II 中 $\delta$ 及其导数的积分表示）：`}</Tx>
          <Eq n="DII-5" keyEq title={R`$P_x$ 的位置表象矩阵元`} say="动量算符在位置表象中的矩阵元是 $\delta$ 函数的导数：它把相邻点“连起来”，这就是微分算符的矩阵形式。">{R`\braket{\mathbf r|P_x|\mathbf r'}=\frac\hbar i\ \delta'(x-x')\ \delta(y-y')\ \delta(z-z')`}</Eq>
          <Tx>{R`$P_y$、$P_z$ 同理。

**核对：它确实给出 $\frac\hbar i\partial_x$。**作用在任意态上，插入位置表象的封闭关系：`}</Tx>
          <Eq n="DII-6" say="$P_x$ 作用于任意态的波函数：用矩阵元 $\braket{\mathbf r|P_x|\mathbf r'}$ 对 $\mathbf r'$ 积分。">{R`\braket{\mathbf r|P_x|\psi}=\int\dd^3r'\ \braket{\mathbf r|P_x|\mathbf r'}\ \braket{\mathbf r'|\psi}`}</Eq>
          <Tx>{R`代入 \eqref{DII-5}，$y'$、$z'$ 的积分被 $\delta$ 函数直接做掉：`}</Tx>
          <Eq n="DII-7" say="代入矩阵元后，三重积分中 $y'$、$z'$ 方向的积分被 $\delta$ 函数取值，只剩下 $\delta'(x-x')$ 对 $x'$ 的积分。">{R`\braket{\mathbf r|P_x|\psi}=\frac\hbar i\int\delta'(x-x')\dd x'\int\delta(y-y')\ \dd y'\int\delta(z-z')\ \psi(x',y',z')\ \dd z'`}</Eq>
          <Tx>{R`剩下的 $x'$ 积分要用 $\delta'$ 的基本性质（附录 II (48)）：$\delta'$ 是奇函数，把它当作"求导再取值"的工具：`}</Tx>
          <Eq n="DII-8" say="$\delta$ 导数的筛选性质：$\delta'(-u)$ 乘以函数积分，等于函数在零点的导数。">{R`\int\delta'(-u)\ f(u)\ \dd u=-\int\delta'(u)\ f(u)\ \dd u=f'(0)`}</Eq>
          <Tx>{R`令 $u=x'-x$（$\delta'(x-x')=\delta'(-u)$），$f(u)=\psi(x+u,y,z)$，$f'(0)=\partial_x\psi$：`}</Tx>
          <Eq n="DII-9" keyEq title={R`$P_x$ 在位置表象中作用为 $\frac\hbar i\partial_x$`} say="动量算符在位置表象中的作用：对波函数求 $x$ 偏导再乘以 ħ/$i$，与正文的结论一致。">{R`\braket{\mathbf r|P_x|\psi}=\frac\hbar i\frac\partial{\partial x}\psi(x,y,z)`}</Eq>
          <Tx>{R`这就是 \IIeq{E-26}——这次是从矩阵元出发、经由 $\delta'$ "算"出来的，而不是从平移论证或 Fourier 变换得到的。

**$\mathbf P$ 的一般函数。**同样插入动量表象的封闭关系，$G(\mathbf P)$ 在 $\ket{\mathbf p}$ 上只是乘以 $G(\mathbf p)$：`}</Tx>
          <Eq n="DII-10" keyEq title={R`$G(\mathbf P)$ 的位置表象矩阵元：卷积核`} say="动量函数在位置表象中的矩阵元只依赖于 $\mathbf r-\mathbf r'$，是 $G(\mathbf p)$ 的逆 Fourier 变换：作用在波函数上是一次卷积。">{R`\begin{aligned}\braket{\mathbf r|G(\mathbf P)|\mathbf r'}&=\int\dd^3p\ \braket{\mathbf r|G(\mathbf P)|\mathbf p}\,\braket{\mathbf p|\mathbf r'}\\&=(2\pi\hbar)^{-3}\int\dd^3p\ G(\mathbf p)\ \mathrm e^{i\mathbf p\cdot(\mathbf r-\mathbf r')/\hbar}\\&=(2\pi\hbar)^{-3/2}\ \tilde G(\mathbf r-\mathbf r')\end{aligned}`}</Eq>
          <Tx>{R`其中 $\tilde G$ 是 $G(\mathbf p)$ 的逆 Fourier 变换：`}</Tx>
          <Eq n="DII-11" say="$\tilde G(\mathbf r)$ 是动量函数 $G(\mathbf p)$ 的逆 Fourier 变换（带 $(2\pi\hbar)^{-3/2}$ 归一化）。">{R`\tilde G(\mathbf r)=(2\pi\hbar)^{-3/2}\int\dd^3p\ \mathrm e^{\frac i\hbar\mathbf p\cdot\mathbf r}\ G(\mathbf p)`}</Eq>
          <Box kind="physics" title="只依赖 $\mathbf r-\mathbf r'$ 意味着什么">{R`$G(\mathbf P)$ 的核只依赖于 $\mathbf r-\mathbf r'$：它在空间中处处"长得一样"，作用于波函数就是卷积。这正是平移不变性的体现——$\mathbf P$ 的函数与平移对易（补充材料 $\mathrm E_{\rm II}$）。例如 $G(\mathbf P)=\mathrm e^{-i\mathbf a\cdot\mathbf P/\hbar}$ 时 $\tilde G\propto\delta(\mathbf r-\mathbf r'-\mathbf a)$，卷积就是把波函数整体平移 $\mathbf a$。`}</Box>
        </Sub>

        <Sub n="DII-1-c" title="The Schrödinger equation in the r representation" zh="位置表象中的 Schrödinger 方程">
          <Tx>{R`第 III 章将把态矢量的演化写成`}</Tx>
          <Eq n="DII-12" say="抽象的 Schrödinger 方程：态矢量对时间的变化率由哈密顿算符决定。">{R`i\hbar\frac{\dd}{\dd t}\ket{\psi(t)}=H\ket{\psi(t)}`}</Eq>
          <Tx>{R`对标量势中的无自旋粒子（第 III 章 (B-42)）`}</Tx>
          <Eq n="DII-13" say="标量势中无自旋粒子的哈密顿算符：动能 $\mathbf P^2/2m$ 加上势能 $V(\mathbf R)$。">{R`H=\frac1{2m}\mathbf P^2+V(\mathbf R)`}</Eq>
          <Tx>{R`**任务：把抽象方程"翻译"成波函数的方程。**用的波函数是`}</Tx>
          <Eq n="DII-14" say="位置表象中的波函数：态矢量在位置本征矢上的分量。">{R`\psi(\mathbf r,t)=\braket{\mathbf r|\psi(t)}`}</Eq>
          <Tx>{R`对 \eqref{DII-12} 左乘 $\bra{\mathbf r}$：`}</Tx>
          <Eq n="DII-15" say="把 Schrödinger 方程投影到位置本征矢上，得到三项：时间导数、动能项、势能项。">{R`i\hbar\frac\partial{\partial t}\braket{\mathbf r|\psi(t)}=\frac1{2m}\braket{\mathbf r|\mathbf P^2|\psi(t)}+\braket{\mathbf r|V(\mathbf R)|\psi(t)}`}</Eq>
          <Tx>{R`三项逐个翻译。$\bra{\mathbf r}$ 不随时间变化，时间导数直接穿过：`}</Tx>
          <Eq n="DII-16" say="位置本征矢不随时间变化，所以时间导数直接作用到波函数上。">{R`\frac\partial{\partial t}\braket{\mathbf r|\psi(t)}=\frac\partial{\partial t}\psi(\mathbf r,t)`}</Eq>
          <Tx>{R`势能项由 \eqref{BII-39}：`}</Tx>
          <Eq n="DII-17" say="势能项在位置表象中就是波函数乘以 $V(\mathbf r)$。">{R`\braket{\mathbf r|V(\mathbf R)|\psi(t)}=V(\mathbf r)\,\psi(\mathbf r,t)`}</Eq>
          <Tx>{R`动能项：每个分量 $P_i$ 作用为 $\frac\hbar i\partial_i$，作用两次给出 $-\hbar^2\partial_i^2$：`}</Tx>
          <Eq n="DII-18" say="$\mathbf P^2$ 在位置表象中作用为 $-\hbar^2$ 乘以 Laplace 算符。">{R`\begin{aligned}\braket{\mathbf r|\mathbf P^2|\psi(t)}&=\braket{\mathbf r|(P_x^2+P_y^2+P_z^2)|\psi(t)}\\&=-\hbar^2\left(\frac{\partial^2}{\partial x^2}+\frac{\partial^2}{\partial y^2}+\frac{\partial^2}{\partial z^2}\right)\psi(x,y,z,t)\\&=-\hbar^2\Delta\psi(\mathbf r,t)\end{aligned}`}</Eq>
          <Tx>{R`三项合起来：`}</Tx>
          <Eq n="DII-19" keyEq title="位置表象中的 Schrödinger 方程" say="抽象的 Schrödinger 方程在位置表象中的形式：第 $I$ 章引入的波动方程，动能项是 Laplace 算符，势能项是逐点相乘。">{R`i\hbar\frac\partial{\partial t}\psi(\mathbf r,t)=\left[-\frac{\hbar^2}{2m}\Delta+V(\mathbf r)\right]\psi(\mathbf r,t)`}</Eq>
          <Tx>{R`这正是第 I 章 \Isec{B-2} 凭物理论证"猜"出来的波动方程。现在它成了抽象方程 \eqref{DII-12} 在一个特定表象中的投影：第 I 章的猜测与第 II、III 章的形式体系在这里接上了。`}</Tx>
        </Sub>
      </Sub>

      <Sub n="DII-2" title="The p representation" zh={R`动量表象 $\{\ket{\mathbf p}\}$`}>
        <Tx>{R`**换个视角，一切对调。**动量表象里 $\mathbf P$ 是"简单"的那个，$\mathbf R$ 成了"复杂"的那个。论证与 §1 逐字对应，只需把 $\mathbf r\leftrightarrow\mathbf p$，并注意 $\braket{\mathbf p|\mathbf r}$ 带的是 $\mathrm e^{-i\mathbf p\cdot\mathbf r/\hbar}$（指数变号）。`}</Tx>
        <Sub n="DII-2-a" title="The P operator and functions of P" zh={R`算符 $\mathbf P$ 及其函数`}>
          <Eq n="DII-20" say="动量算符在动量表象中是对角的。">{R`\braket{\mathbf p|\mathbf P|\mathbf p'}=\mathbf p\ \delta(\mathbf p-\mathbf p')`}</Eq>
          <Eq n="DII-21" say="动量的任意函数在动量表象中也是对角的，对角元是函数值 $G(\mathbf p)$。">{R`\braket{\mathbf p|G(\mathbf P)|\mathbf p'}=G(\mathbf p)\ \delta(\mathbf p-\mathbf p')`}</Eq>
        </Sub>
        <Sub n="DII-2-b" title="The R operator and functions of R" zh={R`算符 $\mathbf R$ 及其函数`}>
          <Tx>{R`仿照 \eqref{DII-4}：这次插入位置表象的封闭关系，积分里多出的因子是 $x$，而 $x\,\mathrm e^{-ix(p_x-p_x')/\hbar}=i\hbar\frac{\partial}{\partial p_x}\mathrm e^{-ix(p_x-p_x')/\hbar}$——指数的符号相反，所以前面的因子是 $i\hbar$ 而不是 $\hbar/i$：`}</Tx>
          <Eq n="DII-22" keyEq title={R`$X$ 的动量表象矩阵元`} say="位置算符在动量表象中的矩阵元是 $\delta$ 函数对动量的导数，系数为 $i\hbar$（与位置表象中 $P$ 的系数 $\hbar/i$ 符号相反）。">{R`\braket{\mathbf p|X|\mathbf p'}=i\hbar\,\delta'(p_x-p_x')\,\delta(p_y-p_y')\,\delta(p_z-p_z')`}</Eq>
          <Tx>{R`于是在动量表象中 $X$ 作用为 $i\hbar\frac{\partial}{\partial p_x}$。位置的一般函数则给出卷积核：`}</Tx>
          <Eq n="DII-23" say="位置函数在动量表象中的矩阵元只依赖于 $\mathbf p-\mathbf p'$，是 $F(\mathbf r)$ 的 Fourier 变换。">{R`\braket{\mathbf p|F(\mathbf R)|\mathbf p'}=(2\pi\hbar)^{-3/2}\ \bar F(\mathbf p-\mathbf p')`}</Eq>
          <Tx>{R`其中`}</Tx>
          <Eq n="DII-24" say="$\bar F(\mathbf p)$ 是位置函数 $F(\mathbf r)$ 的 Fourier 变换。">{R`\bar F(\mathbf p)=(2\pi\hbar)^{-3/2}\int\dd^3r\,\mathrm e^{-\frac i\hbar\mathbf p\cdot\mathbf r}F(\mathbf r)`}</Eq>
          <Derivation title="(DII-23) 的一行推导" collapsed steps={[
            { tex: R`\braket{\mathbf p|F(\mathbf R)|\mathbf p'}=\int\dd^3r\ \braket{\mathbf p|\mathbf r}F(\mathbf r)\braket{\mathbf r|\mathbf p'}=(2\pi\hbar)^{-3}\int\dd^3r\ \mathrm e^{-\frac i\hbar(\mathbf p-\mathbf p')\cdot\mathbf r}F(\mathbf r)`, why: R`插入位置表象的封闭关系；$F(\mathbf R)$ 在 $\ket{\mathbf r}$ 上对角。` },
            { tex: R`=(2\pi\hbar)^{-3/2}\,\bar F(\mathbf p-\mathbf p')`, why: R`与 \eqref{DII-24} 对比：$(2\pi\hbar)^{-3}$ 拆成两个 $(2\pi\hbar)^{-3/2}$，其中一个并入 $\bar F$ 的定义。` },
          ]} />
        </Sub>
        <Sub n="DII-2-c" title="The Schrödinger equation in the p representation" zh="动量表象中的 Schrödinger 方程">
          <Tx>{R`动量表象的波函数：`}</Tx>
          <Eq n="DII-25" say="动量表象中的波函数：态矢量在动量本征矢上的分量。">{R`\overline\psi(\mathbf p,t)=\braket{\mathbf p|\psi(t)}`}</Eq>
          <Tx>{R`把 \eqref{DII-12} 投影到 $\bra{\mathbf p}$ 上：`}</Tx>
          <Eq n="DII-26" say="把 Schrödinger 方程投影到动量本征矢上，同样得到时间导数、动能项、势能项三项。">{R`i\hbar\frac\partial{\partial t}\braket{\mathbf p|\psi(t)}=\frac1{2m}\braket{\mathbf p|\mathbf P^2|\psi(t)}+\braket{\mathbf p|V(\mathbf R)|\psi(t)}`}</Eq>
          <Tx>{R`这一次时间项与动能项都是平凡的：`}</Tx>
          <Eq n="DII-27" say="动量本征矢不随时间变化，时间导数直接作用在动量波函数上。">{R`\frac\partial{\partial t}\braket{\mathbf p|\psi(t)}=\frac\partial{\partial t}\overline\psi(\mathbf p,t)`}</Eq>
          <Eq n="DII-28" say="动能项在动量表象中只是乘以 $\mathbf p^2$。">{R`\braket{\mathbf p|\mathbf P^2|\psi(t)}=\mathbf p^2\,\overline\psi(\mathbf p,t)`}</Eq>
          <Tx>{R`麻烦转移到了势能项。插入动量表象的封闭关系：`}</Tx>
          <Eq n="DII-29" say="势能项：插入动量封闭关系，变成对 $\mathbf p'$ 的积分。">{R`\braket{\mathbf p|V(\mathbf R)|\psi(t)}=\int\dd^3p'\braket{\mathbf p|V(\mathbf R)|\mathbf p'}\ \braket{\mathbf p'|\psi(t)}`}</Eq>
          <Tx>{R`代入 \eqref{DII-23}（取 $F=V$）：`}</Tx>
          <Eq n="DII-30" say="势能项在动量表象中是卷积：势能的 Fourier 变换 $\overline V(\mathbf p-\mathbf p')$ 把动量 $\mathbf p'$ 的分量“搬”到 $\mathbf p$。">{R`\braket{\mathbf p|V(\mathbf R)|\psi(t)}=(2\pi\hbar)^{-3/2}\int\dd^3p'\,\overline V(\mathbf p-\mathbf p')\,\overline\psi(\mathbf p',t)`}</Eq>
          <Tx>{R`其中 $\overline V$ 是势能的 Fourier 变换：`}</Tx>
          <Eq n="DII-31" say="势能函数 $V(\mathbf r)$ 的 Fourier 变换。">{R`\overline V(\mathbf p)=(2\pi\hbar)^{-3/2}\int\dd^3r\,\mathrm e^{-\frac i\hbar\mathbf p\cdot\mathbf r}\,V(\mathbf r)`}</Eq>
          <Tx>{R`合起来：`}</Tx>
          <FormulaMap n="DII-32" keyEq title="动量表象中的 Schrödinger 方程" say="动量表象中的 Schrödinger 方程是一个积分方程：动能项是乘法，势能项是与势能的 Fourier 变换的卷积。" tree={FM_DII_32} start="V" />
          <Box kind="physics" title="势能的作用：交换动量">{R`积分核 $\overline V(\mathbf p-\mathbf p')$ 的读法：势能把动量为 $\mathbf p'$ 的分量"散射"到动量 $\mathbf p$，幅度由势能在波矢 $(\mathbf p-\mathbf p')/\hbar$ 处的 Fourier 分量决定。势能越"尖锐"（空间变化越快），$\overline V$ 越宽，能交换的动量越大。自由粒子 $V=0$ 时各个动量分量互不相干，\eqref{DII-32} 退化为 $\overline\psi(\mathbf p,t)=\overline\psi(\mathbf p,0)\mathrm e^{-ip^2t/2m\hbar}$。`}</Box>
          <Tx>{R`**另一条路。**$\overline\psi(\mathbf p,t)$ 是 $\psi(\mathbf r,t)$ 的 Fourier 变换（\IIeq{E-18}），所以对 \eqref{DII-19} 两边直接取 Fourier 变换也能得到 \eqref{DII-32}：Laplace 算符变为 $-\mathbf p^2/\hbar^2$，乘积 $V\psi$ 变为卷积（卷积定理）。两种推导殊途同归，也正说明"表象"只是同一个抽象方程的不同坐标写法。`}</Tx>
        </Sub>
      </Sub>
    </Sec>);
}
