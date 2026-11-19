import { clamp, lerp } from '../engine/util.js';
import { cues } from './shared.js';
import { box, rule, slide } from './rotary_press.js';
import { pixelPointer, screen } from './signal_open.js';

// The crop, lens, physical crease and receiving aperture are identical in both choruses.
const PALM = { x:608, y:488 };
const SOCKET = { x:1640, y:396, r:64 };
const GAP = SOCKET.x-SOCKET.r-15;

function crease(c, amount) {
  if (amount<=0) return;
  const {x,y}=PALM;
  const g=c.g;
  g.save();
  g.beginPath();
  g.moveTo(x-49,y-19);
  g.bezierCurveTo(x-28,y+2,x+18,y+11,x+52,y+6);
  g.bezierCurveTo(x+19,y+22,x-28,y+17,x-49,y-19);
  g.fillStyle=c.col('meDim',amount);
  g.fill();
  g.restore();
}

function signalHeight(u) {
  return Math.sin(Math.PI*u)**.85 * (.23+.77*Math.cos((u-.5)*Math.PI*2.8)**2);
}

function pulse(c, x, y, w, h, alpha=1) {
  const top=[],bottom=[],ridge=[];
  for(let i=0;i<=60;i++) {
    const u=i/60, xx=x+w*u, mag=signalHeight(u)*h;
    top.push([xx,y-mag]);bottom.push([xx,y+mag]);ridge.push([xx,y-.42*mag]);
  }
  c.poly([...top,...bottom.reverse()],{fill:true,color:'meHot',alpha});
  c.poly(ridge,{color:'meDim',width:5,alpha});
}

export function matchedHand(c, env, t, shot, returned) {
  const {P,T}=cues(env), music=t+env.cfg.timing.offset;
  const anchor=env.art.region('f_reach','palm'), size=env.art.size('f_reach');
  screen(c,'panel');
  c.clip({x:0,y:0,w:1920,h:805},()=>{
    c.circle(159,448,864,{fill:true,color:'meDim'});
    c.circle(159,448,839,{width:3,color:'me',alpha:.67});
    rule(c,836,SOCKET.y,SOCKET.x-SOCKET.r,SOCKET.y,'mute',3,.74);
    // Mirror the whole plate about the palm so the open fingers reach into the free space.
    c.at(PALM.x,PALM.y,()=>env.art.inks(c,'f_reach',{x:-anchor.x,y:-anchor.y,...size},
      {roles:{cream:'text',orange:'me',black:'bg'}}),{sx:-2.44,sy:2.44});
    c.circle(SOCKET.x,SOCKET.y,SOCKET.r,{color:'sub',width:7});
    if (!returned) {
      const at=T(shot.lines[1]), land=slide(music,shot.at+P*.43,at);
      const press=slide(music,at,at+P*.4);
      const x=lerp(SOCKET.x,PALM.x,land), y=lerp(SOCKET.y,PALM.y,land)-171*Math.sin(Math.PI*land);
      const cell=lerp(16,11,land)-1.4*press;
      crease(c,press);
      // The pointer crosses onto cream skin. A continuous dark edge keeps its hotspot visible.
      pixelPointer(c,x,y,cell,'text','panel');
      return;
    }
    // The leading edge meets the *outside* of the socket. For half a beat time is clamped
    // for both the position and the waveform, then the pulse comes back to its own crease.
    const release=T(shot.lines[1]), arrive=release-P/2;
    const go=slide(music,shot.at+P*.29,arrive);
    const back=slide(music,release,release+P*1.20);
    const squeeze=slide(music,arrive-P*.54,arrive)*(1-back);
    const length=lerp(296,85,squeeze)*(1-.67*back);
    const leading=lerp(PALM.x+length/2,GAP,go);
    const x=lerp(leading-length,PALM.x-length/2,back);
    const y=lerp(lerp(PALM.y,SOCKET.y,go)-100*Math.sin(Math.PI*go),
      PALM.y,back)+84*Math.sin(Math.PI*back);
    const ink=clamp((music-shot.at)/(.3*P));
    const absorb=slide(music,release+P*1.10,release+P*1.57);
    crease(c,.85*(1-go)+absorb);
    pulse(c,x,y,length,lerp(53,85,squeeze)*ink,ink*(1-absorb));
  });
  box(c,0,805,1920,275,'bg');
}

// The following proof keeps both endpoints at the same screen coordinates as the hand shot.
export function palmImpression(c, k, returned, ink) {
  const {x,y}=PALM, sx=SOCKET.x, sy=SOCKET.y;
  const path=[[x,y],[895,y],[1036,sy],[GAP,sy]];
  c.circle(sx,sy,SOCKET.r,{color:ink,width:16});
  c.poly(path,{color:ink,width:32});
  for(const [xx,yy] of path.slice(1,-1)) box(c,xx-20,yy-20,40,40,ink);
  if(returned){
    const trace=[[GAP,sy],[GAP-152,sy+90],[1052,sy+90],[905,y+101],[x,y]];
    c.clip({x:lerp(GAP+12,x-20,k),y:0,w:GAP-x+44,h:708},()=>c.poly(trace,{color:'me',width:22}));
    pulse(c,x-48,y,96,24,k);
  } else {
    pixelPointer(c,x,y,14.5,ink);
  }
}
