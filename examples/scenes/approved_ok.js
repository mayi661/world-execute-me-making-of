import { pointer } from '../components/cursor.js';
import { lerp, clamp } from '../engine/util.js';
import { cues } from './shared.js';
import { box, rule, mono, type, slide } from './rotary_press.js';
import { screen } from './signal_open.js';

// The loupe magnifies the frontmost dismiss button. The desktop and the magnification
// use the same twelve vocal markers, including the final release into the native reply field.
export function signalFault(env,s){
  if(!['err-full','exec-delivery','exec-recoil'].includes(s.id))return s;
  const {Bt,P,text}=cues(env),hits=Array.from({length:12},(_,i)=>Bt(320+i*2));
  return {...s,layout:'interface: the warning desktop and a magnified OK key',
    moment:s.id==='err-full'?'The warning stack fills the desktop. The camera picks up its last dismiss button.':
      'Each vocal strike drives the same key down. The live warning stack counts down to the empty reply field.',
    render(c,t){
      const song=t+env.cfg.timing.offset;
      const inView=slide(song,Bt(317),hits[0]);
      const leave=slide(song,hits[11]+P*.19,hits[11]+P*.78);
      if(inView<=0||leave>=1){s.render(c,t);return;}
      const magnify=inView*(1-leave),idx=hits.findLastIndex(at=>song>=at);
      const age=idx<0?Infinity:(song-hits[idx])/P;
      const down=age<.15?1:age<.62?1-slide(age,.15,.62):0;
      const desktopScale=lerp(1,.58,magnify),left=57*magnify,top=158*magnify;
      screen(c);
      c.at(left,top,()=>s.render(c,t),{scale:desktopScale});
      const x=lerp(2070,1206,magnify),y=240;
      c.clip({x:x-39,y:77,w:1920-x+39,h:763},()=>{
        box(c,x-35,93,791,695,'panel');
        rule(c,x-31,94,x-31,785,'me',5);
        mono(c,String(12-Math.max(0,idx+1)).padStart(2,'0'),1798,207,82,'sub','right');
        const by=y+130+31*down;
        c.rrect(x+45,y+168,552,225,31,{fill:'bg',stroke:'mute',width:5});
        c.rrect(x+45,by,552,190,31,{fill:down>.45?'meHot':'meDim',stroke:'sub',width:5});
        type(c,'OK',x+319,by+149,375,165,down>.45?'bg':'text',{font:'sans',weight:850,align:'center'});
        pointer(c,x+467,by+132,{scale:4.6,down});
        for(let i=0;i<12;i++)box(c,x+48+i*47,706,33,15,i<=idx?'meHot':'line');
      });
      if(idx>=0){
        const band=lerp(1080,824,magnify);
        box(c,0,band,1920,1080-band,'bg');
        type(c,text(86+clamp(idx,0,11)),83,band+179,1754,201,'meHot',{weight:900});
      }
    }};
}
