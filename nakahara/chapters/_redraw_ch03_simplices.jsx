import React, { useId, useState } from 'react';

const ink = '#253e57', blue = '#167aac', mint = '#34a58b', orange = '#c65c31';
const panel = { padding: '14px', background: 'var(--panel, #f6f8fa)', borderRadius: 12, color: ink };
const controls = { display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 8 };
function Choices({ value, set, options, label }) {
  return <div role="group" aria-label={label} style={controls}>{options.map(([v,t]) => <button key={v} type="button" aria-pressed={value === v} onClick={() => set(v)} style={{ padding:'7px 12px', borderRadius:7, cursor:'pointer', border:`1px solid ${value === v ? blue : '#b6c5ce'}`, background:value === v ? '#deeff9' : '#fff', color:ink }}>{t}</button>)}</div>;
}
function Canvas({ label, children, height=240 }) {
  return <svg viewBox={`0 0 640 ${height}`} role="img" aria-label={label} style={{ display:'block', width:'100%', height:'auto', maxHeight:390, color:ink }}><title>{label}</title>{children}</svg>;
}
function Note({ children }) { return <p aria-live="polite" style={{ fontSize:14, lineHeight:1.7, margin:'12px 0 0', textAlign:'center' }}>{children}</p>; }
function Point({ x,y,label, color=ink, dx=9,dy=-10 }) { return <g><circle cx={x} cy={y} r="4.5" fill={color}/>{label && <text x={x+dx} y={y+dy} fill={color} fontSize="15">{label}</text>}</g>; }
function Edge({ a,b,color=ink,dashed=false,arrow=false }) {
  const id=useId().replace(/:/g,'');
  return <g>{arrow && <defs><marker id={id} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={color}/></marker></defs>}<line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} strokeWidth="2.7" strokeDasharray={dashed?'6 5':undefined} markerEnd={arrow?`url(#${id})`:undefined}/></g>;
}
const tri=[[150,50],[70,190],[230,190]];
const polygon=p=>p.map(x=>x.join(',')).join(' ');
function Triangle({ points=tri, fill='#d9eee8', stroke=ink }) { return <polygon points={polygon(points)} fill={fill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round"/>; }

export function FilledLoopFigure() {
 const [filled,set]=useState(false);
 return <div style={panel}><Canvas label="实心三角形与只含三条边的空间"><g transform="translate(10 0)"><Triangle/><text x="150" y="225" textAnchor="middle" fontSize="16">(a) 包含内部</text><text x="150" y="145" textAnchor="middle" fill={mint} fontSize="16">边界围住一张面</text></g><g transform="translate(330 0)"><Triangle fill={filled?'#d9eee8':'none'}/><text x="150" y="225" textAnchor="middle" fontSize="16">(b) {filled?'加入内部后的空间':'只有边的空间'}</text>{!filled&&<text x="150" y="145" textAnchor="middle" fill={orange} fontSize="16">内部不在空间里</text>}</g></Canvas><Choices value={filled} set={set} label="右图是否包含三角形内部" options={[[true,'右图：加入内部'],[false,'右图：只保留边']]}/><Note>{filled?'右图加入一张二维面后，闭路成为这张面的边界。':'三条边仍然是一条闭路；但在右侧这个空间里，没有二维面以它为边界。'}</Note></div>;
}

const tetra=[[300,38],[165,180],[325,223],[450,160]];
const tetraEdges=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
function Tetra({ selected=[] }) {
 return <g><Triangle points={[tetra[0],tetra[1],tetra[2]]} fill="#e7f1f5"/><Triangle points={[tetra[0],tetra[2],tetra[3]]} fill="#d3e5ef"/>{selected.length===3&&<Triangle points={selected.map(i=>tetra[i])} fill="#f4c99f" stroke={orange}/>}{tetraEdges.map(([a,b])=><Edge key={`${a}${b}`} a={tetra[a]} b={tetra[b]} dashed={a===1&&b===3} color={selected.length===2&&selected.includes(a)&&selected.includes(b)?orange:ink}/>)}{tetra.map(([x,y],i)=><Point key={i} x={x} y={y} label={`p${i}`} color={selected.includes(i)?orange:ink}/>)}</g>;
}
export function SimplexDimensionsFigure() {
 const [dimension,set]=useState(2);
 return <div style={panel}><Canvas label={`展示 ${dimension} 维单形与它的顶点`} height={270}>{dimension===0?<Point x={320} y={135} label="p0"/>:dimension===1?<><Edge a={[190,130]} b={[450,130]}/><Point x={190} y={130} label="p0"/><Point x={450} y={130} label="p1"/></>:dimension===2?<g transform="translate(170 10)"><Triangle/>{tri.map(([x,y],i)=><Point key={i} x={x} y={y} label={`p${i}`}/>)}</g>:<Tetra/>}<text x="320" y="260" textAnchor="middle" fontSize="16">{['点','线段','实心三角形','实心四面体'][dimension]}：{dimension+1} 个几何独立的顶点</text></Canvas><Choices value={dimension} set={set} label="选择单形维数" options={[0,1,2,3].map(n=>[n,`${n} 维`])}/><Note>二维与三维单形都包含内部；四面体的虚线表示被遮挡的棱。</Note></div>;
}
export function SimplexFacesFigure() {
 const [face,set]=useState('face');
 const selected=face==='vertex'?[0]:face==='edge'?[1,2]:[1,2,3];
 return <div style={panel}><Canvas label="四面体中所选的顶点、棱或三角形面" height={270}><Tetra selected={selected}/><text x="320" y="262" textAnchor="middle" fill={orange} fontSize="16">高亮顶点：{selected.map(i=>`p${i}`).join('、')}</text></Canvas><Choices value={face} set={set} label="选择四面体的面" options={ [['vertex','0 面：顶点'],['edge','1 面：棱'],['face','2 面：三角形']] }/><Note>一个四面体共有 4 个顶点、6 条棱、4 张二维面，以及它自身这一个三维面。</Note></div>;
}

export function ComplexRulesFigure() {
 const [valid,set]=useState(true);
 return <div style={panel}><Canvas label={valid?'沿公共顶点拼接的单纯复形':'线段接在三角形一条边的内部，违反公共面条件'} height={260}>
 <Triangle points={[[110,80],[280,80],[190,215]]}/><Triangle points={[[280,80],[430,80],[355,215]]} fill="#dce9f7"/>
 <Edge a={valid?[280,80]:[195,80]} b={[280,25]} color={valid?ink:orange}/>
 {[[110,80],[280,80],[190,215],[430,80],[355,215],[280,25]].map(([x,y],i)=><Point key={i} x={x} y={y}/>)}
 {!valid&&<><circle cx="195" cy="80" r="10" fill="none" stroke={orange} strokeWidth="3"/><text x="370" y="35" fill={orange} fontSize="15">交点不是大三角形的顶点</text></>}
 <text x="320" y="250" textAnchor="middle" fontSize="16" fill={valid?mint:orange}>{valid?'公共顶点属于双方：合格':'只加交点还不够：原三角形也必须细分'}</text>
 </Canvas><Choices value={valid} set={set} label="比较合法与非法的单形拼接" options={[[true,'(a) 公共面相交'],[false,'(b) 棱内相交']]}/><Note>所有构件的面也都应收入复形。切换后，橙色线段接在大三角形的棱内部；该交点不是大三角形的一个面。</Note></div>;
}

export function CylinderTriangulationFigure() {
 const [segments,set]=useState(3);
 const [highlight,setHighlight]=useState(true);
 const w=450/segments, top=55, bottom=215;
 const x=i=>95+i*w;
 const name=(i,upper)=>segments===2 ? (upper?['p0','p2','p0'][i]:['p1','p3','p1'][i]) : `${upper?'a':'b'}${i%segments}`;
 return <div style={panel}><Canvas label={`圆柱面粘合图，横向 ${segments} 格，左右同名顶点粘合`} height={285}>
 {Array.from({length:segments},(_,i)=><g key={i}><Triangle points={[[x(i),top],[x(i),bottom],[x(i+1),top]]} fill={highlight&&i===0?'#f4c99f':'#dfedf5'}/><Triangle points={[[x(i),bottom],[x(i+1),bottom],[x(i+1),top]]} fill={highlight&&i===1&&segments===3?'#bfe1d8':'#edf4f8'}/></g>)}
 {segments===2&&highlight&&<Triangle points={[[x(1),top],[x(1),bottom],[x(2),top]]} fill="#bfe1d8"/>}
 {[0,segments].map(i=><Edge key={i} a={[x(i),185]} b={[x(i),90]} color={blue} arrow/>)}
 {Array.from({length:segments+1},(_,i)=><g key={i}><Point x={x(i)} y={top} label={name(i,true)} dy={-14} dx={-8}/><Point x={x(i)} y={bottom} label={name(i,false)} dy={25} dx={-8}/></g>)}
 <text x="320" y="275" textAnchor="middle" fill={segments===3?mint:orange} fontSize="16">{segments===3?'(a) 6 顶点 · 12 条不同的棱 · 6 张面':'(b) 两格太少：粘合后违反公共面条件'}</text>
 </Canvas><Choices value={segments} set={set} label="比较圆柱面的两种剖分" options={[[3,'(a) 三格：合格'],[2,'(b) 两格：不合格']]}/><Choices value={highlight} set={setHighlight} label="是否高亮相交的三角形" options={[[true,'高亮两个三角形'],[false,'查看全部网格']]}/><Note>{segments===3?'同名顶点只在左右接缝处粘合。三格模型的每条棱由唯一的顶点对决定，任意两张三角形只沿一个公共面相交。':'橙色三角形 p0 p1 p2 与绿色三角形 p2 p3 p0 粘合后只共有两个分离的顶点 p0、p2；顶边的两段还是同端点的不同棱，不能当作一个抽象单纯复形。'}</Note></div>;
}

export function SimplexOrientationFigure() {
 const [reverse,set]=useState(false);
 const order=reverse?[0,2,1]:[0,1,2];
 const triangle=[[465,50],[390,195],[550,195]];
 return <div style={panel}><Canvas label={reverse?'线段与三角形的反向定向':'线段与三角形的正向定向'} height={245}>
 <Edge a={reverse?[245,130]:[85,130]} b={reverse?[85,130]:[245,130]} arrow color={blue}/><Point x={85} y={130} label="p0" dy={-20}/><Point x={245} y={130} label="p1" dy={-20}/><Triangle points={triangle}/>{order.map((a,i)=>{const b=order[(i+1)%3],p=triangle[a],q=triangle[b];return <Edge key={i} a={[p[0]*.78+q[0]*.22,p[1]*.78+q[1]*.22]} b={[p[0]*.22+q[0]*.78,p[1]*.22+q[1]*.78]} arrow color={blue}/>;})}{triangle.map(([x,y],i)=><Point key={i} x={x} y={y} label={`p${i}`}/>)}<text x="165" y="235" textAnchor="middle" fontSize="16">(a) {reverse?'p1 → p0':'p0 → p1'}</text><text x="470" y="235" textAnchor="middle" fontSize="16">(b) {order.map(i=>`p${i}`).join(' → ')} → p0</text>
 </Canvas><Choices value={reverse} set={set} label="选择单形定向" options={[[false,'原定向'],[true,'交换两个顶点']]}/><Note>交换两个顶点，定向变号；三角形顶点循环轮换则保留定向。定向记录绕行规则，不改变单形的点集。</Note></div>;
}

export function BoundaryCancellationFigure() {
 const [closed,set]=useState(false);
 const [second,setSecond]=useState(true);
 const points=closed?[[320,40],[200,190],[440,190]]:[[100,125],[320,125],[540,125]];
 const pairs=closed?[[0,1],[1,2],[2,0]]:[[0,1],[1,2]];
 const coeff=[0,0,0];pairs.forEach(([a,b],i)=>{if(i!==1||second){coeff[a]--;coeff[b]++;}});
 return <div style={panel}><Canvas label="有向链的端点系数逐项相加，公共端点抵消" height={265}>{pairs.map(([a,b],i)=><g key={i} opacity={i === 1 && !second ? 0.15 : 1}><Edge a={points[a]} b={points[b]} arrow color={i===1?mint:blue}/></g>)}{points.map(([x,y],i)=><g key={i}><Point x={x} y={y} label={`p${i}`} dy={-15}/><text x={x} y={y+33} textAnchor="middle" fill={coeff[i]===0?mint:orange} fontSize="18">{coeff[i]>0?'+':''}{coeff[i]}</text></g>)}<text x="320" y="260" textAnchor="middle" fontSize="16" fill={coeff.every(n=>n===0)?mint:ink}>数字表示边界在各顶点上的总系数</text></Canvas><Choices value={closed} set={set} label="选择链的形状" options={[[false,'(a) 两段线段'],[true,'(b) 三角闭路']]}/><Choices value={second} set={setSecond} label="控制第二条边是否计入链" options={[[true,'计入绿色边'],[false,'移去绿色边']]}/><Note>{closed?(second?'每个顶点都作为起点与终点各出现一次，边界为零。':'移去一条边后出现两个未抵消的端点，闭路被打开。'):(second?'中间点 p1 的系数是 +1 与 −1 之和，只剩终点 p2 减起点 p0。':'只剩 p0 到 p1：p1 此时是真正的终点。')} 这里遵守“终点减起点”，不会产生虚假边界。</Note></div>;
}
