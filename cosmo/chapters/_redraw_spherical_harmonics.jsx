import {useEffect,useRef,useState} from 'react';
import {Tx} from '@kit';
const R=String.raw;
const modes=[[1,0],[1,1],[2,0],[2,1],[2,2]];
export function harmonicAbs(l,m,theta){
 const s=Math.sin(theta),c=Math.cos(theta);
 if(l===1)return m===0?Math.sqrt(3/(4*Math.PI))*Math.abs(c):Math.sqrt(3/(8*Math.PI))*s;
 return m===0?Math.sqrt(5/(16*Math.PI))*Math.abs(3*c*c-1):m===1?Math.sqrt(15/(8*Math.PI))*Math.abs(s*c):Math.sqrt(15/(32*Math.PI))*s*s;
}
function position(l,m,u,v){const t=Math.PI*v,a=2*Math.PI*u,r=harmonicAbs(l,m,t)*2.7;return [r*Math.sin(t)*Math.cos(a),r*Math.cos(t),r*Math.sin(t)*Math.sin(a)];}
function Wireframe({l,m}){return <svg viewBox="0 0 640 340" role="img" aria-label={`球谐函数绝对值的径向曲面，l=${l}, m=${m}`} style={{width:'100%',display:'block'}}><title>由球谐函数解析式生成的三维线框投影</title>{Array.from({length:22},(_,i)=>{const a=i/22;return <polyline key={i} points={Array.from({length:101},(_,j)=>{const [x,y,z]=position(l,m,a,j/100);return `${320+100*(.85*x+.52*z)},${170+100*(.25*x-y-.4*z)}`}).join(' ')} fill="none" stroke="#286b9b" strokeWidth={1.2}/>;})}</svg>;}
export function SphericalHarmonicsRedraw(){
 const [mode,setMode]=useState(0),[ready,setReady]=useState(false),[failed,setFailed]=useState(false);
 const host=useRef(),[l,m]=modes[mode];
 useEffect(()=>{
  let stopped=false,dispose=()=>{};setReady(false);setFailed(false);
  (async()=>{let renderer,controls,geometry,material,observer;try{
   const [THREE,{OrbitControls}]=await Promise.all([import('three'),import('three/addons/controls/OrbitControls.js')]);
   if(stopped)return;
   dispose=()=>{observer?.disconnect();controls?.dispose();geometry?.dispose();material?.dispose();if(renderer){renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();}};
   const scene=new THREE.Scene();scene.background=new THREE.Color('#faf8f3');
   const camera=new THREE.PerspectiveCamera(40,1,.05,30);camera.position.set(3,1.8,3);camera.lookAt(0,0,0);
   renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.domElement.setAttribute('role','img');renderer.domElement.setAttribute('aria-label',`球谐径向曲面 l=${l},m=${m}；可拖动旋转`);host.current.append(renderer.domElement);
   const vertices=[],indices=[],nu=80,nv=80;
   for(let i=0;i<=nu;i++)for(let j=0;j<=nv;j++)vertices.push(...position(l,m,i/nu,j/nv));
   for(let i=0;i<nu;i++)for(let j=0;j<nv;j++){const k=i*(nv+1)+j;indices.push(k,k+1,k+nv+1,k+1,k+nv+2,k+nv+1);}
   geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.setIndex(indices);geometry.computeVertexNormals();
   material=new THREE.MeshStandardMaterial({color:0x80b5c5,roughness:.55,side:THREE.DoubleSide});scene.add(new THREE.Mesh(geometry,material));scene.add(new THREE.HemisphereLight(0xffffff,0x6b6354,2.4));const light=new THREE.DirectionalLight(0xffffff,2);light.position.set(2,4,3);scene.add(light);
   const render=()=>{if(!stopped)renderer.render(scene,camera);};controls=new OrbitControls(camera,renderer.domElement);controls.enablePan=false;controls.minDistance=2;controls.maxDistance=8;controls.addEventListener('change',render);
   observer=new ResizeObserver(()=>{const width=host.current?.clientWidth;if(!width)return;renderer.setSize(width,340);camera.aspect=width/340;camera.updateProjectionMatrix();render();});observer.observe(host.current);setReady(true);
  }catch{dispose();if(!stopped)setFailed(true);}})();
  return()=>{stopped=true;dispose();};
 },[l,m]);
 return <div style={{background:'#faf8f3',border:'1px solid #ded8cb',borderRadius:12,padding:16}}>
  <div role="group" aria-label="选择球谐函数" style={{display:'flex',gap:8,flexWrap:'wrap'}}>{modes.map(([a,b],i)=><button type="button" key={i} aria-pressed={mode===i} onClick={()=>setMode(i)} style={{padding:'8px 12px',border:'1px solid #aabcc8',borderRadius:7,background:mode===i?'#dcebf3':'#fffdf8',color:'#293747',font:'inherit'}}>l={a}, m={b}</button>)}</div>
  <div ref={host} style={{width:'100%',height:ready?340:0,overflow:'hidden'}}/>{!ready&&<Wireframe l={l} m={m}/>}
  <p style={{fontSize:14}}>{ready?'拖动旋转 · 滚轮或双指缩放 · 竖直方向为 z 轴':failed?'当前设备显示相同解析曲面的线框投影。':'正在准备三维视图，先显示解析线框。'}</p>
  <Tx>{R`径向距离严格按复球谐函数的绝对值 $r=|Y_{lm}(\theta,\phi)|$ 计算，显示时各模式使用**相同倍率**。绝对值消除了 $e^{im\phi}$ 的相位，所以这些曲面绕 $z$ 轴对称，且 $|Y_{l,-m}|=|Y_{lm}|$。它与实球谐函数的多瓣形状不同，也不是概率密度 $|Y_{lm}|^2$。球谐函数满足 $\int|Y_{lm}|^2d\Omega=1$。`}</Tx>
 </div>;
}
