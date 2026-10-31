// 习题 10.1–10.6 —— 式 (10.51)。解答：10.1、10.6 依据原书附录 A（A.128–A.137）；其余为编者给出（10.5 的数值已用 node 核对）。
import { Sec, Tx, Eq, Exercise } from "@kit";

const R = String.raw;

export function Exercises() {
  return (
    <Sec n="10.E" title="Exercises" zh="习题">
      <Exercise n="10.1" title="I、Q、U 与 E、B 在转动与宇称下的变换" level="★★" fromBook
        hint={R`把 $I_{ij}$ 当作二阶张量：$\tilde I=RIR^{\top}$，$R(\alpha)$ 为二维旋转矩阵。$\boldsymbol l$ 用同一个 $R$ 变换，所以 $\tilde\phi_l=\phi_l+\alpha$。宇称：只翻转 $x$ 轴。`}
        solution={R`**转动（附录 A）。**绕视线（光子传播方向）的转动下，$\tilde I_{ij}=R_{ik}R_{jl}I_{kl}$，即 $\tilde I=RIR^{\top}$，其中
$$R(\alpha)=\begin{pmatrix}\cos\alpha&-\sin\alpha\\ \sin\alpha&\cos\alpha\end{pmatrix}.$$
算得
$$\tilde I=\begin{pmatrix}I+Q\cos2\alpha-U\sin2\alpha & U\cos2\alpha+Q\sin2\alpha\\ U\cos2\alpha+Q\sin2\alpha & I-Q\cos2\alpha+U\sin2\alpha\end{pmatrix},$$
于是
$$\tilde I=I,\qquad\tilde Q=\cos2\alpha\,Q-\sin2\alpha\,U,\qquad\tilde U=\cos2\alpha\,U+\sin2\alpha\,Q .$$
即 $Q$、$U$ 依赖于所选的坐标。另一方面，写 $\boldsymbol l=l(\cos\phi_l,\sin\phi_l)$，则 $\tilde{\boldsymbol l}=R\boldsymbol l=l(\cos(\phi_l+\alpha),\sin(\phi_l+\alpha))$，所以 $\tilde\phi_l=\phi_l+\alpha$——不出所料。把 $\tilde Q$、$\tilde U$ 与 $\tilde\phi_l$ 代入 \eqref{10.6}（即 \eqref{10.7}）与 \eqref{10.9}：
$$\tilde E=\cos2(\phi_l+\alpha)\,\tilde Q+\sin2(\phi_l+\alpha)\,\tilde U=\cos2\phi_l\,Q+\sin2\phi_l\,U=E,$$
（把 $(\tilde Q,\tilde U)$ 看成 $(Q,U)$ 转 $+2\alpha$，再被 $\cos2(\phi_l+\alpha)$、$\sin2(\phi_l+\alpha)$ 投影回去，$2\alpha$ 相消。）同理 $\tilde B=B$。**E 与 B 在坐标变换下不变。**

（注：$\tilde I=RIR^{\top}$ 是把偏振图样整体转 $+\alpha$——等价于把坐标轴转 $-\alpha$；若把坐标轴转 $+\alpha$，则 $\tilde Q=Q\cos2\alpha+U\sin2\alpha$，正如 \figref{10.1} 交互图所示。两种说法只差 $\alpha$ 的符号，结论 $\tilde E=E$、$\tilde B=B$ 不变，因为 $\boldsymbol l$ 与偏振始终用同一个转动。）

**宇称（附录 A）。**三维中宇称变换把 $\boldsymbol r$ 变为 $-\boldsymbol r$。于是视线方向翻转：若在 \figref{10.2} 中它指出纸面，现在指入纸面。把它转回指出纸面，本质上就是只翻转了 $x$ 轴方向（或等价地只翻转 $y$ 轴）。由 \figref{10.2} 可见
$$\text{宇称：}\quad Q\to Q,\qquad U\to-U .$$
（沿 $\pm45^\circ$ 的偏振互换。）此外 $\phi_l\to\pi-\phi_l$，所以 $\cos2\phi_l\to\cos2\phi_l$，$\sin2\phi_l\to-\sin2\phi_l$。由 \eqref{10.6}、\eqref{10.9} 得
$$\text{宇称：}\quad E\to E,\qquad B\to-B .$$
综合本题全部结果：**E 是标量，B 是赝标量**；而 $Q$、$U$ 连转动不变性都没有。`}>
        {R`用 \eqref{10.2} 推导坐标系绕视线 $\hat{\boldsymbol e}_z$ 转角度 $\alpha$ 时 $I$、$Q$、$U$ 如何变换。再对 $E$、$B$ 做同样的事，假设单个平面波，波矢为 $\boldsymbol l$；注意 $\boldsymbol l$ 也要一起变换。最后考虑所有这些量在宇称下的变换。在二维情形中，可以把宇称理解为只翻转 $x$ 轴。`}
      </Exercise>

      <Exercise n="10.2" title={R`一般方向的 $\boldsymbol k$：$Q\propto\cos2\phi_k$`} level="★★"
        hint={R`$\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}'=\sin\theta_k\sin\theta'\cos(\phi'-\phi_k)+\cos\theta_k\cos\theta'$；只有含 $\cos^2(\phi'-\phi_k)$ 的项能与 $\cos2\phi'$ 配对。`}
        solution={R`$\hat{\boldsymbol k}=(\sin\theta_k\cos\phi_k,\sin\theta_k\sin\phi_k,\cos\theta_k)$，由 \eqref{10.16}
$$\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}'=\sin\theta_k\sin\theta'\cos(\phi'-\phi_k)+\cos\theta_k\cos\theta' .$$
代入 \eqref{10.19}，$f\to-5\Theta_2\mathcal P_2(\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}')$：
$$Q=5A\Theta_2\int d\Omega'\,\mathcal P_2(\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}')\sin^2\theta'\cos2\phi' .$$
$\mathcal P_2$ 中的 $-\frac12$ 与 $\cos^2\theta'$ 项不含 $\phi'$，交叉项只含 $\cos(\phi'-\phi_k)$，它们与 $\cos2\phi'$ 的 $\phi'$ 积分都为零。剩下 $\frac32\sin^2\theta_k\sin^2\theta'\cos^2(\phi'-\phi_k)$，而 $\cos^2(\phi'-\phi_k)=\frac12[1+\cos(2\phi'-2\phi_k)]$，
$$\int_0^{2\pi}d\phi'\cos(2\phi'-2\phi_k)\cos2\phi'=\pi\cos2\phi_k .$$
所以
$$Q=5A\Theta_2\cdot\frac32\sin^2\theta_k\cdot\frac{16}{15}\cdot\frac\pi2\cos2\phi_k=4\pi A\sin^2\theta_k\cos(2\phi_k)\Theta_2,$$
即 \eqref{10.28} 第一行；$\phi_k=0$ 时回到 \eqref{10.27}。（\figref{10.5} 交互图"标量平面波四极"模式可直接核对任意 $\theta_k$、$\phi_k$。）`}>
        {R`当波矢 $\boldsymbol k$ 离开 $x$–$z$ 平面时，证明（沿 $z$ 方向出射的辐射的）$Q$ 偏振按 $\cos(2\phi_k)$ 变化。为此，先计算 $\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}'$，再以 \eqref{10.19} 推出的权重因子 $\sin^2\theta'\cos(2\phi')$ 对 $\mathcal P_2(\hat{\boldsymbol k}\cdot\hat{\boldsymbol n}')$ 做立体角积分。`}
      </Exercise>

      <Exercise n="10.3" title="标量扰动的 U 分量" level="★★"
        hint={R`(a) $|\hat{\boldsymbol a}\cdot\hat{\boldsymbol\epsilon}|^2-|\hat{\boldsymbol b}\cdot\hat{\boldsymbol\epsilon}|^2=2(\hat{\boldsymbol e}_x\cdot\hat{\boldsymbol\epsilon})(\hat{\boldsymbol e}_y\cdot\hat{\boldsymbol\epsilon})$，其中 $\hat{\boldsymbol a},\hat{\boldsymbol b}=(\hat{\boldsymbol e}_x\pm\hat{\boldsymbol e}_y)/\sqrt2$。(b)(c) 同 \exref{10.2}，权重换成 $\sin2\phi'$。`}
        solution={R`**(a)** 令 $\hat{\boldsymbol a}=(\hat{\boldsymbol e}_x+\hat{\boldsymbol e}_y)/\sqrt2$，$\hat{\boldsymbol b}=(\hat{\boldsymbol e}_x-\hat{\boldsymbol e}_y)/\sqrt2$。对任意矢量 $\boldsymbol v$：$(\hat{\boldsymbol a}\cdot\boldsymbol v)^2-(\hat{\boldsymbol b}\cdot\boldsymbol v)^2=2v_xv_y$。由 \eqref{10.17}–\eqref{10.18}：
$$\sum_j2(\hat{\boldsymbol\epsilon}'_j)_x(\hat{\boldsymbol\epsilon}'_j)_y=2\cos^2\theta'\cos\phi'\sin\phi'-2\sin\phi'\cos\phi'=-\sin^2\theta'\sin2\phi' .$$
于是 $U(\hat{\boldsymbol e}_z)=-A\int d\Omega' f(\hat{\boldsymbol n}')\sin^2\theta'\sin(2\phi')$，即 \eqref{10.20}。

**(b)** $\hat{\boldsymbol k}=(\sin\theta_k,0,\cos\theta_k)$ 时 \eqref{10.26} 的三项含 $\phi'$ 的方式为 $\cos^2\phi'$、$\cos\phi'$、常数，它们都是 $\phi'$ 的偶函数，与奇函数 $\sin2\phi'$ 的 $\phi'\in[0,2\pi]$ 积分全为零。所以 $U=0$：$\boldsymbol k$ 在 $x$–$z$ 平面内时偏振全是 $Q$。（几何上：此时体系关于 $x$–$z$ 平面镜像对称，而 $U$ 在这一镜像下变号。）

**(c)** 对一般方向 \eqref{10.51}，与 \exref{10.2} 相同，只剩 $\frac32\sin^2\theta_k\sin^2\theta'\cdot\frac12\cos(2\phi'-2\phi_k)$ 一项与 $\sin2\phi'$ 配对：$\int_0^{2\pi}\cos(2\phi'-2\phi_k)\sin2\phi'\,d\phi'=\pi\sin2\phi_k$。所以
$$U=5A\Theta_2\cdot\frac32\sin^2\theta_k\cdot\frac{16}{15}\cdot\frac\pi2\sin2\phi_k=4\pi A\sin^2\theta_k\sin(2\phi_k)\Theta_2,$$
即 \eqref{10.28} 第二行。`}>
        <Tx>{R`本题关注标量扰动产生的 $U$ 偏振分量。

(a) 我们已证明，非偏振入射辐射产生的 $Q$ 偏振分量由 \eqref{10.19} 给出，它源自 \eqref{10.15}；$Q$ 分量取决于 $|\hat{\boldsymbol\epsilon}_i\cdot\hat{\boldsymbol e}_x|^2$ 与 $|\hat{\boldsymbol\epsilon}_i\cdot\hat{\boldsymbol e}_y|^2$ 之差。对 $U$ 分量，这里的 $\hat{\boldsymbol e}_x$、$\hat{\boldsymbol e}_y$ 必须换成转过 $45^\circ$ 的单位矢量，即 $(\hat{\boldsymbol e}_x+\hat{\boldsymbol e}_y)/\sqrt2$ 与 $(\hat{\boldsymbol e}_x-\hat{\boldsymbol e}_y)/\sqrt2$。作此替换，推导 \eqref{10.20}。

(b) 证明：波矢 $\boldsymbol k$ 位于 $x$–$z$ 平面内的平面波扰动，在出射的 $z$ 方向上不产生任何 $U$ 偏振。

(c) 对最一般取向的波矢`}</Tx>
        <Eq n="10.51" title="一般方向的波矢" say={R`波矢的一般方向：极角 $\theta$ 从视线量起，方位角 $\phi$ 给出它在天空上投影的方向。`}>{R`\hat{\boldsymbol k} = (\sin\theta\cos\phi,\ \sin\theta\sin\phi,\ \cos\theta),`}</Eq>
        <Tx>{R`证明 $U$ 偏振由 \eqref{10.28} 给出。`}</Tx>
      </Exercise>

      <Exercise n="10.4" title="画出标量平面波的偏振图样" level="★"
        hint={R`由 \eqref{10.28}：偏振方向角 $\psi$ 满足 $\tan2\psi=\tan2\phi_k$，即沿 $\phi_k$（$\Theta_2\cos(\boldsymbol k\cdot\boldsymbol x)>0$ 处）或 $\phi_k+90^\circ$（$<0$ 处）；振幅 $\propto\sin^2\theta_k$；强度沿 $\hat{\boldsymbol k}$ 的天空投影 $(\cos\phi_k,\sin\phi_k)$ 方向变化。`}
        solution={R`对标量平面波，沿天空某点看到的偏振为 $(Q,U)=4\pi A\sin^2\theta_k\Theta_2\cos(\boldsymbol k\cdot\boldsymbol x)\,(\cos2\phi_k,\sin2\phi_k)$，所以偏振棒的方向角 $\psi=\phi_k$（该处 $\Theta_2\cos(\boldsymbol k\cdot\boldsymbol x)>0$）或 $\psi=\phi_k+\frac\pi2$（$<0$），长度 $\propto\sin^2\theta_k|\cos(\boldsymbol k\cdot\boldsymbol x)|$；强度沿投影波矢 $(\cos\phi_k,\sin\phi_k)$ 方向以投影波数 $k\sin\theta_k$ 变化。四种情形：

(a) $\theta_k=\pi/8$，$\phi_k=\pi/8$：振幅因子 $\sin^2(\pi/8)=0.146$（很弱）；棒沿 $22.5^\circ$ 或 $112.5^\circ$，强度沿 $22.5^\circ$ 方向变化。
(b) $\theta_k=3\pi/4$，$\phi_k=\pi/4$：$\sin^2\theta_k=0.5$；棒沿 $45^\circ$ 或 $135^\circ$，强度沿 $45^\circ$ 变化。（$\theta_k>\pi/2$ 只是波矢指向观测者一侧，$\sin^2\theta_k$ 与 $\theta_k\to\pi-\theta_k$ 相同。）
(c) $\theta_k=3\pi/4$，$\phi_k=0$：$\sin^2\theta_k=0.5$；棒沿 $x$ 或 $y$，强度沿 $x$ 变化——即 \figref{10.3} 上排的图样，振幅减半。
(d) $\theta_k=3\pi/2$，$\phi_k=0$：$\theta_k$ 超出 $[0,\pi]$，按 \eqref{10.51} 等价于 $\hat{\boldsymbol k}=(-1,0,0)$，即 $\theta_k=\pi/2$、$\phi_k=\pi$；$\sin^2\theta_k=1$（最大），$\cos2\phi_k=1$：与 $\hat{\boldsymbol k}\parallel\hat{\boldsymbol e}_x$ 完全相同（$\pm\boldsymbol k$ 给出同一四极）。

每种情形中偏振方向都与强度变化方向平行或垂直——E 模。可用 \figref{10.3} 的交互图（纯 E，$\phi_l=\phi_k$）直接画出 (b)–(d) 的图样（交互图的振幅已归一化，$\sin^2\theta_k$ 只改变整体长度）。`}>
        {R`画出平面波标量扰动产生的偏振图样：(a) $\theta_k=\pi/8$，$\phi_k=\pi/8$；(b) $\theta_k=3\pi/4$，$\phi_k=\pi/4$；(c) $\theta_k=3\pi/4$，$\phi_k=0$；(d) $\theta_k=3\pi/2$，$\phi_k=0$。在每种情形中，证明偏振方向与偏振强度变化的方向对齐（或垂直）。`}
      </Exercise>

      <Exercise n="10.5" title={R`紧耦合极限下的 $\Pi$`} level="★★"
        hint={R`$\frac34(1-\mu^2)=\frac12[\mathcal P_0(\mu)-\mathcal P_2(\mu)]$；按 \eqref{5.66}，$\Theta_{P,l}=\frac{1}{(-i)^l}\int\frac{d\mu}{2}\mathcal P_l\Theta_P$，并用 $\int_{-1}^1\frac{d\mu}{2}\mathcal P_l\mathcal P_{l'}=\frac{\delta_{ll'}}{2l+1}$。`}
        solution={R`**(a)** $|\tau'|\to\infty$ 时 \eqref{10.31} 右边方括号必须为零（原书题干写"\eqref{10.32} 的右边"，应为 \eqref{10.31}）：
$$\Theta_P(\mu)=\frac34(1-\mu^2)\left[\Theta_2+\Theta_{P2}+\Theta_{P0}\right].$$
**(b)** 只保留单极与四极：$\Theta_P(\mu)=\Theta_{P0}\mathcal P_0-5\Theta_{P2}\mathcal P_2(\mu)$（由 $\Theta_P=\sum_l(-i)^l(2l+1)\Theta_{P,l}\mathcal P_l$）。右边 $\frac34(1-\mu^2)=\frac12\mathcal P_0-\frac12\mathcal P_2$。比较 $\mathcal P_0$、$\mathcal P_2$ 的系数：
$$\Theta_{P0}=\frac12\Pi,\qquad -5\Theta_{P2}=-\frac12\Pi\ \Rightarrow\ \Theta_{P2}=\frac1{10}\Pi,\qquad \Pi=\Theta_2+\Theta_{P2}+\Theta_{P0}.$$
**(c)** 两个方程 $\Theta_{P0}=\frac12(\Theta_2+\Theta_{P2}+\Theta_{P0})$、$\Theta_{P2}=\frac1{10}(\Theta_2+\Theta_{P2}+\Theta_{P0})$ 含三个未知数；用 $\Theta_2$ 表示两个偏振矩：第一式给 $\Theta_{P0}=\Theta_2+\Theta_{P2}$，代入第二式 $10\Theta_{P2}=2\Theta_2+2\Theta_{P2}$，得
$$\Theta_{P2}=\frac{\Theta_2}{4},\qquad \Theta_{P0}=\frac{5\Theta_2}{4}.$$
**(d)** $\Pi=\Theta_2+\frac14\Theta_2+\frac54\Theta_2=\frac52\Theta_2$。代入 \eqref{10.40} 即得 \eqref{10.41} 的系数 $\frac34\cdot\frac52=\frac{15}8$。（数值核对：对 $\Theta_P=\frac34(1-\mu^2)\Pi$ 直接数值积分，$\Theta_{P0}/\Pi=0.5000$，$\Theta_{P2}/\Pi=0.1000$，$\Pi/\Theta_2=2.500$。）`}>
        {R`求紧耦合极限下 $\Pi\equiv\Theta_2+\Theta_{P2}+\Theta_{P0}$ 的表达式。

(a) 当 $\tau'$ 非常大时，\eqref{10.32}（应为 \eqref{10.31}）右边乘以它的各项必须相消。写出 $\Theta_P(\mu)$ 用矩 $\Theta_2$、$\Theta_{P2}$、$\Theta_{P0}$ 表示的这一等式。

(b) 把 $\Theta_P(\mu)$ 按 Legendre 多项式展开，只保留单极与四极。然后令 $\mathcal P_0$ 与 $\mathcal P_2$ 的系数相等。

(c) 这得到含三个未知数的两个方程。证明用温度四极解出两个偏振矩，得 $\Theta_{P0}=5\Theta_2/4$、$\Theta_{P2}=\Theta_2/4$。

(d) 用 (c) 的结果求 $\Pi$ 用 $\Theta_2$ 的表示。`}
      </Exercise>

      <Exercise n="10.6" title={R`$h_+$ 分量是否产生 B 模？`} level="★★" fromBook
        hint={R`$\hat{\boldsymbol k}\parallel\hat{\boldsymbol e}_z$ 时 $h_+$ 的角度依赖为 $\sin^2\theta'\cos(2\phi')=\hat n'^2_x-\hat n'^2_y$；用 \eqref{10.49} 转动后对 $\sin2\phi'$ 积分。`}
        solution={R`**（附录 A）**$\boldsymbol k$ 沿 $z$ 轴时，张量扰动 $h_+$ 诱导的温度各向异性的角度依赖为
$$\sin^2\theta'\cos(2\phi')=\hat{\boldsymbol n}'_x\hat{\boldsymbol n}'_x-\hat{\boldsymbol n}'_y\hat{\boldsymbol n}'_y .$$
按 \eqref{10.49} 作转动，把 $\boldsymbol k$ 转到 \eqref{10.47}，角度依赖变为
$$(\cos\alpha\,\hat{\boldsymbol n}'_x-\sin\alpha\,\hat{\boldsymbol n}'_z)^2-\hat{\boldsymbol n}'_y\hat{\boldsymbol n}'_y .$$
其中出现的 $\phi'$ 依赖只有 $1$、$\cos\phi'$、$\cos^2\phi'$、$\sin^2\phi'$。按 \eqref{10.20} 以 $\sin2\phi'$ 为权重对 $\phi'$ 积分时，它们全部给零。所以在这一特定配置下，$h_+$ **不产生 $U$，因而不产生 B 模偏振**。（它产生 $Q$：数值积分给 $Q=-\frac{8\pi}{15}(1+\cos^2\alpha)A$，见 \figref{10.5} 交互图"张量 $h_+$"模式。）

**如何理解。**这是因为 $h_+$ 引起的时空畸变与垂直于 $\boldsymbol k$ 的坐标轴对齐（\figref{6.1}）：它的四极与标量情形"同向"，不旋转 $45^\circ$。要从 $h_+$ 看到 B 模偏振，需要考虑不在 $x$–$z$ 平面内的 $\boldsymbol k$（或者等价地，绕 $\hat{\boldsymbol k}$ 转 $45^\circ$ 后，$h_+$ 与 $h_\times$ 互换角色）。所以 $h_+$ 与 $h_\times$ 在统计上同样产生 B 模——单个配置中谁给 B 取决于坐标选择。`}>
        {R`正文中我们通过研究张量模分量 $h_\times$ 证明了张量模产生 B 模偏振。从 \eqref{10.47} 出发，对另一个分量 $h_+$ 重复这一推导。你能理解所得结果吗？（提示：研究 \eqref{10.50} 之后的讨论，并比较 \figref{6.1} 中两个分量的图样。）`}
      </Exercise>
    </Sec>);
}
