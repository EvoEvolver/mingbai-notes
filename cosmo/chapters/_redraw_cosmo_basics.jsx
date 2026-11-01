import React, { useId, useState } from "react";
import { Tx } from "@kit";

const R = String.raw;
const ink = "#26364b", blue = "#2668b5", teal = "#087e83", orange = "#bd572e";
const card = { padding: "16px", border: "1px solid #cbd5e1", borderRadius: 12, background: "#f8fafc", color: ink };
const svgStyle = { display: "block", width: "100%", height: "auto", fontFamily: "sans-serif", fontSize: 18 };
function Range({ label, value, min, max, step = 0.01, onChange }) {
  const id = useId();
  return <div style={{ margin: "12px 0" }}><label htmlFor={id}>{label}</label><input id={id} type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} style={{ display: "block", width: "100%", minHeight: 32 }} /></div>;
}
function Arrow({ x1, y1, x2, y2, color = ink, width = 3, dashed = false }) {
  const a = Math.atan2(y2-y1, x2-x1), n = 10;
  return <g stroke={color} fill={color}><line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={width} strokeDasharray={dashed ? "6 5" : undefined}/><polygon points={`${x2},${y2} ${x2-n*Math.cos(a-.45)},${y2-n*Math.sin(a-.45)} ${x2-n*Math.cos(a+.45)},${y2-n*Math.sin(a+.45)}`} /></g>;
}
function Canvas({ label, children, height = 310 }) {
  return <svg viewBox={`0 0 640 ${height}`} role="img" aria-label={label} style={svgStyle}><title>{label}</title>{children}</svg>;
}

export function ExpansionRedraw() {
  const [a, setA] = useState(1);
  const spacing = 38*a, cx = 320, cy = 145;
  return <div style={card}>
    <Range label={`标度因子：${a.toFixed(2)}（今天为 1）`} min={0.4} max={1.6} value={a} onChange={setA}/>
    <Canvas label="随标度因子伸缩的共动网格；两个标记星系的坐标始终相差两个网格单位" height={330}>
      {[-2,-1,0,1,2].map(i => <g key={i} stroke="#c1cfdd" strokeWidth={1.5}><line x1={cx-2*spacing} y1={cy+i*spacing} x2={cx+2*spacing} y2={cy+i*spacing}/><line x1={cx+i*spacing} y1={cy-2*spacing} x2={cx+i*spacing} y2={cy+2*spacing}/></g>)}
      <line x1={cx-spacing} y1={cy} x2={cx+spacing} y2={cy} stroke={teal} strokeWidth={5}/>
      {[-1,1].map((i,k)=><g key={i}><circle cx={cx+i*spacing} cy={cy} r={9} fill={k?orange:blue}/><text x={cx+i*spacing} y={cy-20} textAnchor="middle" fill={ink}>{k?"星系 B":"星系 A"}</text></g>)}
      <text x={320} y={290} textAnchor="middle" fill={teal}>共动间隔：2 格 · 物理间隔：{(2*a).toFixed(2)} 长度单位</text>
      <line x1={35} y1={315} x2={73} y2={315} stroke={ink} strokeWidth={3}/><text x={86} y={321} fill={ink}>固定物理标尺：1 长度单位</text>
    </Canvas>
    <Tx>{R`两颗星系的**共动坐标不变**，$\Delta x=2$；物理距离为 $d=a\Delta x$。灰色网格跟随膨胀，底部物理标尺保持不变。这只描述哈勃流，不表示原子、恒星或引力束缚的星系随之变大。`}</Tx>
  </div>;
}

export function ParametrizedPathRedraw() {
  const [u,setU]=useState(.45), [k,setK]=useState(1);
  const point=t=>[85+440*t,245-150*t-37.5*Math.sin(2*Math.PI*t)];
  const [x,y]=point(u), dx=440/k, dy=(-150-75*Math.PI*Math.cos(2*Math.PI*u))/k;
  const path=Array.from({length:101},(_,i)=>{const p=point(i/100);return `${i?"L":"M"}${p[0]},${p[1]}`;}).join(" ");
  return <div style={card}>
    <Range label={`沿路径的位置：原参数 ${(u).toFixed(2)}`} min={0} max={1} value={u} onChange={setU}/>
    <Range label={`参数缩放倍数：${k.toFixed(1)}`} min={.7} max={2} step={.1} value={k} onChange={setK}/>
    <Canvas label="曲线上可移动的点及解析切矢量；改变参数缩放使箭头长度变化，曲线不变" height={350}>
      <Arrow x1={45} y1={285} x2={590} y2={285}/><Arrow x1={45} y1={285} x2={45} y2={25}/>
      <text x={598} y={291}>x¹</text><text x={18} y={25}>x²</text>
      <path d={path} stroke={blue} strokeWidth={4} fill="none"/>
      {[0,1].map(t=>{const [px,py]=point(t);return <g key={t}><circle cx={px} cy={py} r={5} fill={ink}/><text x={px} y={py+26} textAnchor="middle">{t?"终点":"起点"}</text></g>;})}
      <Arrow x1={x} y1={y} x2={x+dx*.13} y2={y+dy*.13} color={orange} width={4}/><circle cx={x} cy={y} r={7} fill={orange}/>
      <text x={320} y={330} textAnchor="middle" fill={orange}>橙色箭头：对新参数的切矢量（统一显示比例）</text>
    </Canvas>
    <Tx>{R`示意曲线取 $x^1(u)=u$、$x^2(u)=u+0.25\sin(2\pi u)$。新参数 $\lambda=ku$，因此 $dx^\mu/d\lambda=(dx^\mu/du)/k$：参数拉长，切矢量缩短，路径不变。这里展示一般参数曲线，不假定它就是某个指定度规的测地线；测地线方程的标准形式要求仿射参数。`}</Tx>
  </div>;
}

export function PhaseCellsRedraw() {
  const [ratio,setRatio]=useState(1);
  const w=56*ratio, h=56/ratio, nx=Math.floor(480/w), ny=Math.floor(210/h);
  return <div style={card}>
    <Range label={`单元形状（位置宽度倍数）：${ratio.toFixed(2)}`} min={.6} max={1.8} value={ratio} onChange={setRatio}/>
    <Canvas label="一维相空间中面积固定的量子态计数单元，宽度变化时高度反比变化" height={330}>
      <Arrow x1={65} y1={260} x2={600} y2={260}/><Arrow x1={65} y1={260} x2={65} y2={20}/><text x={605} y={265}>x</text><text x={40} y={25}>p</text>
      {Array.from({length:ny},(_,j)=>Array.from({length:nx},(_,i)=><rect key={`${i}-${j}`} x={75+i*w} y={250-(j+1)*h} width={w} height={h} fill={i===1&&j===1?"#a8ded9":"#e7eff8"} stroke="#91a7bf"/>))}
      <text x={320} y={300} textAnchor="middle" fill={teal}>面积保持不变 · 宽一些，便矮一些</text>
    </Canvas>
    <Tx>{R`每个内部态的一维半经典**态计数**单元面积为 $\delta x\,\delta p=h=2\pi\hbar$；三维测度相应为 $d^3x\,d^3p/(2\pi\hbar)^3$。图中的网格是计数约定，不是粒子被硬性关住的边界，也不要把它等同于标准差的不确定度下界 $\sigma_x\sigma_p\geq\hbar/2$。改变形状只改变分格方式，不改变每单位相空间体积的态数。`}</Tx>
  </div>;
}

export function CollisionRedraw() {
  const [n,setN]=useState([8,6,2,4]);
  const forward=()=>setN(([a,b,c,d])=>[a-1,b-1,c+1,d+1]);
  const reverse=()=>setN(([a,b,c,d])=>[a+1,b+1,c-1,d-1]);
  const gain=n[2]*n[3],loss=n[0]*n[1];
  return <div style={card}>
    <Canvas label="固定空间位置处两体反应的四种粒子计数。正反应各移走一颗 1、2 并增加一颗 3、4；逆反应相反" height={330}>
      <rect x={25} y={20} width={590} height={280} rx={12} fill="#edf2f7" stroke="#cbd5e1"/>
      <text x={320} y={50} textAnchor="middle">同一个位置内 · 一组允许运动学态</text>
      {[0,1,2,3].map(i=>{const x=70+i*145;return <g key={i}><rect x={x-25} y={80} width={115} height={95} rx={10} fill={i<2?"#dbeafe":"#d0eee8"}/><text x={x+32} y={110} textAnchor="middle">粒子 {i+1}</text><text x={x+32} y={150} textAnchor="middle" fontSize={28} fill={i<2?blue:teal}>{n[i]}</text></g>;})}
      <Arrow x1={205} y1={205} x2={435} y2={205} color={orange}/><text x={320} y={195} textAnchor="middle" fill={orange}>正向：1 + 2 → 3 + 4</text>
      <Arrow x1={435} y1={255} x2={205} y2={255} color={blue}/><text x={320} y={245} textAnchor="middle" fill={blue}>逆向：3 + 4 → 1 + 2</text>
    </Canvas>
    <div style={{display:"flex",gap:10,flexWrap:"wrap"}}><button type="button" disabled={n[0]===0||n[1]===0} onClick={forward}>发生一次正反应</button><button type="button" disabled={n[2]===0||n[3]===0} onClick={reverse}>发生一次逆反应</button><button type="button" onClick={()=>setN([8,6,2,4])}>重置</button></div>
    <p aria-live="polite">总粒子数：{n.reduce((a,b)=>a+b,0)}；逆向增益权重 {gain}，正向损失权重 {loss}，净增益 {gain-loss}。</p>
    <Tx>{R`在相同有效单元体积、相同微观系数的稀薄气体示意中，$C[f_1]\propto f_3f_4-f_1f_2$。按钮按事件更新计数，不是在数值积分连续碰撞方程。每次 $2\leftrightarrow2$ 反应保持**总粒子数**，但各物种数可变；其他反应未必守恒总粒子数。四种动量已假定满足能量与动量守恒；未画出量子增强或阻塞因子。`}</Tx>
  </div>;
}

const channels=[
  {label:"间接探测 / 早期湮灭",incoming:["暗物质 X","暗物质 X"],outgoing:["标准模型粒子","标准模型粒子"],text:R`$X+X\to\mathrm{SM}+\mathrm{SM}$：间接探测寻找湮灭产物。早期宇宙的同类反应影响热遗迹丰度；今天的信号还依赖暗物质分布、速度与传播。`},
  {label:"对撞机产生",incoming:["标准模型粒子","标准模型粒子"],outgoing:["暗物质 X","暗物质 X"],text:R`$\mathrm{SM}+\mathrm{SM}\to X+X$：逆过程需要足够的质心能量；若 $X$ 逃逸，实验通常依靠可见反冲与缺失动量推断它。`},
  {label:"直接探测",incoming:["暗物质 X","标准模型粒子"],outgoing:["暗物质 X","标准模型粒子"],text:R`$X+\mathrm{SM}\to X+\mathrm{SM}$：银河系暗物质弹性散射，将动量传给靶。实际核反冲率还要从微观振幅匹配到核子或原子核，并计入核形状因子。`},
];
export function DetectionCrossingRedraw() {
  const [mode,setMode]=useState(0), c=channels[mode];
  return <div style={card}>
    <div role="group" aria-label="选择暗物质探测途径" style={{display:"flex",gap:8,flexWrap:"wrap"}}>{channels.map((s,i)=><button key={s.label} type="button" aria-pressed={mode===i} onClick={()=>setMode(i)} style={{background:mode===i?blue:undefined,color:mode===i?"white":undefined}}>{s.label}</button>)}</div>
    <Canvas label={`${c.label}：${c.incoming.join("加")}进入同一相互作用，产生${c.outgoing.join("加")}`} height={320}>
      <rect x={245} y={95} width={150} height={120} rx={22} fill="#d7e4f5" stroke={blue} strokeWidth={2}/><text x={320} y={145} textAnchor="middle">同一理论的</text><text x={320} y={175} textAnchor="middle">相互作用</text>
      {[0,1].map(i=><g key={i}><text x={20} y={i?275:45} fill={ink}>{c.incoming[i]}</text><Arrow x1={105} y1={i?245:70} x2={245} y2={i?185:125} color={blue}/><Arrow x1={395} y1={i?185:125} x2={535} y2={i?245:70} color={teal}/><text x={430} y={i?275:45} fill={ink}>{c.outgoing[i]}</text></g>)}
      <text x={320} y={310} textAnchor="middle" fill={orange}>关联振幅 · 各自不同的运动学与实验环境</text>
    </Canvas>
    <Tx>{c.text}</Tx>
    <Tx>{R`**交叉关系关联的是散射振幅的解析结构，不意味着三个截面或事件率相等。** 不同途径取不同运动学区域，还受阈值、自旋、速度依赖和实验靶材影响；仅给出热遗迹湮灭截面，不能直接读出直接探测截面。若暗物质不是自身反粒子，湮灭腿应区分 $X$ 与 $\bar X$；此图沿用简写。`}</Tx>
  </div>;
}
