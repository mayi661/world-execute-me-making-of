import fs from 'node:fs';
import { withEngine,work } from './session.mjs';
const variant=process.argv[2]??'current',start=Number(process.argv[3]??10700),end=Number(process.argv[4]??10850);
const dest=process.argv[5]??'codec_probe';
const waitEach=process.argv[6]==='ack';
const now=Date.now();
const finiteEnd=end===13014?12942:end;
function log(line){console.log(line);fs.appendFileSync(new URL(dest+'.log',work),new Date().toISOString()+' '+line+'\n');}
await withEngine({width:3840,height:2160,variant,flipY:true},async page=>{
  const info=await page.evaluate(async waitEach=>{
    const options={codec:'avc1.640034',width:3840,height:2160,bitrate:80000000,framerate:60,
      latencyMode:'realtime',hardwareAcceleration:'no-preference',avc:{format:'annexb'}};
    const supported=await VideoEncoder.isConfigSupported(options);
    if(!supported.supported)throw Error('4K hardware H.264 is unavailable');
    // Own the actual pixels for every video sample. An asynchronous encoder can
    // still be reading a GPU-backed canvas when the next scene redraws it.
    window.waitEach=waitEach;
    if(waitEach){
      window.capture=document.createElement('canvas');capture.width=film.width;capture.height=film.height;
      window.blit=capture.getContext('2d',{alpha:false,colorSpace:'srgb'});
      blit.setTransform(1,0,0,-1,0,film.height);blit.imageSmoothingEnabled=false;
    }
    window.sample=(n,start)=>{
      paint(n);
      if(window.waitEach){
        blit.drawImage(film,0,0);
        return new VideoFrame(capture,{timestamp:Math.round((n-start)*1e6/60),duration:Math.round(1e6/60)});
      }
      const raw=new Uint8Array(film.width*film.height*4);
      engine.readPixels(raw);
      return new VideoFrame(raw,{format:'RGBX',codedWidth:film.width,codedHeight:film.height,
        colorSpace:{primaries:'bt709',transfer:'iec61966-2-1',matrix:'rgb',fullRange:true},
        timestamp:Math.round((n-start)*1e6/60),duration:Math.round(1e6/60),transfer:[raw.buffer]});
    };
    window.chunks=[];window.encError=null;window.lastPts=-1;window.keyOut=false;
    window.enc=new VideoEncoder({output:chunk=>{
      if(chunk.timestamp<=window.lastPts){window.encError='encoder reordered presentation times';return;}
      window.lastPts=chunk.timestamp;window.keyOut=chunk.type==='key';
      const data=new Uint8Array(chunk.byteLength);chunk.copyTo(data);
      window.chunks.push(data);
    },error:e=>{window.encError=String(e);}});
    enc.configure(options);
    return {description:supported.config.codec,frame:[film.width,film.height]};
  },waitEach);
  log('capture '+JSON.stringify(info)+' frames '+start+'..'+end);
  const out=fs.openSync(new URL(dest+'.h264',work),'w');
  let taken=0;
  try {
    for(let a=start;a<finiteEnd;a+=120) {
      const b=Math.min(a+120,finiteEnd);
      const {bytes,n,err}=await page.evaluate(async([a,b,start])=>{
        for(let i=a;i<b;i++){
          if(window.encError)throw Error(window.encError);
          const vf=sample(i,start);
          enc.encode(vf,{keyFrame:(i-start)%120===0});
          vf.close();
          if(window.waitEach)await enc.flush();
          if(enc.encodeQueueSize>=5)await new Promise(resolve=>enc.addEventListener('dequeue',resolve,{once:true}));
        }
        await enc.flush();
        const data=new Uint8Array(chunks.reduce((v,c)=>v+c.byteLength,0));
        let pos=0;for(const chunk of chunks){data.set(chunk,pos);pos+=chunk.length;}
        const n=chunks.length;chunks.length=0;
        return {bytes:data.toBase64(),n,err:window.encError};
      },[a,b,start]);
      if(err||n!==b-a)throw Error(JSON.stringify({err,n,expected:b-a}));
      fs.writeSync(out,Buffer.from(bytes,'base64'));taken+=n;
      if(taken%600===0||b===finiteEnd||a===start)log('frames '+taken+'/'+(end-start)+' rate '+(taken*1000/(Date.now()-now)).toFixed(1));
    }
    if(finiteEnd!==end){
      const still=await page.evaluate(async([n,start])=>{
        const vf=sample(n,start);
        enc.encode(vf,{keyFrame:true});vf.close();await enc.flush();
        if(window.encError||chunks.length!==1||!window.keyOut)throw Error('missing independent final picture');
        return chunks.pop().toBase64();
      },[finiteEnd,start]);
      const finalAccessUnit=Buffer.concat([Buffer.from([0,0,0,1,9,240]),Buffer.from(still,'base64')]);
      for(let n=finiteEnd;n<end;n++)fs.writeSync(out,finalAccessUnit);
      taken+=end-finiteEnd;
    }
    if(taken!==end-start)throw Error('incomplete video');
  } finally {fs.closeSync(out);}
  await page.evaluate(()=>enc.close());
  log('COMPLETE '+taken+' native 4K pictures, '+((Date.now()-now)/1000).toFixed(1)+'s');
});
