import { pointer } from '../components/cursor.js';
import { clamp, lerp } from '../engine/util.js';
import { cues } from './shared.js';
import { box, rule, mono, slide } from './rotary_press.js';
import { screen, phrase, polygon } from './signal_open.js';

const TAU=2*Math.PI;
function scope(c){
  screen(c);
  // Fainter divisions remain behind the moving trace, as on a storage display.
  for(let j=0;j<19;j++)rule(c,72+j*101,94,72+j*101,824,'line',j%3?1:2,.65);
  for(let j=0;j<8;j++)rule(c,72,106+j*101,1890,106+j*101,'line',j%3?1:2,.65);
}
function globe(c,e,t){
  const {Bt,T}=cues(e),k=slide(t,Bt(63),T(14)),theta=k*.92-.53,cx=1220,cy=435,r=430;
  scope(c);
  const project=(a,b)=>{
    const x=Math.cos(b)*Math.cos(a+theta),z=Math.cos(b)*Math.sin(a+theta),y=Math.sin(b);
    return [cx+r*x,cy+r*(y*.96+z*.26),z*.96-y*.26];
  };
  c.circle(cx,cy,r,{fill:true,color:'panel'});
  const rise=.15+.85*k;
  for(let row=-7;row<=7;row++){
    const lat=row*Math.PI/16;
    const count=Math.max(9,Math.round(48*Math.cos(lat)));
    for(let j=0;j<count;j++){
      const p=project(j/count*TAU,lat);
      if(p[2]<-.08)continue;
      const f=clamp(p[2]+.20);
      const z=1-rise;
      const x=p[0]+z*z*(j%2?282:-420),y=p[1]-z*(row*37);
      c.circle(x,y,3+7*f,{fill:true,color:row===0?'text':f>.58?'meHot':'meDim'});
    }
  }
  const rim=Array.from({length:117},(_,j)=>project(j/116*Math.PI-theta,0).slice(0,2));
  c.poly(rim,{width:7,color:'me'});c.circle(cx,cy,r,{color:'me',width:4});
  const p=project(.35+1.42*k,0);
  rule(c,p[0],p[1],p[0],112,'sub',3);rule(c,p[0],112,1779,112,'sub',3);
  c.circle(p[0],p[1],16,{fill:true,color:'text'});pointer(c,p[0],p[1],{scale:2.4});
  mono(c,'x   y   z',86,213,54,'meHot');
  const vec=[Math.cos(.35+1.42*k+theta),0,Math.sin(.35+1.42*k+theta)];
  vec.forEach((v,j)=>mono(c,v.toFixed(2),89,350+128*j,101,j===0?'text':'sub'));
  phrase(c,e,t,12,14,{color:'meHot',size:204,y:1008});
}

function contour(c,e,t,stage){
  const {H,T,P}=cues(e),time=Math.min(t,T(23));
  const sweep=slide(time,H(15),T(17)),wave=slide(time,H(18),H(18)+P*1.75);
  const settle=slide(time,H(21),H(21)+P*1.5),reach=slide(time,H(21)+P*1.15,T(23));
  const R=772,cx=1463,cy=432,L=353;
  const pt=(u,lag=0)=>{
    const a=Math.PI*(-.935+u*1.86);
    const x=lerp(cx+R*Math.cos(a),91+u*1744,wave);
    const y0=cy+R*.62*Math.sin(a);
    const y1=452+220*Math.sin(u*TAU*1.29-(time-H(18))*.60-lag);
    const y2=L+333*(1-u)*Math.exp(-2.3*u);
    return [x,lerp(lerp(y0,y1,wave),y2,settle)];
  };
  scope(c);
  if(stage===1){
    c.at(cx,cy,()=>{
      c.circle(0,0,R,{fill:true,color:'meDim'});c.circle(0,0,R-39,{fill:true,color:'panel'});
      for(let j=0;j<72;j++){
        const a=j*TAU/72,r=R-(j%6?71:108);
        rule(c,Math.cos(a)*r,Math.sin(a)*r,Math.cos(a)*(R-51),Math.sin(a)*(R-51),j%6?'me':'sub',j%6?3:7);
      }
      c.circle(0,0,18,{fill:true,color:'text'});
    },{sx:1,sy:.62});
    const trace=Array.from({length:135},(_,i)=>pt(sweep*i/134)),tip=trace.at(-1);
    c.poly(trace,{color:'text',width:17});rule(c,cx,cy,...tip,'sub',3);
    pointer(c,...tip,{scale:3.1});mono(c,'r',90,207,62,'meHot');
    mono(c,''+R,79,420,181,'text');mono(c,'C = '+Math.round(TAU*R),90,561,60,'sub');
  }else{
    const data=Array.from({length:165},(_,i)=>pt(i/164));
    const area=[...data,[data.at(-1)[0],823],[data[0][0],823]];
    c.clip({x:0,y:74,w:1920,h:750},()=>{
      polygon(c,area,'meDim',.80);
      // A slower secondary trace shows the recent phase and vanishes as the scope locks.
      if(stage===2){
        for(const lag of [.21,.46]){
          const trail=Array.from({length:165},(_,i)=>pt(i/164,lag));
          c.poly(trail,{color:'me',width:lag<.3?6:3,alpha:.60});
        }
      }
      c.poly(data,{color:'meHot',width:14});
    });
    if(stage===2){
      const u=.10+.74*slide(time,H(18)+.4*P,T(20)),p=pt(u),q=pt(u+.001);
      const ang=Math.atan2(q[1]-p[1],q[0]-p[0]),dx=198*Math.cos(ang),dy=198*Math.sin(ang);
      rule(c,p[0]-dx,p[1]-dy,p[0]+dx,p[1]+dy,'text',8);
      c.circle(...p,14,{fill:true,color:'text'});pointer(c,...p,{scale:2.4});
      mono(c,'m = '+(-Math.tan(ang)).toFixed(2),87,212,86,'text');
    }else{
      const p=pt(reach),tolerance=lerp(41,6,reach);
      box(c,73,L-tolerance,1764,2*tolerance,'sub',.43);rule(c,73,L,1837,L,'text',6);
      rule(c,p[0],L,...p,'meHot',6);c.circle(...p,16,{color:'text',fill:true});
      mono(c,'|f(x) − L| = '+(Math.abs(p[1]-L)/56).toFixed(2),1800,200,52,'text','right');
    }
  }
  phrase(c,e,t,12+3*stage,14+3*stage,{y:1010,size:198,color:stage===1?'meHot':'text'});
}

export function signalGeometry(e){
  const {H,Bt}=cues(e);
  const layouts=['rotating point cloud on a calibrated scope','macro elliptical projection and swept radius','phase traces and one tangent','damped trace at a locked limit'];
  const moments=['The message point forms a sphere as the other samples lock to its coordinates.','The pointer measures the rim of the live display.',
    'The rim becomes a wave and the listener places a single tangent on it.','The trace reaches the limiting line. Its readout samples the stopped point.'];
  return ['points','circle','sine','limit'].map((id,j)=>({id:'v1-'+id,at:j?H(12+3*j):Bt(63),lines:[12+3*j,14+3*j],
    layout:'interface: '+layouts[j],moment:moments[j],enter:{type:'cut'},palette:'on',hud:0,
    render:(c,t)=>j?contour(c,e,t,j):globe(c,e,t)}));
}
