import { easeOut, lerp, prog } from '../engine/util.js';
import { signalShots } from './signal.js';
import { foldShots } from './fold.js';
import { matrix, matrixLayout } from './signal_chorus.js';
import { foldedWall } from './fold_chorus.js';
import { box, slide, type } from './rotary_press.js';
import { cues } from './shared.js';

// Zoom relative to the current window, so the change in magnification is gentle at both ends.
function zoomBetween(a,b,u) {
  return a*Math.pow(b/a,u);
}

function enterWindow(c,env,t,s) {
  const {P,T,text}=cues(env);
  const start=s.at, end=s.at+4*P;
  if(t>=end)return foldedWall(c,env,t,s);
  const p=prog(t,start,end), u=p*p*p*(10+p*(6*p-15));
  const first=matrixLayout(env,start,s,true);
  const x=first.cx-first.step/2, y=first.cy-first.h/2;
  // Dolly the whole grid around the picture well. All of its neighbours remain
  // attached to the same rows; the near window's rails physically pass the lens.
  const step=zoomBetween(first.step,3174,u), h=step*first.h/first.step;
  const middleX=lerp(x+4+first.step*.465,960,u);
  const middleY=lerp(y+first.h*.39,418,u);
  const layout={step,h,cx:middleX-4+.035*step,cy:middleY+.11*h};
  const surround=lerp(1,.44,slide(t,start,start+1.25*P));
  matrix(c,env,t,s,true,{caption:false,layout,surround});
  const rect={x:middleX-.465*step,y:middleY-.29*h,w:.93*step,h:.58*h};

  // Register the same face in the front left corridor panel. The negative horizontal
  // plane and its flipped portrait cancel each other. The far door sets the dolly axis.
  const nearScale=1.9/(2-.87), horizonX=1324, horizonY=433;
  const faceX=horizonX-(430+580*317/605)*nearScale;
  const hairY=horizonY+(-327+.16*317+646-537)*nearScale;
  const sy=first.h*1.1/(537*nearScale), sx=sy*605/580;
  const zx=zoomBetween(sx,1,u), zy=zoomBetween(sy,1,u);
  const doorX=x+first.step*.34+(horizonX-faceX)*sx;
  const doorY=y+first.h*.07+(horizonY-hairY)*sy;
  const dx=lerp(doorX,horizonX,u)-horizonX*zx;
  const dy=lerp(doorY,horizonY,u)-horizonY*zy;

  // The room first opens beside her; it takes over the camera's travel only after
  // its window has opened. After the third beat its internal clock is the donor's.
  const insideTime=s.at+(t-s.at)*slide(t,start,s.at+3*P);
  const opened=slide(t,start+.28*P,start+.86*P);
  c.clip({x:0,y:0,w:1920,h:861},()=>{
    c.clip({x:rect.x+rect.w*(1-opened),y:rect.y,w:rect.w*opened,h:rect.h},()=>{
      box(c,rect.x,rect.y,rect.w,rect.h,'panel');
      const g=c.g;
      g.save();
      try {
        g.transform(zx,0,0,zy,dx,dy);
        foldedWall(c,env,insideTime,s,false);
      } finally { g.restore(); }
    });
  });

  // One undistorted lyric baseline throughout the move, including the next sung line.
  c.fx.glow=lerp(.22,.18,u);
  const i=Math.min(env.lyrics.indexAt(t),s.lines[1]);
  if(i<s.lines[0])return;
  const drift=1-easeOut(prog(t,T(i),T(i)+P*.26));
  type(c,text(i),lerp(86,90,u),lerp(1005,995,u)+lerp(19,23,u)*drift,
    lerp(1750,1735,u),lerp(168,158,u),'text',{weight:Math.round(lerp(820,850,u))});
}

export function signalFoldShots(env) {
  const signal=signalShots(env), fold=foldShots(env);
  const wall=signal.find(s=>s.id==='cx-fall');
  const passage={...wall,layout:'interface: the live chat opens onto two rows of windows',
    moment:'Her portrait stays registered as the camera passes through her window into the corridor.',
    render:(c,t)=>enterWindow(c,env,t,wall)};
  return [...signal.filter(s=>s.at<wall.at), passage, ...fold.filter(s=>s.at>wall.at)];
}
