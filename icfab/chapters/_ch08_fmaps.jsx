// 第 8 章（上）公式树图：式 (8.21)。
import { dRlat, dRlat2, erfc } from "./_ch08_tex.jsx";

const R = String.raw;
const aa = R`\sym{ahalf}{a}`;

export const FM_8_21 = {
  id: "eq", tex: R`#lhs=#mid=#rhs`, name: "equals", label: "同一个分布的两种写法：先叠加，后化成闭式", role: "const",
  note: R`第一个等号是定义：把开口内每个入射点的点扩展函数加起来。第二个等号是积分结果：高斯的和就是 erfc，于是不用再做积分。`,
  kids: [
    { id: "lhs", tex: R`C(x,y)`, w: 3, name: "conc(depth, lateral)", label: "掩模附近的二维浓度", role: "result",
      note: R`深度 $x$、横向位置 $y$ 处的杂质浓度。器件关心的是掩模（栅）边缘下方这部分，它决定源漏与栅的交叠和有效沟道长度。` },
    { id: "mid", tex: R`#cvA\int_{#lo}^{#hi}#psf dy'`, name: "for y' in opening", label: "逐点叠加", role: "const",
      note: R`实际的束覆盖整个开口，每个入射点 $y'$ 贡献一个以它为中心的横向高斯。积分变量是入射位置 $y'$，而 $y$ 是观察位置。`,
      kids: [
        { id: "cvA", tex: R`C_{\rm ver}(x)`, w: 2, name: "vertical_profile(x)", label: "一维纵向分布", role: "known",
          note: R`前面几节得到的一维分布（如高斯或 Pearson）。纵向与横向假设相互独立，所以它能提到积分外面。` },
        { id: "lo", tex: R`-${aa}`, w: 1, name: "opening.left", label: "开口左边缘", role: "design", note: R`积分下限：掩模开口从 $y=-a$ 开始。` },
        { id: "hi", tex: R`+${aa}`, w: 1, name: "opening.right", label: "开口右边缘", role: "design", note: R`积分上限：掩模开口到 $y=+a$ 为止，超出这个范围的离子被掩模挡住。` },
        { id: "psf", tex: R`#nrm#gauss`, glyph: R`\times`, name: "lateral_gaussian", label: "单点散开", role: "const",
          note: R`就是 \eqref{8.20} 的横向因子，只是中心从 $0$ 移到了入射点 $y'$。`,
          kids: [
            { id: "nrm", tex: R`\frac{1}{\sqrt{2\pi}\,${dRlat}}`, w: 1, name: "normalize", label: "归一化因子", role: "const",
              note: R`保证横向高斯的积分为 1：离子只是横向散开，总数不变。` },
            { id: "gauss", tex: R`\exp\left(-\frac{#dist}{#spread}\right)`, name: "gaussian", label: "越远越少", role: "const",
              note: R`高斯形状的衰减：指数里比较的是离入射点的距离和横向离散。`,
              kids: [
                { id: "dist", tex: R`(y-y')^2`, w: 3, name: "dist(point, entry)^2", label: "观察点到入射点的距离", role: "const",
                  note: R`横向位置 $y$ 与入射点 $y'$ 的距离的平方。正是这个差把 \eqref{8.20} 变成了可以叠加的卷积形式。` },
                { id: "spread", tex: R`2${dRlat2}`, w: 2, name: "2*sigma_lat^2", label: "横向离散设定衰减快慢", role: "known",
                  note: R`横向离散 $\Delta R_{\rm lat}$ 是离子停止位置在横向上的标准差。` },
              ] },
          ] },
      ] },
    { id: "rhs", tex: R`#pref\left[#eR-#eL\right]`, glyph: R`\times`, name: "half × (erfc − erfc)", label: "右边：两条边缘各贡献一个 erfc", role: "const",
      note: R`开口中心两项之差接近 2，结果回到 $C_{\rm ver}(x)$；令 $a\to\infty$（无掩模）时严格如此。`,
      kids: [
        { id: "pref", tex: R`\frac{C_{\rm ver}(x)}{2}`, w: 2.5, name: "vertical_profile / 2", label: "边缘处的一半", role: "known",
          note: R`这个 $\tfrac12$ 不是可有可无的系数。掩模边缘 $y=a$ 处，方括号在宽开口下约等于 1，所以边缘浓度正好是开口中心的一半。` },
        { id: "eR", tex: R`${erfc}\left(\frac{#edge}{#scale}\right)`, name: "erfc(right_edge)", label: "掩模下的衰减", role: "const",
          note: R`自变量为 0 时 erfc 等于 1，也就是掩模边缘。往开口内它趋近 2，往掩模下方它很快趋近 0。`,
          kids: [
            { id: "edge", tex: R`y-${aa}`, w: 4, name: "dist_past_edge", label: "越过掩模边缘多远", role: "const",
              note: R`$y<a$ 在开口内，$y>a$ 在掩模下方。这个差的正负决定了你站在边缘的哪一侧。` },
            { id: "scale", tex: R`\sqrt2\,${dRlat}`, w: 7, name: "lateral_reach", label: "尺度：杂质钻到掩模下多远", role: "known",
              note: R`**全式的物理核心。**距离只有和它相比才有意义：掩模下方的浓度按这个尺度衰减。能量越高，掺杂区向栅下方延伸得越多，也就影响源漏与栅的交叠。` },
          ] },
        { id: "eL", tex: R`${erfc}\left(\frac{y+${aa}}{\sqrt2\,${dRlat}}\right)`, w: 2, name: "erfc(left_edge)", label: "远处约为 0", role: "const",
          note: R`同样的形状，只是换成另一条边缘 $y=-a$。开口比 $\Delta R_{\rm lat}$ 宽得多时，在右边缘附近这一项接近 0，两条边缘互不干扰。` },
      ] },
  ],
};
