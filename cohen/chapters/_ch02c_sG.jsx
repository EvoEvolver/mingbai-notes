// 补充材料 G_II：张量积性质的应用——二维无限深势阱 —— 式 (GII-1)–(GII-18)
import { Sec, Sub, Tx, Eq, Box, Derivation, C } from "@kit";
import "./_ch02c_kit.jsx";
import { Fig } from "./_ch02c_kit.jsx";
import { Well2DDemo } from "./_ch02c_plots.jsx";

const R = String.raw;

export function SecG() {
  return (
    <Sec n="GII" title="An application of the properties of the tensor product: the two-dimensional infinite well" zh="张量积性质的应用：二维无限深方势阱"
      gist={R`二维方盒中 $H=H_x+H_y$ 可分离，态空间是 $\mathcal E_x\otimes\mathcal E_y$，本征态是一维本征态的张量积 $\ket{\varphi_n}_x\ket{\varphi_p}_y$，能量 $E_{n,p}=\frac{(n^2+p^2)\pi^2\hbar^2}{2ma^2}$。$n\ne p$ 的能级因 $x\leftrightarrow y$ 对称而二重简并（系统简并）；改成矩形盒这种简并消失。另有与对称性无关的偶然简并，如 $E_{5,5}=E_{7,1}$。`}
      why={R`这是正文 §F（张量积）最干净的应用：一个二维问题被拆成两个已经解过的一维问题。它还第一次让我们看到"简并从哪里来"——对称性造成的简并，与数论巧合造成的简并。`}
      gives={["GII-4", "GII-8", "GII-9", "GII-11", "GII-15", "GII-17"]}>
      <p className="muted">本节概念：<C id="tensor_sep" /> · <C id="degeneracy" /></p>
      <Tx>{R`**问题。**一维无限深势阱已经在 \Ic{HI|HI-2} 解过：宽为 $a$ 的盒子里，能级 $\frac{n^2\pi^2\hbar^2}{2ma^2}$，波函数 $\sqrt{2/a}\sin(n\pi x/a)$。把粒子关进一个**正方形**盒子（平面 $xOy$ 内，边长 $a$），需要从头解二维 Schrödinger 方程吗？不需要——张量积会把它拆成两个一维问题。（三维盒子完全同理。）`}</Tx>

      <Sub n="GII-1" title="Definition; eigenstates" zh="模型与本征态">
        <Tx>{R`**势能可以写成两项之和。**只要有一个坐标跑出 $[0,a]$，势能就是无穷大：`}</Tx>
        <Eq n="GII-1" say="二维方盒的势能是 $x$ 方向与 $y$ 方向两个一维无限深势阱之和。">{R`V(x,y)=V_\infty(x)+V_\infty(y)`}</Eq>
        <Tx>{R`其中一维的无限深势阱`}</Tx>
        <Eq n="GII-2" say="一维无限深势阱：在 [0, $a$] 内为零，在外面为无穷大。">{R`\begin{aligned}V_\infty(u)&=0\qquad\text{if}\quad0\leq u\leq a\\&=+\infty\qquad\text{if}\quad u<0\qquad\text{or}\quad u>a\end{aligned}`}</Eq>
        <Tx>{R`（"可加"是关键：圆形盒子的势能就写不成这样，也不能这样分离。）哈密顿量（第 III 章 §B-5）`}</Tx>
        <Eq n="GII-3" say="二维方盒中粒子的哈密顿量：两个方向的动能加上两个方向的势阱。">{R`H=\frac1{2m}(P_x^2+P_y^2)+V_\infty(X)+V_\infty(Y)`}</Eq>
        <Tx>{R`按变量重新分组：`}</Tx>
        <Eq n="GII-4" keyEq title="可分离的哈密顿量" say="哈密顿量是只作用于 $x$ 的部分与只作用于 $y$ 的部分之和。">{R`H=H_x+H_y`}</Eq>
        <Eq n="GII-5" say="$H_x$ 只含 $X$ 与 $P_x$，$H_y$ 只含 $Y$ 与 $P_y$：两者分别是两个一维无限深势阱的哈密顿量。">{R`\begin{aligned}H_x&=\frac1{2m}P_x^2+V_\infty(X)\\H_y&=\frac1{2m}P_y^2+V_\infty(Y)\end{aligned}`}</Eq>
        <Tx>{R`$H_x$ 只作用在 $\mathcal E_x$ 上（严格说是它在 $\mathcal E_x\otimes\mathcal E_y$ 上的延伸 $H_x\otimes\mathbb 1$），$H_y$ 只作用在 $\mathcal E_y$ 上，二者对易。这正是正文 \IIsec{F-4-a} 讨论的情形：可以找形如张量积的本征态`}</Tx>
        <Eq n="GII-6" say="尝试用 $x$ 方向与 $y$ 方向两个一维态的张量积作为二维本征态。">{R`\ket\Phi=\ket\varphi_x\ket\varphi_y`}</Eq>
        <Tx>{R`其中两个因子各自是一维本征态：`}</Tx>
        <Eq n="GII-7" say="张量积的两个因子分别是 $H_x$、$H_y$ 在各自空间中的本征矢。">{R`\begin{aligned}H_x\ket\varphi_x&=E_x\ket\varphi_x\quad;\quad\ket\varphi_x\in\mathcal E_x\\H_y\ket\varphi_y&=E_y\ket\varphi_y\quad;\quad\ket\varphi_y\in\mathcal E_y\end{aligned}`}</Eq>
        <Tx>{R`$H_x$ 只碰第一个因子、$H_y$ 只碰第二个，于是 $H\ket\Phi=E\ket\Phi$，`}</Tx>
        <Eq n="GII-8" keyEq title="能量相加" say="二维本征态的能量是两个一维能量之和。">{R`E=E_x+E_y`}</Eq>
        <Tx>{R`而且正文的定理保证：这样得到的张量积**构成一组完备的本征基**，不会漏掉任何本征态。把一维结果代进来：`}</Tx>
        <Eq n="GII-9" keyEq title="二维方阱的能级" say="二维方盒的能级：两个正整数量子数的平方和乘以基本能量单位 $\pi^2\hbar^2/2ma^2$。">{R`E_{n,p}=\frac1{2ma^2}(n^2+p^2)\pi^2\hbar^2`}</Eq>
        <Tx>{R`$n$、$p$ 为正整数。对应的本征态是张量积`}</Tx>
        <Eq n="GII-10" say="能量 $E_{n,p}$ 的本征态：$x$ 方向第 $n$ 个、$y$ 方向第 $p$ 个一维本征态的张量积。">{R`\ket{\Phi_{n,\,p}}=\ket{\varphi_n}_x\,\ket{\varphi_p}_y`}</Eq>
        <Tx>{R`波函数就是两个一维波函数的乘积：`}</Tx>
        <Eq n="GII-11" keyEq title="二维方阱的本征函数" say="二维方盒的归一化本征函数是两个正弦驻波的乘积。">{R`\begin{aligned}\Phi_{n,\,p}(x,y)&=\varphi_n(x)\,\varphi_p(y)\\&=\frac2a\sin\frac{n\pi x}a\sin\frac{p\pi y}a\end{aligned}`}</Eq>
        <Tx>{R`检查边界：$x$ 或 $y$ 等于 0 或 $a$ 时总有一个正弦为零，波函数在盒壁上为零，满足无限高势壁的要求。归一化因子 $2/a=\sqrt{2/a}\cdot\sqrt{2/a}$ 也直接来自两个一维因子。`}</Tx>
      </Sub>

      <Sub n="GII-2" title="Study of the energy levels" zh="能级的研究">
        <Sub n="GII-2-a" title="Ground state" zh="基态">
          <Tx>{R`$n=0$ 或 $p=0$ 会让波函数恒为零（无法归一），所以量子数都 $\ge1$。基态是 $n=p=1$：`}</Tx>
          <Eq n="GII-12" say="基态能量：两个方向都处于一维基态，能量为一维基态能量的两倍。">{R`E_{1,\,1}=\frac{\pi^2\hbar^2}{ma^2}`}</Eq>
          <Tx>{R`只有 $(1,1)$ 这一种组合给出它，基态**不简并**。`}</Tx>
        </Sub>
        <Sub n="GII-2-b" title="First excited states" zh="低激发态">
          <Tx>{R`下一个能级可以让任一方向激发一次：$(1,2)$ 或 $(2,1)$，`}</Tx>
          <Eq n="GII-13" say="第一激发能级：(1,2) 与 (2,1) 能量相同，二重简并。">{R`E_{1,\,2}=E_{2,\,1}=\frac52\frac{\pi^2\hbar^2}{ma^2}`}</Eq>
          <Tx>{R`$\ket{\Phi_{1,2}}$ 与 $\ket{\Phi_{2,1}}$ 线性无关，这个能级**二重简并**。再往上是 $n=p=2$，不简并：`}</Tx>
          <Eq n="GII-14" say="第二激发能级：只有 (2,2) 一个态，不简并。">{R`E_{2,\,2}=4\frac{\pi^2\hbar^2}{ma^2}`}</Eq>
          <Tx>{R`然后是 $(1,3)$ 与 $(3,1)$（$5\pi^2\hbar^2/ma^2$），依此类推。下面的交互图把前十几个能级列成能级图。`}</Tx>
        </Sub>
        <Sub n="GII-2-c" title="Systematic and accidental degeneracies" zh="系统简并与偶然简并">
          <Tx>{R`**系统简并。**能级公式对 $n$、$p$ 对称，所以 $n\neq p$ 时总有`}</Tx>
          <Eq n="GII-15" keyEq title="系统简并" say="交换两个量子数，能量不变：所有 $n\neq p$ 的能级至少二重简并。">{R`E_{n,\,p}=E_{p,\,n}`}</Eq>
          <Tx>{R`这不是代数巧合，而是对称性的后果：正方形关于对角线 $y=x$ 对称，哈密顿量在交换`}</Tx>
          <Eq n="GII-16" say="正方形关于第一象限角平分线对称：同时交换 $X$ 与 $Y$、$P_x$ 与 $P_y$，哈密顿量不变。">{R`\begin{aligned}&X\leftrightarrow Y\\&P_x\leftrightarrow P_y\end{aligned}`}</Eq>
          <Tx>{R`下不变。（在态空间里可以定义一个"关于对角线反射"的算符，它与 $H$ 对易。）于是若 $\Phi(x,y)$ 是本征函数，$\Phi'(x,y)=\Phi(y,x)$ 也是，且能量相同。$\Phi$ 本身若不关于 $x,y$ 对称，$\Phi'$ 就是一个独立的新本征函数，能级必然简并——$n\neq p$ 时的 $\Phi_{n,p}$ 正是如此（\eqref{GII-11}：$\Phi_{p,n}(x,y)=\Phi_{n,p}(y,x)$）。这与宇称一节末尾的推论（\secref{FII-4}）是同一个逻辑。

**检验：破坏对称性，简并就消失。**把盒子改成 $a\times b$ 的矩形：`}</Tx>
          <Eq n="GII-17" keyEq title="矩形盒的能级" say="矩形盒中两个方向的宽度不同，能量变为两个方向各自的贡献之和，不再对 $n$、$p$ 对称。">{R`E_{n,\,p}=\frac{\pi^2\hbar^2}{2m}\left(\frac{n^2}{a^2}+\frac{p^2}{b^2}\right),`}</Eq>
          <Tx>{R`一般就有`}</Tx>
          <Eq n="GII-18" say="矩形盒中交换量子数一般会改变能量：对称性破坏后，系统简并解除。">{R`E_{p,\,n}\neq E_{n,\,p}`}</Eq>
          <Tx>{R`（$n\neq p$ 且 $a\neq b$ 时，$E_{n,p}-E_{p,n}=\frac{\pi^2\hbar^2}{2m}(n^2-p^2)\left(\frac1{a^2}-\frac1{b^2}\right)\neq0$。）像这样起源于对称性的简并叫做**系统简并**（systematic degeneracy）。

**其他对称性为什么不造成简并？**正方形还关于中心对称（$x\to a-x$，$y\to a-y$）。但 $\sin\frac{n\pi(a-x)}a=(-1)^{n+1}\sin\frac{n\pi x}a$，所以 $\Phi_{n,p}$ 在这一操作下只乘以相位 $(-1)^{n+p}$——每个本征态自己就是这个对称操作的本征态，产生不了新的独立态，也就不带来简并。

**偶然简并。**还有一类简并与对称性无直接关系：$5^2+5^2=7^2+1^2=50$，所以 $E_{5,5}=E_{7,1}$（$=E_{1,7}$）；$7^2+4^2=8^2+1^2=65$，所以 $E_{7,4}=E_{8,1}$（连同交换共四重）。它们源于"一个整数有多种平方和分解"这样的数论巧合，称为**偶然简并**（accidental degeneracy）。矩形盒在边长比特殊时也会出现偶然简并，例如 $b=2a$ 时 $\varepsilon_{n,p}=n^2+p^2/4$，$(1,4)$ 与 $(2,2)$ 都给出 5。`}</Tx>
          <Fig n="G-1" caption={R`交互（自绘）：二维无限深势阱的能级与本征函数。能量以 $\pi^2\hbar^2/2ma^2$ 为单位，$\varepsilon_{n,p}=n^2+p^2(a/b)^2$。拖动 $b/a$：$b=a$ 时蓝色标出系统简并（$n\leftrightarrow p$ 成对），紫色是含偶然重合的能级；$b\neq a$ 时成对的能级分裂，偶尔又会因为特殊的边长比出现橙色的偶然简并。点击能级查看 $\Phi_{n,p}$（红正蓝负）；简并能级可以调混合角，看简并子空间里的任意组合仍是本征函数。`}><Well2DDemo /></Fig>
          <Box kind="key" title="简并的两个来源">{R`◆ **对称性**：存在与 $H$ 对易、但不与"本征态集合"相容的对称操作（把一个本征态变成另一个独立的本征态）——简并不可避免，且对系统参数的连续变化稳定（只要对称性保持）。

◆ **偶然**：数值巧合，一般在扰动下解除。不过"偶然"常常意味着有隐藏的对称性：氢原子能级对 $l$ 的简并、三维各向同性谐振子的简并，看似偶然，后来都找到了更大的对称群。`}</Box>
        </Sub>
      </Sub>
    </Sec>);
}
