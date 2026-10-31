// 习题 11.1–11.11 —— 式 (11.64)–(11.70)。解答：11.1、11.4、11.8 依据原书附录 A；其余为编者给出（数值由 _ch11_phys.jsx 计算）。
import { Sec, Tx, Eq, Exercise, Table } from "@kit";

const R = String.raw;

export function Exercises() {
  return (
    <Sec n="11.E" title="Exercises" zh="习题">
      <Exercise n="11.1" title="关联函数是功率谱的 Fourier 变换" level="★" fromBook
        hint={R`把两个 $\delta$ 都写成 Fourier 积分，再用 $\langle\delta(\boldsymbol k)\delta(\boldsymbol k')\rangle=(2\pi)^3\delta_{\rm D}^{(3)}(\boldsymbol k+\boldsymbol k')P(k)$（\eqref{C.22}）。`}
        solution={R`对 \eqref{11.64} 做两次逆 Fourier 变换：
$$\langle\delta(\boldsymbol x)\delta(\boldsymbol x+\boldsymbol r)\rangle=\int\frac{d^3k}{(2\pi)^3}\int\frac{d^3k'}{(2\pi)^3}e^{i(\boldsymbol x\cdot\boldsymbol k+(\boldsymbol x+\boldsymbol r)\cdot\boldsymbol k')}\langle\delta(\boldsymbol k)\delta(\boldsymbol k')\rangle=\int\frac{d^3k}{(2\pi)^3}e^{-i\boldsymbol r\cdot\boldsymbol k}P_{\rm L}(k),\tag{A.138}$$
第二步用了 \eqref{C.22}（$\delta_{\rm D}$ 令 $\boldsymbol k'=-\boldsymbol k$，$\boldsymbol x$ 依赖相消——这正是均匀性）。这就是功率谱的（逆）Fourier 变换。注意到这里为止，该关系对各向异性功率谱（例如 $\delta_{\rm g,obs}$ 的）也成立。各向同性时可以完成角积分（$\int d\Omega_k\,e^{-ikr\cos\theta}=4\pi\sin(kr)/(kr)$），得
$$\xi(r)=\frac{1}{2\pi^2}\int_0^\infty k^2dk\,\frac{\sin kr}{kr}P_{\rm L}(k).\tag{A.139}$$
（本页 \figref{11.7} 交互版中的 $r^2\xi_0(r)$ 正是用这个式子算的。）`}>
        <Tx>{R`设关联函数定义为`}</Tx>
        <Eq n="11.64" say={R`两点关联函数：相距 $\boldsymbol r$ 的两点密度扰动乘积的系综平均。`}>{R`\xi(\boldsymbol r)\equiv\langle\delta(\boldsymbol x)\delta(\boldsymbol x+\boldsymbol r)\rangle.`}</Eq>
        <Tx>{R`对每个 $\delta$ 做 Fourier 展开并利用 \eqref{C.22}，证明这个定义意味着关联函数是功率谱的 Fourier 变换。`}</Tx>
      </Exercise>

      <Exercise n="11.2" title={R`增长率与 $\Omega_{\rm m}^{0.55}$ 近似`} level="★★"
        hint={R`今天的 $f=d\ln D_+/d\ln a$。$\Lambda$CDM 可用积分解 \eqref{8.77} 数值微分；$w\neq-1$ 时直接解增长方程 \eqref{8.75}（改写成 $\ln a$ 为自变量的一阶方程组）。`}
        solution={R`取原书基准 $\Omega_{\rm m}=0.3106$（平直）。

**$\Lambda$CDM（$w=-1$）。**由 \eqref{8.77} 数值微分得 $f(z=0)=0.5229$；近似 $\Omega_{\rm m}^{0.55}=0.3106^{0.55}=0.5257$。相对误差 $+0.5\%$。在 $z=0.57$、$1$ 处分别为 $0.7797$ 对 $0.7793$、$0.8746$ 对 $0.8740$，误差 $<0.1\%$——随着 $\Omega_{\rm m}(z)\to1$ 近似越来越好。

**$w=-0.5$。**数值解 \eqref{8.75} 得 $f(0)=0.5095$，而 $\Omega_{\rm m}^{0.55}=0.5257$（$\Omega_{\rm m}(z=0)$ 与 $w$ 无关），相对误差 $+3.2\%$。原因是增长指数 $\gamma$ 依赖物态：$\gamma\simeq0.55+0.05(1+w)$（Linder 2005），$w=-0.5$ 时 $\gamma\approx0.575$，$\Omega_{\rm m}^{0.575}=0.511$，误差降到 $0.3\%$。

本页 \figref{11.5} 的交互版可以对任意 $\Omega_{\rm m}$、$w$ 比较精确解与近似。`}>
        {R`数值计算 $\Lambda$CDM 宇宙中今天的线性增长率 $f$，并与近似 $f(z=0)=\Omega_{\rm m}^{0.55}$ 比较。近似与精确结果的相对误差是多少？对 $w=-0.5$ 的暗能量模型做同样的计算。`}
      </Exercise>

      <Exercise n="11.3" title="视向速度与红移空间位移的 RMS" level="★★"
        hint={R`由 \eqref{11.17}，$u_\parallel=\hat{\boldsymbol e}_z\cdot\boldsymbol u_{\rm m}=aHf\,i\mu_k\delta/k$。仿照 \exref{8.13}，$\langle u_\parallel^2\rangle_R=(aHf)^2\int\frac{d^3k}{(2\pi)^3}\frac{\mu_k^2}{k^2}P_{\rm L}(k)W^2(kR)$，对 $\mu_k$ 平均给出 $1/3$。`}
        solution={<><Tx>{R`**公式。**对方向平均 $\langle\mu_k^2\rangle=1/3$，
$$\sqrt{\langle u_\parallel^2\rangle}=aHf\left[\frac{1}{6\pi^2}\int_0^\infty dk\,P_{\rm L}(k,z)W^2(kR)\right]^{1/2},\qquad\sigma_{\rm RSD}\equiv\sqrt{\langle(u_\parallel/aH)^2\rangle}=f\left[\frac{1}{6\pi^2}\int dk\,P_{\rm L}W^2\right]^{1/2},$$
$W(x)=3(\sin x-x\cos x)/x^3$ 为实空间 tophat。与 $\sigma_8$ 相比，多出的 $1/k^2$ 使速度由**更大尺度**主导。物理速度 $v=c\,u_\parallel=100\,a E(z)\,\sigma_{\rm RSD}\,\mathrm{km\,s^{-1}}$（$\sigma_{\rm RSD}$ 以 $h^{-1}\mathrm{Mpc}$ 计）。

**数值**（基准 $\Lambda$CDM，EH98 线性谱，$\sigma_8=0.83$）：`}</Tx>
        <Table head={[R`$R\ [h^{-1}\mathrm{Mpc}]$`, R`$z=0$：$\sigma_{\rm RSD}$ / $v$`, R`$z=0.5$`, R`$z=1$`]} rows={[
        [R`$\to0$`, R`$3.1\,h^{-1}\mathrm{Mpc}$ / $312\,\mathrm{km/s}$`, R`$3.5$ / $306$`, R`$3.2$ / $283$`],
        [R`$5$`, R`$2.9$ / $292$`, R`$3.3$ / $286$`, R`$3.0$ / $265$`],
        [R`$10$`, R`$2.7$ / $272$`, R`$3.0$ / $267$`, R`$2.8$ / $246$`],
        [R`$20$`, R`$2.4$ / $239$`, R`$2.7$ / $235$`, R`$2.4$ / $217$`],
        [R`$50$`, R`$1.8$ / $179$`, R`$2.0$ / $175$`, R`$1.8$ / $162$`],
      ]} caption={R`\exref{11.3} 解答用表：线性理论的 RMS 红移空间位移 $\sigma_{\rm RSD}$ 与 RMS 视向速度（$f(0)=0.523$，$f(0.5)=0.758$，$f(1)=0.875$）。位移约 $3\,h^{-1}\mathrm{Mpc}$，确如正文所说 $\lesssim10\,h^{-1}\mathrm{Mpc}$；它随 $z$ 先增后减，因为 $f$ 增大而 $D_+$ 减小。**过渡波数**：当位移与所考察尺度相当，$k\sigma_{\rm RSD}\sim1$，即 $k\sim0.3\,h\,\mathrm{Mpc^{-1}}$ 时，线性压扁让位于非线性的拉长；实际上星系团内的非线性速度弥散（几百到上千 km/s）使过渡提前到 $k\sim0.1$–$0.2\,h\,\mathrm{Mpc^{-1}}$，这与 \figref{11.4} 中线性四极在 $k\gtrsim0.1$ 处开始高于数据一致。`} /></>}>
        {R`仿照 \exref{8.13} 计算密度场方差的做法（即用实空间 tophat 滤波），计算 RMS 视向速度 $\sqrt{\langle u_\parallel^2\rangle}$。使用 \eqref{11.17}。画出它在 $z=0,0.5,1$ 时作为滤波半径 $R$ 的函数。再计算相应的进入红移空间的位移的 RMS 值——我们已证明位移为 $u_\parallel/aH$。利用这一结果，你大致预期 \figref{11.3} 所示两种区域之间的过渡发生在什么波数？`}
      </Exercise>

      <Exercise n="11.4" title="红移空间功率谱的多极矩" level="★" fromBook
        hint={R`Legendre 正交性：$\int_{-1}^1d\mu\,\mathcal P_l(\mu)\mathcal P_{l'}(\mu)=\frac{2}{2l+1}\delta_{ll'}$（\eqref{C.2}）。把 $(b_1+f\mu^2)^2$ 中的 $\mu^2$、$\mu^4$ 用 $\mathcal P_0,\mathcal P_2,\mathcal P_4$ 表示。`}
        solution={R`\eqref{11.66} 直接由 Legendre 多项式的正交关系得到：把 \eqref{11.66} 代入 \eqref{11.65} 右边，$\frac{2l+1}2\int d\mu\,\mathcal P_l\sum_{l'}\mathcal P_{l'}P^{(l')}=\sum_{l'}\delta_{ll'}P^{(l')}=P^{(l)}$（只要 $P_{\rm g,obs}$ 作为 $\mu_k$ 的函数能用 Legendre 级数展开）。

对 \eqref{11.23} 做 $\mu$ 积分（$P_N$ 只进单极），得
$$P^{(0)}_{\rm g,obs}(k)=\left[1+\frac23\beta+\frac15\beta^2\right]b_1^2P_{\rm L}(k)\tag{A.140}$$
$$P^{(2)}_{\rm g,obs}(k)=\left[\frac43\beta+\frac47\beta^2\right]b_1^2P_{\rm L}(k),\tag{A.141}$$
其中 $\beta=f/b_1$。（补充：$\mu^2=\frac13\mathcal P_0+\frac23\mathcal P_2$，$\mu^4=\frac15\mathcal P_0+\frac47\mathcal P_2+\frac{8}{35}\mathcal P_4$，所以还有十六极 $P^{(4)}=\frac{8}{35}\beta^2b_1^2P_{\rm L}$，更高阶为零。三项之和精确重建 $(b_1+f\mu^2)^2$，见 \secref{11.1.2} 中的交互图。）`}>
        <Tx>{R`红移空间功率谱常按多极矩展开，定义为`}</Tx>
        <Eq n="11.65" say={R`第 $l$ 个多极矩：用 Legendre 多项式 $\mathcal P_l(\mu_k)$ 对功率谱的角度依赖做投影。`}>{R`P^{(l)}_{\rm g,obs}(k)=\frac{2l+1}{2}\int_{-1}^1d\mu_k\,\mathcal P_l(\mu_k)P_{\rm g,obs}(k,\mu_k)`}</Eq>
        <Tx>{R`其中 $P^{(l)}_{\rm g,obs}(k)$ 是功率谱的第 $l$ 个多极矩。利用 Legendre 多项式的正交性（\eqref{C.2}），证明这意味着`}</Tx>
        <Eq n="11.66" say={R`功率谱可由多极矩重建：角度依赖完全由一组 Legendre 系数描述。`}>{R`P_{\rm g,obs}(k,\mu_k)=\sum_l\mathcal P_l(\mu_k)P^{(l)}_{\rm g,obs}(k).`}</Eq>
        <Tx>{R`再说明单极与四极如何与线性物质功率谱相联系。各种情形都只考虑 RSD，忽略 AP 畸变参数 $\alpha_\parallel$、$\alpha_\perp$。`}</Tx>
      </Exercise>

      <Exercise n="11.5" title="红移空间中的关联函数" level="★★"
        hint={R`用 \exref{11.1} 的结果 $\xi(\boldsymbol r)=\int\frac{d^3k}{(2\pi)^3}e^{i\boldsymbol k\cdot\boldsymbol r}P(\boldsymbol k)$，把 $P_{\rm g,RSD}$ 写成 \eqref{11.66} 的多极和，再用平面波展开 $e^{i\boldsymbol k\cdot\boldsymbol r}=\sum_l i^l(2l+1)j_l(kr)\mathcal P_l(\hat{\boldsymbol k}\cdot\hat{\boldsymbol r})$ 与 Legendre 加法定理。`}
        solution={R`远距观测者近似下视线固定为 $\hat{\boldsymbol e}_z$。代入 $P_{\rm g,RSD}(k,\mu_k)=\sum_lP^{(l)}(k)\mathcal P_l(\mu_k)$。对 $\hat{\boldsymbol k}$ 的角积分利用
$$\int\frac{d\Omega_k}{4\pi}e^{i\boldsymbol k\cdot\boldsymbol r}\mathcal P_l(\hat{\boldsymbol k}\cdot\hat{\boldsymbol e}_z)=i^lj_l(kr)\,\mathcal P_l(\hat{\boldsymbol r}\cdot\hat{\boldsymbol e}_z)$$
（平面波展开 + 加法定理），于是红移空间关联函数也按 $\mu_r\equiv\hat{\boldsymbol r}\cdot\hat{\boldsymbol e}_z$ 的 Legendre 多项式展开：
$$\xi_{\rm s}(r,\mu_r)=\sum_{l=0,2,4}\xi_l(r)\mathcal P_l(\mu_r),\qquad\xi_l(r)=i^l\int_0^\infty\frac{k^2dk}{2\pi^2}P^{(l)}(k)j_l(kr).$$
代入 \exref{11.4} 的多极矩（$P_N$ 只贡献 $r=0$ 处的 $\delta$ 函数）：
$$\xi_0=\Big(1+\frac23\beta+\frac15\beta^2\Big)b_1^2\xi_{\rm L}(r),\quad\xi_2=-\Big(\frac43\beta+\frac47\beta^2\Big)b_1^2\int\frac{k^2dk}{2\pi^2}P_{\rm L}j_2(kr),\quad\xi_4=\frac{8}{35}\beta^2b_1^2\int\frac{k^2dk}{2\pi^2}P_{\rm L}j_4(kr).$$
（这就是 Hamilton 1992 的结果。）由于 $\int\frac{k^2dk}{2\pi^2}P_{\rm L}j_2(kr)=\xi_{\rm L}(r)-\bar\xi_{\rm L}(r)$，其中 $\bar\xi(r)=\frac{3}{r^3}\int_0^rr'^2\xi\,dr'$ 是半径 $r$ 内的平均关联，而大尺度上 $\bar\xi>\xi$，所以 $\xi_2<0$：与功率谱四极为正相对应，等关联线沿视线被**压扁**。`}>
        {R`正文说明了红移空间畸变怎样影响功率谱。说明在平空近似下红移空间畸变怎样影响关联函数。`}
      </Exercise>

      <Exercise n="11.6" title={R`证明 \eqref{11.46}`} level="★★"
        hint={R`两次使用 \eqref{C.17}：$e^{i\boldsymbol k\cdot\boldsymbol x}=4\pi\sum_{lm}i^lj_l(kx)Y_{lm}(\hat{\boldsymbol x})Y^*_{lm}(\hat{\boldsymbol k})$。对 $\hat{\boldsymbol k}$ 积分用球谐正交性。`}
        solution={R`把 \eqref{11.68} 中的两个指数都用 \eqref{C.17} 展开（第二个取复共轭）：
$$\delta_{\rm D}^{(3)}(\boldsymbol x-\boldsymbol x')=\int\frac{k^2dk\,d\Omega_k}{(2\pi)^3}(4\pi)^2\sum_{lm}\sum_{l'm'}i^{l-l'}j_l(kx)j_{l'}(kx')Y_{lm}(\hat{\boldsymbol x})Y^*_{lm}(\hat{\boldsymbol k})Y^*_{l'm'}(\hat{\boldsymbol x}')Y_{l'm'}(\hat{\boldsymbol k}).$$
对 $\hat{\boldsymbol k}$ 积分得 $\delta_{ll'}\delta_{mm'}$，前置因子 $(4\pi)^2/(2\pi)^3=2/\pi$：
$$\delta_{\rm D}^{(3)}(\boldsymbol x-\boldsymbol x')=\sum_{lm}\left[\frac2\pi\int k^2dk\,j_l(kx)j_l(kx')\right]Y_{lm}(\hat{\boldsymbol x})Y^*_{lm}(\hat{\boldsymbol x}').$$
与 \eqref{11.67} 第二行逐项比较。由于 $\{Y_{lm}(\hat{\boldsymbol x})Y^*_{lm}(\hat{\boldsymbol x}')\}$ 作为 $(\hat{\boldsymbol x},\hat{\boldsymbol x}')$ 的函数线性无关，而两式必须对任意方向都相等，系数必须对每个 $l$ 分别相等：
$$\frac2\pi\int k^2dk\,j_l(kx)j_l(kx')=\frac{1}{x^2}\delta_{\rm D}^{(1)}(x-x'),\qquad l=0,1,\ldots$$
即 \eqref{11.46}（$x\to\chi$）。`}>
        <Tx>{R`证明 \eqref{11.46}。先把三维 Dirac $\delta$ 函数改写到球极坐标中，并利用球谐函数的完备性：`}</Tx>
        <Eq n="11.67" say={R`三维 $\delta$ 函数等于径向 $\delta$ 函数乘以球面上的 $\delta$ 函数、再除以 $x^2$，后者用球谐函数的完备性展开。`}>{R`\begin{aligned}\delta_{\rm D}^{(3)}(\boldsymbol x-\boldsymbol x')&=\frac{1}{x^2}\delta_{\rm D}^{(1)}(x-x')\delta_{\rm D}^{(S^2)}(\hat{\boldsymbol x}-\hat{\boldsymbol x}')\\ &=\frac{1}{x^2}\delta_{\rm D}^{(1)}(x-x')\sum_{lm}Y_{lm}(\hat{\boldsymbol x})Y^*_{lm}(\hat{\boldsymbol x}').\end{aligned}`}</Eq>
        <Tx>{R`第二行来自这样一个事实：任何定义在单位球面上的函数，与 $\delta_{\rm D}^{(S^2)}(\hat{\boldsymbol x}-\hat{\boldsymbol x}')$ 积分都应给出它在 $\hat{\boldsymbol x}$ 处的值，而这个值又可以表示为 $Y_{lm}(\hat{\boldsymbol x})$ 乘以函数相应多极系数的和。接着用 Dirac $\delta$ 函数的 Fourier 空间表示`}</Tx>
        <Eq n="11.68" say={R`$\delta$ 函数是所有平面波的等权叠加。`}>{R`\delta_{\rm D}^{(3)}(\boldsymbol x-\boldsymbol x')=\int\frac{d^3k}{(2\pi)^3}e^{i\boldsymbol k\cdot(\boldsymbol x-\boldsymbol x')},`}</Eq>
        <Tx>{R`以及指数函数的球展开 \eqref{C.17}（用两次）。最后论证：\eqref{11.67} 必须普遍成立这一事实意味着 \eqref{11.46} 对所有 $l=0,1,\ldots$ 分别成立。`}</Tx>
      </Exercise>

      <Exercise n="11.7" title="Limber 近似的精度" level="★★★"
        hint={R`(a) 大 $l$ 时 $j_l(x)$ 在 $x<l+\frac12$ 处指数衰减，在转折点 $x\approx l+\frac12$ 附近按 Airy 函数行为，过渡宽度 $\propto l^{1/3}$。(b) 精确式中的不等时功率谱在线性理论下可分离：$P(k,\eta,\eta')=P_{\rm L}(k,0)\,g(\chi)g(\chi')$，$g=D_+/D_+(0)$，于是 \eqref{11.44} 化为 $\frac2\pi\int k^2dk\,P_{\rm L}(k)\big[\int d\chi\,Wg\,j_l(k\chi)\big]^2$。`}
        solution={<><Tx>{R`**(a)** 取 $\chi=\chi'$，以 $u=k\chi$ 为变量。$u<\nu\equiv l+\frac12$ 时 $j_l(u)$ 指数小；转折点之后，WKB 给出 $u^2j_l^2(u)\simeq\frac{u}{\sqrt{u^2-\nu^2}}\sin^2\phi(u)$，包络从转折点处的大值单调降到 1。所以被积核的第一个峰也是最高的峰，位于 $u\simeq\nu+0.81\nu^{1/3}$（数值：$l=10,30,100,300$ 时峰位 $12.4,33.2,104.3,305.9$），峰高 $\propto l^{1/3}$（$1.73,2.35,3.40,4.84$），峰宽 $\Delta u\propto l^{1/3}$；相对宽度 $\propto l^{-2/3}\to0$。峰之后的振荡（均值 $1/2$）乘以随 $k$ 下降的 $P(k)$ 后贡献很小（\figref{11.8} 交互版可直接看到）。$\chi\neq\chi'$ 时，两个 Bessel 函数的振荡相位以 $k(\chi-\chi')$ 的速率失配，峰之后正负交替相消；$|\chi-\chi'|\gg\chi\,l^{-2/3}$ 时积分几乎为零——这就是 $\delta_{\rm D}(\chi-\chi')$ 的来源。

**(b)** 取 $W(\chi)$ 为中心 $\chi(z=1)=2298\,h^{-1}\mathrm{Mpc}$、宽 $\sigma_\chi=\Delta z/H(1)=337\,h^{-1}\mathrm{Mpc}$ 的 Gaussian，基准 $\Lambda$CDM 线性谱。数值结果（$b_1=1$）：`}</Tx>
        <Table head={[R`$l$`, R`$C_l^{\rm exact}$`, R`$C_l^{\rm Limber}$`, R`$C_l^{\rm Limber}/C_l^{\rm exact}$`]} rows={[
        [R`$2$`, R`$4.74\times10^{-7}$`, R`$2.75\times10^{-7}$`, R`$0.580$`],
        [R`$5$`, R`$6.71\times10^{-7}$`, R`$5.58\times10^{-7}$`, R`$0.831$`],
        [R`$10$`, R`$9.76\times10^{-7}$`, R`$9.24\times10^{-7}$`, R`$0.946$`],
        [R`$30$`, R`$1.529\times10^{-6}$`, R`$1.526\times10^{-6}$`, R`$0.998$`],
        [R`$100$`, R`$8.78\times10^{-7}$`, R`$8.79\times10^{-7}$`, R`$1.001$`],
      ]} caption={R`\exref{11.7}(b) 解答用表。Limber 近似在低 $l$ 处**低估**功率（它丢掉了视向波数 $\mu_kk\lesssim1/\sigma_\chi$ 的贡献，而 $l$ 小时这些模式与 $l/\chi$ 相比不可忽略）；误差约按 $1/l^2$ 下降，$l\gtrsim20$ 时优于 1%。用 $l+\frac12$ 而不是 $l$ 很重要：若取 $k=l/\chi$，$l=10$ 处的误差会从 5% 增大到约 9%，$l=5$ 处从 17% 增大到约 23%。`} /></>}>
        {R`(a) 假设 $\chi=\chi'$，对不同的 $l$ 画出 \eqref{11.45} 的被积函数作为 $k$ 与 $\chi$ 的函数。$l\gg1$ 时，峰的位置与宽度大致怎样随 $l$ 标度？若 $\chi\neq\chi'$ 会怎样？

(b) 对 $l=2,5,10,30$ 计算精确积分 \eqref{11.44} 与 Limber 近似 \eqref{11.47}。假设 $W(\chi)$ 是以 $\chi(z=1)$ 为中心的 Gaussian，其 RMS 对应红移不确定度 $\Delta z=0.2$。经验地确定 Limber 近似的精度作为 $l$ 的函数。`}
      </Exercise>

      <Exercise n="11.8" title={R`全天的 $w_{\rm g}(\theta)$ 与 $C_{\rm g}(l)$`} level="★★" fromBook
        hint={R`两边乘以 $\mathcal P_{l'}(\cos\theta)$ 并对 $\cos\theta$ 积分。小尺度上用 $J_0(l\theta)\to\mathcal P_l(\cos\theta)$。`}
        solution={R`把这样定义的角功率谱记作 $\hat C_{\rm g}(l)$，为了用 $w_{\rm g}$ 表示它，在 \eqref{11.69} 两边乘以 $\mathcal P_{l'}(\cos\theta)$ 并对 $\cos\theta$ 积分，得
$$\hat C_{\rm g}(l)=2\pi\int_{-1}^1d\cos\theta\,\mathcal P_l(\cos\theta)w_{\rm g}(\theta).\tag{A.142}$$
（$w_{\rm g}$ 再由 \eqref{11.39} 与 \exref{11.1} 写成 $P_{\rm g,obs}(\boldsymbol k)$ 的积分，即得 $\hat C_{\rm g}$ 作为三维功率谱的积分。）像 \eqref{11.49} 第一行那样把 $w_{\rm g}$ 表示为二维功率谱的积分，则
$$\hat C_{\rm g}(l)=\int_0^\infty dl'\,l'C_{\rm g}(l')\int_{-1}^1d\cos\theta\,\mathcal P_l(\cos\theta)J_0(l'\theta).\tag{A.143}$$
$l'$ 很大时 Bessel 函数变为
$$J_0(l'\theta)\xrightarrow{l'\gg1}\mathcal P_{l'}(\cos\theta).\tag{A.144}$$
因此对 $\theta$ 的积分除非 $l=l'$ 否则为零，$l=l'$ 时等于 $2/(2l+1)$。大 $l'$ 时对 $l'$ 的积分等同于对 $l'$ 求和。分母中的因子 $2/(2l+1)\approx1/l$ 与分子中的 $l'$ 相消，留下所要的等式 $\hat C_{\rm g}(l)=C_{\rm g}(l)$。`}>
        <Tx>{R`把星系角关联函数分解为多极矩之和：`}</Tx>
        <Eq n="11.69" say={R`全天的角关联函数是角功率谱的 Legendre 级数，每个多极的权重为 $(2l+1)/4\pi$。`}>{R`w_{\rm g}(\theta)=\sum_{l=1}^\infty\frac{2l+1}{4\pi}C_{\rm g}(l)\mathcal P_l(\cos\theta).`}</Eq>
        <Tx>{R`把 $C_{\rm g}(l)$ 表示为对三维星系功率谱 $P_{\rm g,obs}(\boldsymbol k)$ 的积分。证明在小尺度上，这样定义的 $C_{\rm g}(l)$ 与 \secref{11.2} 推出的相等。`}</Tx>
      </Exercise>

      <Exercise n="11.9" title={R`从 \eqref{11.51} 到 \eqref{11.54}`} level="★★★"
        hint={R`用 \eqref{5.18} 的 $\sum|\mathcal M|^2=32\pi\sigma_{\rm T}m_e^2$；只保留 \eqref{11.52} 的二阶项；$z$ 轴取沿电子动量，$[(\boldsymbol p-\boldsymbol p')\cdot\boldsymbol q]^2=q^2(p_z-p'_z)^2$；对 $p'$ 分部积分两次；最后对 $\mu'$ 积分、对 $\mu=p_z/p$ 平均。`}
        solution={R`完整推导见 \eqref{11.54} 下方的折叠推导框。要点：(1) 前置因子 $\frac{\pi}{2m_ep}\cdot\frac{1}{2m_e}\cdot\frac{1}{2p'}\cdot32\pi\sigma_{\rm T}m_e^2=\frac{4\pi^2\sigma_{\rm T}}{pp'}$；(2) 二阶项的 $\frac12$ 与之合成 $\frac{2\pi^2\sigma_{\rm T}}{m_e^2p}q^2$；(3) 分部积分两次把 $\partial^2_{p'}$ 移到 $p'(p_z-p'_z)^2[f(p')-f(p)]$ 上；(4) 因 $f(p')-f(p)$ 在 $p'=p$ 处为零，只剩 $2g'f'+gf''$，$g=p'(p\mu-p'\mu')^2$；(5) 角积分与平均给出 $\frac{8\pi}3p^2(4f'+pf'')$；(6) 电子动能 $\int\frac{d^3q}{(2\pi)^3}f_eq^2=\frac32m_en_eT_e$。合起来
$$C[f]\big|_{\rm SZ}=\frac{2\pi^2\sigma_{\rm T}}{m_e^2p}\cdot\frac32m_en_eT_e\cdot\frac{1}{(2\pi)^3}\cdot\frac{8\pi}{3}p^2\big(4f'+pf''\big)=\frac{n_eT_e\sigma_{\rm T}}{m_e}\big(4pf'+p^2f''\big).$$
注意：正文 \eqref{11.53} 已按勘误改为前置因子带 $1/p$、末因子为 $f(p')-f(p)$；照原书印刷形式（无 $1/p$、末因子 $f(p)-f(p')$）得不到 \eqref{11.54}。`}>
        {R`推导从 \eqref{11.51} 到 \eqref{11.54} 的步骤。`}
      </Exercise>

      <Exercise n="11.10" title="光子数守恒与真正的谱畸变" level="★★"
        hint={R`(a) $\int d^3p=4\pi\int p^2dp$。(b) 温度改变 $\delta T$ 与化学势 $\mu_c$ 的一阶效应分别正比于 $x\,\partial_xf^{(0)}$ 与 $\partial_xf^{(0)}$。`}
        solution={R`**(a)** $\int\frac{d^3p}{(2\pi)^3}C[f]\big|_{\rm SZ}=\frac{n_eT_e\sigma_{\rm T}}{m_e}\frac{4\pi}{(2\pi)^3}\int_0^\infty dp\,\frac{\partial}{\partial p}\Big[p^4\frac{\partial f}{\partial p}\Big]=\frac{n_eT_e\sigma_{\rm T}}{2\pi^2m_e}\Big[p^4\frac{\partial f}{\partial p}\Big]_0^\infty=0$，因为 $p\to0$ 时 $p^4\partial_pf\to-p^2T\to0$（黑体 $f\to T/p$），$p\to\infty$ 时指数衰减。所以光子数 $n_\gamma=\int\frac{d^3p}{(2\pi)^3}f$ 守恒。全导数形式（$p^{-2}\partial_p[p^4\partial_pf]$）正是"动量空间中的扩散流"，流在两端为零。

**(b)** 显式计算（见正文 \eqref{11.59} 后的例题框）：
$$\Delta f=y\,\frac{x\,e^x}{(e^x-1)^2}\left[x\frac{e^x+1}{e^x-1}-4\right].$$
若畸变能被温度改变 $T\to T(1+\epsilon)$ 与小化学势 $\mu_c$ 吸收，则（$f=1/(e^{x/(1+\epsilon)+\mu_c/T}-1)$ 展开到一阶）$\Delta f=-\epsilon\,x\,\partial_xf^{(0)}+\frac{\mu_c}{T}\partial_xf^{(0)}=\frac{e^x}{(e^x-1)^2}\Big(\epsilon x-\frac{\mu_c}{T}\Big)$——方括号里只能是 $x$ 的**一次**函数。而 SZ 的方括号 $x^2\coth(x/2)-4x$ 不是一次函数（大 $x$ 时 $\propto x^2$），所以不存在 $\epsilon$、$\mu_c$ 使二者相等：这是**真正的谱畸变**。（另一个角度：SZ 保持光子数却增加了能量密度——$\Delta\rho_\gamma/\rho_\gamma=4y$——而保持黑体形状的温度改变不可能同时做到这两点。）`}>
        {R`(a) 证明 \eqref{11.54} 中的碰撞项对所有 $p$ 的积分为零，因而光子数守恒。

(b) 显式计算 \eqref{11.58} 的右边，证明它对应一个谱畸变，即不能被修改温度与化学势所吸收。`}
      </Exercise>

      <Exercise n="11.11" title="SZ 零点" level="★"
        hint={R`令 $\partial_x[x^4\partial_xf^{(0)}]=0$，即 $4\partial_xf^{(0)}+x\partial_x^2f^{(0)}=0$。在 $x=4$ 附近做一步 Newton 迭代。$k_{\rm B}/h=20.837\,\mathrm{GHz/K}$。`}
        solution={R`**方程。**$\partial_xf^{(0)}=-\frac{e^x}{(e^x-1)^2}$，$\partial_x^2f^{(0)}=\frac{e^x(e^x+1)}{(e^x-1)^3}$。$4\partial_xf^{(0)}+x\partial_x^2f^{(0)}=0$ 两边乘以 $(e^x-1)^3/e^x$：$-4(e^x-1)+x(e^x+1)=0$，即 $(4-x)e^x=4+x$，\eqref{11.70}。

**微扰估计。**记 $g(x)=(4-x)e^x-4-x$，$g(4)=-8$，$g'(x)=(3-x)e^x-1$，$g'(4)=-e^4-1=-55.6$。Newton 一步：$x\approx4-g(4)/g'(4)=4-8/55.6=3.856$。（或者令 $x=4-\epsilon$：$\epsilon e^{4-\epsilon}\approx8$，$\epsilon\approx8e^{-4}=0.147$，$x\approx3.853$。）与精确解 $x=3.830$ 相差 $0.7\%$；再迭代一次即得 $3.8301$。

**频率。**$\nu=x\,k_{\rm B}T/h=3.830\times20.837\,\mathrm{GHz\,K^{-1}}\times2.726\,\mathrm{K}=217.5\,\mathrm{GHz}$。这就是 SZ 巡天（如 Planck、ACT、SPT）在 $\sim150\,\mathrm{GHz}$ 看到星系团为"冷斑"、在 $\sim270$–$350\,\mathrm{GHz}$ 看到"热斑"、在 $217\,\mathrm{GHz}$ 几乎看不到的原因。`}>
        <Tx>{R`SZ 效应在高频增强观测谱、在低频压低它。求畸变为零的频率（"SZ 零点"）。证明令 \eqref{11.58} 第二项中的导数为零导出`}</Tx>
        <Eq n="11.70" say={R`SZ 零点满足的超越方程：左边在 $x=3$ 处取极大，在 $x=4$ 处降为零，所以根略小于 4。`}>{R`(4-\sym{ch11-xsz}{x})e^{\sym{ch11-xsz}{x}}=4+\sym{ch11-xsz}{x}.`}</Eq>
        <Tx>{R`可以数值求解；也可以注意到左边在 $x=3$ 处取极大，此时它远大于右边，然后在 $x=4$ 处降为零。所以两边相等处 $x$ 略低于 4。在 $x=4$ 附近做微扰展开，得到这个解的估计。与实际解 $x=3.83$ 比较。对 $T=2.726\,\mathrm{K}$ 的 CMB，它对应什么频率？`}</Tx>
      </Exercise>
    </Sec>);
}
