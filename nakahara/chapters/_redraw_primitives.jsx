import { useId } from 'react';
import { Tx } from '@kit';

export const blue='#286b9b', red='#b34f43', green='#287b64', gold='#aa741e', ink='#293747';
export function Diagram({title,children,note,controls,height=300}) {
 return <div style={{border:'1px solid #ded8cb',borderRadius:12,padding:16,background:'#faf8f3',color:ink}}>
  {controls}<div style={{overflowX:'auto'}}><svg role="img" aria-label={title} viewBox={`0 0 680 ${height}`} style={{width:'100%',minWidth:460,display:'block',fontFamily:'system-ui,sans-serif',fontSize:17}}><title>{title}</title>{children}</svg></div>
  {note&&<div style={{overflowX:"auto",maxWidth:"100%"}}><Tx>{note}</Tx></div>}
 </div>;
}
export function Label({x,y,children,color=ink,anchor='middle',size=17}){return <text x={x} y={y} textAnchor={anchor} fill={color} fontSize={size}>{children}</text>;}
export function Arrow({a,b,color=blue,label,dash=false}) {
 const angle=Math.atan2(b[1]-a[1],b[0]-a[0]), d=9;
 return <g fill={color} stroke={color}><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} strokeWidth={2.5} strokeDasharray={dash?'5 5':undefined}/><polygon points={`${b} ${b[0]-d*Math.cos(angle-.4)},${b[1]-d*Math.sin(angle-.4)} ${b[0]-d*Math.cos(angle+.4)},${b[1]-d*Math.sin(angle+.4)}`}/>{label&&<Label x={(a[0]+b[0])/2} y={(a[1]+b[1])/2-12} color={color}>{label}</Label>}</g>;
}
export function Dot({x,y,label,color=red}){return <g><circle cx={x} cy={y} r={5} fill={color}/>{label&&<Label x={x+12} y={y-12} anchor="start" color={color}>{label}</Label>}</g>;}
export function Curve({f,color=blue,width=3,dash=false,n=100,fill='none'}){return <path d={Array.from({length:n+1},(_,i)=>`${i?'L':'M'}${f(i/n).join(',')}`).join(' ')} stroke={color} strokeWidth={width} strokeDasharray={dash?'6 5':undefined} fill={fill}/>;}
export function Sphere({x=340,y=140,r=85}){return <g><circle cx={x} cy={y} r={r} fill="#e7f0eb" stroke={green} strokeWidth={2}/><ellipse cx={x} cy={y} rx={r} ry={r*.27} fill="none" stroke={green} strokeDasharray="5 4"/></g>;}
export function Torus({x=340,y=140,rx=135,ry=75}){return <g><path d={`M${x-rx},${y} a${rx},${ry} 0 1 0 ${2*rx},0 a${rx},${ry} 0 1 0 ${-2*rx},0 M${x-rx*.45},${y-8} a${rx*.45},${ry*.38} 0 1 0 ${rx*.9},0 a${rx*.45},${ry*.38} 0 1 0 ${-rx*.9},0`} fill="#dfede8" fillRule="evenodd" stroke={green} strokeWidth={2}/></g>;}
export function Range({label,value,onChange,min=0,max=1,step=.01}){const id=useId();return <label htmlFor={id} style={{display:'block',margin:'10px 0',fontSize:15}}>{label}<input id={id} type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(+e.target.value)} style={{display:'block',width:'100%'}}/></label>;}
export function Choices({value,onChange,options,label='选择图示'}){return <div role="group" aria-label={label} style={{display:'flex',flexWrap:'wrap',gap:8,margin:'8px 0'}}>{options.map(([v,t])=><button key={String(v)} type="button" aria-pressed={v===value} onClick={()=>onChange(v)} style={{padding:'7px 12px',borderRadius:7,border:`1px solid ${v===value?blue:'#bcb6a9'}`,background:v===value?'#e2eef7':'#fffdf8',color:ink,font:'inherit'}}>{t}</button>)}</div>;}
