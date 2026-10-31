// §B 态空间与 Dirac 记号 —— 式 (B-1)–(B-63)，表 (II-5)、(II-6)，图 1、图 2（自绘）
import { Sec, Sub, Tx, Eq, Box, Derivation, Table, C } from "@kit";
import { PeakPlot, AdjointDiagram, IFig } from "./_ch02_plots.jsx";

const R = String.raw;

export function SecB() {
  return (
    <Sec n="B" title="State space. Dirac notation" zh="态空间与 Dirac 记号"
      gist={R`把"态"从具体的函数中解放出来：态是抽象空间 $\mathscr E$ 中的**右矢** $\ket{\psi}$，线性泛函是**左矢** $\bra{\chi}$，二者拼成数 $\braket{\chi|\psi}$；反过来拼成 $\ket{\psi}\bra{\varphi}$ 就是**算符**（如投影算符）。最后定义**厄米共轭** $A^\dagger$ 与**厄米算符**。`}
      why={R`§A 发现同一个态可以用许多组不同的"分量"描述（$c_i$、$\bar\psi(\mathbf p)$、$\psi(\mathbf r_0)$……）。与其每次都偏爱某一组，不如像几何矢量那样直接对"矢量本身"运算；而且有些系统（自旋）根本没有波函数，只能用抽象矢量描述。`}
      gives={["B-3", "B-4", "B-6", "B-32", "B-37", "B-41", "B-47", "B-49", "B-55", "B-60"]}>
      <p className="muted">本节概念：<C id="ket_bra" /> · <C id="projector" /> · <C id="adjoint" /></p>

      <Sub n="B-1" title="Introduction" zh="引言：为什么要抽象">
        <Tx>{R`**从 §A 的一个尴尬说起。**我们手里同一个态，至少有四种等价的"写法"：`}</Tx>
        <Table caption={R`表 (II-5)：同一个波函数在四组基下的分量`} head={[R`基`, R`$\psi(\mathbf r)$ 的分量`]} rows={[
          [R`$u_i(\mathbf r)$`, R`$c_i,\ i=1,2,\dots,n,\dots$`],
          [R`$v_{\mathbf p}(\mathbf r)$`, R`$\bar\psi(\mathbf p)$`],
          [R`$\xi_{\mathbf r_0}(\mathbf r)$`, R`$\psi(\mathbf r_0)$`],
          [R`$w_\alpha(\mathbf r)$`, R`$c(\alpha)$`],
        ]} />
        <Tx>{R`最后一行之外的三行都已经说明：$\psi(\mathbf r)$ 本身并不比 $\{c_i\}$ 或 $\bar\psi(\mathbf p)$ 更"根本"——它只是 $\delta$ 函数基里的分量。既然如此，把理论建立在某一种写法上就像只用一套固定坐标轴做几何：能做，但公式啰嗦，而且一换坐标就得重推一遍。几何学的解决办法是直接对**矢量本身**运算；我们也这样做。

**新的约定。**粒子的每个量子态用一个**态矢量**表示，它属于一个抽象的**态空间** $\mathscr E_{\mathbf r}$（因 $\mathscr F\subset L^2$，它是一个 Hilbert 空间的子空间）。本节建立这个空间里的记号与运算规则。

**抽象不只为了省事。**自旋自由度（第 IV、IX 章）根本没有"波函数"可言，只能用抽象矢量描述。所以第 III 章的第一条假设将直接用态空间来陈述：任何系统的量子态都由其态空间 $\mathscr E$ 中的一个矢量表征。下面的概念对任何系统都成立，只是举例时用熟悉的无自旋粒子。`}</Tx>
      </Sub>

      <Sub n="B-2" title="“Ket” vectors and “bra” vectors" zh="右矢与左矢">
        <Sub n="B-2-a" title="Elements of E: kets" zh="$\mathscr E$ 的元素：右矢（ket）">
          <Tx>{R`Dirac 给态矢量起名为**右矢**（ket），写成 $\ket{\ }$，中间放一个识别标记。对单粒子，规定每个平方可积函数对应一个右矢：`}</Tx>
          <Eq n="B-1" say="每个平方可积的波函数对应态空间中的一个右矢，反之亦然：两个空间同构，但右矢不再带有 r 依赖。">{R`\psi(\mathbf r)\in\mathscr F\iff\ket{\psi}\in\mathscr E_{\mathbf r}`}</Eq>
          <Tx>{R`两点要注意。第一，$\ket{\psi}$ 里**没有 $\mathbf r$**：字母 $\psi$ 只是"这是哪个态"的标签。$\mathbf r$ 依赖到 §E 会以另一种身份回来——作为某个特定基中分量的指标（参见 §A-3-b 与表 (II-5)）。第二，$\mathscr F$ 与 $\mathscr E_{\mathbf r}$ 虽然同构，我们仍把它们分开：前者是函数，后者是抽象矢量；这样才给自旋之类的推广留下余地。一维运动的对应空间记为 $\mathscr E_x$。

标量积直接继承：两个右矢的标量积就是对应函数的标量积，满足 \eqref{A-5}–\eqref{A-7}。下面会看到，有了"左矢"，这个标量积有一个更好的写法。`}</Tx>
        </Sub>

        <Sub n="B-2-b" title="Elements of the dual space E* of E: bras" zh="对偶空间 $\mathscr E^*$ 的元素：左矢（bra）">
          <Tx>{R`**一种新对象：吃右矢、吐数的机器。**一个**线性泛函** $\chi$ 给每个右矢指定一个复数，并且对右矢的线性组合是线性的：`}</Tx>
          <Eq n="B-2" say="线性泛函把一个右矢变成一个数，并且对右矢的线性组合是线性的。">{R`\begin{aligned}&\ket{\psi}\in\mathscr E\ \xrightarrow{\ \chi\ }\ \text{数}\ \chi(\ket{\psi})\\&\chi(\lambda_1\ket{\psi_1}+\lambda_2\ket{\psi_2})=\lambda_1\chi(\ket{\psi_1})+\lambda_2\chi(\ket{\psi_2})\end{aligned}`}</Eq>
          <Box kind="warning" title="线性泛函与线性算符">{R`二者都是线性运算，区别在于输出：线性**泛函**把右矢变成**数**，线性**算符**把右矢变成另一个**右矢**。`}</Box>
          <Tx>{R`全体线性泛函本身也组成矢量空间——$\mathscr E$ 的**对偶空间** $\mathscr E^*$。它的元素叫**左矢**（bra），写成 $\bra{\ }$。左矢 $\bra{\chi}$ 作用在右矢 $\ket{\psi}$ 上得到的数，就把两个符号拼起来写：`}</Tx>
          <Eq n="B-3" keyEq title="左矢作用于右矢" say="左矢就是一台'吃进右矢、吐出复数'的机器；把左矢和右矢并排写在一起，就表示这个数。">{R`\chi(\ket{\psi})=\braket{\chi|\psi}`}</Eq>
          <Tx>{R`名字是个文字游戏：英文 bracket（括号）$\langle\ |\ \rangle$ 拆成左半 "bra" 与右半 "ket"。`}</Tx>
        </Sub>

        <Sub n="B-2-c" title="Correspondence between kets and bras" zh="右矢与左矢的对应">
          <Tx>{R`**从右矢造左矢。**有了标量积，每个右矢 $\ket{\varphi}$ 天然地定义了一台"打分机"：拿任意 $\ket{\psi}$ 来，和 $\ket{\varphi}$ 作标量积。这台机器就记作 $\bra{\varphi}$：`}</Tx>
          <Eq n="B-4" keyEq title="由右矢定义左矢" say="与右矢 $\varphi$ 对应的左矢，就是'与 $\varphi$ 作标量积'这一运算；于是 $\langle \varphi|\psi\rangle$ 既是泛函作用的结果，也是标量积。">{R`\braket{\varphi|\psi}=(\ket{\varphi},\ket{\psi})`}</Eq>
          <Tx>{R`**对应是反线性的。**因为标量积对左边反线性，把 $\lambda_1\ket{\varphi_1}+\lambda_2\ket{\varphi_2}$ 放在左边算一遍：`}</Tx>
          <Eq n="B-5" say="右矢线性组合所对应的左矢：组合系数要取复共轭。">{R`\begin{aligned}(\lambda_1\ket{\varphi_1}+\lambda_2\ket{\varphi_2},\ket{\psi})&=\lambda_1^*(\ket{\varphi_1},\ket{\psi})+\lambda_2^*(\ket{\varphi_2},\ket{\psi})\\&=\lambda_1^*\braket{\varphi_1|\psi}+\lambda_2^*\braket{\varphi_2|\psi}\\&=(\lambda_1^*\bra{\varphi_1}+\lambda_2^*\bra{\varphi_2})\ket{\psi}\end{aligned}`}</Eq>
          <Tx>{R`对一切 $\ket{\psi}$ 都成立，于是`}</Tx>
          <Eq n="B-6" keyEq title="右矢 $\to$ 左矢是反线性的" say="从右矢到左矢的对应是反线性的：系数一律取复共轭。">{R`\lambda_1\ket{\varphi_1}+\lambda_2\ket{\varphi_2}\Longrightarrow\lambda_1^*\bra{\varphi_1}+\lambda_2^*\bra{\varphi_2}`}</Eq>
          <Box kind="warning" title="记号陷阱：$\ket{\lambda\psi}$ 与 $\bra{\lambda\psi}$">
            <Tx>{R`有时把数写进右矢里：`}</Tx>
            <Eq n="B-7" say="把数写进右矢符号里面，只是 $\lambda|\psi\rangle$ 的另一种写法。">{R`\ket{\lambda\psi}=\lambda\ket{\psi}`}</Eq>
            <Tx>{R`那么 $\bra{\lambda\psi}$ 指的是**它对应的左矢**，按反线性：`}</Tx>
            <Eq n="B-8" say="把数从左矢符号里拿出来时要取复共轭。">{R`\bra{\lambda\psi}=\lambda^*\bra{\psi}`}</Eq>
          </Box>
          <Tx>{R`从此标量积统一写成 $\braket{\varphi|\psi}$，§A-1-b 的性质换上新装：`}</Tx>
          <Eq n="B-9" say="交换左右两个矢量，标量积取复共轭。">{R`\braket{\varphi|\psi}=\braket{\psi|\varphi}^*`}</Eq>
          <Eq n="B-10" say="标量积对右矢线性。">{R`\braket{\varphi|\lambda_1\psi_1+\lambda_2\psi_2}=\lambda_1\braket{\varphi|\psi_1}+\lambda_2\braket{\varphi|\psi_2}`}</Eq>
          <Eq n="B-11" say="标量积对左边的矢量反线性。">{R`\braket{\lambda_1\varphi_1+\lambda_2\varphi_2|\psi}=\lambda_1^*\braket{\varphi_1|\psi}+\lambda_2^*\braket{\varphi_2|\psi}`}</Eq>
          <Eq n="B-12" say="右矢与自身的标量积（范数平方）是正实数，只有零矢量的为零。">{R`\braket{\psi|\psi}\ \text{为正实数；当且仅当}\ \ket{\psi}=0\ \text{时为零}`}</Eq>
          <p className="muted">以上 (B-9)–(B-12) 即原书表 (II-6)。</p>

          <Tx>{R`**反过来呢？每个左矢都来自某个右矢吗？**有限维时是的（$\mathscr E^*$ 与 $\mathscr E$ 同构）。无穷维时不然——而且反例恰恰是 §A-3 那两组"连续基"。机制是同一个：**造一列真正的右矢，让它们越来越像 $\delta$ 函数（或平面波）；右矢序列的范数发散、没有极限，可对应的左矢序列却收敛**。

**反例一：越来越窄的尖峰。**取光滑实函数 $\xi^{(\varepsilon)}_{x_0}(x)$：中心在 $x_0$、宽 $\varepsilon$、高 $1/\varepsilon$、积分为 1（见下面的交互图，或附录 II §1-b）。$\varepsilon\neq0$ 时它平方可积（范数平方 $\sim1/\varepsilon$），对应一个正经右矢：`}</Tx>
          <Eq n="B-13" say="宽度为 $\varepsilon$ 的尖峰函数对应一个真正的（可归一化的）右矢。">{R`\xi^{(\varepsilon)}_{x_0}(x)\iff\ket{\xi^{(\varepsilon)}_{x_0}}`}</Eq>
          <Tx>{R`它的左矢作用在任意 $\ket{\psi}$ 上，给出 $\psi$ 在 $x_0$ 附近的加权平均：`}</Tx>
          <Eq n="B-14" say="尖峰左矢作用在 $\psi$ 上，就是 $\psi$ 在 $x_0$ 附近宽度 $\varepsilon$ 范围内的加权平均。">{R`\braket{\xi^{(\varepsilon)}_{x_0}|\psi}=(\xi^{(\varepsilon)}_{x_0},\psi)=\int_{-\infty}^{+\infty}\dd x\;\xi^{(\varepsilon)}_{x_0}(x)\,\psi(x)`}</Eq>
          <Tx>{R`让 $\varepsilon\to0$，两件事分道扬镳。函数本身趋于 $\delta$ 函数，不再平方可积——右矢没有极限：`}</Tx>
          <Eq n="B-15" say="$\varepsilon\to 0$ 时尖峰函数趋于 $\delta$ 函数，它不再平方可积。">{R`\lim_{\varepsilon\to0}\xi^{(\varepsilon)}_{x_0}(x)=\xi_{x_0}(x)\notin\mathscr F_x`}</Eq>
          <Eq n="B-16" say="因此右矢序列的极限不在态空间中。">{R`\lim_{\varepsilon\to0}\ket{\xi^{(\varepsilon)}_{x_0}}\notin\mathscr E_x`}</Eq>
          <Tx>{R`而 \eqref{B-14} 的加权平均在 $\varepsilon$ 足够小时就是 $\psi(x_0)$——左矢有一个完全确定的极限，即"读取 $x_0$ 处函数值"的泛函：`}</Tx>
          <Eq n="B-17" say="尖峰左矢的极限是一个完全确定的左矢：它把任何右矢映成其波函数在 $x_0$ 点的值。">{R`\begin{aligned}&\lim_{\varepsilon\to0}\bra{\xi^{(\varepsilon)}_{x_0}}=\bra{\xi_{x_0}}\in\mathscr E_x^*\\&\text{若}\ \ket{\psi}\in\mathscr E_x,\quad\braket{\xi_{x_0}|\psi}=\psi(x_0)\end{aligned}`}</Eq>
          <IFig id="peak" title="图 1（自绘交互版）：尖峰函数与 $\delta$ 函数左矢" caption={R`$\xi^{(\varepsilon)}_{x_0}(x)$ 是位于 $x_0$、宽度 $\varepsilon$、高度 $1/\varepsilon$、积分为 1 的尖峰（实线），虚线是一个示例波函数 $\psi(x)$。拖动 $\varepsilon$：标量积 $\braket{\xi^{(\varepsilon)}_{x_0}|\psi}$ 收敛到 $\psi(x_0)$，而范数平方 $\braket{\xi^{(\varepsilon)}_{x_0}|\xi^{(\varepsilon)}_{x_0}}\approx1/\varepsilon$ 发散——这正是 \eqref{B-15}–\eqref{B-17} 的内容。`}><PeakPlot /></IFig>
          <Tx>{R`**反例二：越来越长的平面波。**同样的戏法换成动量。把平面波截断在长度 $L$ 的区间内（区间外光滑地迅速衰减）：`}</Tx>
          <Eq n="B-18" say="在长度 L 的区间内是动量 $p_0$ 的平面波，区间外迅速（但光滑地）衰减为零。">{R`v^{(L)}_{p_0}(x)=\frac{1}{\sqrt{2\pi\hbar}}\,e^{ip_0x/\hbar}\quad\text{若}\ -\frac{L}{2}\leqslant x\leqslant+\frac{L}{2}`}</Eq>
          <Eq n="B-19" say="截断平面波是平方可积的，对应一个真正的右矢。">{R`v^{(L)}_{p_0}(x)\in\mathscr F_x\iff\ket{v^{(L)}_{p_0}}\in\mathscr E_x`}</Eq>
          <Tx>{R`范数平方约为 $L/2\pi\hbar$，$L\to\infty$ 时右矢没有极限：`}</Tx>
          <Eq n="B-20" say="截断区间无限加宽时，右矢的范数发散，极限不在态空间中。">{R`\lim_{L\to\infty}\ket{v^{(L)}_{p_0}}\notin\mathscr E_x`}</Eq>
          <Tx>{R`但它的左矢作用在 $\ket{\psi}$ 上只是"截断的 Fourier 积分"，`}</Tx>
          <Eq n="B-21" say="截断平面波左矢作用在 $\psi$ 上，就是只在 $[-L/2$, L/2] 上做的 Fourier 积分。">{R`\braket{v^{(L)}_{p_0}|\psi}=(v^{(L)}_{p_0},\psi)\simeq\frac{1}{\sqrt{2\pi\hbar}}\int_{-L/2}^{+L/2}\dd x\;e^{-ip_0x/\hbar}\,\psi(x)`}</Eq>
          <Tx>{R`$L\to\infty$ 时收敛到 $\bar\psi(p_0)$——左矢的极限存在：`}</Tx>
          <Eq n="B-22" say="截断平面波左矢的极限存在：它把任何右矢映成其 Fourier 变换在 $p_0$ 处的值。">{R`\begin{aligned}&\lim_{L\to\infty}\bra{v^{(L)}_{p_0}}=\bra{v_{p_0}}\in\mathscr E_x^*\\&\text{若}\ \ket{\psi}\in\mathscr E_x,\quad\braket{v_{p_0}|\psi}=\bar\psi(p_0)\end{aligned}`}</Eq>
          <Tx>{R`**这在物理上是麻烦吗？**不是，因为我们从不需要把 $\ket{\xi_{x_0}}$ 当成物理态。我们的处理办法分两层。

**约定层面：**既然连续基在计算中太好用，就干脆承认"**广义右矢**"——由不平方可积、但与每个 $\mathscr F_x$ 函数都有有限标量积的函数定义——从而恢复左右矢的对称，放心地写 $\ket{\xi_{x_0}}$、$\ket{v_{p_0}}$。代价是要记住：**广义右矢不代表物理态**，它们只是对真实态做运算时的中介。

**物理层面：**数学上的不安可以这样化解——把 $\ket{\xi_{x_0}}$ 理解为一个 $\varepsilon$ 极小（比问题中一切长度都小）的 $\ket{\xi^{(\varepsilon)}_{x_0}}$，把 $\ket{v_{p_0}}$ 理解为 $L$ 极大的 $\ket{v^{(L)}_{p_0}}$。整个计算都在 $\mathscr E_x$ 里进行，从不真正取极限；只要最终结果对 $\varepsilon$（或 $1/L$）不敏感，就在最后一步令它为零。这些近似基也只是"近似地"满足封闭关系，但近似得非常好：$\int\dd x_0\,\xi^{(\varepsilon)}_{x_0}(x)\,\xi^{(\varepsilon)}_{x_0}(x')$ 是一个以 $x=x'$ 为中心、底宽 $2\varepsilon$、高 $1/\varepsilon$ 的三角形（附录 II §1-c-iv），在 $\varepsilon$ 可忽略时与 $\delta(x-x')$ 无法区分。`}</Tx>
          <Derivation title={R`验证：两个宽 $\varepsilon$、高 $1/\varepsilon$ 的矩形之卷积是底宽 $2\varepsilon$、高 $1/\varepsilon$ 的三角形`} collapsed steps={[
            { tex: R`\int\dd x_0\;\xi^{(\varepsilon)}_{x_0}(x)\,\xi^{(\varepsilon)}_{x_0}(x')=\frac{1}{\varepsilon^2}\times\Big(\text{两区间}\ |x_0-x|<\tfrac\varepsilon2\ \text{与}\ |x_0-x'|<\tfrac\varepsilon2\ \text{的重叠长度}\Big)`, why: R`取理想矩形 $\xi^{(\varepsilon)}_{x_0}(x)=1/\varepsilon$（$|x-x_0|<\varepsilon/2$），否则为 0。` },
            { tex: R`=\frac{1}{\varepsilon^2}\max\big(0,\ \varepsilon-|x-x'|\big)`, why: R`两个长为 $\varepsilon$、中心相距 $|x-x'|$ 的区间，重叠长度为 $\varepsilon-|x-x'|$（不为负）。` },
            { tex: R`\int\dd(x-x')\;\frac{\varepsilon-|x-x'|}{\varepsilon^2}=\frac{1}{\varepsilon^2}\cdot\varepsilon^2=1`, why: R`三角形面积 $=\frac12\times2\varepsilon\times\frac1\varepsilon=1$，与 $\delta$ 函数相同。` },
          ]} result={R`底宽 $2\varepsilon$、高 $1/\varepsilon$、面积为 1 的三角形；$\varepsilon\to0$ 时趋于 $\delta(x-x')$。`} />
          <Box kind="key" title="小结：广义右矢的约定">{R`无穷维时 $\mathscr E^*$ 比 $\mathscr E$ "大"（严格的 $L^2$ 与其对偶同构，但我们取的是更小的 $\mathscr F$，所以 $\mathscr F^*$ 更大）。我们约定在 $\mathscr E$ 之外再接纳范数无限、但与一切右矢标量积有限的**广义右矢**，使每个左矢都有对应的右矢——**但广义右矢不代表系统的物理态。**`}</Box>
        </Sub>
      </Sub>

      <Sub n="B-3" title="Linear operators" zh="线性算符">
        <Sub n="B-3-a" title="Definitions" zh="定义">
          <Tx>{R`算符的定义与 §A-1-c 一字不改，只是换成右矢语言：`}</Tx>
          <Eq n="B-23" say="算符把一个右矢变成另一个右矢。">{R`\ket{\psi'}=A\ket{\psi}`}</Eq>
          <Eq n="B-24" say="线性：作用于叠加等于分别作用后再叠加。">{R`A(\lambda_1\ket{\psi_1}+\lambda_2\ket{\psi_2})=\lambda_1A\ket{\psi_1}+\lambda_2A\ket{\psi_2}`}</Eq>
          <Eq n="B-25" say="算符乘积从右往左作用：B 先作用，A 再作用在结果上。">{R`(AB)\ket{\psi}=A(B\ket{\psi})`}</Eq>
          <Eq n="B-26" say="对易子：交换两算符顺序造成的差。">{R`[A,B]=AB-BA`}</Eq>
          <Tx>{R`新出现的只有一个名词：把 $A\ket{\psi}$ 再与 $\ket{\varphi}$ 作标量积，得到的**数**`}</Tx>
          <Eq n="B-27" say="A 在 $\varphi$ 与 $\psi$ 之间的矩阵元：先让 A 作用于 $\psi$，再与 $\varphi$ 作标量积，得到一个数。">{R`\bra{\varphi}\,(A\ket{\psi})`}</Eq>
          <Tx>{R`称为 $A$ 在 $\ket{\varphi}$、$\ket{\psi}$ 之间的**矩阵元**——对 $\ket{\psi}$ 线性，对 $\ket{\varphi}$ 反线性。（为什么叫"矩阵元"，§C-4 揭晓。）`}</Tx>
        </Sub>

        <Sub n="B-3-b" title="Examples of linear operators: projectors" zh="线性算符的例子：投影算符">
          <Tx>{R`**Dirac 记号的语法只有一条：按顺序并排。**$\bra{\varphi}$ 后面跟 $\ket{\psi}$，就是把泛函作用上去，得到数 $\braket{\varphi|\psi}$。那么把顺序倒过来，`}</Tx>
          <Eq n="B-28" say="右矢在左、左矢在右：按并排规则，这是一个算符而不是一个数。">{R`\ket{\psi}\bra{\varphi}`}</Eq>
          <Tx>{R`会是什么？照语法，把它放在任意右矢 $\ket{\chi}$ 前面：`}</Tx>
          <Eq n="B-29" say="把它作用到任意右矢 $\chi$ 上：$\langle \varphi|\chi\rangle$ 是一个数，所以结果是 $|\psi\rangle$ 乘以一个数——仍是右矢。">{R`\ket{\psi}\braket{\varphi|\chi}`}</Eq>
          <Tx>{R`$\braket{\varphi|\chi}$ 是个数，所以结果是 $\ket{\psi}$ 的倍数——一个右矢。"进右矢、出右矢"，$\ket{\psi}\bra{\varphi}$ 是**算符**。同样两个符号，换个顺序，类型就从"数"变成"算符"。所以在 Dirac 记号中，**右矢、左矢、算符的次序绝不能随便动**；能随意挪动的只有数：`}</Tx>
          <Eq n="B-30" say="数可以在 Dirac 表达式中随意挪动位置；右矢、左矢和算符则不行。">{R`\left\{\begin{aligned}&\ket{\psi}\lambda=\lambda\ket{\psi}\\&\bra{\psi}\lambda=\lambda\bra{\psi}\\&A\lambda\ket{\psi}=\lambda A\ket{\psi}\qquad(A\ \text{为线性算符})\\&\bra{\varphi}\lambda\ket{\psi}=\lambda\braket{\varphi|\psi}=\braket{\varphi|\psi}\lambda\end{aligned}\right.`}</Eq>
          <Tx>{R`**最重要的例子：投影算符。**取归一化的右矢，`}</Tx>
          <Eq n="B-31" say="右矢已归一化：长度为 1。">{R`\braket{\psi|\psi}=1`}</Eq>
          <Tx>{R`用它和自己的左矢拼出算符`}</Tx>
          <Eq n="B-32" keyEq title="投影算符" say="向归一化右矢 $\psi$ 方向的投影算符：右矢与自己的左矢'反着'并排。">{R`P_\psi=\ket{\psi}\bra{\psi}`}</Eq>
          <Tx>{R`作用在任意 $\ket{\varphi}$ 上，`}</Tx>
          <Eq n="B-33" say="投影算符作用后得到沿 $\psi$ 方向的右矢，系数是 $\varphi$ 在 $\psi$ 上的分量 $\langle \psi|\varphi\rangle$。">{R`P_\psi\ket{\varphi}=\ket{\psi}\braket{\psi|\varphi}`}</Eq>
          <Tx>{R`结果沿 $\ket{\psi}$ 方向，长度是 $\ket{\varphi}$ 在 $\ket{\psi}$ 上的分量——这正是几何上的**正交投影**。检验投影的标志性性质"投两次等于投一次"：`}</Tx>
          <Eq n="B-34" say="把投影算符连乘两次，中间夹出一个数 $\langle \psi|\psi\rangle$。">{R`P_\psi^2=P_\psi P_\psi=\ket{\psi}\braket{\psi|\psi}\bra{\psi}`}</Eq>
          <Tx>{R`中间夹着的数 $\braket{\psi|\psi}=1$，于是`}</Tx>
          <Eq n="B-35" say="投影两次等于投影一次：投影算符是幂等的。">{R`P_\psi^2=\ket{\psi}\bra{\psi}=P_\psi`}</Eq>
          <Tx>{R`**投影到多维子空间。**把单个方向换成 $q$ 个两两正交的单位矢，`}</Tx>
          <Eq n="B-36" say="q 个右矢两两正交且归一。">{R`\braket{\varphi_i|\varphi_j}=\delta_{ij}\ ;\quad i,j=1,2,\dots,q`}</Eq>
          <Tx>{R`它们张成子空间 $\mathscr E_q$。把各方向的投影加起来，`}</Tx>
          <Eq n="B-37" keyEq title="向子空间的投影算符" say="向 q 维子空间的投影算符：子空间中一组正交归一基的投影算符之和。">{R`P_q=\sum_{i=1}^{q}\ket{\varphi_i}\bra{\varphi_i}`}</Eq>
          <Tx>{R`平方时出现双重求和，`}</Tx>
          <Eq n="B-38" say="$P_q$ 的平方是双重求和，中间夹着标量积 $\langle \varphi_i|\varphi_j\rangle$。">{R`P_q^2=\sum_{i=1}^{q}\sum_{j=1}^{q}\ket{\varphi_i}\braket{\varphi_i|\varphi_j}\bra{\varphi_j}`}</Eq>
          <Tx>{R`正交性把交叉项全部消掉：`}</Tx>
          <Eq n="B-39" say="正交归一性把双重求和压成单重求和，结果回到 $P_q$：它也是投影算符。">{R`P_q^2=\sum_{i=1}^{q}\sum_{j=1}^{q}\ket{\varphi_i}\bra{\varphi_j}\delta_{ij}=\sum_{i=1}^{q}\ket{\varphi_i}\bra{\varphi_i}=P_q`}</Eq>
          <Tx>{R`它仍是投影算符；作用在 $\ket{\psi}$ 上得到各方向投影之和，即 $\ket{\psi}$ 在 $\mathscr E_q$ 上的投影：`}</Tx>
          <Eq n="B-40" say="$P_q$ 作用于 $\psi$，得到 $\psi$ 在各 $\varphi_i$ 上投影的叠加——即 $\psi$ 在子空间上的投影。">{R`P_q\ket{\psi}=\sum_{i=1}^{q}\ket{\varphi_i}\braket{\varphi_i|\psi}`}</Eq>
          <Tx>{R`**预告：**若 $q$ 个矢量已经张满整个空间，向"整个空间"投影当然什么也不改变，$P_q=\mathbb 1$——这就是 §C-2-b 的封闭关系。`}</Tx>
        </Sub>
      </Sub>

      <Sub n="B-4" title="Hermitian conjugation" zh="厄米共轭">
        <Sub n="B-4-a" title="Action of a linear operator on a bra" zh="线性算符作用于左矢">
          <Tx>{R`**问题：**算符目前只能往右作用在右矢上。它能不能往左作用在左矢上？

**思路：**左矢的本质是"吃右矢吐数"。固定 $\bra{\varphi}$ 和 $A$，"先用 $A$ 把右矢变一下，再喂给 $\bra{\varphi}$"也是一台吃右矢吐数的线性机器——所以它是一个新左矢，自然地记作 $\bra{\varphi}A$：`}</Tx>
          <Eq n="B-41" keyEq title="算符作用于左矢" say="左矢 $\langle \varphi|A$ 的定义：它作用于任意 $\psi$，等于 $\langle \varphi|$ 作用于 $A|\psi\rangle$。括号放在哪里都一样。">{R`(\bra{\varphi}A)\ket{\psi}=\bra{\varphi}(A\ket{\psi})`}</Eq>
          <Tx>{R`这个对应 $\bra{\varphi}\mapsto\bra{\varphi}A$ 是线性的。取左矢的组合`}</Tx>
          <Eq n="B-42" say="两个左矢的线性组合（意即 $\langle \chi|\psi\rangle =\lambda_1\langle \varphi_1|\psi\rangle +\lambda_2\langle \varphi_2|\psi\rangle$）。">{R`\bra{\chi}=\lambda_1\bra{\varphi_1}+\lambda_2\bra{\varphi_2}`}</Eq>
          <Tx>{R`（意即它作用于 $\ket\psi$ 给出 $\lambda_1\braket{\varphi_1|\psi}+\lambda_2\braket{\varphi_2|\psi}$），用 \eqref{B-41} 展开：`}</Tx>
          <Eq n="B-43" say="逐步展开，证明 $\langle \chi|A$ 作用于任意 $\psi$ 的结果是线性组合。">{R`\begin{aligned}(\bra{\chi}A)\ket{\psi}&=\bra{\chi}(A\ket{\psi})\\&=\lambda_1\bra{\varphi_1}(A\ket{\psi})+\lambda_2\bra{\varphi_2}(A\ket{\psi})\\&=\lambda_1(\bra{\varphi_1}A)\ket{\psi}+\lambda_2(\bra{\varphi_2}A)\ket{\psi}\end{aligned}`}</Eq>
          <Tx>{R`$\ket{\psi}$ 任意，所以`}</Tx>
          <Eq n="B-44" say="算符对左矢的作用是线性的（注意：这里系数不取共轭）。">{R`\begin{aligned}\bra{\chi}A&=(\lambda_1\bra{\varphi_1}+\lambda_2\bra{\varphi_2})A\\&=\lambda_1\bra{\varphi_1}A+\lambda_2\bra{\varphi_2}A\end{aligned}`}</Eq>
          <Tx>{R`**两个推论。**其一，\eqref{B-41} 说明括号放在哪都一样，于是矩阵元可以无歧义地写成三明治：`}</Tx>
          <Eq n="B-45" say="矩阵元的标准写法：括号可以省略，因为两种结合方式结果相同。">{R`\bra{\varphi}A\ket{\psi}=(\bra{\varphi}A)\ket{\psi}=\bra{\varphi}(A\ket{\psi})`}</Eq>
          <Tx>{R`其二，次序再次关键：$\bra{\varphi}A$ 是左矢（往右喂右矢得数），而 $A\bra{\varphi}$ 若存在，作用于 $\ket\psi$ 会得到"算符乘以数"——这种对象我们没有定义过，所以 $A\bra{\varphi}$ 是**无意义**的写法。`}</Tx>
        </Sub>

        <Sub n="B-4-b" title="The adjoint operator $A^\dagger$ of a linear operator A" zh="线性算符 $A$ 的伴随算符 $A^\dagger$">
          <Tx>{R`**想法。**右矢与左矢一一对应（§B-2-c）。算符 $A$ 把 $\ket{\psi}$ 变成 $\ket{\psi'}=A\ket{\psi}$；那么在"左矢世界"里，应当有一个算符把 $\bra{\psi}$ 变成 $\bra{\psi'}$。把它记作 $A^\dagger$，称为 $A$ 的**伴随算符**（adjoint）或**厄米共轭**算符：$\bra{\psi'}=\bra{\psi}A^\dagger$。下图（参照原书图 2 重绘）把这个"绕一圈"的定义画了出来。`}</Tx>
          <IFig id="adjoint" title="图 2（自绘）：用右矢–左矢对应定义伴随算符" caption={R`上行：$A$ 把 $\ket{\psi}$ 变成 $\ket{\psi'}=A\ket{\psi}$；波浪线表示右矢与左矢之间的（反线性）对应；下行：$A^\dagger$ 把 $\bra{\psi}$ 变成 $\bra{\psi'}=\bra{\psi}A^\dagger$。`}><AdjointDiagram /></IFig>
          <Tx>{R`**$A^\dagger$ 线性吗？**沿图绕一圈：左矢组合 $\lambda_1\bra{\psi_1}+\lambda_2\bra{\psi_2}$ 下行到右矢时系数取一次共轭，$A$ 作用后再上行回左矢时系数又取一次共轭——两次共轭抵消：`}</Tx>
          <Eq n="B-46" say="伴随算符对左矢的作用是线性的：两次反线性的复共轭互相抵消。">{R`(\lambda_1\bra{\psi_1}+\lambda_2\bra{\psi_2})A^\dagger=\lambda_1\bra{\psi_1}A^\dagger+\lambda_2\bra{\psi_2}A^\dagger`}</Eq>
          <Tx>{R`所以 $A^\dagger$ 是线性算符，其定义是`}</Tx>
          <Eq n="B-47" keyEq title="伴随算符的定义" say="A 把 $\psi$ 变成 $\psi'$，则 $A^\dagger$ 把 $\langle \psi|$ 变成 $\langle \psi'|$：伴随算符是 A 在'左矢世界'中的镜像。">{R`\ket{\psi'}=A\ket{\psi}\iff\bra{\psi'}=\bra{\psi}A^\dagger`}</Eq>
          <Tx>{R`**更实用的形式。**定义 \eqref{B-47} 涉及"对应"，不便计算。把它变成矩阵元的语言：对任意 $\ket{\varphi}$，`}</Tx>
          <Eq n="B-48" say="交换标量积的两端要取复共轭（B-9）。">{R`\braket{\psi'|\varphi}=\braket{\varphi|\psi'}^*`}</Eq>
          <Tx>{R`左边用 $\bra{\psi'}=\bra{\psi}A^\dagger$，右边用 $\ket{\psi'}=A\ket{\psi}$，得到`}</Tx>
          <Eq n="B-49" keyEq title="伴随算符的矩阵元" say="$A^\dagger$ 在 $\psi$、$\varphi$ 之间的矩阵元，等于 A 在 $\varphi$、$\psi$ 之间矩阵元的复共轭——对一切 $\varphi$、$\psi$ 成立，可作为 $A^\dagger$ 的等价定义。">{R`\bra{\psi}A^\dagger\ket{\varphi}=\bra{\varphi}A\ket{\psi}^*`}</Eq>
          <Tx>{R`它对一切 $\ket{\varphi}$、$\ket{\psi}$ 成立，可以当作 $A^\dagger$ 的等价定义——后面几乎所有关于伴随的证明都从这里出发。`}</Tx>
          <Box kind="warning" title="记号说明：$\ket{A\psi}$ 与 $\bra{A\psi}$">
            <Tx>{R`与 \eqref{B-7}、\eqref{B-8} 同理，可以把算符写进右矢：`}</Tx>
            <Eq n="B-50" say="把算符写进右矢符号内部，只是 $A|\psi\rangle$ 的另一种记法。">{R`\ket{A\psi}=A\ket{\psi}`}</Eq>
            <Tx>{R`而 $\bra{A\psi}$ 是它对应的左矢；由 \eqref{B-47}：`}</Tx>
            <Eq n="B-51" say="把算符从左矢符号里拿出来，要换成它的伴随，并放到左矢的右边。">{R`\bra{A\psi}=\bra{\psi}A^\dagger`}</Eq>
            <Tx>{R`口诀：算符从左矢符号里"搬出来"时，要换成伴随并放到左矢右边。`}</Tx>
          </Box>
          <Box kind="warning" title="勘误：(B-51) 的推导依据是 (B-47) 而非 (B-57)">{R`原书（第 2 版）在 \eqref{B-51} 前写 "Using (B-50) and (B-57)"。但 \eqref{B-57} 是 $(\ket{u}\bra{v})^\dagger=\ket{v}\bra{u}$，与此无关，且出现在后文；真正用到的是伴随算符的定义 \eqref{B-47}：由 $\ket{A\psi}=A\ket{\psi}$ 立即得 $\bra{A\psi}=\bra{\psi}A^\dagger$。上文已按正确引用书写。`}</Box>
        </Sub>

        <Sub n="B-4-c" title="Correspondence between an operator and its adjoint" zh="算符与其伴随的关系">
          <Tx>{R`用 \eqref{B-49} 可以机械地验证三条基本性质（推导在下面折叠框中）：`}</Tx>
          <Eq n="B-52" say="取两次伴随回到原算符。">{R`(A^\dagger)^\dagger=A`}</Eq>
          <Eq n="B-53" say="数乘算符的伴随：数取复共轭，算符取伴随。">{R`(\lambda A)^\dagger=\lambda^*A^\dagger\qquad(\lambda\ \text{为数})`}</Eq>
          <Eq n="B-54" say="和的伴随等于伴随之和。">{R`(A+B)^\dagger=A^\dagger+B^\dagger`}</Eq>
          <Derivation title={R`用 \eqref{B-49} 证明 (B-52)–(B-54)`} collapsed steps={[
            { tex: R`\bra{\psi}(A^\dagger)^\dagger\ket{\varphi}=\bra{\varphi}A^\dagger\ket{\psi}^*=\big(\bra{\psi}A\ket{\varphi}^*\big)^*=\bra{\psi}A\ket{\varphi}`, why: R`对 $A^\dagger$ 用一次 \eqref{B-49}，再对 $A$ 用一次。对一切 $\varphi,\psi$ 成立，故 $(A^\dagger)^\dagger=A$。` },
            { tex: R`\bra{\psi}(\lambda A)^\dagger\ket{\varphi}=\bra{\varphi}\lambda A\ket{\psi}^*=\lambda^*\bra{\varphi}A\ket{\psi}^*=\lambda^*\bra{\psi}A^\dagger\ket{\varphi}`, why: R`数可以提出来，取共轭时变成 $\lambda^*$。` },
            { tex: R`\bra{\psi}(A+B)^\dagger\ket{\varphi}=\bra{\varphi}A\ket{\psi}^*+\bra{\varphi}B\ket{\psi}^*=\bra{\psi}(A^\dagger+B^\dagger)\ket{\varphi}`, why: R`复共轭对加法是线性的。` },
          ]} />
          <Tx>{R`**乘积是唯一有"意外"的一条。**最快的论证是把乘积拆成两步：令 $\ket{\chi}=B\ket{\psi}$，则 $AB\ket\psi=A\ket\chi$。对两步各用一次 \eqref{B-47}：对应的左矢先是 $\bra{\chi}=\bra{\psi}B^\dagger$，再是 $\bra{\chi}A^\dagger=\bra{\psi}B^\dagger A^\dagger$。所以`}</Tx>
          <Eq n="B-55" keyEq title="乘积的伴随" say="乘积取伴随时顺序颠倒：先穿袜子后穿鞋，脱的时候先脱鞋。">{R`(AB)^\dagger=B^\dagger A^\dagger`}</Eq>
          <Tx>{R`**次序颠倒**——像先穿袜子再穿鞋，脱的时候得先脱鞋。

最后一个常用变形：由 $(A^\dagger)^\dagger=A$ 与 \eqref{B-51}，$\bra{A^\dagger\varphi}=\bra{\varphi}A$，于是 \eqref{B-41} 两边可以写成`}</Tx>
          <Eq n="B-56" say="把 A 从标量积的右边'挪到'左边，要换成 $A^\dagger$：这是数学书中伴随算符的常见定义。">{R`\braket{A^\dagger\varphi|\psi}=\braket{\varphi|A\psi}`}</Eq>
          <Tx>{R`这是数学书里定义伴随的常见方式："把算符从标量积右边挪到左边，要换成伴随"。`}</Tx>
        </Sub>

        <Sub n="B-4-d" title="Hermitian conjugation in Dirac notation" zh="Dirac 记号中的厄米共轭">
          <Tx>{R`把图 2 的波浪线推广成一种运算——**厄米共轭**：右矢与它的左矢互为厄米共轭，$A$ 与 $A^\dagger$ 互为厄米共轭。图中已经看到它会颠倒次序（$A\ket\psi\to\bra\psi A^\dagger$），\eqref{B-55} 也是。对外积同样如此：`}</Tx>
          <Eq n="B-57" say="外积 $|u\rangle \langle v|$ 的厄米共轭：右矢变左矢、左矢变右矢、次序颠倒。">{R`(\ket{u}\bra{v})^\dagger=\ket{v}\bra{u}`}</Eq>
          <Tx>{R`验证仍用 \eqref{B-49}：左边夹在 $\bra\psi$、$\ket\varphi$ 之间，`}</Tx>
          <Eq n="B-58" say="对外积算符应用伴随矩阵元的关系式。">{R`\bra{\psi}(\ket{u}\bra{v})^\dagger\ket{\varphi}=\big[\bra{\varphi}(\ket{u}\bra{v})\ket{\psi}\big]^*`}</Eq>
          <Tx>{R`右边拆成两个数各自取共轭，再按 \eqref{B-9} 交换左右：`}</Tx>
          <Eq n="B-59" say="右边拆成两个标量积的乘积并逐个取共轭，正好拼成 $|v\rangle \langle u|$ 的矩阵元。">{R`\begin{aligned}\big[\bra{\varphi}(\ket{u}\bra{v})\ket{\psi}\big]^*&=\braket{\varphi|u}^*\braket{v|\psi}^*=\braket{\psi|v}\braket{u|\varphi}\\&=\bra{\psi}(\ket{v}\bra{u})\ket{\varphi}\end{aligned}`}</Eq>
          <Tx>{R`对一切 $\varphi,\psi$ 两式相等，即 \eqref{B-57}。至于常数，由 \eqref{B-6} 与 \eqref{B-53}，厄米共轭只是取复共轭，与 $\braket{\varphi|\psi}^*=\braket{\psi|\varphi}$ 一致。把这些归纳起来，就得到一条可以机械执行的规则：`}</Tx>
          <Box kind="key" title="厄米共轭的操作规则">{R`要得到由常数、右矢、左矢和算符组成的任意表达式的厄米共轭（伴随）：

**替换**——常数换成其复共轭；右矢换成对应的左矢；左矢换成对应的右矢；算符换成其伴随；

**倒序**——各因子的次序颠倒（常数的位置无关紧要）。

**例。**$\lambda\bra{u}A\ket{v}\ket{w}\bra{\psi}$ 是一个算符（$\lambda$ 与 $\bra{u}A\ket{v}$ 是数）。按规则，它的伴随是 $\ket{\psi}\bra{w}\bra{v}A^\dagger\ket{u}\lambda^*$，也可以把数挪到前面写成 $\lambda^*\bra{v}A^\dagger\ket{u}\ket{\psi}\bra{w}$。同理，右矢 $\lambda\ket{u}\braket{v|w}$ 的共轭左矢是 $\braket{w|v}\bra{u}\lambda^*=\lambda^*\braket{w|v}\bra{u}$。`}</Box>
        </Sub>

        <Sub n="B-4-e" title="Hermitian operators" zh="厄米算符">
          <Tx>{R`**定义：**等于自己伴随的算符，`}</Tx>
          <Eq n="B-60" keyEq title="厄米算符" say="厄米算符等于自己的伴随：它在'右矢世界'和'左矢世界'里的作用互为镜像。">{R`A=A^\dagger`}</Eq>
          <Tx>{R`代入 \eqref{B-49}，它的矩阵元满足"交换左右即取共轭"：`}</Tx>
          <Eq n="B-61" say="厄米算符的矩阵元：交换左右两态等于取复共轭；特别地，对角矩阵元 $\langle \psi|A|\psi\rangle$ 是实数。">{R`\bra{\psi}A\ket{\varphi}=\bra{\varphi}A\ket{\psi}^*`}</Eq>
          <Tx>{R`取 $\varphi=\psi$ 立即看出：厄米算符的"期望值" $\bra\psi A\ket\psi$ 是实数——这是它将代表可测物理量的第一个线索（§D、第 III 章）。\eqref{B-56} 则变成"可以在标量积中左右自由挪动"：`}</Tx>
          <Eq n="B-62" say="厄米算符可以在标量积中从右边自由地'挪到'左边。">{R`\braket{A\varphi|\psi}=\braket{\varphi|A\psi}`}</Eq>
          <Tx>{R`最简单的厄米算符就是投影算符——在 \eqref{B-57} 中令 $\ket u=\ket v=\ket\psi$：`}</Tx>
          <Eq n="B-63" say="投影算符是厄米的。">{R`P_\psi^\dagger=\ket{\psi}\bra{\psi}=P_\psi`}</Eq>
          <Box kind="warning" title="两个厄米算符之积未必厄米">{R`若 $A=A^\dagger$、$B=B^\dagger$，由 \eqref{B-55}，$(AB)^\dagger=B^\dagger A^\dagger=BA$。它等于 $AB$ 当且仅当 $[A,B]=0$。所以**两个厄米算符的乘积是厄米的，当且仅当它们对易**。例如 $XP_x$ 不是厄米的，但 $\frac12(XP_x+P_xX)$ 是。`}</Box>
        </Sub>
      </Sub>
    </Sec>);
}
