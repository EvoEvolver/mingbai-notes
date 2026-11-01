import {useState} from 'react';
import {Diagram,Label,Arrow,Dot,Curve,Torus,Sphere,Range,Choices,blue,red,green,gold} from './_redraw_primitives.jsx';
const R=String.raw;

function IntegrationContour(){
 const [radius,setRadius]=useState(100);
 return <Diagram title="高斯积分的复平面旋转围道" controls={<Range label={`围道半径 R：${(radius/100).toFixed(2)}`} min={65} max={115} step={1} value={radius} onChange={setRadius}/>} note={R`右半围道依次走实轴、顺时针 $\pi/4$ 圆弧、对角线返回原点；左半围道相应闭合。圆弧是八分之一圆周，方向与积分上下限一致。`}>
 <Arrow a={[90,140]} b={[585,140]}/><Arrow a={[340,270]} b={[340,20]}/><Label x={595} y={165}>Re z</Label><Label x={390} y={30}>Im z</Label>
 <Arrow a={[340,140]} b={[340+radius,140]} color={red} label="1"/>
 <Curve f={t=>[340+radius*Math.cos(t*Math.PI/4),140+radius*Math.sin(t*Math.PI/4)]} color={red}/>
 <Arrow a={[340+radius*.94,140+radius*.34]} b={[340+radius*.84,140+radius*.54]} color={red} label="2"/>
 <Arrow a={[340+radius/Math.sqrt(2),140+radius/Math.sqrt(2)]} b={[340-radius/Math.sqrt(2),140-radius/Math.sqrt(2)]} color={green}/><Label x={285} y={105} color={green}>3</Label>
 <Curve f={t=>[340+radius*Math.cos(3*Math.PI/4+t*Math.PI/4),140-radius*Math.sin(3*Math.PI/4+t*Math.PI/4)]} color={gold}/>
 <Arrow a={[340-radius*.86,140-radius*.5]} b={[340-radius*.97,140-radius*.23]} color={gold} label="4"/>
 <Arrow a={[340-radius,140]} b={[340,140]} color={red}/><Label x={450} y={260}>旋转直线：Im z = −Re z</Label>
 </Diagram>;
}
function Paths(){const[a,setA]=useState(.45);return <Diagram title="固定端点之间的不同路径" controls={<Range label="改变一条路径，中间位置变、端点不变" value={a} onChange={setA}/>} note={R`每条路径都是时间的单值函数 $x(t)$，它们拥有相同的起终点。路径积分对所有中间位置积分；橙色路径仅是一个可调例子，不是“最可能轨道”。`}>
 <Arrow a={[90,250]} b={[590,250]} label="x"/><Arrow a={[90,250]} b={[90,25]} label="t"/>
 {[0,.25,.6,1].map((k,i)=><Curve key={i} f={t=>[155+360*t+90*(k-.5)*Math.sin(Math.PI*t),235-200*t]} color={i===2?green:'#bdcbd1'}/>)}
 <Curve f={t=>[155+360*t+150*(a-.5)*Math.sin(3*Math.PI*t),235-200*t]} color={red}/><Dot x={155} y={235} label="(xi, ti)"/><Dot x={515} y={35} label="(xf, tf)"/>
 </Diagram>;}
function Pullback(){return <Diagram title="函数拉回：沿映射预先复合" note={R`$f:V\to W$ 把点送向右；$f^*$ 把函数送向左。先到 $f(x)$ 再求 $g$，就是在 $x$ 处计算 $f^*g$。`}>
 {[['V',110,85],['W',340,85],['K',570,85],['函数空间 V*',130,225],['函数空间 W*',510,225]].map(([s,x,y])=><Label key={s} x={x} y={y}>{s}</Label>)}
 <Arrow a={[145,80]} b={[305,80]} label="f"/><Arrow a={[375,80]} b={[535,80]} label="g"/><Curve f={t=>[110+460*t,60-100*Math.sin(Math.PI*t)]} color={green}/><Label x={340} y={30}>g ∘ f</Label><Arrow a={[420,220]} b={[230,220]} label="f*" color={red}/><Label x={340} y={275}>g ↦ g ∘ f</Label>
 </Diagram>;}
function Homeomorphisms(){return <Diagram title="抽象空间的同胚与在三维中的环境同痕不同" height={350} note={R`杯子的表面和环面各有一个环柄，可建立同胚。两个圆的无交并 $S^1\sqcup S^1$，无论在三维里相扣或分离，作为抽象空间都同胚；但链环不能在三维里不穿透地解开，这涉及环境同痕。`}>
 <path d="M55 55 H175 V145 Q115 205 55 145 Z M175 70 C245 55 245 145 175 140" stroke={blue} fill="#e8f0f7" strokeWidth={3}/><ellipse cx={115} cy={55} rx={60} ry={17} fill="#fffdf8" stroke={blue}/><Arrow a={[245,115]} b={[310,115]} label="同胚"/><Torus x={465} y={115} rx={105} ry={58}/>
 <ellipse cx={125} cy={265} rx={65} ry={30} fill="none" stroke={red} strokeWidth={4}/><ellipse cx={175} cy={265} rx={30} ry={60} fill="none" stroke={blue} strokeWidth={4}/><Arrow a={[280,265]} b={[355,265]} label="抽象同胚"/><circle cx={440} cy={265} r={42} fill="none" stroke={red} strokeWidth={3}/><circle cx={555} cy={265} r={42} fill="none" stroke={blue} strokeWidth={3}/>
 </Diagram>;}
function PolyhedralTorus(){return <Diagram title="有方形孔的多面体表面与环面" note={R`画的是实体的表面：把长方形框的八个拐角逐渐磨圆，不改变一个环柄的拓扑。方框中心的空洞始终保留；不是把实心实体与二维曲面混为一谈。`}>
 <path d="M55 85 H270 V205 H55Z M110 120 H215 V170 H110Z" fill="#dcebf3" fillRule="evenodd" stroke={blue} strokeWidth={3}/><path d="M55 85 l30 -35 H305 V170 l-35 35 M270 85 l35 -35 M270 205 V85 M110 120 l25 -20 H215 V170" fill="none" stroke={blue}/><Arrow a={[335,140]} b={[390,140]} label="磨圆"/><Torus x={530} y={145} rx={105} ry={70}/>
 </Diagram>;}
// 封闭多柄曲面的透视示意：连续外轮廓是可见轮廓，椭圆孔是环柄，均非自由边界。
function HandleSurface({x=420,y=140,width=220,height=120,g=2,cycles=false,phase=.3}){
 const left=x-width/2,right=x+width/2,top=y-height/2,bottom=y+height/2,r=height/2;
 const step=width/(g+.45),rx=step*.26,ry=height*.18;
 const centers=Array.from({length:g},(_,i)=>left+width/2+(i-(g-1)/2)*step);
 const outer=`M${left+r},${top} H${right-r} Q${right},${top} ${right},${y} Q${right},${bottom} ${right-r},${bottom} H${left+r} Q${left},${bottom} ${left},${y} Q${left},${top} ${left+r},${top} Z`;
 const holes=centers.map(cx=>`M${cx-rx},${y} a${rx},${ry} 0 1 0 ${2*rx},0 a${rx},${ry} 0 1 0 ${-2*rx},0 Z`).join(' ');
 return <g><path d={outer+' '+holes} fill="#dceaf2" stroke={blue} strokeWidth={2.6} fillRule="evenodd"/>{centers.map((cx,i)=><g key={i}><path d={`M${cx-rx},${y} Q${cx},${y+ry*1.8} ${cx+rx},${y}`} fill="none" stroke="#86a8bd" strokeWidth={1.5}/>{cycles&&<><ellipse cx={cx} cy={y} rx={rx+step*.12} ry={ry+height*.14} fill="none" stroke={blue} strokeWidth={2.5}/><path d={`M${cx+rx*.3},${y-ry} C${cx+rx+phase*12},${top-5} ${cx+rx+phase*12},${bottom+5} ${cx+rx*.3},${y+ry}`} fill="none" stroke={red} strokeWidth={2.7}/><path d={`M${cx+rx*.3},${y+ry} Q${cx-rx*.2},${y} ${cx+rx*.3},${y-ry}`} fill="none" stroke={red} strokeDasharray="4 3" strokeWidth={2}/><Label x={cx} y={bottom+40}>a{i+1} · b{i+1}</Label></>}</g>)}</g>;
}
function ConnectedSum(){const[g,setG]=useState(1);return <Diagram title="曲面的连通和：各去一个圆盘再粘合边界" controls={<Choices value={g} onChange={setG} options={[[0,'球面 # 球面'],[1,'环面 # 环面']]}/>} note={g?R`两环面各去掉一个圆盘，沿边界粘合，得到亏格二曲面。$χ(M\#N)=\chi(M)+\chi(N)-2$。右侧用一个连续外轮廓和两个孔表现连通的亏格二封闭曲面；可见轮廓不是曲面的自由边界。`:R`两个球面各挖去一个圆盘后均为圆盘；把两条边界粘合，又得到球面。`}>
 {g?<><Torus x={125} y={130} rx={85} ry={60}/><Torus x={340} y={130} rx={85} ry={60}/></>:<><Sphere x={125} y={130} r={65}/><Sphere x={340} y={130} r={65}/></>}<Label x={230} y={135}>#</Label><Arrow a={[435,130]} b={[480,130]}/>{g?<HandleSurface x={580} y={130} width={175} height={100} g={2}/>:<Sphere x={585} y={130} r={65}/>}<Label x={340} y={265}>{g?'g = 1 + 1 = 2；χ = −2':'g = 0；χ = 2'}</Label>
 </Diagram>;}
function GenusPolygon(){const[g,setG]=useState(2);const n=4*g,pts=Array.from({length:n},(_,i)=>[190+105*Math.cos(-Math.PI/2+2*Math.PI*i/n),140+105*Math.sin(-Math.PI/2+2*Math.PI*i/n)]);return <Diagram title="标准4g边形与亏格g曲面" controls={<Range label={`亏格 g = ${g}`} min={1} max={4} step={1} value={g} onChange={setG}/>} note={R`每个环柄贡献一组交换子 $a_i b_i a_i^{-1}b_i^{-1}$。四条边按相同字母的箭头配对；全部顶点归为一个点，$V-E+F=1-2g+1=2-2g$。`}>
 <polygon points={pts.map(p=>p.join(',')).join(' ')} fill="#e8f0f7" stroke={blue}/>{pts.map((p,i)=>{const q=pts[(i+1)%n],reverse=i%4>=2;return <Arrow key={i} a={reverse?q:p} b={reverse?p:q} color={i%2?red:blue} label={`${i%2?'b':'a'}${Math.floor(i/4)+1}`}/>;})}<Arrow a={[330,140]} b={[385,140]}/><HandleSurface x={525} y={140} width={245} height={115} g={g}/><Label x={515} y={250}>{g} 个环柄 · 2g 条同调生成元</Label>
 </Diagram>;}
function Triangulation({kind}){
 const [face,setFace]=useState(0);const mob=kind==='mobius',rp=kind==='projective';
 const facets=rp?[[0,1,2],[0,4,1],[0,5,4],[0,3,5],[0,2,3],[2,4,3],[2,5,4],[2,1,5],[1,3,5],[1,4,3]]:null;
 const top=mob?[0,2,3,1]:[0,1,2,0],bottom=mob?[1,4,5,0]:[0,2,1,0];
 const triangles=rp?facets:mob?[[0,1,2],[2,1,4],[2,4,3],[3,4,5],[3,5,1],[1,5,0]]:[];
 return <Diagram title={`${rp?'射影平面':mob?'Möbius带':'Klein瓶'}的三角剖分`} height={340} controls={<Range label={rp?`高亮正文中的三角形 ${face+1} / 10`:'选择一个三角单形'} min={0} max={rp?9:mob?5:17} step={1} value={face} onChange={setFace}/>} note={rp?R`外围六边形对径边相认，外顶点标号重复；六个顶点、十五条棱、十张面。高亮顶点集严格沿用正文的十个三角形，$χ=6-15+10=1$。`:mob?R`左上/右下均为 $p_0$，左下/右上均为 $p_1$，接缝反向。高亮单形的顶点标号与正文六项二维链一致。`:R`左右边同向，上下边反向粘合。图中的3×3网格有18张三角形；接缝处的相同标号对应同一顶点。该图保留正文所用的边 $a,b$。`}>
 {rp?<><polygon points="320,30 455,105 430,245 320,305 210,245 185,105" fill="#e8f0f7" stroke={blue}/>{(()=>{const p={0:[320,112],1:[268,210],2:[372,210],3:[455,105],4:[185,105],5:[320,30]};const outer=[[320,30,5],[455,105,3],[430,245,4],[320,305,5],[210,245,3],[185,105,4]];const realTris=[[[320,112],[268,210],[372,210]],[[320,112],[185,105],[268,210]],[[320,112],[320,30],[185,105]],[[320,112],[455,105],[320,30]],[[320,112],[372,210],[455,105]],[[372,210],[430,245],[455,105]],[[372,210],[320,305],[430,245]],[[372,210],[268,210],[320,305]],[[268,210],[210,245],[320,305]],[[268,210],[185,105],[210,245]]];return <>{realTris.map((t,i)=><polygon key={i} points={t.map(v=>v.join(',')).join(' ')} fill={i===face?'#f1c699':'none'} stroke={blue} strokeWidth={2}/>)}{outer.map((v,i)=>{const w=outer[(i+1)%6],a=[v[0]+.25*(w[0]-v[0]),v[1]+.25*(w[1]-v[1])],b=[v[0]+.7*(w[0]-v[0]),v[1]+.7*(w[1]-v[1])];return <Arrow key={`edge-${i}`} a={a} b={b} color={i%3===0?red:i%3===1?green:gold}/>;})}{[...outer,[320,112,0],[268,210,1],[372,210,2]].map(([x,y,l],i)=><Dot key={i} x={x} y={y} label={`p${l}`}/>)}<Label x={80} y={130}>顶点集</Label><Label x={80} y={160}>{facets[face].map(i=>`p${i}`).join(' ')}</Label></>;})()}</>:
 <>{Array.from({length:mob?3:9},(_,cell)=>{const i=cell%3,j=mob?0:Math.floor(cell/3),w=150,h=mob?170:75,x=110+i*w,y=50+j*h;return [0,1].map((k)=><polygon key={`${cell}-${k}`} points={k?`${x},${y+h} ${x+w},${y+h} ${x+w},${y}`:`${x},${y} ${x},${y+h} ${x+w},${y}`} fill={2*cell+k===face?'#f1c699':'#e5eff5'} stroke={blue} strokeWidth={2}/>);})}{top.map((v,i)=><Label key={`t${i}`} x={110+150*i} y={34}>p{v}</Label>)}{bottom.map((v,i)=><Label key={`b${i}`} x={110+150*i} y={mob?246:300}>p{v}</Label>)}<Arrow a={[100,mob?55:260]} b={[100,mob?215:65]} color={red}/><Arrow a={mob?[570,55]:[570,260]} b={mob?[570,215]:[570,55]} color={red}/>{!mob&&<><Arrow a={[130,40]} b={[540,40]} label="a"/><Arrow a={[540,285]} b={[130,285]} label="a"/></>}{mob&&<Label x={340} y={300}>{triangles[face].map(i=>`p${i}`).join(' ')}</Label>}</>}
 </Diagram>;
}
function HomologyCycles({many=false}){const[phase,setPhase]=useState(.3);return <Diagram title={many?'亏格g曲面的典范同调曲线':'环面上的同调闭路与带状区域'} controls={<Range label={many?"移动每个环柄上的红色代表闭路":"移动同调闭路 a′（同一环绕方向）"} value={phase} onChange={setPhase}/>} note={many?R`每个环柄上取经、纬方向各一条闭路，得到 $a_i,b_i$。$H_1(\Sigma_g;\mathbb Z)\cong\mathbb Z^{2g}$；图示取 $g=3$，三个孔属于同一个连通封闭曲面。虚线为闭路的背面部分；外轮廓只是视图轮廓，不是边界。`:R`以基本正方形表示环面。两条横向闭路 $a,a'$ 的差是中间带状区域的边界；纵向闭路 $b$ 不与它们同调。对边上的端点按箭头粘合。`}>
 {many?<HandleSurface x={340} y={140} width={580} height={140} g={3} cycles phase={phase}/>:<><rect x={140} y={40} width={380} height={220} fill="#edf2f5" stroke={blue}/><rect x={140} y={95} width={380} height={35+100*phase} fill="#e2c89b" opacity={.6}/><Arrow a={[140,95]} b={[520,95]} label="a"/><Arrow a={[140,130+100*phase]} b={[520,130+100*phase]} label="a′"/><Arrow a={[330,260]} b={[330,40]} label="b" color={red}/></>}
 </Diagram>;}
function Crosscap(){return <Diagram title="在球面挖孔并把孔边对径点相认" note={R`每挖去一个圆盘并按对径点识别边界，就接入一个交叉帽，等价于与 $\mathbb{RP}^2$ 做连通和。图上的孔边箭头表示粘合规则，而不是保留一个自由边界。`}>
 <Sphere x={240} y={145} r={105}/><ellipse cx={240} cy={105} rx={50} ry={22} fill="#faf8f3" stroke={red} strokeWidth={3}/><Arrow a={[193,105]} b={[287,105]} color={red} label="对径点配对"/><Arrow a={[380,145]} b={[450,145]}/><Label x={555} y={125}>球面 # 射影平面</Label><Label x={555} y={170}>χ 每次减少 1</Label>
 </Diagram>;}
export function FoundationsRedraw({n}){
 switch(n){case'1.1':return <IntegrationContour/>;case'1.2':return <Paths/>;case'2.9':return <Pullback/>;case'2.10':return <Homeomorphisms/>;case'2.11':return <PolyhedralTorus/>;case'2.12':return <ConnectedSum/>;case'2.13':return <GenusPolygon/>;case'3.8':return <Triangulation kind="mobius"/>;case'3.9':return <Triangulation kind="projective"/>;case'3.10':return <HomologyCycles/>;case'3.11':return <HomologyCycles many/>;case'3.12':return <Triangulation kind="klein"/>;case'3.13':return <Crosscap/>;default:throw new Error(`Unknown foundations diagram ${n}`);}
}
