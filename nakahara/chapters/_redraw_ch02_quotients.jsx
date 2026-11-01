// Original diagrams of maps and quotient spaces. No source image assets.
import { useEffect, useId, useRef, useState } from "react";
import { M } from "@kit";

const R = String.raw;
const blue = "#286b9b", red = "#b34f43", green = "#287b64", gold = "#aa741e";
const panel = { background: "#faf8f3", border: "1px solid #ded8cb", borderRadius: 12, padding: "16px", color: "#292b30", width: "100%", boxSizing: "border-box" };
const row = { display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", justifyContent: "center" };
const button = active => ({ padding: "7px 12px", borderRadius: 7, border: `1px solid ${active ? blue : "#bcb6a9"}`, background: active ? "#e2eef7" : "#fffdf8", color: "#252a30", cursor: "pointer" });
function Frame({ children }) { return <div style={panel}>{children}</div>; }
function Svg({ title, children, height = 300 }) {
  return <svg viewBox={`0 0 680 ${height}`} role="img" aria-label={title} style={{ width: "100%", display: "block", fontFamily: "system-ui, sans-serif", fontSize: 16 }}><title>{title}</title>{children}</svg>;
}
function Arrow({ x1, y1, x2, y2, color = blue, label, dashed = false, labelX, labelY }) {
  const a = Math.atan2(y2 - y1, x2 - x1), d = 9;
  const points = `${x2},${y2} ${x2 - d * Math.cos(a - .42)},${y2 - d * Math.sin(a - .42)} ${x2 - d * Math.cos(a + .42)},${y2 - d * Math.sin(a + .42)}`;
  return <g><line {...{ x1, y1, x2, y2 }} stroke={color} strokeWidth="2.5" strokeDasharray={dashed ? "5 4" : undefined} /><polygon points={points} fill={color} />{label && <text x={labelX ?? (x1 + x2) / 2} y={labelY ?? (y1 + y2) / 2 - 10} fill={color} textAnchor="middle">{label}</text>}</g>;
}
function Range({ label, value, setValue, min = 0, max = 1, step = .01 }) {
  const id = useId();
  return <label htmlFor={id} style={{ display: "block", margin: "10px 0", fontSize: 14 }}>{label}<input id={id} type="range" {...{ min, max, step, value }} onChange={e => setValue(+e.target.value)} style={{ display: "block", width: "100%" }} /></label>;
}
function Edges({ x = 65, y = 40, size = 160, reverseA = false, reverseB = false, onlyA = false }) {
  return <g><rect x={x} y={y} width={size} height={size} fill="#eaf2f6" stroke="#c5c9cc" />
    <Arrow x1={x} y1={y + size - 6} x2={x} y2={y + 6} label="a" labelX={x - 18} labelY={y + size / 2} />
    <Arrow x1={x + size} y1={reverseA ? y + 6 : y + size - 6} x2={x + size} y2={reverseA ? y + size - 6 : y + 6} label="a" labelX={x + size + 18} labelY={y + size / 2} />
    {!onlyA && <><Arrow x1={x + 6} y1={y} x2={x + size - 6} y2={y} color={red} label="b" labelY={y - 13} /><Arrow x1={reverseB ? x + size - 6 : x + 6} y1={y + size} x2={reverseB ? x + 6 : x + size - 6} y2={y + size} color={red} label="b" labelY={y + size + 24} /></>}
    {onlyA && <><line x1={x} y1={y} x2={x + size} y2={y} stroke={gold} strokeWidth="3" /><line x1={x} y1={y + size} x2={x + size} y2={y + size} stroke={gold} strokeWidth="3" /></>}
  </g>;
}

export function CommutativeRedraw() {
  const [route, setRoute] = useState(0);
  return <Frame><div style={row}>{["经 Y：f ∘ g", "经 Z：h ∘ j", "直接：k"].map((s, i) => <button key={s} style={button(route === i)} onClick={() => setRoute(i)}>{s}</button>)}</div><Svg title="交换图中从 X 到 W 的三条路径" height={280}>
    {[[100,65,"X"],[560,65,"Y"],[100,225,"Z"],[560,225,"W"]].map(([x,y,t]) => <g key={t}><circle cx={x} cy={y} r="25" fill="#fff" stroke="#d4cfc4" /><text x={x} y={y+6} textAnchor="middle">{t}</text></g>)}
    <Arrow x1={133} y1={65} x2={527} y2={65} label="g" color={route===0?red:"#b4b6b7"} />
    <Arrow x1={560} y1={98} x2={560} y2={192} label="f" labelX={580} labelY={150} color={route===0?red:"#b4b6b7"} />
    <Arrow x1={100} y1={98} x2={100} y2={192} label="j" labelX={78} labelY={150} color={route===1?green:"#b4b6b7"} />
    <Arrow x1={133} y1={225} x2={527} y2={225} label="h" color={route===1?green:"#b4b6b7"} />
    <Arrow x1={130} y1={85} x2={527} y2={211} label="k" color={route===2?blue:"#b4b6b7"} />
  </Svg><p style={{textAlign:"center"}}><M>{R`f\circ g=h\circ j=k:X\longrightarrow W`}</M></p></Frame>;
}

export function CircleQuotientRedraw() {
  const [t, setT] = useState(.22), a=2*Math.PI*t;
  return <Frame><Range label="移动代表元 x（0 到 2π；两端是同一个商点）" value={t} setValue={setT} /><Svg title="实数的周期等价类对应圆周上的一个点" height={280}>
    <text x="25" y="22">(a) 周期等价类</text><text x="395" y="128">(b) 圆周商空间</text><rect x="240" y="48" width="180" height="42" fill="#e2eef7" /><line x1="25" y1="70" x2="650" y2="70" stroke="#555" />
    {[-1,0,1].map(n=><g key={n}><circle cx={240+180*(t+n)} cy="70" r="6" fill={red} /><text x={240+180*(t+n)} y="42" textAnchor="middle" fontSize="14">{n===0?"x":`x ${n>0?"+":"−"} ${Math.abs(n)}·2π`}</text></g>)}
    {[-1,0,1,2].map(n=><text key={n} x={240+n*180} y="110" textAnchor="middle" fontSize="14">{["−2π","0","2π","4π"][n+1]}</text>)}
    <text x="330" y="151" textAnchor="middle">选取一个周期</text><Arrow x1={265} y1={195} x2={350} y2={195} label="取商" />
    <circle cx="480" cy="198" r="62" fill="#edf3f6" stroke={blue} strokeWidth="2" /><line x1="480" y1="198" x2={480+62*Math.cos(a)} y2={198-62*Math.sin(a)} stroke={red} /><circle cx={480+62*Math.cos(a)} cy={198-62*Math.sin(a)} r="7" fill={red} /><text x="565" y="202">S¹</text>
  </Svg><p><M>{R`x\sim x+2\pi n\quad\mapsto\quad (\cos x,\sin x)`}</M></p></Frame>;
}

// Parameters give genuine embeddings of the cylinder, Möbius band, and torus.
export function surfacePoint(kind, u, v) {
  const a = 2*Math.PI*u;
  if(kind === "torus") { const b=2*Math.PI*v, r=1.45+.52*Math.cos(b); return [r*Math.cos(a),.52*Math.sin(b),r*Math.sin(a)]; }
  const w=(2*v-1)*.55;
  if(kind === "mobius") return [(1.3+w*Math.cos(a/2))*Math.cos(a), w*Math.sin(a/2), (1.3+w*Math.cos(a/2))*Math.sin(a)];
  return [1.25*Math.cos(a),2*v-1,1.25*Math.sin(a)];
}
function ProjectedSurface({kind}) {
  const project=p=>[340+95*(p[0]+.35*p[2]),140-85*(p[1]+.4*p[2])];
  const lines=[];
  for(let j=0;j<=12;j++) { const p=[];for(let i=0;i<=100;i++)p.push(project(surfacePoint(kind,i/100,j/12)).join(","));lines.push(<polyline key={`v${j}`} points={p.join(" ")} fill="none" stroke={j===0||j===12?gold:blue} strokeWidth={j===0||j===12?2:1} opacity=".75" />); }
  for(let j=0;j<=24;j++){const p=[];for(let i=0;i<=20;i++)p.push(project(surfacePoint(kind,j/24,i/20)).join(","));lines.push(<polyline key={`u${j}`} points={p.join(" ")} fill="none" stroke={blue} opacity=".4" />);}
  return <Svg title="曲面的静态参数网格投影（无 WebGL 时保留）" height={280}>{lines}</Svg>;
}
function ThreeSurface({ kind, u = .1, v = .6 }) {
  const host = useRef(null), api = useRef(null), point=useRef({u,v});
  const [ready,setReady]=useState(false),[failed,setFailed]=useState(false);
  point.current={u,v};
  useEffect(()=>{
    let dead=false, cleanup=()=>{}; setReady(false);setFailed(false);
    async function setup(){
      let renderer, controls, geometry, material, gridMaterial, gridGeometry, dotGeometry, dotMaterial, observer;
      const dispose=()=>{observer?.disconnect();controls?.dispose();geometry?.dispose();material?.dispose();gridMaterial?.dispose();gridGeometry?.dispose();dotGeometry?.dispose();dotMaterial?.dispose();if(renderer){renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();}api.current=null;};
      cleanup=dispose;
      try {
        const [THREE,{OrbitControls}] = await Promise.all([import("three"),import("three/addons/controls/OrbitControls.js")]);
        if(dead||!host.current)return;
        const scene=new THREE.Scene();scene.background=new THREE.Color("#faf8f3");
        const camera=new THREE.PerspectiveCamera(38,1,.1,40);camera.position.set(4,3.2,4.5);camera.lookAt(0,0,0);
        renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
        renderer.domElement.setAttribute("aria-label","可旋转的三维曲面；拖动旋转，滚轮缩放，或使用视角按钮");renderer.domElement.setAttribute("role","img");
        host.current.appendChild(renderer.domElement);
        const positions=[],indices=[],nu=100,nv=32;
        for(let i=0;i<=nu;i++)for(let j=0;j<=nv;j++)positions.push(...surfacePoint(kind,i/nu,j/nv));
        for(let i=0;i<nu;i++)for(let j=0;j<nv;j++){const k=i*(nv+1)+j;indices.push(k,k+nv+1,k+1,k+1,k+nv+1,k+nv+2);}
        geometry=new THREE.BufferGeometry();geometry.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();
        material=new THREE.MeshStandardMaterial({color:0x73adc2,side:THREE.DoubleSide,roughness:.7,metalness:.05});scene.add(new THREE.Mesh(geometry,material));
        const linePositions=[];
        const addLine=(p,q)=>linePositions.push(...p,...q);
        for(let j=0;j<=8;j++)for(let i=0;i<100;i++)addLine(surfacePoint(kind,i/100,j/8),surfacePoint(kind,(i+1)/100,j/8));
        for(let i=0;i<24;i++)for(let j=0;j<32;j++)addLine(surfacePoint(kind,i/24,j/32),surfacePoint(kind,i/24,(j+1)/32));
        gridGeometry=new THREE.BufferGeometry();gridGeometry.setAttribute("position",new THREE.Float32BufferAttribute(linePositions,3));gridMaterial=new THREE.LineBasicMaterial({color:0x25556c,transparent:true,opacity:.35});scene.add(new THREE.LineSegments(gridGeometry,gridMaterial));
        scene.add(new THREE.HemisphereLight(0xffffff,0x665a48,2.4));const light=new THREE.DirectionalLight(0xffffff,2.2);light.position.set(2,5,4);scene.add(light);
        dotGeometry=new THREE.SphereGeometry(.07,14,10);dotMaterial=new THREE.MeshBasicMaterial({color:0xc04435});const dot=new THREE.Mesh(dotGeometry,dotMaterial);scene.add(dot);
        const render=()=>{if(!dead)renderer.render(scene,camera);};
        controls=new OrbitControls(camera,renderer.domElement);controls.enablePan=false;controls.minDistance=3;controls.maxDistance=12;controls.addEventListener("change",render);
        api.current={point:(pu,pv)=>{dot.position.set(...surfacePoint(kind,pu,pv));render();},view:top=>{camera.position.set(...(top?[0,6,.01]:[4,3.2,4.5]));controls.update();render();}};
        observer=new ResizeObserver(()=>{if(!host.current)return;const w=Math.max(240,host.current.clientWidth);renderer.setSize(w,300);camera.aspect=w/300;camera.updateProjectionMatrix();render();});observer.observe(host.current);
        api.current.point(point.current.u,point.current.v);setReady(true);
      } catch {dispose();if(!dead)setFailed(true);}
    }
    setup();return()=>{dead=true;cleanup();};
  },[kind]);
  useEffect(()=>{api.current?.point(u,v);},[u,v]);
  return <div><div style={{position:"relative",minHeight:280}}><div ref={host} style={{width:"100%",height:ready?300:0,overflow:"hidden"}} />{!ready&&<ProjectedSurface kind={kind}/>}</div><div style={row}><button style={button(false)} onClick={()=>api.current?.view(false)} disabled={!ready}>斜视</button><button style={button(false)} onClick={()=>api.current?.view(true)} disabled={!ready}>俯视</button></div><p style={{fontSize:13,textAlign:"center"}}>{failed?"当前环境未启用 WebGL，已显示同一参数曲面的静态网格。":ready?"拖动旋转 · 滚轮 / 双指缩放 · 上方按钮切换视角":"正在准备三维视图；静态网格可先阅读。"}</p></div>;
}

export function BandRedraw() {
  const [twist,setTwist]=useState(false),[v,setV]=useState(.75);
  return <Frame><div style={row}><button style={button(!twist)} onClick={()=>setTwist(false)}>(a) 柱面：不翻转</button><button style={button(twist)} onClick={()=>setTwist(true)}>(b) Möbius 带：翻转一次</button></div><Svg title="正方形的一对边同向或反向粘合" height={260}><Edges x={90} y={38} onlyA reverseA={twist} /><text x="415" y="95" textAnchor="middle">{twist?"(−1, −y) ∼ (1, y)":"(−1, y) ∼ (1, y)"}</text><text x="415" y="132" textAnchor="middle">{twist?"仅有一个边界圆周":"有两个边界圆周"}</text><text x="415" y="169" textAnchor="middle">金色边保留，不粘合</text><circle cx="250" cy={38+160*(1-v)} r="6" fill={red}/><circle cx="90" cy={38+160*(twist?v:1-v)} r="6" fill={red}/></Svg><Range label="选择接缝上的对应点 y" value={v} setValue={setV}/><ThreeSurface kind={twist?"mobius":"cylinder"} u={1} v={v}/><p><M>{twist?R`((R+s\cos\tfrac\theta2)\cos\theta,\ s\sin\tfrac\theta2,\ (R+s\cos\tfrac\theta2)\sin\theta)`:R`(R\cos\theta,\ y,\ R\sin\theta)`}</M></p><p style={{fontSize:14}}>红点标出接缝处的一对代表元；三维曲面上它们是同一个点。Möbius 带在绕行一圈后横向坐标反号。</p></Frame>;
}

export function TorusRedraw() {
  const [u,setU]=useState(.22),[v,setV]=useState(.3);
  return <Frame><Svg title="周期平面的一块基本区域及其对边粘合" height={280}><text x="25" y="20">(a) 周期平面</text><text x="430" y="20">(b) 基本区域的粘合</text><rect x="25" y="30" width="280" height="210" fill="#fffdf8" stroke="#ccc" />{[0,1,2,3,4].map(i=><line key={`x${i}`} x1={25+i*70} y1="30" x2={25+i*70} y2="240" stroke="#ddd"/>)}{[0,1,2,3].map(i=><line key={`y${i}`} x1="25" y1={30+i*70} x2="305" y2={30+i*70} stroke="#ddd"/>)}<rect x="95" y="100" width="70" height="70" fill="#dcebf3"/>{[0,1,2].flatMap(i=>[0,1,2].map(j=><circle key={`${i}${j}`} cx={25+70*(i+u)} cy={30+70*(j+1-v)} r="4" fill={red}/>))}<Arrow x1={330} y1={135} x2={385} y2={135}/><Edges x={430} y={53} size={150}/><circle cx={430+150*u} cy={203-150*v} r="6" fill={red}/><text x="500" y="250" textAnchor="middle">两组对边分别同向粘合</text></Svg><Range label="大圆方向 u：0 到 1" value={u} setValue={setU}/><Range label="小圆方向 v：0 到 1" value={v} setValue={setV}/><ThreeSurface kind="torus" u={u} v={v}/><p><M>{R`((R+r\cos 2\pi v)\cos 2\pi u,\ r\sin 2\pi v,\ (R+r\cos 2\pi v)\sin 2\pi u),\quad R>r`}</M></p><p style={{fontSize:14}}>平面上的所有红点代表同一个商点。两个参数各自周期变化，曲面没有边界。</p></Frame>;
}

export function NonorientableRedraw() {
  const [rp,setRp]=useState(false);
  return <Frame><div style={row}><button style={button(!rp)} onClick={()=>setRp(false)}>(a) Klein 瓶</button><button style={button(rp)} onClick={()=>setRp(true)}>(b) 射影平面</button></div><Svg title="不可定向曲面的精确边粘合规则" height={310}><Edges x={75} y={60} reverseA={rp} reverseB />{[[75,60],[235,60],[235,220],[75,220]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="5" fill={rp?(i%2?red:green):green}/><text x={x+(i===0||i===3?-16:16)} y={y+(i<2?-12:24)} fill={rp?(i%2?red:green):green} textAnchor="middle">{rp?(i%2?"B":"A"):"A"}</text></g>)}<Arrow x1={278} y1={140} x2={340} y2={140} label="商空间"/>{rp?<><circle cx="490" cy="140" r="85" fill="#e5f0eb" stroke={green}/><Arrow x1={430} y1={80} x2={550} y2={200} color={red}/><circle cx="430" cy="80" r="6" fill={red}/><circle cx="550" cy="200" r="6" fill={red}/><text x="490" y="265" textAnchor="middle">圆盘边界的对径点相认</text></>:<><rect x="398" y="57" width="185" height="166" fill="#e7f0f4" stroke={blue}/><line x1="398" y1="140" x2="583" y2="140" stroke={gold} strokeWidth="3" strokeDasharray="5 4"/><text x="490" y="100" textAnchor="middle">先粘左右：柱面</text><text x="490" y="180" textAnchor="middle">再反向粘两端圆周</text><text x="490" y="265" textAnchor="middle">不能在三维中无自交闭合</text></>}</Svg><p><M>{rp?R`\mathbb{RP}^2:\quad V=2,\ E=2,\ F=1,\ \chi=1`:R`K:\quad V=1,\ E=2,\ F=1,\ \chi=0`}</M></p><p style={{fontSize:14}}>箭头头尾对应，颜色标出粘合后的顶点类。这里用商空间模型表达曲面；Klein 瓶与射影平面都不能嵌入三维空间。常见三维画法带自交，不能把交叉处再认作同一点。</p></Frame>;
}

export function ProjectiveRedraw() {
  const [t,setT]=useState(.2),a=2*Math.PI*t,px=96*Math.cos(a),py=35*Math.sin(a);
  return <Frame><Range label="移动赤道上一对被认作相同的对径点" value={t} setValue={setT}/><Svg title="无头尾的方向与射影平面的半球模型" height={300}><circle cx="170" cy="145" r="96" fill="#e7eff5" stroke={blue} strokeWidth="2"/><ellipse cx="170" cy="145" rx="96" ry="35" fill="none" stroke={blue}/><line x1={170-px} y1={145-py} x2={170+px} y2={145+py} stroke={red} strokeWidth="4"/><circle cx={170-px} cy={145-py} r="6" fill={red}/><circle cx={170+px} cy={145+py} r="6" fill={red}/><text x="170" y="270" textAnchor="middle">同一根没有头尾的棒：n ∼ −n</text><Arrow x1={294} y1={145} x2={352} y2={145} label="取代表元"/><path d="M 395 156 A 96 96 0 0 1 587 156" fill="#e0eee8" stroke={green} strokeWidth="2"/><ellipse cx="491" cy="156" rx="96" ry="35" fill="#eff6f0" stroke={green} strokeWidth="2"/><circle cx={491+96*Math.cos(a)} cy={156+35*Math.sin(a)} r="6" fill={red}/><circle cx={491-96*Math.cos(a)} cy={156-35*Math.sin(a)} r="6" fill={red}/><text x="491" y="230" textAnchor="middle">北半球的内部不再配对</text><text x="491" y="258" textAnchor="middle">赤道的对径点仍须粘合</text></Svg><p><M>{R`\mathbb{RP}^2=S^2/(\boldsymbol n\sim-\boldsymbol n)\cong D^2/(z\sim-z\text{ on }\partial D^2)`}</M></p></Frame>;
}

export function GenusTwoRedraw() {
  const [selected,setSelected]=useState("a₁");
  // Counterclockwise boundary word a1 b1 a1^-1 b1^-1 a2 b2 a2^-1 b2^-1.
  const labs=["a₁","b₁","a₁","b₁","a₂","b₂","a₂","b₂"], inv=[false,false,true,true,false,false,true,true];
  const vertices=Array.from({length:8},(_,i)=>[170+107*Math.cos(Math.PI/8-i*Math.PI/4),145+107*Math.sin(Math.PI/8-i*Math.PI/4)]);
  return <Frame><div style={row}>{["a₁","b₁","a₂","b₂"].map(s=><button key={s} style={button(s===selected)} onClick={()=>setSelected(s)}>{s} 边对</button>)}</div><Svg title="标准八边形粘合成亏格二曲面，边箭头按交换子边界字排列" height={325}><text x="75" y="23">(a) 八边形</text><text x="450" y="23">(b) 双环柄曲面</text><polygon points={vertices.map(p=>p.join(",")).join(" ")} fill="#edf1f3" stroke="#ccc"/>{vertices.map((p,i)=>{const q=vertices[(i+1)%8],s=inv[i]?q:p,e=inv[i]?p:q;return <g key={i}><Arrow x1={s[0]+.13*(e[0]-s[0])} y1={s[1]+.13*(e[1]-s[1])} x2={e[0]-.13*(e[0]-s[0])} y2={e[1]-.13*(e[1]-s[1])} color={labs[i]===selected?red:"#8197a5"} label={labs[i]+(inv[i]?"⁻¹":"")} labelX={170+1.23*((p[0]+q[0])/2-170)} labelY={145+1.23*((p[1]+q[1])/2-145)+5}/><circle cx={p[0]} cy={p[1]} r="4" fill={green}/></g>;})}<text x="170" y="142" textAnchor="middle">箭头头对头</text><text x="170" y="166" textAnchor="middle">尾对尾粘合</text><Arrow x1={310} y1={145} x2={360} y2={145}/><path d="M 386 145 C 386 59 466 55 496 95 C 526 55 626 63 626 145 C 626 227 526 235 496 195 C 466 235 386 227 386 145 Z M 408 145 C 408 117 458 117 472 145 C 458 173 408 173 408 145 Z M 526 145 C 540 117 600 117 604 145 C 600 173 540 173 526 145 Z" fill="#e1eee8" fillRule="evenodd" stroke={green} strokeWidth="2"/><text x="506" y="271" textAnchor="middle">两个环柄：Σ₂（示意）</text><text x="170" y="307" textAnchor="middle">所有八个顶点粘成同一点</text></Svg><p><M>{R`a_1b_1a_1^{-1}b_1^{-1}a_2b_2a_2^{-1}b_2^{-1}=1`}</M></p><p><M>{R`V=1,\quad E=4,\quad F=1,\quad\chi=-2=2-2g\quad\Rightarrow\quad g=2`}</M></p><p style={{fontSize:14}}>从右侧竖边开始，逆时针读边界字。负指数指箭头与绕行方向相反；每个字母两次出现的指数相反，故所得曲面可定向。</p></Frame>;
}

export function DiskSphereRedraw() {
  const [r,setR]=useState(.65),[angle,setAngle]=useState(.12),a=2*Math.PI*angle;
  // q(r,θ)=(sin(πr)cosθ, sin(πr)sinθ, cos(πr)); r=1 always south pole.
  const x=Math.sin(Math.PI*r)*Math.cos(a),y=Math.sin(Math.PI*r)*Math.sin(a),z=Math.cos(Math.PI*r);
  return <Frame><Range label="圆盘半径 r：中心 0 → 边界 1" value={r} setValue={setR}/><Range label="方位角 θ：沿边界移动时，球面上的点保持不变" value={angle} setValue={setAngle}/><Svg title="圆盘全部边界收缩到球面南极" height={300}><circle cx="150" cy="135" r="92" fill="#e8f0f5" stroke={red} strokeWidth="4"/><circle cx="150" cy="135" r={92*r} fill="none" stroke={blue} strokeDasharray="4 4"/><circle cx={150+92*r*Math.cos(a)} cy={135-92*r*Math.sin(a)} r="7" fill={gold}/><text x="150" y="265" textAnchor="middle">D²：红色边界整圈相认</text><Arrow x1={278} y1={135} x2={375} y2={135} label="q"/><circle cx="510" cy="135" r="92" fill="#e8f1eb" stroke={green} strokeWidth="2"/><ellipse cx="510" cy="135" rx="92" ry="27" fill="none" stroke={green} strokeDasharray="4 4"/><ellipse cx="510" cy="135" rx={92*Math.sin(Math.PI*r)} ry={27*Math.sin(Math.PI*r)} transform={`translate(0 ${-92*Math.sqrt(1-(27/92)**2)*z})`} fill="none" stroke={blue} opacity=".6"/><circle cx={510+92*x} cy={135-92*Math.sqrt(1-(27/92)**2)*z+27*y} r="7" fill={gold}/><circle cx="510" cy={135+92*Math.sqrt(1-(27/92)**2)} r="5" fill={red}/><text x="567" y="232" fill={red}>唯一边界像</text><text x="510" y="265" textAnchor="middle">S²：中心到北极，边界到南极</text></Svg><p><M>{R`q(r,\theta)=(\sin(\pi r)\cos\theta,\ \sin(\pi r)\sin\theta,\ \cos(\pi r))`}</M></p><p style={{fontSize:14}}>滑到 r = 1，再改变方位角：整条边界只对应南极。0 &lt; r &lt; 1 时，不同圆盘点仍对应不同球面点；因此商空间是球面。</p></Frame>;
}
