import fs from 'node:fs';
import { chromium } from 'playwright-core';
import { startServer, ROOT } from '../../export/server.mjs';
export const work=new URL('.',import.meta.url);
export async function withEngine({width,height,variant='current',flipY=false,receive},workFn) {
  const {server,url}=await startServer({port:5429});
  const [serve]=server.listeners('request');
  server.removeListener('request',serve);
  server.on('request',(req,res)=>{
    if(req.method==='POST'&&receive)return receive(req,res);
    if(req.url==='/capture-sheet.html'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});return res.end('<!DOCTYPE html><meta charset="utf-8"><link rel="icon" href="data:,"><canvas id="film"></canvas>');}
    if(req.url==='/src/scenes/signal_fault.js'&&variant!=='current'){
      res.writeHead(200,{'Content-Type':'text/javascript; charset=utf-8'});
      return res.end(variant==='base'?'export function signalFault(env,shot){return shot;}':fs.readFileSync(ROOT+'/.probe/signal_impact/signal_fault.js'));
    }
    serve(req,res);
  });
  let browser;
  try {
    browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-gpu','--use-angle=d3d11','--ignore-gpu-blocklist','--force_high_performance_gpu','--disable-background-timer-throttling','--disable-renderer-backgrounding','--disable-backgrounding-occluded-windows']});
    const page=await browser.newPage({viewport:{width:768,height:432}});
    const errors=[];
    page.on('pageerror',e=>errors.push(String(e)));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    page.on('requestfailed',r=>console.error('request failed',r.method(),r.url(),r.failure()?.errorText));
    await page.goto(url+'/capture-sheet.html');
    await page.evaluate(async([width,height,flipY])=>{
      const {createEngine}=await import('/src/engine/engine.js');
      const read=async p=>(await fetch('/'+p)).json();
      const cfg=await read('config.json');
      const [featuresData,lyricsData]=await Promise.all([read(cfg.paths.features),read(cfg.paths.lyrics)]);
      const canvas=document.querySelector('canvas');
      window.engine=await createEngine({canvas,width,height,cfg,featuresData,lyricsData,flipY,edition:'signal-fold'});
      window.paint=n=>window.engine.renderFrame((n-Math.round(cfg.safety.preroll*60))/60);
    },[width,height,flipY]);
    console.log('renderer',await page.evaluate(()=>engine.rendererInfo()));
    await workFn(page);
    if(errors.length)throw Error(errors.join('\n'));
  } finally {await browser?.close();server.close();}
}
