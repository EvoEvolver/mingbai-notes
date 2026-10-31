// 习题 13.1–13.11 —— 式 (13.67)–(13.72)。解答：13.1、13.4 依据原书附录 A；其余为编者给出（数值由本章 _ch13_phys.jsx 计算）。
import { Sec, Tx, Eq, Exercise } from "@kit";

const R = String.raw;

export function Exercises() {
  return (
    <Sec n="13.E" title="Exercises" zh="习题">
      <Exercise n="13.1" title={R`比强度与分布函数：推导 \eqref{13.2}`} level="★" fromBook
        hint={R`数出时间 $dt$ 内、从方向 $\hat{\boldsymbol n}=-\hat{\boldsymbol p}$ 附近立体角 $d\Omega$ 中到达面积 $dA_\perp$、频率在 $[\nu,\nu+d\nu]$ 内的光子数；别忘了两个偏振态。`}
        solution={R`设测量在点 $\boldsymbol x$、时刻 $t$、频率 $\nu$ 进行。需要数出能量 $E=p\in2\pi[\nu,\nu+d\nu]$、在时间间隔 $dt$ 内从方向 $\hat{\boldsymbol n}=-\hat{\boldsymbol p}$ 附近立体角元 $d\Omega$ 到达的光子数 $dN$：
$$dN=2f(\boldsymbol x,\boldsymbol p,t)\,dA_\perp dt\frac{d^3p}{(2\pi)^3}=2f(\boldsymbol x,p=2\pi\nu,\hat{\boldsymbol p},t)\,dA_\perp dt\,\nu^2d\nu\,d\Omega,\qquad\text{(A.168)}$$
因子 2 计入光子的两个偏振态。这里用到：光子以 $c=1$ 运动，探测器在 $dt$ 内收集体积元 $d^3x=dA_\perp dt$ 中的光子；又因 $p=2\pi\nu$，动量空间体积元 $d^3p=p^2dp\,d\Omega_p=(2\pi)^3\nu^2d\nu\,d\Omega$。每个光子按能量 $E=2\pi\nu$ 加权，再与 \eqref{13.1} 比较：
$$I_\nu(\boldsymbol x,\boldsymbol p,t)=4\pi\nu^3f(\boldsymbol x,p=2\pi\nu,\hat{\boldsymbol p},t).\qquad\text{(A.169)}$$
平衡光子分布 $f(p)=(\exp[p/k_{\rm B}T]-1)^{-1}$，所以平衡强度——即著名的黑体（Planck）谱——为
$$I_\nu=\frac{4\pi\hbar\nu^3}{c^2}\left[\exp\left(\frac{2\pi\hbar\nu}{k_{\rm B}T}\right)-1\right]^{-1},\qquad\text{(A.170)}$$
这里恢复了 $\hbar$ 与 $c$。这正是 \eqref{1.9}。`}>
        {R`由 \eqref{13.1} 的定义与 $|\boldsymbol p|=2\pi\nu$（回忆我们取 $\hbar\equiv h/2\pi=1$），推导比强度 $I_\nu(\boldsymbol x,\hat{\boldsymbol p},t)$ 与光子分布函数的关系 \eqref{13.2}。验证对黑体谱它给出 \eqref{1.9}。`}
      </Exercise>

      <Exercise n="13.2" title={R`推导透镜后的 CMB 功率谱 \eqref{13.21}`} level="★★★"
        hint={R`把 \eqref{13.20} 写成 $\Theta_{\rm obs}=\Theta+\Theta^{(1)}+\Theta^{(2)}$，到 $\phi_{\rm L}$ 的二阶保留 $\langle\Theta^{(1)}\Theta^{(1)*}\rangle$ 与 $\langle\Theta\Theta^{(2)*}\rangle+{\rm c.c.}$；用 $\langle\Theta\phi_{\rm L}\rangle=0$ 把四点函数拆成两个两点函数之积。`}
        solution={R`**一阶项。**对 \eqref{13.20} 第一行的 $\boldsymbol l_2$ 积分用掉 δ 函数：
$$\Theta^{(1)}(\boldsymbol l)=-\int\frac{d^2l_1}{(2\pi)^2}\,\boldsymbol l_1\cdot(\boldsymbol l-\boldsymbol l_1)\,\phi_{\rm L}(\boldsymbol l_1)\Theta(\boldsymbol l-\boldsymbol l_1).$$
**(22) 项。**$\langle\Theta^{(1)}(\boldsymbol l)\Theta^{(1)*}(\boldsymbol l')\rangle$ 含 $\langle\phi_{\rm L}(\boldsymbol l_1)\Theta(\boldsymbol l-\boldsymbol l_1)\phi_{\rm L}^*(\boldsymbol l_1')\Theta^*(\boldsymbol l'-\boldsymbol l_1')\rangle$。因 $\phi_{\rm L}$ 与 $\Theta$ 不相关（且都是 Gauss 场），它等于 $\langle\phi_{\rm L}\phi_{\rm L}^*\rangle\langle\Theta\Theta^*\rangle$，给出 $(2\pi)^2\delta_{\rm D}(\boldsymbol l_1-\boldsymbol l_1')C_{\phi_{\rm L}\phi_{\rm L}}(l_1)\cdot(2\pi)^2\delta_{\rm D}(\boldsymbol l-\boldsymbol l')C(|\boldsymbol l-\boldsymbol l_1|)$。积掉 $\boldsymbol l_1'$：
$$C^{(22)}(l)=\int\frac{d^2l_1}{(2\pi)^2}\left[\boldsymbol l_1\cdot(\boldsymbol l-\boldsymbol l_1)\right]^2C_{\phi_{\rm L}\phi_{\rm L}}(l_1)\,C(|\boldsymbol l-\boldsymbol l_1|).$$
（$\langle\Theta^{(1)}\rangle$ 与 $\Theta$ 的交叉项含一个孤立的 $\phi_{\rm L}$，期望为零。）

**(13) 项。**在 $\langle\Theta(\boldsymbol l)\Theta^{(2)*}(\boldsymbol l')\rangle$ 中，$\Theta(\boldsymbol l)$ 必须与 $\Theta^*(\boldsymbol l_3)$ 配对（$\boldsymbol l_3=\boldsymbol l$），$\phi_{\rm L}(\boldsymbol l_1)\phi_{\rm L}(\boldsymbol l_2)$ 配对给出 $\boldsymbol l_2=-\boldsymbol l_1$（另一种配对 $\langle\Theta\phi_{\rm L}\rangle=0$）。于是
$$\langle\Theta\Theta^{(2)*}\rangle\to\frac12\int\frac{d^2l_1}{(2\pi)^2}(\boldsymbol l_1\cdot\boldsymbol l)(-\boldsymbol l_1\cdot\boldsymbol l)\,C_{\phi_{\rm L}\phi_{\rm L}}(l_1)\,C(l)=-\frac12\int\frac{d^2l_1}{(2\pi)^2}(\boldsymbol l_1\cdot\boldsymbol l)^2C_{\phi_{\rm L}\phi_{\rm L}}(l_1)\,C(l).$$
$C_{\phi_{\rm L}\phi_{\rm L}}$ 各向同性，对 $\boldsymbol l_1$ 的方向平均 $\langle(\boldsymbol l_1\cdot\boldsymbol l)^2\rangle=\frac12l_1^2l^2$，所以它等于 $-\frac14[\int\frac{d^2l_1}{(2\pi)^2}l_1^2C_{\phi_{\rm L}\phi_{\rm L}}]l^2C(l)=C^{(13)}(l)$；加上复共轭项得 $2C^{(13)}$。合起来即 \eqref{13.21}。

**与 \secref{12.2} 的比较。**结构与 $P_{22}+2P_{13}$ 完全相同；更简单之处在于 (i) 二维，(ii) $\phi_{\rm L}$ 与 $\Theta$ 不相关，所以没有 \eqref{12.48} 中那样的混合核，(13) 项只是一个乘法因子。`}>
        {R`推导 \eqref{13.21}。这与从非线性密度场的微扰论展开 \eqref{12.40} 推出物质功率谱的次领头阶修正 \eqref{12.48} 类似（但稍容易一些），所以你也许想先做 \exref{12.5}。考虑到 $\langle\Theta(\boldsymbol l)\phi_{\rm L}(\boldsymbol l')\rangle=0$ 这一事实。`}
      </Exercise>

      <Exercise n="13.3" title={R`补全 \eqref{13.39} 的细节`} level="★★"
        hint={R`(a) $2\times2$ 矩阵的行列式；$\mu$ 对小量展开到一阶。(b) 用 \eqref{13.26} 写出 $q_{ij}^{\rm true}$，算 $(\psi q^{\rm true}+q^{\rm true}\psi)$ 的各分量。`}
        solution={R`**(a)** 换积分变量 $\boldsymbol\theta\to\boldsymbol\theta_S$ 时，$d^2\theta=|\partial\theta_k/\partial\theta_{S,l}|d^2\theta_S=|A^{-1}|d^2\theta_S=|A|^{-1}d^2\theta_S$（线性映射的 Jacobi 行列式是常数），提出积分号即得 $F=|A|^{-1}\int d^2\theta_SI_{\rm true}=|A|^{-1}F_{\rm true}$，即 \eqref{13.34}。由 \eqref{13.28}，
$$|A|=(1-\kappa-\gamma_1)(1-\kappa+\gamma_1)-\gamma_2^2=(1-\kappa)^2-\gamma_1^2-\gamma_2^2,$$
即 \eqref{13.35}。三者都小时 $\mu=|A|^{-1}\simeq1+2\kappa+3\kappa^2+\gamma_1^2+\gamma_2^2+\cdots\simeq1+2\kappa$：**线性阶只有会聚改变流量**，剪切只在二阶贡献。

**(b)** 见 \secref{13.4} 中 \eqref{13.39} 后的折叠推导。要点：记 $e_i=\epsilon_i^{\rm true}$，$q^{\rm true}=\frac12q_{\rm true}\begin{pmatrix}1+e_1&e_2\\e_2&1-e_1\end{pmatrix}$。

迹：$\mathrm{Tr}(\psi q^{\rm true}+q^{\rm true}\psi)=2{\rm Tr}(\psi q^{\rm true})=-q_{\rm true}[2\kappa+2(e_1\gamma_1+e_2\gamma_2)]$，所以 $q=q_{\rm true}[1+2\kappa+2(e_1\gamma_1+e_2\gamma_2)]$，即 \eqref{13.38}。

分量：$(\psi q^{\rm true}+q^{\rm true}\psi)_{11}-(\cdots)_{22}=2(\psi_{11}q_{11}^{\rm true}-\psi_{22}q_{22}^{\rm true})=-q_{\rm true}[2\gamma_1+2\kappa e_1]$，于是 $q_{11}-q_{22}=q_{\rm true}[e_1+2\gamma_1+2\kappa e_1]$；类似地 $(\cdots)_{12}=(\psi_{11}+\psi_{22})q_{12}^{\rm true}+\psi_{12}(q_{11}^{\rm true}+q_{22}^{\rm true})=-q_{\rm true}[\kappa e_2+\gamma_2]$，于是 $2q_{12}=q_{\rm true}[e_2+2\gamma_2+2\kappa e_2]$。除以 $q$ 并对 $\kappa,\gamma$ 线性展开：
$$\epsilon_i=\frac{e_i+2\gamma_i+2\kappa e_i}{1+2\kappa+2(e_1\gamma_1+e_2\gamma_2)}\simeq\left(1-2[e_1\gamma_1+e_2\gamma_2]\right)e_i+2\gamma_i,$$
即 \eqref{13.39}。$\kappa$ 在线性阶完全消去。（可在 \secref{13.4} 的交互图中把 $\epsilon^{\rm true}$ 调到 0.5 左右检验：线性公式与精确结果的差为 $\mathcal O(\gamma^2)$。）`}>
        <Tx>{R`补全导致 \eqref{13.39} 的一些细节。

(a) 推导 \eqref{13.34}–\eqref{13.35}，以及 $\kappa$、$\gamma_1$、$\gamma_2$ 都很小时放大率 $\mu=|A|^{-1}$ 的极限表达式。

(b) 由 \eqref{13.37} 推导 \eqref{13.38}–\eqref{13.39}。`}</Tx>
      </Exercise>

      <Exercise n="13.4" title="单个透镜的透镜势" level="★★" fromBook
        hint={R`用柱坐标与 Poisson 方程的积分解。$1-\chi'/\chi$、$1/\chi'$、$a^2$ 等慢变因子都在 $\chi'=\chi_L$ 处取值。`}
        solution={R`孤立质量的 Poisson 方程 \eqref{12.5} 的解为
$$\Phi(\boldsymbol x)=-Ga^2\int\frac{d^3\tilde x}{|\boldsymbol x-\tilde{\boldsymbol x}|}\rho(\tilde{\boldsymbol x}).\qquad\text{(A.171)}$$
代入 \eqref{13.16} 又得到一个对 $\chi'$ 的积分。两个积分都在柱坐标中做，$\tilde{\boldsymbol x}=(\tilde{\boldsymbol R},\tilde\chi)$，$\tilde{\boldsymbol R}$ 为横向坐标：
$$\phi_{\rm L}(\boldsymbol\theta;\chi_L)=-\frac{2G}{(1+z_L)^2}\frac{\chi-\chi_L}{\chi\chi_L}\int d^2\tilde R\int d\tilde\chi\,\rho(\tilde{\boldsymbol R},\tilde\chi)\int_0^\chi\frac{d\chi'}{\sqrt{(\tilde{\boldsymbol R}-\chi_L\boldsymbol\theta)^2+(\chi'-\tilde\chi)^2}},\qquad\text{(A.172)}$$
这里在 \eqref{13.16} 的慢变因子中令 $\chi=\chi_L$（原书此处应理解为 $\chi'=\chi_L$），$a^2$ 也在透镜红移处取值。只要透镜沿视线的延展远小于到源的距离 $\chi$（对单个星系团当然成立），这就是精确的。

对 $d\chi'$ 的积分可以解析完成，等于
$$2\ln\left|x+\sqrt{(\tilde{\boldsymbol R}-\chi_L\boldsymbol\theta)^2+x^2}\right|\Bigg|_{x=0}^{\infty}$$
（上限取到无穷，因为大 $x$ 对投影势中相关的部分没有贡献）。事实上唯一依赖 $\boldsymbol\theta$ 的部分——求透镜势的导数时唯一相关的部分——来自下限：$-2\ln|\tilde{\boldsymbol R}-\chi_L\boldsymbol\theta|$。同样的理由可以从对数中提出因子 $\chi_L$，因为附加项 $\ln\chi_L$ 不依赖 $\boldsymbol\theta$。于是 $\rho\,d\tilde\chi$ 的积分变为面密度 $\Sigma(\boldsymbol\theta')$，其中 $\boldsymbol\theta'=\tilde{\boldsymbol R}/\chi_L$。利用 $d^2\tilde R=\chi_L^2d^2\theta'$，剩下 \eqref{13.67}。

**编者注（疑似符号问题）。**(A.171) 是**牛顿势**的形式（质量处为负），按本书约定它是 $\Psi$；而本书的 $\Phi=-\Psi$ 在过密区为正（\eqref{8.5}、\eqref{12.5}，以及 \eqref{13.13} 后的讨论）。若用 $\Phi=+Ga^2\int\rho/|\boldsymbol x-\tilde{\boldsymbol x}|$，\eqref{13.67} 整体应带负号：$\phi_{\rm L}=-\frac{4G}{(1+z_L)^2}(\chi-\chi_L)\frac{\chi_L}{\chi}\int d^2\theta'\Sigma(\boldsymbol\theta')\ln|\boldsymbol\theta'-\boldsymbol\theta|$。检查：由 $\nabla_\theta^2\ln|\boldsymbol\theta|=2\pi\delta_{\rm D}^{(2)}$ 与 $\kappa=-\frac12\nabla_\theta^2\phi_{\rm L}$，负号版本给出 $\kappa=4\pi Ga^2\frac{(\chi-\chi_L)\chi_L}{\chi}\Sigma>0$——这正是标准的 $\Sigma_{\rm phys}/\Sigma_{\rm cr}$，$\Sigma_{\rm cr}=\frac{c^2}{4\pi G}\frac{D_S}{D_LD_{LS}}$（$D_L=a_L\chi_L$，$D_S=a_S\chi$，$D_{LS}=a_S(\chi-\chi_L)$，$\Sigma_{\rm phys}=a_L\Sigma$）。对点质量 $\Sigma\propto M\delta_{\rm D}^{(2)}$，即得 \secref{13.1} 交互图所用的透镜方程 $\boldsymbol\theta_S=\boldsymbol\theta-\theta_E^2\boldsymbol\theta/|\boldsymbol\theta|^2$，$\theta_E^2=\frac{4GM(\chi-\chi_L)}{a_L\chi\chi_L}$。`}>
        <Tx>{R`考虑位于固定共动距离 $\chi_L$、红移 $z_L$ 的一个透镜（即单个星系或星系团，而不是一般的大尺度结构；参见 \figref{13.4}）。再假设它沿视线方向的延展远小于 $\chi_L$。证明 \eqref{13.16} 中的透镜势可以写成`}</Tx>
        <Eq n="13.67" say={R`薄透镜的透镜势：投影面密度与二维对数 Green 函数的卷积，前因子是距离组合 $(\chi-\chi_L)\chi_L/\chi$。`}>{R`\phi_{\rm L}(\boldsymbol\theta;\chi_L) = \frac{4G}{(1+z_L)^2}(\chi-\chi_L)\frac{\chi_L}\chi\int d^2\theta'\,\Sigma(\boldsymbol\theta')\ln\left|\boldsymbol\theta'-\boldsymbol\theta\right|.`}</Eq>
        <Tx>{R`这里 $\chi$ 是到源的共动距离，$\Sigma(\boldsymbol\theta)$ 是透镜在垂直于视线的平面内的投影面密度：`}</Tx>
        <Eq n="13.68" say={R`投影面密度：质量密度沿视线积分。`}>{R`\Sigma(\boldsymbol\theta) = \int_0^\infty d\chi'\,\rho(\boldsymbol x(\boldsymbol\theta,\chi')).`}</Eq>
        <Tx>{R`提示：用柱坐标与 Poisson 方程的积分解。`}</Tx>
      </Exercise>

      <Exercise n="13.5" title="旋度型偏折：旋转与 B 模" level="★★"
        hint={R`$\psi_{ij}=\partial_j\Delta\theta_i$。$\omega$ 部分为 $\epsilon_{3ik}\partial_k\partial_j\omega$；分出对称无迹、迹与反对称三部分。Fourier 空间 $\partial\to il$，再用 \eqref{10.7}、\eqref{10.9} 的 E/B 投影。`}
        solution={R`**$\psi_{ij}$ 中的 $\omega$ 部分。**记 $\omega_{,ij}=\partial_i\partial_j\omega$。由 $\psi_{ij}=\partial\Delta\theta_i/\partial\theta^j$，$\omega$ 的贡献为 $\epsilon_{3ik}\omega_{,kj}$：
$$\psi^{(\omega)}=\begin{pmatrix}\omega_{,12}&\omega_{,22}\\-\omega_{,11}&-\omega_{,12}\end{pmatrix}.$$
它的迹为零——**$\omega$ 不产生会聚**。对称部分给出剪切，反对称部分给出旋转：
$$\gamma_1^{(\omega)}=-\frac{\psi_{11}-\psi_{22}}2=-\omega_{,12},\qquad\gamma_2^{(\omega)}=-\frac{\psi_{12}+\psi_{21}}2=\frac{\omega_{,11}-\omega_{,22}}2,\qquad\varrho\equiv\frac{\psi_{12}-\psi_{21}}2=\frac12\nabla^2\omega.$$
所以 $A$ 不再对称，其反对称部分 $\begin{pmatrix}0&\varrho\\-\varrho&0\end{pmatrix}$ 使像旋转一个小角度 $\varrho$。

**E/B 分解。**Fourier 空间 $\omega_{,ij}\to-l_il_j\omega$，$\boldsymbol l=l(\cos\phi_l,\sin\phi_l)$：$\gamma_1^{(\omega)}=\frac{l^2}2\sin2\phi_l\,\omega$，$\gamma_2^{(\omega)}=-\frac{l^2}2\cos2\phi_l\,\omega$。用 $E=\cos2\phi_l\gamma_1+\sin2\phi_l\gamma_2$、$B=-\sin2\phi_l\gamma_1+\cos2\phi_l\gamma_2$（\eqref{10.7}、\eqref{10.9}）：
$$E^{(\omega)}=0,\qquad B^{(\omega)}=-\frac{l^2}2\omega(\boldsymbol l).$$
**汇总四个分量：**$\kappa=E^{(\phi)}=\frac12l^2\phi_{\rm L}$（只来自梯度部分）；$B=-\frac12l^2\omega$，旋转 $\varrho=-\frac12l^2\omega$（只来自旋度部分）；剪切 $(\gamma_1,\gamma_2)=(\cos2\phi_l,\sin2\phi_l)E+(-\sin2\phi_l,\cos2\phi_l)B$。即 $\kappa=E$、$\varrho=B$：**梯度型偏折给出会聚与 E 模剪切，旋度型偏折给出旋转与 B 模剪切**，二者在线性阶互不混合。`}>
        <Tx>{R`本章始终考虑标量扰动，这使我们能把线性阶透镜偏折写成标量透镜势的梯度 \eqref{13.16}。现在考虑 $\Delta\theta$ 的一个旋度贡献：`}</Tx>
        <Eq n="13.69" say={R`最一般的二维矢量场 = 梯度部分 + 旋度部分；$\omega$ 是旋度部分的"流函数"。`}>{R`\Delta\theta_i = \partial_{\theta,i}\phi_{\rm L}+\sym{ch13-levi}{\epsilon}_{3ij}\partial_{\theta,j}\omega,`}</Eq>
        <Tx>{R`其中 $\epsilon_{ijk}$ 是 Levi-Civita 符号，并且仍设视线沿 $z$ 方向（$k=3$）。$\omega$ 可以由矢量与张量度规扰动、或由高阶透镜贡献产生。计算 $\omega$ 对 $\psi_{ij}$ 的贡献。证明它既贡献剪切，又引起旋转（正文中从 $\psi_{ij}$ 里丢掉了旋转）。然后把 $\omega$ 引起的剪切分解为 E 模与 B 模。于是 $\psi_{ij}$ 有四个分量：$\kappa$、$\gamma_1$、$\gamma_2$ 与旋转。总结这四个量之间、以及它们与 $\phi_{\rm L}$ 和 $\omega$ 之间的关系。`}</Tx>
      </Exercise>

      <Exercise n="13.6" title={R`数值计算 $C_{\kappa\kappa}(l)$：线性与非线性`} level="★★★"
        hint={R`用 \eqref{13.51}，单一源面 $g_{\rm L}=1-\chi/\chi_S$。线性 $P(k)$ 可用第 8 章的结果（或 EH98 拟合）乘增长因子；非线性用 Halofit 类处方。比较两者之比。`}
        solution={R`本页 \figref{13.7} 交互版就是这个计算（源码见 _ch13_phys.jsx：EH98 无摆动转移函数、$\sigma_8=0.81$ 归一化、Takahashi 2012 Halofit、Limber 积分）。取 $z_S=1.5$ 的单一源面，非线性/线性之比为：

- $l=50$：$1.005$；$l=100$：$1.04$；$l=150$：$1.09$；$l=200$：$1.16$；$l=300$：$1.32$；$l=500$：$1.76$；$l=1000$：$3.2$；$l=3000$：$9.7$。

所以差异在 $l\approx100$ 处达到几个百分点，$l\gtrsim200$ 时超过 10%。

**估计。**Limber 近似把 $l$ 映到每个距离上的 $k=l/\chi$。透镜效率在 $\chi\approx\chi_S/2$ 附近最大（$z_S=1.5$ 时 $\chi_{\rm peak}\approx2300\,\mathrm{Mpc}$，$z\approx0.6$）。第 12 章看到物质谱的非线性修正在 $k\approx0.1\,h\,\mathrm{Mpc^{-1}}$ 已达百分之几、在 $k_{\rm NL}\sim0.3\,h\,\mathrm{Mpc^{-1}}$（$z\sim0.5$ 时稍大）变成 $\mathcal O(1)$。于是 $l_{\rm NL}\sim k\chi_{\rm peak}$：$0.07\,\mathrm{Mpc^{-1}}\times2300\,\mathrm{Mpc}\approx160$ 开始偏离，$0.3\,\mathrm{Mpc^{-1}}\times2300\approx700$ 时非线性主导——与上表一致。（低红移的结构在同样的 $l$ 上对应更大的 $k$，所以偏离比用 $\chi_{\rm peak}$ 估计的出现得稍早。）`}>
        {R`对基准 $\Lambda$CDM 宇宙学，用**线性**物质功率谱数值计算 $C_{\kappa\kappa}(l)$。假设所有背景星系都在红移 $z=1.5$。再用非线性物质功率谱的某种处方重复同样的计算，或与 \figref{13.7} 比较。在多大的 $l$ 上开始看到差异？根据你在第 12 章学到的物质非线性与本章的透镜知识，怎样估计这个 $l$？`}
      </Exercise>

      <Exercise n="13.7" title="CMB 透镜偏折的大小与相干尺度" level="★★★"
        hint={R`源取 $z_*=1089$（$\chi_*\approx1.39\times10^4\,\mathrm{Mpc}$）。偏折场 $\Delta\boldsymbol\theta(\boldsymbol l)=i\boldsymbol l\phi_{\rm L}$ 的功率谱为 $l^2C_{\phi_{\rm L}\phi_{\rm L}}$；方差 $\langle|\Delta\boldsymbol\theta|^2\rangle=\int\frac{ldl}{2\pi}l^2C_{\phi_{\rm L}\phi_{\rm L}}$。`}
        solution={R`用本页的数值（Halofit，Limber）：

- 透镜势谱 $[l(l+1)]^2C_{\phi_{\rm L}\phi_{\rm L}}/2\pi$ 在 $l=10$、$40$、$100$、$400$ 处为 $1.20$、$1.39$、$1.01$、$0.26\times10^{-7}$，峰在 $l\approx40$。
- 偏折场的功率按 $\ln l$ 分布为 $l^2\cdot l^2C_{\phi_{\rm L}\phi_{\rm L}}/2\pi$，即同一条曲线：偏折的功率集中在 $l\sim40$–$60$，对应角尺度 $\pi/l\sim3^\circ$–$5^\circ$。
- 方均根偏折 $\langle|\Delta\boldsymbol\theta|^2\rangle^{1/2}\approx2.4'$，相应 $l_{\rm lens}=\sqrt{2/\langle|\Delta\boldsymbol\theta|^2\rangle}\approx2000$。

**结论。**CMB 透镜偏折只有几角分——远小于第一声学峰的尺度（$\sim1^\circ$），但与阻尼尺度（$l_D\sim2000$，几角分）相当，所以它主要影响高 $l$；而偏折在**数度**范围内相干，因此对小块天区而言透镜近似是整体平移加均匀的剪切与会聚——这正是 \eqref{13.23} 中"长波透镜模调制短波功率谱"图像成立的原因。`}>
        {R`对源红移 $z_*=1089$（即 CMB）重复 \exref{13.6}。这次画出透镜势 $\phi_{\rm L}$ 的角功率谱，以及其梯度 $\Delta\theta^i=\partial\phi_{\rm L}/\partial\theta^i$ 的角功率谱。关于 CMB 透镜偏折的典型大小与典型相关尺度，你能得出什么结论？`}
      </Exercise>

      <Exercise n="13.8" title={R`$\kappa$ 与剪切的方均根`} level="★★"
        hint={R`$\langle\kappa^2\rangle_W=\int\frac{d^2l}{(2\pi)^2}|W(l)|^2C_{\kappa\kappa}(l)$；由 \eqref{13.53}，$\langle\gamma_1^2+\gamma_2^2\rangle_W=\int\frac{d^2l}{(2\pi)^2}|W|^2C_{EE}$。`}
        solution={R`对任意滤波 $W(l)$，$\kappa_W(\boldsymbol\theta)=\int\frac{d^2l}{(2\pi)^2}W(l)\kappa(\boldsymbol l)e^{i\boldsymbol l\cdot\boldsymbol\theta}$，所以
$$\langle\kappa_W^2\rangle=\int\frac{ldl}{2\pi}|W(l)|^2C_{\kappa\kappa}(l),\qquad\langle|\gamma_W|^2\rangle=\langle\gamma_1^2+\gamma_2^2\rangle_W=\int\frac{ldl}{2\pi}|W(l)|^2C_{EE}(l)=\langle\kappa_W^2\rangle,$$
后者因为 $\cos^22\phi_l+\sin^22\phi_l=1$ 且 $C_{EE}=C_{\kappa\kappa}$；每个剪切分量的方均根是 $\kappa_{\rm rms}/\sqrt2$。对锐截断滤波 \eqref{13.70}，$\langle\kappa^2\rangle=\int_0^{\pi/\theta_{\rm min}}\frac{ldl}{2\pi}C_{\kappa\kappa}$。用本页 $z_S=1.5$（单一源面，Halofit）的 $C_{\kappa\kappa}$：

- $\theta_{\rm min}=1'$：$\kappa_{\rm rms}\approx0.028$；
- $\theta_{\rm min}=10'$：$\kappa_{\rm rms}\approx0.013$；
- $\theta_{\rm min}=60'$：$\kappa_{\rm rms}\approx0.006$。

**结论。**宇宙学弱透镜的会聚与剪切在角分到度的尺度上只有 $10^{-2}$ 量级（随 $\theta_{\rm min}$ 缓慢变化，因为 $l^2C_{\kappa\kappa}$ 在 $l\sim10^2$–$10^4$ 间只缓慢增长）。与 $\sigma_\epsilon\approx0.3$ 的形状噪声相比，要以 10% 的精度测出 $\gamma\sim0.01$，每个分辨单元需要 $N\sim(0.3/(2\times0.001))^2\sim2\times10^4$ 个星系——这就是为什么需要覆盖上千平方度、每平方角分数十个星系的巡天。`}>
        <Tx>{R`给定角 Fourier 空间滤波 $W(l)$，推导 $\kappa$ 与剪切 E 模的方均根振幅。用 \exref{13.6} 的结果，对"锐 $l$"滤波`}</Tx>
        <Eq n="13.70" say={R`锐截断滤波：只保留角尺度大于 $\theta_{\rm min}$ 的模。`}>{R`\sym{ch13-Wl}{W}(l) = \begin{cases}1, & l\le\pi/\theta_{\rm min},\\ 0, & \text{otherwise},\end{cases}`}</Eq>
        <Tx>{R`作为 $\theta_{\rm min}$ 的函数数值计算它。这让你对会聚与剪切的典型值有个概念。关于弱透镜的大小你能得出什么结论？`}</Tx>
      </Exercise>

      <Exercise n="13.9" title="内禀取向对剪切统计的影响" level="★★★"
        hint={R`对圆形星系，透镜使形状张量改变 $\delta q_{ij}=-\bar q\psi_{ij}$（\eqref{13.37}）；把 $q_{ij}^{\rm IA}$ 写成同样的形式，读出等效的 $\psi_{ij}^{\rm IA}=\partial_i\partial_j\phi_{\rm IA}$。`}
        solution={R`**(a)** 对近圆的星系，\eqref{13.37} 给出 $\delta q_{ij}=-\bar q\,\psi_{ij}$（$\bar q$ 为平均迹）。\eqref{13.52} 中 $q_{ij}^{\rm IA}=-c_1\chi^2\Phi_{,ij}=-c_1\,\partial^2\Phi/\partial\theta^i\partial\theta^j$（在星系自己的距离上），等价于 $\psi_{ij}^{\rm IA}=(c_1/\bar q)\,\partial_i\partial_j\Phi$。对源分布平均：
$$\phi_{\rm IA}(\boldsymbol\theta)=\int_0^\infty d\chi\,W(\chi)\frac{c_1(\chi)}{\bar q}\Phi(\boldsymbol x(\boldsymbol\theta,\chi))\equiv2\int_0^\infty\frac{d\chi}\chi W_{\rm IA}(\chi)\Phi,\qquad W_{\rm IA}(\chi)=\frac{\chi\,c_1(\chi)W(\chi)}{2\bar q}.$$
与 \eqref{13.48} 比较：IA 相当于把透镜核 $g_{\rm L}$ 换成 $g_{\rm L}+W_{\rm IA}$。注意 $W_{\rm IA}$ 只在**源所在处**不为零，而 $g_{\rm L}$ 在源的**前方**。

**(b)** 照 \secref{13.5.1} 的推导：
$$C_{EE}=\left(\tfrac32\Omega_{\rm m}H_0^2\right)^2\int d\chi\,a^{-2}\left[g_{\rm L}^2+2g_{\rm L}W_{\rm IA}+W_{\rm IA}^2\right]P(l/\chi).$$
两类新贡献：**II**（$W_{\rm IA}^2$）——物理上相邻的两个源星系被同一潮汐场同向排列，只在源分布内部（同一红移）出现；**GI**（$2g_{\rm L}W_{\rm IA}$）——前景源星系被某结构的潮汐场排列，同一结构又透镜了背景源星系。对观测到的、指向过密区（径向）排列的星系，GI 与透镜的切向图样反号，使 $C_{EE}$ **减小**；II 恒为正。

**(c)** 照 \secref{13.5.3}：$C_{{\rm g}E}^{\rm IA}=\frac32\Omega_{\rm m}H_0^2\int\frac{d\chi}\chi W_{\rm g}a^{-1}W_{\rm IA}P_{\rm gm}$。它只在透镜星系与源星系的红移分布**重叠**时不为零：透镜星系周围的源星系被同一潮汐场排列（物理关联而非透镜）。

**(d)** 可能的办法：(i) 利用红移依赖——透镜信号随源–透镜距离按 $g_{\rm L}$ 增长，IA 只依赖物理邻近，所以用光度红移分 bin、丢掉同 bin 或重叠的组合（"nulling"）；(ii) 按星系类型分样本（红色椭圆星系取向强，蓝色盘星系弱）；(iii) 把 $c_1$（及其红移、光度依赖）作为讨厌参数与宇宙学参数一起拟合；(iv) 用星系密度–形状交叉相关在同一红移直接测量 $c_1$（自校准）；(v) 注意线性 IA 不产生 B 模，所以 B 模检验对它无效。`}>
        <Tx>{R`按照 \secref{13.5.1} 的推导，计算线性潮汐取向（\eqref{13.52}）对剪切统计的影响。

(a) 纳入取向的最简单办法是把它加到透镜势上：`}</Tx>
        <Eq n="13.71" say={R`把内禀取向写成透镜势的附加项：形式上与透镜不可区分，只是投影核不同。`}>{R`\phi_{\rm L}(\boldsymbol\theta)\to\phi_{\rm L}(\boldsymbol\theta)+\phi_{\rm IA}(\boldsymbol\theta).`}</Eq>
        <Tx>{R`推导 $\phi_{\rm IA}$ 及其相应的投影核 $W_{\rm IA}$。

(b) 在 Limber 近似下推导对 $C_{EE}(l)$ 的贡献。你应得到两类新的贡献。给出它们的物理解释。

(c) 照 \secref{13.5.3} 的推导，求取向对 $C_{{\rm g}E}(l)$ 的贡献。同样给出所得各项的物理解释。

(d) 你能想出哪些方法来区分透镜与内禀取向？`}</Tx>
      </Exercise>

      <Exercise n="13.10" title={R`B 模对 $\xi_\pm$ 的贡献`} level="★★"
        hint={R`由 \eqref{10.11}：$\gamma_1=\cos2\phi_lE-\sin2\phi_lB$，$\gamma_2=\sin2\phi_lE+\cos2\phi_lB$。`}
        solution={R`由 \eqref{10.11}（把 $Q,U\to\gamma_1,\gamma_2$）：
$$\begin{pmatrix}\gamma_1\\\gamma_2\end{pmatrix}=\begin{pmatrix}\cos2\phi_l\\\sin2\phi_l\end{pmatrix}E+\begin{pmatrix}-\sin2\phi_l\\\cos2\phi_l\end{pmatrix}B.$$
设 $\langle EB^*\rangle=0$（宇称守恒），则 $\langle\gamma_1\gamma_1\rangle$ 的 Fourier 权重为 $\cos^22\phi_lC_{EE}+\sin^22\phi_lC_{BB}$，$\langle\gamma_2\gamma_2\rangle$ 为 $\sin^22\phi_lC_{EE}+\cos^22\phi_lC_{BB}$。于是（\eqref{C.24}）
$$\xi_+(\theta)=\int\frac{ldl}{2\pi}J_0(l\theta)\left[C_{EE}(l)+C_{BB}(l)\right],\qquad\xi_-(\theta)=\int\frac{ldl}{2\pi}J_4(l\theta)\left[C_{EE}(l)-C_{BB}(l)\right],$$
因为差的权重为 $\cos4\phi_l(C_{EE}-C_{BB})$。交叉相关 $\langle\gamma_1\gamma_2\rangle$ 的权重 $\propto\sin4\phi_l(C_{EE}-C_{BB})$，方位角积分为零，所以 $\langle\gamma_t\gamma_\times\rangle=0$ 仍成立（只要 $\langle EB\rangle=0$）。由于 $\xi_+$ 与 $\xi_-$ 中 $C_{BB}$ 的符号相反，同时测量二者就能把 E 模与 B 模分开（"COSEBI"、"E/B 分离"等方法的基础）。`}>
        {R`推导剪切 B 模对相关函数 \eqref{13.57}–\eqref{13.58} 的贡献。先用 \eqref{10.11} 写出它对分量 $\gamma_1(\boldsymbol l)$、$\gamma_2(\boldsymbol l)$ 的贡献。`}
      </Exercise>

      <Exercise n="13.11" title="放大偏差" level="★★★"
        hint={R`线性阶 $\mu\simeq1+2\kappa$，$\mu^{2.5s-1}\simeq1+(5s-2)\kappa$。投影时要对每个星系自己的距离求 $\kappa$——这正是 \eqref{13.49} 中对源分布平均的结构。`}
        solution={R`**(a)** $n_{\rm g}=\bar n_{\rm g}(1+2\kappa)^{2.5s-1}\simeq\bar n_{\rm g}[1+(5s-2)\kappa]$，所以观测到的星系过密度多出一项
$$\delta_{\rm g}^{\rm obs}=\delta_{\rm g}+(5s-2)\,\kappa(\boldsymbol\theta;\chi),$$
其中 $\kappa(\boldsymbol\theta;\chi)$ 是距离 $\chi$ 处源的会聚。物理：放大一方面把暗于极限的星系"抬"进样本（$\propto2.5s$），另一方面把天区面积拉大、稀释面数密度（$-1$）；$s=0.4$ 时两者抵消。

**(b)** 投影：$\Delta_{\rm g}^\mu(\boldsymbol\theta)=(5s-2)\int d\chi\,W_{\rm g}(\chi)\kappa(\boldsymbol\theta;\chi)$。用 $\kappa(\boldsymbol\theta;\chi)=\frac32\Omega_{\rm m}H_0^2\int_0^\chi d\chi'\chi'(1-\chi'/\chi)\delta_{\rm m}(\chi')/a(\chi')$ 并交换积分次序（同 \eqref{13.49}）：
$$\Delta_{\rm g}^\mu(\boldsymbol\theta)=(5s-2)\,\frac32\Omega_{\rm m}H_0^2\int_0^\infty d\chi'\,\frac{\chi'}{a(\chi')}g_{\rm g}(\chi')\,\delta_{\rm m}(\boldsymbol x(\boldsymbol\theta,\chi')),\qquad g_{\rm g}(\chi')\equiv\int_{\chi'}^\infty d\chi\left(1-\frac{\chi'}\chi\right)W_{\rm g}(\chi).$$
即透镜星系样本自己的"会聚图"乘以 $5s-2$。

**(c)** 与源剪切的交叉谱多出一项（与 \eqref{13.51} 同构）：
$$C_{{\rm g}E}^\mu(l)=(5s-2)\left(\tfrac32\Omega_{\rm m}H_0^2\right)^2\int d\chi\,a^{-2}g_{\rm g}(\chi)g_{\rm L}(\chi)P\left(\frac l\chi\right),$$
相关函数照 \eqref{13.62}：$\xi_{{\rm g},t}^\mu=\pm\int\frac{ldl}{2\pi}J_2(l\theta)C_{{\rm g}E}^\mu$（符号约定见 \eqref{13.62} 后的说明）。它探测的是透镜星系**背后**的物质对二者共同的透镜效应，不含偏袒 $b_1$。

**(d)** 两个星系样本 1、2 的计数交叉谱：
$$C_{12}=\int\frac{d\chi}{\chi^2}W_1W_2P_{\rm g}+(5s_2-2)\tfrac32\Omega_{\rm m}H_0^2\!\int\!\frac{d\chi}\chi W_1a^{-1}g_2P_{\rm gm}+(5s_1-2)\tfrac32\Omega_{\rm m}H_0^2\!\int\!\frac{d\chi}\chi W_2a^{-1}g_1P_{\rm gm}+(5s_1-2)(5s_2-2)C_{\kappa_1\kappa_2}.$$
若样本 1 在前、样本 2 在后且红移不重叠，第一项（物理成团）与第三项（$g_1$ 在样本 2 处为零）都消失，剩下由前景星系–背景放大主导的第二项。所以放大偏差在下列情形重要：红移分隔良好的样本之间的交叉相关（如前景星系与背景类星体）；背景样本的 $|5s-2|$ 大（光度函数陡，如亮类星体 $s\gg0.4$）；高红移样本的自相关（透镜核大而物理成团的权重相对小）。对 \eqref{13.61} 的星系–星系透镜测量，若透镜星系是流量限的，它们自身的放大偏差也会带来 $\mathcal O(\kappa)$ 的修正。`}>
        <Tx>{R`第 11 章计算了星系的角自相关，本章推导了与剪切的交叉相关。还有一个在这些推导中被忽略的透镜效应。星系通常（至少在某种程度上）按观测流量选取。这意味着一些本来因内禀亮度低于星等极限而不应进入巡天的星系，被放大后显得更亮，从而通过了截断；这称为**放大偏差**（magnification bias；Moessner & Jain, 1998）。若放大率为 $\mu$，则一块天区中背景星系的数目为`}</Tx>
        <Eq n="13.72" say={R`流量限样本中，放大使面数密度变为 $\mu^{2.5s-1}$ 倍：$2.5s$ 来自更多星系越过星等极限，$-1$ 来自天区面积被拉大。`}>{R`n_{\rm g} = \bar n_{\rm g}\,\mu^{2.5s-1}.`}</Eq>
        <Tx>{R`这里 $\bar n_{\rm g}$ 是星系的平均数目，$s$ 定义为 $d\log N(m)/dm$，其中 $N(m)$ 是星等极限 $m$ 处的星系数。本题不必关心这一关系的来源（解释见 Broadhurst et al., 1995）。

(a) 推导这一效应在 $\kappa$ 的线性阶对观测三维星系密度 $\delta_{\rm g}$ 的贡献。

(b) 用 \eqref{13.49} 推导对投影星系密度 $\Delta_{\rm g}(\boldsymbol\theta)$ 的贡献。

(c) 计算对星系–剪切交叉功率谱与交叉相关函数的贡献。

(d) 对不同星系样本计数之间的交叉相关做同样的计算。你预期放大偏差的贡献在什么时候显著？`}</Tx>
      </Exercise>
    </Sec>);
}
