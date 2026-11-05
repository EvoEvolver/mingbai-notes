// §7.16 多晶硅中的扩散 —— 式 (7.61)–(7.63)
import { useEffect, useState } from "react";
import { Sec, Tx, Eq, Box, Details, C, FormulaMap } from "@kit";
import { FM_7_61, FM_7_62 } from "./_ch07b_fmaps.jsx";
import { PolyPlot } from "./_ch07b_plots.jsx";

const R = String.raw;
const Cgr = R`\sym{Cgr}{C}_{\rm A}^{\rm grain}`, Cgb = R`\sym{Cgb}{C}_{\rm A}^{\rm gb}`, Dgr = R`\sym{Dgr}{D}_{\rm A}^{\rm grain}`, Dgb = R`\sym{Dgb}{D}_{\rm A}^{\rm gb}`;

// 柱状晶粒与晶界快速扩散的示意动画（自绘）：晶界上的点走得快，晶粒内的点走得慢
const GB = [60, 128, 205, 262, 340, 410, 470];          // 晶界的 x 位置（柱状晶，略倾斜）
function rand(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; }
export function PolyGrainSketch() {
  const [t, setT] = useState(0), [run, setRun] = useState(true);
  useEffect(() => { if (!run) return; let raf, t0 = performance.now(); const f = now => { setT(((now - t0) / 1000) % 12); raf = requestAnimationFrame(f); }; raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf); }, [run]);
  const rnd = rand(7), dots = [];
  for (let k = 0; k < 70; k++) {
    const x0 = 30 + rnd() * 470, y0 = 62 + rnd() * 18;
    const nearGB = GB.reduce((b, g) => Math.abs(g - x0) < Math.abs(b - x0) ? g : b, GB[0]);
    const reach = Math.min(1, t / (2 + 6 * Math.abs(nearGB - x0) / 40));    // 先在晶粒内横向走到晶界
    const onGB = reach >= 1, x = x0 + (nearGB - x0) * reach;
    const y = onGB ? Math.min(230, y0 + (t - (2 + 6 * Math.abs(nearGB - x0) / 40)) * 26 * (0.6 + rnd())) : y0 + 4 * reach * rnd();
    dots.push(<circle key={k} cx={x} cy={y} r="3.2" fill={onGB ? "#c0392b" : "#e07b39"} opacity=".9" />);
  }
  return <div style={{ background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 12, padding: 12 }}>
    <svg viewBox="0 0 540 270" role="img" aria-label="多晶硅柱状晶粒中掺杂沿晶界快速扩散的示意" style={{ width: "100%", display: "block", fontFamily: "system-ui,sans-serif" }}>
      <rect x="20" y="50" width="490" height="190" fill="#b5654a" opacity=".28" />
      {GB.map((g, i) => <line key={i} x1={g} y1="50" x2={g + (i % 2 ? 6 : -5)} y2="240" stroke="#7a3b26" strokeWidth="2.4" />)}
      <rect x="20" y="240" width="490" height="18" fill="#cfe3f3" /><text x="265" y="254" textAnchor="middle" fontSize="12">栅氧 / 衬底</text>
      <rect x="20" y="40" width="490" height="10" fill="#e8e1d4" /><text x="265" y="34" textAnchor="middle" fontSize="12.5">注入的 As 起初在近表面的晶粒内部</text>
      {dots}
      <g fontSize="12" fill="#333"><circle cx="40" cy="266" r="3.5" fill="#e07b39" /><text x="48" y="270">晶粒内（慢）</text><circle cx="150" cy="266" r="3.5" fill="#c0392b" /><text x="158" y="270">已偏析到晶界（快）</text><line x1="290" x2="310" y1="266" y2="266" stroke="#7a3b26" strokeWidth="2.4" /><text x="316" y="270">晶界</text></g>
    </svg>
    <div style={{ textAlign: "center" }}><button onClick={() => setRun(!run)} style={{ padding: "5px 12px", borderRadius: 7, border: "1px solid #bcb6a9", background: "#fffdf8", cursor: "pointer" }}>{run ? "暂停" : "继续"}</button></div>
  </div>;
}

export function Sec716() {
  return (
    <Sec n="7.16" title="Diffusion in Polysilicon" zh="多晶硅中的扩散"
      gist={R`多晶硅中掺杂扩散极快：沿晶界的扩散率约为晶粒内的 $10^4$ 倍，但杂质要先从晶粒内扩散到晶界并偏析其上。"两股流"模型 (7.61)(7.62) 分别追踪晶粒内与晶界上的掺杂，以有效转移速率 $k_{\rm eff}$ 和偏析系数 $s$ 耦合；晶粒按 (7.63) 长大。`}
      why={R`多晶硅栅必须掺到栅氧界面（避免多晶耗尽）又不能穿透薄栅氧；多晶硅还用作浅结/发射区的扩散源和高阻电阻——都取决于多晶硅中的扩散。`}
      gives={["7.61", "7.62", "7.63"]}>
      <p className="muted">本节概念：<C id="poly" /></p>
      <Tx>{R`**为什么关心多晶硅。**在 CMOS 工艺中，栅极要被均匀地重掺杂，而且要一直掺到与栅氧的界面——否则加栅压时栅内靠近界面处会耗尽（多晶耗尽，poly depletion），使栅电容显得比设计值小；同时杂质又**不能**穿透薄栅氧，否则会改变阈值电压。与硅直接接触的重掺杂多晶硅可以作为扩散源，形成浅结、埋接触或双极晶体管的发射区，此时衬底中的掺杂分布受多晶硅中扩散的影响。轻掺杂多晶硅可做高阻值电阻，其性能受限于掺杂从重掺杂接触端沿晶界向电阻体内的扩散。

**多晶硅的结构取决于沉积与退火。**最常用的沉积方法是在低压下于 575–650 °C 分解硅烷 $\mathrm{SiH_4}$（低压化学气相沉积，LPCVD）。最低温时薄膜为非晶或微晶，晶粒小于 5 nm；较高温时由取向各异的单晶晶粒组成，常有强烈的择优织构和柱状形貌，晶粒可达 50 nm 并贯穿膜厚。退火使晶粒长大；掺杂会同时增大初始晶粒尺寸和晶粒生长速率。`}</Tx>
      <PolyGrainSketch />
      <p className="muted" style={{ fontSize: 13, textAlign: "center" }}>自绘示意：柱状晶粒（红棕色）中的掺杂先在晶粒内缓慢地横向扩散到最近的晶界（深棕色线），偏析到晶界后沿晶界快速向下输运。</p>
      <Tx>{R`**四个机制。**精确刻画晶粒与晶界的微观结构是不可能的，但多晶硅中掺杂的平均行为可以用四个主要机制来描述：

◆ (1) 沿晶界的快速扩散；

◆ (2) 晶粒内部的扩散；

◆ (3) 掺杂在晶粒内部与晶界之间的偏析；

◆ (4) 晶粒长大过程中掺杂的输运。

**一个具体过程。**设把 As 注入多晶硅后在 800 °C 氮气中退火。注入后 As 主要在晶粒内部；退火时它从晶粒内扩散到晶界并优先偏析在那里——不同取向晶粒之间的弱键或不规则成键为掺杂提供了天然的"汇"，晶界又是快速扩散的通道。能到达晶界的掺杂量受晶粒内慢扩散的限制；晶粒内部是规则晶格，其扩散就是体硅中常见的浓度依赖扩散。因此**晶粒越大**，掺杂在晶粒内要走得越远才能偏析到晶界，表面附近的峰越高、向深处扩散得越少。

晶界扩散率大约是单晶晶粒中的 10 000 倍。由于晶粒内与晶界扩散的相互制约，最简单的模型干脆把体扩散率乘以 100。更精细的模型追踪两股掺杂流：`}</Tx>
      <FormulaMap n="7.61" keyEq title="多晶硅：晶粒内的掺杂" say="晶粒内的掺杂一方面按晶粒内（慢）扩散率扩散，另一方面以速率 k_eff 向晶界转移，直到晶界浓度与 s 倍晶粒浓度相等。" tree={FM_7_61} start="k" />
      <FormulaMap n="7.62" keyEq title="多晶硅：晶界上的掺杂" say="晶界上的掺杂按晶界（快）扩散率扩散，并获得晶粒内转移过来的那一份——交换项与 (7.61) 大小相等、符号相反，掺杂总量守恒。" tree={FM_7_62} start="D" />
      <Tx>{R`其中 $k_{\rm eff}$ 是晶粒与晶界之间的有效转移速率，$s$ 是两者之间的有效偏析系数：交换停止时 $${Cgb}=s\,${Cgr}$。把两式相加，交换项抵消，总浓度 $${Cgr}+${Cgb}$ 只随扩散改变——两股流之间只是"换手"，不产生也不消灭掺杂。

晶粒被假定通过硅原子向能量有利的晶粒扩散而长大，晶粒尺寸随时间变化为`}</Tx>
      <Eq n="7.63" keyEq title="晶粒长大" say="晶粒尺寸的平方随时间线性增长：长大的速度越来越慢，与扩散长度随时间的规律一样。">{R`L_{\rm g}(t)=\sqrt{L_{\rm go}^2+2\sigma t}`}</Eq>
      <Tx>{R`$L_{\rm go}$ 为初始晶粒尺寸，$\sigma$ 是原子向晶界扩散的有效常数（量纲为 $\mathrm{cm^2/s}$）。注意 $L_{\rm g}^2-L_{\rm go}^2=2\sigma t$ 与一维扩散长度平方 $2Dt$ 的形式相同——晶粒长大本身就是一个扩散控制的过程。基于这类两股流模型的数值模拟，对多晶硅中复杂的扩散分布拟合得相当好。`}</Tx>
      <PolyPlot caption={R`交互：两股流模型 \eqref{7.61}–\eqref{7.63} 的数值解。$0.3\,\mathrm{\mu m}$ 多晶硅膜，$10^{15}\,\mathrm{cm^{-2}}$ As 注入（$R_p=40\,\mathrm{nm}$、$\Delta R_p=15\,\mathrm{nm}$，起初全在晶粒内），两端零通量；取 $D_{\rm A}^{\rm grain}=10^{-16}\,\mathrm{cm^2/s}$（约为 800 °C 量级）。原书未给出 $k_{\rm eff}$ 的表达式，本图采用的建模假设是：$k_{\rm eff}=\pi^2D_{\rm A}^{\rm grain}/L_{\rm g}(t)^2$（掺杂在尺寸为 $L_{\rm g}$ 的晶粒内扩散到晶界的最低模式），$L_{\rm g}(t)$ 由 \eqref{7.63} 给出。对照：只有晶粒内扩散的单晶硅（点线）与"体扩散率乘 100"的简化模型（点划线）。增大 $L_{\rm go}$ 可以看到原书所说的现象：表面峰更高、深处更少。`} />
      <Box kind="physics" title="交互图中的三个时间尺度">{R`(1) 晶界扩散：$\sqrt{D^{\rm gb}t}$，取 $10^4\times10^{-16}\,\mathrm{cm^2/s}$ 与 30 min，约 $0.4\,\mathrm{\mu m}$，超过膜厚——一旦进入晶界，掺杂几乎立即铺满整层。(2) 晶粒内扩散：$\sqrt{D^{\rm grain}t}\approx4\,\mathrm{nm}$，远小于膜厚——单晶中 As 几乎不动。(3) 转移：$1/[k_{\rm eff}(1+1/s)]$，晶粒 20 nm 时约一小时量级，与退火时间相当。所以多晶硅中的分布是**转移受限**的：表面附近保留注入峰（尚未转移的晶粒内部分），深处是平坦的晶界平台。"乘 100"的简化模型无法同时给出这两个特征。`}</Box>
      <Details summary="小练习：晶粒长大让交换变慢多少？">{R`取 $L_{\rm go}=20\,\mathrm{nm}$、$\sigma=0.1\,\mathrm{nm^2/s}$，30 min 后 $L_{\rm g}=\sqrt{400+2\times0.1\times1800}=\sqrt{760}\approx27.6\,\mathrm{nm}$（交互图图例给出同一数值）。按本页假设 $k_{\rm eff}\propto1/L_{\rm g}^2$，交换速率降为初始值的 $400/760\approx0.53$ 倍。晶粒长大因此会"冻结"一部分掺杂在晶粒内——这正是第 4 个机制（晶粒长大中的输运）需要单独考虑的原因之一。`}</Details>
    </Sec>);
}
